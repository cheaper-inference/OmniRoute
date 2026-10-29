# CORS Configuration & Security (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute, hangi **tarayıcı origin'lerinin** origin'ler arası yanıtları okuyabileceğini tek ve merkezi bir izin listesi üzerinden denetler. Model, **varsayılan olarak erişimi reddeder**: siz açıkça izin verene kadar hiçbir origin'e izin verilmez. Bu sayfa; izin listesinin nasıl çözümlendiğini, `CORS_ALLOW_ALL=true` ayarının gerçekte neleri erişime açtığını (ve daha da önemlisi neleri **açmadığını**), geliştirme ve üretim ortamlarının güvenli biçimde nasıl yapılandırılacağını ve wildcard etkin olduğunda dashboard'da gösterilen çalışma zamanı uyarısını açıklar.

**Doğruluğun kaynağı:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`). İzin listesi middleware'de (`src/server/authz/pipeline.ts`) yalnızca bir kez uygulanır — her route'a özgü handler'lar `Access-Control-Allow-Origin` değerini kendileri ayarlamaz.

## Bir origin nasıl çözümlenir?

Middleware, her istek için `Access-Control-Allow-Origin` değerini şu sırayla hesaplar:

1. **`CORS_ALLOW_ALL=true`** (veya eski `CORS_ORIGIN=*`) → çağrıyı yapanın `Origin` değerini geri yansıtır (`Origin` header'ı yoksa `*`) ve cache'lerin doğru kalması için `Vary: Origin` ekler. Aynı `applyCorsHeaders()` kontrol noktası ayrıca token ile kimliği doğrulanan `/v1*`/`/v1beta*` yüzeyindeki gövdeli tüm 2xx yanıtlara `Vary: Accept-Encoding` ekler (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737); böylece sonraki katmandaki/paylaşılan cache'ler sıkıştırılmış ve sıkıştırılmamış varyantları doğru şekilde ayırt edebilir.
2. Aksi takdirde isteğin `Origin` değeri normalize edilir (küçük harfe dönüştürülür, sondaki eğik çizgi kaldırılır) ve **birleştirilmiş izin listesiyle** eşleştirilir:
   - env **`CORS_ALLOWED_ORIGINS`** — virgülle ayrılmış liste ve
   - `src/lib/config/runtimeSettings.ts` içindeki `setRuntimeAllowedOrigins()` aracılığıyla enjekte edilen çalışma zamanı **`corsOrigins`** ayarı (Dashboard → Security → _CORS Allowed Origins_).
3. Eşleşme yoksa → **`Access-Control-Allow-Origin` header'ı gönderilmez**. Tarayıcı, origin'ler arası okumayı engeller. Bu, erişimi varsayılan olarak reddeden, amaçlanan davranıştır.

| Env değişkeni          | Anlamı                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | İzin verilecek tam origin'lerin CSV listesi (önerilir).                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → herhangi bir origin'i geri yansıt (wildcard). Yalnızca geliştirme için. |
| `CORS_ORIGIN`          | Eski. `*`, `CORS_ALLOW_ALL` gibi davranır; tek bir değer izin listesine eklenir.     |

## Tehdit modeli — `CORS_ALLOW_ALL=true` gerçekte neleri erişime açar?

Genel OWASP uyarısını ("wildcard CORS = herhangi bir site API'nizi çağırabilir") ciddiye almak gerekir; ancak somut bir uygulama ayrıntısı nedeniyle OmniRoute'un maruz kaldığı risk **genel duruma göre daha sınırlıdır**:

> **Merkezi `applyCorsHeaders()` hiçbir zaman
> `Access-Control-Allow-Credentials` göndermez.** Sunucu
> `Access-Control-Allow-Credentials: true` göndermediği sürece tarayıcı, _kimlik
> bilgileri içeren_ (cookie taşıyan) origin'ler arası bir yanıtı erişime açmaz.
> OmniRoute'un paylaşılan CORS yolu bunu hiçbir zaman yapmaz.

`CORS_ALLOW_ALL=true` kullanıldığında bile bunun her yüzey için anlamı şöyledir:

| Yüzey                                       | Kimlik doğrulama mekanizması | Wildcard CORS'un etkisi                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`             | Cookie session               | Origin geri yansıtılır; ancak **`Allow-Credentials` olmadan** tarayıcı, kimlik bilgileri içeren okumayı **engeller**. Kötü amaçlı, origin'ler arası bir site kimliği doğrulanmış dashboard yanıtlarınızı **okuyamaz** ve session cookie'si açığa çıkmaz.                                                                                                                                                |
| Client API `/v1/*`, `/v1beta/*`             | Bearer / `x-api-key` header  | Zaten **tasarım gereği** izin vericidir (`relaxForTokenAuth`): tarayıcılar `Authorization`/`x-api-key` değerini hiçbir zaman otomatik olarak eklemez, dolayısıyla saldırganın sayfası anahtarınızı sağlayamaz. Origin yansıtma yalnızca sunulan anahtar doğrulandığında uygulanır; anonim yanıtlar (`REQUIRE_API_KEY=false`) izin listesine tabi kalır. `CORS_ALLOW_ALL` bunu daha geniş hâle getirmez. |
| Herkese açık salt okunur (`/api/health`, …) | Yok                          | Hassas değildir; wildcard zararsızdır.                                                                                                                                                                                                                                                                                                                                                                  |

