# Authorization Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **සත්යයේ මූලාශ්රය:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **අවසන් වරට යාවත්කාලීන කරන ලදී:** 2026-09-22 — විෂය පථ නාම අවකාශ MCP-SERVER.md වෙත යොමු කරයි

OmniRoute සතුව සෑම API ඉල්ලීමක්ම පාලනය කරන මාර්ග-දැනුවත් අවසර නල මාර්ගයක් ඇත. වර්ගීකරණය **නිශ්චිත** සහ **අසාර්ථක-වසා දැමූ** වේ — වර්ගීකරණය කළ නොහැකි ඕනෑම දෙයක් `MANAGEMENT` ලෙස අවසන් වන අතර සැසියක් හෝ කළමනාකරණ-ශ්රේණියේ ටෝකනයක් ඉල්ලා සිටී. මෙම පිටුව මාර්ග නඩත්තු කරන හෝ නව අවසන් ලක්ෂ්ය සැලසුම් කරන ඉංජිනේරුවන් සඳහා ආකෘතිය පැහැදිලි කරයි.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> මූලාශ්රය: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## සත්යාපන මාදිලි දෙකක්

### 1. API යතුර (Bearer)

OpenAI/Anthropic/Gemini-අනුකූල client API සඳහා සහ යතුරට `manage` scope එක ඇති විට කළමනාකරණ routes කිහිපයක් සඳහා භාවිත කෙරේ.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` හි `isValidApiKey()` / `extractApiKey()` මගින් වලංගු කර, `src/shared/utils/apiAuth.ts` හරහා නැවත export කරයි. Validator එක `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` පරිසර විචල්යයන් ද ස්ථිර passthrough යතුරු ලෙස පිළිගනී (ගැටලුව #1350).

### 2. Dashboard සැසිය (auth_token cookie)

Dashboard පිටු සහ පරිපාලක මෙහෙයුම් සඳහා.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT එක සාර්ථකව verify වී, `authenticated: true` දරන්නේ නම් පමණක් cookie එක සැසියක් ලෙස සලකනු ලැබේ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Cookie එක භාවිත කරන සෑම consumer කෙනෙකුම (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live server, `/api/settings/require-login`, `/api/auth/status`) එම helper එක හරහා ගමන් කරයි.
`JWT_SECRET` මගින් sign කරන ලද වෙනත් JWT ද පවතී — key holders සඳහා Cursor CLI passthrough එක
`iss "omniroute" / aud "cursor-cli"` tokens නිකුත් කරයි — ඒවා කිසිවිටෙක සැසි නොවේ
(#13298).

`src/shared/utils/apiAuth.ts` හි `isDashboardSessionAuthenticated()` මගින් සත්යාපනය කෙරේ. එහි දින 30ක ආයු කාලයෙන් දින 7කට අඩු කාලයක් ඉතිරිව ඇති විට pipeline එක JWT ස්වයංක්රීයව refresh කරයි.

සැසියක් එහි දින 30 අවසන් වීමට පෙර ද අවසන් විය හැක, මන්ද සෑම නිකුත් කිරීමක්ම `mintDashboardSessionToken` හරහා සිදු වන බැවිනි (`iat` නිකුත් කළ වේලාවක් සහ `jti` හැඳුනුමක් සමඟ). Verifier එක සැකසුම් දෙකක් පරීක්ෂා කරයි: password එක වෙනස් කළ විට සකසන `sessionsValidAfter`, එමඟින් එයට පෙර නිකුත් කළ සෑම සැසියක්ම verify වීම නවත්වයි (password එක වෙනස් කළ browser එකට නැවුම් cookie එකක් ලැබේ), සහ sign out කළ සැසියේ `jti` එක `POST /api/auth/logout` මගින් එක් කරන `revokedDashboardSessions`. පැරණි release එකක් මගින් නිකුත් කළ සැසිවල claims දෙකම නොමැති අතර, පළමු password වෙනස් කිරීම තෙක් ඒවා වලංගුව පවතී. සැකසුම් කියවිය නොහැකි නම්, සැසිය විශ්වාස නොකෙරේ.

සමහර කළමනාකරණ routes එකක් හෝ වෙනත් මාදිලියක් පිළිගනී: cookie හෝ API key එකට `manage` (හෝ `admin`) scope එක ඇති විට `Bearer <key>` වේ. v3.8 හි එක් කළ "API calls මගින් වින්යාස කළ හැකි" workflow එක සක්රීය කරන්නේ මෙයයි.

#### විකල්ප OIDC login gate (#6973)

Default password login එකට අමතරව, dashboard පරිපාලක login එක opt-in OIDC (OpenID Connect) flow එකකට ද සහාය දක්වයි — password login කිසිවිටෙක ඉවත් නොකරන අතර, එයට අමතර පහසුකමක් ලෙස පමණක් එක් කරයි:

- `settings.oidcEnabled === true` **සහ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` සියල්ල වින්යාස කර ඇති විට පමණක් සක්රිය වේ (සැකසීම් → සත්යාපනය).
  එසේ නොමැති විට `GET /api/auth/oidc/login` මඟින් `400` ලබා දෙයි.
