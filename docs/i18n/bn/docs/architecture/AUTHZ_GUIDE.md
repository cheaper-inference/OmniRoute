# Authorization Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **সত্যের উৎস:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **সর্বশেষ হালনাগাদ:** 2026-09-22 — স্কোপ নেমস্পেসগুলো MCP-SERVER.md-এর দিকে নির্দেশ করে

OmniRoute-এ একটি রুট-সচেতন অথরাইজেশন পাইপলাইন রয়েছে, যা প্রতিটি API অনুরোধকে নিয়ন্ত্রণ করে। শ্রেণিবিন্যাস **নির্ধারণবাদী** এবং **ব্যর্থ হলে বন্ধ** — শ্রেণিবদ্ধ করা যায় না এমন সবকিছু শেষ পর্যন্ত `MANAGEMENT` হিসেবে গণ্য হয় এবং একটি সেশন বা ম্যানেজমেন্ট-গ্রেড টোকেন দাবি করে। রুট রক্ষণাবেক্ষণকারী বা নতুন এন্ডপয়েন্ট ডিজাইনকারী প্রকৌশলীদের জন্য এই পৃষ্ঠায় মডেলটি ব্যাখ্যা করা হয়েছে।

![AuthZ পাইপলাইন (৩টি রুট শ্রেণি + নীতি মূল্যায়ন)](../diagrams/exported/authz-pipeline.svg)

> উৎস: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## দুটি প্রমাণীকরণ মোড

### ১. API Key (Bearer)

