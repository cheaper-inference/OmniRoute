# Authorization Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Həqiqət mənbəyi:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Son yenilənmə:** 2026-09-22 — əhatə adları MCP-SERVER.md sənədinə istinad edir

OmniRoute hər bir API sorğusunu yoxlayan, marşrutdan xəbərdar avtorizasiya konveyerinə malikdir. Təsnifat **deterministikdir** və **uğursuzluq zamanı girişi rədd edir** — təsnif edilə bilməyən hər bir sorğu `MANAGEMENT` kateqoriyasına düşür və sessiya və ya idarəetmə səviyyəli token tələb edir. Bu səhifə marşrutları idarə edən və ya yeni son nöqtələr layihələndirən mühəndislər üçün modeli izah edir.

![AuthZ konveyeri (3 marşrut sinfi + siyasətin qiymətləndirilməsi)](../diagrams/exported/authz-pipeline.svg)

> Mənbə: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## İki autentifikasiya rejimi

### 1. API açarı (Bearer)

OpenAI/Anthropic/Gemini ilə uyğun müştəri API-ləri və açarın `manage` əhatə dairəsinə malik olduğu bəzi idarəetmə marşrutları üçün istifadə olunur.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` daxilindəki `isValidApiKey()` / `extractApiKey()` tərəfindən yoxlanılır və `src/shared/utils/apiAuth.ts` vasitəsilə yenidən ixrac edilir. Validator həmçinin `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` mühit dəyişənlərini daimi birbaşa keçid açarları kimi qəbul edir (məsələ #1350).

### 2. İdarə paneli sessiyası (auth_token kukisi)

İdarə paneli səhifələri və administrator əməliyyatları üçün.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Kuki yalnız JWT doğrulandıqda **və** `authenticated: true` daşıdıqda sessiya hesab olunur
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Kukidən
istifadə edən hər bir komponent (idarə paneli marşrut mühafizəçisi (`isDashboardSessionAuthenticated()`), avtorizasiya konveyerinin yenilənməsi, WebSocket bağlantısının qurulması, canlı
server, `/api/settings/require-login`, `/api/auth/status`) həmin köməkçi funksiyadan keçir.
`JWT_SECRET` ilə imzalanmış başqa JWT-lər də mövcuddur — Cursor CLI birbaşa keçidi
açar sahibləri üçün `iss "omniroute" / aud "cursor-cli"` tokenləri yaradır — və onlar heç vaxt sessiya hesab edilmir
(#13298).

`src/shared/utils/apiAuth.ts` daxilindəki `isDashboardSessionAuthenticated()` tərəfindən yoxlanılır. JWT-nin 30 günlük istifadə müddətinin bitməsinə 7 gündən az qaldıqda konveyer onu avtomatik yeniləyir.

Sessiya 30 gün tamamlanmazdan əvvəl də bitə bilər, çünki hər bir token yaradıcısı `mintDashboardSessionToken` vasitəsilə işləyir (buraxılış vaxtı `iat` və identifikator `jti`) və yoxlayıcı iki parametri yoxlayır: parol dəyişdirildikdə təyin olunan `sessionsValidAfter`; bunun nəticəsində həmin vaxtdan əvvəl yaradılmış bütün sessiyalar artıq doğrulanmır (parolu dəyişdirən brauzer yeni kuki əldə edir) və `POST /api/auth/logout` marşrutunun sistemdən çıxarılan sessiyanın `jti` dəyərini əlavə etdiyi `revokedDashboardSessions`. Daha köhnə buraxılış tərəfindən yaradılmış sessiyalar bu iddiaların heç birini daşımır və ilk parol dəyişikliyinədək etibarlı qalır. Parametrləri oxumaq mümkün olmadıqda sessiya etibarlı hesab edilmir.

Bəzi idarəetmə marşrutları **hər iki** rejimi qəbul edir: kuki VƏ YA API açarı `manage` (və ya `admin`) əhatə dairəsinə malik olduqda `Bearer <key>`. Bu, v3.8 versiyasında əlavə edilmiş «API çağırışları vasitəsilə konfiqurasiya edilə bilən» iş axınını mümkün edir.

#### İstəyə bağlı OIDC giriş qapısı (#6973)

İdarə panelinin administrator girişi standart parol girişinə əlavə olaraq **istəyə bağlı** OIDC (OpenID Connect) axınını da dəstəkləyir — parol ilə giriş heç vaxt ləğv edilmir, yalnız
tamamlanır:

- `settings.oidcEnabled === true` olmadığı **və** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` parametrlərinin hamısı konfiqurasiya edilmədiyi halda deaktivdir (Parametrlər → Autentifikasiya).
  Əks halda `GET /api/auth/oidc/login` `400` qaytarır.
