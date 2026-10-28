# Authorization Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **معلومات کا ماخذ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-09-22 — اسکوپ نیم اسپیسز MCP-SERVER.md کی طرف اشارہ کرتے ہیں

OmniRoute کے پاس ایک روٹ-آگاہ اجازت پائپ لائن ہے جو ہر API درخواست کو روکتی ہے۔ درجہ بندی **مقرر** اور **فیل-کلوزڈ** ہے — کوئی بھی چیز جس کی درجہ بندی نہیں کی جا سکتی وہ `MANAGEMENT` کے طور پر ختم ہوتی ہے اور ایک سیشن یا مینجمنٹ-گریڈ ٹوکن کا مطالبہ کرتی ہے۔ یہ صفحہ ان انجینئرز کے لیے ماڈل کی وضاحت کرتا ہے جو روٹس کو برقرار رکھتے ہیں یا نئے اینڈ پوائنٹس ڈیزائن کرتے ہیں۔

![AuthZ پائپ لائن (3 روٹ کلاسز + پالیسی کی تشخیص)](../diagrams/exported/authz-pipeline.svg)

> ماخذ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## تصدیق کے دو طریقے

### 1. API کلید (Bearer)

OpenAI/Anthropic/Gemini سے مطابقت رکھنے والے کلائنٹ APIs اور چند انتظامی روٹس کے لیے استعمال ہوتا ہے، جب کلید کے پاس `manage` اسکوپ ہو۔

```
Authorization: Bearer <api-key>
```

اس کی توثیق `src/sse/services/auth.ts` میں موجود `isValidApiKey()` / `extractApiKey()` کے ذریعے کی جاتی ہے اور اسے `src/shared/utils/apiAuth.ts` کے ذریعے دوبارہ برآمد کیا جاتا ہے۔ توثیق کار `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ماحول کے متغیرات کو مستقل پاس تھرو کلیدوں کے طور پر بھی قبول کرتا ہے (مسئلہ #1350)۔

### 2. ڈیش بورڈ سیشن (auth_token کوکی)

ڈیش بورڈ صفحات اور انتظامی کارروائیوں کے لیے۔

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

کوکی صرف اسی وقت سیشن ہوتی ہے جب JWT کی توثیق ہو **اور** اس میں `authenticated: true` موجود ہو
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)۔ کوکی استعمال کرنے والا ہر
جزو (ڈیش بورڈ روٹ گارڈ (`isDashboardSessionAuthenticated()`)، اجازت دہی پائپ لائن ریفریش، WebSocket ہینڈ شیک، لائیو
سرور، `/api/settings/require-login`، `/api/auth/status`) اسی ہیلپر سے گزرتا ہے۔
`JWT_SECRET` کے ساتھ دستخط شدہ دیگر JWTs بھی موجود ہیں — Cursor CLI پاس تھرو، کلید رکھنے والوں کے لیے
`iss "omniroute" / aud "cursor-cli"` ٹوکن جاری کرتا ہے — اور وہ کبھی سیشن نہیں ہوتے
(#13298)۔

اس کی توثیق `src/shared/utils/apiAuth.ts` میں موجود `isDashboardSessionAuthenticated()` کے ذریعے کی جاتی ہے۔ جب JWT کی 30 روزہ مدت میں 7 دن سے کم وقت باقی رہ جائے تو پائپ لائن اسے خودکار طور پر ریفریش کر دیتی ہے۔

کوئی سیشن اپنی 30 روزہ مدت مکمل ہونے سے پہلے بھی ختم ہو سکتا ہے، کیونکہ ہر جاری کنندہ `mintDashboardSessionToken` سے گزرتا ہے (اجرا کا وقت `iat` اور ایک شناخت `jti`) اور توثیق کار دو ترتیبات کو جانچتا ہے: `sessionsValidAfter`، جسے پاس ورڈ کی تبدیلی کے وقت مقرر کیا جاتا ہے تاکہ اس سے پہلے جاری ہونے والے تمام سیشنز کی توثیق رک جائے (پاس ورڈ تبدیل کرنے والے براؤزر کو نئی کوکی ملتی ہے)، اور `revokedDashboardSessions`، جس میں `POST /api/auth/logout` سائن آؤٹ کیے گئے سیشن کا `jti` شامل کرتا ہے۔ کسی پرانی ریلیز کے ذریعے جاری کیے گئے سیشنز میں ان میں سے کوئی بھی کلیم موجود نہیں ہوتا اور وہ پہلی پاس ورڈ تبدیلی تک درست رہتے ہیں۔ اگر ترتیبات پڑھی نہ جا سکیں تو سیشن پر اعتماد نہیں کیا جاتا۔

کچھ انتظامی روٹس **دونوں میں سے کسی ایک** طریقے کو قبول کرتے ہیں: کوکی یا `Bearer <key>`، بشرطیکہ API کلید کے پاس `manage` (یا `admin`) اسکوپ ہو۔ یہی وہ چیز ہے جو v3.8 میں شامل کیے گئے "API کالز کے ذریعے قابلِ تشکیل" ورک فلو کو ممکن بناتی ہے۔

#### اختیاری OIDC لاگ اِن گیٹ (#6973)

ڈیش بورڈ ایڈمن لاگ اِن، پہلے سے طے شدہ پاس ورڈ لاگ اِن کے ساتھ ایک **اختیاری** OIDC (OpenID Connect) فلو کی بھی معاونت کرتا ہے — پاس ورڈ لاگ اِن کبھی ختم نہیں کیا جاتا، صرف
اس میں اضافہ کیا جاتا ہے:

- اس وقت تک غیر فعال رہتا ہے جب تک `settings.oidcEnabled === true` **اور** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` سبھی کنفیگر نہ ہوں (ترتیبات → توثیق)۔
  بصورتِ دیگر `GET /api/auth/oidc/login`، `400` واپس کرتا ہے۔
