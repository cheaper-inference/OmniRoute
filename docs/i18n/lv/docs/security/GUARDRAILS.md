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

### Video tilts (`videoBridge.ts`, `videoBridgePipeline.ts`)

Pārtver augstākā līmeņa video daļas programmā Chat Completions `messages` un Responses API `input` pirms tiek izsaukts mērķis bez zināma vietējā video atbalsta. Atbalstītās formas ir `input_video`, `video_url`, `video_source`, HTTPS URLs un `data:video/*;base64,...` data URIs. Vienkārši failu nosaukumi tekstā netiek uzskatīti par video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) pieder pieprasījuma šķērsošana, capability/policy pārbaude, pieprasījuma apkopošana un atbildes slodze. Katra video darba — iegūšana, visa rezultāta kešatmiņa, kas apraksta kadru secību (kas apvieno jebkuru zvanītāja deklarēto audio atšifrējumu) un katram mēģinājumam metrics/abort/cleanup — ir paslēpts aiz `processVideoPart` `videoBridgePipeline.ts`, kas tiek izsaukts vienu reizi katrā video daļā `preCall` cilpas iekšpusē. Šis modulis nosaka arī precīzās portu robežas `VideoMediaBrokerPort` (baitu iegūšana un izlases kadru izvilkšana), `VideoAudioTranscriptionPort` (zvanītāja deklarēta audio transkripta sapludināšana ar izlases parakstiem) un `VideoDrilldownPort` (mantotā neapstrādātā veikala forma). Ražošanas STT un rāmja saglabāšana tiek veidota ap aprakstošo portu, izmantojot `createVideoSttAdapter` un `createVideoDrilldownAdapter`; pēdējais izmanto kopīgu necaurspīdīgā roktura dzīves ciklu.

Publiskais `/v1` pieprasījuma ceļš nekad neimportē vai neizsauc apakšprocesu. Attālinātie videoklipi tiek lejupielādēti ar 50 MiB ierobežojumu; iekļautajiem base64 videoklipiem ir konservatīvs 36 MiB dekodētais videoklipa ierobežojums, tāpēc model/messages/framing aploksne var palikt publiskā JSON pieprasījuma pieļaujamā ierobežojuma robežās — 50 MiB. Pirms piešķiršanas tiek pārbaudīti iekļautie garuma un dekodētā izmēra aprēķini. HTTPS ir nepieciešams sākotnējā attālajā URL un katrā novirzīšanā, izmantojot esošo tikai publisko izejošo aizsargu ar DNS piespraušanu. Pēc tam baiti šķērso precīzu iekšējo `POST /api/modality-bridge/video/extract` brokera robežu. Šis maršruts ir gan `LOCAL_ONLY`, gan `SPAWN_CAPABLE`, tas pieņem tikai katram procesam autentificētu, uzticamas cilpas pieprasījumu un nekad nepieņem URL, failu sistēmas ceļu, izpildāmo failu vai argumentu sarakstu. API korpusa izmēra cauruļvads un apdarinātāja inkrementālais korpusa lasītājs neatkarīgi nodrošina 50 MiB brokera ievades vāciņu. Tās ierobežotajā rindā vienlaikus tiek izpildīta viena izvilkšana, ir atļauti četri neapstiprinātie darbi un tiek ierobežota gaidošā ievade pie 100 MiB.

Brokera iekšpusē `ffprobe` nolasa privātu lokālo failu; fiksētā formāta atļaušanas saraksts neietver atskaņošanas sarakstu un manifesta formātus. Atļautajiem MOV ģimenes konteineriem ārējās MOV datu atsauces pēc noklusējuma paliek atspējotas, un fiksētā komanda tos neizvēlas. Gan `ffprobe`, gan `ffmpeg` izmanto `file` -only protokola balto sarakstu, vienu pavedienu, fiksētus argumentu masīvus, bez čaulas un izpildāmos failus, kas atrisināti no `PATH`. Pievienoto attēlu vāka straumes nav atskaņojamas. Visām atskaņojamām straumēm ir jāatbilst ierobežojumiem, un pirms deterministiskā zemākā indeksa atkāpšanās priekšroka tiek dota skaidrai noklusējuma straumei. Videoklipu garums ir ierobežots līdz 600 sekundēm, 8192 pikseļi katrā dimensijā un 33 554 432 avota pikseļi. FFmpeg izlasē 1–16 viduspunkta JPEG kadrus, samazina garo malu līdz ne vairāk kā 1024 pikseļiem, nepalielinot mazākas ievades vērtības, un nekad nesaņem URL. Pēc noklusējuma paraugu ņemšana ir `uniform`. Neobligātās `scene_aware` un eksperimentālās `segment_aware` politikas veic vienu papildu fiksētu FFmpeg pāreju pār jau apstiprināto lokālo straumi, atlasa ierobežotas `showinfo` ainas laikspiedolus un deterministiski atgriežas uz tiem pašiem vienotajiem viduspunktiem detektora kļūmes, taimauta, nepareizi veidotas izvades vai tukšas kandidātkopas gadījumā. Segmenta apzināšanās režīms piešķir viduspunkta paraugus proporcionāli apstiprinātajiem ainu intervāliem; Segmentu apzinošie pierādījumi un atkāpšanās darbības ir detalizēti aprakstītas tālāk. Cietais 16 kadru ierobežojums tiek piemērots pēc atlases katrā politikā. Ja sižeta pieprasījumam ir tikai viena kadra budžets, tas izmanto vienotu aktīvā pilna video vai fokusa loga viduspunktu un ziņo par `policyEffective: uniform`: viens atlasītais sižeta kadrs nevar saglabāt abus laika galus. Zvanītājs pēc izvēles var nodrošināt ierobežotu fokusa logu (`start`/`end` sekundes); robežas tiek ierobežotas ar datu nesēja ilgumu, apgrieztie vai neierobežotie logi tiek noraidīti, un visas izlases politikas tiek veiktas tikai normalizētajā intervālā. Iegūtais logs ir iekļauts izlases metadatos un neuzticamā apraksta prefiksā, lai pakārtotie modeļi varētu atšķirt koncentrētu fragmentu no pilnas laika skalas.

