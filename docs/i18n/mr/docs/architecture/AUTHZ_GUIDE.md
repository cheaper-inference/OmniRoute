# Authorization Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **सत्याचा स्रोत:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **शेवटचे अद्यतन:** 2026-09-22 — स्कोप नेमस्पेसेस MCP-SERVER.md कडे निर्देश करतात

OmniRoute मध्ये एक मार्ग-जागरूक अधिकृतता पाइपलाइन आहे जी प्रत्येक API विनंतीला गेट करते. वर्गीकरण **निश्चित** आणि **फेल-क्लोज्ड** आहे — ज्याचे वर्गीकरण केले जाऊ शकत नाही ते `MANAGEMENT` म्हणून संपते आणि त्याला सत्र किंवा व्यवस्थापन-श्रेणी टोकनची आवश्यकता असते. हे पृष्ठ मार्ग राखणाऱ्या किंवा नवीन एंडपॉइंट्स डिझाइन करणाऱ्या अभियंत्यांसाठी मॉडेल स्पष्ट करते.

![AuthZ पाइपलाइन (3 मार्ग वर्ग + धोरण मूल्यांकन)](../diagrams/exported/authz-pipeline.svg)

> स्रोत: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## प्रमाणीकरणाच्या दोन पद्धती

### 1. API की (Bearer)

OpenAI/Anthropic/Gemini-सुसंगत क्लायंट API आणि कीकडे `manage` स्कोप असल्यास काही व्यवस्थापन रूट्ससाठी वापरली जाते.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` मधील `isValidApiKey()` / `extractApiKey()` द्वारे प्रमाणीकरण केले जाते आणि `src/shared/utils/apiAuth.ts` द्वारे पुन्हा एक्सपोर्ट केले जाते. प्रमाणीकरणकर्ता `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` पर्यावरणीय चलांना कायमस्वरूपी पासथ्रू की म्हणूनही स्वीकारतो (समस्या #1350).

### 2. डॅशबोर्ड सत्र (auth_token कुकी)

डॅशबोर्ड पृष्ठे आणि प्रशासकीय ऑपरेशन्ससाठी.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ची पडताळणी **आणि** त्यामध्ये `authenticated: true` असेल, केवळ तेव्हाच कुकीला सत्र मानले जाते
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). कुकीचा प्रत्येक
वापरकर्ता (डॅशबोर्ड रूट गार्ड (`isDashboardSessionAuthenticated()`), प्रमाणीकरण पाइपलाइन रिफ्रेश, WebSocket हँडशेक, लाइव्ह
सर्व्हर, `/api/settings/require-login`, `/api/auth/status`) या हेल्परद्वारे प्रक्रिया करतो.
`JWT_SECRET` ने स्वाक्षरी केलेले इतर JWT देखील अस्तित्वात आहेत — Cursor CLI पासथ्रू कीधारकांसाठी
`iss "omniroute" / aud "cursor-cli"` टोकन जारी करतो — आणि त्यांना कधीही सत्र मानले जात नाही
(#13298).

`src/shared/utils/apiAuth.ts` मधील `isDashboardSessionAuthenticated()` द्वारे पडताळणी केली जाते. JWT च्या 30 दिवसांच्या आयुष्यात 7 दिवसांपेक्षा कमी कालावधी शिल्लक असताना पाइपलाइन तो आपोआप रिफ्रेश करते.

सत्राचे 30 दिवस पूर्ण होण्यापूर्वीही ते समाप्त होऊ शकते, कारण प्रत्येक जारीकर्ता `mintDashboardSessionToken` द्वारे प्रक्रिया करतो (जारी करण्याची वेळ `iat` आणि आयडी `jti`) आणि पडताळणीकर्ता दोन सेटिंग्ज तपासतो: `sessionsValidAfter`, जी पासवर्ड बदलल्यावर सेट केली जाते, त्यामुळे तिच्यापूर्वी जारी केलेल्या प्रत्येक सत्राची पडताळणी थांबते (पासवर्ड बदललेल्या ब्राउझरला नवीन कुकी मिळते), आणि `revokedDashboardSessions`, ज्यामध्ये `POST /api/auth/logout` साइन-आउट केलेल्या सत्राचा `jti` जोडते. जुन्या रिलीझद्वारे जारी केलेल्या सत्रांमध्ये यापैकी कोणताही क्लेम नसतो आणि पहिल्यांदा पासवर्ड बदलेपर्यंत ती वैध राहतात. सेटिंग्ज वाचता न आल्यास, सत्रावर विश्वास ठेवला जात नाही.

काही व्यवस्थापन रूट्स **यापैकी कोणतीही एक** पद्धत स्वीकारतात: कुकी किंवा API कीकडे `manage` (किंवा `admin`) स्कोप असल्यास `Bearer <key>`. यामुळेच v3.8 मध्ये जोडलेला "API कॉलद्वारे कॉन्फिगर करता येणारा" कार्यप्रवाह शक्य होतो.

#### पर्यायी OIDC लॉगिन गेट (#6973)

डॅशबोर्ड प्रशासक लॉगिनमध्ये डीफॉल्ट पासवर्ड लॉगिनसोबत **ऑप्ट-इन** OIDC (OpenID Connect) प्रवाहालाही समर्थन आहे — पासवर्ड लॉगिन कधीही काढून टाकले जात नाही, त्याला केवळ
पूरक पर्याय दिला जातो:

- `settings.oidcEnabled === true` **असेल** आणि `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ही सर्व कॉन्फिगर केलेली असतील (सेटिंग्ज → प्रमाणीकरण),
  तरच हे सक्षम असते. अन्यथा `GET /api/auth/oidc/login` हे `400` परत करते.
