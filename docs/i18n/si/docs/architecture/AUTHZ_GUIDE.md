# Authorization Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **සත්යයේ මූලාශ්රය:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **අවසන් වරට යාවත්කාලීන කරන ලදී:** 2026-09-22 — විෂය පථ නාම අවකාශ MCP-SERVER.md වෙත යොමු කරයි

OmniRoute සතුව සෑම API ඉල්ලීමක්ම පාලනය කරන මාර්ග-දැනුවත් අවසර නල මාර්ගයක් ඇත. වර්ගීකරණය **නිශ්චිත** සහ **අසාර්ථක-වසා දැමූ** වේ — වර්ගීකරණය කළ නොහැකි ඕනෑම දෙයක් `MANAGEMENT` ලෙස අවසන් වන අතර සැසියක් හෝ කළමනාකරණ-ශ්රේණියේ ටෝකනයක් ඉල්ලා සිටී. මෙම පිටුව මාර්ග නඩත්තු කරන හෝ නව අවසන් ලක්ෂ්ය සැලසුම් කරන ඉංජිනේරුවන් සඳහා ආකෘතිය පැහැදිලි කරයි.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> මූලාශ්රය: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## සත්යාපන ආකාර දෙකක්

### 1. API යතුර (Bearer)

OpenAI/Anthropic/Gemini-අනුකූල සේවාලාභී API සහ යතුරට `manage` විෂය පථය ඇති විට කළමනාකරණ මාර්ග කිහිපයක් සඳහා භාවිත කරයි.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` තුළ ඇති `isValidApiKey()` / `extractApiKey()` මඟින් වලංගු කර, `src/shared/utils/apiAuth.ts` හරහා නැවත නිර්යාත කරයි. වලංගුකාරකය ස්ථිර passthrough යතුරු ලෙස `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` පරිසර විචල්ය ද පිළිගනී (ගැටලුව #1350).

### 2. උපකරණ පුවරු සැසිය (auth_token කුකිය)

උපකරණ පුවරු පිටු සහ පරිපාලක මෙහෙයුම් සඳහාය.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT එක සත්යාපනය වී **සහ** `authenticated: true` අඩංගු වන විට පමණක් කුකියක් සැසියක් වේ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). කුකිය භාවිත කරන සෑම
අංගයක්ම (උපකරණ පුවරු මාර්ග ආරක්ෂකය (`isDashboardSessionAuthenticated()`), authz නලමාර්ග නැවුම් කිරීම, WebSocket අතට-අත දීම, සජීවී
සේවාදායකය, `/api/settings/require-login`, `/api/auth/status`) එම උපකාරකය හරහා යයි.
`JWT_SECRET` සමඟ අත්සන් කළ වෙනත් JWT ද පවතී — Cursor CLI passthrough එක යතුරු හිමියන් සඳහා
`iss "omniroute" / aud "cursor-cli"` ටෝකන නිකුත් කරයි — ඒවා කිසි විටෙකත් සැසි නොවේ
(#13298).

`src/shared/utils/apiAuth.ts` තුළ ඇති `isDashboardSessionAuthenticated()` මඟින් සත්යාපනය කරයි. JWT එකේ දින 30ක ආයු කාලයෙන් ඉතිරිව ඇත්තේ දින 7කට අඩු නම් නලමාර්ගය එය ස්වයංක්රීයව නැවුම් කරයි.

සෑම නිකුත්කරුවෙකුම `mintDashboardSessionToken` හරහා යන නිසා (නිකුත් කළ වේලාවක් `iat` සහ හැඳුනුම්කාරකයක් `jti`) සහ සත්යාපකය සැකසුම් දෙකක් පරීක්ෂා කරන නිසා, සැසියක් එහි දින 30 සම්පූර්ණ වීමට පෙරද අවසන් විය හැක: මුරපදය වෙනස් කිරීමකදී සකසන `sessionsValidAfter`, එමඟින් ඊට පෙර නිකුත් කළ සෑම සැසියක්ම තවදුරටත් සත්යාපනය නොවේ (මුරපදය වෙනස් කළ බ්රවුසරයට නව කුකියක් ලැබේ), සහ `POST /api/auth/logout` විසින් වරනය වූ සැසියේ `jti` එක එක් කරන `revokedDashboardSessions`. පැරණි නිකුතුවකින් නිකුත් කළ සැසිවල මෙම ක්ලේම් දෙකෙන් එකක්වත් නොමැති අතර, පළමු මුරපද වෙනස් කිරීම දක්වා ඒවා වලංගුව පවතී. සැකසුම් කියවිය නොහැකි නම්, සැසිය විශ්වාස නොකරයි.

සමහර කළමනාකරණ මාර්ග **ආකාර දෙකෙන් ඕනෑම එකක්** පිළිගනී: කුකිය හෝ API යතුරට `manage` (හෝ `admin`) විෂය පථය ඇති විට `Bearer <key>`. v3.8 හි එක් කළ "API ඇමතුම් හරහා වින්යාස කළ හැකි" කාර්ය ප්රවාහය සක්රීය කරන්නේ මෙයයි.

#### විකල්ප OIDC පිවිසුම් ද්වාරය (#6973)

උපකරණ පුවරුවේ පරිපාලක පිවිසුම පෙරනිමි මුරපද පිවිසුම සමඟ **තෝරා සක්රීය කළ හැකි** OIDC (OpenID Connect) ප්රවාහයකට ද සහාය දක්වයි — මුරපද පිවිසුම කිසි විටෙකත් ඉවත් නොකරන අතර, එයට අතිරේකයක් ලෙස පමණක් මෙය සපයයි:

- `settings.oidcEnabled === true` **වීමත්** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` සියල්ල වින්යාස කර තිබීමත් (Settings → Auth)
  සිදු නොවන්නේ නම් අක්රිය කර ඇත. එසේ නොමැති විට
  `GET /api/auth/oidc/login` විසින් `400` ආපසු ලබා දෙයි.
