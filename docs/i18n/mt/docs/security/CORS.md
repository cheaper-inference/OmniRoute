# CORS Configuration & Security (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute tikkontrolla liema **oriġini tal-browser** jista' jaqra tweġibiet trans-oriġini minn lista ta' permessi waħda ċentralizzata. Il-mudell huwa **fail-closed awtomatikament** : l-ebda oriġini mhi permessa sakemm tagħżel waħda. Din il-paġna tiddokumenta kif issolvi l-lista ta' permessi, dak li `CORS_ALLOW_ALL=true` fil-fatt jesponi (u, importanti, x'tagħmel **le** ), kif tikkonfigura dev vs produzzjoni b'mod sikur, u t-twissija tar-runtime li d-dashboard juri meta wildcard ikun ħaj.

**Sors tal-verità:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Il-lista ta' permessi tiġi applikata darba, fil-middleware (`src/server/authz/pipeline.ts`) — per-route handlers ma jistabbilixxux `Access-Control-Allow-Origin` huma stess.

## Kif tiġi solvuta oriġini

Għal kull talba l-middleware jikkalkula l-valur `Access-Control-Allow-Origin` f'din l-ordni:

1. **`CORS_ALLOW_ALL=true`** (jew il-legat `CORS_ORIGIN=*`) → ieku lura `Origin` ta 'min iċempel (jew `*` meta ma jkunx hemm header `Origin` ), `Vary: Origin` sabiex il-caches jibqgħu korretti. L-istess chokepoint `applyCorsHeaders()` jwaħħal ukoll `Vary: Accept-Encoding` għal kull rispons 2xx-with-body fuq il-wiċċ `/v1*`/`/v1beta*` awtentikat bit-token (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), sabiex il-caches downstream/shared jistgħu jiddistingwu b'mod korrett varjanti kompressati vs mhux kompressati.
2. Inkella, it-talba `Origin` hija normalizzata (b'kitba anqas, trailing slash imqaxxar) u mqabbla mal-**lista ta' permessi magħquda** :
   - env **`CORS_ALLOWED_ORIGINS`** Lista separata minn virgola —, u
   - ir-runtime **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed Orijins_), injettat permezz `setRuntimeAllowedOrigins()` minn `src/lib/config/runtimeSettings.ts`.
3. Ebda taqbila →**l-ebda header `Access-Control-Allow-Origin` ma jiġi emess** . Il-browser jimblokka l-qari cross-origin. Din hija l-inadempjenza intenzjonata ta' fail-closed.

| Env var                | Tifsira                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ta 'oriġini eżatta li tippermetti (rakkomandat).                                    |
| `CORS_ALLOW_ALL`       | `true`/`1` → eku kwalunkwe oriġini (wildcard). Dev biss.                                |
| `CORS_ORIGIN`          | Wirt. `*` iġib ruħu bħal `CORS_ALLOW_ALL`; valur wieħed huwa miżjud mal-lista permessa. |

## Theddida mudell — dak li `CORS_ALLOW_ALL=true` verament jesponi

It-twissija ġenerika OWASP ("wildcard CORS = kull sit jista' jċempel API tiegħek") ta' min jieħu bis-serjetà, iżda l-espożizzjoni ta' OmniRoute hija **idjaq mill-każ ġeneriku** , minħabba fatt wieħed ta' implimentazzjoni konkret:

> **`applyCorsHeaders()` ċentrali qatt ma temetti `Access-Control-Allow-Credentials`.** Brawżer mhux se jesponi rispons trans-oriġini _credentialed_ (li jġorr il-cookie) sakemm is-server ma jibgħatx `Access-Control-Allow-Credentials: true`. It-triq CORS kondiviża ta' OmniRoute qatt ma tagħmel.

Xi jfisser dan għal kull wiċċ, anke ma ' `CORS_ALLOW_ALL=true`:

| Wiċċ                                  | Mekkaniżmu ta' awtorizzazzjoni | Effett ta' wildcard CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`       | Sessjoni tal-cookies           | L-oriġini hija ripetuta, iżda **mingħajr `Allow-Credentials`** il-browser **blokki** il-kredenzjali jinqara. Sit malizzjuż ta' oriġini inkroċjata **ma jistax jaqra** it-tweġibiet tad-dashboard awtentikati tiegħek, u l-cookie tas-sessjoni mhix esposta.                                                                                                                                                                                                                                                                            |
| Klijent API `/v1/*`, `/v1beta/*`      | Bearer / `x-api-key` ras       | Diġà permissiv **bid-disinn** (`relaxForTokenAuth`): il-browsers qatt ma jwaħħlu awtomatikament `Authorization`/`x-api-key`, għalhekk il-paġna ta 'attakkant ma tistax tipprovdi ċ-ċavetta tiegħek. L-eku rilassat jeħtieġ suġġett awtentikat (ċavetta API validata jew sessjoni tad-dashboard), mhux biss header tal-kredenzjali, u qatt ma tinkludi `Access-Control-Allow-Credentials`. Risposti anonimi (`REQUIRE_API_KEY=false`) jużaw il-lista permessa tal-oriġini kkonfigurata, inkluża `CORS_ALLOW_ALL=true` opt-in espliċita. |
| Pubbliku qari biss (`/api/health`, …) | Xejn                           | Mhux sensittivi; wildcard ma jagħmilx ħsara.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Allura l-**residwu** espożizzjoni ta' `CORS_ALLOW_ALL=true` hija limitata għal: (a) oriġini inkroċjata mhux kredenzjali **jaqra** ta' dejta diġà mhux awtentikata, u (b) kiri ta CORS**pass ta' qabel it-titjira** fuq rotot ta' ġestjoni — li għadhom jeħtieġu awtorizzazzjoni li paġna ta' oriġini inkroċjata ma tistax tipprovdi. Huwa **le** vettur ta' sekwestru ta' sessjoni jew serq ta' kredenzjali fuq il-mogħdija CORS kondiviża.

### Eċċezzjoni waħda ġenwina — `/api/v1/agents/`

Ir-rotot Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) jistabbilixxu tagħhom **stess** CORS headers (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) u **tagħmel** jarmu `Access-Control-Allow-Origin: <origin>|*` flimkien ma ' `Access-Control-Allow-Credentials: true`. Dan huwa l-wiċċ uniku fejn l-oriġini-eku u l-kredenzjali jeżistu flimkien, u huwa **indipendenti minn `CORS_ALLOW_ALL`** . Dawn ir-rotot huma awtentikati mill-ġestjoni (`requireManagementAuth`); operaturi li jesponu d-dashboard barra mill-host għandhom ikunu konxji li dan huwa l-post wieħed fejn qari b'kredenzjali ta' oriġini inkroċjata huwa permess mill-intestaturi tar-rispons. L-issikkar tiegħu għal lista ta' permessi espliċita jiġi ssorveljat separatament minn din il-gwida CORS.

## Lista ta 'kontroll tal-produzzjoni

- **Qatt issettja `CORS_ALLOW_ALL=true` fil-produzzjoni.** Ħalliha mhux issettjata.
- Issettja an **espliċitu** lista tal-oriġini — jew l-env var jew il-qasam Security-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jekk OmniRoute jaħdem wara prokura inversa / mina (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS huwa **le** l-uniku kontroll tiegħek — il-loopback route guard għadu jipproteġi rotot kapaċi spawn (ara [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Tfalsifikax `X-Forwarded-For: 127.0.0.1` biex "tiffissa" 403; li terġa tiftaħ il-klassi RCE il-gwardja tar-rotta tagħlaq.
- Ikkonferma l-istat tar-runtime: id-dashboard juri a **banner ambra persistenti** taħt Dashboard → Sigurtà → Awtorizzazzjoni Inventarju kull meta `CORS_ALLOW_ALL=true` huwa ħaj, u `/api/settings/authz-inventory` jirritorna `cors: { allowAll, allowedOrigins }` envelope għodod ta 'monitoraġġ jistgħu poll.

## Żvilupp konvenjenza — jippermettu oriġini lokali speċifiċi

Rari għandek bżonn il-wildcard anke fid-dev. Ħalli biss is-servers dev li tuża:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

L-oriġini huma mqabbla b'mod insensittiv għall-każi mal-linja mmejla ta' wara injorata, għalhekk `http://localhost:3000` u `http://localhost:3000/` huma ekwivalenti. L-istess CSV jista 'jiġi ssettjat waqt ir-runtime in **Dashboard → Sigurtà → CORS Oriġini Permessi** mingħajr bidu mill-ġdid.

## Ċwievet API vs sessjonijiet tal-cookies

- **Bearer / `x-api-key` (il-wiċċ tal-inferenza `/v1/*` ):** browsers qatt ma jehmżu dawn awtomatikament. CORS mhix barriera sinifikanti hawn — iċ-ċavetta API hija l-barriera — u huwa għalhekk li dak il-wiċċ huwa intenzjonalment permissiv sabiex il-klijenti tal-brawżer u Electron jistgħu jaqraw tweġibiet li huma diġà intitolati għalihom. L-eku rilassat jeħtieġ suġġett awtentikat (ċavetta API validata jew sessjoni tad-dashboard), mhux biss header tal-kredenzjali, u qatt ma tinkludi `Access-Control-Allow-Credentials`. Risposti anonimi (`REQUIRE_API_KEY=false`) jużaw il-lista ta' permessi ta' oriġini kkonfigurata, inkluża `CORS_ALLOW_ALL=true` opt-in espliċita. Iċ-ċaħdiet ta' awtorizzazzjoni (401) jibqgħu jinqraw sabiex il-klijenti jkunu jistgħu joħorġu ċavetta revokata jew ittajpjata ħażin (#5242): 401 tal-pipeline stess iżomm l-eku, u rotta li tirrifjuta ċ-ċavetta nnifisha wara li l-pipeline servaha bħala anonima (`/v1/models` u `/v1beta/models` b'awtorizzazzjoni ta' ġestjoni kkonfigurata, `/v1/files`, `/v1/batches` `/v1/media` `/v1/session-leases` u r-rotta b'ambitu tas-sid ikkonfigurat) iżid l-eku għal dak 401 permezz `credentialRejectionHeaders()`. L-eku huwa keyed fuq it-talba li jġorr header kredenzjali (`Authorization`, `x-api-key`, `x-goog-api-key` jew il-cookie `auth_token` ), mhux fuq liema minnhom ir-rotta ċċekkjata, u qatt ma hija paired ma ' `Access-Control-Allow-Credentials`; il-korp huwa pakkett ta 'żball fiss. Ir-rotot ta' ġestjoni taħt `/api/v1/` mgħasses minn `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ma jużawx din l-eċċezzjoni ta' rifjut ta' kredenzjali: ma' `REQUIRE_API_KEY=false`, ir-risposti 401/403 tagħhom isegwu l-politika tal-oriġini CORS konfigurata.
- **Sessjoni tal-cookies (id-dashboard):** protetti mill-inadempjenza fail-closed **u** min-nuqqas ta’ `Access-Control-Allow-Credentials` fit-triq kondiviża. Żomm l-oriġini management/dashboard barra minn kwalunkwe konfigurazzjoni permissiva; għandhom jibqgħu eżattament fail-closed.

## WebSocket handshakes (`/v1/responses`, `/v1/ws`)

Il-browsers ma japplikawx CORS għal WebSocket, għalhekk it-trasport WebSocket li jirritorna l-output ta 'inferenza jiċċekkja l-handshake `Origin` infushom (`src/server/origin/wsOrigin.ts`): ir-Responses WebSocket (`/v1/responses`) u, meta OmniRoute jgħaddi minn `npm start` / `npm run dev`, il-pont `/v1/ws` u `/api/v1/ws`, li jixxandar `/v1/chat/completions`, `/v1/messages` bħala frames u `/v1/responses`. Il-pont jitlob `/api/v1/ws?handshake=1` għall-verdett u jirrifjuta li jaġġorna sakemm dik ir-rotta ma tkunx għamlet il-kontroll. Ir-rekwiżiti tal-awtentikazzjoni għadhom japplikaw separatament. Il-kontroll tal-oriġini jgħaddi meta:

- m'għandu l-ebda header `Origin` (Codex CLI, SDKs u klijenti oħra mhux tal-browser);
- iż- `Origin` hija ammessa mil-lista ta' permessi hawn fuq (`CORS_ALLOWED_ORIGINS`, l-issettjar `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- iż- `Origin` hija waħda mill-oriġini pubblika ta' OmniRoute stess (il-bażi pubblika konfigurata URL, oriġini mgħoddija ta' prokura fdata, jew host loopback/LAN dirett mogħti bħala IP letterali jew `localhost` — l-istess kandidati li juża l-kontroll tal-mutazzjoni tad-dashboard); jew
- iġorr ċavetta API valida, bħal fuq il-wiċċ HTTP `/v1/*`.

Xi ħaġa oħra tikseb `403 ws_origin_forbidden`. Cookie tas-sessjoni tad-dashboard ma teżentax `Origin` barrani , minħabba li l-browser jehmeż mas-socket ta' kwalunkwe paġna. `localhost` fuq port ieħor ma jiġix ittrattat bħala tal-istess oriġini; żid tali oriġini dev għal `CORS_ALLOWED_ORIGINS`.

## Eżempju: prokura inversa quddiem OmniRoute

CORS huwa infurzat minn OmniRoute innifsu, għalhekk il-prokura ġeneralment għandha **le** żid jew ikteb mill-ġdid `Access-Control-*` headers (headers doppji break browsers). Ittermina TLS u jgħaddi — ħalli OmniRoute iwieġeb qabel it-titjira:

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

Issettja l-oriġini tal-brawżer permessi OmniRoute (`CORS_ALLOWED_ORIGINS` jew it-tab tas-Sigurtà), mhux fil-prokura.

## Fajls tas-sors

| Tħassib                                              | Fajl                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Riżoluzzjoni tal-lista permessa + `getCorsStatus()`  | `src/server/cors/origins.ts`                                         |
| Applikazzjoni ta' middleware (sors uniku tal-verità) | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime oriġini injezzjoni                | `src/lib/config/runtimeSettings.ts`                                  |
| Status ta' runtime għad-dashboard                    | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner ta' twissija tad-dashboard                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Qasam ta' Oriġini Permessi CORS                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent għal kull rotta CORS (l-eċċezzjoni)      | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket handshake `Origin` check                   | `src/server/origin/wsOrigin.ts`                                      |

## Ara wkoll

- [Rotta Guard Tiers](./ROUTE_GUARD_TIERS.md) — infurzar loopback għal rotot kapaċi spawn (kontroll separat u kumplimentari).
- [Gwida ta 'Awtorizzazzjoni](../architecture/AUTHZ_GUIDE.md) — il-pipeline ta' awtorizzazzjoni sħiħa.