Semantisko parakstu fokuss ir atsevišķs, nepārprotams iestatījums. Noklusējuma `full` analīzes režīms saglabā esošo kadru uzvedni un nekad nepārsūta pieprasījuma tekstu uz parakstu modeli. `focused` režīmā tilts nolasa tikai jaunāko netukšo lietotāja autorizēto `text`/`input_text` no tā paša tērzēšanas vai atbilžu konteinera, normalizē to uz NFC, sakļauj kontroles rakstzīmes un atstarpes un ierobežo to līdz 500 unikoda koda punktiem. Tukšs rezultāts atgriežas precīzi `full` uzvednē. Izmantojams mājiens tiek seriāli veidots kā JSON speciālā neuzticamā lietotāja konteksta blokā, un tas var piešķirt prioritāti tikai novērojamām detaļām; tas nevar ignorēt atsevišķu brīdinājumu par datu nesējā redzamo vai dzirdamo instrukciju ievērošanu. Teksta fokuss nekad neizsecina `start`/`end` vai nemaina laika paraugu ņemšanu.

#### FU-07 strukturālā segmenta pierādījumi

`segment_aware` izmanto vienu ierobežotu pirmsanalīzes pāreju jau apstiprinātajai vietējai video straumei. Fiksētā filtra ķēde vispirms mērogojas līdz ne vairāk kā 320 pikseļu platumam, nosaka ainas izmaiņas un fiksētos intervālus, pēc tam ņem paraugus ar ātrumu 1 kadrs sekundē, lai iegūtu izplūšanas, vidējās gaismas un spatial/temporal informāciju. Caurlaide ir ierobežota līdz 600 strukturālajiem paraugiem, vienam FFmpeg/filter pavedienam, vienam un tam pašam `file` -only protokolam un konteineru atļaušanas sarakstiem, 1 MiB procesa izvades saitei un ne vairāk kā 30 sekundēm starpnieka koplietotajā abort/deadline. Tā nekad nepieņem no pieprasījuma komandu, filtru, ceļu vai URL.

Strukturālās vērtības ir deterministiski izlases pierādījumi, nevis semantiskā video izpratne. Tie neizsecina tēmas, darbības, parakstus, runu vai lietotāja nolūku. Ainu un sasalšanas robežas veido segmentus; fiksēts pārklājums, izplūšana, ekspozīcija, telpiskās detaļas un laika izmaiņas ietekmē tikai to, kā tiek piešķirts esošais 1–16 kadru budžets. Pilnībā iesaldētam segmentam ir ierobežots viens kadrs, savukārt nesaldēti segmenti sacenšas par atlikušo budžetu. Ja robežas pārsniedz kadru skaitu, tiek saglabāts vienmērīgs laika skalas pārklājums, tāpēc ātrie agrīnie griezumi nevar paslēpt garu beigu segmentu. Ainu robežas sasalšanas robežas 1 sekundes analīzes izšķirtspējā tiek apvienotas.

