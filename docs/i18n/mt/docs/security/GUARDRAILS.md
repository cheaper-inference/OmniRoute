# Guardrails (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sors awtorevoli:** `src/lib/guardrails/`
> **Aġġornat l-aħħar:** 2026-08-29 — v3.8.51 (il-provenjenza tat-traskrizzjoni ta’ Video Bridge tiġi ddikjarata minn min isejjaħ,
> u għadha mhix ivverifikata mis-server — iċċarat skont #11661)

Il-guardrails jinfurzaw is-sikurezza, il-politiki u t-trasformazzjonijiet tal-kontenut fil-konfini
bejn OmniRoute u l-fornituri upstream. Kull guardrail jista’ jispezzjona (u,
b’mod fakultattiv, jirrifjuta, jittrasforma jew jannota) il-payloads tat-talbiet (`preCall`) u
r-risposti upstream (`postCall`).

Is-sistema hija **fail-open**: jekk guardrail jitfa’ eċċezzjoni waqt l-eżekuzzjoni, ir-reġistru
jirreġistra l-iżball u jkompli bil-guardrail li jmiss minflok ifalli
t-talba. L-imblukkar huwa deċiżjoni espliċita (`block: true`), qatt aċċident.

## Protezzjonijiet Inkorporati

Ir-reġistru jgħabbi awtomatikament sitt protezzjonijiet skont l-ordni ta’ prijorità waqt l-importazzjoni
(ara `registry.ts` → `registerDefaultGuardrails()`):

| Prijorità | Isem                | Stadju/i       | Fajl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numri ta’ prijorità aktar baxxi jitħaddmu **l-ewwel**.

### Pont tal-Viżjoni (`visionBridge.ts`) — Pont tal-Modalità PR-1

Jinterċetta talbiet li fihom immaġnijiet u li huma mmirati lejn **mudelli mingħajr viżjoni**, u jew
jidderieġi mill-ġdid it-talba kollha lejn mudell li jappoġġja l-viżjoni, jew jissostitwixxi l-partijiet
tal-immaġni b’deskrizzjonijiet testwali prodotti minn mudell tal-viżjoni konfigurabbli qabel
is-sejħa upstream. Dan jippermetti lill-fornituri li jaħdmu bit-test biss jimmaniġġjaw
payloads multimodali b’mod trasparenti.

Fluss:

1. Aqbeż jekk il-mudell fil-mira diġà jappoġġja l-viżjoni (sakemm ma jidhirx fil-
   lista ta’ pontijiet sfurzati `isVisionBridgeForcedModel`).
2. Oħroġ il-partijiet tal-immaġni permezz ta’ `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), li tiddelega lid-**ditekter unifikat tal-midja**
   `detectMediaParts()` f’`open-sse/utils/mediaParts.ts` — is-sors uniku
   tal-verità kondiviż mal-filtru tal-kompatibbiltà combo.
   L-estrazzjoni hija limitata permezz ta’ lista ta’ permessi għall-partijiet tal-ogħla livell bil-forom
   li `replaceImageParts` jista’ jerġa’ jdaħħal (il-kuntratt extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, u Responses API `input_image`. Sejbiet imqiegħda ġewwa oħrajn u
   forom indikattivi biss huma materjal għall-filtru combo u qatt ma jiġu estratti.
   Aqbeż jekk ma jinstab xejn.
3. Irrisolvi l-konfigurazzjoni waqt it-tħaddim permezz ta’ `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): il-kjavi l-ġodda tas-settings `modalityBridge*`
   jieħdu preċedenza; il-kjavi legati `visionBridge*` jibqgħu bħala **fallback għal
   ċiklu wieħed** (tieqa ta’ rollback). Aqbeż qabel kwalunkwe traversar tal-midja meta
   l-pont ikun diżattivat.
