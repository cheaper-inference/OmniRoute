# CORS Configuration & Security (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute គ្រប់គ្រងអ្វីដែល **ប្រភពដើមនៃកម្មវិធីរុករក** អាចអានការឆ្លើយតបឆ្លងប្រភពដើមពីបញ្ជីអនុញ្ញាតកណ្តាលតែមួយ។ ម៉ូដែលគឺ**បរាជ័យ-បិទតាមលំនាំដើម** ៖ គ្មានប្រភពដើមត្រូវបានអនុញ្ញាតទេ រហូតដល់អ្នកជ្រើសរើសចូល។ ទំព័រនេះកត់ត្រាពីរបៀបដែលបញ្ជីអនុញ្ញាតដោះស្រាយ អ្វីដែល `CORS_ALLOW_ALL=true` លាតត្រដាងពិតប្រាកដ (ហើយសំខាន់វាធ្វើអ្វី**ទេ។** ) របៀបកំណត់រចនាសម្ព័ន្ធ dev vs ការផលិតដោយសុវត្ថិភាព ហើយពេលដំណើរការព្រមានផ្ទាំងគ្រប់គ្រងបង្ហាញនៅពេលអក្សរជំនួសកំពុងផ្សាយបន្តផ្ទាល់។

**ប្រភពនៃការពិត៖** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`) ។ បញ្ជីអនុញ្ញាតត្រូវបានអនុវត្តម្តង ក្នុងឧបករណ៍កណ្តាល (`src/server/authz/pipeline.ts`) — អ្នកដោះស្រាយផ្លូវមួយមិនកំណត់ `Access-Control-Allow-Origin` ខ្លួនឯងទេ។

## របៀបដែលប្រភពដើមត្រូវបានដោះស្រាយ

សម្រាប់សំណើនីមួយៗ ឧបករណ៍កណ្តាលគណនាតម្លៃ `Access-Control-Allow-Origin` ក្នុងលំដាប់នេះ៖

1. **`CORS_ALLOW_ALL=true`** (ឬ `CORS_ORIGIN=*` កេរ្តិ៍ដំណែល ) → បន្ទរ `Origin` របស់អ្នកហៅមកវិញ (ឬ `*` នៅពេលមិនមានបឋមកថា `Origin` ) ជាមួយ `Vary: Origin` ដូច្នេះឃ្លាំងសម្ងាត់នៅតែត្រឹមត្រូវ។ ចំណុចទាញ `applyCorsHeaders()` ដូចគ្នាក៏បន្ថែម `Vary: Accept-Encoding` ទៅរាល់ការឆ្លើយតប 2xx-with-body លើផ្ទៃ `/v1*`/`/v1beta*` ដែលបានផ្ទៀងផ្ទាត់សញ្ញាសម្ងាត់ (`relaxForTokenAuth`, RFC 9110 §12.5.5, បញ្ហា #6737) ដូច្នេះ downstream/shared ឃ្លាំងសម្ងាត់អាចបែងចែកបានយ៉ាងត្រឹមត្រូវនូវបំរែបំរួលដែលបានបង្ហាប់ធៀបនឹងវ៉ារ្យ៉ង់ដែលមិនបានបង្ហាប់។
2. បើមិនដូច្នេះទេ សំណើ `Origin` ត្រូវបានធ្វើឱ្យមានលក្ខណៈធម្មតា (អក្សរតូច កាត់តាមក្រោយ) ហើយត្រូវគ្នានឹង **រួមបញ្ចូលគ្នានូវបញ្ជីអនុញ្ញាត** :
   - env **`CORS_ALLOWED_ORIGINS`** បញ្ជីដែលបំបែកដោយសញ្ញាក្បៀស — និង
   - ពេលដំណើរការ **`corsOrigins`** ការកំណត់ (ផ្ទាំងគ្រប់គ្រង → Security → _CORS Allowed Origins_), ចាក់តាម `setRuntimeAllowedOrigins()` ពី `src/lib/config/runtimeSettings.ts`។
3. មិនត្រូវគ្នា → ទេ។**គ្មានបឋមកថា `Access-Control-Allow-Origin` ត្រូវបានបញ្ចេញទេ។** . កម្មវិធីរុករកតាមអ៊ីនធឺណិតរារាំងការអានប្រភពឆ្លង។ នេះគឺជាលំនាំដើមដែលបានបិទដោយបរាជ័យ។

| Env var                | អត្ថន័យ                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV នៃប្រភពដើមពិតប្រាកដដើម្បីអនុញ្ញាត (បានណែនាំ) ។                                          |
| `CORS_ALLOW_ALL`       | `true`/`1` → បន្ទរប្រភពដើមណាមួយ (អក្សរជំនួស)។ Dev តែប៉ុណ្ណោះ។                               |
| `CORS_ORIGIN`          | កេរដំណែល។ `*` មានឥរិយាបទដូច `CORS_ALLOW_ALL`; តម្លៃតែមួយត្រូវបានបន្ថែមទៅក្នុងបញ្ជីអនុញ្ញាត។ |

## គំរូគំរាមកំហែង — អ្វីដែល `CORS_ALLOW_ALL=true` លាតត្រដាង

ការព្រមាន OWASP ទូទៅ ("wildcard CORS = គេហទំព័រណាមួយអាចហៅ API របស់អ្នក") មានតម្លៃគួរយកចិត្តទុកដាក់ ប៉ុន្តែការបង្ហាញរបស់ OmniRoute គឺ**តូចជាងករណីទូទៅ** ដោយសារតែការអនុវត្តន៍ជាក់ស្តែងមួយ៖

> **`applyCorsHeaders()` កណ្តាលមិនដែលបញ្ចេញ `Access-Control-Allow-Credentials` ទេ។** កម្មវិធីរុករកតាមអ៊ីនធឺណិតនឹងមិនបង្ហាញការឆ្លើយតបឆ្លងប្រភព _credentialed_ (cookie-bearing) លុះត្រាតែម៉ាស៊ីនមេផ្ញើ `Access-Control-Allow-Credentials: true`។ OmniRoute's shared CORS path never does.

តើវាមានន័យយ៉ាងណាក្នុងមួយផ្ទៃ សូម្បីតែ `CORS_ALLOW_ALL=true`៖

| ផ្ទៃ                                  | យន្តការផ្ទៀងផ្ទាត់          | ឥទ្ធិពលនៃអក្សរជំនួស CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ផ្ទាំងគ្រប់គ្រង / MANAGEMENT `/api/*` | វគ្គខូគី                    | ប្រភពដើមត្រូវបានបន្ទរប៉ុន្តែ**ដោយគ្មាន `Allow-Credentials`** កម្មវិធីរុករក **ប្លុក** លិខិតបញ្ជាក់បានអាន។ គេហទំព័រឆ្លងប្រភពដើមព្យាបាទ **មិនអាចអានបានទេ។** ការឆ្លើយតបផ្ទាំងគ្រប់គ្រងដែលបានផ្ទៀងផ្ទាត់របស់អ្នក ហើយខូគីសម័យមិនត្រូវបានលាតត្រដាងទេ។                                                                                                                                                                                                                                                                                         |
| អតិថិជន API `/v1/*`, `/v1beta/*`      | បឋមកថា Bearer / `x-api-key` | អនុញ្ញាតរួចហើយ **ដោយការរចនា** (`relaxForTokenAuth`): កម្មវិធីរុករកមិនដែលភ្ជាប់ `Authorization`/`x-api-key` ដោយស្វ័យប្រវត្តិទេ ដូច្នេះទំព័ររបស់អ្នកវាយប្រហារមិនអាចផ្គត់ផ្គង់កូនសោរបស់អ្នកបានទេ។ អេកូដែលបន្ធូរបន្ថយតម្រូវឱ្យមានប្រធានបទដែលមានការផ្ទៀងផ្ទាត់ (សោ API ដែលមានសុពលភាព ឬវគ្គផ្ទាំងគ្រប់គ្រង) មិនត្រឹមតែជាបឋមកថាអត្តសញ្ញាណប៉ុណ្ណោះ និងមិនរួមបញ្ចូល `Access-Control-Allow-Credentials` ទេ។ ការឆ្លើយតបអនាមិក (`REQUIRE_API_KEY=false`) ប្រើបញ្ជីអនុញ្ញាតប្រភពដើមដែលបានកំណត់ រួមទាំងការជ្រើសរើស `CORS_ALLOW_ALL=true` ច្បាស់លាស់។ |
| បានតែអានជាសាធារណៈ (`/api/health`, … ) | គ្មាន                       | មិនរសើប; អក្សរជំនួសគឺគ្មានគ្រោះថ្នាក់ទេ។                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

ដូច្នេះ**សំណល់** ការលាតត្រដាងនៃ `CORS_ALLOW_ALL=true` ត្រូវបានកំណត់ចំពោះ៖ (ក) ប្រភពដើមឆ្លងដែលមិនបញ្ជាក់ពីអត្តសញ្ញាណ **អាន** នៃទិន្នន័យដែលមិនបានផ្ទៀងផ្ទាត់រួចហើយ និង (ខ) អនុញ្ញាតឱ្យ CORS**សំបុត្រហោះហើរជាមុន** នៅលើផ្លូវគ្រប់គ្រង — ដែលនៅតែទាមទារការផ្ទៀងផ្ទាត់ដែលទំព័រឆ្លងប្រភពដើមមិនអាចផ្តល់ឱ្យបាន។ វាគឺ**ទេ។** session-hijack ឬ credential-theft vector នៅលើផ្លូវ CORS ដែលបានចែករំលែក។

### ករណីលើកលែងពិតប្រាកដមួយ — `/api/v1/agents/`

ផ្លូវ Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) កំណត់របស់ពួកគេ។**ផ្ទាល់ខ្លួន** បឋមកថា CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) និង **ធ្វើ** បញ្ចេញ `Access-Control-Allow-Origin: <origin>|*` រួមគ្នាជាមួយ `Access-Control-Allow-Credentials: true`។ នេះគឺជាផ្ទៃតែមួយដែលប្រភពដើម-អេកូ និងព័ត៌មានសម្ងាត់រួមគ្នា ហើយវាគឺជា**ឯករាជ្យនៃ `CORS_ALLOW_ALL`** . ផ្លូវទាំងនេះត្រូវបានគ្រប់គ្រង-ផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ (`requireManagementAuth`); ប្រតិបត្តិករដែលលាតត្រដាងផ្ទាំងគ្រប់គ្រងដោយបិទម៉ាស៊ីនគួរតែដឹងថានេះជាកន្លែងមួយដែលការអានអត្តសញ្ញាណឆ្លងប្រភពដើមត្រូវបានអនុញ្ញាតដោយបឋមកថាឆ្លើយតប។ ការរឹតបន្តឹងវាទៅក្នុងបញ្ជីអនុញ្ញាតច្បាស់លាស់ត្រូវបានតាមដានដាច់ដោយឡែកពីការណែនាំ CORS នេះ។

## បញ្ជីត្រួតពិនិត្យផលិតកម្ម

- **កុំកំណត់ `CORS_ALLOW_ALL=true` នៅក្នុងផលិតកម្ម។** ទុកវាចោល។
- កំណត់មួយ។**ច្បាស់លាស់** បញ្ជីដើម — ទាំង env var ឬវាលផ្ទាំងសុវត្ថិភាព៖

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- ប្រសិនបើ OmniRoute ដំណើរការនៅពីក្រោយប្រូកស៊ី/ផ្លូវរូងក្រោមដី (nginx, Caddy, Cloudflare Tunnel, Tailscale) នោះ CORS គឺ**ទេ។** ការគ្រប់គ្រងតែមួយគត់របស់អ្នក — ឆ្មាំផ្លូវរង្វិលជុំនៅតែការពារផ្លូវដែលមានសមត្ថភាពពងបាន (សូមមើល [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ) ។ កុំបង្កើត `X-Forwarded-For: 127.0.0.1` ដើម្បី "ជួសជុល" a 403; ដែលបើកថ្នាក់ RCE ឡើងវិញ ឆ្មាំផ្លូវបិទ។
- បញ្ជាក់ស្ថានភាពពេលរត់៖ ផ្ទាំងគ្រប់គ្រងបង្ហាញ a **បដាពណ៌អំពិលជាប់រហូត** នៅក្រោមផ្ទាំងគ្រប់គ្រង → Security → Authorization Inventory នៅពេលណាដែល `CORS_ALLOW_ALL=true` ផ្សាយផ្ទាល់ ហើយ `/api/settings/authz-inventory` ត្រឡប់ឧបករណ៍ត្រួតពិនិត្យស្រោមសំបុត្រ `cors: { allowAll, allowedOrigins }` អាចធ្វើការស្ទង់មតិបាន។

## ភាពងាយស្រួលនៃការអភិវឌ្ឍន៍ — អនុញ្ញាតឱ្យមានប្រភពដើមក្នុងស្រុកជាក់លាក់

អ្នកកម្រត្រូវការអក្សរជំនួស សូម្បីតែនៅក្នុង dev. អនុញ្ញាតតែម៉ាស៊ីនមេ dev ដែលអ្នកប្រើ៖

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ប្រភពដើមត្រូវបានផ្គូផ្គង case-insensitive ជាមួយនឹងសញ្ញាបន្តបន្ទាប់ដែលមិនអើពើ ដូច្នេះ `http://localhost:3000` និង `http://localhost:3000/` គឺសមមូល។ CSV ដូចគ្នាអាចត្រូវបានកំណត់នៅពេលដំណើរការនៅក្នុង **ផ្ទាំងគ្រប់គ្រង → Security → CORS ប្រភពដើមអនុញ្ញាត** ដោយគ្មានការចាប់ផ្តើមឡើងវិញ។

## គ្រាប់ចុច API ទល់នឹងវគ្គខូគី

- **Bearer / `x-api-key` (ផ្ទៃការសន្និដ្ឋាន `/v1/*` ):** កម្មវិធីរុករកមិនដែលភ្ជាប់វាដោយស្វ័យប្រវត្តិទេ។ CORS មិនមែនជាឧបសគ្គដ៏មានន័យនៅទីនេះ — គន្លឹះ API គឺជារបាំង — ដែលជាមូលហេតុដែលផ្ទៃនោះអនុញ្ញាតដោយចេតនា ដូច្នេះកម្មវិធីរុករក និងអតិថិជន Electron អាចអានការឆ្លើយតបដែលពួកគេមានសិទ្ធិរួចហើយ។ អេកូដែលបន្ធូរបន្ថយតម្រូវឱ្យមានប្រធានបទដែលបានផ្ទៀងផ្ទាត់ (សោ API ដែលមានសុពលភាព ឬវគ្គផ្ទាំងគ្រប់គ្រង) មិនមែនគ្រាន់តែជាបឋមកថាអត្តសញ្ញាណទេ និងមិនរួមបញ្ចូល `Access-Control-Allow-Credentials` ទេ។ ការឆ្លើយតបអនាមិក (`REQUIRE_API_KEY=false`) ប្រើបញ្ជីអនុញ្ញាតប្រភពដើមដែលបានកំណត់ រួមទាំងការជ្រើសរើស `CORS_ALLOW_ALL=true` ច្បាស់លាស់។ ការបដិសេធការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ (401) នៅតែអាចអានបាន ដូច្នេះអតិថិជនអាចបង្ហាញសោដែលបានដកហូត ឬវាយខុស (#5242): 401 `/v1/session-leases` របស់បំពង់បង្ហូរប្រេងរក្សាអេកូ ហើយផ្លូវដែលបដិសេធសោដោយខ្លួនឯងបន្ទាប់ពីបំពង់បង្ហូរប្រេងបានបម្រើវាជាអនាមិក (`/v1/models` និង `/v1beta/models` ជាមួយនឹងការគ្រប់គ្រងការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវដែលបានកំណត់រចនាសម្ព័ន្ធម្ចាស់ , `/v1/files`, `/v1/batches`, `/v1/media` ផ្លូវបេក្ខជនបន្សំស្វ័យប្រវត្តិ) បន្ថែមអេកូទៅ 401 តាមរយៈ `credentialRejectionHeaders()`។ បន្ទរត្រូវបានចុចលើសំណើដែលមានបឋមកថាព័ត៌មានសម្ងាត់ (`Authorization`, `x-api-key`, `x-goog-api-key` ឬ `auth_token` cookie ) មិនមែនលើផ្លូវណាមួយដែលត្រូវបានពិនិត្យ ហើយមិនដែលផ្គូផ្គងជាមួយ `Access-Control-Allow-Credentials`; រាងកាយគឺជាស្រោមសំបុត្រដែលមានកំហុសថេរ។ ផ្លូវគ្រប់គ្រងក្រោម `/api/v1/` ការពារដោយ `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) មិនប្រើករណីលើកលែងការបដិសេធព័ត៌មានអត្តសញ្ញាណនេះទេ៖ ជាមួយ `REQUIRE_API_KEY=false` ការឆ្លើយតប 401/403 របស់ពួកគេធ្វើតាមគោលការណ៍ដើម CORS ដែលបានកំណត់រចនាសម្ព័ន្ធ។
- **សម័យខូឃី (ផ្ទាំងគ្រប់គ្រង):** ការពារដោយបរាជ័យបិទលំនាំដើម **និង** ដោយអវត្តមាននៃ `Access-Control-Allow-Credentials` នៅលើផ្លូវរួមគ្នា។ រក្សាប្រភពដើម management/dashboard ចេញពីការកំណត់អនុញ្ញាតណាមួយ; ពួកគេត្រូវតែបិទយ៉ាងពិតប្រាកដ។

## ការចាប់ដៃWebSocket (`/v1/responses`, `/v1/ws`)

កម្មវិធីរុករកតាមអ៊ីនធឺណិតមិនអនុវត្ត CORS ទៅ WebSocket ទេ ដូច្នេះ WebSocket ដឹកជញ្ជូនដែលត្រឡប់លទ្ធផលសន្និដ្ឋានពិនិត្យមើលការចាប់ដៃ `Origin` ខ្លួនឯង (`src/server/origin/wsOrigin.ts`): ការឆ្លើយតប WebSocket (`/v1/responses`) ហើយនៅពេលដែល OmniRoute ដំណើរការតាមរយៈ `npm start` / `npm run dev` ស្ពាន `/v1/ws` និង `/api/v1/ws` ដែលចាក់ផ្សាយ `/v1/chat/completions`, `/v1/messages` និង `/v1/responses` ។ ស្ពានសួរ `/api/v1/ws?handshake=1` សម្រាប់សាលក្រម ហើយបដិសេធមិនដំឡើងកំណែ លុះត្រាតែផ្លូវនោះដំណើរការការត្រួតពិនិត្យ។ តម្រូវការផ្ទៀងផ្ទាត់នៅតែអនុវត្តដោយឡែកពីគ្នា។ ការត្រួតពិនិត្យប្រភពដើមឆ្លងកាត់នៅពេលដែល៖

- វាមិនមានបឋមកថា `Origin` (Codex CLI, SDKs និងអតិថិជនដែលមិនមែនជាកម្មវិធីរុករកផ្សេងទៀត);
- `Origin` ត្រូវបានទទួលយកដោយបញ្ជីអនុញ្ញាតខាងលើ (`CORS_ALLOWED_ORIGINS`, ការកំណត់ `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` គឺជាប្រភពដើមសាធារណៈផ្ទាល់ខ្លួនរបស់ OmniRoute(មូលដ្ឋានសាធារណៈដែលបានកំណត់រចនាសម្ព័ន្ធ URL ប្រភពដើមបញ្ជូនបន្តរបស់ប្រូកស៊ីដែលជឿទុកចិត្ត ឬម៉ាស៊ីន loopback/LAN ផ្ទាល់ដែលបានផ្តល់ឱ្យជាអក្សរ IP ឬ `localhost` — ដែលបេក្ខជនដូចគ្នាដែលការត្រួតពិនិត្យការផ្លាស់ប្តូរផ្ទាំងគ្រប់គ្រងប្រើ); ឬ
- វាផ្ទុកគ្រាប់ចុច API ត្រឹមត្រូវ ដូចនៅលើផ្ទៃ HTTP `/v1/*` ។

អ្វីផ្សេងទៀតទទួលបាន `403 ws_origin_forbidden`។ ខូគីសម័យផ្ទាំងគ្រប់គ្រងមិនលើកលែង `Origin` បរទេសទេ ពីព្រោះកម្មវិធីរុករកភ្ជាប់វាទៅរន្ធរបស់ទំព័រណាមួយ។ `localhost` នៅលើច្រកផ្សេងទៀតមិនត្រូវបានចាត់ទុកជាប្រភពដើមដូចគ្នាទេ។ បន្ថែមប្រភពដើម dev បែបនេះទៅ `CORS_ALLOWED_ORIGINS`។

## ឧទាហរណ៍៖ ប្រូកស៊ីបញ្ច្រាសនៅពីមុខ OmniRoute

CORS ត្រូវបានអនុវត្តដោយ OmniRoute ខ្លួនវា ដូច្នេះប្រូកស៊ីជាទូទៅគួរតែ**ទេ។** បន្ថែម ឬសរសេរបឋមកថា `Access-Control-*` ឡើងវិញ (បឋមកថាពីរដងបំបែកកម្មវិធីរុករក) ។ បញ្ចប់ TLS និងបញ្ជូនបន្ត — អនុញ្ញាតឱ្យ OmniRoute ឆ្លើយតបជាមុន:

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

កំណត់ប្រភពដើមកម្មវិធីរុករកដែលបានអនុញ្ញាតនៅក្នុង OmniRoute (`CORS_ALLOWED_ORIGINS` ឬផ្ទាំងសុវត្ថិភាព) មិនមែននៅក្នុងប្រូកស៊ីទេ។

## ឯកសារប្រភព

| កង្វល់                                      | ឯកសារ                                                                |
| ------------------------------------------- | -------------------------------------------------------------------- |
| ដំណោះស្រាយបញ្ជីអនុញ្ញាត + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| កម្មវិធី Middleware (ប្រភពតែមួយនៃការពិត)    | `src/server/authz/pipeline.ts`                                       |
| ការកំណត់ → ការចាក់ប្រភពដើមនៃពេលវេលាដំណើរការ | `src/lib/config/runtimeSettings.ts`                                  |
| ស្ថានភាពពេលដំណើរការសម្រាប់ផ្ទាំងគ្រប់គ្រង   | `src/app/api/settings/authz-inventory/route.ts`                      |
| ផ្ទាំងបដាព្រមានផ្ទាំងគ្រប់គ្រង              | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| វាលប្រភពដែលបានអនុញ្ញាត CORS                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent ក្នុងមួយផ្លូវ CORS (ករណីលើកលែង) | `src/lib/cloudAgent/api.ts`                                          |
| ការចាប់ដៃWebSocket ពិនិត្យ `Origin`         | `src/server/origin/wsOrigin.ts`                                      |

## សូមមើលផងដែរ។

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback enforcement for spawn-capable routes (ការគ្រប់គ្រងដោយឡែក និងបំពេញបន្ថែម)។
- [មគ្គុទ្ទេសក៍ការអនុញ្ញាត](../architecture/AUTHZ_GUIDE.md) — នូវបំពង់ផ្តល់សិទ្ធិពេញលេញ។