Trūkstošie filtri, malformed/empty pierādījumi, detektora kļūda vai ierobežots pirmsanalīzes taimauts neatbilst precīzai vienotai viduspunkta politikai. Zvanītāja pārtraukšana vai starpnieka termiņš neizdodas atvērt: tas pārtrauc apakšprocesu lidojuma laikā, novērš vēlāku kadra izvilkšanu, un privātais pagaidu koks tiek noņemts programmā `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ģenerē deterministiskus reālus FFmpeg armatūras ietaupījumus pēc parakstu izsaukšanas, blīvas kustības budžeta sadales, blur/exposure/SI-TI pierādījumu, ātru samazinājumu ar garu asti un pakāpenisku viltus pozitīvu rezultātu izzušanu. Tas reģistrē pirmsanalīzes sienas laiku un, ja ir pieejams `/usr/bin/time`, bērnu CPU un maksimālo RSS. Tās kvalitātes pārbaudes ir tikai struktūras orākuli. Īsta parakstu modeļa kvalitāte joprojām ir `HOLD` jo šai siksnai nav atļauta galapunkta vai iesaldēta tiesneša. Naudas ietaupījumi arī paliek `HOLD`, ja vien `--caption-cost-per-call-usd` nesniedz skaidru pozitīvu aprēķinu par katru zvanu; skripts nekad nesafabricē nevienu rezultātu.

Katrs kadrs ir ierobežots līdz 4 MiB, visi neapstrādātie kadri kopā līdz 23 MiB un sērijveida starpnieka reakcija līdz 32 MiB. Privāts pagaidu direktorijs tiek noņemts programmā `finally`. OmniRoute neapkopo FFmpeg un nepieņem pielāgotu izpildāmo ceļu. Pirms parakstu pievienošanas tilts izmanto konservatīvu vizuālo dublēšanas pāreju: katrs JPEG tiek samazināts līdz 16 × 16 pelēktoņu buferim un tiek salīdzināts tikai ar pēdējo saglabāto kadru. Ja pieprasītais subtitru budžets pārsniedz vienu kadru, izvilkšana nodrošina ierobežotu kandidātu kopu līdz pat divreiz lielākam budžetam un nekad vairāk par 16 kadriem. Pieprasītā maksimālā robeža tiek piemērota tikai pēc dublēšanas, pirmie un galīgie atlasītie kandidāti tiek saglabāti galīgās retināšanas laikā, kad budžets ir vismaz divi. Versionētā `grayscale-16x16-mean-cells-v2` politika izmanto lielāko no vidējā luma delta un to sīktēlu šūnu attiecību, kuru normalizētā delta ir vismaz 0,05. Dublikāta slieksnis ir konstante 0,04, kas izvēlēta paredzamībai, nevis tiek rādīta kā izpildlaika iestatījums. Šis sekundārais augsta kontrasta signāls saglabā nelielas kustības un redzamā teksta izmaiņas, kuras var paslēpt tikai vidējais salīdzinājums. Salīdzinājuma vai dekodētāja kļūdas neizdodas atvērt un saglabāt pārklājumu. Izvades metadati atdala izvilktos kandidātus, veiksmīgi izmantotos kadrus un atmet vizuālos dublikātus.

Īpaši atzīmēta video daļa var pieprasīt kontaktu lapu ar laikspiedolu. Tilts veido ne vairāk kā 4 kolonnu, 16 kadru JPEG režģi. Katra 512 pikseļu šūna ievada savu avota laikspiedolu augsta kontrasta apakšējā joslā, bet tie paši laikspiedoli paliek teksta metadatos, lai veiktu saistīšanu un auditu. Pilns JPEG nepārsniedz 32 MiB. Ja `sharp` nevar atšifrēt vai izveidot režģi, tilts atgriežas pie atsevišķiem JPEG kadriem; klienta aborts joprojām tiek izplatīts, izmantojot lapas darbību.

Reklāmas pierādījumi ir apzināti nošķirti no sintētiskā sastāva mikroetalona. `scripts/perf/video-bridge-contact-sheet-eval.ts` definē shēmas versiju A/B instalāciju reāliem ar OpenAI saderīgiem redzes modeļiem. Tas mēra pakalpojumu sniedzēja ziņotos marķierus, visas sienas latentumu (tostarp lapas sastāvu), modeļa zvanu skaitu un manifestā definētu faktu saglabāšanu. Neapstrādātas modeļa atbildes netiek rakstītas atskaitē; tiek saglabāti tikai SHA-256 īssavilkumi un saskaņotie fakti IDs. Instalācija neveic tīkla vai maksas modeļa izsaukumu, ja vien `--execute-real` nav nodots un `--model`, `OMNIROUTE_BASE_URL` un `OMNIROUTE_API_KEY` nav konfigurēti. Bez šīs skaidrās reālās darbības tās mašīnlasāmais spriedums paliek `HOLD`; sintētiskie payload/call-count mērījumi vien nav veicināšanas pierādījumi.

Zvanītāji var pievienot papildu `transcript.cues` masīvu atbalstītai video daļai, ja viņiem jau ir līdzināts teksts. Katrai norādei ir jāietver `text`, ierobežots `start`/`end` intervāls pārbaudītajā ilgumā un baltajā sarakstā iekļauts `source` (`client`, `embedded` vai `audio-bridge`); `confidence` noklusējuma vērtība ir `1`, un tai jāpaliek starp `0` un `1`. Precīzi dublikāti ir sakļauti. OmniRoute nekad nesāk transkripciju no šiem metadatiem: apstiprinātās norādes tiek kopētas aprakstītajā rezultātā ar avotu, uzticamību un intervālu un tiek renderētas kā neuzticami novērojumi līdzās ietvara parakstiem. Nederīgs, ārpus diapazona vai bez izcelsmes teksts tiek noraidīts, nevis sajaukts parakstu straumē. Abi pieprasījuma pamatteksta transkripcijas kanāli normalizē `client` sniegto izcelsmi, tostarp pašpārliecinātās `embedded` vai `audio-bridge` etiķetes. Tikai serverim piederošs adapteris var piešķirt šīs uzticamās iezīmes, izmantojot tikai koda argumentu `trustedSource` ; pieprasījuma JSON lauks nevar sasniegt šo argumentu. Transkripcijas teksts joprojām ir neuzticams multivides saturs neatkarīgi no tā izcelsmes, un tas nekad nedrīkst noteikt autorizāciju.

Uzlabots zvanītājs var nodrošināt `audioTranscript` ierakstu vienam un tam pašam videoklipam; tas tiek uzskatīts par klienta nodrošinātu tekstu, nevis servera transkripcijas pierādījumu. Sapludināšanas šuve veic vizuālos un audio novērojumus saskaņā ar vienu termiņu un pārtrauc signālu, pasūta tos pēc kopīgas laika skalas, sakļauj precīzus dublikātus un ziņo par daļēju rezultātu, ja izdodas tikai viena puse. Nederīgs `audioTranscript` tiek degradēts līdz šim daļējam rezultātam — vizuālais apraksts tiek saglabāts, un audio atzars ieraksta sanitizētu kļūmes kodu — nevis visu videoklipu. Katras filiāles pieejamība, daļējs karodziņš un sanitārie kļūdu kodi tiek saglabāti aprakstītajā rezultātos, aizsargmargu metadatos (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), rezultātu kešatmiņas metadatos un tilta saplūšanas skaitītājos. Noklusējuma video tilta ceļš neizsauc runas pārveidošanu tekstā vai nelejupielādē otru multivides kopiju; bez šī precīzā ieraksta tas paliek tikai video.

**Transkripta saglabāšana (#12150 P1).** Tas attiecas automātiski ikreiz, kad video tilts (pats izvēle) atveido atšifrējuma signālu — nav atsevišķa saglabāšanas karoga. Kad pieprasījums atveido jebkuru transkripcijas signālu (zvanītāja deklarētu `transcript` vai sapludinātu `audioTranscript`), aizsargmarga atzīmē to `videoBridgeObserved` un izveido rediģētu video apraksta ēnu — identisku atveidojumu, kurā katra norādes brīvā teksta pamatteksts tiek aizstāts ar `[redacted-video-transcript]`, kas izveidots, aizvietojot strukturēto veringne. saplacināts teksts, tāpēc nevar izdzīvot nekādas norādes saturs — pretrunīgs vai parasts, tostarp struktūras, kas satur `]` piemēram, `[inaudible]`/`[music]` — ). Pastāvīgā zvanu žurnāla pieprasījuma pamatteksts apmaina katru video atvasināto teksta daļu pret šo rediģēto ēnu, kas atbilst satura vienlīdzībai; `fullText` enkurs tiek atkārtoti nolasīts no gatavās pirmszvana aizsargmargas derīgās slodzes, tāpēc atbilstība joprojām izdodas pēc tam, kad vēlākie ķēdes aizsargmargi ( PII un akreditācijas datu maskētāji, prioritātes 10/95) pārraksta apraksta tekstu vietā un pēc system-prompt/handoff/memory injekcijas pārveido ziņojumu masīvu. Korpuss, kas nosūtīts pirms modeļa, ir nemainīgs. Novērotais pieprasījums arī neaizpilda noturīgu atmiņu (tiek izlaista gan pieprasījuma, gan atbildes iegūtā izvilkšana), tāpēc paša modeļa atbilde nevar atbalsot transkripcijas tekstu atmiņā.

**Neapstrādāti video lauki (#12430).** Ja tilts ir iespējots un vietējais video atbalsts nav zināms vai tā nav, definētie `transcript`/`audioTranscript` lauki arī aktivizē `videoBridgeObserved` pat pēc apraksta kļūmes vai `maxVideos` ierobežojuma. `null` un tukšo virkņu skaits; trūkstošo lauku un metadatu, kas nav video, nav. Saglabātās kopijas rediģē šos laukus vai izlaiž pieprasījumu, un caches/Memory tiek apiets.

Šajos atkāpšanās ceļos derīgi zvanītāja norādījumi kļūst par atbalstītām `text`/`input_text` daļām, nevis nestandarta nodrošinātāja laukiem. Abi pēc pieprasījuma sniegtie celiņi joprojām ir neuzticami `client` novērojumi ar skaidru brīdinājumu, ka videoklips nav aprakstīts un laikspiedoli nav pārbaudīti pret plašsaziņas līdzekļiem. Esošais 256-cue/64-KiB kopējais budžets un budžets uz vienu zīmi tiek piemēroti abiem celiņiem kopā; laikspiedoliem ir jāatbilst brokera 600 sekunžu griestiem un jebkuram piegādātajam fokusa logam. Nederīgi ieraksti tiek izmesti, nevis pārsūtīti kā patvaļīgs teksts; derīgu brāli un māsu joprojām var izmantot, ja vien netiek pārsniegts viņu kopējais budžets. Null/empty lauki nepievieno tekstu. Šis atkāpšanās līdzeklis nepievieno multivides ienesi vai transkripciju. Atšifrējuma paplašinājuma lauki tiek noņemti no rezerves video nesēja un tā `video_url`/`source` objektiem. OpenAI vadu atļaušanas saraksts paliek stingrs; Nezināmi vietējie video nesēji joprojām ir pieejami, un zināmie tikai teksta mērķi saglabā drošus marķierus. Strukturētas rediģēšanas ēnas aizsargā pievienoto atšifrējuma tekstu, savukārt sākotnējais zvanītāja pieprasījums paliek nemainīgs. Vietējie atbalstītie mērķi un invalīdi tilti saglabā savu esošo apiešanas darbību.

Papildu saglabātās kopijas izmanto to pašu novērotā pieprasījuma signālu. Neapstrādāts klienta pieprasījuma momentuzņēmums pirms aizsargmargas, atmiņā esošais gaidošais pieprasījums un agrīnā noraidīto pieprasījumu žurnāls strukturāli aizstāj atšifrējuma laukus video daļās; virknes uzvednes, ko sintezē konveijera posmi un konteksta nodošana, tiek rediģētas pastāvīgā pieprasījuma pamatteksta izlietnē. Pastāvīgais `video_content_removed` marķieris neļauj `previous_response_id` turpinājumam aizvērt, nevis rekonstruē tekstu, kas tika apzināti izmests. Ja novērotais pieprasījums zaudē savu daļu rediģēšanas ēnu pirms reģistrēšanas vai pat viena no vairākām video ēnām nesakrīt pēc vēlākām pieprasījuma mutācijām, saglabātais pieprasījuma pamatteksts tiek pilnībā izlaists, nevis tiek saglabāts daļēji rediģēts atšifrējums.

Novērotajam pieprasījumam modeļa atbilde var citēt jebkuru atšifrējuma daļu bez strukturētas norādes robežas. Tāpēc tā pastāvīgais zvanu žurnāla `responseBody` tiek aizstāts ar izlaiduma marķieri; detalizētais cauruļvada artefakts (kas var ietvert upstream/client korpusus un straumes gabalus) netiek saglabāts. Semantiskās, idempotences un argumentācijas atkārtošanas kešatmiņas apiet šī pieprasījuma nolasīšanu un rakstīšanu. Pakalpojumu sniedzēja pieprasījums un klienta redzamā atbilde paliek nemainīgi. Ja detalizētais artefakts tiek izlaists, agrīnie saglabāšanas baiti tiek iztukšoti no pagaidu bufera. Kiro nepareizi veidots EventStream brīdinājums ziņo tikai par derīgās slodzes baitu skaitu, nevis par tā saturu vai JSON parsētāja neapstrādāto kļūdu. Tas neapgalvo, ka katra nesaistītā provider/plugin diagnostika ir pārbaudīta; plašāks saglabātās izlietnes slaucīšana tiek izsekota #11658.

Iekšējais `/api/modality-bridge/video/drilldown` dzīves cikls ir atsevišķs loopback/token-authenticated kešatmiņas substrāts. Katrai darbībai ir nepieciešams arī kanoniskais necaurspīdīgais galvenais ID. Pirms ražošanas izsaucēja ir iespējota, tai ir jāiegūst šis ID no autentificētā nomnieka un nekad nedrīkst pārsūtīt klienta izvēlētu vērtību. Kešatmiņas atslēgas saista šo principālu ar kanonisko sesiju un video atsauces IDs, saglabā tikai to SHA-256-derived atslēgas un attiecas gan uz lasīšanu, gan dzēšanu uz vienu un to pašu galveno. Kešatmiņā vienā ierakstā tiek saglabāti ne vairāk kā 16 atvasināti JPEG kadri, tiem beidzas derīguma termiņš pēc desmit minūtēm, un tiek atbalstīta ierobežota `start`/`end` nolasīšana vai nepārprotama sesijas dzēšana.

Katrs galvenais ir ierobežots līdz 16 ierakstiem un 64 MiB kanonisko JPEG datu. Šie ierobežojumi nav atkarīgi no globālajiem 64-entry/256 MiB griestiem: galvenais kvotas spiediens izliek tikai tā principāla pēdējā laikā izmantotos ierakstus, pirms tiek apsvērta globālā LRU izlikšana. Ieraksti, kuriem beidzies derīguma termiņš, tiek dzēsti gan no galvenās, gan globālās kešatmiņas darbību uzskaites, savukārt atcelšanas un validācijas kļūme neizraisa daļēju aizstāšanu.

Kešatmiņa noraida nekanonisku Base64, lieko polsterējumu, ne-JPEG datu nesēju, nepareizi veidotu vai saīsinātu JPEGs un JPEGs, kas rada brīdinājumu ierobežota pilna attēla `sharp` dekodēšanas laikā. Tas atkārtoti kodē katru pieņemto attēlu kā kanonisku JPEG, iegūst platumu un augstumu no dekodētajiem baitiem, nevis uzticas zvanītāja laukiem, un atmet visus beigu poliglota baitus, nevis saglabā tos. No abām kvotām tiek iekasēta tikai ierobežotā kanoniskā saspiestā buferis. JSON vadu ierobežojums ietver Base64 pieskaitāmās izmaksas 32 MiB dekodētās ieejas griestiem. Katrs saglabātais atvasinājums reģistrē savu apstiprināto JPEG format/resolution, iztveršanas politiku, atvasināšanas versiju, izveides laiku, servera aprēķināto satura jaukšanu un jauktā vecāk atsauci, kā arī uzticamā zvanītāja vecāku satura jaucējkodu. Atcelšana tiek pārbaudīta starp asinhronajām decode/hash fāzēm pirms atomu kešatmiņas apņemšanās.

Produkcijas ražotājs atkārtoti izmanto jau iegūtos brokeru kadrus tikai pēc veiksmīgas vizuālās analīzes, bez otrā video download/extraction. Tam ir nepieciešams operators `modalityBridgeVideoDrilldownEnabled=true`, stingrs katras daļas `drilldown: true` un autentificēts API atslēgas ieraksts ID. Klienta deklarētās principal/session vērtības nekad nenosaka īpašumtiesības. Bez visiem trim nosacījumiem tas nemaina, nemaina un nesaglabā papildu kadrus. Saglabāšanas kļūme saglabā izmantojamo vizuālo reakciju. Piekrišanas pieprasījumi apiet visa video rezultātu kešatmiņu, tāpēc kešatmiņā saglabātie rezultāti nekad netiek atkārtoti atskaņoti.

Veiksmīgas JSON un SSE atbildes parāda ne vairāk kā četrus necaurspīdīgus rokturus ierobežotajā `x-omniroute-video-drilldown` galvenē. Autorizētās pārlūkprogrammas izcelsmes vietas var nolasīt šo galveni, nepaplašinot CORS izcelsmes politiku. Jaunajos rokturos tiek izmantots `v1.<32-byte random base64url token>`, un reģistrs saglabā tikai to SHA-256 jaucējus. reader/header parsētājs pieņem arī mantotos 64 heksadeciļu marķierus. Autentificēts publiskais patērētājs ir `GET /api/v1/video-bridge/drilldown?handle=...`, kuru neatkarīgi norobežo `modalityBridgeVideoDrilldownRemoteEnabled=true`. Skaidra un nepatiesa kļūda atsauc piekļuvi pat tad, ja ir iespējots mantotais `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env atkāpšanās variants. Ražošanas saglabāšanai ir līdzīgs mantotais `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` atkāpšanās variants. Abas rezerves pēc noklusējuma ir izslēgtas.

