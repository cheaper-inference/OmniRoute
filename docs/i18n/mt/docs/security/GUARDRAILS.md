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

## Guardrails Integrati

Ir-reġistru jillowdja awtomatikament sitt guardrails skont l-ordni tal-prijorità
meta jiġi importat (ara `registry.ts` → `registerDefaultGuardrails()`):

| Prijorità | Isem                | Stadju/i       | Fajl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numri ta' prijorità aktar baxxi jimxu **l-ewwel**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Il-mudell bażi GLM 5.3 u `glm-5.3-{low,high,max}` għandhom metadata espliċita
`supportsVision:false` fir-reġistru/spec. Il-varjanti GLM 5.3 Flash jibqgħu
mudelli b'viżjoni indiġena. Ir-rota `/v1/messages` ta' Claude Code tidħol
fil-katina kondiviża ta' guardrails pre-call `handleChat` **qabel** it-traduzzjoni
Claude-għal-OpenAI; l-immaġini nested fir-riżultat tal-għodda `Read` iridu jiġu
deskritti jew mmaniġġjati qabel dik it-traduzzjoni titilgħhom f'kontenut
`image_url` ta' OpenAI (#17069).

Jinterċetta talbiet b'immaġini mmirati lejn **mudelli mingħajr viżjoni** u jew
jirrotta mill-ġdid it-talba kollha lejn mudell kapaċi fuq viżjoni, jew
jissostitwixxi l-partijiet tal-immaġini b'deskrizzjonijiet testwali prodotti minn
mudell ta' viżjoni konfigurabbli qabel is-sejħa upstream. Dan jippermetti
lill-fornituri ta' test biss jimmaniġġjaw payloads multimodali b'mod trasparenti.

Fluss:

1. Aqbeż jekk il-mudell fil-mira diġà jappoġġja l-viżjoni (sakemm ma jidhirx
   fil-lista tal-pont imfurzat `isVisionBridgeForcedModel`).
2. Istrai l-partijiet tal-immaġini permezz ta' `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), li jiddelega lid-**ditekter unifikat tal-midja**
   `detectMediaParts()` fi `open-sse/utils/mediaParts.ts` — is-sors uniku
   tal-verità kondiviż mal-filtru ta' kompatibilità tal-combo.
   L-estrazzjoni hija limitata b'allowlist għall-forom li `replaceImageParts`
   jista' jgħaqqad lura (il-kuntratt extract↔replace): `image_url` ta' OpenAI,
   base64 ta' Anthropic `source.type:"base64"`, URL ta' Anthropic
   `source.type:"url"`, u `input_image` tar-Responses API. Immaġini li jaqblu
   nested ġewwa `tool_result.content` ta' Claude Code u outputs tal-għodod
   tar-Responses jiġu wkoll estratti u sostitwiti fil-mogħdijiet oriġinali
   tagħhom; forom b'indikatur biss huma materjal tal-filtru tal-combo u ma
   jiġux estratti.
   Aqbeż jekk ma jinstab l-ebda.
3. Solvi l-konfigurazzjoni tar-runtime permezz ta'
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): iċ-ċwievet ġodda
   tas-settings `modalityBridge*` jirbħu; iċ-ċwievet antiki `visionBridge*`
   jibqgħu **fallback ta' ċiklu wieħed** (tieqa ta' rollback). Aqbeż qabel
   kwalunkwe tgħaddija fuq il-midja meta l-pont ikun diżattivat.
