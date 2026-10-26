# Guardrails (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sandhedskilde:** `src/lib/guardrails/`
> **Sidst opdateret:** 2026-10-17 — v3.8.52 (tilføjet [Dækning og begrænsninger](#coverage-and-limits):
> hvilke ruter og svarstier hooksne når, de samlede deaktiveringsheadere (#16412), injektionsblokeringstilstand som en obligatorisk grænse (#16413), og hvad der ser et svar før post-call)

Guardrails håndhæver sikkerheds-, politik- og indholdstransformationer ved grænsen
mellem OmniRoute og opstrømsudbydere. Hver guardrail kan inspicere (og
valgfrit afvise, transformere eller annotere) forespørgsels-payloads (`preCall`) og
opstrømssvar (`postCall`).

Systemet er **fail-open**: Hvis en guardrail kaster en fejl under udførelsen,
registrerer registret fejlen og fortsætter med næste guardrail i stedet for at
lade forespørgslen fejle. Blokering er en eksplicit beslutning (`block: true`),
aldrig et uheld. Den eneste undtagelse er en afbrudt forespørgsel: Når kalderens
`signal` afbrydes, afviser en kastende guardrail hook-kørslen i stedet for at
blive sprunget over.

Hooksne kører **ikke** på alle ruter eller alle svar. Læs
[Dækning og begrænsninger](#coverage-and-limits), før du stoler på en guardrail
som en sikkerhedskontrol.

## Indbyggede guardrails

Registret indlæser automatisk seks guardrails i prioritetsrækkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Fase(r)        | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetstal kører **først**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3-basismodellen og `glm-5.3-{low,high,max}` har eksplicit
`supportsVision:false`-metadata i registry/spec. GLM 5.3 Flash-varianterne
forbliver modeller med nativ vision-understøttelse. Claude Codes
`/v1/messages`-rute går ind i den delte `handleChat`-guardrailkæde før kald
**før** Claude-til-OpenAI-oversættelsen; indlejrede
`Read`-værktøjsresultatbilleder skal beskrives eller håndteres, før denne
oversættelse løfter dem ind i OpenAI-`image_url`-indhold (#17069).

Opfanger billedbærende forespørgsler rettet mod **modeller uden vision** og
omdirigerer enten hele forespørgslen til en vision-kompatibel model eller
erstatter billeddelene med tekstbeskrivelser produceret af en konfigurerbar
vision-model før opstrømskaldet. Det lader udbydere, der kun understøtter
tekst, transparent håndtere multimodale payloads.

Forløb:

1. Spring over, hvis målmodellen allerede understøtter vision (medmindre den
   fremgår af tvangsbro-listen `isVisionBridgeForcedModel`).
2. Udtræk billeddele via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **samlede mediedetektor**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den eneste
   sandhedskilde, der deles med combo-kompatibilitetsfilteret.
   Udtrækning er allowlistet til de former, som `replaceImageParts` kan sætte
   tilbage (extract↔replace-kontrakten): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic-URL `source.type:"url"` og Responses
   API `input_image`. Matchende billeder, der er indlejret i Claude Code
   `tool_result.content` og Responses-værktøjsoutput, udtrækkes også og
   erstattes på deres oprindelige stier; former, der kun fungerer som
   indikatorer, er materiale til combo-filteret og udtrækkes ikke.
   Spring over, hvis ingen findes.
3. Opløs runtime-konfiguration via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nye
   `modalityBridge*`-indstillingsnøgler vinder; ældre `visionBridge*`-nøgler
   forbliver en **fallback i én cyklus** (tilbagerulningsvindue). Spring over
   før enhver gennemgang af medier, når broen er deaktiveret.
4. Tilstandsvælgeren (`modalityBridgeVisionMode`, se tabellen nedenfor) afgør
   omdirigering kontra beskrivelse. Omdirigering returnerer `modifiedPayload`,
   hvor kun `model` er udskiftet, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsessti: Begræns billeder til `maxImages`, sammensæt den
   opgavebevidste prompt, konsulter beskrivelsescachen, kald vision-modellen
   **parallelt** (`Promise.allSettled`), og indsæt
   `[Image N]: <description>`-tekstdele i deres sted. En mislykket beskrivelse
   giver `null`: Det rå billede bevares for ukendte/vision-kompatible mål
   (#4012), men et **bekræftet direkte mål, der kun understøtter tekst**,
   eller en combo helt uden vision får en eksplicit
   `(unavailable — no vision-capable provider connected)`-tekststub for hvert
   ubeskrevet billede, inklusive delvise fejl og billeder ud over loftet for
   beskrivelseskald (#17069). Den eksisterende fallback for
   combo-beskrivelser, hvor alle fejlede, forbliver på plads (#8430).
6. Returnér `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilstandsvælger (`modalityBridgeVisionMode`)

| Tilstand   | Standard | Adfærd                                                                                                                                                                                                                                                                                                                                    |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Ældre heuristik, uændret (#6640/#7204): ikke-combo/`auto/`-modeller omdirigeres til den bedste visionsmodel, medmindre den oprindelige model allerede har brugbare legitimationsoplysninger (så beskrives der i stedet); combo-mål beskriver altid.                                                                                       |
| `describe` |          | Beskriv altid — omdirigeringsblokken springes helt over; brugerens valgte model svarer altid.                                                                                                                                                                                                                                             |
| `reroute`  |          | Tving omdirigering: sikringen der fastholder modellen med legitimationsoplysninger omgås. Sikringen af omdirigerings-**målets** legitimationsoplysninger gælder stadig — når der ikke findes noget brugbart visionsmål, blokerer broen med en tydelig fejl i stedet for at beskrive eller sende rå billeder til et rent tekstbaseret mål. |

Tvungne tilstande kortslutter **før** auto-heuristikken kører; `auto`-adfærden
er byte-identisk med beskyttelsesmekanismen før PR-1.

#### API-nøglens anvendelsesområde (`visionBridgeKeyScope.ts`)

Når den kaldendes API-nøgle begrænser `allowedConnections`, kvotepuljer
(`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), vælger broen kun
omdirigerings- og beskrivelsesmodeller, som nøglen må bruge, på forbindelser
som nøglen må bruge. Beskrivelseskaldet går derefter altid gennem
OmniRoute-selvsløjfen med `x-omniroute-self-loop-key-id`-headeren, så den
modtagende chatforespørgsel håndhæver nøglens forbindelses- og modelpolitik
igen. `enforceApiKeyPolicy()` respekterer kun den header sammen med
selvsløjfe-beareren, så den kun kan indsnævre adgang, og et id der ikke kan
opløses afvises.

Hvis ingen visionsmodel er tilladt for nøglen, afviser et **bekræftet rent
tekstbaseret mål** billedforespørgslen lokalt med en tydelig HTTP 400 i stedet
for at videresende billedbytes til en upstream der ikke kan håndtere dem
(#17069). For mål med ukendt eller indbygget visionskapacitet bevarer
beskrivelsesstien sin tidligere fail-open-adfærd (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Forespørgsler uden nøgle, og nøgler uden disse begrænsninger, opfører sig
præcis som før.

#### Opgavebevidst beskrivelsesprompt (`modalityBridgeVisionTaskAware`)

Standard **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) tilføjer
teksten fra den **sidste brugerbesked** (afkortet til 500 tegn) til
basis-beskrivelsesprompten, så beskrivelsen styres mod det brugeren faktisk
spurgte om (codex-vision-proxy-mønsteret) og beder visionsmodellen om at
transskribere synlig tekst. Med flaget slået fra — eller uden brugertekst —
bruges basisprompten uændret.

Beskrivelses-selvsløjefens egen OpenAI-kompatible forespørgsel
(`callVisionModelSingle()` i `visionBridgeHelpers.ts`) anmoder altid om
`image_url.detail: "high"` — ubetinget, for enhver kaldende/udbyder, ikke
afhængig af noget klientsignal. Sampling med lav detaljegrad forringer
OCR-nøjagtigheden for præcis den teksttransskriptionsopgave denne prompt beder
om, så beskrivelseskaldet selv anmoder altid om høj detaljegrad uanset hvilket
detaljeniveau den oprindelige indgående forespørgsel brugte. Dette påvirker
kun den interne beskrivelsesforespørgsels body; det ændrer ikke hvordan
OmniRoute videresender den kaldendes egen `image_url.detail` på den primære
forespørgsel — den standard anvendes separat, og kun for registrerede
OpenCode-klienter, i `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`).
Anthropic-wire-format-grenen af beskrivelses-selvsløjfen har intet
`detail`-felt og påvirkes ikke af nogen af standarderne.

#### Loft over beskrivelsesoutput (`modalityBridgeVisionMaxChars`)

| Nøgle                          | Standard | Interval            |
| ------------------------------ | -------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` eller 100–50000 |

`0` (standard) betyder **intet loft** — beskrivelsen returneret af
`callVisionModel()` viderebringes uændret, hvilket bevarer den eksisterende
adfærd. Enhver værdi i intervallet 100–50000 afkorter beskrivelsen med et
`…`-suffiks før den flettes tilbage som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Hæv denne værdi for detaljetunge OCR-opgaver hvor downstream-modellen har brug
for den fulde transskription; sænk den for at begrænse tokenforbruget hos
ordrike visionsmodeller. Dashboard-feltet findes på Vision-fanens
Advanced-panel (`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`)
og klemmer enhver værdi mellem 1 og 99 op til 100-grænsen, mens en eksplicit
`0` efterlades urørt — `0` er en gyldig Zod-værdi i sig selv
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke blot
"ikke angivet"-standarden.

#### Beskrivelsescache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL-cache for beskrivelsesoutput, delt på tværs af hele
processen. Nøgle = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
med længdepræfiks-ramme (ingen feltgrænse-kollisioner). Modelkomponenten er
den **konfigurerede** bro-model, ikke den model der faktisk svarede —
`callVisionModel` kan falde tilbage internt, og nøgledannelse pr. forsøg ville
fragmentere cachen. Mislykkede beskrivelser caches aldrig. Indstillinger:

| Nøgle                           | Standard | Interval |
| ------------------------------- | -------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`   | —        |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000  |

#### Normalisering af fjernbilleder (self-loop describe/base64-hentning)

Når broen selv henter et **fjernbillede** — Anthropic describe-selvkaldet og base64-konverteringen til claude-wire-format
(`ensureBase64ImagesForClaudeWire`), begge via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — sendes den resulterende data-URI gennem `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`), før den indlejres i visionsmodel-anmodningen. For store billeder nedskaleres til en **længste kant på 2048 px** (svarende til den resize-grænse, som OpenAI/Anthropic allerede anvender server-side), hvilket reducerer upload-bytes/latens uden at ændre det, visionsmodellen ser. Ændring af størrelsen bruger `sharp`, indlæst via dynamisk import: på en platform, hvor dets native binære fil ikke kan indlæses, **kaster** `normalizeDataUri()` **aldrig** — den falder tilbage til en passthrough af de oprindelige bytes, så describe/base64-konverteringsstien altid bliver ved med at fungere. Bytes, der ikke er billeder (en hentning, som ikke returnerede et dekodbart billede), sendes også igennem uændret. Denne normalisering er afgrænset til billeder, som broen henter til sit eget selvkald — den anvendes aldrig på kalderens rå passthrough-payload, i overensstemmelse med princippet om mutation kun ved opt-in (Hard Rule #20).

#### Indstillingsskema + migrering

De nye `modalityBridge*`-nøgler er Zod-validerede i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trioen `modalityBridgeCache*` samt
gruppen `modalityBridgeAudio*`, som bruges af Audio Bridge. Migreringen
`141_modality_bridge_settings.sql` kopierer eksisterende ældre
`visionBridge*`-værdier til de tilsvarende nye nøgler (idempotent, overskriver aldrig
en operatør-indstillet `modalityBridge*`-værdi); de gamle nøgler forbliver accepterede som et
læse-fallback i én udgivelsescyklus.

#### Gennemsigtigheds-header + statistik

Describe-transformerede svar bærer
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(bygges af `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`,
påstemplet af `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omdirigerede anmodninger får **ingen** header — payloaden var uberørt, og
modeludskiftningen er allerede synlig i svarkroppens `model`-felt.

`GET /api/modality-bridge/stats` (management-autentificering, samme niveau som
`GET /api/settings`) returnerer in-memory-tællerne pr. modalitet
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og
`video`. `averageLatencyMs` bruger `latencySamples`, ikke alle forsøg, som sin
nævner; en operation uden timing fabrikerer ikke en nul-millisekund-prøve.
`bridged` forbliver det bagudkompatible alias for vellykkede
konverteringer; mislykkede forsøg inkrementerer den ikke.
Tællerne nulstilles ved procesgenstart by design
(telemetri, ikke regnskab).

#### Dashboard-konfiguration

Den dedikerede dashboard-side er
`/dashboard/settings/modality-bridge`. Dens URL-adresserbare `Vision`-, `Audio`-
og `Video`-faner bevarer query-parametre, mens `tab`-værdien skiftes.
Vision-fanen eksponerer aktivering, tilstand, modelvalg (inklusive den automatiske
standard), opgavebevidst prompting, avancerede grænser for timeout/billeder/beskrivelseslængde/cache,
runtime-tællere og en beskyttet prøveanmodning. Audio-fanen er også live: den eksponerer
aktivering, en STT-only-modelvælger med Auto, grænser for timeout/maks. klip, lydtællere
og en `input_audio`-prøvetest. Video-fanen er funktionel: den rapporterer
FFmpeg/ffprobe-runtime-tilstanden — en af fire eksplicitte UI-tilstande (`unknown`, mens
proben er i gang eller ikke kunne gennemføres, `restricted` på en ikke-loopback
dashboard-vært, hvor proben springes over klient-side, `unavailable`, når den er probet
og bekræftet manglende, eller `available` med FFmpeg/ffprobe-versionerne) — persisterer
grænser for aktivering/model/frames/video/timeout, filtrerer modelvælgeren til visionskompatible
modeller og eksponerer videotællere.

Det tidligere Vision Bridge-kort under AI-indstillinger er et kompatibilitetslink til den
nye side; det ejer ikke længere en anden kopi af formularen. Media Providers linker
også Image-to-Text- og Speech-to-Text-arbejdsgange til de tilsvarende Modality
Bridge-faner uden at fjerne det eksisterende Speech-to-Text-playground.

**Self-loop admission-bypass:** når describe-kaldet routes gennem OmniRoutes
egen `/v1` self-loop (ikke-standard udbydermodel), sender underanmodningen
`x-omniroute-admission-bypass: internal` og autentificeres med den opløste
self-loop-legitimation — den lokale `sk_omniroute`-sentinel i lokal tilstand eller den
operatørkonfigurerede `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` miljønøgle (#1350), så
`REQUIRE_API_KEY=true`-udrulninger stadig kan køre describe-kaldet. Bypasset
honoreres kun for netop disse legitimationsoplysninger, så eksterne klienter ikke kan bruge
headeren til at springe admission over.

Legacy-standarder findes i `src/shared/constants/visionBridgeDefaults.ts`; de
nye standarder for tilstand/opgavebevidsthed/cache samt indstillings-resolveren findes i
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail'en eksponerer en
`deps`-konstruktørindstilling, så tests kan injicere falske `getSettings`- og
`callVisionModel`-implementationer.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Opfanger lydbærende chat-anmodninger, før de når et mål, der ikke vides at
acceptere lydinput. Den omdirigerer aldrig chat-anmodningen: lyddele
transskriberes gennem det eksisterende OpenAI-kompatible multipart-endepunkt, og
den valgte chatmodel fortsætter med teksttransskriptioner.

Forløb:

1. Opløs `supportsAudio` via `getResolvedModelCapabilities()`. Eksplicitte
   metadata fra udbyderregisteret har forrang, derefter statiske modelmetadata
   og til sidst synkroniserede `modalities_input`. En deklareret inputliste
   uden `audio` giver `false`; uden dokumentation for kapabilitet forbliver
   værdien `null`. Både `false` og `null` aktiverer den konservative bro, mens
   `true` omgår den.
2. Opløs `modalityBridgeAudio*`-indstillingerne, og udtræk splejsbare lyddele
   på øverste niveau fra hver besked via den delte `detectMediaParts()`-detektor.
   Understøttede wire-formater er OpenAI `input_audio`, `audio_url` og
   `source.media_type: "audio/*"`. Indlejret lyd registreres til routing, men
   fjernes ikke af splejsestien. Arbejdet begrænses af
   `modalityBridgeAudioMaxClips`; senere dele forbliver uberørte.
3. Respektér en konfigureret `provider/model`, eller lad
   `selectAudioBridgeModel()` gennemgå `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil
   katalogrækkefølge og vælge den første model med en brugbar, aktiv
   udbyderlegitimation.
4. `callAudioTranscription()` konverterer base64/data-URI-lyd til en multipart
   `file` eller downloader en ekstern `audio_url` gennem den public-only
   udgående vagt med DNS-pinning og en grænse på 25 MB. Derefter sendes filen
   og den valgte model med POST til det lokale
   `/v1/audio/transcriptions`-self-loop, autentificeret med
   `resolveSelfLoopBearer()`. Den eksisterende transskriptionsroute udfører
   normalt opslag af legitimationsoplysninger, håndtering af
   cooldown/rate-limit og dispatch til udbyderen.
5. Vellykkede kald erstatter deres dele med `[Audio N]: <transcript>`. Kald
   køres med `Promise.allSettled`: en enkelt fejl bevarer den pågældende
   oprindelige lyddel (#4012-kontrakten). Hvis alle kald fejler, og målet er
   bevist `supportsAudio === false`, bliver delene
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakten).
   For et ukendt mål (`null`) forbliver et resultat, hvor alle kald fejlede,
   uberørt. Et bevist tekst-kun-mål uden en brugbar STT-legitimation modtager
   den samme eksplicitte stub uden at sende et netværkskald.

Vellykkede transskriptioner bruger den procesdækkende Modality Bridge
LRU/TTL-cache. Nøglen kombinerer lydreferencen, den stabile
`audio-transcription`-operationsetiket og den valgte STT-model; fejl caches
aldrig. Lydforøg opdaterer de delte tællere `bridged`, `cacheHits`,
`failures` og `lastUsedAt`. Transformerede svar bærer
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; uberørte
forespørgsler får ikke et Audio Bridge-segment.

Runtime-indstillingerne er DB-backede og Zod-validerede:

| Nøgle                         | Standard | Område                  |
| ----------------------------- | -------- | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                       |
| `modalityBridgeAudioModel`    | `""`     | Automatisk eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                    |

Den delte cache forbliver styret af `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Opfanger videodele på øverste niveau i Chat Completions-`messages` og Responses
API'ets `input`, før der kaldes et mål uden kendt indbygget
videounderstøttelse. Understøttede formater er `input_video`, `video_url`,
`video_source`, HTTPS-URL'er og `data:video/*;base64,...`-data-URI'er.
Almindelige filnavne i tekst behandles ikke som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ejer traverseringen af
forespørgslen, kapabilitets-/politiktjekket, aggregeringen pr. forespørgsel og
svar-payloaden. Arbejdet pr. video — anskaffelse, cachen for hele resultatet,
beskrivelse af en framesekvens (som fusionerer et eventuelt kalderdeklareret
lydtransskript) samt metrik, afbrydelse og oprydning pr. forsøg — er skjult bag
`processVideoPart` i `videoBridgePipeline.ts`, som kaldes én gang pr. videodel
inde i `preCall`s løkke. Modulet definerer også de eksplicitte portgrænser
`VideoMediaBrokerPort` (anskaffelse af bytes og udtrækning af samplede frames),
`VideoAudioTranscriptionPort` (fusion af et kalderdeklareret lydtransskript med
de samplede billedtekster) og `VideoDrilldownPort` (persistensgrænsen for
frame-drill-down; endnu ikke forbundet til `processVideoPart` — kun den
separate route `/api/modality-bridge/video/drilldown` skriver
drill-down-poster i dag).

Den offentlige `/v1`-forespørgselssti importerer eller starter aldrig en
subproces. Eksterne videoer downloades under en grænse på 50 MiB; inline
base64-videoer har en konservativ grænse på 36 MiB i dekodet størrelse pr.
video, så konvolutten med model/beskeder/framing kan forblive inden for den
offentlige grænse for optagelse af JSON-forespørgsler på 50 MiB. Inline-længden
og estimaterne af den dekodede størrelse kontrolleres før allokering. HTTPS er
påkrævet for den oprindelige eksterne URL og for hver omdirigering, og der
bruges den eksisterende public-only udgående vagt med DNS-pinning. Bytes'ene
krydser derefter den præcise interne brokergrænse
`POST /api/modality-bridge/video/extract`. Routen er både `LOCAL_ONLY` og
`SPAWN_CAPABLE`, accepterer kun en pr.-proces-autentificeret, betroet
loopback-forespørgsel og accepterer aldrig en URL, en filsystemssti, en
eksekverbar fil eller en argumentliste. API'ets body-size-pipeline og
handlerens inkrementelle body-læser håndhæver uafhængigt af hinanden en
broker-inputgrænse på 50 MiB. Dens afgrænsede kø kører én udtrækning ad
gangen, tillader fire ventende jobs og begrænser ventende input til 100 MiB.

Inde i brokeren læser `ffprobe` en privat lokal fil; den faste tilladelsesliste for formater udelukker playliste- og manifestformater. For tilladte containere i MOV-familien forbliver eksterne MOV-datareferencer deaktiveret som standard, og den faste kommando tilmelder sig ikke dem. Både `ffprobe` og `ffmpeg` bruger protokol-whitelisten med kun `file`, én tråd, faste argumentarrays, ingen shell samt eksekverbare filer, der opløses fra `PATH`. Coverstreams med vedhæftede billeder er ikke afspilningskandidater. Alle afspilbare streams skal opfylde grænserne, og en eksplicit standardstream foretrækkes frem for det deterministiske fallback til laveste indeks. Videoer er begrænset til 600 sekunder, 8.192 pixels pr. dimension og 33.554.432 kildepixels. FFmpeg udtager 1–16 JPEG-midtpunktsframes, skalerer den lange kant ned til højst 1.024 pixels uden at opskalere mindre input og modtager aldrig en URL. Sampling er `uniform` som standard. De valgfrie `scene_aware`- og eksperimentelle `segment_aware`-politikker udfører ét ekstra fast FFmpeg-gennemløb over den allerede validerede lokale stream, udvælger afgrænsede `showinfo`-scenetidsstempler og falder deterministisk tilbage til de samme ensartede midtpunkter ved detektorfejl, timeout, misdannet output eller et tomt kandidatsæt. Segment-aware-tilstand tildeler midtpunktssamples proportionalt med de validerede sceneintervaller; segment-aware-evidens og fallback-adfærd beskrives nærmere nedenfor. Det hårde loft på 16 frames anvendes efter udvælgelsen i alle politikker. Når en scene-aware-forespørgsel kun har et budget på én frame, bruger den det ensartede midtpunkt for det aktive fuldvideo- eller fokusvindue og rapporterer `policyEffective: uniform`: en enkelt udvalgt sceneframe kan ikke bevare begge tidsmæssige ender. En kalder kan valgfrit angive et endeligt fokusvindue (`start`/`end` i sekunder); grænserne fastspændes til mediets varighed, omvendte eller ikke-endelige vinduer afvises, og alle samplingpolitikker udføres kun inden for det normaliserede interval. Det resulterende vindue inkluderes i sampling-metadataene og i præfikset for den ikke-betroede beskrivelse, så downstream-modeller kan skelne et fokuseret uddrag fra den fulde tidslinje.

Semantisk billedtekstfokus er en separat, eksplicit indstilling. Standardanalysetilstanden `full` bevarer den eksisterende frame-prompt og videresender aldrig forespørgselstekst til billedtekstmodellen. I `focused`-tilstand læser broen kun den seneste ikke-tomme brugerforfattede `text`/`input_text` fra den samme Chat- eller Responses-container, normaliserer den til NFC, sammentrækker kontroltegn og whitespace og begrænser den til 500 Unicode-kodepunkter. Et tomt resultat falder tilbage til præcis `full`-prompten. Et brugbart hint serialiseres som JSON i en dedikeret blok for ikke-betroet brugerkontekst og må kun prioritere observerbare detaljer; det kan ikke tilsidesætte den separate advarsel mod at følge instruktioner, der er synlige eller hørbare i mediet. Tekstuelt fokus udleder aldrig `start`/`end` og ændrer ikke den tidsmæssige sampler.

#### FU-07 strukturel segmentevidens

`segment_aware` bruger ét afgrænset præanalysegennemløb over den allerede validerede lokale videostream. Den faste filterkæde skalerer først til højst 320 pixels i bredden, detekterer sceneskift og frosne intervaller og sampler derefter med 1 frame pr. sekund for sløring, gennemsnitlig luma samt rumlig/tidsmæssig information. Gennemløbet er begrænset til 600 strukturelle samples, én FFmpeg-/filtertråd, de samme protokol- og container-tilladelseslister med kun `file`, en procesoutputgrænse på 1 MiB og højst 30 sekunder inden for brokerens delte abort/deadline. Den accepterer aldrig en kommando, et filter, en sti eller en URL fra forespørgslen.

De strukturelle værdier er deterministisk samplingevidens, ikke semantisk videoforståelse. De udleder ikke emner, handlinger, billedtekster, tale eller brugerhensigt. Scene- og frysgrænser danner segmenter; frysningsdækning, sløring, eksponering, rumlig detalje og tidsmæssig ændring påvirker kun, hvordan det eksisterende budget på 1–16 frames tildeles. Et fuldstændigt frosset segment begrænses til én frame, mens ikke-frosne segmenter konkurrerer om det resterende budget. Når grænserne er flere end frames, bevares den ensartede tidslinjedækning, så hurtige tidlige klip ikke kan skjule et langt efterfølgende segment. Scenegrænser inden for analyseopløsningen på 1 sekund fra en frysgrænse sammenlægges.

Manglende filtre, misdannet/tom evidens, en detektorfejl eller timeout i det afgrænsede præanalysegennemløb fejler åbent til præcis den ensartede midtpunktspolitik. En abort fra kalderen eller en broker-deadline fejler ikke åbent: den afslutter den igangværende underproces, forhindrer senere frame-udtrækning, og det private midlertidige træ fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske, rigtige FFmpeg-fixtures for besparelser på billedtekstkald efter dedup, budgettildeling ved tæt bevægelse, slørings-/eksponerings-/SI-TI-evidens, hurtige klip med en lang hale og falske positiver ved gradvis fade. Den registrerer præanalysens wall-clock-tid og, hvor `/usr/bin/time` er tilgængelig, underprocessens CPU og højeste RSS. Dens kvalitetstjek er udelukkende strukturelle orakler. Rigtig billedtekstmodelkvalitet forbliver `HOLD`, fordi dette testharness hverken har et autoriseret endpoint eller en fastfrossen dommer. Monetære besparelser forbliver ligeledes `HOLD`, medmindre `--caption-cost-per-call-usd` angiver et eksplicit positivt estimat pr. kald; scriptet fabrikerer aldrig nogen af resultaterne.

Hver ramme er begrænset til 4 MiB, alle rå rammer tilsammen til 23 MiB, og det
serialiserede broker-svar til 32 MiB. En privat midlertidig mappe fjernes i
`finally`. OmniRoute bundler ikke FFmpeg og accepterer ikke en brugerdefineret
sti til en eksekverbar fil. Før billedtekstning anvender broen et konservativt
visuelt deduplikeringstrin: hvert JPEG reduceres til en 16×16-gråtonebuffer og
sammenlignes kun med den sidst bevarede ramme. Ved et anmodet billedtekstbudget
over én ramme leverer udtrækningen en
begrænset kandidatpulje på op til det dobbelte af budgettet og aldrig mere end
16 rammer.
Det anmodede loft anvendes først efter deduplikering, hvor den første og den
sidste valgte kandidat bevares under den endelige udtynding, når budgettet er
mindst to. Den versionerede politik
`grayscale-16x16-mean-cells-v2` bruger den største værdi af den gennemsnitlige
luma-delta og andelen af miniatureceller, hvis normaliserede delta er mindst
0.05.
Duplikattærsklen er konstanten 0.04, valgt for forudsigelighedens skyld frem
for at blive eksponeret som en kørselsindstilling. Dette sekundære
højkontrastsignal bevarer små bevægelser og ændringer i synlig tekst, som en
sammenligning kun baseret på gennemsnit kan skjule. Fejl i komparator eller
dekoder fejler åbent og bevarer dækningen. Output-metadata adskiller udtrukne
kandidater, succesfuldt anvendte rammer og kasserede visuelle duplikater.

En eksplicit markeret videodel kan anmode om et tidsstemplet kontaktark.
Broen bygger højst et 4-kolonners, 16-rammers JPEG-gitter. Hver 512-pixelscelle
indbrænder sit kildetidsstempel i et højkontrast-bundbånd, mens de samme
tidsstempler forbliver i tekstmetadata til downstream-association og revision.
Den fuldstændige JPEG forbliver begrænset til 32 MiB. Hvis `sharp` ikke kan
afkode eller sammensætte gitteret, falder broen tilbage på de enkelte
JPEG-rammer; en klientafbrydelse forplanter sig stadig gennem ark-operationen.

Promoveringsbevis er bevidst adskilt fra den syntetiske
sammensætnings-mikrobenchmark. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definerer et skemaversioneret A/B-testprogram for rigtige OpenAI-kompatible
visionsmodeller. Det måler
provider-rapporterede tokens, ende-til-ende-væglatens (inklusive
arksammensætning), antal modelkald og manifestdefineret fastholdelse af fakta.
Rå modelsvar skrives ikke
til rapporten; kun SHA-256-digests og matchede faktum-ID'er bevares.
Testprogrammet foretager ingen netværks- eller betalte modelkald, medmindre
`--execute-real` gives, og `--model`, `OMNIROUTE_BASE_URL` og
`OMNIROUTE_API_KEY` er konfigureret. Uden den eksplicitte rigtige kørsel
forbliver dets maskinlæsbare dom `HOLD`; syntetiske målinger af
payload/kaldantal alene er ikke promoveringsbevis.

Kaldere kan knytte et valgfrit `transcript.cues`-array til en understøttet
videodel, når de allerede besidder tidsjusteret tekst. Hver cue skal indeholde
`text`, et endeligt `start`/`end`-interval inden for den udsonderede varighed
og en whitelistet `source` (`client`, `embedded` eller `audio-bridge`);
`confidence` har standardværdien `1` og skal forblive mellem `0` og `1`.
Eksakte duplikat-cues slås sammen.
OmniRoute starter aldrig transskription ud fra disse metadata: validerede cues
kopieres ind i det beskrevne resultat med kilde, confidence og interval og
gengives som ikke-betroede observationer ved siden af rammernes billedtekster.
Ugyldig tekst, tekst uden for intervallet eller tekst uden proveniens afvises
frem for at blive blandet ind i billedtekststrømmen. Begge
transskriptkanaler i request-body normaliserer angiven proveniens til
`client`, herunder selverklærede `embedded`- eller `audio-bridge`-etiketter.
Kun en server-ejet adapter kan tildele disse betroede etiketter via
`trustedSource`-argumentet, som kun kan sættes fra kode; et JSON-felt i
requesten kan ikke nå det argument. Transskripttekst forbliver ikke-betroet,
medieafledt indhold, uanset sin proveniens, og må aldrig afgøre autorisering.

En avanceret kalder kan levere et `audioTranscript`-spor til den samme video;
det behandles som klientleveret tekst, ikke som bevis for
server-transskription. Fusionssømmen kører visuelle observationer og
lydobservationer under én deadline og ét afbrudssignal, ordner dem på en fælles
tidslinje, slår eksakte duplikater sammen og rapporterer et delvist resultat,
når kun den ene side lykkes.
Et ugyldigt `audioTranscript` nedgraderes til det delvise resultat — den
visuelle beskrivelse bevares, og lydgrenen registrerer en saniteret fejlkode —
i stedet for at fejle hele videoen. Tilgængelighed pr. gren, det delvise flag
og de saniterede fejlkoder bevares i det beskrevne resultat, i
guardrail-metadataene (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i resultat-cache-metadataene og i broens
fusionstællere. Standardstien Video Bridge kalder hverken tale-til-tekst eller
downloader en ekstra mediekopi; uden det eksplicitte spor forbliver den kun
video.

**Opbevaring af transskriptioner (#12150 P1).** Dette gælder automatisk, hver gang
Video Bridge (som selv er tilvalg) gengiver en transskriptionsmarkør — der er ikke
et separat flag for opbevaring. Når en anmodning gengiver en transskriptionsmarkør
(en `transcript`, som den kaldende part har angivet, eller en sammenflettet
`audioTranscript`), markerer guardrailen den som `videoBridgeObserved` og
genererer en redigeret skygge af videobeskrivelsen — en identisk gengivelse, hvor
hver markørs fritekstindhold erstattes med `[redacted-video-transcript]`, opbygget
ved at erstatte det strukturerede markørfelt, før strengen sammensættes (aldrig
ved at fortolke den flade tekst, så intet markørindhold — hverken skadeligt eller
almindeligt, herunder indhold med `]` såsom `[inaudible]`/`[music]` — kan overleve).
Anmodningsteksten i den opbevarede kaldslog erstatter hver videoafledt tekstdel
med denne redigerede skygge, matchet ud fra indholdslighed; `fullText`-ankeret
genindlæses fra den færdige guardrail-payload før kaldet, så matchet stadig
lykkes, efter at senere guardrails i kæden (maskering af personhenførbare
oplysninger og legitimationsoplysninger, prioriteterne 10/95) har omskrevet
beskrivelsesteksten på stedet, og efter at systemprompt-, handoff- og
hukommelsesinjektion har omformet beskedarrayet. Den tekst, der sendes videre
til modellen, er uændret. En observeret anmodning udfylder heller ingen
permanent Memory (både anmodnings- og svarbaseret udtrækning springes over), så
modellens eget svar ikke kan gentage transskriptionstekst i Memory.

**Rå videofelter (#12430).** Når broen er aktiveret, og indbygget videounderstøttelse
er ukendt eller mangler, aktiverer definerede `transcript`/`audioTranscript`-felter
også `videoBridgeObserved`, selv efter en fejl i beskrivelsen eller en
`maxVideos`-grænse. `null` og tomme strenge tæller med; manglende felter og
metadata, der ikke vedrører video, gør ikke. Opbevarede kopier redigerer disse
felter eller udelader anmodningen, og caches/Memory omgås.

På disse fallback-stier bliver gyldige markører fra den kaldende part til
understøttede `text`/`input_text`-dele i stedet for ikke-standardiserede
udbyderfelter. Begge spor, der leveres med anmodningen, forbliver ikke-betroede
`client`-observationer med en udtrykkelig advarsel om, at videoen ikke blev
beskrevet, og at tidsstemplerne ikke blev verificeret mod mediet. De eksisterende
grænser på 256 markører/64 KiB i alt og pr. markør gælder for de to spor samlet;
tidsstempler skal ligge inden for brokerens loft på 600 sekunder og ethvert
angivet fokusvindue. Ugyldige spor kasseres og videresendes ikke som vilkårlig
tekst; et gyldigt søskendespor kan stadig bruges, medmindre deres samlede grænse
overskrides. Null-værdier/tomme felter tilføjer ingen tekst. Denne fallback
tilføjer ingen hentning eller transskription af medier. Udvidelsesfelter til
transskription fjernes fra fallback-videobeholderen og dens `video_url`/`source`-objekter.
OpenAI-wire-tilladelseslisten forbliver streng; videobeholdere med ukendt
indbygget understøttelse forbliver tilgængelige, og kendte mål, der kun
understøtter tekst, beholder sikre markører. Strukturerede redigeringsskygger
beskytter den tilføjede transskriptionstekst, mens den oprindelige anmodning,
som den kaldende part ejer, forbliver uændret. Mål med indbygget understøttelse
og deaktiverede broer bevarer deres eksisterende bypass-adfærd.

Yderligere opbevarede kopier bruger det samme signal for observerede anmodninger.
Det rå snapshot af klientanmodningen før guardrails, den afventende anmodning i
hukommelsen og loggen over tidligt afviste anmodninger erstatter strukturelt
transskriptionsfelter i videodele; strengprompter, der genereres af pipelinefaser
og kontekst-handoff, redigeres ved slutpunktet for den opbevarede
anmodningstekst. Den opbevarede `video_content_removed`-markør får fortsættelse
med `previous_response_id` til at afvise sikkert i stedet for at rekonstruere
tekst, som bevidst blev kasseret. Hvis en observeret anmodning mister sin
redigeringsskygge pr. del før logning, eller hvis blot én af flere videoskygger
ikke matcher efter senere ændringer af anmodningen, udelades den opbevarede
anmodningstekst helt i stedet for at opbevare en kun delvist redigeret
transskription.

For en observeret anmodning kan et modelsvar citere enhver del af
transskriptionen uden en struktureret markørgrænse. Dens opbevarede
`responseBody` i kaldsloggen erstattes derfor med en udeladelsesmarkør; den
detaljerede pipelineartefakt (som kan indeholde upstream-/klienttekster og
stream-segmenter) opbevares ikke. Semantiske caches, idempotenscaches og caches
til genafspilning af ræsonnement omgår både læsninger og skrivninger for den
pågældende anmodning. Udbyderanmodningen og det klientvendte svar forbliver
uændrede. Tidlige keepalive-bytes tømmes fra den midlertidige buffer, når den
detaljerede artefakt udelades. Kiros advarsel om en fejlformateret EventStream
rapporterer kun payloadens byteantal, aldrig dens indhold eller JSON-parserens
rå fejl.
Dette er ikke en påstand om, at alle uafhængige udbyder-/plugin-diagnosticeringer
er blevet revideret; den bredere gennemgang af slutpunkter for opbevaring spores
i #11658.

Den interne livscyklus for `/api/modality-bridge/video/drilldown` er et separat,
loopback-/token-godkendt cachegrundlag. Hver handling kræver også et kanonisk,
uigennemsigtigt principal-id. Før en produktionsklient aktiveres, skal den
udlede dette id fra den godkendte tenant og må aldrig videresende en værdi valgt
af klienten. Cachenøgler binder denne principal til kanoniske sessions- og
videoreference-id'er, gemmer kun deres SHA-256-afledte nøgler og afgrænser både
læsninger og sletning til den samme principal. Cachen gemmer højst 16 afledte
JPEG-billeder pr. post, udløber dem efter ti minutter og understøtter afgrænsede
`start`/`end`-læsninger eller eksplicit sletning af sessioner.

Hver principal er begrænset til 16 poster og 64 MiB kanoniske JPEG-data. Disse
grænser er uafhængige af det globale loft på 64 poster/256 MiB: pres på en
principals kvote fjerner kun den pågældende principals mindst nyligt anvendte
poster, før global LRU-fjernelse overvejes. Udløbne poster fjernes fra både
principalens og den globale opgørelse ved cacheaktivitet, mens annullering og
valideringsfejl ikke gemmer en delvis erstatning.

Cachen afviser ikke-kanonisk Base64, overskydende padding, ikke-JPEG-medier, misdannede eller afkortede JPEG-filer og JPEG-filer, der producerer en advarsel under en afgrænset fuldbillede-`sharp`-dekodning. Den genkoder hvert accepteret billede som en kanonisk JPEG, udleder bredde og højde fra de dekodede bytes i stedet for at stole på kalderfelter og kasserer eventuelle efterfølgende polyglot-bytes i stedet for at beholde dem. Kun den afgrænsede kanoniske komprimerede buffer modregnes på begge kvoter. JSON-wire-grænsen inkluderer Base64-overhead for loftet på 32 MiB dekodet input. Hver gemt afledning registrerer sit validerede JPEG-format/oplevning, samplingspolitik, afledningsversion, oprettelsestidspunkt, serverberegnet indholds-hash og hashet forældrereference plus den betroede kalders forældreindholds-hash. Annullering kontrolleres mellem asynkrone dekode-/hash-faser før det atomiske cache-commit.

Denne tranche forbinder endnu ikke en produktionsproducent til routen og giver ikke valg af multi-opløsningsvarianter. Den gennemsigtige Video Bridge-anmodningssti medfører derfor intet ekstra arbejde, mens lejerbundet principal-afledning og hele FU-08-livscyklussen for flere opløsninger forbliver eksplicit opfølgningsarbejde i stedet for at være dokumenteret som færdig adfærd.

Frames forsynes sekventielt med billedtekster med den konfigurerede Video-model. En tom Video-tilsidesættelse arver Vision-indstillingen; hvis begge er tomme, vælger Vision-auto-routern den effektive visionskompatible model. Vellykkede billedtekster erstatter den oprindelige del med et stabilt `[Video description:`-præfiks, der også markerer teksten som en ikke betroet medieafledt observation og fortæller downstream-modeller, at de ikke skal følge instruktioner fundet i mediet. Cache-nøgler for frame-billedtekster inkluderer JPEG-bytes, prompt, tidsstempel og effektiv model; kun vellykkede billedtekster caches. Cache-poster bevarer den faktiske vellykkede producentmodel, herunder en fallback-model; broen rapporterer `mixed`, når forskellige frames blev produceret af forskellige modeller. Et cache-hit genbruger den producentidentitet i stedet for at omdøbe den til den anmodede routingplan. Resultatcachen for hele videoer er nøglet på ethvert input, der ændrer outputtet — prompt, effektiv model, samplingspolitik, antal frames, semantisk analysetilstand, SHA-256-fingeraftrykket af det normaliserede fokus-tip, fokusvindue, `transcript`, `audioTranscript` og kontaktark-flaget — så en ændring af enhver af disse dimensioner er et cache-miss, aldrig en forældet genbrug. Den visuelle dedup-politiks version, tærskel og afgrænsede kandidat-frame-antal er også eksplicitte i resultatcachens nøgle og metadata; en politikændring kan derfor ikke genbruge en forældet beskrivelse af hele videoen. Resultatcache-v4-metadata beholder tilstanden og fingeraftrykket, aldrig den rå brugeropgave. Guardrail-metadata rapporterer både den anmodede og den effektive analysetilstand; en anmodet `focused`-tilstand uden brugbar brugertekst rapporteres som effektivt `full`.

Guardrailen udtrækker hver understøttet videodel, men beskriver ikke flere end `modalityBridgeVideoMaxVideos`. For et mål, der er bevist at have `supportsVideo === false`, bliver mislykkede og grænseoverskridende videoer til eksplicitte sikre tekstmarkører, så ingen rå video overlever. Når kapaciteten er ukendt, bevarer disse dele deres video-bærer; enhver fallback-transskription følger den afgrænsede tekstkonvertering ovenfor. Mål med `supportsVideo === true` omgår broen. Klientanmodningens afbrudssignal propagerer gennem download, broker-kø, underprocesser og billedtekstkald; afbrydelser stopper mellem videoer og fejler aldrig åbent til råt medie.

Runtime-indstillinger er DB-understøttede og Zod-validerede:

| Nøgle                               | Standard    | Område / adfærd                                                                                          |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri runtime, opt-in                                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarer generiske billedtekster; `focused` bruger afgrænset, ikke betroet seneste-bruger-kontekst |
| `modalityBridgeVideoModel`          | `""`        | Arv Vision Bridge-modellen                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proportional `segment_aware`; detektorfejl falder tilbage til `uniform`   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Ældre persistede Video-timeoutværdier over 120 sekunder begrænses til broker-deadlinen; nye indstillingsskrivninger over den grænse afvises.
`GET /api/modality-bridge/video/runtime` kræver betroet stemplet loopback-lokalitet før godkendelse eller runtime-sondering og kræver derefter administrationsgodkendelse. Den returnerer kun `available`, rensede FFmpeg/ffprobe-versioner og en fast årsag, når runtimen er utilgængelig. Det interne udtræksendpoint er ikke en offentlig upload-API: kømætning returnerer `503` plus `Retry-After`, en kalder-frakobling returnerer `499`, og den faste broker-deadline returnerer `504`. Konverterede svar tilføjer `video->text;model=<visionModel>;parts=<videos>` til den centrale `x-omniroute-modality-bridge`-header uden at fjerne Vision- eller Audio-segmenter.

### PII Masker (`piiMasker.ts`)

Kører på **begge** trin.

- **`preCall`** kloner payloaden, gennemgår `system`, `messages`, `input` og
  `prompt` (inklusive almindelige strengelementer) og anvender `processPII()`
  (fra `@/shared/utils/inputSanitizer`) på strengfelterne `content`/`text`. Når
  `PII_REDACTION_ENABLED=true`, maskeres registreret PII i den udgående
  payload. Dette er uafhængigt af `INPUT_SANITIZER_MODE` (som kun styrer
  politikken for prompt-injektion). Når maskering er slået fra, registrerer
  kaldet detektionstal uden at omskrive indholdet.
- **`postCall`** dybkloner svaret, kører `sanitizePIIResponse()` plus
  maskeringsfunktionen for Responses-API-formen (`maskResponsesOutput` — dækker
  `output_text` og `output[].content[].text`). Hvis der sker nogen maskering,
  erstatter det ændrede svar det oprindelige.

Guardrailen blokerer aldrig; den annoterer kun (`meta.detections`,
`meta.redacted`) eller omskriver.

#### Valg pr. type, brugerdefinerede mønstre og detektionstællere

**Dashboard → Indstillinger → Sikkerhed → PII-maskering** vælger, _hvad_ der
maskeres. Det slår ikke maskering til: det er stadig `PII_REDACTION_ENABLED`
(forespørgsel) og `PII_RESPONSE_SANITIZATION` (svar + SSE), som begge er slået
fra som standard.

- **Valg pr. type** — de indbyggede id'er er angivet i
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Hvis indstillingen
  ikke er angivet, betyder det alle typer (adfærden før denne indstilling
  fandtes). Forespørgselsmotorens `ssn_us`-mønster mapper til `ssn`.
  Skabelonerne (Minimal, Standard, Finansiel, Brasiliansk, USA, Fuld) udfylder
  kun afkrydsningsfelterne i brugergrænsefladen.
- **Brugerdefinerede mønstre** — op til 20 regex- eller jokertegnmønstre (`*` =
  op til 64 tegn, der ikke er mellemrum, `?` = ét). Match bliver til
  `[CUSTOM_REDACTED]`. Hvert mønster går gennem `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): højst 500 tegn, flag begrænset til
  `g i m s u`, skal kunne kompileres, skal bestå `safe-regex` (katastrofal
  backtracking) og må ikke matche en tom streng eller en
  maskeringspladsholder. Et mønster, der fejler, afvises ved gemning og ved
  test, og en gemt række, der fejler, springes over ved kørsel i stedet for at
  blive kompileret. Brugerdefinerede mønstre kører kun, mens maskering er slået
  til.
- **Detektionstællere** — antal pr. type (aldrig de matchede værdier), opbevaret
  i hukommelsen og nulstillet ved genstart (`src/lib/pii/piiDetectionStats.ts`).
  De stiger kun, mens maskering er slået til.

Indstillingerne ligger i tabellen `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) og læses gennem en cache på 1 s. API:

| Metode | Sti                      | Formål                                                          |
| ------ | ------------------------ | --------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flagstatus, `enabledTypes`, `customPatterns`, detektionstællere |
| `PUT`  | `/api/settings/pii`      | Erstat `enabledTypes` (`null` = alle) og/eller `customPatterns` |
| `POST` | `/api/settings/pii/test` | Dry-run af ét mønster mod en prøve på højst 8 KB; intet gemmes  |

Alle tre kræver administrationsgodkendelse og validerer body'en med Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Prompt-injektion (`promptInjection.ts`)

Registrerer fjendtlige strukturer i brugerleveret indhold og håndhæver den
konfigurerede politik. Adfærden styres af miljøvariabler og
konstruktørindstillinger:

| Indstilling      | Miljøvariabel                                                                                                | Standard | Effekt                                                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiveret        | `INPUT_SANITIZER_ENABLED`                                                                                    | `true`   | Når `false`, kortsluttes guardrailen.                                                                                                                                                                      |
| Tilstand         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                              | `warn`   | Injektionspolitik: `block`, `warn` eller `log`. (`redact` accepteres for bagudkompatibilitet, men fjerner **ikke** injektionstekst; omskrivning af PII i forespørgsler styres af `PII_REDACTION_ENABLED`.) |
| Blokeringsgrænse | indstillingen `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Mindste alvorlighedsgrad, der kræves for at blokere. Medium er kun til observation ved standardindstillingen.                                                                                              |

**Tilstandsprioritet** (`getMode`): kalderens `options.mode` →
`INJECTION_GUARD_MODE` **DB-feature-flag-tilsidesættelse** (Dashboard →
Indstillinger → Feature Flags) → `INJECTION_GUARD_MODE`-miljøvariabel →
`INPUT_SANITIZER_MODE`-miljøvariabel → `warn`. En dashboard-tilsidesættelse
vinder derfor over miljøvariablerne, så brugergrænsefladen Feature Flags styrer
den kørende guardrail live (ingen genstart). DB-læsningen er fejlsikker: hvis
den fejler, falder guardrailen tilbage til den miljøbaserede adfærd, og når
ingen tilsidesættelse er angivet, er adfærden identisk med ren miljøbaseret
opløsning.

Detektionskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (delt detektorsæt,
   der bruges andre steder i pipelinen).
2. Indbyggede `DEFAULT_GUARD_PATTERNS` (i øjeblikket `system_override_inline`
   og `markdown_system_block`, begge med alvorlighedsgraden `high`).
3. Valgfri `customPatterns`, der sendes via konstruktørindstillinger (strenge,
   regex eller `{ name, pattern, severity }`-poster).

Når `mode === "block"` **og** mindst én detektion opfylder alvorlighedstærsklen, returnerer `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }`. I tilstandene `warn`/`log` logger guardrailen, men tillader kaldet. Den delte hjælpefunktion `evaluatePromptInjection()` eksporteres også til kaldere, der har brug for at evaluere prompts uden at gå gennem registret.

**Scanningsgrænse (v3.8.20):** detektoren undersøger kun de **første 16 KB** af den samlede prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i `src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og `evaluatePromptInjection()` udfører `slice(0, MAX_INJECTION_SCAN_BYTES)`, før mønstersløjfen køres. Injektionsdirektiver sidder nær toppen af et input, så dette sætter et loft over regex-CPU/GC-forbruget på payloads på flere hundrede KB uden at svække detektionen (jf. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Kører på **begge** trin, sidst i standardkæden (prioritet `95`). Maskerer velkendte mønstre for API-nøgler/hemmelige tokens fra den udgående payload (beskedindhold, værktøjskaldargumenter, værktøjsresultater) **og** udbyderens svar, så en legitimationsoplysning, der indsættes i en prompt (eller ekko'es tilbage af et værktøjsresultat), ikke lækkes til den opstrøms udbyder eller tilbage til klienten.

- **Kun opt-in**, samme konvention som PII-maskering (Hard Rule #20-tilstødende):
  deaktiveret, medmindre `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er slået fra, er guardrailen en no-op —
  den blokerer aldrig og omskriver aldrig.
- `redactCredentials()` gennemløber hele payload-/svartræet (`walkValue()`,
  sikker mod prototype-pollution, cyklussikker via `WeakSet`) og erstatter match med
  en `[REDACTED:<type>]`-pladsholder, idet den kun kloner de grene, der faktisk
  ændrede sig.
- `CREDENTIAL_PATTERNS` dækker LLM-udbydernøgler (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøgler (Stripe, Square), cloudnøgler
  (AWS-adgangsnøgle, Twilio, SendGrid, Mailgun), private nøgler/JWT'er,
  forbindelsesstrenge med legitimationsoplysninger (`mongodb://user:pass@...` osv.) samt
  et generisk `Authorization`/`x-api-key`/`api-key`/`apikey`-headerværdimønster.
  Headerformede nøgler (`authorization`, `x-api-key`, `api-key`,
  `apikey`) maskeres strukturelt (kun værdien; skemapræfiks som
  `Bearer `/`Basic ` bevares) i stedet for via den generiske tekst-regex.
- Guardrailen blokerer aldrig; den omskriver kun (`modifiedPayload` /
  `modifiedResponse`) og annoterer (`meta.credentialsRedacted`, `meta.count`).

Regressionsvagt: `tests/unit/credential-masker-guardrail.test.ts`.

## Basiskontrakt (`base.ts`)

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
  block?: boolean; // true kortslutter kæden
  message?: string; // vises ved blokering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returneres af preCall for at omskrive forespørgslen
  modifiedResponse?: TValue; // returneres af postCall for at omskrive svaret
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

Et guardrail signalerer »ingen ændring« ved at returnere enten `void`, `{}` eller
`{ block: false }`. Returneres en `modifiedPayload`/`modifiedResponse`, erstattes
den værdi, der flyder gennem kæden, for efterfølgende guardrails.
`signal?: AbortSignal` fører kalderens livscyklus ind i guardrails. Et afbrudt request er den bevidste fail-open-undtagelse: mediebroer stopper arbejdet og rydder op uden at gendanne rå medier til et mål, der vides ikke at understøtte dem.

## Registrering (`registry.ts`)

Singletonen `guardrailRegistry` eksponerer:

- `register(guardrail)` — tilføjer (eller erstatter efter normaliseret navn) et guardrail og
  omsorterer efter stigende `priority`.
- `clear()` / `list()` — administrative hjælpefunktioner.
- `runPreCallHooks(payload, context)` — itererer aktive guardrails, fører
  payloaden gennem `modifiedPayload` og stopper ved den første `block: true`.
- `runPostCallHooks(response, context)` — samme flow på svardsiden.
- `resetGuardrailsForTests({ registerDefaults })` — rydder tilstanden og genregistrerer
  eventuelt standarderne for ren testisolering.

Begge kørselsfunktioner returnerer `{ blocked, payload|response, results, guardrail?, message? }`,
hvor `results` er et array af `GuardrailExecutionResult`-poster, der indeholder
felterne `blocked`, `skipped`, `modified`, `error` og `meta` pr. guardrail –
nyttige til sporing.

### Deaktivering af guardrails pr. forespørgsel

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` samler en
deduplikeret liste over guardrail-navne, der skal springes over for den aktuelle
forespørgsel. Der er fem kanaler, som læses i denne rækkefølge og flettes til én liste
(første forekomst vinder ved deduplikering):

1. `apiKeyInfo.disabledGuardrails`
2. Forespørgselsbody `disabledGuardrails` (øverste niveau)
3. Forespørgselsbody `metadata.disabledGuardrails` (kun når `metadata` er et objekt)
4. Headeren `x-omniroute-disabled-guardrails`
5. Ældre header `x-disabled-guardrails`

Alle fem kanaler flettes, herunder de to headere: Sender man både
`x-omniroute-disabled-guardrails` og `x-disabled-guardrails`, springes unionen af
deres lister over, og en tom moderne header skjuler ikke længere den ældre
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), rettet i
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Værdier kan være arrays af strenge eller en kommasepareret streng; navne trimmes
og normaliseres til kebab-case med små bogstaver (`pii_masker` → `pii-masker`), og tomme
poster udelades. Resultatet sendes via `context.disabledGuardrails`
til registreringen, som springer matchende guardrails over (`skipped: true` i `results`).

Deaktiveringslisten påvirker kun **registreringen**. Prompt-injection-tilstanden `block` er
en obligatorisk grænse: injection-guard-middlewaren
(`src/middleware/promptInjectionGuard.ts`) kalder `evaluatePromptInjection()`
uden nogen kalderstyret deaktiveringsliste (det døde
`resolveDisabledGuardrails({ body })`-kald, den tidligere foretog, blev fjernet i
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), så en forespørgsel,
der deaktiverer `prompt-injection`, afvises stadig i `block`-tilstand. Dette er
by design. Deaktiveringskanalerne er kalderstyrede (forespørgselsbody,
metadata, headere), og en kalder må ikke kunne slå en sikkerhedskontrol fra,
som operatøren har sat
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Header-unionen
fra [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
ændrer kun, hvilke registrerings-guardrails der springes over; den lader ikke en klient
omgå middlewaren. Obligatoriske guardrail-politikker pr. nøgle og pr. gruppe
spores i v4-RFC'en [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Se [Dækning og begrænsninger](#coverage-and-limits).

## Udførelsesrækkefølge

For hver forespørgsel, der løber gennem `src/sse/handlers/chat.ts` og
`open-sse/handlers/chatCore.ts` (chat-familiens ruter anført under
[Dækning og begrænsninger](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` opbygger spring-over-listen ud fra API-nøgle,
   body og headere.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kører guardrails i stigende
   prioritetsrækkefølge:
   - Deaktiverede guardrails registreres som `skipped`.
   - Hvert guardrails `preCall` kan omskrive payloaden via `modifiedPayload`.
   - Den første `block: true` kortslutter kæden, og handleren returnerer
     et guardrail-afvisningssvar.
3. Den (potentielt omskrevne) payload flyder videre ind i combo-routing og
   upstream-dispatch.
4. **Kun non-streaming:** Efter at svaret er samlet, kører
   `guardrailRegistry.runPostCallHooks(...)` den samme kæde på svaret.
   `block: true` her dropper upstream-svaret og returnerer HTTP 400. Streamede
   svar springer dette trin helt over.

Guardrails, der kaster en fejl, registreres med `error: <message>` og logges via
`logger.warn`, men kæden fortsætter — fail-open efter design.

## Dækning og begrænsninger

Guardrail-registret er kun kablet ind i chat-pipelinen. Disse begrænsninger er
fastlåst af `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` og
`tests/unit/guardrail-pipeline-characterization.test.ts`; opdater disse tests
bevidst, når adfærden ændrer sig.

### Hvor hooksene kører

| Hook / kontrol                      | Kører på                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Forespørgsler håndteret af `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (og `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` og Telegram-chat-proxien. Også dashboardets test-endpoint `/api/guardrails/test`. En pre-call-blok returnerer HTTP 400. |
| `runPostCallHooks`                  | Kun **non-streaming**-chatsvar (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamede svar når den aldrig.                                                                                                                                                                                                                                                                                                             |
| Streaming-PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), pipet ind i `streamingPipeline.ts`, når `PII_RESPONSE_SANITIZATION` er slået til. Det er ikke et guardrail, så deaktiveringskanalerne påvirker det ikke.                                                                                                                                                                                                            |
| Injection-guard-middleware (legacy) | Hver prompt-bærende `/v1`-rute, inklusive chat-familien (se [rutedækning](#injection-guard-route-coverage--red-team-phase-8--block-d)). Kun prompt injection.                                                                                                                                                                                                                                                                     |

### Hvad der ikke er dækket

- **Medie-, embeddings- og dataruter** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) når aldrig registret. Ingen
  PII-maskering, maskering af legitimationsoplysninger eller modality bridge
  kører der. Deres eneste kontrol er den ældre injection-guard-middleware.
- **Streamede svar** får ingen post-call-guardrails: ingen `pii-masker`- eller
  `credential-masker`-post-call og ingen post-call-blok. Kun streaming-PII-
  transformationen gælder (når `PII_RESPONSE_SANITIZATION` er slået til). En
  legitimationsoplysning, der sendes tilbage i et streamet svar, bliver ikke
  maskeret.
- **Deaktiveringskanaler vs. middlewaren (efter design):** Middlewaren evaluerer
  prompt injection med sit eget kald til `evaluatePromptInjection()`, uden at
  videregive nogen kalderstyret deaktiveringsliste. `block`-tilstand er en
  obligatorisk grænse, som kalderstyrede deaktiveringer ikke kan omgå, inklusive
  på chat-familiens ruter
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). At
  deaktivere `prompt-injection` springer kun registrets guardrail over.

### Hvad der ser et svar før post-call

På non-streaming-stien er rækkefølgen: hukommelsesekstraktion → indbygget
værktøjsudførelse → post-call-guardrails → post-call-blok-afslutning → lagring
i den semantiske cache.

- **Hukommelsesekstraktion** og **værktøjsudførelse** ser svaret, før post-call-guardrails kan omskrive eller blokere det. Siden
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) kører
  hukommelsesekstraktion den ekstraherede tekst gennem `sanitizePII`, når
  `PII_RESPONSE_SANITIZATION` er slået til (både streaming og non-streaming), men et
  svar, som post-call senere blokerer, er stadig blevet tilbudt til hukommelse og
  værktøjer.
- **Den semantiske cache** gemmer svaret efter post-call, så den gemmer det
  omskrevne svar, og et blokeret svar caches aldrig. Cache-poster er
  nøglet pr. API-nøgle.

## Konfiguration

Miljøvariabler, der læses af de indbyggede guardrails:

| Variabel                              | Bruges af                | Effekt                                                                                                     |
| ------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Angiv `false` for at deaktivere detektion helt.                                                            |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Injektionspolitik: `warn`, `block` eller `log`. Den ældre værdi `redact` omskriver ikke injektionsteksten. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Tilstand for injektionsvagten; også et DB-feature-flag, der **tilsidesætter** miljøvariablerne (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Minimumsalvorlighedsgrad, som `MODE=block` afviser: `high` (standard), `medium` eller `low`.               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Ældre alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Når `true`, maskeres PII i forespørgslen (uafhængigt af injektionstilstand).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedstrøms) | Styrer maskeringens adfærd på svardelen.                                                                   |

Modality Bridge-guardrails læser runtime-konfigurationen fra det
DB-understøttede indstillingslager (`getSettings()`), ikke fra miljøvariabler.
Visions primære nøgler er `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`. De ældre
`visionBridge*`-nøgler accepteres kun som den dokumenterede fallback-læsning i
én cyklus; skrivninger fra dashboardet bruger de primære nøgler. Standardværdier
og fallback-resolveren findes i `src/shared/constants/modalityBridgeDefaults.ts`,
mens de ældre konstanter er bevaret i `src/shared/constants/visionBridgeDefaults.ts`.

Audio bruger `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips` samt de delte
`modalityBridgeCache*`-indstillinger. Audio har ingen fallback til ældre nøgler,
da disse nøgler blev introduceret sammen med Modality Bridge-skemaet.

Video bruger `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`,
`modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` og
`modalityBridgeVideoTimeout` samt de delte `modalityBridgeCache*`-indstillinger.
Det er deaktiveret som standard, fordi FFmpeg/ffprobe er valgfrie operationelle
afhængigheder, og frame-billedtekstning tilføjer latenstid og modelomkostninger.

## Tilpassede guardrails

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

Trin:

1. Opret `src/lib/guardrails/myGuardrail.ts`, der udvider `BaseGuardrail`.
2. Implementér `preCall` og/eller `postCall`.
3. Registrér enten ved importtidspunktet (push fra `registerDefaultGuardrails`)
   eller kald `guardrailRegistry.register(...)` ved kørsel — registeret
   erstatter enhver tidligere guardrail med samme normaliserede navn.
4. Tilføj tests under `tests/unit/` (eksisterende eksempler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testning

Brug `resetGuardrailsForTests()` mellem tests for at starte fra en kendt tilstand.
Angiv `{ registerDefaults: false }` for at starte med et tomt register og
kun registrere de guardrails, der testes. Vision Bridge understøtter dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge eksponerer
tilsvarende afkoblingspunkter for indstillinger, kapabiliteter, valg af
STT-model, kontrol af legitimationsoplysninger og transskription. Tests kan
derfor afprøve begge flows uden adgang til DB eller netværk.

## Se også

- `src/lib/guardrails/` — implementering
- `src/shared/utils/inputSanitizer.ts` — delt detektor, der ligger til grund for
  prompt-injektionsbeskyttelse og PII-maskering
- `src/shared/constants/visionBridgeDefaults.ts` — standardværdier for Vision Bridge
  og model-liste for tvungen bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — delte standardværdier for Vision/Audio ved kørsel
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lag (circuit breaker, cooldown-perioder)
- `docs/reference/ENVIRONMENT.md` — komplet reference til miljøvariabler

## Dækning af injection-guard-ruter & red-team (fase 8 · blok D)

Injection-guard'en (`createInjectionGuard` / `withInjectionGuard`) dækker alle ruter,
der accepterer bruger-prompter. Den respekterer `INJECTION_GUARD_MODE` (standard `warn` = kun logning;
`block` = returnerer HTTP 400 `SECURITY_001`).

| Type                 | Ruter                                                                                                                                                | Standardtilstand |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Tekst (eksisterende) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generativ            | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

Tekstudtrækning (`extractMessageContents`) dækker `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (natligt, `nightly-llm-security.yml`):** promptfoo validerer, at hver rute blokerer
OWASP-LLM-korpusset i `INJECTION_GUARD_MODE=block`; garak kører probes (springes over uden secret).
`moderations` er inkluderet for konsistens. Blok-tilstand er en obligatorisk grænse: `evaluatePromptInjection()`
ignorerer den deaktiveringsliste pr. forespørgsel, som middlewaren videregiver til den, så `disabledGuardrails` fritager
**ikke** en rute fra den ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Det natlige workflow (`.github/workflows/nightly-llm-security.yml`, cron + manuel
udløsning) har to jobs:

- **`promptfoo-guard` (blokerende)** — kører `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Hvert adversarisk tilfælde (f.eks. "ignore all
  previous instructions…", DAN-lignende jailbreaks) verificerer, at svaret indeholder
  `error.code === "SECURITY_001"`, dvs. at guard'en faktisk afviste forespørgslen.
- **`garak` (rådgivende)** — kører garak `--probes promptinject,dan,leakreplay`
  mod en lokal OmniRoute-instans (`http://localhost:20128/v1`). Betinget af en
  provider-secret (`PROMPTFOO_PROVIDER_KEY`); springes elegant over og har suffikset
  `|| true`, så den rapporterer uden at lade CI fejle.

Dækningen af guard-hjælperen (`createInjectionGuard` / `withInjectionGuard`)
omfatter hver eneste prompt-bærende `/v1`-rute; prompt-teksten hentes fra
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` af
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
