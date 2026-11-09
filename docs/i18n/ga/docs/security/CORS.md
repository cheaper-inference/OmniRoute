# CORS Configuration & Security (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

Rialaíonn OmniRoute cé acu **bunús brabhsálaí** féadfaidh sé freagraí tras-tionscnaimh a léamh ó liosta ceadaithe láraithe amháin. Tá an tsamhail **teip-dúnta de réir réamhshocraithe** : ní cheadaítear bunús ar bith go dtí go roghnaíonn tú ceann isteach. Sonraíonn an leathanach seo conas a réitíonn an liosta ceadaithe, cad a nochtaíonn `CORS_ALLOW_ALL=true` (agus, níos tábhachtaí, cad a dhéanann sé **nach bhfuil** ), conas dev vs táirgeadh a chumrú go sábháilte, agus an t-am rite a thaispeánann an painéal nuair a bhíonn saoróg beo.

**Foinse na fírinne:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Cuirtear an liosta ceadaithe i bhfeidhm uair amháin, sna meánearraí (`src/server/authz/pipeline.ts`) ní shocraíonn láimhseálaithe — in aghaidh an bhealaigh `Access-Control-Allow-Origin` iad féin.

## Conas a réitítear bunús

I gcás gach iarratais ríomhann na meánearraí an luach `Access-Control-Allow-Origin` san ord seo:

