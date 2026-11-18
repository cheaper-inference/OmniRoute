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

## Mecanisme de protecție încorporate

Registry-ul încarcă automat șase mecanisme de protecție în ordinea priorității la importare
(consultați `registry.ts` → `registerDefaultGuardrails()`):

| Prioritate | Nume                | Etapă/etape    | Fișier                |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numerele de prioritate mai mici se execută **primele**.

### Vision Bridge (`visionBridge.ts`) — PR-1 pentru puntea de modalitate

Modelul de bază GLM 5.3 și `glm-5.3-{low,high,max}` au metadate explicite
`supportsVision:false` în registry/spec. Variantele GLM 5.3 Flash
rămân modele native cu suport pentru viziune. Ruta `/v1/messages` din Claude Code intră în lanțul comun de mecanisme de protecție `handleChat` înainte de traducerea Claude-în-OpenAI; imaginile din rezultatele instrumentului `Read` imbricate trebuie descrise sau gestionate înainte ca traducerea respectivă să le transforme în conținut OpenAI `image_url` (#17069).

Interceptează solicitările care conțin imagini și sunt direcționate către **modele fără suport pentru viziune** și fie redirecționează întreaga solicitare către un model capabil de viziune, fie înlocuiește componentele imagine cu descrieri text produse de un model de viziune configurabil, înainte de apelul către serviciul upstream. Astfel, furnizorii care acceptă doar text pot gestiona transparent payload-uri multimodale.

Flux:

1. Se omite dacă modelul țintă acceptă deja viziune (cu excepția cazului în care apare în lista forțată pentru punte `isVisionBridgeForcedModel`).
2. Extrage componentele imagine prin `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), care deleagă către **detectorul unificat de media**
   `detectMediaParts()` din `open-sse/utils/mediaParts.ts` — sursa unică de adevăr partajată cu filtrul de compatibilitate combo.
   Extragerea este permisă doar pentru formele pe care `replaceImageParts` le poate insera din nou (contractul extragere↔înlocuire): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, URL Anthropic `source.type:"url"` și Responses API
   `input_image`. Imaginile corespunzătoare imbricate în `tool_result.content` din Claude Code
   și în rezultatele instrumentelor Responses sunt, de asemenea, extrase și înlocuite la căile lor originale; formele care conțin doar indicatori sunt folosite de filtrul combo și nu sunt extrase.
   Se omite dacă nu este găsită nicio imagine.
3. Rezolvă configurația de execuție prin `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): noile chei de configurare `modalityBridge*` au prioritate; cheile legacy `visionBridge*` rămân un **fallback pentru un singur ciclu** (fereastră de rollback). Se omite înainte de orice parcurgere a datelor media dacă puntea este dezactivată.
4. Selectorul de mod (`modalityBridgeVisionMode`, consultați tabelul de mai jos) decide între redirecționare și descriere. Redirecționarea returnează `modifiedPayload` cu doar `model`
   înlocuit, plus metadatele `{ rerouted, fromModel, toModel, imagesKept }`.
