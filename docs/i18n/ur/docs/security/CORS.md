# CORS Configuration & Security (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute کنٹرول کرتا ہے جو **براؤزر کی اصل** ایک واحد، مرکزی اجازت کی فہرست سے کراس اوریجن جوابات پڑھ سکتے ہیں۔ ماڈل ہے۔**پہلے سے طے شدہ طور پر ناکام** : کسی بھی اصل کی اجازت نہیں ہے جب تک کہ آپ کسی کو منتخب نہیں کرتے۔ یہ صفحہ دستاویز کرتا ہے کہ اجازت کی فہرست کیسے حل ہوتی ہے، `CORS_ALLOW_ALL=true` اصل میں کیا ظاہر کرتا ہے (اور اہم بات یہ ہے کہ یہ کیا کرتا ہے)**نہیں** )، dev بمقابلہ پروڈکشن کو محفوظ طریقے سے کنفیگر کرنے کا طریقہ، اور رن ٹائم وارننگ ڈیش بورڈ سے ظاہر ہوتا ہے کہ وائلڈ کارڈ لائیو ہونے پر۔

**سچائی کا ماخذ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`)۔ اجازت کی فہرست ایک بار لاگو ہوتی ہے، مڈل ویئر (`src/server/authz/pipeline.ts`) میں — فی روٹ ہینڈلرز خود `Access-Control-Allow-Origin` سیٹ نہیں کرتے ہیں۔

## ایک اصلیت کو کیسے حل کیا جاتا ہے۔

ہر درخواست کے لیے مڈل ویئر اس ترتیب میں `Access-Control-Allow-Origin` قدر کا حساب کرتا ہے:

1. **`CORS_ALLOW_ALL=true`** (یا لیگیسی `CORS_ORIGIN=*`) → `Vary: Origin` کے ساتھ کال کرنے والے کے `Origin` بیک کرتا ہے (یا `*` جب کوئی `Origin` ہیڈر نہیں ہوتا ہے)، تاکہ کیچز درست رہیں۔ وہی `applyCorsHeaders()` چوک پوائنٹ ٹوکن سے تصدیق شدہ `/v1*`/`/v1beta*` سطح (`relaxForTokenAuth`, RFC 9110 §12.5.5، شمارہ #6737) پر ہر 2xx-کے ساتھ-باڈی ردعمل میں `Vary: Accept-Encoding` بھی شامل کرتا ہے، لہذا downstream/shared کیچز کمپریسڈ بمقابلہ غیر کمپریسڈ مختلف حالتوں میں صحیح طریقے سے فرق کر سکتے ہیں۔
2. بصورت دیگر، درخواست `Origin` کو نارملائز کیا جاتا ہے (لوئر کیسڈ، ٹریلنگ سلیش سٹرپڈ) اور اس سے مماثل **ضم شدہ اجازت کی فہرست** :
   - env **`CORS_ALLOWED_ORIGINS`** — کوما سے الگ کردہ فہرست، اور
   - رن ٹائم **`corsOrigins`** ترتیب (ڈیش بورڈ → سیکیورٹی → _CORS Allowed Origins_)، `src/lib/config/runtimeSettings.ts` سے `setRuntimeAllowedOrigins()` کے ذریعے انجیکشن لگایا گیا ہے۔
3. کوئی میچ → نہیں ہے۔**کوئی `Access-Control-Allow-Origin` ہیڈر خارج نہیں ہوتا ہے۔** . براؤزر کراس اوریجن پڑھنے کو روکتا ہے۔ یہ مطلوبہ ناکام بند شدہ ڈیفالٹ ہے۔

| Env var                | مطلب                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | اجازت دینے کے لیے عین اصل کا CSV (تجویز کردہ)۔                                                    |
| `CORS_ALLOW_ALL`       | `true`/`1` → کسی بھی اصل (وائلڈ کارڈ) کی بازگشت۔ صرف دیو۔                                         |
| `CORS_ORIGIN`          | میراث `*` `CORS_ALLOW_ALL` کی طرح برتاؤ کرتا ہے؛ اجازت کی فہرست میں ایک واحد قدر شامل کی جاتی ہے۔ |

## دھمکی کا ماڈل — جسے `CORS_ALLOW_ALL=true` واقعی بے نقاب کرتا ہے۔

عام OWASP وارننگ ("وائلڈ کارڈ CORS = کوئی بھی سائٹ آپ کے API کال کر سکتی ہے") سنجیدگی سے لینے کے قابل ہے، لیکن OmniRoute کی نمائش **عام کیس سے تنگ** ، ایک ٹھوس نفاذ حقیقت کی وجہ سے:

> **مرکزی `applyCorsHeaders()` کبھی بھی `Access-Control-Allow-Credentials` اخراج نہیں کرتا ہے۔** ایک براؤزر _credentialed_ (cookie-bearing) کراس اوریجن جواب کو ظاہر نہیں کرے گا جب تک کہ سرور `Access-Control-Allow-Credentials: true` نہ بھیجے۔ OmniRoute کا مشترکہ CORS راستہ کبھی نہیں کرتا ہے۔

فی سطح کا کیا مطلب ہے، یہاں تک کہ `CORS_ALLOW_ALL=true` کے ساتھ:

| سطح                                       | تصدیق کا طریقہ کار       | وائلڈ کارڈ CORS کا اثر                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ڈیش بورڈ / MANAGEMENT `/api/*`            | کوکی سیشن                | اصل بازگشت ہے، لیکن **`Allow-Credentials` کے بغیر** براؤزر **بلاکس** مستند پڑھا. ایک بدنیتی پر مبنی کراس اوریجن سائٹ **پڑھ نہیں سکتا؟** آپ کے تصدیق شدہ ڈیش بورڈ کے جوابات، اور سیشن کوکی سامنے نہیں آئی ہے۔                                                                                                                                                                                                                                                                                                                                      |
| کلائنٹ API `/v1/*`، `/v1beta/*`           | بیئرر / `x-api-key` ہیڈر | پہلے ہی اجازت یافتہ **ڈیزائن کی طرف سے** (`relaxForTokenAuth`): براؤزر کبھی بھی `Authorization`/`x-api-key` کو خود بخود منسلک نہیں کرتے ہیں، لہذا حملہ آور کا صفحہ آپ کی کلید فراہم نہیں کر سکتا۔ آرام دہ بازگشت کے لیے ایک توثیق شدہ موضوع (ایک توثیق شدہ API کلید یا ڈیش بورڈ سیشن) کی ضرورت ہوتی ہے، نہ کہ صرف ایک سندی ہیڈر، اور اس میں کبھی بھی `Access-Control-Allow-Credentials` شامل نہیں ہوتا ہے۔ گمنام جوابات (`REQUIRE_API_KEY=false`) کنفیگر شدہ اصل اجازت کی فہرست کا استعمال کرتے ہیں، بشمول ایک واضح `CORS_ALLOW_ALL=true` آپٹ ان۔ |
| صرف عوامی پڑھنے کے لیے (`/api/health`, …) | کوئی نہیں۔               | غیر حساس؛ وائلڈ کارڈ بے ضرر ہے۔                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

تو **بقایا** `CORS_ALLOW_ALL=true` کی نمائش ان تک محدود ہے: (a) غیر مستند کراس اوریجن **پڑھتا ہے** پہلے سے غیر تصدیق شدہ ڈیٹا کا، اور (b) CORS اجازت دینا **پری فلائٹ پاس** انتظامی راستوں پر — جس کو ابھی بھی تصدیق کی ضرورت ہوتی ہے جو کراس اوریجن صفحہ فراہم نہیں کر سکتا۔ یہ ہے **نہیں** مشترکہ CORS پاتھ پر سیشن ہائی جیک یا کریڈینشل تھیفٹ ویکٹر۔

### ایک حقیقی استثنا — `/api/v1/agents/`

کلاؤڈ ایجنٹ کے راستے (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) نے اپنے **اپنے** CORS ہیڈر (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) اور **کرو** `Access-Control-Allow-Origin: <origin>|*` `Access-Control-Allow-Credentials: true` کے ساتھ مل کر خارج کریں۔ یہ واحد سطح ہے جہاں اوریجین ایکو اور اسناد ایک ساتھ رہتے ہیں، اور یہ ہے۔**`CORS_ALLOW_ALL` سے آزاد** . یہ راستے انتظامی تصدیق شدہ ہیں (`requireManagementAuth`)؛ آپریٹرز جو ڈیش بورڈ آف ہوسٹ کو بے نقاب کرتے ہیں ان کو آگاہ ہونا چاہیے کہ جوابی ہیڈرز کے ذریعے کراس اوریجن کی تصدیق شدہ پڑھنے کی یہی ایک جگہ اجازت ہے۔ اسے ایک واضح اجازت کی فہرست میں سخت کرنا اس CORS رہنمائی سے الگ سے ٹریک کیا جاتا ہے۔

## پروڈکشن چیک لسٹ

- **کبھی بھی پیداوار میں `CORS_ALLOW_ALL=true` متعین نہ کریں۔** اسے بغیر سیٹ ہونے دیں۔
- ایک سیٹ کریں۔**واضح** اصل فہرست — یا تو env var یا سیکیورٹی ٹیب فیلڈ:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- اگر OmniRoute ریورس پراکسی / ٹنل (nginx، Caddy، Cloudflare Tunnel، Tailscale) کے پیچھے بھاگتا ہے، CORS ہے **نہیں** آپ کا واحد کنٹرول — لوپ بیک روٹ گارڈ اب بھی سپون کے قابل راستوں کی حفاظت کرتا ہے (دیکھیں [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) )۔ 403 کو "ٹھیک" کرنے کے لیے `X-Forwarded-For: 127.0.0.1` جعلسازی نہ کریں۔ جو روٹ گارڈ بند ہونے والے RCE کلاس کو دوبارہ کھولتا ہے۔
- رن ٹائم حالت کی تصدیق کریں: ڈیش بورڈ دکھاتا ہے a **مسلسل امبر بینر** ڈیش بورڈ کے تحت → سیکیورٹی → کی اجازت انوینٹری جب بھی `CORS_ALLOW_ALL=true` لائیو ہوتا ہے، اور `/api/settings/authz-inventory` ایک `cors: { allowAll, allowedOrigins }` لفافے کی نگرانی کرنے والے ٹولز پول کر سکتے ہیں۔

## ترقی کی سہولت — مخصوص مقامی اصل کی اجازت دیتی ہے۔

آپ کو dev میں بھی شاذ و نادر ہی وائلڈ کارڈ کی ضرورت ہوتی ہے۔ صرف ان ڈیو سرورز کو اجازت دیں جو آپ استعمال کرتے ہیں:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ٹریلنگ سلیش کو نظر انداز کرنے کے ساتھ اصلیت غیر حساس طور پر مماثل ہے، لہذا `http://localhost:3000` اور `http://localhost:3000/` برابر ہیں۔ اسی CSV رن ٹائم میں سیٹ کیا جا سکتا ہے۔**ڈیش بورڈ → سیکیورٹی → CORS اجازت یافتہ اصل** دوبارہ شروع کیے بغیر۔

## API کیز بمقابلہ کوکی سیشن

- **اٹھانے والا/ `x-api-key` (د `/v1/*` تخمینہ سطح):** براؤزر ان کو خود بخود منسلک نہیں کرتے ہیں۔ CORS یہاں کوئی معنی خیز رکاوٹ نہیں ہے۔ — دی API کلیدی رکاوٹ ہے — یہی وجہ ہے کہ اس سطح کو جان بوجھ کر اجازت دی گئی ہے لہذا براؤزر اور Electron کلائنٹ ان جوابات کو پڑھ سکتے ہیں جن کے وہ پہلے ہی حقدار ہیں۔ آرام دہ بازگشت کو ایک توثیق شدہ مضمون کی ضرورت ہے (ایک توثیق شدہ API کلید یا ڈیش بورڈ سیشن)، نہ صرف ایک سندی ہیڈر، اور اس میں کبھی شامل نہیں ہوتا ہے۔ `Access-Control-Allow-Credentials`. گمنام جوابات (`REQUIRE_API_KEY=false`) کنفیگر شدہ اصل کی اجازت کی فہرست کا استعمال کریں، بشمول ایک واضح `CORS_ALLOW_ALL=true` آپٹ ان توثیق مسترد (401) پڑھنے کے قابل رہتے ہیں تاکہ کلائنٹ منسوخ یا غلط ٹائپ شدہ کلید کو منظر عام پر لا سکیں (#5242): پائپ لائن کا اپنا 401 بازگشت رکھتا ہے، اور ایک راستہ جو پائپ لائن کے گمنام کے طور پر کام کرنے کے بعد خود ہی کلید سے انکار کر دیتا ہے (`/v1/models` اور `/v1beta/models` انتظامی تصدیق کے ساتھ، مالک کے دائرہ کار میں `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` اور آٹو کومبو امیدوار روٹس) اس 401 کے ذریعے ایکو کو شامل کرتا ہے۔ `credentialRejectionHeaders()`. ایکو کو اس درخواست پر کلید کیا جاتا ہے جس میں اسناد کا ہیڈر ہوتا ہے (`Authorization`, `x-api-key`, `x-goog-api-key` یا `auth_token` cookie)، نہیں کہ ان میں سے کس راستے پر چیک کیا گیا، اور کبھی بھی اس کے ساتھ جوڑا نہیں بنایا جاتا `Access-Control-Allow-Credentials`; جسم ایک مقررہ غلطی کا لفافہ ہے۔ انتظامی راستوں کے تحت `/api/v1/` کی طرف سے حفاظت `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) اس سند کو مسترد کرنے والے استثناء کا استعمال نہ کریں: کے ساتھ `REQUIRE_API_KEY=false`، ان کی 401/403 جوابات ترتیب شدہ کی پیروی کرتے ہیں۔ CORS اصل پالیسی.
- **کوکی سیشن (ڈیش بورڈ):** فیل بند ڈیفالٹ کے ذریعے محفوظ ہے۔**اور** مشترکہ راستے پر `Access-Control-Allow-Credentials` کی عدم موجودگی سے۔ management/dashboard اصلیت کو کسی بھی قابل اجازت ترتیب سے باہر رکھیں؛ انہیں بالکل فیل بند رہنا چاہیے۔

## WebSocket مصافحہ (`/v1/responses`, `/v1/ws`)

براؤزر CORS کو WebSocket پر لاگو نہیں کرتے ہیں، اس لیے WebSocket نقل و حمل جو انفرنس آؤٹ پٹ واپس کرتے ہیں وہ خود ہینڈ شیک `Origin` چیک کرتے ہیں (`src/server/origin/wsOrigin.ts`): جوابات WebSocket (`/v1/responses`) اور، جب OmniRoute `npm start` / `npm run dev`، `/v1/ws` اور `/api/v1/ws` پل سے گزرتا ہے، جو `/v1/chat/completions`، `/v1/messages` اور `/v1/responses` فریم کے طور پر چلاتا ہے۔ پل `/api/v1/ws?handshake=1` فیصلے کے لیے کہتا ہے اور اس وقت تک اپ گریڈ کرنے سے انکار کر دیتا ہے جب تک کہ وہ راستہ چیک نہ کرے۔ تصدیق کے تقاضے اب بھی الگ سے لاگو ہوتے ہیں۔ اصل چیک پاس ہوتا ہے جب:

- اس کا کوئی `Origin` ہیڈر نہیں ہے (Codex CLI، SDKs اور دیگر غیر براؤزر کلائنٹس)؛
- `Origin` اوپر دی گئی اجازت کی فہرست کے ذریعے داخل کیا جاتا ہے (`CORS_ALLOWED_ORIGINS`, `corsOrigins` ترتیب، `CORS_ORIGIN`, `CORS_ALLOW_ALL`)؛
- `Origin` OmniRoute کی اپنی عوامی اصلیت میں سے ایک ہے (تشکیل شدہ عوامی بنیاد URL، ایک قابل اعتماد پراکسی کی فارورڈ اصل، یا IP لٹریل یا `localhost` — کے طور پر دیا گیا براہ راست loopback/LAN میزبان وہی امیدوار ہیں جو ڈیش بورڈ میوٹیشن چیک استعمال کرتے ہیں)؛ یا
- یہ ایک درست API کلید رکھتا ہے، جیسا کہ HTTP `/v1/*` سطح پر ہے۔

اور کچھ بھی `403 ws_origin_forbidden` حاصل کرتا ہے۔ ڈیش بورڈ سیشن کوکی غیر ملکی `Origin` سے مستثنیٰ نہیں ہے، کیونکہ براؤزر اسے کسی بھی صفحہ کے ساکٹ سے منسلک کرتا ہے۔ کسی اور بندرگاہ پر `localhost` ایک ہی اصل نہیں سمجھا جاتا ہے۔ `CORS_ALLOWED_ORIGINS` میں ایسی دیو اصلیت شامل کریں۔

## مثال: OmniRoute کے سامنے ریورس پراکسی

CORS خود OmniRoute کے ذریعہ نافذ کیا جاتا ہے، لہذا پراکسی کو عام طور پر ہونا چاہئے۔**نہیں** `Access-Control-*` ہیڈر شامل کریں یا دوبارہ لکھیں (ڈبل ہیڈرز بریک براؤزر)۔ TLS کو ختم کریں اور — کو آگے بڑھانے دیں OmniRoute پری فلائٹ کا جواب دیں:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

پراکسی `CORS_ALLOWED_ORIGINS` نہیں OmniRoute

## ماخذ فائلیں۔

| تشویش                                     | فائل                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------- |
| اجازت نامے کی قرارداد + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| مڈل ویئر ایپلیکیشن (سچائی کا واحد ذریعہ)  | `src/server/authz/pipeline.ts`                                       |
| ترتیبات → رن ٹائم اوریجن انجیکشن          | `src/lib/config/runtimeSettings.ts`                                  |
| ڈیش بورڈ کے لیے رن ٹائم اسٹیٹس            | `src/app/api/settings/authz-inventory/route.ts`                      |
| ڈیش بورڈ وارننگ بینر                      | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS اجازت یافتہ اوریجن فیلڈ              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| کلاؤڈ ایجنٹ فی روٹ CORS (استثنیٰ)         | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket ہینڈ شیک `Origin` چیک کریں۔     | `src/server/origin/wsOrigin.ts`                                      |

## یہ بھی دیکھیں

- [روٹ گارڈ ٹائرز](./ROUTE_GUARD_TIERS.md) — لوپ بیک انفورسمنٹ اسپن کے قابل راستوں کے لیے (ایک علیحدہ، تکمیلی کنٹرول)۔
- [اتھارٹی گائیڈ](../architecture/AUTHZ_GUIDE.md) — مکمل توثیق پائپ لائن۔