- `GET /api/auth/oidc/login` විසින් නිකුත් කරන්නාගේ
  `/.well-known/openid-configuration` වෙතින් `authorization_endpoint` සොයා ගනී
  (`<issuer>/authorize` වෙත පසුබසී), ලැබෙන ඉල්ලීමෙන් යළි-යොමු කිරීමේ URI එක
  සාදයි (`x-forwarded-proto` පිළිබඳ දැනුවත්), සහ `httpOnly` `oidc_state` කුකියක
  ගබඩා කළ අහඹු `state` අගයක් සමඟ IdP වෙත යළි යොමු කරයි.
- `GET /api/auth/oidc/callback` විසින් `state` වලංගු කර, අවසර දීමේ කේතය
  හුවමාරු කර, `issuer`/`audience` පරීක්ෂා සමඟ නිකුත් කරන්නාගේ JWKS හරහා
  (`jose` හි `createRemoteJWKSet`, එක් එක් JWKS URI සඳහා හැඹිලිගත කර ඇත)
  ID ටෝකනයේ අත්සන සත්යාපනය කරයි. උපකරණ පුවරුවට ඇතුළත් වීමට හිස් නොවන
  `oidcAllowedSubjects` ලැයිස්තුවක්, `oidcAdmissionClaim` ප්රතිපත්තියක්, හෝ
  දෙකම අවශ්ය වේ. විෂය ලැයිස්තුව `sub` හෝ `email` සමඟ ගැළපෙන්නේ
  `email_verified === true` වූ විට පමණි. විකල්ප claim ප්රතිපත්තිය තිත් මඟින්
  වෙන් කළ ID-ටෝකන claim මාර්ගයක් (උදාහරණයක් ලෙස, `realm_access.roles`) සහ
  පිළිගත් අගයන්ගෙන් යුත් අරාවක් ගනී; නිරාකරණය කළ claim එක අවම වශයෙන් එක්
  පිළිගත් අගයක්වත් අඩංගු තන්තු අරාවක් විය යුතුය. ප්රතිපත්ති දෙකම වින්යාස
  කර ඇත්නම්, දෙකම සමත් විය යුතුය. නොමැති/විකෘති claim ආරක්ෂිත ලෙස අසමත් වන
  අතර, ප්රතිපත්ති දෙකෙන් එකක්වත් නොමැති විට callback එක ප්රවිෂ්ට වීම
  ප්රතික්ෂේප කරයි (`not_configured`). දැනට පවතින විෂය-පමණක් වින්යාස
  වෙනසක් නොමැතිව දිගටම ක්රියා කරයි.
