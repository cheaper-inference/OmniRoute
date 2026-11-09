# CORS Configuration & Security (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

Kinokontrol OmniRoute kung alin **mga pinagmulan ng browser** maaaring magbasa ng mga cross-origin na tugon mula sa isang solong, sentralisadong allowlist. Ang modelo ay **nabigo-sarado bilang default** : walang pinanggalingan ang pinahihintulutan hanggang sa mag-opt in ka ng isa. Ang pahinang ito ay nagdodokumento kung paano niresolba ng allowlist, kung ano talaga ang inilalantad `CORS_ALLOW_ALL=true` (at, mahalaga, kung ano ang ginagawa nito **hindi** ), kung paano ligtas na i-configure ang dev vs production, at ang runtime na babala sa dashboard ay nagpapakita kapag ang isang wildcard ay live.

**Pinagmulan ng katotohanan:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Ang allowlist ay inilapat nang isang beses, sa middleware (`src/server/authz/pipeline.ts`) — per-route handlers ay hindi nagtatakda ng `Access-Control-Allow-Origin` mismo.

## Paano niresolba ang pinagmulan

Para sa bawat kahilingan kinukuwenta ng middleware ang halaga `Access-Control-Allow-Origin` sa ganitong pagkakasunud-sunod:

1. **`CORS_ALLOW_ALL=true`** (o ang legacy `CORS_ORIGIN=*`) → echo ang `Origin` pabalik ng tumatawag (o `*` kapag walang `Origin` header), na may `Vary: Origin` para manatiling tama ang mga cache. Ang parehong `applyCorsHeaders()` chokepoint ay nagdaragdag din ng `Vary: Accept-Encoding` sa bawat 2xx-with-body na tugon sa token-authenticated `/v1*`/`/v1beta*` surface (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), kaya ang mga downstream/shared cache ay maaaring makilala nang tama ang compressed vs uncompressed na mga variant.
2. Kung hindi, ang kahilingang `Origin` ay na-normalize (lower-cased, trailing slash stripped) at itinutugma laban sa **pinagsamang allowlist** :
   - env **`CORS_ALLOWED_ORIGINS`** — comma-separated list, at
   - ang runtime **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed Origins_), na-injected sa pamamagitan ng `setRuntimeAllowedOrigins()` mula sa `src/lib/config/runtimeSettings.ts`.
3. Walang katugmang →**walang `Access-Control-Allow-Origin` header na inilalabas** . Hinaharangan ng browser ang cross-origin read. Ito ang nilalayong default na fail-closed.

| Env var                | Ibig sabihin                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ng eksaktong mga pinanggalingan upang payagan (inirerekomenda).                                 |
| `CORS_ALLOW_ALL`       | `true`/`1` → echo anumang pinagmulan (wildcard). Dev lang.                                          |
| `CORS_ORIGIN`          | Legacy. `*` ay kumikilos tulad ng `CORS_ALLOW_ALL`; isang solong halaga ang idinagdag sa allowlist. |

## Modelong pagbabanta — kung ano talaga ang inilantad `CORS_ALLOW_ALL=true`

Ang generic na babala OWASP ("wildcard CORS = na anumang site ay maaaring tumawag sa iyong API") ay nararapat na seryosohin, ngunit ang pagkakalantad ng OmniRoute ay **mas makitid kaysa sa generic na kaso** , dahil sa isang konkretong katotohanan sa pagpapatupad:

> **Ang gitnang `applyCorsHeaders()` ay hindi kailanman naglalabas `Access-Control-Allow-Credentials`.** Ang isang browser ay hindi maglalantad ng _credentialed_ (cookie-bearing) cross-origin na tugon maliban kung ang server ay nagpapadala `Access-Control-Allow-Credentials: true`. Ang nakabahaging CORS na landas ng OmniRoute ay hindi kailanman ginagawa.

Ano ang ibig sabihin nito sa bawat ibabaw, kahit na may `CORS_ALLOW_ALL=true`:

| Ibabaw                                    | Mekanismo ng pagpapatunay     | Epekto ng wildcard CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`           | Sesyon ng cookie              | Pinagmulan ay echoed, ngunit **walang `Allow-Credentials`** ang browser **mga bloke** ang kredensyal na nabasa. Isang nakakahamak na cross-origin site **hindi makabasa** ang iyong napatotohanan na mga tugon sa dashboard, at ang cookie ng session ay hindi nalantad.                                                                                                                                                                                                                                                                                                                                                        |
| Kliyente API `/v1/*`, `/v1beta/*`         | Tagadala / `x-api-key` header | Permissive na **sa pamamagitan ng disenyo** (`relaxForTokenAuth`): Ang mga browser ay hindi kailanman nag-auto-attach `Authorization`/`x-api-key`, kaya hindi maibibigay ng page ng attacker ang iyong key. Ang nakakarelaks na echo ay nangangailangan ng isang napatotohanan na paksa (isang napatunayang API key o sesyon ng dashboard), hindi lamang isang kredensyal na header, at hindi kailanman kasama `Access-Control-Allow-Credentials`. Ginagamit ng mga anonymous na tugon (`REQUIRE_API_KEY=false`) ang na-configure na allowlist ng pinanggalingan, kabilang ang isang tahasang pag-opt-in `CORS_ALLOW_ALL=true`. |
| Pampublikong read-only (`/api/health`, …) | wala                          | Hindi sensitibo; Ang wildcard ay hindi nakakapinsala.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Kaya ang **nalalabi** Ang pagkakalantad ng `CORS_ALLOW_ALL=true` ay limitado sa: (a) hindi kredensyal na cross-origin **nagbabasa** ng data na hindi napatotohanan, at (b) pagpapaalam sa CORS**preflight pass** sa mga ruta ng pamamahala — na nangangailangan pa rin ng auth na hindi maibibigay ng cross-origin page. Ito ay **hindi** isang session-hijack o credential-theft vector sa nakabahaging CORS path.

### Isang tunay na exception — `/api/v1/agents/`

Itinakda ng mga ruta ng Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ang kanilang **sariling** Mga header ng CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) at **gawin** naglalabas ng `Access-Control-Allow-Origin: <origin>|*` kasama ng `Access-Control-Allow-Credentials: true`. Ito ang nag-iisang surface kung saan magkakasamang umiral ang origin-echo at mga kredensyal, at ito nga **independyente sa `CORS_ALLOW_ALL`** . Ang mga rutang ito ay pinatotohanan ng pamamahala (`requireManagementAuth`); dapat malaman ng mga operator na naglalantad sa dashboard off-host na ito ang isang lugar kung saan pinahihintulutan ng mga header ng tugon ang isang cross-origin na kredensyal na pagbasa. Ang paghihigpit nito sa isang tahasang allowlist ay sinusubaybayan nang hiwalay mula sa gabay na ito CORS.

## Checklist ng produksyon

- **Huwag kailanman itakda `CORS_ALLOW_ALL=true` sa produksyon.** Iwanan itong hindi nakatakda.
- Itakda ang isang **tahasan** listahan ng pinanggalingan — alinman sa env var o ang field na Security-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Kung tumatakbo OmniRoute sa likod ng isang reverse proxy / tunnel (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS ay **hindi** ang tanging kontrol mo — ay pinoprotektahan pa rin ng bantay ng ruta ng loopback ang mga rutang may kakayahan sa spawn (tingnan [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Huwag pekein `X-Forwarded-For: 127.0.0.1` para "ayusin" ang isang 403; na muling binubuksan ang klase RCE na isinasara ng bantay ng ruta.
- Kumpirmahin ang estado ng runtime: ang dashboard ay nagpapakita ng a **patuloy na amber na banner** sa ilalim ng Dashboard → Security → Authorization Inventory sa tuwing `CORS_ALLOW_ALL=true` ay live, at `/api/settings/authz-inventory` ay nagbabalik ng `cors: { allowAll, allowedOrigins }` envelope monitoring tool na maaaring poll.

## Ang kaginhawaan ng pag-unlad ay pinapayagan ng — ang mga partikular na lokal na pinagmulan

Bihira mong kailanganin ang wildcard kahit sa dev. Payagan lang ang mga dev server na ginagamit mo:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Ang mga pinanggalingan ay itinugma sa case-insensitive na hindi pinansin ang trailing slash, kaya `http://localhost:3000` at `http://localhost:3000/` ay katumbas. Ang parehong CSV ay maaaring itakda sa runtime in **Dashboard → Security → CORS Allowed Origins** nang walang pag-restart.

## Mga API key kumpara sa mga session ng cookie

- **Tagadala / `x-api-key` (ang ibabaw ng hinuha `/v1/*` ):** hindi kailanman awtomatikong ikinakabit ng mga browser ang mga ito. CORS ay hindi isang makabuluhang hadlang dito — ang API key ay ang hadlang — kung kaya't ang ibabaw na iyon ay sadyang pinahintulutan upang mabasa ng mga kliyente ng browser at Electron ang mga tugon na mayroon na silang karapatan. Ang nakakarelaks na echo ay nangangailangan ng isang napatotohanan na paksa (isang napatunayang API key o sesyon ng dashboard), hindi lamang isang kredensyal na header, at hindi kailanman kasama `Access-Control-Allow-Credentials`. Ginagamit ng mga anonymous na tugon (`REQUIRE_API_KEY=false`) ang na-configure na pinanggalingan na allowlist, kabilang ang isang tahasang pag-opt-in `CORS_ALLOW_ALL=true`. Ang mga pagtanggi sa auth (401) ay mananatiling nababasa upang maipakita ng mga kliyente ang isang binawi o maling pag-type na key (#5242): ang sariling pipeline na 401 ay nagpapanatili ng echo, at isang ruta na tumatanggi sa mismong susi pagkatapos itong ihatid ng pipeline bilang anonymous (`/v1/models` at `/v1beta/models` na may management auth na na-configure, ang may-ari na nasasakupan ng mga ruta na `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases`, ang mga rutang nasasakupan ng may-ari. echo sa 401 na iyon sa pamamagitan ng `credentialRejectionHeaders()`. Ang echo ay naka-key sa kahilingan na nagdadala ng isang kredensyal na header (`Authorization`, `x-api-key`, `x-goog-api-key` o ang `auth_token` cookie), hindi kung alin sa kanila ang rutang nasuri, at hindi kailanman ipinares sa `Access-Control-Allow-Credentials`; ang katawan ay isang nakapirming sobre ng error. Ang mga ruta ng pamamahala sa ilalim ng `/api/v1/` na binabantayan ng `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ay hindi gumagamit ng credential-rejection exception na ito: kasama ang `REQUIRE_API_KEY=false`, ang kanilang mga 401/403 na tugon ay sumusunod sa naka-configure na patakaran sa pinagmulan CORS.
- **Cookie session (ang dashboard):** protektado ng default na fail-closed **at** sa pamamagitan ng kawalan ng `Access-Control-Allow-Credentials` sa ibinahaging landas. Panatilihin ang mga pinagmulan ng management/dashboard sa anumang permissive na config; dapat silang manatiling eksaktong nabigo-sarado.

## WebSocket handshakes (`/v1/responses`, `/v1/ws`)

Hindi inilalapat ng mga browser CORS sa WebSocket, kaya ang WebSocket ay nagdadala na nagbabalik ng inference output suriin ang handshake `Origin` mismo (`src/server/origin/wsOrigin.ts`): ang Mga Tugon WebSocket (`/v1/responses`) at, kapag OmniRoute ay tumatakbo sa `npm start` / `npm run dev`, ang `/v1/ws` at `/api/v1/ws` bridge, na nag-stream ng `/v1/chat/completions`, `/v1/messages` at `/v1/responses` bilang mga frame. Ang tulay ay humihingi `/api/v1/ws?handshake=1` para sa hatol at tumanggi na mag-upgrade maliban kung ang rutang iyon ay nagpatakbo ng tseke. Ang mga kinakailangan sa pagpapatunay ay nalalapat pa rin nang hiwalay. Ang origin check ay pumasa kapag:

- wala itong `Origin` header (Codex CLI, SDKs at iba pang hindi browser na kliyente);
- ang `Origin` ay tinatanggap ng allowlist sa itaas (`CORS_ALLOWED_ORIGINS`, ang setting ng `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- ang `Origin` ay isa sa sariling pampublikong pinagmulan ng OmniRoute(ang naka-configure na pampublikong base URL, isang pinagkakatiwalaang proxy na ipinasa na pinanggalingan, o isang direktang host loopback/LAN na ibinigay bilang IP literal o `localhost` — ng parehong mga kandidato na ginagamit ng pagsusuri sa mutation ng dashboard); o
- nagdadala ito ng wastong API key, tulad ng nasa ibabaw ng HTTP `/v1/*`.

Ang anumang bagay ay nakakakuha `403 ws_origin_forbidden`. Ang cookie ng session ng dashboard ay hindi naglilibre sa isang dayuhang `Origin`, dahil inilalagay ito ng browser sa anumang socket ng pahina. `localhost` sa isa pang port ay hindi itinuturing na parehong pinagmulan; magdagdag ng mga naturang dev pinanggalingan sa `CORS_ALLOWED_ORIGINS`.

## Halimbawa: reverse proxy sa harap ng OmniRoute

CORS ay ipinapatupad ng OmniRoute mismo, kaya ang proxy sa pangkalahatan ay dapat **hindi** magdagdag o muling isulat ang mga header `Access-Control-*` (double header break browser). Wakasan TLS at ipasa ang — hayaan ang OmniRoute na sagutin ang preflight:

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

Itakda ang pinapayagang mga pinagmulan ng browser sa OmniRoute (`CORS_ALLOWED_ORIGINS` o ang tab na Seguridad), hindi sa proxy.

## Pinagmulan ng mga file

| Pag-aalala                                                  | file                                                                 |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist resolution + `getCorsStatus()`                    | `src/server/cors/origins.ts`                                         |
| Middleware application (iisang pinagmumulan ng katotohanan) | `src/server/authz/pipeline.ts`                                       |
| Mga Setting → runtime origin injection                      | `src/lib/config/runtimeSettings.ts`                                  |
| Katayuan ng runtime para sa dashboard                       | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner ng babala sa dashboard                               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Field ng CORS Allowed Origins                               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent per-route CORS (ang exception)                  | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket handshake `Origin` check                          | `src/server/origin/wsOrigin.ts`                                      |

## Tingnan din

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback na pagpapatupad para sa mga rutang may kakayahang mag-spawn (isang hiwalay, komplementaryong kontrol).
- [Gabay sa Awtorisasyon](../architecture/AUTHZ_GUIDE.md) — ang buong pipeline ng auth.
