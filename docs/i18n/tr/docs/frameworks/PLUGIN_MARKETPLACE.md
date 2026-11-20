# Plugin Marketplace (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Doğruluk kaynağı:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` ve
> `src/app/(dashboard)/dashboard/plugins/`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, WordPress tarzı bir eklenti sistemiyle birlikte gelir. Eklentiler;
her biri bir `plugin.json` manifesti ve bir giriş dosyası içeren, kendi kendine
yeterli dizinlerdir. İstek işlem hattına (`onRequest` / `onResponse` / `onError`)
ve yaşam döngüsü olaylarına (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`) bağlanırlar.

**Eklenti Pazarı**, bu sistemin üzerindeki keşif katmanıdır. Yüklenebilir
eklentilerden oluşan, göz atılabilir bir katalog sunar. Katalog varsayılan olarak
küçük, yerleşik bir başlangıç kayıt defteridir. Bir operatör, kataloğu özel bir
uzak kayıt defteri URL'sine yönlendirebilir; bu durumda getirme işlemi, DNS
çözümlemesi yapan bir SSRF korumasıyla güvence altına alınır (bkz.
[Güvenlik](#security)).

Tüm eklenti rotaları **yalnızca loopback üzerinden erişilebilir** (Katman 1 —
`LOCAL_ONLY`): Eklentiler alt süreçlerde kod yükleyip çalıştırdığından, kimlik
doğrulamadan bağımsız olarak loopback dışındaki kaynaklardan bu rotalara
erişilemez. Bkz.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Together Nasıl Uyuyor?

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Kayıt defteri katmanı** — `src/lib/plugins/marketplace.ts`: herhangi bir başarısızlık durumunda tohum kayıt defterine geri dönerek kataloğu listeler / arar.
- **Yaşam döngüsü katmanı** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): yükleme, yükseltme, etkinleştirme, devre dışı bırakma, kaldırma, tarama, başlatma yüklemesi.
- **Bildirim katmanı** — `src/lib/plugins/manifest.ts`: Zod şeması + `plugin.json` için varsayılanlar.
- **Tarayıcı** — `src/lib/plugins/scanner.ts`: diskteki eklenti dizini altındaki eklentileri keşfeder.
- **Yükleyici** — `src/lib/plugins/loader.ts`: her eklentiyi ayrı bir Node.js alt sürecinde oluşturur ve aracılar çağrıları IPC üzerinden bağlar. Alt öğe bir korumalı alan değildir (aşağıdaki "Eklenti yürütme yalıtımı" konusuna bakın).

## Pazar Kataloğu

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`), bir
`MarketplaceEntry` nesneleri listesi döndürür:

| Alan          | Tür      | Notlar                                                  |
| ------------- | -------- | ------------------------------------------------------- |
| `name`        | string   | kebab-case eklenti adı                                  |
| `version`     | string   | semver                                                  |
| `description` | string   | Kısa özet                                               |
| `author`      | string   | Yazar / kuruluş                                         |
| `license`     | string   | SPDX tarzı lisans kimliği                               |
| `downloadUrl` | string   | Kaynak indirme URL'si (boş olabilir)                    |
| `repository`  | string?  | İsteğe bağlı depo URL'si                                |
| `tags`        | string[] | Arama/filtreleme etiketleri                             |
| `downloads`   | number   | İndirme sayısı                                          |
| `rating`      | number   | 0–5                                                     |
| `verified`    | boolean  | Girdinin doğrulanmış olarak işaretlenip işaretlenmediği |
| `lastUpdated` | string   | ISO benzeri tarih dizesi                                |

Özel bir kayıt defteri URL'si yapılandırılmadığında katalog, yerleşik
`SEED_REGISTRY` olur (şu anda `request-logger`, `rate-limiter`, `cost-tracker` ve
`theme-manager`). Başlangıç kayıt defteri her zaman kullanılabilir durumdadır:
Yapılandırılmış bir uzak kayıt defterine erişilemezse, kayıt defteri `200`
dışında bir durum döndürürse veya tanınmayan bir gövde döndürürse
`listMarketplacePlugins()` bir uyarı kaydeder ve başlangıç listesine geri döner.

> Not: Pazar **kataloğu** (göz atma/arama) uçtan uca bağlanmıştır, ancak
> katalogdan tek tıklamayla **yükleme** henüz uygulanmamıştır. Kontrol panelindeki
> bir pazar girdisinin "Yükle" düğmesi şu anda "çok yakında" bildirimi gösterir.
> Günümüzde yükleme, yerel yol yükleme akışı (`POST /api/plugins`) ve disk
> üzerindeki keşif (`POST /api/plugins/scan`) üzerinden gerçekleştirilir.