- `GET /api/auth/oidc/login`، جاری کنندہ کے
  `/.well-known/openid-configuration` سے `authorization_endpoint` دریافت کرتا ہے
  (بصورتِ دیگر `<issuer>/authorize` استعمال کرتا ہے)، آنے والی درخواست سے ری ڈائریکٹ URI
  بناتا ہے (`x-forwarded-proto` کو مدِنظر رکھتے ہوئے)، اور ایک بے ترتیب `state` کے ساتھ
  IdP کی طرف ری ڈائریکٹ کرتا ہے، جسے ایک `httpOnly`، `oidc_state` کوکی میں محفوظ کیا جاتا ہے۔
- `GET /api/auth/oidc/callback`، `state` کی توثیق کرتا ہے، اجازت کے
  کوڈ کا تبادلہ کرتا ہے، اور جاری کنندہ کے JWKS کے ذریعے ID ٹوکن کے دستخط کی
  تصدیق کرتا ہے (`jose` کا `createRemoteJWKSet`، فی JWKS URI کیش شدہ)، ساتھ ہی `issuer`/`audience`
  کی جانچ بھی کرتا ہے۔ ڈیش بورڈ تک رسائی کے لیے ایک غیر خالی `oidcAllowedSubjects` فہرست،
  ایک `oidcAdmissionClaim` پالیسی، یا دونوں درکار ہیں۔ subject فہرست صرف اس وقت `sub` یا
  `email` سے مطابقت کرتی ہے جب `email_verified === true` ہو۔ اختیاری claim پالیسی
  نقطوں سے علیحدہ کردہ ID-token claim پاتھ (مثلاً `realm_access.roles`) اور
  منظور شدہ اقدار کی ایک array لیتی ہے؛ حل شدہ claim کو strings کی ایسی array ہونا چاہیے
  جس میں کم از کم ایک منظور شدہ قدر موجود ہو۔ اگر دونوں پالیسیاں کنفیگر ہوں،
  تو دونوں کا کامیاب ہونا ضروری ہے۔ غائب یا خراب ساخت والے claims کی صورت میں رسائی
  بند رکھی جاتی ہے، اور دونوں میں سے کوئی بھی پالیسی نہ ہونے پر callback لاگ اِن سے
  انکار کرتا ہے (`not_configured`)۔ صرف subject پر مبنی موجودہ
  کنفیگریشنز بغیر کسی تبدیلی کے کام کرتی رہتی ہیں۔
- Keycloak عموماً realm roles کو access tokens میں map کرتا ہے، ضروری نہیں کہ ID
  tokens میں بھی کرے۔ realm role `admin` لازمی قرار دینے کے لیے،
  اس client کے لیے ایک protocol mapper کنفیگر کریں جو اپنے **ID token** میں
  `realm_access.roles` شامل کرے، پھر `oidcAdmissionClaim` کو
  `{ "path": "realm_access.roles", "values": ["admin"] }` پر سیٹ کریں۔
  صرف role پر مبنی رسائی فعال کرنے سے پہلے اس client کے اصل ID-token claim کو
  چیک کریں؛ application، access-token roles نہیں پڑھتی۔ IdP کی جانب سے token
  مسترد کیا جانا اس application-side جانچ کی تکمیل کر سکتا ہے، مگر اس کی جگہ
  نہیں لے سکتا۔
