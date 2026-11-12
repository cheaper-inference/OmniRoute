# CORS Configuration & Security (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute የትኛውን ይቆጣጠራል **የአሳሽ አመጣጥ** ከአንድ የተማከለ የተፈቀደ ዝርዝር መነሻ-አቋራጭ ምላሾችን ማንበብ ይችላል። ሞዴሉ ነው።**አልተሳካም - በነባሪ ተዘግቷል** አንዱን መርጠው እስኪገቡ ድረስ መነሻ አይፈቀድም። ይህ ገጽ የፈቃድ ዝርዝሩ እንዴት እንደሚፈታ፣ `CORS_ALLOW_ALL=true` ምን እንደሚያጋልጥ (እና በአስፈላጊነቱ፣ ምን እንደሚሰራ ያሳያል)**አይደለም** ዴቭ vs ፕሮዳክሽንን በአስተማማኝ ሁኔታ እንዴት ማዋቀር እንደሚቻል እና የሩጫ ጊዜ ማስጠንቀቂያ ዳሽቦርዱ የሚያሳየው የዱር ካርድ በቀጥታ ሲሰራ ነው።

**የእውነት ምንጭ፡-** `src/server/cors/origins.ts` (`resolveAllowedOrigin`፣ `applyCorsHeaders`፣ `getCorsStatus`)። የፈቃድ ዝርዝሩ አንድ ጊዜ ይተገበራል፣ በመሃል ዌር (`src/server/authz/pipeline.ts`) — በየመንገድ ተቆጣጣሪዎች `Access-Control-Allow-Origin` ራሳቸው አያዘጋጁም።

## መነሻው እንዴት እንደሚፈታ

ለእያንዳንዱ ጥያቄ መካከለኛው ዌር የ `Access-Control-Allow-Origin` ዋጋን በዚህ ቅደም ተከተል ያሰላል

