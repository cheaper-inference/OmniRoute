# CORS Configuration & Security (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ń ṣàkóso àwọn **orisun aṣàwákiri** tí a yọ̀ǹda fún láti ka àwọn ìdáhùn láti orísun mìíràn
láti inú àtòjọ ìyọ̀ǹda àárín gbùngbùn kan ṣoṣo. Àwòṣe náà jẹ́ **kíkọ̀ ààyè sílẹ̀ nípa àìyẹsẹ̀**:
kò sí orísun kankan tí a yọ̀ǹda títí tí o fi yan láti fi í kún un. Ojú-ìwé yìí ṣe àkọsílẹ̀ bí àtòjọ ìyọ̀ǹda
ṣe ń yanjú, ohun tí `CORS_ALLOW_ALL=true` ń ṣí sílẹ̀ gan-an (àti, ní pàtàkì, ohun tí
kò **ṣí sílẹ̀**), bí a ṣe lè ṣètò àyíká ìdàgbàsókè àti ti iṣelọpọ láìléwu, àti ìkìlọ̀ ní àkókò ìṣiṣẹ́
tí pátákó ìṣàkóso ń fi hàn nígbà tí àmì gbogbogbò bá ń ṣiṣẹ́.

**Orísun òtítọ́:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). A máa lo àtòjọ ìyọ̀ǹda náà lẹ́ẹ̀kan ṣoṣo, nínú
middleware (`src/server/authz/pipeline.ts`) — àwọn olùṣàkóso ọ̀nà kọ̀ọ̀kan kò ṣètò
`Access-Control-Allow-Origin` fúnra wọn.

## Bí a ṣe ń yanjú orísun kan

Fún ìbéèrè kọ̀ọ̀kan, middleware máa ń ṣírò iye `Access-Control-Allow-Origin`
ní ìtòlẹ́sẹẹsẹ yìí:

1. **`CORS_ALLOW_ALL=true`** (tàbí `CORS_ORIGIN=*` àtijọ́) → dá
   `Origin` olùpè náà padà (tàbí `*` nígbà tí kò bá sí akọlé `Origin`), pẹ̀lú `Vary: Origin`
   kí àwọn cache lè dúró ní títọ́. Kókó ìṣàkóso `applyCorsHeaders()` kan náà tún máa ń fi
   `Vary: Accept-Encoding` kún gbogbo ìdáhùn 2xx-tí-ó-ní-àkóónú lórí ojú-iṣẹ́
   `/v1*`/`/v1beta*` tí a fi token jẹ́rìí sí (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), kí
   àwọn cache ìpele-isalẹ/tí a pín lè ṣe ìyàtọ̀ tó tọ́ láàárín àwọn ẹ̀dà tí a fún pọ̀ àti èyí tí a kò fún pọ̀.
2. Bí bẹ́ẹ̀ kọ́, a máa ṣe `Origin` ìbéèrè náà déédéé (yí i sí lẹ́tà kékeré, yọ slash
   ìparí kúrò), a sì máa fi wé **àtòjọ ìyọ̀ǹda tí a dapọ̀**:
   - env **`CORS_ALLOWED_ORIGINS`** — àtòjọ tí comma pín, àti
   - ètò **`corsOrigins`** ní àkókò ìṣiṣẹ́ (Pátákó Ìṣàkóso → Ààbò → _Àwọn Orísun Tí CORS Yọ̀ǹda
     Fún_), tí a fi sílẹ̀ nípasẹ̀ `setRuntimeAllowedOrigins()` láti
     `src/lib/config/runtimeSettings.ts`.
3. Kò sí ìbámu → **a kò ní fi akọlé `Access-Control-Allow-Origin` ránṣẹ́**. Aṣàwákiri
   máa dí kíkà láti orísun mìíràn náà. Èyí ni ìhùwàsí àìyẹsẹ̀ tí a pinnu láti kọ ààyè sílẹ̀.

