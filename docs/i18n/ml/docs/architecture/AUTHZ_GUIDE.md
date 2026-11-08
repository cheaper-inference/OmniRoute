# Authorization Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **വിശ്വസനീയമായ ഉറവിടം:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:** 2026-09-22 — സ്കോപ്പ് നെയിംസ്പേസുകൾ MCP-SERVER.md-ലേക്ക് വിരൽ ചൂണ്ടുന്നു

ഓരോ API അഭ്യർത്ഥനകളെയും നിയന്ത്രിക്കുന്ന ഒരു റൂട്ട്-അവബോധമുള്ള ഓതറൈസേഷൻ പൈപ്പ്ലൈൻ OmniRoute-നുണ്ട്. വർഗ്ഗീകരണം **നിർണ്ണായകവും** **ഫെയിൽ-ക്ലോസ്ഡും** ആണ് — വർഗ്ഗീകരിക്കാൻ കഴിയാത്ത എന്തും `MANAGEMENT` ആയി മാറുകയും ഒരു സെഷനോ മാനേജ്മെൻ്റ്-ഗ്രേഡ് ടോക്കണോ ആവശ്യപ്പെടുകയും ചെയ്യും. റൂട്ടുകൾ പരിപാലിക്കുന്ന അല്ലെങ്കിൽ പുതിയ എൻഡ്പോയിന്റുകൾ രൂപകൽപ്പന ചെയ്യുന്ന എഞ്ചിനീയർമാർക്കായി ഈ പേജ് മോഡൽ വിശദീകരിക്കുന്നു.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ഉറവിടം: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## രണ്ട് Auth മോഡുകൾ

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-യുമായി പൊരുത്തപ്പെടുന്ന ക്ലയന്റ് API-കൾക്കും, കീയ്ക്ക് `manage` സ്കോപ്പ് ഉള്ളപ്പോൾ ചില മാനേജ്മെന്റ് റൂട്ടുകൾക്കും ഉപയോഗിക്കുന്നു.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`-ലുള്ള `isValidApiKey()` / `extractApiKey()` ഉപയോഗിച്ച് സാധുത പരിശോധിക്കുന്നു; തുടർന്ന് `src/shared/utils/apiAuth.ts` വഴി വീണ്ടും എക്സ്പോർട്ട് ചെയ്യുന്നു. `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` എൻവ് വേരിയബിളുകളെയും സ്ഥിരമായ passthrough കീകളായി validator സ്വീകരിക്കുന്നു (issue #1350).

### 2. Dashboard Session (auth_token cookie)

ഡാഷ്ബോർഡ് പേജുകൾക്കും അഡ്മിൻ പ്രവർത്തനങ്ങൾക്കും.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT പരിശോധിച്ച് സാധുവാണെന്നും അതിൽ `authenticated: true` ഉൾപ്പെട്ടിട്ടുണ്ടെന്നും ഉറപ്പാകുമ്പോഴാണ് ഒരു കുക്കി സെഷനായി കണക്കാക്കുന്നത്
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). കുക്കി ഉപയോഗിക്കുന്ന എല്ലാ ഉപഭോക്താക്കളും (ഡാഷ്ബോർഡ് റൂട്ട് ഗാർഡ് (`isDashboardSessionAuthenticated()`), authz പൈപ്പ്ലൈൻ റിഫ്രഷ്, WebSocket ഹാൻഡ്ഷേക്ക്, ലൈവ് സെർവർ, `/api/settings/require-login`, `/api/auth/status`) ഈ ഹെൽപ്പറിലൂടെയാണ് പോകുന്നത്.
`JWT_SECRET` ഉപയോഗിച്ച് സൈൻ ചെയ്ത മറ്റ് JWT-കളും നിലവിലുണ്ട് — കീ കൈവശമുള്ളവർക്കായി Cursor CLI passthrough `iss "omniroute" / aud "cursor-cli"` ടോക്കണുകൾ സൃഷ്ടിക്കുന്നു — എന്നാൽ അവ ഒരിക്കലും സെഷനുകളല്ല
(#13298).

`src/shared/utils/apiAuth.ts`-ലുള്ള `isDashboardSessionAuthenticated()` ഉപയോഗിച്ച് പരിശോധിക്കുന്നു. 30 ദിവസത്തെ ആയുസ്സിൽ 7 ദിവസത്തിൽ താഴെ മാത്രം ശേഷിക്കുമ്പോൾ പൈപ്പ്ലൈൻ JWT സ്വയമേവ റിഫ്രഷ് ചെയ്യുന്നു.

ഓരോ മിന്ററും `mintDashboardSessionToken` വഴിയാണ് പോകുന്നത് (`iat` എന്ന issue time-വും `jti` എന്ന id-യും ഉൾപ്പെടെ), കൂടാതെ verifier രണ്ട് ക്രമീകരണങ്ങൾ പരിശോധിക്കുന്നതിനാലും ഒരു സെഷൻ അതിന്റെ 30 ദിവസം പൂർത്തിയാകുന്നതിന് മുമ്പ് അവസാനിക്കാം: `sessionsValidAfter`, പാസ്വേഡ് മാറ്റുമ്പോൾ സജ്ജീകരിക്കപ്പെടുന്നതും അതിന് മുമ്പ് നൽകിയ എല്ലാ സെഷനുകളും ഇനി പരിശോധിക്കപ്പെടാതിരിക്കാൻ കാരണമാകുന്നതും (പാസ്വേഡ് മാറ്റിയ ബ്രൗസറിന് പുതിയ കുക്കി ലഭിക്കും), കൂടാതെ സൈൻ ഔട്ട് ചെയ്ത സെഷന്റെ `jti` `POST /api/auth/logout` ചേർക്കുന്ന `revokedDashboardSessions` എന്നതും. പഴയ റിലീസിൽ മിന്റ് ചെയ്ത സെഷനുകളിൽ ഈ ക്ലെയിമുകളൊന്നും ഉണ്ടാകില്ല; അതിനാൽ ആദ്യ പാസ്വേഡ് മാറ്റം വരെ അവ സാധുവായിരിക്കും. ക്രമീകരണങ്ങൾ വായിക്കാൻ കഴിയുന്നില്ലെങ്കിൽ, സെഷനെ വിശ്വസിക്കില്ല.

ചില മാനേജ്മെന്റ് റൂട്ടുകൾ **ഇരുവിധ മോഡുകളിലേതും** സ്വീകരിക്കുന്നു: API കീയ്ക്ക് `manage` (അല്ലെങ്കിൽ `admin`) സ്കോപ്പ് ഉള്ളപ്പോൾ കുക്കി അല്ലെങ്കിൽ `Bearer <key>`. v3.8-ൽ ചേർത്ത "configurable via API calls" പ്രവർത്തനരീതി സാധ്യമാക്കുന്നത് ഇതാണ്.

#### ഐച്ഛിക OIDC ലോഗിൻ ഗേറ്റ് (#6973)

ഡാഷ്ബോർഡ് അഡ്മിൻ ലോഗിൻ, ഡിഫോൾട്ട് പാസ്വേഡ് ലോഗിനോടൊപ്പം opt-in OIDC (OpenID Connect) പ്രവാഹവും പിന്തുണയ്ക്കുന്നു — പാസ്വേഡ് ലോഗിൻ ഒരിക്കലും നീക്കം ചെയ്യില്ല; പകരം അതിന് അനുബന്ധമായി മാത്രമേ ഇത് ചേർക്കൂ:

- `settings.oidcEnabled === true` **ആയിരിക്കണമെന്നും** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` എന്നിവയെല്ലാം ക്രമീകരിച്ചിരിക്കണമെന്നും ഉള്ളപ്പോൾ മാത്രമേ പ്രവർത്തിക്കൂ (Settings → Auth).
  അല്ലാത്തപക്ഷം `GET /api/auth/oidc/login` `400` നൽകും.
