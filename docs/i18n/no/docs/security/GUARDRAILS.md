# Guardrails (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sannhetskilde:** `src/lib/guardrails/`
> **Sist oppdatert:** 2026-08-29 — v3.8.51 (opprinnelsen til Video Bridge-transkripsjoner oppgis av kalleren,
> og er ennå ikke verifisert av serveren — presisert i henhold til #11661)

Sikkerhetsmekanismer håndhever sikkerhet, retningslinjer og innholdstransformasjoner i grensesnittet
mellom OmniRoute og oppstrømsleverandører. Hver sikkerhetsmekanisme kan inspisere (og
eventuelt avvise, transformere eller annotere) forespørselsnyttelaster (`preCall`) og
oppstrømssvar (`postCall`).

Systemet er **fail-open**: Hvis en sikkerhetsmekanisme utløser et unntak under kjøring, registrerer
registeret feilen og fortsetter med neste sikkerhetsmekanisme i stedet for å la
forespørselen mislykkes. Blokkering er en eksplisitt beslutning (`block: true`), aldri et uhell.

## Innebygde sikkerhetsmekanismer

Registeret laster automatisk inn seks sikkerhetsmekanismer i prioritert rekkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Trinn          | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetstall kjøres **først**.

### Vision Bridge (`visionBridge.ts`) — Modalitetsbro PR-1

Fanger opp forespørsler som inneholder bilder og er rettet mot **modeller uten støtte for bilder**, og enten
omdirigerer hele forespørselen til en modell med støtte for bilder eller erstatter bildedelene
med tekstbeskrivelser generert av en konfigurerbar bildemodell før
oppstrømskallet. Dette gjør det mulig for leverandører som kun støtter tekst, å håndtere
multimodale nyttelaster transparent.

Flyt:

1. Hopp over hvis målmodellen allerede støtter bilder (med mindre den finnes i
   listen over modeller som alltid skal bruke broen, `isVisionBridgeForcedModel`).
2. Trekk ut bildedeler via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **samlede mediedetektoren**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den eneste autoritative
   kilden som deles med kompatibilitetsfilteret for kombinasjonsmodeller.
   Uttrekk er begrenset til toppelementer med formene som
   `replaceImageParts` kan sette inn igjen (kontrakten mellom uttrekk og
   erstatning): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`,
   Anthropic URL `source.type:"url"` og Responses API `input_image`. Nestede
   treff og former som kun fungerer som indikatorer, tilhører kombinasjonsfilteret
   og trekkes aldri ut. Hopp over hvis ingen blir funnet.
3. Løs opp kjøretidskonfigurasjonen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nye innstillingsnøkler
   med `modalityBridge*` har forrang; eldre nøkler med `visionBridge*` beholdes
   som en **reserveløsning i én syklus** (tilbakestillingsvindu). Hopp over før
   noen mediegjennomgang hvis broen er deaktivert.
4. Modusvelgeren (`modalityBridgeVisionMode`, se tabellen nedenfor) avgjør
   om forespørselen skal omdirigeres eller beskrives. Omdirigering returnerer
   `modifiedPayload`, der kun `model` er byttet ut, samt metadata
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsesflyt: Begrens bilder til `maxImages`, sett sammen den
   oppgavebevisste ledeteksten, slå opp i beskrivelsesbufferen, kall bildemodellen
   **parallelt** (`Promise.allSettled`), og sett inn tekstdeler på formen
   `[Bilde N]: <beskrivelse>` i stedet for dem. En mislykket beskrivelse gir
   `null`, og den opprinnelige bildedelen **beholdes** (#4012) — unntatt i
   kombinasjonsmodellens beskrivelsesflyt når alle beskrivelsene mislyktes.
   Da får en bekreftet oppstrømsmodell uten bildestøtte plassholderen
   `(utilgjengelig — ingen tilkoblet leverandør med bildestøtte)` i stedet (#8430).
6. Returner `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Modusvelger (`modalityBridgeVisionMode`)

| Modus      | Standard | Virkemåte                                                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eldre heuristikk, uendret (#6640/#7204): Modeller som ikke er kombinasjonsmodeller, samt `auto/`-modeller, omdirigeres til den beste bildemodellen med mindre den opprinnelige modellen allerede har brukbar legitimasjon (da brukes beskrivelse). Kombinasjonsmål bruker alltid beskrivelse.                                   |
| `describe` |          | Beskriv alltid — omdirigeringsblokken hoppes fullstendig over; modellen brukeren valgte, svarer alltid.                                                                                                                                                                                                                         |
| `reroute`  |          | Tving omdirigering: Kontrollmekanismen som beholder modellen med legitimasjon, omgås. Legitimasjonskontrollen for omdirigerings**målet** gjelder fortsatt — når det ikke finnes noe brukbart mål med bildestøtte, går forespørselen videre til beskrivelse, slik at råbilder aldri når en bakdel som kun støtter tekst (#8430). |

Tvungne moduser kortslutter **før** den automatiske heuristikken kjøres. Virkemåten
til `auto` er byte-identisk med sikkerhetsmekanismen før PR-1.

#### API-nøkkelomfang (`visionBridgeKeyScope.ts`)

Når API-nøkkelen til den som kaller, begrenser `allowedConnections`, kvotepuljer
(`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), velger broen bare
omdirigerings- og beskrivelsesmodeller som nøkkelen kan bruke, på tilkoblinger
som nøkkelen kan bruke. Beskrivelseskallet går deretter alltid gjennom
OmniRoute-selvsløyfen med `x-omniroute-self-loop-key-id`-hodet, slik at den
mottakende chatforespørselen håndhever nøkkelens tilkoblings- og modellpolicy
på nytt. `enforceApiKeyPolicy()` respekterer bare dette hodet sammen med
selvsløyfens bearer-token, slik at det bare kan begrense tilgangen, og en
ID som ikke kan slås opp, blir avvist.

Hvis ingen bildemodell er tillatt for nøkkelen, trer beskrivelsesflyten til side,
og forespørselen sendes videre uendret, med samme feilåpne virkemåte som en
deaktivert sikkerhetsmekanisme (metadata
`{ skipped: true, reason: "no_permitted_vision_model" }`).
Forespørsler uten nøkkel og nøkler uten disse begrensningene fungerer nøyaktig
som før.

#### Oppgavebevisst beskrivelsesledetekst (`modalityBridgeVisionTaskAware`)

Standardverdi **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) legger til
teksten fra den **siste brukermeldingen** (avkortet til 500 tegn) i den
grunnleggende beskrivelsesledeteksten, slik at beskrivelsen styres mot det brukeren faktisk spurte om
(codex-vision-proxy-mønsteret), og ber synsmodellen om å transkribere synlig
tekst. Når flagget er slått av — eller det ikke finnes noen brukertekst — brukes den grunnleggende ledeteksten uendret.

Beskrivelsens egen selvsløyfes OpenAI-kompatible forespørsel (`callVisionModelSingle()`
i `visionBridgeHelpers.ts`) ber alltid om `image_url.detail: "high"` —
ubetinget, for alle kallere/leverandører, og ikke styrt av noe klientsignal.
Sampling med lav detaljgrad reduserer OCR-nøyaktigheten for nettopp
teksttranskriberingsoppgaven denne ledeteksten ber om, så selve beskrivelseskallet ber alltid om høy
detaljgrad uavhengig av hvilket detaljnivå den opprinnelige innkommende forespørselen brukte. Dette
påvirker bare forespørselskroppen for den interne beskrivelsen. Det endrer ikke hvordan
OmniRoute videresender kallerens egen `image_url.detail` i den primære forespørselen —
denne standardverdien brukes separat, og bare for registrerte OpenCode-klienter, i
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Anthropic-grenen med wire-format i beskrivelsens selvsløyfe har ikke noe `detail`-felt
og påvirkes ikke av noen av standardverdiene.

#### Grense for beskrivelsesutdata (`modalityBridgeVisionMaxChars`)

| Nøkkel                         | Standardverdi | Område              |
| ------------------------------ | ------------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` eller 100–50000 |

`0` (standardverdien) betyr **ingen grense** — beskrivelsen som returneres av
`callVisionModel()`, sendes videre uendret, slik at eksisterende
virkemåte bevares. Enhver verdi i området 100–50000 avkorter beskrivelsen med
suffikset `…` før den settes inn igjen som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Øk denne for detaljrike OCR-oppgaver der modellen nedstrøms trenger hele
transkripsjonen. Reduser den for å begrense tokenbruken fra pratsomme synsmodeller.
Feltet i kontrollpanelet ligger i Avansert-panelet på Vision-fanen
(`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) og justerer enhver
verdi mellom 1 og 99 opp til minimumsverdien 100, samtidig som en eksplisitt `0`
forblir urørt — `0` er en gyldig Zod-verdi i seg selv
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke bare
standardverdien for «ikke angitt».

#### Beskrivelsesbuffer (`modalityBridge/bridgeCache.ts`)

LRU- og TTL-buffer i minnet for beskrivelsesutdata, delt på tvers av hele prosessen.
Nøkkel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med
lengdeprefiksinnramming (ingen kollisjoner mellom feltgrenser). Modellkomponenten er
den **konfigurerte** bromodellen, ikke modellen som faktisk svarte —
`callVisionModel` kan bruke en intern reservemodell, og nøkkelgenerering per forsøk ville
fragmentert bufferen. Mislykkede beskrivelser bufres aldri. Innstillinger:

| Nøkkel                          | Standardverdi | Område  |
| ------------------------------- | ------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`        | —       |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000 |

#### Normalisering av eksterne bilder (selvsløyfebeskrivelse/base64-henting)

Når broen selv henter et **eksternt** bilde — Anthropics beskrivende
selvkall og base64-konverteringen for claude-wire-format
(`ensureBase64ImagesForClaudeWire`), begge via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — sendes den resulterende data-URI-en
gjennom `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) før den bygges inn i forespørselen til synsmodellen.
For store bilder skaleres ned til en **langside på 2048 piksler** (tilsvarende
grensen for størrelsesendring som OpenAI/Anthropic allerede bruker på serversiden), noe som reduserer
opplastingsmengde/ventetid uten å endre hva synsmodellen ser. Størrelsesendringen
bruker `sharp`, lastet via dynamisk import: På en plattform der den innebygde
binærfilen ikke kan lastes, kaster `normalizeDataUri()` **aldri et unntak** — den faller tilbake
til å sende de opprinnelige bytene uendret, slik at banen for beskrivelse/base64-konvertering
alltid fortsetter å fungere. Data som ikke er et bilde (en henting som ikke returnerte et
dekodbart bilde), sendes også videre uendret. Denne normaliseringen
er avgrenset til bilder broen henter til sitt eget selvkall — den brukes aldri
på kallerens rå nyttelast som sendes videre, i samsvar med prinsippet om
kun eksplisitt valgte endringer (ufravikelig regel nr. 20).

#### Innstillingsskjema + migrering

De nye `modalityBridge*`-nøklene Zod-valideres i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-trioen og
`modalityBridgeAudio*`-gruppen som brukes av Audio Bridge. Migreringen
`141_modality_bridge_settings.sql` kopierer eksisterende eldre
`visionBridge*`-verdier til de tilsvarende nye nøklene (idempotent, overskriver aldri
en `modalityBridge*`-verdi angitt av en operatør). De eldre nøklene forblir godkjent som
reservelesing i én utgivelsessyklus.

#### Transparenshode + statistikk

Svar som er transformert av beskrivelsesfunksjonen, inneholder
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(bygget av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`,
påført av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omdirigerte forespørsler får **ikke** noe hode — nyttelasten var uendret, og modellbyttet
er allerede synlig i `model`-feltet i responskroppen.

`GET /api/modality-bridge/stats` (administrasjonsautentisering, samme nivå som
`GET /api/settings`) returnerer minnetellere per modalitet
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og
`video`. `averageLatencyMs` bruker `latencySamples`, ikke alle forsøk, som
nevner; en operasjon uten tidsmåling oppretter ikke kunstig et utvalg på null
millisekunder. `bridged` forblir det bakoverkompatible aliaset for vellykkede
konverteringer; mislykkede forsøk øker det ikke.
Tellerne tilbakestilles ved omstart av prosessen med hensikt
(telemetri, ikke regnskapsføring).

#### Konfigurasjon av kontrollpanelet

Den dedikerte kontrollpanelsiden er
`/dashboard/settings/modality-bridge`. Dens URL-adresserbare faner `Vision`, `Audio`
og `Video` bevarer spørringsparametere når `tab`-verdien endres.
Vision-fanen viser aktivering, modus, modellvalg (inkludert den automatiske
standarden), oppgavebevisst prompting, avanserte grenser for tidsavbrudd/bilde/beskrivelseslengde/hurtigbuffer,
kjøretidstellere og en beskyttet eksempelforespørsel. Audio-fanen er også aktiv: den viser
aktivering, en modellvelger kun for STT med Auto, grenser for tidsavbrudd/maksimal klipplengde, lydtellere
og en `input_audio`-eksempeltest. Video-fanen er funksjonell: den rapporterer
kjøretidstilstanden for FFmpeg/ffprobe — én av fire eksplisitte UI-tilstander (`unknown` mens
kontrollen pågår eller ikke kunne fullføres, `restricted` på en kontrollpanelvert uten tilbakekobling
der kontrollen hoppes over på klientsiden, `unavailable` etter at kontrollen er utført
og manglende tilgjengelighet er bekreftet, eller `available` med FFmpeg/ffprobe-versjonene) — lagrer
grenser for aktivering/modell/bilder/video/tidsavbrudd, filtrerer modellvelgeren til modeller
med støtte for visjon og viser videotellere.

Det tidligere Vision Bridge-kortet under AI-innstillinger er en kompatibilitetslenke til den
nye siden; det har ikke lenger en egen kopi av skjemaet. Media Providers
kobler også arbeidsflytene Image-to-Text og Speech-to-Text til de tilsvarende Modality
Bridge-fanene uten å fjerne den eksisterende Speech-to-Text-lekeplassen.

**Omgåelse av self-loop-adgangskontroll:** Når describe-kallet rutes gjennom OmniRoutes
egen `/v1`-self-loop (leverandørmodell som ikke er standard), sender underforespørselen
`x-omniroute-admission-bypass: internal` og autentiseres med den fastslåtte
self-loop-legitimasjonen — den lokale `sk_omniroute`-sentinelen i lokal modus, eller den
operatørkonfigurerte miljønøkkelen `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), slik at
distribusjoner med `REQUIRE_API_KEY=true` fortsatt kan kjøre describe-kallet. Omgåelsen
godtas bare for akkurat disse legitimasjonene, slik at eksterne klienter ikke kan bruke
headeren til å hoppe over adgangskontrollen.

Eldre standardverdier ligger i `src/shared/constants/visionBridgeDefaults.ts`; de
nye standardverdiene for modus/oppgavebevissthet/hurtigbuffer og innstillingsløseren ligger i
`src/shared/constants/modalityBridgeDefaults.ts`. Sikringsmekanismen tilbyr et
`deps`-konstruktørvalg, slik at tester kan injisere falske implementasjoner av `getSettings` og
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fanger opp chatforespørsler som inneholder lyd, før de når et mål som ikke er
kjent for å godta lydinndata. Den omdirigerer aldri chatforespørselen: lyddeler
transkriberes gjennom det eksisterende OpenAI-kompatible multipart-endepunktet, og den
valgte chatmodellen fortsetter med teksttranskripsjoner.

Flyt:

1. Fastslå `supportsAudio` gjennom `getResolvedModelCapabilities()`. Eksplisitte
   metadata fra leverandørregisteret har prioritet, deretter statiske modellmetadata og så synkroniserte
   `modalities_input`. En deklarert inndataliste uten `audio` er `false`; hvis det ikke finnes
   noen indikasjon på egenskapen, forblir verdien `null`. Både `false` og `null` aktiverer den
   konservative broen, mens `true` omgår den.
2. Fastslå `modalityBridgeAudio*`-innstillingene og trekk ut utskiftbare lyddeler på toppnivå
   fra hver melding gjennom den delte `detectMediaParts()`-detektoren.
   Støttede overføringsformater er OpenAI `input_audio`, `audio_url` og
   `source.media_type: "audio/*"`. Nøstet lyd oppdages for ruting, men fjernes ikke
   av utskiftingsbanen. Arbeidsmengden begrenses av `modalityBridgeAudioMaxClips`;
   senere deler forblir urørt.
3. Bruk en konfigurert `provider/model`, eller la `selectAudioBridgeModel()` gå gjennom
   `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrekkefølge og velge den første
   modellen med brukbar, aktiv leverandørlegitimasjon.
4. `callAudioTranscription()` konverterer base64-/data-URI-lyd til en multipart-
   `file`, eller laster ned en ekstern `audio_url` gjennom den offentlige utgående
   beskyttelsen med DNS-festing og en grense på 25 MB. Deretter POST-er den filen og den valgte
   modellen til den lokale `/v1/audio/transcriptions`-self-loopen, autentisert med
   `resolveSelfLoopBearer()`. Den eksisterende transkripsjonsruten utfører normalt
   legitimasjonsoppslag, håndtering av nedkjøling/frekvensbegrensning og leverandørdistribusjon.
5. Vellykkede kall erstatter delene sine med `[Audio N]: <transcript>`. Kallene
   kjøres med `Promise.allSettled`: én enkelt feil bevarer den opprinnelige
   lyddelen (#4012-kontrakten). Hvis alle kall mislykkes og målet beviselig har
   `supportsAudio === false`, blir delene
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakten). For
   et ukjent mål (`null`) forblir innholdet urørt dersom alle kall mislykkes. Et beviselig
   mål som bare støtter tekst, og som ikke har brukbar STT-legitimasjon, mottar den samme eksplisitte
   plassholderen uten at det utføres et nettverkskall.

Vellykkede transkripsjoner bruker den prosessomfattende LRU/TTL-hurtigbufferen for Modality Bridge. Nøkkelen
kombinerer lydreferansen, den stabile operasjonsetiketten `audio-transcription`
og den valgte STT-modellen; feil hurtigbufres aldri. Lydforsøk oppdaterer de delte
tellerne `bridged`, `cacheHits`, `failures` og `lastUsedAt`.
Transformerte svar inneholder
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; urørte
forespørsler mottar ikke et Audio Bridge-segment.

Kjøretidsinnstillingene er DB-støttede og Zod-validerte:

| Nøkkel                        | Standardverdi | Område                  |
| ----------------------------- | ------------- | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —                       |
| `modalityBridgeAudioModel`    | `""`          | Automatisk eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10                    |

Den delte hurtigbufferen styres fortsatt av `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Videobro (`videoBridge.ts`, `videoBridgePipeline.ts`)

Avskjærer videodeler på toppnivå i Chat Completions-`messages` og Responses
API-`input` før et mål uten kjent innebygd videostøtte kalles.
Støttede formater er `input_video`, `video_url`, `video_source`, HTTPS-URL-er
og `data:video/*;base64,...`-data-URI-er. Vanlige filnavn i tekst behandles ikke
som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) håndterer gjennomgang av
forespørselen, kapabilitets-/policykontrollen, aggregering per forespørsel og
responsnyttelasten. Arbeid per video – innhenting, hurtigbufring av hele
resultatet, beskrivelse av en bildesekvens (som slår sammen eventuelle
lydtranskripsjoner angitt av anroperen) samt målinger/avbrudd/opprydding per
forsøk – er skjult bak `processVideoPart` i `videoBridgePipeline.ts`, som kalles
én gang per videodel i løkken til `preCall`. Denne modulen definerer også de
eksplisitte portgrensene `VideoMediaBrokerPort` (innhenting av byte og uttrekking
av utvalgte bilder), `VideoAudioTranscriptionPort` (sammenslåing av en
lydtranskripsjon angitt av anroperen med de utvalgte bildetekstene) og
`VideoDrilldownPort` (persistensgrensen for detaljanalyse av bilder; ennå ikke
koblet til `processVideoPart` – i dag er det bare den separate ruten
`/api/modality-bridge/video/drilldown` som skriver detaljanalyseoppføringer).

Den offentlige `/v1`-forespørselsbanen importerer eller starter aldri en
underprosess. Eksterne videoer lastes ned med en grense på 50 MiB; innebygde
base64-videoer har en konservativ grense på 36 MiB dekodet per video, slik at
konvolutten for modell/meldinger/innramming kan holde seg innenfor
opptaksgrensen på 50 MiB for offentlige JSON-forespørsler. Innebygd lengde og
estimater for dekodet størrelse kontrolleres før minnetildeling. HTTPS kreves
for den opprinnelige eksterne URL-en og hver omdirigering, ved bruk av det
eksisterende vernet for kun offentlig utgående trafikk med DNS-festing.
Byteinnholdet krysser deretter den nøyaktige interne grensen til
`POST /api/modality-bridge/video/extract`-megleren. Denne ruten er både
`LOCAL_ONLY` og `SPAWN_CAPABLE`, godtar bare en autentisert forespørsel per
prosess fra en klarert loopback-adresse, og godtar aldri en URL, filsystembane,
kjørbar fil eller argumentliste. API-pipelinen for brødtekststørrelse og
behandlerens inkrementelle brødtekstleser håndhever uavhengig av hverandre en
inngangsgrense på 50 MiB for megleren. Den begrensede køen kjører én uttrekking
om gangen, tillater fire ventende jobber og begrenser ventende inndata til
100 MiB.

I megleren leser `ffprobe` en privat lokal fil; den faste tillatelseslisten for
formater utelukker spilleliste- og manifestformater. For tillatte beholdere i
MOV-familien forblir eksterne MOV-datareferanser deaktivert som standard, og
den faste kommandoen aktiverer dem ikke. Både `ffprobe` og `ffmpeg` bruker
protokolltillatelseslisten med kun `file`, én tråd, faste argumenttabeller,
ingen kommandotolk og kjørbare filer som finnes via `PATH`. Omslagsstrømmer med
vedlagte bilder er ikke avspillbare kandidater. Alle avspillbare strømmer må
oppfylle grensene, og en eksplisitt standardstrøm foretrekkes før det
deterministiske tilbakeslaget til laveste indeks. Videoer er begrenset til
600 sekunder, 8 192 piksler per dimensjon og 33 554 432 kildepiksler. FFmpeg
henter 1–16 JPEG-bilder ved midtpunkter, skalerer ned den lengste kanten til
maksimalt 1 024 piksler uten å oppskalere mindre inndata, og mottar aldri en
URL. Utvalgsmetoden er `uniform` som standard. De valgfrie policyene
`scene_aware` og eksperimentelle `segment_aware` utfører én ekstra fast
FFmpeg-passering over den allerede validerte lokale strømmen, velger et
begrenset antall `showinfo`-scenetidsstempler og faller deterministisk tilbake
til de samme jevnt fordelte midtpunktene ved detektorfeil, tidsavbrudd,
feilformatert utdata eller et tomt kandidatsett. Segmentbevisst modus fordeler
midtpunktutvalg proporsjonalt mellom de validerte sceneintervallene;
segmentbevisste bevis og tilbakeslagsatferd beskrives nærmere nedenfor. Den
absolutte grensen på 16 bilder anvendes etter utvelgelsen i alle policyer. Når
en scenebevisst forespørsel bare har et budsjett på ett bilde, bruker den det
jevnt fordelte midtpunktet i det aktive fullvideo- eller fokusvinduet og
rapporterer `policyEffective: uniform`: Ett enkelt valgt scenebilde kan ikke
bevare begge tidsmessige endepunkter. En anroper kan valgfritt angi et endelig
fokusvindu (`start`/`end` i sekunder); grensene avgrenses til mediets varighet,
omvendte eller ikke-endelige vinduer avvises, og alle utvalgspolicyer utføres
bare innenfor det normaliserte intervallet. Det resulterende vinduet inkluderes
i metadataene for utvalget og i prefikset for ikke-klarert beskrivelse, slik at
nedstrømsmodeller kan skille et fokusert utdrag fra hele tidslinjen.

Semantisk fokus for bildetekster er en separat, eksplisitt innstilling.
Standard analysemodus `full` beholder den eksisterende bildeledeteksten og
videresender aldri forespørselstekst til bildetekstmodellen. I `focused`-modus
leser broen bare den nyeste ikke-tomme, brukerforfattede `text`/`input_text` fra
den samme Chat- eller Responses-beholderen, normaliserer den til NFC, slår sammen
kontrolltegn og blanktegn og begrenser den til 500 Unicode-kodepunkter. Et tomt
resultat faller tilbake til den nøyaktige `full`-ledeteksten. Et brukbart hint
serialiseres som JSON i en egen blokk for ikke-klarert brukerkontekst og kan
bare prioritere observerbare detaljer; det kan ikke overstyre den separate
advarselen mot å følge instruksjoner som er synlige eller hørbare i mediet.
Tekstlig fokus utleder aldri `start`/`end` eller endrer den tidsmessige
utvalgsmetoden.

#### FU-07 strukturelle segmentbevis

`segment_aware` bruker én avgrenset forhåndsanalyse av den allerede validerte
lokale videostrømmen. Den faste filterkjeden skalerer først til maksimalt 320 piksler
i bredden, registrerer sceneendringer og frosne intervaller og tar deretter prøver med
1 bilde per sekund for uskarphet, gjennomsnittlig luminans samt romlig og temporal
informasjon. Kjøringen er begrenset til 600 strukturelle prøver, én FFmpeg-/filtertråd,
de samme tillatelseslistene for protokollen `file` og containere, en grense på 1 MiB
for prosessutdata og maksimalt 30 sekunder innenfor meglerens delte avbrudds-/tidsfrist.
Den godtar aldri en kommando, et filter, en bane eller en URL fra forespørselen.

De strukturelle verdiene er deterministiske utvalgsdata, ikke semantisk
videoforståelse. De utleder ikke motiver, handlinger, bildetekster, tale eller
brukerintensjon. Scene- og frysegrenser danner segmenter. Frysedekning, uskarphet,
eksponering, romlig detaljnivå og temporal endring påvirker bare hvordan det
eksisterende budsjettet på 1–16 bilder fordeles. Et helt frosset segment begrenses
til ett bilde, mens ikke-frosne segmenter konkurrerer om det resterende budsjettet.
Når antallet grenser overstiger antallet bilder, beholdes jevn dekning av tidslinjen,
slik at raske klipp tidlig i videoen ikke kan skjule et langt avsluttende segment.
Scenegrenser som ligger innenfor forhåndsanalysens oppløsning på 1 sekund fra en
frysegrense, slås sammen.

Manglende filtre, ugyldige eller tomme data, en detektorfeil eller tidsavbrudd i
den avgrensede forhåndsanalysen fører til åpen reservehåndtering med nøyaktig den
uniforme midtpunktspolicyen. Et avbrudd fra den som kaller, eller meglerens tidsfrist,
fører ikke til åpen reservehåndtering: Det avslutter den pågående underprosessen,
forhindrer senere bildeuthenting, og det private midlertidige katalogtreet fjernes
i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske, reelle
FFmpeg-testdata for besparelser i bildetekstkall etter deduplisering,
budsjettfordeling ved tett bevegelse, data for uskarphet/eksponering/SI-TI, raske
klipp med en lang avslutning og falske positiver ved gradvis toning. Skriptet
registrerer faktisk tidsbruk for forhåndsanalysen og, der `/usr/bin/time` er
tilgjengelig, underprosessens CPU-bruk og maksimale RSS. Kvalitetskontrollene er
utelukkende strukturelle orakler. Kvaliteten til den reelle bildetekstmodellen
forblir `HOLD` fordi denne testen ikke har noe autorisert endepunkt eller noen
fastlåst evaluator. Monetære besparelser forblir også `HOLD` med mindre
`--caption-cost-per-call-usd` oppgir et eksplisitt positivt kostnadsestimat per
kall. Skriptet fabrikerer aldri noen av resultatene.

Hvert bilde er begrenset til 4 MiB, alle råbilder samlet til 23 MiB og det
serialiserte meglersvaret til 32 MiB. En privat midlertidig katalog fjernes i
`finally`. OmniRoute inkluderer ikke FFmpeg og godtar ikke en egendefinert bane
til den kjørbare filen. Før generering av bildetekster utfører broen en konservativ
visuell deduplisering: Hver JPEG reduseres til en 16×16-gråtonebuffer og sammenlignes
bare med det siste bildet som ble beholdt. For et forespurt bildetekstbudsjett på
mer enn ett bilde leverer uthentingen en avgrenset kandidatgruppe på opptil det
dobbelte av budsjettet, men aldri mer enn 16 bilder. Den forespurte grensen brukes
først etter deduplisering, og den første og siste valgte kandidaten beholdes under
den endelige uttynningen når budsjettet er minst to. Den versjonerte policyen
`grayscale-16x16-mean-cells-v2` bruker den største verdien av gjennomsnittlig
luminansdifferanse og andelen miniatyrbildeceller der den normaliserte differansen
er minst 0,05. Terskelen for duplikater er konstanten 0,04, valgt for
forutsigbarhet fremfor å eksponeres som en kjøretidsinnstilling. Dette sekundære
signalet med høy kontrast bevarer små bevegelser og endringer i synlig tekst som
en sammenligning basert bare på gjennomsnittet kan skjule. Feil i sammenligneren
eller dekoderen håndteres åpent og bevarer dekningen. Utdatametadata skiller mellom
uthentede kandidater, bilder som ble brukt, og visuelle duplikater som ble fjernet.

En eksplisitt merket videodel kan be om et kontaktark med tidsstempler. Broen
bygger et JPEG-rutenett med maksimalt 4 kolonner og 16 bilder. Hver celle på
512 piksler brenner kildens tidsstempel inn i et bunnfelt med høy kontrast,
mens de samme tidsstemplene beholdes i tekstmetadata for etterfølgende kobling
og revisjon. Hele JPEG-filen er fortsatt begrenset til 32 MiB. Hvis `sharp` ikke
kan dekode eller sette sammen rutenettet, faller broen tilbake til de individuelle
JPEG-bildene. Et klientavbrudd forplanter seg fortsatt gjennom kontaktarkoperasjonen.

Dokumentasjon for produksjonssetting holdes bevisst adskilt fra den syntetiske
mikrotesten for sammensetting. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definerer en skjemaversjonert A/B-test for reelle OpenAI-kompatible synsmodeller.
Den måler tokenantall rapportert av leverandøren, ende-til-ende-tidsbruk
(inkludert sammensetting av kontaktarket), antall modellkall og bevaring av
manifestdefinerte fakta. Rå modelsvar skrives ikke til rapporten. Bare
SHA-256-sammendrag og ID-er for samsvarende fakta beholdes. Testen utfører ingen
nettverkskall eller betalte modellkall med mindre `--execute-real` angis og
`--model`, `OMNIROUTE_BASE_URL` og `OMNIROUTE_API_KEY` er konfigurert. Uten en
slik eksplisitt reell kjøring forblir den maskinlesbare konklusjonen `HOLD`.
Syntetiske målinger av nyttelast og antall kall alene er ikke dokumentasjon for
produksjonssetting.

De som kaller, kan legge ved en valgfri `transcript.cues`-matrise i en støttet
videodel når de allerede har justert tekst. Hvert element må inneholde `text`,
et endelig `start`/`end`-intervall innenfor den undersøkte varigheten og en
tillatelseslistet `source` (`client`, `embedded` eller `audio-bridge`).
`confidence` har standardverdien `1` og må ligge mellom `0` og `1`. Identiske
duplikater slås sammen. OmniRoute starter aldri transkripsjon basert på disse
metadataene: Validerte elementer kopieres inn i det beskrevne resultatet med
kilde, konfidens og intervall, og gjengis som uklarerte observasjoner ved siden
av bildetekstene. Ugyldig tekst, tekst utenfor intervallet eller tekst uten
proveniens avvises i stedet for å blandes inn i bildetekststrømmen. Begge
transkripsjonskanalene i forespørselskroppen normaliserer oppgitt proveniens
til `client`, inkludert selvpåståtte etiketter som `embedded` eller
`audio-bridge`. Bare en adapter eid av serveren kan tilordne disse klarerte
etikettene gjennom det kodeinterne argumentet `trustedSource`. Et JSON-felt i
en forespørsel kan ikke nå dette argumentet. Transkripsjonstekst forblir
uklarert innhold avledet fra medier, uavhengig av proveniens, og må aldri
avgjøre autorisasjon.

En avansert kallende part kan oppgi et `audioTranscript`-spor for den samme videoen;
det behandles som tekst levert av klienten, ikke som bevis på transkripsjon på serveren.
Fusjonssømmen kjører visuelle observasjoner og lydobservasjoner under
én tidsfrist og ett avbruddssignal, ordner dem på en felles tidslinje, slår sammen
helt identiske duplikater og rapporterer et delvis resultat når bare én side lykkes.
Et ugyldig `audioTranscript` degraderes til dette delvise resultatet — den visuelle
beskrivelsen beholdes, og lydgrenen registrerer en sanert feilkode —
i stedet for at hele videoen mislykkes. Tilgjengelighet per gren, flagget for delvis
resultat og de sanerte feilkodene bevares i det beskrevne resultatet, i
sikkerhetsfiltermetadataene (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i metadataene for resultatbufferen og i broens
fusjonstellere. Standardbanen for Video Bridge påkaller ikke tale-til-tekst
eller laster ned en ekstra kopi av mediet; uten dette eksplisitte sporet forblir
den begrenset til video.

**Oppbevaring av transkripsjoner (#12150 P1).** Dette gjelder automatisk hver gang
Video Bridge (som i seg selv må aktiveres eksplisitt) gjengir en transkripsjonsmarkør — det finnes ikke noe separat
oppbevaringsflagg. Når en forespørsel gjengir en transkripsjonsmarkør (et `transcript`
angitt av den kallende parten eller et fusjonert `audioTranscript`), merker sikkerhetsfilteret den som
`videoBridgeObserved` og oppretter en sladdet skygge av videobeskrivelsen —
en identisk gjengivelse der fritekstinnholdet i hver markør erstattes med
`[redacted-video-transcript]`, opprettet ved å erstatte det strukturerte markørfeltet
før strengen settes sammen (aldri ved å analysere den utflatede teksten, slik at intet
markørinnhold — verken ondsinnet eller ordinært, inkludert innhold med `]`, som
`[inaudible]`/`[music]` — kan bli værende). Forespørselsinnholdet i den lagrede kallloggen erstatter
hver videoavledede tekstdel med den sladdede skyggen, sammenkoblet ved hjelp av
innholdslikhet; `fullText`-ankeret leses på nytt fra den ferdige
sikkerhetsfilterlasten før kallet, slik at sammenkoblingen fortsatt lykkes etter at senere
kjedesikkerhetsfiltre (maskering av PII og påloggingsopplysninger, prioritet 10/95) omskriver
beskrivelsesteksten på stedet, og etter at innsetting av systeminstruksjoner, overlevering og
minne omformer meldingsmatrisen. Innholdet som sendes oppstrøms til modellen, forblir
uendret. En observert forespørsel fyller heller ikke ut varig Memory (både forespørsels-
og svaravledet uthenting hoppes over), slik at modellens eget svar ikke kan gjengi
transkripsjonstekst i Memory.

**Rå videofelt (#12430).** Når broen er aktivert og støtte for innebygd video er ukjent eller mangler, aktiverer definerte `transcript`-/`audioTranscript`-felt også `videoBridgeObserved`, selv etter feil i beskrivelsen eller en `maxVideos`-grense. `null` og tomme strenger teller; manglende felt og metadata som ikke gjelder video, gjør det ikke. Oppbevarte kopier sladder disse feltene eller utelater forespørselen, og buffere/Memory omgås.

På disse reservebanene blir gyldige markører fra den kallende parten til støttede `text`-/`input_text`-
deler i stedet for ikke-standardiserte leverandørfelt. Begge sporene som følger med forespørselen,
forblir uklarerte `client`-observasjoner, med en uttrykkelig advarsel om at videoen
ikke ble beskrevet, og at tidsstemplene ikke ble verifisert mot mediet. De eksisterende
grensene på 256 markører/64 KiB totalt og per markør gjelder samlet for de to sporene;
tidsstempler må være innenfor formidlerens grense på 600 sekunder og et eventuelt angitt
fokusvindu. Ugyldige spor forkastes og videresendes ikke som vilkårlig tekst; et gyldig
søsken kan fortsatt brukes med mindre den samlede grensen overskrides. Nullverdier/tomme
felt legger ikke til tekst. Denne reservebanen legger ikke til mediehenting eller transkripsjon.
Utvidelsesfelt for transkripsjon fjernes fra reservebanens videobeholder og dens
`video_url`-/`source`-objekter. Tillatelseslisten for OpenAI-formatet forblir streng; beholdere
med ukjent støtte for innebygd video forblir tilgjengelige, og kjente mål som bare støtter tekst,
beholder sikre markører. Strukturerte sladdeskygger beskytter den tilføyde transkripsjonsteksten,
mens den opprinnelige, kallereide forespørselen forblir uendret. Mål med innebygd støtte
og deaktiverte broer beholder sin eksisterende omgåelsesatferd.

Ytterligere oppbevarte kopier bruker det samme signalet for observert forespørsel. Det rå
øyeblikksbildet av klientforespørselen før sikkerhetsfilteret, den ventende forespørselen i minnet
og den tidlige loggen over avviste forespørsler erstatter transkripsjonsfelt i videodeler på en
strukturert måte; strenginstruksjoner som opprettes av pipeline-faser og kontekstoverlevering,
sladdes ved mottaket for det lagrede forespørselsinnholdet. Den lagrede markøren
`video_content_removed` gjør at videreføring med `previous_response_id` avvises sikkert,
i stedet for å rekonstruere tekst som med hensikt ble forkastet. Hvis en observert forespørsel
mister sin sladdeskygge per del før logging, eller hvis bare én av flere videoskygger ikke
samsvarer etter senere endringer i forespørselen, utelates hele det oppbevarte
forespørselsinnholdet i stedet for å beholde en delvis sladdet transkripsjon.

For en observert forespørsel kan et modellsvar sitere en hvilken som helst del av
transkripsjonen uten en strukturert markørgrense. Den lagrede kallloggens
`responseBody` erstattes derfor med en utelatelsesmarkør; den detaljerte
pipeline-artefakten (som kan inneholde oppstrøms-/klientinnhold og strømmeblokker)
oppbevares ikke. Semantiske buffere, idempotensbuffere og buffere for resonnementsavspilling
omgår lesing og skriving for denne forespørselen. Leverandørforespørselen og svaret
som er synlig for klienten, forblir uendret. Tidlige keepalive-byte tømmes fra den midlertidige
bufferen når den detaljerte artefakten utelates. Kiros advarsel om feilformatert EventStream
rapporterer bare antallet byte i nyttelasten, aldri innholdet eller JSON-
analysatorens rå feil.
Dette innebærer ikke at all diagnostikk fra uvedkommende leverandører/tillegg er
revidert; den bredere gjennomgangen av oppbevarte mottak spores i #11658.

Den interne livssyklusen for `/api/modality-bridge/video/drilldown` er et separat,
loopback-/tokenautentisert hurtigbuffergrunnlag. Hver operasjon krever også en
kanonisk, opak prinsipal-ID. Før en produksjonskaller aktiveres, må den
utlede denne ID-en fra den autentiserte leietakeren og aldri videresende en
klientvalgt verdi. Hurtigbuffernøkler binder denne prinsipalen til kanoniske økt- og
videoreferanse-ID-er, lagrer bare deres SHA-256-avledede nøkler og avgrenser både lesing
og sletting til den samme prinsipalen. Hurtigbufferen lagrer maksimalt 16 avledede
JPEG-bilder per oppføring, utløper dem etter ti minutter og støtter avgrensede
`start`-/`end`-lesinger eller eksplisitt sletting av økten.

Hver prinsipal er begrenset til 16 oppføringer og 64 MiB med kanoniske JPEG-data. Disse
grensene er uavhengige av det globale taket på 64 oppføringer/256 MiB: press på
prinsipalkvoten fjerner bare oppføringene til den aktuelle prinsipalen som har vært
minst nylig brukt, før global LRU-fjerning vurderes. Utløpte oppføringer fjernes fra
både prinsipalens og den globale regnskapsføringen ved hurtigbufferaktivitet, mens
avbrudd og valideringsfeil ikke lagrer en delvis erstatning.

Hurtigbufferen avviser ikke-kanonisk Base64, overflødig utfylling, medier som ikke er
JPEG, feilformede eller avkortede JPEG-er og JPEG-er som gir en advarsel under en
avgrenset `sharp`-dekoding av hele bildet. Hvert godkjent bilde omkodes som en kanonisk
JPEG, bredde og høyde utledes fra de dekodede bytene i stedet for å stole på felter fra
kalleren, og eventuelle etterfølgende polyglott-byte forkastes i stedet for å beholdes.
Bare den avgrensede, kanoniske komprimerte bufferen belastes begge kvotene. JSON-grensen
på transportnivå inkluderer Base64-overhead for taket på 32 MiB for dekodede inndata.
Hver
lagrede avledning registrerer sitt validerte JPEG-format og sin validerte oppløsning,
samplingspolicy, avledningsversjon, opprettelsestidspunkt, serverberegnede innholdshash
og hashede overordnede referanse samt den betrodde kallerens hash av det overordnede
innholdet. Avbrudd kontrolleres mellom asynkrone dekodings-/hashfaser før den atomiske
lagringen i hurtigbufferen.

Denne leveranseetappen kobler ennå ikke en produksjonsprodusent til ruten og tilbyr
ikke valg mellom varianter med flere oppløsninger. Den transparente forespørselsbanen
for Video Bridge medfører derfor ikke noe ekstra arbeid, mens leietakerbundet
prinsipalavledning og hele FU-08-livssyklusen for flere oppløsninger fortsatt er
eksplisitt oppfølgingsarbeid fremfor å være dokumentert som fullført funksjonalitet.

Bilder tekstes sekvensielt med den konfigurerte videomodellen. En tom
Video-overstyring arver Vision-innstillingen. Hvis begge er tomme, velger
Vision-autoruteren den effektive modellen med støtte for bildeanalyse. Vellykkede
bildetekster erstatter den opprinnelige delen med et stabilt `[Video description:`-prefiks
som også merker teksten som en ikke-betrodd observasjon avledet fra medier, og ber
nedstrømsmodeller om ikke å følge instruksjoner funnet i mediet. Hurtigbuffernøkler for
bildetekster inkluderer JPEG-bytene, ledeteksten, tidsstempelet og den effektive modellen.
Bare vellykkede bildetekster hurtigbufres. Hurtigbufferoppføringer beholder den faktiske
produsentmodellen som lyktes, inkludert en reservemodell. Broen rapporterer `mixed` når
ulike bilder ble produsert av ulike modeller. Et hurtigbuffertreff gjenbruker denne
produsentidentiteten i stedet for å merke den på nytt som den forespurte rutingsplanen.
Resultathurtigbufferen for hele videoen har nøkler basert på alle inndata som endrer
resultatet — ledetekst, effektiv modell, samplingspolicy, antall bilder, modus for
semantisk analyse, SHA-256-fingeravtrykket til det normaliserte fokushintet, fokusvindu,
`transcript`, `audioTranscript` og kontaktarkflagget — så en endring i en hvilken som
helst av disse dimensjonene gir et hurtigbuffermiss, aldri gjenbruk av et foreldet
resultat. Versjonen, terskelen og det avgrensede antallet kandidatbilder for policyen
for visuell deduplisering er også eksplisitte i resultathurtigbuffernøkkelen og
metadataene. En policyendring kan derfor ikke gjenbruke en foreldet beskrivelse av
hele videoen. Metadata i resultathurtigbuffer v4 beholder modusen og fingeravtrykket,
aldri den rå brukeroppgaven. Metadata for sikkerhetsmekanismen rapporterer både
forespurt og effektiv analysemodus. En forespurt `focused`-modus uten brukbar
brukertekst rapporteres som effektivt `full`.

Sikkerhetsmekanismen trekker ut alle støttede videodeler, men beskriver ikke flere enn
`modalityBridgeVideoMaxVideos`. For et mål som beviselig har
`supportsVideo === false`, blir mislykkede videoer og videoer over grensen gjort om til
eksplisitte, trygge tekstmarkører, slik at ingen råvideo blir igjen. Når funksjonaliteten
er ukjent, beholder disse delene videobeholderen sin. Eventuell reservetranskripsjon
følger den avgrensede tekstkonverteringen ovenfor. Mål med `supportsVideo === true`
omgår broen. Avbruddssignalet fra klientforespørselen videreføres gjennom nedlasting,
meglerkø, underprosesser og bildetekstkall. Avbrudd stopper mellom videoer og faller
aldri åpent tilbake til råmedier.

Kjøretidsinnstillingene er DB-baserte og Zod-validerte:

| Nøkkel                              | Standardverdi | Område / virkemåte                                                                                     |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`       | Valgfritt kjøremiljø, må aktiveres eksplisitt                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` bevarer generiske bildetekster; `focused` bruker avgrenset, uklarert kontekst fra nyeste bruker |
| `modalityBridgeVideoModel`          | `""`          | Arver Vision Bridge-modellen                                                                           |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware` eller proporsjonal `segment_aware`; detektorfeil faller tilbake til `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 ms                                                                                         |

Eldre lagrede verdier for tidsavbrudd for Video over 120 sekunder begrenses til
meglerens tidsfrist; nye innstillinger over denne grensen avvises.
`GET /api/modality-bridge/video/runtime` krever klarert, stemplet lokal
tilbakekobling før autentisering eller sondering av kjøremiljøet, og krever
deretter administrasjonsautentisering. Det returnerer bare `available`,
rensede FFmpeg/ffprobe-versjoner og en fast årsak når kjøremiljøet er
utilgjengelig. Det interne endepunktet for uthenting er ikke et offentlig
opplastings-API: metning av køen returnerer `503` pluss `Retry-After`, frakobling
av en klient returnerer `499`, og meglerens faste tidsfrist returnerer `504`.
Konverterte svar legger til
`video->text;model=<visionModel>;parts=<videos>` i den sentrale
`x-omniroute-modality-bridge`-headeren uten å fjerne Vision- eller Audio-segmenter.

### PII-maskering (`piiMasker.ts`)

Kjøres i **begge** stadier.

- **`preCall`** kloner nyttelasten, går gjennom `system`, `messages`, `input` og
  `prompt` (inkludert elementer som består av ren tekst) og anvender
  `processPII()` (fra `@/shared/utils/inputSanitizer`) på `content`-/`text`-felt
  med tekst. Når `PII_REDACTION_ENABLED=true`, sladdes oppdagede
  personopplysninger i den utgående nyttelasten. Dette er uavhengig av
  `INPUT_SANITIZER_MODE` (som bare styrer policyen for promptinjeksjon). Når
  sladding er deaktivert, registrerer kallet antall oppdagelser uten å omskrive
  innholdet.
- **`postCall`** dypkloner svaret, kjører `sanitizePIIResponse()` samt
  maskeringen for Responses-API-formatet (`maskResponsesOutput` — dekker
  `output_text` og `output[].content[].text`). Hvis sladding forekommer,
  erstatter det endrede svaret originalen.

Beskyttelsesmekanismen blokkerer aldri; den legger bare til merknader
(`meta.detections`, `meta.redacted`) eller omskriver.

#### Valg per type, egendefinerte mønstre og oppdagelsestellere

**Kontrollpanel → Innstillinger → Sikkerhet → PII-maskering** velger _hva_ som
maskeres. Dette slår ikke på maskering: den styres fortsatt av
`PII_REDACTION_ENABLED` (forespørsel) og `PII_RESPONSE_SANITIZATION` (svar +
SSE), som begge er deaktivert som standard.

- **Valg per type** — de innebygde ID-ene er oppført i
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Hvis dette ikke er
  angitt, betyr det alle typer (virkemåten før denne innstillingen fantes).
  Forespørselsmotorens `ssn_us`-mønster tilordnes til `ssn`. Maler (Minimal,
  Standard, Financial, Brazilian, USA, Full) fyller bare ut avmerkingsboksene i
  brukergrensesnittet.
- **Egendefinerte mønstre** — opptil 20 regulære uttrykk eller jokertegnmønstre
  (`*` = opptil 64 tegn som ikke er mellomrom, `?` = ett tegn). Treff blir til
  `[CUSTOM_REDACTED]`. Hvert mønster behandles av
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): maksimalt
  500 tegn, flagg begrenset til `g i m s u`, må kunne kompileres, må bestå
  `safe-regex` (katastrofal tilbakesporing) og må ikke samsvare med en tom
  streng eller en sladdingsplassholder. Et mønster som ikke består, avvises ved
  lagring og testing, og en lagret rad som ikke består, hoppes over under kjøring
  i stedet for å bli kompilert. Egendefinerte mønstre kjøres bare når maskering
  er slått på.
- **Oppdagelsestellere** — antall per type (aldri samsvarende verdier), lagret i
  minnet og nullstilt ved omstart (`src/lib/pii/piiDetectionStats.ts`). De øker
  bare når maskering er slått på.

Innstillingene ligger i `key_value`-tabellen (navnerommet `pii_settings`,
`src/lib/db/piiSettings.ts`) og leses gjennom et hurtigbuffer med 1 s
varighet. API:

| Metode | Bane                     | Formål                                                                  |
| ------ | ------------------------ | ----------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flaggstatus, `enabledTypes`, `customPatterns`, oppdagelsestellere       |
| `PUT`  | `/api/settings/pii`      | Erstatt `enabledTypes` (`null` = alle) og/eller `customPatterns`        |
| `POST` | `/api/settings/pii/test` | Prøvekjør ett mønster mot et utvalg på maksimalt 8 KB; ingenting lagres |

Alle tre krever administrasjonsautentisering og validerer innholdet med Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Promptinjeksjon (`promptInjection.ts`)

Oppdager fiendtlige strukturer i brukerlevert innhold og håndhever den
konfigurerte policyen. Virkemåten styres av miljøvariabler og
konstruktøralternativer:

| Innstilling        | Miljøvariabel                                                                                               | Standardverdi | Effekt                                                                                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivert           | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`        | Når den er `false`, avsluttes sikkerhetsmekanismen umiddelbart.                                                                                                                                       |
| Modus              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`        | Injeksjonspolicy: `block`, `warn` eller `log`. (`redact` godtas for bakoverkompatibilitet, men fjerner **ikke** injeksjonstekst; omskriving av PII i forespørsler styres av `PII_REDACTION_ENABLED`.) |
| Blokkeringsterskel | `blockThreshold`-alternativet / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Laveste alvorlighetsgrad som kreves for å blokkere. Medium er som standard kun til observasjon.                                                                                                       |

**Modusprioritet** (`getMode`): anroperens `options.mode` →
`INJECTION_GUARD_MODE` **overstyring av funksjonsflagg i databasen** (Kontrollpanel → Innstillinger →
Funksjonsflagg) → miljøvariabelen `INJECTION_GUARD_MODE` → miljøvariabelen `INPUT_SANITIZER_MODE` →
`warn`. En overstyring fra kontrollpanelet har derfor prioritet over miljøvariablene, slik at
brukergrensesnittet for funksjonsflagg styrer den aktive sikkerhetsmekanismen direkte (ingen omstart).
Databaselesingen er feilsikker: Hvis den mislykkes, faller sikkerhetsmekanismen tilbake på
miljøvariabelbasert virkemåte, og når ingen overstyring er angitt, er virkemåten identisk med
oppløsning utelukkende basert på miljøvariabler.

Deteksjonskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (delt detektorsett
   som brukes andre steder i behandlingskjeden).
2. Innebygde `DEFAULT_GUARD_PATTERNS` (for øyeblikket `system_override_inline` og
   `markdown_system_block`, begge med alvorlighetsgraden `high`).
3. Valgfrie `customPatterns` som sendes via konstruktøralternativer (strenger, regulære uttrykk
   eller poster av typen `{ name, pattern, severity }`).

Når `mode === "block"` **og** minst én deteksjon oppfyller terskelen for
alvorlighetsgrad, returnerer `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I modusene `warn`/`log` logger sikkerhetsmekanismen, men
tillater kallet. Den delte hjelpefunksjonen `evaluatePromptInjection()` eksporteres også
for anropere som må evaluere ledetekster uten å gå gjennom registeret.

**Skannegrense (v3.8.20):** Detektoren undersøker bare de **første 16 KB** av
den sammenføyde ledeteksten — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` bruker `slice(0, MAX_INJECTION_SCAN_BYTES)` før
mønsterløkken kjøres. Injeksjonsdirektiver ligger nær toppen av inndataene, så dette
begrenser CPU-/GC-bruk fra regulære uttrykk på nyttelaster på flere hundre KB uten å svekke
deteksjonen (jf. #3932, #4041).

### Maskering av påloggingsopplysninger (`credentialMasker.ts`)

Kjøres i **begge** faser, sist i standardkjeden (prioritet `95`). Sensurerer
velkjente mønstre for API-nøkler / hemmelige tokener fra den utgående nyttelasten
(meldingsinnhold, argumenter for verktøykall, verktøyresultater) **og** leverandørens svar,
slik at påloggingsopplysninger som limes inn i en ledetekst (eller gjentas i et
verktøyresultat), ikke lekkes til den eksterne leverandøren eller tilbake til klienten.

- **Kun etter eksplisitt aktivering**, etter samme konvensjon som PII-sensurering (i tilknytning til hard regel nr. 20):
  deaktivert med mindre `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er slått av, gjør sikkerhetsmekanismen ingenting —
  den blokkerer aldri og skriver aldri om.
- `redactCredentials()` går gjennom hele treet for nyttelast/svar (`walkValue()`,
  sikret mot prototype pollution og sykluser via `WeakSet`) og erstatter treff med
  plassholderen `[REDACTED:<type>]`, samtidig som bare grenene som faktisk
  ble endret, klones.
- `CREDENTIAL_PATTERNS` dekker nøkler fra LLM-leverandører (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tokener (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøkler (Stripe, Square), nøkler
  for skytjenester (AWS-tilgangsnøkkel, Twilio, SendGrid, Mailgun), private nøkler / JWT-er,
  tilkoblingsstrenger som inneholder påloggingsopplysninger (`mongodb://user:pass@...` osv.), samt
  et generisk mønster for headerverdiene `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Nøkler utformet som headere (`authorization`, `x-api-key`, `api-key`,
  `apikey`) sensureres strukturelt (bare verdien, mens skjemaprefikser som
  `Bearer `/`Basic ` beholdes) i stedet for via det generiske tekstbaserte regulære uttrykket.
- Sikkerhetsmekanismen blokkerer aldri; den skriver bare om (`modifiedPayload` /
  `modifiedResponse`) og legger til merknader (`meta.credentialsRedacted`, `meta.count`).

Regresjonsvern: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true kortslutter kjeden
  message?: string; // vises ved blokkering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returneres av preCall for å omskrive forespørselen
  modifiedResponse?: TValue; // returneres av postCall for å omskrive svaret
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

En sikkerhetsmekanisme signaliserer «ingen endring» ved å returnere enten `void`, `{}` eller
`{ block: false }`. Hvis en `modifiedPayload`/`modifiedResponse` returneres, erstattes
verdien som flyter gjennom kjeden for etterfølgende sikkerhetsmekanismer.
`signal?: AbortSignal` viderefører livssyklusen til den som kaller, inn i sikkerhetsmekanismene. Avbrudd av en forespørsel er det tilsiktede fail-open-unntaket: mediebroer stopper arbeidet og rydder opp uten å gjenopprette råmedier til et mål som man vet ikke støtter dem.

## Register (`registry.ts`)

Singleton-objektet `guardrailRegistry` eksponerer:

- `register(guardrail)` — legger til en sikkerhetsmekanisme (eller erstatter etter normalisert navn) og
  sorterer på nytt etter stigende `priority`.
- `clear()` / `list()` — administrative hjelpefunksjoner.
- `runPreCallHooks(payload, context)` — itererer gjennom aktive sikkerhetsmekanismer, fører
  nyttelasten videre gjennom `modifiedPayload` og stopper ved den første `block: true`.
- `runPostCallHooks(response, context)` — samme flyt på svarsiden.
- `resetGuardrailsForTests({ registerDefaults })` — tømmer tilstanden og registrerer eventuelt
  standardinnstillingene på nytt for ren testisolasjon.

Begge kjørerne returnerer `{ blocked, payload|response, results, guardrail?, message? }`,
der `results` er en matrise med `GuardrailExecutionResult`-oppføringer som inneholder
feltene `blocked`, `skipped`, `modified`, `error` og `meta` per sikkerhetsmekanisme,
noe som er nyttig for sporing.

### Deaktivere sikkerhetsmekanismer per forespørsel

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` samler en
duplikatfri liste over navn på sikkerhetsmekanismer som skal hoppes over for den gjeldende
forespørselen. Kilder (alle valgfrie, alle slås sammen):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` i forespørselskroppen (på toppnivå)
- `metadata.disabledGuardrails` i forespørselskroppen
- Headeren `x-omniroute-disabled-guardrails` (eller den eldre
  `x-disabled-guardrails`)

Verdier kan være matriser med strenger eller en kommaseparert streng. Navn
normaliseres til kebab-case med små bokstaver (`pii_masker` → `pii-masker`). Resultatet
sendes via `context.disabledGuardrails` til registeret, som hopper over
samsvarende sikkerhetsmekanismer (`skipped: true` i `results`).

## Utførelsesrekkefølge

For hver forespørsel som går gjennom `src/sse/handlers/chat.ts` og
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` bygger listen over elementer som skal hoppes over, basert på API-nøkkel, body
   og headere.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kjører sikkerhetsmekanismene i stigende
   prioritetsrekkefølge:
   - Deaktiverte sikkerhetsmekanismer registreres som `skipped`.
   - Hver sikkerhetsmekanismes `preCall` kan skrive om payloaden via `modifiedPayload`.
   - Den første `block: true` avbryter kjeden, og handleren returnerer
     et avvisningssvar fra sikkerhetsmekanismen.
3. Den (potensielt omskrevne) payloaden går videre til kombinasjonsruting og oppstrøms
   videresending.
4. Etter at svaret er satt sammen, kjører `guardrailRegistry.runPostCallHooks(...)`
   den samme kjeden på svaret. `block: true` her forkaster det oppstrøms
   svaret.

Sikkerhetsmekanismer som utløser unntak, registreres med `error: <message>` og logges via
`logger.warn`, men kjeden fortsetter — fail-open med hensikt.

## Konfigurasjon

Miljøvariabler som leses av de innebygde sikkerhetsmekanismene:

| Variabel                              | Brukes av                | Effekt                                                                                                                |
| ------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Sett til `false` for å deaktivere deteksjon fullstendig.                                                              |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Retningslinje for injeksjon: `warn`, `block` eller `log`. Den eldre verdien `redact` skriver ikke om injeksjonstekst. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Modus for injeksjonsbeskyttelsen; også et funksjonsflagg i databasen som **overstyrer** miljøvariablene (DB > ENV).   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Laveste alvorlighetsgrad som `MODE=block` avviser: `high` (standard), `medium` eller `low`.                           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Eldre alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Når satt til `true`, blir PII i forespørselen sladdet (uavhengig av injeksjonsmodus).                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedstrøms) | Styrer maskeringsatferd på svarsiden.                                                                                 |

Sikkerhetsmekanismene i Modality Bridge leser kjøretidskonfigurasjon fra det databasebaserte innstillingslageret
(`getSettings()`), ikke fra miljøvariabler. De primære nøklene for Vision er
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og
`modalityBridgeCacheMaxEntries`. De eldre
`visionBridge*`-nøklene godtas bare som den dokumenterte reservemekanismen for lesing i én syklus;
skriving fra kontrollpanelet bruker de primære nøklene. Standardverdier og fallback-resolveren
finnes i `src/shared/constants/modalityBridgeDefaults.ts`, mens eldre
konstanter beholdes i `src/shared/constants/visionBridgeDefaults.ts`.

Audio bruker `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips`, i tillegg til de delte
`modalityBridgeCache*`-innstillingene. Audio har ingen fallback til eldre nøkler fordi disse
nøklene ble introdusert med Modality Bridge-skjemaet.

Video bruker `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` og
`modalityBridgeVideoTimeout`, i tillegg til de delte `modalityBridgeCache*`-innstillingene.
Den er deaktivert som standard fordi FFmpeg/ffprobe er valgfrie driftsavhengigheter,
og teksting av bilderammer øker latensen og modellkostnaden.

## Egendefinerte sikkerhetsmekanismer

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

Trinn:

1. Opprett `src/lib/guardrails/myGuardrail.ts` som utvider `BaseGuardrail`.
2. Implementer `preCall` og/eller `postCall`.
3. Registrer enten ved importtidspunktet (legg til fra `registerDefaultGuardrails`), eller
   kall `guardrailRegistry.register(...)` under kjøring — registeret erstatter
   eventuelle tidligere sikkerhetsmekanismer med samme normaliserte navn.
4. Legg til tester under `tests/unit/` (eksisterende eksempler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testing

Bruk `resetGuardrailsForTests()` mellom testene for å starte fra en kjent tilstand.
Send `{ registerDefaults: false }` for å starte med et tomt register og
registrere bare sikkerhetsmekanismene som testes. Vision Bridge støtter avhengighets-
injeksjon (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge tilbyr
tilsvarende koblingspunkter for innstillinger, funksjonalitet, valg av STT-modell, kontroll
av legitimasjon og transkribering. Testene kan derfor kjøre begge flytene uten tilgang
til database eller nettverk.

## Se også

- `src/lib/guardrails/` — implementasjon
- `src/shared/utils/inputSanitizer.ts` — delt detektor som driver
  beskyttelse mot promptinjeksjon og maskering av personopplysninger
- `src/shared/constants/visionBridgeDefaults.ts` — standardinnstillinger for Vision Bridge og
  modelliste for tvungen brokobling
- `src/shared/constants/modalityBridgeDefaults.ts` — delte standardinnstillinger for kjøring av Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lag (automatsikring, nedkjølingsperioder)
- `docs/reference/ENVIRONMENT.md` — fullstendig referanse for miljøvariabler

## Rutedekning og red-team-testing for injeksjonsbeskyttelse (fase 8 · blokk D)

Injeksjonsbeskyttelsen (`createInjectionGuard` / `withInjectionGuard`) dekker alle ruter
som godtar brukerprompter. Den tar hensyn til `INJECTION_GUARD_MODE` (standardverdien `warn` = bare logging;
`block` = returnerer HTTP 400 `SECURITY_001`).

| Type                 | Ruter                                                                                                                                                | Standardmodus |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Tekst (eksisterende) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativ            | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Tekstuttrekk (`extractMessageContents`) dekker `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (hver natt, `nightly-llm-security.yml`):** promptfoo validerer at hver rute blokkerer
OWASP-LLM-korpuset i `INJECTION_GUARD_MODE=block`; garak kjører sonder (hoppes over uten hemmelighet).
`moderations` er inkludert for konsistens — operatører i blokkeringsmodus kan unnta den via
`resolveDisabledGuardrails`.

Den nattlige arbeidsflyten (`.github/workflows/nightly-llm-security.yml`, cron + manuell
utløsning) har to jobber:

- **`promptfoo-guard` (blokkerende)** — kjører `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Hvert angrepstilfelle (f.eks. «ignorer alle
  tidligere instruksjoner …», jailbreaks i DAN-stil) kontrollerer at svaret inneholder
  `error.code === "SECURITY_001"`, dvs. at sikkerhetsmekanismen faktisk avviste forespørselen.
- **`garak` (rådgivende)** — kjører garak `--probes promptinject,dan,leakreplay`
  mot en lokal OmniRoute-instans (`http://localhost:20128/v1`). Avhenger av en
  leverandørhemmelighet (`PROMPTFOO_PROVIDER_KEY`); hoppes kontrollert over og har suffikset
  `|| true`, slik at den rapporterer uten at CI feiler.

Dekningen av hjelpefunksjonen for beskyttelse (`createInjectionGuard` / `withInjectionGuard`)
omfatter alle `/v1`-ruter som inneholder prompter; prompttekst hentes fra
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` av
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
