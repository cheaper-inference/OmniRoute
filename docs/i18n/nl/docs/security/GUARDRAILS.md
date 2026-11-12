# Guardrails (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Bron van waarheid:** `src/lib/guardrails/`
> **Laatst bijgewerkt:** 2026-10-17 — v3.8.52 (toegevoegd [Dekking en beperkingen](#coverage-and-limits):
> welke routes en antwoordpaden de hooks bereiken, de samengevoegde uitschakelheaders (#16412), de
> injectieblokkeermodus als verplichte grens (#16413), en wat een antwoord te zien krijgt vóór de post-call)

Guardrails handhaven veiligheids-, beleids- en contenttransformaties op de grens
tussen OmniRoute en upstream-providers. Elke guardrail kan request-payloads
(`preCall`) en upstream-antwoorden (`postCall`) inspecteren (en optioneel
weigeren, transformeren of annoteren).

Het systeem is **fail-open**: als een guardrail tijdens de uitvoering een fout
gooit, registreert het register de fout en gaat het verder met de volgende
guardrail in plaats van de request te laten mislukken. Blokkeren is een
expliciete beslissing (`block: true`), nooit een ongeluk. De enige uitzondering
is een afgebroken request: wanneer de `signal` van de aanroeper wordt afgebroken,
verwerpt een gooiende guardrail de hook-run in plaats van te worden overgeslagen.

De hooks worden **niet** op elke route of elk antwoord uitgevoerd. Lees
[Dekking en beperkingen](#coverage-and-limits) voordat je op een guardrail
vertrouwt als beveiligingscontrole.

## Ingebouwde guardrails

Het register laadt bij import automatisch zes guardrails in prioriteitsvolgorde
(zie `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteit | Naam                | Fase(n)        | Bestand               |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lagere prioriteitsnummers worden **eerst** uitgevoerd.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Het GLM 5.3-basismodel en `glm-5.3-{low,high,max}` hebben expliciete
`supportsVision:false`-metadata in het register/de spec. De GLM 5.3 Flash-varianten
blijven native-vision-modellen. De `/v1/messages`-route van Claude Code komt de
gedeelde `handleChat` pre-call-guardrailketen binnen **vóór** de
Claude-naar-OpenAI-vertaling; geneste afbeeldingen in `Read`-toolresultaten moeten
worden beschreven of afgehandeld voordat die vertaling ze overhevelt naar OpenAI
`image_url`-content (#17069).

Onderschept requests met afbeeldingen die gericht zijn aan **niet-vision-modellen**
en stuurt óf de hele request om naar een vision-geschikt model, óf vervangt de
afbeeldingsdelen door tekstbeschrijvingen die vóór de upstream-aanroep door een
configureerbaar vision-model zijn gegenereerd. Hierdoor kunnen providers die
alleen tekst ondersteunen transparant multimodale payloads verwerken.

Verloop:

1. Sla over als het doelmodel al vision ondersteunt (tenzij het voorkomt in de
   lijst met geforceerde bridges `isVisionBridgeForcedModel`).
2. Extraheer afbeeldingsdelen via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), die delegeert naar de **geünificeerde
   mediadetector** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — de
   enige bron van waarheid die wordt gedeeld met de combo-compatibiliteitsfilter.
   De extractie is via een allowlist beperkt tot de vormen die `replaceImageParts`
   terug kan invoegen (het extract↔replace-contract): OpenAI `image_url`,
   Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, en
   Responses API `input_image`. Overeenkomende afbeeldingen die genest zijn in
   Claude Code `tool_result.content` en Responses tool-outputs worden eveneens
   geëxtraheerd en op hun oorspronkelijke paden vervangen; vormen die alleen als
   indicator dienen, zijn materiaal voor de combo-filter en worden niet
   geëxtraheerd. Sla over als er geen gevonden zijn.
3. Los de runtime-configuratie op via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nieuwe
   `modalityBridge*`-instelsleutels gaan voor; legacy `visionBridge*`-sleutels
   blijven een **fallback van één cyclus** (rollback-venster). Sla vóór elke
   media-doorloping over wanneer de bridge is uitgeschakeld.
4. De modusselector (`modalityBridgeVisionMode`, zie tabel hieronder) beslist
   tussen omleiden en beschrijven. Omleiden retourneert `modifiedPayload` met
   alleen `model` verwisseld, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beschrijvingspad: beperk het aantal afbeeldingen tot `maxImages`, stel de
   taakbewuste prompt samen, raadpleeg de beschrijfcache, roep het vision-model
   **parallel** aan (`Promise.allSettled`) en injecteer
   `[Image N]: <description>`-tekstdelen op hun plaats. Een mislukte beschrijving
   levert `null` op: de ruwe afbeelding blijft behouden voor onbekende of
   vision-geschikte doelen (#4012), maar een **bevestigd tekst-only direct doel**
   of een combo zonder vision krijgt een expliciete
   `(unavailable — no vision-capable provider connected)`-tekststub voor elke
   onbeschreven afbeelding, inclusief gedeeltelijke mislukkingen en afbeeldingen
   boven de limiet voor beschrijvingsaanroepen (#17069). De bestaande fallback
   voor combo-beschrijvingen waarbij alle aanroepen mislukken, blijft van kracht
   (#8430).
6. Retourneer `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Modusselector (`modalityBridgeVisionMode`)

| Modus      | Standaard | Gedrag                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔         | Verouderde heuristiek, ongemoeid gelaten (#6640/#7204): niet-combo-/`auto/`-modellen worden omgeleid naar het beste vision-model, tenzij het oorspronkelijke model al bruikbare inloggegevens heeft (dan wordt beschreven); combo-doelen beschrijven altijd.                                                                                                           |
| `describe` |           | Altijd beschrijven — het omleidingsblok wordt volledig overgeslagen; het door de gebruiker gekozen model geeft altijd antwoord.                                                                                                                                                                                                                                        |
| `reroute`  |           | Omleiding forceren: de beveiliging die het model met inloggegevens behoudt, wordt omzeild. De beveiliging van de inloggegevens van het omleidings-**doel** blijft van kracht — wanneer er geen bruikbaar vision-doel bestaat, blokkeert de brug met een duidelijke foutmelding in plaats van te beschrijven of ruwe afbeeldingen naar een alleen-tekst-doel te sturen. |

Geforceerde modi komen **vóórdat** de automatische heuristiek wordt uitgevoerd
al in werking; het gedrag van `auto` is byte-identiek aan de guardrail van vóór PR-1.

#### Scope van de API-sleutel (`visionBridgeKeyScope.ts`)

Wanneer de API-sleutel van de aanroeper `allowedConnections`, quotapools
(`allowedQuotas`) of modellen (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) beperkt, kiest de
brug alleen omleidings- en beschrijfmodellen die de sleutel mag gebruiken, op
verbindingen die de sleutel mag gebruiken. De beschrijfaanroep verloopt dan
altijd via de OmniRoute-self-loop met de header
`x-omniroute-self-loop-key-id`, zodat het ontvangende chatverzoek het
verbindings- en modelbeleid van die sleutel opnieuw afdwingt.
`enforceApiKeyPolicy()` honoreert die header alleen in combinatie met de
self-loop-bearer, waardoor de toegang alleen vernauwd kan worden, en een id
die niet kan worden herleid, wordt afgewezen.

Als er voor de sleutel geen vision-model is toegestaan, weigert een
**bevestigd alleen-tekst-doel** het afbeeldingsverzoek lokaal met een
duidelijke HTTP 400 in plaats van afbeeldingsbytes door te sturen naar een
upstream die deze niet kan verwerken (#17069). Voor doelen met een onbekende
of native vision-mogelijkheid behoudt het beschrijfpad zijn eerdere
fail-open-gedrag (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Verzoeken zonder sleutel, en sleutels zonder deze beperkingen, gedragen zich
exact zoals daarvoor.

#### Taakbewuste beschrijfprompt (`modalityBridgeVisionTaskAware`)

Standaard **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) voegt
de tekst van het **laatste gebruikersbericht** (afgekapt tot 500 tekens) toe
aan de basis-beschrijfprompt, waarmee de beschrijving wordt gestuurd op wat
de gebruiker daadwerkelijk vroeg (codex-vision-proxy-patroon) en het
vision-model wordt gevraagd zichtbare tekst te transcriberen. Met de vlag
uitgeschakeld — of zonder gebruikerstekst — wordt de basisprompt ongewijzigd
gebruikt.

Het eigen OpenAI-compatibele verzoek van de beschrijf-self-loop
(`callVisionModelSingle()` in `visionBridgeHelpers.ts`) vraagt altijd
`image_url.detail: "high"` aan — onvoorwaardelijk, voor elke
aanroeper/provider, niet afhankelijk van enig clientsignaal. Sampling met
een lage detailgraad verslechtert de OCR-nauwkeurigheid voor precies de
teksttranscriptietaak waarvoor deze prompt vraagt, dus vraagt de
beschrijfaanroep zelf altijd om een hoge detailgraad, ongeacht welke
detailgraad het oorspronkelijke inkomende verzoek gebruikte. Dit heeft
alleen invloed op de interne request body van de beschrijfaanroep; het
verandert niet hoe OmniRoute de eigen `image_url.detail` van de aanroeper
bij het primaire verzoek doorstuurt — die standaardwaarde wordt apart
toegepast, en alleen voor gedetecteerde OpenCode-clients, in
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). De
Anthropic-wire-format-tak van de beschrijf-self-loop heeft geen
`detail`-veld en wordt door geen van beide standaardwaarden beïnvloed.

#### Outputlimiet voor beschrijvingen (`modalityBridgeVisionMaxChars`)

| Sleutel                        | Standaard | Bereik           |
| ------------------------------ | --------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`       | `0` of 100–50000 |

`0` (standaard) betekent **geen limiet** — de beschrijving die door
`callVisionModel()` wordt geretourneerd, wordt ongewijzigd doorgegeven,
waardoor het bestaande gedrag behouden blijft. Elke waarde in het bereik
100–50000 kapt de beschrijving af met een `…`-achtervoegsel voordat deze
weer wordt ingevoegd als `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Verhoog deze waarde voor detailrijke OCR-taken waarbij het downstream-model
de volledige transcriptie nodig heeft; verlaag deze om het tokengebruik van
spraakzame vision-modellen te begrenzen. Het dashboardveld bevindt zich op
het paneel Geavanceerd van het tabblad Vision (`modality-bridge-max-chars`
in `ModalityBridgeVisionTab.tsx`) en klampt elke waarde tussen 1 en 99
omhoog naar de ondergrens van 100, terwijl een expliciete `0` ongemoeid
wordt gelaten — `0` is op zichzelf een geldige Zod-waarde
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), niet
slechts de "niet-ingestelde" standaardwaarde.

#### Beschrijfcache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL-cache voor beschrijfoutputs, gedeeld binnen het hele
proces. Sleutel = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
met lengteprefix-framing (geen botsingen op veldgrenzen). De modelcomponent
is het **geconfigureerde** brugmodel, niet het model dat daadwerkelijk
antwoordde — `callVisionModel` kan intern terugvallen op een ander model, en
sleutelen per poging zou de cache fragmenteren. Mislukte beschrijvingen
worden nooit gecachet. Instellingen:

| Sleutel                         | Standaard | Bereik  |
| ------------------------------- | --------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`    | —       |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000 |

#### Normalisatie van remote afbeeldingen (self-loop describe/base64-fetch)

Wanneer de bridge zelf een **remote** afbeelding ophaalt — de Anthropic describe-self-call en de base64-conversie naar claude-wire-format (`ensureBase64ImagesForClaudeWire`), beide via `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — wordt de resulterende data-URI door `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) gehaald voordat deze in het vision-model-verzoek wordt ingebed. Te grote afbeeldingen worden verkleind naar een **lange zijde van 2048px** (gelijk aan de resize-limiet die OpenAI/Anthropic al server-side toepassen), wat upload-bytes/latentie vermindert zonder te veranderen wat het vision-model ziet. Het verkleinen gebruikt `sharp`, geladen via dynamic import: op een platform waar het native binary niet laadt, gooit `normalizeDataUri()` **nooit een fout** — het valt terug op een passthrough van de originele bytes, zodat het describe/base64-conversiepad altijd blijft werken. Niet-afbeeldingsbytes (een fetch die geen decodeerbare afbeelding opleverde) worden ook ongemoeid doorgelaten. Deze normalisatie is beperkt tot afbeeldingen die de bridge voor zijn eigen self-call ophaalt — hij wordt nooit toegepast op de ruwe passthrough-payload van de aanroeper, in overeenstemming met het opt-in-only mutatieprincipe (Harde Regel #20).

#### Instellingenschema + migratie

De nieuwe `modalityBridge*`-sleutels worden Zod-gevalideerd in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, het `modalityBridgeCache*`-trio en de `modalityBridgeAudio*`-groep die door de Audio Bridge wordt gebruikt. Migratie `141_modality_bridge_settings.sql` kopieert bestaande legacy-`visionBridge*`-waarden naar de overeenkomstige nieuwe sleutels (idempotent, overschrijft nooit een door een operator ingestelde `modalityBridge*`-waarde); de legacy-sleutels blijven één releasecyclus geaccepteerd als lees-fallback.

#### Transparantie-header + statistieken

Describe-getransformeerde responses dragen `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (gebouwd door `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, aangebracht door `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Omgeleide verzoeken krijgen **geen** header — de payload was onaangeroerd en de modelwissel is al zichtbaar in het `model`-veld van de response-body.

`GET /api/modality-bridge/stats` (management-auth, hetzelfde niveau als `GET /api/settings`) geeft de in-memory per-modaliteit-tellers terug `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` voor `vision`, `audio` en `video`. `averageLatencyMs` gebruikt `latencySamples`, niet alle pogingen, als noemer; een operatie zonder timing fabriceert geen nul-milliseconde-sample. `bridged` blijft de achterwaarts-compatibele alias voor succesvolle conversies; mislukte pogingen verhogen hem niet. Tellers worden bij procesherstart gereset, by design (telemetrie, geen boekhouding).

#### Dashboard-configuratie

De toegewijde dashboardpagina is `/dashboard/settings/modality-bridge`. De URL-adresseerbare `Vision`-, `Audio`- en `Video`-tabbladen behouden query-parameters bij het wisselen van de `tab`-waarde. Het Vision-tabblad biedt inschakeling, modus, modelselectie (inclusief de automatische standaard), task-aware prompting, geavanceerde limieten voor timeout/aantal afbeeldingen/beschrijvingslengte/cache, runtime-tellers en een beveiligd voorbeeldverzoek. Het Audio-tabblad is ook live: het biedt inschakeling, een STT-only modelkiezer met Auto, limieten voor timeout/maximale clipduur, audio-tellers en een `input_audio`-voorbeeldtest. Het Video-tabblad is functioneel: het rapporteert de FFmpeg/ffprobe-runtime-status — een van vier expliciete UI-statussen (`unknown` terwijl de probe onderweg is of niet kon worden voltooid, `restricted` op een niet-loopback dashboardhost waar de probe client-side wordt overgeslagen, `unavailable` zodra geprobeerd en bevestigd afwezig, of `available` met de FFmpeg/ffprobe-versies) — bewaart limieten voor inschakeling/model/frames/video/timeout, filtert de modelkiezer naar vision-capable modellen en toont video-tellers.

De voormalige Vision Bridge-kaart onder AI-instellingen is een compatibiliteitslink naar de nieuwe pagina; hij bevat geen tweede kopie van het formulier meer. Media Providers linkt ook Image-to-Text- en Speech-to-Text-workflows naar de overeenkomstige Modality Bridge-tabbladen zonder de bestaande Speech-to-Text-playground te verwijderen.

**Self-loop admission-bypass:** wanneer de describe-call via OmniRoutes eigen `/v1`-self-loop wordt gerouteerd (niet-standaard providermodel), stuurt het sub-verzoek `x-omniroute-admission-bypass: internal` en wordt het geauthenticeerd met de opgeloste self-loop-credential — de lokale `sk_omniroute`-sentinel in lokale modus, of de door de operator geconfigureerde `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`-env-sleutel (#1350), zodat deployments met `REQUIRE_API_KEY=true` de describe-call nog steeds kunnen uitvoeren. De bypass wordt alleen gehonoreerd voor die exacte credentials, zodat externe clients de header niet kunnen gebruiken om admission over te slaan.

Legacy-standaardwaarden staan in `src/shared/constants/visionBridgeDefaults.ts`; de nieuwe standaardwaarden voor modus/task-aware/cache en de settings-resolver staan in `src/shared/constants/modalityBridgeDefaults.ts`. De guardrail stelt een `deps`-constructoroptie beschikbaar zodat tests nep-`getSettings`- en `callVisionModel`-implementaties kunnen injecteren.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Onderschept chatverzoeken met audio voordat ze een doel bereiken waarvan niet bekend is dat het audio-invoer accepteert. Hij leidt het chatverzoek nooit om: audio-parts worden getranscribeerd via het bestaande OpenAI-compatibele multipart-endpoint en het gekozen chatmodel gaat verder met teksttranscripten.

Verloop:

1. Los `supportsAudio` op via `getResolvedModelCapabilities()`. Expliciete
   provider-registry-metadata gaat voor, daarna statische modelmetadata, daarna
   gesynchroniseerde `modalities_input`. Een gedeclareerde invoerlijst zonder
   `audio` is `false`; bij geen bewijs van de capability blijft de waarde `null`.
   Zowel `false` als `null` activeert de conservatieve bridge, terwijl `true` de
   bridge omzeilt.
2. Los de `modalityBridgeAudio*`-instellingen op en extraheer invoegbare
   audioparts op het topniveau uit elk bericht via de gedeelde
   `detectMediaParts()`-detector. Ondersteunde wire-vormen zijn OpenAI
   `input_audio`, `audio_url` en `source.media_type: "audio/*"`. Geneste audio
   wordt gedetecteerd voor routing, maar niet verwijderd door het splice-pad. De
   hoeveelheid werk wordt begrensd door `modalityBridgeAudioMaxClips`; latere
   parts blijven onaangeroerd.
3. Respecteer een geconfigureerde `provider/model`, of laat
   `selectAudioBridgeModel()` `AUDIO_TRANSCRIPTION_PROVIDERS` in stabiele
   catalogusvolgorde doorlopen en het eerste model selecteren met een bruikbare
   actieve provider-credential.
4. `callAudioTranscription()` converteert base64/data-URI-audio naar een
   multipart-`file`, of downloadt een externe `audio_url` via de public-only
   outbound-guard met DNS-pinning en een grens van 25 MB. Vervolgens POST't het
   het bestand en het geselecteerde model naar de lokale
   `/v1/audio/transcriptions`-self-loop, geauthenticeerd met
   `resolveSelfLoopBearer()`. De bestaande transcription-route voert de normale
   credential-opzoeking, cooldown-/rate-limit-afhandeling en provider-dispatch
   uit.
5. Geslaagde aanroepen vervangen hun parts door `[Audio N]: <transcript>`.
   Aanroepen lopen met `Promise.allSettled`: een individuele mislukking bewaart
   het oorspronkelijke audiopart (#4012-contract). Als elke aanroep mislukt en
   het doel bewezen `supportsAudio === false` heeft, worden de parts
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-contract). Voor
   een onbekend doel (`null`) blijft een volledig mislukt resultaat onaangeroerd.
   Een bewezen tekst-only-doel zonder bruikbare STT-credential ontvangt dezelfde
   expliciete stub zonder een netwerkaanroep te doen.

Geslaagde transcripts gebruiken de procesbrede Modality Bridge LRU/TTL-cache.
De sleutel combineert de audioreferentie, het stabiele
`audio-transcription`-bewerkingslabel en het geselecteerde STT-model; mislukkingen
worden nooit gecachet. Audiogpogingen werken de gedeelde tellers `bridged`,
`cacheHits`, `failures` en `lastUsedAt` bij. Getransformeerde responses dragen
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; onaangeroerde
requests ontvangen geen Audio Bridge-segment.

Runtime-instellingen worden ondersteund door de database en gevalideerd met Zod:

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

De gedeelde cache blijft beheerd door `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` en `modalityBridgeCacheMaxEntries`.

### Videobrug (`videoBridge.ts`, `videoBridgePipeline.ts`)

Onderschept videodelen op het hoogste niveau in Chat Voltooiingen `messages` en Reacties API `input` voordat een doel zonder bekende native video-ondersteuning wordt aangeroepen. Ondersteunde vormen zijn `input_video`, `video_url`, `video_source`, HTTPS URLs en `data:video/*;base64,...` data URIs. Gewone bestandsnamen in tekst worden niet als video behandeld.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) is eigenaar van de aanvraagtraversal, de capability/policy controle, de aggregatie per aanvraag en de responspayload. — acquisitie per video, de cache van het volledige resultaat, die een framereeks beschrijft (die elk door de beller aangegeven audiotranscript samenvoegt), en metrics/abort/cleanup — per poging is verborgen achter `processVideoPart` in `videoBridgePipeline.ts`, eenmaal aangeroepen per videodeel in de lus van `preCall`. Die module definieert ook de expliciete poortgrenzen `VideoMediaBrokerPort` (het verwerven van bytes en het extraheren van bemonsterde frames), `VideoAudioTranscriptionPort` (het samenvoegen van een door de beller gedeclareerd audiotranscript met de bemonsterde ondertitels) en `VideoDrilldownPort` (de oude vorm van de onbewerkte winkel). Productie STT en frameretentie zijn samengesteld rond de beschrijvende poort via `createVideoSttAdapter` en `createVideoDrilldownAdapter`; de laatste maakt gebruik van de gedeelde ondoorzichtige levenscyclus.

Het openbare `/v1` -verzoekpad importeert of roept nooit een subproces op. Video's op afstand worden gedownload onder een grens van 50 MiB ; inline base64-video's hebben een conservatieve limiet van 36 MiB gedecodeerd per video, zodat de model/messages/framing envelop binnen de openbare JSON verzoektoelatingslimiet van 50 MiB kan blijven. Schattingen van de inlinelengte en de gedecodeerde grootte worden vóór toewijzing gecontroleerd. HTTPS is vereist op de initiële externe URL en elke omleiding, waarbij gebruik wordt gemaakt van de bestaande, alleen voor het publiek toegankelijke, uitgaande bewaker met DNS pinning. De bytes overschrijden vervolgens de exacte interne `POST /api/modality-bridge/video/extract` brokergrens. Die route is zowel `LOCAL_ONLY` als `SPAWN_CAPABLE`, accepteert alleen een per proces geauthenticeerde, vertrouwde loopback-aanvraag en accepteert nooit een URL, een bestandssysteempad, een uitvoerbaar bestand of een lijst met argumenten. De API -pijplijn op lichaamsgrootte en de incrementele body-lezer van de handler dwingen onafhankelijk van elkaar een invoerlimiet van 50 MiB -makelaars af. De begrensde wachtrij voert één extractie tegelijk uit, staat vier openstaande taken toe en beperkt de openstaande invoer tot 100 MiB.

Binnen de makelaar leest `ffprobe` een privé lokaal bestand; De toelatingslijst met een vast formaat sluit afspeellijst- en manifestformaten uit. Voor toegestane containers uit de MOV-familie blijven externe MOV gegevensreferenties standaard uitgeschakeld, en de vaste opdracht meldt zich er niet voor aan. Zowel `ffprobe` als `ffmpeg` gebruiken de `file` -only -protocol witte lijst, één thread, vaste argumentarrays, geen shell en uitvoerbare bestanden die zijn opgelost vanuit `PATH`. Omslagstreams met bijgevoegde afbeeldingen zijn geen speelbare kandidaten. Alle afspeelbare streams moeten aan de limieten voldoen, en een expliciete standaardstream heeft de voorkeur boven de deterministische fallback met de laagste index. Video's zijn beperkt tot 600 seconden, 8.192 pixels per dimensie en 33.554.432 bronpixels. FFmpeg bemonstert 1–16 middelpunt JPEG frames, schaalt de lange zijde terug naar maximaal 1.024 pixels zonder kleinere invoer op te schalen, en ontvangt nooit een URL. De bemonstering is standaard `uniform`. Het optionele `scene_aware` en experimentele `segment_aware` beleid voert één extra vaste FFmpeg pass uit over de reeds gevalideerde lokale stream, selecteert begrensde `showinfo` -scènetijdstempels en valt deterministisch terug naar dezelfde uniforme middelpunten bij detectorstoring, time-out, verkeerd ingedeelde uitvoer of een lege kandidaatset. De segmentbewuste modus wijst middelpuntsamples proportioneel toe aan de gevalideerde scène-intervallen; segmentbewust bewijs en terugvalgedrag worden hieronder beschreven. De harde 16-frame dop wordt na selectie bij iedere polis toegepast. Wanneer een scènebewust verzoek slechts een budget van één frame heeft, gebruikt het het uniforme middelpunt van het actieve volledige video- of focusvenster en rapporteert het `policyEffective: uniform`: een enkel geselecteerd scèneframe kan niet beide tijdelijke uiteinden behouden. Een beller kan optioneel een eindig focusvenster opgeven (`start`/`end` seconden); grenzen worden beperkt tot de mediaduur, omgekeerde of niet-eindige vensters worden afgewezen en al het bemonsteringsbeleid wordt alleen binnen het genormaliseerde interval uitgevoerd. Het resulterende venster wordt opgenomen in de steekproefmetagegevens en in het niet-vertrouwde beschrijvingsvoorvoegsel, zodat downstream-modellen een specifiek fragment van de volledige tijdlijn kunnen onderscheiden.

Semantische ondertitelingsfocus is een aparte, expliciete instelling. De standaard `full` -analysemodus behoudt de bestaande frameprompt en stuurt de verzoektekst nooit door naar het ondertitelingsmodel. In `focused` modus leest de bridge alleen de nieuwste niet-lege, door de gebruiker geschreven `text`/`input_text` uit dezelfde Chat- of Responses-container, normaliseert deze naar NFC, vouwt controletekens en witruimte samen en beperkt deze tot 500 Unicode-codepunten. Een leeg resultaat valt terug op de exacte `full` prompt. Een bruikbare hint wordt geserialiseerd als JSON in een speciaal contextblok voor niet-vertrouwde gebruikers en geeft mogelijk alleen prioriteit aan waarneembare details; het kan de afzonderlijke waarschuwing tegen het volgen van instructies die zichtbaar of hoorbaar zijn in de media niet terzijde schuiven. Tekstuele focus leidt nooit `start`/`end` af of verandert de temporele sampler.

#### FU-07 structureel segmentbewijs

`segment_aware` gebruikt één begrensde pre-analyse-passage over de reeds gevalideerde lokale videostream. De vaste filterketen schaalt eerst naar maximaal 320 pixels breed, detecteert scèneveranderingen en bevroren intervallen en bemonstert vervolgens met 1 frame per seconde voor onscherpte, gemiddelde luma en spatial/temporal informatie. De pas is beperkt tot 600 structurele voorbeelden, één FFmpeg/filter thread, hetzelfde `file` -only protocol en dezelfde container-toegestane lijsten, een proces-uitvoergrens van 1 MiB en maximaal 30 seconden binnen de gedeelde abort/deadline. van de makelaar. Het accepteert nooit een opdracht, filter, pad of URL van het verzoek.

De structurele waarden zijn deterministisch steekproefbewijs en geen semantisch video-begrip. Ze leiden geen onderwerpen, acties, bijschriften, spraak of gebruikersintentie af. Scène- en bevriezingsgrenzen vormen segmenten; bevriezing van de dekking, onscherpte, belichting, ruimtelijke details en temporele veranderingen hebben alleen invloed op de manier waarop het bestaande budget van 1–16 frames wordt toegewezen. Een volledig bevroren segment is beperkt tot één frame, terwijl niet-bevroren segmenten strijden om het resterende budget. Wanneer er meer grenzen zijn dan frames, blijft de uniforme tijdlijndekking behouden, zodat snelle vroege bezuinigingen een lang achterliggend segment niet kunnen verbergen. Scènegrenzen binnen de analyseresolutie van 1 seconde van een bevriezingsgrens worden samengevoegd.

Ontbrekende filters, malformed/empty -bewijsmateriaal, een detectorfout of de begrensde time-out vóór de analyse mislukken bij het exacte uniforme middelpuntbeleid. Een caller abort of broker deadline faalt niet bij het openen: het beëindigt het in-flight subproces, voorkomt latere frame-extractie en de persoonlijke tijdelijke boom wordt verwijderd in `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genereert deterministische reële FFmpeg regelingen voor post-dedup caption-call-besparingen, budgettoewijzing met hoge resolutie, blur/exposure/SI-TI bewijsmateriaal, snelle bezuinigingen met een lange staart en geleidelijk vervagende valse positieven. Het registreert de pre-analyse wandtijd en, waar `/usr/bin/time` beschikbaar is, kind CPU en piek RSS. De kwaliteitscontroles zijn slechts structurele orakels. De echte kwaliteit van het onderschriftmodel blijft `HOLD` omdat dit harnas geen geautoriseerd eindpunt of bevroren rechter heeft. De monetaire besparingen blijven ook `HOLD` tenzij `--caption-cost-per-call-usd` een expliciete positieve schatting per oproep geeft; het script verzint nooit een van beide resultaten.

Elk frame is beperkt tot 4 MiB, alle onbewerkte frames samen tot 23 MiB, en de geserialiseerde brokerreactie tot 32 MiB. Een persoonlijke tijdelijke map wordt verwijderd in `finally`. OmniRoute bundelt FFmpeg niet en accepteert geen aangepast uitvoerbaar pad. Vóór de ondertiteling past de bridge een conservatieve visuele deduplicatiepas toe: elke JPEG wordt gereduceerd tot een 16 × 16 grijswaardenbuffer en wordt alleen vergeleken met het laatste behouden frame. Voor een aangevraagd ondertitelingsbudget boven één frame levert extractie een begrensde kandidatenpool op van maximaal tweemaal dat budget en nooit meer dan 16 frames. Het gevraagde plafond wordt pas toegepast na deduplicatie, waarbij de eerste en de laatste geselecteerde kandidaten behouden blijven tijdens de definitieve uitdunning wanneer het budget minimaal twee bedraagt. Het `grayscale-16x16-mean-cells-v2` beleid met versiebeheer gebruikt de grootste van de gemiddelde luma-delta en de verhouding van miniatuurcellen waarvan de genormaliseerde delta ten minste 0,05 is. De duplicaatdrempel is de constante 0,04, gekozen vanwege voorspelbaarheid in plaats van weergegeven als runtime-instelling. Dit secundaire signaal met hoog contrast behoudt kleine bewegingen en zichtbare tekstveranderingen die bij een gemiddelde vergelijking verborgen kunnen blijven. Comparator- of decoderfouten kunnen niet worden geopend en de dekking blijft behouden. Uitvoermetadata scheidt geëxtraheerde kandidaten, succesvol gebruikte frames en verwijderde visuele duplicaten.

Voor een expliciet gemarkeerd videodeel kan om een contactblad met tijdstempel worden gevraagd. De brug bouwt maximaal een JPEG raster met 4 kolommen en 16 frames. Elke cel van 512 pixels brandt zijn brontijdstempel in een contrastrijke onderste band, terwijl dezelfde tijdstempels in tekstuele metadata blijven staan voor verdere associatie en audit. De volledige JPEG blijft beperkt tot 32 MiB. Als `sharp` het raster niet kan decoderen of samenstellen, valt de brug terug op de individuele JPEG frames; het afbreken van een client plant zich nog steeds voort via de bladbewerking.

Het promotiebewijs is bewust gescheiden van de microbenchmark voor synthetische samenstellingen. `scripts/perf/video-bridge-contact-sheet-eval.ts` definieert een A/B harnas met schemaversie voor echte OpenAI-compatibele zichtmodellen. Het meet door de provider gerapporteerde tokens, end-to-end wall-latentie (inclusief bladsamenstelling), aantal modelaanroepen en door manifest gedefinieerde feitenretentie. De ruwe modelreacties worden niet naar het rapport geschreven; alleen SHA-256 -samenvattingen en gematchte feiten IDs blijven behouden. Het harnas maakt geen netwerk- of betaalde modeloproep tenzij `--execute-real` wordt doorgegeven en `--model`, `OMNIROUTE_BASE_URL` en `OMNIROUTE_API_KEY` zijn geconfigureerd. Zonder die expliciete echte run blijft het machinaal leesbare oordeel `HOLD`; synthetische payload/call-count -metingen alleen zijn geen promotiebewijs.

Bellers kunnen een optionele `transcript.cues` array aan een ondersteund videogedeelte koppelen als ze al over uitgelijnde tekst beschikken. Elke cue moet `text` bevatten, een eindig `start`/`end` -interval binnen de onderzochte duur, en een op de witte lijst geplaatste `source` (`client`, `embedded` of `audio-bridge`); `confidence` is standaard `1` en moet tussen `0` en `1` blijven. Exacte dubbele aanwijzingen zijn samengevouwen. OmniRoute start nooit de transcriptie van deze metagegevens: gevalideerde aanwijzingen worden gekopieerd naar het beschreven resultaat met bron, betrouwbaarheid en interval, en worden weergegeven als niet-vertrouwde observaties naast de framebijschriften. Ongeldige, buiten het bereik vallende of herkomstvrije tekst wordt afgewezen in plaats van gemengd in de ondertitelingsstroom. Beide transcriptiekanalen voor de verzoektekst normaliseren de geleverde herkomst naar `client`, inclusief zelfbevestigde `embedded` of `audio-bridge` labels. Alleen een adapter die eigendom is van een server kan deze vertrouwde labels toewijzen via het `trustedSource` -argument; een verzoek JSON veld kan dat argument niet bereiken. Transcriptietekst blijft onbetrouwbare, uit de media afkomstige inhoud, ongeacht de herkomst ervan, en mag nooit bepalend zijn voor autorisatie.

Een gevorderde beller kan een `audioTranscript` track voor dezelfde video opgeven; het wordt behandeld als door de client verstrekte tekst en niet als bewijs van servertranscriptie. De fusienaad voert visuele en audio-observaties uit binnen één deadline en breekt het signaal af, rangschikt ze op een gemeenschappelijke tijdlijn, vouwt exacte duplicaten samen en rapporteert een gedeeltelijk resultaat wanneer slechts één kant slaagt. Een ongeldige `audioTranscript` degradeert tot dat gedeeltelijke resultaat — de visuele beschrijving blijft behouden en de audiotak neemt een opgeschoonde foutcode — op in plaats van dat de hele video mislukt. De beschikbaarheid per vestiging, de gedeeltelijke vlag en de opgeschoonde foutcodes blijven behouden in het beschreven resultaat, in de metagegevens van de vangrail (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), in de metagegevens van de resultaatcache en in de brugfusietellers. Het standaard Video Bridge-pad roept geen spraak-naar-tekst op en downloadt geen tweede mediakopie; zonder dat expliciete nummer blijft het alleen video.

**Transcriptretentie (#12150 P1).** Dit is automatisch van toepassing wanneer de Video Bridge (zelf opt-in) een transcriptiesignaal geeft. — er is geen aparte retentievlag. Wanneer een verzoek een transcriptiecue weergeeft (een door de beller aangegeven `transcript` of een gefuseerde `audioTranscript`), markeert de vangrail deze `videoBridgeObserved` en produceert een geredigeerde schaduw van de videobeschrijving — een identieke weergave waarin de vrije tekst van elke cue wordt vervangen door `[redacted-video-transcript]`, opgebouwd door het gestructureerde cue-veld te vervangen voordat de string wordt samengesteld (nooit door de afgeplatte tekst te parseren, dus geen cue-inhoud — vijandig of gewoon, inclusief lichamen die `]` bevatten, zoals `[inaudible]`/`[music]` — kunnen overleven). De aanhoudende vraagtekst van het oproeplogboek verwisselt elk van video afgeleid tekstgedeelte voor die geredigeerde schaduw, geëvenaard door gelijkheid van de inhoud; het `fullText` anker wordt opnieuw gelezen vanaf de voltooide payload van de vangrail vóór de oproep, zodat de match nog steeds slaagt nadat latere kettingvangrails (de PII en inlogmaskers, prioriteiten 10/95) de beschrijvingstekst op zijn plaats hebben herschreven en nadat system-prompt/handoff/memory injectie de berichtenarray opnieuw heeft vormgegeven. Het lichaam dat stroomopwaarts naar het model wordt gestuurd, is ongewijzigd. Een waargenomen verzoek vult ook geen duurzaam geheugen (zowel de op verzoek als op het antwoord gebaseerde extractie wordt overgeslagen), zodat het eigen antwoord van het model de transcriptietekst niet in het geheugen kan echoën.

**Ruwe videovelden (#12430).** Wanneer de bridge is ingeschakeld en native video-ondersteuning onbekend of afwezig is, activeren gedefinieerde `transcript`/`audioTranscript` -velden ook `videoBridgeObserved`, zelfs na een beschrijvingsfout of een `maxVideos` limiet. `null` en lege strings tellen mee; afwezige velden en niet-video-metagegevens niet. Bewaarde kopieën redigeren deze velden of laten het verzoek weg, en caches/Memory wordt omzeild.

Op deze terugvalpaden worden geldige caller-cues ondersteunde `text`/`input_text` onderdelen in plaats van niet-standaard providervelden. Beide op verzoek aangeleverde tracks blijven onbetrouwbare `client` observaties, met een expliciete waarschuwing dat de video niet is beschreven en dat tijdstempels niet zijn geverifieerd aan de hand van de media. De bestaande 256-cue/64-KiB totaal- en per-cue-budgetten gelden voor de twee sporen samen; tijdstempels moeten passen bij het plafond van 600 seconden van de makelaar en het eventuele geleverde focusvenster. Ongeldige nummers worden verwijderd en niet doorgestuurd als willekeurige tekst; een geldige broer of zus mag nog steeds worden gebruikt, tenzij hun gecombineerde budget wordt overschreden. Null/empty -velden voegen geen tekst toe. Door deze fallback wordt geen media-ophaal- of transcriptie toegevoegd. Transcriptextensievelden worden verwijderd uit de fallback-videodrager en zijn `video_url`/`source` -objecten. De toelatingslijst voor OpenAI -overboekingen blijft streng; onbekende native videodragers blijven beschikbaar en bekende alleen-tekstdoelen behouden veilige markeringen. Gestructureerde redactieschaduwen beschermen de toegevoegde transcriptietekst, terwijl het oorspronkelijke verzoek van de beller ongewijzigd blijft. Door native ondersteunde doelen en uitgeschakelde bruggen behouden hun bestaande bypass-gedrag.

Extra bewaarde kopieën gebruiken hetzelfde waargenomen verzoeksignaal. De onbewerkte momentopname van klantverzoeken vóór de guardrail, in het geheugen hangende verzoeken en het logbestand met vroege afgewezen verzoeken vervangen structureel transcriptievelden in videodelen; tekenreeksprompts die zijn gesynthetiseerd door pijplijnfasen en contextoverdracht worden geredigeerd bij de persistent-request-body-sink. De aanhoudende `video_content_removed` markering zorgt ervoor dat `previous_response_id` voortzetting mislukt, in plaats van tekst te reconstrueren die opzettelijk is weggegooid. Als een geobserveerd verzoek zijn redactieschaduw per onderdeel verliest vóór het loggen, of zelfs een van de verschillende videoschaduwen niet overeenkomt na latere verzoekmutaties, wordt de bewaarde verzoektekst volledig weggelaten in plaats van een gedeeltelijk geredigeerd transcript te behouden.

Voor een geobserveerd verzoek kan een modelantwoord elk deel van het transcript citeren zonder een gestructureerde cue-grens. De aanhoudende oproeplog `responseBody` wordt daarom vervangen door een weglatingsmarkering; het gedetailleerde pijplijnartefact (dat upstream/client lichamen en stream-brokken kan omvatten) blijft niet behouden. Semantische, idempotency- en redeneer-replay-caches omzeilen lees- en schrijfbewerkingen voor dat verzoek. Het verzoek van de aanbieder en het voor de klant zichtbare antwoord blijven ongewijzigd. Vroege keepalive-bytes worden uit de tijdelijke buffer afgevoerd wanneer het gedetailleerde artefact wordt weggelaten. De misvormde EventStream -waarschuwing van Kiro rapporteert alleen het aantal bytes van de payload, nooit de inhoud ervan of de onbewerkte fout van de JSON parser. Dit betekent niet dat elke niet-gerelateerde provider/plugin diagnostiek is gecontroleerd; de bredere 'retained-sink sweep' wordt bijgehouden in #11658.

De interne `/api/modality-bridge/video/drilldown` levenscyclus is een afzonderlijk loopback/token-authenticated cachesubstraat. Elke bewerking vereist ook een canonieke ondoorzichtige hoofdsom ID. Voordat een productieaanroeper wordt ingeschakeld, moet deze de ID afleiden van de geverifieerde tenant en mag deze nooit een door de client geselecteerde waarde doorsturen. Cachesleutels binden die hoofdpersoon aan de canonieke sessie en videoreferentie IDs, slaan alleen hun SHA-256-derived sleutels op en reiken zowel lees- als verwijderingshandelingen aan dezelfde hoofdpersoon. De cache slaat maximaal 16 afgeleide JPEG frames per invoer op, laat deze na tien minuten verlopen en ondersteunt begrensde `start`/`end` -leesbewerkingen of het expliciet verwijderen van sessies.

Elke opdrachtgever is beperkt tot 16 inzendingen en 64 MiB aan canonieke JPEG gegevens. Deze limieten zijn onafhankelijk van het mondiale 64-entry/256 MiB plafond: door de druk van de hoofdquota worden alleen de minst recentelijk gebruikte vermeldingen van de hoofddirecteur uitgezet voordat een mondiale LRU uitzetting wordt overwogen. Verlopen vermeldingen worden bij cache-activiteit uit zowel de hoofdboekhouding als de globale boekhouding verwijderd, terwijl annulerings- en validatiefouten geen gedeeltelijke vervanging tot gevolg hebben.

De cache verwerpt niet-canonieke Base64, overtollige opvulling, niet-JPEG-media, misvormde of afgeknotte JPEGs en JPEGs die een waarschuwing produceren tijdens een begrensde `sharp` decodering van het volledige beeld. Het codeert elke geaccepteerde afbeelding opnieuw als een canonieke JPEG, leidt de breedte en hoogte af van de gedecodeerde bytes in plaats van te vertrouwen op bellervelden, en verwijdert alle achterliggende polyglotte bytes in plaats van ze vast te houden. Alleen de begrensde canonieke gecomprimeerde buffer wordt in rekening gebracht voor beide quota. De JSON draadlimiet omvat Base64-overhead voor het plafond van 32 MiB -gedecodeerde invoer. Elke opgeslagen afleiding registreert de gevalideerde JPEG format/resolution, het bemonsteringsbeleid, de afleidingsversie, de aanmaaktijd, de door de server berekende inhoudhash en de gehashte ouderreferentie plus de bovenliggende inhoudhash van de vertrouwde beller. Annulering wordt gecontroleerd tussen asynchrone decode/hash fasen vóór de atomaire cache-commit.

De productieproducent hergebruikt reeds afgeleide brokerframes alleen na succesvolle visuele analyse, zonder tweede video download/extraction. Hiervoor zijn operator `modalityBridgeVideoDrilldownEnabled=true`, strikte `drilldown: true` per onderdeel en een geverifieerde API-sleutelrecord ID vereist. Door de klant aangegeven principal/session waarden vestigen nooit eigenaarschap. Zonder alle drie de voorwaarden worden er geen extra frames gehasht, vergroot of verkleind. Retentiefout behoudt de bruikbare visuele respons. Toegestane verzoeken omzeilen de cache van de volledige videoresultaten, zodat in de cache opgeslagen resultaten nooit opnieuw worden afgespeeld.

Succesvolle JSON en SSE reacties geven maximaal vier ondoorzichtige handvatten weer in de begrensde `x-omniroute-video-drilldown` header. Geautoriseerde browseroorsprongen kunnen die header lezen zonder het CORS oorsprongsbeleid te verbreden. Nieuwe handvatten gebruiken `v1.<32-byte random base64url token>` en het register behoudt alleen hun SHA-256 hashes. De reader/header parser accepteert ook oudere 64-hex-tokens. De geauthenticeerde publieke consument is `GET /api/v1/video-bridge/drilldown?handle=...`, onafhankelijk gegated door `modalityBridgeVideoDrilldownRemoteEnabled=true`. Expliciete aanhoudende valse toegang wordt ingetrokken, zelfs als de oudere `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback is ingeschakeld. Productiebehoud heeft de analoge erfenis `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Beide fallbacks zijn standaard uitgeschakeld.

De consument ontleent het eigendom aan de geauthenticeerde sleutel en past het sleutelbeleid toe: zowel GET als DELETE behoren tot de `video` eindpuntcategorie, inclusief de `/v1` en `/api/v1` aliassen. Sleutels met een niet-lege toelatingslijst voor eindpunten moeten `video` bevatten; onbeperkte sleutels blijven compatibel. De consument retourneert dezelfde 404 voor onbekende, verlopen en de handvatten van een andere sleutel. Het accepteert `variant=preview|standard|detail` (maximale JPEG dimensie 320/640/1280, nooit opgeschaald), `limit=1..8` (of de oude `frames` alias, nooit beide), op nul gebaseerde `page` en optionele `start`/`end` focusseconden. Dubbele zoeksleutels en vensters met omgekeerde focus worden afgewezen. Elke geretourneerde variant heeft een hash van de feitelijke inhoud en metagegevens van de werkelijke resolutie, gekoppeld aan de bewaarde bron. Varianten worden afgeleid bij het lezen in plaats van opgeslagen als extra bewaarde kopieën. De JSON respons, inclusief Base64/envelope, is beperkt tot 32 MiB; een te grote pagina retourneert 413 en de klant moet minder frames aanvragen. Leest de annulering van de cheque rond elke formaatwijziging en controleert de geldigheid van de afhandeling opnieuw voordat deze wordt geretourneerd. `DELETE` door eigenaar is idempotent; verwijdering of TTL vervaldatum geeft de bewaarde bron- en gebruiksboekhouding vrij.

De gedeelde opslag is proceslokaal: handvatten vervallen bij opnieuw opstarten en zijn niet overdraagbaar tussen onafhankelijke OmniRoute processen. Managementstatistieken leggen effectief retentie-/remote-beleid bloot en aggregeren alleen bewaarde entries/bytes, nooit media, referenties, IDs of handvatten. Het paneel Video-instellingen toont deze waarden en kan beide toestemmingsschakelaars behouden. Deze implementatiedocumentatie is geen live-implementatie- of promotiebewijs; Acceptatie van echte modellen wordt afzonderlijk bijgehouden.

Frames worden opeenvolgend ondertiteld met het geconfigureerde videomodel. Een lege Video-overschrijving neemt de Vision-instelling over; als beide leeg zijn, selecteert de Vision auto-router het effectieve vision-compatibele model. Succesvolle bijschriften vervangen het originele gedeelte door een stabiel `[Video description:` voorvoegsel dat de tekst ook markeert als een niet-vertrouwde, uit de media afkomstige observatie en dat stroomafwaartse modellen vertelt dat ze de instructies in de media niet moeten volgen. Cachesleutels voor framebijschriften omvatten de JPEG bytes, prompt, tijdstempel en effectief model; alleen succesvolle ondertiteling wordt in de cache opgeslagen. Cache-items behouden het feitelijk succesvolle producentenmodel, inclusief een fallback-model; de brug rapporteert `mixed` wanneer verschillende frames door verschillende modellen zijn geproduceerd. Een cachehit hergebruikt de identiteit van de producent in plaats van deze opnieuw te labelen als het aangevraagde routeringsplan. De volledige video-resultaatcache wordt ingetoetst op elke invoer die de uitvoer — prompt, het effectieve model, het bemonsteringsbeleid, het aantal frames, de semantische analysemodus, de SHA-256 vingerafdruk van de genormaliseerde focushint, het focusvenster, `transcript`, `audioTranscript` en de contactbladvlag — verandert, dus het veranderen van een van deze dimensies is een cache-misser en nooit een oud hergebruik. De visuele versie van het dedup-beleid, de drempelwaarde en het begrensde aantal kandidaatframes zijn ook expliciet in de resultaatcachesleutel en metagegevens; een beleidswijziging kan daarom geen verouderde volledige videobeschrijving hergebruiken. Result-cache v4-metagegevens behouden de modus en vingerafdruk, nooit de onbewerkte gebruikerstaak. Guardrail-metagegevens rapporteren zowel de gevraagde als effectieve analysemodi; een aangevraagde `focused` modus zonder bruikbare gebruikerstekst wordt effectief gerapporteerd als `full`.

De guardrail haalt elk ondersteund videodeel eruit, maar beschrijft niet meer dan `modalityBridgeVideoMaxVideos`. Voor een doelwit waarvan is bewezen dat het `supportsVideo === false` heeft, worden mislukte video's en video's met overlimiet expliciete veilige tekstmarkeringen, zodat geen onbewerkte video overleeft. Als de capaciteit onbekend is, behouden die delen hun videodrager; elk fallback-transcript volgt de bovenstaande begrensde tekstconversie. Doelwitten met `supportsVideo === true` omzeilen de brug. Het signaal voor het afbreken van het clientverzoek wordt doorgegeven via downloads, makelaarswachtrijen, subprocessen en ondertitelingsoproepen; breekt de stop af tussen video's en faalt nooit open voor onbewerkte media.

Runtime-instellingen worden ondersteund door DB en Zod-gevalideerd:

| Sleutel                             | Standaard   | Bereik / gedrag                                                                                                                |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Optionele runtime, opt-in                                                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` behoudt generieke ondertitels; `focused` maakt gebruik van begrensde, niet-vertrouwde context van de nieuwste gebruiker |
| `modalityBridgeVideoModel`          | `""`        | Neem het Vision Bridge-model over                                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` of proportionele `segment_aware`; detectorfout valt terug naar `uniform`                              |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120.000 ms                                                                                                                |

Verouderde waarden blijven bestaan Videotime-outwaarden van meer dan 120 seconden worden beperkt tot de deadline van de broker; nieuwe instellingen die boven die limiet schrijven, worden afgewezen. `GET /api/modality-bridge/video/runtime` vereist een vertrouwde, gestempelde loopback-locatie vóór authenticatie of runtime-onderzoek, en vereist vervolgens beheerverificatie. Het retourneert alleen `available`, opgeschoonde FFmpeg/ffprobe versies en een vaste reden waarom de runtime niet beschikbaar is. Het interne extractie-eindpunt is geen openbare upload API: wachtrijverzadiging retourneert `503` plus `Retry-After`, een aanroeper die de verbinding verbreekt retourneert `499`, en de vaste brokerdeadline retourneert `504`. Geconverteerde antwoorden voegen `video->text;model=<visionModel>;parts=<videos>` toe aan de centrale `x-omniroute-modality-bridge` header zonder Vision- of Audio-segmenten te verwijderen.

### PII masker (`piiMasker.ts`)

Loopt door **beide** stadia.

- **`preCall`** kloont de payload, loopt door `system`, `messages`, `input` en `prompt` (inclusief gewone stringitems) en past `processPII()` (van `@/shared/utils/inputSanitizer`) toe op string `content`/`text` velden. Wanneer `PII_REDACTION_ENABLED=true` wordt gedetecteerd, wordt PII geredigeerd in de uitgaande payload. Dit staat los van `INPUT_SANITIZER_MODE` (dat alleen het prompt-injectiebeleid controleert). Wanneer redactie is uitgeschakeld, telt de detectie van gespreksrecords zonder dat de inhoud wordt herschreven.
- **`postCall`** kloneert het antwoord diep, voert `sanitizePIIResponse()` uit plus het Responses-API-vormmasker (`maskResponsesOutput` — omvat `output_text` en `output[].content[].text`). Als er sprake is van redactie, vervangt het gewijzigde antwoord het origineel.

De vangrail blokkeert nooit; het annoteert alleen (`meta.detections`, `meta.redacted`) of herschrijft.

#### Selectie per type, aangepaste patronen en detectietellers

**Dashboard → Instellingen → Beveiliging → PII maskering** kiest _wat_ wordt gemaskeerd. Het schakelt de maskering niet in: dat is nog steeds `PII_REDACTION_ENABLED` (verzoek) en `PII_RESPONSE_SANITIZATION` (antwoord + SSE), beide standaard uitgeschakeld.

- **Selectie per type** — De ingebouwde ID's worden vermeld in `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Niet ingesteld betekent elk type (het gedrag voordat deze instelling bestond). Het `ssn_us` -patroon van de aanvraagengine wordt toegewezen aan `ssn`. Sjablonen (Minimaal, Standaard, Financieel, Braziliaans, USA, GDPR, POPIA, Volledig) vullen alleen de selectievakjes in de UI in.
- **GDPR en POPIA ID's** — twaalf ingebouwde ID's voor EU en Zuid-Afrikaanse persoonlijke identificatiegegevens (tabel hieronder). Hun regexes, validators en jurisdictietags bevinden zich in één tabel, `src/shared/utils/piiPatterns.ts`, die zowel de response sanitizer (`src/lib/piiSanitizer.ts`) als de request mask (`src/shared/utils/inputSanitizer.ts`) gebruiken. Een match wordt alleen geredigeerd als de validator deze accepteert; een enkele reeks cijfers is nooit genoeg. Een operator die een beperkte selectie heeft opgeslagen voordat deze ID's bestonden, behoudt het gedrag dat hij had totdat de nieuwe ID's zijn aangevinkt.
- **Aangepaste patronen** — maximaal 20 regex- of jokertekenpatronen (`*` = maximaal 64 niet-witruimtetekens, `?` = één). Wedstrijden worden `[CUSTOM_REDACTED]`. Elk patroon gaat door `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): maximaal 500 tekens, vlaggen beperkt tot `g i m s u`, moeten compileren, moeten `safe-regex` passeren (catastrofale backtracking) en mogen niet overeenkomen met een lege tekenreeks of een tijdelijke aanduiding voor redactie. Een patroon dat faalt, wordt geweigerd wanneer het wordt opgeslagen en getest, en een opgeslagen rij die faalt, wordt tijdens runtime overgeslagen in plaats van te worden gecompileerd. Aangepaste patronen worden alleen uitgevoerd als maskering is ingeschakeld.
- **Detectie tellers** — telt per type (nooit overeenkomende waarden), vastgehouden in het geheugen en gereset bij opnieuw opstarten (`src/lib/pii/piiDetectionStats.ts`). Ze nemen alleen maar toe als de maskering is ingeschakeld.

De instellingen bevinden zich in de `key_value` tabel (naamruimte `pii_settings`, `src/lib/db/piiSettings.ts`) en worden gelezen via een cache van 1 seconde. API:

| Methode | Pad                      | Doel                                                                               |
| ------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Status van de vlag, `enabledTypes`, `customPatterns`, detectietellers              |
| `PUT`   | `/api/settings/pii`      | Vervang `enabledTypes` (`null` = alles) en/of `customPatterns`                     |
| `POST`  | `/api/settings/pii/test` | Dry-run van één patroon op een sample van maximaal 8 KB; er wordt niets opgeslagen |

Alle drie vereisen managementauthenticatie en valideren de instantie met Zod (`src/shared/validation/schemas/piiSettings.ts`). Met inloggen uitgeschakeld (`requireLogin=false`) zijn `GET` en het testeindpunt open, maar `PUT` heeft nog steeds een dashboardsessie nodig, een `manage` -scope API -sleutel, een `oma_` toegangstoken met schrijfbereik of hoger, of het CLI -token of interne servicetoken verzonden vanuit loopback.

#### GDPR (EU) en POPIA (Zuid-Afrika) identificatiegegevens

| ID                  | Identificator                    | Validatie                                                                                     |
| ------------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                             | Bekend land, exacte lengte voor dat land, ISO 13616 MOD-97-10                                 |
| `eu_vat`            | EU-btw-nummer                    | Bekend lidstaatvoorvoegsel en het nummerformaat van die staat (geen VIES-opzoeking)           |
| `es_dni_nie`        | Spaanse DNI / NIE                | Controleletter (waarde modulo 23); NIE is `X/Y/Z` + 7 cijfers                                 |
| `it_codice_fiscale` | Italiaanse Codice Fiscale        | Controleletter uit de tabellen voor oneven/even posities                                      |
| `pl_pesel`          | Poolse PESEL                     | Gewogen controlesom en plausibele bereiken voor de gecodeerde geboortemaand/-dag              |
| `nl_bsn`            | Nederlands BSN                   | 11-proef (gewichten 9..2, -1)                                                                 |
| `de_steuer_id`      | Duitse Steuer-ID                 | ISO 7064 Mod 11,10 plus de regels voor de cijferstructuur (geen eerste 0)                     |
| `se_personnummer`   | Zweeds personnummer              | Luhn over de laatste tien cijfers en een aannemelijke geboortedatum (10 of 12 cijfers)        |
| `za_id`             | Zuid-Afrikaans identiteitsnummer | Luhn over alle 13 cijfers, geldige geboortemaand/-dag, staatsburgerschapscijfer 0 of 1        |
| `za_phone`          | Zuid-Afrikaans telefoonnummer    | Voorvoegsel `+27` / `27`, of de nationale vorm `0..` geschreven met een spatie of koppelteken |
| `za_vat`            | Zuid-Afrikaans btw-nummer        | 10 cijfers beginnend met `4` **en** "VAT" / "BTW" in de 48 voorafgaande tekens                |
| `za_tax_ref`        | Zuid-Afrikaans belastingnummer   | 10 cijfers beginnend met `0`-`3`, Luhn, **en** "tax" / "SARS" in de 48 voorafgaande tekens    |

Omdat de formaten die alleen uit cijfers bestaan, botsen met bestelnummers, bouwnummers en tijdstempels, hebben de zwakste (`za_vat`, `za_tax_ref`) de trefwoordcue nodig, en een `0..` nummer van tien cijfers wordt niet behandeld als een Zuid-Afrikaans telefoonnummer. Gespreide IBANs (`GB29 NWBK ...`) komen niet overeen. Op het streamingpad wordt de cue alleen binnen het huidige segment opgezocht. De ID's liggen vóór de generieke telefoonpatronen, dus een gevalideerde ID behoudt zijn eigen tijdelijke aanduiding (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). De `gdpr` en `popia` sjablonen selecteren respectievelijk de EU en Zuid-Afrikaanse ID's. Het maskeren zelf blijft opt-in (Hard Rule #20): niets verandert hier de standaardfunctievlag.

### Prompt-injectie (`promptInjection.ts`)

Detecteert kwaadwillende structuren in door de gebruiker aangeleverde inhoud en
handhaaft het geconfigureerde beleid. Het gedrag wordt gestuurd door
omgevingsvariabelen en constructor-opties:

| Instelling      | Env-var                                                                                              | Standaard | Effect                                                                                                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ingeschakeld    | `INPUT_SANITIZER_ENABLED`                                                                            | `true`    | Bij `false` wordt de guardrail overgeslagen.                                                                                                                                                                                          |
| Modus           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`    | Injectiebeleid: `block`, `warn` of `log`. (`redact` wordt geaccepteerd voor achterwaartse compatibiliteit, maar verwijdert injectietekst **niet**; het herschrijven van PII in requests wordt gestuurd door `PII_REDACTION_ENABLED`.) |
| Blokkeerdrempel | `blockThreshold`-optie / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`    | Minimale ernst die nodig is om te blokkeren. Medium is bij de standaardwaarde alleen observeren.                                                                                                                                      |

**Modusprioriteit** (`getMode`): `options.mode` van de aanroeper →
`INJECTION_GUARD_MODE`-**DB-feature-flag-override** (Dashboard → Instellingen →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Een dashboard-override wint dus van de env-vars, zodat de Feature
Flags-UI de actieve guard live stuurt (geen herstart nodig). De DB-lezing is
fail-safe: als die mislukt, valt de guard terug op het env-gebaseerde gedrag,
en wanneer er geen override is ingesteld, is het gedrag identiek aan resolutie
op basis van alleen env.

Detectiebronnen:

1. `sanitizeRequest()` uit `@/shared/utils/inputSanitizer` (gedeelde
   detectorset die ook elders in de pipeline wordt gebruikt).
2. Ingebouwde `DEFAULT_GUARD_PATTERNS` (momenteel `system_override_inline` en
   `markdown_system_block`, beide met ernst `high`).
3. Optionele `customPatterns` die via constructor-opties worden doorgegeven
   (strings, regexes of `{ name, pattern, severity }`-records).

Wanneer `mode === "block"` **en** ten minste één detectie de ernstdrempel bereikt, retourneert `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }`. In de modi `warn`/`log` logt de guardrail wel, maar laat hij de aanroep door. De gedeelde helper `evaluatePromptInjection()` wordt ook geëxporteerd voor aanroepers die prompts moeten evalueren zonder via het register te gaan.

**Scangrens (v3.8.20):** de detector inspecteert alleen de **eerste 16 KB** van de samengevoegde prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) in `src/shared/utils/inputSanitizer.ts`. Zowel `detectInjection()` als `evaluatePromptInjection()` voeren `slice(0, MAX_INJECTION_SCAN_BYTES)` uit voordat de patroonlus wordt gestart. Injectie-instructies bevinden zich doorgaans bovenaan een invoer, dus dit begrenst het regex-CPU-/GC-verbruik bij payloads van honderden kilobytes zonder de detectie te verzwakken (vgl. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Wordt uitgevoerd in **beide** fasen, als laatste in de standaardketen (prioriteit `95`). Maskeert bekende API-sleutel-/geheime-tokenpatronen uit de uitgaande payload (berichtinhoud, argumenten van tool-aanroepen, tool-resultaten) **én** het providerantwoord, zodat een in een prompt geplakte credential (of teruggekaatst door een tool-resultaat) niet uitlekt naar de upstreamprovider of terug naar de client.

- **Alleen opt-in**, dezelfde conventie als PII-maskering (vergelijkbaar met Hard Rule #20): uitgeschakeld tenzij `settings.credentialRedactionEnabled === true` **of**
  `CREDENTIAL_REDACTION_ENABLED=true`. Wanneer uitgeschakeld is de guardrail een no-op — hij blokkeert nooit en herschrijft nooit.
- `redactCredentials()` doorloopt de volledige payload-/antwoordboom (`walkValue()`, beschermd tegen prototype pollution, cyclusveilig via `WeakSet`) en vervangt overeenkomsten door een `[REDACTED:<type>]`-placeholder, waarbij alleen de takken worden gekloond die daadwerkelijk zijn gewijzigd.
- `CREDENTIAL_PATTERNS` dekt LLM-providersleutels (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), betaalsleutels (Stripe, Square), cloudsleutels (AWS-toegangssleutel, Twilio, SendGrid, Mailgun), privésleutels / JWT's, connectiestrings met credentials (`mongodb://user:pass@...`, enz.) en een generiek patroon voor `Authorization`/`x-api-key`/`api-key`/`apikey`-headerwaarden. Sleutels in headervorm (`authorization`, `x-api-key`, `api-key`, `apikey`) worden structureel gemaskeerd (alleen de waarde; schemaprefixen zoals `Bearer `/`Basic ` blijven behouden) in plaats van via de generieke tekst-regex.
- De guardrail blokkeert nooit; hij herschrijft alleen (`modifiedPayload` / `modifiedResponse`) en annoteert (`meta.credentialsRedacted`, `meta.count`).

Regressiebewaking: `tests/unit/credential-masker-guardrail.test.ts`.

## Basiscontract (`base.ts`)

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
  block?: boolean; // true onderbreekt de keten voortijdig
  message?: string; // getoond bij blokkering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // geretourneerd door preCall om het verzoek te herschrijven
  modifiedResponse?: TValue; // geretourneerd door postCall om de respons te herschrijven
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

Een guardrail signaleert "geen wijziging" door `void`, `{}` of
`{ block: false }` te retourneren. Het retourneren van een
`modifiedPayload`/`modifiedResponse` vervangt de waarde die voor
downstream-guardrails door de keten stroomt.
`signal?: AbortSignal` brengt de levenscyclus van de aanroeper mee in de
guardrails. Een afgebroken verzoek is de bewuste fail-open-uitzondering:
mediabridges stoppen het werk en ruimen op zonder onbewerkte media terug te
zetten naar een doel waarvan bekend is dat het deze niet ondersteunt.

## Register (`registry.ts`)

De singleton `guardrailRegistry` biedt:

- `register(guardrail)` — voegt een guardrail toe (of vervangt deze op
  genormaliseerde naam) en sorteert opnieuw op oplopende `priority`.
- `clear()` / `list()` — administratieve hulpfuncties.
- `runPreCallHooks(payload, context)` — doorloopt actieve guardrails, leidt de
  payload door `modifiedPayload` en stopt bij de eerste `block: true`.
- `runPostCallHooks(response, context)` — dezelfde flow aan de responzijde.
- `resetGuardrailsForTests({ registerDefaults })` — wist de status en
  registreert optioneel de standaardwaarden opnieuw voor een schone testisolatie.

Beide runners retourneren `{ blocked, payload|response, results, guardrail?, message? }`,
waarbij `results` een array is van `GuardrailExecutionResult`-records met per
guardrail de velden `blocked`, `skipped`, `modified`, `error` en `meta`,
nuttig voor tracering.

### Guardrails per verzoek uitschakelen

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` verzamelt een
gededupliceerde lijst van guardrail-namen die voor het huidige verzoek moeten
worden overgeslagen. Er zijn vijf kanalen, die in deze volgorde worden gelezen
en worden samengevoegd tot één lijst (bij het dedupliceren wint de eerste
voorkoming):

1. `apiKeyInfo.disabledGuardrails`
2. Verzoekbody `disabledGuardrails` (toplevel)
3. Verzoekbody `metadata.disabledGuardrails` (alleen wanneer `metadata` een object is)
4. Header `x-omniroute-disabled-guardrails`
5. Legacy-header `x-disabled-guardrails`

Alle vijf kanalen worden samengevoegd, inclusief de twee headers: het verzenden
van zowel `x-omniroute-disabled-guardrails` als `x-disabled-guardrails` slaat
de unie van hun lijsten over, en een lege moderne header verbergt de
legacy-header niet langer
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), opgelost in
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Waarden mogen arrays van strings zijn of een kommagescheiden string; namen
worden getrimd en genormaliseerd naar kleine letters in kebab-case
(`pii_masker` → `pii-masker`), en lege items worden verwijderd. Het resultaat
wordt via `context.disabledGuardrails` doorgegeven aan het register, dat
overeenkomende guardrails overslaat (`skipped: true` in `results`).

De uitschakellijst heeft alleen invloed op het **register**. De `block`-modus
voor promptinjectie is een verplichte grens: de injectieguard-middleware
(`src/middleware/promptInjectionGuard.ts`) roept `evaluatePromptInjection()`
aan zonder enige door de aanroeper beheerde uitschakellijst (de dode aanroep
`resolveDisabledGuardrails({ body })` die deze vroeger deed, is verwijderd in
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), dus een
verzoek dat `prompt-injection` uitschakelt wordt in `block`-modus nog steeds
geweigerd. Dit is een bewuste ontwerpkeuze. De uitschakelkanalen worden beheerd
door de aanroeper (verzoekbody, metadata, headers), en een aanroeper mag niet
in staat zijn een beveiligingsmaatregel uit te schakelen die de operator heeft
ingesteld
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). De
header-unie uit [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
wijzigt alleen welke register-guardrails worden overgeslagen; een client kan
daarmee de middleware niet omzeilen. Verplichte guardrail-beleidsregels per
sleutel en per groep worden bijgehouden in de v4-RFC
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Zie [Dekking en beperkingen](#coverage-and-limits).

## Uitvoeringsvolgorde

Voor elk verzoek dat via `src/sse/handlers/chat.ts` en
`open-sse/handlers/chatCore.ts` stroomt (de chat-familieroutes die vermeld staan onder
[Dekking en beperkingen](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` bouwt de lijst van over te slaan items op op basis van API-sleutel, body
   en headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` voert guardrails uit in oplopende
   prioriteitsvolgorde:
   - Uitgeschakelde guardrails worden geregistreerd als `skipped`.
   - De `preCall` van elke guardrail kan de payload herschrijven via `modifiedPayload`.
   - De eerste `block: true` onderbreekt de keten onmiddellijk en de handler retourneert
     een guardrail-afwijzingsrespons.
3. De (mogelijk herschreven) payload stroomt door naar combo-routing en
   upstream-dispatch.
4. **Alleen non-streaming:** nadat de respons is samengesteld,
   voert `guardrailRegistry.runPostCallHooks(...)` dezelfde keten uit op de
   respons. `block: true` verwerpt hier de upstream-respons en retourneert HTTP 400. Gestreamde responsen slaan deze stap volledig over.

Guardrails die een fout gooien, worden geregistreerd met `error: <message>` en gelogd via
`logger.warn`, maar de keten gaat door — volgens ontwerp fail-open.

## Dekking en beperkingen

De guardrail-registry is alleen in de chat-pipeline verwerkt. Deze grenzen zijn
vastgelegd door `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` en
`tests/unit/guardrail-pipeline-characterization.test.ts`; pas die tests
bewust aan wanneer het gedrag verandert.

### Waar de hooks draaien

| Hook / controle                     | Draait op                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Verzoeken die worden afgehandeld door `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (en `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, en de Telegram-chatproxy. Ook het dashboard-testendpoint `/api/guardrails/test`. Een pre-call-blokkering retourneert HTTP 400. |
| `runPostCallHooks`                  | Alleen **non-streaming** chatresponsen (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Gestreamde responsen bereiken deze hook nooit.                                                                                                                                                                                                                                                                                                        |
| Streaming-PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), via een pipe gekoppeld in `streamingPipeline.ts` wanneer `PII_RESPONSE_SANITIZATION` aan staat. Het is geen guardrail, dus de uitschakelkanalen hebben er geen invloed op.                                                                                                                                                                                                             |
| Injection-guard-middleware (legacy) | Elke prompt-bevattende `/v1`-route, inclusief de chat-familie (zie [routedekking](#injection-guard-route-coverage--red-team-phase-8--block-d)). Alleen promptinjectie.                                                                                                                                                                                                                                                                               |

### Wat niet gedekt is

- **Media-, embeddings- en dataroutes** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) bereiken de registry nooit. Er draait daar geen
  PII-maskering, credential-maskering of modaliteitsbrug. Hun enige
  controle is de legacy injection-guard-middleware.
- **Gestreamde responsen** krijgen geen post-call-guardrails: geen `pii-masker`- of
  `credential-masker`-post-call, en geen post-call-blokkering. Alleen de streaming-PII-
  transformatie is van toepassing (wanneer `PII_RESPONSE_SANITIZATION` aan staat). Een credential
  die in een gestreamde respons wordt teruggekaatst, wordt niet geredigeerd.
- **Uitschakelkanalen vs. de middleware (volgens ontwerp):** de middleware evalueert
  promptinjectie met een eigen aanroep van `evaluatePromptInjection()`, zonder
  enige door de aanroeper beheerde uitschakellijst door te geven. De `block`-modus is een verplichte
  grens die door de aanroeper beheerde uitschakelingen niet kunnen omzeilen, ook niet op chat-familieroutes
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Het uitschakelen van
  `prompt-injection` slaat alleen de registry-guardrail over.

### Wat een respons vóór de post-call te zien krijgt

Op het non-streaming-pad is de volgorde: geheugenextractie → uitvoering van ingebouwde
tools → post-call-guardrails → exit bij post-call-blokkering → opslag in de semantische cache.

- **Geheugenextractie** en **tool-uitvoering** zien de respons voordat
  post-call-guardrails deze kunnen herschrijven of blokkeren. Sinds
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) voert
  geheugenextractie de geëxtraheerde tekst door `sanitizePII` wanneer
  `PII_RESPONSE_SANITIZATION` is ingeschakeld (zowel streaming als
  non-streaming), maar een respons die post-call later wordt geblokkeerd, is
  dan al aan geheugen en tools aangeboden.
- **De semantische cache** slaat de respons na post-call op, dus slaat deze de
  herschreven respons op, en een geblokkeerde respons wordt nooit gecachet.
  Cache-items zijn per API-sleutel gekoppeld.

## Configuratie

Omgevingsvariabelen die door de ingebouwde guardrails worden gelezen:

| Variabele                             | Gebruikt door             | Effect                                                                                                |
| ------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Stel in op `false` om detectie volledig uit te schakelen.                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Injectiebeleid: `warn`, `block` of `log`. De legacy-waarde `redact` herschrijft injectietekst niet.   |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modus voor de injection guard; tevens een DB-featureflag die de env-vars **overschrijft** (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimale ernst die `MODE=block` afwijst: `high` (standaard), `medium` of `low`.                       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Legacy-alias voor `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Wanneer `true`, worden PII-gegevens in verzoeken gemaskeerd (onafhankelijk van de injectiemodus).     |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Regelt het gedrag van de masker aan de response-zijde.                                                |

De Modality Bridge-guardrails lezen de runtimeconfiguratie uit de door de DB
ondersteunde settings store (`getSettings()`), niet uit env-vars. De primaire
sleutels van Vision zijn
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` en
`modalityBridgeCacheMaxEntries`. De legacy-
`visionBridge*`-sleutels worden alleen geaccepteerd als de gedocumenteerde
read-fallback voor één cyclus; schrijfacties vanuit het dashboard gebruiken de
primaire sleutels. Standaardwaarden en de fallback-resolver bevinden zich in
`src/shared/constants/modalityBridgeDefaults.ts`, met legacy-constanten
behouden in `src/shared/constants/visionBridgeDefaults.ts`.

Audio gebruikt `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` en `modalityBridgeAudioMaxClips`, plus de gedeelde
`modalityBridgeCache*`-instellingen. Audio heeft geen legacy-sleutelfallback,
omdat deze sleutels samen met het Modality Bridge-schema zijn geïntroduceerd.

Video gebruikt `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` en
`modalityBridgeVideoTimeout`, plus de gedeelde `modalityBridgeCache*`-instellingen.
Video is standaard uitgeschakeld omdat FFmpeg/ffprobe optionele operationele
afhankelijkheden zijn en het voorzien van frames van bijschriften latentie en
modelkosten toevoegt.

## Aangepaste guardrails

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

Stappen:

1. Maak `src/lib/guardrails/myGuardrail.ts` aan die `BaseGuardrail` uitbreidt.
2. Implementeer `preCall` en/of `postCall`.
3. Registreer óf bij importtijd (push vanuit `registerDefaultGuardrails`), óf
   roep `guardrailRegistry.register(...)` aan tijdens runtime — het register
   vervangt elke eerdere guardrail met dezelfde genormaliseerde naam.
4. Voeg tests toe onder `tests/unit/` (bestaande voorbeelden:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testen

Gebruik `resetGuardrailsForTests()` tussen tests om vanuit een bekende toestand te beginnen.
Geef `{ registerDefaults: false }` mee om met een leeg register te starten en
alleen de guardrails onder test te registreren. Vision Bridge accepteert dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge biedt de
equivalente aangrijpingspunten voor instellingen, mogelijkheden, STT-modelselectie,
credential-controles en transcriptie. Tests kunnen daardoor beide flows uitvoeren
zonder DB- of netwerktoegang.

## Zie ook

- `src/lib/guardrails/` — implementatie
- `src/shared/utils/inputSanitizer.ts` — gedeelde detector die prompt-injectie-
  en PII-masking mogelijk maakt
- `src/shared/constants/visionBridgeDefaults.ts` — standaardwaarden van Vision Bridge en
  de lijst met geforceerde-bridge-modellen
- `src/shared/constants/modalityBridgeDefaults.ts` — gedeelde Vision/Audio-runtime-standaardwaarden
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonale laag (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — volledige referentie van omgevingsvariabelen

## Routedekking van de injection-guard & red-team (Fase 8 · Blok D)

De injection-guard (`createInjectionGuard` / `withInjectionGuard`) dekt alle routes
die gebruikersprompts accepteren. Hij respecteert `INJECTION_GUARD_MODE` (standaard `warn` = alleen loggen;
`block` = retourneert HTTP 400 `SECURITY_001`).

| Type             | Routes                                                                                                                                               | Standaardmodus |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Tekst (bestaand) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generatief       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Gegevens         | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Tekstextractie (`extractMessageContents`) dekt `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nightly, `nightly-llm-security.yml`):** promptfoo valideert dat elke route
het OWASP-LLM-corpus blokkeert in `INJECTION_GUARD_MODE=block`; garak voert probes uit (slaat over zonder secret).
`moderations` is opgenomen voor consistentie. De blokkeermodus is een verplichte grens: `evaluatePromptInjection()`
negeert de uitschakellijst per request die de middleware doorgeeft, dus `disabledGuardrails` stelt een route
**niet** vrij van deze controle ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

De nightly-workflow (`.github/workflows/nightly-llm-security.yml`, cron + handmatige
dispatch) heeft twee jobs:

- **`promptfoo-guard` (blokkerend)** — voert `promptfoo eval -c promptfooconfig.yaml` uit
  met `INJECTION_GUARD_MODE=block`. Elke vijandige testcase (bijv. "negeer alle
  eerdere instructies…", DAN-achtige jailbreaks) bevestigt dat de respons
  `error.code === "SECURITY_001"` bevat, d.w.z. dat de guard het request daadwerkelijk heeft afgewezen.
- **`garak` (adviserend)** — voert garak `--probes promptinject,dan,leakreplay` uit
  tegen een lokale OmniRoute-instantie (`http://localhost:20128/v1`). Voorwaardelijk aan een
  provider-secret (`PROMPTFOO_PROVIDER_KEY`); slaat netjes over en heeft het achtervoegsel
  `|| true`, zodat het rapporteert zonder CI te laten falen.

De dekking van de guard-helper (`createInjectionGuard` / `withInjectionGuard`)
beslaat elke prompt-bevattende `/v1`-route; prompttekst wordt gehaald uit
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` door
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts`.
