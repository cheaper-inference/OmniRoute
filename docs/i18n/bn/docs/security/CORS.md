# CORS Configuration & Security (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute যা নিয়ন্ত্রণ করে**ব্রাউজারের উত্স** একটি একক, কেন্দ্রীয় অনুমোদিত তালিকা থেকে ক্রস-অরিজিন প্রতিক্রিয়া পড়তে পারে। মডেল হল **ডিফল্টরূপে ব্যর্থ-বন্ধ** : আপনি একটি নির্বাচন না করা `CORS_ALLOW_ALL=true` কোন উৎসের অনুমতি নেই **না** ), কিভাবে dev বনাম প্রোডাকশন নিরাপদে কনফিগার করতে হয় এবং ওয়াইল্ডকার্ড লাইভ হলে ড্যাশবোর্ডে রানটাইম সতর্কতা দেখায়।

**সত্যের উত্স:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`)। অনুমতি তালিকাটি একবার প্রয়োগ করা হয়, মিডলওয়্যারে (`src/server/authz/pipeline.ts`) — প্রতি-রুট হ্যান্ডলাররা `Access-Control-Allow-Origin` সেট করে না।

## কিভাবে একটি উত্স সমাধান করা হয়

প্রতিটি অনুরোধের জন্য মিডলওয়্যার এই ক্রমে `Access-Control-Allow-Origin` মান গণনা করে:

1. **`CORS_ALLOW_ALL=true`** (বা লিগ্যাসি `CORS_ORIGIN=*`) → কলারের `Origin` ব্যাক ইকো করে (বা `Origin` হেডার না থাকলে `*` ), `Vary: Origin` এর সাথে যাতে ক্যাশে সঠিক থাকে। একই `applyCorsHeaders()` চোকপয়েন্ট টোকেন-প্রমাণিত `/v1*`/`/v1beta*` সারফেস (`relaxForTokenAuth`, RFC 9110 §12.5.5, ইস্যু #6737) এর প্রতিটি 2xx-সহ-শরীরের প্রতিক্রিয়াতেও `Vary: Accept-Encoding` যুক্ত করে, তাই downstream/shared ক্যাশে সংকুচিত বনাম আনকমপ্রেসড ভেরিয়েন্টের মধ্যে সঠিকভাবে পার্থক্য করতে পারে।
2. অন্যথায়, অনুরোধ `Origin` স্বাভাবিক করা হয় (লোয়ার-কেসড, ট্রেইলিং স্ল্যাশ স্ট্রাইপড) এবং এর সাথে মিলে যায়**একত্রিত অনুমোদিত তালিকা** :
   - env **`CORS_ALLOWED_ORIGINS`** — কমা দ্বারা পৃথক তালিকা, এবং
   - রানটাইম **`corsOrigins`** সেটিং (ড্যাশবোর্ড → সিকিউরিটি → _CORS Allowed Origins_), `src/lib/config/runtimeSettings.ts` থেকে `setRuntimeAllowedOrigins()` এর মাধ্যমে ইনজেক্ট করা হয়েছে।
3. কোন মিল নেই →**কোন `Access-Control-Allow-Origin` হেডার নির্গত হয় না** . ব্রাউজার ক্রস-অরিজিন রিড ব্লক করে। এটি উদ্দেশ্যযুক্ত ব্যর্থ-বন্ধ ডিফল্ট।

| Env var                | অর্থ                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | অনুমতি দেওয়ার জন্য সঠিক উত্সের CSV (প্রস্তাবিত)।                                          |
| `CORS_ALLOW_ALL`       | `true`/`1` → যেকোন অরিজিন ইকো (ওয়াইল্ডকার্ড)। শুধু দেব।                                   |
| `CORS_ORIGIN`          | উত্তরাধিকার। `*` `CORS_ALLOW_ALL` মত আচরণ করে; অনুমোদিত তালিকায় একটি একক মান যোগ করা হয়। |

## হুমকি মডেল — কি `CORS_ALLOW_ALL=true` সত্যিই প্রকাশ করে

জেনেরিক OWASP সতর্কতা ("ওয়াইল্ডকার্ড CORS = যেকোনো সাইট আপনার API কল করতে পারে") গুরুত্ব সহকারে নেওয়ার মতো, কিন্তু OmniRoute এর এক্সপোজার **জেনেরিক কেসের চেয়ে সংকীর্ণ** , একটি কংক্রিট বাস্তবায়নের কারণে:

> **কেন্দ্রীয় `applyCorsHeaders()` কখনো `Access-Control-Allow-Credentials` নির্গত করে না।** সার্ভার `Access-Control-Allow-Credentials: true` না পাঠালে একটি ব্রাউজার একটি _credentialed_ (কুকি-বিয়ারিং) ক্রস-অরিজিন প্রতিক্রিয়া প্রকাশ করবে না। OmniRoute এর শেয়ার করা CORS পাথ কখনই করে না।

পৃষ্ঠ প্রতি এর মানে কি, এমনকি `CORS_ALLOW_ALL=true` সহ:

| সারফেস                                       | প্রমাণীকরণ প্রক্রিয়া       | ওয়াইল্ডকার্ড CORS এর প্রভাব                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ড্যাশবোর্ড / MANAGEMENT `/api/*`             | কুকি সেশন                   | মূল প্রতিধ্বনিত হয়, কিন্তু**`Allow-Credentials` ছাড়া** ব্রাউজার **ব্লক** শংসাপত্র পড়া. একটি দূষিত ক্রস-অরিজিন সাইট **পড়তে পারে না** আপনার প্রমাণীকৃত ড্যাশবোর্ড প্রতিক্রিয়া, এবং সেশন কুকি প্রকাশ করা হয় না।                                                                                                                                                                                                                                                                                                                           |
| ক্লায়েন্ট API `/v1/*`, `/v1beta/*`          | বহনকারী / `x-api-key` হেডার | ইতিমধ্যেই অনুমতিপ্রাপ্ত **নকশা দ্বারা** (`relaxForTokenAuth`): ব্রাউজারগুলি কখনই `Authorization`/`x-api-key` স্বয়ংক্রিয়ভাবে সংযুক্ত করে না, তাই আক্রমণকারীর পৃষ্ঠা আপনার কী সরবরাহ করতে পারে না। শিথিল প্রতিধ্বনির জন্য একটি প্রমাণীকৃত বিষয় (একটি বৈধ API কী বা ড্যাশবোর্ড সেশন) প্রয়োজন, শুধুমাত্র একটি শংসাপত্রের শিরোনাম নয়, এবং কখনও `Access-Control-Allow-Credentials` অন্তর্ভুক্ত করে না। বেনামী প্রতিক্রিয়া (`REQUIRE_API_KEY=false`) একটি স্পষ্ট `CORS_ALLOW_ALL=true` অপ্ট-ইন সহ কনফিগার করা মূল অনুমোদন তালিকা ব্যবহার করে। |
| শুধুমাত্র পাবলিক পঠনযোগ্য (`/api/health`, …) | কোনোটিই নয়                 | অ-সংবেদনশীল; ওয়াইল্ডকার্ড নিরীহ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

তাই **অবশিষ্ট** `CORS_ALLOW_ALL=true` এর এক্সপোজার সীমাবদ্ধ: (a) অ-প্রমাণপত্রবিহীন ক্রস-অরিজিন **পড়ে** ইতিমধ্যে-অপ্রমাণিত ডেটা, এবং (খ) CORS লেট করা**প্রিফ্লাইট পাস** ম্যানেজমেন্ট রুটগুলিতে — যার এখনও প্রমাণীকরণ প্রয়োজন যা একটি ক্রস-অরিজিন পৃষ্ঠা প্রদান করতে পারে না। এটা**না** শেয়ার করা CORS পাথে একটি সেশন-হইজ্যাক বা শংসাপত্র-চুরি ভেক্টর।

### একটি প্রকৃত ব্যতিক্রম — `/api/v1/agents/`

ক্লাউড-এজেন্ট রুট (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) তাদের সেট করে**নিজস্ব** CORS হেডার (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) এবং**করতে** `Access-Control-Allow-Credentials: true` এর সাথে একসাথে `Access-Control-Allow-Origin: <origin>|*` নির্গত করুন। এটি একটি একক পৃষ্ঠ যেখানে উত্স-প্রতিধ্বনি এবং প্রমাণপত্র সহাবস্থান, এবং এটি হয়**`CORS_ALLOW_ALL` থেকে স্বাধীন** . এই রুটগুলি ব্যবস্থাপনা-প্রমাণিত (`requireManagementAuth`); অপারেটর যারা ড্যাশবোর্ড অফ-হোস্টকে প্রকাশ করে তাদের সচেতন হওয়া উচিত যে এটি এমন একটি জায়গা যেখানে প্রতিক্রিয়া শিরোনাম দ্বারা ক্রস-অরিজিন শংসাপত্র পড়া অনুমোদিত। এই CORS নির্দেশিকা থেকে এটিকে একটি সুস্পষ্ট অনুমোদন তালিকায় আঁটসাঁট করা আলাদাভাবে ট্র্যাক করা হয়েছে।

## উত্পাদন চেকলিস্ট

- **উৎপাদনে `CORS_ALLOW_ALL=true` সেট করবেন না।** সেট না করে রেখে দিন।
- একটি সেট করুন **স্পষ্ট** মূল তালিকা — হয় env var বা নিরাপত্তা-ট্যাব ক্ষেত্র:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- যদি OmniRoute একটি বিপরীত প্রক্সি / টানেলের পিছনে চলে (nginx, Caddy, Cloudflare টানেল, Tailscale), CORS হয়**না** আপনার একমাত্র নিয়ন্ত্রণ — লুপব্যাক রুট গার্ড এখনও স্পন-সক্ষম রুটগুলিকে রক্ষা করে (দেখুন [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) )। একটি 403 "ঠিক" করতে `X-Forwarded-For: 127.0.0.1` জাল করবেন না; যে রুট গার্ড বন্ধ হয়ে যায় RCE ক্লাস পুনরায় খোলে।
- রানটাইম অবস্থা নিশ্চিত করুন: ড্যাশবোর্ড দেখায় a **ক্রমাগত অ্যাম্বার ব্যানার** ড্যাশবোর্ড → সিকিউরিটি → অথরাইজেশন ইনভেন্টরির অধীনে যখনই `CORS_ALLOW_ALL=true` লাইভ থাকে, এবং `/api/settings/authz-inventory` একটি `cors: { allowAll, allowedOrigins }` খাম পর্যবেক্ষণ সরঞ্জাম প্রদান করে ভোট দিতে পারে৷

## উন্নয়ন সুবিধা — নির্দিষ্ট স্থানীয় উত্সের অনুমতি দেয়

এমনকি ডেভ-এ আপনার খুব কমই ওয়াইল্ডকার্ডের প্রয়োজন হয়। আপনি যে ডেভ সার্ভারগুলি ব্যবহার করেন সেগুলিকে অনুমতি দিন:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

অরিজিনগুলি কেস-অসংবেদনশীলভাবে মিলে যায় এবং ট্রেলিং স্ল্যাশ উপেক্ষা করা হয়, তাই `http://localhost:3000` এবং `http://localhost:3000/` সমতুল্য। একই CSV রানটাইমে সেট করা যেতে পারে**ড্যাশবোর্ড → নিরাপত্তা → CORS অনুমোদিত মূল** রিস্টার্ট ছাড়াই।

## API কী বনাম কুকি সেশন

- **বহনকারী/ `x-api-key` (the `/v1/*` অনুমান পৃষ্ঠ):** ব্রাউজার কখনই স্বয়ংক্রিয়ভাবে এগুলি সংযুক্ত করে না। CORS এখানে একটি অর্থপূর্ণ বাধা নয় — দ API কী হল বাধা — যে কারণে যে পৃষ্ঠ ইচ্ছাকৃতভাবে অনুমোদিত তাই ব্রাউজার এবং Electron ক্লায়েন্টরা প্রতিক্রিয়া পড়তে পারে যা তারা ইতিমধ্যেই যোগ্য। শিথিল ইকোর জন্য একটি প্রমাণীকৃত বিষয় প্রয়োজন (একটি বৈধ API কী বা ড্যাশবোর্ড সেশন), শুধুমাত্র একটি শংসাপত্র শিরোনাম নয়, এবং কখনই অন্তর্ভুক্ত করে না `Access-Control-Allow-Credentials`. বেনামী প্রতিক্রিয়া (`REQUIRE_API_KEY=false`) একটি সুস্পষ্ট সহ কনফিগার করা মূল অনুমোদন তালিকা ব্যবহার করুন `CORS_ALLOW_ALL=true` অপ্ট-ইন প্রমাণ প্রত্যাখ্যান (401) পঠনযোগ্য থাকে যাতে ক্লায়েন্টরা একটি প্রত্যাহার করা বা ভুল টাইপ করা কী দেখতে পারে (#5242): পাইপলাইনের নিজস্ব 401 ইকো রাখে, এবং একটি রুট যা পাইপলাইনটি বেনামী হিসাবে পরিবেশন করার পরে নিজেই কীটি প্রত্যাখ্যান করে (`/v1/models` এবং `/v1beta/models` ম্যানেজমেন্ট auth কনফিগার করা, মালিক-স্কোপড `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` এবং স্বয়ংক্রিয়-কম্বো প্রার্থী রুট) যে 401 এর মাধ্যমে প্রতিধ্বনি যোগ করে `credentialRejectionHeaders()`. একটি শংসাপত্রের শিরোনাম (`Authorization`, `x-api-key`, `x-goog-api-key` অথবা `auth_token` cookie), তাদের মধ্যে কোন রুট চেক করা হয়েছে তা নয় এবং এর সাথে কখনও জোড়া হয় না `Access-Control-Allow-Credentials`; শরীর একটি নির্দিষ্ট ত্রুটি খাম. ব্যবস্থাপনা রুট অধীনে `/api/v1/` দ্বারা রক্ষিত `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) এই শংসাপত্র-প্রত্যাখ্যান ব্যতিক্রম ব্যবহার করবেন না: সঙ্গে `REQUIRE_API_KEY=false`, তাদের 401/403 প্রতিক্রিয়াগুলি কনফিগার করা অনুসরণ করে CORS মূল নীতি।
- **কুকি সেশন (ড্যাশবোর্ড):** ব্যর্থ-বন্ধ ডিফল্ট দ্বারা সুরক্ষিত **এবং** ভাগ করা পথে `Access-Control-Allow-Credentials` অনুপস্থিতির দ্বারা। management/dashboard অরিজিনগুলিকে যেকোনো অনুমতিমূলক কনফিগারের বাইরে রাখুন; তাদের অবশ্যই ব্যর্থ-বন্ধ থাকতে হবে।

## WebSocket হ্যান্ডশেক (`/v1/responses`, `/v1/ws`)

ব্রাউজারগুলি WebSocket তে CORS প্রয়োগ করে না, তাই WebSocket ট্রান্সপোর্ট যা ইনফারেন্স আউটপুট ফেরত দেয় তারা হ্যান্ডশেক `Origin` নিজেই চেক করে (`src/server/origin/wsOrigin.ts`): প্রতিক্রিয়া WebSocket (`/v1/responses`) এবং, যখন OmniRoute `npm start` / `npm run dev`, `/v1/ws` এবং `/api/v1/ws` সেতুর মধ্য দিয়ে চলে, যা `/v1/chat/completions`, `/v1/messages` এবং `/v1/responses` ফ্রেম হিসাবে প্রবাহিত হয়। সেতুটি `/api/v1/ws?handshake=1` রায়ের জন্য বলে এবং সেই রুটটি চেক না করা পর্যন্ত আপগ্রেড করতে অস্বীকার করে। প্রমাণীকরণের প্রয়োজনীয়তা এখনও আলাদাভাবে প্রযোজ্য। মূল চেক পাস হয় যখন:

- এটির কোন `Origin` হেডার নেই (Codex CLI, SDKs এবং অন্যান্য নন-ব্রাউজার ক্লায়েন্ট);
- `Origin` উপরে অনুমোদিত তালিকা দ্বারা ভর্তি করা হয়েছে (`CORS_ALLOWED_ORIGINS`, `corsOrigins` সেটিং, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` হল OmniRoute এর নিজস্ব পাবলিক অরিজিনগুলির মধ্যে একটি (কনফিগার করা পাবলিক বেস URL, একটি বিশ্বস্ত প্রক্সির ফরোয়ার্ড অরিজিন, বা IP আক্ষরিক হিসাবে দেওয়া একটি সরাসরি loopback/LAN হোস্ট বা `localhost` — একই প্রার্থীরা ড্যাশবোর্ড মিউটেশন চেক ব্যবহার করে); বা
- এটি HTTP `/v1/*` পৃষ্ঠের মতো একটি বৈধ API কী বহন করে।

অন্য কিছু `403 ws_origin_forbidden` পায়। একটি ড্যাশবোর্ড সেশন কুকি একটি বিদেশী `Origin` ছাড় দেয় না, কারণ ব্রাউজার এটিকে যেকোনো পৃষ্ঠার সকেটে সংযুক্ত করে। অন্য পোর্টের `localhost` একই-উৎস হিসাবে বিবেচিত হয় না; `CORS_ALLOWED_ORIGINS` তে এই ধরনের ডেভ অরিজিন যোগ করুন।

## উদাহরণ: OmniRoute এর সামনে বিপরীত প্রক্সি

CORS OmniRoute নিজেই প্রয়োগ করে, তাই প্রক্সি সাধারণত করা উচিত **না** `Access-Control-*` হেডার যোগ করুন বা পুনরায় লিখুন (ডাবল হেডার ব্রেক ব্রাউজার)। TLS বন্ধ করুন এবং — এগিয়ে দিন OmniRoute উত্তর প্রিফ্লাইট করুন:

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

OmniRoute (`CORS_ALLOWED_ORIGINS` বা নিরাপত্তা ট্যাবে) অনুমোদিত ব্রাউজার উৎপত্তি সেট করুন, প্রক্সিতে নয়।

## উৎস ফাইল

| উদ্বেগ                                     | ফাইল                                                                 |
| ------------------------------------------ | -------------------------------------------------------------------- |
| অনুমোদিত রেজোলিউশন + `getCorsStatus()`     | `src/server/cors/origins.ts`                                         |
| মিডলওয়্যার অ্যাপ্লিকেশন (সত্যের একক উত্স) | `src/server/authz/pipeline.ts`                                       |
| সেটিংস → রানটাইম অরিজিন ইনজেকশন            | `src/lib/config/runtimeSettings.ts`                                  |
| ড্যাশবোর্ডের জন্য রানটাইম অবস্থা           | `src/app/api/settings/authz-inventory/route.ts`                      |
| ড্যাশবোর্ড সতর্কতা ব্যানার                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS অনুমোদিত মূল ক্ষেত্র                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| ক্লাউড-এজেন্ট প্রতি-রুট CORS (ব্যতিক্রম)   | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket হ্যান্ডশেক `Origin` চেক          | `src/server/origin/wsOrigin.ts`                                      |

## এছাড়াও দেখুন

- স্প্যান-সক্ষম রুটের জন্য [রুট গার্ড স্তর](./ROUTE_GUARD_TIERS.md) — লুপব্যাক প্রয়োগ (একটি পৃথক, পরিপূরক নিয়ন্ত্রণ)।
- [অনুমোদন নির্দেশিকা](../architecture/AUTHZ_GUIDE.md) — সম্পূর্ণ প্রমাণীকরণ পাইপলাইন।
