# Resilience Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

Tá trí shásra athléimneachta ar leith ach gaolmhara ag OmniRoute. Tá raon feidhme agus cuspóir difriúil ag gach ceann acu. Coinnigh ar leithligh iad agus iompar ródaithe á dhífhabhtú agat.

![Samhail athléimneachta 3 shraith](../diagrams/exported/resilience-3layers.svg)

> Foinse: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Scoradán Ciorcaid Soláthraí

**Raon feidhme:** an soláthraí iomlán (m.sh., `glm`, `openai`, `anthropic`).

**Cuspóir:** stop a chur le trácht a sheoladh chuig soláthraí a bhfuil teipeanna arís agus arís eile aige ar leibhéal an chórais réamhtheachtach/na seirbhíse.

**Cur chun feidhme:**

- Croí-aicme: `src/shared/utils/circuitBreaker.ts`
- Sreangú: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stádais: `GET /api/monitoring/health`
- API athshocraithe: `POST /api/resilience/reset`
- Cumhdaigh: `open-sse/services/accountFallback.ts`
- Tábla DB: `domain_circuit_breakers`

**Staideanna:**

- `CLOSED` — ceadaítear gnáth-thrácht
- `DEGRADED` — ceadaítear trácht fós, ach táthar ag rianú teipeanna méadaithe soláthraí; filleann sé ar `CLOSED` tar éis dóthain rathanna, tar éis tástáil naisc bhailí, nó tar éis na tréimhse coinneála `OPEN` is faide don chineál teipe deireanach (a luach `cooldownByKind`, nó `resetTimeout` murach sin, × `maxBackoffMultiplier`, agus tréimhse mhaolaithe amháin ar a laghad) gan teip nua
- `OPEN` — tá an soláthraí bactha go sealadach; scipeálann ródú teaglama é
- `HALF_OPEN` — tá an teorainn ama athshocraithe caite; ceadaítear iarratas taiscéalaíoch

**Réamhshocruithe inchumraithe (`open-sse/config/constants.ts`, ar fáil in Deais → Socruithe → Athléimneacht):**

| Aicme       | Díghrádaithe ag | Osclaítear ag | Teorainn ama athshocraithe |
| ----------- | --------------- | ------------- | -------------------------- |
| OAuth       | 5 theip         | 8 dteip       | 60s                        |
| Eochair API | 7 dteip         | 12 theip      | 30s                        |
| Áitiúil     | díorthaithe     | 2 theip       | 15s                        |

Rialaíonn `degradationThreshold` cathain a théann soláthraí isteach i `DEGRADED`; rialaíonn `failureThreshold` cathain a osclaítear é agus a scipeáiltear é. Níl próifílí soláthraithe áitiúla ar fáil fós ar leathanach na socruithe Athléimneachta.

**Cóid tuisle:** stádais ar leibhéal an tsoláthraí amháin `[408, 500, 502, 503, 504]`. NÁ tuisligh i gcás earráidí ar leibhéal an chuntais (formhór na n-earráidí 401/403/429 — baineann siadsan le maolú nó frithdhúnadh).

**Aisghabháil leisciúil:** nuair a théann `OPEN` in éag, déanann `getStatus()`, `canExecute()`, `getRetryAfterMs()` an staid a athnuachan go `HALF_OPEN`. Laghdaíonn na léamha céanna (agus an chéad teip eile) `DEGRADED` seanchaite ar ais go `CLOSED`. Níl aon amadóir cúlra ag teastáil.

---

### Maolú domhanda Soláthraí le rogha rannpháirtíochta (geata fuinneoige)

Coinníonn ceathrú sraith **roghnach** (`PROVIDER_COOLDOWN_ENABLED`, **as** de réir réamhshocraithe)
cuimhne tras-iarratais ar sholáthraithe a bhfuil ag teip orthu in
`open-sse/services/providerCooldownTracker.ts`, agus téitear i gcomhairle léi le linn spriocanna teaglama a
réiteach ionas nach ndéanfaidh iarratais teaglama leantacha soláthraí ar theip air díreach
a shiúl arís. Urramaíonn iontrálacha ar leibhéal an tsoláthraí geata fuinneoige `PROVIDER_PROFILES`:

| Próifíl     | tuislíonn tar éis (`providerFailureThreshold`) | laistigh de (`providerFailureWindowMs`) | maolaíonn ar feadh (`providerCooldownMs`) |
| ----------- | ---------------------------------------------: | --------------------------------------: | ----------------------------------------: |
| OAuth       |                                           `10` |                                 `15min` |                                    `5min` |
| Eochair API |                                           `15` |                                 `30min` |                                   `10min` |

Faoi bhun na tairsí, **ní** mheastar go bhfuil an soláthraí ag maolú; glanann
rath an fhuinneog. Coinníonn iontrálacha ar leibhéal an naisc (`provider:connectionId`) an
cúlú easpónantúil `minRetryCooldownMs → maxRetryCooldownMs` ina ionad. Sáruithe:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Cosaint aischéimnithe: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Tréimhse Mharana Ceangail

**Raon feidhme:** nasc/cuntas/eochair aonair soláthraí.

**Cuspóir:** seachain eochair lochtach amháin agus lig do naisc eile don soláthraí céanna leanúint de bheith ag freastal.

**Cur chun feidhme:**

- Marcáil mar neamhinúsáidte: `src/sse/services/auth.ts::markAccountUnavailable()`
- Roghnú: `getProviderCredentials*` sa chomhad céanna
- Ríomh na tréimhse marana: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Socruithe: `src/lib/resilience/settings.ts`

**Réimsí in aghaidh an naisc:**

- `rateLimitedUntil` — stampa ama go dtí go rachaidh an tréimhse mharana in éag
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — cuntar cúlaithe easpónantúil

**Tréimhsí marana réamhshocraithe:**

- Bonn OAuth: 5s
- Bonn eochrach API: 3s
- Eochair API 429: tugtar tús áite do `Retry-After`/ceanntásca athshocraithe ón tseirbhís réamhtheachtach/téacs athshocraithe is féidir a pharsáil
- Cúlú: `baseCooldownMs * 2 ** failureIndex`

**Cosaint in aghaidh an tréada stampála:** cuireann sí cosc ar theipeanna comhthráthacha an tréimhse mharana a shíneadh an iomarca nó `backoffLevel` a mhéadú faoi dhó.

