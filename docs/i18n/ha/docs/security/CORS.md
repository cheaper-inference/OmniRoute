# CORS Configuration & Security (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute yana sarrafa wanda **tushen browser** na iya karanta martanin tushen giciye daga jerin izini guda ɗaya. Samfurin shine **gaza-rufe ta tsohuwa** Ba a yarda da asali ba har sai kun shiga ɗaya. Wannan shafin yana rubuta yadda jerin izini ke warwarewa, abin da a zahiri `CORS_ALLOW_ALL=true` ke fallasa (kuma, mahimmanci, abin da yake yi)**ba** ), yadda ake saita dev vs samarwa lafiya, da kuma kashedin lokacin aiki dashboard yana nuna lokacin da kati yana raye.

**Tushen gaskiya:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). Ana amfani da lissafin izinin sau ɗaya, a cikin tsakiyar (`src/server/authz/pipeline.ts`) — masu sarrafa kan hanya ba sa saita `Access-Control-Allow-Origin` da kansu.

## Yadda ake warware asalin

Ga kowane buƙatun tsakiya yana ƙididdige ƙimar `Access-Control-Allow-Origin` a cikin wannan tsari:

1. **`CORS_ALLOW_ALL=true`** (ko gadon `CORS_ORIGIN=*`) → yana sake maimaita `Origin` mai kira baya (ko `*` lokacin da babu taken `Origin` ), tare da `Vary: Origin` don haka caches ya tsaya daidai. `applyCorsHeaders()` guda chokepoint kuma yana haɗa `Vary: Accept-Encoding` ga kowane amsawar 2xx-tare da jiki akan alamar-ingantacciyar `/v1*`/`/v1beta*` surface (`relaxForTokenAuth`, RFC 9110 §12.5.5, fitowar #6737), don haka caches downstream/shared na iya bambanta matsawa daidai da bambance-bambancen da ba a haɗa su ba.
2. In ba haka ba, buƙatun `Origin` an daidaita shi (ƙananan akwati, slash ɗin da aka cire) kuma yayi daidai da **lissafin izini** :
   - env **`CORS_ALLOWED_ORIGINS`** Jerin waƙafi- —, da
   - lokacin gudu **`corsOrigins`** saitin (Dashboard → Tsaro → _CORS An Halatta Tushen_), allura ta hanyar `setRuntimeAllowedOrigins()` daga `src/lib/config/runtimeSettings.ts`.
3. Babu madaidaicin →**ba a fitar da kai `Access-Control-Allow-Origin`** . Mai binciken yana toshe tushen karantawa. Wannan shi ne abin da aka yi niyya ta gaza-rufe.

| Env var                | Ma'ana                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV na ainihin asali don ba da izini (an shawarta).                                 |
| `CORS_ALLOW_ALL`       | `true`/`1` → sun bayyana kowane asali (katin daji). Dev kawai.                      |
| `CORS_ORIGIN`          | Gado. `*` yana aiki kamar `CORS_ALLOW_ALL`; ana ƙara ƙima ɗaya zuwa lissafin izini. |

## Samfurin Barazana — abin da `CORS_ALLOW_ALL=true` ke fallasa da gaske

Gargadin OWASP na gaba ɗaya ("katin daji CORS = kowane rukunin yanar gizon zai iya kiran API ɗin ku") ya cancanci ɗaukar mahimmanci, amma bayyanar OmniRoute shine **kunkuntar fiye da al'amarin** , saboda tabbataccen aiwatarwa guda ɗaya:

> **`applyCorsHeaders()` ta tsakiya ba ta taɓa fitar da `Access-Control-Allow-Credentials`.** Mai bincike ba zai tona asirin _credentialed_ (cookie-bearing) martanin giciye sai dai in sabar ta aika `Access-Control-Allow-Credentials: true`. Hanyar CORS da aka raba ta OmniRoute ba ta taba yin hakan ba.

Abin da wannan ke nufi a kowane wuri, har ma da `CORS_ALLOW_ALL=true`:

| Surface                                | Na'urar tantancewa       | Tasirin katin CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`        | Zaman kuki               | Asalin da aka maimaita, amma **ba tare da `Allow-Credentials`** browser **tubalan** mai karantawa. Wurin tushen giciye mai mugunta **ba zai iya karatu ba** ingantattun martanin dashboard ɗin ku, kuma ba a fallasa kuki ɗin zaman ba.                                                                                                                                                                                                                                                                                               |
| Abokin ciniki API `/v1/*`, `/v1beta/*` | Bearer / `x-api-key` kai | Ya riga ya halatta **ta zane** (`relaxForTokenAuth`): masu bincike ba su taɓa haɗawa da `Authorization`/`x-api-key` kai tsaye ba, don haka shafin maharin ba zai iya ba da maɓallin ku ba. Saƙon annashuwa yana buƙatar ingantaccen jigo (ingantacciyar maɓalli API ko zaman dashboard), ba kawai mahimmin taken ba, kuma baya haɗawa da `Access-Control-Allow-Credentials`. Amsoshin da ba a san su ba (`REQUIRE_API_KEY=false`) suna amfani da tsararriyar lissafin izinin asali, gami da fitowar `CORS_ALLOW_ALL=true` bayyananne. |
| Karatun jama'a kawai (`/api/health`,…) | Babu                     | Mara hankali; kati ba shi da illa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

Don haka **saura** Bayyanar `CORS_ALLOW_ALL=true` yana iyakance zuwa: (a) tushen giciye mara tushe **karanta** na bayanan da ba a san su ba, da (b) barin CORS**shigewar jirgin sama** akan hanyoyin gudanarwa — wanda har yanzu yana buƙatar tabbaci wanda shafin asali ba zai iya bayarwa ba. Yana da **ba** satar zaman-lokaci ko sata-sata vector akan hanyar CORS da aka raba.

### Togiya ɗaya na gaske — `/api/v1/agents/`

Hanyoyin Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) sun saita su **nasa** Kawunan CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) da **yi** fitar da `Access-Control-Allow-Origin: <origin>|*` tare da `Access-Control-Allow-Credentials: true`. Wannan ita ce saman guda ɗaya inda asalin amsa-jita da takaddun shaida suka kasance tare, kuma yana nan **mai zaman kanta daga `CORS_ALLOW_ALL`** . Waɗannan hanyoyi na gudanarwa ne masu inganci (`requireManagementAuth`); ma'aikatan da suka fallasa dashboard a waje ya kamata su sani cewa wannan shine wurin da aka ba da izinin karanta bayanan asalin giciye ta masu kan amsa. Ƙaddamar da shi zuwa ga fiyayyen lissafin izini ana bin sawun daban daga wannan jagorar CORS.