Patērētājs iegūst īpašumtiesības no autentificētās atslēgas un piemēro atslēgas politiku: gan GET, gan DELETE pieder `video` galapunkta kategorijai, tostarp `/v1` un `/api/v1` aizstājvārdiem. Atslēgās ar tukšu beigu punktu atļauto sarakstu ir jāietver `video`; neierobežotas atslēgas joprojām ir saderīgas. Patērētājs atgriež to pašu 404 par nezināmu, beidzies derīguma termiņu un citas atslēgas rokturiem. Tā pieņem `variant=preview|standard|detail` (maksimālā JPEG dimensija 320/640/1280, nekad nav palielināta), `limit=1..8` (vai mantotais `frames` aizstājvārds, nekad abus), nulles `page` un izvēles `start`/`end` fokusa sekundes. Dublētas vaicājuma atslēgas un apgrieztā fokusa logi tiek noraidīti. Katram atgrieztajam variantam ir tā faktiskā satura un faktiskās izšķirtspējas metadatu jaukšana, kas ir saistīta ar saglabāto avotu. Varianti tiek iegūti lasīšanas laikā, nevis tiek saglabāti kā papildu saglabātas kopijas. JSON reakcija, ieskaitot Base64/envelope, ir ierobežota līdz 32 MiB; pārāk liela lapa atgriež 413, un klientam ir jāpieprasa mazāk kadru. Nolasa pārbaudes atcelšanu ap katru izmēru un vēlreiz pārbauda roktura derīgumu pirms atgriešanās. `DELETE` pēc īpašnieka ir idempotents; dzēšana vai TTL beigu termiņš atbrīvo saglabāto avotu un lietojuma uzskaiti.