- `GET /api/auth/oidc/login` මඟින් issuer හි `/.well-known/openid-configuration` වෙතින්
  `authorization_endpoint` සොයා ගනී (`<issuer>/authorize` වෙත fallback වේ), පැමිණෙන ඉල්ලීම
  (`x-forwarded-proto` සලකා) මත redirect URI සාදා, අහඹු `state` අගයක්
  `httpOnly` `oidc_state` cookie එකක ගබඩා කරමින් IdP වෙත redirect කරයි.
- `GET /api/auth/oidc/callback` මඟින් `state` වලංගු කර, authorization
  code එක හුවමාරු කර, issuer හි JWKS හරහා (`jose` හි `createRemoteJWKSet`, JWKS URI එකකට
  cache කර) ID token හි අත්සන `issuer`/`audience` පරීක්ෂා සමඟ තහවුරු කරයි. Dashboard වෙත
  ඇතුළත් වීමට හිස් නොවන `oidcAllowedSubjects` ලැයිස්තුවක්, `oidcAdmissionClaim` ප්රතිපත්තියක්,
  හෝ දෙකම අවශ්ය වේ. `email_verified === true` වූ විට පමණක් subject ලැයිස්තුව
  `sub` හෝ `email` සමඟ ගැළපේ. විකල්ප claim ප්රතිපත්තිය මඟින් dot-separated ID-token
  claim මාර්ගයක් (උදාහරණයක් ලෙස, `realm_access.roles`) සහ පිළිගත් අගයන්ගේ array එකක්
  ලබා ගනී; විසඳූ claim එක strings වල array එකක් විය යුතු අතර අවම වශයෙන් එක් පිළිගත් අගයක්
  අඩංගු විය යුතුය. ප්රතිපත්ති දෙකම වින්යාස කර ඇත්නම්, දෙකම සාර්ථක විය යුතුය.
  අස්ථානගත හෝ වැරදි ආකාරයෙන් සැකසූ claims ආරක්ෂිතව අසමත් වන අතර, කිසිදු ප්රතිපත්තියක්
  නොමැති විට callback මඟින් login ප්රතික්ෂේප කරයි (`not_configured`). පවතින
  subject-only වින්යාසයන් වෙනසකින් තොරව දිගටම ක්රියා කරයි.
- Keycloak සාමාන්යයෙන් realm roles access tokens වෙත map කරයි; ඒවා අනිවාර්යයෙන්ම
  ID tokens වෙත map නොකරයි. `admin` realm role එක අවශ්ය කිරීමට, මෙම client සඳහා
  `realm_access.roles` එහි **ID token** තුළ ඇතුළත් කරන protocol mapper එකක් වින්යාස කර,
  `oidcAdmissionClaim` `{ "path": "realm_access.roles", "values": ["admin"] }` ලෙස
  සකසන්න. Role-only admission සක්රිය කිරීමට පෙර මෙම client සඳහා සත්ය ID-token claim එක
  පරීක්ෂා කරන්න; යෙදුම access-token roles කියවන්නේ නැත. IdP-පාර්ශ්වීය token ප්රතික්ෂේප කිරීම
  මෙම යෙදුම්-පාර්ශ්වීය පරීක්ෂාවට අමතර සහායක් විය හැකි නමුත් එය ප්රතිස්ථාපනය නොකරයි.
- සාර්ථක වූ විට, password login මඟින් නිකුත් කරන **හරියටම එම** දින 30ක
  `auth_token` JWT එක (`src/app/api/auth/login/route.ts`) නිකුත් කරයි. එබැවින් dashboard
  session pipeline හි ඉතිරි කොටස (ස්වයංක්රීය refresh, cookie flags) වෙනස් නොවේ —
  OIDC මඟින් වෙනස් කරන්නේ cookie එක නිකුත් කරන ආකාරය පමණි; එය ලබා දෙන අවසර වෙනස් නොකරයි.
  IdP roles/groups වෙත සිදු කරන වෙනස්කම් පවතින OmniRoute sessions අවලංගු නොකරයි; logout,
  password rotation, හෝ session expiry තවමත් ඒවායේ ආයු කාලය පාලනය කරයි.
- සෑම `oidc*` සැකසීමක්ම (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) තුළ ඇත:
  `PATCH /api/settings` මඟින් body එකේ management password එක `currentPassword` ලෙස
  නොමැති විට `400 PASSWORD_REQUIRED` ලබා දෙයි (එය වැරදි නම් `401 PASSWORD_MISMATCH`).
  `oidcDisablePasswordLogin` මඟින් password _login_ (`POST /api/auth/login`) ප්රතික්ෂේප
  කරන නමුත් ගබඩා කළ password hash එක තබා ගනී; නැවත සත්යාපනය තවමත්
  `currentPassword` එයට එරෙහිව පරීක්ෂා කරයි.
