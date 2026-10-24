# Authorization Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **വിശ്വസനീയമായ ഉറവിടം:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:** 2026-09-22 — സ്കോപ്പ് നെയിംസ്പേസുകൾ MCP-SERVER.md-ലേക്ക് വിരൽ ചൂണ്ടുന്നു

ഓരോ API അഭ്യർത്ഥനകളെയും നിയന്ത്രിക്കുന്ന ഒരു റൂട്ട്-അവബോധമുള്ള ഓതറൈസേഷൻ പൈപ്പ്ലൈൻ OmniRoute-നുണ്ട്. വർഗ്ഗീകരണം **നിർണ്ണായകവും** **ഫെയിൽ-ക്ലോസ്ഡും** ആണ് — വർഗ്ഗീകരിക്കാൻ കഴിയാത്ത എന്തും `MANAGEMENT` ആയി മാറുകയും ഒരു സെഷനോ മാനേജ്മെൻ്റ്-ഗ്രേഡ് ടോക്കണോ ആവശ്യപ്പെടുകയും ചെയ്യും. റൂട്ടുകൾ പരിപാലിക്കുന്ന അല്ലെങ്കിൽ പുതിയ എൻഡ്പോയിന്റുകൾ രൂപകൽപ്പന ചെയ്യുന്ന എഞ്ചിനീയർമാർക്കായി ഈ പേജ് മോഡൽ വിശദീകരിക്കുന്നു.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ഉറവിടം: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## രണ്ട് ഓതന്റിക്കേഷൻ മോഡുകൾ

### 1. API കീ (Bearer)