- `GET /api/auth/oidc/login` हे जारीकर्त्याच्या
  `/.well-known/openid-configuration` मधून `authorization_endpoint` शोधते
  (तो उपलब्ध नसल्यास `<issuer>/authorize` वापरते), येणाऱ्या विनंतीवरून
  (`x-forwarded-proto` विचारात घेऊन) रीडायरेक्ट URI तयार करते आणि यादृच्छिक
  `state` सह IdP कडे रीडायरेक्ट करते; हा `state`, `httpOnly` असलेल्या
  `oidc_state` कुकीमध्ये संग्रहित केला जातो.
- `GET /api/auth/oidc/callback` हे `state` प्रमाणित करते, ऑथरायझेशन कोडची
  देवाणघेवाण करते आणि जारीकर्त्याच्या JWKS द्वारे ID टोकनची स्वाक्षरी
  (`jose` चे `createRemoteJWKSet`, प्रत्येक JWKS URI साठी कॅश केलेले)
  `issuer`/`audience` तपासण्यांसह सत्यापित करते. डॅशबोर्डमध्ये प्रवेशासाठी
  रिक्त नसलेली `oidcAllowedSubjects` सूची, `oidcAdmissionClaim` धोरण किंवा
  दोन्ही आवश्यक आहेत. `email_verified === true` असेल तेव्हाच विषय सूची
  `sub` किंवा `email` शी जुळवली जाते. पर्यायी क्लेम धोरण डॉटने विभाजित केलेला
  ID-टोकन क्लेम पथ (उदाहरणार्थ, `realm_access.roles`) आणि स्वीकारलेल्या
  मूल्यांचा अॅरे घेते; निराकरण केलेला क्लेम हा किमान एक स्वीकारलेले मूल्य
  असलेला स्ट्रिंग्सचा अॅरे असणे आवश्यक आहे. दोन्ही धोरणे कॉन्फिगर केलेली
  असल्यास, दोन्ही उत्तीर्ण होणे आवश्यक आहे. गहाळ/सदोष क्लेम असल्यास प्रवेश
  सुरक्षितपणे नाकारला जातो आणि दोन्हींपैकी कोणतेही धोरण नसल्यास कॉलबॅक लॉगिन
  नाकारते (`not_configured`). केवळ विषयावर आधारित विद्यमान कॉन्फिगरेशन्समध्ये
  कोणताही बदल होत नाही.
