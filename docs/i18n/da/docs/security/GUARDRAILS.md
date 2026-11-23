# Guardrails (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sandhedskilde:** `src/lib/guardrails/`
> **Senest opdateret:** 2026-08-29 — v3.8.51 (herkomsten af Video Bridge-transskriptioner deklareres af kalderen,
> men er endnu ikke verificeret af serveren — præciseret i henhold til #11661)

Guardrails håndhæver sikkerhed, politikker og indholdstransformationer ved grænsen
mellem OmniRoute og upstream-udbydere. Hver guardrail kan inspicere (og
eventuelt afvise, transformere eller annotere) request-payloads (`preCall`) og
upstream-svar (`postCall`).

Systemet er **fail-open**: Hvis en guardrail kaster en fejl under kørsel, registrerer
registreringsdatabasen fejlen og fortsætter med den næste guardrail i stedet for at lade
requesten fejle. Blokering er en eksplicit beslutning (`block: true`), aldrig et uheld.

## Indbyggede sikkerhedsforanstaltninger

Registreringsdatabasen indlæser automatisk seks sikkerhedsforanstaltninger i prioriteret rækkefølge ved import
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

### Vision Bridge (`visionBridge.ts`) — Modalitetsbro PR-1

Opfanger forespørgsler med billeder, der er rettet mod **modeller uden billedforståelse**, og
omdirigerer enten hele forespørgslen til en model med billedforståelse eller erstatter billeddelene
med tekstbeskrivelser, som genereres af en konfigurerbar billedforståelsesmodel, før
upstream-kaldet. Dette gør det muligt for udbydere, der kun understøtter tekst, at håndtere
multimodale payloads transparent.

Forløb:

1. Spring over, hvis målmodellen allerede understøtter billedforståelse (medmindre den findes på
   listen over modeller, der er tvunget til at bruge broen, `isVisionBridgeForcedModel`).
2. Udtræk billeddele via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som uddelegerer til den **samlede mediedetektor**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den
   eneste sandhedskilde, som deles med kombinationskompatibilitetsfilteret.
   Udtrækning er begrænset til en positivliste over dele på øverste niveau med de former,
   som `replaceImageParts` kan indsætte igen (udtræk↔erstat-kontrakten): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic-URL
   `source.type:"url"` og Responses API `input_image`. Indlejrede fund og
   former, der kun fungerer som indikatorer, er materiale til kombinationsfilteret og udtrækkes aldrig.
   Spring over, hvis ingen findes.
3. Find kørselskonfigurationen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nye `modalityBridge*`-
   indstillingsnøgler har forrang; ældre `visionBridge*`-nøgler forbliver en **fallback i én cyklus**
   (tilbageførselsvindue). Spring over før enhver gennemgang af medier, når
   broen er deaktiveret.
4. Tilstandsvælgeren (`modalityBridgeVisionMode`, se tabellen nedenfor) afgør,
   om der skal omdirigeres eller beskrives. Omdirigering returnerer `modifiedPayload`, hvor kun `model`
   er udskiftet, samt metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsesforløb: Begræns billeder til `maxImages`, sammensæt den opgavebevidste prompt,
   slå op i beskrivelsescachen, kald billedforståelsesmodellen **parallelt**
   (`Promise.allSettled`), og indsæt tekstdele af typen `[Image N]: <description>` i
   deres sted. En mislykket beskrivelse giver `null`, og den oprindelige billeddel
   **bevares** (#4012) — undtagen i kombinationsbeskrivelsesforløbet, når alle
   beskrivelser mislykkedes, hvor en bekræftet upstream uden billedforståelse får en
   `(unavailable — no vision-capable provider connected)`-stub i stedet (#8430).
6. Returner `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilstandsvælger (`modalityBridgeVisionMode`)

| Tilstand   | Standard | Adfærd                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Ældre heuristik, uændret (#6640/#7204): Modeller, der ikke er kombinationsmodeller/`auto/`-modeller, omdirigeres til den bedste billedforståelsesmodel, medmindre den oprindelige model allerede har brugbare legitimationsoplysninger (så beskrives der); kombinationsmål beskrives altid.                                                                   |
| `describe` |          | Beskriv altid — omdirigeringsblokken springes helt over; brugerens valgte model svarer altid.                                                                                                                                                                                                                                                                 |
| `reroute`  |          | Gennemtving omdirigering: Kontrollen, der beholder en model med legitimationsoplysninger, omgås. Kontrollen af legitimationsoplysninger for omdirigerings-**målet** gælder stadig — når der ikke findes et brugbart billedforståelsesmål, fortsætter forespørgslen til beskrivelse, så rå billeder aldrig når en backend, der kun understøtter tekst (#8430). |

Tvungne tilstande kortslutter **før** autoheuristikken kører; `auto`-adfærden
er byte-identisk med sikkerhedsforanstaltningen fra før PR-1.

#### API-nøglens omfang (`visionBridgeKeyScope.ts`)

Når kalderens API-nøgle begrænser `allowedConnections`, kvotepuljer
(`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), vælger broen kun
omdirigerings- og beskrivelsesmodeller, som nøglen må bruge, på forbindelser, som nøglen må
bruge. Beskrivelseskaldet går derefter altid gennem OmniRoute-selvsløjfen med
`x-omniroute-self-loop-key-id`-headeren, så den modtagende chatforespørgsel
håndhæver nøglens forbindelses- og modelpolitik igen. `enforceApiKeyPolicy()`
respekterer kun denne header sammen med selvsløjfens bearer-token, så den kan kun
indsnævre adgangen, og et id, der ikke kan slås op, afvises.

Hvis ingen billedforståelsesmodel er tilladt for nøglen, træder beskrivelsesforløbet til side, og
forespørgslen fortsætter uændret, hvilket er den samme fail-open-adfærd som ved en deaktiveret
sikkerhedsforanstaltning (metadata `{ skipped: true, reason: "no_permitted_vision_model" }`).
Forespørgsler uden en nøgle og nøgler uden disse begrænsninger opfører sig præcis som
før.

#### Opgavebevidst beskrivelsesprompt (`modalityBridgeVisionTaskAware`)

Standardværdien er **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) føjer
teksten fra den **seneste brugermeddelelse** (afkortet til 500 tegn) til den
grundlæggende beskrivelsesprompt, så beskrivelsen styres mod det, brugeren faktisk
spurgte om (codex-vision-proxy-mønsteret), og beder visionmodellen om at transskribere
synlig tekst. Når flaget er slået fra — eller der ikke er nogen brugertekst — bruges
grundprompten uændret.

Describe-selvløkkens egen OpenAI-kompatible anmodning (`callVisionModelSingle()`
i `visionBridgeHelpers.ts`) anmoder altid om `image_url.detail: "high"` —
ubetinget for alle kaldere/udbydere og ikke afhængigt af noget klientsignal.
Sampling med lav detaljegrad forringer OCR-nøjagtigheden for netop den
teksttransskriptionsopgave, som denne prompt anmoder om, så selve describe-kaldet
anmoder altid om høj detaljegrad, uanset hvilket detaljeniveau den oprindelige
indgående anmodning brugte. Dette påvirker kun den interne describe-anmodnings
body; det ændrer ikke, hvordan OmniRoute videresender kalderens egen
`image_url.detail` i den primære anmodning — denne standard anvendes separat og
kun for registrerede OpenCode-klienter i `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic-wireformatgrenen i
describe-selvløkken har intet `detail`-felt og påvirkes ikke af nogen af
standarderne.

#### Loft for describe-output (`modalityBridgeVisionMaxChars`)

| Nøgle                          | Standard | Interval            |
| ------------------------------ | -------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` eller 100–50000 |

`0` (standard) betyder **intet loft** — beskrivelsen, der returneres af
`callVisionModel()`, sendes videre uændret, så den eksisterende adfærd
bevares. Enhver værdi i intervallet 100–50000 afkorter beskrivelsen med et
`…`-suffiks, før den indsættes igen som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Hæv denne værdi for detaljetunge OCR-opgaver, hvor downstream-modellen har brug
for den fulde transskription; sænk den for at begrænse tokenforbruget for
snakkesalige visionmodeller. Dashboardfeltet findes i panelet Advanced på fanen
Vision (`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) og hæver
enhver værdi mellem 1 og 99 til minimumsværdien 100, mens en eksplicit `0`
forbliver uændret — `0` er i sig selv en gyldig Zod-værdi
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke blot
standardværdien for "ikke angivet".

#### Describe-cache (`modalityBridge/bridgeCache.ts`)

LRU- og TTL-cache i hukommelsen til describe-output, delt på tværs af hele
processen. Nøgle = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med
længdepræfiksrammer (ingen kollisioner mellem feltgrænser). Modelkomponenten er
den **konfigurerede** bridge-model, ikke den model, der faktisk svarede —
`callVisionModel` kan internt falde tilbage til en anden model, og nøgler pr.
forsøg ville fragmentere cachen. Mislykkede describe-kald caches aldrig.
Indstillinger:

| Nøgle                           | Standard | Interval |
| ------------------------------- | -------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`   | —        |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000  |

#### Normalisering af eksterne billeder (describe-selvløkke/base64-hentning)

Når bridgen selv henter et **eksternt** billede — Anthropics describe-selvkald
og base64-konverteringen til claude-wireformat
(`ensureBase64ImagesForClaudeWire`), begge via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — sendes den resulterende
data-URI gennem `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`), før den indlejres i anmodningen til
visionmodellen. For store billeder nedskaleres til en **lang kant på 2048px**
(svarende til den størrelsesgrænse, som OpenAI/Anthropic allerede anvender på
serversiden), hvilket reducerer uploadmængde og latenstid uden at ændre det,
visionmodellen ser. Størrelsesændringen bruger `sharp`, som indlæses via
dynamisk import: På en platform, hvor dens native binære fil ikke kan indlæses,
kaster `normalizeDataUri()` **aldrig en fejl** — den falder tilbage til at sende
de oprindelige bytes uændret videre, så describe-/base64-konverteringsforløbet
altid fortsætter med at fungere. Bytes, der ikke repræsenterer et billede (en
hentning, som ikke returnerede et afkodeligt billede), sendes også uændret
videre. Denne normalisering er begrænset til billeder, som bridgen henter til
sit eget selvkald — den anvendes aldrig på kalderens rå passthrough-payload,
i overensstemmelse med princippet om, at mutation kun må ske efter aktivt
tilvalg (Hard Rule #20).

#### Indstillingsskema + migrering

De nye `modalityBridge*`-nøgler Zod-valideres i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, de tre `modalityBridgeCache*`-nøgler og
`modalityBridgeAudio*`-gruppen, der bruges af Audio Bridge. Migreringen
`141_modality_bridge_settings.sql` kopierer eksisterende ældre
`visionBridge*`-værdier til de tilsvarende nye nøgler (idempotent og overskriver
aldrig en `modalityBridge*`-værdi, der er angivet af en operatør); de ældre
nøgler accepteres fortsat som fallback ved læsning i én udgivelsescyklus.

#### Transparensheader + statistik

Describe-transformerede svar indeholder
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(oprettet af `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`
og tilføjet af `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omdirigerede anmodninger får **ingen** header — payloaden blev ikke ændret, og
modelskiftet er allerede synligt i svarbodyens `model`-felt.

`GET /api/modality-bridge/stats` (management-godkendelse, samme niveau som
`GET /api/settings`) returnerer de per-modalitetstællere, der opbevares i hukommelsen,
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og
`video`. `averageLatencyMs` bruger `latencySamples`, ikke alle forsøg, som
sin nævner; en handling uden tidsmåling opretter ikke kunstigt en prøve på nul
millisekunder. `bridged` forbliver det bagudkompatible alias for gennemførte
konverteringer; mislykkede forsøg øger det ikke.
Tællerne nulstilles som tilsigtet, når processen genstartes
(telemetri, ikke bogføring).

#### Konfiguration af dashboard

Den dedikerede dashboardside er
`/dashboard/settings/modality-bridge`. Dens URL-adresserbare faner `Vision`, `Audio`
og `Video` bevarer forespørgselsparametre, når der skiftes `tab`-værdi.
Fanen Vision giver adgang til aktivering, tilstand, modelvalg (inklusive den automatiske
standard), opgavebevidste prompts, avancerede grænser for timeout/billede/beskrivelseslængde/cache,
kørselstællere og en beskyttet eksempelanmodning. Fanen Audio er også aktiv: Den giver
adgang til aktivering, en modelvælger kun til STT med Auto, grænser for timeout/maksimal
kliplængde, lydtællere og en `input_audio`-eksempeltest. Fanen Video fungerer: Den viser
kørselstilstanden for FFmpeg/ffprobe — én af fire eksplicitte UI-tilstande (`unknown`, mens
kontrollen kører eller ikke kunne fuldføres, `restricted` på en dashboardvært, der ikke er
loopback, hvor kontrollen springes over på klientsiden, `unavailable`, når kontrollen er
udført, og manglende tilgængelighed er bekræftet, eller `available` med versionerne af
FFmpeg/ffprobe) — gemmer grænser for aktivering/model/frames/video/timeout, filtrerer
modelvælgeren til modeller med vision-understøttelse og viser videotællere.

Det tidligere Vision Bridge-kort under AI-indstillinger er et kompatibilitetslink til den
nye side; det indeholder ikke længere en ekstra kopi af formularen. Media Providers linker
også arbejdsgangene Image-to-Text og Speech-to-Text til de tilsvarende Modality
Bridge-faner uden at fjerne den eksisterende Speech-to-Text-sandkasse.

**Omgåelse af adgangskontrol ved self-loop:** Når describe-kaldet dirigeres gennem OmniRoutes
eget `/v1`-self-loop (ikke-standardiseret udbydermodel), sender underanmodningen
`x-omniroute-admission-bypass: internal` og godkendes med den fundne
self-loop-legitimationsoplysning — den lokale `sk_omniroute`-markør i lokal tilstand eller
den operatørkonfigurerede miljønøgle `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), så
installationer med `REQUIRE_API_KEY=true` stadig kan udføre describe-kaldet. Omgåelsen
accepteres kun for netop disse legitimationsoplysninger, så eksterne klienter ikke kan bruge
headeren til at springe adgangskontrollen over.

Ældre standardværdier findes i `src/shared/constants/visionBridgeDefaults.ts`; de
nye standardværdier for tilstand/opgavebevidsthed/cache og indstillingsresolveren findes i
`src/shared/constants/modalityBridgeDefaults.ts`. Sikkerhedsmekanismen stiller en
`deps`-konstruktørindstilling til rådighed, så tests kan injicere falske implementeringer af
`getSettings` og `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Opsnapper chatanmodninger med lyd, før de når et mål, der ikke vides at acceptere
lydinput. Den omdirigerer aldrig chatanmodningen: Lyddele transskriberes gennem det
eksisterende OpenAI-kompatible multipart-slutpunkt, og den valgte chatmodel fortsætter
med teksttransskriptioner.

Forløb:

1. Find `supportsAudio` gennem `getResolvedModelCapabilities()`. Eksplicitte
   metadata fra udbyderregistret har forrang, efterfulgt af statiske modelmetadata og
   derefter synkroniserede `modalities_input`. En deklareret inputliste uden `audio`
   er `false`; hvis der ikke findes dokumentation for egenskaben, forbliver værdien
   `null`. Både `false` og `null` aktiverer den konservative bridge, mens `true`
   går uden om den.
2. Find `modalityBridgeAudio*`-indstillingerne, og udtræk splejsbare lyddele på
   topniveau fra hver besked gennem den delte `detectMediaParts()`-detektor.
   Understøttede wire-formater er OpenAI `input_audio`, `audio_url` og
   `source.media_type: "audio/*"`. Indlejret lyd registreres med henblik på routing,
   men fjernes ikke af splejsningsforløbet. Arbejdsmængden begrænses af
   `modalityBridgeAudioMaxClips`; efterfølgende dele forbliver urørte.
3. Respekter en konfigureret `provider/model`, eller lad
   `selectAudioBridgeModel()` gennemgå `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil
   katalogrækkefølge og vælge den første model med brugbare, aktive
   udbyderlegitimationsoplysninger.
4. `callAudioTranscription()` konverterer base64/data-URI-lyd til en multipart-
   `file` eller downloader en ekstern `audio_url` gennem den udgående
   beskyttelsesmekanisme, der kun tillader offentlige adresser, med DNS-pinning og en
   grænse på 25 MB. Derefter POSTer den filen og den valgte model til det lokale
   `/v1/audio/transcriptions`-self-loop, godkendt med `resolveSelfLoopBearer()`.
   Den eksisterende transskriptionsrute udfører normal opslag af
   legitimationsoplysninger, håndtering af cooldown/rate limits og videresendelse
   til udbyderen.
5. Gennemførte kald erstatter deres dele med `[Audio N]: <transcript>`. Kaldene
   udføres med `Promise.allSettled`: En individuel fejl bevarer den oprindelige
   lyddel (#4012-kontrakten). Hvis alle kald mislykkes, og målet beviseligt har
   `supportsAudio === false`, bliver delene til
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakten). For
   et ukendt mål (`null`) forbliver resultatet urørt, hvis alle kald mislykkes. Et
   mål, der beviseligt kun understøtter tekst og ikke har brugbare
   STT-legitimationsoplysninger, modtager den samme eksplicitte pladsholder uden
   at foretage et netværkskald.

Gennemførte transskriptioner bruger Modality Bridges procesomfattende LRU/TTL-cache.
Nøglen kombinerer lydreferencen, den stabile `audio-transcription`-handlingsetiket
og den valgte STT-model; fejl cachelagres aldrig. Lydforsøg opdaterer de delte
`bridged`-, `cacheHits`-, `failures`- og `lastUsedAt`-tællere.
Transformerede svar indeholder
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; urørte
anmodninger modtager ikke et Audio Bridge-segment.

Kørselsindstillingerne er DB-understøttede og Zod-validerede:

| Nøgle                         | Standardværdi | Interval          |
| ----------------------------- | ------------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —                 |
| `modalityBridgeAudioModel`    | `""`          | Auto eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10              |

Den delte cache styres fortsat af `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Videobro (`videoBridge.ts`, `videoBridgePipeline.ts`)

Opfanger videodele på øverste niveau i Chat Completions-`messages` og Responses
API-`input`, før et mål uden kendt indbygget videounderstøttelse kaldes.
Understøttede formater er `input_video`, `video_url`, `video_source`, HTTPS-URL'er
og `data:video/*;base64,...`-data-URI'er. Almindelige filnavne i tekst behandles
ikke som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) håndterer gennemgang af anmodningen,
kontrol af funktionalitet/politik, aggregering pr. anmodning og svarpayloaden.
Arbejdet pr. video — indhentning, cachen for hele resultatet, beskrivelse af en
billedsekvens (som kombinerer en eventuel lydtransskription angivet af kalderen)
samt målinger/afbrydelse/oprydning pr. forsøg — er skjult bag `processVideoPart` i
`videoBridgePipeline.ts`, som kaldes én gang pr. videodel inde i `preCall`'s løkke.
Dette modul definerer også de eksplicitte portgrænser `VideoMediaBrokerPort`
(indhentning af bytes og udtrækning af samplede billeder), `VideoAudioTranscriptionPort`
(kombination af en lydtransskription angivet af kalderen med de samplede billedtekster)
og `VideoDrilldownPort` (persistensgrænsen for billeddetaljering; endnu ikke forbundet
med `processVideoPart` — i dag er det kun den separate
`/api/modality-bridge/video/drilldown`-rute, der skriver detaljeringselementer).

Den offentlige `/v1`-anmodningssti importerer eller starter aldrig en underproces.
Fjernvideoer downloades med en grænse på 50 MiB; indlejrede base64-videoer har en
konservativ grænse på 36 MiB for afkodet data pr. video, så indpakningen for
model/meddelelser/rammer kan holdes inden for den offentlige grænse på 50 MiB for
godkendelse af JSON-anmodninger. Indlejret længde og estimater af afkodet størrelse
kontrolleres før allokering. HTTPS kræves for den oprindelige fjern-URL og hver
omdirigering ved hjælp af den eksisterende udgående beskyttelse, der kun tillader
offentlige adresser og anvender DNS-fastlåsning. Bytene krydser derefter præcis den
interne brokergrænse `POST /api/modality-bridge/video/extract`. Denne rute er både
`LOCAL_ONLY` og `SPAWN_CAPABLE`, accepterer kun en procesinternt godkendt anmodning
fra en betroet loopback-adresse og accepterer aldrig en URL, filsystemsti, eksekverbar
fil eller argumentliste. API'ets pipeline for grænser på request-body-størrelse og
handlerens inkrementelle body-læser håndhæver uafhængigt en inputgrænse på 50 MiB
for brokeren. Dens begrænsede kø kører én udtrækning ad gangen, tillader fire
ventende jobs og begrænser ventende input til 100 MiB.

Inde i brokeren læser `ffprobe` en privat lokal fil; den faste liste over tilladte
formater udelukker playliste- og manifestformater. For tilladte containere i
MOV-familien er eksterne MOV-datareferencer fortsat deaktiveret som standard, og
den faste kommando aktiverer dem ikke. Både `ffprobe` og `ffmpeg` bruger en
protokol-tilladelsesliste, der kun indeholder `file`, én tråd, faste argumentarrays,
ingen shell og eksekverbare filer fundet via `PATH`. Coverstreams med vedhæftede
billeder er ikke afspilningskandidater. Alle afspilbare streams skal overholde
grænserne, og en eksplicit standardstream foretrækkes før det deterministiske
tilbagefald til det laveste indeks. Videoer er begrænset til 600 sekunder,
8.192 pixels pr. dimension og 33.554.432 kildepixels. FFmpeg sampler 1–16
JPEG-billeder ved midtpunkter, nedskalerer den lange kant til højst 1.024 pixels
uden at opskalere mindre input og modtager aldrig en URL. Sampling er som standard
`uniform`. De valgfrie politikker `scene_aware` og den eksperimentelle
`segment_aware` udfører én yderligere fast FFmpeg-gennemgang af den allerede
validerede lokale stream, vælger et begrænset antal `showinfo`-scenetidsstempler
og falder deterministisk tilbage til de samme ensartede midtpunkter ved
detektorfejl, timeout, forkert formateret output eller et tomt kandidatsæt.
Segmentbevidst tilstand fordeler midtpunktssamples proportionalt mellem de
validerede sceneintervaller; evidens og fallback-adfærd for segmentbevidst tilstand
beskrives nedenfor. Den faste grænse på 16 billeder anvendes efter udvælgelsen i
alle politikker. Når en scenebevidst anmodning kun har et budget på ét billede,
bruger den det ensartede midtpunkt i det aktive fulde video- eller fokusvindue og
rapporterer `policyEffective: uniform`: Et enkelt udvalgt scenebillede kan ikke
bevare begge tidsmæssige ender. En kalder kan valgfrit angive et endeligt
fokusvindue (`start`/`end` i sekunder); grænser begrænses til mediets varighed,
omvendte eller ikke-endelige vinduer afvises, og alle samplingpolitikker udføres
kun inden for det normaliserede interval. Det resulterende vindue inkluderes i
samplingmetadataene og i det upålidelige beskrivelsespræfiks, så efterfølgende
modeller kan skelne et fokuseret uddrag fra hele tidslinjen.

Semantisk fokus for billedtekster er en separat, eksplicit indstilling. Standardtilstanden
`full` til analyse bevarer den eksisterende prompt til billedbeskrivelse og videresender
aldrig anmodningstekst til billedtekstmodellen. I tilstanden `focused` læser broen kun
den seneste ikke-tomme, brugerforfattede `text`/`input_text` fra den samme Chat- eller
Responses-container, normaliserer den til NFC, reducerer kontroltegn og blanktegn og
begrænser den til 500 Unicode-kodepunkter. Et tomt resultat falder tilbage til den
præcise `full`-prompt. Et anvendeligt hint serialiseres som JSON i en dedikeret blok
med upålidelig brugerkontekst og må kun prioritere observerbare detaljer; det kan ikke
tilsidesætte den separate advarsel mod at følge instruktioner, der er synlige eller
hørbare i mediet. Tekstuelt fokus udleder aldrig `start`/`end` og ændrer ikke den
tidsmæssige sampler.

#### FU-07 strukturel segmentevidens

`segment_aware` bruger én afgrænset foranalysepassage over den allerede validerede
lokale videostrøm. Den faste filterkæde skalerer først til højst 320 pixels
i bredden, registrerer sceneskift og frosne intervaller og sampler derefter med 1 billede pr.
sekund for sløring, gennemsnitlig luminans og rumlig/temporal information. Passagen er
begrænset til 600 strukturelle samples, én FFmpeg-/filtertråd, de samme
tilladelseslister for protokollen kun `file` og containere, en grænse på 1 MiB for procesoutput
og højst 30 sekunder inden for brokerens fælles afbrydelse/deadline. Den
accepterer aldrig en kommando, et filter, en sti eller en URL fra anmodningen.

De strukturelle værdier er deterministisk samplingsevidens, ikke semantisk
videoforståelse. De udleder ikke motiver, handlinger, undertekster, tale eller brugerens
hensigt. Scene- og frysegrænser danner segmenter; frysedækning, sløring,
eksponering, rumlige detaljer og tidsmæssige ændringer påvirker kun, hvordan det eksisterende
budget på 1–16 billeder fordeles. Et fuldstændigt frosset segment begrænses til ét billede,
mens ikke-frosne segmenter konkurrerer om det resterende budget. Når antallet af grænser
overstiger antallet af billeder, bevares en ensartet dækning af tidslinjen, så hurtige klip
tidligt i videoen ikke kan skjule et langt afsluttende segment. Scenegrænser, der ligger inden for
foranalysens opløsning på 1 sekund fra en frysegrænse, slås sammen.

Manglende filtre, fejlformateret/tom evidens, en detektorfejl eller timeout for den
afgrænsede foranalyse falder tilbage til præcis den ensartede midtpunktspolitik. En afbrydelse
fra kalderen eller brokerens deadline medfører ikke fallback: Den afslutter den igangværende
underproces, forhindrer efterfølgende billedudtrækning, og det private midlertidige mappetræ
fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske, reelle FFmpeg-
fixtures til besparelser i caption-kald efter deduplikering, fordeling af budget ved tæt bevægelse,
evidens for sløring/eksponering/SI-TI, hurtige klip med en lang afslutning og falske positiver
ved gradvis udtoning. Scriptet registrerer foranalysens vægurtid og, hvor `/usr/bin/time`
er tilgængelig, underprocessens CPU-forbrug og maksimale RSS. Dets kvalitetskontroller er
udelukkende strukturelle orakler. Kvaliteten af reelle caption-modeller forbliver `HOLD`, fordi
denne testmekanisme ikke har noget godkendt endpoint eller nogen fastfrosset bedømmer.
Økonomiske besparelser forbliver også `HOLD`, medmindre
`--caption-cost-per-call-usd` angiver et eksplicit positivt estimat pr. kald;
scriptet fabrikerer aldrig nogen af delene.

Hvert billede er begrænset til 4 MiB, alle rå billeder tilsammen til 23 MiB og det
serialiserede brokersvar til 32 MiB. En privat midlertidig mappe fjernes i
`finally`. OmniRoute inkluderer ikke FFmpeg og accepterer ikke en brugerdefineret
sti til den eksekverbare fil. Før generering af captions anvender broen en konservativ visuel
deduplikeringspassage: Hver JPEG reduceres til en 16×16-gråtonebuffer og
sammenlignes kun med det senest bevarede billede. For et ønsket caption-budget
på mere end ét billede leverer udtrækningen en
afgrænset pulje af kandidater på op til det dobbelte af budgettet og aldrig mere end 16 billeder.
Den ønskede grænse anvendes først efter deduplikering, og den første og sidste
valgte kandidat bevares under den afsluttende udtynding, når budgettet er mindst
to. Den versionsstyrede
`grayscale-16x16-mean-cells-v2`-politik bruger den største værdi af den gennemsnitlige luminansforskel og
andelen af miniaturebilledets celler, hvis normaliserede forskel er mindst 0,05.
Tærsklen for dubletter er konstanten 0,04, som er valgt af hensyn til forudsigelighed frem for
at være eksponeret som en kørselsindstilling. Dette sekundære
signal med høj kontrast bevarer små bevægelser og ændringer i synlig tekst, som en
sammenligning udelukkende baseret på gennemsnittet kan skjule. Fejl i sammenligningsfunktionen eller dekoderen medfører fallback og
bevarer dækningen. Outputmetadata skelner mellem udtrukne kandidater, billeder,
der blev brugt, og frasorterede visuelle dubletter.

En eksplicit markeret videodel kan anmode om et kontaktark med tidsstempler.
Broen opbygger et JPEG-gitter med højst 4 kolonner og 16 billeder. Hver celle på 512 pixels
indbrænder kildens tidsstempel i et bundbånd med høj kontrast, mens de samme tidsstempler
forbliver i tekstmetadata til efterfølgende tilknytning og revision. Den komplette
JPEG er fortsat begrænset til 32 MiB. Hvis `sharp` ikke kan afkode eller sammensætte gitteret,
falder broen tilbage til de individuelle JPEG-billeder; en klientafbrydelse overføres stadig
gennem kontaktarkoperationen.

Evidens til promovering holdes bevidst adskilt fra den syntetiske mikrobenchmark
for sammensætning. `scripts/perf/video-bridge-contact-sheet-eval.ts` definerer en
skemaversioneret A/B-testmekanisme til reelle OpenAI-kompatible synsmodeller. Den måler
tokens rapporteret af udbyderen, samlet vægurtid (inklusive sammensætning af kontaktarket),
antal modelkald og bevarelse af manifestdefinerede fakta. Rå modelsvar
skrives ikke i rapporten; kun SHA-256-digests og ID'er for matchede fakta bevares.
Testmekanismen foretager ingen netværkskald eller kald til betalingsmodeller, medmindre `--execute-real` angives, og
`--model`, `OMNIROUTE_BASE_URL` og `OMNIROUTE_API_KEY` er konfigureret. Uden
denne eksplicitte reelle kørsel forbliver dens maskinlæsbare afgørelse `HOLD`; syntetiske
målinger af nyttelast/antal kald udgør ikke i sig selv evidens til promovering.

Kaldere kan vedhæfte et valgfrit `transcript.cues`-array til en understøttet videodel,
når de allerede har tidsjusteret tekst. Hver cue skal indeholde `text`, et endeligt
`start`/`end`-interval inden for den registrerede varighed og en tilladt
`source` (`client`, `embedded` eller `audio-bridge`); `confidence` har som standard
værdien `1` og skal forblive mellem `0` og `1`. Helt identiske cues slås sammen.
OmniRoute starter aldrig transskribering ud fra disse metadata: Validerede cues
kopieres til det beskrevne resultat med kilde, konfidens og interval og
gengives som observationer, der ikke er tillid til, sammen med billedteksterne. Ugyldig tekst,
tekst uden for intervallet eller tekst uden proveniens afvises i stedet for at blive blandet ind i
caption-strømmen. Begge transskriptionskanaler i anmodningens body normaliserer den angivne
proveniens til `client`, inklusive selvangivne `embedded`- eller `audio-bridge`-
etiketter. Kun en serverejet adapter kan tildele disse betroede etiketter via
det rent kodebaserede `trustedSource`-argument; et JSON-felt i en anmodning kan ikke nå
dette argument. Transskriptionstekst forbliver ikke-betroet indhold afledt af medier,
uanset dens proveniens, og må aldrig afgøre autorisation.

En avanceret kalder kan levere et `audioTranscript`-spor til den samme video;
det behandles som tekst leveret af klienten, ikke som bevis på servertransskription.
Fusionslaget kører visuelle observationer og lydobservationer under
én deadline og ét afbrydelsessignal, ordner dem på en fælles tidslinje, samler
eksakte dubletter og rapporterer et delvist resultat, når kun den ene gren lykkes.
Et ugyldigt `audioTranscript` nedgraderes til dette delvise resultat — den visuelle
beskrivelse bevares, og lydgrenen registrerer en renset fejlkode —
i stedet for at hele videoen fejler. Tilgængelighed pr. gren, flaget for delvist resultat
og de rensede fejlkoder bevares i det beskrevne resultat, i
guardrail-metadataene (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i resultatcachemetadataene og i bridgens
fusionstællere. Standardstien i Video Bridge kalder ikke tale-til-tekst
eller downloader endnu en mediekopi; uden dette eksplicitte spor forbliver den
udelukkende videobaseret.

**Opbevaring af transskription (#12150 P1).** Dette gælder automatisk, når
Video Bridge (som selv er tilvalg) gengiver en transskriptionsmarkør — der er intet separat
opbevaringsflag. Når en anmodning gengiver en transskriptionsmarkør (et `transcript`,
der er angivet af kalderen, eller et fusioneret `audioTranscript`), markerer guardrailen den som
`videoBridgeObserved` og genererer en redigeret skygge af videobeskrivelsen —
en identisk gengivelse, hvor hver markørs fritekstindhold erstattes af
`[redacted-video-transcript]`, opbygget ved at erstatte det strukturerede markørfelt,
før strengen sammensættes (aldrig ved at fortolke den fladgjorte tekst, så intet
markørindhold — hverken antagonistisk eller almindeligt, herunder indhold med `]` såsom
`[inaudible]`/`[music]` — kan overleve). Anmodningsteksten i den permanente kaldslog erstatter
hver videoafledt tekstdel med denne redigerede skygge, matchet ved hjælp af
indholdslighed; `fullText`-ankeret genindlæses fra den færdige guardrail-payload
før kaldet, så matchet stadig lykkes, efter at senere guardrails i kæden (maskering
af PII og legitimationsoplysninger, prioriteterne 10/95) omskriver beskrivelsesteksten
på stedet, og efter at systemprompt-/handoff-/hukommelsesinjektion omformer
beskedarrayet. Indholdet, der sendes videre til modellen, er uændret. En observeret
anmodning udfylder heller ingen permanent Memory (både anmodnings- og svarafledt
udtrækning springes over), så modellens eget svar ikke kan kopiere transskriptionstekst
ind i Memory.

**Rå videofelter (#12430).** Når bridgen er aktiveret, og understøttelse af native video er ukendt eller mangler, aktiverer definerede `transcript`-/`audioTranscript`-felter også `videoBridgeObserved`, selv efter en fejl i beskrivelsen eller en `maxVideos`-grænse. `null` og tomme strenge tæller; manglende felter og metadata, der ikke vedrører video, gør ikke. Opbevarede kopier redigerer disse felter eller udelader anmodningen, og caches/Memory omgås.

På disse fallback-stier bliver gyldige markører fra kalderen til understøttede `text`-/`input_text`-
dele i stedet for ikke-standardiserede udbyderfelter. Begge spor leveret med anmodningen
forbliver upålidelige `client`-observationer med en udtrykkelig advarsel om, at videoen
ikke blev beskrevet, og at tidsstemplerne ikke blev kontrolleret mod mediet. De eksisterende
budgetter på 256 markører/64 KiB i alt og pr. markør gælder for de to spor samlet;
tidsstempler skal passe inden for brokerens loft på 600 sekunder og ethvert angivet
fokusvindue. Ugyldige spor kasseres og videresendes ikke som vilkårlig tekst; et gyldigt
søsterspor kan stadig bruges, medmindre deres samlede budget overskrides. Null-/tomme
felter tilføjer ingen tekst. Denne fallback tilføjer ingen hentning af medier eller transskription.
Transskriptionsudvidelsesfelter fjernes fra fallback-videobeholderen og dens
`video_url`-/`source`-objekter. OpenAI-wire-tilladelseslisten forbliver striks; videobeholdere
med ukendt native-understøttelse forbliver tilgængelige, og kendte tekstbaserede mål
bevarer sikre markører. Strukturerede redigeringsskygger beskytter den tilføjede
transskriptionstekst, mens den oprindelige anmodning, som kalderen ejer, forbliver uændret.
Mål med native-understøttelse og deaktiverede bridges bevarer deres eksisterende
omgåelsesadfærd.

Yderligere opbevarede kopier bruger det samme signal for observerede anmodninger. Det rå
snapshot af klientanmodningen før guardrails, den afventende anmodning i hukommelsen og
loggen over tidligt afviste anmodninger erstatter strukturelt transskriptionsfelter i videodele;
strengprompter, der syntetiseres af pipelinefaser og kontekst-handoff, redigeres
ved lagringsslutpunktet for den permanente anmodningstekst. Den permanente
`video_content_removed`-markør får fortsættelse med `previous_response_id` til at
fejle lukket i stedet for at rekonstruere tekst, der bevidst blev kasseret. Hvis en observeret
anmodning mister sin redigeringsskygge pr. del før logføring, eller hvis blot én af flere
videoskygger ikke matcher efter senere ændringer af anmodningen, udelades den opbevarede
anmodningstekst helt i stedet for at opbevare en delvist redigeret transskription.

For en observeret anmodning kan et modelsvar citere enhver del af
transskriptionen uden en struktureret markørgrænse. Dens permanente `responseBody`
i kaldsloggen erstattes derfor af en udeladelsesmarkør; det detaljerede
pipelineartefakt (som kan indeholde upstream-/klientindhold og streamsegmenter)
opbevares ikke. Semantiske caches, idempotenscaches og caches til reasoning-replay
omgår læsninger og skrivninger for denne anmodning. Udbyderanmodningen og det
klientsynlige svar forbliver uændrede. Tidlige keepalive-bytes drænes fra den midlertidige
buffer, når det detaljerede artefakt udelades. Kiros advarsel om en fejlformet EventStream
rapporterer kun payloadens antal bytes, aldrig dens indhold eller JSON-parserens rå fejl.
Dette hævder ikke, at alle uvedkommende udbyder-/plugin-diagnostikker er blevet
gennemgået; den bredere gennemgang af permanente lagringsslutpunkter spores i #11658.

Den interne `/api/modality-bridge/video/drilldown`-livscyklus er et separat,
loopback-/tokenautentificeret cachegrundlag. Hver handling kræver også et
kanonisk, uigennemsigtigt principal-id. Før en produktionsklient aktiveres, skal
den udlede dette id fra den autentificerede tenant og må aldrig videresende en
klientvalgt værdi. Cachenøgler knytter denne principal til kanoniske sessions- og
videoreference-id'er, gemmer kun deres SHA-256-afledte nøgler og afgrænser både
læsninger og sletning til den samme principal. Cachen gemmer højst 16 afledte JPEG-
billeder pr. post, udløber dem efter ti minutter og understøtter afgrænsede
`start`-/`end`-læsninger eller eksplicit sletning af sessioner.

Hver principal er begrænset til 16 poster og 64 MiB kanoniske JPEG-data. Disse
grænser er uafhængige af det globale loft på 64 poster/256 MiB: pres på en
principals kvote fjerner kun den pågældende principals mindst nyligt anvendte
poster, før global LRU-fjernelse overvejes. Udløbne poster fjernes fra både
principalens og den globale opgørelse ved cacheaktivitet, mens annullering og
valideringsfejl ikke gemmer en delvis erstatning.

Cachen afviser ikke-kanonisk Base64, overflødig udfyldning, medier, der ikke er JPEG,
fejlformaterede eller afkortede JPEG-filer samt JPEG-filer, der udløser en advarsel
under en afgrænset fuldbilledafkodning med `sharp`. Den genkoder hvert accepteret
billede som en kanonisk JPEG, udleder bredde og højde fra de afkodede byte i stedet
for at stole på felter fra klienten og kasserer eventuelle efterfølgende
polyglot-byte i stedet for at beholde dem. Kun den afgrænsede kanoniske,
komprimerede buffer medregnes i begge kvoter. JSON-overførselsgrænsen inkluderer
Base64-overhead for loftet på 32 MiB for afkodet input. Hver lagret afledning
registrerer dens validerede JPEG-format/-opløsning, samplingpolitik,
afledningsversion, oprettelsestidspunkt, serverberegnede indholdshash og hashede
overordnede reference samt den betroede klients hash af det overordnede indhold.
Der kontrolleres for annullering mellem asynkrone afkodnings-/hashfaser før den
atomare cachelagring.

Denne leverance forbinder endnu ikke en produktionsproducer med ruten og tilbyder
ikke valg af varianter med flere opløsninger. Den transparente Video Bridge-
anmodningssti medfører derfor intet ekstra arbejde, mens tenantbundet
principalafledning og hele FU-08-livscyklussen med flere opløsninger fortsat er
eksplicit opfølgningsarbejde frem for dokumenteret, færdig funktionalitet.

Billeder tekstbeskrives sekventielt med den konfigurerede Video-model. En tom
Video-tilsidesættelse arver Vision-indstillingen. Hvis begge er tomme, vælger
Vision-auto-routeren den effektive model med visionsfunktionalitet. Vellykkede
tekstbeskrivelser erstatter den oprindelige del med et stabilt `[Video description:`-
præfiks, der også markerer teksten som en utroværdig, medieafledt observation og
instruerer efterfølgende modeller i ikke at følge instruktioner fundet i mediet.
Cachenøgler til billedtekstbeskrivelser inkluderer JPEG-byte, prompt,
tidsstempel og effektiv model. Kun vellykkede tekstbeskrivelser cachelagres.
Cacheposter bevarer den faktiske, vellykkede producermodel, herunder en
reservemodel. Broen rapporterer `mixed`, når forskellige billeder blev produceret
af forskellige modeller. Et cachehit genbruger denne produceridentitet i stedet
for at ommærke den som den anmodede routingplan. Resultatcachen for hele videoen
nøgles ud fra hvert input, der ændrer outputtet — prompt, effektiv model,
samplingpolitik, billedantal, semantisk analysetilstand, SHA-256-fingeraftrykket
af det normaliserede fokushint, fokusvindue, `transcript`, `audioTranscript` og
kontaktarkflaget — så ændring af en af disse dimensioner medfører et cachemiss
og aldrig genbrug af forældede data. Versionsnummeret for den visuelle
deduplikeringspolitik, tærsklen og det afgrænsede antal kandidatbilleder indgår
også eksplicit i resultatcachens nøgle og metadata. En politikændring kan derfor
ikke genbruge en forældet beskrivelse af hele videoen. Metadata for resultatcache
v4 bevarer tilstanden og fingeraftrykket, men aldrig den rå brugeropgave.
Guardrail-metadata rapporterer både de anmodede og effektive analysetilstande.
En anmodet `focused`-tilstand uden anvendelig brugertekst rapporteres som effektivt
`full`.

Guardrailen udtrækker alle understøttede videodele, men beskriver højst
`modalityBridgeVideoMaxVideos`. For et mål, der beviseligt har
`supportsVideo === false`, omdannes fejlede videoer og videoer over grænsen til
eksplicitte, sikre tekstmarkører, så ingen rå video består. Når funktionaliteten
er ukendt, beholder disse dele deres videobeholder. Et eventuelt
reservetranskript følger den afgrænsede tekstkonvertering ovenfor. Mål med
`supportsVideo === true` omgår broen. Klientanmodningens afbrydelsessignal
videreføres gennem download, broker-kø, underprocesser og kald til
tekstbeskrivelse. Afbrydelser stopper mellem videoer og lader aldrig rå medier
passere ved fejl.

Kørselsindstillingerne er DB-understøttede og Zod-validerede:

| Nøgle                               | Standardværdi | Interval / adfærd                                                                                                |
| ----------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`       | Valgfrit kørselsmiljø, skal aktivt tilvælges                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` bevarer generiske billedtekster; `focused` bruger afgrænset, ikke-betroet kontekst fra den seneste bruger |
| `modalityBridgeVideoModel`          | `""`          | Nedarv modellen fra Vision Bridge                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware` eller proportional `segment_aware`; fejl i detektoren falder tilbage til `uniform`      |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 ms                                                                                                   |

Ældre, gemte timeoutværdier for video på over 120 sekunder begrænses til
brokerens deadline; nye indstillinger over denne grænse afvises ved lagring.
`GET /api/modality-bridge/video/runtime` kræver betroet, stemplet lokalitet via
loopback før godkendelse eller undersøgelse af kørselsmiljøet og kræver derefter
administrationsgodkendelse. Det returnerer kun `available`, rensede versioner af
FFmpeg/ffprobe og en fast årsag, når kørselsmiljøet ikke er tilgængeligt. Det
interne ekstraktionsendpoint er ikke et offentligt upload-API: mætning af køen
returnerer `503` plus `Retry-After`, en afbrydelse fra kalderen returnerer `499`,
og brokerens faste deadline returnerer `504`. Konverterede svar føjer
`video->text;model=<visionModel>;parts=<videos>` til den centrale
`x-omniroute-modality-bridge`-header uden at fjerne Vision- eller Audio-segmenter.

### PII-maskering (`piiMasker.ts`)

Kører i **begge** faser.

- **`preCall`** kloner payloaden, gennemgår `system`, `messages`, `input` og
  `prompt` (herunder elementer, der er almindelige strenge) og anvender
  `processPII()` (fra `@/shared/utils/inputSanitizer`) på strengfelterne
  `content`/`text`. Når `PII_REDACTION_ENABLED=true`, maskeres registrerede
  personhenførbare oplysninger i den udgående payload. Dette er uafhængigt af
  `INPUT_SANITIZER_MODE` (som kun styrer politikken for promptinjektion). Når
  maskering er slået fra, registrerer kaldet antallet af fund uden at omskrive
  indholdet.
- **`postCall`** dybdekloner svaret og kører `sanitizePIIResponse()` samt
  maskeringen for Responses-API-formatet (`maskResponsesOutput` — dækker
  `output_text` og `output[].content[].text`). Hvis der foretages nogen
  maskering, erstatter det ændrede svar originalen.

Beskyttelsesmekanismen blokerer aldrig; den tilføjer kun annotationer
(`meta.detections`, `meta.redacted`) eller omskriver.

#### Valg pr. type, brugerdefinerede mønstre og registreringstællere

**Dashboard → Indstillinger → Sikkerhed → PII-maskering** vælger, _hvad_ der
maskeres. Det aktiverer ikke maskeringen: dette styres fortsat af
`PII_REDACTION_ENABLED` (anmodning) og `PII_RESPONSE_SANITIZATION` (svar + SSE),
som begge som standard er slået fra.

- **Valg pr. type** — de indbyggede id'er er angivet i
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). En ikke-angivet
  værdi betyder alle typer (adfærden før denne indstilling fandtes).
  Anmodningsmotorens `ssn_us`-mønster knyttes til `ssn`. Skabelonerne (Minimal,
  Standard, Finansiel, Brasiliansk, USA, Fuld) udfylder kun afkrydsningsfelterne
  i brugergrænsefladen.
- **Brugerdefinerede mønstre** — op til 20 regulære udtryk eller jokertegnsmønstre
  (`*` = op til 64 tegn, der ikke er blanktegn, `?` = ét tegn). Match bliver til
  `[CUSTOM_REDACTED]`. Hvert mønster behandles af `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): højst 500 tegn, flag begrænset til
  `g i m s u`, skal kunne kompileres, skal bestå `safe-regex` (katastrofal
  backtracking) og må ikke matche en tom streng eller en maskeringspladsholder.
  Et mønster, der ikke består, afvises ved lagring og test, og en gemt række, der
  ikke består, springes over under kørsel i stedet for at blive kompileret.
  Brugerdefinerede mønstre køres kun, mens maskering er slået til.
- **Registreringstællere** — antal pr. type (aldrig de matchede værdier), som
  opbevares i hukommelsen og nulstilles ved genstart
  (`src/lib/pii/piiDetectionStats.ts`). De øges kun, mens maskering er slået til.

Indstillingerne findes i tabellen `key_value` (navneområde `pii_settings`,
`src/lib/db/piiSettings.ts`) og læses gennem en cache på 1 s. API:

| Metode | Sti                      | Formål                                                               |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flagtilstand, `enabledTypes`, `customPatterns`, registreringstællere |
| `PUT`  | `/api/settings/pii`      | Erstat `enabledTypes` (`null` = alle) og/eller `customPatterns`      |
| `POST` | `/api/settings/pii/test` | Prøvekør ét mønster mod en prøve på højst 8 KB; intet gemmes         |

Alle tre kræver administrationsgodkendelse og validerer brødteksten med Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Promptinjektion (`promptInjection.ts`)

Registrerer skadelige strukturer i brugerleveret indhold og håndhæver den
konfigurerede politik. Adfærden styres af miljøvariabler og
konstruktørindstillinger:

| Indstilling       | Miljøvariabel                                                                                                | Standardværdi | Effekt                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Aktiveret         | `INPUT_SANITIZER_ENABLED`                                                                                    | `true`        | Når værdien er `false`, afsluttes guardrailen omgående.                                                                                                                                                            |
| Tilstand          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                              | `warn`        | Injektionspolitik: `block`, `warn` eller `log`. (`redact` accepteres af hensyn til bagudkompatibilitet, men fjerner **ikke** injektionstekst; omskrivning af PII i anmodninger styres af `PII_REDACTION_ENABLED`.) |
| Blokeringstærskel | indstillingen `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Minimumsalvorlighedsgrad, der kræves for blokering. Medium er som standard kun til observation.                                                                                                                    |

**Tilstandsprioritet** (`getMode`): kalderens `options.mode` →
`INJECTION_GUARD_MODE` **tilsidesættelse via DB-funktionsflag** (Dashboard → Settings →
Feature Flags) → miljøvariablen `INJECTION_GUARD_MODE` → miljøvariablen `INPUT_SANITIZER_MODE` →
`warn`. En tilsidesættelse fra dashboardet har derfor forrang over miljøvariablerne, så
brugergrænsefladen Feature Flags styrer den kørende guardrail direkte (uden genstart).
DB-læsningen er fejlsikker: Hvis den fejler, falder guardrailen tilbage til den
miljøvariabelbaserede adfærd, og når der ikke er angivet nogen tilsidesættelse,
er adfærden identisk med en løsning, der kun bruger miljøvariabler.

Detektionskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (fælles sæt af
   detektorer, der bruges andre steder i pipelinen).
2. Indbyggede `DEFAULT_GUARD_PATTERNS` (i øjeblikket `system_override_inline` og
   `markdown_system_block`, begge med alvorlighedsgraden `high`).
3. Valgfrie `customPatterns`, der videregives via konstruktørindstillinger
   (strenge, regulære udtryk eller poster af typen `{ name, pattern, severity }`).

Når `mode === "block"` **og** mindst én detektion opfylder tærsklen for
alvorlighedsgrad, returnerer `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I tilstandene `warn`/`log` logger guardrailen
hændelsen, men tillader kaldet. Den fælles hjælpefunktion
`evaluatePromptInjection()` eksporteres også til kaldere, der skal evaluere
prompter uden at gå gennem registreringsdatabasen.

**Scanningsgrænse (v3.8.20):** Detektoren undersøger kun de **første 16 KB** af
den sammenføjede prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 byte) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` kalder `slice(0, MAX_INJECTION_SCAN_BYTES)`, før
mønsterløkken køres. Injektionsdirektiver befinder sig nær starten af et input,
så dette begrænser regex-relateret CPU-forbrug/GC ved payloads på flere hundrede
KB uden at svække detektionen (jf. #3932, #4041).

### Maskering af legitimationsoplysninger (`credentialMasker.ts`)

Kører i **begge** faser og sidst i standardkæden (prioritet `95`). Bortredigerer
velkendte mønstre for API-nøgler og hemmelige tokens fra den udgående payload
(meddelelsesindhold, argumenter til værktøjskald og værktøjsresultater) **samt**
udbyderens svar, så legitimationsoplysninger, der indsættes i en prompt (eller
returneres af et værktøjsresultat), ikke lækkes til den eksterne udbyder eller
tilbage til klienten.

- **Kun efter tilvalg**, efter samme konvention som bortredigering af PII
  (relateret til hård regel #20): Deaktiveret, medmindre
  `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når funktionen er slået fra, gør
  guardrailen intet — den blokerer aldrig og omskriver aldrig.
- `redactCredentials()` gennemløber hele payload-/svartræet (`walkValue()`,
  beskyttet mod prototypeforurening og cyklussikker via `WeakSet`) og erstatter
  forekomster med en `[REDACTED:<type>]`-pladsholder, idet kun de grene, der
  faktisk er ændret, klones.
- `CREDENTIAL_PATTERNS` dækker nøgler til LLM-udbydere (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøgler (Stripe, Square),
  cloudnøgler (AWS-adgangsnøgle, Twilio, SendGrid, Mailgun), private nøgler/JWT'er,
  forbindelsesstrenge, der indeholder legitimationsoplysninger
  (`mongodb://user:pass@...` osv.), samt et generisk mønster for headerværdierne
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Headerformede nøgler
  (`authorization`, `x-api-key`, `api-key`, `apikey`) bortredigeres strukturelt
  (kun værdien, mens skemapræfikser som `Bearer `/`Basic ` bevares) frem for via
  det generiske tekstbaserede regulære udtryk.
- Guardrailen blokerer aldrig; den omskriver kun (`modifiedPayload` /
  `modifiedResponse`) og tilføjer annoteringer (`meta.credentialsRedacted`,
  `meta.count`).

Regressionskontrol: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true afbryder kæden
  message?: string; // vises ved blokering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returneres af preCall for at omskrive anmodningen
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

En guardrail signalerer "ingen ændring" ved at returnere enten `void`, `{}` eller
`{ block: false }`. Returnering af en `modifiedPayload`/`modifiedResponse` erstatter
den værdi, der løber gennem kæden til efterfølgende guardrails.
`signal?: AbortSignal` viderefører kalderens livscyklus til guardrails. En afbrudt anmodning er den bevidste fail-open-undtagelse: mediebroer stopper arbejdet og rydder op uden at gendanne rå medier til et mål, som med sikkerhed ikke understøtter dem.

## Register (`registry.ts`)

Singletonen `guardrailRegistry` eksponerer:

- `register(guardrail)` — tilføjer en guardrail (eller erstatter efter normaliseret navn) og
  sorterer igen efter stigende `priority`.
- `clear()` / `list()` — administrative hjælpefunktioner.
- `runPreCallHooks(payload, context)` — gennemløber aktive guardrails, fører
  payloaden gennem `modifiedPayload` og stopper ved den første `block: true`.
- `runPostCallHooks(response, context)` — samme forløb på svarsiden.
- `resetGuardrailsForTests({ registerDefaults })` — rydder tilstanden og
  genregistrerer eventuelt standarderne for ren testisolering.

Begge kørselsfunktioner returnerer `{ blocked, payload|response, results, guardrail?, message? }`,
hvor `results` er et array af `GuardrailExecutionResult`-poster, som indeholder
felterne `blocked`, `skipped`, `modified`, `error` og `meta` for hver guardrail,
hvilket er nyttigt til sporing.

### Deaktivering af guardrails pr. anmodning

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` samler en
duplikatfri liste over guardrail-navne, som skal springes over for den aktuelle
anmodning. Kilder (alle valgfrie, alle flettes):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` i anmodningens body (på øverste niveau)
- `metadata.disabledGuardrails` i anmodningens body
- Headeren `x-omniroute-disabled-guardrails` (eller den ældre
  `x-disabled-guardrails`)

Værdier kan være arrays af strenge eller en kommasepareret streng; navne
normaliseres til kebab-case med små bogstaver (`pii_masker` → `pii-masker`). Resultatet
videregives via `context.disabledGuardrails` til registret, som springer
matchende guardrails over (`skipped: true` i `results`).

## Udførelsesrækkefølge

For hver anmodning, der går gennem `src/sse/handlers/chat.ts` og
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` opbygger listen over elementer, der skal springes over, ud fra API-nøglen, body
   og headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kører guardrails i stigende
   prioritetsrækkefølge:
   - Deaktiverede guardrails registreres som `skipped`.
   - Hver guardrails `preCall` kan omskrive payloaden via `modifiedPayload`.
   - Den første `block: true` afbryder kæden, og handleren returnerer
     et afvisningssvar fra den pågældende guardrail.
3. Den (potentielt omskrevne) payload sendes videre til kombinationsrouting og upstream-
   videresendelse.
4. Når svaret er samlet, kører `guardrailRegistry.runPostCallHooks(...)`
   den samme kæde på svaret. `block: true` her kasserer upstream-
   svaret.

Guardrails, der udløser fejl, registreres med `error: <message>` og logges via
`logger.warn`, men kæden fortsætter — den er bevidst designet til at være fail-open.

## Konfiguration

Miljøvariabler, der læses af de indbyggede guardrails:

| Variabel                              | Bruges af                 | Effekt                                                                                                           |
| ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Angiv `false` for at deaktivere detektering fuldstændigt.                                                        |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Injektionspolitik: `warn`, `block` eller `log`. Den ældre værdi `redact` omskriver ikke injektionstekst.         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Tilstand for injektionsbeskyttelsen; også et DB-feature-flag, der **tilsidesætter** miljøvariablerne (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Den laveste alvorlighedsgrad, som `MODE=block` afviser: `high` (standard), `medium` eller `low`.                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Ældre alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Når værdien er `true`, redigeres PII i anmodningen (uafhængigt af injektionstilstanden).                         |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Styrer maskeringsadfærden på svarsiden.                                                                          |

Modality Bridge-guardrails læser kørselskonfigurationen fra det DB-understøttede
indstillingslager (`getSettings()`), ikke fra miljøvariabler. Visions primære nøgler er
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og
`modalityBridgeCacheMaxEntries`. De ældre
`visionBridge*`-nøgler accepteres kun som det dokumenterede læsefallback i én cyklus;
dashboardet skriver med de primære nøgler. Standardværdier og fallback-
resolveren findes i `src/shared/constants/modalityBridgeDefaults.ts`, mens ældre
konstanter er bevaret i `src/shared/constants/visionBridgeDefaults.ts`.

Lyd bruger `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips` samt de delte
`modalityBridgeCache*`-indstillinger. Lyd har intet fallback til ældre nøgler, da disse
nøgler blev introduceret med Modality Bridge-skemaet.

Video bruger `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` og
`modalityBridgeVideoTimeout` samt de delte `modalityBridgeCache*`-indstillinger.
Funktionen er som standard deaktiveret, fordi FFmpeg/ffprobe er valgfrie driftsmæssige
afhængigheder, og billedtekstning af frames øger latenstid og modelomkostninger.

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

1. Opret `src/lib/guardrails/myGuardrail.ts`, som udvider `BaseGuardrail`.
2. Implementer `preCall` og/eller `postCall`.
3. Registrer enten ved importtidspunktet (tilføj fra `registerDefaultGuardrails`), eller
   kald `guardrailRegistry.register(...)` under kørsel — registreringsdatabasen erstatter
   enhver tidligere guardrail med det samme normaliserede navn.
4. Tilføj test under `tests/unit/` (eksisterende eksempler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test

Brug `resetGuardrailsForTests()` mellem test for at starte fra en kendt tilstand.
Angiv `{ registerDefaults: false }` for at starte med en tom registreringsdatabase og
kun registrere de guardrails, der testes. Vision Bridge accepterer dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge eksponerer de
tilsvarende integrationspunkter for indstillinger, funktionalitet, valg af STT-model,
kontrol af legitimationsoplysninger og transskription. Test kan derfor afprøve begge
forløb uden adgang til database eller netværk.

## Se også

- `src/lib/guardrails/` — implementering
- `src/shared/utils/inputSanitizer.ts` — fælles detektor, som driver
  beskyttelse mod prompt-injektion og maskering af personhenførbare oplysninger
- `src/shared/constants/visionBridgeDefaults.ts` — standarder for Vision Bridge og
  modelliste for tvungen bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — fælles standarder for kørsel af Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lag (circuit breaker, nedkølingsperioder)
- `docs/reference/ENVIRONMENT.md` — komplet reference til miljøvariabler

## Rutedækning og red-team for injektionsbeskyttelsen (Fase 8 · Blok D)

Injektionsbeskyttelsen (`createInjectionGuard` / `withInjectionGuard`) dækker alle ruter,
der accepterer brugerprompter. Den respekterer `INJECTION_GUARD_MODE` (standardværdien `warn` = kun logning;
`block` = returnerer HTTP 400 `SECURITY_001`).

| Type                 | Ruter                                                                                                                                                | Standardtilstand |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Tekst (eksisterende) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generativ            | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

Tekstudtrækning (`extractMessageContents`) dækker `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (hver nat, `nightly-llm-security.yml`):** promptfoo validerer, at hver rute blokerer
OWASP-LLM-korpuset i `INJECTION_GUARD_MODE=block`; garak kører prober (springes over uden hemmelighed).
`moderations` er inkluderet for konsistens — operatører i blokeringstilstand kan undtage den via
`resolveDisabledGuardrails`.

Det natlige workflow (`.github/workflows/nightly-llm-security.yml`, cron + manuel
igangsættelse) har to jobs:

- **`promptfoo-guard` (blokerende)** — kører `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Hver adversarial test (f.eks. "ignore all
  previous instructions…", jailbreaks i DAN-stil) kontrollerer, at svaret indeholder
  `error.code === "SECURITY_001"`, dvs. at beskyttelsen faktisk afviste anmodningen.
- **`garak` (vejledende)** — kører garak `--probes promptinject,dan,leakreplay`
  mod en lokal OmniRoute-instans (`http://localhost:20128/v1`). Betinget af en
  udbyderhemmelighed (`PROMPTFOO_PROVIDER_KEY`); springes elegant over og har suffikset
  `|| true`, så jobbet rapporterer uden at få CI til at fejle.

Dækningen af hjælpefunktionen til beskyttelse (`createInjectionGuard` / `withInjectionGuard`)
omfatter alle promptbærende `/v1`-ruter; prompttekst hentes fra
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` af
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
