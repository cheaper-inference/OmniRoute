# Authorization Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **నిజానికి మూలం:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **చివరిగా నవీకరించబడింది:** 2026-09-22 — స్కోప్ నేమ్స్పేస్లు MCP-SERVER.mdని సూచిస్తాయి

OmniRoute ప్రతి API అభ్యర్థనను నియంత్రించే రూట్-అవేర్ ఆథరైజేషన్ పైప్లైన్ను కలిగి ఉంది. వర్గీకరణ **నిర్ణయాత్మకమైనది** మరియు **ఫెయిల్-క్లోజ్డ్** — వర్గీకరించబడని ఏదైనా `MANAGEMENT`గా ముగుస్తుంది మరియు సెషన్ లేదా మేనేజ్మెంట్-గ్రేడ్ టోకెన్ను డిమాండ్ చేస్తుంది. ఈ పేజీ రూట్లను నిర్వహించే లేదా కొత్త ఎండ్పాయింట్లను రూపొందించే ఇంజనీర్ల కోసం మోడల్ను వివరిస్తుంది.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> మూలం: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## రెండు Auth మోడ్లు

### 1. API కీ (Bearer)

OpenAI/Anthropic/Gemini-అనుకూలమైన క్లయింట్ APIల కోసం, అలాగే కీకి `manage` స్కోప్ ఉన్నప్పుడు కొన్ని నిర్వహణ రూట్ల కోసం ఉపయోగించబడుతుంది.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`లోని `isValidApiKey()` / `extractApiKey()` ద్వారా ధృవీకరించబడుతుంది మరియు `src/shared/utils/apiAuth.ts` ద్వారా మళ్లీ ఎక్స్పోర్ట్ చేయబడుతుంది. వాలిడేటర్ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ఎన్విరాన్మెంట్ వేరియబుల్లను శాశ్వత పాస్త్రూ కీలుగా కూడా అంగీకరిస్తుంది (సమస్య #1350).

### 2. డ్యాష్బోర్డ్ సెషన్ (auth_token కుకీ)

డ్యాష్బోర్డ్ పేజీలు మరియు అడ్మిన్ కార్యకలాపాల కోసం.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ధృవీకరించబడి, **అదే సమయంలో** `authenticated: true` కలిగి ఉన్నప్పుడు మాత్రమే కుకీ ఒక సెషన్ అవుతుంది
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). కుకీని ఉపయోగించే ప్రతి
భాగం (డ్యాష్బోర్డ్ రూట్ గార్డ్ (`isDashboardSessionAuthenticated()`), authz పైప్లైన్ రిఫ్రెష్, WebSocket హ్యాండ్షేక్, లైవ్
సర్వర్, `/api/settings/require-login`, `/api/auth/status`) ఆ హెల్పర్ ద్వారానే వెళ్తుంది.
`JWT_SECRET`తో సైన్ చేయబడిన ఇతర JWTలు కూడా ఉన్నాయి — Cursor CLI పాస్త్రూ, కీ హోల్డర్ల కోసం
`iss "omniroute" / aud "cursor-cli"` టోకెన్లను జారీ చేస్తుంది — కానీ అవి ఎప్పటికీ సెషన్లుగా పరిగణించబడవు
(#13298).

`src/shared/utils/apiAuth.ts`లోని `isDashboardSessionAuthenticated()` ద్వారా ధృవీకరించబడుతుంది. JWT యొక్క 30 రోజుల జీవితకాలంలో 7 రోజుల కంటే తక్కువ సమయం మిగిలి ఉన్నప్పుడు పైప్లైన్ దాన్ని స్వయంచాలకంగా రిఫ్రెష్ చేస్తుంది.

ప్రతి టోకెన్ జారీదారు `mintDashboardSessionToken` ద్వారా వెళ్లడం వల్ల (జారీ సమయం `iat` మరియు ID `jti`తో), అలాగే వెరిఫైయర్ రెండు సెట్టింగ్లను తనిఖీ చేయడం వల్ల, సెషన్ దాని 30 రోజులు పూర్తికాకముందే ముగియవచ్చు: `sessionsValidAfter` అనేది పాస్వర్డ్ మార్పు సమయంలో సెట్ చేయబడుతుంది, తద్వారా దానికి ముందు జారీ చేసిన ప్రతి సెషన్ ధృవీకరణ ఆగిపోతుంది (పాస్వర్డ్ను మార్చిన బ్రౌజర్కు తాజా కుకీ లభిస్తుంది); అలాగే `revokedDashboardSessions`కు `POST /api/auth/logout`, సైన్-అవుట్ చేసిన సెషన్ యొక్క `jti`ని జోడిస్తుంది. పాత విడుదల ద్వారా జారీ చేయబడిన సెషన్లలో ఈ రెండు క్లెయిమ్లలో ఏదీ ఉండదు, కాబట్టి మొదటి పాస్వర్డ్ మార్పు వరకు అవి చెల్లుబాటులో ఉంటాయి. సెట్టింగ్లను చదవలేకపోతే, సెషన్ విశ్వసించబడదు.

కొన్ని నిర్వహణ రూట్లు **ఏదో ఒక** మోడ్ను అంగీకరిస్తాయి: కుకీ లేదా API కీకి `manage` (లేదా `admin`) స్కోప్ ఉన్నప్పుడు `Bearer <key>`. v3.8లో జోడించిన "API కాల్ల ద్వారా కాన్ఫిగర్ చేయగల" వర్క్ఫ్లోను ఇదే సాధ్యం చేస్తుంది.

#### ఐచ్ఛిక OIDC లాగిన్ గేట్ (#6973)

డిఫాల్ట్ పాస్వర్డ్ లాగిన్తో పాటు డ్యాష్బోర్డ్ అడ్మిన్ లాగిన్ ఒక **ఆప్ట్-ఇన్** OIDC (OpenID Connect) ఫ్లోకు కూడా మద్దతు ఇస్తుంది — పాస్వర్డ్ లాగిన్ ఎప్పటికీ తొలగించబడదు, దానికి అదనంగా మాత్రమే ఇది అందించబడుతుంది:

- `settings.oidcEnabled === true` **మరియు** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` అన్నీ కాన్ఫిగర్ చేయబడితే తప్ప ఇది నిలిపివేయబడి ఉంటుంది (సెట్టింగ్లు → ప్రామాణీకరణ).
  లేకపోతే `GET /api/auth/oidc/login` `400`ను తిరిగి ఇస్తుంది.
