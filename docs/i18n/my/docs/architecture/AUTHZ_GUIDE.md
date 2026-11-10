# Authorization Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **အမှန်တရား၏ရင်းမြစ်:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **နောက်ဆုံးပြင်ဆင်သည့်ရက်စွဲ:** 2026-09-22 — scope namespaces များသည် MCP-SERVER.md ကိုညွှန်ပြသည်။

OmniRoute တွင် API တောင်းဆိုမှုတိုင်းကို ကာကွယ်ပေးသည့် route-aware authorization pipeline တစ်ခုရှိသည်။ အမျိုးအစားခွဲခြားခြင်းသည် **သတ်မှတ်နိုင်သော** နှင့် **ပျက်ကွက်ပါကပိတ်သော** ဖြစ်သည် — အမျိုးအစားခွဲခြား၍မရသော မည်သည့်အရာမဆို `MANAGEMENT` အဖြစ်ဆုံးဖြတ်ပြီး session သို့မဟုတ် management-grade token လိုအပ်သည်။ ဤစာမျက်နှာသည် routes များကို ထိန်းသိမ်းထားသော သို့မဟုတ် endpoing အသစ်များ ဒီဇိုင်းဆွဲသော အင်ဂျင်နီယာများအတွက် မော်ဒယ်ကို ရှင်းပြထားသည်။

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ရင်းမြစ်: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Auth Mode နှစ်မျိုး

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-compatible client APIs နှင့် `manage` scope ရှိသောအခါ management route အချို့အတွက် အသုံးပြုသည်။

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ရှိ `isValidApiKey()` / `extractApiKey()` ဖြင့် အတည်ပြုပြီး `src/shared/utils/apiAuth.ts` မှတစ်ဆင့် ပြန်လည် export ပြုလုပ်ထားသည်။ Validator သည် persistent passthrough key များအဖြစ် `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars များကိုလည်း လက်ခံသည် (issue #1350)။

### 2. Dashboard Session (auth_token cookie)

Dashboard စာမျက်နှာများနှင့် admin operation များအတွက် အသုံးပြုသည်။

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT သည် အောင်မြင်စွာ verify ဖြစ်ပြီး `authenticated: true` ပါဝင်မှသာ cookie ကို session အဖြစ် သတ်မှတ်သည်
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)။ Cookie ကို အသုံးပြုသည့် consumer တိုင်း (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) သည် ထို helper မှတစ်ဆင့် လုပ်ဆောင်သည်။
`JWT_SECRET` ဖြင့် sign ထားသော အခြား JWT များလည်း ရှိသည် — key holder များအတွက် Cursor CLI passthrough က
`iss "omniroute" / aud "cursor-cli"` token များကို ထုတ်ပေးသည် — သို့သော် ၎င်းတို့သည် session များ မဟုတ်ပါ
(#13298)။

`src/shared/utils/apiAuth.ts` ရှိ `isDashboardSessionAuthenticated()` ဖြင့် အတည်ပြုသည်။ ၎င်း၏
30 ရက်သက်တမ်းအတွင်း 7 ရက်အောက်သာ ကျန်ရှိသောအခါ pipeline သည် JWT ကို အလိုအလျောက် refresh ပြုလုပ်သည်။

Session တစ်ခုသည် 30 ရက်မပြည့်မီတွင်လည်း အဆုံးသတ်နိုင်သည်။ အကြောင်းမှာ minter တိုင်းသည်
`mintDashboardSessionToken` မှတစ်ဆင့် (ထုတ်ပေးသည့်အချိန် `iat` နှင့် id `jti` ပါဝင်၍) လုပ်ဆောင်ပြီး
verifier သည် setting နှစ်ခုကို စစ်ဆေးသောကြောင့် ဖြစ်သည်။ ပထမတစ်ခုမှာ password ပြောင်းလဲသည့်အခါ သတ်မှတ်သည့်
`sessionsValidAfter` ဖြစ်ပြီး ၎င်းမတိုင်မီ ထုတ်ပေးထားသော session အားလုံးကို verify မဖြစ်စေတော့ပါ (password ပြောင်းခဲ့သော browser သည် cookie အသစ်ရရှိသည်)။ ဒုတိယတစ်ခုမှာ `POST /api/auth/logout` က sign-out လုပ်ထားသော session ၏ `jti` ကို ထည့်သွင်းသည့် `revokedDashboardSessions` ဖြစ်သည်။ ယခင် release တစ်ခုက ထုတ်ပေးထားသော session များတွင် claim နှစ်ခုစလုံး မပါဝင်သောကြောင့် ပထမဆုံး password ပြောင်းလဲမှု မပြုလုပ်မချင်း valid ဖြစ်နေမည်။ Settings များကို ဖတ်၍မရပါက session ကို ယုံကြည်စိတ်ချရသော session အဖြစ် မသတ်မှတ်ပါ။

Management route အချို့သည် mode နှစ်မျိုးလုံးကို လက်ခံသည် — cookie သို့မဟုတ် API key တွင် `manage` (သို့မဟုတ် `admin`) scope ရှိပါက `Bearer <key>` ကို လက်ခံသည်။ ဤအရာသည် v3.8 တွင် ထည့်သွင်းခဲ့သော "configurable via API calls" workflow ကို အသုံးပြုနိုင်စေသည်။

#### Optional OIDC login gate (#6973)

Dashboard admin login သည် default password login နှင့်အတူ **opt-in** OIDC (OpenID Connect) flow ကိုလည်း
ထောက်ပံ့သည် — password login ကို မည်သည့်အခါမျှ ဖယ်ရှားခြင်းမပြုဘဲ၊ ထပ်မံဖြည့်စွက်ပေးခြင်းသာ ဖြစ်သည်။

- `settings.oidcEnabled === true` **ဖြစ်ပြီး** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` အားလုံးကို သတ်မှတ်ထားမှသာ ဖွင့်ထားမည် (ဆက်တင်များ → အထောက်အထားစစ်ဆေးခြင်း)။
  မဟုတ်ပါက `GET /api/auth/oidc/login` သည် `400` ကို ပြန်ပေးမည်။
