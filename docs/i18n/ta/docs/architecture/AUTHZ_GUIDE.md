# Authorization Guide (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **உண்மையின் ஆதாரம்:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-09-22 — ஸ்கோப் நேம்ஸ்பேஸ்கள் MCP-SERVER.md ஐக் குறிக்கின்றன

OmniRoute ஆனது ஒவ்வொரு API கோரிக்கையையும் கட்டுப்படுத்தும் ஒரு வழித்தட-அறிந்த அங்கீகாரப் பைப்லைனைக் கொண்டுள்ளது. வகைப்பாடு **நிர்ணயிக்கக்கூடியது** மற்றும் **தோல்வியுற்றால் மூடும்** — வகைப்படுத்த முடியாத எதுவும் `MANAGEMENT` ஆக முடிவடைகிறது மற்றும் ஒரு அமர்வு அல்லது மேலாண்மை-தர டோக்கனைக் கோருகிறது. இந்த பக்கம் வழித்தடங்களை பராமரிக்கும் அல்லது புதிய இறுதிப்புள்ளிகளை வடிவமைக்கும் பொறியாளர்களுக்கான மாதிரியை விளக்குகிறது.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ஆதாரம்: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## இரண்டு அங்கீகார முறைகள்

### 1. API விசை (Bearer)

