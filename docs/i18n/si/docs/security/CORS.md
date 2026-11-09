# CORS Configuration & Security (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute කුමන පාලනය කරයි**බ්රවුසරයේ සම්භවය** තනි, මධ්‍යගත අවසර ලැයිස්තුවකින් හරස් සම්භව ප්‍රතිචාර කියවිය හැක. ආකෘතිය වේ**පෙරනිමියෙන් fail-closed** : ඔබ එකක් තෝරා ගන්නා තෙක් කිසිදු සම්භවයක් ඉඩ නොදේ. මෙම පිටුව අවසර ලැයිස්තුව විසඳන ආකාරය, `CORS_ALLOW_ALL=true` ඇත්ත වශයෙන්ම හෙළි කරන දේ (සහ, වැදගත් ලෙස, එය කරන්නේ කුමක්ද යන්න ලේඛනගත කරයි.**නැත** ), dev vs නිෂ්පාදනය ආරක්ෂිතව වින්‍යාස කරන්නේ කෙසේද, සහ Wildcard සජීවීව ඇති විට උපකරණ පුවරුවේ ධාවන කාල අනතුරු ඇඟවීම පෙන්වයි.

**සත්‍ය මූලාශ්‍රය:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). අවසර ලැයිස්තුව එක් වරක් යොදනු ලැබේ, මිඩ්ල්වෙයාර් (`src/server/authz/pipeline.ts`) — එක්-මාර්ග හසුරුවන්නන් `Access-Control-Allow-Origin` තමන් විසින්ම සකසා නැත.

## සම්භවයක් විසඳන ආකාරය

එක් එක් ඉල්ලීම සඳහා මිඩ්ල්වෙයාර් මෙම අනුපිළිවෙලෙහි `Access-Control-Allow-Origin` අගය ගණනය කරයි:

1. **`CORS_ALLOW_ALL=true`** (හෝ උරුමය `CORS_ORIGIN=*`) → ඇමතුම්කරුගේ `Origin` පසුපසට (හෝ `Origin` ශීර්ෂයක් නොමැති විට `*` ) `Vary: Origin` සමඟින් ප්‍රතිරාවය කරයි, එබැවින් හැඹිලි නිවැරදිව පවතී. එම `applyCorsHeaders()` චොක්පොයින්ට් ටෝකන්-සත්‍යාපිත `/v1*`/`/v1beta*` මතුපිට (`relaxForTokenAuth`, RFC 9110 §12.5.5, නිකුත් #6737) මත ඇති සෑම 2xx-ශරීර ප්‍රතිචාරයකටම `Vary: Accept-Encoding` එකතු කරයි, එබැවින් downstream/shared හැඹිලිවලට සම්පීඩිත විචල්‍ය එදිරිව uncompressed variants නිවැරදිව වෙන්කර හඳුනාගත හැක.
2. එසේ නොමැතිනම්, `Origin` ඉල්ලීම සාමාන්‍යකරණය කර (පහළ අසුරන ලද, පසුපස ස්ලැෂ් ඉවත් කර ඇත) සහ එයට එරෙහිව ගැලපේ**ඒකාබද්ධ අවසර ලැයිස්තුව** :
   - env **`CORS_ALLOWED_ORIGINS`** — කොමාවෙන් වෙන් කළ ලැයිස්තුව, සහ
   - ධාවන කාලය **`corsOrigins`** සැකසුම (උපකරණ පුවරුව → ආරක්‍ෂාව → _CORS අවසර ලත් මූලයන්_), `src/lib/config/runtimeSettings.ts` වෙතින් `setRuntimeAllowedOrigins()` හරහා එන්නත් කර ඇත.
3. → නොගැලපේ**`Access-Control-Allow-Origin` ශීර්ෂයක් නිකුත් නොවේ** . බ්‍රවුසරය හරස් සම්භවය කියවීම අවහිර කරයි. මෙය අපේක්ෂිත අසාර්ථක සංවෘත පෙරනිමියයි.

| Env var                | අර්ථය                                                                            |
| ---------------------- | -------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ඉඩ දීමට නිශ්චිත සම්භවයක් ඇතිCSV (නිර්දේශිත).                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → ඕනෑම සම්භවයක් (වයිල්ඩ්කාඩ්) දෝංකාර දෙයි. දේව් පමණි.                 |
| `CORS_ORIGIN`          | උරුමය. `*` හැසිරෙන්නේ `CORS_ALLOW_ALL` ලෙසය ; අවසර ලැයිස්තුවට තනි අගයක් එකතු වේ. |

## තර්ජන ආකෘතිය — `CORS_ALLOW_ALL=true` සැබවින්ම හෙළිදරව් කරන දේ

සාමාන්‍ය OWASP අනතුරු ඇඟවීම ("Wildcard CORS = ඕනෑම අඩවියකට ඔබගේ API ඇමතිය හැක") බැරෑරුම් ලෙස සැලකීම වටී, නමුත් OmniRoute හි නිරාවරණය **සාමාන්‍ය නඩුවට වඩා පටුය** , එක් නිශ්චිත ක්‍රියාත්මක කිරීමේ කරුණක් නිසා:

> **මධ්යම `applyCorsHeaders()` කිසි විටෙකත් `Access-Control-Allow-Credentials` විමෝචනය නොකරයි.** සේවාදායකය `Access-Control-Allow-Credentials: true` යවන්නේ නම් මිස බ්‍රවුසරයක් _credentialed_ (cookie-bearing) හරස් සම්භව ප්‍රතිචාරයක් හෙළි නොකරනු ඇත. OmniRoute හි බෙදාගත් CORS මාර්ගය කිසි විටෙකත් සිදු නොවේ.

`CORS_ALLOW_ALL=true` සමඟ පවා මතුපිටින් අදහස් කරන්නේ කුමක්ද:

| මතුපිට                                | සත්යාපන යාන්ත්රණය            | Wildcard CORS හි බලපෑම                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| උපකරණ පුවරුව / MANAGEMENT `/api/*`    | කුකී සැසිය                   | සම්භවය දෝංකාර දෙයි, නමුත්**`Allow-Credentials` නොමැතිව** බ්රවුසරය **කුට්ටි** අක්තපත්ර සහිත කියවීම. අනිෂ්ට හරස් සම්භවයක් ඇති අඩවියකි**කියවන්න බැහැ** ඔබගේ සත්‍යාපිත උපකරණ පුවරු ප්‍රතිචාර, සහ සැසි කුකිය නිරාවරණය නොවේ.                                                                                                                                                                                                                                                                                                                |
| සේවාලාභියා API `/v1/*`, `/v1beta/*`   | දරන්නා / `x-api-key` ශීර්ෂකය | දැනටමත් අවසර ඇත **නිර්මාණය මගින්** (`relaxForTokenAuth`): බ්‍රවුසර කිසි විටෙක ස්වයංක්‍රීයව `Authorization`/`x-api-key` අමුණන්නේ නැත, එබැවින් ප්‍රහාරක පිටුවකට ඔබේ යතුර සැපයිය නොහැක. ලිහිල් දෝංකාරය සඳහා සත්‍යාපනය කළ විෂයයක් (වලංගු කළ API යතුරක් හෝ උපකරණ පුවරු සැසියක්) අවශ්‍ය වේ, හුදෙක් අක්තපත්‍ර ශීර්ෂයක් පමණක් නොව, කිසි විටෙකත් `Access-Control-Allow-Credentials` ඇතුළත් නොවේ. නිර්නාමික ප්‍රතිචාර (`REQUIRE_API_KEY=false`) පැහැදිලි `CORS_ALLOW_ALL=true` තේරීමක් ඇතුළුව, වින්‍යාස කළ මූලාරම්භ අවසර ලැයිස්තුව භාවිතා කරයි. |
| පොදු කියවීමට පමණක් (`/api/health`, …) | කිසිවක් නැත                  | සංවේදී නොවන; Wildcard හානිකර නොවේ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

ඉතින් ද **අවශේෂ** `CORS_ALLOW_ALL=true` නිරාවරණය සීමා වන්නේ: (a) අක්තපත්‍ර රහිත හරස් සම්භවය **කියවයි** දැනටමත් සත්‍යාපනය නොකළ දත්ත, සහ (ආ) CORS වලට ඉඩ දීම **පෙර ගුවන් ගමන් බලපත්රය** කළමනාකරණ මාර්ගවල — තවමත් හරස් සම්භව පිටුවකට ලබා දිය නොහැකි සත්‍යාපනය අවශ්‍ය වේ. එය වේ**නැත** බෙදාගත් CORS මාර්ගයේ සැසි-කොල්ලයක් හෝ අක්තපත්‍ර-සොරකම් දෛශිකයක්.

### එක් අව්‍යාජ ව්‍යතිරේකයක් — `/api/v1/agents/`

ක්ලවුඩ්-ඒජන්ට් මාර්ග (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ඔවුන්ගේ ඒවා සකසා ඇත **තමන්ගේ** CORS ශීර්ෂ (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) සහ **කරන්න** `Access-Control-Allow-Credentials: true` සමඟ එක්ව `Access-Control-Allow-Origin: <origin>|*` විමෝචනය කරන්න. සම්භවය-ප්‍රතිරාවය සහ අක්තපත්‍ර සහජීවනය වන තනි පෘෂ්ඨය මෙයයි, එයයි**`CORS_ALLOW_ALL` වලින් ස්වාධීන** . මෙම මාර්ග කළමනාකරණය-සත්‍යාපනය කර ඇත (`requireManagementAuth`); ධාරකයෙන් පිටත උපකරණ පුවරුව නිරාවරණය කරන ක්‍රියාකරුවන්, ප්‍රතිචාර ශීර්ෂයන් මඟින් හරස් සම්භවයක් සහිත අක්තපත්‍ර සහිත කියවීමකට අවසර දී ඇති එකම ස්ථානය මෙය බව දැන සිටිය යුතුය. එය පැහැදිලි අවසර ලැයිස්තුවකට තද කිරීම මෙම CORS මාර්ගෝපදේශයෙන් වෙන වෙනම නිරීක්ෂණය කෙරේ.

## නිෂ්පාදන පිරික්සුම් ලැයිස්තුව

- **නිෂ්පාදනයේදී කිසි විටෙකත් `CORS_ALLOW_ALL=true` නොසකසන්න.** එය සකස් නොකර තබන්න.
- සකසන්න **පැහැදිලි** මූලාරම්භය ලැයිස්තුව — env var හෝ ආරක්ෂක-ටැබ් ක්ෂේත්‍රය:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ප්‍රතිලෝම ප්‍රොක්සි / උමගක් (nginx, Caddy, Cloudflare Tunnel, Tailscale) පිටුපසින් දුවන්නේ නම්, CORS යනු**නැත** ඔබගේ එකම පාලනය — loopback route guard තවමත් පැටවීමේ හැකියාව ඇති මාර්ග ආරක්ෂා කරයි ( [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) බලන්න). 403 "සවි කිරීමට" `X-Forwarded-For: 127.0.0.1` ව්‍යාජ ලෙස සකස් නොකරන්න; එය RCE පන්තිය නැවත විවෘත කරයි, මාර්ග ආරක්ෂකයා වසා දමයි.
- ධාවන කාල තත්ත්වය තහවුරු කරන්න: උපකරණ පුවරුව පෙන්වයි a **ස්ථීර ඇම්බර් බැනරය** උපකරණ පුවරුව යටතේ → ආරක්ෂක → බලය පැවරීමේ ඉන්වෙන්ටරි `CORS_ALLOW_ALL=true` සජීවීව ඇති සෑම විටම, සහ `/api/settings/authz-inventory` විසින් `cors: { allowAll, allowedOrigins }` ලියුම් කවරයක් අධීක්ෂණ මෙවලම් වෙත ඡන්ද විමසීමක් කළ හැක.

## සංවර්ධන පහසුව — විශේෂිත දේශීය සම්භවයක් ලබා දෙයි

dev හි පවා ඔබට Wildcard අවශ්‍ය වන්නේ කලාතුරකිනි. ඔබ භාවිතා කරන dev සේවාදායකයන්ට පමණක් ඉඩ දෙන්න:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

මූලාරම්භය නොසැලකිලිමත් වූ පසුගාමී ස්ලෑෂ් සමඟ කේස්-සංවේදි ලෙස ගැලපේ, එබැවින් `http://localhost:3000` සහ `http://localhost:3000/` සමාන වේ. එකම CSV ධාවන වේලාවේදී සැකසිය හැක **උපකරණ පුවරුව → ආරක්ෂාව → CORS අවසර ලත් මූලාරම්භය** නැවත ආරම්භ කිරීමකින් තොරව.

## API යතුරු එදිරිව කුකී සැසි

- **දරන්නා / `x-api-key` ( `/v1/*` අනුමාන මතුපිට):** බ්‍රව්සර් කිසිවිටෙක මේවා ස්වයංක්‍රීයව අමුණන්නේ නැත. CORS මෙහි අර්ථවත් බාධකයක් නොවේ — API යතුර — බාධකය වන අතර එම පෘෂ්ඨය හිතාමතාම අවසර දී ඇත, එබැවින් බ්‍රවුසරයට සහ Electron සේවාදායකයින්ට ඔවුන්ට දැනටමත් හිමි ප්‍රතිචාර කියවිය හැක. ලිහිල් දෝංකාරය සඳහා සත්‍යාපනය කළ විෂයයක් (වලංගු කළ API යතුරක් හෝ උපකරණ පුවරු සැසියක්) අවශ්‍ය වේ, හුදෙක් අක්තපත්‍ර ශීර්ෂයක් පමණක් නොව, කිසි විටෙක `Access-Control-Allow-Credentials` ඇතුළත් නොවේ. නිර්නාමික ප්‍රතිචාර (`REQUIRE_API_KEY=false`) පැහැදිලි `CORS_ALLOW_ALL=true` තේරීමක් ඇතුළුව, වින්‍යාස කළ මූලාරම්භ අවසර ලැයිස්තුව භාවිතා කරයි. සත්‍යාපන ප්‍රතික්ෂේප කිරීම් (401) කියවිය හැකි බැවින් සේවාලාභීන්ට අවලංගු කළ හෝ වැරදි ලෙස ටයිප් කළ යතුරක් (#5242): නල මාර්ගයේම 401 දෝංකාරය තබා ගනී, සහ නල මාර්ගය එය නිර්නාමික ලෙස සේවය කළ පසු යතුර ප්‍රතික්ෂේප කරන මාර්ගයක් (`/v1/models` සහ `/v1beta/models` සමඟ කළමනාකරණය auth වින්‍යාස කර, `/v1/files`, `/v1/batches`, `/v1/media` සමඟ auto-combo අපේක්ෂක මාර්ග) `/v1/session-leases` හරහා එම 401 වෙත `credentialRejectionHeaders()` එක් කරයි. අක්තපත්‍ර ශීර්ෂයක් (`Authorization`, `x-api-key`, `x-goog-api-key` හෝ `auth_token` කුකිය) රැගෙන යන ඉල්ලීම මත දෝංකාරය යතුරු කර ඇත, ඒවායින් කුමන මාර්ගය පරීක්ෂා කර ඇත්ද, `Access-Control-Allow-Credentials` සමඟ කිසිවිටෙක යුගල නොකෙරේ; ශරීරය ස්ථාවර දෝෂ සහිත ලියුම් කවරයකි. `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) මගින් ආරක්ෂා කරන ලද `/api/v1/` යටතේ කළමනාකරණ මාර්ග මෙම අක්තපත්‍ර-ප්‍රතික්ෂේප කිරීමේ ව්‍යතිරේකය භාවිතා නොකරයි: `REQUIRE_API_KEY=false` සමඟ, ඔවුන්ගේ 401/403 ප්‍රතිචාර වින්‍යාසගත CORS මූල ප්‍රතිපත්තිය අනුගමනය කරයි.
- **කුකී සැසිය (උපකරණ පුවරුව):** අසාර්ථක සංවෘත පෙරනිමියෙන් ආරක්ෂා කර ඇත **සහ** හවුල් මාවතේ `Access-Control-Allow-Credentials` නොමැති වීමෙන්. management/dashboard මූලාරම්භය ඕනෑම අවසර ලත් වින්‍යාසයකින් බැහැර කරන්න; ඔවුන් හරියටම අසාර්ථක විය යුතුය.

## WebSocket අතට අත දීම (`/v1/responses`, `/v1/ws`)

බ්‍රවුසර WebSocket වෙත CORS යොදන්නේ නැත, එබැවින් අනුමාන ප්‍රතිදානය ආපසු ලබා දෙන WebSocket ප්‍රවාහනය `Origin` අතට අත දීම පරීක්ෂා කරයි (`src/server/origin/wsOrigin.ts`): ප්‍රතිචාර WebSocket (`/v1/responses`) සහ OmniRoute `npm start` / `npm run dev` හරහා දිවෙන විට `/v1/ws` සහ `/api/v1/ws` පාලම, `/v1/chat/completions`, `/v1/messages` සහ `/v1/responses` ලෙස ප්‍රවාහ වන විට. පාලම `/api/v1/ws?handshake=1` වෙතින් තීන්දුව ඉල්ලා සිටින අතර එම මාර්ගය චෙක්පත ක්‍රියාත්මක නොකළහොත් යාවත්කාලීන කිරීම ප්‍රතික්ෂේප කරයි. සත්‍යාපන අවශ්‍යතා තවමත් වෙන වෙනම අදාළ වේ. මූලාරම්භය පරීක්ෂා කිරීම සිදු වන්නේ:

- එයට `Origin` ශීර්ෂයක් නොමැත (Codex CLI, SDKs සහ අනෙකුත් බ්‍රවුසර් නොවන සේවාලාභීන්);
- `Origin` ඉහත අවසර ලැයිස්තුව මගින් පිළිගනු ලැබේ (`CORS_ALLOWED_ORIGINS`, `corsOrigins` සැකසුම, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` යනු OmniRoute ගේම පොදු මූලාරම්භයන්ගෙන් එකකි (වින්‍යාස කරන ලද පොදු පදනම URL, විශ්වාසදායී ප්‍රොක්සියේ යොමු කරන ලද සම්භවය, හෝ IP වචනාර්ථයෙන් හෝ `localhost` — ලෙස ලබා දී ඇති සෘජු loopback/LAN ධාරකයක් උපකරණ පුවරුවේ විකෘති පිරික්සුම භාවිතා කරයි); හෝ
- එය HTTP `/v1/*` මතුපිට මෙන් වලංගු API යතුරක් දරයි.

වෙනත් ඕනෑම දෙයකට `403 ws_origin_forbidden` ලැබේ. උපකරණ පුවරු සැසි කුකියක් විදේශීය `Origin` නිදහස් නොකරයි, මන්ද බ්‍රවුසරය එය ඕනෑම පිටුවක සොකට් එකකට අමුණයි. වෙනත් වරායක `localhost` එකම සම්භවයක් ලෙස නොසලකයි; එවැනි dev මූලාරම්භයන් `CORS_ALLOWED_ORIGINS` වෙත එක් කරන්න.

## උදාහරණය: OmniRoute ඉදිරිපිට ප්‍රතිලෝම ප්‍රොක්සි

CORS බලාත්මක කරන්නේ OmniRoute විසින්මය, එබැවින් ප්‍රොක්සි සාමාන්‍යයෙන් කළ යුතුය **නැත** `Access-Control-*` ශීර්ෂ එකතු කිරීම හෝ නැවත ලියන්න (ද්විත්ව ශීර්ෂ බ්‍රව්සර් බිඳ දමන්න). TLS අවසන් කර — ඉදිරියට ගෙන යාමට OmniRoute පෙර පියාසැරියට පිළිතුරු දීමට ඉඩ දෙන්න:

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

අවසර ලත් බ්‍රවුසර මූලාරම්භය ප්‍රොක්සියේ නොව OmniRoute (`CORS_ALLOWED_ORIGINS` හෝ ආරක්ෂක පටිත්තෙහි) සකසන්න.

## මූලාශ්ර ගොනු

| කනස්සල්ල                                    | ගොනුව                                                                |
| ------------------------------------------- | -------------------------------------------------------------------- |
| + `getCorsStatus()` විභේදනය සඳහා අවසර දෙන්න | `src/server/cors/origins.ts`                                         |
| Middleware යෙදුම (සත්‍යයේ තනි මූලාශ්‍රය)    | `src/server/authz/pipeline.ts`                                       |
| සැකසුම් → ධාවන කාල සම්භවය එන්නත් කිරීම      | `src/lib/config/runtimeSettings.ts`                                  |
| උපකරණ පුවරුව සඳහා ධාවන කාල තත්ත්වය          | `src/app/api/settings/authz-inventory/route.ts`                      |
| උපකරණ පුවරු අනතුරු ඇඟවීමේ බැනරය             | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS අවසර ලත් මූලයන් ක්ෂේත්‍රය              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent per-route CORS (ව්‍යතිරේකය)     | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket අතට අත දීම `Origin` චෙක්පත        | `src/server/origin/wsOrigin.ts`                                      |

## මේකත් බලන්න

- පැටවීමේ හැකියාව ඇති මාර්ග සඳහා [මාර්ග ආරක්ෂක ස්ථර](./ROUTE_GUARD_TIERS.md) — ලූප්බැක් බලාත්මක කිරීම (වෙනම, අනුපූරක පාලනයක්).
- [බලය පැවරීමේ මාර්ගෝපදේශය](../architecture/AUTHZ_GUIDE.md) — සම්පූර්ණ සත්‍යාපන නල මාර්ගය.