Dolayısıyla `CORS_ALLOW_ALL=true` ayarından kaynaklanan **artık** risk şunlarla sınırlıdır: (a) zaten kimlik doğrulaması gerektirmeyen verilerin, kimlik bilgileri içermeyen origin'ler arası **okumaları** ve (b) yönetim route'larında CORS **preflight isteğinin geçmesine** izin verilmesi — bu route'lar yine de origin'ler arası bir sayfanın sağlayamayacağı kimlik doğrulamasını gerektirir. Paylaşılan CORS yolunda bu, bir session ele geçirme veya kimlik bilgisi çalma vektörü **değildir**.

### Gerçek bir istisna — `/api/v1/agents/`

Cloud-Agent route'ları (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) **kendi** CORS header'larını ayarlar (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ve `Access-Control-Allow-Origin: <origin>|*` ile birlikte `Access-Control-Allow-Credentials: true` değerini **gönderir**. Bu, origin yansıtma ile kimlik bilgilerinin bir arada bulunduğu tek yüzeydir ve **`CORS_ALLOW_ALL` ayarından bağımsızdır**. Bu route'larda yönetim kimlik doğrulaması kullanılır (`requireManagementAuth`); dashboard'u host dışından erişime açan operatörler, yanıt header'larının origin'ler arası ve kimlik bilgileri içeren bir okumaya izin verdiği tek yerin burası olduğunu bilmelidir. Bunun açık bir izin listesiyle sınırlandırılması, bu CORS kılavuzundan ayrı olarak takip edilmektedir.

## Üretim kontrol listesi

- **Üretimde asla `CORS_ALLOW_ALL=true` ayarlamayın.** Ayarlanmamış olarak bırakın.
- **Açık** bir origin listesi ayarlayın — ortam değişkenini veya Güvenlik sekmesindeki alanı kullanın:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute bir ters proxy / tünel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) arkasında çalışıyorsa CORS **tek** denetiminiz değildir —
  loopback rota koruması, işlem başlatabilen rotaları korumaya devam eder (bkz.
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Bir 403 hatasını "düzeltmek" için
  `X-Forwarded-For: 127.0.0.1` sahteciliği yapmayın; bu, rota korumasının kapattığı
  RCE sınıfını yeniden açar.
- Çalışma zamanı durumunu doğrulayın: `CORS_ALLOW_ALL=true` etkin olduğunda,
  kontrol panelinde Kontrol Paneli → Güvenlik → Yetkilendirme Envanteri altında
  **kalıcı sarı bir banner** gösterilir ve `/api/settings/authz-inventory`,
  izleme araçlarının sorgulayabileceği bir `cors: { allowAll, allowedOrigins }`
  zarfı döndürür.

## Geliştirme kolaylığı — belirli yerel origin'lere izin verme

Geliştirme ortamında bile joker karaktere nadiren ihtiyaç duyarsınız. Yalnızca
kullandığınız geliştirme sunucularına izin verin:

```bash
# Yerel bir OmniRoute'u çağıran Vite (5173) + Next.js (3000) geliştirme sunucuları
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origin'ler, sondaki eğik çizgi yok sayılarak büyük/küçük harfe duyarsız biçimde
eşleştirilir; dolayısıyla `http://localhost:3000` ile
`http://localhost:3000/` eşdeğerdir. Aynı CSV, yeniden başlatma gerekmeden çalışma
zamanında **Kontrol Paneli → Güvenlik → İzin Verilen CORS Origin'leri** bölümünden
ayarlanabilir.

## API anahtarları ile çerez oturumlarının karşılaştırması

- **Bearer / `x-api-key` (`/v1/*` çıkarım yüzeyi):** tarayıcılar bunları hiçbir
  zaman otomatik olarak eklemez. CORS burada anlamlı bir engel değildir — engel
  API anahtarıdır — bu nedenle söz konusu yüzey, tarayıcı ve Electron
  istemcilerinin zaten erişim hakkına sahip oldukları yanıtları okuyabilmesi için
  bilinçli olarak izin verici tutulur.
  Gevşetilmiş origin yansıtma, header'ın salt varlığını değil doğrulanmış anahtarı esas alır: `REQUIRE_API_KEY=false` bir isteği anonim olarak sunduğunda, başarılı yanıtı varsayılan olarak erişimi reddeden izin listesine tabi kalır. Kimlik doğrulama retleri (401) okunabilir kalır; böylece istemciler iptal edilmiş veya yanlış yazılmış bir anahtarı kullanıcıya gösterebilir (#5242): pipeline'ın kendi 401 yanıtı origin yansıtmayı korur ve pipeline isteği anonim olarak sunduktan sonra anahtarı kendisi reddeden bir route (yönetim kimlik doğrulaması yapılandırılmışken `/v1/models` ve `/v1beta/models`, sahibe özgü `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` ve auto-combo aday route'ları) bu 401 yanıtına origin yansıtmayı `credentialRejectionHeaders()` aracılığıyla ekler. Origin yansıtma, route'un bunlardan hangisini denetlediğine değil, isteğin bir kimlik bilgisi header'ı (`Authorization`, `x-api-key`, `x-goog-api-key` veya `auth_token` cookie'si) taşımasına bağlıdır ve hiçbir zaman `Access-Control-Allow-Credentials` ile birlikte gönderilmez; gövde sabit bir hata zarfıdır. `/api/v1/` altında `requireManagementAuth()` ile korunan yönetim route'ları (`/api/v1/management/*`, `/api/v1/registered-keys`) origin yansıtma eklemez: `REQUIRE_API_KEY=false` iken bu route'ların 401/403 yanıtları origin'ler arası okunamaz.
- **Çerez oturumu (kontrol paneli):** güvenli biçimde kapalı varsayılan ayar
  **ve** paylaşılan yolda `Access-Control-Allow-Credentials` bulunmamasıyla
  korunur. Yönetim/kontrol paneli origin'lerini izin verici yapılandırmalardan
  uzak tutun; bunlar kesinlikle güvenli biçimde kapalı kalmalıdır.

## WebSocket handshake'leri (`/v1/responses`, `/v1/ws`)

Tarayıcılar WebSocket'e CORS uygulamaz; bu nedenle çıkarım çıktısı döndüren WebSocket taşımaları handshake'in `Origin` değerini kendileri denetler (`src/server/origin/wsOrigin.ts`): Responses WebSocket'i (`/v1/responses`) ve OmniRoute `npm start` / `npm run dev` ile çalıştığında, `/v1/chat/completions`, `/v1/messages` ve `/v1/responses` yanıtlarını frame'ler hâlinde aktaran `/v1/ws` ve `/api/v1/ws` köprüsü. Köprü, karar için `/api/v1/ws?handshake=1` adresine sorar ve bu route denetimi çalıştırmadıkça upgrade işlemini reddeder. Bir handshake şu durumlarda kabul edilir:

- `Origin` header'ı yoksa (Codex CLI, SDK'lar ve tarayıcı olmayan diğer istemciler);
- `Origin` yukarıdaki izin listesi tarafından kabul ediliyorsa (`CORS_ALLOWED_ORIGINS`, `corsOrigins` ayarı, `CORS_ORIGIN`, `CORS_ALLOW_ALL`);
- `Origin`, OmniRoute'un kendi genel origin'lerinden biriyse (yapılandırılmış genel temel URL, güvenilen bir proxy'nin iletilen origin'i veya IP literal ya da `localhost` olarak verilen doğrudan bir loopback/LAN host'u — dashboard'un değişiklik denetiminin kullandığı adayların aynısı); ya da
- HTTP `/v1/*` yüzeyinde olduğu gibi geçerli bir API anahtarı taşıyorsa.

