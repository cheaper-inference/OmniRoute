# Monitoring & Observability Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Özet**: OmniRoute; yerleşik sağlık izleme, sağlayıcı otomatik pilotu, kota takibi ve gözlemlenebilirlik kancalarıyla birlikte gelir. Bu kılavuz; kontrol panelini, uyarıları ve sorun gidermeyi kapsar.

**Kaynaklar:**

- `src/lib/monitoring/observability.ts` — gözlemlenebilirlik anlık görüntüsü
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombinasyon sağlığı otomatik pilotu
- `src/lib/monitoring/providerHealthAutopilot.ts` — sağlayıcı otomatik pilotu
- `src/lib/monitoring/providerHealthMatrix.ts` — sağlayıcı sağlık matrisi
- `src/lib/localHealthCheck.ts` — yerel sağlık denetimi
- `src/lib/tokenHealthCheck.ts` — belirteç yenileme sağlığı
- `src/lib/proxyHealth.ts` — proxy sağlık önbelleği (PROXY_GUIDE.md içinde ele alınmıştır)

---

## Genel Bakış

OmniRoute, **3 izleme katmanına** sahiptir:

```
┌──────────────────────────────────────────────────────────────┐
│  Katman 1: Sistem Sağlığı (sunucu düzeyi)                     │
│  ├─ localHealthCheck.ts — DB, bağlantı noktaları, yerel bağımlılıklar │
│  ├─ db/healthCheck.ts — bütünlük, FK, sahipsiz yapıtlar        │
│  └─ Kontrol paneli: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  Katman 2: Sağlayıcı Sağlığı (sağlayıcı bazında dayanıklılık) │
│  ├─ providerHealthAutopilot.ts — devre kesici, bekleme süreleri │
│  ├─ providerHealthMatrix.ts — sağlayıcı/modele göre sağlık puanları │
│  └─ Kontrol paneli: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  Katman 3: Canlı Gözlemlenebilirlik (çalışma zamanı anlık görüntüleri) │
│  ├─ observability.ts — devre kesiciler, oturumlar, kota        │
│  ├─ tokenHealthCheck.ts — OAuth belirteci yenileme sağlığı     │
│  └─ MCP araçları: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Kontrol Paneli Sayfaları

### `/dashboard/health` (Sistem Sağlığı)

Üst düzey sağlık kontrol panelinde şunlar gösterilir:

| Bölüm                 | Gösterdikleri                                              |
| --------------------- | ---------------------------------------------------------- |
| **Sunucu durumu**     | Çalışma süresi, sürüm, bağlantı noktası, etkin bağlantılar |
| **Veritabanı**        | Bağlantı, bütünlük, WAL boyutu, son geçişler               |
| **Sağlayıcı özeti**   | Etkin sayısı, sağlıklı sayısı, açık devre kesici sayısı    |
| **Kota izleyicileri** | Etkin oturumlar, uyarı durumu, tükenenler                  |
| **Son hatalar**       | Yığın izleriyle birlikte son 10 hata                       |
| **Kaynak kullanımı**  | Bellek, CPU, yığın baskısı göstergesi                      |

### `/dashboard/providers` (Sağlayıcı Sağlığı)

Sağlayıcı bazında kontrol paneli:

| Sütun       | Açıklama                                           |
| ----------- | -------------------------------------------------- |
| Sağlayıcı   | Sağlayıcı kimliği + görünen ad                     |
| Sağlık      | Yeşil/sarı/kırmızı durum                           |
| Devre       | Açık/kapalı/yarı açık durum                        |
| Bağlantılar | Bağlantı sayısı, son yenileme                      |
| Modeller    | Kullanılabilir modeller, model bazında sağlık      |
| Maliyet     | Bugünkü maliyet, 7 günlük eğilim                   |
| Hatalar     | Son 24 saatteki hata sayısı, en yaygın hata sınıfı |

Ayrıntıları görmek için bir sağlayıcıya tıklayın:

- Gecikme dökümüyle birlikte son istekler
- Bağlantı bazında sağlık puanları
- Model bazında kilitlemeler
- Otomatik pilot önerileri

### `/dashboard/quota` (Kota Takibi)

Her API anahtarı için:

- Mevcut kullanım ve limit karşılaştırması (ilerleme çubuğu)
- Kota eğilimi (30 günlük grafik)
- Sonraki sıfırlanma zamanı
- Uyarı geçmişi

### `/dashboard/combos` (Kombinasyon Sağlığı)

Her kombinasyon için:

- Strateji + hedefler
- Hedef bazında sağlık
- Son geri dönüş olayları
- Başarı oranı (24 saat, 7 gün, 30 gün)

---

## Sağlık Kontrolü API

OmniRoute ortaya çıkıyor** iki** HTTP sağlık yüzeyleri. Orkestratörler için bunlar birbirinin yerine kullanılamaz.

| Yol                          | Amaç                                                              | Ağırlık                                     | Şunun için kullanın:                                                            |
| ---------------------------- | ----------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------- |
| `GET /healthz`               | Yaşam döngüsü liveness/readiness (`ok` / `starting` / `stopping`) | Önemsiz (yalnızca faz bayrağı)              | Kubernet'ler** hazırlık** ; yumuşak** canlılık** HTTP kullanmanız gerekiyorsa   |
| `GET /api/monitoring/health` | Derin sistem + sağlayıcı özeti (DB, heap, katalog sayıları,…)     | Ağır (senkronizasyon DB / izleme çalışması) | Kontrol panelleri, kara kutu derin kontrolleri, Docker yerleşik sağlık kontrolü |

> **Not:** Sağlayıcı sağlık matrisleri, otopilot sorunları, kota monitörleri, belirteç sağlığı ve `/api/monitoring/health` ötesindeki gecikme ayrıntılarına şu adresten ulaşılabilir:**MCP aracı** `observability_snapshot` veya** gösterge paneli** — sayfalarında bunlar için özel REST yolları yoktur.

Her iki rota da** aynı Düğüm olay döngüsü** istek işleme olarak. CPU'ya bağlı bir yol (büyük `GET /v1/models` katalog çalışması, uzun bağlam sıkıştırması/belirteç sayımı) gecikmeye neden olabilir** Tümü** HTTP işleyicileri, `/healthz` dahil. Olay döngüsü meşgul ≠ işlemi öldü. Domuzu tamir etmeyi tercih edin; sonda ayarı yalnızca hatalı öldürmeleri azaltır.

### Hafif orkestratör probu

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` sunucu yaşam döngüsü aşaması hazır olduğunda
- **503** önyükleme veya kapatma sırasında + `starting` / `stopping`
- Uygulama: `src/app/healthz/route.ts` ( DB ping yok)