## REST API

Tüm uç noktalar yönetim kimlik doğrulaması (`requireManagementAuth`) gerektirir** Ve** yalnızca geri döngüdür — `/api/plugins` ve `/api/plugins/`, `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) içinde listelenir.

| Uç nokta                         | Yöntem | Tanım                                                             |
| -------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Yüklü eklentileri listeleyin (isteğe bağlı `?status=` filtresi)   |
| `/api/plugins`                   | POST   | Eklenti kaynakları dizininden bir eklenti yükleyin                |
| `/api/plugins/scan`              | POST   | Eklenti dizinini tarayın ve yeni eklentileri kaydedin             |
| `/api/plugins/marketplace`       | GET    | Pazar yeri katalog girişlerini listeleyin                         |
| `/api/plugins/[name]`            | GET    | Yüklü eklenti ayrıntılarını alın                                  |
| `/api/plugins/[name]`            | DELETE | Bir eklentiyi kaldırma                                            |
| `/api/plugins/[name]/activate`   | POST   | Etkinleştir ( + kayıt kancalarını yükle)                          |
| `/api/plugins/[name]/deactivate` | POST   | Devre dışı bırak ( `onDeactivate` ateşle, kancaların kaydını sil) |
| `/api/plugins/[name]/config`     | GET    | Eklenti yapılandırma + yapılandırma şemasını alın                 |
| `/api/plugins/[name]/config`     | PUT    | Eklenti yapılandırmasını güncelleyin (şemaya göre doğrulandı)     |

`GET /api/plugins` `status` filtresi `installed` / `active` / `inactive` / `error` birini kabul eder. Geçersiz bir değer `400` değerini döndürür.

### Yüklü eklentileri listele

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Yerel bir yoldan yükleme

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` bir olmalıdır** mutlak** bir dizinin yolu** eklenti kaynakları dizininin içinde** : `plugin-sources` eklenti kökünün yanında, yani varsayılan olarak `~/.omniroute/plugin-sources/` veya bu değişken ayarlandığında `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` ( `src/lib/plugins/installSource.ts` `getPluginSourcesDir()` ). Önce eklentiyi oraya kopyalayın veya klonlayın. Yol `..` veya bir boş bayt içerdiğinde, bu dizinin dışında yer aldığında, bir sembolik bağlantı aracılığıyla onun dışında çözümlendiğinde, hedefi onun dışında olan bir sembolik bağlantı içerdiğinde veya dizin mevcut olmadığında kurulum `400` ile reddedilir. Kaynak dizinin geçerli bir `plugin.json` içermesi (veya birinin ebeveyni olması) gerekir. Başarı durumunda yanıt, yüklü eklenti satırıyla birlikte `201` olur.

Diğer eklenti yollarından farklı olarak bu, oturum açma devre dışı bırakıldığında bile (`requireLogin=false`) yönetim kimlik bilgilerini (bir kontrol paneli oturumu veya yönetim kapsamlı bir API anahtarı) gerektirir: kodun yüklenmesi hiçbir zaman anonim bir eylem değildir.