1. **`CORS_ALLOW_ALL=true`** (nó an oidhreacht `CORS_ORIGIN=*`) Tugann → macalla ar ais `Origin` an ghlaoiteora (nó `*` nuair nach bhfuil ceanntásc `Origin` ), le `Vary: Origin` ionas go bhfanann na taisce i gceart. Cuireann an chokepoint `applyCorsHeaders()` céanna `Vary: Accept-Encoding` i gceangal freisin le gach freagra 2xx-le-corp ar an dromchla `/v1*`/`/v1beta*` fíordheimhnithe (`relaxForTokenAuth`, RFC 9110 §12.5.5, eisiúint #6737), ionas gur féidir le caches downstream/shared idirdhealú a dhéanamh i gceart idir leaganacha comhbhrúite vs neamh-chomhbhrúite.
2. Seachas sin, déantar an t-iarratas `Origin` a normalú (cás íochtair, slais rian a bhaint) agus a mheaitseáil leis an **liosta ceadaithe cumaisc** :
   - env **`CORS_ALLOWED_ORIGINS`** Liosta camóg-scartha —, agus
   - an t-am rite **`corsOrigins`** socrú (Deais → Security → _CORS Allowed Origins_), arna instealladh trí `setRuntimeAllowedOrigins()` ó `src/lib/config/runtimeSettings.ts`.
3. Níl aon mheaitseáil →**níl aon cheanntásc `Access-Control-Allow-Origin` astaithe** . Cuireann an brabhsálaí bac ar an léamh tras-bhunaidh. Is é seo an réamhshocrú teip-dúnta atá beartaithe.

| Env var                | Brí                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV de bhunús cruinn a cheadú (molta).                                                           |
| `CORS_ALLOW_ALL`       | `true`/`1` → macalla aon bhunús (cárta fiáin). Dev amháin.                                       |
| `CORS_ORIGIN`          | Oidhreacht. Iompraíonn `*` mar `CORS_ALLOW_ALL`; cuirtear luach amháin leis an liosta ceadaithe. |

## Múnla bagairt — cad a nochtann `CORS_ALLOW_ALL=true` i ndáiríre

Is fiú aird dáiríre a thabhairt ar an rabhadh cineálach OWASP ("cárta fiáin CORS = is féidir le suíomh ar bith glaoch a chur ar do API"), ach tá nochtadh OmniRoute**níos cúinge ná an tuiseal cineálach** , mar gheall ar fhíric fhorfheidhmithe amháin:

> **Ní scaoileann an `applyCorsHeaders()` lárnach `Access-Control-Allow-Credentials` riamh.** Ní nochtfaidh brabhsálaí freagairt tras-bunaidh _credentialed_ (fianán) mura seolann an freastalaí `Access-Control-Allow-Credentials: true`. Ní dhéanann cosán CORS roinnte OmniRoute riamh.

Cad a chiallaíonn sé sin in aghaidh an dromchla, fiú le `CORS_ALLOW_ALL=true`:

| Dromchla                                     | Meicníocht an údair              | Éifeacht saoróg CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Painéal na nIonstraimí / MANAGEMENT `/api/*` | Seisiún fianán                   | Tá macalla ar an mbunús, ach **sin `Allow-Credentials`** an brabhsálaí **bloic** an léann creidiúnaithe. Suíomh tras-bhunús mailíseach **Ní féidir a léamh** do fhreagraí fíordheimhnithe ar an deais, agus níl an fianán seisiúin nochta.                                                                                                                                                                                                                                                                                                                                                                   |
| Cliant API `/v1/*`, `/v1beta/*`              | Iompróir / ceanntásc `x-api-key` | Cheana féin ceadaitheach **de réir dearadh** (`relaxForTokenAuth`): ní dhéanfaidh brabhsálaithe `Authorization`/`x-api-key` a cheangal go huathoibríoch riamh, mar sin ní féidir le leathanach ionsaitheora d'eochair a sholáthar. Éilíonn an macalla suaimhneach ábhar fíordheimhnithe (eochair API bailíochtaithe nó seisiún deais), ní hamháin ceanntásc dintiúir, agus ní chuimsíonn sé `Access-Control-Allow-Credentials` riamh . Úsáideann freagraí gan ainm (`REQUIRE_API_KEY=false`) an liosta ceadaithe tionscnaimh cumraithe, lena n-áirítear rogha an diúltaithe `CORS_ALLOW_ALL=true` sainráite. |
| Poiblí inléite amháin (`/api/health`, …)     | Dada                             | Neamh-íogair; tá saoróg neamhdhíobhálach.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

Mar sin tá an **iarmharach** tá nochtadh `CORS_ALLOW_ALL=true` teoranta do: (a) tras-tionscnamh neamhchreidiúnaithe **léann** de shonraí nach bhfuil fíordheimhnithe cheana, agus (b) ligean CORS**pas réamheitilte** ar bhealaí bainistíochta — a dteastaíonn údarás uathu fós nach féidir le leathanach tras-bunaidh a sholáthar. Tá sé **nach bhfuil** fuadach seisiúin nó veicteoir gadaíochta inchreidte ar an gcosán CORS roinnte.

### Fíor-eisceacht amháin — `/api/v1/agents/`

Socraíonn na bealaí Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) a gcuid **féin** Ceanntásca CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) agus **dhéanamh** scaoileann `Access-Control-Allow-Origin: <origin>|*` mar aon le `Access-Control-Allow-Credentials: true`. Is é seo an dromchla aonair ina bhfuil macalla tionscnaimh agus dintiúir taobh le chéile, agus atá **neamhspleách ar `CORS_ALLOW_ALL`** . Tá na bealaí seo fíordheimhnithe ag an mbainistíocht (`requireManagementAuth`); ba cheart go mbeadh a fhios ag oibreoirí a nochtar an painéal lasmuigh den óstach gurb é seo an t-aon áit amháin a gceadaíonn na ceanntásca freagartha léamh creidiúnaithe tras-thionscnaimh. Déantar é a ghéarú go dtí liosta ceadaithe sainráite a rianú ar leithligh ón treoir CORS seo.

## Seicliosta táirgeachta