- `GET /api/auth/oidc/login`, issuer-ന്റെ
  `/.well-known/openid-configuration`-ൽ നിന്ന് `authorization_endpoint` കണ്ടെത്തുന്നു
  (`<issuer>/authorize` fallback ആയി ഉപയോഗിക്കുന്നു), വരുന്ന request-ൽ നിന്ന് redirect URI
  നിർമ്മിക്കുന്നു (`x-forwarded-proto` പരിഗണിച്ച്), കൂടാതെ random ആയ `state` ഒരു
  `httpOnly` `oidc_state` cookie-യിൽ സൂക്ഷിച്ച് IdP-യിലേക്ക് redirect ചെയ്യുന്നു.
- `GET /api/auth/oidc/callback`, `state` സാധൂകരിക്കുകയും authorization
  code കൈമാറുകയും issuer-ന്റെ JWKS ഉപയോഗിച്ച് ID token-ന്റെ signature പരിശോധിക്കുകയും ചെയ്യുന്നു
  (`jose`-ന്റെ `createRemoteJWKSet`, JWKS URI-പ്രതി cached ആയി), കൂടാതെ
  `issuer`/`audience` പരിശോധനകളും നടത്തുന്നു. Dashboard-ലേക്കുള്ള പ്രവേശനത്തിന്
  ശൂന്യമല്ലാത്ത `oidcAllowedSubjects` പട്ടികയോ, ഒരു `oidcAdmissionClaim` നയമോ,
  അല്ലെങ്കിൽ രണ്ടും ആവശ്യമാണ്. `email_verified === true` ആയിരിക്കുമ്പോൾ മാത്രമേ
  subject പട്ടിക `sub` അല്ലെങ്കിൽ `email`-നുമായി പൊരുത്തപ്പെടൂ. ഐച്ഛികമായ claim
  policy, ഡോട്ട് ഉപയോഗിച്ച് വേർതിരിച്ച ID-token claim path (ഉദാഹരണത്തിന്,
  `realm_access.roles`) കൂടാതെ അംഗീകരിച്ച മൂല്യങ്ങളുടെ ഒരു array സ്വീകരിക്കുന്നു;
  പരിഹരിച്ച claim, അംഗീകരിച്ച മൂല്യങ്ങളിൽ കുറഞ്ഞത് ഒന്ന് ഉൾക്കൊള്ളുന്ന strings-ന്റെ
  array ആയിരിക്കണം. രണ്ട് policies-വും ക്രമീകരിച്ചിട്ടുണ്ടെങ്കിൽ, രണ്ടും വിജയിക്കണം.
  ഇല്ലാത്തതോ തെറ്റായ രൂപത്തിലുള്ളതോ ആയ claims സുരക്ഷിതമായി പരാജയപ്പെടും; രണ്ട്
  policies-ലൊന്നും ഇല്ലെങ്കിൽ callback login നിരസിക്കും (`not_configured`).
  നിലവിലുള്ള subject-only configurations മാറ്റമില്ലാതെ തുടരും.
- Keycloak സാധാരണയായി realm roles access tokens-ലേക്കാണ് map ചെയ്യുന്നത്, ID
  tokens-ലേക്ക് നിർബന്ധമായും അല്ല. `admin` എന്ന realm role ആവശ്യപ്പെടാൻ, ഈ
  client-ിനായി `realm_access.roles` അതിന്റെ **ID token**-ൽ ഉൾപ്പെടുത്തുന്ന ഒരു
  protocol mapper ക്രമീകരിക്കുക; തുടർന്ന് `oidcAdmissionClaim` ആയി
  `{ "path": "realm_access.roles", "values": ["admin"] }` സജ്ജമാക്കുക.
  role-only admission പ്രവർത്തനക്ഷമമാക്കുന്നതിന് മുമ്പ് ഈ client-ന്റെ യഥാർത്ഥ
  ID-token claim പരിശോധിക്കുക; application access-token roles വായിക്കുന്നില്ല.
  IdP-വശത്തുള്ള token refusal ഇതിന് പുറമേ സഹായിക്കാം, എന്നാൽ ഈ application-വശത്തുള്ള
  പരിശോധനയ്ക്ക് പകരമാകില്ല.
- വിജയിക്കുമ്പോൾ password login നൽകുന്ന അതേ **കൃത്യമായ** 30-ദിവസത്തെ
  `auth_token` JWT ഇത് mint ചെയ്യുന്നു (`src/app/api/auth/login/route.ts`); അതിനാൽ
  dashboard session pipeline-ന്റെ ശേഷിക്കുന്ന ഭാഗം (auto-refresh, cookie flags)
  മാറ്റമില്ലാതെ തുടരും — cookie എങ്ങനെ mint ചെയ്യപ്പെടുന്നു എന്നത് മാത്രമാണ് OIDC
  മാറ്റുന്നത്, അത് നൽകുന്ന അധികാരങ്ങൾ അല്ല. IdP roles/groups-ലുള്ള മാറ്റങ്ങൾ
  നിലവിലുള്ള OmniRoute sessions അസാധുവാക്കില്ല; logout, password rotation, അല്ലെങ്കിൽ
  session expiry തന്നെയാണ് അവയുടെ കാലാവധി നിയന്ത്രിക്കുന്നത്.
