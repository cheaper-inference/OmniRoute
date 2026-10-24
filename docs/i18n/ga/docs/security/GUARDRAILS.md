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

## Guardrails Tógtha Isteach

Luchtaíonn an clárlann sé ghuardrail go huathoibríoch in ord tosaíochta ar iompórtáil
(féach `registry.ts` → `registerDefaultGuardrails()`):

| Tosaíocht | Ainm                | Céim(í)        | Comhad                |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ritear uimhreacha tosaíochta níos ísle **ar dtús**.

### Droichead Físe (`visionBridge.ts`) — Droichead Modúlachta PR-1

Tá meiteashonraí sainráite `supportsVision:false` sa chlárlann/spec ag bunmhúnla GLM 5.3
agus ag `glm-5.3-{low,high,max}`. Is múnlaí físe dúchais iad na hathróga GLM 5.3 Flash fós.
Téann bealach `/v1/messages` Claude Code isteach sa slabhra comhroinnte guardrail réamhghlao
`handleChat` **sula** ndéantar an t-aistriúchán Claude-go-OpenAI; ní mór íomhánna toraidh
uirlise `Read` atá neadaithe a thuairisciú nó a láimhseáil sula dtógann an t-aistriúchán sin
isteach in inneachar `image_url` OpenAI iad (#17069).

Gabhtar iarratais ina bhfuil íomhánna atá dírithe ar **mhúnlaí gan fhis** agus déantar
ceachtar an t-iarratas iomlán a athearrú chuig múnla in ann físe nó tuairiscí téacs —
arna gcruthú ag múnla físe incumraithe — a chur in ionad na gcodanna íomhá roimh an
nglao suas an tsrutha. Ligeann sé seo do sholáthraithe téacs-amháin ualaigh ilmódúla
a láimhseáil go trédhearcach.

Sreabhadh:

1. Scip má thacaíonn an múnla sprioc le fís cheana féin (mura bhfuil sé sa
   liosta droichid éigeantaigh `isVisionBridgeForcedModel`).
2. Bain na codanna íomhá trí `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), a dhéanann tarmligean don **bhraiteoir meán
   aontaithe** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — an
   t-aon fhoinse fírinne amháin a roinntear le scagaire comhoiriúnachta an teaglama.
   Tá an eastóscadh ar liosta ceadaithe teoranta do na cruthanna ar féidir le
   `replaceImageParts` iad a fhí ar ais (conradh an eastóscaigh↔athchuir):
   `image_url` OpenAI, `source.type:"base64"` Anthropic (base64),
   `source.type:"url"` Anthropic (URL), agus `input_image` an Responses API.
   Baintear freisin íomhánna meaitseála atá neadaithe laistigh de
   `tool_result.content` Claude Code agus laistigh d'aschuir uirlisí Responses,
   agus cuirtear in ionad ag a gcosáin bhunaidh iad; is ábhar do scagaire an
   teaglama iad na cruthanna ina bhfuil táscairí amháin agus ní bhaintear iad.
   Scip mura bhfaightear aon cheann.
3. Réitigh cumraíocht rite trí `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): bíonn lámh in uachtar ag
   eochracha socruithe nua `modalityBridge*`; fanann na heochracha oidhreachta
   `visionBridge*` mar **chúltaca aon thimthriall amháin** (fuinneog aischurtha siar).
   Scip roimh aon thrasnáil meán nuair a bhíonn an droichead díchumasaithe.
4. Cinneann roghnóir an mhod (`modalityBridgeVisionMode`, féach an tábla thíos)
   idir athearrú agus tuairisciú. Filleann an t-atharrú `modifiedPayload` gan ach
   `model` malartaithe, móide meitea `{ rerouted, fromModel, toModel, imagesKept }`.