- `GET /api/auth/oidc/login` သည် issuer ၏ `/.well-known/openid-configuration` မှ
  `authorization_endpoint` ကို ရှာဖွေမည် (`<issuer>/authorize` သို့ fallback ပြုလုပ်မည်)၊
  ဝင်လာသော request မှ redirect URI ကို (`x-forwarded-proto` ကို ထည့်သွင်းစဉ်းစား၍) တည်ဆောက်မည်၊
  ထို့နောက် random `state` တန်ဖိုးကို `httpOnly` `oidc_state` cookie ထဲတွင် သိမ်းဆည်းကာ
  IdP သို့ redirect ပြုလုပ်မည်။
- `GET /api/auth/oidc/callback` သည် `state` ကို အတည်ပြုခြင်း၊ authorization
  code ကို လဲလှယ်ခြင်းနှင့် issuer ၏ JWKS မှတစ်ဆင့် ID token ၏ signature ကို
  အတည်ပြုခြင်းတို့ကို ပြုလုပ်မည် (`jose` ၏ `createRemoteJWKSet` ကို JWKS URI တစ်ခုစီအလိုက်
  cache ပြုလုပ်ထားမည်)။ ထို့အပြင် `issuer` / `audience` စစ်ဆေးမှုများလည်း ပါဝင်မည်။
  Dashboard သို့ ဝင်ရောက်ခွင့်ရရန် အလွတ်မဟုတ်သော `oidcAllowedSubjects` စာရင်း၊
  `oidcAdmissionClaim` မူဝါဒ သို့မဟုတ် နှစ်ခုစလုံး လိုအပ်သည်။ Subject စာရင်းသည်
  `email_verified === true` ဖြစ်မှသာ `sub` သို့မဟုတ် `email` နှင့် ကိုက်ညီမည်။
  ရွေးချယ်နိုင်သော claim မူဝါဒသည် dot ခြားထားသော ID-token claim လမ်းကြောင်း
  (ဥပမာ `realm_access.roles`) နှင့် လက်ခံနိုင်သောတန်ဖိုးများ၏ array တစ်ခုကို
  လက်ခံမည်။ ဖြေရှင်းရရှိသော claim သည် string များပါဝင်သည့် array ဖြစ်ပြီး
  လက်ခံထားသောတန်ဖိုး အနည်းဆုံးတစ်ခု ပါဝင်ရမည်။ မူဝါဒနှစ်ခုစလုံးကို သတ်မှတ်ထားပါက
  နှစ်ခုစလုံး အောင်မြင်ရမည်။ Claim မရှိခြင်း သို့မဟုတ် ပုံစံမမှန်ခြင်းများတွင်
  လုံခြုံရေးအရ ငြင်းပယ်မည်။ မူဝါဒတစ်ခုမျှ မရှိပါက callback သည် login ကို
  (`not_configured`) ဖြင့် ငြင်းပယ်မည်။ ယခင် subject-only configuration များသည်
  ပြောင်းလဲမှုမရှိဘဲ ဆက်လက်အလုပ်လုပ်မည်။
- Keycloak သည် realm roles များကို ID token များတွင် မဖြစ်မနေထည့်ပေးခြင်းမဟုတ်ဘဲ
  access token များထဲသို့ ပုံမှန်အားဖြင့် map ပြုလုပ်ပေးသည်။ `admin` realm role ကို
  လိုအပ်စေရန် ဤ client အတွက် `realm_access.roles` ကို ၎င်း၏ **ID token** ထဲသို့
  ထည့်ပေးမည့် protocol mapper တစ်ခုကို သတ်မှတ်ပြီး
  `oidcAdmissionClaim` ကို `{ "path": "realm_access.roles", "values": ["admin"] }`
  ဟု သတ်မှတ်ပါ။ role-only admission ကို ဖွင့်မီ ဤ client အတွက် အမှန်တကယ်ရရှိသော
  ID-token claim ကို စစ်ဆေးပါ။ Application သည် access-token roles များကို
  ဖတ်မည်မဟုတ်ပါ။ IdP ဘက်မှ token ငြင်းပယ်ခြင်းသည် ထပ်ဆောင်းကာကွယ်မှုအဖြစ်
  အသုံးပြုနိုင်သော်လည်း ဤ application ဘက်မှ စစ်ဆေးမှုကို အစားထိုး၍ မရပါ။