5. Calea de descriere: limitează numărul de imagini la `maxImages`, compune promptul adaptat sarcinii, consultă memoria cache pentru descrieri, apelează modelul de viziune **în paralel**
   (`Promise.allSettled`) și inserează componente text de forma `[Image N]: <description>` în locul acestora. O descriere eșuată produce `null`: imaginea brută este păstrată pentru țintele necunoscute/capabile de viziune (#4012), însă o **țintă directă confirmată ca acceptând doar text** sau un combo cu zero viziune primește un stub text explicit
   `(unavailable — no vision-capable provider connected)` pentru fiecare imagine fără descriere, inclusiv în cazul eșecurilor parțiale și al imaginilor care depășesc limita apelurilor de descriere (#17069). Fallback-ul existent pentru descrierea combo în care toate încercările au eșuat rămâne activ (#8430).
6. Returnează `modifiedPayload` + metadate (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selectorul de mod (`modalityBridgeVisionMode`)

| Mod        | Implicit | Comportament                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Euristica legacy, neschimbată (#6640/#7204): modelele care nu sunt combo/`auto/` sunt redirecționate către cel mai bun model de viziune, cu excepția cazului în care modelul original are deja credențiale utilizabile (atunci se folosește descrierea); țintele combo folosesc întotdeauna descrierea.                                                                                      |
| `describe` |          | Descrie întotdeauna — blocul de redirecționare este omis complet; modelul ales de utilizator oferă întotdeauna răspunsul.                                                                                                                                                                                                                                                                    |
| `reroute`  |          | Forțează redirecționarea: protecția pentru păstrarea modelului cu credențiale este dezactivată. Protecția credențialelor pentru **ținta** redirecționării se aplică în continuare — atunci când nu există nicio țintă de viziune utilizabilă, puntea blochează solicitarea cu o eroare clară, în loc să descrie imaginile sau să trimită imagini brute către o țintă care acceptă doar text. |

Modurile forțate întrerup procesarea înainte de rularea euristicii `auto`; comportamentul `auto` este identic la nivel de octeți cu cel al mecanismului de protecție anterior PR-1.

#### Domeniul cheii API (`visionBridgeKeyScope.ts`)

Atunci când cheia API a apelantului restricționează `allowedConnections`, grupurile de cotă
(`allowedQuotas`) sau modelele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), puntea selectează
doar modele de redirecționare și descriere pe care cheia le poate utiliza, pe conexiuni pe care cheia le poate utiliza. Apelul de descriere trece apoi întotdeauna prin bucla automată OmniRoute cu antetul `x-omniroute-self-loop-key-id`, astfel încât cererea de chat recepționată aplică din nou politica de conexiuni și modele a cheii respective. `enforceApiKeyPolicy()` onorează acel antet numai împreună cu bearer-ul buclei automate, astfel încât acesta poate doar restrânge accesul, iar un ID care nu poate fi rezolvat este respins.

Dacă niciun model de viziune nu este permis pentru cheie, o **țintă confirmată doar pentru text** respinge local cererea de imagine cu un HTTP 400 clar, în loc să redirecționeze octeții imaginii către un upstream incapabil (#17069). Pentru țintele cu o capacitate de viziune necunoscută sau nativă, calea de descriere păstrează comportamentul anterior de tip fail-open (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Cererile fără cheie și cheile fără aceste restricții se comportă exact ca înainte.

#### Prompt de descriere adaptat sarcinii (`modalityBridgeVisionTaskAware`)

Valoarea implicită este **`true`**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) adaugă
textul **ultimului mesaj al utilizatorului** (trunchiat la 500 de caractere) la promptul de bază pentru descriere, orientând descrierea către ceea ce a solicitat efectiv utilizatorul (modelul codex-vision-proxy) și cerând modelului de viziune să transcrie textul vizibil. Dacă flagul este dezactivat — sau nu există text de la utilizator — promptul de bază este utilizat neschimbat.

Cererea proprie compatibilă cu OpenAI a buclei automate de descriere (`callVisionModelSingle()`
din `visionBridgeHelpers.ts`) solicită întotdeauna `image_url.detail: "high"` —
necondiționat, pentru fiecare apelant/furnizor, fără a depinde de vreun semnal al clientului.
Eșantionarea cu detalii reduse degradează acuratețea OCR exact pentru sarcina de transcriere a textului solicitată de acest prompt, astfel încât apelul de descriere solicită întotdeauna nivelul ridicat de detalii, indiferent de nivelul de detalii utilizat de cererea inițială primită. Acest lucru afectează doar corpul cererii interne de descriere; nu modifică modul în care OmniRoute redirecționează propriul `image_url.detail` al apelantului în cererea principală —
valoarea implicită este aplicată separat și numai pentru clienții OpenCode detectați, în
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Ramura în format wire Anthropic a buclei automate de descriere nu are câmpul `detail` și nu este afectată de niciuna dintre valorile implicite.

#### Limită pentru rezultatul descrierii (`modalityBridgeVisionMaxChars`)

| Cheie                          | Implicit | Interval          |
| ------------------------------ | -------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` sau 100–50000 |

`0` (valoarea implicită) înseamnă **fără limită** — descrierea returnată de
`callVisionModel()` este transmisă nemodificată, păstrând comportamentul existent. Orice valoare din intervalul 100–50000 trunchiază descrierea cu un sufix `…` înainte de a fi reinserată ca `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` în `src/lib/guardrails/visionBridge.ts`).
Măriți această valoare pentru sarcini OCR bogate în detalii, în care modelul din aval are nevoie de transcrierea completă; micșorați-o pentru a limita utilizarea tokenurilor în cazul modelelor de viziune verbose.
Câmpul din tabloul de bord se află în panoul Advanced al filei Vision
(`modality-bridge-max-chars` în `ModalityBridgeVisionTab.tsx`) și limitează orice valoare între 1 și 99 la pragul minim de 100, lăsând în același timp un `0` explicit nemodificat — `0` este o valoare Zod validă în sine
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nu doar valoarea implicită „nesetată”.

#### Cache pentru descrieri (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL în memorie pentru rezultatele descrierilor, partajat la nivelul întregului proces.
Cheia = `sha256(imageRef + composedPrompt + configuredBridgeModel)` cu încadrare bazată pe prefixul lungimii (fără coliziuni la limita dintre câmpuri). Componenta modelului este modelul de punte **configurat**, nu modelul care a furnizat efectiv răspunsul —
`callVisionModel` poate reveni intern la un model alternativ, iar folosirea fiecărei încercări ca element al cheii ar fragmenta cache-ul. Descrierile eșuate nu sunt niciodată memorate în cache. Setări:

| Cheie                           | Implicit | Interval |
| ------------------------------- | -------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`   | —        |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000  |

#### Normalizarea imaginilor de la distanță (preluarea pentru descriere/bază64 prin bucla automată)

Atunci când puntea preia singură o imagine **de la distanță** — apelul automat Anthropic pentru descriere și conversia în bază64 pentru formatul wire Claude
(`ensureBase64ImagesForClaudeWire`), ambele prin
`fetchRemoteImageAsDataUri()` din `visionBridgeHelpers.ts` — URI-ul de date rezultat este trecut prin `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) înainte de a fi încorporat în cererea către modelul de viziune. Imaginile supradimensionate sunt redimensionate astfel încât **latura lungă să aibă 2048 px** (corespunzător limitei de redimensionare pe care OpenAI/Anthropic o aplică deja pe server), ceea ce reduce numărul de octeți încărcați și latența fără a modifica ceea ce vede modelul de viziune. Redimensionarea utilizează `sharp`, încărcat prin import dinamic: pe o platformă unde binarul său nativ nu poate fi încărcat, `normalizeDataUri()` **nu aruncă niciodată o eroare** — revine la transmiterea directă a octeților originali, astfel încât calea de descriere/conversie în bază64 continuă întotdeauna să funcționeze. Octeții care nu reprezintă imagini (o preluare care nu a returnat o imagine decodabilă) sunt, de asemenea, transmiși nemodificați. Această normalizare se aplică doar imaginilor pe care puntea le preia pentru propriul apel automat — nu este aplicată sarcinii brute transmise direct de apelant, în conformitate cu principiul modificării numai cu opt-in (Regula strictă #20).

#### Schemă de setări + migrare

Noile chei `modalityBridge*` sunt validate de Zod în `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, cele trei chei `modalityBridgeCache*` și grupul
`modalityBridgeAudio*` utilizat de Audio Bridge. Migrarea
`141_modality_bridge_settings.sql` copiază valorile legacy `visionBridge*` în
cheile noi corespunzătoare (idempotent, fără a suprascrie o valoare
`modalityBridge*` setată de operator); cheile legacy rămân acceptate ca fallback
la citire pe durata unui ciclu de lansare.

#### Antet de transparență + statistici

Răspunsurile cu descriere transformată includ
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(generat de `buildModalityBridgeHeader()` în `modalityBridge/bridgeStats.ts`,
adăugat de `withModalityBridgeHeader()` în `src/sse/handlers/chatHelpers.ts`).
Solicitările redirecționate nu primesc niciun antet — payloadul nu a fost
modificat, iar schimbarea modelului este deja vizibilă în câmpul `model` din
corpul răspunsului.

`GET /api/modality-bridge/stats` (autentificare de management, același nivel ca
`GET /api/settings`) returnează contoarele per modalitate din memorie
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` pentru `vision`, `audio` și
`video`. `averageLatencyMs` folosește `latencySamples`, nu toate încercările, ca
numitor; o operațiune fără temporizare nu generează artificial un eșantion de
zero milisecunde. `bridged` rămâne aliasul compatibil retroactiv pentru
conversiile reușite; încercările eșuate nu îl incrementează.
Contoarele se resetează la repornirea procesului, în mod intenționat
(telemetrie, nu contabilitate).

#### Configurarea tabloului de bord

Pagina dedicată din tabloul de bord este
`/dashboard/settings/modality-bridge`. Filele `Vision`, `Audio` și `Video`,
accesibile prin URL, păstrează parametrii de interogare la schimbarea valorii
`tab`. Fila Vision expune activarea, modul, selectarea modelului (inclusiv
valoarea implicită automată), promptarea în funcție de sarcină, limitele
avansate pentru timeout/imagini/lungimea descrierii/cache, contoarele de
rulare și o solicitare de eșantion protejată. Fila Audio este, de asemenea,
activă: expune activarea, un selector de modele exclusiv STT cu Auto, limitele
pentru timeout/durata maximă a clipului, contoarele audio și un test de
eșantion `input_audio`. Fila Video este funcțională: raportează starea de
rulare FFmpeg/ffprobe — una dintre cele patru stări explicite ale interfeței
(`unknown` cât timp verificarea este în curs sau nu a putut fi finalizată,
`restricted` pe o gazdă a tabloului de bord care nu este loopback, unde
verificarea este omisă la nivel de client, `unavailable` după ce s-a verificat
și s-a confirmat lipsa, sau `available` împreună cu versiunile FFmpeg/ffprobe) —
persistă limitele pentru enable/model/frame/video/timeout, filtrează selectorul
de modele pentru a include doar modelele compatibile cu viziunea și expune
contoarele video.

Cardul Vision Bridge anterior din setările AI este un link de compatibilitate
către noua pagină; nu mai deține o a doua copie a formularului. Media
Providers oferă, de asemenea, linkuri pentru fluxurile Image-to-Text și
Speech-to-Text către filele corespunzătoare Modality Bridge, fără a elimina
playground-ul Speech-to-Text existent.

**Ocolirea admiterii pentru bucla proprie:** atunci când apelul de descriere
trece prin propria buclă `/v1` a OmniRoute (model de furnizor non-standard),
subsolicitarea trimite `x-omniroute-admission-bypass: internal` și este
autentificată cu credentialul rezolvat pentru bucla proprie — sentinelul local
`sk_omniroute` în modul local sau cheia de mediu `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` configurată de operator (#1350), astfel încât implementările
cu `REQUIRE_API_KEY=true` să poată executa în continuare apelul de descriere.
Ocolirea este onorată doar pentru acele credentiale exacte, astfel încât
clienții externi nu pot utiliza antetul pentru a sări peste admitere.

Valorile implicite legacy se află în
`src/shared/constants/visionBridgeDefaults.ts`; valorile implicite noi pentru
mod, modul în funcție de sarcină și cache, precum și resolverul de setări, se
află în `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail-ul expune
o opțiune de constructor `deps`, astfel încât testele să poată injecta
implementări fictive pentru `getSettings` și `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Interceptează solicitările chat care conțin audio înainte ca acestea să ajungă
la o țintă despre care nu se știe că acceptă date audio. Nu redirecționează
niciodată solicitarea chatului: părțile audio sunt transcrise prin endpointul
multipart compatibil cu OpenAI existent, iar modelul de chat ales continuă cu
transcrierile text.

Flux:

1. Rezolvă `supportsAudio` prin `getResolvedModelCapabilities()`. Metadatele explicite din registrul furnizorilor au prioritate, urmate de metadatele statice ale modelului și apoi de `modalities_input` sincronizat. O listă de intrări declarată fără `audio` înseamnă `false`; în absența dovezilor privind capabilitatea, rezultatul rămâne `null`. Atât `false`, cât și `null` activează puntea conservatoare, în timp ce `true` o ocolește.
2. Rezolvă setările `modalityBridgeAudio*` și extrage părțile audio spliceabile de nivel superior din fiecare mesaj prin detectorul partajat `detectMediaParts()`. Formele wire acceptate sunt `input_audio`, `audio_url` din OpenAI și `source.media_type: "audio/*"`. Audio-ul imbricat este detectat pentru rutare, dar nu este eliminat de calea de splice. Procesarea este limitată de `modalityBridgeAudioMaxClips`; părțile ulterioare rămân neschimbate.
3. Respectă un `provider/model` configurat sau permite lui `selectAudioBridgeModel()` să parcurgă `AUDIO_TRANSCRIPTION_PROVIDERS` în ordinea stabilă a catalogului și să selecteze primul model cu acreditări active și utilizabile ale furnizorului.
4. `callAudioTranscription()` convertește conținutul audio base64/data-URI într-un `file` multipart sau descarcă un `audio_url` la distanță prin mecanismul de protecție outbound, disponibil doar pentru URL-uri publice, cu fixarea DNS și o limită de 25 MB. Apoi face POST pentru fișier și modelul selectat către bucla locală `/v1/audio/transcriptions`, autentificată cu `resolveSelfLoopBearer()`. Ruta de transcriere existentă efectuează căutarea normală a acreditărilor, gestionarea perioadelor de cooldown/limitare a ratei și trimiterea către furnizor.
5. Apelurile reușite își înlocuiesc părțile cu `[Audio N]: <transcript>`. Apelurile rulează cu `Promise.allSettled`: un eșec individual păstrează partea audio originală (#4012 contract). Dacă toate apelurile eșuează și ținta este demonstrat `supportsAudio === false`, părțile devin
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Pentru o țintă necunoscută (`null`), un rezultat în care toate apelurile eșuează rămâne neschimbat. O țintă demonstrat limitată la text, fără acreditări STT utilizabile, primește același stub explicit fără a iniția un apel de rețea.

Transcrierile reușite folosesc memoria cache LRU/TTL Modality Bridge, disponibilă la nivelul întregului proces. Cheia combină referința audio, eticheta stabilă a operației `audio-transcription` și modelul STT selectat; eșecurile nu sunt niciodată memorate în cache. Încercările audio actualizează contoarele partajate `bridged`, `cacheHits`, `failures` și `lastUsedAt`. Răspunsurile transformate conțin `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; cererile neschimbate nu primesc un segment Audio Bridge.

Setările de execuție sunt susținute de DB și validate cu Zod:

| Cheie                         | Implicit | Interval        |
| ----------------------------- | -------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —               |
| `modalityBridgeAudioModel`    | `""`     | Auto sau ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10            |

Cache-ul partajat rămâne controlat de `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` și `modalityBridgeCacheMaxEntries`.

### Punte video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Interceptează părțile video de nivel superior din `messages` pentru Chat Completions și din `input` pentru Responses API înainte ca o țintă fără suport video nativ cunoscut să fie apelată. Formele acceptate sunt `input_video`, `video_url`, `video_source`, URL-uri HTTPS și URI-uri de date `data:video/*;base64,...`. Numele simple de fișiere din text nu sunt tratate ca video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) gestionează parcurgerea cererii, verificarea capabilității/politicii, agregarea per cerere și payload-ul răspunsului. Procesarea per videoclip — achiziția, cache-ul întregului rezultat, descrierea unei secvențe de cadre (care fuzionează orice transcriere audio declarată de apelant) și valorile metrice/abort/curățarea pentru fiecare încercare — este ascunsă în `processVideoPart` din `videoBridgePipeline.ts`, apelat o dată pentru fiecare parte video în bucla lui `preCall`. Modulul definește, de asemenea, limitele explicite ale porturilor `VideoMediaBrokerPort` (achiziționarea octeților și extragerea cadrelor eșantionate), `VideoAudioTranscriptionPort` (fuzionarea unei transcrieri audio declarate de apelant cu subtitrările eșantionate) și `VideoDrilldownPort` (forma veche a magazinului brut). STT-ul de producție și păstrarea cadrelor sunt compuse în jurul portului de descriere prin `createVideoSttAdapter` și `createVideoDrilldownAdapter`; acesta din urmă folosește ciclul de viață partajat al identificatorilor opaci.

Calea publică a cererilor `/v1` nu importă și nu invocă niciodată un subprocess. Videoclipurile la distanță sunt descărcate cu o limită de 50 MiB; videoclipurile base64 inline au o limită conservatoare de 36 MiB decodați pentru fiecare videoclip, astfel încât anvelopa model/mesaje/framing să poată rămâne în limita publică de admitere a cererilor JSON, de 50 MiB. Estimările pentru lungimea inline și dimensiunea decodată sunt verificate înainte de alocare. HTTPS este obligatoriu pentru URL-ul remote inițial și pentru fiecare redirect, folosind mecanismul existent de protecție outbound disponibil doar pentru URL-uri publice, cu fixarea DNS. Octeții trec apoi prin limita internă exactă a brokerului `POST /api/modality-bridge/video/extract`. Ruta este atât `LOCAL_ONLY`, cât și `SPAWN_CAPABLE`, acceptă numai o cerere autentificată per proces, provenită dintr-un loopback de încredere, și nu acceptă niciodată un URL, o cale de sistem de fișiere, un executabil sau o listă de argumente. Pipeline-ul pentru dimensiunea corpului API și cititorul incremental al corpului din handler impun independent o limită de 50 MiB pentru intrarea brokerului. Coada sa limitată rulează câte o extragere, permite patru joburi în așteptare și limitează intrarea în așteptare la 100 MiB.

În broker, `ffprobe` citește un fișier local privat; lista fixă de formate
permise exclude formatele de playlist și manifest. Pentru containerele din
familia MOV permise, referințele externe de date MOV rămân dezactivate în mod
implicit, iar comanda fixă nu activează această opțiune. Atât `ffprobe`, cât și
`ffmpeg` folosesc lista albă de protocoale `file`-only, un singur fir de
execuție, tablouri fixe de argumente, fără shell, iar executabilele sunt
rezolvate din `PATH`. Fluxurile de copertă cu imagine atașată nu sunt candidați
redabili. Toate fluxurile redabile trebuie să respecte limitele, iar un flux
implicit explicit are prioritate înaintea soluției de rezervă deterministe cu
cel mai mic index. Videoclipurile sunt limitate la 600 de secunde, 8.192 de
pixeli pe fiecare dimensiune și 33.554.432 de pixeli sursă. FFmpeg eșantionează
între 1 și 16 cadre JPEG la mijlocul intervalelor, redimensionează latura
lungă la cel mult 1.024 de pixeli fără a mări intrările mai mici și nu primește
niciodată un URL. Eșantionarea este `uniform` în mod implicit. Politicile
opționale `scene_aware` și experimentale `segment_aware` efectuează o trecere
suplimentară fixă FFmpeg peste fluxul local deja validat, selectează marcaje
temporale de scene limitate din `showinfo` și revin în mod determinist la
aceleași puncte mediane uniforme în cazul unei erori a detectorului, al unei
expirări, al unei ieșiri malformate sau al unui set de candidați gol.
Modul segment-aware alocă eșantioane mediane proporțional cu intervalele de
scene validate; dovezile și comportamentul de rezervă pentru segment-aware
sunt detaliate mai jos. Limita strictă de 16 cadre se aplică după selecție în
fiecare politică. Atunci când o solicitare scene-aware are un buget de un
singur cadru, aceasta folosește punctul median uniform al ferestrei active
pentru întregul videoclip sau pentru zona de interes și raportează
`policyEffective: uniform`: un singur cadru de scenă selectat nu poate
păstra ambele extremități temporale. Un apelant poate furniza opțional o
fereastră de focalizare finită (`start`/`end` secunde); limitele sunt ajustate
la durata suportului, ferestrele inversate sau nefinite sunt respinse, iar
toate politicile de eșantionare sunt efectuate numai în interiorul intervalului
normalizat. Fereastra rezultată este inclusă în metadatele de eșantionare și în
prefixul descrierii neîncrezătoare, astfel încât modelele din aval să poată
distinge un fragment focalizat de întreaga cronologie.

Focalizarea semantică a legendei este o setare separată și explicită. Modul
implicit de analiză `full` păstrează promptul existent pentru cadre și nu
transmite niciodată textul solicitării către modelul de legende. În modul
`focused`, puntea citește numai cel mai recent `text`/`input_text` nevid,
scris de utilizator, din același container Chat sau Responses, îl normalizează
la NFC, comprimă caracterele de control și spațiile albe și îl limitează la
500 de puncte de cod Unicode. Un rezultat gol revine la promptul `full` exact.
Un indiciu utilizabil este serializat ca JSON într-un bloc dedicat de context
neîncrezător furnizat de utilizator și poate doar să acorde prioritate
detaliilor observabile; nu poate suprascrie avertismentul separat împotriva
urmării instrucțiunilor vizibile sau audibile în suport. Focalizarea textuală
nu deduce niciodată `start`/`end` și nu modifică eșantionatorul temporal.

#### FU-07 dovezi structurale ale segmentelor

`segment_aware` folosește o singură trecere de preanaliză limitată peste fluxul
video local deja validat. Lanțul fix de filtre redimensionează mai întâi la o
lățime de cel mult 320 de pixeli, detectează schimbările de scenă și
intervalele înghețate, apoi eșantionează la 1 cadru pe secundă pentru
estompare, luminanță medie și informații spațiale/temporale. Trecerea este
limitată la 600 de eșantioane structurale, un singur fir de execuție
FFmpeg/filtru, aceleași liste albe de protocoale și containere `file`-only, o
limită de 1 MiB pentru ieșirea procesului și cel mult 30 de secunde în
interiorul termenului-limită/abort partajat al brokerului. Nu acceptă
niciodată de la solicitare o comandă, un filtru, o cale sau un URL.

Valorile structurale sunt dovezi de eșantionare deterministe, nu înțelegere
semantică a videoclipului. Ele nu deduc subiecți, acțiuni, legende, vorbire sau
intenția utilizatorului. Limitele scenelor și ale înghețării formează
segmentele; acoperirea înghețată, estomparea, expunerea, detaliile spațiale și
schimbarea temporală influențează doar modul în care este alocat bugetul
existent de 1–16 cadre. Un segment complet înghețat este limitat la un singur
cadru, în timp ce segmentele neînghețate concurează pentru bugetul rămas. Când
numărul limitelor depășește numărul de cadre, se păstrează acoperirea uniformă
a cronologiei, astfel încât tăieturile rapide de la început să nu poată ascunde
un segment lung la final. Limitele scenelor aflate în rezoluția de analiză de
1 secundă față de o limită de înghețare sunt reunite.

Filtrele lipsă, dovezile malformate/goale, o eroare a detectorului sau expirarea
preanalizei limitate eșuează în mod permisiv către politica exactă cu puncte
mediane uniforme. Un abort al apelantului sau termenul-limită al brokerului nu
eșuează în mod permisiv: acesta termină subprocessul aflat în execuție,
împiedică extragerea ulterioară a cadrelor, iar arborele temporar privat este
eliminat în `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generează fixture-uri deterministe
reale FFmpeg pentru economiile apelurilor de subtitrare după deduplicare,
alocarea bugetului pentru mișcare densă, dovezile de estompare/expunere/SI-TI,
tăieturi rapide cu o coadă lungă și false pozitive la estompări graduale.
Acesta înregistrează timpul de execuție al preanalizei și, atunci când
`/usr/bin/time` este disponibil, timpul CPU al procesului copil și RSS-ul maxim.
Verificările sale de calitate sunt doar oracole structurale. Calitatea reală a
modelului de legende rămâne `HOLD`, deoarece acest harness nu are niciun
endpoint autorizat sau evaluator înghețat. Economiile monetare rămân, de
asemenea, `HOLD`, cu excepția cazului în care
`--caption-cost-per-call-usd` furnizează o estimare explicită pozitivă per
apel; scriptul nu fabrică niciunul dintre aceste rezultate.

Fiecare cadru este limitat la 4 MiB, toate cadrele brute împreună la 23 MiB, iar răspunsul serializat al brokerului la 32 MiB. Un director temporar privat este eliminat în `finally`. OmniRoute nu include FFmpeg și nu acceptă o cale executabilă personalizată. Înainte de generarea subtitrărilor, puntea aplică o etapă conservatoare de deduplicare vizuală: fiecare JPEG este redus la un buffer în tonuri de gri de 16×16 și este comparat numai cu ultimul cadru păstrat. Pentru un buget de subtitrări solicitat mai mare decât un cadru, extragerea furnizează un grup de candidați limitat la cel mult de două ori bugetul respectiv și niciodată la mai mult de 16 cadre. Limita solicitată este aplicată numai după deduplicare, primul și ultimul candidat selectat fiind păstrate în timpul reducerii finale atunci când bugetul este de cel puțin două cadre. Politica versionată
`grayscale-16x16-mean-cells-v2` utilizează valoarea mai mare dintre diferența medie de luminanță și raportul celulelor miniaturii a căror diferență normalizată este de cel puțin 0.05. Pragul pentru duplicate este constanta 0.04, aleasă pentru predictibilitate și nu expusă ca setare de execuție. Acest al doilea semnal de contrast ridicat păstrează mișcările mici și modificările textului vizibil pe care o comparație bazată doar pe medie le poate ascunde. Erorile comparatorului sau decodorului permit continuarea și păstrează acoperirea. Metadatele rezultatului separă candidații extrași, cadrele utilizate cu succes și duplicatele vizuale eliminate.

O parte video marcată explicit poate solicita o foaie de contact cu marcaje temporale. Puntea construiește o grilă JPEG cu cel mult 4 coloane și 16 cadre. Fiecare celulă de 512 pixeli inserează marcajul temporal al sursei într-o bandă inferioară cu contrast ridicat, în timp ce aceleași marcaje temporale rămân în metadatele textuale pentru asocierea și auditarea ulterioare. JPEG-ul complet rămâne limitat la 32 MiB. Dacă `sharp` nu poate decoda sau compune grila, puntea revine la cadrele JPEG individuale; anularea de către client se propagă în continuare prin operația foii de contact.

Dovezile pentru promovare sunt separate în mod deliberat de microbenchmarkul compoziției sintetice. `scripts/perf/video-bridge-contact-sheet-eval.ts` definește un sistem de testare A/B cu schemă versionată pentru modele vizuale reale compatibile cu OpenAI. Acesta măsoară numărul de tokenuri raportat de furnizor, latența de la un capăt la altul (inclusiv compunerea foii), numărul de apeluri către model și păstrarea faptelor definită în manifest. Răspunsurile brute ale modelului nu sunt scrise în raport; sunt păstrate numai rezumatele SHA-256 și ID-urile faptelor identificate. Sistemul de testare nu efectuează niciun apel de rețea sau către un model plătit decât dacă este transmis `--execute-real` și sunt configurate `--model`, `OMNIROUTE_BASE_URL` și `OMNIROUTE_API_KEY`. Fără acea execuție reală explicită, verdictul său care poate fi citit automat de mașină rămâne `HOLD`; măsurătorile sintetice privind payloadul și numărul de apeluri nu constituie singure dovezi pentru promovare.

Separatul `scripts/perf/video-bridge-promotion-eval.ts` consumă observații FU-07 sau
FU-09. Admiterea pentru promovare necesită toate cele opt tipuri de scenarii sintetice, precum și un clip real sanitizat, cel puțin trei repetări măsurate pentru fiecare rol și caz, toate cele zece metrici declarate, rezumate înghețate pentru media/promptul/faptele așteptate/setările, ID-uri unice ale observațiilor și o ordine A/B inițializată cu seed și verificată. Bonul de execuție leagă rezumatul corpusului, SHA-ul exact al candidatului și revizia modelului. Măsurătorile lipsă sau nevalide rămân `HOLD`, inclusiv CPU peste 30 s, RSS maxim peste 512 MiB sau preanaliză peste 30 s. Acestea sunt limite pentru admiterea dovezilor, nu o nouă garanție de impunere a RSS în timpul execuției.

FU-07 necesită o păstrare a calității de cel puțin 98% și o latență p95 de cel mult 1,2 ori valoarea de bază, plus fie o îmbunătățire absolută de 0.05 a recall-ului mediu echilibrat pe cazuri, la un număr mediu echivalent de apeluri pentru subtitrări, fie cu cel puțin 10% mai puține apeluri medii pentru subtitrări după deduplicare. FU-09 necesită o calitate de cel puțin 0.85, o păstrare de 95%, o reducere mediană a latenței de 20% și o reducere a numărului de tokenuri de 10%. Pierderea unui fapt critic, neconformitatea cu injecția sau utilizarea lipsă împiedică promovarea. O singură execuție nu poate promova nimic:
`--previous-report` confirmă două execuții distincte, fără suprapuneri și eligibile consecutiv, ale aceleiași politici/revizii a modelului/candidatului/corpusului. Un experiment de eșantionare nu poate confirma un experiment cu foaie de contact.

Colectoarele ar trebui să evalueze răspunsurile în memorie și să salveze `responseDigest`, împreună cu metricile și asocierile observațiilor, niciodată textul răspunsului. Consumatorul citește și observațiile brute moștenite, dar nu copiază niciodată acel text în rapoartele sale. Pentru fiecare observație este acceptat exact unul dintre `responseDigest` și `rawResponseText`. Lista de permisiuni versionată rămâne goală, cu o valoare implicită imuabilă `hold`. O intrare eligibilă necesită referința la dovezi, versiunea politicii, revizia modelului, SHA-ul exact al candidatului, rezumatul manifestului și două ID-uri distincte de execuție; contextele aflate în conflict sunt respinse. Aceste metadate constituie un contract de audit, nu o dovadă că un fișier referit conține măsurători autentice. Examinați bonurile efective înainte de a adăuga orice intrare. Endpointul pentru statisticile de management și tabloul de bord Video afișează o stare de pregătire conservatoare. Un alias de model configurat nu stabilește singur revizia acestuia sau SHA-ul candidatului aflat în execuție, astfel încât tabloul de bord curent raportează `HOLD` în loc să reutilizeze eligibilitatea dintr-un alt context de execuție. Selecția experimentală explicită rămâne separată de promovare; nicio valoare implicită nu este modificată automat.

Apelanții pot atașa o matrice opțională `transcript.cues` unei
componente video acceptate atunci când dețin deja text aliniat. Fiecare
indicație trebuie să conțină `text`, un interval finit `start`/`end` în
interiorul duratei examinate și o valoare `source` permisă (`client`,
`embedded` sau `audio-bridge`); `confidence` are valoarea implicită `1` și
trebuie să rămână între `0` și `1`. Indicațiile duplicate identic sunt
unificate. OmniRoute nu începe niciodată transcrierea pe baza acestor
metadate: indicațiile validate sunt copiate în rezultatul descris împreună cu
sursa, nivelul de încredere și intervalul și sunt redate ca observații care nu
sunt de încredere alături de subtitrările cadrelor. Textul invalid, în afara
intervalului sau fără proveniență este respins, nu amestecat în fluxul de
subtitrări. Ambele canale de transcriere din corpul cererii normalizează
proveniența furnizată la `client`, inclusiv etichetele `embedded` sau
`audio-bridge` autoafirmate. Numai un adaptor deținut de server poate atribui
acele etichete de încredere prin argumentul `trustedSource`, disponibil doar în
cod; un câmp JSON al cererii nu poate ajunge la acel argument. Textul
transcrierii rămâne conținut derivat din media care nu este de încredere,
indiferent de proveniență, și nu trebuie să determine niciodată autorizarea.

Un apelant avansat poate furniza o pistă `audioTranscript` pentru același
material video; aceasta este tratată ca text furnizat de client, nu ca dovadă a
transcrierii de către server. Punctul de fuziune rulează observațiile vizuale și
audio sub același termen-limită și semnal de anulare, le ordonează pe o
cronologie comună, elimină duplicatele identice și raportează un rezultat
parțial atunci când reușește doar una dintre componente. O valoare
`audioTranscript` invalidă degradează rezultatul la acel rezultat parțial —
descrierea vizuală este păstrată, iar ramura audio înregistrează un cod de
eșec igienizat — în loc să eșueze întregul material video. Disponibilitatea
fiecărei componente, indicatorul de rezultat parțial și codurile de eșec
igienizate sunt păstrate în rezultatul descris, în metadatele mecanismului de
protecție (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), în metadatele cache-ului rezultatului și în
contoarele de fuziune ale punții. Traseul implicit Video Bridge nu invocă
transformarea vorbirii în text și nu descarcă o a doua copie a materialului
media; fără acea pistă explicită, rămâne exclusiv video.

**Păstrarea transcrierilor (#12150 P1).** Aceasta se aplică automat ori de câte
ori Video Bridge (care este activat explicit) redă o indicație de transcriere —
nu există un indicator separat de păstrare. Atunci când o cerere redă orice
indicație de transcriere (un `transcript` declarat de apelant sau un
`audioTranscript` fuzionat), mecanismul de protecție o marchează
`videoBridgeObserved` și produce o copie umbră redactată a descrierii video —
o redare identică în care corpul de text liber al fiecărei indicații este
înlocuit cu `[redacted-video-transcript]`, construită prin substituirea
câmpului structurat al indicației înainte de asamblarea șirului (niciodată prin
analizarea textului aplatizat, astfel încât niciun conținut al indicației —
adversarial sau obișnuit, inclusiv corpuri care conțin `]`, precum
`[inaudible]`/`[music]` — nu poate supraviețui). Corpul persistent al cererii
din jurnalul apelului înlocuiește fiecare componentă de text derivată din video
cu acea copie umbră redactată, potrivită prin egalitatea conținutului; ancora
`fullText` este recitită din încărcătura finalizată a cererii, înainte de
mecanismul de protecție, astfel încât potrivirea reușește și după ce
mecanismele ulterioare din lanț pentru date PII și acreditări (prioritățile
10/95) rescriu pe loc textul descrierii și după ce inserarea mesajului de
sistem/transferul/memoria remodelează matricea de mesaje. Corpul trimis în
amonte modelului rămâne neschimbat. O cerere observată nu populează nicio
Memorie persistentă (atât extragerea derivată din cerere, cât și cea derivată
din răspuns este omisă), astfel încât propriul răspuns al modelului nu poate
reda textul transcrierii în Memorie.

**Câmpuri video brute (#12430).** Atunci când puntea este activată, iar
compatibilitatea video nativă este necunoscută sau absentă, câmpurile definite
`transcript`/`audioTranscript` activează și `videoBridgeObserved`, chiar și
după eșecul descrierii sau după atingerea limitei `maxVideos`. Valorile `null`
și șirurile goale sunt luate în calcul; câmpurile absente și metadatele care nu
țin de video nu sunt. Copiile păstrate redactează aceste câmpuri sau omit
cererea, iar cache-urile/Memoria sunt ocolite.

Pe aceste trasee de rezervă, indicațiile valide ale apelantului devin
componente `text`/`input_text` acceptate, nu câmpuri nestandardizate ale
furnizorului. Ambele piste furnizate în cerere rămân observații `client` care
nu sunt de încredere, împreună cu un avertisment explicit că materialul video
nu a fost descris și că marcajele temporale nu au fost verificate în raport cu
media. Limitele existente de 256 de indicații/64 KiB în total și per indicație
se aplică împreună celor două piste; marcajele temporale trebuie să se
încadreze în plafonul de 600 de secunde al brokerului și în orice fereastră de
focalizare furnizată. Pistele invalide sunt eliminate, nu transmise ca text
arbitrar; o pistă soră validă poate fi totuși utilizată, cu excepția cazului în
care bugetul lor combinat este depășit. Câmpurile nule/goale nu adaugă text.
Această soluție de rezervă nu adaugă nicio preluare de media sau transcriere.
Câmpurile de extensie ale transcrierii sunt eliminate din transportatorul video
de rezervă și din obiectele sale `video_url`/`source`. Lista de câmpuri permise
pentru transmisia OpenAI rămâne strictă; transportatorii video nativi
necunoscuți rămân disponibili, iar țintele cunoscute exclusiv textului păstrează
marcaje sigure. Copiile umbră pentru redactarea structurată protejează textul
de transcriere adăugat, în timp ce cererea originală deținută de apelant rămâne
neschimbată. Țintele cu suport nativ și punțile dezactivate își păstrează
comportamentul existent de ocolire.

Copiile suplimentare păstrate folosesc același semnal de cerere observată.
Instantaneul brut al cererii clientului, realizat înaintea mecanismului de
protecție, cererea în așteptare din memorie și jurnalul timpuriu al cererii
respinse înlocuiesc structural câmpurile de transcriere din componentele
video; solicitările textuale sintetizate de etapele pipeline-ului și de
transferul de context sunt redactate la destinația corpului persistent al
cererii. Indicatorul persistent `video_content_removed` face ca continuarea
`previous_response_id` să eșueze în mod sigur, în loc să reconstruiască textul
care a fost eliminat intenționat. Dacă o cerere observată își pierde copia umbră
pentru fiecare componentă înainte de jurnalizare sau chiar dacă una dintre mai
multe copii umbră video nu se potrivește după mutații ulterioare ale cererii,
corpul cererii păstrate este omis în întregime, în loc să păstreze o
transcriere redactată parțial.

Pentru o cerere observată, răspunsul unui model poate cita orice porțiune a
transcriptului fără o delimitare structurată clară. Prin urmare, câmpul
`responseBody` din jurnalul de apel persistent este înlocuit cu un marker de
omisiune; artefactul detaliat al conductei (care poate include corpurile
provenite de la upstream/client și fragmentele fluxului) nu este păstrat.
Memoriile cache semantică, de idempotență și de redare a raționamentului
ocolesc citirile și scrierile pentru cererea respectivă. Cererea către
furnizor și răspunsul vizibil clientului rămân neschimbate. Octeții timpurii de
keepalive sunt eliminați din bufferul temporar atunci când artefactul detaliat
este omis. Avertismentul EventStream malformat al Kiro raportează doar numărul
de octeți ai payloadului, niciodată conținutul acestuia sau eroarea brută a
parserului JSON.
Acest lucru nu afirmă că fiecare diagnostic independent al furnizorului/pluginului
a fost auditat; verificarea mai amplă a sink-urilor păstrate este urmărită în
#11658.

Ciclul de viață intern al `/api/modality-bridge/video/drilldown` este un
substrat de cache separat, autentificat prin loopback/token. Fiecare operație
necesită, de asemenea, un ID opac canonic al principalului. Înainte ca un
apelant de producție să fie activat, acesta trebuie să derive acel ID din
tenantul autentificat și nu trebuie niciodată să redirecționeze o valoare aleasă
de client. Cheile cache asociază acel principal cu ID-uri canonice de sesiune și
de referință video, stochează doar cheile derivate prin SHA-256 și limitează
atât citirile, cât și ștergerea la același principal. Cache-ul stochează cel
mult 16 cadre JPEG derivate per intrare, le expiră după zece minute și acceptă
citiri limitate `start`/`end` sau ștergerea explicită a sesiunii.

Fiecare principal este limitat la 16 intrări și la 64 MiB de date JPEG canonice.
Aceste limite sunt independente de plafonul global de 64 de intrări/256 MiB:
presiunea cotei unui principal evacuează numai intrările acelui principal
folosite cel mai demult înainte de a lua în considerare evacuarea LRU globală.
Intrările expirate sunt eliminate din evidența atât a principalului, cât și a
globalului la activitatea cache-ului, în timp ce anularea și eșecul validării nu
efectuează o înlocuire parțială.

Cache-ul respinge Base64 necanonic, umplerea excesivă, mediile non-JPEG,
fișierele JPEG malformate sau trunchiate și fișierele JPEG care produc un
avertisment în timpul unei decodări `sharp` complete, limitate, a imaginii.
Re-encodează fiecare imagine acceptată ca JPEG canonic, derivează lățimea și
înălțimea din octeții decodați în loc să aibă încredere în câmpurile furnizate
de apelant și elimină orice octeți poliglot rămași, în loc să-i păstreze. Doar
bufferul comprimat canonic, limitat, este contabilizat pentru ambele cote.
Limita JSON a wire-ului include supraîncărcarea Base64 pentru plafonul de 32 MiB
al intrării decodate. Fiecare derivare stocată înregistrează formatul/rezoluția
JPEG validată, politica de eșantionare, versiunea derivării, momentul creării,
hashul conținutului calculat de server și referința părinte hash-uită împreună
cu hashul conținutului părinte furnizat de apelantul de încredere. Anularea este
verificată între fazele asincrone de decodare/hash înainte de efectuarea
commitului atomic în cache.

Producătorul de producție reutilizează cadrele broker deja derivate numai după
o analiză vizuală reușită, fără o a doua descărcare/extragere a videoclipului.
Acesta necesită operatorul `modalityBridgeVideoDrilldownEnabled=true`,
`drilldown: true` strict pentru fiecare parte și un ID de înregistrare al unei
chei API autentificate. Valorile principalului/sesiunii declarate de client nu
stabilesc niciodată proprietatea. În lipsa tuturor celor trei condiții, acesta
nu face hash, nu redimensionează și nu păstrează cadre suplimentare. Eșecul
păstrării menține răspunsul vizual utilizabil. Cererile pentru care a fost
acordat consimțământul ocolesc întregul cache de rezultate video, astfel încât
rezultatele din cache să nu redea niciodată handle-uri.

Răspunsurile JSON și SSE reușite expun cel mult patru handle-uri opace în antetul
limitat `x-omniroute-video-drilldown`. Originile de browser autorizate pot citi
acel antet fără a extinde politica originilor CORS. Handle-urile noi folosesc
`v1.<32-byte random base64url
token>`, iar registrul păstrează numai hash-urile lor SHA-256. Parserul
cititorului/antetului acceptă, de asemenea, token-uri hexazecimale legacy de
64 de caractere. Consumatorul public autentificat este
`GET /api/v1/video-bridge/drilldown?handle=...`, controlat independent de
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Valoarea persistentă explicită
false revocă accesul chiar și atunci când fallback-ul legacy din variabila de
mediu `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` este activat. Păstrarea
în producție are fallback-ul legacy analog
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Ambele fallback-uri sunt
dezactivate implicit.

Consumatorul derivă proprietatea din cheia autentificată și aplică politica
cheii: atât GET, cât și DELETE aparțin categoriei de endpoint `video`, inclusiv
aliasurilor `/v1` și `/api/v1`. Cheile cu o listă de permisiuni pentru endpointuri
care nu este goală trebuie să includă `video`; cheile nerestricționate rămân
compatibile. Consumatorul returnează același 404 pentru handle-uri necunoscute,
expirate și handle-uri aparținând altei chei. Acceptă
`variant=preview|standard|detail` (dimensiunea JPEG maximă 320/640/1280, fără
mărire), `limit=1..8` (sau aliasul legacy `frames`, niciodată ambele), `page`
indexată de la zero și secunde opționale de focalizare `start`/`end`. Cheile de
interogare duplicate și ferestrele de focalizare inversate sunt respinse.
Fiecare variantă returnată are un hash al conținutului său real și metadate ale
rezoluției reale, asociate sursei păstrate. Variantele sunt derivate la citire,
nu stocate ca copii suplimentare păstrate. Răspunsul JSON, inclusiv Base64/anvelopa,
este limitat la 32 MiB; o pagină prea mare returnează 413, iar clientul trebuie
să solicite mai puține cadre. Citirile verifică anularea în jurul fiecărei
redimensionări și reverifică validitatea handle-ului înainte de returnare.
`DELETE` efectuat de proprietar este idempotent; ștergerea sau expirarea TTL
eliberează sursa păstrată și evidența utilizării.

Magazinul partajat este local procesului: handle-urile expiră la repornire și nu
sunt transferabile între procese OmniRoute independente. Statisticile de
gestionare expun politica efectivă de păstrare/acces la distanță și numai
numărul agregat de intrări/octeți păstrați, niciodată conținut media, referințe,
ID-uri de principal sau handle-uri. Panoul de setări Video afișează aceste
valori și poate persista ambele comutatoare de consimțământ. Această documentație
de implementare nu reprezintă dovezi pentru implementarea sau promovarea în
producție; acceptarea pe modele reale este urmărită separat.

Cadrele sunt subtitrate secvențial cu modelul Video configurat. O suprascriere
Video goală moștenește setarea Vision; dacă ambele sunt goale, rutarea automată
Vision selectează modelul efectiv capabil de procesare vizuală. Subtitrările reușite
înlocuiesc partea originală cu prefixul stabil `[Video description:` care marchează
de asemenea textul ca observație derivată dintr-un media nesigur și le indică
modelelor din aval să nu urmeze instrucțiunile găsite în media. Cheile cache-ului
pentru subtitrările cadrelor includ octeții JPEG, promptul, marca temporală și
modelul efectiv; numai subtitrările reușite sunt memorate în cache. Intrările din
cache păstrează modelul producător real care a avut succes, inclusiv un model de
rezervă; bridge-ul raportează `mixed` când cadre diferite au fost produse de
modele diferite. Un cache hit reutilizează identitatea producătorului în loc să o
eticheteze din nou ca planul de rutare solicitat. Cache-ul rezultatului pentru
întregul videoclip este indexat după fiecare intrare care modifică rezultatul —
promptul, modelul efectiv, politica de eșantionare, numărul de cadre, modul de
analiză semantică, amprenta SHA-256 a indicației de focalizare normalizate,
fereastra de focalizare, `transcript`, `audioTranscript` și indicatorul pentru
foaia de contact — astfel încât modificarea oricăreia dintre aceste dimensiuni
produce un cache miss, niciodată o reutilizare învechită. Versiunea politicii de
deduplicare vizuală, pragul și numărul limitat de cadre candidate sunt, de
asemenea, explicite în cheia și metadatele cache-ului rezultatului; prin urmare,
o modificare a politicii nu poate reutiliza o descriere învechită a întregului
videoclip. Metadatele rezultatului cache v4 păstrează modul și amprenta, niciodată
sarcina brută a utilizatorului. Metadatele mecanismului de protecție raportează
atât modul de analiză solicitat, cât și pe cel efectiv; un mod `focused` solicitat
fără text utilizabil furnizat de utilizator este raportat ca fiind efectiv `full`.

Mecanismul de protecție extrage fiecare parte video acceptată, dar descrie cel
mult `modalityBridgeVideoMaxVideos`. Pentru o țintă despre care s-a demonstrat că
are `supportsVideo === false`, videoclipurile eșuate și cele care depășesc limita
devin marcatori text expliciți și siguri, astfel încât niciun videoclip brut să nu
supraviețuiască. Atunci când capacitatea este necunoscută, acele părți își
păstrează suportul video; orice transcriere alternativă urmează conversia text
limitată de mai sus. Țintele cu `supportsVideo === true` ocolesc bridge-ul.
Semnalul de anulare al solicitării clientului se propagă prin descărcare, coada
brokerului, subprocese și apelurile de subtitrare; anulările opresc procesarea
între videoclipuri și nu permit niciodată revenirea deschisă la media brută.

Setările de runtime sunt stocate în DB și validate cu Zod:

| Cheie                               | Implicit    | Interval / comportament                                                                                            |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opțional, activare explicită                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` păstrează subtitrările generice; `focused` folosește contextul recent al utilizatorului, limitat și nesigur |
| `modalityBridgeVideoModel`          | `""`        | Moștenește modelul Vision Bridge                                                                                   |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` sau `segment_aware` proporțional; eșecul detectorului revine la `uniform`                 |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                     |

Valorile persistate moștenite pentru timeout-ul Video de peste 120 de secunde sunt
limitate la termenul-limită al brokerului; scrierile de setări noi peste această
limită sunt respinse.
`GET /api/modality-bridge/video/runtime` necesită localizare loopback locală de
încredere, marcată, înainte de autentificare sau de sondarea runtime-ului, apoi
necesită autentificare de administrare. Returnează doar `available`, versiuni
FFmpeg/ffprobe igienizate și un motiv fix atunci când runtime-ul nu este
disponibil. Endpointul intern de extragere nu este un API public de încărcare:
saturarea cozii returnează `503` împreună cu `Retry-After`, deconectarea
apelantului returnează `499`, iar termenul-limită fix al brokerului returnează
`504`. Răspunsurile convertite adaugă
`video->text;model=<visionModel>;parts=<videos>` la antetul central
`x-omniroute-modality-bridge`, fără a elimina segmentele Vision sau Audio.

### Mascator PII (`piiMasker.ts`)

Rulează în **ambele** etape.

- **`preCall`** clonează payload-ul, parcurge `system`, `messages`, `input` și
  `prompt` (inclusiv elementele simple de tip șir) și aplică
  `processPII()` (din `@/shared/utils/inputSanitizer`) câmpurilor `content`/`text`
  de tip șir. Când `PII_REDACTION_ENABLED=true`, datele PII detectate sunt
  redactate în payload-ul de ieșire. Acest lucru este independent de
  `INPUT_SANITIZER_MODE` (care controlează doar politica împotriva injectării de
  prompturi). Când redactarea este dezactivată, apelul înregistrează numărul de
  detectări fără a rescrie conținutul.
- **`postCall`** clonează în profunzime răspunsul, execută
  `sanitizePIIResponse()` împreună cu mascatorul pentru forma Responses API
  (`maskResponsesOutput` — acoperă
  `output_text` și `output[].content[].text`). Dacă are loc orice redactare,
  răspunsul modificat îl înlocuiește pe cel original.

Mecanismul de protecție nu blochează niciodată; doar adnotează (`meta.detections`,
`meta.redacted`) sau rescrie.

**Seiful reversibil (`PII_REVERSIBLE_VAULT_ENABLED`, implicit `false`).** Atunci când atât
`PII_REDACTION_ENABLED`, cât și `PII_REVERSIBLE_VAULT_ENABLED` sunt activate (suprascrierea din DB >
env > valoare implicită, citită o singură dată per solicitare), `handleChat` deschide un seif per
solicitare a clientului (`src/lib/pii/requestTokenVaultScope.ts`) și îl transmite fazei pre-apel
ca `GuardrailContext.tokenVault`. Apoi, mascatorul scrie tokenuri surogat precum
`<<PII_EMAIL_QWERTYUI_1>>` în loc de `[EMAIL_REDACTED]`, atât pentru regulile încorporate,
validate (GDPR/POPIA), cât și pentru regulile personalizate. Nonce-ul conține 8 litere majuscule
aleatorii per solicitare, iar aceeași valoare primește același token în cadrul solicitării.
Doar mascatorul emite tokenuri: protecția împotriva injectării de prompt și `/api/guardrails/test`
rulează fără seif și păstrează substituenții.

- Furnizorul, fiecare componentă a combinațiilor, reîncercarea, fiecare membru al panoului de fuziune și evaluatorul fuziunii
  văd doar tokenuri. Tokenurile sunt restaurate o singură dată, în răspunsul 2xx care părăsește
  `handleChat`: per câmp în SSE-ul analizat sintactic (un token împărțit între evenimente este
  totuși rezolvat; argumentele apelurilor de instrumente sunt escapate în JSON) sau per câmp într-un
  corp JSON, cu `Content-Length` recalculat. Sunt restaurate textul conținutului și al raționamentului,
  precum și argumentele apelurilor de instrumente. Corpurile erorilor (4xx/5xx) păstrează tokenurile.
- Eșecurile rămân private: dacă emiterea eșuează sau seiful refuză o valoare (1000 de intrări, 256 de
  caractere per valoare, 64 KB în total), se scrie în schimb substituentul; un token pe care seiful
  nu îl poate rezolva sau o restaurare care eșuează rămâne literal și este înregistrat doar un
  contor. Seiful nu conține temporizatoare și nu are stare globală; este golit când fluxul răspunsului
  se încheie, este anulat sau generează o eroare.
- Atunci când o solicitare a emis tokenuri, extragerea memoriei, salvarea idempotenței și ambele
  scrieri în cache-ul semantic sunt omise, deoarece nicio solicitare ulterioară nu ar putea rezolva
  aceste tokenuri. În jurnalele apelurilor, solicitarea și răspunsul furnizorului conțin tokenuri;
  corpul solicitării clientului înregistrat rămâne intrarea brută a clientului, ca în cazul mascării
  simple.
- Tokenurile folosesc un nonce aleator per solicitare, astfel încât prefixul promptului se schimbă la
  fiecare tură: stocarea în cache a promptului din partea furnizorului nu are loc pentru turele
  mascate, iar un token care revine într-o tură ulterioară (de exemplu prin
  `previous_response_id`) aparține unei solicitări vechi și rămâne literal.

#### Selectarea per tip, tipare personalizate și contoare de detectare

**Tabloul de bord → Setări → Securitate → Mascarea PII** alege _ce_ este mascat. Aceasta
nu activează mascarea: aceasta este în continuare controlată de `PII_REDACTION_ENABLED`
(solicitare) și `PII_RESPONSE_SANITIZATION` (răspuns + SSE), ambele fiind dezactivate implicit.

- **Selectarea per tip** — identificatorii încorporați sunt enumerați în
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nedefinirea înseamnă fiecare tip
  (comportamentul anterior existenței acestei setări). Tiparul `ssn_us` al motorului de solicitări
  corespunde lui `ssn`. Șabloanele (Minimal, Standard, Financial, Brazilian, USA, GDPR, POPIA,
  Full) doar completează casetele de selectare din interfață.
- **Identificatorii GDPR și POPIA** — doisprezece identificatori încorporați care acoperă
  identificatorii personali din UE și Africa de Sud (tabelul de mai jos). Expresiile regulate,
  validatorii și etichetele de jurisdicție se află într-un singur tabel,
  `src/shared/utils/piiPatterns.ts`, utilizat atât de igienizatorul răspunsului
  (`src/lib/piiSanitizer.ts`), cât și de mascatorul solicitării
  (`src/shared/utils/inputSanitizer.ts`). O potrivire este redactată doar atunci când validatorul
  o acceptă; o simplă succesiune de cifre nu este niciodată suficientă. Un operator care a salvat
  o selecție restrânsă înainte ca acești identificatori să existe păstrează comportamentul avut
  până când noii identificatori sunt bifați.
- **Tipare personalizate** — până la 20 de tipare regex sau wildcard (`*` = până la 64 de caractere
  care nu sunt spații albe, `?` = unul). Potrivirile devin `[CUSTOM_REDACTED]`.
  Fiecare tipar trece prin `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): cel mult 500 de caractere, flagurile sunt limitate la
  `g i m s u`, trebuie să poată fi compilat, trebuie să treacă de `safe-regex` (revenire
  catastrofală) și nu trebuie să se potrivească cu un șir gol sau cu un substituent de redactare.
  Un tipar care eșuează este refuzat la salvare și la testare, iar un rând stocat care eșuează este
  omis în timpul rulării, în loc să fie compilat. Tiparele personalizate rulează numai când mascarea
  este activată.
- **Contoare de detectare** — contoare per tip (niciodată valorile potrivite), păstrate în memorie
  și resetate la repornire (`src/lib/pii/piiDetectionStats.ts`). Acestea cresc numai cât timp
  mascarea este activată.

Setările se află în tabelul `key_value` (spațiul de nume `pii_settings`,
`src/lib/db/piiSettings.ts`) și sunt citite printr-un cache de 1 s. API:

| Metodă | Cale                     | Scop                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Starea flagurilor, `enabledTypes`, `customPatterns`, contoarele de detectare    |
| `PUT`  | `/api/settings/pii`      | Înlocuiește `enabledTypes` (`null` = toate) și/sau `customPatterns`             |
| `POST` | `/api/settings/pii/test` | Testează o singură regulă pe un eșantion de cel mult 8 KB; nimic nu este stocat |

Toate cele trei necesită autentificare de gestionare și validează corpul cu Zod
(`src/shared/validation/schemas/piiSettings.ts`). Cu autentificarea dezactivată
(`requireLogin=false`), `GET` și endpointul de testare sunt deschise, însă `PUT` necesită în
continuare o sesiune de tablou de bord, o cheie API cu domeniul `manage`, un token de acces
`oma_` cu domeniul de scriere sau unul superior, ori tokenul CLI sau tokenul de serviciu intern
trimis din loopback.

#### Identificatori GDPR (UE) și POPIA (Africa de Sud)

| Id                  | Identifier                        | Validare                                                                                        |
| ------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                              | Țară cunoscută, lungimea exactă pentru țara respectivă, ISO 13616 MOD-97-10                     |
| `eu_vat`            | Număr TVA UE                      | Prefix de stat membru cunoscut și formatul numeric al statului respectiv (fără verificare VIES) |
| `es_dni_nie`        | DNI / NIE spaniol                 | Literă de control (valoare modulo 23); NIE este `X/Y/Z` + 7 cifre                               |
| `it_codice_fiscale` | Codice Fiscale italian            | Literă de control calculată pe baza tabelelor pentru poziții impare/pare                        |
| `pl_pesel`          | PESEL polonez                     | Sumă de control ponderată și o dată de naștere codificată care există                           |
| `nl_bsn`            | BSN olandez                       | Verificarea 11 (ponderi 9..2, -1)                                                               |
| `de_steuer_id`      | Steuer-ID german                  | ISO 7064 Mod 11,10 plus regulile structurii cifrelor (fără 0 la început)                        |
| `se_personnummer`   | personnummer suedez               | Luhn pentru ultimele zece cifre și o dată de naștere plauzibilă (10 sau 12 cifre)               |
| `za_id`             | Număr de identificare sud-african | Luhn pentru toate cele 13 cifre, lună/zi de naștere valide, cifră de cetățenie 0 sau 1          |
| `za_phone`          | Telefon sud-african               | Prefix `+27` / `27` sau forma națională `0..` scrisă cu un spațiu sau o cratimă                 |
| `za_vat`            | Număr TVA sud-african             | 10 cifre care încep cu `4` **și** "VAT" / "BTW" în cele 48 de caractere anterioare              |
| `za_tax_ref`        | Referință fiscală sud-africană    | 10 cifre care încep cu `0`-`3`, Luhn, **și** "tax" / "SARS" în cele 48 de caractere anterioare  |

Deoarece formatele alcătuite numai din cifre se suprapun cu numerele de comandă,
numerele de compilare și marcajele temporale, cele mai slabe (`za_vat`,
`za_tax_ref`) necesită indiciul reprezentat de cuvântul-cheie, iar un număr
simplu de zece cifre începând cu `0..` nu este tratat ca număr de telefon sud-african.
IBAN-urile cu spații (`GB29 NWBK ...`) nu sunt identificate. Pe calea de
procesare în flux, indiciul este căutat numai în fragmentul curent. Identificatorii
sunt plasați înaintea modelelor generice de telefon, astfel încât un identificator
validat își păstrează propriul substituent
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Șabloanele `gdpr` și `popia`
selectează identificatorii UE și, respectiv, sud-africani. Mascarea rămâne
opțională (Regula strictă #20): nimic de aici nu modifică valoarea implicită a
unui indicator de funcționalitate.

### Injecția de prompt (`promptInjection.ts`)

Detectează structuri adversariale în conținutul furnizat de utilizator și aplică
politica configurată. Comportamentul este controlat de variabile de mediu și de
opțiunile constructorului:

| Setare          | Variabilă de mediu                                                                                      | Implicit | Efect                                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Activat         | `INPUT_SANITIZER_ENABLED`                                                                               | `true`   | Când este `false`, mecanismul de protecție se oprește imediat.                                                                                                                                                               |
| Mod             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                         | `warn`   | Politica pentru injecții: `block`, `warn` sau `log`. (`redact` este acceptat pentru compatibilitate retroactivă, dar **nu** elimină textul injecției; rescrierea PII din cerere este controlată de `PII_REDACTION_ENABLED`.) |
| Prag de blocare | opțiunea `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Severitatea minimă necesară pentru blocare. La valoarea implicită, severitatea medie este doar observată.                                                                                                                    |

**Prioritatea modurilor** (`getMode`): `options.mode` al apelantului →
suprascrierea indicatorului de funcționalitate din baza de date pentru
`INJECTION_GUARD_MODE` (Dashboard → Setări →
Indicatori de funcționalitate) → variabila de mediu `INJECTION_GUARD_MODE` →
variabila de mediu `INPUT_SANITIZER_MODE` →
`warn`. Prin urmare, o suprascriere din dashboard are prioritate față de
variabilele de mediu, astfel încât interfața Indicatori de funcționalitate
controlează în timp real mecanismul de protecție activ (fără repornire). Citirea
din baza de date este sigură în caz de eroare:
dacă eșuează, mecanismul de protecție revine la comportamentul bazat pe
variabilele de mediu, iar atunci când nu este setată nicio suprascriere,
comportamentul este identic cu rezoluția bazată numai pe variabilele de mediu.

Surse de detectare:

1. `sanitizeRequest()` din `@/shared/utils/inputSanitizer` (setul comun de detectoare
   utilizat în alte părți ale fluxului).
2. `DEFAULT_GUARD_PATTERNS` integrat (în prezent `system_override_inline` și
   `markdown_system_block`, ambele cu severitate `high`).
3. `customPatterns` opțional transmis prin opțiunile constructorului (șiruri,
   expresii regulate sau înregistrări de forma `{ name, pattern, severity }`).

Când `mode === "block"` **și** cel puțin o detectare atinge pragul de severitate,
`preCall` returnează `{ block: true, message: "Request rejected:
suspicious content detected" }`. În modurile `warn`/`log`, mecanismul de protecție
înregistrează evenimentul, dar permite apelul. Funcția ajutătoare comună
`evaluatePromptInjection()` este, de asemenea, exportată pentru apelanții care
trebuie să evalueze prompturi fără a trece prin registru.

**Limita scanării (v3.8.20):** detectorul inspectează doar primii **16 KB** din
textul promptului concatenat — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 de octeți) în
`src/shared/utils/inputSanitizer.ts`. Atât `detectInjection()`, cât și
`evaluatePromptInjection()` aplică `slice(0, MAX_INJECTION_SCAN_BYTES)` înainte de a
rula bucla de potrivire a tiparelor. Directivele de injecție se află în apropierea
începutului unei intrări, astfel încât această limitare reduce consumul de CPU/GC al
expresiilor regulate pentru payloaduri de sute de KB, fără a slăbi detectarea (cf.
#3932, #4041).

### Masca de acreditări (`credentialMasker.ts`)

Rulează în **ambele** etape, ultima în lanțul implicit (prioritatea `95`). Redactează
tiparele bine-cunoscute de chei API / tokenuri secrete din payloadul de ieșire
(conținutul mesajelor, argumentele apelurilor de instrumente, rezultatele
instrumentelor) **și răspunsul furnizorului**, astfel încât o acreditare lipită într-un
prompt (sau retransmisă de rezultatul unui instrument) să nu fie divulgată
furnizorului din amonte sau clientului.

- **Doar cu activare explicită**, conform aceleiași convenții ca redacționarea PII (adiacentă
  Regulii stricte #20): dezactivată dacă `settings.credentialRedactionEnabled === true` **sau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Când este dezactivată, protecția nu face nimic —
  nu blochează niciodată și nu rescrie niciodată.
- `redactCredentials()` parcurge arborele complet al payloadului/răspunsului (`walkValue()`,
  sigură împotriva poluării prototipurilor și sigură pentru cicluri prin `WeakSet`) și
  înlocuiește potrivirile cu un substituent `[REDACTED:<type>]`, clonând doar ramurile care
  s-au modificat efectiv.
- `CREDENTIAL_PATTERNS` acoperă chei ale furnizorilor LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokenuri VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), chei de plată (Stripe, Square), chei cloud
  (cheie de acces AWS, Twilio, SendGrid, Mailgun), chei private / JWT-uri,
  șiruri de conexiune care conțin acreditări (`mongodb://user:pass@...`, etc.) și un
  tipar generic pentru valoarea antetelor `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Cheile în format de antet (`authorization`, `x-api-key`, `api-key`, `apikey`) sunt
  redactate structural (doar valoarea, păstrând prefixul schemei precum
  `Bearer `/`Basic `), nu prin expresia regulată generică pentru text.
- Protecția nu blochează niciodată; doar rescrie (`modifiedPayload` /
  `modifiedResponse`) și adnotează (`meta.credentialsRedacted`, `meta.count`).

Protecție de regresie: `tests/unit/credential-masker-guardrail.test.ts`.

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

## Ordinea execuției

Pentru fiecare solicitare care trece prin `src/sse/handlers/chat.ts` și
`open-sse/handlers/chatCore.ts` (rutele din familia chat enumerate în
[Acoperire și limite](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` construiește lista de ignorare pe baza cheii API, a corpului și a antetelor.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` rulează guardrail-urile în ordinea crescătoare a priorității:
   - Guardrail-urile dezactivate sunt înregistrate ca `skipped`.
   - `preCall` al fiecărui guardrail poate rescrie payload-ul prin `modifiedPayload`.
   - Primul `block: true` întrerupe lanțul, iar handlerul returnează un răspuns de respingere al guardrail-ului.
3. Payload-ul (eventual rescris) este transmis către rutarea combo și expedierea către serviciul upstream.
4. **Doar pentru răspunsurile fără streaming:** după asamblarea răspunsului,
   `guardrailRegistry.runPostCallHooks(...)` rulează același lanț asupra răspunsului. `block: true` aici elimină răspunsul upstream și returnează HTTP 400. Răspunsurile transmise prin streaming omit complet acest pas.
5. **Doar pentru vault-ul reversibil:** atunci când solicitarea a generat token-uri, `handleChat`
   le restaurează în răspunsul 2xx pe care îl returnează, după hook-urile post-call și transformarea PII pentru streaming, astfel încât `PII_RESPONSE_SANITIZATION` să vadă token-urile și datele PII generate de model, niciodată un original restaurat.

Guardrail-urile care generează excepții sunt înregistrate cu `error: <message>` și sunt jurnalizate prin `logger.warn`, însă lanțul continuă — comportamentul fail-open este intenționat.

## Acoperire și limite

Registrul de guardrail-uri este conectat doar la conducta de chat. Aceste limite sunt
stabilite de `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` și
`tests/unit/guardrail-pipeline-characterization.test.ts`; actualizați intenționat
aceste teste atunci când se modifică comportamentul.

### Unde rulează hook-urile

| Hook / control                             | Rulează pentru                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                          | Cereri gestionate de `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (și `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` și proxy-ul de chat Telegram. Include și endpointul de test al tabloului de bord `/api/guardrails/test`. O blocare pre-call returnează HTTP 400. |
| `runPostCallHooks`                         | Doar răspunsuri de chat **non-streaming** (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Răspunsurile transmise în flux nu ajung niciodată aici.                                                                                                                                                                                                                                                                                            |
| PII în streaming                           | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), conectat prin `streamingPipeline.ts` atunci când `PII_RESPONSE_SANITIZATION` este activat. Nu este un guardrail, astfel încât canalele de dezactivare nu îl afectează.                                                                                                                                                                                                                 |
| Seiful PII reversibil                      | Doar cererile gestionate de `handleChat`, atunci când `PII_REDACTION_ENABLED` și `PII_REVERSIBLE_VAULT_ENABLED` sunt activate. Tokenurile sunt generate de pre-call-ul `pii-masker` și restaurate la ieșirea din `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Dezactivarea `pii-masker` pentru o cerere înseamnă că nu se generează nimic.                                                                                                |
| Middleware-ul `injection-guard` (moștenit) | Fiecare rută `/v1` care conține prompturi, inclusiv familia chat (consultați [acoperirea rutelor](#injection-guard-route-coverage--red-team-phase-8--block-d)). Doar injecțiile în prompturi.                                                                                                                                                                                                                                                        |

### Ce nu este acoperit

- **Rutele pentru media, embeddings și date** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nu ajung niciodată la registru. Nu
  se execută mascarea PII, mascarea acreditărilor sau puntea de modalitate. Singura
  lor verificare este middleware-ul moștenit `injection-guard`.
- **Răspunsurile transmise în flux** nu beneficiază de guardrail-uri post-call: nu
  există `pii-masker` sau `credential-masker` post-call și nici blocare post-call.
  Se aplică doar transformarea PII pentru streaming (atunci când
  `PII_RESPONSE_SANITIZATION` este activat). O acreditare transmisă înapoi într-un
  răspuns transmis în flux nu este redactată.
- **Canalele de dezactivare în raport cu middleware-ul (în mod intenționat):** middleware-ul evaluează injecția în prompt prin propriul apel la `evaluatePromptInjection()`, fără să transmită nicio listă de dezactivare controlată de apelant. Modul `block` este o limită obligatorie pe care dezactivările controlate de apelant nu o pot ocoli, inclusiv pe rutele din familia chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Dezactivarea
  `prompt-injection` omite doar guardrail-ul din registru.

### Ce vede un răspuns înainte de post-call

Pe calea non-streaming, ordinea este: extragerea memoriei → executarea instrumentelor
încorporate → guardrail-uri post-call → ieșirea în urma blocării post-call → stocarea în
cache-ul semantic.

- **Extragerea memoriei** și **executarea instrumentelor** văd răspunsul înainte ca
  guardrail-urile post-call să îl poată rescrie sau bloca. Începând cu
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), extragerea
  memoriei trece textul extras prin `sanitizePII` atunci când
  `PII_RESPONSE_SANITIZATION` este activat (atât pentru streaming, cât și pentru
  non-streaming), însă un răspuns pe care post-call îl blochează ulterior a fost deja
  pus la dispoziția memoriei și instrumentelor.
- **Cache-ul semantic** stochează răspunsul după post-call, astfel încât stochează
  răspunsul rescris, iar un răspuns blocat nu este niciodată memorat în cache.
  Înregistrările cache sunt asociate fiecărei chei API.

## Configurare

Variabilele de mediu citite de mecanismele de protecție încorporate:

| Variabilă                             | Utilizată de               | Efect                                                                                                                                                      |
| ------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Setați la `false` pentru a dezactiva complet detectarea.                                                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Politica pentru injecții: `warn`, `block` sau `log`. Valoarea legacy `redact` nu rescrie textul injecției.                                                 |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Modul mecanismului de protecție împotriva injecțiilor; este și un indicator de funcționalitate din DB care **suprascrie** variabilele de mediu (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Severitatea minimă pe care `MODE=block` o respinge: `high` (implicit), `medium` sau `low`.                                                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Alias legacy pentru `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Când este `true`, datele PII din solicitare sunt redactate (independent de modul de injecție).                                                             |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Împreună cu `PII_REDACTION_ENABLED`, generează tokenuri reversibile și le restaurează în răspunsurile 2xx.                                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Controlează comportamentul mecanismului de mascare pe partea de răspuns.                                                                                   |

Mecanismele de protecție Modality Bridge citesc configurația la runtime din magazinul
de setări bazat pe DB (`getSettings()`), nu din variabilele de mediu. Cheile principale ale Vision sunt
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` și
`modalityBridgeCacheMaxEntries`. Cheile legacy
`visionBridge*` sunt acceptate numai ca fallback documentat pentru citirea dintr-un singur ciclu;
scrierile din dashboard folosesc cheile principale. Valorile implicite și resolverul de fallback se află în
`src/shared/constants/modalityBridgeDefaults.ts`, iar constantele legacy sunt păstrate în
`src/shared/constants/visionBridgeDefaults.ts`.

Audio folosește `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` și `modalityBridgeAudioMaxClips`, precum și setările comune
`modalityBridgeCache*`. Audio nu are fallback pentru chei legacy, deoarece aceste chei au fost introduse odată cu schema Modality Bridge.

Video folosește `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` și
`modalityBridgeVideoTimeout`, precum și setările comune
`modalityBridgeCache*`.
Este dezactivat implicit deoarece FFmpeg/ffprobe sunt dependențe operaționale opționale, iar generarea descrierilor cadrelor adaugă latență și costuri pentru modele.

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