- `GET /api/auth/oidc/login`, ఇష్యువర్ యొక్క
  `/.well-known/openid-configuration` నుండి `authorization_endpoint`ను కనుగొంటుంది (`<issuer>/authorize`ను
  ప్రత్యామ్నాయంగా ఉపయోగిస్తుంది), ఇన్కమింగ్ అభ్యర్థన నుండి రీడైరెక్ట్ URIని
  (`x-forwarded-proto`ను పరిగణనలోకి తీసుకుంటూ) నిర్మిస్తుంది మరియు `httpOnly`
  `oidc_state` కుకీలో నిల్వ చేసిన యాదృచ్ఛిక `state`తో IdPకి రీడైరెక్ట్ చేస్తుంది.
- `GET /api/auth/oidc/callback`, `state`ను ధ్రువీకరిస్తుంది, ఆథరైజేషన్
  కోడ్ను మార్పిడి చేస్తుంది మరియు ఇష్యువర్ యొక్క JWKS ద్వారా ID టోకెన్ సంతకాన్ని
  (`jose` యొక్క `createRemoteJWKSet`, ప్రతి JWKS URIకి కాష్ చేయబడుతుంది)
  `issuer`/`audience` తనిఖీలతో ధ్రువీకరిస్తుంది. డ్యాష్బోర్డ్ ప్రవేశానికి ఖాళీ కాని
  `oidcAllowedSubjects` జాబితా, ఒక `oidcAdmissionClaim` విధానం లేదా రెండూ అవసరం.
  సబ్జెక్ట్ జాబితా, `email_verified === true` అయినప్పుడు మాత్రమే `sub` లేదా
  `email`తో సరిపోలుతుంది. ఐచ్ఛిక క్లెయిమ్ విధానం చుక్కలతో వేరు చేసిన ID-టోకెన్ క్లెయిమ్
  పాత్ను (ఉదాహరణకు, `realm_access.roles`) మరియు ఆమోదిత విలువల అర్రేను తీసుకుంటుంది;
  పరిష్కరించబడిన క్లెయిమ్ తప్పనిసరిగా కనీసం ఒక ఆమోదిత విలువను కలిగిన స్ట్రింగ్ల అర్రేగా
  ఉండాలి. రెండు విధానాలు కాన్ఫిగర్ చేయబడితే, రెండూ తప్పనిసరిగా ఉత్తీర్ణం కావాలి.
  లేని/తప్పుగా రూపొందించిన క్లెయిమ్లు సురక్షితంగా తిరస్కరించబడతాయి; ఏ విధానమూ
  లేకపోతే కాల్బ్యాక్ లాగిన్ను తిరస్కరిస్తుంది (`not_configured`). ఇప్పటికే ఉన్న
  సబ్జెక్ట్-మాత్రమే కాన్ఫిగరేషన్లు ఎటువంటి మార్పు లేకుండా కొనసాగుతాయి.
