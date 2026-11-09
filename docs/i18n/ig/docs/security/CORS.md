# CORS Configuration & Security (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute na-achịkwa nke **mmalite nchọgharị** nwere ike gụọ nzaghachi ndị sitere na otu ndepụta ikike nke etiti. Ihe nlereanya bụ **ada-emechi na ndabara** : ọnweghị ebe a na-anabata ruo mgbe ị ga-ahọrọ otu n'ime ibe a. Ibe a na-edepụta ka listi ohere si ekpebi, ihe `CORS_ALLOW_ALL=true` na-ekpughe n'ezie (yana, nke kachasị, ihe ọ na-eme.**ọ bụghị** ), otu esi ahazi dev vs mmepụta n'enweghị nsogbu, yana ịdọ aka ná ntị nke oge ịgba ọsọ na dashboard na-egosi mgbe kaadị anụ ọhịa dị ndụ.

**Isi mmalite nke eziokwu:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). A na-etinye ndepụta ikike otu ugboro, na etiti (`src/server/authz/pipeline.ts`) — ndị na-ahụ maka ụzọ ọ bụla anaghị edobe `Access-Control-Allow-Origin` n'onwe ha.

## Otu esi edozi isi mmalite

Maka arịrịọ ọ bụla, middleware na-agbakọ uru `Access-Control-Allow-Origin` n'usoro a:

1. **`CORS_ALLOW_ALL=true`** (ma ọ bụ ihe nketa `CORS_ORIGIN=*`) → na-ekwughachi `Origin` onye na-akpọ oku azụ (ma ọ bụ `*` mgbe enweghị nkụnye eji isi mee `Origin` ), yana `Vary: Origin` ya mere cache ga-adị mma. Otu `applyCorsHeaders()` chokepoint na-agbakwunyere `Vary: Accept-Encoding` na nzaghachi 2xx ọ bụla na elu `/v1*`/`/v1beta*` token-authenticated (`relaxForTokenAuth`, RFC 9110 §12.5.5, mbipụta #6737), yabụ caches downstream/shared nwere ike ịmata ọdịiche dị iche iche abịakọrọ vs uncompressed variants.
2. Ma ọ bụghị ya, a na-ahazi arịrịọ `Origin` (nke dị ala, slash ewepụghị) ma kwekọọ na nke ahụ.**ndepụta ikike jikọtara ọnụ** :
   - env **`CORS_ALLOWED_ORIGINS`** Ndepụta nke rịkọm —, na
   - oge ịgba ọsọ **`corsOrigins`** ntọala (Dashboard → Security → _CORS Allowed Origins_), agbanyere site na `setRuntimeAllowedOrigins()` sitere na `src/lib/config/runtimeSettings.ts`.
3. Ọ nweghị egwuregwu →**enweghị nkụnye eji isi mee `Access-Control-Allow-Origin` ewepụtara** . Ihe nchọgharị ahụ na-egbochi ọgụgụ isi mmalite. Nke a bụ ndabara emechiri emechi echere.

| Env var                | Pụtara                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV nke kpọmkwem mmalite inye ohere (atụ aro).                                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → na-ekwughachi mmalite ọ bụla (kaadị ọhịa). naanị Dev.                          |
| `CORS_ORIGIN`          | Ihe nketa. `*` na-akpa àgwà dị ka `CORS_ALLOW_ALL`; A na-agbakwunye otu uru na listi ohere. |

## Ihe atụ egwu — ihe `CORS_ALLOW_ALL=true` na-ekpughe n'ezie

Ịdọ aka ná ntị OWASP ọnyà ("wildcard CORS = saịtị ọ bụla nwere ike ịkpọ API gị") bara uru iji kpọrọ ihe, mana ikpughe OmniRoute bụ.**dị warara karịa ikpe izugbe** , n'ihi otu eziokwu mmejuputa atumatu:

> **`applyCorsHeaders()` etiti anaghị ewepụta `Access-Control-Allow-Credentials`.** Ihe nchọgharị agaghị ekpughe nzaghachi obe nke _credentialed_ (kuki-bearing) ma ọ bụrụ na ihe nkesa ezipụ `Access-Control-Allow-Credentials: true`. Ụzọ CORS kekọrịtara OmniRoute anaghị eme.

Ihe nke ahụ pụtara kwa elu, ọbụlagodi na `CORS_ALLOW_ALL=true`:

| Elu                                | Usoro nyocha                            | Mmetụta nke wildcard CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`    | Oge kuki                                | A na-ekwughachi mmalite, mana **na-enweghị `Allow-Credentials`** ihe nchọgharị **ihe mgbochi** na nzere agụ. Ebe sitere n'ofe obi ọjọọ **enweghị ike ịgụ ihe** nzaghachi dashboard gị ezitere na ekpughere kuki nnọkọ ahụ.                                                                                                                                                                                                                                                                                  |
| Onye ahịa API `/v1/*`, `/v1beta/*` | Bearer / `x-api-key` nkụnye eji isi mee | Ugbua ekwe **site imewe** (`relaxForTokenAuth`): ihe nchọgharị anaghị ejikọta `Authorization`/`x-api-key` na akpaghị aka, yabụ ibe onye mwakpo enweghị ike ịnye igodo gị. Nkwughachi ahụ dị jụụ chọrọ isiokwu akwadoro ( igodo API ma ọ bụ nnọkọ dashboard akwadoro), ọ bụghị naanị nkụnye eji isi mee nzere, ọ dịghịkwa agụnye `Access-Control-Allow-Credentials`. Ọzịza ndị na-amaghị aha (`REQUIRE_API_KEY=false`) na-eji ndepụta ikike mmalite ahaziri, gụnyere nbanye `CORS_ALLOW_ALL=true` doro anya. |
| Naanị ọgụgụ ọha (`/api/health`,…)  | Ọ dịghị                                 | Na-enweghị mmetụta; akara ngosi adịghị njọ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Yabụ na **fọdụrụnụ** mkpughe nke `CORS_ALLOW_ALL=true` nwere oke na: (a) obe-esighị n'aka **na-agụ** nke data emebeghị nke ọma, na (b) ịhapụ CORS**ngafe ụgbọ elu** na ụzọ njikwa — nke ka na-achọ auth na ibe obe-enweghị ike ịnye. Ọ bụ **ọ bụghị** a nnọkọ-hijack ma ọ bụ nzere-ohi vector na-ekekọrịtara ụzọ CORS.

### Otu ezi ewepụrụ — `/api/v1/agents/`

Ụzọ Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) setịpụrụ ha **nke onwe** CORS nkụnye eji isi mee (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) na **mee** emeputa `Access-Control-Allow-Origin: <origin>|*` yana `Access-Control-Allow-Credentials: true`. Nke a bụ otu elu ebe mmalite-echo na nzere na-ebikọ ọnụ, ọ dịkwa **n'adabereghị na `CORS_ALLOW_ALL`** . Ụzọ ndị a bụ njikwa-nke kwadoro (`requireManagementAuth`); ndị na-arụ ọrụ na-ekpughere dashboard na-anọghị n'ụlọ kwesịrị ịma na nke a bụ ebe ndị isi nzaghachi na-ekwe ka agụ akwụkwọ nzere sitere na mmalite. A na-enyocha ikechi ya na listi ikike doro anya na ntụzịaka CORS a.

## Ndepụta mmepụta ihe

- **Ọ dịghị mgbe ịtọ `CORS_ALLOW_ALL=true` na mmepụta.** Hapụ ya na ịtọghị ya.
- Tọọ otu **doro anya** ndepụta mmalite — ma env var ma ọ bụ ogige nchekwa-taabụ:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Ọ bụrụ na OmniRoute na-agba ọsọ n'azụ proxy / ọwara (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS bụ **ọ bụghị** Naanị njikwa gị — onye nche ụzọ azụ azụ ka na-echekwa ụzọ ndị nwere ike ime (lee [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Emela `X-Forwarded-For: 127.0.0.1` ka ọ "dozie" a 403; nke meghere klaasị RCE onye nche ụzọ na-emechi.
- Kwenye ọnọdụ oge ojiri gaa: dashboard na-egosi a **ọkọlọtọ amber na-adịgide adịgide** n'okpuru Dashboard → Nche → ikike Ndepụta ikike mgbe ọ bụla `CORS_ALLOW_ALL=true` dị ndụ, na `/api/settings/authz-inventory` na-eweghachite ngwá ọrụ nlekota envelopu `cors: { allowAll, allowedOrigins }` nwere ike ịme ntuli aka.

## Ọdịmma mmepe — na-enye ohere mmalite mpaghara

Ị adịkarịghị mkpa kaadị egwu ọbụlagodi na dev. Hapụ naanị sava dev ị na-eji:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Dakọtara mmalite ya na ikpe-enweghị mmetụta na slash a na-eleghara anya, yabụ `http://localhost:3000` na `http://localhost:3000/` bụ otu. Enwere ike ịtọ otu CSV ahụ n'oge ọsọ ọsọ **Dashboard → → CORS anabatara mmalite** na-enweghị Malitegharịa ekwentị.

## Igodo API vs nnọkọ kuki

- **Onye na-ebu / `x-api-key` (elu ọnụ ọgụgụ `/v1/*` ):** ihe nchọgharị anaghị ejikọta ndị a na-akpaghị aka. CORS abụghị ihe mgbochi bara uru ebe a — igodo API bụ ihe mgbochi — nke mere na elu ahụ na-ama ụma na-ekwe ka ihe nchọgharị na ndị ahịa Electron nwee ike ịgụ azịza ha nwere ikike. Nkwughachi ahụ dị jụụ chọrọ isiokwu akwadoro ( igodo API ma ọ bụ nnọkọ dashboard akwadoro), ọ bụghị naanị nkụnye eji isi mee nzere, ọ dịghịkwa agụnye `Access-Control-Allow-Credentials`. Ọzịza ndị na-amaghị aha (`REQUIRE_API_KEY=false`) na-eji ndepụta ikike mmalite ahaziri, gụnyere nbanye `CORS_ALLOW_ALL=true` doro anya. Auth rejections (401) nọrọ na-agụ ka ndị ahịa nwee ike wepụta igodo ewepụrụ ma ọ bụ mejọrọ (#5242): pipeline nke 401 na-edobe ụda olu, yana ụzọ na-ajụ igodo ahụ n'onwe ya mgbe pipeline jere ozi dị ka amaghị aha (`/v1/models` na `/v1beta/models` nwere njikwa njikwa ahaziri, onye nwe `/v1/batches` `/v1/files` `/v1/media` na onye nyocha `/v1/session-leases` ụzọ) na-agbakwụnye nkwughachi ahụ na 401 site na `credentialRejectionHeaders()`. A na-eme ka mgbanaka ahụ na arịrịọ na-ebu isi nzere nzere (`Authorization`, `x-api-key`, `x-goog-api-key` ma ọ bụ kuki `auth_token` ), ọ bụghị nke n'ime ha na-enyocha ụzọ, ọ dịghịkwa mgbe ejikọtara ya na `Access-Control-Allow-Credentials`; ahụ bụ envelopu njehie edobere. Ụzọ nchịkwa n'okpuru `/api/v1/` nke `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) na-echekwa adịghị eji nkwenye nkwenye a: na `REQUIRE_API_KEY=false`, nzaghachi 401/403 ha na-agbaso iwu mmalite CORS ahaziri.
- **Oge kuki (dashboard):** ndabara mechiri emechi echekwabara **na** site na enweghị `Access-Control-Allow-Credentials` na ụzọ nkekọrịta. Debe mmalite management/dashboard na nhazi ọ bụla na-enye ohere; ha ga-anọrịrị nke ọma-emechi.

## WebSocket mmakwa aka (`/v1/responses`, `/v1/ws`)

Ihe nchọgharị anaghị etinye CORS na WebSocket, yabụ WebSocket na-ebufe na-eweghachi mmepụta ntinye na-elele aka aka `Origin` n'onwe ha (`src/server/origin/wsOrigin.ts`): Zaghachi WebSocket (`/v1/responses`) na, mgbe OmniRoute na-agafe `npm start` / `npm run dev`, `/v1/ws` na `/api/v1/ws` àkwà mmiri, nke iyi `/v1/chat/completions`, `/v1/messages` dị ka etiti na `/v1/responses`. Àkwà mmiri ahụ jụrụ `/api/v1/ws?handshake=1` maka mkpebi ahụ wee jụ ịkwalite ọ gwụla ma ụzọ ahụ mere nlele ahụ. Ihe nyocha ka na-emetụta iche. Nyocha mmalite na-agafe mgbe:

- ọ nweghị `Origin` nkụnye eji isi mee (Codex CLI, SDKs na ndị ọzọ na-abụghị ihe nchọgharị ahịa);
- A nabatara `Origin` site na listi ohere n'elu (`CORS_ALLOWED_ORIGINS`, ntọala `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` bụ otu n'ime mmalite ọha nke OmniRoute(ahaziri ọha na eze URL, onye nnọchite anya proxy a tụkwasịrị obi, ma ọ bụ onye ọbịa loopback/LAN kpọmkwem nyere dị ka IP nkịtị ma ọ bụ `localhost` — otu ndị na-aga ime nlele dashboard mutation na-eji); ma ọ bụ
- ọ na-ebu igodo API bara uru, dịka ọ dị na elu HTTP `/v1/*`.

Ihe ọ bụla ọzọ na-enweta `403 ws_origin_forbidden`. Kuki nnọkọ dashboard anaghị ahapụ `Origin` mba ofesi, n'ihi na ihe nchọgharị ahụ na-ejikọta ya na oghere ibe ọ bụla. `localhost` na ọdụ ụgbọ mmiri ọzọ adịghị emeso ya dị ka otu-si; tinye ụdị dev sitere na `CORS_ALLOWED_ORIGINS`.

## Ọmụmaatụ: tụgharịa proxy n'ihu OmniRoute

CORS na-amanye OmniRoute n'onwe ya, yabụ proxy n'ozuzu kwesịrị **ọ bụghị** tinye ma ọ bụ degharịa `Access-Control-*` nkụnye eji isi mee (abụọ nkụnye eji isi mee agbaji nchọgharị). Kwụsị TLS wee bugharịa — ka OmniRoute zaa mbugharị ụgbọ elu:

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

Tọọ mmalite ihe nchọgharị ekwenyere na OmniRoute (`CORS_ALLOWED_ORIGINS` ma ọ bụ taabụ nchekwa), ọ bụghị na proxy.

## Isi mmalite faịlụ

| Nchegbu                                       | Faịlụ                                                                |
| --------------------------------------------- | -------------------------------------------------------------------- |
| Mkpebi ndepụta inye ohere + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Ngwa Middleware (otu isi iyi nke eziokwu)     | `src/server/authz/pipeline.ts`                                       |
| Ntọala ịgba oge mmalite →                     | `src/lib/config/runtimeSettings.ts`                                  |
| Ọkwa ọsọ ọsọ maka dashboard                   | `src/app/api/settings/authz-inventory/route.ts`                      |
| Ọkọlọtọ ịdọ aka ná ntị dashboard              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Ogige mmalite nke CORS anabatara              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent kwa ụzọ CORS (ewezuga)            | `src/lib/cloudAgent/api.ts`                                          |
| nlele WebSocket `Origin`                      | `src/server/origin/wsOrigin.ts`                                      |

## Hụkwa

- [Ụzọ nchekwa Tiers](./ROUTE_GUARD_TIERS.md) — loopback mmanye maka ụzọ ndị nwere ike ịgbasa (nchịkwa dị iche, njikwa mmekọ).
- [Ntuziaka ikike](../architecture/AUTHZ_GUIDE.md) — pipeline nyocha zuru oke.
