# CORS Configuration & Security (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute jikkontrolla liema **oriġini tal-brawżer** jistgħu jaqraw risposti minn oriġini differenti
permezz ta’ lista ta’ permessi waħda u ċentralizzata. Il-mudell huwa **magħluq awtomatikament f’każ ta’ falliment**:
l-ebda oriġini ma tkun permessa sakemm ma tippermettihiex espliċitament. Din il-paġna tiddokumenta kif tiġi riżolta l-lista ta’ permessi,
x’jesponi fil-fatt `CORS_ALLOW_ALL=true` (u, importanti, x’**ma**
jesponix), kif tikkonfigura l-ambjenti tal-iżvilupp u tal-produzzjoni b’mod sikur, u t-twissija waqt l-eżekuzzjoni
li juri d-dashboard meta wildcard ikun attiv.

**Sors ewlieni tal-verità:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Il-lista ta’ permessi tiġi applikata darba waħda, fil-
middleware (`src/server/authz/pipeline.ts`) — il-handlers għal kull rotta ma jissettjawx
`Access-Control-Allow-Origin` huma stess.

## Kif tiġi riżolta oriġini

Għal kull talba, il-middleware jikkalkula l-valur ta’ `Access-Control-Allow-Origin`
f’din l-ordni:

1. **`CORS_ALLOW_ALL=true`** (jew il-konfigurazzjoni legata `CORS_ORIGIN=*`) → jirritorna l-
   `Origin` ta’ min jagħmel it-talba (jew `*` meta ma jkun hemm l-ebda header `Origin`), flimkien ma’ `Vary: Origin`
   sabiex il-caches jibqgħu korretti. L-istess punt ta’ kontroll `applyCorsHeaders()` iżid ukoll
   `Vary: Accept-Encoding` ma’ kull risposta 2xx li jkollha body fuq is-superfiċje
   `/v1*`/`/v1beta*` awtentikata permezz ta’ token (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), sabiex
   il-caches downstream/kondiviżi jkunu jistgħu jiddistingwu b’mod korrett bejn il-varjanti kkompressati u dawk mhux ikkompressati.
2. Inkella, l-`Origin` tat-talba jiġi normalizzat (ikkonvertit għal ittri żgħar u titneħħa
   s-slash finali) u mqabbel mal-**lista ta’ permessi magħquda**:
   - l-env **`CORS_ALLOWED_ORIGINS`** — lista separata b’virgoli, u
   - is-setting waqt l-eżekuzzjoni **`corsOrigins`** (Dashboard → Security → _CORS Allowed
     Origins_), injettat permezz ta’ `setRuntimeAllowedOrigins()` minn
     `src/lib/config/runtimeSettings.ts`.
3. L-ebda qbil → **ma jiġi emess l-ebda header `Access-Control-Allow-Origin`**. Il-brawżer
   jimblokka l-qari minn oriġini differenti. Dan huwa l-aġir intenzjonat li jkun magħluq awtomatikament f’każ ta’ falliment.

| Varjabbli tal-env      | Tifsira                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV tal-oriġini eżatti li għandhom jiġu permessi (rakkomandat).                        |
| `CORS_ALLOW_ALL`       | `true`/`1` → jirritorna kwalunkwe oriġini (wildcard). Għall-iżvilupp biss.             |
| `CORS_ORIGIN`          | Legat. `*` jaġixxi bħal `CORS_ALLOW_ALL`; valur wieħed jiżdied mal-lista ta’ permessi. |

## Mudell tat-theddid — x’jesponi verament `CORS_ALLOW_ALL=true`

It-twissija ġenerika tal-OWASP ("wildcard CORS = kwalunkwe sit jista’ jċempel l-API tiegħek") jistħoqqilha
tittieħed bis-serjetà, iżda l-esponiment ta’ OmniRoute huwa **aktar limitat mill-każ ġeneriku**,
minħabba fatt konkret wieħed tal-implimentazzjoni:

> **Il-`applyCorsHeaders()` ċentrali qatt ma jemetti
> `Access-Control-Allow-Credentials`.** Brawżer ma jesponix risposta minn oriġini differenti _bi kredenzjali_
> (li tinkludi cookies) sakemm is-server ma jibgħatx
> `Access-Control-Allow-Credentials: true`. Il-passaġġ CORS kondiviż ta’ OmniRoute qatt ma
> jagħmel dan.