- کامیابی کی صورت میں یہ **بالکل وہی** 30 روزہ `auth_token` JWT بناتا ہے جو password
  login جاری کرتا ہے (`src/app/api/auth/login/route.ts`)، لہٰذا ڈیش بورڈ کے بقیہ
  session pipeline (خودکار refresh، cookie flags) میں کوئی تبدیلی نہیں ہوتی —
  OIDC صرف یہ تبدیل کرتا ہے کہ cookie کیسے بنائی جاتی ہے، یہ نہیں کہ وہ کیا اجازت
  دیتی ہے۔ IdP roles/groups میں تبدیلیاں موجودہ OmniRoute sessions کو غیر مؤثر
  نہیں کرتیں؛ ان کی مدت اب بھی logout، password rotation، یا session expiry کے
  تابع رہتی ہے۔
- ہر `oidc*` ترتیب (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`)، `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) میں شامل ہے: `PATCH /api/settings`
  اس وقت تک `400 PASSWORD_REQUIRED` جواب دیتا ہے جب تک body میں management
  password بطور `currentPassword` شامل نہ ہو (غلط ہونے پر `401 PASSWORD_MISMATCH`)۔
  `oidcDisablePasswordLogin`، password _لاگ اِن_ (`POST /api/auth/login`) سے انکار
  کرتا ہے، لیکن محفوظ شدہ password hash کو برقرار رکھتا ہے، اور دوبارہ توثیق اب بھی
  `currentPassword` کو اسی کے مقابل چیک کرتی ہے۔
- `corsOrigins` اور `bruteForceProtection` بھی `SECURITY_IMPACTING_SETTINGS_KEYS`
  میں شامل ہیں: ان میں سے کسی کو نرم کرنا لاگ اِن کے دفاع کو کمزور کرتا ہے، اس لیے
  ان کے لیے بھی `currentPassword` کے ذریعے وہی دوبارہ توثیق درکار ہوتی ہے
  (Security ٹیب اس کا مطالبہ کرتا ہے)، اور JSON import انہیں خارج کر دیتا ہے۔
- ہر security-policy کلید — `SECURITY_IMPACTING_SETTINGS_KEYS` کے اندراجات،
  ہر `oidc*` کلید، اور dashboard session state — `PATCH /api/settings` پر
  **صرف operator کے لیے** ہے: manage دائرۂ کار والی API key یا `oma_` access token کو
  `403` کے ساتھ مسترد کر دیا جاتا ہے، حتیٰ کہ جب وہ درست `currentPassword` بھیجے، اور
  اس انکار کو `settings.update_failed` کے طور پر `reason: OPERATOR_REQUIRED` کے ساتھ
  audit کیا جاتا ہے (`src/lib/api/operatorCredential.ts` میں `requireOperatorCredential()`)۔
  عام ترتیبات (theme، display preferences) ایک `manage` key یا `admin` access token کے لیے
  قابلِ تحریر رہتی ہیں۔ خود `/api/settings` میں ہر تبدیلی (اور
  `/api/settings/require-login` میں بھی) کے لیے `admin` access-token scope بھی
  درکار ہے (`src/server/authz/accessScopes.ts` میں `ADMIN_MUTATION_EXACT_PATHS`، exact-path
  match)؛ `GET` کا scope `read` رہتا ہے، اور دیگر `/api/settings/*` ذیلی routes (proxies،
  combo defaults، model aliases، compression، purges…) method سے اخذ کردہ
  `write` scope برقرار رکھتے ہیں۔
- `POST /api/settings/import-json` اس دوبارہ توثیق کو نظر انداز کرتا ہے، اس لیے لکھنے سے
  پہلے `IMPORT_STRIPPED_SETTINGS_KEYS` (اسی file) میں شامل ہر کلید خارج کر دیتا ہے:
  password اور `currentPassword`، ہر `SECURITY_IMPACTING_SETTINGS_KEYS` اندراج، اور
  dashboard session state (`sessionsValidAfter`, `revokedDashboardSessions`)۔
  لہٰذا کسی پرانے backup کو import کرنے سے وہ session دوبارہ فعال نہیں ہو سکتا جسے
  password کی تبدیلی یا sign-out پہلے ہی ختم کر چکا ہو۔

