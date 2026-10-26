# Authorization Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **အမှန်တရား၏ရင်းမြစ်:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **နောက်ဆုံးပြင်ဆင်သည့်ရက်စွဲ:** 2026-09-22 — scope namespaces များသည် MCP-SERVER.md ကိုညွှန်ပြသည်။

OmniRoute တွင် API တောင်းဆိုမှုတိုင်းကို ကာကွယ်ပေးသည့် route-aware authorization pipeline တစ်ခုရှိသည်။ အမျိုးအစားခွဲခြားခြင်းသည် **သတ်မှတ်နိုင်သော** နှင့် **ပျက်ကွက်ပါကပိတ်သော** ဖြစ်သည် — အမျိုးအစားခွဲခြား၍မရသော မည်သည့်အရာမဆို `MANAGEMENT` အဖြစ်ဆုံးဖြတ်ပြီး session သို့မဟုတ် management-grade token လိုအပ်သည်။ ဤစာမျက်နှာသည် routes များကို ထိန်းသိမ်းထားသော သို့မဟုတ် endpoing အသစ်များ ဒီဇိုင်းဆွဲသော အင်ဂျင်နီယာများအတွက် မော်ဒယ်ကို ရှင်းပြထားသည်။

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ရင်းမြစ်: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## အထောက်အထားစိစစ်မှု ပုံစံနှစ်မျိုး

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini နှင့် ကိုက်ညီသော client API များနှင့် key တွင် `manage` scope ပါရှိသည့်အခါ management route အချို့အတွက် အသုံးပြုသည်။

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ရှိ `isValidApiKey()` / `extractApiKey()` တို့ဖြင့် စိစစ်ပြီး `src/shared/utils/apiAuth.ts` မှတစ်ဆင့် ပြန်လည် export လုပ်ထားသည်။ Validator သည် `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars များကို အမြဲတမ်းအသုံးပြုနိုင်သော passthrough key များအဖြစ်လည်း လက်ခံသည် (ပြဿနာ #1350)။

### 2. Dashboard Session (auth_token cookie)

Dashboard စာမျက်နှာများနှင့် admin လုပ်ဆောင်ချက်များအတွက် ဖြစ်သည်။

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ကို အတည်ပြုနိုင်ပြီး **နှင့်တစ်ပြိုင်နက်** `authenticated: true` ပါရှိသည့်အခါမှသာ cookie တစ်ခုကို session အဖြစ် သတ်မှတ်သည်
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)။ Cookie ကို အသုံးပြုသူတိုင်း (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) သည် ထို helper မှတစ်ဆင့် ဆောင်ရွက်သည်။
`JWT_SECRET` ဖြင့် လက်မှတ်ရေးထိုးထားသော အခြား JWT များလည်း ရှိသည် — Cursor CLI passthrough သည်
key ကိုင်ဆောင်သူများအတွက် `iss "omniroute" / aud "cursor-cli"` token များကို ထုတ်ပေးသည် — သို့သော် ၎င်းတို့ကို session များအဖြစ် လုံးဝမသတ်မှတ်ပါ
(#13298)။

`src/shared/utils/apiAuth.ts` ရှိ `isDashboardSessionAuthenticated()` ဖြင့် အတည်ပြုသည်။ ရက် 30 သက်တမ်းအတွင်း လက်ကျန်သက်တမ်း 7 ရက်အောက်သာ ရှိတော့သည့်အခါ pipeline သည် JWT ကို အလိုအလျောက် refresh လုပ်သည်။

Minter တိုင်းသည် `mintDashboardSessionToken` မှတစ်ဆင့် ဆောင်ရွက်ပြီး (ထုတ်ပေးချိန် `iat` နှင့် ID `jti` တစ်ခုပါရှိသည်) verifier က setting နှစ်ခုကို စစ်ဆေးသောကြောင့် session တစ်ခုသည် ရက် 30 မပြည့်မီတွင်လည်း အဆုံးသတ်နိုင်သည်။ ပထမတစ်ခုမှာ password ပြောင်းသည့်အခါ သတ်မှတ်ပေးသော `sessionsValidAfter` ဖြစ်ပြီး၊ ထိုအချိန်မတိုင်မီ ထုတ်ပေးထားသည့် session အားလုံးကို အတည်မပြုနိုင်တော့စေသည် (password ပြောင်းခဲ့သည့် browser သည် cookie အသစ်တစ်ခု ရရှိသည်)။ ဒုတိယတစ်ခုမှာ `revokedDashboardSessions` ဖြစ်ပြီး `POST /api/auth/logout` က sign out လုပ်ထားသော session ၏ `jti` ကို ၎င်းထဲသို့ ထည့်သွင်းသည်။ အဟောင်း release တစ်ခုဖြင့် ထုတ်ပေးထားသော session များတွင် မည်သည့် claim မှ မပါရှိဘဲ ပထမဆုံး password ပြောင်းသည့်အချိန်အထိ ဆက်လက်အသုံးပြုနိုင်သည်။ Setting များကို ဖတ်ရှု၍မရပါက session ကို ယုံကြည်စိတ်ချရသည်ဟု မသတ်မှတ်ပါ။

Management route အချို့သည် mode **တစ်မျိုးမျိုး** ကို လက်ခံသည်- cookie သို့မဟုတ် API key တွင် `manage` (သို့မဟုတ် `admin`) scope ပါရှိသည့်အခါ `Bearer <key>` ဖြစ်သည်။ ၎င်းက v3.8 တွင် ထည့်သွင်းခဲ့သော "API call များမှတစ်ဆင့် configure လုပ်နိုင်ခြင်း" workflow ကို အသုံးပြုနိုင်စေသည်။

#### ရွေးချယ်အသုံးပြုနိုင်သော OIDC login gate (#6973)

Dashboard admin login သည် မူလ password login နှင့်အတူ **ရွေးချယ်ဖွင့်နိုင်သော** OIDC (OpenID Connect) flow ကိုလည်း ပံ့ပိုးသည် — password login ကို ဖယ်ရှားခြင်းမရှိဘဲ ဖြည့်စွက်ပံ့ပိုးပေးခြင်းသာ ဖြစ်သည်-

- `settings.oidcEnabled === true` ဖြစ်ပြီး `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` အားလုံးကို စီစဉ်သတ်မှတ်ထားသည့်အခါမှသာ ဖွင့်ထားမည် (Settings → Auth)။
  မဟုတ်ပါက `GET /api/auth/oidc/login` သည် `400` ကို ပြန်ပေးသည်။
- `GET /api/auth/oidc/login` သည် issuer ၏
  `/.well-known/openid-configuration` မှ `authorization_endpoint` ကို ရှာဖွေသည်
  (`<issuer>/authorize` ကို အစားထိုးအဖြစ် အသုံးပြုသည်)၊ ဝင်လာသည့် request မှ redirect URI ကို
  တည်ဆောက်သည် (`x-forwarded-proto` ကို ထည့်သွင်းစဉ်းစားသည်)၊ ထို့နောက် ကျပန်း `state`
  တစ်ခုကို `httpOnly` `oidc_state` cookie ထဲတွင် သိမ်းဆည်းပြီး IdP သို့ redirect လုပ်သည်။
- `GET /api/auth/oidc/callback` သည် `state` ကို အတည်ပြုစစ်ဆေးပြီး authorization
  code ကို လဲလှယ်ကာ issuer ၏ JWKS မှတစ်ဆင့် ID token ၏ signature ကို
  အတည်ပြုစစ်ဆေးသည် (`jose` ၏ `createRemoteJWKSet` ကို အသုံးပြုပြီး JWKS URI တစ်ခုချင်းအလိုက် cache လုပ်ထားသည်)၊
  ထို့ပြင် `issuer`/`audience` စစ်ဆေးမှုများလည်း ပြုလုပ်သည်။ Dashboard ဝင်ရောက်ခွင့်အတွက်
  အလွတ်မဟုတ်သော `oidcAllowedSubjects` စာရင်း၊ `oidcAdmissionClaim` policy သို့မဟုတ်
  နှစ်ခုလုံး လိုအပ်သည်။ Subject စာရင်းသည် `email_verified === true` ဖြစ်သည့်အခါမှသာ
  `sub` သို့မဟုတ် `email` နှင့် ကိုက်ညီစစ်ဆေးသည်။ ရွေးချယ်အသုံးပြုနိုင်သော claim policy တွင်
  dot ဖြင့် ပိုင်းခြားထားသည့် ID-token claim path (ဥပမာ `realm_access.roles`) နှင့်
  လက်ခံမည့် value များ၏ array တစ်ခု ပါဝင်သည်။ ရယူဖြေရှင်းထားသော claim သည်
  လက်ခံမည့် value အနည်းဆုံးတစ်ခု ပါဝင်သည့် string array ဖြစ်ရမည်။
  Policy နှစ်ခုလုံးကို စီစဉ်သတ်မှတ်ထားပါက နှစ်ခုလုံး အောင်မြင်ရမည်။ မရှိသော သို့မဟုတ်
  ပုံစံမမှန်သော claim များကို လုံခြုံရေးအရ ငြင်းပယ်မည်ဖြစ်ပြီး policy တစ်ခုမျှမရှိပါက
  callback သည် login ကို ငြင်းပယ်သည် (`not_configured`)။ ရှိပြီးသား subject-only
  စီစဉ်သတ်မှတ်မှုများသည် ပြောင်းလဲမှုမရှိဘဲ ဆက်လက်အလုပ်လုပ်သည်။
- Keycloak သည် ပုံမှန်အားဖြင့် realm role များကို access token များထဲသို့ ထည့်သွင်းပေးပြီး
  ID token များထဲသို့ မဖြစ်မနေ ထည့်သွင်းပေးခြင်းမဟုတ်ပါ။ Realm role `admin` ကို
  မဖြစ်မနေလိုအပ်စေရန် ဤ client အတွက် `realm_access.roles` ကို ၎င်း၏ **ID token**
  ထဲတွင် ထည့်သွင်းပေးသည့် protocol mapper တစ်ခုကို စီစဉ်သတ်မှတ်ပြီးနောက်
  `oidcAdmissionClaim` ကို `{ "path": "realm_access.roles", "values": ["admin"] }` ဟု သတ်မှတ်ပါ။
  Role တစ်ခုတည်းကိုသာ အခြေခံသော ဝင်ရောက်ခွင့်ကို မဖွင့်မီ ဤ client အတွက် အမှန်တကယ်
  ID-token claim ကို စစ်ဆေးပါ။ Application သည် access-token role များကို မဖတ်ပါ။
  IdP ဘက်မှ token ငြင်းပယ်မှုသည် ဤ application ဘက်မှ စစ်ဆေးမှုကို ဖြည့်စွက်ပေးနိုင်သော်လည်း
  အစားမထိုးနိုင်ပါ။
- အောင်မြင်ပါက password login က ထုတ်ပေးသည့် (`src/app/api/auth/login/route.ts`)
  30 ရက်သက်တမ်းရှိ `auth_token` JWT ကို **လုံးဝတူညီစွာ** ထုတ်ပေးသည်။ ထို့ကြောင့် ကျန်ရှိသော
  dashboard session pipeline (အလိုအလျောက် refresh လုပ်ခြင်း၊ cookie flag များ) သည်
  မပြောင်းလဲပါ — OIDC သည် cookie ကို မည်သို့ထုတ်ပေးသည်ကိုသာ အစားထိုးပြီး cookie က
  မည်သည့်ခွင့်ပြုချက်ပေးသည်ကို မပြောင်းလဲပါ။ IdP role/group များကို ပြောင်းလဲခြင်းသည်
  ရှိပြီးသား OmniRoute session များကို အကျုံးမဝင်တော့အောင် မလုပ်ပါ။ Logout လုပ်ခြင်း၊
  password ပြောင်းလဲခြင်း သို့မဟုတ် session သက်တမ်းကုန်ဆုံးခြင်းကသာ ၎င်းတို့၏
  သက်တမ်းကို ဆက်လက်ထိန်းချုပ်သည်။
- `oidc*` setting တိုင်း (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) သည် `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) ထဲတွင် ပါဝင်သည်။ Request body ထဲတွင်
  management password ကို `currentPassword` အဖြစ် မထည့်ထားပါက `PATCH /api/settings`
  သည် `400 PASSWORD_REQUIRED` ကို ပြန်ပေးသည် (မှားယွင်းပါက `401 PASSWORD_MISMATCH`)။
  `oidcDisablePasswordLogin` သည် password _login_ (`POST /api/auth/login`) ကို ငြင်းပယ်သော်လည်း
  သိမ်းဆည်းထားသည့် password hash ကို ဆက်လက်ထားရှိပြီး re-auth ပြုလုပ်ရာတွင်
  `currentPassword` ကို ၎င်းနှင့် ဆက်လက်စစ်ဆေးသည်။