- `GET /api/auth/oidc/login` emitentin
  `/.well-known/openid-configuration` ünvanından `authorization_endpoint` dəyərini aşkar edir (tapılmadıqda
  `<issuer>/authorize` istifadə olunur), daxil olan sorğu əsasında
  (`x-forwarded-proto` nəzərə alınmaqla) yönləndirmə URI-sini yaradır və təsadüfi `state`
  dəyərini `httpOnly` `oidc_state` kukisində saxlayaraq istifadəçini IdP-yə yönləndirir.
- `GET /api/auth/oidc/callback` `state` dəyərini yoxlayır, avtorizasiya
  kodunu mübadilə edir və ID tokeninin imzasını emitentin JWKS-i vasitəsilə
  (`jose` paketinin `createRemoteJWKSet` funksiyası; hər JWKS URI-si üçün keşlənir), `issuer`/`audience`
  yoxlamaları ilə təsdiqləyir. İdarəetmə panelinə giriş üçün boş olmayan `oidcAllowedSubjects` siyahısı,
  `oidcAdmissionClaim` siyasəti və ya hər ikisi tələb olunur. Subyekt siyahısı yalnız
  `email_verified === true` olduqda `sub` və ya `email` ilə uyğunlaşdırılır. İxtiyari iddia siyasəti
  nöqtələrlə ayrılmış ID-token iddia yolunu (məsələn, `realm_access.roles`) və
  qəbul edilən dəyərlər massivini götürür; həll edilmiş iddia ən azı bir qəbul edilən dəyəri
  ehtiva edən sətirlər massivi olmalıdır. Hər iki siyasət konfiqurasiya edilibsə,
  hər ikisi yoxlamadan keçməlidir. Çatışmayan və ya səhv formatlı iddialar təhlükəsiz şəkildə rədd edilir,
  siyasətlərdən heç biri olmadıqda isə geri çağırış girişi rədd edir (`not_configured`). Yalnız subyektə əsaslanan
  mövcud konfiqurasiyalar dəyişmədən işləməyə davam edir.
- Keycloak adətən realm rollarını ID tokenlərinə deyil, giriş tokenlərinə
  əlavə edir. `admin` realm rolunu tələb etmək üçün bu müştəri üçün
  `realm_access.roles` dəyərini onun **ID tokeninə** daxil edən protokol xəritələndiricisini konfiqurasiya edin, sonra
  `oidcAdmissionClaim` parametrini `{ "path": "realm_access.roles", "values": ["admin"] }` olaraq təyin edin.
  Yalnız rola əsaslanan giriş icazəsini aktivləşdirməzdən əvvəl bu müştərinin faktiki ID-token iddiasını
  yoxlayın; tətbiq giriş tokenindəki rolları oxumur. IdP tərəfində tokenin
  rədd edilməsi bu tətbiq səviyyəli yoxlamanı tamamlaya bilər, lakin onu əvəz etmir.
