# Authorization Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **सत्यको स्रोत:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **अन्तिम पटक अद्यावधिक गरिएको:** 2026-09-22 — स्कोप नेमस्पेसहरूले MCP-SERVER.md लाई संकेत गर्दछ

ओम्नीराउटसँग रुट-सचेत प्राधिकरण पाइपलाइन छ जसले प्रत्येक API अनुरोधलाई नियन्त्रण गर्दछ। वर्गीकरण **निर्धारित** र **फेल-क्लोज्ड** हुन्छ — वर्गीकरण गर्न नसकिने कुनै पनि कुरा `MANAGEMENT` को रूपमा समाप्त हुन्छ र सत्र वा व्यवस्थापन-ग्रेड टोकनको माग गर्दछ। यो पृष्ठले रुटहरू मर्मत गर्ने वा नयाँ एन्डपोइन्टहरू डिजाइन गर्ने इन्जिनियरहरूका लागि मोडेलको व्याख्या गर्दछ।

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> स्रोत: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## प्रमाणीकरणका दुई मोड

### 1. API कुञ्जी (Bearer)

OpenAI/Anthropic/Gemini-सँग मिल्दो client APIs र key मा `manage` scope हुँदा केही व्यवस्थापन route हरूका लागि प्रयोग गरिन्छ।

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` मा रहेका `isValidApiKey()` / `extractApiKey()` द्वारा प्रमाणीकरण गरिन्छ र `src/shared/utils/apiAuth.ts` मार्फत पुनः export गरिएको छ। Validator ले persistent passthrough key का रूपमा `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars पनि स्वीकार गर्छ (issue #1350)।

### 2. ड्यासबोर्ड सत्र (auth_token cookie)

ड्यासबोर्ड पृष्ठहरू र admin operations का लागि।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ले प्रमाणीकरण सफलतापूर्वक पूरा गरेको **र** `authenticated: true` बोकेको अवस्थामा मात्र cookie सत्र हुन्छ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। Cookie प्रयोग गर्ने प्रत्येक consumer (dashboard route guard (`isDashboardSessionAuthenticated()`), authz pipeline refresh, WebSocket handshake, live
server, `/api/settings/require-login`, `/api/auth/status`) यही helper मार्फत जान्छ।
`JWT_SECRET` द्वारा signed गरिएका अन्य JWT हरू पनि हुन्छन् — key holders का लागि Cursor CLI passthrough ले
`iss "omniroute" / aud "cursor-cli"` token mint गर्छ — र ती कहिल्यै सत्र हुँदैनन्
(#13298)।

`src/shared/utils/apiAuth.ts` मा रहेको `isDashboardSessionAuthenticated()` द्वारा प्रमाणीकरण गरिन्छ। 30-दिने lifetime मा 7 दिनभन्दा कम समय बाँकी हुँदा pipeline ले JWT लाई स्वतः refresh गर्छ।

सत्रको 30 दिन पूरा हुनुअघि पनि समाप्त हुन सक्छ, किनकि प्रत्येक minter `mintDashboardSessionToken` मार्फत जान्छ (issue time `iat` र id `jti` सहित) र verifier ले दुईवटा setting जाँच गर्छ: `sessionsValidAfter`, जुन password परिवर्तनद्वारा सेट गरिन्छ ताकि त्यसअघि जारी भएका प्रत्येक सत्रले प्रमाणीकरण गर्न बन्द गरोस् (password परिवर्तन गरेको browser ले नयाँ cookie पाउँछ), र `revokedDashboardSessions`, जसमा `POST /api/auth/logout` ले sign out गरिएको सत्रको `jti` थप्छ। पुरानो release द्वारा mint गरिएका सत्रहरूमा यीमध्ये कुनै पनि claim हुँदैन र पहिलो password परिवर्तन नभएसम्म मान्य रहन्छन्। यदि settings पढ्न सकिएन भने सत्रलाई विश्वसनीय मानिँदैन।

केही management route हरूले **कुनै एक** मोड स्वीकार गर्छन्: cookie वा API key मा `manage` (वा `admin`) scope हुँदा `Bearer <key>`। v3.8 मा थपिएको "configurable via API calls" workflow सम्भव बनाउने यही व्यवस्था हो।

#### वैकल्पिक OIDC login gate (#6973)

ड्यासबोर्ड admin login ले default password login सँगै **opt-in** OIDC (OpenID Connect) flow पनि समर्थन गर्छ
— password login कहिल्यै हटाइँदैन, केवल
पूरक रूपमा थपिन्छ:

- `settings.oidcEnabled === true` **र** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` सबै कन्फिगर गरिएको अवस्थामा मात्र सक्षम हुन्छ (सेटिङहरू → प्रमाणीकरण)।
  अन्यथा `GET /api/auth/oidc/login` ले `400` फर्काउँछ।
- `GET /api/auth/oidc/login` ले issuer को
  `/.well-known/openid-configuration` बाट `authorization_endpoint` पत्ता लगाउँछ
  (नभेटिएमा `<issuer>/authorize` मा फर्किन्छ), आगमन अनुरोधबाट रिडाइरेक्ट URI
  बनाउँछ (`x-forwarded-proto` लाई ध्यानमा राख्दै), र `httpOnly` `oidc_state`
  कुकीमा भण्डारण गरिएको अनियमित `state` सहित IdP मा रिडाइरेक्ट गर्छ।
- `GET /api/auth/oidc/callback` ले `state` प्रमाणित गर्छ, authorization
  code साट्छ, र issuer को JWKS मार्फत ID token को हस्ताक्षर प्रमाणित गर्छ
  (`jose` को `createRemoteJWKSet`, JWKS URI अनुसार क्यास गरिएको), साथै
  `issuer`/`audience` जाँच गर्छ। ड्यासबोर्डमा प्रवेशका लागि गैर-रिक्त
  `oidcAllowedSubjects` सूची, `oidcAdmissionClaim` नीति, वा दुवै आवश्यक हुन्छ।
  विषय सूचीले `sub` वा `email` सँग त्यतिबेला मात्र मिलान गर्छ जब
  `email_verified === true` हुन्छ। वैकल्पिक claim नीतिले डटले छुट्याइएको
  ID-token claim path (उदाहरणका लागि, `realm_access.roles`) र स्वीकार्य
  मानहरूको array लिन्छ; resolve गरिएको claim strings को array हुनुपर्छ र
  त्यसमा कम्तीमा एउटा स्वीकार्य मान समावेश हुनुपर्छ। दुवै नीति कन्फिगर गरिएको
  अवस्थामा दुवै सफल हुनुपर्छ। हराइरहेका वा गलत ढाँचाका claims ले सुरक्षित
  रूपमा असफल हुन्छन्, र कुनै पनि नीति नभए callback ले login अस्वीकार गर्छ
  (`not_configured`)। विद्यमान subject-only कन्फिगरेसनहरू अपरिवर्तित रूपमा
  जारी रहन्छन्।
- Keycloak ले सामान्यतया realm roles लाई access tokens मा map गर्छ, ID tokens
  मा अनिवार्य रूपमा होइन। realm role `admin` आवश्यक बनाउन, यो client का लागि
  `realm_access.roles` लाई यसको **ID token** मा समावेश गर्ने protocol mapper
  कन्फिगर गर्नुहोस्, त्यसपछि `oidcAdmissionClaim` लाई
  `{ "path": "realm_access.roles", "values": ["admin"] }` मा सेट गर्नुहोस्।
  role-only admission सक्षम गर्नुअघि यस client का लागि वास्तविक ID-token claim
  जाँच गर्नुहोस्; अनुप्रयोगले access-token roles पढ्दैन। IdP-पक्षको token
  refusal ले यस अनुप्रयोग-पक्षको जाँचलाई थप सहयोग गर्न सक्छ, तर यसको स्थान
  लिन सक्दैन।
- सफलतामा यसले password login ले जारी गर्ने **ठ्याक्कै उही** ३०-दिने
  `auth_token` JWT mint गर्छ (`src/app/api/auth/login/route.ts`), त्यसैले
  ड्यासबोर्ड session pipeline को बाँकी भाग (auto-refresh, cookie flags)
  अपरिवर्तित रहन्छ — OIDC ले cookie कसरी mint हुन्छ भन्ने मात्र बदल्छ,
  यसले cookie ले दिने अधिकार बदल्दैन। IdP roles/groups मा भएका परिवर्तनहरूले
  विद्यमान OmniRoute sessions अमान्य बनाउँदैनन्; logout, password rotation,
  वा session expiry ले अझै तिनको अवधि निर्धारण गर्छ।
- प्रत्येक `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) मा समावेश छ:
  `PATCH /api/settings` ले body मा management password
  `currentPassword` का रूपमा नआएसम्म `400 PASSWORD_REQUIRED` फर्काउँछ
  (गलत भएमा `401 PASSWORD_MISMATCH`)। `oidcDisablePasswordLogin` ले
  password _login_ (`POST /api/auth/login`) अस्वीकार गर्छ, तर भण्डारण गरिएको
  password hash राखिरहन्छ, र पुनःप्रमाणीकरणले अझै `currentPassword` लाई
  त्यससँग जाँच गर्छ।
- `corsOrigins` र `bruteForceProtection` पनि `SECURITY_IMPACTING_SETTINGS_KEYS`
  मा छन्: दुवैलाई खुकुलो बनाउँदा login सुरक्षा कमजोर हुने भएकाले, तिनले उही
  `currentPassword` पुनःप्रमाणीकरण माग्छन् (Security tab ले यो माग्छ) र JSON
  import ले तिनलाई हटाउँछ।
- प्रत्येक security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS` का
  entries, प्रत्येक `oidc*` key र ड्यासबोर्ड session state — `PATCH /api/settings`
  मा **operator-only** हुन्छ: manage-scoped API key वा `oma_` access token लाई
  सही `currentPassword` पठाए पनि `403` सहित अस्वीकार गरिन्छ, र यो अस्वीकार
  `settings.update_failed` का रूपमा `reason: OPERATOR_REQUIRED` सहित audit
  गरिन्छ (`src/lib/api/operatorCredential.ts` मा
  `requireOperatorCredential()`)। सामान्य settings (theme, display
  preferences) भने `manage` key वा `admin` access token का लागि लेख्न योग्य
  रहन्छन्। `/api/settings` स्वयं (र `/api/settings/require-login`) मा हुने
  प्रत्येक mutation का लागि `admin` access-token scope पनि आवश्यक हुन्छ
  (`src/server/authz/accessScopes.ts` मा `ADMIN_MUTATION_EXACT_PATHS`,
  exact-path match); `GET` मा `read` नै रहन्छ, र अन्य
  `/api/settings/*` sub-routes (proxies, combo defaults, model aliases,
  compression, purges…) ले method-inferred `write` scope नै कायम राख्छन्।
- `POST /api/settings/import-json` ले उक्त पुनःप्रमाणीकरण छोड्छ, त्यसैले
  लेख्नुअघि `IMPORT_STRIPPED_SETTINGS_KEYS` (उही file) मा भएका सबै key हटाउँछ:
  password र `currentPassword`, `SECURITY_IMPACTING_SETTINGS_KEYS` का प्रत्येक
  entry, र ड्यासबोर्ड session state (`sessionsValidAfter`,
  `revokedDashboardSessions`)। त्यसैले पुरानो backup import गर्दा password
  परिवर्तन वा sign-out ले अन्त्य गरिसकेको session पुनर्जीवित हुन सक्दैन।

#### वैकल्पिक TOTP दुई-कारक login (#16619)

Settings → Security बाट enroll गरिन्छ; operator ले यसलाई सक्षम नगरेसम्म
बन्द हुन्छ (`src/server/auth/dashboardMfa.ts`)।

- **यसले के समेट्छ:** पासवर्ड लगइन (`POST /api/auth/login`, जसपछि
  `POST /api/auth/mfa/verify` आवश्यक हुन्छ) र `omniroute connect` (`POST /api/cli/connect`,
  जसले पासवर्ड मात्र भएको आदानप्रदान अस्वीकार गर्छ र कोडलाई `totp` का रूपमा लिन्छ)।
- **यसले के समेट्दैन:** OIDC / SSO साइन-इन (`/api/auth/oidc/callback`) ले
  OmniRoute TOTP माग्दैन। यो पहिचान प्रदायकको आफ्नै दोस्रो कारकमा निर्भर हुन्छ,
  त्यसैले OIDC सक्षम गरिएको छ भने IdP मा MFA लागू गर्नुहोस्।
- **पुनर्प्राप्ति** (यन्त्र हराएको, कुनै रिकभरी कोड बाँकी नभएको, वा कुनै कारक
  प्रमाणित गर्न नसकिने भएको अवस्थामा, उदाहरणका लागि `STORAGE_ENCRYPTION_KEY` परिवर्तन
  भएपछि):
  1. `OMNIROUTE_DISABLE_MFA=true` सहित सर्भर पुनः सुरु गर्नुहोस्।
  2. होस्टमै (लूपब्याक पियर र लूपब्याक `Host`, जस्तै
     `http://localhost:20128`) पासवर्ड प्रयोग गरेर साइन इन गर्नुहोस्। दोस्रो कारक
     केवल त्यस मूलका लागि छोडिन्छ; अन्य सबै मूलहरूमा अझै कोड आवश्यक हुन्छ।
  3. सेटिङहरू → सुरक्षा → असक्षममा गएर पासवर्ड प्रविष्ट गर्नुहोस् र कोड खाली
     छोड्नुहोस्। `POST /api/auth/mfa/disable` ले चर सेट गरिएको र अनुरोध होस्टबाट
     आएको अवस्थामा मात्र `code` बिनाको बडी स्वीकार गर्छ; यसका लागि अझै
     ड्यासबोर्ड सत्र र हालको पासवर्ड आवश्यक हुन्छ, र यसलाई
     `auth.mfa.disabled` का रूपमा `secondFactor: "recovery_switch"` सहित अडिट गरिन्छ।
  4. `OMNIROUTE_DISABLE_MFA` अनसेट गर्नुहोस्, पुनः सुरु गर्नुहोस्, र आवश्यक भएमा
     फेरि नामाङ्कन गर्नुहोस्।

## Route वर्गहरू

`src/server/authz/types.ts` ले तीन वर्ग परिभाषित गर्छ; निर्धारणात्मक रूपमा वर्गीकरण गर्न नसकिने कुनै पनि route `MANAGEMENT` मा फर्कन्छ।

| वर्ग         | विवरण                                                                                                                                              | आवश्यक प्रमाणीकरण                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PUBLIC`     | स्पष्ट रूपमा सुरक्षित routes — लगइन, लगआउट, status, init, health, onboarding bootstrap।                                                            | कुनै होइन                                                        |
| `CLIENT_API` | मोडेल-सेवा endpoints — `/api/v1/*`, `/api/v1beta/*`, साथै उपनामहरू `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | प्रभावकारी `REQUIRE_API_KEY` feature flag सक्षम हुँदा Bearer key |
| `MANAGEMENT` | ड्यासबोर्ड पृष्ठहरू, settings, providers, keys, admin र diagnostics endpoints।                                                                     | ड्यासबोर्ड सत्र वा `manage` scope भएको Bearer                    |

केही `MANAGEMENT` कार्यहरू **operator-only** हुन्: `manage` key पर्याप्त हुँदैन। भण्डारण गरिएका credentials निर्यात (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), live data माथि backup पुनर्स्थापना (`POST /api/db-backups/import` जसमा `dryRun=true` पनि समावेश छ, `POST /api/db-backups` id द्वारा पुनर्स्थापना, `POST /api/settings/import-json`), र restore points नष्ट गर्ने (`DELETE /api/db-backups` cleanup, र `PATCH /api/db-backups` किनभने यसले सुरक्षित गर्ने retention ले हरेक backup पछिको स्वचालित pruning चलाउँछ) — ले ड्यासबोर्ड सत्र, स्थानीय CLI subject, वा लगइन असक्षम हुनु आवश्यक छ। Sync token जारी गर्ने (`POST /api/sync/tokens`) र `admin` CLI access token बनाउने (`POST /api/cli/tokens`) ले हरेक login मोडमा ड्यासबोर्ड सत्र वा स्थानीय CLI subject चाहिन्छ। कुनै पनि scope का API keys र `oma_` access tokens operator credentials होइनन्: आवश्यक हुँदा तिनीहरूले `403` पाउँछन्। यो जाँच `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) मा छ। लगइन सेटिङ परिवर्तन गर्नु पनि operator-only हो: `POST /api/settings/require-login` (management पासवर्ड सेट गर्ने / `requireLogin` टगल गर्ने) ले पासवर्ड अस्तित्वमा आएपछि मात्र ती credentials स्वीकार गर्छ — पहिलो-रन bootstrap विन्डो (अझै पासवर्ड नभएको) अपरिवर्तित छ — र ड्यासबोर्ड सत्रले पासवर्ड बदल्न `currentPassword` पठाउनुपर्छ (नभए वा गलत भए `403`, `settings.update_failed` मा audit हुन्छ)। स्थानीय CLI र लगइन असक्षम भएको instance ले recovery मार्ग कायम राख्छन् र त्यसमा त्यो नपठाई पासवर्ड सेट गर्न सक्छन्, किनभने दुवै डेटा डाइरेक्टरी रहेको होस्टसँग बाँधिएका छन्।

## पाइपलाइन

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

विश्वसनीय आन्तरिक हेडरहरू ( `src/server/authz/headers.ts` मा परिभाषित) हुन्** आगमन अनुरोधहरूबाट हटाइयो** वर्गीकरण अघि — क्लाइन्टहरूले विषयको प्रतिरूपण गर्न `x-omniroute-auth-*` प्रि-पोपुलेट गर्न सक्दैनन्।

### नीति सम्झौताहरू

प्रत्येक रुट क्लासको `src/server/authz/policies/` मा नीति छ:

- **`publicPolicy`** (`policies/public.ts`) — सधैं `allow({ kind: "anonymous", id: "anonymous" })` फर्काउँछ।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — बेयरर निकाल्छ, `validateApiKey()` मार्फत मान्य हुन्छ। जब प्रभावकारी `REQUIRE_API_KEY` सुविधा झण्डा असक्षम हुन्छ तब मात्र अज्ञातमा जान्छ। प्रभावकारी झण्डा `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) मार्फत समाधान गरिएको छ त्यसैले ड्यासबोर्ड फिचर फ्ल्यागहरू र वातावरण चरहरूले `/api/v1/*`, `/api/v1beta/*` र उपनामहरूलाई निरन्तर रूपमा शासन गर्दछ; समाधानकर्ता विफलताहरू असफल बन्द। ग्राहक API मार्गहरूमा ड्यासबोर्ड-सत्र अनुरोधहरूलाई अनुमति दिन्छ ( `/api/v1/models` सहित, ड्यासबोर्ड मोडेल क्याटलगद्वारा प्रयोग गरिएको)। जब Entra ID SSO सक्षम हुन्छ, संरचनात्मक रूपमा Entra टोकन (तीन base64url खण्डहरू, `RS*` alg, `kid`) को वाहक SSO शाखाद्वारा ह्यान्डल गरिन्छ।** अघि** `validateApiKey()` र यसको निर्णय अन्तिम — हो यो कहिले पनि एपीआई-कुञ्जी मार्ग वा डिग्रेड-टु-अनाम शाखामा जाँदैन, त्यसैले पहिचान-प्रदायक आउटेज खुला पहुँच हुन सक्दैन। स्थिर API कुञ्जीहरू अप्रभावित छन्। [Entra ID SSO](../security/ENTRA_SSO.md) ।
- **`managementPolicy`** (`policies/management.ts`) — ड्यासबोर्ड सत्र, आन्तरिक मोडेल-सिंक अनुरोधहरू स्वीकार गर्दछ ( `/api/providers/[name]/(sync-models|models)` सँग मेल खान्छ), वा यदि `isAuthRequired()` गलत फर्काउँछ भने पूर्ण रूपमा छोड्छ। 403 (`AUTH_001`) फर्काउँछ जब एक बेयरर टोकन उपस्थित छ तर अमान्य छ, अन्यथा 401। रुट गार्ड टियरहरू (LOCAL_ONLY / ALWAYS_PROTECTED) लाई पनि लागू गर्दछ जुन कुनै पनि प्रमाणीकरण शाखा — [रुट गार्ड टियरहरू](../security/ROUTE_GUARD_TIERS.md) हेर्नुहोस्। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (आज: `/api/mcp/`) मा LOCAL_ONLY पथहरू गैर-लूपब्याकबाट पहुँच गर्न सकिन्छ जब Bearer कुञ्जीले `manage` स्कोप बोक्छ; अन्य सबै LOCAL_ONLY मार्गहरू स्कोपको पर्वाह नगरी कडा-लूपब्याक रहन्छन्।

सफल नीतिले `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` सँग `AuthSubject` फर्काउँछ। डाउनस्ट्रीम ह्यान्डलरहरूले यसलाई पुन: चलाउने प्रमाणीकरण तर्कको सट्टा `src/server/authz/assertAuth.ts` मा `assertAuth(request, "CLIENT_API")` मार्फत पढ्न सक्छन्।

## सार्वजनिक रुटहरूको सूची

`src/shared/constants/publicApiRoutes.ts` स्पष्ट अनुमति सूची हो:

सूचीलाई **आकार** अनुसार विभाजन गरिएको छ, र यो विभाजन अत्यन्त महत्त्वपूर्ण छ (GHSA-74g9-q8f6-793h): प्रिफिक्सलाई
`startsWith()` मार्फत मिलाइन्छ, त्यसैले यसले सुरुका अक्षरहरू साझा गर्ने प्रत्येक छेउछाउको पथलाई पनि मिलाउँछ।
`/api/usage/om-usage` लाई `/api/usage/om-usage<anything>` PUBLIC का रूपमा चिनाइएको प्रिफिक्स भएकाले, र Next ले
यसलाई `/api/usage/[connectionId]` मा समाधान गर्छ — आफ्नै प्रमाणीकरण नभएको ह्यान्डलर।

```ts
// वास्तविक सबट्रीहरू। प्रत्येक प्रविष्टि "/" मा अन्त्य हुनैपर्छ (युनिट टेस्टद्वारा पुष्टि गरिएको)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify मा CLIENT_API का रूपमा व्यवहार गरिन्छ, "no-auth public" का रूपमा होइन
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// एकल रुटहरू, ट्रेलिङ स्ल्यास भए वा नभए पनि EXACT रूपमा मिलाइन्छ।
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP का लागि लगइन चरण २; MFA-pending cookie आवश्यक हुन्छ
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS origin relaxation पनि लागू हुने, पढ्न-मात्रका एकल रुटहरू।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS relaxation बिना पढ्न-मात्रको एकल रुट।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

पढ्न-मात्रका रुटहरू सुरक्षित मेथडहरूका लागि मात्र सार्वजनिक हुन्छन्। ध्यान दिनुहोस्: `classifyRoute()` ले PUBLIC fall-through बाट `/api/v1/*` र `/api/v1beta/*` लाई हटाउँछ — ती सधैँ `CLIENT_API` हुन्छन्, त्यसैले Bearer-key नीति लागू भइरहन्छ।

## नयाँ रुट थप्ने

### ढाँचा 1 — सार्वजनिक client API endpoint (Bearer-auth)

`/api/v1/` र `/api/v1beta/` अन्तर्गतका route हरू स्वतः `CLIENT_API` का रूपमा वर्गीकृत हुन्छन्। middleware ले Bearer जाँच लागू गर्छ; route handler हरूले त्यसलाई फेरि दोहोर्याउनुपर्दैन, तर उपयोगी भएमा subject पढ्न सक्छन्।

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler को तर्क
}
```

### ढाँचा 2 — व्यवस्थापन endpoint (session वा Bearer + manage)

`src/lib/api/requireManagementAuth.ts` बाट `requireManagementAuth()` प्रयोग गर्नुहोस्:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler को तर्क
}
```

`requireManagementAuth()` ले सफल हुँदा `null` वा JSON error `Response` फर्काउँछ:

- 401 `AUTH_001` "प्रमाणीकरण आवश्यक छ" — कुनै credential नै छैन
- 403 — अमान्य Bearer **वा** Bearer उपस्थित छ तर key मा `manage` / `admin` scope छैन

`hasManageScope(scopes)` ले `"manage"` वा `"admin"` का लागि true फर्काउँछ।

### ढाँचा 3 — सार्वजनिक अनुमति-सूचीमा थप्ने

सुविधाका आधारमा होइन, आकारका आधारमा set छान्नुहोस्। एउटा route लाई `PUBLIC_API_ROUTES_EXACT` मा राखिन्छ (वा GET-only का लागि `PUBLIC_READONLY_CORS_API_ROUTES` मा); वास्तविक subtree लाई मात्र `PUBLIC_API_ROUTE_PREFIXES` मा राखिन्छ, र त्यो **`/` मा अन्त्य हुनैपर्छ**। prefix सूचीमा एउटै route राख्दा त्यसका प्रारम्भिक अक्षरहरू साझा गर्ने प्रत्येक छेउछाउको path पनि सार्वजनिक हुन्छ — पछि थपिएका dynamic-segment sibling हरूसमेत (GHSA-74g9-q8f6-793h)। `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` र `tests/unit/authz/classify.test.ts` मा रहेका unit test हरू अद्यावधिक गर्नुहोस्।

## स्कोपहरू

तीन नेमस्पेसहरू। प्रत्येक परीक्षकले आफ्नै स्ट्रिङहरू मात्र पढ्छ। `manage` ले `read:compression` को लागि `scopeMatches` किन असफल हुन्छ र `read` पहुँच टोकनले `PATCH /api/keys/{id}` किन गर्न सक्दैन भन्ने सहितको साइड-बाइ-साइड, [तीन स्कोप नेमस्पेसहरू](../frameworks/MCP-SERVER.md#three-scope-namespaces) मा छ।

API कुञ्जीहरूले `scopes` एरे बोक्छन् (`api_keys.scopes` मा JSON को रूपमा भण्डार गरिएको, `src/lib/db/apiKeys.ts` हेर्नुहोस्)।

### व्यवस्थापन स्कोप

- `manage` / `admin` — `hasManageScope`। व्यवस्थापन API मार्गहरूमा बेयरर पहुँच।
- `mcp:connect`, `self:usage`, `self:account-quota`, र `policy:bypass-provider-quota` थपिने सटीक-मिलान स्कोपहरू हुन्। तिनीहरू `MANAGEMENT_API_KEY_SCOPES` बाहिर पर्छन्। `mcp:connect` ले `/api/mcp/` नन-लूपब्याक कार्व-आउट मात्र खोल्छ।

### MCP उपकरण स्कोपहरू

क्याटलग र मिल्दो नियमहरू (समान स्ट्रिङ, वा `*` मा समाप्त हुने प्रदान गरिएको स्कोप): [MCP उपकरण स्कोपहरू](../frameworks/MCP-SERVER.md#mcp-tool-scopes)। `src/shared/constants/mcpScopes.ts` मा रहेको `MCP_SCOPE_LIST` मूल टाइप गरिएको उपसमूह हो, पूर्ण क्याटलग होइन। `resolveCallerScopeContext()` ले MCP प्रमाणीकरण जानकारी, अनुरोध मेटाडेटा, वा `OMNIROUTE_MCP_SCOPES` बाट स्कोपहरू समाधान गरेपछि `open-sse/mcp-server/scopeEnforcement.ts` मा प्रवर्तन चल्छ। यो `OMNIROUTE_MCP_ENFORCE_SCOPES=true` नभएसम्म बन्द रहन्छ।

### पहुँच-टोकन स्कोपहरू

`oma_live_…` टोकनहरूमा `read` / `write` / `admin`, `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) द्वारा क्रमबद्ध। यो श्रेणी पहुँच-टोकन प्रमाणिकरणमा मात्र लागू हुन्छ। [व्यवस्थापन प्रमाणीकरण](../guides/MANAGEMENT-AUTH.md) हेर्नुहोस्।

## Auth Required टगल

`src/shared/utils/apiAuth.ts` मा रहेको `isAuthRequired()` ले अनुरोधका लागि **कुनै पनि** प्रमाणीकरण लागू गरिने हो कि होइन भन्ने निर्णय गर्छ:

- `settings.requireLogin === false` → प्रमाणीकरण विश्वव्यापी रूपमा असक्षम हुन्छ, बाहेक always-protected tier ([Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) र त्यो credential दिने कलहरू, जसलाई लगइन सक्षम हुँदाकै credential चाहिन्छ: sync token जारी गर्ने, कुनै पनि scope मा CLI access token बनाउने, र `manage`/`admin` scope भएको API key बनाउने, त्यो scope key लाई दिने, वा त्यस्तो key पुनः जनरेट वा देखाउने (`src/lib/api/requireManagementAuth.ts` मा `requireCredentialForManagementScopedKey()`)। केवल inference का लागि भएका keys खुला रहन्छन्।
- कुनै पासवर्ड कन्फिगर नभएको **र** `INITIAL_PASSWORD` env var नभएको → bootstrap मोडले onboarding wizard र loopback अनुरोधहरूलाई अनुमति दिन्छ, तर बाहिरका network अनुरोधहरूलाई अझै credentials चाहिन्छ।
- कुनै पनि DB त्रुटि → fail closed (secure-by-default)।

Client API key लागू गर्न `src/shared/utils/featureFlags.ts` मा रहेको `isRequireApiKeyEnabled()` प्रयोग हुन्छ, सिधै `process.env.REQUIRE_API_KEY` पढिँदैन। यो deployed instances का लागि महत्त्वपूर्ण छ: Dashboard → Feature Flags मा `REQUIRE_API_KEY` टगल गर्दा DB override भण्डारण हुन्छ र तुरुन्तै `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` र यो helper साझा गर्ने अन्य client-API auth जाँचहरूमा असर पार्छ। Feature flag store पढ्न नसकिएमा client API auth fail closed हुन्छ र key माग्छ।

## ब्रेकिङ परिवर्तन — v3.8.0

`/api/v1/agents/tasks/*` र `/api/resilience/model-cooldowns` एन्डपोइन्टहरूलाई **अब व्यवस्थापन प्रमाणीकरण आवश्यक पर्छ** (कमिट `588a0333`)। पहिले `manage` स्कोपबिनाको सामान्य API कुञ्जी पठाउने क्लाइन्टहरूले `403` प्राप्त गर्छन्। माइग्रेसन: API Keys ड्यासबोर्डमा कुञ्जीलाई `manage` स्कोप जारी गर्नुहोस्, वा लगइन गरिएको ड्यासबोर्ड सत्र प्रयोग गर्नुहोस्।

## व्यवहार परिवर्तन — v3.8.2

`/api/mcp/*` (रिमोट MCP सर्भर) अझै पनि पूर्वनिर्धारित रूपमा LOCAL_ONLY छ, तर `Authorization: Bearer <api-key>` हेडरमा `manage` स्कोप हुँदा अब यसले गैर-लूपब्याक अनुरोधहरू स्वीकार गर्छ। यो अपवादलाई `src/server/authz/routeGuard.ts` मा रहेको `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` मार्फत प्रत्येक पाथका लागि स्पष्ट रूपमा गेट गरिएको छ; सँगैको LOCAL_ONLY प्रिफिक्स `/api/cli-tools/runtime/*` लाई जानीजानी बाइपास गर्न नमिल्ने बनाइएको छ, किनभने यसले स्वेच्छाचारी सबप्रोसेसहरू सुरु गर्न सक्छ। गैर-लूपब्याकबाट `/api/mcp/*` मा आउने बेनामी अनुरोधहरूले अझै पनि `403 LOCAL_ONLY` फर्काउँछन् — कुनै पनि नयाँ LOCAL_ONLY पाथको पूर्वनिर्धारित अवस्था कडा-लूपब्याक नै रहन्छ। [रुट गार्ड तहहरू](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) हेर्नुहोस्।

## परीक्षण

- युनिट परीक्षणहरू: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- सार्वजनिक अनुमति सूची: `tests/unit/public-api-routes.test.ts`।
- केन्द्रित रूपमा चलाउनुहोस्: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## डिबग गर्दै

पाइपलाइनले सधैं निम्नसँग प्रतिक्रियाहरू छाप्छ:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

प्रमाणीकृत अनुरोधहरूको लागि अपस्ट्रीम (ह्यान्डलर-साइड) अनुरोध हेडरहरू पनि समावेश छन्:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ह्यान्डलरहरू — भित्र `assertAuth(req, expectedClass)` प्रयोग गर्नुहोस् यदि मिडलवेयर बाइपास गरिएको थियो भने यसले `AuthzAssertionError` लाई कोड `AUTHZ_NOT_INITIALIZED` फ्याँक्छ (परीक्षणहरूमा कन्फिगरेसन रिग्रेसनहरू समात्नका लागि उपयोगी)।

## यो पनि हेर्नुहोस्

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — प्रति एन्डपोइन्ट प्रमाणीकरण मार्कर
- [COMPLIANCE.md](../security/COMPLIANCE.md) — प्रमाणीकरण घटनाहरूको लागि अडिट लग
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — तीन स्कोप नेमस्पेसहरू र MCP उपकरण-स्कोप क्याटलग
- स्रोत: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