- Keycloak सामान्यतः रिअल्म भूमिका ID टोकनमध्ये नव्हे, तर ऍक्सेस टोकनमध्ये
  मॅप करते. `admin` रिअल्म भूमिका आवश्यक करण्यासाठी, या क्लायंटसाठी असा
  प्रोटोकॉल मॅपर कॉन्फिगर करा जो त्याच्या **ID टोकनमध्ये**
  `realm_access.roles` समाविष्ट करतो; त्यानंतर `oidcAdmissionClaim` चे मूल्य
  `{ "path": "realm_access.roles", "values": ["admin"] }` असे सेट करा.
  केवळ भूमिकेवर आधारित प्रवेश सक्षम करण्यापूर्वी या क्लायंटचा प्रत्यक्ष
  ID-टोकन क्लेम तपासा; ॲप्लिकेशन ऍक्सेस-टोकन भूमिका वाचत नाही. IdP स्तरावरील
  टोकन नकार या ॲप्लिकेशन-स्तरीय तपासणीला पूरक ठरू शकतो, परंतु तिची जागा घेऊ
  शकत नाही.
- यश मिळाल्यास, पासवर्ड लॉगिनद्वारे जारी केला जाणारा 30-दिवसांचा **अगदी तोच**
  `auth_token` JWT (`src/app/api/auth/login/route.ts`) तयार केला जातो, त्यामुळे
  डॅशबोर्डच्या उर्वरित सत्र प्रक्रियेत (स्वयं-रीफ्रेश, कुकी फ्लॅग्स) कोणताही
  बदल होत नाही — OIDC केवळ कुकी कशी तयार होते हे बदलते, ती कोणते अधिकार देते
  हे नाही. IdP भूमिका/गटांमधील बदलांमुळे विद्यमान OmniRoute सत्रे अवैध होत
  नाहीत; लॉगआउट, पासवर्ड बदल किंवा सत्राची मुदत संपणे यांनुसारच त्यांचा
  कालावधी नियंत्रित होतो.
