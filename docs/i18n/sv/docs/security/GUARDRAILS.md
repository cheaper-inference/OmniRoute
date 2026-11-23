# Guardrails (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sanningskälla:** `src/lib/guardrails/`
> **Senast uppdaterad:** 2026-08-29 — v3.8.51 (Video Bridge-transkriptets ursprung deklareras av anroparen,
> ännu inte serververifierat — förtydligat enligt #11661)

Guardrails upprätthåller säkerhet, policy och innehållstransformationer vid gränsen
mellan OmniRoute och uppströmsleverantörer. Varje guardrail kan inspektera (och
valfritt avvisa, transformera eller kommentera) begärans nyttolaster (`preCall`) och
uppströms svar (`postCall`).

Systemet är **fail-open**: om en guardrail kastar ett fel under exekvering,
registrerar registret felet och fortsätter med nästa guardrail istället för att
misslyckas med begäran. Blockering är ett explicit beslut (`block: true`),
aldrig en olycka.

## Inbyggda skyddsmekanismer

Registret läser automatiskt in sex skyddsmekanismer i prioritetsordning vid import
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

### Bildbrygga (`visionBridge.ts`) — Modalitetsbrygga PR-1

Fångar upp förfrågningar som innehåller bilder och är riktade till **modeller utan bildstöd** och dirigerar antingen om hela förfrågan till en modell med bildstöd eller ersätter bilddelarna med textbeskrivningar som genereras av en konfigurerbar bildmodell före det uppströms anropet. Detta gör att leverantörer med enbart textstöd kan hantera multimodala nyttolaster transparent.

Flöde:

1. Hoppa över om målmodellen redan stöder bilder (såvida den inte finns i listan för tvingad bryggning `isVisionBridgeForcedModel`).
2. Extrahera bilddelar via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerar till den **enhetliga mediedetektorn**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den gemensamma
   sanningskällan som delas med kompatibilitetsfiltret för kombinationer.
   Extraktionen använder en tillåtelselista för delar på toppnivå med de former
   som `replaceImageParts` kan infoga igen (kontraktet extrahera↔ersätt): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic-URL
   `source.type:"url"` och Responses API `input_image`. Kapslade träffar och
   former som enbart fungerar som indikatorer är material för kombinationsfiltret
   och extraheras aldrig. Hoppa över om inga hittas.
3. Lös körningskonfigurationen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): de nya inställningsnycklarna
   `modalityBridge*` har företräde; äldre `visionBridge*`-nycklar finns kvar som
   en **reservlösning under en cykel** (återställningsfönster). Hoppa över före
   all genomgång av media när bryggan är inaktiverad.
4. Lägesväljaren (`modalityBridgeVisionMode`, se tabellen nedan) avgör mellan
   omdirigering och beskrivning. Omdirigering returnerar `modifiedPayload` där
   endast `model` har bytts ut, plus metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivningsväg: begränsa antalet bilder till `maxImages`, sammanställ den
   uppgiftsmedvetna prompten, kontrollera beskrivningscachen, anropa bildmodellen
   **parallellt** (`Promise.allSettled`) och infoga textdelar av formen
   `[Bild N]: <beskrivning>` i deras ställe. En misslyckad beskrivning ger
   `null` och den ursprungliga bilddelen **bevaras** (#4012) — utom på
   kombinationens beskrivningsväg när samtliga beskrivningar misslyckades, där
   en bekräftat bildinkapabel uppströmsmodell i stället får platshållaren
   `(inte tillgänglig — ingen leverantör med bildstöd är ansluten)` (#8430).
6. Returnera `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Lägesväljare (`modalityBridgeVisionMode`)

| Läge       | Standard | Beteende                                                                                                                                                                                                                                                                                                              |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Äldre heuristik, oförändrad (#6640/#7204): modeller som inte är kombinationer samt `auto/`-modeller omdirigeras till den bästa bildmodellen, såvida den ursprungliga modellen inte redan har användbara autentiseringsuppgifter (då beskrivs bilderna); kombinationsmål beskriver alltid.                             |
| `describe` |          | Beskriv alltid — omdirigeringsblocket hoppas över helt; användarens valda modell svarar alltid.                                                                                                                                                                                                                       |
| `reroute`  |          | Tvinga omdirigering: skyddet som behåller en modell med autentiseringsuppgifter kringgås. Autentiseringsskyddet för omdirigeringens **mål** gäller fortfarande — när inget användbart bildmål finns fortsätter förfrågan till beskrivningsvägen, så att råa bilder aldrig når en backend med enbart textstöd (#8430). |

Tvingade lägen kortsluter **innan** den automatiska heuristiken körs; beteendet
för `auto` är byte-identiskt med skyddsmekanismen före PR-1.

#### API-nyckelns omfattning (`visionBridgeKeyScope.ts`)

När anroparens API-nyckel begränsar `allowedConnections`, kvotpooler
(`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) väljer bryggan
endast omdirigerings- och beskrivningsmodeller som nyckeln får använda, på
anslutningar som nyckeln får använda. Beskrivningsanropet går därefter alltid
via OmniRoutes självslinga med headern `x-omniroute-self-loop-key-id`, så att
den mottagande chattförfrågan tillämpar nyckelns anslutnings- och modellpolicy
igen. `enforceApiKeyPolicy()` respekterar endast den headern tillsammans med
självslingans bearer-token, vilket innebär att den endast kan begränsa
åtkomsten, och ett id som inte kan slås upp avvisas.

Om ingen bildmodell är tillåten för nyckeln träder beskrivningsvägen åt sidan
och förfrågan passerar oförändrad, med samma felöppna beteende som en
inaktiverad skyddsmekanism (metadata `{ skipped: true, reason: "no_permitted_vision_model" }`).
Förfrågningar utan nyckel, och nycklar utan dessa begränsningar, beter sig
exakt som tidigare.

#### Uppgiftsmedveten beskrivningsprompt (`modalityBridgeVisionTaskAware`)

Standardvärdet är **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lägger till
texten från det **senaste användarmeddelandet** (avkortad till 500 tecken) i den
grundläggande beskrivningsprompten, vilket styr beskrivningen mot det som användaren
faktiskt frågade efter (codex-vision-proxy-mönstret) och ber visionmodellen att transkribera
synlig text. När flaggan är avstängd — eller om det saknas användartext — används
grundprompten oförändrad.

Beskrivningssjälvloopens egen OpenAI-kompatibla begäran (`callVisionModelSingle()`
i `visionBridgeHelpers.ts`) begär alltid `image_url.detail: "high"` —
ovillkorligen, för varje anropare/leverantör och utan att styras av någon signal från klienten.
Sampling med låg detaljnivå försämrar OCR-noggrannheten för just den
texttranskriberingsuppgift som denna prompt efterfrågar, så själva beskrivningsanropet begär
alltid hög detaljnivå oavsett vilken detaljnivå den ursprungliga inkommande begäran använde. Detta
påverkar endast den interna brödtexten i beskrivningsbegäran; det ändrar inte hur
OmniRoute vidarebefordrar anroparens egen `image_url.detail` i den primära begäran —
det standardvärdet tillämpas separat, och endast för identifierade OpenCode-klienter, i
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Grenen för
Anthropic-överföringsformatet i beskrivningssjälvloopen har inget `detail`-fält
och påverkas inte av något av standardvärdena.

#### Begränsning av beskrivningsutdata (`modalityBridgeVisionMaxChars`)

| Nyckel                         | Standardvärde | Intervall           |
| ------------------------------ | ------------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` eller 100–50000 |

`0` (standardvärdet) innebär **ingen begränsning** — beskrivningen som returneras av
`callVisionModel()` skickas vidare oförändrad, vilket bevarar det befintliga
beteendet. Alla värden i intervallet 100–50000 avkortar beskrivningen med
suffixet `…` innan den infogas som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Höj detta för detaljrika OCR-uppgifter där modellen längre ned i kedjan behöver den
fullständiga transkriberingen; sänk det för att begränsa tokenanvändningen hos pratsamma visionmodeller.
Instrumentpanelens fält finns i panelen Avancerat på fliken Vision
(`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) och justerar alla
värden mellan 1 och 99 upp till minimivärdet 100, samtidigt som ett uttryckligt `0`
lämnas orört — `0` är ett giltigt Zod-värde i sig
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), inte bara
standardvärdet för ”inte angivet”.

