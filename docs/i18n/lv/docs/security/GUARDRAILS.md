# Guardrails (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Patiesības avots:** `src/lib/guardrails/`
> **Pēdējo reizi atjaunināts:** 2026-10-17 — v3.8.52 (pievienota sadaļa [Pārklājums un ierobežojumi](#coverage-and-limits):
> kurus maršrutus un atbilžu ceļus huki sasniedz, apvienotās atspējošanas galvenes (#16412), injekciju
> bloķēšanas režīms kā obligāta robeža (#16413) un kas redz atbildi pirms pēcizsaukuma apstrādes)

Aizsargmehānismi nodrošina drošības, politikas un satura transformācijas
robežā starp OmniRoute un augšupvērstajiem (upstream) nodrošinātājiem. Katrs
aizsargmehānisms var pārbaudīt (un pēc izvēles noraidīt, pārveidot vai
anotēt) pieprasījumu saturu (`preCall`) un augšupvērstās atbildes (`postCall`).

Sistēma darbojas pēc **fail-open** principa: ja aizsargmehānisms izpildes laikā
izmet kļūdu, reģistrs to fiksē un turpina ar nākamo aizsargmehānismu, nevis
atteic pieprasījumu. Bloķēšana ir skaidri izteikts lēmums (`block: true`),
nekad nejaušība. Vienīgais izņēmums ir pārtraukts pieprasījums: kad izsaucēja
`signal` tiek pārtraukts, kļūdu izmetošs aizsargmehānisms noraida hoka
izpildi, nevis tiek izlaists.

Huki **netiek** palaisti katrā maršrutā vai pie katras atbildes. Pirms
paļaušanās uz aizsargmehānismu kā drošības kontroles līdzekli izlasiet
[Pārklājums un ierobežojumi](#coverage-and-limits).

## Iebūvētie aizsargmehānismi

Reģistrs importa brīdī automātiski ielādē sešus aizsargmehānismus prioritātes
secībā (skat. `registry.ts` → `registerDefaultGuardrails()`):

| Prioritāte | Nosaukums           | Posms(-i)      | Fails                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Mazākas prioritātes vērtības tiek izpildītas **pirmās**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 pamatmodelim un `glm-5.3-{low,high,max}` reģistra/specifikācijas
metadatos ir skaidri norādīts `supportsVision:false`. GLM 5.3 Flash varianti
joprojām ir modeļi ar iebūvētu redzes atbalstu. Claude Code maršruts
`/v1/messages` nonāk koplietotajā `handleChat` pirmsizsaukuma aizsargmehānismu
ķēdē **pirms** Claude-to-OpenAI tulkojuma; ligzdotie `Read` rīka rezultātu
attēli ir jāapraksta vai jāapstrādā pirms šis tulkojums tos pārceļ OpenAI
`image_url` saturā (#17069).

Uztver pieprasījumus ar attēliem, kas vērsti uz **modeļiem bez redzes
atbalsta**, un vai nu novirza visu pieprasījumu uz modeli ar redzes atbalstu,
vai arī pirms augšupvērstā izsaukuma aizstāj attēlu daļas ar teksta
aprakstiem, ko ģenerē konfigurējams redzes modelis. Tas ļauj tikai tekstu
atbalstošiem nodrošinātājiem pārredzami apstrādāt multimodālu saturu.

Plūsma:

1. Izlaist, ja mērķa modelis jau atbalsta redzi (izņemot gadījumus, kad tas
   atrodas piespiedu tiltēšanas sarakstā `isVisionBridgeForcedModel`).
2. Izņem attēlu daļas ar `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), kas deleģē to **vienotajam multivides
   detektoram** `detectMediaParts()` failā `open-sse/utils/mediaParts.ts` —
   vienīgajam patiesības avotam, ko koplieto ar kombināciju saderības filtru.
   Izņemšana ir ierobežota ar atļauto formu sarakstu, kuras `replaceImageParts`
   spēj ielikt atpakaļ (izņemšanas↔aizstāšanas līgums): OpenAI `image_url`,
   Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`
   un Responses API `input_image`. Atbilstošie attēli, kas ligzdoti Claude Code
   `tool_result.content` un Responses rīku izvadēs, arī tiek izņemti un
   aizstāti savās sākotnējās vietās; tikai indikatoru formas ir kombināciju
   filtra materiāls un netiek izņemtas. Izlaist, ja nekas netiek atrasts.
3. Atrod izpildlaika konfigurāciju ar `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): jaunās `modalityBridge*`
   iestatījumu atslēgas ir prioritārās; mantotās `visionBridge*` atslēgas
   paliek kā **viena cikla rezerves variants** (atkāpšanās logs). Ja tilts ir
   atspējots, izlaist pirms jebkādas multivides pārlūkošanas.
4. Režīma selektors (`modalityBridgeVisionMode`, skat. tabulu zemāk) izlemj
   starp novirzīšanu un aprakstīšanu. Novirzīšana atgriež `modifiedPayload`,
   kurā nomainīts tikai `model`, kā arī meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Aprakstīšanas ceļš: ierobežo attēlu skaitu līdz `maxImages`, sastāda
   uzdevumam atbilstošu uzvedni, pārbauda aprakstu kešatmiņu, izsauc redzes
   modeli **paralēli** (`Promise.allSettled`) un to vietā ievieto
   `[Image N]: <description>` teksta daļas. Neveiksmīgs apraksts dod `null`:
   neapstrādātais attēls tiek saglabāts nezināmiem vai redzi atbalstošiem
   mērķiem (#4012), taču **apstiprināts tiešais mērķis, kas atbalsta tikai
   tekstu**, vai kombinācija bez redzes atbalsta saņem skaidru
   `(unavailable — no vision-capable provider connected)` teksta aizstājēju
   katram neaprakstītam attēlam, tostarp daļēju kļūmju gadījumā un attēliem,
   kas pārsniedz aprakstīšanas izsaukumu limitu (#17069). Esošais rezerves
   variants gadījumam, kad neizdodas visi kombinācijas apraksti, paliek spēkā
   (#8430).
6. Atgriež `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režīma selektors (`modalityBridgeVisionMode`)

| Režīms     | Noklusējums | Uzvedība                                                                                                                                                                                                                                                                                                          |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Mantojuma heuristika, nemainīta (#6640/#7204): modeļi, kas nav kombinētie/`auto/`, tiek pāradresēti uz labāko redzes modeli, ja vien sākotnējam modelim jau nav izmantojami akreditācijas dati (tad veic aprakstu); kombinētie mērķi vienmēr veic aprakstu.                                                       |
| `describe` |             | Vienmēr veic aprakstu — pāradresācijas bloks tiek pilnībā izlaists; lietotāja izvēlētais modelis vienmēr atbild.                                                                                                                                                                                                  |
| `reroute`  |             | Piespiedu pāradresācija: aizsargs, kas saglabā modeli ar akreditācijas datiem, tiek apiepts. Pāradresācijas **mērķa** akreditācijas datu aizsargs joprojām ir spēkā — ja nav izmantojama redzes mērķa, tilts bloķējas ar skaidru kļūdu, nevis veic aprakstu vai sūta neapstrādātus attēlus uz tikai teksta mērķi. |

Piespiedu režīmi izsauc īsslēgumu **pirms** automātiskās heuristikas darbības; `auto` uzvedība
ir baitu līmenī identiska aizsargam, kāds tas bija pirms PR-1.

#### API atslēgas tvērums (`visionBridgeKeyScope.ts`)

Kad izsaucēja API atslēga ierobežo `allowedConnections`, kvotu kopas
(`allowedQuotas`) vai modeļus (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), tilts izvēlas
tikai tos pāradresācijas un apraksta modeļus, ko atslēga drīkst izmantot, un
savienojumus, ko atslēga drīkst izmantot. Apraksta izsaukums pēc tam vienmēr
iet caur OmniRoute pašciklu ar galveni `x-omniroute-self-loop-key-id`, tāpēc
saņemošais tērzēšanas pieprasījums vēlreiz īsteno šīs atslēgas savienojumu un
modeļu politiku. `enforceApiKeyPolicy()` ievēro šo galveni tikai kopā ar
pašcikla bearer, tāpēc tas var tikai sašaurināt piekļuvi, un id, kuru neizdodas
atrisināt, tiek noraidīts.

Ja atslēgai nav atļauts neviens redzes modelis, **apstiprināts tikai teksta
mērķis** noraida attēla pieprasījumu lokāli ar skaidru HTTP 400, nevis pārsūta
attēla baitus nespējīgam augšupvirzienam (#17069). Mērķiem ar nezināmu vai
iebūvētu redzes iespēju apraksta ceļš saglabā iepriekšējo fail-open uzvedību
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Pieprasījumi bez atslēgas un atslēgas bez šiem ierobežojumiem uzvedas tieši
tāpat kā iepriekš.

#### Uzdevumam pielāgota apraksta uzvedne (`modalityBridgeVisionTaskAware`)

Noklusējums **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
pievieno **pēdējā lietotāja ziņojuma** tekstu (saīsinātu līdz 500 rakstzīmēm)
pamata apraksta uzvednei, virzot aprakstu uz to, ko lietotājs faktiski
jautāja (codex-vision-proxy paraugs), un lūdzot redzes modelim pārrakstīt
redzamo tekstu. Ja karodziņš ir izslēgts — vai nav lietotāja teksta — pamata
uzvedne tiek izmantota nemainīta.

Apraksta pašcikla paša OpenAI saderīgais pieprasījums (`callVisionModelSingle()`
failā `visionBridgeHelpers.ts`) vienmēr pieprasa `image_url.detail: "high"` —
bez nosacījumiem, katram izsaucējam/pakalpojumu sniedzējam, ne atkarībā no
jebkāda klienta signāla. Zema detalizācijas līmeņa paraugu ņemšana pasliktina
OCR precizitāti tieši tam teksta pārrakstīšanas uzdevumam, ko šī uzvedne
pieprasa, tāpēc pats apraksta izsaukums vienmēr pieprasa augstu detalizāciju
neatkarīgi no tā, kādu detalizācijas līmeni izmantoja sākotnējais ienākošais
pieprasījums. Tas ietekmē tikai iekšējā apraksta pieprasījuma ķermeni; tas
nemaina to, kā OmniRoute pārsūta izsaucēja paša `image_url.detail` galvenajā
pieprasījumā — šis noklusējums tiek lietots atsevišķi un tikai atklātiem
OpenCode klientiem, funkcijā `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Apraksta pašcikla Anthropic
vadu formāta zaram nav `detail` lauka, un neviens no abiem noklusējumiem to
neietekmē.

#### Apraksta izvades griesti (`modalityBridgeVisionMaxChars`)

| Atslēga                        | Noklusējums | Diapazons         |
| ------------------------------ | ----------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` vai 100–50000 |

`0` (noklusējums) nozīmē **bez griestiem** — apraksts, ko atgriež
`callVisionModel()`, tiek nodots tālāk nemainīts, saglabājot esošo uzvedību.
Jebkura vērtība diapazonā 100–50000 saīsina aprakstu ar `…` piedēkli pirms tas
tiek ievietots atpakaļ kā `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` failā `src/lib/guardrails/visionBridge.ts`).
Palieliniet šo vērtību OCR uzdevumiem ar lielu detaļu apjomu, kur
lejupvirziena modelim nepieciešama pilna transkripcija; samaziniet to, lai
ierobežotu žetonu patēriņu runīgiem redzes modeļiem. Informācijas paneļa lauks
atrodas cilnes Vision panelī Advanced (`modality-bridge-max-chars` failā
`ModalityBridgeVisionTab.tsx`) un paceļ jebkuru vērtību no 1 līdz 99 līdz 100
apakšējai robežai, vienlaikus atstājot skaidri norādītu `0` nemainītu — `0` ir
derīga Zod vērtība pati par sevi
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ne tikai
"neiestatītais" noklusējums.

#### Apraksta kešatmiņa (`modalityBridge/bridgeCache.ts`)

Operatīvās atmiņas LRU + TTL kešatmiņa apraksta izvadēm, koplietota visā
procesā. Atslēga = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
ar garuma prefiksa ietvarējumu (bez lauka robežu sadursmēm). Modeļa komponents
ir **konfigurētais** tilta modelis, nevis modelis, kas faktiski atbildēja —
`callVisionModel` var iekšēji pārslēgties uz rezerves variantu, un atslēgu
veidošana pa mēģinājumiem fragmentētu kešatmiņu. Neveiksmīgie apraksti nekad
netiek kešoti. Iestatījumi:

| Atslēga                         | Noklusējums | Diapazons |
| ------------------------------- | ----------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`      | —         |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000   |

#### Attālo attēlu normalizācija (self-loop describe/base64 ielāde)

Kad tilts pats ielādē **attālu** attēlu — Anthropic describe pašizsaukumā un claude-wire-format base64 konversijā (`ensureBase64ImagesForClaudeWire`), abi caur `fetchRemoteImageAsDataUri()` failā `visionBridgeHelpers.ts` — iegūtais data URI pirms iegulšanas redzes modeļa pieprasījumā tiek nodots caur `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Pārmērīgi lieli attēli tiek samazināti līdz **2048 px garajai malai** (atbilst tam izmēru griestiem, ko OpenAI/Anthropic jau piemēro servera pusē), kas samazina augšupielādes baitus/aizturi, nemainot to, ko redz redzes modelis. Izmēru maiņa izmanto `sharp`, kas ielādēts ar dinamisko importu: platformā, kurā tā native binārais fails neielādējas, `normalizeDataUri()` **nekad neizmet izņēmumu** — tas atgriežas pie sākotnējo baitu caurlaides, tāpēc describe/base64-konversijas ceļš vienmēr turpina darboties. Baiti, kas nav attēls (ielāde, kas neatgrieza dekodējamu attēlu), arī tiek caurlaisti nemainīti. Šī normalizācija attiecas tikai uz attēliem, ko tilts ielādē savam pašizsaukumam — tā nekad netiek piemērota izsaucēja neapstrādātajai caurlaides datu kravai, saskaņā ar principu par mutācijām tikai ar opt-in (Hard Rule #20).

#### Iestatījumu shēma + migrācija

Jaunās `modalityBridge*` atslēgas tiek Zod-validētas `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio un `modalityBridgeAudio*` grupa, ko izmanto Audio Bridge. Migrācija `141_modality_bridge_settings.sql` kopē esošās mantotās `visionBridge*` vērtības uz atbilstošajām jaunajām atslēgām (idempotenti, nekad nepārraksta operatora iestatītu `modalityBridge*` vērtību); mantotās atslēgas paliek pieņemtas kā lasīšanas rezerves variants vienam laidiena ciklam.

#### Caurspīdīguma galvene + statistika

Ar describe pārveidotās atbildes nes
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(izveido `buildModalityBridgeHeader()` failā `modalityBridge/bridgeStats.ts`,
uzliek `withModalityBridgeHeader()` failā `src/sse/handlers/chatHelpers.ts`).
Pāradresētie pieprasījumi galveni **nesaņem** — datu krava netika aizskarta, un
modeļa nomaiņa jau ir redzama atbildes ķermeņa laukā `model`.

`GET /api/modality-bridge/stats` (pārvaldības autentifikācija, tā pati piekļuves
pakāpe kā `GET /api/settings`) atgriež operatīvajā atmiņā glabātos skaitītājus pa
modalitātēm `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` priekš `vision`, `audio` un
`video`. `averageLatencyMs` kā saucēju izmanto `latencySamples`, nevis visus
mēģinājumus; operācija bez laika mērījuma neizgudro nulles milisekunžu paraugu.
`bridged` paliek atpakaļsaderīgs aizstājvārds veiksmīgām konversijām; neveiksmīgie
mēģinājumi to nepalielina.
Skaitītāji procesa restartēšanas brīdī tiek atiestatīti pēc nodoma
(telemetrija, nevis uzskaites sistēma).

#### Vadības paneļa konfigurācija

Īpašā paneļa lapa ir
`/dashboard/settings/modality-bridge`. Tās URL-adresējamās cilnes `Vision`,
`Audio` un `Video`, pārslēdzot `tab` vērtību, saglabā vaicājuma parametrus.
Cilne Vision nodrošina iespējošanu, režīmu, modeļa izvēli (ieskaitot automātisko
noklusējumu), uzdevumam pielāgotu uzvedņu veidošanu, paplašinātus
taimauta/attēlu/apraksta garuma/kešatmiņas ierobežojumus, izpildlaika
skaitītājus un aizsargātu paraugpieprasījumu. Cilne Audio arī ir aktīva: tā
nodrošina iespējošanu, tikai-STT modeļu atlasītāju ar Auto, taimauta/maksimālā
klipa ierobežojumus, audio skaitītājus un `input_audio` parauga testu. Cilne
Video ir funkcionāla: tā ziņo par FFmpeg/ffprobe izpildlaika stāvokli — vienu no
četriem skaidri definētiem UI stāvokļiem (`unknown`, kamēr pārbaude ir ceļā vai
to neizdevās pabeigt, `restricted` uz paneļa resursdatora, kas nav loopback, kur
pārbaude tiek izlaista klienta pusē, `unavailable`, kad pārbaude ir veikta un
apstiprināts, ka to nav, vai `available` ar FFmpeg/ffprobe versijām) — saglabā
iespējošanas/modeļa/kadru/video/taimauta ierobežojumus, filtrē modeļu
atlasītāju uz modeļiem ar redzes iespējām un nodrošina video skaitītājus.

Bijušā Vision Bridge karte AI iestatījumos ir saderības saite uz jauno lapu; tā
vairs netur otro veidlapas kopiju. Media Providers arī saista Image-to-Text un
Speech-to-Text darbplūsmas ar atbilstošajām Modality Bridge cilnēm, neaiztiekot
esošo Speech-to-Text izmēģinājumu vidi.

**Self-loop pieļaušanas apiešana:** kad describe izsaukums tiek maršrutēts caur
OmniRoute paša `/v1` self-loop (nestandarta nodrošinātāja modelis),
apakšpieprasījums sūta `x-omniroute-admission-bypass: internal` un tiek
autentificēts ar atrisināto self-loop akreditācijas datu — lokālo
`sk_omniroute` marķieri lokālajā režīmā vai operatora konfigurēto
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` vides atslēgu (#1350), lai
`REQUIRE_API_KEY=true` izvietojumi joprojām varētu izpildīt describe izsaukumu.
Apiešana tiek atzīta tikai šiem precīzajiem akreditācijas datiem, tāpēc ārējie
klienti nevar izmantot šo galveni, lai izlaistu pieļaušanas pārbaudi.

Mantotās noklusējuma vērtības atrodas `src/shared/constants/visionBridgeDefaults.ts`;
jaunās režīma/task-aware/kešatmiņas noklusējuma vērtības un iestatījumu
atrisinātājs atrodas `src/shared/constants/modalityBridgeDefaults.ts`.
Aizsargmehānisms nodrošina `deps` konstruktora opciju, lai testi varētu injicēt
viltotas `getSettings` un `callVisionModel` implementācijas.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Pārtver audio saturošus tērzēšanas pieprasījumus, pirms tie sasniedz mērķi, par
kuru nav zināms, ka tas pieņem audio ievadi. Tas nekad nepāradresē tērzēšanas
pieprasījumu: audio daļas tiek transkribētas caur esošo ar OpenAI saderīgo
multipart galapunktu, un izvēlētais tērzēšanas modelis turpina darbu ar teksta
transkriptiem.

Plūsma:

1. Atrod `supportsAudio`, izmantojot `getResolvedModelCapabilities()`. Prioritāte ir
   skaidri norādītajiem pakalpojumu sniedzēja reģistra metadatiem, pēc tam
   statiskajiem modeļa metadatiem, tad sinhronizētajiem `modalities_input`.
   Deklarēts ievades saraksts bez `audio` ir `false`; ja nav spēju pierādījumu,
   paliek `null`. Gan `false`, gan `null` aktivizē konservatīvo tiltu, savukārt
   `true` to apiet.
2. Atrod `modalityBridgeAudio*` iestatījumus un izgriež augšējā līmeņa audio
   daļas no katras ziņas, izmantojot kopīgo `detectMediaParts()` detektoru.
   Atbalstītās pārraides formas ir OpenAI `input_audio`, `audio_url` un
   `source.media_type: "audio/*"`. Ligzdotā audio tiek noteikta maršrutēšanai,
   bet izgriešanas ceļš to neizņem. Darba apjomu ierobežo
   `modalityBridgeAudioMaxClips`; vēlākās daļas paliek neskartas.
3. Ievēro konfigurēto `provider/model` vai ļauj `selectAudioBridgeModel()`
   pāriet cauri `AUDIO_TRANSCRIPTION_PROVIDERS` stabilā kataloga secībā un
   izvēlēties pirmo modeli ar izmantojamiem aktīviem pakalpojumu sniedzēja
   akreditācijas datiem.
4. `callAudioTranscription()` pārveido base64/data-URI audio par multipart
   `file` vai lejupielādē attālu `audio_url` caur tikai publisko izejošo
   aizsargu ar DNS piespraušanu un 25 MB robežu. Pēc tam tas ar POST nosūta
   failu un izvēlēto modeli uz lokālo `/v1/audio/transcriptions` pašcilpu,
   autentificējoties ar `resolveSelfLoopBearer()`. Esošais transkripcijas
   maršruts veic parasto akreditācijas datu meklēšanu, dzesēšanas/pieprasījumu
   ātruma ierobežojumu apstrādi un pakalpojumu sniedzēja nosūtīšanu.
5. Veiksmīgie izsaukumi aizstāj savas daļas ar `[Audio N]: <transcript>`.
   Izsaukumi darbojas ar `Promise.allSettled`: individuāla kļūme saglabā
   attiecīgo oriģinālo audio daļu (#4012 līgums). Ja visi izsaukumi neizdodas
   un mērķis ir pierādīti `supportsAudio === false`, daļas kļūst par
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 līgums).
   Nezināma mērķa (`null`) gadījumā pilnīgas neveiksmes rezultāts paliek
   neskarts. Pierādīts tikai teksta mērķis bez izmantojamiem STT akreditācijas
   datiem saņem to pašu skaidri norādīto aizvietotāju, neveicot tīkla izsaukumu.

Veiksmīgas transkripcijas izmanto visa procesa Modality Bridge LRU/TTL
kešatmiņu. Atslēga apvieno audio atsauci, stabilo `audio-transcription`
operācijas etiķeti un izvēlēto STT modeli; kļūmes nekad netiek kešotas. Audio
mēģinājumi atjaunina kopīgos `bridged`, `cacheHits`, `failures` un `lastUsedAt`
skaitītājus. Pārveidotajām atbildēm ir
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; neskartie
pieprasījumi nesaņem Audio Bridge segmentu.

Izpildlaika iestatījumi tiek glabāti datubāzē un validēti ar Zod:

| Atslēga                       | Noklusējums | Diapazons              |
| ----------------------------- | ----------- | ---------------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —                      |
| `modalityBridgeAudioModel`    | `""`        | Automātiski vai STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000            |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10                   |

Kopīgo kešatmiņu joprojām kontrolē `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` un `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Pārtver augšējā līmeņa video daļas Chat Completions `messages` un Responses API
`input`, pirms tiek izsaukts mērķis bez zināma natīvā video atbalsta.
Atbalstītās formas ir `input_video`, `video_url`, `video_source`, HTTPS URL un
`data:video/*;base64,...` datu URI. Parasti failu nosaukumi tekstā netiek
uzskatīti par video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) pārvalda pieprasījuma pāreju,
spēju/politikas pārbaudi, pieprasījuma līmeņa apkopošanu un atbildes saturu.
Katra video darbs — iegūšana, visa rezultāta kešatmiņa, kadru secības
aprakstīšana (kas apvieno jebkuru izsaucēja deklarēto audio transkripciju) un
mēģinājuma līmeņa metrika/pārtraukšana/tīrīšana — ir paslēpts aiz
`processVideoPart` failā `videoBridgePipeline.ts`, kas tiek izsaukts reizi
katrai video daļai `preCall` cilpas iekšienē. Šis modulis definē arī skaidrās
portu robežas `VideoMediaBrokerPort` (baitu iegūšana un izlases kadru
izvilkšana), `VideoAudioTranscriptionPort` (izsaucēja deklarētās audio
transkripcijas apvienošana ar izlases parakstiem) un `VideoDrilldownPort`
(kadru detalizācijas saglabāšanas robeža; vēl nav pieslēgta `processVideoPart`
— šobrīd detalizācijas ierakstus raksta tikai atsevišķais
`/api/modality-bridge/video/drilldown` maršruts).

Publiskais `/v1` pieprasījuma ceļš nekad neimportē un neizsauc apakšprocesu.
Attālie video tiek lejupielādēti ar 50 MiB robežu; iekļautajiem base64 video ir
konservatīvs 36 MiB dekodētu ierobežojums katram video, lai modeļa/ziņu/
iekārtojuma aploksne varētu palikt publiskā JSON pieprasījuma pieņemšanas
limita 50 MiB robežās. Iekļautā garuma un dekodētā izmēra novērtējumi tiek
pārbaudīti pirms piešķiršanas. HTTPS ir obligāts sākotnējam attālajam URL un
katram pāradresējumam, izmantojot esošo tikai publisko izejošo aizsargu ar DNS
piespraušanu. Pēc tam baiti šķērso precīzo iekšējo
`POST /api/modality-bridge/video/extract` brokeru robežu. Šis maršruts ir gan
`LOCAL_ONLY`, gan `SPAWN_CAPABLE`, pieņem tikai procesa līmenī autentificētu,
uzticamu loopback pieprasījumu un nekad nepieņem URL, failu sistēmas ceļu,
izpildāmo failu vai argumentu sarakstu. API ķermeņa izmēra konveijers un
apstrādātāja inkrementālais ķermeņa lasītājs neatkarīgi īsteno 50 MiB brokeru
ievades ierobežojumu. Tā ierobežotā rinda vienlaikus izpilda vienu izvilkšanu,
pieļauj četrus gaidošos darbus un ierobežo gaidošo ievadi līdz 100 MiB.

Starpniekā `ffprobe` nolasa privātu lokālu failu; fiksētais formātu
atļaušanas saraksts neietver atskaņošanas sarakstu un manifestu formātus.
Atļautajiem MOV saimes konteineriem ārējās MOV datu atsauces pēc noklusējuma
paliek atspējotas, un fiksētā komanda tās neiespējo. Gan `ffprobe`, gan `ffmpeg`
izmanto tikai `file` protokolu saturošu atļaušanas sarakstu, vienu pavedienu,
fiksētus argumentu masīvus, neizmanto čaulu, un izpildāmie faili tiek atrasti,
izmantojot `PATH`. Pievienotā attēla vāka straumes netiek uzskatītas par
atskaņošanas kandidātiem. Visām atskaņojamajām straumēm ir jāatbilst
ierobežojumiem, un pirms deterministiskās atkāpšanās uz straumi ar zemāko
indeksu priekšroka tiek dota skaidri norādītajai noklusējuma straumei. Video
ilgums ir ierobežots līdz 600 sekundēm, katra dimensija — līdz 8 192 pikseļiem,
bet avota pikseļu skaits — līdz 33 554 432. FFmpeg iegūst 1–16 JPEG kadrus no
intervālu viduspunktiem, samazina garāko malu līdz ne vairāk kā 1 024 pikseļiem,
nepalielinot mazākus ievades attēlus, un nekad nesaņem URL. Pēc noklusējuma
iztveršana ir `uniform`. Neobligātās `scene_aware` un eksperimentālās
`segment_aware` politikas jau validētajai lokālajai straumei veic vienu papildu
fiksētu FFmpeg apstrādes gājienu, atlasa ierobežotas `showinfo` ainu laikspiedolu
vērtības un detektora kļūmes, noildzes, nepareizi formatētas izvades vai tukšas
kandidātu kopas gadījumā deterministiski atkāpjas uz tiem pašiem vienmērīgi
izvietotajiem viduspunktiem. Segmentus ņemošais režīms viduspunktu paraugus
piešķir proporcionāli validētajiem ainu intervāliem; segmentu pierādījumi un
atkāpšanās darbība ir detalizēti aprakstīta tālāk. Stingrais 16 kadru
ierobežojums katrā politikā tiek piemērots pēc atlases. Ja ainas ņemošam
pieprasījumam pieejams tikai viena kadra budžets, tiek izmantots aktīvā pilnā
video vai fokusa loga vienmērīgais viduspunkts un ziņots
`policyEffective: uniform`: viens atlasīts ainas kadrs nevar saglabāt abus
laika diapazona galus. Izsaucējs pēc izvēles var norādīt galīgu fokusa logu
(`start`/`end` sekundēs); robežas tiek ierobežotas līdz multivides ilgumam,
apgriezti vai negalīgi logi tiek noraidīti, un visas iztveršanas politikas tiek
izpildītas tikai normalizētajā intervālā. Iegūtais logs tiek iekļauts
iztveršanas metadatos un neuzticamā apraksta prefiksā, lai pakārtotie modeļi
varētu atšķirt fokusētu fragmentu no pilnas laika līnijas.

Semantiskais parakstu fokuss ir atsevišķs, skaidri norādāms iestatījums.
Noklusējuma `full` analīzes režīms saglabā esošo kadru uzvedni un nekad
nepārsūta pieprasījuma tekstu parakstu modelim. Režīmā `focused` tilts nolasa
tikai jaunāko netukšo lietotāja izveidoto `text`/`input_text` no tā paša Chat
vai Responses konteinera, normalizē to NFC formā, apvieno vadības rakstzīmes un
atstarpes un ierobežo līdz 500 Unicode koda punktiem. Tukša rezultāta gadījumā
notiek atkāpšanās uz precīzo `full` uzvedni. Izmantojams mājiens tiek serializēts
JSON formātā īpašā neuzticama lietotāja konteksta blokā un drīkst tikai noteikt
prioritāti novērojamām detaļām; tas nevar ignorēt atsevišķo brīdinājumu
neievērot multividē redzamus vai dzirdamus norādījumus. Tekstuālais fokuss nekad
neizsecina `start`/`end` un nemaina laika iztvērēju.

#### FU-07 strukturālie segmentu pierādījumi

`segment_aware` izmanto vienu ierobežotu priekšanalīzes gājienu jau validētajai
lokālajai video straumei. Fiksētā filtru ķēde vispirms mērogo attēlu līdz ne
vairāk kā 320 pikseļu platumam, nosaka ainu maiņas un sastingušus intervālus un
pēc tam iztver ar ātrumu 1 kadrs sekundē, lai noteiktu izplūdumu, vidējo
spožumu, kā arī telpisko un laika informāciju. Apstrādes gājiens ir ierobežots
līdz 600 strukturālajiem paraugiem, vienam FFmpeg/filtra pavedienam, tiem pašiem
tikai `file` protokolu un konteineru atļaušanas sarakstiem, 1 MiB procesa
izvades ierobežojumam un ne vairāk kā 30 sekundēm starpnieka kopīgā
pārtraukšanas/termiņa ietvaros. Tas nekad nepieņem komandu, filtru, ceļu vai URL
no pieprasījuma.

Strukturālās vērtības ir deterministiski iztveršanas pierādījumi, nevis
semantiska video izpratne. Tās neizsecina subjektus, darbības, parakstus, runu
vai lietotāja nolūku. Ainu un sastingumu robežas veido segmentus; sastinguma
aptvērums, izplūdums, ekspozīcija, telpiskā detalizācija un izmaiņas laikā
ietekmē tikai to, kā tiek sadalīts esošais 1–16 kadru budžets. Pilnībā sastingušam
segmentam tiek piešķirts ne vairāk kā viens kadrs, savukārt nesastingušie
segmenti konkurē par atlikušo budžetu. Ja robežu ir vairāk nekā kadru, tiek
saglabāts vienmērīgs laika līnijas pārklājums, lai strauji sākuma griezumi
nevarētu paslēpt garu beigu segmentu. Ainu robežas, kas ietilpst sastinguma
robežas 1 sekundes analīzes izšķirtspējā, tiek apvienotas.

Ja trūkst filtru, pierādījumi ir nepareizi formatēti vai tukši, rodas detektora
kļūda vai iestājas ierobežotās priekšanalīzes noildze, sistēma turpina darbu,
izmantojot precīzo vienmērīgo viduspunktu politiku. Izsaucēja veikta pārtraukšana
vai starpnieka termiņa iestāšanās neļauj turpināt darbu: tā pārtrauc notiekošo
apakšprocesu, novērš turpmāku kadru ieguvi, un privātais pagaidu direktoriju
koks tiek noņemts blokā `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ģenerē deterministiskas reālas FFmpeg
testa ievades parakstu izsaukumu ietaupījuma novērtēšanai pēc dublikātu
noņemšanas, blīvas kustības budžeta sadalei, izplūduma/ekspozīcijas/SI-TI
pierādījumiem, straujiem griezumiem ar garu beigu posmu un pakāpeniskas
izdzišanas kļūdaini pozitīviem rezultātiem. Tas reģistrē priekšanalīzes reālo
izpildes laiku un, ja ir pieejams `/usr/bin/time`, arī bērnprocesa CPU laiku un
maksimālo RSS. Tā kvalitātes pārbaudes ir tikai strukturāli etaloni. Reāla
parakstu modeļa kvalitāte paliek `HOLD` statusā, jo šim pārbaudes rīkam nav ne
autorizēta galapunkta, ne fiksēta vērtētāja. Arī finansiālie ietaupījumi paliek
`HOLD` statusā, ja vien `--caption-cost-per-call-usd` nenorāda skaidru pozitīvu
izmaksu aplēsi vienam izsaukumam; skripts nekad neizdomā nevienu no šiem
rezultātiem.

Katrs kadrs ir ierobežots līdz 4 MiB, visi neapstrādātie kadri kopā — līdz 23 MiB, bet serializētā broker atbilde — līdz 32 MiB. Privāts pagaidu katalogs tiek dzēsts `finally` blokā. OmniRoute neietver FFmpeg un nepieņem pielāgotu izpildāmā faila ceļu. Pirms parakstīšanas tilts veic konservatīvu vizuālās deduplikācijas gājienu: katrs JPEG tiek samazināts līdz 16×16 pelēktoņu buferim un tiek salīdzināts tikai ar pēdējo saglabāto kadru. Pieprasītajam parakstu budžetam virs viena kadra ieguve nodrošina ierobežotu kandidātu kopu līdz divkāršam šī budžeta apjomam un nekad vairāk par 16 kadriem. Pieprasītais griestu ierobežojums tiek piemērots tikai pēc deduplikācijas, un gala retināšanas laikā, ja budžets ir vismaz divi, tiek saglabāts pirmais un pēdējais izvēlētais kandidāts. Versijā atzīmētā `grayscale-16x16-mean-cells-v2` politika izmanto lielāko no vidējās spilgtuma (luma) deltas un sīktēlu šūnu attiecības, kuru normalizētā delta ir vismaz 0.05. Dublikātu slieksnis ir konstante 0.04, kas izvēlēta paredzamības dēļ, nevis atklāta kā izpildlaika iestatījums. Šis sekundārais augsta kontrasta signāls saglabā nelielas kustības un redzamā teksta izmaiņas, ko salīdzinājums, balstīts tikai uz vidējo vērtību, var paslēpt. Salīdzinātāja vai dekodētāja kļūdas darbojas pēc fail-open principa un saglabā pārklājumu. Izvades metadatos tiek atdalīti izvilktie kandidāti, veiksmīgi izmantotie kadri un atmestie vizuālie dublikāti.

Nepārprotami atzīmēta video daļa var pieprasīt laika zīmogotu kontaktlapu. Tilts veido ne vairāk kā 4 kolonnu un 16 kadru JPEG režģi. Katra 512 pikseļu šūna iekodē savu avota laika zīmogu augsta kontrasta apakšējā joslā, savukārt tie paši laika zīmogi paliek teksta metadatos tālākai saistīšanai un auditam. Pilnais JPEG paliek ierobežots līdz 32 MiB. Ja `sharp` nevar dekodēt vai salikt režģi, tilts atgriežas pie atsevišķajiem JPEG kadriem; klienta pārtraukums joprojām izplatās caur kontaktlapas operāciju.

Virzīšanas pierādījumi ir apzināti atdalīti no sintētiskās kompozīcijas mikroetalontesta. `scripts/perf/video-bridge-contact-sheet-eval.ts` definē shēmas versijotu A/B apvalku reāliem ar OpenAI saderīgiem redzes modeļiem. Tas mēra nodrošinātāja ziņotos tokenus, pilno reālo aizkavi no sākuma līdz beigām (ieskaitot lapas kompozīciju), modeļa izsaukumu skaitu un manifestā definētu faktu saglabāšanu. Neapstrādātas modeļa atbildes netiek ierakstītas pārskatā; tiek saglabāti tikai SHA-256 kontrolsummas un atbilstošo faktu ID. Apvalks neveic tīkla vai maksas modeļa izsaukumus, ja vien nav nodots `--execute-real` un nav konfigurēti `--model`, `OMNIROUTE_BASE_URL` un `OMNIROUTE_API_KEY`. Bez šīs skaidras reālās palaišanas tā mašīnlasāmais verdikts paliek `HOLD`; sintētiskie slodzes/izsaukumu skaita mērījumi paši par sevi nav virzīšanas pierādījumi.

Izsaucēji var pievienot neobligātu `transcript.cues` masīvu atbalstītai video daļai, ja viņu rīcībā jau ir salāgots teksts. Katrai norādei jāietver `text`, galīgs `start`/`end` intervāls izpētītā ilguma robežās un baltajā sarakstā iekļauts `source` (`client`, `embedded` vai `audio-bridge`); `confidence` pēc noklusējuma ir `1` un tai jāpaliek starp `0` un `1`. Precīzi dublikātu norādes tiek apvienotas. OmniRoute nekad neuzsāk transkripciju no šiem metadatiem: pārbaudītās norādes tiek nokopētas aprakstītajā rezultātā kopā ar avotu, uzticamību un intervālu un tiek attēlotas kā neuzticami novērojumi blakus kadru parakstiem. Nederīgs, ārpus diapazona esošs vai bez izcelsmes norādes teksts tiek noraidīts, nevis sajaukts parakstu plūsmā. Abi pieprasījuma ķermeņa transkripta kanāli normalizē norādīto izcelsmi uz `client`, ieskaitot pašu izvirzītas `embedded` vai `audio-bridge` etiķetes. Tikai serverim piederošs adapters var piešķirt šīs uzticamās etiķetes, izmantojot tikai kodā pieejamo `trustedSource` argumentu; pieprasījuma JSON lauks nevar sasniegt šo argumentu. Transkripta teksts paliek neuzticams, no multivides atvasināts saturs neatkarīgi no tā izcelsmes, un tas nekad nedrīkst noteikt autorizāciju.

Pieredzējis izsaucējs var tam pašam video nodrošināt `audioTranscript` celiņu; tas tiek uzskatīts par klienta sniegtu tekstu, nevis pierādījumu servera transkripcijai. Apvienošanas šuve izpilda vizuālos un audio novērojumus vienā termiņā un pārtraukšanas signālā, sakārto tos kopējā laika skalā, apvieno precīzus dublikātus un ziņo daļēju rezultātu, kad veiksmīga ir tikai viena puse. Nederīgs `audioTranscript` degradejas līdz šim daļējam rezultātam — vizuālais apraksts tiek saglabāts, un audio zars reģistrē attīrītu kļūdas kodu — tā vietā, lai izgāztu visu video. Katra zara pieejamība, daļējā rezultāta karodziņš un attīrītie kļūdu kodi tiek saglabāti aprakstītajā rezultātā, aizsargmēru metadatos (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), rezultātu kešatmiņas metadatos un tilta apvienošanas skaitītājos. Noklusējuma Video Bridge ceļš neizsauc runas pārveidi tekstā un nelejupielādē otro multivides kopiju; bez šī skaidri norādītā celiņa tas paliek tikai video režīmā.

**Transkripciju saglabāšana (#12150 P1).** Tas tiek piemērots automātiski ikreiz, kad
Video Bridge (kas pats ir jāiespējo) atveido transkripcijas fragmentu — nav atsevišķa
saglabāšanas karoga. Kad pieprasījums atveido jebkuru transkripcijas fragmentu (zvanītāja deklarētu
`transcript` vai apvienotu `audioTranscript`), drošības mehānisms to atzīmē kā
`videoBridgeObserved` un izveido aizklātu video apraksta ēnkopiju —
identisku atveidojumu, kurā katra fragmenta brīvteksta pamatdaļa ir aizstāta ar
`[redacted-video-transcript]`; tas tiek izveidots, aizstājot strukturēto fragmenta lauku
pirms virknes izveides (nekad neparsējot saplacināto tekstu, tāpēc nekāds fragmenta
saturs — ne ļaunprātīgs, ne parasts, tostarp pamatdaļas, kas satur `]`, piemēram,
`[inaudible]`/`[music]` — nevar saglabāties). Saglabātā izsaukumu žurnāla pieprasījuma pamatdaļā
katra no video iegūtā teksta daļa tiek aizstāta ar šo aizklāto ēnkopiju, atbilstību
nosakot pēc satura vienādības; `fullText` enkurs tiek atkārtoti nolasīts no pabeigtās pirmsizsaukuma drošības
mehānisma slodzes, tāpēc atbilstības noteikšana joprojām izdodas pēc tam, kad vēlākie ķēdes drošības mehānismi (PII un
akreditācijas datu maskētāji ar prioritātēm 10/95) pārraksta apraksta tekstu turpat,
kā arī pēc tam, kad sistēmas uzvednes/nodošanas/Memory ievietošana pārveido ziņojumu masīvu. Modeļa
augšupstraumes pieprasījuma pamatdaļa netiek mainīta. Novērots pieprasījums arī neaizpilda
nekādu pastāvīgu Memory (tiek izlaista gan no pieprasījuma, gan no atbildes iegūto datu izvilkšana),
tāpēc modeļa atbilde nevar atbalsot transkripcijas tekstu Memory.

**Neapstrādāti video lauki (#12430).** Kad tilts ir iespējots un vietējais video atbalsts nav zināms vai tā nav, definēti `transcript`/`audioTranscript` lauki arī aktivizē `videoBridgeObserved`, pat pēc apraksta izveides kļūmes vai `maxVideos` ierobežojuma sasniegšanas. `null` un tukšas virknes tiek ņemtas vērā; neesoši lauki un metadati, kas nav saistīti ar video, netiek ņemti vērā. Saglabātajās kopijās šie lauki tiek aizklāti vai pieprasījums tiek izlaists, un kešatmiņas/Memory tiek apietas.

Šajos rezerves apstrādes ceļos derīgi zvanītāja fragmenti kļūst par atbalstītām `text`/`input_text`
daļām, nevis nestandarta nodrošinātāja laukiem. Abi pieprasījumā norādītie celiņi
joprojām ir neuzticami `client` novērojumi ar skaidru brīdinājumu, ka video
netika aprakstīts un laikspiedoli netika pārbaudīti pret multivides saturu. Esošie
256 fragmentu/64 KiB kopējie un katra fragmenta budžeti tiek piemēroti abiem celiņiem kopā;
laikspiedoliem jāiekļaujas brokera 600 sekunžu robežvērtībā un jebkurā norādītajā fokusa
logā. Nederīgi celiņi tiek atmesti, nevis pārsūtīti kā patvaļīgs teksts; derīgs
blakusceliņš joprojām var tikt izmantots, ja netiek pārsniegts to kopējais budžets. Nulles/tukši
lauki nepievieno tekstu. Šis rezerves mehānisms nepievieno multivides ielādi vai transkribēšanu.
Transkripcijas paplašinājuma lauki tiek noņemti no rezerves video nesēja un tā
`video_url`/`source` objektiem. OpenAI pārraides atļauto elementu saraksts paliek stingrs; nesēji ar nezināmu vietējā
video atbalstu joprojām ir pieejami, un zināmi tikai teksta mērķi saglabā drošus marķierus.
Strukturētās aizklāšanas ēnkopijas aizsargā pievienoto transkripcijas tekstu, savukārt
sākotnējais zvanītājam piederošais pieprasījums paliek nemainīts. Mērķi ar vietējo atbalstu un
atspējoti tilti saglabā esošo apiešanas darbību.

Papildu saglabātās kopijas izmanto to pašu novērota pieprasījuma signālu. Neapstrādātais
klienta pieprasījuma momentuzņēmums pirms drošības mehānisma, atmiņā esošais gaidošais pieprasījums un agrīni
noraidīta pieprasījuma žurnāls strukturāli aizstāj transkripcijas laukus video daļās;
konveijera posmu un konteksta nodošanas sintezētās virkņu uzvednes tiek aizklātas
saglabātā pieprasījuma pamatdaļas izvades punktā. Saglabātais `video_content_removed` marķieris
liek `previous_response_id` turpinājumam droši beigties ar kļūmi, nevis rekonstruēt
tekstu, kas tika apzināti atmests. Ja novērots pieprasījums pirms reģistrēšanas zaudē savu
katras daļas aizklāšanas ēnkopiju vai kaut viena no vairākām video ēnkopijām
pēc vēlākām pieprasījuma izmaiņām vairs neatbilst, saglabātā pieprasījuma pamatdaļa tiek
pilnībā izlaista, nevis tiek saglabāta daļēji aizklāta transkripcija.

Novērota pieprasījuma gadījumā modeļa atbilde var citēt jebkuru transkripcijas daļu
bez strukturētas fragmenta robežas. Tāpēc tās saglabātā izsaukumu žurnāla
`responseBody` tiek aizstāta ar izlaišanas marķieri; detalizētais
konveijera artefakts (kas var ietvert augšupstraumes/klienta pamatdaļas un straumes fragmentus)
netiek saglabāts. Semantiskā, idempotences un spriešanas atkārtošanas kešatmiņa šim
pieprasījumam apiet lasīšanu un rakstīšanu. Nodrošinātāja pieprasījums un klientam redzamā
atbilde paliek nemainīti. Agrīnie savienojuma uzturēšanas baiti tiek iztukšoti no pagaidu
bufera, kad detalizētais artefakts tiek izlaists. Kiro brīdinājums par nederīgu EventStream
ziņo tikai slodzes baitu skaitu, nekad ne tās saturu vai JSON
parsētāja neapstrādāto kļūdu.
Tas neapgalvo, ka būtu auditēta katra nesaistītā nodrošinātāja/spraudņa diagnostika;
plašākā saglabāto izvadpunktu pārbaude tiek izsekota #11658.

Iekšējais `/api/modality-bridge/video/drilldown` dzīves cikls ir atsevišķs,
ar cilpas interfeisu/tokeniem autentificēts kešatmiņas pamatslānis. Katrai operācijai ir nepieciešams arī
kanonisks necaurredzams subjekta ID. Pirms tiek iespējots produkcijas zvanītājs, tam šis
ID ir jāatvasina no autentificētā nomnieka un tas nekad nedrīkst pārsūtīt
klienta izvēlētu vērtību. Kešatmiņas atslēgas sasaista šo subjektu ar kanoniskajiem sesijas un
video atsauces ID, glabā tikai to no SHA-256 atvasinātās atslēgas un ierobežo gan lasīšanu,
gan dzēšanu ar to pašu subjektu. Kešatmiņa katram ierakstam glabā ne vairāk kā 16 atvasinātus JPEG
kadrus, pēc desmit minūtēm tie kļūst nederīgi, un tā atbalsta ierobežītu
`start`/`end` lasīšanu vai nepārprotamu sesijas dzēšanu.

Katram subjektam ir atļauti ne vairāk kā 16 ieraksti un 64 MiB kanonisku JPEG datu. Šie
ierobežojumi nav atkarīgi no globālās 64 ierakstu/256 MiB robežvērtības: subjekta kvotas
spiediens izspiež tikai šī subjekta visilgāk neizmantotos ierakstus, pirms tiek apsvērta globālā
LRU izspiešana. Kešatmiņas darbības laikā ieraksti, kuru derīgums beidzies, tiek izņemti gan no subjekta, gan
globālās uzskaites, savukārt atcelšana un validācijas kļūme nesaglabā daļēju aizvietojumu.

Kešatmiņa noraida nekanonisku Base64, lieku polsterējumu, medijus, kas nav JPEG, bojātus vai nogrieztus JPEG attēlus, kā arī JPEG attēlus, kas ierobežotas pilna attēla `sharp` dekodēšanas laikā rada brīdinājumu. Tā pār kodē katru pieņemto attēlu kā kanonisku JPEG, platumu un augstumu iegūst no dekodētajiem baitiem, nevis paļaujas uz izsaucēja laukiem, un izmet visus beigās esošos poliglota baitus, nevis tos saglabā. Abās kvotās tiek ieskaitīts tikai ierobežotais kanoniskais saspiestais buferis. JSON pārraides formāta limits ietver Base64 pieskaiti 32 MiB dekodētās ievades griestiem. Katrs saglabātais atvasinājums reģistrē savu pārbaudīto JPEG formātu/izšķirtspēju, paraugņemšanas politiku, atvasinājuma versiju, izveides laiku, servera aprēķināto satura jaucējvērtību un jaukto vecāka atsauci, kā arī uzticamā izsaucēja vecāka satura jaucējvērtību. Atcelšana tiek pārbaudīta starp asinhronajām dekodēšanas/jaukšanas fāzēm pirms atomiskās kešatmiņas fiksēšanas.

Šis posms vēl nepievieno ražošanas veidotāju maršrutam un nenodrošina vairākizšķirtspējas variantu izvēli. Caurspīdīgajam Video Bridge pieprasījumu ceļam tāpēc nerodas papildu darbs, savukārt nomniekam piesaistītā principa atvasināšana un pilnais FU-08 vairākizšķirtspējas dzīves cikls paliek skaidri apzīmēts turpmākais darbs, nevis tiek dokumentēts kā pabeigta uzvedība.

Kadri tiek parakstīti secīgi, izmantojot konfigurēto Video modeli. Tukšs Video pārraksts manto Vision iestatījumu; ja abi ir tukši, Vision automātiskais maršrutētājs izvēlas efektīvo redzes spējīgo modeli. Veiksmīgie paraksti aizstāj sākotnējo daļu ar stabilu `[Video description:` prefiksu, kas tekstu arī atzīmē kā neuzticamu, no multivides iegūtu novērojumu un norāda tālākajiem modeļiem neievērot multividē atrastās instrukcijas. Kadru parakstu kešatmiņas atslēgas ietver JPEG baitus, uzvedni, laika zīmogu un efektīvo modeli; kešatmiņā tiek saglabāti tikai veiksmīgie paraksti. Kešatmiņas ieraksti saglabā faktisko veiksmīgā veidotāja modeli, tostarp rezerves modeli; tilts ziņo `mixed`, ja dažādus kadrus veidoja dažādi modeļi. Kešatmiņas trāpījums atkārtoti izmanto šo veidotāja identitāti, nevis pārdēvē to par pieprasīto maršrutēšanas plānu. Visa video rezultātu kešatmiņas atslēga ietver katru ieeju, kas maina izvadi — uzvedni, efektīvo modeli, paraugņemšanas politiku, kadru skaitu, semantiskās analīzes režīmu, normalizētās fokusa norādes SHA-256 pirkstu nospiedumu, fokusa logu, `transcript`, `audioTranscript` un kontaktlapas karogu — tāpēc jebkuras no šīm dimensijām mainīšana ir kešatmiņas garāmietis, nekad ne novecojusi atkārtota izmantošana. Vizuālās dedublikācijas politikas versija, slieksnis un ierobežotais kandidātkadru skaits ir skaidri norādīti arī rezultātu kešatmiņas atslēgā un metadatos; politikas maiņa tāpēc nevar atkārtoti izmantot novecojušu visa video aprakstu. Rezultātu kešatmiņas v4 metadati saglabā režīmu un pirkstu nospiedumu, nekad ne neapstrādātu lietotāja uzdevumu. Aizsardzības mehānisma metadati ziņo gan pieprasīto, gan efektīvo analīzes režīmu; pieprasīts `focused` režīms bez lietojama lietotāja teksta tiek ziņots kā efektīvi `full`.

Aizsardzības mehānisms izvelk katru atbalstīto video daļu, bet apraksta ne vairāk kā `modalityBridgeVideoMaxVideos`. Mērķim, kuram pierādīts `supportsVideo === false`, neveiksmīgie un limitu pārsniedzošie video kļūst par skaidriem drošiem teksta marķieriem, lai neviens neapstrādāts video neizietu cauri. Ja spēja nav zināma, šīs daļas saglabā savu video nesēju; jebkurš rezerves transkripts seko iepriekš aprakstītajai ierobežotajai teksta konvertēšanai. Mērķi ar `supportsVideo === true` apiet tiltu. Klienta pieprasījuma pārtraukšanas signāls izplatās caur lejupielādi, brokeru rindu, apakšprocesiem un parakstu izsaukumiem; pārtraukumi stājas spēkā starp video un kļūmes gadījumā nekad necaurlaiž neapstrādātu multividi.

Izpildlaika iestatījumi ir balstīti datubāzē un validēti ar Zod:

| Atslēga                             | Noklusējums | Diapazons / uzvedība                                                                                          |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Neobligāts izpildlaika iestatījums, ieslēdzams pēc izvēles                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` saglabā vispārīgus parakstus; `focused` izmanto ierobežotu, neuzticamu pēdējā lietotāja kontekstu      |
| `modalityBridgeVideoModel`          | `""`        | Mantot Vision Bridge modeli                                                                                   |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                          |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` vai proporcionāls `segment_aware`; detektora kļūmes gadījumā atgriežas pie `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                           |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                |

Mantotās saglabātās Video noilguma vērtības virs 120 sekundēm tiek ierobežotas līdz brokeru termiņam; jauni iestatījumu ieraksti virs šī limita tiek noraidīti.
`GET /api/modality-bridge/video/runtime` pieprasa uzticami iezīmētu atgriezeniskās cilpas lokalitāti pirms autentifikācijas vai izpildlaika zondēšanas, pēc tam pieprasa pārvaldības autentifikāciju. Tas atgriež tikai `available`, attīrītās FFmpeg/ffprobe versijas un fiksētu iemeslu, kad izpildlaiks nav pieejams. Iekšējais izvilkšanas galapunkts nav publiska augšupielādes API: rindas piesātinājums atgriež `503` plus `Retry-After`, izsaucēja atvienošanās atgriež `499`, un fiksētais brokeru termiņš atgriež `504`. Konvertētās atbildes pievieno
`video->text;model=<visionModel>;parts=<videos>` centrālajai
`x-omniroute-modality-bridge` galvenei, nenoņemot Vision vai Audio segmentus.

### PII Masker (`piiMasker.ts`)

Darbojas **abos** posmos.

- **`preCall`** noklonē lietderīgo slodzi, iziet cauri `system`, `messages`, `input` un `prompt` (ieskaitot vienkāršas virkņu vienības), un piemēro `processPII()` (no `@/shared/utils/inputSanitizer`) virkņu laukiem `content`/`text`. Kad `PII_REDACTION_ENABLED=true`, konstatētie personas dati izejošajā slodzē tiek slēpti. Tas ir neatkarīgi no `INPUT_SANITIZER_MODE` (kas kontrolē tikai uzvednes injekcijas politiku). Kad slēpšana ir izslēgta, izsaukums reģistrē konstatējumu skaitus, nepārrakstot saturu.
- **`postCall`** dziļi noklonē atbildi, izpilda `sanitizePIIResponse()` plus Responses-API-formas maskētāju (`maskResponsesOutput` — aptver `output_text` un `output[].content[].text`). Ja notiek kāda slēpšana, modificētā atbilde aizstāj sākotnējo.

Aizsargmehānisms nekad nebloķē; tas tikai anotē (`meta.detections`, `meta.redacted`) vai pārraksta.

#### Atlase pēc tipa, pielāgotie šabloni un konstatējumu skaitītāji

**Vadības panelis → Iestatījumi → Drošība → PII maskēšana** izvēlas, _kas_ tiek maskēts. Tas neieslēdz maskēšanu: to joprojām nosaka `PII_REDACTION_ENABLED` (pieprasījums) un `PII_RESPONSE_SANITIZATION` (atbilde + SSE), kas abi pēc noklusējuma ir izslēgti.

- **Atlase pēc tipa** — iebūvētie identifikatori ir uzskaitīti `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ja nav iestatīts, tiek izmantoti visi tipi (uzvedība, kāda bija pirms šī iestatījuma pastāvēšanas). Pieprasījumu dzinēja `ssn_us` šablons tiek kartēts uz `ssn`. Veidnes (Minimal, Standard, Financial, Brazilian, USA, Full) tikai aizpilda izvēles rūtiņas lietotāja saskarnē.
- **Pielāgotie šabloni** — līdz 20 regulāro izteiksmju vai aizstājējzīmju šabloniem (`*` = līdz 64 rakstzīmēm bez atstarpēm, `?` = viena). Atbilstības kļūst par `[CUSTOM_REDACTED]`. Katrs šablons iet caur `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): ne vairāk kā 500 rakstzīmes, karodziņi ierobežoti līdz `g i m s u`, tam ir jākompilējas, jāiztur `safe-regex` pārbaude (katastrofālā atgriezeniskā meklēšana) un tas nedrīkst atbilst tukšai virknei vai slēpšanas vietturim. Šablons, kas neiztur pārbaudi, tiek noraidīts gan saglabājot, gan testējot, un saglabāta rinda, kas neiztur pārbaudi, izpildlaikā tiek izlaista, nevis kompilēta. Pielāgotie šabloni darbojas tikai, kamēr maskēšana ir ieslēgta.
- **Konstatējumu skaitītāji** — skaitļi pa tipiem (nekad atbilstošās vērtības), kas tiek turēti atmiņā un atiestatīti pārstartējot (`src/lib/pii/piiDetectionStats.ts`). Tie palielinās tikai, kamēr maskēšana ir ieslēgta.

Iestatījumi atrodas tabulā `key_value` (nosaukumvieta `pii_settings`, `src/lib/db/piiSettings.ts`) un tiek lasīti caur 1 s kešu. API:

| Metode | Ceļš                     | Nozīme                                                                                   |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Karodziņu stāvoklis, `enabledTypes`, `customPatterns`, konstatējumu skaitītāji           |
| `PUT`  | `/api/settings/pii`      | Aizstāj `enabledTypes` (`null` = visi) un/vai `customPatterns`                           |
| `POST` | `/api/settings/pii/test` | Testa izpilde vienam šablonam pret paraugu, kas nepārsniedz 8 KB; nekas netiek saglabāts |

Visas trīs prasa pārvaldības autentifikāciju un pārbauda pieprasījuma ķermeni ar Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Uzvednes injekcija (`promptInjection.ts`)

Atklāj naidīgas struktūras lietotāja iesniegtajā saturā un īsteno konfigurēto politiku. Uzvedību nosaka vides mainīgie un konstruktora opcijas:

| Iestatījums          | Vides mainīgais                                                                                                | Noklusējums | Iedarbība                                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ieslēgts             | `INPUT_SANITIZER_ENABLED`                                                                                      | `true`      | Ja `false`, aizsargmehānisms tiek izlaists.                                                                                                                                                    |
| Režīms               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                | `warn`      | Injekcijas politika: `block`, `warn` vai `log`. (`redact` tiek pieņemts atpakaļsaderībai, bet **ne**noņem injekcijas tekstu; pieprasījuma PII pārrakstīšanu kontrolē `PII_REDACTION_ENABLED`.) |
| Bloķēšanas slieksnis | `blockThreshold` opcija / `INPUT_SANITIZER_BLOCK_THRESHOLD` (aizstājējvārds `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Minimālais smaguma līmenis, kas nepieciešams bloķēšanai. Vidējais (Medium) līmenis pēc noklusējuma ir paredzēts tikai novērošanai.                                                             |

**Režīma prioritāte** (`getMode`): izsaucēja `options.mode` →
`INJECTION_GUARD_MODE` **DB funkcionalitātes karodziņa pārrakstījums** (Vadības panelis → Iestatījumi →
Funkcionalitātes karodziņi) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Tādējādi vadības paneļa pārrakstījums ir spēcīgāks par vides mainīgajiem, tāpēc
Funkcionalitātes karodziņu UI kontrolē strādājošo aizsargu reāllaikā (bez pārstartēšanas). DB lasīšana ir fail-safe:
ja tā neizdodas, aizsargs atgriežas pie uz vides mainīgajiem balstītas uzvedības, un, kad
pārrakstījums nav iestatīts, uzvedība ir identiska izšķirtspējai, kas balstīta tikai vides mainīgajos.

Konstatēšanas avoti:

1. `sanitizeRequest()` no `@/shared/utils/inputSanitizer` (kopīga detektoru
   kopa, ko izmanto arī citur konveijerā).
2. Iebūvētie `DEFAULT_GUARD_PATTERNS` (pašlaik `system_override_inline` un
   `markdown_system_block`, abi ar `high` smaguma līmeni).
3. Pēc izvēles nodotie `customPatterns` caur konstruktora opcijām (virknes, regulārās izteiksmes
   vai `{ name, pattern, severity }` ieraksti).

Kad `mode === "block"` **un** vismaz viena detekcija sasniedz smaguma slieksni, `preCall` atgriež `{ block: true, message: "Request rejected: suspicious content detected" }`. Režīmos `warn`/`log` aizsargmehānisms reģistrē žurnālā, bet atļauj izsaukumu. Koplietojamā palīgfunkcija `evaluatePromptInjection()` ir arī eksportēta izsaucējiem, kuriem jānovērtē uzvednes, neizmantojot reģistru.

**Skenēšanas robeža (v3.8.20):** detektors pārbauda tikai **pirmos 16 KB** no apvienotā uzvednes teksta — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) failā `src/shared/utils/inputSanitizer.ts`. Gan `detectInjection()`, gan `evaluatePromptInjection()` izpilda `slice(0, MAX_INJECTION_SCAN_BYTES)` pirms modeļu cilpas palaišanas. Injekcijas direktīvas atrodas ievades augšdaļas tuvumā, tāpēc tas ierobežo regex CPU/GC patēriņu vairāku simtu KB lielām datu kravām, nepavājinot noteikšanu (sk. #3932, #4041).

### Akreditācijas datu maskētājs (`credentialMasker.ts`)

Darbojas **abos** posmos, pēdējais noklusējuma ķēdē (prioritāte `95`). Izsvītro plaši zināmus API atslēgu / slepeno tokenu modeļus no izejošās datu kravas (ziņojumu saturs, rīku izsaukumu argumenti, rīku rezultāti) **un** nodrošinātāja atbildes, lai uzvednē ielīmēti akreditācijas dati (vai rīka rezultātā atkārtoti) nenoplūstu augšupējam nodrošinātājam vai atpakaļ klientam.

- **Tikai opt-in režīmā**, tāda pati konvencija kā PII izsvītrošanai (saistībā ar Stingro noteikumu #20): atspējots, ja vien `settings.credentialRedactionEnabled === true` **vai** `CREDENTIAL_REDACTION_ENABLED=true`. Ja tas ir izslēgts, aizsargmehānisms ir tukšdarbība (no-op) — tas nekad nebloķē un nekad nepārraksta.
- `redactCredentials()` šķērso visu datu kravas/atbildes koku (`walkValue()`, drošs pret prototipu piesārņošanu, ciklu drošs, izmantojot `WeakSet`) un aizstāj atbilstības ar `[REDACTED:<type>]` vietturi, klonējot tikai tos zarus, kas faktiski ir mainījušies.
- `CREDENTIAL_PATTERNS` aptver LLM nodrošinātāju atslēgas (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenus (GitHub, Slack, Linear, Notion, npm, Postman, Discord), maksājumu atslēgas (Stripe, Square), mākoņa atslēgas (AWS piekļuves atslēga, Twilio, SendGrid, Mailgun), privātās atslēgas / JWT, akreditācijas datus ietverošas savienojuma virknes (`mongodb://user:pass@...` u.c.) un vispārīgu `Authorization`/`x-api-key`/`api-key`/`apikey` galvenes vērtības modeli. Galvenes formas atslēgas (`authorization`, `x-api-key`, `api-key`, `apikey`) tiek izsvītrotas strukturāli (tikai vērtība, shēmas prefikss, piemēram, `Bearer `/`Basic `, tiek saglabāts), nevis ar vispārīgo teksta regulāro izteiksmi.
- Aizsargmehānisms nekad nebloķē; tas tikai pārraksta (`modifiedPayload` / `modifiedResponse`) un pievieno anotācijas (`meta.credentialsRedacted`, `meta.count`).

Regresijas aizsardzība: `tests/unit/credential-masker-guardrail.test.ts`.

## Bāzes līgums (`base.ts`)

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
  block?: boolean; // true pārtrauc ķēdi
  message?: string; // tiek parādīts bloķējot
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall to atgriež, lai pārrakstītu pieprasījumu
  modifiedResponse?: TValue; // postCall to atgriež, lai pārrakstītu atbildi
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

Guardrail signālu "bez izmaiņām" nodod, atgriežot `void`, `{}` vai
`{ block: false }`. `modifiedPayload`/`modifiedResponse` atgriešana aizstāj
vērtību, kas plūst pa ķēdi uz turpmākajiem guardrail.
`signal?: AbortSignal` pārnes izsaucēja dzīvesciklu uz guardrail. Pieprasījuma pārtraukšana ir apzināts fail-open izņēmums: multivides tilti pārtrauc darbu un veic tīrīšanu, neatjaunojot neapstrādāto multividi mērķim, par kuru zināms, ka tas to neatbalsta.

## Reģistrs (`registry.ts`)

Singltons `guardrailRegistry` piedāvā:

- `register(guardrail)` — pievieno guardrail (vai aizstāj to pēc normalizētā nosaukuma) un
  pārkārto augošā `priority` secībā.
- `clear()` / `list()` — administratīvās palīgfunkcijas.
- `runPreCallHooks(payload, context)` — iziet cauri aktīvajiem guardrail, virza
  payload caur `modifiedPayload` un apstājas pie pirmā `block: true`.
- `runPostCallHooks(response, context)` — tāda pati plūsma atbildes pusē.
- `resetGuardrailsForTests({ registerDefaults })` — notīra stāvokli un pēc izvēles
  atkārtoti reģistrē noklusējuma guardrail tīrai testu izolācijai.

Abi izpildītāji atgriež `{ blocked, payload|response, results, guardrail?, message? }`,
kur `results` ir `GuardrailExecutionResult` ierakstu masīvs, kas katram guardrail
ietver laukus `blocked`, `skipped`, `modified`, `error` un `meta`,
kas noder izsekošanai.

### Guardrail atspējošana pieprasījuma līmenī

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` apkopo guardrail
nosaukumu sarakstu bez dublikātiem, kas jāizlaiž pašreizējam
pieprasījumam. Ir pieci kanāli, kas tiek lasīti šādā secībā un apvienoti vienā
sarakstā (deduplicējot priekšroka ir pirmajam gadījumam):

1. `apiKeyInfo.disabledGuardrails`
2. Pieprasījuma pamatteksta `disabledGuardrails` (augšējā līmenī)
3. Pieprasījuma pamatteksta `metadata.disabledGuardrails` (tikai ja `metadata` ir objekts)
4. Galvene `x-omniroute-disabled-guardrails`
5. Mantotā galvene `x-disabled-guardrails`

Tiek apvienoti visi pieci kanāli, ieskaitot abas galvenes: sūtot gan
`x-omniroute-disabled-guardrails`, gan `x-disabled-guardrails`, tiek izlaista to
sarakstu apvienojuma kopa, un tukša mūsdienu galvene vairs neslēpj mantoto
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), salabots
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Vērtības var būt virkņu masīvi vai ar komatiem atdalīta virkne; nosaukumiem tiek
noņemtas liekās atstarpes un tie tiek normalizēti mazajiem burtiem kebab-case
formātā (`pii_masker` → `pii-masker`), bet tukšie ieraksti tiek izmesti.
Rezultāts caur `context.disabledGuardrails` tiek nodots reģistram,
kas izlaiž atbilstošos guardrails (`skipped: true` laukā `results`).

Atspējošanas saraksts ietekmē tikai **reģistru**. Prompt-injection `block` režīms ir
obligāta robeža: injekciju aizsardzības starpprogrammatūra
(`src/middleware/promptInjectionGuard.ts`) izsauc `evaluatePromptInjection()`
bez jebkāda izsaucēja kontrolējamā atspējošanas saraksta (tās agrāk veiktais
neizmantotais `resolveDisabledGuardrails({ body })` izsaukums tika noņemts
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), tāpēc pieprasījums,
kas atspējo `prompt-injection`, `block` režīmā joprojām tiek noraidīts. Tas ir
apzināts arhitektūras lēmums. Atspējošanas kanāli ir izsaucēja kontrolējami
(pieprasījuma pamatteksts, metadati, galvenes), un izsaucējs nedrīkst
spēt izslēgt drošības kontroli, ko iestatījis operators
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Galveņu
apvienojums no [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
maina tikai to, kuri reģistra guardrail tiek izlaisti; tas neļauj klientam
apiet starpprogrammatūru. Obligātās guardrail politikas atslēgu un
grupu līmenī tiek izsekotas v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Skatiet [Pārklājums un ierobežojumi](#coverage-and-limits).

## Izpildes secība

Katram pieprasījumam, kas plūst caur `src/sse/handlers/chat.ts` un
`open-sse/handlers/chatCore.ts` (tērzēšanas saimes maršruti, kas uzskaitīti sadaļā
[Pārklājums un ierobežojumi](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` izveido izlaišanas sarakstu no API atslēgas,
   pieprasījuma ķermeņa un galvenēm.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` izpilda aizsargmehānismus
   (guardrails) augošā prioritātes secībā:
   - Atspējotie aizsargmehānismi tiek reģistrēti kā `skipped`.
   - Katra aizsargmehānisma `preCall` var pārrakstīt payload, izmantojot
     `modifiedPayload`.
   - Pirmais `block: true` pārtrauc ķēdi, un apstrādātājs atgriež
     aizsargmehānisma noraidījuma atbildi.
3. (Iespējami pārrakstītais) payload nonāk combo maršrutēšanā un nosūtīšanā uz
   upstream.
4. **Tikai bez straumēšanas:** pēc tam, kad atbilde ir salikta,
   `guardrailRegistry.runPostCallHooks(...)` izpilda to pašu ķēdi uz atbildes.
   `block: true` šajā posmā izmet upstream atbildi un atgriež HTTP 400.
   Straumētās atbildes šo soli pilnībā izlaiž.

Aizsargmehānismi, kas izmet izņēmumu, tiek reģistrēti ar `error: <message>` un
ierakstīti žurnālā, izmantojot `logger.warn`, taču ķēde turpinās — pēc nodoma
fail-open.

## Pārklājums un ierobežojumi

Aizsargmehānismu reģistrs ir ieslēgts tikai tērzēšanas konveijerā. Šos
ierobežojumus fiksē testi `tests/unit/guardrail-pipeline-wiring-characterization.test.ts`
un `tests/unit/guardrail-pipeline-characterization.test.ts`; mainot uzvedību,
šos testus apzināti atjauniniet.

### Kur darbojas huki

| Hoks / vadība                                  | Izpildās                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                              | Pieprasījumi, ko apstrādā `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (un `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, kā arī Telegram tērzēšanas starpnieks (proxy). Tāpat vadības paneļa testa galapunkts `/api/guardrails/test`. Blokēšana pirms izsaukuma atgriež HTTP 400. |
| `runPostCallHooks`                             | **Tikai bezstraumes** tērzēšanas atbildes (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Straumētās atbildes to nekad nesasniedz.                                                                                                                                                                                                                                                                                                                         |
| Straumēšanas PII                               | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), kas tiek pieslēgts `streamingPipeline.ts`, kad `PII_RESPONSE_SANITIZATION` ir ieslēgta. Tas nav aizsargmehānisms, tāpēc atspējošanas kanāli to neietekmē.                                                                                                                                                                                                                                            |
| Injection-guard starpprogrammatūra (mantojuma) | Katrs `/v1` maršruts, kas satur promptu, tostarp tērzēšanas saimes maršruti (skatīt [maršrutu pārklājumu](#injection-guard-route-coverage--red-team-phase-8--block-d)). Tikai promptu injekcijas.                                                                                                                                                                                                                                                                  |

### Kas netiek pārklāts

- **Multivides, embeddings un datu maršruti** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nekad nesasniedz reģistru. Tur
  nedarbojas ne PII maskēšana, ne piekļuves datu maskēšana, ne modalitātes
  tilts. To vienīgā pārbaude ir mantojuma injection-guard starpprogrammatūra.
- **Straumētajām atbildēm** netiek piemēroti aizsargmehānismi pēc izsaukuma:
  nav `pii-masker` vai `credential-masker` pēc izsaukuma, kā arī nav blokēšanas
  pēc izsaukuma. Darbojas tikai straumēšanas PII transformācija (kad
  `PII_RESPONSE_SANITIZATION` ir ieslēgta). Piekļuves dati, kas straumētā
  atbildē tiek atdoti atpakaļ, netiek nomaskēti.
- **Atspējošanas kanāli pretī starpprogrammatūrai (apzināti):**
  starpprogrammatūra novērtē promptu injekciju ar savu `evaluatePromptInjection()`
  izsaukumu, nepadodot nekādu izsaucēja kontrolētu atspējošanas sarakstu.
  `block` režīms ir obligāta robeža, ko izsaucēja kontrolētās atspējošanas
  nevar apiet, tostarp tērzēšanas saimes maršrutos
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  `prompt-injection` atspējošana izlaiž tikai reģistra aizsargmehānismu.

### Kas redz atbildi pirms apstrādes pēc izsaukuma

Ceļā bez straumēšanas secība ir šāda: atmiņas izvilkšana → iebūvēto rīku
izpilde → aizsargmehānismi pēc izsaukuma → izeja pie blokēšanas pēc izsaukuma →
saglabāšana semantiskajā kešatmiņā.

- **Atmiņas izguve** un **rīku izpilde** redz atbildi pirms tam, kad
  pēcizsaukuma aizsargmehānismi to var pārrakstīt vai bloķēt. Kopš
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) atmiņas
  izguve izvilkto tekstu izlaiž caur `sanitizePII`, kad
  `PII_RESPONSE_SANITIZATION` ir ieslēgta (gan straumēšanas, gan
  nestraumēšanas režīmā), taču atbilde, ko pēcizsaukuma aizsargmehānismi vēlāk
  bloķē, joprojām ir tikusi piedāvāta atmiņai un rīkiem.
- **Semantiskā kešatmiņa** saglabā atbildi pēc pēcizsaukuma apstrādes, tāpēc tā
  saglabā pārrakstīto atbildi, un bloķētā atbilde netiek kešota. Kešatmiņas
  ieraksti ir piesaistīti katrai API atslēgai.

## Konfigurācija

Vides mainīgie, ko nolasa iebūvētie aizsarglīdzekļi:

| Mainīgais                             | Izmanto                     | Ietekme                                                                                                  |
| ------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`          | Iestatiet `false`, lai pilnībā atspējotu atklāšanu.                                                      |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`          | Injekciju politika: `warn`, `block` vai `log`. Mantojuma vērtība `redact` nepārraksta injekcijas tekstu. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`          | Injekcijas aizsarga režīms; arī DB funkcijas karogs, kas **pārspriež** vides mainīgos (DB > ENV).        |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`          | Minimālais smaguma līmenis, ko `MODE=block` noraida: `high` (noklusējums), `medium` vai `low`.           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`          | Mantojuma aizstājvārds priekš `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`                | Ja `true`, pieprasījuma PII tiek maskēts (neatkarīgi no injekcijas režīma).                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (lejupstraumē) | Kontrolē atbildes puses maskētāja uzvedību.                                                              |

Modality Bridge aizsarglīdzekļi nolasa izpildlaika konfigurāciju no datubāzes
atbalstītas iestatījumu krātuves (`getSettings()`), nevis no vides mainīgajiem.
Vision primārās atslēgas ir
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` un
`modalityBridgeCacheMaxEntries`. Mantojuma
`visionBridge*` atslēgas tiek pieņemtas tikai kā dokumentēts viena cikla
lasīšanas rezerves variants; informācijas paneļa ieraksti izmanto primārās
atslēgas. Noklusējumi un rezerves atrisinātājs atrodas
`src/shared/constants/modalityBridgeDefaults.ts`, bet mantojuma
konstantes ir saglabātas `src/shared/constants/visionBridgeDefaults.ts`.

Audio izmanto `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` un `modalityBridgeAudioMaxClips`, kā arī kopīgos
`modalityBridgeCache*` iestatījumus. Audio nav mantojuma atslēgu rezerves
varianta, jo šīs atslēgas tika ieviestas kopā ar Modality Bridge shēmu.

Video izmanto `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` un
`modalityBridgeVideoTimeout`, kā arī kopīgos `modalityBridgeCache*` iestatījumus.
Tas pēc noklusējuma ir atspējots, jo FFmpeg/ffprobe ir neobligātas
operacionālās atkarības, un kadru parakstīšana palielina aizkavi un modeļa
izmaksas.

## Pielāgoti aizsargmehānismi

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

Soļi:

1. Izveidojiet `src/lib/guardrails/myGuardrail.ts`, kas paplašina `BaseGuardrail`.
2. Implementējiet `preCall` un/vai `postCall`.
3. Vai nu reģistrējiet importēšanas laikā (push no `registerDefaultGuardrails`), vai
   izsauciet `guardrailRegistry.register(...)` izpildes laikā — reģistrs aizstāj
   jebkuru iepriekšējo aizsargmehānismu ar tādu pašu normalizētu nosaukumu.
4. Pievienojiet testus mapē `tests/unit/` (esošie piemēri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testēšana

Starp testiem izmantojiet `resetGuardrailsForTests()`, lai sāktu no zināma stāvokļa.
Norādiet `{ registerDefaults: false }`, lai sāktu ar tukšu reģistru un reģistrētu
tikai testēšanā esošos aizsargmehānismus. Vision Bridge pieņem atkarību injekciju
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge atklāj līdzvērtīgus
pieslēguma punktus iestatījumiem, iespējām, STT modeļa izvēlei, akreditācijas datu
pārbaudēm un transkripcijai. Tādējādi testi var izpildīt abas plūsmas bez datubāzes
vai tīkla piekļuves.

## Skatiet arī

- `src/lib/guardrails/` — implementācija
- `src/shared/utils/inputSanitizer.ts` — koplietojamais detektors, kas nodrošina
  prompt-injection un PII maskēšanu
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge noklusējumi un
  piespiedu-tilta modeļu saraksts
- `src/shared/constants/modalityBridgeDefaults.ts` — koplietojamie Vision/Audio izpildlaika noklusējumi
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonālais slānis (circuit breaker, atdzišanas periodi)
- `docs/reference/ENVIRONMENT.md` — pilnā vides mainīgo atsauce

## Injection-guard maršrutu pārklājums un red-team (8. fāze · D bloks)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) aptver visus maršrutus,
kas pieņem lietotāju vaicājumus. Tas ievēro `INJECTION_GUARD_MODE` (noklusējums `warn` = tikai reģistrē;
`block` = atgriež HTTP 400 `SECURITY_001`).

| Tips             | Maršruti                                                                                                                                             | Noklusējuma režīms |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Teksts (esošais) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn               |
| Ģeneratīvs       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn               |
| Dati             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn               |

Teksta izvilkšana (`extractMessageContents`) aptver `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (iknakts, `nightly-llm-security.yml`):** promptfoo pārbauda, ka katrs maršruts bloķē
OWASP-LLM korpusu režīmā `INJECTION_GUARD_MODE=block`; garak izpilda zondes (bez slepenās atslēgas izlaiž).
`moderations` ir iekļauts konsekvencei. Bloķēšanas režīms ir obligāta robeža: `evaluatePromptInjection()`
ignorē starpprogrammatūras nodoto atspiegošanas sarakstu katram pieprasījumam, tāpēc `disabledGuardrails`
maršrutu no tā **neatbrīvo** ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Iknakts darbplūsmai (`.github/workflows/nightly-llm-security.yml`, cron + manuāla
palaišana) ir divi darbi:

- **`promptfoo-guard` (bloķējošs)** — izpilda `promptfoo eval -c promptfooconfig.yaml`
  ar `INJECTION_GUARD_MODE=block`. Katrs antagonistiskais gadījums (piem., "ignore all
  previous instructions…", DAN stila jailbreak uzbrukumi) pārbauda, ka atbilde satur
  `error.code === "SECURITY_001"`, t.i., ka aizsargs faktiski noraidīja pieprasījumu.
- **`garak` (konsultatīvs)** — izpilda garak `--probes promptinject,dan,leakreplay`
  pret lokālu OmniRoute instanci (`http://localhost:20128/v1`). Tas ir atkarīgs no
  pakalpojumu sniedzēja slepenās atslēgas (`PROMPTFOO_PROVIDER_KEY`); graciozi izlaižas
  un tam ir piedēklis `|| true`, tāpēc tas ziņo, neizjaucot CI.

Aizsarga palīgfunkcijas (`createInjectionGuard` / `withInjectionGuard`) pārklājums
aptver katru `/v1` maršrutu, kas nes vaicājumu; vaicājuma tekstu no
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` iegūst
`extractMessageContents()` failā `src/shared/utils/inputSanitizer.ts`.