- എല്ലാ `oidc*` settings-ുകളും (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`)
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ൽ ഉൾപ്പെടുന്നു
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  body-യിൽ management password `currentPassword` ആയി നൽകിയിട്ടില്ലെങ്കിൽ
  `400 PASSWORD_REQUIRED` നൽകും (`currentPassword` തെറ്റാണെങ്കിൽ
  `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin`, password _login_
  (`POST /api/auth/login`) നിരസിക്കും, എന്നാൽ സൂക്ഷിച്ചിരിക്കുന്ന password hash
  നിലനിർത്തും; re-auth ഇപ്പോഴും അതിനെതിരെ `currentPassword` പരിശോധിക്കും.
- `corsOrigins`, `bruteForceProtection` എന്നിവയും
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ൽ ഉൾപ്പെടുന്നു: ഇവയിൽ ഏതെങ്കിലും ഇളവാക്കുന്നത്
  login പ്രതിരോധങ്ങളെ ദുർബലപ്പെടുത്തുന്നതിനാൽ, ഇവയ്ക്കും അതേ
  `currentPassword` re-auth ആവശ്യമാണ് (Security tab അത് ആവശ്യപ്പെടുന്നു), കൂടാതെ
  JSON import ഇവ ഒഴിവാക്കും.
- എല്ലാ security-policy keys-ുകളും — `SECURITY_IMPACTING_SETTINGS_KEYS`-ലെ
  entries, എല്ലാ `oidc*` keys-ുകളും, dashboard session state-ും — `PATCH /api/settings`-
  ൽ **operator-only** ആണ്: manage-scoped API key അല്ലെങ്കിൽ `oma_` access token
  ശരിയായ `currentPassword` അയച്ചാലും `403` നൽകി നിരസിക്കും; ഈ നിരസിക്കൽ
  `settings.update_failed` ആയി `reason: OPERATOR_REQUIRED` സഹിതം audit ചെയ്യപ്പെടും
  (`src/lib/api/operatorCredential.ts`-ലെ `requireOperatorCredential()`).
  സാധാരണ settings (theme, display preferences) ഒരു `manage` key-ക്കോ
  `admin` access token-ക്കോ എഴുതാവുന്നതായി തുടരും. `/api/settings`-ലുള്ള ഓരോ
  mutation-നും (കൂടാതെ `/api/settings/require-login`-ലുള്ളതിന്നും)
  `admin` access-token scope ആവശ്യമാണ്
  (`src/server/authz/accessScopes.ts`-ലെ `ADMIN_MUTATION_EXACT_PATHS`,
  exact-path match); `GET` ഇപ്പോഴും `read` ആയി തുടരും, മറ്റ്
  `/api/settings/*` sub-routes (proxies, combo defaults, model aliases, compression,
  purges…) method-inferred `write` scope തന്നെ നിലനിർത്തും.
- `POST /api/settings/import-json` ആ re-auth ഒഴിവാക്കുന്നതിനാൽ, എഴുതുന്നതിന് മുമ്പ്
  `IMPORT_STRIPPED_SETTINGS_KEYS`-ലുള്ള എല്ലാ keys-ുകളും (അതേ file) നീക്കം ചെയ്യും:
  password, `currentPassword`, എല്ലാ `SECURITY_IMPACTING_SETTINGS_KEYS` entries-ുകളും,
  കൂടാതെ dashboard session state (`sessionsValidAfter`, `revokedDashboardSessions`).
  അതിനാൽ പഴയ backup import ചെയ്താലും password change അല്ലെങ്കിൽ sign-out ഇതിനകം
  അവസാനിപ്പിച്ച session വീണ്ടും സജീവമാക്കാൻ കഴിയില്ല.

#### ഐച്ഛിക TOTP two-factor login (#16619)

Settings → Security-ൽ നിന്ന് enroll ചെയ്യുന്നു; operator ഇത് പ്രവർത്തനക്ഷമമാക്കുന്നതുവരെ
ഓഫ് ആയിരിക്കും (`src/server/auth/dashboardMfa.ts`).

- **ഇത് ഉൾക്കൊള്ളുന്നത്:** പാസ്വേഡ് ലോഗിൻ (`POST /api/auth/login`, അതിന് ശേഷം
  `POST /api/auth/mfa/verify` ആവശ്യമാണ്), കൂടാതെ `omniroute connect` (`POST /api/cli/connect`,
  പാസ്വേഡ് മാത്രമുള്ള കൈമാറ്റം നിരസിക്കുകയും കോഡ് `totp` ആയി സ്വീകരിക്കുകയും ചെയ്യുന്നു).
- **ഇത് ഉൾക്കൊള്ളാത്തത്:** OIDC / SSO സൈൻ-ഇൻ (`/api/auth/oidc/callback`) OmniRoute TOTP
  ആവശ്യപ്പെടുന്നില്ല. ഇത് ഐഡന്റിറ്റി പ്രൊവൈഡറിന്റെ സ്വന്തം രണ്ടാം ഘടകത്തെ ആശ്രയിക്കുന്നു;
  അതിനാൽ OIDC പ്രവർത്തനക്ഷമമാക്കിയിട്ടുണ്ടെങ്കിൽ IdP-യിൽ MFA നിർബന്ധമാക്കുക.
- **വീണ്ടെടുക്കൽ** (ഉപകരണം നഷ്ടപ്പെട്ടാൽ, വീണ്ടെടുക്കൽ കോഡുകളൊന്നും ശേഷിക്കാത്തപ്പോൾ, അല്ലെങ്കിൽ
  പരിശോധിക്കാൻ കഴിയാത്ത ഒരു ഘടകം ഉണ്ടായാൽ, ഉദാഹരണത്തിന് `STORAGE_ENCRYPTION_KEY` മാറിയതിന് ശേഷം):
  1. `OMNIROUTE_DISABLE_MFA=true` ഉപയോഗിച്ച് സെർവർ പുനരാരംഭിക്കുക.
  2. ഹോസ്റ്റിൽ തന്നെ (ലൂപ്പ്ബാക്ക് പിയറും ലൂപ്പ്ബാക്ക് `Host`-ഉം, ഉദാഹരണത്തിന്
     `http://localhost:20128`), പാസ്വേഡ് ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക. ആ ഒറിജിനിൽ മാത്രം രണ്ടാം
     ഘടകം ഒഴിവാക്കപ്പെടും; മറ്റെല്ലാ ഒറിജിനുകൾക്കും ഇപ്പോഴും കോഡ് ആവശ്യമാണ്.
  3. ക്രമീകരണങ്ങൾ → സുരക്ഷ → പ്രവർത്തനരഹിതമാക്കുക എന്നതിൽ, പാസ്വേഡ് നൽകുകയും കോഡ്
     ശൂന്യമായി വിടുകയും ചെയ്യുക. വേരിയബിൾ സജ്ജീകരിച്ചിരിക്കുമ്പോഴും അഭ്യർത്ഥന ഹോസ്റ്റിൽ നിന്നുമാകുമ്പോഴും
     മാത്രമാണ് `POST /api/auth/mfa/disable`, `code` ഇല്ലാത്ത ഒരു ബോഡി സ്വീകരിക്കുന്നത്; ഇതിന്
     ഇപ്പോഴും ഡാഷ്ബോർഡ് സെഷനും നിലവിലെ പാസ്വേഡും ആവശ്യമാണ്, കൂടാതെ ഇത്
     `auth.mfa.disabled` എന്ന പേരിൽ `secondFactor: "recovery_switch"` സഹിതം ഓഡിറ്റ് ചെയ്യപ്പെടും.
  4. `OMNIROUTE_DISABLE_MFA` അൺസെറ്റ് ചെയ്ത് പുനരാരംഭിക്കുക; ആവശ്യമെങ്കിൽ വീണ്ടും എൻറോൾ ചെയ്യുക.

## റൂട്ട് ക്ലാസുകൾ

`src/server/authz/types.ts` മൂന്ന് ക്ലാസുകൾ നിർവചിക്കുന്നു; നിർണ്ണായകമായി വർഗ്ഗീകരിക്കാനാവാത്ത ഏതൊരു റൂട്ടും `MANAGEMENT` ലേക്ക് വീഴുന്നു.

| ക്ലാസ്       | വിവരണം                                                                                                                                                     | ഓതന്റിക്കേഷൻ ആവശ്യം                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PUBLIC`     | വ്യക്തമായി സുരക്ഷിതമായ റൂട്ടുകൾ — ലോഗിൻ, ലോഗൗട്ട്, സ്റ്റാറ്റസ്, ഇനിഷ്യലൈസ്, ഹെൽത്ത്, ഓൺബോർഡിംഗ് ബൂട്ട്സ്ട്രാപ്പ്.                                          | ഒന്നുമില്ല                                                             |
| `CLIENT_API` | മോഡൽ-സേവന എൻഡ്‌പോയിന്റുകൾ — `/api/v1/*`, `/api/v1beta/*`, കൂടാതെ അലിയാസുകൾ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | ഫലപ്രദമായ `REQUIRE_API_KEY` ഫീച്ചർ ഫ്ലാഗ് പ്രവർത്തനക്ഷമമായാൽ Bearer കീ |
| `MANAGEMENT` | ഡാഷ്‌ബോർഡ് പേജുകൾ, ക്രമീകരണങ്ങൾ, ദാതാക്കൾ, കീകൾ, അഡ്മിൻ, ഡയഗ്നോസ്റ്റിക്സ് എൻഡ്‌പോയിന്റുകൾ.                                                                 | ഡാഷ്‌ബോർഡ് സെഷൻ അല്ലെങ്കിൽ `manage` സ്കോപ്പുള്ള Bearer                 |

ചില `MANAGEMENT` പ്രവർത്തനങ്ങൾ **ഓപ്പറേറ്റർ-മാത്രം** ആണ്: `manage` കീ മതിയാകില്ല. സൂക്ഷിച്ച ക്രെഡൻഷ്യലുകൾ എക്സ്പോർട്ട് ചെയ്യൽ (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), ലൈവ് ഡാറ്റയ്ക്ക് മുകളിൽ ബാക്കപ്പ് പുനഃസ്ഥാപിക്കൽ (`dryRun=true` ഉൾപ്പെടെ `POST /api/db-backups/import`, ID വഴി പുനഃസ്ഥാപിക്കുന്ന `POST /api/db-backups`, `POST /api/settings/import-json`), പുനഃസ്ഥാപന പോയിന്റുകൾ നശിപ്പിക്കൽ (`DELETE /api/db-backups` ക്ലീനപ്പ്, കൂടാതെ `PATCH /api/db-backups` കാരണം അത് സംരക്ഷിക്കുന്ന റിട്ടൻഷൻ ഓരോ ബാക്കപ്പിന് ശേഷവും ഓട്ടോമാറ്റിക് പ്രൂണിംഗിനെ നയിക്കുന്നു) എന്നിവയ്ക്കെല്ലാം ഡാഷ്‌ബോർഡ് സെഷൻ, പ്രാദേശിക CLI വിഷയം, അല്ലെങ്കിൽ ലോഗിൻ പ്രവർത്തനരഹിതമാകൽ എന്നിവ വേണം. സിങ്ക് ടോക്കൺ നൽകുന്നത് (`POST /api/sync/tokens`) കൂടാതെ `admin` CLI ആക്സസ് ടോക്കൺ നിർമ്മിക്കുന്നത് (`POST /api/cli/tokens`) ഓരോ ലോഗിൻ മോഡിലും ഡാഷ്‌ബോർഡ് സെഷനോ പ്രാദേശിക CLI വിഷയമോ ആവശ്യപ്പെടുന്നു. ഏത് സ്കോപ്പിലെയും API കീകളും `oma_` ആക്സസ് ടോക്കണുകളും ഓപ്പറേറ്റർ ക്രെഡൻഷ്യലുകളല്ല: ആവശ്യമായപ്പോഴെല്ലാം അവയ്ക്ക് `403` ലഭിക്കും. ഈ പരിശോധന `src/lib/api/operatorCredential.ts` ലാണ് (`resolveOperatorCredential()` / `requireOperatorCredential()`). ലോഗിൻ ക്രമീകരണങ്ങൾ മാറ്റുന്നതും ഓപ്പറേറ്റർ-മാത്രമാണ്: പാസ്‌വേഡ് നിലവിലുണ്ടായാൽ `POST /api/settings/require-login` (മാനേജ്‌മെന്റ് പാസ്‌വേഡ് സജ്ജമാക്കൽ / `requireLogin` ടോഗിൾ) ഈ ക്രെഡൻഷ്യലുകൾ മാത്രമേ സ്വീകരിക്കൂ — ആദ്യ റൺ ബൂട്ട്സ്ട്രാപ്പ് വിൻഡോ (പാസ്‌വേഡ് ഇതുവരെ ഇല്ലാത്തപ്പോൾ) മാറ്റമില്ലാതെ തുടരുന്നു — പാസ്‌വേഡ് മാറ്റിസ്ഥാപിക്കാൻ ഡാഷ്‌ബോർഡ് സെഷൻ `currentPassword` അയയ്ക്കണം (അത് ഇല്ലെങ്കിലോ തെറ്റാണെങ്കിലോ `403`, `settings.update_failed` ആയി ഓഡിറ്റ് ചെയ്യപ്പെടുന്നു). പ്രാദേശിക CLIയും ലോഗിൻ പ്രവർത്തനരഹിതമായ ഇൻസ്റ്റൻസും വീണ്ടെടുക്കൽ പാത നിലനിർത്തുന്നു, അതില്ലാതെയും പാസ്‌വേഡ് സജ്ജമാക്കാം, കാരണം രണ്ടും ഡാറ്റാ ഡയറക്ടറി ഉടമസ്ഥതയുള്ള ഹോസ്റ്റിനോട് ബന്ധിതമാണ്.

## പൈപ്പ്ലൈൻ

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

വിശ്വസനീയമായ ആന്തരിക തലക്കെട്ടുകളാണ് ( `src/server/authz/headers.ts` യിൽ നിർവചിച്ചിരിക്കുന്നത്).** ഇൻകമിംഗ് അഭ്യർത്ഥനകളിൽ നിന്ന് നീക്കം ചെയ്തു** വർഗ്ഗീകരണത്തിന് മുമ്പ് — ക്ലയൻ്റുകൾക്ക് ഒരു വിഷയമായി ആൾമാറാട്ടം നടത്താൻ `x-omniroute-auth-*` മുൻകൂട്ടി പോപ്പുലേറ്റ് ചെയ്യാൻ കഴിയില്ല.

### നയ കരാറുകൾ

ഓരോ റൂട്ട് ക്ലാസിനും `src/server/authz/policies/` യിൽ ഒരു നയമുണ്ട്:

- **`publicPolicy`** (`policies/public.ts`) — എപ്പോഴും `allow({ kind: "anonymous", id: "anonymous" })` നൽകുന്നു.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — എക്സ്ട്രാക്ട് ബെയറർ, `validateApiKey()` വഴി സാധൂകരിക്കുന്നു. ഫലപ്രദമായ `REQUIRE_API_KEY` ഫീച്ചർ ഫ്ലാഗ് അപ്രാപ്തമാക്കുമ്പോൾ മാത്രമേ അജ്ഞാതനാകൂ. ഫലപ്രദമായ ഫ്ലാഗ് `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) വഴി പരിഹരിക്കപ്പെടുന്നു, അതിനാൽ ഡാഷ്ബോർഡ് ഫീച്ചർ ഫ്ലാഗുകളും പരിസ്ഥിതി വേരിയബിളുകളും `/api/v1/*`, `/api/v1beta/*`, അപരനാമങ്ങൾ എന്നിവ സ്ഥിരമായി നിയന്ത്രിക്കുന്നു; റിസോൾവർ പരാജയങ്ങൾ പരാജയപ്പെട്ടു. ക്ലയൻ്റ് API റൂട്ടുകളിൽ ഡാഷ്ബോർഡ്-സെഷൻ അഭ്യർത്ഥനകൾ അനുവദിക്കുന്നു (ഡാഷ്ബോർഡ് മോഡൽ കാറ്റലോഗ് ഉപയോഗിക്കുന്ന `/api/v1/models` ഉൾപ്പെടെ). Entra ID SSO പ്രവർത്തനക്ഷമമാക്കുമ്പോൾ, ഘടനാപരമായി ഒരു എൻട്രാ ടോക്കൺ (മൂന്ന് base64url സെഗ്മെൻ്റുകൾ, `RS*` alg, `kid`) ഒരു ബെയറർ കൈകാര്യം ചെയ്യുന്നത് SSO ബ്രാഞ്ചാണ്.** മുമ്പ്** `validateApiKey()`, അതിൻ്റെ വിധി അന്തിമ — ആണ്, ഇത് ഒരിക്കലും API-കീ പാഥിലേക്കോ ഡീഗ്രേഡ്-ടു-അജ്ഞാത ബ്രാഞ്ചിലേക്കോ വരുന്നില്ല, അതിനാൽ ഒരു ഐഡൻ്റിറ്റി പ്രൊവൈഡർ ഔട്ടേജ് ഓപ്പൺ ആക്സസ് ആകാൻ കഴിയില്ല. സ്റ്റാറ്റിക് API കീകളെ ബാധിക്കില്ല. [Entra ID SSO](../security/ENTRA_SSO.md) കാണുക.
- **`managementPolicy`** (`policies/management.ts`) — ഡാഷ്ബോർഡ് സെഷൻ, ആന്തരിക മോഡൽ-സമന്വയ അഭ്യർത്ഥനകൾ ( `/api/providers/[name]/(sync-models|models)` മായി പൊരുത്തപ്പെടുന്നു) സ്വീകരിക്കുന്നു അല്ലെങ്കിൽ `isAuthRequired()` തെറ്റായി നൽകുകയാണെങ്കിൽ പൂർണ്ണമായും ഒഴിവാക്കുന്നു. ഒരു ബെയറർ ടോക്കൺ നിലവിലുണ്ടെങ്കിലും അസാധുവാണെങ്കിൽ 403 (`AUTH_001`) നൽകുന്നു, അല്ലാത്തപക്ഷം 401. ഏതെങ്കിലും auth ബ്രാഞ്ചിന് മുമ്പ് റൂട്ട് ഗാർഡ് ടയറുകൾ (LOCAL_ONLY / ALWAYS_PROTECTED) നടപ്പിലാക്കുന്നു — [റൂട്ട് ഗാർഡ് ടയറുകൾ](../security/ROUTE_GUARD_TIERS.md) കാണുക. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ലെ LOCAL_ONLY പാതകൾ (ഇന്ന്: `/api/mcp/`) ബെയറർ കീ `manage` സ്കോപ്പ് വഹിക്കുമ്പോൾ നോൺ-ലൂപ്പ്ബാക്കിൽ നിന്ന് ആക്സസ് ചെയ്യാവുന്നതാണ്; മറ്റെല്ലാ LOCAL_ONLY പാതകളും വ്യാപ്തി പരിഗണിക്കാതെ കർശനമായ-ലൂപ്പ്ബാക്ക് ആയി തുടരുന്നു.

വിജയകരമായ ഒരു പോളിസി `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` നൊപ്പം `AuthSubject` നൽകുന്നു. ആധികാരിക ലോജിക് വീണ്ടും പ്രവർത്തിപ്പിക്കുന്നതിനുപകരം `src/server/authz/assertAuth.ts` ൽ `assertAuth(request, "CLIENT_API")` വഴി ഡൗൺസ്ട്രീം ഹാൻഡ്ലർമാർക്ക് ഇത് വായിക്കാനാകും.

## പൊതു റൂട്ടുകളുടെ പട്ടിക

`src/shared/constants/publicApiRoutes.ts` വ്യക്തമായി അനുവദിച്ചിരിക്കുന്ന പട്ടികയാണ്:

പട്ടിക **രൂപഘടന** പ്രകാരം വിഭജിച്ചിരിക്കുന്നു, ഈ വിഭജനം നിർണായകമാണ് (GHSA-74g9-q8f6-793h): ഒരു പ്രിഫിക്സ്
`startsWith()` ഉപയോഗിച്ച് പൊരുത്തപ്പെടുത്തുന്നതിനാൽ, അതിന്റെ തുടക്കത്തിലെ അക്ഷരങ്ങൾ പങ്കിടുന്ന സമീപത്തുള്ള എല്ലാ പാതകളുമായും
അതും പൊരുത്തപ്പെടുന്നു.
`/api/usage/om-usage` എന്ന പ്രിഫിക്സ് `/api/usage/om-usage<anything>` നെ PUBLIC ആയി അടയാളപ്പെടുത്തുകയും Next അത്
`/api/usage/[connectionId]` ആയി പരിഹരിക്കുകയും ചെയ്യുന്നു — സ്വന്തമായി auth ഇല്ലാത്ത ഒരു ഹാൻഡ്ലർ.

```ts
// യഥാർത്ഥ ഉപവൃക്ഷങ്ങൾ. ഓരോ എൻട്രിയും "/"-ൽ അവസാനിക്കണം (ഒരു unit test ഉപയോഗിച്ച് ഉറപ്പാക്കുന്നു).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ൽ CLIENT_API ആയി പരിഗണിക്കുന്നു, "no-auth public" ആയി അല്ല
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// കൃത്യമായി പൊരുത്തപ്പെടുത്തുന്ന ഒറ്റ റൂട്ടുകൾ (അവസാന സ്ലാഷോടെയോ അതില്ലാതെയോ).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP-യുടെ login ഘട്ടം 2; MFA-pending cookie ആവശ്യമാണ്
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS origin ഇളവും ലഭിക്കുന്ന, വായിക്കാൻ മാത്രമുള്ള ഒറ്റ റൂട്ടുകൾ.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ഇളവില്ലാത്ത, വായിക്കാൻ മാത്രമുള്ള ഒറ്റ റൂട്ട്.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

വായിക്കാൻ മാത്രമുള്ള റൂട്ടുകൾ സുരക്ഷിതമായ മെത്തേഡുകൾക്കു മാത്രമാണ് പൊതുവായി ലഭ്യമാകുന്നത്. ശ്രദ്ധിക്കുക: `classifyRoute()` PUBLIC fall-through-ൽ നിന്ന് `/api/v1/*`, `/api/v1beta/*` എന്നിവ ഒഴിവാക്കുന്നു — അതിനാൽ അവ എപ്പോഴും `CLIENT_API` ആയിരിക്കും; Bearer-key നയം അവയ്ക്കും ബാധകമാണ്.

## പുതിയൊരു Route ചേർക്കൽ

### മാതൃക 1 — പൊതു client API endpoint (Bearer-auth)

`/api/v1/`, `/api/v1beta/` എന്നിവയ്ക്കു കീഴിലുള്ള route-ുകൾ സ്വയമേവ `CLIENT_API` ആയി വർഗ്ഗീകരിക്കപ്പെടുന്നു. Middleware Bearer പരിശോധന നടപ്പാക്കുന്നു; route handler-ുകൾ അത് വീണ്ടും ചെയ്യേണ്ടതില്ല, എന്നാൽ പ്രയോജനകരമാണെങ്കിൽ subject വായിക്കാം.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler-ന്റെ logic
}
```

### മാതൃക 2 — Management endpoint (session അല്ലെങ്കിൽ Bearer + manage)

`src/lib/api/requireManagementAuth.ts`-ൽ നിന്നുള്ള `requireManagementAuth()` ഉപയോഗിക്കുക:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler-ന്റെ logic
}
```

വിജയിക്കുമ്പോൾ `requireManagementAuth()` `null` തിരികെ നൽകും; അല്ലെങ്കിൽ ഒരു JSON error `Response` നൽകും:

- 401 `AUTH_001` "Authentication required" — credentials ഒന്നും നൽകിയിട്ടില്ല
- 403 — അസാധുവായ Bearer **അല്ലെങ്കിൽ** Bearer നൽകിയിട്ടുണ്ടെങ്കിലും key-ക്ക് `manage` / `admin` scope ഇല്ല

`"manage"` അല്ലെങ്കിൽ `"admin"` ലഭിക്കുമ്പോൾ `hasManageScope(scopes)` true തിരികെ നൽകും.

### മാതൃക 3 — പൊതു allowlist-ലേക്ക് ചേർക്കൽ

സൗകര്യം നോക്കിയല്ല, ഘടന അനുസരിച്ച് set തിരഞ്ഞെടുക്കുക. ഒറ്റ route `PUBLIC_API_ROUTES_EXACT`-ലാണ് ചേർക്കേണ്ടത് (അല്ലെങ്കിൽ GET-only ആണെങ്കിൽ `PUBLIC_READONLY_CORS_API_ROUTES`-ൽ); യഥാർഥ subtree മാത്രം `PUBLIC_API_ROUTE_PREFIXES`-ൽ ചേർക്കുക, അത് **`/`-ൽ അവസാനിക്കുകയും വേണം**. ഒരു ഒറ്റ route prefix പട്ടികയിൽ ചേർത്താൽ, അതേ ആരംഭ അക്ഷരങ്ങൾ പങ്കിടുന്ന സമീപത്തുള്ള എല്ലാ path-കളും public ആകും — പിന്നീട് ചേർക്കുന്ന dynamic-segment sibling-ുകൾ ഉൾപ്പെടെ (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts`, `tests/unit/authz/classify.test.ts` എന്നിവയിലെ unit test-ുകൾ പുതുക്കുക.

## സ്കോപ്പുകൾ

മൂന്ന് നെയിംസ്പേസുകൾ. ഓരോ ചെക്കറും അതിൻ്റേതായ സ്ട്രിംഗുകൾ മാത്രമേ വായിക്കൂ. `manage` എന്തുകൊണ്ട് `read:compression` എന്നതിനായുള്ള `scopeMatches` പരാജയപ്പെടുത്തുന്നു, ഒരു `read` ആക്സസ് ടോക്കണിന് എന്തുകൊണ്ട് `PATCH /api/keys/{id}` ചെയ്യാൻ കഴിയില്ല എന്നതുൾപ്പെടെയുള്ള താരതമ്യം, [മൂന്ന് സ്കോപ്പ് നെയിംസ്പേസുകൾ](../frameworks/MCP-SERVER.md#three-scope-namespaces) എന്നതിൽ കാണുക.

API കീകൾ ഒരു `scopes` അറേ വഹിക്കുന്നു (`api_keys.scopes` എന്നതിൽ JSON ആയി സംഭരിച്ചിരിക്കുന്നു, `src/lib/db/apiKeys.ts` കാണുക).

### മാനേജ്മെൻ്റ് സ്കോപ്പ്

- `manage` / `admin` — `hasManageScope`. മാനേജ്മെൻ്റ് API റൂട്ടുകളിലേക്കുള്ള ബെയറർ ആക്സസ്.
- `mcp:connect`, `self:usage`, `self:account-quota`, കൂടാതെ `policy:bypass-provider-quota` എന്നിവ അഡിറ്റീവ് എക്സാക്റ്റ്-മാച്ച് സ്കോപ്പുകളാണ്. അവ `MANAGEMENT_API_KEY_SCOPES` എന്നതിന് പുറത്താണ്. `mcp:connect` എന്നത് `/api/mcp/` നോൺ-ലൂപ്പ്ബാക്ക് കാർവ്-ഔട്ട് മാത്രമേ തുറക്കൂ.

### MCP ടൂൾ സ്കോപ്പുകൾ

കാറ്റലോഗും പൊരുത്തപ്പെടുന്ന നിയമങ്ങളും (ഒരേ സ്ട്രിംഗ്, അല്ലെങ്കിൽ `*` എന്നതിൽ അവസാനിക്കുന്ന ഒരു അനുവദിച്ച സ്കോപ്പ്): [MCP ടൂൾ സ്കോപ്പുകൾ](../frameworks/MCP-SERVER.md#mcp-tool-scopes). `src/shared/constants/mcpScopes.ts` എന്നതിലെ `MCP_SCOPE_LIST` എന്നത് യഥാർത്ഥ ടൈപ്പ് ചെയ്ത ഉപവിഭാഗമാണ്, ആ മുഴുവൻ കാറ്റലോഗല്ല. `resolveCallerScopeContext()` MCP ഓത്ത് വിവരങ്ങൾ, അഭ്യർത്ഥന മെറ്റാഡാറ്റ, അല്ലെങ്കിൽ `OMNIROUTE_MCP_SCOPES` എന്നിവയിൽ നിന്ന് സ്കോപ്പുകൾ പരിഹരിച്ച ശേഷം `open-sse/mcp-server/scopeEnforcement.ts` എന്നതിൽ എൻഫോഴ്സ്മെൻ്റ് പ്രവർത്തിക്കുന്നു. `OMNIROUTE_MCP_ENFORCE_SCOPES=true` അല്ലെങ്കിൽ ഇത് ഓഫായിരിക്കും.

### ആക്സസ്-ടോക്കൺ സ്കോപ്പുകൾ

`oma_live_…` ടോക്കണുകളിലെ `read` / `write` / `admin`, `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) അനുസരിച്ച് റാങ്ക് ചെയ്തിരിക്കുന്നു. ഈ റാങ്ക് ആക്സസ്-ടോക്കൺ ക്രെഡൻഷ്യലിന് മാത്രമേ ബാധകമാകൂ. [മാനേജ്മെൻ്റ് ഓതൻ്റിക്കേഷൻ](../guides/MANAGEMENT-AUTH.md) കാണുക.

## ഓതന്റിക്കേഷൻ ആവശ്യം ടോഗിൾ

`src/shared/utils/apiAuth.ts` ലെ `isAuthRequired()` ഒരു റിക്വസ്റ്റിന് **ഏതെങ്കിലും** ഓതന്റിക്കേഷൻ ബാധകമാക്കണോ എന്ന് തീരുമാനിക്കുന്നു:

- `settings.requireLogin === false` → ഓതന്റിക്കേഷൻ ആഗോളതലത്തിൽ പ്രവർത്തനരഹിതം, എന്നാൽ എപ്പോഴും സംരക്ഷിതമായ ശ്രേണി (കാണുക [റൂട്ട് ഗാർഡ് ടിയറുകൾ](../security/ROUTE_GUARD_TIERS.md)) ഒഴികെ, കൂടാതെ അത് സ്വീകരിക്കുന്ന ക്രെഡൻഷ്യൽ നൽകുന്ന കോളുകൾ ഒഴികെ — ലോഗിൻ ഓണായിരിക്കുമ്പോൾ ആവശ്യമുള്ള അതേ ക്രെഡൻഷ്യൽ ഇവയ്ക്ക് വേണം: സിങ്ക് ടോക്കണുകൾ നൽകൽ, ഏത് സ്കോപ്പിലും CLI ആക്സസ് ടോക്കണുകൾ നിർമ്മിക്കൽ, `manage`/`admin` സ്കോപ്പുള്ള API കീ സൃഷ്ടിക്കൽ, ആ സ്കോപ്പ് ഒരു കീക്ക് നൽകൽ, അല്ലെങ്കിൽ അത്തരം കീ പുനർസൃഷ്ടിക്കൽ അല്ലെങ്കിൽ വെളിപ്പെടുത്തൽ (`src/lib/api/requireManagementAuth.ts` ലെ `requireCredentialForManagementScopedKey()`). ഇൻഫറൻസ്-മാത്രം കീകൾ തുറന്നു തന്നെ നിൽക്കുന്നു.
- പാസ്‌വേഡ് കോൺഫിഗർ ചെയ്തിട്ടില്ല **കൂടാതെ** `INITIAL_PASSWORD` എൻവയോൺമെന്റ് വേരിയബിളും ഇല്ല → ബൂട്ട്സ്ട്രാപ്പ് മോഡ് ഓൺബോർഡിംഗ് വിസാർഡും ലൂപ്പ്ബാക്ക് റിക്വസ്റ്റുകളും അനുവദിക്കുന്നു, എന്നാൽ തുറന്ന നെറ്റ്‌വർക്ക് റിക്വസ്റ്റുകൾക്ക് ഇപ്പോഴും ക്രെഡൻഷ്യലുകൾ വേണം.
- ഏത് DB പിശകും → ഫെയിൽ-ക്ലോസ്ഡ് (സുരക്ഷിത-സ്ഥിരസ്ഥിതി).

ക്ലയന്റ് API കീ നടപ്പാക്കൽ `src/shared/utils/featureFlags.ts` ലെ `isRequireApiKeyEnabled()` ഉപയോഗിക്കുന്നു, നേരിട്ടുള്ള `process.env.REQUIRE_API_KEY` വായന അല്ല. വിന്യസിച്ച ഇൻസ്റ്റൻസുകൾക്ക് ഇത് പ്രധാനമാണ്: ഡാഷ്‌ബോർഡ് → ഫീച്ചർ ഫ്ലാഗുകളിൽ `REQUIRE_API_KEY` ടോഗിൾ ചെയ്താൽ ഒരു DB ഓവർറൈഡ് സംഭരിക്കപ്പെടുകയും `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` എന്നിവയെയും ഈ ഹെൽപ്പർ പങ്കിടുന്ന മറ്റ് ക്ലയന്റ്-API ഓതന്റിക്കേഷൻ പരിശോധനകളെയും ഉടനടി ബാധിക്കുകയും ചെയ്യുന്നു. ഫീച്ചർ ഫ്ലാഗ് സ്റ്റോർ വായിക്കാനായില്ലെങ്കിൽ ക്ലയന്റ് API ഓതന്റിക്കേഷൻ ഫെയിൽ-ക്ലോസ്ഡ് ആയി മാറുകയും കീ ആവശ്യപ്പെടുകയും ചെയ്യുന്നു.

## ബ്രേക്കിംഗ് മാറ്റം — v3.8.0

`/api/v1/agents/tasks/*`, `/api/resilience/model-cooldowns` എന്നീ എൻഡ്പോയിന്റുകൾക്ക് **ഇപ്പോൾ മാനേജ്മെന്റ് ഓത്ത് ആവശ്യമാണ്** (കമ്മിറ്റ് `588a0333`). മുമ്പ് `manage` സ്കോപ്പ് ഇല്ലാത്ത ഒരു സാധാരണ API കീ അയച്ചിരുന്ന ക്ലയന്റുകൾക്ക് `403` ലഭിക്കും. മൈഗ്രേഷൻ: API Keys ഡാഷ്ബോർഡിൽ കീയ്ക്ക് `manage` സ്കോപ്പ് നൽകുക, അല്ലെങ്കിൽ ലോഗിൻ ചെയ്ത ഡാഷ്ബോർഡ് സെഷൻ ഉപയോഗിക്കുക.

## പെരുമാറ്റ മാറ്റം — v3.8.2

`/api/mcp/*` (റിമോട്ട് MCP സെർവർ) ഇപ്പോഴും ഡിഫോൾട്ടായി LOCAL_ONLY ആണ്, എന്നാൽ `Authorization: Bearer <api-key>` ഹെഡറിൽ `manage` സ്കോപ്പ് ഉണ്ടെങ്കിൽ ഇപ്പോൾ ലൂപ്പ്ബാക്ക് അല്ലാത്ത അഭ്യർത്ഥനകളും സ്വീകരിക്കുന്നു. `src/server/authz/routeGuard.ts`-ലെ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` വഴി ഓരോ പാത്തിനും ഈ ഒഴിവാക്കൽ വ്യക്തമായി നിയന്ത്രിക്കുന്നു; അനുബന്ധ LOCAL_ONLY പ്രിഫിക്സ് ആയ `/api/cli-tools/runtime/*`-ന് മനഃപൂർവം ഈ ബൈപാസ് അനുവദിച്ചിട്ടില്ല, കാരണം അതിന് ഏതുതരം സബ്പ്രോസസും സ്പോൺ ചെയ്യാൻ കഴിയും. ലൂപ്പ്ബാക്ക് അല്ലാത്ത ഇടങ്ങളിൽനിന്ന് `/api/mcp/*`-ലേക്കുള്ള അജ്ഞാത അഭ്യർത്ഥനകൾ തുടർന്നും `403 LOCAL_ONLY` നൽകും — ഏതൊരു പുതിയ LOCAL_ONLY പാത്തിനുമുള്ള ഡിഫോൾട്ട് കർശനമായ ലൂപ്പ്ബാക്ക് മാത്രമായി തുടരും. [റൂട്ട് ഗാർഡ് ടിയറുകൾ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) കാണുക.

## പരിശോധന

- യൂണിറ്റ് ടെസ്റ്റുകൾ: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- പൊതു അലൗലിസ്റ്റ്: `tests/unit/public-api-routes.test.ts`.
- കേന്ദ്രീകൃതമായി പ്രവർത്തിപ്പിക്കുക: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## ഡീബഗ്ഗിംഗ്

പൈപ്പ്ലൈൻ എപ്പോഴും പ്രതികരണങ്ങൾ ഉപയോഗിച്ച് സ്റ്റാമ്പ് ചെയ്യുന്നു:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ആധികാരികമായ അഭ്യർത്ഥനകൾക്കായി അപ്സ്ട്രീം (ഹാൻഡ്ലർ-സൈഡ്) അഭ്യർത്ഥന തലക്കെട്ടുകളും ഉൾപ്പെടുന്നു:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ഹാൻഡ്ലറുകൾ — ഉള്ളിൽ `assertAuth(req, expectedClass)` ഉപയോഗിക്കുക, മിഡിൽവെയർ ബൈപാസ് ചെയ്താൽ അത് `AUTHZ_NOT_INITIALIZED` കോഡ് ഉപയോഗിച്ച് `AuthzAssertionError` എറിയുന്നു (ടെസ്റ്റുകളിൽ കോൺഫിഗറേഷൻ റിഗ്രഷനുകൾ പിടിക്കാൻ സഹായകമാണ്).

## ഇതും കാണുക

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ഓരോ എൻഡ്പോയിന്റിനും വേണ്ടിയുള്ള ഓത്ത് മാർക്കർ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ഓത്ത് ഇവന്റുകൾക്കായുള്ള ഓഡിറ്റ് ലോഗ്
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — മൂന്ന് സ്കോപ്പ് നെയിംസ്പേസുകളും MCP ടൂൾ-സ്കോപ്പ് കാറ്റലോഗും
- ഉറവിടം: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