**Ní théann 429anna teorann comhthráthachta suas dréimire an chúlaithe.** Ciallaíonn `429` a dtuairiscíonn a chorp teorainn chomhthráthachta ("an iomarca iarratas comhthráthach", "teorainn chomhthráthachta", "teorainn iarratas comhthreomhar", GLM `并发数过高`) go bhfuil an cuntas sláintiúil ach gnóthach.
Filleann `checkFallbackError()` an chúis `concurrency_limited`: aistrigh cúltaca chuig an gcéad
nasc eile anois, cuir an ceann seo ar marana ar feadh `CONCURRENCY_LIMIT_COOLDOWN_MS` seasta (1s) nó ar feadh na tréimhse a mholann an tseirbhís réamhtheachtach, coinnigh `backoffLevel` gan athrú, agus socraigh `skipProviderBreaker`.
Bíonn tosaíocht fós ag corp cuóta follasach, mar sin fanann corp a mheaitseálann patrún cuóta freisin ina bhreithiúnas cuóta.
Brath: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`;
breithiúnas: `open-sse/services/accountFallback/concurrencyLimit429.ts`. Tá `classify429()` (`FailureKind` an scoradáin) gan athrú agus léann sé `rate_limit` fós do na coirp seo.

**Ní chuireann marbhántachtaí ábhair srutha an cuntas ar marana.** Nuair a éiríonn faireoir marbhántachta an ábhair
(`open-sse/utils/streamHandler.ts`) as sruth nár sheol aon aschur ón tsamhail
in am, taifeadann `markAccountUnavailable()` an earráid ar an nasc ach ní shocraíonn sé aon
tréimhse mharana: baineann an mharbhántacht leis an iarratas sin, agus is minic gur seal fada réasúnaíochta é nach bhfuil aon
aschur uaidh fós. Is féidir le hoibreoirí roghnú filleadh air le `resilienceSettings.streamStallCooldown.enabled`
(`false` de réir réamhshocraithe).

**Atosaíonn frámaí réasúnaíochta buiséad marbhántachta an ábhair.** Is féidir le samhail réasúnaíochta smaoineamh ar feadh
nóiméad sula dtagann a céad chomhartha infheicthe: sruthaíonn Claude frámaí `thinking_delta` a bhféadfadh a
dtéacs smaointeoireachta a bheith folamh, agus sruthaíonn an Responses API mír réasúnaíochta amháin i ndiaidh
míre eile. Aithníonn `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`)
na frámaí seo, agus atosaíonn an faireoir a bhuiséad ar gach ceann acu seachas an
seal a chealú. Ní aschur ón tsamhail iad fós, mar sin tuairiscítear mar fholamh fós
seal nach gcríochnaíonn ach le réasúnaíocht, agus gníomhachtaíonn seal a stopann den réasúnaíocht agus nach seolann ach buillí croí
an faireoir fós.

Caomhnaíonn frámaí dénártha `reasoningContentEvent` Kiro a bhfuil síniú neamhfholamh orthu an
ghníomhaíocht réasúnaíochta seo tríd an seiceadóir mar dheilte folamh `reasoning_content`. Ní chuirtear an síniú
ar aghaidh. Ní atosaíonn meiteashonraí, frámaí neamhiomlána ná sínithe folmha
buiséad an ábhair; tá an teorainn ama neamhspleách don sruth gníomhach agus cealú an chliaint fós
i bhfeidhm (`open-sse/executors/kiro/reasoning.ts`).

**Staid chríochfoirt (NÍ tréimhsí marana iad):**

- `banned` — socraítear é trí bhrath eochairfhocail coiscthe / coisc cuntais (féach [BAN_DETECTION](../security/BAN_DETECTION.md)), agus trí thrí dhiúltú réamhtheachtach as a chéile in aghaidh an iarratais (`request_rejected`, e.g. Anthropic OAuth 403 "Iarratas neamhcheadaithe" — `open-sse/services/requestRejectedStreak.ts`); ní chuireann diúltú aonair ach an nasc ar marana
- `expired` (aistríonn sé go staid chríochfoirt tar éis líon teoranta atrialacha — `EXPIRED_RETRY_MAX = 3` le cúlú easpónantúil — ionas gur féidir le hearráidí sealadacha OAuth iad féin a leigheas sula ndíghníomhachtaítear an cuntas go buan)
- `credits_exhausted`

Maireann siad seo go dtí go n-athraíonn na dintiúir nó go n-athshocraíonn oibreoir iad. Ná scríobh staid shealadach mharana anuas ar staideanna críochfoirt.

**Athshlánú leisciúil:** nuair atá `rateLimitedUntil` caite, bíonn an nasc incháilithe arís. Tar éis úsáid rathúil, glanann `clearAccountError()` gach réimse earráide.

### Balla úsáide Claude OAuth: lána tosaíochta níos ísle + athshocrú teorann seisiúin

**Raon feidhme:** nasc síntiúis amháin Claude (OAuth). Tá an dá ghné **roghnach in aghaidh an
naisc** (Cuir nasc in eagar → rannán Claude → `lowPriorityMode` / `autoLimitReset` in
`providerSpecificData`, iad araon múchta de réir réamhshocraithe) agus déanann siad aithris ar orduithe `/low-priority` agus
`/limit-reset` Claude Code (conradh sreinge gabhtha ó Claude Code 2.1.263).

**Cur chun feidhme:**

- Meaisín staide + aicmiú freagartha: `open-sse/services/claudeLowPriority.ts`
- Cliant stádais/éilimh athshocraithe: `open-sse/services/claudeLimitReset.ts`
- Crúca seiceadóra (instealladh ceanntáisc + atriail leis an gcuntas céanna): `open-sse/executors/base.ts::execute()`
- Marthanacht roghnach: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Truicear:** an balla úsáide 5 uair an chloig — `429` a bhfuil
`anthropic-ratelimit-unified-status: rejected` ina cheanntásca agus, nuair atá an cuntas incháilithe,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ní sheoltar tada roimh an gcéad 429 balla
sin; téann 429 ráige gan cheanntásca aontaithe tríd an ngnáthchonair mharana.

**Lána tosaíochta níos ísle** (`lowPriorityMode`):

- Ar an 429 balla glacann an seiceadóir leis an tairiscint agus déanann sé iarracht arís láithreach leis an gcuntas **céanna**
  agus `anthropic-usage-limit: slow`; fanann an lána gníomhach go dtí an
  `anthropic-ratelimit-unified-reset` fógartha (+60s de thréimhse mhaolaithe) agus bíonn an ceanntásc
  ar gach iarratas san fhuinneog sin. Ní shroicheann an 429 idircheaptha `handleChatCore`, mar sin
  **ní** chuirtear an nasc i dtréimhse shuaimhnithe agus ní rothlaítear amach é.
- `anthropic-ratelimit-unified-slow-status` ar fhreagraí ina dhiaidh sin: coinníonn `active` / `not_needed`
  an lána; fanann `slot_busy` (429) nó `529` ar feadh
  `anthropic-ratelimit-unified-slow-retry-after` an fhreastalaí (20s de réir réamhshocraithe, clampáil 5–600s, giodam ±30%)
  agus déanann sé iarracht arís, faoi theorainn `anthropic-ratelimit-unified-slow-max-wait` (20 nóim de réir réamhshocraithe, clampáil
  1 nóim–6 u) — ina dhiaidh sin críochnaíonn an lána agus cuireann tréimhse shuaimhnithe 10 nóiméad bac ar athghlacadh. Cuirtear
  teorainn bhreise leis an tréimhse feithimh de réir a bhfuil fágtha d’am istigh tosaithe réamhtheachtach an iarratais féin
  (`resolveFetchStartTimeout`, 10 nóim de réir réamhshocraithe) lúide corrlach 5 s: gan an teorainn sin,
  mhairfeadh an t-uasmhéid feithimh réamhshocraithe 20 nóiméad níos faide ná an t-iarratas agus chuirfí deireadh leis an gcodladh
  i lár na feithimh, rud a thabharfadh `TimeoutError` chun solais in ionad chríoch shéimh `max_wait` + tréimhse shuaimhnithe.
- Cuireann `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, athrú fuinneoige 5u, nó
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (a chuireann deireadh leis mar
  `extra_usage` ar aon stádas, ós rud é go gclúdaíonn ró-úsáid íoctha an balla anois) deireadh leis an lána; ansin
  sreabhann an freagra chuig gnáthchonair na tréimhse suaímhnithe. Coinnítear `budget_exhausted` i gcuimhne go dtí
  an t-athshocrú buiséid fógartha (≤ 8 lá).
- Ritheann seiceáil an bhalla tar éis athiarrachtaí laistigh den iarracht féin de chuid an tseiceadóra arna spreagadh ag 400 (eagarthóireacht
  comhthéacs, clampálacha smaointeoireachta/iarrachta, uathfhoghlaim paraiméadar), mar sin déantar 429 balla nach dtagann chun solais ach
  ar cheann de na hathiarrachtaí sin a idircheapadh fós seachas ligean dó conair na tréimhse suaímhnithe a bhaint amach.
- Tá an staid sa chuimhne in aghaidh an naisc (cosnaíonn atosú 429 balla breise amháin chun glacadh leis arís).

**Athshocrú teorann seisiúin** (`autoLimitReset`, baintear triail as roimh an lána nuair atá an dá cheann casta air):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → bloc `juniper_tide`;
  nuair atá `arm: "reset"` agus `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` le
  `{ "program": "juniper_tide" }` (UUID na heagraíochta ó
  `providerSpecificData.organizationUUID`, cúltaca bútstrapála).
- `result: reset|not_limited` → déantar an t-iarratas arís ar lánluas (gan ceanntásc mall).
  Cuireann `already_used` / `not_offered` `next_available_at` i gcuimhne (seachtain amháin de réir réamhshocraithe); tar éis
  aon teipe déantar cúlú 15 nóiméad. Déantar an t-athshocrú uair sa tseachtain agus áirítear é fós i dtreo na
  teorann seachtainiúla.