- Keycloak సాధారణంగా రియల్మ్ పాత్రలను యాక్సెస్ టోకెన్లలో మ్యాప్ చేస్తుంది, తప్పనిసరిగా
  ID టోకెన్లలో కాదు. `admin` రియల్మ్ పాత్రను తప్పనిసరి చేయడానికి, ఈ క్లయింట్ కోసం
  దాని **ID టోకెన్**లో `realm_access.roles`ను చేర్చే ప్రోటోకాల్ మ్యాపర్ను కాన్ఫిగర్ చేసి,
  ఆపై `oidcAdmissionClaim`ను `{ "path": "realm_access.roles", "values": ["admin"] }`గా సెట్ చేయండి.
  పాత్ర-మాత్రమే ప్రవేశాన్ని ప్రారంభించే ముందు ఈ క్లయింట్కు సంబంధించిన అసలు ID-టోకెన్
  క్లెయిమ్ను తనిఖీ చేయండి; అప్లికేషన్ యాక్సెస్-టోకెన్ పాత్రలను చదవదు. IdP వైపు టోకెన్
  తిరస్కరణ ఈ అప్లికేషన్-వైపు తనిఖీకి అదనంగా ఉపయోగపడగలదు, కానీ దానిని భర్తీ చేయదు.
- విజయవంతమైతే, పాస్వర్డ్ లాగిన్ జారీ చేసే **సరిగ్గా అదే** 30-రోజుల `auth_token`
  JWTని (`src/app/api/auth/login/route.ts`) ఇది సృష్టిస్తుంది; అందువల్ల మిగతా
  డ్యాష్బోర్డ్ సెషన్ పైప్లైన్ (ఆటో-రిఫ్రెష్, కుకీ ఫ్లాగ్లు) మారదు —
  OIDC కుకీ ఎలా సృష్టించబడుతుందో మాత్రమే భర్తీ చేస్తుంది, అది ఏ అనుమతులు ఇస్తుందో కాదు.
  IdP పాత్రలు/గ్రూప్లలో మార్పులు ఇప్పటికే ఉన్న OmniRoute సెషన్లను చెల్లనివిగా చేయవు;
  లాగౌట్, పాస్వర్డ్ రొటేషన్ లేదా సెషన్ గడువు ముగియడం ఇప్పటికీ వాటి జీవితకాలాన్ని
  నియంత్రిస్తాయి.