- Uğurlu olduqda, parolla girişin yaratdığı **tamamilə eyni** 30 günlük `auth_token`
  JWT-si yaradılır (`src/app/api/auth/login/route.ts`), buna görə idarəetmə paneli sessiyası
  prosesinin qalan hissəsi (avtomatik yeniləmə, kuki bayraqları) dəyişmir —
  OIDC yalnız kukinin necə yaradıldığını əvəz edir, onun verdiyi icazələri deyil. IdP rollarında və ya qruplarında edilən dəyişikliklər
  mövcud OmniRoute sessiyalarını etibarsız etmir; onların istifadə müddəti yenə də sistemdən çıxış,
  parolun dəyişdirilməsi və ya sessiyanın müddətinin bitməsi ilə idarə olunur.
- Hər bir `oidc*` parametri (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) `SECURITY_IMPACTING_SETTINGS_KEYS`
  daxilindədir (`src/shared/constants/securityImpactingSettings.ts`): sorğu gövdəsində idarəetmə
  parolu `currentPassword` kimi göndərilmədikdə `PATCH /api/settings`
  `400 PASSWORD_REQUIRED` cavabı verir (parol səhv olduqda `401 PASSWORD_MISMATCH`).
  `oidcDisablePasswordLogin` parolla _girişi_ (`POST /api/auth/login`) rədd edir,
  lakin saxlanmış parol heşini qoruyur və təkrar autentifikasiya yenə də
  `currentPassword` dəyərini həmin heşlə yoxlayır.
- `corsOrigins` və `bruteForceProtection` də `SECURITY_IMPACTING_SETTINGS_KEYS`
  daxilindədir: onlardan hər hansı birinin yumşaldılması giriş müdafiəsini zəiflədir, buna görə onlar da eyni
  `currentPassword` ilə təkrar autentifikasiya tələb edir (Təhlükəsizlik vərəqi bunu soruşur) və JSON idxalı
  onları nəzərə almır.
- Hər bir təhlükəsizlik siyasəti açarı — `SECURITY_IMPACTING_SETTINGS_KEYS` elementləri,
  hər bir `oidc*` açarı və idarəetmə panelinin sessiya vəziyyəti — `PATCH /api/settings` üçün
  **yalnız operatora açıqdır**: `manage` əhatəli API açarı və ya `oma_` giriş tokeni,
  hətta düzgün `currentPassword` göndərsə belə, `403` ilə rədd edilir və
  bu rəddetmə `reason: OPERATOR_REQUIRED` ilə `settings.update_failed` kimi audit jurnalına yazılır
  (`src/lib/api/operatorCredential.ts` daxilində `requireOperatorCredential()`).
  Adi parametrlər (`theme`, ekran seçimləri) `manage` açarı
  və ya `admin` giriş tokeni ilə dəyişdirilə bilər. `/api/settings` ünvanının özündə (və
  `/api/settings/require-login` ünvanında) edilən hər bir dəyişiklik həmçinin
  `admin` giriş-tokeni əhatəsini tələb edir
  (`src/server/authz/accessScopes.ts` daxilində `ADMIN_MUTATION_EXACT_PATHS`, dəqiq yol
  uyğunluğu); `GET` üçün `read` qalır, digər `/api/settings/*` alt marşrutları (proksilər,
  kombinasiya standartları, model ləqəbləri, sıxılma, təmizləmələr…) isə metoddan müəyyən edilən
  `write` əhatəsini saxlayır.
- `POST /api/settings/import-json` həmin təkrar autentifikasiyanı ötürür, buna görə yazmazdan əvvəl
  `IMPORT_STRIPPED_SETTINGS_KEYS` daxilindəki (eyni faylda) bütün açarları silir: parol və
  `currentPassword`, hər bir `SECURITY_IMPACTING_SETTINGS_KEYS` elementi və
  idarəetmə panelinin sessiya vəziyyəti (`sessionsValidAfter`, `revokedDashboardSessions`).
  Buna görə daha köhnə ehtiyat nüsxənin idxalı parol dəyişikliyi
  və ya sistemdən çıxış nəticəsində artıq sonlandırılmış sessiyanı bərpa edə bilməz.

