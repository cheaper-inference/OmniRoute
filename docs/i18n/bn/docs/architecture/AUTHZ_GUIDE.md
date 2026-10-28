# Authorization Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **সত্যের উৎস:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **সর্বশেষ হালনাগাদ:** 2026-09-22 — স্কোপ নেমস্পেসগুলো MCP-SERVER.md-এর দিকে নির্দেশ করে

OmniRoute-এ একটি রুট-সচেতন অথরাইজেশন পাইপলাইন রয়েছে, যা প্রতিটি API অনুরোধকে নিয়ন্ত্রণ করে। শ্রেণিবিন্যাস **নির্ধারণবাদী** এবং **ব্যর্থ হলে বন্ধ** — শ্রেণিবদ্ধ করা যায় না এমন সবকিছু শেষ পর্যন্ত `MANAGEMENT` হিসেবে গণ্য হয় এবং একটি সেশন বা ম্যানেজমেন্ট-গ্রেড টোকেন দাবি করে। রুট রক্ষণাবেক্ষণকারী বা নতুন এন্ডপয়েন্ট ডিজাইনকারী প্রকৌশলীদের জন্য এই পৃষ্ঠায় মডেলটি ব্যাখ্যা করা হয়েছে।

![AuthZ পাইপলাইন (৩টি রুট শ্রেণি + নীতি মূল্যায়ন)](../diagrams/exported/authz-pipeline.svg)