| Env var                | Ìtumọ̀                                                                             |
| ---------------------- | --------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV àwọn orísun pàtó tí a fẹ́ yọ̀ǹda fún (a dámọ̀ràn rẹ̀).                            |
| `CORS_ALLOW_ALL`       | `true`/`1` → dá orísun èyíkéyìí padà (àmì gbogbogbò). Fún ìdàgbàsókè nìkan.       |
| `CORS_ORIGIN`          | Ti àtijọ́. `*` ń ṣiṣẹ́ bí `CORS_ALLOW_ALL`; a máa fi iye kan ṣoṣo kún àtòjọ ìyọ̀ǹda. |

## Àwòṣe ewu — ohun tí `CORS_ALLOW_ALL=true` ń ṣí sílẹ̀ gan-an

Ó yẹ kí a fi ìkìlọ̀ gbogbogbò OWASP ("CORS àmì gbogbogbò = ojúlé èyíkéyìí lè pe API rẹ") sí
ọkàn dáadáa, ṣùgbọ́n ohun tí OmniRoute ń ṣí sílẹ̀ **kéré ju ipò gbogbogbò lọ**,
nítorí òtítọ́ kan pàtó nípa ìmúṣẹ:

> **`applyCorsHeaders()` àárín gbùngbùn kò fi
> `Access-Control-Allow-Credentials` ránṣẹ́ láéláé.** Aṣàwákiri kò ní fi ìdáhùn láti orísun mìíràn tí ó _ní ẹ̀rí ìdánimọ̀_
> (tí ó gbé cookie) hàn àfi tí olupin bá fi
> `Access-Control-Allow-Credentials: true` ránṣẹ́. Ọ̀nà CORS tí OmniRoute ń pín kò ṣe
> bẹ́ẹ̀ láéláé.

Ohun tí ìyẹn túmọ̀ sí fún ojú-iṣẹ́ kọ̀ọ̀kan, àní pẹ̀lú `CORS_ALLOW_ALL=true`:

| Ojú-iṣẹ́                                         | Ọ̀nà ìfàṣẹsí                | Ipa CORS àmì gbogbogbò                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pátákó Ìṣàkóso / MANAGEMENT `/api/*`            | Ìgbà cookie                | A dá orísun padà, ṣùgbọ́n **láìsí `Allow-Credentials`** aṣàwákiri máa **dí** kíkà tí ó ní ẹ̀rí ìdánimọ̀. Ojúlé oníjàngbọ̀n láti orísun mìíràn **kò lè ka** àwọn ìdáhùn pátákó ìṣàkóso rẹ tí a ti jẹ́rìí sí, a kò sì ṣí cookie ìgbà náà sílẹ̀.                                                                                                                                                    |
| API Oníbàárà `/v1/*`, `/v1beta/*`               | Akọlé Bearer / `x-api-key` | Ó ti gba ààyè tẹ́lẹ̀ **gẹ́gẹ́ bí a ṣe ṣe àpẹrẹ rẹ̀** (`relaxForTokenAuth`): àwọn aṣàwákiri kì í so `Authorization`/`x-api-key` mọ́ ìbéèrè fúnra wọn, nítorí náà ojú-ìwé akóbíni kò lè pèsè kọ́kọ́rọ́ rẹ. Echo náà máa ń ṣiṣẹ́ nìkan nígbà tí a bá ti fìdí kọ́kọ́rọ́ tí a gbé kalẹ̀ múlẹ̀; àwọn ìdáhùn aláìlórúkọ (`REQUIRE_API_KEY=false`) máa ń pa allowlist mọ́. `CORS_ALLOW_ALL` kò mú èyí gbòòrò sí i. |
| Ti gbogbo ènìyàn, kíkà-nìkan (`/api/health`, …) | Kò sí                      | Kò ní ìsọfúnni àṣírí; àmì gbogbogbò kò léwu.                                                                                                                                                                                                                                                                                                                                               |