Cosaintí aischéimnithe: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Cleamhnas seisiúin (#7274)

**Raon feidhme:** seisiún cliaint amháin (ceanntásc `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) pionnáilte le nasc amháin, i gcás **aon** soláthraí.

**Cuspóir:** gníomhaire ilseal a choinneáil (Claude Code, aider, gníomhairí saincheaptha) ar an gcuntas céanna thar iarratais, rud a laghdaíonn caillteanas comhthéacs idir cuntais agus 429anna athfhillteacha ó thosú fuar ar sholáthraithe a bhfuil staid seisiúin in aghaidh an chuntais acu.

**Cur chun feidhme:**

- Réiteach TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Roghnú/cruthú pionna: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Eastóscadh ceanntáisc (cineálach, aon soláthraí): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tábla pionna marthanach: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Socrú: `sessionAffinityTtlMs` (TTL domhanda i ms, díchumasaíonn `0` é) — `src/lib/db/settings.ts`. Athainmníodh é ón `codexSessionAffinityTtlMs` a bhain le Codex amháin trí ascnamh `124_generic_session_affinity_ttl.sql`, a thugann aon TTL Codex a cumraíodh roimhe seo ar aghaidh mar an réamhshocrú nua.

Roimh #7274, stop `resolveSessionAffinityTtlMs()` láithreach agus thug sé `0` ar ais do gach soláthraí seachas `codex`, mar sin ní raibh aon éifeacht ag an socrú TTL (ná ag ceanntásca an tseisiúin) in aon áit eile cé go raibh an mheicníocht pionnaithe agus eastóscadh na gceannteideal neamhspleách ar an soláthraí cheana féin. Bhain an ceartúchán an luathfhilleadh sin; baineann an TTL anois go haonfhoirmeach le gach soláthraí a luaithe a shocraítear go domhanda é os cionn `0`.

Ní chuirtear na trí cheanntásc cleamhnais seisiúin ar aghaidh go réamhtheachtach riamh — tógann na seiceadóirí a gceanntásca réamhtheachtacha féin ón tús seachas ceanntásca an chliaint a chur tríd, mar sin ní fhanann sé seo ach mar aitheantas inmheánach comhghaolúcháin.

### Léasanna eisiacha do naisc seisiúin bhainistithe

**Raon feidhme:** is le cliant/seisiún HTTP bainistithe gníomhach amháin nasc OmniRoute incháilithe amháin.

**Cuspóir:** úinéireacht eisiach mharthanach naisc a sholáthar do chliaint a dteastaíonn bacainn ródaithe dhocht uathu
thar iarratais. Tá sé seo éagsúil le cleamhnas seisiúin, ar rogha bhog leanúnachais é:
coinníonn léas eisiach staid saolré in SQLite, forfheidhmíonn sé uathúlacht dhomhanda úinéara ghníomhaigh agus
naisc ghníomhaigh, agus diúltaíonn sé do ghlúin shean sula ndéantar seoladh chuig an soláthraí.

Tá an ghné roghnach in aghaidh na heochrach API. Ní mór an raon feidhme `lease:exclusive` agus liosta
sainráite neamhfholamh `allowedConnections` a bheith ag eochair bhainistithe. Is féidir le haon chliant HTTP críochphointe na saolré a úsáid; ní
theastaíonn ainm cliaint, user-agent, soláthraí, modh OAuth ná samhail. Is le nasc an léas,
ní le samhail, mar sin coinníonn athrú samhla an ceangal fad a fhanann an nasc incháilithe
de ghnáth. Fanann na gnáthrialacha maidir le samhail, cuóta, sláinte, tréimhse shuaimhnithe agus liosta ceadaithe ceannasach agus féadfaidh siad
an ghlúin chéanna a aistriú chuig nasc incháilithe eile atá saor.

Is é an saolré `POST /api/v1/session-leases` leis na gníomhartha JSON `acquire`, `renew`, agus `release`.
Cuireann iarrataí tátail bainistithe an luach teimhneach `X-OmniRoute-Lease-Owner` agus an
`X-OmniRoute-Lease-Generation` cruinn i láthair. Úsáideann an t-úinéir `vlo_` agus 43 carachtar base64url ina dhiaidh; ní stóráiltear ach
a hais SHA-256. Ceanglaíonn gach fál seolta deiridh aitheantas na heochrach API fíordheimhnithe agus
aitheantas an naisc ghníomhaigh freisin. Baintear ceanntásca rialaithe léasa de logaí, de ghrianghraif iarratais choinnithe, agus de
cheanntásca an fhorghníomhaitheora réamhtheachtaigh.

Má tá iarrthóirí bainistithe incháilithe ag an ngnáthródú ach go bhfuil gach iarrthóir saor áitithe ag
léas gníomhach eachtrach, tugann OmniRoute HTTP `429`, an cód lease-capacity-unavailable,
staid waiting-for-capacity, agus `Retry-After` teoranta a dhíorthaítear ón dul in éag ábhartha is luaithe.
Ní hionann gnáth-incháilitheacht fholamh agus iomaíocht léasa, agus coinníonn sí na séimeantaicí earráide ródaithe atá aici cheana.

Fanann meicníochtaí gaolmhara ar leithligh:

- Is dáileadh bog próiseas-áitiúil é áitíocht seisiúin OAuth do chuntais OAuth.
- Deonaíonn séamafóir cuntais ceadanna comhthráthachta iarratais agus críochnaíonn siad nuair a chuirtear iarratas i gcrích.
- Is úinéireacht mharthanach saolré iad léasanna eisiacha seisiúin bhainistithe, agus fál giniúna ag gabháil leo.

---

## 3. Frithdhúnadh Samhla

**Raon feidhme:** triúr soláthraí + nasc + samhail.

**Raon feidhme na heochrach de réir stádais:** is é an stádas teipe a chinneann cén eochair a scríobhann frithdhúnadh chuici
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — comhartha cuóta nó teidlíochta — cuir an **teaghlach cuóta** faoi ghlas:
  i gcás codex, raon feidhme iomlán `codex` / `spark` (gach samhail `gpt-5*` de chuid an
  naisc); i gcás soláthraithe eile, `getQuotaScopedModelForProvider()`.
- Cuireann `404` an tsamhail lom faoi ghlas (`getModelLockKey()` a chaolaíonn `not_found`).
- Aon stádas eile — teipeanna iompair/freastalaí `5xx` agus an `502` sintéisithe de chuid
  OmniRoute féin ó bhailíochtú cáilíochta — ní chuireann sé faoi ghlas ach an
  triúr beacht soláthraí/nasc/samhail. Ní fianaise faoi chuóta an chuntais é
  drochshruth ar shamhail amháin; roimh an riail seo, bhain freagra folamh amháin ar
  `codex/gpt-5.6-luna` gach samhail `gpt-5*` den nasc sin den
  ródú ar feadh 2–30 nóiméad (ag dul i ngéire), cé nach ndearnadh difear dá chuóta.
- Bíonn tosaíocht i gcónaí ag rogha shainráite `scope` an ghlaoiteora (tugann Antigravity `"exact"`).

**Cuspóir:** seachain nasc iomlán a dhíchumasú nuair nach bhfuil ach samhail amháin ar fáil nó nuair atá sí teoranta ag cuóta.

**Samplaí:**

- Soláthraithe cuóta in aghaidh na samhla a fhilleann 429
- Soláthraithe áitiúla a fhilleann 404 i gcás samhail amháin atá ar iarraidh
- Teipeanna ceada a bhaineann go sonrach le mód/samhail soláthraí (m.sh., móid Grok)

**Cur chun feidhme:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Deais Tréimhsí Marbhánta Samhla (v3.8.0)

Comhéadan: Socruithe → Tréimhsí Marbhánta Samhla (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Liostaítear frithdhúnadh gníomhach mar aon le: soláthraí, nasc, samhail, cúis, expiresAt. Is féidir le hoibreoirí samhail a athchumasú de láimh ón gcárta.

**REST API:**

- `GET /api/resilience/model-cooldowns` — liostaigh frithdhúnadh gníomhach
- `DELETE /api/resilience/model-cooldowns` — athchumasú de láimh. Corp: `{provider, connection, model}`. Fíordheimhniú: bainistíocht.

### Bainisteoir Tréimhsí Marbhánta

Comhéadan: Monatóireacht → Bainisteoir Tréimhsí Marbhánta (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Leathanach amháin do gach nasc atá lasmuigh den ródú ar chúis shealadach, in ionad
gach leathanach soláthraí a oscailt. Liostaítear ann tréimhsí marbhánta na nasc, frithdhúnadh samhla agus staideanna
foirceanta; glantar iad de réir naisc, do rogha nasc, nó do gach nasc de chuid soláthraí;
agus cuirtear na rialacha tréimhse marbhánta is mó mionchoigeartaithe in eagar: `streamStallCooldown.enabled` agus
buntréimhse mharbhánta `connectionCooldown` OAuth / eochrach API agus uaschéimeanna an chúltaca (sábháilte trí
`PATCH /api/resilience`). Liostaítear staideanna foirceanta (`banned`, `expired`, `credits_exhausted`) ach
ní ghlantar anseo choíche iad.

**REST API** (`src/lib/resilience/cooldownManager.ts`, fíordheimhniú: bainistíocht):

- `GET /api/resilience/cooldowns[?provider=]` — naisc mar aon le stádas, tréimhse mharbhánta atá fágtha,
  leibhéal cúltaca, cineál na hearráide deireanaí agus frithdhúnadh samhla (gan dintiúir)
- `POST /api/resilience/cooldowns` — corp `{connectionIds: string[]}` nó
  `{all: true, provider?}`; filleann sé `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Comhéadan socruithe frithdhúnta + aisghabháil trí mheath ratha (v3.8.23)

D'athraigh frithdhúnadh samhla ó iompar crua-chódaithe a bhí i bhfeidhm i gcónaí go gné lánchumraithe
roghnach, lena cárta socruithe féin agus conair aisghabhála féinleighis.

**Cárta socruithe:** Socruithe → Frithdhúnadh Samhla
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tá sé seo **ar leith** ón `ModelCooldownsCard` inléite amháin thuas (nach ndéanann ach
frithdhúnadh gníomhach a _liostú_) — déanann an cárta nua _na paraiméadair a chumrú_. Tá na réamhshocruithe
in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Socrú                   | Réamhshocrú                      | Brí                                                                                        |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Máistirlasc — tá frithdhúnadh samhla **as de réir réamhshocraithe**.                       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Staideanna réamhtheachtacha a áirítear mar theip a bhaineann le samhail.                   |
| `baseCooldownMs`        | `120_000` (120 s)                | Fad tosaigh an fhrithdhúnta don chéad teip.                                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Uasteorainn na tréimhse marbhánta méadaithe.                                               |
| `maxBackoffSteps`       | `10`                             | Uaslíon céimeanna méadaithe an chúltaca easpónantúil.                                      |
| `useExponentialBackoff` | `true`                           | Cé acu a mhéadaíonn teipeanna arís agus arís eile an tréimhse mharbhánta go heaspónantúil. |

Maireann na socruithe tríd an ngnáthstór socruithe agus déantar iad a bhailíochtú trí
scéimre na socruithe athléimneachta; cuireann an cárta teorainneacha ar `baseCooldownMs`/`maxCooldownMs`
(le `maxCooldownMs ≥ baseCooldownMs`) agus `maxBackoffSteps`.

**Aisghabháil trí mheath ratha:** ní hionann aisghabháil agus dul in éag an amadóra amháin. Laghdaíonn
freagra sláintiúil comhaireamh teipeanna na samhla céim ar chéim, ionas go stopann samhail a d'aisghabh
i lár na fuinneoige de bheith ag dul i ngéire (agus go nglantar í) sula ndéanfadh a hamadóir amhlaidh. Ar sprioc teaglama
rathúil, glaonn `open-sse/services/combo.ts` ar `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), a **leathnaíonn** an `failureCount`
stóráilte (`Math.floor(failureCount / 2)`); nuair a shroicheann sé `0`, scriostar an iontráil
frithdhúnta go hiomlán. Méadaíonn an comhpháirtí `recordModelLockoutFailure()`
an comhaireamh (agus méadaíonn sé an tréimhse mharbhánta) ar theipeanna laistigh den
fhuinneog mhéadaithe. Tá an meath ratha seo sa bhreis ar ghnáthdhul in éag an amadóra —
is féidir le ceachtar conair samhail a athchumasú.

**Staid:** coinnítear frithdhúnadh **sa chuimhne** (`Map`anna de réir próisis de
`ModelLockoutEntry` a bhfuil `provider:connectionId:model` mar eochair orthu, agus glais bheachta raoin a bhfuil
`provider:connectionId:exact:model` mar eochair orthu), agus ní bhuantar iad sa
bhunachar sonraí — cailltear iad ar atosú. Buanstóráiltear na _socruithe_; tá _staid_
ghníomhach an fhrithdhúnta neamhbhuan.

---

## 4. Rialú Comhthráthachta Quota-Share (v3.8.36)

Is minic nach nglacann cuntais síntiúis (GLM, MiniMax, etc.) ach le ~1–3 iarratas
comhthráthacha; má sháraítear é sin, spreagtar 429anna agus tréimhsí athshocraithe. Bíonn sé seo thar a bheith géar faoi
theaglamaí **quota-share** (`qtSd/…`), áit a roinneann roinnt eochracha API cuntas amháin
réamhtheachtach. Cuireann trí shraith cosc ar chuntas comhroinnte a bheith báite.

### Uasteorainn chomhthráthachta in aghaidh an naisc (`max_concurrent`)

Is féidir le gach nasc soláthraí uasteorainn `max_concurrent` a dhearbhú
(`provider_connections.max_concurrent`, socraithe i módil an naisc / API / DB).
Fág folamh é mura dteastaíonn teorainn. Seo an t-aon socrú amháin a rialaíonn an tsraith
srathaithe thíos — socraigh é de réir fhíor-chomhthráthacht an chuntais (m.sh. GLM ~1, MiniMax ~2).

### Uasteorainneacha comhthráthachta in aghaidh na samhla (`modelConcurrency`)

Ina theannta sin, is féidir le nasc uasteorainneacha beachta comhthráthachta in aghaidh na samhla a dhearbhú
laistigh dá mhapa `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Socraigh é i módil an naisc (**Sáruithe teorann ráta → Uasteorainneacha comhthráthachta in aghaidh na samhla**,
`model=cap` amháin in aghaidh na líne) nó trí
`PATCH /api/providers/[id]` leis an struchtúr JSON céanna. Séimeantaic na n-eochracha:

- **Ar fud an naisc vs sainiúil don tsamhail:** fanann `maxConcurrent` mar an uasteorainn chomhroinnte
  ar fud an naisc. Nuair a bhíonn an dá cheann i bhfeidhm, faightear an dá gheata
  go hadamhach sa gheata ilchodach céanna
  (`global → provider → account → model`); is í an teorainn infheidhme is déine
  a chinneann an t-iompar éifeachtach.
- **Meaitseáil bheacht eochair na samhla:** is í an eochair an teaghrán samhla a chuirtear ar aghaidh chuig an
  seiceadóir tar éis réiteach an ródaithe — aitheantas lom na samhla réamhtheachtaí de ghnáth
  (`glm-5`), seachas ailias `provider/model` ar thaobh an chliaint (`zai/glm-5` ní
  mheaitseálann sé `glm-5`). Is uasteorainneacha slánuimhreacha dearfacha ar iarratais chomhthráthacha iad na luachanna.
- **Ciúáil áitiúil, gan aon aimsiú:** téann iarratais iomarcacha isteach i gciú go háitiúil de réir
  shéimeantaic reatha an chiú/na teorann ama (earráidí iontrála clóscríofa `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). Ní aimsíonn ná ní thátalaíonn OmniRoute beartas réamhtheachtach —
  cuireann sé i bhfeidhm na huasteorainneacha beachta a chumraigh an t-oibreoir.
  Ní dhíchumasaíonn geata samhla sáithithe an soláthraí riamh agus ní
  chruthaíonn sé frithdhúnadh buan don tsamhail; fanann iompar réamhtheachtach 429/tréimhse athshocraithe/cúltaca
  mar an chosaint dheireanach ar earráidí.
- **Raon feidhme in aghaidh an naisc, in aghaidh an phróisis:** bíonn na huasteorainneacha ann in aghaidh gach naisc bunachair sonraí
  agus coinnítear i gcuimhne iad, mar sin ní chomhordaíonn dhá nasc a athúsáideann an eochair API réamhtheachtach chéanna
  lena chéile.
- **Gan chumrú, gan athrú:** mura gcuirtear an mapa san áireamh (nó má fhágtar réimse an
  deais folamh), ní chuirtear aon gheata samhla leis. Cumraíocht shamplach gan
  aon teorainn uilíoch soláthraí a mhaíomh:

```text
glm-5=1
glm-4.7=3
```

### Srathú iarratas quota-share

Nuair a dhíríonn seoladh quota-share ar nasc a dhearbhaíonn
`max_concurrent` dearfach, déantar iarratais chomhthráthacha chuig an **gcuntas** sin a shrathú trí
sheamafór in aghaidh an naisc (eochair `qsconn:<connectionId>`): **fanann iarratais iomarcacha sa
chiú** in ionad an cuntas a bhá. Tá sé **oscailte i gcás teipe** — má bhíonn
ciú sáithithe nó teorainn ama ann, leanann sé ar aghaidh gan sliotán seachas iarratas inseolta a dhiúltú
riamh. Scoránaigh é in **Socruithe → Athléimneacht → Comhthráthacht in aghaidh an naisc do quota-share**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ar siúl de réir
réamhshocraithe). Gan uasteorainn `max_concurrent`, ní athraíonn an t-iompar.

> Tá geata ródaithe quota-share (`selectQuotaShareTarget`, DRR + P2C) é féin
> oscailte i gcás teipe agus ní dhéanann sé ach nasc atá ag an uasteorainn a _ísliú ó thaobh tosaíochta de_ — le
> linn aon-naisc ní féidir leis teorainn chrua a chur i bhfeidhm, mar sin is é an seamafór seo a choinníonn
> an tuile faoi smacht i ndáiríre.

### Atriail teaglama atá feasach ar thréimhse athshocraithe

I gcás gach straitéise teaglama (nuair atá sí cumasaithe), fanann iarratas a d’fhágfadh 429
marthanach de bharr tréimhse athshocraithe neamhbhuan GEARRE go dtí go mbeidh sí thart agus athsheoltar é in ionad
an 429 a thabhairt ar ais — clúdaíonn sé seo fuinneoga TPM/RPM d’aicme Gemini (~60s retry-after)
ar theaglamaí ilmhúnla, m.sh. nuair a shroicheann an dá sprioc i dteaglama dhá mhúnla teorainn ráta
in aghaidh na samhla. Tá sé teoranta ag `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) in **Socruithe → Athléimneacht**. Ní fhanann sé riamh ar `quota_exhausted`
(faoi ghlas go meán oíche) ná ar chúiseanna fíordheimhnithe/nach bhfuarthas.

Clúdaíonn an geata céanna an cás réamhsheolta (#16319): nuair a scipeáiltear gach sprioc i
dteaglama sula ndéantar aon iarracht toisc go bhfuil a samhail faoi fhrithdhúnadh neamhbhuan
gearr, fanann an cosán gan iarracht go dtí go mbeidh an frithdhúnadh thart faoi na
huasteorainneacha céanna agus athsheolann sé, in ionad freagra
`503 ALL_TARGETS_SKIPPED` gan leid a thabhairt. Nuair nach gceadaítear fanacht (uasteorainn, líon iarrachtaí nó buiséad
ídithe, nó an ghné múchta), uasghrádaítear an freagra deiridh go
`429 rate_limit_error` agus `retry_after` / `reset_at` ó dhul in éag is luaithe an
fhrithdhúnta neamhbhuain ag gabháil leis; coinníonn frithdhúnta cuóta, fíordheimhnithe agus nach bhfuarthas an 503 gan leid.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Rialú Iontrála do Chiú na nIarratas (v3.8.49 · saincheist #6593)

**Raon feidhme**: an ciú áitiúil teorannaithe ráta in aghaidh an tsoláthraí+na ceangail (`open-sse/services/rateLimitManager.ts`,
le tacaíocht ó Bottleneck), sraith amháin faoi bhun na dtrí mheicníocht thuas.

**Cuireann `maxWaitMs` teorainn leis an bhfeitheamh sa chiú; cuireann `executionMaxWaitMs` teorainn leis an rith.**
Coinnítear an dá cheann scartha d’aon ghnó, agus ní chuireann ceachtar acu luach ar fáil don cheann eile.

Is é `resilienceSettings.requestQueue.maxWaitMs` an **buiséad feithimh sa chiú**:
clúdaíonn sé fanacht ar shliotán soláthraí agus ansin suí sa staid QUEUED, agus
glantar a amadóir a luaithe a fhágann an jab QUEUED agus a thosaíonn sé ag rith
(`rateLimitManager.ts`, `wrappedFn`). Ní shroicheann iarratas a sháraíonn é an
seirbhís réamhtheachtach choíche. Is é 30000ms an réamhshocrú, arna sholáthar ag
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` in `src/lib/resilience/settings.ts` agus arna
shocrú le `tests/unit/ratelimit-admission-control-6593.test.ts`, ionas go
dteipfidh ar an tástáil sin má athraítear é seachas ligean don mhír seo dul as
dáta gan rabhadh.

Is é `resilienceSettings.requestQueue.executionMaxWaitMs` an luach a fhaigheann
Bottleneck mar `expiration` an jab, agus ní thosaíonn a amadóir go dtí tar éis
an tseolta. Is cosaint chúltaca é do riteoirí nach bhfuil teorainn ama
réamhtheachtach dá gcuid féin acu, agus ardaítear é go teorainn ama tosaithe
fetch an riteora féin nuair is faide í sin, ionas nach féidir leis freagairt
shláintiúil atá ar siúl a ghearradh as. Is é 600000ms (10 nóiméad) an
réamhshocrú.

Ba é an buiséad ciú a chur isteach in `expiration` an rud a mharaíodh geataí
neamh-incrimintíocha le linn a rite roimhe seo — ritheann siad ar feadh nóiméad
go dlisteanach sula dtagann na chéad bheart — agus sin é an fáth a nochtar dul
in éag mar `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), agus cód teorann ama an chiú ag
gabháil leis an mbuiséad ciú. Sáraigh ceachtar acu trí
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (timpeallacht) nó
tríd an deais (**Socruithe → Athléimneacht**). Cuirtear teorainn 1ms–24h leis an
dá cheann nuair a normalaítear iad.

**Tosaíocht, don dá cheann:** ní sholáthraíonn athróg na timpeallachta ach an
_réamhshocrú_. Bíonn luach a bhuantar in `resilienceSettings.requestQueue`
(deais / paiste API, arna stóráil in `key_value`) i réim air, agus bíonn
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` in aghaidh na ceangail i
réim air sin. Dá bhrí sin, ní athraíonn socrú athróg na timpeallachta ar
imscaradh a bhfuil luach buanaithe aige cheana aon rud — glan nó nuashonraigh
an socrú buanaithe ina ionad.

Cuireann `maxWaitMs` teorainn leis an tréimhse sa chiú; cuireann
`maxQueueDepth` thíos teorainn le líon na nglaoiteoirí is féidir a bheith sa
chiú ag aon am amháin.

**Atriail a shonraítear sa chorp: luasrialú i gcomparáid le frithdhúnadh.**
Is féidir le corp 429 a thréimhse feithimh féin a ainmniú (Gemini
`RetryInfo.retryDelay`, téacs "retry after Ns"), agus léann
`updateFromResponseBody` é sin. Is luasáil é tréimhse feithimh a oireann do
`maxWaitMs` na ceangail: folmhaíonn an teorantóir a thaiscumar ar feadh na
tréimhse sin agus seoltar glaonna sa chiú nuair a athlíontar é. Ní féidir leis
an gciú tréimhse feithimh atá níos faide ná `maxWaitMs` a chur isteach — tugann
Gemini `retryDelay: "86399s"` mar fhreagra nuair a bhíonn cuóta laethúil
ídithe. Cuireann an `Retry-After` athsheachadta ar an 429 atógtha (#16528) faoi
deara cheana féin don inneall cúltaca an tsamhail a ghlasáil don tréimhse sin,
ach dá gcuirfí an teorantóir ar sos di freisin chuirfí stop fós le haon ghlao a
shroicheann an eochair go luath (tar éis athshocrú athléimneachta, mar shampla)
ar feadh `maxWaitMs` ar fad. Nuair a thagann tréimhse feithimh den sórt sin ó
mhionsonra clóscríofa Google `RetryInfo` (foinse `google_rpc_retry_info`) agus
teorantóir na heochrach scópáilte don tsamhail cheana féin (féach
`getLimiterKey`), déantar frithdhúnadh samhla ar an gceangal sin den 429 ina
ionad (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, le huasteorainn 24h),
agus ní chuirtear an teorantóir ar sos. Déanann roghnú cuntais an ghlas sin a
scipeáil trí `isModelLocked()`, agus déanann an geata teaglama réamhsheolta an
rud céanna do spriocanna atá pionnáilte leis an gceangal. Ar antigravity, áit a
bhfuil an teorantóir in aghaidh an teaghlaigh cuóta, cuirtear an glas ar an
tsamhail bheacht, díreach cosúil lena ghlais chuóta eile. Cuirtear an t-ainm a
d’iarr an cliant faoi ghlas freisin nuair a réitigh ailias chuig an tsamhail
sin é, toisc go n-úsáideann na seiceálacha sin an t-ainm iarrtha; cuirtear faoi
ghlas go beacht é (`lockExactModel`), mar sin ní chuireann ailias a thrasnaíonn
teaghlach cuóta antigravity nó scóip codex é féin faoi ghlas riamh. Coinníonn
leid phróis, `retryDelay` gan chineál, nó teorantóir atá comhroinnte ag an
gceangal iomlán an sos. Nuair a chuireann an teorantóir atá díreach atógtha ag
an gcosán 429 sos i bhfeidhm, diúltaítear láithreach do ghlaoiteoir a rachaidh
an t-am ciú atá fágtha aige in éag sula gcríochnaíonn an sos, leis an gcód
teorann ama ciú (`checkLimiterPause`), seachas fanacht go dtí go n-imíonn an
tréimhse sin; daingnítear an deireadh taifeadta sula dtógtar an teorantóir, áit
a dtosaíonn Bottleneck a chlog athnuachana, agus déantar dearmad air le haon
athrú níos déanaí ar an taiscumar. Clúdaítear é le
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` agus
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — uasteorainn iontrála roghnach (nua).**
Cuireann `resilienceSettings.requestQueue.maxQueueDepth` teorainn le líon na
n-iarratas is féidir suí sa chiú (gan a bheith seolta fós) do
sholáthraí+ceangal amháin ag aon am amháin. Nuair atá `maxQueueDepth` iarratas
sa chiú cheana féin, diúltaítear d’iarratas nua go tapa le hearráid chlóscríofa
`code: "RATE_LIMIT_QUEUE_FULL"` **sula** sroicheann sé `limiter.schedule()`
riamh — mar sin tá an diúltú saor agus tarlaíonn sé roimh aon obair
chomhbhrúite leide / aistriúcháin iartheachtach don iarratas sin. Réamhshocrú
`0` = díchumasaithe, rud a chaomhnaíonn iompar reatha an chiú gan teorainn;
teoranta do 0–100000. Sáraigh é trí `RATE_LIMIT_MAX_QUEUE_DEPTH` (timpeallacht)
nó `resilienceSettings.requestQueue.maxQueueDepth` (paiste deaise/API).

Is feidhm íon é an tseiceáil iontrála féin
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) ionas
gur féidir í a thástáil le tástáil aonaid gan fíortheorantóir Bottleneck.

> Mhol an RFC a d’oscail #6593 bratach `bypassCompressionOnRateLimit`
> freisin. Baineann píblíne `open-sse/services/compression/` an taisclainne seo
> le comhbhrú leidte/comhthéacs ar an iarratas LLM amach (`chatCore.ts`,
> thart ar an mbloc `resolveCompressionSettings`/`selectCompressionStrategy`),
> agus ní le comhbhrú freagartha HTTP ar choirp 429 shintéisithe — níl aon
> chonair chóid chomhfhreagrach ann do bhratach sheachanta liteartha. Faoi
> láthair, ritear an chéim comhbhrú leidte sin _roimh_ `withRateLimit()` sa
> phíblíne iarratais freisin, mar sin is athrú ar leith, níos mó ná raon
> feidhme na saincheiste seo é í a athordú chun í a scipeáil nuair a dhiúltaítear
> d’iarratas de bharr scuaine lán; d’aon ghnó, **níor** cuireadh i bhfeidhm anseo
> é agus fágadh mar obair leantach é más fiú an gnóthachan i sábháil LAP an
> riosca a bhaineann leis an athordú.

### Líontán Sábhála Uathchumasaithe Teorannaithe Ráta & Cosaint Naisc (`rateLimitProtection`)

**Líontán sábhála uathchumasaithe** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, `true` de réir réamhshocraithe):
De réir réamhshocraithe, cumasaíonn OmniRoute cosaint scuaine teorannaithe ráta go huathoibríoch do gach nasc gníomhach soláthraí eochrach API (`getProviderCategory(provider) === "apikey"`). Cinntíonn sé seo go gcuirtear iarratais isteach chuig eochracha API réamhtheachtacha atá íogair do ráta i scuaine agus go ndéantar iad a scóigeadh trí Bottleneck, seachas iad a sheoladh ina rabharta a d’fhágfadh earráidí 429 réamhtheachtacha. Is féidir an líontán sábhála a shárú tríd an athróg timpeallachta `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` chun é a dhíchumasú, `true`/`1`/`on` chun é a chur ar siúl go héigeantach), a bhfuil tosaíocht aici ar an socrú deaise marthanach (**Socruithe → Athléimneacht** / `PATCH /api/resilience`).

