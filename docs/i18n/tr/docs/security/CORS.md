# CORS Configuration & Security (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute hangileri kontrol eder?**tarayıcı kökenleri** Kaynaklar arası yanıtları tek, merkezi bir izin verilenler listesinden okuyabilir. Model:**varsayılan olarak arızalı olarak kapatıldı** : Siz bir tanesini seçene kadar hiçbir kaynağa izin verilmez. Bu sayfa, izin verilenler listesinin nasıl çözümlendiğini, `CORS_ALLOW_ALL=true` gerçekte neyi açığa çıkardığını (ve daha da önemlisi ne yaptığını) belgeler.**Olumsuz** ), geliştirme ve üretimin güvenli bir şekilde nasıl yapılandırılacağı ve bir joker karakter etkin olduğunda kontrol panelinde gösterilen çalışma zamanı uyarısı.

**Gerçeğin kaynağı:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). İzin verilenler listesi bir kez uygulanır; ara yazılımda (`src/server/authz/pipeline.ts`) — rota başına işleyiciler `Access-Control-Allow-Origin` kendileri ayarlamaz.

## Bir köken nasıl çözümlenir?

Her istek için ara katman yazılımı `Access-Control-Allow-Origin` değerini şu sırayla hesaplar:

1. **`CORS_ALLOW_ALL=true`** (veya eski `CORS_ORIGIN=*`) → arayanın `Origin` (veya `Origin` başlığı olmadığında `*` ) `Vary: Origin` ile yansıtır, böylece önbellekler doğru kalır. Aynı `applyCorsHeaders()` geçiş noktası aynı zamanda belirteçle doğrulanmış `/v1*`/`/v1beta*` yüzeyindeki her 2xx gövdeli yanıtına `Vary: Accept-Encoding` ekler (`relaxForTokenAuth`, RFC 9110 §12.5.5, sayı #6737), böylece downstream/shared önbellekleri sıkıştırılmış ve sıkıştırılmamış değişkenleri doğru şekilde ayırt edebilir.
2. Aksi takdirde, `Origin` isteği normalleştirilir (küçük harfle yazılır, sondaki eğik çizgi çıkarılır) ve **birleştirilmiş izin verilenler listesi** :
   - çevre **`CORS_ALLOWED_ORIGINS`** — virgülle ayrılmış liste ve
   - çalışma zamanı **`corsOrigins`** ayarı (Dashboard → Security → _CORS Allowed Origins_), `src/lib/config/runtimeSettings.ts` `setRuntimeAllowedOrigins()` yoluyla enjekte edildi.
3. → eşleşme yok **hiçbir `Access-Control-Allow-Origin` başlığı yayınlanmıyor** . Tarayıcı çapraz kaynak okumayı engeller. Bu amaçlanan başarısızlıkla kapatılmış varsayılandır.

| Ortam değişkeni        | Anlam                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | İzin verilecek kesin kökenlerin CSV (önerilir).                                             |
| `CORS_ALLOW_ALL`       | `true`/`1` → herhangi bir kökeni (joker karakter) yansıtır. Yalnızca Dev.                   |
| `CORS_ORIGIN`          | Miras. `*` `CORS_ALLOW_ALL` gibi davranır; İzin verilenler listesine tek bir değer eklenir. |

## `CORS_ALLOW_ALL=true` gerçekte ortaya çıkardığı tehdit modeli —

Genel OWASP uyarısı ("joker karakter CORS = herhangi bir site API çağırabilir") ciddiye alınmaya değerdir, ancak OmniRoute teşhiri **genel durumdan daha dar** , somut bir uygulama gerçeği nedeniyle:

> **Merkezi `applyCorsHeaders()` hiçbir zaman `Access-Control-Allow-Credentials` yaymaz.** Sunucu `Access-Control-Allow-Credentials: true` göndermediği sürece bir tarayıcı _credentialed_ (çerez taşıyan) çapraz köken yanıtını göstermez. OmniRoute paylaşılan CORS yolu asla bunu yapmaz.

`CORS_ALLOW_ALL=true` ile bile yüzey başına bunun anlamı:

| Yüzey                                       | Kimlik doğrulama mekanizması   | CORS joker karakterinin etkisi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kontrol Paneli / MANAGEMENT `/api/*`        | Çerez oturumu                  | Origin is echoed, but **without `Allow-Credentials`** the browser **blocks** the credentialed read. Kötü niyetli bir çapraz kaynak sitesi **okuyamıyorum** kimliği doğrulanmış kontrol paneli yanıtlarınız ve oturum çerezi açığa çıkmaz.                                                                                                                                                                                                                                                                                                                                                    |
| Müşteri API `/v1/*`, `/v1beta/*`            | Taşıyıcı / `x-api-key` başlığı | Already permissive **by design** (`relaxForTokenAuth`): tarayıcılar hiçbir zaman `Authorization`/`x-api-key` otomatik olarak eklemez, dolayısıyla bir saldırganın sayfası anahtarınızı sağlayamaz. Rahat yankı, yalnızca bir kimlik bilgisi başlığı değil, kimliği doğrulanmış bir konu (doğrulanmış bir API anahtarı veya kontrol paneli oturumu) gerektirir ve hiçbir zaman `Access-Control-Allow-Credentials` içermez. Anonim yanıtlar (`REQUIRE_API_KEY=false`), açık bir `CORS_ALLOW_ALL=true` katılımı da dahil olmak üzere yapılandırılmış kaynak izin verilenler listesini kullanır. |
| Herkese açık salt okunur (`/api/health`, …) | Hiçbiri                        | Hassas olmayan; joker karakter zararsızdır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

Yani **residual** `CORS_ALLOW_ALL=true` maruz kalma aşağıdakilerle sınırlıdır: (a) kimlik bilgisi olmayan çapraz menşe **okur** Halihazırda kimliği doğrulanmamış verilerden yararlanma ve (b) CORS izin verme **ön kontrol geçişi** hala bir çapraz kaynak sayfasının sağlayamadığı kimlik doğrulamayı gerektiren — yönetim rotalarında. öyle **Olumsuz** paylaşılan CORS yolunda bir oturum ele geçirme veya kimlik bilgisi hırsızlığı vektörü.

### Gerçek bir istisna — `/api/v1/agents/`

Cloud-Agent rotaları (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) kendi **sahip olmak** CORS başlıkları (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ve **Yapmak** `Access-Control-Allow-Credentials: true` ile birlikte `Access-Control-Allow-Origin: <origin>|*` yayarlar. Bu, köken-yankı ve kimlik bilgilerinin bir arada var olduğu tek yüzeydir ve **`CORS_ALLOW_ALL` bağımsız** . Bu rotalar yönetim tarafından doğrulanmıştır (`requireManagementAuth`); Kontrol panelini ana bilgisayar dışında kullanıma sunan operatörler, yanıt başlıklarının çapraz kaynak kimlik bilgileri okumaya izin verdiği tek yerin burası olduğunun farkında olmalıdır. Açık bir izin verilenler listesiyle sınırlandırılması bu CORS kılavuzundan ayrı olarak izlenir.

## Üretim kontrol listesi

- **`CORS_ALLOW_ALL=true` asla üretime sokmayın.** Ayarlamadan bırakın.
- Bir ayarla **açık** kaynak listesi — ya env var ya da Güvenlik sekmesi alanı:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute bir ters proxy/tünel (nginx, Caddy, Cloudflare Tunnel, Tailscale) arkasında çalışıyorsa, CORS**Olumsuz** tek kontrolünüz — geridöngü rota koruması hala ortaya çıkma özellikli rotaları korur (bkz. [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ). Bir 403'ü "düzeltmek" için `X-Forwarded-For: 127.0.0.1` taklit etmeyin; bu, rota korumasının kapattığı RCE sınıfını yeniden açar.
- Çalışma zamanı durumunu onaylayın: kontrol panelinde bir **kalıcı kehribar rengi afiş** `CORS_ALLOW_ALL=true` canlı olduğunda Kontrol Paneli → Güvenliği → Yetkilendirme Envanteri altında ve `/api/settings/authz-inventory` izleme araçlarının yoklayabileceği bir `cors: { allowAll, allowedOrigins }` zarfı döndürür.

## Geliştirme kolaylığı — belirli yerel kökenlere izin verir

Geliştirme aşamasında bile joker karaktere nadiren ihtiyaç duyarsınız. Yalnızca kullandığınız geliştirme sunucularına izin verin:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Kökenler büyük/küçük harfe duyarlı olmayacak şekilde eşleştirilir ve sondaki eğik çizgi göz ardı edilir, dolayısıyla `http://localhost:3000` ve `http://localhost:3000/` eşdeğerdir. Aynı CSV çalışma zamanında da ayarlanabilir.**Kontrol Paneli → Güvenliği → CORS İzin Verilen Kaynaklar** yeniden başlatma olmadan.

## API anahtarları ve çerez oturumları karşılaştırması

- **Taşıyıcı / `x-api-key` ( `/v1/*` çıkarım yüzeyi):** tarayıcılar bunları asla otomatik olarak eklemez. CORS burada anlamlı bir engel değildir — API anahtarı, — engelidir ve bu nedenle bu yüzey, tarayıcı ve Electron istemcilerinin zaten yetki sahibi oldukları yanıtları okuyabilmeleri için kasıtlı olarak izin vericidir. Rahat yankı, yalnızca bir kimlik bilgisi başlığı değil, kimliği doğrulanmış bir konu (doğrulanmış bir API anahtarı veya kontrol paneli oturumu) gerektirir ve hiçbir zaman `Access-Control-Allow-Credentials` içermez. Anonim yanıtlar (`REQUIRE_API_KEY=false`), açık bir `CORS_ALLOW_ALL=true` katılımı da dahil olmak üzere yapılandırılmış kaynak izin verilenler listesini kullanır. Kimlik doğrulama redleri (401), istemcilerin iptal edilmiş veya yanlış yazılmış bir anahtarı (#5242) ortaya çıkarabilmesi için okunabilir kalır: boru hattının kendi 401'i yankıyı korur ve boru hattı ona anonim olarak hizmet verdikten sonra anahtarın kendisini reddeden bir rota (yönetim kimlik doğrulaması yapılandırılmış `/v1/models` ve `/v1beta/models`, sahip kapsamlı `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` ve otomatik açılan aday rotalar), bu 401'e yankıyı ekler `credentialRejectionHeaders()`. Eko, rotanın hangisinin kontrol edildiğine değil, bir kimlik bilgisi başlığı (`Authorization`, `x-api-key`, `x-goog-api-key` veya `auth_token` çerezi) taşıyan isteğe göre anahtarlanır ve hiçbir zaman `Access-Control-Allow-Credentials` ile eşleştirilmez; gövde sabit bir hata zarfıdır. `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) tarafından korunan `/api/v1/` altındaki yönetim yolları bu kimlik bilgisi reddi istisnasını kullanmaz: `REQUIRE_API_KEY=false` ile bunların 401/403 yanıtları yapılandırılmış CORS kaynak politikasını izler.
- **Çerez oturumu (kontrol paneli):** başarısızlıkla kapatılmış varsayılan tarafından korunuyor **Ve** paylaşılan yolda `Access-Control-Allow-Credentials` bulunmaması nedeniyle. management/dashboard kökenlerini herhangi bir izin verilen yapılandırmanın dışında tutun; tam olarak arıza durumunda kapalı kalmaları gerekir.

## WebSocket tokalaşmaları (`/v1/responses`, `/v1/ws`)

Tarayıcılar CORS WebSocket uygulamaz, bu nedenle çıkarım çıktısını döndüren WebSocket aktarımları el sıkışma `Origin` (`src/server/origin/wsOrigin.ts`) kontrol eder: Yanıtlar WebSocket (`/v1/responses`) ve OmniRoute, `npm start` / `npm run dev` üzerinden çalıştığında `/v1/chat/completions`, `/v1/messages` ve `/v1/responses` çerçeveler olarak aktaran `/v1/ws` ve `/api/v1/ws` köprüsü. Köprü, `/api/v1/ws?handshake=1` kararı istiyor ve o rota kontrolü yapmadığı sürece yükseltmeyi reddediyor. Kimlik doğrulama gereksinimleri hâlâ ayrı olarak geçerlidir. Menşe kontrolü şu durumlarda başarılı olur:

- `Origin` başlığı yoktur (Codex CLI, SDKs ve diğer tarayıcı olmayan istemciler);
- `Origin` yukarıdaki izin verilenler listesi tarafından kabul edilir (`CORS_ALLOWED_ORIGINS`, `corsOrigins` ayarı, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin` OmniRoute kendi genel kaynaklarından biridir (yapılandırılmış genel taban URL, güvenilir bir proxy'nin iletilen kaynağı veya IP değişmez değeri veya `localhost` — olarak kontrol paneli mutasyon kontrolünün kullandığı adayların aynısı olarak verilen doğrudan bir loopback/LAN ana bilgisayarı); veya
- HTTP `/v1/*` yüzeyinde olduğu gibi geçerli bir API anahtarı taşır.

Diğer her şey `403 ws_origin_forbidden` alır. Bir kontrol paneli oturumu çerezi yabancı `Origin` muaf tutmaz çünkü tarayıcı bunu herhangi bir sayfanın soketine bağlar. Başka bir bağlantı noktasındaki `localhost` aynı menşeli olarak değerlendirilmez; bu tür geliştirici kökenlerini `CORS_ALLOWED_ORIGINS` ekleyin.

## Örnek: OmniRoute önünde ters proxy

CORS OmniRoute kendisi tarafından uygulanır, dolayısıyla proxy genellikle **Olumsuz** `Access-Control-*` başlıklarını ekleyin veya yeniden yazın (çift başlıklar tarayıcıları bozar). TLS sonlandırın ve — iletin, OmniRoute ön kontrolü yanıtlamasına izin verin:

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

İzin verilen tarayıcı kökenlerini proxy'de değil, OmniRoute (`CORS_ALLOWED_ORIGINS` veya Güvenlik sekmesi) ayarlayın.

## Kaynak dosyalar

| Kaygı                                                  | Dosya                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| İzin verilenler listesi çözümü + `getCorsStatus()`     | `src/server/cors/origins.ts`                                         |
| Ara yazılım uygulaması (tek gerçek kaynak)             | `src/server/authz/pipeline.ts`                                       |
| Ayarlar → çalışma zamanı başlangıç noktası enjeksiyonu | `src/lib/config/runtimeSettings.ts`                                  |
| Kontrol panelinin çalışma zamanı durumu                | `src/app/api/settings/authz-inventory/route.ts`                      |
| Kontrol paneli uyarı banner'ı                          | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS İzin Verilen Kaynaklar alanı                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Rota başına Cloud-Agent CORS (istisna)                 | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket el sıkışma `Origin` kontrolü                 | `src/server/origin/wsOrigin.ts`                                      |

## Ayrıca bakınız

- [Rota Koruma Katmanları](./ROUTE_GUARD_TIERS.md) Yeniden oluşturulabilen rotalar için — geridöngü uygulaması (ayrı, tamamlayıcı bir kontrol).
- [Yetkilendirme Kılavuzu](../architecture/AUTHZ_GUIDE.md) — tam kimlik doğrulama hattı.