Nítorí náà, ìṣípayá **tó ṣẹ́kù** láti inú `CORS_ALLOW_ALL=true` ní ààlà sí: (a)
kíkà láti orísun mìíràn **tí kò ní ẹ̀rí ìdánimọ̀** fún dátà tí kò nílò ìfàṣẹsí tẹ́lẹ̀, àti (b)
jíjẹ́ kí **preflight** CORS kọjá lórí àwọn ọ̀nà ìṣàkóso — tí ó ṣì nílò ìfàṣẹsí
tí ojú-ìwé láti orísun mìíràn kò lè pèsè. Èyí **kì í ṣe** ọ̀nà jíjà gbà ìgbà
tàbí jíjí ẹ̀rí ìdánimọ̀ lórí ọ̀nà CORS tí a pín.

### Ìyàtọ̀ gidi kan — `/api/v1/agents/`

Àwọn ọ̀nà Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) máa ń ṣètò
àwọn akọlé CORS **tiwọn fúnra wọn**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) wọ́n sì **máa ń** fi
`Access-Control-Allow-Origin: <origin>|*` ránṣẹ́ papọ̀ pẹ̀lú
`Access-Control-Allow-Credentials: true`. Èyí ni ojú-iṣẹ́ kan ṣoṣo níbi tí
dídá orísun padà àti ẹ̀rí ìdánimọ̀ ti wà papọ̀, ó sì jẹ́ **òmìnira kúrò lọ́dọ̀
`CORS_ALLOW_ALL`**. Àwọn ọ̀nà wọ̀nyí nílò ìfàṣẹsí ìṣàkóso
(`requireManagementAuth`); àwọn olùṣàkóso tí wọ́n ṣí pátákó ìṣàkóso sílẹ̀ níta ẹ̀rọ agbàlejò gbọ́dọ̀
mọ̀ pé ibí yìí nìkan ni àwọn akọlé ìdáhùn ti yọ̀ǹda fún kíkà láti orísun mìíràn tí ó ní ẹ̀rí ìdánimọ̀.
Ṣíṣe ààlà rẹ̀ sí àtòjọ ìyọ̀ǹda pàtó ni a ń tọpinpin
lọ́tọ̀ sí ìtọ́sọ́nà CORS yìí.

## Àtòjọ àyẹ̀wò fún production

