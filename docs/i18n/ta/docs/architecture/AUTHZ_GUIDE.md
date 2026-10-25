# Authorization Guide (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **உண்மையின் ஆதாரம்:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-09-22 — ஸ்கோப் நேம்ஸ்பேஸ்கள் MCP-SERVER.md ஐக் குறிக்கின்றன

OmniRoute ஆனது ஒவ்வொரு API கோரிக்கையையும் கட்டுப்படுத்தும் ஒரு வழித்தட-அறிந்த அங்கீகாரப் பைப்லைனைக் கொண்டுள்ளது. வகைப்பாடு **நிர்ணயிக்கக்கூடியது** மற்றும் **தோல்வியுற்றால் மூடும்** — வகைப்படுத்த முடியாத எதுவும் `MANAGEMENT` ஆக முடிவடைகிறது மற்றும் ஒரு அமர்வு அல்லது மேலாண்மை-தர டோக்கனைக் கோருகிறது. இந்த பக்கம் வழித்தடங்களை பராமரிக்கும் அல்லது புதிய இறுதிப்புள்ளிகளை வடிவமைக்கும் பொறியாளர்களுக்கான மாதிரியை விளக்குகிறது.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ஆதாரம்: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## இரண்டு அங்கீகார முறைகள்

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-உடன் இணக்கமான client APIs-க்கும், key-இல் `manage` scope இருக்கும்போது சில management routes-க்கும் இது பயன்படுத்தப்படுகிறது.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`-இல் உள்ள `isValidApiKey()` / `extractApiKey()` மூலம் இது சரிபார்க்கப்பட்டு, `src/shared/utils/apiAuth.ts` வழியாக மீண்டும் export செய்யப்படுகிறது. `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` environment variables-ஐ நிலையான passthrough keys ஆகவும் validator ஏற்றுக்கொள்ளும் (issue #1350).

### 2. டாஷ்போர்டு அமர்வு (auth_token cookie)

Dashboard பக்கங்களுக்கும் நிர்வாகச் செயல்பாடுகளுக்கும்.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT சரிபார்க்கப்பட்டு **மற்றும்** `authenticated: true` கொண்டிருந்தால் மட்டுமே cookie ஒரு session ஆகும் (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Cookie-ஐப் பயன்படுத்தும் ஒவ்வொன்றும் (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live server, `/api/settings/require-login`, `/api/auth/status`) அந்த helper வழியாகவே செல்கிறது. `JWT_SECRET`-உடன் கையொப்பமிடப்பட்ட மற்ற JWT-களும் உள்ளன — Cursor CLI passthrough, key வைத்திருப்பவர்களுக்காக `iss "omniroute" / aud "cursor-cli"` tokens-ஐ உருவாக்குகிறது — அவை ஒருபோதும் sessions ஆவதில்லை (#13298).

`src/shared/utils/apiAuth.ts`-இல் உள்ள `isDashboardSessionAuthenticated()` மூலம் சரிபார்க்கப்படுகிறது. அதன் 30 நாள் ஆயுட்காலத்தில் 7 நாட்களுக்கும் குறைவாக மீதமிருக்கும்போது pipeline JWT-ஐத் தானாகப் புதுப்பிக்கும்.

30 நாட்கள் முடிவதற்கு முன்பே session முடிவடையலாம்: ஒவ்வொரு minter-உம் `mintDashboardSessionToken` வழியாகவே செல்கிறது (issue time `iat` மற்றும் id `jti` உடன்). Verifier இரண்டு settings-ஐச் சரிபார்க்கும்: `sessionsValidAfter` — கடவுச்சொல் மாற்றத்தால் அமைக்கப்படுகிறது, அதனால் அதற்கு முன் வழங்கப்பட்ட ஒவ்வொரு session-உம் சரிபார்க்கத் தவறும் (கடவுச்சொல்லை மாற்றிய browser-க்கு புதிய cookie கிடைக்கும்); மற்றும் `revokedDashboardSessions` — `POST /api/auth/logout` வெளியேறிய session-இன் `jti`-ஐ இதில் சேர்க்கும். பழைய release-ஆல் உருவாக்கப்பட்ட sessions-இல் இந்த இரண்டு claims-உம் இருக்காது; முதல் கடவுச்சொல் மாற்றம் வரை அவை செல்லுபடியாக இருக்கும். Settings-ஐப் படிக்க முடியாவிட்டால், session நம்பப்படாது.

சில management routes **ஏதேனும் ஒரு** முறையை ஏற்கும்: API key-க்கு `manage` (அல்லது `admin`) scope இருக்கும்போது cookie அல்லது `Bearer <key>`. v3.8-இல் சேர்க்கப்பட்ட "API calls மூலம் கட்டமைக்கக்கூடிய" பணிமுறையை இதுவே சாத்தியமாக்குகிறது.

#### விருப்பத்தேர்வு OIDC login gate (#6973)

Dashboard admin login, வழக்கமான கடவுச்சொல் login-உடன் சேர்ந்து **opt-in** OIDC (OpenID Connect) flow-வையும் ஆதரிக்கிறது — கடவுச்சொல் login ஒருபோதும் நீக்கப்படுவதில்லை, கூடுதலாக மட்டுமே சேர்க்கப்படுகிறது:

- `settings.oidcEnabled === true` **மற்றும்** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` ஆகிய அனைத்தும் கட்டமைக்கப்பட்டிருந்தால் மட்டுமே இது இயங்கும் (Settings → Auth). இல்லையெனில் `GET /api/auth/oidc/login` `400` ஐத் திருப்பித் தரும்.
- `GET /api/auth/oidc/login`, issuer-இன் `/.well-known/openid-configuration`-இலிருந்து `authorization_endpoint`-ஐக் கண்டறியும் (கண்டறிய முடியாவிட்டால் `<issuer>/authorize`-க்கு பின்வாங்கும்), உள்வரும் request-இலிருந்து redirect URI-ஐ உருவாக்கும் (`x-forwarded-proto`-ஐ மதிக்கும்), மேலும் `httpOnly` `oidc_state` cookie-இல் சேமிக்கப்படும் ஒரு சீரற்ற `state`-உடன் IdP-க்குத் திருப்பிவிடும்.
- `GET /api/auth/oidc/callback`, `state`-ஐச் சரிபார்த்து, authorization code-ஐ மாற்றிக்கொண்டு, `issuer`/`audience` சோதனைகளுடன் issuer-இன் JWKS வழியாக ID token-இன் கையொப்பத்தையும் சரிபார்க்கும் (`jose`-இன் `createRemoteJWKSet`; ஒவ்வொரு JWKS URI-க்கும் தனியாக cache செய்யப்படும்). `oidcAllowedSubjects` allowlist கட்டாயம்: அது token-இன் `sub` claim அல்லது `email` claim-உடன் பொருந்தும். `email` claim `email_verified === true` ஆக இருந்தால் மட்டுமே ஏற்கப்படும் — எனவே IdP-இல் சரிபார்க்கப்படாத email ஒருபோதும் gate-ஐக் கடக்க முடியாது. உள்ளீடுகள் எதுவும் இல்லையென்றால், callback ஒவ்வொரு login-ஐயும் மறுக்கும் (`not_configured`).
- வெற்றியடைந்தால், password login வழங்கும் **அதே** 30 நாள் `auth_token` JWT-ஐயே இது உருவாக்கும் (`src/app/api/auth/login/route.ts`). எனவே dashboard session pipeline-இன் மற்ற பகுதிகள் (தானியங்கு புதுப்பிப்பு, cookie flags) மாறாது — OIDC மாற்றுவது cookie எப்படி உருவாகிறது என்பதை மட்டுமே; அது வழங்கும் அதிகாரத்தை அல்ல.
- `oidc*` settings அனைத்தும் (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`-இல் (`src/shared/constants/securityImpactingSettings.ts`) உள்ளன: `currentPassword`-ஆக நிர்வாகக் கடவுச்சொல்லை body கொண்டு செல்லாவிட்டால் `PATCH /api/settings` `400 PASSWORD_REQUIRED` ஐத் தரும் (அது தவறாக இருந்தால் `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` password _login_-ஐ (`POST /api/auth/login`) மறுக்கும், ஆனால் சேமிக்கப்பட்ட password hash-ஐ வைத்திருக்கும்; மீள்-அங்கீகாரம் இன்னும் அதற்கு எதிராக `currentPassword`-ஐச் சரிபார்க்கும்.
- `corsOrigins` மற்றும் `bruteForceProtection` ஆகியவையும் `SECURITY_IMPACTING_SETTINGS_KEYS`-இல் உள்ளன: இவற்றைத் தளர்த்தினால் login பாதுகாப்புகள் பலவீனமடையும், எனவே இவற்றுக்கும் அதே `currentPassword` மீள்-அங்கீகாரம் தேவை (Security tab அதைக் கேட்கும்), மேலும் JSON import இவற்றை நீக்கிவிடும்.
- ஒவ்வொரு security-policy key-உம் — `SECURITY_IMPACTING_SETTINGS_KEYS` உள்ளீடுகள், ஒவ்வொரு `oidc*` key-உம், dashboard session நிலையும் — `PATCH /api/settings`-இல் **operator-only** ஆகும்: manage-scoped API key அல்லது `oma_` access token சரியான `currentPassword`-ஐ அனுப்பினாலும் `403` உடன் மறுக்கப்படும், மேலும் அந்த மறுப்பு `settings.update_failed` with `reason: OPERATOR_REQUIRED` என தணிக்கை செய்யப்படும் (`src/lib/api/operatorCredential.ts`-இல் `requireOperatorCredential()`). சாதாரண settings (theme, display preferences) `manage` key-க்கோ `admin` access token-க்கோ எழுதக்கூடியதாகவே இருக்கும். `/api/settings` தானே ஒவ்வொரு மாற்றத்துக்கும் (மற்றும் `/api/settings/require-login`-க்கும்) `admin` access-token scope தேவை (`src/server/authz/accessScopes.ts`-இல் `ADMIN_MUTATION_EXACT_PATHS`, exact-path match); `GET` `read`-ஆகவே இருக்கும், மற்ற `/api/settings/*` sub-routes (proxies, combo defaults, model aliases, compression, purges…) method-இலிருந்து ஊகிக்கப்பட்ட `write` scope-ஐத் தொடர்ந்து வைத்திருக்கும்.
- `POST /api/settings/import-json` அந்த மீள்-அங்கீகாரத்தைத் தவிர்க்கிறது, எனவே எழுதுவதற்கு முன் அதே file-இல் உள்ள `IMPORT_STRIPPED_SETTINGS_KEYS`-இன் ஒவ்வொரு key-ஐயும் நீக்குகிறது: password மற்றும் `currentPassword`, ஒவ்வொரு `SECURITY_IMPACTING_SETTINGS_KEYS` உள்ளீடு, மற்றும் dashboard session நிலை (`sessionsValidAfter`, `revokedDashboardSessions`). எனவே பழைய backup-ஐ import செய்வதால், கடவுச்சொல் மாற்றமோ sign-out-ஓ ஏற்கனவே முடித்து வைத்த session-ஐ மீண்டும் உயிர்ப்பிக்க முடியாது.

## ரூட் வகைகள்

`src/server/authz/types.ts` மூன்று வகைகளை வரையறுக்கிறது; தீர்மானகரமாக வகைப்படுத்த முடியாத எந்த route-உம் `MANAGEMENT`-க்குத் திரும்பும்.

| Class        | Description                                                                                                                                             | Auth required                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `PUBLIC`     | வெளிப்படையாகவே பாதுகாப்பான routes — login, logout, status, init, health, onboarding bootstrap.                                                          | எதுவும் தேவையில்லை                                              |
| `CLIENT_API` | Model-serving endpoints — `/api/v1/*`, `/api/v1beta/*`, மற்றும் aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | `REQUIRE_API_KEY` feature flag செயலில் இருக்கும்போது Bearer key |
| `MANAGEMENT` | Dashboard பக்கங்கள், settings, providers, keys, admin மற்றும் diagnostics endpoints.                                                                    | Dashboard session அல்லது `manage` scope உடைய Bearer             |

சில `MANAGEMENT` செயல்கள் **operator-only** ஆகும்: `manage` key மட்டும் போதாது. சேமிக்கப்பட்ட credentials-ஐ ஏற்றுமதி செய்தல் (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), live data-வின் மேல் backup-ஐ மீட்டமைத்தல் (`dryRun=true` உட்பட `POST /api/db-backups/import`, id மூலம் `POST /api/db-backups` restore, `POST /api/settings/import-json`), restore points-ஐ அழித்தல் (`DELETE /api/db-backups` cleanup, மற்றும் `PATCH /api/db-backups` ஏனெனில் அது சேமிக்கும் retention ஒவ்வொரு backup-க்குப் பின்னும் தானியங்கு நீக்கத்தை இயக்குகிறது) ஆகியவற்றுக்கு dashboard session, உள்ளூர் CLI subject, அல்லது login முடக்கப்பட்டிருப்பது தேவை. Sync token-ஐ வழங்குதல் (`POST /api/sync/tokens`) மற்றும் `admin` CLI access token-ஐ உருவாக்குதல் (`POST /api/cli/tokens`) ஒவ்வொரு login mode-இலும் dashboard session அல்லது உள்ளூர் CLI subject தேவை. எந்த scope-இன் API keys-உம், `oma_` access tokens-உம் operator credentials அல்ல: தேவைப்படும்போதெல்லாம் அவை `403` பெறும். இச்சரிபார்ப்பு `src/lib/api/operatorCredential.ts`-இல் உள்ளது (`resolveOperatorCredential()` / `requireOperatorCredential()`). Login settings-ஐ மாற்றுவதும் operator-only: ஒரு கடவுச்சொல் ஏற்கனவே இருந்தால் `POST /api/settings/require-login` (நிர்வாகக் கடவுச்சொல்லை அமைத்தல் / `requireLogin`-ஐ மாற்றுதல்) அந்த credentials-ஐ மட்டுமே ஏற்கும் — கடவுச்சொல் இல்லாத முதல்-முறை bootstrap சாளரம் மாறாது — மேலும் கடவுச்சொல்லை மாற்ற dashboard session `currentPassword` அனுப்ப வேண்டும் (அது இல்லாவிட்டால் அல்லது தவறாக இருந்தால் `403`, `settings.update_failed` என தணிக்கை செய்யப்படும்). உள்ளூர் CLI-உம், login முடக்கப்பட்ட instance-உம் மீட்புப் பாதையைத் தக்கவைக்கின்றன; அவை data directory-ஐ வைத்திருக்கும் host-உடன் பிணைக்கப்பட்டிருப்பதால், அது இல்லாமலேயே கடவுச்சொல்லை அமைக்கலாம்.

## செயலாக்கத் தொடர்

```
உள்வரும் கோரிக்கை → src/proxy.ts
  → src/server/authz/pipeline.ts-இல் உள்ள runAuthzPipeline()
    1. நம்பகமான உள் தலைப்புகளை அகற்று (x-omniroute-auth-*, x-omniroute-route-class)
    2. கோரிக்கை ID-ஐ உருவாக்கி, classifyRoute() வழியாக வழித்தடத்தை வகைப்படுத்து
    3. pathname == "/" எனில் → /dashboard-க்குத் திருப்பிவிடு
    4. வடிகட்டிச் செயல்நிறுத்தம் (முறையான பணிநிறுத்தம்) நடைபெற்று, /api/* எனில் → 503
    5. GET அல்லாத /api/* எனில் → checkBodySize() பாதுகாப்பைச் சரிபார்
    6. OPTIONS எனில் → CORS முன்சோதனை 204
    7. options.enforce == false எனில் → route-class தலைப்புகளுடன் அப்படியே அனுப்பு
    8. இல்லையெனில்: POLICIES[routeClass].evaluate(ctx)
       - அனுமதி → x-omniroute-auth-{kind,id,label,scopes}-ஐப் பதித்து → NextResponse.next()
       - நிராகரிப்பு → correlation_id உடன் JSON பிழை (கட்டுப்பாட்டுப் பலகைப் பக்கங்கள் → 302 /login)
```

நம்பகமான உள் தலைப்புகள் (`src/server/authz/headers.ts`-இல் வரையறுக்கப்பட்டவை) வகைப்படுத்தலுக்கு முன் **உள்வரும் கோரிக்கைகளிலிருந்து அகற்றப்படுகின்றன** — ஒரு பொருளைப் போல ஆள்மாறாட்டம் செய்ய வாடிக்கையாளர்கள் `x-omniroute-auth-*` தலைப்புகளை முன்கூட்டியே நிரப்ப முடியாது.

### கொள்கை ஒப்பந்தங்கள்

ஒவ்வொரு வழித்தட வகுப்புக்கும் `src/server/authz/policies/`-இல் ஒரு கொள்கை உள்ளது:

- **`publicPolicy`** (`policies/public.ts`) — எப்போதும் `allow({ kind: "anonymous", id: "anonymous" })` என்பதைத் திருப்பித் தரும்.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer-ஐப் பிரித்தெடுத்து, `validateApiKey()` வழியாகச் சரிபார்க்கிறது. நடைமுறையிலுள்ள `REQUIRE_API_KEY` அம்சக் கொடி முடக்கப்பட்டிருக்கும்போது மட்டுமே பெயரிலாப் பயன்பாட்டிற்கு வழிவிடுகிறது. நடைமுறையிலுள்ள கொடி `isRequireApiKeyEnabled()` (`DB அம்சக் கொடி மேலெழுதல் > process.env.REQUIRE_API_KEY > இயல்புநிலை`) வழியாகத் தீர்மானிக்கப்படுவதால், கட்டுப்பாட்டுப் பலகையின் அம்சக் கொடிகளும் சூழல் மாறிகளும் `/api/v1/*`, `/api/v1beta/*` மற்றும் மாற்றுப் பெயர்களை ஒரே மாதிரியாகக் கட்டுப்படுத்துகின்றன; தீர்மானிப்பான் தோல்விகள் அணுகலை மறுக்கும். கிளையன்ட் API வழித்தடங்களில் கட்டுப்பாட்டுப் பலகை அமர்வுக் கோரிக்கைகளை அனுமதிக்கிறது (கட்டுப்பாட்டுப் பலகையின் மாதிரிப் பட்டியல் பயன்படுத்தும் `/api/v1/models` உட்பட).
- **`managementPolicy`** (`policies/management.ts`) — கட்டுப்பாட்டுப் பலகை அமர்வு, உள் மாதிரி-ஒத்திசைவுக் கோரிக்கைகள் (`/api/providers/[name]/(sync-models|models)` உடன் பொருத்தப்படுபவை) ஆகியவற்றை ஏற்கிறது அல்லது `isAuthRequired()` false என்பதைத் திருப்பினால் முழுமையாகத் தவிர்க்கிறது. Bearer டோக்கன் இருந்தும் செல்லுபடியாகாதபோது 403 (`AUTH_001`) என்பதையும், இல்லையெனில் 401 என்பதையும் திருப்பித் தருகிறது. எந்த அங்கீகாரக் கிளைக்கும் முன்பாக வழித்தடப் பாதுகாப்பு அடுக்குகளையும் (LOCAL_ONLY / ALWAYS_PROTECTED) செயல்படுத்துகிறது — [வழித்தடப் பாதுகாப்பு அடுக்குகள்](../security/ROUTE_GUARD_TIERS.md) என்பதைப் பார்க்கவும். `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`-இல் உள்ள LOCAL_ONLY பாதைகளை (தற்போது: `/api/mcp/`) Bearer விசை `manage` வரம்பைக் கொண்டிருக்கும்போது loopback அல்லாத இடங்களிலிருந்து அணுகலாம்; மற்ற அனைத்து LOCAL_ONLY பாதைகளும் வரம்பைப் பொருட்படுத்தாமல் கண்டிப்பாக loopback-க்கு மட்டுமே கட்டுப்படுத்தப்பட்டிருக்கும்.

வெற்றிகரமான கொள்கை `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` கொண்ட `AuthSubject`-ஐத் திருப்பித் தருகிறது. கீழ்நிலை கையாளிகள் அங்கீகாரத் தர்க்கத்தை மீண்டும் இயக்குவதற்குப் பதிலாக, `src/server/authz/assertAuth.ts`-இல் உள்ள `assertAuth(request, "CLIENT_API")` வழியாக அதைப் படிக்கலாம்.

## பொது Routes பட்டியல்

`src/shared/constants/publicApiRoutes.ts` என்பது வெளிப்படையான அனுமதிப்பட்டியல்:

இந்தப் பட்டியல் **வடிவத்தின்** அடிப்படையில் பிரிக்கப்பட்டுள்ளது; மேலும் இந்தப் பிரிப்பு முக்கியமானது (GHSA-74g9-q8f6-793h): ஒரு prefix,
`startsWith()` மூலம் பொருத்தப்படுவதால், அதன் தொடக்க எழுத்துகளைப் பகிரும் அருகிலுள்ள ஒவ்வொரு path-உடனும் அது பொருந்தும்.
`/api/usage/om-usage`-ஐ prefix ஆகக் கொண்டது, `/api/usage/om-usage<anything>`-ஐ PUBLIC எனக் குறித்தது; மேலும் Next அதை
`/api/usage/[connectionId]` எனத் தீர்மானிக்கிறது — அதற்கென தனியாக auth இல்லாத ஒரு handler.

```ts
// உண்மையான subtrees. ஒவ்வொரு entry-யும் "/"-இல் முடிய வேண்டும் (unit test மூலம் உறுதிப்படுத்தப்படுகிறது).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify-இல் CLIENT_API ஆகக் கருதப்படுகிறது; "no-auth public" ஆக அல்ல
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// தனிப்பட்ட routes, துல்லியமாகப் பொருத்தப்படுகின்றன (இறுதியில் slash இருந்தாலும் இல்லாவிட்டாலும்).
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

// CORS origin தளர்வையும் பெறும் read-only தனிப்பட்ட routes.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS தளர்வு இல்லாத read-only தனிப்பட்ட route.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

பாதுகாப்பான methods-க்கு **மட்டுமே** read-only routes பொது அணுகலுக்குரியவை. குறிப்பு: `classifyRoute()`, PUBLIC fall-through-இலிருந்து `/api/v1/*` மற்றும் `/api/v1beta/*` ஆகியவற்றை விலக்குகிறது — Bearer-key கொள்கை தொடர்ந்து பொருந்துவதற்காக அவை எப்போதும் `CLIENT_API` ஆகவே இருக்கும்.

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

பைப்லைன் எப்போதும் பதில்களில் பின்வருவனவற்றைப் பதிக்கிறது:

```
x-request-id:               <தொடர்பு ஐடி, பிழை உள்ளடக்கங்களிலும் பிரதிபலிக்கப்படும்>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

அங்கீகரிக்கப்பட்ட கோரிக்கைகளுக்கு, அப்ஸ்ட்ரீம் (ஹேண்ட்லர்-பக்க) கோரிக்கை தலைப்புகளில் பின்வருவனவும் அடங்கும்:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<கடைசி-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (விருப்பத்தேர்வு)
x-omniroute-auth-scopes:    காற்புள்ளியால் பிரிக்கப்பட்ட பட்டியல்
```

ஹேண்ட்லர்களுக்குள் `assertAuth(req, expectedClass)`-ஐப் பயன்படுத்தவும் — மிடில்வேர் தவிர்க்கப்பட்டிருந்தால், இது `AUTHZ_NOT_INITIALIZED` குறியீட்டுடன் `AuthzAssertionError`-ஐ எறியும் (சோதனைகளில் உள்ளமைவு பின்னடைவுகளைக் கண்டறிய உதவும்).

## மேலும் காண்க

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ஒவ்வொரு இறுதிப்புள்ளிக்கும் அங்கீகார குறிப்பான்
- [COMPLIANCE.md](../security/COMPLIANCE.md) — அங்கீகார நிகழ்வுகளுக்கான தணிக்கை பதிவு
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — மூன்று ஸ்கோப் நேம்ஸ்பேஸ்கள் மற்றும் MCP கருவி-ஸ்கோப் பட்டியல்
- ஆதாரம்: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