## Marşrut sinifləri

`src/server/authz/types.ts` üç sinif təyin edir; deterministik şəkildə təsnif edilə bilməyən hər marşrut `MANAGEMENT`-ə düşür.

| Sinif        | Təsvir                                                                                                                                                 | Tələb olunan autentifikasiya                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `PUBLIC`     | Açıq şəkildə təhlükəsiz marşrutlar — giriş, çıxış, status, başlatma, sağlamlıq və quraşdırmanın ilkin endpoint-ləri.                                   | Yoxdur                                                              |
| `CLIENT_API` | Model xidmət endpoint-ləri — `/api/v1/*`, `/api/v1beta/*` və ləqəblər: `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Effektiv `REQUIRE_API_KEY` funksiya bayrağı aktivdirsə Bearer açarı |
| `MANAGEMENT` | İdarəetmə paneli səhifələri, parametrlər, provayderlər, açarlar, admin və diaqnostika endpoint-ləri.                                                   | İdarəetmə paneli sessiyası VƏ YA `manage` əhatəli Bearer            |

Bəzi `MANAGEMENT` əməliyyatları **yalnız operator üçündür**: `manage` açarı kifayət etmir. Saxlanılan etimadnamələrin ixracı (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), canlı məlumatların üzərinə ehtiyat nüsxəsinin bərpası (`dryRun=true` daxil olmaqla `POST /api/db-backups/import`, identifikatora görə bərpa `POST /api/db-backups` və `POST /api/settings/import-json`) və bərpa nöqtələrinin məhv edilməsi (`DELETE /api/db-backups` təmizləməsi və `PATCH /api/db-backups`, çünki saxladığı saxlama müddəti hər ehtiyat nüsxəsindən sonrakı avtomatik təmizləməni idarə edir) idarəetmə paneli sessiyası, yerli CLI subyekti və ya söndürülmüş giriş tələb edir. Sinxronizasiya tokeni vermək (`POST /api/sync/tokens`) və `admin` CLI giriş tokeni vermək (`POST /api/cli/tokens`) bütün giriş rejimlərində idarəetmə paneli sessiyası və ya yerli CLI subyekti tələb edir. İstənilən əhatəli API açarları və `oma_` giriş tokenləri operator etimadnaməsi deyil: tələb olunduqda `403` alırlar. Yoxlama `src/lib/api/operatorCredential.ts`-dədir (`resolveOperatorCredential()` / `requireOperatorCredential()`). Giriş parametrlərinin dəyişdirilməsi də yalnız operator üçündür: parol mövcud olduqdan sonra `POST /api/settings/require-login` (idarəetmə parolunu təyin etmək / `requireLogin`-i dəyişmək) yalnız bu etimadnamələri qəbul edir — ilk quraşdırma bootstrap pəncərəsi (hələ parol yoxdursa) dəyişməz qalır — və idarəetmə paneli sessiyası parolu əvəz etmək üçün `currentPassword` göndərməlidir (yoxdursa və ya səhvdirsə `403`, `settings.update_failed` kimi audit olunur). Yerli CLI və girişi söndürülmüş instansiya bərpa yolunu saxlayır və parolu onsuz təyin edə bilər, çünki ikisi də məlumat qovluğuna sahib olan hosta bağlıdır.

## Konveyer

```
Daxil olan sorğu → src/proxy.ts
  → src/server/authz/pipeline.ts daxilində runAuthzPipeline()
    1. Etibarlı daxili başlıqları sil (x-omniroute-auth-*, x-omniroute-route-class)
    2. Sorğu identifikatoru yarat, marşrutu classifyRoute() vasitəsilə təsnif et
    3. Əgər pathname == "/" olarsa → /dashboard ünvanına yönləndir
    4. Boşaltma rejimindədirsə (nizamlı dayandırma) və /api/* olarsa → 503
    5. GET olmayan /api/* sorğusudursa → checkBodySize() qoruyucusunu yoxla
    6. Əgər OPTIONS olarsa → CORS ilkin sorğusuna 204 cavabı ver
    7. Əgər options.enforce == false olarsa → marşrut sinfi başlıqları ilə dəyişiklik etmədən ötür
    8. Əks halda: POLICIES[routeClass].evaluate(ctx)
       - icazə ver  → x-omniroute-auth-{kind,id,label,scopes} əlavə et → NextResponse.next()
       - rədd et → correlation_id ilə JSON xətası (idarə paneli səhifələri → 302 /login)
```

Etibarlı daxili başlıqlar (`src/server/authz/headers.ts` daxilində müəyyən edilib) təsnifatdan əvvəl **daxil olan sorğulardan silinir** — müştərilər subyekti təqlid etmək üçün `x-omniroute-auth-*` başlıqlarını əvvəlcədən təyin edə bilməzlər.

### Siyasət müqavilələri

Hər marşrut sinfinin `src/server/authz/policies/` daxilində bir siyasəti var:

- **`publicPolicy`** (`policies/public.ts`) — həmişə `allow({ kind: "anonymous", id: "anonymous" })` qaytarır.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer açarını çıxarır və `validateApiKey()` vasitəsilə doğrulayır. Yalnız effektiv `REQUIRE_API_KEY` funksiya bayrağı deaktiv olduqda anonim girişə keçid edir. Effektiv bayraq `isRequireApiKeyEnabled()` vasitəsilə müəyyən edilir (`DB funksiya bayrağı əvəzləməsi > process.env.REQUIRE_API_KEY > standart dəyər`), beləliklə, İdarə Panelindəki Funksiya Bayraqları və mühit dəyişənləri `/api/v1/*`, `/api/v1beta/*` və aliasları ardıcıl şəkildə idarə edir; həlledici xətaları zamanı giriş bağlı saxlanılır. Müştəri API-si marşrutlarında idarə paneli sessiyası ilə edilən sorğulara icazə verir (idarə panelinin model kataloqu tərəfindən istifadə edilən `/api/v1/models` daxil olmaqla).
- **`managementPolicy`** (`policies/management.ts`) — idarə paneli sessiyasını, daxili model sinxronlaşdırma sorğularını (`/api/providers/[name]/(sync-models|models)` ilə uyğunlaşdırılır) qəbul edir və ya `isAuthRequired()` false qaytardıqda yoxlamanı tamamilə ötürür. Bearer tokeni təqdim edildikdə, lakin etibarsız olduqda 403 (`AUTH_001`), əks halda isə 401 qaytarır. Həmçinin hər hansı autentifikasiya şaxəsindən əvvəl marşrut qoruyucusu səviyyələrini (LOCAL_ONLY / ALWAYS_PROTECTED) tətbiq edir — baxın: [Marşrut Qoruyucusu Səviyyələri](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` daxilindəki LOCAL_ONLY yollarına (hazırda: `/api/mcp/`) Bearer açarı `manage` əhatə dairəsinə malik olduqda loopback olmayan ünvanlardan giriş mümkündür; bütün digər LOCAL_ONLY yolları əhatə dairəsindən asılı olmayaraq yalnız loopback üçün əlçatan qalır.

Uğurlu siyasət `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` olan `AuthSubject` qaytarır. Aşağı axındakı işləyicilər autentifikasiya məntiqini yenidən icra etmək əvəzinə onu `src/server/authz/assertAuth.ts` daxilindəki `assertAuth(request, "CLIENT_API")` vasitəsilə oxuya bilərlər.

## Açıq marşrutların siyahısı

`src/shared/constants/publicApiRoutes.ts` açıq şəkildə müəyyən edilmiş icazə siyahısıdır:

Siyahı **formasına** görə bölünüb və bu bölgü kritik əhəmiyyət daşıyır (GHSA-74g9-q8f6-793h): prefiks
`startsWith()` ilə uyğunlaşdırılır, buna görə də başlanğıc simvollarını paylaşan bütün bitişik yollarla uyğun gəlir.
Prefiks kimi `/api/usage/om-usage`, `/api/usage/om-usage<anything>` yolunu AÇIQ kimi işarələyirdi və Next bunu
öz autentifikasiyası olmayan `/api/usage/[connectionId]` işləyicisinə yönləndirirdi.

```ts
// Həqiqi alt ağaclar. Hər bir element "/" ilə bitməlidir (vahid testi ilə yoxlanılır).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify daxilində CLIENT_API kimi qəbul edilir, "autentifikasiyasız açıq" kimi deyil
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Dəqiq uyğunlaşdırılan tək marşrutlar (sonda maili xətt ilə və ya onsuz).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Həmçinin CORS mənşə məhdudiyyətinin yumşaldılması tətbiq olunan yalnız oxuma üçün tək marşrutlar.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS məhdudiyyətinin yumşaldılması OLMADAN yalnız oxuma üçün tək marşrut.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Yalnız oxuma üçün marşrutlar yalnız təhlükəsiz metodlar üçün açıqdır. Qeyd: `classifyRoute()` `/api/v1/*` və `/api/v1beta/*` marşrutlarını PUBLIC ehtiyat uyğunluğundan çıxarır — Bearer açarı siyasətinin hələ də tətbiq olunması üçün bunlar həmişə `CLIENT_API` olur.

## Yeni marşrutun əlavə edilməsi

### Nümunə 1 — Açıq müştəri API son nöqtəsi (Bearer autentifikasiyası)

`/api/v1/` və `/api/v1beta/` altındakı marşrutlar avtomatik olaraq `CLIENT_API` kimi təsnif edilir. Ara proqram Bearer yoxlamasını tətbiq edir; marşrut işləyicilərinin bunu təkrar etməsinə ehtiyac yoxdur, lakin faydalı olarsa subyekti oxuya bilərlər.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... işləyici məntiqi
}
```

### Nümunə 2 — İdarəetmə son nöqtəsi (sessiya və ya Bearer + manage)

`src/lib/api/requireManagementAuth.ts` faylındakı `requireManagementAuth()` funksiyasından istifadə edin:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... işləyici məntiqi
}
```

`requireManagementAuth()` uğur halında `null`, əks halda isə JSON xətası olan `Response` qaytarır:

- 401 `AUTH_001` "Autentifikasiya tələb olunur" — ümumiyyətlə heç bir giriş məlumatı yoxdur
- 403 — etibarsız Bearer **və ya** Bearer mövcuddur, lakin açarda `manage` / `admin` əhatə dairəsi yoxdur

`hasManageScope(scopes)` funksiyası `"manage"` və ya `"admin"` üçün true qaytarır.

### Nümunə 3 — Açıq icazə siyahısına əlavə etmə

Çoxluğu rahatlığa görə deyil, formasına görə seçin. Bir marşrut `PUBLIC_API_ROUTES_EXACT` çoxluğuna (və ya yalnız GET üçün `PUBLIC_READONLY_CORS_API_ROUTES` siyahısına) daxil edilir; yalnız həqiqi alt ağac `PUBLIC_API_ROUTE_PREFIXES` siyahısına daxil edilir və o, **`/` ilə bitməlidir**. Tək marşrutu prefiks siyahısına daxil etmək, başlanğıc simvollarını onunla paylaşan bütün bitişik yolları, o cümlədən sonradan əlavə edilən dinamik seqmentli qardaş marşrutları da açıq edir (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` və `tests/unit/authz/classify.test.ts` fayllarındakı vahid testlərini yeniləyin.

## Əhatə dairələri

Üç ad məkanı mövcuddur. Hər yoxlayıcı yalnız öz sətirlərini oxuyur. `manage` əhatə dairəsinin `read:compression` üçün `scopeMatches` yoxlamasından niyə keçmədiyi və `read` giriş tokeninin niyə `PATCH /api/keys/{id}` sorğusunu yerinə yetirə bilmədiyi də daxil olmaqla paralel müqayisə üçün baxın:
[Üç əhatə dairəsi ad məkanı](../frameworks/MCP-SERVER.md#three-scope-namespaces).

API açarları `scopes` massivi daşıyır (`api_keys.scopes` daxilində JSON kimi saxlanılır, baxın: `src/lib/db/apiKeys.ts`).

### İdarəetmə əhatə dairəsi

- `manage` / `admin` — `hasManageScope`. İdarəetmə API marşrutlarına Bearer girişi.
- `mcp:connect`, `self:usage`, `self:account-quota` və
  `policy:bypass-provider-quota` əlavə, dəqiq uyğunluq tələb edən əhatə dairələridir. Onlar
  `MANAGEMENT_API_KEY_SCOPES` xaricində yerləşir. `mcp:connect` yalnız
  `/api/mcp/` üçün qeyri-loopback istisnasını açır.

### MCP alət əhatə dairələri

Kataloq və uyğunlaşdırma qaydaları (eyni sətir və ya `*` ilə bitən verilmiş əhatə dairəsi):
[MCP alət əhatə dairələri](../frameworks/MCP-SERVER.md#mcp-tool-scopes).
`src/shared/constants/mcpScopes.ts` daxilindəki `MCP_SCOPE_LIST` həmin tam kataloq deyil, ilkin tipləşdirilmiş
alt çoxluqdur. Məcburi tətbiqetmə
`open-sse/mcp-server/scopeEnforcement.ts` daxilində, `resolveCallerScopeContext()`
əhatə dairələrini MCP autentifikasiya məlumatından, sorğu metadatasından və ya `OMNIROUTE_MCP_SCOPES` dəyişənindən
müəyyən etdikdən sonra işləyir. `OMNIROUTE_MCP_ENFORCE_SCOPES=true` olmadığı halda deaktiv qalır.

### Giriş tokeni əhatə dairələri

`oma_live_…` tokenlərində `read` / `write` / `admin`, `scopeSatisfies`
(`src/lib/accessTokens/scopes.ts`) tərəfindən dərəcələndirilir. Bu dərəcə yalnız giriş tokeni
etimadnaməsinə tətbiq olunur. Baxın: [İdarəetmə autentifikasiyası](../guides/MANAGEMENT-AUTH.md).

## Autentifikasiya tələbi açarı

`src/shared/utils/apiAuth.ts`-dəki `isAuthRequired()` sorğu üçün **hər hansı** autentifikasiyanın tətbiq olunub-olunmayacağını müəyyən edir:

- `settings.requireLogin === false` → autentifikasiya qlobal olaraq söndürülür, lakin həmişə qorunan təbəqə ([Marşrut Qoruma Təbəqələri](../security/ROUTE_GUARD_TIERS.md)) və qəbul edilən etimadnaməni verən çağırışlar istisnadır. Bunlar girişin aktiv olduğu zamankı ilə eyni etimadnaməni tələb edir: sinxronizasiya tokenləri vermək, istənilən əhatədə CLI giriş tokenləri vermək və `manage`/`admin` əhatəli API açarı yaratmaq, bu əhatəni açara vermək və ya belə açarı yenidən yaratmaq/göstərmək (`src/lib/api/requireManagementAuth.ts`-dəki `requireCredentialForManagementScopedKey()`). Inference üçün açarlar açıq qalır.
- İdarəetmə parolu yoxdur **və** `INITIAL_PASSWORD` mühit dəyişəni yoxdur → bootstrap rejimi: quraşdırma sehrbazına və loopback sorğularına icazə verilir, lakin xarici şəbəkə sorğuları hələ də etimadnamə tələb edir.
- İstənilən verilənlər bazası xətası → bağlı şəkildə uğursuz olur (təhlükəsiz defolt).

Müştəri API açarının tətbiqi birbaşa `process.env.REQUIRE_API_KEY` oxumaq yerinə `src/shared/utils/featureFlags.ts`-dəki `isRequireApiKeyEnabled()`-dən istifadə edir. Bu yerləşdirilmiş instansiyalar üçün vacibdir: İdarəetmə Paneli → Funksiya Bayraqlarında `REQUIRE_API_KEY`-i dəyişdirmək DB üzərində override saxlayır və `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` və bu köməkçini paylaşan digər müştəri API autentifikasiya yoxlamalarına dərhal təsir edir. Funksiya bayrağı anbarı oxuna bilmirsə, müştəri API autentifikasiyası bağlı şəkildə uğursuz olur və açar tələb edir.

## Uyğunluğu pozan dəyişiklik — v3.8.0

`/api/v1/agents/tasks/*` və `/api/resilience/model-cooldowns` son nöqtələri **artıq idarəetmə autentifikasiyası tələb edir** (`588a0333` commit-i). Əvvəllər `manage` əhatə dairəsi olmadan adi API açarı göndərən müştərilər `403` cavabı alır. Miqrasiya: ya API Açarları idarə panelində açara `manage` əhatə dairəsi təyin edin, ya da giriş edilmiş idarə paneli sessiyasından istifadə edin.

## Davranış dəyişikliyi — v3.8.2

`/api/mcp/*` (uzaq MCP serveri) standart olaraq hələ də LOCAL_ONLY rejimindədir, lakin `Authorization: Bearer <api-key>` başlığı `manage` əhatə dairəsini ehtiva etdikdə artıq loopback olmayan sorğuları qəbul edir. Bu istisna `src/server/authz/routeGuard.ts` daxilindəki `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` vasitəsilə hər yol üçün ayrıca aktivləşdirilir; əlaqəli LOCAL_ONLY prefiksi olan `/api/cli-tools/runtime/*` qəsdən bu istisnaya daxil edilmir, çünki ixtiyari alt proseslər başlada bilər. Loopback olmayan mənbələrdən `/api/mcp/*` ünvanına göndərilən anonim sorğular yenə də `403 LOCAL_ONLY` qaytarır — istənilən yeni LOCAL_ONLY yolu üçün standart davranış ciddi loopback məhdudiyyəti olaraq qalır. Baxın: [Marşrut qoruyucusunun səviyyələri](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Sınaq

- Vahid testləri: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- İctimai icazə siyahısı: `tests/unit/public-api-routes.test.ts`.
- Fokuslanmış şəkildə işə salmaq üçün: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Sazlama

Konveyer cavablara həmişə aşağıdakı başlıqları əlavə edir:

```
x-request-id:               <korrelyasiya identifikatoru, xəta gövdələrində təkrarlanır>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Autentifikasiya edilmiş sorğular üçün yuxarı axındakı (işləyici tərəfindəki) sorğu başlıqlarına həmçinin aşağıdakılar daxildir:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<son-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ixtiyari)
x-omniroute-auth-scopes:    vergüllə ayrılmış siyahı
```

İşləyicilərin daxilində `assertAuth(req, expectedClass)` istifadə edin — aralıq proqram təminatı keçildikdə o, `AUTHZ_NOT_INITIALIZED` kodu ilə `AuthzAssertionError` xətası yaradır (testlərdə konfiqurasiya reqressiyalarını aşkar etmək üçün faydalıdır).

## Həmçinin baxın

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — hər son nöqtə üçün autentifikasiya markeri
- [COMPLIANCE.md](../security/COMPLIANCE.md) — autentifikasiya hadisələri üçün audit jurnalı
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — üç əhatə sahəsi ad məkanı və MCP alət-əhatə sahəsi kataloqu
- Mənbə: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