**Séimeantaic `rateLimitProtection` in aghaidh an naisc:**
Déantar cosaint teorannaithe ráta in aghaidh an naisc a rianú tríd an réimse Boole `rateLimitProtection` ar naisc soláthraithe (arna bhuanú mar `rate_limit_protection` in SQLite):

- **Curtha ar siúl go sainráite (`rateLimitProtection === true`)**: Tá cosaint teorannaithe ráta cumasaithe go sainráite don nasc seo, beag beann ar chatagóir an tsoláthraí ná ar cibé acu atá an líontán sábhála uathchumasaithe ar siúl.
- **Múchta go sainráite (`rateLimitProtection === false`)**: Díchumasaíonn sé cosaint shainráite, ach **ní** dhíliostálann sé nasc gníomhach eochrach API ón líontán sábhála uathchumasaithe domhanda. In `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), is ionann `false` agus `undefined`: ní láimhseáiltear ach `rateLimitProtection === true` mar shárú sainráite. Más `false` é `rateLimitProtection` (nó mura bhfuil sé socraithe), comhlíonann nasc gníomhach eochrach API an coinníoll uathchumasaithe fós agus fanann sé faoi chosaint teorannaithe ráta.
- **Gan aon rogha díliostála in aghaidh an naisc**: Ní féidir le hoibreoir a shonrú faoi láthair gur “gá don nasc gníomhach eochrach API aonair seo rith gan chosaint scuaine teorannaithe ráta” agus an t-uathchumasú a choinneáil gníomhach do na cinn eile. Chun naisc eochrach API a rith go hiomlán gan scuainí teorannaithe ráta, ní mór an líontán sábhála a mhúchadh go domhanda (`RATE_LIMIT_AUTO_ENABLE=false` nó `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Conairí scríofa tacaithe:**