> উৎস: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## দুটি Auth মোড

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-সামঞ্জস্যপূর্ণ ক্লায়েন্ট API এবং কিছু ম্যানেজমেন্ট রুটের জন্য ব্যবহৃত হয়, যখন কীটির `manage` স্কোপ থাকে।

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`-এর `isValidApiKey()` / `extractApiKey()` দ্বারা যাচাই করা হয় এবং `src/shared/utils/apiAuth.ts`-এর মাধ্যমে পুনরায় এক্সপোর্ট করা হয়। ভ্যালিডেটরটি `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env var-কেও স্থায়ী passthrough কী হিসেবে গ্রহণ করে (ইস্যু #1350)।

### 2. Dashboard Session (auth_token কুকি)

ড্যাশবোর্ড পেজ এবং অ্যাডমিন অপারেশনের জন্য।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

কোনো কুকি তখনই একটি সেশন, যখন JWT যাচাইয়ে উত্তীর্ণ হয় **এবং** এতে `authenticated: true` থাকে
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। কুকিটির প্রতিটি
ব্যবহারকারী (ড্যাশবোর্ড রুট গার্ড (`isDashboardSessionAuthenticated()`), authz পাইপলাইন রিফ্রেশ, WebSocket হ্যান্ডশেক, লাইভ
সার্ভার, `/api/settings/require-login`, `/api/auth/status`) ওই helper-এর মধ্য দিয়ে যায়।
`JWT_SECRET` দিয়ে স্বাক্ষরিত অন্যান্য JWT-ও রয়েছে — Cursor CLI passthrough কীধারীদের জন্য
`iss "omniroute" / aud "cursor-cli"` টোকেন তৈরি করে — এবং সেগুলো কখনোই সেশন নয়
(#13298)।

`src/shared/utils/apiAuth.ts`-এর `isDashboardSessionAuthenticated()` দ্বারা যাচাই করা হয়। JWT-এর ৩০ দিনের মেয়াদের মধ্যে ৭ দিনের কম অবশিষ্ট থাকলে পাইপলাইন স্বয়ংক্রিয়ভাবে সেটি রিফ্রেশ করে।

কোনো সেশন ৩০ দিন পূর্ণ হওয়ার আগেও শেষ হতে পারে, কারণ প্রতিটি টোকেন প্রস্তুতকারক `mintDashboardSessionToken`-এর মধ্য দিয়ে যায় (ইস্যু করার সময় `iat` এবং একটি আইডি `jti`) এবং ভেরিফায়ার দুটি সেটিং পরীক্ষা করে: `sessionsValidAfter`, যা পাসওয়ার্ড পরিবর্তনের সময় সেট করা হয়, ফলে এর আগে ইস্যু করা প্রতিটি সেশন আর যাচাইয়ে উত্তীর্ণ হয় না (যে ব্রাউজার থেকে পাসওয়ার্ড পরিবর্তন করা হয়েছে সেটি একটি নতুন কুকি পায়), এবং `revokedDashboardSessions`, যেখানে `POST /api/auth/logout` সাইন-আউট করা সেশনের `jti` যোগ করে। পুরোনো রিলিজ দিয়ে তৈরি সেশনে এই দাবিগুলোর কোনোটিই থাকে না এবং প্রথম পাসওয়ার্ড পরিবর্তন পর্যন্ত সেগুলো বৈধ থাকে। সেটিংগুলো পড়া না গেলে সেশনটিকে বিশ্বস্ত হিসেবে গণ্য করা হয় না।

কিছু ম্যানেজমেন্ট রুট **যেকোনো একটি** মোড গ্রহণ করে: কুকি অথবা API কীতে `manage` (বা `admin`) স্কোপ থাকলে `Bearer <key>`। এটিই v3.8-এ যোগ করা "API কলের মাধ্যমে কনফিগারযোগ্য" ওয়ার্কফ্লোটি সক্রিয় করে।

#### ঐচ্ছিক OIDC লগইন গেট (#6973)

ড্যাশবোর্ড অ্যাডমিন লগইনটি ডিফল্ট পাসওয়ার্ড লগইনের পাশাপাশি একটি **opt-in** OIDC (OpenID Connect) ফ্লোও সমর্থন করে — পাসওয়ার্ড লগইন কখনোই সরানো হয় না, শুধু এর সঙ্গে অতিরিক্ত বিকল্প যোগ করা হয়:

- `settings.oidcEnabled === true` **এবং** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret`—সবগুলো কনফিগার করা না থাকলে এটি নিষ্ক্রিয় থাকে (Settings → Auth)।
  অন্যথায় `GET /api/auth/oidc/login` থেকে `400` ফেরত আসে।
- `GET /api/auth/oidc/login` ইস্যুয়ারের
  `/.well-known/openid-configuration` থেকে `authorization_endpoint` আবিষ্কার করে (`<issuer>/authorize`-এ
  ফলব্যাক করে), আগত অনুরোধ থেকে রিডাইরেক্ট URI তৈরি করে
  (`x-forwarded-proto`-সচেতন), এবং একটি এলোমেলো `state`-সহ IdP-তে রিডাইরেক্ট করে, যা
  একটি `httpOnly` `oidc_state` কুকিতে সংরক্ষিত থাকে।
- `GET /api/auth/oidc/callback` `state` যাচাই করে, অথরাইজেশন
  কোড বিনিময় করে এবং ইস্যুয়ারের JWKS-এর মাধ্যমে ID টোকেনের স্বাক্ষর যাচাই করে
  (`jose`-এর `createRemoteJWKSet`, প্রতি JWKS URI অনুযায়ী ক্যাশ করা) এবং `issuer`/`audience`
  পরীক্ষা করে। ড্যাশবোর্ডে প্রবেশের জন্য একটি খালি নয় এমন `oidcAllowedSubjects` তালিকা,
  একটি `oidcAdmissionClaim` নীতি অথবা উভয়ই প্রয়োজন। বিষয়ের তালিকা কেবল তখনই `sub` বা
  `email`-এর সঙ্গে মেলে, যখন `email_verified === true`। ঐচ্ছিক ক্লেইম নীতিতে
  ডট দিয়ে পৃথক করা একটি ID-টোকেন ক্লেইম পাথ (যেমন, `realm_access.roles`) এবং
  গৃহীত মানগুলোর একটি অ্যারে থাকে; সমাধান করা ক্লেইমটি অবশ্যই স্ট্রিংয়ের একটি অ্যারে হতে হবে,
  যাতে অন্তত একটি গৃহীত মান রয়েছে। উভয় নীতি কনফিগার করা থাকলে,
  দুটিকেই পাস করতে হবে। অনুপস্থিত/ত্রুটিপূর্ণ ক্লেইমের ক্ষেত্রে নিরাপদভাবে প্রত্যাখ্যান করা হয় এবং কোনো
  নীতি না থাকলে কলব্যাক লগইন প্রত্যাখ্যান করে (`not_configured`)। বিদ্যমান শুধু-বিষয়ভিত্তিক
  কনফিগারেশন অপরিবর্তিতভাবে কাজ করতে থাকে।
- Keycloak সাধারণত realm role-গুলোকে access token-এ ম্যাপ করে, ID
  token-এ থাকা আবশ্যক নয়। realm role `admin` আবশ্যক করতে, এই
  ক্লায়েন্টের জন্য এমন একটি protocol mapper কনফিগার করুন, যা তার **ID token**-এ `realm_access.roles` অন্তর্ভুক্ত করে; এরপর
  `oidcAdmissionClaim`-কে `{ "path": "realm_access.roles", "values": ["admin"] }` হিসেবে সেট করুন।
  শুধু-role-ভিত্তিক প্রবেশ সক্রিয় করার আগে এই ক্লায়েন্টের প্রকৃত ID-token claim
  পরীক্ষা করুন; অ্যাপ্লিকেশনটি access-token role পড়ে না। IdP-পক্ষের token
  প্রত্যাখ্যান এই অ্যাপ্লিকেশন-পক্ষের পরীক্ষার সম্পূরক হতে পারে, তবে এর বিকল্প নয়।
- সফল হলে এটি পাসওয়ার্ড লগইনের ইস্যু করা **হুবহু একই** ৩০ দিনের `auth_token` JWT
  তৈরি করে (`src/app/api/auth/login/route.ts`), তাই ড্যাশবোর্ড সেশন
  পাইপলাইনের বাকি অংশ (স্বয়ংক্রিয় রিফ্রেশ, কুকি ফ্ল্যাগ) অপরিবর্তিত থাকে —
  OIDC শুধু কুকি কীভাবে তৈরি হয় তা প্রতিস্থাপন করে, কুকিটি কী অনুমতি দেয় তা নয়। IdP-র
  role/group পরিবর্তন করলে বিদ্যমান OmniRoute session বাতিল হয় না; logout,
  password rotation অথবা session expiry-ই এখনও সেগুলোর আয়ু নিয়ন্ত্রণ করে।
- প্রতিটি `oidc*` সেটিং (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`-এ রয়েছে
  (`src/shared/constants/securityImpactingSettings.ts`): বডিতে ব্যবস্থাপনা
  পাসওয়ার্ডটি `currentPassword` হিসেবে না থাকলে `PATCH /api/settings`
  `400 PASSWORD_REQUIRED` ফেরত দেয় (ভুল হলে `401 PASSWORD_MISMATCH`)।
  `oidcDisablePasswordLogin` পাসওয়ার্ড _login_ (`POST /api/auth/login`) প্রত্যাখ্যান করে,
  তবে সংরক্ষিত পাসওয়ার্ড hash বজায় রাখে এবং পুনরায় প্রমাণীকরণে এখনও
  `currentPassword`-কে সেটির বিপরীতে যাচাই করা হয়।
- `corsOrigins` এবং `bruteForceProtection`-ও `SECURITY_IMPACTING_SETTINGS_KEYS`-এ রয়েছে:
  যেকোনো একটির বিধিনিষেধ শিথিল করলে লগইন প্রতিরক্ষা দুর্বল হয়, তাই এগুলোর জন্যও একই
  `currentPassword`-ভিত্তিক পুনরায় প্রমাণীকরণ প্রয়োজন (Security ট্যাব এটি চায়) এবং JSON import
  এগুলো বাদ দেয়।
- প্রতিটি নিরাপত্তা-নীতি key — `SECURITY_IMPACTING_SETTINGS_KEYS`-এর এন্ট্রি,
  প্রতিটি `oidc*` key এবং ড্যাশবোর্ড session state — `PATCH /api/settings`-এ **শুধু-অপারেটরদের জন্য**:
  manage scope-যুক্ত API key অথবা একটি `oma_` access token সঠিক `currentPassword`
  পাঠালেও `403` দিয়ে প্রত্যাখ্যাত হয় এবং প্রত্যাখ্যানটি `settings.update_failed` হিসেবে
  `reason: OPERATOR_REQUIRED`-সহ audit করা হয়
  (`src/lib/api/operatorCredential.ts`-এর `requireOperatorCredential()`)।
  সাধারণ settings (theme, display preference) একটি `manage` key
  অথবা একটি `admin` access token দিয়ে পরিবর্তনযোগ্য থাকে। `/api/settings`-এর প্রতিটি mutation
  (এবং `/api/settings/require-login`-এর mutation)-এর জন্যও `admin` access-token scope প্রয়োজন
  (`src/server/authz/accessScopes.ts`-এর `ADMIN_MUTATION_EXACT_PATHS`, exact-path
  match); `GET`-এর জন্য `read`-ই থাকে এবং অন্যান্য `/api/settings/*` sub-route (proxy,
  combo default, model alias, compression, purge…) পদ্ধতি থেকে অনুমান করা
  `write` scope বজায় রাখে।
- `POST /api/settings/import-json` ওই পুনরায় প্রমাণীকরণ এড়িয়ে যায়, তাই লেখার আগে এটি
  `IMPORT_STRIPPED_SETTINGS_KEYS`-এর (একই file) প্রতিটি key বাদ দেয়: password এবং
  `currentPassword`, প্রতিটি `SECURITY_IMPACTING_SETTINGS_KEYS` এন্ট্রি এবং
  dashboard session state (`sessionsValidAfter`, `revokedDashboardSessions`)।
  ফলে পুরোনো backup import করলেও password
  পরিবর্তন বা sign-out-এর মাধ্যমে ইতিমধ্যে শেষ করা session পুনরুজ্জীবিত হতে পারে না।

## রুট শ্রেণি

`src/server/authz/types.ts` তিনটি শ্রেণি সংজ্ঞায়িত করে; যে রুট নির্ধারণযোগ্যভাবে শ্রেণিবদ্ধ করা যায় না তা `MANAGEMENT`-এ ফিরে যায়।

| শ্রেণি       | বিবরণ                                                                                                                                               | প্রয়োজনীয় প্রমাণীকরণ                                          |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | স্পষ্টভাবে নিরাপদ রুট — লগইন, লগআউট, status, init, health, onboarding bootstrap।                                                                    | কিছুই নয়                                                       |
| `CLIENT_API` | মডেল-পরিবেশনকারী endpoint — `/api/v1/*`, `/api/v1beta/*`, এবং উপনাম `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | কার্যকর `REQUIRE_API_KEY` feature flag সক্রিয় থাকলে Bearer key |
| `MANAGEMENT` | ড্যাশবোর্ড পৃষ্ঠা, settings, providers, keys, admin ও diagnostics endpoint।                                                                         | ড্যাশবোর্ড সেশন বা `manage` scope সহ Bearer                     |

কয়েকটি `MANAGEMENT` অ্যাকশন **শুধু operator-এর জন্য**: `manage` key যথেষ্ট নয়। সংরক্ষিত credentials রপ্তানি (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), লাইভ ডেটার উপর backup পুনরুদ্ধার (`dryRun=true` সহ `POST /api/db-backups/import`, id দ্বারা `POST /api/db-backups` পুনরুদ্ধার, `POST /api/settings/import-json`), এবং restore point ধ্বংস (`DELETE /api/db-backups` cleanup, এবং `PATCH /api/db-backups` কারণ এটি যে retention সংরক্ষণ করে তা প্রতিটি backup-এর পর স্বয়ংক্রিয় pruning চালায়) — এগুলোর জন্য ড্যাশবোর্ড সেশন, স্থানীয় CLI subject, অথবা লগইন নিষ্ক্রিয় থাকা প্রয়োজন। Sync token ইস্যু (`POST /api/sync/tokens`) এবং `admin` CLI access token তৈরি (`POST /api/cli/tokens`) প্রতিটি login মোডে ড্যাশবোর্ড সেশন বা স্থানীয় CLI subject দাবি করে। যেকোনো scope-এর API key এবং `oma_` access token operator credential নয়: প্রয়োজন হলে এগুলো `403` পায়। এই পরীক্ষা `src/lib/api/operatorCredential.ts`-এ (`resolveOperatorCredential()` / `requireOperatorCredential()`) আছে। লগইন সেটিং পরিবর্তনও operator-only: `POST /api/settings/require-login` (ম্যানেজমেন্ট পাসওয়ার্ড সেট করা / `requireLogin` টগল করা) একটি পাসওয়ার্ড থাকার পর শুধু সেই credentials গ্রহণ করে — প্রথম-রানের bootstrap উইন্ডো (যখনও পাসওয়ার্ড নেই) অপরিবর্তিত — এবং পাসওয়ার্ড বদলাতে ড্যাশবোর্ড সেশনকে `currentPassword` পাঠাতে হয় (না থাকলে বা ভুল হলে `403`, `settings.update_failed` হিসেবে audit হয়)। স্থানীয় CLI এবং লগইন নিষ্ক্রিয় থাকা instance পুনরুদ্ধার পথ ধরে রাখে এবং এটি ছাড়াই পাসওয়ার্ড সেট করতে পারে, কারণ দুটোই ডেটা ডিরেক্টরির মালিক হোস্টের সাথে আবদ্ধ।

## পাইপলাইন

```
ইনকামিং রিকোয়েস্ট → src/proxy.ts
  → src/server/authz/pipeline.ts-এর runAuthzPipeline()
    1. বিশ্বস্ত অভ্যন্তরীণ হেডারগুলো সরিয়ে দিন (x-omniroute-auth-*, x-omniroute-route-class)
    2. রিকোয়েস্ট আইডি তৈরি করুন, classifyRoute() দিয়ে রুট শ্রেণিবদ্ধ করুন
    3. যদি pathname == "/" হয় → /dashboard-এ রিডাইরেক্ট করুন
    4. যদি ড্রেইনিং অবস্থায় (গ্রেসফুল শাটডাউন) থাকে এবং /api/* হয় → 503
    5. যদি GET ছাড়া অন্য /api/* হয় → checkBodySize() গার্ড
    6. যদি OPTIONS হয় → CORS প্রিফ্লাইট 204
    7. যদি options.enforce == false হয় → রুট-ক্লাস হেডারসহ পাস-থ্রু
    8. অন্যথায়: POLICIES[routeClass].evaluate(ctx)
       - অনুমোদন → x-omniroute-auth-{kind,id,label,scopes} স্ট্যাম্প করুন → NextResponse.next()
       - প্রত্যাখ্যান → correlation_id-সহ JSON ত্রুটি (ড্যাশবোর্ড পেজ → 302 /login)
```

বিশ্বস্ত অভ্যন্তরীণ হেডারগুলো (`src/server/authz/headers.ts`-এ সংজ্ঞায়িত) শ্রেণিবিন্যাসের আগে **ইনকামিং রিকোয়েস্ট থেকে সরিয়ে ফেলা হয়** — ক্লায়েন্টরা কোনো সাবজেক্টের ছদ্মবেশ ধারণ করতে আগে থেকেই `x-omniroute-auth-*` পূরণ করতে পারে না।

### পলিসি কনট্র্যাক্টসমূহ

প্রতিটি রুট ক্লাসের জন্য `src/server/authz/policies/`-এ একটি পলিসি রয়েছে:

- **`publicPolicy`** (`policies/public.ts`) — সর্বদা `allow({ kind: "anonymous", id: "anonymous" })` রিটার্ন করে।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer এক্সট্র্যাক্ট করে এবং `validateApiKey()` দিয়ে যাচাই করে। কেবল কার্যকর `REQUIRE_API_KEY` ফিচার ফ্ল্যাগ নিষ্ক্রিয় থাকলেই অ্যানোনিমাসে ফল-থ্রু করে। কার্যকর ফ্ল্যাগটি `isRequireApiKeyEnabled()` (`DB ফিচার ফ্ল্যাগ ওভাররাইড > process.env.REQUIRE_API_KEY > ডিফল্ট`) দিয়ে নির্ধারিত হয়, ফলে Dashboard Feature Flags এবং এনভায়রনমেন্ট ভেরিয়েবলগুলো `/api/v1/*`, `/api/v1beta/*` ও অ্যালিয়াসগুলোকে সামঞ্জস্যপূর্ণভাবে নিয়ন্ত্রণ করে; রিজলভার ব্যর্থ হলে প্রবেশাধিকার বন্ধ থাকে। ক্লায়েন্ট API রুটগুলোতে ড্যাশবোর্ড-সেশন রিকোয়েস্ট অনুমোদন করে (`/api/v1/models`-সহ, যা ড্যাশবোর্ড মডেল ক্যাটালগ ব্যবহার করে)।
- **`managementPolicy`** (`policies/management.ts`) — ড্যাশবোর্ড সেশন, অভ্যন্তরীণ মডেল-সিঙ্ক রিকোয়েস্ট (`/api/providers/[name]/(sync-models|models)`-এর সঙ্গে মিলিয়ে দেখা হয়) গ্রহণ করে, অথবা `isAuthRequired()` false রিটার্ন করলে সম্পূর্ণভাবে এড়িয়ে যায়। Bearer টোকেন উপস্থিত কিন্তু অবৈধ হলে 403 (`AUTH_001`) রিটার্ন করে, অন্যথায় 401। এটি যেকোনো অথেন্টিকেশন শাখার আগেই রুট-গার্ড স্তরগুলোও (LOCAL_ONLY / ALWAYS_PROTECTED) প্রয়োগ করে — [রুট গার্ড স্তরসমূহ](../security/ROUTE_GUARD_TIERS.md) দেখুন। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-এ থাকা LOCAL_ONLY পাথগুলো (বর্তমানে: `/api/mcp/`) নন-লুপব্যাক থেকে অ্যাক্সেস করা যেতে পারে যদি Bearer কী-তে `manage` স্কোপ থাকে; অন্য সব LOCAL_ONLY পাথ স্কোপ নির্বিশেষে কঠোরভাবে লুপব্যাকেই সীমাবদ্ধ থাকে।

একটি সফল পলিসি `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`-সহ `AuthSubject` রিটার্ন করে। ডাউনস্ট্রিম হ্যান্ডলারগুলো অথেন্টিকেশন লজিক পুনরায় চালানোর পরিবর্তে `src/server/authz/assertAuth.ts`-এ থাকা `assertAuth(request, "CLIENT_API")` দিয়ে এটি পড়তে পারে।

## পাবলিক রুটের তালিকা

`src/shared/constants/publicApiRoutes.ts` হলো সুস্পষ্ট অনুমোদন-তালিকা:

তালিকাটি **আকৃতি** অনুযায়ী বিভক্ত, এবং এই বিভাজনটি অত্যন্ত গুরুত্বপূর্ণ (GHSA-74g9-q8f6-793h): একটি prefix-কে
`startsWith()` দিয়ে মেলানো হয়, তাই এটি একই প্রারম্ভিক অক্ষরবিশিষ্ট সংলগ্ন প্রতিটি path-এর সঙ্গেও মিলে যায়।
`/api/usage/om-usage`-কে prefix হিসেবে ব্যবহার করায় `/api/usage/om-usage<anything>`-কে PUBLIC হিসেবে চিহ্নিত করা হয়েছিল, এবং Next এটিকে
`/api/usage/[connectionId]`-এ resolve করে — এটি এমন একটি handler যার নিজস্ব কোনো auth নেই।

```ts
// প্রকৃত subtree। প্রতিটি entry অবশ্যই "/" দিয়ে শেষ হতে হবে (একটি unit test দ্বারা যাচাইকৃত)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-এ CLIENT_API হিসেবে বিবেচিত, "no-auth public" হিসেবে নয়
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// একক route, হুবহু মেলানো হয় (শেষে slash থাকুক বা না থাকুক)।
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

// শুধুমাত্র-পঠনযোগ্য একক route, যেগুলো CORS origin শিথিলতাও পায়।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS শিথিলতা ছাড়া শুধুমাত্র-পঠনযোগ্য একক route।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

শুধুমাত্র-পঠনযোগ্য route-গুলো কেবল নিরাপদ method-এর জন্যই পাবলিক। দ্রষ্টব্য: `classifyRoute()` PUBLIC fall-through থেকে `/api/v1/*` এবং `/api/v1beta/*`-কে বাদ দেয় — এগুলো সবসময় `CLIENT_API`, যাতে Bearer-key policy এখনও প্রযোজ্য থাকে।

## নতুন Route যোগ করা

### Pattern 1 — পাবলিক client API endpoint (Bearer-auth)

`/api/v1/` এবং `/api/v1beta/`-এর অধীন route-গুলো স্বয়ংক্রিয়ভাবে `CLIENT_API` হিসেবে শ্রেণিবদ্ধ হয়। Middleware Bearer যাচাই প্রয়োগ করে; route handler-গুলোকে এটি পুনরায় করতে হয় না, তবে প্রয়োজন হলে subject পড়তে পারে।

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler-এর logic
}
```

### Pattern 2 — Management endpoint (session অথবা Bearer + manage)

`src/lib/api/requireManagementAuth.ts` থেকে `requireManagementAuth()` ব্যবহার করুন:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler-এর logic
}
```

সফল হলে `requireManagementAuth()` `null` ফেরত দেয়, অন্যথায় একটি JSON error `Response` ফেরত দেয়:

- 401 `AUTH_001` "প্রমাণীকরণ প্রয়োজন" — কোনো credentials-ই নেই
- 403 — Bearer অবৈধ **অথবা** Bearer উপস্থিত, কিন্তু key-তে `manage` / `admin` scope নেই

`hasManageScope(scopes)` `"manage"` অথবা `"admin"`-এর জন্য true ফেরত দেয়।

### Pattern 3 — পাবলিক অনুমোদন-তালিকায় যোগ করা

সুবিধা অনুযায়ী নয়, আকৃতি অনুযায়ী set নির্বাচন করুন। একটি route `PUBLIC_API_ROUTES_EXACT`-এ যায় (অথবা শুধুমাত্র GET হলে `PUBLIC_READONLY_CORS_API_ROUTES`-এ); কেবল একটি প্রকৃত subtree `PUBLIC_API_ROUTE_PREFIXES`-এ যায়, এবং সেটি **অবশ্যই `/` দিয়ে শেষ হতে হবে**। Prefix তালিকায় একটি একক route রাখলে একই প্রারম্ভিক অক্ষরবিশিষ্ট প্রতিটি সংলগ্ন path-ও প্রকাশিত হয়ে যায় — এমনকি পরে যোগ করা dynamic-segment sibling-ও (GHSA-74g9-q8f6-793h)। `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` এবং `tests/unit/authz/classify.test.ts`-এ unit test হালনাগাদ করুন।

## স্কোপসমূহ

তিনটি নেমস্পেস। প্রতিটি পরীক্ষক কেবল তার নিজস্ব স্ট্রিং পড়ে। পাশাপাশি তুলনা, যার মধ্যে কেন `manage` `read:compression`-এর জন্য `scopeMatches`-এ ব্যর্থ হয় এবং কেন একটি `read` অ্যাক্সেস টোকেন `PATCH /api/keys/{id}` করতে পারে না, তা এখানে রয়েছে:
[তিনটি স্কোপ নেমস্পেস](../frameworks/MCP-SERVER.md#three-scope-namespaces)।

API কিগুলো একটি `scopes` অ্যারে বহন করে (`api_keys.scopes`-এ JSON হিসেবে সংরক্ষিত, দেখুন `src/lib/db/apiKeys.ts`)।

### ব্যবস্থাপনা স্কোপ

- `manage` / `admin` — `hasManageScope`। ব্যবস্থাপনা API রুটগুলোতে Bearer অ্যাক্সেস।
- `mcp:connect`, `self:usage`, `self:account-quota`, এবং
  `policy:bypass-provider-quota` হলো সংযোজনধর্মী হুবহু-মিল স্কোপ। এগুলো
  `MANAGEMENT_API_KEY_SCOPES`-এর বাইরে থাকে। `mcp:connect` কেবল
  `/api/mcp/` নন-লুপব্যাক ব্যতিক্রমটি উন্মুক্ত করে।

### MCP টুল স্কোপসমূহ

ক্যাটালগ এবং মেলানোর নিয়মাবলি (অভিন্ন স্ট্রিং, অথবা `*` দিয়ে শেষ হওয়া কোনো মঞ্জুরকৃত স্কোপ):
[MCP টুল স্কোপসমূহ](../frameworks/MCP-SERVER.md#mcp-tool-scopes)।
`src/shared/constants/mcpScopes.ts`-এর `MCP_SCOPE_LIST` হলো মূল টাইপযুক্ত
উপসেট, সম্পূর্ণ ক্যাটালগটি নয়। `resolveCallerScopeContext()` MCP প্রমাণীকরণ তথ্য, অনুরোধের মেটাডেটা, অথবা `OMNIROUTE_MCP_SCOPES` থেকে স্কোপ নির্ধারণ করার পর
`open-sse/mcp-server/scopeEnforcement.ts`-এ প্রয়োগ কার্যকর হয়।
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` না হলে এটি নিষ্ক্রিয় থাকে।

### অ্যাক্সেস-টোকেন স্কোপসমূহ

`oma_live_…` টোকেনে `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) অনুযায়ী র্যাঙ্ক করা। এই র্যাঙ্ক কেবল অ্যাক্সেস-টোকেন
ক্রেডেনশিয়ালের ক্ষেত্রেই প্রযোজ্য। দেখুন [ব্যবস্থাপনা প্রমাণীকরণ](../guides/MANAGEMENT-AUTH.md)।

## Auth Required টগল

`src/shared/utils/apiAuth.ts`-এর `isAuthRequired()` সিদ্ধান্ত নেয় কোনো অনুরোধের জন্য **আদৌ** কোনো প্রমাণীকরণ প্রয়োগ হবে কি না:

- `settings.requireLogin === false` → প্রমাণীকরণ বিশ্বব্যাপীভাবে নিষ্ক্রিয় হয়, তবে always-protected tier ([Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) এবং যে কলগুলো এমন credential ইস্যু করে যা গ্রহণ করা হয়, সেগুলো বাদে — লগইন সক্রিয় থাকলে যে credential লাগে সেটিই লাগে: sync token ইস্যু, যেকোনো scope-এ CLI access token তৈরি, এবং `manage`/`admin` scope-সহ API key তৈরি, ওই scope কোনো key-কে দেওয়া, বা এমন key পুনরুৎপাদন বা প্রকাশ (`src/lib/api/requireManagementAuth.ts`-এর `requireCredentialForManagementScopedKey()`)। শুধু inference-এর জন্য key খোলা থাকে।
- কোনো পাসওয়ার্ড কনফিগার না থাকে **এবং** `INITIAL_PASSWORD` env var না থাকে → bootstrap মোড onboarding wizard ও loopback অনুরোধকে অনুমতি দেয়, কিন্তু উন্মুক্ত network অনুরোধগুলোর এখনো credential লাগে।
- যেকোনো DB ত্রুটি → fail closed (secure-by-default)।

Client API key প্রয়োগ `src/shared/utils/featureFlags.ts`-এর `isRequireApiKeyEnabled()` ব্যবহার করে, সরাসরি `process.env.REQUIRE_API_KEY` পড়ে না। এটি deployed instance-এর জন্য গুরুত্বপূর্ণ: Dashboard → Feature Flags-এ `REQUIRE_API_KEY` টগল করলে একটি DB override সংরক্ষিত হয় এবং তাৎক্ষণিকভাবে `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` এবং এই helper ভাগ করা অন্যান্য client-API auth পরীক্ষায় প্রভাব ফেলে। Feature flag store পড়া না গেলে client API auth fail closed হয় এবং একটি key চায়।

## ব্রেকিং পরিবর্তন — v3.8.0

`/api/v1/agents/tasks/*` এবং `/api/resilience/model-cooldowns` এন্ডপয়েন্টগুলোর জন্য **এখন ম্যানেজমেন্ট auth আবশ্যক** (commit `588a0333`)। আগে `manage` স্কোপ ছাড়া একটি সাধারণ API কী পাঠানো ক্লায়েন্টগুলো এখন `403` পায়। মাইগ্রেশন: API Keys dashboard-এ কীটিকে `manage` স্কোপ দিন, অথবা লগইন করা dashboard session ব্যবহার করুন।

## আচরণগত পরিবর্তন — v3.8.2

`/api/mcp/*` (রিমোট MCP server) এখনও ডিফল্টভাবে LOCAL_ONLY, তবে `Authorization: Bearer <api-key>` header-এ `manage` স্কোপ থাকলে এখন non-loopback রিকোয়েস্ট গ্রহণ করে। এই ব্যতিক্রমটি `src/server/authz/routeGuard.ts`-এর `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-এর মাধ্যমে প্রতিটি path-এর জন্য স্পষ্টভাবে নিয়ন্ত্রিত; পাশাপাশি থাকা LOCAL_ONLY prefix `/api/cli-tools/runtime/*` ইচ্ছাকৃতভাবে bypass করা যায় না, কারণ এটি যেকোনো subprocess চালু করতে পারে। non-loopback থেকে `/api/mcp/*`-এ আসা anonymous রিকোয়েস্টগুলো এখনও `403 LOCAL_ONLY` ফেরত দেয়—যেকোনো নতুন LOCAL_ONLY path-এর ডিফল্ট কঠোর loopback-ই থাকে। দেখুন [রুট গার্ড স্তরসমূহ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)।

## টেস্টিং

- ইউনিট টেস্ট: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- পাবলিক allowlist: `tests/unit/public-api-routes.test.ts`।
- নির্দিষ্ট টেস্ট চালান: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## ডিবাগিং

পাইপলাইনটি সবসময় রেসপন্সে নিচের হেডারগুলো যুক্ত করে:

```
x-request-id:               <কোরিলেশন আইডি, এরর বডিতে পুনরাবৃত্ত>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

প্রমাণীকৃত রিকোয়েস্টের ক্ষেত্রে আপস্ট্রিম (হ্যান্ডলার-পক্ষের) রিকোয়েস্ট হেডারগুলোতে আরও থাকে:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<শেষ-৪> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ঐচ্ছিক)
x-omniroute-auth-scopes:    কমা দিয়ে পৃথক করা তালিকা
```

হ্যান্ডলারের ভেতরে `assertAuth(req, expectedClass)` ব্যবহার করুন — মিডলওয়্যারটি বাইপাস করা হলে এটি `AUTHZ_NOT_INITIALIZED` কোডসহ `AuthzAssertionError` থ্রো করে (টেস্টে কনফিগারেশন রিগ্রেশন শনাক্ত করতে সহায়ক)।

## আরও দেখুন

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — প্রতিটি এন্ডপয়েন্টের auth মার্কার
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auth ইভেন্টগুলোর জন্য অডিট লগ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — তিনটি scope namespace এবং MCP tool-scope ক্যাটালগ
- সোর্স: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