OpenAI/Anthropic/Gemini-সামঞ্জস্যপূর্ণ ক্লায়েন্ট API এবং কয়েকটি ব্যবস্থাপনা রুটে ব্যবহৃত হয়, যখন কী-তে `manage` স্কোপ থাকে।

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`-এর `isValidApiKey()` / `extractApiKey()` দ্বারা যাচাই করা হয় এবং `src/shared/utils/apiAuth.ts`-এর মাধ্যমে পুনরায় এক্সপোর্ট করা হয়। ভ্যালিডেটরটি `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` এনভায়রনমেন্ট ভ্যারিয়েবলকেও স্থায়ী পাসথ্রু কী হিসেবে গ্রহণ করে (issue #1350)।

### ২. Dashboard Session (auth_token cookie)

ড্যাশবোর্ড পৃষ্ঠা এবং অ্যাডমিন অপারেশনের জন্য।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT যাচাই হয় **এবং** এতে `authenticated: true` থাকে (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`) — কেবল তখনই একটি কুকি সেশন হিসেবে গণ্য হয়। কুকির প্রতিটি ব্যবহারকারী (ড্যাশবোর্ড রুট গার্ড (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live server, `/api/settings/require-login`, `/api/auth/status`) ওই হেল্পারের মাধ্যমে যায়। `JWT_SECRET` দিয়ে স্বাক্ষরিত অন্যান্য JWT-ও বিদ্যমান — কী হোল্ডারদের জন্য Cursor CLI passthrough `iss "omniroute" / aud "cursor-cli"` টোকেন তৈরি করে — এবং সেগুলো কখনোই সেশন নয় (#13298)।

`src/shared/utils/apiAuth.ts`-এর `isDashboardSessionAuthenticated()` দ্বারা যাচাই করা হয়। ৩০ দিনের জীবনকালের মধ্যে JWT-এর মেয়াদ শেষ হতে ৭ দিনের কম সময় থাকলে pipeline স্বয়ংক্রিয়ভাবে JWT রিফ্রেশ করে।

৩০ দিন পূর্ণ হওয়ার আগেও একটি সেশন শেষ হতে পারে, কারণ প্রতিটি minter `mintDashboardSessionToken`-এর মাধ্যমে যায় (একটি issue time `iat` এবং একটি id `jti` সহ) এবং verifier দুটি সেটিং পরীক্ষা করে: `sessionsValidAfter`, যা পাসওয়ার্ড পরিবর্তনের মাধ্যমে সেট করা হয়, ফলে এর আগে ইস্যু করা প্রতিটি সেশন যাচাই হওয়া বন্ধ হয়ে যায় (যে ব্রাউজার দিয়ে পাসওয়ার্ড পরিবর্তন করা হয়েছে সেটি নতুন কুকি পায়), এবং `revokedDashboardSessions`, যেখানে `POST /api/auth/logout` সাইন-আউট করা সেশনের `jti` যোগ করে। পুরোনো রিলিজ দ্বারা mint করা সেশনগুলোতে কোনো claim থাকে না এবং প্রথম পাসওয়ার্ড পরিবর্তন না হওয়া পর্যন্ত বৈধ থাকে। সেটিংগুলো পড়া না গেলে সেশনটি বিশ্বাসযোগ্য হিসেবে গণ্য হয় না।

কিছু ব্যবস্থাপনা রুট উভয় মোড গ্রহণ করে: কুকি অথবা `manage` (বা `admin`) স্কোপযুক্ত API key-এর ক্ষেত্রে `Bearer <key>`। v3.8-এ যুক্ত করা "configurable via API calls" workflow-টি এভাবেই সক্রিয় হয়।

#### ঐচ্ছিক OIDC login gate (#6973)

ড্যাশবোর্ড অ্যাডমিন লগইন ডিফল্ট পাসওয়ার্ড লগইনের পাশাপাশি একটি **opt-in** OIDC (OpenID Connect) flow-ও সমর্থন করে — পাসওয়ার্ড লগইন কখনো সরানো হয় না, শুধু
পরিপূরক হিসেবে যুক্ত হয়:

- `settings.oidcEnabled === true` **এবং** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret`—সবগুলো কনফিগার করা থাকলেই সক্রিয় থাকে (Settings → Auth)।
  অন্যথায় `GET /api/auth/oidc/login` `400` ফেরত দেয়।
- `GET /api/auth/oidc/login` issuer-এর `/.well-known/openid-configuration` থেকে
  `authorization_endpoint` আবিষ্কার করে (`<issuer>/authorize`-এ fallback করে), আগত অনুরোধ
  থেকে redirect URI তৈরি করে (`x-forwarded-proto`-সচেতন), এবং `httpOnly`
  `oidc_state` কুকিতে সংরক্ষিত একটি র্যান্ডম `state` সহ IdP-তে redirect করে।
- `GET /api/auth/oidc/callback` `state` যাচাই করে, authorization code বিনিময় করে এবং issuer-এর
  JWKS-এর মাধ্যমে ID token-এর স্বাক্ষর যাচাই করে (`jose`-এর `createRemoteJWKSet`, প্রতি JWKS URI-র
  জন্য cached), পাশাপাশি `issuer`/`audience` পরীক্ষা করে। Dashboard-এ প্রবেশের জন্য একটি
  nonempty `oidcAllowedSubjects` তালিকা, একটি `oidcAdmissionClaim` policy, অথবা উভয়ই থাকতে হবে।
  Subject তালিকা `sub` অথবা `email`-এর সঙ্গে তখনই মেলে যখন `email_verified === true`।
  ঐচ্ছিক claim policy একটি dot-separated ID-token claim path (যেমন,
  `realm_access.roles`) এবং গৃহীত মানগুলোর একটি array গ্রহণ করে; নির্ধারিত claim-টি অবশ্যই
  string-এর একটি array হতে হবে এবং তাতে অন্তত একটি গৃহীত মান থাকতে হবে। উভয় policy কনফিগার
  করা থাকলে, দুটিই পাস করতে হবে। অনুপস্থিত/ভুল-গঠনের claim নিরাপদভাবে ব্যর্থ হয়, এবং কোনো
  policy না থাকলে callback login প্রত্যাখ্যান করে (`not_configured`)। বিদ্যমান subject-only
  কনফিগারেশন অপরিবর্তিতভাবে কাজ করে।
- Keycloak সাধারণত realm role-গুলো access token-এ map করে, ID token-এ নয়। realm role
  `admin` প্রয়োজন হলে, এই client-এর জন্য এমন একটি protocol mapper কনফিগার করুন যা
  `realm_access.roles`-কে এর **ID token**-এ অন্তর্ভুক্ত করে, তারপর
  `oidcAdmissionClaim`-কে `{ "path": "realm_access.roles", "values": ["admin"] }` হিসেবে সেট করুন।
  role-only admission সক্রিয় করার আগে এই client-এর প্রকৃত ID-token claim পরীক্ষা করুন; application
  access-token role পড়ে না। IdP-পক্ষের token প্রত্যাখ্যান এই application-পক্ষের যাচাইকে
  সম্পূরক করতে পারে, কিন্তু তার বিকল্প নয়।
- সফল হলে এটি password login যে **ঠিক একই** 30-day `auth_token` JWT ইস্যু করে
  (`src/app/api/auth/login/route.ts`), তাই dashboard session pipeline-এর বাকি অংশ
  (auto-refresh, cookie flags) অপরিবর্তিত থাকে — OIDC শুধু cookie কীভাবে mint করা হয় তা
  বদলে দেয়, এটি কী অনুমোদন করে তা নয়। IdP role/group-এ পরিবর্তন বিদ্যমান OmniRoute session
  invalid করে না; logout, password rotation, অথবা session expiry এখনও তাদের lifetime নিয়ন্ত্রণ করে।
- প্রতিটি `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`-এ
  রয়েছে (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  `400 PASSWORD_REQUIRED` উত্তর দেয়, যদি body-তে management password-টি
  `currentPassword` হিসেবে না থাকে (`401 PASSWORD_MISMATCH` যখন এটি ভুল হয়)।
  `oidcDisablePasswordLogin` password _login_ (`POST /api/auth/login`) প্রত্যাখ্যান করে,
  কিন্তু সংরক্ষিত password hash বজায় রাখে, এবং re-auth এখনও এর বিপরীতে
  `currentPassword` পরীক্ষা করে।
- `corsOrigins` এবং `bruteForceProtection`-ও `SECURITY_IMPACTING_SETTINGS_KEYS`-এ রয়েছে:
  যেকোনোটিকে শিথিল করলে login প্রতিরক্ষা দুর্বল হয়, তাই এগুলোর ক্ষেত্রেও একই
  `currentPassword` re-auth প্রয়োজন (Security tab এটি চায়) এবং JSON import এগুলো বাদ দেয়।
- প্রতিটি security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS`-এর entry-গুলো,
  প্রতিটি `oidc*` key এবং dashboard session state — `PATCH /api/settings`-এ
  **শুধুমাত্র operator-এর জন্য**: manage-scoped API key অথবা `oma_` access token
  সঠিক `currentPassword` পাঠালেও `403` দিয়ে প্রত্যাখ্যাত হয়, এবং এই প্রত্যাখ্যান
  `settings.update_failed` হিসেবে `reason: OPERATOR_REQUIRED` সহ audit করা হয়
  (`src/lib/api/operatorCredential.ts`-এর `requireOperatorCredential()`)।
  সাধারণ setting (theme, display preferences) `manage` key অথবা `admin` access token-এর
  জন্য writable থাকে। `/api/settings` নিজেই (এবং `/api/settings/require-login`) পরিবর্তনের
  প্রতিটি mutation-এর জন্যও `admin` access-token scope প্রয়োজন
  (`src/server/authz/accessScopes.ts`-এর `ADMIN_MUTATION_EXACT_PATHS`, exact-path match);
  `GET` এখনও `read`, এবং অন্যান্য `/api/settings/*` sub-route (proxies, combo defaults,
  model aliases, compression, purges…) method-inferred `write` scope বজায় রাখে।
- `POST /api/settings/import-json` ওই re-auth বাদ দেয়, তাই লেখার আগে
  `IMPORT_STRIPPED_SETTINGS_KEYS`-এ থাকা প্রতিটি key (একই file) বাদ দেয়: password এবং
  `currentPassword`, প্রতিটি `SECURITY_IMPACTING_SETTINGS_KEYS` entry, এবং dashboard
  session state (`sessionsValidAfter`, `revokedDashboardSessions`)।
  অতএব পুরোনো backup import করলে password change অথবা sign-out-এর মাধ্যমে ইতিমধ্যে শেষ হয়ে
  যাওয়া session পুনরায় সক্রিয় করা যায় না।

#### ঐচ্ছিক TOTP two-factor login (#16619)

Settings → Security থেকে enroll করা হয়; operator এটি চালু না করা পর্যন্ত বন্ধ থাকে
(`src/server/auth/dashboardMfa.ts`)।

- **যা এতে অন্তর্ভুক্ত:** পাসওয়ার্ড লগইন (`POST /api/auth/login`, যার পরে
  `POST /api/auth/mfa/verify` প্রয়োজন) এবং `omniroute connect` (`POST /api/cli/connect`,
  যা শুধুমাত্র পাসওয়ার্ডের বিনিময় প্রত্যাখ্যান করে এবং কোডটি `totp` হিসেবে নেয়)।
- **যা এতে অন্তর্ভুক্ত নয়:** OIDC / SSO সাইন-ইন (`/api/auth/oidc/callback`) OmniRoute TOTP
  চায় না। এটি পরিচয় প্রদানকারীর নিজস্ব দ্বিতীয় ফ্যাক্টরের ওপর নির্ভর করে, তাই OIDC
  সক্রিয় থাকলে IdP-তে MFA প্রয়োগ করুন।
- **পুনরুদ্ধার** (ডিভাইস হারিয়ে গেলে, কোনো পুনরুদ্ধার কোড অবশিষ্ট না থাকলে, অথবা কোনো
  ফ্যাক্টর আর যাচাই করা না গেলে, যেমন `STORAGE_ENCRYPTION_KEY` পরিবর্তনের পর):
  1. `OMNIROUTE_DISABLE_MFA=true` দিয়ে সার্ভার পুনরায় চালু করুন।
  2. হোস্টেই (লুপব্যাক পিয়ার এবং লুপব্যাক `Host`, যেমন
     `http://localhost:20128`) পাসওয়ার্ড দিয়ে সাইন ইন করুন। শুধুমাত্র ওই অরিজিনের
     জন্য দ্বিতীয় ফ্যাক্টরটি এড়িয়ে যাওয়া হবে; অন্য প্রতিটি অরিজিনে এখনও কোড
     প্রয়োজন হবে।
  3. সেটিংস → নিরাপত্তা → নিষ্ক্রিয় করুন-এ, পাসওয়ার্ড লিখুন এবং কোডের ঘরটি ফাঁকা
     রাখুন। `POST /api/auth/mfa/disable` কেবল ভেরিয়েবলটি সেট থাকা অবস্থায় এবং
     অনুরোধটি হোস্ট থেকে এলে `code` ছাড়া বডি গ্রহণ করে; এর জন্য এখনও
     ড্যাশবোর্ড সেশন এবং বর্তমান পাসওয়ার্ড প্রয়োজন, এবং এটি
     `auth.mfa.disabled` হিসেবে `secondFactor: "recovery_switch"` সহ অডিট করা হয়।
  4. `OMNIROUTE_DISABLE_MFA` আনসেট করুন, সার্ভার পুনরায় চালু করুন এবং প্রয়োজন হলে
     আবার এনরোল করুন।

## রুট ক্লাস

`src/server/authz/types.ts` তিনটি শ্রেণী সংজ্ঞায়িত করে; যেকোন রুটকে নির্ধারকভাবে শ্রেণীবদ্ধ করা যায় না তা `MANAGEMENT` এ ফিরে আসে।

| ক্লাস        | বর্ণনা                                                                                                                                               | প্রমাণ প্রয়োজন                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | স্পষ্টভাবে নিরাপদ রুট — লগইন, লগআউট, স্থিতি, স্বাস্থ্য, অনবোর্ডিং বুটস্ট্র্যাপ।                                                                      | কোনোটিই নয়                                                           |
| `CLIENT_API` | মডেল-সার্ভিং এন্ডপয়েন্ট — `/api/v1/*`, `/api/v1beta/*`, প্লাস উপনাম `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | কার্যকরী `REQUIRE_API_KEY` বৈশিষ্ট্য পতাকা সক্রিয় করা হলে বহনকারী কী |
| `MANAGEMENT` | ড্যাশবোর্ড পৃষ্ঠা, সেটিংস, প্রদানকারী, কী, অ্যাডমিন এবং ডায়াগনস্টিকস এন্ডপয়েন্ট।                                                                   | `manage` সুযোগ সহ ড্যাশবোর্ড সেশন OR বহনকারী                          |

কয়েকটি `MANAGEMENT` কর্ম হল** শুধুমাত্র অপারেটর** : একটি `manage` কী যথেষ্ট নয়। সঞ্চিত শংসাপত্র রপ্তানি করা (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), লাইভ ডেটার উপর একটি ব্যাকআপ পুনরুদ্ধার করা (`POST /api/db-backups/import` সহ `dryRun=true`, `POST /api/db-backups` id দ্বারা পুনরুদ্ধার করা , `POST /api/settings/import-json`), পুনরুদ্ধার পয়েন্টগুলি ধ্বংস করা (`DELETE /api/db-backups` ক্লিনআপ, এবং `PATCH /api/db-backups` কারণ এটি ধরে রাখা প্রতিটি সেশনের পরে স্বয়ংক্রিয়ভাবে ড্রাইভ করার জন্য ড্রাইভ করার জন্য স্থানীয় বোর্ডের প্রয়োজন হয়) CLI বিষয়, বা লগইন নিষ্ক্রিয়। একটি সিঙ্ক টোকেন (`POST /api/sync/tokens`) জারি করা এবং একটি `admin` CLI অ্যাক্সেস টোকেন (`POST /api/cli/tokens`) মিন্ট করার জন্য প্রতিটি লগইন মোডে একটি ড্যাশবোর্ড সেশন বা স্থানীয় CLI বিষয় প্রয়োজন৷ যেকোনো সুযোগের API কী এবং `oma_` অ্যাক্সেস টোকেনগুলি অপারেটর শংসাপত্র নয়: যখনই প্রয়োজন হয় তখনই তারা `403` পায়। চেকটি `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) এ থাকে। লগইন সেটিংস পরিবর্তন করা শুধুমাত্র অপারেটর-ও: `POST /api/settings/require-login` (ম্যানেজমেন্ট পাসওয়ার্ড সেট করুন / `requireLogin` টগল করুন) শুধুমাত্র সেই শংসাপত্রগুলি গ্রহণ করে যখন একটি পাসওয়ার্ড বিদ্যমান — প্রথম-চালিত বুটস্ট্র্যাপ উইন্ডো (এখনও কোন পাসওয়ার্ড নেই) অপরিবর্তিত — এবং একটি ড্যাশবোর্ড সেশন অবশ্যই `currentPassword` পাঠাতে হবে পাসওয়ার্ডটি প্রতিস্থাপন করার জন্য (`403` ভুল হলে এটি `settings.update_failed` বা ভুল হয়)। স্থানীয় CLI এবং লগইন অক্ষম থাকা একটি উদাহরণ পুনরুদ্ধারের পথ রাখে এবং এটি ছাড়াই একটি পাসওয়ার্ড সেট করতে পারে, যেহেতু উভয়ই ডেটা ডিরেক্টরির মালিক হোস্টের সাথে আবদ্ধ।

## পাইপলাইন

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

বিশ্বস্ত অভ্যন্তরীণ শিরোনাম ( `src/server/authz/headers.ts` তে সংজ্ঞায়িত) হল** ইনকামিং অনুরোধ থেকে ছিনতাই** শ্রেণীবিভাগের আগে — ক্লায়েন্টরা একটি বিষয়ের ছদ্মবেশী করার জন্য `x-omniroute-auth-*` প্রাক-পপুলেট করতে পারে না।

### নীতি চুক্তি

প্রতিটি রুট ক্লাসের `src/server/authz/policies/` তে একটি নীতি রয়েছে:

- **`publicPolicy`** (`policies/public.ts`) — সবসময় `allow({ kind: "anonymous", id: "anonymous" })` ফেরত দেয়।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — নির্যাস বহনকারী, `validateApiKey()` মাধ্যমে যাচাই করে। কার্যকরী `REQUIRE_API_KEY` বৈশিষ্ট্য পতাকা নিষ্ক্রিয় করা হলেই শুধুমাত্র বেনামে পড়ে। কার্যকরী পতাকাটি `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) এর মাধ্যমে সমাধান করা হয় তাই ড্যাশবোর্ড ফিচার ফ্ল্যাগ এবং এনভায়রনমেন্ট ভেরিয়েবল `/api/v1/*`, `/api/v1beta/*`, এবং উপনামগুলি ধারাবাহিকভাবে নিয়ন্ত্রণ করে; সমাধানকারী ব্যর্থতা ব্যর্থ বন্ধ. ক্লায়েন্ট API রুটে ড্যাশবোর্ড-সেশন অনুরোধের অনুমতি দেয় ( `/api/v1/models` সহ, ড্যাশবোর্ড মডেল ক্যাটালগ দ্বারা ব্যবহৃত)। যখন Entra ID SSO সক্ষম করা হয়, তখন একজন বহনকারী যা কাঠামোগতভাবে একটি Entra টোকেন (তিনটি base64url সেগমেন্ট, `RS*` alg, `kid`) SSO শাখা দ্বারা পরিচালিত হয়** আগে** `validateApiKey()` এবং এর রায় চূড়ান্ত — এটি কখনই API-কী পাথ বা ডিগ্রেড-টু-বেনামী শাখায় পড়ে না, তাই একটি পরিচয়-প্রদানকারী বিভ্রাট ওপেন অ্যাক্সেস হতে পারে না। স্ট্যাটিক API কীগুলি প্রভাবিত হয় না। [Entra ID SSO](../security/ENTRA_SSO.md) দেখুন।
- **`managementPolicy`** (`policies/management.ts`) — ড্যাশবোর্ড সেশন গ্রহণ করে, অভ্যন্তরীণ মডেল-সিঙ্ক অনুরোধ ( `/api/providers/[name]/(sync-models|models)` এর সাথে মিলে যায়), অথবা `isAuthRequired()` মিথ্যা প্রত্যাবর্তন করলে সম্পূর্ণভাবে এড়িয়ে যায়। 403 (`AUTH_001`) প্রদান করে যখন একটি Bearer টোকেন উপস্থিত থাকে কিন্তু অবৈধ, অন্যথায় 401। এছাড়াও কোনো প্রমাণীকরণ শাখা — [রুট গার্ড টিয়ার](../security/ROUTE_GUARD_TIERS.md) দেখার আগে রুট-গার্ড টিয়ারগুলি (LOCAL_ONLY / ALWAYS_PROTECTED) প্রয়োগ করে৷ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` এ LOCAL_ONLY পাথগুলি (আজ: `/api/mcp/`) নন-লুপব্যাক থেকে অ্যাক্সেস করা যেতে পারে যখন Bearer কী `manage` স্কোপ বহন করে; অন্য সব LOCAL_ONLY পাথ কঠোর-লুপব্যাক থাকে সুযোগ নির্বিশেষে।

একটি সফল নীতি `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` দিয়ে `AuthSubject` ফেরত দেয়। ডাউনস্ট্রিম হ্যান্ডলাররা প্রমাণীকরণ যুক্তি পুনরায় চালু করার পরিবর্তে `src/server/authz/assertAuth.ts` এ `assertAuth(request, "CLIENT_API")` এর মাধ্যমে এটি পড়তে পারে।

## পাবলিক রুট তালিকা

`src/shared/constants/publicApiRoutes.ts` হল সুস্পষ্ট অনুমোদিত তালিকা:

তালিকা দ্বারা বিভক্ত করা হয়** আকৃতি** , এবং বিভাজন হল লোড-বেয়ারিং (GHSA-74g9-q8f6-793h): একটি উপসর্গ `startsWith()` এর সাথে মিলে যায়, তাই এটি প্রতিটি সংলগ্ন পাথের সাথে তার অগ্রণী অক্ষর ভাগ করে নেয়। `/api/usage/om-usage` একটি উপসর্গ হিসাবে চিহ্নিত `/api/usage/om-usage<anything>` PUBLIC, এবং পরবর্তী সমাধান করে যে `/api/usage/[connectionId]` — হ্যান্ডলারের নিজস্ব কোনো প্রমাণ নেই।

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

শুধুমাত্র-পঠন রুট সর্বজনীন** শুধুমাত্র** নিরাপদ পদ্ধতির জন্য। দ্রষ্টব্য: `classifyRoute()` ফল- — PUBLIC `/api/v1/*` এবং `/api/v1beta/*` বাদ দেয় সেগুলি সর্বদা `CLIENT_API` হয় তাই Bearer-key নীতি এখনও প্রযোজ্য।

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

## প্রমাণীকরণ প্রয়োজনীয় টগল

`src/shared/utils/apiAuth.ts` তে`isAuthRequired()` সিদ্ধান্ত নেয় কিনা** যেকোনো** একটি অনুরোধের জন্য auth প্রয়োগ করা হয়েছে:

- `settings.requireLogin === false` → auth বিশ্বব্যাপী অক্ষম, সর্বদা-সুরক্ষিত স্তর ( [রুট গার্ড টিয়ার](../security/ROUTE_GUARD_TIERS.md) দেখুন) এবং কল যা এটি গ্রহণ করে এমন একটি শংসাপত্র প্রদান করে, যার লগইন অনের মতো একই শংসাপত্র প্রয়োজন: সিঙ্ক টোকেন জারি করা, যেকোন স্কোপে CLI অ্যাক্সেস টোকেনগুলি মিন্ট করা, এবং API `manage` সাথে একটি কী তৈরি করা একটি কীকে সেই সুযোগ প্রদান করা, বা এই জাতীয় কী পুনরায় তৈরি করা বা প্রকাশ করা ( `src/lib/api/requireManagementAuth.ts` তে`requireCredentialForManagementScopedKey()` )`admin` শুধুমাত্র অনুমান-কীগুলি খোলা থাকে। একটি সুরক্ষিত বৈশিষ্ট্য পতাকা (`REQUIRE_API_KEY`, অন্যান্য নিরাপত্তা পতাকা এবং SSRF / TLS / MCP-স্কোপ / স্যান্ডবক্স পতাকাগুলি [ফিচার ফ্ল্যাগে](../reference/FEATURE_FLAGS.md#rest-api) তালিকাভুক্ত) লেখা এবং PII মাস্কিং সেটিংস (`PUT /api/settings/pii`) সংরক্ষণ করার জন্যও একটি শংসাপত্রের প্রয়োজন থাকে৷
- কোন পাসওয়ার্ড কনফিগার করা নেই** এবং** কোন `INITIAL_PASSWORD` env var → বুটস্ট্র্যাপ মোড অনবোর্ডিং উইজার্ড এবং লুপব্যাক অনুরোধগুলিকে অনুমতি দেয়, তবে উন্মুক্ত নেটওয়ার্ক অনুরোধগুলির এখনও শংসাপত্রের প্রয়োজন হয়৷ ব্যতিক্রম: একটি সুরক্ষিত বৈশিষ্ট্য পতাকা লেখা এবং PII মাস্কিং সেটিংস (`PUT /api/settings/pii`) সংরক্ষণ করার জন্য এমনকি লুপব্যাক থেকেও একটি প্রমাণপত্রের প্রয়োজন, তাই সেখানে লুপব্যাক যথেষ্ট নয়।
- যেকোনো DB ত্রুটি → বন্ধ হয়ে যায় (সুরক্ষিত-বাই-ডিফল্ট)।

ক্লায়েন্ট API কী এনফোর্সমেন্ট `src/shared/utils/featureFlags.ts` এ `isRequireApiKeyEnabled()` ব্যবহার করে, সরাসরি `process.env.REQUIRE_API_KEY` রিড নয়। এটি স্থাপন করা উদাহরণগুলির জন্য গুরুত্বপূর্ণ: ড্যাশবোর্ডে `REQUIRE_API_KEY` টগল করা → বৈশিষ্ট্য ফ্ল্যাগ একটি DB ওভাররাইড সঞ্চয় করে এবং অবিলম্বে `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` এবং অন্যান্য ক্লায়েন্ট-এপিআই প্রমাণীকরণ চেকগুলিকে প্রভাবিত করে যা এই সাহায্যকারীকে ভাগ করে। ফিচার ফ্ল্যাগ স্টোর পড়া না গেলে, ক্লায়েন্ট API auth বন্ধ হয়ে যায় এবং একটি কী প্রয়োজন।

## ব্রেকিং পরিবর্তন — v3.8.0

`/api/v1/agents/tasks/*` এবং `/api/resilience/model-cooldowns` এন্ডপয়েন্টগুলোর জন্য **এখন ম্যানেজমেন্ট auth আবশ্যক** (commit `588a0333`)। আগে `manage` স্কোপ ছাড়া একটি সাধারণ API কী পাঠানো ক্লায়েন্টগুলো এখন `403` পায়। মাইগ্রেশন: API Keys dashboard-এ কীটিকে `manage` স্কোপ দিন, অথবা লগইন করা dashboard session ব্যবহার করুন।

## আচরণগত পরিবর্তন — v3.8.2

`/api/mcp/*` (রিমোট MCP server) এখনও ডিফল্টভাবে LOCAL_ONLY, তবে `Authorization: Bearer <api-key>` header-এ `manage` স্কোপ থাকলে এখন non-loopback রিকোয়েস্ট গ্রহণ করে। এই ব্যতিক্রমটি `src/server/authz/routeGuard.ts`-এর `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-এর মাধ্যমে প্রতিটি path-এর জন্য স্পষ্টভাবে নিয়ন্ত্রিত; পাশাপাশি থাকা LOCAL_ONLY prefix `/api/cli-tools/runtime/*` ইচ্ছাকৃতভাবে bypass করা যায় না, কারণ এটি যেকোনো subprocess চালু করতে পারে। non-loopback থেকে `/api/mcp/*`-এ আসা anonymous রিকোয়েস্টগুলো এখনও `403 LOCAL_ONLY` ফেরত দেয়—যেকোনো নতুন LOCAL_ONLY path-এর ডিফল্ট কঠোর loopback-ই থাকে। দেখুন [রুট গার্ড স্তরসমূহ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)।

## টেস্টিং

- ইউনিট টেস্ট: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- পাবলিক allowlist: `tests/unit/public-api-routes.test.ts`।
- নির্দিষ্ট টেস্ট চালান: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## ডিবাগিং

পাইপলাইন সর্বদা এর সাথে প্রতিক্রিয়াগুলি স্ট্যাম্প করে:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

প্রমাণীকৃত অনুরোধের জন্য আপস্ট্রিম (হ্যান্ডলার-সাইড) অনুরোধ শিরোনামগুলিও অন্তর্ভুক্ত করে:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

মিডলওয়্যারটি বাইপাস করা হলে — হ্যান্ডলারের ভিতরে `assertAuth(req, expectedClass)` ব্যবহার করুন এটি `AUTHZ_NOT_INITIALIZED` কোড সহ `AuthzAssertionError` ছুঁড়ে দেয় (পরীক্ষায় কনফিগারেশন রিগ্রেশন ধরার জন্য সহায়ক)।

## আরও দেখুন

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — প্রতিটি এন্ডপয়েন্টের auth মার্কার
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auth ইভেন্টগুলোর জন্য অডিট লগ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — তিনটি scope namespace এবং MCP tool-scope ক্যাটালগ
- সোর্স: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