Koplietotais veikals ir procesa lokāls: turētāju derīguma termiņš beidzas, restartējot, un tos nevar pārsūtīt starp neatkarīgiem OmniRoute procesiem. Pārvaldības statistika atklāj efektīvu saglabāšanas/attālināto politiku un apkopo tikai saglabātos entries/bytes, nevis multividi, atsauces, galvenos IDs vai rokturus. Video iestatījumu panelī tiek rādītas šīs vērtības, un var saglabāt abus piekrišanas slēdžus. Šī ieviešanas dokumentācija nav tiešs izvietošanas vai veicināšanas pierādījums; reālā modeļa pieņemšana tiek izsekota atsevišķi.

Kadriem tiek pievienoti paraksti secīgi ar konfigurēto video modeli. Tukša Video ignorēšana pārņem Vision iestatījumu; ja abi ir tukši, Vision automātiskais maršrutētājs izvēlas efektīvu modeli, kas spēj nodrošināt redzi. Veiksmīgi paraksti aizstāj sākotnējo daļu ar stabilu `[Video description:` prefiksu, kas arī atzīmē tekstu kā neuzticamu mediju radītu novērojumu un liek pakārtotajiem modeļiem neievērot plašsaziņas līdzekļos atrodamos norādījumus. Kadru parakstu kešatmiņas atslēgas ietver JPEG baitus, uzvedni, laikspiedolu un efektīvu modeli; kešatmiņā tiek saglabāti tikai veiksmīgie paraksti. Kešatmiņas ieraksti saglabā faktisko veiksmīgo ražotāja modeli, tostarp atkāpšanās modeli; tilts ziņo par `mixed` kad dažādi modeļi tika ražoti dažādi rāmji. Kešatmiņas trāpījums atkārtoti izmanto šo ražotāja identitāti, nevis pārzīmē to kā pieprasīto maršrutēšanas plānu. Visa video rezultāta kešatmiņa tiek ievadīta katrā ieejā, kas maina izvades — uzvedni, efektīvu modeli, iztveršanas politiku, kadru skaitu, semantiskās analīzes režīmu, normalizētā fokusa mājiena SHA-256 pirkstu nospiedumu, fokusa logu, `transcript`, `audioTranscript` un kontaktu lapas karogu —, tāpēc neviena no šiem izmēriem mainīšana nekad nav kešatmiņas atkārtota izmantošana. Vizuālā atkopšanas politikas versija, slieksnis un ierobežotais kandidātu kadru skaits ir arī skaidri norādīts rezultātu kešatmiņas atslēgā un metadatos; tādēļ politikas izmaiņas nevar atkārtoti izmantot novecojušu visa videoklipa aprakstu. Result-cache v4 metadati saglabā režīmu un pirkstu nospiedumu, nevis neapstrādātu lietotāja uzdevumu. Guardrail metadati ziņo gan par pieprasītajiem, gan efektīvajiem analīzes veidiem; pieprasītais `focused` režīms bez lietojama lietotāja teksta tiek ziņots kā efektīvs `full`.