## راستوں کی اقسام

`src/server/authz/types.ts` تین اقسام متعین کرتا ہے؛ جو راستہ قطعی طور پر درجہ بند نہ ہو سکے وہ `MANAGEMENT` پر واپس آ جاتا ہے۔

| قسم          | تفصیل                                                                                                                                            | احراز ہویت درکار ہے                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `PUBLIC`     | واضح طور پر محفوظ راستے — login، logout، status، init، health، onboarding bootstrap۔                                                             | کوئی نہیں                                                  |
| `CLIENT_API` | ماڈل سروِنگ اینڈ پوائنٹس — `/api/v1/*`، `/api/v1beta/*`، اور عرف `/v1/*`، `/v1beta/*`، `/chat/completions`، `/responses`، `/models`، `/codex/*`۔ | جب مؤثر `REQUIRE_API_KEY` فیچر فلیگ فعال ہو تو Bearer کلید |
| `MANAGEMENT` | ڈیش بورڈ صفحات، ترتیبات، فراہم کنندگان، کلیدیں، ایڈمن اور تشخیصی اینڈ پوائنٹس۔                                                                   | ڈیش بورڈ سیشن یا `manage` اسکوپ کے ساتھ Bearer             |

چند `MANAGEMENT` اقدامات **صرف آپریٹر کے لیے** ہیں: صرف `manage` کلید کافی نہیں۔ محفوظ شدہ اسناد ایکسپورٹ کرنا (`GET /api/settings/export-json`، `GET /api/db-backups/export`، `GET /api/db-backups/exportAll`)، لائیو ڈیٹا پر بیک اپ بحال کرنا (`dryRun=true` سمیت `POST /api/db-backups/import`، ID کے ذریعے بحالی `POST /api/db-backups`، `POST /api/settings/import-json`) اور بحالی کے نقطے ختم کرنا (`DELETE /api/db-backups` کی صفائی، اور `PATCH /api/db-backups` کیونکہ یہ برقرار رکھنے کی پالیسی محفوظ کرتا ہے جو ہر بیک اپ کے بعد خودکار صفائی چلاتی ہے) کے لیے ڈیش بورڈ سیشن، مقامی CLI کا subject، یا لاگ ان کا بند ہونا درکار ہے۔ sync ٹوکن جاری کرنا (`POST /api/sync/tokens`) اور `admin` اسکوپ کا CLI رسائی ٹوکن بنانا (`POST /api/cli/tokens`) ہر لاگ ان موڈ میں ڈیش بورڈ سیشن یا مقامی CLI کا subject مانگتے ہیں۔ کسی بھی اسکوپ کی API کلیدیں اور `oma_` رسائی ٹوکن آپریٹر اسناد نہیں ہیں: جب بھی کوئی ایسی اسناد درکار ہو، انہیں `403` ملتا ہے۔ اس کی جانچ `src/lib/api/operatorCredential.ts` میں ہے (`resolveOperatorCredential()` / `requireOperatorCredential()`)۔ لاگ ان ترتیبات کی تبدیلی بھی صرف آپریٹر کے لیے ہے: `POST /api/settings/require-login` (مینجمنٹ پاس ورڈ سیٹ کرنا / `requireLogin` ٹوگل کرنا) ایک بار پاس ورڈ موجود ہونے کے بعد صرف انہی اسناد کو قبول کرتا ہے — پہلی بار کی بوٹ اسٹریپ ونڈو (جب ابھی پاس ورڈ نہ ہو) میں کوئی تبدیلی نہیں — اور ڈیش بورڈ سیشن کو پاس ورڈ بدلنے کے لیے `currentPassword` بھیجنا ہوگا (غائب یا غلط ہونے پر `403`، `settings.update_failed` کے طور پر آڈٹ ہوتا ہے)۔ مقامی CLI اور وہ انسٹنس جس کا لاگ ان بند ہو بحالی کا راستہ برقرار رکھتے ہیں اور اس کے بغیر پاس ورڈ سیٹ کر سکتے ہیں، کیونکہ دونوں اُس میزبان سے جڑے ہیں جو ڈیٹا ڈائریکٹری کا مالک ہے۔

## پائپ لائن

