# CORS Configuration & Security (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute જે નિયંત્રિત કરે છે**બ્રાઉઝરની ઉત્પત્તિ** એકલ, કેન્દ્રિય મંજૂરી સૂચિમાંથી ક્રોસ-ઓરિજિન જવાબો વાંચી શકે છે. મોડેલ છે**ડિફૉલ્ટ રૂપે નિષ્ફળ-બંધ** : જ્યાં સુધી તમે એક પસંદ ન કરો ત્યાં સુધી કોઈ મૂળને મંજૂરી આપવામાં આવતી નથી. આ પૃષ્ઠ દસ્તાવેજ કેવી રીતે મંજૂરી આપે છે, `CORS_ALLOW_ALL=true` ખરેખર શું પ્રગટ કરે છે (અને, અગત્યનું, તે શું કરે છે**નથી** ), dev vs પ્રોડક્શનને સુરક્ષિત રીતે કેવી રીતે ગોઠવવું અને વાઇલ્ડકાર્ડ લાઇવ હોય ત્યારે ડેશબોર્ડની રનટાઈમ ચેતવણી બતાવે છે.

**સત્યનો સ્ત્રોત:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). મંજૂર સૂચિ એકવાર લાગુ કરવામાં આવે છે, મિડલવેરમાં (`src/server/authz/pipeline.ts`) — પ્રતિ-રૂટ હેન્ડલર્સ પોતે `Access-Control-Allow-Origin` સેટ કરતા નથી.

## મૂળ કેવી રીતે ઉકેલાય છે

દરેક વિનંતી માટે મિડલવેર આ ક્રમમાં `Access-Control-Allow-Origin` મૂલ્યની ગણતરી કરે છે:

1. **`CORS_ALLOW_ALL=true`** (અથવા લેગસી `CORS_ORIGIN=*`) → કોલરના `Origin` બેકને ઇકો કરે છે (અથવા `Origin` હેડર ન હોય ત્યારે `*` ), `Vary: Origin` સાથે જેથી કૅશ યોગ્ય રહે. સમાન `applyCorsHeaders()` ચોકપોઈન્ટ ટોકન-પ્રમાણિત `/v1*`/`/v1beta*` સપાટી (`relaxForTokenAuth`, RFC 9110 §12.5.5, અંક #6737) પરના દરેક 2xx-સાથે-બોડી પ્રતિસાદમાં `Vary: Accept-Encoding` પણ જોડે છે, જેથી downstream/shared કેશ સંકુચિત વિ અનકમ્પ્રેસ્ડ વેરિયન્ટ્સને યોગ્ય રીતે અલગ કરી શકે છે.
2. નહિંતર, વિનંતી `Origin` નોર્મલાઇઝ્ડ (લોઅર-કેસ, ટ્રેલિંગ સ્લેશ સ્ટ્રીપ્ડ) અને તેની સામે મેળ ખાતી**મર્જ કરેલ મંજૂર સૂચિ** :
   - env **`CORS_ALLOWED_ORIGINS`** — અલ્પવિરામથી અલગ કરેલી સૂચિ, અને
   - રનટાઇમ **`corsOrigins`** સેટિંગ (ડૅશબોર્ડ → સુરક્ષા → _CORS Allowed Origins_), `src/lib/config/runtimeSettings.ts` થી `setRuntimeAllowedOrigins()` મારફતે ઇન્જેક્ટ કરવામાં આવે છે.
3. કોઈ મેળ → નથી**કોઈ `Access-Control-Allow-Origin` હેડર ઉત્સર્જિત નથી** . બ્રાઉઝર ક્રોસ-ઓરિજિન રીડને અવરોધે છે. આ ઇચ્છિત નિષ્ફળ-બંધ ડિફોલ્ટ છે.

| Env var                | અર્થ                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | પરવાનગી આપવા માટે ચોક્કસ મૂળનાCSV (ભલામણ કરેલ).                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → કોઈપણ મૂળ (વાઇલ્ડકાર્ડ) ઇકો. દેવ માત્ર.                                 |
| `CORS_ORIGIN`          | વારસો. `*` `CORS_ALLOW_ALL` જેવું વર્તે છે; મંજૂર સૂચિમાં એક મૂલ્ય ઉમેરવામાં આવે છે. |

## જોખમ મોડેલ — શું `CORS_ALLOW_ALL=true` ખરેખર છતી કરે છે

સામાન્ય OWASP ચેતવણી ("વાઇલ્ડકાર્ડ CORS = કોઈપણ સાઇટ તમારા API કૉલ કરી શકે છે") ગંભીરતાથી લેવા યોગ્ય છે, પરંતુ OmniRoute નું એક્સપોઝર **સામાન્ય કેસ કરતાં સાંકડો** , એક નક્કર અમલીકરણ હકીકતને કારણે:

> **કેન્દ્રીય `applyCorsHeaders()` ક્યારેય `Access-Control-Allow-Credentials` ઉત્સર્જન કરતું નથી.** જ્યાં સુધી સર્વર `Access-Control-Allow-Credentials: true` મોકલે નહીં ત્યાં સુધી બ્રાઉઝર _credentialed_ (કૂકી-બેરિંગ) ક્રોસ-ઓરિજિન રિસ્પોન્સ એક્સપોઝ કરશે નહીં. OmniRoute નો વહેંચાયેલ CORS પાથ ક્યારેય કરતો નથી.

`CORS_ALLOW_ALL=true` સાથે પણ સપાટી દીઠ તેનો અર્થ શું છે:

| સપાટી                                         | ઓથ મિકેનિઝમ             | વાઇલ્ડકાર્ડ CORS ની અસર                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ડેશબોર્ડ / MANAGEMENT `/api/*`                | કૂકી સત્ર               | મૂળ પડઘો છે, પરંતુ**`Allow-Credentials` વગર** બ્રાઉઝર **બ્લોક્સ** પ્રમાણિત વાંચન. દૂષિત ક્રોસ-ઓરિજિન સાઇટ **વાંચી શકતા નથી** તમારા અધિકૃત ડેશબોર્ડ પ્રતિસાદો, અને સત્ર કૂકી ખુલ્લી નથી.                                                                                                                                                                                                                                                                                                                |
| ક્લાયન્ટ API `/v1/*`, `/v1beta/*`             | બેરર / `x-api-key` હેડર | પહેલેથી જ પરવાનગી છે**ડિઝાઇન દ્વારા** (`relaxForTokenAuth`): બ્રાઉઝર્સ ક્યારેય `Authorization`/`x-api-key` ને સ્વતઃ-જોડાતા નથી, તેથી હુમલાખોરનું પૃષ્ઠ તમારી કી સપ્લાય કરી શકતું નથી. રિલેક્સ્ડ ઇકો માટે પ્રમાણિત વિષયની જરૂર છે (એક માન્ય API કી અથવા ડેશબોર્ડ સત્ર), માત્ર ઓળખપત્ર હેડર જ નહીં, અને તેમાં ક્યારેય `Access-Control-Allow-Credentials` સમાવેશ થતો નથી. અનામી પ્રતિસાદો (`REQUIRE_API_KEY=false`) સ્પષ્ટ `CORS_ALLOW_ALL=true` ઑપ્ટ-ઇન સહિત રૂપરેખાંકિત મૂળ મંજૂરી સૂચિનો ઉપયોગ કરે છે. |
| ફક્ત સાર્વજનિક વાંચવા માટે (`/api/health`, …) | કોઈ નહિ                 | બિન-સંવેદનશીલ; વાઇલ્ડકાર્ડ હાનિકારક છે.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

તેથી ધ **શેષ** `CORS_ALLOW_ALL=true` નું એક્સપોઝર આના સુધી મર્યાદિત છે: (a) બિન-પ્રમાણપત્રિત ક્રોસ-ઓરિજિન **વાંચે છે** પહેલેથી-અપ્રમાણિત ડેટાનો, અને (b) CORS ને ભાડું**પ્રીફ્લાઇટ પાસ** મેનેજમેન્ટ રૂટ — પર કે જેને હજી પણ પ્રમાણીકરણની જરૂર છે જે ક્રોસ-ઓરિજિન પેજ પ્રદાન કરી શકતું નથી. તે છે**નથી** શેર કરેલ CORS પાથ પર સત્ર-હાઇજેક અથવા ઓળખપત્ર-ચોરી વેક્ટર.

### એક વાસ્તવિક અપવાદ — `/api/v1/agents/`

ક્લાઉડ-એજન્ટ રૂટ્સ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) તેમના સેટ કરે છે**પોતાના** CORS હેડરો (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) અને**કરવું** `Access-Control-Allow-Credentials: true` સાથે મળીને `Access-Control-Allow-Origin: <origin>|*` બહાર કાઢો. આ એક જ સપાટી છે જ્યાં મૂળ-ઇકો અને ઓળખપત્રો એક સાથે રહે છે, અને તે છે**`CORS_ALLOW_ALL` થી સ્વતંત્ર** . આ માર્ગો મેનેજમેન્ટ-ઓથેન્ટિકેટેડ છે (`requireManagementAuth`); ઓપરેટરો કે જેઓ ડેશબોર્ડ ઓફ-હોસ્ટને ઉજાગર કરે છે તેઓએ ધ્યાન રાખવું જોઈએ કે પ્રતિભાવ હેડરો દ્વારા ક્રોસ-ઓરિજિન ઓળખપત્ર વાંચવાની આ એક જગ્યા છે. તેને સ્પષ્ટ અનુમતિસૂચિમાં સજ્જડ કરવાનું આ CORS માર્ગદર્શનથી અલગથી ટ્રૅક કરવામાં આવે છે.

