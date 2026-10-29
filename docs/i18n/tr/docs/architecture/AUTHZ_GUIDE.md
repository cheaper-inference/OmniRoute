# Authorization Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Doğruluk Kaynağı:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Son Güncelleme:** 2026-09-22 — kapsam ad alanları `MCP-SERVER.md`'yi işaret ediyor

OmniRoute, her API isteğini denetleyen rota-farkındalıklı bir yetkilendirme hattına sahiptir. Sınıflandırma **deterministik** ve **kapalı-güvenli**dir — sınıflandırılamayan her şey `MANAGEMENT` olarak sonuçlanır ve bir oturum veya yönetim düzeyinde bir jeton gerektirir. Bu sayfa, rotaları sürdüren veya yeni uç noktalar tasarlayan mühendisler için modeli açıklar.

![Yetkilendirme hattı (3 rota sınıfı + politika değerlendirmesi)](../diagrams/exported/authz-pipeline.svg)

> Kaynak: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## İki Kimlik Doğrulama Modu

### 1. API Anahtarı (Bearer)

OpenAI/Anthropic/Gemini uyumlu istemci API'leri ve anahtarın `manage` kapsamına sahip olduğu bazı yönetim rotaları için kullanılır.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` içindeki `isValidApiKey()` / `extractApiKey()` tarafından doğrulanır ve `src/shared/utils/apiAuth.ts` üzerinden yeniden dışa aktarılır. Doğrulayıcı, kalıcı doğrudan geçiş anahtarları olarak `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ortam değişkenlerini de kabul eder (issue #1350).

### 2. Pano Oturumu (auth_token çerezi)