- `corsOrigins` နှင့် `bruteForceProtection` တို့လည်း `SECURITY_IMPACTING_SETTINGS_KEYS`
  ထဲတွင် ပါဝင်သည်။ ၎င်းတို့ထဲမှ တစ်ခုခုကို လျှော့ပေါ့ခြင်းသည် login ကာကွယ်ရေးကို
  အားနည်းစေသဖြင့် ၎င်းတို့အတွက်လည်း တူညီသော `currentPassword` re-auth လိုအပ်သည်
  (Security tab က ၎င်းကို တောင်းခံသည်)၊ ထို့ပြင် JSON import က ၎င်းတို့ကို ဖယ်ရှားသည်။
- Security-policy key တိုင်း — `SECURITY_IMPACTING_SETTINGS_KEYS` ထဲရှိ entry များ၊
  `oidc*` key တိုင်းနှင့် dashboard session state — သည် `PATCH /api/settings` တွင်
  **operator သီးသန့်** ဖြစ်သည်။ Manage scope ပါသော API key သို့မဟုတ် `oma_` access token သည်
  မှန်ကန်သော `currentPassword` ကို ပေးပို့သည့်တိုင် `403` ဖြင့် ငြင်းပယ်ခံရပြီး
  ထိုငြင်းပယ်မှုကို `reason: OPERATOR_REQUIRED` ဖြင့် `settings.update_failed` အဖြစ် audit မှတ်တမ်းတင်သည်
  (`src/lib/api/operatorCredential.ts` ရှိ `requireOperatorCredential()`)။
  သာမန် setting များ (theme၊ display preference များ) ကို `manage` key
  သို့မဟုတ် `admin` access token ဖြင့် ဆက်လက်ရေးသားပြင်ဆင်နိုင်သည်။ `/api/settings` ကိုယ်တိုင်နှင့်
  `/api/settings/require-login` အပေါ် mutation တိုင်းအတွက်လည်း `admin` access-token scope
  လိုအပ်သည် (`src/server/authz/accessScopes.ts` ရှိ `ADMIN_MUTATION_EXACT_PATHS`၊ exact-path
  ကိုက်ညီမှု)။ `GET` သည် `read` အဖြစ် ဆက်ရှိပြီး အခြား `/api/settings/*` sub-route များ (proxy များ၊
  combo default များ၊ model alias များ၊ compression၊ purge များ…) သည် method မှ ခန့်မှန်းသတ်မှတ်သော
  `write` scope ကို ဆက်လက်အသုံးပြုသည်။