### Pazara göz atın

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Eklenti yapılandırmasını güncelle

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` sağlanan her değeri eklentinin `configSchema` (bildirimde belirtilen) göre doğrular: `number` alanları `min`/`max` onurlandırır, `select` alanları bildirilen `enum` ile eşleşmelidir. Şemada bulunmayan anahtarlara izin verilir.

## Yapılandırma

### Eklenti dizini

Eklentiler OmniRoute veri dizini altında bulunur:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (veya manifest.main her neyi işaret ediyorsa)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) bu dizini üç adımda
çözümler:

1. **`OMNIROUTE_PLUGINS_DIR`**, ayarlandığında — `HOME` ne söylerse söylesin aynen
   kullanılır. Bu, eklenti ağacının genellikle konteynerin ana diziniyle hiçbir
   ilgisi olmayan bir yola bağlandığı Docker/K8s için açık ayardır (#11827).
2. `<home>/.omniroute/plugins`; burada `<home>`, `HOME` / `USERPROFILE` ortam
   değişkenlerinden alınır.
3. Süreç hiçbir ana dizin dışa aktarmıyorsa `/tmp/.omniroute/plugins`.

Çözümlenen dizin, başlangıçta bir kez `scanner.dir_resolved` olarak günlüğe
kaydedilir ve hangi girdinin seçildiği (`OMNIROUTE_PLUGINS_DIR`, `home` veya
`no-home-fallback`) belirtilir — böylece sessizce 3. adıma düşen bir imaj, yalnızca
boş bir eklenti listesi bildirmek yerine bunu açıkça belirtir.
`POST /api/plugins/scan`, burada geçerli bir `plugin.json` barındıran tüm alt
dizinleri keşfeder ve kaydeder; aynı dizin, `pluginManager.install()` işlevinin
eklentileri kopyaladığı kök dizindir. Dolayısıyla geçersiz kılma, keşif ve yükleme
konumlarını birlikte taşır.

> **`OMNIROUTE_PLUGINS_DIR`, `OMNIROUTE_PLUGIN_PATH` değildir.** İkincisi yalnızca,
> `omniroute` alt komutlarını ekleyen `omniroute-cmd-*` npm paketlerini bulmak için CLI
> komut eklentisi yükleyicisi (`bin/cli/plugins.mjs`) tarafından okunur — burada
> açıklanan çalışma zamanı tarayıcısı üzerinde hiçbir etkisi yoktur. Bu konu için
> [PLUGINS.md](./PLUGINS.md) belgesine bakın.

### Özel pazar yeri kayıt defteri URL'si

Pazar yeri kataloğu kaynağı `pluginMarketplaceUrl` ayarından okunur
(`src/lib/plugins/marketplace.ts`, `settings.pluginMarketplaceUrl` değerini okur).
Bir `http(s)` URL'sine ayarlandığında `listMarketplacePlugins()` bu URL'yi getirir
ve üst düzey bir JSON girdi dizisini ya da `plugins` dizisi içeren bir nesneyi
kabul eder; dize türünde `name` değeri olmayan girdiler filtrelenir. Ayarlanmadığında
(veya getirme işlemi SSRF korumasında başarısız olduğunda / geçersiz bir yanıt
döndürdüğünde), yerleşik başlangıç kayıt defteri kullanılır.

Kontrol panelindeki "Pazar Yeri" sekmesi bu URL için bir alan sunar (değer
`GET /api/settings` üzerinden geri okunur).

> Uygulama notu: Kontrol panelindeki "Kaydet" eylemi, `pluginMarketplaceUrl`
> değerini `PATCH /api/settings` uç noktasına gönderir. Bu yazının hazırlandığı
> sırada bu anahtar `updateSettingsSchema` içinde tanımlanmamıştır
> (`src/shared/validation/settingsSchemas.ts`); bu nedenle buna güvenmeden önce
> kullandığınız sürümde kalıcılığı doğrulayın — **okuma** yolu (`getSettings()` →
> `listMarketplacePlugins()`), anahtar ayar deposunda bulunduğu andan itibaren
> anahtarı dikkate alır.

## Güvenlik

### Yalnızca katman — geridöngüsünü yönlendir

Eklentiler, oluşturulan alt işlemlerde kod yürütür, böylece `/api/plugins` yüzeyinin tamamı `LOCAL_ONLY` (Kademe 1) olarak sınıflandırılır. Geri döngü uygulaması koşulsuz olarak çalışır** önce** herhangi bir kimlik doğrulama kontrolü olduğundan, bir tünel üzerinden kutuya ulaşan sızdırılmış bir yönetim belirteci yine de bir eklentiyi yükleyemez, etkinleştiremez veya kaldıramaz. Bkz. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) ve Katı Kurallar #15 / #17.

### Pazar yeri kayıt defteri SSRF koruması

Özel kayıt defteri URL saldırganların etkileyebileceği bir yapılandırmadır; dolayısıyla onu getirmeden önce `listMarketplacePlugins()` onu iki katmandan geçirir:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` olmayan her şeyi reddeder.
   - Gerçek private/loopback/link-local/ULA ana bilgisayarlarını (IPv4 reddeder** Ve** IPv6, IPv4-mapped dahil) kanonik `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`) aracılığıyla.
   - Çözer** ikisi birden** `A` ve `AAAA` kaydeder ve eğer reddeder** herhangi** çözümlenen adres, genel ana bilgisayar adı → özel IP bypass'ını kapatan özel —.
   - **Başarısız kapatıldı** : DNS çözümleme hatası URL reddeder.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): getirme sırasında yalnızca herkese açık URL korumasını yeniden uygular ve** yönlendirmeleri engeller** (genel → özel `30x` pivotu yok).

Her iki katmanda da başarısız olan bir URL — isteğini iptal etmez, pazar yeri sessizce yerleşik tohum kaydına geri döner ve bir uyarıyı günlüğe kaydeder.

> Bu koruma, özellikle A + AAAA çözümlemek ve IPv4-only kontrolü yerine standart `isPrivateHost` kullanmak için PR #3774 güçlendirilmiştir.

