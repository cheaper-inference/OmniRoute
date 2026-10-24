# Authorization Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **నిజానికి మూలం:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **చివరిగా నవీకరించబడింది:** 2026-09-22 — స్కోప్ నేమ్స్పేస్లు MCP-SERVER.mdని సూచిస్తాయి

OmniRoute ప్రతి API అభ్యర్థనను నియంత్రించే రూట్-అవేర్ ఆథరైజేషన్ పైప్లైన్ను కలిగి ఉంది. వర్గీకరణ **నిర్ణయాత్మకమైనది** మరియు **ఫెయిల్-క్లోజ్డ్** — వర్గీకరించబడని ఏదైనా `MANAGEMENT`గా ముగుస్తుంది మరియు సెషన్ లేదా మేనేజ్మెంట్-గ్రేడ్ టోకెన్ను డిమాండ్ చేస్తుంది. ఈ పేజీ రూట్లను నిర్వహించే లేదా కొత్త ఎండ్పాయింట్లను రూపొందించే ఇంజనీర్ల కోసం మోడల్ను వివరిస్తుంది.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> మూలం: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## రెండు ప్రమాణీకరణ మోడ్‌లు

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-కు అనుకూలమైన క్లయింట్ APIల కోసం, అలాగే కీకు `manage` scope ఉన్నప్పుడు కొన్ని మేనేజ్‌మెంట్ routes కోసం ఇది ఉపయోగించబడుతుంది.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`లోని `isValidApiKey()` / `extractApiKey()` ద్వారా ధృవీకరించబడుతుంది, మరియు `src/shared/utils/apiAuth.ts` ద్వారా మళ్లీ export చేయబడుతుంది. `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` environment variablesను కూడా validator శాశ్వత passthrough keysగా అంగీకరిస్తుంది (issue #1350).

### 2. డ్యాష్‌బోర్డ్ సెషన్ (auth_token cookie)

డ్యాష్‌బోర్డ్ పేజీలు మరియు అడ్మిన్ కార్యకలాపాల కోసం.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ధృవీకరించబడి **మరియు** `authenticated: true` కలిగి ఉన్నప్పుడు మాత్రమే cookie ఒక సెషన్‌గా ఉంటుంది (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Cookieను ఉపయోగించే ప్రతిదీ (డ్యాష్‌బోర్డ్ route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live server, `/api/settings/require-login`, `/api/auth/status`) ఆ helper ద్వారానే వెళ్తుంది. `JWT_SECRET`తో సంతకం చేసిన ఇతర JWTలు కూడా ఉన్నాయి — Cursor CLI passthrough కీ హోల్డర్ల కోసం `iss "omniroute" / aud "cursor-cli"` టోకెన్‌లను జారీ చేస్తుంది — అవి ఎప్పుడూ సెషన్‌లు కావు (#13298).

`src/shared/utils/apiAuth.ts`లోని `isDashboardSessionAuthenticated()` ద్వారా ధృవీకరించబడుతుంది. JWT తన 30 రోజుల జీవితకాలంలో 7 రోజుల కంటే తక్కువ మిగిలి ఉన్నప్పుడు pipeline దాన్ని స్వయంచాలకంగా రిఫ్రెష్ చేస్తుంది.

30 రోజులు పూర్తికాకముందే సెషన్ ముగియవచ్చు: ప్రతి minter `mintDashboardSessionToken` ద్వారానే వెళ్తుంది (జారీ సమయం `iat` మరియు ID `jti`తో), మరియు verifier రెండు సెట్టింగ్‌లను తనిఖీ చేస్తుంది: `sessionsValidAfter` — పాస్‌వర్డ్ మార్పు ద్వారా సెట్ అవుతుంది, కాబట్టి దానికి ముందు జారీ అయిన ప్రతి సెషన్ ధృవీకరణలో విఫలమవుతుంది (పాస్‌వర్డ్ మార్చిన బ్రౌజర్‌కు తాజా cookie లభిస్తుంది); మరియు `revokedDashboardSessions` — `POST /api/auth/logout` సైన్-అవుట్ అయిన సెషన్ యొక్క `jti`ని దీనికి జోడిస్తుంది. పాత రిలీజ్ జారీ చేసిన సెషన్‌లకు ఈ రెండు క్లెయిమ్‌లూ ఉండవు; మొదటి పాస్‌వర్డ్ మార్పు వరకు అవి చెల్లుబాటులోనే ఉంటాయి. సెట్టింగ్‌లను చదవలేకపోతే, సెషన్ నమ్మబడదు.

కొన్ని మేనేజ్‌మెంట్ routes **ఏదో ఒక** మోడ్‌ను అంగీకరిస్తాయి: API కీకు `manage` (లేదా `admin`) scope ఉన్నప్పుడు cookie లేదా `Bearer <key>`. v3.8లో జోడించిన "API కాల్స్ ద్వారా కాన్ఫిగర్ చేయగల" వర్క్‌ఫ్లోను ఇది సాధ్యం చేస్తుంది.

#### ఐచ్ఛిక OIDC లాగిన్ గేట్ (#6973)

డ్యాష్‌బోర్డ్ అడ్మిన్ లాగిన్ డిఫాల్ట్ పాస్‌వర్డ్ లాగిన్‌తో పాటు **ఐచ్ఛిక** OIDC (OpenID Connect) ఫ్లోకు కూడా మద్దతు ఇస్తుంది — పాస్‌వర్డ్ లాగిన్ ఎప్పుడూ తీసివేయబడదు, కేవలం అదనంగా మాత్రమే:

- `settings.oidcEnabled === true` **మరియు** `oidcIssuer` / `oidcClientId` / `oidcClientSecret` అన్నీ కాన్ఫిగర్ చేయబడి ఉంటేనే ఇది పనిచేస్తుంది (Settings → Auth). లేకపోతే `GET /api/auth/oidc/login` `400` ఇస్తుంది.
- `GET /api/auth/oidc/login` issuer యొక్క `/.well-known/openid-configuration` నుండి `authorization_endpoint`ను కనుగొంటుంది (దొరకకపోతే `<issuer>/authorize`కు వెనక్కి వెళ్తుంది), వచ్చిన request నుండి redirect URIని నిర్మిస్తుంది (`x-forwarded-proto`ను గౌరవిస్తుంది), మరియు `httpOnly` `oidc_state` cookieలో నిల్వ చేసిన యాదృచ్ఛిక `state`తో IdPకి మళ్లిస్తుంది.
- `GET /api/auth/oidc/callback` `state`ను ధృవీకరిస్తుంది, authorization codeను మార్పిడి చేస్తుంది, మరియు `issuer`/`audience` తనిఖీలతో issuer యొక్క JWKS ద్వారా ID token సంతకాన్ని ధృవీకరిస్తుంది (`jose` యొక్క `createRemoteJWKSet`, ప్రతి JWKS URIకి విడిగా cache చేయబడుతుంది). `oidcAllowedSubjects` allowlist తప్పనిసరి: అది token యొక్క `sub` claim లేదా `email` claimతో సరిపోతుంది. `email` claim `email_verified === true` అయినప్పుడు మాత్రమే గౌరవించబడుతుంది — కాబట్టి IdPలో ధృవీకరించని email ఎప్పుడూ gateను దాటలేదు. ఎంట్రీలు లేకపోతే callback ప్రతి లాగిన్‌ను తిరస్కరిస్తుంది (`not_configured`).
- విజయవంతమైతే, పాస్‌వర్డ్ లాగిన్ జారీ చేసే **అదే** 30 రోజుల `auth_token` JWTని ఇది జారీ చేస్తుంది (`src/app/api/auth/login/route.ts`). కాబట్టి dashboard session pipeline యొక్క మిగతా భాగాలు (ఆటో-రిఫ్రెష్, cookie flags) మారవు — OIDC మారుస్తున్నది cookie ఎలా పుడుతుందో మాత్రమే; అది ఇచ్చే అధికారాన్ని కాదు.
- `oidc*` settings అన్నీ (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`)లో ఉన్నాయి: `currentPassword` గా మేనేజ్‌మెంట్ పాస్‌వర్డ్‌ను body లో పంపకపోతే `PATCH /api/settings` `400 PASSWORD_REQUIRED` ఇస్తుంది (తప్పు అయితే `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` పాస్‌వర్డ్ _login_ (`POST /api/auth/login`)ను నిరాకరిస్తుంది, కానీ నిల్వ చేసిన password hashను ఉంచుతుంది; మళ్లీ ధృవీకరణ ఇప్పటికీ దానికి వ్యతిరేకంగా `currentPassword`ను తనిఖీ చేస్తుంది.
- `corsOrigins` మరియు `bruteForceProtection` కూడా `SECURITY_IMPACTING_SETTINGS_KEYS`లో ఉన్నాయి: వీటిని సడలిస్తే login రక్షణలు బలహీనపడతాయి, కాబట్టి వీటికీ అదే `currentPassword` మళ్లీ-ధృవీకరణ అవసరం (Security tab దాన్ని అడుగుతుంది), మరియు JSON import వీటిని వదిలేస్తుంది.
- ప్రతి security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS` ఎంట్రీలు, ప్రతి `oidc*` key, మరియు dashboard session స్థితి — `PATCH /api/settings`పై **operator-only**: manage-scoped API key లేదా `oma_` access token సరైన `currentPassword` పంపినా `403`తో తిరస్కరించబడతాయి, మరియు ఆ తిరస్కారం `settings.update_failed` with `reason: OPERATOR_REQUIRED` గా ఆడిట్ చేయబడుతుంది (`src/lib/api/operatorCredential.ts`లోని `requireOperatorCredential()`). సాధారణ settings (theme, display preferences) `manage` key లేదా `admin` access token కు ఇంకా వ్రాయదగినవిగానే ఉంటాయి. `/api/settings` లో ప్రతి మార్పుకు (మరియు `/api/settings/require-login`కు) `admin` access-token scope అవసరం (`src/server/authz/accessScopes.ts`లోని `ADMIN_MUTATION_EXACT_PATHS`, exact-path match); `GET` `read` గానే ఉంటుంది, మరియు ఇతర `/api/settings/*` sub-routes (proxies, combo defaults, model aliases, compression, purges…) method నుండి ఊహించిన `write` scopeను కొనసాగిస్తాయి.
- `POST /api/settings/import-json` ఆ మళ్లీ-ధృవీకరణను దాటవేస్తుంది, కాబట్టి వ్రాయడానికి ముందు అదే file లోని `IMPORT_STRIPPED_SETTINGS_KEYS`లోని ప్రతి keyను తొలగిస్తుంది: పాస్‌వర్డ్ మరియు `currentPassword`, ప్రతి `SECURITY_IMPACTING_SETTINGS_KEYS` ఎంట్రీ, మరియు dashboard session స్థితి (`sessionsValidAfter`, `revokedDashboardSessions`). కాబట్టి పాత backup ను import చేయడం, పాస్‌వర్డ్ మార్పు లేదా sign-out ఇప్పటికే ముగించిన session ను తిరిగి బ్రతికించలేదు.

## రూట్ తరగతులు

`src/server/authz/types.ts` మూడు తరగతులను నిర్వచిస్తుంది; నిర్ణయాత్మకంగా వర్గీకరించలేని ఏ route అయినా `MANAGEMENT`కు తిరిగి వెళ్తుంది.

| Class        | Description                                                                                                                                           | Auth required                                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `PUBLIC`     | స్పష్టంగా సురక్షితమైన routes — login, logout, status, init, health, onboarding bootstrap.                                                             | ఏదీ అవసరం లేదు                                                           |
| `CLIENT_API` | Model-serving endpoints — `/api/v1/*`, `/api/v1beta/*`, మరియు aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | `REQUIRE_API_KEY` feature flag ప్రభావవంతంగా ఆన్‌లో ఉన్నప్పుడు Bearer key |
| `MANAGEMENT` | Dashboard పేజీలు, settings, providers, keys, admin మరియు diagnostics endpoints.                                                                       | Dashboard session లేదా `manage` scope ఉన్న Bearer                        |

కొన్ని `MANAGEMENT` చర్యలు **operator-only**: `manage` key సరిపోదు. నిల్వ చేసిన credentials ఎగుమతి (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), live data పై backup ను పునరుద్ధరించడం (`dryRun=true` తో సహా `POST /api/db-backups/import`, id ద్వారా `POST /api/db-backups` restore, `POST /api/settings/import-json`), restore points ను నాశనం చేయడం (`DELETE /api/db-backups` cleanup, మరియు `PATCH /api/db-backups` ఎందుకంటే అది నిల్వ చేసే retention ప్రతి backup తర్వాత స్వయంచాలక తొలగింపును నడుపుతుంది) వంటి వాటికి dashboard session, స్థానిక CLI subject, లేదా login నిలిపివేయబడి ఉండటం అవసరం. Sync token జారీ (`POST /api/sync/tokens`) మరియు `admin` CLI access token తయారు చేయడం (`POST /api/cli/tokens`) ప్రతి login mode లో dashboard session లేదా స్థానిక CLI subject అవసరం. ఏ scope అయినా API keys మరియు `oma_` access tokens operator credentials కావు: అవసరమైనప్పుడెల్లా వాటికి `403` వస్తుంది. ఈ తనిఖీ `src/lib/api/operatorCredential.ts`లో ఉంది (`resolveOperatorCredential()` / `requireOperatorCredential()`). Login settings మార్చడం కూడా operator-only: పాస్‌వర్డ్ ఇప్పటికే ఉంటే `POST /api/settings/require-login` (మేనేజ్‌మెంట్ పాస్‌వర్డ్ సెట్ చేయడం / `requireLogin` టోగుల్ చేయడం) ఆ credentials నే అంగీకరిస్తుంది — పాస్‌వర్డ్ లేని మొదటి-రన్ bootstrap విండో మారదు — మరియు పాస్‌వర్డ్‌ను మార్చడానికి dashboard session `currentPassword` పంపాలి (అది లేకపోయినా లేదా తప్పుగా ఉన్నా `403`, `settings.update_failed` గా ఆడిట్ చేయబడుతుంది). స్థానిక CLI మరియు login నిలిపివేయబడిన instance రికవరీ మార్గాన్ని ఉంచుతాయి; అవి data directory ను కలిగి ఉన్న host కు బంధించబడి ఉన్నాయి కాబట్టి, అది లేకుండానే పాస్‌వర్డ్ సెట్ చేయవచ్చు.

## పైప్లైన్

```
వచ్చే అభ్యర్థన → src/proxy.ts
  → src/server/authz/pipeline.tsలో runAuthzPipeline()
    1. విశ్వసనీయ అంతర్గత హెడర్లను తొలగించండి (x-omniroute-auth-*, x-omniroute-route-class)
    2. అభ్యర్థన idని రూపొందించి, classifyRoute() ద్వారా రూట్ను వర్గీకరించండి
    3. pathname == "/" అయితే → /dashboardకు మళ్లించండి
    4. డ్రెయినింగ్లో ఉంటే (సజావైన షట్డౌన్) మరియు /api/* అయితే → 503
    5. GET కాని /api/* అయితే → checkBodySize() గార్డ్
    6. OPTIONS అయితే → CORS ప్రీఫ్లైట్ 204
    7. options.enforce == false అయితే → route-class హెడర్లతో యథాతథంగా పంపండి
    8. లేకపోతే: POLICIES[routeClass].evaluate(ctx)
       - అనుమతిస్తే  → x-omniroute-auth-{kind,id,label,scopes} ముద్రించండి → NextResponse.next()
       - తిరస్కరిస్తే → correlation_idతో JSON లోపం (డ్యాష్బోర్డ్ పేజీలు → 302 /login)
```

విశ్వసనీయ అంతర్గత హెడర్లు (`src/server/authz/headers.ts`లో నిర్వచించబడినవి) వర్గీకరణకు ముందు **వచ్చే అభ్యర్థనల నుండి తొలగించబడతాయి** — ఒక సబ్జెక్ట్లా నటించడానికి క్లయింట్లు `x-omniroute-auth-*`ను ముందుగానే నింపలేరు.

### పాలసీ ఒప్పందాలు

ప్రతి రూట్ క్లాస్కు `src/server/authz/policies/`లో ఒక పాలసీ ఉంటుంది:

- **`publicPolicy`** (`policies/public.ts`) — ఎల్లప్పుడూ `allow({ kind: "anonymous", id: "anonymous" })`ను అందిస్తుంది.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearerను సంగ్రహించి, `validateApiKey()` ద్వారా ధ్రువీకరిస్తుంది. ప్రభావవంతమైన `REQUIRE_API_KEY` ఫీచర్ ఫ్లాగ్ నిలిపివేయబడినప్పుడు మాత్రమే అనామక యాక్సెస్కు అనుమతిస్తుంది. ప్రభావవంతమైన ఫ్లాగ్ `isRequireApiKeyEnabled()` (`DB ఫీచర్ ఫ్లాగ్ ఓవర్రైడ్ > process.env.REQUIRE_API_KEY > డిఫాల్ట్`) ద్వారా పరిష్కరించబడుతుంది; కాబట్టి డ్యాష్బోర్డ్ ఫీచర్ ఫ్లాగ్లు మరియు ఎన్విరాన్మెంట్ వేరియబుల్స్ `/api/v1/*`, `/api/v1beta/*`, మరియు అలియాస్లను స్థిరంగా నియంత్రిస్తాయి; రిజాల్వర్ వైఫల్యాలు యాక్సెస్ను నిరాకరిస్తాయి. క్లయింట్ API రూట్లపై డ్యాష్బోర్డ్-సెషన్ అభ్యర్థనలను అనుమతిస్తుంది (డ్యాష్బోర్డ్ మోడల్ కేటలాగ్ ఉపయోగించే `/api/v1/models`తో సహా).
- **`managementPolicy`** (`policies/management.ts`) — డ్యాష్బోర్డ్ సెషన్ను, అంతర్గత మోడల్-సింక్ అభ్యర్థనలను (`/api/providers/[name]/(sync-models|models)`తో సరిపోల్చబడినవి) అంగీకరిస్తుంది, లేదా `isAuthRequired()` falseను అందిస్తే పూర్తిగా దాటవేస్తుంది. Bearer టోకెన్ ఉన్నప్పటికీ అది చెల్లనప్పుడు 403 (`AUTH_001`)ను, లేకపోతే 401ను అందిస్తుంది. ఏ ప్రమాణీకరణ శాఖకు ముందైనా రూట్-గార్డ్ స్థాయిలను (LOCAL_ONLY / ALWAYS_PROTECTED) కూడా అమలు చేస్తుంది — [రూట్ గార్డ్ స్థాయిలు](../security/ROUTE_GUARD_TIERS.md) చూడండి. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`లోని LOCAL_ONLY పాత్లను (ప్రస్తుతం: `/api/mcp/`) Bearer కీ `manage` స్కోప్ను కలిగి ఉన్నప్పుడు లూప్బ్యాక్ కాని చిరునామా నుండి యాక్సెస్ చేయవచ్చు; స్కోప్తో సంబంధం లేకుండా మిగతా LOCAL_ONLY పాత్లన్నీ ఖచ్చితంగా లూప్బ్యాక్కే పరిమితమవుతాయి.

విజయవంతమైన పాలసీ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`తో `AuthSubject`ను అందిస్తుంది. దిగువస్థాయి హ్యాండ్లర్లు ప్రమాణీకరణ లాజిక్ను మళ్లీ అమలు చేయడానికి బదులుగా, `src/server/authz/assertAuth.ts`లోని `assertAuth(request, "CLIENT_API")` ద్వారా దాన్ని చదవవచ్చు.

## పబ్లిక్ రూట్ల జాబితా

`src/shared/constants/publicApiRoutes.ts` అనేది స్పష్టమైన అనుమతి జాబితా:

ఈ జాబితా **ఆకృతి** ఆధారంగా విభజించబడింది, అలాగే ఈ విభజన అత్యంత కీలకమైనది (GHSA-74g9-q8f6-793h): ఒక ప్రిఫిక్స్ను
`startsWith()` ఉపయోగించి సరిపోల్చుతారు, కాబట్టి దాని ప్రారంభ అక్షరాలను పంచుకునే ప్రతి సమీప పాత్తో కూడా అది సరిపోలుతుంది.
`/api/usage/om-usage`ను ప్రిఫిక్స్గా ఉంచడం వల్ల `/api/usage/om-usage<anything>` పబ్లిక్గా గుర్తించబడింది, అలాగే Next దాన్ని
`/api/usage/[connectionId]`కు పరిష్కరిస్తుంది — ఇది స్వంత ఆథెంటికేషన్ లేని హ్యాండ్లర్.

```ts
// నిజమైన సబ్ట్రీలు. ప్రతి ఎంట్రీ తప్పనిసరిగా "/"తో ముగియాలి (యూనిట్ టెస్ట్ ద్వారా నిర్ధారించబడుతుంది).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classifyలో CLIENT_APIగా పరిగణించబడుతుంది, "ఆథెంటికేషన్ అవసరం లేని పబ్లిక్"గా కాదు
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ఒకే రూట్లు, ఖచ్చితంగా సరిపోల్చబడతాయి (చివరలో స్లాష్ ఉన్నా లేకపోయినా).
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

// CORS మూల పరిమితి సడలింపు కూడా వర్తించే, చదవడానికి మాత్రమే ఉద్దేశించిన ఒకే రూట్లు.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS సడలింపు లేని, చదవడానికి మాత్రమే ఉద్దేశించిన ఒకే రూట్.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

చదవడానికి మాత్రమే ఉద్దేశించిన రూట్లు సురక్షితమైన మెథడ్లకు **మాత్రమే** పబ్లిక్గా ఉంటాయి. గమనిక: `classifyRoute()` పబ్లిక్ ఫాల్-త్రూ నుండి `/api/v1/*` మరియు `/api/v1beta/*`ను మినహాయిస్తుంది — Bearer కీ పాలసీ ఇప్పటికీ వర్తించేలా అవి ఎల్లప్పుడూ `CLIENT_API`గానే ఉంటాయి.

## కొత్త రూట్ను జోడించడం

### నమూనా 1 — పబ్లిక్ క్లయింట్ API ఎండ్పాయింట్ (Bearer ఆథెంటికేషన్)

`/api/v1/` మరియు `/api/v1beta/` కింద ఉన్న రూట్లు స్వయంచాలకంగా `CLIENT_API`గా వర్గీకరించబడతాయి. మిడిల్వేర్ Bearer తనిఖీని అమలు చేస్తుంది; రూట్ హ్యాండ్లర్లు దాన్ని మళ్లీ చేయాల్సిన అవసరం లేదు, కానీ ఉపయోగకరమైతే సబ్జెక్ట్ను చదవవచ్చు.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... హ్యాండ్లర్ లాజిక్
}
```

### నమూనా 2 — నిర్వహణ ఎండ్పాయింట్ (సెషన్ లేదా Bearer + manage)

`src/lib/api/requireManagementAuth.ts` నుండి `requireManagementAuth()`ను ఉపయోగించండి:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... హ్యాండ్లర్ లాజిక్
}
```

విజయవంతమైనప్పుడు `requireManagementAuth()` `null`ను, లేకపోతే JSON ఎర్రర్ `Response`ను తిరిగి ఇస్తుంది:

- 401 `AUTH_001` "ఆథెంటికేషన్ అవసరం" — ఎలాంటి క్రెడెన్షియల్స్ లేవు
- 403 — చెల్లని Bearer **లేదా** Bearer ఉన్నప్పటికీ కీకి `manage` / `admin` స్కోప్ లేదు

`hasManageScope(scopes)` అనేది `"manage"` లేదా `"admin"` కోసం trueను తిరిగి ఇస్తుంది.

### నమూనా 3 — పబ్లిక్ అనుమతి జాబితాకు జోడించడం

సౌలభ్యం ఆధారంగా కాకుండా, ఆకృతి ఆధారంగా సెట్ను ఎంచుకోండి. ఒక రూట్ను `PUBLIC_API_ROUTES_EXACT`లో ఉంచాలి (లేదా GET-మాత్రమే అయితే `PUBLIC_READONLY_CORS_API_ROUTES`లో); నిజమైన సబ్ట్రీని మాత్రమే `PUBLIC_API_ROUTE_PREFIXES`లో ఉంచాలి, అలాగే అది **తప్పనిసరిగా `/`తో ముగియాలి**. ఒకే రూట్ను ప్రిఫిక్స్ జాబితాలో ఉంచడం వల్ల, దాని ప్రారంభ అక్షరాలను పంచుకునే ప్రతి సమీప పాత్ కూడా పబ్లిక్ అవుతుంది — భవిష్యత్తులో జోడించే డైనమిక్-సెగ్మెంట్ సిబ్లింగ్లతో సహా (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` మరియు `tests/unit/authz/classify.test.ts` వద్ద ఉన్న యూనిట్ టెస్ట్లను నవీకరించండి.

## స్కోప్లు

మూడు నేమ్స్పేస్లు. ప్రతి చెకర్ దాని స్వంత స్ట్రింగ్లను మాత్రమే చదువుతుంది. పక్కపక్కన, `read:compression` కోసం `manage` ఎందుకు `scopeMatches`లో విఫలమవుతుంది మరియు `read` యాక్సెస్ టోకెన్ `PATCH /api/keys/{id}` చేయలేకపోవడానికి కారణంతో సహా, [మూడు స్కోప్ నేమ్స్పేస్లు](../frameworks/MCP-SERVER.md#three-scope-namespaces)లో ఉంది.

API కీలు `scopes` శ్రేణిని కలిగి ఉంటాయి (`api_keys.scopes`లో JSONగా నిల్వ చేయబడతాయి, `src/lib/db/apiKeys.ts` చూడండి).

### మేనేజ్మెంట్ స్కోప్

- `manage` / `admin` — `hasManageScope`. మేనేజ్మెంట్ API రూట్లకు బేరర్ యాక్సెస్.
- `mcp:connect`, `self:usage`, `self:account-quota`, మరియు
  `policy:bypass-provider-quota` అనేవి అడిటివ్ ఎగ్జాక్ట్-మ్యాచ్ స్కోప్లు. అవి
  `MANAGEMENT_API_KEY_SCOPES` వెలుపల ఉంటాయి. `mcp:connect` కేవలం `/api/mcp/`
  నాన్-లూప్బ్యాక్ కార్వ్-అవుట్ను మాత్రమే తెరుస్తుంది.

### MCP టూల్ స్కోప్లు

కేటలాగ్ మరియు సరిపోలే నియమాలు (ఒకే స్ట్రింగ్, లేదా `*`తో ముగిసే మంజూరు చేయబడిన స్కోప్):
[MCP టూల్ స్కోప్లు](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`src/shared/constants/mcpScopes.ts`లోని `MCP_SCOPE_LIST` అనేది అసలు టైప్ చేయబడిన
సబ్సెట్, పూర్తి కేటలాగ్ కాదు. `resolveCallerScopeContext()` MCP ప్రామాణీకరణ
సమాచారం, అభ్యర్థన మెటాడేటా లేదా `OMNIROUTE_MCP_SCOPES` నుండి స్కోప్లను
పరిష్కరించిన తర్వాత `open-sse/mcp-server/scopeEnforcement.ts`లో అమలు జరుగుతుంది.
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` కాకపోతే అది నిలిపివేయబడుతుంది.

### యాక్సెస్-టోకెన్ స్కోప్లు

`oma_live_…` టోకెన్లపై `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) ద్వారా ర్యాంక్ చేయబడతాయి. ఈ ర్యాంక్
యాక్సెస్-టోకెన్ క్రెడెన్షియల్కు మాత్రమే వర్తిస్తుంది. [మేనేజ్మెంట్ ప్రామాణీకరణ](../guides/MANAGEMENT-AUTH.md) చూడండి.

## Auth Required టోగుల్

`src/shared/utils/apiAuth.ts`లోని `isAuthRequired()` ఒక request కు **ఏదైనా** auth అమలు చేయాలా వద్దా అని నిర్ణయిస్తుంది:

- `settings.requireLogin === false` → auth ప్రపంచవ్యాప్తంగా నిలిపివేయబడుతుంది, కానీ ఎల్లప్పుడూ-రక్షిత శ్రేణి ([Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) మినహా, మరియు అంగీకరించే credential ను జారీ చేసే calls మినహా — login ఆన్‌లో ఉన్నప్పుడు అవసరమయ్యే అదే credential కావాలి: sync tokens జారీ చేయడం, ఏ scope లోనైనా CLI access tokens తయారు చేయడం, మరియు `manage`/`admin` scope ఉన్న API key ను సృష్టించడం, ఒక key కు ఆ scope ఇవ్వడం, లేదా అలాంటి key ను రీజెనరేట్ చేయడం లేదా బహిర్గతం చేయడం (`src/lib/api/requireManagementAuth.ts`లోని `requireCredentialForManagementScopedKey()`). Inference-only keys తెరిచే ఉంటాయి.
- పాస్‌వర్డ్ కాన్ఫిగర్ కాలేదు **మరియు** `INITIAL_PASSWORD` env var లేదు → bootstrap mode onboarding wizard ను మరియు loopback requests ను అనుమతిస్తుంది, కానీ బహిర్గతమైన network requests కు ఇంకా credentials అవసరం.
- ఏదైనా DB error → fail closed (secure-by-default).

Client API key అమలు, నేరుగా `process.env.REQUIRE_API_KEY`ని చదవకుండా, `src/shared/utils/featureFlags.ts`లోని `isRequireApiKeyEnabled()`ను ఉపయోగిస్తుంది. ఇది deployed instances కు ముఖ్యం: Dashboard → Feature Flags లో `REQUIRE_API_KEY`ను టోగుల్ చేస్తే DB override నిల్వ అవుతుంది మరియు `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, ఈ helper ను పంచుకునే ఇతర client-API auth తనిఖీలు వెంటనే ప్రభావితమవుతాయి. Feature flag store చదవలేకపోతే, client API auth fail closed అవుతుంది మరియు key ను కోరుతుంది.

## బ్రేకింగ్ మార్పు — v3.8.0

`/api/v1/agents/tasks/*` మరియు `/api/resilience/model-cooldowns` ఎండ్పాయింట్లకు **ఇప్పుడు నిర్వహణ ప్రమాణీకరణ అవసరం** (కమిట్ `588a0333`). గతంలో `manage` స్కోప్ లేని సాధారణ API కీని పంపిన క్లయింట్లు `403`ను అందుకుంటారు. మైగ్రేషన్: API Keys డ్యాష్బోర్డ్లో కీకి `manage` స్కోప్ను కేటాయించండి లేదా లాగిన్ చేసిన డ్యాష్బోర్డ్ సెషన్ను ఉపయోగించండి.

## ప్రవర్తన మార్పు — v3.8.2

`/api/mcp/*` (రిమోట్ MCP సర్వర్) ఇప్పటికీ డిఫాల్ట్గా LOCAL_ONLYగా ఉంటుంది, కానీ `Authorization: Bearer <api-key>` హెడర్లో `manage` స్కోప్ ఉన్నప్పుడు ఇప్పుడు లూప్బ్యాక్ కాని అభ్యర్థనలను అంగీకరిస్తుంది. `src/server/authz/routeGuard.ts`లోని `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ద్వారా ఈ మినహాయింపు ప్రతి పాత్కు స్పష్టంగా నియంత్రించబడుతుంది; సమాన స్థాయి LOCAL_ONLY ప్రిఫిక్స్ `/api/cli-tools/runtime/*` ఏవైనా సబ్ప్రాసెస్లను ప్రారంభించగలదు కాబట్టి, దాన్ని ఉద్దేశపూర్వకంగానే బైపాస్ చేయడం సాధ్యం కాదు. లూప్బ్యాక్ కాని చోట్ల నుండి `/api/mcp/*`కు వచ్చే అనామక అభ్యర్థనలు weiterhin `403 LOCAL_ONLY`ను అందుకుంటాయి — ఏదైనా కొత్త LOCAL_ONLY పాత్కు డిఫాల్ట్గా కఠినమైన లూప్బ్యాక్ నియమమే వర్తిస్తుంది. [రూట్ గార్డ్ స్థాయిలు](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) చూడండి.

## టెస్టింగ్

- యూనిట్ టెస్ట్లు: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- పబ్లిక్ అనుమతి జాబితా: `tests/unit/public-api-routes.test.ts`.
- నిర్దిష్ట టెస్ట్ను అమలు చేయడానికి: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## డీబగ్గింగ్

పైప్లైన్ ఎల్లప్పుడూ ప్రతిస్పందనలకు వీటిని జోడిస్తుంది:

```
x-request-id:               <సహసంబంధ ఐడి, లోప ప్రతిస్పందనల్లో తిరిగి పంపబడుతుంది>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ప్రమాణీకరించిన అభ్యర్థనల కోసం అప్స్ట్రీమ్ (హ్యాండ్లర్ వైపు) అభ్యర్థన హెడర్లలో ఇవి కూడా ఉంటాయి:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<చివరి-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ఐచ్ఛికం)
x-omniroute-auth-scopes:    కామాలతో వేరు చేసిన జాబితా
```

హ్యాండ్లర్లలో `assertAuth(req, expectedClass)`ను ఉపయోగించండి — మిడిల్వేర్ను దాటవేసినట్లయితే, ఇది `AUTHZ_NOT_INITIALIZED` కోడ్తో `AuthzAssertionError`ను విసురుతుంది (పరీక్షల్లో కాన్ఫిగరేషన్ రిగ్రెషన్లను గుర్తించడానికి ఉపయోగకరం).

## వీటిని కూడా చూడండి

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ప్రతి ఎండ్పాయింట్కు ప్రామాణీకరణ మార్కర్
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ప్రామాణీకరణ ఈవెంట్ల కోసం ఆడిట్ లాగ్
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — మూడు స్కోప్ నేమ్స్పేస్లు మరియు MCP టూల్-స్కోప్ కేటలాగ్
- మూలం: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