- **`POST /api/rate-limits`**: An chonair scríofa bhainistíochta thacaithe chun `rateLimitProtection` a scoránú do nasc (`{ connectionId: string, enabled: boolean }`). Má ghlaoitear air seo le `enabled: true`, cuirtear cosaint shainráite ar siúl; má ghlaoitear air le `enabled: false`, baintear cosaint shainráite (cé go bhfanann naisc ghníomhacha eochrach API clúdaithe faoin líontán sábhála domhanda má tá an t-uathchumasú ar siúl).
- **`PUT /api/providers/[id]`**: D’aon ghnó, **ní** ghlacann sé le `rateLimitProtection` ná ní scoránaíonn sé é (#11278). Ní athróidh nuashonrú meiteashonraí naisc soláthraí trí `PUT /api/providers/[id]` staid mharthanach na cosanta teorannaithe ráta choíche.

---

## 6. Faire faire tréchurtha do shruth mall (#9709)

Aimsíonn an chosaint roghnach `resilienceSettings.streamRecovery.throughputWatchdog`
foinse réamhtheachtach atá fós ag seoladh smután ach atá ag táirgeadh aschur cúntóra faoi bhun
an ráta chumraithe d’aschur úsáideach. Tá sí scartha d’aon ghnó ón teorainn ama díomhaoin:
ní athshocraíonn buillí croí ná meiteashonraí ceachtar amadóir agus ní áirítear iad mar dhul chun cinn. Tá sí
scartha freisin ó sprioc-am docht na hiarrachta (#9153), a fhanann ina
huasteorainn sábháilteachta absalóidí beag beann ar cháilíocht an aschuir.

Teastaíonn tréimhse téimh ón bhfaire agus fuinneog rollach iomlán ina diaidh sular
féidir léi scor a chur i bhfeidhm. Comhaireann sí deilte téacs ó imeachtaí aschuir Chat Completions agus Responses API
(seachfhreastalaí coimeádach do bhearta UTF-8), déanann sí neamhaird d’imeachtaí úsáide-amháin agus d’imeachtaí folmha, agus
cuireann sí breithiúnas ar fionraí fad atá imeachtaí glao uirlise nó réasúnaíochta ar siúl. Tá sí díchumasaithe
de réir réamhshocraithe agus is féidir í a chumasú le `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; tá
an fhuinneog, an téamh, an ráta íosta agus an t-aschur intomhaiste íosta faoi theorainn ag
gnáthchiseal normalaithe na socruithe athléimneachta.

Nuair atá sí cumasaithe, ní chuirtear scor ón bhfaire i bhfeidhm ach ar an iarracht réamhtheachtach ghníomhach. Sula
mbíonn aon bheart infheicthe ag an gcliant ann, féadfaidh an chonair reatha luath-athshlánaithe don chuntas céanna
an iarracht a athoscailt. Tar éis ceangaltais, ní athsheinntear an sruth go dall choíche; ní féidir ach leis an
gconradh reatha sábháilte leanúnachais lár-srutha iarmhír a cheangal leis. Fanann an tabhairt chun críche
aonuaire, mar sin ní dhéantar cuntasaíocht úsáide ná scaoileadh an tseamafóir faoi dhó.

---

## 7. Athshonrú Stádais Réamhtheachtaigh (earráidí cuóta a sonraíodh go mícheart)

**Raon feidhme:** geata réamhtheachtach amháin a thuairiscíonn ídiú sealadach cuóta leis an stádas HTTP mícheart.

**Cuspóir:** stádas míthreorach a cheartú ROIMH aicmiú, ionas go bhfeicfidh tomhaltóirí iartheachtacha (an t-inneall cúltaca, comhiomlánú combo, an freagra don chliant) fíorchineál in-atriailte na teipe.

Cuireann roinnt geataí ídiú SEALADACH cuóta in iúl le stádas HTTP
nach féidir a atriail. Filleann `agentrouter.org` `403` (agus `400` uaireanta) le corp Síneach
(`用户额度不足` / `额度不足`) in ionad an `429` chaighdeánaigh. Déileálann cliaint ar nós Claude
Code le `403` mar stádas buan agus cuireann siad deireadh leis an seisiún, agus gan cheartú
dhéanfadh an t-inneall cúltaca é a aicmiú mar `AUTH_ERROR` seachas mar imeacht
cuóta.

**Cur chun feidhme:**

- Clárlann + meaitseálaí: `open-sse/config/upstreamStatusRestatement.ts` — liosta
  rialacha de réir soláthraí (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), a mheaitseáiltear trí `applyStatusRestatement()`.
- Suíomh glao: an bloc `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (thart ar líne 3654), díreach tar éis do `parseUpstreamError()` freagra réamhtheachtach
  a pharsáil a bhfuil stádas earráide HTTP aige (`!providerResponse.ok`), agus roimh aon
  aicmiú a reáchtáil, ionas go bhfeicfidh gach tomhaltóir iartheachtach an stádas
  ceartaithe. Leanann earráidí atá leabaithe laistigh de shruth `200` SSE conair
  parsála srutha níos déanaí ar leith agus **níl** siad cumhdaithe ag an duán seo faoi láthair — is
  teorannú aitheanta é seo nach bhfuil ag teastáil fós do mhíshonrú stádais agentrouter (a
  thagann chun solais mar stádas earráide HTTP).
- Incháilitheacht atrialach: tá `429` in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), mar sin bíonn fíorfhuinneog atrialach
  ag earráid athshonraithe seachas í a nochtadh mar `403` marbh.
- Ní insíonn an `60s` sintéiseach `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ach don **chliant** cad atá sa fhreagra athshonraithe; ní hé féin
  fad inmheánach fuaraithe/frithdhúnadh amach an naisc — rialaítear é sin
  ar leithligh le cibé sásra a láimhseálann an earráid athshonraithe i ndáiríre
  (cúlú méadaitheach Connection Cooldown, §2, bonn `3s` do sholáthraithe
  API-key; nó Model Lockout, §3, do sholáthraithe cuóta de réir samhla amhail
  agentrouter). Féadfaidh an ródaire a bheith incháilithe le hatriail go hinmheánach níos luaithe
  ná an fhuinneog 60s a fhógraíonn sé don chliant — spás maolánach d’aon ghnó,
  ní fabht.

Ní athshonraítear earráidí buana (an `无权访问模型` ó agentrouter — níl rochtain ar an tsamhail seo)
RIAMH: cuireann `excludeMarkers` cros ar an riail fiú nuair a mheaitseálann `textMarkers`,
mar sin coimeádann an earráid a stádas bunaidh agus ní dhéantar atriail uirthi go deo. Téitear i gcomhairle leis an
riail aicmithe soláthraí chomhfhreagrach
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, bunfhuarú dearbhaithe `6h`) ag
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
_roimh_ an luathfhilleadh cineálach `FORBIDDEN` don chatagóir apikey, agus é faoi rialú ag
`honorsRuleLockScope(provider)` (#10334 — eisiach do agentrouter faoi láthair tríd
an liosta ceadaithe `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
`providerErrorRules.ts`). Sreabhann fuarú dearbhaithe 6h na rialach tríd mar
`fallbackResult.baseCooldownMs`, ach cothaíonn sé fós an chonair frithdhúnta amach
cuóta-de-réir-samhla a bhí ann cheana (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, gan athrú ag #10334 ach amháin i gcás fhoinse an fhuaraithe):
teanntar síos é go dtí `mlSettings.maxCooldownMs` an oibreora
(`1_800_000ms` / 30min de réir réamhshocraithe), amhail gach frithdhúnadh amach samhla eile, agus
fanann _cúis mharthanach an fhrithdhúnta amach_ mar an `"forbidden"` cruachódaithe a bhí ann cheana,
seachas `"auth_error"` na rialach — ní urramaítear ó cheann ceann ach fad an fhuaraithe,
ní an teaghrán cúise. Fanann an nasc féin gníomhach;
ní chuirtear isteach ar shamhlacha gaolmhara ar an nasc céanna.

Sroicheann earráidí cuóta athshonraithe (`额度不足`) riail soláthraí sa táirgeadh
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, gan aon tréimhse mharana dá chuid féin dearbhaithe — tá
réamhshocrú cúlaithe scálaithe na sraithe marthanachta i bhfeidhm). Ó #10334 i
leith, úsáidtear `scope` ar `ProviderErrorRuleMatch` ó cheann ceann, ach
**amháin** i gcás soláthraithe atá ar liosta ceadaithe
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — níl ann inniu ach
`"agentrouter"`, faoi gheata trí `honorsRuleLockScope()`). I gcás gach
soláthraí eile, níl i `scope` ach faisnéis, díreach mar a bhí roimh #10334.
Nochtann `checkFallbackError` scóip na rialach comhoiriúnaithe mar
`fallbackResult.ruleScope`; is é `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) an garda comhroinnte a dheimhníonn go bhfuil
`ruleScope` sábháilte i ndáiríre le hurramú mar chomhartha féin-aisghabhála
ar fud an naisc (scóip `"connection"`, cúis `quota_exhausted`, ní
`permanent` riamh, ná `creditsExhausted` riamh — cosaint in aghaidh riail amach
anseo a chuirfeadh scóip `"connection"` le chéile le staid bhuan cuntais).
Glaonn dhá thomhaltóir air:

- **Marthanacht** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  in ionad titim isteach i mbrainse frithdhúnta **in aghaidh na samhla** de
  chuid an tsoláthraí pas-trí (tá `passthroughModels: true` ag agentrouter →
  filleann `hasPerModelQuota()` `true`), cuireann sé **tréimhse mharana
  shealadach naisc** i bhfeidhm — `testStatus: "unavailable"` +
  `rateLimitedUntil`, agus ní stádas foirceanta riamh
  (`credits_exhausted`/`banned`/`expired`) — ionas go n-aisghabhann an nasc é
  féin nuair a théann an tréimhse mharana in éag, seachas athshocrú láimhe
  dintiúr a bheith de dhíth. Déantar é seo a scipeáil i gcás nasc ag a bhfuil
  `disableCooling: true` (#2997): titeann an rogha diúltaithe sin tríd chuig
  an bhfrithdhúnadh in aghaidh na samhla ina ionad sin (comhréiteach
  doiciméadaithe — féach an nóta sa chód os cionn an bhrainse).
- **Ródú teaglama san iarratas céanna** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): marcálann an garda céanna
  an nasc sa tacar cuimhneacháin `exhaustedConnections`, eochraithe de réir
  `${provider}:${connectionId}`. Ní dhéanann sé seo ach sprioc
  SAME-REQUEST atá fágtha a scipeáil nuair a bhíonn an `connectionId`
  beacht sin _ar oibiacht sprice na sprice féin cheana féin_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` roimh chuardach `exhaustedConnections`) — ní thagann teaglama
  simplí liosta samhlacha, nach mbíonn `connectionId` pionnáilte dá gcuid
  féin ag spriocanna siblíne agus nach réitítear ceann ach amháin in aghaidh
  an tseolta ó cheanntásc `X-OmniRoute-Selected-Connection-Id` an fhreagra,
  leis an eochair sin riamh. Sa chás coitianta sin, NÍ hé an Set seo an
  fhíorchosaint ar chéim atá fágtha agus í ag athúsáid an chuntais atá díreach
  ídithe — is í an tsraith mharthanachta thuas í (tá `rateLimitedUntil` an
  naisc anois sa todhchaí) in éineacht leis an ngarda céanna seo ag cur
  `transientRateLimitedProviders` faoi chois don teip (féach "Dearadh dhá
  chéim" agus an nóta sa chód ar an mbrainse
  `isAgentrouterConnectionQuotaScope` in `targetExhaustion.ts`): ós rud é
  nach marcáiltear an Set sin, NÍ chuirtear i bhfeidhm ceadú éigeantach
  `allowRateLimitedConnection` de chuid `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) do na céimeanna atá
  fágtha ag an soláthraí, mar sin urramaítear scagaire `rateLimitedUntil` an
  roghnaithe dintiúr (`src/sse/services/auth.ts:1238`) mar is gnách agus
  roghnaíonn céim atá fágtha nasc agentrouter eile atá fós incháilithe nó
  teipeann uirthi gan aon dintiúir ar fáil — ní bhrúnn sí a bealach ar ais
  chuig an nasc ar chuir an brainse seo tréimhse mharana air.

### Dearadh dhá chéim: athshonrú stádais, ansin aicmiú

Is clárlanna ar leith iad athshonrú stádais
(`upstreamStatusRestatement.ts`) agus rialacha aicmithe soláthraí
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) a úsáideann
aitheantas an tsoláthraí agus marcóirí téacs mar eochracha, ach ritheann siad
in áiteanna éagsúla agus freastalaíonn siad ar chuspóirí éagsúla:
athscríobhann athshonrú an stádas HTTP go luath in `chatCore.ts`; roghnaíonn
rialacha aicmithe an `reason` cúltaca agus an `scope` glasála
(`model` / `provider` / `connection`) taobh istigh de `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Ní fheiceann rialacha aicmithe téacs **iomlán** na hearráide (atá riachtanach
chun marcóirí coirp amhail `额度不足` a mheaitseáil) ach amháin i gcás
soláthraithe atá ar liosta ceadaithe `FULL_TEXT_RULE_PROVIDERS` in
`providerErrorRules.ts` — níl ann faoi láthair ach `"agentrouter"`. I gcás
gach soláthraí eile sa **chatalóg ionsuite**, ní thugann
`checkFallbackError` do `getProviderErrorRuleMatch` ach an earráid struchtúrtha
(`{code, type}`), rud atá leordhóthanach do rialacha ceanntásc-/stádais-/cód-
bhunaithe ach nach bhfeiceann marcóirí théacs an choirp. Déanann an cúntóir
`resolveRuleMatchBody()` an roghnú seo: téacs iomlán na hearráide do
sholáthraithe ar an liosta ceadaithe, agus an earráid struchtúrtha i ngach
cás eile. Is rogha shainráite isteach in aghaidh an tsoláthraí é soláthraí
**ionsuite** a chur le `FULL_TEXT_RULE_PROVIDERS` — tá sé ann ionas go
bhfanfaidh an cosán réamhshocraithe do gach soláthraí nach bhfuil ar an liosta
gan athrú beart ar bheart.

