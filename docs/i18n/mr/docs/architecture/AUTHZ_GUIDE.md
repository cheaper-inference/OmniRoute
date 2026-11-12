# Authorization Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **सत्याचा स्रोत:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **शेवटचे अद्यतन:** 2026-09-22 — स्कोप नेमस्पेसेस MCP-SERVER.md कडे निर्देश करतात

OmniRoute मध्ये एक मार्ग-जागरूक अधिकृतता पाइपलाइन आहे जी प्रत्येक API विनंतीला गेट करते. वर्गीकरण **निश्चित** आणि **फेल-क्लोज्ड** आहे — ज्याचे वर्गीकरण केले जाऊ शकत नाही ते `MANAGEMENT` म्हणून संपते आणि त्याला सत्र किंवा व्यवस्थापन-श्रेणी टोकनची आवश्यकता असते. हे पृष्ठ मार्ग राखणाऱ्या किंवा नवीन एंडपॉइंट्स डिझाइन करणाऱ्या अभियंत्यांसाठी मॉडेल स्पष्ट करते.

![AuthZ पाइपलाइन (3 मार्ग वर्ग + धोरण मूल्यांकन)](../diagrams/exported/authz-pipeline.svg)

> स्रोत: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## दोन प्रमाणीकरण पद्धती

### 1. API Key (Bearer)

OpenAI/Anthropic/Gemini-सुसंगत क्लायंट API आणि `manage` स्कोप असलेल्या काही व्यवस्थापन मार्गांसाठी वापरले जाते.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` मधील `isValidApiKey()` / `extractApiKey()` द्वारे प्रमाणीकरण केले जाते आणि `src/shared/utils/apiAuth.ts` मार्फत पुन्हा निर्यात केले जाते. व्हॅलिडेटर `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` एन्व्हायर्नमेंट व्हेरिएबल्सनाही कायमस्वरूपी पासथ्रू की म्हणून स्वीकारतो (इश्यू #1350).

### 2. Dashboard Session (auth_token cookie)

डॅशबोर्ड पृष्ठे आणि प्रशासकीय ऑपरेशन्ससाठी.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ची पडताळणी यशस्वी झाली **आणि** त्यात `authenticated: true` असल्यासच कुकी ही सेशन असते
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). कुकीचा प्रत्येक ग्राहक (डॅशबोर्ड रूट गार्ड (`isDashboardSessionAuthenticated()`), authz पाइपलाइन रिफ्रेश, WebSocket हँडशेक, लाइव्ह सर्व्हर, `/api/settings/require-login`, `/api/auth/status`) या हेल्परद्वारेच जातो.
`JWT_SECRET` ने स्वाक्षरी केलेले इतर JWT अस्तित्वात आहेत — की धारकांसाठी Cursor CLI पासथ्रू `iss "omniroute" / aud "cursor-cli"` टोकन तयार करतो — आणि ती कधीही सेशन नसतात
(#13298).

`src/shared/utils/apiAuth.ts` मधील `isDashboardSessionAuthenticated()` द्वारे पडताळणी केली जाते. 30 दिवसांच्या लाइफटाइममध्ये 7 दिवसांपेक्षा कमी वेळ शिल्लक असल्यास पाइपलाइन JWT आपोआप रिफ्रेश करते.

सेशनचे 30 दिवस पूर्ण होण्यापूर्वीही ते समाप्त होऊ शकते, कारण प्रत्येक टोकन-मिंटर `mintDashboardSessionToken` मधून जातो (यात जारी करण्याची वेळ `iat` आणि आयडी `jti` असतो) आणि व्हेरिफायर दोन सेटिंग्ज तपासतो: पासवर्ड बदलल्यावर सेट होणारे `sessionsValidAfter`, ज्यामुळे त्यापूर्वी जारी केलेल्या प्रत्येक सेशनची पडताळणी थांबते (पासवर्ड बदलणाऱ्या ब्राउझरला नवीन कुकी मिळते), आणि `revokedDashboardSessions`, ज्यामध्ये `POST /api/auth/logout` साइन-आउट केलेल्या सेशनचा `jti` जोडते. जुन्या रिलीजद्वारे मिंट केलेल्या सेशनमध्ये यापैकी कोणताही क्लेम नसतो आणि पहिला पासवर्ड बदल होईपर्यंत ती वैध राहतात. सेटिंग्ज वाचता न आल्यास सेशनवर विश्वास ठेवला जात नाही.

काही व्यवस्थापन मार्गांमध्ये **दोन्हीपैकी कोणतीही** पद्धत स्वीकारली जाते: कुकी किंवा `manage` (किंवा `admin`) स्कोप असलेली `Bearer <key>` API की. यामुळे v3.8 मध्ये जोडलेली "API calls द्वारे कॉन्फिगर करण्यायोग्य" कार्यपद्धती शक्य होते.

#### ऐच्छिक OIDC लॉगिन गेट (#6973)

डॅशबोर्ड प्रशासकीय लॉगिनमध्ये डीफॉल्ट पासवर्ड लॉगिनसोबत ऑप्ट-इन OIDC (OpenID Connect) प्रवाहालाही समर्थन आहे
— पासवर्ड लॉगिन कधीही काढले जात नाही, केवळ त्याला पूरक पर्याय जोडला जातो:

- `settings.oidcEnabled === true` **आणि** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` हे सर्व कॉन्फिगर केलेले असतील तेव्हाच सक्षम; अन्यथा अक्षम
  (सेटिंग्ज → प्रमाणीकरण).
  `GET /api/auth/oidc/login` अन्यथा `400` परत करते.
