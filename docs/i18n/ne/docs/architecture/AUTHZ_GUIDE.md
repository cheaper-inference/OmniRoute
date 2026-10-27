# Authorization Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **सत्यको स्रोत:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **अन्तिम पटक अद्यावधिक गरिएको:** 2026-09-22 — स्कोप नेमस्पेसहरूले MCP-SERVER.md लाई संकेत गर्दछ

ओम्नीराउटसँग रुट-सचेत प्राधिकरण पाइपलाइन छ जसले प्रत्येक API अनुरोधलाई नियन्त्रण गर्दछ। वर्गीकरण **निर्धारित** र **फेल-क्लोज्ड** हुन्छ — वर्गीकरण गर्न नसकिने कुनै पनि कुरा `MANAGEMENT` को रूपमा समाप्त हुन्छ र सत्र वा व्यवस्थापन-ग्रेड टोकनको माग गर्दछ। यो पृष्ठले रुटहरू मर्मत गर्ने वा नयाँ एन्डपोइन्टहरू डिजाइन गर्ने इन्जिनियरहरूका लागि मोडेलको व्याख्या गर्दछ।

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> स्रोत: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## दुई प्रमाणीकरण मोडहरू

### 1. API कुञ्जी (Bearer)

OpenAI/Anthropic/Gemini-संगत क्लाइन्ट API हरू र कुञ्जीसँग `manage` स्कोप हुँदा केही व्यवस्थापन रुटहरूका लागि प्रयोग गरिन्छ।

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` मा रहेको `isValidApiKey()` / `extractApiKey()` द्वारा प्रमाणीकरण गरिन्छ र `src/shared/utils/apiAuth.ts` मार्फत पुनः निर्यात गरिन्छ। प्रमाणीकरणकर्ताले `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` वातावरण चरहरूलाई स्थायी पासथ्रु कुञ्जीका रूपमा पनि स्वीकार गर्छ (समस्या #1350)।

### 2. ड्यासबोर्ड सत्र (auth_token कुकी)

ड्यासबोर्ड पृष्ठहरू र प्रशासकीय कार्यहरूका लागि।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT प्रमाणित हुँदा **र** त्यसमा `authenticated: true` हुँदा मात्र कुकीलाई सत्र मानिन्छ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। कुकी प्रयोग गर्ने प्रत्येक
उपभोक्ता (ड्यासबोर्ड रुट गार्ड (`isDashboardSessionAuthenticated()`), authz पाइपलाइन रिफ्रेस, WebSocket ह्यान्डशेक, लाइभ
सर्भर, `/api/settings/require-login`, `/api/auth/status`) उक्त हेल्परमार्फत जान्छ।
`JWT_SECRET` द्वारा हस्ताक्षर गरिएका अन्य JWT हरू पनि छन् — Cursor CLI पासथ्रुले
कुञ्जी धारकहरूका लागि `iss "omniroute" / aud "cursor-cli"` टोकनहरू जारी गर्छ — र तिनलाई कहिल्यै सत्र मानिँदैन
(#13298)।

`src/shared/utils/apiAuth.ts` मा रहेको `isDashboardSessionAuthenticated()` द्वारा प्रमाणित गरिन्छ। JWT को 30-दिने जीवनकालमा 7 दिनभन्दा कम समय बाँकी हुँदा पाइपलाइनले यसलाई स्वतः रिफ्रेस गर्छ।

सत्र यसको 30 दिन पूरा हुनुअघि पनि समाप्त हुन सक्छ, किनकि प्रत्येक टोकन जारी गर्ने प्रक्रिया `mintDashboardSessionToken` मार्फत जान्छ (जारी गरिएको समय `iat` र आईडी `jti`) र प्रमाणितकर्ताले दुई सेटिङहरू जाँच गर्छ: `sessionsValidAfter`, जुन पासवर्ड परिवर्तन गर्दा सेट गरिन्छ, जसका कारण त्यसअघि जारी गरिएका सबै सत्रहरू प्रमाणित हुन छाड्छन् (पासवर्ड परिवर्तन गरेको ब्राउजरले नयाँ कुकी प्राप्त गर्छ), र `revokedDashboardSessions`, जसमा `POST /api/auth/logout` ले साइन आउट गरिएको सत्रको `jti` थप्छ। पुरानो रिलिजद्वारा जारी गरिएका सत्रहरूमा यीमध्ये कुनै पनि क्लेम हुँदैन र पहिलो पासवर्ड परिवर्तन नभएसम्म मान्य रहन्छन्। सेटिङहरू पढ्न नसकिएमा सत्रलाई विश्वसनीय मानिँदैन।

केही व्यवस्थापन रुटहरूले **दुवैमध्ये कुनै एक** मोड स्वीकार गर्छन्: कुकी वा API कुञ्जीसँग `manage` (वा `admin`) स्कोप हुँदा `Bearer <key>`। यसैले v3.8 मा थपिएको "API कलहरूमार्फत कन्फिगर गर्न मिल्ने" कार्यप्रवाह सम्भव बनाउँछ।

#### वैकल्पिक OIDC लगइन गेट (#6973)

ड्यासबोर्ड प्रशासक लगइनले पूर्वनिर्धारित पासवर्ड लगइनसँगै **ऐच्छिक रूपमा सक्रिय गर्न मिल्ने** OIDC (OpenID Connect) प्रवाहलाई पनि समर्थन गर्छ — पासवर्ड लगइन कहिल्यै हटाइँदैन, केवल
पूरक बनाइन्छ:

- `settings.oidcEnabled === true` **र** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` सबै कन्फिगर गरिएका (Settings → Auth) नभएसम्म
  असक्षम रहन्छ। अन्यथा `GET /api/auth/oidc/login` ले `400` फर्काउँछ।