Pano sayfaları ve yönetici işlemleri için kullanılır.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Bir çerez yalnızca JWT doğrulamadan geçtiğinde **ve** `authenticated: true` taşıdığında oturum olarak kabul edilir
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Çerezin her
tüketicisi (pano rota koruması (`isDashboardSessionAuthenticated()`), yetkilendirme işlem hattı yenilemesi, WebSocket el sıkışması, canlı
sunucu, `/api/settings/require-login`, `/api/auth/status`) bu yardımcıdan geçer.
`JWT_SECRET` ile imzalanmış başka JWT'ler de vardır — Cursor CLI doğrudan geçişi, anahtar
sahipleri için `iss "omniroute" / aud "cursor-cli"` belirteçleri üretir — ve bunlar hiçbir zaman oturum
değildir (#13298).

`src/shared/utils/apiAuth.ts` içindeki `isDashboardSessionAuthenticated()` tarafından doğrulanır. İşlem hattı, 30 günlük kullanım ömrünün bitmesine 7 günden az kaldığında JWT'yi otomatik olarak yeniler.

Her belirteç üreticisi `mintDashboardSessionToken` üzerinden geçtiği (bir oluşturulma zamanı `iat` ve bir kimlik `jti`) ve doğrulayıcı iki ayarı denetlediği için bir oturum 30 günü dolmadan da sona erebilir: `sessionsValidAfter`, parola değiştirildiğinde ayarlanır ve böylece bu zamandan önce oluşturulan her oturumun doğrulanması durur (parolayı değiştiren tarayıcı yeni bir çerez alır); ayrıca `revokedDashboardSessions`, oturumu kapatılan oturumun `jti` değerinin `POST /api/auth/logout` tarafından eklendiği listedir. Daha eski bir sürüm tarafından oluşturulan oturumlar bu taleplerin hiçbirini taşımaz ve ilk parola değişikliğine kadar geçerli kalır. Ayarlar okunamazsa oturuma güvenilmez.

Bazı yönetim rotaları **her iki** modu da kabul eder: çerez VEYA API anahtarı `manage` (ya da `admin`) kapsamına sahip olduğunda `Bearer <key>`. v3.8'de eklenen "API çağrıları aracılığıyla yapılandırılabilir" iş akışını mümkün kılan budur.

#### İsteğe bağlı OIDC oturum açma geçidi (#6973)

Pano yönetici oturumu, varsayılan parola ile oturum açmanın yanında **isteğe bağlı** bir OIDC (OpenID Connect) akışını da
destekler — parola ile oturum açma hiçbir zaman kaldırılmaz, yalnızca
tamamlanır:

- `settings.oidcEnabled === true` **olmadıkça** ve `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` değerlerinin tümü yapılandırılmadıkça devre dışıdır
  (Ayarlar → Kimlik Doğrulama). Aksi durumda `GET /api/auth/oidc/login`, `400` döndürür.
- `GET /api/auth/oidc/login`, sağlayıcının
  `/.well-known/openid-configuration` adresinden `authorization_endpoint` değerini keşfeder
  (bulamazsa `<issuer>/authorize` kullanır), gelen istekten yönlendirme URI'sini oluşturur
  (`x-forwarded-proto` değerini dikkate alır) ve `httpOnly` özellikli bir `oidc_state`
  çerezinde saklanan rastgele bir `state` ile IdP'ye yönlendirir.
- `GET /api/auth/oidc/callback`, `state` değerini doğrular, yetkilendirme
  kodunu takas eder ve kimlik belirtecinin imzasını sağlayıcının JWKS'si üzerinden
  (`jose` kitaplığının `createRemoteJWKSet` işlevi; JWKS URI'si başına önbelleğe alınır)
  `issuer`/`audience` denetimleriyle doğrular. Pano erişimi için boş olmayan bir
  `oidcAllowedSubjects` listesi, bir `oidcAdmissionClaim` politikası veya her ikisi
  gerekir. Özne listesi, yalnızca `email_verified === true` olduğunda `sub` ya da
  `email` ile eşleşir. İsteğe bağlı talep politikası, noktayla ayrılmış bir kimlik
  belirteci talep yolu (örneğin `realm_access.roles`) ve kabul edilen değerlerden
  oluşan bir dizi alır; çözümlenen talep, kabul edilen değerlerden en az birini
  içeren bir dize dizisi olmalıdır. Her iki politika da yapılandırılmışsa
  ikisinin de başarılı olması gerekir. Eksik/hatalı biçimlendirilmiş talepler
  güvenli şekilde reddedilir ve hiçbir politika olmadan geri çağırma, oturum açmayı
  reddeder (`not_configured`). Yalnızca özneye dayalı mevcut yapılandırmalar
  değişmeden çalışmaya devam eder.
- Keycloak, realm rollerini normalde erişim belirteçlerine eşler; kimlik
  belirteçlerine eşlemesi zorunlu değildir. `admin` realm rolünü zorunlu kılmak
  için bu istemciye yönelik olarak **kimlik belirtecine** `realm_access.roles`
  ekleyen bir protokol eşleyici yapılandırın, ardından `oidcAdmissionClaim`
  değerini `{ "path": "realm_access.roles", "values": ["admin"] }` olarak ayarlayın.
  Yalnızca role dayalı erişimi etkinleştirmeden önce bu istemcinin gerçek kimlik
  belirteci talebini kontrol edin; uygulama erişim belirteci rollerini okumaz.
  IdP tarafında belirtecin reddedilmesi bu uygulama tarafı denetimini destekleyebilir,
  ancak onun yerini alamaz.
- Başarılı olduğunda, parola ile oturum açma işleminin oluşturduğu 30 günlük
  `auth_token` JWT'sinin **tam olarak aynısını** oluşturur
  (`src/app/api/auth/login/route.ts`); dolayısıyla pano oturum hattının geri kalanı
  (otomatik yenileme, çerez bayrakları) değişmeden kalır — OIDC yalnızca çerezin
  nasıl oluşturulduğunu değiştirir, çerezin verdiği yetkileri değil. IdP
  rollerinde/gruplarında yapılan değişiklikler mevcut OmniRoute oturumlarını
  geçersiz kılmaz; kullanım sürelerini hâlâ oturumu kapatma, parola değiştirme
  veya oturum süresinin dolması belirler.
- Her `oidc*` ayarı (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`),
  `SECURITY_IMPACTING_SETTINGS_KEYS` içinde yer alır
  (`src/shared/constants/securityImpactingSettings.ts`): gövde, yönetim
  parolasını `currentPassword` olarak taşımadığı sürece `PATCH /api/settings`,
  `400 PASSWORD_REQUIRED` yanıtı verir (parola yanlışsa `401 PASSWORD_MISMATCH`).
  `oidcDisablePasswordLogin`, parola ile _oturum açmayı_ (`POST /api/auth/login`)
  reddeder ancak saklanan parola özetini korur ve yeniden kimlik doğrulama,
  `currentPassword` değerini hâlâ bu özetle karşılaştırır.
- `corsOrigins` ve `bruteForceProtection` da `SECURITY_IMPACTING_SETTINGS_KEYS`
  içindedir: bunlardan herhangi birini gevşetmek oturum açma savunmalarını
  zayıflatır; bu nedenle aynı `currentPassword` ile yeniden kimlik doğrulamayı
  gerektirirler (Güvenlik sekmesi bunu ister) ve JSON içe aktarma işlemi bunları
  çıkarır.
- Tüm güvenlik politikası anahtarları — `SECURITY_IMPACTING_SETTINGS_KEYS`
  girdileri, her `oidc*` anahtarı ve pano oturum durumu — `PATCH /api/settings`
  üzerinde **yalnızca operatör** tarafından değiştirilebilir: `manage` kapsamlı
  bir API anahtarı veya bir `oma_` erişim belirteci, doğru `currentPassword`
  değerini gönderse bile `403` ile reddedilir ve bu ret,
  `reason: OPERATOR_REQUIRED` ile `settings.update_failed` olarak denetim kaydına
  alınır (`src/lib/api/operatorCredential.ts` içindeki
  `requireOperatorCredential()`). Sıradan ayarlar (tema, görüntüleme tercihleri),
  bir `manage` anahtarı veya bir `admin` erişim belirteciyle yazılabilir durumda
  kalır. `/api/settings` üzerindeki (ve `/api/settings/require-login` üzerindeki)
  her değişiklik ayrıca `admin` erişim belirteci kapsamını gerektirir
  (`src/server/authz/accessScopes.ts` içindeki `ADMIN_MUTATION_EXACT_PATHS`;
  tam yol eşleşmesi); `GET`, `read` olarak kalır ve diğer `/api/settings/*`
  alt yolları (proxy'ler, birleşim varsayılanları, model takma adları, sıkıştırma,
  temizlemeler…) yöntemden çıkarılan `write` kapsamını korur.
- `POST /api/settings/import-json`, bu yeniden kimlik doğrulamayı atlar; bu nedenle
  yazmadan önce `IMPORT_STRIPPED_SETTINGS_KEYS` içindeki (aynı dosya) tüm
  anahtarları çıkarır: parola ve `currentPassword`, tüm
  `SECURITY_IMPACTING_SETTINGS_KEYS` girdileri ve pano oturum durumu
  (`sessionsValidAfter`, `revokedDashboardSessions`). Bu nedenle eski bir
  yedeğin içe aktarılması, parola değişikliği veya oturumu kapatma işlemiyle
  sonlandırılmış bir oturumu yeniden etkinleştiremez.

## Rota Sınıfları

`src/server/authz/types.ts` üç sınıf tanımlar; deterministik olarak sınıflandırılamayan her rota `MANAGEMENT` sınıfına geri döner.

| Sınıf        | Açıklama                                                                                                                                                | Gerekli kimlik doğrulama                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `PUBLIC`     | Açıkça güvenli rotalar — giriş, çıkış, durum, başlatma, sağlık ve başlangıç kurulumu uç noktaları.                                                      | Yok                                                            |
| `CLIENT_API` | Model sunum uç noktaları — `/api/v1/*`, `/api/v1beta/*` ve takma adlar: `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Etkin `REQUIRE_API_KEY` özellik bayrağı açıksa Bearer anahtarı |
| `MANAGEMENT` | Kontrol paneli sayfaları, ayarlar, sağlayıcılar, anahtarlar, yönetim ve tanılama uç noktaları.                                                          | Kontrol paneli oturumu VEYA `manage` kapsamlı Bearer           |

Bazı `MANAGEMENT` işlemleri **yalnızca operatöre** özeldir: `manage` anahtarı yetmez. Saklanan kimlik bilgilerini dışa aktarmak (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), canlı verilerin üzerine bir yedeği geri yüklemek (`dryRun=true` dahil `POST /api/db-backups/import`, kimlikle geri yükleme `POST /api/db-backups` ve `POST /api/settings/import-json`) ve geri yükleme noktalarını yok etmek (`DELETE /api/db-backups` temizliği ve `PATCH /api/db-backups`, çünkü kalıcı hale getirdiği saklama süresi her yedeklemeden sonraki otomatik temizliği yönetir) bir kontrol paneli oturumu, yerel CLI öznesi veya devre dışı bırakılmış giriş gerektirir. Senkronizasyon token'ı üretmek (`POST /api/sync/tokens`) ve `admin` CLI erişim token'ı basmak (`POST /api/cli/tokens`) her giriş modunda kontrol paneli oturumu veya yerel CLI öznesi gerektirir. Her kapsamdaki API anahtarları ve `oma_` erişim token'ları operatör kimlik bilgisi değildir: gerektiğinde `403` alırlar. Denetim `src/lib/api/operatorCredential.ts` içinde yapılır (`resolveOperatorCredential()` / `requireOperatorCredential()`). Giriş ayarlarını değiştirmek de yalnızca operatöre özeldir: `POST /api/settings/require-login` (yönetim şifresini ayarlama / `requireLogin` değiştirme), bir şifre var olduktan sonra yalnızca bu kimlik bilgilerini kabul eder — ilk kurulum önyükleme penceresi (henüz şifre yoksa) değişmez — ve bir kontrol paneli oturumunun şifreyi değiştirmek için `currentPassword` göndermesi gerekir (eksik veya yanlışsa `403`, `settings.update_failed` olarak denetlenir). Yerel CLI ve girişi devre dışı bırakılmış bir örnek kurtarma yolunu korur ve şifreyi onsuz ayarlayabilir; çünkü ikisi de veri dizinine sahip ana makineye bağlıdır.

## İşlem Hattı

```
Gelen istek → src/proxy.ts
  → src/server/authz/pipeline.ts içindeki runAuthzPipeline()
    1. Güvenilir dahili üstbilgileri kaldır (x-omniroute-auth-*, x-omniroute-route-class)
    2. İstek kimliği oluştur, rotayı classifyRoute() aracılığıyla sınıflandır
    3. pathname == "/" ise → /dashboard adresine yönlendir
    4. İstekler boşaltılıyorsa (zarif kapatma) ve rota /api/* ise → 503
    5. GET dışındaki /api/* isteklerinde → checkBodySize() korumasını çalıştır
    6. OPTIONS ise → CORS ön kontrolü 204
    7. options.enforce == false ise → rota sınıfı üstbilgileriyle doğrudan geçir
    8. Aksi takdirde: POLICIES[routeClass].evaluate(ctx)
       - izin ver  → x-omniroute-auth-{kind,id,label,scopes} ekle → NextResponse.next()
       - reddet → correlation_id içeren JSON hatası (pano sayfaları → 302 /login)
```

Güvenilir dahili üstbilgiler (`src/server/authz/headers.ts` içinde tanımlanır), sınıflandırmadan önce **gelen isteklerden kaldırılır** — istemciler bir öznenin kimliğine bürünmek için `x-omniroute-auth-*` üstbilgilerini önceden dolduramaz.

### İlke sözleşmeleri

Her rota sınıfının `src/server/authz/policies/` içinde bir ilkesi vardır:

- **`publicPolicy`** (`policies/public.ts`) — her zaman `allow({ kind: "anonymous", id: "anonymous" })` döndürür.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer bilgisini çıkarır ve `validateApiKey()` aracılığıyla doğrular. Yalnızca etkin `REQUIRE_API_KEY` özellik bayrağı devre dışı olduğunda anonim erişime geri döner. Etkin bayrak, `isRequireApiKeyEnabled()` (`DB özellik bayrağı geçersiz kılması > process.env.REQUIRE_API_KEY > varsayılan`) aracılığıyla çözümlenir; böylece Pano Özellik Bayrakları ile ortam değişkenleri `/api/v1/*`, `/api/v1beta/*` ve takma adları tutarlı şekilde yönetir. Çözümleyici hatalarında erişim reddedilir. İstemci API rotalarında, pano model kataloğunun kullandığı `/api/v1/models` dâhil olmak üzere, pano oturumuna sahip isteklere izin verir.
- **`managementPolicy`** (`policies/management.ts`) — pano oturumunu ve dahili model eşitleme isteklerini (`/api/providers/[name]/(sync-models|models)` ile eşleştirilir) kabul eder veya `isAuthRequired()` false döndürürse denetimi tamamen atlar. Bearer belirteci mevcut ancak geçersiz olduğunda 403 (`AUTH_001`), aksi takdirde 401 döndürür. Ayrıca herhangi bir kimlik doğrulama dalından önce rota koruması katmanlarını (LOCAL_ONLY / ALWAYS_PROTECTED) uygular — bkz. [Rota Koruması Katmanları](../security/ROUTE_GUARD_TIERS.md). `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` içindeki LOCAL_ONLY yollarına (şu anda: `/api/mcp/`), Bearer anahtarı `manage` kapsamını taşıyorsa geri döngü dışındaki adreslerden erişilebilir; diğer tüm LOCAL_ONLY yolları, kapsamdan bağımsız olarak yalnızca geri döngü erişimine açık kalır.

Başarılı bir ilke, `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` değerine sahip bir `AuthSubject` döndürür. Alt akış işleyicileri, kimlik doğrulama mantığını yeniden çalıştırmak yerine `src/server/authz/assertAuth.ts` içindeki `assertAuth(request, "CLIENT_API")` aracılığıyla bu özneyi okuyabilir.

## Herkese Açık Rotalar Listesi

`src/shared/constants/publicApiRoutes.ts` açık izin listesidir:

Liste **şekle** göre ayrılmıştır ve bu ayrım güvenlik açısından kritiktir (GHSA-74g9-q8f6-793h): bir önek
`startsWith()` ile eşleştirildiğinden, baştaki karakterleri paylaşan tüm bitişik yollarla da eşleşir.
Önek olarak `/api/usage/om-usage`, `/api/usage/om-usage<anything>` biçimindeki tüm yolları HERKESE AÇIK olarak işaretledi ve Next bunu
kendi kimlik doğrulaması olmayan bir işleyici olan `/api/usage/[connectionId]` yoluna çözümler.

```ts
// Gerçek alt ağaçlar. Her girdi "/" ile BİTMELİDİR (bir birim testiyle doğrulanır).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify içinde CLIENT_API olarak değerlendirilir, "kimlik doğrulamasız herkese açık" olarak değil
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// TAM OLARAK eşleştirilen tekil rotalar (sonunda eğik çizgi olsa da olmasa da).
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

// CORS kaynağı gevşetmesinin de uygulandığı salt okunur tekil rotalar.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS gevşetmesi OLMAYAN salt okunur tekil rota.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Salt okunur rotalar **yalnızca** güvenli yöntemler için herkese açıktır. Not: `classifyRoute()`, `/api/v1/*` ve `/api/v1beta/*` yollarını PUBLIC geri dönüşünden hariç tutar — Bearer anahtarı politikasının uygulanmaya devam etmesi için bunlar her zaman `CLIENT_API` olur.

## Yeni Bir Rota Ekleme

### Kalıp 1 — Herkese açık istemci API uç noktası (Bearer kimlik doğrulaması)

`/api/v1/` ve `/api/v1beta/` altındaki rotalar otomatik olarak `CLIENT_API` şeklinde sınıflandırılır. Ara yazılım Bearer denetimini uygular; rota işleyicilerinin bunu tekrarlaması gerekmez, ancak yararlıysa özneyi okuyabilirler.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... işleyici mantığı
}
```

### Kalıp 2 — Yönetim uç noktası (oturum veya Bearer + manage)

`src/lib/api/requireManagementAuth.ts` dosyasındaki `requireManagementAuth()` işlevini kullanın:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... işleyici mantığı
}
```

`requireManagementAuth()`, başarı durumunda `null`, hata durumunda ise bir JSON `Response` döndürür:

- 401 `AUTH_001` "Kimlik doğrulaması gerekli" — hiçbir kimlik bilgisi yok
- 403 — geçersiz Bearer **veya** Bearer mevcut ancak anahtar `manage` / `admin` kapsamına sahip değil

`hasManageScope(scopes)`, `"manage"` veya `"admin"` için true döndürür.

### Kalıp 3 — Herkese açık izin listesine ekleme

Kümeyi kullanım kolaylığına göre değil, şekle göre seçin. Tek bir rota `PUBLIC_API_ROUTES_EXACT` kümesine (veya yalnızca GET için `PUBLIC_READONLY_CORS_API_ROUTES` listesine) eklenir; yalnızca gerçek bir alt ağaç `PUBLIC_API_ROUTE_PREFIXES` listesine eklenir ve `/` ile **bitmelidir**. Tek bir rotayı önek listesine eklemek, daha sonra eklenecek dinamik segmentli kardeşler de dahil olmak üzere, baştaki karakterlerini paylaşan tüm bitişik yolları da herkese açar (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ve `tests/unit/authz/classify.test.ts` dosyalarındaki birim testlerini güncelleyin.

## Kapsamlar

Üç ad alanı. Her denetleyici yalnızca kendi dizelerini okur. Yan yana karşılaştırma, `manage`'in `read:compression` için `scopeMatches`'i neden başarısız kıldığını ve bir `read` erişim belirtecinin neden `/api/keys/{id}` adresine `PATCH` yapamadığını içeren detaylar [Üç kapsam ad alanı](../frameworks/MCP-SERVER.md#three-scope-namespaces) bölümündedir.

API anahtarları bir `scopes` dizisi taşır (`api_keys.scopes` içinde JSON olarak saklanır, bkz. `src/lib/db/apiKeys.ts`).

### Yönetim kapsamı

- `manage` / `admin` — `hasManageScope`. Yönetim API rotalarına taşıyıcı erişimi.
- `mcp:connect`, `self:usage`, `self:account-quota` ve `policy:bypass-provider-quota` eklemeli tam eşleşen kapsamlardır. Bunlar `MANAGEMENT_API_KEY_SCOPES` dışında yer alır. `mcp:connect` yalnızca `/api/mcp/` döngüsel olmayan ayrılmış bölümünü açar.

### MCP araç kapsamları

Katalog ve eşleştirme kuralları (aynı dize veya `*` ile biten verilmiş bir kapsam): [MCP araç kapsamları](../frameworks/MCP-SERVER.md#mcp-tool-scopes). `src/shared/constants/mcpScopes.ts` içindeki `MCP_SCOPE_LIST`, tam katalog değil, orijinal yazılmış alt kümedir. Uygulama, `resolveCallerScopeContext()` MCP kimlik doğrulama bilgisinden, istek meta verilerinden veya `OMNIROUTE_MCP_SCOPES`'tan kapsamları çözümledikten sonra `open-sse/mcp-server/scopeEnforcement.ts` içinde çalışır. `OMNIROUTE_MCP_ENFORCE_SCOPES=true` olmadığı sürece kapalı kalır.

### Erişim belirteci kapsamları

`oma_live_…` belirteçlerinde `read` / `write` / `admin`, `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) tarafından sıralanır. Bu sıralama yalnızca erişim belirteci kimlik bilgisi için geçerlidir. Bkz. [Yönetim Kimlik Doğrulaması](../guides/MANAGEMENT-AUTH.md).

## Kimlik Doğrulama Gerekli Anahtarı

`src/shared/utils/apiAuth.ts` içindeki `isAuthRequired()`, bir istek için **herhangi bir** kimlik doğrulamanın zorunlu olup olmadığını belirler:

- `settings.requireLogin === false` → kimlik doğrulama genel olarak kapalıdır; ancak her zaman korunan katman ([Rota Koruma Katmanları](../security/ROUTE_GUARD_TIERS.md)) ve kabul edilen bir kimlik bilgisini veren çağrılar bunun dışındadır. Bunlar, girişin açık olduğu durumdaki ile aynı kimlik bilgisini ister: senkronizasyon token'ları vermek, her kapsamda CLI erişim token'ları basmak ve `manage`/`admin` kapsamlı API anahtarı oluşturmak, bu kapsamı bir anahtara vermek veya böyle bir anahtarı yeniden üretmek/göstermek (`src/lib/api/requireManagementAuth.ts` içindeki `requireCredentialForManagementScopedKey()`). Çıkarım amaçlı anahtarlar açık kalır.
- Yönetim şifresi yok **ve** `INITIAL_PASSWORD` ortam değişkeni yok → önyükleme modu: kurulum sihirbazına ve loopback isteklerine izin verilir, ancak dışarıdan gelen ağ isteklerinin yine kimlik bilgisi gerekir.
- Herhangi bir veritabanı hatası → kapalı durumda başarısız olur (güvenli varsayılan).

İstemci API anahtarı zorlaması, doğrudan `process.env.REQUIRE_API_KEY` okumak yerine `src/shared/utils/featureFlags.ts` içindeki `isRequireApiKeyEnabled()` fonksiyonunu kullanır. Bu, dağıtılmış örnekler için önemlidir: Kontrol Paneli → Özellik Bayrakları içinde `REQUIRE_API_KEY` değiştirmek bir DB geçersiz kılma kaydeder ve `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ve bu yardımcıyı paylaşan diğer istemci API kimlik denetimlerini anında etkiler. Özellik bayrağı deposu okunamıyorsa istemci API kimlik doğrulaması kapalı duruma geçer ve bir anahtar ister.

## Uyumluluğu Bozan Değişiklik — v3.8.0

`/api/v1/agents/tasks/*` ve `/api/resilience/model-cooldowns` uç noktaları **artık yönetim kimlik doğrulaması gerektirir** (`588a0333` commit'i). Daha önce `manage` kapsamı olmadan normal bir API anahtarı gönderen istemciler `403` yanıtı alır. Geçiş: API Keys panosunda anahtara `manage` kapsamını verin veya oturum açılmış bir dashboard oturumu kullanın.

## Davranış Değişikliği — v3.8.2

`/api/mcp/*` (uzak MCP sunucusu) varsayılan olarak hâlâ LOCAL_ONLY'dir; ancak `Authorization: Bearer <api-key>` üstbilgisi `manage` kapsamını taşıdığında artık geri döngü dışı istekleri kabul eder. Bu istisna, `src/server/authz/routeGuard.ts` içindeki `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` aracılığıyla yol başına açıkça denetlenir; aynı düzeydeki LOCAL_ONLY öneki `/api/cli-tools/runtime/*`, rastgele alt süreçler başlatabildiği için kasıtlı olarak atlanamaz. Geri döngü dışından `/api/mcp/*` yoluna yapılan anonim istekler `403 LOCAL_ONLY` döndürmeye devam eder — yeni LOCAL_ONLY yollar için varsayılan davranış, yalnızca geri döngüye kesin biçimde izin vermeye devam eder. Bkz. [Rota Koruması Düzeyleri](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Test

- Birim testleri: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Genel erişim izin listesi: `tests/unit/public-api-routes.test.ts`.
- Odaklanmış çalıştırma: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Hata Ayıklama

İşlem hattı, yanıtlara her zaman şu başlıkları ekler:

```
x-request-id:               <korelasyon kimliği, hata gövdelerinde yinelenir>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Kimliği doğrulanmış isteklerde yukarı akış (işleyici tarafındaki) istek başlıkları ayrıca şunları içerir:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<son-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (isteğe bağlı)
x-omniroute-auth-scopes:    virgülle ayrılmış liste
```

İşleyiciler içinde `assertAuth(req, expectedClass)` kullanın — ara yazılım atlandıysa `AUTHZ_NOT_INITIALIZED` koduyla bir `AuthzAssertionError` oluşturur (testlerde yapılandırma gerilemelerini yakalamak için yararlıdır).

## Ayrıca Bakınız

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — uç nokta başına kimlik doğrulama işaretçisi
- [COMPLIANCE.md](../security/COMPLIANCE.md) — kimlik doğrulama olayları için denetim günlüğü
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — üç kapsam ad alanı ve MCP araç kapsamı kataloğu
- Kaynak: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
