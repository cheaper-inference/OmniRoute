# CORS Configuration & Security (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute hansı **brauzer mənşələrinin** vahid, mərkəzləşdirilmiş icazə siyahısından istifadə edərək domenlərarası cavabları oxuya biləcəyini idarə edir. Model **standart olaraq qapalıdır**:
siz açıq şəkildə icazə verməyənədək heç bir mənşəyə icazə verilmir. Bu səhifə icazə siyahısının necə müəyyən edildiyini, `CORS_ALLOW_ALL=true` parametrinin əslində nələri əlçatan etdiyini (və ən vacibi, nələri **etmədiyini**), inkişaf və istehsal mühitlərinin təhlükəsiz şəkildə necə konfiqurasiya olunacağını və joker işarə aktiv olduqda idarəetmə panelinin göstərdiyi icra vaxtı xəbərdarlığını sənədləşdirir.

**Əsas etibarlı mənbə:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). İcazə siyahısı yalnız bir dəfə, ara proqramda (`src/server/authz/pipeline.ts`) tətbiq edilir — ayrı-ayrı marşrut emalçıları `Access-Control-Allow-Origin` başlığını özləri təyin etmir.

## Mənşə necə müəyyən edilir

Hər sorğu üçün ara proqram `Access-Control-Allow-Origin` dəyərini aşağıdakı ardıcıllıqla hesablayır:

1. **`CORS_ALLOW_ALL=true`** (və ya köhnə `CORS_ORIGIN=*`) → çağıranın `Origin` dəyərini geri qaytarır (`Origin` başlığı olmadıqda isə `*`) və keşlərin düzgün işləməsi üçün `Vary: Origin` əlavə edir. Eyni `applyCorsHeaders()` nəzarət nöqtəsi tokenlə autentifikasiya olunan `/v1*`/`/v1beta*` səthində gövdəsi olan hər 2xx cavabına `Vary: Accept-Encoding` başlığını da əlavə edir (`relaxForTokenAuth`, RFC 9110 §12.5.5, məsələ #6737); beləliklə, sonrakı/ortaq keşlər sıxılmış və sıxılmamış variantları düzgün ayırd edə bilir.
2. Əks halda, sorğunun `Origin` dəyəri normallaşdırılır (kiçik hərflərə çevrilir, sondakı kəsr işarəsi silinir) və **birləşdirilmiş icazə siyahısı** ilə müqayisə edilir:
   - mühit dəyişəni **`CORS_ALLOWED_ORIGINS`** — vergüllə ayrılmış siyahı və
   - `src/lib/config/runtimeSettings.ts` daxilindəki `setRuntimeAllowedOrigins()` vasitəsilə ötürülən icra vaxtı **`corsOrigins`** ayarı (İdarəetmə paneli → Təhlükəsizlik → _CORS üçün icazə verilən mənşələr_).
3. Uyğunluq yoxdur → **heç bir `Access-Control-Allow-Origin` başlığı göndərilmir**. Brauzer domenlərarası oxumanı bloklayır. Bu, nəzərdə tutulan standart qapalı davranışdır.

| Mühit dəyişəni         | Mənası                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | İcazə veriləcək dəqiq mənşələrin CSV siyahısı (tövsiyə olunur).                               |
| `CORS_ALLOW_ALL`       | `true`/`1` → istənilən mənşəni geri qaytarır (joker işarə). Yalnız inkişaf mühiti üçün.       |
| `CORS_ORIGIN`          | Köhnə parametr. `*`, `CORS_ALLOW_ALL` kimi davranır; tək dəyər icazə siyahısına əlavə edilir. |

## Təhdid modeli — `CORS_ALLOW_ALL=true` əslində nələri əlçatan edir

OWASP-ın ümumi xəbərdarlığını ("joker işarəli CORS = istənilən sayt API-nizi çağıra bilər") ciddi qəbul etməyə dəyər, lakin bir konkret reallaşdırma faktına görə OmniRoute-un məruz qalma sahəsi **ümumi haldan daha dardır**:

> **Mərkəzi `applyCorsHeaders()` heç vaxt
> `Access-Control-Allow-Credentials` göndərmir.** Server
> `Access-Control-Allow-Credentials: true` göndərmədiyi halda brauzer _etimadnaməli_
> (kukilər daşıyan) domenlərarası cavabı əlçatan etməyəcək. OmniRoute-un ortaq CORS yolu bunu heç vaxt
> etmir.

Bu, hətta `CORS_ALLOW_ALL=true` olduqda belə, hər səth üçün aşağıdakı mənaya gəlir:

| Səth                                     | Autentifikasiya mexanizmi    | Joker işarəli CORS-un təsiri                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| İdarəetmə paneli / MANAGEMENT `/api/*`   | Kuki sessiyası               | Mənşə geri qaytarılır, lakin **`Allow-Credentials` olmadan** brauzer etimadnaməli oxumanı **bloklayır**. Zərərli domenlərarası sayt autentifikasiya olunmuş idarəetmə paneli cavablarınızı **oxuya bilməz** və sessiya kukisi ifşa olunmur.                                                                                                                                                                          |
| Müştəri API-si `/v1/*`, `/v1beta/*`      | Bearer / `x-api-key` başlığı | Onsuz da **dizayn etibarilə** icazəlidir (`relaxForTokenAuth`): brauzerlər `Authorization`/`x-api-key` başlıqlarını heç vaxt avtomatik əlavə etmir, buna görə hücumçunun səhifəsi sizin açarınızı təqdim edə bilməz. Mənşənin geri qaytarılması yalnız təqdim olunan açar təsdiqləndikdə tətbiq olunur; anonim cavablar (`REQUIRE_API_KEY=false`) icazə siyahısına tabe qalır. `CORS_ALLOW_ALL` bunu genişləndirmir. |
| İctimai, yalnız oxuma (`/api/health`, …) | Yoxdur                       | Həssas deyil; joker işarə zərərsizdir.                                                                                                                                                                                                                                                                                                                                                                               |

Beləliklə, `CORS_ALLOW_ALL=true` parametrinin **qalıq** məruz qalması bunlarla məhdudlaşır: (a) artıq autentifikasiya tələb etməyən məlumatların etimadnaməsiz domenlərarası **oxunması** və (b) idarəetmə marşrutlarında CORS **ilkin sorğusunun keçməsinə** icazə verilməsi — həmin marşrutlar yenə də domenlərarası səhifənin təqdim edə bilməyəcəyi autentifikasiya tələb edir. Ortaq CORS yolunda bu, sessiyanın ələ keçirilməsi və ya etimadnamənin oğurlanması vektoru **deyil**.

### Bir real istisna — `/api/v1/agents/`

Cloud-Agent marşrutları (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) **öz** CORS başlıqlarını təyin edir
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) və
`Access-Control-Allow-Origin: <origin>|*` ilə birlikdə
`Access-Control-Allow-Credentials: true` başlığını **göndərir**. Bu, mənşənin geri qaytarılması ilə etimadnamələrin birlikdə mövcud olduğu yeganə səthdir və `CORS_ALLOW_ALL` parametrindən **asılı deyil**. Bu marşrutlar idarəetmə autentifikasiyasından keçir (`requireManagementAuth`); idarəetmə panelini hostdan kənarda əlçatan edən operatorlar bilməlidir ki, cavab başlıqlarının domenlərarası etimadnaməli oxumaya icazə verdiyi yeganə yer buradır. Bunun açıq icazə siyahısı ilə məhdudlaşdırılması bu CORS təlimatından ayrıca izlənilir.

## İstehsal mühiti üçün yoxlama siyahısı

- **İstehsal mühitində heç vaxt `CORS_ALLOW_ALL=true` təyin etməyin.** Onu təyin edilməmiş saxlayın.
- **Açıq şəkildə göstərilmiş** mənbə siyahısı təyin edin — ya mühit dəyişənindən, ya da Security bölməsindəki sahədən istifadə edin:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute əks proksi / tunel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) arxasında işləyirsə, CORS sizin yeganə nəzarət mexanizminiz
  **deyil** — loopback marşrut qoruyucusu proses başlatmağa imkan verən marşrutları
  hələ də qoruyur (bax:
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). 403 xətasını "düzəltmək" üçün
  `X-Forwarded-For: 127.0.0.1` saxtalaşdırmayın; bu, marşrut qoruyucusunun
  bağladığı RCE sinfini yenidən açır.
