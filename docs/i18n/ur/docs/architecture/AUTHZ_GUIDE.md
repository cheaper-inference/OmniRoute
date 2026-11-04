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

OpenAI/Anthropic/Gemini سے مطابقت رکھنے والی کلائنٹ APIs اور چند انتظامی روٹس کے لیے استعمال ہوتی ہے، جب کلید کے پاس `manage` scope ہو۔

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` میں `isValidApiKey()` / `extractApiKey()` کے ذریعے توثیق کی جاتی ہے اور اسے `src/shared/utils/apiAuth.ts` کے ذریعے دوبارہ برآمد کیا جاتا ہے۔ ویلیڈیٹر `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ماحول کے متغیرات کو مستقل passthrough کلیدوں کے طور پر بھی قبول کرتا ہے (issue #1350)۔

### 2. ڈیش بورڈ سیشن (auth_token cookie)

ڈیش بورڈ صفحات اور ایڈمن آپریشنز کے لیے۔

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

کوکی صرف اسی وقت سیشن ہوتی ہے جب JWT کی تصدیق ہو جائے **اور** اس میں `authenticated: true` شامل ہو
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)۔ کوکی استعمال کرنے والا ہر
صارف (ڈیش بورڈ روٹ گارڈ (`isDashboardSessionAuthenticated()`)، authz پائپ لائن ریفریش، WebSocket ہینڈ شیک، لائیو
سرور، `/api/settings/require-login`، `/api/auth/status`) اسی مددگار کے ذریعے گزرتا ہے۔
`JWT_SECRET` سے دستخط شدہ دیگر JWTs بھی موجود ہیں — Cursor CLI passthrough کلید رکھنے والوں کے لیے
`iss "omniroute" / aud "cursor-cli"` ٹوکن بناتا ہے — اور یہ کبھی سیشن نہیں ہوتے
(#13298)۔

`src/shared/utils/apiAuth.ts` میں `isDashboardSessionAuthenticated()` کے ذریعے تصدیق کی جاتی ہے۔ پائپ لائن 30 دن کی مدت میں
7 دن سے کم وقت باقی ہونے پر JWT کو خودکار طور پر ریفریش کر دیتی ہے۔

سیشن اپنے 30 دن پورے ہونے سے پہلے بھی ختم ہو سکتا ہے، کیونکہ ہر منٹر `mintDashboardSessionToken` کے ذریعے گزرتا ہے (جس میں
جاری ہونے کا وقت `iat` اور ایک شناخت `jti` شامل ہوتی ہے) اور ویری فائر دو سیٹنگز چیک کرتا ہے: `sessionsValidAfter`، جسے پاس ورڈ
تبدیل ہونے پر مقرر کیا جاتا ہے تاکہ اس سے پہلے جاری ہونے والا ہر سیشن ویری فائی ہونا بند ہو جائے (پاس ورڈ تبدیل کرنے والے
براؤزر کو نئی کوکی ملتی ہے)، اور `revokedDashboardSessions`، جس میں `POST /api/auth/logout` سائن آؤٹ کیے گئے سیشن کا
`jti` شامل کرتا ہے۔ پرانے ریلیز سے بنائے گئے سیشنز میں ان میں سے کوئی claim شامل نہیں ہوتا اور پہلے پاس ورڈ تبدیل ہونے تک
درست رہتے ہیں۔ اگر سیٹنگز پڑھی نہ جا سکیں تو سیشن پر اعتماد نہیں کیا جاتا۔

کچھ انتظامی روٹس دونوں میں سے **کسی ایک** طریقے کو قبول کرتے ہیں: کوکی یا `Bearer <key>`، جب API کلید کے پاس
`manage` (یا `admin`) scope ہو۔ یہی v3.8 میں شامل کیے گئے "API calls کے ذریعے قابلِ تشکیل" ورک فلو کو فعال کرتا ہے۔

#### اختیاری OIDC لاگ اِن گیٹ (#6973)

ڈیش بورڈ ایڈمن لاگ اِن، پہلے سے طے شدہ پاس ورڈ لاگ اِن کے ساتھ، **اختیاری طور پر فعال کیے جانے والے** OIDC (OpenID Connect) فلو کو بھی سپورٹ کرتا ہے
— پاس ورڈ لاگ اِن کبھی ختم نہیں کیا جاتا، صرف اس کے ساتھ اضافی طریقہ فراہم کیا جاتا ہے:

- غیر فعال رہتا ہے، جب تک `settings.oidcEnabled === true` **اور** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` سبھی تشکیل شدہ نہ ہوں (Settings → Auth)۔
  بصورتِ دیگر `GET /api/auth/oidc/login`، `400` واپس کرتا ہے۔
- `GET /api/auth/oidc/login` issuer کی
  `/.well-known/openid-configuration` سے `authorization_endpoint` دریافت کرتا ہے
  (بصورتِ دیگر `<issuer>/authorize` استعمال کرتا ہے)، آنے والی درخواست سے
  redirect URI بناتا ہے (`x-forwarded-proto` کو مدِنظر رکھتے ہوئے)، اور ایک
  بے ترتیب `state` کے ساتھ IdP کو redirect کرتا ہے جسے `httpOnly`
  `oidc_state` cookie میں محفوظ کیا جاتا ہے۔
- `GET /api/auth/oidc/callback`، `state` کی توثیق کرتا ہے، authorization code
  کا تبادلہ کرتا ہے، اور issuer کے JWKS کے ذریعے ID token کے دستخط کی تصدیق
  کرتا ہے (`jose` کا `createRemoteJWKSet`، جو ہر JWKS URI کے لیے cache ہوتا ہے)
  اور `issuer`/`audience` کی جانچ کرتا ہے۔ Dashboard میں داخلے کے لیے
  غیر خالی `oidcAllowedSubjects` فہرست، `oidcAdmissionClaim` پالیسی، یا دونوں
  کا ہونا ضروری ہے۔ Subject فہرست `sub` یا `email` سے صرف اسی وقت match کرتی
  ہے جب `email_verified === true` ہو۔ اختیاری claim پالیسی، نقطوں سے جدا شدہ
  ID-token claim path (مثلاً، `realm_access.roles`) اور قابلِ قبول values کی
  ایک array لیتی ہے؛ resolved claim، strings کی ایک array ہونا چاہیے جس میں کم
  از کم ایک قابلِ قبول value شامل ہو۔ اگر دونوں پالیسیاں تشکیل شدہ ہوں تو دونوں
  کا کامیاب ہونا ضروری ہے۔ غائب یا malformed claims کی صورت میں رسائی محفوظ
  انداز میں مسترد کر دی جاتی ہے، اور دونوں میں سے کوئی پالیسی نہ ہونے پر
  callback login (`not_configured`) مسترد کرتا ہے۔ موجودہ صرف-sub
  configurations بدستور بغیر تبدیلی کے کام کرتی ہیں۔
- Keycloak عموماً realm roles کو access tokens میں map کرتا ہے، ضروری نہیں کہ
  ID tokens میں بھی کرے۔ `admin` realm role درکار ہونے کے لیے، اس client کے
  لیے ایک protocol mapper تشکیل دیں جو `realm_access.roles` کو اس کے **ID
  token** میں شامل کرے، پھر `oidcAdmissionClaim` کو
  `{ "path": "realm_access.roles", "values": ["admin"] }` پر سیٹ کریں۔
  صرف role کی بنیاد پر admission فعال کرنے سے پہلے اس client کے اصل ID-token
  claim کی جانچ کریں؛ application access-token roles نہیں پڑھتی۔ IdP کی جانب
  سے token refusal اس application-side جانچ کی تکمیل کر سکتا ہے، لیکن اس کی
  جگہ نہیں لے سکتا۔
- کامیابی پر یہ بالکل وہی **30 دن کا** `auth_token` JWT جاری کرتا ہے جو password
  login جاری کرتا ہے (`src/app/api/auth/login/route.ts`)، اس لیے باقی dashboard
  session pipeline (auto-refresh، cookie flags) میں کوئی تبدیلی نہیں ہوتی —
  OIDC صرف cookie جاری کرنے کا طریقہ بدلتا ہے، اس سے ملنے والی اجازتیں نہیں۔
  IdP roles/groups میں تبدیلیاں موجودہ OmniRoute sessions کو invalidate نہیں
  کرتیں؛ logout، password rotation، یا session expiry اب بھی ان کی مدت
  متعین کرتے ہیں۔
- ہر `oidc*` setting (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) کو
  `SECURITY_IMPACTING_SETTINGS_KEYS` میں شامل کیا گیا ہے
  (`src/shared/constants/securityImpactingSettings.ts`):
  `PATCH /api/settings`، `400 PASSWORD_REQUIRED` واپس کرتا ہے، جب تک body
  میں management password بطور `currentPassword` موجود نہ ہو
  (`401 PASSWORD_MISMATCH` اس وقت واپس ہوتا ہے جب password غلط ہو)۔
  `oidcDisablePasswordLogin`، password _login_ (`POST /api/auth/login`) کو
  مسترد کرتا ہے، لیکن محفوظ شدہ password hash برقرار رکھتا ہے، اور re-auth
  اب بھی `currentPassword` کو اس کے مقابل چیک کرتا ہے۔
- `corsOrigins` اور `bruteForceProtection` بھی
  `SECURITY_IMPACTING_SETTINGS_KEYS` میں شامل ہیں: ان میں سے کسی کو نرم کرنا
  login defenses کو کمزور کرتا ہے، اس لیے ان کے لیے بھی وہی
  `currentPassword` re-auth درکار ہے (Security tab اسے طلب کرتا ہے) اور JSON
  import انہیں خارج کر دیتا ہے۔
- ہر security-policy key — `SECURITY_IMPACTING_SETTINGS_KEYS` کی entries،
  ہر `oidc*` key، اور dashboard session state — `PATCH /api/settings` پر
  **صرف operator** کے لیے ہے: manage-scoped API key یا `oma_` access token کو
  `403` کے ساتھ مسترد کر دیا جاتا ہے، چاہے وہ درست `currentPassword` بھی بھیجے،
  اور اس refusal کو `settings.update_failed` کے طور پر
  `reason: OPERATOR_REQUIRED` کے ساتھ audit کیا جاتا ہے
  (`requireOperatorCredential()` in `src/lib/api/operatorCredential.ts`)۔
  عام settings (theme، display preferences) کسی `manage` key یا `admin` access
  token کے لیے writable رہتی ہیں۔ `/api/settings` خود (اور
  `/api/settings/require-login`) کی ہر mutation کے لیے بھی `admin` access-token
  scope درکار ہے (`ADMIN_MUTATION_EXACT_PATHS` in
  `src/server/authz/accessScopes.ts`، exact-path match)؛ `GET` بدستور `read`
  رہتا ہے، جبکہ دیگر `/api/settings/*` sub-routes (proxies، combo defaults،
  model aliases، compression، purges…) method-inferred `write` scope برقرار
  رکھتے ہیں۔
- `POST /api/settings/import-json` اس re-auth کو skip کرتا ہے، اس لیے لکھنے سے
  پہلے `IMPORT_STRIPPED_SETTINGS_KEYS` (اسی file میں) کی ہر key خارج کر دیتا
  ہے: password اور `currentPassword`، `SECURITY_IMPACTING_SETTINGS_KEYS` کی
  ہر entry، اور dashboard session state
  (`sessionsValidAfter`, `revokedDashboardSessions`)۔ پرانا backup import کرنے
  سے اس لیے کوئی ایسا session دوبارہ فعال نہیں ہو سکتا جسے password change یا
  sign-out پہلے ہی ختم کر چکا ہو۔

#### اختیاری TOTP دو-فریقی login (#16619)

Settings → Security سے enroll کیا جاتا ہے؛ operator کے اسے فعال کرنے تک بند
رہتا ہے (`src/server/auth/dashboardMfa.ts`)۔

- **اس میں شامل ہے:** پاس ورڈ لاگ اِن (`POST /api/auth/login`، جس کے بعد
  `POST /api/auth/mfa/verify` درکار ہوتا ہے) اور `omniroute connect` (`POST /api/cli/connect`،
  جو صرف پاس ورڈ کے تبادلے کو مسترد کرتا ہے اور کوڈ کو `totp` کے طور پر لیتا ہے)۔
- **اس میں شامل نہیں ہے:** OIDC / SSO سائن اِن (`/api/auth/oidc/callback`) کے لیے
  OmniRoute TOTP درکار نہیں ہوتا۔ یہ شناخت فراہم کنندہ کے اپنے دوسرے عامل پر انحصار کرتا ہے،
  اس لیے اگر OIDC فعال ہو تو IdP میں MFA نافذ کریں۔
- **بحالی** (ڈیوائس گم ہو جانے، ریکوری کوڈز ختم ہو جانے، یا کسی ایسے عامل کی صورت میں جس کی
  مزید تصدیق نہ ہو سکے، مثلاً `STORAGE_ENCRYPTION_KEY` تبدیل ہونے کے بعد):
  1. سرور کو `OMNIROUTE_DISABLE_MFA=true` کے ساتھ دوبارہ شروع کریں۔
  2. خود میزبان پر (لوپ بیک پیئر اور لوپ بیک `Host` کے ساتھ، جیسے
     `http://localhost:20128`) پاس ورڈ کے ذریعے سائن اِن کریں۔ دوسرے عامل کو صرف اسی اصل کے
     لیے چھوڑ دیا جاتا ہے؛ ہر دوسری اصل کے لیے اب بھی کوڈ درکار ہوتا ہے۔
  3. ترتیبات → سیکیورٹی → غیر فعال کریں میں پاس ورڈ درج کریں اور کوڈ خالی چھوڑ دیں۔
     `POST /api/auth/mfa/disable` صرف اس وقت `code` کے بغیر باڈی قبول کرتا ہے جب یہ
     متغیر سیٹ ہو اور درخواست میزبان سے آئی ہو؛ اس کے لیے اب بھی ڈیش بورڈ سیشن اور موجودہ
     پاس ورڈ درکار ہوتا ہے، اور اسے `auth.mfa.disabled` کے طور پر
     `secondFactor: "recovery_switch"` کے ساتھ آڈٹ کیا جاتا ہے۔
  4. `OMNIROUTE_DISABLE_MFA` کو ان سیٹ کریں، دوبارہ شروع کریں، اور ضرورت ہو تو دوبارہ
     اندراج کریں۔

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

قابل اعتماد اندرونی ہیڈر ( `src/server/authz/headers.ts` میں بیان کردہ) ہیں۔** آنے والی درخواستوں سے چھین لیا گیا۔** درجہ بندی سے پہلے — کلائنٹ کسی موضوع کی نقالی کرنے کے لیے `x-omniroute-auth-*` پہلے سے آباد نہیں کر سکتے۔

### پالیسی معاہدے

ہر روٹ کلاس کی `src/server/authz/policies/` میں ایک پالیسی ہوتی ہے:

- **`publicPolicy`** (`policies/public.ts`) — ہمیشہ `allow({ kind: "anonymous", id: "anonymous" })` لوٹاتا ہے۔
- **`clientApiPolicy`** (`policies/clientApi.ts`) — بیئرر کو نکالتا ہے، `validateApiKey()` کے ذریعے توثیق کرتا ہے۔ گمنام میں صرف اس وقت آتا ہے جب مؤثر `REQUIRE_API_KEY` خصوصیت کا جھنڈا غیر فعال ہو۔ مؤثر پرچم کو `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) کے ذریعے حل کیا جاتا ہے لہذا ڈیش بورڈ فیچر فلیگ اور ماحولیاتی متغیرات `/api/v1/*`، `/api/v1beta/*`، اور عرفی ناموں کو مستقل طور پر کنٹرول کرتے ہیں۔ حل کرنے والی ناکامیاں بند ہوگئیں. کلائنٹ API روٹس پر ڈیش بورڈ سیشن کی درخواستوں کی اجازت دیتا ہے (بشمول `/api/v1/models`، ڈیش بورڈ ماڈل کیٹلاگ کے ذریعے استعمال کیا جاتا ہے)۔ جب Entra ID SSO فعال کیا جاتا ہے، ایک بیئرر جو ساختی طور پر ایک Entra ٹوکن ہے (تین base64url سیگمنٹ، `RS*` alg، `kid`) SSO برانچ کے ذریعے ہینڈل کیا جاتا ہے۔** پہلے** `validateApiKey()` اور اس کا فیصلہ حتمی — ہے یہ کبھی بھی API-key پاتھ یا degrade-to-unonymous برانچ میں نہیں آتا، لہذا شناخت فراہم کرنے والے کی بندش کھلی رسائی نہیں بن سکتی۔ جامد API کیز غیر متاثر ہیں۔ [Entra ID SSO](../security/ENTRA_SSO.md) دیکھیں۔
- **`managementPolicy`** (`policies/management.ts`) — ڈیش بورڈ سیشن، اندرونی ماڈل کی مطابقت پذیری کی درخواستوں کو قبول کرتا ہے ( `/api/providers/[name]/(sync-models|models)` کے خلاف مماثل ہے)، یا اگر `isAuthRequired()` غلط لوٹتا ہے تو مکمل طور پر چھوڑ دیتا ہے۔ 403 (`AUTH_001`) واپس کرتا ہے جب بیئرر ٹوکن موجود ہو لیکن غلط ہو، ورنہ 401۔ روٹ گارڈ ٹائرز (LOCAL_ONLY / ALWAYS_PROTECTED) کو بھی نافذ کرتا ہے اس سے پہلے کہ کسی بھی auth برانچ — [روٹ گارڈ ٹائرز](../security/ROUTE_GUARD_TIERS.md) دیکھیں۔ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` میں LOCAL_ONLY پاتھز (آج: `/api/mcp/`) تک نان لوپ بیک سے اس وقت رسائی حاصل کی جا سکتی ہے جب بیئرر کلید `manage` اسکوپ کو لے جاتی ہے۔ دیگر تمام LOCAL_ONLY راستے دائرہ کار سے قطع نظر سخت-لوپ بیک رہتے ہیں۔

ایک کامیاب پالیسی `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` کے ساتھ `AuthSubject` واپس کرتی ہے۔ ڈاؤن اسٹریم ہینڈلرز اسے `src/server/authz/assertAuth.ts` میں `assertAuth(request, "CLIENT_API")` کے ذریعے auth logic کو دوبارہ چلانے کے بجائے پڑھ سکتے ہیں۔

## عوامی روٹس کی فہرست

`src/shared/constants/publicApiRoutes.ts` واضح اجازت شدہ فہرست ہے:

یہ فہرست **شکل** کے لحاظ سے تقسیم کی گئی ہے، اور یہ تقسیم نہایت اہم ہے (GHSA-74g9-q8f6-793h): کسی prefix کو
`startsWith()` کے ذریعے ملایا جاتا ہے، اس لیے یہ ان تمام ملحقہ paths سے بھی match ہو جاتا ہے جو اس کے ابتدائی حروف
شیئر کرتے ہیں۔ `/api/usage/om-usage` کو prefix کے طور پر `/api/usage/om-usage<anything>` PUBLIC نشان زد کرتا ہے، اور Next اسے
`/api/usage/[connectionId]` پر resolve کرتا ہے — ایسا handler جس کی اپنی کوئی auth نہیں ہے۔

```ts
// حقیقی subtrees۔ ہر entry کا "/" پر ختم ہونا لازمی ہے (unit test کے ذریعے assert کیا جاتا ہے)۔
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify میں CLIENT_API سمجھا جاتا ہے، "no-auth public" نہیں
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// واحد routes، جنہیں trailing slash کے ساتھ یا اس کے بغیر EXACTLY match کیا جاتا ہے۔
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // opt-in TOTP کے لیے login step 2؛ MFA-pending cookie درکار ہے
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// صرف پڑھنے کے لیے واحد routes، جن پر CORS origin relaxation بھی لاگو ہوتی ہے۔
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// صرف پڑھنے کے لیے واحد route، جس پر CORS relaxation لاگو نہیں ہوتی۔
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

صرف محفوظ methods کے لیے read-only routes عوامی ہوتے ہیں۔ نوٹ: `classifyRoute()`، PUBLIC fall-through سے `/api/v1/*` اور `/api/v1beta/*` کو خارج کرتا ہے — یہ ہمیشہ `CLIENT_API` ہوتے ہیں، اس لیے Bearer-key policy بدستور لاگو رہتی ہے۔

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

پائپ لائن ہمیشہ اس کے ساتھ جوابات پر مہر لگاتی ہے:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

تصدیق شدہ درخواستوں کے لیے اپ اسٹریم (ہینڈلر سائیڈ) درخواست کے ہیڈر میں بھی شامل ہیں:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ہینڈلرز — کے اندر `assertAuth(req, expectedClass)` استعمال کریں اگر مڈل ویئر کو نظرانداز کیا گیا تھا تو یہ `AuthzAssertionError` کوڈ `AUTHZ_NOT_INITIALIZED` کے ساتھ پھینک دیتا ہے (ٹیسٹوں میں کنفیگریشن ریگریشنز کو پکڑنے میں مددگار)۔

## مزید دیکھیں

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ہر اینڈ پوائنٹ کے لیے auth مارکر
- [COMPLIANCE.md](../security/COMPLIANCE.md) — auth ایونٹس کے لیے آڈٹ لاگ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — تین اسکوپ نیم اسپیسز اور MCP ٹول-اسکوپ کیٹلاگ
- ماخذ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