#### Beskrivningscache (`modalityBridge/bridgeCache.ts`)

Minnesbaserad LRU- och TTL-cache för beskrivningsutdata, gemensam för hela processen.
Nyckel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med
längdprefixinramning (inga kollisioner mellan fältgränser). Modellkomponenten är
den **konfigurerade** bryggmodellen, inte modellen som faktiskt svarade —
`callVisionModel` kan internt använda en reservmodell, och nycklar per försök skulle
fragmentera cachen. Misslyckade beskrivningar cachelagras aldrig. Inställningar:

| Nyckel                          | Standardvärde | Intervall |
| ------------------------------- | ------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`        | —         |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000   |

#### Normalisering av fjärrbilder (beskrivningssjälvloop/base64-hämtning)

När bryggan själv hämtar en **fjärrbild** — Anthropics beskrivningssjälvanrop
och base64-konverteringen för claude-överföringsformatet
(`ensureBase64ImagesForClaudeWire`), båda via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — skickas den resulterande
data-URI:n genom `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) innan den bäddas in i visionmodellens
begäran. För stora bilder skalas ned till en **långsida på 2048 px** (vilket motsvarar
den storleksgräns som OpenAI/Anthropic redan tillämpar på serversidan), vilket minskar
antalet uppladdade byte och latensen utan att ändra vad visionmodellen ser. Storleksändringen
använder `sharp`, som läses in via dynamisk import: på en plattform där dess systemspecifika
binärfil inte kan läsas in utlöser `normalizeDataUri()` **aldrig ett undantag** — funktionen
återgår till att skicka originalets byte oförändrade, så sökvägen för
beskrivning/base64-konvertering fortsätter alltid att fungera. Byte som inte representerar en bild
(en hämtning som inte returnerade en avkodningsbar bild) skickas också vidare oförändrade. Denna
normalisering är begränsad till bilder som bryggan hämtar för sitt eget självanrop — den
tillämpas aldrig på anroparens obearbetade vidarebefordringsnyttolast, i enlighet med
principen om att endast ändra efter aktivt val (Hård regel #20).

#### Inställningsschema + migrering

De nya `modalityBridge*`-nycklarna Zod-valideras i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trion `modalityBridgeCache*` och gruppen
`modalityBridgeAudio*` som används av ljudbryggan. Migreringen
`141_modality_bridge_settings.sql` kopierar befintliga äldre
`visionBridge*`-värden till motsvarande nya nycklar (idempotent och skriver aldrig över
ett `modalityBridge*`-värde som angetts av en operatör); de äldre nycklarna
fortsätter att godtas som reserv vid läsning under en versionscykel.

#### Transparenshuvud + statistik

Beskrivningstransformerade svar innehåller
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(skapat av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`,
tillagt av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omdirigerade begäranden får **inget** huvud — nyttolasten var oförändrad och modellbytet
är redan synligt i svarskroppens `model`-fält.

`GET /api/modality-bridge/stats` (hanteringsautentisering, samma nivå som
`GET /api/settings`) returnerar räknare per modalitet i minnet
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` för `vision`, `audio` och
`video`. `averageLatencyMs` använder `latencySamples`, inte alla försök, som
nämnare; en åtgärd utan tidsmätning skapar inte ett fabricerat exempel på noll
millisekunder. `bridged` förblir det bakåtkompatibla aliaset för lyckade
konverteringar; misslyckade försök ökar det inte.
Räknarna återställs avsiktligt när processen startas om
(telemetri, inte redovisning).

#### Konfiguration av kontrollpanelen

Den dedikerade sidan i kontrollpanelen är
`/dashboard/settings/modality-bridge`. Dess URL-adresserbara flikar `Vision`,
`Audio` och `Video` bevarar frågeparametrar när värdet för `tab` ändras.
Fliken Vision visar aktivering, läge, modellval (inklusive det automatiska
standardvalet), uppgiftsmedvetna instruktioner, avancerade gränser för
tidsgräns/bild/beskrivningslängd/cache, räknare vid körning och en skyddad
exempelbegäran. Fliken Audio är också aktiv: den visar aktivering, en
modellväljare enbart för STT med Auto, gränser för tidsgräns/maximal klipplängd,
ljudräknare och ett `input_audio`-exempeltest. Fliken Video är funktionell: den
rapporterar körningsstatusen för FFmpeg/ffprobe — ett av fyra uttryckliga
gränssnittstillstånd (`unknown` medan kontrollen pågår eller inte kunde
slutföras, `restricted` på en kontrollpanelsvärd som inte är en loopback-värd
och där kontrollen hoppas över på klientsidan, `unavailable` efter att en
kontroll har utförts och verktygen har bekräftats saknas, eller `available` med
versionerna av FFmpeg/ffprobe) — sparar gränser för aktivering/modell/bildruta/
video/tidsgräns, filtrerar modellväljaren till modeller med stöd för bildanalys
och visar videoräknare.

Det tidigare Vision Bridge-kortet under AI-inställningar är en
kompatibilitetslänk till den nya sidan; det innehåller inte längre en andra
kopia av formuläret. Media Providers länkar också arbetsflödena Image-to-Text
och Speech-to-Text till motsvarande Modality Bridge-flikar utan att ta bort
den befintliga Speech-to-Text-testmiljön.

**Förbikoppling av åtkomstkontroll för självloop:** när beskrivningsanropet
dirigeras via OmniRoutes egen `/v1`-självloop (modell från en leverantör som
inte är standard) skickar underbegäran
`x-omniroute-admission-bypass: internal` och autentiseras med den matchade
självloopautentiseringsuppgiften — den lokala platshållaren `sk_omniroute` i
lokalt läge eller miljönyckeln `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` som
operatören har konfigurerat (#1350), så att driftsättningar med
`REQUIRE_API_KEY=true` fortfarande kan köra beskrivningsanropet.
Förbikopplingen godtas endast för exakt dessa autentiseringsuppgifter, så
externa klienter kan inte använda huvudet för att hoppa över
åtkomstkontrollen.

Äldre standardvärden finns i `src/shared/constants/visionBridgeDefaults.ts`;
de nya standardvärdena för läge/uppgiftsmedvetenhet/cache och
inställningsmatcharen finns i
`src/shared/constants/modalityBridgeDefaults.ts`. Skyddsmekanismen exponerar
ett konstruktoralternativ `deps`, så att tester kan injicera falska
implementationer av `getSettings` och `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fångar upp chattbegäranden som innehåller ljud innan de når ett mål som inte
är känt för att godta ljudindata. Den dirigerar aldrig om chattbegäran:
ljuddelar transkriberas via den befintliga OpenAI-kompatibla
multipart-slutpunkten, och den valda chattmodellen fortsätter med
texttranskriptioner.

Flöde:

1. Matcha `supportsAudio` via `getResolvedModelCapabilities()`. Uttryckliga
   metadata i leverantörsregistret har företräde, följt av statiska
   modellmetadata och därefter synkroniserade `modalities_input`. En deklarerad
   indatalista utan `audio` är `false`; om belägg för kapaciteten saknas förblir
   värdet `null`. Både `false` och `null` aktiverar den försiktiga bryggan,
   medan `true` kringgår den.
2. Matcha inställningarna `modalityBridgeAudio*` och extrahera skarvbara
   ljuddelar på översta nivån från varje meddelande via den delade detektorn
   `detectMediaParts()`. De wire-format som stöds är OpenAI `input_audio`,
   `audio_url` och `source.media_type: "audio/*"`. Kapslat ljud identifieras
   för dirigering men tas inte bort av skarvningssökvägen. Arbetet begränsas
   av `modalityBridgeAudioMaxClips`; senare delar lämnas orörda.
3. Respektera en konfigurerad `provider/model`, eller låt
   `selectAudioBridgeModel()` gå igenom `AUDIO_TRANSCRIPTION_PROVIDERS` i
   stabil katalogordning och välja den första modellen med användbara, aktiva
   autentiseringsuppgifter för leverantören.
4. `callAudioTranscription()` konverterar base64-/data-URI-ljud till en
   multipart-`file`, eller hämtar en fjärrresurs från en `audio_url` genom det
   utgående skyddet som endast tillåter publika adresser, med DNS-fästning och
   en gräns på 25 MB. Därefter POST:ar den filen och den valda modellen till
   den lokala `/v1/audio/transcriptions`-självloopen, autentiserad med
   `resolveSelfLoopBearer()`. Den befintliga transkriptionsrutten utför normal
   sökning efter autentiseringsuppgifter, hantering av nedkylningsperioder/
   hastighetsgränser och leverantörsdispatch.
5. Lyckade anrop ersätter sina delar med `[Audio N]: <transcript>`. Anropen
   körs med `Promise.allSettled`: ett enskilt fel bevarar den ursprungliga
   ljuddelen (#4012-kontraktet). Om alla anrop misslyckas och målet bevisligen
   har `supportsAudio === false` blir delarna
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontraktet).
   För ett okänt mål (`null`) lämnas innehållet orört om alla anrop misslyckas.
   Ett bevisligen textbaserat mål utan användbara STT-autentiseringsuppgifter
   får samma uttryckliga platshållare utan att något nätverksanrop görs.

Lyckade transkriptioner använder Modality Bridges processomfattande
LRU-/TTL-cache. Nyckeln kombinerar ljudreferensen, den stabila åtgärdsetiketten
`audio-transcription` och den valda STT-modellen; fel cachelagras aldrig.
Ljudförsök uppdaterar de delade räknarna `bridged`, `cacheHits`, `failures` och
`lastUsedAt`. Transformerade svar innehåller
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
orörda begäranden får inget Audio Bridge-segment.

Körningsinställningarna lagras i databasen och valideras med Zod:

| Nyckel                        | Standardvärde | Intervall                |
| ----------------------------- | ------------- | ------------------------ |
| `modalityBridgeAudioEnabled`  | `true`        | —                        |
| `modalityBridgeAudioModel`    | `""`          | Automatiskt eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000              |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10                     |

Den delade cachen styrs fortfarande av `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` och `modalityBridgeCacheMaxEntries`.

### Videobrygga (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fångar upp videodelar på toppnivå i `messages` för Chat Completions och i
`input` för Responses API innan ett mål utan känt inbyggt videostöd anropas.
Former som stöds är `input_video`, `video_url`, `video_source`, HTTPS-URL:er
och data-URI:er av typen `data:video/*;base64,...`. Vanliga filnamn i text
behandlas inte som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ansvarar för traversering av
begäran, kontroll av kapacitet/policy, aggregering per begäran och
svarsnyttolasten. Arbetet per video – inhämtning, cachelagring av hela
resultatet, beskrivning av en bildrutesekvens (som sammanfogar eventuell
ljudtranskription som anroparen har angett) samt mätvärden/avbrott/resursrensning
per försök – döljs bakom `processVideoPart` i `videoBridgePipeline.ts`, som
anropas en gång per videodel inuti loopen i `preCall`. Den modulen definierar
också de explicita portgränserna `VideoMediaBrokerPort` (inhämtning av byte och
extrahering av samplade bildrutor), `VideoAudioTranscriptionPort`
(sammanfogning av en ljudtranskription som anroparen har angett med de samplade
bildtexterna) och `VideoDrilldownPort` (beständighetsgränsen för fördjupning på
bildrutenivå; ännu inte inkopplad i `processVideoPart` – i dag är det endast den
separata rutten `/api/modality-bridge/video/drilldown` som skriver
fördjupningsposter).

Den offentliga sökvägen `/v1` importerar eller anropar aldrig en underprocess.
Fjärrvideor laddas ned med en gräns på 50 MiB. Infogade base64-videor har ett
konservativt tak på 36 MiB avkodad data per video, så att
modell-/meddelande-/inramningshöljet kan rymmas inom den offentliga
JSON-gränsen på 50 MiB för att ta emot begäranden. Infogad längd och
uppskattad avkodad storlek kontrolleras före allokering. HTTPS krävs för den
ursprungliga fjärr-URL:en och varje omdirigering, med hjälp av det befintliga
utgående skyddet som endast tillåter offentliga mål och använder DNS-fästning.
Därefter passerar byten den exakta interna brokergränsen
`POST /api/modality-bridge/video/extract`. Den rutten är både `LOCAL_ONLY` och
`SPAWN_CAPABLE`, accepterar endast en autentiserad begäran per process via en
betrodd loopback-anslutning och accepterar aldrig en URL, filsökväg, körbar fil
eller argumentlista. API-pipelinen för brödtextstorlek och hanterarens
inkrementella brödtextläsare upprätthåller oberoende av varandra ett tak på
50 MiB för indata till brokern. Dess begränsade kö kör en extrahering åt gången,
tillåter fyra väntande jobb och begränsar väntande indata till 100 MiB.

Inuti brokern läser `ffprobe` en privat lokal fil. Den fasta listan över
tillåtna format utesluter spelliste- och manifestformat. För tillåtna
behållarformat i MOV-familjen förblir externa MOV-datareferenser inaktiverade
som standard, och det fasta kommandot aktiverar dem inte. Både `ffprobe` och
`ffmpeg` använder en protokollista som endast tillåter `file`, en tråd, fasta
argumentmatriser, inget skal och körbara filer som söks fram via `PATH`.
Omslagsströmmar med bifogade bilder är inte kandidater för uppspelning. Alla
uppspelningsbara strömmar måste uppfylla gränserna, och en explicit
standardström föredras före den deterministiska reservlösningen med lägst
index. Videor begränsas till 600 sekunder, 8 192 pixlar per dimension och
33 554 432 källpixlar. FFmpeg samplar 1–16 JPEG-bildrutor vid mittpunkter,
skalar ned den långa kanten till högst 1 024 pixlar utan att skala upp mindre
indata och tar aldrig emot en URL. Sampling är som standard `uniform`. De
valfria policyerna `scene_aware` och experimentella `segment_aware` utför
ytterligare en fast FFmpeg-passering över den redan validerade lokala strömmen,
väljer ett begränsat antal scentidsstämplar från `showinfo` och återgår
deterministiskt till samma likformiga mittpunkter om detektorn misslyckas,
tidsgränsen överskrids, utdata är felaktiga eller kandidatuppsättningen är tom.
Det segmentmedvetna läget fördelar mittpunktssamplingar proportionellt mellan
de validerade scenintervallen. Belägg för det segmentmedvetna läget och
reservbeteendet beskrivs närmare nedan. Det fasta taket på 16 bildrutor
tillämpas efter urvalet i varje policy. När en scenmedveten begäran endast har
en budget på en bildruta används den likformiga mittpunkten för det aktiva
helvideofönstret eller fokusfönstret, och `policyEffective: uniform` rapporteras:
en enda vald scenbildruta kan inte bevara båda tidsmässiga ändarna. En anropare
kan valfritt ange ett ändligt fokusfönster (`start`/`end` i sekunder). Gränserna
begränsas till mediets varaktighet, omvända eller icke-ändliga fönster avvisas
och alla samplingspolicyer tillämpas endast inom det normaliserade intervallet.
Det resulterande fönstret inkluderas i samplingsmetadata och i det ej betrodda
beskrivningsprefixet, så att efterföljande modeller kan skilja ett fokuserat
utdrag från hela tidslinjen.

Semantiskt bildtextsfokus är en separat, explicit inställning. Standardläget
`full` för analys bevarar den befintliga bildruteprompten och vidarebefordrar
aldrig begärandetext till bildtextmodellen. I läget `focused` läser bryggan
endast den senaste icke-tomma `text`/`input_text` som skapats av användaren från
samma Chat- eller Responses-behållare, normaliserar den till NFC, komprimerar
kontrolltecken och blanksteg samt begränsar den till 500 Unicode-kodpunkter.
Ett tomt resultat återgår till den exakta `full`-prompten. En användbar
ledtråd serialiseras som JSON i ett särskilt block för ej betrodd
användarkontext och får endast prioritera observerbara detaljer. Den kan inte
åsidosätta den separata varningen om att inte följa instruktioner som är
synliga eller hörbara i mediet. Textfokus härleder aldrig `start`/`end` och
ändrar inte den tidsmässiga samplaren.

#### FU-07 strukturella segmentbelägg

`segment_aware` använder en enda begränsad föranalyskörning av den redan validerade
lokala videoströmmen. Den fasta filterkedjan skalar först ned videon till högst
320 pixlars bredd, identifierar scenbyten och frysta intervall och samplar sedan
med 1 bildruta per sekund för oskärpa, genomsnittlig luminans samt spatial och
temporal information. Körningen är begränsad till 600 strukturella samplingar,
en FFmpeg-/filtertråd, samma tillåtelselistor för enbart `file`-protokollet och
behållare, en gräns på 1 MiB för processutdata samt högst 30 sekunder inom
mäklarens gemensamma avbrotts-/tidsfrist. Den tar aldrig emot ett kommando,
filter, en sökväg eller URL från begäran.

De strukturella värdena är deterministiska samplingsbelägg, inte semantisk
videoförståelse. De härleder inte motiv, handlingar, bildtexter, tal eller
användaravsikt. Scen- och frysningsgränser bildar segment; frysningstäckning,
oskärpa, exponering, spatial detaljrikedom och temporal förändring påverkar
endast hur den befintliga budgeten på 1–16 bildrutor fördelas. Ett helt fryst
segment begränsas till en bildruta, medan icke-frysta segment konkurrerar om
den återstående budgeten. När antalet gränser överstiger antalet bildrutor
bibehålls en jämn täckning av tidslinjen, så att snabba tidiga klipp inte kan
dölja ett långt avslutande segment. Scengränser inom föranalysens
1-sekundsupplösning från en frysningsgräns slås samman.

Saknade filter, felaktiga eller tomma belägg, ett detektorfel eller en
tidsgräns i den begränsade föranalysen återgår till exakt policyn med jämnt
fördelade mittpunkter. Ett avbrott från anroparen eller mäklarens tidsfrist
återgår inte: det avslutar den pågående underprocessen, förhindrar efterföljande
extrahering av bildrutor och det privata temporära trädet tas bort i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererar deterministiska verkliga
FFmpeg-fixturer för besparingar av bildtextanrop efter deduplicering,
budgetfördelning vid tät rörelse, belägg för oskärpa/exponering/SI-TI, snabba
klipp med en lång avslutning samt falska positiva resultat vid gradvisa
övertoningar. Det registrerar föranalysens väggklockstid och, där
`/usr/bin/time` är tillgängligt, den underordnade processens CPU-tid och högsta
RSS. Dess kvalitetskontroller är endast strukturella orakel. Kvaliteten hos
verkliga bildtextmodeller förblir `HOLD` eftersom denna testmiljö saknar en
auktoriserad slutpunkt eller en låst bedömare. Monetära besparingar förblir
också `HOLD` om inte `--caption-cost-per-call-usd` anger en uttrycklig positiv
kostnadsuppskattning per anrop; skriptet fabricerar aldrig något av resultaten.

Varje bildruta är begränsad till 4 MiB, alla råa bildrutor tillsammans till
23 MiB och det serialiserade mäklarsvaret till 32 MiB. En privat temporär
katalog tas bort i `finally`. OmniRoute inkluderar inte FFmpeg och accepterar
inte en anpassad sökväg till den körbara filen. Före bildtextgenereringen
tillämpar bryggan en konservativ visuell dedupliceringskörning: varje JPEG
reduceras till en gråskalebuffert på 16×16 och jämförs endast med den senast
bibehållna bildrutan. För en begärd bildtextbudget över en bildruta tillhandahåller
extraheringen en begränsad kandidatpool på upp till dubbla budgeten och aldrig
fler än 16 bildrutor. Det begärda taket tillämpas först efter dedupliceringen,
och den första och sista valda kandidaten bevaras under den slutliga uttunningen
när budgeten är minst två. Den versionshanterade policyn
`grayscale-16x16-mean-cells-v2` använder det större värdet av den genomsnittliga
luminansskillnaden och andelen miniatyrceller vars normaliserade skillnad är
minst 0.05. Dubblettgränsen är konstanten 0.04, vald för förutsägbarhet snarare
än exponerad som en körningsinställning. Denna sekundära signal med hög kontrast
bevarar små rörelser och ändringar i synlig text som en jämförelse enbart
baserad på medelvärdet kan dölja. Fel i jämförelsen eller avkodaren återgår och
bibehåller täckningen. Utdatametadata skiljer mellan extraherade kandidater,
bildrutor som använts framgångsrikt och borttagna visuella dubbletter.

En uttryckligen markerad videodel kan begära ett tidsstämplat kontaktark.
Bryggan skapar ett JPEG-rutnät med högst 4 kolumner och 16 bildrutor. Varje
cell på 512 pixlar bränner in källans tidsstämpel i ett bottenband med hög
kontrast, medan samma tidsstämplar finns kvar i textmetadata för efterföljande
associering och granskning. Den fullständiga JPEG-bilden förblir begränsad till
32 MiB. Om `sharp` inte kan avkoda eller komponera rutnätet återgår bryggan
till de enskilda JPEG-bildrutorna; ett klientavbrott vidarebefordras fortfarande
genom kontaktarksåtgärden.

Underlaget för lansering hålls avsiktligt åtskilt från det syntetiska
mikroprestandatestet för komposition. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definierar en schemaversionshanterad A/B-testmiljö för verkliga
OpenAI-kompatibla visionsmodeller. Den mäter leverantörsrapporterade token,
total väggklockslatens från början till slut (inklusive komposition av
kontaktarket), antal modellanrop och bevarande av fakta definierade i manifestet.
Råa modellsvar skrivs inte till rapporten; endast SHA-256-sammandrag och ID:n
för matchade fakta behålls. Testmiljön gör inga nätverksanrop eller anrop till
betalda modeller om inte `--execute-real` anges och `--model`,
`OMNIROUTE_BASE_URL` och `OMNIROUTE_API_KEY` har konfigurerats. Utan denna
uttryckliga verkliga körning förblir dess maskinläsbara omdöme `HOLD`;
syntetiska mätningar av nyttolast eller antal anrop utgör inte i sig underlag
för lansering.

Anropare kan bifoga en valfri `transcript.cues`-matris till en videodel som
stöds när de redan har tidsjusterad text. Varje markör måste innehålla `text`,
ett ändligt `start`-/`end`-intervall inom den kontrollerade varaktigheten och
en tillåten `source` (`client`, `embedded` eller `audio-bridge`); `confidence`
har standardvärdet `1` och måste ligga mellan `0` och `1`. Exakta dubbletter
av markörer slås samman. OmniRoute startar aldrig transkribering utifrån dessa
metadata: validerade markörer kopieras till det beskrivna resultatet med källa,
konfidens och intervall och återges som opålitliga observationer tillsammans
med bildtexterna. Ogiltig text, text utanför intervallet eller text utan
härkomst avvisas i stället för att blandas in i bildtextflödet. Båda
transkriptkanalerna i begärans brödtext normaliserar angiven härkomst till
`client`, inklusive självangivna etiketterna `embedded` eller `audio-bridge`.
Endast en serverägd adapter kan tilldela dessa betrodda etiketter via argumentet
`trustedSource` som endast är tillgängligt i kod; ett JSON-fält i begäran kan
inte nå det argumentet. Transkripttext förblir opålitligt innehåll som härletts
från media, oavsett dess härkomst, och får aldrig avgöra auktorisering.

En avancerad anropare kan tillhandahålla ett `audioTranscript`-spår för samma video;
det behandlas som text som tillhandahållits av klienten, inte som bevis på servertranskribering.
Fusionsskarven kör visuella observationer och ljudobservationer under
en gemensam tidsgräns och avbrottssignal, ordnar dem på en gemensam tidslinje, slår samman
exakta dubbletter och rapporterar ett partiellt resultat när endast den ena sidan lyckas.
Ett ogiltigt `audioTranscript` degraderas till detta partiella resultat — den visuella
beskrivningen behålls och ljudgrenen registrerar en sanerad felkod —
i stället för att hela videon misslyckas. Tillgänglighet per gren, flaggan för partiellt resultat
och de sanerade felkoderna bevaras i det beskrivna resultatet, i
skyddsräckesmetadata (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i resultatcachemetadata och i bryggans
fusionsräknare. Standardsökvägen för Video Bridge anropar inte tal-till-text
och hämtar inte en andra kopia av mediet; utan detta uttryckliga spår förblir den
enbart video.

**Bevarande av transkript (#12150 P1).** Detta gäller automatiskt när
Video Bridge (som i sig är valfri) renderar en transkriptmarkör — det finns ingen separat
bevarandeflagga. När en begäran renderar någon transkriptmarkör (ett av anroparen deklarerat
`transcript` eller ett fusionerat `audioTranscript`) markerar skyddsräcket den som
`videoBridgeObserved` och skapar en maskerad skuggkopia av videobeskrivningen —
en identisk rendering där varje markörs fritextinnehåll ersätts med
`[redacted-video-transcript]`, skapad genom att ersätta det strukturerade markörfältet
innan strängen sätts samman (aldrig genom att tolka den utplattade texten, så inget
markörinnehåll — fientligt eller ordinärt, inklusive innehåll med `]`, exempelvis
`[inaudible]`/`[music]` — kan finnas kvar). Den beständiga anropsloggens begärandekropp byter ut
varje videohärledd textdel mot denna maskerade skuggkopia, matchad genom
innehållslikhet; `fullText`-ankaret läses om från den färdiga skyddsräckesnyttolasten
före anropet, så matchningen lyckas fortfarande efter att senare skyddsräcken i kedjan
(maskerarna för personuppgifter och autentiseringsuppgifter, prioriteterna 10/95) skriver om
beskrivningstexten på plats och efter att systemprompt-/överlämnings-/minnesinjektion
omformar meddelandematrisen. Kroppen som skickas uppströms till modellen är oförändrad.
En observerad begäran fyller inte heller i något beständigt Memory (både begärande- och
svarshärledd extrahering hoppas över), så modellens eget svar kan inte återge
transkripttext i Memory.

**Råa videofält (#12430).** När bryggan är aktiverad och inbyggt videostöd är okänt eller saknas aktiverar definierade `transcript`-/`audioTranscript`-fält också `videoBridgeObserved`, även efter ett beskrivningsfel eller en `maxVideos`-gräns. `null` och tomma strängar räknas; frånvarande fält och metadata som inte gäller video gör det inte. Bevarade kopior maskerar dessa fält eller utelämnar begäran, och cacher/Memory förbikopplas.

På dessa reservvägar blir giltiga markörer som tillhandahållits av anroparen stödda `text`-/`input_text`-
delar i stället för icke-standardiserade leverantörsfält. Båda spåren som tillhandahålls i begäran
förblir ej betrodda `client`-observationer, med en uttrycklig varning om att videon
inte beskrevs och att tidsstämplarna inte verifierades mot mediet. De befintliga
budgetarna på 256 markörer/64 KiB totalt och per markör gäller för de två spåren tillsammans;
tidsstämplar måste rymmas inom mäklarens tak på 600 sekunder och ett eventuellt angivet fokusfönster.
Ogiltiga spår kasseras och vidarebefordras inte som godtycklig text; ett giltigt
syskonspår kan fortfarande användas om deras sammanlagda budget inte överskrids. Nullvärden/tomma
fält lägger inte till någon text. Ingen mediehämtning eller transkribering läggs till genom denna reservlösning.
Transkriptets utökningsfält tas bort från reservvideobehållaren och dess
`video_url`-/`source`-objekt. OpenAI:s tillåtelselista för dataöverföring förblir strikt; videobehållare
med okänt inbyggt stöd förblir tillgängliga och kända mål med endast text behåller säkra markörer.
Strukturerade maskeringsskuggor skyddar den tillagda transkripttexten, medan den
ursprungliga anroparägda begäran förblir oförändrad. Mål med inbyggt stöd och
inaktiverade bryggor behåller sitt befintliga förbikopplingsbeteende.

Ytterligare bevarade kopior använder samma signal för observerad begäran. Den råa
ögonblicksbilden av klientbegäran före skyddsräcket, den väntande begäran i minnet och loggen över tidigt
avvisade begäranden ersätter strukturellt transkriptfält i videodelar;
strängprompter som skapats av pipeline-steg och kontextöverlämning maskeras
vid mottagaren för den beständiga begärandekroppen. Den beständiga markören `video_content_removed`
gör att fortsättning med `previous_response_id` stängs säkert i stället för att rekonstruera
text som avsiktligt kasserats. Om en observerad begäran förlorar sin
maskeringsskugga per del före loggning, eller om ens en av flera videoskuggor
inte matchar efter senare mutationer av begäran, utelämnas den bevarade begärandekroppen
helt i stället för att bevara ett delvis maskerat transkript.

För en observerad begäran kan ett modellsvar citera valfri del av
transkriptet utan en strukturerad markörgräns. Dess beständiga anropsloggsfält
`responseBody` ersätts därför med en utelämningsmarkör; den detaljerade
pipeline-artefakten (som kan inkludera uppströms-/klientkroppar och strömningssegment)
bevaras inte. Semantiska cacher, idempotenscacher och cacher för resonemangsåterspelning förbikopplar
läsningar och skrivningar för den begäran. Leverantörsbegäran och det klientvisade
svaret förblir oförändrade. Tidiga keepalive-byte töms från den tillfälliga
bufferten när den detaljerade artefakten utelämnas. Kiros varning om felaktigt EventStream
rapporterar endast nyttolastens byteantal, aldrig dess innehåll eller JSON-
tolkens råa fel.
Detta gör inte anspråk på att alla orelaterade leverantörs-/plugin-diagnoser har
granskats; den bredare genomgången av beständiga mottagare spåras i #11658.

Den interna livscykeln för `/api/modality-bridge/video/drilldown` är ett separat,
loopback-/tokenautentiserat cacheunderlag. Varje åtgärd kräver dessutom ett
kanoniskt ogenomskinligt principal-ID. Innan en produktionsanropare aktiveras måste den
härleda detta ID från den autentiserade klientorganisationen och får aldrig vidarebefordra ett
värde som valts av klienten. Cachenycklar binder denna principal till kanoniska sessions- och
videoreferens-ID:n, lagrar endast deras SHA-256-härledda nycklar och avgränsar både läsningar
och borttagning till samma principal. Cachen lagrar högst 16 härledda JPEG-bildrutor
per post, låter dem upphöra efter tio minuter och stöder begränsade
`start`-/`end`-läsningar eller uttrycklig borttagning av sessioner.

Varje principal är begränsad till 16 poster och 64 MiB kanoniska JPEG-data. Dessa
gränser är oberoende av det globala taket på 64 poster/256 MiB: kvottryck för en
principal avlägsnar endast den principalens minst nyligen använda poster innan global
LRU-avlägsning övervägs. Utgångna poster rensas från både principalens och den
globala redovisningen vid cacheaktivitet, medan avbrytning och valideringsfel inte
verkställer en partiell ersättning.

Cachen avvisar icke-kanonisk Base64, överflödig utfyllnad, medier som inte är JPEG,
felaktiga eller trunkerade JPEG-filer samt JPEG-filer som genererar en varning under en
begränsad fullständig bildavkodning med `sharp`. Varje godkänd bild kodas om som en
kanonisk JPEG, bredd och höjd härleds från de avkodade bytevärdena i stället för att
fält från anroparen betros, och eventuella efterföljande polyglottbyte kasseras i stället
för att behållas. Endast den begränsade kanoniska komprimerade bufferten belastar båda
kvoterna. JSON-gränsen på ledningsnivå inkluderar Base64-overhead för taket på 32 MiB
för avkodade indata. Varje
lagrad härledning registrerar sitt validerade JPEG-format och sin upplösning, samplingspolicy,
härledningsversion, skapandetid, serverberäknade innehållshash och hashade överordnade
referens samt den betrodda anroparens innehållshash för den överordnade posten. Avbrytning
kontrolleras mellan asynkrona avkodnings-/hashfaser före den atomära cacheverkställningen.

Denna etapp ansluter ännu inte en produktionsproducent till rutten och tillhandahåller
inte val av varianter med flera upplösningar. Den transparenta sökvägen för Video
Bridge-begäranden medför därför inget ytterligare arbete, medan klientorganisationsbunden
principalhärledning och hela FU-08-livscykeln för flera upplösningar förblir uttryckligt
uppföljningsarbete i stället för att dokumenteras som ett fullständigt beteende.

Bildrutor textas sekventiellt med den konfigurerade Video-modellen. En tom
Video-åsidosättning ärver Vision-inställningen; om båda är tomma väljer Visions
autorouter den effektiva modellen med stöd för bildbehandling. Lyckade bildtexter
ersätter den ursprungliga delen med ett stabilt `[Video description:`-prefix som även
markerar texten som en ej betrodd, mediehärledd observation och instruerar nedströmsmodeller
att inte följa instruktioner som hittas i mediet. Cachenycklar för bildrutetexter
inkluderar JPEG-byte, prompt, tidsstämpel och effektiv modell; endast lyckade
bildtexter cachelagras. Cacheposter behåller den faktiskt framgångsrika producentmodellen,
inklusive en reservmodell; bryggan rapporterar `mixed` när olika bildrutor
producerades av olika modeller. En cacheträff återanvänder denna producentidentitet
i stället för att märka om den som den begärda routningsplanen. Resultatcachen
för hela videon nycklas på varje indata som ändrar utdata — prompt, effektiv
modell, samplingspolicy, antal bildrutor, semantiskt analysläge, SHA-256-
fingeravtrycket för den normaliserade fokusledtråden, fokusfönster, `transcript`,
`audioTranscript` och kontaktarksflaggan — så en ändring av någon av dessa
dimensioner är en cachemiss, aldrig en inaktuell återanvändning. Policyn för
visuell deduplicering, tröskelvärdet och det begränsade antalet kandidatbildrutor
anges också uttryckligen i resultatcachens nyckel och metadata; en policyändring
kan därför inte återanvända en inaktuell beskrivning av hela videon. Metadata för
resultatcache v4 behåller läget och fingeravtrycket, aldrig den råa användaruppgiften.
Skyddsräckesmetadata rapporterar både det begärda och det effektiva analysläget; ett
begärt `focused`-läge utan användbar användartext rapporteras som effektivt `full`.

Skyddsräcket extraherar varje videodel som stöds men beskriver inte fler än
`modalityBridgeVideoMaxVideos`. För ett mål som bevisligen har
`supportsVideo === false` omvandlas misslyckade videor och videor över gränsen till
uttryckliga säkra textmarkörer så att ingen rå video finns kvar. När kapaciteten är
okänd behåller dessa delar sin videobehållare; eventuell reservtranskription följer
den begränsade textkonverteringen ovan. Mål med `supportsVideo === true` kringgår
bryggan. Klientbegärans avbrottssignal sprids genom nedladdning, brokerkön,
underprocesser och bildtextanrop; avbrott stoppar mellan videor och återgår aldrig
öppet till råmedia.

Körtidsinställningar är DB-lagrade och Zod-validerade:

| Nyckel                              | Standardvärde | Intervall/beteende                                                                                                |
| ----------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`       | Valfri körning, aktivt val                                                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` bevarar generiska bildtexter; `focused` använder avgränsad, ej betrodd kontext från den senaste användaren |
| `modalityBridgeVideoModel`          | `""`          | Ärv Vision Bridge-modellen                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                              |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware` eller proportionell `segment_aware`; detektorfel faller tillbaka till `uniform`          |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                               |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 ms                                                                                                    |

Äldre beständigt lagrade tidsgränsvärden för Video över 120 sekunder begränsas till
mäklarens deadline; nya inställningsskrivningar över den gränsen avvisas.
`GET /api/modality-bridge/video/runtime` kräver betrodd, stämplad lokal
loopback-anslutning före autentisering eller körningskontroll och kräver därefter
hanteringsautentisering. Den returnerar endast `available`, sanerade FFmpeg/ffprobe-versioner och en fast
orsak när körningen inte är tillgänglig. Den interna extraheringsslutpunkten är inte
ett offentligt uppladdnings-API: mättnad i kön returnerar `503` plus `Retry-After`, en frånkoppling
från anroparen returnerar `499` och mäklarens fasta deadline returnerar `504`. Konverterade svar lägger till
`video->text;model=<visionModel>;parts=<videos>` i det centrala
`x-omniroute-modality-bridge`-huvudet utan att ta bort Vision- eller Audio-segment.

### PII-maskerare (`piiMasker.ts`)

Körs i **båda** stegen.

- **`preCall`** klonar nyttolasten, går igenom `system`, `messages`, `input` och
  `prompt` (inklusive objekt som är vanliga strängar) och tillämpar `processPII()` (från
  `@/shared/utils/inputSanitizer`) på strängfälten `content`/`text`. När
  `PII_REDACTION_ENABLED=true` maskeras identifierad PII i den utgående
  nyttolasten. Detta är oberoende av `INPUT_SANITIZER_MODE` (som endast styr
  policyn för promptinjektion). När maskering är avstängd registrerar anropet
  antalet detekteringar utan att skriva om innehållet.
- **`postCall`** djupklonar svaret, kör `sanitizePIIResponse()` samt
  maskeraren för Responses-API-formatet (`maskResponsesOutput` — omfattar
  `output_text` och `output[].content[].text`). Om någon maskering sker ersätter
  det ändrade svaret originalet.

Skyddsmekanismen blockerar aldrig; den kommenterar endast (`meta.detections`,
`meta.redacted`) eller skriver om.

#### Val per typ, anpassade mönster och detekteringsräknare

**Instrumentpanel → Inställningar → Säkerhet → PII-maskering** väljer _vad_ som maskeras. Det
aktiverar inte maskering: det styrs fortfarande av `PII_REDACTION_ENABLED` (begäran) och
`PII_RESPONSE_SANITIZATION` (svar + SSE), som båda är avstängda som standard.

- **Val per typ** — de inbyggda id:na finns listade i
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Om inget anges innebär det alla
  typer (beteendet innan den här inställningen fanns). Begärandemotorns
  `ssn_us`-mönster mappas till `ssn`. Mallar (Minimal, Standard, Financial,
  Brazilian, USA, Full) fyller endast i kryssrutorna i användargränssnittet.
- **Anpassade mönster** — upp till 20 regex- eller jokerteckenmönster (`*` = upp till 64
  tecken som inte är blanksteg, `?` = ett). Träffar blir `[CUSTOM_REDACTED]`.
  Varje mönster bearbetas av `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): högst 500 tecken, flaggor begränsade
  till `g i m s u`, måste kunna kompileras, måste klara `safe-regex` (katastrofal
  backtracking) och får inte matcha en tom sträng eller en maskeringsplatshållare.
  Ett mönster som inte godkänns avvisas när det sparas och när det testas, och en lagrad rad
  som inte godkänns hoppas över vid körning i stället för att kompileras. Anpassade mönster körs endast
  när maskering är aktiverad.
- **Detekteringsräknare** — antal per typ (aldrig matchade värden), lagrade i
  minnet och återställda vid omstart (`src/lib/pii/piiDetectionStats.ts`). De ökar endast
  när maskering är aktiverad.

Inställningarna finns i tabellen `key_value` (namnområde `pii_settings`,
`src/lib/db/piiSettings.ts`) och läses via en cache på 1 s. API:

| Metod  | Sökväg                   | Syfte                                                               |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flaggstatus, `enabledTypes`, `customPatterns`, detekteringsräknare  |
| `PUT`  | `/api/settings/pii`      | Ersätt `enabledTypes` (`null` = alla) och/eller `customPatterns`    |
| `POST` | `/api/settings/pii/test` | Testkör ett mönster mot ett exempel på högst 8 KB; ingenting lagras |

Alla tre kräver hanteringsautentisering och validerar brödtexten med Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Promptinjektion (`promptInjection.ts`)

Identifierar fientliga strukturer i innehåll som användaren tillhandahåller och tillämpar den
konfigurerade policyn. Beteendet styrs av miljövariabler och konstruktoralternativ:

| Inställning        | Miljövariabel                                                                                               | Standardvärde | Effekt                                                                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiverad          | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`        | När värdet är `false` kortsluts skyddsräcket.                                                                                                                                                             |
| Läge               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`        | Injektionspolicy: `block`, `warn` eller `log`. (`redact` godtas för bakåtkompatibilitet men tar **inte** bort injektionstext; omskrivning av personuppgifter i begäran styrs av `PII_REDACTION_ENABLED`.) |
| Blockeringströskel | Alternativet `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Lägsta allvarlighetsgrad som krävs för blockering. Medelhög grad är som standard endast avsedd för observation.                                                                                           |

**Lägesprioritet** (`getMode`): anroparens `options.mode` →
**åsidosättning via DB-funktionsflaggan** `INJECTION_GUARD_MODE` (Instrumentpanel → Inställningar →
Funktionsflaggor) → miljövariabeln `INJECTION_GUARD_MODE` → miljövariabeln `INPUT_SANITIZER_MODE` →
`warn`. En åsidosättning från instrumentpanelen har därför företräde framför miljövariablerna, så
gränssnittet för funktionsflaggor styr det aktiva skyddet direkt (ingen omstart krävs). DB-läsningen
är felsäker: om ett fel inträffar återgår skyddet till det miljövariabelbaserade beteendet, och när
ingen åsidosättning har angetts är beteendet identiskt med en lösning som enbart använder miljövariabler.

Detekteringskällor:

1. `sanitizeRequest()` från `@/shared/utils/inputSanitizer` (gemensam uppsättning
   detektorer som används på andra ställen i pipelinen).
2. Inbyggda `DEFAULT_GUARD_PATTERNS` (för närvarande `system_override_inline` och
   `markdown_system_block`, båda med allvarlighetsgraden `high`).
3. Valfria `customPatterns` som skickas via konstruktoralternativen (strängar,
   reguljära uttryck eller poster av typen `{ name, pattern, severity }`).

När `mode === "block"` **och** minst en detektering uppfyller tröskelvärdet för
allvarlighetsgrad returnerar `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I lägena `warn`/`log` loggar skyddsräcket men
tillåter anropet. Den gemensamma hjälpfunktionen `evaluatePromptInjection()` exporteras
också för anropare som behöver utvärdera promptar utan att gå via registret.

**Genomsökningsgräns (v3.8.20):** detektorn granskar endast de **första 16 kB** av
den sammanfogade prompttexten — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` och
`evaluatePromptInjection()` använder `slice(0, MAX_INJECTION_SCAN_BYTES)` innan
mönsterloopen körs. Injektionsdirektiv finns nära början av en inmatning, så detta
begränsar regexrelaterad CPU-/GC-belastning för nyttolaster på flera hundra kB utan
att försämra detekteringen (jfr #3932, #4041).

### Maskering av inloggningsuppgifter (`credentialMasker.ts`)

Körs i **båda** stegen, sist i standardkedjan (prioritet `95`). Maskerar
välkända mönster för API-nycklar/hemliga token från den utgående nyttolasten
(meddelandeinnehåll, argument för verktygsanrop, verktygsresultat) **och**
leverantörssvaret, så att en inloggningsuppgift som klistras in i en prompt
(eller ekas tillbaka av ett verktygsresultat) inte läcker till den överordnade
leverantören eller tillbaka till klienten.

- **Endast genom aktivt val**, enligt samma konvention som maskering av personuppgifter
  (i anslutning till strikt regel nr 20): inaktiverad om inte
  `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. När den är avstängd gör skyddsräcket ingenting —
  det blockerar aldrig och skriver aldrig om.
- `redactCredentials()` går igenom hela nyttolast-/svarsträdet (`walkValue()`,
  skyddad mot prototypförorening och cykelsäker via `WeakSet`) och ersätter träffar med
  platshållaren `[REDACTED:<type>]`, samtidigt som endast de grenar som faktiskt
  ändrats klonas.
- `CREDENTIAL_PATTERNS` omfattar nycklar för LLM-leverantörer (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-token (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalningsnycklar (Stripe, Square),
  molnnycklar (AWS-åtkomstnyckel, Twilio, SendGrid, Mailgun), privata nycklar/JWT:er,
  anslutningssträngar som innehåller inloggningsuppgifter (`mongodb://user:pass@...` osv.) samt
  ett generiskt mönster för rubrikvärdena `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Rubrikformade nycklar (`authorization`, `x-api-key`, `api-key`,
  `apikey`) maskeras strukturellt (endast värdet; schemaprefix som
  `Bearer `/`Basic ` bevaras) i stället för via det generiska textregexet.
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

En "guardrail" signalerar "ingen ändring" genom att returnera antingen `void`, `{}`, eller
`{ block: false }`. Att returnera en `modifiedPayload`/`modifiedResponse` ersätter
värdet som flödar genom kedjan för nedströms "guardrails".
`signal?: AbortSignal` överför anroparens livscykel till "guardrails". En avbruten begäran är det avsiktliga "fail-open"-undantaget: mediabryggor stoppar arbetet och rensar upp utan att återställa råmedia till ett mål som inte förväntas stödja det.

## Register (`registry.ts`)

Singleton-objektet `guardrailRegistry` exponerar:

- `register(guardrail)` — lägger till (eller ersätter med normaliserat namn) en "guardrail" och
  sorterar om efter stigande `priority`.
- `clear()` / `list()` — administrativa hjälpfunktioner.
- `runPreCallHooks(payload, context)` — itererar aktiva "guardrails", skickar
  "payload" genom `modifiedPayload`, och stoppar vid den första `block: true`.
- `runPostCallHooks(response, context)` — samma flöde på svarsidan.
- `resetGuardrailsForTests({ registerDefaults })` — rensar tillstånd och registrerar
  valfritt om standardinställningarna för ren testisolering.

Båda körarna returnerar `{ blocked, payload|response, results, guardrail?, message? }`
där `results` är en array av `GuardrailExecutionResult`-poster som inkluderar
`blocked`, `skipped`, `modified`, `error` och `meta`-fält per "guardrail",
användbara för spårning.

### Inaktivera Guardrails per Begäran

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggregerar en
avdubblerad lista över "guardrail"-namn som ska hoppas över för den aktuella
begäran. Källor (alla valfria, alla sammanfogade):

- `apiKeyInfo.disabledGuardrails`
- Begärans kropp `disabledGuardrails` (högsta nivån)
- Begärans kropp `metadata.disabledGuardrails`
- Rubrik `x-omniroute-disabled-guardrails` (eller äldre
  `x-disabled-guardrails`)

Värden kan vara arrayer av strängar eller en kommaavgränsad sträng; namn
normaliseras till gemener kebab-case (`pii_masker` → `pii-masker`). Resultatet
skickas via `context.disabledGuardrails` till registret, som hoppar över
matchande "guardrails" (`skipped: true` i `results`).

## Exekveringsordning

För varje förfrågan som flödar genom `src/sse/handlers/chat.ts` och
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` bygger hopplistan från API-nyckel, brödtext
    och rubriker.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` kör skyddsräcken i stigande
    prioritetsordning:
    - Inaktiverade skyddsräcken registreras som `skipped`.
    - Varje skyddsräckes `preCall` kan skriva om nyttolasten via `modifiedPayload`.
    - Den första `block: true` kortsluter kedjan och hanteraren returnerar
      ett avvisningssvar från skyddsräcket.
3.  Den (potentiellt omskrivna) nyttolasten flödar in i kombinationsdirigering och uppströms
    vidarebefordran.
4.  Efter att svaret har sammanställts kör `guardrailRegistry.runPostCallHooks(...)`
    samma kedja på svaret. `block: true` här släpper det uppströms
    svaret.

Skyddsräcken som kastar ett fel registreras med `error: <message>` och loggas via
`logger.warn`, men kedjan fortsätter – fail-open per design.

## Konfiguration

Miljövariabler som läses av de inbyggda skyddsräckena:

| Variabel                              | Används av               | Effekt                                                                                                   |
| :------------------------------------ | :----------------------- | :------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Sätt `false` för att helt inaktivera detektering.                                                        |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Injektionspolicy: `warn`, `block` eller `log`. Det äldre värdet `redact` skriver inte om injektionstext. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Läge för injektionsskyddet; även en DB-funktionsflagga som **åsidosätter** miljövariablerna (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Minsta allvarlighetsgrad som `MODE=block` avvisar: `high` (standard), `medium` eller `low`.              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Äldre alias för `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                       |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | När `true` redigeras PII i förfrågan (oberoende av injektionsläge).                                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedströms) | Styr maskeringsbeteendet på svarssidan.                                                                  |

Modality Bridge-skyddsräckena läser körningskonfiguration från den DB-stödda inställningsbutiken
(`getSettings()`), inte miljövariabler. Visions primära nycklar är
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` och
`modalityBridgeCacheMaxEntries`. De äldre
`visionBridge*`-nycklarna accepteras endast som den dokumenterade en-cykels läs-
fallbacken; instrumentpanelsskrivningar använder de primära nycklarna. Standardvärden och fallback-
upplösaren finns i `src/shared/constants/modalityBridgeDefaults.ts`, med äldre
konstanter bevarade i `src/shared/constants/visionBridgeDefaults.ts`.

Ljud använder `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` och `modalityBridgeAudioMaxClips`, plus de delade
`modalityBridgeCache*`-inställningarna. Ljud har ingen fallback för äldre nycklar eftersom dessa
nycklar introducerades med Modality Bridge-schemat.

Video använder `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` och
`modalityBridgeVideoTimeout`, plus de delade `modalityBridgeCache*`-inställningarna.
Det är inaktiverat som standard eftersom FFmpeg/ffprobe är valfria operativa
beroenden och bildtextning av ramar lägger till latens och modellkostnad.

## Anpassade Guardrails

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

1.  Skapa `src/lib/guardrails/myGuardrail.ts` som utökar `BaseGuardrail`.
2.  Implementera `preCall` och/eller `postCall`.
3.  Registrera antingen vid importtillfället (push från `registerDefaultGuardrails`) eller
    anropa `guardrailRegistry.register(...)` vid körning – registret ersätter
    alla tidigare guardrails med samma normaliserade namn.
4.  Lägg till tester under `tests/unit/` (befintliga exempel:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Testning

Använd `resetGuardrailsForTests()` mellan tester för att starta från ett känt tillstånd.
Skicka `{ registerDefaults: false }` för att starta med ett tomt register och
registrera endast de guardrails som testas. Vision Bridge accepterar beroendeinjektion
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge exponerar motsvarande
gränssnitt för inställningar, funktioner, STT-modellval, autentiseringskontroller och transkription.
Tester kan därför utföra båda flödena utan DB- eller nätverksåtkomst.

## Se även

- `src/lib/guardrails/` — implementering
- `src/shared/utils/inputSanitizer.ts` — delad detektor som driver
  prompt-injektion och PII-maskering
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge standardinställningar och
  lista över tvingade-bryggmodeller
- `src/shared/constants/modalityBridgeDefaults.ts` — delade Vision/Audio körningsstandardinställningar
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lager (strömbrytare, nedkylningstider)
- `docs/reference/ENVIRONMENT.md` — fullständig referens för miljövariabler

## Täckning av injektionsskyddsrutter & red-team (Fas 8 · Block D)

Injektionsskyddet (`createInjectionGuard` / `withInjectionGuard`) täcker alla rutter
som accepterar användarprompter. Det respekterar `INJECTION_GUARD_MODE` (standard `warn` = logga endast;
`block` = returnerar HTTP 400 `SECURITY_001`).

| Typ              | Rutter                                                                                                                                               | Standardläge |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| Text (befintlig) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | varna        |
| Generativ        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | varna        |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | varna        |

Textutvinning (`extractMessageContents`) täcker `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nattlig, `nightly-llm-security.yml`):** promptfoo validerar att varje rutt blockerar
OWASP-LLM-korpusen i `INJECTION_GUARD_MODE=block`; garak kör sonder (hoppar över utan hemlighet).
`moderations` inkluderas för konsekvens – operatörer i block-läge kan undanta den via
`resolveDisabledGuardrails`.

Det nattliga arbetsflödet (`.github/workflows/nightly-llm-security.yml`, cron + manuell
dispatch) har två jobb:

- **`promptfoo-guard` (blockerande)** – kör `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Varje fientligt fall (t.ex. "ignorera alla
  tidigare instruktioner...", DAN-liknande jailbreaks) bekräftar att svaret innehåller
  `error.code === "SECURITY_001"`, dvs. att skyddet faktiskt avvisade begäran.
- **`garak` (rådgivande)** – kör garak `--probes promptinject,dan,leakreplay`
  mot en lokal OmniRoute-instans (`http://localhost:20128/v1`). Begränsas av en
  leverantörshemlighet (`PROMPTFOO_PROVIDER_KEY`); hoppar över graciöst och är suffixerat
  `|| true`, så det rapporterar utan att CI misslyckas.

Täckningen av skyddshjälpen (`createInjectionGuard` / `withInjectionGuard`)
spänner över varje promptbärande `/v1`-rutt; prompttext hämtas från
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` av
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
