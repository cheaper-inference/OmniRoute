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

## Mecanisme de protecție integrate

Registry-ul încarcă automat șase mecanisme de protecție în ordinea priorității la import
(consultați `registry.ts` → `registerDefaultGuardrails()`):

| Priority | Name                | Stage(s)       | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numerele de prioritate mai mici rulează **primele**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Modelul de bază GLM 5.3 și `glm-5.3-{low,high,max}` au metadate explicite
`supportsVision:false` în registry/spec. Variantele GLM 5.3 Flash rămân modele
native cu suport pentru viziune. Ruta `/v1/messages` din Claude Code intră în lanțul
comun de mecanisme de protecție `handleChat` pentru apeluri preliminare **înainte** de traducerea Claude-în-OpenAI; imaginile din rezultatele instrumentului `Read` imbricate trebuie descrise sau procesate înainte ca traducerea respectivă să le transforme în conținut OpenAI `image_url` (#17069).

Interceptează cererile care conțin imagini și sunt adresate **modelelor fără suport pentru viziune** și fie redirecționează întreaga cerere către un model compatibil cu viziunea, fie înlocuiește părțile cu imagini cu descrieri text produse de un model de viziune configurabil, înainte de apelul upstream. Astfel, furnizorii care acceptă doar text pot gestiona transparent payload-uri multimodale.

Flux:

1. Omite procesarea dacă modelul țintă acceptă deja viziunea (cu excepția cazului în care apare în lista forțată pentru puntea de viziune `isVisionBridgeForcedModel`).
2. Extrage părțile cu imagini prin `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), care delegă detectarea unificată a mediilor
   `detectMediaParts()` din `open-sse/utils/mediaParts.ts` — sursa unică de adevăr
   partajată cu filtrul de compatibilitate combo.
   Extragerea este permisă numai pentru formele pe care `replaceImageParts` le poate reinsera
   (contractul extragere↔înlocuire): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, URL Anthropic `source.type:"url"` și Responses
   API `input_image`. Imaginile corespunzătoare imbricate în
   `tool_result.content` din Claude Code și în rezultatele instrumentelor Responses sunt, de asemenea, extrase și înlocuite la căile lor originale; formele care conțin doar indicatori sunt material pentru filtrul combo și nu sunt extrase.
   Omite procesarea dacă nu este găsită nicio imagine.
3. Rezolvă configurația de rulare prin `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): noile chei de configurare
   `modalityBridge*` au prioritate; cheile moștenite `visionBridge*` rămân un
   **fallback pentru un singur ciclu** (fereastră de rollback). Omite procesarea înainte de orice parcurgere a mediilor dacă puntea este dezactivată.
4. Selectorul de mod (`modalityBridgeVisionMode`, consultați tabelul de mai jos) decide între redirecționare și descriere. Redirecționarea returnează `modifiedPayload` cu doar
   `model` înlocuit, împreună cu metadatele `{ rerouted, fromModel, toModel, imagesKept }`.
