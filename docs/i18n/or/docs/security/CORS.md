# CORS Configuration & Security (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ନିୟନ୍ତ୍ରଣ କରେ**ବ୍ରାଉଜର୍ ଉତ୍ପତ୍ତି।** ଏକକ, କେନ୍ଦ୍ରୀଭୂତ ଅନୁମତି ତାଲିକାରୁ କ୍ରସ୍-ଉତ୍ପତ୍ତି ପ୍ରତିକ୍ରିୟା ପ read ିପାରେ। ମଡେଲ୍ ହେଉଛି।**ଡିଫଲ୍ଟ ଭାବରେ ବିଫଳ-ବନ୍ଦ।** : ଯେପର୍ଯ୍ୟନ୍ତ ଆପଣ ଏହାକୁ ଚୟନ ନକରନ୍ତି ସେ ପର୍ଯ୍ୟନ୍ତ କ origin ଣସି ଉତ୍ପତ୍ତି ଅନୁମୋଦିତ ନୁହେଁ। ଏହି ପୃଷ୍ଠାଟି ଅନୁମତି ତାଲିକା କିପରି ସମାଧାନ ହୁଏ, `CORS_ALLOW_ALL=true` ପ୍ରକୃତରେ କ’ଣ ପ୍ରକାଶ କରେ (ଏବଂ, ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ କଥା, ଏହା କ’ଣ କରେ ତାହା ଡକ୍ୟୁମେଣ୍ଟ୍ କରେ।**ନୁହେଁ** ), କିପରି ସୁରକ୍ଷିତ ଭାବରେ dev ବନାମ ଉତ୍ପାଦନକୁ ବିନ୍ୟାସ କରିବେ, ଏବଂ ୱାଇଲ୍ଡକାର୍ଡ ଲାଇଭ୍ ଥିବାବେଳେ ଡ୍ୟାସବୋର୍ଡକୁ ଚେତାବନୀ ଦେଇଥାଏ।