OpenAI/Anthropic/Gemini-അനുയോജ്യമായ ക്ലയന്റ് APIകൾക്കും, കീക്ക് `manage` സ്കോപ്പ് ഉള്ളപ്പോൾ ചില മാനേജ്‌മെന്റ് റൂട്ടുകൾക്കും ഇത് ഉപയോഗിക്കുന്നു.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ലെ `isValidApiKey()` / `extractApiKey()` വഴി ഇത് സാധൂകരിക്കുകയും `src/shared/utils/apiAuth.ts` വഴി വീണ്ടും എക്സ്പോർട്ട് ചെയ്യുകയും ചെയ്യുന്നു. `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` എൻവയോൺമെന്റ് വേരിയബിളുകളെ സ്ഥിരമായ പാസ്‌ത്രൂ കീകളായും ഈ വാലിഡേറ്റർ സ്വീകരിക്കുന്നു (issue #1350).

### 2. ഡാഷ്‌ബോർഡ് സെഷൻ (auth_token കുക്കി)

ഡാഷ്‌ബോർഡ് പേജുകൾക്കും അഡ്മിൻ പ്രവർത്തനങ്ങൾക്കുമായി.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT സാധൂകരിക്കപ്പെടുകയും **കൂടാതെ** `authenticated: true` ഉൾക്കൊള്ളുകയും ചെയ്യുമ്പോൾ മാത്രമേ ഒരു കുക്കി സെഷനാകൂ (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). കുക്കി ഉപയോഗിക്കുന്ന എല്ലാ ഘടകങ്ങളും — ഡാഷ്‌ബോർഡ് റൂട്ട് ഗാർഡ് (`isDashboardSessionAuthenticated()`), authz പൈപ്പ്‌ലൈൻ റിഫ്രഷ്, WebSocket ഹാൻഡ്‌ഷേക്ക്, ലൈവ് സെർവർ, `/api/settings/require-login`, `/api/auth/status` — ആ ഹെൽപ്പർ വഴിയാണ് പോകുന്നത്. `JWT_SECRET` ഉപയോഗിച്ച് ഒപ്പിട്ട മറ്റ് JWTകളും നിലവിലുണ്ട് — കീ ഉടമകൾക്കായി Cursor CLI passthrough `iss "omniroute" / aud "cursor-cli"` ടോക്കണുകൾ നൽകുന്നു — അവ ഒരിക്കലും സെഷനുകളല്ല (#13298).

`src/shared/utils/apiAuth.ts` ലെ `isDashboardSessionAuthenticated()` വഴി ഇത് സാധൂകരിക്കപ്പെടുന്നു. JWT-ന്റെ 30 ദിവസത്തെ ആയുസ്സിൽ 7 ദിവസത്തിൽ കുറവ് ശേഷിക്കുമ്പോൾ പൈപ്പ്‌ലൈൻ അത് സ്വയമേവ റിഫ്രഷ് ചെയ്യുന്നു.

30 ദിവസം തികയുന്നതിന് മുമ്പും ഒരു സെഷൻ അവസാനിക്കാം: എല്ലാ മിന്റർമാരും `mintDashboardSessionToken` വഴിയാണ് പോകുന്നത് (ഇഷ്യു ചെയ്ത സമയം `iat`, ഐഡി `jti`), കൂടാതെ വെരിഫയർ രണ്ട് ക്രമീകരണങ്ങൾ പരിശോധിക്കുന്നു: പാസ്‌വേഡ് മാറ്റം സജ്ജമാക്കുന്ന `sessionsValidAfter` (അതിനു മുമ്പ് ഇഷ്യു ചെയ്ത ഓരോ സെഷനും സാധുവല്ലാതാകുന്നു — പാസ്‌വേഡ് മാറ്റിയ ബ്രൗസറിന് പുതിയ കുക്കി ലഭിക്കും), കൂടാതെ `POST /api/auth/logout` സൈൻ-ഔട്ട് ചെയ്ത സെഷന്റെ `jti` ചേർക്കുന്ന `revokedDashboardSessions`. പഴയ റിലീസ് ഇഷ്യു ചെയ്ത സെഷനുകളിൽ ഈ ക്ലെയിമുകൾ ഉണ്ടാവില്ല, ആദ്യത്തെ പാസ്‌വേഡ് മാറ്റം വരെ അവ സാധുവായി തുടരും. ക്രമീകരണങ്ങൾ വായിക്കാനായില്ലെങ്കിൽ സെഷൻ വിശ്വസിക്കപ്പെടുന്നില്ല.

ചില മാനേജ്‌മെന്റ് റൂട്ടുകൾ **ഏതെങ്കിലും** ഒരു മോഡ് സ്വീകരിക്കുന്നു: API കീക്ക് `manage` (അല്ലെങ്കിൽ `admin`) സ്കോപ്പ് ഉണ്ടെങ്കിൽ കുക്കി അല്ലെങ്കിൽ `Bearer <key>`. v3.8-ൽ ചേർത്ത "API കോളുകൾ വഴി കോൺഫിഗർ ചെയ്യാവുന്ന" വർക്ക്ഫ്ലോ ഇതാണ് സാധ്യമാക്കുന്നത്.

#### ഓപ്ഷണൽ OIDC ലോഗിൻ ഗേറ്റ് (#6973)

ഡാഷ്‌ബോർഡ് അഡ്മിൻ ലോഗിൻ, സ്ഥിരസ്ഥിതിയായ പാസ്‌വേഡ് ലോഗിനോടൊപ്പം **ഓപ്ഷണൽ** OIDC (OpenID Connect) ഫ്ലോയും പിന്തുണയ്ക്കുന്നു — പാസ്‌വേഡ് ലോഗിൻ ഒരിക്കലും നീക്കം ചെയ്യപ്പെടുന്നില്ല, അത് കൂടുതൽ പിന്തുണ നൽകുക മാത്രമേ ചെയ്യുന്നുള്ളൂ:

- `settings.oidcEnabled === true` **കൂടാതെ** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` എല്ലാം കോൺഫിഗർ ചെയ്തിട്ടുണ്ടെങ്കിൽ മാത്രമേ ഇത് പ്രവർത്തിക്കൂ (Settings → Auth). അല്ലാത്തപക്ഷം `GET /api/auth/oidc/login` `400` നൽകുന്നു.
- `GET /api/auth/oidc/login` issuer-ന്റെ `/.well-known/openid-configuration` ൽ നിന്ന് `authorization_endpoint` കണ്ടെത്തുന്നു (ഇല്ലെങ്കിൽ `<issuer>/authorize` ലേക്ക് തിരികെ വീഴുന്നു), വരുന്ന റിക്വസ്റ്റിൽ നിന്ന് redirect URI നിർമ്മിക്കുന്നു (`x-forwarded-proto` അറിയുന്നത്), `httpOnly` `oidc_state` കുക്കിയിൽ സൂക്ഷിച്ച ക്രമരഹിതമായ `state` സഹിതം IdP-യിലേക്ക് റീഡയറക്ട് ചെയ്യുന്നു.
- `GET /api/auth/oidc/callback` `state` സാധൂകരിക്കുന്നു, ഓതറൈസേഷൻ കോഡ് കൈമാറുന്നു, issuer-ന്റെ JWKS വഴി ID ടോക്കണിന്റെ ഒപ്പ് പരിശോധിക്കുന്നു (`jose`-യുടെ `createRemoteJWKSet`, ഓരോ JWKS URI-ക്കും കാഷെ ചെയ്തത്), `issuer`/`audience` പരിശോധനകളോടെ. `oidcAllowedSubjects` അനുവദനപ്പട്ടിക നിർബന്ധമാണ്: ഇത് ടോക്കണിന്റെ `sub` ക്ലെയിമുമായോ `email` ക്ലെയിമുമായോ പൊരുത്തപ്പെടുന്നു — `email` ക്ലെയിം `email_verified === true` ആകുമ്പോൾ മാത്രമേ പരിഗണിക്കൂ, അതിനാൽ IdP-യിലെ സ്ഥിരീകരിക്കാത്ത ഇമെയിൽ ഒരിക്കലും ഗേറ്റ് കടക്കില്ല — എൻട്രികളൊന്നുമില്ലെങ്കിൽ കോൾബാക്ക് എല്ലാ ലോഗിനുകളും നിരസിക്കുന്നു (`not_configured`).
- വിജയകരമായാൽ പാസ്‌വേഡ് ലോഗിൻ നൽകുന്ന **അതേ** 30 ദിവസത്തെ `auth_token` JWT ഇത് മിന്റ് ചെയ്യുന്നു (`src/app/api/auth/login/route.ts`), അതിനാൽ ബാക്കി ഡാഷ്‌ബോർഡ് സെഷൻ പൈപ്പ്‌ലൈൻ (സ്വയം-റിഫ്രഷ്, കുക്കി ഫ്ലാഗുകൾ) മാറ്റമില്ലാതെ തുടരുന്നു — OIDC മാറ്റുന്നത് കുക്കി എങ്ങനെ ലഭിക്കുന്നു എന്നത് മാത്രമാണ്, അത് നൽകുന്നതിനെയല്ല.
- ഓരോ `oidc*` ക്രമീകരണവും (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS` ൽ ഉണ്ട് (`src/shared/constants/securityImpactingSettings.ts`): ബോഡിയിൽ മാനേജ്‌മെന്റ് പാസ്‌വേഡ് `currentPassword` ആയി ഇല്ലെങ്കിൽ `PATCH /api/settings` `400 PASSWORD_REQUIRED` നൽകുന്നു (തെറ്റാണെങ്കിൽ `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` പാസ്‌വേഡ് _ലോഗിൻ_ (`POST /api/auth/login`) നിരസിക്കുന്നു, പക്ഷേ സൂക്ഷിച്ച പാസ്‌വേഡ് ഹാഷ് നിലനിർത്തുന്നു, കൂടാതെ റീ-ഓതന്റിക്കേഷൻ ഇപ്പോഴും `currentPassword` അതിനെതിരെ പരിശോധിക്കുന്നു.
- `corsOrigins`, `bruteForceProtection` എന്നിവയും `SECURITY_IMPACTING_SETTINGS_KEYS` ൽ ഉണ്ട്: ഇവ അയവുവരുത്തുന്നത് ലോഗിൻ പ്രതിരോധങ്ങളെ ദുർബലമാക്കുന്നു, അതിനാൽ ഇവയ്ക്കും അതേ `currentPassword` റീ-ഓതന്റിക്കേഷൻ വേണം (Security ടാബ് അത് ചോദിക്കുന്നു), കൂടാതെ JSON ഇമ്പോർട്ട് ഇവ ഒഴിവാക്കുന്നു.
- ഓരോ സെക്യൂരിറ്റി-നയ കീയും — `SECURITY_IMPACTING_SETTINGS_KEYS` എൻട്രികൾ, ഓരോ `oidc*` കീയും, ഡാഷ്‌ബോർഡ് സെഷൻ നിലയും — `PATCH /api/settings` ൽ **ഓപ്പറേറ്റർ-മാത്രം** ആണ്: `manage` സ്കോപ്പുള്ള API കീയോ `oma_` ആക്സസ് ടോക്കണോ ശരിയായ `currentPassword` അയച്ചാലും `403` നൽകി നിരസിക്കപ്പെടുന്നു, ആ നിരസനം `reason: OPERATOR_REQUIRED` സഹിതം `settings.update_failed` ആയി ഓഡിറ്റ് ചെയ്യുന്നു (`src/lib/api/operatorCredential.ts` ലെ `requireOperatorCredential()`). സാധാരണ ക്രമീകരണങ്ങൾ (തീം, ഡിസ്പ്ലേ മുൻഗണനകൾ) `manage` കീക്കോ `admin` ആക്സസ് ടോക്കണിനോ എഴുതാവുന്നതായി തുടരുന്നു. `/api/settings` സ്വയമുള്ള എല്ലാ മാറ്റങ്ങൾക്കും (കൂടാതെ `/api/settings/require-login` നും) `admin` ആക്സസ്-ടോക്കൺ സ്കോപ്പും വേണം (`src/server/authz/accessScopes.ts` ലെ `ADMIN_MUTATION_EXACT_PATHS`, കൃത്യമായ പാത്ത് പൊരുത്തം); `GET` `read` ആയി തുടരുന്നു, മറ്റ് `/api/settings/*` ഉപ-റൂട്ടുകൾ (പ്രോക്സികൾ, combo ഡിഫോൾട്ടുകൾ, മോഡൽ അലിയാസുകൾ, കംപ്രഷൻ, പർജുകൾ…) രീതിയിൽ നിന്ന് ഊഹിക്കുന്ന `write` സ്കോപ്പ് നിലനിർത്തുന്നു.
- `POST /api/settings/import-json` ആ റീ-ഓതന്റിക്കേഷൻ ഒഴിവാക്കുന്നു, അതിനാൽ എഴുതുന്നതിന് മുമ്പ് `IMPORT_STRIPPED_SETTINGS_KEYS` (അതേ ഫയൽ) ലെ എല്ലാ കീയും നീക്കം ചെയ്യുന്നു: പാസ്‌വേഡും `currentPassword`ഉം, ഓരോ `SECURITY_IMPACTING_SETTINGS_KEYS` എൻട്രിയും, ഡാഷ്‌ബോർഡ് സെഷൻ നിലയും (`sessionsValidAfter`, `revokedDashboardSessions`). പഴയ ബാക്കപ്പ് ഇമ്പോർട്ട് ചെയ്യുന്നത് പാസ്‌വേഡ് മാറ്റമോ സൈൻ-ഔട്ടോ അവസാനിപ്പിച്ച ഒരു സെഷനെ പുനരുജ്ജീവിപ്പിക്കില്ല.

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
ഇൻകമിംഗ് അഭ്യർത്ഥന → src/proxy.ts
  → src/server/authz/pipeline.ts-ലെ runAuthzPipeline()
    1. വിശ്വസനീയമായ ആന്തരിക ഹെഡറുകൾ നീക്കംചെയ്യുക (x-omniroute-auth-*, x-omniroute-route-class)
    2. അഭ്യർത്ഥന ഐഡി സൃഷ്ടിച്ച് classifyRoute() വഴി റൂട്ട് വർഗ്ഗീകരിക്കുക
    3. pathname == "/" ആണെങ്കിൽ → /dashboard-ലേക്ക് റീഡയറക്ട് ചെയ്യുക
    4. ഡ്രെയിനിംഗ് അവസ്ഥയിലാണെങ്കിൽ (ക്രമാനുസൃത ഷട്ട്ഡൗൺ), കൂടാതെ /api/* ആണെങ്കിൽ → 503
    5. GET അല്ലാത്ത /api/* ആണെങ്കിൽ → checkBodySize() ഗാർഡ്
    6. OPTIONS ആണെങ്കിൽ → CORS പ്രീഫ്ലൈറ്റ് 204
    7. options.enforce == false ആണെങ്കിൽ → റൂട്ട്-ക്ലാസ് ഹെഡറുകളോടെ അതേപടി കടത്തിവിടുക
    8. അല്ലെങ്കിൽ: POLICIES[routeClass].evaluate(ctx)
       - അനുവദിക്കുക  → x-omniroute-auth-{kind,id,label,scopes} പതിപ്പിക്കുക → NextResponse.next()
       - നിരസിക്കുക → correlation_id സഹിതമുള്ള JSON പിശക് (ഡാഷ്ബോർഡ് പേജുകൾ → 302 /login)
```

വിശ്വസനീയമായ ആന്തരിക ഹെഡറുകൾ (`src/server/authz/headers.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു) വർഗ്ഗീകരണത്തിനു മുമ്പ് **ഇൻകമിംഗ് അഭ്യർത്ഥനകളിൽനിന്ന് നീക്കംചെയ്യപ്പെടുന്നു** — ഒരു സബ്ജക്റ്റായി ആൾമാറാട്ടം നടത്താൻ ക്ലയന്റുകൾക്ക് `x-omniroute-auth-*` മുൻകൂട്ടി പൂരിപ്പിക്കാൻ കഴിയില്ല.

### പോളിസി കരാറുകൾ

ഓരോ റൂട്ട് ക്ലാസിനും `src/server/authz/policies/`-ൽ ഒരു പോളിസിയുണ്ട്:

- **`publicPolicy`** (`policies/public.ts`) — എല്ലായ്പ്പോഴും `allow({ kind: "anonymous", id: "anonymous" })` മടക്കിനൽകുന്നു.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ബെയറർ എക്സ്ട്രാക്റ്റ് ചെയ്ത് `validateApiKey()` വഴി സാധൂകരിക്കുന്നു. പ്രാബല്യത്തിലുള്ള `REQUIRE_API_KEY` ഫീച്ചർ ഫ്ലാഗ് പ്രവർത്തനരഹിതമായിരിക്കുമ്പോൾ മാത്രമേ അനോണിമസ് ആക്സസിലേക്ക് ഫാൾ ത്രൂ ചെയ്യൂ. ഡാഷ്ബോർഡ് ഫീച്ചർ ഫ്ലാഗുകളും എൻവയോൺമെന്റ് വേരിയബിളുകളും `/api/v1/*`, `/api/v1beta/*`, അവയുടെ അപരനാമങ്ങൾ എന്നിവയെ ഒരേ രീതിയിൽ നിയന്ത്രിക്കുന്നതിനായി, പ്രാബല്യത്തിലുള്ള ഫ്ലാഗ് `isRequireApiKeyEnabled()` (`DB ഫീച്ചർ ഫ്ലാഗ് ഓവർറൈഡ് > process.env.REQUIRE_API_KEY > ഡിഫോൾട്ട്`) വഴിയാണ് പരിഹരിക്കുന്നത്; റിസോൾവർ പരാജയങ്ങൾ ആക്സസ് നിഷേധിക്കും. ക്ലയന്റ് API റൂട്ടുകളിൽ ഡാഷ്ബോർഡ്-സെഷൻ അഭ്യർത്ഥനകൾ അനുവദിക്കുന്നു (ഡാഷ്ബോർഡ് മോഡൽ കാറ്റലോഗ് ഉപയോഗിക്കുന്ന `/api/v1/models` ഉൾപ്പെടെ).
- **`managementPolicy`** (`policies/management.ts`) — ഡാഷ്ബോർഡ് സെഷൻ, ആന്തരിക മോഡൽ-സിങ്ക് അഭ്യർത്ഥനകൾ (`/api/providers/[name]/(sync-models|models)`-മായി പൊരുത്തപ്പെടുത്തുന്നവ) എന്നിവ സ്വീകരിക്കുന്നു; അല്ലെങ്കിൽ `isAuthRequired()` false മടക്കിനൽകുകയാണെങ്കിൽ പൂർണ്ണമായും ഒഴിവാക്കുന്നു. ബെയറർ ടോക്കൺ നൽകിയിട്ടുണ്ടെങ്കിലും അസാധുവാണെങ്കിൽ 403 (`AUTH_001`) മടക്കിനൽകുന്നു; അല്ലെങ്കിൽ 401. ഏതെങ്കിലും ഓത്ത് ബ്രാഞ്ചിനു മുമ്പായി റൂട്ട്-ഗാർഡ് ടയറുകളും (LOCAL_ONLY / ALWAYS_PROTECTED) നിർബന്ധമാക്കുന്നു — [റൂട്ട് ഗാർഡ് ടയറുകൾ](../security/ROUTE_GUARD_TIERS.md) കാണുക. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-ലെ LOCAL_ONLY പാതകൾ (നിലവിൽ: `/api/mcp/`) ബെയറർ കീയിൽ `manage` സ്കോപ്പ് ഉണ്ടെങ്കിൽ നോൺ-ലൂപ്പ്ബാക്കിൽനിന്നും ആക്സസ് ചെയ്യാം; മറ്റ് എല്ലാ LOCAL_ONLY പാതകളും സ്കോപ്പ് പരിഗണിക്കാതെ സ്ട്രിക്റ്റ്-ലൂപ്പ്ബാക്കായി തുടരും.

വിജയകരമായ ഒരു പോളിസി `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ഉള്ള `AuthSubject` മടക്കിനൽകുന്നു. ഡൗൺസ്ട്രീം ഹാൻഡ്ലറുകൾക്ക് ഓത്ത് ലോജിക് വീണ്ടും പ്രവർത്തിപ്പിക്കുന്നതിനുപകരം `src/server/authz/assertAuth.ts`-ലെ `assertAuth(request, "CLIENT_API")` വഴി അത് വായിക്കാം.

## പൊതു റൂട്ടുകളുടെ പട്ടിക

`src/shared/constants/publicApiRoutes.ts` എന്നത് വ്യക്തമായ allowlist ആണ്:

പട്ടിക **ഘടന** അനുസരിച്ച് വിഭജിച്ചിരിക്കുന്നു, ഈ വിഭജനം നിർണായകമാണ് (GHSA-74g9-q8f6-793h): ഒരു prefix,
`startsWith()` ഉപയോഗിച്ചാണ് പൊരുത്തപ്പെടുത്തുന്നത്, അതിനാൽ അതേ ആരംഭ അക്ഷരങ്ങൾ പങ്കിടുന്ന സമീപത്തുള്ള എല്ലാ path-കളുമായും അത് പൊരുത്തപ്പെടും.
`/api/usage/om-usage` ഒരു prefix ആയി ഉപയോഗിച്ചപ്പോൾ `/api/usage/om-usage<anything>` PUBLIC ആയി അടയാളപ്പെടുത്തി, തുടർന്ന് Next അതിനെ
`/api/usage/[connectionId]` എന്നതിലേക്ക് resolve ചെയ്യുന്നു — സ്വന്തമായി auth ഇല്ലാത്ത ഒരു handler.

```ts
// യഥാർഥ subtree-കൾ. ഓരോ entry-യും "/"-ൽ അവസാനിക്കണം (unit test ഉപയോഗിച്ച് ഉറപ്പാക്കിയിരിക്കുന്നു).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ൽ CLIENT_API ആയി പരിഗണിക്കുന്നു, "no-auth public" ആയി അല്ല
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// കൃത്യമായി മാത്രം പൊരുത്തപ്പെടുത്തുന്ന ഒറ്റപ്പെട്ട route-കൾ (അവസാനത്തിൽ slash ഉണ്ടായാലും ഇല്ലെങ്കിലും).
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

// CORS origin ഇളവും ലഭിക്കുന്ന, read-only ആയ ഒറ്റപ്പെട്ട route-കൾ.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ഇളവ് ഇല്ലാത്ത read-only ഒറ്റപ്പെട്ട route.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

സുരക്ഷിതമായ method-ുകൾക്ക് **മാത്രമാണ്** read-only route-ുകൾ public ആകുന്നത്. ശ്രദ്ധിക്കുക: `classifyRoute()` `/api/v1/*`, `/api/v1beta/*` എന്നിവയെ PUBLIC fall-through-ൽ നിന്ന് ഒഴിവാക്കുന്നു — Bearer-key നയം തുടർന്നും ബാധകമാകുന്നതിനായി അവ എല്ലായ്പ്പോഴും `CLIENT_API` ആയിരിക്കും.

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

പൈപ്പ്ലൈൻ എല്ലായ്പ്പോഴും പ്രതികരണങ്ങളിൽ ഇനിപ്പറയുന്നവ ചേർക്കുന്നു:

```
x-request-id:               <കോറിലേഷൻ ഐഡി, പിശക് ബോഡികളിൽ പ്രതിധ്വനിക്കുന്നു>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ഓതന്റിക്കേറ്റ് ചെയ്ത അഭ്യർത്ഥനകൾക്കായി, അപ്സ്ട്രീം (ഹാൻഡ്ലർ-സൈഡ്) അഭ്യർത്ഥനാ ഹെഡറുകളിൽ ഇനിപ്പറയുന്നവയും ഉൾപ്പെടുന്നു:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<അവസാന-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ഐച്ഛികം)
x-omniroute-auth-scopes:    കോമ ഉപയോഗിച്ച് വേർതിരിച്ച പട്ടിക
```

ഹാൻഡ്ലറുകൾക്കുള്ളിൽ `assertAuth(req, expectedClass)` ഉപയോഗിക്കുക — മിഡിൽവെയർ മറികടന്നിട്ടുണ്ടെങ്കിൽ, ഇത് `AUTHZ_NOT_INITIALIZED` കോഡോടുകൂടിയ `AuthzAssertionError` എറിയുന്നു (ടെസ്റ്റുകളിൽ കോൺഫിഗറേഷൻ റിഗ്രഷനുകൾ കണ്ടെത്താൻ സഹായകരമാണ്).

## ഇതും കാണുക

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ഓരോ എൻഡ്പോയിന്റിനും വേണ്ടിയുള്ള ഓത്ത് മാർക്കർ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ഓത്ത് ഇവന്റുകൾക്കായുള്ള ഓഡിറ്റ് ലോഗ്
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — മൂന്ന് സ്കോപ്പ് നെയിംസ്പേസുകളും MCP ടൂൾ-സ്കോപ്പ് കാറ്റലോഗും
- ഉറവിടം: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
