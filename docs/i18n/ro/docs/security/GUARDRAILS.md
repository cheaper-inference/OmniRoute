# Guardrails (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sursa de adevăr:** `src/lib/guardrails/`
> **Ultima actualizare:** 2026-10-17 — v3.8.52 (adăugat [Acoperire și limite](#coverage-and-limits):
> ce rute și căi de răspuns ating hook-urile, headerele de dezactivare unificate (#16412), modul de
> blocare a injecției ca limită obligatorie (#16413) și ce vede un răspuns înainte de post-apel)

Guardrail-urile aplică transformări de siguranță, politici și conținut la granița
dintre OmniRoute și furnizorii upstream. Fiecare guardrail poate inspecta (și,
opțional, respinge, transforma sau adnota) payload-urile cererilor (`preCall`) și
răspunsurile upstream (`postCall`).

Sistemul este **fail-open**: dacă un guardrail aruncă o excepție în timpul execuției,
registrul înregistrează eroarea și continuă cu următorul guardrail în loc să eșueze
cererea. Blocarea este o decizie explicită (`block: true`), niciodată un accident.
Singura excepție este o cerere anulată: când `signal`-ul apelantului este anulat,
un guardrail care aruncă respinge rularea hook-ului în loc să fie omis.

Hook-urile **nu** rulează pe fiecare rută sau pe fiecare răspuns. Citiți
[Acoperire și limite](#coverage-and-limits) înainte de a vă baza pe un guardrail
ca mecanism de securitate.

## Balustrade încorporate

Registrul încarcă automat șase balustrade în ordinea priorității la import (vezi `registry.ts` → `registerDefaultGuardrails()`):

| Prioritate | Nume                | Etape          | Fişier                |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numerele cu prioritate inferioară rulează** primul** .

### Vision Bridge (`visionBridge.ts`) — Modalitate Bridge PR-1

Modelul de bază GLM 5.3 și `glm-5.3-{low,high,max}` au metadate explicite `supportsVision:false` registry/spec. Variantele GLM 5.3 Flash rămân modele native-vision. Traseul `/v1/messages` al codului Claude intră în lanțul de balustradă `handleChat` pre-apel comun** înainte** Traducere Claude-to-OpenAI; imaginile cu rezultatul instrumentului `Read` imbricate trebuie descrise sau tratate înainte ca traducerea să le transforme în conținut OpenAI `image_url` (#17069).

Interceptează cererile purtătoare de imagini vizate** modele fără vedere** și fie redirecționează întreaga solicitare către un model capabil de viziune, fie înlocuiește părțile imaginii cu descrieri text produse de un model de viziune configurabil înainte de apelul din amonte. Acest lucru permite furnizorilor doar text să gestioneze în mod transparent sarcinile utile multimodale.

Flux:

1. Omiteți dacă modelul țintă acceptă deja viziunea (cu excepția cazului în care apare în lista de punte forțată `isVisionBridgeForcedModel`).
2. Extrageți părți de imagine prin `extractImageParts(messages)` (`visionBridgeHelpers.ts`), care deleagă la** detector media unificat** `detectMediaParts()` în `open-sse/utils/mediaParts.ts` — sursa unică de adevăr partajată cu filtrul de compatibilitate combinat. Extragerea este permisă în formele pe care `replaceImageParts` le poate îmbina înapoi (extractul ↔ înlocuiește contractul): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` și Responses API `input_image`. Imaginile care se potrivesc imbricate în interiorul Claude Code `tool_result.content` și ieșirile instrumentului Responses sunt, de asemenea, extrase și înlocuite la căile lor originale; formele numai cu indicator sunt materiale combo-filtru și nu sunt extrase. Omite dacă nu s-a găsit niciunul.
3. Rezolvați configurația runtime prin `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): noi chei de setări `modalityBridge*` câștigă; cheile `visionBridge*` moștenite rămân a** de rezervă cu un singur ciclu** (fereastră de derulare înapoi). Omiteți înainte de orice traversare media când puntea este dezactivată.
4. Selectorul de mod (`modalityBridgeVisionMode`, vezi tabelul de mai jos) decide redirecționarea versus descrie. Reroute returnează `modifiedPayload` cu doar `model` schimbat, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Descrieți calea: limitați imaginile la `maxImages`, compuneți promptul care ține seama de sarcini, consultați memoria cache a descrierii, apelați modelul de viziune** în paralel** (`Promise.allSettled`) și injectați părți de text `[Image N]: <description>` în locul lor. O descriere nereușită produce `null`: imaginea brută este păstrată pentru ținte unknown/vision-capable (#4012), dar un** țintă directă confirmată numai pentru text** sau zero-vision combo primește un stub de text `(unavailable — no vision-capable provider connected)` explicit pentru fiecare imagine nedescrisă, inclusiv defecțiuni parțiale și imagini dincolo de limita de descriere a apelurilor (#17069). Combo-ul existent, complet eșuat, descrie de rezervă rămâne în vigoare (#8430).
6. Returnează `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selector de mod (`modalityBridgeVisionMode`)

| Modul      | Implicit | Comportament                                                                                                                                                                                                                                                                                                     |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Euristică moștenită, neatinsă (#6640/#7204): modelele non-combo/`auto/` redirecționează către cel mai bun model de viziune, cu excepția cazului în care modelul original are deja acreditări utilizabile (apoi descrie); ținte combinate descriu întotdeauna.                                                    |
| `describe` |          | Descrieți întotdeauna — blocul de redirecționare este omis complet; modelul ales de utilizator răspunde întotdeauna.                                                                                                                                                                                             |
| `reroute`  |          | Redirecționare forțată: paza modelului păstrat-acreditat este ocolită. redirecționarea-** ţintă** garda de acreditări încă aplică — atunci când nu există o țintă vizuală utilizabilă, puntea se blochează cu o eroare clară, mai degrabă decât să descrie sau să trimită imagini brute către o țintă doar text. |

Moduri forțate în scurtcircuit** înainte** rulează auto euristica; Comportamentul `auto` este identic în octet cu balustrada pre-PR-1.

#### Domeniul de aplicare a cheii API (`visionBridgeKeyScope.ts`)

Când cheia API a apelantului restricționează `allowedConnections`, pool-urile de cote (`allowedQuotas`) sau modelele (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), bridge-ul alege doar redirecționarea și descrie modelele pe care cheia le poate folosi, pe conexiunile pe care cheia le poate folosi. Apelul descriere trece apoi întotdeauna prin bucla automată OmniRoute cu antetul `x-omniroute-self-loop-key-id`, astfel încât solicitarea de chat de primire impune din nou politica de conectare și model a acelei chei. `enforceApiKeyPolicy()` onorează acel antet numai împreună cu purtătorul de buclă automată, astfel încât poate doar îngustă accesul, iar un id care nu se rezolvă este respins.

Dacă nu este permis niciun model de viziune pentru cheie, a** țintă confirmată numai pentru text** respinge cererea de imagine local cu un HTTP 400 clar în loc să redirecționeze octeți de imagine către un amonte incapabil (#17069). Pentru ținte cu capacitate de viziune necunoscută sau nativă, calea de descriere își păstrează comportamentul anterior de deschidere a erorilor (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Solicitările fără cheie și cheile fără aceste restricții se comportă exact ca înainte.

#### Prompt de descriere conștient de sarcini (`modalityBridgeVisionTaskAware`)

Implicit** adevărat** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) adaugă textul** ultimul mesaj utilizator** (trunchiat la 500 de caractere) la promptul de descriere de bază, direcționând descrierea către ceea ce utilizatorul a cerut de fapt (model codex-vision-proxy) și solicitând modelului de viziune să transcrie text vizibil. Cu indicatorul dezactivat — sau fără text de utilizator — promptul de bază este utilizat neschimbat.

Cererea compatibilă cu OpenAI a descrierii auto-buclei (`callVisionModelSingle()` în `visionBridgeHelpers.ts`) solicită întotdeauna `image_url.detail: "high"` — necondiționat, pentru fiecare caller/provider, nelimitat pe niciun semnal client. Eșantionarea cu detalii reduse degradează acuratețea OCR pentru exact sarcina de transcriere a textului pe care o solicită acest prompt, astfel încât apelul de descriere în sine solicită întotdeauna detalii ridicate, indiferent de nivelul de detaliu utilizat în cererea de intrare inițială. Acest lucru afectează numai corpul intern al cererii de descriere; nu modifică modul în care OmniRoute redirecționează propriul `image_url.detail` al apelantului la cererea primară — care implicit este aplicat separat și numai pentru clienții OpenCode detectați, în `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Ramura în format fir Anthropic a buclei descrise nu are câmp `detail` și nu este afectată de nicio formă implicită.

#### Descrieți limita de ieșire (`modalityBridgeVisionMaxChars`)

| Cheie                          | Implicit | Gamă              |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` sau 100–50000 |

`0` (implicit) înseamnă** fara capac** — descrierea returnată de `callVisionModel()` este trecută prin nemodificat, păstrând comportamentul existent. Orice valoare din intervalul 100–50000 trunchiază descrierea cu un sufix `…` înainte de a fi îmbinată înapoi ca `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` în `src/lib/guardrails/visionBridge.ts`). Creșteți acest lucru pentru sarcini OCR cu detalii în care modelul din aval necesită transcrierea completă; reduceți-l până la utilizarea token-ului legat pe modelele de viziune discutabilă. Câmpul tabloului de bord se află în panoul Avansat `z.union([z.literal(0), z.number().int().min(100).max(50000)])` filei Viziune (`modality-bridge-max-chars` în `ModalityBridgeVisionTab.tsx`) și fixează Zod valoare între — și `0` până la etajul 100, lăsând un `0` explicit neatins.

#### Descrieți memoria cache (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL în memorie pentru ieșiri descrise, partajată la nivelul întregului proces. Cheie = `sha256(imageRef + composedPrompt + configuredBridgeModel)` cu încadrare prefix de lungime (fără coliziuni de limită câmp). Componenta modelului este** configurat** Modelul bridge, nu modelul care a răspuns de fapt — `callVisionModel` poate cădea înapoi în interior, iar tastarea la fiecare încercare ar fragmenta memoria cache. Descrierile eșuate nu sunt niciodată memorate în cache. Setări:

| Cheie                           | Implicit | Gamă    |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalizarea imaginii de la distanță (auto-buclă describe/base64 fetch)

Când podul aduce a** telecomanda** imaginea în sine — Anthropic descrie auto-apelul și conversia în format claude-wire-base64 (`ensureBase64ImagesForClaudeWire`), ambele prin `fetchRemoteImageAsDataUri()` în `visionBridgeHelpers.ts` — datele rezultate URI sunt transmise prin `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) înainte de a fi încorporate în cererea modelului de viziune. Imaginile supradimensionate sunt reduse la a** 2048px margine lungă** (se potrivește cu limita de redimensionare OpenAI/Anthropic se aplică deja pe partea serverului), ceea ce reduce încărcarea bytes/latency fără a schimba ceea ce vede modelul de viziune. Redimensionarea folosește `sharp`, încărcat prin import dinamic: pe o platformă în care binarul său nativ nu se încarcă, `normalizeDataUri()`** nu aruncă niciodată** — se întoarce la o trecere a octeților originali, astfel încât calea describe/base64-conversion continuă să funcționeze. Octeții non-imagine (o preluare care nu a returnat o imagine decodabilă) sunt, de asemenea, trecuți neatinsi. Această normalizare se limitează la imaginile pe care le preia bridge-ul pentru propriul auto-apel — nu este niciodată aplicată sarcinii utile de trecere brută a apelantului, în concordanță cu principiul mutației opt-in-only (Hard Rule #20).

#### Setări schema + migrare

Noile chei `modalityBridge*` sunt validate Zod în `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio și grupul `modalityBridgeAudio*` folosit de Audio Bridge. Migration `141_modality_bridge_settings.sql` copiază valorile `visionBridge*` moștenite în noile chei care se potrivesc (idempotent, nu suprascrie niciodată o valoare `modalityBridge*` setată de operator); cheile moștenite rămân acceptate ca alternativă de citire pentru un ciclu de lansare.

#### Antet de transparență + stats

Răspunsurile descrise-transformate poartă `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (construit de `buildModalityBridgeHeader()` în `modalityBridge/bridgeStats.ts`, ștampilat cu `withModalityBridgeHeader()` în `src/sse/handlers/chatHelpers.ts`). Solicitările redirecționate primesc** nu** antet — sarcina utilă a fost neatinsă și modelul de schimb este deja vizibil în câmpul `model` al corpului de răspuns.

`GET /api/modality-bridge/stats` (autentificare de gestionare, același nivel ca `GET /api/settings`) returnează contoarele pe modalități în memorie `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` pentru `vision`, `audio` și `video`. `averageLatencyMs` folosește `latencySamples`, nu toate încercările, ca numitor; o operație fără sincronizare nu fabrică o probă de zero milisecunde. `bridged` rămâne alias-ul compatibil cu versiunea inversă pentru conversii de succes; încercările eșuate nu o cresc. Contoarele resetate la repornirea procesului prin proiectare (telemetrie, nu contabilitate).

#### Configurarea tabloului de bord

Pagina dedicată tabloului de bord este `/dashboard/settings/modality-bridge`. Filele sale `Vision`, `Audio` și `Video` adresabile la adresa URL păstrează parametrii de interogare în timp ce schimbă valoarea `tab`. Fila Vision expune activarea, modul, selecția modelului (inclusiv implicit automat), solicitarea conștientă de sarcini, limitele timeout/image/description-length/cache avansate, contoarele de rulare și o solicitare de eșantion protejată. Fila Audio este, de asemenea, live: expune activarea, un selector de modele numai STT cu Auto, limite timeout/max-clip, contoare audio și un test de probă `input_audio`. Fila Video este funcțională: raportează starea de rulare FFmpeg/ffprobe — una dintre cele patru stări UI explicite (`unknown` în timp ce sonda este în zbor sau nu a putut fi finalizată, `restricted` pe o gazdă de tablou de bord non-loopback unde proba este omisă din partea clientului, `unavailable` odată testată și confirmată lipsă sau `available` — cu versiunea de limita enable/model/frame/video/timeout modelului FFmpeg/ffprobe ) selector la modele capabile de vedere și expune contoare video.

Fostul card Vision Bridge din setările AI este un link de compatibilitate către noua pagină; nu mai deține un al doilea exemplar al formularului. Furnizorii de media conectează, de asemenea, fluxurile de lucru Image-to-Text și Speech-to-Text la filele Modality Bridge corespunzătoare, fără a elimina terenul de joacă existent Speech-to-Text.

**Bypass de admitere în buclă automată:** atunci când apelul descrie rutează prin propria buclă `/v1` a lui OmniRoute(model de furnizor non-standard), cererea secundară trimite `x-omniroute-admission-bypass: internal` și este autentificată cu acreditările de auto-buclă rezolvate — sentinelul local `sk_omniroute` în modul local sau `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` configurat de operator poate rula apelul în continuare cheia de `REQUIRE_API_KEY=true` (#1zq50). Ocolirea este onorată doar pentru acele acreditări exacte, astfel încât clienții externi nu pot folosi antetul pentru a omite admiterea. (#1350)

Valorile implicite moștenite trăiesc în `src/shared/constants/visionBridgeDefaults.ts`; noile valori implicite mode/task-aware/cache și soluția de setare se află în `src/shared/constants/modalityBridgeDefaults.ts`. Balustrada expune o opțiune de constructor `deps`, astfel încât testele pot injecta implementări false `getSettings` și `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modalitate Bridge PR-3

Interceptează solicitările de chat care poartă audio înainte ca acestea să atingă o țintă despre care nu se știe că acceptă intrare audio. Nu redirecționează niciodată solicitarea de chat: părțile audio sunt transcrise prin punctul final existent în mai multe părți compatibile cu OpenAI, iar modelul de chat ales continuă cu transcrieri text.

Flux:

1. Rezolvați `supportsAudio` prin `getResolvedModelCapabilities()`. Câștigă metadatele explicite ale registrului furnizorului, apoi metadatele modelului statice, apoi `modalities_input` sincronizat. O listă de intrare declarată fără `audio` este `false`; nicio dovadă de capacitate nu rămâne `null`. Atât `false` cât și `null` activează puntea conservatoare, în timp ce `true` o ocolește.
2. Rezolvați setările `modalityBridgeAudio*` și extrageți părți audio de nivel superior care pot fi îmbinate din fiecare mesaj prin detectorul `detectMediaParts()` partajat. Formele de sârmă acceptate sunt OpenAI `input_audio`, `audio_url` și `source.media_type: "audio/*"`. Audio imbricat este detectat pentru rutare, dar nu este eliminat de calea de îmbinare. Lucrarea este limitată de `modalityBridgeAudioMaxClips`; părțile ulterioare rămân neatinse.
3. Onorați un `provider/model` configurat sau lăsați `selectAudioBridgeModel()` să meargă `AUDIO_TRANSCRIPTION_PROVIDERS` într-o ordine stabilă de catalog și selectați primul model cu o acreditare de furnizor activ utilizabilă.
4. `callAudioTranscription()` convertește sunetul base64/data-URI într-un `file` cu mai multe părți sau descarcă un `audio_url` la distanță prin gardul de ieșire numai public cu fixare DNS și o legătură de 25 MB. Apoi POSTs fișierul și modelul selectat în bucla automată `/v1/audio/transcriptions` locală, autentificată cu `resolveSelfLoopBearer()`. Ruta de transcriere existentă realizează căutarea normală a acreditărilor, gestionarea cooldown/rate-limit și expedierea furnizorului.
5. Apelurile reușite își înlocuiesc piesele cu `[Audio N]: <transcript>`. Apelurile rulează cu `Promise.allSettled`: o eroare individuală păstrează acea parte audio originală (contractul #4012). Dacă fiecare apel eșuează și ținta este dovedită `supportsAudio === false`, părțile devin `[Audio N]: (unavailable — no STT provider connected)` (contract #8430). Pentru o țintă necunoscută (`null`), rezultatul total eșec rămâne neatins. O țintă dovedită, doar text, fără acreditări STT utilizabile, primește același stub explicit fără a emite un apel de rețea.

Transcrierile de succes folosesc memoria cache LRU/TTL Modality Bridge la nivelul întregului proces. Tasta combină referința audio, eticheta de operare `audio-transcription` stabilă și modelul STT selectat; eșecurile nu sunt niciodată memorate în cache. Încercările audio actualizează contoarele partajate `bridged`, `cacheHits`, `failures` și `lastUsedAt`. Răspunsurile transformate poartă `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; cererile neatinse nu primesc un segment Audio Bridge.

Setările de rulare sunt susținute de DB și validate de Zod:

| Cheie                         | Implicit | Gamă            |
| ----------------------------- | -------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —               |
| `modalityBridgeAudioModel`    | `""`     | Auto sau STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10            |

Cache-ul partajat rămâne controlat de `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` și `modalityBridgeCacheMaxEntries`.

### Pod video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceptează părțile video de nivel superior în Finalizările chatului `messages` și Răspunsurile API `input` înainte ca o țintă fără suport video nativ cunoscut să fie apelată. Formele acceptate sunt `input_video`, `video_url`, `video_source`, HTTPS URLs și `data:video/*;base64,...` data URIs. Numele simple de fișiere din text nu sunt tratate ca videoclipuri.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) deține parcurgerea cererilor, verificarea capability/policy, agregarea per-cerere și sarcina utilă de răspuns. Achiziția — de lucru pe video, memoria cache a întregului rezultat, care descrie o secvență de cadre (care fuzionează orice transcriere audio declarată de apelant) și metrics/abort/cleanup — per încercare este ascuns în spatele `processVideoPart` în `videoBridgePipeline.ts`, numit o dată pe partea video în bucla lui `preCall`. Acest modul definește, de asemenea, limitele explicite ale portului `VideoMediaBrokerPort` (dobândirea de octeți și extragerea cadrelor eșantionate), `VideoAudioTranscriptionPort` (combinând o transcriere audio declarată de apelant cu subtitrările eșantionate) și `VideoDrilldownPort` (limita de persistență a detalierii cadrului; încă neconectată în `processVideoPart` — doar drill-urile separate ale rutelor `/api/modality-bridge/video/drilldown` de azi).

Calea publică de solicitare `/v1` nu importă sau invocă niciodată un subproces. Videoclipurile de la distanță sunt descărcate sub o limită de 50 MiB ; Videoclipurile inline base64 au o limită conservatoare de 36 MiB decodificată pentru fiecare videoclip, astfel încât plicul model/messages/framing să poată rămâne în limita de admitere a cererii publice JSON de 50 MiB. Estimările privind lungimea în linie și dimensiunea decodificată sunt verificate înainte de alocare. HTTPS este necesar pe URL la distanță inițial și pe fiecare redirecționare, utilizând gardul de ieșire exclusiv public existent cu fixarea DNS. Octeții trec apoi granița internă exactă a brokerului `POST /api/modality-bridge/video/extract`. Acea rută este atât `LOCAL_ONLY` cât și `SPAWN_CAPABLE`, acceptă doar o cerere de loopback de încredere, autentificată pe proces și nu acceptă niciodată o URL, calea sistemului de fișiere, executabil sau listă de argumente. Conducta API pentru dimensiunea corpului și cititorul de corp incremental al operatorului impun în mod independent o limită de intrare de 50 MiB pentru broker. Coada sa delimitată rulează o extracție la un moment dat, permite patru lucrări în așteptare și limitează intrarea în așteptare la 100 MiB.

În interiorul brokerului, `ffprobe` citește un fișier local privat; lista permisă cu format fix exclude formatele playlist și manifest. Pentru containerele din familia MOV permise, referințele externe de date MOV rămân dezactivate în mod implicit, iar comanda fixă nu se înscrie în ele. Atât `ffprobe` cât și `ffmpeg` folosesc lista albă a protocolului `file` -only, un fir de execuție, matrice cu argumente fixe, fără shell și executabile rezolvate din `PATH`. Fluxurile de copertă ale imaginilor atașate nu sunt candidați care pot fi redate. Toate fluxurile redate trebuie să îndeplinească limitele, iar un flux implicit explicit este de preferat înaintea retragerii deterministe cu cel mai mic indice. Videoclipurile sunt limitate la 600 de secunde, 8.192 pixeli pe dimensiune și 33.554.432 pixeli sursă. FFmpeg eșantionează 1–16 cadre JPEG de punct mediu, micșorează marginea lungă până la cel mult 1.024 pixeli fără a mări intrările mai mici și nu primește niciodată un URL. Eșantionarea este `uniform` în mod implicit. Politicile `scene_aware` și experimentale `segment_aware` opționale efectuează o trecere suplimentară fixă FFmpeg peste fluxul local deja validat, selectează marcajele temporale ale scenei `showinfo` limitate și revin deterministic la aceleași puncte de mijloc uniforme la defecțiunea detectorului, timeout, ieșire malformată sau un set candidat gol. Modul conștient de segment alocă eșantioane de punct de mijloc proporțional cu intervalele de scenă validate; Dovezile conștiente de segment și comportamentul de rezervă sunt detaliate mai jos. Limita rigidă de 16 cadre este aplicată după selecție în fiecare politică. Când o solicitare conștientă de scenă are doar un buget de un cadru, folosește punctul de mijloc uniform al ferestrei de video complet activ sau de focalizare și raportează `policyEffective: uniform`: un singur cadru de scenă selectat nu poate păstra ambele capete temporale. Un apelant poate oferi opțional o fereastră de focalizare finită (`start`/`end` secunde); limitele sunt fixate la durata media, ferestrele inversate sau nefinite sunt respinse și toate politicile de eșantionare sunt efectuate numai în intervalul normalizat. Fereastra rezultată este inclusă în metadatele de eșantionare și în prefixul de descriere nesigur, astfel încât modelele din aval să poată distinge un fragment concentrat de cronologia completă.

Focalizarea subtitrării semantice este o setare separată, explicită. Modul implicit de analiză `full` păstrează promptul de cadru existent și nu redirecționează niciodată textul cererii către modelul de legendă. În modul `focused`, bridge-ul citește doar cel mai recent `text`/`input_text` scris de utilizator care nu este gol din același container de chat sau răspunsuri, îl normalizează la NFC, restrânge caracterele de control și spațiile albe și le limitează la 500 de puncte de cod Unicode. Un rezultat gol revine la promptul exact `full`. Un indiciu utilizabil este serializat ca JSON într-un bloc dedicat de context utilizator neîncrezat și poate prioritiza numai detaliile observabile; nu poate anula avertismentul separat împotriva următoarelor instrucțiuni vizibile sau audibile în media. Focalizarea textuală nu deduce niciodată `start`/`end` sau modifică eșantionul temporal.

#### FU-07 dovada segmentului structural

`segment_aware` folosește o trecere de pre-analiză delimitată peste fluxul video local deja validat. Lanțul de filtre fixe se scalează mai întâi la cel mult 320 de pixeli lățime, detectează schimbările de scenă și intervalele înghețate, apoi prelevează la 1 cadru pe secundă pentru informații neclare, lumina medie și spatial/temporal. Trecerea este limitată la 600 de eșantioane structurale, un fir FFmpeg/filter, același protocol `file` -only și liste de containere permise, o legătură de 1 MiB proces-ieșire și cel mult 30 de secunde în interiorul abort/deadline. partajat al brokerului. Nu acceptă niciodată o comandă, filtru, cale sau URL de la cerere.

Valorile structurale sunt dovezi de eșantionare deterministă, nu înțelegere video semantică. Acestea nu deduc subiecte, acțiuni, subtitrări, discurs sau intenție a utilizatorului. Granițele scenei și înghețate formează segmente; înghețarea acoperirii, estomparea, expunerea, detaliile spațiale și modificarea temporală influențează doar modul în care este alocat bugetul existent de 1-16 cadre. Un segment complet înghețat este limitat la un cadru, în timp ce segmentele neînghețate concurează pentru bugetul rămas. Când limitele depășesc numărul cadrelor, se păstrează o acoperire uniformă a cronologiei, astfel încât tăierile timpurii rapide să nu poată ascunde un segment lung în urmă. Granițele scenei în cadrul rezoluției de analiză de 1 secundă a graniței de înghețare sunt unite.

Lipsa filtrelor, dovezile malformed/empty, o eroare de detector sau timeout-ul de pre-analiza limitat nu se deschid la politica exactă a punctului de mijloc uniform. O anulare a apelantului sau un termen limită pentru broker nu eșuează: se încheie subprocesul în timpul zborului, împiedică extragerea ulterioară a cadrelor, iar arborele temporar privat este eliminat în `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generează fixări FFmpeg reale deterministe pentru economii de subtitrări post-deschis, alocarea bugetului cu mișcare densă, dovezi blur/exposure/SI-TI, reduceri rapide cu o coadă lungă și false pozitive care se estompează treptat. Înregistrează timpul de perete pre-analiza și, acolo unde `/usr/bin/time` este disponibil, CPU copil și RSS de vârf. Controalele sale de calitate sunt doar oracole structurale. Calitatea reală a modelului de subtitrări rămâne `HOLD` deoarece acest ham nu are un punct final autorizat sau un judecător înghețat. Economiile monetare rămân, de asemenea, `HOLD` cu excepția cazului în care `--caption-cost-per-call-usd` furnizează o estimare explicită pozitivă pe apel; scenariul nu fabrică niciodată niciun rezultat.

Fiecare cadru este limitat la 4 MiB, toate cadrele brute împreună la 23 MiB, iar răspunsul brokerului serializat la 32 MiB. Un director temporar privat este eliminat în `finally`. OmniRoute nu include FFmpeg și nu acceptă o cale executabilă personalizată. Înainte de subtitrare, bridge-ul aplică o trecere de deduplicare vizuală conservatoare: fiecare JPEG este redus la un tampon de 16 × 16 în tonuri de gri și este comparat numai cu ultimul cadru reținut. Pentru un buget de subtitrări solicitat mai mare de un cadru, extracția furnizează un grup de candidați delimitat de până la dublul bugetului și niciodată mai mult de 16 cadre. Plafonul solicitat se aplică numai după deduplicare, primii și definitivi candidați selectați păstrându-se în timpul subțierii finale atunci când bugetul este de cel puțin doi. Politica `grayscale-16x16-mean-cells-v2` versiunea utilizează cea mai mare dintre delta medie a lumii și raportul celulelor miniaturi a căror deltă normalizată este de cel puțin 0,05. Pragul duplicat este constanta 0,04, aleasă pentru predictibilitate, mai degrabă decât expusă ca setare de rulare. Acest semnal secundar cu contrast ridicat păstrează mișcarea mică și modificările vizibile ale textului pe care o comparație doar cu medie le poate ascunde. Erorile comparatorului sau decodorului nu se deschid și păstrează acoperirea. Metadatele de ieșire separă candidații extrași, cadrele utilizate cu succes și duplicatele vizuale eliminate.

O parte video marcată în mod explicit poate solicita o foaie de contact marcată cu ora. Podul construiește cel mult o grilă JPEG cu 4 coloane și 16 cadre. Fiecare celulă de 512 pixeli își arde marcajul de timp sursă într-o bandă inferioară cu contrast ridicat, în timp ce aceleași marcaje de timp rămân în metadatele textuale pentru asociere și audit în aval. JPEG complet rămâne limitat la 32 MiB. Dacă `sharp` nu poate decoda sau compune grila, puntea revine la cadrele JPEG individuale; o întrerupere a clientului încă se propagă prin operația de foaie.

Dovezile de promovare sunt în mod deliberat separate de microbenchmark-ul compoziției sintetice. `scripts/perf/video-bridge-contact-sheet-eval.ts` definește un ham A/B cu versiunea schemă pentru modele reale de viziune compatibile cu OpenAI. Măsoară jetoanele raportate de furnizor, latența peretelui de la capăt la capăt (inclusiv compoziția foii), numărul de apeluri de model și păstrarea faptelor definite de manifest. Răspunsurile modelului brut nu sunt scrise în raport; sunt reținute numai SHA-256 digests și IDs fact matched. Cablul nu efectuează apeluri de rețea sau model plătit decât dacă `--execute-real` este trecut și `--model`, `OMNIROUTE_BASE_URL` și `OMNIROUTE_API_KEY` sunt configurate. Fără acea rulare reală explicită, verdictul său care poate fi citit de mașină rămâne `HOLD`; Numai măsurătorile sintetice payload/call-count nu sunt dovezi de promovare.

Apelanții pot atașa o matrice `transcript.cues` opțională la o parte video acceptată atunci când posedă deja text aliniat. Fiecare tac trebuie să poarte `text`, un interval finit `start`/`end` în interiorul duratei sondate și un `source` pe lista albă (`client`, `embedded` sau `audio-bridge`); `confidence` este implicit `1` și trebuie să rămână între `0` și `1`. Indicațiile exacte duplicat sunt restrânse. OmniRoute nu începe niciodată transcrierea din aceste metadate: indicațiile validate sunt copiate în rezultatul descris cu sursă, încredere și interval și sunt redate ca observații nesigure alături de subtitrările cadrului. Textul nevalid, în afara intervalului sau fără proveniență este respins și nu amestecat în fluxul de subtitrări. Ambele canale de transcriere a corpului cererii normalizează proveniența furnizată la `client`, inclusiv etichetele auto-afirmate `embedded` sau `audio-bridge`. Doar un adaptor deținut de server poate aloca acele etichete de încredere prin argumentul `trustedSource` numai pentru cod; un câmp de solicitare JSON nu poate ajunge la acel argument. Textul transcripției rămâne conținut neîncrezător derivat din media, indiferent de proveniență și nu trebuie să determine niciodată autorizarea.

Un apelant avansat poate furniza o pistă `audioTranscript` pentru același videoclip; este tratat ca text furnizat de client, nu o dovadă a transcripției serverului. Cusătura de fuziune rulează observații vizuale și audio sub un singur termen limită și semnal de anulare, le ordonează pe o linie temporală comună, prăbușește duplicatele exacte și raportează un rezultat parțial atunci când doar o parte reușește. Un `audioTranscript` invalid se degradează la acel rezultat parțial — descrierea vizuală este păstrată și ramura audio înregistrează un cod de eroare igienizat — în loc să eșueze întregul videoclip. Disponibilitatea pe ramură, marcajul parțial și codurile de defecțiune igienizate sunt păstrate în rezultatul descris, în metadatele parapetului (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), în metadatele rezultat-cache și în contoarele de fuziune bridge. Calea implicită Video Bridge nu invocă discursul în text și nu descarcă oa doua copie media; fără acea piesă explicită, rămâne doar video.

**Păstrarea transcripției (#12150 P1).** Acest lucru se aplică automat ori de câte ori Video Bridge (însuși opt-in) redă un semnal de transcriere — nu există un semnal de reținere separat. Când o solicitare redă orice indiciu de transcriere (un `transcript` declarat de apelant sau un `audioTranscript` fuzionat), balustrada îl marchează `videoBridgeObserved` și produce o umbră redactată a descrierii video — o redare identică în care corpul de text liber al fiecărui indiciu este înlocuit cu `[redacted-video-transcript]`, construit prin înlocuirea câmpului de tac structurat, astfel încât textul structurat să fie asamblat prin asamblarea textului plat nici un conținut indiciu — adversar sau obișnuit, inclusiv corpuri care conțin `]` cum ar fi `[inaudible]`/`[music]` — pot supraviețui). Corpul solicitării jurnalului de apeluri persistent schimbă fiecare parte de text derivată din video cu acea umbră redactată, potrivită cu egalitatea de conținut; ancora `fullText` este recitită din încărcătura utilă pre-apel finalizată, astfel încât meciul reușește în continuare după barele de protecție ulterioare în lanț (mascarele PII și acreditările, prioritățile 10/95) rescriu textul de descriere în loc și după injectarea system-prompt/handoff/memory remodelează matricea de mesaje. Caroseria trimisă în amonte la model este neschimbată. De asemenea, o solicitare observată nu populează o memorie durabilă (atât extracția derivată din cerere, cât și cea derivată din răspuns sunt omise), astfel încât propriul răspuns al modelului nu poate ecou textul transcrierii în memorie.

**Câmpuri video brute (#12430).** Când bridge-ul este activat și suportul video nativ este necunoscut sau absent, câmpurile definite `transcript`/`audioTranscript` activează și `videoBridgeObserved`, chiar și după eșecul descrierii sau o limită `maxVideos`. `null` și șirurile goale contează; câmpurile absente și metadatele non-video nu. Copiile reținute elimină aceste câmpuri sau omit solicitarea, iar caches/Memory este ocolit.

Pe acele căi de rezervă, indicațiile valide ale apelantului devin părți `text`/`input_text` acceptate, mai degrabă decât câmpuri nestandard ale furnizorului. Ambele piese furnizate de cerere rămân observații `client` nesigure, cu un avertisment explicit că videoclipul nu a fost descris și marcajele de timp nu au fost verificate în raport cu mass-media. Bugetele existente 256-cue/64-KiB total și per-cue se aplică pe cele două căi împreună; marcajele temporale trebuie să se potrivească cu plafonul de 600 de secunde al brokerului și orice fereastră de focalizare furnizată. Melodiile nevalide sunt eliminate, nu redirecționate ca text arbitrar; un frate valid poate fi folosit în continuare, cu excepția cazului în care bugetul lor combinat este depășit. câmpurile Null/empty nu adaugă text. Nicio preluare sau transcriere media nu este adăugată de această alternativă. Câmpurile extensiei de transcriere sunt eliminate din suportul video alternativ și din obiectele sale `video_url`/`source`. Lista de permisiuni OpenAI fir rămâne strictă; Purtătoarele video native necunoscute rămân disponibile, iar țintele cunoscute doar text păstrează marcatori siguri. Umbrele de redactare structurate protejează textul transcriptului atașat, în timp ce solicitarea originală deținută de apelant rămâne neschimbată. Țintele acceptate nativ și podurile dezactivate își păstrează comportamentul de ocolire existent.

Copiile reținute suplimentare folosesc același semnal de solicitare observată. Instantaneul brut al solicitării clientului înainte de gardă, cererea în așteptare în memorie și jurnalul de solicitare respinsă timpurie înlocuiesc structural câmpurile de transcriere din părțile video; solicitările șirurilor sintetizate de etapele pipeline și transferul contextului sunt redactate la receptorul de corpuri de solicitare persistentă. Marcatorul `video_content_removed` persistent face ca continuarea `previous_response_id` să eșueze închisă, mai degrabă decât să reconstruiască textul care a fost eliminat intenționat. Dacă o solicitare observată își pierde umbra de redactare pe parte înainte de înregistrare sau chiar și una dintre mai multe umbre video nu se potrivește după mutații ulterioare ale solicitării, corpul cererii reținute este omis în întregime în loc să păstreze o transcriere parțial redactată.

Pentru o solicitare observată, un răspuns model ar putea cita orice parte a transcripției fără o limită structurată a tacului. Jurnalul de apeluri persistent `responseBody` este, prin urmare, înlocuit cu un marcator de omisiune; artefactul detaliat al conductei (care poate include corpuri upstream/client și bucăți de flux) nu este reținut. Cache-urile semantice, de idempotnță și de reluare a raționamentului ocolesc citirile și scrierile pentru acea solicitare. Solicitarea furnizorului și răspunsul vizibil de client rămân neschimbate. Octeții de menținere timpurii sunt scurși din bufferul temporar atunci când artefactul detaliat este omis. Avertismentul EventStream malformat al lui Kiro raportează numai numărul de octeți de încărcare utilă, niciodată conținutul acestuia sau eroarea brută a parserului JSON. Aceasta nu pretinde că fiecare diagnostic provider/plugin care nu are legătură a fost auditat; măturarea mai largă a chiuvetei reținute este urmărită în #11658.

Ciclul de viață intern `/api/modality-bridge/video/drilldown` este un substrat separat, cache loopback/token-authenticated. Fiecare operație necesită, de asemenea, un principal opac canonic ID. Înainte ca un apelant de producție să fie activat, acesta trebuie să obțină acel ID de la chiriașul autentificat și nu trebuie să redirecționeze niciodată o valoare selectată de client. Cheile cache leagă acel principal de sesiune canonică și de referință video IDs, stochează numai cheile lor SHA-256-derived și limitează atât citirile, cât și ștergerea la același principal. Cache-ul stochează cel mult 16 cadre JPEG derivate per intrare, le expiră după zece minute și acceptă citiri `start`/`end` limitate sau ștergerea explicită a sesiunii.

Fiecare principal este limitat la 16 intrări și 64 MiB de date canonice JPEG. Aceste limite sunt independente de plafonul global 64-entry/256 MiB : presiunea cotei principale evacuează numai intrările cel mai puțin recent utilizate ale principalului, înainte de a fi luată în considerare evacuarea globală LRU. Intrările expirate sunt eliminate atât din contabilitatea principală, cât și din contabilitatea globală privind activitatea cache, în timp ce anularea și eșecul de validare nu comportă o înlocuire parțială.

Cache-ul respinge Base64 non-canonică, excesul de umplutură, media non-JPEG, JPEGs malformat sau trunchiat și JPEGs care produc un avertisment în timpul unei decodări `sharp` cu imagine completă delimitată. Re-codifică fiecare imagine acceptată ca un JPEG canonic, derivă lățimea și înălțimea din octeții decodați în loc să aibă încredere în câmpurile apelantului și elimină orice octeți poligloți în urmă, în loc să-i rețină. Doar tamponul comprimat canonic delimitat este taxat de ambele cote. Limita cablului JSON include supraîncărcarea Base64 pentru plafonul de intrare decodificată de 32 MiB. Fiecare derivație stocată își înregistrează JPEG format/resolution validat, politica de eșantionare, versiunea de derivare, timpul de creare, hash-ul de conținut calculat de server și referința parentală hashing plus hash-ul conținutului părinte al apelantului de încredere. Anularea este verificată între fazele decode/hash asincrone înainte de comiterea cache-ului atomic.

Această tranșă nu conectează încă un producător de producție la traseu și nu oferă o selecție de variante cu rezoluție multiplă. Prin urmare, calea transparentă de solicitare Video Bridge nu implică nicio muncă suplimentară, în timp ce derivarea principalului legată de locatari și ciclul de viață complet cu rezoluție multiplă FU-08 rămân o activitate de urmărire explicită, mai degrabă decât documentată ca un comportament complet.

Cadrele sunt subtitrate secvenţial cu modelul video configurat. O modificare video goală moștenește setarea Vision; dacă ambele sunt goale, routerul automat Vision selectează modelul eficient capabil de vedere. Subtitrările reușite înlocuiesc partea originală cu un prefix `[Video description:` stabil care marchează, de asemenea, textul ca o observație nesigură derivată din media și le spune modelelor din aval să nu urmeze instrucțiunile găsite în media. Cheile cache pentru subtitrări ale cadrului includ octeții JPEG, promptul, marcajul de timp și modelul efectiv; sunt stocate în cache doar subtitrările reușite. Intrările din cache păstrează modelul de producător de succes real, inclusiv un model alternativ; podul raportează `mixed` atunci când diferite cadre au fost produse de diferite modele. Un hit cache reutiliza acea identitate de producător în loc să o reeticheteze ca plan de rutare solicitat. Cache-ul întregului rezultat video este introdus pe fiecare intrare care modifică promptul — de ieșire, modelul eficient, politica de eșantionare, numărul de cadre, modul de analiză semantică, amprenta digitală SHA-256 a indicii de focalizare normalizată, fereastra de focalizare, `transcript`, `audioTranscript` și marcajul foii de contact —, astfel încât modificarea oricăreia dintre aceste dimensiuni nu este niciodată o reutilizare a memoriei cache. Versiunea politicii de deduplicare vizuală, pragul și numărul de cadre candidat limitate sunt, de asemenea, explicite în cheia și metadatele rezultate din memoria cache; prin urmare, o modificare a politicii nu poate reutiliza o descriere veche a întregului videoclip. Metadatele cache a rezultatelor v4 păstrează modul și amprenta, niciodată sarcina brută a utilizatorului. Metadatele Guardrail raportează atât modurile de analiză solicitate, cât și cele eficiente; un mod `focused` solicitat fără text de utilizator utilizabil este raportat ca efectiv `full`.

Balustrada extrage fiecare parte video acceptată, dar nu descrie mai mult de `modalityBridgeVideoMaxVideos`. Pentru o țintă dovedită că are `supportsVideo === false`, videoclipurile eșuate și depășite limitele devin markeri expliciți de text sigur, astfel încât niciun videoclip brut nu supraviețuiește. Când capacitatea este necunoscută, acele părți își păstrează purtătorul video; orice transcriere alternativă urmează conversia textului delimitat de mai sus. Țintele cu `supportsVideo === true` ocolesc podul. Semnalul de renunțare la cererea clientului se propagă prin descărcare, coadă de broker, subprocese și apeluri de subtitrări; întrerupe oprirea între videoclipuri și nu eșuează niciodată deschiderea către media brute.

Setările de rulare sunt susținute de DB și validate de Zod:

| Cheie                               | Implicit    | Interval / comportament                                                                                                 |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Timp de rulare opțional, înscriere                                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` păstrează subtitrările generice; `focused` folosește contextul cel mai recent utilizator limitat, nede încredere |
| `modalityBridgeVideoModel`          | `""`        | Moșteniți modelul Vision Bridge                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` sau `segment_aware` proporțional ; defectarea detectorului revine la `uniform`                 |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                          |

Valorile de timeout video mai mari de 120 de secunde sunt fixate la termenul limită al brokerului; noile setări scrierile peste această limită sunt respinse. `GET /api/modality-bridge/video/runtime` necesită o localitate de loopback ștampilată de încredere înainte de autentificare sau de testare în timpul execuției, apoi necesită autentificare de management. Returnează numai `available`, versiuni FFmpeg/ffprobe dezinfectate și un motiv fix când timpul de execuție este indisponibil. Punctul final de extracție intern nu este o încărcare publică API: saturația cozii returnează `503` plus `Retry-After`, o deconectare a apelantului returnează `499`, iar termenul fix al brokerului returnează `504`. Răspunsurile convertite adaugă `video->text;model=<visionModel>;parts=<videos>` la antetul central `x-omniroute-modality-bridge` fără a elimina segmentele Vision sau Audio.

### PII Masker (`piiMasker.ts`)

Merge mai departe** ambele** etape.

- **`preCall`** clonează încărcătura utilă, parcurge `system`, `messages`, `input` și `prompt` (inclusiv elemente simple șir) și aplică `processPII()` (din `@/shared/utils/inputSanitizer`) la câmpurile șir `content`/`text`. Când `PII_REDACTION_ENABLED=true`, PII detectat este redactat în încărcarea utilă de ieșire. Acest lucru este independent de `INPUT_SANITIZER_MODE` (care controlează doar politica de injectare promptă). Când redactarea este dezactivată, apelul înregistrează contorizarea fără a rescrie conținutul.
- **`postCall`** clonează în profunzime răspunsul, rulează `sanitizePIIResponse()` plus mascarea Responses-API-shape (`maskResponsesOutput` — acoperă `output_text` și `output[].content[].text`). Dacă apare vreo redactare, răspunsul modificat îl înlocuiește pe original.

Parapetul nu se blochează niciodată; doar adnotează (`meta.detections`, `meta.redacted`) sau rescrie.

#### Selecție pe tip, modele personalizate și contoare de detectare

**Tabloul de bord → Setări → Securitate → PII mascare** alege _ce_ este mascat. Nu activează mascarea: adică încă `PII_REDACTION_ENABLED` (cerere) și `PII_RESPONSE_SANITIZATION` (răspuns + SSE), ambele dezactivate implicit.

- **Selectare pe tip** — ID-urile încorporate sunt listate în `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Unset înseamnă fiecare tip (comportamentul înainte de a exista această setare). Modelul `ssn_us` al motorului de cereri se mapează la `ssn`. Șabloanele (Minimal, Standard, Financiar, Brazilian, USA, GDPR, POPIA, Complet) completează doar casetele de selectare din UI.
- **identificatorii GDPR și POPIA** — douăsprezece ID-uri încorporate care acoperă EU și identificatorii personali din Africa de Sud (tabelul de mai jos). Regex-urile, validatorii și etichetele de jurisdicție ale acestora locuiesc într-un singur tabel, `src/shared/utils/piiPatterns.ts`, pe care îl consumă atât dezinfectantul de răspuns (`src/lib/piiSanitizer.ts`), cât și mascatorul de solicitări (`src/shared/utils/inputSanitizer.ts`). O potrivire este redactată numai atunci când validatorul său o acceptă; o serie de cifre nu este niciodată suficientă. Un operator care a salvat o selecție restrânsă înainte de a exista aceste id-uri păstrează comportamentul pe care l-a avut până când noile id-uri sunt bifate.
- **Modele personalizate** — până la 20 de modele regex sau wildcard (`*` = până la 64 de caractere fără spații albe, `?` = unul). Meciurile devin `[CUSTOM_REDACTED]`. Fiecare model trece prin `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): cel mult 500 de caractere, steagurile limitate la `g i m s u`, trebuie să fie compilate, trebuie să treacă `safe-regex` (backtracking catastrofal) și nu trebuie să se potrivească cu un șir gol sau cu un substituent de redactare. Un model care eșuează este refuzat când este salvat și când este testat, iar un rând stocat care eșuează este omis în timpul execuției în loc să fie compilat. Modelele personalizate rulează numai când mascarea este activată.
- **Contoare de detectare** — pentru fiecare tip de numărare (valori nu s-au potrivit niciodată), păstrate în memorie și resetate la repornire (`src/lib/pii/piiDetectionStats.ts`). Ele cresc doar când mascarea este activată.

Setările se află în tabelul `key_value` (spațiul de nume `pii_settings`, `src/lib/db/piiSettings.ts`) și sunt citite printr-un cache de 1 s. API:

| Metodă | Cale                     | Scop                                                                                 |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Stat de pavilion, `enabledTypes`, `customPatterns`, contoare de detectare            |
| `PUT`  | `/api/settings/pii`      | Înlocuiește `enabledTypes` (`null` = all) and/or `customPatterns`                    |
| `POST` | `/api/settings/pii/test` | Executarea uscată a unui model pe un eșantion de cel mult 8 KB; nimic nu este stocat |

Toate trei necesită autentificare de management și validează corpul cu Zod (`src/shared/validation/schemas/piiSettings.ts`).

#### identificatori GDPR (EU) și POPIA (Africa de Sud).

| Id                  | Identificator                 | Validare                                                                                       |
| ------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                          | Țara cunoscută, lungime exactă pentru acea țară, ISO 13616 MOD-97-10                           |
| `eu_vat`            | numărul EU VAT                | Prefix cunoscut de stat membru și formatul de număr al statului respectiv (fără căutare VIES ) |
| `es_dni_nie`        | Spaniolă DNI / NIE            | Scrisoarea de control (valoare mod 23); NIE este `X/Y/Z` + 7 cifre                             |
| `it_codice_fiscale` | Codice Fiscale italian        | Scrisoarea de control din tabelele de poziții odd/even                                         |
| `pl_pesel`          | PESEL polonez                 | Sumă de control ponderată și o dată de naștere codificată care există                          |
| `nl_bsn`            | BSN olandez                   | 11-proof (greutăți 9..2, -1)                                                                   |
| `de_steuer_id`      | German Steuer-ID              | ISO 7064 Mod 11,10 plus regulile de structură a cifrelor (fără 0 lider)                        |
| `se_personnummer`   | personnummer suedez           | Luhn peste ultimele zece cifre și o dată plauzibilă a nașterii (10 sau 12 cifre)               |
| `za_id`             | Numărul ID din Africa de Sud  | Luhn peste toate cele 13 cifre, month/day validă de naștere, cifra de cetățenie 0 sau 1        |
| `za_phone`          | telefon sud-african           | prefixul `+27` / `27` sau forma națională `0..` scrisă cu spațiu sau cratimă                   |
| `za_vat`            | Numărul VAT din Africa de Sud | 10 cifre care încep cu `4`** şi** „VAT” / „BTW” în cele 48 de caractere de dinainte            |
| `za_tax_ref`        | Cod fiscal sud-african.       | 10 cifre care încep `0`-`3`, Luhn,** şi** „tax” / „SARS” în cele 48 de caractere de dinainte   |

Deoarece formatele de numai cifre se ciocnesc cu numerele de ordine, numerele de construcție și marcajele de timp, cele mai slabe (`za_vat`, `za_tax_ref`) au nevoie de cuvântul cheie, iar un număr `0..` de zece cifre nu este tratat ca un număr de telefon din Africa de Sud. IBANs (`GB29 NWBK ...`) spațiate nu sunt potrivite. Pe calea de streaming, semnalul este căutat doar în interiorul fragmentului curent. Id-urile stau înaintea modelelor de telefon generice, astfel încât un identificator validat își păstrează propriul substituent (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Șabloanele `gdpr` și `popia` selectează ID-urile EU și, respectiv, din Africa de Sud. Mascarea în sine rămâne opt-in (Regula dura #20): nimic aici nu schimbă o caracteristică implicită de semnalizare.

### Injecție promptă (`promptInjection.ts`)

Detectează structuri adverse în conținutul furnizat de utilizator și aplică politica configurată. Comportamentul este determinat de variabilele de mediu și de opțiunile constructorului:

| Setare            | Env var                                                                                                 | Implicit | Efect                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activat           | `INPUT_SANITIZER_ENABLED`                                                                               | `true`   | Când `false`, balustrada scurtcircuitează.                                                                                                                                                                        |
| Modul             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                         | `warn`   | Politica de injectare: `block`, `warn` sau `log`. (`redact` este acceptat pentru back-compat, dar o face** nu** text de injectare a benzii; cererea de rescriere PII este controlată de `PII_REDACTION_ENABLED`.) |
| Pragul de blocare | opțiunea `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Severitate minimă necesară pentru blocare. Mediul este doar pentru observare în mod prestabilit.                                                                                                                  |

**Precedența modului** (`getMode`): apelant `options.mode` → `INJECTION_GUARD_MODE`** anulare DB caracteristică-steagul** (Tabloul de bord → Settings → Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Prin urmare, o înlocuire a tabloului de bord câștigă asupra vars-urilor env, astfel încât Feature Flags UI controlează garda care rulează în direct (fără repornire). Citirea DB este sigură: dacă dă erori, garda revine la comportamentul bazat pe env, iar atunci când nu este setată nicio modificare, comportamentul este identic cu rezoluția doar înv.

Surse de detectare:

1. `sanitizeRequest()` de la `@/shared/utils/inputSanitizer` (set de detectoare partajat folosit în altă parte în conductă).
2. `DEFAULT_GUARD_PATTERNS` încorporat (în prezent `system_override_inline` și `markdown_system_block`, ambele severitate `high` ).
3. Opțional `customPatterns` transmis prin opțiunile constructorului (șiruri, regex sau înregistrări `{ name, pattern, severity }` ).

Când `mode === "block"`** şi** cel puțin o detecție îndeplinește pragul de severitate, `preCall` returnează `{ block: true, message: "Request rejected: suspicious content detected" }`. În modurile `warn`/`log`, balustrada înregistrează, dar permite apelul. Asistentul partajat `evaluatePromptInjection()` este exportat și pentru apelanții care trebuie să evalueze solicitările fără a trece prin registry.

**Scanare legată (v3.8.20):** detectorul doar inspectează** primele 16 KB** de text prompt alăturat — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 de octeți) în `src/shared/utils/inputSanitizer.ts`. Atât `detectInjection()`, cât și `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` înainte de a rula bucla de model. Directivele de injectare se află aproape de partea superioară a unei intrări, astfel încât aceasta limitează regex CPU/GC pe încărcături utile de mai multe sute de KB fără a slăbi detectarea (cf. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Merge mai departe** ambele** etape, ultimele din lanțul implicit (prioritate `95`). Redactează modelele bine-cunoscute de chei API/jetoane secrete din încărcătura utilă de ieșire (conținutul mesajului, argumentele apelului instrumentului, rezultatele instrumentului)** şi** răspunsul furnizorului, astfel încât o acreditare lipită într-un prompt (sau ecou înapoi de un rezultat al instrumentului) nu este scursă către furnizorul din amonte sau înapoi către client.

- **Numai înscriere** , aceeași convenție ca PII redaction (Hard Rule #20-adjacent): dezactivat dacă nu `settings.credentialRedactionEnabled === true`** sau** `CREDENTIAL_REDACTION_ENABLED=true`. Cu acesta oprit, balustrada este un — fără operațiuni pe care nu se blochează niciodată și nu se rescrie niciodată.
- `redactCredentials()` parcurge arborele payload/response complet (`walkValue()`, prototype-pollution-safe, cycle-safe prin `WeakSet`) și înlocuiește potrivirile cu un substituent `[REDACTED:<type>]`, clonând doar ramurile care s-au schimbat efectiv.
- `CREDENTIAL_PATTERNS` acoperă cheile furnizorului LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), chei de plată (Stripe, Square,AWS ), chei de acces la cloud (Stripe, Square, SendGrid, Mailgun), chei private / JWTs, șiruri de conexiune purtătoare de acreditări (`mongodb://user:pass@...`, etc.) și un model generic de valoare antet `Authorization`/`x-api-key`/`api-key`/`apikey`. Cheile în formă de antet (`authorization`, `x-api-key`, `api-key`, `apikey`) sunt redactate structural (numai valoarea, prefixul schemei ca `Bearer `/`Basic ` păstrat) mai degrabă decât prin expresia regex de text generic.
- Parapetul nu se blochează niciodată; doar rescrie (`modifiedPayload` / `modifiedResponse`) și adnotă (`meta.credentialsRedacted`, `meta.count`).

Garda de regresie: `tests/unit/credential-masker-guardrail.test.ts`.

## Contractul de bază (`base.ts`)

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
  block?: boolean; // true scurtcircuitează lanțul
  message?: string; // afișat la blocare
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returnat de preCall pentru a rescrie cererea
  modifiedResponse?: TValue; // returnat de postCall pentru a rescrie răspunsul
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

O gardă de protecție semnalează „fără modificări" returnând fie `void`, `{}`, fie
`{ block: false }`. Returnarea unui `modifiedPayload`/`modifiedResponse` înlocuiește
valoarea care circulă prin lanț pentru garzile de protecție din aval.
`signal?: AbortSignal` transportă ciclul de viață al apelantului în garzile de protecție. Abandonarea unei cereri este excepția deliberată de tip fail-open: punțile media opresc lucrul și curățenia fără a restaura conținutul media brut către o țintă despre care se știe că nu îl acceptă.

## Registrul (`registry.ts`)

Singletonul `guardrailRegistry` expune:

- `register(guardrail)` — adaugă (sau înlocuiește după numele normalizat) o gardă de
  protecție și re-sortează după `priority` crescător.
- `clear()` / `list()` — funcții auxiliare administrative.
- `runPreCallHooks(payload, context)` — iterează garzile de protecție active, trece
  payload-ul prin `modifiedPayload` și se oprește la primul `block: true`.
- `runPostCallHooks(response, context)` — același flux pe partea de răspuns.
- `resetGuardrailsForTests({ registerDefaults })` — șterge starea și, opțional,
  reînregistrează valorile implicite pentru o izolare curată a testelor.

Ambele funcții de rulare returnează `{ blocked, payload|response, results, guardrail?, message? }`,
unde `results` este un tablou de înregistrări `GuardrailExecutionResult` care includ
câmpurile `blocked`, `skipped`, `modified`, `error` și `meta` pentru fiecare gardă de
protecție, utile pentru urmărire.

### Dezactivarea garzilor de protecție per cerere

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agregă o listă
deduplicată de nume de garzi de protecție care trebuie omise pentru cererea
curentă. Există cinci canale, citite în această ordine și îmbinate într-o singură
listă (la deduplicare câștigă prima apariție):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` din corpul cererii (nivel superior)
3. `metadata.disabledGuardrails` din corpul cererii (numai când `metadata` este un obiect)
4. Antetul `x-omniroute-disabled-guardrails`
5. Antetul legacy `x-disabled-guardrails`

Toate cele cinci canale sunt îmbinate, inclusiv cele două antete: trimiterea atât a
`x-omniroute-disabled-guardrails`, cât și a `x-disabled-guardrails` omite reuniunea
listelor lor, iar un antet modern gol nu mai ascunde antetul legacy
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), remediat în
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Valorile pot fi tablouri de șiruri de caractere sau un șir separat prin virgule;
numele sunt curățate de spațiile de la capete și normalizate la kebab-case cu litere
mici (`pii_masker` → `pii-masker`), iar intrările goale sunt eliminate. Rezultatul
este transmis registrului prin `context.disabledGuardrails`, iar acesta omite
garzile de protecție corespondente (`skipped: true` în `results`).

Lista de dezactivare afectează doar **registrul**. Modul `block` pentru
prompt-injection este o limită obligatorie: middleware-ul de protecție împotriva
injecției (`src/middleware/promptInjectionGuard.ts`) apelează
`evaluatePromptInjection()` fără nicio listă de dezactivare controlată de apelant
(apelul mort `resolveDisabledGuardrails({ body })` pe care îl făcea anterior a fost
eliminat în
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), astfel că o cerere
care dezactivează `prompt-injection` este totuși respinsă în modul `block`. Acest
comportament este intenționat. Canalele de dezactivare sunt controlate de apelant
(corpul cererii, metadate, antete), iar un apelant nu trebuie să poată dezactiva un
control de securitate stabilit de operator
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Reuniunea
antetelor din [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
schimbă doar care garzi de protecție din registru sunt omise; nu permite unui
client să ocolească middleware-ul. Politicile obligatorii de garzi de protecție per
cheie și per grup sunt urmărite în RFC-ul v4
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Consultați [Acoperire și limite](#coverage-and-limits).

## Ordinea de execuție

Pentru fiecare cerere care trece prin `src/sse/handlers/chat.ts` și
`open-sse/handlers/chatCore.ts` (rutele din familia chat listate în secțiunea
[Acoperire și limite](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` construiește lista de excluderi din cheia
   API, corpul cererii și anteturi.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` execută guardrail-urile în
   ordinea crescătoare a priorității:
   - Guardrail-urile dezactivate sunt înregistrate ca `skipped`.
   - `preCall` al fiecărui guardrail poate rescrie payload-ul prin
     `modifiedPayload`.
   - Primul `block: true` scurtcircuitează lanțul, iar handler-ul returnează
     un răspuns de respingere de la guardrail.
3. Payload-ul (posibil rescris) trece în rutarea combo și în distribuirea
   către upstream.
4. **Doar non-streaming:** după ce răspunsul este asamblat,
   `guardrailRegistry.runPostCallHooks(...)` execută același lanț pe răspuns.
   `block: true` aici elimină răspunsul upstream și returnează HTTP 400.
   Răspunsurile în flux (streamed) sar complet peste acest pas.

Guardrail-urile care aruncă excepții sunt înregistrate cu `error: <message>`
și jurnalizate prin `logger.warn`, dar lanțul continuă — fail-open prin
design.

## Acoperire și limite

Registrul de guardrail-uri este conectat doar la pipeline-ul de chat. Aceste
limite sunt fixate de `tests/unit/guardrail-pipeline-wiring-characterization.test.ts`
și `tests/unit/guardrail-pipeline-characterization.test.ts`; actualizați acele
teste în mod deliberat atunci când comportamentul se schimbă.

### Unde se execută hook-urile

| Hook / control                         | Se execută pe                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                      | Cererile gestionate de `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (și `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` și proxy-ul de chat Telegram. De asemenea, endpoint-ul de test din dashboard `/api/guardrails/test`. Un bloc pre-call returnează HTTP 400. |
| `runPostCallHooks`                     | Doar răspunsurile de chat **non-streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Răspunsurile în flux nu ajung niciodată la el.                                                                                                                                                                                                                                                                                               |
| PII în streaming                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), conectat în `streamingPipeline.ts` atunci când `PII_RESPONSE_SANITIZATION` este activat. Nu este un guardrail, deci canalele de dezactivare nu îl afectează.                                                                                                                                                                                                                       |
| Middleware-ul injection-guard (legacy) | Fiecare rută `/v1` care poartă prompturi, inclusiv familia chat (vezi [acoperirea rutelor](#injection-guard-route-coverage--red-team-phase-8--block-d)). Doar prompt injection.                                                                                                                                                                                                                                                                  |

### Ce nu este acoperit

- **Rutele media, embeddings și de date** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nu ajung niciodată la
  registru. Acolo nu se execută nicio mascare PII, mascare de credențiale sau
  modality bridge. Singura lor verificare este middleware-ul legacy
  injection-guard.
- **Răspunsurile în flux** nu primesc guardrail-uri post-call: niciun
  `pii-masker` sau `credential-masker` post-call și niciun bloc post-call.
  Doar transformarea PII în streaming se aplică (când
  `PII_RESPONSE_SANITIZATION` este activat). O credențială returnată într-un
  răspuns în flux nu este redactată.
- **Canalele de dezactivare vs. middleware (prin design):** middleware-ul
  evaluează prompt injection cu propriul său apel la
  `evaluatePromptInjection()`, fără a transmite vreo listă de dezactivare
  controlată de apelant. Modul `block` este o limită obligatorie pe care
  dezactivările controlate de apelant nu o pot ocoli, inclusiv pe rutele din
  familia chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  Dezactivarea `prompt-injection` doar sare peste guardrail-ul din registru.

### Ce vede un răspuns înainte de post-call

Pe calea non-streaming ordinea este: extragerea memoriei → execuția uneltelor
încorporate → guardrail-urile post-call → ieșirea prin bloc post-call →
stocarea în cache-ul semantic.

- **Extracția memoriei** și **execuția instrumentelor** văd răspunsul înainte ca
  gardienii post-apel să îl poată rescrie sau bloca. Începând cu
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), extracția
  memoriei trece textul extras prin `sanitizePII` atunci când
  `PII_RESPONSE_SANITIZATION` este activat (atât în streaming, cât și fără
  streaming), dar un răspuns pe care post-apelul îl blochează ulterior a fost
  deja oferit memoriei și instrumentelor.
- **Cache-ul semantic** stochează răspunsul după post-apel, deci stochează
  răspunsul rescris, iar un răspuns blocat nu este niciodată pus în cache.
  Intrările din cache sunt indexate după cheia API.

## Configurare

Variabilele de mediu citite de protecțiile încorporate:

| Variabilă                             | Utilizată de           | Efect                                                                                                                                  |
| ------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`     | Setați `false` pentru a dezactiva complet detectarea.                                                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`     | Politica de injecție: `warn`, `block` sau `log`. Valoarea legacy `redact` nu rescrie textul de injecție.                               |
| `INJECTION_GUARD_MODE`                | `prompt-injection`     | Modul pentru protecția de injecție; de asemenea, un feature flag din baza de date care **suprascrie** variabilele de mediu (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`     | Severitatea minimă pe care `MODE=block` o respinge: `high` (implicit), `medium` sau `low`.                                             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`     | Alias legacy pentru `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`           | Când este `true`, PII-ul din cerere este redactat (independent de modul de injecție).                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (în aval) | Controlează comportamentul masker-ului pe partea de răspuns.                                                                           |

Protecțiile Modality Bridge citesc configurația de rulare din depozitul de
setări susținut de baza de date (`getSettings()`), nu din variabilele de mediu.
Cheile principale ale Vision sunt
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` și
`modalityBridgeCacheMaxEntries`. Cheile legacy
`visionBridge*` sunt acceptate doar ca fallback de citire pe un singur ciclu,
conform documentației; scrierile din panoul de control folosesc cheile
principale. Valorile implicite și rezolvitorul de fallback se află în
`src/shared/constants/modalityBridgeDefaults.ts`, cu constantele legacy
păstrate în `src/shared/constants/visionBridgeDefaults.ts`.

Audio folosește `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` și `modalityBridgeAudioMaxClips`, plus setările
partajate `modalityBridgeCache*`. Audio nu are fallback pentru chei legacy,
deoarece aceste chei au fost introduse odată cu schema Modality Bridge.

Video folosește `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` și
`modalityBridgeVideoTimeout`, plus setările partajate `modalityBridgeCache*`.
Este dezactivat implicit deoarece FFmpeg/ffprobe sunt dependențe operaționale
opționale, iar descrierea cadrelor adaugă latență și cost de model.

## Guardrail-uri personalizate

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

Pași:

1. Creează `src/lib/guardrails/myGuardrail.ts` extinzând `BaseGuardrail`.
2. Implementează `preCall` și/sau `postCall`.
3. Fie înregistrează la momentul importului (push din `registerDefaultGuardrails`), fie
   apelează `guardrailRegistry.register(...)` la runtime — registrul înlocuiește
   orice guardrail anterior cu același nume normalizat.
4. Adaugă teste în `tests/unit/` (exemple existente:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testare

Folosește `resetGuardrailsForTests()` între teste pentru a porni de la o stare cunoscută.
Transmite `{ registerDefaults: false }` pentru a porni cu un registru gol și a
înregistra doar guardrail-urile testate. Vision Bridge acceptă injecția de
dependențe (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge expune
punctele de extensie echivalente pentru setări, capabilități, selecția modelului STT,
verificarea acreditărilor și transcriere. Astfel, testele pot exercita ambele fluxuri
fără acces la baza de date sau la rețea.

## Vezi și

- `src/lib/guardrails/` — implementare
- `src/shared/utils/inputSanitizer.ts` — detectorul partajat care alimentează
  detectarea prompt-injection și mascarea PII
- `src/shared/constants/visionBridgeDefaults.ts` — valorile implicite Vision Bridge și
  lista de modele cu bridge forțat
- `src/shared/constants/modalityBridgeDefaults.ts` — valorile implicite partajate la runtime pentru Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — strat ortogonal (circuit breaker, cooldown-uri)
- `docs/reference/ENVIRONMENT.md` — referința completă a variabilelor de mediu

## Acoperirea rutelor de către injection-guard și red-team (Faza 8 · Blocul D)

Injection-guard-ul (`createInjectionGuard` / `withInjectionGuard`) acoperă toate rutele
care acceptă prompturi de la utilizatori. Respectă `INJECTION_GUARD_MODE` (implicit `warn` = doar jurnalizare;
`block` = returnează HTTP 400 `SECURITY_001`).

| Tip             | Rute                                                                                                                                                 | Mod implicit |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Text (existent) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generativ       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Date            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Extracția textului (`extractMessageContents`) acoperă `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nocturn, `nightly-llm-security.yml`):** promptfoo validează faptul că fiecare rută blochează
corpusul OWASP-LLM în `INJECTION_GUARD_MODE=block`; garak rulează sonde (le omite în lipsa secretului).
`moderations` este inclus pentru consecvență. Modul block este o limită obligatorie: `evaluatePromptInjection()`
ignoră lista de dezactivare per cerere pe care i-o transmite middleware-ul, astfel că `disabledGuardrails`
**nu** scutește o rută de aceasta ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Fluxul de lucru nocturn (`.github/workflows/nightly-llm-security.yml`, cron + declanșare
manuală) are două joburi:

- **`promptfoo-guard` (blocant)** — rulează `promptfoo eval -c promptfooconfig.yaml`
  cu `INJECTION_GUARD_MODE=block`. Fiecare caz adversarial (de ex. „ignoră toate
  instrucțiunile anterioare…", jailbreak-uri de tip DAN) verifică că răspunsul poartă
  `error.code === "SECURITY_001"`, adică că guard-ul a respins efectiv cererea.
- **`garak` (consultativ)** — rulează garak `--probes promptinject,dan,leakreplay`
  împotriva unei instanțe locale OmniRoute (`http://localhost:20128/v1`). Este condiționat de
  un secret al furnizorului (`PROMPTFOO_PROVIDER_KEY`); este omis grațios și este sufixat cu
  `|| true`, astfel că raportează fără a cauza eșecul CI-ului.

Acoperirea helper-ului de guard (`createInjectionGuard` / `withInjectionGuard`)
se întinde pe fiecare rută `/v1` care poartă prompturi; textul promptului este extras din
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` de către
`extractMessageContents()` din `src/shared/utils/inputSanitizer.ts`.