- `GET /api/auth/oidc/login` ले issuer को
  `/.well-known/openid-configuration` बाट `authorization_endpoint` पत्ता लगाउँछ
  (`<issuer>/authorize` मा फलब्याक गर्छ), आगमन अनुरोधबाट redirect URI निर्माण गर्छ
  (`x-forwarded-proto`-aware), र `httpOnly` `oidc_state` cookie मा भण्डारण गरिएको
  अनियमित `state` सहित IdP मा रिडाइरेक्ट गर्छ।
- `GET /api/auth/oidc/callback` ले `state` प्रमाणीकरण गर्छ, authorization
  code साट्छ, र `issuer`/`audience` जाँचहरूसहित issuer को JWKS मार्फत ID token को
  signature प्रमाणित गर्छ (`jose` को `createRemoteJWKSet`, प्रत्येक JWKS URI का
  लागि क्यास गरिएको)। Dashboard प्रवेशका लागि खाली नभएको `oidcAllowedSubjects`
  सूची, एउटा `oidcAdmissionClaim` नीति, वा दुवै आवश्यक हुन्छन्। Subject सूचीले
  `sub` वा `email` सँग `email_verified === true` भएको अवस्थामा मात्र मेल खान्छ।
  वैकल्पिक claim नीतिले dot-separated ID-token claim path (उदाहरणका लागि,
  `realm_access.roles`) र स्वीकार गरिएका मानहरूको array लिन्छ; resolve गरिएको
  claim कम्तीमा एउटा स्वीकार गरिएको मान समावेश गर्ने strings को array हुनुपर्छ।
  दुवै नीति कन्फिगर गरिएका छन् भने, दुवै उत्तीर्ण हुनुपर्छ। हराएका वा malformed
  claims बन्द रहने गरी असफल हुन्छन्, र कुनै पनि नीति नभएमा callback ले login
  अस्वीकार गर्छ (`not_configured`)। विद्यमान subject-only कन्फिगरेसनहरू अपरिवर्तित
  रूपमा जारी रहन्छन्।