Bunların dışındaki her şey `403 ws_origin_forbidden` alır. Bir dashboard session cookie'si yabancı bir `Origin` için muafiyet sağlamaz, çünkü tarayıcı bu cookie'yi herhangi bir sayfanın socket'ine ekler. Başka bir porttaki `localhost` aynı origin sayılmaz; bu tür geliştirme origin'lerini `CORS_ALLOWED_ORIGINS` listesine ekleyin.

## Örnek: OmniRoute önünde ters proxy

CORS, OmniRoute tarafından uygulanır; bu nedenle proxy genel olarak
`Access-Control-*` başlıklarını **eklememeli** veya yeniden yazmamalıdır (çift başlıklar tarayıcıları bozar). TLS'yi sonlandırın
ve iletin — ön kontrol isteğini OmniRoute'un yanıtlamasına izin verin:

```nginx
# nginx — OmniRoute'a iletin; burada Access-Control-* eklemeyin
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # İletme başlıklarını koruyun: aynı ana makinedeki bir proxy geri döngü adresinden bağlanır ve
    # OmniRoute'a çağrıyı yapanın yerel operatör olmadığını bu başlıklar bildirir. Bunların hiçbirini eklemeyen bir proxy,
    # uzaktaki tüm çağrı sahiplerini yerelmiş gibi gösterir. X-Forwarded-For değerini de asla 127.0.0.1 olarak ayarlamayın.
}
```