- `POST /api/settings/import-json` သည် ထို re-auth ကို ကျော်သွားသဖြင့် မရေးသားမီ
  `IMPORT_STRIPPED_SETTINGS_KEYS` (တူညီသော file) ထဲရှိ key အားလုံးကို ဖယ်ရှားသည်။ ၎င်းတို့မှာ
  password နှင့် `currentPassword`၊ `SECURITY_IMPACTING_SETTINGS_KEYS` entry အားလုံးနှင့်
  dashboard session state (`sessionsValidAfter`, `revokedDashboardSessions`) တို့ဖြစ်သည်။
  ထို့ကြောင့် အဟောင်း backup တစ်ခုကို import လုပ်ခြင်းဖြင့် password ပြောင်းလဲမှု သို့မဟုတ်
  sign-out လုပ်မှုကြောင့် အဆုံးသတ်ပြီးသား session ကို ပြန်လည်အသက်သွင်းနိုင်မည်မဟုတ်ပါ။

## Route အမျိုးအစားများ

`src/server/authz/types.ts` သည် အမျိုးအစား သုံးမျိုးကို သတ်မှတ်သည်; အမျိုးအစား အတိအကျ သတ်မှတ်၍ မရသော route မှန်သမျှသည် `MANAGEMENT` သို့ ပြန်ကျသည်။

