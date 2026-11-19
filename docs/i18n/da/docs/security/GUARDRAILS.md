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

## Indbyggede sikkerhedsforanstaltninger

Registry indlæser automatisk seks sikkerhedsforanstaltninger i prioritetsrækkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Trin           | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetsnumre køres **først**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Grundmodellen GLM 5.3 og `glm-5.3-{low,high,max}` har eksplicitte
`supportsVision:false`-metadata i registry/spec. GLM 5.3 Flash-varianterne
forbliver native vision-modeller. Claude Codes `/v1/messages`-rute går ind i den
delte `handleChat`-sikkerhedsforanstaltningskæde før Claude-til-OpenAI-
oversættelsen; indlejrede billeder fra `Read`-værktøjsresultater skal beskrives
eller håndteres, før denne oversættelse løfter dem til OpenAI-indhold af typen
`image_url` (#17069).

Afviser billedholdige forespørgsler, der er rettet mod **ikke-vision-modeller**,
og omdirigerer enten hele forespørgslen til en vision-kompatibel model eller
erstatter billeddelene med tekstbeskrivelser, der genereres af en konfigurerbar
vision-model, før upstream-kaldet. Det gør det muligt for tekstbaserede
udbydere transparent at håndtere multimodale payloads.

Forløb:

1. Spring over, hvis målmodellen allerede understøtter vision (medmindre den
   findes på den tvungne bridge-liste `isVisionBridgeForcedModel`).
2. Udtræk billeddele via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **forenede mediedetektor**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den eneste kilde til
   sandheden, der deles med combo-kompatibilitetsfilteret.
   Udtræk er begrænset til de former, som `replaceImageParts` kan indsætte igen
   (extract↔replace-kontrakten): OpenAI `image_url`, Anthropics
   `source.type:"base64"`, Anthropics URL `source.type:"url"` og Responses API
   `input_image`. Matchende billeder, der er indlejret i Claude Codes
   `tool_result.content` og Responses-værktøjsoutput, udtrækkes og erstattes
   også på deres oprindelige stier; former, der kun fungerer som indikatorer,
   hører til combo-filtermaterialet og udtrækkes ikke.
   Spring over, hvis ingen findes.
3. Opløs runtime-konfigurationen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): Nye
   `modalityBridge*`-indstillingsnøgler har forrang; ældre `visionBridge*`-nøgler
   forbliver en **fallback i én cyklus** (rollback-vindue). Spring over, før
   nogen mediegennemgang foretages, hvis bridgen er deaktiveret.