- အောင်မြင်ပါက password login က ထုတ်ပေးသည့် **အတိအကျတူညီသော** 30 ရက်သက်တမ်းရှိ
  `auth_token` JWT ကို (`src/app/api/auth/login/route.ts`) ထုတ်ပေးမည်ဖြစ်သောကြောင့်
  dashboard session pipeline ၏ ကျန်အစိတ်အပိုင်းများ (အလိုအလျောက် refresh၊ cookie flags)
  မပြောင်းလဲပါ — OIDC သည် cookie ထုတ်ပေးပုံကိုသာ အစားထိုးပြီး ၎င်းက ပေးအပ်သည့်
  အခွင့်အရေးများကို မပြောင်းလဲပါ။ IdP roles/groups များ ပြောင်းလဲခြင်းသည် ရှိပြီးသား
  OmniRoute sessions များကို invalidate ပြုလုပ်မည်မဟုတ်ပါ။ Logout၊ password rotation
  သို့မဟုတ် session expiry တို့ကသာ ၎င်းတို့၏ သက်တမ်းကို ဆုံးဖြတ်မည်။
- `oidc*` ဆက်တင်တိုင်း (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) သည်
  `SECURITY_IMPACTING_SETTINGS_KEYS` ထဲတွင် ပါဝင်သည်
  (`src/shared/constants/securityImpactingSettings.ts`)။ `PATCH /api/settings`
  သည် body ထဲတွင် management password ကို `currentPassword` အဖြစ် မပါရှိပါက
  `400 PASSWORD_REQUIRED` ကို ပြန်ပေးမည် (`currentPassword` မှားယွင်းပါက
  `401 PASSWORD_MISMATCH`)။ `oidcDisablePasswordLogin` သည် password _login_
  (`POST /api/auth/login`) ကို ငြင်းပယ်သော်လည်း သိမ်းဆည်းထားသော password hash ကို
  ဆက်လက်ထားရှိမည်ဖြစ်ပြီး re-auth တွင် `currentPassword` ကို ၎င်းနှင့်
  ဆက်လက်စစ်ဆေးမည်။
- `corsOrigins` နှင့် `bruteForceProtection` တို့လည်း
  `SECURITY_IMPACTING_SETTINGS_KEYS` ထဲတွင် ပါဝင်သည်။ တစ်ခုခုကို ပျော့ပျောင်းစွာ
  သတ်မှတ်ခြင်းသည် login ကာကွယ်မှုများကို အားနည်းစေသောကြောင့် ၎င်းတို့အတွက်လည်း
  တူညီသော `currentPassword` re-auth လိုအပ်မည် (Security tab က ၎င်းကို တောင်းမည်)၊
  JSON import ကလည်း ၎င်းတို့ကို ဖယ်ရှားမည်။
- လုံခြုံရေးမူဝါဒဆိုင်ရာ key တိုင်း — `SECURITY_IMPACTING_SETTINGS_KEYS` ထဲရှိ
  entry များ၊ `oidc*` key တိုင်းနှင့် dashboard session state — သည်
  `PATCH /api/settings` တွင် **operator-only** ဖြစ်သည်။ Manage-scope API key
  သို့မဟုတ် `oma_` access token ကို မှန်ကန်သော `currentPassword` ပါရှိသော်လည်း
  `403` ဖြင့် ငြင်းပယ်မည်။ ထိုငြင်းပယ်မှုကို `settings.update_failed` အဖြစ်
  `reason: OPERATOR_REQUIRED` ဖြင့် audit မှတ်တမ်းတင်မည်
  (`src/lib/api/operatorCredential.ts` ရှိ `requireOperatorCredential()`)။
  ပုံမှန်ဆက်တင်များ (theme၊ display preferences) ကို `manage` key သို့မဟုတ်
  `admin` access token ဖြင့် ဆက်လက်ရေးသားနိုင်မည်။ `/api/settings` ကိုယ်တိုင်၏
  mutation တိုင်း (နှင့် `/api/settings/require-login` ၏ mutation တိုင်း) သည်
  `admin` access-token scope ကိုလည်း လိုအပ်သည်
  (`src/server/authz/accessScopes.ts` ရှိ `ADMIN_MUTATION_EXACT_PATHS`၊
  exact-path ကိုက်ညီမှု)။ `GET` သည် `read` အတိုင်း ဆက်လက်ရှိမည်။ အခြား
  `/api/settings/*` sub-route များ (proxies၊ combo defaults၊ model aliases၊
  compression၊ purges…) သည် method မှ ခန့်မှန်းသတ်မှတ်သော `write` scope ကို
  ဆက်လက်အသုံးပြုမည်။