```
آنے والی درخواست → src/proxy.ts
  → src/server/authz/pipeline.ts میں runAuthzPipeline()
    1. قابلِ اعتماد داخلی ہیڈرز ہٹائیں (x-omniroute-auth-*, x-omniroute-route-class)
    2. درخواست کی id بنائیں، classifyRoute() کے ذریعے روٹ کی درجہ بندی کریں
    3. اگر pathname == "/" ہو → /dashboard پر ری ڈائریکٹ کریں
    4. اگر نظام ڈرین ہو رہا ہو (منظم شٹ ڈاؤن) اور /api/* ہو → 503
    5. اگر non-GET /api/* ہو → checkBodySize() گارڈ
    6. اگر OPTIONS ہو → CORS پری فلائٹ 204
    7. اگر options.enforce == false ہو → روٹ-کلاس ہیڈرز کے ساتھ بغیر روک ٹوک آگے بھیجیں
    8. بصورتِ دیگر: POLICIES[routeClass].evaluate(ctx)
       - allow  → x-omniroute-auth-{kind,id,label,scopes} ثبت کریں → NextResponse.next()
       - reject → correlation_id کے ساتھ JSON خرابی (ڈیش بورڈ صفحات → 302 /login)
```

قابلِ اعتماد داخلی ہیڈرز (`src/server/authz/headers.ts` میں متعین) درجہ بندی سے پہلے **آنے والی درخواستوں سے ہٹا دیے جاتے ہیں** — کلائنٹس کسی سبجیکٹ کی نقالی کے لیے `x-omniroute-auth-*` کو پہلے سے شامل نہیں کر سکتے۔

### پالیسی کے معاہدے

ہر روٹ کلاس کے لیے `src/server/authz/policies/` میں ایک پالیسی موجود ہے:

- **`publicPolicy`** (`policies/public.ts`) — ہمیشہ `allow({ kind: "anonymous", id: "anonymous" })` واپس کرتی ہے۔
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer اخذ کرتی ہے اور `validateApiKey()` کے ذریعے اس کی توثیق کرتی ہے۔ صرف اس صورت میں anonymous پر واپس آتی ہے جب مؤثر `REQUIRE_API_KEY` فیچر فلیگ غیر فعال ہو۔ مؤثر فلیگ کا تعین `isRequireApiKeyEnabled()` (`DB فیچر فلیگ اوور رائیڈ > process.env.REQUIRE_API_KEY > طے شدہ قدر`) کے ذریعے کیا جاتا ہے، تاکہ ڈیش بورڈ فیچر فلیگز اور ماحولیاتی متغیرات `/api/v1/*`، `/api/v1beta/*` اور عرف پر یکساں طور پر لاگو ہوں؛ ریزولوَر کی ناکامیاں رسائی بند کر دیتی ہیں۔ کلائنٹ API روٹس پر ڈیش بورڈ سیشن کی درخواستوں کی اجازت دیتی ہے (بشمول `/api/v1/models`، جسے ڈیش بورڈ ماڈل کیٹلاگ استعمال کرتا ہے)۔
- **`managementPolicy`** (`policies/management.ts`) — ڈیش بورڈ سیشن، داخلی ماڈل سنک درخواستیں (`/api/providers/[name]/(sync-models|models)` کے ساتھ مماثل)، قبول کرتی ہے، یا اگر `isAuthRequired()` false واپس کرے تو مکمل طور پر نظر انداز کر دیتی ہے۔ Bearer ٹوکن موجود مگر غیر معتبر ہونے پر 403 (`AUTH_001`) واپس کرتی ہے، بصورتِ دیگر 401۔ یہ کسی بھی توثیقی شاخ سے پہلے روٹ گارڈ کے درجات (LOCAL_ONLY / ALWAYS_PROTECTED) بھی نافذ کرتی ہے — [روٹ گارڈ کے درجات](../security/ROUTE_GUARD_TIERS.md) دیکھیں۔ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` میں موجود LOCAL_ONLY راستوں (فی الحال: `/api/mcp/`) تک non-loopback سے اس وقت رسائی حاصل کی جا سکتی ہے جب Bearer کلید کے پاس `manage` اسکوپ ہو؛ دیگر تمام LOCAL_ONLY راستے اسکوپ سے قطع نظر strict-loopback رہتے ہیں۔

ایک کامیاب پالیسی `AuthSubject` واپس کرتی ہے، جس میں `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ہوتا ہے۔ زیریں سطح کے ہینڈلرز توثیقی منطق دوبارہ چلانے کے بجائے اسے `src/server/authz/assertAuth.ts` میں موجود `assertAuth(request, "CLIENT_API")` کے ذریعے پڑھ سکتے ہیں۔

