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

### Droichead Físeáin (`videoBridge.ts`, `videoBridgePipeline.ts`)

Idircheapann sé páirteanna físeán barrleibhéil i Críochnú Comhrá `messages` agus Freagraí API `input` sula dtugtar sprioc gan tacaíocht físe dúchais aitheanta. Is iad na cruthanna tacaithe ná `input_video`, `video_url`, `video_source`, HTTPS URLs, agus `data:video/*;base64,...` data URIs. Ní láimhseáiltear gnáthainmneacha i dtéacs mar fhíseán.

Is leis `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) trasnú iarratais, an tseiceáil capability/policy, comhiomlánú in aghaidh an iarratais, agus an pálasta freagartha. Per-físeán obair — fháil, an taisce lán-toraidh, ag cur síos ar seicheamh fráma (a chomhdhéanann aon athscríbhinn fuaime glaoiteoir-dearbhaithe), agus in aghaidh an iarracht metrics/abort/cleanup — i bhfolach taobh thiar `processVideoPart` i `videoBridgePipeline.ts`, ar a dtugtar uair amháin in aghaidh an chuid físeáin taobh istigh lúb `preCall` ar. Sainítear sa mhodúl sin freisin na teorainneacha follasacha poirt `VideoMediaBrokerPort` (beart a fháil agus frámaí samplacha a bhaint as), `VideoAudioTranscriptionPort` (tras-scríbhinn fuaime dearbhaithe ag an nglaoiteoir a chomhleá leis na fotheidil sampláilte), agus `VideoDrilldownPort` (an cruth oidhreachta amh-stórála). Tá táirgeadh STT agus coinneáil fráma comhdhéanta timpeall an chalafoirt cur síos trí `createVideoSttAdapter` agus `createVideoDrilldownAdapter`; úsáideann an dara ceann an saolré comhroinnte láimhseála teimhneach.

Ní iompórtálann conair iarratais `/v1` poiblí ná ní dhéanann sé fophróiseas a agairt. Déantar físeáin iargúlta a íoslódáil faoi cheangal 50 MiB ; tá caipín coimeádach 36 MiB díchódaithe in aghaidh an fhíseáin ag físeáin inlíne base64 ionas gur féidir leis an gclúdach model/messages/framing fanacht taobh istigh den teorainn iontrála iarratais poiblí JSON de 50 MiB. Seiceáiltear meastacháin ar fhad inlíne agus ar mhéid díchódaithe roimh leithdháileadh. Tá HTTPS ag teastáil ar an URL cianda tosaigh agus gach atreorú, ag baint úsáide as an ngarda amach poiblí amháin atá ann cheana féin le feannadh DNS. Trasnaíonn na bearta ansin teorainn chruinn an bhróicéir `POST /api/modality-bridge/video/extract` inmheánach. Is é an bealach sin `LOCAL_ONLY` agus `SPAWN_CAPABLE` araon, ní ghlacann sé ach le hiarratas fíordheimhnithe in aghaidh an phróisis, a bhfuil muinín as a ais, agus ní ghlacann sé riamh le URL, conair chórais comhaid, inrite nó liosta argóinte. Déanann píblíne méid comhlacht API agus léitheoir comhlacht incriminteach an láimhseálaí caipín ionchuir bróicéir 50 MiB a fhorfheidhmiú go neamhspleách. Ritheann a scuaine teorann eastóscadh amháin ag an am, ceadaíonn sé ceithre phost ar feitheamh, agus caipíní ar feitheamh ionchur ag 100 MiB.

Taobh istigh den bhróicéir, léann `ffprobe` comhad áitiúil príobháideach; ní áirítear seinmliosta agus formáidí follasacha sa cheadliosta formáide seasta. Maidir le coimeádáin MOV-teaghlaigh ceadaithe, fanann tagairtí sonraí seachtracha MOV díchumasaithe de réir réamhshocraithe, agus ní roghnaíonn an t-ordú seasta iad. Úsáideann an dá `ffprobe` agus `ffmpeg` an liosta bán prótacal `file` -only, snáithe amháin, eagair argóintí seasta, gan aon bhlaosc, agus inrite a réiteach ó `PATH`. Ní iarrthóirí is féidir a imirt ar shruthanna clúdaigh pictiúr faoi iamh. Ní mór do gach sruth is féidir a sheinm na teorainneacha a shásamh, agus is fearr sruth réamhshocraithe sainráite roimh an aisíocaíocht cinntitheach is ísle. Tá físeáin teoranta do 600 soicind, 8,192 picteilín in aghaidh an toise, agus 33,554,432 picteilín foinse. samplaí FFmpeg 1-16 lárphointe frámaí JPEG, scálaí síos an imeall fada go 1,024 picteilín ar a mhéad gan ionchuir níos lú a ardú, agus ní fhaigheann URL. Is `uniform` é an sampláil de réir réamhshocraithe. Comhlíonann na beartais roghnacha `scene_aware` agus `segment_aware` turgnamhacha pas seasta FFmpeg amháin breise thar an sruth áitiúil atá bailíochtaithe cheana féin, roghnaigh stampaí ama radhairc `showinfo` teorannaithe, agus titim siar go cinntitheach go dtí na lárphointí aonfhoirmeacha céanna maidir le teip braite, teorainn ama, aschur míchumtha, nó sraith iarrthóirí folamh. Leithdháileann mód feasach ar dheighleog samplaí lárphointe go comhréireach leis na tréimhsí radhairc bailíochtaithe; Sonraítear thíos fianaise atá feasach ar an deighleog agus iompar cúltaca. Cuirtear an caipín crua 16-fhráma i bhfeidhm tar éis an roghnúcháin i ngach polasaí. Nuair nach bhfuil ach buiséad aonfhráma ag iarratas a fheasach don radharc, úsáideann sé lárphointe aonfhoirmeach na fuinneoige lánfhíse nó na fuinneoige fócais gníomhach agus tuairiscíonn sé `policyEffective: uniform`: ní féidir le fráma radhairc amháin roghnaithe an dá chríoch ama a chaomhnú. Féadfaidh glaoiteoir fuinneog fócais chríochnaithe a sholáthar go roghnach (`start`/`end` soicind); déantar teorainneacha a chlampáil go fad na meán, diúltaítear d'fhuinneoga droim ar ais nó fuinneoga neamhchríochnaithe, agus ní dhéantar gach beartas samplála ach amháin laistigh den eatramh normalaithe. Tá an fhuinneog mar thoradh air seo san áireamh i meiteashonraí samplála agus sa réimír tuairisce neamhiontaofa ionas gur féidir le samhlacha iartheachtacha sliocht dírithe a idirdhealú ón amlíne iomlán.

Is suíomh follasach ar leith é fócas fotheideal shéimeantach. Coimeádann an modh réamhshocraithe anailíse `full` an leid fráma atá ann faoi láthair agus ní chuireann sé téacs iarratais ar aghaidh chuig an tsamhail fotheideal. I mód `focused`, ní léann an droichead ach an `text`/`input_text` údar neamhfholamh is déanaí ón gcoimeádán Comhrá nó Freagraí céanna, normalaíonn sé go NFC, laghdaítear carachtair rialaithe agus spás bán, agus cuireann sé teorainn le 500 cód cód Unicode é. Titeann toradh folamh ar ais go dtí an leid cruinn `full`. Cuirtear leid inúsáidte sraitheach mar JSON i mbloc tiomnaithe comhthéacs úsáideora neamhiontaofa agus ní fhéadfaidh sé ach sonraí inbhraite a chur in ord tosaíochta; ní féidir leis an rabhadh ar leith a shárú i gcoinne treoracha a leanúint atá infheicthe nó inchloiste sna meáin. Ní bhaineann fócas téacsúil go deo `start`/`end` ná ní athraíonn sé an samplóir ama.

#### FU-07 fianaise deighleog struchtúrach

Úsáideann `segment_aware` pas réamh-anailís teoranta amháin thar an sruth físeáin áitiúil atá bailíochtaithe cheana féin. Scálaíonn an slabhra seasta scagaire go 320 picteilín ar a mhéad ar leithead ar a mhéad, braiteann sé athruithe radharc agus eatraimh reoite, ansin samplaí ag fráma 1 in aghaidh an tsoicind le haghaidh faisnéise doiléir, meánúma agus spatial/temporal. Tá an pas teoranta do 600 sampla struchtúrach, snáithe amháin FFmpeg/filter, an prótacal `file` -only céanna agus cead liostaí coimeádán, aschur próiseas 1 MiB faoi cheangal, agus ar a mhéad 30 soicind taobh istigh de abort/deadline. roinnte an bhróicéir Ní ghlacann sé ordú, scagaire, cosán, nó URL ón iarratas.

Fianaise samplála cinntitheach atá sna luachanna struchtúracha, ní físthuiscint shéimeantach. Ní dhéanann siad tátal a bhaint as ábhair, gníomhartha, fotheidil, urlabhra nó rún úsáideora. Déanann teorainneacha radhairc agus reo codanna; Ní bhíonn tionchar ag clúdach reo, doiléire, nochta, sonraí spáis, agus athrú ama ach ar an gcaoi a leithdháiltear an creatbhuiséad 1-16 atá ann cheana féin. Cuirtear teorainn ar fhráma amháin ar mhír lán-reoite, agus bíonn teascáin neamhreoite san iomaíocht don bhuiséad atá fágtha. Nuair a bhíonn teorainneacha níos mó ná frámaí, coinnítear clúdach aonfhoirmeach amlíne ionas nach féidir le ciorruithe tapa tapa deighleog fhada rianaithe a cheilt. Comhcheanglaítear teorainneacha radhairc laistigh den taifeach anailíse 1 soicind ar theorainn reo.

Teipeann ar scagairí ar iarraidh, fianaise malformed/empty, earráid brathadóireachta, nó an teorainn ama réamh-anailísithe ar oscailt don bheartas lárphointe aonfhoirmeach cruinn. Ní theipeann ar ghinmhilleadh glaoiteoir nó spriocdháta bróicéir a oscailt: cuireann sé deireadh leis an bhfophróiseas in-eitilte, cuireann sé cosc ar eastóscadh fráma níos déanaí, agus baintear an crann sealadach príobháideach i `finally`.

Gineann `scripts/perf/video-bridge-fu07-eval.ts` daingneáin FFmpeg fíor-chinntitheacha le haghaidh coigilteas iar-dedup fortheideal-ghlao, leithdháileadh buiséid dlúth-tairiscint, fianaise blur/exposure/SI-TI, ciorruithe tapa le heireaball fada, agus dearfacha bréagacha céimnithe de réir a chéile. Taifeadann sé am balla réamh-anailísithe agus, áit a bhfuil `/usr/bin/time` ar fáil, leanbh CPU agus buaic RSS. Is oracles struchtúracha amháin a seiceálacha cáilíochta. Tá fíor-chaighdeán múnla fotheideal fós `HOLD` mar níl aon chríochphointe údaraithe nó breitheamh reoite ag an úim seo. Fanann coigilteas airgeadaíochta `HOLD` freisin mura soláthraíonn `--caption-cost-per-call-usd` meastachán dearfach follasach in aghaidh an ghlao; ní dhéanann an script ceachtar toradh.

Tá gach fráma teoranta do 4 MiB, gach fráma amh le chéile go 23 MiB, agus freagra sraitheach an bhróicéir go 32 MiB. Baintear eolaire sealadach príobháideach in `finally`. Ní bhunaíonn OmniRoute FFmpeg agus ní ghlacann sé le cosán inrite saincheaptha. Sula ndéantar fortheidealú, cuireann an droichead pas dídhúthaithe amhairc coimeádach i bhfeidhm: laghdaítear gach JPEG go maolán liathscála 16 × 16 agus ní dhéantar é a chur i gcomparáid ach leis an bhfráma deiridh a coinníodh. Maidir le buiséad fortheideal iarrtha os cionn fráma amháin, soláthraíonn eastóscadh comhthiomsú iarrthóirí teorannaithe suas le dhá oiread an bhuiséid sin agus nach mó ná 16 fhráma ar bith. Ní chuirtear an teorainn iarrtha i bhfeidhm ach amháin tar éis dí-dhúbailt, agus caomhnaítear an chéad iarrthóir agus an ceann deireanach a roghnófar le linn an tanaithe deiridh nuair is dhá cheann ar a laghad an buiséad. Úsáideann an polasaí `grayscale-16x16-mean-cells-v2` versioned an ceann is mó de luma deilt meánach agus an cóimheas idir na cealla mionsamhlacha a bhfuil a deilte normalaithe ar a laghad 0.05. Is é an tairseach dúblach an tairiseach 0.04, a roghnaíodh le haghaidh intuarthachta seachas a bheith nochta mar shocrú am rite. Caomhnaíonn an comhartha ardchodarsnachta tánaisteach seo gluaisne bhig agus athruithe infheicthe téacs ar féidir le comparáid meánach amháin a cheilt. Teipeann ar earráidí comparáide nó díchódóra oscailte agus coinnítear clúdach. Scarann meiteashonraí aschuir iarrthóirí a bhaintear, frámaí a n-úsáidtear go rathúil, agus laghdaítear dúblaigh amhairc.

Féadfaidh cuid den fhís atá marcáilte go sainráite bileog teagmhála le stampa ama a iarraidh. Tógann an droichead greille 4-cholún, 16-fhráma JPEG ar a mhéad. Dóitear gach cill 512-picteilín a stampa ama foinse isteach i mbanda bun ardchodarsnachta, agus fanann na stampaí ama céanna i meiteashonraí téacsúla le haghaidh comhlachais agus iniúchta iartheachtacha. Tá teorainn de 32 MiB fós ar an JPEG iomlán. Mura féidir le `sharp` an eangach a dhíchódú nó a chumadh, titeann an droichead ar ais go dtí na frámaí aonair JPEG ; scoirfidh cliant fós tríd an oibríocht leatháin.

Tá an fhianaise ar chur chun cinn scartha d’aon ghnó ón micrea-thagarmharc comhdhéanamh sintéiseach. sainmhíníonn `scripts/perf/video-bridge-contact-sheet-eval.ts` úim A/B le leagan scéimre le haghaidh samhlacha fís fíor-OpenAI-comhoiriúnach. Tomhaiseann sé comharthaí arna dtuairisciú ag soláthraithe, foighne balla ceann go ceann (lena n-áirítear comhdhéanamh leatháin), comhaireamh na nglaonna samhail, agus coinneáil fíricí sainshainithe. Ní scríobhtar freagraí eiseamláireacha ar an tuairisc; ní choinnítear ach achoimrí SHA-256 agus fíricí comhoiriúnaithe IDs. Ní dhéanann an leas a bhaint as líonra nó glao samhail íoctha mura rud é go bhfuil `--execute-real` rite agus `--model`, `OMNIROUTE_BASE_URL`, agus `OMNIROUTE_API_KEY` cumraithe. Gan an fíor-rith follasach sin, fanann a fhíorasc inléite ag meaisín `HOLD`; ní fianaise ar chur chun cinn iad tomhais shintéiseacha payload/call-count amháin.

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

Ní athúsáideann an táirgeoir táirgeachta frámaí bróicéir atá díorthaithe cheana féin ach amháin tar éis anailís amhairc rathúil, gan an dara físeán download/extraction. Éilíonn sé oibreoir `modalityBridgeVideoDrilldownEnabled=true`, `drilldown: true` docht in aghaidh na coda , agus taifead fíordheimhnithe API-eochair ID. Ní bhunaíonn luachanna principal/session arna ndearbhú ag cliant úinéireacht riamh. Gan na trí choinníoll go léir ní dhéanann sé hash, méid a athrú nó frámaí breise a choinneáil. Caomhnaíonn teip coinneála an fhreagairt amhairc inúsáidte. Seachnaíonn iarratais cheadaithe taisce na dtorthaí uile-físeáin agus mar sin ní athsheinntear na torthaí i dtaisce.

Nochtann freagraí rathúla JSON agus SSE ar a mhéad ceithre lámh teimhneach sa cheanntásc teorannaithe `x-omniroute-video-drilldown`. Is féidir le bunús brabhsálaí údaraithe an ceanntásc sin a léamh gan an polasaí tionscnaimh CORS a leathnú. Úsáideann Láimhseálann nua `v1.<32-byte random base64url token>`, agus coinníonn an chlár ach a hashes SHA-256. Glacann an parsálaí reader/header freisin comharthaí oidhreachta 64 heicsidheachúlach. Is é an tomhaltóir poiblí fíordheimhnithe `GET /api/v1/video-bridge/drilldown?handle=...`, geataithe go neamhspleách ag `modalityBridgeVideoDrilldownRemoteEnabled=true`. Déanann bréagach follasach leanúnach rochtain a chúlghairm fiú nuair atá an t-aischur oidhreacht `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env cumasaithe. Tá an oidhreacht analógach `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback ag coinneáil táirgeachta. Tá an dá chúl réamhshocraithe as.

Faigheann an tomhaltóir úinéireacht ón eochair fhíordheimhnithe agus cuireann sé príomhbheartas i bhfeidhm: baineann GET agus DELETE araon leis an gcatagóir críochphointe `video`, lena n-áirítear an ailiasanna `/v1` agus `/api/v1`. Caithfidh `video` a bheith san áireamh in eochracha a bhfuil críochphointe ceadaithe neamhfholamh acu; fanann eochracha neamhshrianta comhoiriúnach. Tugann an tomhaltóir an 404 céanna ar ais le haghaidh lámha anaithnid, éagtha agus eochair eile. Glacann sé le `variant=preview|standard|detail` (toise JPEG uasta 320/640/1280, riamh upscaled), `limit=1..8` (nó an oidhreacht `frames` ailias, riamh an dá), náid-bhunaithe `page`, agus soicind fócas roghnach `start`/`end`. Diúltaítear d’eochracha iarratais dhúblacha agus d’fhuinneoga fócais droim ar ais. Tá hash dá inneachar iarbhír agus meiteashonraí réitigh iarbhír ag gach malairt a chuirtear ar ais, atá nasctha leis an bhfoinse coinnithe. Díorthaítear leaganacha nuair a léitear iad seachas iad a stóráil mar chóipeanna breise coinnithe. Tá teorainn 32 MiB ar an bhfreagra JSON, lena n-áirítear Base64/envelope; filleann leathanach rómhór 413 agus caithfidh an cliant níos lú frámaí a iarraidh. Léann sé cealú seiceála thart ar gach athrú méide agus athsheiceálann sé bailíocht an láimhseála sula bhfilleann sé. tá `DELETE` ag an úinéir díchumasach; scaoileann scriosadh nó dul in éag TTL an fhoinse chuntasaíochta agus úsáide coinnithe.

Tá an stór comhroinnte próiseas-áitiúil: téann na láimhseálacha in éag nuair a atosófar iad agus ní féidir iad a aistriú idir próisis neamhspleácha OmniRoute. Nochtann staitisticí bainistíochta polasaí coinneála/cianta éifeachtach agus entries/bytes comhiomlán coinnithe amháin, ní bhaineann na meáin, tagairtí, príomh- IDs nó lámhleabhair riamh. Taispeánann an painéal socruithe Físeáin na luachanna sin agus is féidir leis an dá lasc toilithe a leanúint. Ní fianaise ar imscaradh beo ná ar ardú céime atá sa doiciméadú cur chun feidhme seo; déantar glacadh le fíor-mhúnla a rianú ar leithligh.

Cuirtear fotheideal ar fhrámaí go seicheamhach leis an tsamhail Físeáin cumraithe. Gheobhaidh sárú físe folamh an socrú Fís le hoidhreacht; má tá an dá cheann folamh, roghnaíonn an t-uathródaire Vision an tsamhail éifeachtach atá in ann fís. Cuirtear réimír cobhsaí `[Video description:` in ionad na coda bunaidh i bhfotheidil rathúla a mharcálann freisin ar an téacs mar bhreathnóireacht neamhiontaofa atá díorthaithe ó na meáin agus a insíonn do mhúnlaí iartheachtacha gan treoracha a fhaightear sna meáin a leanúint. I measc na n-eochracha taisce fráma-theideal tá na bearta JPEG, pras, stampa ama, agus múnla éifeachtach; ní dhéantar ach fotheidil rathúla a thaisceadh. Coinníonn iontrálacha taisce an tsamhail táirgeora rathúil iarbhír, lena n-áirítear samhail chúltaca; tuairiscíonn an droichead `mixed` nuair a tháirgtear frámaí éagsúla ag samhlacha éagsúla. Athúsáideann taisce buailte céannacht an táirgeora sin seachas é a athlipéadú mar an plean ródaithe iarrtha. Tá an taisce toradh uile-físeáin eochair ar gach ionchur a athraíonn an t-aschur — múnla pras, éifeachtach, polasaí samplála, comhaireamh fráma, modh anailíse shéimeantach, méarloirg SHA-256 an leid fócas normalaithe, an fhuinneog fócais, `transcript`, `audioTranscript`, agus an bhratach bileog teagmhála — mar sin ní chailleann taisce é aon cheann de na toisí sin a athrú, gan athúsáid gan staonadh. Tá leagan an bheartais asbhainte amhairc, an tairseach, agus an comhaireamh fráma iarrthóra teorantach soiléir freisin san eochair taisce toraidh agus meiteashonraí; mar sin ní féidir le hathrú polasaí cur síos seanfhíseáin a athúsáid. Coinníonn meiteashonraí Result-cache v4 an modh agus na méarloirg, ní tasc amhúsáideora riamh. Tuairiscíonn meiteashonraí ráillí cosanta na modhanna anailíse a iarrtar agus atá éifeachtach; tuairiscítear go bhfuil modh `focused` iarrtha gan téacs úsáideora inúsáidte mar `full` éifeachtach .

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

Leanadh le hoidhreacht Tá luachanna teorann ama físe os cionn 120 soicind clampáilte go dtí spriocdháta an bhróicéir; diúltaítear do shuímh nua a scríobhann os cionn na teorann sin. Éilíonn `GET /api/modality-bridge/video/runtime` ceantar lúbtha stampáilte iontaofa roimh fhíordheimhniú nó iniúchadh ama rite, ansin éilíonn an t-údar bainistíochta. Ní fhilleann sé ach `available`, leaganacha sláintíochta FFmpeg/ffprobe, agus cúis sheasta nuair nach bhfuil an t-am rite ar fáil. Níl an críochphointe eastósctha inmheánaigh ina uaslódáil phoiblí API: tuairisceáin sáithiúcháin scuaine `503` plus `Retry-After`, tuairisceáin dínasctha glaoiteora `499`, agus tuairisceáin an bhróicéara spriocdháta seasta `504`. Cuireann freagraí tiontaithe `video->text;model=<visionModel>;parts=<videos>` leis an gceanntásc lárnach `x-omniroute-modality-bridge` gan deighiltí Físe nó Fuaime a bhaint.

### Mascóir PII (`piiMasker.ts`)

Ritheann ar **araon** céimeanna.

- **`preCall`** Clónann an pálasta, siúlann `system`, `messages`, `input`, agus `prompt` (lena n-áirítear míreanna teaghrán simplí), agus cuireann sé `processPII()` (ó `@/shared/utils/inputSanitizer`) i bhfeidhm ar réimsí `content`/`text` teaghrán. Nuair a `PII_REDACTION_ENABLED=true`, braite PII sa phálasta amach. Tá sé seo neamhspleách ar `INPUT_SANITIZER_MODE` (a rialaíonn polasaí pras-instealladh amháin). Nuair a bhíonn an t-athchóiriú múchta, taifeadann an glao comhaireamh braite gan ábhar a athscríobh.
- **`postCall`** domhain-chlónann an freagra, ritheann `sanitizePIIResponse()` móide an maisc Freagraí-API-cruth (`maskResponsesOutput` — clúdaíonn `output_text` agus `output[].content[].text`). Má tharlaíonn aon athrú, cuirtear an freagra modhnaithe in ionad an bhunfhreagra.

Ní bhacann an ráille cosanta riamh; ní dhéanann sé ach anótáil (`meta.detections`, `meta.redacted`) nó athscríobhann sé.

#### Roghnú in aghaidh an chineáil, patrúin saincheaptha agus cuntair braite

**Socruithe an Phainéal → → Security → PII masking** roghnaíonn _what_ is masked. Ní aistríonn sé an chumhdach: is é sin `PII_REDACTION_ENABLED` (iarratas) agus `PII_RESPONSE_SANITIZATION` (freagra + SSE) fós, an dá uaire de réir réamhshocraithe.

- **Roghnú in aghaidh an chineáil** Tá na haitheantais ionsuite liostaithe ag — i `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ciallaíonn unset gach cineál (an t-iompar sula raibh an socrú seo ann). Léarscáileanna patrún `ssn_us` an innill iarratais chuig `ssn`. Ní líonann teimpléid (Íosráta, Caighdeánach, Airgeadais, Brasaíle, USA, GDPR, POPIA, Iomlán) ach na ticbhoscaí sa UI.
- **Aitheantóirí GDPR agus POPIA** — dhá cheann déag d’aitheantas ionsuite a chlúdaíonn EU agus aitheantóirí pearsanta na hAfraice Theas (tábla thíos). Tá a gcuid regexes, bailíochtaitheoirí agus clibeanna dlínse ina gcónaí in aon tábla amháin, `src/shared/utils/piiPatterns.ts`, a itheann an sláintitheoir freagartha (`src/lib/piiSanitizer.ts`) agus an maisc iarratais (`src/shared/utils/inputSanitizer.ts`) araon. Ní athraítear meaitseáil ach amháin nuair a ghlacann a bhailitheoir leis; ní leor rith lom de dhigit riamh. Coinníonn oibreoir a shábháil rogha cúngaithe sula raibh na haitheantais seo ann an t-iompar a bhí aige go dtí go gcuirtear tic leis na haitheantais nua.
- **Patrúin saincheaptha** — suas le 20 patrún regex nó saoróg (`*` = suas le 64 carachtar neamhspás bán, `?` = a haon). Éiríonn meaitseanna `[CUSTOM_REDACTED]`. Téann gach patrún trí `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): ní mór 500 carachtar ar a mhéad, bratacha teoranta do `g i m s u`, a thiomsú, ní mór dóibh dul thar `safe-regex` (aisrianú tubaisteach), agus ní fhéadfaidh siad a bheith ag teacht le sreang folamh nó le sealbhóir áite athraonta. Diúltaítear patrún a theipeann nuair a shábháiltear é agus nuair a thástáiltear é, agus ní dhéantar as a chéile stóráilte a theipeann air ag am rite seachas a bheith tiomsaithe. Ní ritheann patrúin saincheaptha ach amháin fad a bhíonn an chumhdach ar siúl.
- **Áiritheoirí braite** Áireamh in aghaidh an chineáil — (luachanna nár mheaitseáil riamh), coinnithe sa chuimhne agus athshocrú ar atosú (`src/lib/pii/piiDetectionStats.ts`). Ní mhéadaíonn siad ach fad a bhíonn an chumhdach ar siúl.

Cónaíonn na socruithe sa tábla `key_value` (ainmspás `pii_settings`, `src/lib/db/piiSettings.ts`) agus léitear iad trí thaisce 1 s. API:

| Modh   | Conair                   | Cuspóir                                                                                   |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Staid na brataí, `enabledTypes`, `customPatterns`, cuntair bhrathadóireachta              |
| `PUT`  | `/api/settings/pii`      | Ionadaigh `enabledTypes` (`null` = gach ceann) agus/nó `customPatterns`                   |
| `POST` | `/api/settings/pii/test` | Tástáil thirim ar phatrún amháin i gcoinne sampla 8 KB ar a mhéad; ní stóráiltear aon rud |

Teastaíonn údarás bainistíochta ó na trí cinn agus bailíonn siad an comhlacht le Zod (`src/shared/validation/schemas/piiSettings.ts`). Le logáil isteach díchumasaithe (`requireLogin=false`) tá `GET` agus críochphointe na tástála oscailte, ach tá seisiún deais fós ag teastáil `PUT`, eochair `manage` -scope API, comhartha rochtana `oma_` le raon feidhme scríofa nó níos airde, nó an comhartha CLI nó an comhartha seirbhíse inmheánach seolta ó loopback.

#### Aitheantóirí GDPR (EU) agus POPIA (An Afraic Theas).

| ID                  | Aitheantóir                       | Bailíochtú                                                                              |
| ------------------- | --------------------------------- | --------------------------------------------------------------------------------------- |
| `iban`              | IBAN                              | Tír aitheanta, fad cruinn don tír sin, ISO 13616 MOD-97-10                              |
| `eu_vat`            | Uimhir CBL an AE                  | Réimír ballstáit aitheanta agus formáid uimhir an stáit sin (gan chuardach VIES)        |
| `es_dni_nie`        | DNI / NIE na Spáinne              | Litir rialaithe (luach mod 23); is é NIE `X/Y/Z` + 7 ndigit                             |
| `it_codice_fiscale` | Codice Fiscale na hIodáile        | Litir rialaithe ó tháblaí suíomhanna corr/réidh                                         |
| `pl_pesel`          | PESEL na Polainne                 | Suim sheiceála ualaithe agus raonta sochreidte míosa/lae breithe ionchódaithe           |
| `nl_bsn`            | BSN na hÍsiltíre                  | Seiceáil 11 (meáchain 9..2, -1)                                                         |
| `de_steuer_id`      | Steuer-ID na Gearmáine            | ISO 7064 Mod 11,10 agus rialacha struchtúr digití (gan 0 tosaigh)                       |
| `se_personnummer`   | personnummer na Sualainne         | Luhn thar na deich ndigit dheireanacha agus dáta breithe sochreidte (10 nó 12 dhigit)   |
| `za_id`             | Uimhir ID na hAfraice Theas       | Luhn thar na 13 dhigit uile, mí/lá breithe bailí, digit saoránachta 0 nó 1              |
| `za_phone`          | Teileafón na hAfraice Theas       | Réimír `+27` / `27`, nó an fhoirm náisiúnta `0..` scríofa le spás nó fleiscín           |
| `za_vat`            | Uimhir CBL na hAfraice Theas      | 10 ndigit a thosaíonn le `4` **agus** "VAT" / "BTW" sna 48 carachtar roimhe             |
| `za_tax_ref`        | Tagairt chánach na hAfraice Theas | 10 ndigit a thosaíonn le `0`-`3`, Luhn, **agus** "tax" / "SARS" sna 48 carachtar roimhe |

Toisc go n-imbhuaileann na formáidí digiteacha amháin le huimhreacha oird, tógann siad uimhreacha agus stampaí ama, tá an ciú eochairfhocal de dhíth ar na cinn is laige (`za_vat`, `za_tax_ref`), agus ní láimhseáiltear uimhir lom `0..` deich ndigit mar uimhir theileafóin na hAfraice Theas. Níl spásáil IBANs (`GB29 NWBK ...`) comhoiriúnaithe. Ar an gcosán sruthaithe ní bhreathnaítear ach taobh istigh den smután reatha. Suíonn na haitheantais chun tosaigh ar na patrúin chineálacha gutháin, mar sin coinníonn aitheantóir bailíochtaithe a sealbhóir áite féin (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Roghnaíonn teimpléid `gdpr` agus `popia` na haitheantas EU agus na hAfraice Theas faoi seach. Fanann an cumhdach féin rogha an diúltaithe (Riail chrua #20): ní athraíonn aon rud anseo réamhshocrú bratach gné.

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