- `POST /api/settings/import-json` သည် ထို re-auth ကို ကျော်သွားသောကြောင့်
  ရေးသားခြင်းမပြုမီ `IMPORT_STRIPPED_SETTINGS_KEYS` ထဲရှိ key တိုင်းကို
  ဖယ်ရှားမည် (တူညီသော file ထဲတွင် ရှိသည်)။ ၎င်းတွင် password နှင့်
  `currentPassword`၊ `SECURITY_IMPACTING_SETTINGS_KEYS` ထဲရှိ entry တိုင်းနှင့်
  dashboard session state (`sessionsValidAfter`, `revokedDashboardSessions`)
  ပါဝင်သည်။ ထို့ကြောင့် ယခင် backup တစ်ခုကို import ပြုလုပ်ခြင်းဖြင့်
  password ပြောင်းလဲမှု သို့မဟုတ် sign-out ကြောင့် ပြီးဆုံးသွားသော session ကို
  ပြန်လည်အသက်သွင်း၍ မရပါ။

#### ရွေးချယ်နိုင်သော TOTP two-factor login (#16619)

Settings → Security မှ စာရင်းသွင်းနိုင်သည်။ Operator က ၎င်းကို မဖွင့်မချင်း
ပိတ်ထားမည် (`src/server/auth/dashboardMfa.ts`)။

- **အကျုံးဝင်သည့်အရာများ:** စကားဝှက်ဖြင့် လော့ဂ်အင် (`POST /api/auth/login`၊ ထို့နောက်
  `POST /api/auth/mfa/verify` လိုအပ်သည်) နှင့် `omniroute connect` (`POST /api/cli/connect`၊
  စကားဝှက်တစ်ခုတည်းဖြင့် လဲလှယ်မှုကို ငြင်းပယ်ပြီး ကုဒ်ကို `totp` အဖြစ် လက်ခံသည်)။
- **အကျုံးမဝင်သည့်အရာများ:** OIDC / SSO ဖြင့် ဝင်ရောက်ခြင်း (`/api/auth/oidc/callback`) သည်
  OmniRoute TOTP ကို မတောင်းပါ။ ၎င်းသည် identity provider ၏ ကိုယ်ပိုင် ဒုတိယအဆင့်
  အတည်ပြုချက်ကို အားကိုးသောကြောင့် OIDC ဖွင့်ထားပါက IdP တွင် MFA ကို ပြဋ္ဌာန်းပါ။
- **ပြန်လည်ရယူခြင်း** (စက်ပစ္စည်းပျောက်ဆုံးခြင်း၊ ပြန်လည်ရယူရန် ကုဒ်များ မကျန်တော့ခြင်း သို့မဟုတ်
  `STORAGE_ENCRYPTION_KEY` ပြောင်းလဲပြီးနောက်ကဲ့သို့ အတည်ပြု၍ မရတော့သော factor တစ်ခုရှိခြင်း):
  1. `OMNIROUTE_DISABLE_MFA=true` ဖြင့် ဆာဗာကို ပြန်လည်စတင်ပါ။
  2. host ကိုယ်တိုင်တွင် (loopback peer နှင့် loopback `Host` ဖြစ်ပြီး
     `http://localhost:20128` ကဲ့သို့) စကားဝှက်ဖြင့် ဝင်ရောက်ပါ။ ထို origin အတွက်သာ ဒုတိယအဆင့်
     အတည်ပြုချက်ကို ကျော်သွားမည်ဖြစ်ပြီး အခြား origin အားလုံးတွင် ကုဒ် လိုအပ်နေဆဲဖြစ်သည်။
  3. Settings → Security → Disable တွင် စကားဝှက်ကို ထည့်ပြီး ကုဒ်အကွက်ကို ဗလာထားပါ။
     `POST /api/auth/mfa/disable` သည် variable သတ်မှတ်ထားပြီး request သည် host မှ
     လာသောအချိန်တွင်သာ `code` မပါသော body ကို လက်ခံသည်။ ထို့အပြင် dashboard session နှင့်
     လက်ရှိစကားဝှက်ကို လိုအပ်နေဆဲဖြစ်ပြီး `auth.mfa.disabled` အဖြစ်
     `secondFactor: "recovery_switch"` ဖြင့် audit မှတ်တမ်းတင်မည်။
  4. `OMNIROUTE_DISABLE_MFA` ကို unset လုပ်ပြီး ပြန်လည်စတင်ပါ။ လိုအပ်ပါက ထပ်မံ enroll လုပ်ပါ။

## လမ်းကြောင်းသင်တန်းများ

`src/server/authz/types.ts` class သုံးခုကိုသတ်မှတ်သည်။ ခွဲခြား၍မရသော မည်သည့်လမ်းကြောင်းသည် `MANAGEMENT` သို့ ပြန်ရောက်သွားသည် ။

