# Guardrails (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Foinse na fírinne:** `src/lib/guardrails/`
> **Nuashonraithe go deireanach:** 2026-10-17 — v3.8.52 (cuireadh [Clúdach agus teorainneacha](#coverage-and-limits) leis:
> na bealaí agus na cosáin fhreagartha a shroicheann na hooks, na ceanntásca díchumasaigh chumaisc (#16412), an mód
> blocála insteallta mar theorainn éigeantach (#16413), agus cad a fheiceann freagra roimh an iarghlao)

Cuireann guardrails sábháilteacht, polasaí, agus claochluithe ábhair i bhfeidhm ag an teorainn
idir OmniRoute agus soláthraithe suas an tsrutha. Is féidir le gach guardrail iniúchadh a dhéanamh
ar ualaigh iarratais (`preCall`) agus ar fhreagraí suas an tsrutha (`postCall`) — agus iad a dhiúltú,
a chlaochlú, nó a anótáil go roghnach.

Tá an córas **fail-open**: má chaithfidh guardrail earráid le linn rite, taifeadann an clárlann
an earráid agus leanann sé ar aghaidh leis an gcéad guardrail eile seachas teip ar an iarratas.
Is cinneadh sainráite í an bhlocáil (`block: true`), ní taisme í riamh.
Is é an t-aon eisceacht ná iarratas tochscartha: nuair a thochtscarftar `signal` an ghláiteora,
diúltaíonn guardrail a chaithfidh earráid an rith hook in ionad a bheith scipthe.

**Ní** ritear na hooks ar gach bealach ná ar gach freagra. Léigh
[Clúdach agus teorainneacha](#coverage-and-limits) sula gcuirfidh tú muinín i guardrail mar
rialú slándála.

## Ráillí Garda Insuite

Déanann an chlárlann sé cinn de ráillí cosanta a lódáil go huathoibríoch in ord tosaíochta ar iompórtáil (féach `registry.ts` → `registerDefaultGuardrails()`):

| Tosaíocht | Ainm                | Céim(eanna)    | Comhad                |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ritheann uimhreacha tosaíochta níos ísle** ar dtús** .

### Droichead Fís (`visionBridge.ts`) — Módúlacht Droichead PR-1

Tá meiteashonraí sainráite `supportsVision:false` registry/spec ag múnla bonn GLM 5.3 agus `glm-5.3-{low,high,max}`. Is samhlacha fís-dhúchais iad na leaganacha GLM 5.3 Flash. Téann bealach `/v1/messages` Cód Claude isteach sa slabhra ráillí cosanta réamhghlao `handleChat` roinnte** roimhe** aistriúchán Claude-go-OpenAI; ní mór cur síos a dhéanamh ar na híomhánna neadaithe `Read` tool-toraidh nó iad a láimhseáil sula n-ardóidh an t-aistriúchán sin go hábhar OpenAI `image_url` (#17069).

Idircheapann iarratais a bhfuil íomhá dírithe orthu** samhlacha gan fís** agus déanann sé an t-iarratas iomlán a athródú chuig samhail atá in ann fís nó cuireann sé tuairiscí téacs in ionad na gcodanna íomhá arna dtáirgeadh ag samhail fís inchumraithe roimh an nglao réamhtheachtacha. Ligeann sé seo do sholáthraithe téacs-amháin ualaí pálasta ilmhódacha a láimhseáil go trédhearcach.

Sreabhadh:

1. Léim amach má thacaíonn an tsamhail sprice le fís cheana féin (mura bhfuil sé le feiceáil ar an liosta droichead éigeantaigh `isVisionBridgeForcedModel`).
2. Sliocht codanna íomhá trí `extractImageParts(messages)` (`visionBridgeHelpers.ts`), a tharmligean chuig an** brathadóir meáin aontaithe** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — an fhoinse fhírinne amháin a roinntear leis an scagaire comhoiriúnachta teaglama. Tá eastóscadh ceadaithe do na cruthanna is féidir `replaceImageParts` splice ar ais (an sliocht ↔ ionad conradh): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, agus Freagraí API `input_image`. Baintear íomhánna meaitseála neadaithe laistigh de Claude Code `tool_result.content` agus aschuir uirlisí Freagraí freisin agus cuirtear in ionad iad ag a mbunchosáin; is ábhar teaglama-scagaire iad cruthanna táscaire amháin agus ní bhaintear iad. Léim mura bhfuarthas aon cheann.
3. Réitigh cumraíocht ama rite trí `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): buaigh eochracha nua socruithe `modalityBridge*` ; Fanann eochracha oidhreacht `visionBridge*` a** aischur aon-timthriall** (fuinneog rolladh siar). Scipeáil roimh aon trasnú meán nuair atá an droichead díchumasaithe.
4. Cinneann roghnóir mód (`modalityBridgeVisionMode`, féach an tábla thíos) athród vs cur síos. Filleann Reroute `modifiedPayload` gan ach `model` a mhalartú, móide meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Déan cur síos ar an gcosán: cuir caipín ar íomhánna ag `maxImages`, cum an leid atá feasach ar an tasc, féach ar an taisce déan cur síos, cuir glaoch ar an tsamhail fís** i gcomhthreo** (`Promise.allSettled`), agus instealladh páirteanna téacs `[Image N]: <description>` ina n-áit. Níor éirigh le cur síos ar thorthaí `null`: caomhnaítear an íomhá amh le haghaidh spriocanna unknown/vision-capable (#4012) , ach a** sprioc dhíreach téacs-amháin deimhnithe** nó faigheann teaglama fís nialasach stub téacs `(unavailable — no vision-capable provider connected)` sainráite do gach íomhá neamhthuairiscithe, lena n-áirítear teipeanna páirteacha agus íomhánna thar an caipín tuairisc-ghlao (#17069). Déanann an teaglama uile-theip atá ann faoi láthair cur síos ar chúltaca fós i bhfeidhm (#8430).
6. Fill ar `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Roghnóir mód (`modalityBridgeVisionMode`)

| Mód        | Réamhshocrú | Iompar                                                                                                                                                                                                                                                                                                  |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Oidhreacht heorastúla, gan teagmháil (#6640/#7204): déanann samhlacha neamh-chomhcheangail/`auto/` athródú chuig an tsamhail fís is fearr mura bhfuil dintiúir inúsáidte ag an múnla bunaidh cheana féin (cuir síos ansin); spriocanna teaglama cur síos i gcónaí.                                      |
| `describe` |             | Déan cur síos i gcónaí ar — déantar an bloc athródaithe go hiomlán; freagraíonn múnla roghnaithe an úsáideora i gcónaí.                                                                                                                                                                                 |
| `reroute`  |             | Athródú fórsa: seachnaítear an garda samhla coinnithe creidiúnaithe. An athród-** sprioc** Tá feidhm fós ag garda inchreidte — nuair nach bhfuil aon sprioc radhairc inúsáidte ann, blocann an droichead le hearráid shoiléir seachas íomhánna amh a chur síos nó a sheoladh chuig sprioc téacs amháin. |

Modhanna éigeantacha gearrchiorcad** roimhe** ritheann an heuristic uathoibríoch; tá iompar `auto` comhionann leis an ráille cosanta pre-PR-1.

#### Scóip eochair API (`visionBridgeKeyScope.ts`)

Nuair a chuireann eochair API an ghlaoiteora srian le `allowedConnections`, linnte cuóta (`allowedQuotas`) nó samhlacha (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), ní roghnaíonn an droichead ach athródú agus déanann sé cur síos ar mhúnlaí a fhéadfaidh an eochair a úsáid, ar naisc a fhéadfaidh an eochair a úsáid. Ansin téann an glao cur síos i gcónaí tríd an féin-lúb OmniRoute leis an gceanntásc `x-omniroute-self-loop-key-id`, agus mar sin cuireann an t-iarratas ar chomhrá glactha an eochair bheartas nasctha agus múnla sin i bhfeidhm arís. Tugann `enforceApiKeyPolicy()` onóir don cheanntásc sin agus don iompróir féinlúb amháin, mar sin ní féidir leis ach rochtain a chaolú, agus diúltaítear d’aitheantas nach réitíonn.

Mura gceadaítear samhail fhíse don eochair, a** sprioc dheimhnithe téacs-amháin** diúltú don iarratas íomhá go háitiúil le HTTP 400 soiléir in ionad beart íomhá a chur ar aghaidh chuig sruth éagumasach (#17069). Maidir le spriocanna a bhfuil cumas radhairc anaithnid nó dúchasach acu, coinníonn an cosán cur síos ar a iompar teip-oscailte roimhe seo (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Iompraíonn iarratais gan eochair, agus eochracha gan na srianta seo, díreach mar a bhí roimhe seo.

#### Déan cur síos ar leid atá feasach ar thasc (`modalityBridgeVisionTaskAware`)

Réamhshocrú** fíor** . Cuireann `composeVisionPrompt()` (`visionBridgeHelpers.ts`) téacs an** teachtaireacht úsáideora deiridh** (teasctha go 500 carn) go dtí an bonn déan cur síos go pras, ag stiúradh an tuairisc i dtreo an rud a d'iarr an t-úsáideoir i ndáiríre (patrún codex-fís-seachfhreastalaí) agus ag iarraidh ar an tsamhail fhíse téacs infheicthe a thrascríobh. Agus an bhratach as — nó gan aon théacs úsáideora — úsáidtear an bonnlead gan athrú.

Iarrann an tuairisc féin-lúb féin OpenAI-comhoiriúnach iarratas (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) i gcónaí `image_url.detail: "high"` — gan choinníoll, le haghaidh gach caller/provider, nach bhfuil gated ar aon chomhartha cliant. Déanann sampláil mionsonrach díghrádú ar chruinneas OCR don tasc trascríobh téacs go díreach a iarrann an leid seo, agus mar sin iarrann an glao tuairiscí féin mionsonrú i gcónaí is cuma cén leibhéal sonraí a úsáideadh sa bhuniarratas isteach. Ní dhéanann sé seo ach difear don chomhlacht iarratais tuairisce inmheánach; ní athraíonn sé conas a chuireann OmniRoute `image_url.detail` an ghlaoiteora ar aghaidh ar an bpríomhiarratas — go gcuirtear an réamhshocrú i bhfeidhm ar leithligh, agus do chliaint OpenCode braite amháin, i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Níl aon réimse `detail` ag brainse formáid sreang Anthropic den fhéinlúb tuairiscigh agus ní chuireann ceachtar den dá réamhshocrú isteach air.

#### Déan cur síos ar chaipín aschuir (`modalityBridgeVisionMaxChars`)

| eochair                        | Réamhshocrú | Raon             |
| ------------------------------ | ----------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` nó 100-50000 |

ciallaíonn `0` (réamhshocraithe).** gan caipín** — cuirtear an tuairisc ar ais ag `callVisionModel()` ar aghaidh gan mhodhnú, ag caomhnú an iompair atá ann cheana féin. Gearradh luach ar bith sa raon 100–50000 an tuairisc le iarmhír `…` sula ndéantar é a spliceáil siar mar `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`). Ardaigh é seo le haghaidh tascanna OCR sonraí-trom nuair a bhíonn an tras-scríobh iomlán ag teastáil ón tsamhail iartheachtach; é a ísliú go dtí úsáid chomharthaí faoi cheangal ar shamhlacha fís chatty. Tá an réimse painéal ina chónaí ar phainéal Advanced an chluaisín Fís (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) agus teannann sé aon luach idir 1 agus 99 suas go dtí an t-urlár 100 agus é ag fágáil `0` sainráite gan teagmháil — Is luach Zod bailí ann féin é `0` (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ní hamháin an réamhshocrú "neamhshocraithe".

#### Déan cur síos ar taisce (`modalityBridge/bridgeCache.ts`)

Taisce i gcuimhne LRU + TTL chun cur síos a dhéanamh ar aschuir, roinnte ar fud an phróisis. Eochair = `sha256(imageRef + composedPrompt + configuredBridgeModel)` le frámaíocht réimír faid (gan imbhuailtí teorann páirce). Is é an comhpháirt múnla an** cumraithe** samhail droichid, ní an tsamhail a d'fhreagair go hiarbhír — `callVisionModel` b'fhéidir go dtitfeadh sé siar go hinmheánach, agus scoilteodh an eochair in aghaidh na hiarrachta an taisce. Ní chuirtear tuairiscí ar theip orthu riamh i dtaisce. Socruithe:

| eochair                         | Réamhshocrú | Raon    |
| ------------------------------- | ----------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`      | —       |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000 |

#### normalú íomhá cianda (féin-lúb describe/base64 )

Nuair a fhaigheann an droichead a** iargúlta** íomhá féin — an Anthropic cur síos ar fhéinghlao agus ar an chomhshó claude-wire-format base64 (`ensureBase64ImagesForClaudeWire`), araon trí `fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — na sonraí a eascraíonn as URI a chur trí `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) sula leabaithe san iarratas fís-samhail. Laghdaítear íomhánna rómhóra go dtí a** 2048px ciumhais fhada** (ag teacht leis an gcaipín athmhéadaigh OpenAI/Anthropic atá i bhfeidhm cheana féin ar thaobh an fhreastalaí), a ghearrann uaslódáil bytes/latency gan athrú ar an méid a fheiceann an tsamhail fhíse. Úsáideann athrú méid `sharp`, lódáilte trí allmhairiú dinimiciúil: ar ardán a dteipeann ar a dhénártha dúchais a luchtú, `normalizeDataUri()`** riamh throws** — titeann sé ar ais go dtí pasthrough de na bearta bunaidh, mar sin coinníonn an cosán describe/base64-conversion ag obair i gcónaí. Cuirtear bearta neamhíomhá (beir nár thug íomhá díchódaithe ar ais) tríd freisin gan teagmháil. Déantar an normalú seo a scóip le híomhánna a fhaigheann an droichead as a — féinghlao féin ní chuirtear i bhfeidhm riamh é ar pháil-ualach pastrí amh an ghlaoiteora, i gcomhréir leis an bprionsabal sóchán rogha an diúltaithe ( Hard Riail #20).

#### Scéimre socruithe + imirce

Déantar na heochracha nua `modalityBridge*` a bhailíochtú i `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, an tríréad `modalityBridgeCache*`, agus an grúpa `modalityBridgeAudio*` a úsáideann an Droichead Fuaime . Déanann Imirce `141_modality_bridge_settings.sql` cóipeanna de luachanna `visionBridge*` oidhreachta atá ann cheana féin chuig na heochracha nua meaitseála (díomách, ní fhorscríobhtar luach `modalityBridge*` atá leagtha síos don oibreoir); Glactar leis na heochracha oidhreachta mar chúltaca léite le haghaidh timthriall scaoilte amháin.

#### Ceanntásc trédhearcachta + stats

Tá `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` ar fhreagraí cur síos-chlaochlaithe (tógtha ag `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`, stampáilte ag `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`). Faightear iarratais athródaithe** níl** header — níor baineadh an pálasta leis agus tá an babhtáil mhúnla le feiceáil cheana féin i réimse `model` an chomhlachta freagartha.

Tugann `GET /api/modality-bridge/stats` (údar bainistíochta, sraith chéanna le `GET /api/settings`) na cuntair in-chuimhne in aghaidh na módúlachta `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` ar ais do `vision`, `audio`, agus `video`. úsáideann `averageLatencyMs` `latencySamples`, ní gach iarracht, mar ainmneoir; ní dhéanann oibríocht gan uainiú sampla náid-milleasoicind. tá `bridged` fós mar an ailias atá comhoiriúnach ar gcúl le haghaidh tiontuithe rathúla; ní mhéadaíonn iarrachtaí teipthe é. Athshocraíonn na háiritheoirí agus an próiseas á atosú trí dhearadh (teiliméadracht, ní chuntasaíocht).

#### Cumraíocht an phainéil

Is é `/dashboard/settings/modality-bridge` leathanach an deais tiomnaithe . Caomhnaíonn a chuid cluaisíní URL-seoladh `Vision`, `Audio`, agus `Video` paraiméadair fiosrúcháin agus an luach `tab` á athrú. Nochtann an cluaisín Vision cumasú, modh, roghnú múnla (lena n-áirítear an réamhshocrú uathoibríoch), leideanna feasach ar thasc, ardteorainneacha timeout/image/description-length/cache, cuntair am rite, agus iarratas cosanta ar shampla. Tá an cluaisín Fuaime beo freisin: nochtar cumasú, roghnóir múnla STT amháin le Auto, teorainneacha timeout/max-clip, cuntair fuaime, agus tástáil shamplach `input_audio`. Tá an cluaisín Físe feidhmiúil: tuairiscíonn sé staid ama rite FFmpeg/ffprobe — ar cheann de cheithre stát UI follasach (`unknown` agus an taiscéalaí ag eitilt nó nach bhféadfadh sé a bheith críochnaithe, `restricted` ar óstach neamh-lúbtha ar an deais ina ndéantar an taiscéalaí a scipeáil ó thaobh an chliaint, `unavailable` uair a scrúdaíodh agus deimhnithe ar iarraidh, nó `available` leis na leaganacha FFmpeg/ffprobe ) — fós ag baint leis na samhlacha is féidir a fheiceáil agus enable/model/frame/video/timeout shamhail scagairí. cuntair.

Is nasc comhoiriúnachta chuig an leathanach nua é an iar-chárta Vision Bridge faoi shocruithe AI ; níl an dara cóip den fhoirm ina húinéir aige a thuilleadh. Nascann Soláthraithe Meán freisin sreabhadh oibre Íomhá-go-Téacs agus Urlabhra-go-Téacs leis na cluaisíní Droichead Módúlachta comhfhreagracha gan an clós súgartha Urlabhra-go-Téacs atá ann cheana a bhaint.

**Seachbhóthar iontrála féin-lúb:** nuair a dhéanann an cur síos ar bhealaí glaonna trí OmniRoute féin-lúb `/v1` féin (múnla soláthraí neamh-chaighdeánach), cuireann an fo-iarratas `x-omniroute-admission-bypass: internal` agus tá sé fíordheimhnithe leis an inchreidte féin-lúb réitithe — an sentinel `sk_omniroute` áitiúil i mód áitiúil, nó an t-oibreoir-chumraithe `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env eochair (#1350) ionas gur féidir leis an imscaradh `REQUIRE_API_KEY=true` fós a reáchtáil. Ní thugtar onóir don seachbhóthar ach amháin do na dintiúir chruinne sin, mar sin ní féidir le cliaint sheachtracha an ceanntásc a úsáid chun ligean isteach a scoitheadh.

Maireann mainneachtainí oidhreachta in `src/shared/constants/visionBridgeDefaults.ts`; tá na mainneachtainí nua mode/task-aware/cache agus an réititheoir socruithe beo i `src/shared/constants/modalityBridgeDefaults.ts`. Nochtann an ráille cosanta rogha cruthaitheoir `deps` ionas gur féidir le tástálacha cur i bhfeidhm falsa `getSettings` agus `callVisionModel` a instealladh.

### Droichead Fuaime (`audioBridge.ts`) — Módúlacht Droichead PR-3

Idircheapann sé iarratais chomhrá fuaime sula sroicheann siad sprioc nach eol glacadh le hionchur fuaime. Ní athródaíonn sé an t-iarratas comhrá riamh: déantar páirteanna fuaime a thrascríobh tríd an gcríochphointe ilpháirteach atá comhoiriúnach le OpenAI atá ann cheana féin agus leanann an tsamhail chomhrá roghnaithe le tras-scríbhinní téacs.

Sreabhadh:

1. Réitigh `supportsAudio` trí `getResolvedModelCapabilities()`. Bhuaigh meiteashonraí sainráite soláthraí-clárlainne, ansin meiteashonraí samhlacha statacha, ansin sioncronaithe `modalities_input`. Is é `false` liosta dearbhaithe ionchuir gan `audio` ; níl aon fhianaise cumais fós `null`. Gníomhaíonn `false` agus `null` an droichead coimeádach, agus seachnaíonn `true` é.
2. Réitigh socruithe `modalityBridgeAudio*` agus bain páirteanna fuaime barrleibhéil spliceable ó gach teachtaireacht tríd an brathadóir `detectMediaParts()` roinnte. Is iad na cruthanna sreang tacaithe ná OpenAI `input_audio`, `audio_url`, agus `source.media_type: "audio/*"`. Braitear fuaim neadaithe le haghaidh ródú ach ní bhaintear í ag an gcosán splice. Cuirtear teorainn le `modalityBridgeAudioMaxClips` ar an obair; fanann codanna níos déanaí gan teagmháil.
3. Tabhair onóir do `provider/model` cumraithe , nó lig `selectAudioBridgeModel()` siúl `AUDIO_TRANSCRIPTION_PROVIDERS` in ord catalóige cobhsaí agus roghnaigh an chéad mhúnla le dintiúir soláthraí gníomhach inúsáidte.
4. Tiontaíonn `callAudioTranscription()` base64/data-URI fuaime go `file` ilpháirteach, nó íoslódálann sé `audio_url` iargúlta tríd an ngarda amach poiblí amháin le feannadh DNS agus 25 MB faoi cheangal. Ansin POSTs an comhad agus an tsamhail roghnaithe chuig an féin-lúb `/v1/audio/transcriptions` áitiúil, fíordheimhnithe le `resolveSelfLoopBearer()`. Déanann an bealach trascríobh reatha gnáthchuardach dintiúir, láimhseáil cooldown/rate-limit, agus seoladh soláthraí.
5. Cuireann glaonna rathúla `[Audio N]: <transcript>` in ionad a gcuid páirteanna . Ritheann glaonna le `Promise.allSettled`: caomhnaíonn teip aonair an bhunchuid fuaime sin (conradh #4012 ). Má theipeann ar gach glao agus go bhfuil an sprioc cruthaithe `supportsAudio === false`, déantar na codanna a bheith `[Audio N]: (unavailable — no STT provider connected)` ( conradh #8430 ). Maidir le sprioc anaithnid (`null`), fanann toradh uile-teip gan teagmháil. Faigheann sprioc chruthaithe téacs-amháin gan aon fhaisnéis inúsáidte STT an stub follasach chéanna gan glao líonra a eisiúint.

Úsáideann tras-scríbhinní rathúla an taisce Modality Bridge LRU/TTL ar fud an phróisis. Comhcheanglaíonn an eochair an tagairt fuaime, an lipéad oibríochta cobhsaí `audio-transcription`, agus múnla roghnaithe STT ; ní dhéantar teipeanna a thaisceadh riamh. Nuashonraíonn iarrachtaí fuaime na cuntair roinnte `bridged`, `cacheHits`, `failures`, agus `lastUsedAt`. Tá `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ag gabháil le freagraí trasfhoirmithe; ní fhaigheann iarratais gan teagmháil deighleog Droichead Fuaime.

Tá socruithe am rite tacaithe ag DB agus bailíochtaithe le Zod:

| eochair                       | Réamhshocrú | Raon           |
| ----------------------------- | ----------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —              |
| `modalityBridgeAudioModel`    | `""`        | Auto nó STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10           |

Tá an taisce roinnte fós faoi rialú `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, agus `modalityBridgeCacheMaxEntries`.

### Droichead Físeáin (`videoBridge.ts`, `videoBridgePipeline.ts`)

Idircheapann sé páirteanna físeán barrleibhéil i Críochnú Comhrá `messages` agus Freagraí API `input` sula dtugtar sprioc gan tacaíocht físe dúchais aitheanta. Is iad na cruthanna tacaithe ná `input_video`, `video_url`, `video_source`, HTTPS URLs, agus `data:video/*;base64,...` data URIs. Ní láimhseáiltear gnáthainmneacha i dtéacs mar fhíseán.

Is leis `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) trasnú iarratais, an tseiceáil capability/policy, comhiomlánú in aghaidh an iarratais, agus an pálasta freagartha. Per-físeán obair — fháil, an taisce lán-toraidh, ag cur síos ar seicheamh fráma (a chomhdhéanann aon athscríbhinn fuaime glaoiteoir-dearbhaithe), agus in aghaidh an iarracht metrics/abort/cleanup — i bhfolach taobh thiar `processVideoPart` i `videoBridgePipeline.ts`, ar a dtugtar uair amháin in aghaidh an chuid físeáin taobh istigh lúb `preCall` ar. Sainítear sa mhodúl sin freisin na teorainneacha follasacha poirt `VideoMediaBrokerPort` (beart a fháil agus frámaí samplacha a bhaint amach), `VideoAudioTranscriptionPort` (tras-scríbhinn fuaime dearbhaithe ag an nglaoiteoir a chomhleá leis na fotheidil sampláilte), agus `VideoDrilldownPort` (an cruth oidhreachta amh-stórála). Tá táirgeadh STT agus coinneáil fráma comhdhéanta timpeall an chalafoirt cur síos trí `createVideoSttAdapter` agus `createVideoDrilldownAdapter`; úsáideann an dara ceann an saolré comhroinnte láimhseála teimhneach.

Ní iompórtálann conair iarratais `/v1` poiblí ná ní dhéanann sé fophróiseas a agairt. Déantar físeáin iargúlta a íoslódáil faoi cheangal 50 MiB ; tá caipín coimeádach 36 MiB díchódaithe in aghaidh an fhíseáin ag físeáin inlíne base64 ionas gur féidir leis an gclúdach model/messages/framing fanacht taobh istigh den teorainn iontrála iarratais poiblí JSON de 50 MiB. Seiceáiltear meastacháin ar fhad inlíne agus ar mhéid díchódaithe roimh leithroinnt. Tá HTTPS ag teastáil ar an URL cianda tosaigh agus gach atreorú, ag baint úsáide as an ngarda amach poiblí amháin atá ann cheana féin le feannadh DNS. Trasnaíonn na bearta ansin teorainn chruinn an bhróicéir `POST /api/modality-bridge/video/extract` inmheánach. Is é an bealach sin `LOCAL_ONLY` agus `SPAWN_CAPABLE` araon, ní ghlacann sé ach le hiarratas fíordheimhnithe in aghaidh an phróisis, a bhfuil muinín as a ais, agus ní ghlacann sé riamh le URL, conair chórais comhaid, inrite nó liosta argóinte. Déanann píblíne méid comhlacht API agus léitheoir comhlacht incriminteach an láimhseálaí caipín ionchuir bróicéir 50 MiB a fhorfheidhmiú go neamhspleách. Ritheann a scuaine teorann eastóscadh amháin ag an am, ceadaíonn sé ceithre phost ar feitheamh, agus caipíní ar feitheamh ionchur ag 100 MiB.

Taobh istigh den bhróicéir, léann `ffprobe` comhad áitiúil príobháideach; ní áirítear seinmliosta agus formáidí follasacha sa cheadliosta formáide seasta. Maidir le coimeádáin MOV-teaghlaigh ceadaithe, fanann tagairtí sonraí seachtracha MOV díchumasaithe de réir réamhshocraithe, agus ní roghnaíonn an t-ordú seasta iad. Úsáideann an dá `ffprobe` agus `ffmpeg` an liosta bán prótacal `file` -only, snáithe amháin, eagair argóintí seasta, gan aon bhlaosc, agus inrite a réiteach ó `PATH`. Ní iarrthóirí is féidir a imirt ar shruthanna clúdaigh pictiúr faoi iamh. Ní mór do gach sruth is féidir a sheinm na teorainneacha a shásamh, agus is fearr sruth réamhshocraithe sainráite roimh an aisíocaíocht cinntitheach is ísle. Tá físeáin teoranta do 600 soicind, 8,192 picteilín in aghaidh an toise, agus 33,554,432 picteilín foinse. samplaí FFmpeg 1-16 lárphointe frámaí JPEG, scálaí síos an imeall fada go 1,024 picteilín ar a mhéad gan ionchuir níos lú a ardú, agus ní fhaigheann URL. Is `uniform` é an sampláil de réir réamhshocraithe. Comhlíonann na beartais roghnacha `scene_aware` agus `segment_aware` turgnamhacha pas seasta FFmpeg amháin breise thar an sruth áitiúil atá bailíochtaithe cheana féin, roghnaigh stampaí ama radhairc `showinfo` teorannaithe, agus titim siar go cinntitheach go dtí na lárphointí aonfhoirmeacha céanna maidir le teip braite, teorainn ama, aschur míchumtha, nó sraith iarrthóirí folamh. Leithdháileann mód feasach ar dheighleog samplaí lárphointe go comhréireach leis na tréimhsí radhairc bailíochtaithe; Sonraítear thíos fianaise atá feasach ar an deighleog agus iompar cúltaca. Cuirtear an caipín crua 16-fhráma i bhfeidhm tar éis an roghnúcháin i ngach polasaí. Nuair nach bhfuil ach buiséad aonfhráma ag iarratas a fheasach don radharc, úsáideann sé lárphointe aonfhoirmeach na fuinneoige lánfhíse nó na fuinneoige fócais gníomhach agus tuairiscíonn sé `policyEffective: uniform`: ní féidir le fráma radhairc amháin roghnaithe an dá chríoch ama a chaomhnú. Féadfaidh glaoiteoir fuinneog fócais chríochnaithe a sholáthar go roghnach (`start`/`end` soicind); déantar teorainneacha a chlampáil go fad na meán, diúltaítear d'fhuinneoga droim ar ais nó fuinneoga neamhchríochnaithe, agus ní dhéantar gach beartas samplála ach amháin laistigh den eatramh normalaithe. Tá an fhuinneog mar thoradh air seo san áireamh i meiteashonraí samplála agus sa réimír tuairisce neamhiontaofa ionas gur féidir le samhlacha iartheachtacha sliocht dírithe a idirdhealú ón amlíne iomlán.

Is suíomh follasach ar leith é fócas fotheideal shéimeantach. Coimeádann an modh réamhshocraithe anailíse `full` an leid fráma atá ann faoi láthair agus ní chuireann sé téacs iarratais ar aghaidh chuig an tsamhail fotheideal. I mód `focused`, ní léann an droichead ach an `text`/`input_text` údar neamhfholamh is déanaí ón gcoimeádán Comhrá nó Freagraí céanna, normalaíonn sé go NFC, laghdaítear carachtair rialaithe agus spás bán, agus cuireann sé teorainn le 500 cód cód Unicode é. Titeann toradh folamh ar ais go dtí an leid cruinn `full`. Cuirtear leid inúsáidte sraitheach mar JSON i mbloc tiomnaithe comhthéacs úsáideora neamhiontaofa agus ní fhéadfaidh sé ach sonraí inbhraite a chur in ord tosaíochta; ní féidir leis an rabhadh ar leith a shárú i gcoinne treoracha a leanúint atá infheicthe nó inchloiste sna meáin. Ní bhaineann fócas téacsúil go deo `start`/`end` ná ní athraíonn sé an samplóir ama.

#### FU-07 fianaise deighleog struchtúrach

Úsáideann `segment_aware` pas réamh-anailís teoranta amháin thar an sruth físeáin áitiúil atá bailíochtaithe cheana féin. Scálaíonn an slabhra seasta scagaire go 320 picteilín ar a mhéad ar leithead ar a mhéad, braiteann sé athruithe radharc agus eatraimh reoite, ansin samplaí ag fráma 1 in aghaidh an tsoicind le haghaidh faisnéise doiléir, meánúma agus spatial/temporal. Tá an pas teoranta do 600 sampla struchtúrach, snáithe amháin FFmpeg/filter, an prótacal `file` -only céanna agus cead liostaí coimeádán, aschur próiseas 1 MiB faoi cheangal, agus ar a mhéad 30 soicind taobh istigh de abort/deadline. roinnte an bhróicéir Ní ghlacann sé ordú, scagaire, cosán, nó URL ón iarratas.

Fianaise samplála cinntitheach atá sna luachanna struchtúracha, ní físthuiscint shéimeantach. Ní dhéanann siad tátal a bhaint as ábhair, gníomhartha, fotheidil, urlabhra nó rún úsáideora. Déanann teorainneacha radhairc agus reo codanna; Ní bhíonn tionchar ag clúdach reo, doiléire, nochta, sonraí spáis, agus athrú ama ach ar an gcaoi a leithdháiltear an creatbhuiséad 1-16 atá ann cheana féin. Cuirtear teorainn ar fhráma amháin ar mhír lán-reoite, agus bíonn teascáin neamhreoite san iomaíocht don bhuiséad atá fágtha. Nuair a bhíonn teorainneacha níos mó ná frámaí, coinnítear clúdach aonfhoirmeach amlíne ionas nach féidir le ciorruithe tapa tapa deighleog fhada rianaithe a cheilt. Comhcheanglaítear teorainneacha radhairc laistigh den taifeach anailíse 1 soicind ar theorainn reo.

Teipeann ar scagairí ar iarraidh, fianaise malformed/empty, earráid brathadóireachta, nó an teorainn ama réamh-anailísithe ar oscailt don bheartas lárphointe aonfhoirmeach cruinn. Ní theipeann ar ghinmhilleadh glaoiteoir nó spriocdháta bróicéir a oscailt: cuireann sé deireadh leis an bhfophróiseas in-eitilte, cuireann sé cosc ar eastóscadh fráma níos déanaí, agus baintear an crann sealadach príobháideach i `finally`.

Gineann `scripts/perf/video-bridge-fu07-eval.ts` daingneáin FFmpeg fíor-chinntitheacha le haghaidh coigilteas iar-dedup fortheideal-ghlao, leithdháileadh buiséid dlúth-tairiscint, fianaise blur/exposure/SI-TI, ciorruithe tapa le heireaball fada, agus dearfacha bréagacha céimnithe de réir a chéile. Taifeadann sé am balla réamh-anailísithe agus, áit a bhfuil `/usr/bin/time` ar fáil, leanbh CPU agus buaic RSS. Is oracles struchtúracha amháin a seiceálacha cáilíochta. Tá fíor-chaighdeán múnla fotheideal fós `HOLD` mar níl aon chríochphointe údaraithe nó breitheamh reoite ag an úim seo. Fanann coigilteas airgeadaíochta `HOLD` freisin mura soláthraíonn `--caption-cost-per-call-usd` meastachán dearfach follasach in aghaidh an ghlao; ní dhéanann an script ceachtar toradh.

Tá gach fráma teoranta do 4 MiB, gach fráma amh le chéile go 23 MiB, agus freagra sraitheach an bhróicéir go 32 MiB. Baintear eolaire sealadach príobháideach in `finally`. Ní bhunaíonn OmniRoute FFmpeg agus ní ghlacann sé le cosán inrite saincheaptha. Sula ndéantar fortheidealú, cuireann an droichead pas dídhúthaithe amhairc coimeádach i bhfeidhm: laghdaítear gach JPEG go maolán liathscála 16 × 16 agus ní dhéantar é a chur i gcomparáid ach leis an bhfráma deiridh a coinníodh. Maidir le buiséad fortheideal iarrtha os cionn fráma amháin, soláthraíonn eastóscadh comhthiomsú iarrthóirí teorannaithe suas le dhá oiread an bhuiséid sin agus nach mó ná 16 fhráma ar bith. Ní chuirtear an teorainn iarrtha i bhfeidhm ach amháin tar éis dí-dhúbailt, agus caomhnaítear an chéad iarrthóir agus an ceann deireanach a roghnófar le linn an tanaithe deiridh nuair is dhá cheann ar a laghad an buiséad. Úsáideann an polasaí `grayscale-16x16-mean-cells-v2` versioned an ceann is mó de luma deilt meánach agus an cóimheas idir na cealla mionsamhlacha a bhfuil a deilte normalaithe ar a laghad 0.05. Is é an tairseach dúblach an tairiseach 0.04, a roghnaíodh le haghaidh intuarthachta seachas a bheith nochta mar shocrú am rite. Caomhnaíonn an comhartha ardchodarsnachta tánaisteach seo gluaisne bhig agus athruithe infheicthe téacs ar féidir le comparáid meánach amháin a cheilt. Teipeann ar earráidí comparáide nó díchódóra oscailte agus coinnítear clúdach. Scarann meiteashonraí aschuir iarrthóirí a bhaintear, frámaí a n-úsáidtear go rathúil, agus laghdaítear dúblaigh amhairc.

Féadfaidh cuid den fhís atá marcáilte go sainráite bileog teagmhála le stampa ama a iarraidh. Tógann an droichead greille 4-cholún, 16-fhráma JPEG ar a mhéad. Dóitear gach cill 512-picteilín a stampa ama foinse isteach i mbanda bun ardchodarsnachta, agus fanann na stampaí ama céanna i meiteashonraí téacsúla le haghaidh comhlachais agus iniúchta iartheachtacha. Tá teorainn de 32 MiB fós ar an JPEG iomlán. Mura féidir le `sharp` an eangach a dhíchódú nó a chumadh, titeann an droichead ar ais go dtí na frámaí aonair JPEG ; scoirfidh cliant fós tríd an oibríocht leatháin.

Tá an fhianaise ar chur chun cinn scartha d’aon ghnó ón micrea-thagarmharc maidir le comhdhéanamh sintéiseach. sainmhíníonn `scripts/perf/video-bridge-contact-sheet-eval.ts` úim A/B le leagan scéimre le haghaidh samhlacha fís fíor-OpenAI-comhoiriúnach. Tomhaiseann sé comharthaí arna dtuairisciú ag soláthraithe, foighne balla ceann go ceann (lena n-áirítear comhdhéanamh leatháin), comhaireamh na nglaonna samhail, agus coinneáil fíricí sainshainithe. Ní scríobhtar freagraí eiseamláireacha ar an tuairisc; ní choinnítear ach achoimrí SHA-256 agus fíricí comhoiriúnaithe IDs. Ní dhéanann an leas a bhaint as líonra nó glao samhail íoctha mura rud é go bhfuil `--execute-real` rite agus `--model`, `OMNIROUTE_BASE_URL`, agus `OMNIROUTE_API_KEY` cumraithe. Gan an fíor-rith follasach sin, fanann a fhíorasc inléite ag meaisín `HOLD`; ní fianaise ar chur chun cinn iad tomhais shintéiseacha payload/call-count amháin.

ídíonn an `scripts/perf/video-bridge-promotion-eval.ts` ar leith tuairimí FU-07 nó FU-09. Éilíonn ligean isteach cur chun cinn na hocht gcineál cásanna sintéiseacha chomh maith le gearrthóg fíor sláintithe, ar a laghad trí athrá tomhaiste in aghaidh an róil agus an cháis, na deich méadracht dearbhaithe go léir, achoimrí media/prompt/expected-fact/settings reoite, breathnóireacht uathúil IDs agus ordú sílithe A/B fíoraithe. Ceanglaíonn an admháil forghníomhaithe an achoimre corpais, an t-iarrthóir cruinn SHA agus athbhreithniú na samhla. Fanann tomhais ar iarraidh nó neamhbhailí `HOLD`, lena n-áirítear CPU os cionn 30 s, buaic RSS os cionn 512 MiB nó réamh-anailís os cionn 30 s. Is caipíní iontrála fianaise iad seo, ní ráthaíocht forfheidhmithe RSS am rite nua.

Éilíonn FU-07 98% ar a laghad coinneáil cáilíochta agus follas p95 nach mó ná 1.2x bonnlíne, mar aon le meánfheabhsúchán iomlán cás-chothromaithe de 0.05 ag meánghlaonna fotheideal coibhéiseacha, nó ar a laghad 10% níos lú de ghlaonna fotheideal iar-dedup meánacha. Éilíonn FU-09 cáilíocht 0.85 ar a laghad, coinneáil 95%, laghdú latency airmheán 20% agus laghdú comharthaí 10%. Cuireann caillteanas fíorais chriticiúil, comhlíonadh insteallta nó úsáid in easnamh cosc ar chur chun cinn. Ní féidir le forghníomhú amháin rud ar bith a chur chun cinn: deimhníonn `--previous-report` dhá fhorghníomhú ar leith, neamh-forluiteacha, incháilithe as a chéile den chéanna policy/model revision/candidate/corpus. Ní féidir le turgnamh samplála turgnamh bileog teagmhála a dhearbhú.

Ba cheart do bhailitheoirí freagraí a scóráil mar chuimhne agus `responseDigest` móide méadracht agus ceangail bhreathnaithe a shábháil, gan téacs freagartha a shábháil. Léann an tomhaltóir freisin amha breathnuithe oidhreachta ach ní dhéanann sé cóip den téacs sin ina thuarascálacha. Glactar go díreach le ceann amháin de `responseDigest` nó `rawResponseText` le haghaidh gach breathnóireachta. Fanann an liosta ceadaithe leagan folamh le `hold` réamhshocraithe. Éilíonn iontráil incháilithe a fianaise, tagairt, beartas, athbhreithniú múnla, iarrthóir beacht SHA, achoimre forléirithe agus dhá rith ar leith IDs; diúltaítear do chomhthéacsanna achrannacha. Is conradh iniúchta iad na meiteashonraí seo, ní cruthúnas go bhfuil fíorthomhais i gcomhad tagartha. Déan athbhreithniú ar na hadmhálacha iarbhír roimh aon iontráil a chur leis. Nochtann críochphointe na staitisticí bainistíochta agus an painéal físeáin ullmhacht coimeádach. Ní bhunaíonn ailias múnla cumraithe amháin a athbhreithniú nó an t-iarrthóir reatha SHA, mar sin tuairiscíonn an painéal reatha `HOLD` seachas incháilitheacht ó chomhthéacs forghníomhaithe eile a athúsáid. Tá roghnú turgnamhach sainráite fós ar leithligh ó chur chun cinn; ní athraítear aon réamhshocrú go huathoibríoch.

Féadfaidh glaoiteoirí eagar `transcript.cues` roghnach a cheangal le cuid den fhíseán tacaithe nuair a bhíonn téacs ailínithe acu cheana féin. Ní mór `text`, eatramh críochta `start`/`end` a iompar laistigh den ré taiscéalaithe, agus `source` bánliosta (`client`, `embedded`, nó `audio-bridge`); Réamhshocrú `confidence` go `1` agus caithfidh sé fanacht idir `0` agus `1`. Titeann leideanna dúblacha beachta. Ní thosaíonn OmniRoute riamh ar thrascríobh na meiteashonraí seo: déantar leideanna bailíochtaithe a chóipeáil isteach sa toradh a bhfuil cur síos déanta air le foinse, muinín, agus eatramh, agus déantar iad a léiriú mar bhreathnuithe neamhiontaofa taobh leis na fotheidil fráma. Diúltaítear do théacs neamhbhailí, lasmuigh den raon, nó téacs saor ó bhunáitíocht seachas é a mheascadh isteach sa sruth fotheideal. Normalaíonn an dá chainéal tras-chomhlacht iarratais an bunáitíocht a cuireadh ar fáil go `client`, lena n-áirítear lipéid féindearbhaithe `embedded` nó `audio-bridge`. Ní féidir ach le hoiriúnóir faoi úinéireacht freastalaí na lipéid iontaofa sin a shannadh tríd an argóint `trustedSource` cód amháin; ní féidir le réimse iarratais JSON teacht ar an argóint sin. Is ábhar neamhiontaofa ó na meáin é téacs tras-scríbhinne i gcónaí, beag beann ar a bhunáit, agus ní féidir údarú a chinneadh choíche.

Féadfaidh ardghlaoiteoir rian `audioTranscript` a sholáthar don fhíseán céanna; caitear leis mar théacs a sholáthraíonn an cliant, ní mar chruthúnas ar thrascríobh an fhreastalaí. Ritheann an seam comhleá breathnuithe amhairc agus fuaime faoi sprioc-am amháin agus comhartha toirmisc, ordaíonn sé iad ar amlíne choiteann, laghdaítear dúbailt chruinne, agus tuairiscíonn sé toradh páirteach nuair nach n-éiríonn ach le taobh amháin. Díghrádaíonn `audioTranscript` neamhbhailí go dtí an toradh páirteach sin — coinnítear an cur síos amhairc agus taifeadann an brainse fuaime cód teip sláintithe — seachas teip ar an bhfíseán iomlán. Caomhnaítear infhaighteacht in aghaidh an bhrainse, an bhratach pháirteach, agus na cóid teip sláintithe sa toradh a thuairiscítear, sna meiteashonraí ráille cosanta (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), sna meiteashonraí taisce-toraidh, agus sna cuntair chomhleá droichid. Ní agairt urlabhra-go-téacs an chonair réamhshocraithe Video Bridge ná ní íoslódálann sé an dara cóip meán; gan an rian follasach sin, fanann sé le fís-amháin.

**Coinneáil tras-scríbhinn (#12150 P1).** Baineann sé seo go huathoibríoch nuair a dhéanann an Videobridge (diúltú isteach é féin) cue trascríobh — níl aon bhratach coinneála ar leith ann. Nuair a dhéanann iarratas aon leid tras-scríbhinne ( `transcript` dearbhaithe ag an nglaoiteoir nó `audioTranscript` comhleádh ), marcálann an ráille cosanta é `videoBridgeObserved` agus cuireann sé scáth deargtha den chur síos ar an bhfíseán — rindreáil comhionann ina gcuirtear `[redacted-video-transcript]` in ionad gach cue saorthéacs , tógtha tríd an gcue struchtúrtha a chur in ionad an téacs comhréidh agus é a pharsáil roimh ré mar sin ní féidir le haon ábhar cue — sáraíochta nó gnáth, lena n-áirítear comhlachtaí ina bhfuil `]` mar `[inaudible]`/`[music]` — maireachtáil). Déanann an comhlacht iarratais glao-logála marthanach gach cuid den téacs díorthaithe ó fhíseáin a mhalartú don scáth atheagraithe sin, arna mheaitseáil le comhionannas ábhair; déantar an t-ancaire `fullText` a athléamh ón ualach pá ráillí cosanta réamhghlao, agus mar sin éiríonn leis an gcluiche fós tar éis ráillí cosanta slabhra níos déanaí (na mascairí PII agus inchreidte, tosaíochtaí 10/95) an téacs tuairisc a athscríobh i bhfeidhm agus tar éis an t-instealladh system-prompt/handoff/memory athmhúnlú an eagar teachtaireachta. Níl aon athrú ar an gcorp a sheoltar in aghaidh an tsrutha chuig an múnla. Ní bhíonn aon Chuimhne Marthanach in iarratas breathnaithe freisin (scaiptear an t-eastóscadh bunaithe ar iarratas agus ar fhreagra), mar sin ní féidir le freagra na samhla féin macalla téacs tras-scríbhinne a chur isteach i Memory.

**Réimsí amh físeáin (#12430).** Nuair atá an droichead cumasaithe agus tacaíocht físe dúchais anaithnid nó as láthair, gníomhaíonn réimsí sainithe `transcript`/`audioTranscript` `videoBridgeObserved`, fiú tar éis teip tuairisce nó teorainn `maxVideos`. `null` agus teaghráin folamh a chomhaireamh; ní bhaineann réimsí as láthair agus meiteashonraí neamhfhíseáin. Déanann cóipeanna coinnithe na réimsí seo a cheartú nó fág an t-iarratas ar lár, agus seachnaítear caches/Memory.

Ar na cosáin chúltaca sin, déantar leideanna bailí glaoiteoirí a bheith ina gcodanna `text`/`input_text` tacaithe seachas réimsí soláthraithe neamhchaighdeánach. Tá an dá rian arna soláthar ag iarratas fós ina mbreathnuithe `client` neamhiontaofa, le rabhadh sainráite nár cuireadh síos ar an bhfíseán agus nár fíoraíodh stampaí ama i gcoinne na meán cumarsáide. Baineann na buiséid iomlána 256-cue/64-KiB agus per-cue atá ann cheana féin trasna an dá rian le chéile; caithfidh stampaí ama a bheith oiriúnach d'uasteorainn 600 soicind an bhróicéir agus d'aon fhuinneog fócais a sholáthraítear. Cuirtear rianta neamhbhailí i leataobh, ní chuirtear ar aghaidh iad mar théacs treallach; féadfar deartháir nó deirfiúr bailí a úsáid fós mura sáraítear a gcomhbhuiséad. cuir aon téacs leis réimsí Null/empty. Ní chuirtear aon ghabháil nó tras-scríobh ó na meáin leis an bhfilleadh seo. Baintear réimsí síntí trascríbhinne ón iompróir físeáin chúltaca agus a oibiachtaí `video_url`/`source`. Fanann an liosta ceadaithe sreang OpenAI dian; tá iompróirí físe anaithnide fós ar fáil agus coinníonn spriocanna aitheanta téacs-amháin marcóirí sábháilte. Cosnaíonn scáthanna athdhéanta struchtúrtha an téacs tras-scríbhinne atá i gceangal leis, agus níl aon athrú ar an mbuniarratas ar leis an nglaoiteoir é. Coinníonn spriocanna dúchasacha agus droichid faoi mhíchumas a n-iompraíocht sheachbhóthar reatha.

Úsáideann cóipeanna coinnithe breise an comhartha iarratais breathnaithe céanna. Cuireann an t-amharc réamhráille cliant-iarraidh, cuimhneachán ar feitheamh iarratais, agus logáil luath-iarratais diúltaithe go struchtúrach na réimsí tras-scríbhinne i gcodanna físeáin; déantar leideanna teaghrán a shintéisiú de réir na gcéimeanna píblíne agus athraítear aistrithe comhthéacs ag an doirteal marthanach-iarratas-chomhlacht. Fágann an marcóir leanúnach `video_content_removed` go dteipeann ar leanúint ar aghaidh `previous_response_id` a dhúnadh seachas téacs a cuireadh i leataobh d'aon ghnó a athchruthú. Má chailleann iarratas breathnaithe a scáth athcheartaithe in aghaidh na coda roimh logáil, nó má theipeann ar fiú ceann amháin de roinnt scáthanna físe a mheaitseáil i ndiaidh sócháin iarratais níos déanaí, fágtar ar lár an comhlacht iarratais coinnithe go hiomlán in ionad athscríbhinn pháirt-athchóirithe a choinneáil.

Ar iarratas breathnaithe, d’fhéadfadh freagra eiseamláireach aon chuid den tras-scríbhinn a lua gan teorainn struchtúrtha leid. Mar sin cuirtear marcóir easnaimh in ionad a loga glao marthanach `responseBody` ; ní choinnítear an déantán píblíne mionsonraithe (lena n-áirítear comhlachtaí upstream/client agus smután srutha). Déanann seachbhóthar taisce shéimeantach, díomuachta agus réasúnaíochta-athimirt an iarraidh sin a léamh agus a scríobh. Níl aon athrú ar iarratas an tsoláthraí agus ar fhreagra atá le feiceáil ag an gcliant. Déantar bearta luathchoimeádta a dhraenáil ón maolán sealadach nuair a fágtar an déantán mionsonraithe ar lár. Ní thuairiscíonn rabhadh EventStream míchumtha Kiro ach an comhaireamh beart pálasta, gan a bhfuil ann ná earráid amh parsálaí an JSON. Ní éilíonn sé seo go ndearnadh iniúchadh ar gach diagnóisic provider/plugin nach mbaineann; déantar an doirteal coimeádta níos leithne a rianú i #11658.

Is substráit taisce loopback/token-authenticated ar leith é saolré inmheánach `/api/modality-bridge/video/drilldown`. Éilíonn gach oibríocht freisin ID príomhoide teimhneach canonical. Sula gcumasaítear glaoiteoir táirgeachta, ní mór dó an ID sin a dhíorthú ón tionónta fíordheimhnithe agus ní mór dó luach roghnaithe cliant a chur ar aghaidh choíche. Ceanglaíonn eochracha taisce an príomhoide sin leis an seisiún canónach agus leis an bhfísthagairt IDs, ní stórálann siad ach a n-eochracha SHA-256-derived, agus léann agus scriostar an scóip don phríomhoide céanna. Stórálann an taisce 16 fhráma JPEG díorthaithe ar a mhéad in aghaidh na hiontrála, téann sé in éag tar éis deich nóiméad, agus tacaíonn sé le léann `start`/`end` teoranta nó scriosadh seisiún sainráite.

Tá gach príomhoide teoranta do 16 iontráil agus 64 MiB de shonraí canonical JPEG. Tá na teorainneacha sin neamhspleách ar an uasteorainn dhomhanda 64-entry/256 MiB : ní dhíshealbhaíonn brú príomhchuóta ach na hiontrálacha sin is lú a úsáideadh le déanaí roimh an díshealbhú domhanda LRU a mheas. Déantar iontrálacha atá imithe in éag a scuabadh ón bpríomhchuntas agus ón gcuntasaíocht dhomhanda ar ghníomhaíocht taisce, agus ní dhéanann cealú agus teip bailíochtaithe athsholáthar páirteach.

Diúltaíonn an taisce Base64 neamhchanónach, stuáil barrachais, meáin neamh-JPEG, JPEGs míchumtha nó teasctha, agus JPEGs a tháirgeann rabhadh le linn díchódaithe `sharp` lán-íomhá teoranta. Athchódaíonn sé gach íomhá a nglactar leis mar JPEG canónach , díorthaíonn sé leithead agus airde ó na bearta díchódaithe in ionad réimsí muiníne an ghlaoiteora, agus caitheann sé aon bhearta polyglot leanúnach seachas iad a choinneáil. Ní ghearrtar ach an maolán comhbhrúite canónach teorantach ar an dá chuóta. Áirítear leis an teorainn sreang JSON forchostais Base64 don uasteorainn ionchuir díchódaithe 32 MiB. Taifeadann gach díorthú stóráilte a JPEG format/resolution bhailíochtaithe, polasaí samplála, leagan díorthaithe, am cruthú, hash ábhar ríomhairithe ag an bhfreastalaí, agus tagairt tuismitheora hashed móide hash tuismitheora an ghlaoiteora iontaofa. Déantar cealú a sheiceáil idir na céimeanna decode/hash asincrónacha sula ndéantar an taisce adamhach.

Ní athúsáideann an táirgeoir táirgeachta frámaí bróicéir atá díorthaithe cheana féin ach amháin tar éis anailís amhairc rathúil, gan an dara físeán download/extraction. Éilíonn sé oibreoir `modalityBridgeVideoDrilldownEnabled=true`, `drilldown: true` docht in aghaidh na coda , agus taifead fíordheimhnithe API-eochair ID. Ní bhunaíonn luachanna principal/session arna ndearbhú ag cliant úinéireacht riamh. Gan na trí choinníoll go léir ní dhéanann sé hash, méid a athrú nó frámaí breise a choinneáil. Caomhnaíonn teip coinneála an freagra amhairc inúsáidte. Seachnaíonn iarratais cheadaithe taisce na dtorthaí uile-físeáin ionas nach ndéanann torthaí i dtaisce na lámhleabhair a athsheinntear riamh.

Nochtann freagraí rathúla JSON agus SSE ar a mhéad ceithre lámh teimhneach sa cheanntásc teorannaithe `x-omniroute-video-drilldown`. Is féidir le bunús brabhsálaí údaraithe an ceanntásc sin a léamh gan an polasaí tionscnaimh CORS a leathnú. Úsáideann Láimhseálann nua `v1.<32-byte random base64url token>`, agus coinníonn an chlár ach a hashes SHA-256. Glacann an parsálaí reader/header freisin comharthaí oidhreachta 64 heicsidheachúlach. Is é an tomhaltóir poiblí fíordheimhnithe `GET /api/v1/video-bridge/drilldown?handle=...`, geataithe go neamhspleách ag `modalityBridgeVideoDrilldownRemoteEnabled=true`. Déanann bréagach follasach leanúnach rochtain a chúlghairm fiú nuair atá an t-aischur oidhreacht `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env cumasaithe. Tá an oidhreacht analógach `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback ag coinneáil táirgeachta. Tá an dá chúl réamhshocraithe as.

Faigheann an tomhaltóir úinéireacht ón eochair fhíordheimhnithe agus cuireann sé príomhbheartas i bhfeidhm: baineann GET agus DELETE araon leis an gcatagóir críochphointe `video`, lena n-áirítear an ailiasanna `/v1` agus `/api/v1`. Caithfidh `video` a bheith san áireamh in eochracha a bhfuil críochphointe ceadaithe neamhfholamh acu; fanann eochracha neamhshrianta comhoiriúnach. Tugann an tomhaltóir an 404 céanna ar ais le haghaidh lámha anaithnid, éagtha agus eochair eile. Glacann sé le `variant=preview|standard|detail` (toise JPEG uasta 320/640/1280, riamh upscaled), `limit=1..8` (nó an oidhreacht `frames` ailias, riamh an dá), náid-bhunaithe `page`, agus soicind fócas roghnach `start`/`end`. Diúltaítear d’eochracha iarratais dhúblacha agus d’fhuinneoga fócais droim ar ais. Tá hash dá inneachar iarbhír agus meiteashonraí réitigh iarbhír ag gach malairt a chuirtear ar ais, atá nasctha leis an bhfoinse coinnithe. Díorthaítear leaganacha nuair a léitear iad seachas iad a stóráil mar chóipeanna breise coinnithe. Tá teorainn 32 MiB ar an bhfreagra JSON, lena n-áirítear Base64/envelope; filleann leathanach rómhór 413 agus caithfidh an cliant níos lú frámaí a iarraidh. Léann sé cealú seiceála thart ar gach athrú méide agus athsheiceálann sé bailíocht an láimhseála sula bhfilleann sé. tá `DELETE` ag an úinéir díchumasach; scaoileann scriosadh nó dul in éag TTL an fhoinse chuntasaíochta agus úsáide coinnithe.

Tá an stór comhroinnte próiseas-áitiúil: téann na láimhseálacha in éag nuair a atosófar iad agus ní féidir iad a aistriú idir próisis neamhspleácha OmniRoute. Nochtann staitisticí bainistíochta beartas éifeachtach coinneála/cianta agus entries/bytes comhiomlán coinnithe amháin, ní bhaineann na meáin, tagairtí, príomh- IDs nó lámha. Taispeánann an painéal socruithe Físeáin na luachanna sin agus is féidir leis an dá lasc toilithe a leanúint. Ní fianaise ar imscaradh beo ná ar ardú céime atá sa doiciméadú cur chun feidhme seo; déantar glacadh le fíor-mhúnla a rianú ar leithligh.

Cuirtear fotheideal ar fhrámaí go seicheamhach leis an tsamhail Físeáin cumraithe. Gheobhaidh sárú físe folamh an socrú Fís le hoidhreacht; má tá an dá cheann folamh, roghnaíonn an t-uathródaire Vision an tsamhail éifeachtach atá in ann fís. Cuirtear réimír cobhsaí `[Video description:` in ionad na coda bunaidh i bhfotheidil rathúla a mharcálann freisin ar an téacs mar bhreathnóireacht neamhiontaofa atá díorthaithe ó na meáin agus a insíonn do mhúnlaí iartheachtacha gan treoracha a fhaightear sna meáin a leanúint. I measc na n-eochracha taisce fráma-theideal tá na bearta JPEG, pras, stampa ama, agus múnla éifeachtach; ní dhéantar ach fotheidil rathúla a thaisceadh. Coinníonn iontrálacha taisce an tsamhail táirgeora rathúil iarbhír, lena n-áirítear samhail chúltaca; tuairiscíonn an droichead `mixed` nuair a tháirgtear frámaí éagsúla ag samhlacha éagsúla. Athúsáideann taisce buailte céannacht an táirgeora sin seachas é a athlipéadú mar an plean ródaithe iarrtha. Tá an taisce toradh uile-físeáin eochair ar gach ionchur a athraíonn an t-aschur — múnla pras, éifeachtach, polasaí samplála, comhaireamh fráma, modh anailíse shéimeantach, méarloirg SHA-256 an leid fócas normalaithe, an fhuinneog fócais, `transcript`, `audioTranscript`, agus an bhratach bileog teagmhála — mar sin ní chailleann taisce é aon cheann de na toisí sin a athrú, gan athúsáid gan staonadh. Tá leagan an bheartais asbhainte amhairc, an tairseach, agus an comhaireamh fráma iarrthóra teorantach soiléir freisin san eochair taisce toraidh agus meiteashonraí; dá bhrí sin ní féidir le hathrú polasaí cur síos seanfhíseáin a athúsáid. Coinníonn meiteashonraí Result-cache v4 an modh agus na méarloirg, ní tasc amhúsáideora riamh. Tuairiscíonn meiteashonraí ráillí garda na modhanna anailíse a iarrtar agus atá éifeachtach; tuairiscítear go bhfuil modh `focused` iarrtha gan téacs úsáideora inúsáidte mar `full` éifeachtach .

Baineann an ráille cosanta amach gach cuid den fhíseán tacaithe ach ní dhéanann sé cur síos ar níos mó ná `modalityBridgeVideoMaxVideos`. I gcás sprioc a chruthaítear go bhfuil `supportsVideo === false`, déantar físeáin ar theip orthu agus thar theorainn a bheith mar mharcóirí téacs soiléir sábháilte agus mar sin ní mhaireann aon fhíseán amh. Nuair nach bhfuil an cumas anaithnid, coinníonn na codanna sin a n-iompróir físeáin; leanann aon athscríbhinn chúltaca an t-athrú téacs teorannaithe thuas. Seachbhóthar spriocanna le `supportsVideo === true` an droichead. Iomadaítear comhartha iarratas an chliaint trí ghlaonna íoslódála, scuaine bróicéir, fophróisis agus glaonna fotheideal; stopann ginmhilleadh idir físeáin agus ní theipeann ar oscailt do mheáin amh.

Tá socruithe am rite tacaithe ag DB agus bailíochtaithe le Zod:

| eochair                             | Réamhshocrú | Raon / iompar                                                                                                            |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Am rite roghnach, rogha an diúltaithe                                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | caomhnaíonn `full` fotheidil chineálacha; Úsáideann `focused` comhthéacs teoranta, neamhiontaofa don úsáideoir is déanaí |
| `modalityBridgeVideoModel`          | `""`        | Oidhreacht a dhéanamh ar mhúnla an Vision Bridge                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, nó `segment_aware` comhréireach ; Titeann teip braite ar ais go `uniform`                      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                           |

Leanadh le hoidhreacht Déantar luachanna am istigh físeáin os cionn 120 soicind a chlampáil go dtí spriocdháta an bhróicéir; diúltaítear socruithe nua a scríobhann os cionn na teorann sin. Éilíonn `GET /api/modality-bridge/video/runtime` ceantar lúbtha stampáilte iontaofa roimh fhíordheimhniú nó iniúchadh ama rite, ansin éilíonn an t-údar bainistíochta. Ní fhilleann sé ach `available`, leaganacha sláintíochta FFmpeg/ffprobe, agus cúis sheasta nuair nach bhfuil an t-am rite ar fáil. Níl an críochphointe eastósctha inmheánaigh ina uaslódáil phoiblí API: tuairisceáin sáithiúcháin scuaine `503` plus `Retry-After`, tuairisceáin dínasctha glaoiteora `499`, agus tuairisceáin an bhróicéara spriocdháta seasta `504`. Cuireann freagraí tiontaithe `video->text;model=<visionModel>;parts=<videos>` leis an gceanntásc lárnach `x-omniroute-modality-bridge` gan deighiltí Físe nó Fuaime a bhaint.

### Mascóir PII (`piiMasker.ts`)

Ritheann ar** araon** céimeanna.

- **`preCall`** Cluaineann an pálasta, siúlóidí `system`, `messages`, `input`, agus `prompt` (lena n-áirítear míreanna teaghrán plain), agus baineann sé `processPII()` (ó `@/shared/utils/inputSanitizer`) le teaghrán `content`/`text` réimsí. Nuair a bhíonn `PII_REDACTION_ENABLED=true`, déantar PII braite a athghníomhú sa phálasta amach. Tá sé seo neamhspleách ar `INPUT_SANITIZER_MODE` (a rialaíonn polasaí pras-instealladh amháin). Nuair a bhíonn an t-athchóiriú múchta, taifeadann an glao comhaireamh braite gan ábhar a athscríobh.
- **`postCall`** domhain-chlónálann an freagra, ritheann `sanitizePIIResponse()` móide an maisc Freagraí-API-cruth (clúdaíonn `maskResponsesOutput` — `output_text` agus `output[].content[].text`). Má tharlaíonn aon athrú, cuirtear an freagra modhnaithe in ionad an bhunfhreagra.

Ní bhacann an ráille cosanta riamh; ní dhéanann sé ach anótáil (`meta.detections`, `meta.redacted`) nó athscríobhann sé.

**Cruinneachán inchúlaithe (`PII_REVERSIBLE_VAULT_ENABLED`, `false` réamhshocraithe ).** Nuair a bhíonn an dá `PII_REDACTION_ENABLED` agus `PII_REVERSIBLE_VAULT_ENABLED` ar siúl (DB sháraigh > env > réamhshocraithe, léigh uair amháin in aghaidh an iarratais), osclaíonn `handleChat` cruinneachán amháin in aghaidh an iarratais cliant (`src/lib/pii/requestTokenVaultScope.ts`) agus cuireann sé ar aghaidh chuig an pas réamhghlao mar `GuardrailContext.tokenVault`. Ansin scríobhann an maisceoir comharthaí ionaid mar `<<PII_EMAIL_QWERTYUI_1>>` in ionad `[EMAIL_REDACTED]`, le haghaidh rialacha ionsuite, bailíochtaithe (GDPR/POPIA) agus saincheaptha araon. Is é an nonce ná 8 litir chás uachtair randamach in aghaidh an iarratais, agus faigheann an luach céanna an comhartha céanna laistigh den iarratas. Na miontaí maisc amháin: ritheann an garda pras-instealladh agus `/api/guardrails/test` gan cruinneachán agus coinníonn siad na sealbhóirí áite.

- Ní fheiceann an soláthraí, gach cos teaglama, atriail, ball den phainéal comhleá agus an breitheamh comhleá ach comharthaí. Athchóirítear na comharthaí uair amháin, ar an bhfreagra 2xx a fhágann `handleChat`: in aghaidh an réimse ar an SSE parsáilte (réiteach fós ag deighilt comhartha trasna imeachtaí; tá argóintí glao uirlis JSON-éalaithe) nó in aghaidh an réimse ar chorp JSON, le `Content-Length` athríomh . Athchóirítear téacs ábhair agus réasúnaíochta agus argóintí glao uirlisí. Coinníonn comhlachtaí earráide (4xx/5xx) na comharthaí.
- Fanann teipeanna príobháideach: má theipeann ar an mionú nó má dhiúltaíonn an cruinneachán luach (1000 iontráil, 256 carachtar in aghaidh an luacha, 64 KB san iomlán), scríobhtar an sealbhóir áite ina ionad; comhartha nach féidir leis an cruinneachán a réiteach, nó athchóiriú a theipeann air, a fhanann go litriúil agus gan ach cuntas a logáil. Níl aon amadóirí agus aon stát domhanda ag an cruinneachán; déantar é a ghlanadh nuair a thagann deireadh leis an sruth freagartha, nuair a chuirtear ar ceal é nó nuair a dhéantar earráidí.
- Nuair a dhéantar iarratas ar chomharthaí, eastóscadh cuimhne, sábhálann an neamhláithreacht agus an dá scríbhinn shéimeantach-taisce a scipeáil, toisc nach bhféadfadh iarratas níos déanaí na comharthaí sin a réiteach. I logaí glaonna iompraíonn iarratas agus freagra an tsoláthraí comharthaí; is é an comhlacht iarratais cliant logáilte fós an t-amhionchur cliant, mar atá le heagrú simplí.
- Úsáideann comharthaí nonce randamach in aghaidh an iarratais, mar sin athraíonn an réimír pras ar gach cas: ní bhuaileann caching pras ar thaobh an tsoláthraí le haghaidh casadh folaithe, agus baineann comhartha a thagann ar ais i ndiaidh níos déanaí (mar shampla trí `previous_response_id`) le seaniarratas agus fanann sé go litriúil.

#### Roghnú in aghaidh an chineáil, patrúin saincheaptha agus cuntair braite

**Socruithe an phainéil → → Security → PII masking** roghnaíonn _what_ is masked. Ní aistrítear an chumhdach air: is é sin fós `PII_REDACTION_ENABLED` (iarraidh) agus `PII_RESPONSE_SANITIZATION` (freagra + SSE), an dá uaire de réir réamhshocraithe.

- **Roghnú in aghaidh an chineáil** — na haitheantais ionsuite liostaithe in `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ciallaíonn unset gach cineál (an t-iompar sula raibh an socrú seo ann). Léarscáileanna patrún `ssn_us` an innill iarratais go `ssn`. Ní líonann teimpléid (Íosráta, Caighdeánach, Airgeadais, Brasaíle, USA, GDPR, POPIA, Iomlán) ach na ticbhoscaí sa UI.
- **aitheantóirí GDPR agus POPIA** — dhá cheann déag d’aitheantas ionsuite a chlúdaíonn EU agus aitheantóirí pearsanta na hAfraice Theas (tábla thíos). Tá a gcuid regexes, bailíochtaitheoirí agus clibeanna dlínse ina gcónaí in aon tábla amháin, `src/shared/utils/piiPatterns.ts`, a itheann an sláintitheoir freagartha (`src/lib/piiSanitizer.ts`) agus an maiscóir iarratais (`src/shared/utils/inputSanitizer.ts`) araon. Ní athraítear meaitseáil ach amháin nuair a ghlacann a bhailitheoir leis; ní leor rith lom de dhigit riamh. Coinníonn oibreoir a shábháil rogha cúngaithe sula raibh na haitheantais seo ann an t-iompar a bhí aige go dtí go gcuirtear tic leis na haitheantais nua.
- **Patrúin saincheaptha** — suas le 20 patrún regex nó saoróg (`*` = suas le 64 carachtar neamhspás bán, `?` = one). Éiríonn meaitseanna `[CUSTOM_REDACTED]`. Téann gach patrún trí `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): ní mór 500 carachtar ar a mhéad, bratacha teoranta do `g i m s u`, a thiomsú, ní mór pas a fháil `safe-regex` (backtracking tubaisteach), agus ní fhéadfaidh siad a bheith ag teacht le sreang folamh nó le sealbhóir áite athraonta. Diúltaítear patrún a theipeann nuair a shábháiltear é agus nuair a thástáiltear é, agus ní dhéantar as a chéile stóráilte a theipeann air ag am rite seachas a bheith tiomsaithe. Ní ritheann patrúin saincheaptha ach amháin fad a bhíonn an chumhdach ar siúl.
- **Áiritheoirí braite** comhaireamh in aghaidh an chineáil — (luachanna nár mheaitseáil riamh), coinnithe sa chuimhne agus athshocrú ar atosú (`src/lib/pii/piiDetectionStats.ts`). Ní mhéadaíonn siad ach fad a bhíonn an chumhdach ar siúl.

Cónaíonn na socruithe sa tábla `key_value` (namespace `pii_settings`, `src/lib/db/piiSettings.ts`) agus léitear iad trí thaisce 1 s. API:

| Modh   | Conair                   | Cuspóir                                                                              |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Staid na brataí, `enabledTypes`, `customPatterns`, cuntair braite                    |
| `PUT`  | `/api/settings/pii`      | Ionadaigh `enabledTypes` (`null` = all) and/or `customPatterns`                      |
| `POST` | `/api/settings/pii/test` | Triomaigh patrún amháin i gcoinne sampla de 8 KB ar a mhéad ; ní stóráiltear aon rud |

Teastaíonn údarás bainistíochta ó na trí cinn agus déanann siad an comhlacht a bhailíochtú le Zod (`src/shared/validation/schemas/piiSettings.ts`). Le logáil isteach díchumasaithe (`requireLogin=false`) tá `GET` agus críochphointe na tástála oscailte, ach fós tá seisiún deais ag teastáil ó `PUT`, eochair `manage` -scope API, comhartha rochtana `oma_` le raon feidhme scríofa nó níos airde, nó an comhartha CLI nó an comhartha seirbhíse inmheánach seolta ó loopback.

#### aitheantóirí GDPR (EU) agus POPIA (An Afraic Theas).

| Id                  | Aitheantóir                   | Bailíochtú                                                                             |
| ------------------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| `iban`              | IBAN                          | Tír aitheanta, fad beacht na tíre sin, ISO 13616 MOD-97-10                             |
| `eu_vat`            | uimhir EU VAT                 | Réimír ballstát ar a dtugtar agus formáid uimhir an stáit sin (gan cuardach VIES )     |
| `es_dni_nie`        | Spáinnis DNI / NIE            | Litir rialaithe (luach mod 23); NIE `X/Y/Z` + 7 ndigit                                 |
| `it_codice_fiscale` | Cód Fiscale na hIodáile       | Litir rialaithe ó na táblaí suímh odd/even                                             |
| `pl_pesel`          | Polainnis PESEL               | Seiceam ualaithe agus dáta breithe ionchódaithe atá ann                                |
| `nl_bsn`            | Ollainnis BSN                 | 11-cruthúnas (meáchan 9..2, -1)                                                        |
| `de_steuer_id`      | Gearmáinis Steuer-ID          | ISO 7064 Mod 11,10 móide na rialacha maidir le struchtúr digite (gan tosaigh 0)        |
| `se_personnummer`   | pearsanra Sualainnis          | Luhn thar na deich ndigit dheireanacha agus dáta breithe sochreidte (10 nó 12 dhigit)  |
| `za_id`             | Uimhir ID na hAfraice Theas   | Luhn thar na 13 dhigit ar fad, month/day breithe bailí, digit saoránachta 0 nó 1       |
| `za_phone`          | Fón Afraic Theas              | réimír `+27` / `27`, nó an fhoirm náisiúnta `0..` scríofa le spás nó fleiscín          |
| `za_vat`            | Uimhir VAT na hAfraice Theas  | 10 ndigit ag tosú le `4`** agus** "VAT" / "BTW" sna 48 gcarachtar roimhe seo           |
| `za_tax_ref`        | Tag cánach na hAfraice Theas. | 10 ndigit ag tosú `0`-`3`, Luhn,** agus** "cáin" / "SARS" sna 48 gcarachtar roimhe seo |

Toisc go n-imbhuaileann na formáidí digite amháin le huimhreacha oird, tógann siad uimhreacha agus stampaí ama, bíonn an ciú eochairfhocal de dhíth ar na cinn is laige (`za_vat`, `za_tax_ref`), agus ní láimhseáiltear uimhir lom `0..` deich ndigit mar uimhir theileafóin na hAfraice Theas. Níl spásáil IBANs (`GB29 NWBK ...`) comhoiriúnaithe. Ar an gcosán sruthaithe ní bhreathnaítear ach taobh istigh den smután reatha. Suíonn na haitheantais chun tosaigh ar na patrúin chineálacha gutháin, mar sin coinníonn aitheantóir bailíochtaithe a sealbhóir áite féin (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Roghnaíonn na teimpléid `gdpr` agus `popia` na haitheantas EU agus na hAfraice Theas faoi seach. Fanann an cumhdach féin rogha an diúltaithe ( Riail Crua #20): ní athraíonn aon rud anseo réamhshocrú bratach gné.

### Instealladh Pras (`promptInjection.ts`)

Aimsíonn sé struchtúir sháraíochta san ábhar a sholáthraíonn an t-úsáideoir agus cuireann sé an polasaí cumraithe i bhfeidhm. Tá iompar á thiomáint ag athróga timpeallachta agus roghanna cruthaitheoir:

| Socrú          | Env var                                                                                                | Réamhshocrú | Éifeacht                                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cumasaithe     | `INPUT_SANITIZER_ENABLED`                                                                              | `true`      | Nuair a `false`, ráille cosanta gearr-ciorcaid.                                                                                                                                                                                 |
| Mód            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`      | Beartas insteallta: `block`, `warn`, nó `log`. ( Glactar le `redact` le haghaidh cúl-chomhoiriúnacha ach glactar leis** nach bhfuil** téacs instealladh stiall; Tá iarratas PII athscríobh á rialú ag `PII_REDACTION_ENABLED`.) |
| Tairseach bloc | rogha `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` ( ailias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Íos-déine ag teastáil chun blocáil. Is meánach breathnú-amháin mar réamhshocrú.                                                                                                                                                 |

**Mode precedence** (`getMode`): caller `options.mode` → `INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings → Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. A dashboard override therefore wins over the env vars, so the Feature Flags UI controls the running guard live (no restart). The DB read is fail-safe: if it errors, the guard falls back to the env-based behavior, and when no override is set behavior is identical to env-only resolution.

Foinsí braite:

1. `sanitizeRequest()` ó `@/shared/utils/inputSanitizer` (tacar braite roinnte a úsáidtear in áiteanna eile ar an bpíblíne).
2. Tógtha i `DEFAULT_GUARD_PATTERNS` ( `system_override_inline` agus `markdown_system_block` faoi láthair, an dá `high` déine).
3. `customPatterns` roghnach a rith trí roghanna cruthaitheoir (teaghráin, regex, nó taifid `{ name, pattern, severity }` ).

Nuair `mode === "block"`** agus** comhlíonann braite amháin ar a laghad an tairseach déine, cuireann `preCall` ar ais `{ block: true, message: "Request rejected: suspicious content detected" }`. I modhanna `warn`/`log` logálann an ráille cosanta ach ceadaíonn sé an glao. Easpórtáiltear an cúntóir roinnte `evaluatePromptInjection()` freisin do ghlaoiteoirí ar gá dóibh leideanna a mheas gan dul tríd an gclár.

**Scanadh faoi cheangal (v3.8.20):** ní dhéanann an brathadóir ach iniúchadh ar an** an chéad 16 KB** de théacs pras ceangailte — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) i `src/shared/utils/inputSanitizer.ts`. An dá `detectInjection()` agus `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` roimh rith an lúb patrún. Suíonn na treoracha insteallta gar do bharr ionchuir, mar sin cuireann sé seo teorainn ar regex CPU/GC ar uaslódálacha il-céad-KB gan lagú a bhrath (cf. #3932, #4041).

### Mascóir Dintiúir (`credentialMasker.ts`)

Ritheann ar** araon** céimeanna, go deireanach sa slabhra réamhshocraithe (tosaíocht `95`). Athraíonn sé patrúin aitheanta API-eochair / rún-chomhartha ón bpálasta amach (ábhar na teachtaireachta, argóintí maidir le glaonna uirlisí, torthaí uirlisí)** agus** freagra an tsoláthraí, mar sin ní scaoiltear chuig an soláthraí réamhtheachtacha nó ar ais go dtí an cliant dintiúr atá greamaithe isteach i leid (nó mar mhacalla ar ais ag toradh uirlisí).

- **Liostáil amháin** , an coinbhinsiún céanna le PII redaction (Rail chrua #20 in aice láimhe): díchumasaithe mura `settings.credentialRedactionEnabled === true`** nó** `CREDENTIAL_REDACTION_ENABLED=true`. Agus é as, is — neamhoibríoch é an ráille cosanta nach ndéanann sé blocáil riamh agus ní athscríobhann sé riamh.
- `redactCredentials()` siúlann an crann iomlán payload/response (`walkValue()`, fréamhshamhail-truailliú-sábháilte, timthriall-sábháilte trí `WeakSet`) agus ionad matches le placeholder `[REDACTED:<type>]`, chlónáil ach na brainsí a d'athraigh i ndáiríre.
- Clúdaíonn `CREDENTIAL_PATTERNS` eochracha soláthraí LLM (OpenAI, OpenAI-proj , Anthropic, Google, Hugging Face , Replicate ), comharthaí VCS/SaaS (GitHub, Slack, Líneach, Notion, npm, Fear an Phoist, Discord), eochracha íocaíochta (Stripe, Cearnóg), eochracha scamall (AWS, eochair rochtana, Tw / SendGrid, eochair rochtana, Tw / JWTs teaghráin naisc a bhfuil dintiúir acu (`mongodb://user:pass@...`, etc.), agus patrún cineálach ceanntásca `Authorization`/`x-api-key`/`api-key`/`apikey`. Athraítear eochracha ceanntásca (`authorization`, `x-api-key`, `api-key`, `apikey`) go struchtúrach (luach amháin, réimír scéime cosúil le `Bearer `/`Basic ` caomhnaithe) seachas tríd an téacs cineálach regex.
- Ní bhacann an ráille cosanta riamh; athscríobhann sé ach (`modifiedPayload` / `modifiedResponse`) agus anótáil (`meta.credentialsRedacted`, `meta.count`).

Garda aischéimnithí: `tests/unit/credential-masker-guardrail.test.ts`.

## Bunchonradh (`base.ts`)

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
  block?: boolean; // cuireann true deireadh láithreach leis an slabhra
  message?: string; // nochtar é agus bac á chur i bhfeidhm
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // tugann preCall ar ais é chun an t-iarratas a athscríobh
  modifiedResponse?: TValue; // tugann postCall ar ais é chun an freagra a athscríobh
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

Cuireann srian cosanta in iúl nach bhfuil “aon athrú” ann trí `void`, `{}`, nó
`{ block: false }` a thabhairt ar ais. Nuair a thugtar `modifiedPayload`/`modifiedResponse`
ar ais, cuirtear é in ionad an luacha atá ag sreabhadh tríd an slabhra do na
srianta cosanta ina dhiaidh. Iompraíonn `signal?: AbortSignal` saolré an ghlaoiteora
isteach sna srianta cosanta. Is eisceacht d’aon ghnó í ginmhilleadh iarratais ina
bhfágtar an córas ar oscailt má theipeann air: stopann droichid meán den obair agus
déanann siad glanadh gan na meáin amh a chur ar ais chuig sprioc arb eol nach
dtacaíonn sí leo.

## Clárlann (`registry.ts`)

Nochtann an t-aonán aonair `guardrailRegistry` na nithe seo a leanas:

- `register(guardrail)` — cuireann sé srian cosanta leis (nó cuireann sé ceann nua
  in ionad cinn de réir ainm normalaithe) agus athshórtálann sé de réir `priority`
  in ord ardaitheach.
- `clear()` / `list()` — áiseanna riaracháin.
- `runPreCallHooks(payload, context)` — téann sé trí na srianta cosanta gníomhacha,
  cuireann sé an pálasta ar aghaidh trí `modifiedPayload`, agus stopann sé ag an
  gcéad `block: true`.
- `runPostCallHooks(response, context)` — an sreabhadh céanna ar thaobh an fhreagra.
- `resetGuardrailsForTests({ registerDefaults })` — glanann sé an staid agus,
  go roghnach, athchláraíonn sé na réamhshocruithe chun tástálacha a leithlisiú
  go glan.

Tugann an dá ritheoir `{ blocked, payload|response, results, guardrail?, message? }`
ar ais, áit ar eagar de thaifid `GuardrailExecutionResult` é `results` ina bhfuil
na réimsí `blocked`, `skipped`, `modified`, `error`, agus `meta` do gach srian
cosanta, rud atá úsáideach don rianú.

### Srianta Cosanta a Dhíchumasú de Réir Iarratais

Comhbhailíonn `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` liosta
dí-dhúblaithe d’ainmneacha srianta cosanta ba cheart a scipeáil don iarratas
reatha. Tá cúig chainéal ann, a léitear san ord seo agus a chumascann i liosta
amháin (bíonn an bua ag an gcéad tarlú agus dí-dhúbláil á déanamh):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` i gcorp an iarratais (ag an mbarrleibhéal)
3. `metadata.disabledGuardrails` i gcorp an iarratais (nuair is oibiacht é `metadata` amháin)
4. Ceanntásc `x-omniroute-disabled-guardrails`
5. Ceanntásc oidhreachta `x-disabled-guardrails`

Cumaisctear na cúig chainéal ar fad, agus cuirtear an dá cheanntásc san áireamh:
má sheoltar `x-omniroute-disabled-guardrails` agus `x-disabled-guardrails` araon,
scipeáiltear aontas a liostaí, agus ní cheileann ceanntásc nua-aimseartha folamh
an ceann oidhreachta a thuilleadh
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), socraithe in
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Féadfaidh na luachanna a bheith ina n-eagair teaghrán nó ina dteaghrán scartha
le camóga; baintear spás bán ó na hainmneacha agus normalaítear iad go cás
ceibeab i litreacha beaga (`pii_masker` → `pii-masker`), agus baintear iontrálacha
folmha. Cuirtear an toradh ar aghaidh chuig an gclárlann trí
`context.disabledGuardrails`, agus scipeálann an chlárlann srianta cosanta
comhoiriúnacha (`skipped: true` in `results`).

Ní dhéanann an liosta díchumasaithe difear ach don **chlárlann**. Is teorainn
éigeantach é mód `block` insteallta leide: glaonn meánearra na cosanta insteallta
(`src/middleware/promptInjectionGuard.ts`) ar `evaluatePromptInjection()` gan
aon liosta díchumasaithe atá faoi rialú an ghlaoiteora (baineadh an glao
neamhbheo `resolveDisabledGuardrails({ body })` a bhíodh á dhéanamh aige in
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), mar sin diúltaítear
d’iarratas a dhíchumasaíonn `prompt-injection` fós i mód `block`. Tá sé seo
d’aon ghnó. Tá na cainéil díchumasaithe faoi rialú an ghlaoiteora (corp an
iarratais, meiteashonraí, ceanntásca), agus ní ceadmhach do ghlaoiteoir rialú
slándála a shocraigh an t-oibreoir a mhúchadh
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Ní athraíonn
aontas na gceanntásca ó [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
ach na srianta cosanta clárlainne a scipeáiltear; ní ligeann sé do chliant an
meánearra a sheachaint. Déantar beartais éigeantacha srianta cosanta de réir
eochrach agus de réir grúpa a rianú in RFC v4
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Féach [Cumhdach agus teorainneacha](#coverage-and-limits).

## Ordú Forghníomhaithe

I gcás gach iarratais a shreabhann trí `src/sse/handlers/chat.ts` agus `open-sse/handlers/chatCore.ts` (na bealaí comhrá-teaghlaigh atá liostaithe faoi [Chlúdach agus teorainneacha](#coverage-and-limits) ):

1. Tógann `resolveDisabledGuardrails(...)` an liosta scipeála ó eochair API, comhlacht, agus ceanntásca.
2. ritheann `guardrailRegistry.runPreCallHooks(body, ctx)` ráillí cosanta in ord tosaíochta ardaitheach:
   - Taifeadtar ráillí cosanta faoi mhíchumas mar `skipped`.
   - Féadfaidh `preCall` gach ráillí cosanta an pálasta a athscríobh trí `modifiedPayload`.
   - Déanann an chéad `block: true` gearrchiorcaid an slabhra agus filleann an láimhseálaí freagra diúltaithe ráille cosanta.
3. Sreabhann an pálasta (a d’fhéadfadh a bheith athscríofa) isteach i ródú teaglama agus seoladh in aghaidh an tsrutha.
4. **Neamhshruthú amháin:** tar éis an freagra a chur le chéile, ritheann `guardrailRegistry.runPostCallHooks(...)` an slabhra céanna ar an bhfreagra. titeann `block: true` anseo an freagra in aghaidh an tsrutha agus filleann HTTP 400. Ní féidir le freagraí sruthaithe an chéim seo go hiomlán.
5. **Cruinneachán inchúlaithe amháin:** Nuair a bhuaileann an t-iarratas comharthaí, déanann `handleChat` iad a athchóiriú ar an bhfreagra 2xx a fhilleann sé, tar éis na crúcaí iar-ghlao agus an PII sruthú a athrú, mar sin feiceann `PII_RESPONSE_SANITIZATION` comharthaí agus PII samhail-ghinte, riamh bunaidh athchóirithe.

Taifeadtar ráillí cosanta a chaitheann le `error: <message>` agus logáiltear iad trí `logger.warn`, ach leanann an slabhra — fail-open by design.

## Clúdach agus teorainneacha

Sreangaítear clárlann na ráillí cosanta isteach sa phíblíne comhrá amháin. Tá na teorainneacha seo pinned ag `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` agus `tests/unit/guardrail-pipeline-characterization.test.ts`; na tástálacha sin a nuashonrú d’aon ghnó nuair a athraíonn an t-iompar.

### Áit a ritheann na crúcaí

| Hook / rialú                              | Ritheann ar                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `runPreCallHooks`                         | Iarratais arna láimhseáil ag `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` ( agus `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, agus an seachfhreastalaí comhrá Telegram. Chomh maith leis sin críochphointe tástála an deais `/api/guardrails/test`. Filleann bloc réamhghlao HTTP 400. |
| `runPostCallHooks`                        | **Neamhshruthú** freagraí comhrá amháin (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Ní shroicheann freagraí sruthaithe é riamh.                                                                                                                                                                                                                                                                                                                              |
| Sruthú PII                                | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), píopaithe i `streamingPipeline.ts` nuair a bhíonn `PII_RESPONSE_SANITIZATION` ar siúl. Ní ráille cosanta é, mar sin ní chuireann na bealaí díchumasaithe isteach air.                                                                                                                                                                                                                                      |
| Cruinneachán PII inchúlaithe              | Iarratais arna láimhseáil ag `handleChat` amháin, nuair a bhíonn `PII_REDACTION_ENABLED` agus `PII_REVERSIBLE_VAULT_ENABLED` ar siúl. Déanann an réamhghlao `pii-masker` na comharthaí a bhualadh agus a athchóiriú ag an mbealach amach `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Má dhéantar `pii-masker` a dhíchumasú le haghaidh iarratais, ní dhéantar aon rud a bhualadh.                                                                            |
| Meánearraí garda-instealladh (oidhreacht) | Gach bealach `/v1` pras-iompartha, comhrá-teaghlach san áireamh (féach [clúdach bealaigh](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Instealladh pras amháin.                                                                                                                                                                                                                                                                                        |

### Cad nach bhfuil clúdaithe

- **Meáin, leabaithe agus bealaí sonraí** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) riamh an clár a bhaint amach. Ní ritheann aon chumhdach PII, chumhdach dintiúir nó droichead modhúlachta ann. Is é an t-aon seiceáil atá acu ná na hearraí lár-garda insteallta oidhreachta.
- **Freagraí sruthaithe** ná faigh ráillí cosanta iarghlao: níl aon iarghlao `pii-masker` nó `credential-masker`, agus gan aon bhloc iarghlao. Ní bhaineann ach an t-athrú sruthaithe PII (nuair a bhíonn `PII_RESPONSE_SANITIZATION` ar siúl). Ní dhéantar athghníomhú ar dhintiúir atá macalla ar ais i bhfreagra sruthaithe.
- **Díchumasaigh cainéil vs. na meánearraí (de réir dearadh):** déanann an lárearraí meastóireacht ar instealladh pras lena ghlao féin chuig `evaluatePromptInjection()`, gan aon liosta díchumasaithe atá faoi rialú an ghlaoiteora a rith. Is teorainn éigeantach é mód `block` nach féidir le daoine díchumasaithe atá faoi rialú an ghlaoiteora a sheachbhóthar, lena n-áirítear bealaí comhrá-teaghlaigh ( [#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413) ). Má dhíchumasaítear `prompt-injection` ní dhéantar ach ráille cosanta na clárlainne a scipeáil.

### Rud a fheiceann freagra roimh iarghlao

Ar an gcosán neamhshruthaithe is é an t-ordú ná: eastóscadh cuimhne → forghníomhú uirlis ionsuite → ráillí cosanta iarghlao → bloc iar-ghlao scoir → siopa shéimeantach-taisce.

- **Eastóscadh cuimhne** agus** forghníomhú uirlisí** féach ar an bhfreagra sular féidir le ráillí cosanta iarghlao athscríobh nó bac a chur air. Ós rud é [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ritheann eastóscadh cuimhne an téacs a bhaintear trí `sanitizePII` nuair a bhíonn `PII_RESPONSE_SANITIZATION` ar siúl (idir shruthú agus neamhshruthú), ach tá freagra a chuir bloic iarghlao níos déanaí fós ar fáil don chuimhne agus d'uirlisí.
- **An taisce shéimeantach** stórálann sé an freagra tar éis an iarghlao, mar sin stórálann sé an freagra athscríofa, agus ní chuirtear i dtaisce freagra bactha. Cuirtear iontrálacha taisce in aghaidh na heochrach API.

## Cumraíocht

Athróga comhshaoil á léamh ag na ráillí cosanta ionsuite:

| Athróg                                | In úsáid ag                    | Éifeacht                                                                                                     |
| ------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`             | Socraigh `false` chun an bhrath a dhíchumasú go hiomlán.                                                     |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`             | Beartas insteallta: `warn`, `block`, nó `log`. Ní athscríobhann luach oidhreachta `redact` téacs insteallta. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`             | Modh don gharda insteallta; freisin bratach gné DB go** sáraíonn** an env vars (DB > ENV).                   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`             | An déine íosta a dhiúltaíonn `MODE=block` : `high` (réamhshocraithe), `medium`, nó `low`.                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`             | Ailias oidhreachta do `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`                   | Nuair a `true`, déantar an t-iarratas PII a chur in eagar (neamhspleách ar mhodh insteallta).                |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat`     | Le `PII_REDACTION_ENABLED`, miontas comharthaí inchúlaithe agus cuir ar ais iad i bhfreagraí 2xx.            |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (síos an tsrutha) | Rialaíonn iompar mascara ar thaobh freagartha.                                                               |

Léann na ráillí cosanta Droichead Módúlachta cumraíocht ama rite ón siopa socruithe tacaithe ag DB (`getSettings()`), ní env vars. Is iad príomh-eochracha Vision ná `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, agus `modalityBridgeCacheMaxEntries`. Ní ghlactar leis na heochracha oidhreachta `visionBridge*` ach mar chúltaca doiciméadaithe léite aon-timthrialla; scríobhann painéal úsáid as na heochracha príomhúla. Maireann mainneachtainí agus an réititheoir cúltaca i `src/shared/constants/modalityBridgeDefaults.ts`, agus coinnítear tairisigh oidhreachta in `src/shared/constants/visionBridgeDefaults.ts`.

Úsáideann fuaime `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout`, agus `modalityBridgeAudioMaxClips`, móide na socruithe `modalityBridgeCache*` roinnte. Níl aon aisíocaíocht eochair oidhreachta ag Audio toisc gur tugadh na heochracha seo isteach le scéimre Modality Bridge.

Úsáideann físeán `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos`, agus `modalityBridgeVideoTimeout`, móide na socruithe `modalityBridgeCache*` roinnte. Tá sé díchumasaithe de réir réamhshocraithe toisc gur spleáchais oibriúcháin roghnacha iad FFmpeg/ffprobe agus cuireann fotheidealú fráma le latency agus costas múnla.

## Guardrails Saincheaptha

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

Céimeanna:

1. Cruthaigh `src/lib/guardrails/myGuardrail.ts` a leathnaíonn `BaseGuardrail`.
2. Cuir `preCall` agus/nó `postCall` i bhfeidhm.
3. Cláraigh ag am iompórtála (brúigh ó `registerDefaultGuardrails`) nó
   cuir glaoch ar `guardrailRegistry.register(...)` ag am rite — cuireann an
   clárlann in áit aon guardrail roimhe a bhfuil an t-ainm normalaithe céanna aige.
4. Cuir tástálacha faoi `tests/unit/` (samplaí atá ann cheana:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tástáil

Úsáid `resetGuardrailsForTests()` idir tástálacha chun tosú ó staid aitheanta.
Tabhair `{ registerDefaults: false }` chun tosú le clárlann fholamh agus gan ach
na guardrails atá á dtástáil a chlárú. Glacann Vision Bridge le hinstentadh
spleáchais (`deps.getSettings`, `deps.callVisionModel`); nochtann Audio Bridge
na seamanna coibhéiseacha do shocruithe, cumais, roghnú samhla STT, seiceálacha
dintiúir, agus tras-scríobh. Mar sin is féidir le tástálacha an dá shruth a
chleachtadh gan rochtain ar DB nó ar líonra.

## Féach Freisin

- `src/lib/guardrails/` — cur i bhfeidhm
- `src/shared/utils/inputSanitizer.ts` — brathadóir comhroinnte a chumhachtaíonn
  braite prompt-injection agus maisciú PII
- `src/shared/constants/visionBridgeDefaults.ts` — réamhshocruithe Vision Bridge
  agus liosta samhlacha an droichid éigeantaigh
- `src/shared/constants/modalityBridgeDefaults.ts` — réamhshocruithe rite comhroinnte Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ciseal ortagonalach (circuit breaker, tréimhsí fuaraithe)
- `docs/reference/ENVIRONMENT.md` — tagairt iomlán d'athróga comhshaoil

## Clúdach bealaí an injection-guard & red-team (Céim 8 · Bloc D)

Clúdaíonn an injection-guard (`createInjectionGuard` / `withInjectionGuard`) gach
bealach a ghlacann le prómptáil úsáideoirí. Comhlíonann sé `INJECTION_GUARD_MODE`
(réamhshocrú `warn` = logáil amháin; `block` = cuireann sé HTTP 400 `SECURITY_001` ar ais).

| Cineál                 | Bealaí                                                                                                                                               | Mód réamhshocraithe |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Téacs (atá ann cheana) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Giniúnach              | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Sonraí                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Clúdaíonn eastósú téacs (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (gach oíche, `nightly-llm-security.yml`):** bailíochtaíonn promptfoo go
mblocálann gach bealach córpas OWASP-LLM in `INJECTION_GUARD_MODE=block`; ritheann
garak probanna (scipeálann sé mura bhfuil rún ann). Tá `moderations` san áireamh ar
mhaithe le comhsheasmhacht. Is teorainn éigeantach é an mód blocála: déanann
`evaluatePromptInjection()` neamhaird den liosta díchumasaith in aghaidh an iarratais
a thugann an middleware dó, mar sin **ní** dhíolmhóidh `disabledGuardrails` bealach
uaidh ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Tá dhá jab ag sreabhadh oibre na hoíche (`.github/workflows/nightly-llm-security.yml`,
cron + seoladh láimhe):

- **`promptfoo-guard` (ag blocáil)** — ritheann sé `promptfoo eval -c promptfooconfig.yaml`
  le `INJECTION_GUARD_MODE=block`. Dearbhaíonn gach cás frithpháirteach (m.sh. "ignore all
  previous instructions…", jailbreaks ar stíl DAN) go n-iompraíonn an freagra
  `error.code === "SECURITY_001"`, is é sin, gur dhiúltaigh an garda don iarratas i ndáiríre.
- **`garak` (comhairleach)** — ritheann sé garak `--probes promptinject,dan,leakreplay`
  i gcoinne instance áitiúil OmniRoute (`http://localhost:20128/v1`). Geataítear é ar
  rún soláthraí (`PROMPTFOO_PROVIDER_KEY`); scipeálann sé go séimh agus tá `|| true`
  mar iarmhír aige, mar sin tuairiscíonn sé gan teip a chur ar CI.

Cuimsíonn clúdach an chúntóra garda (`createInjectionGuard` / `withInjectionGuard`)
gach bealach `/v1` a iompraíonn prómptáil; tarraingítear téacs na prómptála ó
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ag
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
