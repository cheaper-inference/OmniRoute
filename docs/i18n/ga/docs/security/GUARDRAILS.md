# Guardrails (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Foinse na fírinne:** `src/lib/guardrails/`
> **Nuashonraithe is déanaí:** 2026-08-29 — v3.8.51 (Is é an glaoiteoir a dhearbhaíonn bunús thras-scríbhinn Video Bridge,
> níl sé fíoraithe ag an bhfreastalaí fós — soiléirithe de réir #11661)

Forfheidhmíonn ráillí cosanta sábháilteacht, polasaí, agus claochluithe ábhair ag an teorainn idir OmniRoute agus soláthraithe in aghaidh an tsrutha. Is féidir le gach ráille cosanta pálastaí iarratais (`preCall`) agus freagraí in aghaidh an tsrutha (`postCall`) a iniúchadh (agus, de rogha air sin, diúltú dóibh, iad a chlaochlú, nó nótaí a chur leo).

Is córas **teip-oscailte** é: má chaitheann ráille cosanta earráid le linn forghníomhaithe, déanann an chlárlann an earráid a thaifeadadh agus leanann sí ar aghaidh leis an gcéad ráille cosanta eile in ionad teip a chur ar an iarratas. Is cinneadh sainráite é blocáil (`block: true`), ní tharlaíonn sé de thaisme riamh.

## Ráillí Cosanta Insuite

Lódálann an chlárlann sé ráille cosanta go huathoibríoch in ord tosaíochta tráth an iompórtála
(féach `registry.ts` → `registerDefaultGuardrails()`):

| Tosaíocht | Ainm                | Céim(eanna)    | Comhad                |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ritear uimhreacha tosaíochta níos ísle **ar dtús**.

### Droichead Amhairc (`visionBridge.ts`) — Droichead Módúlachta PR-1

Idircheapann sé iarratais ina bhfuil íomhánna agus atá dírithe ar **mhúnlaí nach múnlaí amhairc iad**, agus déanann sé an t-iarratas iomlán a atreorú chuig múnla atá in ann fís a phróiseáil nó cuireann sé tuairiscí téacs, arna dtáirgeadh ag múnla amhairc inchumraithe, in ionad na gcodanna íomhá roimh an nglao réamhtheachtach. Cuireann sé seo ar chumas soláthraithe téacs-amháin ualaí pála ilmhódacha a láimhseáil go trédhearcach.

Sreabhadh:

1. Scipeáil má thacaíonn an spriocmhúnla le fís cheana féin (ach amháin má tá sé ar an
   liosta droichid éigeantaigh `isVisionBridgeForcedModel`).
2. Bain codanna íomhá amach trí `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), a tharmligeann chuig an **mbrathadóir meán aontaithe**
   `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — an t-aon fhoinse fírinne
   amháin atá comhroinnte leis an scagaire comhoiriúnachta teaglama.
   Tá an bhaint teoranta ag liosta ceadaithe do chodanna barrleibhéil de na cruthanna
   is féidir le `replaceImageParts` a chur ar ais ina n-áit (an conradh bainte↔athsholáthair): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, URL Anthropic
   `source.type:"url"`, agus Responses API `input_image`. Is ábhar don scagaire teaglama iad
   amas neadaithe agus cruthanna táscaire-amháin agus ní bhaintear amach riamh iad.
   Scipeáil mura bhfaightear ceann ar bith.
3. Réitigh cumraíocht ama rite trí `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): tá tosaíocht ag eochracha nua socruithe
   `modalityBridge*`; fanann eochracha oidhreachta `visionBridge*` mar **chúltaca aon timthrialla**
   (fuinneog aischurtha). Scipeáil roimh aon trasnú meán nuair atá an
   droichead díchumasaithe.
4. Cinneann an roghnóir móid (`modalityBridgeVisionMode`, féach an tábla thíos)
   idir atreorú agus cur síos. Filleann an t-atreorú `modifiedPayload` gan ach `model`
   babhtáilte, chomh maith le meiteashonraí `{ rerouted, fromModel, toModel, imagesKept }`.
5. Conair an chur síos: teorannaigh íomhánna ag `maxImages`, cum an leid atá feasach ar an tasc,
   téigh i gcomhairle le taisce an chur síos, glaoigh ar an múnla amhairc **go comhthreomhar**
   (`Promise.allSettled`), agus insteall codanna téacs `[Image N]: <description>` ina
   n-áit. Bíonn `null` mar thoradh ar chur síos ar theip air agus **caomhnaítear**
   bunchuid na híomhá (#4012) — ach amháin ar chonair cur síos an teaglama nuair a
   theip ar gach cur síos, áit a bhfaigheann seirbhís réamhtheachtach dheimhnithe nach bhfuil cumas amhairc aici
   stub `(unavailable — no vision-capable provider connected)` ina ionad (#8430).
6. Fill `modifiedPayload` + meiteashonraí (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Roghnóir móid (`modalityBridgeVisionMode`)

| Mód        | Réamhshocrú | Iompar                                                                                                                                                                                                                                                                                                                               |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔           | Heorastúil oidhreachta, gan athrú (#6640/#7204): déantar múnlaí nach teaglama iad/`auto/` a atreorú chuig an múnla amhairc is fearr mura bhfuil dintiúir inúsáidte ag an mbunmhúnla cheana féin (ansin déantar cur síos); déantar cur síos i gcónaí do spriocanna teaglama.                                                          |
| `describe` |             | Déan cur síos i gcónaí — scipeáiltear bloc an atreoraithe go hiomlán; freagraíonn múnla roghnaithe an úsáideora i gcónaí.                                                                                                                                                                                                            |
| `reroute`  |             | Cuir atreorú i bhfeidhm: seachnaítear an ráille a choinníonn an múnla a bhfuil dintiúir aige. Tá ráille dintiúr **sprioc** an atreoraithe fós i bhfeidhm — nuair nach bhfuil aon sprioc amhairc inúsáidte ann, téann an t-iarratas ar aghaidh chuig cur síos ionas nach sroicheann íomhánna loma inneall téacs-amháin riamh (#8430). |

Déanann móid éigeantacha gearrchiorcadú **sula** ritear an heorastúil uathoibríoch; tá iompar `auto`
comhionann beart ar bheart leis an ráille cosanta a bhí ann roimh PR-1.

#### Raon eochrach API (`visionBridgeKeyScope.ts`)

Nuair a chuireann eochair API an ghlaoiteora srianta ar `allowedConnections`, linnte cuóta
(`allowedQuotas`) nó múnlaí (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), ní roghnaíonn an droichead ach
múnlaí atreoraithe agus cur síos is féidir leis an eochair a úsáid, ar naisc is féidir leis an eochair a úsáid.
Téann an glao cur síos i gcónaí ansin trí fhéinlúb OmniRoute leis an gceanntásc
`x-omniroute-self-loop-key-id`, ionas go gcuireann an t-iarratas comhrá glactha
beartas naisc agus múnla na heochrach sin i bhfeidhm arís. Ní urramaíonn `enforceApiKeyPolicy()`
an ceanntásc sin ach amháin in éineacht le hiompróir na féinlúibe, mar sin ní féidir leis ach
rochtain a chúngú, agus diúltaítear d'aitheantas nach féidir a réiteach.

Mura gceadaítear aon mhúnla amhairc don eochair, seasann conair an chur síos ar leataobh agus
téann an t-iarratas tríd gan athrú, an t-iompar oscailte-ar-theip céanna agus a bhíonn ag ráille cosanta
díchumasaithe (meiteashonraí `{ skipped: true, reason: "no_permitted_vision_model" }`).
Iompraíonn iarratais gan eochair, agus eochracha gan na srianta seo, díreach mar
a d'iompair siad roimhe seo.

#### Leid cur síos atá feasach ar an tasc (`modalityBridgeVisionTaskAware`)

Réamhshocrú **true**. Cuireann `composeVisionPrompt()` (`visionBridgeHelpers.ts`) téacs
na **teachtaireachta úsáideora deireanaí** (teasctha go 500 carachtar) leis an
mbunleid tuairiscithe, rud a threoraíonn an tuairisc i dtreo an rud a d’iarr an
t-úsáideoir i ndáiríre (patrún codex-vision-proxy) agus a iarrann ar an tsamhail
amhairc téacs infheicthe a thras-scríobh. Nuair atá an bhratach múchta — nó nuair
nach bhfuil téacs úsáideora ann — úsáidtear an bhunleid gan athrú.

Iarrann iarratas OpenAI-chomhoiriúnach na féin-lúibe tuairiscithe féin (`callVisionModelSingle()`
in `visionBridgeHelpers.ts`) `image_url.detail: "high"` i gcónaí —
gan choinníoll, do gach glaoiteoir/soláthraí, gan é a bheith faoi réir aon
chomhartha ón gcliant. Laghdaíonn sampláil íseal-mhionsonraithe cruinneas OCR don
tasc tras-scríofa téacs díreach a iarrann an leid seo, mar sin iarrann an glao
tuairiscithe féin ardleibhéal mionsonraí i gcónaí, beag beann ar an leibhéal
mionsonraí a d’úsáid an buniarratas isteach. Ní dhéanann sé seo difear ach do
chorp inmheánach an iarratais tuairiscithe; ní athraíonn sé an chaoi a gcuireann
OmniRoute `image_url.detail` an ghlaoiteora féin ar aghaidh ar an bpríomhiarratas —
cuirtear an réamhshocrú sin i bhfeidhm ar leithligh, agus do chliaint OpenCode
braite amháin, in `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Níl réimse `detail` ag brainse formáide sreinge Anthropic den fhéin-lúb
tuairiscithe agus ní dhéanann ceachtar réamhshocrú difear dó.

#### Uasteorainn aschuir na tuairisce (`modalityBridgeVisionMaxChars`)

| Eochair                        | Réamhshocrú | Raon             |
| ------------------------------ | ----------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` nó 100–50000 |

Ciallaíonn `0` (réamhshocrú) **gan uasteorainn** — cuirtear an tuairisc a
fhilleann `callVisionModel()` ar aghaidh gan mhodhnú, rud a chaomhnaíonn an
t-iompar reatha. Teascann luach ar bith sa raon 100–50000 an tuairisc le hiarmhír
`…` sula gcuirtear ar ais í mar `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Ardaigh é seo do thascanna OCR atá trom ar mhionsonraí, áit a mbíonn an
tras-scríobh iomlán de dhíth ar an tsamhail iartheachtach; ísligh é chun teorainn
a chur le húsáid comharthaí ar shamhlacha amhairc atá róchainteach. Tá réimse an
deais ar phainéal Advanced den chluaisín Vision
(`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) agus cuireann sé
aon luach idir 1 agus 99 suas go dtí an t-íosluach 100, agus fágtar `0`
sainráite gan athrú — is luach bailí Zod ann féin é `0`
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ní hé an
réamhshocrú “neamhshocraithe” amháin é.

#### Taisce tuairiscithe (`modalityBridge/bridgeCache.ts`)

Taisce LRU + TTL sa chuimhne d’aschuir tuairiscithe, roinnte ar fud an phróisis.
Eochair = `sha256(imageRef + composedPrompt + configuredBridgeModel)` le
frámaíocht réimír faid (gan imbhuailtí ag teorainneacha réimsí). Is í an
tsamhail droichid **chumraithe** comhpháirt na samhla, ní an tsamhail a thug an
freagra i ndáiríre — d’fhéadfadh `callVisionModel` dul i muinín rogha thánaistigh
go hinmheánach, agus dhéanfadh eochrú de réir iarrachta an taisce a ilroinnt. Ní
chuirtear tuairiscí teipthe sa taisce riamh. Socruithe:

| Eochair                         | Réamhshocrú | Raon    |
| ------------------------------- | ----------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`      | —       |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000 |

#### Normalú cianíomhánna (féin-lúb tuairiscithe/aisghabháil base64)

Nuair a aisghabhann an droichead íomhá **chianda** é féin — féinghlao tuairiscithe
Anthropic agus tiontú base64 fhormáid sreinge claude
(`ensureBase64ImagesForClaudeWire`), iad araon trí
`fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — cuirtear URI na
sonraí a eascraíonn as trí `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) sula leabaítear é san iarratas chuig an
tsamhail amhairc. Laghdaítear íomhánna rómhóra go **ciumhais fhada 2048px** (ag
teacht leis an uasteorainn athmhéadaithe a chuireann OpenAI/Anthropic i bhfeidhm
ar thaobh an fhreastalaí cheana féin), rud a laghdaíonn bearta/foighne uaslódála
gan an méid a fheiceann an tsamhail amhairc a athrú. Úsáideann an t-athrú méide
`sharp`, a luchtaítear trí iompórtáil dhinimiciúil: ar ardán nach féidir a
dhénártha dúchasach a luchtú, **ní chaitheann** `normalizeDataUri()` earráid
riamh — téann sé ar ais chuig na bearta bunaidh a chur ar aghaidh gan athrú,
ionas go leanann an chonair tuairiscithe/tiontaithe base64 de bheith ag obair i
gcónaí. Cuirtear bearta nach íomhánna iad (aisghabháil nár thug íomhá
dhíchódaithe ar ais) ar aghaidh gan athrú freisin. Tá an normalú seo teoranta
d’íomhánna a aisghabhann an droichead dá fhéinghlao féin — ní chuirtear i
bhfeidhm riamh é ar phálasta amh an ghlaoiteora a chuirtear ar aghaidh, i
gcomhréir leis an bprionsabal sócháin le roghnú isteach amháin (Riail Dhocht
#20).

#### Scéimre socruithe + ascagadh

Déantar na heochracha nua `modalityBridge*` a bhailíochtú le Zod in
`updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, an tríréad `modalityBridgeCache*`, agus an grúpa
`modalityBridgeAudio*` a úsáideann an Droichead Fuaime. Cóipeálann ascagadh
`141_modality_bridge_settings.sql` luachanna leagáide reatha
`visionBridge*` chuig na heochracha nua comhfhreagracha (idéimphótantach, ní
fhorscríobhann sé luach `modalityBridge*` a shocraigh oibreoir riamh); glactar
leis na heochracha leagáide fós mar chúltaca léite ar feadh timthriall eisiúna
amháin.

#### Ceanntásc trédhearcachta + staitisticí

Bíonn an méid seo a leanas ar fhreagraí atá claochlaithe trí thuairisciú:
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(tógtha ag `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`,
stampáilte ag `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`).
Ní fhaigheann iarratais a athródaítear **aon** cheanntásc — níor athraíodh an
pálasta agus tá babhtáil na samhla le feiceáil cheana féin i réimse `model` de
chorp an fhreagra.

Filleann `GET /api/modality-bridge/stats` (fíordheimhniú bainistíochta, an tsraith chéanna le
`GET /api/settings`) na cuntair in-chuimhne de réir módúlachta
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` le haghaidh `vision`, `audio`, agus
`video`. Úsáideann `averageLatencyMs` `latencySamples`, seachas gach iarracht, mar
ainmneoir; ní chruthaíonn oibríocht gan tomhas ama sampla bréige nialas milleasoicind.
Fanann `bridged` mar an ailias atá comhoiriúnach siar le haghaidh tiontuithe
rathúla; ní mhéadaíonn iarrachtaí teipthe é.
Athshocraítear na cuntair nuair a atosaítear an próiseas de réir dearaidh
(teiliméadracht, ní cuntasaíocht).

#### Cumraíocht an deais

Is é
`/dashboard/settings/modality-bridge` leathanach tiomnaithe an deais. Caomhnaíonn a chluaisíní
`Vision`, `Audio`, agus `Video`, ar féidir aghaidh a thabhairt orthu trí URL,
paraiméadair iarratais agus iad ag athrú luach `tab`.
Nochtann an cluaisín Vision cumasú, mód, roghnú samhla (lena n-áirítear an réamhshocrú
uathoibríoch), leid atá feasach ar thascanna, ardteorainneacha ama/íomhá/fad tuairisce/taisce,
cuntair ama rite, agus iarratas samplach faoi chosaint. Tá an cluaisín Audio beo
freisin: nochtann sé cumasú, roghnóir samhla STT amháin le Auto, teorainneacha
ama/uasmhéid gearrthóige, cuntair fuaime, agus tástáil shamplach `input_audio`.
Tá an cluaisín Video feidhmiúil: tuairiscíonn sé staid ama rite FFmpeg/ffprobe —
ceann de cheithre staid shainráite sa Chomhéadain (`unknown` fad atá an tóireadóir
ar bun nó mura bhféadfadh sé críochnú, `restricted` ar óstach deais nach óstach
lúbtha siar é, áit a scipeáiltear an tóireadóir ar thaobh an chliaint,
`unavailable` tar éis tóraíochta agus deimhniú go bhfuil sé ar iarraidh, nó
`available` le leaganacha FFmpeg/ffprobe) — coinníonn sé teorainneacha
cumasaithe/samhla/fráma/físe/ama, scagann sé an roghnóir samhla chuig samhlacha
atá in ann fís a láimhseáil, agus nochtann sé cuntair físe.

Is nasc comhoiriúnachta chuig an leathanach nua é an seanchárta Vision Bridge faoi
shocruithe IS; ní leis an dara cóip den fhoirm a thuilleadh. Nascann Media Providers
sreafaí oibre Image-to-Text agus Speech-to-Text leis na cluaisíní comhfhreagracha
Modality Bridge freisin, gan an clós súgartha Speech-to-Text atá ann cheana a bhaint.

**Seachbhóthar glactha féin-lúibe:** nuair a sheoltar an glao tuairiscithe trí
fhéin-lúb `/v1` OmniRoute féin (samhail soláthraí neamhchaighdeánach), seolann an
fo-iarratas `x-omniroute-admission-bypass: internal` agus déantar é a fhíordheimhniú
leis an dintiúr féin-lúibe réitithe — an fairtheoir áitiúil `sk_omniroute` sa mhód
áitiúil, nó eochair timpeallachta `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` arna cumrú
ag an oibreoir (#1350), ionas gur féidir le himlonnuithe `REQUIRE_API_KEY=true`
an glao tuairiscithe a rith fós. Ní ghlactar leis an seachbhóthar ach amháin i gcás
na ndintiúr beacht sin, mar sin ní féidir le cliaint sheachtracha an ceanntásc a
úsáid chun glacadh a scipeáil.

Tá na réamhshocruithe oidhreachta in `src/shared/constants/visionBridgeDefaults.ts`;
tá na réamhshocruithe nua don mhód/do fheasacht ar thascanna/don taisce agus
réiteoir na socruithe in `src/shared/constants/modalityBridgeDefaults.ts`.
Nochtann an ráille cosanta rogha cruthaitheora `deps` ionas gur féidir le tástálacha
cur chun feidhme bréige de `getSettings` agus `callVisionModel` a instealladh.

### Droichead Fuaime (`audioBridge.ts`) — Modality Bridge PR-3

Idircheapann sé iarratais chomhrá ina bhfuil fuaim sula sroicheann siad sprioc
nach eol go nglacann sí le hionchur fuaime. Ní athsheolann sé an t-iarratas comhrá
riamh: déantar na codanna fuaime a thras-scríobh tríd an gcríochphointe ilchodach
atá ann cheana agus atá comhoiriúnach le OpenAI, agus leanann an tsamhail chomhrá
roghnaithe ar aghaidh le tras-scríbhinní téacs.

Sreabhadh:

1. Réitigh `supportsAudio` trí `getResolvedModelCapabilities()`. Tá tosaíocht ag
   meiteashonraí sainráite chlárlann an tsoláthraí, ansin ag meiteashonraí statacha
   na samhla, agus ansin ag `modalities_input` sioncronaithe. Is é `false` liosta
   ionchuir dearbhaithe gan `audio`; mura bhfuil aon fhianaise inniúlachta ann,
   fanann sé mar `null`. Gníomhachtaíonn `false` agus `null` araon an droichead
   coimeádach, agus seachnaíonn `true` é.
2. Réitigh socruithe `modalityBridgeAudio*` agus bain codanna fuaime barrleibhéil
   inscoite as gach teachtaireacht tríd an mbrathadóir comhroinnte
   `detectMediaParts()`. Is iad na cruthanna sreinge a dtacaítear leo ná
   `input_audio`, `audio_url` OpenAI, agus `source.media_type: "audio/*"`.
   Braitear fuaim neadaithe le haghaidh ródaithe ach ní bhaineann an chonair
   ionscoite í. Cuireann `modalityBridgeAudioMaxClips` teorainn leis an obair;
   fágtar codanna níos déanaí gan athrú.
3. Tabhair aird ar `provider/model` cumraithe, nó lig do
   `selectAudioBridgeModel()` siúl trí `AUDIO_TRANSCRIPTION_PROVIDERS` in ord
   cobhsaí na catalóige agus an chéad mhúnla a roghnú a bhfuil dintiúr soláthraí
   gníomhach inúsáidte aige.
4. Tiontaíonn `callAudioTranscription()` fuaim base64/data-URI ina `file`
   ilchodach, nó íoslódálann sé `audio_url` cianda tríd an ngarda amach poiblí
   amháin le pionnáil DNS agus teorainn 25 MB. Ansin POSTálann sé an comhad agus
   an tsamhail roghnaithe chuig an bhféin-lúb áitiúil
   `/v1/audio/transcriptions`, arna fhíordheimhniú le
   `resolveSelfLoopBearer()`. Déanann an bealach tras-scríofa atá ann cheana
   gnáthchuardach dintiúr, láimhseáil tréimhse shuaimhnithe/teorannaithe ráta,
   agus seoladh chuig an soláthraí.
5. Cuireann glaonna rathúla `[Audio N]: <transcript>` in ionad a gcodanna. Ritheann
   na glaonna le `Promise.allSettled`: caomhnaíonn teip aonair an bhunchuid fuaime
   sin (conradh #4012). Má theipeann ar gach glao agus má tá sé cruthaithe gur
   `supportsAudio === false` atá sa sprioc, déantar
   `[Audio N]: (unavailable — no STT provider connected)` de na codanna
   (conradh #8430). I gcás sprice anaithnid (`null`), fanann toradh ina dteipeann
   gach glao gan athrú. Faigheann sprioc atá cruthaithe a bheith téacsamháin agus
   nach bhfuil dintiúr STT inúsáidte aici an stob céanna gan glao líonra a eisiúint.

Úsáideann tras-scríbhinní rathúla taisce LRU/TTL Modality Bridge ar fud an phróisis.
Comhcheanglaíonn an eochair an tagairt fuaime, lipéad cobhsaí na hoibríochta
`audio-transcription`, agus an tsamhail STT roghnaithe; ní chuirtear teipeanna i
dtaisce riamh. Nuashonraíonn iarrachtaí fuaime na cuntair chomhroinnte `bridged`,
`cacheHits`, `failures`, agus `lastUsedAt`.
Bíonn
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ar fhreagraí
claochlaithe; ní fhaigheann iarratais gan athrú mír Audio Bridge.

Tá na socruithe ama rite tacaithe ag bunachar sonraí agus bailíochtaithe ag Zod:

| Eochair                       | Réamhshocrú | Raon                   |
| ----------------------------- | ----------- | ---------------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —                      |
| `modalityBridgeAudioModel`    | `""`        | Uathoibríoch nó ID STT |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000            |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10                   |

Tá an taisce chomhroinnte fós á rialú ag `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, agus `modalityBridgeCacheMaxEntries`.

### Droichead Físeáin (`videoBridge.ts`, `videoBridgePipeline.ts`)

Idircheapann sé páirteanna físeáin ardleibhéil in `messages` de chuid Chat Completions agus in `input`
de chuid Responses API sula nglaoitear ar sprioc nach eol go bhfuil tacaíocht dhúchasach físeáin aici.
Is iad na cruthanna a dtacaítear leo ná `input_video`, `video_url`, `video_source`, URLanna HTTPS,
agus URIanna sonraí `data:video/*;base64,...`. Ní chaitear le gnáthainmneacha comhad i dtéacs
mar fhíseán.

Is le `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) trasnú na hiarrata,
an tseiceáil cumais/beartais, comhiomlánú de réir iarrata, agus pálasta an fhreagra.
Tá obair gach físeáin — fáil, taisce an toraidh iomláin, cur síos ar sheicheamh frámaí
(a chomhcheanglaíonn aon tras-scríbhinn fuaime arna dearbhú ag an nglaoiteoir), agus
méadracht/tobscor/glanadh de réir iarrachta — folaithe taobh thiar de `processVideoPart` in
`videoBridgePipeline.ts`, a nglaoitear air uair amháin do gach páirt físeáin laistigh de lúb `preCall`.
Sainmhíníonn an modúl sin freisin teorainneacha follasacha na bport `VideoMediaBrokerPort`
(bearta a fháil agus frámaí sampláilte a bhaint), `VideoAudioTranscriptionPort`
(tras-scríbhinn fuaime arna dearbhú ag an nglaoiteoir a chomhcheangal leis na fotheidil shampláilte), agus
`VideoDrilldownPort` (teorainn mharthanachta dhruileáil síos na bhfrámaí; níl sí sreangaithe isteach
i `processVideoPart` fós — ní scríobhann ach an bealach ar leith `/api/modality-bridge/video/drilldown`
iontrálacha druileála síos faoi láthair).

Ní iompórtálann ná ní agraíonn conair iarrata phoiblí `/v1` fophróiseas riamh. Íoslódáiltear
físeáin chianda faoi theorainn 50 MiB; tá uasteorainn choimeádach 36 MiB díchódaithe in aghaidh an fhíseáin
ar fhíseáin inlíne base64 ionas gur féidir leis an imchlúdach samhla/teachtaireachtaí/frámála
fanacht laistigh den teorainn iontrála 50 MiB d’iarrataí poiblí JSON. Seiceáiltear meastacháin
ar fhad inlíne agus ar mhéid díchódaithe roimh leithdháileadh. Tá HTTPS riachtanach don chéad URL cianda
agus do gach atreorú, agus úsáidtear an garda amach poiblí amháin atá ann cheana le feannadh DNS.
Ansin trasnaíonn na bearta teorainn bheacht inmheánach an bhróicéara
`POST /api/modality-bridge/video/extract`. Tá an bealach sin `LOCAL_ONLY` agus
`SPAWN_CAPABLE` araon, ní ghlacann sé ach le hiarraidh fíordheimhnithe in aghaidh an phróisis
ó lúb-ais iontaofa, agus ní ghlacann sé riamh le URL, conair córais comhad, comhad inrite,
ná liosta argóintí. Cuireann píblíne mhéid choirp an API agus léitheoir incriminteach coirp
an láimhseálaí uasteorainn ionchuir 50 MiB an bhróicéara i bhfeidhm go neamhspleách. Ritheann
a scuaine theoranta eastóscadh amháin ag an am, ceadaíonn sí ceithre jab ar feitheamh, agus
cuireann sí uasteorainn 100 MiB ar ionchur atá ar feitheamh.

Laistigh den bhróicéir, léann `ffprobe` comhad príobháideach áitiúil; fágann liosta seasta
na bhformáidí ceadaithe formáidí seinnliosta agus lastliosta as an áireamh. I gcás coimeádán
ceadaithe de theaghlach MOV, fanann tagairtí seachtracha sonraí MOV díchumasaithe de réir
réamhshocraithe, agus ní chumasaíonn an t-ordú seasta iad. Úsáideann `ffprobe` agus `ffmpeg`
araon an liosta bán prótacal `file` amháin, snáithe amháin, eagair sheasta argóintí, gan
bhlaosc, agus comhaid inrite a réitítear ó `PATH`. Ní iarrthóirí in-seinnte iad sruthanna
clúdaigh le pictiúr ceangailte. Ní mór do gach sruth in-seinnte na teorainneacha a chomhlíonadh,
agus tugtar tús áite do shruth réamhshocraithe follasach roimh an gcúltaca cinntitheach leis
an innéacs is ísle. Tá físeáin teoranta do 600 soicind, 8,192 picteilín in aghaidh na toise,
agus 33,554,432 picteilín foinse. Samplálann FFmpeg 1–16 fhráma JPEG lárphointe, laghdaíonn
sé an chiumhais fhada go dtí 1,024 picteilín ar a mhéad gan ionchuir níos lú a mhéadú, agus
ní fhaigheann sé URL riamh. Is é `uniform` an sampláil de réir réamhshocraithe. Déanann na
beartais roghnacha `scene_aware` agus turgnamhacha `segment_aware` pas seasta breise amháin
le FFmpeg thar an sruth áitiúil atá bailíochtaithe cheana, roghnaíonn siad stampaí ama radhairc
teoranta `showinfo`, agus téann siad ar ais go cinntitheach chuig na lárphointí aonfhoirmeacha
céanna má theipeann ar an mbrathadóir, má théann sé thar am, má bhíonn aschur míchumtha ann,
nó má bhíonn an tacar iarrthóirí folamh. Leithdháileann mód atá feasach ar mhíreanna samplaí
lárphointe i gcomhréir leis na heatraimh radhairc bhailíochtaithe; sonraítear thíos fianaise
an mhóid atá feasach ar mhíreanna agus a iompar cúltaca. Cuirtear an uasteorainn dhocht
16 fhráma i bhfeidhm tar éis an roghnúcháin i ngach beartas. Nuair nach bhfuil ach buiséad
aon fhráma amháin ag iarraidh atá feasach ar radhairc, úsáideann sé lárphointe aonfhoirmeach
na fuinneoige gníomhaí don fhíseán iomlán nó don fhócas agus tuairiscíonn sé
`policyEffective: uniform`: ní féidir le fráma radhairc roghnaithe amháin an dá cheann ama
a chaomhnú. Féadfaidh glaoiteoir fuinneog fócasaithe chríochta a sholáthar go roghnach
(`start`/`end` i soicindí); teanntar na teorainneacha le fad na meán, diúltaítear d’fhuinneoga
aisiompaithe nó neamhchríochta, agus ní dhéantar na beartais samplála go léir ach amháin
laistigh den eatramh normalaithe. Cuirtear an fhuinneog a bhíonn mar thoradh air sin san
áireamh sna meiteashonraí samplála agus sa réimír tuairisce neamhiontaofa ionas gur féidir
le samhlacha iartheachtacha sliocht fócasaithe a idirdhealú ón amlíne iomlán.

Is socrú follasach ar leith é fócas séimeantach na bhfotheideal. Caomhnaíonn an mód
anailíse réamhshocraithe `full` an leid fráma atá ann cheana agus ní chuireann sé téacs na
hiarrata ar aghaidh chuig samhail na bhfotheideal riamh. Sa mhód `focused`, ní léann an
droichead ach an `text`/`input_text` neamhfholamh is déanaí a scríobh úsáideoir ón gcoimeádán
Chat nó Responses céanna, normalaíonn sé go NFC é, crapann sé carachtair rialaithe agus
spás bán, agus cuireann sé teorainn 500 códphointe Unicode air. Má bhíonn an toradh folamh,
téitear ar ais chuig an leid bheacht `full`. Sraithítear leid inúsáidte mar JSON i mbloc
tiomnaithe comhthéacs úsáideora neamhiontaofa agus ní fhéadfaidh sí ach tús áite a thabhairt
do shonraí inbhraite; ní féidir léi an rabhadh ar leith gan treoracha infheicthe nó inchloiste
sna meáin a leanúint a shárú. Ní dhéanann fócas téacsúil `start`/`end` a thuiscint ná ní
athraíonn sé an samplóir ama riamh.

#### FU-07 fianaise struchtúrach mhíreanna

Úsáideann `segment_aware` pas réamhanailíse teoranta amháin thar an sruth físeáin áitiúil atá bailíochtaithe cheana féin. Déanann an slabhra fosaithe scagairí scálú ar dtús go huasmhéid 320 picteilín ar leithead, aimsíonn sé athruithe radhairc agus eatraimh reoite, agus ansin tógann sé sampla amháin sa soicind le haghaidh doiléire, meán-lúma, agus faisnéise spásúla/ama. Tá an pas teoranta do 600 sampla struchtúracha, snáithe FFmpeg/scagaire amháin, na liostaí ceada céanna prótacail `file`-amháin agus coimeádán, teorainn 1 MiB ar aschur an phróisis, agus 30 soicind ar a mhéad laistigh de sprioc-am/comhartha tobscortha comhroinnte an bhróicéara. Ní ghlacann sé riamh le hordú, scagaire, conair ná URL ón iarratas.

Is fianaise samplála chinntitheach iad na luachanna struchtúracha, ní tuiscint shéimeantach ar fhíseán. Ní dhéanann siad ábhair, gníomhartha, fotheidil, caint ná rún úsáideora a thuiscint trí thátal. Cruthaíonn teorainneacha radhairc agus reo deighleoga; ní imríonn clúdach reo, doiléire, nochtadh, mionsonraí spásúla, agus athrú ama ach tionchar ar an gcaoi a leithdháiltear an buiséad 1–16 fráma atá ann cheana. Cuirtear uasteorainn fráma amháin ar dheighleog atá reoite go hiomlán, agus téann deighleoga neamhreoite in iomaíocht don chuid eile den bhuiséad. Nuair is mó líon na dteorainneacha ná líon na bhfrámaí, coinnítear clúdach aonfhoirmeach ar an amlíne ionas nach féidir le gearrthacha tapa luatha deighleog fhada deiridh a cheilt. Déantar teorainneacha radhairc atá laistigh de thaifeach anailíse 1 soicind ó theorainn reo a chomhtháthú.

Má bhíonn scagairí ar iarraidh, fianaise mhíchumtha/fholamh, earráid bhrathadóra, nó teorainn ama na réamhanailíse teoranta i gceist, glactar leis an mbeartas beacht aonfhoirmeach lárphointe mar réamhshocrú oscailte. Ní ghlactar le réamhshocrú oscailte i gcás tobscor ó ghlaoiteoir nó sprioc-am an bhróicéara: foirceannann sé an fophróiseas atá ar bun, cuireann sé cosc ar eastóscadh frámaí ina dhiaidh sin, agus baintear an crann sealadach príobháideach in `finally`.

Gineann `scripts/perf/video-bridge-fu07-eval.ts` daingneáin chinntitheacha réadacha FFmpeg le haghaidh coigilteas glaonna fotheidealaithe tar éis dí-dhúbailte, leithdháileadh buiséid do ghluaiseacht dhlúth, fianaise doiléire/nochtaithe/SI-TI, gearrthacha tapa le heireaball fada, agus torthaí deimhneacha bréagacha ó mhaolú céimseach. Taifeadann sé am ballachloig na réamhanailíse agus, nuair atá `/usr/bin/time` ar fáil, LAP an phróisis sliochtach agus buaic-RSS. Is tairngrí struchtúracha amháin iad a sheiceálacha cáilíochta. Fanann cáilíocht fhíor na samhla fotheidealaithe mar `HOLD` toisc nach bhfuil críochphointe údaraithe ná moltóir reoite ag an gcóras tástála seo. Fanann coigilteas airgid mar `HOLD` freisin mura soláthraíonn `--caption-cost-per-call-usd` meastachán follasach dearfach ar chostas in aghaidh an ghlao; ní chumann an script ceachtar toradh riamh.

Tá gach fráma teoranta do 4 MiB, na frámaí amh go léir le chéile do 23 MiB, agus freagairt shrathaithe an bhróicéara do 32 MiB. Baintear comhadlann shealadach phríobháideach in `finally`. Ní chuireann OmniRoute FFmpeg san áireamh agus ní ghlacann sé le conair shaincheaptha inrite. Sula ndéantar fotheidealú, cuireann an droichead pas coimeádach dí-dhúbailte amhairc i bhfeidhm: laghdaítear gach JPEG go maolán liathscála 16×16 agus ní chuirtear i gcomparáid é ach leis an bhfráma deireanach a coinníodh. I gcás buiséad iarrtha fotheidealaithe os cionn fráma amháin, soláthraíonn an t-eastóscadh linn iarrthóirí theoranta suas le dhá oiread an bhuiséid sin agus gan níos mó ná 16 fráma riamh. Ní chuirtear an uasteorainn iarrtha i bhfeidhm go dtí tar éis an dí-dhúbailte, agus caomhnaítear an chéad iarrthóir roghnaithe agus an t-iarrthóir roghnaithe deiridh le linn an tanaithe deiridh nuair is dhá fhráma ar a laghad an buiséad. Úsáideann an beartas leagain
`grayscale-16x16-mean-cells-v2` an ceann is mó de mheándeilt an lúma agus an cóimheas de chealla mionsamhlacha a bhfuil a ndeilt normalaithe 0.05 ar a laghad. Is é 0.04 an tairseach dhúblach, tairiseach a roghnaíodh ar mhaithe le hintuarthacht seachas é a nochtadh mar shocrú ag am rite. Caomhnaíonn an comhartha tánaisteach ardchodarsnachta seo mionghluaiseacht agus athruithe ar théacs infheicthe a d’fhéadfadh comparáid bunaithe ar mheán amháin a cheilt. Má bhíonn earráidí sa chomparadóir nó sa díchódóir, glactar le réamhshocrú oscailte agus coinnítear an clúdach. Déanann meiteashonraí aschuir idirdhealú idir iarrthóirí eastósctha, frámaí a úsáideadh go rathúil, agus dúblaigh amhairc a caitheadh amach.

Féadfaidh cuid físeáin atá marcáilte go follasach bileog theagmhála le stampaí ama a iarraidh. Tógann an droichead greille JPEG ina bhfuil 4 cholún agus 16 fráma ar a mhéad. Dónn gach cill 512 picteilín stampa ama a foinse isteach i mbanda bun ardchodarsnachta, agus fanann na stampaí ama céanna sna meiteashonraí téacsúla le haghaidh comhcheangail agus iniúchta iartheachtacha. Fanann an JPEG iomlán teoranta do 32 MiB. Mura féidir le `sharp` an ghreille a dhíchódú nó a chomhdhéanamh, filleann an droichead ar na frámaí aonair JPEG; leanann tobscor ón gcliant de bheith á iomadú tríd an oibríocht bileoige.

Coinnítear fianaise ardaithe céime scartha d’aon ghnó ón micreathagarmharc sintéiseach comhdhéanaimh. Sainíonn `scripts/perf/video-bridge-contact-sheet-eval.ts` córas tástála A/B le leagan scéime le haghaidh samhlacha físe réadacha atá comhoiriúnach le OpenAI. Tomhaiseann sé comharthaí a thuairiscíonn an soláthraí, aga folaigh ballachloig ó cheann ceann (comhdhéanamh bileoige san áireamh), líon glaonna ar an tsamhail, agus coinneáil fíricí arna sainiú sa lastliosta. Ní scríobhtar freagairtí amha na samhla sa tuairisc; ní choinnítear ach achoimrí SHA-256 agus aitheantais fíricí comhoiriúnaithe. Ní dhéanann an córas tástála aon ghlao líonra ná aon ghlao íoctha ar shamhail mura gcuirtear `--execute-real` ar aghaidh agus mura bhfuil `--model`, `OMNIROUTE_BASE_URL`, agus `OMNIROUTE_API_KEY` cumraithe. Gan an rith réadach follasach sin, fanann a fhíorasc meaisín-inléite mar `HOLD`; ní fianaise ardaithe céime iad tomhais shintéiseacha pálasta/líon na nglaonna astu féin.

Féadfaidh glaoiteoirí eagar roghnach `transcript.cues` a cheangal le cuid físeáin a dtacaítear léi nuair atá téacs ailínithe acu cheana féin. Ní mór `text`, eatramh críochta `start`/`end` laistigh den achar ama a tomhaiseadh, agus `source` ar an liosta ceada (`client`, `embedded`, nó `audio-bridge`) a bheith i ngach leid; is é `1` réamhshocrú `confidence` agus ní mór dó fanacht idir `0` agus `1`. Déantar leideanna atá díreach mar an gcéanna a chomhthiomsú. Ní thosaíonn OmniRoute tras-scríobh ó na meiteashonraí seo riamh: cóipeáiltear leideanna bailíochtaithe isteach sa toradh tuairiscithe in éineacht leis an bhfoinse, an mhuinín agus an t-eatramh, agus léirítear iad mar bhreathnuithe neamhiontaofa taobh le fotheidil na bhfrámaí. Diúltaítear do théacs neamhbhailí, téacs lasmuigh den raon, nó téacs gan bhunáit seachas é a mheascadh isteach sa sruth fotheidealaithe. Normalaíonn an dá chainéal tras-scríbhinne i gcorp an iarratais an bhunáit a sholáthraítear go `client`, lena n-áirítear lipéid fhéindearbhaithe `embedded` nó `audio-bridge`. Ní féidir ach le cuibheoir atá faoi úinéireacht an fhreastalaí na lipéid iontaofa sin a shannadh tríd an argóint cód-amháin `trustedSource`; ní féidir le réimse JSON in iarratas an argóint sin a bhaint amach. Fanann téacs tras-scríbhinne ina ábhar neamhiontaofa a dhíorthaítear ó mheáin, beag beann ar a bhunáit, agus ní ceadmhach dó údarú a chinneadh riamh.

Féadfaidh glaoiteoir ardleibhéil rian `audioTranscript` a sholáthar don fhíseán céanna;
caitear leis mar théacs arna sholáthar ag an gcliant, ní mar chruthúnas ar thras-scríobh ón bhfreastalaí.
Ritheann an seam comhleáite breathnuithe amhairc agus fuaime faoi
sprioc-am agus comhartha tobscortha amháin, cuireann sé in ord iad ar amlíne choiteann, comhdhlúthaíonn sé
dúblaigh chruinne, agus tuairiscíonn sé toradh páirteach nuair nach n-éiríonn ach le taobh amháin.
Má bhíonn `audioTranscript` neamhbhailí ann, díghrádaítear é go dtí an toradh páirteach sin — coinnítear an
cur síos amhairc agus taifeadann an brainse fuaime cód teipe sláintithe —
in ionad teip a chur ar an bhfíseán iomlán. Caomhnaítear infhaighteacht gach brainse, an bhratach pháirteach,
agus na cóid teipe sláintithe sa toradh a bhfuil cur síos déanta air, i meiteashonraí na
ráillí cosanta (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i meiteashonraí thaisce na dtorthaí, agus i gcuntair chomhleáite an droichid.
Ní dhéanann cosán réamhshocraithe Video Bridge urlabhra-go-téacs a agairt
ná an dara cóip mheán a íoslódáil; gan an rian sainráite sin, fanann sé
ina fhíseán amháin.

**Coinneáil tras-scríbhinne (#12150 P1).** Cuirtear é seo i bhfeidhm go huathoibríoch aon uair a
rindreálann Video Bridge (atá roghnach ann féin) leid tras-scríbhinne — níl aon
bhratach choinneála ar leith ann. Nuair a rindreálann iarratas aon leid tras-scríbhinne (`transcript`
arna dhearbhú ag glaoiteoir nó `audioTranscript` comhleáite), marcálann an ráille chosanta é mar
`videoBridgeObserved` agus táirgeann sí scáth folaithe den chur síos físe —
rindreáil chomhionann ina gcuirtear
`[redacted-video-transcript]` in ionad chorp saorthéacs gach leide, arna chruthú trí réimse struchtúrtha na leide a ionadú
sula gcóimeáiltear an teaghrán (ní trí an téacs leacaithe a pharsáil riamh, ionas nach féidir le haon
ábhar leide — bíodh sé sáraíochta nó coitianta, lena n-áirítear coirp ina bhfuil `]` amhail
`[inaudible]`/`[music]` — teacht slán). Cuireann corp iarratais loga na nglaonna a choinnítear
an scáth folaithe sin in ionad gach páirte téacs a dhíorthaítear ón bhfíseán, arna mheaitseáil de réir comhionannas
ábhair; athléitear an t-ancaire `fullText` ó phálasta críochnaithe na ráille cosanta réamhghlao,
ionas go n-éiríonn leis an meaitseáil fós tar éis do ráillí cosanta slabhra níos déanaí (na folaitheoirí PII agus
dintiúr, tosaíochtaí 10/95) téacs an chur síos a athscríobh ina áit agus
tar éis d'instealladh leid chórais/aistrithe cuimhne cruth eile a chur ar eagar na dteachtaireachtaí. Ní athraítear
an corp a sheoltar réamhtheachtach chuig an tsamhail. Ní chuireann iarratas breathnaithe
aon ní isteach i Memory marthanach ach oiread (scipeáiltear eastóscadh a dhíorthaítear ón iarratas agus ón bhfreagra araon),
mar sin ní féidir le freagra na samhla féin téacs tras-scríbhinne a athrá isteach i Memory.

**Amhréimsí físe (#12430).** Nuair atá an droichead cumasaithe agus nuair atá tacaíocht dhúchasach físe anaithnid nó in easnamh, gníomhaíonn réimsí sainithe `transcript`/`audioTranscript` `videoBridgeObserved` freisin, fiú tar éis teip ar an gcur síos nó teorainn `maxVideos`. Áirítear `null` agus teaghráin fholmha; ní áirítear réimsí atá in easnamh ná meiteashonraí nach mbaineann le físeán. Folaíonn cóipeanna coinnithe na réimsí seo nó fágtar an t-iarratas ar lár, agus seachnaítear taiscí/Memory.

Ar na cosáin chúltaca sin, déantar páirteanna `text`/`input_text` tacaithe de leideanna bailí ón nglaoiteoir
seachas réimsí soláthraí neamhchaighdeánacha. Fanann an dá rian a soláthraíodh san iarratas
ina mbreathnuithe neamhiontaofa `client`, le rabhadh sainráite nach ndearnadh cur síos ar an bhfíseán
agus nár fíoraíodh stampaí ama i gcoinne na meán. Baineann na buiséid reatha
256 leid/64 KiB san iomlán agus in aghaidh na leide leis an dá rian le chéile;
ní mór do stampaí ama teacht faoi uasteorainn 600 soicind an bhróicéara agus faoi aon fhuinneog fócais
a sholáthraítear. Caitear rianta neamhbhailí i leataobh, ní chuirtear ar aghaidh iad mar théacs treallach; féadfar
siblín bailí a úsáid fós mura sáraítear a mbuiséad comhcheangailte. Ní chuireann réimsí null/folmha
aon téacs leis. Ní chuireann an cúltaca seo aon aisghabháil meán ná tras-scríobh leis.
Baintear réimsí sínte tras-scríbhinne den iompróir físe cúltaca agus dá oibiachtaí
`video_url`/`source`. Fanann liosta ceada sreinge OpenAI docht; fanann iompróirí físe
dúchasacha anaithnide ar fáil agus coinníonn spriocanna aitheanta téacs-amháin marcóirí sábháilte.
Cosnaíonn scáthanna folaithe struchtúrtha an téacs tras-scríbhinne atá curtha i gceangal, agus fanann
an t-iarratas bunaidh ar leis an nglaoiteoir é gan athrú. Coinníonn spriocanna a bhfuil tacaíocht dhúchasach acu agus
droichid dhíchumasaithe a n-iompar seachanta reatha.

Úsáideann cóipeanna coinnithe breise an comhartha iarratais bhreathnaithe chéanna. Déanann
léargas amh an iarratais cliaint roimh an ráille chosanta, an t-iarratas ar feitheamh sa chuimhne, agus loga
luath an iarratais dhiúltaithe réimsí tras-scríbhinne i bpáirteanna físe a ionadú go struchtúrtha;
folaítear leideanna teaghráin arna sintéisiú ag céimeanna píblíne agus ag aistriú comhthéacs
ag doirteal chorp an iarratais a choinnítear. Fágann an marcóir coinnithe `video_content_removed`
go dteipeann go dúnta ar leanúint `previous_response_id` seachas téacs
a caitheadh i leataobh d'aon ghnó a athchruthú. Má chailleann iarratas breathnaithe a
scáth folaithe in aghaidh na páirte roimh logáil, nó mura n-éiríonn le fiú ceann amháin de roinnt scáthanna físe
meaitseáil tar éis athruithe níos déanaí ar an iarratas, fágtar corp an iarratais choinnithe
ar lár ina iomláine seachas tras-scríbhinn pháirt-fholaithe a choinneáil.

I gcás iarratais bhreathnaithe, d'fhéadfadh freagra samhla aon chuid den
tras-scríbhinn a lua gan teorainn struchtúrtha leide. Dá bhrí sin, cuirtear marcóir fágála ar lár in ionad
`responseBody` loga na nglaonna a choinnítear; ní choinnítear an déantán mionsonraithe
píblíne (ar féidir coirp réamhtheachtacha/cliaint agus smutáin srutha a áireamh ann).
Seachnaíonn taiscí séimeantacha, taiscí idéimpitéinse, agus taiscí athsheinnte réasúnaíochta
léamha agus scríbhinní don iarratas sin. Fanann iarratas an tsoláthraí agus an freagra
atá infheicthe don chliant gan athrú. Draenáiltear bearta luatha coinneála beo ón maolán sealadach
nuair a fhágtar an déantán mionsonraithe ar lár. Ní thuairiscíonn rabhadh Kiro faoi EventStream
míchumtha ach comhaireamh beart an phálasta, agus ní thuairiscíonn sé a inneachar ná earráid amh an pharsálaí JSON riamh.
Ní mhaíonn sé seo go ndearnadh iniúchadh ar gach diagnóisic soláthraí/breiseáin neamhghaolmhar;
rianaítear an t-iniúchadh níos leithne ar dhoirtil choinnithe in #11658.

Is fostruchtúr taisce ar leith é saolré inmheánach `/api/modality-bridge/video/drilldown`,
atá fíordheimhnithe trí lúb-aischuir/comhartha. Éilíonn gach oibríocht aitheantas
príomhaí teimhneach canónach freisin. Sula gcumasaítear glaoiteoir táirgthe, ní mór dó
an t-aitheantas sin a dhíorthú ón tionónta fíordheimhnithe agus ní ceadmhach dó choíche
luach arna roghnú ag an gcliant a chur ar aghaidh. Ceanglaíonn eochracha taisce an
príomhaí sin le haitheantais chanónacha seisiúin agus tagartha físeáin, ní stórálann siad
ach na heochracha atá díorthaithe trí SHA-256, agus cuireann siad léamha agus scriosadh
araon faoi raon feidhme an phríomhaí chéanna. Stórálann an taisce 16 fhráma JPEG
dhíorthaithe ar a mhéad in aghaidh na hiontrála, cuireann sé as feidhm iad tar éis deich
nóiméad, agus tacaíonn sé le léamha teorannaithe `start`/`end` nó le scriosadh sainráite
seisiúin.

Tá gach príomhaí teoranta do 16 iontráil agus 64 MiB de shonraí canónacha JPEG. Tá na
teorainneacha sin neamhspleách ar an uasteorainn dhomhanda de 64 iontráil/256 MiB:
ní dhíshealbhaíonn brú cuóta príomhaí ach na hiontrálacha is lú úsáid le déanaí de chuid
an phríomhaí sin sula mbreithnítear díshealbhú domhanda LRU. Glantar iontrálacha atá
imithe in éag ó chuntasaíocht an phríomhaí agus ón gcuntasaíocht dhomhanda araon le linn
gníomhaíocht taisce, agus ní dhéanann cealú ná teip bailíochtaithe athsholáthar páirteach
a chur i bhfeidhm.

Diúltaíonn an taisce do Base64 neamhchanónach, do stuáil iomarcach, do mheáin nach JPEG
iad, do JPEGanna míchumtha nó teasctha, agus do JPEGanna a ghineann rabhadh le linn
díchódú teorannaithe láníomhá `sharp`. Ath-ionchódaíonn sé gach íomhá a nglactar léi mar
JPEG canónach, díorthaíonn sé an leithead agus an airde ó na bearta díchódaithe seachas
muinín a chur i réimsí an ghlaoiteora, agus caitheann sé aon bhearta ilghlotaigh
leantacha i leataobh seachas iad a choinneáil. Ní ghearrtar ach an maolán comhbhrúite
canónach teorannaithe ar an dá chuóta. Áirítear forchostas Base64 sa teorainn sreinge
JSON don uasteorainn ionchuir dhíchódaithe de 32 MiB. Taifeadann gach
díorthú stóráilte a fhormáid/taifeach JPEG bailíochtaithe, a bheartas samplála,
leagan an díorthaithe, am cruthaithe, hais inneachair arna ríomh ag an bhfreastalaí,
agus tagairt tuismitheora haiseáilte mar aon le hais inneachair an tuismitheora ón
nglaoiteoir iontaofa. Seiceáiltear cealú idir céimeanna neamhshioncronacha díchódaithe/
haiseála roimh chur i bhfeidhm adamhach na taisce.

Ní nascann an tráinse seo táirgeoir táirgthe leis an mbealach go fóill agus ní
sholáthraíonn sé roghnú athraitheach iltaifigh. Dá bhrí sin, ní chuireann cosán
trédhearcach iarratais Video Bridge aon obair bhreise i bhfeidhm, agus fanann díorthú
príomhaí atá ceangailte leis an tionónta agus saolré iomlán iltaifigh FU-08 mar obair
leantach shainráite seachas iad a dhoiciméadú mar iompar atá críochnaithe.

Cuirtear fotheidil ar fhrámaí go seicheamhach leis an tsamhail chumraithe Video.
Faigheann sárú folamh Video an socrú Vision le hoidhreacht; má tá an dá cheann folamh,
roghnaíonn uath-ródaire Vision an tsamhail éifeachtach atá cumasach ó thaobh amhairc de.
Cuirtear fotheidil rathúla in ionad na coda bunaidh le réimír chobhsaí
`[Video description:` a mharcálann an téacs freisin mar bhreathnú neamhiontaofa atá
díorthaithe ó mheáin agus a insíonn do shamhlacha iartheachtacha gan treoracha a
aimsítear sna meáin a leanúint. Áirítear sna heochracha taisce d'fhotheidil fráma na
bearta JPEG, an leid, an stampa ama, agus an tsamhail éifeachtach; ní chuirtear ach
fotheidil rathúla i dtaisce. Coinníonn iontrálacha taisce an tsamhail táirgeora iarbhír
ar éirigh léi, lena n-áirítear samhail chúltaca; tuairiscíonn an droichead `mixed` nuair
a táirgeadh frámaí éagsúla le samhlacha éagsúla. Athúsáideann amas taisce aitheantas an
táirgeora sin seachas é a athlipéadú mar an plean ródaithe iarrtha. Tá eochair thaisce
thoradh an fhíseáin iomláin bunaithe ar gach ionchur a athraíonn an t-aschur — an leid,
an tsamhail éifeachtach, an beartas samplála, líon na bhfrámaí, mód na hanailíse
séimantacaí, méarlorg SHA-256 an leid fócais normalaithe, an fhuinneog fócais,
`transcript`, `audioTranscript`, agus bratach na bileoige teagmhála — mar sin de, má
athraítear aon cheann de na toisí sin, is teip taisce é, agus ní athúsáid seanluacha
choíche. Tá leagan an bheartais dí-dhúblála amhairc, an tairseach, agus líon teorannaithe
na bhfrámaí iarrthacha sainráite freisin in eochair agus i meiteashonraí thaisce na
dtorthaí; dá bhrí sin, ní féidir le hathrú beartais cur síos seanchaite ar an bhfíseán
iomlán a athúsáid. Coinníonn meiteashonraí v4 thaisce na dtorthaí an mód agus an
méarlorg, ach ní choinníonn siad tasc amh an úsáideora choíche. Tuairiscíonn meiteashonraí
na ráillí cosanta an mód anailíse iarrtha agus an mód éifeachtach araon; tuairiscítear
mód `focused` iarrtha gan téacs úsáideora inúsáidte mar `full` go héifeachtach.

Baineann an ráille cosanta gach cuid físeáin a dtacaítear léi amach ach ní chuireann sé
síos ar níos mó ná `modalityBridgeVideoMaxVideos`. I gcás sprice a bhfuil sé cruthaithe
fúithi go bhfuil `supportsVideo === false`, déantar marcóirí téacs sábháilte sainráite
d'fhíseáin ar theip orthu agus d'fhíseáin thar an teorainn ionas nach mairfidh aon
fhíseán amh. Nuair nach eol an cumas, coinníonn na codanna sin a n-iompróir físeáin;
leanann aon tras-scríbhinn chúltaca an tiontú téacs teorannaithe thuas. Seachnaíonn
spriocanna a bhfuil `supportsVideo === true` acu an droichead. Iomadaíonn comhartha
tobscortha iarratas an chliaint tríd an íoslódáil, ciú an bhróicéara, fophróisis, agus
glaonna fotheidealaithe; stopann tobscortha idir físeáin agus ní theipeann siad go
hoscailte chuig meáin amha choíche.

Tá socruithe rite tacaithe ag DB agus bailíochtaithe ag Zod:

| Eochair                             | Réamhshocrú | Raon / iompar                                                                                                               |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Am rite rite roghnach, rogha an úsáideora                                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | Caomhnaíonn `full` fotheidil ghinearálta; úsáideann `focused` comhthéacs teoranta, neamhiontaofa an úsáideora is déanaí     |
| `modalityBridgeVideoModel`          | `""`        | Faigh samhail Vision Bridge mar oidhreacht                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, nó `segment_aware` comhréireach; má theipeann ar an mbrathadóir, úsáidtear `uniform` mar chúltaca |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                              |

Déantar luachanna oidhreachta marthanacha ama istigh Físe os cionn 120 soicind a theorannú do
sprioc-am an bhróicéara; diúltaítear do scríbhinní nua socruithe os cionn na teorann sin.
Éilíonn `GET /api/modality-bridge/video/runtime` logántacht iontaofa stampáilte aischuarda
roimh fhíordheimhniú nó iniúchadh ama rite, agus ansin éilíonn sé fíordheimhniú bainistíochta.
Ní fhilleann sé ach `available`, leaganacha slánaithe FFmpeg/ffprobe, agus cúis sheasta
nuair nach bhfuil an t-am rite ar fáil. Ní API poiblí uaslódála é an críochphointe inmheánach
asbhainte: filleann sáithiú na scuaine `503` mar aon le `Retry-After`, filleann dícheangal
glaoiteora `499`, agus filleann sprioc-am seasta an bhróicéara `504`. Cuireann freagraí tiontaithe
`video->text;model=<visionModel>;parts=<videos>` leis an gceanntásc lárnach
`x-omniroute-modality-bridge` gan míreanna Vision ná Audio a bhaint.

### Mascóir PII (`piiMasker.ts`)

Ritheann sé ar an **dá** chéim.

- **`preCall`** clónálann sé an pálasta, siúlann sé trí `system`, `messages`, `input`, agus
  `prompt` (lena n-áirítear míreanna gnáth-theaghráin), agus cuireann sé `processPII()` (ó
  `@/shared/utils/inputSanitizer`) i bhfeidhm ar réimsí teaghráin `content`/`text`. Nuair atá
  `PII_REDACTION_ENABLED=true`, ceiltear PII braite sa phálasta amach. Tá sé seo neamhspleách
  ar `INPUT_SANITIZER_MODE` (nach rialaíonn ach an beartas insteallta leid). Nuair atá ceilt
  múchta, taifeadann an glao comhairimh braite gan an t-inneachar a athscríobh.
- **`postCall`** déanann sé domhainchlónáil ar an bhfreagra, ritheann sé `sanitizePIIResponse()` mar aon
  le mascóir chruth Responses-API (`maskResponsesOutput` — clúdaíonn sé
  `output_text` agus `output[].content[].text`). Má tharlaíonn ceilt ar bith, cuirtear an
  freagra modhnaithe in ionad an fhreagra bhunaidh.

Ní chuireann an ráille cosanta bac riamh; ní dhéanann sé ach anótáil (`meta.detections`,
`meta.redacted`) nó athscríobh.

#### Roghnú de réir cineáil, patrúin shaincheaptha agus cuntair bhrathadóireachta

Roghnaíonn **Deais → Socruithe → Slándáil → Mascadh PII** _cad_ a mhasctar. Ní
chuireann sé an mascadh ar siúl: is iad `PII_REDACTION_ENABLED` (iarratas) agus
`PII_RESPONSE_SANITIZATION` (freagra + SSE) a dhéanann sin fós, agus tá an dá cheann
múchta de réir réamhshocraithe.

- **Roghnú de réir cineáil** — liostaítear na haitheantóirí ionsuite in
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Mura socraítear é, ciallaíonn sé
  gach cineál (an t-iompar sula raibh an socrú seo ann). Mapálann patrún `ssn_us`
  an innill iarratais chuig `ssn`. Ní dhéanann teimpléid (Íosta, Caighdeánach, Airgeadais,
  Brasaíleach, SAM, Iomlán) ach na ticbhoscaí sa Chomhéadain a líonadh.
- **Patrúin shaincheaptha** — suas le 20 patrún slonn ionadaíochta nó saoróige (`*` = suas le 64
  carachtar nach spás bán iad, `?` = ceann amháin). Déantar `[CUSTOM_REDACTED]` de mheaitseálacha.
  Téann gach patrún trí `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): 500 carachtar ar a mhéad, bratacha teoranta
  do `g i m s u`, ní mór dó tiomsú, ní mór dó `safe-regex` (cúlrianú
  tubaisteach) a shárú, agus ní ceadmhach dó teaghrán folamh ná ionadchoinneálaí ceilte a mheaitseáil.
  Diúltaítear do phatrún a theipeann nuair a shábháiltear agus nuair a thástáiltear é, agus scipeáiltear
  ró stóráilte a theipeann ag am rite seachas é a thiomsú. Ní ritheann patrúin shaincheaptha ach
  nuair atá mascadh ar siúl.
- **Cuntair bhrathadóireachta** — comhairimh de réir cineáil (ní luachanna meaitseáilte riamh), a choinnítear sa
  chuimhne agus a athshocraítear ar atosú (`src/lib/pii/piiDetectionStats.ts`). Ní
  mhéadaíonn siad ach nuair atá mascadh ar siúl.

Tá na socruithe sa tábla `key_value` (ainmspás `pii_settings`,
`src/lib/db/piiSettings.ts`) agus léitear iad trí thaisce 1 s. API:

| Modh   | Conair                   | Cuspóir                                                                                    |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/pii`      | Staid na brataí, `enabledTypes`, `customPatterns`, cuntair bhrathadóireachta               |
| `PUT`  | `/api/settings/pii`      | Cuir `enabledTypes` (`null` = gach ceann) agus/nó `customPatterns` in ionad                |
| `POST` | `/api/settings/pii/test` | Tástáil thirim ar phatrún amháin in aghaidh sampla 8 KB ar a mhéad; ní stóráiltear aon rud |

Éilíonn an trí cinn fíordheimhniú bainistíochta agus bailíochtaíonn siad an corp le Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Instealladh Leide (`promptInjection.ts`)

Aimsíonn sé struchtúir naimhdeacha in inneachar arna sholáthar ag úsáideoirí agus forfheidhmíonn sé an
beartas cumraithe. Tá an t-iompar á thiomáint ag athróga timpeallachta agus roghanna an chruthaitheora:

| Socrú             | Athróg timpeallachta                                                                                  | Réamhshocrú | Éifeacht                                                                                                                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cumasaithe        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`      | Nuair atá sé `false`, déanann an ráille chosanta gearrchiorcadú.                                                                                                                                                           |
| Mód               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`      | Beartas insteallta: `block`, `warn`, nó `log`. (Glactar le `redact` ar mhaithe le comhoiriúnacht siarghabhálach ach **ní** bhaineann sé téacs insteallta; rialaítear athscríobh PII iarratais le `PII_REDACTION_ENABLED`.) |
| Tairseach blocála | rogha `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (ailias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | An íosdéine is gá chun blocáil a dhéanamh. Is le haghaidh breathnóireachta amháin atá Meánach de réir réamhshocraithe.                                                                                                     |

**Tosaíocht móid** (`getMode`): `options.mode` an ghlaoiteora →
sárú brataí gné **DB** `INJECTION_GUARD_MODE` (Deais → Socruithe →
Bratacha Gné) → athróg timpeallachta `INJECTION_GUARD_MODE` → athróg timpeallachta `INPUT_SANITIZER_MODE` →
`warn`. Mar sin, bíonn sárú ón deais i réim ar na hathróga timpeallachta, agus dá bhrí sin rialaíonn
comhéadan Bratacha Gné na cosanta reatha go beo (gan atosú). Tá léamh an DB teipshábháilte:
má tharlaíonn earráid, téann an chosaint ar ais chuig an iompar bunaithe ar athróga timpeallachta, agus nuair nach bhfuil
aon sárú socraithe bíonn an t-iompar comhionann le réiteach bunaithe ar athróga timpeallachta amháin.

Foinsí braite:

1. `sanitizeRequest()` ó `@/shared/utils/inputSanitizer` (tacar comhroinnte brathadóirí
   a úsáidtear in áiteanna eile sa phíblíne).
2. `DEFAULT_GUARD_PATTERNS` ionsuite (`system_override_inline` agus
   `markdown_system_block` faoi láthair, agus déine `high` ag an dá cheann).
3. `customPatterns` roghnacha a chuirtear ar aghaidh trí roghanna an chruthaitheora (teaghráin, sloinn rialta,
   nó taifid `{ name, pattern, severity }`).

Nuair atá `mode === "block"` **agus** nuair a chomhlíonann braitheadh amháin ar a laghad tairseach na
déine, filleann `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. Sna móid `warn`/`log`, déanann an ráille chosanta logáil ach
ceadaíonn sí an glao. Easpórtáiltear an cúntóir comhroinnte `evaluatePromptInjection()` freisin
do ghlaoiteoirí ar gá dóibh leidí a mheas gan dul tríd an gclárlann.

**Teorainn scanadh (v3.8.20):** ní scrúdaíonn an brathadóir ach an **chéad 16 KB** de
théacs na leidí comhcheangailte — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 beart) in
`src/shared/utils/inputSanitizer.ts`. Déanann `detectInjection()` agus
`evaluatePromptInjection()` araon `slice(0, MAX_INJECTION_SCAN_BYTES)` sula ritear
lúb na bpatrún. Bíonn treoracha insteallta gar do bharr ionchuir, mar sin
cuireann sé seo teorainn le CPU/GC sloinn rialta ar phálódálacha ina bhfuil na céadta KB gan an bhrath a lagú (cf.
#3932, #4041).

### Mascóir Dintiúr (`credentialMasker.ts`)

Ritheann sé ar **an dá** chéim, go deireanach sa slabhra réamhshocraithe (tosaíocht `95`). Ceileann sé
patrúin aitheanta eochracha API / comharthaí rúnda ón bpálódáil amach (inneachar
teachtaireachta, argóintí glaonna uirlisí, torthaí uirlisí) **agus** ó fhreagra an tsoláthraí, ionas nach sceitear
dintiúr a greamaíodh isteach i leid (nó a macallaíodh ar ais ag toradh uirlise)
chuig an soláthraí réamhtheachtach ná ar ais chuig an gcliant.

- **Ní mór roghnú go sainráite**, de réir an nós chéanna le ceilt PII (gar do Riail Dhocht #20):
  díchumasaithe mura bhfuil `settings.credentialRedactionEnabled === true` **nó**
  `CREDENTIAL_REDACTION_ENABLED=true`. Agus é múchta, ní dhéanann an ráille chosanta aon rud —
  ní bhlocálann sí riamh agus ní athscríobhann sí riamh.
- Siúlann `redactCredentials()` crann iomlán na pálódála/an fhreagra (`walkValue()`,
  sábháilte ar thruailliú fréamhshamhla, sábháilte ar thimthriallta trí `WeakSet`) agus cuireann sé
  ionadchoinneálaí `[REDACTED:<type>]` in áit meaitseálacha, agus ní chlónálann sé ach na craobhacha a
  athraíodh i ndáiríre.
- Clúdaíonn `CREDENTIAL_PATTERNS` eochracha soláthraithe LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), comharthaí VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), eochracha íocaíochta (Stripe, Square), eochracha
  néil (eochair rochtana AWS, Twilio, SendGrid, Mailgun), eochracha príobháideacha / JWTanna,
  teaghráin naisc ina bhfuil dintiúir (`mongodb://user:pass@...`, etc.), agus
  patrún cineálach do luach ceanntáisc `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ceileadh eochracha i gcruth ceanntáisc (`authorization`, `x-api-key`, `api-key`,
  `apikey`) go struchtúrach (an luach amháin, agus coinneofar réimír na scéime amhail
  `Bearer `/`Basic `) seachas tríd an slonn rialta cineálach téacs.
- Ní bhlocálann an ráille chosanta riamh; ní dhéanann sí ach athscríobh (`modifiedPayload` /
  `modifiedResponse`) agus anótáil (`meta.credentialsRedacted`, `meta.count`).

Cosaint aischéimnithe: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // giorraíonn true an slabhra
  message?: string; // nochtar é nuair a chuirtear bac
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // tugtar ar ais é ag preCall chun an t-iarratas a athscríobh
  modifiedResponse?: TValue; // tugtar ar ais é ag postCall chun an freagra a athscríobh
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

Cuireann ráille cosanta in iúl “gan athrú” trí `void`, `{}`, nó
`{ block: false }` a thabhairt ar ais. Má thugtar `modifiedPayload`/`modifiedResponse` ar ais, cuirtear é
in ionad an luacha a shreabhann tríd an slabhra chuig ráillí cosanta iartheachtacha.
Iompraíonn `signal?: AbortSignal` saolré an ghlaoiteora isteach sna ráillí cosanta. Is í cealú iarratais an eisceacht oscailte d’aon ghnó i gcás teipe: stopann droichid meán an obair agus déanann siad glantachán gan na meáin amh a chur ar ais chuig sprioc arb eol nach dtacaíonn sí leo.

## Clárlann (`registry.ts`)

Nochtann an t-aonán `guardrailRegistry`:

- `register(guardrail)` — cuireann sé garda-ráille leis (nó cuireann sé ceann eile ina áit de réir ainm normalaithe) agus ath-shórtálann sé de réir `priority` ardaitheach.
- `clear()` / `list()` — cúntóirí riaracháin.
- `runPreCallHooks(payload, context)` — déanann sé athrá ar gharda-ráillí gníomhacha, snáitheann sé an t-ualach tríd an `modifiedPayload`, agus stopann sé ar an gcéad `block: true`.
- `runPostCallHooks(response, context)` — an sreabhadh céanna ar thaobh an fhreagra.
- `resetGuardrailsForTests({ registerDefaults })` — glanann sé an staid agus, go roghnach, athchláraíonn sé na réamhshocruithe le haghaidh aonrú tástála glan.

Tugann an dá reathaí `{ blocked, payload|response, results, guardrail?, message? }` ar ais, áit a bhfuil `results` ina eagar de thaifid `GuardrailExecutionResult` a chuimsíonn réimsí `blocked`, `skipped`, `modified`, `error`, agus `meta` in aghaidh an gharda-ráille, atá úsáideach le haghaidh rianú.

### Garda-ráillí a Dhíchumasú in aghaidh an Iarratais

Déanann `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` liosta dí-dhúbailte d'ainmneacha garda-ráillí a bhailiú ar cheart iad a scipeáil don iarratas reatha. Foinsí (gach ceann roghnach, gach ceann cumaiscthe):

- `apiKeyInfo.disabledGuardrails`
- Comhlacht iarratais `disabledGuardrails` (barrleibhéal)
- Comhlacht iarratais `metadata.disabledGuardrails`
- Ceanntásc `x-omniroute-disabled-guardrails` (nó an ceann oidhreachta `x-disabled-guardrails`)

Féadfaidh na luachanna a bheith ina n-eagar teaghrán nó ina dteaghrán scartha le camóg; déantar ainmneacha a normalú go cás íochtair kebab-case (`pii_masker` → `pii-masker`). Cuirtear an toradh tríd an `context.disabledGuardrails` chuig an gclárlann, a scipeálann garda-ráillí meaitseála (`skipped: true` i `results`).

## Ord Feidhmithe

Maidir le gach iarratas a théann trí `src/sse/handlers/chat.ts` agus
`open-sse/handlers/chatCore.ts`:

1.  Tógann `resolveDisabledGuardrails(...)` an liosta scipeála ón eochair API, ón gcorp,
    agus ó na ceanntásca.
2.  Ritheann `guardrailRegistry.runPreCallHooks(body, ctx)` na ráillí cosanta in ord tosaíochta ardaitheach:
    - Déantar ráillí cosanta díchumasaithe a thaifeadadh mar `skipped`.
    - Féadfaidh `preCall` gach ráille cosanta an t-ualach pá a athscríobh trí `modifiedPayload`.
    - Gearrann an chéad `block: true` an slabhra agus cuireann an láimhseálaí freagra diúltaithe ráille cosanta ar ais.
3.  Sreabhann an t-ualach pá (a d'fhéadfadh a bheith athscríofa) isteach i ródú teaglama agus i seoladh in aghaidh an tsrutha.
4.  Tar éis an freagra a chur le chéile, ritheann `guardrailRegistry.runPostCallHooks(...)`
    an slabhra céanna ar an bhfreagra. Scaoileann `block: true` an freagra in aghaidh an tsrutha anseo.

Déantar ráillí cosanta a chaitheann earráid a thaifeadadh le `error: <message>` agus a logáil trí
`logger.warn`, ach leanann an slabhra ar aghaidh — teip-oscailte de réir dearaidh.

## Cumraíocht

Athróga comhshaoil a léann na ráillí cosanta ionsuite:

| Variable                              | Used by                   | Effect                                                                                                          |
| :------------------------------------ | :------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Socraigh `false` chun braite a dhíchumasú go hiomlán.                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Beartas insteallta: `warn`, `block`, nó `log`. Ní athscríobhann an luach oidhreachta `redact` téacs insteallta. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mód don gharda insteallta; bratach gné DB freisin a **sháraíonn** na hathróga comhshaoil (DB > ENV).            |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Íos-déine a dhiúltaíonn `MODE=block`: `high` (réamhshocrú), `medium`, nó `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Ailias oidhreachta do `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Nuair atá `true`, déantar PII an iarratais a eagrú (neamhspleách ar mhodh insteallta).                          |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Rialaíonn sé iompar an mhascóra ar thaobh an fhreagra.                                                          |

Léann ráillí cosanta an Modality Bridge cumraíocht reatha ón stór socruithe atá bunaithe ar DB
(`getSettings()`), ní ó athróga comhshaoil. Is iad príomheochracha Vision ná
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, agus
`modalityBridgeCacheMaxEntries`. Ní ghlactar leis na heochracha oidhreachta
`visionBridge*` ach amháin mar an t-aischur léitheoireachta aon-timthriallta
doiciméadaithe; úsáideann scríbhinní painéil na príomheochracha. Tá na réamhshocruithe agus an
réiteoir aischuir lonnaithe i `src/shared/constants/modalityBridgeDefaults.ts`, le
tairisigh oidhreachta coinnithe i `src/shared/constants/visionBridgeDefaults.ts`.

Úsáideann Fuaime `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, agus `modalityBridgeAudioMaxClips`, chomh maith leis na socruithe
comhroinnte `modalityBridgeCache*`. Níl aon aischur eochrach oidhreachta ag Fuaime toisc gur
tugadh na heochracha seo isteach le scéimre an Modality Bridge.

Úsáideann Físeán `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, agus
`modalityBridgeVideoTimeout`, chomh maith leis na socruithe comhroinnte `modalityBridgeCache*`.
Tá sé díchumasaithe de réir réamhshocraithe toisc gur spleáchais oibríochtúla roghnacha iad
FFmpeg/ffprobe agus go gcuireann fotheidealú fráma moill agus costas samhail leis.

## Cosaintí Saincheaptha

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

1.  Cruthaigh `src/lib/guardrails/myGuardrail.ts` ag leathnú `BaseGuardrail`.
2.  Cuir `preCall` agus/nó `postCall` i bhfeidhm.
3.  Cláraigh ag am iompórtála (brúigh ó `registerDefaultGuardrails`) nó glaoigh ar `guardrailRegistry.register(...)` ag am rite — cuirfidh an clárlann aon chosaint roimhe seo leis an ainm normalaithe céanna in ionad.
4.  Cuir tástálacha leis faoi `tests/unit/` (samplaí atá ann cheana:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Tástáil

Úsáid `resetGuardrailsForTests()` idir tástálacha chun tús a chur le staid aitheanta. Cuir `{ registerDefaults: false }` ar aghaidh chun tús a chur le clárlann fholamh agus chun na cosaintí atá á dtástáil amháin a chlárú. Glacann Vision Bridge le hinstealladh spleáchais (`deps.getSettings`, `deps.callVisionModel`); nochtann Audio Bridge na hailt chomhionanna le haghaidh socruithe, cumais, roghnú samhail STT, seiceálacha dintiúir, agus trascríobh. Is féidir le tástálacha an dá shreabhadh a fheidhmiú dá bhrí sin gan rochtain ar DB nó ar líonra.

## Féach Freisin

- `src/lib/guardrails/` — cur i bhfeidhm
- `src/shared/utils/inputSanitizer.ts` — brathadóir comhroinnte a chumhachtaíonn instealladh pras agus mascáil PII
- `src/shared/constants/visionBridgeDefaults.ts` — réamhshocruithe Vision Bridge agus liosta samhlacha droichid éigeantacha
- `src/shared/constants/modalityBridgeDefaults.ts` — réamhshocruithe comhroinnte ama rite Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ciseal ortagánach (scoradán ciorcaid, fuarú)
- `docs/reference/ENVIRONMENT.md` — tagairt iomlán do athróga comhshaoil

## Clúdach bealaigh cosanta insteallta & foireann dhearg (Céim 8 · Bloc D)

Clúdaíonn an cosantóir insteallta (`createInjectionGuard` / `withInjectionGuard`) gach bealach a ghlacann le prasanna úsáideora. Tugann sé ómós do `INJECTION_GUARD_MODE` (réamhshocrú `warn` = logáil amháin; `block` = seolann sé ar ais HTTP 400 `SECURITY_001`).

| Cineál                 | Bealaí                                                                                                                                               | Mód réamhshocraithe |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Téacs (atá ann cheana) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Giniúnach              | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Sonraí                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Clúdaíonn eastóscadh téacs (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Foireann dhearg (oíche, `nightly-llm-security.yml`):** fíoraíonn promptfoo go gcuireann gach bealach bac ar an gcorp OWASP-LLM i `INJECTION_GUARD_MODE=block`; ritheann garak taiscéalaithe (scipeann sé gan rún). Cuirtear `moderations` san áireamh ar mhaithe le comhsheasmhacht — is féidir le hoibreoirí i mód bloc é a dhíolmhú trí `resolveDisabledGuardrails`.

Tá dhá phost ag an sreabhadh oibre oíche (`.github/workflows/nightly-llm-security.yml`, cron + seoladh láimhe):

- **`promptfoo-guard` (blocáil)** — ritheann sé `promptfoo eval -c promptfooconfig.yaml` le `INJECTION_GUARD_MODE=block`. Dearbhaíonn gach cás frithsheasmhach (m.sh. "déan neamhaird de gach treoir roimhe seo…", jailbreaks stíl DAN) go bhfuil `error.code === "SECURITY_001"` sa fhreagra, i.e. gur dhiúltaigh an cosantóir an t-iarratas i ndáiríre.
- **`garak` (comhairleach)** — ritheann sé garak `--probes promptinject,dan,leakreplay` i gcoinne cás áitiúil OmniRoute (`http://localhost:20128/v1`). Geataithe ar rún soláthraí (`PROMPTFOO_PROVIDER_KEY`); scipeann sé go galánta agus tá an iarmhír `|| true` leis, ionas go dtuairiscíonn sé gan teip CI.

Clúdaíonn clúdach an chúntóra cosanta (`createInjectionGuard` / `withInjectionGuard`) gach bealach `/v1` a iompraíonn prasanna; tarraingítear téacs an phrais ó `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ag `extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