- `corsOrigins` සහ `bruteForceProtection` ද `SECURITY_IMPACTING_SETTINGS_KEYS` තුළ ඇත:
  ඒවා ලිහිල් කිරීම login ආරක්ෂණ දුර්වල කරන බැවින්, ඒවාට ද එම `currentPassword` නැවත
  සත්යාපනය අවශ්ය වේ (Security ටැබය එය ඉල්ලා සිටී), එසේම JSON import මඟින් ඒවා ඉවත් කරයි.
- සෑම security-policy key එකක්ම — `SECURITY_IMPACTING_SETTINGS_KEYS` entries,
  සෑම `oidc*` key එකක්ම සහ dashboard session state එක — `PATCH /api/settings` මත
  **operator-only** වේ: manage-scope API key එකක් හෝ `oma_` access token එකක් නිවැරදි
  `currentPassword` යැවූ විට පවා `403` සමඟ ප්රතික්ෂේප වේ. මෙම ප්රතික්ෂේප කිරීම
  `settings.update_failed` ලෙස `reason: OPERATOR_REQUIRED` සමඟ audit කරයි
  (`src/lib/api/operatorCredential.ts` හි `requireOperatorCredential()`).
  සාමාන්ය සැකසීම් (theme, display preferences) `manage` key එකකට හෝ
  `admin` access token එකකට ලිවිය හැකි ලෙස පවතී. `/api/settings` හිම (සහ
  `/api/settings/require-login` හි) සෑම mutation එකකටම `admin` access-token scope එක
  අවශ්ය වේ (`src/server/authz/accessScopes.ts` හි `ADMIN_MUTATION_EXACT_PATHS`,
  exact-path match); `GET` තවමත් `read` ලෙස පවතින අතර අනෙකුත් `/api/settings/*`
  sub-routes (proxies, combo defaults, model aliases, compression, purges…) සඳහා
  method-inferred `write` scope එක එලෙසම පවතී.
- `POST /api/settings/import-json` එම නැවත සත්යාපනය මඟ හරින බැවින්, ලිවීමට පෙර
  `IMPORT_STRIPPED_SETTINGS_KEYS` (එම ගොනුවේම) තුළ ඇති සෑම key එකක්ම ඉවත් කරයි:
  password සහ `currentPassword`, සෑම `SECURITY_IMPACTING_SETTINGS_KEYS` entry එකක්ම,
  සහ dashboard session state (`sessionsValidAfter`, `revokedDashboardSessions`).
  එබැවින් පැරණි backup එකක් import කිරීමෙන් password වෙනස් කිරීමකින් හෝ sign-out
  කිරීමකින් දැනටමත් අවසන් කළ session එකක් නැවත සක්රිය කළ නොහැක.

#### විකල්ප TOTP ද්වි-සාධක login (#16619)

Settings → Security වෙතින් ලියාපදිංචි කරයි; operator එය සක්රිය කරන තෙක් අක්රියව පවතී
(`src/server/auth/dashboardMfa.ts`).

- **එය ආවරණය කරන්නේ:** මුරපද පුරනය (`POST /api/auth/login`, ඉන්පසු
  `POST /api/auth/mfa/verify` අවශ්ය වේ) සහ `omniroute connect` (`POST /api/cli/connect`,
  මුරපදය පමණක් භාවිත කරන හුවමාරුවක් ප්රතික්ෂේප කර, කේතය `totp` ලෙස ගනී).
- **එය ආවරණය නොකරන්නේ:** OIDC / SSO පුරනය (`/api/auth/oidc/callback`) සඳහා
  OmniRoute TOTP ඉල්ලා නොසිටී. එය අනන්යතා සපයන්නාගේම දෙවන සාධකය මත රඳා පවතී,
  එබැවින් OIDC සක්රීය කර ඇත්නම් IdP තුළ MFA බලගන්වන්න.
- **ප්රතිසාධනය** (උපාංගය නැතිවීම, ප්රතිසාධන කේත ඉතිරි නොවීම, හෝ සාධකයක් තවදුරටත්
  සත්යාපනය කළ නොහැකි වීම, උදාහරණයක් ලෙස `STORAGE_ENCRYPTION_KEY` වෙනස් වූ පසු):
  1. `OMNIROUTE_DISABLE_MFA=true` සමඟ සේවාදායකය නැවත ආරම්භ කරන්න.
  2. සත්කාරකයේම (ලූප්බැක් peer සහ ලූප්බැක් `Host`, එනම්
     `http://localhost:20128` වැනි) මුරපදය භාවිතයෙන් පුරනය වන්න. දෙවන සාධකය එම
     origin එක සඳහා පමණක් මඟහැරේ; අනෙක් සෑම origin එකකටම තවමත් කේතය අවශ්ය වේ.
  3. Settings → Security → Disable වෙත ගොස්, මුරපදය ඇතුළත් කර කේතය හිස්ව තබන්න. `POST /api/auth/mfa/disable` මඟින් `code` නොමැති body එකක් පිළිගන්නේ විචල්යය සකසා ඇති විට සහ ඉල්ලීම සත්කාරකයෙන් පැමිණෙන විට පමණි; එයට තවමත් dashboard සැසිය සහ වත්මන් මුරපදය අවශ්ය වන අතර, එය `auth.mfa.disabled` ලෙස `secondFactor: "recovery_switch"` සමඟ audit කරනු ලැබේ.
  4. `OMNIROUTE_DISABLE_MFA` unset කර, සේවාදායකය නැවත ආරම්භ කරන්න. අවශ්ය නම් නැවත
     ලියාපදිංචි වන්න.