- ప్రతి `oidc*` సెట్టింగ్ (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`లో
  (`src/shared/constants/securityImpactingSettings.ts`) ఉంటుంది: బాడీలో నిర్వహణ
  పాస్వర్డ్ను `currentPassword`గా పంపితే తప్ప `PATCH /api/settings`
  `400 PASSWORD_REQUIRED`తో స్పందిస్తుంది (అది తప్పుగా ఉన్నప్పుడు `401 PASSWORD_MISMATCH`).
  `oidcDisablePasswordLogin`, పాస్వర్డ్ _లాగిన్_ను (`POST /api/auth/login`)
  తిరస్కరిస్తుంది, కానీ నిల్వ చేసిన పాస్వర్డ్ హాష్ను అలాగే ఉంచుతుంది; పునః-ప్రామాణీకరణ
  ఇప్పటికీ `currentPassword`ను దానితో పోల్చి తనిఖీ చేస్తుంది.
- `corsOrigins` మరియు `bruteForceProtection` కూడా `SECURITY_IMPACTING_SETTINGS_KEYS`లో
  ఉన్నాయి: వీటిలో దేనినైనా సడలించడం లాగిన్ రక్షణలను బలహీనపరుస్తుంది, కాబట్టి వాటికి
  అదే `currentPassword` పునః-ప్రామాణీకరణ అవసరం (Security ట్యాబ్ దానిని అడుగుతుంది)
  మరియు JSON దిగుమతి వాటిని తొలగిస్తుంది.
- ప్రతి భద్రతా-విధాన కీ — `SECURITY_IMPACTING_SETTINGS_KEYS` ఎంట్రీలు,
  ప్రతి `oidc*` కీ మరియు డ్యాష్బోర్డ్ సెషన్ స్థితి — `PATCH /api/settings`లో
  **ఆపరేటర్కు-మాత్రమే** పరిమితం: నిర్వహణ స్కోప్ ఉన్న API కీ లేదా `oma_` యాక్సెస్
  టోకెన్ సరైన `currentPassword`ను పంపినప్పటికీ `403`తో తిరస్కరించబడుతుంది; ఆ తిరస్కరణ
  `reason: OPERATOR_REQUIRED`తో `settings.update_failed`గా ఆడిట్ చేయబడుతుంది
  (`src/lib/api/operatorCredential.ts`లోని `requireOperatorCredential()`).
  సాధారణ సెట్టింగ్లు (థీమ్, ప్రదర్శన ప్రాధాన్యతలు) `manage` కీ లేదా `admin` యాక్సెస్
  టోకెన్తో వ్రాయదగినవిగానే ఉంటాయి. `/api/settings`లోని ప్రతి మార్పుకు (అలాగే
  `/api/settings/require-login`లోని ప్రతి మార్పుకు) `admin` యాక్సెస్-టోకెన్ స్కోప్
  కూడా అవసరం (`src/server/authz/accessScopes.ts`లోని `ADMIN_MUTATION_EXACT_PATHS`,
  ఖచ్చితమైన-పాత్ సరిపోలిక); `GET`కు `read`గానే ఉంటుంది మరియు ఇతర `/api/settings/*`
  ఉప-రూట్లు (ప్రాక్సీలు, కాంబో డిఫాల్ట్లు, మోడల్ అలియాస్లు, కంప్రెషన్, పర్జ్లు…)
  మెథడ్ నుండి నిర్ధారించబడిన `write` స్కోప్ను కొనసాగిస్తాయి.
- `POST /api/settings/import-json` ఆ పునః-ప్రామాణీకరణను దాటవేస్తుంది, కాబట్టి వ్రాయడానికి
  ముందు `IMPORT_STRIPPED_SETTINGS_KEYS`లోని (అదే ఫైల్) ప్రతి కీని తొలగిస్తుంది:
  పాస్వర్డ్ మరియు `currentPassword`, ప్రతి `SECURITY_IMPACTING_SETTINGS_KEYS` ఎంట్రీ,
  అలాగే డ్యాష్బోర్డ్ సెషన్ స్థితి (`sessionsValidAfter`, `revokedDashboardSessions`).
  అందువల్ల పాత బ్యాకప్ను దిగుమతి చేయడం ద్వారా పాస్వర్డ్ మార్పు లేదా సైన్-అవుట్ ఇప్పటికే
  ముగించిన సెషన్ను తిరిగి సక్రియం చేయడం సాధ్యం కాదు.

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
