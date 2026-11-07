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

## Ingebouwde leuningen

Het register laadt bij het importeren automatisch zes vangrails in prioriteitsvolgorde (zie `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteit | Naam                | Fase(n)        | Bestand               |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nummers met een lagere prioriteit worden uitgevoerd** Eerst** .

### Visiebrug (`visionBridge.ts`) — Modaliteitsbrug PR-1

Het GLM 5.3-basismodel en `glm-5.3-{low,high,max}` hebben expliciete `supportsVision:false` registry/spec metagegevens. De GLM 5.3 Flash-varianten blijven native vision-modellen. `/v1/messages` route van Claude Code komt binnen in de gedeelde `handleChat` pre-call vangrailketen** voor** Claude-naar-OpenAI-vertaling; geneste `Read` -toolresultaatafbeeldingen moeten worden beschreven of verwerkt voordat de vertaling ze naar OpenAI `image_url` inhoud (#17069) tilt.

Onderschept beelddragende verzoeken gericht op** niet-visiemodellen** en stuurt het hele verzoek om naar een model dat geschikt is voor visie, of vervangt de afbeeldingsdelen door tekstbeschrijvingen die zijn geproduceerd door een configureerbaar visiemodel vóór de stroomopwaartse oproep. Hierdoor kunnen aanbieders van alleen tekst op transparante wijze omgaan met multimodale payloads.

Stroom:

1. Sla dit over als het doelmodel al visie ondersteunt (tenzij het voorkomt in de lijst met geforceerde bruggen `isVisionBridgeForcedModel`).
2. Extraheer afbeeldingsdelen via `extractImageParts(messages)` (`visionBridgeHelpers.ts`), dat delegeert naar de** uniforme mediadetector** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — de enige bron van waarheid gedeeld met het combo-compatibiliteitsfilter. Extractie staat op de toelatingslijst voor de vormen `replaceImageParts` kan terugsplitsen (het extract ↔ vervangt contract): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` en Responses API `input_image`. Overeenkomende afbeeldingen die zijn genest in Claude Code `tool_result.content` en Responses-tooluitvoer worden ook geëxtraheerd en vervangen op hun oorspronkelijke paden; Vormen met alleen indicatoren zijn combofiltermateriaal en worden niet geëxtraheerd. Overslaan als er niets gevonden wordt.
3. Los runtime-configuratie op via `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): nieuwe `modalityBridge*` -instellingensleutels winnen; oudere `visionBridge*` sleutels blijven een** terugval van één cyclus** (terugdraaivenster). Overslaan voordat er media worden gepasseerd als de bridge is uitgeschakeld.
4. Moduskiezer (`modalityBridgeVisionMode`, zie onderstaande tabel) beslist over herrouteren versus beschrijven. Reroute retourneert `modifiedPayload` waarbij alleen `model` is verwisseld, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beschrijf pad: sluit afbeeldingen af op `maxImages`, stel de taakbewuste prompt samen, raadpleeg de beschrijven cache, roep het visiemodel aan** parallel** (`Promise.allSettled`), en injecteer `[Image N]: <description>` -tekstdelen op hun plaats. Een mislukte beschrijving levert `null` op: de onbewerkte afbeelding wordt bewaard voor unknown/vision-capable doelen (#4012), maar a** bevestigde directe target met alleen tekst** of zero-vision combo krijgt een expliciete `(unavailable — no vision-capable provider connected)` tekststub voor elke onbeschreven afbeelding, inclusief gedeeltelijke fouten en afbeeldingen buiten de limiet voor het beschrijven van oproepen (#17069). De bestaande, volledig mislukte combo beschrijft fallback blijft op zijn plaats (#8430).
6. Retourneert `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Moduskiezer (`modalityBridgeVisionMode`)

| Modus      | Standaard | Gedrag                                                                                                                                                                                                                                                                                                                         |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔         | Verouderde heuristiek, onaangeroerd (#6640/#7204): niet-combo/`auto/` modellen worden omgeleid naar het beste visiemodel tenzij het originele model al bruikbare inloggegevens heeft (beschrijf vervolgens); combo-doelen beschrijven altijd.                                                                                  |
| `describe` |           | Beschrijf altijd — het omleidingsblok wordt volledig overgeslagen; het door de gebruiker gekozen model antwoordt altijd.                                                                                                                                                                                                       |
| `reroute`  |           | Omleiding forceren: de bewaker van het model met legitimatie wordt omzeild. De omleiding-** doel** Credential Guard past nog steeds — toe als er geen bruikbaar zichtdoel bestaat, de brug blokkeert met een duidelijke fout in plaats van onbewerkte afbeeldingen te beschrijven of naar een doel met alleen tekst te sturen. |

Geforceerde modi kortsluiting** voor** de automatische heuristische runs; `auto` gedrag is byte-identiek aan de pre-PR-1 vangrail.

#### API-sleutelbereik (`visionBridgeKeyScope.ts`)

Wanneer de API sleutel van de beller `allowedConnections`, quotapools (`allowedQuotas`) of modellen (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`) beperkt, kiest de bridge alleen reroute en beschrijft modellen die de sleutel mag gebruiken, op verbindingen die de sleutel mag gebruiken. De write-aanroep gaat dan altijd door de OmniRoute self-loop met de `x-omniroute-self-loop-key-id` header, dus het ontvangende chatverzoek dwingt het verbindings- en modelbeleid van die sleutel opnieuw af. `enforceApiKeyPolicy()` respecteert die header alleen samen met de self-loop-drager, dus het kan de toegang alleen beperken, en een id die niet wordt opgelost, wordt afgewezen.

Indien voor de sleutel geen zichtmodel is toegestaan, a** bevestigd doel met alleen tekst** wijst het afbeeldingsverzoek lokaal af met een duidelijke HTTP 400 in plaats van afbeeldingsbytes door te sturen naar een incompatibele upstream (#17069). Voor doelen met onbekend of eigen zichtvermogen behoudt het beschrijvingspad zijn eerdere fail-open-gedrag (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Verzoeken zonder sleutel, en sleutels zonder deze beperkingen, gedragen zich precies zoals voorheen.

#### Taakbewuste beschrijvingsprompt (`modalityBridgeVisionTaskAware`)

Standaard** WAAR** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) voegt de tekst van de toe** laatste gebruikersbericht** (afgekapt tot 500 tekens) naar de basisbeschrijvingsprompt, waarbij de beschrijving wordt gestuurd naar wat de gebruiker feitelijk heeft gevraagd (codex-vision-proxy-patroon) en het visiemodel wordt gevraagd zichtbare tekst te transcriberen. Met de vlag uit — of zonder gebruikerstekst — wordt de basisprompt onveranderd gebruikt.

Het eigen OpenAI-compatibele verzoek van de self-loop (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) vraagt altijd onvoorwaardelijk naar `image_url.detail: "high"` —, voor elke caller/provider, niet gepoort op een clientsignaal. Bemonstering met weinig details verslechtert OCR nauwkeurigheid voor precies de teksttranscriptietaak waar deze prompt om vraagt, dus de aanroep van de beschrijving zelf vraagt altijd om hoge details, ongeacht welk detailniveau de oorspronkelijke inkomende aanvraag gebruikte. Dit heeft alleen invloed op de interne beschrijvingsaanvraag; het verandert niets aan de manier waarop OmniRoute de eigen `image_url.detail` van de beller doorstuurt op het primaire verzoek — Deze standaard wordt afzonderlijk toegepast, en alleen voor gedetecteerde OpenCode clients, in `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). De Anthropic -draadformaattak van de beschrijvende zelflus heeft geen `detail` veld en wordt door geen van beide standaarden beïnvloed.

#### Beschrijf output cap (`modalityBridgeVisionMaxChars`)

| Sleutel                        | Standaard | Bereik            |
| ------------------------------ | --------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`       | `0` of 100-50.000 |

`0` (standaard) betekent** geen dop** — De door `callVisionModel()` geretourneerde beschrijving wordt ongewijzigd doorgegeven, waarbij het bestaande gedrag behouden blijft. Elke waarde in het bereik van 100–50000 kapt de beschrijving af met een `…` achtervoegsel voordat deze wordt teruggesplitst als `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Verhoog dit voor OCR -taken met veel details waarbij het stroomafwaartse model de volledige transcriptie nodig heeft; verlaag het tot gebonden tokengebruik op spraakmakende visiemodellen. Het dashboardveld bevindt zich in het paneel Geavanceerd van het tabblad Vision (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) en klemt elke waarde tussen 1 en 99 vast tot op de 100 verdieping, terwijl een expliciete `0` onaangeroerd blijft. — `0` is op zichzelf een geldige Zod waarde (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), en niet slechts de "niet-ingestelde" standaard.

#### Beschrijf cache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache voor het beschrijven van uitvoer, gedeeld in het hele proces. Sleutel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` met lengtevoorvoegselframing (geen veldgrensbotsingen). De modelcomponent is de** geconfigureerd** bridge-model, niet het model dat daadwerkelijk — heeft beantwoord. `callVisionModel` kan intern terugvallen, en het sleutelen per poging zou de cache fragmenteren. Mislukte beschrijvingen worden nooit in de cache opgeslagen. Instellingen:

| Sleutel                         | Standaard | Bereik  |
| ------------------------------- | --------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`    | —       |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000 |

#### Beeldnormalisatie op afstand (self-loop describe/base64 fetch)

Wanneer de brug een** op afstand** afbeelding zelf — de Anthropic beschrijft zelfoproep en de claude-wire-format base64-conversie (`ensureBase64ImagesForClaudeWire`), beide via `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — De resulterende gegevens URI worden doorgegeven door `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) voordat ze worden ingebed in het visiemodelverzoek. Extra grote afbeeldingen worden verkleind naar a** 2048px lange zijde** (overeenkomend met de resize cap OpenAI/Anthropic is al van toepassing op de server), waardoor het uploaden bytes/latency wordt verminderd zonder te veranderen wat het visiemodel ziet. Het formaat wijzigen maakt gebruik van `sharp`, geladen via dynamische import: op een platform waar het oorspronkelijke binaire bestand niet kan worden geladen, `normalizeDataUri()`** gooit nooit** — het valt terug op een passthrough van de originele bytes, dus het describe/base64-conversion pad blijft altijd werken. Niet-afbeeldingsbytes (een ophaalactie die geen decodeerbare afbeelding opleverde) worden ook onaangeroerd doorgegeven. Deze normalisatie is gericht op afbeeldingen die de bridge ophaalt voor zijn eigen zelfoproepende — Deze wordt nooit toegepast op de onbewerkte passthrough-payload van de beller, consistent met het opt-in-only-mutatieprincipe (harde regel #20).

#### Instellingenschema + migratie

De nieuwe `modalityBridge*` sleutels zijn Zod-gevalideerd in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, het `modalityBridgeCache*` trio en de `modalityBridgeAudio*` groep die door de Audio Bridge wordt gebruikt. Migratie `141_modality_bridge_settings.sql` kopieert bestaande oude `visionBridge*` -waarden naar de overeenkomende nieuwe sleutels (idempotent, overschrijft nooit een door de operator ingestelde `modalityBridge*` waarde); de verouderde sleutels blijven geaccepteerd als leesterugval voor één releasecyclus.

#### Transparantie header + statistieken

Beschrijf-getransformeerde reacties dragen `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (gebouwd door `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, gestempeld door `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Omgeleide verzoeken krijgen** Nee** header — de payload bleef onaangeroerd en de modelwissel is al zichtbaar in het `model` veld van de antwoordtekst.

`GET /api/modality-bridge/stats` (management auth, dezelfde laag als `GET /api/settings`) retourneert de in-memory per-modaliteitstellers `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` voor `vision`, `audio` en `video`. `averageLatencyMs` gebruikt `latencySamples`, niet alle pogingen, als noemer; een operatie zonder timing levert geen monster van nul milliseconden op. `bridged` blijft de achterwaarts compatibele alias voor succesvolle conversies; mislukte pogingen verhogen het niet. Tellers worden door het ontwerp opnieuw ingesteld bij het opnieuw starten van het proces (telemetrie, niet boekhouding).

#### Dashboardconfiguratie

De speciale dashboardpagina is `/dashboard/settings/modality-bridge`. De URL-adresseerbare `Vision`, `Audio` en `Video` tabbladen behouden de queryparameters terwijl de `tab` waarde wordt gewijzigd. Op het tabblad Visie vindt u de inschakeling, modus, modelselectie (inclusief de automatische standaard), taakbewuste aanwijzingen, geavanceerde timeout/image/description-length/cache limieten, runtime-tellers en een bewaakt voorbeeldverzoek. Het tabblad Audio is ook live: het toont inschakeling, een STT-only modelkiezer met Auto, timeout/max-clip limieten, audiotellers en een `input_audio` voorbeeldtest. Het tabblad Video is functioneel: het rapporteert de FFmpeg/ffprobe runtimestatus — een van de vier expliciete UI statussen (`unknown` terwijl de probe actief is of niet kon worden voltooid, `restricted` op een niet-loopback dashboardhost waarbij de probe aan de clientzijde wordt overgeslagen, `unavailable` eenmaal onderzocht en als vermist is bevestigd, of `available` met de FFmpeg/ffprobe versies). — houdt de enable/model/frame/video/timeout limieten aan, filtert de modelkiezer op modellen die geschikt zijn voor vision en stelt videotellers bloot.

De voormalige Vision Bridge-kaart onder AI instellingen is een compatibiliteitslink naar de nieuwe pagina; zij bezit niet langer een tweede exemplaar van het formulier. Mediaproviders koppelen ook de workflows Beeld-naar-Tekst en Spraak-naar-Tekst aan de overeenkomstige Modality Bridge-tabbladen zonder de bestaande Spraak-naar-Tekst-speeltuin te verwijderen.

**Bypass voor toelating tot zelflus:** wanneer de write-oproep door OmniRoute's eigen `/v1` self-loop (niet-standaard providermodel) gaat, verzendt het subverzoek `x-omniroute-admission-bypass: internal` en wordt geauthenticeerd met de opgeloste self-loop-referentie — de lokale `sk_omniroute` schildwacht in lokale modus, of de door de operator geconfigureerde `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env-sleutel (#1350), zodat `REQUIRE_API_KEY=true` implementaties nog steeds de beschrijven-oproep kunnen uitvoeren. De bypass wordt alleen gehonoreerd voor die exacte inloggegevens, dus externe clients kunnen de header niet gebruiken om de toegang over te slaan.

Oude wanbetalingen leven in `src/shared/constants/visionBridgeDefaults.ts`; de nieuwe mode/task-aware/cache standaardwaarden en de instellingenresolver zijn live in `src/shared/constants/modalityBridgeDefaults.ts`. De vangrail stelt een `deps` constructoroptie bloot, zodat tests nep- `getSettings` en `callVisionModel` implementaties kunnen injecteren.

### Audiobrug (`audioBridge.ts`) — Modaliteitsbrug PR-3

Onderschept chatverzoeken met audio voordat ze een doel bereiken waarvan niet bekend is dat het audio-invoer accepteert. Het chatverzoek wordt nooit omgeleid: audiodelen worden getranscribeerd via het bestaande OpenAI-compatibele meerdelige eindpunt en het gekozen chatmodel gaat verder met teksttranscripties.

Stroom:

1. Los `supportsAudio` op via `getResolvedModelCapabilities()`. Expliciete metadata van het providerregister wint, daarna de metadata van het statische model en vervolgens de gesynchroniseerde `modalities_input`. Een gedeclareerde invoerlijst zonder `audio` is `false`; er blijft geen bekwaamheidsbewijs `null`. Zowel `false` als `null` activeren de conservatieve brug, terwijl `true` deze omzeilt.
2. Los `modalityBridgeAudio*` instellingen op en extraheer koppelbare audiodelen op het hoogste niveau uit elk bericht via de gedeelde `detectMediaParts()` detector. Ondersteunde draadvormen zijn OpenAI `input_audio`, `audio_url` en `source.media_type: "audio/*"`. Geneste audio wordt gedetecteerd voor routering, maar wordt niet verwijderd door het splitsingspad. Werk wordt beperkt door `modalityBridgeAudioMaxClips`; latere delen blijven onaangeroerd.
3. Eer een geconfigureerde `provider/model`, of laat `selectAudioBridgeModel()` `AUDIO_TRANSCRIPTION_PROVIDERS` in een stabiele catalogusvolgorde lopen en selecteer het eerste model met een bruikbare actieve providerreferentie.
4. `callAudioTranscription()` converteert base64/data-URI audio naar een `file` met meerdere delen, of downloadt een `audio_url` op afstand via de publieke uitgaande bewaker met DNS pinning en een 25 MB grens. Vervolgens POSTs het bestand en het geselecteerde model naar de lokale `/v1/audio/transcriptions` self-loop, geauthenticeerd met `resolveSelfLoopBearer()`. De bestaande transcriptieroute voert het normale opzoeken van referenties, cooldown/rate-limit afhandeling en providerverzending uit.
5. Succesvolle oproepen vervangen hun onderdelen door `[Audio N]: <transcript>`. Gesprekken worden uitgevoerd met `Promise.allSettled`: bij een individuele fout blijft het originele audiogedeelte (#4012-contract) behouden. Als elke oproep mislukt en het doel `supportsAudio === false` is bewezen, worden de onderdelen `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Voor een onbekend doel (`null`) blijft een volledig mislukt resultaat onaangetast. Een beproefd alleen-tekstdoel zonder bruikbare STT referentie ontvangt dezelfde expliciete stub zonder een netwerkoproep uit te voeren.

Succesvolle transcripties gebruiken de procesbrede LRU/TTL cache van Modality Bridge. De sleutel combineert de audioreferentie, het stabiele `audio-transcription` bedieningslabel en het geselecteerde STT model; fouten worden nooit in de cache opgeslagen. Audiopogingen werken de gedeelde `bridged`, `cacheHits`, `failures` en `lastUsedAt` tellers bij. Getransformeerde reacties dragen `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; onaangeroerde verzoeken ontvangen geen Audio Bridge-segment.

Runtime-instellingen worden ondersteund door DB en Zod-gevalideerd:

| Sleutel                       | Standaard | Bereik         |
| ----------------------------- | --------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`    | —              |
| `modalityBridgeAudioModel`    | `""`      | Auto of STT ID |
| `modalityBridgeAudioTimeout`  | `60000`   | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`       | 1–10           |

De gedeelde cache blijft beheerd door `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` en `modalityBridgeCacheMaxEntries`.

### Videobrug (`videoBridge.ts`, `videoBridgePipeline.ts`)

Onderschept videodelen op het hoogste niveau in Chat Voltooiingen `messages` en Reacties API `input` voordat een doel zonder bekende native video-ondersteuning wordt aangeroepen. Ondersteunde vormen zijn `input_video`, `video_url`, `video_source`, HTTPS URLs en `data:video/*;base64,...` data URIs. Gewone bestandsnamen in tekst worden niet als video behandeld.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) is eigenaar van de aanvraagtraversal, de capability/policy controle, de aggregatie per aanvraag en de responspayload. — acquisitie per video, de cache van het volledige resultaat, die een framereeks beschrijft (die elk door de beller aangegeven audiotranscript samenvoegt), en metrics/abort/cleanup — per poging is verborgen achter `processVideoPart` in `videoBridgePipeline.ts`, eenmaal aangeroepen per videodeel in de lus van `preCall`. Die module definieert ook de expliciete poortgrenzen `VideoMediaBrokerPort` (het verwerven van bytes en het extraheren van bemonsterde frames), `VideoAudioTranscriptionPort` (het samenvoegen van een door de beller gedeclareerd audiotranscript met de bemonsterde ondertitels) en `VideoDrilldownPort` (de frame drill-down persistentiegrens; nog niet aangesloten op `processVideoPart` — schrijft vandaag alleen de afzonderlijke `/api/modality-bridge/video/drilldown` route drill-down-items).

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

**Bewaren van transcripties (#12150 P1).** Dit is automatisch van toepassing wanneer de Video Bridge (zelf opt-in) een transcriptiesignaal geeft — er is geen afzonderlijke bewaarvlag. Wanneer een verzoek een transcriptiecue weergeeft (een door de beller aangegeven `transcript` of een gefuseerde `audioTranscript`), markeert de vangrail deze `videoBridgeObserved` en produceert een geredigeerde schaduw van de videobeschrijving — een identieke weergave waarin de vrije tekst van elke cue wordt vervangen door `[redacted-video-transcript]`, opgebouwd door het gestructureerde cue-veld te vervangen voordat de string wordt samengesteld (nooit door de afgeplatte tekst te parseren, dus geen cue-inhoud — vijandig of gewoon, inclusief lichamen die `]` bevatten, zoals `[inaudible]`/`[music]` — kunnen overleven). De aanhoudende vraagtekst van het oproeplogboek verwisselt elk van video afgeleid tekstgedeelte voor die geredigeerde schaduw, geëvenaard door gelijkheid van de inhoud; het `fullText` anker wordt opnieuw gelezen vanaf de voltooide payload van de vangrail vóór de oproep, zodat de match nog steeds slaagt nadat latere kettingvangrails (de PII en inlogmaskers, prioriteiten 10/95) de beschrijvingstekst op zijn plaats hebben herschreven en nadat system-prompt/handoff/memory injectie de berichtenarray opnieuw heeft vormgegeven. Het lichaam dat stroomopwaarts naar het model wordt gestuurd, is ongewijzigd. Een waargenomen verzoek vult ook geen duurzaam geheugen (zowel de op verzoek als op het antwoord gebaseerde extractie wordt overgeslagen), zodat het eigen antwoord van het model de transcriptietekst niet in het geheugen kan echoën.

**Ruwe videovelden (#12430).** Wanneer de bridge is ingeschakeld en native video-ondersteuning onbekend of afwezig is, activeren gedefinieerde `transcript`/`audioTranscript` -velden ook `videoBridgeObserved`, zelfs na een beschrijvingsfout of een `maxVideos` limiet. `null` en lege strings tellen mee; afwezige velden en niet-video-metagegevens niet. Bewaarde kopieën redigeren deze velden of laten het verzoek weg, en caches/Memory wordt omzeild.

Op deze terugvalpaden worden geldige caller-cues ondersteunde `text`/`input_text` onderdelen in plaats van niet-standaard providervelden. Beide op verzoek aangeleverde tracks blijven onbetrouwbare `client` observaties, met een expliciete waarschuwing dat de video niet is beschreven en dat tijdstempels niet zijn geverifieerd aan de hand van de media. De bestaande 256-cue/64-KiB totaal- en per-cue-budgetten gelden voor de twee sporen samen; tijdstempels moeten passen bij het plafond van 600 seconden van de makelaar en het eventuele geleverde focusvenster. Ongeldige nummers worden verwijderd en niet doorgestuurd als willekeurige tekst; een geldige broer of zus mag nog steeds worden gebruikt, tenzij hun gecombineerde budget wordt overschreden. Null/empty -velden voegen geen tekst toe. Door deze fallback wordt geen media-ophaal- of transcriptie toegevoegd. Transcriptextensievelden worden verwijderd uit de fallback-videodrager en zijn `video_url`/`source` -objecten. De toelatingslijst voor OpenAI -overboekingen blijft streng; onbekende native videodragers blijven beschikbaar en bekende alleen-tekstdoelen behouden veilige markeringen. Gestructureerde redactieschaduwen beschermen de toegevoegde transcriptietekst, terwijl het oorspronkelijke verzoek van de beller ongewijzigd blijft. Door native ondersteunde doelen en uitgeschakelde bruggen behouden hun bestaande bypass-gedrag.

Extra bewaarde kopieën gebruiken hetzelfde waargenomen verzoeksignaal. De onbewerkte momentopname van klantverzoeken vóór de guardrail, in het geheugen hangende verzoeken en het logbestand met vroege afgewezen verzoeken vervangen structureel transcriptievelden in videodelen; tekenreeksprompts die zijn gesynthetiseerd door pijplijnfasen en contextoverdracht worden geredigeerd bij de persistent-request-body-sink. De aanhoudende `video_content_removed` markering zorgt ervoor dat `previous_response_id` voortzetting mislukt, in plaats van tekst te reconstrueren die opzettelijk is weggegooid. Als een geobserveerd verzoek zijn redactieschaduw per onderdeel verliest vóór het loggen, of zelfs een van de verschillende videoschaduwen niet overeenkomt na latere verzoekmutaties, wordt de bewaarde verzoektekst volledig weggelaten in plaats van een gedeeltelijk geredigeerd transcript te behouden.

Voor een geobserveerd verzoek kan een modelantwoord elk deel van het transcript citeren zonder een gestructureerde cue-grens. De aanhoudende oproeplog `responseBody` wordt daarom vervangen door een weglatingsmarkering; het gedetailleerde pijplijnartefact (dat upstream/client lichamen en stream-brokken kan omvatten) blijft niet behouden. Semantische, idempotency- en redeneer-replay-caches omzeilen lees- en schrijfbewerkingen voor dat verzoek. Het verzoek van de aanbieder en het voor de klant zichtbare antwoord blijven ongewijzigd. Vroege keepalive-bytes worden uit de tijdelijke buffer afgevoerd wanneer het gedetailleerde artefact wordt weggelaten. De misvormde EventStream -waarschuwing van Kiro rapporteert alleen het aantal bytes van de payload, nooit de inhoud ervan of de onbewerkte fout van de JSON parser. Dit betekent niet dat elke niet-gerelateerde provider/plugin diagnostiek is gecontroleerd; de bredere 'retained-sink sweep' wordt gevolgd in #11658.

De interne `/api/modality-bridge/video/drilldown` levenscyclus is een afzonderlijk loopback/token-authenticated cachesubstraat. Elke bewerking vereist ook een canonieke ondoorzichtige hoofdsom ID. Voordat een productieaanroeper wordt ingeschakeld, moet deze de ID afleiden van de geverifieerde tenant en mag deze nooit een door de client geselecteerde waarde doorsturen. Cachesleutels binden die hoofdpersoon aan de canonieke sessie en videoreferentie IDs, slaan alleen hun SHA-256-derived sleutels op en reiken zowel lees- als verwijderingshandelingen aan dezelfde hoofdpersoon. De cache slaat maximaal 16 afgeleide JPEG frames per invoer op, laat deze na tien minuten verlopen en ondersteunt begrensde `start`/`end` -leesbewerkingen of het expliciet verwijderen van sessies.

Elke opdrachtgever is beperkt tot 16 inzendingen en 64 MiB aan canonieke JPEG gegevens. Deze limieten zijn onafhankelijk van het mondiale 64-entry/256 MiB plafond: door de druk van de hoofdquota worden alleen de minst recentelijk gebruikte vermeldingen van de hoofddirecteur uitgezet voordat een mondiale LRU uitzetting wordt overwogen. Verlopen vermeldingen worden bij cache-activiteit uit zowel de hoofdboekhouding als de globale boekhouding verwijderd, terwijl annulerings- en validatiefouten geen gedeeltelijke vervanging tot gevolg hebben.

De cache verwerpt niet-canonieke Base64, overtollige opvulling, niet-JPEG-media, misvormde of afgeknotte JPEGs en JPEGs die een waarschuwing produceren tijdens een begrensde `sharp` decodering van het volledige beeld. Het codeert elke geaccepteerde afbeelding opnieuw als een canonieke JPEG, leidt de breedte en hoogte af van de gedecodeerde bytes in plaats van te vertrouwen op bellervelden, en verwijdert alle achterliggende polyglotte bytes in plaats van ze vast te houden. Alleen de begrensde canonieke gecomprimeerde buffer wordt in rekening gebracht voor beide quota. De JSON draadlimiet omvat Base64-overhead voor het plafond van 32 MiB -gedecodeerde invoer. Elke opgeslagen afleiding registreert de gevalideerde JPEG format/resolution, het bemonsteringsbeleid, de afleidingsversie, de aanmaaktijd, de door de server berekende inhoudhash en de gehashte ouderreferentie plus de bovenliggende inhoudhash van de vertrouwde beller. Annulering wordt gecontroleerd tussen asynchrone decode/hash fasen vóór de atomaire cache-commit.

Deze tranche verbindt nog geen productieproducent met de route en biedt geen variantselectie met meerdere resoluties. Het transparante Video Bridge-verzoekpad brengt daarom geen extra werk met zich mee, terwijl de huurdergebonden hoofdafleiding en de volledige FU-08 -levenscyclus met meerdere resoluties expliciet vervolgwerk blijven in plaats van gedocumenteerd als volledig gedrag.

Frames worden opeenvolgend ondertiteld met het geconfigureerde videomodel. Een lege Video-overschrijving neemt de Vision-instelling over; als beide leeg zijn, selecteert de Vision auto-router het effectieve vision-compatibele model. Succesvolle bijschriften vervangen het originele gedeelte door een stabiel `[Video description:` voorvoegsel dat de tekst ook markeert als een niet-vertrouwde, uit de media afkomstige observatie en dat stroomafwaartse modellen vertelt dat ze de instructies in de media niet moeten volgen. Cachesleutels voor framebijschriften omvatten de JPEG bytes, prompt, tijdstempel en effectief model; alleen succesvolle ondertiteling wordt in de cache opgeslagen. Cache-items behouden het feitelijk succesvolle producentenmodel, inclusief een fallback-model; de brug rapporteert `mixed` wanneer verschillende frames door verschillende modellen zijn geproduceerd. Een cachehit hergebruikt de identiteit van de producent in plaats van deze opnieuw te labelen als het aangevraagde routeringsplan. De volledige video-resultaatcache wordt ingetoetst op elke invoer die de uitvoer — prompt, het effectieve model, het bemonsteringsbeleid, het aantal frames, de semantische analysemodus, de SHA-256 vingerafdruk van de genormaliseerde focushint, het focusvenster, `transcript`, `audioTranscript` en de contactbladvlag — verandert, dus het veranderen van een van deze dimensies is een cache-misser en nooit een oud hergebruik. De visuele versie van het dedup-beleid, de drempelwaarde en het begrensde aantal kandidaatframes zijn ook expliciet in de resultaatcachesleutel en metagegevens; een beleidswijziging kan daarom geen verouderde volledige videobeschrijving hergebruiken. Result-cache v4-metagegevens behouden de modus en vingerafdruk, nooit de onbewerkte gebruikerstaak. Guardrail-metagegevens rapporteren zowel de gevraagde als effectieve analysemodi; een aangevraagde `focused` modus zonder bruikbare gebruikerstekst wordt effectief gerapporteerd als `full`.

De guardrail haalt elk ondersteund videodeel eruit, maar beschrijft niet meer dan `modalityBridgeVideoMaxVideos`. Voor een doelwit waarvan bewezen is dat het `supportsVideo === false` heeft, worden mislukte video's en video's met overlimiet expliciete veilige tekstmarkeringen, zodat geen onbewerkte video overleeft. Als de capaciteit onbekend is, behouden die delen hun videodrager; elk fallback-transcript volgt de bovenstaande begrensde tekstconversie. Doelen met `supportsVideo === true` omzeilen de brug. Het signaal voor het afbreken van het clientverzoek wordt doorgegeven via downloads, makelaarswachtrijen, subprocessen en ondertitelingsoproepen; breekt de stop af tussen video's en faalt nooit open voor onbewerkte media.

Runtime-instellingen worden ondersteund door DB en Zod-gevalideerd:

| Sleutel                             | Standaard   | Bereik / gedrag                                                                                                           |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Optionele runtime, opt-in                                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` behoudt generieke ondertitels; `focused` gebruikt een begrensde, niet-vertrouwde context van de nieuwste gebruiker |
| `modalityBridgeVideoModel`          | `""`        | Neem het Vision Bridge-model over                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` of proportionele `segment_aware`; detectorfout valt terug naar `uniform`                         |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120.000 ms                                                                                                           |

Verouderde waarden blijven bestaan Videotime-outwaarden van meer dan 120 seconden worden beperkt tot de deadline van de broker; nieuwe instellingen die boven die limiet schrijven, worden afgewezen. `GET /api/modality-bridge/video/runtime` vereist een vertrouwde, gestempelde loopback-locatie vóór authenticatie of runtime-onderzoek, en vereist vervolgens beheerverificatie. Het retourneert alleen `available`, opgeschoonde FFmpeg/ffprobe versies en een vaste reden wanneer de runtime niet beschikbaar is. Het interne extractie-eindpunt is geen openbare upload API: wachtrijverzadiging retourneert `503` plus `Retry-After`, een aanroeper die de verbinding verbreekt retourneert `499`, en de vaste brokerdeadline retourneert `504`. Geconverteerde antwoorden voegen `video->text;model=<visionModel>;parts=<videos>` toe aan de centrale `x-omniroute-modality-bridge` header zonder Vision- of Audio-segmenten te verwijderen.

### PII Masker (`piiMasker.ts`)

Loopt door** beide** stadia.

- **`preCall`** kloont de payload, loopt door `system`, `messages`, `input` en `prompt` (inclusief gewone stringitems) en past `processPII()` (van `@/shared/utils/inputSanitizer`) toe op string `content`/`text` -velden. Wanneer `PII_REDACTION_ENABLED=true` wordt gedetecteerd, wordt PII geredigeerd in de uitgaande payload. Dit is onafhankelijk van `INPUT_SANITIZER_MODE` (dat alleen het prompt-injectiebeleid regelt). Wanneer redactie is uitgeschakeld, telt de detectie van gespreksrecords zonder dat de inhoud wordt herschreven.
- **`postCall`** kloont het antwoord diep, voert `sanitizePIIResponse()` uit plus het Responses-API-vormmasker (`maskResponsesOutput` — omvat `output_text` en `output[].content[].text`). Als er sprake is van redactie, vervangt het gewijzigde antwoord het origineel.

De vangrail blokkeert nooit; het annoteert alleen (`meta.detections`, `meta.redacted`) of herschrijft.

#### Selectie per type, aangepaste patronen en detectietellers

**Dashboard → Instellingen → Beveiliging → PII maskering** kiest _wat_ wordt gemaskeerd. Het schakelt de maskering niet in: dat is nog steeds `PII_REDACTION_ENABLED` (verzoek) en `PII_RESPONSE_SANITIZATION` (antwoord + SSE), beide standaard uitgeschakeld.

- **Selectie per type** — De ingebouwde id's worden vermeld in `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Niet ingesteld betekent elk type (het gedrag voordat deze instelling bestond). Het `ssn_us` -patroon van de aanvraagengine wordt toegewezen aan `ssn`. Sjablonen (Minimaal, Standaard, Financieel, Braziliaans, USA, GDPR, POPIA, Volledig) vullen alleen de selectievakjes in de UI.
- **GDPR en POPIA identificatoren** — twaalf ingebouwde ID's voor EU en Zuid-Afrikaanse persoonlijke identificatiegegevens (tabel hieronder). Hun regexes, validators en jurisdictietags bevinden zich in één tabel, `src/shared/utils/piiPatterns.ts`, die zowel de response sanitizer (`src/lib/piiSanitizer.ts`) als de request mask (`src/shared/utils/inputSanitizer.ts`) gebruiken. Een match wordt alleen geredigeerd als de validator deze accepteert; een enkele reeks cijfers is nooit genoeg. Een operator die een beperkte selectie heeft opgeslagen voordat deze ID's bestonden, blijft hetzelfde gedrag vertonen totdat de nieuwe ID's zijn aangevinkt.
- **Aangepaste patronen** — maximaal 20 regex- of jokertekenpatronen (`*` = maximaal 64 niet-witruimtetekens, `?` = één). Overeenkomsten worden `[CUSTOM_REDACTED]`. Elk patroon doorloopt `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): maximaal 500 tekens, vlaggen beperkt tot `g i m s u`, moeten compileren, moeten `safe-regex` passeren (catastrofale backtracking) en mogen niet overeenkomen met een lege tekenreeks of een tijdelijke aanduiding voor redactie. Een patroon dat faalt, wordt geweigerd wanneer het wordt opgeslagen en getest, en een opgeslagen rij die faalt, wordt tijdens runtime overgeslagen in plaats van te worden gecompileerd. Aangepaste patronen worden alleen uitgevoerd als maskering is ingeschakeld.
- **Detectie tellers** — tellingen per type (nooit overeenkomende waarden), in het geheugen bewaard en opnieuw ingesteld bij opnieuw opstarten (`src/lib/pii/piiDetectionStats.ts`). Ze nemen alleen maar toe als de maskering is ingeschakeld.

De instellingen bevinden zich in de `key_value` tabel (naamruimte `pii_settings`, `src/lib/db/piiSettings.ts`) en worden gelezen via een cache van 1 seconde. API:

| Methode | Pad                      | Doel                                                                                    |
| ------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Vlagstaat, `enabledTypes`, `customPatterns`, detectietellers                            |
| `PUT`   | `/api/settings/pii`      | Vervang `enabledTypes` (`null` = alles) and/or `customPatterns`                         |
| `POST`  | `/api/settings/pii/test` | Eén patroon droogdraaien tegen een monster van maximaal 8 KB; er wordt niets opgeslagen |

Alle drie vereisen beheerauthenticatie en valideren de hoofdtekst met Zod (`src/shared/validation/schemas/piiSettings.ts`).

#### GDPR (EU) en POPIA (Zuid-Afrika) identificatiegegevens

| Identiteitskaart    | Identificatie                 | Geldigmaking                                                                                        |
| ------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                          | Bekend land, exacte lengte voor dat land, ISO 13616 MOD-97-10                                       |
| `eu_vat`            | EU VAT nummer                 | Bekend voorvoegsel van de lidstaat en de getalnotatie van die staat (geen VIES zoekopdracht)        |
| `es_dni_nie`        | Spaanse DNI / NIE             | Controleletter (waarde mod. 23); NIE is `X/Y/Z` + 7 cijfers                                         |
| `it_codice_fiscale` | Italiaanse Codice Fiscale     | Controlebrief uit de odd/even positietabellen                                                       |
| `pl_pesel`          | Poolse PESEL                  | Gewogen controlesom en een gecodeerde geboortedatum die bestaat                                     |
| `nl_bsn`            | Nederlandse BSN               | 11-proof (gewichten 9..2, -1)                                                                       |
| `de_steuer_id`      | Duitse Steuer-ID              | ISO 7064 Mod 11,10 plus de regels voor de cijferstructuur (geen leidende 0)                         |
| `se_personnummer`   | Zweeds persoonsnummer         | Luhn over de laatste tien cijfers en een plausibele geboortedatum (10 of 12 cijfers)                |
| `za_id`             | Zuid-Afrikaans ID nummer      | Luhn over alle 13 cijfers, geldige geboorte month/day, staatsburgerschapcijfer 0 of 1               |
| `za_phone`          | Zuid-Afrikaanse telefoon      | `+27` / `27` voorvoegsel, of het nationale `0..` formulier geschreven met een spatie of koppelteken |
| `za_vat`            | Zuid-Afrikaans VAT nummer     | 10 cijfers beginnend met `4`** En** "VAT" / "BTW" in de 48 tekens ervoor                            |
| `za_tax_ref`        | Zuid-Afrikaanse belastingref. | 10 cijfers beginnend met `0`-`3`, Luhn,** En** "tax" / "SARS" in de 48 tekens ervoor                |

Omdat de alleen-cijferige notaties botsen met bestelnummers, bouwnummers en tijdstempels, hebben de zwakste (`za_vat`, `za_tax_ref`) de trefwoordcue nodig, en een `0..` -nummer van tien cijfers wordt niet behandeld als een Zuid-Afrikaans telefoonnummer. Gespreide IBANs (`GB29 NWBK ...`) komen niet overeen. Op het streamingpad wordt de cue alleen binnen het huidige segment opgezocht. De id's liggen vóór de generieke telefoonpatronen, dus een gevalideerde identificatie behoudt zijn eigen tijdelijke aanduiding (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). De `gdpr` en `popia` sjablonen selecteren respectievelijk de EU en Zuid-Afrikaanse ID's. Het maskeren zelf blijft opt-in (harde regel #20): niets verandert hier de standaardfunctievlag.

### Snelle injectie (`promptInjection.ts`)

Detecteert vijandige structuren in door gebruikers aangeleverde inhoud en handhaaft het geconfigureerde beleid. Gedrag wordt bepaald door omgevingsvariabelen en constructoropties:

| Instelling        | Env var                                                                                              | Standaard | Effect                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ingeschakeld      | `INPUT_SANITIZER_ENABLED`                                                                            | `true`    | Wanneer `false`, kortsluiting van de vangrail.                                                                                                                                                                            |
| Modus             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`    | Injectiebeleid: `block`, `warn` of `log`. (`redact` wordt geaccepteerd voor back-compatibiliteit, maar doet dat wel** niet** strip injectie tekst; verzoek PII herschrijven wordt bestuurd door `PII_REDACTION_ENABLED`.) |
| Drempel blokkeren | `blockThreshold` optie / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`    | Minimale ernst vereist om te blokkeren. Medium is standaard alleen observeren.                                                                                                                                            |

**Modusprioriteit** (`getMode`): beller `options.mode` → `INJECTION_GUARD_MODE`**DB -functievlag overschrijven** (Dashboard → -instellingen → Functievlaggen) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Een dashboard-override wint daarom de env-vars, dus de Feature Flags UI bestuurt de running guard live (geen herstart). De DB lezing is fail-safe: als er een fout optreedt, valt de bewaker terug naar het env-gebaseerde gedrag, en als er geen override is ingesteld, is het gedrag identiek aan de oplossing voor alleen env.

Detectiebronnen:

1. `sanitizeRequest()` van `@/shared/utils/inputSanitizer` (gedeelde detectorset die elders in de pijplijn wordt gebruikt).
2. Ingebouwde `DEFAULT_GUARD_PATTERNS` (momenteel `system_override_inline` en `markdown_system_block`, beide `high` ernst).
3. Optionele `customPatterns` doorgegeven via constructoropties (strings, regex of `{ name, pattern, severity }` records).

Wanneer `mode === "block"`** En** ten minste één detectie voldoet aan de ernstdrempel, `preCall` retourneert `{ block: true, message: "Request rejected: suspicious content detected" }`. In `warn`/`log` modi logt de vangrail, maar staat de oproep toe. De gedeelde helper `evaluatePromptInjection()` wordt ook geëxporteerd voor bellers die aanwijzingen moeten evalueren zonder het register te doorlopen.

**Scangebonden (v3.8.20):** de detector inspecteert alleen de** eerste 16 KB** van samengevoegde prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384 bytes) in `src/shared/utils/inputSanitizer.ts`. Zowel `detectInjection()` als `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` voordat de patroonlus wordt uitgevoerd. Injectierichtlijnen zitten bovenaan een invoer, dus dit beperkt regex CPU/GC op payloads van meerdere honderden KB's zonder de detectie te verzwakken (zie #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Loopt door** beide** fasen, laatste in de standaardketen (prioriteit `95`). Redigeert bekende API-sleutel-/geheime-tokenpatronen uit de uitgaande payload (berichtinhoud, tool-aanroepargumenten, toolresultaten)** En** het antwoord van de provider, zodat een inloggegevens die in een prompt worden geplakt (of worden teruggestuurd door een toolresultaat) niet naar de upstream-provider of terug naar de client worden gelekt.

- **Alleen aanmelden** , dezelfde conventie als PII -redactie (harde regel #20-aangrenzend): uitgeschakeld tenzij `settings.credentialRedactionEnabled === true`** of** `CREDENTIAL_REDACTION_ENABLED=true`. Als het uitgeschakeld is, is de vangrail een no-op — hij nooit blokkeert en nooit herschrijft.
- `redactCredentials()` doorloopt de volledige payload/response boom (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) en vervangt overeenkomsten door een `[REDACTED:<type>]` placeholder, waarbij alleen de takken worden gekloond die daadwerkelijk zijn veranderd.
- `CREDENTIAL_PATTERNS` omvat LLM -providersleutels (OpenAI, OpenAI-proj, Anthropic, Google, Knuffelgezicht, Repliceren), VCS/SaaS tokens (GitHub, Slack, Lineair, Notion, npm, Postman, Discord), betalingssleutels (Stripe, Square), cloudsleutels (AWS toegangssleutel, Twilio, SendGrid, Mailgun), privésleutels / JWTs, verbinding met inloggegevens strings (`mongodb://user:pass@...`, etc.), en een generiek `Authorization`/`x-api-key`/`api-key`/`apikey` header-waardepatroon. Kopvormige sleutels (`authorization`, `x-api-key`, `api-key`, `apikey`) worden structureel geredigeerd (alleen waarde, schemavoorvoegsel zoals `Bearer `/`Basic ` behouden) in plaats van via de generieke tekstregex.
- De vangrail blokkeert nooit; het herschrijft alleen (`modifiedPayload` / `modifiedResponse`) en annoteert (`meta.credentialsRedacted`, `meta.count`).

Regressiewacht: `tests/unit/credential-masker-guardrail.test.ts`.

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