| အတန်း        | ဖော်ပြချက်                                                                                                                                                              | အထောက်အထား လိုအပ်သည်။                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `PUBLIC`     | — အကောင့်ဝင်ခြင်း၊ ထွက်ခြင်း၊ အခြေအနေ၊ ကျန်းမာရေး၊ စတင်အသုံးပြုသည့် bootstrap လမ်းကြောင်းများကို ပြတ်သားစွာ လုံခြုံစွာပြုလုပ်ပါ။                                        | တစ်ခုမှ                                                                         |
| `CLIENT_API` | မော်ဒယ်မှ ဝန်ဆောင်မှုပေးသည့် အဆုံးမှတ်များ — `/api/v1/*`, `/api/v1beta/*`, plus aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | ထိရောက်သော `REQUIRE_API_KEY` အင်္ဂါရပ်အလံကို ဖွင့်ထားသောအခါတွင် ကိုင်ဆောင်သူကီး |
| `MANAGEMENT` | ဒက်ရှ်ဘုတ်စာမျက်နှာများ၊ ဆက်တင်များ၊ ပံ့ပိုးပေးသူများ၊ သော့များ၊ စီမံခန့်ခွဲသူနှင့် အဖြေရှာရေးဆိုင်ရာ အဆုံးမှတ်များ။                                                    | `manage` နယ်ပယ်နှင့်အတူ ဒက်ရှ်ဘုတ်စက်ရှင် OR ထမ်းသမား                           |

`MANAGEMENT` လုပ်ဆောင်ချက် အနည်းငယ်ရှိသည်။** အော်ပရေတာ သီးသန့်** `manage` ကီးတစ်ခု မလုံလောက်ပါ။ သိမ်းဆည်းထားသော အထောက်အထားများ (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`) ၊ တိုက်ရိုက်ဒေတာပေါ်မှ အရန်ကူးယူခြင်း (`POST /api/db-backups/import` အပါအဝင် `dryRun=true`၊ `POST /api/db-backups` ပြန်လည်ရယူခြင်း id ၊ `POST /api/settings/import-json`) ၊ ပြန်လည်ရယူသည့်အချက်များ (`DELETE /api/db-backups` သန့်ရှင်းရေးနှင့် `PATCH /api/db-backups` တို့ကို ဖျက်စီးခြင်း ၊ ၎င်းကို ဆက်လက်ထိန်းသိမ်းထားခြင်းဖြင့် ၎င်းသည် ဆက်လက်တည်ရှိနေသောကြောင့် ၎င်းသည် ဆက်ရှိနေပါက အလိုအလျောက်ဖြတ်တောက်ခြင်းကို တွန်းအားပေးပါသည်။ အရန်သိမ်းထားတိုင်းပြီးနောက် စက်တွင်း သို့မဟုတ် CLI စက်ရှင်ကို ဖြုတ်ထားရန် လိုအပ်ပါသည်)၊ စင့်ခ် တိုကင် (`POST /api/sync/tokens`) ကို ထုတ်ပေးခြင်းနှင့် `admin` CLI ဝင်ရောက်ခွင့် တိုကင် (`POST /api/cli/tokens`) ကို ရေးသွင်းခြင်းသည် လော့ဂ်အင်မုဒ်တိုင်းတွင် ဒက်ရှ်ဘုတ် စက်ရှင် သို့မဟုတ် ဒေသန္တရ CLI အကြောင်းအရာ လိုအပ်ပါသည်။ မည်သည့်နယ်ပယ်၏ API သော့များနှင့် `oma_` ဝင်ရောက်နိုင်သော တိုကင်များသည် အော်ပရေတာအထောက်အထားများမဟုတ်ပါ- လိုအပ်သည့်အခါတိုင်း `403` ရရှိသည်။ ချက်လက်မှတ်သည် `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) တွင် နေထိုင်သည်။ လော့ဂ်အင်ဆက်တင်များကို ပြောင်းလဲခြင်းသည် အော်ပရေတာ-သီးသန့်လည်းဖြစ်သည်- `POST /api/settings/require-login` (စီမံခန့်ခွဲမှုစကားဝှက်ကိုသတ်မှတ်ရန် / `requireLogin` ကိုသတ်မှတ်ခြင်း) စကားဝှက်တစ်ခုရှိသည်နှင့်တစ်ပြိုင်နက် ထိုအထောက်အထားများကိုသာလက်ခံသည် — ပထမဖွင့်စထရက်ပ်ဝင်းဒိုး (စကားဝှက်မရှိသေးပါ) သည် — မပြောင်းလဲဘဲ၊ စကားဝှက်ကိုအစားထိုးရန်အတွက် ဒက်ရှ်ဘုတ်ကဏ္ဍမှ `currentPassword` ပေးပို့ရပါမည် (`403` ) ပျောက်ဆုံးနေပါက သို့မဟုတ် မှားနေသည့်အခါ `settings.update_failed`၊ audit local CLI နှင့် login disabled instance တစ်ခုသည် recovery path ကိုသိမ်းထားပြီး နှစ်ခုလုံးကို data directory ပိုင်ဆိုင်သော host နှင့် ချိတ်ဆက်ထားသောကြောင့် ၎င်းမပါဘဲ စကားဝှက်တစ်ခုသတ်မှတ်နိုင်သည်။

## ပိုက်လိုင်း

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

ယုံကြည်ရသော အတွင်းပိုင်း ခေါင်းစီးများ ( `src/server/authz/headers.ts` တွင် သတ်မှတ်ထားသည်) များဖြစ်သည်။** ဝင်လာသော တောင်းဆိုမှုများမှ ဖယ်ထုတ်ထားသည်။** — အမျိုးအစားခွဲခြင်းမပြုမီ ဖောက်သည်များသည် အကြောင်းအရာတစ်ခုကို အယောင်ဆောင်ရန်အတွက် `x-omniroute-auth-*` ကြိုတင်ဖြည့်သွင်း၍မရပါ။