- `GET /api/auth/oidc/login` इश्यूअरच्या
  `/.well-known/openid-configuration` मधून `authorization_endpoint` शोधते
  (`<issuer>/authorize` वर फॉलबॅक करते), येणाऱ्या विनंतीपासून (`x-forwarded-proto`-सुसंगत)
  रीडायरेक्ट URI तयार करते आणि यादृच्छिक `state` `httpOnly` `oidc_state` कुकीमध्ये
  साठवून IdP कडे रीडायरेक्ट करते.
- `GET /api/auth/oidc/callback` `state` चे प्रमाणीकरण करते, authorization
  code ची देवाणघेवाण करते आणि इश्यूअरच्या JWKS द्वारे ID token ची स्वाक्षरी
  पडताळते (`jose` चे `createRemoteJWKSet`, प्रत्येक JWKS URI साठी कॅश केलेले);
  `issuer`/`audience` तपासण्या देखील केल्या जातात. डॅशबोर्डमध्ये प्रवेशासाठी
  रिकामी नसलेली `oidcAllowedSubjects` यादी, `oidcAdmissionClaim` धोरण,
  किंवा दोन्ही आवश्यक आहेत. `email_verified === true` असतानाच subject यादी
  `sub` किंवा `email` शी जुळते. पर्यायी claim धोरण dot-separated ID-token
  claim path (उदाहरणार्थ, `realm_access.roles`) आणि स्वीकारलेल्या मूल्यांचा
  array घेते; resolved claim हा strings चा array असणे आणि त्यात किमान एक
  स्वीकारलेले मूल्य असणे आवश्यक आहे. दोन्ही धोरणे कॉन्फिगर केली असल्यास,
  दोन्ही यशस्वी होणे आवश्यक आहे. अनुपस्थित/चुकीच्या स्वरूपातील claims
  सुरक्षिततेच्या दृष्टीने नकारात्मक पद्धतीने हाताळले जातात आणि दोन्हीपैकी
  कोणतेही धोरण नसल्यास callback लॉगिन नाकारते (`not_configured`).
  विद्यमान subject-only कॉन्फिगरेशन्समध्ये कोणताही बदल होत नाही.
- Keycloak सामान्यतः realm roles access tokens मध्ये मॅप करते, ID tokens मध्ये
  आवश्यकच असेल असे नाही. realm role `admin` आवश्यक करण्यासाठी, या client साठी
  असा protocol mapper कॉन्फिगर करा जो `realm_access.roles` त्याच्या **ID token** मध्ये
  समाविष्ट करतो; त्यानंतर `oidcAdmissionClaim` चे मूल्य
  `{ "path": "realm_access.roles", "values": ["admin"] }` असे सेट करा.
  role-only admission सक्षम करण्यापूर्वी या client साठीचा प्रत्यक्ष ID-token
  claim तपासा; application access-token roles वाचत नाही. IdP-स्तरीय token
  refusal ही तपासणी पूरक ठरू शकते, परंतु तिची जागा घेऊ शकत नाही.
- यशस्वी झाल्यावर ते password login द्वारे जारी होणारा **अगदी तोच** 30-दिवसांचा
  `auth_token` JWT तयार करते (`src/app/api/auth/login/route.ts`), त्यामुळे
  उर्वरित dashboard session pipeline (auto-refresh, cookie flags) अपरिवर्तित राहते —
  OIDC केवळ cookie कशी तयार केली जाते हे बदलते, ती काय परवानगी देते हे नाही.
  IdP roles/groups मधील बदल विद्यमान OmniRoute sessions अमान्य करत नाहीत; logout,
  password rotation किंवा session expiry अजूनही त्यांचा कालावधी नियंत्रित करतात.