## මාර්ග පන්ති

`src/server/authz/types.ts` පන්ති තුනක් අර්ථ දක්වයි; තීරණාත්මකව වර්ගීකරණය කළ නොහැකි ඕනෑම මාර්ගයක් `MANAGEMENT` වෙත ආපසු වැටේ.

| පන්තිය       | විස්තරය                                                                                                                                             | සත්‍යාපනය අවශ්‍ය වේ                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `PUBLIC`     | පැහැදිලිවම ආරක්ෂිත මාර්ග — පිවිසීම, පිටවීම, තත්ත්වය, ආරම්භය, සෞඛ්‍යය, ඔන්බෝඩින් බූට්ස්ට්‍රැප්.                                                      | නැත                                                           |
| `CLIENT_API` | ආකෘති-සේවා endpoints — `/api/v1/*`, `/api/v1beta/*`, සහ අන්වර්ථ නාම `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | ඵලදායී `REQUIRE_API_KEY` විශේෂාංග ධජය සක්‍රිය විට Bearer යතුර |
| `MANAGEMENT` | ඩෑෂ්බෝඩ් පිටු, සැකසුම්, සපයන්නන්, යතුරු, පරිපාලක සහ රෝග විනිශ්චය endpoints.                                                                         | ඩෑෂ්බෝඩ් සැසිය හෝ `manage` විෂය පථය සහිත Bearer               |

`MANAGEMENT` ක්‍රියා කිහිපයක් **ක්‍රියාකරු-පමණක්** වේ: `manage` යතුරක් ප්‍රමාණවත් නොවේ. ගබඩා කළ අක්තපත්‍ර නිර්යාත කිරීම (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), දැනට පවතින දත්ත මත උපස්ථයක් ප්‍රත්‍යාස්ථාපනය කිරීම (`dryRun=true` ඇතුළුව `POST /api/db-backups/import`, id අනුව `POST /api/db-backups` ප්‍රත්‍යාස්ථාපනය, `POST /api/settings/import-json`), ප්‍රත්‍යාස්ථාපන ලක්ෂ්‍ය විනාශ කිරීම (`DELETE /api/db-backups` පිරිසිදු කිරීම, සහ `PATCH /api/db-backups` — එය ස්ථාවර කරන රඳවා ගැනීම සෑම උපස්ථයකින් පසු ස්වයංක්‍රීය කප්පාදුව පාලනය කරන නිසා) ඩෑෂ්බෝඩ් සැසියක්, දේශීය CLI විෂයක්, හෝ පිවිසුම අක්‍රිය කිරීමක් අවශ්‍ය කරයි. සමමුහුර්තකරණ ටෝකනයක් නිකුත් කිරීම (`POST /api/sync/tokens`) සහ `admin` CLI ප්‍රවේශ ටෝකනයක් ටංකනය කිරීම (`POST /api/cli/tokens`) සෑම පිවිසුම් ප්‍රකාරයකම ඩෑෂ්බෝඩ් සැසියක් හෝ දේශීය CLI විෂයක් අවශ්‍ය කරයි. ඕනෑම විෂය පථයක API යතුරු සහ `oma_` ප්‍රවේශ ටෝකන මෙහෙයුම්කරු අක්තපත්‍ර නොවේ: එකක් අවශ්‍ය වන විට ඒවාට `403` ලැබේ. පරීක්ෂාව `src/lib/api/operatorCredential.ts` හි ඇත (`resolveOperatorCredential()` / `requireOperatorCredential()`). පිවිසුම් සැකසුම් වෙනස් කිරීමද ක්‍රියාකරු-පමණකි: `POST /api/settings/require-login` (කළමනාකරණ මුරපදය සකසන / `requireLogin` මාරු කරන) මුරපදයක් පවතින විට පමණක් එම අක්තපත්‍ර පිළිගනී — පළමු-ධාවන ආරම්භක කවුළුව (තවම මුරපදයක් නැත) වෙනස් නොවේ — සහ ඩෑෂ්බෝඩ් සැසියක් මුරපදය ප්‍රතිස්ථාපනය කිරීමට `currentPassword` යැවිය යුතුය (එය නැති හෝ වැරදි නම් `403`, `settings.update_failed` ලෙස විගණනය කෙරේ). දේශීය CLI සහ පිවිසුම අක්‍රිය කළ අවස්ථාව ප්‍රතිසාධන මාර්ගය තබා ගන්නා අතර, දෙකම දත්ත නාමාවලිය හිමි සත්කාරකයට බැඳී ඇති නිසා, එය නොමැතිව මුරපදයක් සැකසිය හැක.

## පයිප්ලයින්

```
ඇතුළුවන ඉල්ලීම → src/proxy.ts
  → src/server/authz/pipeline.ts හි runAuthzPipeline()
    1. විශ්වාසදායක අභ්යන්තර headers ඉවත් කරන්න (x-omniroute-auth-*, x-omniroute-route-class)
    2. ඉල්ලීම් id එක ජනනය කර, classifyRoute() හරහා route එක වර්ගීකරණය කරන්න
    3. pathname == "/" නම් → /dashboard වෙත redirect කරන්න
    4. draining (සුමට වසා දැමීම) සහ /api/* නම් → 503
    5. non-GET /api/* නම් → checkBodySize() guard පරීක්ෂා කරන්න
    6. OPTIONS නම් → CORS preflight 204
    7. options.enforce == false නම් → route-class headers සමඟ pass-through කරන්න
    8. එසේ නොමැතිනම්: POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} සලකුණු කර → NextResponse.next()
       - reject → correlation_id සහිත JSON දෝෂයක් (dashboard pages → 302 /login)
```

`src/server/authz/headers.ts` හි අර්ථ දක්වා ඇති විශ්වාසදායක අභ්යන්තර headers, වර්ගීකරණයට පෙර **ඇතුළුවන ඉල්ලීම්වලින් ඉවත් කරනු ලැබේ** — clients හට subject කෙනෙකු ලෙස ව්යාජ ලෙස පෙනී සිටීමට `x-omniroute-auth-*` පෙර-පිරවිය නොහැක.

### Policy ගිවිසුම්

සෑම route class එකකටම `src/server/authz/policies/` තුළ policy එකක් ඇත:

- **`publicPolicy`** (`policies/public.ts`) — සෑම විටම `allow({ kind: "anonymous", id: "anonymous" })` ලබා දෙයි.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer එක උපුටාගෙන, `validateApiKey()` හරහා වලංගු කරයි. සක්රීය `REQUIRE_API_KEY` feature flag එක අක්රිය කර ඇති විට පමණක් anonymous වෙත fallback වේ. සක්රීය flag එක `isRequireApiKeyEnabled()` හරහා විසඳනු ලැබේ (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), එබැවින් Dashboard Feature Flags සහ environment variables `/api/v1/*`, `/api/v1beta/*`, සහ aliases සඳහා එකම ආකාරයෙන් බලපායි; resolver අසමත් වුවහොත් ප්රවේශය ආරක්ෂිතව වසා දමනු ලැබේ. Client API routes මත dashboard-session requests සඳහාද අවසර දෙයි (`/api/v1/models` ඇතුළුව, එය dashboard model catalog එක භාවිත කරයි).
  Entra ID SSO සක්රීය කර ඇති විට, ව්යුහාත්මකව Entra token එකක් වන Bearer එකක් (base64url segments තුනක්, `RS*` alg එකක්, `kid`) `validateApiKey()` ට පෙර SSO branch එක මඟින් හසුරුවනු ලබන අතර එහි verdict එක අවසාන වේ — එය කිසිවිටෙක API-key path වෙත හෝ degrade-to-anonymous branch වෙත fallback නොවේ. එබැවින් identity-provider outage එකක් open access බවට පත්විය නොහැක. Static API keys වලට බලපෑමක් නැත. [Entra ID SSO](../security/ENTRA_SSO.md) බලන්න.
- **`managementPolicy`** (`policies/management.ts`) — dashboard session, අභ්යන්තර model-sync requests (`/api/providers/[name]/(sync-models|models)` සමඟ ගැළපෙන) පිළිගනී, නැතහොත් `isAuthRequired()` මඟින් false ලබා දෙන්නේ නම් සම්පූර්ණයෙන්ම මඟ හරියි. Bearer token එකක් තිබුණත් එය වලංගු නොවේ නම් 403 (`AUTH_001`) ලබා දෙයි; අනෙක් අවස්ථාවල 401 ලබා දෙයි. ඕනෑම auth branch එකකට පෙර route-guard tiers (LOCAL_ONLY / ALWAYS_PROTECTED) ද බලාත්මක කරයි — [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) බලන්න. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` හි ඇති LOCAL_ONLY paths (දැනට: `/api/mcp/`) වෙත Bearer key එක `manage` scope එක රැගෙන යන්නේ නම් non-loopback ස්ථානයකින් ප්රවේශ විය හැක; අනෙකුත් සියලුම LOCAL_ONLY paths scope එක නොසලකා strict-loopback ලෙස පවතී.

සාර්ථක policy එකක් `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` සහිත `AuthSubject` එකක් ලබා දෙයි. නැවත auth logic ධාවනය කිරීම වෙනුවට downstream handlers හට එය `src/server/authz/assertAuth.ts` හි `assertAuth(request, "CLIENT_API")` හරහා කියවිය හැක.

## පොදු මාර්ග ලැයිස්තුව

`src/shared/constants/publicApiRoutes.ts` යනු පැහැදිලිව නිර්වචනය කළ අවසර ලැයිස්තුවකි:

මෙම ලැයිස්තුව **හැඩය** අනුව කොටස් කර ඇති අතර, මෙම වෙන් කිරීම ඉතා වැදගත් වේ (GHSA-74g9-q8f6-793h): prefix එකක්
`startsWith()` සමඟ ගැළපෙන බැවින්, එය ආරම්භක අක්ෂර එකම වන සෑම යාබද මාර්ගයකටම ගැළපේ.
`/api/usage/om-usage` prefix එකක් ලෙස `/api/usage/om-usage<anything>` PUBLIC ලෙස සලකන අතර, Next එය
`/api/usage/[connectionId]` වෙත විසඳයි — එය තමන්ටම authentication නොමැති handler එකකි.

```ts
// සැබෑ උප-ගස්. සෑම entry එකක්ම "/" න් අවසන් විය යුතුය (unit test එකකින් තහවුරු කරයි).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify තුළ CLIENT_API ලෙස සලකයි, "no-auth public" ලෙස නොවේ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// තනි මාර්ග, අවසාන slash එකක් සමඟ හෝ රහිතව, EXACT ලෙස ගැළපේ.
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP සඳහා login පියවර 2; MFA-pending cookie අවශ්ය වේ
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS origin ලිහිල් කිරීමද ලබාගන්නා, කියවීමට පමණක් සීමා වූ තනි මාර්ග.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ලිහිල් කිරීම නොමැති, කියවීමට පමණක් සීමා වූ තනි මාර්ගය.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

කියවීමට පමණක් සීමා වූ මාර්ග, ආරක්ෂිත methods සඳහා පමණක් පොදු වේ. සටහන: `classifyRoute()` PUBLIC fall-through වෙතින් `/api/v1/*` සහ `/api/v1beta/*` ඉවත් කරයි — එම මාර්ග සෑමවිටම `CLIENT_API` වන බැවින් Bearer-key ප්රතිපත්තිය තවදුරටත් ක්රියාත්මක වේ.

## නව මාර්ගයක් එක් කිරීම

### රටාව 1 — පොදු සේවාලාභී API අන්ත ලක්ෂ්යය (Bearer-auth)

`/api/v1/` සහ `/api/v1beta/` යටතේ ඇති මාර්ග ස්වයංක්රීයව `CLIENT_API` ලෙස වර්ගීකරණය කෙරේ. Middleware එක Bearer පරීක්ෂාව බලාත්මක කරයි; මාර්ග හසුරුවනවලට එය නැවත සිදු කිරීමට අවශ්ය නැත, නමුත් ප්රයෝජනවත් නම් subject එක කියවිය හැක.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... හසුරුවන තර්කනය
}
```

### රටාව 2 — කළමනාකරණ අන්ත ලක්ෂ්යය (session හෝ Bearer + manage)

`src/lib/api/requireManagementAuth.ts` වෙතින් `requireManagementAuth()` භාවිත කරන්න:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... හසුරුවන තර්කනය
}
```

`requireManagementAuth()` සාර්ථක වූ විට `null` හෝ JSON දෝෂ `Response` එකක් ආපසු ලබා දෙයි:

- 401 `AUTH_001` "සත්යාපනය අවශ්යයි" — කිසිදු අක්තපත්රයක් නොමැත
- 403 — වලංගු නොවන Bearer එකක් **හෝ** Bearer එකක් තිබුණත් යතුරට `manage` / `admin` විෂය පථය නොමැත

`hasManageScope(scopes)` විසින් `"manage"` හෝ `"admin"` සඳහා true ලබා දෙයි.

### රටාව 3 — පොදු අවසර ලැයිස්තුවට එක් කිරීම

පහසුව අනුව නොව, හැඩය අනුව කට්ටලය තෝරන්න. එක් මාර්ගයක් `PUBLIC_API_ROUTES_EXACT` තුළට යයි (නැතහොත් GET සඳහා පමණක් නම් `PUBLIC_READONLY_CORS_API_ROUTES` තුළට); සැබෑ උපවෘක්ෂයක් පමණක් `PUBLIC_API_ROUTE_PREFIXES` තුළට යන අතර, එය **`/` අක්ෂරයෙන් අවසන් විය යුතුය**. තනි මාර්ගයක් උපසර්ග ලැයිස්තුවට දැමීමෙන්, පසුව එක් කරන ගතික-ඛණ්ඩ සහෝදර මාර්ග ඇතුළුව, එහි ආරම්භක අක්ෂර බෙදාගන්නා සෑම යාබද මාර්ගයක්ම ද ප්රකාශයට පත් වේ (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` සහ `tests/unit/authz/classify.test.ts` හි ඒකක පරීක්ෂණ යාවත්කාලීන කරන්න.

## විෂය පථ

අවකාශ තුනක්. එක් එක් පරීක්ෂකයා කියවන්නේ තමන්ගේම තන්තු පමණි.
`manage` `read:compression` සඳහා `scopeMatches` අසමත් වන්නේ ඇයිද යන්න සහ
`read` ප්රවේශ ටෝකනයකට `PATCH /api/keys/{id}` කළ නොහැක්කේ මන්ද යන්න ඇතුළුව,
පැත්තෙන් පැත්තට විස්තරය [අවකාශ නාමාවලිය තුනක්](../frameworks/MCP-SERVER.md#three-scope-namespaces) හි ඇත.

API යතුරු `scopes` අරාවක් දරයි (`api_keys.scopes` හි JSON ලෙස ගබඩා කර ඇත, `src/lib/db/apiKeys.ts` බලන්න).

### කළමනාකරණ විෂය පථය

- `manage` / `admin` — `hasManageScope`. කළමනාකරණ API මාර්ග වෙත Bearer ප්රවේශය.
- `mcp:connect`, `self:usage`, `self:account-quota`, සහ
  `policy:bypass-provider-quota` යනු එකතු කළ හැකි නිශ්චිත-ගැලපෙන විෂය පථ වේ. ඒවා
  `MANAGEMENT_API_KEY_SCOPES` වලින් පිටත පිහිටා ඇත. `mcp:connect` විවෘත කරන්නේ
  `/api/mcp/` non-loopback carve-out පමණි.

### MCP මෙවලම් විෂය පථ

නාමාවලිය සහ ගැලපෙන නීති (එකම තන්තුව, හෝ `*` වලින් අවසන් වන ලබා දුන් විෂය පථයක්):
[MCP මෙවලම් විෂය පථ](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`src/shared/constants/mcpScopes.ts` හි ඇති `MCP_SCOPE_LIST` යනු මුල් ටයිප් කරන ලද
උප කුලකය මිස සම්පූර්ණ නාමාවලිය නොවේ. බලාත්මක කිරීම
`open-sse/mcp-server/scopeEnforcement.ts` හි `resolveCallerScopeContext()`
MCP සත්යාපන තොරතුරු, ඉල්ලීම් පාර-දත්ත, හෝ `OMNIROUTE_MCP_SCOPES` වෙතින් විෂය පථ
විසඳීමෙන් පසුව ක්රියාත්මක වේ. `OMNIROUTE_MCP_ENFORCE_SCOPES=true` නොවන තාක් කල් එය
ක්රියා විරහිතව පවතී.

### ප්රවේශ-ටෝකන විෂය පථ

`oma_live_…` ටෝකන මත `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) මගින් ශ්රේණිගත කර ඇත. මෙම ශ්රේණිය අදාළ වන්නේ
ප්රවේශ-ටෝකන අක්තපත්රයට පමණි. [කළමනාකරණ සත්යාපනය](../guides/MANAGEMENT-AUTH.md) බලන්න.

## Auth අවශ්‍ය ටොගලය

`src/shared/utils/apiAuth.ts` හි `isAuthRequired()` මගින් ඕනෑම ඉල්ලීමක් සඳහා **ඕනෑම** සත්‍යාපනයක් බලාත්මක කළ යුතුද යන්න තීරණය කරයි:

- `settings.requireLogin === false` → සත්‍යාපනය ගෝලීයව අක්‍රියයි, මුල්-ආරක්ෂිත ස්ථරය ([Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) සහ එය පිළිගන්නා අක්තපත්‍රය ලබා දෙන ඇමතුම් හැර — ඒවාට පිවිසුම ක්‍රියාත්මක විට ලෙසම එම අක්තපත්‍රයක් අවශ්‍යයි: සමමුහුර්ත ටෝකන නිකුත් කිරීම, ඕනෑම විෂය පථයකින් CLI ප්‍රවේශ ටෝකන ටංකනය කිරීම, සහ `manage`/`admin` විෂය පථය සහිත API යතුරක් සෑදීම, එම විෂය පථය යතුරකට ලබාදීම, හෝ එවැනි යතුරක් යළි උත්පාදනය කිරීම හෝ හෙළි කිරීම (`src/lib/api/requireManagementAuth.ts` හි `requireCredentialForManagementScopedKey()`). ඇතුළත් කිරීම-පමණක් යතුරු විවෘතව පවතී.
- මුරපදයක් සකසා නොමැති **සහ** `INITIAL_PASSWORD` පරිසර විචල්‍යක් නොමැති → ආරම්භක මාදිලිය ඔන්බෝඩින් වීසාර්ඩය සහ loopback ඉල්ලීම් ඉඩ දෙයි, නමුත් නිරාවරණය වූ ජාල ඉල්ලීම්වලට තවමත් අක්තපත්‍ර අවශ්‍යයි.
- ඕනෑම DB දෝෂයක් → අසාර්ථක-වැසීම (ආරක්ෂිත-පෙරනිමිය).

Client API යතුරු බලාත්මක කිරීම `src/shared/utils/featureFlags.ts` හි `isRequireApiKeyEnabled()` භාවිතා කරයි, සෘජු `process.env.REQUIRE_API_KEY` කියවීමක් නොවේ. මෙය යෙදවූ උදාහරණ සඳහා වැදගත්ය: ඩෑෂ්බෝඩ් → Feature Flags හි `REQUIRE_API_KEY` ටොගල් කිරීම DB අභිබවා යාමක් ගබඩා කර `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` සහ මෙම උපයෝගිතාව බෙදාගන්නා අනෙකුත් client-API සත්‍යාපන පරීක්ෂා වලට වහාම බලපායි. විශේෂාංග ධජ ගබඩාව කියවිය නොහැකි නම්, client API සත්‍යාපනය අසාර්ථක-වැසෙන අතර යතුරක් අවශ්‍ය කරයි.

## පසුගාමී අනුකූලතාව බිඳ දමන වෙනස — v3.8.0

`/api/v1/agents/tasks/*` සහ `/api/resilience/model-cooldowns` අන්ත ලක්ෂ්ය සඳහා **දැන් කළමනාකරණ සත්යාපනය අවශ්ය වේ** (`588a0333` commit එක). මීට පෙර `manage` විෂය පථය නොමැති සාමාන්ය API යතුරක් යැවූ සේවාලාභීන්ට `403` ලැබේ. සංක්රමණය: API Keys dashboard එකෙන් යතුරට `manage` විෂය පථය නිකුත් කරන්න, නැතහොත් පුරනය වූ dashboard සැසියක් භාවිත කරන්න.

## හැසිරීම් වෙනස — v3.8.2

`/api/mcp/*` (දුරස්ථ MCP සේවාදායකය) පෙරනිමියෙන් තවමත් LOCAL_ONLY වන නමුත්, `Authorization: Bearer <api-key>` ශීර්ෂය තුළ `manage` විෂය පථය තිබේ නම් එය දැන් loopback නොවන ඉල්ලීම් පිළිගනී. මෙම ව්යතිරේකය `src/server/authz/routeGuard.ts` තුළ ඇති `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` හරහා එක් එක් මාර්ගය අනුව පැහැදිලිව පාලනය කෙරේ; එයට සම මට්ටමේ LOCAL_ONLY උපසර්ගය වන `/api/cli-tools/runtime/*` මඟ හැරිය නොහැකි ලෙස හිතාමතා සකසා ඇත, මන්ද එයට අභිමත උපක්රියාවලි ආරම්භ කළ හැකි බැවිනි. loopback නොවන ස්ථානවලින් `/api/mcp/*` වෙත එන නිර්නාමික ඉල්ලීම් දිගටම `403 LOCAL_ONLY` ආපසු ලබා දෙයි — ඕනෑම නව LOCAL_ONLY මාර්ගයක් සඳහා පෙරනිමිය දැඩි-loopback ලෙසම පවතී. [මාර්ග ආරක්ෂක ස්ථර](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) බලන්න.

## පරීක්ෂණ

- ඒකක පරීක්ෂණ: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- පොදු අවසර ලැයිස්තුව: `tests/unit/public-api-routes.test.ts`.
- ඉලක්කගතව ධාවනය කරන්න: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## දෝෂ නිදොස්කරණය

Pipeline එක සෑම ප්රතිචාරයකටම පහත ඒවා එක් කරයි:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

සත්යාපනය කළ ඉල්ලීම් සඳහා upstream (handler-side) ඉල්ලීම් headers තුළ පහත ඒවා ද ඇතුළත් වේ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Handlers තුළ `assertAuth(req, expectedClass)` භාවිත කරන්න — middleware එක මඟහැරී ඇත්නම්, එය `AUTHZ_NOT_INITIALIZED` code එක සහිත `AuthzAssertionError` එකක් throw කරයි (tests තුළ configuration regressions හඳුනා ගැනීමට මෙය උපකාරී වේ).

## තවදුරටත් බලන්න

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — එක් එක් අන්ත ලක්ෂ්යය සඳහා සත්යාපන සලකුණ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — සත්යාපන සිදුවීම් සඳහා විගණන ලොගය
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — විෂය පථ නාම අවකාශ තුනක් සහ MCP මෙවලම්-විෂය පථ නාමාවලිය
- මූලාශ්රය: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