Aizsargmarga izvelk katru atbalstīto video daļu, bet apraksta ne vairāk kā `modalityBridgeVideoMaxVideos`. Ja ir pierādīts, ka mērķim ir `supportsVideo === false`, neveiksmīgi un pārmērīgi ierobežoti videoklipi kļūst par skaidriem, drošiem teksta marķieriem, tāpēc neapstrādāts video nepaliek. Ja iespējas nav zināmas, šīs daļas saglabā savu video nesēju; Jebkurš atkāpšanās atšifrējums atbilst iepriekš norādītajai ierobežotā teksta konvertēšanai. Mērķi ar `supportsVideo === true` apiet tiltu. Klienta pieprasījuma pārtraukšanas signāls izplatās, izmantojot lejupielādi, starpnieka rindu, apakšprocesus un parakstu izsaukumus; pārtraukumi apstājas starp videoklipiem un nekad neizdodas atvērt neapstrādātiem medijiem.

Izpildlaika iestatījumi ir DB nodrošināti un Zod apstiprināti:

| Atslēga                             | Noklusējums | Diapazons / uzvedība                                                                                      |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Izvēles izpildlaiks, izvēle                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` saglabā vispārīgos parakstus; `focused` izmanto ierobežotu, neuzticamu jaunākā lietotāja kontekstu |
| `modalityBridgeVideoModel`          | `""`        | Mantojiet Vision Bridge modeli                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` vai proporcionālais `segment_aware`; detektora kļūme atgriežas uz `uniform`      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120 000 ms                                                                                           |