- Keycloak ले सामान्यतया realm roles लाई access tokens मा map गर्छ, ID
  tokens मा अनिवार्य रूपमा होइन। Realm role `admin` आवश्यक बनाउन, यस client का
  लागि एउटा protocol mapper कन्फिगर गर्नुहोस् जसले आफ्नो **ID token** मा
  `realm_access.roles` समावेश गर्छ, त्यसपछि `oidcAdmissionClaim` लाई
  `{ "path": "realm_access.roles", "values": ["admin"] }` मा सेट गर्नुहोस्।
  Role-only प्रवेश सक्षम गर्नुअघि यस client को वास्तविक ID-token claim जाँच
  गर्नुहोस्; application ले access-token roles पढ्दैन। IdP-side token
  अस्वीकृतिले यो application-side जाँचलाई पूरक बनाउन सक्छ तर प्रतिस्थापन गर्दैन।
- सफल भएपछि यसले password login ले जारी गर्ने **ठ्याक्कै उही** 30-day
  `auth_token` JWT जारी गर्छ (`src/app/api/auth/login/route.ts`), त्यसैले dashboard
  session pipeline को बाँकी भाग (auto-refresh, cookie flags) अपरिवर्तित रहन्छ —
  OIDC ले cookie कसरी जारी हुन्छ भन्ने मात्र प्रतिस्थापन गर्छ, त्यसले के पहुँच
  प्रदान गर्छ भन्ने होइन। IdP roles/groups मा गरिएका परिवर्तनहरूले विद्यमान
  OmniRoute sessions अमान्य बनाउँदैनन्; logout, password rotation, वा session
  expiry ले नै अझै तिनको जीवनकाल नियन्त्रण गर्छन्।
- प्रत्येक `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) मा छ: body ले management
  password लाई `currentPassword` का रूपमा नपठाएसम्म `PATCH /api/settings` ले
  `400 PASSWORD_REQUIRED` जवाफ दिन्छ (गलत हुँदा `401 PASSWORD_MISMATCH`)।
  `oidcDisablePasswordLogin` ले password _login_ (`POST /api/auth/login`) अस्वीकार
  गर्छ तर भण्डारण गरिएको password hash कायम राख्छ, र re-auth ले अझै
  `currentPassword` लाई त्यहीसँग जाँच गर्छ।
- `corsOrigins` र `bruteForceProtection` पनि `SECURITY_IMPACTING_SETTINGS_KEYS`
  मा छन्: यीमध्ये कुनैलाई खुकुलो पार्दा login सुरक्षाहरू कमजोर हुन्छन्, त्यसैले
  तिनलाई पनि उही `currentPassword` re-auth आवश्यक हुन्छ (Security tab ले यो
  माग्छ) र JSON import ले तिनलाई हटाउँछ।
- प्रत्येक security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS` का entries,
  प्रत्येक `oidc*` key र dashboard session state — `PATCH /api/settings` मा
  **operator-only** हो: सही `currentPassword` पठाउँदा पनि manage-scoped API key
  वा `oma_` access token अस्वीकार गरिन्छ र `403` फर्काइन्छ, अनि उक्त अस्वीकृति
  `reason: OPERATOR_REQUIRED` सहित `settings.update_failed` का रूपमा audit हुन्छ
  (`src/lib/api/operatorCredential.ts` मा `requireOperatorCredential()`)।
  सामान्य settings (theme, display preferences) `manage` key वा `admin` access
  token बाट लेख्न मिल्ने नै रहन्छन्। `/api/settings` कै प्रत्येक mutation (र
  `/api/settings/require-login` को पनि) लाई `admin` access-token scope समेत
  आवश्यक हुन्छ (`src/server/authz/accessScopes.ts` मा `ADMIN_MUTATION_EXACT_PATHS`,
  exact-path match); `GET` को scope `read` नै रहन्छ, र अन्य `/api/settings/*`
  sub-routes (proxies, combo defaults, model aliases, compression, purges…)
  ले method-inferred `write` scope कायम राख्छन्।