- प्रत्येक `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) हे
  `SECURITY_IMPACTING_SETTINGS_KEYS` मध्ये आहे
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  body मध्ये management password `currentPassword` म्हणून दिलेला नसेल तर
  `400 PASSWORD_REQUIRED` देते (`currentPassword` चुकीचा असल्यास
  `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin` password _login_
  (`POST /api/auth/login`) नाकारते, परंतु साठवलेला password hash ठेवते आणि
  re-auth अजूनही त्याविरुद्ध `currentPassword` तपासते.
- `corsOrigins` आणि `bruteForceProtection` देखील
  `SECURITY_IMPACTING_SETTINGS_KEYS` मध्ये आहेत: यापैकी कोणतेही सैल केल्यास
  login defenses कमकुवत होतात, म्हणून त्यांना समान `currentPassword` re-auth
  आवश्यक असते (Security tab ते मागते) आणि JSON import त्यांना वगळते.
- प्रत्येक security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS` मधील नोंदी,
  प्रत्येक `oidc*` key आणि dashboard session state — `PATCH /api/settings` वर
  **केवळ operator साठी** आहे: manage-scoped API key किंवा `oma_` access token
  योग्य `currentPassword` पाठवला तरी `403` ने नाकारला जातो आणि हा नकार
  `settings.update_failed` म्हणून `reason: OPERATOR_REQUIRED` सह audit केला जातो
  (`src/lib/api/operatorCredential.ts` मधील `requireOperatorCredential()`).
  सामान्य settings (theme, display preferences) `manage` key किंवा
  `admin` access token साठी लिहिण्यायोग्य राहतात. `/api/settings` स्वतःमध्ये
  (आणि `/api/settings/require-login` मध्ये) होणाऱ्या प्रत्येक mutation साठी
  `admin` access-token scope देखील आवश्यक आहे
  (`src/server/authz/accessScopes.ts` मधील `ADMIN_MUTATION_EXACT_PATHS`,
  exact-path match); `GET` साठी `read` कायम राहते आणि इतर
  `/api/settings/*` sub-routes (proxies, combo defaults, model aliases,
  compression, purges…) method-inferred `write` scope वापरत राहतात.
- `POST /api/settings/import-json` हे re-auth वगळते, त्यामुळे लिहिण्यापूर्वी
  ते `IMPORT_STRIPPED_SETTINGS_KEYS` मधील प्रत्येक key (त्याच file मधील)
  वगळते: password आणि `currentPassword`, प्रत्येक
  `SECURITY_IMPACTING_SETTINGS_KEYS` entry आणि dashboard session state
  (`sessionsValidAfter`, `revokedDashboardSessions`).
  त्यामुळे जुना backup import केल्याने password change किंवा sign-out मुळे
  आधीच संपवलेले session पुन्हा सक्रिय होऊ शकत नाही.

#### पर्यायी TOTP द्वि-घटक लॉगिन (#16619)

Settings → Security मधून नोंदणी केली जाते; operator ते सुरू करेपर्यंत बंद
असते (`src/server/auth/dashboardMfa.ts`).

- **यामध्ये समाविष्ट:** पासवर्ड लॉगिन (`POST /api/auth/login`, ज्यासाठी त्यानंतर
  `POST /api/auth/mfa/verify` आवश्यक आहे) आणि `omniroute connect` (`POST /api/cli/connect`,
  जे केवळ पासवर्डची देवाणघेवाण नाकारते आणि कोड `totp` म्हणून स्वीकारते).
- **यामध्ये समाविष्ट नाही:** OIDC / SSO साइन-इन (`/api/auth/oidc/callback`) साठी
  OmniRoute TOTP विचारला जात नाही. हे ओळख प्रदात्याच्या स्वतःच्या दुसऱ्या घटकावर
  अवलंबून असते; त्यामुळे OIDC सक्षम असल्यास IdP मध्ये MFA लागू करा.