### မူဝါဒစာချုပ်များ

လမ်းကြောင်း အတန်းတိုင်းတွင် `src/server/authz/policies/` တွင် မူဝါဒတစ်ခု ရှိသည်-

- **`publicPolicy`** (`policies/public.ts`) — အမြဲတမ်း `allow({ kind: "anonymous", id: "anonymous" })` ပြန်ပေးသည်။
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer ကို ထုတ်ယူပြီး `validateApiKey()` မှတဆင့် အတည်ပြုသည်။ ထိရောက်သော `REQUIRE_API_KEY` အင်္ဂါရပ်အလံကို ပိတ်ထားမှသာ အမည်မသိအဖြစ်သို့ ရောက်သွားနိုင်သည်။ ထိရောက်သောအလံကို `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) မှတဆင့်ဖြေရှင်းပြီးဖြစ်သောကြောင့် Dashboard အင်္ဂါရပ်အလံများနှင့် ပတ်ဝန်းကျင်ပြောင်းလဲမှုများသည် `/api/v1/*`၊ `/api/v1beta/*` နှင့် aliases များကို တသမတ်တည်းအုပ်ချုပ်သည်။ ဖြေရှင်းသူ ချို့ယွင်းချက် ပျက်ကွက် ပိတ်ထားသည်။ ကလိုင်းယင့် API လမ်းကြောင်းများပေါ်တွင် ဒက်ရှ်ဘုတ်-ဆက်ရှင်တောင်းဆိုမှုများကို ခွင့်ပြုသည် ( `/api/v1/models` အပါအဝင်၊ ဒက်ရှ်ဘုတ်မော်ဒယ်ကတ်တလောက်က အသုံးပြုသည်)။ Entra ID SSO ဖွင့်သောအခါ၊ ဖွဲ့စည်းတည်ဆောက်ပုံအရ Entra တိုကင် (base64url segments သုံးခု၊ `RS*` alg၊ `kid`) ကို SSO ဌာနခွဲမှ ကိုင်တွယ်သည်** မီ** `validateApiKey()` နှင့် ၎င်း၏ စီရင်ချက်သည် နောက်ဆုံး — ဖြစ်ပြီး ၎င်းသည် API-ကီးလမ်းကြောင်း သို့မဟုတ် အမည်မသိဌာနခွဲသို့ ကျဆင်းသွားခြင်းသို့ ဘယ်သောအခါမှ မကျရောက်ပါ၊ ထို့ကြောင့် အထောက်အထားဝန်ဆောင်မှုပေးသူ ပြတ်တောက်မှုသည် ဖွင့်သုံးခွင့်ဖြစ်လာမည်မဟုတ်ပါ။ Static API ကီးများသည် သက်ရောက်မှုမရှိပါ။ [Entra ID SSO](../security/ENTRA_SSO.md) ကြည့်ပါ။
- **`managementPolicy`** (`policies/management.ts`) — ဒက်ရှ်ဘုတ်ဆက်ရှင်၊ အတွင်းပိုင်း မော်ဒယ်-စင့်ခ်လုပ်ခြင်း တောင်းဆိုချက်များကို လက်ခံသည် ( `/api/providers/[name]/(sync-models|models)` နှင့် ကိုက်ညီသည်) သို့မဟုတ် `isAuthRequired()` မှားယွင်းပါက ပြန်ပို့ပါက လုံးဝကျော်သွားပါသည်။ Bearer တိုကင်တစ်ခုရှိနေသော်လည်း မမှန်ပါက 403 (`AUTH_001`) ကို ပြန်ပေးသည်။ စစ်မှန်သောဌာနခွဲ — [Route Guard Tiers ကို](../security/ROUTE_GUARD_TIERS.md) မတွေ့မီ လမ်းကြောင်းစောင့်အဆင့် (LOCAL_ONLY / ALWAYS_PROTECTED) ကိုလည်း တွန်းအားပေးပါသည်။ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ရှိ LOCAL_ONLY လမ်းကြောင်းများ (ယနေ့- `/api/mcp/`) ကို Bearer သော့သည် `manage` နယ်ပယ်ကို သယ်ဆောင်လာသောအခါတွင် လှည့်ပတ်မဟုတ်သောမှ ဝင်ရောက်ကြည့်ရှုနိုင်သည်။ အခြား LOCAL_ONLY လမ်းကြောင်းများအားလုံးသည် နယ်ပယ်မခွဲခြားဘဲ တင်းကျပ်သော-လှည့်ပတ်နေပါသည်။

အောင်မြင်သောမူဝါဒသည် `AuthSubject` `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ဖြင့် ပြန်ပေးသည်။ အောက်ခြေမှ ကိုင်တွယ်သူများသည် auth logic ကို ပြန်လည်လုပ်ဆောင်မည့်အစား `assertAuth(request, "CLIENT_API")` ရှိ `src/server/authz/assertAuth.ts` မှတစ်ဆင့် ဖတ်နိုင်သည်။

## အများသူငှာ လမ်းကြောင်းများစာရင်း

`src/shared/constants/publicApiRoutes.ts` သည် ထင်ရှားသော ခွင့်ပြုစာရင်းဖြစ်သည်-

စာရင်းကို ခွဲထားသည်။** ပုံသဏ္ဍာန်** ၊ ခွဲခြမ်းသည် load-bearing (GHSA-74g9-q8f6-793h) : ရှေ့ဆက်သည် `startsWith()` နှင့် ကိုက်ညီသည်၊ ထို့ကြောင့် ၎င်းသည် ၎င်း၏ ဦးဆောင်ဇာတ်ကောင်များကို မျှဝေသည့် ကပ်လျက်လမ်းကြောင်းတိုင်းနှင့်လည်း ကိုက်ညီပါသည်။ `/api/usage/om-usage` ၏ရှေ့ဆက်အဖြစ် `/api/usage/om-usage<anything>` PUBLIC အမှတ်အသားပြုထားပြီး၊ ထို့နောက် ၎င်းသည် ၎င်းကို ကိုယ်ပိုင် auth မရှိသော ကိုင်တွယ်သူကို `/api/usage/[connectionId]` — သို့ ဖြေရှင်းသည်။

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Read-only လမ်းကြောင်းများသည် အများသူငှာဖြစ်သည်။** အားလုံးအတွက်** လုံခြုံသောနည်းလမ်းများအတွက်။ မှတ်ချက်- `classifyRoute()` `/api/v1/*` နှင့် `/api/v1beta/*` PUBLIC မှတဆင့် — မှ ဖယ်ထုတ်ထားခြင်းဖြစ်ပြီး ၎င်းတို့သည် အမြဲတမ်း `CLIENT_API` ဖြစ်သောကြောင့် Bearer-key မူဝါဒကို ဆက်လက်ကျင့်သုံးဆဲဖြစ်သည်။

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

## အထောက်အထားပြရန် လိုအပ်သည်

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` ရှိမရှိ ဆုံးဖြတ်သည်။** တစ်ခုခု** တောင်းဆိုချက်တစ်ခုအတွက် auth ကို ပြဌာန်းသည်-

- `settings.requireLogin === false` → auth သည် အမြဲတမ်းကာကွယ်ထားသောအဆင့် ( [Route Guard Tiers ကို](../security/ROUTE_GUARD_TIERS.md) ကြည့်ပါ) နှင့် အကောင့်ဝင်ခြင်းကဲ့သို့တူညီသောအထောက်အထားလိုအပ်သည့် အထောက်အထားတစ်ခုထုတ်ပေးသောခေါ်ဆိုမှုများမှလွဲ၍ တစ်ကမ္ဘာလုံးပိတ်ထားသည်- စင့်ခ်တိုကင်`admin` ထုတ်ပေးခြင်း၊ CLI ဝင်ရောက်ခွင့်တိုကင်များကိုမည်သည့်နယ်ပယ်တွင်မဆိုထည့်သွင်းခြင်းနှင့် API သော့ဖြင့် `manage` ကိုဖန်တီးခြင်း၊ သော့၊ သို့မဟုတ် ထိုသော့ကို ပြန်ထုတ်ခြင်း သို့မဟုတ် ထုတ်ဖော်ခြင်း (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`)။ အနုမာန-သီးသန့်သော့များ ဆက်လက်ဖွင့်ထားသည်။ ကာကွယ်ထားသော အင်္ဂါရပ်အလံ (`REQUIRE_API_KEY`၊ အခြားလုံခြုံရေးအလံများ၊ နှင့် SSRF / TLS / MCP-scope / sandbox အလံများ [အင်္ဂါရပ်အလံ](../reference/FEATURE_FLAGS.md#rest-api) များတွင် ဖော်ပြထားသော အလံများ ) နှင့် PII မျက်နှာဖုံးဆက်တင်များ (`PUT /api/settings/pii`) ကို သိမ်းဆည်းခြင်းသည်လည်း အထောက်အထားတစ်ခု လိုအပ်နေပါသည်။
- စကားဝှက်ကို ပြင်ဆင်သတ်မှတ်ထားခြင်းမရှိပါ။** နှင့်** `INITIAL_PASSWORD` env var → bootstrap မုဒ်သည် onboarding wizard နှင့် loopback တောင်းဆိုမှုများကို ခွင့်ပြုသော်လည်း ထိတွေ့ထားသော ကွန်ရက်တောင်းဆိုမှုများသည် အထောက်အထားများ လိုအပ်နေသေးသည်။ ခြွင်းချက်- ကာကွယ်ထားသော အင်္ဂါရပ်အလံတစ်ခုရေးခြင်းနှင့် PII မျက်နှာဖုံးဆက်တင်များ (`PUT /api/settings/pii`) ကို သိမ်းဆည်းခြင်းသည် loopback မှပင် အထောက်အထားတစ်ခု လိုအပ်သည်၊ ထို့ကြောင့် loopback သူ့ဘာသာသူ မလုံလောက်ပါ။
- မည်သည့် DB error → ပိတ်သည် (secure-by-default)။

Client API key enforcement သည် `isRequireApiKeyEnabled()` `src/shared/utils/featureFlags.ts` တွင်အသုံးပြုသည်၊၊ တိုက်ရိုက် `process.env.REQUIRE_API_KEY` ဖတ်ခြင်းမဟုတ်ပါ။ အသုံးပြုထားသော သာဓကများအတွက် ၎င်းသည် အရေးကြီးသည်- Dashboard → တွင် `REQUIRE_API_KEY` အင်္ဂါရပ်အလံများကို ပြောင်းဖွင့်ခြင်းသည် DB အစားထိုးမှုတစ်ခုကို သိမ်းဆည်းထားပြီး `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, နှင့် ဤအကူအညီကို မျှဝေသော အခြား client-API စစ်မှန်ကြောင်းစစ်ဆေးမှုများကို အကျိုးသက်ရောက်စေသည်။ အင်္ဂါရပ်အလံစတိုးဆိုင်ကို မဖတ်နိုင်ပါက၊ ကလိုင်းယင့် API စစ်မှန်ခြင်းပျက်ကွက်ပြီး သော့တစ်ခု လိုအပ်သည်။

## လိုက်ဖက်ညီမှုကို ချိုးဖောက်သော ပြောင်းလဲမှု — v3.8.0

`/api/v1/agents/tasks/*` နှင့် `/api/resilience/model-cooldowns` endpoint များသည် ယခုအခါ **စီမံခန့်ခွဲမှု auth လိုအပ်သည်** (commit `588a0333`)။ ယခင်က `manage` scope မပါသော ပုံမှန် API key ကို ပေးပို့သည့် client များသည် `403` ကို လက်ခံရရှိမည်။ ပြောင်းရွှေ့ရန်- API Keys dashboard တွင် key အား `manage` scope ထည့်ပေးပါ သို့မဟုတ် login ဝင်ထားသော dashboard session ကို အသုံးပြုပါ။

## လုပ်ဆောင်ပုံ ပြောင်းလဲမှု — v3.8.2

`/api/mcp/*` (အဝေးထိန်း MCP server) သည် ပုံမှန်အားဖြင့် LOCAL_ONLY ဖြစ်နေဆဲဖြစ်သော်လည်း `Authorization: Bearer <api-key>` header တွင် `manage` scope ပါဝင်ပါက loopback မဟုတ်သော request များကို ယခု လက်ခံသည်။ ဤခြွင်းချက်ကို `src/server/authz/routeGuard.ts` ရှိ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` မှတစ်ဆင့် path တစ်ခုချင်းစီအလိုက် အတိအလင်း ထိန်းချုပ်ထားသည်။ တူညီသောအဆင့်ရှိ LOCAL_ONLY prefix `/api/cli-tools/runtime/*` သည် မည်သည့် subprocess ကိုမဆို စတင်နိုင်သောကြောင့် ရည်ရွယ်ချက်ရှိရှိ bypass လုပ်၍မရအောင် ထားရှိထားသည်။ Loopback မဟုတ်သော နေရာမှ `/api/mcp/*` သို့ ပေးပို့သည့် anonymous request များသည် `403 LOCAL_ONLY` ကို ဆက်လက် ပြန်ပေးမည်ဖြစ်သည် — LOCAL_ONLY path အသစ်တိုင်းအတွက် ပုံသေမူဝါဒမှာ strict-loopback ဖြစ်နေဆဲဖြစ်သည်။ [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ကို ကြည့်ပါ။

## စမ်းသပ်ခြင်း

- Unit test များ- `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`။
- Public allowlist- `tests/unit/public-api-routes.test.ts`။
- သီးသန့် စမ်းသပ်ရန်- `node --import tsx/esm --test tests/unit/authz/classify.test.ts`။

## အမှားရှာပြင်ခြင်း။

ပိုက်လိုင်းသည် တုံ့ပြန်မှုများကို အမြဲတမ်း တံဆိပ်တုံးထုသည်-

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

စစ်မှန်ကြောင်းသက်သေပြထားသော တောင်းဆိုမှုများအတွက် အထက်စီးကြောင်း (ကိုင်တွယ်သူဘက်ခြမ်း) တောင်းဆိုချက် ခေါင်းစီးများလည်း ပါဝင်သည်-

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

အလယ်တန်းဆော့ဖ်ဝဲကို ကျော်ဖြတ်သွားပါက ကိုင်တွယ်ကိရိယာများအတွင်း `assertAuth(req, expectedClass)` — `AuthzAssertionError` ကို ကုဒ် `AUTHZ_NOT_INITIALIZED` ဖြင့် ပစ်လွှတ်သည် (စမ်းသပ်မှုများတွင် ဖွဲ့စည်းမှုပုံစံဆုတ်ယုတ်မှုများကို ဖမ်းယူရာတွင် အထောက်အကူဖြစ်စေသည်)။

## ထပ်မံကြည့်ရှုရန်

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — endpoint တစ်ခုစီအတွက် auth marker
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auth event များအတွက် audit log
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — scope namespace သုံးခုနှင့် MCP tool-scope catalog
- အရင်းအမြစ်: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