- **Má ṣe ṣètò `CORS_ALLOW_ALL=true` ní production láéláé.** Fi sílẹ̀ láìṣètò.
- Ṣètò àtòjọ àwọn origin ní **kedere** — yálà env var tàbí ààyè inú Security tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Bí OmniRoute bá ń ṣiṣẹ́ lẹ́yìn reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **kì í ṣe** ìṣàkóso rẹ kan ṣoṣo — olùṣọ́ route loopback
  ṣì ń dáàbò bo àwọn route tó lè ṣe spawn (wo
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Má ṣe ṣe
  `X-Forwarded-For: 127.0.0.1` èké láti “ṣàtúnṣe” 403; ìyẹn yóò tún ṣí irú RCE tí
  olùṣọ́ route ti ti pa.
- Jẹ́rìí ipò runtime: dashboard máa ń ṣàfihàn **àsìá amber tí kò parẹ́**
  lábẹ́ Dashboard → Security → Authorization Inventory nígbàkigbà tí
  `CORS_ALLOW_ALL=true` bá ń ṣiṣẹ́, `/api/settings/authz-inventory` sì máa ń dá
  àpò `cors: { allowAll, allowedOrigins }` padà, èyí tí àwọn irinṣẹ́ monitoring lè máa ṣàyẹ̀wò.

## Ìrọ̀rùn development — gba àwọn origin local pàtó láàyè

O kì í sábà nílò wildcard àní ní dev. Gba àwọn dev server tí o ń lò nìkan láàyè:

```bash
# Àwọn dev server Vite (5173) + Next.js (3000) tí ń pe OmniRoute local kan
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

A máa ń fi àwọn origin wé ara wọn láìka bóyá lẹ́tà jẹ́ ńlá tàbí kékeré, a sì máa ń foju
fo slash tó wà ní ìparí, nítorí náà `http://localhost:3000` àti
`http://localhost:3000/` jẹ́ ọ̀kan náà. A tún lè ṣètò CSV kan náà ní runtime nínú
**Dashboard → Security → CORS Allowed Origins** láì ṣe restart.

## Àwọn API key ní ìfiwéra pẹ̀lú cookie session

- **Bearer / `x-api-key` (ojú inference `/v1/*`):** àwọn browser kì í so
  ìwọ̀nyí mọ́ request fúnra wọn láéláé. CORS kì í ṣe ìdènà tó nítumọ̀ níbí — API key ni
  ìdènà náà — ìdí nìyẹn tí ojú yìí fi mọ̀ọ́mọ̀ jẹ́ permissive kí àwọn client
  browser àti Electron lè ka àwọn response tí wọ́n ti ní ẹ̀tọ́ sí.
  Echo tí a ṣe ní ìrọ̀rùn yìí ń tẹ̀lé key tí a ti fìdí rẹ̀ múlẹ̀, kì í ṣe wíwà header
  nìkan: nígbà tí `REQUIRE_API_KEY=false` bá sin request kan láìlórúkọ, response rẹ̀ tó
  yọrí sí rere máa ń pa allowlist fail-closed mọ́. Àwọn ìkọ̀sílẹ̀ auth (401) ṣì máa ń ṣeé
  kà kí àwọn client lè fi key tí a ti fagilé tàbí tí a tẹ̀ ní àṣìṣe hàn (#5242): 401 ti
  pipeline fúnra rẹ̀ máa ń pa echo mọ́, àti route kan tí ó fúnra rẹ̀ kọ key náà lẹ́yìn tí
  pipeline ti sin ín gẹ́gẹ́ bí aláìlórúkọ (`/v1/models` àti `/v1beta/models` nígbà tí a
  ti ṣètò management auth, àwọn route tí ó jẹ́ ti olóhun nìkan `/v1/files`,
  `/v1/batches`, `/v1/media`, `/v1/session-leases` àti àwọn candidate route auto-combo)
  máa ń fi echo kún 401 náà nípasẹ̀ `credentialRejectionHeaders()`. Echo náà dá lórí bóyá
  request náà gbé credential header kan (`Authorization`, `x-api-key`, `x-goog-api-key`
  tàbí cookie `auth_token`), kì í ṣe lórí èwo nínú wọn ni route náà ṣàyẹ̀wò, a kì í sì
  so ó pọ̀ mọ́ `Access-Control-Allow-Credentials` láéláé; body rẹ̀ jẹ́ error envelope tí
  kò yí padà. Àwọn management route lábẹ́ `/api/v1/` tí `requireManagementAuth()` ń dáàbò
  bò (`/api/v1/management/*`, `/api/v1/registered-keys`) kì í fi echo kún un: pẹ̀lú
  `REQUIRE_API_KEY=false`, a kò lè ka 401/403 wọn láti origin mìíràn.
- **Cookie session (dashboard):** default **fail-closed** ń dáàbò bò ó, àti pé
  `Access-Control-Allow-Credentials` kò sí lórí shared path náà. Má ṣe fi àwọn origin
  management/dashboard sínú config permissive èyíkéyìí; wọ́n gbọ́dọ̀ dúró gẹ́gẹ́ bí
  fail-closed pátápátá.

## Àwọn handshake WebSocket (`/v1/responses`, `/v1/ws`)

Àwọn browser kì í lo CORS fún WebSocket, nítorí náà àwọn WebSocket transport tí ń dá
inference output padà máa ń ṣàyẹ̀wò `Origin` handshake náà fúnra wọn
(`src/server/origin/wsOrigin.ts`): Responses WebSocket (`/v1/responses`) àti, nígbà tí
OmniRoute bá ń ṣiṣẹ́ nípasẹ̀ `npm start` / `npm run dev`, bridge `/v1/ws` àti
`/api/v1/ws`, tí ń stream `/v1/chat/completions`, `/v1/messages` àti
`/v1/responses` gẹ́gẹ́ bí frame. Bridge náà máa ń béèrè ìpinnu lọ́wọ́
`/api/v1/ws?handshake=1`, ó sì máa ń kọ̀ láti upgrade àyàfi tí route yẹn bá ti ṣe àyẹ̀wò
náà. A máa ń gba handshake kan nígbà tí:

- kò ní header `Origin` (Codex CLI, àwọn SDK àti àwọn client mìíràn tí kì í ṣe browser);
- allowlist tó wà lókè gba `Origin` náà láàyè (`CORS_ALLOWED_ORIGINS`, ètò
  `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` náà jẹ́ ọ̀kan lára àwọn public origin ti OmniRoute fúnra rẹ̀ (public base URL
  tí a ṣètò, forwarded origin ti proxy tí a gbẹ́kẹ̀lé, tàbí loopback/LAN host tààrà tí a
  fún gẹ́gẹ́ bí IP literal tàbí `localhost` — àwọn candidate kan náà tí àyẹ̀wò mutation
  ti dashboard ń lò); tàbí
- ó gbé API key tó wúlò, bí ó ti rí lórí ojú HTTP `/v1/*`.

Ohunkóhun mìíràn máa ń gba `403 ws_origin_forbidden`. Session cookie ti dashboard kò
yọ `Origin` àjèjì sílẹ̀, nítorí browser máa ń so ó mọ́ socket ojú-ìwé èyíkéyìí.
A kì í ka `localhost` lórí port mìíràn sí origin kan náà; fi irú àwọn dev origin bẹ́ẹ̀
kún `CORS_ALLOWED_ORIGINS`.

## Àpẹẹrẹ: reverse proxy ní iwájú OmniRoute

OmniRoute fúnra rẹ̀ ló ń fipá mú CORS ṣiṣẹ́, nítorí náà, ní gbogbogbòò, proxy náà kò yẹ kí ó **ṣàfikún** tàbí
tún àwọn header `Access-Control-*` kọ (àwọn header oníbejì máa ń fa ìṣòro fún àwọn browser). Parí TLS
kí o sì forward — jẹ́ kí OmniRoute dá preflight lóhùn:

```nginx
# nginx — forward sí OmniRoute; MÁ ṢE fi Access-Control-* síbí
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Pa àwọn header forwarding náà mọ́: proxy kan lórí host kan náà máa ń sopọ̀ láti loopback, àwọn náà sì ni
    # ó ń sọ fún OmniRoute pé olùpè náà kì í ṣe local operator. Proxy tí kò ṣàfikún èyíkéyìí nínú wọn
    # máa ń jẹ́ kí gbogbo olùpè jíjìn dà bí ẹni pé wọ́n jẹ́ local. Má ṣe ṣètò X-Forwarded-For sí 127.0.0.1 pẹ̀lú.
}
```

Ṣètò àwọn origin browser tí a gbà láàyè nínú OmniRoute (`CORS_ALLOWED_ORIGINS` tàbí
taabu Security), kì í ṣe nínú proxy.

## Àwọn fáìlì orísun

| Ohun tó kan                                 | Fáìlì                                                                |
| ------------------------------------------- | -------------------------------------------------------------------- |
| Ìpinnu allowlist + `getCorsStatus()`        | `src/server/cors/origins.ts`                                         |
| Ìmúlò middleware (orísun òtítọ́ kan ṣoṣo)    | `src/server/authz/pipeline.ts`                                       |
| Settings → fífi origin sínú runtime         | `src/lib/config/runtimeSettings.ts`                                  |
| Ipò runtime fún dashboard                   | `src/app/api/settings/authz-inventory/route.ts`                      |
| Àsìá ìkìlọ̀ dashboard                        | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Ààyè CORS Allowed Origins                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS Cloud-Agent fún route kọ̀ọ̀kan (ìyàsọ́tọ̀) | `src/lib/cloudAgent/api.ts`                                          |
| Àyẹ̀wò `Origin` handshake WebSocket          | `src/server/origin/wsOrigin.ts`                                      |

## Wo pẹ̀lú

- [Àwọn Ìpele Olùṣọ́ Ọ̀nà](./ROUTE_GUARD_TIERS.md) — ìmúṣẹ loopback fún
  àwọn ọ̀nà tí ó lè ṣe spawn (ìṣàkóso ọ̀tọ̀ kan tí ó sì ń ṣe àfikún).
- [Ìtọ́sọ́nà Ìfúnni-láṣẹ](../architecture/AUTHZ_GUIDE.md) — gbogbo pipeline ìfàṣẹsí.