- İcra vaxtı vəziyyətini təsdiqləyin: `CORS_ALLOW_ALL=true` aktiv olduqda idarəetmə
  paneli Dashboard → Security → Authorization Inventory bölməsində **daimi kəhrəba
  rəngli banner** göstərir və `/api/settings/authz-inventory` monitorinq alətlərinin
  sorğulaya biləcəyi `cors: { allowAll, allowedOrigins }` zərfini qaytarır.

## İnkişaf rahatlığı — xüsusi lokal mənbələrə icazə verin

Hətta inkişaf mühitində də nadir hallarda wildcard-a ehtiyacınız olur. Yalnız istifadə
etdiyiniz inkişaf serverlərinə icazə verin:

```bash
# Lokal OmniRoute-a sorğu göndərən Vite (5173) + Next.js (3000) inkişaf serverləri
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Mənbələr registrdən asılı olmayaraq müqayisə edilir və sondakı slash nəzərə alınmır,
buna görə də `http://localhost:3000` və `http://localhost:3000/` ekvivalentdir. Eyni
CSV yenidən başlatma tələb olunmadan icra vaxtında **Dashboard → Security → CORS Allowed Origins**
bölməsində təyin edilə bilər.

## API açarları və cookie sessiyaları

- **Bearer / `x-api-key` (`/v1/*` inferensiya səthi):** brauzerlər bunları heç vaxt
  avtomatik olaraq əlavə etmir. CORS burada əhəmiyyətli maneə deyil — maneə API
  açarıdır — buna görə də brauzer və Electron klientlərinin onsuz da giriş hüququna
  malik olduqları cavabları oxuya bilməsi üçün bu səth qəsdən sərbəstdir.
  Yumşaldılmış geri qaytarma başlığın sadəcə mövcudluğuna deyil, təsdiqlənmiş açara əsaslanır: `REQUIRE_API_KEY=false` sorğuya anonim xidmət etdikdə onun uğurlu cavabı standart olaraq qapalı icazə siyahısına tabe qalır. Autentifikasiya imtinaları (401) oxuna bilən qalır ki, klientlər ləğv edilmiş və ya səhv yazılmış açarı göstərə bilsinlər (#5242): pipeline-ın öz 401 cavabı mənşənin geri qaytarılmasını saxlayır, pipeline sorğuya anonim kimi xidmət etdikdən sonra açarı özü rədd edən marşrut isə (idarəetmə autentifikasiyası konfiqurasiya edildikdə `/v1/models` və `/v1beta/models`, sahibə aid `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` və auto-combo namizəd marşrutları) həmin 401 cavabına `credentialRejectionHeaders()` vasitəsilə geri qaytarmanı əlavə edir. Geri qaytarma marşrutun onlardan hansını yoxlamasından deyil, sorğunun etimadnamə başlığı (`Authorization`, `x-api-key`, `x-goog-api-key` və ya `auth_token` kukisi) daşımasından asılıdır və heç vaxt `Access-Control-Allow-Credentials` ilə birlikdə göndərilmir; cavabın gövdəsi sabit xəta zərfidir. `/api/v1/` altında `requireManagementAuth()` ilə qorunan idarəetmə marşrutları (`/api/v1/management/*`, `/api/v1/registered-keys`) geri qaytarmanı əlavə etmir: `REQUIRE_API_KEY=false` olduqda onların 401/403 cavabları domenlərarası oxuna bilməz.
- **Cookie sessiyası (idarəetmə paneli):** qapalı qalmanı təmin edən standart seçimlə
  **və** ortaq yolda `Access-Control-Allow-Credentials` başlığının olmaması ilə
  qorunur. İdarəetmə/idarəetmə paneli mənbələrini hər hansı sərbəst
  konfiqurasiyadan kənarda saxlayın; onlar tam olaraq qapalı qalmalıdır.

## WebSocket əl sıxışmaları (`/v1/responses`, `/v1/ws`)

Brauzerlər WebSocket-ə CORS tətbiq etmir, buna görə də inferensiya nəticəsini qaytaran WebSocket nəqliyyatları əl sıxışmasının `Origin` başlığını özləri yoxlayır (`src/server/origin/wsOrigin.ts`): Responses WebSocket-i (`/v1/responses`) və OmniRoute `npm start` / `npm run dev` ilə işlədikdə `/v1/chat/completions`, `/v1/messages` və `/v1/responses` cavablarını kadrlar şəklində ötürən `/v1/ws` və `/api/v1/ws` körpüsü. Körpü qərar üçün `/api/v1/ws?handshake=1` ünvanına müraciət edir və həmin marşrut yoxlamanı icra etməyibsə, bağlantının yüksəldilməsindən imtina edir. Əl sıxışması aşağıdakı hallarda qəbul edilir:

- `Origin` başlığı yoxdursa (Codex CLI, SDK-lar və brauzer olmayan digər klientlər);
- `Origin` yuxarıdakı icazə siyahısı tərəfindən qəbul edilirsə (`CORS_ALLOWED_ORIGINS`, `corsOrigins` parametri, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` OmniRoute-un öz ictimai mənşələrindən biridirsə (konfiqurasiya edilmiş ictimai əsas URL, etibarlı proksinin yönləndirdiyi mənşə və ya IP literalı yaxud `localhost` kimi göstərilmiş birbaşa loopback/LAN hostu — idarəetmə panelinin dəyişiklik yoxlamasının istifadə etdiyi eyni namizədlər); və ya
- HTTP `/v1/*` səthində olduğu kimi etibarlı API açarı daşıyırsa.

Qalan hər şey `403 ws_origin_forbidden` alır. İdarəetmə panelinin sessiya kukisi yad `Origin` üçün istisna yaratmır, çünki brauzer onu istənilən səhifənin soketinə əlavə edir. Başqa portdakı `localhost` eyni mənşə sayılmır; belə inkişaf mənşələrini `CORS_ALLOWED_ORIGINS` siyahısına əlavə edin.

## Nümunə: OmniRoute qarşısında əks proksi

CORS qaydaları OmniRoute tərəfindən tətbiq edilir, buna görə proksi, ümumiyyətlə, `Access-Control-*` başlıqlarını əlavə etməməli və ya yenidən yazmamalıdır (təkrarlanan başlıqlar brauzerlərin işini pozur). TLS-i sonlandırın və sorğunu yönləndirin — ilkin sorğuya OmniRoute cavab versin:

```nginx
# nginx — OmniRoute-a yönləndirin; burada Access-Control-* əlavə ETMƏYİN
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Yönləndirmə başlıqlarını saxlayın: eyni hostdakı proksi geridönüş interfeysi üzərindən qoşulur və
    # məhz bu başlıqlar OmniRoute-a sorğunu göndərənin lokal operator olmadığını bildirir. Bu başlıqların
    # heç birini əlavə etməyən proksi bütün uzaq istifadəçiləri lokal kimi göstərir. X-Forwarded-For başlığını da heç vaxt 127.0.0.1 olaraq təyin etməyin.
}
```

Brauzer üçün icazə verilən mənbələri proksidə deyil, OmniRoute-da (`CORS_ALLOWED_ORIGINS` və ya Security bölməsində) təyin edin.

## Mənbə faylları

| Məsələ                                                    | Fayl                                                                 |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| İcazə siyahısının müəyyənləşdirilməsi + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware tətbiqi (vahid həqiqət mənbəyi)                | `src/server/authz/pipeline.ts`                                       |
| Settings → icra vaxtı mənbə inyeksiyası                   | `src/lib/config/runtimeSettings.ts`                                  |
| İdarəetmə paneli üçün icra vaxtı statusu                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| İdarəetmə panelində xəbərdarlıq banneri                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins sahəsi                               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Hər marşrut üzrə Cloud-Agent CORS-u (istisna)             | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket əl sıxışmasında `Origin` yoxlaması              | `src/server/origin/wsOrigin.ts`                                      |

## Həmçinin baxın

- [Marşrut qoruyucusu səviyyələri](./ROUTE_GUARD_TIERS.md) — proses yarada bilən marşrutlar üçün loopback məcburiyyəti (ayrıca, tamamlayıcı nəzarət mexanizmi).
- [Avtorizasiya təlimatı](../architecture/AUTHZ_GUIDE.md) — tam autentifikasiya konveyeri.
