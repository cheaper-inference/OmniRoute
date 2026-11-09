# Authorization Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **የእውነት ምንጭ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **መጨረሻ የተዘመነው:** 2026-09-22 — የወሰን ስም-ክልሎች ወደ MCP-SERVER.md ያመለክታሉ

OmniRoute እያንዳንዱን የAPI ጥያቄ የሚቆጣጠር፣ መንገድን የሚያውቅ የፈቃድ መስጫ ሂደት አለው። ምደባው **ቁርጥ ያለ** እና **ሲሳነው-ዝግ** ነው — ሊመደብ የማይችል ማንኛውም ነገር `MANAGEMENT` ሆኖ ይመደባል፣ እንዲሁም ክፍለ-ጊዜ ወይም የአስተዳደር-ደረጃ ቶከን ይጠይቃል። ይህ ገጽ መንገዶችን ለሚንከባከቡ ወይም አዳዲስ የመዳረሻ ነጥቦችን ለሚነድፉ መሐንዲሶች ሞዴሉን ያብራራል።

![የAuthZ ሂደት (3 የመንገድ ምድቦች + የፖሊሲ ግምገማ)](../diagrams/exported/authz-pipeline.svg)

> ምንጭ፦ [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ሁለት የማረጋገጫ ሁነታዎች

### 1. API ቁልፍ (Bearer)

ከOpenAI/Anthropic/Gemini ጋር ተኳሃኝ ለሆኑ የደንበኛ APIዎች እና ቁልፉ `manage` ስኮፕ ሲኖረው ለሚያገለግሉ ጥቂት የአስተዳደር መንገዶች ይጠቅማል።

```
Authorization: Bearer <api-key>
```

በ`src/sse/services/auth.ts` ውስጥ በሚገኙት `isValidApiKey()` / `extractApiKey()` ይረጋገጣል፤ እንዲሁም በ`src/shared/utils/apiAuth.ts` በኩል እንደገና ይላካል። አረጋጋጩ የ`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` የአካባቢ ተለዋዋጮችን እንደ ቋሚ የማስተላለፊያ ቁልፎችም ይቀበላል (ጉዳይ #1350)።

### 2. የዳሽቦርድ ክፍለ ጊዜ (`auth_token` ኩኪ)

ለዳሽቦርድ ገጾች እና ለአስተዳደር ሥራዎች።

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

ኩኪው እንደ ክፍለ ጊዜ የሚቆጠረው JWT ሲረጋገጥ **እና** `authenticated: true` ሲይዝ ብቻ ነው
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)። ኩኪውን የሚጠቀሙ ሁሉም አካላት (የዳሽቦርድ መንገድ ጠባቂ (`isDashboardSessionAuthenticated()`))፣ የauthz ቧንቧ መስመር እድሳት፣ WebSocket እጅ መጨባበጥ፣ የቀጥታ ሰርቨር፣ `/api/settings/require-login` እና `/api/auth/status`) በዚያ አጋዥ በኩል ያልፋሉ።
በ`JWT_SECRET` የተፈረሙ ሌሎች JWTዎችም አሉ — Cursor CLI passthrough ለቁልፍ ባለቤቶች `iss "omniroute" / aud "cursor-cli"` ቶከኖችን ያመነጫል — እነዚህም በፍጹም ክፍለ ጊዜዎች አይደሉም
(#13298)።

በ`src/shared/utils/apiAuth.ts` ውስጥ ባለው `isDashboardSessionAuthenticated()` ይረጋገጣል። በ30 ቀን የሕይወት ዘመኑ ውስጥ ከ7 ቀናት በታች የሚቀሩት ከሆነ ቧንቧ መስመሩ JWTን በራስ-ሰር ያድሳል።

አንድ ክፍለ ጊዜ 30 ቀኑ ሳያልቅም ሊያበቃ ይችላል፤ ምክንያቱም እያንዳንዱ አመንጪ በ`mintDashboardSessionToken` በኩል ያልፋል (`iat` የችግኝ ጊዜ እና `jti` መለያ ይዞ)፣ አረጋጋጩም ሁለት ቅንብሮችን ይፈትሻል፦ `sessionsValidAfter`፣ ይህም በይለፍ ቃል ለውጥ የሚዘጋጅ ሲሆን ከዚያ በፊት የተሰጠ እያንዳንዱ ክፍለ ጊዜ እንዳይረጋገጥ ያደርጋል (ይለፍ ቃሉን የቀየረው አሳሽ አዲስ ኩኪ ያገኛል)፣ እና `revokedDashboardSessions`፣ ይህም `POST /api/auth/logout` የወጣበትን ክፍለ ጊዜ `jti` የሚጨምርበት ነው። በቀድሞ ልቀት የተመነጩ ክፍለ ጊዜዎች ከሁለቱም ክሌሞች አንዳቸውንም አይይዙም፤ ስለዚህ የመጀመሪያው የይለፍ ቃል ለውጥ እስኪደረግ ድረስ ልክ ሆነው ይቆያሉ። ቅንብሮቹ ሊነበቡ ካልቻሉ ክፍለ ጊዜው እንደታመነ አይቆጠርም።

አንዳንድ የአስተዳደር መንገዶች ከሁለቱም ሁነታዎች ማለትም ከኩኪ **ወይም** `Bearer <key>` ይቀበላሉ፤ ይህም የAPI ቁልፉ `manage` (ወይም `admin`) ስኮፕ ሲኖረው ነው። በv3.8 የተጨመረውን “በAPI ጥሪዎች ሊዋቀር የሚችል” የሥራ ፍሰት የሚያስችለው ይህ ነው።

#### አማራጭ OIDC የመግቢያ መከላከያ (#6973)

የዳሽቦርድ አስተዳዳሪ መግቢያ ከነባሪው የይለፍ ቃል መግቢያ ጎን ለጎን እንደ አማራጭ OIDC (OpenID Connect) ፍሰትንም ይደግፋል — የይለፍ ቃል መግቢያ በጭራሽ አይወገድም፣ ብቻ ይጨመርበታል፦

- `settings.oidcEnabled === true` **ካልሆነ** እና `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ሁሉም ካልተዋቀሩ በስተቀር የተሰናከለ ነው (ቅንብሮች → ማረጋገጫ)።
  አለበለዚያ `GET /api/auth/oidc/login` `400` ይመልሳል።
- `GET /api/auth/oidc/login` `authorization_endpoint`ን ከአውጪው
  `/.well-known/openid-configuration` ይፈልግና (ወደ
  `<issuer>/authorize` እንደ አማራጭ ይመለሳል)፣ የማዞሪያ URIውን ከገቢው ጥያቄ
  (`x-forwarded-proto`ን ከግምት ውስጥ በማስገባት) ይገነባል፣ እና በ`httpOnly`
  `oidc_state` ኩኪ ውስጥ የተከማቸ የዘፈቀደ `state` በመጠቀም ወደ IdPው
  ያዞራል።
- `GET /api/auth/oidc/callback` `state`ን ያረጋግጣል፣ የፈቃድ
  ኮዱን ይለዋውጣል፣ እና የID ቶከኑን ፊርማ በአውጪው JWKS
  (`jose`'s `createRemoteJWKSet`፣ ለእያንዳንዱ JWKS URI የሚሸጎጥ) አማካኝነት ከ`issuer`/`audience`
  ማረጋገጫዎች ጋር ያረጋግጣል። ወደ ዳሽቦርዱ ለመግባት ባዶ ያልሆነ
  `oidcAllowedSubjects` ዝርዝር፣ የ`oidcAdmissionClaim` ፖሊሲ ወይም ሁለቱም ያስፈልጋሉ።
  የርዕሰ-ጉዳዮች ዝርዝሩ `sub`ን ወይም `email`ን የሚያዛምደው
  `email_verified === true` ሲሆን ብቻ ነው። አማራጭ የይገባኛል ፖሊሲው
  በነጥብ የተለየ የID-ቶከን ይገባኛል መንገድ (ለምሳሌ፣ `realm_access.roles`) እና
  ተቀባይነት ያላቸውን እሴቶች የያዘ ድርድር ይወስዳል፤ የተፈታው ይገባኛል ቢያንስ
  አንድ ተቀባይነት ያለው እሴት የያዘ የሕብረቁምፊዎች ድርድር መሆን አለበት።
  ሁለቱም ፖሊሲዎች ከተዋቀሩ፣ ሁለቱም ማለፍ አለባቸው። የጎደሉ/ቅርጸት የተበላሹ
  ይገባኛሎች በነባሪ ውድቅ ይደረጋሉ፣ እና ከሁለቱ ፖሊሲዎች አንዱም ከሌለ
  የመልስ ጥሪው መግባትን ይከለክላል (`not_configured`)። ነባር በርዕሰ-ጉዳይ ብቻ
  የተመሠረቱ ውቅሮች ሳይለወጡ ይቀጥላሉ።
- Keycloak በተለምዶ የrealm ሚናዎችን ወደ የመዳረሻ ቶከኖች ያዛምዳል፣ የግድ ወደ ID
  ቶከኖች አይደለም። የrealm ሚናውን `admin` ለመጠየቅ፣
  `realm_access.roles`ን በ**ID ቶከኑ** ውስጥ የሚያካትት የፕሮቶኮል አዛማጅ
  ለዚህ ደንበኛ ያዋቅሩ፣ ከዚያ `oidcAdmissionClaim`ን ወደ
  `{ "path": "realm_access.roles", "values": ["admin"] }` ያዘጋጁ።
  በሚና ብቻ የተመሠረተ መግቢያን ከማንቃትዎ በፊት ለዚህ ደንበኛ ትክክለኛውን
  የID-ቶከን ይገባኛል ያረጋግጡ፤ መተግበሪያው የመዳረሻ-ቶከን ሚናዎችን አያነብም።
  በIdP በኩል ያለ የቶከን ውድቅ ማድረግ ይህን በመተግበሪያው በኩል የሚደረግ
  ማረጋገጫ ሊያጠናክር ይችላል፣ ነገር ግን አይተካውም።
- ሲሳካ፣ የይለፍ ቃል መግቢያው የሚያወጣውን **በትክክል ተመሳሳይ** የ30 ቀን
  `auth_token` JWT (`src/app/api/auth/login/route.ts`) ያወጣል፤ ስለዚህ የተቀረው
  የዳሽቦርድ ክፍለ-ጊዜ ሂደት (ራስ-ሰር ማደስ፣ የኩኪ ጠቋሚዎች) ሳይለወጥ ይቆያል —
  OIDC የሚተካው ኩኪው እንዴት እንደሚወጣ ብቻ ነው፣ የሚሰጠውን ፈቃድ አይደለም።
  በIdP ሚናዎች/ቡድኖች ላይ የሚደረጉ ለውጦች ነባር OmniRoute ክፍለ-ጊዜዎችን
  ዋጋ-ቢስ አያደርጉም፤ መውጣት፣ የይለፍ ቃል ማዞር ወይም የክፍለ-ጊዜ ማብቂያ
  አሁንም የእነሱን የሕይወት ዘመን ይቆጣጠራሉ።
- እያንዳንዱ `oidc*` ቅንብር (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) በ`SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`) ውስጥ ይገኛል፤ የጥያቄው አካል
  የአስተዳደር የይለፍ ቃሉን እንደ `currentPassword` ካልያዘ፣ `PATCH /api/settings`
  `400 PASSWORD_REQUIRED` ይመልሳል (ስህተት ሲሆን `401 PASSWORD_MISMATCH`)።
  `oidcDisablePasswordLogin` በይለፍ ቃል _መግባትን_ (`POST /api/auth/login`)
  ይከለክላል፣ ነገር ግን የተከማቸውን የይለፍ ቃል hash ያቆያል፣ እና ዳግም ማረጋገጫው
  አሁንም `currentPassword`ን ከእሱ ጋር ያረጋግጣል።
- `corsOrigins` እና `bruteForceProtection` እንዲሁ በ`SECURITY_IMPACTING_SETTINGS_KEYS`
  ውስጥ ናቸው፤ ከሁለቱ አንዱን ማላላት የመግቢያ መከላከያዎችን ያዳክማል፣ ስለዚህ
  ተመሳሳዩን የ`currentPassword` ዳግም ማረጋገጫ ይጠይቃሉ (የደህንነት ትሩ
  ይጠይቀዋል)፣ እና የJSON ማስመጣቱ እነሱን ያስወግዳል።
- እያንዳንዱ የደህንነት-ፖሊሲ ቁልፍ — የ`SECURITY_IMPACTING_SETTINGS_KEYS` ግቤቶች፣
  እያንዳንዱ `oidc*` ቁልፍ እና የዳሽቦርድ ክፍለ-ጊዜ ሁኔታ — በ`PATCH /api/settings`
  ላይ **ለኦፕሬተር ብቻ** ነው፤ manage ወሰን ያለው API ቁልፍ ወይም የ`oma_`
  መዳረሻ ቶከን ትክክለኛውን `currentPassword` ቢልክም እንኳ በ`403` ውድቅ
  ይደረጋል፣ እና ውድቅ ማድረጉ እንደ `settings.update_failed` ከ
  `reason: OPERATOR_REQUIRED` ጋር በኦዲት ይመዘገባል
  (`requireOperatorCredential()` በ`src/lib/api/operatorCredential.ts`)።
  መደበኛ ቅንብሮች (ገጽታ፣ የማሳያ ምርጫዎች) በ`manage` ቁልፍ
  ወይም በ`admin` መዳረሻ ቶከን እንዲጻፉ ይቆያሉ። በ`/api/settings` ራሱ ላይ
  የሚደረግ እያንዳንዱ ለውጥ (እንዲሁም በ`/api/settings/require-login` ላይ)
  የ`admin` መዳረሻ-ቶከን ወሰንንም ይፈልጋል
  (`ADMIN_MUTATION_EXACT_PATHS` በ`src/server/authz/accessScopes.ts`፣ ትክክለኛ-መንገድ
  ማዛመድ)፤ `GET` `read` ሆኖ ይቆያል፣ እና ሌሎቹ የ`/api/settings/*` ንዑስ-መንገዶች
  (ፕሮክሲዎች፣ የጥምር ነባሪዎች፣ የሞዴል ተለዋጭ ስሞች፣ መጭመቅ፣ ማጽዳቶች…)
  በዘዴው የሚገመተውን `write` ወሰን ይዘው ይቆያሉ።
- `POST /api/settings/import-json` ያንን ዳግም ማረጋገጫ ይዘላል፣ ስለዚህ ከመጻፉ
  በፊት በ`IMPORT_STRIPPED_SETTINGS_KEYS` (በዚያው ፋይል) ውስጥ ያለውን እያንዳንዱን
  ቁልፍ ያስወግዳል፤ የይለፍ ቃሉን እና `currentPassword`ን፣ እያንዳንዱን
  የ`SECURITY_IMPACTING_SETTINGS_KEYS` ግቤት፣ እና የዳሽቦርድ ክፍለ-ጊዜ ሁኔታን
  (`sessionsValidAfter`, `revokedDashboardSessions`)። ስለዚህ የቆየ ምትኬን
  ማስመጣት በይለፍ ቃል ለውጥ ወይም በመውጣት አስቀድሞ የተቋረጠ ክፍለ-ጊዜን
  እንደገና ሊያስነሳ አይችልም።

#### አማራጭ TOTP ባለሁለት-ደረጃ መግቢያ (#16619)

ከቅንብሮች → ደህንነት ይመዘገባል፤ ኦፕሬተሩ እስኪያነቃው ድረስ ጠፍቶ ይቆያል
(`src/server/auth/dashboardMfa.ts`)።

- **የሚሸፍነው፦** በይለፍ ቃል መግባት (`POST /api/auth/login`፣ ከዚያም
  `POST /api/auth/mfa/verify` ያስፈልገዋል) እና `omniroute connect` (`POST /api/cli/connect`፣
  የይለፍ ቃል-ብቻ ልውውጥን ውድቅ ያደርጋል እና ኮዱን እንደ `totp` ይቀበላል)።
- **የማይሸፍነው፦** OIDC / SSO መግባት (`/api/auth/oidc/callback`) የOmniRoute TOTPን
  አይጠይቅም። የሚተማመነው በመለያ አቅራቢው የራሱ ሁለተኛ የማረጋገጫ ዘዴ ላይ ነው፤ ስለዚህ OIDC ከነቃ MFAን በIdP ላይ ያስገድዱ።
- **መልሶ ማግኛ** (መሣሪያ ከጠፋ፣ ምንም የመልሶ ማግኛ ኮድ ካልቀረ፣ ወይም አንድ የማረጋገጫ ዘዴ ከአሁን በኋላ ሊረጋገጥ ካልቻለ፣ ለምሳሌ `STORAGE_ENCRYPTION_KEY` ከተቀየረ)፦
  1. አገልጋዩን በ`OMNIROUTE_DISABLE_MFA=true` እንደገና ያስጀምሩ።
  2. በራሱ አስተናጋጅ ላይ (loopback peer እና loopback `Host`፣ ለምሳሌ
     `http://localhost:20128`) በይለፍ ቃል ይግቡ። ሁለተኛው የማረጋገጫ ዘዴ ለዚያ origin ብቻ ይተዋል፤ ሌሎች ሁሉም originዎች አሁንም ኮዱን ይፈልጋሉ።
  3. በቅንብሮች → ደህንነት → አሰናክል ውስጥ የይለፍ ቃሉን ያስገቡና የኮድ መስኩን ባዶ ይተዉት። `POST /api/auth/mfa/disable` የ`code` የሌለበትን body የሚቀበለው ተለዋዋጩ በተቀመጠበት እና ጥያቄው ከአስተናጋጁ በመጣበት ጊዜ ብቻ ነው፤ አሁንም የdashboard ክፍለ ጊዜን እና የአሁኑን ይለፍ ቃል ይፈልጋል፣ እንዲሁም እንደ `auth.mfa.disabled` ከ`secondFactor: "recovery_switch"` ጋር በመዝገብ ይቀመጣል።
  4. `OMNIROUTE_DISABLE_MFA` ን ያስወግዱ፣ እንደገና ያስጀምሩ፣ እና ካስፈለገ እንደገና ያስመዝግቡ።

## የመንገድ ክፍሎች

`src/server/authz/types.ts` ሶስት ክፍሎችን ይገልጻል; በቆራጥነት ሊመደብ የማይችል ማንኛውም መንገድ ወደ `MANAGEMENT` ይመለሳል።

| ክፍል          | መግለጫ                                                                                                                                               | ማረጋገጫ ያስፈልጋል                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `PUBLIC`     | በግልጽ ደህንነታቸው የተጠበቁ መንገዶች — መግባት፣ መውጣት፣ ሁኔታ፣ ጤና፣ ተሳፍሮ ቡት ማንጠልጠያ።                                                                                    | ምንም                                           |
| `CLIENT_API` | ሞዴል የሚያገለግሉ የመጨረሻ ነጥቦች — `/api/v1/*`, `/api/v1beta/*`, እና ተለዋጭ ስሞች `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | ውጤታማው `REQUIRE_API_KEY` ባህሪ ባንዲራ ሲነቃ ተሸካሚ ቁልፍ |
| `MANAGEMENT` | ዳሽቦርድ ገጾች፣ መቼቶች፣ አቅራቢዎች፣ ቁልፎች፣ አስተዳዳሪ እና የምርመራ የመጨረሻ ነጥቦች።                                                                                         | ዳሽቦርድ ክፍለ ጊዜ OR Bearer ከ `manage` ወሰን ጋር      |

ጥቂት `MANAGEMENT` ድርጊቶች ናቸው።** ኦፕሬተር-ብቻ** : የ `manage` ቁልፍ በቂ አይደለም. የተከማቹ ምስክርነቶችን ወደ ውጪ መላክ (`GET /api/settings/export-json`፣ `GET /api/db-backups/export`፣ `GET /api/db-backups/exportAll`)፣ ምትኬን በቀጥታ ወደነበረበት መመለስ (`POST /api/db-backups/import` ጨምሮ `dryRun=true`፣ `POST /api/db-backups` restore by id፣ `POST /api/settings/import-json`)፣ የመልሶ ማግኛ ነጥቦችን ማጥፋት (`DELETE /api/db-backups` ጽዳት እና `PATCH /api/db-backups` ከእያንዳንዱ ምትኬ በኋላ አውቶማቲክ መቁረጥን ስለሚገፋፋው) የዳሽቦርድ ክፍለ ጊዜ፣ ወይም ሊገባ የሚችል CLI ጉዳይ ያስፈልገዋል። የማመሳሰል ማስመሰያ (`POST /api/sync/tokens`) መስጠት እና የ `admin` CLI መዳረሻ ማስመሰያ (`POST /api/cli/tokens`) መፍጠር የዳሽቦርድ ክፍለ ጊዜ ወይም የአካባቢያዊ CLI ርዕሰ ጉዳይ በእያንዳንዱ የመግቢያ ሁነታ ያስፈልገዋል። የማንኛውም ወሰን API ቁልፎች እና `oma_` የመዳረሻ ቶከኖች የኦፕሬተር ምስክርነቶች አይደሉም፡ አንድ በሚያስፈልግበት ጊዜ `403` ያገኛሉ። ቼኩ በ `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) ይኖራል። የመግቢያ ቅንብሮችን መቀየር ኦፕሬተር-ብቻ ነው `POST /api/settings/require-login` (የአስተዳደር የይለፍ ቃል አዘጋጅ/ዝቅይ `requireLogin`) እነዚያን ምስክርነቶች ብቻ የሚቀበል የይለፍ ቃል አንዴ ካለ — የመጀመሪያው-አሂድ ቡትስትራፕ መስኮት (እስካሁን የይለፍ ቃል የለም) ያልተለወጠ — እና የዳሽቦርድ ክፍለ ጊዜ የይለፍ ቃሉን ለመተካት `currentPassword` መላክ አለበት (`403` ሲጠፋ ወይም ሲሳሳት፣ `settings.update_failed` እንደ ኦዲት ተደርጓል)። አካባቢያዊው CLI እና መግባት የተሰናከለ ምሳሌ የመልሶ ማግኛ መንገዱን ያቆዩታል እና ያለሱ የይለፍ ቃል ሊያዘጋጁ ይችላሉ፣ ምክንያቱም ሁለቱም የውሂብ ማውጫው ባለቤት ከሆነው አስተናጋጅ ጋር የተሳሰሩ ናቸው።

## የቧንቧ መስመር

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

የታመኑ የውስጥ ራስጌዎች (በ `src/server/authz/headers.ts` የተገለጹ) ናቸው።** ከገቢ ጥያቄዎች ተወግዷል** ከምድብ በፊት — ደንበኞች አንድን ርዕሰ ጉዳይ ለማስመሰል `x-omniroute-auth-*` አስቀድመው መሙላት አይችሉም።

### የፖሊሲ ውሎች

እያንዳንዱ የመንገድ ክፍል `src/server/authz/policies/` ውስጥ ፖሊሲ አለው፡-

- **`publicPolicy`** (`policies/public.ts`) — ሁልጊዜ `allow({ kind: "anonymous", id: "anonymous" })` ይመልሳል።
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ተዋጽኦዎች Bearer፣ በ `validateApiKey()` በኩል ያረጋግጣል። ውጤታማው `REQUIRE_API_KEY` ባህሪ ባንዲራ ሲሰናከል ብቻ ወደ ማንነቱ ያልታወቀ ይሆናል። ውጤታማው ባንዲራ በ `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ነው የሚፈታው ስለዚህ የዳሽቦርድ ባህሪ ባንዲራዎች እና የአካባቢ ተለዋዋጮች `/api/v1/*`, `/api/v1beta/*`, እና ቅጽል ስሞች በወጥነት ይገዛሉ; የመፍትሄው አለመሳካቶች ተዘግተዋል. የዳሽቦርድ-ክፍለ-ጊዜ ጥያቄዎችን በደንበኛ API መንገዶች ( `/api/v1/models` ጨምሮ፣ በዳሽቦርድ ሞዴል ካታሎግ ጥቅም ላይ እንደሚውል) ይፈቅዳል። Entra ID SSO ሲነቃ፣ መዋቅራዊ የኢንትራ ቶከን የሆነ ተሸካሚ (ሦስት base64url ክፍሎች፣ `RS*` alg፣ `kid`) በ SSO ቅርንጫፍ ይካሄዳል።** ከዚህ በፊት** `validateApiKey()` እና ፍርዱ የመጨረሻ ነው — በጭራሽ ወደ ኤፒአይ-ቁልፍ መንገድ ወይም ወደ ስም-አልባ ቅርንጫፉ አይወድቅም፣ ስለዚህ የማንነት አቅራቢው መቋረጥ ክፍት መዳረሻ ሊሆን አይችልም። የማይለዋወጡ API ቁልፎች አልተነኩም። [Entra ID SSO](../security/ENTRA_SSO.md) ይመልከቱ።
- **`managementPolicy`** (`policies/management.ts`) — የዳሽቦርድ ክፍለ ጊዜን፣ የውስጥ ሞዴል-አመሳስል ጥያቄዎችን ( `/api/providers/[name]/(sync-models|models)` ጋር የሚዛመድ) ይቀበላል ወይም `isAuthRequired()` በውሸት ከተመለሰ ሙሉ በሙሉ ይዘላል። የተሸካሚ ማስመሰያ ሲኖር ግን ልክ ያልሆነ 403 (`AUTH_001`) ይመልሳል፣ ካልሆነ 401። እንዲሁም የመንገድ ጠባቂ ደረጃዎችን (LOCAL_ONLY / ALWAYS_PROTECTED) ከማንኛውም የድጋፍ ቅርንጫፍ በፊት ያስፈጽማል — [የመንገድ ጠባቂ ደረጃዎችን](../security/ROUTE_GUARD_TIERS.md) ይመልከቱ። በ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ውስጥ LOCAL_ONLY ዱካዎች (ዛሬ: `/api/mcp/`) የተሸካሚው ቁልፍ `manage` ወሰን ሲይዝ ከloopback ሊደረስበት ይችላል; ሁሉም ሌሎች LOCAL_ONLY ዱካዎች ምንም ያህል ስፋት ቢኖራቸውም ጥብቅ-loopback ይቆያሉ።

የተሳካ ፖሊሲ `AuthSubject` በ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ይመልሳል። የታች ተፋሰስ ተቆጣጣሪዎች የድጋሚ የቃል አመክንዮ ከማሄድ ይልቅ በ `assertAuth(request, "CLIENT_API")` በ `src/server/authz/assertAuth.ts` በኩል ሊያነቡት ይችላሉ።

## የህዝብ መንገዶች ዝርዝር

`src/shared/constants/publicApiRoutes.ts` ግልጽ የተፈቀደ ዝርዝር ነው፡-

ዝርዝሩ የተከፋፈለው በ** ቅርጽ** , እና ክፍፍሉ ተሸካሚ ነው (GHSA-74g9-q8f6-793h)፡ ቅድመ ቅጥያ ከ `startsWith()` ጋር ይዛመዳል፣ ስለዚህ እንዲሁም መሪ ገጸ ባህሪያቱን ከሚጋራው ከጎን ካሉት መንገዶች ጋር ይዛመዳል። `/api/usage/om-usage` እንደ ቅድመ ቅጥያ `/api/usage/om-usage<anything>` PUBLIC ምልክት ተደርጎበታል፣ እና በመቀጠል ያንን በራሱ ማረጋገጫ የሌለውን ተቆጣጣሪ `/api/usage/[connectionId]` — ለማድረግ ይፈታል።

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ተነባቢ-ብቻ መንገዶች ይፋዊ ናቸው።** ብቻ** ለአስተማማኝ ዘዴዎች. ማሳሰቢያ `classifyRoute()` `/api/v1/*` እና `/api/v1beta/*` ከ PUBLIC ውድቀት-በ — አያካትትም እነዚያ ሁልጊዜ `CLIENT_API` ናቸው ስለዚህ የ Bearer-key ፖሊሲ አሁንም ይሠራል።

## አዲስ መስመር ማከል

### ንድፍ 1 — ይፋዊ የclient API endpoint (Bearer-auth)

በ`/api/v1/` እና `/api/v1beta/` ስር ያሉ መስመሮች በራስ-ሰር `CLIENT_API` ተብለው ይመደባሉ። middlewareው የBearer ማረጋገጫውን ያስገድዳል፤ route handlers ይህንን እንደገና ማከናወን አያስፈልጋቸውም፣ ነገር ግን ጠቃሚ ከሆነ subjectን ማንበብ ይችላሉ።

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... የhandler አመክንዮ
}
```

### ንድፍ 2 — የአስተዳደር endpoint (session ወይም Bearer + manage)

ከ`src/lib/api/requireManagementAuth.ts` የሚገኘውን `requireManagementAuth()` ይጠቀሙ፦

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... የhandler አመክንዮ
}
```

`requireManagementAuth()` ሲሳካ `null`ን፣ ካልሆነ ደግሞ የJSON ስህተት `Response`ን ይመልሳል፦

- 401 `AUTH_001` "ማረጋገጫ ያስፈልጋል" — ምንም credentials የሉም
- 403 — ልክ ያልሆነ Bearer **ወይም** Bearer አለ፣ ነገር ግን keyው የ`manage` / `admin` scope የለውም

`hasManageScope(scopes)` ለ`"manage"` ወይም `"admin"` true ይመልሳል።

### ንድፍ 3 — ወደ ይፋዊ የፈቃድ ዝርዝሩ ማከል

setን በቅርጹ መሠረት ይምረጡ፣ በአመቺነት መሠረት አይደለም። አንድ መስመር ወደ `PUBLIC_API_ROUTES_EXACT` ይገባል (ወይም GET-only ከሆነ ወደ `PUBLIC_READONLY_CORS_API_ROUTES`)፤ ወደ `PUBLIC_API_ROUTE_PREFIXES` የሚገባው እውነተኛ ንዑስ ዛፍ ብቻ ነው፣ እና **በ`/` መጨረስ አለበት**። ነጠላ መስመርን በprefix ዝርዝሩ ውስጥ ማስቀመጥ፣ ተመሳሳይ መሪ ቁምፊዎችን የሚጋሩ ሁሉንም አጎራባች paths ይፋዊ ያደርጋል — ይህም በኋላ የሚታከሉ dynamic-segment siblingsን ይጨምራል (GHSA-74g9-q8f6-793h)። በ`tests/unit/public-api-routes.test.ts`፣ `tests/unit/authz/public-route-exact-match.test.ts` እና `tests/unit/authz/classify.test.ts` ያሉ unit testsን ያዘምኑ።

## የፈቃድ ወሰኖች

ሦስት namespace-ዎች አሉ። እያንዳንዱ checker የሚያነበው የራሱን string-ዎች ብቻ ነው። `manage` ለ`read:compression` በ`scopeMatches` ለምን እንደማይዛመድ እና የ`read` access token ለምን `PATCH /api/keys/{id}` ማድረግ እንደማይችል ጨምሮ፣ የጎን-ለጎን ንጽጽሩ
[ሦስቱ የፈቃድ ወሰን namespace-ዎች](../frameworks/MCP-SERVER.md#three-scope-namespaces) ላይ ይገኛል።

API key-ዎች የ`scopes` array ይይዛሉ (በ`api_keys.scopes` ውስጥ እንደ JSON ይከማቻል፤ `src/lib/db/apiKeys.ts`ን ይመልከቱ)።

### የአስተዳደር ፈቃድ ወሰን

- `manage` / `admin` — `hasManageScope`። ወደ የአስተዳደር API route-ዎች የBearer መዳረሻ።
- `mcp:connect`፣ `self:usage`፣ `self:account-quota` እና
  `policy:bypass-provider-quota` በትክክል የሚዛመዱ ተጨማሪ የፈቃድ ወሰኖች ናቸው። እነዚህ
  ከ`MANAGEMENT_API_KEY_SCOPES` ውጭ ይገኛሉ። `mcp:connect` የሚከፍተው
  የ`/api/mcp/` non-loopback ልዩ ፈቃድን ብቻ ነው።

### የMCP tool ፈቃድ ወሰኖች

Catalog እና የማዛመድ ደንቦች (ተመሳሳይ string፣ ወይም በ`*` የሚያበቃ የተፈቀደ ወሰን)፦
[የMCP tool ፈቃድ ወሰኖች](../frameworks/MCP-SERVER.md#mcp-tool-scopes)።
በ`src/shared/constants/mcpScopes.ts` ውስጥ ያለው `MCP_SCOPE_LIST` ያ ሙሉ catalog ሳይሆን የመጀመሪያው typed
subset ነው። `resolveCallerScopeContext()` ከMCP auth info፣ ከrequest metadata ወይም ከ`OMNIROUTE_MCP_SCOPES`
የፈቃድ ወሰኖችን ከወሰነ በኋላ፣ ማስፈጸሙ በ`open-sse/mcp-server/scopeEnforcement.ts`
ውስጥ ይከናወናል። `OMNIROUTE_MCP_ENFORCE_SCOPES=true` ካልሆነ በስተቀር እንደጠፋ ይቆያል።

### የAccess-token ፈቃድ ወሰኖች

በ`oma_live_…` token-ዎች ላይ `read` / `write` / `admin`፣ በ`scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) ደረጃ የተሰጣቸው። ይህ ደረጃ የሚሠራው ለaccess-token
credential ብቻ ነው። [የአስተዳደር ማረጋገጫ](../guides/MANAGEMENT-AUTH.md)ን ይመልከቱ።

## ማረጋገጫ ያስፈልጋል መቀያየር

`isAuthRequired()` በ `src/shared/utils/apiAuth.ts` ይወስናል** ማንኛውም** auth ለጥያቄ ተፈጻሚ ነው፡-

- `settings.requireLogin === false` → auth በአለምአቀፍ ደረጃ የአካል ጉዳተኛ ነው፣ ሁልጊዜ ከሚጠበቀው ደረጃ ( [የመስመሩን ደረጃ](../security/ROUTE_GUARD_TIERS.md) ይመልከቱ) እና የሚቀበላቸው የምስክር ወረቀት ከሚሰጡ ጥሪዎች በስተቀር፣ ከመግባት ጋር አንድ አይነት ምስክርነት የሚያስፈልጋቸው፡ የማመሳሰል ቶከኖችን መስጠት፣ በማንኛውም ወሰን CLI መዳረሻ ማስመሰያዎችን ማውጣት እና API ቁልፍን መፍጠር፣ `manage`/`admin` scope ማድረግ ወይም scope/zq ቁልፍ መፍጠር እንደዚህ አይነት ቁልፍ እንደገና ማመንጨት ወይም መግለጥ (`requireCredentialForManagementScopedKey()` in `src/lib/api/requireManagementAuth.ts`). የማጣቀሻ-ብቻ ቁልፎች ክፍት እንደሆኑ ይቆያሉ። የተጠበቀ የባህሪ ባንዲራ (`REQUIRE_API_KEY`፣ ሌሎች የደህንነት ባንዲራዎች፣ እና SSRF / TLS /MCP-scope/ Sandbox ባንዲራዎችን [በባህሪ ባንዲራዎች](../reference/FEATURE_FLAGS.md#rest-api) ) መፃፍ እና የ PII መሸፈኛ መቼቶችን ማስቀመጥ (`PUT /api/settings/pii`) እንዲሁም ምስክርነት እንደሚያስፈልገው ይቀጥላል።
- ምንም የይለፍ ቃል አልተዋቀረም።** እና** no `INITIAL_PASSWORD` env var → bootstrap ሁነታ የመሳፈሪያ አዋቂውን እና የመልስ ጥያቄዎችን ይፈቅዳል፣ነገር ግን የተጋለጡ የአውታረ መረብ ጥያቄዎች አሁንም ምስክርነቶች ያስፈልጋቸዋል። ልዩ፡ የተጠበቀ የባህሪ ባንዲራ መጻፍ እና የ PII መሸፈኛ ቅንጅቶችን ማስቀመጥ (`PUT /api/settings/pii`) ከ loopback እንኳን ማረጋገጫ ያስፈልገዋል፣ ስለዚህ loopback በራሱ በቂ አይደለም።
- ማንኛውም DB ስህተት → አልተሳካም ተዘግቷል (ደህንነቱ የተጠበቀ በነባሪ)።

የደንበኛ API ቁልፍ ማስፈጸሚያ `isRequireApiKeyEnabled()` በ `src/shared/utils/featureFlags.ts` ይጠቀማል እንጂ በቀጥታ `process.env.REQUIRE_API_KEY` ንባብ አይደለም። ይህ ለተሰማሩ ጉዳዮች አስፈላጊ ነው፡ በዳሽቦርድ → ባህሪ ባንዲራዎች `REQUIRE_API_KEY` DB መሻርን ያከማቻል እና ወዲያውኑ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` እና ሌሎች ይህን ረዳት የሚጋሩ የደንበኛ-ኤፒአይ ማረጋገጫ ፍተሻዎችን ይነካል። የባህሪ ባንዲራ ማከማቻው ማንበብ ካልተቻለ ደንበኛ API auth ተዘግቷል እና ቁልፍ ያስፈልገዋል።

## ተኳሃኝነትን የሚያፈርስ ለውጥ — v3.8.0

የ`/api/v1/agents/tasks/*` እና `/api/resilience/model-cooldowns` መጨረሻ ነጥቦች **አሁን የአስተዳደር ማረጋገጫ ይፈልጋሉ** (commit `588a0333`)። ከዚህ በፊት የ`manage` ወሰን የሌለውን መደበኛ API ቁልፍ ይልኩ የነበሩ ደንበኞች `403` ይቀበላሉ። ፍልሰት፦ በAPI Keys dashboard ውስጥ ለቁልፉ የ`manage` ወሰንን ይስጡ፣ ወይም የገቡበትን dashboard ክፍለ ጊዜ ይጠቀሙ።

## የባህሪ ለውጥ — v3.8.2

`/api/mcp/*` (የርቀት MCP አገልጋዩ) አሁንም በነባሪ LOCAL_ONLY ነው፤ ሆኖም የ`Authorization: Bearer <api-key>` ራስጌው የ`manage` ወሰንን ሲይዝ አሁን loopback ያልሆኑ ጥያቄዎችን ይቀበላል። ይህ ልዩ ማስቀረት በ`src/server/authz/routeGuard.ts` ውስጥ ባለው `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` በኩል ለእያንዳንዱ ዱካ በግልጽ ሁኔታ የሚቆጣጠር ነው፤ የወንድም LOCAL_ONLY ቅድመ ቅጥያ `/api/cli-tools/runtime/*` ማናቸውንም ንዑስ ሂደቶች ሊያስነሳ ስለሚችል ሆን ተብሎ ሊታለፍ የማይችል ተደርጓል። loopback ካልሆነ ምንጭ ወደ `/api/mcp/*` የሚላኩ ስም-አልባ ጥያቄዎች `403 LOCAL_ONLY`ን መመለሳቸውን ይቀጥላሉ — ለማንኛውም አዲስ LOCAL_ONLY ዱካ ነባሪው ጥብቅ-loopback ሆኖ ይቀጥላል። [የRoute Guard ደረጃዎች](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)ን ይመልከቱ።

## ሙከራ

- የክፍል ሙከራዎች፦ `tests/unit/authz/` — `classify.test.ts`፣ `pipeline.test.ts`፣ `client-api-policy.test.ts`፣ `management-policy.test.ts`፣ `public-policy.test.ts`።
- የሕዝብ ፍቃድ ዝርዝር፦ `tests/unit/public-api-routes.test.ts`።
- ያተኮረ ሙከራን ያሂዱ፦ `node --import tsx/esm --test tests/unit/authz/classify.test.ts`።

## ማረም

ቧንቧው ሁል ጊዜ ምላሾችን በሚከተሉት ምልክቶች ያስቀምጣል።

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ለተረጋገጡ ጥያቄዎች የላይ (ከአስተዳዳሪ-ጎን) የጥያቄ ራስጌዎች በተጨማሪ ያካትታሉ፡

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

`assertAuth(req, expectedClass)` ከውስጥ ተቆጣጣሪዎች ይጠቀሙ — መካከለኛው ዌር ከተታለፈ `AuthzAssertionError` በኮድ `AUTHZ_NOT_INITIALIZED` ይጥላል (በሙከራዎች ውስጥ የውቅር ለውጦችን ለመያዝ ይጠቅማል)።

## በተጨማሪ ይመልከቱ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ለእያንዳንዱ endpoint የauth ምልክት
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ለauth ክስተቶች የኦዲት መዝገብ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — ሦስት የscope namespace እና የMCP tool-scope ካታሎግ
- ምንጭ፦ `src/server/authz/`፣ `src/lib/api/requireManagementAuth.ts`