- **पुनर्प्राप्ती** (डिव्हाइस हरवले असल्यास, पुनर्प्राप्ती कोड शिल्लक नसल्यास किंवा
  एखादा घटक यापुढे सत्यापित करता येत नसल्यास, उदाहरणार्थ
  `STORAGE_ENCRYPTION_KEY` बदलल्यानंतर):
  1. `OMNIROUTE_DISABLE_MFA=true` सह सर्व्हर पुन्हा सुरू करा.
  2. स्वतः होस्टवर (लूपबॅक पीअर आणि लूपबॅक `Host`, जसे की
     `http://localhost:20128`) पासवर्डने साइन इन करा. त्या origin साठीच दुसरा घटक
     वगळला जातो; इतर प्रत्येक origin साठी कोड अद्याप आवश्यक असतो.
  3. Settings → Security → Disable मध्ये पासवर्ड प्रविष्ट करा आणि कोड रिकामा ठेवा.
     `POST /api/auth/mfa/disable` हे व्हेरिएबल सेट असताना आणि विनंती होस्टकडून
     आल्यावरच `code` शिवाय body स्वीकारते; यासाठी dashboard session आणि सध्याचा
     पासवर्ड तरीही आवश्यक असतो आणि याची नोंद
     `auth.mfa.disabled` with `secondFactor: "recovery_switch"` म्हणून ऑडिटमध्ये केली जाते.
  4. `OMNIROUTE_DISABLE_MFA` unset करा, सर्व्हर पुन्हा सुरू करा आणि आवश्यक असल्यास
     पुन्हा नोंदणी करा.

## मार्ग वर्ग

`src/server/authz/types.ts` मध्ये तीन वर्ग परिभाषित केले आहेत; ज्या मार्गाचे निश्चितपणे वर्गीकरण करता येत नाही ते `MANAGEMENT` वर परततात.

| वर्ग         | वर्णन                                                                                                                                                  | प्रमाणीकरण आवश्यक                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `PUBLIC`     | स्पष्टपणे सुरक्षित मार्ग — लॉगिन, लॉगआउट, स्थिती, आरोग्य, ऑनबोर्डिंग बूटस्ट्रॅप.                                                                       | काहीही नाही                                                  |
| `CLIENT_API` | मॉडेल-सर्व्हिंग एंडपॉइंट्स — `/api/v1/*`, `/api/v1beta/*`, तसेच उपनावे `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | प्रभावी `REQUIRE_API_KEY` फीचर फ्लॅग सक्षम असल्यास Bearer की |
| `MANAGEMENT` | डॅशबोर्ड पृष्ठे, सेटिंग्ज, प्रदाते, कीज, प्रशासकीय आणि निदानात्मक एंडपॉइंट्स.                                                                          | डॅशबोर्ड सत्र किंवा `manage` स्कोपसह Bearer                  |

काही `MANAGEMENT` क्रिया **केवळ ऑपरेटरसाठी** आहेत: `manage` की पुरेशी नाही. साठवलेली
प्रमाणपत्रे निर्यात करणे (`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), लाइव्ह डेटावर बॅकअप पुनर्संचयित करणे
(`POST /api/db-backups/import`, ज्यामध्ये `dryRun=true` देखील समाविष्ट आहे, `POST /api/db-backups` आयडीद्वारे पुनर्संचयित करणे,
`POST /api/settings/import-json`), पुनर्संचयित बिंदू हटवणे (`DELETE /api/db-backups` क्लीनअप,
आणि `PATCH /api/db-backups`, कारण त्याद्वारे जतन केलेला retention प्रत्येक बॅकअपनंतर होणाऱ्या
स्वयंचलित pruning ला नियंत्रित करतो) यासाठी डॅशबोर्ड सत्र, स्थानिक CLI subject किंवा लॉगिन अक्षम असणे आवश्यक आहे. सिंक टोकन जारी करणे (`POST /api/sync/tokens`) आणि `admin` CLI access token तयार करणे
(`POST /api/cli/tokens`) यासाठी प्रत्येक लॉगिन मोडमध्ये डॅशबोर्ड सत्र किंवा स्थानिक CLI subject आवश्यक आहे.
कोणत्याही स्कोपच्या API की आणि `oma_` access tokens ही ऑपरेटरची प्रमाणपत्रे नाहीत: जेव्हा त्यापैकी एक आवश्यक असते तेव्हा त्यांना `403`
मिळतो. ही तपासणी
`src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` /
`requireOperatorCredential()`) मध्ये आहे. लॉगिन सेटिंग्ज बदलणे देखील केवळ ऑपरेटरसाठी आहे:
`POST /api/settings/require-login` (व्यवस्थापन पासवर्ड सेट करणे / `requireLogin` टॉगल करणे) पासवर्ड अस्तित्वात आल्यानंतर
फक्त तीच प्रमाणपत्रे स्वीकारते — पहिल्यांदा चालू करण्याची बूटस्ट्रॅप विंडो (अद्याप पासवर्ड नसताना)
बदललेली नाही — आणि पासवर्ड बदलण्यासाठी डॅशबोर्ड सत्राने `currentPassword` पाठवणे आवश्यक आहे
(ते नसल्यास किंवा चुकीचे असल्यास `403`, आणि `settings.update_failed` म्हणून ऑडिट केले जाते). स्थानिक CLI आणि लॉगिन अक्षम असलेले इंस्टन्स पुनर्प्राप्ती मार्ग कायम ठेवतात आणि त्याशिवाय पासवर्ड सेट करू शकतात, कारण दोन्ही डेटा डिरेक्टरीच्या मालकीच्या होस्टशी जोडलेले आहेत.

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