## ઉત્પાદન ચેકલિસ્ટ

- **ઉત્પાદનમાં ક્યારેય `CORS_ALLOW_ALL=true` સેટ કરશો નહીં.** તેને સેટ કર્યા વિના રહેવા દો.
- સેટ કરો**સ્પષ્ટ** મૂળ સૂચિ — ક્યાં તો env var અથવા સુરક્ષા-ટેબ ફીલ્ડ:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- જો OmniRoute રિવર્સ પ્રોક્સી / ટનલ (nginx, Caddy, Cloudflare ટનલ, Tailscale) પાછળ ચાલે છે, તો CORS છે**નથી** તમારું એકમાત્ર નિયંત્રણ — લૂપબેક રૂટ ગાર્ડ હજુ પણ સ્પાન-સક્ષમ રૂટ્સનું રક્ષણ કરે છે (જુઓ [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). 403 ને "ફિક્સ" કરવા માટે `X-Forwarded-For: 127.0.0.1` બનાવશો નહીં; જે રૂટ ગાર્ડ બંધ થાય છે તે RCE વર્ગને ફરીથી ખોલે છે.
- રનટાઇમ સ્થિતિની પુષ્ટિ કરો: ડેશબોર્ડ એ બતાવે છે**સતત એમ્બર બેનર** જ્યારે પણ `CORS_ALLOW_ALL=true` લાઇવ હોય ત્યારે ડેશબોર્ડ → સુરક્ષા → અધિકૃતતા ઇન્વેન્ટરી હેઠળ, અને `/api/settings/authz-inventory` એક `cors: { allowAll, allowedOrigins }` એન્વલપ મોનિટરિંગ ટૂલ્સ મતદાન કરી શકે છે.

## વિકાસની સગવડ — ચોક્કસ સ્થાનિક મૂળને મંજૂરી આપે છે

તમને દેવમાં પણ ભાગ્યે જ વાઇલ્ડકાર્ડની જરૂર પડે છે. તમે ઉપયોગ કરો છો તે જ ડેવ સર્વર્સને મંજૂરી આપો:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

પાછળના સ્લેશની અવગણના સાથે મૂળ કેસ-અસંવેદનશીલ રીતે મેળ ખાય છે, તેથી `http://localhost:3000` અને `http://localhost:3000/` સમકક્ષ છે. સમાન CSV રનટાઈમ માં સેટ કરી શકાય છે**ડેશબોર્ડ → સુરક્ષા → CORS મંજૂર મૂળ** પુનઃપ્રારંભ કર્યા વિના.

## API કી વિ કુકી સત્રો

- **બેરર / `x-api-key` ( `/v1/*` અનુમાન સપાટી):** બ્રાઉઝર્સ આને આપમેળે ક્યારેય જોડતા નથી. CORS અહીં અર્થપૂર્ણ અવરોધ નથી — API કી એ અવરોધ — છે જેના કારણે તે સપાટી ઇરાદાપૂર્વક પરવાનગી આપે છે જેથી બ્રાઉઝર અને Electron ક્લાયંટ તેઓ પહેલેથી જ હકદાર હોય તેવા પ્રતિભાવો વાંચી શકે. રિલેક્સ્ડ ઇકો માટે પ્રમાણિત વિષયની જરૂર છે (એક માન્ય API કી અથવા ડેશબોર્ડ સત્ર), માત્ર ઓળખપત્ર હેડર જ નહીં, અને તેમાં ક્યારેય `Access-Control-Allow-Credentials` શામેલ નથી. અનામિક પ્રતિસાદો (`REQUIRE_API_KEY=false`) સ્પષ્ટ `CORS_ALLOW_ALL=true` ઑપ્ટ-ઇન સહિત, રૂપરેખાંકિત મૂળ મંજૂરી સૂચિનો ઉપયોગ કરે છે. ઓથ રિજેક્શન્સ (401) વાંચવા યોગ્ય રહે છે જેથી ક્લાયન્ટ્સ રદ કરેલી અથવા ખોટી ટાઇપ કરેલી કી (#5242) સપાટી પર લાવી શકે: પાઇપલાઇનનું પોતાનું 401 ઇકો રાખે છે, અને એક રૂટ કે જે પાઇપલાઇન દ્વારા અનામી તરીકે સેવા આપ્યા પછી કીને જ નકારે છે (`/v1/models` અને `/v1beta/models` મેનેજમેન્ટ ઓથ રૂપરેખાંકિત સાથે, માલિક-સ્કોપવાળા `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` અને ઉમેદવાર રૂટ્સ) `credentialRejectionHeaders()` દ્વારા તે 401 માં ઇકો ઉમેરે છે. પ્રમાણપત્ર હેડર (`Authorization`, `x-api-key`, `x-goog-api-key` અથવા `auth_token` કૂકી) વહન કરતી વિનંતી પર ઇકો કી કરવામાં આવે છે, તેમાંથી કયા રૂટ પર તપાસ કરવામાં આવી નથી, અને `Access-Control-Allow-Credentials` સાથે ક્યારેય જોડવામાં આવતી નથી; શરીર એક નિશ્ચિત ભૂલ પરબિડીયું છે. `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) દ્વારા રક્ષિત `/api/v1/` હેઠળના વ્યવસ્થાપન માર્ગો આ ઓળખપત્ર-અસ્વીકાર અપવાદનો ઉપયોગ કરતા નથી: `REQUIRE_API_KEY=false` સાથે, તેમના 401/403 પ્રતિસાદો રૂપરેખાંકિત CORS મૂળ નીતિને અનુસરે છે.
- **કૂકી સત્ર (ડેશબોર્ડ):** નિષ્ફળ-બંધ ડિફોલ્ટ દ્વારા સુરક્ષિત **અને** વહેંચાયેલ પાથ પર `Access-Control-Allow-Credentials` ની ગેરહાજરી દ્વારા. management/dashboard ઓરિજિન્સને કોઈપણ અનુમતિરૂપ રૂપરેખામાંથી બહાર રાખો; તેઓ બરાબર નિષ્ફળ-બંધ રહેવું જોઈએ.

## WebSocket હેન્ડશેક્સ (`/v1/responses`, `/v1/ws`)

બ્રાઉઝર્સ WebSocket પર CORS લાગુ કરતા નથી, તેથી WebSocket ટ્રાન્સપોર્ટ કે જે અનુમાન આઉટપુટ પરત કરે છે તે હેન્ડશેક `Origin` (`src/server/origin/wsOrigin.ts`): પ્રતિભાવ WebSocket (`/v1/responses`) અને જ્યારે OmniRoute `npm start` / `npm run dev`, `/v1/ws` અને `/api/v1/ws` બ્રિજમાંથી પસાર થાય છે, જે `/v1/chat/completions`, `/v1/messages` અને `/v1/responses` ને ફ્રેમ તરીકે સ્ટ્રીમ કરે છે. બ્રિજ `/api/v1/ws?handshake=1` ચુકાદા માટે પૂછે છે અને જ્યાં સુધી તે માર્ગ ચેક ન કરે ત્યાં સુધી અપગ્રેડ કરવાનો ઇનકાર કરે છે. પ્રમાણીકરણ આવશ્યકતાઓ હજુ પણ અલગથી લાગુ પડે છે. મૂળ તપાસ ત્યારે પસાર થાય છે જ્યારે:

- તેમાં કોઈ `Origin` હેડર નથી (Codex CLI, SDKs અને અન્ય નોન-બ્રાઉઝર ક્લાયન્ટ્સ);
- `Origin` ઉપરની મંજૂર સૂચિ દ્વારા સ્વીકારવામાં આવે છે (`CORS_ALLOWED_ORIGINS`, `corsOrigins` સેટિંગ, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` એ OmniRoute ના પોતાના સાર્વજનિક મૂળમાંથી એક છે (રૂપરેખાંકિત જાહેર આધાર URL, વિશ્વસનીય પ્રોક્સીનું ફોરવર્ડ મૂળ, અથવા IP શાબ્દિક અથવા `localhost` — તરીકે આપવામાં આવેલ ડાયરેક્ટ loopback/LAN હોસ્ટ જે ડેશબોર્ડ મ્યુટેશન ચેકનો ઉપયોગ કરે છે તે જ ઉમેદવારો); અથવા
- તે HTTP `/v1/*` સપાટીની જેમ માન્ય API કી ધરાવે છે.

બીજું કંઈપણ `403 ws_origin_forbidden` મેળવે છે. ડેશબોર્ડ સત્ર કૂકી વિદેશી `Origin` મુક્તિ આપતી નથી, કારણ કે બ્રાઉઝર તેને કોઈપણ પૃષ્ઠના સોકેટ સાથે જોડે છે. અન્ય પોર્ટ પરના `localhost` સમાન મૂળ તરીકે ગણવામાં આવતું નથી; `CORS_ALLOWED_ORIGINS` માં આવા ડેવ ઓરિજિન્સ ઉમેરો.

## ઉદાહરણ: OmniRoute ની સામે રિવર્સ પ્રોક્સી

CORS OmniRoute દ્વારા જ લાગુ કરવામાં આવે છે, તેથી પ્રોક્સી સામાન્ય રીતે હોવી જોઈએ **નથી** `Access-Control-*` હેડરો ઉમેરો અથવા ફરીથી લખો (ડબલ હેડર બ્રેક બ્રાઉઝર). TLS સમાપ્ત કરો અને — આગળ ધપાવો OmniRoute પ્રીફ્લાઇટનો જવાબ આપો:

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

OmniRoute (`CORS_ALLOWED_ORIGINS` અથવા સુરક્ષા ટૅબ) માં માન્ય બ્રાઉઝર મૂળ સેટ કરો, પ્રોક્સીમાં નહીં.

## સ્રોત ફાઇલો

| ચિંતા                                | ફાઈલ                                                                 |
| ------------------------------------ | -------------------------------------------------------------------- |
| મંજૂર રીઝોલ્યુશન + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| મિડલવેર એપ્લિકેશન (સત્યનો એક સ્રોત)  | `src/server/authz/pipeline.ts`                                       |
| સેટિંગ્સ → રનટાઇમ મૂળ ઇન્જેક્શન      | `src/lib/config/runtimeSettings.ts`                                  |
| ડેશબોર્ડ માટે રનટાઇમ સ્થિતિ          | `src/app/api/settings/authz-inventory/route.ts`                      |
| ડેશબોર્ડ ચેતવણી બેનર                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS મંજૂર ઓરિજિન્સ ફીલ્ડ            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| ક્લાઉડ-એજન્ટ પ્રતિ-રૂટ CORS (અપવાદ)  | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket હેન્ડશેક `Origin` ચેક      | `src/server/origin/wsOrigin.ts`                                      |

## પણ જુઓ

- સ્પૉન-સક્ષમ માર્ગો માટે [રૂટ ગાર્ડ ટિયર્સ](./ROUTE_GUARD_TIERS.md) — લૂપબેક અમલીકરણ (એક અલગ, પૂરક નિયંત્રણ).
- [અધિકૃતતા માર્ગદર્શિકા](../architecture/AUTHZ_GUIDE.md) — સંપૂર્ણ પ્રમાણીકરણ પાઇપલાઇન.