1. **`CORS_ALLOW_ALL=true`** (ወይም የድሮው `CORS_ORIGIN=*`) → የደዋዩን `Origin` መልሰው (ወይም `*` ምንም `Origin` ራስጌ ከሌለ) በማስተጋባት `Vary: Origin` ስለዚህ መሸጎጫዎች ትክክል ሆነው ይቆያሉ። ተመሳሳይ `applyCorsHeaders()` chokepoint ደግሞ ማስመሰያ-የተረጋገጠ `/v1*`/`/v1beta*` ወለል (`relaxForTokenAuth`, RFC 9110 §12.5.5, እትም #6737) ላይ በእያንዳንዱ 2xx-አካል-ጋር ምላሽ `Vary: Accept-Encoding` ላይ ይጨመራል, ስለዚህ downstream/shared መሸጎጫዎች የታመቀ vs uncompressed ተለዋጮች በትክክል መለየት ይችላሉ.
2. ያለበለዚያ፣ ጥያቄው `Origin` የተለመደ ነው (ከታች ያለው፣ ተከታይ ስሌሽ ተነቅሏል) እና ከሚከተሉት ጋር ይዛመዳል።**የተዋሃደ የተፈቀደ ዝርዝር** :
   - env **`CORS_ALLOWED_ORIGINS`** — በነጠላ ሰረዝ የተለየ ዝርዝር፣ እና
   - የሩጫ ጊዜ **`corsOrigins`** መቼት (ዳሽቦርድ → ደህንነት → _CORS የተፈቀደላቸው መነሻዎች_)፣ በ `setRuntimeAllowedOrigins()` ከ `src/lib/config/runtimeSettings.ts` የተወጋ።
3. → ጋር የሚመሳሰል የለም።**ምንም `Access-Control-Allow-Origin` ራስጌ አልወጣም።** . አሳሹ የመነሻውን ንባብ ያግዳል። ይህ የታሰበ ያልተሳካ-የተዘጋ ነባሪ ነው።

| ኢንቭ var                | ትርጉም                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ለመፍቀድ ትክክለኛ መነሻዎች CSV (የሚመከር)።                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → ማንኛውንም መነሻ (የዱር ካርድ) ያስተጋባል። ዴቭ ብቻ                      |
| `CORS_ORIGIN`          | ቅርስ። `*` እንደ `CORS_ALLOW_ALL` ይሠራል; በተፈቀደ ዝርዝር ውስጥ አንድ ነጠላ እሴት ታክሏል። |

## `CORS_ALLOW_ALL=true` በትክክል የሚያጋልጠውን የማስፈራሪያ ሞዴል —

አጠቃላይ OWASP ማስጠንቀቂያ ("የዱር ካርድ CORS = ማንኛውም ጣቢያ የእርስዎን API ሊደውል ይችላል") በቁም ነገር ሊታሰብበት የሚገባ ነው፣ ነገር ግን የ OmniRoute ተጋላጭነት ነው።**ከአጠቃላይ መያዣው ጠባብ** በአንድ ተጨባጭ የትግበራ እውነታ ምክንያት፡-

> **ማዕከላዊው `applyCorsHeaders()` በጭራሽ `Access-Control-Allow-Credentials` አይለቅም።** አገልጋዩ `Access-Control-Allow-Credentials: true` ካልላከ በስተቀር አሳሽ _credentialed_ (ኩኪ የሚሸከም) መነሻ ምላሽ አያጋልጥም። የ OmniRoute የጋራ CORS መንገድ በጭራሽ አያደርግም።

ከ `CORS_ALLOW_ALL=true` ጋር እንኳን ይህ በአንድ ወለል ላይ ምን ማለት ነው:

| ወለል                           | የማረጋገጫ ዘዴ              | የዱር ካርድ CORS ውጤት                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ዳሽቦርድ / MANAGEMENT `/api/*`   | የኩኪ ክፍለ ጊዜ             | መነሻው ተስተጋብቷል፣ ግን **ያለ `Allow-Credentials`** አሳሹ **ብሎኮች** የተረጋገጠው ንባብ. ተንኮል-አዘል መነሻ ጣቢያ **ማንበብ አይችልም** የእርስዎ የተረጋገጠ ዳሽቦርድ ምላሾች፣ እና የክፍለ ጊዜው ኩኪ አልተጋለጠም።                                                                                                                                                                                                                    |
| ደንበኛ API `/v1/*`, `/v1beta/*` | ተሸካሚ / `x-api-key` ራስጌ | ቀድሞውኑ የተፈቀደ **በንድፍ** (`relaxForTokenAuth`)፡ አሳሾች `Authorization`/`x-api-key` ን በራስ ሰር አያያይዙትም ስለዚህ የአጥቂው ገጽ ቁልፍዎን ሊያቀርብ አይችልም። ዘና ያለ ማሚቶ የተረጋገጠ ርዕሰ ጉዳይ (የተረጋገጠ API ቁልፍ ወይም ዳሽቦርድ ክፍለ ጊዜ) የማረጋገጫ ራስጌ ብቻ ሳይሆን `Access-Control-Allow-Credentials` ፈጽሞ አያካትትም። ስም-አልባ ምላሾች (`REQUIRE_API_KEY=false`) ግልጽ የሆነ `CORS_ALLOW_ALL=true` መርጦ መግባትን ጨምሮ የተዋቀረውን መነሻ ፍቃድ ዝርዝር ይጠቀማሉ። |
| የህዝብ ንባብ-ብቻ (`/api/health`፣…) | ምንም                    | ስሜታዊ ያልሆነ; የዱር ምልክት ምንም ጉዳት የለውም።                                                                                                                                                                                                                                                                                                                                         |

ስለዚህ የ **ቀሪ** የ `CORS_ALLOW_ALL=true` መጋለጥ በሚከተሉት ብቻ የተገደበ ነው፡ (ሀ) ያልተረጋገጠ ተሻጋሪ መነሻ **ያነባል።** አስቀድሞ ያልተረጋገጠ ውሂብ፣ እና (ለ) CORS በመፍቀድ **የቅድመ በረራ ማለፊያ** በ — አስተዳደር መንገዶች ላይ የመነሻ ተሻጋሪ ገጽ ማቅረብ የማይችለውን አሁንም ማረጋገጥ ይፈልጋል። ነው።**አይደለም** የክፍለ-ጊዜ ጠለፋ ወይም የምስክርነት-ስርቆት ቬክተር በጋራ CORS መንገድ ላይ።

### አንድ እውነተኛ ለየት ያለ — `/api/v1/agents/`

የክላውድ-ኤጀንት መንገዶች (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) አዘጋጁ **የራሱ** CORS ራስጌዎች (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) እና **መ ስ ራ ት** `Access-Control-Allow-Origin: <origin>|*` ከ `Access-Control-Allow-Credentials: true` ጋር ያሰራጩ። ይህ መነሻ-ኢኮ እና ምስክርነቶች አብረው የሚኖሩበት ነጠላ ወለል ነው፣ እና ነው።**ከ `CORS_ALLOW_ALL` ነፃ** . እነዚህ መንገዶች አስተዳደር-የተረጋገጠ (`requireManagementAuth`) ናቸው; ዳሽቦርዱን ከአስተናጋጅ ውጪ የሚያጋልጡ ኦፕሬተሮች መነሻ ተሻጋሪ ምስክርነት ያለው በምላሽ ራስጌዎች የሚፈቀድበት ቦታ መሆኑን ማወቅ አለባቸው። ወደ ግልጽ የተፈቀደ ዝርዝር ማጥበቅ ከዚህ CORS መመሪያ ተለይቶ ተከታትሏል።

## የምርት ማረጋገጫ ዝርዝር

- **`CORS_ALLOW_ALL=true` በምርት ውስጥ በጭራሽ አታቀናብር።** ሳይቀናጅ ይተውት።
- አዘጋጅ **ግልጽ** መነሻ ዝርዝር — ወይ env var ወይም የሴኪዩሪቲ-ታብ መስክ፡-

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ከተገላቢጦሽ ተኪ / መሿለኪያ ጀርባ (nginx፣ Caddy፣ Cloudflare Tunnel፣ Tailscale) የሚሄድ ከሆነ፣ CORS**አይደለም** ብቸኛው መቆጣጠሪያዎ — የ loopback መስመር ጠባቂ አሁንም ስፔን የሚችሉ መንገዶችን ይጠብቃል ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ይመልከቱ)። 403 ን "ለማስተካከል" `X-Forwarded-For: 127.0.0.1` አይስጡ; የ RCE ክፍልን እንደገና የሚከፍት የመንገድ ጠባቂው ይዘጋል.
- የአሂድ ጊዜ ሁኔታን ያረጋግጡ፡ ዳሽቦርዱ ሀ **የማያቋርጥ አምበር ባነር** `CORS_ALLOW_ALL=true` በቀጥታ በሚኖርበት ጊዜ በዳሽቦርድ → ሴኪዩሪቲ → የፈቃድ ኢንቬንቶሪ ስር፣ እና `/api/settings/authz-inventory` የ `cors: { allowAll, allowedOrigins }` ኤንቨሎፕ መከታተያ መሳሪያዎች መጠይቅ ሊመልስ ይችላል።