**ସତ୍ୟର ଉତ୍ସ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`)। ଅନୁମତି ତାଲିକା ଥରେ ପ୍ରୟୋଗ କରାଯାଏ, ମିଡୱେୟାରରେ (`src/server/authz/pipeline.ts`) — ପ୍ରତି ରୁଟ ହ୍ୟାଣ୍ଡେଲର୍ମାନେ ନିଜେ `Access-Control-Allow-Origin` ସେଟ୍ କରନ୍ତି ନାହିଁ।

## ଏକ ଉତ୍ପତ୍ତି କିପରି ସମାଧାନ ହୁଏ।

ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ପାଇଁ ମଧ୍ୟମ ସଫ୍ଟୱେର୍ ଏହି କ୍ରମରେ `Access-Control-Allow-Origin` ମୂଲ୍ୟ ଗଣନା କରେ:

1. **`CORS_ALLOW_ALL=true`** (କିମ୍ବା ଉତ୍ତରାଧିକାରୀ `CORS_ORIGIN=*`) → କଲ୍ କରୁଥିବା ବ୍ୟକ୍ତିଙ୍କ `Origin` ପଛକୁ (କିମ୍ବା `Origin` ହେଡର୍ ନଥିବାବେଳେ `*` ) ଇକୋ କରେ, `Vary: Origin` ସହିତ କ୍ୟାଚ୍ ସଠିକ୍ ରହିଥାଏ। ସମାନ `applyCorsHeaders()` ଚକପଏଣ୍ଟ ମଧ୍ୟ ଟୋକେନ୍-ପ୍ରାମାଣିକୃତ `/v1*`/`/v1beta*` ପୃଷ୍ଠରେ (`relaxForTokenAuth`, RFC 9110 §12.5.5, #6737 ଇସ୍ୟୁ) ପ୍ରତ୍ୟେକ 2xx- ସହିତ-ଶରୀରର ପ୍ରତିକ୍ରିୟାରେ `Vary: Accept-Encoding` ଯୋଡିଥାଏ, ତେଣୁ downstream/shared କ୍ୟାଚ୍ଗୁଡ଼ିକ ସଙ୍କୋଚିତ ବନାମ ସଙ୍କୋଚିତ ପ୍ରକାରଗୁଡ଼ିକୁ ସଠିକ୍ ଭାବରେ ପୃଥକ କରିପାରିବ।
2. ଅନ୍ୟଥା, ଅନୁରୋଧ `Origin` ସ୍ ized ାଭାବିକ ହୋଇଛି (ଲୋ-କେସ୍, ଟ୍ରେଲିଂ ସ୍ଲାସ୍ ଛଡ଼ାଯାଇଛି) ଏବଂ ଏହା ସହିତ ମେଳ ହୋଇଛି।**ମିଶ୍ରିତ ଅନୁମତି ତାଲିକା।** :
   - env **`CORS_ALLOWED_ORIGINS`** — କମା ଦ୍ୱାରା ପୃଥକ ତାଲିକା, ଏବଂ
   - ଚାଲିବା ସମୟ **`corsOrigins`** ସେଟିଂ (ଡ୍ୟାସବୋର୍ଡ → ସୁରକ୍ଷା → _CORS ଅନୁମୋଦିତ ଉତ୍ପତ୍ତି_), `src/lib/config/runtimeSettings.ts` ରୁ `setRuntimeAllowedOrigins()` ମାଧ୍ୟମରେ ଇଞ୍ଜେକ୍ସନ।
3. → କ match ଣସି ମେଳ ନାହିଁ।**କ Z ଣସି `Access-Control-Allow-Origin` ହେଡର୍ ନିର୍ଗତ ହୁଏ ନାହିଁ।** । ବ୍ରାଉଜର୍ ପ read ଼ୁଥିବା କ୍ରସ୍-ଉତ୍ପତ୍ତି ଅବରୋଧ କରେ। ଏହା ହେଉଛି ଉଦ୍ଦିଷ୍ଟ ବିଫଳ-ବନ୍ଦ ଡିଫଲ୍ଟ।

| Env var                | ଅର୍ଥ                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ଅନୁମତି ଦେବା ପାଇଁ ପ୍ରକୃତ ମୂଳର CSV (ସୁପାରିଶ)।                                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → ଯେକ origin ଣସି ଉତ୍ପତ୍ତି (ୱାଇଲ୍ଡକାର୍ଡ) ପ୍ରତିଧ୍ୱନୀ କରେ। କେବଳ ଦେବ।             |
| `CORS_ORIGIN`          | ଉତ୍ତରାଧିକାରୀ। `*` `CORS_ALLOW_ALL` ପରି ଆଚରଣ କରେ; ଅନୁମତି ତାଲିକାରେ ଗୋଟିଏ ମୂଲ୍ୟ ଯୋଡା ଯାଇଛି। |

## ଧମକ ମଡେଲ — ଯାହା `CORS_ALLOW_ALL=true` ପ୍ରକୃତରେ ପ୍ରକାଶ କରେ।

ଜେନେରିକ୍ OWASP ଚେତାବନୀ ("ୱାଇଲ୍ଡକାର୍ଡ CORS = ଯେକ site ଣସି ସାଇଟ୍ ଆପଣଙ୍କ API କଲ୍ କରିପାରିବ") ଗମ୍ଭୀରତାର ସହିତ ଗ୍ରହଣ କରିବା ମୂଲ୍ୟବାନ, କିନ୍ତୁ OmniRoute ର ଏକ୍ସପୋଜର୍ ହେଉଛି।**ଜେନେରିକ୍ କେସ୍ ଅପେକ୍ଷା ସଂକୀର୍ଣ୍ଣ।** , ଗୋଟିଏ ଠୋସ୍ କାର୍ଯ୍ୟକାରିତା କାରଣରୁ:

> **କେନ୍ଦ୍ରୀୟ `applyCorsHeaders()` କଦାପି `Access-Control-Allow-Credentials` ନିର୍ଗତ କରେ ନାହିଁ।** ଯଦି ସର୍ଭର `Access-Control-Allow-Credentials: true` ପଠାଏ ନାହିଁ, ଏକ ବ୍ରାଉଜର୍ ଏକ _ କ୍ରେଡେଣ୍ଟିଆଲ୍_ (କୁକି-ବିରିଂ) କ୍ରସ୍-ଉତ୍ପତ୍ତି ପ୍ରତିକ୍ରିୟା ପ୍ରକାଶ କରିବ ନାହିଁ। OmniRoute ର ଅଂଶୀଦାର CORS ପଥ କଦାପି କରେ ନାହିଁ।

`CORS_ALLOW_ALL=true` ସହିତ ମଧ୍ୟ ଭୂପୃଷ୍ଠରେ ଏହାର ଅର୍ଥ କ’ଣ:

| ପୃଷ୍ଠଭୂମି                          | Auth କ mechanism ଶଳ।      | ୱାଇଲ୍ଡକାର୍ଡ CORS ର ପ୍ରଭାବ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ଡ୍ୟାସବୋର୍ଡ / MANAGEMENT `/api/*`   | କୁକି ଅଧିବେଶନ।             | ଉତ୍ପତ୍ତି ପ୍ରତିଫଳିତ ହୋଇଛି, କିନ୍ତୁ**`Allow-Credentials` ବିନା।** ବ୍ରାଉଜର୍**ବ୍ଲକଗୁଡିକ** ପରିଚୟପତ୍ର ପ read ଼ନ୍ତୁ। ଏକ ଦୁର୍ଦ୍ଦାନ୍ତ କ୍ରସ୍-ଉତ୍ପତ୍ତି ସାଇଟ୍।**ପ read ି ପାରିବ ନାହିଁ** ଆପଣଙ୍କର ପ୍ରାମାଣିକ ଡ୍ୟାସବୋର୍ଡ ପ୍ରତିକ୍ରିୟା, ଏବଂ ଅଧିବେଶନ କୁକି ଉନ୍ମୋଚିତ ହୁଏ ନାହିଁ।                                                                                                                                                                                                                                                                                          |
| କ୍ଲାଏଣ୍ଟ API `/v1/*`, `/v1beta/*`  | ଧାରକ / `x-api-key` ହେଡର୍। | ପୂର୍ବରୁ ଅନୁମତିପ୍ରାପ୍ତ।**ଡିଜାଇନ୍ ଦ୍ୱାରା।** (`relaxForTokenAuth`): ବ୍ରାଉଜର୍ମାନେ `Authorization`/`x-api-key` କୁ କେବେବି ଅଟୋ-ସଂଲଗ୍ନ କରନ୍ତି ନାହିଁ, ତେଣୁ ଆକ୍ରମଣକାରୀଙ୍କ ପୃଷ୍ଠା ଆପଣଙ୍କ ଚାବି ଯୋଗାଇ ପାରିବ ନାହିଁ। ଆରାମଦାୟକ ଇକୋ ଏକ ପ୍ରାମାଣିକ ବିଷୟ (ଏକ ବ valid ଧ API କି କିମ୍ବା ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ) ଆବଶ୍ୟକ କରେ, କେବଳ ଏକ ପରିଚୟ ହେଡର୍ ନୁହେଁ, ଏବଂ `Access-Control-Allow-Credentials` କେବେବି ଅନ୍ତର୍ଭୂକ୍ତ କରେ ନାହିଁ। ଅଜ୍ଞାତ ପ୍ରତିକ୍ରିୟା (`REQUIRE_API_KEY=false`) ବିନ୍ୟାସିତ ମୂଳ ଅନୁମତି ତାଲିକା ବ୍ୟବହାର କରେ, ଏକ ସ୍ପଷ୍ଟ `CORS_ALLOW_ALL=true` ଅପ୍ଟ-ଇନ୍ ଅନ୍ତର୍ଭୁକ୍ତ କରି। |
| ସର୍ବସାଧାରଣ ପଠନୀୟ (`/api/health`,…) | କିଛି ନୁହେଁ।               | ସମ୍ବେଦନଶୀଳ ନୁହେଁ; ୱାଇଲ୍ଡକାର୍ଡ କ୍ଷତିକାରକ ନୁହେଁ।                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

ତେଣୁ**ଅବଶିଷ୍ଟ** `CORS_ALLOW_ALL=true` ର ଏକ୍ସପୋଜର ସୀମିତ: (କ) ଅଣ-ପରିଚୟ ପ୍ରାପ୍ତ କ୍ରସ୍-ଉତ୍ପତ୍ତି।**ପ read େ।** ପୂର୍ବରୁ ଅଣ-ପ୍ରାମାଣିକ ତଥ୍ୟ, ଏବଂ (ଖ) CORS ଅନୁମତି ଦେବା।**ପ୍ରିଫ୍ଲାଇଟ୍ ପାସ୍।** ପରିଚାଳନା ମାର୍ଗରେ — ଯାହାକି ଏପର୍ଯ୍ୟନ୍ତ auth ଆବଶ୍ୟକ କରେ ଯାହା ଏକ କ୍ରସ୍-ମୂଳ ପୃଷ୍ଠା ପ୍ରଦାନ କରିପାରିବ ନାହିଁ। ଏହା ହେଉଛି।**ନୁହେଁ** ଅଂଶୀଦାର CORS ପଥରେ ଏକ ଅଧିବେଶନ-ଅପହରଣ କିମ୍ବା ପରିଚୟ-ଚୋରି ଭେକ୍ଟର।

### ଗୋଟିଏ ପ୍ରକୃତ ବ୍ୟତିକ୍ରମ — `/api/v1/agents/`

କ୍ଲାଉଡ୍-ଏଜେଣ୍ଟ୍ ରୁଟ୍ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ସେଗୁଡିକ ସେଟ୍ କଲା।**ନିଜର** CORS ଶୀର୍ଷକ (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ଏବଂ**କର** `Access-Control-Allow-Credentials: true` ସହିତ ଏକତ୍ର `Access-Control-Allow-Origin: <origin>|*` ନିର୍ଗତ କରନ୍ତୁ। ଏହା ହେଉଛି ଏକକ ପୃଷ୍ଠଭୂମି ଯେଉଁଠାରେ ଉତ୍ପତ୍ତି-ଇକୋ ଏବଂ ପରିଚୟପତ୍ର ଏକତ୍ର ରହେ, ଏବଂ ଏହା ହେଉଛି।**`CORS_ALLOW_ALL` ଠାରୁ ନିରପେକ୍ଷ।** । ଏହି ମାର୍ଗଗୁଡ଼ିକ ପରିଚାଳନା-ପ୍ରାମାଣିକିକରଣ (`requireManagementAuth`); ଅପରେଟର୍ ଯେଉଁମାନେ ଡ୍ୟାସବୋର୍ଡ ଅଫ୍-ହୋଷ୍ଟକୁ ଉନ୍ମୋଚନ କରନ୍ତି ସେମାନେ ସଚେତନ ହେବା ଉଚିତ ଯେ ଏହା ହେଉଛି ଏକ ସ୍ଥାନ ଯେଉଁଠାରେ କ୍ରସ୍-ଉତ୍ପତ୍ତି ପ୍ରମାଣପତ୍ର ପ read ଼ିବା ପ୍ରତିକ୍ରିୟା ହେଡର୍ ଦ୍ୱାରା ଅନୁମତିପ୍ରାପ୍ତ। ଏହାକୁ ଏକ ସ୍ପଷ୍ଟ ଅନୁମତି ତାଲିକାରେ ଟାଣିବା ଏହି CORS ଗାଇଡ୍ ଠାରୁ ପୃଥକ ଭାବରେ ଟ୍ରାକ୍ କରାଯାଏ।

## ଉତ୍ପାଦନ ଯାଞ୍ଚ ତାଲିକା।

- **ଉତ୍ପାଦନରେ କେବେବି `CORS_ALLOW_ALL=true` ସେଟ୍ କରନ୍ତୁ ନାହିଁ।** ଏହାକୁ ସେଟ୍ କରନ୍ତୁ।
- ଏକ ସେଟ୍ କରନ୍ତୁ।**ସ୍ପଷ୍ଟ** ମୂଳ ତାଲିକା — env var କିମ୍ବା ସୁରକ୍ଷା-ଟ୍ୟାବ କ୍ଷେତ୍ର:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- ଯଦି OmniRoute ଏକ ଓଲଟା ପ୍ରକ୍ସି / ଟନେଲ୍ (nginx, କ୍ୟାଡି, Cloudflare ଟନେଲ୍, Tailscale) ପଛରେ ଚାଲିଥାଏ, CORS ହେଉଛି।**ନୁହେଁ** ତୁମର ଏକମାତ୍ର ନିୟନ୍ତ୍ରଣ — ଲୁପବ୍ୟାକ୍ ରୁଟ୍ ଗାର୍ଡ ଏପର୍ଯ୍ୟନ୍ତ ସ୍ପାଉନ୍-ସକ୍ଷମ ମାର୍ଗଗୁଡ଼ିକୁ ସୁରକ୍ଷା ଦେଇଥାଏ ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ଦେଖନ୍ତୁ)। ଏକ 403 କୁ "ଠିକ୍" କରିବାକୁ `X-Forwarded-For: 127.0.0.1` ଭୁଲ କରନ୍ତୁ ନାହିଁ; ଯାହା RCE ଶ୍ରେଣୀକୁ ପୁନ opens ଖୋଲିବ ମାର୍ଗ ଗାର୍ଡ ବନ୍ଦ।
- ଚାଲିବା ସମୟ ସ୍ଥିତିକୁ ନିଶ୍ଚିତ କରନ୍ତୁ: ଡ୍ୟାସବୋର୍ଡ ଦେଖାଏ a **ସ୍ଥାୟୀ ଆମ୍ବର ବ୍ୟାନର।** ଡ୍ୟାସବୋର୍ଡ → ସୁରକ୍ଷା → ପ୍ରାଧିକରଣ ଇନଭେଣ୍ଟୋରୀ ଅଧୀନରେ ଯେତେବେଳେ ବି `CORS_ALLOW_ALL=true` ଜୀବନ୍ତ ଥାଏ, ଏବଂ `/api/settings/authz-inventory` ଏକ `cors: { allowAll, allowedOrigins }` ଏନଭଲପ୍ ମନିଟରିଂ ଉପକରଣଗୁଡିକ ପୋଲ୍ କରିପାରିବ।

## ବିକାଶ ସୁବିଧା — ନିର୍ଦ୍ଦିଷ୍ଟ ସ୍ଥାନୀୟ ଉତ୍ପତ୍ତି ପାଇଁ ଅନୁମତି ଦିଏ।

ଆପଣ କ୍ୱଚିତ୍ dev ରେ ୱାଇଲ୍ଡକାର୍ଡ ଆବଶ୍ୟକ କରନ୍ତି। ଆପଣ ବ୍ୟବହାର କରୁଥିବା dev ସର୍ଭରଗୁଡ଼ିକୁ ଅନୁମତି ଦିଅନ୍ତୁ:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ଉତ୍ପତ୍ତିଗୁଡିକ ସ୍ଲାସ୍ ଅଣଦେଖା ସହିତ କେସ୍-ସମ୍ବେଦନଶୀଳ ଭାବରେ ମେଳ ହୁଏ, ତେଣୁ `http://localhost:3000` ଏବଂ `http://localhost:3000/` ସମାନ। ସମାନ CSV ଚାଲିବା ସମୟରେ ସେଟ୍ ହୋଇପାରିବ।**ଡ୍ୟାସବୋର୍ଡ → ସୁରକ୍ଷା → CORS ଅନୁମୋଦିତ ଉତ୍ପତ୍ତି।** ପୁନ rest ଆରମ୍ଭ ବିନା।

## API କି ବନାମ କୁକି ଅଧିବେଶନ।

- **ଧାରକ / `x-api-key` ( `/v1/*` ଭିତ୍ତିଭୂମି):** ବ୍ରାଉଜର୍ ଗୁଡିକ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ଏଗୁଡିକ ସଂଲଗ୍ନ କରନ୍ତି ନାହିଁ। CORS ଏଠାରେ ଏକ ଅର୍ଥପୂର୍ଣ୍ଣ ପ୍ରତିବନ୍ଧକ ନୁହେଁ। — the API ଚାବି ହେଉଛି ପ୍ରତିବନ୍ଧକ। — ଯେଉଁଥିପାଇଁ ସେହି ପୃଷ୍ଠଟି ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବରେ ଅନୁମତିପ୍ରାପ୍ତ ତେଣୁ ବ୍ରାଉଜର୍ ଏବଂ। Electron ଗ୍ରାହକମାନେ ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକୁ ପ read ିପାରିବେ ଯାହା ସେମାନେ ପୂର୍ବରୁ ପାଇବାକୁ ଯୋଗ୍ୟ ଅଟନ୍ତି। ଆରାମଦାୟକ ଇକୋ ଏକ ପ୍ରାମାଣିକ ବିଷୟ ଆବଶ୍ୟକ କରେ (ଏକ ବ valid ଧତା। API କି କିମ୍ବା ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ), କେବଳ ଏକ ପରିଚୟ ହେଡର୍ ନୁହେଁ, ଏବଂ କେବେବି ଅନ୍ତର୍ଭୂକ୍ତ କରେ ନାହିଁ। `Access-Control-Allow-Credentials`। ଅଜ୍ onymous ାତ ପ୍ରତିକ୍ରିୟା (`REQUIRE_API_KEY=false`) ଏକ ସ୍ପଷ୍ଟ ଅନ୍ତର୍ଭୂକ୍ତ କରି ବିନ୍ୟାସିତ ମୂଳ ଅନୁମତି ତାଲିକା ବ୍ୟବହାର କରନ୍ତୁ। `CORS_ALLOW_ALL=true` ଅପ୍ଟ-ଇନ୍ Auth ପ୍ରତ୍ୟାଖ୍ୟାନ (401) ପଠନଯୋଗ୍ୟ ରୁହନ୍ତୁ ତେଣୁ ଗ୍ରାହକମାନେ ଏକ ପ୍ରତ୍ୟାହାର କିମ୍ବା ଭୁଲ୍ ଟାଇପ୍ ହୋଇଥିବା ଚାବି ()#5242): ପାଇପଲାଇନର ନିଜସ୍ୱ 401 ଇକୋ ରଖେ, ଏବଂ ଏକ ମାର୍ଗ ଯାହା ପାଇପଲାଇନ ଏହାକୁ ଅଜ୍ଞାତ ଭାବରେ ସେବା କରିବା ପରେ ଚାବିକୁ ନିଜେ ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ (`/v1/models` ଏବଂ `/v1beta/models` ମ୍ୟାନେଜମେଣ୍ଟ auth ସହିତ ବିନ୍ୟାସିତ, ମାଲିକ-ସ୍କୋପିଡ୍। `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` ଏବଂ ଅଟୋ-କମ୍ବୋ ପ୍ରାର୍ଥୀ ମାର୍ଗ) ସେହି 401 ମାଧ୍ୟମରେ ଇକୋ ଯୋଗ କରେ। `credentialRejectionHeaders()`। ଏକ ପ୍ରମାଣପତ୍ର ହେଡର୍ ବହନ କରୁଥିବା ଅନୁରୋଧ ଉପରେ ଇକୋ କୀ ହୋଇଛି।`Authorization`, `x-api-key`, `x-goog-api-key` କିମ୍ବା `auth_token` କୁକି), ସେମାନଙ୍କ ମଧ୍ୟରୁ କେଉଁଟି ମାର୍ଗ ଯାଞ୍ଚ କରାଯାଇ ନାହିଁ, ଏବଂ କେବେବି ଯୋଡି ହୋଇନଥାଏ। `Access-Control-Allow-Credentials`; ଶରୀର ହେଉଛି ଏକ ସ୍ଥିର ତ୍ରୁଟି ଏନଭଲପ୍। ଅଧୀନରେ ପରିଚାଳନା ମାର୍ଗ `/api/v1/` ଦ୍ ed ାରା ଜଗି ରହିଛନ୍ତି। `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ଏହି ପରିଚୟ-ପ୍ରତ୍ୟାଖ୍ୟାନ ବ୍ୟତିକ୍ରମକୁ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ: ସହିତ। `REQUIRE_API_KEY=false`, ସେମାନଙ୍କର 401/403 ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକ ବିନ୍ୟାସିତ ଅନୁସରଣ କରେ। CORS ମୂଳ ନୀତି
- **କୁକି ଅଧିବେଶନ (ଡ୍ୟାସବୋର୍ଡ):** ବିଫଳ-ବନ୍ଦ ଡିଫଲ୍ଟ ଦ୍ୱାରା ସୁରକ୍ଷିତ।**ଏବଂ** ଅଂଶୀଦାର ପଥରେ `Access-Control-Allow-Credentials` ର ଅନୁପସ୍ଥିତି ଦ୍ୱାରା। ଯେକ any ଣସି ଅନୁମତିପ୍ରାପ୍ତ ବିନ୍ୟାସରୁ management/dashboard ଉତ୍ପତ୍ତି ରଖନ୍ତୁ; ସେମାନେ ନିଶ୍ଚିତ ଭାବରେ ବିଫଳ-ବନ୍ଦ ରହିବେ।

## WebSocket ହ୍ୟାଣ୍ଡସେକ (`/v1/responses`, `/v1/ws`)

ବ୍ରାଉଜର୍ ଗୁଡିକ CORS WebSocket ରେ ପ୍ରୟୋଗ କରନ୍ତି ନାହିଁ, ତେଣୁ WebSocket ପରିବହନ ଯାହା ଇନଫେରେନ୍ସ ଆଉଟପୁଟ୍ ଫେରସ୍ତ କରେ ହ୍ୟାଣ୍ଡସ୍ୟାକ୍ `Origin` ନିଜେ ଯାଞ୍ଚ କରେ (`src/server/origin/wsOrigin.ts`): ରେସପନ୍ସ WebSocket (`/v1/responses`) ଏବଂ ଯେତେବେଳେ OmniRoute `npm start` / `npm run dev`, `/v1/ws` ଏବଂ `/api/v1/ws` ବ୍ରିଜ୍, ଯାହା `/v1/chat/completions`, `/v1/messages` ଏବଂ `/v1/responses` ଫ୍ରେମ୍ ଭାବରେ ପ୍ରବାହିତ ହୁଏ। ବ୍ରିଜ୍ ଏହି ନିଷ୍ପତ୍ତି ପାଇଁ `/api/v1/ws?handshake=1` ପଚାରିଥାଏ ଏବଂ ଯଦି ସେହି ମାର୍ଗ ଯାଞ୍ଚ ନକରନ୍ତି ତେବେ ନବୀକରଣ କରିବାକୁ ମନା କରନ୍ତି। ପ୍ରାମାଣିକିକରଣ ଆବଶ୍ୟକତା ଏପର୍ଯ୍ୟନ୍ତ ପୃଥକ ଭାବରେ ପ୍ରଯୁଜ୍ୟ। ମୂଳ ଯାଞ୍ଚ ଯେତେବେଳେ ପାସ୍ ହୁଏ:

- ଏହାର `Origin` ହେଡର୍ ନାହିଁ (Codex CLI, SDKs ଏବଂ ଅନ୍ୟ ବ୍ରାଉଜର୍ ନଥିବା ଗ୍ରାହକ);
- `Origin` ଉପରୋକ୍ତ ଅନୁମତି ତାଲିକା ଦ୍ୱାରା ସ୍ୱୀକୃତିପ୍ରାପ୍ତ (`CORS_ALLOWED_ORIGINS`, `corsOrigins` ସେଟିଂ, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` ହେଉଛି OmniRoute ର ନିଜସ୍ୱ ସାର୍ବଜନୀନ ଉତ୍ପତ୍ତି ମଧ୍ୟରୁ ଗୋଟିଏ (ବିନ୍ୟାସିତ ସାର୍ବଜନୀନ ଆଧାର URL, ଏକ ବିଶ୍ୱସ୍ତ ପ୍ରକ୍ସିର ଅଗ୍ରଗାମୀ ଉତ୍ପତ୍ତି, କିମ୍ବା ଏକ IP ଆକ୍ଷରିକ କିମ୍ବା `localhost` — ସମାନ ପ୍ରାର୍ଥୀ ଡ୍ୟାସବୋର୍ଡ ମ୍ୟୁଟେସନ୍ ଯାଞ୍ଚ ବ୍ୟବହାର କରୁଥିବା ସମାନ loopback/LAN ହୋଷ୍ଟ); କିମ୍ବା
- ଏହା ଏକ ବ valid API କି ଧାରଣ କରିଥାଏ, ଯେପରି HTTP `/v1/*` ପୃଷ୍ଠରେ।

ଅନ୍ୟ କ Z ଣସି ଜିନିଷ `403 ws_origin_forbidden` ପାଇଥାଏ। ଏକ ଡ୍ୟାସବୋର୍ଡ ଅଧିବେଶନ କୁକି ଏକ ବିଦେଶୀ `Origin` ଛାଡ କରେ ନାହିଁ, କାରଣ ବ୍ରାଉଜର୍ ଏହାକୁ ଯେକ page ଣସି ପୃଷ୍ଠାର ସକେଟରେ ସଂଲଗ୍ନ କରେ। ଅନ୍ୟ ଏକ ବନ୍ଦରରେ `localhost` ସମାନ ଉତ୍ପତ୍ତି ଭାବରେ ଗ୍ରହଣ କରାଯାଏ ନାହିଁ; `CORS_ALLOWED_ORIGINS` ରେ ଏହିପରି dev ଉତ୍ପତ୍ତି ଯୋଗକର।

## ଉଦାହରଣ: OmniRoute ସାମ୍ନାରେ ଓଲଟା ପ୍ରକ୍ସି।

CORS ନିଜେ OmniRoute ଦ୍ୱାରା ବାଧ୍ୟତାମୂଳକ, ତେଣୁ ପ୍ରକ୍ସି ସାଧାରଣତ should କରିବା ଉଚିତ।**ନୁହେଁ** `Access-Control-*` ହେଡର୍ ଯୋଡନ୍ତୁ କିମ୍ବା ପୁନ r ଲିଖନ କରନ୍ତୁ (ଡବଲ୍ ହେଡର୍ ବ୍ରେକ୍ ବ୍ରାଉଜର୍)। TLS ସମାପ୍ତ କରନ୍ତୁ ଏବଂ — OmniRoute ଅଗ୍ରଗାମୀ କରନ୍ତୁ।

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

ପ୍ରକ୍ସିରେ ନୁହେଁ, OmniRoute (`CORS_ALLOWED_ORIGINS` କିମ୍ବା ସୁରକ୍ଷା ଟ୍ୟାବ୍) ରେ ଅନୁମୋଦିତ ବ୍ରାଉଜର୍ ଉତ୍ପତ୍ତି ସେଟ୍ କରନ୍ତୁ।

## ଉତ୍ସ ଫାଇଲଗୁଡିକ।

| ଚିନ୍ତା                                        | ଫାଇଲ୍।                                                               |
| --------------------------------------------- | -------------------------------------------------------------------- |
| ଅନୁମତି ରେଜୋଲୁସନ + `getCorsStatus()`           | `src/server/cors/origins.ts`                                         |
| ମିଡିଲୱେୟାର ପ୍ରୟୋଗ (ସତ୍ୟର ଏକକ ଉତ୍ସ)            | `src/server/authz/pipeline.ts`                                       |
| ସେଟିଂସମୂହ → ରନ୍ଟାଇମ୍ ମୂଳ ଇଞ୍ଜେକ୍ସନ୍।          | `src/lib/config/runtimeSettings.ts`                                  |
| ଡ୍ୟାସବୋର୍ଡ ପାଇଁ ଚାଲିବା ସମୟ ସ୍ଥିତି।            | `src/app/api/settings/authz-inventory/route.ts`                      |
| ଡ୍ୟାସବୋର୍ଡ ଚେତାବନୀ ବ୍ୟାନର।                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS ଅନୁମୋଦିତ ଉତ୍ପତ୍ତି କ୍ଷେତ୍ର।               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| କ୍ଲାଉଡ୍-ଏଜେଣ୍ଟ ପ୍ରତି ମାର୍ଗରେ CORS (ବ୍ୟତିକ୍ରମ) | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket ହ୍ୟାଣ୍ଡସେକ୍ `Origin` ଯାଞ୍ଚ।         | `src/server/origin/wsOrigin.ts`                                      |

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ।

- ସ୍ପେନ୍-ସକ୍ଷମ ମାର୍ଗଗୁଡ଼ିକ ପାଇଁ [ମାର୍ଗ ଗାର୍ଡ ଟାୟର୍ସ](./ROUTE_GUARD_TIERS.md) — ଲୁପବ୍ୟାକ୍ ପ୍ରୟୋଗ (ଏକ ପୃଥକ, ସଂପୃକ୍ତ ନିୟନ୍ତ୍ରଣ)।
- [ପ୍ରାଧିକରଣ ଗାଇଡ୍](../architecture/AUTHZ_GUIDE.md) — ପୂର୍ଣ୍ଣ auth ପାଇପଲାଇନ।
