# Guardrails (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sandhedens kilde:** `src/lib/guardrails/`

Autoværn håndhæver ændringer af sikkerhed, politik og indhold ved grænsen mellem OmniRoute og upstream-udbydere. Hvert autoværn kan inspicere (og eventuelt afvise, transformere eller kommentere) anmodningsnyttelast (`preCall`) og opstrømssvar (`postCall`).

Systemet er** fejl-åbn** : hvis et autoværn kaster sig, mens det udføres, registrerer registreringsdatabasen fejlen og fortsætter med det næste autoværn i stedet for at afvise anmodningen. Blokering er en eksplicit beslutning (`block: true`), aldrig en ulykke. Den ene undtagelse er en afbrudt anmodning: når den, der ringer op,s `signal` afbrydes, afviser et rækværk, der kaster, krogløbet i stedet for at blive sprunget over.

Det gør krogene** ikke** løb på hver rute eller hvert svar. Læs [Dækning og grænser,](#coverage-and-limits) før du stoler på et autoværn som sikkerhedskontrol.

## Indbyggede værn

Registret indlæser automatisk disse autoværn i prioriteret rækkefølge ved import (se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Stadie(r)      | Fil                       |
| --------- | ------------------- | -------------- | ------------------------- |
| `1`       | `agent-guard`       | `preCall`      | `agentGuard/guardrail.ts` |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`         |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`          |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`          |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`            |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`      |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts`     |

Lavere prioritetsnumre kører** først** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3-basismodellen og `glm-5.3-{low,high,max}` har eksplicitte `supportsVision:false` registry/spec metadata. GLM 5.3 Flash-varianterne forbliver native-vision-modeller. Claude Codes `/v1/messages` rute går ind i den delte `handleChat` pre-call autoværnkæde** før** Claude-to-OpenAI oversættelse; indlejrede `Read` -værktøjsresultatbilleder skal beskrives eller håndteres, før oversættelsen løfter dem til OpenAI `image_url` indhold (#17069).

Opsnapper billedbærende anmodninger rettet mod** ikke-visionsmodeller** og enten omdirigerer hele anmodningen til en vision-kapabel model eller erstatter billeddelene med tekstbeskrivelser produceret af en konfigurerbar vision-model før opstrømskaldet. Dette gør det muligt for tekstudbydere på en gennemsigtig måde at håndtere multimodale nyttelaster.

Flyde:

1. Spring over, hvis målmodellen allerede understøtter syn (medmindre den vises på listen over tvungen bro `isVisionBridgeForcedModel`).
2. Uddrag billeddele via `extractImageParts(messages)` (`visionBridgeHelpers.ts`), som uddelegerer til** unified media detector** `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den eneste kilde til sandhed, der deles med combo-kompatibilitetsfilteret. Ekstraktion er godkendt til de former, `replaceImageParts` kan splejse tilbage (uddraget ↔ erstatte kontrakt): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` og Responses API `input_image`. Matchende billeder indlejret inde i Claude Code `tool_result.content` og Responses værktøjsoutput udtrækkes også og erstattes ved deres oprindelige stier; Former med kun indikator er kombifiltermateriale og udtrækkes ikke. Spring over, hvis ingen findes.
3. Løs runtime config via `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): nye `modalityBridge*` -indstillingsnøgler vinder; ældre `visionBridge*` -nøgler forbliver en** en-cyklus fallback** (tilbageføringsvindue). Spring over før enhver mediegennemgang, når broen er deaktiveret.
4. Modevælger (`modalityBridgeVisionMode`, se tabel nedenfor) bestemmer omdirigering vs beskrive. Reroute returnerer `modifiedPayload` med kun `model` ombyttet, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskriv sti: cap billeder ved `maxImages`, komponer den opgavebevidste prompt, se beskriv cachen, ring til visionsmodellen** parallelt** (`Promise.allSettled`), og injicer `[Image N]: <description>` -tekstdele i deres sted. En mislykket beskrivelse giver `null`: det rå billede bevares for unknown/vision-capable mål (#4012), men en** bekræftet direkte mål kun tekst** eller nul-vision combo får en eksplicit `(unavailable — no vision-capable provider connected)` tekststump for hvert ubeskrevet billede, inklusive delvise fejl og billeder ud over describe-call cap (#17069). Den eksisterende alt-mislykkede kombinationsbeskrivelse for fallback forbliver på plads (#8430).
6. Returner `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Tilstandsvælger (`modalityBridgeVisionMode`)

| Mode       | Misligholdelse | Opførsel                                                                                                                                                                                                                                                                            |
| ---------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔              | Ældre heuristik, uberørt (#6640/#7204): ikke-combo/`auto/` -modeller omdirigerer til den bedste vision-model, medmindre den originale model allerede har brugbare legitimationsoplysninger (beskriv derefter); combo-mål beskriver altid.                                           |
| `describe` |                | Beskriv altid — omdirigeringsblokken springes helt over; brugerens valgte model svarer altid.                                                                                                                                                                                       |
| `reroute`  |                | Tving omdirigering: Bevar-legitimations-modelbeskyttelsen omgås. Omdirigeringen-** mål** credential guard anvender stadig — når der ikke findes et brugbart synsfelt, broen blokerer med en klar fejl i stedet for at beskrive eller sende råbilleder til et mål, der kun er tekst. |

Tvungen tilstande kortslutter** før** den autoheuristiske kører; `auto` adfærd er byte-identisk med pre-PR-1 autoværnet.

#### API-nøgleomfang (`visionBridgeKeyScope.ts`)

Når den kaldendes API nøgle begrænser `allowedConnections`, kvotepuljer (`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), vælger broen kun omdirigering og beskriver modeller, som nøglen kan bruge, på forbindelser nøglen kan bruge. Beskriv-opkaldet går derefter altid gennem OmniRoute -selv-løkken med `x-omniroute-self-loop-key-id` headeren, så den modtagende chatanmodning håndhæver nøglens forbindelse og modelpolitik igen. `enforceApiKeyPolicy()` ærer kun den overskrift sammen med selvløkkebæreren, så den kan kun indsnævre adgangen, og et id, der ikke løser, afvises.

Hvis ingen synsmodel er tilladt for nøglen, a** bekræftet tekst-kun mål** afviser billedanmodningen lokalt med en klar HTTP 400 i stedet for at videresende billedbytes til en invalid upstream (#17069). For mål med ukendt eller indbygget synsevne bevarer beskriv-stien sin tidligere fejl-åben-adfærd (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Forespørgsler uden nøgle og nøgler uden disse begrænsninger opfører sig nøjagtigt som før.

#### Opgavebevidst beskrivelsesprompt (`modalityBridgeVisionTaskAware`)

Misligholdelse** ægte** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) tilføjer teksten til** sidste brugerbesked** (trunkeret til 500 tegn) til den grundlæggende beskrivelsesprompt, der styrer beskrivelsen mod det, brugeren faktisk spurgte (codex-vision-proxy-mønster) og beder visionsmodellen om at transskribere synlig tekst. Med flaget slået fra — eller ingen brugertekst — bruges basisprompten uændret.

Beskriv selvløkkens egen OpenAI-kompatible anmodning (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) anmoder altid om `image_url.detail: "high"` — ubetinget, for hver caller/provider, ikke gated på noget klientsignal. Sampling med lave detaljer forringer OCR nøjagtigheden for præcis den teksttransskriptionsopgave, som denne prompt beder om, så selve describe-kaldet beder altid om høje detaljer, uanset hvilket detaljeringsniveau den oprindelige indgående anmodning brugte. Dette påvirker kun den interne beskrivelsesanmodningsinstans; det ændrer ikke, hvordan OmniRoute videresender den opkaldendes egen `image_url.detail` på den primære anmodning —, at standarden anvendes separat, og kun for detekterede OpenCode klienter, i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic wire-format grenen af describe self-loop har intet `detail` felt og er upåvirket af nogen af standarderne.

#### Beskriv output cap (`modalityBridgeVisionMaxChars`)

| Nøgle                          | Misligholdelse | Rækkevidde          |
| ------------------------------ | -------------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`            | `0` eller 100-50000 |

`0` (standard) betyder** ingen kasket** — beskrivelsen returneret af `callVisionModel()` sendes uændret igennem, hvilket bevarer den eksisterende adfærd. Enhver værdi i intervallet 100-50000 afkorter beskrivelsen med et `…` suffiks, før den splejses tilbage som `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`). Hæv dette for detaljetunge OCR opgaver, hvor downstream-modellen har brug for den fulde transskription; sænk den til bundet tokenbrug på chatty vision-modeller. Dashboard-feltet findes på Vision-fanens avancerede panel (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) og klemmer enhver værdi mellem 1 og 99 op til 100-gulvet, mens det efterlader en eksplicit `0` urørt — `0` er en gyldig Zod værdi i sig selv (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke blot "unset"-standarden.

#### Beskriv cache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache til beskrive output, delt i hele processen. Nøgle = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med længdepræfiksramme (ingen feltgrænsekollisioner). Modelkomponenten er** konfigureret** bridge-model, ikke den model, der faktisk besvarede — `callVisionModel` kan falde tilbage internt, og indtastning pr. forsøg ville fragmentere cachen. Mislykkede beskrivelser gemmes aldrig i cache. Indstillinger:

| Nøgle                           | Misligholdelse | Rækkevidde |
| ------------------------------- | -------------- | ---------- |
| `modalityBridgeCacheEnabled`    | `true`         | —          |
| `modalityBridgeCacheTtlMinutes` | `60`           | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`          | 10–5000    |

#### Fjernbillednormalisering (selv-loop describe/base64 hentning)

Når broen henter en** fjern** selve billedet — Anthropic beskriver selvopkald og claude-wire-format base64 konvertering (`ensureBase64ImagesForClaudeWire`), begge via `fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — de resulterende data URI sendes gennem `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) før de indlejres i vision-model anmodningen. Overdimensionerede billeder nedskaleres til en** 2048px lang kant** (der matcher resize cap OpenAI/Anthropic anvender allerede server-side), hvilket skærer upload bytes/latency uden at ændre, hvad vision modellen ser. Ændring af størrelse bruger `sharp`, indlæst via dynamisk import: på en platform, hvor dens oprindelige binære fil ikke kan indlæses, `normalizeDataUri()`** kaster aldrig** — det falder tilbage til en passthrough af de originale bytes, så describe/base64-conversion stien bliver altid ved med at fungere. Ikke-billedbytes (en hentning, der ikke returnerede et afkodebart billede) sendes også urørt igennem. Denne normalisering er beregnet til billeder, som broen henter for sit eget selvopkald — den anvendes aldrig på den, der ringer, ubehandlet, i overensstemmelse med opt-in-only mutationsprincippet (Hard Rule #20).

#### Indstillinger skema + migration

De nye `modalityBridge*` nøgler er Zod-validerede i `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` -trioen og `modalityBridgeAudio*` gruppen, der bruges af Audio Bridge. Migration `141_modality_bridge_settings.sql` kopierer eksisterende ældre `visionBridge*` -værdier til de matchende nye nøgler (idempotent, overskriver aldrig en operatørindstillet `modalityBridge*` værdi); de ældre nøgler forbliver accepteret som en læsbar reserve i én udgivelsescyklus.

#### Transparency header + statistik

Beskriv-transformerede svar bærer `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (bygget af `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`, stemplet af `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`). Omdirigerede anmodninger får** ingen** header — nyttelasten var uberørt, og modelbyttet er allerede synligt i svarlegemets `model` felt.

`GET /api/modality-bridge/stats` (management auth, samme niveau som `GET /api/settings`) returnerer tællerne i hukommelsen pr. modalitet `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og `video`. `averageLatencyMs` bruger `latencySamples`, ikke alle forsøg, som sin nævner; en operation uden timing fremstiller ikke en nul millisekunders prøve. `bridged` forbliver det bagudkompatible alias for vellykkede konverteringer; mislykkede forsøg øger det ikke. Tællere nulstilles ved procesgenstart ved design (telemetri, ikke regnskab).

#### Dashboard konfiguration

Den dedikerede dashboard-side er `/dashboard/settings/modality-bridge`. Dens URL-adresserbare `Vision`, `Audio` og `Video` faner bevarer forespørgselsparametrene, mens `tab` værdien skiftes. Fanen Vision afslører aktivering, tilstand, modelvalg (inklusive automatisk standard), opgavebevidste prompter, avancerede timeout/image/description-length/cache grænser, runtime-tællere og en beskyttet prøveanmodning. Audio-fanen er også live: den afslører aktivering, en STT-kun modelvælger med Auto, timeout/max-clip grænser, lydtællere og en `input_audio` prøvetest. Video-fanen er funktionel: den rapporterer FFmpeg/ffprobe runtime-tilstanden — en af fire eksplicitte UI tilstande (`unknown` mens sonden er i flyvning eller ikke kunne fuldføre, `restricted` på en non-loopback dashboard-vært — hvor sonden springes over på klientsiden, `unavailable` én gang probet og bekræftet mangler, eller `available` med FFmpeg/ffprobe modellen-versionerne, filtret for at vælge enable/model/frame/video/timeout -modellen) vision-kompatible modeller og eksponerer videotællere.

Det tidligere Vision Bridge-kort under AI indstillinger er et kompatibilitetslink til den nye side; det ejer ikke længere en anden kopi af formularen. Medieudbydere forbinder også billed-til-tekst- og tale-til-tekst-arbejdsgange til de tilsvarende Modality Bridge-faner uden at fjerne den eksisterende tale-til-tekst-legeplads.

**Self-loop adgangsbypass:** når de beskriver opkaldsruter gennem OmniRoute egen `/v1` selv-sløjfe (ikke-standard udbydermodel), sender underforespørgslen `x-omniroute-admission-bypass: internal` og godkendes med den løste selvsløjfe-legitimation — den lokale `sk_omniroute` vagt i lokal tilstand, eller den operatørkonfigurerede `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env-nøgle (#1350 deployeringer kan stadig køre `REQUIRE_API_KEY=true` så opkaldet kan køres). Bypasset er kun hædret for de nøjagtige legitimationsoplysninger, så eksterne kunder kan ikke bruge overskriften til at springe optagelse over.

Ældre standarder lever i `src/shared/constants/visionBridgeDefaults.ts`; de nye mode/task-aware/cache -standardindstillinger og indstillingsresolveren lever i `src/shared/constants/modalityBridgeDefaults.ts`. Autoværnet afslører en `deps` konstruktør-mulighed, så test kan injicere falske `getSettings` og `callVisionModel` -implementeringer.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Opsnapper lydbærende chatanmodninger, før de når et mål, der ikke er kendt for at acceptere lydinput. Det omdirigerer aldrig chatanmodningen: lyddele transskriberes gennem det eksisterende OpenAI-kompatible multipart-slutpunkt, og den valgte chatmodel fortsætter med teksttransskriptioner.

Flyde:

1. Løs `supportsAudio` til `getResolvedModelCapabilities()`. Eksplicitte udbyder-registreringsmetadata vinder, derefter statiske modelmetadata og derefter synkroniseret `modalities_input`. En erklæret inputliste uden `audio` er `false`; ingen kapacitetsbevis er tilbage `null`. Både `false` og `null` aktiverer den konservative bro, mens `true` omgår den.
2. Løs `modalityBridgeAudio*` -indstillinger og udtræk splejsbare lyddele på øverste niveau fra hver besked gennem den delte `detectMediaParts()` detektor. Understøttede ledningsformer er OpenAI `input_audio`, `audio_url` og `source.media_type: "audio/*"`. Indlejret lyd detekteres til routing, men fjernes ikke af splejsningsstien. Arbejdet er begrænset af `modalityBridgeAudioMaxClips`; senere dele forbliver urørt.
3. Ændr en konfigureret `provider/model`, eller lad `selectAudioBridgeModel()` gå `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrækkefølge, og vælg den første model med en brugbar aktiv udbyder legitimation.
4. `callAudioTranscription()` konverterer base64/data-URI lyd til en `file` med flere dele eller downloader en fjern- `audio_url` gennem den offentlige kun udgående vagt med DNS pinning og en 25 MB bundet. Den POSTs derefter filen og den valgte model til den lokale `/v1/audio/transcriptions` -selvløkke, godkendt med `resolveSelfLoopBearer()`. Den eksisterende transkriptionsrute udfører normalt legitimationsopslag, cooldown/rate-limit håndtering og udbyderafsendelse.
5. Succesfulde opkald erstatter deres dele med `[Audio N]: <transcript>`. Opkald kører med `Promise.allSettled`: en individuel fejl bevarer den originale lyddel (#4012 kontrakt). Hvis hvert opkald mislykkes, og målet er bevist `supportsAudio === false`, bliver delene `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). For et ukendt mål (`null`) forbliver et resultat med alle fejl uberørt. Et dokumenteret tekst-kun mål uden brugbare STT legitimationsoplysninger modtager den samme eksplicitte stub uden at foretage et netværksopkald.

Vellykkede transskriptioner bruger den procesdækkende Modality Bridge LRU/TTL cache. Tasten kombinerer lydreferencen, den stabile `audio-transcription` driftsetikette og den valgte STT model; fejl gemmes aldrig i cachen. Lydforsøg opdaterer de delte `bridged`, `cacheHits`, `failures` og `lastUsedAt` tællere. Transformerede svar bærer `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; uberørte anmodninger modtager ikke et Audio Bridge-segment.

Kørselsindstillinger er DB-støttede og Zod-validerede:

| Nøgle                         | Misligholdelse | Rækkevidde        |
| ----------------------------- | -------------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`         | —                 |
| `modalityBridgeAudioModel`    | `""`           | Auto eller STT ID |
| `modalityBridgeAudioTimeout`  | `60000`        | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`            | 1–10              |

Den delte cache forbliver styret af `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Opsnapper videodele på øverste niveau i Chat Completions `messages` og Responses API `input` før et mål uden kendt indbygget videounderstøttelse kaldes. Understøttede former er `input_video`, `video_url`, `video_source`, HTTPS URLs og `data:video/*;base64,...` data URIs. Almindelige filnavne i tekst behandles ikke som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ejer anmodningsgennemgang, capability/policy -kontrollen, aggregering pr. anmodning og svarnyttelasten. Per video arbejde — erhvervelse, hele-resultat cachen, der beskriver en rammesekvens (som fusionerer enhver opkalds-erklæret lydtransskription), og per-forsøg metrics/abort/cleanup — er skjult bag `processVideoPart` i `videoBridgePipeline.ts`, kaldet én gang pr. videodel inde i `preCall` loop. Dette modul definerer også de eksplicitte portgrænser `VideoMediaBrokerPort` (indhentning af bytes og udtrækning af samplede rammer), `VideoAudioTranscriptionPort` (sammensmeltning af et opkalds-erklæret lydudskrift med de samplede billedtekster) og `VideoDrilldownPort` (den gamle råbutiksform). Produktion STT og frame retention er sammensat omkring den beskrivende port gennem `createVideoSttAdapter` og `createVideoDrilldownAdapter`; sidstnævnte bruger den delte livscyklus med uigennemsigtigt håndtag.

Den offentlige `/v1` -anmodningssti importerer eller påkalder aldrig en underproces. Fjernvideoer downloades under en 50 MiB -grænse; inline base64-videoer har en konservativ 36 MiB afkodet per-video cap, så model/messages/framing konvolutten kan forblive inden for den offentlige JSON anmodningsadgangsgrænse på 50 MiB. Inline længde og afkodede størrelse estimater kontrolleres før allokering. HTTPS er påkrævet på den oprindelige fjern- URL og hver omdirigering, ved at bruge den eksisterende udgående vagt, der kun er offentligt tilgængelig, med DNS pinning. Bytene krydser derefter den nøjagtige interne `POST /api/modality-bridge/video/extract` mæglergrænse. Denne rute er både `LOCAL_ONLY` og `SPAWN_CAPABLE`, accepterer kun en per-proces autentificeret, betroet loopback-anmodning og accepterer aldrig en URL, filsystemsti, eksekverbar eller argumentliste. API -rørledningen i kropsstørrelse og handlerens inkrementelle kropslæser håndhæver uafhængigt et mæglerindgangsloft på 50 MiB. Dens afgrænsede kø kører én udtrækning ad gangen, tillader fire afventende job og begrænser afventende input ved 100 MiB.

Inde i mægleren læser `ffprobe` en privat lokal fil; tilladelseslisten med fast format udelukker playliste- og manifestformater. For tilladte MOV-familiebeholdere forbliver eksterne MOV -datareferencer deaktiveret som standard, og den faste kommando tilmelder sig dem ikke. Både `ffprobe` og `ffmpeg` bruger `file` -only -protokolhvidlisten, én tråd, faste argumentarrays, ingen shell og eksekverbare filer løst fra `PATH`. Forsidestreams med vedhæftede billeder er ikke spilbare kandidater. Alle spilbare streams skal opfylde grænserne, og en eksplicit standardstream foretrækkes før det deterministiske laveste indeks faldback. Videoer er begrænset til 600 sekunder, 8.192 pixels pr. dimension og 33.554.432 kildepixels. FFmpeg sampler 1-16 midtpunkts JPEG rammer, nedskalerer den lange kant til højst 1.024 pixels uden at opskalere mindre input og modtager aldrig en URL. Sampling er `uniform` som standard. De valgfri `scene_aware` og eksperimentelle `segment_aware` politikker udfører en yderligere fast FFmpeg passage over den allerede validerede lokale strøm, vælger afgrænsede `showinfo` scenetidsstempler og falder deterministisk tilbage til de samme ensartede midtpunkter på detektorfejl, timeout, forkert udformet output eller et tomt kandidatsæt. Segment-bevidst tilstand allokerer midtpunktsprøver proportionalt med de validerede sceneintervaller; segmentbevidst evidens og fallback-adfærd er detaljeret nedenfor. Den hårde 16-ramme hætte påføres efter valg i hver politik. Når en scenebevidst anmodning kun har et budget på ét billede, bruger den det ensartede midtpunkt af det aktive fuldvideo- eller fokusvindue og rapporterer `policyEffective: uniform`: en enkelt valgt sceneramme kan ikke bevare begge tidsmæssige ender. En opkalder kan eventuelt give et endeligt fokusvindue (`start`/`end` sekunder); grænser er fastspændt til medievarigheden, omvendte eller ikke-endelige vinduer afvises, og alle samplingspolitikker udføres kun inden for det normaliserede interval. Det resulterende vindue er inkluderet i stikprøvemetadata og i det upålidelige beskrivelsespræfiks, så downstream-modeller kan skelne et fokuseret uddrag fra den fulde tidslinje.

Semantisk billedtekstfokus er en separat, eksplicit indstilling. Standard `full` -analysetilstanden bevarer den eksisterende rammeprompt og videresender aldrig anmodningstekst til billedtekstmodellen. I `focused` tilstand læser broen kun den seneste ikke-tomme bruger-autoriserede `text`/`input_text` fra den samme chat- eller svarbeholder, normaliserer den til NFC, kollapser kontroltegn og mellemrum og begrænser den til 500 Unicode-kodepunkter. Et tomt resultat falder tilbage til den nøjagtige `full` prompt. Et brugbart tip serialiseres som JSON i en dedikeret untrusted-user-context-blok og må kun prioritere observerbare detaljer; den kan ikke tilsidesætte den separate advarsel mod at følge instruktioner, der er synlige eller hørbare i mediet. Tekstfokus udleder aldrig `start`/`end` eller ændrer den tidsmæssige sampler.

#### FU-07 strukturelt segment bevis

`segment_aware` bruger et afgrænset præ-analysepass over den allerede validerede lokale videostream. Den faste filterkæde skalerer først til højst 320 pixels bred, registrerer sceneændringer og frosne intervaller, og sampler derefter med 1 billede pr. sekund for sløring, gennemsnitlig luma og spatial/temporal information. Passet er begrænset til 600 strukturelle prøver, én FFmpeg/filter tråd, den samme `file` -only -protokol og containertilladelseslister, en 1 MiB proces-output bundet, og højst 30 sekunder inde i mæglerens delte abort/deadline. Den accepterer aldrig en kommando, filter, sti eller URL fra anmodningen.

De strukturelle værdier er deterministisk prøveudtagningsbevis, ikke semantisk videoforståelse. De udleder ikke emner, handlinger, billedtekster, tale eller brugerhensigt. Scene- og frysegrænser danner segmenter; fastfrysning af dækning, sløring, eksponering, rumlige detaljer og tidsmæssige ændringer påvirker kun, hvordan det eksisterende budget på 1-16 billeder fordeles. Et fuldt frosset segment er begrænset til én frame, mens ikke-frosne segmenter konkurrerer om det resterende budget. Når grænserne er større end rammer, bibeholdes ensartet tidslinjedækning, så hurtige tidlige klip ikke kan skjule et langt bagende segment. Scenegrænser inden for 1-sekunds analyseopløsning af en frysegrænse er sammensmeltet.

Manglende filtre, malformed/empty -beviser, en detektorfejl eller den afgrænsede timeout før analyse er åben for den nøjagtige ensartede midtpunktspolitik. En opkaldsafbrydelse eller en mægler-deadline svigter ikke åben: den afslutter underprocessen under flyvningen, forhindrer senere udtrækning af rammer, og det private midlertidige træ fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske reelle FFmpeg armaturer til post-dedup billedtekst-opkald besparelser, tæt-motion budget allokering, blur/exposure/SI-TI beviser, hurtige nedskæringer med en lang hale, og gradvis-fade falske positiver. Den registrerer vægtid før analyse og, hvor `/usr/bin/time` er tilgængelig, underordnet CPU og peak RSS. Dens kvalitetstjek er kun strukturelle orakler. Ægte billedtekst-modelkvalitet forbliver `HOLD`, fordi denne sele ikke har noget autoriseret slutpunkt eller frossen dommer. Monetære besparelser forbliver også `HOLD` medmindre `--caption-cost-per-call-usd` leverer et eksplicit positivt skøn pr. opkald; scriptet fremstiller aldrig nogen af resultaterne.

Hver frame er begrænset til 4 MiB, alle rå frames tilsammen til 23 MiB, og det serialiserede mæglersvar til 32 MiB. En privat midlertidig mappe er fjernet i `finally`. OmniRoute bundter ikke FFmpeg og accepterer ikke en brugerdefineret eksekverbar sti. Før tekstning anvender broen et konservativt visuelt deduplikeringspas: hver JPEG reduceres til en 16 × 16 gråtonebuffer og sammenlignes kun med den sidst bevarede ramme. For et anmodet billedtekstbudget over én frame, leverer udtræk en afgrænset kandidatpulje på op til det dobbelte af budgettet og aldrig mere end 16 frames. Det anmodede loft anvendes kun efter deduplikering, med de første og sidste udvalgte kandidater bevaret under den endelige udtynding, når budgettet er på mindst to. Den versionerede `grayscale-16x16-mean-cells-v2` politik bruger den største af middel luma delta og forholdet mellem thumbnail celler, hvis normaliserede delta er mindst 0,05. Duplikattærsklen er konstanten 0,04, valgt for forudsigelighed i stedet for at blive eksponeret som en runtime-indstilling. Dette sekundære højkontrastsignal bevarer små bevægelser og synlige tekstændringer, som en gennemsnitlig sammenligning kan skjule. Komparator- eller dekoderfejl svigter åben og holder dækningen. Outputmetadata adskiller udtrukne kandidater, anvendte rammer med succes og visuelle dubletter, der er droppet.

En eksplicit markeret videodel kan anmode om et tidsstemplet kontaktark. Broen bygger højst et 4-søjlet, 16-ramme JPEG gitter. Hver celle på 512 pixel brænder sit kildetidsstempel ind i et bundbånd med høj kontrast, mens de samme tidsstempler forbliver i tekstmæssige metadata til downstream-tilknytning og revision. Den komplette JPEG forbliver begrænset til 32 MiB. Hvis `sharp` ikke kan afkode eller sammensætte gitteret, falder broen tilbage til de individuelle JPEG rammer; en klientafbrydelse forplanter sig stadig gennem arkoperationen.

Promoveringsbeviser er bevidst adskilt fra mikrobenchmark for syntetisk sammensætning. `scripts/perf/video-bridge-contact-sheet-eval.ts` definerer en skemaversioneret A/B -sele til ægte OpenAI-kompatible vision-modeller. Det måler udbyder-rapporterede tokens, ende-til-ende væg-latens (inklusive arksammensætning), antal modelopkald og manifest-defineret faktaopbevaring. Råmodelsvar skrives ikke til rapporten; kun SHA-256 digests og matchede fakta IDs bevares. Selen foretager intet netværk eller betalingsmodelopkald, medmindre `--execute-real` er bestået og `--model`, `OMNIROUTE_BASE_URL` og `OMNIROUTE_API_KEY` er konfigureret. Uden den eksplicitte rigtige kørsel forbliver dens maskinlæsbare dom `HOLD`; syntetiske payload/call-count målinger alene er ikke reklamebeviser.

Den separate `scripts/perf/video-bridge-promotion-eval.ts` bruger FU-07 eller FU-09 observationer. Promoveringsadgang kræver alle otte syntetiske scenarier plus et desinficeret ægte klip, mindst tre målte gentagelser pr. rolle og sag, alle ti erklærede metrikker, frosne media/prompt/expected-fact/settings sammendrag, unik observations- IDs og verificeret seeded A/B rækkefølge. Udførelseskvitteringen binder corpus digest, eksakt kandidat SHA og modelrevision. Manglende eller ugyldige målinger forbliver `HOLD`, inklusive CPU over 30 s, top RSS over 512 MiB eller præanalyse over 30 s. Disse er bevis-admission caps, ikke en ny runtime RSS håndhævelse garanti.

FU-07 kræver mindst 98 % kvalitetsretention og p95-latens ikke mere end 1,2x baseline, plus enten en 0,05 absolut case-balanceret gennemsnitsforbedring ved ækvivalente gennemsnitlige billedtekstkald eller mindst 10 % færre gennemsnitlige post-dedup billedtekstkald. FU-09 kræver mindst 0,85 kvalitet, 95 % retention, 20 % median latency reduktion og 10 % token reduktion. Tab af kritiske kendsgerninger, overholdelse af injektion eller manglende brug forhindrer forfremmelse. Én udførelse kan ikke fremme noget: `--previous-report` bekræfter to adskilte, ikke-overlappende, fortløbende kvalificerede udførelser af den samme policy/model revision/candidate/corpus. Et stikprøveeksperiment kan ikke bekræfte et kontaktark-eksperiment.

Samlere bør score svar i hukommelsen og gemme `responseDigest` plus metrikker og observationsbindinger, aldrig svartekst. Forbrugeren læser også gamle råobservationer, men kopierer aldrig denne tekst ind i sine rapporter. Præcis én af `responseDigest` eller `rawResponseText` accepteres for hver observation. Den versionerede tilladelsesliste forbliver tom med en uforanderlig `hold` standard. En berettiget post kræver sin bevisreference, politik, modelrevision, nøjagtige kandidat SHA, manifest digest og to distinkte kørsel IDs; modstridende sammenhænge afvises. Disse metadata er en revisionskontrakt, ikke et bevis på, at en refereret fil indeholder ægte målinger. Gennemgå de faktiske kvitteringer, før du tilføjer en post. Ledelsesstatistikkens slutpunkt og video-dashboard afslører konservativ parathed. Et konfigureret modelalias alene etablerer ikke dens revision eller den kørende kandidat SHA, så det aktuelle dashboard rapporterer `HOLD` i stedet for at genbruge berettigelse fra en anden eksekveringskontekst. Eksplicit eksperimentel udvælgelse forbliver adskilt fra promovering; ingen standard ændres automatisk.

Opkaldere kan vedhæfte et valgfrit `transcript.cues` array til en understøttet videodel, når de allerede har tilpasset tekst. Hver stikord skal have `text`, et begrænset `start`/`end` -interval inden for den probede varighed og en hvidlistet `source` (`client`, `embedded` eller `audio-bridge`); `confidence` er standard til `1` og skal forblive mellem `0` og `1`. Nøjagtige duplikerede signaler er kollapset. OmniRoute starter aldrig transskription fra disse metadata: validerede signaler kopieres til det beskrevne resultat med kilde, konfidens og interval og gengives som upålidelige observationer sammen med billedteksterne. Ugyldig, uden for rækkevidde eller herkomstfri tekst afvises i stedet for at blive blandet ind i billedtekststrømmen. Begge forespørgselstekst-transskriptionskanaler normaliserer leveret herkomst til `client`, inklusive selvhævdende `embedded` eller `audio-bridge` etiketter. Kun en serverejet adapter kan tildele disse betroede etiketter gennem argumentet `trustedSource`, der kun er kode; et request JSON felt kan ikke nå dette argument. Transskriptionstekst forbliver upålideligt medieafledt indhold, uanset dets herkomst, og må aldrig afgøre autorisation.

En avanceret opkalder kan levere et `audioTranscript` -spor til den samme video; den behandles som klient-leveret tekst, ikke bevis for servertransskription. Fusionssømmen kører visuelle og lydobservationer under én deadline og afbryde signal, bestiller dem på en fælles tidslinje, kollapser nøjagtige dubletter og rapporterer et delvist resultat, når kun den ene side lykkes. En ugyldig `audioTranscript` forringer det delvise resultat — den visuelle beskrivelse bevares, og lydgrenen registrerer en desinficeret fejlkode — i stedet for at fejle hele videoen. Tilgængelighed pr. branche, det partielle flag og de desinficerede fejlkoder bevares i det beskrevne resultat, i autoværnsmetadataene (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), i resultat-cache-metadataene og i brofusionstællerne. Standard Video Bridge-stien kalder ikke tale-til-tekst eller downloader en anden mediekopi; uden det eksplicitte spor forbliver det kun video.

**Transskriptionsretention (#12150 P1).** Dette gælder automatisk, hver gang Video Bridge (selv opt-in) gengiver en transskriptions-cue — er der ikke noget separat tilbageholdelsesflag. Når en anmodning gengiver et hvilket som helst transskriptionssignal (en opkalds-erklæret `transcript` eller en fusioneret `audioTranscript`), markerer autoværnet det `videoBridgeObserved` og producerer en redigeret skygge af videobeskrivelsen — en identisk gengivelse, hvor hver stikords friteksttekst erstattes af `[redacted-video-transcript]`, bygget ved at erstatte det parassemblerede felt før den strukturerede streng (cuvering) fladtrykt tekst, så intet cue-indhold — modstridende eller almindeligt, inklusive kroppe, der indeholder `]` såsom `[inaudible]`/`[music]` — kan overleve). Den vedvarende opkaldslog-anmodningstekst udskifter hver videoafledt tekstdel med den redigerede skygge, matchet af indholdslighed; `fullText` ankeret genlæses fra den færdige pre-call autoværn nyttelast, så matchen lykkes stadig efter senere kæde autoværn ( PII og credential maskererne, priorities 10/95) omskriver beskrivelsesteksten på plads og efter system-prompt/handoff/memory injektion omformer meddelelsesarrayet. Kroppen sendt opstrøms til modellen er uændret. En observeret anmodning udfylder heller ikke nogen holdbar hukommelse (både anmodnings- og svarafledt udtrækning springes over), så modellens eget svar kan ikke ekko transskriptionstekst ind i hukommelsen.

**Rå videofelter (#12430).** Når broen er aktiveret, og native video-understøttelse er ukendt eller fraværende, aktiverer definerede `transcript`/`audioTranscript` -felter også `videoBridgeObserved`, selv efter beskrivelsesfejl eller en `maxVideos` grænse. `null` og tomme strenge tæller; fraværende felter og ikke-video-metadata gør det ikke. Beholdte kopier redigerer disse felter eller udelader anmodningen, og caches/Memory omgås.

På disse fallback-stier bliver gyldige opkaldssignaler til understøttede `text`/`input_text` -dele snarere end ikke-standard udbyderfelter. Begge spor, der er leveret af anmodningen, forbliver upålidelige `client` observationer, med en eksplicit advarsel om, at videoen ikke blev beskrevet, og tidsstempler ikke blev verificeret mod medierne. De eksisterende 256-cue/64-KiB total- og per-cue-budgetter gælder på tværs af de to spor sammen; tidsstempler skal passe til mæglerens 600 sekunders loft og et eventuelt medfølgende fokusvindue. Ugyldige spor kasseres, ikke videresendes som vilkårlig tekst; en gyldig søskende kan stadig bruges, medmindre deres samlede budget overskrides. Null/empty -felter tilføjer ingen tekst. Ingen mediehentning eller transskription tilføjes af denne reserve. Transskriptionsudvidelsesfelter fjernes fra reservevideobæreren og dens `video_url`/`source` -objekter. Tilladelseslisten for OpenAI -ledninger forbliver streng; ukendte indfødte videobærere forbliver tilgængelige, og kendte tekstmål bevarer sikre markører. Strukturerede redaktionsskygger beskytter den vedhæftede transskriptionstekst, mens den oprindelige opkaldsejede anmodning forbliver uændret. Native-understøttede mål og handicappede broer bevarer deres eksisterende bypass-adfærd.

Yderligere bevarede kopier bruger det samme observerede anmodningssignal. Det rå pre-guardrail-klient-anmodnings-øjebliksbillede, afventende anmodning i hukommelsen og tidligt afvist-anmodningslog erstatter strukturelt transskriptionsfelter i videodele; strengprompts syntetiseret af pipelinestadier og kontekstoverdragelse redigeres ved persisted-request-body-vasken. Den vedvarende `video_content_removed` markør gør, at `previous_response_id` fortsættelse ikke lukkes i stedet for at rekonstruere tekst, der med vilje blev kasseret. Hvis en observeret anmodning mister sin per-part redaktionsskygge før logning, eller endda en af flere videoskygger ikke matcher efter senere anmodningsmutationer, udelades den bibeholdte anmodningstekst helt i stedet for at bibeholde en delvist redigeret transskription.

For en observeret anmodning kan et modelsvar citere enhver del af transskriptionen uden en struktureret stikordsgrænse. Dens vedvarende opkaldslog `responseBody` erstattes derfor af en udeladelsesmarkør; den detaljerede rørledningsartefakt (som kan omfatte upstream/client kroppe og strømstykker) bibeholdes ikke. Semantisk, idempotens og ræsonnement-replay caches omgår læsninger og skrivninger for den anmodning. Udbyderanmodningen og det klientsynlige svar forbliver uændret. Tidlige keepalive bytes drænes fra den midlertidige buffer, når den detaljerede artefakt udelades. Kiro misdannede EventStream -advarsel rapporterer kun antallet af nyttelastbyte, aldrig indholdet eller JSON -parserens rå fejl. Dette hævder ikke, at enhver ikke-relateret provider/plugin -diagnostik er blevet auditeret; det bredere retained-sweep spores i #11658.

Den interne `/api/modality-bridge/video/drilldown` livscyklus er et separat loopback/token-authenticated -cache-substrat. Hver operation kræver også en kanonisk uigennemsigtig principal ID. Før en produktionsopkalder aktiveres, skal den udlede den ID fra den godkendte lejer og må aldrig videresende en klientvalgt værdi. Cachenøgler binder den principal til kanonisk session og videoreference IDs, gemmer kun deres SHA-256-derived nøgler og omfavner både læsninger og sletning til den samme principal. Cachen gemmer højst 16 afledte JPEG rammer pr. indtastning, udløber dem efter ti minutter og understøtter afgrænsede `start`/`end` -læsninger eller eksplicit sessionssletning.

Hver principal er begrænset til 16 poster og 64 MiB kanoniske JPEG data. Disse grænser er uafhængige af det globale 64-entry/256 MiB loft: hovedkvotepres fjerner kun den pågældende rektors mindst nyligt brugte poster før global LRU udsættelse. Udløbne poster fejes fra både hoved- og globalt regnskab for cacheaktivitet, mens annullering og valideringsfejl ikke begår en delvis erstatning.

Cachen afviser ikke-kanonisk Base64, overskydende polstring, ikke-JPEG-medier, misformede eller trunkerede JPEGs og JPEGs, der producerer en advarsel under en afgrænset fuld-billede `sharp` afkodning. Det genkoder hvert accepteret billede som en kanonisk JPEG, udleder bredde og højde fra de afkodede bytes i stedet for at stole på opkaldsfelter, og kasserer eventuelle efterfølgende polyglot-bytes i stedet for at beholde dem. Kun den afgrænsede kanoniske komprimerede buffer debiteres begge kvoter. JSON -ledningsgrænsen inkluderer Base64-overhead til loftet med 32 MiB afkodet input. Hver lagret afledning registrerer dens validerede JPEG format/resolution, samplingspolitik, afledningsversion, oprettelsestid, server-beregnet indholds-hash og hash-forælderreference plus den betroede opkalders overordnede-indhold-hash. Annullering kontrolleres mellem asynkrone decode/hash faser før den atomare cache-commit.

Produktionsproducenten genbruger kun allerede afledte mæglerrammer efter vellykket visuel analyse, uden yderligere video download/extraction. Det kræver operatør `modalityBridgeVideoDrilldownEnabled=true`, streng per-part `drilldown: true` og en autentificeret API-nøgle record ID. Klient-erklærede principal/session værdier etablerer aldrig ejerskab. Uden alle tre betingelser hash, ændrer størrelsen eller bibeholder den ikke yderligere rammer. Retentionsfejl bevarer den brugbare visuelle respons. Samtykkede anmodninger omgår hele videoresultatcachen, så cachelagrede resultater afspiller aldrig håndtag igen.

Succesfulde JSON og SSE -svar afslører højst fire uigennemsigtige håndtag i den afgrænsede `x-omniroute-video-drilldown` header. Autoriseret browseroprindelse kan læse den overskrift uden at udvide CORS oprindelsespolitikken. Nye håndtag bruger `v1.<32-byte random base64url token>`, og registreringsdatabasen beholder kun deres SHA-256 hash. reader/header parseren accepterer også ældre 64-hex-tokens. Den godkendte offentlige forbruger er `GET /api/v1/video-bridge/drilldown?handle=...`, uafhængigt gated af `modalityBridgeVideoDrilldownRemoteEnabled=true`. Eksplicit vedvarende falsk tilbagekalder adgang, selv når den gamle `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback er aktiveret. Produktionsfastholdelse har den analoge gamle `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` faldback. Begge fallbacks er som standard slået fra.

Forbrugeren henter ejerskab fra den autentificerede nøgle og anvender nøglepolitik: både GET og DELETE tilhører `video` endepunktskategorien, inklusive `/v1` og `/api/v1` aliasserne. Nøgler med en ikke-tom slutpunkttilladelsesliste skal indeholde `video`; ubegrænsede nøgler forbliver kompatible. Forbrugeren returnerer den samme 404 for ukendt, udløbet og en anden nøgles håndtag. Den accepterer `variant=preview|standard|detail` (maksimal JPEG dimension 320/640/1280, aldrig opskaleret), `limit=1..8` (eller det gamle `frames` alias, aldrig begge), nul-baseret `page` og valgfri `start`/`end` -fokussekunder. Duplikerede forespørgselsnøgler og vinduer med omvendt fokusering afvises. Hver returnerede variant har en hash af dets faktiske indhold og faktiske opløsningsmetadata, knyttet til den bevarede kilde. Varianter er afledt ved læsning snarere end gemt som ekstra bevarede kopier. JSON responset, inklusive Base64/envelope, er begrænset til 32 MiB; en overdimensioneret side returnerer 413 og klienten skal anmode om færre rammer. Læser annullering af tjek omkring hver ændring af størrelsen og kontrollerer håndtagets gyldighed igen før returnering. `DELETE` af ejeren er idempotent; sletning eller TTL udløb frigiver den bevarede kilde og brugsregnskab.

Det delte lager er proceslokalt: håndtagene udløber ved genstart og kan ikke overføres mellem uafhængige OmniRoute processer. Administrationsstatistikker afslører kun effektiv opbevaring/fjernpolitik og aggregeret bibeholdt entries/bytes, aldrig medier, referencer, principielle IDs eller håndtag. Panelet Videoindstillinger viser disse værdier og kan fortsætte med begge samtykkeskift. Denne implementeringsdokumentation er ikke bevis for live-implementering eller forfremmelse; accept af den rigtige model spores separat.

Frames er undertekster sekventielt med den konfigurerede videomodel. En tom videotilsidesættelse arver indstillingen Vision; hvis begge er tomme, vælger Vision auto-routeren den effektive vision-kompatible model. Vellykkede billedtekster erstatter den originale del med et stabilt `[Video description:` præfiks, der også markerer teksten som en upålidelig medieafledt observation og fortæller downstream-modeller om ikke at følge instruktionerne i medierne. Frame-caption cache-nøgler inkluderer JPEG bytes, prompt, tidsstempel og effektiv model; kun vellykkede billedtekster cachelagres. Cache-indtastninger bevarer den faktiske succesrige producentmodel, inklusive en fallback-model; broen rapporterer `mixed` når forskellige rammer blev produceret af forskellige modeller. Et cachehit genbruger denne producentidentitet i stedet for at ommærke den som den anmodede routingplan. Hele videoresultatcachen indtastes på hvert input, der ændrer output- — prompten, effektive model, samplingpolitik, antal billeder, semantisk analysetilstand, SHA-256 fingeraftrykket for det normaliserede fokustip, fokusvindue, `transcript`, `audioTranscript` og kontaktark-flaget —, så det er en gammeldags glip af at ændre nogen af disse dimensioner. Den visuelle dedup-politikversion, tærskel og afgrænsede kandidatramme-antal er også eksplicitte i resultat-cache-nøglen og metadata; en politikændring kan derfor ikke genbruge en forældet helvideobeskrivelse. Result-cache v4 metadata bevarer tilstanden og fingeraftrykket, aldrig den rå brugeropgave. Guardrail-metadata rapporterer både de ønskede og effektive analysetilstande; en anmodet `focused` -tilstand uden brugbar brugertekst rapporteres som effektivt `full`.

Autoværnet udtrækker alle understøttede videodele, men beskriver ikke mere end `modalityBridgeVideoMaxVideos`. For et mål, der har vist sig at have `supportsVideo === false`, bliver mislykkede og overbegrænsede videoer eksplicitte sikre tekstmarkører, så ingen rå video overlever. Når kapaciteten er ukendt, beholder disse dele deres videobærer; enhver reservetransskription følger den afgrænsede tekstkonvertering ovenfor. Mål med `supportsVideo === true` omgår broen. Klientanmodningsafbrydelsessignalet forplanter sig gennem download, mæglerkø, underprocesser og billedtekstopkald; afbryder stop mellem videoer og fejler aldrig åben for råmedier.

Kørselsindstillinger er DB-støttede og Zod-validerede:

| Nøgle                               | Misligholdelse | Rækkevidde / adfærd                                                                                    |
| ----------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`        | Valgfri køretid, opt-in                                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`       | `full` bevarer generiske billedtekster; `focused` bruger afgrænset, upålidelig seneste brugerkontekst  |
| `modalityBridgeVideoModel`          | `""`           | Arv Vision Bridge-modellen                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`            | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`    | `uniform`, `scene_aware` eller proportional `segment_aware`; detektorfejl falder tilbage til `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`            | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`       | 1000–120000 ms                                                                                         |

Ældre vedvarende videotimeoutværdier over 120 sekunder er fastholdt til mæglerens deadline; nye indstillinger skriver over, at grænsen afvises. `GET /api/modality-bridge/video/runtime` kræver betroet stemplet loopback-lokalitet før godkendelse eller runtime-probing, og kræver derefter administrationsgodkendelse. Det returnerer kun `available`, desinficerede FFmpeg/ffprobe versioner og en fast årsag til, at kørselstiden ikke er tilgængelig. Det interne ekstraktionsslutpunkt er ikke et offentligt upload API: kømætning returnerer `503` plus `Retry-After`, en opkaldsafbrydelse returnerer `499`, og den faste mæglerdeadline returnerer `504`. Konverterede svar tilføjer `video->text;model=<visionModel>;parts=<videos>` til den centrale `x-omniroute-modality-bridge` header uden at fjerne Vision- eller Audio-segmenter.

### PII Masker (`piiMasker.ts`)

Kører videre** begge** etaper.

- **`preCall`** kloner nyttelasten, går `system`, `messages`, `input` og `prompt` (inklusive almindelige strengelementer) og anvender `processPII()` (fra `@/shared/utils/inputSanitizer`) til streng `content`/`text` felter. Når `PII_REDACTION_ENABLED=true`, bliver detekteret PII redigeret i den udgående nyttelast. Dette er uafhængigt af `INPUT_SANITIZER_MODE` (som kun kontrollerer prompt-injection policy). Når redigering er slået fra, tæller registreringen af opkaldsposter uden omskrivning af indhold.
- **`postCall`** dybkloner svaret, kører `sanitizePIIResponse()` plus Responses-API-shape-maskeren (`maskResponsesOutput` — dækker `output_text` og `output[].content[].text`). Hvis der sker en redigering, erstatter det ændrede svar originalen.

Autoværnet blokerer aldrig; den annoterer kun (`meta.detections`, `meta.redacted`) eller omskriver.

**Vendbar hvælving (`PII_REVERSIBLE_VAULT_ENABLED`, standard `false`).** Når både `PII_REDACTION_ENABLED` og `PII_REVERSIBLE_VAULT_ENABLED` er tændt (DB tilsidesætter > env > standard, læst én gang pr. anmodning), åbner `handleChat` en boks pr. klientanmodning (`src/lib/pii/requestTokenVaultScope.ts`) og sender den til pre-call pass som `GuardrailContext.tokenVault`. Maskeren skriver derefter surrogat-tokens såsom `<<PII_EMAIL_QWERTYUI_1>>` i stedet for `[EMAIL_REDACTED]`, for både indbyggede, validerede (GDPR/POPIA) og brugerdefinerede regler. Nonce er 8 tilfældige store bogstaver pr. anmodning, og den samme værdi får den samme token i anmodningen. Kun maskerne slår igennem: prompt-indsprøjtningsbeskyttelsen og `/api/guardrails/test` kører uden hvælving og beholder pladsholderne.

- Udbyderen, hvert kombiben, genforsøg, medlem af fusionspanelet og fusionsdommeren ser kun tokens. Tokens gendannes én gang, på 2xx-svaret, der efterlader `handleChat`: per felt på den parsede SSE (et token opdelt på tværs af hændelser løses stadig; tool-call-argumenter er JSON-escaped) eller pr. felt på en JSON body, med en genberegnet `Content-Length`. Indhold og begrundelsestekst og værktøjskaldsargumenter gendannes. Fejllegemer (4xx/5xx) beholder tokens.
- Fejl forbliver private: hvis prægning mislykkes, eller hvælvingen nægter en værdi (1000 indtastninger, 256 tegn pr. værdi, 64 KB i alt), skrives pladsholderen i stedet; et symbol, som hvælvingen ikke kan løse, eller en gendannelse, der mislykkes, forbliver bogstavelig, og kun en optælling logges. Hvælvingen har ingen timere og ingen global tilstand; den slettes, når svarstrømmen slutter, annulleres eller fejl.
- Når en anmodning præges tokens, hukommelsesudtrækning, idempotency saven og begge semantiske cache-skrivninger springes over, fordi ingen senere anmodning kunne løse disse tokens. I opkaldslogger bærer udbyderens anmodning og svar tokens; det loggede klientanmodningslegeme er stadig det rå klientinput, som med almindelig redaktion.
- Tokens bruger en tilfældig nonce pr. anmodning, så promptpræfikset ændres ved hver tur: Caching af prompt på udbydersiden rammer ikke for maskerede sving, og et token, der kommer tilbage i en senere tur (for eksempel via `previous_response_id`) tilhører en gammel anmodning og forbliver bogstavelig.

#### Per-type valg, brugerdefinerede mønstre og detektionstællere

**Dashboard → Indstillinger → Sikkerhed → PII maskering** vælger _hvad_ er maskeret. Den slår ikke maskering til: det er stadig `PII_REDACTION_ENABLED` (anmodning) og `PII_RESPONSE_SANITIZATION` (svar + SSE), begge deaktiveret som standard.

- **Valg af type pr** — de indbyggede id'er er angivet i `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Frakoblet betyder hver type (adfærden før denne indstilling eksisterede). Anmodningsmotorens `ssn_us` mønster kortlægges til `ssn`. Skabeloner (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) udfylder kun afkrydsningsfelterne i UI.
- **GDPR og POPIA identifikatorer** — tolv indbyggede id'er, der dækker EU og sydafrikanske personlige identifikatorer (tabel nedenfor). Deres regexes, validatorer og jurisdiktionstags lever i én tabel, `src/shared/utils/piiPatterns.ts`, som både response sanitizer (`src/lib/piiSanitizer.ts`) og request-maskeren (`src/shared/utils/inputSanitizer.ts`) bruger. Et match redigeres kun, når dets validator accepterer det; et blot løb af cifre er aldrig nok. En operatør, der gemte en indsnævret markering, før disse id'er eksisterede, bevarer den adfærd, den havde, indtil de nye id'er er afkrydset.
- **Brugerdefinerede mønstre** — op til 20 regex- eller jokertegnmønstre (`*` = op til 64 ikke-mellemrumstegn, `?` = en). Kampe bliver `[CUSTOM_REDACTED]`. Hvert mønster går gennem `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): højst 500 tegn, flag begrænset til `g i m s u`, skal kompilere, skal passere `safe-regex` (katastrofisk tilbagesporing), og må ikke matche en tom streng eller en redaktionspladsholder. Et mønster, der fejler, afvises, når det gemmes og testes, og en lagret række, der fejler, springes over under kørsel i stedet for at blive kompileret. Brugerdefinerede mønstre kører kun, mens maskering er aktiveret.
- **Detektionstællere** — pr. type tæller (aldrig matchede værdier), opbevares i hukommelsen og nulstilles ved genstart (`src/lib/pii/piiDetectionStats.ts`). De øges kun, mens maskering er aktiveret.

Indstillingerne findes i `key_value` tabellen (navneområde `pii_settings`, `src/lib/db/piiSettings.ts`) og læses gennem en 1 s cache. API:

| Metode | Sti                      | Formål                                                            |
| ------ | ------------------------ | ----------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flagtilstand, `enabledTypes`, `customPatterns`, detektionstællere |
| `PUT`  | `/api/settings/pii`      | Erstat `enabledTypes` (`null` = all) and/or `customPatterns`      |
| `POST` | `/api/settings/pii/test` | Tørkør ét mønster mod en prøve på højst 8 KB; intet er gemt       |

Alle tre kræver administrationsgodkendelse og validerer kroppen med Zod (`src/shared/validation/schemas/piiSettings.ts`). Med login deaktiveret (`requireLogin=false`) er `GET` og testslutpunktet åbne, men `PUT` har stadig brug for en dashboard-session, en `manage` -scope API nøgle, et `oma_` adgangstoken med skriveomfang eller højere eller CLI tokenet eller intern-service-token sendt fra loopback.

#### GDPR (EU) og POPIA (Sydafrika) identifikatorer

| Id                  | Identifikator            | Validering                                                                                        |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | Kendt land, nøjagtig længde for det land, ISO 13616 MOD-97-10                                     |
| `eu_vat`            | EU VAT nummer            | Kendt medlemsland-præfiks og denne stats talformat (ingen VIES opslag)                            |
| `es_dni_nie`        | Spansk DNI / NIE         | Kontrolbogstav (værdi mod 23); NIE er `X/Y/Z` + 7 cifre                                           |
| `it_codice_fiscale` | Italiensk Codice Fiscale | Kontrolbogstav fra odd/even positionstabellerne                                                   |
| `pl_pesel`          | polsk PESEL              | Vægtet kontrolsum og en kodet fødselsdato, der eksisterer                                         |
| `nl_bsn`            | hollandsk BSN            | 11-proof (vægte 9..2, -1)                                                                         |
| `de_steuer_id`      | Tysk Steuer-ID           | ISO 7064 Mod 11,10 plus cifferstrukturreglerne (ingen indledende 0)                               |
| `se_personnummer`   | svensk personnummer      | Luhn over de sidste ti cifre og en plausibel fødselsdato (10 eller 12 cifre)                      |
| `za_id`             | Sydafrikansk ID nummer   | Luhn over alle 13 cifre, gyldig fødsel month/day, statsborgerskab ciffer 0 eller 1                |
| `za_phone`          | Sydafrikansk telefon     | `+27` / `27` -præfiks eller den nationale `0..` form skrevet med et mellemrum eller en bindestreg |
| `za_vat`            | Sydafrikansk VAT nummer  | 10 cifre starter med `4`** og** "VAT" / "BTW" i de 48 tegn før                                    |
| `za_tax_ref`        | Sydafrikansk skatteref.  | 10 cifre starter `0`-`3`, Luhn,** og** "skat" / "SARS" i de 48 tegn før                           |

Fordi formaterne med kun cifre kolliderer med ordrenumre, build-numre og tidsstempler, har de svageste (`za_vat`, `za_tax_ref`) brug for nøgleordet cue, og et blottet ti-cifret `0..` -nummer behandles ikke som et sydafrikansk telefonnummer. Mellemrum IBANs (`GB29 NWBK ...`) matches ikke. På streaming-stien bliver stikordet kun slået op inde i den aktuelle del. Id'erne ligger foran de generiske telefonmønstre, så en valideret identifikator beholder sin egen pladsholder (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Skabelonerne `gdpr` og `popia` vælger henholdsvis EU og sydafrikanske id'er. Maskering i sig selv forbliver opt-in (Hard Rule #20): intet her ændrer standarden for feature-flag.

### Hurtig injektion (`promptInjection.ts`)

Registrerer modstridende strukturer i brugerleveret indhold og håndhæver den konfigurerede politik. Adfærd er drevet af miljøvariabler og konstruktørmuligheder:

| Indstilling  | Env var                                                                                               | Misligholdelse | Effekt                                                                                                                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiveret    | `INPUT_SANITIZER_ENABLED`                                                                             | `true`         | Når `false`, autoværn kortslutter.                                                                                                                                                                      |
| Mode         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`         | Injektionspolitik: `block`, `warn` eller `log`. (`redact` er accepteret for back-compat, men gør det** ikke** stribe indsprøjtning tekst; anmodning PII omskrivning styres af `PII_REDACTION_ENABLED`.) |
| Blok tærskel | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`         | Minimum sværhedsgrad påkrævet for at blokere. Medium er som standard kun observation.                                                                                                                   |

**Modus forrang** (`getMode`): ringer op `options.mode` → `INJECTION_GUARD_MODE`**DB feature-flag tilsidesættelse** (Dashboard → Indstillinger → Funktionsflag) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. En dashboard-tilsidesættelse vinder derfor over env vars, så Feature Flags UI styrer running guard live (ingen genstart). DB læsningen er fejlsikker: hvis den fejler, falder vagten tilbage til den env-baserede adfærd, og når der ikke er indstillet nogen tilsidesættelse, er adfærd identisk med env-only-opløsning.

Detektionskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (delt detektorsæt, der bruges andre steder i rørledningen).
2. Indbygget `DEFAULT_GUARD_PATTERNS` (i øjeblikket `system_override_inline` og `markdown_system_block`, begge `high` sværhedsgrad).
3. Valgfri `customPatterns` sendt via konstruktørindstillinger (strenge, regex eller `{ name, pattern, severity }` poster).

Når `mode === "block"`** og** mindst én detektion opfylder sværhedsgradsgrænsen, `preCall` returnerer `{ block: true, message: "Request rejected: suspicious content detected" }`. I `warn`/`log` -tilstande logger autoværnet, men tillader opkaldet. Den delte hjælper `evaluatePromptInjection()` eksporteres også til opkaldere, der har brug for at evaluere prompter uden at gå gennem registreringsdatabasen.

**Scan bundet (v3.8.20):** detektoren inspicerer kun** første 16 KB** af sammenføjet prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) i `src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` før du kører mønsterløkken. Injektionsdirektiver sidder nær toppen af en input, så dette begrænser regex CPU/GC på multi-hundrede KB nyttelast uden at svække detektion (jf. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Kører videre** begge** trin, sidst i standardkæden (prioritet `95`). Redagerer velkendte API-nøgle/hemmelige token-mønstre fra den udgående nyttelast (meddelelsesindhold, værktøjskaldsargumenter, værktøjsresultater)** og** udbyderens svar, så en legitimation indsat i en prompt (eller gentaget af et værktøjsresultat) lækkes ikke til opstrømsudbyderen eller tilbage til klienten.

- **Kun tilmelding** , samme konvention som PII -redaktion (hård regel #20-adjacent): deaktiveret, medmindre `settings.credentialRedactionEnabled === true`** eller** `CREDENTIAL_REDACTION_ENABLED=true`. Med det slukket er autoværnet en no-op — det aldrig blokerer og aldrig omskriver.
- `redactCredentials()` går gennem det fulde payload/response træ (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) og erstatter matches med en `[REDACTED:<type>]` pladsholder og kloner kun de grene, der faktisk ændrede sig.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- En værdi bag en etiket er maskeret, selv når den ikke har noget udbyderpræfiks: `DB_PASSWORD=…`, `AWS_SECRET_ACCESS_KEY=…`, `client_secret: …`, `?api_key=…` (etiketter: `password`, `passwd`, `secret`, `secret_key`, `secret_access_key`, `api_key`, `access_token`, `refresh_token`, `auth_token`, med et hvilket som helst præfiks såsom `DB_`). Etiketten og separatoren forbliver, og værdien bliver `[REDACTED:secret]`. Værdien kræver 12 eller flere tegn, så prosa som `password: required` forbliver læsbar; en værdi, der starter med `$` eller `%` (en variabel reference), efterlades alene.
- Autoværnet blokerer aldrig; den omskriver kun (`modifiedPayload` / `modifiedResponse`) og annoterer (`meta.credentialsRedacted`, `meta.count`).

Regressionsvagt: `tests/unit/credential-masker-guardrail.test.ts`.

### Agent Guard (`agentGuard/`)

Agentvagten klassificerer klienten bag en anmodning til `claude` eller `anthropic` udbyderen fra dens overskrifter. `AGENT_GUARD_MODE` har tre værdier: `off` (standard), `monitor` og `block`. Med `off` læses ingen header og intet logges.

Officielle agenter genkendes af disse overskrifter (sammenlignet uden store og små bogstaver):

- Claude kode: en `User-Agent` der starter med `claude-cli/` eller `claude-code/`, eller `x-app: cli` sammen med en `anthropic-beta` header eller en `User-Agent`, der indeholder `claude`.
- Anthropic SDKs: en `User-Agent` der starter med `Anthropic/`, `AsyncAnthropic/`, `anthropic-typescript/` eller `anthropic-python/`.

Loggerens standardniveau i produktion (`info`) viser begge typer linjer. Med `APP_LOG_LEVEL=warn` er kun de kendte tredjepartslinjer tilbage.

Logfelter: `agent`, `thirdParty`, `provider`, `model`, `apiKeyId`, `userAgent`, `xApp`, `anthropicBeta`, `xTitle`, `referer`, `stainless`. Overskriftsværdier og modelstrengen er begrænset til 200 tegn. Henviseren logges uden dens forespørgselsstreng, fragment og brugerinfo. API -tasten, `Authorization`, `x-api-key` og cookies læses aldrig.

Filer: `src/lib/guardrails/agentGuard/classifier.ts`, `src/lib/guardrails/agentGuard/policy.ts`, `src/lib/guardrails/agentGuard/guardrail.ts`, `src/lib/guardrails/agentGuard/settings.ts`, `src/lib/guardrails/agentGuard/logLine.ts`, `src/lib/guardrails/agentGuard/enforcement.ts`, `src/sse/handlers/chat/agentGuardGate.ts`.

**Klassifikationsgrænser (begge tilstande):**

- En agent bygget på en officiel SDK, der ikke sender `X-Title`, `HTTP-Referer` eller egen `User-Agent` ligner SDK. `x-stainless-*` headere alene gør ikke en klient officiel.
- Tredjepartsagenter matches af hele ord-tokens i `User-Agent`, `X-Title` og `HTTP-Referer` (eller `Referer`). Unoterede klienter vises som `unknown`.
- Forespørgsler fra browserbaserede klienter bærer browserens egen `User-Agent` og vises som uidentificerede, medmindre `X-Title` eller referenten har et kendt tredjepartstoken.
- Én loglinje pr. observeret anmodning: Forvent volumen på travle tilfælde.

#### Overvåge

Med `AGENT_GUARD_MODE=monitor` klassificeres anmodninger, hvis modelstrengnavne `claude` eller `anthropic` udbyderen, efter deres klientoverskrifter. Når klienten ikke er en officiel agent, skrives en loglinje med `tag: "AGENT_GUARD"`. Det er `warn` for en kendt tredjepartsagent og `info` for en uidentificeret klient. Prioritet `1`: autoværnet læser kun overskrifter og ændrer aldrig nyttelasten, så det kører før mediebroerne. `monitor` blokerer aldrig.

**Grænser for `monitor`:**

- Hvert signal er en klientstyret header. Dette er observation, ikke adgangskontrol.
- Udbyderen læses fra modelstrengen, før modellen løses: `provider/model`, et udbyderalias som `cc/…` og quota-share id'er (`qtSd/<group>/<provider>/<model>`). Bare model-id'er, modelaliaser, kombinationer og senere routingnormalisering følges ikke. Disse anmodninger overholdes ikke.
- En opkalder kan springe det over pr. anmodning gennem registreringsdatabasens deaktiveringskanaler (se [Deaktivering af vagtskinner pr. anmodning](#disabling-guardrails-per-request) ). Oversprungne anmodninger overholdes ikke.
- Den kører kun hvor `runPreCallHooks` kører (se [Dækning og grænser](#coverage-and-limits) ).

#### Blok

Med `AGENT_GUARD_MODE=block` gør pre-call autoværnet ingenting. Chatbehandleren træffer beslutningen i stedet:

1. Beslutningen træffes, når et mål er ved at blive afsendt, på den udbyder, anmodningen er løst til. Udbyderaliasser, bare model-id'er, kvotedelings-id'er og alle kombinationsmål er dækket.
2. Det kører ikke i autoværn-registret, så deaktiveringskanalerne pr. anmodning gælder ikke for det.
3. En kendt tredjepartsagent bliver afvist. En uidentificeret klient logges som i `monitor` og nægtes kun med `AGENT_GUARD_STRICT=true`. Claude koden og den officielle Anthropic SDKs bliver aldrig afvist.
4. Afslaget er HTTP 403 med `error.type` `permission_error` og `error.code` `client_agent_not_allowed`. Kroppen er en OpenAI-lignende fejl. På anmodninger i antropisk format bærer den også `type: "error"` på øverste niveau. Der er ingen `Retry-After` header, og afslaget returneres, før en streaming starter.
5. Et afslag er ikke et udbydersvigt. Den berører ikke udbyderens afbryder, forbindelsesafkøling eller modellåse.
6. I en combo springes et afvist mål over, og de resterende mål køres. Anmodningen mislykkes med politikfejlen, når mindst ét mål blev afvist, og intet mål kom forbi vagten. Kombinationen beholder sin egen fejl, når en post på øverste niveau navngiver en anden kendt udbyder ved hjælp af et præfiks eller ved trinnets udbyder-id. Et afvist prioriteret mål med `fallbackOnlyOnQuotaExhaustion` springes over på samme måde og stopper ikke kombinationen. Et skyggemål kontrolleres og logges, men det tæller aldrig som et mål, der kom forbi vagten.
7. En `fusion` kombination mislykkes, før panelet kører, når dommeren, som fusionstjenesten vil bruge, ville blive afvist. Denne dommer kommer fra comboens konfiguration eller fra de globale combo-standarder. Det samme tjek kører, når en fusionskombination nås gennem sikkerhedsnet-omdirigeringen.
8. En loglinje pr. anmodning og udbyder med `tag: "AGENT_GUARD"`, `warn` for et afslag og de samme felter som `monitor`.
9. Ved en intern fejl svigter vagten åben. Anmodningen fortsætter, og en `warn` -linje `agent guard failed open` logges.

**Grænser for `block`:**

- Hvert signal er en klientstyret header. En klient, der sender `User-Agent: claude-cli/…`, behandles som Claude kode. `block` afskrækker umodificerede tredjepartsagenter. Det er ikke adgangskontrol.
- En proxy, der fjerner de identificerende overskrifter, forvandler enhver klient til en uidentificeret. En sådan klient serveres uden `AGENT_GUARD_STRICT` og nægtes med den. Kør vagten på den instans, der vender mod klienterne. En anden OmniRoute instans bag den første ser den førstes overskrifter.
- `AGENT_GUARD_STRICT` afviser enhver klient hos de udbydere, der ikke er Claude kode eller en officiel SDK. Det inkluderer browserbaserede klienter og dashboard-legepladsen. Dashboard combo live-testen er undtaget, også gennem sikkerhedsnettets omdirigering.
- Nogle funktioner bygger deres egen chatanmodning i stedet for at videregive kundens anmodning. Fire af dem sender det tilbage gennem OmniRoute `/v1/...` -ruter:
  - batchjob (`src/lib/batches/dispatch.ts`)
  - MCP -inferensværktøjerne (`open-sse/mcp-server/tools/inferenceTools.ts`)
  - A2A smart routing (`src/lib/a2a/skills/smartRouting.ts`)
  - synsbroen, når den beskriver et billede gennem OmniRoute (`src/lib/guardrails/visionBridgeHelpers.ts`)
- Telegram -chatproxyen (`src/lib/telegram/chatProxy.ts`) bygger sin anmodning i gang og kalder chatbehandleren direkte.
- Disse indre anmodninger bærer OmniRoute egne overskrifter, ikke overskrifterne på den klient, der startede dem. Vagten klassificerer dem som uidentificerede klienter.
- Uden `AGENT_GUARD_STRICT` serveres disse indre anmodninger på de bevogtede udbydere, uanset hvem den oprindelige klient var. En tredjepartsagent, der når Claude gennem dem, bliver ikke afvist.
- Med `AGENT_GUARD_STRICT` afvises disse indre anmodninger på de bevogtede udbydere, som startede dem, Claude -koden inkluderet.
- Kun anmodninger, der går gennem chatbehandleren, er gated. Modelvalidering (`src/lib/modelValidation/runner.ts`) kalder forespørgselskernen direkte og er ikke gated.
- Kun `claude` og `anthropic` udbyderne er dækket. Claude modeller, der betjenes af en anden udbyder, er ikke dækket, og det er `claude-web` udbyderen heller ikke.
- Nogle kombinationer navngiver deres resterende mål uden et udbyderpræfiks, som blottede model-id'er eller indlejrede kombinationer. Når disse mål er utilgængelige af en ikke-relateret årsag (åben breaker, cooldown, lockout), mislykkes anmodningen med politikfejlen.
- Et sprunget kombinationsmål rydder det måls sidst kendte gode pin, som ethvert sprunget mål gør.
- En fusionsdommer navngivet med et beskyttet udbyderpræfiks afvises, før panelet kører. Det dækker `anthropic/…`, `claude/…`, et alias som `cc/…`, et kontekstsuffiks som `[1m]`, og kvoteandelsnavne på disse udbydere.
- En fusionsdommer skrevet som et blottet model-id eller som et modelalias, der løses til en bevogtet udbyder, afvises kun, når den afsendes. Panelet har allerede kørt på det tidspunkt. At navngive dommeren med dens udbyderpræfiks undgår det. Ingen dommerstavning når en bevogtet udbyder uafvist.
- Forhåndskontrollen afviser en konfigureret Claude dommer, selv når fusionstjenesten ville droppe den dommer på kørselstidspunktet. Tjenesten dropper en dommer, som operatøren gemte, og en dommer, der ikke kan tage anmodningens medier. Den anden sag dækker ubekræftet synsstøtte og andre medier, som dommeren ikke accepterer. Begge kombinationsstier opfører sig på denne måde.
- På sikkerhedsnet-omdirigeringen modtager kombinationstjenesten tomme indstillinger. En dommer, der kun er sat i de globale kombinationsstandarder, bruges aldrig der.
- Mens `block` er tændt, bruger en klient, som vagten ville afvise hos en bevogtet udbyder, ikke sidevognens hurtige vej, for nogen model. Under `AGENT_GUARD_STRICT` er det enhver uidentificeret klient. Efter sin relæ-token-kontrol, besvarer `POST /v1/relay/chat/completions/bifrost` disse anmodninger med en 503 og `X-Bifrost-Fallback` headeren.
- `POST /v1/messages/count_tokens` giver det lokale estimat til en klient, som vagten ville afvise på den udbyder, som modellen henvender sig til.
- Der er ingen fritagelse pr. nøgle.

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

## Register (`registry.ts`)

Singleton `guardrailRegistry` afslører:

- `register(guardrail)` — tilføjer (eller erstatter med normaliseret navn) et autoværn og sorterer igen ved at stige op `priority`.
- `clear()` / `list()` — administrative hjælpere.
- `runPreCallHooks(payload, context)` — itererer aktive autoværn, fører nyttelasten gennem `modifiedPayload` og stopper på den første `block: true`.
- `runPostCallHooks(response, context)` — samme flow på responssiden.
- `resetGuardrailsForTests({ registerDefaults })` — rydder tilstand og omregistrerer eventuelt standardindstillingerne for ren testisolering.

Begge løbere returnerer `{ blocked, payload|response, results, guardrail?, message? }` hvor `results` er en række `GuardrailExecutionResult` poster, der inkluderer felter `blocked`, `skipped`, `modified`, `error` og `meta` pr. gelænder, nyttige til sporing.

### Deaktivering af autoværn pr. anmodning

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` samler en deduplikeret liste over rækværksnavne, der skal springes over for den aktuelle anmodning. Der er fem kanaler, læst i denne rækkefølge og slået sammen til én liste (første forekomst vinder ved de-duplikering):

1. `apiKeyInfo.disabledGuardrails`
2. Anmod om body `disabledGuardrails` (øverste niveau)
3. Anmod om body `metadata.disabledGuardrails` (kun når `metadata` er et objekt)
4. Header `x-omniroute-disabled-guardrails`
5. Ældre header `x-disabled-guardrails`

Alle fem kanaler er slået sammen, de to overskrifter inkluderet: Ved at sende både `x-omniroute-disabled-guardrails` og `x-disabled-guardrails` springes foreningen af deres lister over, og en tom moderne header skjuler ikke længere den gamle ( [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412), fikset i [#16805](https://github.com/cheaper-inference/OmniRoute/pull/16805) ).

Værdier kan være arrays af strenge eller en kommasepareret streng; navne trimmes og normaliseres til små kebab-bogstaver (`pii_masker` → `pii-masker`), og tomme indtastninger slettes. Resultatet sendes gennem `context.disabledGuardrails` til registreringsdatabasen, som springer matchende autoværn over (`skipped: true` in `results`).

Deaktiveringslisten påvirker kun** registreringsdatabasen** . Prompt-injektion `block` tilstand er en obligatorisk grænse: Injection-guard middleware (`src/middleware/promptInjectionGuard.ts`) kalder `evaluatePromptInjection()` uden nogen opkaldsstyret deaktiveringsliste (det døde `resolveDisabledGuardrails({ body })` kald, det plejede at foretage, blev fjernet i [#16934](https://github.com/cheaper-inference/OmniRoute/pull/16934) ), så en anmodning, der deaktiverer `prompt-injection` afvises stadig i `block` tilstand. Dette er ved design. Deaktiveringskanalerne er opkaldskontrollerede (anmodningstekst, metadata, overskrifter), og en opkalder må ikke kunne slå en sikkerhedskontrol fra operatøren indstillet ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). Headerunionen fra [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412) ændrer kun, hvilke registerværn der springes over; det lader ikke en klient omgå middlewaren. Obligatoriske per-nøgle og per-gruppe rækværkspolitikker spores i v4 RFC [#16417](https://github.com/cheaper-inference/OmniRoute/issues/16417). Se [Dækning og grænser](#coverage-and-limits).

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

## Dækning og grænser

Autoværnets register er kun koblet til chat-pipeline. Disse grænser er fastgjort af `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` og `tests/unit/guardrail-pipeline-characterization.test.ts`; opdatere disse tests bevidst, når adfærden ændrer sig.

### Hvor krogene løber

| Krog / kontrol                      | Kører videre                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Forespørgsler håndteret af `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (og `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` og Telegram chatproxyen. Også instrumentbrættets testendepunkt `/api/guardrails/test`. En pre-call blok returnerer HTTP 400. |
| `runPostCallHooks`                  | **Ikke-streaming** kun chat-svar (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamede svar når det aldrig.                                                                                                                                                                                                                                                                                                                |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), ført i `streamingPipeline.ts` når `PII_RESPONSE_SANITIZATION` er tændt. Det er ikke et autoværn, så deaktiveringskanalerne påvirker det ikke.                                                                                                                                                                                                                            |
| Vendbar PII hvælving                | Forespørgsler håndteres kun af `handleChat`, når `PII_REDACTION_ENABLED` og `PII_REVERSIBLE_VAULT_ENABLED` er slået til. Tokens præges af `pii-masker` -foropkaldet og gendannes ved `handleChat` -udgangen (`src/lib/pii/requestTokenVaultScope.ts`). Deaktivering af `pii-masker` for en anmodning betyder, at intet er præget.                                                                                                      |
| Injection-guard middleware (legacy) | Hver `/v1` -rute, der viser besked, inkluderet chat-familien (se [rutedækning](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Kun hurtig injektion.                                                                                                                                                                                                                                                                    |

### Hvad er ikke dækket

- **Medier, indlejringer og dataruter** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) når aldrig registreringsdatabasen. Ingen PII maskering, legitimationsmaskering eller modalitetsbro kører der. Deres eneste kontrol er den gamle injektionsbeskyttelses-middleware.
- **Streamede svar** få ingen post-opkald autoværn: ingen `pii-masker` eller `credential-masker` post-opkald, og ingen post-opkald blok. Kun streaming PII transformationen gælder (når `PII_RESPONSE_SANITIZATION` er slået til). En legitimationsoplysninger, der går tilbage i et streamet svar, redigeres ikke.
- **Deaktiver kanaler vs. middleware (efter design):** middlewaren evaluerer hurtig injektion med sit eget opkald til `evaluatePromptInjection()` uden at sende nogen opkaldskontrolleret deaktiveringsliste. `block` tilstand er en obligatorisk grænse, som opkaldskontrollerede deaktiverer ikke kan omgås, inklusive på chatfamilieruter ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). Deaktivering af `prompt-injection` springer kun registreringsdatabasen over.

### Hvad ser et svar før efter opkald

På den ikke-streamende sti er rækkefølgen: hukommelsesudtrækning → indbygget værktøj udførelse → post-call guardrails → post-call blok exit → semantisk-cache-lager.

- **Hukommelsesudtrækning** og** værktøjs udførelse** se svaret, før autoværn efter opkald kan omskrive eller blokere det. Siden [#16401](https://github.com/cheaper-inference/OmniRoute/pull/16401) kører hukommelsesudtrækning den udpakkede tekst gennem `sanitizePII` når `PII_RESPONSE_SANITIZATION` er slået til (både streaming og ikke-streaming), men et svar, som senere blokerer efter opkald, er stadig blevet tilbudt til hukommelse og værktøjer.
- **Den semantiske cache** gemmer svaret efter post-opkald, så det gemmer det omskrevne svar, og et blokeret svar gemmes aldrig i cachen. Cache-indtastninger indtastes pr. API -nøgle.

## Konfiguration

Miljøvariabler aflæst af de indbyggede autoværn:

| Variabel                              | Brugt af                   | Effekt                                                                                                                    |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Indstil `false` til at deaktivere detektion helt.                                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injektionspolitik: `warn`, `block` eller `log`. Ældre værdi `redact` omskriver ikke indsprøjtningstekst.                  |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Mode til injektionsbeskyttelsen; også en DB feature flag, der** tilsidesætter** env vars (DB > ENV).                      |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minimumsgrad, som `MODE=block` afviser: `high` (standard), `medium` eller `low`.                                          |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Legacy alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                       |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Når `true` redigeres anmodning PII (uafhængig af injektionstilstand).                                                     |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Med `PII_REDACTION_ENABLED`, mint reversible tokens og gendan dem i 2xx svar.                                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedstrøms)   | Styrer maskeradfærd på responssiden.                                                                                      |
| `AGENT_GUARD_MODE`                    | `agent-guard`              | `off` (standard), `monitor` eller `block`. Også et DB -funktionsflag (DB > ENV).                                          |
| `AGENT_GUARD_STRICT`                  | `agent-guard`              | `false` (standard) eller `true`. Med `block`, nægter også uidentificerede klienter. Også et DB -funktionsflag (DB > ENV). |

Modality Bridge-værnet læser runtime config fra det DB-understøttede indstillingslager (`getSettings()`), ikke env vars. Visions primære nøgler er `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`. De ældre `visionBridge*` nøgler accepteres kun som den dokumenterede en-cyklus-læse-backup; dashboard skriver bruge de primære nøgler. Standarder og fallback-resolveren lever i `src/shared/constants/modalityBridgeDefaults.ts`, med ældre konstanter bevaret i `src/shared/constants/visionBridgeDefaults.ts`.

Audio bruger `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips`, plus de delte `modalityBridgeCache*` -indstillinger. Lyd har ingen legacy-key fallback, fordi disse nøgler blev introduceret med Modality Bridge-skemaet.

Video bruger `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` og `modalityBridgeVideoTimeout` plus de delte `modalityBridgeCache*` indstillinger. Den er deaktiveret som standard, fordi FFmpeg/ffprobe er valgfri operationelle afhængigheder, og billedtekst tilføjer latens og modelomkostninger.

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

## Injection-guard rutedækning & red-team (Fase 8 · Blok D)

Injektionsbeskyttelsen (`createInjectionGuard` / `withInjectionGuard`) dækker alle ruter, der accepterer brugerbeskeder. Den respekterer `INJECTION_GUARD_MODE` (standard `warn` = log kun; `block` = returnerer HTTP 400 `SECURITY_001`).

| Type                 | Ruter                                                                                                                                                | Standardtilstand |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Tekst (eksisterende) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | advare           |
| Generativ            | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | advare           |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | advare           |

Tekstudtrækning (`extractMessageContents`) dækker `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system`.

**Rødt hold (aften, `nightly-llm-security.yml`):** promptfoo validerer, at hver rute blokerer OWASP-LLM-korpuset i `INJECTION_GUARD_MODE=block`; garak kører sonder (springer over uden hemmelighed). `moderations` er inkluderet for konsistens. Bloktilstand er en obligatorisk grænse: `evaluatePromptInjection()` ignorerer deaktiveringslisten pr. anmodning, middlewaren passerer den, så `disabledGuardrails` gør det** ikke** fritage en rute fra det ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ).

Den natlige arbejdsgang (`.github/workflows/nightly-llm-security.yml`, cron + manuel afsendelse) har to opgaver:

- **`promptfoo-guard` (blokerende)** — kører `promptfoo eval -c promptfooconfig.yaml` med `INJECTION_GUARD_MODE=block`. Hver kontradiktorisk sag (f.eks. "ignorer alle tidligere instruktioner...", DAN-lignende jailbreaks) hævder, at svaret bærer `error.code === "SECURITY_001"`, dvs. at vagten faktisk afviste anmodningen.
- **`garak` (rådgivende)** — kører garak `--probes promptinject,dan,leakreplay` mod en lokal OmniRoute instans (`http://localhost:20128/v1`). Gated på en udbyderhemmelighed (`PROMPTFOO_PROVIDER_KEY`); springer yndefuldt over og får suffikset `|| true`, så det rapporterer uden at fejle CI.

Dækning af vagthjælperen (`createInjectionGuard` / `withInjectionGuard`) strækker sig over hver prompt-bærende `/v1` rute; prompttekst hentes fra `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system` af `extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
