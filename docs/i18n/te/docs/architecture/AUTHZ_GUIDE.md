# Authorization Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **నిజానికి మూలం:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **చివరిగా నవీకరించబడింది:** 2026-09-22 — స్కోప్ నేమ్స్పేస్లు MCP-SERVER.mdని సూచిస్తాయి

OmniRoute ప్రతి API అభ్యర్థనను నియంత్రించే రూట్-అవేర్ ఆథరైజేషన్ పైప్లైన్ను కలిగి ఉంది. వర్గీకరణ **నిర్ణయాత్మకమైనది** మరియు **ఫెయిల్-క్లోజ్డ్** — వర్గీకరించబడని ఏదైనా `MANAGEMENT`గా ముగుస్తుంది మరియు సెషన్ లేదా మేనేజ్మెంట్-గ్రేడ్ టోకెన్ను డిమాండ్ చేస్తుంది. ఈ పేజీ రూట్లను నిర్వహించే లేదా కొత్త ఎండ్పాయింట్లను రూపొందించే ఇంజనీర్ల కోసం మోడల్ను వివరిస్తుంది.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> మూలం: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 2 రకాల Auth మోడ్లు

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-అనుకూల క్లయెంట్ APIలు మరియు keyకి `manage` scope ఉన్నప్పుడు కొన్ని నిర్వహణ మార్గాల కోసం ఉపయోగించబడుతుంది.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` లోని `isValidApiKey()` / `extractApiKey()` ద్వారా ధృవీకరించబడుతుంది మరియు `src/shared/utils/apiAuth.ts` ద్వారా మళ్లీ ఎగుమతి చేయబడుతుంది. `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env varsను persistent passthrough keysగా validator అంగీకరిస్తుంది (issue #1350).

### 2. Dashboard Session (auth_token cookie)

Dashboard పేజీలు మరియు admin కార్యకలాపాల కోసం.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ధృవీకరించబడిన **మరియు** `authenticated: true` కలిగి ఉన్నప్పుడు మాత్రమే cookie ఒక session అవుతుంది
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Cookieని వినియోగించే ప్రతి consumer (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) ఈ helper ద్వారా వెళ్తుంది.
`JWT_SECRET`తో సంతకం చేయబడిన ఇతర JWTలు కూడా ఉన్నాయి — key holders కోసం Cursor CLI passthrough
`iss "omniroute" / aud "cursor-cli"` tokensను mint చేస్తుంది — మరియు అవి ఎప్పుడూ sessions కావు
(#13298).

`src/shared/utils/apiAuth.ts` లోని `isDashboardSessionAuthenticated()` ద్వారా ధృవీకరించబడుతుంది. 30-రోజుల lifetimeలో ఇంకా 7 రోజుల కంటే తక్కువ సమయం మిగిలి ఉన్నప్పుడు pipeline JWTని స్వయంచాలకంగా refresh చేస్తుంది.

ప్రతి minter `mintDashboardSessionToken` ద్వారా వెళ్తుంది (`iat` అనే issue time మరియు `jti` అనే idతో), అలాగే verifier రెండు settingsను తనిఖీ చేస్తుంది కాబట్టి, session దాని 30 రోజులు పూర్తికాకముందే కూడా ముగియవచ్చు: `sessionsValidAfter`ను password మార్పు ద్వారా సెట్ చేస్తారు, అందువల్ల దానికి ముందు జారీ చేయబడిన ప్రతి session ధృవీకరణను ఆపివేస్తుంది (password మార్చిన browserకి కొత్త cookie లభిస్తుంది), అలాగే sign-out చేసిన session యొక్క `jti`ను `POST /api/auth/logout` జోడించే `revokedDashboardSessions`. పాత release ద్వారా mint చేయబడిన sessionsలో ఈ రెండు claims ఉండవు మరియు మొదటి password మార్పు వరకు చెల్లుబాటులో ఉంటాయి. Settingsను చదవలేకపోతే, sessionను నమ్మరు.

కొన్ని నిర్వహణ మార్గాలు **ఏదైనా ఒక** modeను అంగీకరిస్తాయి: API keyకి `manage` (లేదా `admin`) scope ఉన్నప్పుడు cookie లేదా `Bearer <key>`. v3.8లో జోడించబడిన "configurable via API calls" workflowను ఇది ప్రారంభిస్తుంది.

#### ఐచ్ఛిక OIDC login gate (#6973)

Dashboard admin login, default password loginతో పాటు opt-in OIDC (OpenID Connect) flowకు కూడా మద్దతు ఇస్తుంది
— password login ఎప్పుడూ తొలగించబడదు, కేవలం అదనంగా అందించబడుతుంది:

- `settings.oidcEnabled === true` **మరియు** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` అన్నీ కాన్ఫిగర్ చేయబడినప్పుడే (Settings → Auth) ప్రారంభించబడుతుంది. లేకపోతే
  `GET /api/auth/oidc/login` `400`ను అందిస్తుంది.
- `GET /api/auth/oidc/login`, issuer యొక్క `/.well-known/openid-configuration` నుండి
  `authorization_endpoint`ను కనుగొంటుంది (`<issuer>/authorize`కు fallback అవుతుంది), వచ్చిన అభ్యర్థన ఆధారంగా
  (`x-forwarded-proto`ను పరిగణనలోకి తీసుకుని) redirect URIని నిర్మిస్తుంది, మరియు యాదృచ్ఛికమైన `state`ను
  `httpOnly` `oidc_state` కుకీలో నిల్వ చేసి, IdPకు redirect చేస్తుంది.
- `GET /api/auth/oidc/callback`, `state`ను ధృవీకరించి, authorization codeను మార్పిడి చేసి, issuer యొక్క JWKS
  (`jose` యొక్క `createRemoteJWKSet`, JWKS URIకి ఒక్కసారి cache చేయబడుతుంది) ద్వారా ID token యొక్క సంతకాన్ని
  `issuer`/`audience` తనిఖీలతో ధృవీకరిస్తుంది. Dashboard ప్రవేశానికి ఖాళీ కాని `oidcAllowedSubjects` జాబితా,
  `oidcAdmissionClaim` విధానం లేదా రెండూ అవసరం. `email_verified === true` ఉన్నప్పుడే subject జాబితా
  `sub` లేదా `email`తో సరిపోలుతుంది. ఐచ్ఛిక claim విధానం, డాట్లతో వేరు చేసిన ID-token claim మార్గాన్ని
  (ఉదాహరణకు, `realm_access.roles`) మరియు అంగీకరించబడిన విలువల arrayను తీసుకుంటుంది; పరిష్కరించబడిన claim
  strings యొక్క array అయి, అంగీకరించబడిన విలువలలో కనీసం ఒకదాన్ని కలిగి ఉండాలి. రెండు విధానాలు కాన్ఫిగర్
  చేయబడితే, రెండూ విజయవంతం కావాలి. లేని లేదా తప్పుగా రూపొందిన claimsను సురక్షిత వైఫల్యంగా పరిగణిస్తారు,
  మరియు ఏ విధానమూ లేకపోతే callback లాగిన్ను నిరాకరిస్తుంది (`not_configured`). ఇప్పటికే ఉన్న
  subject-only కాన్ఫిగరేషన్లు మార్పు లేకుండా కొనసాగుతాయి.
- Keycloak సాధారణంగా realm rolesను access tokensలో మ్యాప్ చేస్తుంది; అవి ID tokensలో తప్పనిసరిగా ఉండకపోవచ్చు.
  `admin` realm roleను అవసరం చేయడానికి, ఈ client కోసం `realm_access.roles`ను దాని **ID token**లో చేర్చే
  protocol mapperను కాన్ఫిగర్ చేసి, ఆపై `oidcAdmissionClaim`ను
  `{ "path": "realm_access.roles", "values": ["admin"] }`గా సెట్ చేయండి.
  role-only admissionను ప్రారంభించే ముందు ఈ client కోసం వాస్తవ ID-token claimను తనిఖీ చేయండి; అప్లికేషన్
  access-token rolesను చదవదు. IdP వైపు token నిరాకరణ దీనికి అదనంగా సహాయపడవచ్చు, కానీ ఈ అప్లికేషన్-వైపు
  తనిఖీకి ప్రత్యామ్నాయం కాదు.
- విజయవంతమైనప్పుడు, పాస్వర్డ్ లాగిన్ జారీ చేసే అదే **ఖచ్చితమైన** 30-రోజుల `auth_token` JWTని
  (`src/app/api/auth/login/route.ts`) రూపొందిస్తుంది. అందువల్ల మిగిలిన dashboard session pipeline
  (ఆటో-రిఫ్రెష్, కుకీ flags) మారదు — కుకీ ఎలా రూపొందించబడుతుందో మాత్రమే OIDC మార్చుతుంది, అది ఏమి
  అనుమతిస్తుందో కాదు. IdP roles/groupsలో మార్పులు ఇప్పటికే ఉన్న OmniRoute sessionsను చెల్లనివిగా చేయవు;
  logout, పాస్వర్డ్ మార్పు లేదా session గడువు ముగియడం వాటి జీవితకాలాన్ని ఇప్పటికీ నిర్ణయిస్తాయి.
- ప్రతి `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`లో ఉంది
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`, bodyలో management
  passwordను `currentPassword`గా పంపకపోతే `400 PASSWORD_REQUIRED`ను అందిస్తుంది (తప్పు password అయితే
  `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin`, పాస్వర్డ్ _లాగిన్_ను (`POST /api/auth/login`)
  నిరాకరిస్తుంది, కానీ నిల్వ చేసిన password hashను ఉంచుతుంది; re-auth ఇప్పటికీ దానితో
  `currentPassword`ను తనిఖీ చేస్తుంది.
- `corsOrigins` మరియు `bruteForceProtection` కూడా `SECURITY_IMPACTING_SETTINGS_KEYS`లో ఉన్నాయి:
  వీటిలో ఏదైనా సడలించడం login రక్షణలను బలహీనపరుస్తుంది. అందువల్ల ఇవి కూడా అదే
  `currentPassword` re-authను కోరుతాయి (Security tab దాన్ని అడుగుతుంది), మరియు JSON import వీటిని
  తొలగిస్తుంది.
- ప్రతి security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS`లోని entries, ప్రతి `oidc*` key మరియు
  dashboard session state — `PATCH /api/settings`లో **operator-only**గా ఉంటుంది: manage-scoped API key
  లేదా `oma_` access token సరైన `currentPassword` పంపినప్పటికీ `403`తో నిరాకరించబడుతుంది, మరియు ఈ
  నిరాకరణ `settings.update_failed`గా, `reason: OPERATOR_REQUIRED`తో audit చేయబడుతుంది
  (`src/lib/api/operatorCredential.ts`లోని `requireOperatorCredential()`). సాధారణ settings
  (theme, display preferences) `manage` key లేదా `admin` access tokenకు ఇప్పటికీ వ్రాయదగినవే.
  `/api/settings` స్వయానిదైన ప్రతి mutationకు (మరియు `/api/settings/require-login`కు కూడా)
  `admin` access-token scope అవసరం (`src/server/authz/accessScopes.ts`లోని
  `ADMIN_MUTATION_EXACT_PATHS`, exact-path match); `GET` మాత్రం `read`గానే ఉంటుంది, అలాగే ఇతర
  `/api/settings/*` sub-routes (proxies, combo defaults, model aliases, compression, purges…) method-inferred
  `write` scopeనే కొనసాగిస్తాయి.
- `POST /api/settings/import-json` ఆ re-authను దాటవేస్తుంది. అందువల్ల వ్రాయడానికి ముందు
  `IMPORT_STRIPPED_SETTINGS_KEYS`లోని (అదే file) ప్రతి keyని తొలగిస్తుంది: password మరియు
  `currentPassword`, ప్రతి `SECURITY_IMPACTING_SETTINGS_KEYS` entry, అలాగే dashboard session state
  (`sessionsValidAfter`, `revokedDashboardSessions`). కాబట్టి పాత backupను import చేయడం ద్వారా password
  మార్పు లేదా sign-out ఇప్పటికే ముగించిన sessionను మళ్లీ సజీవం చేయలేరు.

#### ఐచ్ఛిక TOTP రెండు-దశల లాగిన్ (#16619)

Settings → Security నుంచి నమోదు చేయబడుతుంది; operator దీన్ని
ఆన్ చేసే వరకు ఆఫ్లో ఉంటుంది (`src/server/auth/dashboardMfa.ts`).

- **ఇది కవర్ చేసేవి:** పాస్వర్డ్ లాగిన్ (`POST /api/auth/login`, దీనికి ఆ తర్వాత
  `POST /api/auth/mfa/verify` అవసరం) మరియు `omniroute connect` (`POST /api/cli/connect`,
  ఇది పాస్వర్డ్-మాత్రమే మార్పిడిని తిరస్కరించి, కోడ్ను `totp`గా స్వీకరిస్తుంది).
- **ఇది కవర్ చేయనివి:** OIDC / SSO సైన్-ఇన్ (`/api/auth/oidc/callback`) OmniRoute TOTP
  ను అడగదు. ఇది గుర్తింపు ప్రదాత యొక్క స్వంత రెండో కారకంపై ఆధారపడుతుంది, కాబట్టి OIDC
  ప్రారంభించబడితే IdPలో MFAను అమలు చేయండి.
- **రికవరీ** (పరికరం పోయినప్పుడు, రికవరీ కోడ్లు ఏవీ మిగలనప్పుడు లేదా ఉదాహరణకు
  `STORAGE_ENCRYPTION_KEY` మారిన తర్వాత ఇకపై ధృవీకరించలేని కారకం ఉన్నప్పుడు):
  1. `OMNIROUTE_DISABLE_MFA=true`తో సర్వర్ను పునఃప్రారంభించండి.
  2. హోస్ట్లోనే (లూప్బ్యాక్ పీర్ మరియు లూప్బ్యాక్ `Host`, ఉదాహరణకు
     `http://localhost:20128`) పాస్వర్డ్తో సైన్ ఇన్ చేయండి. ఆ మూలానికి మాత్రమే రెండో
     కారకం దాటవేయబడుతుంది; మిగతా ప్రతి మూలానికి ఇప్పటికీ కోడ్ అవసరం.
  3. Settings → Security → Disableలో పాస్వర్డ్ను నమోదు చేసి, కోడ్ను ఖాళీగా ఉంచండి. `POST /api/auth/mfa/disable` వేరియబుల్ సెట్ చేయబడి, అభ్యర్థన హోస్ట్ నుంచి వచ్చినప్పుడు మాత్రమే `code` లేకుండా బాడీని అంగీకరిస్తుంది; దీనికి ఇప్పటికీ డ్యాష్బోర్డ్ సెషన్ మరియు ప్రస్తుత పాస్వర్డ్ అవసరం, అలాగే ఇది `auth.mfa.disabled`గా `secondFactor: "recovery_switch"`తో ఆడిట్ చేయబడుతుంది.
  4. `OMNIROUTE_DISABLE_MFA`ను అన్సెట్ చేసి, పునఃప్రారంభించండి; అవసరమైతే మళ్లీ నమోదు చేయండి.

## రూట్ క్లాసులు

`src/server/authz/types.ts` మూడు తరగతులను నిర్వచిస్తుంది; నిర్ణయాత్మకంగా వర్గీకరించలేని ఏదైనా మార్గం తిరిగి `MANAGEMENT` కి వస్తుంది.

| తరగతి        | వివరణ                                                                                                                                                             | ప్రమాణీకరణ అవసరం                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `PUBLIC`     | స్పష్టంగా సురక్షితమైన మార్గాలు — లాగిన్, లాగ్అవుట్, స్థితి, ఆరోగ్యం, ఆన్బోర్డింగ్ బూట్స్ట్రాప్.                                                                   | ఏదీ లేదు                                                                 |
| `CLIENT_API` | మోడల్-సర్వింగ్ ముగింపు పాయింట్లు — `/api/v1/*`, `/api/v1beta/*`, ప్లస్ మారుపేర్లు `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | సమర్థవంతమైన `REQUIRE_API_KEY` ఫీచర్ ఫ్లాగ్ ప్రారంభించబడినప్పుడు బేరర్ కీ |
| `MANAGEMENT` | డాష్బోర్డ్ పేజీలు, సెట్టింగ్లు, ప్రొవైడర్లు, కీలు, అడ్మిన్ మరియు డయాగ్నస్టిక్స్ ఎండ్ పాయింట్లు.                                                                   | `manage` స్కోప్తో డాష్బోర్డ్ సెషన్ OR బేరర్                              |

కొన్ని `MANAGEMENT` చర్యలు** ఆపరేటర్-మాత్రమే** : `manage` కీ సరిపోదు. నిల్వ చేయబడిన ఆధారాలను ఎగుమతి చేయడం (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), ప్రత్యక్ష డేటాపై బ్యాకప్ను పునరుద్ధరించడం (`POST /api/db-backups/import` సహా `dryRun=true`, `POST /api/settings/import-json` ద్వారా `POST /api/db-backups` పునరుద్ధరణ ), పునరుద్ధరణ పాయింట్లను నాశనం చేయడం (`DELETE /api/db-backups` క్లీనప్ మరియు `PATCH /api/db-backups`, ఎందుకంటే ప్రతి సెషన్ని నిలుపుదల చేయడం, ప్రతి స్వయంచాలక CLI రన్ తర్వాత డాష్బోర్డ్ని నడపడం అవసరం) విషయం, లేదా లాగిన్ నిలిపివేయబడింది. సమకాలీకరణ టోకెన్ (`POST /api/sync/tokens`) జారీ చేయడం మరియు `admin` CLI యాక్సెస్ టోకెన్ (`POST /api/cli/tokens`)ని ముద్రించడం కోసం డాష్బోర్డ్ సెషన్ లేదా ప్రతి లాగిన్ మోడ్లో స్థానిక CLI సబ్జెక్ట్ అవసరం. ఏదైనా స్కోప్ యొక్క API కీలు మరియు `oma_` యాక్సెస్ టోకెన్లు ఆపరేటర్ ఆధారాలు కావు: అవి అవసరమైనప్పుడు `403` పొందుతాయి. చెక్ `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`)లో నివసిస్తుంది. లాగిన్ సెట్టింగులను మార్చడం ఆపరేటర్-మాత్రమే కూడా: `POST /api/settings/require-login` (నిర్వహణ పాస్వర్డ్ను సెట్ చేయండి / `requireLogin` టోగుల్ చేయండి) పాస్వర్డ్ ఉన్న తర్వాత ఆ ఆధారాలను మాత్రమే అంగీకరిస్తుంది — మొదటి-రన్ బూట్స్ట్రాప్ విండో (ఇంకా పాస్వర్డ్ లేదు) మారదు — మరియు డాష్బోర్డ్ సెషన్ తప్పక `currentPassword` పంపాలి, పాస్వర్డ్ను భర్తీ చేయడానికి లేదా `settings.update_failed` `403`. స్థానిక CLI మరియు లాగిన్ డిసేబుల్తో ఉన్న ఉదాహరణ రికవరీ మార్గాన్ని ఉంచుతుంది మరియు అది లేకుండా పాస్వర్డ్ను సెట్ చేయవచ్చు, ఎందుకంటే రెండూ డేటా డైరెక్టరీని కలిగి ఉన్న హోస్ట్కు కట్టుబడి ఉంటాయి.

## పైప్లైన్

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

విశ్వసనీయ అంతర్గత శీర్షికలు ( `src/server/authz/headers.ts` లో నిర్వచించబడ్డాయి).** ఇన్కమింగ్ అభ్యర్థనల నుండి తీసివేయబడింది** వర్గీకరణకు ముందు — క్లయింట్లు ఒక సబ్జెక్ట్గా నటించడానికి `x-omniroute-auth-*` ప్రీ-పాపులేట్ చేయలేరు.

### విధాన ఒప్పందాలు

ప్రతి రూట్ క్లాస్ `src/server/authz/policies/` లో ఒక విధానాన్ని కలిగి ఉంటుంది:

- **`publicPolicy`** (`policies/public.ts`) — ఎల్లప్పుడూ `allow({ kind: "anonymous", id: "anonymous" })` ని అందిస్తుంది.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ఎక్స్ట్రాక్ట్స్ బేరర్, `validateApiKey()` ద్వారా చెల్లుబాటు అవుతుంది. ప్రభావవంతమైన `REQUIRE_API_KEY` ఫీచర్ ఫ్లాగ్ నిలిపివేయబడినప్పుడు మాత్రమే అనామకులకు వస్తుంది. ప్రభావవంతమైన ఫ్లాగ్ `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ద్వారా పరిష్కరించబడుతుంది కాబట్టి డాష్బోర్డ్ ఫీచర్ ఫ్లాగ్లు మరియు ఎన్విరాన్మెంట్ వేరియబుల్స్ `/api/v1/*`, `/api/v1beta/*` మరియు మారుపేర్లను స్థిరంగా నియంత్రిస్తాయి; పరిష్కర్త వైఫల్యాలు విఫలమవుతాయి. క్లయింట్ API మార్గాల్లో డాష్బోర్డ్-సెషన్ అభ్యర్థనలను అనుమతిస్తుంది (డ్యాష్బోర్డ్ మోడల్ కేటలాగ్ ద్వారా ఉపయోగించబడుతుంది `/api/v1/models` తో సహా). Entra ID SSO ప్రారంభించబడినప్పుడు, నిర్మాణాత్మకంగా Entra టోకెన్ అయిన బేరర్ (మూడు base64url విభాగాలు, `RS*` alg, `kid`) SSO శాఖ ద్వారా నిర్వహించబడుతుంది.** ముందు** `validateApiKey()` మరియు దాని తీర్పు తుది — ఇది API-కీ మార్గం లేదా అనామక బ్రాంచ్కి దిగజారదు, కాబట్టి గుర్తింపు ప్రదాత అంతరాయం ఓపెన్ యాక్సెస్గా మారదు. స్టాటిక్ API కీలు ప్రభావితం కావు. [ఎంట్రా ID SSO](../security/ENTRA_SSO.md) చూడండి.
- **`managementPolicy`** (`policies/management.ts`) — డాష్బోర్డ్ సెషన్, అంతర్గత మోడల్-సమకాలీకరణ అభ్యర్థనలను ( `/api/providers/[name]/(sync-models|models)` కి వ్యతిరేకంగా సరిపోల్చింది) అంగీకరిస్తుంది లేదా `isAuthRequired()` తప్పు అని తిరిగి ఇస్తే పూర్తిగా దాటవేస్తుంది. బేరర్ టోకెన్ ఉన్నప్పటికీ చెల్లదు, 401 లేకపోతే 403 (`AUTH_001`)ని అందిస్తుంది. ఏదైనా auth బ్రాంచ్ — ముందు రూట్-గార్డ్ టైర్లను (LOCAL_ONLY / ALWAYS_PROTECTED) అమలు చేస్తుంది, [రూట్ గార్డ్ టైర్లను](../security/ROUTE_GUARD_TIERS.md) చూడండి. బేరర్ కీ `manage` స్కోప్ను కలిగి ఉన్నప్పుడు `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (ఈనాడు: `/api/mcp/`)లోని LOCAL_ONLY మార్గాలు నాన్-లూప్బ్యాక్ నుండి యాక్సెస్ చేయబడవచ్చు; స్కోప్తో సంబంధం లేకుండా అన్ని ఇతర LOCAL_ONLY మార్గాలు కఠినమైన-లూప్బ్యాక్గా ఉంటాయి.

విజయవంతమైన పాలసీ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` తో `AuthSubject` ని అందిస్తుంది. డౌన్స్ట్రీమ్ హ్యాండ్లర్లు ప్రామాణీకరణ తర్కాన్ని మళ్లీ అమలు చేయడానికి బదులుగా `src/server/authz/assertAuth.ts` లో `assertAuth(request, "CLIENT_API")` ద్వారా చదవగలరు.

## పబ్లిక్ రూట్ల జాబితా

`src/shared/constants/publicApiRoutes.ts` అనేది స్పష్టమైన అనుమతి జాబితా:

జాబితా విభజించబడింది** ఆకారం** , మరియు స్ప్లిట్ లోడ్-బేరింగ్ (GHSA-74g9-q8f6-793h): ఒక ఉపసర్గ `startsWith()` తో సరిపోలుతుంది, కాబట్టి ఇది దాని ప్రముఖ పాత్రలను పంచుకునే ప్రతి ప్రక్కనే ఉన్న మార్గానికి కూడా సరిపోతుంది. `/api/usage/om-usage` ఉపసర్గగా `/api/usage/om-usage<anything>` PUBLIC గా గుర్తించబడింది మరియు తదుపరిది `/api/usage/[connectionId]` — హ్యాండ్లర్ని దాని స్వంత ప్రమాణీకరణ లేకుండా పరిష్కరిస్తుంది.

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

చదవడానికి మాత్రమే మార్గాలు పబ్లిక్** మాత్రమే** సురక్షితమైన పద్ధతుల కోసం. గమనిక: `classifyRoute()` PUBLIC ఫాల్-త్రూ — నుండి `/api/v1/*` మరియు `/api/v1beta/*` మినహాయించింది, అవి ఎల్లప్పుడూ `CLIENT_API` కాబట్టి బేరర్-కీ విధానం ఇప్పటికీ వర్తిస్తుంది.

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

## ప్రమాణీకరణ టోగుల్ అవసరం

అని `src/shared/utils/apiAuth.ts` లో`isAuthRequired()` నిర్ణయిస్తుంది** ఏదైనా** అభ్యర్థన కోసం auth అమలు చేయబడుతుంది:

- `settings.requireLogin === false` → auth ప్రపంచవ్యాప్తంగా నిలిపివేయబడింది, ఎల్లప్పుడూ-రక్షిత శ్రేణి ( [రూట్ గార్డ్ టైర్లను](../security/ROUTE_GUARD_TIERS.md) చూడండి) మరియు అది అంగీకరించే క్రెడెన్షియల్ను అందజేసే కాల్లు తప్ప, లాగిన్పై ఉన్న అదే క్రెడెన్షియల్ అవసరం: సింక్ టోకెన్లను జారీ చేయడం, `manage` API CLI టోకెన్లను రూపొందించడం, /`admin` స్కోప్తో సృష్టించడం ఒక కీకి ఆ పరిధిని మంజూరు చేయడం లేదా అటువంటి కీని పునరుత్పత్తి చేయడం లేదా బహిర్గతం చేయడం ( `src/lib/api/requireManagementAuth.ts` లో`requireCredentialForManagementScopedKey()` ). అనుమితి-మాత్రమే కీలు తెరిచి ఉంటాయి. రక్షిత ఫీచర్ ఫ్లాగ్ను వ్రాయడం (`REQUIRE_API_KEY`, ఇతర భద్రతా ఫ్లాగ్లు మరియు [ఫీచర్ ఫ్లాగ్లలో](../reference/FEATURE_FLAGS.md#rest-api) జాబితా చేయబడిన SSRF / TLS / MCP-స్కోప్ / శాండ్బాక్స్ ఫ్లాగ్లు) మరియు PII మాస్కింగ్ సెట్టింగ్లను (`PUT /api/settings/pii`) సేవ్ చేయడం కూడా క్రెడెన్షియల్ అవసరం.
- పాస్వర్డ్ కాన్ఫిగర్ చేయబడలేదు** మరియు** `INITIAL_PASSWORD` env var → బూట్స్ట్రాప్ మోడ్ ఆన్బోర్డింగ్ విజార్డ్ మరియు లూప్బ్యాక్ అభ్యర్థనలను అనుమతిస్తుంది, అయితే బహిర్గతమైన నెట్వర్క్ అభ్యర్థనలకు ఇప్పటికీ ఆధారాలు అవసరం. మినహాయింపు: రక్షిత ఫీచర్ ఫ్లాగ్ను వ్రాయడం మరియు PII మాస్కింగ్ సెట్టింగ్లను సేవ్ చేయడం (`PUT /api/settings/pii`) లూప్బ్యాక్ నుండి కూడా క్రెడెన్షియల్ అవసరం, కాబట్టి అక్కడ లూప్బ్యాక్ సరిపోదు.
- ఏదైనా DB లోపం → మూసివేయబడితే విఫలమవుతుంది (సెక్యూర్-బై-డిఫాల్ట్).

క్లయింట్ API కీ ఎన్ఫోర్స్మెంట్ `src/shared/utils/featureFlags.ts` లో `isRequireApiKeyEnabled()` ఉపయోగిస్తుంది, డైరెక్ట్ `process.env.REQUIRE_API_KEY` రీడ్ కాదు. అమలు చేయబడిన ఉదాహరణలకు ఇది ముఖ్యమైనది: డాష్బోర్డ్ → ఫీచర్ ఫ్లాగ్లలో `REQUIRE_API_KEY` టోగుల్ చేయడం DB ఓవర్రైడ్ను నిల్వ చేస్తుంది మరియు వెంటనే `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, మరియు ఈ సహాయ తనిఖీలను భాగస్వామ్యం చేసే ఇతర క్లయింట్-API ప్రమాణీకరణ తనిఖీలను ప్రభావితం చేస్తుంది. ఫీచర్ ఫ్లాగ్ స్టోర్ని చదవలేకపోతే, క్లయింట్ API auth మూసివేయబడితే విఫలమవుతుంది మరియు కీ అవసరం.

## బ్రేకింగ్ మార్పు — v3.8.0

`/api/v1/agents/tasks/*` మరియు `/api/resilience/model-cooldowns` ఎండ్పాయింట్లకు **ఇప్పుడు నిర్వహణ ప్రమాణీకరణ అవసరం** (కమిట్ `588a0333`). గతంలో `manage` స్కోప్ లేని సాధారణ API కీని పంపిన క్లయింట్లు `403`ను అందుకుంటారు. మైగ్రేషన్: API Keys డ్యాష్బోర్డ్లో కీకి `manage` స్కోప్ను కేటాయించండి లేదా లాగిన్ చేసిన డ్యాష్బోర్డ్ సెషన్ను ఉపయోగించండి.

## ప్రవర్తన మార్పు — v3.8.2

`/api/mcp/*` (రిమోట్ MCP సర్వర్) ఇప్పటికీ డిఫాల్ట్గా LOCAL_ONLYగా ఉంటుంది, కానీ `Authorization: Bearer <api-key>` హెడర్లో `manage` స్కోప్ ఉన్నప్పుడు ఇప్పుడు లూప్బ్యాక్ కాని అభ్యర్థనలను అంగీకరిస్తుంది. `src/server/authz/routeGuard.ts`లోని `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ద్వారా ఈ మినహాయింపు ప్రతి పాత్కు స్పష్టంగా నియంత్రించబడుతుంది; సమాన స్థాయి LOCAL_ONLY ప్రిఫిక్స్ `/api/cli-tools/runtime/*` ఏవైనా సబ్ప్రాసెస్లను ప్రారంభించగలదు కాబట్టి, దాన్ని ఉద్దేశపూర్వకంగానే బైపాస్ చేయడం సాధ్యం కాదు. లూప్బ్యాక్ కాని చోట్ల నుండి `/api/mcp/*`కు వచ్చే అనామక అభ్యర్థనలు weiterhin `403 LOCAL_ONLY`ను అందుకుంటాయి — ఏదైనా కొత్త LOCAL_ONLY పాత్కు డిఫాల్ట్గా కఠినమైన లూప్బ్యాక్ నియమమే వర్తిస్తుంది. [రూట్ గార్డ్ స్థాయిలు](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) చూడండి.

## టెస్టింగ్

- యూనిట్ టెస్ట్లు: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- పబ్లిక్ అనుమతి జాబితా: `tests/unit/public-api-routes.test.ts`.
- నిర్దిష్ట టెస్ట్ను అమలు చేయడానికి: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## డీబగ్గింగ్

పైప్లైన్ ఎల్లప్పుడూ దీనితో ప్రతిస్పందనలను స్టాంప్ చేస్తుంది:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ప్రామాణీకరించబడిన అభ్యర్థనల కోసం అప్స్ట్రీమ్ (హ్యాండ్లర్-సైడ్) అభ్యర్థన శీర్షికలు కూడా ఉన్నాయి:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

మిడిల్వేర్ బైపాస్ చేయబడితే (పరీక్షలలో కాన్ఫిగరేషన్ `AUTHZ_NOT_INITIALIZED` క్యాచ్ చేయడంలో సహాయపడుతుంది) హ్యాండ్లర్స్ — లోపల `assertAuth(req, expectedClass)` `AuthzAssertionError`.

## వీటిని కూడా చూడండి

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ప్రతి ఎండ్పాయింట్కు ప్రామాణీకరణ మార్కర్
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ప్రామాణీకరణ ఈవెంట్ల కోసం ఆడిట్ లాగ్
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — మూడు స్కోప్ నేమ్స్పేస్లు మరియు MCP టూల్-స్కోప్ కేటలాగ్
- మూలం: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