Mantotā video noildzes vērtības, kas pārsniedz 120 sekundes, ir saistītas ar starpnieka termiņu; jaunie iestatījumi raksta virs šī limita tiek noraidīti. `GET /api/modality-bridge/video/runtime` pirms autentifikācijas vai izpildlaika pārbaudes ir nepieciešama uzticama apzīmogota atpakaļcilpas lokācija, pēc tam nepieciešama pārvaldības autentifikācija. Ja izpildlaiks nav pieejams, tas atgriež tikai `available`, sanitizētas FFmpeg/ffprobe versijas un fiksētu iemeslu. Iekšējās ekstrakcijas galapunkts nav publiska augšupielāde API: rindas piesātinājums atgriež `503` plus `Retry-After`, zvanītāja atvienošana atgriež `499`, un fiksētais brokera termiņš atgriež `504`. Pārveidotās atbildes pievieno `video->text;model=<visionModel>;parts=<videos>` centrālajai `x-omniroute-modality-bridge` galvenei, nenoņemot Vision vai Audio segmentus.

### PII maskētājs (`piiMasker.ts`)

Darbojas tālāk **gan** posmos.

- **`preCall`** klonē lietderīgo slodzi, staigā `system`, `messages`, `input` un `prompt` (tostarp vienkāršus virknes vienumus) un lieto `processPII()` (no `@/shared/utils/inputSanitizer`) virknes `content`/`text` laukiem. Kad `PII_REDACTION_ENABLED=true`, noteiktais PII tiek rediģēts izejošā lietderīgajā slodzē. Tas nav atkarīgs no `INPUT_SANITIZER_MODE` (kas kontrolē tikai tūlītējas injekcijas politiku). Kad rediģēšana ir izslēgta, zvans reģistrē noteikšanas skaitījumus, nepārrakstot saturu.
- **`postCall`** dziļi klonē atbildi, palaiž `sanitizePIIResponse()` un Responses-API formas maskētāju (`maskResponsesOutput` — aptver `output_text` un `output[].content[].text`). Ja tiek veikta rediģēšana, modificētā atbilde aizstāj sākotnējo.

Aizsargmargas nekad nebloķējas; tas tikai anotē (`meta.detections`, `meta.redacted`) vai pārraksta.

#### Atlase pēc veida, pielāgoti modeļi un noteikšanas skaitītāji

**Informācijas panelis → iestatījumi → drošība → PII maskēšana** izvēlas _kas_ ir maskēts. Tas neieslēdz maskēšanu: tas joprojām ir `PII_REDACTION_ENABLED` (pieprasījums) un `PII_RESPONSE_SANITIZATION` (atbilde + SSE), abi pēc noklusējuma ir izslēgti.

- **Atlase pēc veida** — iebūvētie ID ir norādīti `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Atiestatīts nozīmē visus veidus (darbība pirms šī iestatījuma pastāvēšanas). Pieprasījuma programmas `ssn_us` modelis tiek kartēts uz `ssn`. Veidnes (Minimālā, Standarta, Finanšu, Brazīlijas, USA, GDPR, POPIA, Pilna) aizpilda tikai izvēles rūtiņas UI.
- **GDPR un POPIA identifikatori** — divpadsmit iebūvētie ID, kas aptver EU un Dienvidāfrikas personas identifikatorus (tabula tālāk). Viņu regexes, validatori un jurisdikcijas tagi atrodas vienā tabulā `src/shared/utils/piiPatterns.ts`, ko patērē gan atbildes dezinfekcijas līdzeklis (`src/lib/piiSanitizer.ts`), gan pieprasījuma maskētājs (`src/shared/utils/inputSanitizer.ts`). Atbilstība tiek rediģēta tikai tad, kad tās pārbaudītājs to pieņem; ar tukšu ciparu rindu nekad nepietiek. Operators, kurš saglabāja sašaurinātu atlasi pirms šo ID pastāvēšanas, saglabā savu darbību, līdz tiek atzīmēti jaunie ID.
- **Pielāgoti modeļi** — līdz 20 regulāras izteiksmes vai aizstājējzīmju modeļiem (`*` = līdz 64 rakstzīmēm, kas nav atstarpes, `?` = viena). Sērkociņi kļūst par `[CUSTOM_REDACTED]`. Katrs modelis iet cauri `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): ne vairāk kā 500 rakstzīmes, karodziņi ir ierobežoti līdz `g i m s u`, ir jākompilē, jāiztur `safe-regex` (katastrofāla atkāpšanās), un tas nedrīkst atbilst tukšai virknei vai rediģēšanas vietturim. Saglabājot un pārbaudot, modelis, kas neizdodas, tiek noraidīts, un saglabātā rinda, kas neizdodas, izpildlaikā tiek izlaista, nevis kompilēta. Pielāgotie modeļi darbojas tikai tad, kad ir ieslēgta maskēšana.
- **Atklāšanas skaitītāji** — skaits katram veidam (vērtības nekad nesakrita), tiek saglabātas atmiņā un atiestatītas restartējot (`src/lib/pii/piiDetectionStats.ts`). Tās tikai palielinās, kamēr ir ieslēgta maskēšana.