- प्रत्येक `oidc*` सेटिंग (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) हे
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) मध्ये आहे:
  विनंतीच्या बॉडीमध्ये व्यवस्थापन पासवर्ड `currentPassword` म्हणून दिलेला
  नसल्यास `PATCH /api/settings` हे `400 PASSWORD_REQUIRED` प्रतिसाद देते
  (तो चुकीचा असल्यास `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin`
  पासवर्डद्वारे होणारे _लॉगिन_ (`POST /api/auth/login`) नाकारते, परंतु
  संग्रहित पासवर्ड हॅश कायम ठेवते आणि पुनर्प्रमाणीकरण करताना अजूनही
  `currentPassword` त्याच्याशी पडताळला जातो.
- `corsOrigins` आणि `bruteForceProtection` हेदेखील
  `SECURITY_IMPACTING_SETTINGS_KEYS` मध्ये आहेत: यांपैकी कोणतेही शिथिल केल्यास
  लॉगिन सुरक्षा कमकुवत होते, त्यामुळे त्यांनाही त्याच `currentPassword`
  पुनर्प्रमाणीकरणाची आवश्यकता असते (सुरक्षा टॅब त्याची मागणी करतो) आणि JSON
  आयात त्यांना वगळते.
- प्रत्येक सुरक्षा-धोरण की — `SECURITY_IMPACTING_SETTINGS_KEYS` मधील नोंदी,
  प्रत्येक `oidc*` की आणि डॅशबोर्ड सत्र स्थिती — `PATCH /api/settings` वर
  **केवळ ऑपरेटरसाठी** आहे: योग्य `currentPassword` पाठवला असला तरी
  `manage`-स्कोप असलेली API की किंवा `oma_` ऍक्सेस टोकन `403` सह नाकारले
  जाते आणि हा नकार `reason: OPERATOR_REQUIRED` सह `settings.update_failed`
  म्हणून ऑडिट केला जातो
  (`src/lib/api/operatorCredential.ts` मधील `requireOperatorCredential()`).
  सामान्य सेटिंग्ज (थीम, प्रदर्शन प्राधान्ये) `manage` की किंवा `admin`
  ऍक्सेस टोकनद्वारे बदलता येतात. `/api/settings` वरील प्रत्येक बदल करणाऱ्या
  विनंतीसाठी (तसेच `/api/settings/require-login` वरील अशा विनंतीसाठी)
  `admin` ऍक्सेस-टोकन स्कोपही आवश्यक आहे
  (`src/server/authz/accessScopes.ts` मधील `ADMIN_MUTATION_EXACT_PATHS`,
  अचूक-पथ जुळणी); `GET` साठी `read` कायम राहते आणि इतर
  `/api/settings/*` उप-मार्गांसाठी (प्रॉक्सी, कॉम्बो डीफॉल्ट्स, मॉडेल उपनावे,
  कॉम्प्रेशन, पर्जेस…) पद्धतीवरून निर्धारित होणारा `write` स्कोप कायम राहतो.
- `POST /api/settings/import-json` हे पुनर्प्रमाणीकरण वगळते, त्यामुळे लिहिण्यापूर्वी
  ते `IMPORT_STRIPPED_SETTINGS_KEYS` (त्याच फाइलमधील) मधील प्रत्येक की
  वगळते: पासवर्ड आणि `currentPassword`, प्रत्येक
  `SECURITY_IMPACTING_SETTINGS_KEYS` नोंद आणि डॅशबोर्ड सत्र स्थिती
  (`sessionsValidAfter`, `revokedDashboardSessions`). त्यामुळे जुना बॅकअप
  आयात केल्याने पासवर्ड बदल किंवा साइन-आउटमुळे आधीच समाप्त झालेले सत्र पुन्हा
  सक्रिय होऊ शकत नाही.

## राउट वर्ग

`src/server/authz/types.ts` तीन वर्ग परिभाषित करतो; जो राउट निश्चितपणे वर्गीकृत करता येत नाही तो `MANAGEMENT` वर परत जातो.

| वर्ग         | वर्णन                                                                                                                                                  | आवश्यक प्रमाणीकरण                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `PUBLIC`     | स्पष्टपणे सुरक्षित राउट — लॉगिन, लॉगआउट, स्थिती, init, health, onboarding bootstrap.                                                                   | काहीही नाही                                                      |
| `CLIENT_API` | मॉडेल-सर्व्हिंग एंडपॉइंट्स — `/api/v1/*`, `/api/v1beta/*`, तसेच उपनावे `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | प्रभावी `REQUIRE_API_KEY` फीचर फ्लॅग सक्षम असेल तेव्हा Bearer की |
| `MANAGEMENT` | डॅशबोर्ड पृष्ठे, सेटिंग्ज, प्रदाते, की, प्रशासन आणि डायग्नोस्टिक्स एंडपॉइंट्स.                                                                         | डॅशबोर्ड सत्र किंवा `manage` स्कोप असलेला Bearer                 |

काही `MANAGEMENT` क्रिया **केवळ-ऑपरेटर** आहेत: `manage` की पुरेशी नाही. साठवलेल्या क्रेडेंशियल्सची निर्यात
(`GET /api/settings/export-json`, `GET /api/db-backups/export`,
`GET /api/db-backups/exportAll`), थेट डेटावर बॅकअप रिस्टोअर
(`POST /api/db-backups/import` यात `dryRun=true` समाविष्ट, `POST /api/db-backups` id द्वारे रिस्टोअर,
`POST /api/settings/import-json`), रिस्टोअर पॉइंट्स नष्ट करणे (`DELETE /api/db-backups` सफाई,
आणि `PATCH /api/db-backups` कारण ते जतन करत असलेली retention प्रत्येक बॅकअपनंतर आपोआप prune करते) —
या सर्वांसाठी डॅशबोर्ड सत्र, स्थानिक CLI subject, किंवा लॉगिन अक्षम असणे आवश्यक आहे. sync टोकन जारी करणे
(`POST /api/sync/tokens`) आणि `admin` CLI एक्सेस टोकन तयार करणे (`POST /api/cli/tokens`) प्रत्येक लॉगिन
मोडमध्ये डॅशबोर्ड सत्र किंवा स्थानिक CLI subject मागतात. कोणत्याही स्कोपच्या API की आणि `oma_` एक्सेस टोकन
ऑपरेटर क्रेडेंशियल नाहीत: जेव्हा असे क्रेडेंशियल आवश्यक असते तेव्हा त्यांना `403` मिळते. ही तपासणी
`src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` /
`requireOperatorCredential()`) मध्ये आहे. लॉगिन सेटिंग्ज बदलणेही केवळ-ऑपरेटर आहे:
`POST /api/settings/require-login` (व्यवस्थापन पासवर्ड सेट करा / `requireLogin` टॉगल करा) एकदा पासवर्ड अस्तित्वात
असेल की फक्त तेच क्रेडेंशियल्स स्वीकारतो — पहिल्या-वेळच्या बूटस्ट्रॅप खिडकीत (पासवर्ड नसताना) काहीही बदलत नाही —
आणि डॅशबोर्ड सत्राने पासवर्ड बदलण्यासाठी `currentPassword` पाठवणे आवश्यक आहे (गहाळ किंवा चुकीचा असल्यास
`403`, `settings.update_failed` म्हणून ऑडिट). स्थानिक CLI आणि लॉगिन-अक्षम इन्स्टन्स रिकव्हरी मार्ग राखतात आणि
त्याशिवाय पासवर्ड सेट करू शकतात, कारण दोघेही डेटा डिरेक्टरीचा मालक असलेल्या होस्टशी बांधलेले आहेत.

## पाइपलाइन

```
येणारी विनंती → src/proxy.ts
  → src/server/authz/pipeline.ts मधील runAuthzPipeline()
    1. विश्वासार्ह अंतर्गत हेडर काढून टाका (x-omniroute-auth-*, x-omniroute-route-class)
    2. विनंती आयडी तयार करा, classifyRoute() द्वारे मार्गाचे वर्गीकरण करा
    3. pathname == "/" असल्यास → /dashboard कडे पुनर्निर्देशित करा
    4. ड्रेनिंग सुरू असल्यास (सुरक्षित शटडाउन) आणि /api/* असल्यास → 503
    5. non-GET /api/* असल्यास → checkBodySize() गार्ड
    6. OPTIONS असल्यास → CORS प्रीफ्लाइट 204
    7. options.enforce == false असल्यास → route-class हेडरसह पुढे पाठवा
    8. अन्यथा: POLICIES[routeClass].evaluate(ctx)
       - परवानगी  → x-omniroute-auth-{kind,id,label,scopes} मुद्रांकित करा → NextResponse.next()
       - नकार → correlation_id सह JSON त्रुटी (डॅशबोर्ड पृष्ठे → 302 /login)
```

विश्वासार्ह अंतर्गत हेडर (`src/server/authz/headers.ts` मध्ये परिभाषित) वर्गीकरणापूर्वी **येणाऱ्या विनंत्यांमधून काढून टाकले जातात** — एखाद्या सब्जेक्टचे प्रतिरूपण करण्यासाठी क्लायंट `x-omniroute-auth-*` आधीच भरू शकत नाहीत.

### पॉलिसी करार

प्रत्येक मार्ग वर्गाची `src/server/authz/policies/` मध्ये एक पॉलिसी आहे:

- **`publicPolicy`** (`policies/public.ts`) — नेहमी `allow({ kind: "anonymous", id: "anonymous" })` परत करते.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer काढते आणि `validateApiKey()` द्वारे त्याची पडताळणी करते. प्रभावी `REQUIRE_API_KEY` फीचर फ्लॅग अक्षम असतानाच निनावी प्रवेशाची अनुमती देते. प्रभावी फ्लॅग `isRequireApiKeyEnabled()` (`DB फीचर फ्लॅग ओव्हरराइड > process.env.REQUIRE_API_KEY > डीफॉल्ट`) द्वारे निर्धारित केला जातो, त्यामुळे डॅशबोर्ड फीचर फ्लॅग आणि पर्यावरणीय चल `/api/v1/*`, `/api/v1beta/*` आणि त्यांच्या उपनावांवर सुसंगतपणे नियंत्रण ठेवतात; रिझॉल्वर अयशस्वी झाल्यास प्रवेश नाकारला जातो. क्लायंट API मार्गांवर डॅशबोर्ड-सत्र विनंत्यांना अनुमती देते (डॅशबोर्ड मॉडेल कॅटलॉगद्वारे वापरल्या जाणाऱ्या `/api/v1/models` सह).
- **`managementPolicy`** (`policies/management.ts`) — डॅशबोर्ड सत्र, अंतर्गत मॉडेल-सिंक विनंत्या (`/api/providers/[name]/(sync-models|models)` शी जुळणाऱ्या) स्वीकारते किंवा `isAuthRequired()` ने false परत केल्यास पूर्णपणे वगळते. Bearer टोकन उपस्थित पण अवैध असल्यास 403 (`AUTH_001`), अन्यथा 401 परत करते. कोणत्याही प्रमाणीकरण शाखेपूर्वी route-guard स्तरही (LOCAL_ONLY / ALWAYS_PROTECTED) लागू करते — [मार्ग गार्ड स्तर](../security/ROUTE_GUARD_TIERS.md) पहा. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` मधील LOCAL_ONLY पथ (सध्या: `/api/mcp/`) Bearer कीमध्ये `manage` स्कोप असल्यास non-loopback वरून वापरता येतात; स्कोप कोणताही असला तरी इतर सर्व LOCAL_ONLY पथांसाठी strict-loopback बंधन कायम राहते.

यशस्वी पॉलिसी `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` असलेला `AuthSubject` परत करते. प्रमाणीकरण लॉजिक पुन्हा चालवण्याऐवजी डाउनस्ट्रीम हँडलर `src/server/authz/assertAuth.ts` मधील `assertAuth(request, "CLIENT_API")` द्वारे तो वाचू शकतात.

## सार्वजनिक रूट्सची सूची

`src/shared/constants/publicApiRoutes.ts` ही स्पष्ट अनुमतीसूची आहे:

सूची **आकारानुसार** विभागलेली आहे आणि हे विभाजन अत्यावश्यक आहे (GHSA-74g9-q8f6-793h): उपसर्गाची जुळवणी
`startsWith()` वापरून केली जाते, त्यामुळे समान सुरुवातीची अक्षरे असणाऱ्या प्रत्येक लगतच्या पथाशीही तो जुळतो.
उपसर्ग म्हणून `/api/usage/om-usage` मुळे `/api/usage/om-usage<anything>` हे PUBLIC म्हणून चिन्हांकित झाले आणि Next त्याचे
निराकरण `/api/usage/[connectionId]` असे करतो — हा असा हँडलर आहे ज्याचे स्वतःचे प्रमाणीकरण नाही.

```ts
// वास्तविक उपवृक्ष. प्रत्येक नोंद "/" ने संपलीच पाहिजे (युनिट चाचणीद्वारे पडताळले जाते).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify मध्ये CLIENT_API म्हणून हाताळले जाते, "no-auth public" म्हणून नाही
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// स्वतंत्र रूट्स, ज्यांची तंतोतंत जुळवणी केली जाते (शेवटी स्लॅश असो वा नसो).
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

// केवळ-वाचन स्वतंत्र रूट्स, ज्यांना CORS origin शिथिलताही लागू होते.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS शिथिलतेशिवाय केवळ-वाचन स्वतंत्र रूट.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

केवळ-वाचन रूट्स हे फक्त सुरक्षित पद्धतींसाठी **सार्वजनिक** असतात. नोंद: `classifyRoute()` हे `/api/v1/*` आणि `/api/v1beta/*` यांना PUBLIC फॉल-थ्रूमधून वगळते — ते नेहमी `CLIENT_API` असतात, त्यामुळे Bearer-की धोरण लागू राहते.

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

## Auth Required टॉगल

`src/shared/utils/apiAuth.ts` मधील `isAuthRequired()` ठरवतो की विनंतीसाठी **कोणताही** प्रमाणीकरण लागू करायचा का:

- `settings.requireLogin === false` → प्रमाणीकरण जागतिक स्तरावर अक्षम आहे, फक्त नेहमी-संरक्षित टियर (पहा [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) आणि जे कॉल्स ते स्वीकारते ते क्रेडेंशियल देतात त्यांच्याशिवाय, आणि त्यांना लॉगिन चालू असतानाचेच क्रेडेंशियल लागते: sync टोकन जारी करणे, कोणत्याही स्कोपवर CLI एक्सेस टोकन तयार करणे, आणि `manage`/`admin` स्कोप असलेली API की तयार करणे, की ला तो स्कोप देणे, किंवा अशी की पुन्हा तयार करणे किंवा उघड करणे (`src/lib/api/requireManagementAuth.ts` मधील `requireCredentialForManagementScopedKey()`). केवळ-inference की खुल्या राहतात.
- कोणताही पासवर्ड कॉन्फिगर नाही **आणि** `INITIAL_PASSWORD` env var नाही → bootstrap मोड onboarding wizard आणि loopback विनंत्यांना परवानगी देतो, पण उघड नेटवर्क विनंत्यांना अजूनही क्रेडेंशियल्स लागतात.
- कोणतीही DB त्रुटी → बंद होऊन अपयशी (डीफॉल्टनेच सुरक्षित).

क्लायंट API की अंमलबजावणी `src/shared/utils/featureFlags.ts` मधील `isRequireApiKeyEnabled()` वापरते, थेट `process.env.REQUIRE_API_KEY` वाचत नाही. तैनात इन्स्टन्ससाठी हे महत्त्वाचे आहे: डॅशबोर्ड → Feature Flags मध्ये `REQUIRE_API_KEY` टॉगल केल्याने DB override साठवला जातो आणि तो लगेच `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, आणि या हेल्परचा वापर करणाऱ्या इतर क्लायंट-API प्रमाणीकरण तपासण्यांवर परिणाम करतो. फीचर फ्लॅग स्टोअर वाचता आला नाही तर क्लायंट API प्रमाणीकरण बंद होऊन अपयशी ठरते आणि की आवश्यक करते.

## ब्रेकिंग बदल — v3.8.0

`/api/v1/agents/tasks/*` आणि `/api/resilience/model-cooldowns` एंडपॉइंट्सना **आता व्यवस्थापन प्रमाणीकरण आवश्यक आहे** (कमिट `588a0333`). पूर्वी `manage` स्कोपशिवाय सामान्य API की पाठवणाऱ्या क्लायंटना `403` मिळतो. स्थलांतर: एकतर API Keys डॅशबोर्डमध्ये कीला `manage` स्कोप द्या किंवा लॉग-इन केलेले डॅशबोर्ड सत्र वापरा.

## वर्तनातील बदल — v3.8.2

`/api/mcp/*` (रिमोट MCP सर्व्हर) अजूनही डीफॉल्टनुसार LOCAL_ONLY आहे, परंतु `Authorization: Bearer <api-key>` हेडरमध्ये `manage` स्कोप असल्यास तो आता लूपबॅक नसलेल्या विनंत्या स्वीकारतो. हा अपवाद `src/server/authz/routeGuard.ts` मधील `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` द्वारे प्रत्येक पाथसाठी स्पष्टपणे नियंत्रित केला जातो; संबंधित LOCAL_ONLY प्रीफिक्स `/api/cli-tools/runtime/*` हेतुपुरस्सर बायपास करता येत नाही, कारण तो कोणत्याही प्रकारच्या सबप्रोसेसेस सुरू करू शकतो. लूपबॅक नसलेल्या स्त्रोतांकडून `/api/mcp/*` कडे येणाऱ्या अनामिक विनंत्यांना पुढेही `403 LOCAL_ONLY` मिळतो — कोणत्याही नवीन LOCAL_ONLY पाथसाठी डीफॉल्ट नियम कठोर-लूपबॅकच राहतो. [रूट गार्ड स्तर](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) पहा.

## चाचणी

- युनिट चाचण्या: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- सार्वजनिक अनुमतसूची: `tests/unit/public-api-routes.test.ts`.
- लक्ष केंद्रित करून चालवा: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## डीबगिंग

पाइपलाइन प्रतिसादांवर नेहमी खालील शिक्के लावते:

```
x-request-id:               <सहसंबंध आयडी, त्रुटीच्या मजकुरात पुन्हा दर्शविला जातो>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

प्रमाणीकृत विनंत्यांसाठी, अपस्ट्रीम (हँडलर-बाजूच्या) विनंती हेडर्समध्ये पुढील गोष्टीदेखील समाविष्ट असतात:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<शेवटचे-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (पर्यायी)
x-omniroute-auth-scopes:    स्वल्पविरामाने विभक्त केलेली सूची
```

हँडलर्समध्ये `assertAuth(req, expectedClass)` वापरा — मिडलवेअर वगळले गेले असल्यास ते `AUTHZ_NOT_INITIALIZED` कोडसह `AuthzAssertionError` फेकते (चाचण्यांमधील कॉन्फिगरेशन रिग्रेशन्स शोधण्यासाठी उपयुक्त).

## हे देखील पहा

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — प्रत्येक एंडपॉइंटसाठी प्रमाणीकरण मार्कर
- [COMPLIANCE.md](../security/COMPLIANCE.md) — प्रमाणीकरण घटनांसाठी ऑडिट लॉग
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — तीन स्कोप नेमस्पेस आणि MCP टूल-स्कोप कॅटलॉग
- स्रोत: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