Is rogha isteach ar leith ó `FULL_TEXT_RULE_PROVIDERS` é `scope` rialach
(`model` / `provider` / `connection`): ní nochtann `checkFallbackError` é ach
mar `fallbackResult.ruleScope`, agus ní urramaíonn tomhaltóirí iartheachtacha
é mar rud ar bith seachas lipéad faisnéiseach ach amháin i gcás soláthraithe
atá ar liosta ceadaithe `HONORS_RULE_LOCK_SCOPE_PROVIDERS` sa chomhad céanna
(`faoi gheata trí honorsRuleLockScope()` — níl ann inniu ach
`"agentrouter"`). Féach "Earráidí cuóta athshonraithe" thuas chun a fháil
amach cad a dhéanann comhoiriúnú `scope: "connection"` i ndáiríre a luaithe
a bhíonn soláthraí ar an liosta ceadaithe sin.

**#11104 — seachnaíonn rialacha arna ndearbhú ag an oibreoir an dá liosta ceadaithe.** Is féidir le hoibreoir
riail in aghaidh an tsoláthraí a dhearbhú ag am rite trí `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
gan an comhad seo a chur in eagar. Dá gcuirfí riail oibreora faoi réir
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — liostaí ceadaithe
atá ceaptha iompraíocht **réamhshocraithe** rialacha ionsuite na catalóige a chosaint — d’fhágfaí
meicníocht na socruithe neamhghníomhach do gach soláthraí seachas iad siúd atá
liostaithe ann cheana, ós rud é gurb ionann dearbhú na rialach agus rogha shainráite
an oibreora cheana féin. Seiceálann `resolveRuleMatchBody()` agus
`honorsRuleLockScope()` araon `hasOperatorRuleForProvider()` ar dtús: faigheann
soláthraí a bhfuil riail oibreora aige téacs amh na hearráide agus urramaítear an
`scope` a dhearbhaigh sé, is cuma an bhfuil sé le feiceáil i gceachtar liosta ceadaithe.

**Bearna atá ar eolas — ní théitear i gcomhairle le `providerRuleRegistry` riamh i gcás HTTP 400.**
Aicmíonn brainse `BAD_REQUEST` de chuid `checkFallbackError` stádas 400 go hiomlán
trína eagair patrún féin (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, etc. in `accountFallback.ts`) agus filleann sé sula
sroichtear an brainse `configuredRule`/`getProviderErrorRuleMatch` os a chionn.
Tá riail ionsuite catalóige (nó riail oibreora) le `status: 400`
bailí ó thaobh comhréire de ach ní chuirfear i ngníomh riamh í. Níl aon riail atá ann faoi láthair
dírithe ar 400, mar sin ní dhéantar difear d’aon rud sa táirgeadh — ach ní mór an
brainse seo a athrú ar dtús le haghaidh riail 400 amach anseo, athrú atá níos mó ná riail
a chur leis (athraíonn sé aicmiú 400 do gach soláthraí atá ag brath cheana féin ar
iompraíocht na n-eagar patrún) agus atá lasmuigh de scóip riail aon soláthraí amháin a chur leis.

### Geata nua a chur leis a mhíléiríonn cuóta

1. Cláraigh eagar rialacha amháin in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Coinnigh `textMarkers`
   sonrach don soláthraí; ná hathúsáid frásaí cineálacha Béarla a thagann salach ar
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Más mian leat, cláraigh rialacha aicmithe in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) chun
   an scóip ghlais cheart a roghnú (`connection` do chuóta ar fud an chuntais, `model` d’earráidí
   in aghaidh na samhla). Ní bhíonn éifeacht ag an gcéim seo sa táirgeadh ach amháin i gcás
   soláthraithe a dteastaíonn téacs iomlán na hearráide óna rialacha (marcóirí coirp): cuir
   aitheantas an tsoláthraí le `FULL_TEXT_RULE_PROVIDERS` sa chomhad céanna — murach sin
   ní thugann `checkFallbackError` don riail ach an earráid struchtúrtha
   `{code, type}` agus ní mheaitseálfaidh riail théacs coirp trácht beo choíche.
   Ní gá an rogha shainráite seo do rialacha nach meaitseálann ach de réir `status`/`headers`
   (amhail rialacha Opencode nó Minimax). Ar leithligh, má dhearbhaíonn an riail
   `scope: "connection"` agus más é an rún tréimhse shuaimhnithe iarbhír ar fud an naisc
   chomh maith le teaglaim a scipeáil san iarratas céanna (seachas lipéad faisnéiseach amháin), cuir
   aitheantas an tsoláthraí le `HONORS_RULE_LOCK_SCOPE_PROVIDERS` sa chomhad céanna — is é seo
   a rialaíonn úsáid ar nós `isAgentrouterConnectionQuotaScope()` in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) agus
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); gan é, téann `scope`
   ar aghaidh fós trí `fallbackResult.ruleScope` ach ní ghníomhaíonn aon rud dá réir.
3. Cuir tástálacha aonaid leis a dhéanann aithris ar `tests/unit/upstream-status-restatement.test.ts`
   agus `tests/unit/agentrouter-error-rules.test.ts` (lena n-áirítear na
   cosaintí not-permanent / not-creditsExhausted, agus — má theastaíonn
   an liosta ceadaithe ón soláthraí — tástáil a dhearbhaíonn nach bhfilleann `resolveRuleMatchBody()`
   an téacs iomlán ach don soláthraí sin).

Ní gá aon athruithe a dhéanamh ar `chatCore.ts`, `classifyError`, ná combo.

#### Glas grúpáilte de réir egress (#10880)

Caitear le soláthraithe in `EGRESS_BUCKETED_LOCK_PROVIDERS` (teaghlach opencode)
mar sheirbhísí réamhtheachtacha grúpáilte de réir IP (tá sraith saor in aisce opencode grúpáilte de réir IP, ní
de réir cuntais — féach #9611): cuireann stádas-429 atá aicmithe mar `quota_exhausted`
**nó** `rate_limit_exceeded` gach nasc sa teaghlach ceadaithe a bhfuil a sheoladh IP egress
deireanach atá ar eolas ag teacht le seoladh an naisc ar theip air i dtréimhse shuaimhnithe, sular féidir leis an
rothlú triail a bhaint astu
— rud a sheachnaíonn N-1 glao réamhtheachtach a dteipfidh orthu go cinnte (an cruth céanna le #10460/#10525).
Cuirtear `rate_limit_exceeded` san áireamh d’aon ghnó: ar chonair `markAccountUnavailable`
ní mheaitseálann na rialacha a bhaineann go sonrach le opencode riamh (ní thugtar headers/body do
`checkFallbackError`, níl opencode in `FULL_TEXT_RULE_PROVIDERS`), mar sin aicmítear 429
a bhfuil téacs chuóta an tsíntiúis ina chorp ("monthly usage limit
reached") mar `quota_exhausted` ag an gcúltiomáint téacs cuóta
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; tréimhse shuaimhnithe 1h) sula
sroichtear riail `status_429` riamh — agus aicmítear 429 gan téacs cuóta (gnáth-theorannú
ráta) trí riail `status_429` mar `rate_limit_exceeded`
agus cuirtear an teaghlach IP i dtréimhse shuaimhnithe fós. I gcás soláthraí ceadaithe, is ionann
teorainn ráta atá grúpáilte de réir IP agus an comhartha a thugann cuóta ídithe. Teorainneacha macánta:

- **Iarracht is fearr**: réitíonn an glas an `egress_ip` deireanach atá ar eolas
  don nasc ó `proxy_logs` (fuinneog 24h, sioncrónach, gan taisce). Le taisce fhuar (níor
  tástáladh an IP amach riamh) nó mura bhfuil aon ró ann → fuaraíonn an brainse an
  nasc a theip fós (taifeadta mar atá inniu), ach ní ghlasáiltear aon chomh-nasc.
- **Ní bhíonn sé críochfoirt riamh**: is fuinneog chuóta in-athnuaite é an tréimhse fuaraithe
  (`testStatus: "unavailable"`); ní dhíorthaítear staid bhuan riamh ó chomhartha ar
  leibhéal IP. Scipeálann naisc `disableCooling` an brainse go hiomlán.
- **Athraíonn gráinneacht an ghlais don teaghlach ar an liosta ceadaithe**: is athrú scóipe
  é seo, ní barrfheabhsú comh-naisc amháin. Is soláthraí `passthroughModels`
  é opencode, mar sin roimh an mbrainse seo chruthaigh 429 frithdhúnadh in aghaidh na SAMHLA;
  cruthaíonn sé tréimhse fuaraithe naisc anois — lena n-áirítear d’oibreoir nach bhfuil ach
  nasc amháin aige agus gan aon chomh-nasc ar chor ar bith. Sin í an ghráinneacht a dhearbhaíonn
  tábla rialacha opencode a bheith ceart cheana féin (`scope: "connection"`,
  `providerErrorRules.ts`), ach nár cloíodh léi go dtí seo toisc nach bhfuil opencode in
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Scríobhann an brainse tréimhse fuaraithe an
  naisc a theip + `backoffLevel` é féin, ag aithris ar an mbrainse agentrouter
  atá scópáilte de réir naisc, agus filleann sé — ní shroichtear riamh an bloc de réir samhla
  ná an chonair ghinearálta thíos.
- **Teaglaim san áireamh**: cosúil leis an mbrainse agentrouter, déanann an scóip neamhaird d’aon ghnó
  ar an íosghrádú `persistUnavailableState`/`isCombo` a chuireann glaoiteoir teaglaime
  i bhfeidhm ar 429. Ní leagan níos laige den scóip seo é frithdhúnadh de réir samhla,
  is é an t-aonad mícheart é: ní deir sé aon rud faoin IP ídithe, mar sin
  leanfadh rothlú na teaglaime de ghlao amháin a bhfuil teip ráthaithe air a chur amú in aghaidh an chomh-naisc.
- **Sábháilteacht comh-nasc**: ní fhorscríobhtar riamh comh-nasc atá críochfoirt cheana féin
  (banned/credits_exhausted) nó atá i dtréimhse fuaraithe níos faide cheana féin.
- **Liosta ceadaithe eisiach**: is cinneadh sainráite úinéara é
  `EGRESS_BUCKETED_LOCK_PROVIDERS` a leathnú; níl aon sreangú ginearálta ann
  (patrún #10334/#10419). Ceanglaíonn fiosrúchán na gcomh-nasc an liosta ceadaithe céanna
  seachas é a athrá mar litiréal SQL, mar sin fanann a leathnú ina athrú aon líne amháin.
- **Rothlú IP amach, sa dá threo**: tá an fhuinneog chuardaigh (24h) i bhfad
  níos leithne ná TTL thaisce an IP amach (5 nóiméad), mar sin is stair é “an IP deireanach
  atá ar eolas”, ní an staid reatha. Má rothlaigh seachfhreastalaí naisc laistigh den fhuinneog,
  d’fhéadfadh an glas IP atá comhroinnte i ndáiríre a **chailleadh** (is é an IP taifeadta an ceann nua
  nach bhfuil ídithe) — agus, go siméadrach, d’fhéadfadh sé **comh-nasc atá rothlaithe
  amach ó shin a fhuarú** ón IP ídithe. Cosnaíonn an dara cás fuinneog fuaraithe amháin
  ar an gcomh-nasc sin; glactar leis an dá cheann mar theorainneacha iarrachta is fearr a bhaineann le
  cuardach stairbhunaithe.
- **Costas**: dhá scanadh theoranta ar `proxy_logs` (scagtha de réir fuinneoige trí
  `idx_pl_timestamp`), ag minicíocht 429 amháin. Gan aon innéacs nua (aistriú 134
  YAGNI). Tomhaiseadh é ar chóip de bhunachar sonraí tráchta réadaigh de mhéid measartha; coimeádann
  ásc ard-tréchuir líon comhréireach níos mó rónna san fhuinneog chéanna.

---

## Gnéithe Athléimneachta Eile

- **20 straitéis ródaithe** (tosaíocht, ualaithe, babhta-rothlach, athsheoladh comhthéacs, líonadh-ar-dtús, p2c, randamach, is lú úsáid, optamaithe ó thaobh costais de, feasach ar athshocrú, fuinneog athshocraithe, spás breise, ualaithe de réir cuóta, dian-randamach, uathoibríoch, lkgp, optamaithe ó thaobh comhthéacs de, optamaithe don taisce, comhleá, píblíne) — féach [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Ródú feasach ar athshocrú** (v3.8.0) — tugtar tús áite do naisc de réir am athshocraithe an chuóta.
- **Díghrádú an mhóid chúlra** — déantar `background: true` san Responses API a ísliú go mód sioncrónach agus eisítear rabhadh.
- **Brath dinimiciúil ar theorainn uirlisí** — tarraingítear siar ó sholáthraithe nuair a shroichtear teorainneacha ar líon na n-uirlisí.
- **Cúltaca éigeandála** — rialaítear é le `OMNIROUTE_EMERGENCY_FALLBACK`; is féidir le hoibreoirí é a shárú ón leathanach Feature Flags gan atosú.

---

## Dífhabhtú

- Tugann teaglama ualaithe freagra `503 all_targets_cooling_down` (`Retry-After` socraithe, agus liostaíonn `diagnostics.excluded` gach sprioc le `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → tá an linn cumraithe agus nasctha, ach tá gach sprioc eisiata ag amadóir athléimneachta; ainmníonn an rabhadh `[COMBO] Weighted selection: every target excluded before dispatch — …` na cúiseanna agus líon na soicindí atá fágtha. Ciallaíonn `404 no_executable_targets` ón teaglama céanna nach raibh aon amadóir athléimneachta i gceist (ní raibh aon rud le rith, nó theip ar gach cuntas sa tseiceáil infhaighteachta). Tá sé ionsuite in `open-sse/services/combo/pinRecovery.ts` ó na heisiaimh a bailíodh in `targetResolution.ts`.
- Gach eochair do sholáthraí gan úsáid → seiceáil staid an scoradáin chiorcaid AGUS `rateLimitedUntil`/`testStatus` gach naisc.
- Soláthraí eisiata go buan tar éis na fuinneoige athshocraithe → cód ag léamh `state` amh seachas `getStatus()`/`canExecute()`.
- Teipeann ar eochair amháin, ach ba cheart do na cinn eile oibriú → tabhair tús áite d’achar fuaraithe an naisc thar an scoradán ciorcaid.
- Ní theipeann ach ar shamhail amháin → tabhair tús áite do frithdhúnadh na samhla thar achar fuaraithe an naisc.
- Ba cheart don staid teacht chuici féin ach ní thagann → seiceáil stampa ama amach anseo + cosán léite a athnuann staid atá imithe in éag. Teastaíonn athruithe láimhe le haghaidh stádas buan.

