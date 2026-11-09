# Guardrails (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sors tal-verità:** `src/lib/guardrails/`
> **Aġġornat l-aħħar:** 2026-10-17 — v3.8.52 (miżjud [Kopertura u limiti](#coverage-and-limits):
> liema rotot u mogħdijiet ta' rispons jilħqu l-hooks, il-headers magħquda tad-diżattivazzjoni (#16412), il-modalità block tal-injezzjoni bħala limitu obbligatorju (#16413), u x'jara rispons qabel il-post-call)

Il-guardrails jinfurzaw trasformazzjonijiet ta' sigurtà, politika u kontenut fil-limitu
bejn OmniRoute u l-fornituri upstream. Kull guardrail jista' jispezzjona (u
b'mod opzjonali jirrifjuta, jittrasforma, jew jannota) il-payloads tat-talbiet
(`preCall`) u r-risponsi upstream (`postCall`).

Is-sistema hija **fail-open**: jekk guardrail jarmi eċċezzjoni waqt l-eżekuzzjoni,
ir-reġistru jirrekordja l-iżball u jkompli mal-guardrail li jmiss minflok ifalli
t-talba. Il-block huwa deċiżjoni espliċita (`block: true`), qatt aċċident.
L-unika eċċezzjoni hija talba abortita: meta s-`signal` tal-sejjieħ tiġi abortita,
guardrail li jarmi jirrifjuta r-run tal-hook minflok jiġi mqabbez.

Il-hooks **ma** jimxux fuq kull rota jew kull rispons. Aqra
[Kopertura u limiti](#coverage-and-limits) qabel tafda fuq guardrail bħala
kontroll ta' sigurtà.

## Guardrails Mibnija

Ir-reġistru jgħabbi awtomatikament sitt guardrails f'ordni ta' prijorità mal-importazzjoni (ara `registry.ts` → `registerDefaultGuardrails()`):

| Prijorità | Isem                | Stadju(i)      | Fajl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Jiġru numri ta' prijorità aktar baxxa** l-ewwel** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Il-mudell bażi GLM 5.3 u `glm-5.3-{low,high,max}` għandhom metadejta espliċita `supportsVision:false` registry/spec. Il-varjanti GLM 5.3 Flash jibqgħu mudelli ta 'viżjoni nattiva. Ir-rotta `/v1/messages` tal-Kodiċi Claude tidħol fil-katina tal-guardrail kondiviża `handleChat` qabel is-sejħa** qabel** Traduzzjoni Claude-to-OpenAI; immaġini ta' riżultat ta' għodda `Read` imbejjita għandhom jiġu deskritti jew immaniġġjati qabel dik it-traduzzjoni tgħollihom f'kontenut OpenAI `image_url` (#17069).

Jinterċetta talbiet li jkollhom immaġini mmirati** mudelli mhux tal-vista** u jew ibiddel it-talba kollha lejn mudell kapaċi viżibbli jew jissostitwixxi l-partijiet tal-immaġni b'deskrizzjonijiet tat-test prodotti minn mudell ta' viżjoni konfigurabbli qabel is-sejħa upstream. Dan jippermetti lill-fornituri tat-test biss jimmaniġġjaw it-tagħbija multimodali b'mod trasparenti.

Fluss:

1. Aqbeż jekk il-mudell fil-mira diġà jappoġġja l-viżjoni (sakemm ma jidhirx fil-lista tal-pont sfurzat `isVisionBridgeForcedModel`).
2. Oħroġ partijiet tal-immaġni permezz ta' `extractImageParts(messages)` (`visionBridgeHelpers.ts`), li jiddelega lill-** ditekter tal-midja unifikata** `detectMediaParts()` `open-sse/utils/mediaParts.ts` — is-sors uniku tal-verità kondiviż mal-filtru tal-kompatibilità combo. L-estrazzjoni hija permessa għall-forom `replaceImageParts` jistgħu jgħaqqdu lura (l-estratt ↔ jissostitwixxi kuntratt): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, u Rispons API `input_image`. Immaġini li jaqblu magħqudin ġewwa Claude Code `tool_result.content` u l-outputs tal-għodda Rispons huma wkoll estratti u sostitwiti fil-mogħdijiet oriġinali tagħhom; forom indikatur biss huma materjal combo-filter u mhumiex estratti. Aqbeż jekk xejn ma jinstab.
3. Issolvi l-konfigurazzjoni tar-runtime permezz ta `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): ċwievet tas-settings `modalityBridge*` ġodda jirbħu; ċwievet `visionBridge*` legacy jibqgħu a** riżerva ta' ċiklu wieħed** (tieqa rollback). Aqbeż qabel kwalunkwe traversal tal-midja meta l-pont ikun diżattivat.
4. Il-mod selettur (`modalityBridgeVisionMode`, ara t-tabella hawn taħt) jiddeċiedi li jbiddel ir-rotta vs jiddeskrivi. Reroute jirritorna `modifiedPayload` `model` skambjat biss, flimkien ma' meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Iddeskrivi l-mogħdija: immaġini tal-kappa `maxImages`, ikkomponi l-pront konxju tal-kompitu, ikkonsulta l-cache tad-deskrizzjoni, sejjaħ il-mudell tal-viżjoni** b'mod parallel** (`Promise.allSettled`), u injetta partijiet tat-test `[Image N]: <description>` minflokhom. Deskrizzjoni falluta tagħti `null`: l-immaġni mhux ippreżervata hija ppreservata għal miri unknown/vision-capable (#4012), iżda** mira diretta tat-test ikkonfermata biss** jew żero-vision combo tikseb stub tat-test `(unavailable — no vision-capable provider connected)` espliċitu għal kull immaġini mhux deskritta, inklużi fallimenti parzjali u immaġini lil hinn mill-limitu tad-deskrizzjoni tas-sejħa (#17069). Il-combo eżistenti li fallew kollha jiddeskrivu fallback jibqa 'f'postu (#8430).
6. Ritorn `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selettur tal-mod (`modalityBridgeVisionMode`)

| Modalità   | Default | Imġieba                                                                                                                                                                                                                                                                                                                           |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Euristiku tal-wirt, mhux mimsus (#6640/#7204): mudelli mhux kombo/`auto/` jibdlu rotta lejn l-aħjar mudell tal-viżjoni sakemm il-mudell oriġinali ma jkollux diġà kredenzjali użabbli (imbagħad iddeskrivi); miri combo dejjem jiddeskrivu.                                                                                       |
| `describe` |         | Dejjem iddeskrivi — il-blokka tar-rotta tkun skipped kompletament; il-mudell magħżul tal-utent dejjem iwieġeb.                                                                                                                                                                                                                    |
| `reroute`  |         | Forza rotta ġdida: il-gwardja tal-mudell keep-credentialed hija bypassed. Ir-rotta mill-ġdid-** mira** il-gwardja tal-kredenzjali għadha tapplika — meta ma teżisti l-ebda mira viżibbli li tista 'tintuża, il-pont jimblokka bi żball ċar aktar milli jiddeskrivi jew jibgħat immaġini mhux ipproċessati lil mira ta' test biss. |

Modi sfurzati short-circuit** qabel** il-ġirjiet auto euristiċi; L-imġieba `auto` hija byte-identika għall-guardrail pre-PR-1.

#### API-key scope (`visionBridgeKeyScope.ts`)

Meta ċ-ċavetta API ta 'min iċempel tirrestrinġi `allowedConnections`, pools ta' kwota (`allowedQuotas`) jew mudelli (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), il-pont biss jiġbor ir-rotta u jiddeskrivi mudelli li ċ-ċavetta tista 'tuża, fuq konnessjonijiet li ċ-ċavetta tista' tuża. Is-sejħa jiddeskrivi mbagħad dejjem tgħaddi mill-awto-loop OmniRoute bl-header `x-omniroute-self-loop-key-id`, għalhekk it-talba taċ-chat li tirċievi terġa' tinforza l-konnessjoni ta' dik iċ-ċavetta u l-politika tal-mudell. `enforceApiKeyPolicy()` jonora dak l-header biss flimkien mal-self-loop bearer, għalhekk jista 'biss jonqos l-aċċess, u id li ma ssolvix jiġi miċħud.

Jekk l-ebda mudell ta' viżjoni mhu permess għaċ-ċavetta, a** mira kkonfermata ta' test biss** jirrifjuta t-talba tal-immaġini lokalment HTTP 400 ċara minflok ma tibgħat bytes tal-immaġni lil upstream inkapaċi (#17069). Għal miri b'kapaċità ta' viżjoni mhux magħrufa jew indiġena, il-mogħdija deskritta żżomm l-imġieba ta 'fail-open preċedenti tagħha (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Talbiet mingħajr ċavetta, u ċwievet mingħajr dawn ir-restrizzjonijiet, iġibu ruħhom eżattament bħal qabel.

#### Iddeskrivi fil-pront (`modalityBridgeVisionTaskAware`) konxju tal-kompitu

Default** veru** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) tehmeż it-test tal-** l-aħħar messaġġ tal-utent** (maqtugħ għal 500 chars) għall-bażi jiddeskrivi fil-pront, id-deskrizzjoni lejn dak li l-utent fil-fatt talab (mudell codex-vision-proxy) u titlob lill-mudell tal-viżjoni biex jittraskrivi test viżibbli. Bil-bandiera mitfija — jew bl-ebda test tal-utent — il-pront bażi jintuża mhux mibdul.

Ir-rikjesta kompatibbli mal-OpenAI tal-self-loop jiddeskrivi (`callVisionModelSingle()` `visionBridgeHelpers.ts`) dejjem titlob `image_url.detail: "high"` — mingħajr kundizzjonijiet, għal kull caller/provider, mhux gated fuq kwalunkwe sinjal tal-klijent. Kampjunar b'dettall baxx jiddegrada l-eżattezza OCR eżattament għall-kompitu tat-traskrizzjoni tat-test li dan il-pront jitlob, għalhekk is-sejħa jiddeskrivi nnifisha dejjem titlob dettall għoli irrispettivament minn liema livell ta 'dettall użat it-talba deħlin oriġinali. Dan jaffettwa biss il-korp intern tat-talba tad-deskrizzjoni; ma tbiddilx kif OmniRoute jibgħat `image_url.detail` stess ta' min iċempel fuq it-talba primarja — li l-inadempjenza tiġi applikata separatament, u biss għal klijenti OpenCode misjuba, `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Il-fergħa tal-format tal-wajer Anthropic tad-deskrizzjoni awto-linja m'għandha l-ebda qasam `detail` u mhix affettwata mill-ebda default.

#### Iddeskrivi l-limitu tal-output (`modalityBridgeVisionMaxChars`)

| Ewlenin                        | Default | Firxa             |
| ------------------------------ | ------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` jew 100–50000 |

`0` (default) tfisser** ebda għatu** — id-deskrizzjoni rritornata minn `callVisionModel()` hija mgħoddija mhux modifikata, u tippreserva l-imġieba eżistenti. Kwalunkwe valur fil-medda 100–50000 jaqta' d-deskrizzjoni b'suffiss `…` qabel ma jiġi spliced lura bħala `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` `src/lib/guardrails/visionBridge.ts`). Għolli dan għal kompiti OCR b'ħafna dettall fejn il-mudell downstream jeħtieġ it-traskrizzjoni sħiħa; baxxiha għall-użu ta' tokens marbut fuq mudelli ta' viżjoni chatty. Il-qasam tad-dashboard jgħix fuq il-pannell Avvanzat tat-tab tal-Viżjoni (`modality-bridge-max-chars` `ModalityBridgeVisionTab.tsx`) u clamps kwalunkwe valur bejn 1 u 99 sa l-art 100 filwaqt li jħalli `0` espliċitu mhux mimsus — `0` huwa valur Zod validu fih innifsu (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mhux sempliċement "unset" default.

#### Iddeskrivi cache (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL fil-memorja għal outputs deskritti, maqsuma mal-proċess kollu. Ċavetta = `sha256(imageRef + composedPrompt + configuredBridgeModel)` b'qafas ta' prefiss ta' tul (l-ebda ħabtiet tal-konfini tal-kamp). Il-komponent tal-mudell huwa l-** ikkonfigurat** mudell tal-pont, mhux il-mudell li fil-fatt wieġeb — `callVisionModel` jista' jaqa' lura internament, u l-keying għal kull tentattiv jifframmenta l-cache. Id-deskrizzjonijiet falluti qatt ma jiġu miżmuma fil-cache. Settings:

| Ewlenin                         | Default | Firxa   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalizzazzjoni remota tal-immaġni (self-loop describe/base64 fetch)

Meta l-pont iġib a** remot** immaġini innifsu — l- Anthropic jiddeskrivi awto-sejħa u l-konverżjoni claude-wire-format base64 (`ensureBase64ImagesForClaudeWire`), it-tnejn permezz `fetchRemoteImageAsDataUri()` fi `visionBridgeHelpers.ts` — id-data li tirriżulta URI hija mgħoddija minn `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) qabel ma tkun inkorporata fit-talba tal-mudell tal-viżjoni. Immaġini ta' daqs żejjed jitnaqqsu għal a** 2048px tarf twil** (li tqabbel il-kappa tar-resize OpenAI/Anthropic diġà tapplika fuq in-naħa tas-server), li tnaqqas it-tlugħ bytes/latency mingħajr ma tbiddel dak li jara l-mudell tal-viżjoni. Id-daqs mill-ġdid juża `sharp`, mgħobbi permezz ta' importazzjoni dinamika: fuq pjattaforma fejn il-binarju nattiv tiegħu jonqos milli jgħabbi, `normalizeDataUri()`** qatt ma titfa’** — jaqa 'lura għal passthrough tal-bytes oriġinali, għalhekk il-mogħdija describe/base64-conversion dejjem tibqa' taħdem. Bytes mhux immaġini (fetch li ma rritornax immaġni dekodifikabbli) huma wkoll mgħoddija mhux mittiefsa. Din in-normalizzazzjoni hija mmirata għal immaġini li l-pont iġib għall-awto-sejħa tiegħu stess — qatt ma tiġi applikata għat-tagħbija tal-passthrough mhux ipproċessata ta 'min iċempel, konsistenti mal-prinċipju ta' mutazzjoni opt-in-only (Hard Rule #20).

#### Settings schema + migration

Iċ-ċwievet `modalityBridge*` ġodda huma validati bi `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, it-trio `modalityBridgeCache*`, u l-grupp `modalityBridgeAudio*` użat mill-Audio Bridge. Migrazzjoni `141_modality_bridge_settings.sql` tikkopja valuri `visionBridge*` wirt eżistenti għaċ-ċwievet ġodda li jaqblu (idempotent, qatt ma tissostitwixxi valur `modalityBridge*` stabbilit mill-operatur); iċ-ċwievet tal-wirt jibqgħu aċċettati bħala riżerva tal-qari għal ċiklu ta 'rilaxx wieħed.

#### Trasparenza header + stats

Risposti deskritti trasformati jġorru `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (mibnija minn `buildModalityBridgeHeader()` fi `modalityBridge/bridgeStats.ts`, ittimbrata minn `withModalityBridgeHeader()` fi `src/sse/handlers/chatHelpers.ts`). Talbiet rerouted jiksbu** le** header — it-tagħbija ma ġietx mittiefsa u l-iskambju tal-mudell huwa diġà viżibbli fil-qasam `model` tal-korp tar-rispons.

`GET /api/modality-bridge/stats` (management auth, l-istess saff bħal `GET /api/settings`) jirritorna l-counters fil-memorja għal kull modalità `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` għal `vision`, `audio`, u `video`. `averageLatencyMs` juża `latencySamples`, mhux it-tentattivi kollha, bħala d-denominatur tiegħu; operazzjoni mingħajr timing ma tiffabbrikax kampjun żero millisekonda. `bridged` jibqa 'l-alias kompatibbli b'lura għal konverżjonijiet b'suċċess; tentattivi falluti ma jżiduhx. Il-counters reset mal-bidu mill-ġdid tal-proċess bid-disinn (telemetrija, mhux kontabilità).

#### Konfigurazzjoni tad-dashboard

Il-paġna ddedikata tad-dashboard hija `/dashboard/settings/modality-bridge`. It-tabs `Vision`, `Audio`, u `Video` indirizzabbli mill-URL tiegħu jippreservaw il-parametri tal-mistoqsija waqt li jaqilbu l-valur `tab`. It-tab tal-Viżjoni tesponi l-abilitazzjoni, il-mod, l-għażla tal-mudell (inkluż l-inadempjenza awtomatika), t-tlugħ konxju tal-kompitu, limiti timeout/image/description-length/cache avvanzati, runtime counters, u talba ta’ kampjun protetta. It-tab Awdjo hija wkoll diretta: tesponi l-abilitazzjoni, picker tal-mudell STT biss b'Auto, limiti timeout/max-clip, counters tal-awdjo, u test tal-kampjun `input_audio`. It-tab tal-Vidjo hija funzjonali: tirrapporta l-istat tar-runtime FFmpeg/ffprobe — wieħed minn erba' stati UI espliċiti (`unknown` waqt li s-sonda tkun qed titjira jew ma setgħetx titlesta, `restricted` fuq host dashboard mhux loopback fejn is-sonda tinqabeż min-naħa tal-klijent, `unavailable` ladarba sondat u kkonfermat nieqsa, jew `available` bil-mudell FFmpeg/ffprobe jippersisti, il enable/model/frame/video/timeout — ) picker għal mudelli kapaċi viżjoni, u jesponi vidjo counters.

Il-karta tal-Vision Bridge preċedenti taħt is-settings AI hija link ta' kompatibilità mal-paġna l-ġdida; m'għadhiex tippossjedi t-tieni kopja tal-formola. Il-Fornituri tal-Midja jgħaqqdu wkoll il-flussi tax-xogħol minn Immaġni għal Test u Diskors għal Test mat-tabs korrispondenti tal-Modality Bridge mingħajr ma jneħħu l-bitħa eżistenti tad-Diskors għal Test.

**Self-loop admission bypass:** when the describe call routes through OmniRoute's own `/v1` self-loop (non-standard provider model), the sub-request sends `x-omniroute-admission-bypass: internal` and is authenticated with the resolved self-loop credential — the local `sk_omniroute` sentinel in local mode, or the operator-configured `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350) so `REQUIRE_API_KEY=true` deployments can still run the describe call. The bypass is only honored for those exact credentials, so external clients cannot use the header to skip admission.

Legacy defaults live in `src/shared/constants/visionBridgeDefaults.ts`; il-defaults ġodda mode/task-aware/cache s-settings resolver jgħixu `src/shared/constants/modalityBridgeDefaults.ts`. Il-guardrail jesponi għażla ta' kostruttur `deps` sabiex it-testijiet jistgħu jinjettaw implimentazzjonijiet foloz `getSettings` u `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Jinterċetta talbiet ta' chat li jġorru l-awdjo qabel ma jilħqu mira li mhix magħrufa li taċċetta input awdjo. Qatt ma tbiddel ir-rotta tat-talba taċ-chat: il-partijiet tal-awdjo jiġu traskritti permezz tal-endpoint multipart eżistenti kompatibbli mal-OpenAI u l-mudell taċ-chat magħżul ikompli bit-traskrizzjonijiet tat-test.

Fluss:

1. Issolvi `supportsAudio` permezz ta `getResolvedModelCapabilities()`. Metadejta espliċita tal-fornitur-reġistru tirbaħ, imbagħad metadejta tal-mudell statiku, imbagħad `modalities_input` sinkronizzat . Lista ta' input iddikjarata mingħajr `audio` hija `false`; l-ebda evidenza ta' kapaċità ma tibqa' `null`. Kemm `false` kif ukoll `null` jattivaw il-pont konservattiv, filwaqt li `true` jevitah.
2. Issolvi s-settings `modalityBridgeAudio*` u estratt partijiet awdjo ta' l-ogħla livell li jistgħu jiġu spliceable minn kull messaġġ permezz tad-ditekter `detectMediaParts()` kondiviż. Forom tal-wajer appoġġjati huma OpenAI `input_audio`, `audio_url`, u `source.media_type: "audio/*"`. Awdjo nested jiġi skopert għar-routing iżda mhux imneħħi mill-mogħdija ta 'splice. Ix-xoghol huwa limitat minn `modalityBridgeAudioMaxClips`; partijiet aktar tard jibqgħu mhux mittiefsa.
3. Onora `provider/model` konfigurat, jew ħalli `selectAudioBridgeModel()` jimxi `AUDIO_TRANSCRIPTION_PROVIDERS` f'ordni ta' katalgu stabbli u agħżel l-ewwel mudell b'kredenzjali ta' fornitur attiv li jista' jintuża.
4. `callAudioTranscription()` tikkonverti base64/data-URI awdjo għal `file` b'ħafna partijiet, jew tniżżel `audio_url` remot permezz tal-gwardja tal-ħruġ għall-pubbliku biss DNS pinning u 25 MB marbut. Imbagħad POSTs il-fajl u l-mudell magħżul għall-awto-loop `/v1/audio/transcriptions` lokali, awtentikati `resolveSelfLoopBearer()`. Ir-rotta tat-traskrizzjoni eżistenti twettaq tfittxija normali tal-kredenzjali, ġestjoni cooldown/rate-limit, u dispaċċ tal-fornitur.
5. Sejħiet b'suċċess jissostitwixxu l-partijiet tagħhom `[Audio N]: <transcript>`. Is-sejħiet jimxu `Promise.allSettled`: falliment individwali jippreserva dik il-parti tal-awdjo oriġinali (kuntratt #4012 ). Jekk kull sejħa tfalli u l-mira hija ppruvata `supportsAudio === false`, il-partijiet isiru `[Audio N]: (unavailable — no STT provider connected)` (kuntratt #8430 ). Għal mira mhux magħrufa (`null`), riżultat ta' falliment kollu jibqa' mhux mimsus. Mira ppruvata ta' test biss mingħajr kredenzjali STT użabbli tirċievi l-istess stub espliċitu mingħajr ma toħroġ sejħa tan-netwerk.

Traskrizzjonijiet b'suċċess jużaw il-modality Bridge LRU/TTL cache madwar il-proċess kollu. Iċ-ċavetta tgħaqqad ir-referenza tal-awdjo, it-tikketta tal-operazzjoni `audio-transcription` stabbli, u l-mudell STT magħżul; fallimenti qatt ma huma cache. It-tentattivi tal-awdjo jaġġornaw il-counters kondiviżi `bridged`, `cacheHits`, `failures`, u `lastUsedAt`. Risposti trasformati jġorru `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; talbiet mhux mittiefsa ma jirċievux segment Audio Bridge.

Is-settings tar-runtime huma appoġġjati minn DB u validati minn Zod:

| Ewlenin                       | Default | Firxa           |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto jew STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Il-cache kondiviż jibqa' kkontrollat minn `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, u `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Jinterċetta partijiet tal-vidjo tal-ogħla livell f'Chat Completions `messages` u Rispons API `input` qabel ma tissejjaħ mira mingħajr appoġġ tal-vidjo nattiv magħruf. Forom appoġġjati huma `input_video`, `video_url`, `video_source`, HTTPS URLs, u `data:video/*;base64,...` data URIs. L-ismijiet tal-fajls sempliċi fit-test mhumiex ittrattati bħala vidjo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) jippossjedi t-traversal tat-talba, il-kontroll capability/policy, l-aggregazzjoni għal kull talba, u t-tagħbija tar-rispons. Akkwist — tax-xogħol għal kull vidjo, il-cache tar-riżultat kollu, li tiddeskrivi sekwenza ta 'frejms (li tgħaqqad kwalunkwe traskrizzjoni awdjo ddikjarata minn min iċempel), u kull tentattiv metrics/abort/cleanup — hija moħbija wara `processVideoPart` `videoBridgePipeline.ts`, imsejħa darba għal kull parti tal-vidjo ġewwa l-linja ta' `preCall`. Dak il-modulu jiddefinixxi wkoll il-konfini espliċiti tal-port `VideoMediaBrokerPort` (akkwist ta’ bytes u estrazzjoni ta’ frames kampjunati), `VideoAudioTranscriptionPort` (jgħaqqad traskrizzjoni awdjo ddikjarata minn min iċempel mal-captions kampjunati), u `VideoDrilldownPort` (il-forma ta’ maħżen mhux maħdum legat). Produzzjoni STT u żamma tal-qafas huma komposti madwar il-port li jiddeskrivi permezz `createVideoSttAdapter` u `createVideoDrilldownAdapter`; dan tal-aħħar juża ċ-ċiklu tal-ħajja kondiviż tal-manku opak.

Il-mogħdija tat-talba `/v1` pubblika qatt ma timporta jew tinvoka subprocess. Vidjows remoti jitniżżlu taħt 50 MiB marbut; Vidjows inline base64 għandhom limitu konservattiv ta' 36 MiB dekodifikat għal kull vidjo sabiex l-envelop model/messages/framing jista 'jibqa' ġewwa l-limitu ta' ammissjoni ta 'talba JSON pubblika ta' 50 MiB. It-tul inline u l-istimi tad-daqs dekodifikat huma kkontrollati qabel l-allokazzjoni. HTTPS huwa meħtieġ fuq iż- URL remot inizjali u kull redirect, bl-użu tal-gwardja eżistenti tal-barra pubblika biss DNS pinning. Il-bytes imbagħad jaqsmu l-konfini interni eżatti tas-sensar `POST /api/modality-bridge/video/extract`. Dik ir-rotta hija kemm `LOCAL_ONLY` kif ukoll `SPAWN_CAPABLE`, taċċetta biss talba ta' loopback fdati u awtentikata għal kull proċess, u qatt ma taċċetta URL, mogħdija tas-sistema tal-fajls, eżekutibbli, jew lista ta' argumenti. Il-pipeline tad-daqs tal-ġisem API u l-qarrej tal-ġisem inkrementali tal-handler jinfurzaw b'mod indipendenti limitu ta 'input ta' sensar ta '50 MiB. Il-kju delimitat tiegħu jmexxi estrazzjoni waħda kull darba, jippermetti erba' xogħlijiet pendenti, u limiti pendenti għall-input f'100 MiB.

Ġewwa s-sensar, `ffprobe` jaqra fajl lokali privat; il-lista ta' permessi ta' format fiss teskludi l-formati tal-playlist u l-manifest. Għal kontenituri tal-familja MOV permessi, ir-referenzi tad-dejta esterni MOV jibqgħu diżattivati b'mod awtomatiku, u l-kmand fiss ma jagħżilx għalihom. Kemm `ffprobe` kif ukoll `ffmpeg` jużaw il-lista bajda tal-protokoll `file` -only, ħajta waħda, arrays ta’ argument fissi, l-ebda qoxra, u eżekutibbli solvuti minn `PATH`. Il-flussi tal-qoxra tal-istampa mehmuża mhumiex kandidati li jistgħu jintlagħbu. Il-flussi kollha li jistgħu jintlagħbu għandhom jissodisfaw il-limiti, u fluss awtomatiku espliċitu huwa ppreferut qabel il-fallback deterministiku tal-inqas indiċi. Il-vidjows huma limitati għal 600 sekonda, 8,192 pixel għal kull dimensjoni, u 33,554,432 pixel sors. FFmpeg jieħu kampjuni minn 1–16 frames JPEG tal-punt tan-nofs, jnaqqas it-tarf it-tul sa mhux aktar minn 1,024 pixel mingħajr ma jtejjeb l-inputs iżgħar, u qatt ma jirċievi URL. It-teħid ta' kampjuni huwa `uniform` awtomatikament. Il-politiki `scene_aware` u `segment_aware` sperimentali mhux obbligatorji jwettqu pass FFmpeg fiss wieħed addizzjonali fuq il-fluss lokali diġà vvalidat, agħżel timestamps tax-xena `showinfo` delimitati, u jaqgħu lura b'mod deterministiku għall-istess punti tan-nofs uniformi fuq falliment tad-detector, timeout, output malformat, jew sett ta 'kandidat vojt. Il-modalità konxja tas-segment talloka kampjuni tal-punt tan-nofs proporzjonalment għall-intervalli tax-xena validati; evidenza konxja tas-segment u l-imġieba fallback huma dettaljati hawn taħt. Il-limitu iebes ta' 16-il qafas jiġi applikat wara l-għażla f'kull politika. Meta talba konxja tax-xena għandha biss baġit ta 'qafas wieħed, tuża l-punt tan-nofs uniformi tat-tieqa attiva tal-vidjo sħiħ jew tal-fokus u tirrapporta `policyEffective: uniform`: qafas ta' xena magħżul wieħed ma jistax jippreserva ż-żewġt itruf temporali. Min iċempel jista' b'għażla jipprovdi tieqa ta' fokus finit (`start`/`end` sekondi); limiti huma kklampjati għat-tul tal-midja, twieqi maqluba jew mhux finiti huma miċħuda, u l-politiki kollha ta 'kampjunar huma mwettqa biss ġewwa l-intervall normalizzat. It-tieqa li tirriżulta hija inkluża fil-metadejta tat-teħid tal-kampjuni u fil-prefiss tad-deskrizzjoni mhux affidabbli sabiex il-mudelli downstream ikunu jistgħu jiddistingwu silta ffukata mill-kronoloġija sħiħa.

Il-fokus tal-caption semantiku huwa setting separat u espliċitu. Il-modalità ta' analiżi `full` default tippreserva l-pront tal-qafas eżistenti u qatt ma tibgħat it-test tat-talba lill-mudell tal-caption. Fil-modalità `focused`, il-pont jaqra biss l-aħħar `text`/`input_text` awtur mill-utent mhux vojt mill-istess kontenitur Chat jew Rispons, jinnormalizzah għal NFC, ikkollassa karattri ta 'kontroll u spazju abjad, u jillimitah għal 500 punt ta' kodiċi Unicode. Riżultat vojt jaqa' lura għall-pront eżatt `full`. Ħjiel użabbli huwa serjalizzat bħala JSON f'blokk dedikat ta' kuntest ta' utent mhux affidabbli u jista' jagħti prijorità biss dettalji osservabbli; ma jistax jegħleb it-twissija separata kontra l-istruzzjonijiet li ġejjin viżibbli jew li jinstemgħu fil-midja. L-enfasi testwali qatt ma tiddeduċi `start`/`end` jew tibdel il-kampjun temporali.

#### FU-07 evidenza tas-segment strutturali

`segment_aware` juża pass wieħed ta' pre-analiżi limitat fuq il-fluss tal-vidjo lokali diġà vvalidat. Il-katina fissa tal-filtru l-ewwel tiskala sa mhux aktar minn 320 pixel wiesgħa, tiskopri bidliet fix-xena u intervalli ffriżati, imbagħad kampjuni f'qafas 1 kull sekonda għal informazzjoni ċċajpar, luma medja, u spatial/temporal. Il-pass huwa limitat għal 600 kampjun strutturali, ħajt FFmpeg/filter wieħed, l-istess protokoll -only `file` allowlists tal-kontenitur, 1 MiB proċess-output marbut, u l-aktar 30 sekonda ġewwa abort/deadline. kondiviż tas-sensar Qatt ma jaċċetta kmand, filtru, mogħdija jew URL mit-talba.

Il-valuri strutturali huma evidenza ta 'kampjunar deterministiku, mhux fehim tal-vidjo semantiku. Ma jiddeduċux suġġetti, azzjonijiet, captions, diskors, jew intenzjoni tal-utent. Il-konfini tax-xena u l-iffriżar jiffurmaw segmenti; l-iffriżar tal-kopertura, iċ-ċajpra, l-espożizzjoni, id-dettall spazjali u l-bidla temporali jinfluwenzaw biss kif jiġi allokat il-baġit eżistenti ta' 1–16 frame. Segment iffriżat kompletament huwa limitat f'qafas wieħed, filwaqt li segmenti mhux iffriżati jikkompetu għall-baġit li jifdal. Meta l-konfini jaqbżu l-frejms, il-kopertura tal-kronoloġija uniformi tinżamm sabiex qatgħat bikrin mgħaġġla ma jistgħux jaħbu segment twil ta 'wara. Il-konfini tax-xena fi ħdan ir-riżoluzzjoni ta' analiżi ta' sekonda ta' konfini ta' ffriżar huma mgħaqqda.

Filtri neqsin, evidenza malformed/empty, żball fid-detector, jew il-timeout ta' qabel l-analiżi limitata jonqsu miftuħa għall-politika tal-punt tan-nofs uniformi eżatt. Abort ta' min iċempel jew skadenza tas-sensar ma tonqosx tiftaħ: ittemm is-sottoproċess waqt it-titjira, tipprevjeni l-estrazzjoni tal-qafas aktar tard, u s-siġra temporanja privata titneħħa `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` jiġġenera attrezzaturi FFmpeg reali deterministiċi għal iffrankar ta 'caption-call wara d-dedup, allokazzjoni tal-baġit ta' moviment dens, evidenza blur/exposure/SI-TI, qtugħ rapidu b'denb twil, u pożittivi foloz gradwali. Jirreġistra l-ħin tal-ħajt ta' qabel l-analiżi u, fejn `/usr/bin/time` huwa disponibbli, it-tfal CPU u l-quċċata RSS. Il-kontrolli tal-kwalità tiegħu huma orakli strutturali biss. Il-kwalità tal-mudell tal-caption reali tibqa `HOLD` minħabba li dan l-arness m'għandu l-ebda endpoint awtorizzat jew imħallef iffriżat. L-iffrankar monetarju jibqa' wkoll `HOLD` sakemm `--caption-cost-per-call-usd` ma jipprovdix stima pożittiva espliċita għal kull sejħa; l-iskrittura qatt ma tiffabbrika l-ebda riżultat.

Kull qafas huwa limitat għal 4 MiB, il-frejms mhux maħduma kollha flimkien għal 23 MiB, u r-rispons tas-sensar serialized għal 32 MiB. Direttorju temporanju privat jitneħħa `finally`. OmniRoute ma jgħaqqadx FFmpeg u ma jaċċettax mogħdija eżekutibbli apposta. Qabel it-titoli, il-pont japplika pass ta' deduplikazzjoni viżwali konservattiva: kull JPEG jitnaqqas għal buffer ta' 16 × 16 fuq skala griża u jitqabbel biss mal-aħħar qafas miżmuma. Għal baġit ta' caption mitlub 'il fuq minn qafas wieħed, l-estrazzjoni tipprovdi ġabra ta' kandidati limitati sa d-doppju ta' dak il-baġit u qatt aktar minn 16-il qafas. Il-limitu mitlub jiġi applikat biss wara d-duplikazzjoni, bl-ewwel u l-aħħar kandidati magħżula jinżammu waqt it-tnaqqija finali meta l-baġit ikun mill-inqas tnejn. Il-politika `grayscale-16x16-mean-cells-v2` verżjoni tuża l-akbar tad-delta tal-luma medja u l-proporzjon taċ-ċelloli thumbnail li d-delta normalizzat tagħhom huwa mill-inqas 0.05. Il-limitu duplikat huwa l-kostanti 0.04, magħżul għall-prevedibbiltà aktar milli espost bħala setting ta 'runtime. Dan is-sinjal sekondarju b'kuntrast għoli jippreserva moviment żgħir u bidliet fit-test viżibbli li paragun ta' medja biss jista' jaħbi. L-iżbalji tal-komparatur jew tad-decoder ifallu u jżommu l-kopertura. Metadata tal-output tissepara kandidati estratti, frames użati b'suċċess, u duplikati viżwali waqgħu.

Parti tal-vidjo mmarkata b'mod espliċitu tista' titlob folja ta' kuntatt b'marka taż-żmien. Il-pont jibni l-aktar grid JPEG ta’ 4 kolonni, 16-il qafas. Kull ċellula ta '512-il pixel taħraq it-timestamp tas-sors tagħha f'faxxa tal-qiegħ b'kuntrast għoli, filwaqt li l-istess timestamps jibqgħu fil-metadejta testwali għal assoċjazzjoni downstream u verifika. JPEG komplut jibqa' limitat għal 32 MiB. Jekk `sharp` ma jistax jiddekowdja jew jikkomponi l-grilja, il-pont jaqa 'lura għall-frejms JPEG individwali; abort klijent għadu jippropaga permezz tal-operazzjoni tal-folja.

L-evidenza tal-promozzjoni hija separata apposta mill-mikrobenchmark tal-kompożizzjoni sintetika. `scripts/perf/video-bridge-contact-sheet-eval.ts` jiddefinixxi xedd A/B b'verżjoni skema għal mudelli reali ta' viżjoni kompatibbli ma' OpenAI. Jkejjel it-tokens irrappurtati mill-fornitur, il-latenza tal-ħajt minn tarf sa tarf (inkluża l-kompożizzjoni tal-folja), l-għadd tas-sejħiet tal-mudell, u ż-żamma tal-fatti definiti mill-manifest. It-tweġibiet tal-mudell mhux maħdum ma jinkitbux fir-rapport; jinżammu biss SHA-256 digests u fatt imqabbla IDs. Ix-xedd ma jagħmel l-ebda sejħa ta' netwerk jew mudell imħallas sakemm `--execute-real` ma jgħaddix u `--model`, `OMNIROUTE_BASE_URL`, u `OMNIROUTE_API_KEY` huma kkonfigurati. Mingħajr dik il-ġirja reali espliċita, il-verdett tiegħu li jinqara mill-magni jibqa `HOLD`; kejl payload/call-count sintetiku waħdu mhux evidenza ta 'promozzjoni.

Dawk li jċemplu jistgħu jehmeż firxa `transcript.cues` fakultattiva ma' parti tal-vidjow appoġġjata meta diġà jkollhom test allinjat. Kull cue għandu jġorr `text`, intervall `start`/`end` finit ġewwa t-tul ta' żmien sondat, u `source` whitelisted (`client`, `embedded`, jew `audio-bridge`); `confidence` default għal `1` u għandu jibqa 'bejn `0` u `1`. Cues duplikati eżatti huma mġarrfa. OmniRoute qatt ma jibda traskrizzjoni minn din il-metadejta: indikazzjonijiet validati huma kkupjati fir-riżultat deskritt bis-sors, kunfidenza, u intervall, u huma mogħtija bħala osservazzjonijiet mhux affidabbli flimkien mal-captions tal-qafas. Test invalidu, barra mill-firxa, jew ħieles mill-provenjenza huwa miċħud aktar milli mħallat fil-fluss tal-titoli. Iż-żewġ kanali tat-traskrizzjoni tal-korp tat-talba jinnormalizzaw il-provenjenza fornuta għal `client`, inklużi t-tikketti `embedded` jew `audio-bridge` awto-affermati. Adapter proprjetà ta' server biss jista' jassenja dawk it-tikketti ta' fiduċja permezz tal-argument `trustedSource` tal-kodiċi biss; qasam ta' talba JSON ma jistax jilħaq dak l-argument. It-test tat-traskrizzjoni jibqa' kontenut derivat mill-midja mhux affidabbli, irrispettivament mill-provenjenza tiegħu, u qatt m'għandu jiddetermina l-awtorizzazzjoni.

Sejjieħ avvanzat jista' jipprovdi track `audioTranscript` għall-istess video; huwa ttrattat bħala test ipprovdut mill-klijent, mhux prova tat-traskrizzjoni tas-server. Il-ħjata tal-fużjoni tmexxi osservazzjonijiet viżwali u awdjo taħt sinjal ta' skadenza u ta' abort wieħed, tordnahom fuq skeda ta' żmien komuni, tikkollassa duplikati eżatti, u tirrapporta riżultat parzjali meta naħa waħda biss tirnexxi. `audioTranscript` invalidu jiddegrada għal dak ir-riżultat parzjali — id-deskrizzjoni viżwali tinżamm u l-fergħa tal-awdjo tirreġistra kodiċi ta' falliment sanitizzat — minflok ma tfalli l-vidjo kollu. Id-disponibbiltà għal kull fergħa, il-bandiera parzjali, u l-kodiċijiet tal-falliment sanitizzati huma ppreservati fir-riżultat deskritt, fil-metadata tal-guardrail (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), fil-metadata tal-cache tar-riżultati, u fil-counters tal-fużjoni tal-pont. Il-mogħdija default Video Bridge ma tinvokax diskors għal test jew tniżżel it-tieni kopja tal-midja; mingħajr dik il-binarju espliċitu, jibqa 'video-biss.

**Żamma tat-traskrizzjoni (#12150 P1).** Dan japplika awtomatikament kull meta l-Pont tal-Vidjo (opt-in innifsu) jagħmel traskrizzjoni cue — m'hemm l-ebda bandiera ta' żamma separata. Meta talba tirrendi kwalunkwe traskrizzjoni cue ( `transcript` iddikjarat minn min iċempel jew `audioTranscript` fused ), il-guardrail jimmarkaha `videoBridgeObserved` u tipproduċi dell rediġjat tad-deskrizzjoni tal-vidjo — rendering identiku li fih il-korp tat-test liberu ta’ kull cue jiġi sostitwit `[redacted-video-transcript]`, mibni billi tissostitwixxi l-cue strutturat b’field cue assemblat ebda kontenut cue — avversarji jew ordinarji, inklużi korpi li fihom `]` bħal `[inaudible]`/`[music]` — jistgħu jgħixu). Il-korp ta' rikjesta tar-reġistru tas-sejħiet persistenti jibdel kull parti tat-test derivata minn vidjo għal dak id-dell rediġjat, imqabbel bl-ugwaljanza tal-kontenut; l-ankra `fullText` tinqara mill-ġdid mit-tagħbija tat-tagħbija tal-guardrail lest qabel is-sejħa, għalhekk il-logħba xorta tirnexxi wara guardrails tal-katina aktar tard (iż- PII u maskers tal-kredenzjali, prijoritajiet 10/95) tikteb mill-ġdid it-test tad-deskrizzjoni fil-post u wara li l-injezzjoni system-prompt/handoff/memory terġa' tfassal il-firxa tal-messaġġi. Il-korp mibgħut upstream lill-mudell ma nbidilx. Talba osservata wkoll timla l-ebda Memorja dejjiema (kemm l-estrazzjoni derivata mit-talba kif ukoll mir-rispons huma maqbuża), għalhekk it-tweġiba tal-mudell stess ma tistax tgħaddi t-test tat-traskrizzjoni fil-Memorja.

**Raw video fields (#12430).** Meta l-pont ikun attivat u l-appoġġ tal-vidjo nattiv ma jkunx magħruf jew assenti, oqsma definiti `transcript`/`audioTranscript` jattivaw ukoll `videoBridgeObserved`, anke wara nuqqas ta 'deskrizzjoni jew limitu `maxVideos`. `null` u kordi vojta jgħoddu; oqsma assenti u metadejta mhux tal-vidjo ma jagħmlux dan. Kopji miżmuma jirredikaw dawn l-oqsma jew iħallu barra t-talba, u caches/Memory jiġu bypassed.

Fuq dawk il-mogħdijiet ta' riżerva, indikazzjonijiet validi ta' min iċempel isiru partijiet `text`/`input_text` appoġġjati aktar milli oqsma tal-fornitur mhux standard. Iż-żewġ binarji fornuti mit-talba jibqgħu osservazzjonijiet `client` mhux fdati, bi twissija espliċita li l-vidjo ma ġiex deskritt u l-timestamps ma ġewx verifikati kontra l-midja. Il-baġits eżistenti 256-cue/64-KiB totali u per-cue japplikaw fuq iż-żewġ binarji flimkien; timestamps għandhom joqogħdu mal-limitu ta' 600 sekonda tas-sensar u kwalunkwe tieqa ta' fokus fornuta. Binarji invalidi jintremew, mhux mibgħuta bħala test arbitrarju; aħwa valida xorta tista' tintuża sakemm il-baġit magħqud tagħhom ma jinqabeż. Null/empty fields ma jżidu l-ebda test. L-ebda ġibda tal-midja jew traskrizzjoni ma hija miżjuda b'dan il-backup. L-oqsma ta' estensjoni tat-traskrizzjoni jitneħħew mit-trasportatur tal-vidjow ta' riżerva u l-oġġetti `video_url`/`source` tiegħu. L-allowlist tal-wajer OpenAI jibqa 'strett; trasportaturi tal-vidjow indiġeni mhux magħrufa jibqgħu disponibbli u miri magħrufa biss bit-test iżommu markaturi sikuri. Id-dellijiet ta' redazzjoni strutturati jipproteġu t-test tat-traskrizzjoni mehmuż, filwaqt li t-talba oriġinali ta' min iċempel tibqa' l-istess. Il-miri appoġġjati mill-indiġeni u l-pontijiet b'diżabbiltà jżommu l-imġieba tal-bypass eżistenti tagħhom.

Kopji addizzjonali miżmuma jużaw l-istess sinjal ta' talba osservata. L-istampa prima tat-talba tal-klijent qabel il-guardrail, it-talba pendenti fil-memorja, u l-ġurnal tar-rikjesta rifjutata bikrija jissostitwixxu strutturalment l-oqsma tat-traskrizzjoni f'partijiet tal-vidjo; string prompts sintetizzati mill-istadji tal-pipeline u handoff tal-kuntest huma redacted fil-persisti-talba-korp sink. Il-markatur `video_content_removed` persistenti jagħmel il-kontinwazzjoni `previous_response_id` ifalli magħluqa aktar milli jirrikostitwixxi test li ġie skartat intenzjonalment. Jekk talba osservata titlef id-dell ta' redazzjoni għal kull parti qabel ma tiilloggja, jew saħansitra wieħed minn diversi dellijiet tal-vidjo jonqos milli jqabbel wara mutazzjonijiet ta' rikjesta aktar tard, il-korp tar-rikjesta miżmum jitħalla barra għal kollox minflok ma jżomm traskrizzjoni parzjalment redatta.

Għal talba osservata, tweġiba mudell tista' tikkwota kwalunkwe porzjon tat-traskrizzjoni mingħajr limitu ta' cue strutturat. Is-sejħa-log `responseBody` persistenti tagħha hija għalhekk sostitwita b'markatur ta' ommissjoni; l-artifact tal-pipeline dettaljat (li jista 'jinkludi korpi upstream/client u biċċiet tan-nixxiegħa) ma jinżammx. Semantika, idempotenza, u raġunament-replay caches bypass jaqra u jikteb għal dik it-talba. It-talba tal-fornitur u r-rispons viżibbli mill-klijent jibqgħu l-istess. Bytes keepalive bikrija jitbattlu mill-buffer temporanju meta l-artifact dettaljat jitħalla barra. It-twissija EventStream malformata ta' Kiro tirrapporta biss l-għadd tal-byte tat-tagħbija, qatt il-kontenut tiegħu jew l-iżball mhux ipproċessat tal-parser JSON. Dan ma jippretendix li kull dijanjostiku provider/plugin mhux relatat ġie vverifikat; il-knis usa' miżmum-sink huwa ssorveljat #11658.

Iċ-ċiklu tal-ħajja intern `/api/modality-bridge/video/drilldown` huwa sottostrat separat, loopback/token-authenticated cache. Kull operazzjoni teħtieġ ukoll ID prinċipali opak kanoniku. Qabel ma min iċempel ta' produzzjoni jiġi attivat, għandu joħroġ dak ID mill-kerrej awtentikat u qatt ma għandu jgħaddi valur magħżul mill-klijent. Iċ-ċwievet tal-cache jorbtu dak il-prinċipal ma' sessjoni kanonika u r-referenza tal-vidjo IDs, jaħżnu biss iċ-ċwievet SHA-256-derived tagħhom, u jkampaw kemm il-qari kif ukoll it-tħassir għall-istess prinċipali. Il-cache jaħżen mhux aktar minn 16-il frejm JPEG derivat għal kull dħul, jiskadihom wara għaxar minuti, u jappoġġja jaqra `start`/`end` delimitat jew tħassir espliċitu tas-sessjoni.

Kull prinċipal huwa limitat għal 16-il entrata u 64 MiB ta’ data JPEG kanonika. Dawk il-limiti huma indipendenti mil-limitu 64-entry/256 MiB globali: il-pressjoni tal-kwota prinċipali tkeċċi biss l-iskrizzjonijiet l-inqas reċentement użati ta' dak il-prinċipal qabel ma jitqies l-iżgumbrament globali LRU. L-entrati skaduti jiġu miknusa kemm mill-kontabilità prinċipali kif ukoll dik globali fuq l-attività tal-cache, filwaqt li l-kanċellazzjoni u l-falliment tal-validazzjoni ma jikkommettux sostituzzjoni parzjali.

Il-cache tirrifjuta Base64 mhux kanoniku, ikkuttunar żejjed, midja mhux JPEG, JPEGs malformat jew maqtugħ, u JPEGs li jipproduċu twissija waqt decode `sharp` b'immaġni sħiħa delimitata. Jikkodifika mill-ġdid kull immaġini aċċettata bħala JPEG kanoniku, joħroġ il-wisa 'u l-għoli mill-bytes dekodifikati minflok ma jafda l-oqsma ta' min iċempel, u jarmi kwalunkwe polyglot bytes ta' wara aktar milli jżommhom. Il-buffer kompressat kanoniku bounded biss jiġi ċċarġjat miż-żewġ kwoti. Il-limitu tal-wajer JSON jinkludi l-overhead ta' Base64 għal-limitu ta' input dekodifikat ta' 32 MiB. Kull derivazzjoni maħżuna tirreġistra JPEG format/resolution ivvalidata tagħha, il-politika tat-teħid tal-kampjuni, il-verżjoni tad-derivazzjoni, il-ħin tal-ħolqien, il-hash tal-kontenut ikkalkulat mis-server, u r-referenza tal-ġenitur hashed flimkien mal-hash tal-kontenut tal-ġenitur ta' min iċempel fdat. Il-kanċellazzjoni hija ċċekkjata bejn il-fażijiet decode/hash asinkroniċi qabel ma l-cache atomiku jimpenja.

Il-produttur tal-produzzjoni jerġa' juża frames ta' sensar diġà derivati biss wara analiżi viżwali b'suċċess, mingħajr it-tieni vidjo download/extraction. Jeħtieġ operatur `modalityBridgeVideoDrilldownEnabled=true`, `drilldown: true` strett għal kull parti , u rekord API-key awtentikat ID. Valuri principal/session ddikjarati mill-klijent qatt ma jistabbilixxu sjieda. Mingħajr it-tliet kundizzjonijiet kollha ma jaqtax, ma jqassamx jew iżomm frejms addizzjonali. In-nuqqas ta 'żamma jippreserva r-rispons viżwali użabbli. It-talbiet kunsenswali jevitaw il-cache tar-riżultati tal-vidjow kollu sabiex ir-riżultati fil-cache qatt ma jerġgħu jimxu.

Risposti JSON u SSE b'suċċess jesponu mhux aktar minn erba' mankijiet opaki fl-header `x-omniroute-video-drilldown` immarkat. L-oriġini tal-browser awtorizzati jistgħu jaqraw dik l-intestatura mingħajr ma jwessgħu l-politika tal-oriġini CORS. Mankijiet ġodda jużaw `v1.<32-byte random base64url token>`, u r-reġistru jżomm biss il-hashes SHA-256 tagħhom. Il-parser reader/header jaċċetta wkoll tokens legacy 64-hex. Il - konsumatur pubbliku awtentikat huwa `GET /api/v1/video-bridge/drilldown?handle=...`, b'mod indipendenti minn `modalityBridgeVideoDrilldownRemoteEnabled=true`. Aċċess ta' revoka falza persistenti espliċita anki meta l-wirt `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env fallback ikun attivat. Iż-żamma tal-produzzjoni għandha l-wirt analogu `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback. Iż-żewġ fallbacks default off.

Il-konsumatur jieħu s-sjieda miċ-ċavetta awtentikata u japplika politika taċ-ċavetta: kemm GET kif ukoll DELETE jappartjenu għall-kategorija tal-endpoint `video`, inklużi l-psewdonomi `/v1` u `/api/v1`. Ċwievet b'lista permessa ta' endpoint mhux vojta għandhom jinkludu `video`; ċwievet mhux ristretti jibqgħu kompatibbli. Il-konsumatur jirritorna l-istess 404 għal mankijiet ta' ċavetta mhux magħrufa, skaduti u oħra. Jaċċetta `variant=preview|standard|detail` (dimensjoni massima JPEG 320/640/1280, qatt upscaled), `limit=1..8` (jew il-wirt `frames` alias, qatt it-tnejn), `page` ibbażat fuq żero , u `start`/`end` sekondi ta 'fokus fakultattivi. Iċ-ċwievet tal-mistoqsija duplikati u t-twieqi tal-fokus maqlubin huma miċħuda. Kull varjant ritornat għandu hash tal-kontenut attwali tiegħu u metadejta tar-riżoluzzjoni attwali, marbuta mas-sors miżmuma. Il-varjanti huma derivati meta jinqraw aktar milli maħżuna bħala kopji żejda miżmuma. Ir-rispons JSON, inkluż Base64/envelope, huwa limitat għal 32 MiB; paġna ta’ daqs kbir tirritorna 413 u l-klijent irid jitlob inqas frejms. Aqra l-kanċellazzjoni tal-kontroll madwar kull resize u ċċekkja mill-ġdid il-validità tal-manku qabel ma tirritorna. `DELETE` minn sid huwa idempotent; it-tħassir jew l-iskadenza TTL tirrilaxxa s-sors miżmuma u l-kontabilità tal-użu.

Il-maħżen kondiviż huwa proċess lokali: il-pumi jiskadu mal-bidu mill-ġdid u mhumiex trasferibbli bejn proċessi OmniRoute indipendenti. L-istatistiċi tal-ġestjoni jesponu żamma effettiva/politika remota u entries/bytes miżmuma aggregat biss, qatt midja, referenzi, IDs prinċipali jew mankijiet. Il-pannell tas-settings tal-Vidjo juri dawk il-valuri u jista 'jippersisti ż-żewġ swiċċijiet tal-kunsens. Din id-dokumentazzjoni ta' implimentazzjoni mhijiex evidenza ta' skjerament jew promozzjoni diretta; l-aċċettazzjoni tal-mudell reali hija segwita separatament.

Il-frejms huma b'titolu sekwenzjali mal-mudell tal-Vidjo konfigurat. Vidjo override vojt jirtu l-issettjar tal-Viżjoni; jekk it-tnejn huma vojta, l-awto-router tal-Viżjoni jagħżel il-mudell effettiv li kapaċi jara. It-titoli b'suċċess jissostitwixxu l-parti oriġinali bi prefiss `[Video description:` stabbli li jimmarka wkoll it-test bħala osservazzjoni derivata mill-midja mhux fdata u jgħid lill-mudelli downstream biex ma jsegwux istruzzjonijiet misjuba fil-midja. Iċ-ċwievet tal-cache tal-frame-caption jinkludu l-bytes JPEG, il-pront, it-timbru taż-żmien, u l-mudell effettiv; captions b'suċċess biss huma cached. L-entrati fil-cache jżommu l-mudell attwali ta' produttur ta' suċċess, inkluż mudell ta' riżerva; il-pont jirrapporta `mixed` meta ġew prodotti frames differenti minn mudelli differenti. A cache hit jerġa' juża dik l-identità tal-produttur minflok ittikkettjaha mill-ġdid bħala l-pjan tar-rotot mitlub. Il-cache tar-riżultat tal-vidjo kollu huwa mmarkat fuq kull input li jibdel il-mudell tal-output — fil-pront, effettiv, politika ta 'kampjunar, għadd ta' frejms, mod ta 'analiżi semantika, il-marki tas-swaba SHA-256 tal-ħjiel ta' fokus normalizzat, tieqa tal-fokus, `transcript`, `audioTranscript`, u l-bandiera tal-folja tal-kuntatt — sabiex il-bidla ta 'kwalunkwe waħda minn dawk id-dimensjonijiet qatt ma tkun użu mill-ġdid tal-cache. Il-verżjoni tal-politika tad-dedup viżwali, il-limitu, u l-għadd tal-qafas tal-kandidati bounded huma wkoll espliċiti fiċ-ċavetta u l-metadata tal-cache tar-riżultati; bidla fil-politika għalhekk ma tistax terġa' tuża deskrizzjoni ta' vidjo sħiħ u skaduti. Il-metadejta tar-riżultat-cache v4 iżżomm il-mod u l-marki tas-swaba, qatt il-kompitu mhux maħdum tal-utent. Il-metadejta tal-guardrail tirrapporta kemm il-modi ta' analiżi mitluba kif ukoll dawk effettivi; mod `focused` mitlub mingħajr test tal-utent li jista' jintuża huwa rrappurtat bħala effettivament `full`.

Il-guardrail estratti kull parti tal-vidjo appoġġjata iżda jiddeskrivi mhux aktar minn `modalityBridgeVideoMaxVideos`. Għal mira ppruvata li għandha `supportsVideo === false`, vidjows falluti u b'limitu żejjed isiru markaturi ta' test espliċiti sikuri sabiex l-ebda vidjo mhux maħdum ma jibqa' ħaj. Meta l-kapaċità ma tkunx magħrufa, dawk il-partijiet iżommu t-trasportatur tal-vidjo tagħhom; kwalunkwe traskrizzjoni ta' riżerva ssegwi l-konverżjoni tat-test bounded hawn fuq. Miri `supportsVideo === true` bypass il-pont. Is-sinjal tal-abort tat-talba tal-klijent jippropaga permezz ta' download, kju ta' sensar, sottoproċessi, u sejħiet ta' caption; abort jieqaf bejn vidjows u qatt ma jonqos miftuħ għall-midja mhux maħduma.

Is-settings tar-runtime huma appoġġjati minn DB u validati minn Zod:

| Ewlenin                             | Default     | Firxa / imġieba                                                                                                |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime fakultattiv, opt-in                                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` tippreserva captions ġeneriċi; `focused` juża kuntest ta' l-aħħar utent bounded, mhux affidabbli        |
| `modalityBridgeVideoModel`          | `""`        | Jiret il-mudell tal-Vision Bridge                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, jew `segment_aware` proporzjonali ; falliment tad-ditekter jaqa' lura għal `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                 |

Il-wirt ppersistew Il-valuri ta' timeout tal-vidjo 'l fuq minn 120 sekonda huma kklampjati sal-iskadenza tas-sensar; settings ġodda jikteb 'il fuq minn dak il-limitu huma miċħuda. `GET /api/modality-bridge/video/runtime` teħtieġ lokalità ta 'loopback ittimbrata fdata qabel l-awtentikazzjoni jew ir-runtime probing, imbagħad teħtieġ awtentikazzjoni tal-ġestjoni. Jirritorna biss `available`, verżjonijiet FFmpeg/ffprobe sanitizzati, u raġuni fissa meta r-runtime ma jkunx disponibbli. Il-punt tat-tmiem tal-estrazzjoni intern mhuwiex upload pubbliku API: is-saturazzjoni tal-kju tirritorna `503` flimkien ma `Retry-After`, skonnettjar ta' min iċempel jirritorna `499`, u l-iskadenza fissa tas-sensar tirritorna `504`. Risposti kkonvertiti żid `video->text;model=<visionModel>;parts=<videos>` mal-header `x-omniroute-modality-bridge` ċentrali mingħajr ma tneħħi s-segmenti tal-Viżjoni jew tal-Awdjo.

### PII Masker (`piiMasker.ts`)

Timxi fuq** it-tnejn** stadji.

- **`preCall`** klonaj it-tagħbija, jimxi `system`, `messages`, `input`, u `prompt` (inklużi oġġetti ta 'sekwenza sempliċi), u japplika `processPII()` (minn `@/shared/utils/inputSanitizer`) għal string `content`/`text` fields. Meta `PII_REDACTION_ENABLED=true`, PII misjub jiġi redat fit-tagħbija 'l barra. Dan huwa indipendenti minn `INPUT_SANITIZER_MODE` (li jikkontrolla biss il-politika ta' injezzjoni fil-pront). Meta r-redazzjoni tkun mitfija, is-sejħa tirreġistra l-għadd ta' skoperta mingħajr kitba mill-ġdid tal-kontenut.
- **`postCall`** deep-clones ir-rispons, imexxi `sanitizePIIResponse()` flimkien mal-masker Responses-API-shape (`maskResponsesOutput` — tkopri `output_text` u `output[].content[].text`). Jekk isseħħ xi redazzjoni, ir-rispons modifikat jissostitwixxi l-oriġinal.

Il-guardrail qatt ma jimblokka; tinnota biss (`meta.detections`, `meta.redacted`) jew tikteb mill-ġdid.

#### Għażla għal kull tip, mudelli tad-dwana u counters ta 'skoperta

**Dashboard → Settings → Security → PII masking** jagħżel _dak_ huwa mgħotti. Ma jixgħelx il-masking: jiġifieri għadu `PII_REDACTION_ENABLED` (talba) u `PII_RESPONSE_SANITIZATION` (rispons + SSE), it-tnejn mitfija awtomatikament.

- **Għażla għal kull tip** — l-ids built-in huma elenkati `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Unset tfisser kull tip (l-imġieba qabel ma kienet teżisti dan is-setting). Il-mudell `ssn_us` tal-magna tat-talba jimmappa għal `ssn`. Mudelli (Minimal, Standard, Finanzjarju, Brażiljan, USA, GDPR, POPIA, Sħiħ) imla biss il-kaxxi ta' kontroll UI.
- **identifikaturi GDPR u POPIA** — tnax-il ids integrati li jkopru EU u identifikaturi personali tal-Afrika t'Isfel (tabella hawn taħt). Ir-regexes, il-validaturi u t-tikketti tal-ġurisdizzjoni tagħhom jgħixu f'tabella waħda, `src/shared/utils/piiPatterns.ts`, li kemm ir-respons sanitizer (`src/lib/piiSanitizer.ts`) kif ukoll il-masker tar-rikjesta (`src/shared/utils/inputSanitizer.ts`) jikkunsmaw. Taqbila tiġi redattata biss meta l-validatur tagħha jaċċettaha; ġirja vojta ta 'ċifri qatt ma hija biżżejjed. Operatur li ssalva għażla mnaqqsa qabel ma kienu jeżistu dawn l-ids iżomm l-imġieba li kellu sakemm jiġu mmarkati l-ids il-ġodda.
- **Mudelli tad-dwana** — sa 20 mudell regex jew wildcard (`*` = sa 64 karattru mhux abjad, `?` = wieħed). Logħbiet isiru `[CUSTOM_REDACTED]`. Kull mudell jgħaddi minn `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): l-aktar 500 karattru, bnadar limitati għal `g i m s u`, iridu jikkompilaw, iridu jgħaddu `safe-regex` (backtracking katastrofiku), u m'għandhomx jaqblu ma 'sekwenza vojta jew placeholder ta' redazzjoni. Mudell li jfalli jiġi rrifjutat meta jiġi ssejvjat u ttestjat, u ringiela maħżuna li tfalli tinqabeż waqt ir-runtime minflok ma tiġi kkompilata. Il-mudelli tad-dwana jaħdmu biss waqt li l-masking ikun mixgħul.
- **Counters ta' sejbien** — għadd għal kull tip (valuri qatt imqabbla), miżmuma fil-memorja u reset mal-bidu mill-ġdid (`src/lib/pii/piiDetectionStats.ts`). Dawn jiżdiedu biss waqt li l-masking ikun mixgħul.

Is-settings jgħixu fit-tabella `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) u jinqraw permezz ta' cache ta' 1 s. API:

| Metodu | Mogħdija                 | Għan                                                                               |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stat tal-bandiera, `enabledTypes`, `customPatterns`, counters ta' detezzjoni       |
| `PUT`  | `/api/settings/pii`      | Ibdel `enabledTypes` (`null` = all) and/or `customPatterns`                        |
| `POST` | `/api/settings/pii/test` | Dry-run mudell wieħed kontra kampjun ta' mhux aktar minn 8 KB; xejn ma huwa maħżun |

It-tlieta jeħtieġu l-awtenti tal-ġestjoni u jivvalidaw il-korp Zod (`src/shared/validation/schemas/piiSettings.ts`). Bil-login diżattivat (`requireLogin=false`) `GET` u l-endpoint tat-test huma miftuħa, iżda `PUT` xorta jeħtieġ sessjoni dashboard, `manage` -scope API key, token ta 'aċċess `oma_` b'ambitu ta' kitba jew ogħla, jew it-token CLI jew token tas-servizz intern mibgħut minn loopback.

#### Identifikaturi GDPR (EU) u POPIA (Afrika t'Isfel).

| Id                  | Identifikatur                     | Validazzjoni                                                                                   |
| ------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                              | Pajjiż magħruf, tul eżatt għal dak il-pajjiż, ISO 13616 MOD-97-10                              |
| `eu_vat`            | EU VAT numru                      | Prefiss magħruf tal-istat membru u l-format tan-numru ta' dak l-istat (l-ebda tfittxija VIES ) |
| `es_dni_nie`        | Spanjol DNI / NIE                 | Ittra ta 'kontroll (valur mod 23); NIE huwa `X/Y/Z` + 7 ċifri                                  |
| `it_codice_fiscale` | Codice Fiscale Taljan             | Ittra ta' kontroll mit-tabelli tal-pożizzjoni odd/even                                         |
| `pl_pesel`          | Pollakk PESEL                     | Checksum peżat u data tat-twelid kodifikata li teżisti                                         |
| `nl_bsn`            | Olandiża BSN                      | 11-prova (piżijiet 9..2, -1)                                                                   |
| `de_steuer_id`      | Ġermaniż Steuer-ID                | ISO 7064 Mod 11,10 flimkien mar-regoli tal-istruttura taċ-ċifri (l-ebda 0 ewlieni)             |
| `se_personnummer`   | personnummer Żvediż               | Luhn fuq l-aħħar għaxar ċifri u data tat-twelid plawsibbli (10 jew 12-il ċifra)                |
| `za_id`             | Numru ID tal-Afrika t'Isfel       | Luhn fuq it-13-il ċifra kollha, month/day tat-twelid valida, ċifra taċ-ċittadinanza 0 jew 1    |
| `za_phone`          | Telefon tal-Afrika t'Isfel        | `+27` / `27` prefiss, jew il-forma nazzjonali `0..` miktuba bi spazju jew sing                 |
| `za_vat`            | Numru VAT tal-Afrika t'Isfel      | 10 figuri li jibdew bi `4`** u** "VAT" / "BTW" fit-48 karattru ta' qabel                       |
| `za_tax_ref`        | Ref tat-taxxa tal-Afrika t'Isfel. | 10 ċifri li jibdew `0`-`3`, Luhn,** u** "taxxa" / "SARS" fit-48 karattru ta' qabel             |

Minħabba li l-formati ta 'ċifri biss jaħbtu ma' numri tal-ordni, jibnu numri u timestamps, dawk l-aktar dgħajfa (`za_vat`, `za_tax_ref`) jeħtieġu l-kelma prinċipali, u numru `0..` ta 'għaxar ċifri vojt mhuwiex ittrattat bħala numru tat-telefon tal-Afrika t'Isfel. Spazjati IBANs (`GB29 NWBK ...`) mhumiex imqabbla. Fuq il-mogħdija tal-istrimjar il-cue jitħares 'il fuq ġewwa l-biċċa attwali biss. L-ids joqogħdu qabel il-mudelli ġeneriċi tat-telefon, għalhekk identifikatur validat iżomm il-placeholder tiegħu stess (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Il-mudelli `gdpr` u `popia` jagħżlu l-ids EU u l-Afrika t'Isfel rispettivament. Il-masking innifsu jibqa 'opt-in (Hard Rule #20): xejn hawn ma jibdel default-flag tal-karatteristika.

### Injezzjoni fil-pront (`promptInjection.ts`)

Jiskopri strutturi kontradittorji f'kontenut fornut mill-utent u jinforza l-politika kkonfigurata. L-imġieba hija mmexxija minn varjabbli ambjentali u għażliet tal-kostruttur:

| L-issettjar      | Env var                                                                                               | Default | Effett                                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ippermettiet     | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Meta `false`, guardrail short-circuits.                                                                                                                                                                                      |
| Modalità         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Politika ta 'injezzjoni: `block`, `warn`, jew `log`. (`redact` huwa aċċettat għal back-compat iżda jagħmel dan** le** test ta 'injezzjoni ta' strixxa; it-talba PII rewrite hija kkontrollata minn `PII_REDACTION_ENABLED`.) |
| Limitu tal-blokk | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Severità minima meħtieġa biex timblokka. Il-medju huwa osserva-biss b'mod awtomatiku.                                                                                                                                        |

**Preċedenza tal-mod** (`getMode`): min iċempel `options.mode` → `INJECTION_GUARD_MODE`**DB feature-flag override** (Dashboard → Settings → Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Dashboard override għalhekk jirbaħ fuq l-env vars, għalhekk il-Feature Flags UI jikkontrolla l-gwardja tal-ġiri live (l-ebda startjar mill-ġdid). Il-qari DB huwa sigur għall-fallimenti: jekk jiżbalja, il-gwardja taqa 'lura għall-imġieba bbażata fuq env, u meta l-ebda override hija ssettjata l-imġieba hija identika għal riżoluzzjoni ta' env-only.

Sorsi ta' skoperta:

1. `sanitizeRequest()` minn `@/shared/utils/inputSanitizer` (sett ta' detector kondiviż użat x'imkien ieħor fil-pipeline).
2. Built-in `DEFAULT_GUARD_PATTERNS` (bħalissa `system_override_inline` u `markdown_system_block`, it-tnejn `high` severità).
3. `customPatterns` mhux obbligatorju mgħoddi permezz ta' għażliet tal-kostruttur (kordi, regex, jew rekords `{ name, pattern, severity }` ).

`mode === "block"`** u** mill-inqas skoperta waħda tilħaq il-limitu tas-severità, `preCall` jirritorna `{ block: true, message: "Request rejected: suspicious content detected" }`. Fil-modi `warn`/`log` il-guardrail jirreġistra iżda jippermetti s-sejħa. Il-helper `evaluatePromptInjection()` kondiviż huwa esportat ukoll għal min iċempel li jeħtieġ li jevalwaw il-prompts mingħajr ma jgħaddu mir-reġistru.

**Skann marbut (v3.8.20):** id-ditekter jispezzjona biss il-** l-ewwel 16 KB** tat-test fil-pront magħqud — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) `src/shared/utils/inputSanitizer.ts`. Kemm `detectInjection()` kif ukoll `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` qabel ma tħaddem il-linja tal-mudell. Id-direttivi ta' injezzjoni joqogħdu ħdejn il-parti ta' fuq ta' input, għalhekk dan jillimita r-reġex CPU/GC fuq payloads ta' bosta mijiet ta' KB mingħajr skoperta li tiddgħajjef (cf. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Timxi fuq** it-tnejn** stadji, l-aħħar fil-katina default (prijorità `95`). Tirreditta mudelli magħrufa sew ta' API-key / tokens sigrieti mit-tagħbija 'l barra (kontenut tal-messaġġ, argumenti ta' sejħa ta' għodda, riżultati ta' għodda)** u** ir-rispons tal-fornitur, għalhekk kredenzjali mwaħħla fil-pront (jew imtennija lura minn riżultat ta 'għodda) ma tiġix leaked lill-fornitur upstream jew lura lill-klijent.

- **Opt-in biss** , l-istess konvenzjoni bħal PII redaction (Hard Rule #20-adjacent): disabled sakemm `settings.credentialRedactionEnabled === true`** jew** `CREDENTIAL_REDACTION_ENABLED=true`. Biha mitfija, il-guardrail huwa no-op — li qatt ma jimblokka u qatt ma jerġa jikteb.
- `redactCredentials()` jimxi s-siġra payload/response sħiħa (`walkValue()`, prototip-pollution-safe, cycle-safe permezz `WeakSet`) u tissostitwixxi logħbiet b'post `[REDACTED:<type>]`, billi tikklona biss il-fergħat li fil-fatt inbidlu.
- `CREDENTIAL_PATTERNS` tkopri ċwievet tal-fornitur LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate ), tokens VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ċwievet tal-ħlas (Stripe, Square, Twilio, SendGrid),AWS access Mailgun), ċwievet privati / JWTs, kordi ta 'konnessjoni li jkollhom kredenzjali (`mongodb://user:pass@...`, eċċ.), u mudell ġeneriku `Authorization`/`x-api-key`/`api-key`/`apikey` header-value. Iċ-ċwievet f'forma ta' header (`authorization`, `x-api-key`, `api-key`, `apikey`) huma redatti strutturalment (valur biss, prefiss tal-iskema bħal `Bearer `/`Basic ` ippreservat) aktar milli permezz tar-reġex tat-test ġeneriku.
- Il-guardrail qatt ma jimblokka; jerġa jikteb biss (`modifiedPayload` / `modifiedResponse`) u jannota (`meta.credentialsRedacted`, `meta.count`).

Gwardja tar-rigressjoni: `tests/unit/credential-masker-guardrail.test.ts`.

## Kuntratt Bażi (`base.ts`)

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
  block?: boolean; // true jaqta' l-katina
  message?: string; // jidher meta jiġi mblokkat
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // ritornat minn preCall biex jikteb mill-ġdid it-talba
  modifiedResponse?: TValue; // ritornat minn postCall biex jikteb mill-ġdid ir-rispons
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

Guardrail jindika "l-ebda bidla" billi jirritorna `void`, `{}`, jew
`{ block: false }`. Irr-ritorn ta' `modifiedPayload`/`modifiedResponse`
jissostitwixxi l-valur li jgħaddi mill-katina għall-guardrails li jiġu wara.
`signal?: AbortSignal` iġorr il-lifecycle tal-kallier lejn il-guardrails. Abort
ta' talba hija l-eċċezzjoni fail-open deliberata: il-media bridges jieqfu
jaħdmu u jnaddfu mingħajr ma jrestawraw il-media grezza lejn mira magħrufa li
ma tappoġġjahix.

## Reġistru (`registry.ts`)

Is-singleton `guardrailRegistry` jesponi:

- `register(guardrail)` — iżid (jew jissostitwixxi skont l-isem normalizzat)
  guardrail u jerġa' jordna skont `priority` akxendenti.
- `clear()` / `list()` — għodod għajnuna amministrattivi.
- `runPreCallHooks(payload, context)` — jitera fuq il-guardrails attivi,
  jgħaddi l-payload permezz ta' `modifiedPayload`, u jieqaf fl-ewwel
  `block: true`.
- `runPostCallHooks(response, context)` — l-istess fluss min-naħa tar-rispons.
- `resetGuardrailsForTests({ registerDefaults })` — jnaddaf l-istat u b'mod
  opzjonali jerġa' jirreġistra d-defaults għal iżolament nadif tat-testijiet.

Iż-żewġ runners jirritornaw `{ blocked, payload|response, results, guardrail?, message? }`
fejn `results` hija firxa ta' rekords `GuardrailExecutionResult` li jinkludu,
għal kull guardrail, l-oqsma `blocked`, `skipped`, `modified`, `error`, u
`meta`, utli għat-traċċar.

### Itfi Guardrails għal Kull Talba

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` jiġbor lista
mingħajr duplikati ta' smijiet ta' guardrails li għandhom jiġu msaqta
għat-talba kurrenti. Hemm ħames kanali, moqrija f'din l-ordni u magħquda
f'lista waħda (l-ewwel okkorrenza tirbaħ meta jitneħħew d-duplikati):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` fil-korp tat-talba (livell ta' fuq)
3. `metadata.disabledGuardrails` fil-korp tat-talba (biss meta `metadata` tkun oġġett)
4. Header `x-omniroute-disabled-guardrails`
5. Header legacy `x-disabled-guardrails`

Il-ħames kanali kollha jingħaqdu, iż-żewġ headers inklużi: jekk jintbagħtu
t-tnejn `x-omniroute-disabled-guardrails` u `x-disabled-guardrails`, jiġu
msaqta l-unjoni tal-listi tagħhom, u header modern vojt ma jibqax jaħbi dak
legacy
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), iffissat f'
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Il-valuri jistgħu jkunu firxiet ta' strings jew string separata b'virgoli;
l-ismijiet jitneħħa minnhom il-vojt żejjed u jiġu normalizzati għal kebab-case
b'ittri żgħar (`pii_masker` → `pii-masker`), u d-dħul vojt jintrema.
Ir-riżultat jingħaddi permezz ta' `context.disabledGuardrails` lir-reġistru,
li jaqbeż il-guardrails li jaqblu (`skipped: true` fil-`results`).

Il-lista tat-tfi taffettwa biss ir-**reġistru**. Il-modalità `block`
tal-prompt-injection hija limitu obbligatorju: il-middleware injection-guard
(`src/middleware/promptInjectionGuard.ts`) jsejjaħ `evaluatePromptInjection()`
mingħajr ebda lista ta' tfi kkontrollata mill-kallier (issejħiet mejta
`resolveDisabledGuardrails({ body })` li kienet tagħmel tneħħiet f'
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), u għalhekk
talba li titfi l-`prompt-injection` xorta tiġi rifjutata fil-modalità `block`.
Dan huwa skond id-disinn. Il-kanali tat-tfi huma kkontrollati mill-kallier
(korp tat-talba, metadata, headers), u kallier ma għandux ikun jista' jtewwef
kontroll ta' sigurtà li l-operatur stabbilixxa
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). L-unjoni
tal-headers minn [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
tibdel biss liema guardrails tar-reġistru jiġu msaqta; ma tħallix klijent
jibbaġġja l-middleware. Politiki obbligatorji ta' guardrails għal kull
ċavetta (per-key) u għal kull grupp huma segwiti fir-RFC v4
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417). Ara
[Kopertura u limiti](#coverage-and-limits).

## Ordni tal-eżekuzzjoni

Għal kull talba li tgħaddi minn `src/sse/handlers/chat.ts` u
`open-sse/handlers/chatCore.ts` (ir-rotte tal-familja chat elenkati taħt
[Kopertura u limiti](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` jibni l-lista ta' skip mill-API key, il-body,
   u l-headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` iħaddem il-guardrails b'ordni
   ta' prijorità aċċendenti:
   - Il-guardrails diżattivati jiġu rreġistrati bħala `skipped`.
   - Il-`preCall` ta' kull guardrail jista' jikteb mill-ġdid il-payload permezz ta' `modifiedPayload`.
   - L-ewwel `block: true` jinterrompi l-katina minnufih u l-handler jirritorna
     rispons ta' rifjut tal-guardrail.
3. Il-payload (li possibilment ġie miktub mill-ġdid) jgħaddi għall-combo routing
   u d-dispatch upstream.
4. **Non-streaming biss:** wara li r-rispons jiġi miġbur,
   `guardrailRegistry.runPostCallHooks(...)` iħaddem l-istess katina fuq
   ir-rispons. `block: true` hawnhekk jarmi r-rispons upstream u jirritorna HTTP 400. Ir-risponsi streamed jaqbeżu dan il-pass għal kollox.

Il-guardrails li jtarmu eċċezzjoni jiġu rreġistrati b'`error: <message>` u
jiġu loggati permezz ta' `logger.warn`, iżda l-katina tkompli — fail-open skont
id-disinn.

## Kopertura u limiti

Ir-reġistru tal-guardrails huwa mqabbad biss mal-pipeline tal-chat. Dawn
il-limiti huma ffissati minn `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` u
`tests/unit/guardrail-pipeline-characterization.test.ts`; aġġorna dawk
it-testijiet b'mod deliberat meta l-imġieba tinbidel.

### Fejn jimxu l-hooks

| Hook / kontroll                     | Fejn jimxu                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Talbiet mmaniġġjati minn `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (u `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, u l-proxy tal-chat ta' Telegram. U wkoll l-endpoint tat-test tad-dashboard `/api/guardrails/test`. Blokk pre-call jirritorna HTTP 400. |
| `runPostCallHooks`                  | Risponsi chat **non-streaming** biss (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Ir-risponsi streamed qatt ma jilħquha.                                                                                                                                                                                                                                                                                                            |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), imdaħħal fil-pipeline f'`streamingPipeline.ts` meta `PII_RESPONSE_SANITIZATION` tkun mixgħula. Mhuwiex guardrail, u għalhekk il-kanali ta' diżattivazzjoni ma jaffettwawh.                                                                                                                                                                                                       |
| Injection-guard middleware (legacy) | Kull rotta `/v1` li ġġorr prompt, inkluża l-familja chat (ara [kopertura tar-rotte](#injection-guard-route-coverage--red-team-phase-8--block-d)). Prompt injection biss.                                                                                                                                                                                                                                                                       |

### X'mhuwiex kopert

- **Rotte ta' media, embeddings u dejta** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) qatt ma jilħqu r-reġistru. Ebda
  PII masking, credential masking jew modality bridge ma jimxi hemmhekk.
  L-unika verifika tagħhom hija l-middleware legacy tal-injection-guard.
- **Risponsi streamed** ma jiksbu l-ebda guardrails post-call: l-ebda `pii-masker`
  jew `credential-masker` post-call, u l-ebda blokk post-call. Japplika biss
  it-transform tal-PII streaming (meta `PII_RESPONSE_SANITIZATION` tkun
  mixgħula). Kredenzjal li jiġi eċċat lura f'rispons streamed ma jiġix censurat.
- **Kanali ta' diżattivazzjoni vs. il-middleware (skont id-disinn):** il-middleware
  jevalwa l-prompt injection b'sejħa tiegħu stess għal `evaluatePromptInjection()`,
  mingħajr ma jgħaddi l-ebda lista ta' diżattivazzjoni kkontrollata mill-sejjieħ.
  Il-modalità `block` hija fruntiera obbligatorja li diżattivazzjonijiet
  kkontrollati mill-sejjieħ ma jistgħux jgħaddu minnha, inkluż fuq rotte
  tal-familja chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  Id-diżattivazzjoni ta' `prompt-injection` taqbeż biss il-guardrail tar-reġistru.

### Xi jara rispons qabel il-post-call

F'mogħdija non-streaming l-ordni hija: estrazzjoni tal-memorja → eżekuzzjoni
tal-għodod inkorporati → guardrails post-call → ħruġ minħabba blokk post-call →
ħażna fil-cache semantika.

- **L-estrazzjoni tal-memorja** u **l-eżekuzzjoni tal-għodod** jaraw ir-rispons
  qabel ma l-gwardji ta' wara s-sejħa jistgħu jiktbuh mill-ġdid jew jimblukkawh.
  Minn [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401),
  l-estrazzjoni tal-memorja tgħaddi t-test estratt minn `sanitizePII` meta
  `PII_RESPONSE_SANITIZATION` tkun mixgħula (kemm streaming kif ukoll mhux
  streaming), iżda rispons li l-gwardji ta' wara s-sejħa imbagħad jimblukkaw
  ikun diġà ġie offrut lill-memorja u lill-għodod.
- **Il-cache semantika** taħżen ir-rispons wara l-gwardji ta' wara s-sejħa, u
  għalhekk taħżen ir-rispons miktub mill-ġdid, u rispons imblukkat qatt ma jiġi
  f'cache. L-entrati tal-cache huma indiċjati skont kull API key.

## Konfigurazzjoni

Varjabbli ambjentali moqrija mill-guardrails inkorporati:

| Varjabbli                             | Użat minn                | Effett                                                                                                                        |
| ------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Issettja `false` biex tiddiżattiva d-detezzjoni kompletament.                                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Politika tal-injezzjoni: `warn`, `block`, jew `log`. Il-valur legacy `redact` ma jiktebx mill-ġdid it-test tal-injezzjoni.    |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Modalità għall-guard tal-injezzjoni; hija wkoll feature flag tad-DB li **tipprevale** fuq il-varjabbli ambjentali (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Is-severità minima li `MODE=block` jirrifjuta: `high` (default), `medium`, jew `low`.                                         |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Alias legacy għal `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                          |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Meta tkun `true`, il-PII tat-talba tiġi immaskarata (indipendenti mill-modalità tal-injezzjoni).                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (ta' isfel) | Jikkontrolla l-imġieba tal-masker fin-naħa tar-rispons.                                                                       |

Il-guardrails tal-Modality Bridge jaqraw il-konfigurazzjoni tar-runtime
mill-maħżen tas-settings li jibbaża fuq id-DB (`getSettings()`), mhux
mill-varjabbli ambjentali. Iċ-ċwievet primarji ta' Vision huma
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, u
`modalityBridgeCacheMaxEntries`. Iċ-ċwievet legacy
`visionBridge*` jiġu aċċettati biss bħala l-fallback dokumentat ta' qari ta'
ċiklu wieħed; il-kitbiet tad-dashboard jużaw iċ-ċwievet primarji. Id-defaults
u r-resolver tal-fallback jinsabu fi `src/shared/constants/modalityBridgeDefaults.ts`,
bil-kostanti legacy miżmuma fi `src/shared/constants/visionBridgeDefaults.ts`.

Audio juża `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, u `modalityBridgeAudioMaxClips`, flimkien
mal-settings kondiviżi `modalityBridgeCache*`. Audio m'għandu l-ebda fallback
ta' ċwievet legacy għaliex dawn iċ-ċwievet ġew introdotti mal-iskema tal-
Modality Bridge.

Video juża `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, u
`modalityBridgeVideoTimeout`, flimkien mal-settings kondiviżi
`modalityBridgeCache*`. Huwa diżattivat b'mod default għaliex FFmpeg/ffprobe
huma dipendenzi operazzjonali fakultattivi u l-captioning tal-frejms iżid
latenza u spiża tal-mudell.

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
3. Jew irreġistra fi żmien l-importazzjoni (push minn `registerDefaultGuardrails`) jew
   sejjaħ `guardrailRegistry.register(...)` waqt l-eżekuzzjoni — ir-reġistru jissostitwixxi
   kwalunkwe guardrail preċedenti bl-istess isem normalizzat.
4. Żid testijiet taħt `tests/unit/` (eżempji eżistenti:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## It-Testjar

Uża `resetGuardrailsForTests()` bejn it-testijiet biex tibda minn stat magħruf.
Għaddi `{ registerDefaults: false }` biex tibda b'reġistru vojt u tirreġistra
biss il-guardrails li qed jiġu ttestjati. Vision Bridge jaċċetta dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge jesponi
l-ekwivalenti għal settings, kapaċitajiet, għażla tal-mudell STT, kontrolli
tal-kredenzjali, u traskrizzjoni. Għalhekk it-testijiet jistgħu jeżerċitaw iż-żewġ
flussi mingħajr aċċess għal DB jew netwerk.

## Ara wkoll

- `src/lib/guardrails/` — implimentazzjoni
- `src/shared/utils/inputSanitizer.ts` — ditekter kondiviż li jħaddem
  id-detezzjoni ta' prompt-injection u l-maskar ta' PII
- `src/shared/constants/visionBridgeDefaults.ts` — defaults ta' Vision Bridge u
  lista tal-mudelli tal-bridge sfurzat
- `src/shared/constants/modalityBridgeDefaults.ts` — defaults runtime kondiviżi ta' Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — saff ortogonali (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — referenza sħiħa tal-varjabbli tal-ambjent

## Kopertura tar-routes tal-guard kontra l-injezzjoni u red-team (Fażi 8 · Blokk D)

Il-guard kontra l-injezzjoni (`createInjectionGuard` / `withInjectionGuard`) jkopri r-routes
kollha li jaċċettaw prompts mill-utent. Jirrispetta `INJECTION_GUARD_MODE` (default `warn` = log biss;
`block` = jirritorna HTTP 400 `SECURITY_001`).

| Tip              | Routes                                                                                                                                               | Modalità default |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Test (eżistenti) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Ġenerattivi      | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Dejta            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

L-estrazzjoni tat-test (`extractMessageContents`) tkopri `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (ta' kull lejl, `nightly-llm-security.yml`):** promptfoo jivvalida li kull route
timblokka l-korpus OWASP-LLM f'`INJECTION_GUARD_MODE=block`; garak imexxi probes (jaqbeż mingħajr secret).
`moderations` huwa inkluż għal konsistenza. Il-modalità block hija fruntiera obbligatorja: `evaluatePromptInjection()`
tinjora l-lista ta' diżattivazzjoni għal kull talba li l-middleware jgħaddilha, għalhekk `disabledGuardrails`
**ma** jeżentax route minnha ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Il-workflow ta' kull lejl (`.github/workflows/nightly-llm-security.yml`, cron + attivazzjoni
manwali) għandu żewġ jobs:

- **`promptfoo-guard` (imblukkar)** — imexxi `promptfoo eval -c promptfooconfig.yaml`
  b'`INJECTION_GUARD_MODE=block`. Kull każ avversarju (eż. "injora l-istruzzjonijiet
  preċedenti kollha…", jailbreaks stil DAN) jasserixxi li r-rispons għandu
  `error.code === "SECURITY_001"`, jiġifieri l-guard verament irrifjuta t-talba.
- **`garak` (konsultattiv)** — imexxi garak `--probes promptinject,dan,leakreplay`
  kontra istanza lokali ta' OmniRoute (`http://localhost:20128/v1`). Kondizzjonat fuq
  secret tal-provider (`PROMPTFOO_PROVIDER_KEY`); jaqbeż b'mod nadif u għandu s-suffiss
  `|| true`, għalhekk jirrapporta mingħajr ma jfallixxi l-CI.

Il-kopertura tal-helper tal-guard (`createInjectionGuard` / `withInjectionGuard`)
tinkludi kull route `/v1` li ġġorr prompts; it-test tal-prompt jinġibed minn
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` minn
`extractMessageContents()` f'`src/shared/utils/inputSanitizer.ts`.
