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

OpenAI/Anthropic/Gemini uyumlu istemci API'leri ve anahtarın `manage` kapsamına sahip olduğu birkaç yönetim rotası için kullanılır.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` içindeki `isValidApiKey()` / `extractApiKey()` tarafından doğrulanır ve `src/shared/utils/apiAuth.ts` üzerinden yeniden dışa aktarılır. Doğrulayıcı, kalıcı geçiş anahtarları olarak `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ortam değişkenlerini de kabul eder (issue #1350).

### 2. Dashboard Oturumu (auth_token çerezi)

Dashboard sayfaları ve yönetici işlemleri için kullanılır.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Bir çerez, yalnızca JWT doğrulanıyor **ve** `authenticated: true` değerini taşıyorsa oturumdur
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Çerezin her tüketicisi (dashboard rota koruması (`isDashboardSessionAuthenticated()`), authz pipeline yenilemesi, WebSocket el sıkışması, canlı sunucu, `/api/settings/require-login`, `/api/auth/status`) bu yardımcı işlev üzerinden geçer.
`JWT_SECRET` ile imzalanan başka JWT'ler de vardır — Cursor CLI passthrough, anahtar sahipleri için
`iss "omniroute" / aud "cursor-cli"` token'ları üretir — ve bunlar hiçbir zaman oturum değildir
(#13298).

`src/shared/utils/apiAuth.ts` içindeki `isDashboardSessionAuthenticated()` tarafından doğrulanır. Pipeline, 30 günlük ömründe 7 günden az süre kaldığında JWT'yi otomatik olarak yeniler.

Bir oturum, 30 günü dolmadan da sona erebilir; çünkü her üretici `mintDashboardSessionToken` üzerinden geçer (bir issue zamanı `iat` ve bir kimlik `jti` eklenir) ve doğrulayıcı iki ayarı kontrol eder: Bir parola değişikliğiyle ayarlanan `sessionsValidAfter`, böylece bu zamandan önce oluşturulan her oturum doğrulanamaz hâle gelir (parolayı değiştiren tarayıcı yeni bir çerez alır) ve `POST /api/auth/logout` tarafından oturumu kapatılan oturumun `jti` değerinin eklendiği `revokedDashboardSessions`. Daha eski bir sürüm tarafından oluşturulan oturumlar bu claim'lerin hiçbirini taşımaz ve ilk parola değişikliğine kadar geçerli kalır. Ayarlar okunamazsa oturuma güvenilmez.

Bazı yönetim rotaları **her iki** modu kabul eder: Çerez **veya**, API anahtarı `manage` (ya da `admin`) kapsamına sahip olduğunda, `Bearer <key>`. Bu, v3.8'de eklenen "API çağrılarıyla yapılandırılabilir" iş akışını etkinleştirir.

#### İsteğe bağlı OIDC giriş kapısı (#6973)

Dashboard yönetici girişi, varsayılan parola girişinin yanında **isteğe bağlı olarak etkinleştirilen** bir OIDC (OpenID Connect) akışını da destekler — parola girişi hiçbir zaman kaldırılmaz, yalnızca
tamamlanır:

- `settings.oidcEnabled === true` **ve** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` öğelerinin tümü yapılandırılmadıkça devre dışıdır (Ayarlar → Kimlik Doğrulama).
  Aksi durumda `GET /api/auth/oidc/login` `400` döndürür.
- `GET /api/auth/oidc/login`, sağlayıcının `/.well-known/openid-configuration` adresinden
  `authorization_endpoint` değerini keşfeder (başarısız olursa
  `<issuer>/authorize` adresine geri döner), gelen istekten (`x-forwarded-proto` dikkate alınarak)
  yönlendirme URI'sini oluşturur ve rastgele bir `state` değerini
  `httpOnly` `oidc_state` çerezinde saklayarak IdP'ye yönlendirir.
- `GET /api/auth/oidc/callback`, `state` değerini doğrular, yetkilendirme
  kodunu değiş tokuş eder ve ID token imzasını sağlayıcının JWKS'si üzerinden
  (`jose`'un `createRemoteJWKSet` işleviyle, JWKS URI'si başına önbelleğe alınarak)
  `issuer`/`audience` kontrolleriyle doğrular. Dashboard'a erişim için boş olmayan bir
  `oidcAllowedSubjects` listesi, bir `oidcAdmissionClaim` ilkesi veya her ikisi
  gereklidir. Konu listesi, yalnızca `email_verified === true` olduğunda `sub` veya
  `email` ile eşleşir. İsteğe bağlı claim ilkesi, noktayla ayrılmış bir ID-token claim
  yolu (örneğin, `realm_access.roles`) ve kabul edilen değerlerden oluşan bir dizi
  alır; çözümlenen claim, kabul edilen değerlerden en az birini içeren bir dize dizisi
  olmalıdır. Her iki ilke de yapılandırılmışsa ikisi de geçmelidir. Eksik veya hatalı
  claim'ler güvenli şekilde reddedilir ve iki ilkeden hiçbiri olmadan callback oturum
  açmayı reddeder (`not_configured`). Yalnızca konuya dayalı mevcut yapılandırmalar
  değişmeden çalışmaya devam eder.
- Keycloak, realm rollerini normalde ID token'larına değil, erişim token'larına
  eşler. Realm `admin` rolünü zorunlu kılmak için bu istemciye, `realm_access.roles`
  değerini **ID token'ına** dahil eden bir protokol eşleyicisi yapılandırın ve ardından
  `oidcAdmissionClaim` değerini `{ "path": "realm_access.roles", "values": ["admin"] }`
  olarak ayarlayın. Yalnızca role dayalı erişimi etkinleştirmeden önce bu istemci için
  gerçek ID-token claim'ini kontrol edin; uygulama erişim token'larındaki rolleri
  okumaz. IdP tarafındaki token reddi bu kontrolü tamamlayabilir, ancak uygulama
  tarafındaki kontrolün yerini tutmaz.
- Başarılı olduğunda, parola ile oturum açmanın verdiği **tam olarak aynı** 30 günlük
  `auth_token` JWT'sini (`src/app/api/auth/login/route.ts`) üretir. Bu nedenle dashboard
  oturumunun geri kalan işlem hattı (otomatik yenileme, çerez işaretleri) değişmeden
  kalır — OIDC yalnızca çerezin nasıl üretildiğini değiştirir, sağladığı yetkileri değil.
  IdP rollerinde/gruplarında yapılan değişiklikler mevcut OmniRoute oturumlarını geçersiz
  kılmaz; oturum kapatma, parola döndürme veya oturum süresinin dolması yaşam sürelerini
  belirlemeye devam eder.
- Her `oidc*` ayarı (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`),
  `SECURITY_IMPACTING_SETTINGS_KEYS` içinde yer alır
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`,
  gövde yönetim parolasını `currentPassword` olarak taşımadıkça `400 PASSWORD_REQUIRED`
  döndürür (parola yanlış olduğunda `401 PASSWORD_MISMATCH`). `oidcDisablePasswordLogin`,
  parola _ile oturum açmayı_ (`POST /api/auth/login`) reddeder ancak kayıtlı parola
  özetini korur ve yeniden kimlik doğrulama hâlâ `currentPassword` değerini bununla
  karşılaştırır.
- `corsOrigins` ve `bruteForceProtection` da `SECURITY_IMPACTING_SETTINGS_KEYS`
  içinde yer alır: ikisinden birini gevşetmek oturum açma savunmalarını zayıflatır.
  Bu nedenle aynı `currentPassword` yeniden kimlik doğrulamasını gerektirirler
  (Güvenlik sekmesi bunu ister) ve JSON içe aktarma işlemi bunları atar.
- Her güvenlik ilkesi anahtarı — `SECURITY_IMPACTING_SETTINGS_KEYS` girdileri,
  her `oidc*` anahtarı ve dashboard oturum durumu — `PATCH /api/settings` üzerinde
  **yalnızca operatöre özeldir**: manage kapsamlı bir API anahtarı veya `oma_` erişim
  token'ı, doğru `currentPassword` değerini gönderse bile `403` ile reddedilir ve
  ret, `reason: OPERATOR_REQUIRED` (`src/lib/api/operatorCredential.ts` içindeki
  `requireOperatorCredential()`) ile `settings.update_failed` olarak denetlenir.
  Sıradan ayarlar (tema, görüntüleme tercihleri), bir `manage` anahtarı veya
  `admin` erişim token'ı ile yazılabilir olmaya devam eder. `/api/settings` üzerindeki
  her değişiklik (ve `/api/settings/require-login` üzerindeki değişiklik) ayrıca
  `admin` erişim token'ı kapsamını gerektirir
  (`src/server/authz/accessScopes.ts` içindeki `ADMIN_MUTATION_EXACT_PATHS`, tam yol
  eşleşmesi); `GET` işlemi `read` olarak kalır ve diğer `/api/settings/*` alt yolları
  (proxy'ler, combo varsayılanları, model takma adları, sıkıştırma, temizlemeler…)
  yönteme göre çıkarılan `write` kapsamını korur.
- `POST /api/settings/import-json` bu yeniden kimlik doğrulamayı atlar; bu nedenle
  yazma işleminden önce `IMPORT_STRIPPED_SETTINGS_KEYS` içindeki her anahtarı (aynı
  dosyada) atar: parola ve `currentPassword`, `SECURITY_IMPACTING_SETTINGS_KEYS`
  içindeki her girdi ve dashboard oturum durumu
  (`sessionsValidAfter`, `revokedDashboardSessions`). Daha eski bir yedeğin içe
  aktarılması bu nedenle parola değişikliği veya oturum kapatma ile sonlandırılmış bir
  oturumu yeniden etkinleştiremez.

#### İsteğe bağlı TOTP iki faktörlü oturum açma (#16619)

Ayarlar → Güvenlik bölümünden kaydedilir; operatör etkinleştirene kadar kapalıdır
(`src/server/auth/dashboardMfa.ts`).

- **Kapsadığı konular:** parola ile giriş (`POST /api/auth/login`, ardından
  `POST /api/auth/mfa/verify` gerektirir) ve `omniroute connect` (`POST /api/cli/connect`,
  yalnızca parolayla yapılan bir alışverişi reddeder ve kodu `totp` olarak alır).
- **Kapsamadığı konular:** OIDC / SSO ile oturum açma (`/api/auth/oidc/callback`),
  OmniRoute TOTP'sini sormaz. Kimlik sağlayıcının kendi ikinci faktörüne dayanır;
  bu nedenle OIDC etkinse MFA'yı IdP'de zorunlu kılın.
- **Kurtarma** (cihazın kaybolması, kurtarma kodlarının tükenmesi veya örneğin
  `STORAGE_ENCRYPTION_KEY` değiştirildikten sonra bir faktörün artık
  doğrulanamaması durumunda):
  1. Sunucuyu `OMNIROUTE_DISABLE_MFA=true` ile yeniden başlatın.
  2. Doğrudan ana makinede (loopback eş ve `http://localhost:20128` gibi
     loopback `Host` ile) parolayla oturum açın. İkinci faktör yalnızca bu
     kaynak için atlanır; diğer tüm kaynaklar yine de kodu gerektirir.
  3. Ayarlar → Güvenlik → Devre Dışı Bırak bölümünde parolayı girin ve kodu
     boş bırakın. `POST /api/auth/mfa/disable`, yalnızca değişken ayarlanmışken
     ve istek ana makineden geldiğinde `code` içermeyen bir gövdeyi kabul eder;
     yine de pano oturumu ile geçerli parolayı gerektirir ve
     `secondFactor: "recovery_switch"` ile `auth.mfa.disabled` olarak denetlenir.
  4. `OMNIROUTE_DISABLE_MFA` ayarını kaldırın, yeniden başlatın ve gerekirse
     yeniden kaydolun.

## Rota Sınıfları

`src/server/authz/types.ts` üç sınıfı tanımlar; Belirleyici olarak sınıflandırılamayan herhangi bir rota `MANAGEMENT` geri döner.

| Sınıf        | Tanım                                                                                                                                                         | Yetkilendirme gerekli                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `PUBLIC`     | Açıkça güvenli rotalar — giriş, çıkış, durum, sağlık, başlangıç önyüklemesi.                                                                                  | Hiçbiri                                                                         |
| `CLIENT_API` | Model hizmet veren uç noktalar — `/api/v1/*`, `/api/v1beta/*` ve `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` takma adları. | Etkili `REQUIRE_API_KEY` özellik bayrağı etkinleştirildiğinde taşıyıcı anahtarı |
| `MANAGEMENT` | Kontrol paneli sayfaları, ayarlar, sağlayıcılar, anahtarlar, yönetici ve teşhis uç noktaları.                                                                 | `manage` kapsamına sahip kontrol paneli oturumu OR Taşıyıcısı                   |

Birkaç `MANAGEMENT` eylemi** yalnızca operatör** : `manage` anahtarı yeterli değil. Saklanan kimlik bilgilerini dışarı aktarmak (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`), canlı veriler üzerinden bir yedeği geri yüklemek (`POST /api/db-backups/import` dahil `dryRun=true`, `POST /api/db-backups` kimliğe göre geri yükleme, `POST /api/settings/import-json`), geri yükleme noktalarını yok etmek (`DELETE /api/db-backups` temizleme ve `PATCH /api/db-backups` çünkü devam eden saklama her yedeklemeden sonra otomatik budamayı tetikler) bir kontrol paneli oturumu, yerel CLI konusu veya oturum açmanın devre dışı bırakılmasını gerektirir. Bir senkronizasyon belirteci (`POST /api/sync/tokens`) vermek ve bir `admin` CLI erişim belirtecini (`POST /api/cli/tokens`) basmak, her oturum açma modunda bir kontrol paneli oturumu veya yerel CLI konusu gerektirir. Herhangi bir kapsamın API anahtarları ve `oma_` erişim belirteçleri, operatör kimlik bilgileri değildir: gerektiğinde `403` alırlar. Çek `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) içinde yaşıyor. Oturum açma ayarlarının değiştirilmesi de yalnızca operatöre yöneliktir: `POST /api/settings/require-login` (yönetim şifresini ayarlayın / `requireLogin` değiştirin) yalnızca bir şifre mevcut olduğunda bu kimlik bilgilerini kabul eder — ilk çalıştırma önyükleme penceresi (henüz şifre yok) değiştirilmedi — ve bir kontrol paneli oturumunun şifreyi değiştirmek için `currentPassword` göndermesi gerekir ( eksik veya yanlış olduğunda `403`, `settings.update_failed` olarak denetlenir). Yerel CLI ve oturum açma özelliği devre dışı bırakılmış bir örnek, kurtarma yolunu korur ve her ikisi de veri dizininin sahibi olan ana bilgisayara bağlı olduğundan, bu yol olmadan bir parola belirleyebilir.

## Boru hattı

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

Güvenilir dahili başlıklar ( `src/server/authz/headers.ts` tanımlanmıştır)** gelen isteklerden çıkarıldı** sınıflandırmadan önce — istemcileri bir öznenin kimliğine bürünmek için `x-omniroute-auth-*` önceden dolduramaz.

### Politika sözleşmeleri

Her rota sınıfının `src/server/authz/policies/` bir politikası vardır:

- **`publicPolicy`** (`policies/public.ts`) — her zaman `allow({ kind: "anonymous", id: "anonymous" })` değerini döndürür.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Taşıyıcıyı çıkarır, `validateApiKey()` aracılığıyla doğrular. Yalnızca etkili `REQUIRE_API_KEY` özelliği bayrağı devre dışı bırakıldığında anonim hale gelir. Etkin bayrak `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) aracılığıyla çözümlenir, böylece Kontrol Paneli Özellik Bayrakları ve ortam değişkenleri `/api/v1/*`, `/api/v1beta/*` ve takma adları tutarlı bir şekilde yönetir; çözümleyici hataları başarısız bir şekilde kapatılır. İstemci API rotalarında kontrol paneli oturumu isteklerine izin verir (pano modeli kataloğu tarafından kullanılan `/api/v1/models` dahil). Entra ID SSO etkinleştirildiğinde, yapısal olarak bir Entra belirteci olan bir Taşıyıcı (üç base64url bölümü, `RS*` alg, `kid`), SSO dalı tarafından işlenir** önce** `validateApiKey()` ve onun kararı nihaidir, — hiçbir zaman API anahtarı yoluna veya anonim şubeye düşmez, dolayısıyla kimlik sağlayıcı kesintisi açık erişime dönüşemez. Statik API anahtarları etkilenmez. Bkz. [Entra ID SSO](../security/ENTRA_SSO.md).
- **`managementPolicy`** (`policies/management.ts`) — kontrol paneli oturumunu, dahili model senkronizasyonu isteklerini ( `/api/providers/[name]/(sync-models|models)` ile eşleşen) kabul eder veya `isAuthRequired()` false değerini döndürürse tamamen atlar. Bir Taşıyıcı belirteci mevcut ancak geçersiz olduğunda 403 (`AUTH_001`), aksi durumda 401 değerini döndürür. Ayrıca herhangi bir kimlik doğrulama dalından önce rota koruma katmanlarını (LOCAL_ONLY / ALWAYS_PROTECTED) uygular — bkz. [Rota Koruma Katmanları](../security/ROUTE_GUARD_TIERS.md). Taşıyıcı anahtarı `manage` kapsamını taşıdığında, `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (bugün: `/api/mcp/`) LOCAL_ONLY yollarına geri döngüsüz olarak erişilebilir; diğer tüm LOCAL_ONLY yolları kapsamdan bağımsız olarak katı geri döngü olarak kalır.

Başarılı bir politika `AuthSubject` `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ile döndürür. Aşağı akış işleyicileri, kimlik doğrulama mantığını yeniden çalıştırmak yerine `src/server/authz/assertAuth.ts` `assertAuth(request, "CLIENT_API")` aracılığıyla okuyabilir.

## Genel Rotalar Listesi

`src/shared/constants/publicApiRoutes.ts` açık izin verilenler listesidir:

Liste şu şekilde bölünmüştür:** şekil** ve bölme yük taşır (GHSA-74g9-q8f6-793h): bir önek `startsWith()` ile eşleştirilir, böylece baş karakterlerini paylaşan her bitişik yolla da eşleşir. `/api/usage/om-usage` `/api/usage/om-usage<anything>` PUBLIC olarak işaretlenmiş bir önek olarak kullanır ve Next, bunu kendi kimlik doğrulaması olmayan bir işleyici olan `/api/usage/[connectionId]` — çözümler.

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

Salt okunur rotalar herkese açıktır** sadece** Güvenli yöntemler için. Not: `classifyRoute()` `/api/v1/*` ve `/api/v1beta/*` PUBLIC geçiş — hariç tutar; bunlar her zaman `CLIENT_API`, dolayısıyla Taşıyıcı anahtar politikası hala geçerlidir.

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

## Kimlik Doğrulaması Gerekli Geçiş

`src/shared/utils/apiAuth.ts` `isAuthRequired()` karar verir** herhangi** auth bir istek için uygulanır:

- `settings.requireLogin === false` → kimlik doğrulaması, her zaman korunan katman (bkz. [Rota Koruma Katmanları](../security/ROUTE_GUARD_TIERS.md) ) ve oturum açma sırasındakiyle aynı kimlik bilgilerine ihtiyaç duyan, kabul ettiği bir kimlik bilgisini dağıtan çağrılar dışında genel olarak devre dışıdır: senkronizasyon belirteçleri yayınlama, herhangi bir kapsamda CLI erişim belirteçlerini basma ve `manage`/`admin` kapsamıyla bir API anahtarı oluşturma, bu kapsamı bir anahtara verme veya böyle bir anahtarı yeniden oluşturma veya açığa çıkarma (`requireCredentialForManagementScopedKey()` ) `src/lib/api/requireManagementAuth.ts`). Yalnızca çıkarım anahtarları açık kalır. Korumalı bir özellik bayrağı (`REQUIRE_API_KEY`, diğer Güvenlik bayrakları ve [Özellik Bayraklarında](../reference/FEATURE_FLAGS.md#rest-api) listelenen SSRF / TLS / MCP-scope / sandbox bayrakları) yazmak ve PII maskeleme ayarlarını (`PUT /api/settings/pii`) kaydetmek de bir kimlik bilgisi gerektirmeye devam eder.
- Şifre yapılandırılmadı** Ve** no `INITIAL_PASSWORD` env var → önyükleme modu, ekleme sihirbazına ve geridöngü isteklerine izin verir, ancak açığa çıkan ağ isteklerinin yine de kimlik bilgilerine ihtiyacı vardır. İstisna: korumalı bir özellik bayrağı yazmak ve PII maskeleme ayarlarını (`PUT /api/settings/pii`) kaydetmek, geri döngüden bile bir kimlik bilgisi gerektirir, bu nedenle geri döngü tek başına burada yeterli değildir.
- Herhangi bir DB hatası → kapatılamaz (varsayılan olarak güvenlidir).

İstemci API anahtar uygulaması, doğrudan `process.env.REQUIRE_API_KEY` okumasını değil, `src/shared/utils/featureFlags.ts` `isRequireApiKeyEnabled()` kullanır. Bu, konuşlandırılan örnekler için önemlidir: Kontrol Paneli → Özellik Bayraklarında `REQUIRE_API_KEY` değiştirmek, bir DB geçersiz kılmayı depolar ve `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ve bu yardımcıyı paylaşan diğer istemci API kimlik doğrulama kontrollerini anında etkiler. Özellik bayrağı deposu okunamıyorsa istemci API kimlik doğrulaması başarısız olur ve bir anahtar gerektirir.

## Uyumluluğu Bozan Değişiklik — v3.8.0

`/api/v1/agents/tasks/*` ve `/api/resilience/model-cooldowns` uç noktaları **artık yönetim kimlik doğrulaması gerektirir** (`588a0333` commit'i). Daha önce `manage` kapsamı olmadan normal bir API anahtarı gönderen istemciler `403` yanıtı alır. Geçiş: API Keys panosunda anahtara `manage` kapsamını verin veya oturum açılmış bir dashboard oturumu kullanın.

## Davranış Değişikliği — v3.8.2

`/api/mcp/*` (uzak MCP sunucusu) varsayılan olarak hâlâ LOCAL_ONLY'dir; ancak `Authorization: Bearer <api-key>` üstbilgisi `manage` kapsamını taşıdığında artık geri döngü dışı istekleri kabul eder. Bu istisna, `src/server/authz/routeGuard.ts` içindeki `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` aracılığıyla yol başına açıkça denetlenir; aynı düzeydeki LOCAL_ONLY öneki `/api/cli-tools/runtime/*`, rastgele alt süreçler başlatabildiği için kasıtlı olarak atlanamaz. Geri döngü dışından `/api/mcp/*` yoluna yapılan anonim istekler `403 LOCAL_ONLY` döndürmeye devam eder — yeni LOCAL_ONLY yollar için varsayılan davranış, yalnızca geri döngüye kesin biçimde izin vermeye devam eder. Bkz. [Rota Koruması Düzeyleri](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Test

- Birim testleri: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Genel erişim izin listesi: `tests/unit/public-api-routes.test.ts`.
- Odaklanmış çalıştırma: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Hata ayıklama

İşlem hattı yanıtları her zaman şununla damgalar:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Kimliği doğrulanmış istekler için yukarı akış (işleyici tarafı) istek başlıkları ayrıca şunları içerir:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

— işleyicilerinin içinde `assertAuth(req, expectedClass)` kullanın, eğer ara yazılım atlanırsa `AUTHZ_NOT_INITIALIZED` koduyla `AuthzAssertionError` atar (testlerde yapılandırma gerilemelerini yakalamak için faydalıdır).

## Ayrıca Bakınız

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — uç nokta başına kimlik doğrulama işaretçisi
- [COMPLIANCE.md](../security/COMPLIANCE.md) — kimlik doğrulama olayları için denetim günlüğü
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — üç kapsam ad alanı ve MCP araç kapsamı kataloğu
- Kaynak: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