| အမျိုးအစား   | ဖော်ပြချက်                                                                                                                                                       | လိုအပ်သော auth                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `PUBLIC`     | ရှင်းရှင်းလင်းလင်း ဘေးကင်းသော route များ — login၊ logout၊ status၊ init၊ health၊ onboarding bootstrap။                                                            | မလို                                                                |
| `CLIENT_API` | Model ဝန်ဆောင်မှု endpoint များ — `/api/v1/*`၊ `/api/v1beta/*`၊ နှင့် alias များ `/v1/*`၊ `/v1beta/*`၊ `/chat/completions`၊ `/responses`၊ `/models`၊ `/codex/*`။ | ထင်ရှားသော `REQUIRE_API_KEY` feature flag ဖွင့်ထားသောအခါ Bearer key |
| `MANAGEMENT` | Dashboard စာမျက်နှာများ၊ settings၊ provider များ၊ key များ၊ admin နှင့် diagnostics endpoint များ။                                                               | Dashboard session သို့မဟုတ် `manage` scope ပါသော Bearer             |

`MANAGEMENT` လုပ်ဆောင်ချက် အချို့သည် **operator-only** ဖြစ်သည်: `manage` key သာလျှင် မလုံလောက်ပါ။ သိမ်းထားသော credential များကို ထုတ်ယူခြင်း (`GET /api/settings/export-json`၊ `GET /api/db-backups/export`၊ `GET /api/db-backups/exportAll`)၊ လက်ရှိ data အပေါ် backup ကို ပြန်ထည့်ခြင်း (`dryRun=true` အပါအဝင် `POST /api/db-backups/import`၊ id ဖြင့် `POST /api/db-backups` restore၊ `POST /api/settings/import-json`)၊ restore point များကို ဖျက်ခြင်း (`DELETE /api/db-backups` cleanup နှင့် `PATCH /api/db-backups` ကြောင့်ဆိုသော ၎င်းက ထိန်းသိမ်းထားသော retention သည် backup တိုင်းပြီးနောက် အလိုအလျောက် pruning ကို မောင်းနှင်သည်) တို့အတွက် dashboard session၊ local CLI subject သို့မဟုတ် login ပိတ်ထားခြင်း လိုအပ်သည်။ Sync token ထုတ်ခြင်း (`POST /api/sync/tokens`) နှင့် `admin` CLI access token ထုတ်ခြင်း (`POST /api/cli/tokens`) တို့သည် login မုဒ်အားလုံးတွင် dashboard session သို့မဟုတ် local CLI subject လိုအပ်သည်။ မည်သည့် scope ရှိ API key မဆို နှင့် `oma_` access token များသည် operator credential မဟုတ်ပါ: လိုအပ်သည့်အခါတိုင်း `403` ရရှိသည်။ စစ်ဆေးမှုသည် `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) တွင် ရှိသည်။ Login setting များ ပြောင်းခြင်းလည်း operator-only ဖြစ်သည်: `POST /api/settings/require-login` (management password သတ်မှတ်ခြင်း / `requireLogin` ပြောင်းခြင်း) သည် password ရှိပြီးနောက် ထို credential များကိုသာ လက်ခံသည် — ပထမဆုံး run ချိန် bootstrap window (password မရှိသေးချိန်) မပြောင်းလဲပါ — နှင့် dashboard session က password အစားထိုးရန် `currentPassword` ပို့ရမည် (မပါခြင်း သို့မဟုတ် မှားခြင်းဖြစ်ပါက `403`၊ `settings.update_failed` အဖြစ် audit လုပ်သည်)။ Local CLI နှင့် login ပိတ်ထားသော instance တို့သည် recovery လမ်းကြောင်းကို ထိန်းသိမ်းထားပြီး ထို့ကြောင့် `currentPassword` မပါဘဲ password သတ်မှတ်နိုင်သည်၊ အကြောင်းမှာ နှစ်ခုလုံးသည် data directory ပိုင်ဆိုင်သော host ဖြင့် ချိတ်ဆက်ထားသောကြောင့် ဖြစ်သည်။

## လုပ်ငန်းစဉ်

```
ဝင်လာသော request → src/proxy.ts
  → src/server/authz/pipeline.ts ရှိ runAuthzPipeline()
    1. ယုံကြည်ရသော internal header များကို ဖယ်ရှားပါ (x-omniroute-auth-*, x-omniroute-route-class)
    2. request id ကို ထုတ်လုပ်ပြီး classifyRoute() မှတစ်ဆင့် route ကို အမျိုးအစားခွဲပါ
    3. pathname == "/" ဖြစ်ပါက → /dashboard သို့ redirect လုပ်ပါ
    4. draining (graceful shutdown) ဖြစ်နေပြီး /api/* ဖြစ်ပါက → 503
    5. GET မဟုတ်သော /api/* ဖြစ်ပါက → checkBodySize() guard ဖြင့် စစ်ဆေးပါ
    6. OPTIONS ဖြစ်ပါက → CORS preflight 204
    7. options.enforce == false ဖြစ်ပါက → route-class header များနှင့်အတူ တိုက်ရိုက်ဆက်လက်ပေးပို့ပါ
    8. သို့မဟုတ်ပါက: POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} ကို သတ်မှတ် → NextResponse.next()
       - reject → correlation_id ပါဝင်သည့် JSON error (dashboard စာမျက်နှာများ → 302 /login)
```

ယုံကြည်ရသော internal header များ (`src/server/authz/headers.ts` တွင် သတ်မှတ်ထားသည်) ကို အမျိုးအစားမခွဲခြားမီ **ဝင်လာသော request များမှ ဖယ်ရှားသည်** — client များသည် subject တစ်ခုအဖြစ် အယောင်ဆောင်ရန် `x-omniroute-auth-*` ကို ကြိုတင်ဖြည့်သွင်း၍ မရပါ။

### Policy စာချုပ်များ

Route အတန်းအစားတစ်ခုစီတွင် `src/server/authz/policies/` အောက်၌ policy တစ်ခုစီရှိသည်-

- **`publicPolicy`** (`policies/public.ts`) — `allow({ kind: "anonymous", id: "anonymous" })` ကို အမြဲပြန်ပေးသည်။
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer ကို ထုတ်ယူပြီး `validateApiKey()` မှတစ်ဆင့် အတည်ပြုသည်။ သက်ရောက်နေသော `REQUIRE_API_KEY` feature flag ကို ပိတ်ထားသည့်အခါမှသာ anonymous အဖြစ် ဆက်လက်လုပ်ဆောင်သည်။ သက်ရောက်နေသော flag ကို `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) မှတစ်ဆင့် သတ်မှတ်သောကြောင့် Dashboard Feature Flags နှင့် environment variable များသည် `/api/v1/*`၊ `/api/v1beta/*` နှင့် alias များကို တစ်သမတ်တည်း ထိန်းချုပ်သည်။ resolver ချို့ယွင်းမှုများ ဖြစ်ပေါ်ပါက ပိတ်ဆို့ငြင်းပယ်သည်။ Client API route များတွင် dashboard-session request များကို ခွင့်ပြုသည် (`/api/v1/models` အပါအဝင်ဖြစ်ပြီး dashboard model catalog က အသုံးပြုသည်)။
- **`managementPolicy`** (`policies/management.ts`) — dashboard session၊ internal model-sync request များ (`/api/providers/[name]/(sync-models|models)` နှင့် ကိုက်ညီစစ်ဆေးသည်) ကို လက်ခံသည်၊ သို့မဟုတ် `isAuthRequired()` က false ပြန်ပေးပါက လုံးဝကျော်သွားသည်။ Bearer token ပါရှိသော်လည်း မမှန်ကန်ပါက 403 (`AUTH_001`) ကို ပြန်ပေးပြီး၊ မဟုတ်ပါက 401 ကို ပြန်ပေးသည်။ မည်သည့် auth လမ်းခွဲမတိုင်မီတွင်မဆို route-guard အဆင့်များ (LOCAL_ONLY / ALWAYS_PROTECTED) ကိုလည်း မဖြစ်မနေ သက်ရောက်စေသည် — [Route Guard အဆင့်များ](../security/ROUTE_GUARD_TIERS.md) ကို ကြည့်ပါ။ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ရှိ LOCAL_ONLY path များ (လက်ရှိတွင် `/api/mcp/`) ကို Bearer key ၌ `manage` scope ပါရှိပါက non-loopback မှ ဝင်ရောက်အသုံးပြုနိုင်သည်။ အခြား LOCAL_ONLY path အားလုံးသည် scope မည်သို့ပင်ဖြစ်စေ strict-loopback အဖြစ် ဆက်လက်ကန့်သတ်ထားသည်။

အောင်မြင်သော policy တစ်ခုသည် `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ပါဝင်သည့် `AuthSubject` ကို ပြန်ပေးသည်။ Downstream handler များသည် auth logic ကို ထပ်မံလုပ်ဆောင်မည့်အစား `src/server/authz/assertAuth.ts` ရှိ `assertAuth(request, "CLIENT_API")` မှတစ်ဆင့် ၎င်းကို ဖတ်ရှုနိုင်သည်။

## အများသုံး Route များစာရင်း

`src/shared/constants/publicApiRoutes.ts` သည် တိကျစွာ သတ်မှတ်ထားသော allowlist ဖြစ်သည်-

စာရင်းကို **ပုံသဏ္ဌာန်** အလိုက် ခွဲထားပြီး ထိုသို့ခွဲထားခြင်းသည် လုံခြုံရေးအတွက် အရေးကြီးသည် (GHSA-74g9-q8f6-793h)- prefix တစ်ခုကို `startsWith()` ဖြင့် တိုက်စစ်သည့်အတွက် ၎င်း၏ ရှေ့စာလုံးများ တူညီသော အနီးကပ် path အားလုံးနှင့်လည်း ကိုက်ညီသွားသည်။
`/api/usage/om-usage` ကို prefix အဖြစ် သတ်မှတ်ခဲ့ခြင်းကြောင့် `/api/usage/om-usage<anything>` ကို PUBLIC အဖြစ် သတ်မှတ်ခဲ့ပြီး Next က ၎င်းကို
`/api/usage/[connectionId]` သို့ ဖြေရှင်းပေးသည် — ယင်းသည် ကိုယ်ပိုင် auth မရှိသော handler တစ်ခုဖြစ်သည်။

```ts
// စစ်မှန်သော subtree များ။ Entry တိုင်းသည် "/" ဖြင့် အဆုံးသတ်ရမည် (unit test ဖြင့် အတည်ပြုထားသည်)။
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify တွင် CLIENT_API အဖြစ် သတ်မှတ်ပြီး "auth မလိုသော public" အဖြစ် မသတ်မှတ်ပါ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// တစ်ခုချင်း route များကို အတိအကျ တိုက်စစ်သည် (နောက်ဆုံးတွင် slash ပါသည်ဖြစ်စေ၊ မပါသည်ဖြစ်စေ)။
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS origin ကန့်သတ်ချက် လျှော့ပေးမှုကိုပါ ရရှိသော ဖတ်ရှုရန်သက်သက် တစ်ခုချင်း route များ။
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ကန့်သတ်ချက် လျှော့ပေးမှု မပါသော ဖတ်ရှုရန်သက်သက် တစ်ခုချင်း route။
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ဖတ်ရှုရန်သက်သက် route များသည် လုံခြုံသော method များအတွက်သာ public ဖြစ်သည်။ မှတ်ချက်- `classifyRoute()` သည် `/api/v1/*` နှင့် `/api/v1beta/*` တို့ကို PUBLIC fall-through မှ ချန်လှပ်ထားသည် — Bearer key မူဝါဒ ဆက်လက်သက်ရောက်စေရန် ၎င်းတို့ကို အမြဲတမ်း `CLIENT_API` အဖြစ် သတ်မှတ်သည်။

## Route အသစ်တစ်ခု ထည့်သွင်းခြင်း

### ပုံစံ 1 — အများသုံး client API endpoint (Bearer-auth)

`/api/v1/` နှင့် `/api/v1beta/` အောက်ရှိ route များကို `CLIENT_API` အဖြစ် အလိုအလျောက် သတ်မှတ်သည်။ Middleware က Bearer စစ်ဆေးမှုကို မဖြစ်မနေ လုပ်ဆောင်ပေးသောကြောင့် route handler များတွင် ထပ်မံလုပ်ဆောင်ရန် မလိုသော်လည်း အသုံးဝင်ပါက subject ကို ဖတ်နိုင်သည်။

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler ၏ လုပ်ဆောင်ချက်
}
```

### ပုံစံ 2 — စီမံခန့်ခွဲမှု endpoint (session သို့မဟုတ် Bearer + manage)

`src/lib/api/requireManagementAuth.ts` မှ `requireManagementAuth()` ကို အသုံးပြုပါ-

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler ၏ လုပ်ဆောင်ချက်
}
```

`requireManagementAuth()` သည် အောင်မြင်ပါက `null` ကို ပြန်ပေးပြီး မအောင်မြင်ပါက JSON error `Response` ကို ပြန်ပေးသည်-

- 401 `AUTH_001` "Authentication required" — credential လုံးဝမရှိပါ
- 403 — Bearer မမှန်ခြင်း **သို့မဟုတ်** Bearer ပါရှိသော်လည်း key တွင် `manage` / `admin` scope မရှိခြင်း

`hasManageScope(scopes)` သည် `"manage"` သို့မဟုတ် `"admin"` အတွက် true ပြန်ပေးသည်။

### ပုံစံ 3 — အများသုံး allowlist ထဲသို့ ထည့်သွင်းခြင်း

အဆင်ပြေမှုအလိုက် မဟုတ်ဘဲ ပုံသဏ္ဌာန်အလိုက် set ကို ရွေးချယ်ပါ။ Route တစ်ခုတည်းကို `PUBLIC_API_ROUTES_EXACT` ထဲတွင် ထည့်ပါ (သို့မဟုတ် GET-only ဖြစ်ပါက `PUBLIC_READONLY_CORS_API_ROUTES` ထဲတွင် ထည့်ပါ)။ စစ်မှန်သော subtree ကိုသာ `PUBLIC_API_ROUTE_PREFIXES` ထဲတွင် ထည့်ရမည်ဖြစ်ပြီး ၎င်းသည် **`/` ဖြင့် အဆုံးသတ်ရမည်**။ Route တစ်ခုတည်းကို prefix စာရင်းထဲတွင် ထည့်သွင်းခြင်းသည် ၎င်း၏ ရှေ့စာလုံးများ တူညီသော အနီးကပ် path အားလုံးကိုပါ public အဖြစ် ဖွင့်ပေးသွားမည် — နောင်တွင် ထည့်သွင်းမည့် dynamic-segment sibling များလည်း ပါဝင်သည် (GHSA-74g9-q8f6-793h)။ `tests/unit/public-api-routes.test.ts`၊ `tests/unit/authz/public-route-exact-match.test.ts` နှင့် `tests/unit/authz/classify.test.ts` ရှိ unit test များကို အပ်ဒိတ်လုပ်ပါ။

## Scopes များ

namespace သုံးခု။ စစ်ဆေးသူတစ်ဦးစီသည် ၎င်း၏ကိုယ်ပိုင် string များကိုသာ ဖတ်သည်။ `manage` သည် `read:compression` အတွက် `scopeMatches` ကို အဘယ်ကြောင့် မအောင်မြင်သနည်း၊ `read` access token သည် `PATCH /api/keys/{id}` ကို အဘယ်ကြောင့် မလုပ်ဆောင်နိုင်သနည်း အပါအဝင် ဘေးချင်းကပ်လျက် ရှင်းပြချက်ကို [Three scope namespaces](../frameworks/MCP-SERVER.md#three-scope-namespaces) တွင် ကြည့်ပါ။

API key များတွင် `scopes` array တစ်ခု ပါရှိသည် (`api_keys.scopes` တွင် JSON အဖြစ် သိမ်းဆည်းထားသည်၊ `src/lib/db/apiKeys.ts` ကို ကြည့်ပါ)။

### Management scope

- `manage` / `admin` — `hasManageScope`။ management API route များသို့ Bearer access။
- `mcp:connect`, `self:usage`, `self:account-quota`, နှင့်
  `policy:bypass-provider-quota` တို့သည် ထပ်ပေါင်းနိုင်သော တိကျစွာ ကိုက်ညီသည့် scope များဖြစ်သည်။ ၎င်းတို့သည် `MANAGEMENT_API_KEY_SCOPES` ၏ အပြင်ဘက်တွင် ရှိသည်။ `mcp:connect` သည် `/api/mcp/` non-loopback carve-out ကိုသာ ဖွင့်ပေးသည်။

### MCP tool scopes

Catalog နှင့် ကိုက်ညီမှု စည်းမျဉ်းများ (တူညီသော string၊ သို့မဟုတ် `*` ဖြင့် အဆုံးသတ်သော ခွင့်ပြုထားသည့် scope)၊
[MCP tool scopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes)။
`src/shared/constants/mcpScopes.ts` ရှိ `MCP_SCOPE_LIST` သည် မူရင်း typed
subset ဖြစ်ပြီး၊ ထို full catalog မဟုတ်ပါ။ အကောင်အထည်ဖော်မှုသည်
`open-sse/mcp-server/scopeEnforcement.ts` တွင် `resolveCallerScopeContext()`
မှ MCP auth အချက်အလက်၊ request metadata သို့မဟုတ် `OMNIROUTE_MCP_SCOPES` မှ scope များကို ဖြေရှင်းပြီးနောက် လုပ်ဆောင်သည်။
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` မဟုတ်ပါက ၎င်းသည် ပိတ်ထားသည်။

### Access-token scopes

`oma_live_…` token များပေါ်ရှိ `read` / `write` / `admin` ကို `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) ဖြင့် အဆင့်သတ်မှတ်သည်။ ဤအဆင့်သည် access-token
credential အတွက်သာ သက်ဆိုင်သည်။ [Management Authentication](../guides/MANAGEMENT-AUTH.md) ကို ကြည့်ပါ။

## Auth လိုအပ်ချက် ခလုတ်

`src/shared/utils/apiAuth.ts` ရှိ `isAuthRequired()` သည် request တစ်ခုအတွက် **မည်သည့်** auth ကိုမဆို တည်ဆဲ လုပ်ရမလား ဆုံးဖြတ်သည်:

- `settings.requireLogin === false` → auth ကို global အရ ပိတ်ထားသည်၊ ဒါပေမဲ့ always-protected tier ([Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) နှင့် ၎င်းလက်ခံသော credential ကို ထုတ်ပေးသည့် ခေါ်ဆိုမှုများကတော့ login ဖွင့်ထားစဉ်နှင့် တူညီသော credential လိုအပ်သည်: sync token ထုတ်ခြင်း၊ မည်သည့် scope ဖြင့်မဆို CLI access token ထုတ်ခြင်း၊ နှင့် `manage`/`admin` scope ပါသော API key ဖန်တီးခြင်း၊ ထို scope ကို key တစ်ခုသို့ ပေးခြင်း၊ သို့မဟုတ် ထို key ကို regenerate သို့မဟုတ် ပြခြင်း (`src/lib/api/requireManagementAuth.ts` ရှိ `requireCredentialForManagementScopedKey()`)။ Inference-only key များသည် ဖွင့်ထားဆဲ ဖြစ်သည်။
- Password သတ်မှတ်မထားပြီး **နှင့်** `INITIAL_PASSWORD` env var မရှိပါက → bootstrap mode သည် onboarding wizard နှင့် loopback request များကို ခွင့်ပြုသော်လည်း ပြင်ပ network request များသည် credential လိုအပ်ဆဲ ဖြစ်သည်။
- DB error မည်သည့်အချိန်မဆို → fail closed (ဘေးကင်းရေးကို မူလအဖြစ် ထားသည်)။

Client API key enforcement သည် `src/shared/utils/featureFlags.ts` ရှိ `isRequireApiKeyEnabled()` ကို အသုံးပြုသည်၊ တိုက်ရိုက် `process.env.REQUIRE_API_KEY` ကို ဖတ်ခြင်း မဟုတ်ပါ။ ၎င်းသည် deployed instance များအတွက် အရေးကြီးသည်: Dashboard → Feature Flags တွင် `REQUIRE_API_KEY` ကို ပြောင်းခြင်းက DB override ကို သိမ်းပြီး `/v1/*`၊ `/v1beta/*`၊ `/models`၊ `/responses`၊ `/chat/completions`၊ `/codex/*` နှင့် ဤ helper ကို မျှဝေသော အခြား client-API auth စစ်ဆေးမှုများကို ချက်ချင်း သက်ရောက်စေသည်။ Feature flag store ကို ဖတ်၍ မရပါက client API auth သည် fail closed ဖြစ်ပြီး key တစ်ခု လိုအပ်သည်။

## လိုက်ဖက်ညီမှုကို ချိုးဖောက်သော ပြောင်းလဲမှု — v3.8.0

`/api/v1/agents/tasks/*` နှင့် `/api/resilience/model-cooldowns` endpoint များသည် ယခုအခါ **စီမံခန့်ခွဲမှု auth လိုအပ်သည်** (commit `588a0333`)။ ယခင်က `manage` scope မပါသော ပုံမှန် API key ကို ပေးပို့သည့် client များသည် `403` ကို လက်ခံရရှိမည်။ ပြောင်းရွှေ့ရန်- API Keys dashboard တွင် key အား `manage` scope ထည့်ပေးပါ သို့မဟုတ် login ဝင်ထားသော dashboard session ကို အသုံးပြုပါ။

## လုပ်ဆောင်ပုံ ပြောင်းလဲမှု — v3.8.2

`/api/mcp/*` (အဝေးထိန်း MCP server) သည် ပုံမှန်အားဖြင့် LOCAL_ONLY ဖြစ်နေဆဲဖြစ်သော်လည်း `Authorization: Bearer <api-key>` header တွင် `manage` scope ပါဝင်ပါက loopback မဟုတ်သော request များကို ယခု လက်ခံသည်။ ဤခြွင်းချက်ကို `src/server/authz/routeGuard.ts` ရှိ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` မှတစ်ဆင့် path တစ်ခုချင်းစီအလိုက် အတိအလင်း ထိန်းချုပ်ထားသည်။ တူညီသောအဆင့်ရှိ LOCAL_ONLY prefix `/api/cli-tools/runtime/*` သည် မည်သည့် subprocess ကိုမဆို စတင်နိုင်သောကြောင့် ရည်ရွယ်ချက်ရှိရှိ bypass လုပ်၍မရအောင် ထားရှိထားသည်။ Loopback မဟုတ်သော နေရာမှ `/api/mcp/*` သို့ ပေးပို့သည့် anonymous request များသည် `403 LOCAL_ONLY` ကို ဆက်လက် ပြန်ပေးမည်ဖြစ်သည် — LOCAL_ONLY path အသစ်တိုင်းအတွက် ပုံသေမူဝါဒမှာ strict-loopback ဖြစ်နေဆဲဖြစ်သည်။ [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ကို ကြည့်ပါ။

## စမ်းသပ်ခြင်း

- Unit test များ- `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`။
- Public allowlist- `tests/unit/public-api-routes.test.ts`။
- သီးသန့် စမ်းသပ်ရန်- `node --import tsx/esm --test tests/unit/authz/classify.test.ts`။

## အမှားရှာဖွေခြင်း

Pipeline သည် တုံ့ပြန်ချက်များတွင် အောက်ပါတို့ကို အမြဲတမ်း ထည့်သွင်းပေးသည်-

```
x-request-id:               <ဆက်စပ်မှု ID၊ အမှားတုံ့ပြန်ချက်များတွင် ပြန်လည်ဖော်ပြသည်>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

စစ်မှန်ကြောင်းအတည်ပြုထားသော တောင်းဆိုမှုများအတွက် upstream (handler ဘက်ရှိ) တောင်းဆိုမှု header များတွင် အောက်ပါတို့လည်း ပါဝင်သည်-

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<နောက်ဆုံး-4 လုံး> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ချန်လှပ်ထားနိုင်သည်)
x-omniroute-auth-scopes:    ကော်မာဖြင့် ခွဲထားသော စာရင်း
```

Handler များအတွင်း `assertAuth(req, expectedClass)` ကို အသုံးပြုပါ — middleware ကို ကျော်သွားခဲ့ပါက ၎င်းသည် `AUTHZ_NOT_INITIALIZED` ကုဒ်ပါဝင်သော `AuthzAssertionError` ကို throw လုပ်သည် (စမ်းသပ်မှုများတွင် configuration နောက်ပြန်ဆုတ်မှုများကို ဖမ်းမိရန် အသုံးဝင်သည်)။

## ထပ်မံကြည့်ရှုရန်

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpoint တစ်ခုစီအတွက် auth marker
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auth event များအတွက် audit log
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — scope namespace သုံးခုနှင့် MCP tool-scope catalog
- အရင်းအမြစ်: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