### Eklenti yürütme izolasyonu

> **Eklentiler korumalı alana alınmamıştır.** Çocuk, OmniRoute kullanıcısı olarak çalışan, VM bağlamı ve Node.js izin işaretleri olmayan sıradan bir Node.js işlemidir; dolayısıyla eklenti kodu, kullanıcının yapabileceği herhangi bir dosyayı okuyabilir ve yazabilir, programları çalıştırabilir ve ağa erişebilir. `requires.permissions` yalnızca çocuğun hangi ortam değişkenlerini alacağına karar verir; diğer izinler uygulanmaz. Yalnızca güvendiğiniz eklentileri yükleyin. Aşağıdaki süreç sınırında çökmeler ve takılmalar var; bir güvenlik sınırı değildir.

- **Süreç izolasyonu** — `loadPlugin()` (`src/lib/plugins/loader.ts`), her eklentiyi ayrı bir Node.js alt sürecinde oluşturur ve IPC üzerinden iletişim kurar. Kanca çağrılarının `SIGTERM` → `SIGKILL` yükseltme ile zaman aşımı vardır.
- **Zarf izin verilenler listesi** — çocuk yalnızca izin verilenler listesine eklenen ortam değişkenleri kümesini alır; daha geniş küme yalnızca manifest `env` izni istediğinde verilir.
- **Kaynak korumasını yükleyin** — `POST /api/plugins` yalnızca eklenti kaynakları dizininden okur (bkz. "Yerel yoldan yükleme"): yol, `realpath` ile kurallı hale getirilir, kesinlikle bu dizinin içinde kalmalıdır ve kendisinden kaçan bir sembolik bağlantı taşıyan kaynak ağacı, herhangi bir şey kopyalanmadan önce reddedilir.
- **Yol sınırlaması** — install/upgrade/uninstall eklenti dizininin ve `manifest.main` çözümlendiğini iddia ediyor** içinde** herhangi bir kopyalama veya özyinelemeli silme işleminden önce yönetilen eklenti kökü (kurcalanmış DB yollarına ve `manifest.main` içindeki `../` geçişine karşı koruma sağlar). Etkinleştirme, sembolik bağlantıları `realpath` aracılığıyla çözer ve eklenti dizininden kaçan bir giriş noktasının yüklenmesini reddeder.
- **İsteğe bağlı bütünlük pimi** — bir bildirim, bir `integrity` (`sha256-<base64>`, SRI formatı) alanı bildirebilir. Yükleyici, mevcut olduğunda yükleme sırasında giriş dosyası karmasını doğrular ve uyumsuzluk durumunda etkinleştirmeyi reddeder. İsteğe bağlı kurcalama tespitidir,** Olumsuz** bir güvenlik sınırı: yüklü bir eklentinin yapabileceklerini sınırlamaz.
- **Kancalarda istemci kimlik bilgileri yok** — `onRequest`, `onResponse` ve `onError` iletilen bağlamda `authorization`, `x-api-key`, `proxy-authorization` ve `cookie` başlıkları kaldırılmıştır ve API anahtar kaydı hiçbir anahtar değeri taşımamaktadır ( `src/lib/plugins/hooks.ts` `redactPluginContext()` ).

## Manifest (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) tarafından doğrulandı:

| Alan               | Tip              | Notlar                                                                   |
| ------------------ | ---------------- | ------------------------------------------------------------------------ |
| `name`             | sicim            | Gerekli; kebap kutusu (`^[a-z0-9-]+$`), 1–100 karakter                   |
| `version`          | sicim            | Gerekli; semver (`MAJOR.MINOR.PATCH`)                                    |
| `description`      | sicim?           | ≤ 500 karakter                                                           |
| `author`           | sicim?           | ≤ 200 karakter                                                           |
| `license`          | sicim?           | Varsayılanlar `MIT`                                                      |
| `main`             | sicim?           | Giriş dosyası; varsayılan olarak `index.js`                              |
| `source`           | numaralandırmak? | `local` \| `marketplace` (varsayılanı `local`)                           |
| `tags`             | sicim[]?         | Etiketlerde ara                                                          |
| `requires`         | nesne?           | `{ omniroute?, permissions[] }`                                          |
| `hooks`            | nesne?           | Eklentinin hangi kancaları uyguladığını bildiren Boole'lar               |
| `skills`           | nesne[]?         | İsteğe bağlı beceri tanımları                                            |
| `enabledByDefault` | Boolean mı?      | Yükleme sırasında otomatik etkinleştir                                   |
| `configSchema`     | nesne?           | Yapılandırma alanlarının haritası (`string`/`number`/`boolean`/`select`) |
| `integrity`        | sicim?           | İsteğe bağlı `sha256-<base64>` giriş dosyası pini                        |