- Keycloak සාමාන්යයෙන් realm භූමිකා ID ටෝකනවලට නොව access token තුළට සිතියම්ගත
  කරයි. `admin` realm භූමිකාව අවශ්ය කිරීමට, මෙම client සඳහා එහි **ID
  ටෝකනයට** `realm_access.roles` ඇතුළත් කරන protocol mapper එකක් වින්යාස කර,
  ඉන්පසු `oidcAdmissionClaim` එක
  `{ "path": "realm_access.roles", "values": ["admin"] }` ලෙස සකසන්න.
  භූමිකාව-පමණක් ඇතුළත් කිරීම සක්රිය කිරීමට පෙර මෙම client සඳහා සැබෑ ID-ටෝකන
  claim එක පරීක්ෂා කරන්න; යෙදුම access-token භූමිකා කියවන්නේ නැත. IdP පාර්ශ්වයේ
  ටෝකන ප්රතික්ෂේප කිරීමෙන් මෙයට අමතර ආරක්ෂාවක් සැපයිය හැකි නමුත්, මෙම යෙදුම්
  පාර්ශ්වීය පරීක්ෂාව එයින් ප්රතිස්ථාපනය නොවේ.
- සාර්ථක වූ විට, මුරපද ප්රවිෂ්ට වීම නිකුත් කරන **හරියටම එම** දින 30ක
  `auth_token` JWT එකම එය නිර්මාණය කරයි
  (`src/app/api/auth/login/route.ts`), එබැවින් උපකරණ පුවරුවේ සැසි නලමාර්ගයේ
  ඉතිරි කොටස (ස්වයංක්රීය නැවුම් කිරීම, කුකි සලකුණු) වෙනස් නොවේ — OIDC මඟින්
  ප්රතිස්ථාපනය වන්නේ කුකිය නිර්මාණය කරන ආකාරය පමණක් මිස එයින් ලබා දෙන
  අවසර නොවේ. IdP භූමිකා/කණ්ඩායම්වල වෙනස්කම් දැනට පවතින OmniRoute සැසි අවලංගු
  නොකරයි; ඒවායේ ආයු කාලය තවදුරටත් පාලනය කරන්නේ ඉවත් වීම, මුරපද මාරු කිරීම,
  හෝ සැසි කල් ඉකුත් වීමයි.