विश्वसनीय अंतर्गत शीर्षलेख ( `src/server/authz/headers.ts` मध्ये परिभाषित) आहेत** येणाऱ्या विनंत्यांमधून काढून टाकले** वर्गीकरणापूर्वी — क्लायंट एखाद्या विषयाची तोतयागिरी करण्यासाठी `x-omniroute-auth-*` पूर्व-पॉप्युलेट करू शकत नाहीत.

### धोरण करार

प्रत्येक मार्ग वर्गाचे `src/server/authz/policies/` मध्ये धोरण आहे:

- **`publicPolicy`** (`policies/public.ts`) — नेहमी `allow({ kind: "anonymous", id: "anonymous" })` परत करतो.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — बेअरर काढतो, `validateApiKey()` द्वारे प्रमाणित करतो. जेव्हा प्रभावी `REQUIRE_API_KEY` वैशिष्ट्य ध्वज अक्षम केला जातो तेव्हाच निनावीवर पडतो. प्रभावी ध्वजाचे निराकरण `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) द्वारे केले जाते म्हणून डॅशबोर्ड वैशिष्ट्य ध्वज आणि पर्यावरण व्हेरिएबल्स `/api/v1/*`, `/api/v1beta/*`, आणि उपनामे सातत्याने नियंत्रित करतात; निराकरणकर्ता अपयश अयशस्वी बंद. क्लायंट API मार्गांवर डॅशबोर्ड-सत्र विनंत्यांना अनुमती देते ( `/api/v1/models`, डॅशबोर्ड मॉडेल कॅटलॉगद्वारे वापरलेले). जेव्हा Entra ID SSO सक्षम केले जाते, तेव्हा एक वाहक जो संरचनात्मकदृष्ट्या एक Entra टोकन असतो (तीन बेस64url सेगमेंट, `RS*` alg, `kid`) SSO शाखेद्वारे हाताळला जातो.** आधी** `validateApiKey()` आणि त्याचा निर्णय अंतिम — आहे, तो कधीही API-की मार्ग किंवा डीग्रेड-टू-अनामिक शाखेत येत नाही, म्हणून ओळख-प्रदाता आउटेज ओपन ऍक्सेस होऊ शकत नाही. स्थिर API की अप्रभावित आहेत. [Entra ID SSO](../security/ENTRA_SSO.md) पहा.
- **`managementPolicy`** (`policies/management.ts`) — डॅशबोर्ड सत्र स्वीकारते, अंतर्गत मॉडेल-सिंक विनंत्या ( `/api/providers/[name]/(sync-models|models)` विरुद्ध जुळतात), किंवा `isAuthRequired()` खोटे परत आल्यास पूर्णपणे वगळते. 403 (`AUTH_001`) परत करते जेव्हा बेअरर टोकन उपस्थित असते परंतु अवैध असते, अन्यथा 401. कोणत्याही ऑथ ब्रांच — [रूट गार्ड टियर्स](../security/ROUTE_GUARD_TIERS.md) पाहण्यापूर्वी रूट-गार्ड टियर्स (LOCAL_ONLY / ALWAYS_PROTECTED) लागू करते. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` मधील LOCAL_ONLY पथ (आज: `/api/mcp/`) नॉन-लूपबॅकमधून प्रवेश केला जाऊ शकतो जेव्हा बेअरर की `manage` स्कोप असते; इतर सर्व LOCAL_ONLY मार्ग व्याप्तीची पर्वा न करता कठोर-लूपबॅक राहतात.

यशस्वी पॉलिसी `AuthSubject` सह `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` परत करते. डाउनस्ट्रीम हँडलर्स ऑथ लॉजिक पुन्हा चालवण्याऐवजी `src/server/authz/assertAuth.ts` मध्ये `assertAuth(request, "CLIENT_API")` द्वारे वाचू शकतात.

## सार्वजनिक मार्गांची यादी

`src/shared/constants/publicApiRoutes.ts` ही स्पष्ट allowlist आहे:

ही यादी **आकारानुसार** विभागलेली आहे आणि हा विभाग महत्त्वाचा आहे (GHSA-74g9-q8f6-793h): prefix चे जुळणारे परीक्षण
`startsWith()` वापरून केले जाते, त्यामुळे सुरुवातीची अक्षरे समान असलेला प्रत्येक संलग्न मार्गही जुळतो.
`/api/usage/om-usage` ला prefix म्हणून चिन्हांकित केल्याने `/api/usage/om-usage<anything>` PUBLIC होते आणि Next त्याचे निराकरण
`/api/usage/[connectionId]` वर करते — स्वतःचे प्रमाणीकरण नसलेला handler.

```ts
// वास्तविक उपवृक्ष. प्रत्येक नोंद "/" ने संपलीच पाहिजे (unit test द्वारे तपासले जाते).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify मध्ये CLIENT_API म्हणून हाताळले जाते, "no-auth public" म्हणून नाही
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// स्वतंत्र मार्ग, trailing slash असो वा नसो, EXACTLY जुळवले जातात.
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP साठी login ची पायरी 2; MFA-pending cookie आवश्यक
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS origin सवलतही लागू होणारे केवळ-वाचन स्वतंत्र मार्ग.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS सवलत लागू न होणारा केवळ-वाचन स्वतंत्र मार्ग.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

केवळ-वाचन मार्ग सुरक्षित पद्धतींसाठीच सार्वजनिक असतात. नोंद: `classifyRoute()` PUBLIC fall-through मधून `/api/v1/*` आणि `/api/v1beta/*` वगळते — त्यामुळे ते नेहमी `CLIENT_API` असतात आणि Bearer-की धोरण अद्याप लागू राहते.

## नवीन रूट जोडणे

### नमुना 1 — सार्वजनिक क्लायंट API एंडपॉइंट (Bearer-auth)

`/api/v1/` आणि `/api/v1beta/` अंतर्गत असलेले रूट्स स्वयंचलितपणे `CLIENT_API` म्हणून वर्गीकृत केले जातात. मिडलवेअर Bearer तपासणी लागू करते; रूट हँडलर्सना ती पुन्हा करण्याची आवश्यकता नसते, परंतु उपयुक्त असल्यास ते subject वाचू शकतात.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... हँडलरचे लॉजिक
}
```

### नमुना 2 — व्यवस्थापन एंडपॉइंट (session किंवा Bearer + manage)

`src/lib/api/requireManagementAuth.ts` मधील `requireManagementAuth()` वापरा:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... हँडलरचे लॉजिक
}
```

यशस्वी झाल्यास `requireManagementAuth()` हे `null` परत करते; अन्यथा JSON त्रुटी असलेला `Response` परत करते:

- 401 `AUTH_001` "Authentication required" — कोणतीही प्रमाणीकरण माहिती उपलब्ध नाही
- 403 — अवैध Bearer **किंवा** Bearer उपलब्ध आहे, पण कीमध्ये `manage` / `admin` स्कोप नाही

`hasManageScope(scopes)` हे `"manage"` किंवा `"admin"` साठी true परत करते.

### नमुना 3 — सार्वजनिक अनुमतीसूचीत भर घालणे

सोयीनुसार नव्हे, तर आकारानुसार संच निवडा. एक स्वतंत्र रूट `PUBLIC_API_ROUTES_EXACT` मध्ये जातो (किंवा फक्त GET साठी `PUBLIC_READONLY_CORS_API_ROUTES` मध्ये); केवळ वास्तविक उपवृक्षच `PUBLIC_API_ROUTE_PREFIXES` मध्ये जातो आणि तो **`/` ने संपलाच पाहिजे**. उपसर्ग सूचीमध्ये एक स्वतंत्र रूट ठेवल्यास, समान सुरुवातीची अक्षरे असलेला प्रत्येक लगतचा पथही सार्वजनिक होतो — यामध्ये नंतर जोडलेली dynamic-segment भावंडेही समाविष्ट असतात (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` आणि `tests/unit/authz/classify.test.ts` येथील युनिट चाचण्या अद्ययावत करा.

## स्कोप्स

तीन नेमस्पेस. प्रत्येक चेकर फक्त स्वतःच्या स्ट्रिंग वाचतो. `manage` `read:compression` साठी `scopeMatches` का अयशस्वी होते आणि `read` ॲक्सेस टोकन `PATCH /api/keys/{id}` का करू शकत नाही, यासह बाजू-बाजूने तुलना
[तीन स्कोप नेमस्पेस](../frameworks/MCP-SERVER.md#three-scope-namespaces) मध्ये दिली आहे.

API की मध्ये `scopes` ॲरे असतो (JSON म्हणून `api_keys.scopes` मध्ये संग्रहित, `src/lib/db/apiKeys.ts` पहा).

### व्यवस्थापन स्कोप

- `manage` / `admin` — `hasManageScope`. व्यवस्थापन API मार्गांवर बेअरर ॲक्सेस.
- `mcp:connect`, `self:usage`, `self:account-quota`, आणि
  `policy:bypass-provider-quota` हे ॲडिटिव्ह एक्झॅक्ट-मॅच स्कोप आहेत. ते
  `MANAGEMENT_API_KEY_SCOPES` च्या बाहेर आहेत. `mcp:connect` फक्त
  `/api/mcp/` नॉन-लूपबॅक कार्व्ह-आउट उघडतो.

### MCP टूल स्कोप्स

कॅटलॉग आणि जुळणारे नियम (सारखी स्ट्रिंग, किंवा `*` मध्ये समाप्त होणारा मंजूर स्कोप):
[MCP टूल स्कोप्स](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`src/shared/constants/mcpScopes.ts` मधील `MCP_SCOPE_LIST` हा मूळ टाइप केलेला
उपसंच आहे, तो पूर्ण कॅटलॉग नाही. `resolveCallerScopeContext()` MCP ऑथ माहिती, विनंती मेटाडेटा किंवा `OMNIROUTE_MCP_SCOPES` मधून स्कोप्सचे निराकरण केल्यानंतर
`open-sse/mcp-server/scopeEnforcement.ts` मध्ये अंमलबजावणी चालते.
`OMNIROUTE_MCP_ENFORCE_SCOPES=true` असल्याशिवाय ते बंद राहते.

### ॲक्सेस-टोकन स्कोप्स

`oma_live_…` टोकनवर `read` / `write` / `admin`, `scopeSatisfies` द्वारे रँक केलेले
(`src/lib/accessTokens/scopes.ts`). ही रँक फक्त ॲक्सेस-टोकन क्रेडेंशियलला लागू होते.
[व्यवस्थापन प्रमाणीकरण](../guides/MANAGEMENT-AUTH.md) पहा.

## प्रमाणीकरण आवश्यक टॉगल

`isAuthRequired()` in `src/shared/utils/apiAuth.ts` विनंतीसाठी **कोणतेही प्रमाणीकरण** लागू आहे की नाही हे ठरवते:

- `settings.requireLogin === false` → प्रमाणीकरण जागतिक स्तरावर अक्षम केले जाते; मात्र नेहमी-संरक्षित
  स्तर (पहा [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) आणि ते स्वीकारणारे क्रेडेन्शियल
  वितरित करणाऱ्या कॉल्सना अपवाद आहे. अशा कॉल्सना लॉगिन सुरू असताना लागणारेच क्रेडेन्शियल आवश्यक असते:
  सिंक टोकन जारी करणे, कोणत्याही स्कोपवर CLI अॅक्सेस टोकन तयार करणे, आणि `manage`/`admin` स्कोपसह
  API की तयार करणे, तो स्कोप एखाद्या कीला देणे, किंवा अशी की पुन्हा तयार करणे अथवा उघड करणे
  (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`).
  केवळ inference साठीच्या की खुल्या राहतात. संरक्षित फीचर फ्लॅग लिहिणे (`REQUIRE_API_KEY`, इतर
  Security फ्लॅग्स, तसेच [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) मध्ये सूचीबद्ध
  SSRF / TLS / MCP-scope / sandbox फ्लॅग्स) आणि PII masking सेटिंग्ज जतन करणे
  (`PUT /api/settings/pii`) यांसाठीही क्रेडेन्शियल आवश्यक राहते.
- कोणताही पासवर्ड कॉन्फिगर केलेला नाही **आणि** `INITIAL_PASSWORD` env var देखील नाही → बूटस्ट्रॅप मोड
  onboarding wizard आणि loopback विनंत्यांना अनुमती देतो, परंतु उघड्या नेटवर्कवरील विनंत्यांसाठी
  अजूनही क्रेडेन्शियल आवश्यक असते. अपवाद: संरक्षित फीचर फ्लॅग लिहिणे आणि PII masking सेटिंग्ज जतन करणे
  (`PUT /api/settings/pii`) यांसाठी loopback वरूनही क्रेडेन्शियल आवश्यक असते; त्यामुळे केवळ loopback
  पुरेसे नाही.
- कोणतीही DB त्रुटी → प्रवेश नाकारला जातो (secure-by-default).

क्लायंट API कीची अंमलबजावणी `src/shared/utils/featureFlags.ts` मधील `isRequireApiKeyEnabled()` वापरते,
थेट `process.env.REQUIRE_API_KEY` वाचत नाही. डिप्लॉय केलेल्या इन्स्टन्ससाठी हे महत्त्वाचे आहे:
Dashboard → Feature Flags मध्ये `REQUIRE_API_KEY` टॉगल केल्यास DB override साठवला जातो आणि
`/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` तसेच हा helper
सामायिक करणाऱ्या इतर client-API प्रमाणीकरण तपासण्यांवर त्वरित परिणाम होतो. फीचर फ्लॅग स्टोअर वाचता
न आल्यास, क्लायंट API प्रमाणीकरण सुरक्षिततेच्या दृष्टीने प्रवेश नाकारते आणि की आवश्यक ठरवते.

## ब्रेकिंग बदल — v3.8.0

`/api/v1/agents/tasks/*` आणि `/api/resilience/model-cooldowns` एंडपॉइंट्सना **आता व्यवस्थापन प्रमाणीकरण आवश्यक आहे** (कमिट `588a0333`). पूर्वी `manage` स्कोपशिवाय सामान्य API की पाठवणाऱ्या क्लायंटना `403` मिळतो. स्थलांतर: एकतर API Keys डॅशबोर्डमध्ये कीला `manage` स्कोप द्या किंवा लॉग-इन केलेले डॅशबोर्ड सत्र वापरा.

## वर्तनातील बदल — v3.8.2

`/api/mcp/*` (रिमोट MCP सर्व्हर) अजूनही डीफॉल्टनुसार LOCAL_ONLY आहे, परंतु `Authorization: Bearer <api-key>` हेडरमध्ये `manage` स्कोप असल्यास तो आता लूपबॅक नसलेल्या विनंत्या स्वीकारतो. हा अपवाद `src/server/authz/routeGuard.ts` मधील `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` द्वारे प्रत्येक पाथसाठी स्पष्टपणे नियंत्रित केला जातो; संबंधित LOCAL_ONLY प्रीफिक्स `/api/cli-tools/runtime/*` हेतुपुरस्सर बायपास करता येत नाही, कारण तो कोणत्याही प्रकारच्या सबप्रोसेसेस सुरू करू शकतो. लूपबॅक नसलेल्या स्त्रोतांकडून `/api/mcp/*` कडे येणाऱ्या अनामिक विनंत्यांना पुढेही `403 LOCAL_ONLY` मिळतो — कोणत्याही नवीन LOCAL_ONLY पाथसाठी डीफॉल्ट नियम कठोर-लूपबॅकच राहतो. [रूट गार्ड स्तर](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) पहा.

## चाचणी

- युनिट चाचण्या: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- सार्वजनिक अनुमतसूची: `tests/unit/public-api-routes.test.ts`.
- लक्ष केंद्रित करून चालवा: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## डीबगिंग

पाइपलाइन नेहमी प्रतिसादांवर शिक्का मारते:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

प्रमाणीकृत विनंत्यांसाठी अपस्ट्रीम (हँडलर-साइड) विनंती शीर्षलेखांमध्ये हे देखील समाविष्ट आहे:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

जर मिडलवेअर बायपास केले गेले असेल तर — हँडलर्सच्या आत `assertAuth(req, expectedClass)` वापरा ते `AUTHZ_NOT_INITIALIZED` कोडसह `AuthzAssertionError` टाकते (चाचण्यांमध्ये कॉन्फिगरेशन रीग्रेशन्स पकडण्यासाठी उपयुक्त).

## हे देखील पहा

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — प्रत्येक एंडपॉइंटसाठी प्रमाणीकरण मार्कर
- [COMPLIANCE.md](../security/COMPLIANCE.md) — प्रमाणीकरण घटनांसाठी ऑडिट लॉग
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — तीन स्कोप नेमस्पेस आणि MCP टूल-स्कोप कॅटलॉग
- स्रोत: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