- **Ná socraigh `CORS_ALLOW_ALL=true` riamh i dtáirgeadh.** Fág gan luí é.
- Socraigh an **follasach** liosta tionscnaimh — bíodh an réimse env var nó an táb Slándála:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Má ritheann OmniRoute taobh thiar de seachfhreastalaí/tollán droim ar ais (nginx, Caddy, Cloudflare Tunnel, Tailscale), tá CORS**nach bhfuil** Is é an t-aon rialú atá agat — ná cosnaíonn an garda bealaigh lúb siar bealaí sceite (féach [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Ná bréag `X-Forwarded-For: 127.0.0.1` chun 403 a "shocrú"; a athosclaíonn an rang RCE dúnann an garda bealaigh.
- Deimhnigh staid an ama rite: taispeánann an painéal a **bratach ómra leanúnach** faoi Fhardal Údaraithe Slándála → Painéal na nIonstraimí → aon uair a bhíonn `CORS_ALLOW_ALL=true` beo, agus cuireann `/api/settings/authz-inventory` ar ais clúdach `cors: { allowAll, allowedOrigins }` is féidir le huirlisí monatóireachta vótaíochta.

## Ceadaíonn áis forbartha — bunús áitiúil ar leith

Is annamh a bhíonn an cárta saoróg uait fiú i dev. Ná ceadaigh ach na freastalaithe dev a úsáideann tú:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Déantar bunús a mheaitseáil le cás-neamhíogair agus neamhaird a dhéanamh ar an tslais rianaithe, mar sin is ionann `http://localhost:3000` agus `http://localhost:3000/`. Is féidir an CSV céanna a shocrú ag am rite i **Deais → Slándáil → CORS Bunús Ceadaithe** gan atosú.

## Eochracha API vs seisiúin fianán

- **Iompróir / `x-api-key` (an `/v1/*` dromchla tátail):** ní cheanglaíonn brabhsálaithe iad seo go huathoibríoch riamh. CORS nach bhfuil ina bhac brí anseo — an API Is eochair an bhacainn — agus is é sin an fáth go bhfuil an dromchla sin ceadaitheach d'aon ghnó mar sin brabhsálaí agus Electron is féidir le cliaint freagraí a bhfuil siad ina dteideal cheana féin a léamh. Éilíonn an macalla suaimhneach ábhar fíordheimhnithe (a bailíochtaithe API eochair nó seisiún deais), ní hamháin ceanntásc inchreidte, agus ní fholaíonn sé riamh `Access-Control-Allow-Credentials`. Freagraí gan ainm (`REQUIRE_API_KEY=false`) úsáid a bhaint as an liosta ceadaithe tionscnaimh cumraithe, lena n-áirítear sainráite `CORS_ALLOW_ALL=true` rogha an diúltaithe. Fanann diúltú an údair (401) inléite ionas gur féidir le cliaint teacht ar eochair chúlghairthe nó clóscríofa (#5242): coinníonn 401 an phíblíne féin an macalla, agus bealach a dhiúltóidh an eochair féin tar éis don phíblíne freastal air mar gan ainm (`/v1/models` agus `/v1beta/models` agus an t-údar bainistíochta cumraithe, scóip an t-úinéir `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` agus bealaí iarrthóra teaglama uathoibríoch) cuireann sé an macalla leis sin 401 via `credentialRejectionHeaders()`. Tá an macalla eochairithe ar an iarratas agus ceanntásc creidiúnach air (`Authorization`, `x-api-key`, `x-goog-api-key` nó an `auth_token` fianán), nach bhfuil ar a bhfuil an bealach sheiceáil, agus nach bhfuil péireáilte leis `Access-Control-Allow-Credentials`; is clúdach earráide seasta é an corp. Bealaí bainistíochta faoi `/api/v1/` cosanta ag `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ná húsáid an eisceacht credential-rejection seo: le `REQUIRE_API_KEY=false`, a gcuid 401/403 leanann na freagraí an méid cumraithe CORS polasaí tionscnaimh.
- **Seisiún fianán (an painéal):** cosanta ag an réamhshocraithe teip-dúnta **agus** toisc nach bhfuil `Access-Control-Allow-Credentials` ar an gcosán roinnte. Coinnigh bunús management/dashboard as aon chumraíocht cheadaithe; ní mór dóibh fanacht go díreach teip-dúnta.

## croitheadh láimhe WebSocket (`/v1/responses`, `/v1/ws`)

Ní chuireann brabhsálaithe CORS i bhfeidhm ar WebSocket, mar sin iompraíonn an WebSocket a fhilleann aschuir tátail seiceáil an croitheadh láimhe `Origin` iad féin (`src/server/origin/wsOrigin.ts`): na Freagraí WebSocket (`/v1/responses`) agus, nuair a ritheann OmniRoute trí `npm start` / `npm run dev`, an droichead `/v1/ws` agus `/api/v1/ws`, a sruthaíonn `/v1/chat/completions`, `/v1/messages` agus `/v1/responses` mar fhrámaí. Iarrann an droichead ar `/api/v1/ws?handshake=1` an fíorasc agus diúltaíonn sé a uasghrádú mura rith an bealach sin an tseiceáil. Tá feidhm fós ag ceanglais fhíordheimhnithe ar leithligh. Gabhtar leis an tseiceáil tionscnaimh nuair:

- níl aon cheanntásc `Origin` aige (Codex CLI, SDKs agus cliaint neamhbhrabhsálaí eile);
- admhaítear an `Origin` ag an liosta ceadaithe thuas (`CORS_ALLOWED_ORIGINS`, an socrú `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- tá an `Origin` ar cheann de bhunús poiblí OmniRoute féin (an bonn poiblí cumraithe URL, bunús curtha ar aghaidh seachfhreastalaí iontaofa, nó óstach loopback/LAN díreach a thugtar mar IP litriúil nó `localhost` — na hiarrthóirí céanna a úsáideann an seiceáil sóchán deais); nó
- iompraíonn sé eochair API bhailí, mar atá ar an dromchla HTTP `/v1/*`.

Faigheann aon rud eile `403 ws_origin_forbidden`. Ní dhíolmhaíonn fianán seisiúin deais `Origin` eachtrach , toisc go gceanglaíonn an brabhsálaí é le soicéad aon leathanaigh. Ní dhéileáiltear le `localhost` ar phort eile mar an tionscnamh céanna; cuir bunús forbartha den sórt sin le `CORS_ALLOWED_ORIGINS`.

## Sampla: seachfhreastalaí droim ar ais os comhair OmniRoute

Is é OmniRoute féin a fhorfheidhmíonn CORS, mar sin ba chóir don seachfhreastalaí go ginearálta **nach bhfuil** cuir leis nó athscríobh ceanntásca `Access-Control-*` (brabhsálaithe briseadh ceanntásca dúbailte). Críochnaigh TLS agus cuir — ar aghaidh lig OmniRoute réamheitilt a fhreagairt:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

Socraigh bunús an bhrabhsálaí ceadaithe in OmniRoute (`CORS_ALLOWED_ORIGINS` nó sa chluaisín Slándála), nach bhfuil sa seachfhreastalaí.

## Comhaid foinse

| Imní                                                    | Comhad                                                               |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| Taifeach liosta ceadaithe + `getCorsStatus()`           | `src/server/cors/origins.ts`                                         |
| Feidhmchlár meánearraí (foinse amháin fírinne)          | `src/server/authz/pipeline.ts`                                       |
| Socruithe → instealladh tionscnaimh am rite             | `src/lib/config/runtimeSettings.ts`                                  |
| Stádas ama rite don deais                               | `src/app/api/settings/authz-inventory/route.ts`                      |
| Meirge rabhaidh ar an painéal                           | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Réimse Bunús Ceadaithe                             | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent in aghaidh an bhealaigh CORS (an eisceacht) | `src/lib/cloudAgent/api.ts`                                          |
| Croitheadh láimhe WebSocket Seiceáil `Origin`           | `src/server/origin/wsOrigin.ts`                                      |

## Féach freisin

- [Sraitheanna Garda Bealaigh](./ROUTE_GUARD_TIERS.md) — forghníomhú lúb siar do bhealaí atá in ann sceitheadh (rialú comhlántach ar leith).
- [Treoir Údaraithe](../architecture/AUTHZ_GUIDE.md) — an phíblíne údar iomlán.