OpenAI/Anthropic/Gemini-க்கு இணக்கமான கிளையன்ட் API-களுக்கும், விசையில் `manage` scope இருக்கும் போது சில நிர்வாக வழித்தடங்களுக்கும் பயன்படுத்தப்படுகிறது.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`-இல் உள்ள `isValidApiKey()` / `extractApiKey()` மூலம் சரிபார்க்கப்பட்டு, `src/shared/utils/apiAuth.ts` வழியாக மீண்டும் ஏற்றுமதி செய்யப்படுகிறது. `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars-ஐ நிலையான passthrough விசைகளாகவும் சரிபார்ப்பி ஏற்றுக்கொள்கிறது (issue #1350).

### 2. டாஷ்போர்டு அமர்வு (`auth_token` cookie)

டாஷ்போர்டு பக்கங்களுக்கும் நிர்வாகச் செயல்பாடுகளுக்கும் பயன்படுத்தப்படுகிறது.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT சரிபார்க்கப்பட்டு, `authenticated: true` என்பதைக் கொண்டிருந்தால் மட்டுமே cookie ஒரு அமர்வாகக் கருதப்படும்
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). cookie-ஐப் பயன்படுத்தும் ஒவ்வொரு நுகர்வாளரும் (டாஷ்போர்டு வழித்தடக் காவலர் (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) அந்த உதவியாளர் வழியாகவே செல்கின்றனர்.
`JWT_SECRET` மூலம் கையொப்பமிடப்பட்ட பிற JWT-களும் உள்ளன — விசை வைத்திருப்பவர்களுக்காக Cursor CLI passthrough
`iss "omniroute" / aud "cursor-cli"` token-களை உருவாக்குகிறது — அவை ஒருபோதும் அமர்வுகளாகாது
(#13298).

`src/shared/utils/apiAuth.ts`-இல் உள்ள `isDashboardSessionAuthenticated()` மூலம் சரிபார்க்கப்படுகிறது. 30 நாள் ஆயுட்காலத்தில் 7 நாட்களுக்கும் குறைவாக மீதமிருக்கும்போது pipeline தானாகவே JWT-ஐப் புதுப்பிக்கிறது.

ஒவ்வொரு minter-மும் `mintDashboardSessionToken` வழியாகச் செல்வதால் (ஒரு issue time `iat` மற்றும் ஓர் id `jti`), மேலும் verifier இரண்டு அமைப்புகளைச் சரிபார்ப்பதால், அதன் 30 நாட்கள் முடிவதற்கு முன்பும் ஒரு அமர்வு முடிவடையலாம்: `sessionsValidAfter`, இது கடவுச்சொல் மாற்றத்தால் அமைக்கப்பட்டு, அதற்கு முன் வழங்கப்பட்ட ஒவ்வொரு அமர்வும் சரிபார்ப்பில் தோல்வியடையச் செய்கிறது (கடவுச்சொல்லை மாற்றிய உலாவி புதிய cookie-ஐப் பெறுகிறது), மற்றும் `revokedDashboardSessions`, இதில் `POST /api/auth/logout` வெளியேறிய அமர்வின் கையொப்பமிடப்பட்ட `jti`-ஐச் சேர்க்கிறது. பழைய release மூலம் உருவாக்கப்பட்ட அமர்வுகளில் இந்த claims இரண்டும் இருக்காது; ஆகவே முதல் கடவுச்சொல் மாற்றம் வரை அவை செல்லுபடியாக இருக்கும். அமைப்புகளைப் படிக்க முடியாவிட்டால், அந்த அமர்வு நம்பகமானதாகக் கருதப்படாது.

சில நிர்வாக வழித்தடங்கள் **இரு** முறைகளில் ஏதேனும் ஒன்றை ஏற்றுக்கொள்கின்றன: cookie அல்லது `manage` (அல்லது `admin`) scope கொண்ட API விசையுடன் `Bearer <key>`. v3.8-இல் சேர்க்கப்பட்ட “API அழைப்புகள் மூலம் கட்டமைக்கக்கூடிய” பணிச்செயல்முறையை இது செயல்படுத்துகிறது.

#### விருப்பத் தேர்வு OIDC உள்நுழைவு வாயில் (#6973)

இயல்புநிலை கடவுச்சொல் உள்நுழைவுடன் கூடுதலாக, டாஷ்போர்டு நிர்வாகி உள்நுழைவு OIDC (OpenID Connect) flow-ஐயும் ஆதரிக்கிறது
— கடவுச்சொல் உள்நுழைவு ஒருபோதும் நீக்கப்படாது; அது கூடுதலாக மட்டுமே வழங்கப்படுகிறது:

- `settings.oidcEnabled === true` **மற்றும்** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ஆகிய அனைத்தும் கட்டமைக்கப்பட்டிருந்தால் மட்டுமே
  இயங்கும் (அமைப்புகள் → அங்கீகாரம்). இல்லையெனில்
  `GET /api/auth/oidc/login` `400` என்பதைத் திருப்பும்.
- `GET /api/auth/oidc/login`, issuer-ன்
  `/.well-known/openid-configuration` இலிருந்து `authorization_endpoint`-ஐ
  கண்டறியும் (`<issuer>/authorize`-க்கு fallback ஆகும்), உள்வரும் கோரிக்கையிலிருந்து
  (`x-forwarded-proto`-ஐ கருத்தில் கொண்டு) redirect URI-ஐ உருவாக்கும், மேலும்
  `httpOnly` `oidc_state` cookie-ல் சேமிக்கப்படும் சீரற்ற `state` மதிப்புடன் IdP-க்கு
  redirect செய்யும்.
- `GET /api/auth/oidc/callback`, `state`-ஐ சரிபார்த்து, authorization
  code-ஐ பரிமாறி, issuer-ன் JWKS வழியாக (`jose`-ன் `createRemoteJWKSet`,
  JWKS URI-க்கு ஒவ்வொன்றாக cache செய்யப்படும்) ID token-ன் கையொப்பத்தை
  `issuer`/`audience` சரிபார்ப்புகளுடன் உறுதிப்படுத்தும். Dashboard-க்கான
  அனுமதிக்கு காலியாக இல்லாத `oidcAllowedSubjects` பட்டியல், `oidcAdmissionClaim`
  கொள்கை, அல்லது இரண்டும் தேவை. `email_verified === true` ஆக இருக்கும்போது
  மட்டுமே subject பட்டியல் `sub` அல்லது `email` உடன் பொருந்தும். விருப்பமான claim
  கொள்கை, புள்ளிகளால் பிரிக்கப்பட்ட ID-token claim பாதையை (உதாரணமாக,
  `realm_access.roles`) மற்றும் ஏற்றுக்கொள்ளப்பட்ட மதிப்புகளின் array-ஐ பெறும்;
  தீர்க்கப்பட்ட claim, குறைந்தது ஒரு ஏற்றுக்கொள்ளப்பட்ட மதிப்பைக் கொண்ட strings-ன்
  array ஆக இருக்க வேண்டும். இரு கொள்கைகளும் கட்டமைக்கப்பட்டிருந்தால், இரண்டும்
  வெற்றிபெற வேண்டும். காணாமல் போன அல்லது தவறான வடிவிலான claims பாதுகாப்பான
  மறுப்பாகக் கருதப்படும்; எந்தக் கொள்கையும் இல்லையெனில் callback உள்நுழைவை
  மறுக்கும் (`not_configured`). ஏற்கனவே உள்ள subject-only கட்டமைப்புகள் மாற்றமின்றி
  தொடரும்.
- Keycloak பொதுவாக realm roles-ஐ ID tokens-ல் அவசியம் அல்லாமல் access tokens-ல்
  map செய்யும். `admin` realm role தேவைப்பட்டால், `realm_access.roles`-ஐ
  **ID token**-ல் சேர்க்கும் வகையில் இந்த client-க்கான protocol mapper-ஐ
  கட்டமைத்து, பின்னர் `oidcAdmissionClaim`-ஐ
  `{ "path": "realm_access.roles", "values": ["admin"] }` என அமைக்கவும்.
  role-only admission-ஐ இயக்குவதற்கு முன், இந்த client-க்கான உண்மையான ID-token
  claim-ஐச் சரிபார்க்கவும்; பயன்பாடு access-token roles-ஐப் படிக்காது. IdP தரப்பிலான
  token மறுப்பு, இந்த பயன்பாடு தரப்பிலான சரிபார்ப்புக்கு துணையாக இருக்கலாம்;
  ஆனால் அதற்குப் பதிலாக அமையாது.
- வெற்றியடைந்ததும், password login வழங்கும் அதே **முற்றிலும் ஒரே** 30-நாள்
  `auth_token` JWT-ஐ (`src/app/api/auth/login/route.ts`) உருவாக்கும். எனவே
  dashboard session pipeline-ன் மீதிப் பகுதி (auto-refresh, cookie flags)
  மாற்றமின்றி இருக்கும் — cookie எவ்வாறு உருவாக்கப்படுகிறது என்பதை மட்டுமே OIDC
  மாற்றுகிறது; அது வழங்கும் அனுமதிகளை மாற்றாது. IdP roles/groups-ல் ஏற்படும்
  மாற்றங்கள் ஏற்கனவே உள்ள OmniRoute sessions-ஐ செல்லாததாக்காது; logout,
  password rotation அல்லது session expiry ஆகியவையே அவற்றின் கால அளவை
  கட்டுப்படுத்தும்.
- ஒவ்வொரு `oidc*` அமைப்பும் (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) அனைத்தும்
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ல்
  (`src/shared/constants/securityImpactingSettings.ts`) உள்ளன:
  `PATCH /api/settings`, body-ல் management password-ஐ
  `currentPassword` ஆகக் கொண்டிருக்காவிட்டால் `400 PASSWORD_REQUIRED` எனப்
  பதிலளிக்கும் (`currentPassword` தவறாக இருந்தால் `401 PASSWORD_MISMATCH`).
  `oidcDisablePasswordLogin`, password _login_-ஐ (`POST /api/auth/login`)
  மறுக்கும்; ஆனால் சேமிக்கப்பட்ட password hash-ஐ வைத்திருக்கும், மேலும் மீண்டும்
  அங்கீகரிக்கும்போதும் `currentPassword` அதனுடன் சரிபார்க்கப்படும்.
- `corsOrigins` மற்றும் `bruteForceProtection` ஆகியவையும்
  `SECURITY_IMPACTING_SETTINGS_KEYS`-ல் உள்ளன: இவற்றில் ஏதேனும் தளர்த்தப்படுவது
  login பாதுகாப்புகளை பலவீனப்படுத்தும். எனவே இவைகளுக்கும் அதே
  `currentPassword` மறுஅங்கீகாரம் தேவைப்படுகிறது (Security tab இதைக்
  கேட்கும்), மேலும் JSON import இவற்றை நீக்கிவிடும்.
- ஒவ்வொரு security-policy key-உம் — `SECURITY_IMPACTING_SETTINGS_KEYS`-ன்
  entries, ஒவ்வொரு `oidc*` key மற்றும் dashboard session state — ஆகியவை
  `PATCH /api/settings`-ல் **operator-only** ஆகும்: manage-scoped API key அல்லது
  `oma_` access token, சரியான `currentPassword`-ஐ அனுப்பினாலும் `403` என
  மறுக்கப்படும்; இந்த மறுப்பு `settings.update_failed` ஆகவும்
  `reason: OPERATOR_REQUIRED` உடனும் audit செய்யப்படும்
  (`src/lib/api/operatorCredential.ts`-ல் உள்ள
  `requireOperatorCredential()`). சாதாரண அமைப்புகள் (theme, display
  preferences), `manage` key அல்லது `admin` access token கொண்டவர்களால்
  எழுதக்கூடியவையாகத் தொடரும். `/api/settings`-ன் ஒவ்வொரு mutation-க்கும்
  (மற்றும் `/api/settings/require-login`-க்கும்) `admin` access-token scope
  தேவைப்படுகிறது (`src/server/authz/accessScopes.ts`-ல் உள்ள
  `ADMIN_MUTATION_EXACT_PATHS`, exact-path match); `GET` தொடர்ந்து `read` ஆகும்,
  மற்ற `/api/settings/*` துணை-route-கள் (proxies, combo defaults, model aliases,
  compression, purges…) method-inferred `write` scope-ஐத் தொடர்ந்து பயன்படுத்தும்.
- `POST /api/settings/import-json`, அந்த மறுஅங்கீகாரத்தைத் தவிர்த்து, எழுதுவதற்கு
  முன் `IMPORT_STRIPPED_SETTINGS_KEYS`-ல் (அதே file) உள்ள ஒவ்வொரு key-ஐயும்
  நீக்கிவிடும்: password மற்றும் `currentPassword`, ஒவ்வொரு
  `SECURITY_IMPACTING_SETTINGS_KEYS` entry, மேலும் dashboard session state
  (`sessionsValidAfter`, `revokedDashboardSessions`). பழைய backup-ஐ
  import செய்வதால், password மாற்றம் அல்லது sign-out ஏற்கனவே முடித்த session-ஐ
  மீண்டும் செயல்படுத்த முடியாது.

#### விருப்பமான TOTP இரு-காரணி உள்நுழைவு (#16619)

Settings → Security-ல் பதிவு செய்யப்படும்; operator அதை இயக்கும் வரை
முடக்கப்பட்டிருக்கும் (`src/server/auth/dashboardMfa.ts`).

- **இதில் உள்ளடங்குவது:** கடவுச்சொல் உள்நுழைவு (`POST /api/auth/login`, இதற்குப் பின்னர்
  `POST /api/auth/mfa/verify` தேவைப்படும்) மற்றும் `omniroute connect` (`POST /api/cli/connect`,
  இது கடவுச்சொல் மட்டுமே கொண்ட பரிமாற்றத்தை நிராகரித்து, குறியீட்டை `totp` ஆக ஏற்கும்).
- **இதில் உள்ளடங்காதது:** OIDC / SSO உள்நுழைவு (`/api/auth/oidc/callback`) OmniRoute TOTP-ஐ
  கேட்காது. இது அடையாள வழங்குநரின் சொந்த இரண்டாம் காரணி மீது சார்ந்துள்ளது; OIDC இயக்கப்பட்டிருந்தால்
  IdP-இல் MFA-ஐ கட்டாயப்படுத்தவும்.
- **மீட்டெடுப்பு** (சாதனம் தொலைந்துவிட்டால், மீட்புக் குறியீடுகள் எதுவும் மீதமில்லையெனில், அல்லது ஒரு காரணியை
  இனி சரிபார்க்க முடியாவிட்டால், உதாரணமாக `STORAGE_ENCRYPTION_KEY` மாறிய பிறகு):
  1. `OMNIROUTE_DISABLE_MFA=true` உடன் சேவையகத்தை மறுதொடக்கம் செய்யவும்.
  2. ஹோஸ்டிலேயே (லூப்பேக் peer மற்றும் லூப்பேக் `Host`, உதாரணமாக
     `http://localhost:20128`), கடவுச்சொல்லைப் பயன்படுத்தி உள்நுழையவும். அந்த origin-க்கு மட்டும்
     இரண்டாம் காரணி தவிர்க்கப்படும்; பிற ஒவ்வொரு origin-க்கும் குறியீடு இன்னும் தேவைப்படும்.
  3. Settings → Security → Disable என்பதற்குச் சென்று, கடவுச்சொல்லை உள்ளிட்டு, குறியீட்டுப் புலத்தை
     காலியாக விடவும். `POST /api/auth/mfa/disable` ஆனது, மாறி அமைக்கப்பட்டிருக்கும் போதும் கோரிக்கை
     ஹோஸ்டிலிருந்து வரும்போதும் மட்டுமே `code` இல்லாத body-ஐ ஏற்கும்; இருப்பினும் dashboard session
     மற்றும் தற்போதைய கடவுச்சொல் தேவைப்படும், மேலும் இது `auth.mfa.disabled` என
     `secondFactor: "recovery_switch"` உடன் தணிக்கையிடப்படும்.
  4. `OMNIROUTE_DISABLE_MFA`-ஐ unset செய்து, மறுதொடக்கம் செய்யவும்; தேவைப்பட்டால் மீண்டும் enrollment செய்யவும்.

## ரூட் வகைகள்

`src/server/authz/types.ts` மூன்று வகைகளை வரையறுக்கிறது; தீர்மானகரமாக வகைப்படுத்த முடியாத எந்த route-உம் `MANAGEMENT`-க்குத் திரும்பும்.

| Class        | Description                                                                                                                                             | Auth required                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | வெளிப்படையாகவே பாதுகாப்பான routes — login, logout, status, init, health, onboarding bootstrap.                                                          | எதுவும் தேவையில்லை                                              |
| `CLIENT_API` | Model-serving endpoints — `/api/v1/*`, `/api/v1beta/*`, மற்றும் aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | `REQUIRE_API_KEY` feature flag செயலில் இருக்கும்போது Bearer key |
| `MANAGEMENT` | Dashboard பக்கங்கள், settings, providers, keys, admin மற்றும் diagnostics endpoints.                                                                    | Dashboard session அல்லது `manage` scope உடைய Bearer             |

சில `MANAGEMENT` செயல்கள் **operator-only** ஆகும்: `manage` key மட்டும் போதாது. சேமிக்கப்பட்ட credentials-ஐ ஏற்றுமதி செய்தல் (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), live data-வின் மேல் backup-ஐ மீட்டமைத்தல் (`dryRun=true` உட்பட `POST /api/db-backups/import`, id மூலம் `POST /api/db-backups` restore, `POST /api/settings/import-json`), restore points-ஐ அழித்தல் (`DELETE /api/db-backups` cleanup, மற்றும் `PATCH /api/db-backups` ஏனெனில் அது சேமிக்கும் retention ஒவ்வொரு backup-க்குப் பின்னும் தானியங்கு நீக்கத்தை இயக்குகிறது) ஆகியவற்றுக்கு dashboard session, உள்ளூர் CLI subject, அல்லது login முடக்கப்பட்டிருப்பது தேவை. Sync token-ஐ வழங்குதல் (`POST /api/sync/tokens`) மற்றும் `admin` CLI access token-ஐ உருவாக்குதல் (`POST /api/cli/tokens`) ஒவ்வொரு login mode-இலும் dashboard session அல்லது உள்ளூர் CLI subject தேவை. எந்த scope-இன் API keys-உம், `oma_` access tokens-உம் operator credentials அல்ல: தேவைப்படும்போதெல்லாம் அவை `403` பெறும். இச்சரிபார்ப்பு `src/lib/api/operatorCredential.ts`-இல் உள்ளது (`resolveOperatorCredential()` / `requireOperatorCredential()`). Login settings-ஐ மாற்றுவதும் operator-only: ஒரு கடவுச்சொல் ஏற்கனவே இருந்தால் `POST /api/settings/require-login` (நிர்வாகக் கடவுச்சொல்லை அமைத்தல் / `requireLogin`-ஐ மாற்றுதல்) அந்த credentials-ஐ மட்டுமே ஏற்கும் — கடவுச்சொல் இல்லாத முதல்-முறை bootstrap சாளரம் மாறாது — மேலும் கடவுச்சொல்லை மாற்ற dashboard session `currentPassword` அனுப்ப வேண்டும் (அது இல்லாவிட்டால் அல்லது தவறாக இருந்தால் `403`, `settings.update_failed` என தணிக்கை செய்யப்படும்). உள்ளூர் CLI-உம், login முடக்கப்பட்ட instance-உம் மீட்புப் பாதையைத் தக்கவைக்கின்றன; அவை data directory-ஐ வைத்திருக்கும் host-உடன் பிணைக்கப்பட்டிருப்பதால், அது இல்லாமலேயே கடவுச்சொல்லை அமைக்கலாம்.

## குழாய்

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

நம்பகமான உள் தலைப்புகள் ( `src/server/authz/headers.ts` இல் வரையறுக்கப்பட்டுள்ளன)** உள்வரும் கோரிக்கைகளிலிருந்து அகற்றப்பட்டது** — வகைப்பாட்டிற்கு முன் கிளையண்டுகள் ஒரு விஷயத்தைப் போல ஆள்மாறாட்டம் செய்ய `x-omniroute-auth-*` முன் நிரப்ப முடியாது.

### கொள்கை ஒப்பந்தங்கள்

ஒவ்வொரு வழி வகுப்பிற்கும் `src/server/authz/policies/` இல் கொள்கை உள்ளது:

- **`publicPolicy`** (`policies/public.ts`) — எப்போதும் `allow({ kind: "anonymous", id: "anonymous" })` வழங்கும்.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — பிரித்தெடுத்தல் தாங்கி, `validateApiKey()` வழியாக சரிபார்க்கிறது. பயனுள்ள `REQUIRE_API_KEY` அம்சக் கொடி முடக்கப்பட்டிருக்கும் போது மட்டுமே அநாமதேயமாக மாறும். பயனுள்ள கொடியானது `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) மூலம் தீர்க்கப்படுகிறது, எனவே டாஷ்போர்டு அம்சம் கொடிகள் மற்றும் சூழல் மாறிகள் `/api/v1/*`, `/api/v1beta/*` மற்றும் மாற்றுப்பெயர்களை தொடர்ந்து நிர்வகிக்கின்றன; தீர்க்கும் தோல்விகள் தோல்வி அடைகின்றன. கிளையன்ட் API வழிகளில் டேஷ்போர்டு-அமர்வு கோரிக்கைகளை அனுமதிக்கிறது ( `/api/v1/models`, டாஷ்போர்டு மாதிரி அட்டவணையால் பயன்படுத்தப்படுகிறது). Entra ID SSO இயக்கப்பட்டால், கட்டமைப்பு ரீதியாக என்ட்ரா டோக்கனாக இருக்கும் ஒரு தாங்கி (மூன்று base64url பிரிவுகள், `RS*` alg, `kid`) SSO கிளையால் கையாளப்படுகிறது.** முன்** `validateApiKey()` மற்றும் அதன் தீர்ப்பு இறுதி — ஆகும், இது ஒருபோதும் API-கீ பாதை அல்லது சிதைவிலிருந்து அநாமதேய கிளைக்கு வராது, எனவே அடையாள-வழங்குபவர் செயலிழப்பு திறந்த அணுகலாக மாற முடியாது. நிலையான API விசைகள் பாதிக்கப்படாது. [Entra ID SSO](../security/ENTRA_SSO.md) ஐப் பார்க்கவும்.
- **`managementPolicy`** (`policies/management.ts`) — டாஷ்போர்டு அமர்வு, உள் மாதிரி-ஒத்திசைவு கோரிக்கைகளை ( `/api/providers/[name]/(sync-models|models)` க்கு எதிராகப் பொருந்துகிறது) ஏற்றுக்கொள்கிறது அல்லது `isAuthRequired()` தவறு எனத் திரும்பினால் முழுவதுமாகத் தவிர்க்கிறது. ஒரு தாங்கி டோக்கன் இருக்கும் போது 403 (`AUTH_001`) ஐ வழங்குகிறது ஆனால் செல்லாது, இல்லையெனில் 401. மேலும் வழி — காவலர் [அடுக்குகளை](../security/ROUTE_GUARD_TIERS.md) (LOCAL_ONLY / ALWAYS_PROTECTED) செயல்படுத்துகிறது. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` இல் உள்ள LOCAL_ONLY பாதைகள் (இன்று: `/api/mcp/`) பியரர் விசை `manage` ஸ்கோப்பைக் கொண்டிருக்கும் போது லூப்பேக் அல்லாதவற்றிலிருந்து அணுகலாம்; மற்ற அனைத்து LOCAL_ONLY பாதைகளும் ஸ்கோப்பைப் பொருட்படுத்தாமல் கண்டிப்பான-லூப்பேக்காக இருக்கும்.

வெற்றிகரமான கொள்கையானது `AuthSubject` `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` உடன் வழங்கும். கீழ்நிலை கையாளுபவர்கள் அங்கீகார தர்க்கத்தை மீண்டும் இயக்குவதற்குப் பதிலாக `src/server/authz/assertAuth.ts` இல் `assertAuth(request, "CLIENT_API")` வழியாகப் படிக்கலாம்.

## பொது வழித்தடங்களின் பட்டியல்

`src/shared/constants/publicApiRoutes.ts` என்பது வெளிப்படையான அனுமதிப்பட்டியல் ஆகும்:

இந்தப் பட்டியல் **வடிவமைப்பின்** அடிப்படையில் பிரிக்கப்பட்டுள்ளது; இந்தப் பிரிப்பு முக்கியமானது (GHSA-74g9-q8f6-793h): ஒரு முன்னொட்டு
`startsWith()` மூலம் பொருத்தப்படுகிறது, ஆகவே அதே தொடக்க எழுத்துகளைப் பகிரும் ஒவ்வொரு அருகிலுள்ள பாதையுடனும் அது பொருந்தும்.
`/api/usage/om-usage` என்ற முன்னொட்டு `/api/usage/om-usage<anything>` ஐ PUBLIC எனக் குறிக்கிறது, மேலும் Next அதை
`/api/usage/[connectionId]` எனத் தீர்மானிக்கிறது — தனிப்பட்ட auth இல்லாத handler.

```ts
// உண்மையான துணைமரங்கள். ஒவ்வொரு பதிவும் "/"-இல் முடிவடைய வேண்டும் (unit test மூலம் சரிபார்க்கப்படுகிறது).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-ல் CLIENT_API ஆகக் கருதப்படுகிறது, "no-auth public" ஆக அல்ல
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// EXACT ஆகப் பொருத்தப்படும் ஒற்றைப் பாதைகள் (முடிவில் trailing slash இருந்தாலும் இல்லாவிட்டாலும்).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP-க்கான login படி 2; MFA-pending cookie தேவை
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS origin தளர்வையும் பெறும், வாசிக்க-மட்டுமான ஒற்றைப் பாதைகள்.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS தளர்வு இல்லாத, வாசிக்க-மட்டுமான ஒற்றைப் பாதை.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

வாசிக்க-மட்டுமான பாதைகள் பாதுகாப்பான methods-க்கு மட்டும் பொதுவாகக் கிடைக்கும். குறிப்பு: `classifyRoute()` ஆனது PUBLIC fall-through-இலிருந்து `/api/v1/*` மற்றும் `/api/v1beta/*` ஆகியவற்றை விலக்குகிறது — அவை எப்போதும் `CLIENT_API` ஆக இருப்பதால் Bearer-key policy தொடர்ந்து பொருந்தும்.

## புதிய Route ஒன்றைச் சேர்த்தல்

### முறை 1 — பொது client API endpoint (Bearer-auth)

`/api/v1/` மற்றும் `/api/v1beta/`-இன் கீழுள்ள routes தானாகவே `CLIENT_API` என வகைப்படுத்தப்படுகின்றன. Middleware, Bearer சரிபார்ப்பை அமல்படுத்துகிறது; route handlers அதை மீண்டும் செய்ய வேண்டியதில்லை, ஆனால் பயனுள்ளதாக இருந்தால் subject-ஐப் படிக்கலாம்.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler தர்க்கம்
}
```

### முறை 2 — Management endpoint (session அல்லது Bearer + manage)

`src/lib/api/requireManagementAuth.ts`-இலிருந்து `requireManagementAuth()`-ஐப் பயன்படுத்தவும்:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler தர்க்கம்
}
```

வெற்றியின்போது `requireManagementAuth()` ஆனது `null`-ஐ வழங்கும்; இல்லையெனில் JSON error `Response`-ஐ வழங்கும்:

- 401 `AUTH_001` "அங்கீகாரம் தேவை" — எந்த credentials-உம் இல்லை
- 403 — தவறான Bearer **அல்லது** Bearer இருந்தும் key-இல் `manage` / `admin` scope இல்லை

`hasManageScope(scopes)` ஆனது `"manage"` அல்லது `"admin"`-க்கு true-ஐ வழங்கும்.

### முறை 3 — பொது allowlist-இல் சேர்த்தல்

வசதியின் அடிப்படையில் அல்லாமல், வடிவத்தின் அடிப்படையில் set-ஐத் தேர்ந்தெடுக்கவும். ஒரு route, `PUBLIC_API_ROUTES_EXACT`-இல் (அல்லது GET-only எனில் `PUBLIC_READONLY_CORS_API_ROUTES`-இல்) சேர்க்கப்பட வேண்டும்; உண்மையான subtree மட்டுமே `PUBLIC_API_ROUTE_PREFIXES`-இல் சேர்க்கப்பட வேண்டும், மேலும் அது **`/`-இல் முடிய வேண்டும்**. ஒரு தனிப்பட்ட route-ஐ prefix பட்டியலில் சேர்ப்பது, அதன் தொடக்க எழுத்துகளைப் பகிரும் அருகிலுள்ள ஒவ்வொரு path-ஐயும் பொது அணுகலுக்கு வெளியிடும் — பின்னர் சேர்க்கப்படும் dynamic-segment sibling routes உட்பட (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` மற்றும் `tests/unit/authz/classify.test.ts` ஆகியவற்றிலுள்ள unit tests-ஐப் புதுப்பிக்கவும்.

## ஸ்கோப்கள்

மூன்று நேம்ஸ்பேஸ்கள். ஒவ்வொரு செக்கரும் அதன் சொந்த ஸ்ட்ரிங்குகளை மட்டுமே படிக்கிறது. `manage` ஏன் `read:compression` க்கான `scopeMatches` ஐத் தவறவிடுகிறது மற்றும் ஒரு `read` அணுகல் டோக்கன் ஏன் `PATCH /api/keys/{id}` ஐச் செய்ய முடியாது என்பது உட்பட, பக்கவாட்டு ஒப்பீடு [மூன்று ஸ்கோப் நேம்ஸ்பேஸ்கள்](../frameworks/MCP-SERVER.md#three-scope-namespaces) ஆகும்.

API கீகள் ஒரு `scopes` வரிசையைக் கொண்டுள்ளன (`api_keys.scopes` இல் JSON ஆக சேமிக்கப்படும், `src/lib/db/apiKeys.ts` ஐப் பார்க்கவும்).

### மேலாண்மை ஸ்கோப்

- `manage` / `admin` — `hasManageScope`. மேலாண்மை API ரூட்டுகளுக்கான பியரர் அணுகல்.
- `mcp:connect`, `self:usage`, `self:account-quota`, மற்றும் `policy:bypass-provider-quota` ஆகியவை சேர்க்கக்கூடிய துல்லியமான-பொருந்தும் ஸ்கோப்கள் ஆகும். அவை `MANAGEMENT_API_KEY_SCOPES` க்கு வெளியே உள்ளன. `mcp:connect` ஆனது `/api/mcp/` நான்-லூப் பேக் கார்வ்-அவுட்டை மட்டுமே திறக்கிறது.

### MCP கருவி ஸ்கோப்கள்

கேட்டலாக் மற்றும் பொருந்தும் விதிகள் (ஒரே மாதிரியான ஸ்ட்ரிங், அல்லது `*` இல் முடிவடையும் ஒரு வழங்கப்பட்ட ஸ்கோப்): [MCP கருவி ஸ்கோப்கள்](../frameworks/MCP-SERVER.md#mcp-tool-scopes). `src/shared/constants/mcpScopes.ts` இல் உள்ள `MCP_SCOPE_LIST` என்பது அசல் டைப் செய்யப்பட்ட துணைக்குழு ஆகும், முழு கேட்டலாக் அல்ல. MCP அங்கீகாரத் தகவல், கோரிக்கை மெட்டாடேட்டா அல்லது `OMNIROUTE_MCP_SCOPES` இலிருந்து ஸ்கோப்களை `resolveCallerScopeContext()` தீர்த்த பிறகு, `open-sse/mcp-server/scopeEnforcement.ts` இல் அமலாக்கம் செயல்படுகிறது. `OMNIROUTE_MCP_ENFORCE_SCOPES=true` ஆக இல்லாவிட்டால் அது அணைக்கப்படும்.

### அணுகல்-டோக்கன் ஸ்கோப்கள்

`oma_live_…` டோக்கன்களில் `read` / `write` / `admin`, `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) மூலம் தரவரிசைப்படுத்தப்பட்டுள்ளது. இந்த தரவரிசை அணுகல்-டோக்கன் நற்சான்றிதழுக்கு மட்டுமே பொருந்தும். [மேலாண்மை அங்கீகாரம்](../guides/MANAGEMENT-AUTH.md) ஐப் பார்க்கவும்.

## Auth Required மாற்று (toggle)

`src/shared/utils/apiAuth.ts`-இல் உள்ள `isAuthRequired()`, ஒரு request-க்கு **ஏதேனும்** auth கட்டாயமா என்பதை முடிவு செய்கிறது:

- `settings.requireLogin === false` → auth உலகளவில் முடக்கப்படும், ஆனால் எப்போதும்-பாதுகாக்கப்பட்ட அடுக்கு ([Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) தவிர, மற்றும் ஏற்கப்படும் credential-ஐ வழங்கும் calls தவிர — அவை login இயக்கத்தில் இருக்கும்போது தேவைப்படும் அதே credential-ஐக் கோரும்: sync tokens வழங்குதல், எந்த scope-இலும் CLI access tokens உருவாக்குதல், மற்றும் `manage`/`admin` scope கொண்ட API key-ஐ உருவாக்குதல், ஒரு key-க்கு அந்த scope-ஐ வழங்குதல், அல்லது அத்தகைய key-ஐ மீண்டும் உருவாக்குதல் அல்லது வெளிப்படுத்துதல் (`src/lib/api/requireManagementAuth.ts`-இல் `requireCredentialForManagementScopedKey()`). Inference-only keys திறந்தே இருக்கும்.
- கடவுச்சொல் அமைக்கப்படவில்லை **மற்றும்** `INITIAL_PASSWORD` env var இல்லை → bootstrap mode onboarding wizard-ஐயும் loopback requests-ஐயும் அனுமதிக்கும், ஆனால் வெளிப்படும் network requests-க்கு இன்னும் credentials தேவை.
- ஏதேனும் DB error → fail closed (secure-by-default).

Client API key enforcement, நேரடியாக `process.env.REQUIRE_API_KEY`-ஐப் படிப்பதற்குப் பதிலாக, `src/shared/utils/featureFlags.ts`-இல் உள்ள `isRequireApiKeyEnabled()`-ஐப் பயன்படுத்துகிறது. இது deployed instances-க்கு முக்கியம்: Dashboard → Feature Flags-இல் `REQUIRE_API_KEY`-ஐ மாற்றினால் DB override சேமிக்கப்பட்டு, `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, மேலும் இந்த helper-ஐப் பகிரும் பிற client-API auth சோதனைகள் உடனடியாகப் பாதிக்கப்படும். Feature flag store படிக்க முடியாவிட்டால், client API auth fail closed ஆகி key-ஐக் கோரும்.

## இணக்கமுறிவு மாற்றம் — v3.8.0

`/api/v1/agents/tasks/*` மற்றும் `/api/resilience/model-cooldowns` எண்ட்பாயிண்டுகளுக்கு **இப்போது மேலாண்மை அங்கீகாரம் தேவை** (`588a0333` commit). முன்பு `manage` ஸ்கோப் இல்லாத சாதாரண API விசையை அனுப்பிய கிளையன்ட்கள் `403` பதிலைப் பெறுகின்றனர். இடம்பெயர்வு: API Keys டாஷ்போர்டில் அந்த விசைக்கு `manage` ஸ்கோப்பை வழங்கவும் அல்லது உள்நுழைந்த டாஷ்போர்டு அமர்வைப் பயன்படுத்தவும்.

## நடத்தையில் மாற்றம் — v3.8.2

`/api/mcp/*` (தொலைநிலை MCP சேவையகம்) இன்னும் முன்னிருப்பாக LOCAL_ONLY ஆக உள்ளது; ஆனால் இப்போது `Authorization: Bearer <api-key>` தலைப்பு `manage` ஸ்கோப்பைக் கொண்டிருக்கும்போது, லூப்பேக் அல்லாத கோரிக்கைகளை ஏற்கிறது. `src/server/authz/routeGuard.ts`-இல் உள்ள `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` வழியாக, இந்த விதிவிலக்கு ஒவ்வொரு பாதைக்கும் வெளிப்படையாகக் கட்டுப்படுத்தப்படுகிறது; தொடர்புடைய LOCAL_ONLY முன்னொட்டான `/api/cli-tools/runtime/*`, எந்தவொரு துணைச் செயல்முறையையும் தொடங்கக்கூடும் என்பதால், திட்டமிட்டே புறக்கணிக்க முடியாததாக உள்ளது. லூப்பேக் அல்லாத இடங்களிலிருந்து `/api/mcp/*`-க்கு வரும் அநாமதேயக் கோரிக்கைகள் தொடர்ந்து `403 LOCAL_ONLY` பதிலைப் பெறும் — எந்தவொரு புதிய LOCAL_ONLY பாதைக்கும் முன்னிருப்பு, லூப்பேக்கை மட்டுமே கண்டிப்பாக அனுமதிப்பதாகவே இருக்கும். [பாதைக் காவலர் அடுக்குகள்](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)-ஐப் பார்க்கவும்.

## சோதனை

- அலகுச் சோதனைகள்: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- பொது அனுமதிப்பட்டியல்: `tests/unit/public-api-routes.test.ts`.
- குறிப்பிட்ட சோதனையை இயக்க: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## பிழைத்திருத்தம்

பைப்லைன் எப்போதும் பதில்களை முத்திரையிடுகிறது:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

அங்கீகரிக்கப்பட்ட கோரிக்கைகளுக்கு அப்ஸ்ட்ரீம் (ஹேண்ட்லர்-பக்கம்) கோரிக்கை தலைப்புகளும் அடங்கும்:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

— ஹேண்ட்லர்களுக்குள் `assertAuth(req, expectedClass)` பயன்படுத்தவும், மிடில்வேர் புறக்கணிக்கப்பட்டிருந்தால், `AUTHZ_NOT_INITIALIZED` குறியீட்டுடன் `AuthzAssertionError` வீசுகிறது (சோதனைகளில் உள்ளமைவு பின்னடைவுகளைப் பிடிக்க உதவுகிறது).

## மேலும் காண்க

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ஒவ்வொரு இறுதிப்புள்ளிக்கும் அங்கீகார குறிப்பான்
- [COMPLIANCE.md](../security/COMPLIANCE.md) — அங்கீகார நிகழ்வுகளுக்கான தணிக்கை பதிவு
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — மூன்று ஸ்கோப் நேம்ஸ்பேஸ்கள் மற்றும் MCP கருவி-ஸ்கோப் பட்டியல்
- ஆதாரம்: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
