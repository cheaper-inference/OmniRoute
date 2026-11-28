# Guardrails (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Kilde til sannhet:** `src/lib/guardrails/`

Rekkverk håndhever sikkerhet, policy og innholdstransformasjoner på grensen mellom OmniRoute og oppstrømsleverandører. Hvert autovern kan inspisere (og eventuelt avvise, transformere eller kommentere) forespørselsnyttelast (`preCall`) og oppstrømssvar (`postCall`).

Systemet er** fail-open** : hvis et rekkverk kaster seg mens det utføres, registrerer registret feilen og fortsetter med neste rekkverk i stedet for å mislykkes på forespørselen. Blokkering er en eksplisitt beslutning (`block: true`), aldri en ulykke. Det eneste unntaket er en avbrutt forespørsel: når anroperens `signal` blir avbrutt, avviser et rekkverk som kaster kroken i stedet for å bli hoppet over.

Krokene gjør det** ikke** løp på hver rute eller hver respons. Les [Dekning og grenser](#coverage-and-limits) før du stoler på et autovern som sikkerhetskontroll.

## Innebygde rekkverk

Registeret laster automatisk inn disse rekkverkene i prioritert rekkefølge ved import (se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Stadium(er)    | Fil                       |
| --------- | ------------------- | -------------- | ------------------------- |
| `1`       | `agent-guard`       | `preCall`      | `agentGuard/guardrail.ts` |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`         |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`          |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`          |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`            |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`      |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts`     |

Nedre prioriterte tall kjøres** først** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3-grunnmodellen og `glm-5.3-{low,high,max}` har eksplisitte `supportsVision:false` registry/spec metadata. GLM 5.3 Flash-variantene forblir native-vision-modeller. Claude Codes `/v1/messages` rute går inn i den delte `handleChat` pre-call rekkverkskjeden** før** Claude-to-OpenAI oversettelse; nestede `Read` -verktøyresultatbilder må beskrives eller håndteres før oversettelsen løfter dem til OpenAI `image_url` innhold (#17069).

Avskjærer bildebærende forespørsler rettet mot** ikke-visjonsmodeller** og enten omdirigerer hele forespørselen til en visjonskompetent modell eller erstatter bildedelene med tekstbeskrivelser produsert av en konfigurerbar visjonsmodell før oppstrømsanropet. Dette lar tekstleverandører på en transparent måte håndtere multimodale nyttelaster.

Strømme:

1. Hopp over hvis målmodellen allerede støtter syn (med mindre den vises i listen over tvungen bro `isVisionBridgeForcedModel`).
2. Trekk ut bildedeler via `extractImageParts(messages)` (`visionBridgeHelpers.ts`), som delegerer til** enhetlig mediedetektor** `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den eneste kilden til sannhet som deles med combo-kompatibilitetsfilteret. Ekstraksjon er tillatelseslistet til formene `replaceImageParts` kan spleise tilbake (utdraget ↔ erstatte kontrakt): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` og Responses API `input_image`. Matchende bilder som er nestet inne i Claude Code `tool_result.content` og Responses-verktøyutdata trekkes også ut og erstattes ved deres opprinnelige baner; Bare indikatorformer er kombifiltermateriale og trekkes ikke ut. Hopp over hvis ingen ble funnet.
3. Løs kjøretidskonfigurasjon via `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): nye `modalityBridge*` -innstillingsnøkler vinner; eldre `visionBridge*` nøkler forblir en** en-syklus fallback** (rull tilbake vindu). Hopp over før enhver mediegjennomgang når broen er deaktivert.
4. Modusvelger (`modalityBridgeVisionMode`, se tabellen nedenfor) bestemmer omruting vs beskrive. Omrute returnerer `modifiedPayload` med bare `model` byttet, pluss meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskriv bane: capture images at `maxImages`, komponer den oppgavebevisste ledeteksten, se describe cachen, ring vision-modellen** parallelt** (`Promise.allSettled`), og injiser `[Image N]: <description>` tekstdeler i deres plass. En mislykket beskrivelse gir `null`: råbildet er bevart for unknown/vision-capable mål (#4012), men en** bekreftet direkte mål bare for tekst** eller zero-vision combo får en eksplisitt `(unavailable — no vision-capable provider connected)` tekststump for hvert ubeskrevet bilde, inkludert delvise feil og bilder utover describe-call cap (#17069). Den eksisterende all-mislykkede kombinasjonen beskriver fallback forblir på plass (#8430).
6. Returner `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Modusvelger (`modalityBridgeVisionMode`)

| Modus      | Misligholde | Oppførsel                                                                                                                                                                                                                                                                              |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Eldre heuristikk, uberørt (#6640/#7204): ikke-kombinerte/`auto/` -modeller omdirigeres til den beste vision-modellen med mindre den originale modellen allerede har brukbar legitimasjon (beskriv deretter); kombinasjonsmål beskriver alltid.                                         |
| `describe` |             | Beskriv alltid — omrutingsblokken hoppes over helt; brukerens valgte modell svarer alltid.                                                                                                                                                                                             |
| `reroute`  |             | Tving omdirigering: beskyttelsen for behold-legitimasjon-modellen omgås. Omdirigeringen-** mål** credential guard bruker fortsatt — når det ikke finnes noe brukbart synsfelt, broen blokkerer med en klar feil i stedet for å beskrive eller sende råbilder til et mål med kun tekst. |

Tvungen modus kortslutter** før** den autoheuristiske kjører; `auto` oppførselen er byte-identisk med pre-PR-1 rekkverket.

#### API-nøkkelomfang (`visionBridgeKeyScope.ts`)

Når anroperens API nøkkel begrenser `allowedConnections`, kvotepooler (`allowedQuotas`) eller modeller (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), velger broen kun omdirigering og beskriver modeller nøkkelen kan bruke, på tilkoblinger nøkkelen kan bruke. Beskriv-anropet går da alltid gjennom OmniRoute -selvsløyfen med `x-omniroute-self-loop-key-id` overskriften, så den mottatte chat-forespørselen håndhever den nøkkelens tilkobling og modellpolicy igjen. `enforceApiKeyPolicy()` respekterer den overskriften bare sammen med selvløkkebæreren, så den kan bare begrense tilgangen, og en id som ikke løser blir avvist.

Hvis ingen synsmodell er tillatt for nøkkelen, a** bekreftet mål for kun tekst** avviser bildeforespørselen lokalt med en klar HTTP 400 i stedet for å videresende bildebytes til en inkompetent oppstrøms (#17069). For mål med ukjent eller opprinnelig synsevne, beholder describe-banen sin tidligere feilåpen-atferd (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Forespørsler uten nøkkel, og nøkler uten disse begrensningene, oppfører seg nøyaktig som før.

#### Oppgavebevisst beskrivelsesforespørsel (`modalityBridgeVisionTaskAware`)

Misligholde** ekte** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) legger til teksten til** siste brukermelding** (avkortet til 500 tegn) til den grunnleggende beskrivelsen, styrer beskrivelsen mot hva brukeren faktisk spurte om (codex-vision-proxy-mønster) og ber synsmodellen om å transkribere synlig tekst. Med flagget slått av — eller ingen brukertekst — brukes baseprompten uendret.

Beskriv selvsløyfens egen OpenAI-kompatible forespørsel (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) ber alltid om `image_url.detail: "high"` — ubetinget, for hver caller/provider, ikke gated på noe klientsignal. Sampling med lave detaljer forringer OCR nøyaktigheten for nøyaktig teksttranskripsjonsoppgaven denne ledeteksten ber om, så selve describe-kallet ber alltid om høye detaljer uavhengig av hvilket detaljnivå den opprinnelige innkommende forespørselen brukte. Dette påvirker kun den interne beskrivelsesforespørselskroppen; det endrer ikke hvordan OmniRoute videresender innringerens egen `image_url.detail` på den primære forespørselen — som standard brukes separat, og bare for oppdagede OpenCode klienter, i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic -trådformat-grenen til describe self-løkken har ikke noe `detail` felt og er upåvirket av noen av standardinnstillingene.

#### Beskriv utgangslokk (`modalityBridgeVisionMaxChars`)

| Nøkkel                         | Misligholde | Spekter             |
| ------------------------------ | ----------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` eller 100–50000 |

`0` (standard) betyr** ingen hette** — beskrivelsen som returneres av `callVisionModel()` sendes gjennom uendret, og bevarer den eksisterende oppførselen. Enhver verdi i området 100–50 000 avkorter beskrivelsen med et `…` suffiks før den spleises tilbake som `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Øk dette for detaljtunge OCR oppgaver der nedstrømsmodellen trenger full transkripsjon; senk den til bundet tokenbruk på chatty vision-modeller. Dashboardfeltet ligger på Vision-fanens avanserte panel (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) og klemmer en hvilken som helst verdi mellom 1 og 99 opp til 100-gulvet, mens en eksplisitt `0` blir urørt. — `0` er en gyldig Zod verdi i seg selv (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke bare "unset"-standarden.

#### Beskriv cache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache for beskrive utganger, delt over hele prosessen. Nøkkel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med lengde-prefiksramme (ingen feltgrensekollisjoner). Modellkomponenten er** konfigurert** bromodell, ikke modellen som faktisk svarte — `callVisionModel` kan falle tilbake internt, og inntasting per forsøk vil fragmentere cachen. Mislykkede beskrivelser blir aldri bufret. Innstillinger:

| Nøkkel                          | Misligholde | Spekter |
| ------------------------------- | ----------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`      | —       |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000 |

#### Ekstern bildenormalisering (self-loop describe/base64 henting)

Når broen henter en** fjernkontroll** selve bildet — Anthropic beskriver selvanrop og claude-wire-format base64-konvertering (`ensureBase64ImagesForClaudeWire`), begge via `fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — de resulterende dataene URI sendes gjennom `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) før de blir innebygd i vision-modell-forespørselen. Overdimensjonerte bilder er nedskalert til en** 2048 px langside** (som samsvarer med resize cap OpenAI/Anthropic gjelder allerede på serversiden), som kutter opplasting av bytes/latency uten å endre hva visjonsmodellen ser. Endre størrelse bruker `sharp`, lastet via dynamisk import: på en plattform der den opprinnelige binære filen ikke klarer å laste, `normalizeDataUri()`** kaster aldri** — faller den tilbake til en passthrough av de opprinnelige bytene, så describe/base64-conversion banen fortsetter alltid å fungere. Ikke-bildebytes (en henting som ikke returnerte et dekodbart bilde) sendes også gjennom urørt. Denne normaliseringen er beregnet på bilder broen henter for sin egen selvanrop — den brukes aldri på anroperens ubehandlede nyttelast, i samsvar med opt-in-only mutasjonsprinsippet (Hard Rule #20).

#### Innstillingsskjema + migrering

De nye `modalityBridge*` nøklene er Zod-validerte i `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` -trioen og `modalityBridgeAudio*` gruppen som brukes av Audio Bridge. Migrering `141_modality_bridge_settings.sql` kopierer eksisterende eldre `visionBridge*` -verdier til de matchende nye nøklene (idempotent, overskriver aldri en operatørinnstilt `modalityBridge*` verdi); de eldre nøklene forblir akseptert som en lesereserve for én utgivelsessyklus.

#### Transparency header + statistikk

Beskriv-transformerte svar bærer `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (bygget av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`, stemplet av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`). Omdirigerte forespørsler får** ingen** header — nyttelasten var urørt og modellbyttet er allerede synlig i responskroppens `model` felt.

`GET /api/modality-bridge/stats` (administrasjonsautorisasjon, samme nivå som `GET /api/settings`) returnerer tellerne per modalitet i minnet `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og `video`. `averageLatencyMs` bruker `latencySamples`, ikke alle forsøk, som nevner; en operasjon uten timing produserer ikke en null millisekunders prøve. `bridged` forblir det bakoverkompatible aliaset for vellykkede konverteringer; mislykkede forsøk øker den ikke. Tellere tilbakestilles ved omstart av prosess ved design (telemetri, ikke regnskap).

#### Konfigurasjon av dashbord

Den dedikerte dashbordsiden er `/dashboard/settings/modality-bridge`. De URL-adresserbare `Vision`, `Audio` og `Video` fanene bevarer søkeparametere mens de bytter `tab` verdien. Vision-fanen viser aktivering, modus, modellvalg (inkludert automatisk standard), oppgavebevisste spørsmål, avanserte timeout/image/description-length/cache grenser, kjøretidstellere og en bevoktet prøveforespørsel. Audio-fanen er også live: den viser aktivering, en STT-bare modellvelger med Auto, timeout/max-clip grenser, lydtellere og en `input_audio` prøvetest. Video-fanen er funksjonell: den rapporterer FFmpeg/ffprobe kjøretidstilstanden — en av fire eksplisitte UI tilstander (`unknown` mens sonden er i flukt eller ikke kunne fullføres, `restricted` på en non-loopback dashbordvert der sonden hoppes over klientsiden, `unavailable` en gang sondert og bekreftet mangler, eller `available` med FFmpeg/ffprobe modellversjonene, filteret — enable/model/frame/video/timeout begrenseren pers) synskompatible modeller, og eksponerer videotellere.

Det tidligere Vision Bridge-kortet under AI innstillinger er en kompatibilitetslenke til den nye siden; den eier ikke lenger en ekstra kopi av skjemaet. Medieleverandører kobler også bilde-til-tekst- og tale-til-tekst-arbeidsflyter til de tilsvarende Modality Bridge-fanene uten å fjerne den eksisterende Speech-to-Text-lekeplassen.

**Omgåelse av selvsløyfe-opptak:** når de beskriver anropsruter gjennom OmniRoute egen `/v1` -selvsløyfe (ikke-standard leverandørmodell), sender underforespørselen `x-omniroute-admission-bypass: internal` og autentiseres med den løste selvsløyfelegitimasjonen — den lokale `sk_omniroute` vaktposten i lokal modus, eller den operatørkonfigurerte `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env-nøkkelen (#1350 `REQUIRE_API_KEY=true` deploy fortsatt kan kjøre deployer). Omgåelsen er kun æret for den nøyaktige legitimasjonen, så eksterne klienter kan ikke bruke overskriften til å hoppe over opptak.

Eldre standarder lever i `src/shared/constants/visionBridgeDefaults.ts`; de nye mode/task-aware/cache standardinnstillingene og innstillingsløseren lever i `src/shared/constants/modalityBridgeDefaults.ts`. Rekkverket avslører et `deps` konstruktøralternativ slik at tester kan injisere falske `getSettings` og `callVisionModel` -implementeringer.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Avskjærer lydbærende chat-forespørsler før de når et mål som ikke er kjent for å akseptere lydinngang. Den omdirigerer aldri chat-forespørselen: lyddeler blir transkribert gjennom det eksisterende OpenAI-kompatible flerdelte endepunktet, og den valgte chat-modellen fortsetter med teksttranskripsjoner.

Strømme:

1. Løs `supportsAudio` til `getResolvedModelCapabilities()`. Eksplisitt leverandørregistermetadata vinner, deretter statisk modellmetadata, og deretter synkronisert `modalities_input`. En erklært inndataliste uten `audio` er `false`; ingen kapasitetsbevis gjenstår `null`. Både `false` og `null` aktiverer den konservative broen, mens `true` omgår den.
2. Løs `modalityBridgeAudio*` innstillinger og trekk ut spleisbare lyddeler på toppnivå fra hver melding gjennom den delte `detectMediaParts()` detektoren. Støttede ledningsformer er OpenAI `input_audio`, `audio_url` og `source.media_type: "audio/*"`. Nestet lyd oppdages for ruting, men fjernes ikke av skjøtebanen. Arbeidet er begrenset av `modalityBridgeAudioMaxClips`; senere deler forblir urørt.
3. Hedre en konfigurert `provider/model`, eller la `selectAudioBridgeModel()` gå `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrekkefølge og velg den første modellen med en brukbar aktiv leverandør-legitimasjon.
4. `callAudioTranscription()` konverterer base64/data-URI lyd til en flerdelt `file`, eller laster ned en ekstern `audio_url` gjennom den offentlige kun utgående vakt med DNS pinning og en 25 MB binding. Den POSTs deretter filen og den valgte modellen til den lokale `/v1/audio/transcriptions` -selvsløyfen, autentisert med `resolveSelfLoopBearer()`. Den eksisterende transkripsjonsruten utfører vanlig legitimasjonsoppslag, cooldown/rate-limit håndtering og leverandørutsendelse.
5. Vellykkede samtaler erstatter delene med `[Audio N]: <transcript>`. Samtaler kjøres med `Promise.allSettled`: en individuell feil bevarer den originale lyddelen (#4012 kontrakt). Hvis hvert anrop mislykkes og målet er bevist `supportsAudio === false`, blir delene `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). For et ukjent mål (`null`), forblir et resultat av alle feil urørt. Et bevist mål for kun tekst uten brukbar STT legitimasjon mottar den samme eksplisitte stubben uten å utstede et nettverksanrop.

Vellykkede transkripsjoner bruker den prosessomfattende Modality Bridge LRU/TTL bufferen. Tasten kombinerer lydreferansen, den stabile `audio-transcription` operasjonsetiketten og valgt STT -modell; feil blir aldri bufret. Lydforsøk oppdaterer de delte `bridged`, `cacheHits`, `failures` og `lastUsedAt` -tellerne. Transformerte svar bærer `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; uberørte forespørsler mottar ikke et Audio Bridge-segment.

Kjøretidsinnstillinger er DB-støttet og Zod-validert:

| Nøkkel                        | Misligholde | Spekter           |
| ----------------------------- | ----------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —                 |
| `modalityBridgeAudioModel`    | `""`        | Auto eller STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10              |

Den delte hurtigbufferen forblir kontrollert av `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Avskjærer videodeler på toppnivå i Chat Completions `messages` og Responses API `input` før et mål uten kjent innfødt videostøtte kalles opp. Støttede former er `input_video`, `video_url`, `video_source`, HTTPS URLs og `data:video/*;base64,...` data URIs. Vanlige filnavn i tekst behandles ikke som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) eier forespørselsgjennomgang, capability/policy -sjekken, aggregering per forespørsel og svarnyttelasten. — -innhenting per videoverk, cachen for hele resultatet, som beskriver en rammesekvens (som smelter sammen en hvilken som helst oppringer-erklært lydtranskripsjon), og metrics/abort/cleanup — per forsøk er skjult bak `processVideoPart` i `videoBridgePipeline.ts`, kalt én gang per videodel inne i `preCall` loop. Den modulen definerer også de eksplisitte portgrensene `VideoMediaBrokerPort` (anskaffe byte og trekke ut samplede rammer), `VideoAudioTranscriptionPort` (sammensmelte en anroper-erklært lydtranskripsjon med samplede bildetekster) og `VideoDrilldownPort` (den gamle råbutikkformen). Produksjon STT og frame retention er sammensatt rundt den beskrivende porten gjennom `createVideoSttAdapter` og `createVideoDrilldownAdapter`; sistnevnte bruker livssyklusen med delt ugjennomsiktig håndtak.

Den offentlige `/v1` -forespørselsbanen importerer eller påkaller aldri en underprosess. Eksterne videoer lastes ned under en grense på 50 MiB ; inline base64-videoer har en konservativ 36 MiB dekodet per-video cap, slik at model/messages/framing konvolutten kan forbli innenfor den offentlige JSON forespørselsgrensen på 50 MiB. Inline lengde og dekodede størrelsesestimater kontrolleres før tildeling. HTTPS kreves på den første eksterne URL og hver omdirigering, ved å bruke den eksisterende kun offentlig utgående vakt med DNS pinning. Bytene krysser deretter den nøyaktige interne `POST /api/modality-bridge/video/extract` meglergrensen. Denne ruten er både `LOCAL_ONLY` og `SPAWN_CAPABLE`, aksepterer bare en per-prosess autentisert, klarert tilbakekoblingsforespørsel, og aksepterer aldri en URL, filsystembane, kjørbar fil eller argumentliste. API -rørledningen i kroppsstørrelse og behandlerens inkrementelle kroppsleser håndhever uavhengig en 50 MiB meglerinngang. Den avgrensede køen kjører én ekstraksjon om gangen, tillater fire ventende jobber og begrenser ventende inndata ved 100 MiB.

Inne i megleren leser `ffprobe` en privat lokal fil; tillatelseslisten med fast format ekskluderer spilleliste- og manifestformater. For tillatte MOV-familiebeholdere forblir eksterne MOV -datareferanser deaktivert som standard, og den faste kommandoen velger dem ikke. Både `ffprobe` og `ffmpeg` bruker `file` -only -protokollens hviteliste, én tråd, faste argumentmatriser, ingen skall og kjørbare filer løst fra `PATH`. Forsidestrømmer med vedlagte bilder er ikke spillbare kandidater. Alle spillbare strømmer må tilfredsstille grensene, og en eksplisitt standardstrøm foretrekkes før den deterministiske laveste indeksen tilbake. Videoer er begrenset til 600 sekunder, 8 192 piksler per dimensjon og 33 554 432 kildepiksler. FFmpeg sampler 1–16 midtpunkts JPEG rammer, skalerer ned langsiden til maksimalt 1024 piksler uten å oppskalere mindre innganger, og mottar aldri en URL. Sampling er `uniform` som standard. De valgfrie `scene_aware` og eksperimentelle `segment_aware` policyene utfører én ekstra fast FFmpeg passering over den allerede validerte lokale strømmen, velger avgrensede `showinfo` scenetidsstempler og faller tilbake deterministisk til de samme ensartede midtpunktene på detektorfeil, tidsavbrudd, misformet utgang eller et tomt kandidatsett. Segmentbevisst modus tildeler midtpunktsprøver proporsjonalt med de validerte sceneintervallene; segmentbevisste bevis og reserveadferd er detaljert nedenfor. Den harde 16-rammers hetten brukes etter valg i hver policy. Når en scenebevisst forespørsel kun har et budsjett på ett bilde, bruker den det ensartede midtpunktet til det aktive fullvideo- eller fokusvinduet og rapporterer `policyEffective: uniform`: en enkelt valgt sceneramme kan ikke bevare begge tidsmessige ender. En innringer kan eventuelt gi et begrenset fokusvindu (`start`/`end` sekunder); grenser er klemt til medievarigheten, reverserte eller ikke-endelige vinduer avvises, og alle samplingspolicyer utføres kun innenfor det normaliserte intervallet. Det resulterende vinduet er inkludert i samplingsmetadata og i det uklarerte beskrivelsesprefikset, slik at nedstrømsmodeller kan skille et fokusert utdrag fra hele tidslinjen.

Semantisk bildetekstfokus er en separat, eksplisitt innstilling. Standard `full` analysemodus bevarer den eksisterende rammemeldingen og videresender aldri forespørselstekst til bildetekstmodellen. I `focused` modus leser broen kun den siste ikke-tomme brukerautoriserte `text`/`input_text` fra samme chat- eller svarbeholder, normaliserer den til NFC, kollapser kontrolltegn og mellomrom og begrenser den til 500 Unicode-kodepunkter. Et tomt resultat faller tilbake til den nøyaktige `full` ledeteksten. Et brukbart hint er serialisert som JSON i en dedikert upålitelig brukerkontekstblokk og kan bare prioritere observerbare detaljer; den kan ikke overstyre den separate advarselen mot å følge instruksjoner som er synlige eller hørbare i media. Tekstfokus utleder aldri `start`/`end` eller endrer den tidsmessige sampleren.

#### FU-07 strukturelle segmentbevis

`segment_aware` bruker én avgrenset pre-analyse pass over den allerede validerte lokale videostrømmen. Den faste filterkjeden skaleres først til maksimalt 320 piksler bred, oppdager sceneendringer og frosne intervaller, og prøver deretter med 1 bilde per sekund for uskarphet, gjennomsnittlig luma og spatial/temporal informasjon. Passet er begrenset til 600 strukturelle prøver, én FFmpeg/filter tråd, den samme `file` -only protokollen og beholdertillatelseslistene, en 1 MiB prosess-output bound, og maksimalt 30 sekunder inne i meglerens delte abort/deadline. Den aksepterer aldri en kommando, filter, bane eller URL fra forespørselen.

De strukturelle verdiene er deterministiske prøvetakingsbevis, ikke semantisk videoforståelse. De utleder ikke emner, handlinger, bildetekster, tale eller brukerintensjon. Scene- og frysegrenser danner segmenter; frys dekning, uskarphet, eksponering, romlige detaljer og tidsmessige endringer påvirker bare hvordan det eksisterende budsjettet på 1–16 rammer fordeles. Et fullstendig frosset segment er begrenset til én ramme, mens ikke-frosne segmenter konkurrerer om det gjenværende budsjettet. Når grensene overstiger rammer, beholdes ensartet tidslinjedekning slik at raske tidlige kutt ikke kan skjule et langt etterfølgende segment. Scenegrenser innenfor 1-sekunds analyseoppløsningen til en frysegrense er koalesert.

Manglende filtre, malformed/empty -bevis, en detektorfeil eller den begrensede tidsavbruddet før analyse er åpen for den eksakte enhetlige midtpunktspolicyen. En oppringeravbrudd eller en meglerfrist svikter ikke åpen: den avslutter underprosessen under flyging, forhindrer senere uttrekking av ramme, og det private midlertidige treet fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske virkelige FFmpeg armaturer for post-dedup bildetekst-anrop besparelser, tett-bevegelse budsjettallokering, blur/exposure/SI-TI bevis, raske kutt med en lang hale, og gradvis-fade falske positiver. Den registrerer veggtid før analyse og, der `/usr/bin/time` er tilgjengelig, underordnet CPU og peak RSS. Kvalitetskontrollene er kun strukturelle orakler. Virkelig bildetekstmodellkvalitet forblir `HOLD` fordi denne selen ikke har noe autorisert endepunkt eller frossen dommer. Monetære besparelser forblir også `HOLD` med mindre `--caption-cost-per-call-usd` gir et eksplisitt positivt anslag per samtale; manuset lager aldri noen av resultatene.

Hver ramme er begrenset til 4 MiB, alle rå rammer til sammen til 23 MiB, og den serialiserte meglerresponsen til 32 MiB. En privat midlertidig katalog er fjernet i `finally`. OmniRoute pakker ikke FFmpeg og godtar ikke en tilpasset kjørbar bane. Før teksting bruker broen et konservativt visuelt dedupliseringspass: hver JPEG reduseres til en 16 × 16 gråtonebuffer og sammenlignes kun med den siste rammen som ble beholdt. For et forespurt bildetekstbudsjett over én ramme, gir utvinning en avgrenset kandidatpool på opptil det dobbelte av budsjettet og aldri mer enn 16 rammer. Den forespurte taksten brukes kun etter deduplisering, med de første og siste valgte kandidatene bevart under endelig uttynning når budsjettet er på minst to. Den versjonerte `grayscale-16x16-mean-cells-v2` policyen bruker den største av gjennomsnittlig luma-delta og forholdet mellom miniatyrbildeceller hvis normaliserte delta er minst 0,05. Duplikatterskelen er konstanten 0,04, valgt for forutsigbarhet i stedet for eksponert som en kjøretidsinnstilling. Dette sekundære høykontrastsignalet bevarer små bevegelser og synlige tekstendringer som en gjennomsnittlig sammenligning kan skjule. Komparator- eller dekoderfeil svikter åpen og holder dekningen. Utdatametadata skiller ut utdragne kandidater, vellykkede brukte rammer og visuelle duplikater droppet.

En eksplisitt merket videodel kan be om et tidsstemplet kontaktark. Broen bygger på det meste et 4-søylers, 16-rammers JPEG rutenett. Hver celle på 512 piksler brenner kildetidsstempelet til et bunnbånd med høy kontrast, mens de samme tidsstemplene forblir i tekstlige metadata for nedstrøms tilknytning og revisjon. Den komplette JPEG forblir begrenset til 32 MiB. Hvis `sharp` ikke kan dekode eller komponere rutenettet, faller broen tilbake til de individuelle JPEG rammene; en klientavbrudd forplanter seg fortsatt gjennom arkoperasjonen.

Markedsføringsbevis er bevisst atskilt fra mikrobenchmark for syntetisk sammensetning. `scripts/perf/video-bridge-contact-sheet-eval.ts` definerer en A/B -sele med skjemaversjon for ekte OpenAI-kompatible vision-modeller. Den måler leverandørrapporterte tokens, ende-til-ende vegglatens (inkludert arksammensetning), antall modellanrop og manifest-definert faktaoppbevaring. Råmodellsvar skrives ikke til rapporten; bare SHA-256 sammendrag og samsvarende fakta IDs beholdes. Selen foretar ingen nettverks- eller betalingsmodellanrop med mindre `--execute-real` er bestått og `--model`, `OMNIROUTE_BASE_URL` og `OMNIROUTE_API_KEY` er konfigurert. Uten den eksplisitte virkelige kjøringen forblir den maskinlesbare dommen `HOLD`; syntetiske payload/call-count målinger alene er ikke reklamebevis.

Den separate `scripts/perf/video-bridge-promotion-eval.ts` bruker FU-07 eller FU-09 observasjoner. Kampanjeopptak krever alle de åtte syntetiske scenariotypene pluss et desinfisert ekte klipp, minst tre målte repetisjoner per rolle og sak, alle ti erklærte beregninger, frosne media/prompt/expected-fact/settings sammendrag, unik observasjons- IDs og bekreftet seedet A/B rekkefølge. Utførelseskvitteringen binder korpussammendrag, eksakt kandidat SHA og modellrevisjon. Manglende eller ugyldige målinger forblir `HOLD`, inkludert CPU over 30 s, topp RSS over 512 MiB eller pre-analyse over 30 s. Dette er bevis-innrømmelsesgrenser, ikke en ny runtime RSS håndhevelsesgaranti.

FU-07 krever minst 98 % kvalitetsoppbevaring og p95-latens ikke mer enn 1,2x grunnlinje, pluss enten en 0,05 absolutt kasusbalansert gjennomsnittlig gjenkallingsforbedring ved tilsvarende gjennomsnittlig bildetekstanrop, eller minst 10 % færre gjennomsnittlige post-dedup-bildetekstanrop. FU-09 krever minst 0,85 kvalitet, 95 % oppbevaring, 20 % median latensreduksjon og 10 % tokenreduksjon. Tap av kritiske fakta, overholdelse av injeksjoner eller manglende bruk forhindrer markedsføring. Én kjøring kan ikke fremme noe: `--previous-report` bekrefter to distinkte, ikke-overlappende, etter hverandre kvalifiserte kjøringer av samme policy/model revision/candidate/corpus. Et prøveeksperiment kan ikke bekrefte et kontaktarkeksperiment.

Samlere bør score svar i minnet og lagre `responseDigest` pluss beregninger og observasjonsbindinger, aldri svartekst. Forbrukeren leser også gamle råobservasjoner, men kopierer aldri den teksten inn i rapportene sine. Nøyaktig en av `responseDigest` eller `rawResponseText` aksepteres for hver observasjon. Den versjonerte godkjenningslisten forblir tom med en uforanderlig `hold` standard. En kvalifisert oppføring krever bevisreferanse, policy, modellrevisjon, eksakt kandidat SHA, manifest sammendrag og to distinkte kjøringer IDs; motstridende sammenhenger avvises. Disse metadataene er en revisjonskontrakt, ikke et bevis på at en referert fil inneholder ekte målinger. Se gjennom de faktiske kvitteringene før du legger til noen oppføring. Ledelsesstatistikkens endepunkt og videodashbordet viser konservativ beredskap. Et konfigurert modellalias alene etablerer ikke revisjonen eller den kjørende kandidaten SHA, så gjeldende dashbord rapporterer `HOLD` i stedet for å gjenbruke kvalifisering fra en annen utførelseskontekst. Eksplisitt eksperimentelt utvalg forblir atskilt fra promotering; ingen standard endres automatisk.

Innringere kan knytte en valgfri `transcript.cues` matrise til en støttet videodel når de allerede har justert tekst. Hver cue må ha `text`, et begrenset `start`/`end` -intervall innenfor den undersøkte varigheten, og en hvitlistet `source` (`client`, `embedded` eller `audio-bridge`); `confidence` er standard til `1` og må forbli mellom `0` og `1`. Nøyaktige dupliserte signaler er kollapset. OmniRoute starter aldri transkripsjon fra disse metadataene: validerte signaler kopieres til det beskrevne resultatet med kilde, konfidens og intervall, og gjengis som upålitelige observasjoner ved siden av bildetekstene. Ugyldig, utenfor rekkevidde eller herkomstfri tekst avvises i stedet for å blandes inn i bildetekststrømmen. Begge transkripsjonskanalene for forespørsler normaliserer oppgitt herkomst til `client`, inkludert selvhevdende `embedded` eller `audio-bridge` etiketter. Bare en servereid adapter kan tildele disse klarerte etikettene gjennom argumentet `trustedSource` som kun er kodet; et request JSON felt kan ikke nå det argumentet. Transkripsjonstekst forblir upålitelig medieavledet innhold, uavhengig av opprinnelse, og må aldri avgjøre autorisasjon.

En avansert oppringer kan gi et `audioTranscript` spor for den samme videoen; den behandles som klientlevert tekst, ikke bevis på servertranskripsjon. Fusjonssømmen kjører visuelle og lydobservasjoner under én frist og avbryter signal, bestiller dem på en felles tidslinje, kollapser nøyaktige duplikater og rapporterer et delvis resultat når bare én side lykkes. En ugyldig `audioTranscript` degraderer til det delvise resultatet — den visuelle beskrivelsen beholdes og lydgrenen registrerer en renset feilkode — i stedet for å feile hele videoen. Tilgjengelighet per gren, det delvise flagget og de sanerte feilkodene bevares i det beskrevne resultatet, i autovernmetadataene (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), i resultatbufferens metadata og i brofusjonstellerne. Standard Video Bridge-bane påkaller ikke tale-til-tekst eller laster ned en ekstra mediekopi; uten det eksplisitte sporet forblir det kun video.

**Oppbevaring av transkripsjon (#12150 P1).** Dette gjelder automatisk når Video Bridge (selv opt-in) gjengir en transkripsjonssignal — er det ikke noe separat oppbevaringsflagg. Når en forespørsel gjengir en hvilken som helst transkripsjonssignal (en anroper-erklært `transcript` eller en sammensmeltet `audioTranscript`), merker autovernet den `videoBridgeObserved` og produserer en redigert skygge av videobeskrivelsen — en identisk gjengivelse der hver signals friteksttekst er erstattet av `[redacted-video-transcript]`, bygget ved å sette sammen feltet før den strukturerte strengen. flat tekst, slik at intet signalinnhold — kontradiktorisk eller vanlig, inkludert kropper som inneholder `]` som `[inaudible]`/`[music]` — kan overleve). Brødteksten i den vedvarende anropsloggforespørselen bytter hver videoavledet tekstdel for den redigerte skyggen, matchet av innholdslikhet; `fullText` ankeret leses på nytt fra den ferdige pre-call rekkverksnyttelasten, slik at kampen fortsatt lykkes etter at senere kjettingrekkverk ( PII og credential maskers, priorities 10/95) omskriver beskrivelsesteksten på plass og etter system-prompt/handoff/memory injeksjon omformer meldingsarrayen. Kroppen som sendes oppstrøms til modellen er uendret. En observert forespørsel fyller heller ikke ut noe holdbart minne (både forespørsels- og responsavledet utvinning hoppes over), så modellens eget svar kan ikke ekko transkripsjonstekst i Memory.

**Rå videofelt (#12430).** Når broen er aktivert og innebygd videostøtte er ukjent eller fraværende, aktiverer definerte `transcript`/`audioTranscript` -felt også `videoBridgeObserved`, selv etter beskrivelsesfeil eller en `maxVideos` -grense. `null` og tomme strenger teller; fraværende felt og ikke-videometadata gjør det ikke. Beholdte kopier redigerer disse feltene eller utelater forespørselen, og caches/Memory blir forbigått.

På disse reservebanene blir gyldige anropssignaler støttede `text`/`input_text` -deler i stedet for ikke-standard leverandørfelt. Begge sporene som er levert av forespørselen forblir upålitelige `client` observasjoner, med en eksplisitt advarsel om at videoen ikke ble beskrevet og tidsstempler ikke ble bekreftet mot media. De eksisterende 256-cue/64-KiB total- og per-cue-budsjettene gjelder på tvers av de to sporene sammen; tidsstempler må passe til meglerens 600-sekunders tak og eventuelt medfølgende fokusvindu. Ugyldige spor blir forkastet, ikke videresendt som vilkårlig tekst; et gyldig søsken kan fortsatt brukes med mindre det samlede budsjettet deres overskrides. Null/empty feltene legger ikke til tekst. Ingen mediehenting eller transkripsjon legges til av denne reserven. Utskriftsutvidelsesfelt fjernes fra reservevideobæreren og dens `video_url`/`source` -objekter. Tillatelseslisten for OpenAI wire forblir streng; ukjente innfødte videobærere forblir tilgjengelige og kjente tekstmål holder trygge markører. Strukturerte redaksjonsskygger beskytter den vedlagte transkripsjonsteksten, mens den opprinnelige oppringereide forespørselen forblir uendret. Native-støttede mål og funksjonshemmede broer beholder sin eksisterende bypass-atferd.

Ytterligere beholdte kopier bruker det samme observerte forespørselssignalet. Det ubehandlede øyeblikksbildet av klientforespørsel fra før-rekkverk, ventende forespørsel i minnet og loggen for tidlig avvist forespørsel erstatter strukturelt transkripsjonsfelt i videodeler; strengmeldinger syntetisert av pipeline-stadier og kontekstoverlevering blir redigert ved persisted-request-body-vasken. Den vedvarende `video_content_removed` markøren gjør at `previous_response_id` fortsettelsen ikke lukkes i stedet for å rekonstruere tekst som med vilje ble forkastet. Hvis en observert forespørsel mister sin per-del redaksjonsskygge før logging, eller til og med en av flere videoskygger ikke samsvarer etter senere forespørselsmutasjoner, utelates den beholdte forespørselsteksten helt i stedet for å beholde et delvis redigert transkripsjon.

For en observert forespørsel kan et modellsvar sitere hvilken som helst del av transkripsjonen uten en strukturert signalgrense. Dens vedvarende anropslogg- `responseBody` erstattes derfor av en utelatelsesmarkør; den detaljerte rørledningsartefakten (som kan inkludere upstream/client kropper og strømklumper) beholdes ikke. Semantikk, idempotens og resonnement-replay cacher omgår lesing og skriving for den forespørselen. Leverandørforespørselen og det klientsynlige svaret forblir uendret. Tidlige keepalive-bytes tappes fra den midlertidige bufferen når den detaljerte artefakten utelates. Kiro sin misformede EventStream -advarsel rapporterer bare antallet nyttelastbyte, aldri innholdet eller JSON -parserens råfeil. Dette hevder ikke at alle urelaterte provider/plugin diagnostikker har blitt revidert; det bredere retained-sink-sveipet spores i #11658.

Den interne `/api/modality-bridge/video/drilldown` livssyklusen er et separat loopback/token-authenticated buffersubstrat. Hver operasjon krever også en kanonisk ugjennomsiktig prinsipp ID. Før en produksjonsanroper aktiveres, må den utlede den ID fra den autentiserte leietakeren og må aldri videresende en klientvalgt verdi. Hurtigbuffernøkler binder den prinsipalen til kanonisk sesjon og videoreferanse IDs, lagrer kun SHA-256-derived -nøklene deres, og omfanger både lesing og sletting til den samme prinsipalen. Bufferen lagrer maksimalt 16 avledede JPEG rammer per oppføring, utløper dem etter ti minutter, og støtter avgrensede `start`/`end` -lesninger eller eksplisitt øktsletting.

Hver rektor er begrenset til 16 oppføringer og 64 MiB kanoniske JPEG data. Disse grensene er uavhengige av det globale 64-entry/256 MiB taket: rektorkvotepress kaster bare ut den rektors minst nylig brukte oppføringer før global LRU utkastelse vurderes. Utløpte oppføringer blir feid fra både hovedregnskap og globalt regnskap for bufferaktivitet, mens kansellering og valideringssvikt ikke forplikter til en delvis erstatning.

Bufferen avviser ikke-kanonisk Base64, overflødig polstring, ikke-JPEG-medier, misformet eller avkortet JPEGs og JPEGs som produserer en advarsel under en avgrenset fullbilde `sharp` dekoding. Den koder hvert akseptert bilde på nytt som en kanonisk JPEG, henter bredde og høyde fra de dekodede bytene i stedet for å stole på anropsfelt, og forkaster eventuelle etterfølgende polyglotbyte i stedet for å beholde dem. Bare den avgrensede kanoniske komprimerte bufferen belastes begge kvotene. JSON -ledningsgrensen inkluderer Base64-overhead for 32 MiB -taket med dekodet inngang. Hver lagret avledning registrerer sin validerte JPEG format/resolution, samplingspolicy, avledningsversjon, opprettelsestid, server-beregnet innhold-hash og hash-overordnet referanse pluss den klarerte anroperens overordnede innhold-hash. Kansellering sjekkes mellom asynkrone decode/hash faser før atomcache-commit.

Produksjonsprodusenten gjenbruker allerede avledede meglerrammer bare etter vellykket visuell analyse, uten andre video download/extraction. Det krever operatør `modalityBridgeVideoDrilldownEnabled=true`, strengt per-part `drilldown: true` og en autentisert API-nøkkelpost ID. Klient-erklærte principal/session verdier etablerer aldri eierskap. Uten alle tre betingelsene hash, endrer størrelsen eller beholder ikke flere rammer. Oppbevaringssvikt bevarer den brukbare visuelle responsen. Godkjente forespørsler omgår hele videoresultatbufferen, slik at bufrede resultater aldri spiller av håndtak på nytt.

Vellykkede JSON og SSE svar avslører maksimalt fire ugjennomsiktige håndtak i den avgrensede `x-omniroute-video-drilldown` overskriften. Autoriserte nettleseropprinnelser kan lese den overskriften uten å utvide CORS opprinnelsespolicy. Nye håndtak bruker `v1.<32-byte random base64url token>`, og registeret beholder bare deres SHA-256 hasher. reader/header parseren godtar også eldre 64-hex-tokens. Den autentiserte offentlige forbrukeren er `GET /api/v1/video-bridge/drilldown?handle=...`, uavhengig av `modalityBridgeVideoDrilldownRemoteEnabled=true`. Eksplisitt vedvarende falsk tilbakekaller tilgang selv når den gamle `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback er aktivert. Produksjonsbevaring har den analoge gamle `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` reserven. Begge reservene er standard av.

Forbrukeren henter eierskap fra den autentiserte nøkkelen og bruker nøkkelpolicy: både GET og DELETE tilhører `video` endepunktkategorien, inkludert `/v1` og `/api/v1` aliasene. Nøkler med en ikke-tom endepunktgodkjenningsliste må inkludere `video`; ubegrensede nøkler forblir kompatible. Forbrukeren returnerer den samme 404 for ukjent, utløpt og en annen nøkkels håndtak. Den aksepterer `variant=preview|standard|detail` (maksimal JPEG dimensjon 320/640/1280, aldri oppskalert), `limit=1..8` (eller det gamle `frames` aliaset, aldri begge deler), nullbasert `page`, og valgfri `start`/`end` -fokussekunder. Dupliserte søkenøkler og vinduer med omvendt fokus avvises. Hver returnerte variant har en hash av dets faktiske innhold og faktiske oppløsningsmetadata, knyttet til den beholdte kilden. Varianter er utledet ved lesing i stedet for lagret som ekstra beholdte kopier. JSON responsen, inkludert Base64/envelope, er begrenset til 32 MiB; en overdimensjonert side returnerer 413 og klienten må be om færre rammer. Leser sjekkkansellering rundt hver endring av størrelse og kontrollerer håndtakets gyldighet før retur. `DELETE` av eieren er idempotent; sletting eller TTL -utløp frigjør den beholdte kilden og bruksregnskapet.

Den delte butikken er prosesslokal: håndtak utløper ved omstart og kan ikke overføres mellom uavhengige OmniRoute prosesser. Administrasjonsstatistikk avslører effektiv oppbevaring/fjernpolicy og samler bare beholdte entries/bytes, aldri media, referanser, hoved- IDs eller håndtak. Videoinnstillingspanelet viser disse verdiene og kan vedvare begge samtykkebryterne. Denne implementeringsdokumentasjonen er ikke bevis for live distribusjon eller promotering; Aksept av ekte modell spores separat.

Frames er undertekster sekvensielt med den konfigurerte videomodellen. En tom videooverstyring arver Visjon-innstillingen; hvis begge er tomme, velger Vision-autoruteren den effektive synskompatible modellen. Vellykkede bildetekster erstatter den originale delen med et stabilt `[Video description:` prefiks som også markerer teksten som en upålitelig medieavledet observasjon og forteller nedstrømsmodeller om ikke å følge instruksjoner som finnes i media. Frame-caption cache-nøkler inkluderer JPEG bytes, ledetekst, tidsstempel og effektiv modell; bare vellykkede bildetekster bufres. Cache-oppføringer beholder den faktiske vellykkede produsentmodellen, inkludert en reservemodell; broen rapporterer `mixed` når forskjellige rammer ble produsert av forskjellige modeller. Et cache-treff gjenbruker den produsentidentiteten i stedet for å ommerke den som den forespurte rutingsplanen. Hele videoresultatbufferen er tastet inn på hver inngang som endrer utdata- — prompten, effektiv modell, samplingspolicy, bildeantall, semantisk analysemodus, SHA-256 fingeravtrykket til det normaliserte fokushintet, fokusvinduet, `transcript`, `audioTranscript`, og kontaktarkflagget —, så å endre noen av disse dimensjonene er en usaklig gjenbruk av cache, aldri. Den visuelle dedup-policyversjonen, terskelen og antall avgrensede kandidatbilder er også eksplisitt i resultatbuffernøkkelen og metadataene; En endring i retningslinjene kan derfor ikke gjenbruke en foreldet helvideobeskrivelse. Result-cache v4 metadata holder modusen og fingeravtrykket, aldri den rå brukeroppgaven. Guardrail-metadata rapporterer både de forespurte og effektive analysemodusene; en forespurt `focused` modus uten brukbar brukertekst rapporteres som effektivt `full`.

Rekkverket trekker ut alle støttede videodeler, men beskriver ikke mer enn `modalityBridgeVideoMaxVideos`. For et mål som har vist seg å ha `supportsVideo === false`, blir mislykkede og overbegrensede videoer eksplisitte sikre tekstmarkører, slik at ingen rå video overlever. Når kapasiteten er ukjent, beholder disse delene sin videobærer; enhver reservetranskripsjon følger den avgrensede tekstkonverteringen ovenfor. Mål med `supportsVideo === true` omgår broen. Klientforespørselsavbruddssignalet forplanter seg gjennom nedlasting, meglerkø, underprosesser og bildetekstanrop; avbryter stopp mellom videoer og mislykkes aldri åpen for råmedier.

Kjøretidsinnstillinger er DB-støttet og Zod-validert:

| Nøkkel                              | Misligholde | Rekkevidde / oppførsel                                                                                 |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri kjøretid, opt-in                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarer generiske bildetekster; `focused` bruker begrenset, upålitelig siste-brukerkontekst     |
| `modalityBridgeVideoModel`          | `""`        | Arv Vision Bridge-modellen                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proporsjonal `segment_aware`; detektorfeil faller tilbake til `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Eldre vedvarende videotidsavbruddsverdier over 120 sekunder er fastholdt til meglerfristen; nye innstillinger skriver over at grensen avvises. `GET /api/modality-bridge/video/runtime` krever klarert stemplet tilbakekoblingslokalitet før autentisering eller kjøretidsundersøkelse, og krever deretter administrasjonsautentisering. Den returnerer bare `available`, desinficerte FFmpeg/ffprobe -versjoner, og en fast årsak når kjøretiden er utilgjengelig. Det interne ekstraksjonsendepunktet er ikke en offentlig opplasting API: kømetning returnerer `503` pluss `Retry-After`, en anropers frakobling returnerer `499`, og den faste meglerfristen returnerer `504`. Konverterte svar legger til `video->text;model=<visionModel>;parts=<videos>` til den sentrale `x-omniroute-modality-bridge` overskriften uten å fjerne Vision- eller Audio-segmenter.

### PII Masker (`piiMasker.ts`)

Kjører på** både** etapper.

- **`preCall`** kloner nyttelasten, går `system`, `messages`, `input` og `prompt` (inkludert vanlige strengelementer), og bruker `processPII()` (fra `@/shared/utils/inputSanitizer`) til streng `content`/`text` -felt. Når `PII_REDACTION_ENABLED=true`, blir oppdaget PII redigert i den utgående nyttelasten. Dette er uavhengig av `INPUT_SANITIZER_MODE` (som kun kontrollerer politikk for prompt-injeksjon). Når redigering er slått av, teller gjenkjenning av anropsposter uten å omskrive innhold.
- **`postCall`** dypkloner svaret, kjører `sanitizePIIResponse()` pluss Responses-API-shape-maskeren (`maskResponsesOutput` — dekker `output_text` og `output[].content[].text`). Hvis det skjer en redigering, erstatter det modifiserte svaret originalen.

Autovernet blokkerer aldri; den merker bare (`meta.detections`, `meta.redacted`) eller omskriver.

**Vendbart hvelv (`PII_REVERSIBLE_VAULT_ENABLED`, standard `false`).** Når både `PII_REDACTION_ENABLED` og `PII_REVERSIBLE_VAULT_ENABLED` er på (DB overstyrer > env > standard, les én gang per forespørsel), åpner `handleChat` ett hvelv per klientforespørsel (`src/lib/pii/requestTokenVaultScope.ts`) og sender det til pre-call pass som `GuardrailContext.tokenVault`. Maskeren skriver deretter surrogat-tokens som `<<PII_EMAIL_QWERTYUI_1>>` i stedet for `[EMAIL_REDACTED]`, for både innebygde, validerte (GDPR/POPIA) og tilpassede regler. Nonce er 8 tilfeldige store bokstaver per forespørsel, og samme verdi får samme token i forespørselen. Bare maskeringen fungerer: prompt-injeksjonsvakten og `/api/guardrails/test` kjører uten hvelv og holder plassholderne.

- Leverandøren, hvert kombinasjonsben, gjenforsøk, medlem av fusjonspanelet og fusjonsdommeren ser kun tokens. Tokenene gjenopprettes én gang, på 2xx-svaret som etterlater `handleChat`: per felt på den analyserte SSE (et token delt på tvers av hendelser løses fortsatt; tool-call-argumenter er JSON-escaped) eller per felt på en JSON kropp, med en omberegnet `Content-Length`. Innhold og resonnementtekst og verktøykall-argumenter gjenopprettes. Feillegemer (4xx/5xx) beholder tokens.
- Feil forblir private: hvis preging mislykkes eller hvelvet nekter en verdi (1000 oppføringer, 256 tegn per verdi, 64 KB totalt), skrives plassholderen i stedet; et symbol som hvelvet ikke kan løse, eller en gjenoppretting som mislykkes, forblir bokstavelig og bare en telling logges. Hvelvet har ingen tidtakere og ingen global tilstand; den slettes når svarstrømmen avsluttes, avbrytes eller feil.
- Når en forespørsel preget tokens, blir minneutvinning, idempotenslagringen og både semantisk cache-skriving hoppet over, fordi ingen senere forespørsel kunne løse disse tokenene. I anropslogger bærer leverandørens forespørsel og svar tokens; den loggede klientforespørselskroppen er fortsatt den rå klientinndata, som med vanlig redaksjon.
- Tokens bruker en tilfeldig nonce per forespørsel, så ledetekstprefikset endres ved hver tur: leverandørside-promptbufring treffer ikke for maskerte svinger, og et token som kommer tilbake i en senere sving (for eksempel via `previous_response_id`) tilhører en gammel forespørsel og forblir bokstavelig.

#### Valg per type, tilpassede mønstre og deteksjonstellere

**Dashboard → Innstillinger → Sikkerhet → PII maskering** velger _hva_ som er maskert. Den slår ikke på maskering: det er fortsatt `PII_REDACTION_ENABLED` (forespørsel) og `PII_RESPONSE_SANITIZATION` (respons + SSE), begge av som standard.

- **Valg per type** — de innebygde IDene er oppført i `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Unset betyr hver type (atferden før denne innstillingen eksisterte). Forespørselsmotorens `ssn_us` mønster tilordnes `ssn`. Maler (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) fyller bare ut avmerkingsboksene i UI.
- **GDPR og POPIA identifikatorer** — tolv innebygde IDer som dekker EU og sørafrikanske personlige identifikatorer (tabell nedenfor). Deres regexes, validatorer og jurisdiksjonstagger ligger i én tabell, `src/shared/utils/piiPatterns.ts`, som både respons-desinizeren (`src/lib/piiSanitizer.ts`) og request-maskeren (`src/shared/utils/inputSanitizer.ts`) bruker. Et samsvar redigeres bare når validatoren godtar det; bare siffer er aldri nok. En operatør som lagret et begrenset utvalg før disse IDene eksisterte, beholder atferden den hadde til de nye IDene er krysset av.
- **Egendefinerte mønstre** — opptil 20 regex- eller jokertegnmønstre (`*` = opptil 64 tegn uten mellomrom, `?` = ett). Kamper blir `[CUSTOM_REDACTED]`. Hvert mønster går gjennom `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): maksimalt 500 tegn, flagg begrenset til `g i m s u`, må kompilere, må passere `safe-regex` (katastrofisk tilbakesporing), og må ikke samsvare med en tom streng eller en redaksjonsplassholder. Et mønster som mislykkes blir avvist når det lagres og når det testes, og en lagret rad som mislykkes hoppes over under kjøring i stedet for å bli kompilert. Egendefinerte mønstre kjøres bare mens maskering er på.
- **Deteksjonstellere** — per type teller (aldri samsvarende verdier), holdt i minnet og tilbakestilt ved omstart (`src/lib/pii/piiDetectionStats.ts`). De øker bare mens maskering er på.

Innstillingene ligger i `key_value` tabellen (navneområde `pii_settings`, `src/lib/db/piiSettings.ts`) og leses gjennom en 1 s cache. API:

| Metode | Sti                      | Hensikt                                                                  |
| ------ | ------------------------ | ------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Flaggtilstand, `enabledTypes`, `customPatterns`, deteksjonstellere       |
| `PUT`  | `/api/settings/pii`      | Erstatt `enabledTypes` (`null` = all) and/or `customPatterns`            |
| `POST` | `/api/settings/pii/test` | Tørrkjør ett mønster mot en prøve på maksimalt 8 KB; ingenting er lagret |

Alle tre krever administrasjonsgodkjenning og validerer kroppen med Zod (`src/shared/validation/schemas/piiSettings.ts`). Med pålogging deaktivert (`requireLogin=false`) er `GET` og testendepunktet åpne, men `PUT` trenger fortsatt en dashbordøkt, en `manage` -scope API nøkkel, et `oma_` -tilgangstoken med skriveomfang eller høyere, eller CLI tokenet eller interntjenestetokenet sendt fra loopback.

#### GDPR (EU) og POPIA (Sør-Afrika) identifikatorer

| ID                  | Identifikator            | Validering                                                                                       |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------ |
| `iban`              | IBAN                     | Kjent land, nøyaktig lengde for det landet, ISO 13616 MOD-97-10                                  |
| `eu_vat`            | EU VAT nummer            | Kjent medlemslandsprefiks og den statens tallformat (ingen VIES oppslag)                         |
| `es_dni_nie`        | Spansk DNI / NIE         | Kontrollbokstav (verdi mod 23); NIE er `X/Y/Z` + 7 sifre                                         |
| `it_codice_fiscale` | Italiensk Codice Fiscale | Kontrollbokstav fra odd/even -posisjonstabellene                                                 |
| `pl_pesel`          | polsk PESEL              | Vektet sjekksum og en kodet fødselsdato som eksisterer                                           |
| `nl_bsn`            | nederlandsk BSN          | 11-proof (vekter 9..2, -1)                                                                       |
| `de_steuer_id`      | Tysk Steuer-ID           | ISO 7064 Mod 11,10 pluss sifferstrukturreglene (ingen innledende 0)                              |
| `se_personnummer`   | Svensk personnummer      | Luhn over de ti siste sifrene og en plausibel fødselsdato (10 eller 12 sifre)                    |
| `za_id`             | Sørafrikansk ID nummer   | Luhn over alle 13 sifre, gyldig fødsel month/day, statsborgerskapssiffer 0 eller 1               |
| `za_phone`          | Sørafrikansk telefon     | `+27` / `27` prefiks, eller den nasjonale `0..` formen skrevet med et mellomrom eller bindestrek |
| `za_vat`            | Sørafrikansk VAT nummer  | 10 sifre som begynner med `4`** og** "VAT" / "BTW" i de 48 tegnene før                           |
| `za_tax_ref`        | Sørafrikansk skatteref.  | 10 sifre starter `0`-`3`, Luhn,** og** "skatt" / "SARS" i de 48 tegnene før                      |

Fordi formatene med kun siffer kolliderer med ordrenummer, byggenummer og tidsstempler, trenger de svakeste (`za_vat`, `za_tax_ref`) nøkkelordet, og et bare tisifret `0..` -nummer behandles ikke som et sørafrikansk telefonnummer. Mellomrom IBANs (`GB29 NWBK ...`) samsvarer ikke. På streamingbanen blir køen bare sett opp inne i den gjeldende delen. ID-ene ligger foran de generiske telefonmønstrene, så en validert identifikator beholder sin egen plassholder (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` og `popia` malene velger henholdsvis EU og sørafrikanske IDer. Maskering i seg selv forblir opt-in (Hard Rule #20): ingenting her endrer standarden for funksjonsflagg.

### Rask injeksjon (`promptInjection.ts`)

Oppdager kontradiktoriske strukturer i brukerlevert innhold og håndhever den konfigurerte policyen. Atferd er drevet av miljøvariabler og konstruktøralternativer:

| Innstilling    | Env var                                                                                               | Misligholde | Effekt                                                                                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivert       | `INPUT_SANITIZER_ENABLED`                                                                             | `true`      | Når `false`, rekkverk kortslutter.                                                                                                                                                                    |
| Modus          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`      | Injeksjonspolicy: `block`, `warn` eller `log`. (`redact` er akseptert for back-compat, men gjør det** ikke** stripe injeksjon tekst; request PII omskriving kontrolleres av `PII_REDACTION_ENABLED`.) |
| Blokkerterskel | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Minimum alvorlighetsgrad kreves for å blokkere. Medium er kun observert som standard.                                                                                                                 |

**Modus forrang** (`getMode`): ringer `options.mode` → `INJECTION_GUARD_MODE`**DB funksjon-flagg overstyring** (Dashboard → Innstillinger → Funksjonsflagg) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. En dashbordoverstyring vinner derfor over env vars, så Feature Flags UI kontrollerer running guard live (ingen omstart). DB -lesingen er feilsikker: hvis den feiler, faller guarden tilbake til den env-baserte oppførselen, og når ingen overstyring er angitt, er oppførselen identisk med env-only-oppløsningen.

Deteksjonskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (delt detektorsett brukt andre steder i rørledningen).
2. Innebygd `DEFAULT_GUARD_PATTERNS` (for øyeblikket `system_override_inline` og `markdown_system_block`, begge alvorlighetsgraden `high` ).
3. Valgfri `customPatterns` sendt via konstruktøralternativer (strenger, regulære uttrykk eller `{ name, pattern, severity }` poster).

Når `mode === "block"`** og** minst én deteksjon oppfyller alvorlighetsgrensen, `preCall` returnerer `{ block: true, message: "Request rejected: suspicious content detected" }`. I `warn`/`log` -modus logger autovernet, men tillater anropet. Den delte hjelperen `evaluatePromptInjection()` eksporteres også for innringere som trenger å evaluere forespørsler uten å gå gjennom registeret.

**Skannebundet (v3.8.20):** detektoren inspiserer kun** første 16 KB** av sammenføyd ledetekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i `src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` før du kjører mønsterløkken. Injeksjonsdirektiver sitter nær toppen av en inngang, så dette begrenser regex CPU/GC på multi-hundre KB nyttelast uten å svekke deteksjon (jf. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Kjører på** både** trinn, sist i standardkjeden (prioritet `95`). Redakterer velkjente API-nøkkel-/hemmelige-token-mønstre fra den utgående nyttelasten (meldingsinnhold, verktøykall-argumenter, verktøyresultater)** og** leverandørens svar, slik at en legitimasjon limt inn i en ledetekst (eller gjentatt av et verktøyresultat) ikke lekkes til oppstrømsleverandøren eller tilbake til klienten.

- **Kun påmelding** , samme konvensjon som PII -redaksjon (hard regel #20-adjacent): deaktivert med mindre `settings.credentialRedactionEnabled === true`** eller** `CREDENTIAL_REDACTION_ENABLED=true`. Med det av er rekkverket en no-op — det aldri blokkerer og aldri omskrives.
- `redactCredentials()` går gjennom hele payload/response treet (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) og erstatter treff med en `[REDACTED:<type>]` plassholder, og kloner bare grenene som faktisk endret seg.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- En verdi bak en etikett er maskert selv når den ikke har noe leverandørprefiks: `DB_PASSWORD=…`, `AWS_SECRET_ACCESS_KEY=…`, `client_secret: …`, `?api_key=…` (etiketter: `password`, `passwd`, `secret`, `secret_key`, `secret_access_key`, `api_key`, `access_token`, `refresh_token`, `auth_token`, med et hvilket som helst prefiks som `DB_`). Etiketten og skilletegn forblir og verdien blir `[REDACTED:secret]`. Verdien trenger 12 eller flere tegn, så prosa som `password: required` forblir lesbar; en verdi som starter med `$` eller `%` (en variabelreferanse) blir stående alene.
- Autovernet blokkerer aldri; den skriver bare om (`modifiedPayload` / `modifiedResponse`) og merker (`meta.credentialsRedacted`, `meta.count`).

Regresjonsvakt: `tests/unit/credential-masker-guardrail.test.ts`.

### Agent Guard (`agentGuard/`)

Agentvakten klassifiserer klienten bak en forespørsel til `claude` eller `anthropic` -leverandøren fra overskriftene. `AGENT_GUARD_MODE` tar tre verdier: `off` (standard), `monitor` og `block`. Med `off` leses ingen overskrift og ingenting logges.

Offisielle agenter gjenkjennes av disse overskriftene (sammenlignet uten store og små bokstaver):

- Claude kode: en `User-Agent` som begynner med `claude-cli/` eller `claude-code/`, eller `x-app: cli` sammen med en `anthropic-beta` header eller en `User-Agent` som inneholder `claude`.
- Anthropic SDKs: en `User-Agent` som begynner med `Anthropic/`, `AsyncAnthropic/`, `anthropic-typescript/` eller `anthropic-python/`.

Loggerens standardnivå i produksjon (`info`) viser begge typer linjer. Med `APP_LOG_LEVEL=warn` gjenstår bare de kjente tredjepartslinjene.

Loggfelt: `agent`, `thirdParty`, `provider`, `model`, `apiKeyId`, `userAgent`, `xApp`, `anthropicBeta`, `xTitle`, `referer`, `stainless`. Overskriftsverdier og modellstrengen er begrenset til 200 tegn. Henviseren logges uten sin søkestreng, fragment og brukerinfo. API -tasten, `Authorization`, `x-api-key` og informasjonskapsler blir aldri lest.

Filer: `src/lib/guardrails/agentGuard/classifier.ts`, `src/lib/guardrails/agentGuard/policy.ts`, `src/lib/guardrails/agentGuard/guardrail.ts`, `src/lib/guardrails/agentGuard/settings.ts`, `src/lib/guardrails/agentGuard/logLine.ts`, `src/lib/guardrails/agentGuard/enforcement.ts`, `src/sse/handlers/chat/agentGuardGate.ts`.

**Klassifiseringsgrenser (begge moduser):**

- En agent bygget på en offisiell SDK som ikke sender `X-Title`, `HTTP-Referer` eller egen `User-Agent` ser ut som SDK. `x-stainless-*` overskrifter alene gjør ikke en klient offisiell.
- Tredjepartsagenter matches av helordssymboler i `User-Agent`, `X-Title` og `HTTP-Referer` (eller `Referer`). Unoterte klienter vises som `unknown`.
- Forespørsler fra nettleserbaserte klienter har nettleserens egen `User-Agent` og vises som uidentifisert, med mindre `X-Title` eller referenten har en kjent tredjeparts token.
- Én logglinje per observert forespørsel: forvent volum på travle forekomster.

#### Følge

Med `AGENT_GUARD_MODE=monitor` klassifiseres forespørsler hvis modellstrengnavn `claude` eller `anthropic` leverandøren har, etter klientoverskriftene. Når klienten ikke er en offisiell agent, skrives én logglinje med `tag: "AGENT_GUARD"`. Det er `warn` for en kjent tredjepartsagent og `info` for en uidentifisert klient. Prioritet `1`: rekkverket leser kun overskrifter og endrer aldri nyttelasten, så det går før mediebroene. `monitor` blokkerer aldri.

**Grenser for `monitor`:**

- Hvert signal er en klientstyrt header. Dette er observasjon, ikke tilgangskontroll.
- Leverandøren leses fra modellstrengen før modellen løses: `provider/model`, et leverandøralias som `cc/…`, og kvotedelings-IDer (`qtSd/<group>/<provider>/<model>`). Bare modell-ID-er, modellaliaser, kombinasjoner og senere rutenormalisering følges ikke. Disse forespørslene blir ikke fulgt.
- En innringer kan hoppe over det per forespørsel gjennom registerdeaktiveringskanalene (se [Deaktivere rekkverk per forespørsel](#disabling-guardrails-per-request) ). Hoppet over forespørsler blir ikke observert.
- Den kjører bare der `runPreCallHooks` kjører (se [Dekning og grenser](#coverage-and-limits) ).

#### Blokkere

Med `AGENT_GUARD_MODE=block`, gjør pre-call autovernet ingenting. Chatbehandleren tar avgjørelsen i stedet:

1. Avgjørelsen tas når et mål er i ferd med å bli sendt, på leverandøren forespørselen ble løst til. Leverandøraliaser, bare modell-ID-er, ID-er for kvotedeling og alle kombinasjonsmål er dekket.
2. Det kjører ikke i rekkverksregisteret, så deaktiveringskanalene per forespørsel gjelder ikke for det.
3. En kjent tredjepartsagent blir nektet. En uidentifisert klient logges som i `monitor`, og nektes kun med `AGENT_GUARD_STRICT=true`. Claude koden og den offisielle Anthropic SDKs blir aldri avvist.
4. Avslaget er HTTP 403 med `error.type` `permission_error` og `error.code` `client_agent_not_allowed`. Kroppen er en feil i OpenAI-stil. På forespørsler i antropisk format har den også `type: "error"` på toppnivå. Det er ingen `Retry-After` header, og avslaget returneres før en strøm starter.
5. Et avslag er ikke en leverandørsvikt. Den berører ikke leverandørens strømbryter, tilkoblingsavkjøling eller modellsperringer.
6. I en kombinasjon hoppes et avvist mål over og de resterende målene kjøres. Forespørselen mislykkes med policyfeilen når minst ett mål ble avvist og ingen mål kom forbi vakten. Kombinasjonen beholder sin egen feil når en oppføring på toppnivå gir navn til en annen kjent leverandør, med et prefiks eller trinnets leverandør-ID. Et avvist prioritert mål med `fallbackOnlyOnQuotaExhaustion` hoppes over på samme måte og stopper ikke kombinasjonen. Et skyggemål blir sjekket og logget, men det teller aldri som et mål som kom forbi vakten.
7. En `fusion` kombinasjon mislykkes før panelet kjører når dommeren fusjonstjenesten vil bruke, blir nektet. Den dommeren kommer fra kombinasjonens konfigurasjon eller fra de globale kombinasjonsstandardene. Den samme kontrollen kjøres når en fusjonskombinasjon nås gjennom sikkerhetsnett-omdirigeringen.
8. Én logglinje per forespørsel og leverandør, med `tag: "AGENT_GUARD"`, `warn` for et avslag, og de samme feltene som `monitor`.
9. Ved en intern feil svikter vakten åpen. Forespørselen fortsetter og en `warn` linje `agent guard failed open` logges.

**Grenser for `block`:**

- Hvert signal er en klientstyrt header. En klient som sender `User-Agent: claude-cli/…` behandles som Claude -kode. `block` avskrekker umodifiserte tredjepartsagenter. Det er ikke tilgangskontroll.
- En proxy som fjerner de identifiserende overskriftene gjør enhver klient til en uidentifisert. En slik klient blir servert uten `AGENT_GUARD_STRICT` og nektet med den. Kjør vakten på instansen som står overfor klientene. En andre OmniRoute instans bak den første ser den førstes overskrifter.
- `AGENT_GUARD_STRICT` nekter hver klient hos de leverandørene som ikke er Claude kode eller en offisiell SDK. Det inkluderer nettleserbaserte klienter og dashbordlekeplassen. Dashboard combo live-testen er unntatt, også gjennom sikkerhetsnett-omdirigeringen.
- Noen funksjoner bygger sin egen chat-forespørsel i stedet for å sende kundens forespørsel videre. Fire av dem sender den tilbake gjennom OmniRoute `/v1/...` -ruter:
  - batchjobber (`src/lib/batches/dispatch.ts`)
  - MCP -inferensverktøyene (`open-sse/mcp-server/tools/inferenceTools.ts`)
  - A2A smart ruting (`src/lib/a2a/skills/smartRouting.ts`)
  - synsbroen når den beskriver et bilde gjennom OmniRoute (`src/lib/guardrails/visionBridgeHelpers.ts`)
- Telegram chat-proxyen (`src/lib/telegram/chatProxy.ts`) bygger sin forespørsel under prosess og ringer chatbehandleren direkte.
- Disse indre forespørslene har OmniRoute egne overskrifter, ikke overskriftene til klienten som startet dem. Vakten klassifiserer dem som uidentifiserte klienter.
- Uten `AGENT_GUARD_STRICT` blir disse indre forespørslene servert til de bevoktede leverandørene uansett hvem den opprinnelige klienten var. En tredjepartsagent som når Claude gjennom dem, blir ikke nektet.
- Med `AGENT_GUARD_STRICT` blir disse indre forespørslene avvist på de bevoktede leverandørene som startet dem, inkludert Claude -koden.
- Bare forespørsler som går gjennom chat-behandleren er gated. Modellvalidering (`src/lib/modelValidation/runner.ts`) kaller forespørselskjernen direkte og er ikke gated.
- Bare `claude` og `anthropic` leverandørene dekkes. Claude modeller som betjenes av en annen leverandør dekkes ikke, og det er heller ikke `claude-web` leverandøren.
- Noen kombinasjoner navngir de gjenværende målene uten et leverandørprefiks, som bare modell-ID-er eller nestede kombinasjoner. Når disse målene er utilgjengelige av en ikke-relatert årsak (åpen bryter, nedkjøling, lockout), mislykkes forespørselen med policyfeilen.
- Et hoppet kombinasjonsmål fjerner målets siste kjente gode pinne, slik ethvert hoppet mål gjør.
- En fusjonsdommer navngitt med et bevoktet leverandørprefiks blir nektet før panelet kjører. Det dekker `anthropic/…`, `claude/…`, et alias som `cc/…`, et kontekstsuffiks som `[1m]`, og kvoteandelsnavn på disse leverandørene.
- En fusjonsdommer skrevet som en ren modell-id, eller som et modellalias som løses til en bevoktet leverandør, blir avvist bare når den sendes. Panelet har allerede kjørt da. Å navngi dommeren med leverandørprefikset unngår det. Ingen dommerstaving når en bevoktet leverandør uten avslag.
- Forhåndssjekken nekter en konfigurert Claude dommer selv når fusjonstjenesten ville droppe den dommeren under kjøring. Tjenesten dropper en dommer operatøren gjemte, og en dommer som ikke kan ta forespørselens media. Den andre saken dekker ubekreftet synsstøtte og andre medier dommeren ikke godtar. Begge kombinasjonsbanene oppfører seg på denne måten.
- På sikkerhetsnett-omdirigeringen mottar kombinasjonstjenesten tomme innstillinger. En dommer satt kun i de globale kombinasjonsstandardene brukes aldri der.
- Mens `block` er på, bruker ikke en klient vakten ville nekte hos en bevoktet leverandør, for noen modell. Under `AGENT_GUARD_STRICT` er det hver uidentifisert klient. Etter sin relétoken-sjekk svarer `POST /v1/relay/chat/completions/bifrost` på disse forespørslene med en 503 og `X-Bifrost-Fallback` overskriften.
- `POST /v1/messages/count_tokens` gir det lokale estimatet til en klient vakten ville nekte for leverandøren modellen retter seg mot.
- Det er ingen unntak per nøkkel.

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

Singleton `guardrailRegistry` avslører:

- `register(guardrail)` — legger til (eller erstatter med normalisert navn) et rekkverk og sorterer på nytt ved å øke `priority`.
- `clear()` / `list()` — administrative hjelpere.
- `runPreCallHooks(payload, context)` — itererer aktive rekkverk, trer nyttelasten gjennom `modifiedPayload`, og stopper på den første `block: true`.
- `runPostCallHooks(response, context)` — samme flyt på responssiden.
- `resetGuardrailsForTests({ registerDefaults })` — sletter tilstanden og omregistrerer eventuelt standardinnstillingene for ren testisolasjon.

Begge løperne returnerer `{ blocked, payload|response, results, guardrail?, message? }` der `results` er en rekke `GuardrailExecutionResult` poster som inkluderer feltene `blocked`, `skipped`, `modified`, `error` og `meta` per rekkverk, nyttige for sporing.

### Deaktivering av rekkverk per forespørsel

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` samler en deduplisert liste over rekkverksnavn som bør hoppes over for gjeldende forespørsel. Det er fem kanaler, lest i denne rekkefølgen og slått sammen til én liste (første forekomst vinner ved de-duplikering):

1. `apiKeyInfo.disabledGuardrails`
2. Be om body `disabledGuardrails` (toppnivå)
3. Be om body `metadata.disabledGuardrails` (bare når `metadata` er et objekt)
4. Header `x-omniroute-disabled-guardrails`
5. Eldre header `x-disabled-guardrails`

Alle de fem kanalene er slått sammen, de to overskriftene inkludert: å sende både `x-omniroute-disabled-guardrails` og `x-disabled-guardrails` hopper over foreningen av listene deres, og en tom moderne overskrift skjuler ikke lenger den eldre ( [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412), fikset i [#16805](https://github.com/cheaper-inference/OmniRoute/pull/16805) ).

Verdier kan være arrays av strenger eller en kommaseparert streng; navn trimmes og normaliseres til små kebab-bokstaver (`pii_masker` → `pii-masker`), og tomme oppføringer slettes. Resultatet sendes gjennom `context.disabledGuardrails` til registeret, som hopper over samsvarende rekkverk (`skipped: true` in `results`).

Deaktiveringslisten påvirker bare** register** . Prompt-injeksjon `block` modus er en obligatorisk grense: injection-guard-mellomvaren (`src/middleware/promptInjectionGuard.ts`) kaller `evaluatePromptInjection()` uten noen anropskontrollert deaktiveringsliste (det døde `resolveDisabledGuardrails({ body })` -anropet det pleide å gjøre ble fjernet i [#16934](https://github.com/cheaper-inference/OmniRoute/pull/16934) ), så en forespørsel som deaktiverer `prompt-injection` blir fortsatt avvist i `block` modus. Dette er etter design. Deaktiveringskanalene er innringerkontrollerte (forespørselstekst, metadata, overskrifter), og en innringer må ikke kunne slå av en sikkerhetskontroll operatøren har satt ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). Headerunionen fra [#16412](https://github.com/cheaper-inference/OmniRoute/issues/16412) endrer kun hvilke registerrekkverk som hoppes over; den lar ikke en klient omgå mellomvaren. Obligatoriske retningslinjer for rekkverk per nøkkel og per gruppe spores i v4 RFC [#16417](https://github.com/cheaper-inference/OmniRoute/issues/16417). Se [Dekning og grenser](#coverage-and-limits).

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

## Dekning og grenser

Rekkverksregisteret er kun koblet til chat-pipeline. Disse grensene er festet av `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` og `tests/unit/guardrail-pipeline-characterization.test.ts`; oppdater disse testene bevisst når atferden endres.

### Hvor krokene går

| Krok / kontroll                           | Kjører på                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                         | Forespørsler behandlet av `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (og `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` og Telegram chat proxy. Også dashbordtestendepunktet `/api/guardrails/test`. En pre-call-blokk returnerer HTTP 400. |
| `runPostCallHooks`                        | **Ikke-streaming** bare chat-svar (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Strømmede svar når det aldri.                                                                                                                                                                                                                                                                                                      |
| Streamer PII                              | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), ført i `streamingPipeline.ts` når `PII_RESPONSE_SANITIZATION` er på. Det er ikke et rekkverk, så deaktiveringskanalene påvirker det ikke.                                                                                                                                                                                                                      |
| Vendbart PII hvelv                        | Forespørsler håndteres kun av `handleChat` når `PII_REDACTION_ENABLED` og `PII_REVERSIBLE_VAULT_ENABLED` er på. Tokens preges av `pii-masker` pre-call og gjenopprettes ved `handleChat` -utgangen (`src/lib/pii/requestTokenVaultScope.ts`). Deaktivering av `pii-masker` for en forespørsel betyr at ingenting er preget.                                                                                                  |
| Injeksjonsbeskyttende mellomvare (legacy) | Hver `/v1` -rute som gir beskjed, inkludert chat-familien (se [rutedekning](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Kun rask injeksjon.                                                                                                                                                                                                                                                               |

### Hva dekkes ikke

- **Media, innbygginger og dataruter** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) når aldri registeret. Ingen PII maskering, legitimasjonsmaskering eller modalitetsbro kjører der. Deres eneste sjekk er den eldre mellomvaren for injeksjonsbeskyttelse.
- **Strømmede svar** få ingen post-anropsrekkverk: ingen `pii-masker` eller `credential-masker` post-call, og ingen post-call blokk. Bare streaming PII transformasjonen gjelder (når `PII_RESPONSE_SANITIZATION` er på). En legitimasjon som går tilbake i et strømmet svar, blir ikke redigert.
- **Deaktiver kanaler kontra mellomvaren (etter design):** mellomvaren evaluerer umiddelbar injeksjon med sitt eget kall til `evaluatePromptInjection()`, uten å sende noen anropskontrollert deaktiveringsliste. `block` modus er en obligatorisk grense som anropskontrollert deaktivering ikke kan omgås, inkludert på chat-familieruter ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ). Deaktivering av `prompt-injection` bare over registerrekkverket.

### Hva ser et svar før etteranrop

På den ikke-streaming banen er rekkefølgen: minneutvinning → innebygd verktøy utførelse → post-call guardrails → post-call block exit → semantisk-cache-lager.

- **Minneutvinning** og** verktøyutførelse** se svaret før autovern etter anrop kan omskrive eller blokkere det. Siden [#16401](https://github.com/cheaper-inference/OmniRoute/pull/16401) kjører minneutvinning den utpakkede teksten gjennom `sanitizePII` når `PII_RESPONSE_SANITIZATION` er på (både streaming og ikke-streaming), men et svar som blokkerer senere etter anrop har fortsatt blitt tilbudt minne og verktøy.
- **Den semantiske cachen** lagrer svaret etter post-anrop, så det lagrer det omskrevne svaret, og et blokkert svar blir aldri bufret. Cache-oppføringer tastes per API nøkkel.

## Konfigurasjon

Miljøvariabler lest av de innebygde rekkverkene:

| Variabel                              | Brukt av                   | Effekt                                                                                                                    |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Sett `false` til å deaktivere deteksjon helt.                                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injeksjonspolicy: `warn`, `block` eller `log`. Eldre verdi `redact` omskriver ikke injeksjonstekst.                       |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modus for injeksjonsbeskyttelsen; også en DB funksjon flagg som** overstyrer** env vars (DB > ENV).                       |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minimum alvorlighetsgrad som `MODE=block` avviser: `high` (standard), `medium` eller `low`.                               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Legacy alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                       |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Når `true`, blir forespørselen PII redigert (uavhengig av injeksjonsmodus).                                               |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Med `PII_REDACTION_ENABLED`, mynt reversible tokens og gjenopprett dem i 2xx-svar.                                        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedstrøms)   | Kontrollerer maskeringsadferd på responssiden.                                                                            |
| `AGENT_GUARD_MODE`                    | `agent-guard`              | `off` (standard), `monitor` eller `block`. Også et DB -funksjonsflagg (DB > ENV).                                         |
| `AGENT_GUARD_STRICT`                  | `agent-guard`              | `false` (standard) eller `true`. Med `block`, nekter også uidentifiserte klienter. Også et DB -funksjonsflagg (DB > ENV). |

Modality Bridge-rekkverkene leser kjøretidskonfigurasjon fra det DB-støttede innstillingslageret (`getSettings()`), ikke env vars. Visions primærnøkler er `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`. De eldre `visionBridge*` nøklene aksepteres bare som den dokumenterte en-syklus lese reserve; dashbordskriver bruker primærnøklene. Standarder og reserveløseren lever i `src/shared/constants/modalityBridgeDefaults.ts`, med eldre konstanter beholdt i `src/shared/constants/visionBridgeDefaults.ts`.

Audio bruker `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips`, pluss de delte `modalityBridgeCache*` -innstillingene. Lyd har ingen reservenøkler fordi disse nøklene ble introdusert med Modality Bridge-skjemaet.

Video bruker `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` og `modalityBridgeVideoTimeout`, pluss de delte `modalityBridgeCache*` innstillingene. Den er deaktivert som standard fordi FFmpeg/ffprobe er valgfrie operasjonelle avhengigheter og rammeteksting legger til ventetid og modellkostnad.

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

## Injeksjonsvakt rutedekning og rødt team (Fase 8 · Blokk D)

Injeksjonsbeskyttelsen (`createInjectionGuard` / `withInjectionGuard`) dekker alle ruter som aksepterer brukeroppfordringer. Den respekterer `INJECTION_GUARD_MODE` (standard `warn` = log bare; `block` = returnerer HTTP 400 `SECURITY_001`).

| Type                 | Ruter                                                                                                                                                | Standardmodus |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Tekst (eksisterende) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | varsle        |
| Generativ            | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | varsle        |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | varsle        |

Tekstutvinning (`extractMessageContents`) dekker `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system`.

**Rødt lag (natt, `nightly-llm-security.yml`):** promptfoo validerer at hver rute blokkerer OWASP-LLM-korpuset i `INJECTION_GUARD_MODE=block`; garak kjører sonder (hopper over uten hemmelighet). `moderations` er inkludert for konsistens. Blokkeringsmodus er en obligatorisk grense: `evaluatePromptInjection()` ignorerer deaktiveringslisten per forespørsel, mellomvaren passerer den, så `disabledGuardrails` gjør det** ikke** unnta en rute fra det ( [#16413](https://github.com/cheaper-inference/OmniRoute/issues/16413) ).

Den nattlige arbeidsflyten (`.github/workflows/nightly-llm-security.yml`, cron + manuell utsendelse) har to jobber:

- **`promptfoo-guard` (blokkerer)** — kjører `promptfoo eval -c promptfooconfig.yaml` med `INJECTION_GUARD_MODE=block`. Hver motstridende sak (f.eks. "ignorer alle tidligere instruksjoner ...", DAN-stil jailbreaks) hevder at svaret bærer `error.code === "SECURITY_001"`, dvs. at vakten faktisk avviste forespørselen.
- **`garak` (rådgivende)** — kjører garak `--probes promptinject,dan,leakreplay` mot en lokal OmniRoute forekomst (`http://localhost:20128/v1`). Gated på en leverandørhemmelighet (`PROMPTFOO_PROVIDER_KEY`); hopper elegant og får suffikset `|| true`, så den rapporterer uten å svikte CI.

Dekning av vakthjelperen (`createInjectionGuard` / `withInjectionGuard`) spenner over hver prompt-bærende `/v1` rute; ledeteksten hentes fra `messages`/`input`/`prompt`/`query` + `documents`/`instructions`/`system` av `extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