İzin verilen tarayıcı kaynaklarını proxy'de değil, OmniRoute'ta (`CORS_ALLOWED_ORIGINS` veya
Güvenlik sekmesi) ayarlayın.

## Kaynak dosyalar

| Konu                                                        | Dosya                                                                |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| İzin verilenler listesinin çözümlenmesi + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Ara yazılım uygulaması (tek doğruluk kaynağı)               | `src/server/authz/pipeline.ts`                                       |
| Ayarlar → çalışma zamanı origin ekleme                      | `src/lib/config/runtimeSettings.ts`                                  |
| Kontrol paneli için çalışma zamanı durumu                   | `src/app/api/settings/authz-inventory/route.ts`                      |
| Kontrol paneli uyarı banner'ı                               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| İzin Verilen CORS Origin'leri alanı                         | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent rota başına CORS (istisna)                      | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket handshake'i `Origin` denetimi                     | `src/server/origin/wsOrigin.ts`                                      |

## Ayrıca bakınız

- [Rota Koruması Katmanları](./ROUTE_GUARD_TIERS.md) — süreç başlatabilen rotalar için
  loopback zorlaması (ayrı, tamamlayıcı bir denetim).
- [Yetkilendirme Kılavuzu](../architecture/AUTHZ_GUIDE.md) — tam kimlik doğrulama hattı.