5. Cosán an tuairiscithe: cuir uasteorainn ar na híomhánna ag `maxImages`, cum an
   prómpt feasach ar an tasc, téigh i gcomhairle le taisce an tuairiscithe, glaoigh
   ar an múnla físe **go comhthreomhar** (`Promise.allSettled`), agus insteall
   codanna téacs `[Image N]: <description>` ina n-áit. Má theipeann ar thuairisciú,
   tugtar `null`: caomhnaítear an íomhá amh do spriocanna anaithnide/in ann físe
   (#4012), ach faigheann **sprioc dhíreach dheimhnithe téacs-amháin** nó teaglam
   nialais-físe stub téacs sainráite
   `(unavailable — no vision-capable provider connected)` do gach íomhá gan tuairisc,
   lena n-áirítear teipeanna páirteacha agus íomhánna atá thar uasteorainn an ghlao
   tuairiscithe (#17069). Fanann an cúltaca reatha do thuairisciú teaglama nuair a
   theipeann ar fad i bhfeidhm (#8430).
6. Fill `modifiedPayload` + meitea (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Roghnóir an mhod (`modalityBridgeVisionMode`)

| Mód        | Réamhshocrú | Iompar                                                                                                                                                                                                                                                                                                          |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Heuristice oidhreachta, gan athrú (#6640/#7204): déantar samhlacha neamh-theaglama/`auto/` a athródú chuig an tsamhail fisice is fearr mura bhfuil dintiúir inúsáidte ag an tsamhail bhunaidh cheana féin (ansin déantar cur síos); déanann spriocanna teaglama cur síos i gcónaí.                              |
| `describe` |             | Cur síos i gcónaí — scipeáiltear an bloc athródaithe ar fad; is í an tsamhail a roghnaigh an t-úsáideoir a fhreagraíonn i gcónaí.                                                                                                                                                                               |
| `reroute`  |             | Athródú éigeantach: scipeáiltear an garda cosanta samhail le dintiúir. Baineann garda dintiúir an athródú-**sprice** fós — nuair nach bhfuil aon sprioc fisice inúsáidte ann, cuireann an droichead bac le hearráid shoiléir seachas cur síos a dhéanamh nó íomhánna amha a sheoladh chuig sprioc téacs-amháin. |

Déanann na modhanna éigeantacha gearr-chiorcadú **sula** ritheann an heuristice
auto; tá iompar `auto` comhionann beart ar bheart leis an garda cosanta réamh-PR-1.

#### Raon feidhme eochair API (`visionBridgeKeyScope.ts`)

Nuair a chuireann eochair API an ghláonna srianta ar `allowedConnections`, linní
cuóta (`allowedQuotas`) nó samhlacha (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), ní roghnaíonn an
droichead ach samhlacha athródaithe agus cur síos atá ceadaithe ag an eochair, ar
naisc atá ceadaithe ag an eochair. Téann an glao cur síos trí féin-lúb OmniRoute
ansin i gcónaí leis an gceannteideal `x-omniroute-self-loop-key-id`, ionas go
gcuireann an t-iarratas comhrá a ghlacann polasaí naisc agus samhail na heochaire
sin i bhfeidhm arís. Ní urramaíonn `enforceApiKeyPolicy()` an ceannteideal sin ach
i dteannta leis an mbearer féin-lúb, ionas nach féidir leis ach rochtain a chúngú,
agus diúltaítear id nach réitíonn.

Mura bhfuil aon tsamhail fisice ceadaithe don eochair, diúltaíonn **sprioc
téacs-amháin dearbhaithe** an t-iarratas íomhá go háitiúil le HTTP 400 soiléir in
áit beartaí íomhá a chur ar aghaidh chuig sruthuas nach bhfuil in ann (#17069). Do
spriocanna le cumas fisice anaithnid nó dúchais, coinníonn an cosán cur síos a
iompar fail-open roimhe seo (meitea `{ skipped: true, reason: "no_permitted_vision_model" }`).
Iarratais gan eochair, agus eochracha gan na srianta seo, iompraíonn siad go
díreach mar a bhíodh.

#### Leid cur síos atá feasach ar an tasc (`modalityBridgeVisionTaskAware`)

Réamhshocrú **true**. Cuireann `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
téacs an **teachtaireacht úsáideora dheireanaigh** (teagtha go 500 carachtar) leis
an leid cur síos bonn, ag stiúradh an chur síos i dtreo an rud a d'fhiafraigh an
t-úsáideoir i ndáiríre (patrún codex-vision-proxy) agus ag iarraidh ar an tsamhail
fisice téacs infheicthe a thrascríobh. Leis an mbratach múchta — nó gan téacs
úsáideora — úsáidtear an leid bonn gan athrú.

Iarrann an t-iarratas OpenAI-chomhoiriúnach féin de chuid an féin-lúb cur síos
(`callVisionModelSingle()` i `visionBridgeHelpers.ts`) `image_url.detail: "high"`
i gcónaí — gan choinníoll, do gach glaonnaí/soláthraí, gan bheith faoi gheit ar
aon chomhartha cliant. Laghdaíonn sampláil ar mhionsonraí ísle cruinneas OCR don
tasc tras-scríofa téacs go díreach a iarrann an leid seo, mar sin iarrann an glao
cur síos féin mionsonraí arda i gcónaí is cuma cén leibhéal mionsonraí a d'úsáid
an t-iarratas isteach bunaidh. Ní dhéanann sé seo difear ach do chorp an iarratais
inmheánaigh cur síos; ní athraíonn sé conas a chuireann OmniRoute `image_url.detail`
an ghláonna féin ar aghaidh ar an bpríomh-iarratas — cuirtear an réamhshocrú sin i
bhfeidhm ar leithligh, agus ach amháin do chliaint OpenCode braite, i
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Níl réimse
`detail` ag brainse formaid-sreang Anthropic den féin-lúb cur síos agus ní
dhéanann ceachtar den dá réamhshocrú difear dó.

#### Uasteorainn aschuir cur síos (`modalityBridgeVisionMaxChars`)

| Eochair                        | Réamhshocrú | Raon             |
| ------------------------------ | ----------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` nó 100–50000 |

Ciallaíonn `0` (réamhshocrú) **gan uasteorainn** — cuirtear an cur síos a
fhaightear ó `callVisionModel()` ar aghaidh gan mhodhnú, ag caomhnú an iompair atá
ann cheana. Teagann aon luach sa raon 100–50000 an cur síos le hiarmhír `…` sula
bhfilítear é ar ais mar `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`). Ardaigh
é seo do thascanna OCR atá lán de mhionsonraí nuair a theastaíonn an tras-scríobh
iomlán ón tsamhail síos an tsrutha; íslic é chun úsáid comharthaí a theorannú ar
shamhlacha fisice labhartha. Tá an réimse deais ar phainéal Casta na cluaisíne Fís
(`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) agus ceanglaíonn sé
aon luach idir 1 agus 99 suas go dtí an t-urlár 100 agus fágann sé `0` sainráite
gan athrú — is luach Zod bailí ina cheart féin é `0`
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ní hamháin an
réamhshocrú "gan shocrú".

#### Taisce cur síos (`modalityBridge/bridgeCache.ts`)

Taisce LRU + TTL i gcuimhne d'aschuir cur síos, roinnte ar fud an phróisis.
Eochair = `sha256(imageRef + composedPrompt + configuredBridgeModel)` le frámáil
réimír-fhad (gan imbhualtaí teorainneacha réimse). Is é an chuid samhail an
tsamhail droichead **chumraithe**, ní an tsamhail a d'fhreagair i ndáiríre —
féadfaidh `callVisionModel` titim siar go hinmheánach, agus dhéanfadh eochrú in
aghaidh na hiarrachta an taisce a phíosaí. Ní thaisctear cur síos teipthe riamh.
Socruithe:

| Eochair                         | Réamhshocrú | Raon    |
| ------------------------------- | ----------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`      | —       |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000 |

#### Normalú íomhá cianda (féin-lúb describe/base64 fetch)

Nuair a fhhaigheann an bridge íomhá **chianda** é féin — an féin-ghlao describe Anthropic agus an tiontú base64 claude-wire-format (`ensureBase64ImagesForClaudeWire`), an dá cheann trí `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — cuirtear an data URI a bhíonn mar thoradh air trí `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) sula neadaítear é in iarratas an mhúnla físe. Déantar íomhánna rómhóra a laghdú go **barr fada 2048px** (ag meaitseáil an teorann resize a chuireann OpenAI/Anthropic i bhfeidhm cheana féin ar thaobh an fhreastalaí), rud a laghdaíonn bearta/latency an uaslódála gan aon athrú a dhéanamh ar a bhfeiceann an múnla físe. Úsáidtear `sharp` don resize, luchtaithe trí dynamic import: ar ardán ina dteipeann ar a dhénártha dúchais a luchtú, **ní chaitheann** `normalizeDataUri()` earráid riamh — titeann sé ar ais go passthrough de na bearta bunaidh, mar sin fanann an cosán describe/tiontú-base64 ag obair i gcónaí. Cuirtear bearta nach íomhá iad (fetch nár chuir íomhá in-athdhíonachta ar ais) tríd gan teagmháil freisin. Tá an normalú seo teoranta d'íomhánna a fhaigheann an bridge dá fhéin-ghlao féin — ní chuirtear i bhfeidhm riamh é ar pháslaíocht amh an ghlaoire, ag teacht le prionsabal an mutation opt-in-only (Hard Rule #20).

#### Scéimre socruithe + migration

Déantar na heochracha nua `modalityBridge*` a bhailíochtú le Zod in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, an triúr `modalityBridgeCache*`, agus an grúpa `modalityBridgeAudio*` a úsáideann an Audio Bridge. Cóipeann migration `141_modality_bridge_settings.sql` luachanna oidhreachta `visionBridge*` chuig na heochracha nua comhfhreagracha (idempotent, ní forscríobhann sé luach `modalityBridge*` arna shocrú ag oibreoir riamh); fanann na heochracha oidhreachta inghlactha mar read fallback ar feadh timthriall eisiúna amháin.

#### Ceanntásc trédhearcachais + stats

Iompraíonn freagraí describe-transformed `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (arna thógáil ag `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, arna stampáil ag `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Ní fhaigheann iarratais rerouted **aon** cheanntásc — d'fhág an payload gan teagmháil agus tá an malartú múnla le feiceáil cheana féin i réimse `model` chorp an fhreagra.

Filleann `GET /api/modality-bridge/stats` (management auth, an tsraith chéanna le `GET /api/settings`) na cuntair in-memory per-modality `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` do `vision`, `audio`, agus `video`. Úsáideann `averageLatencyMs` `latencySamples`, ní gach attempt, mar a ainmneoir; ní chruthaíonn oibríocht gan tímpeallacht sampla nialas-mhillishoicind. Fanann `bridged` mar ailias comhoiriúnach siar do thiontuithe rathúla; ní incrimintíonn iarrachtaí teipthe é. Athshocraítear cuntair ar atosú próisis de réir dearaidh (telemetry, ní accounting).

#### Cumraíocht an deais

Is é `/dashboard/settings/modality-bridge` an leathanach deis tiomnaithe. Caomhnaíonn a chluaisíní `Vision`, `Audio`, agus `Video` ina bhfuil ina sheoladh URL paraiméadair cheist agus luach `tab` á athrú. Nochtann an cluaisín Vision cumasú, mód, roghnú múnla (an réamhshocrú uathoibríoch san áireamh), prompting task-aware, timeout casta/teorainneacha íomhá/fad-tuairiscithe/cache, cuntair runtime, agus sampla-iarratas cosanta. Tá an cluaisín Audio beo freisin: nochtann sé cumasú, roghnóir múnla STT-only le Auto, teorainneacha timeout/max-clip, cuntair fuaime, agus tástáil shamplach `input_audio`. Tá an cluaisín Video feidhmiúil: tuairiscíonn sé staid runtime FFmpeg/ffprobe — ceann de cheithre staid UI sainráite (`unknown` fad atá an probe ar siúl nó ní fhéadfaí é a chur i gcrích, `restricted` ar óstach deais neamh-loopback ina ndéantar an probe a scipeáil ar thaobh an chliaint, `unavailable` nuair atá sé probáilte agus deimhnithe as láthair, nó `available` leis na leaganacha FFmpeg/ffprobe) — déanann sé teorainneacha enable/model/frame/video/timeout a choinneáil, scagann sé an roghnóir múnla go múnlaí atá in ann fís a láimhseáil, agus nochtann sé cuntair físe.

Is nasc comhoiriúnachta chuig an leathanach nua é an tsean-chárta Vision Bridge faoi shocruithe AI; níl dara cóip den fhoirm aige a thuilleadh. Nascann Media Providers freisin sreabhadh oibre Image-to-Text agus Speech-to-Text leis na cluaisíní Modality Bridge comhfhreagracha gan an playground Speech-to-Text atá ann cheana a bhaint.

**Scipeáil iontrála féin-lúibe:** nuair a rithtear an glao describe trí fhéin-lúb `/v1` OmniRoute féin (provider neamh-chaighdeánach), seolann an fo-iarratas `x-omniroute-admission-bypass: internal` agus déantar é a fhíordheimhniú leis an dintiúr féin-lúibe réitithe — an sentinel áitiúil `sk_omniroute` i mód áitiúil, nó an eochair env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` arna cumrú ag an oibreoir (#1350) ionas gur féidir le heisiúintí `REQUIRE_API_KEY=true` an glao describe a rith fós. Ní thugtar aitheantas don scipeáil ach do na dintiúir beachta sin, mar sin ní féidir le cliaint sheachtracha an ceanntásc a úsáid chun iontráil a sheachaint.

Tá réamhshocruithe oidhreachta in `src/shared/constants/visionBridgeDefaults.ts`; tá na réamhshocruithe nua mód/task-aware/cache agus an réiteoir socruithe in `src/shared/constants/modalityBridgeDefaults.ts`. Nochtann an guardrail rogha tógálaí `deps` ionas gur féidir le tástálacha feidhmithe bréige `getSettings` agus `callVisionModel` a instealladh.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Gabhann sé iarratais comhrá a bhfuil fuaim iontu sula sroicheann siad sprioc nach bhfuil a fhios aige go nglacann sí ionchur fuaime. Ní ath-rithtear an t-iarratas comhrá riamh: déantar codanna fuaime a thrascríobh tríd an gcríochphointe multipart OpenAI-compatible atá ann cheana agus leanann an múnla comhrá roghnaithe ar aghaidh le tras-scríbhinní téacs.

Sreabhadh:

1. Réitigh `supportsAudio` trí `getResolvedModelCapabilities()`. Bíonn tosaíocht ag
   meiteashonraí sainráite chlár na soláthraithe, ansin ag meiteashonraí statacha
   na samhla, agus ansin ag `modalities_input` sioncronaithe. Is é `false` liosta
   ionchuir dearbhaithe nach bhfuil `audio` ann; mura bhfuil aon fhianaise cumais
   ann, is é `null` an toradh. Gníomhachtaíonn `false` agus `null` araon an
   droichead coimeádach, agus seachnaíonn `true` é.
2. Réitigh socruithe `modalityBridgeAudio*` agus bain codanna fuaime
   barrleibhéil inscoilte as gach teachtaireacht tríd an mbrathadóir comhroinnte
   `detectMediaParts()`. Is iad na formáidí sreinge a dtacaítear leo ná
   `input_audio` OpenAI, `audio_url`, agus `source.media_type: "audio/*"`.
   Braitear fuaim neadaithe don ródú ach ní bhaineann an chonair scoilte í.
   Cuirtear teorainn leis an obair le `modalityBridgeAudioMaxClips`; fágtar
   codanna níos déanaí gan athrú.
3. Urramaigh `provider/model` cumraithe, nó lig do `selectAudioBridgeModel()`
   siúl trí `AUDIO_TRANSCRIPTION_PROVIDERS` in ord cobhsaí na catalóige agus an
   chéad mhúnla a roghnú a bhfuil dintiúr soláthraí gníomhach inúsáidte aige.
4. Tiontaíonn `callAudioTranscription()` fuaim base64/data-URI ina `file`
   ilpháirteach, nó íoslódálann sé `audio_url` cianda tríd an ngarda poiblí
   amháin um thrácht amach, le pionnáil DNS agus teorainn 25 MB. Ansin seolann
   sé an comhad agus an tsamhail roghnaithe le POST chuig an bhféinlúb áitiúil
   `/v1/audio/transcriptions`, arna fhíordheimhniú le
   `resolveSelfLoopBearer()`. Déanann an bealach tras-scríofa atá ann cheana
   gnáthchuardach dintiúr, láimhseáil tréimhsí fuaraithe/teorainneacha ráta,
   agus seoladh chuig an soláthraí.
5. Cuirtear `[Audio N]: <transcript>` in ionad na gcodanna lena mbaineann
   glaonna rathúla. Ritheann glaonna le `Promise.allSettled`: caomhnaíonn
   teip aonair an bhunchuid fuaime sin (conradh #4012). Má theipeann ar gach
   glao agus má tá sé cruthaithe gur `supportsAudio === false` atá sa sprioc,
   déantar `[Audio N]: (unavailable — no STT provider connected)` de na
   codanna (conradh #8430). I gcás sprice anaithnid (`null`), fágtar an toradh
   gan athrú má theipeann ar gach glao. Faigheann sprioc atá cruthaithe a bheith
   téacsamháin agus nach bhfuil dintiúr STT inúsáidte aici an t-ionadchoinneálaí
   sainráite céanna gan glao líonra a dhéanamh.

Úsáideann tras-scríbhinní rathúla taisce LRU/TTL uile-phróisis an Droichid
Módúlachta. Comhcheanglaíonn an eochair an tagairt fuaime, lipéad cobhsaí na
hoibríochta `audio-transcription`, agus an tsamhail STT roghnaithe; ní chuirtear
teipeanna i dtaisce riamh. Nuashonraíonn iarrachtaí fuaime na cuntair
chomhroinnte `bridged`, `cacheHits`, `failures`, agus `lastUsedAt`. Bíonn
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ar
fhreagraí claochlaithe; ní fhaigheann iarratais gan athrú mír Droichid Fuaime.

Tá na socruithe am rite tacaithe ag bunachar sonraí agus bailíochtaithe le Zod:

| Eochair                       | Réamhshocrú | Raon                   |
| ----------------------------- | ----------- | ---------------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —                      |
| `modalityBridgeAudioModel`    | `""`        | Uathoibríoch nó ID STT |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000            |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10                   |

Tá an taisce comhroinnte fós faoi rialú `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, agus `modalityBridgeCacheMaxEntries`.

### Droichead Físe (`videoBridge.ts`, `videoBridgePipeline.ts`)

Idircheapann sé codanna físe barrleibhéil i `messages` Críochnuithe Comhrá agus
in `input` API na bhFreagraí sula nglaoitear ar sprioc nach eol go bhfuil
tacaíocht dhúchasach físe aici. Is iad na formáidí a dtacaítear leo ná
`input_video`, `video_url`, `video_source`, URLanna HTTPS, agus URIanna sonraí
`data:video/*;base64,...`. Ní chaitear le gnáthainmneacha comhaid i dtéacs mar
fhíseán.

Is le `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) trasnú an iarratais, an
tseiceáil cumais/beartais, comhiomlánú de réir iarratais, agus pálasta an
fhreagra. Tá obair in aghaidh an fhíseáin — sealbhú, taisce an toraidh iomláin,
cur síos ar sheicheamh frámaí (a chomhtháthaíonn aon tras-scríbhinn fuaime a
dhearbhaigh an glaoiteoir), agus méadrachtaí/ginmhilleadh/glanadh in aghaidh na
hiarrachta — folaithe taobh thiar de `processVideoPart` in
`videoBridgePipeline.ts`, a ghlaoitear uair amháin in aghaidh gach coda físe
laistigh de lúb `preCall`. Sainmhíníonn an modúl sin teorainneacha sainráite na
bport freisin: `VideoMediaBrokerPort` (bearta a fháil agus frámaí sampláilte a
bhaint amach), `VideoAudioTranscriptionPort` (tras-scríbhinn fuaime a dhearbhaigh
an glaoiteoir a chomhtháthú leis na fotheidil shampláilte), agus
`VideoDrilldownPort` (teorainn mharthanachta dhruileáil anuas na bhfrámaí; níl
sé sreangaithe isteach i `processVideoPart` fós — ní scríobhann ach an bealach
ar leith `/api/modality-bridge/video/drilldown` iontrálacha druileála anuas
faoi láthair).

Ní iompórtálann ná ní agraíonn conair phoiblí na n-iarratas `/v1` fophróiseas
riamh. Íoslódáiltear físeáin chianda faoi theorainn 50 MiB; tá uasteorainn
choimeádach 36 MiB ar an méid díchódaithe in aghaidh an fhíseáin ag físeáin
base64 inlíne, ionas gur féidir le himchlúdach na samhla/na dteachtaireachtaí/an
fhrámaithe fanacht laistigh den teorainn iontrála 50 MiB d'iarratais phoiblí
JSON. Seiceáiltear an fad inlíne agus meastacháin ar an méid díchódaithe roimh
leithdháileadh. Éilítear HTTPS ar an URL cianda tosaigh agus ar gach atreorú,
agus úsáidtear an garda poiblí amháin atá ann cheana um thrácht amach, le
pionnáil DNS. Ansin trasnaíonn na bearta an teorainn bheacht inmheánach bróicéara
`POST /api/modality-bridge/video/extract`. Tá an bealach sin `LOCAL_ONLY` agus
`SPAWN_CAPABLE` araon, ní ghlacann sé ach le hiarratas fíordheimhnithe in aghaidh
an phróisis ó lúb siar iontaofa, agus ní ghlacann sé riamh le URL, conair chórais
comhad, comhad inrite, ná liosta argóintí. Forfheidhmíonn píblíne mhéid choirp
an API agus léitheoir incriminteach choirp an láimhseálaí uasteorainn ionchuir
50 MiB don bhróicéir go neamhspleách. Ritheann a chiú teoranta eastóscadh amháin
ag an am, ceadaíonn sé ceithre jab ar feitheamh, agus cuireann sé teorainn
100 MiB ar ionchur ar feitheamh.

Laistigh den bhróicéir, léann `ffprobe` comhad áitiúil príobháideach; eisiann an liosta seasta formáidí ceadaithe formáidí seinmliosta agus lastliosta. I gcás coimeádán ceadaithe de theaghlach MOV, fanann tagairtí seachtracha sonraí MOV díchumasaithe de réir réamhshocraithe, agus ní roghnaíonn an t-ordú seasta iad a chumasú. Úsáideann `ffprobe` agus `ffmpeg` araon liosta ceadaithe prótacal ina bhfuil `file` amháin, snáithe amháin, eagair sheasta argóintí, gan bhlaosc, agus comhaid inrite arna réiteach ó `PATH`. Ní iarrthóirí inseinnte iad sruthanna clúdaigh ina bhfuil pictiúr ceangailte. Ní mór do gach sruth inseinnte na teorainneacha a chomhlíonadh, agus tugtar tús áite do shruth réamhshocraithe sainráite roimh an gcúltaca cinntitheach leis an innéacs is ísle. Tá físeáin teoranta do 600 soicind, 8,192 picteilín in aghaidh na toise, agus 33,554,432 picteilín foinse. Samplálann FFmpeg 1–16 fráma JPEG ag lárphointí, laghdaíonn sé an chiumhais fhada go 1,024 picteilín ar a mhéad gan ionchuir níos lú a mhéadú, agus ní fhaigheann sé URL riamh. Is é `uniform` an sampláil de réir réamhshocraithe. Déanann na polasaithe roghnacha `scene_aware` agus `segment_aware` turgnamhach pas seasta breise amháin de chuid FFmpeg thar an sruth áitiúil atá bailíochtaithe cheana, roghnaíonn siad stampaí ama radhairc teorantaithe `showinfo`, agus téann siad siar go cinntitheach chuig na lárphointí aonfhoirmeacha céanna má theipeann ar an mbrathadóir, má théann an t-am in éag, má bhíonn an t-aschur míchumtha, nó má bhíonn an tacar iarrthóirí folamh. Leithdháileann mód atá feasach ar dheighleoga samplaí lárphointe go comhréireach leis na heatraimh radhairc bhailíochtaithe; tugtar mionsonraí thíos ar fhianaise atá feasach ar dheighleoga agus ar iompar cúltaca. Cuirtear an uasteorainn dhocht 16 fhráma i bhfeidhm tar éis an roghnúcháin i ngach polasaí. Nuair nach mbíonn ach buiséad aon fhráma amháin ag iarratas atá feasach ar radhairc, úsáideann sé lárphointe aonfhoirmeach na físe iomláine gníomhaí nó na fuinneoige fócais agus tuairiscíonn sé `policyEffective: uniform`: ní féidir le fráma radhairc roghnaithe amháin an dá cheann ama a chaomhnú. Féadfaidh glaoiteoir fuinneog fhócais chríochta (`start`/`end` soicind) a sholáthar go roghnach; teanntar na teorainneacha le fad na meán, diúltaítear d’fhuinneoga droim ar ais nó neamhchríochta, agus ní dhéantar na polasaithe samplála go léir ach laistigh den eatramh normalaithe. Cuirtear an fhuinneog a eascraíonn as sin san áireamh i meiteashonraí samplála agus sa réimír tuairisce neamhiontaofa ionas gur féidir le samhlacha iartheachtacha sliocht dírithe a idirdhealú ón amlíne iomlán.

Is socrú sainráite ar leith é fócas séimeantach fotheidil. Caomhnaíonn an mód anailíse réamhshocraithe `full` an leid fráma atá ann cheana agus ní chuireann sé téacs an iarratais ar aghaidh chuig an tsamhail fotheidil riamh. Sa mhód `focused`, ní léann an droichead ach an `text`/`input_text` neamhfholamh is déanaí a scríobh an t-úsáideoir ón gcoimeádán Chat nó Responses céanna, normalaíonn sé go NFC é, comhdhlúthaíonn sé carachtair rialúcháin agus spás bán, agus cuireann sé teorainn 500 códphointe Unicode leis. Má bhíonn an toradh folamh, téitear siar chuig an leid bheacht `full`. Srathaítear leid inúsáidte mar JSON i mbloc tiomnaithe de chomhthéacs úsáideora neamhiontaofa agus ní fhéadfaidh sí ach tús áite a thabhairt do mhionsonraí inbhraite; ní féidir léi an rabhadh ar leith i gcoinne treoracha atá le feiceáil nó le cloisteáil sna meáin a leanúint a shárú. Ní dhéanann fócas téacsúil `start`/`end` a thuiscint ná ní athraíonn sé an samplóir ama.

#### Fianaise struchtúrach dheighleog FU-07

Úsáideann `segment_aware` pas teorantaithe réamhanailíse amháin thar an sruth físe áitiúil atá bailíochtaithe cheana. Déanann an slabhra seasta scagairí scálú ar dtús go leithead 320 picteilín ar a mhéad, braitheann sé athruithe radhairc agus eatraimh reoite, agus ansin samplálann sé ag 1 fhráma in aghaidh an tsoicind le haghaidh doiléire, meán-lonrais, agus faisnéise spásúla/ama. Tá an pas teoranta do 600 sampla struchtúrach, snáithe amháin FFmpeg/scagaire, na liostaí ceadaithe céanna do phrótacal ina bhfuil `file` amháin agus do choimeádáin, teorainn 1 MiB ar aschur próisis, agus 30 soicind ar a mhéad laistigh de theorainn roinnte tobscortha/sprioc-ama an bhróicéara. Ní ghlacann sé riamh le hordú, scagaire, cosán ná URL ón iarratas.

Is fianaise chinntitheach samplála iad na luachanna struchtúracha, ní tuiscint shéimeantach ar fhíseán. Ní dhéanann siad ábhair, gníomhartha, fotheidil, caint ná rún úsáideora a thuiscint. Cruthaíonn teorainneacha radhairc agus reoite deighleoga; ní imríonn clúdach reoite, doiléireacht, nochtadh, mionsonraí spásúla agus athrú ama tionchar ach ar an gcaoi a leithdháiltear an buiséad reatha 1–16 fhráma. Cuirtear uasteorainn aon fhráma amháin ar dheighleog atá reoite go hiomlán, agus téann deighleoga neamhreoite in iomaíocht don chuid eile den bhuiséad. Nuair a bhíonn níos mó teorainneacha ná frámaí ann, coinnítear clúdach aonfhoirmeach ar an amlíne ionas nach féidir le gearrthacha tapa luatha deighleog fhada ag an deireadh a cheilt. Déantar teorainneacha radhairc atá laistigh den taifeach anailíse 1 soicind de theorainn reoite a chomhthiomsú.

Má bhíonn scagairí ar iarraidh, má bhíonn an fhianaise míchumtha/folamh, má tharlaíonn earráid bhrathadóra, nó má théann an réamhanailís theorantaithe thar am, teipeann sé go hoscailte chuig an bpolasaí beacht um lárphointí aonfhoirmeacha. Ní theipeann tobscor glaoiteora ná sprioc-am an bhróicéara go hoscailte: foirceanntar an fophróiseas atá ar siúl, cuirtear cosc ar eastóscadh frámaí ina dhiaidh sin, agus baintear an crann sealadach príobháideach in `finally`.

Gineann `scripts/perf/video-bridge-fu07-eval.ts` daingneáin chinntitheacha fhíora FFmpeg le haghaidh coigilteas ar ghlaonna fotheidil tar éis dí-dhúbailt, leithdháileadh buiséid do dhlúthghluaiseacht, fianaise doiléire/nochta/SI-TI, gearrthacha tapa le heireaball fada, agus deimhneachtaí bréagacha ó chéimniú de réir a chéile. Taifeadann sé am balla na réamhanailíse agus, nuair atá `/usr/bin/time` ar fáil, LAP an phróisis sliochtach agus buaic-RSS. Is oiricil struchtúracha amháin iad na seiceálacha cáilíochta. Fanann cáilíocht fhíorshamhla na bhfotheideal mar `HOLD` toisc nach bhfuil críochphointe údaraithe ná breitheamh reoite ag an gcreat tástála seo. Fanann coigilteas airgeadaíochta mar `HOLD` freisin mura soláthraíonn `--caption-cost-per-call-usd` meastachán sainráite dearfach ar an gcostas in aghaidh an ghlao; ní dhéanann an script ceachtar toradh a chumadh riamh.

Tá gach fráma teoranta do 4 MiB, gach amhfhráma le chéile do 23 MiB, agus
freagra srathaithe an bhróicéara do 32 MiB. Baintear eolaire sealadach príobháideach
in `finally`. Ní chuireann OmniRoute FFmpeg san áireamh agus ní ghlacann sé le conair
inrite shaincheaptha. Roimh fhotheidealú, cuireann an droichead pas coimeádach
dí-dhúblála amhairc i bhfeidhm: laghdaítear gach JPEG go maolán liathscála 16×16 agus
ní chuirtear i gcomparáid é ach leis an bhfráma deireanach a coinníodh. I gcás buiséad
fotheidealaithe iarrtha os cionn fráma amháin, soláthraíonn an t-eastóscadh
comhthiomsú teoranta iarrthóirí suas le dhá oiread an bhuiséid sin agus gan níos mó ná 16 fhráma riamh.
Ní chuirtear an uasteorainn iarrtha i bhfeidhm ach tar éis na dí-dhúblála, agus caomhnaítear
an chéad iarrthóir agus an t-iarrthóir deiridh a roghnaíodh le linn an tanaithe deiridh nuair atá an buiséad ar a laghad
dhá fhráma. Úsáideann an beartas le leagan
`grayscale-16x16-mean-cells-v2` an ceann is mó de mheándeilt luma agus
cóimheas na gceall mionsamhla a bhfuil a ndeilt normalaithe 0.05 ar a laghad. Is é
an tairseach dúblach an tairiseach 0.04, a roghnaíodh ar mhaithe le hintuarthacht seachas
é a nochtadh mar shocrú ag am rite. Caomhnaíonn an comhartha tánaisteach
ardchodarsnachta seo gluaiseacht bheag agus athruithe ar théacs infheicthe a d’fhéadfadh
comparáid bunaithe ar an meán amháin a cheilt. Má tharlaíonn earráidí sa chomparadóir nó sa díchódóir, teipeann siad ar bhealach oscailte agus coinnítear
an cumhdach. Scarann meiteashonraí aschuir na hiarrthóirí eastósctha, na frámaí
a úsáideadh go rathúil, agus na dúblaigh amhairc a fágadh ar lár.

Féadfaidh mír físeáin atá marcáilte go sainráite bileog theagmhála le stampaí ama a iarraidh. Tógann an
droichead greille JPEG nach mó ná 4 cholún agus 16 fhráma. Dónn gach cill 512 picteilín
stampa ama a foinse isteach i mbanda íochtair ardchodarsnachta, agus fanann na stampaí ama céanna
i meiteashonraí téacsúla le haghaidh comhcheangail agus iniúchta iartheachtaigh. Fanann an JPEG
iomlán teoranta do 32 MiB. Mura féidir le `sharp` an ghreille a dhíchódú nó a chumadh, téann an
droichead ar ais chuig na frámaí aonair JPEG; leanann scor ón gcliant de bheith á iomadú
trí oibríocht na bileoige.

Coinnítear fianaise ardaithe céime scartha d’aon ghnó ón micreathagarmharc sintéiseach
cumadóireachta. Sainmhíníonn `scripts/perf/video-bridge-contact-sheet-eval.ts`
creat tástála A/B le leagan scéime le haghaidh fíorshamhlacha físe atá comhoiriúnach le OpenAI. Tomhaiseann sé
comharthaí arna dtuairisciú ag an soláthraí, aga folaigh ó cheann ceann (cumadóireacht na bileoige san áireamh),
líon na nglaonna ar an tsamhail, agus coinneáil fíricí arna sainiú sa lastliosta. Ní scríobhtar freagraí amha
na samhla sa tuairisc; ní choinnítear ach achoimrí SHA-256 agus aitheantais na bhfíricí comhoiriúnaithe. Ní dhéanann an
creat aon ghlao líonra ná aon ghlao ar shamhail íoctha mura gcuirtear `--execute-real` ar aghaidh agus
mura bhfuil `--model`, `OMNIROUTE_BASE_URL`, agus `OMNIROUTE_API_KEY` cumraithe. Gan
an rith réadach sainráite sin, fanann a bhreithiúnas meaisín-inléite mar `HOLD`; ní hionann
tomhais shintéiseacha ar phálasta ná ar líon glaonna amháin agus fianaise ardaithe céime.

Féadfaidh glaoiteoirí eagar roghnach `transcript.cues` a cheangal le mír físeáin
lena dtacaítear nuair atá téacs ailínithe acu cheana féin. Ní mór do gach leid `text`, eatramh
críochta `start`/`end` laistigh den fhad ama braite, agus `source` ar an liosta ceadaithe
(`client`, `embedded`, nó `audio-bridge`) a bheith inti; is é `1` an luach réamhshocraithe do `confidence`
agus ní mór dó fanacht idir `0` agus `1`. Comhchuingítear leideanna atá díreach mar an gcéanna.
Ní chuireann OmniRoute tús riamh le tras-scríobh ó na meiteashonraí seo: cóipeáiltear leideanna bailíochtaithe
isteach sa toradh tuairiscithe in éineacht lena bhfoinse, lena muinín agus lena n-eatramh, agus
rindreáiltear iad mar bhreathnuithe neamhiontaofa taobh le fotheidil na bhfrámaí. Diúltaítear do théacs
neamhbhailí, as raon, nó gan bhunáitíocht seachas é a mheascadh isteach sa
sruth fotheideal. Normalaíonn an dá chainéal tras-scríbhinne i gcorp na hiarrata an bhunáitíocht a soláthraíodh
go `client`, lena n-áirítear lipéid fhéindearbhaithe `embedded` nó `audio-bridge`.
Ní féidir ach le hoiriúntóir atá faoi úinéireacht an fhreastalaí na lipéid iontaofa sin a shannadh tríd
an argóint cód-amháin `trustedSource`; ní féidir le réimse JSON iarrata an argóint
sin a bhaint amach. Fanann téacs tras-scríbhinne ina ábhar neamhiontaofa díorthaithe ó mheáin,
beag beann ar a bhunáitíocht, agus ní ceadmhach dó údarú a chinneadh riamh.

Féadfaidh glaoiteoir ardleibhéil rian `audioTranscript` a sholáthar don fhíseán céanna;
caitear leis mar théacs arna sholáthar ag an gcliant, ní mar chruthúnas ar thras-scríobh ón bhfreastalaí.
Ritheann an pointe cumaisc breathnuithe amhairc agus fuaime faoi
sprioc-am amháin agus comhartha scoir amháin, cuireann sé in ord iad ar amlíne choiteann, comhchuingíonn sé
dúblaigh atá díreach mar an gcéanna, agus tuairiscíonn sé toradh páirteach nuair nach n-éiríonn ach le taobh amháin.
Má tá `audioTranscript` neamhbhailí, díghrádaítear é go dtí an toradh páirteach sin — coinnítear an tuairisc
amhairc agus taifeadann an chraobh fuaime cód teipe sláintithe —
seachas go dteipfeadh ar an bhfíseán iomlán. Caomhnaítear infhaighteacht gach craoibhe, an bhratach pháirteach,
agus na cóid teipe sláintithe sa toradh tuairiscithe, i
meiteashonraí na ráillí cosanta (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i meiteashonraí taisce an toraidh, agus i gcuntair
chumaisc an droichid. Ní dhéanann cosán réamhshocraithe an Droichid Físeáin urlabhra-go-téacs a agairt
ná an dara cóip meán a íoslódáil; gan an rian sainráite sin, fanann sé
mar fhíseán amháin.

**Coinneáil tras-scríbhinní (#12150 P1).** Cuirtear é seo i bhfeidhm go huathoibríoch aon uair a
rindreálann an Droichead Físe (atá roghnach ann féin) leid tras-scríbhinne — níl aon
bhratach choinneála ar leith ann. Nuair a rindreálann iarratas leid tras-scríbhinne ar bith (`transcript` arna
dhearbhú ag glaoiteoir nó `audioTranscript` cumaiscthe), marcálann an ráille chosanta í mar
`videoBridgeObserved` agus táirgeann sé scáth folaithe de chur síos na físe —
rindreáil chomhionann ina gcuirtear
`[redacted-video-transcript]` in ionad chorp saorthéacs gach leide, arna tógáil trí réimse struchtúrtha na leide a
ionadú sula gcuirtear an teaghrán le chéile (ní dhéantar riamh é tríd an téacs leacaithe a pharsáil, ionas nach féidir le hábhar
ar bith ó leid — bíodh sé sáraíochta nó coitianta, lena n-áirítear coirp ina bhfuil `]` amhail
`[inaudible]`/`[music]` — teacht slán). Malartaíonn corp iarratais loga glaonna a choinnítear
gach cuid téacs a díorthaíodh ó fhíseán leis an scáth folaithe sin, arna mheaitseáil de réir comhionannas
inneachair; athléitear ancaire `fullText` ó phálasta críochnaithe na ráille cosanta
réamhghlao, ionas go n-éiríonn leis an meaitseáil fós tar éis do ráillí cosanta níos déanaí sa slabhra (na folaitheoirí PII agus
dintiúr, tosaíochtaí 10/95) téacs an chur síos a athscríobh ina áit agus
tar éis d’instealladh leid chórais/aistrithe comhthéacs/Memory eagar na dteachtaireachtaí a athmhúnlú. Ní athraítear an
corp a sheoltar suas an sruth chuig an tsamhail. Ní chuireann iarratas breathnaithe
aon sonraí isteach in Memory bhuan ach oiread (scipeáiltear asbhaintí a dhíorthaítear ón iarratas agus ón bhfreagra araon),
mar sin ní féidir le freagra na samhla féin téacs na tras-scríbhinne a athrá isteach in Memory.

**Réimsí amh físe (#12430).** Nuair atá an droichead cumasaithe agus nuair atá tacaíocht dhúchasach físe anaithnid nó in easnamh, gníomhachtaíonn réimsí sainithe `transcript`/`audioTranscript` `videoBridgeObserved` freisin, fiú tar éis teip ar an gcur síos nó teorainn `maxVideos`. Áirítear `null` agus teaghráin fholmha; ní áirítear réimsí atá as láthair ná meiteashonraí nach mbaineann le físeán. Déantar na réimsí seo a fholú i gcóipeanna coinnithe, nó fágtar an t-iarratas ar lár, agus seachnaítear taiscí/Memory.

Ar na conairí cúltaca sin, déantar codanna tacaithe `text`/`input_text` de leideanna bailí ón nglaoiteoir
seachas réimsí neamhchaighdeánacha soláthraí. Fanann an dá rian a soláthraíodh san iarratas
mar bhreathnuithe neamhiontaofa `client`, le rabhadh sainráite nár
cuireadh síos ar an bhfíseán agus nár fíoraíodh na stampaí ama i gcoinne na meán. Tá na
teorainneacha reatha 256 leid/64-KiB san iomlán agus in aghaidh na leide i bhfeidhm ar an dá rian le chéile;
ní mór do stampaí ama a bheith laistigh d’uasteorainn 600 soicind an bhróicéara agus d’aon fhuinneog
fócais a soláthraíodh. Caitear rianta neamhbhailí i leataobh; ní chuirtear ar aghaidh iad mar théacs treallach; féadfar
rian bailí gaolmhar a úsáid fós mura sáraítear a dteorainn chomhcheangailte. Ní chuireann réimsí `null`/folmha
aon téacs leis. Ní chuirtear aon aisghabháil meán ná tras-scríobh leis an gcúltaca seo.
Baintear réimsí sínte na tras-scríbhinne den iompróir físe cúltaca agus dá oibiachtaí
`video_url`/`source`. Fanann liosta ceadaithe sreinge OpenAI docht; fanann iompróirí
físe nach eol a dtacaíocht dhúchasach ar fáil agus coimeádann spriocanna aitheanta téacs-amháin marcóirí sábháilte.
Cosnaíonn scátha struchtúrtha folaithe téacs na tras-scríbhinne a cuireadh leis, agus
fanann an t-iarratas bunaidh ar leis an nglaoiteoir é gan athrú. Coinníonn spriocanna a bhfuil tacaíocht dhúchasach acu agus
droichid dhíchumasaithe a n-iompar seachanta reatha.

Úsáideann cóipeanna coinnithe breise an comhartha iarratais bhreathnaithe céanna. Déanann an léargas amh
réamh-ráille-cosanta ar iarratas an chliaint, an t-iarratas ar feitheamh sa chuimhne, agus loga luath
an iarratais dhiúltaithe ionadú struchtúrtha ar réimsí tras-scríbhinne i gcodanna físe;
déantar leideanna teaghráin a shintéisíonn céimeanna an phíblíne agus aistriú comhthéacs a fholú
ag linn scríbe chorp an iarratais choinnithe. Fágann an marcóir coinnithe `video_content_removed`
go dteipeann ar leanúint `previous_response_id` ar bhealach dúnta sábháilte seachas téacs
a caitheadh i leataobh d’aon ghnó a athchruthú. Má chailleann iarratas breathnaithe a
scáth folaithe in aghaidh na coda roimh logáil, nó mura n-éiríonn le fiú ceann amháin de roinnt scáthanna físe
meaitseáil tar éis athruithe níos déanaí ar an iarratas, fágtar corp an iarratais choinnithe
ar lár go hiomlán seachas tras-scríbhinn nach bhfuil folaithe ach go páirteach a choinneáil.

I gcás iarratais bhreathnaithe, d’fhéadfadh freagra samhla cuid ar bith den
tras-scríbhinn a lua gan teorainn struchtúrtha leide. Dá bhrí sin, cuirtear marcóir fága-ar-lár in ionad
`responseBody` a loga glaonna choinnithe; ní choinnítear déantán mionsonraithe
an phíblíne (a bhféadfadh coirp suas-srutha/cliaint agus smutáin srutha a bheith ann).
Seachnaíonn taiscí séimeantacha, idimpitéinse agus athsheinm-réasúnaithe
léamha agus scríbhinní don iarratas sin. Fanann iarratas an tsoláthraí agus an
freagra atá infheicthe ag an gcliant gan athrú. Draenáiltear bearta luatha coimeádta beo ón maolán sealadach
nuair a fhágtar an déantán mionsonraithe ar lár. Ní thuairiscíonn rabhadh Kiro faoi EventStream
míchumtha ach comhaireamh beart an phálasta, agus ní thuairiscíonn sé a inneachar ná amh-earráid pharsálaí
JSON riamh.
Ní mhaítear leis seo go ndearnadh iniúchadh ar gach diagnóis neamhghaolmhar soláthraí/breiseáin;
rianaítear an scuabadh níos leithne ar linnte scríbe coinnithe in #11658.

Is foshraith taisce ar leith, fíordheimhnithe le lúb-ais/comhartha, í saolré inmheánach
`/api/modality-bridge/video/drilldown`. Éilíonn gach oibríocht freisin
aitheantas príomhaí canónach teimhneach. Sula gcumasaítear glaoiteoir táirgeachta, ní mór dó
an t-aitheantas sin a dhíorthú ón tionónta fíordheimhnithe agus ní ceadmhach dó luach
arna roghnú ag an gcliant a chur ar aghaidh riamh. Ceanglaíonn eochracha taisce an príomhaí sin le haitheantais chanónacha seisiúin agus
tagartha físe, ní stórálann siad ach a n-eochracha díorthaithe ó SHA-256, agus cuireann siad léamha
agus scriosadh araon faoi raon feidhme an phríomhaí chéanna. Stórálann an taisce 16 fhráma JPEG
dhíorthaithe ar a mhéad in aghaidh na hiontrála, cuireann sí as feidhm iad tar éis deich nóiméad, agus tacaíonn sí le léamha teorannaithe
`start`/`end` nó le scriosadh sainráite seisiúin.

Tá gach príomhaí teoranta do 16 iontráil agus 64 MiB de shonraí JPEG canónacha. Tá na
teorainneacha sin neamhspleách ar an uasteorainn dhomhanda 64 iontráil/256 MiB: ní dhíshealbhaíonn brú cuóta
príomhaí ach na hiontrálacha is faide nár úsáideadh de chuid an phríomhaí sin sula ndéantar díbirt
LRU dhomhanda a mheas. Glantar iontrálacha atá imithe in éag ó chuntasaíocht an phríomhaí agus ón gcuntasaíocht
dhomhanda araon le linn gníomhaíocht taisce, agus ní dheimhníonn cealú ná teip bailíochtaithe
athsholáthar páirteach.

Diúltaíonn an taisce do Base64 neamhchanónta, do stuáil iomarcach, do mheáin nach JPEG iad, do JPEGanna míchumtha nó teasctha, agus do JPEGanna a ghineann rabhadh le linn díchódú teoranta láníomhá `sharp`. Ath-ionchódaíonn sé gach íomhá a nglactar léi mar JPEG canónta, díorthaíonn sé an leithead agus an airde ó na bearta díchódaithe seachas muinín a chur i réimsí an ghlaoiteora, agus caitheann sé aon bhearta ilglóiteacha leanúnacha i leataobh seachas iad a choinneáil. Ní ghearrtar ar an dá chuóta ach an maolán comhbhrúite canónta teoranta. Áirítear leis an teorainn JSON ar an tsreang forchostas Base64 don uasteorainn ionchuir dhíchódaithe 32 MiB. Déanann gach
díorthú stóráilte taifead ar a fhormáid/taifeach JPEG bailíochtaithe, ar an mbeartas samplála,
ar leagan an díorthaithe, ar am an chruthaithe, ar an hais ábhair arna ríomh ag an bhfreastalaí, agus ar
thagairt haisithe don tuismitheoir mar aon le hais ábhar tuismitheora an ghlaoiteora iontaofa. Seiceáiltear cealú
idir na céimeanna asincrónacha díchódaithe/haiseála roimh an ngealltanas adamhach taisce.

Ní nascann an chuid seo táirgeoir táirgeachta leis an mbealach go fóill agus ní
sholáthraíonn sí roghnú leaganacha iltaifigh. Dá bhrí sin, ní chuireann cosán iarratais trédhearcach
Video Bridge aon obair bhreise i bhfeidhm, agus tá díorthú príomhaí atá ceangailte le tionónta agus
saolré iomlán iltaifigh FU-08 fós ina n-obair leantach shainráite
seachas iad a bheith doiciméadaithe mar iompar críochnaithe.

Cuirtear fotheidil leis na frámaí go seicheamhach leis an tsamhail Video chumraithe. Faigheann
sárú folamh Video socrú Vision le hoidhreacht; má tá an dá cheann folamh, roghnaíonn
uath-ródaire Vision an tsamhail éifeachtach atá in ann fís a phróiseáil. Tagann fotheidil rathúla
in ionad na bunchoda le réimír chobhsaí `[Video description:` a
mharcálann an téacs freisin mar bhreathnóireacht neamhiontaofa atá díorthaithe ó mheáin agus a insíonn do
shamhlacha iartheachtacha gan treoracha a fhaightear sna meáin a leanúint. Áirítear in eochracha taisce
fhotheidil na bhfrámaí na bearta JPEG, an leid, an stampa ama, agus an tsamhail éifeachtach; ní chuirtear ach
fotheidil rathúla i dtaisce. Coinníonn iontrálacha taisce an tsamhail táirgeora ar éirigh léi i ndáiríre,
lena n-áirítear samhail chúltaca; tuairiscíonn an droichead `mixed` nuair a
táirgeadh frámaí éagsúla le samhlacha éagsúla. Athúsáideann amas taisce aitheantas an táirgeora sin
seachas é a athlipéadú mar an bplean ródaithe iarrtha. Tá taisce thoradh an
fhíseáin iomláin eochraithe de réir gach ionchuir a athraíonn an t-aschur — an leid, an tsamhail éifeachtach,
an beartas samplála, líon na bhfrámaí, mód na hanailíse séimantaí, méarlorg SHA-256
na leide fócasaithe normalaithe, an fhuinneog fócais, `transcript`,
`audioTranscript`, agus bratach na bileoige teagmhála — mar sin is teip taisce é athrú ar aon cheann de na
toisí sin, agus ní athúsáid sheanchaite riamh. Tá leagan an bheartais dídhúblála amhairc,
an tairseach, agus líon teoranta na bhfrámaí iarrthacha sainráite freisin in
eochair agus meiteashonraí thaisce na dtorthaí; dá bhrí sin, ní féidir le hathrú beartais cur síos
seanchaite ar an bhfíseán iomlán a athúsáid. Coinníonn meiteashonraí v4 thaisce na dtorthaí an mód agus
an méarlorg, ach ní choinníonn siad tasc amh an úsáideora riamh. Tuairiscíonn meiteashonraí na ráillí cosanta an dá
mhodh anailíse, an ceann iarrtha agus an ceann éifeachtach; tuairiscítear mód `focused` iarrtha nach bhfuil
téacs úsáideora inúsáidte aige mar `full` go héifeachtach.

Baineann an ráille cosanta gach cuid físe a dtacaítear léi amach ach ní dhéanann sé cur síos ar níos mó ná
`modalityBridgeVideoMaxVideos`. I gcás sprice ar cruthaíodh go bhfuil
`supportsVideo === false` aici, déantar marcóirí téacs sábháilte sainráite d'fhíseáin ar theip orthu agus
d'fhíseáin thar an teorainn ionas nach maireann aon fhíseán amh. Nuair nach eol an acmhainn, coinníonn na codanna sin
a n-iompróir físe; leanann aon tras-scríbhinn chúltaca an tiontú téacs teoranta thuas.
Seachnaíonn spriocanna a bhfuil `supportsVideo === true` acu an droichead.
Iomadaítear comhartha tobscortha iarratas an chliaint tríd an íoslódáil, ciú an bhróicéara,
fo-phróisis, agus glaonna fotheidil; stopann tobscortha idir físeáin agus ní theipeann siad ar oscailt
do mheáin amh riamh.

Tá socruithe ama rite tacaithe ag DB agus bailíochtaithe ag Zod:

| Eochair                             | Réamhshocrú | Raon / iompar                                                                                                          |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Am rite roghnach, rogha isteach                                                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | Caomhnaíonn `full` fotheidil ghinearálta; úsáideann `focused` comhthéacs teoranta neamhiontaofa ón úsáideoir is déanaí |
| `modalityBridgeVideoModel`          | `""`        | Faigh samhail Vision Bridge le hoidhreacht                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, nó `segment_aware` comhréireach; filleann teip an bhrathadóra ar `uniform`                   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                         |

Déantar luachanna oidhreachta marthanacha d'am istigh Video atá os cionn 120 soicind a chlampáil go dtí
sprioc-am an bhróicéara; diúltaítear do scríbhinní nua socruithe os cionn na teorann sin.
Éilíonn `GET /api/modality-bridge/video/runtime` logántacht ais-lúibe stampáilte iontaofa
roimh fhíordheimhniú nó iniúchadh ama rite, agus ansin éilíonn sé fíordheimhniú bainistíochta.
Ní fhilleann sé ach `available`, leaganacha sláintithe FFmpeg/ffprobe, agus cúis sheasta
nuair nach bhfuil an t-am rite ar fáil. Ní API uaslódála poiblí é an críochphointe inmheánach
asbhainte: filleann sáithiú an chiú `503` móide `Retry-After`, filleann dínascadh
glaoiteora `499`, agus filleann sprioc-am seasta an bhróicéara `504`. Cuireann freagraí tiontaithe
`video->text;model=<visionModel>;parts=<videos>` leis an gceanntásc lárnach
`x-omniroute-modality-bridge` gan míreanna Vision ná Audio a bhaint.

### Mascálaí PII (`piiMasker.ts`)

Ritheann sé sa **dá** chéim.

- Déanann **`preCall`** an pálasta a chlónáil, siúlann sé trí `system`, `messages`, `input`, agus
  `prompt` (lena n-áirítear míreanna gnáth-théacs), agus cuireann sé `processPII()` (ó
  `@/shared/utils/inputSanitizer`) i bhfeidhm ar réimsí teaghráin `content`/`text`. Nuair atá
  `PII_REDACTION_ENABLED=true`, déantar PII braite a cheilt sa phálasta
  amach. Tá sé seo neamhspleách ar `INPUT_SANITIZER_MODE` (nach rialaíonn ach
  polasaí insteallta leid). Nuair atá an cheilt múchta, taifeadann an glao
  comhair na mbrathadán gan an t-inneachar a athscríobh.
- Déanann **`postCall`** an freagra a chlónáil go domhain, ritheann sé `sanitizePIIResponse()` mar aon
  leis an mascóir do chruth Responses API (`maskResponsesOutput` — clúdaíonn sé
  `output_text` agus `output[].content[].text`). Má dhéantar aon cheilt, cuirtear an
  freagra modhnaithe in ionad an fhreagra bhunaidh.

Ní chuireann an ráille chosanta bac riamh; ní dhéanann sí ach anótáil (`meta.detections`,
`meta.redacted`) nó athscríobh.

#### Roghnú de réir cineáil, patrúin shaincheaptha agus cuntair bhrathadóireachta

Roghnaíonn **Deais → Socruithe → Slándáil → Mascáil PII** _cad_ a mhasctar. Ní
chuireann sé an mhascáil ar siúl: is iad `PII_REDACTION_ENABLED` (iarratas) agus
`PII_RESPONSE_SANITIZATION` (freagra + SSE) a dhéanann sin fós, agus tá an dá cheann
múchta de réir réamhshocraithe.

- **Roghnú de réir cineáil** — liostaítear na haitheantais ionsuite in
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Mura socraítear é, ciallaíonn sé gach
  cineál (an t-iompar a bhí ann sular cuireadh an socrú seo leis). Mapálann patrún
  `ssn_us` inneall an iarratais go `ssn`. Ní dhéanann teimpléid (Íosta, Caighdeánach, Airgeadais,
  Brasaíleach, SAM, Iomlán) ach na ticbhoscaí sa chomhéadan úsáideora a líonadh.
- **Patrúin shaincheaptha** — suas le 20 patrún slonn ionadaíochta nó saoróg (`*` = suas le 64
  carachtar nach spás bán iad, `?` = ceann amháin). Déantar `[CUSTOM_REDACTED]` de na meaitseálacha.
  Téann gach patrún trí `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): 500 carachtar ar a mhéad, bratacha teoranta
  do `g i m s u`, ní mór dó tiomsú, ní mór dó pas a fháil i `safe-regex` (aisrianú
  tubaisteach), agus ní ceadmhach dó teaghrán folamh ná ionadchoinneálaí ceilte a mheaitseáil.
  Diúltaítear do phatrún a theipeann nuair a shábháiltear agus nuair a thástáiltear é, agus
  scipeáiltear ró stóráilte a theipeann ag am rite seachas é a thiomsú. Ní ritheann patrúin
  shaincheaptha ach amháin nuair atá an mhascáil ar siúl.
- **Cuntair bhrathadóireachta** — comhair de réir cineáil (ní luachanna meaitseáilte riamh), a choinnítear sa
  chuimhne agus a athshocraítear ar atosú (`src/lib/pii/piiDetectionStats.ts`). Ní
  mhéadaíonn siad ach amháin nuair atá an mhascáil ar siúl.

Coinnítear na socruithe sa tábla `key_value` (ainmspás `pii_settings`,
`src/lib/db/piiSettings.ts`) agus léitear iad trí thaisce 1 s. API:

| Modh   | Conair                   | Cuspóir                                                                                   |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Staid na brataí, `enabledTypes`, `customPatterns`, cuntair bhrathadóireachta              |
| `PUT`  | `/api/settings/pii`      | Ionadaigh `enabledTypes` (`null` = gach ceann) agus/nó `customPatterns`                   |
| `POST` | `/api/settings/pii/test` | Tástáil thirim ar phatrún amháin i gcoinne sampla 8 KB ar a mhéad; ní stóráiltear aon rud |

Éilíonn na trí cinn fíordheimhniú bainistíochta agus bailíochtaíonn siad an corp le Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Instealladh Leid (`promptInjection.ts`)

Aimsíonn sé struchtúir naimhdeacha in inneachar arna sholáthar ag úsáideoirí agus cuireann sé an
polasaí cumraithe i bhfeidhm. Rialaítear an t-iompar le hathróga timpeallachta agus roghanna
an chruthaitheora:

| Socrú             | Athróg timpeallachta                                                                                  | Réamhshocrú | Éifeacht                                                                                                                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cumasaithe        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`      | Nuair atá sé `false`, scoireann an ráille chosanta go luath.                                                                                                                                                               |
| Mód               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`      | Polasaí insteallta: `block`, `warn`, nó `log`. (Glactar le `redact` ar mhaithe le comhoiriúnacht siarghabhálach ach **ní** bhaineann sé téacs insteallta; rialaítear athscríobh PII iarratais le `PII_REDACTION_ENABLED`.) |
| Tairseach blocála | rogha `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (ailias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | An déine íosta is gá chun bac a chur. Is breathnóireacht amháin atá sa mheánleibhéal de réir réamhshocraithe.                                                                                                              |

**Tosaíocht mód** (`getMode`): `options.mode` an ghlaoiteora →
sárú **brataí gné DB** `INJECTION_GUARD_MODE` (Deais → Socruithe →
Bratacha Gnéithe) → athróg timpeallachta `INJECTION_GUARD_MODE` → athróg timpeallachta `INPUT_SANITIZER_MODE` →
`warn`. Dá bhrí sin, bíonn tosaíocht ag sárú ón deais ar na hathróga timpeallachta, ionas go
rialaíonn comhéadan Bratacha Gnéithe an ráille chosanta atá ag rith go beo (gan atosú). Tá léamh an DB
slán i gcás teipe: má tharlaíonn earráid, filleann an ráille chosanta ar an iompar bunaithe ar an
timpeallacht, agus nuair nach bhfuil sárú socraithe bíonn an t-iompar comhionann le réiteach
bunaithe ar an timpeallacht amháin.

Foinsí braite:

1. `sanitizeRequest()` ó `@/shared/utils/inputSanitizer` (tacar brathadóirí comhroinnte
   a úsáidtear in áiteanna eile sa phíblíne).
2. `DEFAULT_GUARD_PATTERNS` ionsuite (`system_override_inline` agus
   `markdown_system_block` faoi láthair, an dá cheann de dhéine `high`).
3. `customPatterns` roghnacha a chuirtear ar aghaidh trí roghanna an chruthaitheora (teaghráin, sloinn ionadaíochta,
   nó taifid `{ name, pattern, severity }`).

Nuair atá `mode === "block"` **agus** nuair a shroicheann aon bhrath amháin ar a laghad an tairseach déine, tugann `preCall` `{ block: true, message: "Request rejected: suspicious content detected" }` ar ais. I módanna `warn`/`log` déanann an garda cosanta logáil ach ceadaíonn sé an glao. Tá an chabhair chomhroinnte `evaluatePromptInjection()` easpórtáilte freisin do ghlaoiteoirí ar gá dóibh leideanna a mheasúint gan dul tríd an gclárlann.

**Teorainn scanadh (v3.8.20):** ní scrúdaíonn an braiteoir ach an **chéad 16 KB** den téacs leide comhcheangailte — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 beart) i `src/shared/utils/inputSanitizer.ts`. Déanann `detectInjection()` agus `evaluatePromptInjection()` araon `slice(0, MAX_INJECTION_SCAN_BYTES)` sula ritheann siad lúb na bpatrún. Bíonn treoracha insteallta gar do mhullach an ionchuir, mar sin cuireann sé seo teorainn le CPU/GC an regex ar ualaigh ilchéad-KB gan an brath a lagú (cf. #3932, #4041).

### Mascaire Dintiúr (`credentialMasker.ts`)

Ritheann sé ar **an dá** chéim, ar deireadh sa tslabhra réamhshocraithe (tosaíocht `95`). Cealaíonn sé patrúin aitheanta eochair-API / comhartha rúnda ón ualach amach (ábhar teachtaireachta, argóintí glao-uirlise, torthaí uirlise) **agus** ó fhreagra an tsoláthraí, ionas nach sceithfear dintiúr a ghreamaítear i leid (nó a mhacasamhlaítear ar ais ag toradh uirlise) chuig an soláthraí suas shrutha ná ar ais chuig an gcliant.

- **Trí roghnú isteach amháin**, an coinbhinsiún céanna le cealú PII (gar do Riail Chrua #20):
  díchumasaithe mura `settings.credentialRedactionEnabled === true` **nó**
  `CREDENTIAL_REDACTION_ENABLED=true`. Nuair atá sé as, is no-op é an garda
  cosanta — ní chuireann sé cosc riamh agus ní athscríobhann sé riamh.
- Siúlann `redactCredentials()` crann iomlán an ualaigh/an fhreagartha
  (`walkValue()`, sábháilte ó thruailliú fréamhshamhla, sábháilte ó
  thimthriallacha trí `WeakSet`) agus cuireann sé comhartha ionaid
  `[REDACTED:<type>]` in ionad na meaitseálacha, gan a chlónáil ach na géaga a
  athraíodh go deimhin.
- Clúdaíonn `CREDENTIAL_PATTERNS` eochracha soláthraithe LLM (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), comharthaí VCS/SaaS
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), eochracha íocaíochta
  (Stripe, Square), eochracha néil (eochair rochtana AWS, Twilio, SendGrid,
  Mailgun), eochracha príobháideacha / JWTanna, teaghráin cheangail a
  iompraíonn dintiúir (`mongodb://user:pass@...`, srl.), agus patrún
  ginearálta luach ceanntásca `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Déantar eochracha cruthaithe mar cheanntásca (`authorization`, `x-api-key`,
  `api-key`, `apikey`) a chealú go struchtúrtha (an luach amháin, réimír scéime
  cosúil le `Bearer `/`Basic ` caomhnaithe) seachas tríd an regex téacs
  ginearálta.
- Ní chuireann an garda cosanta cosc riamh; ní dhéanann sé ach athscríobh
  (`modifiedPayload` / `modifiedResponse`) agus nótáil
  (`meta.credentialsRedacted`, `meta.count`).

Garda cúlchéimnithe: `tests/unit/credential-masker-guardrail.test.ts`.

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

I gcás gach iarratais a shreabhann trí `src/sse/handlers/chat.ts` agus
`open-sse/handlers/chatCore.ts` (na bealaí den teaghlach comhrá atá liostaithe faoi
[Clúdach agus teorainneacha](#coverage-and-limits)):

1. Tógann `resolveDisabledGuardrails(...)` an liosta scipeála ón eochair API, ón
   gcorp agus ó na ceanntásca.
2. Ritheann `guardrailRegistry.runPreCallHooks(body, ctx)` na garda-rialacha in
   ord tosaíochta méadaitheach:
   - Déantar garda-rialacha díchumasaithe a thaifeadadh mar `skipped`.
   - Féadfaidh `preCall` gach garda-rialachais an t-ualach a athscríobh trí
     `modifiedPayload`.
   - Déanann an chéad `block: true` gearrchiorcad ar an slabhra agus cuireann an
     láimhseálaí freagra diúltaithe ón ngarda-rialachas ar ais.
3. Sreabhann an t-ualach (a d'fhéadfadh a bheith athscríofa) isteach sa ródú
   teaglama agus sa dáileadh suas srutha.
4. **Neamh-shruthaithe amháin:** tar éis an freagra a chur le chéile,
   ritheann `guardrailRegistry.runPostCallHooks(...)` an slabhra céanna ar an
   bhfreagra. Scaoileann `block: true` anseo an freagra suas srutha agus
   cuirtear HTTP 400 ar ais. Scipeálann freagraí sruthaithe an chéim seo go
   hiomlán.

Déantar garda-rialacha a chaitheann earráid a thaifeadadh le `error: <message>`
agus déantar iad a logáil trí `logger.warn`, ach leanann an slabhra ar aghaidh —
teip-oscailte de réir dearaidh.

## Clúdach agus teorainneacha

Níl clárlann na ngarda-rialacha sreangaithe isteach ach i bpíblíne an chomhrá
amháin. Tá na teorainneacha seo daingnithe ag
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` agus
`tests/unit/guardrail-pipeline-characterization.test.ts`; nuashonraigh na
tástálacha sin go d'aon ghnó nuair a athraíonn an t-iompar.

### Cá ritheann na crúcaí

| Crúca / rialtán                         | Ritheann sé ar                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                       | Iarratais arna láimhseáil ag `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (agus `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, agus seachfhreastalaí comhrá Telegram. Chomh maith le pointe deiridh tástála an deais `/api/guardrails/test`. Cuireann bloc réamhghlao HTTP 400 ar ais. |
| `runPostCallHooks`                      | Freagraí comhrá **neamh-shruthaithe** amháin (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Ní shroicheann freagraí sruthaithe riamh é.                                                                                                                                                                                                                                                                                                                       |
| PII sruthaithe                          | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), píobáilte i `streamingPipeline.ts` nuair atá `PII_RESPONSE_SANITIZATION` ar siúl. Ní garda-rialachas é, mar sin ní dhéanann na cainéil dhíchumasaithe difear dó.                                                                                                                                                                                                                                         |
| Idirmheán injection-guard (oidhreachta) | Gach bealach `/v1` a iompraíonn leid, an teaghlach comhrá san áireamh (féach [clúdach bealaí](#injection-guard-route-coverage--red-team-phase-8--block-d)). Instealladh leide amháin.                                                                                                                                                                                                                                                                                  |

### Rud nach bhfuil clúdaithe

- **Bealaí meán, leabuithe agus sonraí** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) ní shroicheann siad an chlárlann
  riamh. Ní ritheann aon mhasclú PII, masclú dintiúir ná droichead modhúlachta
  ansin. Is é an t-idirmheán injection-guard oidhreachta an t-aon sheiceáil atá
  acu.
- **Freagraí sruthaithe** ní fhaigheann siad aon gharda-rialacha iarghlao: gan
  `pii-masker` ná `credential-masker` iarghlao, agus gan aon bhloc iarghlao. Ní
  bhaineann ach an t-athrú PII sruthaithe (nuair atá
  `PII_RESPONSE_SANITIZATION` ar siúl). Ní cheiltear dintiúir a mhacallaítear ar
  ais i bhfreagra sruthaithe.
- **Cainéil dhíchumasaithe vs. an t-idirmheán (de réir dearaidh):** déanann an
  t-idirmheán instealladh leide a mheas lena ghlao féin ar
  `evaluatePromptInjection()`, gan aon liosta díchumasaithe faoi rialú an
  ghlaoire a chur ar aghaidh. Is teorainn éigeantach é an mód `block` nach
  féidir le díchumasuithe faoi rialú an ghlaoire a sheachaint, lena n-áirítear ar
  bhealaí an teaghlaigh chomhrá
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Ní
  dhéanann díchumasú `prompt-injection` ach garda-rialachas na clárlainne a
  scipeáil.

### Cad a fheiceann freagra roimh an iarghlao

Ar an gcosán neamh-shruthaithe, is é an t-ord atá ann: eastóscadh cuimhne →
forghníomhú uirlise ionsuite → garda-rialacha iarghlao → imeacht an bhloic
iarghlao → stóráil sa taisce séimeantach.

- Feiceann **eastóscadh cuimhne** agus **forghníomhú uirlisí** an freagra sula bhféadfaidh na gardaí iar-ghlao é a athscríobh nó a chosc. Ó
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ritheann eastóscadh cuimhne an téacs eastósctha trí `sanitizePII` nuair atá
  `PII_RESPONSE_SANITIZATION` ar siúl (sa mhodh sruthaithe agus neamhshruthaithe araon), ach tá freagra a choscfaidh na gardaí iar-ghlao níos déanaí tairgthe cheana féin don chuimhne agus do na huirlisí.
- Stórálann **an taisce séimeantach** an freagra tar éis na n-gardaí iar-ghlao, mar sin stórálann sé an freagra athscríofa, agus ní dhéantar freagra blocáilte a thaisceadh riamh. Tá iontrálacha taisce eochraithe de réir eochair API.

## Cumraíocht

Athróga timpeallachta a léitear ag na cosantóirí ionsuite:

| Athróg                                | Úsáidte ag                | Éifeacht                                                                                                           |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Socraigh `false` chun an bhrath a dhíchumasú go hiomlán.                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Beartas insteallta: `warn`, `block`, nó `log`. Ní athscríobhann an luach oidhreachta `redact` téacs an insteallta. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mód an gharda insteallta; is bratach gné DB í freisin a **sháraíonn** na hathróga timpeallachta (DB > ENV).        |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | An íosghrádú tromchúiseachta a dhiúltaíonn `MODE=block`: `high` (réamhshocrú), `medium`, nó `low`.                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Ailias oidhreachta le haghaidh `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Nuair is `true` é, déantar PII an iarratais a cheilt (neamhspleách ar mhodh an insteallta).                        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (sruth síos) | Rialaíonn sé iompar an mhaiscéara ar thaobh an fhreagartha.                                                        |

Léann cosantóirí an Modality Bridge an chumraíocht rith-ama ón stóras
socruithe atá bunaithe ar DB (`getSettings()`), seachas ó athróga
timpeallachta. Is iad príomh-eochracha na Físe ná
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, agus
`modalityBridgeCacheMaxEntries`. Ní ghlactar leis na heochracha oidhreachta
`visionBridge*` ach mar chúltaca léithe aon-thimthrialla atá doiciméadaithe;
úsáideann scríobhithe an deais na príomh-eochracha. Tá na réamhshocruithe
agus an réiteoir cúltaca lonnaithe i
`src/shared/constants/modalityBridgeDefaults.ts`, agus tá tairisigh
oidhreachta coinnithe i `src/shared/constants/visionBridgeDefaults.ts`.

Úsáideann an Fhuaim `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, agus `modalityBridgeAudioMaxClips`, chomh maith
leis na socruithe comhroinnte `modalityBridgeCache*`. Níl aon chúltaca
eochrach oidhreachta ag an bhfuaim mar gur in éineacht le scéimre an Modality
Bridge a tugadh isteach na heochracha seo.

Úsáideann an Fhíseán `modalityBridgeVideoEnabled`,
`modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, agus
`modalityBridgeVideoTimeout`, chomh maith leis na socruithe comhroinnte
`modalityBridgeCache*`. Tá sé díchumasaithe de réir réamhshocraithe mar gur
spleáchais oibríochtúla roghnacha iad FFmpeg/ffprobe agus go gcuireann
fotheidealú frámaí moill agus costas samhla leis.

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