Dan huwa xi jfisser għal kull superfiċje, anke b’`CORS_ALLOW_ALL=true`:

| Superfiċje                            | Mekkaniżmu ta’ awtentikazzjoni | Effett ta’ wildcard CORS                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`       | Sessjoni bil-cookie            | L-oriġini tiġi ritornata, iżda **mingħajr `Allow-Credentials`** il-brawżer **jimblokka** l-qari bi kredenzjali. Sit malizzjuż minn oriġini differenti **ma jistax jaqra** r-risposti awtentikati tad-dashboard tiegħek, u l-cookie tas-sessjoni ma tiġix esposta.                                                                                                                           |
| API tal-klijent `/v1/*`, `/v1beta/*`  | Header Bearer / `x-api-key`    | Diġà permissiv **apposta** (`relaxForTokenAuth`): il-brawżers qatt ma jehmżu awtomatikament `Authorization`/`x-api-key`, għalhekk il-paġna ta’ attakkant ma tistax tipprovdi ċ-ċavetta tiegħek. L-oriġini tintbagħat lura biss meta ċ-ċavetta ppreżentata tkun ġiet ivvalidata; ir-risposti anonimi (`REQUIRE_API_KEY=false`) iżommu l-lista ta’ permessi. `CORS_ALLOW_ALL` ma jwessax dan. |
| Qari pubbliku biss (`/api/health`, …) | Xejn                           | Mhux sensittiv; wildcard ma jagħmilx ħsara.                                                                                                                                                                                                                                                                                                                                                 |

Għalhekk, l-esponiment **residwu** ta’ `CORS_ALLOW_ALL=true` huwa limitat għal: (a)
**qari** minn oriġini differenti mingħajr kredenzjali ta’ data li diġà ma teħtieġx awtentikazzjoni, u (b)
li jippermetti li l-**preflight ta’ CORS jgħaddi** fuq ir-rotot tal-ġestjoni — li xorta waħda jeħtieġu awtentikazzjoni
li paġna minn oriġini differenti ma tistax tipprovdi. Dan **mhuwiex** vettur għall-ħtif ta’ sessjoni jew
is-serq ta’ kredenzjali fuq il-passaġġ CORS kondiviż.

### Eċċezzjoni waħda reali — `/api/v1/agents/`

Ir-rotot Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) jissettjaw
il-headers CORS **tagħhom stess**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) u **jemettu**
`Access-Control-Allow-Origin: <origin>|*` flimkien ma’
`Access-Control-Allow-Credentials: true`. Din hija l-unika superfiċje fejn
ir-ritorn tal-oriġini u l-kredenzjali jeżistu flimkien, u hija **indipendenti minn
`CORS_ALLOW_ALL`**. Dawn ir-rotot huma awtentikati għall-ġestjoni
(`requireManagementAuth`); l-operaturi li jesponu d-dashboard barra mill-host għandhom ikunu
konxji li dan huwa l-uniku post fejn qari minn oriġini differenti bi kredenzjali huwa permess mill-
headers tar-risposta. Ir-restrizzjoni tiegħu għal lista ta’ permessi espliċita qed tiġi segwita
separatament minn din il-gwida dwar CORS.

## Lista ta’ kontroll għall-produzzjoni

- **Qatt tissettja `CORS_ALLOW_ALL=true` fil-produzzjoni.** Ħallih mhux issettjat.
- Issettja lista **espliċita** ta’ oriġini — jew il-varjabbli tal-ambjent jew il-qasam fit-tab Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jekk OmniRoute jaħdem wara reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **mhuwiex** l-uniku kontroll tiegħek — il-protezzjoni
  tar-rotot loopback xorta tipproteġi r-rotot li jistgħu jniedu proċessi (ara
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Tiffalsifikax
  `X-Forwarded-For: 127.0.0.1` biex “tirranġa” 403; dan jerġa’ jiftaħ il-klassi RCE li
  tagħlaq il-protezzjoni tar-rotot.
- Ikkonferma l-istat waqt it-tħaddim: id-dashboard juri **banner ambra persistenti**
  taħt Dashboard → Security → Authorization Inventory kull meta
  `CORS_ALLOW_ALL=true` ikun attiv, u `/api/settings/authz-inventory` jirritorna
  envelope `cors: { allowAll, allowedOrigins }` li l-għodod ta’ monitoraġġ jistgħu jinterrogaw.

## Konvenjenza għall-iżvilupp — ippermetti oriġini lokali speċifiċi

Rari jkollok bżonn il-wildcard anki fl-iżvilupp. Ippermetti biss is-servers tal-iżvilupp li tuża:

```bash
# Servers tal-iżvilupp Vite (5173) + Next.js (3000) li jsejħu OmniRoute lokali
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

L-oriġini jitqabblu mingħajr distinzjoni bejn ittri kbar u żgħar, u s-slash finali
tiġi injorata, għalhekk `http://localhost:3000` u `http://localhost:3000/` huma
ekwivalenti. L-istess CSV jista’ jiġi ssettjat waqt it-tħaddim f’**Dashboard → Security → CORS Allowed Origins**
mingħajr restart.

## Ċwievet tal-API kontra sessjonijiet tal-cookies

- **Bearer / `x-api-key` (is-superfiċje tal-inferenza `/v1/*`):** il-browsers qatt ma jehmżu
  dawn awtomatikament. CORS mhuwiex ostaklu sinifikanti hawnhekk — iċ-ċavetta tal-API hija
  l-ostaklu — u għalhekk dik is-superfiċje hija intenzjonalment permissiva biex il-klijenti tal-browser u
  Electron ikunu jistgħu jaqraw it-tweġibiet li diġà għandhom dritt għalihom. Ir-rimandar
  rilassat tal-oriġini jsegwi ċ-ċavetta vvalidata, mhux sempliċement il-preżenza
  tal-header: meta `REQUIRE_API_KEY=false` jaqdi talba b’mod anonimu, ir-risposta
  b’suċċess tagħha żżomm il-lista ta’ permessi magħluqa awtomatikament. Iċ-ċaħdiet
  tal-awtentikazzjoni (401) jibqgħu jinqraw sabiex il-klijenti jkunu jistgħu juru ċavetta
  revokata jew miktuba ħażin (#5242): l-401 tal-pipeline innifsu jżomm ir-rimandar, u
  rotta li tirrifjuta ċ-ċavetta hija stess wara li l-pipeline qeda t-talba bħala anonima
  (`/v1/models` u `/v1beta/models` meta tkun ikkonfigurata l-awtentikazzjoni tal-ġestjoni,
  ir-rotot limitati għas-sid `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases`
  u r-rotot kandidati tal-auto-combo) iżżid ir-rimandar ma’ dak l-401 permezz ta’
  `credentialRejectionHeaders()`. Ir-rimandar jiddependi minn jekk it-talba ġġorrx header
  ta’ kredenzjali (`Authorization`, `x-api-key`, `x-goog-api-key` jew il-cookie
  `auth_token`), mhux minn liema minnhom iċċekkjat ir-rotta, u qatt ma jingħaqad ma’
  `Access-Control-Allow-Credentials`; il-body huwa envelope ta’ żball fiss. Ir-rotot
  tal-ġestjoni taħt `/api/v1/` protetti minn `requireManagementAuth()`
  (`/api/v1/management/*`, `/api/v1/registered-keys`) ma jżidux ir-rimandar:
  b’`REQUIRE_API_KEY=false` l-401/403 tagħhom ma jistgħux jinqraw minn oriġini differenti.
- **Sessjoni tal-cookie (id-dashboard):** protetta mill-imġiba awtomatika ta’ għeluq f’każ ta’ ħsara **u**
  min-nuqqas ta’ `Access-Control-Allow-Credentials` fil-path kondiviż. Żomm
  l-oriġini tal-ġestjoni/dashboard barra minn kwalunkwe konfigurazzjoni permissiva; dawn għandhom jibqgħu
  strettament magħluqa f’każ ta’ ħsara.

## Handshakes tal-WebSocket (`/v1/responses`, `/v1/ws`)

Il-brawżers ma japplikawx CORS għall-WebSocket, għalhekk it-trasporti WebSocket li
jirritornaw l-output tal-inferenza jiċċekkjaw huma stess l-`Origin` tal-handshake
(`src/server/origin/wsOrigin.ts`): il-Responses WebSocket (`/v1/responses`) u, meta
OmniRoute jaħdem permezz ta’ `npm start` / `npm run dev`, il-pont `/v1/ws` u
`/api/v1/ws`, li jibgħat `/v1/chat/completions`, `/v1/messages` u `/v1/responses` bħala
frames fi stream. Il-pont jistaqsi lil `/api/v1/ws?handshake=1` għall-verdett u
jirrifjuta li jagħmel upgrade sakemm dik ir-rotta ma tkunx għamlet il-kontroll.
Handshake jiġi aċċettat meta:

- ma jkollux header `Origin` (Codex CLI, SDKs u klijenti oħra li mhumiex brawżers);
- l-`Origin` ikun ammess mil-lista ta’ permessi ta’ hawn fuq (`CORS_ALLOWED_ORIGINS`,
  is-setting `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- l-`Origin` ikun waħda mill-oriġini pubbliċi ta’ OmniRoute stess (l-URL bażi pubbliku
  kkonfigurat, l-oriġini mgħoddija ta’ proxy fdat, jew host loopback/LAN dirett mogħti
  bħala IP letterali jew `localhost` — l-istess kandidati li juża l-kontroll
  tal-mutazzjonijiet tad-dashboard); jew
- ikollu ċavetta tal-API valida, bħal fuq is-superfiċje HTTP `/v1/*`.

Kull ħaġa oħra tieħu `403 ws_origin_forbidden`. Cookie tas-sessjoni tad-dashboard ma
teżentax `Origin` barrani, għax il-brawżer jehmżha mas-socket ta’ kwalunkwe paġna.
`localhost` fuq port ieħor ma jitqiesx bħala l-istess oriġini; żid oriġini bħal dawn
tal-iżvilupp ma’ `CORS_ALLOWED_ORIGINS`.

## Eżempju: reverse proxy quddiem OmniRoute

CORS jiġi infurzat minn OmniRoute stess, għalhekk ġeneralment il-proxy **m’għandux** iżid jew
jikteb mill-ġdid l-headers `Access-Control-*` (headers doppji jikkawżaw problemi fil-browsers). Ittermina t-TLS
u għaddi t-traffiku — ħalli lil OmniRoute jwieġeb għall-preflight:

```nginx
# nginx — għaddi t-traffiku lil OmniRoute; IDDAĦĦALX Access-Control-* hawnhekk
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Żomm l-headers tat-trażmissjoni: proxy fuq l-istess host jikkonnettja mil-loopback, u huma
    # dawn li jgħidu lil OmniRoute li min qed jagħmel it-talba mhuwiex l-operatur lokali. Proxy li ma jżid ebda wieħed minnhom
    # iġiegħel lil kull min jagħmel talba mill-bogħod jidher lokali. Lanqas qatt tissettja X-Forwarded-For għal 127.0.0.1.
}
```

Issettja l-oriġini permessi tal-browser f’OmniRoute (`CORS_ALLOWED_ORIGINS` jew it-tab
Security), mhux fil-proxy.

## Fajls tas-sors

| Aspett                                               | Fajl                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Riżoluzzjoni tal-allowlist + `getCorsStatus()`       | `src/server/cors/origins.ts`                                         |
| Applikazzjoni tal-middleware (sors uniku tal-verità) | `src/server/authz/pipeline.ts`                                       |
| Settings → injezzjoni tal-oriġini waqt it-tħaddim    | `src/lib/config/runtimeSettings.ts`                                  |
| Status waqt it-tħaddim għad-dashboard                | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner ta’ twissija tad-dashboard                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Qasam CORS Allowed Origins                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS għal kull rotta ta’ Cloud-Agent (l-eċċezzjoni)  | `src/lib/cloudAgent/api.ts`                                          |
| Kontroll tal-`Origin` fil-handshake tal-WebSocket    | `src/server/origin/wsOrigin.ts`                                      |

## Ara wkoll

- [Livelli tal-Gwardji tar-Rotot](./ROUTE_GUARD_TIERS.md) — infurzar tal-loopback għal
  rotot li jistgħu joħolqu proċessi (kontroll separat u komplementari).
- [Gwida għall-Awtorizzazzjoni](../architecture/AUTHZ_GUIDE.md) — il-pipeline sħiħ tal-awtentikazzjoni.