## Jerin abubuwan samarwa

- **Kar a taɓa saita `CORS_ALLOW_ALL=true` cikin samarwa.** Bar shi ba a saita ba.
- Saita wani **bayyane** asalin jerin — ko dai env var ko filin Tsaro-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Idan OmniRoute yana gudana a bayan wakili na baya / rami (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS shine **ba** — ɗin ku kawai mai kula da hanyar dawo da madauki yana kare hanyoyin da za su iya ƙwazo (duba [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Kada ku ƙirƙira `X-Forwarded-For: 127.0.0.1` don "gyara" a 403; wanda ya sake bude ajin RCE mai gadin hanya ya rufe.
- Tabbatar da yanayin lokacin aiki: dashboard yana nuna a **Tutar amber mai tsayi** Karkashin Dashboard → Tsaro → Inventory Izini a duk lokacin da `CORS_ALLOW_ALL=true` ke raye, kuma `/api/settings/authz-inventory` ya dawo da kayan aikin sa ido na ambulan `cors: { allowAll, allowedOrigins }` na iya yin zabe.

## Sauƙaƙan haɓakawa — yana ba da damar takamaiman asalin gida

Ba kasafai kuke buƙatar kati ko da a cikin dev. Bada izinin sabobin dev da kuke amfani da su:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Asalin asali sun dace da yanayin-ba tare da damuwa ba tare da slash da aka yi watsi da su, don haka `http://localhost:3000` da `http://localhost:3000/` sun yi daidai. Za'a iya saita CSV iri ɗaya a lokacin aiki **Dashboard → Tsaro → CORS An Halatta Tushen** ba tare da sake farawa ba.

## Maɓallan API vs zaman kuki

- **Mai ɗaukar nauyi / `x-api-key` (da `/v1/*` fa'ida:** masu bincike ba sa haɗa waɗannan ta atomatik. CORS ba shamaki mai ma'ana ba ne a nan — da API key shine shamaki — wanda shine dalilin da ya sa wannan saman ya halatta da gangan don haka browser da Electron abokan ciniki za su iya karanta martanin da suka cancanci. echo mai annashuwa yana buƙatar ingantaccen jigo (ingantaccen API maɓalli ko zaman dashboard), ba kawai mahimmin rubutun ba, kuma bai haɗa da shi ba `Access-Control-Allow-Credentials`. Amsoshin da ba a san su ba (`REQUIRE_API_KEY=false`) yi amfani da ingantaccen lissafin izini na asali, gami da bayyane `CORS_ALLOW_ALL=true` ficewa. Amincewa da tabbaci (401) ya kasance mai karantawa don abokan ciniki su iya fito da maɓallin sokewa ko kuskuren rubutu (#5242): bututun nasa 401 yana kiyaye amsawa, da kuma hanyar da ta ƙi maɓallin kanta bayan bututun ya yi amfani da shi azaman wanda ba a san shi ba (`/v1/models` kuma `/v1beta/models` tare da ingantaccen auth na gudanarwa, mai ikon sarrafawa `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` da hanyoyin ɗan takara na auto-combo) yana ƙara echo zuwa waccan 401 ta hanyar `credentialRejectionHeaders()`. An yi maɓalli na echo akan buƙatun mai ɗauke da kan sahihan bayanai (`Authorization`, `x-api-key`, `x-goog-api-key` ko kuma `auth_token` cookies), ba a kan wanne daga cikinsu aka duba hanyar ba, kuma ba a taɓa haɗa shi da ita ba `Access-Control-Allow-Credentials`; jiki ne kafaffen ambulan kuskure. Hanyoyin gudanarwa a ƙarƙashin `/api/v1/` mai gadi `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) kar a yi amfani da wannan keɓancewar rashin amincewa: tare da `REQUIRE_API_KEY=false`, su 401/403 martani suna bin tsarin da aka tsara CORS manufar asali.
- **Zaman kuki (dashboard):** ana kiyaye shi ta hanyar da ba a rufe ba **kuma** ta hanyar rashin `Access-Control-Allow-Credentials` akan hanyar da aka raba. Kiyaye tushen management/dashboard daga kowane tsari mai izini; dole ne su kasance a rufe sosai.

## musafaha WebSocket (`/v1/responses`, `/v1/ws`)

Browser ba sa amfani da CORS zuwa WebSocket, don haka WebSocket jigilar da ke dawo da fitarwa suna duba musafiha `Origin` da kansu (`src/server/origin/wsOrigin.ts`): Responses WebSocket (`/v1/responses`) kuma, lokacin da OmniRoute ya bi ta `npm start` / `npm run dev`, `/v1/ws` da `/api/v1/ws` gada, wanda ke gudana `/v1/chat/completions`, `/v1/messages` a matsayin frame da `/v1/responses`. Gadar ta nemi `/api/v1/ws?handshake=1` don yanke hukunci kuma ta ƙi haɓakawa sai dai idan wannan hanyar ta yi rajistan. Har yanzu buƙatun tabbatarwa suna aiki daban. Binciken asalin yana wucewa lokacin da:

- ba shi da taken `Origin` (Codex CLI, SDKs da sauran abokan cinikin da ba masu lilo ba);
- An shigar da `Origin` ta lissafin izinin da ke sama (`CORS_ALLOWED_ORIGINS`, saitin `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` na ɗaya daga cikin tushen jama'a na OmniRoute(wanda aka tsara URL na jama'a, amintaccen wakili na turawa, ko kuma mai masaukin loopback/LAN kai tsaye da aka bayar azaman IP na zahiri ko `localhost` — ƴan takara iri ɗaya da binciken maye gurbin dashboard yayi amfani da shi); ko
- yana ɗaukar maɓalli mai inganci API, kamar akan saman HTTP `/v1/*`.

Duk wani abu yana samun `403 ws_origin_forbidden`. Kuki ɗin zaman dashboard baya keɓance `Origin` na waje, saboda mai binciken yana haɗa shi zuwa soket ɗin kowane shafi. `localhost` akan wani tashar jiragen ruwa ba a bi da shi azaman asali iri ɗaya; ƙara irin waɗannan asalin dev zuwa `CORS_ALLOWED_ORIGINS`.

## Misali: mai juyawa a gaban OmniRoute

CORS tana aiwatar da OmniRoute kanta, don haka wakili gabaɗaya yakamata **ba** ƙara ko sake rubuta rubutun `Access-Control-*` (masu buga bugu biyu suna karya masu bincike). Kashe TLS kuma a tura — bari OmniRoute ta ba da amsar jigon jirgin sama:

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

Saita tushen burauzar da aka yarda a cikin OmniRoute (`CORS_ALLOWED_ORIGINS` ko shafin Tsaro), ba cikin wakili ba.

## Fayilolin tushen

| Damuwa                                               | Fayil                                                                |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Ƙimar lissafin izini + `getCorsStatus()`             | `src/server/cors/origins.ts`                                         |
| Aikace-aikacen Middleware (tushen gaskiya guda ɗaya) | `src/server/authz/pipeline.ts`                                       |
| Saitunan allurar asalin lokacin gudu →               | `src/lib/config/runtimeSettings.ts`                                  |
| Halin lokacin gudu don dashboard                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner ɗin gargaɗin dashboard                        | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Filin Tushen Izinin CORS                             | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent ta hanyar CORS (banda)                   | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket musafiha `Origin` cak                      | `src/server/origin/wsOrigin.ts`                                      |

## Duba kuma

- [Tiers Guard Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — madauki na tilastawa hanyoyin da za su iya ƙwanƙwasa (wani keɓantaccen iko, ƙarin iko).
- [Jagorar izini](../architecture/AUTHZ_GUIDE.md) — cikakken bututun bututu.