## የልማት ምቹነት — የተወሰኑ የአካባቢ መነሻዎችን ይፈቅዳል

በዴቪ ውስጥ እንኳን የዱር ካርድን እምብዛም አያስፈልገዎትም። የሚጠቀሙባቸውን የዴቭ አገልጋዮች ብቻ ፍቀድ፡-

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

መነሻዎች ከጉዳይ ጋር ይጣጣማሉ ከኋላው ቀርፋፋ ችላ ከተባሉት ጋር፣ ስለዚህ `http://localhost:3000` እና `http://localhost:3000/` አቻ ናቸው። ተመሳሳዩ CSV በማሄድ ጊዜ ሊዘጋጅ ይችላል።**ዳሽቦርድ → ደህንነት → CORS የተፈቀዱ መነሻዎች** ያለ ዳግም ማስጀመር.

## API ቁልፎች ከኩኪ ክፍለ ጊዜዎች ጋር

- **ተሸካሚ/ `x-api-key` (የ `/v1/*` ግምታዊ ወለል)** አሳሾች እነዚህን በራስ ሰር አያያይዟቸውም። CORS እዚህ ላይ ትርጉም ያለው እንቅፋት አይደለም — የ API ቁልፉ — ማገጃ ነው ለዚህ ነው ላዩን ሆን ተብሎ የሚፈቅድ በመሆኑ አሳሽ እና Electron ተገልጋዮች ቀድሞውንም ማግኘት ያለባቸውን ምላሾች ማንበብ ይችላሉ። ዘና ያለው ማሚቶ የተረጋገጠ ርዕሰ ጉዳይ (የተረጋገጠ API ቁልፍ ወይም ዳሽቦርድ ክፍለ ጊዜ) የማረጋገጫ ራስጌ ብቻ ሳይሆን `Access-Control-Allow-Credentials` ፈጽሞ አያካትትም። ስም-አልባ ምላሾች (`REQUIRE_API_KEY=false`) ግልጽ የሆነ `CORS_ALLOW_ALL=true` መርጦ መግባትን ጨምሮ የተዋቀረውን መነሻ ፍቃድ ዝርዝር ይጠቀማሉ። የማረጋገጫ ውድቀቶች (401) ደንበኞቻቸው የተሻረ ወይም የተሳሳተ የተፃፈ ቁልፍ (#5242) እንዲያዩ ይቆያሉ፡ የቧንቧው የራሱ 401 ማሚቶ ይይዛል፣ እና ቁልፉን ራሱ የማይታወቅ ሆኖ ካገለገለው በኋላ (`/v1/models` እና `/v1beta/models` በአስተዳደር ማረጋገጫ የተዋቀረ፣ በባለቤቱ የተደገፈ `/v1/files`፣ `/v1/batches`- `/v1/media`፣ `/v1/session-leases` ) መንገዶች) በ `credentialRejectionHeaders()` በኩል ወደ 401 ማሚቶ ያክላል። አስተጋባው የማረጋገጫ አርዕስት (`Authorization`, `x-api-key`, `x-goog-api-key` ወይም `auth_token` ኩኪው) በሚይዘው ጥያቄ ላይ ቁልፍ ነው, ከመካከላቸው የትኛው መንገድ እንደተመረጠ አይደለም, እና ከ `Access-Control-Allow-Credentials` ጋር ፈጽሞ አልተጣመረም; ሰውነት የተስተካከለ የስህተት ፖስታ ነው። በ `/api/v1/` ስር ያሉ የአስተዳደር መንገዶች በ `requireManagementAuth()` (`/api/v1/management/*`፣ `/api/v1/registered-keys`፣ `/api/v1/providers/[provider]/limits`፣ `/api/v1/accounts/[id]/limits`፣ `/api/v1/issues/report`) የሚጠበቁ ይህንን የማረጋገጫ ውድቅነት አይጠቀሙም ከ `REQUIRE_API_KEY=false` ጋር 401/403 ምላሻቸው የተዋቀረውን CORS መነሻ ፖሊሲን ይከተላል።
- **የኩኪ ክፍለ ጊዜ (ዳሽቦርዱ)፡-** ባልተሳካው በተዘጋ ነባሪ የተጠበቀ **እና** በጋራ መንገድ ላይ `Access-Control-Allow-Credentials` ባለመኖሩ. management/dashboard አመጣጥ ከማንኛውም የተፈቀደ ውቅረት ያቆዩ። በትክክል ተዘግተው መቆየት አለባቸው.

## WebSocket መጨባበጥ (`/v1/responses`፣ `/v1/ws`)

አሳሾች አይተገበሩም። CORS ወደ WebSocket, ስለዚህ የ WebSocket የማጣቀሻ ውጤትን የሚመልሱ ማጓጓዣዎች የእጅ መጨባበጥን ይፈትሹ `Origin` እራሳቸው (`src/server/origin/wsOrigin.ts`): ምላሾች WebSocket (`/v1/responses`) እና መቼ OmniRoute ያልፋል `npm start` / `npm run dev`፣ የ `/v1/ws` እና `/api/v1/ws` ድልድይ, የትኛው ጅረቶች `/v1/chat/completions`, `/v1/messages` እና `/v1/responses` እንደ ክፈፎች. ድልድዩ ይጠይቃል `/api/v1/ws?handshake=1` ለፍርዱ እና ያ መንገድ ቼኩን እስካልሄደ ድረስ ለማሻሻል ፈቃደኛ አይሆንም። የማረጋገጫ መስፈርቶች አሁንም በተናጥል ይተገበራሉ። የመነሻ ማረጋገጫው ሲያልፍ፡-

- `Origin` ራስጌ የለውም (Codex CLI, SDKs እና ሌሎች አሳሽ ያልሆኑ ደንበኞች);
- `Origin` ከላይ ባለው የተፈቀደ ዝርዝር (`CORS_ALLOWED_ORIGINS`, የ `corsOrigins` ቅንብር, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` ከ OmniRoute ህዝባዊ መነሻዎች አንዱ ነው (የተዋቀረው የህዝብ መሰረት URL፣ የታመነ ተኪ የተላለፈ ምንጭ፣ ወይም ቀጥተኛ loopback/LAN አስተናጋጅ እንደ IP በጥሬው ወይም `localhost` — የተሰጠው ተመሳሳይ እጩ ዳሽቦርድ ሚውቴሽን ቼክ ይጠቀማል)። ወይም
- ልክ እንደ HTTP `/v1/*` ወለል ላይ ልክ የሆነ API ቁልፍ ይይዛል።

ሌላ ማንኛውም ነገር `403 ws_origin_forbidden` ያገኛል. የዳሽቦርድ ክፍለ ጊዜ ኩኪ የውጭ ዜጋ `Origin` ነፃ አያደርገውም ፣ ምክንያቱም አሳሹ ከማንኛውም ገጽ ሶኬት ጋር ስለሚያያዝ። `localhost` በሌላ ወደብ ላይ እንደ ተመሳሳይ-መነሻ አይቆጠርም; እንደዚህ ያሉ የዴቭ መነሻዎችን ወደ `CORS_ALLOWED_ORIGINS` ያክሉ።

## ምሳሌ፡ ተገላቢጦሽ ፕሮክሲ ከ OmniRoute ፊት ለፊት

CORS በራሱ በ OmniRoute ተፈጻሚ ነው፣ ስለዚህ ተኪው በአጠቃላይ አለበት።**አይደለም** `Access-Control-*` ራስጌዎችን ያክሉ ወይም እንደገና ይፃፉ (ድርብ ራስጌዎች የተሰበሩ አሳሾች)። TLS ያቋርጡ እና — አስተላልፍ OmniRoute ቅድመ በረራውን ይመልስ

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

የተፈቀደውን የአሳሽ አመጣጥ በ OmniRoute (`CORS_ALLOWED_ORIGINS` ወይም የሴኪዩሪቲ ትር) ውስጥ ያቀናብሩ፣ በፕሮክሲ ውስጥ አይደለም።

## ምንጭ ፋይሎች

| ስጋት                               | ፋይል                                                                  |
| --------------------------------- | -------------------------------------------------------------------- |
| የፈቃድ ዝርዝር ጥራት + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| ሚድልዌር መተግበሪያ (ነጠላ የእውነት ምንጭ)      | `src/server/authz/pipeline.ts`                                       |
| ቅንብሮች → የአሂድ መነሻ መርፌ              | `src/lib/config/runtimeSettings.ts`                                  |
| ለዳሽቦርዱ የሩጫ ጊዜ ሁኔታ                 | `src/app/api/settings/authz-inventory/route.ts`                      |
| ዳሽቦርድ ማስጠንቀቂያ ባነር                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS የተፈቀዱ መነሻዎች መስክ              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| የክላውድ ወኪል በየመንገድ CORS (ከዚህ በስተቀር) | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket የመጨባበጥ `Origin` ቼክ      | `src/server/origin/wsOrigin.ts`                                      |

## በተጨማሪም ይመልከቱ

- [የመንገድ ጠባቂ Tiers](./ROUTE_GUARD_TIERS.md) — loopback ማስፈጸሚያ ለስፔን ለሚችሉ መንገዶች (የተለየ፣ ተጨማሪ ቁጥጥር)።
- [የፈቃድ መመሪያ](../architecture/AUTHZ_GUIDE.md) — ሙሉ የማረጋገጫ ቧንቧ መስመር።