### Sistem Sağlığı (derin)

```bash
GET /api/monitoring/health
```

Cevap:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: prob önbelleği vs SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth`** bellek içi araştırma-önbellek göstergesi** `provider_connections.test_status` canlı dökümü değil. #12532 sonra istek yolu yalnızca `getCachedCredentialHealthSummary()` okur; arka plan araştırmaları olay döngüsündeki önbelleği yeniler.

| Katman                       | Nerede                                                                | Bu ne anlama geliyor?                                                                                                                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prob-önbellek göstergesi     | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Son kimlik bilgisi durumu araştırmasının sonuçları hâlâ işlem belleğinde tutuluyor. `source` her zaman `probe-cache`.                                                                                                  |
| Başarısız bağlantı ayrıntısı | `credentialHealth.failedConnections`                                  | Sunmak** sadece `failed > 0` olduğunda** . `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`) ile sınırlı önbellek satırları listesi. `failedOmitted` liste sınırlandığında ayarlanır. |
| SQLite yapışkan durumu       | `credentialHealth.staleDbNonOkCount`                                  | Sayısı** aktif** (`is_active=1`) kalıcı `test_status` uygun olmadığı bilinen bağlantı satırları (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                                     |

İki katman bilerek aynı fikirde olmayabilir:

- `staleDbNonOkCount>0` — SQLite hala yapışkan bir `test_status` (örneğin `expired` veya `credits_exhausted`) sahipken `failed=0` ölçün ve en son araştırma önbellek anlık görüntüsünün `status=error` olarak sayılmamasını sağlayın.
- SQLite sağlıklı görünürken `failed>0` ölçün — yakın zamanda yapılan bir araştırma başarısız oldu ve önbelleğe alındı; DB satırı güncellenmedi veya daha sonra temizlendi.

Bu uç noktayı kazırken yalnızca `provider_connections.test_status` konusunda uyarı vermeyin. Canlı araştırma hataları için `failed` + `failedConnections` ve kalıcı yapışkan durum sayısına ihtiyaç duyduğunuzda `staleDbNonOkCount` kullanın.

### Kubernetes araştırma önerileri

OmniRoute bir** tek Düğüm süreci** (bir olay döngüsü). Stok Docker `HEALTHCHECK` hafif `/healthz` hedefliyor. `/api/monitoring/health`** çok ağır** kubelet canlılık aralıkları için.

| Prob             | Önerilen hedef                                                                              | Notlar                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Başlatmak**    | Uzun `failureThreshold` (veya büyük `startPeriod`)HTTP `GET /healthz`                       | Soğuk başlatma + SQLite geçişi birkaç saniyeyi aşabilir                                                                                                                                                                                                                                                                                                                   |
| **Hazırlık**     | HTTP `GET /healthz`                                                                         | Yaşam döngüsü `ok` / `starting` / `stopping` (200'e karşı 503). Döngü CPU tarafından engellenmişse hala kanat çırpar. A** Birkaç saniyede 200 sağlıklı değil** (#10303) — 3 baytlık işleyici çalıştırılmadan önce olay döngüsünün kapatıldığı anlamına gelir                                                                                                              |
| **canlılık**     | HTTP `GET /livez`,** veya TCP** ana hizmet bağlantı noktasında (`PORT`, varsayılan `20128`) | `/livez` yalnızca süreçten yararlanır (işleyici çalışıyorsa her zaman 200). Hala — meşgul ≠ ölü olay döngüsünü paylaşır ve olay döngüsü açlığını (#10303) TCP daha iyi algılamaz. Tercih etmek**TCP** HTTP araştırmaları catalog/compression yükü altında zaman aşımına uğrarsa; Yapmak** Olumsuz** her iki durumda da kısa olay döngüsü duraklamalarında bölmeyi öldürün |
| **Derin sağlık** | harici bir denetleyiciden `GET /api/monitoring/health`                                      | Kubelet `livenessProbe` / sıkı `readinessProbe` için değil                                                                                                                                                                                                                                                                                                                |

Örnek şekil (eşikleri soğuk başlatma ve sıkıştırma yükünüze göre ayarlayın):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**Yapamaz** nokta kübelet** canlılık** `/api/monitoring/health`. Bu yol gerçek DB/monitoring işini yapar ve yük altında yanlış pozitif olur.

İlgili: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (olay döngüsü meşgulken araştırır), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (katalog fiyatlandırma domuzu), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (sıkıştırma belirteci sayımı domuzu).

### systemd watchdog (dondurulmuş olay döngüsü)

Bir systemd ana bilgisayarında OmniRoute, hizmet yöneticisine ne zaman hazır olduğunu söyler ve ona ping atmaya devam eder, böylece olay döngüsü sıkışan bir sunucu, sessiz ve çalışır durumda kalmak yerine öldürülür ve yeniden başlatılır. Ping'ler sunucunun kendi olay döngüsünden gelir: Pingler engellendiğinde durur ve `WatchdogSec` ping'i olmadan sona erdiğinde systemd hizmeti yeniden başlatır.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) zaten bununla bir kullanıcı birimi yazıyor. Kendi yazdığınız bir birim (varsayılan `Type=simple`) bekçi köpeği almaz, dolayısıyla bu satırları `[Service]` bölümüne ekleyin:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Oluşturulan birim `Restart=on-failure` ayarlar, bu nedenle bu satırı da ekleyin — onsuz, bekçi köpeği yeniden başlatmak yerine yalnızca takılıp kalan hizmeti öldürür.

- `Type=notify`: hizmet, işlem çatallandığında değil, sunucu `READY=1` gönderdiğinde "başlatılır". `TimeoutStartSec` yavaş bir başlangıcı sınırlar.
- `NotifyAccess=all`: ping'ler, `omniroute serve` denetleyicisinin çocuğu olan sunucu işlemi tarafından gönderilir.
- `WatchdogSec`: ping'ler her 60 saniyede bir gönderilir, bu nedenle şunu kullanın:** 120 veya daha fazla** . Daha küçük değerler sağlıklı bir sunucuyu yeniden başlatır.
- `omniroute serve` ön planda çalıştırın. `--daemon` sunucuyu birimin grubundan ayırır ve bildirim anlaşması hiçbir zaman tamamlanmaz.

Yeniden başlatmanın ardından etkin olup olmadığını kontrol edin:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` yapılandırılan gecikmeyi gösterir ve `WatchdogTimestamp` her dakika ileri doğru hareket eder. Watchdog'un neden olduğu yeniden başlatma şu şekilde kaydedilir: `Result=watchdog`. Üniteyi olduğu gibi tutarken ping'leri kapatmak için `OMNIROUTE_DISABLE_SD_NOTIFY=1` ayarlayın; `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) olmadan hiçbir şey gönderilmez.

Watchdog yalnızca olay döngüsünün çalışmaya devam edip etmediğini kontrol eder. Yavaş ama hala dönen bir sunucu yeniden başlatılmaz.

### İsteğe bağlı istek yolu çalışması (bellek, beceriler, belirteç yenileme)

Bellek çıkarma, beceri ekleme ve OAuth token yenileme,** ana Düğüm olay döngüsü** `/healthz` ile. Bunlar, çalışan havuzu değil, kontrol paneli geçiş özellikleridir (`memoryEnabled`, `skillsEnabled`). Bkz. [Ortam — olay döngüsü maliyeti](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Sağlayıcı Sağlığı

> **REST uç noktası yok.** Sağlayıcı sağlık verilerine MCP aracı `observability_snapshot` veya kontrol paneli `/dashboard/providers` sayfası aracılığıyla ulaşılabilir.

### Sağlayıcı Detayı

> **REST uç noktası yok.** Sağlayıcı başına ayrıntıya kontrol paneli `/dashboard/providers` sayfasından ulaşılabilir.

---

## Sağlayıcı Sağlığı Otomatik Pilotu

`providerHealthAutopilot.ts` modülü aşağıdakileri gerçekleştiren bir **kendi kendini iyileştiren sistemdir**:

1. Sağlayıcı sorunlarını algılar (devre açık, bekleme süreleri, kilitlenmeler, kota uyarıları)
2. Bunları çözmek için **önerilen eylemler** oluşturur
3. İsteğe bağlı olarak düşük riskli eylemleri **otomatik yürütür**

### Algılanan Sorun Türleri

| Sorun türü                   | Önem derecesi | Örnek koşul                                                |
| ---------------------------- | ------------- | ---------------------------------------------------------- |
| `provider_circuit_open`      | kritik        | 5 hatadan sonra devre kesicinin açılması                   |
| `provider_circuit_half_open` | uyarı         | Devrenin kurtarmayı test etmesi                            |
| `connection_cooldown`        | uyarı         | 429 sonrasında bağlantının bekleme süresinde olması        |
| `stale_connection_error`     | uyarı         | Son yenilemenin 30+ dakika önce başarısız olması           |
| `terminal_connection_error`  | kritik        | OAuth erişiminin iptal edilmesi, anahtarın geçersiz olması |
| `inactive_connection`        | bilgi         | Bağlantının ayarlarda devre dışı bırakılması               |
| `model_lockout`              | uyarı         | Belirli bir modelin karantinada olması                     |
| `quota_monitor_warning`      | uyarı         | Kota kullanımının %80 veya üzerinde olması                 |

### Oluşturulan Eylem Türleri

| Eylem                          | Risk   | Açıklama                                                 |
| ------------------------------ | ------ | -------------------------------------------------------- |
| `clear_provider_breaker`       | orta   | Devre kesiciyi kapalı durumuna sıfırla                   |
| `clear_connection_cooldown`    | düşük  | Bir bağlantının bekleme süresini kaldır                  |
| `clear_stale_connection_error` | düşük  | Eski hata işaretini temizle                              |
| `clear_model_lockout`          | düşük  | Karantinaya alınmış bir modeli yeniden etkinleştir       |
| `reactivate_connection`        | orta   | Devre dışı bırakılmış bir bağlantıyı yeniden etkinleştir |
| `deactivate_connection`        | yüksek | Sorunlu bir bağlantıyı devre dışı bırak                  |

### API

> **REST uç noktası yoktur.** Otomatik pilot sorunlarına MCP aracı `observability_snapshot` veya kontrol paneli üzerinden erişilebilir. Otomatik pilot dahili olarak çalışır; davranışı ortam değişkenleriyle değil, ayarlar veritabanı üzerinden (bağlantı başına `autopilotMode` alanı) yapılandırılır — otomatik pilot modu için bir ortam değişkenini arayan `grep -rn` komutu sıfır sonuç döndürür.

### Otomatik Pilot Modu

Otomatik pilot varsayılan olarak **manuel modda** çalışır — sorunları algılar ve önerilen eylemleri oluşturur ancak bunları otomatik olarak uygulamaz. Eylemler kontrol paneli üzerinden uygulanabilir.

---

## Kombinasyon Sağlığı Otomatik Pilotu

`comboHealthAutopilot.ts`, sağlayıcı otomatik pilotunun **kombinasyona özel** eşdeğeridir. Şunları gerçekleştirir:

- Sağlıksız kombinasyonları algılar
- Hedeflerin yeniden sıralanmasını önerir
- Bozuk hedeflerin devre dışı bırakılmasını önerir
- N hatadan sonra çalışmayan hedefleri otomatik olarak kaldırır

### Kombinasyon Sorunu Örnekleri

```
Kombinasyon "always-on" (öncelik stratejisi)
├─ Hedef 1: openai/gpt-5 (sağlıklı)
├─ Hedef 2: anthropic/claude-opus-4-6 (⚠️ saat 14:00'e kadar model kilitli)
└─ Hedef 3: kiro/claude-sonnet-4-5 (sağlıklı)

Önerilen eylem: Yeniden sırala — kilit sona erene kadar kiro'yu anthropic'in üzerine taşı
```

---

## Kota İzleyicileri

`observability.ts`, abonelik sağlayıcıları (Claude Code, Codex, GitHub Copilot) için **oturum başına kota izleyicileri** sunar:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Durumların Anlamları

| Durum       | Ne zaman                           | Kullanıcı arayüzü eylemi                     |
| ----------- | ---------------------------------- | -------------------------------------------- |
| `starting`  | İlk yoklama devam ederken          | Dönen yükleme göstergesi                     |
| `idle`      | Yakın zamanda etkinlik olmadığında | Kontrol panelinde gizlenir                   |
| `healthy`   | Kalan kota > %50 olduğunda         | Yeşil nokta                                  |
| `warning`   | Kalan kota < %50 olduğunda         | Sarı uyarı                                   |
| `exhausted` | Kota = %0 olduğunda                | Kırmızı engel, sonraki sağlayıcıya yönlendir |
| `error`     | Yoklama başarısız olduğunda        | Kırmızı nokta, kısa süre içinde yeniden dene |

### API

> **REST uç noktası yoktur.** Kota izleyicisi verilerine MCP aracı `observability_snapshot` veya kontrol paneli üzerinden erişilebilir.

---

## Gözlemlenebilirlik Anlık Görüntüsü

MCP aracı `observability_snapshot`, yapay zekâ ajanları için **eksiksiz bir sistem anlık görüntüsü** döndürür:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* yukarıya bakın */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Ajanlar bunu **yönlendirme kararları** vermek için kullanır — örneğin, "openai devresi açıksa önce anthropic'e yönlendir".

---

## Token Sağlığı Kontrolü

OAuth sağlayıcıları (Claude Code, GitHub Copilot, Cursor) **periyodik token yenileme** gerektirir. `src/lib/tokenHealthCheck.ts`, arka planda bir zamanlayıcı çalıştırır:

- **Tarama tetiklemesi**: her 60 saniyede bir (`src/lib/tokenHealthCheck.ts:30` konumunda `TICK_MS = 60 * 1000` olarak tarama)
- **Bağlantı başına sağlık kontrolü aralığı**: varsayılan olarak 60 dakika (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ayarlar veritabanı üzerinden yapılandırılabilir
- **401 durumunda önleyici yenileme**: bağlantı başına interceptor tarafından gerçekleştirilir

### Token Sağlığı Durumu

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Yapılandırma

Token sağlığı kontrolü yapılandırması, `tokenHealthCheck.ts` tarafından dahili olarak yönetilir.

### Token Sağlığı

> **REST uç noktası yoktur.** Token sağlığı verilerine kontrol paneli veya MCP aracı `observability_snapshot` üzerinden erişilebilir.

---

## Uyarılar

### Yerleşik Kanallar

OmniRoute, **3 uyarı kanalını** destekler:

| Kanal                   | Kurulum             | Kullanım alanı                        |
| ----------------------- | ------------------- | ------------------------------------- |
| Kontrol paneli banner'ı | Her zaman açık      | Uygulama içi bildirimler              |
| Webhook                 | URL'yi yapılandırın | Slack, Discord, PagerDuty             |
| Günlük                  | Varsayılan          | Harici günlük toplama sistemleri için |

### Webhook Yapılandırması

> **Not:** Webhook uyarı yapılandırması, kontrol panelindeki Ayarlar sayfası üzerinden yönetilir. Webhook URL'si, olay filtreleme ve yük özelleştirme seçenekleri için Ayarlar kullanıcı arayüzüne bakın.

### Uyarı Türleri

| Uyarı                        | Ne zaman                                               | Varsayılan önem derecesi |
| ---------------------------- | ------------------------------------------------------ | ------------------------ |
| `provider_circuit_open`      | Devre açıldığında                                      | kritik                   |
| `provider_circuit_half_open` | Devre kurtarma işlemini test ettiğinde                 | bilgi                    |
| `quota_warning`              | Kota %80 veya üzerindeyken                             | uyarı                    |
| `quota_exhausted`            | Kota %100'e ulaştığında                                | kritik                   |
| `token_refresh_failed`       | Art arda 3 veya daha fazla yenileme hatası olduğunda   | uyarı                    |
| `token_expired`              | Token'ın süresi dolduğunda                             | kritik                   |
| `combo_target_unhealthy`     | Combo hedefi 1 saatten uzun süre bekleme durumundayken | uyarı                    |
| `db_integrity_warning`       | FK ihlalleri 0'dan fazla olduğunda                     | uyarı                    |
| `heap_pressure`              | Heap kullanımı eşiğin %80'ini aştığında                | uyarı                    |

---

## Performans Metrikleri

### İzlenen Metrikler

| Metrik                  | Tür       | Kaynak                          |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | sayaç     | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | sayaç     | `services/usage.ts`             |
| `cost_usd`              | sayaç     | `services/usage.ts`             |
| `provider_errors`       | sayaç     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | sayaç     | `services/resilience.ts`        |
| `cache_hits`            | sayaç     | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gösterge  | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gösterge  | `observability.ts`              |

### Gecikme Yüzdelikleri (p50/p95/p99)

> **REST uç noktası yoktur.** Gecikme yüzdeliği verilerine panodaki `/dashboard/health` sayfasından erişilebilir. Prometheus/OpenTelemetry dışa aktarımı v3.9 için planlanmaktadır.

### Prometheus / OpenTelemetry Dışa Aktarımı (Aşama 2)

v3.9 için planlanmaktadır: Prometheus, OpenTelemetry ve Datadog'a yerel dışa aktarım.

Şimdilik herhangi bir HTTP tabanlı izleme sistemiyle (Prometheus blackbox exporter, Datadog HTTP denetimi vb.) `/api/monitoring/health` uç noktasından veri çekin.

---

## Uyarı Tarifleri

### Slack

> **Not:** Webhook uyarıları, panodaki Ayarlar sayfası üzerinden yapılandırılır; özel webhook ortam değişkenleri yoktur (`grep -rn` sıfır sonuç döndürür). Webhook URL'si, olay filtreleme ve yük özelleştirme için Ayarlar kullanıcı arayüzüne bakın.

### Discord

> Webhook uyarıları, Slack ile aynı Ayarlar kullanıcı arayüzü akışını kullanır. Discord aynı JSON yük biçimini kabul eder.

### PagerDuty

> Webhook uyarıları aynı Ayarlar kullanıcı arayüzü akışını kullanır. PagerDuty Events API v2 yönlendirme anahtarları, Ayarlar kullanıcı arayüzünde yapılandırılır.

### Özel Webhook (JSON)

> JSON gövdesiyle POST kabul eden herhangi bir HTTP uç noktası çalışacaktır. URL'yi Ayarlar kullanıcı arayüzünde yapılandırın.

---

## Pano Yapılandırması

### Sistem Durumu Panosunu Özelleştirme

Bir `~/.omniroute/dashboard.json` dosyası oluşturun:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Bir Sağlayıcıyı En Üste Sabitleme

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Sorun Giderme

### "Sağlayıcı sağlıklı olduğunu söylüyor ancak istekler başarısız oluyor"

1. **Otomatik pilot sorunlarını** kontrol edin; bir model kilitlenmiş olabilir
2. Belirli hata sınıfı için **son hatalara** bakın
3. Sağlayıcı kartındaki **bağlantı testini** deneyin
4. Sağlayıcının **üst sistemde hız sınırlandırmasına tabi olup olmadığını** kontrol edin (yerel olarak görünmez)

### "Kota sağlıklı görünüyor ancak 429 hataları alıyorum"

- 429, sağlayıcının kotanızı tükettiğinizi bildirdiği anlamına gelir
- OmniRoute'un kota takibi **güncelliğini yitirmiş** olabilir; geçerli bilgi sağlayıcının üst sistemindedir
- Kota verileri, dahili kota izleyicisi aracılığıyla otomatik olarak yenilenir

### "Kombinasyon başarısız oluyor ancak tüm hedefler sağlıklı görünüyor"

- Hedef sıralama sorunları için **kombinasyon sistem durumu** panosunu kontrol edin
- **Geri dönüş olaylarına** bakın; kombinasyon seçenekleri çok hızlı tüketiyor olabilir
- **Stratejinin** kullanım durumunuzla eşleştiğini doğrulayın (öncelik, sıralı dönüş veya otomatik)

### "Veritabanı sistem durumu denetimi başarısız oluyor"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` komutunu çalıştırın
- Sonuç "ok" ise yanlış alarmdır; sistem durumu denetimi gereğinden katı davranıyordur
- Başka bir sonuç alırsanız **OmniRoute'u durdurun** ve [felaket kurtarma kılavuzunu](./DATABASE_GUIDE.md#disaster-recovery) izleyin

### "Bellek yığın baskısı kritik düzeyde"

```bash
# Mevcut yığını kontrol edin
node -e "console.log(process.memoryUsage())"

# Manuel GC'yi tetikleyin (--expose-gc kullanılıyorsa)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Eşzamanlı istek sayısını azaltın (bir ortam değişkeniyle değil, panodaki Ayarlar sayfasından ayarlanır)
# `MAX_CONCURRENT_REQUESTS` ortam değişkeni yoktur; bunu Ayarlar → Eşzamanlılık bölümünde yapılandırın.
```

---

## Ayrıca Bakınız

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — kullanım ve maliyet takibi
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — veritabanı şeması + sistem durumu
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy sistem durumu (ayrı önbellek)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sistem mimarisi
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — devre kesici ayrıntıları
- Kaynak: `src/lib/monitoring/` (4 dosya, 2121 kod satırı)
