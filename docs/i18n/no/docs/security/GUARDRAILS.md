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

## Innebygde sikkerhetsnett

Registeret laster automatisk inn seks sikkerhetsnett i prioritetsrekkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Trinn          | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetsnumre kjøres **først**.

### Vision Bridge (`visionBridge.ts`) — Modalitetsbro PR-1

Basismodellen GLM 5.3 og `glm-5.3-{low,high,max}` har eksplisitte
`supportsVision:false`-metadata i registeret/spesifikasjonen. GLM 5.3 Flash-variantene
forblir modeller med innebygd visionsstøtte. Claude Codes `/v1/messages`-rute går inn i
den delte `handleChat`-kjeden med sikkerhetsnett før oversettelsen fra Claude til OpenAI;
bilder i nestede `Read`-verktøyresultater må beskrives eller håndteres før denne
oversettelsen løfter dem til OpenAI-innhold av typen `image_url` (#17069).

Fanger opp forespørsler som inneholder bilder og er rettet mot **ikke-vision-modeller**, og
enten videresender hele forespørselen til en modell med visionsstøtte eller erstatter
bildedelene med tekstbeskrivelser produsert av en konfigurerbar vision-modell før
oppstrømskallet. Dette gjør at tekstbaserte leverandører transparent kan håndtere
multimodale nyttelaster.

Flyt:

1. Hopp over hvis målmodellen allerede støtter vision (med mindre den finnes i den
   tvungne brolisten `isVisionBridgeForcedModel`).
2. Trekk ut bildedeler via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **forenede mediedetektoren**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den eneste sannhetskilden som
   deles med kombofilteret for kompatibilitet.
   Uttrekket er begrenset til formene `replaceImageParts` kan sette inn igjen
   (uttrekk↔erstatning-kontrakten): OpenAI `image_url`, Anthropics base64
   `source.type:"base64"`, Anthropics URL `source.type:"url"` og Responses API
   `input_image`. Samsvarende bilder som ligger nestet i Claude Codes
   `tool_result.content` og Responses-verktøyutdata trekkes også ut og erstattes på de
   opprinnelige plasseringene; former som bare fungerer som indikatorer er materiale for
   kombofilteret og trekkes ikke ut.
   Hopp over hvis ingen blir funnet.
3. Løs kjøretidskonfigurasjonen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nye innstillingsnøkler med
   `modalityBridge*` vinner; eldre nøkler med `visionBridge*` beholdes som en
   **ett-syklusers tilbakefallsordning** (tilbakerullingsvindu). Hopp over før
   mediegjennomgang dersom broen er deaktivert.
4. Modusvelgeren (`modalityBridgeVisionMode`, se tabellen nedenfor) avgjør om forespørselen
   skal videresendes eller beskrives. Videresending returnerer `modifiedPayload` med bare
   `model` byttet ut, samt meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsesbanen: begrens antallet bilder til `maxImages`, sett sammen den
   oppgavebevisste ledeteksten, slå opp i beskrivelsesbufferet, kall vision-modellen
   **parallelt** (`Promise.allSettled`), og sett inn tekstdeleger av typen
   `[Image N]: <description>` på de opprinnelige plasseringene. En mislykket beskrivelse
   gir `null`: råbildet bevares for ukjente mål eller mål med visionsstøtte (#4012), men et
   **bekreftet tekstbasert direkte mål** eller en kombinasjon uten vision får en eksplisitt
   `(unavailable — no vision-capable provider connected)`-tekststubb for hvert bilde som
   ikke er beskrevet, inkludert delvise feil og bilder etter grensen for beskrivelseskall
   (#17069). Den eksisterende kombinasjonsreserveløsningen for tilfeller der alle
   beskrivelsene mislykkes, beholdes (#8430).
6. Returner `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Modusvelger (`modalityBridgeVisionMode`)

| Modus      | Standard | Virkemåte                                                                                                                                                                                                                                                                                                                               |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eldre heuristikk, uendret (#6640/#7204): modeller som ikke er kombinasjonsmodeller eller er `auto/`, videresendes til den beste vision-modellen med mindre den opprinnelige modellen allerede har brukbare legitimasjonsopplysninger (da beskrives bildene); kombinasjonsmål beskrives alltid.                                          |
| `describe` |          | Beskriv alltid — videresendingsblokken hoppes helt over; brukerens valgte modell svarer alltid.                                                                                                                                                                                                                                         |
| `reroute`  |          | Tving videresending: kontrollen for å beholde modellen med legitimasjonsopplysninger omgås. Kontroll av legitimasjonsopplysninger for videresendings-**målet** gjelder fortsatt — når det ikke finnes noe brukbart vision-mål, blokkerer broen med en tydelig feil i stedet for å beskrive eller sende råbilder til et tekstbasert mål. |

Tvungne moduser kortslutter **før** autoheuristikken kjøres; `auto`-virkemåten er
byte-identisk med sikkerhetsnettet før PR-1.

#### Omfang for API-nøkkel (`visionBridgeKeyScope.ts`)

Når innringerens API-nøkkel begrenser `allowedConnections`, kvotepooler
(`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), velger broen bare
omdirigerings- og beskrivelsesmodeller nøkkelen har tilgang til, på tilkoblinger
nøkkelen har tilgang til. Beskrivelseskallet går deretter alltid gjennom OmniRoute
selvsløyfen med headeren `x-omniroute-self-loop-key-id`, slik at den mottakende
chat-forespørselen håndhever tilkoblings- og modellpolicyen for nøkkelen på nytt.
`enforceApiKeyPolicy()` respekterer denne headeren bare sammen med
selvsløyfens bearer-token, slik at den bare kan begrense tilgangen, og en ID som
ikke kan slås opp, avvises.

Hvis ingen synsmodell er tillatt for nøkkelen, avviser et **bekreftet
tekstbasert mål** bildeforespørselen lokalt med en tydelig HTTP 400 i stedet for
å videresende bildebytes til en inkompatibel upstream (#17069). For mål med
ukjent eller innebygd synsstøtte beholder beskrivelsesbanen sin tidligere
fail-open-atferd (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Forespørsler uten nøkkel, og nøkler uten disse begrensningene, fungerer nøyaktig
som før.

#### Oppgavebevisst beskrivelsesforespørsel (`modalityBridgeVisionTaskAware`)

Standardverdi **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
legger til teksten i den **siste brukermeldingen** (avkortet til 500 tegn) i den
grunnleggende beskrivelsesforespørselen, slik at beskrivelsen styres mot det
brukeren faktisk ba om (codex-vision-proxy-mønsteret), og ber synsmodellen om å
transkribere synlig tekst. Når flagget er deaktivert — eller det ikke finnes
brukertekst — brukes grunnprompten uendret.

Selvsløyfens egen OpenAI-kompatible forespørsel
(`callVisionModelSingle()` i `visionBridgeHelpers.ts`) ber alltid om
`image_url.detail: "high"` — ubetinget, for alle innringere/leverandører, og
uavhengig av eventuelle signaler fra klienten. Sampling med lav detaljgrad
reduserer OCR-nøyaktigheten for nettopp teksttranskripsjonsoppgaven denne
prompten ber om, så selve beskrivelseskallet ber alltid om høy detaljgrad,
uavhengig av hvilket detaljnivå den opprinnelige innkommende forespørselen brukte.
Dette påvirker bare request-body-en til det interne beskrivelseskallet; det
endrer ikke hvordan OmniRoute videresender innringerens egen
`image_url.detail` i hovedforespørselen — denne standardverdien settes separat,
og bare for oppdagede OpenCode-klienter, i
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Grenen for Anthropic-wire-formatet i selvsløyfen for beskrivelse har ikke noe
`detail`-felt og påvirkes ikke av noen av standardverdiene.

#### Grense for beskrivelsesutdata (`modalityBridgeVisionMaxChars`)

| Nøkkel                         | Standard | Område              |
| ------------------------------ | -------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` eller 100–50000 |

`0` (standardverdien) betyr **ingen grense** — beskrivelsen som returneres av
`callVisionModel()` sendes videre uendret, slik at den eksisterende atferden
bevares. Alle verdier i området 100–50000 avkorter beskrivelsen med et
`…`-suffiks før den settes inn igjen som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Øk denne verdien for OCR-oppgaver med mye detaljer, der nedstrømsmodellen trenger
hele transkripsjonen; reduser den for å begrense tokenbruken på pratsomme
synsmodeller. Feltet i kontrollpanelet finnes i Avansert-panelet på fanen Vision
(`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) og avgrenser alle
verdier mellom 1 og 99 opp til minimumsverdien 100, samtidig som en eksplisitt
`0` forblir urørt — `0` er en gyldig Zod-verdi i seg selv
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke bare
standardverdien for «ikke angitt».

#### Beskrivelsesbuffer (`modalityBridge/bridgeCache.ts`)

Buffer i minnet med LRU + TTL for beskrivelsesutdata, delt på tvers av hele
prosessen. Nøkkel = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
med innramming med lengdeprefiks (ingen kollisjoner mellom feltgrenser).
Modellkomponenten er den **konfigurerte** bromodellen, ikke modellen som faktisk
svarte — `callVisionModel` kan falle tilbake internt, og nøkkel per forsøk ville
fragmentert bufferen. Mislykkede beskrivelser bufres aldri. Innstillinger:

| Nøkkel                          | Standard | Område  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalisering av eksterne bilder (selvsløyfens beskrivelses-/base64-henting)

Når broen selv henter et **eksternt** bilde — både Anthropic-beskrivelsens
selvkall og base64-konverteringen for claude-wire-formatet
(`ensureBase64ImagesForClaudeWire`), begge via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — sendes den resulterende
data-URI-en gjennom `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) før den bygges inn i forespørselen til
synsmodellen. For store bilder skaleres ned til en **langside på 2048 piksler**
(som samsvarer med størrelsesgrensen OpenAI/Anthropic allerede bruker på
serversiden), noe som reduserer opplastingsstørrelse og ventetid uten å endre
det synsmodellen ser. Endring av størrelse bruker `sharp`, lastet inn via en
dynamisk import: på en plattform der den opprinnelige binærfilen ikke kan lastes,
kaster `normalizeDataUri()` **aldri et unntak** — den faller tilbake til å sende
de opprinnelige bytene videre, slik at beskrivelses-/base64-konverteringsbanen
alltid fortsetter å fungere. Bytes som ikke er bilder (en henting som ikke
returnerte et dekodbart bilde) sendes også videre urørt. Denne normaliseringen
gjelder bare bilder broen henter til sitt eget selvkall — den brukes aldri på
innringerens rå passthrough-nyttelast, i tråd med prinsippet om endring kun ved
eksplisitt opt-in (Hard Rule #20).

#### Innstillingsskjema + migrering

De nye `modalityBridge*`-nøklene valideres med Zod i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, de tre `modalityBridgeCache*`-nøklene og
`modalityBridgeAudio*`-gruppen som brukes av Audio Bridge.
Migreringen `141_modality_bridge_settings.sql` kopierer eksisterende
`visionBridge*`-verdier til de tilsvarende nye nøklene (idempotent, og
overskriver aldri en operatørangitt `modalityBridge*`-verdi); de gamle nøklene
godtas fortsatt som reserve ved lesing i én utgivelsessyklus.

#### Transparenshode + statistikk

Describe-transformerte svar inneholder
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(bygd av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`,
satt av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omrutede forespørsler får **ingen** header — nyttelasten ble ikke endret, og
modellbyttet er allerede synlig i `model`-feltet i svarteksten.

`GET /api/modality-bridge/stats` (administrasjonsautentisering, samme nivå som
`GET /api/settings`) returnerer tellere i minnet per modalitet
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og
`video`. `averageLatencyMs` bruker `latencySamples`, ikke alle forsøk, som
nevner; en operasjon uten tidsmåling lager ikke et kunstig
nullmillisekundseksempel. `bridged` forblir det bakoverkompatible aliaset for
vellykkede konverteringer; mislykkede forsøk øker det ikke.
Tellere nullstilles ved omstart av prosessen etter hensikten
(telemetri, ikke regnskapsføring).

#### Konfigurasjon av dashbordet

Den dedikerte dashbordsiden er
`/dashboard/settings/modality-bridge`. De URL-adresserbare fanene `Vision`,
`Audio` og `Video` beholder spørringsparametere når verdien for `tab` endres.
Vision-fanen viser aktivering, modus, modellvalg (inkludert automatisk
standard), oppgavebevisst prompting, avanserte grenser for tidsavbrudd,
bilder og beskrivelseslengde/cache, kjøretidstellere og en beskyttet
eksempelforespørsel. Audio-fanen er også aktiv: den viser aktivering, et
modellvalg for kun STT med Auto, grenser for tidsavbrudd/maksimalt klipp,
lydtellere og en eksemp测试 med `input_audio`. Video-fanen er funksjonell:
den rapporterer kjøretidstilstanden for FFmpeg/ffprobe — én av fire eksplisitte
UI-tilstander (`unknown` mens sonderingen pågår eller ikke kunne fullføres,
`restricted` på en dashbordvert som ikke er loopback, der sonderingen hoppes
over på klientsiden, `unavailable` når sonderingen er fullført og det er
bekreftet at den mangler, eller `available` med FFmpeg/ffprobe-versjonene) —
lagrer grenser for aktivering/modell/bilder/video/tidsavbrudd, begrenser
modellvalget til modeller med vision-støtte og viser videotellere.

Det tidligere Vision Bridge-kortet under AI-innstillinger er en
kompatibilitetslenke til den nye siden; det har ikke lenger en separat kopi
av skjemaet. Media Providers lenker også arbeidsflytene Image-to-Text og
Speech-to-Text til de tilsvarende Modality Bridge-fanene, uten å fjerne den
eksisterende Speech-to-Text-lekeplassen.

**Omgåelse av selvsløyfeopptak:** Når describe-kallet går gjennom OmniRoutes
egen `/v1`-selvsløyfe (modell fra en ikke-standard leverandør), sender
underforespørselen `x-omniroute-admission-bypass: internal` og autentiseres
med den fastslåtte selvsløyfe-legitimasjonen — det lokale
`sk_omniroute`-sentinelsymbolet i lokal modus, eller den operatørkonfigurerte
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY`-miljønøkkelen (#1350), slik at
distribusjoner med `REQUIRE_API_KEY=true` fortsatt kan kjøre describe-kallet.
Omgåelsen godtas bare for disse nøyaktige legitimasjonene, så eksterne klienter
kan ikke bruke headeren til å hoppe over opptakskontrollen.

Eldre standardverdier ligger i `src/shared/constants/visionBridgeDefaults.ts`;
de nye standardverdiene for modus/oppgavebevissthet/cache og
innstillingsresolveren ligger i
`src/shared/constants/modalityBridgeDefaults.ts`. Kontrollmekanismen
eksponerer et `deps`-konstruktøralternativ, slik at tester kan sette inn
simulerte implementasjoner av `getSettings` og `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fanger opp chatforespørsler som inneholder lyd, før de når et mål som ikke er
kjent for å godta lydinndata. Den omruter aldri chatforespørselen: lyddeler
transkriberes gjennom det eksisterende OpenAI-kompatible
multipart-endepunktet, og den valgte chatmodellen fortsetter med
teksttranskripsjoner.

Flyt:

1. Løs `supportsAudio` via `getResolvedModelCapabilities()`. Eksplisitte metadata fra leverandørregisteret vinner, deretter statiske modellmetadata og så synkroniserte `modalities_input`. En deklarert inputliste uten `audio` er `false`; hvis det ikke finnes kapabilitetsholdepunkter, er verdien `null`. Både `false` og `null` aktiverer den konservative broen, mens `true` omgår den.
2. Løs innstillingene for `modalityBridgeAudio*`, og hent ut spleisbare lydsegmenter på toppnivå fra hver melding via den delte `detectMediaParts()`-detektoren. Støttede wire-former er OpenAI `input_audio`, `audio_url` og `source.media_type: "audio/*"`. Lyd som ligger nestet, oppdages for ruting, men fjernes ikke av spleisebanen. Arbeidet begrenses av `modalityBridgeAudioMaxClips`; senere segmenter forblir urørt.
3. Respekter en konfigurert `provider/model`, eller la `selectAudioBridgeModel()` gå gjennom `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrekkefølge og velge den første modellen med gyldig aktiv leverandørlegitimasjon.
4. `callAudioTranscription()` konverterer base64-/data-URI-lyd til en multipart-`file`, eller laster ned en ekstern `audio_url` via den offentlige utgående vakten med DNS-binding og en grense på 25 MB. Deretter POST-er den filen og den valgte modellen til den lokale selvsløyfen `/v1/audio/transcriptions`, autentisert med `resolveSelfLoopBearer()`. Den eksisterende transkripsjonsruten utfører normalt oppslag av legitimasjon, håndtering av nedkjøling og hastighetsbegrensning samt leverandørdistribusjon.
5. Ved vellykkede kall erstattes segmentene med `[Audio N]: <transcript>`. Kallene kjøres med `Promise.allSettled`: En individuell feil bevarer det opprinnelige lydsegmentet (#4012-kontrakten). Hvis alle kall mislykkes og målet er bekreftet å ha `supportsAudio === false`, blir segmentene til
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakten). For et ukjent mål (`null`) forblir resultatet ved feil i alle kall urørt. Et bekreftet tekstbasert mål uten brukbar STT-legitimasjon får den samme eksplisitte plassholderen uten at det utføres et nettverkskall.

Vellykkede transkripsjoner bruker prosessens felles Modality Bridge LRU-/TTL-hurtigbuffer. Nøkkelen kombinerer lydreferansen, den stabile operasjonsetiketten
`audio-transcription` og den valgte STT-modellen; feil bufres aldri. Lydforsøk oppdaterer de delte tellerne `bridged`, `cacheHits`, `failures` og `lastUsedAt`.
Transformerte svar inneholder
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; urørte forespørsler får ikke noe Audio Bridge-segment.

Kjøretidsinnstillingene lagres i databasen og valideres med Zod:

| Nøkkel                        | Standard | Område            |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Den delte hurtigbufferen styres fortsatt av
`modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Videobro (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fanger opp videosegmenter på toppnivå i Chat Completions-`messages` og Responses API-`input` før et mål uten kjent innebygd videostøtte kalles.
Støttede former er `input_video`, `video_url`, `video_source`, HTTPS-URL-er og `data:video/*;base64,...`-data-URI-er. Vanlige filnavn i tekst behandles ikke som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) har ansvar for gjennomgang av forespørselen, kapabilitets-/policykontrollen, aggregering per forespørsel og svarnyttelasten.
Arbeid per video – anskaffelse, hurtigbuffer for hele resultatet, beskrivelse av en bildesekvens (som slår sammen eventuell lydtranskripsjon deklarert av kalleren) samt målinger, avbrytelse og opprydding per forsøk – er skjult bak `processVideoPart` i
`videoBridgePipeline.ts`, som kalles én gang per videosegment i løkken til `preCall`.
Denne modulen definerer også de eksplisitte portgrensene `VideoMediaBrokerPort` (anskaffelse av byte og uttrekking av samplede bilder), `VideoAudioTranscriptionPort` (sammenslåing av en lydtranskripsjon deklarert av kalleren med de samplede bildetekstene) og `VideoDrilldownPort` (den eldre formen for rålagring). Produksjonens STT og bildebevaring settes sammen rundt beskrivelsesporten gjennom `createVideoSttAdapter` og `createVideoDrilldownAdapter`; sistnevnte bruker den delte livssyklusen for ugjennomsiktige håndtak.

Den offentlige `/v1`-forespørselsbanen importerer eller starter aldri en underprosess. Eksterne videoer lastes ned med en grense på 50 MiB; innebygde base64-videoer har en konservativ dekodet grense på 36 MiB per video, slik at modell-/meldings-/rammeverket kan holdes innenfor den offentlige JSON-forespørselsgrensen på 50 MiB. Estimater for innebygd lengde og dekodet størrelse kontrolleres før allokering. HTTPS kreves for den opprinnelige eksterne URL-en og alle omdirigeringer, ved bruk av den eksisterende offentlige utgående vakten med DNS-binding. Byte-ene krysser deretter den nøyaktige interne meglergrensen `POST /api/modality-bridge/video/extract`. Denne ruten er både `LOCAL_ONLY` og `SPAWN_CAPABLE`, godtar bare en prosessautentisert, klarert loopback-forespørsel og godtar aldri en URL, filsystembane, kjørbar fil eller argumentliste. Pipeline for størrelsen på API-innholdet og behandlerens inkrementelle innholdsleser håndhever uavhengig av hverandre en inngangsgrense på 50 MiB for megleren. Den begrensede køen kjører én uttrekking om gangen, tillater fire ventende jobber og begrenser ventende input til 100 MiB.

Inne i broker-en leser `ffprobe` en privat lokal fil; den faste format-allowlisten utelukker spilleliste- og manifestformater. For tillatte MOV-familiekonteinere forblir eksterne MOV-datareferanser deaktivert som standard, og den faste kommandoen aktiverer dem ikke. Både `ffprobe` og `ffmpeg` bruker protokollallowlisten som bare tillater `file`, én tråd, faste argumentmatriser, ingen shell, og kjørbare filer som slås opp via `PATH`. Cover-strømmer med vedlagt bilde kan ikke spilles av. Alle spillbare strømmer må oppfylle begrensningene, og en eksplisitt standardstrøm foretrekkes før den deterministiske fallbacken med laveste indeks. Videoer er begrenset til 600 sekunder, 8 192 piksler per dimensjon og 33 554 432 kildepiksler. FFmpeg samplere 1–16 JPEG-bilder fra midtpunkter, skalerer ned den lengste kanten til maksimalt 1 024 piksler uten å oppskalere mindre innganger, og mottar aldri en URL. Sampling er `uniform` som standard. De valgfrie policyene `scene_aware` og eksperimentelle `segment_aware` utfører én ekstra fast FFmpeg-kjøring over den allerede validerte lokale strømmen, velger avgrensede `showinfo`-scenetidspunkter og faller deterministisk tilbake til de samme uniforme midtpunktene ved detektorfeil, tidsavbrudd, ugyldig utdata eller et tomt kandidatsett. Segmentbevisst modus fordeler midtpunktsampling proporsjonalt med de validerte sceneintervallene; bevis og fallback-atferd for segmentbevisst modus er beskrevet nedenfor. Den harde grensen på 16 bilder brukes etter utvalget i alle policyer. Når en scene-aware-forespørsel bare har et budsjett på ett bilde, bruker den det uniforme midtpunktet i det aktive fullvideo- eller fokusvinduet og rapporterer `policyEffective: uniform`: Ett enkelt valgt scenebilde kan ikke bevare begge tidsendene. En kaller kan valgfritt oppgi et endelig fokusvindu (`start`/`end` sekunder); grenser klampes til mediets varighet, omvendte eller ikke-endelige vinduer avvises, og alle samplingpolicyer utføres bare innenfor det normaliserte intervallet. Det resulterende vinduet inkluderes i samplingmetadataene og i prefikset for den ikke-betrode beskrivelsen, slik at nedstrømsmodeller kan skille et fokusert utdrag fra hele tidslinjen.

Semantisk bildetekstfokus er en separat, eksplisitt innstilling. Standardanalysemodusen `full` bevarer den eksisterende bilderammeforespørselen og videresender aldri forespørselstekst til bildetekstmodellen. I `focused`-modus leser broen bare den nyeste ikke-tomme brukerskapte `text`/`input_text` fra den samme Chat- eller Responses-beholderen, normaliserer den til NFC, slår sammen kontrolltegn og mellomrom, og begrenser den til 500 Unicode-kodepunkter. Et tomt resultat faller tilbake til den nøyaktige `full`-forespørselen. Et brukbart hint serialiseres som JSON i en egen blokk for ikke-betrodd brukerkontekst og kan bare prioritere observerbare detaljer; det kan ikke overstyre den separate advarselen mot å følge instruksjoner som er synlige eller hørbare i mediet. Tekstfokus utleder aldri `start`/`end` og endrer ikke den tidsmessige sampleren.

#### FU-07 strukturelle segmentbevis

`segment_aware` bruker én avgrenset forhåndsanalyse over den allerede validerte lokale videostrømmen. Den faste filterkjeden skalerer først til maksimalt 320 piksler i bredden, oppdager sceneskifter og frosne intervaller, og sampler deretter med 1 bilde per sekund for uskarphet, gjennomsnittlig luminans og romlig/temporal informasjon. Kjøringen er begrenset til 600 strukturelle samplingpunkter, én FFmpeg-/filtertråd, de samme `file`-begrensede protokoll- og container-allowlistene, en prosessutdatagrense på 1 MiB og maksimalt 30 sekunder innenfor broker-ens delte avbrudds-/tidsfrist. Den aksepterer aldri en kommando, et filter, en sti eller en URL fra forespørselen.

De strukturelle verdiene er deterministiske samplingbevis, ikke semantisk videoforståelse. De utleder ikke motiver, handlinger, bildetekster, tale eller brukerintensjon. Scene- og frysegrenser danner segmenter; frysedekning, uskarphet, eksponering, romlige detaljer og temporal endring påvirker bare hvordan det eksisterende budsjettet på 1–16 bilder fordeles. Et fullstendig frosset segment begrenses til ett bilde, mens ikke-frosne segmenter konkurrerer om det gjenværende budsjettet. Når antallet grenser overstiger antallet bilder, beholdes uniform tidslinjedekning slik at raske tidlige klipp ikke kan skjule et langt etterfølgende segment. Scenegrenser innenfor analyseoppløsningen på 1 sekund fra en frysegrense slås sammen.

Manglende filtre, ugyldige eller tomme bevis, en detektorfeil eller et tidsavbrudd i den avgrensede forhåndsanalysen fører til en åpen fallback til den nøyaktige uniforme midtpunkts-policyen. Et avbrudd fra kalleren eller broker-ens tidsfrist fører ikke til åpen fallback: Den pågående underprosessen avsluttes, senere bildeekstraksjon forhindres, og det private midlertidige treet fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske ekte FFmpeg-fixtures for besparelser i bildetekstkall etter deduplisering, budsjettfordeling ved tett bevegelse, bevis for uskarphet/eksponering/SI-TI, raske klipp med en lang hale og falske positiver ved gradvis fading. Den registrerer veggklokketid for forhåndsanalysen og, når `/usr/bin/time` er tilgjengelig, CPU-bruk for underprosessen og toppverdi for RSS. Kvalitetskontrollene er kun strukturelle orakler. Kvaliteten på ekte bildetekstmodeller forblir `HOLD` fordi dette testverktøyet ikke har noe autorisert endepunkt eller en fastlåst dommer. Monetære besparelser forblir også `HOLD` med mindre `--caption-cost-per-call-usd` oppgir et eksplisitt positivt estimat per kall; skriptet fabrikerer aldri noen av resultatene.

Hver ramme er begrenset til 4 MiB, alle rå rammer samlet til 23 MiB, og
den serialiserte brokersvaret til 32 MiB. En privat midlertidig katalog fjernes
i `finally`. OmniRoute inkluderer ikke FFmpeg og godtar ikke en egendefinert
kjørbar filbane. Før teksting utfører broen en konservativ visuell
dedupliseringsrunde: hver JPEG reduseres til en gråtonebuffer på 16×16 og
sammenlignes bare med den sist beholdte rammen. Når det er bedt om et
tekstingsbudsjett på mer enn én ramme, leverer uttrekket en begrenset
kandidatgruppe på opptil det dobbelte av budsjettet og aldri mer enn 16 rammer.
Den forespurte grensen brukes først etter deduplisering, og den første og siste
valgte kandidaten bevares under den endelige reduksjonen når budsjettet er minst
to. Den versjonerte
`grayscale-16x16-mean-cells-v2`-policyen bruker den største av gjennomsnittlig
luminansdelta og forholdet mellom miniatyrcellene hvis normaliserte delta er
minst 0,05. Duplikatterskelen er konstanten 0,04, valgt for forutsigbarhet
fremfor å eksponeres som en kjøretidsinnstilling. Dette sekundære
høykontrastsignalet bevarer små bevegelser og endringer i synlig tekst som en
sammenligning basert bare på gjennomsnittet kan skjule. Feil i sammenligner eller
dekoder åpner for feil og bevarer dekningen. Utdata-metadata skiller mellom
uttrukne kandidater, rammer som ble brukt, og visuelle duplikater som ble
forkastet.

En eksplisitt merket videodel kan be om et tidsstemplet kontaktark. Broen
bygger et JPEG-rutenett med maksimalt 4 kolonner og 16 rammer. Hver celle på
512 piksler får kildetidsstempelet brent inn i et kontrastrikt bånd nederst,
samtidig som de samme tidsstemplene beholdes i tekstmetadata for videre
tilknytning og revisjon. Den komplette JPEG-en er fortsatt begrenset til
32 MiB. Hvis `sharp` ikke kan dekode eller sette sammen rutenettet, faller broen
tilbake til de individuelle JPEG-rammene; en klientavbrytelse videreføres
fortsatt gjennom arkoperasjonen.

Dokumentasjon for promotering holdes bevisst adskilt fra
mikroreferansemålingen for syntetisk sammensetning.
`scripts/perf/video-bridge-contact-sheet-eval.ts` definerer et
skjemaversjonert A/B-testoppsett for ekte OpenAI-kompatible synsmodeller. Det
måler leverandørrapporterte tokens, ende-til-ende-latens (inkludert
sammensetning av kontaktarket), antall modellkall og manifestdefinert
faktabevaring. Rå modellsvar skrives ikke til rapporten; bare SHA-256-sammendrag
og samsvarende fakta-ID-er beholdes. Testoppsettet foretar ingen nettverks-
eller betalt modellkall med mindre `--execute-real` er sendt inn og
`--model`, `OMNIROUTE_BASE_URL` og `OMNIROUTE_API_KEY` er konfigurert. Uten
den eksplisitte virkelige kjøringen forblir det maskinlesbare resultatet
`HOLD`; syntetiske målinger av nyttelast og antall kall alene er ikke
dokumentasjon for promotering.

Det separate `scripts/perf/video-bridge-promotion-eval.ts` bruker observasjoner
fra FU-07 eller FU-09. Opptak til promotering krever alle åtte syntetiske
scenariotypene samt et sanitert ekte klipp, minst tre målte repetisjoner per
rolle og tilfelle, alle ti deklarerte metrikker, fastfrosne sammendrag for
medier, ledetekst, forventede fakta og innstillinger, unike observasjons-ID-er
og bekreftet seedet A/B-rekkefølge. Kjøringskvitteringen knytter sammen
korpussammendraget, den nøyaktige kandidat-SHA-en og modellrevisjonen. Manglende
eller ugyldige målinger forblir `HOLD`, inkludert CPU over 30 s, topp-RSS over
512 MiB eller forhåndsanalyse over 30 s. Dette er grenser for opptak av
dokumentasjon, ikke en ny garanti for håndheving av RSS under kjøring.

FU-07 krever minst 98 % kvalitetsbevaring og p95-latens på høyst 1,2 ganger
referansen, samt enten en absolutt forbedring på 0,05 i tilfellebalansert
gjennomsnittlig tilbakekalling ved tilsvarende gjennomsnittlig antall
tekstingskall, eller minst 10 % færre gjennomsnittlige tekstingskall etter
deduplisering. FU-09 krever minst 0,85 kvalitet, 95 % bevaring, 20 % reduksjon
i medianlatens og 10 % reduksjon i tokenbruk. Tap av kritiske fakta, manglende
overholdelse av injeksjonsregler eller manglende bruk hindrer promotering. Én
kjøring kan ikke promotere noe:
`--previous-report` bekrefter to separate, ikke-overlappende og fortløpende
kvalifiserte kjøringer av samme policy, modellrevisjon, kandidat og korpus. Et
samplingsforsøk kan ikke bekrefte et kontaktarkforsøk.

Innsamlere bør beregne poeng for svar i minnet og lagre `responseDigest` sammen
med metrikker og observasjonskoblinger, aldri svarteksten. Forbrukeren leser
også eldre råobservasjoner, men kopierer aldri denne teksten inn i rapportene
sine. Nøyaktig én av `responseDigest` eller `rawResponseText` godtas for hver
observasjon. Den versjonerte tillatelseslisten forblir tom, med en uforanderlig
standardverdi på `hold`. En kvalifisert oppføring krever sin
dokumentasjonsreferanse, policy, modellrevisjon, nøyaktige kandidat-SHA,
manifest-sammendrag og to separate kjørings-ID-er; motstridende kontekster
avvises. Disse metadataene er en revisjonskontrakt, ikke et bevis på at en
referert fil inneholder ekte målinger. Kontroller de faktiske kvitteringene før
du legger til en oppføring. Administrasjonsstatistikkendepunktet og
Video-dashbordet viser konservativ beredskap. Et konfigurert modellalias alene
fastslår ikke modellrevisjonen eller den kjørende kandidat-SHA-en, så det
gjeldende dashbordet rapporterer `HOLD` i stedet for å gjenbruke kvalifisering
fra en annen kjøringskontekst. Eksplisitt eksperimentelt valg holdes fortsatt
adskilt fra promotering; ingen standard endres automatisk.

Innringere kan legge ved en valgfri `transcript.cues`-matrise i en støttet videodel når de allerede har tilpasset tekst. Hvert cue må inneholde `text`, et endelig `start`/`end`-intervall innenfor den avsøkte varigheten, og en tillatt `source` (`client`, `embedded` eller `audio-bridge`); `confidence` er som standard `1` og må forbli mellom `0` og `1`. Nøyaktige duplikat-cue-er slås sammen. OmniRoute starter aldri transkripsjon fra disse metadataene: validerte cue-er kopieres inn i det beskrevne resultatet med kilde, konfidens og intervall, og gjengis som upålitelige observasjoner sammen med bildetekstene. Ugyldig tekst, tekst utenfor gyldig område eller tekst uten proveniens avvises i stedet for å blandes inn i bildetekststrømmen. Begge kanalene for transkripsjon i forespørselsbrødteksten normaliserer oppgitt proveniens til `client`, inkludert selvangitte etiketter for `embedded` eller `audio-bridge`. Bare en adapter eid av serveren kan tildele disse pålitelige etikettene gjennom det kodebaserte argumentet `trustedSource`; et JSON-felt i forespørselen kan ikke nå dette argumentet. Transkripsjonstekst forblir upålitelig medieavledet innhold, uavhengig av proveniens, og må aldri avgjøre autorisasjon.

En avansert innringer kan oppgi et `audioTranscript`-spor for den samme videoen; det behandles som klientlevert tekst, ikke som bevis på transkripsjon utført av serveren. Fusjonspunktet kjører visuelle observasjoner og lydobservasjoner under én tidsfrist og ett avbruddssignal, ordner dem på en felles tidslinje, slår sammen nøyaktige duplikater og rapporterer et delvis resultat når bare én side lykkes. En ugyldig `audioTranscript` degraderes til dette delvise resultatet — den visuelle beskrivelsen beholdes, og lydgrenen registrerer en renset feilkode — i stedet for at hele videoen feiler. Tilgjengelighet per gren, delvis-flagget og de rensede feilkodene bevares i det beskrevne resultatet, i sikkerhetsrekkverksmetadataene (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i metadataene for resultatbufferet og i fusjonstellerne for broen. Standardbanen for Video Bridge kaller ikke speech-to-text og laster ikke ned en ekstra mediekopi; uten dette eksplisitte sporet forblir den videobasert.

**Bevaring av transkripsjon (#12150 P1).** Dette gjelder automatisk når Video Bridge (som selv er valgfri) gjengir et transkripsjons-cue — det finnes ikke noe separat flagg for bevaring. Når en forespørsel gjengir et transkripsjons-cue (et innringerenklært `transcript` eller en fusert `audioTranscript`), merker sikkerhetsrekkverket det som `videoBridgeObserved` og produserer en redigert skygge av videobeskrivelsen — en identisk gjengivelse der fritekstkroppen i hvert cue erstattes med `[redacted-video-transcript]`, laget ved å erstatte det strukturerte cue-feltet før strengen settes sammen (aldri ved å tolke den flattrykte teksten, slik at intet cue-innhold — fiendtlig eller ordinært, inkludert innhold som inneholder `]`, for eksempel `[inaudible]`/`[music]` — kan overleve). Den lagrede forespørselsbrødteksten i kalloggen erstatter hver videoavledede tekstdel med denne redigerte skyggen, matchet etter innholdslikhet; `fullText`-ankeret leses på nytt fra den ferdigstilte forespørselsnyttelasten før sikkerhetsrekkverket, slik at samsvaret fortsatt lykkes etter at senere sikkerhetsrekkverk i kjeden (PII- og legitimasjonsmaskerne, prioriteter 10/95) skriver om beskrivelsesteksten på stedet, og etter at systeminstruksjons-/overleverings-/minneinjeksjon omformer meldingsmatrisen. Brødteksten som sendes oppstrøms til modellen, forblir uendret. En observert forespørsel fyller heller ikke noe varig Memory (både forespørsels- og svaravledet uthenting hoppes over), slik at modellens eget svar ikke kan gjengi transkripsjonstekst inn i Memory.

**Rå videofelter (#12430).** Når broen er aktivert og innebygd videostøtte er ukjent eller mangler, aktiverer definerte `transcript`-/`audioTranscript`-felt også `videoBridgeObserved`, selv etter beskrivelsesfeil eller en `maxVideos`-begrensning. `null` og tomme strenger teller; manglende felt og metadata som ikke gjelder video, gjør det ikke. Bevarte kopier redigerer disse feltene eller utelater forespørselen, og buffere/Memory omgås.

På disse reservebanene blir gyldige cue-er fra innringeren til støttede `text`-/`input_text`-deler i stedet for ikke-standardiserte leverandørfelt. Begge sporene som leveres i forespørselen, forblir upålitelige `client`-observasjoner, med en eksplisitt advarsel om at videoen ikke ble beskrevet og at tidsstemplene ikke ble verifisert mot mediet. De eksisterende budsjettene på 256 cue-er/64 KiB totalt og per cue gjelder samlet for de to sporene; tidsstemplene må passe innenfor meglerens grense på 600 sekunder og ethvert oppgitt fokusvindu. Ugyldige spor forkastes og videresendes ikke som vilkårlig tekst; et gyldig søsken kan fortsatt brukes med mindre det samlede budsjettet overskrides. Null-/tomme felt tilfører ingen tekst. Denne reservebanen legger ikke til noe medieoppslag eller noen transkripsjon. Utvidelsesfelter for transkripsjon fjernes fra reservebanens videobærer og dens `video_url`-/`source`-objekter. OpenAI-trådlisten for tillatte felt forblir streng; ukjente innebygde videobærere er fortsatt tilgjengelige, og kjente tekstbaserte mål beholder sikre markører. Strukturerte redigeringsskygger beskytter den tilføyde transkripsjonsteksten, mens den opprinnelige forespørselen som eies av innringeren, forblir uendret. Mål med innebygd støtte og deaktiverte broer beholder sin eksisterende omgåelsesatferd.

Ytterligere bevarte kopier bruker det samme signalet for observert forespørsel. Det rå klientforespørselsøyeblikksbildet før sikkerhetsrekkverket, den ventende forespørselen i minnet og loggen over tidlig avviste forespørsler erstatter transkripsjonsfelter i videodeler på en strukturell måte; strengprompter som syntetiseres av pipeline-steg og kontektoverlevering, redigeres ved endepunktet for den lagrede forespørselsbrødteksten. Den lagrede `video_content_removed`-markøren gjør at fortsettelse med `previous_response_id` feiler lukket i stedet for å rekonstruere tekst som med hensikt ble forkastet. Hvis en observert forespørsel mister sin redigeringsskygge per del før logging, eller selv én av flere videoskygger ikke lenger samsvarer etter senere endringer i forespørselen, utelates hele den lagrede forespørselsbrødteksten i stedet for at en delvis redigert transkripsjon beholdes.

For en observert forespørsel kan et modellsvar sitere hvilken som helst del av
transkriptet uten en strukturert avgrensningsmarkør. Den persisterte
anropsloggen sin `responseBody` erstattes derfor av en utelatelsesmarkør; det
detaljerte pipeline-artefaktet (som kan inkludere upstream-/klientdata og
datastrømsbiter) beholdes ikke. Semantikk-, idempotens- og
resonneringsreplay-cacher omgår lesing og skriving for denne forespørselen.
Leverandørforespørselen og det klient-synlige svaret forblir uendret. Tidlige
keepalive-byte tømmes fra den midlertidige bufferen når det detaljerte
artefaktet utelates. Kiros advarsel om feilformatert EventStream rapporterer
bare nyttelastens byte-antall, aldri innholdet eller JSON-parserens råfeil.
Dette hevder ikke at alle urelaterte leverandør-/plugin-diagnostikkmeldinger er
revidert; den bredere gjennomgangen av beholdte mål spores i #11658.

Livssyklusen til den interne `/api/modality-bridge/video/drilldown` er et
separat, loopback-/token-autentisert cacheunderlag. Alle operasjoner krever også
en kanonisk, ugjennomsiktig principal-ID. Før en produksjonskaller aktiveres,
må den utlede denne ID-en fra den autentiserte tenanten og aldri videresende en
klientvalgt verdi. Cache-nøkler knytter denne principalen til kanoniske
økt- og videoreferanse-ID-er, lagrer bare deres SHA-256-avledede nøkler og
avgrenser både lesing og sletting til samme principal. Cachen lagrer maksimalt
16 avledede JPEG-bilder per oppføring, utløper etter ti minutter og støtter
avgrensede `start`/`end`-lesinger eller eksplisitt sletting av økter.

Hver principal er begrenset til 16 oppføringer og 64 MiB kanoniske JPEG-data.
Disse grensene er uavhengige av den globale grensen på 64 oppføringer/256 MiB:
press på principal-kvoten kaster bare ut den principalens minst nylig brukte
oppføringer før global LRU-kasting vurderes. Utløpte oppføringer fjernes fra
både principal- og globalregnskapet ved cacheaktivitet, mens kansellering og
valideringsfeil ikke gjennomfører en delvis erstatning.

Cachen avviser ikke-kanonisk Base64, overflødig padding, medier som ikke er
JPEG, feilformaterte eller avkortede JPEG-filer, samt JPEG-filer som produserer
en advarsel under en avgrenset dekoding av hele bildet med `sharp`. Den
enkoder hvert godkjente bilde på nytt som en kanonisk JPEG, utleder bredde og
høyde fra de dekodede bytene i stedet for å stole på feltene fra kalleren, og
forkaster eventuelle etterfølgende polyglot-byte i stedet for å beholde dem.
Bare den avgrensede kanoniske komprimerte bufferen belastes begge kvotene.
JSON-ledningsgrensen inkluderer Base64-overhead for grensen på 32 MiB for
dekodet inndata. Hver lagrede avledning registrerer det validerte
JPEG-formatet/-oppløsningen, samplingspolicyen, avledningsversjonen,
opprettelsestidspunktet, en serverberegnet innholdshash og den hashede
overordnede referansen sammen med den klarerte kallerens hash for overordnet
innhold. Kansellering kontrolleres mellom asynkrone dekodings-/hashfaser før
den atomiske cache-committen.

Produksjonsprodusenten bruker allerede avledede meglerbilder på nytt først
etter vellykket visuell analyse, uten en ny videonedlasting/-ekstraksjon. Den
krever operatorinnstillingen
`modalityBridgeVideoDrilldownEnabled=true`, streng `drilldown: true` per del
og en autentisert API-nøkkelpost-ID. Klientdeklarerte principal-/øktverdier
etablerer aldri eierskap. Uten alle tre betingelsene hasher, endrer størrelse
på eller beholder den ikke flere bilder. Feil ved bevaring opprettholder det
brukbare visuelle svaret. Samtykkede forespørsler omgår hurtigbufferen for
resultater fra hele videoen, slik at hurtigbufrede resultater aldri gjengir
håndtak.

Vellykkede JSON- og SSE-svar eksponerer maksimalt fire ugjennomsiktige håndtak i
den avgrensede `x-omniroute-video-drilldown`-headeren. Autoriserte
nettleseropprinnelser kan lese denne headeren uten å utvide CORS-opprinnelsespolicyen.
Nye håndtak bruker `v1.<32-byte random base64url
token>`, og registeret beholder bare SHA-256-hashene deres. Leseren/header-parseren
aksepterer også eldre 64-tegns heksadesimale tokener.
Den autentiserte offentlige forbrukeren er
`GET /api/v1/video-bridge/drilldown?handle=...`, uavhengig kontrollert av
`modalityBridgeVideoDrilldownRemoteEnabled=true`. En eksplisitt persistert
false-verdi opphever tilgang selv når den eldre
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED`-miljøtilbakefallet er aktivert.
Produksjonsbevaring har det tilsvarende eldre
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`-tilbakefallet. Begge tilbakefall er
av som standard.

Forbrukeren utleder eierskap fra den autentiserte nøkkelen og bruker
nøkkelpolicy: både GET og DELETE tilhører endpointkategorien `video`, inkludert
`/v1`- og `/api/v1`-aliasene. Nøkler med en ikke-tom allowlist for endepunkter
må inkludere `video`; ubegrensede nøkler forblir kompatible. Forbrukeren
returnerer samme 404 for ukjente, utløpte og en annen nøkkels håndtak. Den
aksepterer `variant=preview|standard|detail` (maksimal JPEG-dimensjon
320/640/1280, aldri oppskalert), `limit=1..8` (eller det eldre aliaset
`frames`, aldri begge), nullbasert `page` og valgfrie fokussekunder for
`start`/`end`. Dupliserte spørringsnøkler og omvendte fokusvinduer avvises.
Hver returnerte variant har en hash av sitt faktiske innhold og metadata for
faktisk oppløsning, knyttet til den bevarte kilden. Varianter avledes ved
lesing i stedet for å lagres som ekstra beholdte kopier. JSON-svaret, inkludert
Base64/konvolutt, er begrenset til 32 MiB; en for stor side returnerer 413, og
klienten må be om færre bilder. Lesinger kontrollerer kansellering rundt hver
størrelsesendring og kontrollerer håndtakets gyldighet på nytt før retur.
`DELETE` utført av eieren er idempotent; sletting eller TTL-utløp frigjør den
bevarte kilden og bruksregnskapet.

Det delte lageret er prosesslokalt: håndtak utløper ved omstart og kan ikke
overføres mellom uavhengige OmniRoute-prosesser. Administrasjonsstatistikk
eksponerer effektiv policy for bevaring/fjerntilgang og samlet antall beholdte
oppføringer/byte, aldri medier, referanser, principal-ID-er eller håndtak.
Videoinnstillingspanelet viser disse verdiene og kan persistere begge
samtykkebryterne. Denne implementasjonsdokumentasjonen er ikke dokumentasjon
for aktiv utrulling eller promotering; aksept med reelle modeller spores
separat.

Videorammer tekstes sekvensielt med den konfigurerte Video-modellen. En tom
Video-overstyring arver Vision-innstillingen; hvis begge er tomme, velger
Vision-auto-ruteren den effektive modellen som støtter visjon. Vellykkede
tekstinger erstatter den opprinnelige delen med et stabilt `[Video description:`
-prefiks som også markerer teksten som en upålitelig medieavledet observasjon og
forteller nedstrømsmodeller at de ikke skal følge instruksjoner som finnes i
mediet. Hurtigbuffernøkler for rammeteksting inkluderer JPEG-byte, ledetekst,
tidsstempel og effektiv modell; bare vellykkede tekstinger bufres.
Hurtigbufferoppføringer beholder den faktiske modellen som produserte det
vellykkede resultatet, inkludert en reservemodell; broen rapporterer `mixed` når
ulike rammer er produsert av ulike modeller. Et treff i hurtigbufferet gjenbruker
denne produsentidentiteten i stedet for å merke den på nytt som den forespurte
rutingsplanen. Hurtigbufferet for resultatet av hele videoen bruker alle
inndataene som endrer resultatet som nøkkel — ledetekst, effektiv modell,
samplingspolicy, antall rammer, modus for semantisk analyse, SHA-256-fingeravtrykket
til det normaliserte fokushintet, fokusvindu, `transcript`,
`audioTranscript` og flagget for kontaktark — slik at endring av noen av disse
dimensjonene gir et hurtigbuffermiss, aldri gjenbruk av et utdatert resultat.
Versjonen av den visuelle dedupliseringspolicyen, terskelen og det begrensede
antallet kandidatrammer er også eksplisitte i nøkkelen og metadataene for
resultathurtigbufferet; en policyendring kan derfor ikke gjenbruke en utdatert
beskrivelse av hele videoen. Resultathurtigbufferets v4-metadata beholder modus
og fingeravtrykk, aldri den rå brukeroppgaven. Metadata for sikkerhetsregler
rapporterer både forespurt og effektiv analysemodus; en forespurt `focused`-modus
uten brukbar brukertekst rapporteres som effektivt `full`.

Sikkerhetsregelen trekker ut alle støttede videodeler, men beskriver ikke mer enn
`modalityBridgeVideoMaxVideos`. For et mål som er bekreftet å ha
`supportsVideo === false`, blir videoer som feiler eller overskrider grensen,
eksplisitte sikre tekstmarkører, slik at ingen rå video overlever. Når funksjonen
er ukjent, beholder disse delene videobæreren; eventuell reservetranskripsjon
følger den avgrensede tekstkonverteringen ovenfor. Mål med
`supportsVideo === true` omgår broen. Avbrytelsessignalet for klientforespørselen
forplanter seg gjennom nedlasting, meglerkø, underprosesser og tekstingskall;
avbrytelser stopper mellom videoer og faller aldri gjennom til råmedier.

Kjøretidsinnstillinger lagres i databasen og valideres med Zod:

| Nøkkel                              | Standard    | Område / virkemåte                                                                                          |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri kjøretid, må aktiveres eksplisitt                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarer generiske tekstinger; `focused` bruker avgrenset, upålitelig kontekst fra siste bruker       |
| `modalityBridgeVideoModel`          | `""`        | Arver Vision Bridge-modellen                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proporsjonal `segment_aware`; feil i detektoren faller tilbake til `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                              |

Lagrede eldre Video-tidsavbruddsverdier over 120 sekunder avkortes til
meglerfristen; nye innstillinger over denne grensen avvises.
`GET /api/modality-bridge/video/runtime` krever klarert, stemplet
loopback-lokalitet før autentisering eller sondering av kjøretiden, og krever
deretter administrasjonsautentisering. Den returnerer bare `available`,
sanitiserte FFmpeg-/ffprobe-versjoner og en fast årsak når kjøretiden ikke er
tilgjengelig. Det interne uttrekkssluttpunktet er ikke et offentlig
opplastings-API: overbelastning i køen returnerer `503` samt `Retry-After`, en
frakoblet klient returnerer `499`, og den faste meglerfristen returnerer `504`.
Konverterte svar legger til `video->text;model=<visionModel>;parts=<videos>` i
den sentrale overskriften `x-omniroute-modality-bridge` uten å fjerne
Vision- eller Audio-segmenter.

### PII-maskering (`piiMasker.ts`)

Kjører i **begge** stadier.

- **`preCall`** kloner nyttelasten, går gjennom `system`, `messages`, `input` og
  `prompt` (inkludert elementer som er rene strenger), og bruker
  `processPII()` (fra `@/shared/utils/inputSanitizer`) på `content`-/`text`-felt
  som inneholder strenger. Når `PII_REDACTION_ENABLED=true`, maskeres oppdaget
  PII i den utgående nyttelasten. Dette er uavhengig av
  `INPUT_SANITIZER_MODE` (som bare styrer policyen for prompt-injeksjon). Når
  maskering er deaktivert, registrerer kallet antallet oppdagelser uten å
  omskrive innholdet.
- **`postCall`** dybdekloner svaret, kjører `sanitizePIIResponse()` samt
  Responses-API-formmaskeringen (`maskResponsesOutput` — dekker
  `output_text` og `output[].content[].text`). Hvis en maskering finner sted,
  erstatter det endrede svaret originalen.

Sikkerhetsregelen blokkerer aldri; den legger bare til merknader
(`meta.detections`, `meta.redacted`) eller skriver om.

**Reversibelt hvelv (`PII_REVERSIBLE_VAULT_ENABLED`, standardverdi `false`).** Når både
`PII_REDACTION_ENABLED` og `PII_REVERSIBLE_VAULT_ENABLED` er aktivert (DB-overstyring >
miljøvariabel > standardverdi, lest én gang per forespørsel), åpner `handleChat` ett hvelv per
klientforespørsel (`src/lib/pii/requestTokenVaultScope.ts`) og sender det til passet før kall
som `GuardrailContext.tokenVault`. Maskeren skriver deretter surrogattokener
som `<<PII_EMAIL_QWERTYUI_1>>` i stedet for `[EMAIL_REDACTED]`, både for innebygde,
validerte (GDPR/POPIA) og egendefinerte regler. Noncen består av 8 tilfeldige store
bokstaver per forespørsel, og samme verdi får samme token innenfor forespørselen.
Bare maskeren oppretter tokener: beskyttelsen mot prompt-injisering og `/api/guardrails/test`
kjører uten hvelv og beholder plassholderne.

- Leverandøren, hvert kombinasjonsledd, nye forsøk, medlemmer av fusjonspanelet og fusjonsdommeren
  ser bare tokener. Tokenene gjenopprettes én gang, på 2xx-responsen som forlater
  `handleChat`: per felt i den analyserte SSE-en (et token som er delt over flere hendelser
  løses fortsatt; argumenter til verktøykall er JSON-escapet) eller per felt i en JSON-body,
  med omberegnet `Content-Length`. Innhold og resonneringstekst samt argumenter til verktøykall
  gjenopprettes. Feilresponser (4xx/5xx) beholder tokenene.
- Feil forblir private: Hvis oppretting av tokener mislykkes eller hvelvet avviser en verdi
  (1000 oppføringer, 256 tegn per verdi, 64 KB totalt), skrives plassholderen i stedet;
  et token som hvelvet ikke kan løse, eller en gjenoppretting som mislykkes, forblir
  bokstavelig, og bare et antall logges. Hvelvet har ingen tidtakere og ingen global tilstand;
  det tømmes når responsstrømmen avsluttes, avbrytes eller får en feil.
- Når en forespørsel har opprettet tokener, hoppes minneuttrekking, idempotentilagring og begge
  semantiske hurtigbufferlagringer over, fordi ingen senere forespørsel kan løse disse tokenene.
  I kallelogger inneholder leverandørforespørselen og -responsen tokener; den loggede
  klientforespørselens body er fortsatt det rå klientinndataet, som ved vanlig redigering.
- Tokener bruker en tilfeldig nonce per forespørsel, så prompt-prefikset endres ved hver
  tur: hurtigbufring av prompter på leverandørsiden treffer ikke for maskerte turer, og et token
  som kommer tilbake i en senere tur (for eksempel via `previous_response_id`) tilhører en
  gammel forespørsel og forblir bokstavelig.

#### Valg per type, egendefinerte mønstre og deteksjonstellere

**Dashboard → Settings → Security → PII masking** velger _hva_ som maskeres. Det
slår ikke på maskering: Det er fortsatt `PII_REDACTION_ENABLED` (forespørsel) og
`PII_RESPONSE_SANITIZATION` (respons + SSE), som begge er deaktivert som standard.

- **Valg per type** — de innebygde ID-ene er oppført i
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ikke angitt betyr alle
  typer (atferden før denne innstillingen fantes). Mønsteret `ssn_us` i forespørselsmotoren
  tilordnes til `ssn`. Malene (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full)
  fyller bare ut avmerkingsboksene i brukergrensesnittet.
- **GDPR- og POPIA-identifikatorer** — tolv innebygde ID-er som dekker personidentifikatorer
  fra EU og Sør-Afrika (tabellen nedenfor). RegEx-ene, validatorene og jurisdiksjonstaggene
  ligger i én tabell, `src/shared/utils/piiPatterns.ts`, som både responsdesinfiseringen
  (`src/lib/piiSanitizer.ts`) og forespørselsmaskeren
  (`src/shared/utils/inputSanitizer.ts`) bruker. Et treff redigeres bare når validatoren
  godtar det; en ren sekvens med sifre er aldri tilstrekkelig. En operatør som lagret et
  avgrenset utvalg før disse ID-ene eksisterte, beholder den daværende atferden til de nye
  ID-ene krysses av.
- **Egendefinerte mønstre** — opptil 20 regex- eller jokertegnmønstre (`*` = opptil 64
  tegn som ikke er mellomrom, `?` = ett tegn). Treff blir `[CUSTOM_REDACTED]`.
  Alle mønstre går gjennom `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): høyst 500 tegn, flagg begrenset til
  `g i m s u`, må kunne kompileres, må bestå `safe-regex` (katastrofal tilbakefølging),
  og må ikke treffe en tom streng eller en plassholder for redigering.
  Et mønster som mislykkes, avvises ved lagring og testing, og en lagret rad som mislykkes,
  hoppes over under kjøring i stedet for å bli kompilert. Egendefinerte mønstre kjøres bare
  når maskering er aktivert.
- **Deteksjonstellere** — antall per type (aldri verdier som ble truffet), holdt i minnet
  og tilbakestilt ved omstart (`src/lib/pii/piiDetectionStats.ts`). De økes bare mens
  maskering er aktivert.

Innstillingene ligger i `key_value`-tabellen (navneområdet `pii_settings`,
`src/lib/db/piiSettings.ts`) og leses via en hurtigbuffer på 1 s. API:

| Metode | Bane                     | Formål                                                               |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Flaggtilstand, `enabledTypes`, `customPatterns`, deteksjonstellere   |
| `PUT`  | `/api/settings/pii`      | Erstatt `enabledTypes` (`null` = alle) og/eller `customPatterns`     |
| `POST` | `/api/settings/pii/test` | Testkjør ett mønster mot et eksempel på høyst 8 KB; ingenting lagres |

Alle tre krever administrasjonsautentisering og validerer body-en med Zod
(`src/shared/validation/schemas/piiSettings.ts`). Når innlogging er deaktivert
(`requireLogin=false`), er `GET` og testendepunktet åpne, men `PUT` krever fortsatt
en dashboardsesjon, en API-nøkkel med `manage`-omfang, et `oma_`-tilgangstoken
med skriveomfang eller høyere, eller CLI-tokenet eller intern tjenestetokenet sendt
fra loopback.

#### GDPR- (EU) og POPIA-identifikatorer (Sør-Afrika)

| Id                  | Identifikator            | Validering                                                                                      |
| ------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                     | Kjent land, nøyaktig lengde for det aktuelle landet, ISO 13616 MOD-97-10                        |
| `eu_vat`            | EU-mva-nummer            | Kjent medlemsstatsprefiks og den aktuelle statens nummerformat (ingen VIES-oppslag)             |
| `es_dni_nie`        | Spansk DNI / NIE         | Kontrollbokstav (verdi modulo 23); NIE er `X/Y/Z` + 7 sifre                                     |
| `it_codice_fiscale` | Italiensk Codice Fiscale | Kontrollbokstav fra tabellene for odde- og partallsposisjoner                                   |
| `pl_pesel`          | Polsk PESEL              | Vektet kontrollsum og en kodet fødselsdato som eksisterer                                       |
| `nl_bsn`            | Nederlandsk BSN          | 11-testen (vekter 9..2, -1)                                                                     |
| `de_steuer_id`      | Tysk Steuer-ID           | ISO 7064 Mod 11,10 samt reglene for sifferstruktur (ingen innledende 0)                         |
| `se_personnummer`   | Svensk personnummer      | Luhn over de siste ti sifrene og en plausibel fødselsdato (10 eller 12 sifre)                   |
| `za_id`             | Sørafrikansk ID-nummer   | Luhn over alle 13 sifrene, gyldig fødselsmåned/-dag, statsborgersiffer 0 eller 1                |
| `za_phone`          | Sørafrikansk telefon     | Prefikset `+27` / `27`, eller den nasjonale formen `0..` skrevet med mellomrom eller bindestrek |
| `za_vat`            | Sørafrikansk mva-nummer  | 10 sifre som begynner med `4` **og** «VAT» / «BTW» blant de 48 foregående tegnene               |
| `za_tax_ref`        | Sørafrikansk skatteref.  | 10 sifre som begynner med `0`-`3`, Luhn, **og** «tax» / «SARS» blant de 48 foregående tegnene   |

Fordi formatene som bare består av sifre, kolliderer med ordrenumre, byggnumre og
tidsstempler, krever de svakeste (`za_vat`, `za_tax_ref`) et signal i form av et nøkkelord, og
et frittstående tisifret `0..`-nummer behandles ikke som et sørafrikansk telefonnummer.
IBAN-numre med mellomrom (`GB29 NWBK ...`) samsvarer ikke. Ved strømmebehandling blir signalet
bare slått opp i den gjeldende blokken. ID-ene står foran de generiske telefonmønstrene,
slik at en validert identifikator beholder sin egen plassholder
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Malene `gdpr` og `popia`
velger henholdsvis EU-ID-ene og de sørafrikanske ID-ene. Selve maskeringen er fortsatt valgfri
(hard regel #20): Ingenting her endrer standardverdien for et funksjonsflagg.

### Promptinjeksjon (`promptInjection.ts`)

Oppdager fiendtlige strukturer i brukerlevert innhold og håndhever den
konfigurerte policyen. Virkemåten styres av miljøvariabler og
konstruktøralternativer:

| Innstilling        | Miljøvariabel                                                                                               | Standardverdi | Effekt                                                                                                                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivert           | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`        | Når den er `false`, avsluttes sikkerhetsmekanismen umiddelbart.                                                                                                                                                  |
| Modus              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`        | Injeksjonspolicy: `block`, `warn` eller `log`. (`redact` godtas av hensyn til bakoverkompatibilitet, men fjerner **ikke** injeksjonstekst; omskriving av PII i forespørselen styres av `PII_REDACTION_ENABLED`.) |
| Blokkeringsterskel | Alternativet `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Minste alvorlighetsgrad som kreves for å blokkere. Middels innebærer som standard bare observasjon.                                                                                                              |

**Modusprioritet** (`getMode`): kallers `options.mode` →
**overstyring via DB-funksjonsflagg** for `INJECTION_GUARD_MODE` (Kontrollpanel → Innstillinger →
Funksjonsflagg) → miljøvariabelen `INJECTION_GUARD_MODE` → miljøvariabelen `INPUT_SANITIZER_MODE` →
`warn`. En overstyring fra kontrollpanelet har derfor prioritet over miljøvariablene, slik at
brukergrensesnittet for funksjonsflagg styrer den aktive sikkerhetsmekanismen direkte (uten omstart).
DB-lesingen er feilsikker: Hvis det oppstår en feil, går sikkerhetsmekanismen tilbake til den
miljøbaserte virkemåten, og når ingen overstyring er angitt, er virkemåten identisk med
oppløsning som bare bruker miljøvariablene.

Deteksjonskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (delt sett med detektorer
   som brukes andre steder i behandlingskjeden).
2. Innebygde `DEFAULT_GUARD_PATTERNS` (for øyeblikket `system_override_inline` og
   `markdown_system_block`, begge med alvorlighetsgrad `high`).
3. Valgfrie `customPatterns` som sendes via konstruktøralternativer (strenger, regulære uttrykk
   eller oppføringer av typen `{ name, pattern, severity }`).

Når `mode === "block"` **og** minst én deteksjon oppfyller terskelen for
alvorlighetsgrad, returnerer `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I modusene `warn`/`log` logger sikkerhetsmekanismen hendelsen,
men tillater kallet. Den delte hjelpefunksjonen `evaluatePromptInjection()` eksporteres også
for kallere som må evaluere ledetekster uten å gå gjennom registeret.

**Skansegrense (v3.8.20):** detektoren undersøker bare de **første 16 KB** av
den sammenkjedede promptteksten — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` bruker `slice(0, MAX_INJECTION_SCAN_BYTES)` før
mønsterløkken kjøres. Injeksjonsdirektiver ligger nær toppen av et input, så dette
begrenser regex-CPU/GC for nyttelaster på flere hundre KB uten å svekke
deteksjonen (jf. #3932, #4041).

### Legitimasjonsmaskering (`credentialMasker.ts`)

Kjøres i **begge** trinnene, sist i standardkjeden (prioritet `95`). Redigerer
bort velkjente mønstre for API-nøkler / hemmelige tokener fra den utgående nyttelasten
(innhold i meldinger, argumenter til verktøykall, verktøyresultater) **og**
leverandørsvaret, slik at en legitimasjon som limes inn i en prompt (eller
gjentas av et verktøyresultat) ikke lekker til oppstrømsleverandøren eller tilbake
til klienten.

- **Kun opt-in**, samme konvensjon som PII-redigering (i nærheten av Hard Rule #20):
  deaktivert med mindre `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er deaktivert, er sikkerhetsregelen
  en no-op — den blokkerer aldri og skriver aldri om.
- `redactCredentials()` går gjennom hele nyttelast-/svar-treet (`walkValue()`,
  sikret mot prototypeforurensning og syklussikkert via `WeakSet`) og erstatter treff
  med en `[REDACTED:<type>]`-plassholder, mens bare grenene som faktisk ble endret
  klones.
- `CREDENTIAL_PATTERNS` dekker LLM-leverandørnøkler (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tokener (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøkler (Stripe, Square),
  skynøkler (AWS access key, Twilio, SendGrid, Mailgun), private nøkler / JWT-er,
  tilkoblingsstrenger som inneholder legitimasjon
  (`mongodb://user:pass@...`, osv.) og et generisk
  mønster for headerverdier for `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Headerformede nøkler (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redigeres strukturelt (bare verdien, med prefikset for skjemaet, som
  `Bearer `/`Basic `, bevart) i stedet for via det generiske tekstregulære
  uttrykket.
- Sikkerhetsregelen blokkerer aldri; den skriver bare om
  (`modifiedPayload` / `modifiedResponse`) og legger til metadata
  (`meta.credentialsRedacted`, `meta.count`).

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
`open-sse/handlers/chatCore.ts` (chat-familierutene som er oppført under
[Dekning og begrensninger](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` bygger listen over deaktiverte guardrails fra API-nøkkel, body og headere.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kjører guardrails i stigende prioritetsrekkefølge:
   - Deaktiverte guardrails registreres som `skipped`.
   - Hver guardrails `preCall` kan omskrive nyttelasten via `modifiedPayload`.
   - Den første `block: true` avbryter kjeden, og handleren returnerer et avvisningssvar fra guardrail.
3. Den (eventuelt omskrevne) nyttelasten sendes videre til kombinasjonsruting og videresending til upstream.
4. **Kun ikke-strømmende:** etter at svaret er satt sammen, kjører `guardrailRegistry.runPostCallHooks(...)` den samme kjeden på svaret. `block: true` her forkaster upstream-svaret og returnerer HTTP 400. Strømmende svar hopper over dette trinnet fullstendig.
5. **Kun reversibelt hvelv:** når forespørselen opprettet tokens, gjenoppretter `handleChat` dem i 2xx-svaret den returnerer, etter post-call-hookene og den strømmende PII-transformasjonen, slik at `PII_RESPONSE_SANITIZATION` ser tokens og modellgenerert PII, aldri en gjenopprettet original.

Guardrails som kaster et unntak, registreres med `error: <message>` og logges via
`logger.warn`, men kjeden fortsetter — fail-open etter hensikten.

## Dekning og begrensninger

Guardrail-registeret er bare koblet til chat-pipelinen. Disse begrensningene
er fastsatt av `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` og
`tests/unit/guardrail-pipeline-characterization.test.ts`; oppdater disse testene
bevisst når atferden endres.

### Hvor hookene kjøres

| Hook / kontroll                       | Kjøres på                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                     | Forespørsler som håndteres av `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (og `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` og Telegram-chat-proxyen. Også testendepunktet for dashbordet `/api/guardrails/test`. En blokkering før kall returnerer HTTP 400. |
| `runPostCallHooks`                    | **Bare chat-svar uten strømming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Svar med strømming når aldri frem hit.                                                                                                                                                                                                                                                                                                               |
| PII ved strømming                     | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), koblet inn i `streamingPipeline.ts` når `PII_RESPONSE_SANITIZATION` er aktivert. Dette er ikke en guardrail, så deaktiveringskanalene påvirker den ikke.                                                                                                                                                                                                                         |
| Reversibelt PII-hvelv                 | Forespørsler som håndteres av `handleChat`, men bare når `PII_REDACTION_ENABLED` og `PII_REVERSIBLE_VAULT_ENABLED` er aktivert. Tokens opprettes av `pii-masker` før kall og gjenopprettes når `handleChat` avsluttes (`src/lib/pii/requestTokenVaultScope.ts`). Deaktivering av `pii-masker` for en forespørsel betyr at ingenting opprettes.                                                                                                 |
| Middleware for injeksjonsvakt (eldre) | Alle `/v1`-ruter som inneholder prompter, inkludert chat-familien (se [ruterdekning](#injection-guard-route-coverage--red-team-phase-8--block-d)). Bare prompt-injeksjon.                                                                                                                                                                                                                                                                      |

### Hva som ikke dekkes

- **Medie-, embedding- og dataruter** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) når aldri registeret. Ingen
  PII-maskering, legitimasjonsmaskering eller modalitetsbro kjører der. Den
  eneste kontrollen deres er den eldre middleware-en for injeksjonsvakten.
- **Svar med strømming** får ingen guardrails etter kall: ingen `pii-masker` eller
  `credential-masker` etter kall, og ingen blokkering etter kall. Bare PII-transformasjonen
  for strømming brukes (når `PII_RESPONSE_SANITIZATION` er aktivert). En
  legitimasjon som gjengis i et svar med strømming, blir ikke redigert.
- **Deaktiveringskanaler kontra middleware-en (med hensikt):** middleware-en evaluerer
  prompt-injeksjon med sitt eget kall til `evaluatePromptInjection()`, uten å
  sende med noen deaktiveringsliste kontrollert av kalleren. Modusen `block` er en obligatorisk
  grense som deaktiveringer kontrollert av kalleren ikke kan omgå, også på ruter i
  chat-familien ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Deaktivering av
  `prompt-injection` hopper bare over guardrailen i registeret.

### Hva som ser et svar før kjøring etter kall

På banen uten strømming er rekkefølgen: minneuttrekking → innebygd verktøykjøring → guardrails etter kall → avslutning ved blokkering etter kall → lagring i semantisk hurtigbuffer.

- **Minneuttrekking** og **verktøykjøring** ser svaret før guardrails etter kall
  kan omskrive eller blokkere det. Siden
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) kjører
  minneuttrekkingen den uttrukne teksten gjennom `sanitizePII` når
  `PII_RESPONSE_SANITIZATION` er aktivert (både ved strømming og uten strømming),
  men et svar som senere blokkeres etter kall, er likevel allerede gjort tilgjengelig
  for minne og verktøy.
- **Den semantiske hurtigbufferen** lagrer svaret etter kjøring etter kall, så den
  lagrer det omskrevne svaret, og et blokkert svar mellomlagres aldri. Hurtigbufferoppføringer
  grupperes per API-nøkkel.

## Konfigurasjon

Miljøvariabler som leses av de innebygde sikkerhetsmekanismene:

| Variable                              | Used by                    | Effect                                                                                                    |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Sett til `false` for å deaktivere deteksjon fullstendig.                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injeksjonspolicy: `warn`, `block` eller `log`. Den eldre verdien `redact` omskriver ikke injeksjonstekst. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modus for injeksjonsvakten; også et DB-funksjonsflagg som **overstyrer** miljøvariablene (DB > ENV).      |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Laveste alvorlighetsgrad som `MODE=block` avviser: `high` (standard), `medium` eller `low`.               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Eldre alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Når `true`, maskeres PII i forespørselen (uavhengig av injeksjonsmodus).                                  |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Med `PII_REDACTION_ENABLED` opprettes reversible tokens, og de gjenopprettes i 2xx-svar.                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Styrer maskeringsfunksjonen på svarssiden.                                                                |

Sikkerhetsmekanismene i Modality Bridge leser runtime-konfigurasjon fra det DB-baserte
innstillingslageret (`getSettings()`), ikke fra miljøvariabler. Visions primærnøkler er
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og
`modalityBridgeCacheMaxEntries`. De eldre
`visionBridge*`-nøklene godtas bare som den dokumenterte lesereserven for én syklus;
skrivinger fra dashbordet bruker primærnøklene. Standardverdiene og reserveløseren finnes i `src/shared/constants/modalityBridgeDefaults.ts`, mens eldre
konstanter er beholdt i `src/shared/constants/visionBridgeDefaults.ts`.

Audio bruker `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips`, i tillegg til de delte
`modalityBridgeCache*`-innstillingene. Audio har ingen reserve for eldre nøkler fordi disse
nøklene ble introdusert med Modality Bridge-skjemaet.

Video bruker `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` og
`modalityBridgeVideoTimeout`, i tillegg til de delte `modalityBridgeCache*`-innstillingene.
Funksjonen er deaktivert som standard fordi FFmpeg/ffprobe er valgfrie driftsavhengigheter, og bildeteksting av videorammer medfører ekstra ventetid og modellkostnader.

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
