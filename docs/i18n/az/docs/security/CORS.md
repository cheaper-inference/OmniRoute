# CORS Configuration & Security (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute hansıya nəzarət edir **brauzerin mənşəyi** vahid, mərkəzləşdirilmiş icazə siyahısından mənşəli cavabları oxuya bilər. Modeldir **default olaraq uğursuz bağlanır** : siz daxil olana qədər heç bir mənşəyə icazə verilmir. Bu səhifə icazəli siyahının necə həll edildiyini, `CORS_ALLOW_ALL=true` əslində nəyi ifşa etdiyini (və ən əsası, nə etdiyini) sənədləşdirir.**yox** ), dev vs istehsalı təhlükəsiz şəkildə necə konfiqurasiya etmək olar və tablosuna xəbərdarlıq edən iş vaxtı joker simvolun canlı olduğu zaman göstərir.

**Həqiqətin mənbəyi:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). İcazə siyahısı bir dəfə tətbiq edilir, ara proqramda (`src/server/authz/pipeline.ts`) — hər marşrut üzrə işləyicilər `Access-Control-Allow-Origin` özləri təyin etmirlər.

## Mənşəyi necə həll edir

Hər bir sorğu üçün ara proqram `Access-Control-Allow-Origin` dəyərini bu ardıcıllıqla hesablayır:

1. **`CORS_ALLOW_ALL=true`** (və ya köhnə `CORS_ORIGIN=*`) → zəng edənin `Origin` (və ya `Origin` başlığı olmadıqda `*` ) əks-səda verir, `Vary: Origin` ilə keşlər düzgün qalır. Eyni `applyCorsHeaders()` tıxanma nöqtəsi, həmçinin tokenlə təsdiqlənmiş `/v1*`/`/v1beta*` səthindəki hər 2xx bədən cavabına `Vary: Accept-Encoding` əlavə edir (`relaxForTokenAuth`, RFC 9110 §12.5.5, buraxılış #6737), beləliklə downstream/shared keşləri sıxılmış və sıxılmamış variantları düzgün ayırd edə bilir.
2. Əks halda, `Origin` sorğusu normallaşdırılır (kiçik hərflərlə, arxadakı kəsiklər kəsilir) və tələblə uyğunlaşdırılır.**birləşdirilmiş icazə siyahısı** :
   - env **`CORS_ALLOWED_ORIGINS`** — vergüllə ayrılmış siyahı və
   - icra müddəti **`corsOrigins`** qəbulu (Dashboard → Security → _CORS Allowed Origins_), `src/lib/config/runtimeSettings.ts` dən `setRuntimeAllowedOrigins()` vasitəsilə yeridilir.
3. Uyğun → yoxdur **heç bir `Access-Control-Allow-Origin` başlığı buraxılmır** . Brauzer çapraz mənşəli oxunuşu bloklayır. Bu, nəzərdə tutulan uğursuz bağlanmış defoltdur.

| Env var                | Mənası                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | İcazə vermək üçün dəqiq mənşəli CSV (tövsiyə olunur).                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → istənilən mənşəyi əks etdirir (wildcard). Yalnız Dev.                        |
| `CORS_ORIGIN`          | Miras. `*` `CORS_ALLOW_ALL` kimi davranır; icazə verilən siyahıya tək dəyər əlavə edilir. |

## `CORS_ALLOW_ALL=true` həqiqətən ifşa etdiyi — modeli

Ümumi OWASP xəbərdarlığı (“ CORS = istənilən sayt sizin API zəng edə bilər”) ciddi qəbul etməyə dəyər, lakin OmniRoute-nin məruz qalması **ümumi vəziyyətdən daha dardır** , bir konkret icra faktına görə:

> **Mərkəzi `applyCorsHeaders()` heç vaxt `Access-Control-Allow-Credentials` yaymır.** Server `Access-Control-Allow-Credentials: true` göndərməsə, brauzer _credentialed_ (kuki daşıyan) mənşəli cavabı ifşa etməyəcək. OmniRoute'nin paylaşılan CORS yolu heç vaxt etmir.

`CORS_ALLOW_ALL=true` ilə belə hər səth üçün bu nə deməkdir:

| Səthi                                         | Auth mexanizmi                 | Wildcard CORS effekti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| İdarə paneli / MANAGEMENT `/api/*`            | Kuki sessiyası                 | Mənşəyi əks-səda verir, amma **`Allow-Credentials` olmadan** brauzer **bloklar** etimadnamə oxundu. Zərərli mənşəli sayt **oxuya bilmir** təsdiqlənmiş tablosuna cavablarınız və sessiya kukisi ifşa olunmur.                                                                                                                                                                                                                                                                                                                                                           |
| Müştəri API `/v1/*`, `/v1beta/*`              | Daşıyıcı / `x-api-key` başlığı | Artıq icazə verən **dizaynla** (`relaxForTokenAuth`): brauzerlər heç vaxt `Authorization`/`x-api-key`-ni avtomatik qoşmaz, buna görə də təcavüzkarın səhifəsi açarınızı təmin edə bilməz. Rahat əks-səda yalnız etimadnamə başlığını deyil, təsdiqlənmiş mövzunu (təsdiqlənmiş API açarı və ya idarə paneli sessiyası) tələb edir və heç vaxt `Access-Control-Allow-Credentials` ehtiva etmir. Anonim cavablar (`REQUIRE_API_KEY=false`) konfiqurasiya edilmiş mənşəyə icazə verilən siyahıdan, o cümlədən açıq `CORS_ALLOW_ALL=true` -yə daxil olmaqdan istifadə edir. |
| Yalnız oxumaq üçün açıqdır (`/api/health`, …) | Heç biri                       | Həssas olmayan; wildcard zərərsizdir.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

Belə ki,**qalıq** `CORS_ALLOW_ALL=true` -nın məruz qalması aşağıdakılarla məhdudlaşır: (a) etimadnaməsi olmayan çarpaz mənşə **oxuyur** artıq təsdiqlənməmiş məlumatların və (b) CORS icazə verilməsi **uçuşdan əvvəl keçid** hələ də çapraz mənşəli səhifənin təmin edə bilmədiyi doğrulama tələb edən idarəetmə marşrutlarında —. elədir **yox** paylaşılan CORS yolunda sessiya qaçırma və ya etimadnamə oğurluğu vektoru.

### Bir əsl istisna — `/api/v1/agents/`

Bulud-Agent marşrutları (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) onların təyinatını təyin edir **sahibi** CORS başlıqları (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) və **et** `Access-Control-Allow-Credentials: true` ilə birlikdə `Access-Control-Allow-Origin: <origin>|*` buraxın. Bu, mənşə-echo və etimadnamələrin birgə mövcud olduğu tək səthdir və elədir **`CORS_ALLOW_ALL` dən müstəqildir** . Bu marşrutlar idarəetmə tərəfindən təsdiqlənmişdir (`requireManagementAuth`); İdarəetmə panelini hostdan kənarda ifşa edən operatorlar bilməlidirlər ki, bu, cavab başlıqları tərəfindən çapraz mənşəli etimadnaməli oxumağa icazə verilən bir yerdir. Onun açıq-aşkar icazə siyahısına bərkidilməsi bu CORS təlimatından ayrıca izlənilir.

## İstehsal yoxlama siyahısı

- **İstehsalda heç vaxt `CORS_ALLOW_ALL=true` təyin etməyin.** Qurulmamış buraxın.
- A təyin edin **açıq-aşkar** mənşə siyahısı — ya env var, ya da Təhlükəsizlik nişanı sahəsi:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Əgər OmniRoute əks proksi/tunelin arxasında işləyirsə (nginx, Caddy, Cloudflare Tunnel, Tailscale), CORS**yox** yeganə nəzarətiniz — geri dönmə marşrutu qoruyucusu hələ də kürü çıxara bilən marşrutları qoruyur (bax: [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). 403-ü "düzəltmək" üçün `X-Forwarded-For: 127.0.0.1` saxtalaşdırmayın; marşrut gözətçisinin bağladığı RCE sinifini yenidən açır.
- İş vaxtı vəziyyətini təsdiqləyin: tablosunda a göstərilir **davamlı kəhrəba bayrağı** Dashboard → Security → Authorization Inventory altında `CORS_ALLOW_ALL=true` hər dəfə canlı olduqda və `/api/settings/authz-inventory` bir `cors: { allowAll, allowedOrigins }` zərfinin monitorinq alətlərini sorğulaya bilər.

## İnkişaf rahatlığı — xüsusi yerli mənşəyə imkan verir

Hətta devdə belə nadir hallarda joker işarəyə ehtiyacınız var. Yalnız istifadə etdiyiniz dev serverlərə icazə verin:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Mənşələr hərf-həssassız olaraq uyğunlaşdırılır və arxadakı slash nəzərə alınmır, ona görə də `http://localhost:3000` və `http://localhost:3000/` ekvivalentdir. Eyni CSV iş vaxtında təyin edilə bilər **Dashboard → Security → CORS İcazəli Mənşəyi** yenidən başlamadan.

## API açarları kuki seanslarına qarşı

- **Daşıyıcı / `x-api-key` ( `/v1/*` çıxarış səthi):** brauzerlər heç vaxt bunları avtomatik əlavə etmir. Burada CORS mənalı bir maneə deyil — API açarı — maneəsidir, buna görə də bu səth qəsdən icazəlidir ki, brauzer və Electron müştəriləri artıq haqq qazandıqları cavabları oxuya bilsinlər. Rahat əks-səda yalnız etimadnamə başlığını deyil, təsdiqlənmiş mövzunu (təsdiqlənmiş API açarı və ya panel sessiyası) tələb edir və heç vaxt `Access-Control-Allow-Credentials` ehtiva etmir. Anonim cavablar (`REQUIRE_API_KEY=false`) konfiqurasiya edilmiş mənşəyə icazə verilən siyahıdan, o cümlədən açıq `CORS_ALLOW_ALL=true` -ya daxil olmaqdan istifadə edir. Müştərilərin ləğv edilmiş və ya səhv yazılmış açarı (#5242) göstərə bilməsi üçün doğrulama rəddləri (401) oxunaqlı qalır: boru kəmərinin öz 401-i əks-səda saxlayır və boru kəməri anonim olaraq xidmət etdikdən sonra açarın özündən imtina edən marşrut (idarəetmə auth konfiqurasiyası ilə `/v1/models` və `/v1beta/models`, sahibi tərəfindən təyin edilmiş `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` ) namizəd marşrutları) `credentialRejectionHeaders()` vasitəsilə həmin 401-ə əks-səda əlavə edir. Eko, marşrutun hansında yoxlanıldığı deyil, etimadnamə başlığı (`Authorization`, `x-api-key`, `x-goog-api-key` və ya `auth_token` kukisi) daşıyan sorğuya əsaslanır və heç vaxt `Access-Control-Allow-Credentials` ilə qoşalaşdırılmır; bədən sabit bir səhv zərfidir. `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) tərəfindən qorunan `/api/v1/` altında idarəetmə marşrutları bu etimadnamədən imtina istisnasından istifadə etmir: `REQUIRE_API_KEY=false` ilə onların 401/403 cavabları konfiqurasiya edilmiş CORS mənşə siyasətinə uyğundur.
- **Kuki sessiyası (iş paneli):** uğursuz bağlanmış defolt ilə qorunur **və** paylaşılan yolda `Access-Control-Allow-Credentials` nın olmaması ilə. management/dashboard mənşəyini icazə verilən konfiqurasiyadan kənar saxlayın; onlar tam olaraq uğursuz qapalı qalmalıdırlar.

## WebSocket əl sıxma (`/v1/responses`, `/v1/ws`)

Brauzerlər WebSocket-yə CORS tətbiq etmirlər, buna görə də nəticə çıxaran WebSocket nəqliyyatları əl sıxma `Origin` özləri yoxlayır (`src/server/origin/wsOrigin.ts`): Cavablar WebSocket (`/v1/responses`) və OmniRoute `npm start` / `npm run dev`, `/v1/ws`, `/v1/messages` və `/v1/responses` çərçivələrini yayımlayan `/v1/chat/completions` və `/api/v1/ws` körpüsündən keçdikdə. Körpü `/api/v1/ws?handshake=1` dən hökm tələb edir və bu marşrut yoxlamadan keçməyincə təkmilləşdirməkdən imtina edir. Doğrulama tələbləri hələ də ayrıca tətbiq olunur. Mənşə yoxlaması aşağıdakı hallarda keçir:

- onun `Origin` başlığı yoxdur (Codex CLI, SDKs və digər qeyri-brauzer müştəriləri);
- `Origin` yuxarıdakı icazə siyahısı tərəfindən qəbul edilir (`CORS_ALLOWED_ORIGINS`, `corsOrigins` parametri, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` OmniRoute-nin öz ictimai mənşələrindən biridir (konfiqurasiya edilmiş ictimai baza URL, etibarlı proksinin yönləndirilmiş mənşəyi və ya IP literal və ya `localhost` — kimi verilmiş birbaşa loopback/LAN hostu, tablosuna mutasiya yoxlamasının istifadə etdiyi eyni namizədlər); və ya
- o HTTP `/v1/*` səthində olduğu kimi etibarlı API açarını daşıyır.

Başqa hər şey `403 ws_origin_forbidden` alır. İdarə paneli sessiya kukisi xarici `Origin` azad etmir, çünki brauzer onu istənilən səhifənin yuvasına qoşur. Başqa portdakı `localhost` eyni mənşəli hesab edilmir; `CORS_ALLOWED_ORIGINS` yə belə dev mənşəli əlavə edin.

## Misal: OmniRoute qarşısında əks proxy

CORS OmniRoute özü tərəfindən tətbiq edilir, buna görə də proxy ümumiyyətlə etməlidir **yox** `Access-Control-*` başlıqlarını əlavə edin və ya yenidən yazın (ikiqat başlıqlar brauzerləri pozur). TLS dayandırın və — irəli aparın ki, OmniRoute əvvəlcədən uçuşa cavab versin:

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

İcazə verilən brauzer mənşəyini proksidə deyil, OmniRoute -da (`CORS_ALLOWED_ORIGINS` və ya Təhlükəsizlik nişanı) təyin edin.

## Mənbə faylları

| narahatlıq                                       | Fayl                                                                 |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| + `getCorsStatus()` həllinə icazə verilən siyahı | `src/server/cors/origins.ts`                                         |
| Ara proqram proqramı (tək həqiqət mənbəyi)       | `src/server/authz/pipeline.ts`                                       |
| Parametrlər → icra vaxtı mənşəli injection       | `src/lib/config/runtimeSettings.ts`                                  |
| İdarə paneli üçün iş vaxtı statusu               | `src/app/api/settings/authz-inventory/route.ts`                      |
| İdarə paneli xəbərdarlıq banneri                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins sahəsi                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Hər marşrut üzrə Cloud-Agent CORS (istisna)      | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket əl sıxma `Origin` yoxlaması            | `src/server/origin/wsOrigin.ts`                                      |

## Həmçinin baxın

- [Marşrut Mühafizəsi Tiers](./ROUTE_GUARD_TIERS.md) — kürü çıxara bilən marşrutlar üçün geri dönmə tətbiqi (ayrıca, tamamlayıcı nəzarət).
- [Authorization Guide](../architecture/AUTHZ_GUIDE.md) — tam auth boru kəməri.