4. Tilstandsselector (`modalityBridgeVisionMode`, se tabellen nedenfor)
   afgør omdirigering kontra beskrivelse. Omdirigering returnerer
   `modifiedPayload` med kun `model` udskiftet samt meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsesstien: begræns antallet af billeder til `maxImages`, sammensæt
   den opgavebevidste prompt, konsultér beskrivelsescachen, kald vision-modellen
   **parallelt** (`Promise.allSettled`), og indsæt tekstdele med
   `[Image N]: <description>` på deres plads. En mislykket beskrivelse giver
   `null`: det rå billede bevares for ukendte/vision-kompatible mål (#4012), men
   et **bekræftet tekstbaseret direkte mål** eller en combo uden vision får en
   eksplicit `(unavailable — no vision-capable provider connected)`-tekststump
   for hvert ubeskrevet billede, herunder delvise fejl og billeder ud over
   grænsen for beskrivelseskald (#17069). Den eksisterende fallback for
   beskrivelse af en combo, hvor alt fejler, forbliver på plads (#8430).
6. Returnér `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilstandsselector (`modalityBridgeVisionMode`)

| Tilstand   | Standard | Adfærd                                                                                                                                                                                                                                                                                                                                    |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Ældre heuristik, uændret (#6640/#7204): modeller, der ikke er combo/`auto/`, omdirigeres til den bedste vision-model, medmindre den oprindelige model allerede har brugbare legitimationsoplysninger (så beskrives der); combo-mål beskrives altid.                                                                                       |
| `describe` |          | Beskriv altid — omdirigeringsblokken springes helt over; brugerens valgte model svarer altid.                                                                                                                                                                                                                                             |
| `reroute`  |          | Gennemtving omdirigering: kontrollen af den model, der har legitimationsoplysninger, omgås. Kontrollen af legitimationsoplysninger for omdirigerings-**målet** gælder stadig — når der ikke findes et brugbart vision-mål, blokerer bridgen med en tydelig fejl i stedet for at beskrive eller sende rå billeder til et tekstbaseret mål. |

Tvungne tilstande afbryder før auto-heuristikken køres; `auto`-adfærden er
byte-identisk med sikkerhedsforanstaltningen før PR-1.

#### API-nøglernes omfang (`visionBridgeKeyScope.ts`)

Når den kaldendes API-nøgle begrænser `allowedConnections`, kvotepuljer
(`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), vælger broen kun
omdirigerings- og beskrivelsesmodeller, som nøglen må bruge, på forbindelser,
som nøglen må bruge. Beskrivelseskaldet går derefter altid gennem OmniRoute
self-loop med headeren `x-omniroute-self-loop-key-id`, så den modtagende
chatforespørgsel håndhæver den pågældende nøgles forbindelses- og modelpolitik
igen. `enforceApiKeyPolicy()` respekterer kun denne header sammen med
self-loop-beareren, så den kan kun indsnævre adgangen, og et id, der ikke kan
opløses, afvises.

Hvis ingen synsmodel er tilladt for nøglen, afviser et **bekræftet
tekst-only-mål** billedforespørgslen lokalt med en tydelig HTTP 400 i stedet
for at videresende billedbytes til en upstream, der ikke kan håndtere dem
(#17069). For mål med ukendt eller indbygget synskapacitet bevarer
beskrivelsesstien sin tidligere fail-open-adfærd
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Forespørgsler uden en nøgle og nøgler uden disse begrænsninger fungerer
præcis som før.

#### Opgavebevidst beskrivelsesprompt (`modalityBridgeVisionTaskAware`)

Standard er **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
tilføjer teksten fra den **seneste brugermeddelelse** (afkortet til 500 tegn)
til den grundlæggende beskrivelsesprompt, så beskrivelsen fokuserer på det,
brugeren faktisk bad om (codex-vision-proxy-mønsteret), og beder synsmodellen
om at transskribere synlig tekst. Når flaget er deaktiveret — eller der ikke
er nogen brugertekst — bruges grundprompten uændret.

Beskrivelses-`self-loop`-ets egen OpenAI-kompatible forespørgsel
(`callVisionModelSingle()` i `visionBridgeHelpers.ts`) anmoder altid om
`image_url.detail: "high"` — ubetinget, for alle kaldere/udbydere, og ikke
afhængigt af noget klientsignal. Sampling med lav detaljegrad forringer
OCR-nøjagtigheden for netop den teksttransskriptionsopgave, som denne prompt
anmoder om, så beskrivelseskaldet anmoder altid om høj detaljegrad, uanset
hvilket detaljeniveau den oprindelige indgående forespørgsel brugte. Dette
påvirker kun kroppen i den interne beskrivelsesforespørgsel; det ændrer ikke,
hvordan OmniRoute videresender den kaldendes egen `image_url.detail` på den
primære forespørgsel — denne standard anvendes separat og kun for registrerede
OpenCode-klienter i `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Beskrivelses-`self-loop`-ets
Anthropic wire-format-gren har intet `detail`-felt og påvirkes ikke af nogen
af standarderne.

#### Grænse for beskrivelsesoutput (`modalityBridgeVisionMaxChars`)

| Nøgle                          | Standard | Område              |
| ------------------------------ | -------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` eller 100–50000 |

`0` (standard) betyder **ingen grænse** — beskrivelsen, der returneres af
`callVisionModel()`, sendes videre uden ændringer, så den eksisterende adfærd
bevares. Enhver værdi i området 100–50000 afkorter beskrivelsen med et
`…`-suffiks, før den indsættes igen som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Hæv denne værdi til OCR-opgaver med mange detaljer, hvor downstream-modellen
har brug for hele transskriptionen; sænk den for at begrænse tokenforbruget på
snakkende synsmodeller. Dashboardfeltet findes på fanen Vision i panelet
Advanced (`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) og
begrænser enhver værdi mellem 1 og 99 opad til minimumsværdien 100, mens en
eksplicit `0` forbliver urørt — `0` er en gyldig Zod-værdi i sig selv
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke blot
standardværdien for "unset".

#### Beskrivelsescache (`modalityBridge/bridgeCache.ts`)

Cache i hukommelsen med LRU + TTL for beskrivelsesoutput, delt på tværs af
hele processen. Nøgle = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
med længdepræfiksindramning (ingen kollisioner ved feltgrænser). Modelkomponenten
er den **konfigurerede** bromodel, ikke den model, der faktisk svarede —
`callVisionModel` kan falde tilbage internt, og nøgleopdeling pr. forsøg ville
fragmentere cachen. Mislykkede beskrivelser caches aldrig. Indstillinger:

| Nøgle                           | Standard | Område  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalisering af fjernbilleder (self-loop-beskrivelse/base64-hentning)

Når broen selv henter et **fjernbillede** — både Anthropic-beskrivelsens
self-call og base64-konverteringen til claude-wire-format
(`ensureBase64ImagesForClaudeWire`), begge via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — sendes den
resulterende data-URI gennem `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`), før den indlejres i
synsmodel-forespørgslen. Billeder, der er for store, skaleres ned til en
**2048 px lang kant** (svarende til den størrelsesgrænse, som OpenAI/Anthropic
allerede anvender på serversiden), hvilket reducerer uploadbytes og latenstid
uden at ændre det, synsmodellen ser. Ændring af størrelse bruger `sharp`, som
indlæses via dynamisk import: På en platform, hvor den native binærfil ikke
kan indlæses, **kaster `normalizeDataUri()` aldrig en fejl** — den falder
tilbage til at videresende de oprindelige bytes, så beskrivelses-/
base64-konverteringsstien altid fortsætter med at fungere. Bytes, der ikke er
billeddata (en hentning, der ikke returnerede et afkodbart billede), sendes
også videre urørte. Denne normalisering er begrænset til billeder, som broen
henter til sit eget self-call — den anvendes aldrig på den kaldendes rå
pass-through-payload i overensstemmelse med princippet om ændringer kun ved
tilvalg (Hard Rule #20).

#### Indstillingsskema + migrering

De nye `modalityBridge*`-nøgler valideres med Zod i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, gruppen med tre `modalityBridgeCache*`-nøgler
samt gruppen `modalityBridgeAudio*`, der bruges af Audio Bridge. Migrationen
`141_modality_bridge_settings.sql` kopierer eksisterende `visionBridge*`-værdier
til de tilsvarende nye nøgler (idempotent og overskriver aldrig en
operatørangivet `modalityBridge*`-værdi); de gamle nøgler accepteres fortsat
som fallback ved læsning i én release-cyklus.

#### Gennemsigtighedsheader + statistik

Svar, der er transformeret med describe, indeholder
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(opbygget af `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`
og tilføjet af `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omdirigerede requests får **ingen** header — payloaden blev ikke ændret, og
modellens udskiftning er allerede synlig i svarkroppens `model`-felt.

`GET /api/modality-bridge/stats` (administrationsgodkendelse, samme niveau som
`GET /api/settings`) returnerer tællere pr. modality i hukommelsen
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og
`video`. `averageLatencyMs` bruger `latencySamples`, ikke alle forsøg, som
nævner; en handling uden tidsmåling opretter ikke kunstigt en
nul-millisekundprøve. `bridged` forbliver det bagudkompatible alias for
vellykkede konverteringer; mislykkede forsøg øger det ikke.
Tællerne nulstilles ved genstart af processen efter hensigten
(telemetri, ikke regnskab).

#### Konfiguration af dashboardet

Den dedikerede dashboard-side er
`/dashboard/settings/modality-bridge`. De URL-adresserbare faner `Vision`,
`Audio` og `Video` bevarer forespørgselsparametre, når værdien af `tab`
ændres. Fanen Vision viser aktivering, tilstand, modelvalg (inklusive den
automatiske standard), opgavebevidst prompting, avancerede grænser for
timeout, billeder, beskrivelseslængde og cache, runtime-tællere samt en
beskyttet prøveforespørgsel. Fanen Audio er også aktiv: den viser aktivering,
en modelvælger, der kun omfatter STT, med Auto, grænser for timeout og
maksimalt klip samt lydtællere og en `input_audio`-prøvetest. Fanen Video er
funktionel: den viser FFmpeg/ffprobe-runtime-status — én af fire eksplicitte
UI-tilstande (`unknown`, mens forespørgslen er i gang eller ikke kunne
fuldføres, `restricted` på en dashboardvært, der ikke er loopback, hvor
forespørgslen springes over på klientsiden, `unavailable`, når der er
forespurgt og manglende installation er bekræftet, eller `available` med
FFmpeg/ffprobe-versionerne) — gemmer grænser for aktivering/model/billeder/
video/timeout, begrænser modelvælgeren til modeller med vision-understøttelse
og viser videotællere.

Det tidligere Vision Bridge-kort under AI-indstillinger er et
kompatibilitetslink til den nye side; det ejer ikke længere en ekstra kopi af
formularen. Media Providers linker også Image-to-Text- og
Speech-to-Text-arbejdsgange til de tilsvarende Modality Bridge-faner uden at
fjerne den eksisterende Speech-to-Text-legeplads.

**Omgåelse af self-loop-admission:** Når describe-kaldet går gennem OmniRoutes
egen `/v1` self-loop (model fra en ikke-standardudbyder), sender
underanmodningen `x-omniroute-admission-bypass: internal` og godkendes med den
løste self-loop-legitimation — det lokale `sk_omniroute`-sentinel i lokal
tilstand eller den operatørkonfigurerede `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY`-miljønøgle (#1350), så installationer med
`REQUIRE_API_KEY=true` stadig kan udføre describe-kaldet. Omgåelsen
accepteres kun for netop disse legitimationsoplysninger, så eksterne klienter
ikke kan bruge headeren til at springe admission over.

Ældre standardværdier findes i `src/shared/constants/visionBridgeDefaults.ts`;
de nye standardværdier for tilstand, opgavebevidsthed og cache samt
indstillingsresolveren findes i
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrailen eksponerer en
`deps`-konstruktørindstilling, så test kan indsætte falske implementeringer af
`getSettings` og `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Opsnapper chat-requests, der indeholder lyd, før de når frem til et mål, som
ikke med sikkerhed accepterer lydinput. Den omdirigerer aldrig chat-requesten:
lyddele transskriberes via det eksisterende OpenAI-kompatible multipart-endpoint,
og den valgte chatmodel fortsætter med teksttransskriptioner.

Forløb:

1. Opløs `supportsAudio` via `getResolvedModelCapabilities()`. Metadata fra provider-registret har eksplicit forrang, derefter statiske modelmetadata og til sidst synkroniserede `modalities_input`. En erklæret inputliste uden `audio` er `false`; hvis der ikke er nogen kapabilitetsoplysninger, forbliver værdien `null`. Både `false` og `null` aktiverer den konservative bro, mens `true` omgår den.
2. Opløs indstillingerne for `modalityBridgeAudio*`, og udtræk lyddele på topniveau, der kan indsættes, fra hver meddelelse via den delte detektor `detectMediaParts()`. Understøttede wire-formater er OpenAI `input_audio`, `audio_url` og `source.media_type: "audio/*"`. Indlejret lyd registreres til routing, men fjernes ikke af indsættelsesstien. Arbejdet begrænses af `modalityBridgeAudioMaxClips`; senere dele forbliver uberørte.
3. Respekter en konfigureret `provider/model`, eller lad `selectAudioBridgeModel()` gennemløbe `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrækkefølge og vælge den første model med brugbare aktive provider-legitimationsoplysninger.
4. `callAudioTranscription()` konverterer base64-/data-URI-lyd til en multipart-`file` eller downloader en ekstern `audio_url` via den offentlige outbound-vagt med DNS-binding og en grænse på 25 MB. Derefter POST'er den filen og den valgte model til det lokale `/v1/audio/transcriptions`-selvloop, godkendt med `resolveSelfLoopBearer()`. Den eksisterende transskriptionsrute udfører almindeligt opslag af legitimationsoplysninger, håndtering af cooldown/ratebegrænsning og provider-dispatch.
5. Ved vellykkede kald erstattes delene med `[Audio N]: <transcript>`. Kald køres med `Promise.allSettled`: En individuel fejl bevarer den oprindelige lyd-del (#4012-kontrakten). Hvis alle kald mislykkes, og det er bevist, at målet har `supportsAudio === false`, bliver delene til
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakten). For et ukendt mål (`null`) forbliver resultatet uberørt, hvis alle kald mislykkes. Et bevist tekstbaseret mål uden brugbare STT-legitimationsoplysninger modtager den samme eksplicitte stub uden at foretage et netværkskald.

Vellykkede transskriptioner bruger Modality Bridge-processens LRU/TTL-cache. Nøglen kombinerer lydreferencen, den stabile operationsetiket `audio-transcription` og den valgte STT-model; fejl caches aldrig. Lydforsøg opdaterer de delte tællere `bridged`, `cacheHits`, `failures` og `lastUsedAt`. Transformerede svar medfører
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; uberørte forespørgsler modtager ikke et Audio Bridge-segment.

Runtime-indstillinger lagres i databasen og valideres med Zod:

| Nøgle                         | Standard | Interval          |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Den delte cache styres fortsat af `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Videobro (`videoBridge.ts`, `videoBridgePipeline.ts`)

Opsnapper videodele på topniveau i Chat Completions-API'ets `messages` og Responses-API'ets `input`, før et mål uden kendt indbygget videounderstøttelse kaldes. Understøttede former er `input_video`, `video_url`, `video_source`, HTTPS-URL'er og `data:video/*;base64,...`-data-URI'er. Almindelige filnavne i tekst behandles ikke som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ejer gennemløb af forespørgslen, kapabilitets-/politikchecket, aggregering pr. forespørgsel og svarpayloaden. Arbejde pr. video — hentning, cachen for hele resultatet, beskrivelse af en billedsekvens (som sammenfletter en eventuel lydtransskription angivet af kalderen) samt metrics/afbrydelse/oprydning pr. forsøg — er skjult bag `processVideoPart` i `videoBridgePipeline.ts`, som kaldes én gang pr. videodel inde i `preCall`'s løkke. Dette modul definerer også de eksplicitte portgrænser `VideoMediaBrokerPort` (hentning af bytes og udtrækning af samplede frames), `VideoAudioTranscriptionPort` (sammenfletning af en lydtransskription angivet af kalderen med de samplede billedtekster) og `VideoDrilldownPort` (den ældre raw-store-form). Produktionens STT- og frame-retention-funktioner komponeres omkring beskrivelsesporten via `createVideoSttAdapter` og `createVideoDrilldownAdapter`; sidstnævnte bruger den delte livscyklus for ugennemsigtige handles.

Den offentlige `/v1`-forespørgselssti importerer eller kalder aldrig en subprocess. Eksterne videoer downloades under en grænse på 50 MiB; inline-base64-videoer har en konservativ dekodet grænse på 36 MiB pr. video, så modellen/meddelelserne/framing-konvolutten kan holdes inden for den offentlige JSON-forespørgselsgrænse på 50 MiB. Estimater for inline-længde og dekodet størrelse kontrolleres før allokering. HTTPS kræves for den oprindelige eksterne URL og hver omdirigering ved hjælp af den eksisterende offentlige outbound-vagt med DNS-binding. Bytes krydser derefter den præcise interne brokergrænse `POST /api/modality-bridge/video/extract`. Denne rute er både `LOCAL_ONLY` og `SPAWN_CAPABLE`, accepterer kun en pr. proces godkendt, betroet loopback-forespørgsel og accepterer aldrig en URL, filsystemsti, eksekverbar fil eller argumentliste. API'ets body-size-pipeline og handlerens inkrementelle body-læser håndhæver uafhængigt en broker-inputgrænse på 50 MiB. Den begrænsede kø kører én udtrækning ad gangen, tillader fire ventende job og begrænser ventende input til 100 MiB.

Inde i brokerens proces læser `ffprobe` en privat lokal fil; den faste formatliste udelukker playlist- og manifestformater. For tilladte containere i MOV-familien forbliver eksterne MOV-datareferencer som standard deaktiveret, og den faste kommando tilvælger dem ikke. Både `ffprobe` og `ffmpeg` bruger kun `file`-protokollen på tilladelseslisten, én tråd, faste argumentarrays, ingen shell, og eksekverbare filer, der findes via `PATH`. Coverstreams med vedhæftede billeder er ikke afspilningsbare kandidater. Alle afspilningsbare streams skal overholde grænserne, og en eksplicit standardsstream foretrækkes før det deterministiske fallback med laveste indeks. Videoer er begrænset til 600 sekunder, 8.192 pixels pr. dimension og 33.554.432 kildepixels. FFmpeg udtager 1–16 JPEG-billeder ved midtpunkter, skalerer den lange kant ned til højst 1.024 pixels uden at opskalere mindre input og modtager aldrig en URL. Sampling er som standard `uniform`. De valgfri `scene_aware`- og eksperimentelle `segment_aware`-politikker udfører én ekstra fast FFmpeg-gennemgang af den allerede validerede lokale stream, vælger afgrænsede `showinfo`-scenetidsstempler og falder deterministisk tilbage til de samme ensartede midtpunkter ved detektorfejl, timeout, fejlagtigt output eller et tomt kandidatsæt. Segmentbevidst tilstand fordeler midtpunktsprøver proportionalt med de validerede sceneintervaller; dokumentation for segmentbevidste resultater og fallback-adfærd findes nedenfor. Den hårde grænse på 16 billeder anvendes efter udvælgelsen i alle politikker. Når en scene-aware-anmodning kun har et budget på ét billede, bruger den det ensartede midtpunkt i det aktive fulde video- eller fokusvindue og rapporterer `policyEffective: uniform`: Ét udvalgt scene-billede kan ikke bevare begge tidsmæssige ender. En kalder kan valgfrit angive et endeligt fokusvindue (`start`/`end` sekunder); grænserne begrænses til mediets varighed, omvendte eller ikke-endelige vinduer afvises, og alle samplingpolitikker udføres kun inden for det normaliserede interval. Det resulterende vindue inkluderes i samplingmetadataene og i præfikset til den utroværdige beskrivelse, så downstream-modeller kan skelne et fokuseret uddrag fra hele tidslinjen.

Semantisk billedtekstfokus er en separat, eksplicit indstilling. Standardtilstanden `full` til analyse bevarer den eksisterende billedprompt og videresender aldrig anmodningstekst til billedtekstmodellen. I tilstanden `focused` læser broen kun den seneste ikke-tomme brugerskrevne `text`/`input_text` fra den samme Chat- eller Responses-container, normaliserer den til NFC, samler kontroltegn og whitespace og begrænser den til 500 Unicode-kodepunkter. Et tomt resultat falder tilbage til den nøjagtige `full`-prompt. Et anvendeligt tip serialiseres som JSON i en dedikeret blok med utroværdig brugerkontekst og må kun prioritere observerbare detaljer; det kan ikke tilsidesætte den separate advarsel mod at følge instruktioner, der er synlige eller hørbare i mediet. Tekstfokus udleder aldrig `start`/`end` og ændrer ikke den tidsmæssige sampler.

#### FU-07 strukturel segmentdokumentation

`segment_aware` bruger én begrænset foranalysegennemgang af den allerede validerede lokale videostream. Den faste filterkæde skalerer først til højst 320 pixels i bredden, registrerer sceneændringer og frosne intervaller og sampler derefter med 1 billede pr. sekund for sløring, gennemsnitlig luminans samt rumlig og tidsmæssig information. Gennemgangen er begrænset til 600 strukturelle samples, én FFmpeg-/filtertråd, den samme protokol- og containerliste, der kun tillader `file`, en procesoutputgrænse på 1 MiB og højst 30 sekunder inden for brokerens fælles abort/deadline. Den accepterer aldrig en kommando, et filter, en sti eller en URL fra anmodningen.

De strukturelle værdier er deterministisk samplingdokumentation, ikke semantisk videoforståelse. De udleder ikke motiver, handlinger, billedtekster, tale eller brugerens hensigt. Scene- og frysegrænser danner segmenter; frysedækning, sløring, eksponering, rumlige detaljer og tidsmæssig ændring påvirker kun, hvordan det eksisterende budget på 1–16 billeder fordeles. Et fuldstændigt frosset segment begrænses til ét billede, mens ikke-frosne segmenter konkurrerer om det resterende budget. Når antallet af grænser overstiger antallet af billeder, bevares en ensartet tidslinjedækning, så hurtige tidlige klip ikke kan skjule et langt efterfølgende segment. Scenegrænser inden for frysegrænsens analyseopløsning på 1 sekund slås sammen.

Manglende filtre, fejlagtig eller tom dokumentation, en detektorfejl eller timeout i den begrænsede foranalyse udløser en åben fejlhåndtering med den nøjagtige politik for ensartede midtpunkter. En abort fra kalderen eller en broker-deadline udløser ikke åben fejlhåndtering: Den afslutter den igangværende underproces, forhindrer senere frame-ekstraktion, og det private midlertidige træ fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske ægte FFmpeg-fixtures til besparelser på billedtekstkald efter deduplikering, budgetfordeling ved tæt bevægelse, dokumentation for sløring/eksponering/SI-TI, hurtige klip med en lang hale samt falske positive ved gradvise udtoninger. Den registrerer foranalysens væg-ur-tid og, hvor `/usr/bin/time` er tilgængelig, underprocessens CPU-forbrug og maksimale RSS. Dens kvalitetskontroller er udelukkende strukturelle orakler. Den reelle kvalitet af billedtekstmodellen forbliver `HOLD`, fordi denne testsele ikke har et autoriseret endpoint eller en fastfrosset bedømmer. Monetære besparelser forbliver også `HOLD`, medmindre `--caption-cost-per-call-usd` angiver et eksplicit positivt estimat pr. kald; scriptet fremstiller aldrig nogen af resultaterne kunstigt.

Hver frame er begrænset til 4 MiB, alle rå frames tilsammen til 23 MiB, og det
serialiserede brokersvar til 32 MiB. En privat midlertidig mappe fjernes i
`finally`. OmniRoute inkluderer ikke FFmpeg og accepterer ikke en brugerdefineret
sti til den eksekverbare fil. Før billedtekstgenerering anvender broen en
konservativ visuel deduplikeringsproces: hver JPEG reduceres til en 16×16
gråtonebuffer og sammenlignes kun med den senest bevarede frame. For et
anmodet billedtekstbudget på mere end én frame leverer ekstraktionen en
begrænset kandidatsamling på op til det dobbelte af budgettet og aldrig mere
end 16 frames. Den anmodede grænse anvendes først efter deduplikering, hvor den
første og sidste valgte kandidat bevares under den endelige udtynding, når
budgettet er mindst to. Den versionerede
`grayscale-16x16-mean-cells-v2`-politik anvender den største af den gennemsnitlige
luminansforskel og forholdet mellem miniatureceller, hvis normaliserede forskel
er mindst 0.05. Duplikatgrænsen er konstanten 0.04, valgt af hensyn til
forudsigelighed frem for at blive eksponeret som en runtime-indstilling. Dette
sekundære signal for høj kontrast bevarer små bevægelser og ændringer i synlig
tekst, som en sammenligning, der kun bruger gennemsnittet, kan skjule.
Comparator- eller dekoderfejl lukker igennem og bevarer dækningen.
Outputmetadata adskiller ekstraherede kandidater, frames der blev anvendt med
succes, og visuelt kasserede duplikater.

En eksplicit markeret videodel kan anmode om et tidsstemplet kontaktark. Broen
opbygger et JPEG-gitter med højst 4 kolonner og 16 frames. Hver celle på 512
pixel indlejrer sit kildetidspunkt i et kontrastrigt bånd nederst, mens de samme
tidspunkter forbliver i tekstmetadata til efterfølgende sammenkædning og
revision. Den komplette JPEG er fortsat begrænset til 32 MiB. Hvis `sharp` ikke
kan afkode eller sammensætte gitteret, falder broen tilbage til de individuelle
JPEG-frames; en klientafbrydelse videreføres stadig gennem
arkoperationen.

Evidens til promovering holdes bevidst adskilt fra det syntetiske
mikrobenchmark for sammensætning. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definerer et skemaversioneret A/B-testmiljø for ægte OpenAI-kompatible
visionsmodeller. Det måler tokens rapporteret af udbyderen, end-to-end
væglatens (inklusive sammensætning af kontaktarket), antal modelkald og
fastholdelse af manifestdefinerede fakta. Rå modelsvar skrives ikke til
rapporten; kun SHA-256-digester og matchede fakta-ID'er bevares.
Testmiljøet foretager ingen netværks- eller betalingspligtige modelkald, medmindre
`--execute-real` er angivet, og `--model`, `OMNIROUTE_BASE_URL` og
`OMNIROUTE_API_KEY` er konfigureret. Uden denne eksplicitte ægte kørsel forbliver
den maskinlæsbare afgørelse `HOLD`; syntetiske målinger af payloads og antal kald
alene udgør ikke evidens til promovering.

Det separate `scripts/perf/video-bridge-promotion-eval.ts` bruger observationer
fra FU-07 eller FU-09. Adgang til promovering kræver alle otte syntetiske
scenarieformer samt et renset ægte klip, mindst tre målte gentagelser pr. rolle
og case, alle ti deklarerede metrikker, fastlåste digester for
medie/prompt/forventede fakta/indstillinger, unikke observations-ID'er og
verificeret seedet A/B-rækkefølge. Kørselkvitteringen binder korpusdigestet,
den nøjagtige kandidat-SHA og modelrevisionen. Manglende eller ugyldige
målinger forbliver `HOLD`, herunder CPU over 30 s, maksimal RSS over 512 MiB
eller foranalyse over 30 s. Dette er grænser for evidensoptagelse, ikke en ny
garanti for RSS-håndhævelse ved runtime.

FU-07 kræver mindst 98 % kvalitetsfastholdelse og p95-latens på højst 1,2 gange
baseline, samt enten en absolut forbedring på 0,05 i case-balanceret
gennemsnitlig recall ved et tilsvarende gennemsnitligt antal billedtekstkald
eller mindst 10 % færre gennemsnitlige billedtekstkald efter deduplikering.
FU-09 kræver mindst 0,85 i kvalitet, 95 % fastholdelse, 20 % reduktion i
medianlatens og 10 % reduktion i tokens. Tab af kritiske fakta, manglende
overholdelse af injektionsregler eller manglende brugsmålinger forhindrer
promovering. Én kørsel kan ikke promovere noget:
`--previous-report` bekræfter to forskellige, ikke-overlappende og
sammenhængende berettigede kørsler af den samme politik/modelrevision/kandidat/
korps. Et samplingeksperiment kan ikke bekræfte et kontaktarkeksperiment.

Indsamlere bør bedømme svar i hukommelsen og gemme `responseDigest` sammen med
metrikker og observationsbindinger, aldrig svartekst. Forbrugeren læser også
ældre rå observationer, men kopierer aldrig denne tekst ind i sine rapporter.
Præcis én af `responseDigest` eller `rawResponseText` accepteres for hver
observation. Den versionerede allowlist forbliver tom med en uforanderlig
`hold`-standard. En berettiget post kræver sin evidensreference, politik,
modelrevision, nøjagtige kandidat-SHA, manifestdigest og to forskellige
kørsels-ID'er; modstridende kontekster afvises. Disse metadata er en
revisionskontrakt, ikke et bevis på, at en refereret fil indeholder ægte
målinger. Gennemgå de faktiske kvitteringer, før der tilføjes en post.
Administrationsstatistikendpunktet og Video-dashboardet viser konservativ
beredskab. Et konfigureret modelalias alene fastslår ikke dets revision eller
den kørende kandidat-SHA, så det aktuelle dashboard rapporterer `HOLD` i stedet
for at genbruge berettigelse fra en anden kørselskontekst. Eksplicit
eksperimentelt valg forbliver adskilt fra promovering; ingen standard ændres
automatisk.

Kaldere kan vedhæfte et valgfrit `transcript.cues`-array til en understøttet videodel, når de allerede har justeret tekst. Hvert cue skal indeholde `text`, et endeligt `start`/`end`-interval inden for den undersøgte varighed samt en tilladt `source` (`client`, `embedded` eller `audio-bridge`); `confidence` har standardværdien `1` og skal forblive mellem `0` og `1`. Nøjagtige duplikat-cues sammenlægges. OmniRoute starter aldrig transskription ud fra disse metadata: validerede cues kopieres ind i det beskrevne resultat med kilde, konfidens og interval og gengives som upålidelige observationer sammen med billedteksterne. Ugyldig tekst, tekst uden for intervallet eller tekst uden proveniens afvises i stedet for at blive blandet ind i billedtekststrømmen. Begge transcript-kanaler i request-body normaliserer angivet proveniens til `client`, herunder selvangivne `embedded`- eller `audio-bridge`-etiketter. Kun en serverejet adapter kan tildele disse betroede etiketter via det kodebaserede `trustedSource`-argument; et JSON-felt i requesten kan ikke nå dette argument. Transcript-tekst forbliver upålideligt medieafledt indhold uanset proveniens og må aldrig bestemme autorisation.

En avanceret kalder kan angive et `audioTranscript`-spor for den samme video; det behandles som klientleveret tekst og ikke som bevis på servertransskription. Fusionsgrænsefladen kører visuelle og auditive observationer under én deadline og ét abortsignal, ordner dem på en fælles tidslinje, sammenlægger nøjagtige duplikater og rapporterer et delvist resultat, når kun den ene side lykkes. Et ugyldigt `audioTranscript` nedgraderes til dette delvise resultat — den visuelle beskrivelse bevares, og lydgrenen registrerer en saniteret fejlkode — i stedet for at få hele videoen til at fejle. Tilgængelighed pr. gren, delvishedsflaget og de saniterede fejlkoder bevares i det beskrevne resultat, i guardrail-metadataene (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), i resultatcachemetadataene og i broens fusionsmålere. Den almindelige Video Bridge-sti kalder ikke speech-to-text og downloader ikke en ekstra mediekopi; uden dette eksplicitte spor forbliver den kun videobaseret.

**Bevaring af transcript (#12150 P1).** Dette gælder automatisk, når Video Bridge (som selv er opt-in) gengiver et transcript-cue — der er intet separat bevaringsflag. Når en request gengiver et transcript-cue (et kalderspecificeret `transcript` eller et fusioneret `audioTranscript`), markerer guardrail det som `videoBridgeObserved` og producerer en redigeret skygge af videobeskrivelsen — en identisk gengivelse, hvor hver cues fritekstkrop erstattes af `[redacted-video-transcript]`, dannet ved at erstatte det strukturerede cue-felt, før strengen samles (aldrig ved at fortolke den fladtrykte tekst, så intet cue-indhold — hverken fjendtligt eller almindeligt, herunder bodies, der indeholder `]`, såsom `[inaudible]`/`[music]` — kan overleve). Den gemte request-body til call-loggen erstatter hver videoafledt tekstdel med denne redigerede skygge, matchet efter indholdslighed; `fullText`-ankeret læses igen fra den færdige pre-call-guardrail-payload, så matchet stadig lykkes, efter at senere chain-guardrails (PII- og credential-maskererne, prioriteter 10/95) omskriver beskrivelsesteksten på stedet, og efter at systemprompt-/handoff-/memory-injektion omformer message-arrayet. Bodyen, der sendes upstream til modellen, er uændret. En observeret request udfylder heller ikke nogen persistent Memory (både request- og responseafledt udtræk springes over), så modellens eget svar kan ikke ekkoe transcript-tekst ind i Memory.

**Rå videofelter (#12430).** Når broen er aktiveret, og den native videounderstøttelse er ukendt eller mangler, aktiverer definerede `transcript`-/`audioTranscript`-felter også `videoBridgeObserved`, selv efter en beskrivelsesfejl eller en `maxVideos`-begrænsning. `null` og tomme strenge tæller; manglende felter og ikke-videometadata gør ikke. Bevarede kopier redigerer disse felter eller udelader requesten, og caches/Memory omgås.

På disse fallback-stier bliver gyldige caller-cues til understøttede `text`-/`input_text`-dele i stedet for ikke-standardiserede providerfelter. Begge requestleverede spor forbliver upålidelige `client`-observationer med en eksplicit advarsel om, at videoen ikke blev beskrevet, og at tidsstemplerne ikke blev verificeret mod mediet. De eksisterende budgetter på 256 cues/64 KiB i alt og pr. cue gælder samlet på tværs af de to spor; tidsstempler skal passe inden for brokerens grænse på 600 sekunder og ethvert angivet fokusvindue. Ugyldige spor kasseres og videresendes ikke som vilkårlig tekst; en gyldig søskende kan stadig bruges, medmindre deres samlede budget overskrides. Null-/tomme felter tilføjer ingen tekst. Denne fallback tilføjer ingen mediehentning eller transskription. Transcript-udvidelsesfelter fjernes fra fallback-videobæreren og dens `video_url`-/`source`-objekter. OpenAI-wire-allowlisten forbliver streng; ukendte native videobærere er fortsat tilgængelige, og kendte tekstbaserede mål bevarer sikre markører. Strukturerede redigeringsskygger beskytter den tilføjede transcript-tekst, mens den oprindelige caller-ejede request forbliver uændret. Native-understøttede mål og deaktiverede broer bevarer deres eksisterende bypass-adfærd.

Yderligere bevarede kopier bruger det samme observerede-request-signal. Det rå pre-guardrail-klientrequest-snapshot, den pending request i hukommelsen og loggen over tidligt afviste requests erstatter strukturelt transcript-felter i videodele; strengprompts, der syntetiseres af pipeline-stadier og konteksthandoff, redigeres ved sinket for den gemte request-body. Den gemte `video_content_removed`-markør får `previous_response_id`-fortsættelse til at fejle lukket i stedet for at rekonstruere tekst, der med vilje blev kasseret. Hvis en observeret request mister sin redigeringsskygge pr. del før logning, eller blot én af flere videoskygger ikke matcher efter senere request-mutationer, udelades den gemte request-body helt i stedet for at gemme et delvist redigeret transcript.

For en observeret anmodning kan et modelsvar citere en hvilken som helst del af
transskriptionen uden en struktureret afgrænsning. Dens vedvarende kaldelog
`responseBody` erstattes derfor af en udeladelsesmarkør; det detaljerede
pipeline-artefakt (som kan indeholde upstream-/klientlegemer og stream-chunks)
gemmes ikke. Semantiske caches, idempotency-caches og caches til
genafspilning af ræsonnering springer læsninger og skrivninger over for denne
anmodning. Provider-anmodningen og det klientsynlige svar forbliver uændrede.
Tidlige keepalive-bytes tømmes fra den midlertidige buffer, når det detaljerede
artefakt udelades. Kiros advarsel om et misdannet EventStream rapporterer kun
payloadens byte-antal, aldrig dens indhold eller JSON-parserens rå fejl.
Dette påstår ikke, at alle uvedkommende provider-/plugin-diagnostik er blevet
auditeret; den bredere gennemgang af vedvarende sinks følges i #11658.

Livscyklussen for den interne `/api/modality-bridge/video/drilldown` er et separat,
loopback-/tokenautentificeret cache-underlag. Hver operation kræver også et
kanonisk, uigennemsigtigt principal-ID. Før en produktionsklient aktiveres, skal
den udlede dette ID fra den autentificerede tenant og må aldrig videresende en
klientvalgt værdi. Cache-nøgler knytter denne principal til kanoniske session-
og videoreference-ID'er, gemmer kun deres SHA-256-afledte nøgler og begrænser
både læsninger og sletning til den samme principal. Cachen gemmer højst 16
afledte JPEG-frames pr. post, udløber efter ti minutter og understøtter
afgrænsede `start`/`end`-læsninger eller eksplicit sletning af sessionen.

Hver principal er begrænset til 16 poster og 64 MiB kanoniske JPEG-data. Disse
grænser er uafhængige af den globale grænse på 64 poster/256 MiB: pres på
principalens kvote smider kun denne principals mindst nyligt anvendte poster ud,
før global LRU-udsættelse overvejes. Udløbne poster fjernes fra både principal-
og global bogføring ved cacheaktivitet, mens annullering og valideringsfejl ikke
gemmer en delvis erstatning.

Cachen afviser ikke-kanonisk Base64, overskydende padding, medier der ikke er
JPEG, misdannede eller afkortede JPEG'er samt JPEG'er, der frembringer en
advarsel under en afgrænset fuld billedafkodning med `sharp`. Den omkoder hvert
accepteret billede som en kanonisk JPEG, udleder bredde og højde fra de afkodede
bytes i stedet for at stole på klientens felter og kasserer eventuelle efterfølgende
polyglot-bytes i stedet for at gemme dem. Kun den afgrænsede kanoniske komprimerede
buffer tæller med i begge kvoter. JSON-trådgrænsen inkluderer Base64-overhead for
grænsen på 32 MiB for afkodet input. Hver gemt afledning registrerer sit
validerede JPEG-format og sin opløsning, sin samplingpolitik, sin
afledningsversion, sit oprettelsestidspunkt, en serverberegnet indholdshash og
en hashet overordnet reference samt den betroede klients overordnede
indholdshash. Annullering kontrolleres mellem asynkrone afkodnings-/hashfaser,
før den atomare cache-commit udføres.

Produktionsproducenten genbruger allerede afledte broker-frames kun efter en
vellykket visuel analyse uden en ny videodownload/-ekstraktion. Den kræver
operatorindstillingen `modalityBridgeVideoDrilldownEnabled=true`, strengt
`drilldown: true` pr. del og et autentificeret API-nøglerecord-ID. Klientangivne
principal-/sessionsværdier etablerer aldrig ejerskab. Uden alle tre betingelser
hasher, ændrer størrelse eller gemmer den ikke yderligere frames. Fejl ved
opbevaring bevarer det anvendelige visuelle svar. Samtykkede anmodninger
omgår cachen for resultater af hele videoen, så cachede resultater aldrig
genspiller handles.

Vellykkede JSON- og SSE-svar eksponerer højst fire uigennemsigtige handles i den
afgrænsede `x-omniroute-video-drilldown`-header. Autoriserede browseroprindelser
kan læse denne header uden at udvide CORS-oprindelsespolitikken. Nye handles
bruger `v1.<32-byte random base64url
token>`, og registret gemmer kun deres SHA-256-hashes. Læseren/header-parseren
accepterer også ældre tokens på 64 hexadecimale tegn.
Den autentificerede offentlige forbruger er
`GET /api/v1/video-bridge/drilldown?handle=...`, og adgangen er separat
styret af `modalityBridgeVideoDrilldownRemoteEnabled=true`. En eksplicit
vedvarende false-værdi tilbagekalder adgangen, selv når den ældre
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED`-env-fallback er aktiveret.
Produktionsopbevaring har den tilsvarende ældre
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`-fallback. Begge fallbacks er som
standard deaktiveret.

Forbrugeren udleder ejerskab fra den autentificerede nøgle og anvender
nøglepolitikken: både GET og DELETE tilhører `video`-endpointkategorien,
inklusive `/v1`- og `/api/v1`-aliaserne. Nøgler med en ikke-tom
endpoint-allowlist skal inkludere `video`; ubegrænsede nøgler forbliver
kompatible. Forbrugeren returnerer den samme 404 for ukendte, udløbne og en
anden nøgles handles. Den accepterer
`variant=preview|standard|detail` (maksimal JPEG-dimension 320/640/1280,
aldrig opskaleret), `limit=1..8` (eller det ældre `frames`-alias, aldrig begge),
nulbaseret `page` samt valgfrie `start`/`end`-fokusseksunder. Dublikerede
query-nøgler og omvendte fokusintervaller afvises. Hver returneret variant har
en hash af sit faktiske indhold og metadata for den faktiske opløsning, knyttet
til den gemte kilde. Varianter afledes ved læsning i stedet for at blive gemt
som ekstra kopier. JSON-svaret, inklusive Base64/envelope, er begrænset til
32 MiB; en for stor side returnerer 413, og klienten skal anmode om færre
frames. Læsninger kontrollerer annullering omkring hver størrelsesændring og
kontrollerer handlets gyldighed igen, før de returneres. `DELETE` udført af
ejeren er idempotent; sletning eller TTL-udløb frigiver den gemte kilde og
brugsbogføringen.

Det delte lager er proceslokalt: handles udløber ved genstart og kan ikke
overføres mellem uafhængige OmniRoute-processer. Administrationsstatistik
eksponerer den effektive opbevarings-/fjernpolitik samt det samlede antal gemte
poster og bytes, men aldrig medier, referencer, principal-ID'er eller handles.
Videoindstillingspanelet viser disse værdier og kan gemme begge samtykkekontakter.
Denne implementationsdokumentation er ikke dokumentation for en aktiv
udrulning eller promovering; accept med den reelle model følges separat.

Frames tekstes sekventielt med den konfigurerede Video-model. En tom
Video-tilsidesættelse arver Vision-indstillingen; hvis begge er tomme, vælger
Vision-auto-routeren den effektive vision-kompatible model. Vellykkede tekster
erstatter den oprindelige del med et stabilt præfiks `[Video description:`,
som også markerer teksten som en upålidelig medieafledt observation og
fortæller downstream-modeller, at de ikke må følge instruktioner fundet i
mediet. Cache-nøgler for frame-tekster omfatter JPEG-bytes, prompt,
tidsstempel og effektiv model; kun vellykkede tekster caches. Cacheposter
bevarer den faktiske succesfulde producentmodel, inklusive en fallback-model;
bridgen rapporterer `mixed`, når forskellige frames er produceret af
forskellige modeller. Et cache-hit genbruger denne producentidentitet i stedet
for at ommærke den som den ønskede routingplan. Hele videoresultatcachen
nøglebestemmes af alle input, der ændrer outputtet — prompt, effektiv model,
samplingpolitik, antal frames, semantisk analysetilstand, SHA-256-fingeraftrykket
af det normaliserede fokushint, fokusvindue, `transcript`,
`audioTranscript` og kontaktarkflaget — så ændring af enhver af disse
dimensioner altid giver et cache-miss og aldrig en genbrug af forældede data.
Versionen af den visuelle deduplikeringspolitik, tærsklen og det begrænsede
antal kandidatframes er også eksplicitte i resultatcache-nøglen og metadataene;
en politikændring kan derfor ikke genbruge en forældet helvideobeskrivelse.
Resultatcache-v4-metadata bevarer tilstanden og fingeraftrykket, aldrig den
rå brugeropgave. Guardrail-metadata rapporterer både den ønskede og den
effektive analysetilstand; en ønsket `focused`-tilstand uden brugbar
brugertekst rapporteres som effektivt `full`.

Guardrailen udtrækker alle understøttede videodele, men beskriver højst
`modalityBridgeVideoMaxVideos`. For et mål, der beviseligt har
`supportsVideo === false`, bliver fejlslagne videoer og videoer over grænsen
til eksplicitte sikre tekstmarkører, så ingen rå video overlever. Når
kapaciteten er ukendt, bevarer disse dele deres videobærer; enhver fallback-
transskription følger den ovenfor beskrevne begrænsede tekstkonvertering.
Mål med `supportsVideo === true` går uden om bridgen. Klientens
abortsignal for anmodningen videreføres gennem download, broker-kø,
underprocesser og tekstkald; aborter stopper mellem videoer og fejler aldrig
åbent tilbage til rå medier.

Runtime-indstillinger gemmes i databasen og valideres med Zod:

| Nøgle                               | Standard    | Område / adfærd                                                                                          |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri runtime, tilvælges eksplicit                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarer generiske tekster; `focused` bruger begrænset, upålidelig kontekst fra den seneste bruger |
| `modalityBridgeVideoModel`          | `""`        | Arver Vision Bridge-modellen                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proportional `segment_aware`; detektorsvigt falder tilbage til `uniform`  |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Ældre lagrede Video-timeoutværdier over 120 sekunder begrænses til
brokerens deadline; nye indstillingsskrivninger over denne grænse afvises.
`GET /api/modality-bridge/video/runtime` kræver betroet, stemplet
loopback-lokalitet før autentificering eller runtime-sondering og kræver
derefter administrationsautentificering. Den returnerer kun `available`,
sanerede FFmpeg-/ffprobe-versioner og en fast årsag, når runtime-miljøet ikke
er tilgængeligt. Det interne extraction-endpoint er ikke en offentlig
upload-API: kømætning returnerer `503` plus `Retry-After`, en afbrydelse fra
kalderen returnerer `499`, og den faste broker-deadline returnerer `504`.
Konverterede svar tilføjer
`video->text;model=<visionModel>;parts=<videos>` til den centrale
`x-omniroute-modality-bridge`-header uden at fjerne Vision- eller
Audio-segmenter.

### PII-maskering (`piiMasker.ts`)

Køres i **begge** stadier.

- **`preCall`** kloner payloaden, gennemgår `system`, `messages`, `input` og
  `prompt` (inklusive elementer, der er almindelige strenge) og anvender
  `processPII()` (fra `@/shared/utils/inputSanitizer`) på strengfelterne
  `content`/`text`. Når `PII_REDACTION_ENABLED=true`, redigeres registrerede
  PII-oplysninger i den udgående payload. Dette er uafhængigt af
  `INPUT_SANITIZER_MODE` (som kun styrer politikken for prompt-injection).
  Når redigering er slået fra, registrerer kaldet detekteringsantal uden at
  omskrive indholdet.
- **`postCall`** laver en dyb klon af svaret, kører
  `sanitizePIIResponse()` samt Responses-API-formmaskeringen
  (`maskResponsesOutput` — dækker `output_text` og
  `output[].content[].text`). Hvis der forekommer en redigering, erstatter det
  ændrede svar det oprindelige.

Guardrailen blokerer aldrig; den annoterer kun (`meta.detections`,
`meta.redacted`) eller omskriver.

**Reversibelt vault (`PII_REVERSIBLE_VAULT_ENABLED`, standard `false`).** Når både
`PII_REDACTION_ENABLED` og `PII_REVERSIBLE_VAULT_ENABLED` er aktiveret (DB-override >
env > standard, læses én gang pr. request), åbner `handleChat` ét vault pr.
klientrequest (`src/lib/pii/requestTokenVaultScope.ts`) og sender det videre til
pre-call-passet som `GuardrailContext.tokenVault`. Maskeren skriver derefter
surrogattokens som `<<PII_EMAIL_QWERTYUI_1>>` i stedet for `[EMAIL_REDACTED]` for
både indbyggede, validerede (GDPR/POPIA) og brugerdefinerede regler. Noncen består
af 8 tilfældige store bogstaver pr. request, og den samme værdi får det samme token
inden for requesten. Det er kun maskeren, der opretter tokens: prompt-injection-
guard'en og `/api/guardrails/test` kører uden et vault og beholder pladsholderne.

- Udbyderen, hvert combo-led, genforsøget, hvert medlem af fusionspanelet og
  fusionsdommeren ser kun tokens. Tokens gendannes én gang på det 2xx-svar, der
  forlader `handleChat`: pr. felt i den parsede SSE (et token, der er delt over
  flere events, løses stadig; tool-call-argumenter er JSON-escaped) eller pr. felt
  i en JSON-body, med en genberegnet `Content-Length`. Indhold og ræsonnementstekst
  samt tool-call-argumenter gendannes. Fejl-bodies (4xx/5xx) beholder tokens.
- Fejl forbliver private: hvis oprettelsen af tokens mislykkes, eller vaultet afviser
  en værdi (1000 poster, 256 tegn pr. værdi, 64 KB i alt), skrives pladsholderen i
  stedet; et token, som vaultet ikke kan løse, eller en gendannelse, der mislykkes,
  forbliver bogstaveligt, og kun et antal logges. Vaultet har ingen timere og ingen
  global tilstand; det ryddes, når response-streamen afsluttes, annulleres eller
  fejler.
- Når en request har oprettet tokens, springes memory extraction, idempotency-
  lagringen og begge semantic-cache-skrivninger over, fordi ingen senere request
  kan løse disse tokens. I call-logs indeholder provider-requesten og -svaret
  tokens; den loggede klientrequest-body er stadig det rå klientinput, som ved
  almindelig redaktion.
- Tokens bruger en tilfældig nonce pr. request, så prompt-præfikset ændres ved hver
  tur: caching af prompts på udbydersiden rammer ikke ved maskerede ture, og et
  token, der kommer tilbage i en senere tur (for eksempel via
  `previous_response_id`), tilhører en gammel request og forbliver bogstaveligt.

#### Valg pr. type, brugerdefinerede mønstre og detektionstællere

**Dashboard → Indstillinger → Sikkerhed → PII-maskering** vælger _hvad_ der
maskeres. Det aktiverer ikke maskering: det er stadig
`PII_REDACTION_ENABLED` (request) og `PII_RESPONSE_SANITIZATION` (response + SSE),
som begge er deaktiveret som standard.

- **Valg pr. type** — de indbyggede id'er er angivet i
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ikke angivet betyder
  alle typer (adfærden før denne indstilling fandtes). Request-motorens `ssn_us`-
  mønster knyttes til `ssn`. Skabelonerne (Minimal, Standard, Financial,
  Brazilian, USA, GDPR, POPIA, Full) udfylder kun afkrydsningsfelterne i
  brugerfladen.
- **GDPR- og POPIA-identifikatorer** — tolv indbyggede id'er, der dækker
  personidentifikatorer fra EU og Sydafrika (tabellen nedenfor). Deres regex'er,
  validatorer og jurisdiktionstags findes i én tabel,
  `src/shared/utils/piiPatterns.ts`, som både response-sanitizeren
  (`src/lib/piiSanitizer.ts`) og request-maskeren
  (`src/shared/utils/inputSanitizer.ts`) anvender. Et match redigeres kun, når
  dets validator accepterer det; en ubetinget række cifre er aldrig nok. En
  operatør, der gemte et begrænset valg, før disse id'er fandtes, beholder den
  hidtidige adfærd, indtil de nye id'er markeres.
- **Brugerdefinerede mønstre** — op til 20 regex- eller wildcard-mønstre (`*` =
  op til 64 tegn, der ikke er whitespace, `?` = ét tegn). Matches bliver til
  `[CUSTOM_REDACTED]`. Alle mønstre behandles af `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): højst 500 tegn, flag begrænset til
  `g i m s u`, skal kunne kompileres, skal bestå `safe-regex` (katastrofal
  backtracking) og må ikke matche en tom streng eller en redaktionspladsholder.
  Et mønster, der fejler, afvises ved lagring og test, og en gemt række, der fejler,
  springes over ved kørsel i stedet for at blive kompileret. Brugerdefinerede
  mønstre køres kun, når maskering er aktiveret.
- **Detektionstællere** — tællinger pr. type (aldrig de matchede værdier), opbevares
  i hukommelsen og nulstilles ved genstart (`src/lib/pii/piiDetectionStats.ts`).
  De øges kun, mens maskering er aktiveret.

Indstillingerne ligger i `key_value`-tabellen (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) og læses gennem en cache på 1 sekund. API:

| Metode | Sti                      | Formål                                                            |
| ------ | ------------------------ | ----------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flagtilstand, `enabledTypes`, `customPatterns`, detektionstællere |
| `PUT`  | `/api/settings/pii`      | Erstat `enabledTypes` (`null` = alle) og/eller `customPatterns`   |
| `POST` | `/api/settings/pii/test` | Tørkør ét mønster mod et eksempel på højst 8 KB; intet gemmes     |

Alle tre kræver management-godkendelse og validerer body'en med Zod
(`src/shared/validation/schemas/piiSettings.ts`). Når login er deaktiveret
(`requireLogin=false`), er `GET` og test-endpointet åbne, men `PUT` kræver stadig
en dashboardsession, en API-nøgle med `manage`-scope, et `oma_`-adgangstoken med
write-scope eller højere, CLI-tokenet eller et internt servicetoken sendt fra
loopback.

#### GDPR-identifikatorer (EU) og POPIA-identifikatorer (Sydafrika)

| Id                  | Identifier               | Validering                                                                                  |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | Kendt land, eksakt længde for det pågældende land, ISO 13616 MOD-97-10                      |
| `eu_vat`            | EU-momsnummer            | Kendt medlemsstatspræfiks og den pågældende stats nummerformat (intet VIES-opslag)          |
| `es_dni_nie`        | Spansk DNI / NIE         | Kontrolbogstav (værdi mod 23); NIE er `X/Y/Z` + 7 cifre                                     |
| `it_codice_fiscale` | Italiensk Codice Fiscale | Kontrolbogstav fra tabellerne for ulige/lige positioner                                     |
| `pl_pesel`          | Polsk PESEL              | Vægtet kontrolsum og en kodet fødselsdato, der findes                                       |
| `nl_bsn`            | Hollandsk BSN            | 11-test (vægte 9..2, -1)                                                                    |
| `de_steuer_id`      | Tysk Steuer-ID           | ISO 7064 Mod 11,10 samt reglerne for cifferstrukturen (intet indledende 0)                  |
| `se_personnummer`   | Svensk personnummer      | Luhn over de sidste ti cifre og en plausibel fødselsdato (10 eller 12 cifre)                |
| `za_id`             | Sydafrikansk ID-nummer   | Luhn over alle 13 cifre, gyldig fødselsmåned/-dag, borgerskabsciffer 0 eller 1              |
| `za_phone`          | Sydafrikansk telefon     | Præfiks `+27` / `27`, eller den nationale `0..`-form skrevet med mellemrum eller bindestreg |
| `za_vat`            | Sydafrikansk momsnummer  | 10 cifre, der begynder med `4` **og** "VAT" / "BTW" i de 48 forudgående tegn                |
| `za_tax_ref`        | Sydafrikansk skatteref.  | 10 cifre, der begynder med `0`-`3`, Luhn, **og** "tax" / "SARS" i de 48 forudgående tegn    |

Da de cifferbaserede formater kan kollidere med ordrenumre, build-numre og
tidsstempler, har de svageste (`za_vat`, `za_tax_ref`) brug for nøgleordssignalet,
og et ubetinget tocifret `0..`-nummer behandles ikke som et sydafrikansk telefonnummer.
IBAN'er med mellemrum (`GB29 NWBK ...`) matches ikke. På streaming-stien slås signalet
kun op i den aktuelle chunk. ID'erne står foran de generiske telefonmønstre, så en
valideret identifikator beholder sin egen pladsholder
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Skabelonerne
`gdpr` og `popia` vælger henholdsvis EU- og sydafrikanske ID'er. Maskering er fortsat
opt-in (Hard Rule #20): Intet her ændrer en standard for feature-flag.

### Promptinjektion (`promptInjection.ts`)

Registrerer modstridende strukturer i brugerleveret indhold og håndhæver den
konfigurerede politik. Adfærden styres af miljøvariabler og konstruktørindstillinger:

| Indstilling       | Env-var                                                                                                    | Standard | Effekt                                                                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Aktiveret         | `INPUT_SANITIZER_ENABLED`                                                                                  | `true`   | Når `false` er guardrail-funktionen kortsluttet.                                                                                                                                                                   |
| Tilstand          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                            | `warn`   | Injektionspolitik: `block`, `warn` eller `log`. (`redact` accepteres af hensyn til bagudkompatibilitet, men fjerner **ikke** injektionstekst; omskrivning af PII i anmodninger styres af `PII_REDACTION_ENABLED`.) |
| Blokeringstærskel | `blockThreshold`-indstilling / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Minimumsalvorlighed, der kræves for at blokere. Medium observeres kun med standardindstillingen.                                                                                                                   |

**Prioritet for tilstand** (`getMode`): kalderens `options.mode` →
`INJECTION_GUARD_MODE` **DB-funktionsflag-overstyring** (Dashboard → Indstillinger →
Funktionsflag) → `INJECTION_GUARD_MODE`-env → `INPUT_SANITIZER_MODE`-env →
`warn`. En overstyring fra dashboardet vinder derfor over env-variablerne, så
brugerfladen Funktionsflag styrer den kørende guard live (ingen genstart). DB-læsningen
er fejlsikker: Hvis den fejler, falder guarden tilbage til den env-baserede adfærd,
og når der ikke er angivet nogen overstyring, er adfærden identisk med env-only-opløsningen.

Detektionskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (det samme delte detektorsæt,
   der bruges andre steder i pipelinen).
2. Indbyggede `DEFAULT_GUARD_PATTERNS` (aktuelt `system_override_inline` og
   `markdown_system_block`, begge med alvorligheden `high`).
3. Valgfrie `customPatterns`, der sendes via konstruktørindstillingerne (strenge, regex
   eller `{ name, pattern, severity }`-poster).

Når `mode === "block"` **og** mindst én registrering opfylder alvorlighedstærsklen,
returnerer `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I tilstandene `warn`/`log` logger guardrail-funktionen,
men tillader kaldet. Den delte hjælpefunktion `evaluatePromptInjection()` eksporteres også
til kaldere, der har brug for at evaluere prompts uden at gå gennem registreringsdatabasen.

**Scanningsgrænse (v3.8.20):** Detektoren inspicerer kun de **første 16 KB** af
den sammenkædede prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` udfører `slice(0, MAX_INJECTION_SCAN_BYTES)`, før
mønsterløkken køres. Injektionsdirektiver placeres nær toppen af et input, så
dette begrænser regex-CPU/GCA-forbruget på payloads på flere hundrede KB uden at
svække detekteringen (jf.
#3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Køres i **begge** trin, sidst i standardkæden (prioritet `95`). Redigerer
velkendte API-nøgle-/hemmelig-token-mønstre i den udgående payload
(meddelelsernes indhold, argumenter til tool-kald, tool-resultater) **og**
udbydersvaret, så en legitimationsoplysning, der indsættes i en prompt (eller
returneres af et tool-resultat), ikke lækkes til upstream-udbyderen eller tilbage
til klienten.

- **Kun opt-in**, samme konvention som PII-redigering (relateret til Hard Rule #20):
  deaktiveret, medmindre `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er deaktiveret, er sikkerhedsreglen
  en no-op — den blokerer aldrig og omskriver aldrig.
- `redactCredentials()` gennemgår hele payload-/svartræet (`walkValue()`)
  på en måde, der er sikker mod prototypeforurening og cyklussikker via `WeakSet`,
  og erstatter match med en `[REDACTED:<type>]`-pladsholder, idet kun de grene,
  der faktisk blev ændret, klones.
- `CREDENTIAL_PATTERNS` dækker nøgler fra LLM-udbydere (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøgler (Stripe, Square),
  cloud-nøgler (AWS access key, Twilio, SendGrid, Mailgun), private nøgler /
  JWT'er, forbindelsesstrenge med legitimationsoplysninger
  (`mongodb://user:pass@...`, osv.) samt et generisk mønster for
  headerværdier med `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Headerlignende nøgler (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redigeres strukturelt (kun værdien, mens skemapræfikset som
  `Bearer `/`Basic ` bevares) i stedet for via den generiske tekstregex.
- Sikkerhedsreglen blokerer aldrig; den omskriver kun (`modifiedPayload` /
  `modifiedResponse`) og tilføjer metadata (`meta.credentialsRedacted`, `meta.count`).

Regressionssikring: `tests/unit/credential-masker-guardrail.test.ts`.

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

For hver anmodning, der går gennem `src/sse/handlers/chat.ts` og
`open-sse/handlers/chatCore.ts` (chat-familieruterne, der er angivet under
[Dækning og begrænsninger](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` opbygger listen over deaktiverede ud fra API-nøgle, brødtekst
   og headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kører guardrails i stigende prioritetsrækkefølge:
   - Deaktiverede guardrails registreres som `skipped`.
   - Hver guardrails `preCall` kan omskrive payloaden via `modifiedPayload`.
   - Den første `block: true` afbryder kæden, og handleren returnerer et guardrail-afvisningssvar.
3. Den (potentielt omskrevne) payload sendes videre til combo-routing og upstream-dispatch.
4. **Kun ved ikke-streaming:** Når svaret er samlet, kører
   `guardrailRegistry.runPostCallHooks(...)` den samme kæde på svaret. `block: true` her kasserer upstream-svaret og returnerer HTTP 400. Streamede svar springer helt over dette trin.
5. **Kun ved reversibel vault:** Når anmodningen har genereret tokens, gendanner `handleChat`
   dem i det 2xx-svar, som den returnerer, efter post-call-hooks og streaming-PII-transformationen, så
   `PII_RESPONSE_SANITIZATION` ser tokens og modelgenereret PII, aldrig en gendannet original.

Guardrails, der kaster en fejl, registreres med `error: <message>` og logges via
`logger.warn`, men kæden fortsætter — fail-open er tilsigtet.

## Dækning og begrænsninger

Guardrail-registret er kun koblet til chat-pipelinen. Disse begrænsninger
er fastlåst af `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` og
`tests/unit/guardrail-pipeline-characterization.test.ts`; opdatér disse tests
bevidst, når adfærden ændres.

### Hvor hooks kører

| Hook / kontrol                           | Kører på                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                        | Anmodninger, der håndteres af `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (og `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` og Telegram-chatproxyen. Også dashboardets test-endpoint `/api/guardrails/test`. En blokering før kald returnerer HTTP 400. |
| `runPostCallHooks`                       | **Kun ikke-streamende chat-svar** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamede svar når aldrig frem til den.                                                                                                                                                                                                                                                                                                        |
| Streaming-PII                            | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), koblet ind i `streamingPipeline.ts`, når `PII_RESPONSE_SANITIZATION` er slået til. Det er ikke en guardrail, så deaktiveringskanalerne påvirker det ikke.                                                                                                                                                                                                                  |
| Reversibel PII-hvælving                  | Anmodninger, der håndteres af `handleChat`, kun når `PII_REDACTION_ENABLED` og `PII_REVERSIBLE_VAULT_ENABLED` er slået til. Tokens oprettes af `pii-masker` før kaldet og gendannes, når `handleChat` afsluttes (`src/lib/pii/requestTokenVaultScope.ts`). Deaktivering af `pii-masker` for en anmodning betyder, at der ikke oprettes noget.                                                                                            |
| Middleware til injektionskontrol (ældre) | Alle `/v1`-ruter, der indeholder prompts, inklusive chatfamilien (se [rutedækning](#injection-guard-route-coverage--red-team-phase-8--block-d)). Kun prompt-injektion.                                                                                                                                                                                                                                                                   |

### Hvad der ikke er dækket

- **Medier, embeddings og dataruter** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) når aldrig frem til registret. Ingen
  PII-maskering, legitimationsmaskering eller modalitetsbro kører der. Deres
  eneste kontrol er den ældre middleware til injektionskontrol.
- **Streamede svar** får ingen guardrails efter kaldet: ingen `pii-masker` eller
  `credential-masker` efter kaldet og ingen blokering efter kaldet. Kun PII-transformeringen
  for streaming anvendes (når `PII_RESPONSE_SANITIZATION` er slået til). En
  legitimationsoplysning, der gentages i et streamet svar, redigeres ikke.
- **Deaktiveringskanaler kontra middleware (med vilje):** Middlewaren evaluerer
  prompt-injektion med sit eget kald til `evaluatePromptInjection()` uden at
  videregive nogen deaktiveringsliste, som kalderen kontrollerer. Tilstanden
  `block` er en obligatorisk grænse, som deaktiveringer styret af kalderen ikke kan
  omgå, heller ikke på chatfamilieruter
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Deaktivering af
  `prompt-injection` springer kun registry-guardrailen over.

### Hvad der ser et svar før kaldet efterfølgende

På den ikke-streamende sti er rækkefølgen: hukommelsesudtrækning → indbygget værktøjs-
udførelse → guardrails efter kaldet → afslutning ved blokering efter kaldet →
lagring i semantisk cache.

- **Hukommelsesudtrækning** og **værktøjsudførelse** ser svaret, før guardrails
  efter kaldet kan omskrive eller blokere det. Siden
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) kører
  hukommelsesudtrækningen den udtrukne tekst gennem `sanitizePII`, når
  `PII_RESPONSE_SANITIZATION` er slået til (både ved streaming og uden streaming),
  men et svar, som senere blokeres efter kaldet, er stadig blevet tilbudt til
  hukommelse og værktøjer.
- **Den semantiske cache** gemmer svaret efter kaldet, så den gemmer det
  omskrevne svar, og et blokeret svar caches aldrig. Cacheposter er knyttet til
  hver API-nøgle.

## Konfiguration

Miljøvariabler, der læses af de indbyggede sikkerhedsforanstaltninger:

| Variabel                              | Anvendes af                | Effekt                                                                                                      |
| ------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Sæt til `false` for helt at deaktivere detektering.                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injektionspolitik: `warn`, `block` eller `log`. Den ældre værdi `redact` omskriver ikke injektionstekst.    |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Tilstand for injektionssikringen; også et DB-featureflag, der **tilsidesætter** env-variablerne (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minimumsalvorlighed, som `MODE=block` afviser: `high` (standard), `medium` eller `low`.                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Ældre alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                          |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Når den er `true`, maskeres PII i anmodninger (uafhængigt af injektionstilstanden).                         |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Sammen med `PII_REDACTION_ENABLED` oprettes reversible tokens, som gendannes i 2xx-svar.                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Styrer maskerens adfærd på svarssiden.                                                                      |

Modality Bridge-sikkerhedsforanstaltningerne læser runtime-konfiguration fra den DB-baserede indstillingslagring
(`getSettings()`), ikke fra env-variabler. Visions primære nøgler er
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og
`modalityBridgeCacheMaxEntries`. De ældre
`visionBridge*`-nøgler accepteres kun som den dokumenterede fallback ved læsning i én cyklus;
skrivehandlinger fra dashboardet bruger de primære nøgler. Standardværdierne og fallback-resolveren findes i
`src/shared/constants/modalityBridgeDefaults.ts`, mens ældre
konstanter bevares i `src/shared/constants/visionBridgeDefaults.ts`.

Audio bruger `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips` samt de delte
`modalityBridgeCache*`-indstillinger. Audio har ingen fallback for ældre nøgler, fordi disse nøgler blev introduceret med Modality Bridge-skemaet.

Video bruger `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` og
`modalityBridgeVideoTimeout` samt de delte `modalityBridgeCache*`-indstillinger.
Den er deaktiveret som standard, fordi FFmpeg/ffprobe er valgfrie driftsafhængigheder, og billedtekster til frames øger latenstiden og modelomkostningen.

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