5. Calea de descriere: limitează imaginile la `maxImages`, compune promptul adaptat sarcinii,
   consultă memoria cache pentru descrieri, apelează modelul de viziune **în paralel**
   (`Promise.allSettled`) și inserează în locul lor părți text `[Image N]: <description>`.
   O descriere eșuată produce `null`: imaginea brută este păstrată pentru ținte necunoscute/cu suport pentru viziune (#4012), însă pentru o **țintă directă confirmată ca acceptând doar text** sau pentru un combo fără suport pentru viziune se introduce un substituent text explicit
   `(unavailable — no vision-capable provider connected)` pentru fiecare imagine fără descriere, inclusiv în cazul eșecurilor parțiale și al imaginilor care depășesc limita apelurilor de descriere (#17069). Fallback-ul existent pentru descrierea combo în cazul în care toate apelurile eșuează rămâne activ (#8430).
6. Returnează `modifiedPayload` + metadate (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selectorul de mod (`modalityBridgeVisionMode`)

| Mode       | Default | Behavior                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Euristică moștenită, neschimbată (#6640/#7204): modelele non-combo/`auto/` sunt redirecționate către cel mai bun model de viziune, cu excepția cazului în care modelul original are deja credențiale utilizabile (atunci se folosește descrierea); țintele combo folosesc întotdeauna descrierea.                                                              |
| `describe` |         | Descrie întotdeauna — blocul de redirecționare este omis complet; modelul ales de utilizator oferă întotdeauna răspunsul.                                                                                                                                                                                                                                      |
| `reroute`  |         | Forțează redirecționarea: protecția modelului cu credențiale păstrate este ignorată. Protecția credențialelor **țintei** de redirecționare se aplică în continuare — atunci când nu există nicio țintă de viziune utilizabilă, puntea blochează cererea cu o eroare clară în loc să descrie sau să trimită imagini brute către o țintă care acceptă doar text. |

Modurile forțate întrerup procesarea înainte de rularea euristicii `auto`;
comportamentul `auto` este identic la nivel de octeți cu mecanismul de protecție de dinaintea PR-1.

#### Domeniul cheii API (`visionBridgeKeyScope.ts`)

Când cheia API a apelantului restricționează `allowedConnections`, grupurile de cote
(`allowedQuotas`) sau modelele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), puntea alege pentru
rerutare și descriere doar modelele pe care cheia le poate utiliza, pe conexiunile
pe care cheia le poate utiliza. Apelul de descriere trece apoi întotdeauna prin
bucla proprie OmniRoute cu antetul `x-omniroute-self-loop-key-id`, astfel încât
cererea de chat recepționată aplică din nou politica de conexiuni și modele a
cheii respective. `enforceApiKeyPolicy()` respectă acel antet numai împreună cu
bearer-ul buclei proprii, astfel încât poate doar restrânge accesul, iar un ID
care nu poate fi rezolvat este respins.

Dacă niciun model de viziune nu este permis pentru cheie, o **țintă confirmată
doar text** respinge local cererea de imagine cu un HTTP 400 clar, în loc să
redirecționeze octeții imaginii către un upstream incapabil (#17069). Pentru
țintele cu o capacitate de viziune necunoscută sau nativă, calea de descriere își
păstrează comportamentul anterior de tip fail-open (meta
`{ skipped: true, reason: "no_permitted_vision_model" }`).
Cererile fără cheie și cheile fără aceste restricții se comportă exact ca înainte.

#### Prompt de descriere adaptat sarcinii (`modalityBridgeVisionTaskAware`)

Valoare implicită **`true`**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
adaugă textul **ultimul mesaj al utilizatorului** (trunchiat la 500 de caractere)
la promptul de bază pentru descriere, orientând descrierea către ceea ce a cerut
efectiv utilizatorul (modelul codex-vision-proxy) și solicitând modelului de
viziune să transcrie textul vizibil. Când opțiunea este dezactivată — sau nu
există text de la utilizator — este utilizat promptul de bază, neschimbat.

Cererea proprie compatibilă cu OpenAI a buclei de descriere
(`callVisionModelSingle()` din `visionBridgeHelpers.ts`) solicită întotdeauna
`image_url.detail: "high"` — necondiționat, pentru fiecare apelant/furnizor,
fără a depinde de vreun semnal al clientului. Eșantionarea cu nivel scăzut de
detalii reduce acuratețea OCR tocmai pentru sarcina de transcriere a textului pe
care o solicită acest prompt, astfel încât apelul de descriere solicită
întotdeauna un nivel ridicat de detalii, indiferent de nivelul de detalii utilizat
în cererea inițială primită. Acest lucru afectează doar corpul cererii interne de
descriere; nu modifică modul în care OmniRoute redirecționează propriul
`image_url.detail` al apelantului în cererea principală — valoarea implicită este
aplicată separat și numai pentru clienții OpenCode detectați, în
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Ramura
formatului de date Anthropic a buclei de descriere nu are câmpul `detail` și nu
este afectată de niciuna dintre valorile implicite.

#### Limită pentru rezultatul descrierii (`modalityBridgeVisionMaxChars`)

| Cheie                          | Valoare implicită | Interval          |
| ------------------------------ | ----------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`               | `0` sau 100–50000 |

`0` (valoarea implicită) înseamnă **fără limită** — descrierea returnată de
`callVisionModel()` este transmisă nemodificată, păstrând comportamentul existent.
Orice valoare din intervalul 100–50000 trunchiază descrierea cu un sufix `…`
înainte de a fi inserată din nou ca `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` în `src/lib/guardrails/visionBridge.ts`).
Măriți această valoare pentru sarcini OCR cu multe detalii, în care modelul din
aval are nevoie de transcrierea completă; micșorați-o pentru a limita consumul de
tokeni în cazul modelelor de viziune verbose.
Câmpul din tabloul de bord se află în panoul Advanced al filei Vision
(`modality-bridge-max-chars` în `ModalityBridgeVisionTab.tsx`) și limitează orice
valoare între 1 și 99 la limita minimă de 100, lăsând nealterat un `0` explicit —
`0` este o valoare Zod validă de sine stătătoare
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nu doar
valoarea implicită „nesetată”.

#### Cache pentru descrieri (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL în memorie pentru rezultatele descrierilor, partajat la nivelul
întregului proces.
Cheia = `sha256(imageRef + composedPrompt + configuredBridgeModel)` cu delimitare
bazată pe prefixul lungimii (fără coliziuni la granițele câmpurilor). Componenta
modelului este modelul de punte **configurat**, nu modelul care a furnizat efectiv
răspunsul — `callVisionModel` poate utiliza intern un model de rezervă, iar
generarea cheii pentru fiecare încercare ar fragmenta cache-ul. Descrierile eșuate
nu sunt niciodată memorate în cache. Setări:

| Cheie                           | Valoare implicită | Interval |
| ------------------------------- | ----------------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`            | —        |
| `modalityBridgeCacheTtlMinutes` | `60`              | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`             | 10–5000  |

#### Normalizarea imaginilor la distanță (preluare self-loop descriere/base64)

Când puntea preia singură o imagine **la distanță** — apelul propriu Anthropic
pentru descriere și conversia în base64 pentru formatul de date claude
(`ensureBase64ImagesForClaudeWire`), ambele prin
`fetchRemoteImageAsDataUri()` din `visionBridgeHelpers.ts` — URI-ul de date
rezultat este trecut prin `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) înainte de a fi încorporat în cererea
modelului de viziune. Imaginile prea mari sunt redimensionate la o **latură
lungă de 2048px** (corespunzător limitei de redimensionare pe care OpenAI/Anthropic
o aplică deja pe server), ceea ce reduce numărul de octeți încărcați și latența,
fără a schimba ceea ce vede modelul de viziune. Redimensionarea utilizează
`sharp`, încărcat prin import dinamic: pe o platformă pe care binarul său nativ
nu se poate încărca, `normalizeDataUri()` **nu generează niciodată o excepție** —
revine la transmiterea directă a octeților originali, astfel încât calea de
descriere/conversie base64 continuă întotdeauna să funcționeze. Octeții care nu
sunt imagini (o preluare care nu a returnat o imagine decodificabilă) sunt, de
asemenea, transmiși nemodificați. Această normalizare se aplică doar imaginilor
pe care puntea le preia pentru propriul apel intern — nu este aplicată niciodată
încărcăturii brute transmise direct de apelant, în conformitate cu principiul
modificării exclusive la cerere explicită (Hard Rule #20).

#### Schema setărilor + migrare

Noile chei `modalityBridge*` sunt validate de Zod în `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, grupul de trei chei `modalityBridgeCache*` și
grupul `modalityBridgeAudio*` utilizat de Audio Bridge. Migrarea
`141_modality_bridge_settings.sql` copiază valorile legacy `visionBridge*` în
cheile noi corespunzătoare (idempotent, nu suprascrie niciodată o valoare
`modalityBridge*` setată de operator); cheile legacy rămân acceptate ca
fallback la citire pentru un ciclu de lansare.

#### Antet de transparență + statistici

Răspunsurile transformate pentru descriere includ
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(generat de `buildModalityBridgeHeader()` în `modalityBridge/bridgeStats.ts`,
adăugat de `withModalityBridgeHeader()` în `src/sse/handlers/chatHelpers.ts`).
Solicitările redirecționate nu primesc niciun antet — payloadul nu a fost
modificat, iar schimbarea modelului este deja vizibilă în câmpul `model` al
corpului răspunsului.

`GET /api/modality-bridge/stats` (autentificare de management, același nivel ca
`GET /api/settings`) returnează contoarele în memorie pentru fiecare modalitate
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pentru `vision`, `audio` și
`video`. `averageLatencyMs` utilizează `latencySamples`, nu toate încercările,
ca numitor; o operațiune fără măsurarea duratei nu inventează un eșantion de
zero milisecunde. `bridged` rămâne aliasul compatibil retroactiv pentru
conversiile reușite; încercările eșuate nu îl incrementează.
Contoarele sunt resetate la repornirea procesului, conform proiectării
(telemetrie, nu contabilitate).

#### Configurarea tabloului de bord

Pagina dedicată a tabloului de bord este
`/dashboard/settings/modality-bridge`. Filele `Vision`, `Audio` și `Video`,
accesibile prin URL, păstrează parametrii de interogare la schimbarea valorii
`tab`. Fila Vision expune activarea, modul, selectarea modelului (inclusiv
valoarea implicită automată), solicitarea conștientă de sarcină, limitele
avansate pentru timeout/imagini/lungimea descrierii/cache, contoarele de rulare
și o solicitare de eșantion protejată. Fila Audio este, de asemenea, activă:
expune activarea, un selector de modele exclusiv STT cu opțiunea Auto, limitele
pentru timeout/durata maximă a clipului, contoarele audio și un test de eșantion
`input_audio`. Fila Video este funcțională: raportează starea de rulare
FFmpeg/ffprobe — una dintre cele patru stări explicite ale interfeței (`unknown`
cât timp verificarea este în curs sau nu a putut fi finalizată, `restricted` pe
un gazdă a tabloului de bord care nu este loopback, unde verificarea este omisă
de client, `unavailable` după ce s-a verificat și s-a confirmat lipsa sau
`available` împreună cu versiunile FFmpeg/ffprobe) — persistă limitele pentru
activare/model/cadru/video/timeout, filtrează selectorul de modele pentru a
include doar modelele compatibile cu viziunea și expune contoarele video.

Fosta casetă Vision Bridge din setările AI este un link de compatibilitate către
noua pagină; nu mai deține o a doua copie a formularului. Media Providers
include, de asemenea, linkuri pentru fluxurile Image-to-Text și
Speech-to-Text către filele corespunzătoare Modality Bridge, fără a elimina
spațiul de testare Speech-to-Text existent.

**Ocolirea verificării pentru bucla proprie:** atunci când apelul de descriere
trece prin bucla proprie `/v1` a OmniRoute (model de furnizor non-standard),
subsolicitarea trimite `x-omniroute-admission-bypass: internal` și este
autentificată cu acreditarea rezolvată pentru bucla proprie — sentinelul local
`sk_omniroute` în modul local sau cheia de mediu `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` configurată de operator (#1350), astfel încât implementările
cu `REQUIRE_API_KEY=true` să poată executa în continuare apelul de descriere.
Ocolirea este onorată numai pentru acreditările exacte respective, astfel încât
clienții externi nu pot utiliza antetul pentru a omite verificarea.

Valorile implicite legacy se află în
`src/shared/constants/visionBridgeDefaults.ts`; noile valori implicite pentru
mod, solicitări conștiente de sarcină și cache, precum și resolverul setărilor,
se află în `src/shared/constants/modalityBridgeDefaults.ts`. Mecanismul de
protecție expune o opțiune de constructor `deps`, astfel încât testele să poată
injecta implementări fictive pentru `getSettings` și `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Interceptează solicitările de chat care conțin audio înainte ca acestea să
ajungă la o țintă despre care nu se știe că acceptă intrare audio. Nu
redirecționează niciodată solicitarea de chat: componentele audio sunt
transcrise prin endpointul multipart compatibil cu OpenAI existent, iar
modelul de chat ales continuă cu transcrierile text.

Flux:

1. Rezolvă `supportsAudio` prin `getResolvedModelCapabilities()`. Metadatele explicite din registrul furnizorilor au prioritate, urmate de metadatele statice ale modelului, apoi de `modalities_input` sincronizat. O listă de intrări declarată fără `audio` înseamnă `false`; în absența dovezilor privind capabilitatea, valoarea rămâne `null`. Atât `false`, cât și `null` activează puntea conservatoare, în timp ce `true` o ocolește.
2. Rezolvă setările `modalityBridgeAudio*` și extrage părțile audio de nivel superior care pot fi înlocuite din fiecare mesaj, prin detectorul partajat `detectMediaParts()`. Formele wire acceptate sunt `input_audio`, `audio_url` și `source.media_type: "audio/*"` din OpenAI. Audio-ul imbricat este detectat pentru rutare, dar nu este eliminat de calea de înlocuire. Volumul de lucru este limitat de `modalityBridgeAudioMaxClips`; părțile ulterioare rămân neatinse.
3. Respectă un `provider/model` configurat sau permite ca `selectAudioBridgeModel()` să parcurgă `AUDIO_TRANSCRIPTION_PROVIDERS` în ordinea stabilă a catalogului și să selecteze primul model cu acreditări active și utilizabile ale furnizorului.
4. `callAudioTranscription()` convertește datele audio codificate în base64/data-URI într-un `file` multipart sau descarcă un `audio_url` de la distanță prin mecanismul de protecție outbound disponibil doar pentru destinații publice, cu fixarea DNS și o limită de 25 MB. Apoi face POST pentru fișier și modelul selectat către self-loop-ul local `/v1/audio/transcriptions`, autentificat cu `resolveSelfLoopBearer()`. Ruta de transcriere existentă efectuează căutarea normală a acreditărilor, gestionarea perioadelor de cooldown/limitare a ratei și distribuirea către furnizor.
5. Apelurile reușite își înlocuiesc părțile cu `[Audio N]: <transcript>`. Apelurile rulează cu `Promise.allSettled`: un eșec individual păstrează partea audio originală (#4012 contract). Dacă toate apelurile eșuează și se dovedește că ținta are `supportsAudio === false`, părțile devin
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Pentru o țintă necunoscută (`null`), un rezultat în care toate apelurile eșuează rămâne neschimbat. O țintă demonstrat limitată la text, fără acreditări STT utilizabile, primește același substituent explicit fără emiterea unui apel de rețea.

Transcrierile reușite folosesc memoria cache LRU/TTL a Modality Bridge, disponibilă la nivelul întregului proces. Cheia combină referința audio, eticheta stabilă a operației
`audio-transcription` și modelul STT selectat; eșecurile nu sunt niciodată memorate în cache. Încercările audio actualizează contoarele partajate `bridged`, `cacheHits`, `failures` și `lastUsedAt`.
Răspunsurile transformate includ
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; solicitările neatinse nu primesc un segment Audio Bridge.

Setările de rulare sunt stocate în DB și validate cu Zod:

| Cheie                         | Implicit | Interval        |
| ----------------------------- | -------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —               |
| `modalityBridgeAudioModel`    | `""`     | Auto sau ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10            |

Memoria cache partajată rămâne controlată de
`modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` și `modalityBridgeCacheMaxEntries`.

### Punte video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceptează părțile video de nivel superior din `messages` ale Chat Completions și din `input` al Responses API, înainte de apelarea unei ținte fără suport video nativ cunoscut.
Formele acceptate sunt `input_video`, `video_url`, `video_source`, URL-uri HTTPS și URI-uri de date `data:video/*;base64,...`. Numele simple de fișiere din text nu sunt tratate ca materiale video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gestionează parcurgerea cererii, verificarea capabilității/politicii, agregarea per cerere și payload-ul răspunsului.
Procesarea per videoclip — achiziția, memoria cache pentru întregul rezultat, descrierea unei secvențe de cadre (care combină orice transcriere audio declarată de apelant) și valorile per încercare pentru metrici/anulare/curățare — este ascunsă în `processVideoPart` din `videoBridgePipeline.ts`, apelat o dată pentru fiecare parte video în bucla lui `preCall`.
Acest modul definește și limitele explicite ale porturilor `VideoMediaBrokerPort` (achiziționarea octeților și extragerea cadrelor eșantionate), `VideoAudioTranscriptionPort` (combinarea unei transcrieri audio declarate de apelant cu subtitrările eșantionate) și `VideoDrilldownPort` (forma moștenită a stocării brute). STT-ul din producție și păstrarea cadrelor sunt compuse în jurul portului de descriere prin `createVideoSttAdapter` și `createVideoDrilldownAdapter`; acesta din urmă folosește ciclul de viață partajat al identificatorilor opaci.

Calea publică a cererilor `/v1` nu importă și nu invocă niciodată un subprocess. Videoclipurile de la distanță sunt descărcate cu o limită de 50 MiB; videoclipurile base64 inline au o limită conservatoare de 36 MiB decodați pentru fiecare videoclip, astfel încât anvelopa modelului/mesajelor/încadrării să rămână în limita de admitere a cererilor JSON publice de 50 MiB. Estimările privind lungimea inline și dimensiunea decodată sunt verificate înainte de alocare. HTTPS este obligatoriu pentru URL-ul inițial de la distanță și pentru fiecare redirecționare, folosind mecanismul existent de protecție outbound disponibil doar pentru destinații publice, cu fixarea DNS. Octeții trec apoi prin limita internă exactă a brokerului `POST /api/modality-bridge/video/extract`. Ruta respectivă este atât `LOCAL_ONLY`, cât și `SPAWN_CAPABLE`, acceptă doar o cerere autentificată per proces, provenită dintr-un loopback de încredere, și nu acceptă niciodată un URL, o cale de sistem de fișiere, un executabil sau o listă de argumente. Conducta pentru dimensiunea corpului API și cititorul incremental al corpului din handler impun independent o limită de 50 MiB pentru intrarea brokerului. Coada sa limitată rulează câte o extragere pe rând, permite patru lucrări în așteptare și limitează intrarea în așteptare la 100 MiB.

În broker, `ffprobe` citește un fișier local privat; lista fixă de formate permise exclude formatele de playlist și manifest. Pentru containerele din familia MOV permise, referințele externe la date MOV rămân dezactivate în mod implicit, iar comanda fixă nu le activează. Atât `ffprobe`, cât și `ffmpeg` folosesc lista albă de protocoale limitată la `file`, un singur fir de execuție, tablouri fixe de argumente, fără shell, iar executabilele sunt rezolvate din `PATH`. Fluxurile de copertă cu imagine atașată nu sunt candidați redabili. Toate fluxurile redabile trebuie să respecte limitele, iar un flux implicit explicit are prioritate înaintea variantei deterministe de rezervă cu cel mai mic index. Videoclipurile sunt limitate la 600 de secunde, 8.192 de pixeli pe dimensiune și 33.554.432 de pixeli sursă. FFmpeg eșantionează între 1 și 16 cadre JPEG la mijlocul intervalelor, redimensionează latura lungă la cel mult 1.024 de pixeli fără a mări intrările mai mici și nu primește niciodată un URL. Eșantionarea este `uniform` în mod implicit. Politicile opționale `scene_aware` și experimentale `segment_aware` efectuează o trecere suplimentară fixă FFmpeg peste fluxul local deja validat, selectează marcaje temporale de scene limitate din `showinfo` și revin determinist la aceleași puncte mediene uniforme în cazul unei erori a detectorului, al expirării timpului, al unei ieșiri malformate sau al unui set gol de candidați. Modul segment-aware alocă eșantioane mediane proporțional cu intervalele de scene validate; dovezile și comportamentul de rezervă pentru segment-aware sunt detaliate mai jos. Limita strictă de 16 cadre se aplică după selecție în fiecare politică. Atunci când o solicitare scene-aware are un buget de un singur cadru, aceasta folosește punctul median uniform al ferestrei active pentru întregul videoclip sau pentru zona focalizată și raportează `policyEffective: uniform`: un singur cadru de scenă selectat nu poate păstra ambele capete temporale. Un apelant poate furniza opțional o fereastră de focalizare finită (secunde `start`/`end`); limitele sunt restrânse la durata materialului, ferestrele inversate sau nefinite sunt respinse, iar toate politicile de eșantionare sunt aplicate numai în interiorul intervalului normalizat. Fereastra rezultată este inclusă în metadatele de eșantionare și în prefixul descrierii neîncrezătoare, astfel încât modelele din aval să poată distinge un fragment focalizat de întreaga cronologie.

Focalizarea semantică a descrierii este o setare separată și explicită. Modul implicit de analiză `full` păstrează promptul existent pentru cadre și nu transmite niciodată textul solicitării modelului de descriere. În modul `focused`, puntea citește doar cel mai recent `text`/`input_text` nevid, scris de utilizator, din același container Chat sau Responses, îl normalizează la NFC, compactează caracterele de control și spațiile albe și îl limitează la 500 de puncte de cod Unicode. Un rezultat gol revine la promptul `full` exact. Un indiciu utilizabil este serializat ca JSON într-un bloc dedicat de context al utilizatorului neîncrezător și poate doar să acorde prioritate detaliilor observabile; nu poate anula avertismentul separat împotriva urmăririi instrucțiunilor vizibile sau audibile în material. Focalizarea textuală nu deduce `start`/`end` și nu modifică eșantionarea temporală.

#### Dovezi structurale ale segmentelor FU-07

`segment_aware` utilizează o singură trecere de preanaliză limitată peste fluxul video local deja validat. Lanțul fix de filtre redimensionează mai întâi la cel mult 320 de pixeli lățime, detectează schimbările de scene și intervalele înghețate, apoi eșantionează cu 1 cadru pe secundă pentru neclaritate, luminanță medie și informație spațială/temporală. Trecerea este limitată la 600 de eșantioane structurale, un singur fir FFmpeg/de filtrare, aceleași liste albe pentru protocolul limitat la `file` și pentru containere, o limită de 1 MiB pentru ieșirea procesului și cel mult 30 de secunde din limita comună de anulare/termen a brokerului. Nu acceptă niciodată din solicitare o comandă, un filtru, o cale sau un URL.

Valorile structurale sunt dovezi ale eșantionării deterministe, nu înțelegere semantică a videoclipului. Acestea nu deduc subiecte, acțiuni, subtitrări, vorbire sau intenția utilizatorului. Limitele scenelor și ale înghețării formează segmente; acoperirea înghețată, neclaritatea, expunerea, detaliile spațiale și schimbarea temporală influențează doar modul în care este alocat bugetul existent de 1–16 cadre. Un segment complet înghețat este limitat la un singur cadru, în timp ce segmentele neînghețate concurează pentru bugetul rămas. Când numărul limitelor depășește numărul cadrelor, se păstrează acoperirea uniformă a cronologiei, astfel încât tăieturile rapide de la început să nu poată ascunde un segment lung de la final. Limitele scenelor aflate în rezoluția de analiză de 1 secundă față de o limită de înghețare sunt reunite.

Filtrele lipsă, dovezile malformate/goale, o eroare a detectorului sau expirarea timpului pentru preanaliza limitată revin la politica exactă a punctelor mediene uniforme. Anularea de către apelant sau termenul-limită al brokerului nu revine la varianta de rezervă: aceasta termină subprocesul aflat în execuție, împiedică extragerea ulterioară a cadrelor, iar arborele temporar privat este eliminat în `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generează fixture-uri FFmpeg reale și deterministe pentru economiile apelurilor de descriere după eliminarea duplicatelor, alocarea bugetului pentru mișcare densă, dovezi de neclaritate/expunere/SI-TI, tăieturi rapide cu o porțiune finală lungă și rezultate fals pozitive la estompări graduale. Înregistrează timpul de execuție al preanalizei și, atunci când `/usr/bin/time` este disponibil, timpul CPU al procesului copil și RSS-ul maxim. Verificările sale de calitate sunt exclusiv oracole structurale. Calitatea reală a modelului de descriere rămâne `HOLD`, deoarece acest instrument de testare nu are niciun endpoint autorizat sau evaluator înghețat. Economiile monetare rămân, de asemenea, `HOLD`, cu excepția cazului în care `--caption-cost-per-call-usd` furnizează o estimare explicită pozitivă a costului per apel; scriptul nu inventează niciunul dintre rezultate.

Fiecare cadru este limitat la 4 MiB, toate cadrele brute împreună la 23 MiB, iar răspunsul serializat al brokerului la 32 MiB. Un director temporar privat este eliminat în `finally`. OmniRoute nu include FFmpeg și nu acceptă o cale personalizată către executabil. Înainte de generarea descrierilor, puntea aplică o etapă conservatoare de deduplicare vizuală: fiecare JPEG este redus la un buffer de tonuri de gri de 16×16 și este comparat doar cu ultimul cadru păstrat. Pentru un buget de descrieri solicitat mai mare decât un cadru, extragerea furnizează un grup de candidați limitat la cel mult de două ori bugetul respectiv și niciodată la mai mult de 16 cadre. Limita solicitată este aplicată numai după deduplicare, iar primul și ultimul candidat selectat sunt păstrate în timpul subțierii finale atunci când bugetul este de cel puțin două cadre. Politica versionată
`grayscale-16x16-mean-cells-v2` utilizează valoarea mai mare dintre diferența medie de luminanță și raportul celulelor miniaturii a căror diferență normalizată este de cel puțin 0.05. Pragul pentru duplicate este constanta 0.04, aleasă pentru predictibilitate, nu expusă ca setare de rulare. Acest semnal secundar de contrast ridicat păstrează mișcările mici și modificările textului vizibil pe care o comparație bazată doar pe medie le poate ascunde. Erorile comparatorului sau decodorului permit continuarea procesării și păstrează acoperirea. Metadatele rezultatului separă candidații extrași, cadrele utilizate cu succes și duplicatele vizuale eliminate.

O parte video marcată explicit poate solicita o planșă de contact cu marcaje temporale. Puntea construiește o grilă JPEG de cel mult 4 coloane și 16 cadre. Fiecare celulă de 512 pixeli inserează marcajul temporal al sursei într-o bandă inferioară cu contrast ridicat, în timp ce aceleași marcaje temporale rămân în metadatele textuale pentru asocierea și auditarea ulterioare. JPEG-ul complet rămâne limitat la 32 MiB. Dacă `sharp` nu poate decoda sau compune grila, puntea revine la cadrele JPEG individuale; întreruperea de către client se propagă în continuare prin operația de creare a planșei.

Dovezile pentru promovare sunt menținute în mod deliberat separat de microetalonul compoziției sintetice. `scripts/perf/video-bridge-contact-sheet-eval.ts` definește un mecanism A/B cu schemă versionată pentru modele vizuale reale compatibile cu OpenAI. Acesta măsoară numărul de tokenuri raportat de furnizor, latența totală de la un capăt la altul (inclusiv compunerea planșei), numărul de apeluri către model și păstrarea faptelor definite în manifest. Răspunsurile brute ale modelului nu sunt scrise în raport; sunt păstrate doar digesturi SHA-256 și ID-uri ale faptelor identificate. Mecanismul nu efectuează niciun apel de rețea sau către un model cu plată decât dacă este transmis `--execute-real` și sunt configurate `--model`, `OMNIROUTE_BASE_URL` și `OMNIROUTE_API_KEY`. În lipsa acelei rulări reale explicite, verdictul său lizibil automat rămâne `HOLD`; măsurătorile sintetice ale payloadului și numărului de apeluri nu constituie singure dovezi pentru promovare.

Apelanții pot atașa un tablou opțional `transcript.cues` unei părți video acceptate atunci când dețin deja text aliniat. Fiecare element de tip cue trebuie să conțină `text`, un interval finit `start`/`end` aflat în durata examinată și o valoare `source` permisă (`client`, `embedded` sau `audio-bridge`); `confidence` are implicit valoarea `1` și trebuie să rămână între `0` și `1`. Elementele cue identice exact sunt reunite. OmniRoute nu inițiază niciodată transcrierea pe baza acestor metadate: elementele cue validate sunt copiate în rezultatul descris împreună cu sursa, nivelul de încredere și intervalul și sunt redate ca observații neverificate alături de descrierile cadrelor. Textul invalid, în afara intervalului sau lipsit de proveniență este respins, nu amestecat în fluxul descrierilor. Ambele canale de transcriere din corpul solicitării normalizează proveniența furnizată la `client`, inclusiv etichetele `embedded` sau `audio-bridge` autoafirmate. Numai un adaptor deținut de server poate atribui acele etichete de încredere prin argumentul `trustedSource` disponibil exclusiv în cod; un câmp JSON al solicitării nu poate ajunge la acel argument. Textul transcrierii rămâne conținut neverificat derivat din media, indiferent de proveniența sa, și nu trebuie să determine niciodată autorizarea.

Un apelant avansat poate furniza o pistă `audioTranscript` pentru același videoclip; aceasta este tratată ca text furnizat de client, nu ca dovadă a transcrierii pe server. Punctul de îmbinare rulează observațiile vizuale și audio folosind un singur termen-limită și un singur semnal de întrerupere, le ordonează pe o axă temporală comună, elimină duplicatele exacte și raportează un rezultat parțial atunci când reușește doar una dintre părți. Un `audioTranscript` invalid degradează rezultatul la unul parțial — descrierea vizuală este păstrată, iar ramura audio înregistrează un cod de eroare igienizat — în loc să eșueze întregul videoclip. Disponibilitatea fiecărei ramuri, indicatorul de rezultat parțial și codurile de eroare igienizate sunt păstrate în rezultatul descris, în metadatele mecanismului de protecție (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), în metadatele cache-ului rezultatului și în contoarele de îmbinare ale punții. Calea implicită Video Bridge nu invocă transformarea vorbirii în text și nu descarcă o a doua copie media; fără acea pistă explicită, rămâne exclusiv video.

**Păstrarea transcrierii (#12150 P1).** Aceasta se aplică automat ori de câte ori
Video Bridge (care este activat opțional) redă un indiciu de transcriere — nu
există un indicator separat de păstrare. Atunci când o solicitare redă orice
indiciu de transcriere (un `transcript` declarat de apelant sau un
`audioTranscript` fuzionat), mecanismul de protecție îl marchează drept
`videoBridgeObserved` și produce o copie umbră redactată a descrierii video —
o redare identică în care corpul text liber al fiecărui indiciu este înlocuit
cu `[redacted-video-transcript]`, construită prin înlocuirea câmpului
structurat al indiciului înainte de asamblarea șirului (niciodată prin
analizarea textului aplatizat, astfel încât niciun conținut al indiciului —
adversarial sau obișnuit, inclusiv corpurile care conțin `]`, precum
`[inaudible]`/`[music]` — nu poate supraviețui). Corpul solicitării păstrat în
jurnalul apelului înlocuiește fiecare parte de text derivată din video cu acea
copie umbră redactată, identificată prin egalitatea conținutului; ancora
`fullText` este recitită din payloadul final al mecanismului de protecție
înaintea apelului, astfel încât potrivirea reușește în continuare după ce
mecanismele de protecție ulterioare din lanț (măștile pentru date PII și
acreditări, cu prioritățile 10/95) rescriu textul descrierii pe loc și după ce
injectarea promptului de sistem/transferului/memoriei remodelează matricea de
mesaje. Corpul trimis în amonte către model rămâne neschimbat. O solicitare
observată nu populează niciun obiect Memory persistent (sunt omise atât
extragerile derivate din solicitare, cât și cele derivate din răspuns), astfel
încât propriul răspuns al modelului nu poate reproduce textul transcrierii în
Memory.

**Câmpuri video brute (#12430).** Atunci când puntea este activată, iar
asistența video nativă este necunoscută sau absentă, câmpurile definite
`transcript`/`audioTranscript` activează, de asemenea, `videoBridgeObserved`,
chiar și după eșecul descrierii sau atingerea limitei `maxVideos`. Valorile
`null` și șirurile goale sunt luate în calcul; câmpurile absente și metadatele
care nu provin din video nu sunt. Copiile păstrate redactează aceste câmpuri
sau omit solicitarea, iar cache-urile/Memory sunt ocolite.

Pe aceste căi de rezervă, indiciile valide ale apelantului devin părți
`text`/`input_text` acceptate, nu câmpuri nestandardizate ale furnizorului.
Ambele piste furnizate în solicitare rămân observații `client` neconfirmate,
cu un avertisment explicit că videoclipul nu a fost descris și că marcajele
temporale nu au fost verificate în raport cu conținutul media. Bugetele
existente de 256 de indicii/64 KiB în total și per indiciu se aplică împreună
celor două piste; marcajele temporale trebuie să se încadreze în limita de 600
de secunde a brokerului și în orice fereastră de focalizare furnizată. Pistele
nevalide sunt eliminate, nu transmise ca text arbitrar; un element-soră valid
poate fi utilizat în continuare, cu excepția cazului în care bugetul lor
combinat este depășit. Câmpurile nule/goale nu adaugă text. Această cale de
rezervă nu adaugă nicio preluare media sau transcriere. Câmpurile de extensie
ale transcrierii sunt eliminate din containerul video de rezervă și din
obiectele sale `video_url`/`source`. Lista permisă pentru transmisia OpenAI
rămâne strictă; containerele video native necunoscute rămân disponibile, iar
ținte cunoscute care acceptă doar text păstrează marcajele sigure. Copiile
umbre structurate pentru redactare protejează textul transcrierii adăugat, în
timp ce solicitarea originală deținută de apelant rămâne neschimbată. Țintele
cu asistență nativă și punțile dezactivate își păstrează comportamentul
existent de ocolire.

Copiile păstrate suplimentare utilizează același semnal de solicitare
observată. Instantaneul brut al solicitării clientului dinaintea mecanismului
de protecție, solicitarea în așteptare din memorie și jurnalul timpuriu al
solicitării respinse înlocuiesc structural câmpurile de transcriere din
părțile video; prompturile sub formă de șiruri sintetizate de etapele
pipeline-ului și de transferul de context sunt redactate la punctul de
stocare a corpului solicitării. Marcajul persistent `video_content_removed`
face ca o continuare prin `previous_response_id` să eșueze în mod sigur,
în loc să reconstruiască textul eliminat intenționat. Dacă o solicitare
observată își pierde copia umbră de redactare per parte înainte de
înregistrare sau chiar dacă una dintre mai multe copii umbre video nu se
potrivește după modificările ulterioare ale solicitării, corpul solicitării
păstrat este omis în întregime, în loc să păstreze o transcriere redactată
parțial.

Pentru o solicitare observată, un răspuns al modelului poate cita orice
porțiune a transcrierii fără o delimitare structurată a indiciului. Prin
urmare, `responseBody` din jurnalul apelului păstrat este înlocuit cu un
marcaj de omitere; artefactul detaliat al pipeline-ului (care poate include
corpurile din amonte/client și fragmentele fluxului) nu este păstrat.
Cache-urile semantic, de idempotență și de redare a raționamentului ocolesc
citirile și scrierile pentru solicitarea respectivă. Solicitarea către
furnizor și răspunsul vizibil clientului rămân neschimbate. Octeții timpurii
de menținere a conexiunii sunt eliminați din bufferul temporar atunci când
artefactul detaliat este omis. Avertismentul EventStream malformat al Kiro
raportează doar numărul de octeți ai payloadului, niciodată conținutul
acestuia sau eroarea brută a analizatorului JSON.
Aceasta nu afirmă că toate mesajele de diagnostic independente ale
furnizorilor/pluginurilor au fost auditate; verificarea mai amplă a punctelor
de stocare este urmărită în #11658.

Ciclul de viață intern `/api/modality-bridge/video/drilldown` este un
substrat de cache separat, autentificat prin loopback/token. Fiecare operație
necesită, de asemenea, un ID principal opac canonic. Înainte ca un apelant de
producție să fie activat, acesta trebuie să derive acel ID din entitatea
autentificată și să nu transmită niciodată o valoare selectată de client.
Cheile cache leagă acel principal de ID-uri canonice ale sesiunii și
referinței video, stochează doar cheile derivate prin SHA-256 și limitează
atât citirile, cât și ștergerea la același principal. Cache-ul stochează cel
mult 16 cadre JPEG derivate per intrare, le expiră după zece minute și
acceptă citiri limitate prin `start`/`end` sau ștergerea explicită a sesiunii.

Fiecare principal este limitat la 16 intrări și 64 MiB de date JPEG canonice.
Aceste limite sunt independente de plafonul global de 64 de intrări/256 MiB:
presiunea asupra cotei principalului evacuează doar intrările acelui principal
folosite cel mai puțin recent, înainte de a lua în considerare evacuarea LRU
globală. Intrările expirate sunt eliminate din contabilitatea principalului și
din cea globală la activitatea cache-ului, în timp ce anularea și eșecul
validării nu confirmă o înlocuire parțială.

Cache-ul respinge Base64 non-canonic, umplerea excesivă, mediile care nu sunt JPEG, JPEG-urile malformate sau trunchiate și JPEG-urile care produc un avertisment în timpul unei decodări `sharp` complete a imaginii, cu limite. Re-encodează fiecare imagine acceptată ca JPEG canonic, determină lățimea și înălțimea din octeții decodați în loc să aibă încredere în câmpurile apelantului și elimină orice octeți poliglot suplimentari în loc să-i păstreze. Numai bufferul comprimat canonic, limitat, este contabilizat pentru ambele cote. Limita JSON la nivel de wire include suprasarcina Base64 pentru plafonul de 32 MiB al intrării decodate. Fiecare derivare stocată înregistrează formatul și rezoluția JPEG validate, politica de eșantionare, versiunea derivării, momentul creării, hash-ul conținutului calculat de server și referința părinte hash-uită, împreună cu hash-ul conținutului părinte furnizat de apelantul de încredere. Anularea este verificată între fazele asincrone de decodare/hash, înainte de commit-ul atomic în cache.

Producătorul din producție reutilizează cadrele brokerului deja derivate numai după o analiză vizuală reușită, fără o a doua descărcare/extragere a videoclipului. Necesită `modalityBridgeVideoDrilldownEnabled=true` configurat de operator, `drilldown: true` strict pentru fiecare parte și un ID autentificat al înregistrării cheii API. Valorile principalului/sesiunii declarate de client nu stabilesc niciodată proprietatea. În lipsa tuturor celor trei condiții, nu face hash, nu redimensionează și nu păstrează cadre suplimentare. Eșecul păstrării menține răspunsul vizual utilizabil. Solicitările pentru care s-a acordat consimțământ ocolesc cache-ul rezultatului pentru întregul videoclip, astfel încât rezultatele din cache să nu redea niciodată handle-uri.

Răspunsurile JSON și SSE reușite expun cel mult patru handle-uri opace în antetul limitat `x-omniroute-video-drilldown`. Originile de browser autorizate pot citi acel antet fără a extinde politica originilor CORS. Handle-urile noi folosesc `v1.<32-byte random base64url
token>`, iar registrul păstrează numai hash-urile SHA-256 ale acestora. Parserul cititorului/antetului acceptă și tokenuri hexazecimale legacy de 64 de caractere. Consumatorul public autentificat este
`GET /api/v1/video-bridge/drilldown?handle=...`, cu activare independentă prin
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Valoarea persistentă explicită false revocă accesul chiar și atunci când fallback-ul de mediu legacy `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` este activat. Păstrarea în producție are fallback-ul legacy analog `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Ambele fallback-uri sunt dezactivate implicit.

Consumatorul determină proprietatea pe baza cheii autentificate și aplică politica cheii:
atât GET, cât și DELETE aparțin categoriei endpointului `video`, inclusiv aliasurile `/v1`
și `/api/v1`. Cheile cu o listă de permisiuni pentru endpointuri care nu este goală trebuie să includă `video`; cheile nerestricționate rămân compatibile. Consumatorul
returnează același 404 pentru handle-uri necunoscute, expirate sau aparținând unei alte chei. Acceptă `variant=preview|standard|detail` (dimensiune JPEG maximă 320/640/1280, fără mărire), `limit=1..8` (sau aliasul legacy `frames`, niciodată ambele), `page` indexată de la zero și secunde opționale de focalizare `start`/`end`. Cheile de interogare duplicate și ferestrele de focalizare inversate sunt respinse. Fiecare variantă returnată are un hash al conținutului său efectiv și metadate privind rezoluția efectivă, asociate sursei păstrate. Variantele sunt derivate la citire, nu stocate ca copii suplimentare păstrate. Răspunsul JSON, inclusiv Base64/envelopa, este limitat la 32 MiB; o pagină prea mare returnează 413, iar clientul trebuie să solicite mai puține cadre. Citirile verifică anularea în jurul fiecărei redimensionări și reverifică validitatea handle-ului înainte de returnare. `DELETE` efectuat de proprietar este idempotent; ștergerea sau expirarea TTL eliberează sursa păstrată și contabilizarea utilizării.

Magazinul partajat este local procesului: handle-urile expiră la repornire și nu pot fi transferate între procese OmniRoute independente. Statisticile de administrare expun politica efectivă de păstrare/acces de la distanță și agregatele privind intrările/octeții păstrați, fără a expune vreodată media, referințe, ID-uri de principal sau handle-uri. Panoul de setări Video afișează aceste valori și poate persista ambele comutatoare de consimțământ. Această documentație de implementare nu constituie dovezi privind implementarea sau promovarea în producție; acceptarea pe modele reale este urmărită separat.

Cadrele sunt descrise secvențial cu modelul Video configurat. O suprascriere Video goală moștenește setarea Vision; dacă ambele sunt goale, auto-routerul Vision selectează modelul efectiv capabil de viziune. Descrierile reușite înlocuiesc partea originală cu prefixul stabil `[Video description:` care marchează, de asemenea, textul ca observație neîncrezătoare derivată din media și le spune modelelor din aval să nu urmeze instrucțiunile găsite în media. Cheile cache-ului pentru descrierile cadrelor includ octeții JPEG, promptul, marcajul temporal și modelul efectiv; numai descrierile reușite sunt memorate în cache. Intrările din cache păstrează modelul efectiv al producătorului reușit, inclusiv un model de fallback; bridge-ul raportează `mixed` atunci când cadre diferite au fost produse de modele diferite. Un cache hit reutilizează identitatea producătorului respectiv, în loc să o eticheteze din nou ca plan de rutare solicitat. Cache-ul rezultatului pentru întregul videoclip este indexat după fiecare intrare care modifică rezultatul — promptul, modelul efectiv, politica de eșantionare, numărul de cadre, modul de analiză semantică, amprenta SHA-256 a indicației de focalizare normalizate, fereastra de focalizare, `transcript`, `audioTranscript` și indicatorul foii de contact — astfel încât schimbarea oricăreia dintre aceste dimensiuni produce o lipsă în cache, nu o reutilizare a unui rezultat vechi. Versiunea politicii de deduplicare vizuală, pragul și numărul limitat de cadre-candidat sunt, de asemenea, explicite în cheia și metadatele cache-ului de rezultate; prin urmare, schimbarea politicii nu poate reutiliza o descriere veche a întregului videoclip. Metadatele cache-ului de rezultate v4 păstrează modul și amprenta, niciodată sarcina brută a utilizatorului. Metadatele privind mecanismele de protecție raportează atât modul de analiză solicitat, cât și modul efectiv; un mod `focused` solicitat fără text utilizabil furnizat de utilizator este raportat ca fiind efectiv `full`.

Guardrail-ul extrage fiecare parte video acceptată, dar descrie cel mult
`modalityBridgeVideoMaxVideos`. Pentru o țintă despre care s-a demonstrat că are
`supportsVideo === false`, videoclipurile eșuate și cele peste limită devin
marcatori expliciți de text sigur, astfel încât niciun videoclip brut să nu
supraviețuiască. Când capacitatea este necunoscută, aceste părți își păstrează
transportatorul video; orice transcriere alternativă urmează conversia limitată
la text descrisă mai sus. Țintele cu `supportsVideo === true` ocolesc bridge-ul.
Semnalul de anulare al cererii clientului se propagă prin descărcare, coada
brokerului, subprocese și apelurile pentru subtitrări; anulările opresc procesarea
între videoclipuri și nu permit niciodată revenirea deschisă la conținut media
brut.

Setările de rulare sunt stocate în DB și validate cu Zod:

| Cheie                               | Implicit    | Interval / comportament                                                                                             |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opțional la runtime, activare explicită                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` păstrează subtitrările generice; `focused` utilizează contextul limitat și nevalidat al ultimului utilizator |
| `modalityBridgeVideoModel`          | `""`        | Moștenește modelul Vision Bridge                                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` sau `segment_aware` proporțional; dacă detectorul eșuează, revine la `uniform`             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

Valorile persistate legacy pentru timeout-ul Video de peste 120 de secunde sunt
limitate la termenul-limită al brokerului; scrierile noilor setări peste această
limită sunt respinse.
`GET /api/modality-bridge/video/runtime` necesită o localizare loopback locală
de încredere, marcată, înainte de autentificare sau de verificarea runtime-ului,
apoi necesită autentificare de administrare. Returnează doar `available`, versiuni
FFmpeg/ffprobe sanitizate și un motiv fix atunci când runtime-ul nu este
disponibil. Endpointul intern de extragere nu este un API public de încărcare:
saturația cozii returnează `503` plus `Retry-After`, deconectarea apelantului
returnează `499`, iar termenul-limită fix al brokerului returnează `504`.
Răspunsurile convertite adaugă
`video->text;model=<visionModel>;parts=<videos>` la antetul central
`x-omniroute-modality-bridge`, fără a elimina segmentele Vision sau Audio.

### Mascatorul PII (`piiMasker.ts`)

Rulează în **ambele** etape.

- **`preCall`** clonează payload-ul, parcurge `system`, `messages`, `input` și
  `prompt` (inclusiv elementele simple de tip șir de caractere) și aplică
  `processPII()` (din `@/shared/utils/inputSanitizer`) câmpurilor `content`/`text`
  de tip șir de caractere. Când `PII_REDACTION_ENABLED=true`, PII detectate sunt
  redactate în payload-ul transmis. Acest lucru este independent de
  `INPUT_SANITIZER_MODE` (care controlează doar politica împotriva injecției de
  prompturi). Când redactarea este dezactivată, apelul înregistrează numărul de
  detectări fără a rescrie conținutul.
- **`postCall`** clonează profund răspunsul, rulează `sanitizePIIResponse()` plus
  mascatorul pentru forma Responses API (`maskResponsesOutput` — acoperă
  `output_text` și `output[].content[].text`). Dacă are loc orice redactare,
  răspunsul modificat îl înlocuiește pe cel original.

Guardrail-ul nu blochează niciodată; doar adnotează (`meta.detections`,
`meta.redacted`) sau rescrie.

#### Selectarea pe tipuri, modele personalizate și contoare de detectare

**Dashboard → Settings → Security → PII masking** alege _ce_ este mascat. Nu
activează mascarea: aceasta este în continuare controlată de
`PII_REDACTION_ENABLED` (cerere) și `PII_RESPONSE_SANITIZATION` (răspuns + SSE),
ambele fiind dezactivate implicit.

- **Selectarea pe tipuri** — id-urile încorporate sunt listate în
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nesetarea înseamnă
  toate tipurile (comportamentul de dinaintea existenței acestei setări).
  Modelul `ssn_us` al motorului pentru cereri se mapează la `ssn`. Șabloanele
  (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA, Full) completează
  doar casetele de selectare din interfață.
- **Identificatori GDPR și POPIA** — douăsprezece id-uri încorporate care acoperă
  identificatori personali din UE și Africa de Sud (tabelul de mai jos).
  Expresiile regex, validatorii și etichetele jurisdicționale se află într-un
  singur tabel, `src/shared/utils/piiPatterns.ts`, utilizat atât de
  sanitizerul răspunsurilor (`src/lib/piiSanitizer.ts`), cât și de mascatorul
  cererilor (`src/shared/utils/inputSanitizer.ts`). O potrivire este redactată
  numai atunci când validatorul o acceptă; o simplă succesiune de cifre nu este
  niciodată suficientă. Un operator care a salvat o selecție restrânsă înainte ca
  aceste id-uri să existe păstrează comportamentul avut până când noile id-uri
  sunt bifate.
- **Modele personalizate** — până la 20 de modele regex sau wildcard (`*` =
  până la 64 de caractere care nu sunt spații albe, `?` = unul). Potrivirile devin
  `[CUSTOM_REDACTED]`. Fiecare model trece prin `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): cel mult 500 de caractere, flaguri
  limitate la `g i m s u`, trebuie să poată fi compilat, să treacă de
  `safe-regex` (împotriva revenirii catastrofale) și să nu se potrivească unui
  șir gol sau unui substituent de redactare. Un model care eșuează este refuzat
  la salvare și la testare, iar un rând stocat care eșuează este omis la runtime
  în loc să fie compilat. Modelele personalizate rulează numai cât timp mascarea
  este activată.
- **Contoare de detectare** — numărători pe tipuri (niciodată valorile potrivite),
  păstrate în memorie și resetate la repornire
  (`src/lib/pii/piiDetectionStats.ts`). Ele cresc numai cât timp mascarea este
  activată.

Setările se află în tabelul `key_value` (namespace-ul `pii_settings`,
`src/lib/db/piiSettings.ts`) și sunt citite printr-un cache de 1 s. API:

| Metodă | Cale                     | Scop                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Starea indicatorului, `enabledTypes`, `customPatterns`, contoare de detectare   |
| `PUT`  | `/api/settings/pii`      | Înlocuiește `enabledTypes` (`null` = toate) și/sau `customPatterns`             |
| `POST` | `/api/settings/pii/test` | Testează o singură regulă pe un eșantion de cel mult 8 KB; nimic nu este stocat |

Toate cele trei necesită autentificare de administrare și validează corpul
cu Zod (`src/shared/validation/schemas/piiSettings.ts`). Cu autentificarea
dezactivată (`requireLogin=false`), `GET` și endpointul de test sunt deschise,
dar `PUT` necesită o sesiune de dashboard, o cheie API cu domeniul de aplicare
`manage`, un token de acces `oma_` cu domeniul de scriere sau superior, ori
tokenul CLI sau tokenul de serviciu intern trimis de la loopback.

#### Identificatori GDPR (UE) și POPIA (Africa de Sud)

| Id                  | Identificator                     | Validare                                                                                       |
| ------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                              | Țară cunoscută, lungimea exactă pentru țara respectivă, ISO 13616 MOD-97-10                    |
| `eu_vat`            | Număr de TVA UE                   | Prefix al unui stat membru cunoscut și formatul numeric al acelui stat (fără căutare VIES)     |
| `es_dni_nie`        | DNI / NIE spaniol                 | Literă de control (valoare modulo 23); NIE este `X/Y/Z` + 7 cifre                              |
| `it_codice_fiscale` | Codice Fiscale italian            | Literă de control calculată din tabelele pozițiilor pare/impare                                |
| `pl_pesel`          | PESEL polonez                     | Sumă de control ponderată și o dată de naștere codificată care există                          |
| `nl_bsn`            | BSN olandez                       | Regula 11 (ponderi 9..2, -1)                                                                   |
| `de_steuer_id`      | Steuer-ID german                  | ISO 7064 Mod 11,10 plus regulile structurii cifrelor (fără 0 la început)                       |
| `se_personnummer`   | personnummer suedez               | Luhn pentru ultimele zece cifre și o dată de naștere plauzibilă (10 sau 12 cifre)              |
| `za_id`             | Număr de identificare sud-african | Luhn pentru toate cele 13 cifre, lună/zi de naștere valide, cifra cetățeniei 0 sau 1           |
| `za_phone`          | Telefon sud-african               | Prefix `+27` / `27` sau forma națională `0..` scrisă cu un spațiu sau o cratimă                |
| `za_vat`            | Număr de TVA sud-african          | 10 cifre care încep cu `4` **și** "VAT" / "BTW" în cele 48 de caractere precedente             |
| `za_tax_ref`        | Referință fiscală sud-africană    | 10 cifre care încep cu `0`-`3`, Luhn, **și** "tax" / "SARS" în cele 48 de caractere precedente |

Deoarece formatele alcătuite doar din cifre intră în conflict cu numerele de
comandă, numerele de build și marcajele temporale, cele mai puțin fiabile
(`za_vat`, `za_tax_ref`) necesită indiciul reprezentat de cuvântul-cheie, iar
un număr simplu de zece cifre care începe cu `0..` nu este tratat ca număr de
telefon sud-african. IBAN-urile cu spații (`GB29 NWBK ...`) nu sunt potrivite.
Pe calea de streaming, indiciul este căutat doar în fragmentul curent.
Identificatorii sunt plasați înaintea tiparelor generice de telefon, astfel
încât un identificator validat își păstrează propriul substituent
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Șabloanele `gdpr` și `popia`
selectează identificatorii UE și, respectiv, sud-africani. Mascarea rămâne
activată opțional (Hard Rule #20): nimic de aici nu modifică valoarea implicită
a unui indicator de funcționalitate.

### Injecția de prompt (`promptInjection.ts`)

Detectează structuri adversariale în conținutul furnizat de utilizator și
impune politica configurată. Comportamentul este determinat de variabilele de
mediu și de opțiunile constructorului:

| Setare          | Variabilă de mediu                                                                                      | Implicit | Efect                                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activat         | `INPUT_SANITIZER_ENABLED`                                                                               | `true`   | Când este `false`, mecanismul de protecție se oprește imediat.                                                                                                                                                               |
| Mod             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                         | `warn`   | Politica pentru injecții: `block`, `warn` sau `log`. (`redact` este acceptat pentru compatibilitate retroactivă, dar **nu** elimină textul injecției; rescrierea PII din cerere este controlată de `PII_REDACTION_ENABLED`.) |
| Prag de blocare | opțiunea `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Severitatea minimă necesară pentru blocare. La valoarea implicită, severitatea medie este doar observată.                                                                                                                    |

**Prioritatea modurilor** (`getMode`): `options.mode` al apelantului →
`INJECTION_GUARD_MODE` **suprascrierea indicatorului de funcționalitate din DB**
(Dashboard → Settings → Feature Flags) → variabila de mediu
`INJECTION_GUARD_MODE` → variabila de mediu `INPUT_SANITIZER_MODE` →
`warn`. Prin urmare, o suprascriere din dashboard are prioritate față de
variabilele de mediu, astfel încât interfața Feature Flags controlează
mecanismul de protecție activ în timp real (fără repornire). Citirea din DB
este sigură în caz de eroare: dacă eșuează, mecanismul de protecție revine la
comportamentul bazat pe mediu, iar când nu este setată nicio suprascriere,
comportamentul este identic cu rezolvarea bazată exclusiv pe mediu.

Surse de detectare:

1. `sanitizeRequest()` din `@/shared/utils/inputSanitizer` (setul de detectoare
   partajat utilizat în alte puncte ale pipeline-ului).
2. `DEFAULT_GUARD_PATTERNS` încorporate (în prezent `system_override_inline` și
   `markdown_system_block`, ambele cu severitatea `high`).
3. `customPatterns` opționale transmise prin opțiunile constructorului (șiruri,
   expresii regex sau înregistrări de forma `{ name, pattern, severity }`).

Când `mode === "block"` **și** cel puțin o detectare atinge pragul de severitate,
`preCall` returnează `{ block: true, message: "Request rejected:
suspicious content detected" }`. În modurile `warn`/`log`, mecanismul de
protecție înregistrează evenimentul, dar permite apelul. Helperul partajat
`evaluatePromptInjection()` este, de asemenea, exportat pentru apelanții care
au nevoie să evalueze prompturi fără să treacă prin registru.

**Limită de scanare (v3.8.20):** detectorul inspectează doar **primii 16 KB** din
textul concatenat al promptului — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 de
octeți) în `src/shared/utils/inputSanitizer.ts`. Atât `detectInjection()`, cât și
`evaluatePromptInjection()` apelează `slice(0, MAX_INJECTION_SCAN_BYTES)` înainte
de a parcurge bucla de tipare. Directivele de injectare se află de obicei în
partea de sus a unui input, astfel încât această limită restrânge consumul de CPU/GC
pentru payload-uri de câteva sute de KB fără a slăbi detectarea (cf.
#3932, #4041).

### Mascherul de credențiale (`credentialMasker.ts`)

Rulează în **ambele** etape, fiind ultimul element din lanțul implicit (prioritatea
`95`). Elimină tiparele cunoscute de chei API / tokenuri secrete din payload-ul
trimis (conținutul mesajelor, argumentele apelurilor de instrumente, rezultatele
instrumentelor) **și** din răspunsul furnizorului, astfel încât o credențială
introdusă într-un prompt (sau retransmisă de rezultatul unui instrument) să nu fie
divulgată furnizorului din amonte sau clientului.

- **Doar cu activare explicită**, aceeași convenție ca pentru eliminarea datelor PII
  (adiacentă Regulii stricte #20): dezactivat dacă nu este setat
  `settings.credentialRedactionEnabled === true` **sau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Când este dezactivat, mecanismul de protecție
  nu efectuează nicio operațiune — nu blochează niciodată și nu rescrie niciodată.
- `redactCredentials()` parcurge arborele complet al payload-ului/răspunsului
  (`walkValue()`), cu protecție împotriva poluării prototipului și siguranță la
  cicluri prin `WeakSet`, și înlocuiește potrivirile cu un substituent de forma
  `[REDACTED:<type>]`, clonând doar ramurile care s-au modificat efectiv.
- `CREDENTIAL_PATTERNS` acoperă chei de la furnizori LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokenuri VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chei de plată (Stripe, Square), chei
  cloud (cheie de acces AWS, Twilio, SendGrid, Mailgun), chei private / JWT-uri,
  șiruri de conexiune care conțin credențiale
  (`mongodb://user:pass@...`, etc.) și un tipar generic pentru valorile de antet
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Cheile cu formă de antet
  (`authorization`, `x-api-key`, `api-key`, `apikey`) sunt eliminate structural
  (doar valoarea, păstrând prefixul schemei precum `Bearer `/`Basic `), nu prin
  expresia regex generică pentru text.
- Mecanismul de protecție nu blochează niciodată; doar rescrie
  (`modifiedPayload` / `modifiedResponse`) și adaugă metadate
  (`meta.credentialsRedacted`, `meta.count`).

Test de regresie: `tests/unit/credential-masker-guardrail.test.ts`.

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