- `POST /api/settings/import-json` ले त्यो re-auth छोड्छ, त्यसैले लेख्नुअघि
  `IMPORT_STRIPPED_SETTINGS_KEYS` (उही file) मा भएको प्रत्येक key हटाउँछ:
  password र `currentPassword`, प्रत्येक `SECURITY_IMPACTING_SETTINGS_KEYS`
  entry, र dashboard session state (`sessionsValidAfter`,
  `revokedDashboardSessions`)। त्यसैले पुरानो backup import गर्दा password
  परिवर्तन वा sign-out ले पहिले नै अन्त्य गरेको session पुनः सक्रिय हुन सक्दैन।

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
आगमन अनुरोध → src/proxy.ts
  → src/server/authz/pipeline.ts मा runAuthzPipeline()
    1. विश्वसनीय आन्तरिक हेडरहरू हटाउने (x-omniroute-auth-*, x-omniroute-route-class)
    2. अनुरोध id उत्पन्न गर्ने, classifyRoute() मार्फत रुट वर्गीकरण गर्ने
    3. यदि pathname == "/" → /dashboard मा रिडाइरेक्ट गर्ने
    4. यदि निकासको प्रक्रियामा (सहज बन्द) छ र /api/* हो → 503
    5. यदि GET बाहेकको /api/* हो → checkBodySize() सुरक्षा जाँच
    6. यदि OPTIONS हो → CORS प्रिफ्लाइट 204
    7. यदि options.enforce == false हो → route-class हेडरसहित जस्ताको तस्तै अगाडि पठाउने
    8. अन्यथा: POLICIES[routeClass].evaluate(ctx)
       - अनुमति  → x-omniroute-auth-{kind,id,label,scopes} अंकित गर्ने → NextResponse.next()
       - अस्वीकार → correlation_id सहितको JSON त्रुटि (ड्यासबोर्ड पृष्ठहरू → 302 /login)
```

विश्वसनीय आन्तरिक हेडरहरू (`src/server/authz/headers.ts` मा परिभाषित) वर्गीकरण गर्नुअघि **आगमन अनुरोधहरूबाट हटाइन्छन्** — क्लाइन्टहरूले कुनै विषयको प्रतिरूपण गर्न `x-omniroute-auth-*` पहिले नै भर्न सक्दैनन्।

### नीति अनुबन्धहरू

प्रत्येक रुट वर्गका लागि `src/server/authz/policies/` मा एउटा नीति छ:

- **`publicPolicy`** (`policies/public.ts`) — सधैँ `allow({ kind: "anonymous", id: "anonymous" })` फर्काउँछ।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer निकाल्छ र `validateApiKey()` मार्फत प्रमाणीकरण गर्छ। प्रभावकारी `REQUIRE_API_KEY` सुविधा फ्ल्याग असक्षम हुँदा मात्र अज्ञात पहुँचमा जान दिन्छ। प्रभावकारी फ्ल्याग `isRequireApiKeyEnabled()` (`DB सुविधा फ्ल्याग अधिलेखन > process.env.REQUIRE_API_KEY > पूर्वनिर्धारित`) मार्फत निर्धारित गरिन्छ, ताकि ड्यासबोर्ड सुविधा फ्ल्यागहरू र वातावरण चरहरूले `/api/v1/*`, `/api/v1beta/*`, र उपनामहरूलाई एकरूप रूपमा नियन्त्रण गरून्; रिजल्भर विफल हुँदा पहुँच बन्द हुन्छ। क्लाइन्ट API रुटहरूमा ड्यासबोर्ड-सत्र अनुरोधहरूलाई अनुमति दिन्छ (`/api/v1/models` सहित, जुन ड्यासबोर्ड मोडेल क्याटलगले प्रयोग गर्छ)।
- **`managementPolicy`** (`policies/management.ts`) — ड्यासबोर्ड सत्र, आन्तरिक मोडेल-सिङ्क अनुरोधहरू (`/api/providers/[name]/(sync-models|models)` सँग मिलान गरिएका) स्वीकार गर्छ, वा `isAuthRequired()` ले false फर्काएमा पूर्ण रूपमा छोड्छ। Bearer टोकन उपस्थित तर अमान्य हुँदा 403 (`AUTH_001`), अन्यथा 401 फर्काउँछ। यसले कुनै पनि प्रमाणीकरण शाखाअघि रुट-गार्ड तहहरू (LOCAL_ONLY / ALWAYS_PROTECTED) पनि लागू गर्छ — [रुट गार्ड तहहरू](../security/ROUTE_GUARD_TIERS.md) हेर्नुहोस्। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` मा रहेका LOCAL_ONLY पथहरू (हाल: `/api/mcp/`) लाई Bearer कुञ्जीमा `manage` स्कोप हुँदा गैर-लुपब्याकबाट पहुँच गर्न सकिन्छ; अन्य सबै LOCAL_ONLY पथहरू स्कोप जेसुकै भए पनि कडाइका साथ लुपब्याकमा मात्र सीमित रहन्छन्।

सफल नीतिले `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` भएको `AuthSubject` फर्काउँछ। डाउनस्ट्रिम ह्यान्डलरहरूले प्रमाणीकरण तर्क पुनः सञ्चालन गर्नुको सट्टा `src/server/authz/assertAuth.ts` मा रहेको `assertAuth(request, "CLIENT_API")` मार्फत यसलाई पढ्न सक्छन्।

## सार्वजनिक रुटहरूको सूची

`src/shared/constants/publicApiRoutes.ts` स्पष्ट अनुमति-सूची हो:

सूचीलाई **आकार** अनुसार विभाजन गरिएको छ, र यो विभाजन अत्यावश्यक छ (GHSA-74g9-q8f6-793h): कुनै prefix लाई
`startsWith()` मार्फत मिलाइन्छ, त्यसैले यसले उही प्रारम्भिक अक्षरहरू भएका प्रत्येक छेउछाउका path लाई पनि मिलाउँछ।
prefix का रूपमा रहेको `/api/usage/om-usage` ले `/api/usage/om-usage<anything>` लाई PUBLIC बनायो, र Next ले
त्यसलाई `/api/usage/[connectionId]` मा resolve गर्छ — आफ्नै auth नभएको handler।

```ts
// वास्तविक subtree हरू। प्रत्येक entry "/" मा अन्त्य हुनैपर्छ (unit test द्वारा सुनिश्चित गरिएको)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify मा CLIENT_API का रूपमा व्यवहार गरिन्छ, "no-auth public" का रूपमा होइन
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// एकल route हरू, ठ्याक्कै मिलाइने (अन्त्यमा slash भए वा नभए पनि)।
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

// CORS origin छुटसमेत प्राप्त गर्ने read-only एकल route हरू।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS छुटबिनाको read-only एकल route।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

सुरक्षित method हरूका लागि **मात्र** read-only route हरू सार्वजनिक हुन्छन्। ध्यान दिनुहोस्: `classifyRoute()` ले `/api/v1/*` र `/api/v1beta/*` लाई PUBLIC fall-through बाट अलग गर्छ — ती सधैँ `CLIENT_API` हुन्छन्, जसले गर्दा Bearer-key policy अझै लागू हुन्छ।

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

## डिबगिङ

पाइपलाइनले प्रतिक्रियाहरूमा सधैं निम्न हेडरहरू राख्छ:

```
x-request-id:               <सहसम्बन्ध ID, त्रुटि बडीहरूमा दोहोर्याइने>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

प्रमाणीकृत अनुरोधहरूका लागि अपस्ट्रिम (ह्यान्डलर-पक्षका) अनुरोध हेडरहरूमा निम्न पनि समावेश हुन्छन्:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (वैकल्पिक)
x-omniroute-auth-scopes:    अल्पविरामद्वारा छुट्याइएको सूची
```

ह्यान्डलरहरूभित्र `assertAuth(req, expectedClass)` प्रयोग गर्नुहोस् — यदि मिडलवेयरलाई बाइपास गरिएको थियो भने यसले `AUTHZ_NOT_INITIALIZED` कोडसहित `AuthzAssertionError` थ्रो गर्छ (परीक्षणहरूमा कन्फिगरेसन रिग्रेसनहरू पत्ता लगाउन उपयोगी हुन्छ)।

## यो पनि हेर्नुहोस्

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — प्रति एन्डपोइन्ट प्रमाणीकरण मार्कर
- [COMPLIANCE.md](../security/COMPLIANCE.md) — प्रमाणीकरण घटनाहरूको लागि अडिट लग
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — तीन स्कोप नेमस्पेसहरू र MCP उपकरण-स्कोप क्याटलग
- स्रोत: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
