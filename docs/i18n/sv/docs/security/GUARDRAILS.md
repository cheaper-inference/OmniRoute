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

Registret läser automatiskt in sex skyddsräcken i prioritetsordning vid import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Namn                | Steg           | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lägre prioritetsnummer körs **först**.

### Vision Bridge (`visionBridge.ts`) — Modalitetsbrygga PR-1

Basmodellen GLM 5.3 och `glm-5.3-{low,high,max}` har uttryckliga
metadata för `supportsVision:false` i registret/specifikationen. GLM 5.3 Flash-varianterna
förblir modeller med inbyggt visionsstöd. Claude Codes `/v1/messages`-rutt går in i den
gemensamma kedjan av skyddsräcken före anropet i `handleChat` **innan** Claude-till-OpenAI-
översättningen; bilder i nästlade `Read`-verktygsresultat måste beskrivas eller hanteras
innan den översättningen lyfter dem till OpenAI-innehåll med `image_url` (#17069).

Fångar begäranden som innehåller bilder och riktas till **modeller utan visionsstöd**, och
dirigerar antingen om hela begäran till en visionskapabel modell eller ersätter bilddelarna
med textbeskrivningar som produceras av en konfigurerbar visionsmodell före
uppströmsanropet. Detta gör att textbaserade leverantörer transparent kan hantera
multimodala nyttolaster.

Flöde:

1. Hoppa över om målmodellen redan stöder vision (såvida den inte finns i den tvingande
   brygglistan `isVisionBridgeForcedModel`).
2. Extrahera bilddelar via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerar till den **enhetliga mediedetektorn**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den enda källan till sanning som
   delas med kombots kompatibilitetsfilter.
   Extraheringen är begränsad till formerna som `replaceImageParts` kan infoga tillbaka
   (extrahera↔ersätta-kontraktet): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic-URL `source.type:"url"` och Responses API
   `input_image`. Matchande bilder som är nästlade i Claude Codes
   `tool_result.content` och Responses-verktygsutdata extraheras och ersätts också på sina
   ursprungliga sökvägar; former som endast fungerar som indikatorer är material för
   kombofiltret och extraheras inte.
   Hoppa över om inga hittas.
3. Lös körtidskonfigurationen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nya inställningsnycklar för
   `modalityBridge*` har företräde; äldre nycklar för `visionBridge*` finns kvar som en
   **reservlösning under en cykel** (återställningsfönster). Hoppa över innan någon
   mediegenomsökning görs när bryggan är inaktiverad.
4. Lägesväljaren (`modalityBridgeVisionMode`, se tabellen nedan) avgör om begäran ska
   dirigeras om eller beskrivas. Omstyrning returnerar `modifiedPayload` där endast
   `model` har bytts ut, samt meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivningsvägen: begränsa antalet bilder till `maxImages`, sammanställ den
   uppgiftsanpassade prompten, kontrollera beskrivningscachen, anropa visionsmodellen
   **parallellt** (`Promise.allSettled`) och infoga textdelar med
   `[Image N]: <description>` på deras plats. En misslyckad beskrivning ger `null`: den
   råa bilden bevaras för okända mål eller mål med visionsstöd (#4012), men ett
   **bekräftat textbaserat direktmål** eller en kombination utan vision får en uttrycklig
   textstub `(unavailable — no vision-capable provider connected)` för varje obeskriven
   bild, inklusive partiella fel och bilder som ligger utanför gränsen för
   beskrivningsanrop (#17069). Den befintliga reservlösningen för beskrivning av
   kombinationer där alla försök misslyckats finns kvar (#8430).
6. Returnera `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Lägesväljare (`modalityBridgeVisionMode`)

| Läge       | Standard | Beteende                                                                                                                                                                                                                                                                                                                                             |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Äldre heuristik, oförändrad (#6640/#7204): modeller som inte är kombinationer/`auto/` dirigeras om till den bästa visionsmodellen såvida originalmodellen inte redan har användbara autentiseringsuppgifter (då beskrivs bilderna); kombinationsmål beskriver alltid bilderna.                                                                       |
| `describe` |          | Beskriv alltid — omdirigeringsblocket hoppas över helt; användarens valda modell svarar alltid.                                                                                                                                                                                                                                                      |
| `reroute`  |          | Tvinga omdirigering: skyddet för att behålla den modell som har autentiseringsuppgifter kringgås. Skyddet för målets autentiseringsuppgifter vid omdirigering gäller fortfarande — när inget användbart visionsmål finns blockerar bryggan med ett tydligt fel i stället för att beskriva bilderna eller skicka råa bilder till ett textbaserat mål. |

Tvingande lägen kortsluter flödet **innan** auto-heuristiken körs; `auto`-beteendet är
byteidentiskt med skyddsräcket före PR-1.

#### API-nyckelns omfattning (`visionBridgeKeyScope.ts`)

När anroparens API-nyckel begränsar `allowedConnections`, kvotpooler
(`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) väljer bryggan endast
omdirigerings- och beskrivningsmodeller som nyckeln får använda, på anslutningar
som nyckeln får använda. Beskrivningsanropet går sedan alltid genom OmniRoutes
självloop med huvudet `x-omniroute-self-loop-key-id`, så den mottagande
chattförfrågan tillämpar den nyckelns anslutnings- och modellpolicy igen.
`enforceApiKeyPolicy()` respekterar endast det huvudet tillsammans med
självloopens bearer-token, så det kan bara begränsa åtkomsten, och ett ID som
inte kan slås upp avvisas.

Om ingen synmodell är tillåten för nyckeln avvisar ett **bekräftat textmål**
bildförfrågan lokalt med ett tydligt HTTP 400 i stället för att vidarebefordra
bildbytes till en inkompatibel upstream (#17069). För mål med okänd eller inbyggd
synförmåga behåller beskrivningsvägen sitt tidigare fail-open-beteende (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`).
Förfrågningar utan nyckel och nycklar utan dessa begränsningar fungerar exakt
som tidigare.

#### Uppgiftsmedveten beskrivningsprompt (`modalityBridgeVisionTaskAware`)

Standardvärde **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lägger
till texten från det **senaste användarmeddelandet** (trunkerad till 500 tecken)
i den grundläggande beskrivningsprompten. Detta styr beskrivningen mot det
användaren faktiskt frågade efter (mönstret från codex-vision-proxy) och ber
synmodellen att transkribera synlig text. När flaggan är avstängd — eller om
ingen användartext finns — används grundprompten oförändrad.

Självloopens eget OpenAI-kompatibla beskrivningsanrop
(`callVisionModelSingle()` i `visionBridgeHelpers.ts`) begär alltid
`image_url.detail: "high"` — ovillkorligen, för varje anropare/leverantör, och
inte beroende av någon klientsignal. Sampling med låg detaljnivå försämrar
OCR-precisionen för exakt den texttranskriberingsuppgift som denna prompt
begär, så beskrivningsanropet begär alltid hög detaljnivå oavsett vilken
detaljnivå den ursprungliga inkommande förfrågan använde. Detta påverkar endast
den interna beskrivningsförfrågans body; det ändrar inte hur OmniRoute
vidarebefordrar anroparens eget `image_url.detail` i den primära förfrågan —
det standardvärdet tillämpas separat, och endast för detekterade OpenCode-klienter,
i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Självloopens gren för Anthropic-wire-format har inget `detail`-fält och påverkas
inte av något av standardvärdena.

#### Gräns för beskrivningsutdata (`modalityBridgeVisionMaxChars`)

| Nyckel                         | Standardvärde | Intervall           |
| ------------------------------ | ------------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` eller 100–50000 |

`0` (standardvärdet) betyder **ingen gräns** — beskrivningen som returneras av
`callVisionModel()` skickas vidare oförändrad, vilket bevarar det befintliga
beteendet. Alla värden i intervallet 100–50000 trunkerar beskrivningen med ett
`…`-suffix innan den infogas igen som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Öka detta värde för OCR-uppgifter med mycket detaljer där nedströmsmodellen
behöver hela transkriberingen; sänk det för att begränsa tokenanvändningen hos
pratsamma synmodeller. Fältet i dashboarden finns på Vision-flikens panel
Advanced (`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) och
klampar alla värden mellan 1 och 99 upp till minimivärdet 100, samtidigt som
ett explicit `0` lämnas orört — `0` är ett giltigt Zod-värde i sig
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), inte bara
standardvärdet för ”ej angivet”.

#### Beskrivningscache (`modalityBridge/bridgeCache.ts`)

Cache i minnet med LRU + TTL för beskrivningsutdata, delad i hela processen.
Nyckel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med
längdprefixerad inramning (inga kollisioner mellan fältgränser). Modellkomponenten
är den **konfigurerade** bryggmodellen, inte modellen som faktiskt svarade —
`callVisionModel` kan falla tillbaka internt, och nycklar per försök skulle
fragmentera cachen. Misslyckade beskrivningar cachas aldrig. Inställningar:

| Nyckel                          | Standardvärde | Intervall |
| ------------------------------- | ------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`        | —         |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000   |

#### Normalisering av fjärrbilder (självloopens beskrivning/inhämtning av base64)

När bryggan själv hämtar en **fjärrbild** — både Anthropics
beskrivningsanrop och base64-konverteringen för claude-wire-format
(`ensureBase64ImagesForClaudeWire`), båda via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — skickas den
resulterande data-URI:n genom `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) innan den bäddas in i
synmodellens förfrågan. För stora bilder skalas ned till en **långsida på
2048 px** (samma storleksgräns som OpenAI/Anthropic redan tillämpar på
serversidan), vilket minskar uppladdningsstorlek och latens utan att ändra vad
synmodellen ser. Storleksändringen använder `sharp`, som läses in via dynamisk
import: på en plattform där dess inbyggda binärfil inte kan läsas in kastar
`normalizeDataUri()` **aldrig ett fel** — den faller tillbaka till att skicka
vidare originalbytes, så beskrivnings-/base64-konverteringsvägen alltid fortsätter
att fungera. Icke-bildbytes (en hämtning som inte returnerade en avkodningsbar
bild) skickas också vidare orörda. Denna normalisering gäller endast bilder som
bryggan hämtar för sitt eget självloopanrop — den tillämpas aldrig på
anroparens råa vidarebefordrade nyttolast, i enlighet med principen om
ändringar endast efter uttryckligt opt-in (Hard Rule #20).

#### Inställningsschema + migrering

De nya `modalityBridge*`-nycklarna valideras med Zod i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, de tre `modalityBridgeCache*`-nycklarna samt
gruppen `modalityBridgeAudio*` som används av Audio Bridge. Migreringen
`141_modality_bridge_settings.sql` kopierar befintliga äldre
`visionBridge*`-värden till motsvarande nya nycklar (idempotent, skriver aldrig
över ett operatörsinställt `modalityBridge*`-värde); de äldre nycklarna
accepteras fortfarande som reserv vid läsning under en versionscykel.

#### Transparenshuvud + statistik

Beskrivningsbaserade svar innehåller
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(skapas av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`
och läggs till av `withModalityBridgeHeader()` i
`src/sse/handlers/chatHelpers.ts`). Omdirigerade förfrågningar får **inget**
huvud — nyttolasten var oförändrad och modellbytet syns redan i svarskroppens
`model`-fält.

`GET /api/modality-bridge/stats` (administrationsautentisering, samma nivå som
`GET /api/settings`) returnerar räknare per modalitet i minnet
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` för `vision`, `audio` och
`video`. `averageLatencyMs` använder `latencySamples`, inte alla försök, som
nämnare; en operation utan tidsmätning skapar inte ett artificiellt prov på noll
millisekunder. `bridged` förblir det bakåtkompatibla aliaset för lyckade
konverteringar; misslyckade försök ökar inte värdet.
Räknarna återställs vid omstart av processen enligt design
(telemetri, inte redovisning).

#### Konfiguration i kontrollpanelen

Den dedikerade kontrollpanelssidan är
`/dashboard/settings/modality-bridge`. De URL-adresserbara flikarna `Vision`,
`Audio` och `Video` bevarar frågeparametrar när värdet för `tab` ändras.
Fliken Vision visar aktivering, läge, modellval (inklusive automatiskt
standardval), uppgiftsmedvetna instruktioner, avancerade gränser för timeout,
bilder, beskrivningslängd och cache, körningsräknare samt en skyddad
exempelförfrågan. Fliken Audio är också aktiv: den visar aktivering, en
modellväljare som endast gäller STT med Auto, gränser för timeout och maximal
klipplängd, ljudräknare samt ett exempeltest med `input_audio`. Fliken Video
fungerar: den rapporterar körningstillståndet för FFmpeg/ffprobe — ett av fyra
uttryckliga UI-tillstånd (`unknown` medan kontrollen pågår eller inte kunde
slutföras, `restricted` på en kontrollpanelvärd som inte är loopback när
kontrollen hoppas över på klientsidan, `unavailable` när en genomförd kontroll
bekräftat att det saknas, eller `available` med FFmpeg/ffprobe-versionerna) —
sparar gränser för aktivering, modell, bildrutor, video och timeout, begränsar
modellväljaren till modeller med visionsstöd och visar videoräknare.

Det tidigare Vision Bridge-kortet under AI-inställningar är en
kompatibilitetslänk till den nya sidan; det äger inte längre en andra kopia av
formuläret. Media Providers länkar även arbetsflödena Image-to-Text och
Speech-to-Text till motsvarande flikar i Modality Bridge utan att ta bort den
befintliga lekplatsen för Speech-to-Text.

**Förbikoppling av självslingeadmission:** när beskrivningsanropet går genom
OmniRoutes egen `/v1`-självslinga (modell från en icke-standardleverantör)
skickar underförfrågan `x-omniroute-admission-bypass: internal` och
autentiseras med den upplösta självslingelegitimationen — den lokala
`sk_omniroute`-sentineln i lokalt läge, eller den operatörskonfigurerade
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY`-miljönyckeln (#1350), så att
distributioner med `REQUIRE_API_KEY=true` fortfarande kan köra
beskrivningsanropet. Förbikopplingen godkänns endast för dessa exakta
legitimationer, så externa klienter kan inte använda huvudet för att hoppa över
admission.

Äldre standardvärden finns i `src/shared/constants/visionBridgeDefaults.ts`;
de nya standardvärdena för läge, uppgiftsmedvetenhet och cache samt
inställningsupplösaren finns i
`src/shared/constants/modalityBridgeDefaults.ts`. Skyddsräcket exponerar ett
`deps`-konstruktörsalternativ så att tester kan injicera falska implementationer
av `getSettings` och `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fångar upp chattförfrågningar som innehåller ljud innan de når ett mål som inte
är känt för att acceptera ljudindata. Chattförfrågan omdirigeras aldrig:
ljuddelarna transkriberas via den befintliga OpenAI-kompatibla
multipart-slutpunkten och den valda chattmodellen fortsätter med textutskrifter.

Flöde:

1. Lös `supportsAudio` via `getResolvedModelCapabilities()`. Explicit metadata från provider-registret har företräde, följt av statisk modellmetadata och därefter synkroniserad `modalities_input`. En deklarerad indatalista utan `audio` är `false`; om inga kapacitetsuppgifter återstår är värdet `null`. Både `false` och `null` aktiverar den konservativa bryggan, medan `true` kringgår den.
2. Lös inställningarna för `modalityBridgeAudio*` och extrahera ljuddelar på toppnivå som kan ersättas från varje meddelande via den gemensamma detektorn `detectMediaParts()`. Följande trådformat stöds: OpenAI `input_audio`, `audio_url` och `source.media_type: "audio/*"`. Kapslat ljud identifieras för routning men tas inte bort av ersättningsvägen. Arbetet begränsas av `modalityBridgeAudioMaxClips`; senare delar lämnas orörda.
3. Respektera en konfigurerad `provider/model`, eller låt `selectAudioBridgeModel()` gå igenom `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogordning och välja den första modellen med användbara aktiva provider-uppgifter.
4. `callAudioTranscription()` konverterar base64-/data-URI-ljud till en multipart-`file`, eller hämtar en fjärransluten `audio_url` via den offentliga outbound-vakten med DNS-bindning och en gräns på 25 MB. Därefter gör den POST-anrop med filen och den valda modellen till den lokala self-loop-adressen `/v1/audio/transcriptions`, autentiserad med `resolveSelfLoopBearer()`. Den befintliga transkriberingsrutten utför normal uppslagning av autentiseringsuppgifter, hantering av cooldown/rate limit och provider-dispatch.
5. Framgångsrika anrop ersätter sina delar med `[Audio N]: <transcript>`. Anrop körs med `Promise.allSettled`: ett enskilt fel bevarar den ursprungliga ljuddelen (#4012-kontraktet). Om alla anrop misslyckas och målets `supportsAudio === false` är bekräftad, blir delarna
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontraktet). För ett okänt mål (`null`) lämnas resultatet efter totalfel orört. Ett bekräftat textbaserat mål utan användbara STT-autentiseringsuppgifter får samma explicita platshållare utan att något nätverksanrop görs.

Framgångsrika transkriptioner använder Modality Bridge-cachen med LRU/TTL som gäller för hela processen. Nyckeln kombinerar ljudreferensen, den stabila etiketten för åtgärden `audio-transcription` och den valda STT-modellen; fel cachelagras aldrig. Ljudförsök uppdaterar de gemensamma räknarna `bridged`, `cacheHits`, `failures` och `lastUsedAt`. Transformerade svar innehåller
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; orörda begäranden får inget Audio Bridge-segment.

Runtime-inställningar lagras i databasen och valideras med Zod:

| Nyckel                        | Standardvärde | Intervall                |
| ----------------------------- | ------------- | ------------------------ |
| `modalityBridgeAudioEnabled`  | `true`        | —                        |
| `modalityBridgeAudioModel`    | `""`          | Automatiskt eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000              |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10                     |

Den gemensamma cachen styrs fortfarande av `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` och `modalityBridgeCacheMaxEntries`.

### Videobrygga (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fångar upp videodelar på toppnivå i Chat Completions-`messages` och Responses API-`input` innan ett mål utan känd inbyggd videofunktionalitet anropas. Följande former stöds: `input_video`, `video_url`, `video_source`, HTTPS-URL:er och `data:video/*;base64,...`-data-URI:er. Vanliga filnamn i text behandlas inte som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ansvarar för genomgång av begäran, kapacitets-/policykontrollen, aggregering per begäran och svarspayloaden. Videobearbetning per video — hämtning, cache för hela resultatet, beskrivning av en bildsekvens (som sammanfogar eventuell ljudtranskription som deklarerats av anroparen) samt mätvärden, avbrytning och rensning per försök — är dold bakom `processVideoPart` i `videoBridgePipeline.ts`, som anropas en gång per videodel i loopen i `preCall`. Modulen definierar även de explicita portgränserna `VideoMediaBrokerPort` (hämtning av byte och extrahering av samplade bildrutor), `VideoAudioTranscriptionPort` (sammanfogning av en ljudtranskription som deklarerats av anroparen med de samplade bildtexterna) och `VideoDrilldownPort` (den äldre formen för rålagring). Produktions-STT och lagring av bildrutor komponeras runt beskrivningsporten via `createVideoSttAdapter` och `createVideoDrilldownAdapter`; den senare använder den gemensamma livscykeln för opaka handtag.

Den publika `/v1`-sökvägen för begäranden importerar eller anropar aldrig en subprocess. Fjärrvideor hämtas under en gräns på 50 MiB; infogade base64-videor har en konservativ gräns på 36 MiB avkodat per video, så att modell-/meddelande-/frameramverket kan hållas inom den publika JSON-begäransgränsen på 50 MiB. Uppskattningar av infogad längd och avkodad storlek kontrolleras före allokering. HTTPS krävs för den ursprungliga fjärr-URL:en och varje omdirigering, med användning av den befintliga offentliga outbound-vakten med DNS-bindning. Byten passerar därefter den exakta interna mäklargränsen `POST /api/modality-bridge/video/extract`. Den rutten är både `LOCAL_ONLY` och `SPAWN_CAPABLE`, accepterar endast en per process autentiserad, betrodd loopback-begäran och accepterar aldrig en URL, filsökväg, körbar fil eller argumentlista. API:ts pipeline för kroppsstorlek och hanterarens inkrementella kroppsläsare tillämpar oberoende en gräns på 50 MiB för mäklarens indata. Den begränsade kön kör en extraktion åt gången, tillåter fyra väntande jobb och begränsar väntande indata till 100 MiB.

I brokern läser `ffprobe` en privat lokal fil; den fasta formatlistan över
tillåtna format utesluter spelliste- och manifestformat. För tillåtna containrar
i MOV-familjen förblir externa MOV-datareferenser inaktiverade som standard, och
det fasta kommandot aktiverar dem inte. Både `ffprobe` och `ffmpeg` använder
protokollistan som endast tillåter `file`, en tråd, fasta argumentmatriser, inget
skal och körbara filer som löses från `PATH`. Omslagsströmmar med bifogade bilder
är inte spelbara kandidater. Alla spelbara strömmar måste uppfylla gränserna, och
en explicit standardström föredras före den deterministiska reservlösningen med
lägsta index. Videor begränsas till 600 sekunder, 8 192 pixlar per dimension och
33 554 432 källpixlar. FFmpeg samplar 1–16 JPEG-bilder från mittpunkter, skalar
ned den längsta kanten till högst 1 024 pixlar utan att skala upp mindre indata
och tar aldrig emot en URL. Sampling är `uniform` som standard. De valfria
policyerna `scene_aware` och experimentella `segment_aware` utför ytterligare en
fast FFmpeg-körning över den redan validerade lokala strömmen, väljer begränsade
`showinfo`-scenestidsstämplar och faller deterministiskt tillbaka till samma
enhetliga mittpunkter vid detekteringsfel, timeout, felaktiga utdata eller en tom
kandidatuppsättning. Läget segmentmedveten fördelar mittpunktssamplingar
proportionellt efter de validerade scenintervallen; bevis och reservbeteende för
segmentmedvetet läge beskrivs nedan. Den hårda gränsen på 16 bildrutor
tillämpas efter valet i varje policy. När en scenmedveten begäran endast har en
bildrutas budget använder den den enhetliga mittpunkten för det aktiva fullständiga
video- eller fokusfönstret och rapporterar `policyEffective: uniform`: en enda
vald scenbild kan inte bevara båda tidsmässiga ändpunkterna. En anropare kan
valfritt ange ett ändligt fokusfönster (`start`/`end` sekunder); gränser klipps
till mediets varaktighet, omvända eller icke-finitära fönster avvisas och alla
samplingpolicyer utförs endast inom det normaliserade intervallet. Det resulterande
fönstret inkluderas i samplingens metadata och i prefixet för den otillförlitliga
beskrivningen, så att nedströmsmodeller kan skilja ett fokuserat utdrag från hela
tidslinjen.

Semantiskt bildtextfokus är en separat, uttrycklig inställning. Standardläget för
analys, `full`, bevarar den befintliga bildruteprompten och vidarebefordrar aldrig
begärandetext till bildtextmodellen. I läget `focused` läser bryggan endast den
senaste icke-tomma användarskapade `text`/`input_text` från samma Chat- eller
Responses-container, normaliserar den till NFC, ersätter kontrolltecken och
blanksteg och begränsar den till 500 Unicode-kodpunkter. Ett tomt resultat faller
tillbaka till den exakta `full`-prompten. Ett användbart tips serialiseras som
JSON i ett särskilt block för otillförlitlig användarkontext och får endast
prioritera observerbara detaljer; det kan inte åsidosätta den separata varningen
mot att följa instruktioner som är synliga eller hörbara i mediet. Textfokus
härleder aldrig `start`/`end` och ändrar inte den temporala samplaren.

#### FU-07 strukturella segmentbevis

`segment_aware` använder en begränsad föranalyskörning över den redan validerade
lokala videoströmmen. Den fasta filterkedjan skalar först till högst 320 pixlar i
bredd, detekterar scenändringar och frusna intervall och samplar sedan med 1 bildruta
per sekund för oskärpa, genomsnittlig luminans samt rumslig/temporal information.
Körningen begränsas till 600 strukturella samplingar, en FFmpeg/filtertråd, samma
protokoll- och containerlistor som endast tillåter `file`, en gräns på 1 MiB för
processutdata och högst 30 sekunder inom brokerens gemensamma avbrytnings-/deadlinetid.
Den accepterar aldrig ett kommando, filter, en sökväg eller en URL från begäran.

De strukturella värdena är deterministiska samplingstecken, inte semantisk
videoförståelse. De härleder inte motiv, handlingar, bildtexter, tal eller
användarens avsikt. Scen- och frysgränser bildar segment; frysningsgrad,
oskärpa, exponering, rumslig detalj och temporal förändring påverkar endast hur
den befintliga budgeten på 1–16 bildrutor fördelas. Ett helt fruset segment
begränsas till en bildruta, medan icke-frusna segment konkurrerar om den
återstående budgeten. När antalet gränser överstiger antalet bildrutor behålls
enhetlig täckning av tidslinjen, så att snabba tidiga klipp inte kan dölja ett
långt efterföljande segment. Scengränser inom frysgränsens analysupplösning på
1 sekund slås samman.

Saknade filter, felaktiga eller tomma bevis, ett detekteringsfel eller en
tidsgräns för den begränsade föranalysen leder till exakt den enhetliga
mittpunktspolicyn som reserv. Ett avbrott från anroparen eller en deadline för
brokern leder inte till reservbeteende: den pågående underprocessen avslutas,
senare bildruteextraktion förhindras och det privata temporära trädet tas bort i
`finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererar deterministiska verkliga
FFmpeg-fixturer för besparingar av bildtextanrop efter deduplicering,
budgetfördelning vid tät rörelse, bevis för oskärpa/exponering/SI-TI, snabba klipp
med en lång avslutande del och falska positiva resultat vid gradvis toning. Den
registrerar väggklocktid för föranalysen och, när `/usr/bin/time` är tillgängligt,
underordnade processers CPU-användning och maximala RSS. Dess kvalitetskontroller
är endast strukturella orakel. Den verkliga bildtextmodellens kvalitet förblir
`HOLD`, eftersom denna testmiljö saknar en auktoriserad slutpunkt eller en fryst
bedömare. Monetära besparingar förblir också `HOLD` om inte
`--caption-cost-per-call-usd` tillhandahåller en uttrycklig positiv uppskattning
per anrop; skriptet fabricerar aldrig något av resultaten.

Varje bildruta är begränsad till 4 MiB, alla råa bildrutor tillsammans till 23 MiB och det serialiserade mäklarsvaret till 32 MiB. En privat tillfällig katalog tas bort i `finally`. OmniRoute paketerar inte FFmpeg och accepterar inte en anpassad sökväg till den körbara filen. Före bildtextgenereringen tillämpar bryggan ett konservativt visuellt dedupliceringssteg: varje JPEG reduceras till en gråskalebuffert på 16×16 och jämförs endast med den senast bevarade bildrutan. För en begärd bildtextbudget på mer än en bildruta tillhandahåller extraheringen en begränsad kandidatpool på upp till dubbla budgeten och aldrig fler än 16 bildrutor. Den begärda gränsen tillämpas först efter dedupliceringen, och den första och sista valda kandidaten bevaras under den slutliga gallringen när budgeten är minst två. Den versionshanterade policyn
`grayscale-16x16-mean-cells-v2` använder det större av skillnaden i medelluminans och andelen miniatyrceller vars normaliserade skillnad är minst 0.05. Dubbletttröskeln är konstanten 0.04, vald för förutsägbarhet snarare än exponerad som en körningsinställning. Denna sekundära signal för hög kontrast bevarar små rörelser och ändringar i synlig text som en jämförelse som endast använder medelvärdet kan dölja. Fel i jämförelse eller avkodning släpper igenom och behåller täckningen. Utdata-metadata skiljer mellan extraherade kandidater, bildrutor som använts framgångsrikt och visuella dubbletter som tagits bort.

En uttryckligen markerad videodel kan begära ett tidsstämplat kontaktark. Bryggan bygger ett JPEG-rutnät med högst fyra kolumner och 16 bildrutor. Varje cell på 512 pixlar bränner in sin källas tidsstämpel i ett högkontrastband längst ned, medan samma tidsstämplar finns kvar i textmetadata för efterföljande koppling och granskning. Det fullständiga JPEG-objektet förblir begränsat till 32 MiB. Om `sharp` inte kan avkoda eller sammanfoga rutnätet återgår bryggan till de enskilda JPEG-bildrutorna; ett klientavbrott fortplantas fortfarande genom kontaktarksoperationen.

Underlag för befordran hålls avsiktligt separat från mikroriktmärket för syntetisk sammansättning. `scripts/perf/video-bridge-contact-sheet-eval.ts` definierar ett schemaversionshanterat A/B-test för verkliga OpenAI-kompatibla synmodeller. Det mäter tokens som rapporterats av leverantören, total väggklockelatens (inklusive sammansättning av kontaktarket), antal modellanrop och bevarande av manifestdefinierade fakta. Råa modellsvar skrivs inte till rapporten; endast SHA-256-digestar och matchade fakta-ID:n bevaras. Testet gör inget nätverksanrop eller betalt modellanrop om inte `--execute-real` har angetts och `--model`, `OMNIROUTE_BASE_URL` och `OMNIROUTE_API_KEY` har konfigurerats. Utan denna uttryckliga verkliga körning förblir dess maskinläsbara beslut `HOLD`; mätningar av syntetiska nyttolaster och anropsantal utgör ensamma inte underlag för befordran.

Det separata `scripts/perf/video-bridge-promotion-eval.ts` använder observationer från FU-07 eller FU-09. För godkännande till befordran krävs alla åtta syntetiska scenariotyper samt ett sanerat verkligt klipp, minst tre uppmätta upprepningar per roll och fall, alla tio deklarerade mätvärden, frysta digestar för media, prompt, förväntade fakta och inställningar, unika observations-ID:n samt verifierad initierad A/B-ordning. Körningskvittot binder samman korpusdigesten, exakt kandidat-SHA och modellrevisionen. Saknade eller ogiltiga mätningar förblir `HOLD`, inklusive CPU över 30 s, högsta RSS över 512 MiB eller föranalys över 30 s. Detta är gränser för bevisgodkännande, inte en ny garanti för RSS-tillämpning under körning.

FU-07 kräver minst 98 % kvalitetsbevarande och p95-latens på högst 1,2× baslinjen, samt antingen en absolut förbättring av fallbalanserad medelåterkallning på 0,05 vid motsvarande genomsnittligt antal bildtextanrop, eller minst 10 % färre genomsnittliga bildtextanrop efter deduplicering. FU-09 kräver minst 0,85 i kvalitet, 95 % bevarande, 20 % minskning av medianlatensen och 10 % minskning av antalet tokens. Förlust av kritiska fakta, bristande efterlevnad av injektionskrav eller saknad användningsinformation förhindrar befordran. En körning kan inte befordra något:
`--previous-report` bekräftar två distinkta, icke-överlappande och efter varandra behöriga körningar av samma policy-/modellrevision/kandidat/korpus. Ett samplingsförsök kan inte bekräfta ett kontaktarksförsök.

Insamlare bör poängsätta svar i minnet och spara `responseDigest` tillsammans med mätvärden och observationsbindningar, aldrig svarstext. Konsumenten läser även äldre råa observationer men kopierar aldrig denna text till sina rapporter. Exakt en av `responseDigest` eller `rawResponseText` accepteras för varje observation. Den versionshanterade tillåtelselistan förblir tom med ett oföränderligt standardvärde `hold`. En behörig post kräver sin bevisreferens, policy, modellrevision, exakta kandidat-SHA, manifestdigest och två distinkta körnings-ID:n; motstridiga kontexter avvisas. Dessa metadata utgör ett granskningskontrakt, inte ett bevis på att en refererad fil innehåller äkta mätningar. Granska de faktiska kvittona innan någon post läggs till. Hanteringsstatistikens slutpunkt och Video-instrumentpanelen visar konservativ beredskap. Ett konfigurerat modellalias ensamt fastställer inte dess revision eller den körande kandidat-SHA:n, så den aktuella instrumentpanelen rapporterar `HOLD` i stället för att återanvända behörighet från en annan körningskontext. Explicit experimentellt val förblir separat från befordran; inget standardvärde ändras automatiskt.

Anropare kan bifoga en valfri `transcript.cues`-array till en video-del som stöds när de redan har tillgång till justerad text. Varje cue måste innehålla `text`, ett ändligt `start`/`end`-intervall inom den avsökta varaktigheten samt en vitlistad `source` (`client`, `embedded` eller `audio-bridge`); `confidence` har standardvärdet `1` och måste förbli mellan `0` och `1`. Exakta dubbletter av cues slås samman. OmniRoute initierar aldrig transkribering från dessa metadata: validerade cues kopieras till det beskrivna resultatet med källa, konfidens och intervall, och återges som otillförlitliga observationer tillsammans med bildtexten för bildrutorna. Ogiltig text, text utanför intervallet eller text utan proveniens avvisas i stället för att blandas in i bildtextströmmen. Båda transcript-kanalerna i request-body normaliserar angiven proveniens till `client`, inklusive självdeklarerade etiketterna `embedded` eller `audio-bridge`. Endast en serverägd adapter kan tilldela dessa betrodda etiketter via det kodexklusiva argumentet `trustedSource`; ett JSON-fält i requesten kan inte nå det argumentet. Transkripttext förblir otillförlitligt mediaderiverat innehåll, oavsett proveniens, och får aldrig avgöra auktorisering.

En avancerad anropare kan ange ett `audioTranscript`-spår för samma video; det behandlas som klienttillhandahållen text, inte som bevis på servertranskribering. Fusionsgränssnittet kör visuella observationer och ljudobservationer under samma tidsgräns och avbrytningssignal, ordnar dem på en gemensam tidslinje, slår samman exakta dubbletter och rapporterar ett partiellt resultat när endast den ena sidan lyckas. Ett ogiltigt `audioTranscript` degraderas till detta partiella resultat — videobeskrivningen behålls och ljudgrenen registrerar en sanerad felkod — i stället för att hela videon misslyckas. Tillgänglighet per gren, den partiella flaggan och de sanerade felkoderna bevaras i det beskrivna resultatet, i skyddsrädesmetadata (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i resultatcachemetadata och i bryggans fusionsräknare. Den förvalda Video Bridge-sökvägen anropar inte tal-till-text och laddar inte ned en andra mediekopia; utan det uttryckliga spåret förblir den videoenbart.

**Bevarande av transkript (#12150 P1).** Detta tillämpas automatiskt när Video Bridge (som i sig är opt-in) återger en transcript-cue — det finns ingen separat bevarandeflagga. När en request återger någon transcript-cue (ett av anroparen deklarerat `transcript` eller ett fusionerat `audioTranscript`) markerar skyddsräcket den som `videoBridgeObserved` och skapar en redigerad skugga av videobeskrivningen — en identisk återgivning där varje cues fritextinnehåll ersätts med `[redacted-video-transcript]`, genom att det strukturerade cue-fältet ersätts innan strängen sätts samman (aldrig genom att tolka den utplattade texten, så att inget cue-innehåll — adversariellt eller vanligt, inklusive innehåll som innehåller `]` såsom `[inaudible]`/`[music]` — kan överleva). Den beständiga request-body:n i anropsloggen byter ut varje videoderiverad textdel mot den redigerade skuggan, matchad genom innehållslikhet; `fullText`-ankaret läses om från den färdiga payloaden efter anropets skyddsräcke, så att matchningen fortfarande lyckas efter att senare skyddsräcken i kedjan (PII- och autentiseringsuppgiftsmaskerarna, prioriteterna 10/95) skriver om beskrivningstexten på plats och efter att injicering av systemprompt/handoff/minne omformar meddelandearrayen. Body:n som skickas uppströms till modellen är oförändrad. En observerad request fyller inte heller i något beständigt Memory (både extrahering från request- och svarsdata hoppas över), så modellens eget svar kan inte återge transkripttext i Memory.

**Råvideofält (#12430).** När bryggan är aktiverad och inbyggt videostöd är okänt eller saknas aktiverar definierade fält för `transcript`/`audioTranscript` också `videoBridgeObserved`, även efter misslyckad beskrivning eller en `maxVideos`-begränsning. `null` och tomma strängar räknas; fält som saknas och metadata som inte gäller video gör det inte. Bevarade kopior redigerar dessa fält eller utelämnar requesten, och cache/Memory kringgås.

På dessa reservsökvägar blir giltiga cues från anroparen delar av typen `text`/`input_text` som stöds, i stället för icke-standardiserade leverantörsfält. Båda spåren som tillhandahålls i requesten förblir otillförlitliga `client`-observationer, med en uttrycklig varning om att videon inte beskrevs och att tidsstämplarna inte verifierades mot mediet. De befintliga budgetarna på 256 cues/64 KiB totalt och per cue gäller tillsammans för de två spåren; tidsstämplarna måste rymmas inom förmedlarens gräns på 600 sekunder och eventuellt angivet fokusfönster. Ogiltiga spår kasseras och vidarebefordras inte som godtycklig text; ett giltigt syskon kan fortfarande användas om deras gemensamma budget inte överskrids. Null-/tomma fält lägger inte till någon text. Denna reservlösning lägger inte till någon mediehämtning eller transkribering. Transcript-tilläggsfält tas bort från reservlösningens videobärare och dess `video_url`/`source`-objekt. OpenAI:s allowlist för wire-formatet förblir strikt; okända inbyggda videobärare förblir tillgängliga och kända textbaserade mål behåller säkra markörer. Strukturerade redigeringsskuggor skyddar den tillagda transkripttexten, medan den ursprungliga requesten som ägs av anroparen förblir oförändrad. Mål med inbyggt stöd och inaktiverade bryggor behåller sitt befintliga kringgående beteende.

Ytterligare bevarade kopior använder samma signal för observerad request. Den råa klientrequest-snapshoten före skyddsräcket, den väntande requesten i minnet och loggen för tidigt avvisade requests ersätter strukturellt transcript-fält i videodelar; strängprompter som syntetiseras av pipeline-steg och kontextöverföring redigeras vid lagringspunkten för request-body:n. Den beständiga `video_content_removed`-markören gör att fortsättning med `previous_response_id` misslyckas stängt i stället för att återskapa text som avsiktligt kasserades. Om en observerad request förlorar sin redigeringsskugga per del före loggning, eller om till och med en av flera videoskuggor inte matchar efter senare ändringar av requesten, utelämnas hela den bevarade request-body:n i stället för att en delvis redigerad transkripttext bevaras.

För en observerad begäran kan ett modellsvar citera valfri del av
transkriptet utan en strukturerad avgränsare. Dess beständiga samtalslogg
`responseBody` ersätts därför med en utelämningsmarkör; den detaljerade
pipelineartefakten (som kan innehålla uppströms-/klientbrödtext och
strömsegment) sparas inte. Semantiska cacheminnen, idempotenscacheminnen och
cacheminnen för återuppspelning av resonemang kringgår läsningar och skrivningar
för den begäran. Leverantörens begäran och det klientsynliga svaret förblir
oförändrade. Tidiga keepalive-bytes töms från den tillfälliga bufferten när den
detaljerade artefakten utelämnas. Kiros varning om felaktig EventStream
rapporterar endast nyttolastens byteantal, aldrig dess innehåll eller JSON-
tolkarens råa fel.
Detta innebär inte att alla orelaterade diagnostikmeddelanden från leverantörer/
pluginer har granskats; den bredare genomgången av kvarhållna mål spåras i #11658.

Livscykeln för det interna `/api/modality-bridge/video/drilldown` är en separat,
loopback-/tokenautentiserad cacheinfrastruktur. Varje åtgärd kräver dessutom ett
kanoniskt ogenomskinligt principal-ID. Innan en produktionsanropare aktiveras
måste den härleda detta ID från den autentiserade klientorganisationen och får
aldrig vidarebefordra ett klientvalt värde. Cache-nycklar binder denna principal
till kanoniska sessions- och videoreferens-ID:n, lagrar endast deras
SHA-256-härledda nycklar och begränsar både läsningar och borttagningar till
samma principal. Cachen lagrar högst 16 härledda JPEG-bildrutor per post, låter
dem upphöra efter tio minuter och stöder begränsade läsningar med
`start`/`end` eller explicit borttagning av sessioner.

Varje principal begränsas till 16 poster och 64 MiB kanoniska JPEG-data. Dessa
gränser är oberoende av det globala taket på 64 poster/256 MiB: tryck på en
principals kvot avlägsnar endast den principalens minst nyligen använda poster
innan global LRU-avlägsning övervägs. Utgångna poster rensas från både
principalens och den globala redovisningen vid cacheaktivitet, medan avbrytande
och valideringsfel inte verkställer en ofullständig ersättning.

Cachen avvisar icke-kanonisk Base64, överflödiga utfyllnadstecken, media som inte
är JPEG, felaktiga eller trunkerade JPEG-filer samt JPEG-filer som genererar en
varning under en begränsad fullständig `sharp`-avkodning. Den kodar om varje
accepterad bild som en kanonisk JPEG, härleder bredd och höjd från de avkodade
bytesen i stället för att lita på klientens fält och kasserar eventuella
efterföljande polyglot-bytes i stället för att behålla dem. Endast den
begränsade kanoniska komprimerade bufferten belastar båda kvoterna. JSON-
trådgränsen inkluderar Base64-overhead för taket på 32 MiB för avkodad
indata. Varje lagrad härledning registrerar sitt validerade JPEG-format/
sin upplösning, samplingspolicy, härledningsversion, skapandetid, serverberäknad
innehållshash samt hashad överordnad referens och den betrodda klientens hash av
det överordnade innehållet. Avbrytande kontrolleras mellan asynkrona
avkodnings-/hashningsfaser före den atomära cacheverkställningen.

Produktionsproducenten återanvänder redan härledda broker-bildrutor endast efter
lyckad visuell analys, utan någon andra videonedladdning/-extraktion. Den kräver
operatörsinställningen `modalityBridgeVideoDrilldownEnabled=true`, strikt
`drilldown: true` per del och ett autentiserat API-nyckelpost-ID.
Klientdeklarerade principal-/sessionsvärden fastställer aldrig ägarskap. Utan
alla tre villkor hashas, storleksändras eller sparas inga ytterligare bildrutor.
Ett misslyckande vid lagringen bevarar det användbara visuella svaret.
Samtyckta begäranden kringgår cachen för helvideoreultat så att cachade resultat
aldrig återspelar handtag.

Lyckade JSON- och SSE-svar exponerar högst fyra ogenomskinliga handtag i den
begränsade headern `x-omniroute-video-drilldown`. Auktoriserade
webbläsarursprung kan läsa denna header utan att CORS-ursprungspolicyn breddas.
Nya handtag använder `v1.<32-byte random base64url
token>`, och registret behåller endast deras SHA-256-hashar. Läsaren/
header-parsern accepterar även äldre 64-teckens hexadecimala token. Den
autentiserade offentliga konsumenten är
`GET /api/v1/video-bridge/drilldown?handle=...`, och regleras separat av
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Ett explicit beständigt
false återkallar åtkomst även när den äldre
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED`-miljöreservlösningen är
aktiverad. Produktionslagring har den motsvarande äldre
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`-reservlösningen. Båda
reservlösningarna är avstängda som standard.

Konsumenten härleder ägarskap från den autentiserade nyckeln och tillämpar
nyckelpolicyn: både GET och DELETE tillhör endpointkategorin `video`, inklusive
aliasen `/v1` och `/api/v1`. Nycklar med en icke-tom endpoint-allowlist måste
inkludera `video`; obegränsade nycklar förblir kompatibla. Konsumenten returnerar
samma 404 för okända, utgångna och en annan nyckels handtag. Den accepterar
`variant=preview|standard|detail` (maximal JPEG-dimension 320/640/1280, aldrig
uppskalad), `limit=1..8` (eller det äldre aliaset `frames`, aldrig båda),
nollbaserad `page` och valfria fokustider i sekunder med `start`/`end`.
Duplicerade frågenycklar och omvända fokusintervall avvisas. Varje returnerad
variant har en hash av sitt faktiska innehåll och metadata för den faktiska
upplösningen, länkad till den kvarhållna källan. Varianter härleds vid läsning i
stället för att lagras som ytterligare kvarhållna kopior. JSON-svaret, inklusive
Base64/höljet, begränsas till 32 MiB; en överdimensionerad sida returnerar 413
och klienten måste begära färre bildrutor. Läsningar kontrollerar avbrytande runt
varje storleksändring och kontrollerar handtagets giltighet igen före retur.
`DELETE` från ägaren är idempotent; borttagning eller TTL-upphörande frigör den
kvarhållna källan och användningsredovisningen.

Det delade lagret är lokalt för processen: handtag upphör vid omstart och kan
inte överföras mellan oberoende OmniRoute-processer. Hanteringsstatistik
exponerar den effektiva lagrings-/fjärrpolicyn och aggregerade kvarhållna
poster/bytes endast, aldrig media, referenser, principal-ID:n eller handtag.
Panelen för Videoinställningar visar dessa värden och kan spara båda
samtyckesväxlarna. Denna implementeringsdokumentation utgör inte bevis för
driftsättning eller befordran; godkännande med verkliga modeller spåras
separat.

Bildrutor textas sekventiellt med den konfigurerade Video-modellen. En tom
Video-åsidosättning ärver Vision-inställningen; om båda är tomma väljer Vision
auto-routern den effektiva modellen med stöd för vision. Lyckade bildtexter
ersätter den ursprungliga delen med ett stabilt prefix `[Video description:`
som också markerar texten som en observation härledd från otillförlitliga medier
och instruerar efterföljande modeller att inte följa instruktioner som finns i
mediet. Cache-nycklar för bildtextning inkluderar JPEG-bytena, prompten,
tidsstämpeln och den effektiva modellen; endast lyckade bildtexter cachas.
Cacheposter behåller den faktiska modellen som producerade resultatet,
inklusive en reservmodell; bryggan rapporterar `mixed` när olika bildrutor
producerades av olika modeller. En cacheträff återanvänder den producerande
modellens identitet i stället för att märka om den som den begärda
routningsplanen. Hela videons resultatcache använder som nyckel varje indata
som ändrar resultatet — prompten, den effektiva modellen,
samplingsprincipen, antalet bildrutor, läget för semantisk analys, SHA-256-
fingeravtrycket för det normaliserade fokushintet, fokusfönstret, `transcript`,
`audioTranscript` och flaggan för kontaktark — så att en ändring av någon av
dessa dimensioner blir en cachemiss och aldrig en inaktuell återanvändning.
Versionen för visuell dedupliceringspolicy, tröskeln och det begränsade antalet
kandidatbildrutor är också uttryckliga i resultatcache-nyckeln och metadata;
en policyändring kan därför inte återanvända en inaktuell helvideobeskrivning.
Resultatcache-v4-metadata behåller läget och fingeravtrycket, aldrig den
råa användaruppgiften. Guardrail-metadata rapporterar både det begärda och det
effektiva analysläget; ett begärt `focused`-läge utan användbar användartext
rapporteras som effektivt `full`.

Guardrail-funktionen extraherar varje video-del som stöds men beskriver högst
`modalityBridgeVideoMaxVideos`. För ett mål som bevisligen har
`supportsVideo === false` blir misslyckade videor och videor över gränsen
uttryckliga säkra textmarkörer, så att ingen rå video överlever. När kapaciteten
är okänd behåller dessa delar sin videobärare; eventuell reservtranskription
följer den begränsade textkonverteringen ovan. Mål med
`supportsVideo === true` kringgår bryggan. Klientförfrågans abortsignal
propagerar genom nedladdning, brokerkön, underprocesser och bildtextanrop;
avbrott stoppar mellan videor och faller aldrig öppet tillbaka till råmedia.

Körningsinställningar lagras i databasen och valideras med Zod:

| Nyckel                              | Standardvärde | Intervall / beteende                                                                                              |
| ----------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`       | Valfri körning, opt-in                                                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` bevarar generiska bildtexter; `focused` använder begränsad, otillförlitlig kontext från senaste användaren |
| `modalityBridgeVideoModel`          | `""`          | Ärver Vision Bridge-modellen                                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                              |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware` eller proportionell `segment_aware`; detektorfel faller tillbaka till `uniform`          |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                               |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 ms                                                                                                    |

Äldre lagrade Video-timeoutvärden över 120 sekunder begränsas till
brokerdeadline; nya inställningsskrivningar över den gränsen avvisas.
`GET /api/modality-bridge/video/runtime` kräver betrodd, stämplad loopback-
lokalitet före autentisering eller körningskontroll och kräver därefter
hanteringsautentisering. Den returnerar endast `available`, sanerade
FFmpeg-/ffprobe-versioner och en fast orsak när körningen inte är tillgänglig.
Den interna extraktionsslutpunkten är inte ett offentligt uppladdnings-API:
kömättnad returnerar `503` samt `Retry-After`, frånkoppling från anroparen
returnerar `499`, och den fasta brokerdeadlinen returnerar `504`. Konverterade
svar lägger till `video->text;model=<visionModel>;parts=<videos>` i den centrala
`x-omniroute-modality-bridge`-headern utan att ta bort Vision- eller
Audio-segment.

### PII-maskerare (`piiMasker.ts`)

Körs i **båda** stegen.

- **`preCall`** klonar nyttolasten, går igenom `system`, `messages`, `input` och
  `prompt` (inklusive objekt med vanliga strängar) och tillämpar `processPII()`
  (från `@/shared/utils/inputSanitizer`) på strängfält för `content`/`text`. När
  `PII_REDACTION_ENABLED=true` maskeras upptäckta personuppgifter i den utgående
  nyttolasten. Detta är oberoende av `INPUT_SANITIZER_MODE` (som endast styr
  policyn mot promptinjektioner). När maskning är avstängd registrerar anropet
  detekteringsantal utan att skriva om innehållet.
- **`postCall`** djupklonar svaret, kör `sanitizePIIResponse()` samt maskeringen
  för Responses-API-formatet (`maskResponsesOutput` — omfattar
  `output_text` och `output[].content[].text`). Om någon maskning sker ersätter
  det ändrade svaret originalet.

Guardrail-funktionen blockerar aldrig; den annoterar endast
(`meta.detections`, `meta.redacted`) eller skriver om.

**Återställbart valv (`PII_REVERSIBLE_VAULT_ENABLED`, standardvärde `false`).** När både
`PII_REDACTION_ENABLED` och `PII_REVERSIBLE_VAULT_ENABLED` är aktiverade (DB-åsidosättning >
miljövariabel > standardvärde, läses en gång per begäran) öppnar `handleChat` ett valv per
klientbegäran (`src/lib/pii/requestTokenVaultScope.ts`) och skickar det till föranropssteget
som `GuardrailContext.tokenVault`. Maskeraren skriver då surrogattoken som
`<<PII_EMAIL_QWERTYUI_1>>` i stället för `[EMAIL_REDACTED]`, både för inbyggda, validerade
(GDPR/POPIA) och anpassade regler. Noncen består av 8 slumpmässiga versaler per begäran,
och samma värde får samma token under begäran. Endast maskeraren skapar token: skyddet mot
promptinjektion och `/api/guardrails/test` körs utan valv och behåller platshållarna.

- Providern, varje kombinationsdel, nytt försök, medlem i fusionspanelen och fusionsbedömaren
  ser endast token. Token återställs en gång, i 2xx-svaret som lämnar `handleChat`: per fält i
  den tolkade SSE:n (en token som delas upp över flera händelser löses fortfarande; argument
  till verktygsanrop JSON-escapas) eller per fält i en JSON-body, med omberäknad
  `Content-Length`. Innehålls- och resonemangstext samt argument till verktygsanrop återställs.
  Felkroppar (4xx/5xx) behåller token.
- Fel förblir privata: om skapandet misslyckas eller om valvet avvisar ett värde (1000 poster,
  256 tecken per värde, totalt 64 KB) skrivs platshållaren i stället; en token som valvet inte
  kan lösa, eller en återställning som misslyckas, förblir bokstavlig och endast ett antal
  loggas. Valvet innehåller inga timers och inget globalt tillstånd; det rensas när
  svarströmmen avslutas, avbryts eller får fel.
- När en begäran har skapat token hoppas minnesextraktion, idempotenslagringen och båda
  semantiska cache-skrivningarna över, eftersom ingen senare begäran skulle kunna lösa dessa
  token. I anropsloggar innehåller providerbegäran och providersvaret token; den loggade
  klientbegärans body är fortfarande den råa klientindatan, precis som vid vanlig maskering.
- Token använder en slumpmässig nonce per begäran, så promptprefixet ändras vid varje tur:
  promptcachelagring på providersidan träffas inte för maskerade turer, och en token som
  återkommer i en senare tur (till exempel via `previous_response_id`) tillhör en gammal
  begäran och förblir bokstavlig.

#### Val per typ, anpassade mönster och detekteringsräknare

**Instrumentpanel → Inställningar → Säkerhet → PII-maskering** väljer _vad_ som maskeras. Den
aktiverar inte maskering: det gör fortfarande `PII_REDACTION_ENABLED` (begäran) och
`PII_RESPONSE_SANITIZATION` (svar + SSE), båda inaktiverade som standard.

- **Val per typ** — de inbyggda id:na listas i
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Om värdet inte är angivet betyder
  det alla typer (beteendet innan denna inställning fanns). Begärande-motorns `ssn_us`-mönster
  mappas till `ssn`. Mallarna (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA,
  Full) fyller endast i kryssrutorna i användargränssnittet.
- **GDPR- och POPIA-identifierare** — tolv inbyggda id:n som täcker personliga identifierare
  från EU och Sydafrika (tabellen nedan). Deras reguljära uttryck, validerare och
  jurisdiktionstaggar finns i en tabell, `src/shared/utils/piiPatterns.ts`, som både
  svarssaneraren (`src/lib/piiSanitizer.ts`) och begärandemaskeraren
  (`src/shared/utils/inputSanitizer.ts`) använder. En träff maskeras endast när dess validerare
  godkänner den; en fristående följd av siffror räcker aldrig. En operatör som sparade ett
  begränsat urval innan dessa id:n fanns behåller det tidigare beteendet tills de nya id:n
  markeras.
- **Anpassade mönster** — upp till 20 regex- eller jokerteckenmönster (`*` = upp till 64
  tecken som inte är blanksteg, `?` = ett tecken). Träffar blir `[CUSTOM_REDACTED]`.
  Varje mönster går genom `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): högst 500 tecken, flaggor begränsade till
  `g i m s u`, måste kunna kompileras, måste klara `safe-regex` (katastrofal backtracking)
  och får inte matcha en tom sträng eller en redigeringsplatshållare. Ett mönster som
  misslyckas avvisas när det sparas och när det testas, och en lagrad rad som misslyckas
  hoppas över vid körning i stället för att kompileras. Anpassade mönster körs endast när
  maskering är aktiverad.
- **Detekteringsräknare** — antal per typ (aldrig matchade värden), lagras i minnet och
  återställs vid omstart (`src/lib/pii/piiDetectionStats.ts`). De ökar endast när maskering
  är aktiverad.

Inställningarna finns i tabellen `key_value` (namnrymden `pii_settings`,
`src/lib/db/piiSettings.ts`) och läses via en cache på 1 sekund. API:

| Metod  | Sökväg                   | Syfte                                                                 |
| ------ | ------------------------ | --------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flaggtillstånd, `enabledTypes`, `customPatterns`, detekteringsräknare |
| `PUT`  | `/api/settings/pii`      | Ersätt `enabledTypes` (`null` = alla) och/eller `customPatterns`      |
| `POST` | `/api/settings/pii/test` | Testkör ett mönster mot ett exempel på högst 8 KB; inget lagras       |

Alla tre kräver administratörsautentisering och validerar body:n med Zod
(`src/shared/validation/schemas/piiSettings.ts`). När inloggning är inaktiverad
(`requireLogin=false`) är `GET` och testendpointen öppna, men `PUT` kräver fortfarande en
instrumentpanelssession, en API-nyckel med `manage`-omfattning, en `oma_`-åtkomsttoken med
skrivbehörighet eller högre, eller CLI-token eller intern tjänstetoken som skickas från
loopback.

#### GDPR (EU)- och POPIA-identifierare (Sydafrika)

| Id                  | Identifier                            | Validation                                                                                        |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                                  | Känt land, exakt längd för landet, ISO 13616 MOD-97-10                                            |
| `eu_vat`            | EU-momsregistreringsnummer            | Känt prefix för medlemsstat och den statens nummerformat (ingen VIES-kontroll)                    |
| `es_dni_nie`        | Spanskt DNI / NIE                     | Kontrollbokstav (värde modulo 23); NIE är `X/Y/Z` + 7 siffror                                     |
| `it_codice_fiscale` | Italienskt Codice Fiscale             | Kontrollbokstav från tabellerna för udda/jämna positioner                                         |
| `pl_pesel`          | Polska PESEL                          | Viktad kontrollsumma och ett kodat födelsedatum som existerar                                     |
| `nl_bsn`            | Nederländskt BSN                      | 11-test (vikter 9..2, -1)                                                                         |
| `de_steuer_id`      | Tyskt Steuer-ID                       | ISO 7064 Mod 11,10 samt reglerna för sifferstruktur (ingen inledande 0)                           |
| `se_personnummer`   | Svenskt personnummer                  | Luhn över de tio sista siffrorna och ett rimligt födelsedatum (10 eller 12 siffror)               |
| `za_id`             | Sydafrikanskt ID-nummer               | Luhn över alla 13 siffror, giltig födelsemånad/-dag, medborgarskapssiffra 0 eller 1               |
| `za_phone`          | Sydafrikanskt telefonnummer           | Prefixet `+27` / `27`, eller den nationella formen `0..` skriven med mellanslag eller bindestreck |
| `za_vat`            | Sydafrikanskt momsregistreringsnummer | 10 siffror som börjar med `4` **och** "VAT" / "BTW" bland de 48 föregående tecknen                |
| `za_tax_ref`        | Sydafrikansk skattereferens           | 10 siffror som börjar med `0`-`3`, Luhn, **och** "tax" / "SARS" bland de 48 föregående tecknen    |

Eftersom de sifferbaserade formaten kolliderar med ordernummer, byggnummer och
tidsstämplar behöver de svagaste (`za_vat`, `za_tax_ref`) nyckelordssignalen, och
ett fristående tiosiffrigt `0..`-nummer behandlas inte som ett sydafrikanskt
telefonnummer. IBAN-nummer med mellanslag (`GB29 NWBK ...`) matchas inte. I
strömningssökvägen letas signalen endast upp i det aktuella segmentet. Id:n
ligger före de generiska telefonmönstren, så en validerad identifierare behåller
sin egen platshållare
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Mallarna
`gdpr` och `popia` väljer EU- respektive sydafrikanska id:n. Maskning är fortsatt
opt-in (hård regel #20): inget här ändrar standardvärdet för en funktionsflagga.

### Promptinjektion (`promptInjection.ts`)

Identifierar motstridiga strukturer i användarens innehåll och tillämpar den
konfigurerade policyn. Beteendet styrs av miljövariabler och
konstruktörsalternativ:

| Setting            | Env var                                                                                               | Default | Effect                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Aktiverad          | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | När `false` avslutas skyddsmekanismen direkt.                                                                                                                                                                |
| Läge               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Injektionspolicy: `block`, `warn` eller `log`. (`redact` accepteras för bakåtkompatibilitet men tar **inte** bort injektionstext; omskrivning av begärans personuppgifter styrs av `PII_REDACTION_ENABLED`.) |
| Blockeringströskel | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minsta allvarlighetsgrad som krävs för blockering. Medium observeras endast med standardinställningen.                                                                                                       |

**Prioritetsordning för läge** (`getMode`): anroparens `options.mode` →
`INJECTION_GUARD_MODE` **åsidosättning av DB-funktionsflagga** (Dashboard →
Settings → Feature Flags) → miljövariabeln `INJECTION_GUARD_MODE` →
miljövariabeln `INPUT_SANITIZER_MODE` → `warn`. En åsidosättning i dashboarden
har alltså företräde framför miljövariablerna, så gränssnittet för Feature
Flags styr det körande skyddet direkt (utan omstart). DB-läsningen är
felsäker: om den misslyckas återgår skyddet till det miljöbaserade beteendet,
och när ingen åsidosättning har angetts är beteendet identiskt med en lösning
som endast använder miljövariabler.

Detekteringskällor:

1. `sanitizeRequest()` från `@/shared/utils/inputSanitizer` (den gemensamma uppsättning detektorer
   som används på andra ställen i pipelinen).
2. Inbyggda `DEFAULT_GUARD_PATTERNS` (för närvarande `system_override_inline` och
   `markdown_system_block`, båda med allvarlighetsgraden `high`).
3. Valfria `customPatterns` som skickas via konstruktörsalternativ (strängar, reguljära uttryck
   eller poster av typen `{ name, pattern, severity }`).

När `mode === "block"` **och** minst en detektering uppnår tröskeln för
allvarlighetsgrad returnerar `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I lägena `warn`/`log` loggar skyddsmekanismen
händelsen men tillåter anropet. Den delade hjälpfunktionen
`evaluatePromptInjection()` exporteras också för anropare som behöver utvärdera
prompter utan att gå via registret.

**Skanningsgräns (v3.8.20):** detektorn inspekterar endast de **första 16 KB** av
den sammanfogade prompttexten — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` och
`evaluatePromptInjection()` kör `slice(0, MAX_INJECTION_SCAN_BYTES)` innan
mönsterslingan körs. Injektionsdirektiv finns nära början av en indata, så detta
begränsar regex-CPU/GC för nyttolaster på flera hundra KB utan att försvaga detekteringen (jfr.
#3932, #4041).

### Maskering av autentiseringsuppgifter (`credentialMasker.ts`)

Körs i **båda** stegen, sist i standardkedjan (prioritet `95`). Redigerar välkända mönster för API-nycklar/secret tokens från den utgående nyttolasten (meddelandeinnehåll, argument för verktygsanrop, verktygsresultat) **och** leverantörens svar, så att en autentiseringsuppgift som klistrats in i en prompt (eller ekats tillbaka av ett verktygsresultat) inte läcker till den uppströmsliggande leverantören eller tillbaka till klienten.

- **Endast uttryckligen aktiverad**, enligt samma konvention som PII-redigering (nära Hard Rule #20): inaktiverad om inte `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. När den är avstängd är skyddsräcket en no-op —
  det blockerar aldrig och skriver aldrig om.
- `redactCredentials()` går igenom hela trädet för nyttolasten/svaret (`walkValue()`),
  är säkert mot prototypförorening och cykelsäkert via `WeakSet`, och ersätter matchningar med en `[REDACTED:<type>]`-platshållare genom att endast klona de grenar som faktiskt ändrades.
- `CREDENTIAL_PATTERNS` omfattar nycklar för LLM-leverantörer (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-token (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalningsnycklar (Stripe, Square), molnnycklar
  (AWS access key, Twilio, SendGrid, Mailgun), privata nycklar/JWT:er,
  anslutningssträngar som innehåller autentiseringsuppgifter
  (`mongodb://user:pass@...`, etc.) samt ett generiskt mönster för header-värden för
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Headerformade nycklar (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redigeras strukturellt (endast värdet, med schemaprefix som
  `Bearer `/`Basic ` bevarat) i stället för via det generiska textregexet.
- Skyddsräcket blockerar aldrig; det skriver endast om (`modifiedPayload` /
  `modifiedResponse`) och annoterar (`meta.credentialsRedacted`, `meta.count`).

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

## Körningsordning

För varje begäran som går genom `src/sse/handlers/chat.ts` och
`open-sse/handlers/chatCore.ts` (de chattrelaterade routarna som listas under
[Täckning och begränsningar](#täckning-och-begränsningar)):

1. `resolveDisabledGuardrails(...)` bygger listan över guardrails som ska hoppas över, baserat på API-nyckel, body och headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kör guardrails i stigande prioritetsordning:
   - Inaktiverade guardrails registreras som `skipped`.
   - Varje guardrails `preCall` kan skriva om payloaden via `modifiedPayload`.
   - Den första `block: true` avbryter kedjan och handlern returnerar ett avvisningssvar från guardrail.
3. Den (eventuellt omskrivna) payloaden skickas vidare till komboroutning och upstream-dispatch.
4. **Endast för icke-strömmande svar:** när svaret har satts samman kör
   `guardrailRegistry.runPostCallHooks(...)` samma kedja på svaret. `block: true` här slänger upstream-svaret och returnerar HTTP 400. Strömmande svar hoppar helt över detta steg.
5. **Endast för reversibla vault:** när begäran skapade tokens återställer `handleChat` dem i det 2xx-svar som returneras, efter post-call-hookarna och den strömmande PII-transformeringen, så att `PII_RESPONSE_SANITIZATION` ser tokens och modellgenererad PII, men aldrig ett återställt original.

Guardrails som kastar ett fel registreras med `error: <message>` och loggas via
`logger.warn`, men kedjan fortsätter — fail-open enligt design.

## Täckning och begränsningar

Guardrail-registret är endast inkopplat i chattpipelinjen. Dessa begränsningar
fastställs av `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` och
`tests/unit/guardrail-pipeline-characterization.test.ts`; uppdatera dessa tester
medvetet när beteendet ändras.

### Var körs hookarna?

| Hook / kontroll                     | Körs på                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Förfrågningar som hanteras av `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (och `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` samt Telegrams chattproxy. Även testslutpunkten i dashboarden `/api/guardrails/test`. En blockering före anrop returnerar HTTP 400. |
| `runPostCallHooks`                  | Endast chatt svar utan streaming (**icke-strömmande**) (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Strömmade svar når den aldrig.                                                                                                                                                                                                                                                                                                     |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), som kopplas in i `streamingPipeline.ts` när `PII_RESPONSE_SANITIZATION` är aktiverad. Det är inte en guardrail, så inaktiveringskanalerna påverkar den inte.                                                                                                                                                                                                                        |
| Reversible PII vault                | Förfrågningar som hanteras av `handleChat`, endast när `PII_REDACTION_ENABLED` och `PII_REVERSIBLE_VAULT_ENABLED` är aktiverade. Token skapas av `pii-masker` före anropet och återställs när `handleChat` avslutas (`src/lib/pii/requestTokenVaultScope.ts`). Om `pii-masker` inaktiveras för en förfrågan skapas inga token.                                                                                                                    |
| Injection-guard middleware (legacy) | Alla `/v1`-rutter som innehåller promptar, inklusive chattfamiljen (se [täckning av rutter](#injection-guard-route-coverage--red-team-phase-8--block-d)). Endast promptinjektion.                                                                                                                                                                                                                                                                 |

### Vad täcks inte?

- **Media-, embeddings- och datarutter** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) når aldrig registret. Ingen
  PII-maskering, autentiseringsuppgiftsmaskering eller modalitetsbrygga körs där. Deras
  enda kontroll är det äldre middlewaret för injektionsskydd.
- **Strömmade svar** får inga guardrails efter anropet: ingen `pii-masker` eller
  `credential-masker` efter anropet och ingen blockering efter anropet. Endast
  PII-transformeringen för streaming tillämpas (när `PII_RESPONSE_SANITIZATION` är
  aktiverad). En autentiseringsuppgift som återges i ett strömmat svar maskeras inte.
- **Inaktiveringskanaler jämfört med middlewaret (avsiktligt):** middlewaret utvärderar
  promptinjektion med sitt eget anrop till `evaluatePromptInjection()`, utan att
  skicka med någon lista över inaktiveringar som styrs av anroparen. Läget `block` är
  en obligatorisk gräns som inaktiveringar styrda av anroparen inte kan kringgå, även för rutter i
  chattfamiljen ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Att inaktivera
  `prompt-injection` hoppar endast över guardrailen i registret.

### Vad ser ett svar före guardrails efter anropet?

På den icke-strömmande sökvägen är ordningen: minnesextrahering → inbyggd verktygskörning → guardrails efter anropet → avslut vid blockering efter anropet → lagring i semantisk cache.

- **Minnesextrahering** och **verktygskörning** ser svaret innan guardrails efter anropet
  kan skriva om eller blockera det. Sedan
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) kör
  minnesextraheringen den extraherade texten genom `sanitizePII` när
  `PII_RESPONSE_SANITIZATION` är aktiverad (både vid streaming och utan streaming), men
  ett svar som senare blockeras efter anropet har ändå redan erbjudits till minnet och
  verktygen.
- **Den semantiska cachen** lagrar svaret efter anropet, så den lagrar det omskrivna
  svaret, och ett blockerat svar cachas aldrig. Cacheposter är nycklade per API-nyckel.

## Konfiguration

Miljövariabler som läses av de inbyggda skyddsmekanismerna:

| Variabel                              | Används av                 | Effekt                                                                                                   |
| ------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Ange `false` för att inaktivera detektering helt.                                                        |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injektionspolicy: `warn`, `block` eller `log`. Det äldre värdet `redact` skriver inte om injektionstext. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Läge för injektionsskyddet; även en DB-funktionsflagga som **åsidosätter** miljövariablerna (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minsta allvarlighetsgrad som `MODE=block` avvisar: `high` (standard), `medium` eller `low`.              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Äldre alias för `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                       |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | När `true` maskeras PII i begäran (oberoende av injektionsläge).                                         |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Med `PII_REDACTION_ENABLED` skapas reversibla token och de återställs i 2xx-svar.                        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedströms)   | Styr maskerarbete på svarssidan.                                                                         |

Modality Bridge-skyddsmekanismerna läser runtime-konfiguration från den
DB-baserade inställningslagringen (`getSettings()`), inte från miljövariabler.
Visions primära nycklar är
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` och
`modalityBridgeCacheMaxEntries`. De äldre
`visionBridge*`-nycklarna accepteras endast som den dokumenterade
reservlösningen för läsning under en cykel; skrivningar från kontrollpanelen
använder de primära nycklarna. Standardvärdena och reservlösningen finns i
`src/shared/constants/modalityBridgeDefaults.ts`, medan äldre
konstanter finns kvar i `src/shared/constants/visionBridgeDefaults.ts`.

Audio använder `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` och `modalityBridgeAudioMaxClips`, samt de delade
`modalityBridgeCache*`-inställningarna. Audio har ingen reservlösning för äldre
nycklar eftersom dessa nycklar introducerades tillsammans med Modality Bridge-schemat.

Video använder `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` och
`modalityBridgeVideoTimeout`, samt de delade `modalityBridgeCache*`-inställningarna.
Det är inaktiverat som standard eftersom FFmpeg/ffprobe är valfria operativa
beroenden och bildtextning för videorutor medför extra fördröjning och
modellkostnad.

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