---

## Méarlorgaireacht TLS & Ceilt

Tá ceilt a bhaineann go sonrach le soláthraithe (JA3/JA4, CCH, doiléiriú) doiciméadaithe ar leithligh — féach `docs/security/STEALTH_GUIDE.md` (git; gan a bheith tiomsaithe isteach i `/docs`).

---

## Tástáil athléimneachta (Céim 8 · Bloc C)

Taobh amuigh de thástálacha aonaid don loighic athléimneachta, déanann trí thástáil an t-am rite a thástáil faoi
dhálaí fíorstrusúla/teipe (iad uile comhtháthaithe/oíche — ní chuireann aon cheann acu bac ar PRanna):

| Tástáil     | Cad                                                                                                                                                                                                                         | Rith                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Anord       | Insteallann nód bréige réamhtheachtach fíormhoill/athshocrú/teorainn ama/503; deimhnítear go n-osclaítear/go n-athshlánaítear an scoradán ciorcaid agus go n-aicmíonn `checkFallbackError` 503 mar chúltaca in-aisghabhála. | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Fás carnáin | ~500 sruth in aghaidh `createSSEStream` faoi `--expose-gc`; teipeann sé má fhásann an carn thar an uasteorainn (cosaint OOM #3069).                                                                                         | `npm run test:heap`                        |
| Maos k6     | Ualach leanúnach ar `/api/monitoring/health`; tairseacha p95/earráide.                                                                                                                                                      | `k6 run tests/load/k6-soak.js` (go hoíche) |

Tá sé comhordaithe ag `.github/workflows/nightly-resilience.yml` (cron + seoladh). Sa
`test:integration` réamhshocraithe, scipeálann anord agus carn iad féin (gan `RUN_CHAOS_INT`/`--expose-gc`).

---

## Féach Freisin

- [Treoir Ailtireachta](./ARCHITECTURE.md) — Ailtireacht agus gnéithe inmheánacha an chórais
- [Treoir Úsáideora](../guides/USER_GUIDE.md) — Soláthraithe, teaglamaí, comhtháthú CLI
- [Inneall Uath-Teaglama](../routing/AUTO-COMBO.md) — Scóráil 16 fhachtóir, pacáistí mód