Iestatījumi atrodas `key_value` tabulā (nosaukumtelpa `pii_settings`, `src/lib/db/piiSettings.ts`) un tiek lasīti 1 s kešatmiņā. API:

| Metode | Ceļš                     | Nozīme                                                                                   |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Karodziņu stāvoklis, `enabledTypes`, `customPatterns`, konstatējumu skaitītāji           |
| `PUT`  | `/api/settings/pii`      | Aizstāj `enabledTypes` (`null` = visi) un/vai `customPatterns`                           |
| `POST` | `/api/settings/pii/test` | Testa izpilde vienam šablonam pret paraugu, kas nepārsniedz 8 KB; nekas netiek saglabāts |

Visiem trim ir nepieciešama vadības autentifikācija un ķermeņa apstiprināšana ar Zod (`src/shared/validation/schemas/piiSettings.ts`). Ja pieteikšanās ir atspējota (`requireLogin=false`), `GET` un pārbaudes galapunkts ir atvērti, taču `PUT` joprojām ir nepieciešama informācijas paneļa sesija, `manage` -scope API atslēga, `oma_` piekļuves pilnvara ar rakstīšanas tvērumu vai augstāku vai CLI pilnvara vai iekšējā pakalpojuma pilnvara, kas nosūtīta no atpakaļcilpas.

#### GDPR (EU) un POPIA (Dienvidāfrika) identifikatori

| ID                  | Identifikators                 | Pārbaude                                                                               |
| ------------------- | ------------------------------ | -------------------------------------------------------------------------------------- |
| `iban`              | IBAN                           | Zināma valsts, precīzs šīs valsts garums, ISO 13616 MOD-97-10                          |
| `eu_vat`            | ES PVN numurs                  | Zināms dalībvalsts prefikss un šīs valsts numura formāts (bez VIES vaicājuma)          |
| `es_dni_nie`        | Spānijas DNI / NIE             | Kontrolburts (vērtība mod 23); NIE ir `X/Y/Z` + 7 cipari                               |
| `it_codice_fiscale` | Itālijas Codice Fiscale        | Kontrolburts no nepāra/pāra pozīciju tabulām                                           |
| `pl_pesel`          | Polijas PESEL                  | Svērta kontrolsumma un ticami kodētā dzimšanas mēneša/dienas diapazoni                 |
| `nl_bsn`            | Nīderlandes BSN                | 11 pārbaude (svari 9..2, -1)                                                           |
| `de_steuer_id`      | Vācijas Steuer-ID              | ISO 7064 Mod 11,10 un ciparu struktūras noteikumi (bez sākuma 0)                       |
| `se_personnummer`   | Zviedrijas personnummer        | Luhn pēdējiem desmit cipariem un ticams dzimšanas datums (10 vai 12 cipari)            |
| `za_id`             | Dienvidāfrikas ID numurs       | Luhn visiem 13 cipariem, derīgs dzimšanas mēnesis/diena, pilsonības cipars 0 vai 1     |
| `za_phone`          | Dienvidāfrikas tālrunis        | Prefikss `+27` / `27` vai nacionālā forma `0..` ar atstarpi vai defisi                 |
| `za_vat`            | Dienvidāfrikas PVN numurs      | 10 cipari, kas sākas ar `4`, **un** "VAT" / "BTW" iepriekšējās 48 rakstzīmēs           |
| `za_tax_ref`        | Dienvidāfrikas nodokļu atsauce | 10 cipari, kas sākas ar `0`-`3`, Luhn **un** "tax" / "SARS" iepriekšējās 48 rakstzīmēs |

Tā kā tikai ciparu formāti saduras ar pasūtījumu numuriem, būvējuma numuriem un laikspiedoliem, vājākajiem (`za_vat`, `za_tax_ref`) ir nepieciešams atslēgvārds, un tukšs desmit ciparu `0..` numurs netiek uzskatīts par Dienvidāfrikas tālruņa numuru. Atstarpinātie IBANs (`GB29 NWBK ...`) nav saskaņoti. Straumēšanas ceļā norāde tiek meklēta tikai pašreizējā gabalā. ID atrodas pirms vispārīgajiem tālruņu modeļiem, tāpēc apstiprinātajam identifikatoram ir savs vietturis (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` un `popia` veidnēs tiek atlasīti attiecīgi EU un Dienvidāfrikas ID. Pati maskēšana paliek izvēles iespēja (Hard Rule #20): nekas šeit nemaina funkcijas karoga noklusējumu.

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
