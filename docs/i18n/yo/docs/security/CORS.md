# CORS Configuration & Security (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute idari eyi ti **browser origins** le ka awọn idahun orisun-agbelebu lati inu ẹyọkan, akojọ iyọọda aarin. Awọn awoṣe jẹ **kuna-ni pipade nipa aiyipada** : Ko `CORS_ALLOW_ALL=true` orisun ti a gba laaye titi ti o fi yọ ọkan wọle **kii ṣe** ), bawo ni a ṣe le tunto dev vs iṣelọpọ lailewu, ati ikilọ akoko asiko ti dasibodu fihan nigbati kaadi igbẹ ba wa laaye.

**Orisun otitọ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). A lo akojọ iyọọda ni ẹẹkan, ni agbedemeji (`src/server/authz/pipeline.ts`) — fun awọn olutọju ipa-ọna ko ṣeto `Access-Control-Allow-Origin` funrararẹ.

## Bawo ni ipilẹṣẹ kan ṣe yanju

Fun ibeere kọọkan arinware ṣe iṣiro iye `Access-Control-Allow-Origin` ni aṣẹ yii:

1. **`CORS_ALLOW_ALL=true`** (tabi `CORS_ORIGIN=*` julọ) → ṣe iwoyi `Origin` olupe naa pada (tabi `*` nigbati ko si akọsori `Origin` ), pẹlu `Vary: Origin` nitorina awọn caches duro ti o tọ. `applyCorsHeaders()` chokepoint kanna tun ṣe afikun `Vary: Accept-Encoding` si gbogbo idahun 2xx-with-body lori aaye `/v1*`/`/v1beta*` ti o jẹri ti o jẹri (`relaxForTokenAuth`, RFC 9110 §12.5.5, atejade #6737), nitorinaa awọn caches downstream/shared le ṣe iyatọ ti o tọ ni fisinuirindigbindigbin vs awọn iyatọ ti a ko fi sii.
2. Bibẹẹkọ, ibeere `Origin` ti wa ni deede (awọn apoti kekere, titọpa slash ti o yọ kuro) ati pe o baamu si **dapọ allowlist** :
   - env **`CORS_ALLOWED_ORIGINS`** — koma-niya akojọ, ati
   - akoko asiko **`corsOrigins`** eto (Dasibodu → Aabo → _CORS Laaye Origins_), itasi nipasẹ `setRuntimeAllowedOrigins()` lati `src/lib/config/runtimeSettings.ts`.
3. Ko si → ti o baamu **ko si `Access-Control-Allow-Origin` akọsori ti wa ni emitted** . Ẹrọ aṣawakiri naa ṣe idiwọ orisun-agbelebu kika. Eyi ni aiyipada ti a pinnu kuna-pipade.

| Env var                | Itumo                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ti awọn ipilẹṣẹ gangan lati gba laaye (niyanju).                               |
| `CORS_ALLOW_ALL`       | `true`/`1` → ṣe iwoyi eyikeyi ipilẹṣẹ (kaadi egan). Dev nikan.                     |
| `CORS_ORIGIN`          | Ogún. `*` huwa bi `CORS_ALLOW_ALL`; a nikan iye ti wa ni afikun si awọn allowlist. |

## Awoṣe Irokeke — kini `CORS_ALLOW_ALL=true` ṣafihan gaan

Ikilọ OWASP jeneriki ("wildcard CORS = aaye eyikeyi le pe API rẹ") tọ lati mu ni pataki, ṣugbọn ifihan OmniRoute jẹ **dín ju jeneriki nla** , nitori ti ọkan nja imuse o daju:

> **Aaringbungbun `applyCorsHeaders()` ko jade `Access-Control-Allow-Credentials`.** Ẹrọ aṣawakiri kan kii yoo ṣe afihan esi agbekọja _credentialed_ (kuki-ti nso) ayafi ti olupin ba fi `Access-Control-Allow-Credentials: true` ranṣẹ. OmniRoute's pín CORS ona kò ṣe.

Kini iyẹn tumọ si fun dada, paapaa pẹlu `CORS_ALLOW_ALL=true`:

| Dada                                          | Ilana ijẹrisi                | Ipa ti wildcard CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dasibodu / MANAGEMENT `/api/*`                | Igba kukisi                  | Oti ti wa ni iwoyi, ṣugbọn **laisi `Allow-Credentials`** kiri ayelujara **ohun amorindun** awọn credentialed kika. Aaye orisun agbelebu irira **ko le ka** awọn idahun Dasibodu ti o jẹri, ati pe kuki igba ko ṣe afihan.                                                                                                                                                                                                                                            |
| Onibara API `/v1/*`, `/v1beta/*`              | Bearer / `x-api-key` akọsori | Tẹlẹ iyọọda **nipa oniru** (`relaxForTokenAuth`): awọn aṣawakiri ko le so `Authorization`/`x-api-key` ni adaṣe, nitorinaa oju-iwe ikọlu ko le pese bọtini rẹ. Iwoyi isinmi nilo koko-ọrọ ti o jẹri (bọtini API ti a fọwọsi tabi igba dasibodu), kii ṣe akọsori ijẹrisi nikan, ati pe ko pẹlu `Access-Control-Allow-Credentials` rara. Awọn idahun Ailorukọ (`REQUIRE_API_KEY=false`) lo atunto ipilẹṣẹ ipilẹṣẹ, pẹlu ijade-iwọle `CORS_ALLOW_ALL=true` ti o fojuhan. |
| Kika-nikan ti gbogbo eniyan (`/api/health`,…) | Ko si                        | Ti kii ṣe ifarabalẹ; wildcard jẹ laiseniyan.                                                                                                                                                                                                                                                                                                                                                                                                                         |

Nitorina awọn **iyokù** ifihan ti `CORS_ALLOW_ALL=true` wa ni opin si: (a) orisun-agbelebu ti ko ni ẹri **ka** ti data ti a ko ti sọ tẹlẹ, ati (b) jẹ ki CORS**preflight kọja** lori awọn ipa ọna iṣakoso — eyiti o tun nilo auth ti oju-iwe orisun-agbelebu ko le pese. O jẹ **kii ṣe** a igba-hijack tabi eri-ole fekito lori awọn pín CORS ona.

### Iyatọ gidi kan — `/api/v1/agents/`

Awọn ipa-ọna Aṣoju-Awọsanma (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ṣeto wọn **ti ara** Awọn akọle CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ati **ṣe** gbejade `Access-Control-Allow-Origin: <origin>|*` papọ pẹlu `Access-Control-Allow-Credentials: true`. Eleyi jẹ awọn nikan dada ibi ti Oti-iwoyi ati awọn iwe eri ibagbepo, ati awọn ti o jẹ **ominira ti `CORS_ALLOW_ALL`** . Awọn ipa-ọna wọnyi jẹ iṣakoso-ifọwọsi (`requireManagementAuth`); awọn oniṣẹ ti o ṣafihan dasibodu ni pipa-ogun yẹ ki o mọ pe eyi ni aaye kan ti iwe-ẹri orisun-agbelebu ti gba laaye nipasẹ awọn akọle idahun. Titọpa rẹ si atokọ ti o han gbangba jẹ tọpinpin lọtọ lati itọsọna CORS yii.

## Ayẹwo iṣelọpọ

- **Maṣe ṣeto `CORS_ALLOW_ALL=true` ni iṣelọpọ.** Jẹ ki a ko ṣeto.
- Ṣeto kan **fojuhan** Atokọ ipilẹṣẹ — boya env var tabi aaye Aabo-taabu:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ti OmniRoute ba nṣiṣẹ lẹhin aṣoju iyipada / oju eefin (nginx, Caddy, Tunnel Cloudflare, Tailscale), CORS jẹ **kii ṣe** iṣakoso rẹ nikan — oluso ipa ọna loopback tun ṣe aabo awọn ipa-ọna ti o ni agbara (wo [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Maa ko Forge `X-Forwarded-For: 127.0.0.1` to "fix" a 403; ti o tun-ṣii kilasi RCE oluso ipa ọna tilekun.
- Jẹrisi ipo asiko asiko: dasibodu fihan a **jubẹẹlo Amber asia** labẹ Dashboard → Aabo → Iwe-aṣẹ Iwe-aṣẹ nigbakugba ti `CORS_ALLOW_ALL=true` ba wa laaye, ati pe `/api/settings/authz-inventory` da pada awọn irinṣẹ ibojuwo apoowe `cors: { allowAll, allowedOrigins }` le ṣe ibo.

## Irọrun idagbasoke — gba awọn orisun agbegbe kan pato

O ṣọwọn nilo wildcard paapaa ni dev. Gba laaye awọn olupin dev nikan ti o lo:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Awọn ipilẹṣẹ ti baamu ọran-aibikita pẹlu aibikita slash itọpa, nitorinaa `http://localhost:3000` ati `http://localhost:3000/` jẹ deede. CSV kanna ni a le ṣeto ni akoko ṣiṣe ni **Dasibodu → → CORS Laaye Origins** lai a tun.

## Awọn bọtini API vs awọn akoko kuki

- **Oluso / `x-api-key` (awọn `/v1/*` dada itọkasi):** aṣàwákiri kò so awọn wọnyi laifọwọyi. CORS kii ṣe idena ti o nilari nibi — awọn API bọtini ni idena — ti o jẹ idi ti awọn dada ni imomose permissive ki browser ati Electron awọn onibara le ka awọn idahun ti wọn ti ni ẹtọ tẹlẹ. Iwoyi ti o ni ihuwasi nilo koko-ọrọ ti o jẹri (ifọwọsi API bọtini tabi igba dasibodu), kii ṣe akọsori ijẹrisi nikan, ati pe ko pẹlu `Access-Control-Allow-Credentials`. Awọn idahun alailorukọ (`REQUIRE_API_KEY=false`) lo akojọ idasilẹ orisun atunto, pẹlu ohun ti ko boju mu `CORS_ALLOW_ALL=true` jáde. Awọn ijusile (401) duro ni kika ki awọn alabara le ṣe afihan bọtini ti a fagile tabi ti ko tọ (#5242): opo gigun ti ara 401 ntọju iwoyi, ati ipa-ọna ti o kọ bọtini funrararẹ lẹhin opo gigun ti epo yoo ṣiṣẹ bi ailorukọ (`/v1/models` ati `/v1beta/models` pẹlu isakoso auth ni tunto, awọn eni-scoped `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` ati awọn ipa ọna oludije konbo auto) ṣe afikun iwoyi si 401 yẹn nipasẹ `credentialRejectionHeaders()`. Iwoyi jẹ bọtini lori ibeere ti o gbe akọsori iwe-ẹri (`Authorization`, `x-api-key`, `x-goog-api-key` tabi awọn `auth_token` kuki), kii ṣe lori ewo ninu wọn ni ipa ọna ti a ṣayẹwo, ati pe ko ni so pọ pẹlu `Access-Control-Allow-Credentials`; ara jẹ apoowe aṣiṣe ti o wa titi. Awọn ọna iṣakoso labẹ `/api/v1/` oluso nipa `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ma ṣe lo yi ẹrí-ijusile: pẹlu `REQUIRE_API_KEY=false`, wọn 401/403 awọn idahun tẹle atunto CORS ipilẹṣẹ eto imulo.
- **Igba kuki (dasibodu):** ni aabo nipasẹ awọn kuna-pipade aiyipada **ati** nipa isansa ti `Access-Control-Allow-Credentials` lori ọna ti o pin. Pa management/dashboard origins jade ti eyikeyi iyọọda konfigi; wọn gbọdọ duro gangan kuna-pipade.

## Imu ọwọ WebSocket (`/v1/responses`, `/v1/ws`)

Awọn ẹrọ aṣawakiri ko lo CORS si WebSocket, nitorinaa awọn gbigbe WebSocket ti o pada abajade inference ṣayẹwo ọwọ ọwọ `Origin` funrara wọn (`src/server/origin/wsOrigin.ts`): Awọn idahun WebSocket (`/v1/responses`) ati, nigbati OmniRoute gbalaye nipasẹ `npm start` / `npm run dev`, `/v1/ws` ati `/api/v1/ws` Afara, eyiti o san `/v1/chat/completions`, fireemu `/v1/messages` ati `/v1/responses`. Afara naa beere `/api/v1/ws?handshake=1` fun idajọ ati kọ lati ṣe igbesoke ayafi ti ipa-ọna naa ba ṣayẹwo. Awọn ibeere ijẹrisi ṣi waye lọtọ. Ayẹwo ipilẹṣẹ n kọja nigbati:

- ko ni akọsori `Origin` (Codex CLI, SDKs ati awọn alabara miiran ti kii ṣe lilọ kiri ayelujara);
- `Origin` ti gba wọle nipasẹ awọn allowlist loke (`CORS_ALLOWED_ORIGINS`, awọn `corsOrigins` eto, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` jẹ ọkan ninu awọn orisun gbangba ti OmniRoute ti ara ẹni (tunto ipilẹ gbangba URL, orisun ti o ti firanṣẹ aṣoju ti o ni igbẹkẹle, tabi agbalejo loopback/LAN taara ti a fun gẹgẹbi IP gangan tabi `localhost` — awọn oludije kanna ni ayẹwo iyipada dasibodu ti nlo); tabi
- o gbe bọtini API ti o wulo, bi lori dada HTTP `/v1/*`.

Ohunkohun miiran n gba `403 ws_origin_forbidden`. Kuki igba dasibodu kan ko yọkuro `Origin` ajeji, nitori ẹrọ aṣawakiri naa so mọ iho oju-iwe eyikeyi. `localhost` lori miiran ibudo ti wa ni ko mu bi kanna-Oti; ṣafikun iru awọn ipilẹṣẹ dev si `CORS_ALLOWED_ORIGINS`.

## Apẹẹrẹ: yiyipada aṣoju iwaju OmniRoute

CORS ti fi agbara mu nipasẹ OmniRoute funrararẹ, nitorinaa aṣoju gbogbogbo yẹ **kii ṣe** ṣafikun tabi tunkọ awọn akọle `Access-Control-*` (awọn akọle meji fifọ awọn aṣawakiri). Pari TLS ati siwaju — jẹ ki OmniRoute dahun iṣaju iṣaaju:

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

Ṣeto awọn orisun aṣawakiri ti a gba laaye ni OmniRoute (`CORS_ALLOWED_ORIGINS` tabi taabu Aabo), kii ṣe ni aṣoju.

## Awọn faili orisun

| Ifarabalẹ                              | Faili                                                                |
| -------------------------------------- | -------------------------------------------------------------------- |
| Allowlist ipinnu + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| Ohun elo Middleware (orisun otitọ kan) | `src/server/authz/pipeline.ts`                                       |
| Eto → asiko isise abẹrẹ                | `src/lib/config/runtimeSettings.ts`                                  |
| Ipo asiko isise fun dasibodu naa       | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dasibodu ìkìlọ asia                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Aaye Awọn orisun ti a gba laaye CORS   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Aṣoju awọsanma fun ọna CORS (iyasoto)  | `src/lib/cloudAgent/api.ts`                                          |
| Ṣayẹwo ọwọ ọwọ WebSocket `Origin`      | `src/server/origin/wsOrigin.ts`                                      |

## Wo tun

- [Ipa ọna oluso Tiers](./ROUTE_GUARD_TIERS.md) — imuduro loopback fun awọn ipa-ọna ti o ni agbara (iyatọ, iṣakoso ibaramu).
- [Itọsọna aṣẹ](../architecture/AUTHZ_GUIDE.md) — opo gigun ti epo ni kikun.