İzinler `network` / `file-read` / `file-write` / `env` / `exec` numaralandırmasından alınır. Yalnızca `env` çalışma zamanı etkisi vardır (alt öğe için biraz daha büyük bir ortam değişkeni izin verilenler listesi); diğerleri beyandır ve uygulanmaz.

## Yaşam Döngüsü Akışı

```
kurulum (POST /api/plugins, yol)
  → manifesti tara/doğrula → hazırlama alanına kopyala → ana dosyanın dizin içinde olduğunu doğrula
  → atomik olarak ~/.omniroute/plugins/<name> konumuna yeniden adlandır → DB satırı ekle
  → onInstall olayını tetikle → enabledByDefault ise: etkinleştir

etkinleştirme (POST /api/plugins/{name}/activate)
  → realpath kapsama denetimi → loadPlugin() (alt süreç başlat)
  → bildirilen hook'ları kaydet → status = "active" → onActivate olayını tetikle

devre dışı bırakma (POST /api/plugins/{name}/deactivate)
  → onDeactivate olayını tetikle (kaydı kaldırmadan ÖNCE) → hook kayıtlarını kaldır
  → alt süreci sonlandır → status = "inactive"

kaldırma (DELETE /api/plugins/{name})
  → etkinse devre dışı bırak → onUninstall olayını tetikle
  → eklenti dizinini kapsama denetimli olarak özyinelemeli sil → DB satırını sil
```

`install` komutunun, manifest sürümü kurulu sürümden **kesin olarak daha yeni**
olan bir dizine karşı yeniden çalıştırılması otomatik yükseltme gerçekleştirir
(temiz yeniden kurulum; yapılandırma varsayılan değerlere sıfırlanır). Aynı veya
daha eski bir sürüm reddedilir.

## Veritabanı

`plugins` tablosu (`076_create_plugins.sql` migrasyonu):

| Sütun           | Tür     | Notlar                                                 |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Benzersiz                                              |
| `version`       | TEXT    | semver; varsayılan `1.0.0`                             |
| `description`   | TEXT    | İsteğe bağlı                                           |
| `author`        | TEXT    | İsteğe bağlı                                           |
| `license`       | TEXT    | Varsayılan `MIT`                                       |
| `main`          | TEXT    | Giriş dosyası; varsayılan `index.js`                   |
| `source`        | TEXT    | Varsayılan `local`                                     |
| `tags`          | TEXT    | JSON dizisi; varsayılan `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; varsayılan 0                                      |
| `manifest`      | TEXT    | Tam manifest JSON'u                                    |
| `config`        | TEXT    | JSON; varsayılan `{}`                                  |
| `config_schema` | TEXT    | JSON; varsayılan `{}`                                  |
| `hooks`         | TEXT    | Bildirilen hook adlarının JSON dizisi; varsayılan `[]` |
| `permissions`   | TEXT    | JSON dizisi; varsayılan `[]`                           |
| `plugin_dir`    | TEXT    | Mutlak kurulum dizini                                  |
| `error_message` | TEXT    | `status = "error"` olduğunda ayarlanır                 |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Etkinleştirme sırasında ayarlanır                      |

Eklenti metrikleri/analizleri ek tablolarda izlenir
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Kontrol Paneli

`/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) kontrol paneli sayfasında iki sekme bulunur:

- **Yüklendi** — yüklü eklentileri belirtilen kancaları, activate/deactivate geçişi, kaldırma düğmesi ve "Eklentileri tara" eylemiyle (`POST /api/plugins/scan`) listeler.
- **Pazar yeri** — URL özel kayıt defterini ayarlamak için bir alanla birlikte `GET /api/plugins/marketplace` kataloğu gösterir.

Sayfada her zaman eklentilerin OmniRoute işleminin tüm ayrıcalıklarıyla çalıştığına dair bir uyarı gösterilir.

Eklenti başına bir yapılandırma sayfası `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`) bulunur.

## Ayrıca Bakınız

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` uç noktasının neden yalnızca geri döngü erişimine açık olduğu (Katman 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — ilgili yetenekler çerçevesi
  (`src/lib/skills/`); eklentiler manifestlerinde yetenekler tanımlayabilir
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — olay odaklı giden
  entegrasyonlar
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  her eklenti rotasının hata yanıtları için kullandığı `buildErrorBody()` kalıbı
