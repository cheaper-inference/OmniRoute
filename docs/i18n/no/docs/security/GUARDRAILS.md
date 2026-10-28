# Guardrails (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sannhetskilde:** `src/lib/guardrails/`
> **Sist oppdatert:** 2026-10-17 — v3.8.52 (la til [Dekning og begrensninger](#coverage-and-limits):
> hvilke ruter og responsstier hookene når, de sammenslåtte deaktiverings-headerne (#16412), blokkeringsmodus
> for injeksjon som en obligatorisk grense (#16413), og hva som ser et svar før postCall)

Guardrails håndhever sikkerhets-, retningslinje- og innholdstransformasjoner ved grensen
mellom OmniRoute og oppstrømsleverandører. Hver guardrail kan inspisere (og
eventuelt avvise, transformere eller annotere) forespørsels-payloads (`preCall`) og
oppstrøms svar (`postCall`).

Systemet er **fail-open**: hvis en guardrail kaster et unntak under kjøring, registrerer
registeret feilen og fortsetter med neste guardrail i stedet for å feile
forespørselen. Blokkering er en eksplisitt beslutning (`block: true`), aldri et uhell.
Det eneste unntaket er en avbrutt forespørsel: når den anropende partens `signal` avbrytes,
avviser en guardrail som kaster unntak hook-kjøringen i stedet for å bli hoppet over.

Hookene kjører **ikke** på hver rute eller hvert svar. Les
[Dekning og begrensninger](#coverage-and-limits) før du stoler på en guardrail som en
sikkerhetskontroll.

## Innebygde guardrails

Registeret laster automatisk inn seks guardrails i prioritert rekkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Fase(r)        | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetstall kjører **først**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Basismodellen GLM 5.3 og `glm-5.3-{low,high,max}` har eksplisitt
`supportsVision:false`-metadata i registeret/spesifikasjonen. GLM 5.3 Flash-variantene
forblir modeller med naturlig synsstøtte. Claude Codes `/v1/messages`-rute går inn i
den delte `handleChat`-kjeden av pre-call-guardrails **før** Claude-til-OpenAI-
oversettelsen; nestede `Read`-verktøyresultatbilder må beskrives eller håndteres
før den oversettelsen løfter dem inn i OpenAI `image_url`-innhold (#17069).

Fanger opp bildebærende forespørsler rettet mot **modeller uten synsstøtte** og enten
omdirigerer hele forespørselen til en synskapabel modell, eller erstatter
bildedelene med tekstbeskrivelser produsert av en konfigurerbar synsmodell før
oppstrømskallet. Dette lar rene tekstleverandører håndtere
multimodale payloads på en transparent måte.

Flyt:

1. Hopp over hvis målmodellen allerede støtter syn (med mindre den finnes i
   listen over tvungne broer, `isVisionBridgeForcedModel`).
2. Pakk ut bildedeler via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **samlede
   mediedetektoren** `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den
   eneste sannhetskilden som deles med combo-kompatibilitetsfilteret.
   Utpakking er hvitelistet til formene `replaceImageParts` kan sette
   tilbake (extract↔replace-kontrakten): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL `source.type:"url"` og Responses
   API `input_image`. Matchende bilder som er nestet inne i Claude Code
   `tool_result.content` og Responses-verktøyutdata, pakkes også ut og
   erstattes på sine opprinnelige stier; former som kun er indikatorer, er
   materiale for combo-filteret og pakkes ikke ut.
   Hopp over hvis ingen finnes.
3. Løs opp kjøretidskonfigurasjon via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nye `modalityBridge*`
   -innstillingsnøkler vinner; eldre `visionBridge*`-nøkler forblir en
   **fallback i én syklus** (tilbakerullingsvindu). Hopp over før enhver
   medietraversering når broen er deaktivert.
4. Modusvelgeren (`modalityBridgeVisionMode`, se tabellen nedenfor) avgjør
   omdirigering kontra beskrivelse. Omdirigering returnerer `modifiedPayload` med bare `model`
   byttet ut, pluss meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsesstien: begrens bilder til `maxImages`, sett sammen den oppgavebevisste
   prompten, rådfør beskrivelses-cachen, kall synsmodellen **parallelt**
   (`Promise.allSettled`), og sett inn `[Image N]: <description>`-tekstdeler
   i stedet. En mislykket beskrivelse gir `null`: det rå bildet beholdes for
   ukjente/synskapable mål (#4012), men et **bekreftet direktemål som kun støtter
   tekst** eller en combo uten syn får en eksplisitt
   `(unavailable — no vision-capable provider connected)`-tekststub for
   hvert ubeskrevne bilde, inkludert delvise feil og bilder ut over
   taket for beskrivelseskall (#17069). Den eksisterende fallbacken for
   combo-beskrivelse der alle feilet, forblir på plass (#8430).
6. Returner `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Modusvelger (`modalityBridgeVisionMode`)

| Modus      | Standard | Oppførsel                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eldre heuristikk, urørt (#6640/#7204): ikke-kombo/`auto/`-modeller rutes om til den beste visjonsmodellen med mindre originalmodellen allerede har brukbar legitimasjon (da beskrives det i stedet); kombo-mål beskriver alltid.                                                                          |
| `describe` |          | Beskriv alltid — omdirigeringsblokken hoppes helt over; brukerens valgte modell svarer alltid.                                                                                                                                                                                                            |
| `reroute`  |          | Tving omdirigering: sperren som beholder modellen med legitimasjon, omgås. Legitimasjonssperren for omdirigerings-**målet** gjelder fortsatt — når det ikke finnes noe brukbart visjonsmål, blokkerer broen med en tydelig feil i stedet for å beskrive eller sende råbilder til et rent tekstbasert mål. |

Tvungne moduser kortslutter **før** auto-heuristikken kjører; `auto`-oppførselen
er byte-identisk med sperren slik den var før PR-1.

#### API-nøkkelomfang (`visionBridgeKeyScope.ts`)

Når innringerens API-nøkkel begrenser `allowedConnections`, kvotepooler
(`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), velger broen bare
omdirigerings- og beskrivelsesmodeller som nøkkelen har lov til å bruke, på
tilkoblinger nøkkelen har lov til å bruke. Beskrivelseskallet går da alltid
gjennom OmniRoute-selvsløyfen med `x-omniroute-self-loop-key-id`-headeren, slik
at den mottakende chat-forespørselen håndhever nøkkelens tilkoblings- og
modellpolicy på nytt. `enforceApiKeyPolicy()` respekterer den headeren bare
sammen med selvsløyfe-beareren, slik at den bare kan innsnevre tilgang, og en
id som ikke kan oppløses, avvises.

Hvis ingen visjonsmodell er tillatt for nøkkelen, avviser et **bekreftet rent
tekstbasert mål** bildeforespørselen lokalt med en tydelig HTTP 400 i stedet
for å videresende bildebytes til en oppstrøms som ikke kan håndtere dem
(#17069). For mål med ukjent eller innebygd visjonsevne beholder
beskrivelsesveien sin tidligere fail-open-oppførsel (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`). Forespørsler uten
nøkkel, og nøkler uten disse begrensningene, oppfører seg nøyaktig som før.

#### Oppgavebevisst beskrivelsesprompt (`modalityBridgeVisionTaskAware`)

Standard **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) legger
teksten i den **siste brukermeldingen** (avkortet til 500 tegn) til
grunnprompten for beskrivelse, og styrer beskrivelsen mot det brukeren faktisk
spurte om (codex-vision-proxy-mønsteret) samt ber visjonsmodellen transkribere
synlig tekst. Med flagget av — eller uten brukertekst — brukes grunnprompten
uendret.

Beskrivelsess-selvsløyfens egen OpenAI-kompatible forespørsel
(`callVisionModelSingle()` i `visionBridgeHelpers.ts`) ber alltid om
`image_url.detail: "high"` — ubetinget, for hver innringer/leverandør, ikke
avhengig av noe klientsignal. Sampling med lav detaljgrad forringer
OCR-nøyaktigheten for nøyaktig den teksttranskripsjonsoppgaven denne prompten
ber om, så beskrivelseskallet selv ber alltid om høy detaljgrad uavhengig av
hvilket detaljnivå den opprinnelige innkommende forespørselen brukte. Dette
påvirker bare kroppen i den interne beskrivelsesforespørselen; det endrer ikke
hvordan OmniRoute videresender innringerens egen `image_url.detail` på
primærforespørselen — den standarden brukes separat, og bare for oppdagede
OpenCode-klienter, i `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic-wire-format-grenen av
beskrivelsess-selvsløyfen har ikke noe `detail`-felt og påvirkes ikke av noen
av standardene.

#### Tak på beskrivelsesutdata (`modalityBridgeVisionMaxChars`)

| Nøkkel                         | Standard | Intervall           |
| ------------------------------ | -------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` eller 100–50000 |

`0` (standard) betyr **ikke noe tak** — beskrivelsen som returneres av
`callVisionModel()`, sendes gjennom uendret, og eksisterende oppførsel bevares.
Enhver verdi i intervallet 100–50000 avkorter beskrivelsen med et `…`-suffiks
før den føyes tilbake som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`). Øk
dette for detaljrike OCR-oppgaver der nedstrømsmodellen trenger hele
transkripsjonen; senk det for å begrense tokenbruken på ordrike
visjonsmodeller. Dashbordfeltet ligger i Avansert-panelet på Visjon-fanen
(`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) og tvinger enhver
verdi mellom 1 og 99 opp til gulvet på 100, mens en eksplisitt `0` forblir
urørt — `0` er en gyldig Zod-verdi i seg selv
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke bare
«ikke satt»-standarden.

#### Hurtigbuffer for beskrivelser (`modalityBridge/bridgeCache.ts`)

Hurtigbuffer i minnet med LRU + TTL for beskrivelsesutdata, delt på tvers av
hele prosessen. Nøkkel = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
med lengdeprefiks-innramming (ingen kollisjoner på feltgrenser).
Modellkomponenten er den **konfigurerte** bromodellen, ikke modellen som
faktisk svarte — `callVisionModel` kan falle tilbake internt, og nøkling per
forsøk ville fragmentere hurtigbufferen. Mislykkede beskrivelser bufres aldri.
Innstillinger:

| Nøkkel                          | Standard | Intervall |
| ------------------------------- | -------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`   | —         |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000   |

#### Normalisering av eksterne bilder (selvsløyfe-beskrivelse/base64-henting)

Når bridgen selv henter et **eksternt** bilde — selvkallet for Anthropic-beskrivelse og base64-konverteringen i claude-wire-format
(`ensureBase64ImagesForClaudeWire`), begge via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — sendes den resulterende data-URI-en gjennom `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) før den bygges inn i forespørselen til visjonsmodellen. For store bilder nedskaleres til **2048px på lengste kant** (tilsvarende skaleringstaket OpenAI/Anthropic allerede bruker på serversiden), noe som reduserer opplastingsbytes/-forsinkelse uten å endre det visjonsmodellen ser. Skalering bruker `sharp`, lastet via dynamisk import: på en plattform der den native binærfilen ikke kan lastes, **kaster** `normalizeDataUri()` **aldri** — den faller tilbake til en passthrough av de opprinnelige bytene, slik at beskrivelses-/base64-konverteringsveien alltid fortsetter å fungere. Ikke-bilde-bytes (en henting som ikke returnerte et dekodbart bilde) sendes også gjennom urørt. Denne normaliseringen er avgrenset til bilder bridgen henter for sitt eget selvkall — den brukes aldri på avsenderens rå passthrough-payload, i tråd med prinsippet om mutasjon kun ved opt-in (Hard Rule #20).

#### Innstillingsskjema + migrering

De nye `modalityBridge*`-nøklene er Zod-validerte i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-trioen, og
`modalityBridgeAudio*`-gruppen som brukes av Audio Bridge. Migreringen
`141_modality_bridge_settings.sql` kopierer eksisterende eldre
`visionBridge*`-verdier til de tilsvarende nye nøklene (idempotent, overskriver aldri en operatørsatt `modalityBridge*`-verdi); de gamle nøklene forblir akseptert som en lese-fallback i én utgivelsessyklus.

#### Transparens-header + statistikk

Beskrivelsestransformerte svar bærer
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(bygd av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`,
stemplet av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omrutede forespørsler får **ingen** header — payloaden var urørt, og modellbyttet er allerede synlig i svar-kroppens `model`-felt.

`GET /api/modality-bridge/stats` (management-auth, samme nivå som
`GET /api/settings`) returnerer tellerne i minnet per modalitet
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og
`video`. `averageLatencyMs` bruker `latencySamples`, ikke alle forsøk, som nevner; en operasjon uten tidtaking fabrikkerer ikke et null-millisekund-målepunkt. `bridged` forblir det bakoverkompatible aliaset for vellykkede konverteringer; mislykkede forsøk øker den ikke.
Tellerne nullstilles ved prosessomstart med hensikt
(telemetri, ikke regnskapsføring).

#### Dashbordkonfigurasjon

Den dedikerte dashbordsiden er
`/dashboard/settings/modality-bridge`. De URL-adresserbare `Vision`-, `Audio`- og `Video`-fanene bevarer spørringsparametere mens `tab`-verdien byttes.
Vision-fanen eksponerer aktivering, modus, modellvalg (inkludert det automatiske standardvalget), oppgavebevisst prompting, avanserte grenser for tidsavbrudd/bilder/beskrivelseslengde/cache, kjøretidstellere, og en bevoktet prøveforespørsel. Audio-fanen er også live: den eksponerer aktivering, en kun-STT-modellvelger med Auto, tidsavbrudd-/maks-klipp-grenser, lydtellere, og en `input_audio`-prøvetest. Video-fanen er funksjonell: den rapporterer FFmpeg/ffprobe-kjøretidsstatusen — én av fire eksplisitte UI-tilstander (`unknown` mens probing pågår eller ikke kunne fullføres, `restricted` på en ikke-loopback-dashbordvert der probing hoppes over på klientsiden, `unavailable` når den er probet og bekreftet manglende, eller `available` med FFmpeg/ffprobe-versjonene) — lagrer aktiverings-/modell-/ramme-/video-/tidsavbruddgrenser, filtrerer modellvelgeren til visjonskompatible modeller, og eksponerer videotellere.

Det tidligere Vision Bridge-kortet under AI-innstillinger er en kompatibilitetslenke til den nye siden; det har ikke lenger et eget duplikat av skjemaet. Media Providers lenker også Image-to-Text- og Speech-to-Text-arbeidsflyter til de tilsvarende Modality Bridge-fanene uten å fjerne den eksisterende Speech-to-Text-lekeplassen.

**Selvsløyfe-innslipps-bypass:** når beskrivelseskallet rutes gjennom OmniRoutes egen `/v1`-selvsløyfe (ikke-standard leverandørmodell), sender delforespørselen
`x-omniroute-admission-bypass: internal` og autentiseres med den oppløste selvsløyfe-legitimasjonen — den lokale `sk_omniroute`-sentinellen i lokal modus, eller den operatørkonfigurerte `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`-miljønøkkelen (#1350), slik at
`REQUIRE_API_KEY=true`-utrullinger fortsatt kan kjøre beskrivelseskallet. Bypasset honoreres kun for nøyaktig disse legitimasjonene, slik at eksterne klienter ikke kan bruke headeren til å hoppe over innlipp.

Eldre standardverdier ligger i `src/shared/constants/visionBridgeDefaults.ts`; de nye standardverdiene for modus/oppgavebevissthet/cache og innstillingsoppløseren ligger i
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail-komponenten eksponerer et `deps`-konstruktøralternativ slik at tester kan injisere falske `getSettings`- og
`callVisionModel`-implementasjoner.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fanger opp chat-forespørsler som bærer lyd, før de når et mål som ikke er kjent for å akseptere lydinndata. Den omdirigerer aldri chat-forespørselen: lyddeler transkriberes gjennom det eksisterende OpenAI-kompatible multipart-endepunktet, og den valgte chat-modellen fortsetter med teksttranskripsjoner.

Flyt:

1. Bestem `supportsAudio` via `getResolvedModelCapabilities()`. Eksplisitt
   metadata fra leverandørregisteret vinner, deretter statisk modellmetadata,
   deretter synkronisert `modalities_input`. En deklarert inndataliste uten
   `audio` gir `false`; uten kapabilitetsbevis forblir verdien `null`. Både
   `false` og `null` aktiverer den konservative broen, mens `true` omgår den.
2. Hent `modalityBridgeAudio*`-innstillingene og trekk ut splice-bare
   lyddeler på toppnivå fra hver melding via den delte `detectMediaParts()`-detektoren.
   Støttede wire-formater er OpenAI `input_audio`, `audio_url` og
   `source.media_type: "audio/*"`. Nøstet lyd oppdages for ruting, men fjernes
   ikke av splice-stien. Arbeidet begrenses av `modalityBridgeAudioMaxClips`;
   senere deler forblir urørte.
3. Respekter en konfigurert `provider/model`, eller la `selectAudioBridgeModel()`
   gå gjennom `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrekkefølge og
   velge den første modellen med en brukbar, aktiv leverandørlegitimasjon.
4. `callAudioTranscription()` konverterer base64-/data-URI-lyd til en multipart
   `file`, eller laster ned en ekstern `audio_url` via den kun-offentlige
   utgående vakten med DNS-pinning og en grense på 25 MB. Deretter POST-er den
   filen og den valgte modellen til den lokale `/v1/audio/transcriptions`-selv-loopen,
   autentisert med `resolveSelfLoopBearer()`. Den eksisterende
   transkripsjonsruten utfører normalt legitimasjonsoppslag, håndtering av
   nedkjøling/rate-limit og distribusjon til leverandør.
5. Vellykkede kall erstatter delene sine med `[Audio N]: <transcript>`. Kall
   kjøres med `Promise.allSettled`: en enkeltstående feil bevarer den
   opprinnelige lyddelen (#4012-kontrakt). Hvis alle kall feiler og målet er
   bevist å være `supportsAudio === false`, blir delene
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakt). For
   et ukjent mål (`null`) forblir et resultat der alle kall feiler urørt. Et
   bevist rent tekstbasert mål uten brukbar STT-legitimasjon mottar samme
   eksplisitte stub uten å sende et nettverkskall.

Vellykkede transkripsjoner bruker det prosessomfattende Modality Bridge
LRU/TTL-hurtigbufferet. Nøkkelen kombinerer lydreferansen, den stabile
`audio-transcription`-operasjonsetiketten og valgt STT-modell; feil hurtigbufres
aldri. Lyd­forsøk oppdaterer de delte tellerne `bridged`, `cacheHits`,
`failures` og `lastUsedAt`. Transformerte svar bærer
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; urørte
forespørsler får ikke noe Audio Bridge-segment.

Kjøretidsinnstillinger er DB-støttede og Zod-validerte:

| Nøkkel                        | Standard | Område                  |
| ----------------------------- | -------- | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                       |
| `modalityBridgeAudioModel`    | `""`     | Automatisk eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                    |

Det delte hurtigbufferet forblir styrt av `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fanger opp videodeler på toppnivå i Chat Completions `messages` og Responses
API `input` før et mål uten kjent innebygd videostøtte kalles. Støttede
formater er `input_video`, `video_url`, `video_source`, HTTPS-URL-er og
`data:video/*;base64,...`-data-URI-er. Vanlige filnavn i tekst behandles ikke
som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) eier traverseringen av
forespørsler, kapabilitets-/policy-sjekken, aggregering per forespørsel og
svarnyttelasten. Arbeidet per video — innhenting, hurtigbufferet for hele
resultatet, beskrivelse av en bildesekvens (som slår sammen et eventuelt
innringerdeklarert lydtranskripsjon) og målinger/avbrudd/opprydding per
forsøk — er skjult bak `processVideoPart` i `videoBridgePipeline.ts`, som
kalles én gang per videodel inne i løkken til `preCall`. Den modulen definerer
også de eksplisitte portgrensene `VideoMediaBrokerPort` (innhenting av bytes og
uttrekking av utsamplede bilder), `VideoAudioTranscriptionPort` (sammenslåing
av et innringerdeklarert lydtranskripsjon med de utsamplede bildetekstene) og
`VideoDrilldownPort` (persistensgrensen for bilde-drill-down; ennå ikke koblet
inn i `processVideoPart` — bare den separate
`/api/modality-bridge/video/drilldown`-ruten skriver drill-down-oppføringer i
dag).

Den offentlige `/v1`-forespørselsstien importerer eller starter aldri en
underprosess. Eksterne videoer lastes ned innenfor en grense på 50 MiB;
innebygde base64-videoer har et konservativt dekodet tak per video på 36 MiB,
slik at konvolutten for modell/meldinger/innramming kan holde seg innenfor den
offentlige inntaksgrensen for JSON-forespørsler på 50 MiB. Innebygd lengde og
estimater for dekodet størrelse kontrolleres før allokering. HTTPS kreves på
den opprinnelige eksterne URL-en og hver omdirigering, via den eksisterende
kun-offentlige utgående vakten med DNS-pinning. Bytene krysser deretter den
nøyaktige interne `POST /api/modality-bridge/video/extract`-meglergrensen. Den
ruten er både `LOCAL_ONLY` og `SPAWN_CAPABLE`, aksepterer kun en
per-prosess-autentisert forespørsel fra betrodd loopback, og aksepterer aldri
en URL, filsystemsti, kjørbar fil eller argumentliste. API-ets pipeline for
kroppsstørrelse og behandlerens inkrementelle kroppleser håndhever uavhengig
av hverandre et inndatatak for megleren på 50 MiB. Dens begrensede kø kjører
én uttrekking om gangen, tillater fire ventende jobber og setter et tak på
100 MiB for ventende inndata.

Inne i brokeren leser `ffprobe` en privat lokal fil; den faste formattillatelseslisten utelukker spilleliste- og manifestformater. For tillatte containere i MOV-familien forblir eksterne MOV-datareferanser deaktivert som standard, og den faste kommandoen aktiverer dem ikke. Både `ffprobe` og `ffmpeg` bruker protokollhvitelisten som bare tillater `file`, én tråd, faste argumentmatriser, ingen skall, og kjørbare filer som slås opp via `PATH`. Strømmer med vedlagt coverbilde er ikke avspillbare kandidater. Alle avspillbare strømmer må oppfylle begrensningene, og en eksplisitt standardstrøm foretrekkes fremfor det deterministiske tilbakefallet til laveste indeks. Videoer er begrenset til 600 sekunder, 8 192 piksler per dimensjon og 33 554 432 kildepiksler. FFmpeg tar ut 1–16 JPEG-bilder fra midtpunkter, skalerer ned den lange kanten til maksimalt 1 024 piksler uten å oppskalere mindre inndata, og mottar aldri en URL. Samplingen er `uniform` som standard. De valgfrie policyene `scene_aware` og den eksperimentelle `segment_aware` utfører én ekstra fast FFmpeg-passering over den allerede validerte lokale strømmen, velger et begrenset antall scenetidsstempler fra `showinfo`, og faller deterministisk tilbake til de samme uniforme midtpunktene ved detektorfeil, tidsavbrudd, feilformatert utdata eller et tomt kandidatsett. Segmentbevisst modus fordeler midtpunktprøvene proporsjonalt med de validerte sceneintervallene; evidens og tilbakefallsatferd for segmentbevisst modus er beskrevet nedenfor. Det harde taket på 16 bilder håndheves etter utvalget i alle policyer. Når en scenebevisst forespørsel bare har budsjett til étt bilde, brukes det uniforme midtpunktet i det aktive helvideo- eller fokusvinduet, og den rapporterer `policyEffective: uniform`: ett enkelt valgt scenebilde kan ikke bevare begge ender i tid. En kaller kan valgfritt oppgi et endelig fokusvindu (`start`/`end` i sekunder); grensene klemmes til mediets varighet, reverserte eller ikke-endelige vinduer avvises, og alle samplingspolicyer utføres kun innenfor det normaliserte intervallet. Det resulterende vinduet tas med i samplingsmetadataene og i prefikset for den ikke-tiltrodde beskrivelsen, slik at nedstrømsmodeller kan skille et fokusert utdrag fra hele tidslinjen.

Semantisk bildetekstfokus er en egen, eksplisitt innstilling. Standardanalysemodusen `full` beholder den eksisterende bildeprompten og videresender aldri forespørselstekst til bildetekstmodellen. I `focused`-modus leser broen bare den nyeste ikke-tomme brukerforfattede `text`/`input_text` fra samme Chat- eller Responses-beholder, normaliserer den til NFC, kollapser kontrolltegn og mellomrom, og begrenser den til 500 Unicode-kodepunkter. Et tomt resultat faller tilbake til nøyaktig `full`-prompten. Et brukbart hint serialiseres som JSON i en dedikert blokk for ikke-tiltrodd brukerkontekst og kan bare prioritere observerbare detaljer; det kan ikke overstyre den separate advarselen mot å følge instruksjoner som er synlige eller hørbare i mediet. Tekstuelt fokus utleder aldri `start`/`end` og endrer ikke den tidsmessige sampleren.

#### FU-07 strukturell segmentevidens

`segment_aware` kjører én begrenset forhåndsanalyserunde over den allerede validerte lokale videostrømmen. Den faste filterkjeden skalerer først til maksimalt 320 piksler i bredden, detekterer sceneendringer og frosne intervaller, og tar deretter prøver med 1 bilde per sekund for uskarphet, gjennomsnittlig luma og romlig/tidsmessig informasjon. Passeringen er begrenset til 600 strukturelle prøver, én FFmpeg-/filtertråd, de samme tillatelseslistene for protokoll (kun `file`) og containere, en øvre grense på 1 MiB for prosessutdata, og maksimalt 30 sekunder innenfor brokerens delte avbrudd/tidsfrist. Den aksepterer aldri en kommando, et filter, en sti eller en URL fra forespørselen.

De strukturelle verdiene er deterministisk samplingsevidens, ikke semantisk videoforståelse. De utleder verken subjekter, handlinger, bildetekster, tale eller brukerintensjon. Scene- og frysegrenser danner segmenter; frysedekning, uskarphet, eksponering, romlig detaljnivå og tidsmessig endring påvirker bare hvordan det eksisterende budsjettet på 1–16 bilder fordeles. Et fullstendig frosset segment er begrenset til étt bilde, mens ikke-frosne segmenter konkurrerer om resten av budsjettet. Når det er flere grenser enn bilder, beholdes uniform tidslinjedekning, slik at raske klipp tidlig i videoen ikke kan skjule et langt etterfølgende segment. Scenegrenser som ligger innenfor analyseoppløsningen på 1 sekund fra en frysegrense, slås sammen.

Manglende filtre, feilformatert/tom evidens, en detektorfeil eller tidsavbruddet for den begrensede forhåndsanalysen feiler åpent til nøyaktig den uniforme midtpunktspolicyen. Et kalleravbrudd eller en broker-tidsfrist feiler ikke åpent: det avslutter den pågående delprosessen, hindrer senere bildeuttrekk, og det private midlertidige katalogtreet fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske, ekte FFmpeg-fiksturer for besparelser i bildetekstkall etter deduplisering, budsjettfordeling ved tett bevegelse, uskarphet-/eksponering-/SI-TI-evidens, raske klipp med lang hale, og falske positiver ved gradvis uttoning. Den registrerer veggklokketid for forhåndsanalysen og, der `/usr/bin/time` er tilgjengelig, barneprosessens CPU-forbruk og høyeste RSS. Kvalitetssjekkene er kun strukturelle orakler. Reell bildetekstmodellkvalitet forblir `HOLD`, fordi dette testrammeverket ikke har noe autorisert endepunkt eller noen frosset dommer. Økonomiske besparelser forblir også `HOLD`, med mindre `--caption-cost-per-call-usd` gir et eksplisitt positivt estimat per kall; skriptet fabrikkerer aldri noen av resultatene.

Hver ramme er begrenset til 4 MiB, alle rårammene til sammen til 23 MiB, og den
serialiserte broker-responsen til 32 MiB. En privat midlertidig katalog fjernes
i `finally`. OmniRoute leveres ikke med FFmpeg og godtar ikke en egendefinert
kjørbar filsti. Før teksting kjører broen et konservativt visuelt
dedupliseringspass: hver JPEG reduseres til en 16×16-gråtonebuffer og
sammenlignes bare med den sist beholdte rammen. For et forespurt
bildetekstbudsjett over én ramme leverer uttrekket et avgrenset kandidatutvalg
på opptil det dobbelte av budsjettet og aldri mer enn 16 rammer. Den forespurte
grensen brukes først etter deduplisering, med den første og siste valgte
kandidaten bevart under den endelige uttynningen når budsjettet er minst to.
Den versjonerte
`grayscale-16x16-mean-cells-v2`-policyen bruker den største verdien av
gjennomsnittlig luma-delta og andelen miniatyrbildesceller der den normaliserte
deltaen er minst 0.05. Duplikaterskelen er konstanten 0.04, valgt for
forutsigbarhet i stedet for å eksponeres som en kjøretidsinnstilling. Dette
sekundære høykontrast-signalet bevarer små bevegelser og endringer i synlig
tekst som en sammenligning kun basert på gjennomsnitt kan skjule. Komparator-
eller dekoderfeil feiler åpent og bevarer dekningen. Utdata-metadata skiller
uttrukne kandidater, rammer som ble brukt, og visuelle duplikater som ble
forkastet.

En eksplisitt merket videodel kan be om et tidsstemplet kontaktark. Broen
bygger maksimalt et JPEG-rutenett med 4 kolonner og 16 rammer. Hver
512-piksel-celle brenner kildetidsstempelet sitt inn i et høykontrast-bånd
nederst, mens de samme tidsstemplene forblir i tekstlige metadata for
nedstrømsassosiasjon og revisjon. Den fullstendige JPEG-en forblir begrenset
til 32 MiB. Hvis `sharp` ikke kan dekode eller sette sammen rutenettet, faller
broen tilbake til de individuelle JPEG-rammene; et klientavbrudd propagerer
fortsatt gjennom arkoperasjonen.

Promoteringsbevis holdes bevisst adskilt fra den syntetiske
sammensetningsmikrobenchmarken. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definerer en skjemaversjonert A/B-testsele for ekte OpenAI-kompatible
visjonsmodeller. Den måler leverandørrapporterte tokens,
ende-til-ende-veggklokkelatens (inkludert arksammensetning), antall modellkall
og manifestdefinert faktabevaring. Råe modellsvar skrives ikke til rapporten;
bare SHA-256-digester og matchede fakta-ID-er beholdes. Testselen foretar ingen
nettverks- eller betalte modellkall med mindre `--execute-real` sendes inn og
`--model`, `OMNIROUTE_BASE_URL` og `OMNIROUTE_API_KEY` er konfigurert. Uten
den eksplisitte ekte kjøringen forblir det maskinlesbare resultatet `HOLD`;
syntetiske målinger av nyttelast/kallantall alene er ikke promoteringsbevis.

Kallere kan knytte en valgfri `transcript.cues`-matrise til en støttet
videodel når de allerede har tidsjustert tekst. Hvert cue må inneholde `text`,
et endelig `start`/`end`-intervall innenfor den avmålte varigheten, og en
hvitelistet `source` (`client`, `embedded` eller `audio-bridge`); `confidence`
har standardverdi `1` og må forbli mellom `0` og `1`. Eksakte duplikat-cues
slås sammen. OmniRoute starter aldri transkripsjon fra disse metadataene:
validerte cues kopieres inn i det beskrevne resultatet med kilde, konfidens og
intervall, og gjengis som upålitelige observasjoner ved siden av
rammebildetekstene. Ugyldig tekst, tekst utenfor gyldig område eller tekst
uten opphavsangivelse avvises i stedet for å blandes inn i bildetekststrømmen.
Begge transkriptkanalene i forespørselskroppen normaliserer oppgitt opphav til
`client`, inkludert selverklærte `embedded`- eller `audio-bridge`-etiketter.
Bare en server-eid adapter kan tildele disse klarerte etikettene gjennom
`trustedSource`-argumentet, som bare er tilgjengelig fra kode; et JSON-felt i
forespørselen kan ikke nå dette argumentet. Transkripttekst forblir
upålitelig, medieavledet innhold, uavhengig av opphavet, og må aldri avgjøre
autorisasjon.

En avansert kaller kan levere et `audioTranscript`-spor for samme video; det
behandles som klientlevert tekst, ikke bevis på serversidetranskripsjon.
Fusjonsskjøten kjører visuelle observasjoner og lydobservasjoner under én
tidsfrist og ett avbruddssignal, ordner dem på en felles tidslinje, slår sammen
eksakte duplikater og rapporterer et delresultat når bare én side lykkes. Et
ugyldig `audioTranscript` degraderer til dette delresultatet – den visuelle
beskrivelsen beholdes, og lydgrenen registrerer en sanitert feilkode – i stedet
for at hele videoen feiler. Tilgjengelighet per gren, delresultat-flagget og de
sanitiserte feilkodene bevares i det beskrevne resultatet, i
guardrail-metadataene (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i metadataene for resultathurtigbufferen og i
broens fusjonstellere. Standard Video Bridge-sti verken starter tale-til-tekst
eller laster ned en ekstra mediekopi; uten det eksplisitte sporet forblir den
kun video.

**Bevaring av transkripsjoner (#12150 P1).** Dette gjelder automatisk når
Video Bridge (som i seg selv er opt-in) gjengir en transkripsjons-cue — det finnes
ikke noe separat bevaringsflagg. Når en forespørsel gjengir en transkripsjons-cue
(enten en oppkallerdeklarert `transcript` eller en sammenslått `audioTranscript`),
markerer guardrailen den som `videoBridgeObserved` og produserer en sladdet skygge
av videobeskrivelsen — en identisk gjengivelse der hver cues fritekstkropp
erstattes med `[redacted-video-transcript]`, bygget ved å erstatte det strukturerte
cue-feltet før strengen settes sammen (aldri ved å parse den utflatede teksten,
slik at intet cue-innhold — ondsinnet eller vanlig, inkludert kropper som
inneholder `]`, som `[inaudible]`/`[music]` — kan overleve). Den persisterte
forespørselskroppen i anropsloggen bytter ut hver videoavledede tekstdel med den
sladded skyggen, matchet ved innholdslikhet; `fullText`-ankeret leses på nytt fra
den ferdige guardrail-payloaden før anropet, slik at matchingen fortsatt lykkes
etter at senere guardrails i kjeden (PII- og legitimasjonsmaskeringene,
prioritet 10/95) omskriver beskrivelsesteksten på stedet, og etter at
systemprompt-/handoff-/minneinjeksjon omformer meldingsarrayen. Kroppen som sendes
oppstrøms til modellen, er uendret. En observert forespørsel populerer heller
ingen varig Memory (både forespørsels- og responsavledet ekstraksjon hoppes over),
slik at modellens eget svar ikke kan gjengi transkripsjonstekst inn i Memory.

**Rå videofelt (#12430).** Når broen er aktivert og innebygd videostøtte er ukjent
eller fraværende, aktiverer definerte `transcript`/`audioTranscript`-felt også
`videoBridgeObserved`, selv etter beskrivelsesfeil eller en `maxVideos`-grense.
`null` og tomme strenger teller; fraværende felt og ikke-video-metadata gjør ikke
det. Bevarte kopier sladder disse feltene eller utelater forespørselen, og
cacher/Memory omgås.

På disse fallback-stiene blir gyldige oppkaller-cues til støttede
`text`/`input_text`-deler i stedet for ikke-standard leverandørfelt. Begge
forespørselsleverte spor forblir ikke-tiltrodde `client`-observasjoner, med en
eksplisitt advarsel om at videoen ikke ble beskrevet og at tidsstempler ikke ble
verifisert mot mediet. De eksisterende budsjettene på 256 cues/64 KiB totalt og
per cue gjelder på tvers av de to sporene samlet; tidsstempler må ligge innenfor
brokerens tak på 600 sekunder og et eventuelt angitt fokusvindu. Ugyldige spor
forkastes — de videresendes ikke som vilkårlig tekst; et gyldig søskenspor kan
fortsatt brukes med mindre det samlede budsjettet deres overskrides. Null-/tomme
felt tilfører ingen tekst. Denne fallbacken legger ikke til noen mediehenting
eller transkribering. Transkripsjonsutvidelsesfelt fjernes fra
fallback-videobæreren og dens `video_url`/`source`-objekter. OpenAIs
wire-tillatelsesliste forblir streng; videobærere med ukjent innebygd støtte
forblir tilgjengelige, og kjente kun-tekst-mål beholder trygge markører.
Strukturerte sladdeskygger beskytter den tilføyde transkripsjonsteksten, mens den
opprinnelige oppkaller-eide forespørselen forblir uendret. Mål med innebygd
støtte og deaktiverte broer beholder sin eksisterende omgåelsesatferd.

Ytterligere bevarte kopier bruker det samme signalet for observerte forespørsler.
Det rå øyeblikksbildet av klientforespørselen før guardrail, den ventende
forespørselen i minnet og den tidlige loggen over avviste forespørsler erstatter
transkripsjonsfelt i videodeler strukturelt; strengprompter som syntetiseres av
pipeline-steg og kontekst-handoff sladdes ved sinken for den persisterte
forespørselskroppen. Den persisterte `video_content_removed`-markøren gjør at
`previous_response_id`-fortsettelse feiler lukket i stedet for å rekonstruere
tekst som ble kastet med vilje. Hvis en observert forespørsel mister
sladdeskyggen sin per del før logging, eller til og med én av flere videoskygger
ikke matcher etter senere forespørselsmutasjoner, utelates den bevarte
forespørselskroppen helt i stedet for å beholde en delvis sladdet transkripsjon.

For en observert forespørsel kan et modellsvar sitere hvilken som helst del av
transkripsjonen uten en strukturert cue-grense. Den persisterte `responseBody`-en
i anropsloggen erstattes derfor med en utelatelsesmarkør; det detaljerte
pipeline-artefaktet (som kan inkludere oppstrøms-/klientkropper og strømchunks)
beholdes ikke. Semantiske cacher, idempotenscacher og resonnements-replay-cacher
omgår både lesing og skriving for den forespørselen. Leverandørforespørselen og
det klient-synlige svaret forblir uendret. Tidlige keepalive-bytes tømmes fra den
midlertidige bufferen når det detaljerte artefaktet utelates. Kiros advarsel om
feilformatert EventStream rapporterer bare byteantallet i payloaden, aldri
innholdet eller JSON-parserens rå feil.
Dette hevder ikke at all urelatert leverandør-/plugin-diagnostikk er revidert;
den bredere utfeiingen av bevaringssinker spores i #11658.

Den interne `/api/modality-bridge/video/drilldown`-livssyklusen er et separat,
loopback-/token-autentisert cache-substrat. Hver operasjon krever også en
kanonisk, ugjennomsiktig principal-ID. Før en produksjonsoppkaller aktiveres, må
den utlede den ID-en fra den autentiserte tenanten, og den må aldri videresende
en klientvalgt verdi. Cache-nøkler binder den principalen til kanoniske sesjons-
og videoreferanse-ID-er, lagrer bare deres SHA-256-avledede nøkler, og avgrenser
både lesing og sletting til samme principal. Cachen lagrer maksimalt 16 avledede
JPEG-rammer per oppføring, lar dem utløpe etter ti minutter, og støtter
begrensede `start`/`end`-lesinger eller eksplisitt sesjonssletting.

Hver principal er begrenset til 16 oppføringer og 64 MiB kanoniske JPEG-data.
Disse grensene er uavhengige av det globale taket på 64 oppføringer/256 MiB:
kvotetrykk for en principal kaster bare ut den principalens minst nylig brukte
oppføringer før global LRU-utkasting vurderes. Utløpte oppføringer feies ut fra
både principal- og global regnskapsføring ved cacheaktivitet, mens kansellering
og valideringsfeil ikke forplikter en delvis erstatning.

Hurtigbufferen avviser ikke-kanonisk Base64, overflødig utfylling, medier som ikke er JPEG, feilformede eller avkuttede JPEG-er, samt JPEG-er som gir en advarsel under en avgrenset `sharp`-dekoding av hele bildet. Den koder hvert godkjente bilde om til en kanonisk JPEG, utleder bredde og høyde fra de dekodede bytene i stedet for å stole på felter fra avsenderen, og forkaster eventuelle etterhengte polyglott-byter i stedet for å beholde dem. Bare den avgrensede kanoniske komprimerte bufferen belastes begge kvotene. JSON-overføringsgrensen inkluderer Base64-overhead for taket på 32 MiB dekodet inndata. Hver lagrede derivering registrerer sitt validerte JPEG-format/oppløsning, utvalgspolicy, deriveringsversjon, opprettelsestidspunkt, serverberegnet innholds-hash og hashet overordnet referanse, pluss den klarerte avsenderens overordnede innholds-hash. Kansellering sjekkes mellom asynkrone dekode-/hash-faser før den atomiske hurtigbuffer-innsjekkingen.

Denne leveransen kobler ennå ikke en produksjonsprodusent til ruten og tilbyr heller ikke valg av varianter med flere oppløsninger. Den transparente Video Bridge-forespørselsveien medfører derfor ikke noe ekstra arbeid, mens leietakerbundet principal-derivering og hele FU-08-livssyklusen for flere oppløsninger forblir eksplisitt oppfølgingsarbeid i stedet for å være dokumentert som fullført funksjonalitet.

Rammer får bildetekster sekvensielt med den konfigurerte Video-modellen. En tom Video-overstyring arver Vision-innstillingen; hvis begge er tomme, velger Vision-auto-ruteren den effektive synskompatible modellen. Vellykkede bildetekster erstatter den opprinnelige delen med et stabilt `[Video description:`-prefiks som også markerer teksten som en ikke-klarert medieavledet observasjon, og som forteller nedstrømsmodeller at de ikke skal følge instruksjoner funnet i mediet. Hurtigbuffernøkler for rammebildetekster inkluderer JPEG-bytene, prompten, tidsstempelet og den effektive modellen; bare vellykkede bildetekster hurtigbufres. Hurtigbufferoppføringer beholder den faktiske vellykkede produsentmodellen, inkludert en eventuell reservemodell; broen rapporterer `mixed` når ulike rammer ble produsert av ulike modeller. Et hurtigbuffertreff gjenbruker den produsentidentiteten i stedet for å omdøpe den til den forespurte rutingsplanen. Resultathurtigbufferen for hele videoen er nøkket på alle inndata som endrer utdataene — prompt, effektiv modell, utvalgspolicy, rammeantall, semantisk analysemodus, SHA-256-fingeravtrykket til det normaliserte fokushintet, fokusvindu, `transcript`, `audioTranscript` og kontaktark-flagget — slik at en endring i en hvilken som helst av disse dimensjonene er en hurtigbufferbom, aldri en foreldet gjenbruk. Versjonen av den visuelle dedupliseringspolicyen, terskelen og det avgrensede antallet kandidatrammer er også eksplisitte i resultathurtigbuffer-nøkkelen og metadataene; en policyendring kan derfor ikke gjenbruke en foreldet helvideobeskrivelse. Resultathurtigbufferens v4-metadata beholder modusen og fingeravtrykket, aldri den rå brukeroppgaven. Guardrail-metadata rapporterer både forespurt og effektiv analysemodus; en forespurt `focused`-modus uten brukbar brukertekst rapporteres som effektivt `full`.

Guardrailen trekker ut hver støttede videodel, men beskriver ikke flere enn `modalityBridgeVideoMaxVideos`. For et mål som er bevist å ha `supportsVideo === false`, blir mislykkede videoer og videoer over grensen til eksplisitte trygge tekstmarkører, slik at ingen rå video overlever. Når kapasiteten er ukjent, beholder disse delene sin videobærer; et eventuelt reservetranskripsjon følger den avgrensede tekstkonverteringen ovenfor. Mål med `supportsVideo === true` går utenom broen. Klientforespørselens avbruddssignal propagerer gjennom nedlasting, meglerkø, underprosesser og bildetekstkall; avbrudd stopper mellom videoer og feiler aldri åpent til rå media.

Kjøretidsinnstillinger er DB-støttet og Zod-validerte:

| Nøkkel                              | Standard    | Område / oppførsel                                                                                        |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri kjøretid, må aktiveres eksplisitt                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarer generiske bildetekster; `focused` bruker avgrenset, ikke-klarert kontekst fra siste bruker |
| `modalityBridgeVideoModel`          | `""`        | Arver Vision Bridge-modellen                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proporsjonal `segment_aware`; detektorfeil faller tilbake til `uniform`    |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                            |

Eldre lagrede Video-timeout-verdier over 120 sekunder klemmes til meglerens frist; nye innstillingsskrivinger over den grensen avvises.
`GET /api/modality-bridge/video/runtime` krever klarert stemplet loopback-lokalitet før autentisering eller kjøretidssondering, og krever deretter administrasjonsautentisering. Den returnerer bare `available`, saniterte FFmpeg/ffprobe-versjoner, og en fast årsak når kjøretiden er utilgjengelig. Det interne uttrekkingsendepunktet er ikke et offentlig opplastings-API: kømetning returnerer `503` pluss `Retry-After`, en avsenderfrakobling returnerer `499`, og den faste meglerfristen returnerer `504`. Konverterte svar legger `video->text;model=<visionModel>;parts=<videos>` til den sentrale `x-omniroute-modality-bridge`-headeren uten å fjerne Vision- eller Audio-segmenter.

### PII Masker (`piiMasker.ts`)

Kjører i **begge** trinnene.

- **`preCall`** kloner nyttelasten, går gjennom `system`, `messages`, `input`
  og `prompt` (inkludert enkle streng-elementer), og bruker `processPII()` (fra
  `@/shared/utils/inputSanitizer`) på `content`/`text`-felt av typen streng. Når
  `PII_REDACTION_ENABLED=true`, blir oppdaget PII sladdet i den utgående
  nyttelasten. Dette er uavhengig av `INPUT_SANITIZER_MODE` (som kun styrer
  policyen for prompt-injeksjon). Når sladding er av, registrerer kallet
  deteksjonstall uten å omskrive innhold.
- **`postCall`** dypkloner responsen, kjører `sanitizePIIResponse()` pluss
  maskeringen for Responses-API-formen (`maskResponsesOutput` — dekker
  `output_text` og `output[].content[].text`). Hvis sladding finner sted,
  erstatter den endrede responsen originalen.

Guardrailen blokkerer aldri; den annoterer bare (`meta.detections`,
`meta.redacted`) eller omskriver.

#### Valg per type, egendefinerte mønstre og deteksjonstellere

**Dashboard → Settings → Security → PII masking** velger _hva_ som maskeres.
Den slår ikke maskering på: det er fortsatt `PII_REDACTION_ENABLED` (forespørsel)
og `PII_RESPONSE_SANITIZATION` (respons + SSE), begge av som standard.

- **Valg per type** — de innebygde ID-ene er oppført i
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ikke satt betyr alle
  typer (oppførselen slik den var før denne innstillingen fantes).
  Forespørselsmotorens `ssn_us`-mønster mapper til `ssn`. Maler (Minimal,
  Standard, Financial, Brazilian, USA, Full) fyller bare ut avkrysningsboksene
  i brukergrensesnittet.
- **Egendefinerte mønstre** — opptil 20 regex- eller jokertegnmønstre (`*` =
  opptil 64 tegn som ikke er whitespace, `?` = ett). Treff blir
  `[CUSTOM_REDACTED]`. Hvert mønster går gjennom `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): maks 500 tegn, flagg begrenset til
  `g i m s u`, må kunne kompileres, må bestå `safe-regex` (katastrofal
  tilbakesporing), og må ikke matche en tom streng eller en plassholder for
  sladding. Et mønster som ikke består, avvises ved lagring og ved testing, og
  en lagret rad som ikke består, hoppes over under kjøring i stedet for å
  kompileres. Egendefinerte mønstre kjøres bare mens maskering er på.
- **Deteksjonstellere** — tellinger per type (aldri matchede verdier), holdt i
  minnet og tilbakestilt ved omstart (`src/lib/pii/piiDetectionStats.ts`). De
  øker bare mens maskering er på.

Innstillingene ligger i `key_value`-tabellen (navnerom `pii_settings`,
`src/lib/db/piiSettings.ts`) og leses via en cache på 1 s. API:

| Metode | Sti                      | Formål                                                             |
| ------ | ------------------------ | ------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Flaggtilstand, `enabledTypes`, `customPatterns`, deteksjonstellere |
| `PUT`  | `/api/settings/pii`      | Erstatt `enabledTypes` (`null` = alle) og/eller `customPatterns`   |
| `POST` | `/api/settings/pii/test` | Testkjør ett mønster mot et utdrag på maks 8 KB; ingenting lagres  |

Alle tre krever administrasjonsautentisering og validerer forespørselskroppen
med Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt-injeksjon (`promptInjection.ts`)

Oppdager fiendtlige strukturer i brukerlevert innhold og håndhever den
konfigurerte policyen. Oppførsel styres av miljøvariabler og
konstruktøralternativer:

| Innstilling       | Miljøvariabel                                                                                             | Standard | Effekt                                                                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivert          | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`   | Når `false` kortslutter guardrailen.                                                                                                                                                                       |
| Modus             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`   | Injeksjonspolicy: `block`, `warn` eller `log`. (`redact` aksepteres for bakoverkompatibilitet, men fjerner **ikke** injeksjonstekst; omskriving av PII i forespørselen styres av `PII_REDACTION_ENABLED`.) |
| Blokkeringsgrense | `blockThreshold`-alternativ / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Laveste alvorlighetsgrad som kreves for å blokkere. Medium er kun til observasjon ved standard.                                                                                                            |

**Moduspresedens** (`getMode`): oppkallerens `options.mode` →
`INJECTION_GUARD_MODE` **DB-overstyring av feature-flagg** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. En dashboard-overstyring vinner derfor over miljøvariablene, slik at
Feature Flags-grensesnittet styrer den kjørende guardrailen direkte (uten
omstart). DB-lesingen er feilsikker: hvis den feiler, faller guardrailen
tilbake til den miljøbaserte oppførselen, og når ingen overstyring er satt, er
oppførselen identisk med oppløsning basert kun på miljøvariabler.

Deteksjonskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (delt detektorsett
   som brukes andre steder i pipelinen).
2. Innebygde `DEFAULT_GUARD_PATTERNS` (per nå `system_override_inline` og
   `markdown_system_block`, begge med alvorlighetsgrad `high`).
3. Valgfrie `customPatterns` sendt inn via konstruktøralternativer (strenger,
   regex eller `{ name, pattern, severity }`-poster).

Når `mode === "block"` **og** minst én deteksjon når alvorlighetsterskelen,
returnerer `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I `warn`/`log`-modus logger guardrailen, men
tillater kallet. Den delte hjelpefunksjonen `evaluatePromptInjection()` er også
eksportert for kallere som trenger å evaluere prompter uten å gå gjennom registeret.

**Skannegrense (v3.8.20):** detektoren undersøker bare de **første 16 KB** av
den sammenføyde promptteksten — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` kjører `slice(0, MAX_INJECTION_SCAN_BYTES)` før
mønsterløkken startes. Injeksjonsdirektiver ligger nær toppen av en inndata, så dette
setter en grense for regex-CPU/GC på nyttelaster på flere hundre KB uten å svekke deteksjonen (jf.
#3932, #4041).

### Legitimasjonsmaskerer (`credentialMasker.ts`)

Kjører i **begge** stadiene, sist i standardkjeden (prioritet `95`). Maskerer
velkjente mønstre for API-nøkler / hemmelige tokens fra den utgående nyttelasten (meldings-
innhold, verktøykallargumenter, verktøyresultater) **og** leverandørresponsen, slik at en
legitimasjon som limes inn i en prompt (eller gjengis tilbake av et verktøyresultat) ikke lekkes
til oppstrømsleverandøren eller tilbake til klienten.

- **Kun opt-in**, samme konvensjon som PII-maskering (nært beslektet med Hard Rule #20):
  deaktivert med mindre `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er av, er guardrailen en no-op —
  den blokkerer aldri og skriver aldri om.
- `redactCredentials()` gjennomgår hele nyttelast-/responstreet (`walkValue()`,
  sikker mot prototype pollution, syklussikker via `WeakSet`) og erstatter treff med
  en `[REDACTED:<type>]`-plassholder, og kloner bare grenene som faktisk
  ble endret.
- `CREDENTIAL_PATTERNS` dekker LLM-leverandørnøkler (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøkler (Stripe, Square), sky-
  nøkler (AWS-tilgangsnøkkel, Twilio, SendGrid, Mailgun), private nøkler / JWT-er,
  tilkoblingsstrenger med legitimasjon (`mongodb://user:pass@...` osv.) og
  et generisk `Authorization`/`x-api-key`/`api-key`/`apikey`-headerverdi-
  mønster. Header-formede nøkler (`authorization`, `x-api-key`, `api-key`,
  `apikey`) maskeres strukturelt (kun verdien, skemaprefiks som
  `Bearer `/`Basic ` bevares) i stedet for via den generiske tekst-regexen.
- Guardrailen blokkerer aldri; den skriver bare om (`modifiedPayload` /
  `modifiedResponse`) og annoterer (`meta.credentialsRedacted`, `meta.count`).

Regresjonsvakt: `tests/unit/credential-masker-guardrail.test.ts`.

## Basekontrakt (`base.ts`)

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

En guardrail signaliserer «ingen endring» ved å returnere enten `void`, `{}` eller
`{ block: false }`. Å returnere en `modifiedPayload`/`modifiedResponse` erstatter
verdien som flyter gjennom kjeden for nedstrøms guardrails.
`signal?: AbortSignal` fører livssyklusen til oppkalleren inn i guardrails. Et
forespørselsavbrudd er det bevisste fail-open-unntaket: mediebroer stopper arbeidet
og rydder opp uten å gjenopprette råmedier til et mål som er kjent for ikke å støtte det.

## Register (`registry.ts`)

Singleton-objektet `guardrailRegistry` eksponerer:

- `register(guardrail)` — legger til (eller erstatter etter normalisert navn) en guardrail og
  sorterer på nytt etter stigende `priority`.
- `clear()` / `list()` — administrative hjelpefunksjoner.
- `runPreCallHooks(payload, context)` — itererer over aktive guardrails, fører
  nyttelasten gjennom `modifiedPayload`, og stopper ved første `block: true`.
- `runPostCallHooks(response, context)` — samme flyt på svarsiden.
- `resetGuardrailsForTests({ registerDefaults })` — tømmer tilstanden og registrerer
  eventuelt standardene på nytt for ren testisolering.

Begge kjøringsfunksjonene returnerer `{ blocked, payload|response, results, guardrail?, message? }`
der `results` er en matrise av `GuardrailExecutionResult`-poster som inneholder
feltene `blocked`, `skipped`, `modified`, `error` og `meta` per guardrail,
nyttig for sporing.

### Deaktivering av guardrails per forespørsel

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` samler en
deduplisert liste over guardrail-navn som skal hoppes over for gjeldende
forespørsel. Det finnes fem kanaler som leses i denne rekkefølgen og slås
sammen til én liste (første forekomst vinner ved deduplisering):

1. `apiKeyInfo.disabledGuardrails`
2. Forespørselskroppens `disabledGuardrails` (toppnivå)
3. Forespørselskroppens `metadata.disabledGuardrails` (bare når `metadata` er et objekt)
4. Headeren `x-omniroute-disabled-guardrails`
5. Legacy-headeren `x-disabled-guardrails`

Alle fem kanalene slås sammen, inkludert de to headerne: å sende både
`x-omniroute-disabled-guardrails` og `x-disabled-guardrails` hopper over unionen av
listene deres, og en tom moderne header skjuler ikke lenger den eldre
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), fikset i
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Verdiene kan være strengmatriser eller en kommaseparert streng; navn trimmes
og normaliseres til kebab-case med små bokstaver (`pii_masker` → `pii-masker`), og tomme
oppføringer forkastes. Resultatet sendes gjennom `context.disabledGuardrails`
til registeret, som hopper over samsvarende guardrails (`skipped: true` i `results`).

Deaktiveringslisten påvirker bare **registeret**. `block`-modusen for
prompt-injeksjon er en obligatorisk grense: injection-guard-mellomvaren
(`src/middleware/promptInjectionGuard.ts`) kaller `evaluatePromptInjection()`
uten noen oppkallerkontrollert deaktiveringsliste (det døde
`resolveDisabledGuardrails({ body })`-kallet den tidligere gjorde, ble fjernet i
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), slik at en forespørsel
som deaktiverer `prompt-injection` fortsatt avvises i `block`-modus. Dette er
tilsiktet. Deaktiveringskanalene er oppkallerkontrollerte (forespørselskropp,
metadata, headere), og en oppkaller må ikke kunne slå av en sikkerhetskontroll
som operatøren har satt
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Header-unionen
fra [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) endrer
bare hvilke register-guardrails som hoppes over; den lar ikke en klient omgå
mellomvaren. Obligatoriske guardrail-policyer per nøkkel og per gruppe spores i
v4-RFC-en [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Se [Dekning og begrensninger](#coverage-and-limits).

## Utførelsesrekkefølge

For hver forespørsel som går gjennom `src/sse/handlers/chat.ts` og
`open-sse/handlers/chatCore.ts` (rutene i chat-familien listet under
[Dekning og begrensninger](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` bygger hopp-over-listen fra API-nøkkel, body
   og headere.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kjører guardrails i stigende
   prioritetsrekkefølge:
   - Deaktiverte guardrails registreres som `skipped`.
   - Hver guardrails `preCall` kan omskrive payloaden via `modifiedPayload`.
   - Den første `block: true` kortslutter kjeden, og handleren returnerer
     et avvisningssvar fra guardrailen.
3. Den (potensielt omskrevne) payloaden går videre til combo-ruting og
   videresending til upstream.
4. **Kun ikke-strømming:** etter at svaret er satt sammen, kjører
   `guardrailRegistry.runPostCallHooks(...)` samme kjede på svaret. `block: true` her forkaster upstream-svaret og returnerer HTTP 400. Strømmede svar hopper helt over dette trinnet.

Guardrails som kaster, registreres med `error: <message>` og logges via
`logger.warn`, men kjeden fortsetter — fail-open etter design.

## Dekning og begrensninger

Guardrail-registeret er kun koblet inn i chat-pipelinen. Disse begrensningene er
låst av `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` og
`tests/unit/guardrail-pipeline-characterization.test.ts`; oppdater disse testene
bevisst når atferden endres.

### Hvor hookene kjører

| Hook / kontroll                     | Kjører på                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Forespørsler håndtert av `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (og `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` og Telegram-chat-proxyen. Også dashboardets testendepunkt `/api/guardrails/test`. En pre-call-blokkering returnerer HTTP 400. |
| `runPostCallHooks`                  | **Kun ikke-strømmede** chat-svar (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Strømmede svar når den aldri.                                                                                                                                                                                                                                                                                                                |
| Strømming av PII                    | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), koblet inn i `streamingPipeline.ts` når `PII_RESPONSE_SANITIZATION` er på. Den er ikke en guardrail, så deaktiveringskanalene påvirker den ikke.                                                                                                                                                                                                                        |
| Injection-guard-mellomvare (legacy) | Hver prompt-bærende `/v1`-rute, inkludert chat-familien (se [rutedekning](#injection-guard-route-coverage--red-team-phase-8--block-d)). Kun prompt injection.                                                                                                                                                                                                                                                                         |

### Hva som ikke er dekket

- **Media-, embeddings- og dataruter** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) når aldri registeret. Ingen
  PII-maskering, legitimasjonsmaskering eller modalitetsbro kjører der. Deres eneste
  kontroll er den eldre injection-guard-mellomvaren.
- **Strømmede svar** får ingen post-call-guardrails: ingen `pii-masker`- eller
  `credential-masker`-post-call, og ingen post-call-blokkering. Kun strømmingstransformen
  for PII gjelder (når `PII_RESPONSE_SANITIZATION` er på). En legitimasjon
  som sendes tilbake i et strømmet svar, blir ikke maskert.
- **Deaktiveringskanaler vs. mellomvaren (etter design):** mellomvaren evaluerer
  prompt injection med sitt eget kall til `evaluatePromptInjection()`, uten
  å sende inn noen kallerkontrollert deaktiveringsliste. `block`-modus er en
  obligatorisk grense som kallerkontrollerte deaktiveringer ikke kan omgå, inkludert på ruter i chat-familien
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Å deaktivere
  `prompt-injection` hopper bare over registerets guardrail.

### Hva som ser et svar før post-call

På stien uten strømming er rekkefølgen: minneekstraksjon → kjøring av innebygde
verktøy → post-call-guardrails → avslutning ved post-call-blokkering → lagring i semantisk hurtigbuffer.

- **Minneekstrahering** og **verktøykjøring** ser svaret før guardrails etter kallet kan omskrive eller blokkere det. Siden
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) kjører minneekstrahering
  den ekstraherte teksten gjennom `sanitizePII` når
  `PII_RESPONSE_SANITIZATION` er på (både strømming og ikke-strømming), men et
  svar som senere blokkeres etter kallet har allerede blitt tilbudt til minne og
  verktøy.
- **Den semantiske cachen** lagrer svaret etter kallet, så den lagrer det
  omskrevne svaret, og et blokkert svar blir aldri cachet. Cacheoppføringer er
  nøklet per API-nøkkel.

## Konfigurasjon

Miljøvariabler som leses av de innebygde sikkerhetsmekanismene:

| Variabel                              | Brukes av                | Effekt                                                                                                          |
| ------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Sett til `false` for å deaktivere deteksjonen helt.                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Injeksjonspolicy: `warn`, `block` eller `log`. Den foreldede verdien `redact` omskriver ikke injeksjonsteksten. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Modus for injeksjonsvakten; også et DB-funksjonsflagg som **overstyrer** miljøvariablene (DB > ENV).            |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Laveste alvorlighetsgrad som `MODE=block` avviser: `high` (standard), `medium` eller `low`.                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Foreldet alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                           |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Når `true` sladdes PII i forespørsler (uavhengig av injeksjonsmodus).                                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedstrøms) | Styrer maskeringsoppførselen på svarsiden.                                                                      |

Sikkerhetsmekanismene i Modality Bridge leser kjøretidskonfigurasjon fra den
DB-støttede innstillingslagringen (`getSettings()`), ikke fra miljøvariabler.
Primærnøklene for Vision er `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`. De eldre
`visionBridge*`-nøklene godtas kun som den dokumenterte reservelesingen i én
syklus; skriving fra dashbordet bruker primærnøklene. Standardverdiene og
fallback-resolveren ligger i `src/shared/constants/modalityBridgeDefaults.ts`,
med eldre konstanter beholdt i `src/shared/constants/visionBridgeDefaults.ts`.

Audio bruker `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips`, samt de delte
`modalityBridgeCache*`-innstillingene. Audio har ingen reservemekanisme for
eldre nøkler fordi disse nøklene ble introdusert med Modality Bridge-skjemaet.

Video bruker `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` og
`modalityBridgeVideoTimeout`, samt de delte `modalityBridgeCache*`-innstillingene.
Den er deaktivert som standard fordi FFmpeg/ffprobe er valgfrie
driftsavhengigheter, og teksting av bilderammer øker latens og modellkostnader.

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

Trinn:

1. Opprett `src/lib/guardrails/myGuardrail.ts` som utvider `BaseGuardrail`.
2. Implementer `preCall` og/eller `postCall`.
3. Registrer enten ved importtidspunktet (push fra `registerDefaultGuardrails`) eller
   kall `guardrailRegistry.register(...)` ved kjøretid — registeret erstatter
   enhver tidligere guardrail med samme normaliserte navn.
4. Legg til tester under `tests/unit/` (eksisterende eksempler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testing

Bruk `resetGuardrailsForTests()` mellom tester for å starte fra en kjent tilstand.
Send inn `{ registerDefaults: false }` for å starte med et tomt register og
bare registrere guardrailene som testes. Vision Bridge aksepterer
avhengighetsinjeksjon (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge eksponerer de
tilsvarende koblingspunktene for innstillinger, kapabiliteter, STT-modellvalg,
legitimasjonssjekker og transkripsjon. Testene kan dermed kjøre gjennom begge
flytene uten DB- eller nettverkstilgang.

## Se også

- `src/lib/guardrails/` — implementasjon
- `src/shared/utils/inputSanitizer.ts` — delt detektor som driver
  prompt-injection- og PII-maskering
- `src/shared/constants/visionBridgeDefaults.ts` — standardverdier for Vision Bridge og
  modellisten for tvungen bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — delte kjøretidsstandarder for Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lag (circuit breaker, nedkjølingsperioder)
- `docs/reference/ENVIRONMENT.md` — fullstendig referanse for miljøvariabler

## Rutedekning og red-team for injection-guard (fase 8 · blokk D)

Injection-guarden (`createInjectionGuard` / `withInjectionGuard`) dekker alle ruter
som aksepterer brukerprompts. Den respekterer `INJECTION_GUARD_MODE` (standard `warn` = kun logging;
`block` = returnerer HTTP 400 `SECURITY_001`).

| Type                 | Ruter                                                                                                                                                | Standardmodus |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Tekst (eksisterende) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativ            | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Tekstuttrekk (`extractMessageContents`) dekker `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nattlig, `nightly-llm-security.yml`):** promptfoo validerer at hver rute blokkerer
OWASP-LLM-korpuset i `INJECTION_GUARD_MODE=block`; garak kjører sonder (hoppes over uten hemmelighet).
`moderations` er inkludert for konsistens. Blokkmodus er en obligatorisk grense: `evaluatePromptInjection()`
ignorerer deaktiveringslisten per forespørsel som mellomvaren sender den, så `disabledGuardrails` fritar
**ikke** en rute fra den ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Den nattlige arbeidsflyten (`.github/workflows/nightly-llm-security.yml`, cron + manuell
utløsing) har to jobber:

- **`promptfoo-guard` (blokkerende)** — kjører `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Hvert adversariske tilfelle (f.eks. "ignore all
  previous instructions…", DAN-lignende jailbreaks) påstår at svaret inneholder
  `error.code === "SECURITY_001"`, dvs. at guarden faktisk avviste forespørselen.
- **`garak` (rådgivende)** — kjører garak `--probes promptinject,dan,leakreplay`
  mot en lokal OmniRoute-instans (`http://localhost:20128/v1`). Betinget av en
  leverandørhemmelighet (`PROMPTFOO_PROVIDER_KEY`); hoppes elegant over og er suffikset
  med `|| true`, slik at den rapporterer uten å feile CI.

Dekningen av guard-hjelperen (`createInjectionGuard` / `withInjectionGuard`)
spenner over hver prompt-bærende `/v1`-rute; prompttekst hentes fra
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` av
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