- සෑම `oidc*` සැකසුමක්ම (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`)
  `SECURITY_IMPACTING_SETTINGS_KEYS` තුළ ඇත
  (`src/shared/constants/securityImpactingSettings.ts`): body එකේ කළමනාකරණ
  මුරපදය `currentPassword` ලෙස නොමැති නම් `PATCH /api/settings` විසින්
  `400 PASSWORD_REQUIRED` පිළිතුරු දෙයි (එය වැරදි නම්
  `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` මුරපද _ප්රවිෂ්ට වීම_
  (`POST /api/auth/login`) ප්රතික්ෂේප කරන නමුත් ගබඩා කළ මුරපද hash එක තබා ගනී,
  තවද නැවත සත්යාපනයේදී තවමත් `currentPassword` එයට එරෙහිව පරීක්ෂා කරයි.
- `corsOrigins` සහ `bruteForceProtection` ද `SECURITY_IMPACTING_SETTINGS_KEYS`
  තුළ ඇත: දෙකෙන් එකක් හෝ ලිහිල් කිරීම ප්රවිෂ්ට වීමේ ආරක්ෂණ දුර්වල කරන බැවින්,
  ඒවාටත් එම `currentPassword` නැවත සත්යාපනය අවශ්ය වේ (Security ටැබය එය
  ඉල්ලා සිටී), JSON ආයාතය ඒවා ඉවත් කරයි.
- සෑම ආරක්ෂක-ප්රතිපත්ති යතුරක්ම — `SECURITY_IMPACTING_SETTINGS_KEYS` ඇතුළත්
  කිරීම්, සෑම `oidc*` යතුරක්ම සහ උපකරණ පුවරුවේ සැසි තත්ත්වය — `PATCH
/api/settings` හි **ක්රියාකරුට පමණක්** සීමා වේ: නිවැරදි
  `currentPassword` යැවූ විට පවා manage විෂය පථයක් සහිත API යතුරක් හෝ `oma_`
  access token එකක් `403` සමඟ ප්රතික්ෂේප කරන අතර, එම ප්රතික්ෂේප කිරීම
  `reason: OPERATOR_REQUIRED` සමඟ `settings.update_failed` ලෙස විගණනය කෙරේ
  (`src/lib/api/operatorCredential.ts` හි `requireOperatorCredential()`).
  සාමාන්ය සැකසුම් (තේමාව, දර්ශන අභිරුචි) `manage` යතුරකට හෝ `admin` access
  token එකකට ලිවිය හැකිව පවතී. `/api/settings` හිම (සහ
  `/api/settings/require-login` හි) සෑම වෙනස් කිරීමකටම `admin` access-token
  විෂය පථයද අවශ්ය වේ (`src/server/authz/accessScopes.ts` හි
  `ADMIN_MUTATION_EXACT_PATHS`, නිශ්චිත-මාර්ග ගැළපීම); `GET` සඳහා `read`
  එලෙසම පවතින අතර, අනෙකුත් `/api/settings/*` උප-මාර්ග (proxies, combo
  defaults, model aliases, compression, purges…) ක්රමයෙන් අනුමාන කළ `write`
  විෂය පථය තබා ගනී.
- `POST /api/settings/import-json` එම නැවත සත්යාපනය මඟ හරින බැවින්, ලිවීමට
  පෙර `IMPORT_STRIPPED_SETTINGS_KEYS` හි (එම ගොනුවේ) සෑම යතුරක්ම ඉවත් කරයි:
  මුරපදය සහ `currentPassword`, සෑම `SECURITY_IMPACTING_SETTINGS_KEYS`
  ඇතුළත් කිරීමක්ම, සහ උපකරණ පුවරුවේ සැසි තත්ත්වය (`sessionsValidAfter`,
  `revokedDashboardSessions`). එබැවින් පැරණි උපස්ථයක් ආයාත කිරීමෙන්, මුරපද
  වෙනස් කිරීමකින් හෝ ඉවත් වීමකින් දැනටමත් අවසන් කළ සැසියක් නැවත සක්රිය කළ
  නොහැක.

## මාර්ග පන්ති

`src/server/authz/types.ts` පන්ති තුනක් අර්ථ දක්වයි; තීරණාත්මකව වර්ගීකරණය කළ නොහැකි ඕනෑම මාර්ගයක් `MANAGEMENT` වෙත ආපසු වැටේ.

| පන්තිය       | විස්තරය                                                                                                                                             | සත්‍යාපනය අවශ්‍ය වේ                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `PUBLIC`     | පැහැදිලිවම ආරක්ෂිත මාර්ග — පිවිසීම, පිටවීම, තත්ත්වය, ආරම්භය, සෞඛ්‍යය, ඔන්බෝඩින් බූට්ස්ට්‍රැප්.                                                      | නැත                                                           |
| `CLIENT_API` | ආකෘති-සේවා endpoints — `/api/v1/*`, `/api/v1beta/*`, සහ අන්වර්ථ නාම `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | ඵලදායී `REQUIRE_API_KEY` විශේෂාංග ධජය සක්‍රිය විට Bearer යතුර |
| `MANAGEMENT` | ඩෑෂ්බෝඩ් පිටු, සැකසුම්, සපයන්නන්, යතුරු, පරිපාලක සහ රෝග විනිශ්චය endpoints.                                                                         | ඩෑෂ්බෝඩ් සැසිය හෝ `manage` විෂය පථය සහිත Bearer               |

`MANAGEMENT` ක්‍රියා කිහිපයක් **ක්‍රියාකරු-පමණක්** වේ: `manage` යතුරක් ප්‍රමාණවත් නොවේ. ගබඩා කළ අක්තපත්‍ර නිර්යාත කිරීම (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), දැනට පවතින දත්ත මත උපස්ථයක් ප්‍රත්‍යාස්ථාපනය කිරීම (`dryRun=true` ඇතුළුව `POST /api/db-backups/import`, id අනුව `POST /api/db-backups` ප්‍රත්‍යාස්ථාපනය, `POST /api/settings/import-json`), ප්‍රත්‍යාස්ථාපන ලක්ෂ්‍ය විනාශ කිරීම (`DELETE /api/db-backups` පිරිසිදු කිරීම, සහ `PATCH /api/db-backups` — එය ස්ථාවර කරන රඳවා ගැනීම සෑම උපස්ථයකින් පසු ස්වයංක්‍රීය කප්පාදුව පාලනය කරන නිසා) ඩෑෂ්බෝඩ් සැසියක්, දේශීය CLI විෂයක්, හෝ පිවිසුම අක්‍රිය කිරීමක් අවශ්‍ය කරයි. සමමුහුර්තකරණ ටෝකනයක් නිකුත් කිරීම (`POST /api/sync/tokens`) සහ `admin` CLI ප්‍රවේශ ටෝකනයක් ටංකනය කිරීම (`POST /api/cli/tokens`) සෑම පිවිසුම් ප්‍රකාරයකම ඩෑෂ්බෝඩ් සැසියක් හෝ දේශීය CLI විෂයක් අවශ්‍ය කරයි. ඕනෑම විෂය පථයක API යතුරු සහ `oma_` ප්‍රවේශ ටෝකන මෙහෙයුම්කරු අක්තපත්‍ර නොවේ: එකක් අවශ්‍ය වන විට ඒවාට `403` ලැබේ. පරීක්ෂාව `src/lib/api/operatorCredential.ts` හි ඇත (`resolveOperatorCredential()` / `requireOperatorCredential()`). පිවිසුම් සැකසුම් වෙනස් කිරීමද ක්‍රියාකරු-පමණකි: `POST /api/settings/require-login` (කළමනාකරණ මුරපදය සකසන / `requireLogin` මාරු කරන) මුරපදයක් පවතින විට පමණක් එම අක්තපත්‍ර පිළිගනී — පළමු-ධාවන ආරම්භක කවුළුව (තවම මුරපදයක් නැත) වෙනස් නොවේ — සහ ඩෑෂ්බෝඩ් සැසියක් මුරපදය ප්‍රතිස්ථාපනය කිරීමට `currentPassword` යැවිය යුතුය (එය නැති හෝ වැරදි නම් `403`, `settings.update_failed` ලෙස විගණනය කෙරේ). දේශීය CLI සහ පිවිසුම අක්‍රිය කළ අවස්ථාව ප්‍රතිසාධන මාර්ගය තබා ගන්නා අතර, දෙකම දත්ත නාමාවලිය හිමි සත්කාරකයට බැඳී ඇති නිසා, එය නොමැතිව මුරපදයක් සැකසිය හැක.

## නළ මාර්ගය

```
පැමිණෙන ඉල්ලීම → src/proxy.ts
  → src/server/authz/pipeline.ts තුළ runAuthzPipeline()
    1. විශ්වාසදායක අභ්යන්තර ශීර්ෂ ඉවත් කරන්න (x-omniroute-auth-*, x-omniroute-route-class)
    2. ඉල්ලීම් හැඳුනුම්කාරකයක් ජනනය කර, classifyRoute() හරහා මාර්ගය වර්ගීකරණය කරන්න
    3. pathname == "/" නම් → /dashboard වෙත යළි යොමු කරන්න
    4. සේවාව ක්රමිකව වසා දමමින් පවතින්නේ නම් සහ /api/* නම් → 503
    5. GET නොවන /api/* නම් → checkBodySize() ආරක්ෂණය පරීක්ෂා කරන්න
    6. OPTIONS නම් → CORS පූර්ව ඉල්ලීම සඳහා 204
    7. options.enforce == false නම් → මාර්ග-පන්ති ශීර්ෂ සමඟ වෙනසකින් තොරව ඉදිරියට යවන්න
    8. එසේ නොමැති නම්: POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} සලකුණු කරන්න → NextResponse.next()
       - reject → correlation_id සහිත JSON දෝෂයක් (උපකරණ පුවරු පිටු → 302 /login)
```

විශ්වාසදායක අභ්යන්තර ශීර්ෂ (`src/server/authz/headers.ts` තුළ නිර්වචනය කර ඇත) වර්ගීකරණයට පෙර **පැමිණෙන ඉල්ලීම්වලින් ඉවත් කරනු ලැබේ** — විෂයයක් ලෙස පෙනී සිටීමට සේවාලාභීන්ට `x-omniroute-auth-*` පූර්වයෙන් පිරවිය නොහැක.

### ප්රතිපත්ති ගිවිසුම්

සෑම මාර්ග පන්තියකටම `src/server/authz/policies/` තුළ ප්රතිපත්තියක් ඇත:

- **`publicPolicy`** (`policies/public.ts`) — සෑම විටම `allow({ kind: "anonymous", id: "anonymous" })` ආපසු ලබා දෙයි.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer එක උපුටාගෙන `validateApiKey()` හරහා වලංගු කරයි. ක්රියාත්මක `REQUIRE_API_KEY` විශේෂාංග ධජය අක්රීය කර ඇති විට පමණක් නිර්නාමික ප්රවේශයට ඉඩ දෙයි. ක්රියාත්මක ධජය `isRequireApiKeyEnabled()` (`DB විශේෂාංග ධජ අභිබවා යාම > process.env.REQUIRE_API_KEY > පෙරනිමිය`) හරහා විසඳන බැවින්, උපකරණ පුවරුවේ විශේෂාංග ධජ සහ පරිසර විචල්ය මඟින් `/api/v1/*`, `/api/v1beta/*`, සහ අන්වර්ථ නාම එකම ආකාරයෙන් පාලනය කරයි; විසඳුම්කරණ අසාර්ථකත්වයකදී ප්රවේශය වසා තබයි. සේවාලාභී API මාර්ගවල උපකරණ පුවරු සැසි ඉල්ලීම්වලට ඉඩ දෙයි (උපකරණ පුවරුවේ මාදිලි නාමාවලිය භාවිත කරන `/api/v1/models` ඇතුළුව).
- **`managementPolicy`** (`policies/management.ts`) — උපකරණ පුවරු සැසියක්, අභ්යන්තර මාදිලි-සමමුහුර්ත ඉල්ලීම් (`/api/providers/[name]/(sync-models|models)` සමඟ ගළපන), පිළිගනී; නැතහොත් `isAuthRequired()` false ලබා දෙන්නේ නම් සම්පූර්ණයෙන්ම මඟ හරියි. Bearer ටෝකනයක් තිබුණත් එය වලංගු නොවන විට 403 (`AUTH_001`) ද, එසේ නොමැති විට 401 ද ආපසු ලබා දෙයි. ඕනෑම සත්යාපන ශාඛාවකට පෙර මාර්ග-ආරක්ෂණ මට්ටම් (LOCAL_ONLY / ALWAYS_PROTECTED) ද බලාත්මක කරයි — [මාර්ග ආරක්ෂණ මට්ටම්](../security/ROUTE_GUARD_TIERS.md) බලන්න. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` තුළ ඇති LOCAL_ONLY මාර්ගවලට (දැනට: `/api/mcp/`) Bearer යතුරේ `manage` විෂය පථය තිබේ නම් ලූප්බැක් නොවන ස්ථානයකින් ප්රවේශ විය හැක; අනෙක් සියලුම LOCAL_ONLY මාර්ග විෂය පථය නොසලකා දැඩි ලෙස ලූප්බැක් වෙත පමණක් සීමා වේ.

සාර්ථක ප්රතිපත්තියක් `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` සහිත `AuthSubject` එකක් ආපසු ලබා දෙයි. සත්යාපන තර්කනය නැවත ක්රියාත්මක කිරීම වෙනුවට, පහළ ප්රවාහයේ හසුරුවන්නන්ට `src/server/authz/assertAuth.ts` තුළ ඇති `assertAuth(request, "CLIENT_API")` හරහා එය කියවිය හැක.

## පොදු මාර්ග ලැයිස්තුව

`src/shared/constants/publicApiRoutes.ts` යනු පැහැදිලි අවසර ලැයිස්තුවයි:

ලැයිස්තුව **හැඩය** අනුව බෙදා ඇති අතර, එම බෙදීම අත්යවශ්ය වේ (GHSA-74g9-q8f6-793h): උපසර්ගයක්
`startsWith()` මඟින් ගැළපෙන බැවින්, එහි ආරම්භක අක්ෂර බෙදාගන්නා යාබද සෑම මාර්ගයක්ම ද එයට ගැළපේ.
උපසර්ගයක් ලෙස `/api/usage/om-usage` භාවිත කිරීමෙන් `/api/usage/om-usage<anything>` PUBLIC ලෙස සලකුණු වූ අතර, Next විසින්
එය `/api/usage/[connectionId]` වෙත නිරාකරණය කරයි — එය තමන්ගේම සත්යාපනයක් නොමැති හසුරුවනයකි.

```ts
// සැබෑ උපවෘක්ෂ. සෑම ඇතුළත් කිරීමක්ම "/" අක්ෂරයෙන් අවසන් විය යුතුය (ඒකක පරීක්ෂණයකින් තහවුරු කර ඇත).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify තුළ CLIENT_API ලෙස සලකයි, "no-auth public" ලෙස නොවේ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// තනි මාර්ග, හරියටම ගැළපේ (අවසානයේ slash එකක් තිබුණත් නැතත්).
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

// CORS origin ලිහිල් කිරීම ද ලබන, කියවීමට පමණක් වූ තනි මාර්ග.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ලිහිල් කිරීම නොමැති, කියවීමට පමණක් වූ තනි මාර්ගය.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

කියවීමට පමණක් වූ මාර්ග පොදු වන්නේ ආරක්ෂිත ක්රම සඳහා **පමණි**. සටහන: `classifyRoute()` විසින් `/api/v1/*` සහ `/api/v1beta/*` PUBLIC පසුබැසීමෙන් බැහැර කරයි — Bearer යතුරු ප්රතිපත්තිය තවදුරටත් අදාළ වන පරිදි ඒවා සැමවිටම `CLIENT_API` වේ.

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

## දෝෂහරණය

පයිප්ලයිනය සැමවිටම ප්රතිචාරවලට පහත ශීර්ෂ එක් කරයි:

```
x-request-id:               <සහසම්බන්ධතා හැඳුනුම්කාරකය, දෝෂ අන්තර්ගතයන් තුළ ප්රතිරාවය කෙරේ>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

සත්යාපිත ඉල්ලීම් සඳහා, upstream (හැසිරවුම්කරුගේ පැත්තේ) ඉල්ලීම් ශීර්ෂවලට පහත ඒවාද ඇතුළත් වේ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<අවසන්-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (විකල්ප)
x-omniroute-auth-scopes:    කොමාවෙන් වෙන් කළ ලැයිස්තුව
```

හැසිරවුම්කරුවන් තුළ `assertAuth(req, expectedClass)` භාවිත කරන්න — middleware මඟහැර තිබේ නම්, එය `AUTHZ_NOT_INITIALIZED` කේතය සමඟ `AuthzAssertionError` නිකුත් කරයි (පරීක්ෂණවලදී වින්යාස ප්රතිගමන හඳුනාගැනීමට උපකාරී වේ).

## තවදුරටත් බලන්න

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — එක් එක් අන්ත ලක්ෂ්යය සඳහා සත්යාපන සලකුණ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — සත්යාපන සිදුවීම් සඳහා විගණන ලොගය
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — විෂය පථ නාම අවකාශ තුනක් සහ MCP මෙවලම්-විෂය පථ නාමාවලිය
- මූලාශ්රය: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