4. Il-selettur tal-modalità (`modalityBridgeVisionMode`, ara t-tabella hawn
   taħt) jiddeċiedi bejn reroute u describe. Ir-reroute jirritorna
   `modifiedPayload` b'`model` biss mibdul, flimkien ma' meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Mogħdija describe: tillimita l-immaġini għal `maxImages`, ikkomponi l-prompt
   konxju tal-kompitu, ikkonsulta l-cache tad-describe, sejjaħ il-mudell
   tal-viżjoni **b'mod parallel** (`Promise.allSettled`), u injetta partijiet
   test `[Image N]: <description>` flokhom. Describe li tfalla tagħti `null`:
   l-immaġini grezza tinżamm għal miri mhux magħrufa/kapaċi fuq viżjoni (#4012),
   iżda **mira diretta kkonfermata b'test biss** jew combo b'żero viżjoni
   tirċievi stub testwali espliċitu
   `(unavailable — no vision-capable provider connected)` għal kull immaġini
   mhux deskritta, inklużi fallimenti parzjali u immaġini lil hinn mil-limitu
   tas-sejħa describe (#17069). Il-fallback eżistenti tad-describe tal-combo
   meta l-kollha jfallu jibqa' fis-seħħ (#8430).
6. Irritorna `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selettur tal-modalità (`modalityBridgeVisionMode`)

| Modalità   | Predefinit | Imġiba                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Euristika preċedenti, mhux mibdula (#6640/#7204): mudelli mhux kombinati/`auto/` jiġu ridirezzjonati lejn l-aħjar mudell tal-viżjoni, sakemm il-mudell oriġinali ma jkollux diġà kredenzjali li jistgħu jintużaw (f'dak il-każ jiddeskrivi); il-miri kombinati dejjem jiddeskrivu.                                                                  |
| `describe` |            | Dejjem iddeskrivi — il-blokka tar-ridirezzjonar tinqabeż kompletament; il-mudell magħżul mill-utent dejjem iwieġeb.                                                                                                                                                                                                                                 |
| `reroute`  |            | Ġiegħel ir-ridirezzjonar: il-kontroll li jżomm il-mudell bil-kredenzjali jinqabeż. Il-kontroll tal-kredenzjali tal-**mira** tar-ridirezzjonar xorta japplika — meta ma teżisti l-ebda mira tal-viżjoni li tista' tintuża, il-bridge jimblokka bi żball ċar minflok ma jiddeskrivi jew jibgħat immaġnijiet mhux ipproċessati lil mira tat-test biss. |

Il-modalitajiet sfurzati jwaqqfu l-fluss **qabel** ma titħaddem l-euristika awtomatika; l-imġiba ta' `auto`
hija identika byte b'byte għall-guardrail ta' qabel PR-1.

#### Ambitu taċ-ċavetta tal-API (`visionBridgeKeyScope.ts`)

Meta ċ-ċavetta tal-API ta' min jagħmel it-talba tirrestrinġi `allowedConnections`, il-gruppi ta' kwoti
(`allowedQuotas`) jew il-mudelli (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), il-bridge jagħżel biss
mudelli għar-ridirezzjonar u għad-deskrizzjoni li ċ-ċavetta tista' tuża, fuq konnessjonijiet li ċ-ċavetta tista'
tuża. It-talba għad-deskrizzjoni mbagħad dejjem tgħaddi mill-awto-linja ta'
OmniRoute bl-header `x-omniroute-self-loop-key-id`, sabiex it-talba taċ-chat riċeventi
terġa' tinforza l-politika ta' dik iċ-ċavetta għall-konnessjonijiet u l-mudelli. `enforceApiKeyPolicy()`
jirrispetta dak l-header biss flimkien mal-bearer tal-awto-linja, għalhekk jista' biss
jirrestrinġi l-aċċess, u id li ma jiġix solvut jiġi rrifjutat.

Jekk l-ebda mudell tal-viżjoni ma jkun permess għaċ-ċavetta, **mira kkonfermata
tat-test biss** tirrifjuta t-talba tal-immaġni lokalment b'HTTP 400 ċar minflok
ma tibgħat il-bytes tal-immaġni lil servizz upstream li ma jistax jipproċessahom (#17069). Għal miri b'kapaċità tal-viżjoni
mhux magħrufa jew nattiva, il-fluss tad-deskrizzjoni jżomm l-imġiba permissiva preċedenti tiegħu
f'każ ta' falliment (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Talbiet mingħajr ċavetta, u ċwievet mingħajr dawn ir-restrizzjonijiet, jaġixxu eżattament bħal
qabel.

#### Prompt tad-deskrizzjoni konxju tal-kompitu (`modalityBridgeVisionTaskAware`)

Predefinit **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) iżid
it-test tal-**aħħar messaġġ tal-utent** (imqassar għal 500 karattru) mal-prompt
bażi tad-deskrizzjoni, biex jiggwida d-deskrizzjoni lejn dak li fil-fatt talab l-utent
(disinn codex-vision-proxy) u jitlob lill-mudell tal-viżjoni jittraskrivi t-test viżibbli.
Meta l-flag ikun mitfi — jew ma jkun hemm l-ebda test tal-utent — il-prompt bażi jintuża mingħajr tibdil.

It-talba kompatibbli ma' OpenAI tal-awto-linja tad-deskrizzjoni stess (`callVisionModelSingle()`
f'`visionBridgeHelpers.ts`) dejjem titlob `image_url.detail: "high"` —
mingħajr kundizzjonijiet, għal kull min jagħmel it-talba/fornitur, u mhux dipendenti fuq xi sinjal mill-klijent.
It-teħid ta' kampjuni b'dettall baxx inaqqas il-preċiżjoni tal-OCR eżattament għall-kompitu tat-traskrizzjoni
tat-test li jitlob dan il-prompt, għalhekk it-talba tad-deskrizzjoni stess dejjem titlob livell għoli ta'
dettall irrispettivament mil-livell ta' dettall li ntuża fit-talba oriġinali deħlin. Dan
jaffettwa biss il-body intern tat-talba tad-deskrizzjoni; ma jbiddilx kif
OmniRoute jgħaddi `image_url.detail` tal-utent fit-talba primarja —
dak il-valur predefinit jiġi applikat separatament, u biss għal klijenti OpenCode identifikati, f'
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Il-fergħa
tal-format ta' trażmissjoni Anthropic tal-awto-linja tad-deskrizzjoni ma għandhiex field `detail`
u mhijiex affettwata minn ebda wieħed miż-żewġ valuri predefiniti.

#### Limitu tal-output tad-deskrizzjoni (`modalityBridgeVisionMaxChars`)

| Ċavetta                        | Predefinit | Firxa             |
| ------------------------------ | ---------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` jew 100–50000 |

`0` (predefinit) ifisser **l-ebda limitu** — id-deskrizzjoni rritornata minn
`callVisionModel()` tgħaddi mingħajr modifika, biex tinżamm l-imġiba
eżistenti. Kwalunkwe valur fil-firxa 100–50000 iqassar id-deskrizzjoni b'suffiss
`…` qabel ma terġa' tiddaħħal bħala `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` f'`src/lib/guardrails/visionBridge.ts`).
Għolli dan għal kompiti tal-OCR b'ħafna dettalji fejn il-mudell downstream jeħtieġ it-
traskrizzjoni sħiħa; baxxih biex tillimita l-użu tat-tokens minn mudelli tal-viżjoni prolissi.
Il-field fid-dashboard jinsab fil-pannell Avvanzat tat-tab Viżjoni
(`modality-bridge-max-chars` f'`ModalityBridgeVisionTab.tsx`) u jgħolli kwalunkwe
valur bejn 1 u 99 sal-limitu minimu ta' 100, filwaqt li jħalli `0` espliċitu
mhux mibdul — `0` huwa valur Zod validu fih innifsu
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mhux sempliċement
il-valur predefinit ta' "mhux issettjat".

#### Cache tad-deskrizzjoni (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL fil-memorja għall-outputs tad-deskrizzjoni, kondiviża mal-proċess kollu.
Ċavetta = `sha256(imageRef + composedPrompt + configuredBridgeModel)` b'
inkwadrar bi prefiss tat-tul (mingħajr kolliżjonijiet fil-konfini tal-fields). Il-komponent tal-mudell huwa
l-mudell tal-bridge **ikkonfigurat**, mhux il-mudell li fil-fatt wieġeb —
`callVisionModel` jista' juża fallback internament, u l-ħolqien ta' ċavetta għal kull tentattiv
jifframmenta l-cache. Deskrizzjonijiet li jfallu qatt ma jinħażnu fil-cache. Settings:

| Ċavetta                         | Predefinit | Firxa   |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### Normalizzazzjoni ta' immaġini remoti (self-loop describe/base64 fetch)

Meta l-bridge jiġbor huwa stess immaġin **remota** — is-self-call describe ta' Anthropic u l-konverżjoni base64 tal-format claude-wire (`ensureBase64ImagesForClaudeWire`), it-tnejn permezz ta' `fetchRemoteImageAsDataUri()` f'`visionBridgeHelpers.ts` — id-data URI li jirriżulta jgħaddi minn `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) qabel ma jiġi inkorporat fir-rikjesta tal-mudell tal-viżjoni. Immaġini kbar wisq jitnaqqsu għal **tarf twil ta' 2048px** (li jaqbel mal-limitu ta' resize li OpenAI/Anthropic diġà japplikaw server-side), li jnaqqas il-bytes/il-latenza tal-upload mingħajr ma jibdel dak li jara l-mudell tal-viżjoni. Ir-resizing juża `sharp`, mgħobbi permezz ta' dynamic import: fuq pjattaforma fejn il-binary nattiv tiegħu ma jirnexxilux jitgħabba, `normalizeDataUri()` **qatt ma jtella' eċċezzjoni** — jaqa' lura għal passthrough tal-bytes oriġinali, sabiex il-mogħdija tad-describe/konverżjoni base64 dejjem tibqa' taħdem. Bytes li mhumiex immaġini (fetch li ma rritornax immaġin dekodifikabbli) jgħaddu wkoll mingħajr ma jinbiddlu. Din in-normalizzazzjoni hija limitata għal immaġini li l-bridge jiġbor għas-self-call tiegħu stess — qatt ma tiġi applikata lill-payload passthrough grezz tal-kaller, konsistenti mal-prinċipju ta' mutazzjoni opt-in biss (Regola Iebsa #20).

#### Skema tas-settings + migrazzjoni

Iċ-ċwievet ġodda `modalityBridge*` huma validati b'Zod f'`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, it-triplet `modalityBridgeCache*`, u l-grupp `modalityBridgeAudio*` użat mill-Audio Bridge. Il-migrazzjoni `141_modality_bridge_settings.sql` tikkopja l-valuri leġġatarji eżistenti `visionBridge*` fiċ-ċwievet ġodda korrispondenti (idempotenti, qatt ma tissostitwixxi valur `modalityBridge*` stabbilit mill-operatur); iċ-ċwievet leġġatarji jibqgħu aċċettati bħala fallback ta' qari għal ċiklu wieħed ta' rilaxx.

#### Header ta' trasparenza + statistika

Risposti trasformati mid-describe jġorru `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (mibni minn `buildModalityBridgeHeader()` f'`modalityBridge/bridgeStats.ts`, miżjud minn `withModalityBridgeHeader()` f'`src/sse/handlers/chatHelpers.ts`). Rikjesti rirottati ma jirċievux **l-ebda** header — il-payload ma kienx immiss u l-iskambju tal-mudell diġà huwa viżibbli fil-qasam `model` tal-ġisem tar-risposta.

`GET /api/modality-bridge/stats` (awtorizzazzjoni tal-ġestjoni, l-istess livell bħal `GET /api/settings`) jirritorna l-kontaturi in-memory għal kull modalità `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` għal `vision`, `audio`, u `video`. `averageLatencyMs` juża `latencySamples`, mhux l-attempts kollha, bħala denominatur tiegħu; operazzjoni mingħajr timing ma timfabbrika kampjun ta' żero millisekondi. `bridged` jibqa' l-alias kompatibbli mal-qodiem għal konverżjonijiet ta' suċċess; attempts li jfallu ma jinkrementawhux. Il-kontaturi jerġgħu jibdew meta l-proċess jerġa' jinbeda, apposta (telemetrija, mhux kontabilità).

#### Konfigurazzjoni tad-dashboard

Il-paġna dedikata tad-dashboard hija `/dashboard/settings/modality-bridge`. It-tabs `Vision`, `Audio`, u `Video` indirizzabbli minn URL tagħha jippreservaw il-parametri tal-query waqt li jbiddlu l-valur `tab`. It-tab Vision jesponi l-attivazzjoni, il-modalità, l-għażla tal-mudell (inkluż id-default awtomatiku), prompting task-aware, limiti avvanzati ta' timeout/immaġin/tul tad-deskrizzjoni/cache, kontaturi runtime, u rikjesta kampjunariu protetta. It-tab Audio huwa wkoll live: jesponi l-attivazzjoni, picker tal-mudell STT biss b'Auto, limiti ta' timeout/max-clip, kontaturi tal-awdjo, u test kampjunariu `input_audio`. It-tab Video huwa funzjonali: jirrapporta l-istat runtime ta' FFmpeg/ffprobe — wieħed minn erba' stati UI espliċiti (`unknown` filwaqt li l-probe huwa in flight jew ma setax jitlesta, `restricted` fuq host tad-dashboard mhux loopback fejn il-probe jiġi maqbuż client-side, `unavailable` ladarba jsir il-probe u jikkonferma li huwa nieqes, jew `available` mal-verżjonijiet ta' FFmpeg/ffprobe) — jippersisti l-limiti ta' attivazzjoni/mudell/frame/video/timeout, jiffiltra l-picker tal-mudell għal mudelli b'kapacità ta' viżjoni, u jesponi l-kontaturi tal-video.

Il-card Vision Bridge ta' qabel taħt is-settings tal-AI hija link ta' kompatibilità lejn il-paġna l-ġdida; m'għadhiex tagħmel kopja sekondarja tal-formola. Media Providers jirrelata wkoll il-workflows Image-to-Text u Speech-to-Text mat-tabs korrispondenti ta' Modality Bridge mingħajr ma tneħħi l-playground Speech-to-Text eżistenti.

**Bypass tal-ammissjoni self-loop:** meta s-sejħa describe tgħaddi mis-self-loop `/v1` ta' OmniRoute nnifsu (mudell ta' provider mhux standard), is-sub-rikjesta tibgħat `x-omniroute-admission-bypass: internal` u tkun awtentikata bil-kredenzjal self-loop riżolt — is-sentinel lokali `sk_omniroute` fil-modalità lokali, jew iċ-ċavetta env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` konfigurata mill-operatur (#1350) sabiex deployments b'`REQUIRE_API_KEY=true` xorta jistgħu jimxu s-sejħa describe. Il-bypass jiġi unurrat biss għal dawk il-kredenzjali eżatti, sabiex klijenti esterni ma jistgħux jużaw il-header biex jaqbeżu l-ammissjoni.

Id-defaults leġġatarji jinsabu f'`src/shared/constants/visionBridgeDefaults.ts`; id-defaults ġodda tal-modalità/task-aware/cache u r-resolver tas-settings jinsabu f'`src/shared/constants/modalityBridgeDefaults.ts`. Il-guardrail jesponi għażla tal-kostruttur `deps` sabiex it-tests jistgħu jinġettaw implementazzjonijiet foloz ta' `getSettings` u `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Jinterċetta rikjesti chat li jġorru awdjo qabel ma jaslu għal destinazzjoni li mhijiex magħrufa li taċċetta input awdjo. Qatt ma jirrotta r-rikjesta chat: il-partijiet awdjo jittrasixxmu permezz tal-endpoint multipart eżistenti kompatibbli ma' OpenAI u l-mudell chat magħżul jibqa' għaddej bit-traskrizzjonijiet tat-test.

Fluss:

1. Solvi `supportsAudio` permezz ta' `getResolvedModelCapabilities()`. Il-metadata espliċita tar-reġistru tal-fornitur għandha preċedenza, imbagħad il-metadata statika tal-mudell, imbagħad `modalities_input` sinkronizzat. Lista ta' inputs iddikjarata mingħajr `audio` tfisser `false`; jekk ma jkun hemm l-ebda evidenza ta' kapaċità, jibqa' `null`. Kemm `false` kif ukoll `null` jattivaw il-bridge konservattiv, filwaqt li `true` jegħlbih.
2. Solvi s-settings `modalityBridgeAudio*` u estrai partijiet awdjo fil-livell l-ogħla li jistgħu jiġu spliced minn kull messaġġ permezz tar-rilevatur kondiviż `detectMediaParts()`. Il-forom tal-wire appoġġjati huma OpenAI `input_audio`, `audio_url`, u `source.media_type: "audio/*"`. L-awdjo nested jiġi rrikonoxxut għar-rottament imma mhux imneħħi mill-mogħdija tas-splice. Ix-xogħol huwa limitat minn `modalityBridgeAudioMaxClips`; partijiet sussegwenti jibqgħu mhux misseta.
3. Onora `provider/model` konfigurat, jew ħalli lil `selectAudioBridgeModel()` jgħaddi minn `AUDIO_TRANSCRIPTION_PROVIDERS` fl-ordni stabbli tal-katalgu u jagħżel l-ewwel mudell b'kredenzjal ta' fornitur attiv li jista' jintuża.
4. `callAudioTranscription()` jikkonverti awdjo base64/data-URI f'`file` multipart, jew iniżżel `audio_url` remota permezz tal-gwardja outbound għall-pubbliku biss b'DNS pinning u limitu ta' 25 MB. Imbagħad jagħmel POST tal-fajl u tal-mudell magħżul lejn is-self-loop lokali `/v1/audio/transcriptions`, awtentikat b'`resolveSelfLoopBearer()`. Ir-rotta eżistenti tat-traskrizzjoni twettaq tfittxija normali tal-kredenzjali, ġestjoni ta' cooldown/rate-limit, u dispatch lejn il-fornitur.
5. Sejħiet b'suċċess jissostitwixxu l-partijiet tagħhom b'`[Audio N]: <transcript>`. Is-sejħiet jaħdmu b'`Promise.allSettled`: falliment individwali jippreserva dik il-parti awdjo oriġinali (kuntratt #4012). Jekk kull sejħja tfalli u t-target ikun pprovat `supportsAudio === false`, il-partijiet jsiru `[Audio N]: (unavailable — no STT provider connected)` (kuntratt #8430). Għal target mhux magħruf (`null`), riżultat fejn kollox ifalli jibqa' mhux misset. Target pprovat bħala test biss mingħajr kredenzjal STT li jista' jintuża jirċievi l-istess stub espliċitu mingħajr ma tagħmel sejħja tan-network.

Traskrizzjonijiet b'suċċess jużaw il-cache LRU/TTL tal-Modality Bridge fuq livell tal-proċess kollu. Iċ-ċavetta tgħaqqad ir-referenza tal-awdjo, it-tikketta stabbli tal-operazzjoni `audio-transcription`, u l-mudell STT magħżul; il-fallimenti qatt ma jiġu mħażżna fil-cache. It-tentattivi tal-awdjo jaġġornaw il-kontaturi kondiviżi `bridged`, `cacheHits`, `failures`, u `lastUsedAt`. Risposti trasformati jġorru `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; talbiet mhux misseta ma jirċivux segment tal-Audio Bridge.

Is-settings tar-runtime huma bbażati fuq DB u validati b'Zod:

| Ċavetta                       | Default | Firxa           |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto jew ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Il-cache kondiviża tibqa' kkontrollata minn `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, u `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Jinterċetta partijiet vidjo fil-livell l-ogħla fi `messages` ta' Chat Completions u `input` tal-Responses API qabel ma jitsejjaħ target mingħajr appoġġ nattiv magħruf għall-vidjo. Il-forom appoġġjati huma `input_video`, `video_url`, `video_source`, URLs HTTPS, u data URIs `data:video/*;base64,...`. Ismijiet ta' fajls sempliċi ġewwa test ma jittrattawx bħala vidjo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) jippossjedi t-traversata tat-talba, il-verifika tal-kapaċità/politika, l-aggregazzjoni għal kull talba, u l-payload tar-risposta. Ix-xogħol għal kull vidjo — l-akkwist, il-cache tar-riżultat sħiħ, id-deskrizzjoni ta' sekwenza ta' frames (li tgħaqqad kwalunkwe traskrizzjoni awdjo iddikjarata mill-sejjieħ), u l-metrics/abort/cleanup għal kull tentattiv — huwa moħbi wara `processVideoPart` fi `videoBridgePipeline.ts`, imsejjaħ darba għal kull parti vidjo ġewwa l-loop ta' `preCall`. Dak il-modulu jiddefinixxi wkoll il-fruntieri espliċiti tal-portijiet `VideoMediaBrokerPort` (l-akkwist tal-bytes u l-estrazzjoni ta' frames kampjunati), `VideoAudioTranscriptionPort` (it-twaħħil ta' traskrizzjoni awdjo iddikjarata mill-sejjieħ mad-deskrizzjonijiet kampjunati), u `VideoDrilldownPort` (il-fruntiera tal-persistenza tad-drill-down tal-frames; għadu mhux imqabbad fi `processVideoPart` — biss ir-rotta separata `/api/modality-bridge/video/drilldown` tikteb entrati ta' drill-down bħalissa).

Il-mogħdija pubblika tat-talbiet `/v1` qatt ma timporta jew tinvoka subprocess. Vidjos remoti jitniżżlu taħt limitu ta' 50 MiB; vidjos base64 inline għandhom limitu konservattiv ta' 36 MiB decoded għal kull vidjo sabiex l-envelope tal-mudell/messaġġi/framing jista' jibqa' ġewwa l-limitu pubbliku ta' ammissjoni ta' talbiet JSON ta' 50 MiB. It-tul inline u l-istimi tad-daqs decoded jiġu vverifikati qabel l-allokazzjoni. HTTPS huwa meħtieġ fuq l-URL remota inizjali u fuq kull redirect, billi tintuża l-gwardja outbound eżistenti għall-pubbliku biss b'DNS pinning. Il-bytes imbagħad jaqsmu l-fruntiera interna eżatta tal-broker `POST /api/modality-bridge/video/extract`. Dik ir-rotta hija kemm `LOCAL_ONLY` kif ukoll `SPAWN_CAPABLE`, taċċetta biss talba awtentikata għal kull proċess minn loopback fdat, u qatt ma taċċetta URL, mogħdija ta' filesystem, eżegwibbli, jew lista ta' argumenti. Il-pipeline tad-daqs tal-body tal-API u l-qarrej inkrementali tal-body tal-handler jinfurzaw b'mod indipendenti limitu ta' input tal-broker ta' 50 MiB. Il-kju limitat tagħha jħaddem estrazzjoni waħda kull darba, jippermetti erba' xogħlijiet pendenti, u jillimita l-input pendenti għal 100 MiB.

Ġewwa l-broker, `ffprobe` jaqra fajl lokali privat; il-lista fissa
ta’ formati permessi teskludi l-formati tal-playlists u tal-manifests. Għall-
kontenituri permessi tal-familja MOV, ir-referenzi esterni għad-data MOV jibqgħu
diżattivati b’mod awtomatiku, u l-kmand fiss ma jattivahomx. Kemm `ffprobe` kif
ukoll `ffmpeg` jużaw il-lista ta’ permessi tal-protokolli limitata għal `file`
biss, thread wieħed, arrays fissi ta’ argumenti, l-ebda shell, u eżekutibbli
riżolti minn `PATH`. Streams ta’ qoxra b’stampa mehmuża mhumiex kandidati li
jistgħu jintlagħbu. L-istrejms kollha li jistgħu jintlagħbu jridu jissodisfaw
il-limiti, u stream predefinit espliċitu jingħata preferenza qabel l-għażla
deterministika tal-indiċi l-aktar baxx. Il-vidjows huma limitati għal 600
sekonda, 8,192 pixel għal kull dimensjoni, u 33,554,432 pixel tas-sors. FFmpeg
jieħu kampjuni ta’ bejn 1 u 16-il frame JPEG mill-punti tan-nofs, inaqqas
l-iskala tat-tarf it-twil għal mhux aktar minn 1,024 pixel mingħajr ma jkabbar
inputs iżgħar, u qatt ma jirċievi URL. It-teħid tal-kampjuni huwa `uniform`
b’mod awtomatiku. Il-politiki fakultattivi `scene_aware` u dik sperimentali
`segment_aware` iwettqu pass fiss addizzjonali wieħed ta’ FFmpeg fuq l-istream
lokali diġà vvalidat, jagħżlu timestamps limitati tax-xeni minn `showinfo`, u
jaqgħu lura b’mod deterministiku għall-istess punti tan-nofs uniformi jekk
id-ditekter ifalli, jiskadi l-ħin, l-output ikun iffurmat ħażin, jew is-sett
tal-kandidati jkun vojt. Il-modalità konxja tas-segmenti talloka l-kampjuni
tal-punti tan-nofs proporzjonalment għall-intervalli tax-xeni vvalidati;
l-evidenza konxja tas-segmenti u l-imġiba ta’ fallback huma
ddettaljati hawn taħt. Il-limitu strett ta’ 16-il frame jiġi
applikat wara l-għażla f’kull politika. Meta talba konxja tax-xeni jkollha baġit
ta’ frame wieħed biss, din tuża l-punt tan-nofs uniformi tal-vidjow sħiħ attiv
jew tat-tieqa ta’ fokus u tirrapporta `policyEffective: uniform`: frame wieħed
magħżul minn xena ma jistax jippreserva ż-żewġt itruf temporali. Min jagħmel
is-sejħa jista’ jipprovdi b’mod fakultattiv tieqa ta’ fokus finita
(`start`/`end` f’sekondi); il-limiti jiġu ristretti għad-durata tal-midja,
twieqi maqlubin jew mhux finiti jiġu rrifjutati, u l-politiki kollha tat-teħid
tal-kampjuni jitwettqu biss fl-intervall normalizzat. It-tieqa li tirriżulta
tiġi inkluża fil-metadata tat-teħid tal-kampjuni u fil-prefiss tad-deskrizzjoni
mhux fdata sabiex il-mudelli downstream ikunu jistgħu jiddistingwu silta
ffukata mil-linja kronoloġika sħiħa.

Il-fokus semantiku tal-caption huwa setting separat u espliċitu. Il-modalità
ta’ analiżi predefinita `full` tippreserva l-prompt eżistenti tal-frames u qatt
ma tgħaddi t-test tat-talba lill-mudell tal-caption. Fil-modalità `focused`,
il-bridge jaqra biss l-aħħar `text`/`input_text` mhux vojt miktub mill-utent
mill-istess kontenitur ta’ Chat jew Responses, jinnormalizzah għal NFC,
jikkollassa l-karattri ta’ kontroll u l-ispazji bojod, u jillimitah għal 500
punt tal-kodiċi Unicode. Riżultat vojt jaqa’ lura għall-prompt `full` eżatt.
Ħjiel li jista’ jintuża jiġi sserjalizzat bħala JSON fi blokka ddedikata ta’
kuntest tal-utent mhux fdat u jista’ biss jagħti prijorità lil dettalji
osservabbli; ma jistax jegħleb it-twissija separata kontra s-segwitu ta’
struzzjonijiet viżibbli jew li jinstemgħu fil-midja. Il-fokus testwali qatt ma
jiddeduċi `start`/`end` u ma jibdilx is-sampler temporali.

#### Evidenza strutturali tas-segmenti FU-07

`segment_aware` juża pass wieħed limitat ta’ analiżi preliminari fuq l-istream
tal-vidjow lokali diġà vvalidat. Il-katina fissa ta’ filtri l-ewwel tnaqqas
l-iskala għal wisa’ ta’ mhux aktar minn 320 pixel, tidentifika bidliet fix-xeni
u intervalli ffriżati, u mbagħad tieħu kampjun b’rata ta’ frame wieħed kull
sekonda għall-iċċajpar, il-luma medja, u l-informazzjoni spazjali/temporali.
Il-pass huwa limitat għal 600 kampjun strutturali, thread wieħed ta’
FFmpeg/filtru, l-istess listi ta’ permessi tal-protokoll limitati għal `file`
biss u tal-kontenituri, limitu ta’ 1 MiB għall-output tal-proċess, u mhux aktar
minn 30 sekonda fi ħdan l-interruzzjoni/skadenza kondiviża tal-broker. Dan qatt
ma jaċċetta kmand, filtru, path, jew URL mit-talba.

Il-valuri strutturali huma evidenza deterministika tat-teħid tal-kampjuni, mhux
fehim semantiku tal-vidjow. Dawn ma jiddeduċux suġġetti, azzjonijiet, captions,
diskors, jew l-intenzjoni tal-utent. Il-konfini tax-xeni u tal-iffriżar jiffurmaw
segmenti; il-kopertura tal-iffriżar, l-iċċajpar, l-esponiment, id-dettall
spazjali, u l-bidla temporali jinfluwenzaw biss kif jiġi allokat il-baġit
eżistenti ta’ bejn 1 u 16-il frame. Segment kompletament iffriżat huwa limitat
għal frame wieħed, filwaqt li s-segmenti mhux iffriżati jikkompetu għall-baġit
li jifdal. Meta jkun hemm aktar konfini milli frames, tinżamm kopertura uniformi
tal-linja kronoloġika sabiex qtugħ rapidu fil-bidu ma jkunx jista’ jaħbi segment
twil fit-tarf. Il-konfini tax-xeni li jkunu fir-riżoluzzjoni ta’ analiżi ta’
sekonda mill-konfini ta’ ffriżar jiġu kkombinati.

Filtri neqsin, evidenza fformata ħażin jew vojta, żball fid-ditekter, jew l-iskadenza
tal-analiżi preliminari limitata jaqgħu lura għall-politika eżatta tal-punt
tan-nofs uniformi. Interruzzjoni minn min jagħmel is-sejħa jew skadenza
tal-broker ma taqax lura: din ittemm is-sottoproċess li jkun qed jitwettaq,
tipprevjeni l-estrazzjoni sussegwenti tal-frames, u s-siġra temporanja privata
titneħħa f’`finally`.

`scripts/perf/video-bridge-fu07-eval.ts` jiġġenera fixtures deterministiċi reali
ta’ FFmpeg għall-iffrankar f’sejħiet tal-caption wara d-deduplicazzjoni,
l-allokazzjoni tal-baġit għal moviment dens, l-evidenza ta’
ċċajpar/esponiment/SI-TI, qtugħ rapidu b’denb twil, u pożittivi foloz minn
fade gradwali. Dan jirreġistra l-ħin reali tal-analiżi preliminari u, fejn
`/usr/bin/time` ikun disponibbli, is-CPU tal-proċess wild u l-ogħla RSS. Il-
kontrolli tal-kwalità tiegħu huma orakli strutturali biss. Il-kwalità reali
tal-mudell tal-caption tibqa’ `HOLD` minħabba li dan il-harness ma għandu ebda
endpoint awtorizzat jew evalwatur fiss. L-iffrankar monetarju jibqa’ wkoll
`HOLD` sakemm `--caption-cost-per-call-usd` ma jipprovdix stima pożittiva
espliċita tal-ispiża għal kull sejħa; l-iskript qatt ma jiffabbrika xi wieħed
minn dawn ir-riżultati.

Kull frame huwa limitat għal 4 MiB, il-frames mhux ipproċessati kollha flimkien għal 23 MiB, u
r-rispons serjalizzat tal-broker għal 32 MiB. Direttorju temporanju privat jitneħħa
f’`finally`. OmniRoute ma jinkludix FFmpeg u ma jaċċettax mogħdija personalizzata
għall-eżekutibbli. Qabel ma jiġġenera l-captions, il-pont japplika pass konservattiv
ta’ deduplikazzjoni viżiva: kull JPEG jitnaqqas għal buffer grayscale ta’ 16×16 u
jitqabbel biss mal-aħħar frame miżmum. Għal baġit mitlub ta’ captions
akbar minn frame wieħed, l-estrazzjoni tipprovdi
ġabra limitata ta’ kandidati sa darbtejn dak il-baġit u qatt aktar minn 16-il frame.
Il-limitu massimu mitlub jiġi applikat biss wara d-deduplikazzjoni, filwaqt li l-ewwel u l-aħħar
kandidati magħżula jinżammu waqt it-tnaqqis finali meta l-baġit ikun mill-inqas
tnejn. Il-politika b’verżjoni
`grayscale-16x16-mean-cells-v2` tuża l-akbar valur bejn id-differenza medja tal-luma u
l-proporzjon taċ-ċelloli tal-minjatura li d-differenza normalizzata tagħhom hija mill-inqas 0.05. Il-
limitu tad-duplikazzjoni huwa l-kostanti 0.04, magħżul għall-prevedibbiltà aktar milli
biex jiġi espost bħala konfigurazzjoni waqt l-eżekuzzjoni. Dan is-sinjal sekondarju
b’kuntrast għoli jippreserva movimenti żgħar u bidliet fit-test viżibbli li
tqabbil ibbażat biss fuq il-medja jista’ jaħbi. Żbalji fil-komparatur jew fid-decoder ma jimblukkawx il-proċess u jżommu
l-kopertura. Il-metadata tal-output tissepara l-kandidati estratti, il-
frames użati b’suċċess, u d-duplikati viżivi eliminati.

Parti tal-vidjo mmarkata b’mod espliċitu tista’ titlob contact sheet b’timestamps. Il-
pont jibni grilja JPEG b’massimu ta’ 4 kolonni u 16-il frame. Kull ċellola ta’ 512-il pixel
tinkorpora t-timestamp tas-sors tagħha f’faxxa tal-qiegħ b’kuntrast għoli, filwaqt li l-istess timestamps
jibqgħu fil-metadata testwali għall-assoċjazzjoni u l-awditjar fi stadji sussegwenti. Il-
JPEG sħiħ jibqa’ limitat għal 32 MiB. Jekk `sharp` ma jkunx jista’ jiddekowdja jew jikkomponi l-grilja, il-
pont jaqa’ lura għall-frames JPEG individwali; kanċellazzjoni mill-klijent xorta tiġi propagata
matul l-operazzjoni tal-contact sheet.

L-evidenza għall-promozzjoni tinżamm deliberatament separata mill-mikrobenchmark sintetiku
tal-kompożizzjoni. `scripts/perf/video-bridge-contact-sheet-eval.ts` jiddefinixxi
għodda ta’ valutazzjoni A/B bi schema b’verżjoni għal mudelli viżivi reali kompatibbli ma’ OpenAI. Din tkejjel
it-tokens irrappurtati mill-fornitur, il-latenza end-to-end skont il-ħin reali (inkluża l-kompożizzjoni tal-contact sheet),
l-għadd ta’ sejħiet lill-mudell, u ż-żamma tal-fatti ddefiniti fil-manifest. Ir-risponsi mhux ipproċessati tal-mudell ma
jinkitbux fir-rapport; jinżammu biss id-diġests SHA-256 u l-IDs tal-fatti mqabbla. L-
għodda ma tagħmel ebda sejħa lin-network jew lil mudell bi ħlas sakemm ma jiġix mgħoddi `--execute-real` u
`--model`, `OMNIROUTE_BASE_URL`, u `OMNIROUTE_API_KEY` ma jkunux ikkonfigurati. Mingħajr
dik l-eżekuzzjoni reali espliċita, il-verdett tagħha li jista’ jinqara minn magna jibqa’ `HOLD`; il-
kejl sintetiku tal-payload u tal-għadd tas-sejħiet waħdu mhuwiex evidenza għall-promozzjoni.

Min jagħmel is-sejħa jista’ jehmeż array fakultattiva `transcript.cues` ma’ parti tal-vidjo
appoġġjata meta diġà jkollu test allinjat. Kull cue għandu jinkludi `text`, intervall
finit `start`/`end` fi ħdan id-durata mistħarrġa, u `source` minn lista permessa
(`client`, `embedded`, jew `audio-bridge`); `confidence` għandu valur predefinit ta’
`1` u għandu jibqa’ bejn `0` u `1`. Cues duplikati eżattament jingħaqdu f’wieħed.
OmniRoute qatt ma jibda traskrizzjoni minn din il-metadata: cues validati jiġu
kkupjati fir-riżultat deskritt bis-sors, il-kunfidenza, u l-intervall tagħhom, u
jiġu rrappreżentati bħala osservazzjonijiet mhux fdati flimkien mal-captions tal-frames. Test invalidu,
barra mill-medda, jew mingħajr provenjenza jiġi rrifjutat minflok ma jitħallat fil-
fluss tal-captions. Iż-żewġ kanali tat-traskrizzjoni fil-body tat-talba jinnormalizzaw il-provenjenza pprovduta
għal `client`, inklużi tikketti `embedded` jew `audio-bridge` iddikjarati mill-utent
innifsu. Adapter ikkontrollat mis-server biss jista’ jassenja dawk it-tikketti fdati permezz
tal-argument disponibbli biss fil-kodiċi `trustedSource`; field JSON fit-talba ma jistax jilħaq
dak l-argument. It-test tat-traskrizzjoni jibqa’ kontenut mhux fdat derivat mill-media,
irrispettivament mill-provenjenza tiegħu, u qatt ma għandu jiddetermina l-awtorizzazzjoni.

Min jagħmel sejħa avvanzata jista’ jipprovdi track `audioTranscript` għall-istess vidjo;
din tiġi ttrattata bħala test ipprovdut mill-klijent, mhux bħala prova ta’ traskrizzjoni mis-server.
Il-punt ta’ fużjoni jmexxi l-osservazzjonijiet viżivi u awdjo taħt
deadline u sinjal ta’ kanċellazzjoni wieħed, jordnahom fuq timeline komuni, jgħaqqad
duplikati eżatti, u jirrapporta riżultat parzjali meta naħa waħda biss tirnexxi.
`audioTranscript` invalida tiddegrada għal dak ir-riżultat parzjali — id-deskrizzjoni
viżiva tinżamm u l-fergħa tal-awdjo tirreġistra kodiċi ta’ falliment sanitizzat —
minflok ma tfalli l-vidjo kollu. Id-disponibbiltà għal kull fergħa, il-flag parzjali,
u l-kodiċijiet ta’ falliment sanitizzati jinżammu fir-riżultat deskritt, fil-
metadata tal-guardrails (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), fil-metadata tal-cache tar-riżultati, u fil-counters tal-fużjoni
tal-pont. Il-mogħdija predefinita tal-Video Bridge ma tinvokax speech-to-text
u ma tniżżilx kopja oħra tal-media; mingħajr dak it-track espliċitu, tibqa’
tal-vidjo biss.

**Żamma tat-traskrizzjonijiet (#12150 P1).** Dan japplika awtomatikament kull meta
l-Video Bridge (li fih innifsu jeħtieġ attivazzjoni espliċita) jirrendi indikazzjoni ta’ traskrizzjoni — ma hemm ebda
indikatur separat għaż-żamma. Meta talba tirrendi kwalunkwe indikazzjoni ta’ traskrizzjoni (jew
`transcript` iddikjarata minn min jagħmel it-talba, jew `audioTranscript` magħquda), il-miżura ta’ protezzjoni timmarkaha bħala
`videoBridgeObserved` u tipproduċi kopja parallela redatta tad-deskrizzjoni tal-vidjo —
rendering identiku li fih it-test liberu ta’ kull indikazzjoni jinbidel b’
`[redacted-video-transcript]`, maħluq billi jiġi sostitwit il-kamp strutturat tal-indikazzjoni
qabel ma tinġabar is-sekwenza (u qatt billi jiġi analizzat it-test iċċattjat, sabiex ebda kontenut
tal-indikazzjoni — kemm jekk avversarju jew ordinarju, inklużi partijiet li fihom `]` bħal
`[inaudible]`/`[music]` — ma jkun jista’ jibqa’). Il-korp tat-talba fir-reġistru persistenti tas-sejħa jibdel
kull parti tat-test derivata mill-vidjo b’dik il-kopja parallela redatta, imqabbla skont l-ugwaljanza
tal-kontenut; l-ankra `fullText` terġa’ tinqara mill-payload finali tal-miżura ta’ protezzjoni
ta’ qabel is-sejħa, sabiex it-tqabbil jibqa’ jirnexxi wara li miżuri ta’ protezzjoni sussegwenti fil-katina
(il-maskri tal-PII u tal-kredenzjali, bi prijoritajiet 10/95) jerġgħu jiktbu t-test tad-deskrizzjoni fil-post u
wara li l-injezzjoni tal-prompt tas-sistema, tal-handoff u tal-Memory tbiddel l-istruttura tal-array tal-messaġġi. Il-
korp mibgħut upstream lill-mudell ma jinbidilx. Talba osservata lanqas ma timla
Memory persistenti (kemm l-estrazzjoni derivata mit-talba kif ukoll dik derivata mit-tweġiba jinqabżu),
sabiex it-tweġiba tal-mudell stess ma tkunx tista’ tirrepeti test tat-traskrizzjoni fil-Memory.

**Kampi mhux ipproċessati tal-vidjo (#12430).** Meta l-bridge ikun attivat u l-appoġġ nattiv għall-vidjo ma jkunx magħruf jew ikun nieqes, il-kampi definiti `transcript`/`audioTranscript` jattivaw ukoll `videoBridgeObserved`, anki wara falliment fid-deskrizzjoni jew limitu `maxVideos`. `null` u strings vojta jgħoddu; kampi assenti u metadata mhux tal-vidjo ma jgħoddux. Il-kopji miżmuma jirredattaw dawn il-kampi jew iħallu barra t-talba, u l-caches/Memory jinqabżu.

F’dawk il-mogħdijiet alternattivi, indikazzjonijiet validi pprovduti minn min jagħmel it-talba jsiru partijiet appoġġjati
`text`/`input_text` minflok kampi mhux standard tal-fornitur. Iż-żewġ tracks
ipprovduti mat-talba jibqgħu osservazzjonijiet `client` mhux fdati, bi twissija espliċita li l-vidjo
ma ġiex deskritt u li t-timestamps ma ġewx ivverifikati mal-midja. Il-limiti eżistenti ta’
256 indikazzjoni/64-KiB b’kollox u għal kull indikazzjoni japplikaw għaż-żewġ tracks flimkien;
it-timestamps iridu jkunu fil-limitu massimu ta’ 600 sekonda tal-broker u fi kwalunkwe tieqa ta’ fokus
ipprovduta. Tracks invalidi jintremew u ma jintbagħtux bħala test arbitrarju; track validu
parallelu xorta jista’ jintuża sakemm il-baġit ikkombinat tagħhom ma jinqabiżx. Kampi nulli/vojta
ma jżidu ebda test. Dan il-fallback ma jżid ebda fetch tal-midja jew traskrizzjoni.
Il-kampi tal-estensjoni tat-traskrizzjoni jitneħħew mill-kontenitur fallback tal-vidjo u mill-oġġetti
`video_url`/`source` tiegħu. L-allowlist tal-wire ta’ OpenAI tibqa’ stretta; il-kontenituri tal-vidjo
b’appoġġ nattiv mhux magħruf jibqgħu disponibbli u miri magħrufa li jaċċettaw test biss iżommu markaturi sikuri.
Kopji paralleli ta’ redazzjoni strutturata jipproteġu t-test tat-traskrizzjoni miżjud, filwaqt li t-
talba oriġinali ta’ min jagħmilha tibqa’ ma tinbidilx. Miri b’appoġġ nattiv u
bridges diżattivati jżommu l-imġiba eżistenti tagħhom li taqbeż dan l-ipproċessar.

Kopji miżmuma addizzjonali jużaw l-istess sinjal ta’ talba osservata. L-istampa mhux ipproċessata
tat-talba tal-klijent qabel il-miżura ta’ protezzjoni, it-talba pendenti fil-memorja, u r-reġistru bikri
tat-talba miċħuda jissostitwixxu strutturalment il-kampi tat-traskrizzjoni fil-partijiet tal-vidjo;
prompts fil-forma ta’ strings iġġenerati mill-istadji tal-pipeline u mill-handoff tal-kuntest jiġu redatti
fis-sink tal-korp persistenti tat-talba. Il-markatur persistenti `video_content_removed`
iġiegħel il-kontinwazzjoni permezz ta’ `previous_response_id` tfalli b’mod magħluq minflok ma terġa’ tibni
test li twarrab intenzjonalment. Jekk talba osservata titlef il-kopja parallela tar-redazzjoni tagħha
għal kull parti qabel ir-reġistrazzjoni, jew jekk anki kopja waħda minn diversi kopji paralleli tal-vidjo
ma jirnexxilhiex taqbel wara mutazzjonijiet sussegwenti tat-talba, il-korp tat-talba miżmum jitħalla
barra għalkollox minflok tinżamm traskrizzjoni redatta parzjalment.

Għal talba osservata, tweġiba tal-mudell tista’ tikkwota kwalunkwe parti mit-
traskrizzjoni mingħajr limitu strutturat ta’ indikazzjoni. Għalhekk, `responseBody` fir-reġistru persistenti
tas-sejħa tagħha jinbidel b’markatur ta’ ommissjoni; l-artefatt dettaljat tal-
pipeline (li jista’ jinkludi korpi upstream/tal-klijent u biċċiet tal-stream) ma jinżammx.
Il-caches semantiċi, tal-idempotenza u tar-replay tar-raġunament jaqbżu l-qari u l-kitba
għal dik it-talba. It-talba lill-fornitur u t-tweġiba viżibbli għall-klijent jibqgħu ma jinbidlux.
Bytes bikrin ta’ keepalive jitneħħew mill-buffer temporanju meta l-artefatt dettaljat
jitħalla barra. It-twissija ta’ Kiro dwar EventStream malformatat tirrapporta biss l-għadd ta’ bytes
tal-payload, u qatt il-kontenut tiegħu jew l-iżball mhux ipproċessat tal-parser tal-JSON.
Dan ma jfissirx li kull dijanjostika mhux relatata tal-fornitur/plugin ġiet
awditjata; l-analiżi usa’ tas-sinks persistenti hija ssorveljata f’#11658.

Iċ-ċiklu tal-ħajja intern ta’ `/api/modality-bridge/video/drilldown` huwa substrat separat
tal-cache awtentikat permezz ta’ loopback/token. Kull operazzjoni teħtieġ ukoll
ID opak u kanoniku tal-prinċipal. Qabel ma jiġi attivat caller ta’ produzzjoni, dan irid
jidderiva dak l-ID mit-tenant awtentikat u qatt ma għandu jibgħat valur
magħżul mill-klijent. Iċ-ċwievet tal-cache jorbtu dak il-prinċipal ma’ IDs kanoniċi tas-sessjoni u
tar-referenza tal-vidjo, jaħżnu biss iċ-ċwievet derivati permezz ta’ SHA-256 tagħhom, u jillimitaw kemm il-qari
kif ukoll it-tħassir għall-istess prinċipal. Il-cache taħżen mhux aktar minn 16-il frame JPEG
derivat għal kull entrata, tiskadihom wara għaxar minuti, u tappoġġja qari limitat permezz ta’
`start`/`end` jew tħassir espliċitu tas-sessjoni.

Kull prinċipal huwa limitat għal 16-il entrata u 64 MiB ta’ data JPEG kanonika. Dawk
il-limiti huma indipendenti mil-limitu globali ta’ 64 entrata/256 MiB: il-pressjoni tal-kwota
tal-prinċipal tkeċċi biss l-entrati l-inqas użati reċentement ta’ dak il-prinċipal qabel ma
tiġi kkunsidrata t-tkeċċija globali LRU. Entrati skaduti jitneħħew kemm mill-kontabbiltà
tal-prinċipal kif ukoll minn dik globali waqt attività tal-cache, filwaqt li kanċellazzjoni u falliment tal-validazzjoni ma
jikkommettux sostituzzjoni parzjali.

Il-cache tirrifjuta Base64 mhux kanoniku, padding eċċessiv, medja li mhijiex JPEG, JPEGs deformi jew imqattgħin, u JPEGs li jipproduċu twissija waqt dekodifikazzjoni `sharp` tal-immaġni sħiħa bil-limiti. Terġa' tikkodifika kull immaġni aċċettata bħala JPEG kanoniku, tideriva l-wisa' u l-għoli mill-bytes dekodifikati minflok li tafda l-oqsma tal-callant, u tarmi kwalunkwe bytes poliglott fid-denb minflok li żżommhom. Biss il-buffer kompressat kanoniku bil-limiti jiġi kkontat lejn iż-żewġ kwoti. Il-limitu tal-wire JSON jinkludi l-overhead tal-Base64 għas-saqaf tal-input dekodifikat ta' 32 MiB. Kull derivazzjoni maħżuna tirrekordja l-format/riżoluzzjoni JPEG validata tagħha, il-politika ta' kampjonar, il-verżjoni tad-derivazzjoni, il-ħin tal-ħolqien, il-hash tal-kontenut ikkomputat mis-server, u r-referenza tal-ġenitur hashed flimkien mal-hash tal-kontenut tal-ġenitur tal-callant fdati. Il-kanċellazzjoni tiġi kkontrollata bejn il-fażijiet asinkroni ta' dekodifikazzjoni/hash qabel il-commit atomiku tal-cache.

Din it-tranche għadha ma tgħaqqadx produttur ta' produzzjoni mar-rotta u ma tipprovidix għażla ta' varjanti multi-riżoluzzjoni. Il-mogħdija tat-talbiet trasparenti tal-Video Bridge għalhekk ma tirrikorri l-ebda xogħol miżjud, filwaqt li d-derivazzjoni tal-prinċipal marbuta mat-tenant u ċ-ċiklu tal-ħajja sħiħ multi-riżoluzzjoni ta' FU-08 jibqgħu xogħol ta' segwitu espliċitu minflok dokumentati bħala imġieba kompluta.

Il-frejms jiġu kkaptjonati b'mod sekwenzjali bil-mudell Video kkonfigurat. Override vojt tal-Vidjo jirt l-issettjar tal-Vision; jekk it-tnejn ikunu vojta, l-auto-router tal-Vision jagħżel il-mudell effettiv kapaċi għall-viżjoni. Kaptjons ta' suċċess jissostitwixxu l-parti oriġinali b'prefiss stabbli `[Video description:` li jimmarka wkoll it-test bħala osservazzjoni derivata mill-medja mhux fdati u jgħid lill-mudelli tad-downstream biex ma jsegwux struzzjonijiet misjuba fil-medja. Iċ-ċwievet tal-cache tal-kaptjons tal-frejms jinkludu l-bytes JPEG, il-prompt, it-timestamp, u l-mudell effettiv; biss kaptjons ta' suċċess jiġu cached. Id-dħuliet tal-cache iżommu l-mudell produttur ta' suċċess attwali, inkluż mudell ta' fallback; il-bridge jirrapporta `mixed` meta frejms differenti jkunu ġew prodotti minn mudelli differenti. Cache hit terġa' tuża dik l-identità tal-produttur minflok ma terġa' ttikkettejha bħala l-pjan ta' routing mitlub. Il-cache tar-riżultati tal-vidjo sħiħ hija msewwija fuq kull input li jbiddel l-output — prompt, mudell effettiv, politika ta' kampjonar, għadd ta' frejms, modalità tal-analiżi semantika, il-fingerprint SHA-256 tal-hint tal-fokus normalizzat, it-tieqa tal-fokus, `transcript`, `audioTranscript`, u l-bandiera tal-contact-sheet — allura bidla fi kwalunkwe minn dawk id-dimensjonijiet hija cache miss, qatt riużu skadut. Il-verżjoni tal-politika dedup viżwali, il-limitu, u l-għadd bil-limiti ta' frejms kandidati huma wkoll espliċiti fiċ-ċavetta u l-metadati tal-cache tar-riżultati; bidla fil-politika għalhekk ma tistax terġa' tuża deskrizzjoni skaduta tal-vidjo sħiħ. Il-metadati v4 tal-cache tar-riżultati jżommu l-modalità u l-fingerprint, qatt il-kompitu grezz tal-utent. Il-metadati tal-guardrail jirrapportaw kemm il-modalità tal-analiżi mitluba kif ukoll dik effettiva; modalità `focused` mitluba mingħajr test tal-utent utilizzabbli tiġi rrapportata bħala effettivament `full`.

Il-guardrail jiġbed kull parti tal-vidjo appoġġata iżda ma jiddeskrivi aktar minn `modalityBridgeVideoMaxVideos`. Għal mira ppruvata li għandha `supportsVideo === false`, vidjos li fallew jew li qabżu l-limitu jsiru markaturi ta' test sikuri espliċiti sabiex l-ebda vidjo grezz ma jibqa' ħaj. Meta l-kapaċità tkun mhux magħrufa, dawk il-partijiet iżommu l-karrier tal-vidjo tagħhom; kwalunkwe traskrizzjoni ta' fallback issegwi l-konverżjoni tat-test bil-limiti ta' hawn fuq. Miri b'`supportsVideo === true` jgħaddu minn ġenb il-bridge. Is-sinjal ta' abort tat-talba tal-klijent jippropaga permezz tad-download, il-kju tal-broker, is-sottoproċessi, u t-telefonati tal-kaptjons; l-aborts jieqfu bejn il-vidjos u qatt ma jfawlu miftuħ għal medja grezza.

Is-settings tar-runtime huma appoġġati mid-DB u validati b'Zod:

| Ċavetta                             | Default     | Firxa / imġieba                                                                                               |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opzjonali, opt-in                                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` iżomm kaptjons ġeneriċi; `focused` juża kuntest bil-limiti u mhux fdati tal-aħħar utent                |
| `modalityBridgeVideoModel`          | `""`        | Jirfedi l-mudell tal-Vision Bridge                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                          |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, jew `segment_aware` proporzjonali; falliment tad-detettur jaqa' lura għal `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                           |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                |

Valuri ta' timeout tal-Vidjo persistiti legacy 'l fuq minn 120 sekonda jiġu kklampjati sad-deadline tal-broker; kitbiet ġodda ta' settings 'l fuq minn dak il-limitu jiġu rrifjutati. `GET /api/modality-bridge/video/runtime` jeħtieġ lokalità ta' loopback timbrata fdati qabel l-awtentikazzjoni jew il-probing tar-runtime, imbagħad jeħtieġ awtentikazzjoni ta' ġestjoni. Jirritorna biss `available`, verżjonijiet FFmpeg/ffprobe sanitizzati, u raġuni fissa meta r-runtime ma jkunx disponibbli. L-endpoint intern tal-estrazzjoni mhix API pubblika għall-upload: saturazzjoni tal-kju tirritorna `503` flimkien ma' `Retry-After`, skonnettjar tal-callant jirritorna `499`, u d-deadline fissa tal-broker tirritorna `504`. Risposti konvertiti jżidu `video->text;model=<visionModel>;parts=<videos>` mal-header ċentrali `x-omniroute-modality-bridge` mingħajr ma jneħħu segmenti Vision jew Audio.

### PII Masker (`piiMasker.ts`)

Taħdem fuq **iż-żewġ** stadji.

- **`preCall`** jagħmel klon tal-payload, jgħaddi minn `system`, `messages`, `input` u `prompt` (inkluż elementi li huma strings sempliċi), u japplika `processPII()` (minn `@/shared/utils/inputSanitizer`) fuq kampijiet `content`/`text` ta' tip string. Meta `PII_REDACTION_ENABLED=true`, il-PII skoperta tiġi immaskata fil-payload li ħiereġ. Dan huwa indipendenti minn `INPUT_SANITIZER_MODE` (li jikkontrolla biss il-politika tal-injezzjoni tal-prompt). Meta l-masking tkun mitfija, is-sejħa tirreġistra l-għaddijiet tad-detekzjonijiet mingħajr ma terġa' tikteb il-kontenut.
- **`postCall`** jagħmel deep-clone tar-rispons, imexxi `sanitizePIIResponse()` flimkien mal-masker tal-forma tar-Responses-API (`maskResponsesOutput` — jkopri `output_text` u `output[].content[].text`). Jekk isseħħ xi masking, ir-rispons immodifikat jieħu post l-oriġinal.

Il-guardrail qatt ma jimblokka; jinnnota biss (`meta.detections`, `meta.redacted`) jew jerġa' jikteb.

#### Għażla għal kull tip, mudelli personalizzati u kontaturi tad-detekzjonijiet

**Dashboard → Settings → Security → PII masking** tagħżel _x'jinmaska_. Ma tixgħilx il-masking: dak jibqa' `PII_REDACTION_ENABLED` (request) u `PII_RESPONSE_SANITIZATION` (response + SSE), it-tnejn mitfija b'mod default.

- **Għażla għal kull tip** — l-ids built-in huma elenkati f'`src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Jekk ma jkunx issettjat, dan ifisser kull tip (l-imġieba li kienet hemm qabel ma ġie introdott dan l-issettjar). Il-mudell `ssn_us` tal-magna tar-requests jimmappa għal `ssn`. It-templates (Minimal, Standard, Financial, Brazilian, USA, Full) jimlew biss il-checkboxes fl-UI.
- **Mudelli personalizzati** — sa 20 mudell regex jew wildcard (`*` = sa 64 karattru li mhux whitespace, `?` = wieħed). Il-matches isiru `[CUSTOM_REDACTED]`. Kull mudell jgħaddi minn `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): massimu ta' 500 karattru, flags limitati għal `g i m s u`, irid jikkompilja, irid jgħaddi minn `safe-regex` (backtracking katastrofiku), u ma jistax jaqbel ma' string vojta jew ma' placeholder ta' masking. Mudell li jfalli jiġi rrifjutat meta jiġi ffrankat u meta jiġi ttestjat, u ringiela maħżuna li tfalli tiġi njorata waqt ir-runtime minflok li tiġi kkompilata. Il-mudelli personalizzati jaħdmu biss sakemm il-masking tkun mixgħula.
- **Kontaturi tad-detekzjonijiet** — għaddijiet għal kull tip (qatt ma l-valuri li nqabblu), miżmuma fil-memorja u jiġu resettjati ma' kull restart (`src/lib/pii/piiDetectionStats.ts`). Jiżdiedu biss sakemm il-masking tkun mixgħula.

L-issettjarijiet jinħażnu fit-tabella `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) u jinqraw permezz ta' cache ta' sekonda. API:

| Metodu | Mogħdija                 | Skop                                                                              |
| ------ | ------------------------ | --------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | L-istat tal-flags, `enabledTypes`, `customPatterns`, kontaturi tad-detekzjonijiet |
| `PUT`  | `/api/settings/pii`      | Tissostitwixxi `enabledTypes` (`null` = kollha) u/jew `customPatterns`            |
| `POST` | `/api/settings/pii/test` | Dry-run ta' mudell wieħed fuq kampjun ta' massimu 8 KB; xejn ma jinħażen          |

It-tlieta kollha jeħtieġu awtentikazzjoni ta' ġestjoni (management auth) u jivvalidaw il-body b'Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Injezzjoni tal-Prompt (`promptInjection.ts`)

Jiskopri strutturi avversarjali f'kontenut pprovdut mill-utent u jinfurza l-politika kkonfigurata. L-imġieba hija mmexxija minn varjabbli ambjentali u minn għażliet tal-kostruttur:

| L-issettjar         | Varjabbli ambjentali                                                                                  | Default | Effett                                                                                                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mixgħul             | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Meta `false`, il-guardrail jiġi bypassat (short-circuit).                                                                                                                                                                 |
| Modalità            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Politika tal-injezzjoni: `block`, `warn`, jew `log`. (`redact` huwa aċċettat għal back-compat iżda **ma** jneħħix it-test tal-injezzjoni; il-rewrite tal-PII fir-requests huwa kkontrollat minn `PII_REDACTION_ENABLED`.) |
| Sogla tal-imblukkar | Għażla `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Il-ġravità minima meħtieġa biex timblokka. Medju huwa biss għall-osservazzjoni fil-default.                                                                                                                               |

**Preċedenza tal-modalità** (`getMode`): `options.mode` tal-caller → **override tal-feature-flag mid-DB** għal `INJECTION_GUARD_MODE` (Dashboard → Settings → Feature Flags) → l-env `INJECTION_GUARD_MODE` → l-env `INPUT_SANITIZER_MODE` → `warn`. Override mid-dashboard għalhekk jirbaħ fuq il-varjabbli ambjentali, u għalhekk l-UI tal-Feature Flags jikkontrolla lill-gwardja li qed taħdem live (mingħajr restart). Il-qari mid-DB huwa fail-safe: jekk jagħti żball, il-gwardja terġa' taqa' lura fuq l-imġieba bbażata fuq l-env, u meta ma jkunx hemm l-ebda override issettjat, l-imġieba hija identika għal riżoluzzjoni bbażata biss fuq l-env.

Sorsi tad-detekzjonijiet:

1. `sanitizeRequest()` minn `@/shared/utils/inputSanitizer` (il-sett kondiviż ta' detekturi użat f'postijiet oħra fil-pipeline).
2. `DEFAULT_GUARD_PATTERNS` built-in (bħalissa `system_override_inline` u `markdown_system_block`, it-tnejn b'ġravità `high`).
3. `customPatterns` fakultattivi mgħoddija permezz tal-għażliet tal-kostruttur (strings, regex, jew records `{ name, pattern, severity }`).

Meta `mode === "block"` **u** mill-inqas skoperta waħda tilħaq il-limitu
tal-ġravità, `preCall` jirritorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. F'modi `warn`/`log`, il-guardrail jagħmel log
iżda jippermetti s-sejħa. Il-helper kondiviż `evaluatePromptInjection()` huwa
esportat wkoll għal min jsejjaħ li jeħtieġlu jivvaluta prompts mingħajr ma
jgħaddi mir-reġistru.

**Limitu tal-iskennjar (v3.8.20):** id-dettetur jispezzjona biss l-**ewwel
16 KB** tat-test magħqud tal-prompts — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 bytes) f'`src/shared/utils/inputSanitizer.ts`. Kemm `detectInjection()`
kif ukoll `evaluatePromptInjection()` japplikaw
`slice(0, MAX_INJECTION_SCAN_BYTES)` qabel ma jmexxu l-loop tal-mudelli.
Id-direttivi ta' injezzjoni jinsabu ħdejn il-bidu ta' input, għalhekk dan
jillimita l-użu tal-CPU/GC tar-regex fuq payloads ta' diversi mijiet ta' KB
mingħajr ma jdgħajjef l-iskoperta (ara #3932, #4041).

### Masker tal-Kredenzjali (`credentialMasker.ts`)

Jopera fuq **ż-żewġ** stadji, l-aħħar fil-katina default (prijorità `95`).
Jirredatta mudelli magħrufin ta' API-key / secret-token mill-payload li joħroġ
(kontenut tal-messaġġi, argomenti ta' sejħiet ta' għodod, riżultati ta' għodod)
**u** r-rispons tal-fornitur, sabiex kredenzjal imwaħħal f'prompt (jew mibgħut
lura minn riżultat ta' għodda) ma jittnixxax lejn il-fornitur upstream jew lura
lejn il-klijent.

- **Opt-in biss**, l-istess konvenzjoni bħar-redazzjoni tal-PII (ħdejn
  ir-Regola Stretta #20): huwa diżattivat sakemm
  `settings.credentialRedactionEnabled === true` **jew**
  `CREDENTIAL_REDACTION_ENABLED=true`. Meta jkun mitfi, il-guardrail huwa
  no-op — qatt ma jimblokka u qatt ma jikteb mill-ġdid.
- `redactCredentials()` jgħaddi minn is-siġra sħiħa tal-payload/rispons
  (`walkValue()`, sigur kontra prototype pollution, sigur kontra ċikli permezz
  ta' `WeakSet`) u jissostitwixxi l-partijiet li jaqblu b'placeholder
  `[REDACTED:<type>]`, billi jikklonja biss il-fergħat li verament nbidlu.
- `CREDENTIAL_PATTERNS` jkopri ċwievet ta' fornituri LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ċwievet ta' ħlas (Stripe, Square),
  ċwievet tal-cloud (AWS access key, Twilio, SendGrid, Mailgun), ċwievet
  privati / JWTs, connection strings li jġorru kredenzjali
  (`mongodb://user:pass@...`, eċċ.), u mudell ġeneriku ta' valur ta' header
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Ċwievet b'forma ta' header
  (`authorization`, `x-api-key`, `api-key`, `apikey`) jiġu rredattati
  strutturalment (il-valur biss, u l-prefix tal-iskema bħal `Bearer `/`Basic `
  jinżamm) minflok permezz tar-regex ġeneriku tat-test.
- Il-guardrail qatt ma jimblokka; jikteb mill-ġdid biss (`modifiedPayload` /
  `modifiedResponse`) u jannnota (`meta.credentialsRedacted`, `meta.count`).

Protezzjoni kontra r-regressjoni: `tests/unit/credential-masker-guardrail.test.ts`.

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