4. Is-selettur tal-modalità (`modalityBridgeVisionMode`, ara t-tabella hawn taħt) jiddeċiedi
   bejn direzzjoni mill-ġdid u deskrizzjoni. Id-direzzjoni mill-ġdid tirritorna `modifiedPayload` fejn jinbidel
   biss `model`, flimkien mal-meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Rotta tad-deskrizzjoni: illimita l-immaġnijiet għal `maxImages`, ikkomponi l-prompt konxju tal-kompitu,
   ikkonsulta l-cache tad-deskrizzjonijiet, sejjaħ il-mudell tal-viżjoni **b’mod parallel**
   (`Promise.allSettled`), u daħħal partijiet testwali `[Image N]: <description>`
   minflokhom. Deskrizzjoni li tfalli tipproduċi `null` u l-parti oriġinali tal-immaġni tiġi
   **ppreservata** (#4012) — ħlief fir-rotta combo tad-deskrizzjoni meta kull
   deskrizzjoni tkun falliet, fejn upstream ikkonfermat bħala mingħajr viżjoni jirċievi placeholder
   `(unavailable — no vision-capable provider connected)` minflok (#8430).
6. Irritorna `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selettur tal-modalità (`modalityBridgeVisionMode`)

| Modalità   | Default | Imġiba                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Euristika legata, mhux mibdula (#6640/#7204): mudelli mhux combo/`auto/` jiġu diretti mill-ġdid lejn l-aħjar mudell tal-viżjoni sakemm il-mudell oriġinali ma jkollux diġà kredenzjali li jistgħu jintużaw (f’dak il-każ issir deskrizzjoni); miri combo dejjem jiġu deskritti.                                                                                     |
| `describe` |         | Dejjem iddeskrivi — il-blokka tad-direzzjoni mill-ġdid tinqabeż kompletament; il-mudell magħżul mill-utent dejjem iwieġeb.                                                                                                                                                                                                                                          |
| `reroute`  |         | Sforza d-direzzjoni mill-ġdid: il-protezzjoni li żżomm il-mudell bi kredenzjali tinqabeż. Il-protezzjoni tal-kredenzjali tal-**mira** tad-direzzjoni mill-ġdid xorta tapplika — meta ma teżisti ebda mira tal-viżjoni li tista’ tintuża, it-talba tgħaddi għad-deskrizzjoni sabiex immaġnijiet mhux ipproċessati qatt ma jaslu għand backend tat-test biss (#8430). |

Il-modalitajiet sfurzati jagħmlu short-circuit **qabel** ma titħaddem l-euristika awtomatika; l-imġiba `auto`
hija identika byte b’byte għall-protezzjoni ta’ qabel PR-1.

#### Ambitu tal-kjavi tal-API (`visionBridgeKeyScope.ts`)

Meta l-kjavi tal-API tas-sejjieħ tirrestrinġi `allowedConnections`, pools tal-kwota
(`allowedQuotas`) jew mudelli (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), il-pont jagħżel biss
mudelli ta’ direzzjoni mill-ġdid u deskrizzjoni li l-kjavi tista’ tuża, fuq konnessjonijiet li l-kjavi tista’
tuża. Is-sejħa tad-deskrizzjoni mbagħad dejjem tgħaddi mis-self-loop ta’ OmniRoute bl-
header `x-omniroute-self-loop-key-id`, sabiex it-talba taċ-chat riċeventi
terġa’ tinforza l-politika ta’ konnessjoni u mudell ta’ dik il-kjavi. `enforceApiKeyPolicy()`
jirrispetta dak il-header biss flimkien mas-self-loop bearer, għalhekk jista’ biss
jirrestrinġi aktar l-aċċess, u id li ma tiġix riżolta tiġi rrifjutata.

Jekk l-ebda mudell tal-viżjoni ma jkun permess għall-kjavi, ir-rotta tad-deskrizzjoni twarrab u
t-talba tgħaddi mingħajr tibdil, bl-istess imġiba fail-open bħal protezzjoni
diżattivata (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Talbiet mingħajr kjavi, u kjavi mingħajr dawn ir-restrizzjonijiet, jaġixxu eżattament bħal
qabel.

#### Prompt tad-deskrizzjoni konxju tal-kompitu (`modalityBridgeVisionTaskAware`)

Il-valur awtomatiku huwa **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) iżżid
it-test tal-**aħħar messaġġ tal-utent** (maqtugħ għal 500 karattru) mal-prompt
bażiku tad-deskrizzjoni, biex tidderieġi d-deskrizzjoni lejn dak li fil-fatt talab
l-utent (il-mudell codex-vision-proxy) u titlob lill-mudell tal-viżjoni jittraskrivi
t-test viżibbli. Meta l-flag ikun mitfi — jew ma jkun hemm l-ebda test tal-utent —
il-prompt bażiku jintuża mingħajr tibdil.

It-talba kompatibbli ma’ OpenAI tal-istess self-loop tad-deskrizzjoni (`callVisionModelSingle()`
f’`visionBridgeHelpers.ts`) dejjem titlob `image_url.detail: "high"` —
mingħajr kundizzjonijiet, għal kull min isejjaħha/fornitur, u mhix ikkontrollata
minn xi sinjal tal-klijent. Il-kampjunar b’dettall baxx inaqqas il-preċiżjoni tal-OCR
proprju għall-kompitu ta’ traskrizzjoni tat-test li jitlob dan il-prompt, għalhekk
it-talba tad-deskrizzjoni nnifisha dejjem titlob dettall għoli irrispettivament
mil-livell ta’ dettall użat mit-talba oriġinali li waslet. Dan jaffettwa biss
il-body tat-talba interna tad-deskrizzjoni; ma jbiddilx kif OmniRoute jgħaddi
`image_url.detail` ta’ min jagħmel it-talba fit-talba primarja — dak il-valur
awtomatiku jiġi applikat separatament, u biss għal klijenti OpenCode identifikati,
f’`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Il-fergħa
bil-format fuq il-wire ta’ Anthropic tas-self-loop tad-deskrizzjoni ma għandhiex
field `detail` u mhix affettwata minn ebda wieħed minn dawn il-valuri awtomatiċi.

#### Limitu tal-output tad-deskrizzjoni (`modalityBridgeVisionMaxChars`)

| Ċavetta                        | Valur awtomatiku | Medda             |
| ------------------------------ | ---------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`              | `0` jew 100–50000 |

`0` (il-valur awtomatiku) jfisser **mingħajr limitu** — id-deskrizzjoni rritornata
minn `callVisionModel()` tgħaddi mingħajr modifika, u b’hekk jinżamm l-aġir
eżistenti. Kull valur fil-medda 100–50000 jaqta’ d-deskrizzjoni u jżid
is-suffiss `…` qabel ma tiddaħħal lura bħala `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` f’`src/lib/guardrails/visionBridge.ts`).
Għolli dan għal kompiti tal-OCR b’ħafna dettalji fejn il-mudell downstream
jeħtieġ it-traskrizzjoni sħiħa; baxxih biex tillimita l-użu tat-tokens minn
mudelli tal-viżjoni li jiġġeneraw ħafna test. Il-field tad-dashboard jinsab
fil-pannell Avvanzat tat-tab Vision (`modality-bridge-max-chars`
f’`ModalityBridgeVisionTab.tsx`) u jgħolli kull valur bejn 1 u 99 sal-limitu
minimu ta’ 100, filwaqt li jħalli `0` espliċitu mhux mibdul — `0` huwa valur
Zod validu fih innifsu (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`),
mhux sempliċement il-valur awtomatiku ta’ “mhux issettjat”.

#### Cache tad-deskrizzjoni (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL fil-memorja għall-output tad-deskrizzjonijiet, kondiviż
mal-proċess kollu. Ċavetta = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
b’framing bi prefiss tat-tul (mingħajr kolliżjonijiet fil-konfini bejn il-fields).
Il-komponent tal-mudell huwa l-mudell tal-bridge **ikkonfigurat**, mhux il-mudell
li fil-fatt wieġeb — `callVisionModel` jista’ juża fallback internament, u
l-użu ta’ ċavetta għal kull tentattiv jifframmenta l-cache. Deskrizzjonijiet
li jfallu qatt ma jinżammu fil-cache. Settings:

| Ċavetta                         | Valur awtomatiku | Medda   |
| ------------------------------- | ---------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`           | —       |
| `modalityBridgeCacheTtlMinutes` | `60`             | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`            | 10–5000 |

#### Normalizzazzjoni ta’ immaġnijiet remoti (self-loop tad-deskrizzjoni/fetch tal-base64)

Meta l-bridge nnifsu jġib immaġni **remota** — is-self-call tad-deskrizzjoni
ta’ Anthropic u l-konverżjoni għal base64 bil-format fuq il-wire ta’ Claude
(`ensureBase64ImagesForClaudeWire`), it-tnejn permezz ta’
`fetchRemoteImageAsDataUri()` f’`visionBridgeHelpers.ts` — id-data URI
li tirriżulta tgħaddi minn `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) qabel ma tiġi inkorporata fit-talba
tal-mudell tal-viżjoni. Immaġnijiet kbar wisq jitnaqqsu għal **tarf twil ta’
2048px** (li jaqbel mal-limitu tar-ridimensjonar li OpenAI/Anthropic diġà
japplikaw min-naħa tas-server), u dan inaqqas il-bytes tal-upload/latency
mingħajr ma jbiddel dak li jara l-mudell tal-viżjoni. Ir-ridimensjonar juża
`sharp`, mgħobbi permezz ta’ import dinamiku: fuq pjattaforma fejn il-binary
nattiv tiegħu jonqos milli jitgħabba, `normalizeDataUri()` **qatt ma titfa’
eċċezzjoni** — minflok tgħaddi l-bytes oriġinali mingħajr tibdil, biex il-path
tad-deskrizzjoni/konverżjoni għal base64 dejjem jibqa’ jaħdem. Bytes li mhumiex
ta’ immaġni (fetch li ma rritornax immaġni li tista’ tiġi dekodifikata) ukoll
jgħaddu mingħajr tibdil. Din in-normalizzazzjoni hija limitata għall-immaġnijiet
li l-bridge jġib għas-self-call tiegħu stess — qatt ma tiġi applikata għall-payload
mhux ipproċessat li jgħaddi direttament mingħand min jagħmel it-talba, skont
il-prinċipju li l-modifika ssir biss meta tintgħażel espliċitament (Regola
Stretta #20).

#### Skema tas-settings + migrazzjoni

Iċ-ċwievet il-ġodda `modalityBridge*` jiġu vvalidati minn Zod
f’`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
it-trio `modalityBridgeCache*`, u l-grupp `modalityBridgeAudio*` użat
mill-Audio Bridge. Il-migrazzjoni `141_modality_bridge_settings.sql`
tikkopja l-valuri legacy eżistenti `visionBridge*` lejn iċ-ċwievet il-ġodda
korrispondenti (hija idempotenti u qatt ma tissostitwixxi valur
`modalityBridge*` issettjat minn operatur); iċ-ċwievet legacy jibqgħu
aċċettati bħala fallback għall-qari għal ċiklu wieħed ta’ rilaxx.

#### Header tat-trasparenza + statistika

Ir-responses trasformati permezz tad-deskrizzjoni jkollhom
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(mibni minn `buildModalityBridgeHeader()` f’`modalityBridge/bridgeStats.ts`,
u miżjud minn `withModalityBridgeHeader()` f’`src/sse/handlers/chatHelpers.ts`).
Talbiet rerouted **ma jkollhom l-ebda** header — il-payload ma nbidilx u
l-bidla tal-mudell diġà tidher fil-field `model` tal-body tar-response.

`GET /api/modality-bridge/stats` (awtentikazzjoni tal-ġestjoni, tal-istess livell bħal
`GET /api/settings`) jirritorna l-counters fil-memorja għal kull modalità
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` għal `vision`, `audio`, u
`video`. `averageLatencyMs` juża `latencySamples`, mhux it-tentattivi kollha, bħala
d-denominatur tiegħu; operazzjoni mingħajr kejl tal-ħin ma tivvintax kampjun ta’
żero millisekondi. `bridged` jibqa’ l-alias kompatibbli mal-verżjonijiet preċedenti
għal konverżjonijiet li rnexxew; tentattivi falluti ma jżiduhx.
Il-counters jerġgħu jiġu ssettjati meta l-proċess jerġa’ jinbeda, skont id-disinn
(telemetrija, mhux kontabbiltà).

#### Konfigurazzjoni tad-dashboard

Il-paġna ddedikata tad-dashboard hija
`/dashboard/settings/modality-bridge`. It-tabs tagħha `Vision`, `Audio`,
u `Video`, li jistgħu jiġu indirizzati permezz tal-URL, jippreservaw il-parametri
tal-query waqt li jibdlu l-valur ta’ `tab`.
It-tab Vision jesponi l-attivazzjoni, il-modalità, l-għażla tal-mudell (inkluż
id-default awtomatiku), il-prompts konxji tal-kompitu, limiti avvanzati għat-timeout,
l-immaġni, it-tul tad-deskrizzjoni u l-cache, counters waqt it-tħaddim, u talba
ta’ kampjun protetta. It-tab Audio hija wkoll attiva: tesponi l-attivazzjoni,
għażla ta’ mudell STT biss b’Auto, limiti għat-timeout u t-tul massimu tal-klipp,
counters tal-awdjo, u test ta’ kampjun `input_audio`. It-tab Video hija funzjonali:
tirrapporta l-istat waqt it-tħaddim ta’ FFmpeg/ffprobe — wieħed minn erba’ stati
espliċiti tal-UI (`unknown` waqt li l-probe jkun għaddej jew ma jkunx seta’
jitlesta, `restricted` fuq host tad-dashboard li mhuwiex loopback fejn il-probe
jinqabeż min-naħa tal-klijent, `unavailable` wara li jsir il-probe u jiġi kkonfermat
li huwa nieqes, jew `available` bil-verżjonijiet ta’ FFmpeg/ffprobe) — tippersisti
l-limiti tal-attivazzjoni, il-mudell, il-frames, il-vidjo u t-timeout, tiffiltra
l-għażla tal-mudell għal mudelli li jappoġġjaw il-viżjoni, u tesponi counters
tal-vidjo.

Il-card preċedenti Vision Bridge taħt is-settings tal-AI hija link ta’
kompatibbiltà għall-paġna l-ġdida; m’għadhiex iżżomm it-tieni kopja tal-formola.
Media Providers jorbot ukoll il-flussi tax-xogħol Image-to-Text u Speech-to-Text
mat-tabs korrispondenti ta’ Modality Bridge mingħajr ma jneħħi l-playground
eżistenti ta’ Speech-to-Text.

**Qbiż tal-ammissjoni għas-self-loop:** meta s-sejħa describe tiġi rrutata
permezz tas-self-loop `/v1` ta’ OmniRoute stess (mudell ta’ provider mhux
standard), is-sub-request jibgħat
`x-omniroute-admission-bypass: internal` u jiġi awtentikat bil-kredenzjali
tas-self-loop solvuta — is-sentinel lokali `sk_omniroute` fil-modalità lokali,
jew iċ-ċavetta tal-env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ikkonfigurata
mill-operatur (#1350), sabiex deployments b’`REQUIRE_API_KEY=true` xorta jkunu
jistgħu jwettqu s-sejħa describe. Il-qbiż jiġi rrispettat biss għal dawk
il-kredenzjali eżatti, għalhekk klijenti esterni ma jistgħux jużaw il-header
biex jaqbżu l-ammissjoni.

Id-defaults legacy jinsabu f’`src/shared/constants/visionBridgeDefaults.ts`;
id-defaults il-ġodda tal-modalità, tal-għarfien tal-kompitu u tal-cache, kif ukoll
ir-resolver tas-settings, jinsabu f’
`src/shared/constants/modalityBridgeDefaults.ts`. Il-guardrail jesponi opzjoni
tal-constructor `deps` sabiex it-tests ikunu jistgħu jinjettaw implimentazzjonijiet
foloz ta’ `getSettings` u `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Jinterċetta talbiet taċ-chat li jkun fihom awdjo qabel ma jilħqu target li mhuwiex
magħruf li jaċċetta input tal-awdjo. Qatt ma jerġa’ jirrotta t-talba taċ-chat:
il-partijiet tal-awdjo jiġu traskritti permezz tal-endpoint multipart eżistenti
kompatibbli ma’ OpenAI, u l-mudell taċ-chat magħżul ikompli bit-traskrizzjonijiet
tat-test.

Fluss:

1. Isolvi `supportsAudio` permezz ta’ `getResolvedModelCapabilities()`. Il-metadata
   espliċita tar-reġistru tal-provider tieħu preċedenza, imbagħad il-metadata
   statika tal-mudell, u mbagħad `modalities_input` sinkronizzat. Lista ddikjarata
   tal-input mingħajr `audio` hija `false`; jekk ma jkun hemm ebda evidenza
   tal-kapaċità, il-valur jibqa’ `null`. Kemm `false` kif ukoll `null` jattivaw
   il-bridge konservattiv, filwaqt li `true` jaqbżu.
2. Isolvi s-settings `modalityBridgeAudio*` u estratta partijiet tal-awdjo
   tal-ogħla livell li jistgħu jiġu splajsjati minn kull messaġġ permezz
   tad-detector kondiviż `detectMediaParts()`. Il-forom tal-wire appoġġjati huma
   `input_audio` ta’ OpenAI, `audio_url`, u `source.media_type: "audio/*"`.
   Awdjo nested jiġi identifikat għar-routing iżda ma jitneħħiex mill-path
   tal-isplicing. Ix-xogħol jiġi limitat minn `modalityBridgeAudioMaxClips`;
   partijiet ta’ wara jibqgħu mhux mibdula.
3. Irrispetta `provider/model` ikkonfigurat, jew ħalli lil
   `selectAudioBridgeModel()` jgħaddi minn `AUDIO_TRANSCRIPTION_PROVIDERS`
   fl-ordni stabbli tal-katalgu u jagħżel l-ewwel mudell bi kredenzjali attiva
   u użabbli tal-provider.
4. `callAudioTranscription()` jikkonverti awdjo base64/data-URI għal `file`
   multipart, jew iniżżel `audio_url` remot permezz tal-protezzjoni outbound
   għal riżorsi pubbliċi biss, b’DNS pinning u limitu ta’ 25 MB. Imbagħad jibgħat
   POST tal-file u tal-mudell magħżul lis-self-loop lokali
   `/v1/audio/transcriptions`, awtentikat b’`resolveSelfLoopBearer()`. Ir-rotta
   eżistenti tat-traskrizzjoni twettaq it-tiftix normali tal-kredenzjali,
   l-immaniġġjar tal-cooldown u tar-rate limits, u d-dispatch lejn il-provider.
5. Sejħiet li jirnexxu jissostitwixxu l-partijiet tagħhom b’
   `[Audio N]: <transcript>`. Is-sejħiet jitwettqu b’`Promise.allSettled`:
   falliment individwali jippreserva dik il-parti oriġinali tal-awdjo
   (kuntratt #4012). Jekk is-sejħiet kollha jfallu u jkun ippruvat li t-target
   għandu `supportsAudio === false`, il-partijiet isiru
   `[Audio N]: (unavailable — no STT provider connected)` (kuntratt #8430).
   Għal target mhux magħruf (`null`), riżultat fejn kollox ifalli jibqa’ mhux
   mibdul. Target li jkun ippruvat bħala text-only u li ma jkollux kredenzjali
   STT użabbli jirċievi l-istess placeholder espliċitu mingħajr ma tinħareġ
   sejħa tan-network.

Traskrizzjonijiet li jirnexxu jużaw il-cache LRU/TTL ta’ Modality Bridge komuni
għall-proċess kollu. Iċ-ċavetta tgħaqqad ir-referenza tal-awdjo, it-tikketta
stabbli tal-operazzjoni `audio-transcription`, u l-mudell STT magħżul; il-fallimenti
qatt ma jinħażnu fil-cache. It-tentattivi tal-awdjo jaġġornaw il-counters
kondiviżi `bridged`, `cacheHits`, `failures`, u `lastUsedAt`.
Risposti trasformati jkollhom
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
talbiet mhux mibdula ma jirċevux segment ta’ Audio Bridge.

Is-settings waqt it-tħaddim huma sostnuti mid-DB u vvalidati b’Zod:

| Ċavetta                       | Valur Predefinit | Firxa                 |
| ----------------------------- | ---------------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`           | —                     |
| `modalityBridgeAudioModel`    | `""`             | Awtomatiku jew ID STT |
| `modalityBridgeAudioTimeout`  | `60000`          | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`              | 1–10                  |

Il-cache kondiviż jibqa' kkontrollat minn `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, u `modalityBridgeCacheMaxEntries`.

### Pont tal-Vidjo (`videoBridge.ts`, `videoBridgePipeline.ts`)

Jinterċetta l-partijiet tal-vidjo tal-ogħla livell fil-`messages` ta' Chat Completions u fl-`input`
tal-API Responses qabel ma tissejjaħ mira mingħajr appoġġ nattiv magħruf għall-vidjo.
Il-forom appoġġjati huma `input_video`, `video_url`, `video_source`, URLs HTTPS,
u URIs tad-data `data:video/*;base64,...`. Ismijiet sempliċi ta' fajls fit-test ma jiġux ittrattati
bħala vidjo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) jieħu ħsieb il-perkors tat-talba, il-
verifika tal-kapaċità/politika, l-aggregazzjoni għal kull talba, u l-payload tar-rispons.
Ix-xogħol għal kull vidjo — l-akkwist, il-cache tar-riżultat sħiħ, id-deskrizzjoni ta' sekwenza
ta' frames (li tintegra kwalunkwe traskrizzjoni tal-awdjo ddikjarata minn min jagħmel is-sejħa), u l-
metriċi/abort/tindif għal kull tentattiv — huwa moħbi wara `processVideoPart` f'
`videoBridgePipeline.ts`, li jissejjaħ darba għal kull parti tal-vidjo fi ħdan il-loop ta' `preCall`.
Dak il-modulu jiddefinixxi wkoll il-konfini espliċiti tal-ports `VideoMediaBrokerPort`
(l-akkwist tal-bytes u l-estrazzjoni ta' frames meħuda bħala kampjun), `VideoAudioTranscriptionPort`
(l-integrazzjoni ta' traskrizzjoni tal-awdjo ddikjarata minn min jagħmel is-sejħa mal-captions tal-kampjuni), u
`VideoDrilldownPort` (il-konfini tal-persistenza tal-analiżi dettaljata tal-frames; għadu mhux imqabbad
ma' `processVideoPart` — illum ir-rotta separata `/api/modality-bridge/video/drilldown`
biss tikteb entrati ta' analiżi dettaljata).

Il-perkors pubbliku tat-talba `/v1` qatt ma jimporta jew jinvoka sottoproċess. Vidjows remoti
jitniżżlu taħt limitu ta' 50 MiB; vidjows base64 inline għandhom limitu konservattiv dekodifikat
ta' 36 MiB għal kull vidjo sabiex l-involukru tal-mudell/messages/framing ikun jista' jibqa'
fil-limitu pubbliku ta' ammissjoni tat-talbiet JSON ta' 50 MiB. It-tul inline u l-istimi
tad-daqs dekodifikat jiġu vverifikati qabel l-allokazzjoni. HTTPS huwa meħtieġ fil-URL remot
inizjali u f'kull ridirezzjoni, bl-użu tal-protezzjoni eżistenti għal komunikazzjoni 'l barra pubblika biss
b'DNS pinning. Imbagħad il-bytes jaqsmu eżattament il-konfini interni tal-broker
`POST /api/modality-bridge/video/extract`. Dik ir-rotta hija kemm
`LOCAL_ONLY` kif ukoll `SPAWN_CAPABLE`, taċċetta biss talba awtentikata għal kull proċess
minn loopback fdat, u qatt ma taċċetta URL, perkors tas-sistema tal-fajls, eżekutibbli,
jew lista ta' argumenti. Il-pipeline tal-limitu tad-daqs tal-body tal-API u l-qarrej inkrementali
tal-body tal-handler jinfurzaw indipendentement limitu ta' input tal-broker ta' 50 MiB. Il-kju
limitat tiegħu jwettaq estrazzjoni waħda kull darba, jippermetti erba' xogħlijiet pendenti, u
jillimita l-input pendenti għal 100 MiB.

Fi ħdan il-broker, `ffprobe` jaqra fajl lokali privat; il-lista fissa ta' formati
permessi teskludi formati ta' playlists u manifests. Għall-containers permessi tal-familja MOV,
ir-referenzi għal data MOV esterna jibqgħu diżattivati b'mod predefinit, u l-kmand fiss
ma jattivahomx. Kemm `ffprobe` kif ukoll `ffmpeg` jużaw il-lista ta' protokolli permessi
`file` biss, thread wieħed, arrays fissi ta' argumenti, l-ebda shell,
u eżekutibbli riżolti minn `PATH`. Streams ta' stampi tal-qoxra mehmuża mhumiex
kandidati li jistgħu jintlagħbu. L-istreems kollha li jistgħu jintlagħbu jridu jissodisfaw il-limiti, u
stream predefinit espliċitu jingħata preferenza qabel il-fallback deterministiku bl-inqas indiċi.
Il-vidjows huma limitati għal 600 sekonda, 8,192 pixel għal kull dimensjoni, u
33,554,432 pixel tas-sors. FFmpeg jieħu kampjun ta' 1–16-il frame JPEG mill-punti tan-nofs,
inaqqas l-iskala tax-xifer twil għal mhux aktar minn 1,024 pixel mingħajr ma jkabbar inputs
iżgħar, u qatt ma jirċievi URL. It-teħid ta' kampjuni huwa `uniform` b'mod predefinit. Il-politiki
fakultattivi `scene_aware` u sperimentali `segment_aware` iwettqu pass fiss addizzjonali wieħed
ta' FFmpeg fuq l-istess stream lokali diġà vvalidat, jagħżlu timestamps limitati tax-xeni
`showinfo`, u jerġgħu lura b'mod deterministiku għall-istess punti tan-nofs uniformi jekk id-detector
ifalli, jiskadi l-ħin, joħroġ output iffurmat ħażin, jew jipproduċi sett ta' kandidati vojt.
Il-modalità konxja tas-segmenti talloka kampjuni mill-punti tan-nofs proporzjonalment għall-intervalli
tax-xeni vvalidati; l-evidenza konxja tas-segmenti u l-imġiba tal-fallback huma
dettaljati hawn taħt. Il-limitu strett ta' 16-il frame
jiġi applikat wara l-għażla f'kull politika. Meta talba konxja tax-xeni jkollha baġit
ta' frame wieħed biss, tuża l-punt tan-nofs uniformi tal-vidjo sħiħ attiv jew tat-tieqa ta' fokus
u tirrapporta `policyEffective: uniform`: frame wieħed magħżul minn xena
ma jistax jippreserva ż-żewġt itruf temporali. Min jagħmel is-sejħa jista' b'mod fakultattiv jipprovdi
tieqa ta' fokus finita (`start`/`end` f'sekondi); il-limiti jiġu ristretti għad-durata tal-media,
twieqi maqluba jew mhux finiti jiġu rrifjutati, u l-politiki kollha tat-teħid ta' kampjuni
jitwettqu biss fi ħdan l-intervall normalizzat. It-tieqa li tirriżulta
tiġi inkluża fil-metadata tat-teħid ta' kampjuni u fil-prefiss tad-deskrizzjoni mhux fdata
sabiex il-mudelli downstream ikunu jistgħu jiddistingwu silta ffukata mil-linja taż-żmien sħiħa.

Il-fokus semantiku tal-captions huwa setting separat u espliċitu. Il-modalità ta' analiżi
predefinita `full` tippreserva l-prompt eżistenti tal-frames u qatt ma tibgħat it-test tat-talba
lill-mudell tal-captions. Fil-modalità `focused`, il-pont jaqra biss l-aħħar
`text`/`input_text` mhux vojt miktub mill-utent mill-istess container ta' Chat jew Responses,
jinnormalizzah għal NFC, jiġbor flimkien il-karattri ta' kontroll u l-ispazji bojod,
u jillimitah għal 500 punt ta' kodiċi Unicode. Riżultat vojt jerġa' juża l-
prompt eżatt ta' `full`. Ħjiel li jista' jintuża jiġi sserjalizzat bħala JSON fi blokk apposta
ta' kuntest tal-utent mhux fdat u jista' biss jipprijoritizza dettalji osservabbli; ma jistax
jegħleb it-twissija separata kontra li jiġu segwiti struzzjonijiet viżibbli
jew li jinstemgħu fil-media. Il-fokus testwali qatt ma jinferixxi `start`/`end` jew ibiddel
il-kampjunatur temporali.

#### Evidenza strutturali tas-segmenti FU-07

`segment_aware` juża pass wieħed ta’ preanaliżi b’limiti fuq il-fluss tal-vidjo lokali diġà vvalidat. Il-katina fissa tal-filtri l-ewwel tiskala għal wisa’ massimu ta’ 320 pixel, tiskopri bidliet fix-xena u intervalli ffriżati, u mbagħad tieħu kampjun b’rata ta’ frame wieħed kull sekonda biex tkejjel iċ-ċajpir, il-luma medja, u l-informazzjoni spazjali/temporali. Il-pass huwa limitat għal 600 kampjun strutturali, thread wieħed ta’ FFmpeg/filtru, l-istess listi ta’ permessi għall-protokoll `file` biss u għall-kontenituri, limitu ta’ 1 MiB għall-output tal-proċess, u massimu ta’ 30 sekonda fi ħdan l-abort/skadenza kondiviża tal-broker. Qatt ma jaċċetta kmand, filtru, path, jew URL mit-talba.

Il-valuri strutturali huma evidenza deterministika minn kampjunar, mhux fehim semantiku tal-vidjo. Ma jiddeduċux suġġetti, azzjonijiet, captions, diskors, jew l-intenzjoni tal-utent. Il-konfini tax-xeni u tal-iffriżar jiffurmaw segmenti; il-kopertura tal-iffriżar, iċ-ċajpir, l-esponiment, id-dettall spazjali, u l-bidla temporali jinfluwenzaw biss kif jitqassam il-baġit eżistenti ta’ 1–16-il frame. Segment kompletament iffriżat huwa limitat għal frame wieħed, filwaqt li s-segmenti mhux iffriżati jikkompetu għall-baġit li jifdal. Meta l-għadd tal-konfini jaqbeż dak tal-frames, tinżamm kopertura uniformi tal-linja temporali sabiex qtugħ rapidu fil-bidu ma jkunx jista’ jaħbi segment twil fit-tarf. Il-konfini tax-xeni li jkunu fir-riżoluzzjoni ta’ analiżi ta’ sekonda minn konfini tal-iffriżar jingħaqdu.

Filtri neqsin, evidenza malformata/vojta, żball fid-detector, jew timeout tal-preanaliżi b’limiti jfallu b’mod miftuħ għall-politika eżatta u uniformi tal-punt tan-nofs. Abort minn min jagħmel is-sejħa jew skadenza tal-broker ma jfallux b’mod miftuħ: dawn itemmu s-subproċess li jkun għaddej, jipprevjenu estrazzjoni sussegwenti tal-frames, u s-siġra temporanja privata titneħħa f’`finally`.

`scripts/perf/video-bridge-fu07-eval.ts` jiġġenera fixtures reali u deterministiċi ta’ FFmpeg għall-iffrankar tas-sejħiet tal-caption wara d-deduplication, l-allokazzjoni tal-baġit għal moviment dens, l-evidenza ta’ ċajpir/esponiment/SI-TI, qtugħ rapidu b’tarf twil, u pożittivi foloz minn fade gradwali. Jirreġistra l-ħin reali tal-preanaliżi u, fejn `/usr/bin/time` ikun disponibbli, is-CPU tal-proċess wild u l-ogħla RSS. Il-kontrolli tal-kwalità tiegħu huma orakli strutturali biss. Il-kwalità tal-mudell reali tal-caption tibqa’ `HOLD` għax dan il-harness ma għandu ebda endpoint awtorizzat jew imħallef iffissat. L-iffrankar monetarju wkoll jibqa’ `HOLD` sakemm `--caption-cost-per-call-usd` ma jipprovdix stima pożittiva u espliċita għal kull sejħa; l-iskript qatt ma jiffabbrika xi wieħed minn dawn ir-riżultati.

Kull frame huwa limitat għal 4 MiB, il-frames mhux ipproċessati kollha flimkien għal 23 MiB, u r-risposta sserjalizzata tal-broker għal 32 MiB. Direttorju temporanju privat jitneħħa f’`finally`. OmniRoute ma jinkludix FFmpeg fil-pakkett u ma jaċċettax path personalizzat għall-eżekutibbli. Qabel ma joħloq il-captions, il-bridge japplika pass konservattiv ta’ deduplication viżiva: kull JPEG jitnaqqas għal buffer grayscale ta’ 16×16 u jitqabbel biss mal-aħħar frame miżmum. Għal baġit ta’ captions mitlub li jaqbeż frame wieħed, l-estrazzjoni tipprovdi ġabra ta’ kandidati b’limitu ta’ mhux aktar mid-doppju ta’ dak il-baġit u qatt aktar minn 16-il frame. Il-limitu mitlub jiġi applikat biss wara d-deduplication, filwaqt li l-ewwel u l-aħħar kandidati magħżula jinżammu matul it-traqqiq finali meta l-baġit ikun mill-inqas tnejn. Il-politika b’verżjoni
`grayscale-16x16-mean-cells-v2` tuża l-akbar valur bejn id-delta tal-luma medja u l-proporzjon taċ-ċelloli tat-thumbnail li d-delta normalizzata tagħhom tkun mill-inqas 0.05. Il-limitu tad-duplikati huwa l-kostanti 0.04, magħżul għall-prevedibbiltà aktar milli espost bħala setting waqt l-eżekuzzjoni. Dan is-sinjal sekondarju
b’kuntrast għoli jippreserva moviment żgħir u bidliet fit-test viżibbli li paragun ibbażat biss fuq il-medja jista’ jaħbi. Żbalji fil-comparator jew fid-decoder jfallu b’mod miftuħ u jżommu l-kopertura. Il-metadata tal-output tissepara l-kandidati estratti, il-frames użati b’suċċess, u d-duplikati viżivi mneħħija.

Parti tal-vidjo mmarkata b’mod espliċitu tista’ titlob folja ta’ kuntatt b’timestamps. Il-bridge jibni grilja JPEG ta’ mhux aktar minn 4 kolonni u 16-il frame. Kull ċellola ta’ 512-il pixel tintegra t-timestamp tas-sors tagħha f’faxxa t’isfel b’kuntrast għoli, filwaqt li l-istess timestamps jibqgħu fil-metadata testwali għall-assoċjazzjoni u l-awditjar downstream. Il-JPEG sħiħ jibqa’ limitat għal 32 MiB. Jekk `sharp` ma jkunx jista’ jiddekowdja jew jikkomponi l-grilja, il-bridge jaqa’ lura għall-frames JPEG individwali; abort mill-klijent xorta jibqa’ propagat tul l-operazzjoni tal-folja.

L-evidenza għall-promozzjoni hija deliberatament separata mill-mikrobenchmark sintetiku tal-kompożizzjoni. `scripts/perf/video-bridge-contact-sheet-eval.ts` jiddefinixxi harness A/B b’verżjoni tal-iskema għal mudelli reali tal-viżjoni kompatibbli ma’ OpenAI. Huwa jkejjel it-tokens irrappurtati mill-fornitur, il-latenza reali minn tarf sa tarf (inkluża l-kompożizzjoni tal-folja), l-għadd ta’ sejħiet lill-mudell, u ż-żamma tal-fatti ddefiniti mill-manifest. Ir-risposti mhux ipproċessati tal-mudell ma jinkitbux fir-rapport; jinżammu biss id-digests SHA-256 u l-IDs tal-fatti mqabbla. Il-harness ma jagħmel ebda sejħa fuq in-network jew lil mudell bi ħlas sakemm ma jingħaddiex `--execute-real` u ma jkunux ikkonfigurati `--model`, `OMNIROUTE_BASE_URL`, u `OMNIROUTE_API_KEY`. Mingħajr dik l-eżekuzzjoni reali espliċita, il-verdett tiegħu li jista’ jinqara minn magna jibqa’ `HOLD`; il-kejl sintetiku tal-payload/tal-għadd ta’ sejħiet waħdu mhuwiex evidenza għall-promozzjoni.

Min jagħmel is-sejħa jista’ jehmeż array fakultattiv `transcript.cues` ma’ parti tal-vidjo appoġġjata meta diġà jkollu test allinjat. Kull cue għandu jkollu `text`, intervall finit `start`/`end` fi ħdan id-durata investigata, u `source` minn lista ta’ permessi (`client`, `embedded`, jew `audio-bridge`); `confidence` għandu valur default ta’ `1` u jrid jibqa’ bejn `0` u `1`. Cues eżattament duplikati jingħaqdu. OmniRoute qatt ma jibda traskrizzjoni minn din il-metadata: cues ivvalidati jiġu kkupjati fir-riżultat deskritt flimkien mas-sors, il-kunfidenza, u l-intervall, u jiġu rrappreżentati bħala osservazzjonijiet mhux fdati maġenb il-captions tal-frames. Test invalidu, barra mill-firxa, jew mingħajr provenjenza jiġi rrifjutat minflok jitħallat fil-fluss tal-captions. Iż-żewġ kanali tat-traskrizzjoni fil-body tat-talba jinnormalizzaw il-provenjenza pprovduta għal `client`, inklużi labels `embedded` jew `audio-bridge` iddikjarati mill-klijent innifsu. Adapter proprjetà tas-server biss jista’ jassenja dawk il-labels fdati permezz tal-argument `trustedSource` disponibbli biss mill-code; field JSON fit-talba ma jistax jilħaq dak l-argument. It-test tat-traskrizzjoni jibqa’ kontenut mhux fdat derivat mill-media, irrispettivament mill-provenjenza tiegħu, u qatt ma għandu jiddetermina l-awtorizzazzjoni.

Min jagħmel sejħa b’mod avvanzat jista’ jipprovdi track `audioTranscript` għall-istess vidjo;
dan jiġi ttrattat bħala test ipprovdut mill-klijent, mhux bħala prova ta’ traskrizzjoni mis-server.
Il-punt ta’ fużjoni jmexxi l-osservazzjonijiet viżivi u tal-awdjo taħt
skadenza waħda u sinjal wieħed ta’ abort, jordnahom fuq kronoloġija komuni, jgħaqqad
duplikati eżatti, u jirrapporta riżultat parzjali meta jirnexxi naħa waħda biss.
`audioTranscript` invalidu jwassal għal dak ir-riżultat parzjali — id-deskrizzjoni
viżiva tinżamm u l-fergħa tal-awdjo tirreġistra kodiċi ta’ falliment sanitizzat —
minflok ifalli l-vidjo kollu. Id-disponibbiltà għal kull fergħa, il-bandiera parzjali,
u l-kodiċijiet ta’ falliment sanitizzati jinżammu fir-riżultat deskritt, fil-metadata
tal-miżuri protettivi (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), fil-metadata tal-cache tar-riżultati, u fil-counters
tal-fużjoni tal-bridge. Il-mogħdija predefinita tal-Video Bridge ma tinvokax konverżjoni minn diskors għal test
u lanqas ma tniżżel kopja oħra tal-midja; mingħajr dak it-track espliċitu, tibqa’
għall-vidjo biss.

**Żamma tat-traskrizzjoni (#12150 P1).** Dan japplika awtomatikament kull meta l-
Video Bridge (li huwa nnifsu fakultattiv) jirrendi cue ta’ traskrizzjoni — ma hemm l-ebda
bandiera separata taż-żamma. Meta talba tirrendi kwalunkwe cue ta’ traskrizzjoni (jew
`transcript` iddikjarat minn min jagħmel is-sejħa jew `audioTranscript` magħqud), il-miżura protettiva timmarkah
`videoBridgeObserved` u tipproduċi kopja parallela redatta tad-deskrizzjoni tal-vidjo —
rendering identiku li fih il-korp b’test liberu ta’ kull cue jiġi sostitwit b’
`[redacted-video-transcript]`, maħluq billi jiġi sostitwit il-qasam strutturat tal-cue
qabel ma tiġi assemblata s-sekwenza (qatt bl-ipproċessar tat-test iċċattjat, sabiex l-ebda kontenut
tal-cue — ostili jew ordinarju, inklużi korpi li fihom `]` bħal
`[inaudible]`/`[music]` — ma jkun jista’ jibqa’). Il-korp tat-talba fil-ġurnal tas-sejħiet persistenti jibdel
kull parti tat-test derivata mill-vidjo ma’ dik il-kopja parallela redatta, imqabbla permezz tal-ugwaljanza
tal-kontenut; l-ankra `fullText` terġa’ tinqara mill-payload komplut tal-miżura protettiva ta’ qabel is-sejħa,
sabiex it-tqabbil jibqa’ jirnexxi wara li miżuri protettivi sussegwenti fil-katina (il-maskers tal-PII u
tal-kredenzjali, bi prijoritajiet 10/95) jerġgħu jiktbu t-test tad-deskrizzjoni fil-post u
wara li l-injezzjoni tal-prompt tas-sistema/handoff/memorja tibdel il-forma tal-array tal-messaġġi. Il-
korp mibgħut upstream lill-mudell ma jinbidilx. Talba osservata lanqas ma timla
Memorja durabbli (kemm l-estrazzjoni derivata mit-talba kif ukoll dik derivata mir-risposta jiġu maqbuża),
sabiex ir-risposta tal-mudell stess ma tkunx tista’ tirrepeti t-test tat-traskrizzjoni fil-Memorja.

**Oqsma mhux ipproċessati tal-vidjo (#12430).** Meta l-bridge jkun attivat u l-appoġġ nattiv għall-vidjo ma jkunx magħruf jew ikun assenti, l-oqsma definiti `transcript`/`audioTranscript` jattivaw ukoll `videoBridgeObserved`, anke wara falliment tad-deskrizzjoni jew limitu `maxVideos`. `null` u sekwenzi vojta jgħoddu; oqsma assenti u metadata li mhijiex tal-vidjo ma jgħoddux. Kopji miżmuma jirredattaw dawn l-oqsma jew iħallu barra t-talba, u l-caches/Memory jiġu maqbuża.

F’dawk il-mogħdijiet ta’ fallback, cues validi pprovduti minn min jagħmel is-sejħa jsiru partijiet appoġġati
`text`/`input_text` minflok oqsma mhux standard tal-fornitur. Iż-żewġ tracks
ipprovduti mat-talba jibqgħu osservazzjonijiet `client` mhux fdati, bi twissija espliċita li l-vidjo
ma ġiex deskritt u li t-timestamps ma ġewx ivverifikati mal-midja. Il-limiti eżistenti ta’
256 cue/64-KiB b’kollox u għal kull cue japplikaw għaż-żewġ tracks flimkien;
it-timestamps iridu jidħlu fil-limitu massimu ta’ 600 sekonda tal-broker u fi kwalunkwe tieqa ta’ fokus
ipprovduta. Tracks invalidi jintremew, mhux jintbagħtu bħala test arbitrarju; track
aħwa validu xorta jista’ jintuża sakemm il-limitu kkombinat tagħhom ma jinqabiżx. Oqsma nulli/vojta
ma jżidu l-ebda test. Dan il-fallback ma jżid l-ebda aċċess għall-midja jew traskrizzjoni.
L-oqsma ta’ estensjoni tat-traskrizzjoni jitneħħew mill-carrier tal-vidjo tal-fallback u mill-oġġetti
`video_url`/`source` tiegħu. L-allowlist tal-wire ta’ OpenAI tibqa’ stretta; carriers
tal-vidjo b’appoġġ nattiv mhux magħruf jibqgħu disponibbli u miri magħrufa li jaċċettaw biss test iżommu markers sikuri.
Kopji paralleli ta’ redazzjoni strutturata jipproteġu t-test tat-traskrizzjoni miżjud, filwaqt li t-
talba oriġinali proprjetà ta’ min jagħmel is-sejħa tibqa’ ma tinbidilx. Miri b’appoġġ nattiv u
bridges diżattivati jżommu l-imġiba eżistenti tagħhom ta’ bypass.

Kopji miżmuma addizzjonali jużaw l-istess sinjal ta’ talba osservata. L-istampa mhux ipproċessata
tat-talba tal-klijent ta’ qabel il-miżura protettiva, it-talba pendenti fil-memorja, u l-ġurnal bikri
tat-talba miċħuda jissostitwixxu strutturalment l-oqsma tat-traskrizzjoni fil-partijiet tal-vidjo;
prompts bħala sekwenzi maħluqa mill-istadji tal-pipeline u mill-handoff tal-kuntest jiġu redatti
fis-sink tal-korp tat-talba persistenti. Il-marker persistenti `video_content_removed`
iġiegħel il-kontinwazzjoni `previous_response_id` tfalli b’mod sikur minflok terġa’ tibni
test li twarrab intenzjonalment. Jekk talba osservata titlef il-kopja parallela tar-redazzjoni
għal kull parti tagħha qabel ir-reġistrazzjoni, jew jekk saħansitra waħda minn diversi kopji paralleli tal-vidjo
ma taqbilx wara mutazzjonijiet sussegwenti tat-talba, il-korp tat-talba miżmum
jitħalla barra għalkollox minflok tinżamm traskrizzjoni redatta parzjalment.

Għal talba osservata, risposta tal-mudell tista’ tikkwota kwalunkwe parti mit-
traskrizzjoni mingħajr konfini strutturati tal-cue. Għalhekk, il-`responseBody` tal-ġurnal tas-sejħiet
persistenti tagħha jiġi sostitwit b’marker ta’ ommissjoni; l-artifatt dettaljat
tal-pipeline (li jista’ jinkludi korpi upstream/tal-klijent u chunks tal-stream)
ma jinżammx. Il-caches semantiċi, tal-idempotenza, u tar-replay tar-raġunament jaqbżu
l-qari u l-kitba għal dik it-talba. It-talba lill-fornitur u r-risposta viżibbli
għall-klijent jibqgħu ma jinbidlux. Bytes bikrija ta’ keepalive jitneħħew mill-buffer temporanju
meta l-artifatt dettaljat jitħalla barra. It-twissija ta’ Kiro dwar EventStream iffurmat ħażin
tirrapporta biss l-għadd ta’ bytes tal-payload, qatt il-kontenut tiegħu jew l-iżball mhux ipproċessat
tal-parser tal-JSON.
Dan ma jsostnix li kull dijanjostika mhux relatata tal-fornitur/plugin ġiet
awditjata; l-analiżi usa’ tas-sinks miżmuma hija segwita f’#11658.

Iċ-ċiklu tal-ħajja intern ta' `/api/modality-bridge/video/drilldown` huwa substrat separat
tal-cache awtentikat permezz ta' loopback/token. Kull operazzjoni teħtieġ ukoll
ID prinċipali opak u kanoniku. Qabel ma jissejjaħ minn ambjent tal-produzzjoni, dan irid
jidderiva dak l-ID mit-tenant awtentikat u qatt ma għandu jgħaddi
valur magħżul mill-klijent. Iċ-ċwievet tal-cache jorbtu lil dak il-prinċipal mal-IDs kanoniċi tas-sessjoni u
tar-referenza tal-vidjo, jaħżnu biss iċ-ċwievet derivati tagħhom b'SHA-256, u jillimitaw kemm il-qari
kif ukoll it-tħassir għall-istess prinċipal. Il-cache taħżen mhux aktar minn 16-il frame JPEG
derivat għal kull entrata, tiskadihom wara għaxar minuti, u tappoġġja qari limitat permezz ta'
`start`/`end` jew tħassir espliċitu tas-sessjoni.

Kull prinċipal huwa limitat għal 16-il entrata u 64 MiB ta' data JPEG kanonika. Dawk
il-limiti huma indipendenti mil-limitu globali ta' 64 entrata/256 MiB: il-pressjoni tal-kwota
tal-prinċipal tkeċċi biss l-entrati ta' dak il-prinċipal li ntużaw l-inqas reċentement qabel ma
tiġi kkunsidrata t-tkeċċija LRU globali. L-entrati skaduti jitneħħew kemm mill-kontabbiltà tal-prinċipal kif ukoll
minn dik globali waqt attività tal-cache, filwaqt li l-kanċellazzjoni u n-nuqqas ta' validazzjoni ma
jikkommettux sostituzzjoni parzjali.

Il-cache tirrifjuta Base64 mhux kanoniku, padding żejjed, media mhux JPEG, JPEGs difettużi jew
maqtugħin, u JPEGs li jiġġeneraw twissija waqt dekodifikazzjoni limitata tal-immaġni sħiħa b'`sharp`.
Hija terġa' tikkodifika kull immaġni aċċettata bħala JPEG kanoniku, tidderiva l-wisa' u l-għoli
mill-bytes dekodifikati minflok ma tafda l-fields tal-parti li ċċempel, u tarmi kwalunkwe
bytes polyglot żejda fl-aħħar minflok iżżommhom. Il-buffer ikkompressat kanoniku limitat biss
jiġi addebitat liż-żewġ kwoti. Il-limitu tal-wire JSON jinkludi l-overhead ta' Base64 għal-limitu ta' 32 MiB
tal-input dekodifikat. Kull
derivazzjoni maħżuna tirreġistra l-format/ir-riżoluzzjoni JPEG validati tagħha, il-politika tat-teħid tal-kampjuni,
il-verżjoni tad-derivazzjoni, il-ħin tal-ħolqien, il-hash tal-kontenut ikkalkulat mis-server, u r-referenza parent
bil-hash flimkien mal-hash tal-kontenut parent tal-parti fdata li ċċempel. Il-kanċellazzjoni tiġi ċċekkjata
bejn il-fażijiet asinkroniċi ta' dekodifikazzjoni/hash qabel il-commit atomiku fil-cache.

Din il-porzjon għadha ma tqabbadx produttur tal-produzzjoni mar-route u ma
tipprovdix għażla ta' varjanti b'riżoluzzjonijiet multipli. Għalhekk, il-path trasparenti tat-talba tal-Video Bridge
ma jġarrab ebda xogħol addizzjonali, filwaqt li d-derivazzjoni tal-prinċipal marbuta mat-tenant u
ċ-ċiklu tal-ħajja sħiħ b'riżoluzzjonijiet multipli ta' FU-08 jibqgħu xogħol ta' segwitu espliċitu
minflok ma jiġu ddokumentati bħala mġiba kompluta.

Il-frames jingħataw captions sekwenzjalment bil-mudell Video kkonfigurat. Override vojt ta'
Video jiret is-setting ta' Vision; jekk it-tnejn ikunu vojta, l-auto-router ta' Vision
jagħżel il-mudell effettiv li jappoġġja l-vision. Captions b'suċċess
jissostitwixxu l-parti oriġinali bi prefiss stabbli `[Video description:` li wkoll
jimmarka t-test bħala osservazzjoni mhux fdata derivata mill-media u jgħid lill-mudelli
downstream biex ma jsegwux struzzjonijiet misjuba fil-media. Iċ-ċwievet tal-cache tal-captions tal-frames
jinkludu l-bytes JPEG, il-prompt, it-timestamp, u l-mudell effettiv; captions b'suċċess biss
jinħażnu fil-cache. L-entrati tal-cache jżommu l-mudell produttur li fil-fatt irnexxa,
inkluż mudell ta' fallback; il-bridge jirrapporta `mixed` meta frames differenti
jkunu ġew prodotti minn mudelli differenti. Hit fil-cache jerġa' juża dik l-identità tal-produttur
minflok jerġa' jtikkettaha bħala l-pjan ta' routing mitlub. Il-cache tar-riżultat tal-vidjo sħiħ
huwa keyed fuq kull input li jibdel l-output — il-prompt, il-mudell effettiv,
il-politika tat-teħid tal-kampjuni, l-għadd ta' frames, il-modalità tal-analiżi semantika, il-fingerprint SHA-256
tal-focus hint normalizzat, il-focus window, `transcript`,
`audioTranscript`, u l-flag tal-contact sheet — għalhekk il-bidla ta' kwalunkwe waħda minn dawk
id-dimensjonijiet tkun cache miss, u qatt użu mill-ġdid ta' data qadima. Il-verżjoni tal-politika
tad-deduplikazzjoni viżiva, it-threshold, u l-għadd limitat ta' candidate frames huma wkoll espliċiti fiċ-
ċavetta u l-metadata tal-cache tar-riżultati; għalhekk, bidla fil-politika ma tistax terġa' tuża
deskrizzjoni qadima tal-vidjo sħiħ. Il-metadata v4 tal-cache tar-riżultati żżomm il-modalità u
l-fingerprint, u qatt il-kompitu mhux ipproċessat tal-utent. Il-metadata tal-guardrail tirrapporta kemm
il-modalità tal-analiżi mitluba kif ukoll dik effettiva; modalità `focused` mitluba mingħajr
test utli tal-utent tiġi rrappurtata bħala effettivament `full`.

Il-guardrail jiġbed kull parti tal-vidjo appoġġjata iżda ma jiddeskrivix aktar minn
`modalityBridgeVideoMaxVideos`. Għal target li jkun ġie ppruvat li għandu
`supportsVideo === false`, vidjows li fallew jew li qabżu l-limitu jsiru markers ta' test sikuri u espliċiti
sabiex ebda vidjo mhux ipproċessat ma jibqa'. Meta l-kapaċità ma tkunx magħrufa, dawk il-partijiet
iżommu l-carrier tal-vidjo tagħhom; kwalunkwe transcript ta' fallback isegwi l-konverżjoni limitata
għal test deskritta hawn fuq. Targets b'`supportsVideo === true` jaqbżu l-bridge.
Is-sinjal ta' abort tat-talba tal-klijent jinfirex tul id-download, il-kju tal-broker,
is-subprocesses, u s-sejħiet tal-captions; l-aborts jieqfu bejn il-vidjows u qatt ma jfallu b'mod miftuħ
għal media mhux ipproċessata.

Is-settings tar-runtime huma sostnuti mid-DB u vvalidati b'Zod:

| Ċavetta                             | Valur predefinit | Firxa / imġiba                                                                                                   |
| ----------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`          | Runtime fakultattiv, attivat b’mod espliċitu                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`         | `full` iżomm captions ġeneriċi; `focused` juża kuntest limitat u mhux fdat tal-aħħar utent                       |
| `modalityBridgeVideoModel`          | `""`             | Jiret il-mudell ta’ Vision Bridge                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`              | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`      | `uniform`, `scene_aware`, jew `segment_aware` proporzjonali; jekk id-ditekter ifalli, jerġa’ lura għal `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`              | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`         | 1000–120000 ms                                                                                                   |

Valuri persistiti preċedenti tat-timeout tal-Vidjo li jaqbżu l-120 sekonda jiġu limitati sal-iskadenza tal-broker; kitbiet ġodda tas-settings li jaqbżu dak il-limitu jiġu rrifjutati.
`GET /api/modality-bridge/video/runtime` jeħtieġ lokalità loopback fdata u ttimbrata
qabel l-awtentikazzjoni jew l-ittestjar tar-runtime, u mbagħad jeħtieġ awtentikazzjoni
ta’ ġestjoni. Jirritorna biss `available`, verżjonijiet sanitizzati ta’ FFmpeg/ffprobe, u raġuni fissa
meta r-runtime ma jkunx disponibbli. L-endpoint intern tal-estrazzjoni mhuwiex
API pubblika għat-tlugħ: is-saturazzjoni tal-kju tirritorna `503` flimkien ma’ `Retry-After`, skonnessjoni
min-naħa ta’ min jagħmel it-talba tirritorna `499`, u l-iskadenza fissa tal-broker tirritorna `504`. It-tweġibiet ikkonvertiti jżidu
`video->text;model=<visionModel>;parts=<videos>` mal-header ċentrali
`x-omniroute-modality-bridge` mingħajr ma jneħħu s-segmenti ta’ Vision jew Audio.

### Maskatur tal-PII (`piiMasker.ts`)

Jitħaddem fiż-**żewġ** stadji.

- **`preCall`** jikklona l-payload, jgħaddi minn `system`, `messages`, `input`, u
  `prompt` (inklużi elementi li huma strings sempliċi), u japplika `processPII()` (minn
  `@/shared/utils/inputSanitizer`) għall-fields string `content`/`text`. Meta
  `PII_REDACTION_ENABLED=true`, il-PII misjub jiġi redatt fil-payload
  ħiereġ. Dan huwa indipendenti minn `INPUT_SANITIZER_MODE` (li jikkontrolla biss
  il-politika dwar l-injezzjoni tal-prompt). Meta r-redazzjoni tkun mitfija, is-sejħa tirreġistra l-għadd
  ta’ detezzjonijiet mingħajr ma terġa’ tikteb il-kontenut.
- **`postCall`** jagħmel klonu profond tat-tweġiba, iħaddem `sanitizePIIResponse()` flimkien
  mal-maskatur tal-istruttura tal-Responses API (`maskResponsesOutput` — ikopri
  `output_text` u `output[].content[].text`). Jekk isseħħ xi redazzjoni,
  it-tweġiba modifikata tieħu post dik oriġinali.

Il-guardrail qatt ma jimblokka; huwa biss iżid annotazzjonijiet (`meta.detections`,
`meta.redacted`) jew jerġa’ jikteb.

#### Għażla skont it-tip, mudelli personalizzati u counters tad-detezzjoni

**Dashboard → Settings → Security → PII masking** jagħżel _x’għandu_ jiġi maskat. Dan
ma jixgħelx il-maskjar: dan xorta jiġi kkontrollat minn `PII_REDACTION_ENABLED` (talba) u
`PII_RESPONSE_SANITIZATION` (tweġiba + SSE), u t-tnejn huma mitfija b’mod predefinit.

- **Għażla skont it-tip** — l-IDs inkorporati huma elenkati f’
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Jekk ma jiġix issettjat, dan ifisser kull
  tip (l-imġiba ta’ qabel ma kien jeżisti dan is-setting). Il-mudell `ssn_us`
  tal-engine tat-talbiet jiġi mmappjat għal `ssn`. It-templates (Minimal, Standard, Financial,
  Brazilian, USA, Full) jimlew biss il-checkboxes fl-UI.
- **Mudelli personalizzati** — sa 20 mudell regex jew wildcard (`*` = sa 64
  karattru mhux whitespace, `?` = wieħed). Il-matches isiru `[CUSTOM_REDACTED]`.
  Kull mudell jgħaddi minn `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): mhux aktar minn 500 karattru, flags limitati
  għal `g i m s u`, irid jiġi kkompilat, irid jgħaddi minn `safe-regex` (backtracking
  katastrofiku), u ma jistax jaqbel ma’ string vojta jew placeholder ta’ redazzjoni.
  Mudell li jfalli jiġi rrifjutat meta jiġi ssejvjat u meta jiġi ttestjat, u ringiela maħżuna
  li tfalli tinqabeż waqt ir-runtime minflok ma tiġi kkompilata. Il-mudelli personalizzati
  jitħaddmu biss meta l-maskjar ikun mixgħul.
- **Counters tad-detezzjoni** — għadd skont it-tip (qatt il-valuri mqabbla), miżmum fil-
  memorja u rrisettjat meta s-sistema terġa’ tinbeda (`src/lib/pii/piiDetectionStats.ts`). Dan
  jiżdied biss meta l-maskjar ikun mixgħul.

Is-settings jinsabu fit-tabella `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) u jinqraw permezz ta’ cache ta’ 1 s. API:

| Metodu | Path                     | Għan                                                                             |
| ------ | ------------------------ | -------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stat tal-flag, `enabledTypes`, `customPatterns`, counters tad-detezzjoni         |
| `PUT`  | `/api/settings/pii`      | Jissostitwixxi `enabledTypes` (`null` = kollha) u/jew `customPatterns`           |
| `POST` | `/api/settings/pii/test` | Dry run ta’ mudell wieħed fuq kampjun ta’ mhux aktar minn 8 KB; ma jinħażen xejn |

It-tlieta kollha jeħtieġu awtentikazzjoni ta’ ġestjoni u jivvalidaw il-body b’Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Injezzjoni tal-Prompt (`promptInjection.ts`)

Jidentifika strutturi avversarjali f’kontenut ipprovdut mill-utent u jinforza
l-politika kkonfigurata. L-imġiba tiġi ddeterminata minn varjabbli tal-ambjent u options tal-constructor:

| Konfigurazzjoni      | Varjabbli tal-ambjent                                                                                 | Valur predefinit | Effett                                                                                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Attivat              | `INPUT_SANITIZER_ENABLED`                                                                             | `true`           | Meta jkun `false`, il-mekkaniżmu ta' protezzjoni jieqaf minnufih.                                                                                                                                                                              |
| Modalità             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`           | Politika tal-injezzjoni: `block`, `warn`, jew `log`. (`redact` huwa aċċettat għall-kompatibbiltà retroattiva iżda **ma** jneħħix it-test tal-injezzjoni; il-kitba mill-ġdid tal-PII fit-talba hija kkontrollata minn `PII_REDACTION_ENABLED`.) |
| Limitu tal-imblukkar | Għażla `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`           | Is-severità minima meħtieġa għall-imblukkar. B'mod predefinit, severità medja tiġi osservata biss.                                                                                                                                             |

**Preċedenza tal-modalità** (`getMode`): `options.mode` ta' min isejjaħ →
**sovrastruttura tal-feature flag fid-DB** għal `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → varjabbli tal-ambjent `INJECTION_GUARD_MODE` → varjabbli tal-ambjent `INPUT_SANITIZER_MODE` →
`warn`. Għalhekk, sovrastruttura mid-dashboard tieħu preċedenza fuq il-varjabbli
tal-ambjent, u b'hekk l-UI ta' Feature Flags tikkontrolla l-mekkaniżmu ta'
protezzjoni waqt li jkun qed jaħdem (mingħajr ristartjar). Il-qari mid-DB huwa
fail-safe: jekk iseħħ żball, il-mekkaniżmu ta' protezzjoni jerġa' lura
għall-imġiba bbażata fuq il-varjabbli tal-ambjent, u meta ma tkun issettjata
l-ebda sovrastruttura, l-imġiba tkun identika għar-riżoluzzjoni bbażata biss
fuq il-varjabbli tal-ambjent.

Sorsi ta' detezzjoni:

1. `sanitizeRequest()` minn `@/shared/utils/inputSanitizer` (sett kondiviż ta'
   rilevaturi li jintuża f'partijiet oħra tal-pipeline).
2. `DEFAULT_GUARD_PATTERNS` integrati (attwalment `system_override_inline` u
   `markdown_system_block`, it-tnejn b'severità `high`).
3. `customPatterns` fakultattivi mgħoddija permezz tal-għażliet tal-kostruttur
   (strings, regex, jew rekords `{ name, pattern, severity }`).

Meta `mode === "block"` **u** mill-inqas detezzjoni waħda tilħaq il-limitu
tas-severità, `preCall` jirritorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. Fil-modalitajiet `warn`/`log`, il-mekkaniżmu
ta' protezzjoni jirreġistra l-avveniment iżda jippermetti s-sejħa. Il-helper
kondiviż `evaluatePromptInjection()` huwa esportat ukoll għal min jeħtieġ
jevalwa prompts mingħajr ma jgħaddi mir-reġistru.

**Limitu tal-iskannjar (v3.8.20):** ir-rilevatur jispezzjona biss l-**ewwel 16 KB**
mit-test magħqud tal-prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) f'
`src/shared/utils/inputSanitizer.ts`. Kemm `detectInjection()` kif ukoll
`evaluatePromptInjection()` jużaw `slice(0, MAX_INJECTION_SCAN_BYTES)` qabel ma
jħaddmu l-loop tal-patterns. Id-direttivi tal-injezzjoni jinsabu qrib il-bidu
ta' input, għalhekk dan jillimita l-użu tas-CPU/GC mir-regex fuq payloads ta'
diversi mijiet ta' KB mingħajr ma jdgħajjef id-detezzjoni (ara
#3932, #4041).

### Masker tal-Kredenzjali (`credentialMasker.ts`)

Jaħdem fiż-**żewġ** stadji, l-aħħar fil-katina predefinita (prijorità `95`).
Jaħbi patterns magħrufa sew ta' API keys / tokens sigrieti mill-payload ħiereġ
(kontenut tal-messaġġi, argumenti ta' sejħiet tal-għodod, riżultati tal-għodod)
**u** mir-rispons tal-fornitur, sabiex kredenzjali mwaħħla fi prompt (jew
ripetuta lura minn riżultat ta' għodda) ma tiġix żvelata lill-fornitur upstream
jew lura lill-klijent.

- **B'parteċipazzjoni espliċita biss**, bl-istess konvenzjoni bħall-ħabi tal-PII
  (qrib Hard Rule #20): ikun diżattivat sakemm
  `settings.credentialRedactionEnabled === true` **jew**
  `CREDENTIAL_REDACTION_ENABLED=true`. Meta jkun mitfi, il-mekkaniżmu ta'
  protezzjoni ma jagħmel xejn — qatt ma jimblokka u qatt ma jerġa' jikteb.
- `redactCredentials()` jgħaddi mis-siġra kollha tal-payload/rispons
  (`walkValue()`, protett kontra prototype pollution, u protett kontra ċikli
  permezz ta' `WeakSet`) u jissostitwixxi l-korrispondenzi bi placeholder
  `[REDACTED:<type>]`, filwaqt li jikklona biss il-fergħat li fil-fatt inbidlu.
- `CREDENTIAL_PATTERNS` ikopri ċ-ċwievet tal-fornituri tal-LLM (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokens ta' VCS/SaaS
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ċwievet tal-ħlas
  (Stripe, Square), ċwievet tal-cloud (AWS access key, Twilio, SendGrid,
  Mailgun), private keys / JWTs, connection strings li fihom kredenzjali
  (`mongodb://user:pass@...`, eċċ.), u pattern ġeneriku għall-valuri
  tal-headers `Authorization`/`x-api-key`/`api-key`/`apikey`. Ċwievet fil-forma
  ta' headers (`authorization`, `x-api-key`, `api-key`, `apikey`) jinħbew
  strutturalment (il-valur biss, filwaqt li prefiss tal-iskema bħal
  `Bearer `/`Basic ` jinżamm) minflok permezz tar-regex ġeneriku tat-test.
- Il-mekkaniżmu ta' protezzjoni qatt ma jimblokka; huwa jerġa' jikteb biss
  (`modifiedPayload` / `modifiedResponse`) u jżid annotazzjonijiet
  (`meta.credentialsRedacted`, `meta.count`).

Protezzjoni kontra rigressjonijiet: `tests/unit/credential-masker-guardrail.test.ts`.

## Kuntratt Bażiku (`base.ts`)

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
  block?: boolean; // true jwaqqaf il-katina immedjatament
  message?: string; // jintwera meta jsir imblukkar
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // jiġi rritornat minn preCall biex jerġa' jikteb it-talba
  modifiedResponse?: TValue; // jiġi rritornat minn postCall biex jerġa' jikteb ir-rispons
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

Guardrail jindika "l-ebda bidla" billi jirritorna jew `void`, `{}`, jew
`{ block: false }`. Ir-ritorn ta' `modifiedPayload`/`modifiedResponse` jissostitwixxi
l-valur li jgħaddi mill-katina għall-guardrails sussegwenti.
`signal?: AbortSignal` jittrasmetti ċ-ċiklu tal-ħajja ta' min jagħmel is-sejħa lill-guardrails. L-abort ta' talba huwa l-eċċezzjoni intenzjonata ta' fail-open: il-pontijiet tal-midja jwaqqfu x-xogħol u jagħmlu t-tindif mingħajr ma jirrestawraw il-midja mhux ipproċessata lejn mira li hu magħruf li ma tappoġġjahiex.

## Reġistru (`registry.ts`)

Is-singleton `guardrailRegistry` jesponi:

- `register(guardrail)` — iżid guardrail (jew jissostitwih skont l-isem normalizzat) u
  jerġa' jordna skont `priority` axxendenti.
- `clear()` / `list()` — għodod ta' għajnuna amministrattivi.
- `runPreCallHooks(payload, context)` — jgħaddi mill-guardrails attivi, jgħaddi l-
  payload minn `modifiedPayload`, u jieqaf mal-ewwel `block: true`.
- `runPostCallHooks(response, context)` — l-istess fluss fuq in-naħa tar-rispons.
- `resetGuardrailsForTests({ registerDefaults })` — ineħħi l-istat u, b'mod fakultattiv,
  jerġa' jirreġistra l-valuri predefiniti għal iżolament nadif tat-testijiet.

Iż-żewġ runners jirritornaw `{ blocked, payload|response, results, guardrail?, message? }`
fejn `results` huwa array ta' rekords `GuardrailExecutionResult` li jinkludu
l-fields `blocked`, `skipped`, `modified`, `error`, u `meta` għal kull guardrail,
utli għat-traċċar.

### Diżattivazzjoni tal-Guardrails Għal Kull Talba

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` jiġbor lista
mingħajr duplikati ta' ismijiet ta' guardrails li għandhom jinqabżu għat-talba
attwali. Is-sorsi (kollha fakultattivi, kollha magħquda) huma:

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` fil-body tat-talba (fl-ogħla livell)
- `metadata.disabledGuardrails` fil-body tat-talba
- Il-header `x-omniroute-disabled-guardrails` (jew dak legat
  `x-disabled-guardrails`)

Il-valuri jistgħu jkunu arrays ta' strings jew string separata b'virgoli; l-ismijiet jiġu
normalizzati għal kebab-case b'ittri żgħar (`pii_masker` → `pii-masker`). Ir-riżultat
jgħaddi permezz ta' `context.disabledGuardrails` lir-reġistru, li jaqbeż
il-guardrails korrispondenti (`skipped: true` f'`results`).

## Ordni tal-Eżekuzzjoni

Għal kull talba li tgħaddi minn `src/sse/handlers/chat.ts` u
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` jibni l-lista ta’ elementi li għandhom jinqabżu mill-API key, mill-body,
   u mill-headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` iħaddem il-guardrails f’ordni axxendenti
   ta’ prijorità:
   - Il-guardrails diżattivati jiġu rreġistrati bħala `skipped`.
   - Il-`preCall` ta’ kull guardrail jista’ jerġa’ jikteb il-payload permezz ta’ `modifiedPayload`.
   - L-ewwel `block: true` iwaqqaf il-katina immedjatament u l-handler jirritorna
     risposta ta’ rifjut mill-guardrail.
3. Il-payload (li potenzjalment ikun inkiteb mill-ġdid) jgħaddi għar-routing ikkombinat u
   għad-dispatch upstream.
4. Wara li tiġi assemblata r-risposta, `guardrailRegistry.runPostCallHooks(...)`
   iħaddem l-istess katina fuq ir-risposta. `block: true` hawnhekk iwarrab ir-risposta
   upstream.

Guardrails li joħolqu eċċezzjoni jiġu rreġistrati b’`error: <message>` u jiddaħħlu fil-log permezz ta’
`logger.warn`, iżda l-katina tkompli — bid-disinn, f’każ ta’ falliment tippermetti li l-proċess ikompli.

## Konfigurazzjoni

Varjabbli tal-ambjent moqrija mill-guardrails integrati:

| Varjabbli                             | Użata minn                | Effett                                                                                                                        |
| ------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Issettja għal `false` biex tiddiżattiva kompletament id-detezzjoni.                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politika tal-injezzjoni: `warn`, `block`, jew `log`. Il-valur legacy `redact` ma jerġax jikteb it-test tal-injezzjoni.        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modalità għall-guard tal-injezzjoni; huwa wkoll feature flag fid-DB li **jissostitwixxi** l-varjabbli tal-ambjent (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Is-severità minima li `MODE=block` jirrifjuta: `high` (default), `medium`, jew `low`.                                         |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legacy għal `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                          |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Meta jkun `true`, il-PII tat-talba jiġi redatt (indipendentement mill-modalità tal-injezzjoni).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Jikkontrolla l-imġiba tal-masker fuq in-naħa tar-risposta.                                                                    |

Il-guardrails tal-Modality Bridge jaqraw il-konfigurazzjoni waqt l-eżekuzzjoni mill-ħażna tas-settings
ibbażata fuq id-DB (`getSettings()`), mhux mill-varjabbli tal-ambjent. Il-keys primarji ta’ Vision huma
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, u
`modalityBridgeCacheMaxEntries`. Il-keys legacy
`visionBridge*` jiġu aċċettati biss bħala l-fallback dokumentat għall-qari għal ċiklu wieħed;
il-kitbiet mid-dashboard jużaw il-keys primarji. Il-valuri default u r-resolver tal-fallback
jinsabu f’`src/shared/constants/modalityBridgeDefaults.ts`, filwaqt li l-kostanti legacy
jinżammu f’`src/shared/constants/visionBridgeDefaults.ts`.

Audio juża `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, u `modalityBridgeAudioMaxClips`, flimkien mas-settings kondiviżi
`modalityBridgeCache*`. Audio m’għandux fallback għal keys legacy minħabba li dawn
il-keys ġew introdotti mal-iskema tal-Modality Bridge.

Video juża `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, u
`modalityBridgeVideoTimeout`, flimkien mas-settings kondiviżi `modalityBridgeCache*`.
Huwa diżattivat b’mod default minħabba li FFmpeg/ffprobe huma dipendenzi operazzjonali
fakultattivi u l-ħolqien ta’ captions għall-frames iżid il-latenza u l-ispiża tal-mudell.

## Guardrails Personalizzati

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

Passi:

1. Oħloq `src/lib/guardrails/myGuardrail.ts` li jestendi `BaseGuardrail`.
2. Implimenta `preCall` u/jew `postCall`.
3. Jew irreġistrah waqt l-importazzjoni (żidu minn `registerDefaultGuardrails`) jew
   sejjaħ `guardrailRegistry.register(...)` waqt l-eżekuzzjoni — ir-reġistru jissostitwixxi
   kwalunkwe guardrail preċedenti bl-istess isem normalizzat.
4. Żid testijiet taħt `tests/unit/` (eżempji eżistenti:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Ittestjar

Uża `resetGuardrailsForTests()` bejn it-testijiet biex tibda minn stat magħruf.
Għaddi `{ registerDefaults: false }` biex tibda b’reġistru vojt u
rreġistra biss il-guardrails li qed jiġu ttestjati. Vision Bridge jaċċetta l-injezzjoni
tad-dipendenzi (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge jesponi
l-punti ta’ separazzjoni ekwivalenti għas-settings, il-kapaċitajiet, l-għażla tal-mudell STT, il-kontrolli
tal-kredenzjali, u t-traskrizzjoni. Għalhekk, it-testijiet jistgħu jeżerċitaw iż-żewġ flussi mingħajr aċċess
għad-DB jew għan-network.

## Ara Wkoll

- `src/lib/guardrails/` — implimentazzjoni
- `src/shared/utils/inputSanitizer.ts` — detettur kondiviż li jħaddem
  il-protezzjoni kontra l-injezzjoni fil-prompt u l-maskra tal-PII
- `src/shared/constants/visionBridgeDefaults.ts` — valuri predefiniti ta’ Vision Bridge u
  lista ta’ mudelli b’bridge obbligatorju
- `src/shared/constants/modalityBridgeDefaults.ts` — valuri predefiniti kondiviżi waqt l-eżekuzzjoni għal Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — saff ortogonali (circuit breaker, perjodi ta’ stennija)
- `docs/reference/ENVIRONMENT.md` — referenza sħiħa tal-varjabbli tal-ambjent

## Kopertura tar-rotot tal-protezzjoni kontra l-injezzjoni u red-team (Fażi 8 · Blokka D)

Il-protezzjoni kontra l-injezzjoni (`createInjectionGuard` / `withInjectionGuard`) tkopri r-rotot kollha
li jaċċettaw prompts tal-utenti. Tirrispetta `INJECTION_GUARD_MODE` (il-valur predefinit `warn` = tirreġistra biss;
`block` = tirritorna HTTP 400 `SECURITY_001`).

| Tip              | Rotot                                                                                                                                                | Modalità predefinita |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Test (eżistenti) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                 |
| Ġenerattiv       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                 |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                 |

L-estrazzjoni tat-test (`extractMessageContents`) tkopri `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kull lejl, `nightly-llm-security.yml`):** promptfoo jivvalida li kull rotta timblokka
l-korpus OWASP-LLM meta `INJECTION_GUARD_MODE=block`; garak iħaddem probes (jinqabeż mingħajr secret).
`moderations` huwa inkluż għall-konsistenza — l-operaturi fil-modalità ta’ mblukkar jistgħu jeżentawh permezz ta’
`resolveDisabledGuardrails`.

Il-workflow ta’ kull lejl (`.github/workflows/nightly-llm-security.yml`, cron + attivazzjoni
manwali) għandu żewġ jobs:

- **`promptfoo-guard` (blokkanti)** — iħaddem `promptfoo eval -c promptfooconfig.yaml`
  b’`INJECTION_GUARD_MODE=block`. Kull każ avversarju (eż. "ignore all
  previous instructions…", jailbreaks tal-istil DAN) jivverifika li r-risposta ġġorr
  `error.code === "SECURITY_001"`, jiġifieri li l-protezzjoni fil-fatt irrifjutat it-talba.
- **`garak` (konsultattiv)** — iħaddem garak `--probes promptinject,dan,leakreplay`
  kontra istanza lokali ta’ OmniRoute (`http://localhost:20128/v1`). Huwa kkundizzjonat minn
  secret tal-fornitur (`PROMPTFOO_PROVIDER_KEY`); jinqabeż mingħajr problemi u għandu s-suffiss
  `|| true`, għalhekk jirrapporta mingħajr ma jfalli s-CI.

Il-kopertura tal-helper tal-protezzjoni (`createInjectionGuard` / `withInjectionGuard`)
testendi għal kull rotta `/v1` li ġġorr prompt; it-test tal-prompt jittieħed minn
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` minn
`extractMessageContents()` f’`src/shared/utils/inputSanitizer.ts`.
