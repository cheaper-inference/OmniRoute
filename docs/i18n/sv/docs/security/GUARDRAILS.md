# Guardrails (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sanningens källa:** `src/lib/guardrails/`
> **Senast uppdaterad:** 2026-10-17 — v3.8.52 (la till [Täckning och begränsningar](#coverage-and-limits):
> vilka rutter och svarsvägar hookarna når, de sammanslagna inaktiveringsheadrarna (#16412), injektionsblockeringsläge som en obligatorisk gräns (#16413), och vad som ser ett svar före post-call)

Guardrails upprätthåller säkerhets-, policy- och innehållstransformationer vid
gränsen mellan OmniRoute och uppströmsleverantörer. Varje guardrail kan
inspektera (och valfritt avvisa, transformera eller annotera)
förfrågningsnyttolaster (`preCall`) och uppströmssvar (`postCall`).

Systemet är **fail-open**: om en guardrail kastar ett fel under körning
registrerar registret felet och fortsätter med nästa guardrail istället för att
låta förfrågan misslyckas. Blockering är ett explicit beslut (`block: true`),
aldrig en olyckshändelse. Det enda undantaget är en avbruten förfrågan: när
anroparens `signal` avbryts avvisar en kastande guardrail hook-körningen
istället för att hoppas över.

Hookarna körs **inte** på varje rutt eller varje svar. Läs
[Täckning och begränsningar](#coverage-and-limits) innan du förlitar dig på en
guardrail som en säkerhetskontroll.

## Inbyggda skyddsräcken

Registret laddar automatiskt sex skyddsräcken i prioritetsordning vid import (se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Namn                | Etapp(er)      | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lägre prioritetsnummer körs** första** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3-basmodellen och `glm-5.3-{low,high,max}` har explicita `supportsVision:false` registry/spec metadata. GLM 5.3 Flash-varianterna förblir native-vision-modeller. Claude Codes `/v1/messages` rutt går in i den delade `handleChat` pre-call räckeskedjan** före** Claude-to-OpenAI översättning; kapslade `Read` -verktygsresultatbilder måste beskrivas eller hanteras innan översättningen lyfter dem till OpenAI `image_url` innehåll (#17069).

Fångar upp bildbärande förfrågningar som syftar till** icke-visionsmodeller** och antingen omdirigerar hela begäran till en vision-kapabel modell eller ersätter bilddelarna med textbeskrivningar producerade av en konfigurerbar vision-modell före uppströmsanropet. Detta låter leverantörer av enbart text på ett transparent sätt hantera multimodala nyttolaster.

Flöde:

1. Hoppa över om målmodellen redan stöder syn (såvida den inte visas i listan över forcerad brygga `isVisionBridgeForcedModel`).
2. Extrahera bilddelar via `extractImageParts(messages)` (`visionBridgeHelpers.ts`), som delegerar till** enhetlig mediadetektor** `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den enda källan till sanning som delas med combo-kompatibilitetsfiltret. Extraktion är tillåten till formerna `replaceImageParts` kan skarva tillbaka (extraktet ↔ ersätt kontrakt): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` och Responses API `input_image`. Matchande bilder kapslade inuti Claude Code `tool_result.content` och Responses-verktygsutgångar extraheras också och ersätts vid sina ursprungliga sökvägar; Former med enbart indikator är kombinationsfiltermaterial och extraheras inte. Hoppa över om ingen hittas.
3. Lös runtime config via `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): nya `modalityBridge*` -inställningsnycklar vinner; äldre `visionBridge*` nycklar förblir en** reserv i en cykel** (återställningsfönster). Hoppa över före eventuell mediaövergång när bron är inaktiverad.
4. Lägesväljare (`modalityBridgeVisionMode`, se tabell nedan) bestämmer omdirigering vs beskriv. Omdirigering returnerar `modifiedPayload` med endast `model` bytt, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskriv sökväg: kapa bilder vid `maxImages`, komponera den uppgiftsmedvetna prompten, konsultera describe-cachen, ring visionmodellen** parallellt** (`Promise.allSettled`), och injicera `[Image N]: <description>` -textdelar i deras ställe. En misslyckad beskrivning ger `null`: den råa bilden bevaras för unknown/vision-capable mål (#4012), men en** bekräftat direktmål endast för text** eller nollvisionskombination får en explicit `(unavailable — no vision-capable provider connected)` -textstub för varje obeskriven bild, inklusive partiella misslyckanden och bilder bortom beskriv-anropsgränsen (#17069). Den befintliga all-misslyckade kombinationsbeskrivningen finns kvar (#8430).
6. Returnera `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Lägesväljare (`modalityBridgeVisionMode`)

| Läge       | Standard | Beteende                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Äldre heuristik, orörd (#6640/#7204): icke-combo/`auto/` -modeller omdirigeras till den bästa visionmodellen om inte originalmodellen redan har användbara referenser (beskriv sedan); kombinerade mål beskriver alltid.                                                                       |
| `describe` |          | Beskriv alltid — omdirigeringsblocket hoppas över helt; användarens valda modell svarar alltid.                                                                                                                                                                                                |
| `reroute`  |          | Tvinga omdirigering: skyddet för behåll-legitimerad modell förbigås. Omvägen-** mål** credential guard tillämpar fortfarande — när det inte finns något användbart synmål, bryggan blockerar med ett tydligt fel snarare än att beskriva eller skicka råa bilder till ett mål med endast text. |

Forcerade lägen kortsluter** före** den automatiska heuristiken körs; `auto` beteendet är byte-identiskt med pre-PR-1 räcket.

#### API-nyckelomfång (`visionBridgeKeyScope.ts`)

När anroparens API nyckel begränsar `allowedConnections`, kvotpooler (`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), väljer bryggan bara omdirigering och beskriver modeller som nyckeln kan använda, på anslutningar som nyckeln kan använda. Describe-anropet går sedan alltid igenom OmniRoute -självslingan med `x-omniroute-self-loop-key-id` huvudet, så den mottagande chattförfrågan upprätthåller den nyckelns anslutnings- och modellpolicy igen. `enforceApiKeyPolicy()` hedrar den rubriken endast tillsammans med självloopbäraren, så den kan bara begränsa åtkomsten, och ett id som inte löser sig avvisas.

Om ingen visionmodell är tillåten för nyckeln, a** bekräftat mål för endast text** avvisar bildbegäran lokalt med en tydlig HTTP 400 istället för att vidarebefordra bildbytes till en oförmögen uppströms (#17069). För mål med okänd eller inbyggd synförmåga behåller den beskrivande sökvägen sitt tidigare felöppna beteende (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Förfrågningar utan nyckel, och nycklar utan dessa begränsningar, beter sig precis som tidigare.

#### Uppgiftsmedveten beskrivningsprompt (`modalityBridgeVisionTaskAware`)

Standard** sann** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lägger till texten i** senaste användarmeddelande** (avkortat till 500 tecken) till basbeskrivningsuppmaningen, styr beskrivningen mot vad användaren faktiskt frågade (codex-vision-proxy-mönster) och ber visionmodellen att transkribera synlig text. Med flaggan av — eller ingen användartext — används basprompten oförändrad.

Describe self-loopens egen OpenAI-kompatibla begäran (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) begär alltid `image_url.detail: "high"` — villkorslöst, för varje caller/provider, inte gated på någon klientsignal. Sampling med låga detaljer försämrar OCR noggrannheten för exakt texttranskriptionsuppgiften som den här prompten efterfrågar, så själva describe-anropet ber alltid om hög detaljnivå oavsett vilken detaljnivå den ursprungliga inkommande begäran använde. Detta påverkar endast den interna beskrivningsbegäran; det ändrar inte hur OmniRoute vidarebefordrar uppringarens egna `image_url.detail` på den primära begäran — att standard tillämpas separat, och endast för upptäckta OpenCode klienter, i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic trådformatsgrenen av describe self-loopen har inget `detail` fält och är opåverkad av någondera standardinställningen.

#### Beskriv utgångslock (`modalityBridgeVisionMaxChars`)

| Nyckel                         | Standard | Räckvidd            |
| ------------------------------ | -------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` eller 100–50000 |

`0` (standard) betyder** ingen mössa** — beskrivningen som returneras av `callVisionModel()` skickas genom oförändrad, vilket bevarar det befintliga beteendet. Alla värden i intervallet 100–50 000 trunkerar beskrivningen med ett `…` suffix innan det skarvas tillbaka som `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`). Höj detta för detaljtunga OCR uppgifter där nedströmsmodellen behöver hela transkriptionen; sänk den till bunden tokenanvändning på chatty vision-modeller. Instrumentpanelsfältet finns på Vision-flikens avancerade panel (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) och klämmer alla värden mellan 1 och 99 upp till 100-våningen samtidigt som en explicit `0` lämnas orörd. — `0` är ett giltigt Zod värde i sig (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), inte bara standardinställningen "unset".

#### Beskriv cache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache för beskriva utgångar, delad i hela processen. Nyckel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med längd-prefix inramning (inga fältgränskollisioner). Modellkomponenten är** konfigurerad** bryggmodellen, inte modellen som faktiskt svarade — `callVisionModel` kan falla tillbaka internt, och nycklar per försök skulle fragmentera cachen. Misslyckade beskrivningar cachelagras aldrig. Inställningar:

| Nyckel                          | Standard | Räckvidd |
| ------------------------------- | -------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`   | —        |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000  |

#### Fjärrbildsnormalisering (själv-loop describe/base64 hämta)

När bron hämtar en** avlägsen** själva bilden — den Anthropic beskriver självanrop och claude-wire-format base64-omvandlingen (`ensureBase64ImagesForClaudeWire`), båda via `fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — den resulterande datan URI skickas genom `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) innan de bäddas in i vision-modellbegäran. Överdimensionerade bilder skalas ner till en** 2048px långsida** (matchar storleksändringslocket OpenAI/Anthropic tillämpas redan på serversidan), vilket minskar uppladdningen av bytes/latency utan att ändra vad visionmodellen ser. Ändra storlek använder `sharp`, laddas via dynamisk import: på en plattform där dess ursprungliga binära inte kan laddas, `normalizeDataUri()`** kastar aldrig** — det faller tillbaka till en passthrough av de ursprungliga byten, så describe/base64-conversion sökvägen fortsätter alltid att fungera. Icke-bildbytes (en hämtning som inte returnerade en avkodningsbar bild) skickas också genom orörda. Denna normalisering avser bilder som bryggan hämtar för sitt eget självanrop — den tillämpas aldrig på anroparens råa genomkopplingsnyttolast, i överensstämmelse med opt-in-only mutationsprincipen (hård regel #20).

#### Inställningar schema + migration

De nya `modalityBridge*` nycklarna är Zod-validerade i `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` -trion och `modalityBridgeAudio*` gruppen som används av Audio Bridge. Migration `141_modality_bridge_settings.sql` kopierar befintliga äldre `visionBridge*` -värden till de matchande nya nycklarna (idempotent, skriver aldrig över ett operatörsinställt `modalityBridge*` värde); de äldre nycklarna förblir accepterade som en reservläs under en utgivningscykel.

#### Transparency header + statistik

Beskriv-transformerade svar bär `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (byggd av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`, stämplad av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`). Omdirigerade förfrågningar får** inga** header — nyttolasten var orörd och modellbytet är redan synligt i svarskroppens `model` fält.

`GET /api/modality-bridge/stats` (management auth, samma nivå som `GET /api/settings`) returnerar räknarna per modalitet i minnet `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` för `vision`, `audio` och `video`. `averageLatencyMs` använder `latencySamples`, inte alla försök, som sin nämnare; en operation utan timing tillverkar inte ett noll millisekundsprov. `bridged` förblir det bakåtkompatibla aliaset för framgångsrika konverteringar; misslyckade försök ökar inte det. Räknare återställs vid processomstart enligt design (telemetri, inte redovisning).

#### Konfiguration av instrumentpanelen

Den dedikerade instrumentpanelsidan är `/dashboard/settings/modality-bridge`. Dess URL-adresserbara `Vision`, `Audio` och `Video` flikar bevarar frågeparametrar samtidigt som `tab` värdet ändras. Fliken Vision visar aktivering, läge, modellval (inklusive automatisk standard), uppgiftsmedvetna meddelanden, avancerade timeout/image/description-length/cache gränser, körtidsräknare och en bevakad provbegäran. Fliken Ljud är också live: den visar aktivering, en modellväljare endast för STT med Auto, timeout/max-clip gränser, ljudräknare och ett `input_audio` provtest. Fliken Video är funktionell: den rapporterar FFmpeg/ffprobe körtidstillståndet — ett av fyra explicita UI tillstånd (`unknown` medan sonden är i flygning eller inte kunde slutföras, `restricted` på en instrumentpanelvärd utan loopback där sonden hoppades över klientsidan, `unavailable` en gång avsökt och bekräftats saknad, eller `available` med FFmpeg/ffprobe modellerna, filtret för att välja enable/model/frame/video/timeout -modeller) vision-kapabla — och exponerar videoräknare.

Det tidigare Vision Bridge-kortet under AI -inställningar är en kompatibilitetslänk till den nya sidan; den äger inte längre en andra kopia av formuläret. Medieleverantörer länkar också bild-till-text- och tal-till-text-arbetsflöden till motsvarande Modality Bridge-flikar utan att ta bort den befintliga Speech-to-Text-lekplatsen.

**Self-loop admission bypass:** när beskriva samtalsvägar genom OmniRoute egen `/v1` -självslinga (icke-standardleverantörsmodell), skickar underbegäran `x-omniroute-admission-bypass: internal` och autentiseras med den lösta självslinga-autentiseringen — den lokala `sk_omniroute` vaktposten i lokalt läge, eller `REQUIRE_API_KEY=true` operatörskonfigurerade `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env-nyckeln kan fortfarande köra driftsättningen (#1350) Förbikopplingen hedras endast för dessa exakta referenser, så externa kunder kan inte använda rubriken för att hoppa över antagning.

Legacy defaults live in `src/shared/constants/visionBridgeDefaults.ts`; de nya mode/task-aware/cache standardinställningarna och inställningsresolvern finns i `src/shared/constants/modalityBridgeDefaults.ts`. Skyddsräcket avslöjar ett `deps` konstruktoralternativ så att tester kan injicera falska `getSettings` och `callVisionModel` -implementationer.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fångar upp ljudbärande chattförfrågningar innan de når ett mål som inte är känt för att acceptera ljudingång. Den dirigerar aldrig om chattförfrågan: ljuddelar transkriberas genom den befintliga OpenAI-kompatibla flerdelade slutpunkten och den valda chattmodellen fortsätter med texttranskriptioner.

Flöde:

1. Lös `supportsAudio` till `getResolvedModelCapabilities()`. Explicita leverantörsregistermetadata vinner, sedan statisk modellmetadata och sedan synkroniserad `modalities_input`. En deklarerad indatalista utan `audio` är `false`; inga kapacitetsbevis kvarstår `null`. Både `false` och `null` aktiverar den konservativa bryggan, medan `true` går förbi den.
2. Lös `modalityBridgeAudio*` inställningar och extrahera skarvbara ljuddelar på högsta nivå från varje meddelande genom den delade `detectMediaParts()` detektorn. Trådformer som stöds är OpenAI `input_audio`, `audio_url` och `source.media_type: "audio/*"`. Kapslat ljud detekteras för routing men tas inte bort av skarvbanan. Arbetet begränsas av `modalityBridgeAudioMaxClips`; senare delar förblir orörda.
3. Hedra en konfigurerad `provider/model`, eller låt `selectAudioBridgeModel()` gå `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogordning och välj den första modellen med en användbar aktiv leverantörsuppgifter.
4. `callAudioTranscription()` konverterar base64/data-URI ljud till en `file` med flera delar, eller laddar ner en fjärransluten `audio_url` genom den offentliga utgående guarden med DNS pinning och en 25 MB bound. Den POSTs sedan filen och den valda modellen till den lokala `/v1/audio/transcriptions` -självslingan, autentiserad med `resolveSelfLoopBearer()`. Den befintliga transkriptionsvägen utför normal referenssökning, cooldown/rate-limit hantering och leverantörsutskick.
5. Framgångsrika samtal ersätter sina delar med `[Audio N]: <transcript>`. Samtal körs med `Promise.allSettled`: ett individuellt fel bevarar den ursprungliga ljuddelen (#4012 kontrakt). Om varje samtal misslyckas och målet är bevisat `supportsAudio === false`, blir delarna `[Audio N]: (unavailable — no STT provider connected)` (#8430 kontrakt). För ett okänt mål (`null`) förblir ett resultat av alla misslyckanden orörda. En beprövad text-endast mål utan användbar STT referens får samma explicita stubb utan att utfärda ett nätverksanrop.

Framgångsrika transkriptioner använder den processomfattande Modality Bridge LRU/TTL cachen. Tangenten kombinerar ljudreferensen, den stabila `audio-transcription` driftetiketten och den valda STT modellen; fel cachelagras aldrig. Ljudförsök uppdaterar de delade `bridged`, `cacheHits`, `failures` och `lastUsedAt` -räknarna. Transformerade svar bär `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; orörda förfrågningar tar inte emot ett Audio Bridge-segment.

Körtidsinställningar är DB-stödda och Zod-validerade:

| Nyckel                        | Standard | Räckvidd          |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto eller STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Den delade cachen förblir kontrollerad av `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` och `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fångar upp videodelar på toppnivå i Chat Completions `messages` och Responses API `input` innan ett mål utan känt inbyggt videostöd anropas. Former som stöds är `input_video`, `video_url`, `video_source`, HTTPS URLs och `data:video/*;base64,...` data URIs. Vanliga filnamn i text behandlas inte som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) äger förfrågningsövergång, capability/policy -kontrollen, aggregering per begäran och svarsnyttolasten. — -inhämtning per videoverk, hela resultatcachen, som beskriver en bildsekvens (som smälter ihop alla anropsdeklarerade ljudtranskript) och metrics/abort/cleanup — per försök göms bakom `processVideoPart` i `videoBridgePipeline.ts`, anropad en gång per videodel inuti `preCall` loop. Den modulen definierar också de explicita portgränserna `VideoMediaBrokerPort` (skaffar bytes och extraherar samplade ramar), `VideoAudioTranscriptionPort` (sammansmälter ett anropsdeklarerat ljudtranskript med de samplade bildtexterna) och `VideoDrilldownPort` (gränsen för frame-drill-down persistens; ännu inte kopplad till `processVideoPart` — endast den separata `/api/modality-bridge/video/drilldown` en route skriver drill-down idag).

Den offentliga sökvägen för `/v1` -begäran importerar eller anropar aldrig en underprocess. Fjärrvideor laddas ner under en gräns på 50 MiB ; inline base64-videor har ett konservativt 36 MiB avkodat lock per video så att model/messages/framing kuvertet kan förbli inom den offentliga JSON begäran-tillträdesgränsen på 50 MiB. Uppskattningar av inlinelängd och avkodad storlek kontrolleras före tilldelning. HTTPS krävs på den initiala fjärranslutna URL och varje omdirigering, med hjälp av den befintliga utgående skyddet som endast är offentligt och med DNS pinning. Byten passerar sedan den exakta interna `POST /api/modality-bridge/video/extract` mäklarens gräns. Den rutten är både `LOCAL_ONLY` och `SPAWN_CAPABLE`, accepterar endast en per-process autentiserad, betrodd återkopplingsbegäran och accepterar aldrig en URL, filsystemsökväg, körbar fil eller argumentlista. API -rörledningen i kroppsstorlek och hanterarens inkrementella kroppsläsare tvingar oberoende av varandra ett 50 MiB mäklarinmatningstak. Dess avgränsade kö kör en extraktion i taget, tillåter fyra väntande jobb och begränsar väntande inmatning vid 100 MiB.

Inuti mäklaren läser `ffprobe` en privat lokal fil; godkännandelistan med fast format utesluter spellist- och manifestformat. För tillåtna MOV-familjcontainrar förblir externa MOV datareferenser inaktiverade som standard, och det fasta kommandot väljer inte in dem. Både `ffprobe` och `ffmpeg` använder `file` -only -protokollets vitlista, en tråd, fixerade argumentmatriser, inget skal och körbara filer lösta från `PATH`. Omslagsströmmar med bifogade bilder är inte spelbara kandidater. Alla spelbara strömmar måste uppfylla gränserna, och en explicit standardström är att föredra före det deterministiska lägsta indexets fallback. Videor är begränsade till 600 sekunder, 8 192 pixlar per dimension och 33 554 432 källpixlar. FFmpeg samplar 1–16 mittpunkts JPEG ramar, skalar ner långsidan till högst 1 024 pixlar utan att skala upp mindre indata och får aldrig en URL. Sampling är `uniform` som standard. De valfria `scene_aware` och experimentella `segment_aware` policyerna utför ytterligare en fixerad FFmpeg pass över den redan validerade lokala strömmen, väljer avgränsade `showinfo` scentidsstämplar och faller tillbaka deterministiskt till samma enhetliga mittpunkter på detektorfel, timeout, felaktig utdata eller en tom kandidatuppsättning. Segmentmedvetet läge allokerar mittpunktsprov proportionellt mot de validerade scenintervallen; segmentmedvetna bevis och reservbeteende beskrivs nedan. Det hårda 16-ramars locket tillämpas efter val i varje policy. När en scenmedveten begäran endast har en budget för en bildruta använder den den enhetliga mittpunkten av det aktiva fullvideo- eller fokusfönstret och rapporterar `policyEffective: uniform`: en enda vald scenbild kan inte bevara båda tidsändarna. En uppringare kan valfritt tillhandahålla ett ändligt fokusfönster (`start`/`end` sekunder); gränser kläms fast till mediavaraktigheten, omvända eller icke-ändliga fönster avvisas och alla samplingsprinciper utförs endast inom det normaliserade intervallet. Det resulterande fönstret ingår i samplingsmetadata och i det opålitliga beskrivningsprefixet så att nedströmsmodeller kan skilja ett fokuserat utdrag från hela tidslinjen.

Semantisk bildtextfokus är en separat, explicit inställning. Standard `full` analysläget bevarar den befintliga ramprompten och vidarebefordrar aldrig förfrågningstext till bildtextmodellen. I `focused` läge läser bryggan endast den senaste icke-tomma användarförfattade `text`/`input_text` från samma chatt- eller svarsbehållare, normaliserar den till NFC, kollapsar kontrolltecken och blanksteg och begränsar den till 500 Unicode-kodpunkter. Ett tomt resultat faller tillbaka till den exakta `full` prompten. En användbar ledtråd serialiseras som JSON i ett dedikerat untrusted-user-context-block och kan bara prioritera observerbara detaljer; den kan inte åsidosätta den separata varningen mot att följa instruktioner som är synliga eller hörbara i media. Textfokus leder aldrig till `start`/`end` eller ändrar den tidsmässiga samplern.

#### FU-07 strukturella segment bevis

`segment_aware` använder ett begränsat föranalyspass över den redan validerade lokala videoströmmen. Den fasta filterkedjan skalas först till högst 320 pixlar bred, upptäcker scenförändringar och frysta intervall och samplar sedan med 1 bildruta per sekund för oskärpa, genomsnittlig luma och spatial/temporal information. Passet är begränsat till 600 strukturella prover, en FFmpeg/filter tråd, samma `file` -only protokoll och containergodkännandelistor, en 1 MiB process-output bunden, och högst 30 sekunder inuti mäklarens delade abort/deadline. Den accepterar aldrig ett kommando, filter, sökväg eller URL från begäran.

De strukturella värdena är deterministiska provtagningsbevis, inte semantisk videoförståelse. De härleder inte ämnen, handlingar, bildtexter, tal eller användaravsikter. Scen- och frysgränser bildar segment; frystäckning, oskärpa, exponering, rumsliga detaljer och tidsmässiga förändringar påverkar bara hur den befintliga budgeten på 1–16 ramar allokeras. Ett helt fruset segment är begränsat till en bildruta, medan icke-frysta segment konkurrerar om den återstående budgeten. När gränserna är fler än ramar, bibehålls enhetlig tidslinjetäckning så att snabba tidiga klipp inte kan dölja ett långt efterföljande segment. Scengränser inom 1-sekunds analysupplösningen för en frysgräns koaleseras.

Saknade filter, malformed/empty -bevis, ett detektorfel eller den begränsade pre-analys timeout misslyckas med den exakta enhetliga mittpunktspolicyn. En uppringare avbryter eller en mäklardeadline misslyckas inte: den avslutar underprocessen under flygning, förhindrar senare ramextraktion och det privata tillfälliga trädet tas bort i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererar deterministiska verkliga FFmpeg fixturer för post-dedup caption-call besparingar, dense-motion budgetallokering, blur/exposure/SI-TI bevis, snabba nedskärningar med en lång svans och gradvis-fade falska positiva. Den registrerar väggtid före analys och, där `/usr/bin/time` är tillgängligt, underordnad CPU och peak RSS. Dess kvalitetskontroller är endast strukturella orakel. Den riktiga bildtextmodellens kvalitet förblir `HOLD` eftersom denna sele inte har någon auktoriserad endpoint eller frusen domare. Monetära besparingar förblir också `HOLD` om inte `--caption-cost-per-call-usd` tillhandahåller en explicit positiv uppskattning per samtal; manuset tillverkar aldrig något av resultaten.

Varje ram är begränsad till 4 MiB, alla råa ramar tillsammans till 23 MiB och det serialiserade mäklarsvaret till 32 MiB. En privat tillfällig katalog tas bort i `finally`. OmniRoute paketerar inte FFmpeg och accepterar inte en anpassad körbar sökväg. Före bildtexter tillämpar bryggan ett konservativt visuellt dedupliceringspass: varje JPEG reduceras till en 16 × 16 gråskalebuffert och jämförs endast med den sista bilden som behölls. För en begärd bildtextbudget över en bildruta tillhandahåller extrahering en begränsad kandidatpool på upp till två gånger den budgeten och aldrig mer än 16 bildrutor. Det begärda taket tillämpas först efter deduplicering, med de första och sista utvalda kandidaterna bevarade under slutlig gallring när budgeten är minst två. Den versionerade `grayscale-16x16-mean-cells-v2` policyn använder den största av medelluma-delta och förhållandet mellan miniatyrceller vars normaliserade delta är minst 0,05. Dubbletttröskeln är konstanten 0,04, vald för förutsägbarhet snarare än exponerad som en körtidsinställning. Den här sekundära högkontrastsignalen bevarar små rörelser och synliga textförändringar som endast en genomsnittlig jämförelse kan dölja. Komparator- eller avkodarfel misslyckas öppna och behåller täckningen. Utdatametadata separerar extraherade kandidater, framgångsrikt använda ramar och visuella dubbletter som tappats.

En explicit markerad videodel kan begära ett tidsstämplat kontaktblad. Bron bygger högst ett 4-kolonn, 16-ramar JPEG rutnät. Varje cell på 512 pixlar bränner sin källtidsstämpel till ett bottenband med hög kontrast, medan samma tidsstämplar finns kvar i textmetadata för nedströmsassociering och granskning. Den fullständiga JPEG förblir begränsad till 32 MiB. Om `sharp` inte kan avkoda eller komponera rutnätet, faller bryggan tillbaka till de individuella JPEG ramarna; ett klientavbrott sprider sig fortfarande genom arkoperationen.

Marknadsföringsbevis är medvetet åtskilt från mikrobenchmark för syntetisk sammansättning. `scripts/perf/video-bridge-contact-sheet-eval.ts` definierar en schemaversionerad A/B -sele för riktiga OpenAI-kompatibla visionmodeller. Den mäter leverantörsrapporterade tokens, änd-till-ände vägglatens (inklusive arksammansättning), antal modellsamtal och manifestdefinierad faktaretention. Svar från råmodeller skrivs inte till rapporten; endast SHA-256 sammandrag och matchade fakta IDs behålls. Kabelnätet ringer inget nätverk eller betald modell om inte `--execute-real` skickas och `--model`, `OMNIROUTE_BASE_URL` och `OMNIROUTE_API_KEY` är konfigurerade. Utan den explicita verkliga körningen förblir dess maskinläsbara dom `HOLD`; syntetiska payload/call-count -mätningar enbart är inte marknadsföringsbevis.

Uppringare kan koppla en valfri `transcript.cues` matris till en videodel som stöds när de redan har justerad text. Varje cue måste ha `text`, ett ändligt `start`/`end` -intervall inom den undersökta varaktigheten och en vitlistad `source` (`client`, `embedded` eller `audio-bridge`); `confidence` har som standard `1` och måste ligga mellan `0` och `1`. Exakta dubbletter av signaler är kollapsade. OmniRoute startar aldrig transkription från denna metadata: validerade ledtrådar kopieras till det beskrivna resultatet med källa, konfidens och intervall och renderas som opålitliga observationer vid sidan av bildtexterna. Ogiltig, utanför intervallet eller härkomstfri text avvisas i stället för att blandas in i bildtextflödet. Båda förfrågningskroppens transkriptionskanaler normaliserar den angivna härkomsten till `client`, inklusive självhävdande `embedded` eller `audio-bridge` etiketter. Endast en serverägd adapter kan tilldela dessa betrodda etiketter genom argumentet `trustedSource` endast för kod; ett request JSON -fält kan inte nå det argumentet. Transkriptionstext förblir opålitligt mediehärlett innehåll, oavsett ursprung, och får aldrig avgöra auktorisation.

En avancerad uppringare kan tillhandahålla ett `audioTranscript` spår för samma video; den behandlas som klienttillhandahållen text, inte bevis på servertranskription. Fusionssömmen kör visuella och ljudobservationer under en deadline och avbrytsignal, beställer dem på en gemensam tidslinje, kollapsar exakta dubbletter och rapporterar ett delresultat när bara en sida lyckas. En ogiltig `audioTranscript` försämrar det partiella resultatet — den visuella beskrivningen bevaras och ljudgrenen registrerar en sanerad felkod — istället för att misslyckas med hela videon. Tillgänglighet per gren, den partiella flaggan och de sanerade felkoderna bevaras i det beskrivna resultatet, i skyddsräckets metadata (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), i resultatcache-metadata och i bryggfusionsräknare. Standardsökvägen för Video Bridge anropar inte tal-till-text eller laddar ner en andra mediakopia; utan det explicita spåret förblir det endast video.

**Avskriftslagring (#12150 P1).** Detta gäller automatiskt när Video Bridge (själv opt-in) återger en transkriptions-cue — det finns ingen separat lagringsflagga. När en begäran återger en transkriptionssignal (en anropar-deklarerad `transcript` eller en fused `audioTranscript`), markerar skyddsräcket det `videoBridgeObserved` och producerar en redigerad skugga av videobeskrivningen — en identisk rendering där varje cues fritextkropp ersätts av `[redacted-video-transcript]`, byggd genom att ersätta det strukturerade fältet före den strukturerade strängen (nevering) tillplattad text, så inget cue innehåll — kontradiktoriskt eller vanligt, inklusive kroppar som innehåller `]` som `[inaudible]`/`[music]` — kan överleva). Texten i kvarstående samtalsloggförfrågan byter ut varje videohärledd textdel mot den redigerade skuggan, matchad av innehållslikhet; `fullText` ankaret läses om från den färdiga pre-call-räckets nyttolast, så matchningen lyckas fortfarande efter att senare kedjeräcken ( PII och credential-maskeringarna, priorities 10/95) har skrivit om beskrivningstexten på plats och efter system-prompt/handoff/memory injektion omformar meddelandearrayen. Kroppen som skickas uppströms till modellen är oförändrad. En observerad begäran fyller inte heller något hållbart minne (både begäran- och svarshärledd extraktion hoppas över), så modellens eget svar kan inte eka transkriptionstext till Memory.

**Råvideofält (#12430).** När bryggan är aktiverad och inbyggt videostöd är okänt eller saknas, aktiveras även definierade `transcript`/`audioTranscript` -fält `videoBridgeObserved`, även efter beskrivningsfel eller en `maxVideos` gräns. `null` och tomma strängar räknas; frånvarande fält och icke-videometadata gör det inte. Behållna kopior redigerar dessa fält eller utelämnar begäran, och caches/Memory förbigås.

På dessa reservvägar blir giltiga anropssignaler stödda `text`/`input_text` -delar snarare än icke-standardiserade leverantörsfält. Båda spåren som tillhandahålls av begäran förblir otillförlitliga `client` observationer, med en uttrycklig varning om att videon inte beskrevs och tidsstämplar inte verifierades mot media. De befintliga 256-cue/64-KiB total- och per-cue-budgetarna gäller över de två spåren tillsammans; tidsstämplar måste passa mäklarens 600-sekunders tak och eventuellt medföljande fokusfönster. Ogiltiga spår slängs, inte vidarebefordras som godtycklig text; ett giltigt syskon kan fortfarande användas om inte deras sammanlagda budget överskrids. Null/empty -fält lägger till ingen text. Ingen mediehämtning eller transkription läggs till av denna reserv. Avskriftstilläggsfält tas bort från reservvideobäraren och dess `video_url`/`source` -objekt. Tillståndslistan för OpenAI wire förblir strikt; okända infödda videobärare förblir tillgängliga och kända textmål behåller säkra markörer. Strukturerade redigeringsskuggor skyddar den bifogade transkriptionstexten, medan den ursprungliga anropsägda begäran förblir oförändrad. Inbyggda mål och broar med funktionshinder behåller sitt befintliga bypass-beteende.

Ytterligare bevarade kopior använder samma observerade förfrågningssignal. Den råa ögonblicksbilden av klientbegäran före skyddsräcket, väntande begäran i minnet och loggen för tidigt avvisad begäran ersätter strukturellt transkriptionsfält i videodelar; strängprompter syntetiserade av pipeline-steg och kontextöverlämning redigeras vid persisted-request-body-sinken. Den kvarstående `video_content_removed` markören gör att `previous_response_id` fortsättningen misslyckas stängs snarare än att rekonstruera text som avsiktligt förkastades. Om en observerad begäran förlorar sin redigeringsskugga per del före loggning, eller ens en av flera videoskuggor inte matchar efter senare begärandemutationer, utelämnas den bibehållna begärandekroppen helt istället för att behålla ett delvis redigerat transkript.

För en observerad begäran kan ett modellsvar citera vilken del av transkriptet som helst utan en strukturerad cue-gräns. Dess ihållande call-log `responseBody` ersätts därför av en utelämnande markör; den detaljerade rörledningsartefakten (som kan inkludera upstream/client kroppar och strömbitar) behålls inte. Semantisk, idempotens och resonemang-replay-cacher förbigår läsning och skrivning för den begäran. Leverantörsbegäran och kundsynligt svar förblir oförändrade. Tidiga keepalive-bytes dräneras från den tillfälliga bufferten när den detaljerade artefakten utelämnas. Kiro felaktiga EventStream -varning rapporterar endast antalet byte av nyttolast, aldrig dess innehåll eller JSON -parserns råfel. Detta gör inte anspråk på att varje orelaterade provider/plugin diagnostik har granskats; det bredare retained-sink-svepet spåras i #11658.

Den interna `/api/modality-bridge/video/drilldown` livscykeln är ett separat, loopback/token-authenticated cachesubstrat. Varje operation kräver också en kanonisk opak principal ID. Innan en produktionsanropare aktiveras måste den härleda ID från den autentiserade klienten och får aldrig vidarebefordra ett klientvalt värde. Cache-nycklar binder den principen till kanonisk session och videoreferens IDs, lagrar endast deras SHA-256-derived nycklar och omfångar både läsningar och radering till samma principal. Cachen lagrar högst 16 härledda JPEG ramar per post, förfaller dem efter tio minuter och stöder avgränsade `start`/`end` -läsningar eller explicit sessionsborttagning.

Varje huvudperson är begränsad till 16 poster och 64 MiB kanoniska JPEG data. Dessa gränser är oberoende av det globala 64-entry/256 MiB taket: rektorskvotstrycket avhyser endast den rektors minst nyligen använda poster innan global LRU vräkning. Utgångna poster sopas från både principiell och global redovisning av cacheaktivitet, medan annullering och misslyckande med validering inte begår en partiell ersättning.

Cachen avvisar icke-kanonisk Base64, överflödig utfyllnad, icke-JPEG-media, felaktiga eller trunkerade JPEGs och JPEGs som ger en varning under en avkodning av en avgränsad helbilds `sharp`. Den kodar om varje accepterad bild som en kanonisk JPEG, härleder bredd och höjd från de avkodade byten istället för att lita på anropsfälten, och kasserar alla efterföljande polyglotbytes istället för att behålla dem. Endast den avgränsade kanoniska komprimerade bufferten debiteras båda kvoterna. JSON -ledningsgränsen inkluderar Base64-overhead för taket för 32 MiB avkodad ingång. Varje lagrad härledning registrerar dess validerade JPEG format/resolution, samplingspolicy, härledningsversion, skapelsetid, serverberäknat innehållshash och hashad överordnad referens plus den betrodda uppringarens överordnade innehålls-hash. Avbrytning kontrolleras mellan asynkrona decode/hash faser innan atomcache-commit.

Denna del kopplar ännu inte en produktionsproducent till rutten och ger inte val av flerupplösningsvarianter. Den genomskinliga sökvägen för Video Bridge-förfrågan medför därför inget extra arbete, medan klientbunden principavledning och hela FU-08 -livscykeln med flera upplösningar förblir explicit uppföljningsarbete snarare än dokumenteras som fullständigt beteende.

Bildrutor är textade sekventiellt med den konfigurerade videomodellen. En tom Video-åsidosättning ärver Vision-inställningen; om båda är tomma väljer Vision auto-router den effektiva vision-kapabla modellen. Framgångsrika bildtexter ersätter originaldelen med ett stabilt `[Video description:` prefix som också markerar texten som en opålitlig mediehärledd observation och säger åt nedströmsmodeller att inte följa instruktioner som finns i media. Frame-caption cache-nycklar inkluderar JPEG bytes, prompt, tidsstämpel och effektiv modell; endast framgångsrika bildtexter cachelagras. Cacheposter behåller den faktiska framgångsrika producentmodellen, inklusive en reservmodell; bron rapporterar `mixed` när olika ramar producerades av olika modeller. En cacheträff återanvänder producentidentiteten istället för att märka om den som den begärda ruttplanen. Hela videoresultatcachen knappas in på varje ingång som ändrar utdata — prompten, effektiv modell, samplingspolicy, bildruteantal, semantiskt analysläge, SHA-256 fingeravtrycket för den normaliserade fokustipset, fokusfönstret, `transcript`, `audioTranscript`, och kontaktbladets flagga — så att ändra någon av dessa dimensioner är en gammal miss, aldrig en cache-återanvändning. Den visuella dedup-policyversionen, tröskeln och antalet avgränsade kandidatbilder är också explicita i resultatcache-nyckeln och metadata; en policyändring kan därför inte återanvända en inaktuell helvideobeskrivning. Result-cache v4-metadata behåller läget och fingeravtrycket, aldrig den råa användaruppgiften. Guardrail-metadata rapporterar både begärda och effektiva analyslägen; ett begärt `focused` läge utan användbar användartext rapporteras som effektivt `full`.

Skyddsräcket extraherar varje stödd videodel men beskriver inte mer än `modalityBridgeVideoMaxVideos`. För ett mål som visat sig ha `supportsVideo === false`, blir misslyckade och övergränsade videor explicita säkra textmarkörer så att ingen rå video överlever. När kapaciteten är okänd behåller dessa delar sin videobärare; eventuell reservtranskription följer den avgränsade textkonverteringen ovan. Mål med `supportsVideo === true` går förbi bron. Avbrytsignalen för klientbegäran sprids genom nedladdning, mäklarkö, underprocesser och anrop av textning; avbryter stopp mellan videor och misslyckas aldrig öppna för råmedia.

Körtidsinställningar är DB-stödda och Zod-validerade:

| Nyckel                              | Standard    | Räckvidd / beteende                                                                                      |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valfri körtid, opt-in                                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarar generiska bildtexter; `focused` använder avgränsad, opålitlig senaste-användarkontext     |
| `modalityBridgeVideoModel`          | `""`        | Ärva Vision Bridge-modellen                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proportionell `segment_aware`; detektorfel faller tillbaka till `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Äldre beständiga videotimeoutvärden över 120 sekunder kläms till mäklarens deadline; nya inställningar skriver över den gränsen avvisas. `GET /api/modality-bridge/video/runtime` kräver betrodd stämplad loopback-lokalitet före autentisering eller runtime probing, kräver sedan hanteringsautentisering. Den returnerar endast `available`, sanerade FFmpeg/ffprobe versioner och en fast anledning när körtiden inte är tillgänglig. Den interna extraheringsändpunkten är inte en offentlig uppladdning API: kömättnad returnerar `503` plus `Retry-After`, en uppringares frånkoppling returnerar `499` och den fasta mäklarens deadline returnerar `504`. Konverterade svar lägger till `video->text;model=<visionModel>;parts=<videos>` till den centrala `x-omniroute-modality-bridge` huvudet utan att ta bort Vision- eller Audio-segment.

### PII Masker (`piiMasker.ts`)

Kör på** både** etapper.

- **`preCall`** klonar nyttolasten, går `system`, `messages`, `input` och `prompt` (inklusive vanliga strängobjekt), och tillämpar `processPII()` (från `@/shared/utils/inputSanitizer`) på sträng `content`/`text` -fält. När `PII_REDACTION_ENABLED=true`, detekterad PII redigeras i den utgående nyttolasten. Detta är oberoende av `INPUT_SANITIZER_MODE` (som bara styr policyn för prompt-injektion). När redigering är avstängd räknas detekteringen av samtalsposterna utan att innehållet skrivs om.
- **`postCall`** djupklonar svaret, kör `sanitizePIIResponse()` plus Responses-API-formmaskeraren (`maskResponsesOutput` — täcker `output_text` och `output[].content[].text`). Om någon redigering sker ersätter det modifierade svaret originalet.

Skyddsräcket blockerar aldrig; den kommenterar bara (`meta.detections`, `meta.redacted`) eller skriver om.

#### Val per typ, anpassade mönster och detektionsräknare

**Dashboard → Inställningar → Säkerhet → PII maskering** väljer _vad_ som är maskerat. Den slår inte på maskering: det är fortfarande `PII_REDACTION_ENABLED` (request) och `PII_RESPONSE_SANITIZATION` (response + SSE), båda avstängda som standard.

- **Val per typ** — de inbyggda ID:n är listade i `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Unset betyder varje typ (beteendet innan den här inställningen fanns). Förfrågningsmotorns `ssn_us` mönster mappas till `ssn`. Mallar (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) fyller bara i kryssrutorna i UI.
- **GDPR och POPIA -identifierare** — tolv inbyggda ID som täcker EU och sydafrikanska personliga identifierare (tabell nedan). Deras regexes, validatorer och jurisdiktionstaggar finns i en tabell, `src/shared/utils/piiPatterns.ts`, som både response sanitizer (`src/lib/piiSanitizer.ts`) och request-masker (`src/shared/utils/inputSanitizer.ts`) använder. En matchning redigeras endast när dess validator accepterar den; bara siffror är aldrig tillräckligt. En operatör som sparade ett begränsat urval innan dessa ID:n fanns behåller sitt beteende tills de nya ID:n är markerade.
- **Anpassade mönster** — upp till 20 regex- eller jokerteckenmönster (`*` = upp till 64 tecken utan blanksteg, `?` = ett). Matcher blir `[CUSTOM_REDACTED]`. Varje mönster går igenom `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): högst 500 tecken, flaggor begränsade till `g i m s u`, måste kompileras, måste passera `safe-regex` (katastrofisk bakåtspårning) och får inte matcha en tom sträng eller en redigeringsplatshållare. Ett mönster som misslyckas nekas när det sparas och testas, och en lagrad rad som misslyckas hoppas över under körning istället för att kompileras. Anpassade mönster körs bara medan maskering är på.
- **Detektionsräknare** — per typ räknas (aldrig matchade värden), hålls i minnet och återställs vid omstart (`src/lib/pii/piiDetectionStats.ts`). De ökar bara medan maskering är på.

Inställningarna finns i `key_value` tabellen (namnutrymme `pii_settings`, `src/lib/db/piiSettings.ts`) och läses genom en 1 s cache. API:

| Metod  | Väg                      | Ändamål                                                             |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flaggtillstånd, `enabledTypes`, `customPatterns`, detektionsräknare |
| `PUT`  | `/api/settings/pii`      | Byt ut `enabledTypes` (`null` = all) and/or `customPatterns`        |
| `POST` | `/api/settings/pii/test` | Torrkör ett mönster mot ett prov på högst 8 KB; ingenting lagras    |

Alla tre kräver hanteringsautentisering och validerar kroppen med Zod (`src/shared/validation/schemas/piiSettings.ts`).

#### GDPR (EU) och POPIA (Sydafrika) identifierare

| Id                  | Identifierare             | Godkännande                                                                                         |
| ------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                      | Känt land, exakt längd för det landet, ISO 13616 MOD-97-10                                          |
| `eu_vat`            | EU VAT nummer             | Känt medlemslandsprefix och den statens nummerformat (ingen VIES uppslagning)                       |
| `es_dni_nie`        | Spanska DNI / NIE         | Kontrollbokstav (värde mod 23); NIE är `X/Y/Z` + 7 siffror                                          |
| `it_codice_fiscale` | Italienska Codice Fiscale | Kontrollbokstav från odd/even -positionstabellerna                                                  |
| `pl_pesel`          | polska PESEL              | Viktad kontrollsumma och ett kodat födelsedatum som finns                                           |
| `nl_bsn`            | holländska BSN            | 11-beständig (vikter 9..2, -1)                                                                      |
| `de_steuer_id`      | tyska Steuer-ID           | ISO 7064 Mod 11,10 plus sifferstrukturreglerna (ingen inledande 0)                                  |
| `se_personnummer`   | Svenskt personnummer      | Luhn över de senaste tio siffrorna och ett rimligt födelsedatum (10 eller 12 siffror)               |
| `za_id`             | Sydafrikanskt ID nummer   | Luhn över alla 13 siffror, giltig födelse month/day, medborgarskap siffra 0 eller 1                 |
| `za_phone`          | Sydafrikansk telefon      | `+27` / `27` prefix, eller den nationella `0..` formen skriven med ett mellanslag eller bindestreck |
| `za_vat`            | Sydafrikanskt VAT nummer  | 10 siffror som börjar med `4`** och** "VAT" / "BTW" i de 48 tecknen innan                           |
| `za_tax_ref`        | Sydafrikansk skatteref.   | 10 siffror som börjar `0`-`3`, Luhn,** och** "skatt" / "SARS" i de 48 tecknen innan                 |

Eftersom formaten med endast siffror kolliderar med ordernummer, byggnummer och tidsstämplar, behöver de svagaste (`za_vat`, `za_tax_ref`) nyckelordet cue, och ett blott tiosiffrigt `0..` nummer behandlas inte som ett sydafrikanskt telefonnummer. Mellanslag IBANs (`GB29 NWBK ...`) matchas inte. På streamingbanan letas köet upp endast i den aktuella biten. ID:n ligger före de generiska telefonmönstren, så en validerad identifierare behåller sin egen platshållare (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` och `popia` mallarna väljer EU respektive sydafrikanska id. Maskeringen i sig förblir opt-in (hård regel #20): ingenting här ändrar en standard för funktionsflagga.

### Snabb injektion (`promptInjection.ts`)

Upptäcker kontradiktoriska strukturer i innehåll som tillhandahålls av användaren och tillämpar den konfigurerade policyn. Beteendet drivs av miljövariabler och konstruktoralternativ:

| Miljö        | Env var                                                                                               | Standard | Effekt                                                                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Aktiverad    | `INPUT_SANITIZER_ENABLED`                                                                             | `true`   | När `false`, kortsluter skyddsräcket.                                                                                                                                                            |
| Läge         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`   | Injektionspolicy: `block`, `warn` eller `log`. (`redact` accepteras för back-compat men gör det** inte** remsa injektionstext; begäran PII omskrivning kontrolleras av `PII_REDACTION_ENABLED`.) |
| Blocktröskel | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Minsta svårighetsgrad som krävs för att blockera. Medium är endast observera som standard.                                                                                                       |

**Lägets prioritet** (`getMode`): ringer `options.mode` → `INJECTION_GUARD_MODE`**DB funktion-flagga åsidosätta** (Dashboard → Inställningar → Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. En åsidosättning av instrumentpanelen vinner därför över env vars, så Feature Flags UI styr löparvakten live (ingen omstart). DB läsningen är felsäker: om den missar faller skyddet tillbaka till det env-baserade beteendet, och när ingen åsidosättning är inställd är beteendet identiskt med env-only upplösning.

Detektionskällor:

1. `sanitizeRequest()` från `@/shared/utils/inputSanitizer` (delad detektoruppsättning som används någon annanstans i pipelinen).
2. Inbyggd `DEFAULT_GUARD_PATTERNS` (för närvarande `system_override_inline` och `markdown_system_block`, båda svårighetsgraden `high` ).
3. Valfri `customPatterns` skickas via konstruktoralternativ (strängar, regex eller `{ name, pattern, severity }` -poster).

När `mode === "block"`** och** minst en detektion når svårighetströskeln, `preCall` returnerar `{ block: true, message: "Request rejected: suspicious content detected" }`. I `warn`/`log` -lägena loggar skyddsräcket men tillåter anropet. Den delade hjälparen `evaluatePromptInjection()` exporteras också för uppringare som behöver utvärdera uppmaningar utan att gå igenom registret.

**Skanningsbunden (v3.8.20):** detektorn inspekterar endast** första 16 KB** av sammanfogad prompttext — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i `src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` och `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` innan du kör mönsterslingan. Injektionsdirektiv sitter nära toppen av en ingång, så detta begränsar regex CPU/GC på nyttolaster på flera hundra kB utan att försvaga upptäckten (jfr #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Kör på** både** steg, sist i standardkedjan (prioritet `95`). Redagerar välkända API-nyckel-/hemliga token-mönster från den utgående nyttolasten (meddelandeinnehåll, verktygsanropsargument, verktygsresultat)** och** leverantörens svar, så att en referens som klistrats in i en prompt (eller återges av ett verktygsresultat) inte läcker till uppströmsleverantören eller tillbaka till klienten.

- **Endast opt-in** , samma konvention som PII -redaktion (hård regel #20-angränsande): inaktiverad om inte `settings.credentialRedactionEnabled === true`** eller** `CREDENTIAL_REDACTION_ENABLED=true`. Med det avstängt är skyddsräcket en no-op — som aldrig blockerar och aldrig skrivs om.
- `redactCredentials()` går igenom hela payload/response trädet (`walkValue()`, prototyp-pollution-safe, cycle-safe via `WeakSet`) och ersätter matchningar med en `[REDACTED:<type>]` platshållare, klona bara de grenar som faktiskt ändrades.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- Skyddsräcket blockerar aldrig; den skriver bara om (`modifiedPayload` / `modifiedResponse`) och kommenterar (`meta.credentialsRedacted`, `meta.count`).

Regressionsskydd: `tests/unit/credential-masker-guardrail.test.ts`.

## Baskontrakt (`base.ts`)

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
  block?: boolean; // true kortsluter kedjan
  message?: string; // visas vid blockering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returneras av preCall för att skriva om begäran
  modifiedResponse?: TValue; // returneras av postCall för att skriva om svaret
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

En guardrail signalerar "ingen ändring" genom att returnera antingen `void`,
`{}` eller `{ block: false }`. Att returnera en
`modifiedPayload`/`modifiedResponse` ersätter värdet som flödar genom kedjan
för efterföljande guardrails. `signal?: AbortSignal` för in anroparens
livscykel i guardrails. En avbruten begäran är det avsiktliga
fail-open-undantaget: mediebryggor avbryter arbetet och städar upp utan att
återställa råmedia till ett mål som är känt för att inte stödja det.

## Registret (`registry.ts`)

Singletonen `guardrailRegistry` exponerar:

- `register(guardrail)` — lägger till (eller ersätter via normaliserat namn) en
  guardrail och sorterar om i stigande ordning efter `priority`.
- `clear()` / `list()` — administrativa hjälpfunktioner.
- `runPreCallHooks(payload, context)` — itererar över aktiva guardrails, trär
  nyttolasten genom `modifiedPayload` och stannar vid första `block: true`.
- `runPostCallHooks(response, context)` — samma flöde på svarssidan.
- `resetGuardrailsForTests({ registerDefaults })` — rensar tillståndet och
  registrerar eventuellt om standardvärdena för ren testisolering.

Båda körarna returnerar `{ blocked, payload|response, results, guardrail?, message? }`
där `results` är en array av `GuardrailExecutionResult`-poster som innehåller
fälten `blocked`, `skipped`, `modified`, `error` och `meta` per guardrail,
användbara för spårning.

### Inaktivera guardrails per begäran

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` sammanställer en
deduplicerad lista över guardrail-namn som ska hoppas över för den aktuella
begäran. Det finns fem kanaler som läses i denna ordning och slås samman till
en lista (första förekomsten vinner vid deduplicering):

1. `apiKeyInfo.disabledGuardrails`
2. Begärans brödtext `disabledGuardrails` (toppnivå)
3. Begärans brödtext `metadata.disabledGuardrails` (endast när `metadata` är ett objekt)
4. Header `x-omniroute-disabled-guardrails`
5. Legacy-header `x-disabled-guardrails`

Alla fem kanaler slås samman, inklusive de två headers: att skicka både
`x-omniroute-disabled-guardrails` och `x-disabled-guardrails` hoppar över
unionen av deras listor, och en tom modern header döljer inte längre den äldre
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), fixat i
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Värden kan vara arrayer av strängar eller en kommaseparerad sträng; namn
trimmas och normaliseras till kebab-case med gemener (`pii_masker` →
`pii-masker`), och tomma poster tas bort. Resultatet skickas via
`context.disabledGuardrails` till registret, som hoppar över matchande
guardrails (`skipped: true` i `results`).

Inaktiveringslistan påverkar bara **registret**. `block`-läget för
prompt-injektion är en obligatorisk gräns: injektionsskydds-middlewaren
(`src/middleware/promptInjectionGuard.ts`) anropar `evaluatePromptInjection()`
utan någon anroparkontrollerad inaktiveringslista (det döda anropet till
`resolveDisabledGuardrails({ body })` som den tidigare gjorde togs bort i
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), så en begäran
som inaktiverar `prompt-injection` avvisas fortfarande i `block`-läget. Detta
är avsiktligt. Inaktiveringskanalerna styrs av anroparen (begärans brödtext,
metadata, headers), och en anropare får inte kunna stänga av en
säkerhetskontroll som operatören har konfigurerat
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
Header-unionen från
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) ändrar bara
vilka guardrails i registret som hoppas över; den låter inte en klient kringgå
middlewaren. Obligatoriska guardrail-policyer per nyckel och per grupp spåras
i v4-RFC:n [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Se [Täckning och begränsningar](#coverage-and-limits).

## Exekveringsordning

För varje förfrågan som flödar genom `src/sse/handlers/chat.ts` och
`open-sse/handlers/chatCore.ts` (chattfamiljens rutter som listas under
[Täckning och begränsningar](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` bygger listan över det som ska hoppas över
   utifrån API-nyckel, body och headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kör guardrails i stigande
   prioritetsordning:
   - Inaktiverade guardrails registreras som `skipped`.
   - Varje guardrails `preCall` kan skriva om nyttolasten via `modifiedPayload`.
   - Det första `block: true` kortsluter kedjan och hanteraren returnerar
     ett guardrail-avslagssvar.
3. Den (möjligen omskrivna) nyttolasten flödar in i combo-routing och
   upstream-dispatch.
4. **Endast icke-strömmande:** efter att svaret har satts samman kör
   `guardrailRegistry.runPostCallHooks(...)` samma kedja på svaret.
   `block: true` här kasserar upstream-svaret och returnerar HTTP 400.
   Strömmade svar hoppar helt över detta steg.

Guardrails som kastar undantag registreras med `error: <message>` och loggas via
`logger.warn`, men kedjan fortsätter — fail-open av design.

## Täckning och begränsningar

Guardrail-registret är endast inkopplat i chatt-pipelinen. Dessa begränsningar
är låsta av `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` och
`tests/unit/guardrail-pipeline-characterization.test.ts`; uppdatera dessa tester
medvetet när beteendet ändras.

### Var hookarna körs

| Hook / kontroll                     | Körs på                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Förfrågningar som hanteras av `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (och `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` samt Telegram-chattproxyn. Även instrumentpanelens testslutpunkt `/api/guardrails/test`. Ett pre-call-block returnerar HTTP 400. |
| `runPostCallHooks`                  | Endast **icke-strömmande** chatt-svar (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Strömmade svar når den aldrig.                                                                                                                                                                                                                                                                                                                   |
| Strömmande PII                      | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), som kopplas in i `streamingPipeline.ts` när `PII_RESPONSE_SANITIZATION` är påslagen. Det är inte en guardrail, så inaktiveringskanalerna påverkar den inte.                                                                                                                                                                                                                      |
| Injection-guard-middleware (legacy) | Varje promptbärande `/v1`-rutt, inklusive chattfamiljen (se [rutttäckning](#injection-guard-route-coverage--red-team-phase-8--block-d)). Endast prompt injection.                                                                                                                                                                                                                                                                              |

### Vad som inte täcks

- **Media-, embeddings- och datarutter** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) når aldrig registret. Ingen
  PII-maskering, maskering av inloggningsuppgifter eller modalitetsbrygga körs
  där. Deras enda kontroll är den äldre injection-guard-middlewaren.
- **Strömmade svar** får inga post-call-guardrails: ingen `pii-masker`- eller
  `credential-masker`-post-call, och inget post-call-block. Endast den
  strömmande PII-transformen gäller (när `PII_RESPONSE_SANITIZATION` är
  påslagen). En inloggningsuppgift som ekas tillbaka i ett strömmat svar
  maskeras inte.
- **Inaktiveringskanaler kontra middlewaren (av design):** middlewaren
  utvärderar prompt injection med sitt eget anrop till
  `evaluatePromptInjection()`, utan att skicka någon anroparkontrollerad
  inaktiveringslista. `block`-läget är en tvingande gräns som
  anroparkontrollerade inaktiveringar inte kan kringgå, även på chattfamiljens
  rutter
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Att
  inaktivera `prompt-injection` hoppar endast över registrets guardrail.

### Vad som ser ett svar före post-call

På den icke-strömmande vägen är ordningen: minnesextrahering → exekvering av
inbyggda verktyg → post-call-guardrails → avslut vid post-call-block → lagring
i semantisk cache.

- **Minnesextrahering** och **verktygskörning** ser svaret innan
  efteranropets skyddsregler kan skriva om eller blockera det. Sedan
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) kör
  minnesextraheringen den extraherade texten genom `sanitizePII` när
  `PII_RESPONSE_SANITIZATION` är aktiverad (både strömmande och
  icke-strömmande), men ett svar som efteranropet senare blockerar har
  fortfarande erbjudits till minne och verktyg.
- **Den semantiska cachen** lagrar svaret efter efteranropet, så den lagrar
  det omskrivna svaret, och ett blockerat svar cachas aldrig. Cacheposter är
  nycklade per API-nyckel.

## Konfiguration

Miljövariabler som läses av de inbyggda skyddsmekanismerna:

| Variabel                              | Används av               | Effekt                                                                                                     |
| ------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Sätt till `false` för att inaktivera detekteringen helt.                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Injektionspolicy: `warn`, `block` eller `log`. Det äldre värdet `redact` skriver inte om injektionstexten. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Läge för injektionsskyddet; även en DB-funktionsflagga som **åsidosätter** miljövariablerna (DB > ENV).    |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Lägsta allvarlighetsgrad som `MODE=block` avvisar: `high` (standard), `medium` eller `low`.                |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Äldre alias för `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | När `true` maskeras PII i förfrågningar (oberoende av injektionsläget).                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedströms) | Styr maskerarens beteende på svarssidan.                                                                   |

Modality Bridge-skydden läser körningskonfiguration från det DB-backade
inställningsarkivet (`getSettings()`), inte från miljövariabler. Visions primära
nycklar är `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` och
`modalityBridgeCacheMaxEntries`. De äldre
`visionBridge*`-nycklarna accepteras endast som den dokumenterade reservläsningen
under en cykel; skrivningar från instrumentpanelen använder de primära nycklarna.
Standardvärden och reservlösaren finns i
`src/shared/constants/modalityBridgeDefaults.ts`, med äldre konstanter
bevarade i `src/shared/constants/visionBridgeDefaults.ts`.

Audio använder `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` och `modalityBridgeAudioMaxClips`, plus de delade
`modalityBridgeCache*`-inställningarna. Audio har ingen reservlösning för äldre
nycklar eftersom dessa nycklar introducerades med Modality Bridge-schemat.

Video använder `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` och
`modalityBridgeVideoTimeout`, plus de delade `modalityBridgeCache*`-inställningarna.
Det är inaktiverat som standard eftersom FFmpeg/ffprobe är valfria operativa
beroenden och textning av bildrutor ökar latens och modellkostnad.

## Egna guardrails

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

Steg:

1. Skapa `src/lib/guardrails/myGuardrail.ts` som utökar `BaseGuardrail`.
2. Implementera `preCall` och/eller `postCall`.
3. Registrera antingen vid importtillfället (pusha från `registerDefaultGuardrails`)
   eller anropa `guardrailRegistry.register(...)` vid körning — registret ersätter
   eventuella tidigare guardrails med samma normaliserade namn.
4. Lägg till tester under `tests/unit/` (befintliga exempel:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testning

Använd `resetGuardrailsForTests()` mellan testerna för att utgå från ett känt tillstånd.
Skicka `{ registerDefaults: false }` för att börja med ett tomt register och
registrera endast de guardrails som testas. Vision Bridge accepterar dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge exponerar
motsvarande skarvar för inställningar, kapabiliteter, val av STT-modell,
autentiseringskontroller och transkribering. Testerna kan därför täcka båda
flödena utan databas- eller nätverksåtkomst.

## Se även

- `src/lib/guardrails/` — implementering
- `src/shared/utils/inputSanitizer.ts` — delad detektor som driver
  skydd mot prompt-injektion och PII-maskering
- `src/shared/constants/visionBridgeDefaults.ts` — standardvärden för Vision Bridge
  och modellistan för tvingad brygga
- `src/shared/constants/modalityBridgeDefaults.ts` — delade standardvärden vid körning för Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lager (circuit breaker, nedkylningsperioder)
- `docs/reference/ENVIRONMENT.md` — fullständig referens för miljövariabler

## Täckning av injection-guard på routes & red-team (fas 8 · block D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) täcker alla routes
som tar emot användarprompter. Den respekterar `INJECTION_GUARD_MODE` (standard `warn` = endast loggning;
`block` = returnerar HTTP 400 `SECURITY_001`).

| Typ               | Routes                                                                                                                                               | Standardläge |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Text (befintliga) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generativa        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Data              | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Textextraheringen (`extractMessageContents`) omfattar `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nattligen, `nightly-llm-security.yml`):** promptfoo validerar att varje route blockerar
OWASP-LLM-korpuset med `INJECTION_GUARD_MODE=block`; garak kör sonder (hoppar över utan hemlighet).
`moderations` ingår för konsekvens skull. Blockeringsläget är en obligatorisk gräns: `evaluatePromptInjection()`
ignorerar undantagslistan per förfrågan som middleware skickar till den, så `disabledGuardrails` undantar
**inte** en route från den ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Det nattliga arbetsflödet (`.github/workflows/nightly-llm-security.yml`, cron + manuell
utlösning) har två jobb:

- **`promptfoo-guard` (blockerande)** — kör `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Varje angreppsfall (t.ex. "ignore all
  previous instructions…", DAN-liknande jailbreaks) kontrollerar att svaret innehåller
  `error.code === "SECURITY_001"`, dvs. att skyddet faktiskt avvisade förfrågan.
- **`garak` (rådgivande)** — kör garak `--probes promptinject,dan,leakreplay`
  mot en lokal OmniRoute-instans (`http://localhost:20128/v1`). Kräver en
  provider-hemlighet (`PROMPTFOO_PROVIDER_KEY`); hoppar smidigt över och har suffixet
  `|| true`, så den rapporterar utan att misslycka CI.

Täckningen av skyddshjälpen (`createInjectionGuard` / `withInjectionGuard`)
omfattar varje `/v1`-route som bär prompter; prompttexten hämtas från
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` av
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