## عوامی روٹس کی فہرست

`src/shared/constants/publicApiRoutes.ts` واضح اجازت فہرست ہے:

فہرست کو **ساخت** کے لحاظ سے تقسیم کیا گیا ہے، اور یہ تقسیم نہایت اہم ہے (GHSA-74g9-q8f6-793h): کسی prefix کو
`startsWith()` کے ذریعے match کیا جاتا ہے، لہٰذا یہ ان تمام متصل paths سے بھی match ہوتا ہے جن کے ابتدائی حروف یکساں ہوں۔
prefix کے طور پر `/api/usage/om-usage` نے `/api/usage/om-usage<anything>` کو PUBLIC قرار دے دیا، اور Next اسے
`/api/usage/[connectionId]` سے resolve کرتا ہے — ایک ایسا handler جس کی اپنی کوئی auth نہیں۔

```ts
// حقیقی subtrees۔ ہر entry کا اختتام لازماً "/" پر ہونا چاہیے (اس کی تصدیق unit test کرتا ہے)۔
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify میں CLIENT_API سمجھا جاتا ہے، "no-auth public" نہیں
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// منفرد routes، جنہیں عین مطابق match کیا جاتا ہے (آخر میں slash کے ساتھ یا اس کے بغیر)۔
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

// صرف پڑھنے والے منفرد routes جن پر CORS origin کی نرمی بھی لاگو ہوتی ہے۔
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS نرمی کے بغیر صرف پڑھنے والا منفرد route۔
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

صرف پڑھنے والے routes صرف محفوظ methods کے لیے عوامی ہیں۔ نوٹ: `classifyRoute()`، `/api/v1/*` اور `/api/v1beta/*` کو PUBLIC fall-through سے خارج کرتا ہے — یہ ہمیشہ `CLIENT_API` ہوتے ہیں، تاکہ Bearer-key پالیسی بدستور لاگو رہے۔

## نیا Route شامل کرنا

### طریقہ 1 — عوامی client API endpoint (Bearer-auth)

`/api/v1/` اور `/api/v1beta/` کے تحت routes خودکار طور پر `CLIENT_API` کے طور پر classify ہوتے ہیں۔ middleware، Bearer check نافذ کرتا ہے؛ route handlers کو اسے دوبارہ انجام دینے کی ضرورت نہیں، لیکن مفید ہونے کی صورت میں وہ subject پڑھ سکتے ہیں۔

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler کی منطق
}
```

### طریقہ 2 — Management endpoint (session یا Bearer + manage)

`src/lib/api/requireManagementAuth.ts` سے `requireManagementAuth()` استعمال کریں:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler کی منطق
}
```

کامیابی پر `requireManagementAuth()`، `null` واپس کرتا ہے، بصورت دیگر JSON error `Response`:

- 401 `AUTH_001` "توثیق درکار ہے" — کوئی credentials موجود نہیں
- 403 — غلط Bearer **یا** Bearer موجود ہے لیکن key کے پاس `manage` / `admin` scope نہیں

`hasManageScope(scopes)`، `"manage"` یا `"admin"` کے لیے true واپس کرتا ہے۔

### طریقہ 3 — عوامی اجازت فہرست میں شامل کرنا

set کا انتخاب سہولت کے بجائے ساخت کے لحاظ سے کریں۔ ایک route کو `PUBLIC_API_ROUTES_EXACT` میں رکھا جاتا ہے (یا صرف GET کے لیے `PUBLIC_READONLY_CORS_API_ROUTES` میں)؛ صرف حقیقی subtree کو `PUBLIC_API_ROUTE_PREFIXES` میں رکھا جاتا ہے، اور اس کا اختتام **لازماً `/` پر ہونا چاہیے**۔ prefix فہرست میں ایک منفرد route رکھنے سے ہر وہ متصل path بھی عوامی ہو جاتا ہے جس کے ابتدائی حروف یکساں ہوں — بشمول بعد میں شامل کیے جانے والے dynamic-segment siblings (GHSA-74g9-q8f6-793h)۔ `tests/unit/public-api-routes.test.ts`، `tests/unit/authz/public-route-exact-match.test.ts` اور `tests/unit/authz/classify.test.ts` میں unit tests اپ ڈیٹ کریں۔

## سکوپس

تین نام اسپیسز۔ ہر چیکر صرف اپنی سٹرنگز پڑھتا ہے۔ ساتھ ساتھ موازنہ، بشمول یہ کہ `manage` `read:compression` کے لیے `scopeMatches` میں کیوں ناکام ہوتا ہے اور ایک `read` ایکسیس ٹوکن `PATCH /api/keys/{id}` کیوں نہیں کر سکتا، [تین سکوپ نام اسپیسز](../frameworks/MCP-SERVER.md#three-scope-namespaces) میں ہے۔

API کیز میں ایک `scopes` ایرے شامل ہوتا ہے (جو `api_keys.scopes` میں JSON کے طور پر محفوظ کیا جاتا ہے، دیکھیں `src/lib/db/apiKeys.ts`)۔

### مینجمنٹ سکوپ

- `manage` / `admin` — `hasManageScope`۔ مینجمنٹ API روٹس تک بیئرر رسائی۔
- `mcp:connect`، `self:usage`، `self:account-quota`، اور `policy:bypass-provider-quota` اضافی عین مطابق میچ سکوپس ہیں۔ یہ `MANAGEMENT_API_KEY_SCOPES` سے باہر رہتے ہیں۔ `mcp:connect` صرف `/api/mcp/` نان-لوپ بیک کارو آؤٹ کو کھولتا ہے۔

### MCP ٹول سکوپس

کیٹلاگ اور میچنگ کے قواعد (یکساں سٹرنگ، یا ایک عطا کردہ سکوپ جو `*` پر ختم ہوتا ہے): [MCP ٹول سکوپس](../frameworks/MCP-SERVER.md#mcp-tool-scopes)۔ `src/shared/constants/mcpScopes.ts` میں `MCP_SCOPE_LIST` اصل ٹائپ شدہ ذیلی سیٹ ہے، نہ کہ وہ مکمل کیٹلاگ۔ نفاذ `open-sse/mcp-server/scopeEnforcement.ts` میں `resolveCallerScopeContext()` کے بعد چلتا ہے جو MCP تصدیقی معلومات، ریکویسٹ میٹا ڈیٹا، یا `OMNIROUTE_MCP_SCOPES` سے سکوپس کو حل کرتا ہے۔ یہ بند رہتا ہے جب تک کہ `OMNIROUTE_MCP_ENFORCE_SCOPES=true` نہ ہو۔

### ایکسیس ٹوکن سکوپس

`oma_live_…` ٹوکنز پر `read` / `write` / `admin`، جن کی درجہ بندی `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) کے ذریعے کی جاتی ہے۔ یہ درجہ بندی صرف ایکسیس ٹوکن کریڈینشل پر لاگو ہوتی ہے۔ [مینجمنٹ تصدیق](../guides/MANAGEMENT-AUTH.md) دیکھیں۔

## Auth Required ٹوگل

`src/shared/utils/apiAuth.ts` میں `isAuthRequired()` طے کرتا ہے کہ کسی درخواست کے لیے **کوئی بھی** احراز ہویت نافذ ہونی چاہیے یا نہیں:

- `settings.requireLogin === false` → احراز ہویت مجموعی طور پر غیر فعال ہے، سوائے ہمیشہ محفوظ رہنے والے درجے کے (دیکھیں [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) اور ان کالز کے جو ایسی اسناد جاری کرتی ہیں جنہیں قبول کیا جاتا ہے اور جنہیں لاگ ان فعال ہونے کی صورت جیسی ہی اسناد درکار ہوتی ہیں: sync ٹوکن جاری کرنا، کسی بھی اسکوپ کے CLI رسائی ٹوکن بنانا، اور `manage`/`admin` اسکوپ والی API کلید بنانا، کسی کلید کو وہ اسکوپ دینا، یا ایسی کلید کو دوبارہ بنانا یا ظاہر کرنا (`src/lib/api/requireManagementAuth.ts` میں `requireCredentialForManagementScopedKey()`)۔ صرف‌ استنتاج والی کلیدیں کھلی رہتی ہیں۔
- کوئی پاس ورڈ کنفیگر نہیں **اور** `INITIAL_PASSWORD` ماحولیاتی متغیر موجود نہیں → بوٹ اسٹریپ موڈ آن بورڈنگ وزرڈ اور loopback درخواستوں کی اجازت دیتا ہے، لیکن نیٹ ورک پر ظاہر درخواستوں کو اب بھی اسناد درکار ہیں۔
- کوئی DB خرابی → بند ہو جاتا ہے (ڈیفالٹ کے طور پر محفوظ)۔

کلائنٹ API کلید کا نفاذ `src/shared/utils/featureFlags.ts` میں `isRequireApiKeyEnabled()` استعمال کرتا ہے، براہ راست `process.env.REQUIRE_API_KEY` پڑھنے کے بجائے۔ تعینات شدہ انسٹنسز کے لیے یہ اہم ہے: ڈیش بورڈ → Feature Flags میں `REQUIRE_API_KEY` ٹوگل کرنے سے DB اوور رائڈ محفوظ ہوتا ہے اور فوراً `/v1/*`، `/v1beta/*`، `/models`، `/responses`، `/chat/completions`، `/codex/*` اور وہ دیگر کلائنٹ API احراز ہویت چیکس متاثر ہوتے ہیں جو اس ہیلپر کو استعمال کرتے ہیں۔ اگر فیچر فلیگ اسٹور نہ پڑھا جا سکے تو کلائنٹ API احراز ہویت بند ہو جاتی ہے اور کلید لازم ہوتی ہے۔

## بریکنگ تبدیلی — v3.8.0

`/api/v1/agents/tasks/*` اور `/api/resilience/model-cooldowns` اینڈ پوائنٹس کو **اب مینجمنٹ توثیق درکار ہے** (کمیٹ `588a0333`)۔ پہلے `manage` اسکوپ کے بغیر عام API کی بھیجنے والے کلائنٹس کو `403` موصول ہوتا ہے۔ مائیگریشن: یا API Keys ڈیش بورڈ میں کی کو `manage` اسکوپ جاری کریں، یا لاگ اِن شدہ ڈیش بورڈ سیشن استعمال کریں۔

## طرزِ عمل میں تبدیلی — v3.8.2

`/api/mcp/*` (ریموٹ MCP سرور) اب بھی بطور ڈیفالٹ LOCAL_ONLY ہے، لیکن اب غیر لوپ بیک درخواستیں قبول کرتا ہے جب `Authorization: Bearer <api-key>` ہیڈر میں `manage` اسکوپ موجود ہو۔ اس استثنا کو `src/server/authz/routeGuard.ts` میں `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` کے ذریعے واضح طور پر ہر پاتھ کے لیے گیٹ کیا گیا ہے؛ اس سے ملتا جلتا LOCAL_ONLY پری فکس `/api/cli-tools/runtime/*` دانستہ طور پر بائی پاس نہیں کیا جا سکتا کیونکہ یہ من مانی ذیلی پروسیسز چلا سکتا ہے۔ غیر لوپ بیک سے `/api/mcp/*` کو بھیجی گئی گمنام درخواستیں بدستور `403 LOCAL_ONLY` واپس کرتی ہیں — کسی بھی نئے LOCAL_ONLY پاتھ کے لیے ڈیفالٹ سخت لوپ بیک ہی رہتا ہے۔ [روٹ گارڈ درجات](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) دیکھیں۔

## ٹیسٹنگ

- یونٹ ٹیسٹس: `tests/unit/authz/` — `classify.test.ts`، `pipeline.test.ts`، `client-api-policy.test.ts`، `management-policy.test.ts`، `public-policy.test.ts`۔
- عوامی اجازت فہرست: `tests/unit/public-api-routes.test.ts`۔
- مخصوص ٹیسٹ چلائیں: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`۔

## ڈیبگنگ

پائپ لائن ہمیشہ جوابات پر یہ ہیڈرز ثبت کرتی ہے:

```
x-request-id:               <correlation id، جو خرابی کے متن میں بھی دہرائی جاتی ہے>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

توثیق شدہ درخواستوں کے لیے upstream (ہینڈلر کی جانب) درخواست کے ہیڈرز میں یہ بھی شامل ہوتے ہیں:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (اختیاری)
x-omniroute-auth-scopes:    کوما سے جدا کردہ فہرست
```

ہینڈلرز کے اندر `assertAuth(req, expectedClass)` استعمال کریں — اگر middleware کو بائی پاس کیا گیا ہو تو یہ `AUTHZ_NOT_INITIALIZED` کوڈ کے ساتھ `AuthzAssertionError` پھینکتا ہے (ٹیسٹس میں کنفیگریشن کی تنزلیاں پکڑنے کے لیے مفید ہے)۔

## مزید دیکھیں

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ہر اینڈ پوائنٹ کے لیے auth مارکر
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auth ایونٹس کے لیے آڈٹ لاگ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — تین اسکوپ نیم اسپیسز اور MCP ٹول-اسکوپ کیٹلاگ
- ماخذ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
