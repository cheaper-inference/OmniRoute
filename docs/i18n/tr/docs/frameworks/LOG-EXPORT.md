# Log export (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute çağrı günlüklerinin harici bir analiz deposuna sürekli, artımlı olarak dışa aktarılması.

Günlükler panosu sekmesi, istek geçmişini SQLite'ta (`call_logs`) tutar; bu geçmiş,
rotasyon ve saklama süresiyle sınırlıdır. Günlük dışa aktarma, aynı kayıt kümesini bir zamanlamaya göre dışarı göndererek yerel
veritabanından daha uzun süre saklanmasını ve diğer verilerle birleştirilmesini sağlar. İlk hedef BigQuery'dir;
işlem hattı bir kayıt defteri yapısındadır, dolayısıyla yeni hedefler mevcut yapıya eklenebilir.

---

## 1. Nasıl çalışır

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Zamanlama** — `log_export` adlı tek bir `JobRegistry` cron işi; varsayılanı `0 * * * *` (saatlik,
  UTC). `src/lib/initCloudSync.ts` içinde kaydedilir; `OMNIROUTE_LOG_EXPORT_CRON` ile değiştirilebilir.
  Her tetiklemede, **etkin** tüm hedeflerin bekleyen kayıtları sırayla aktarılır.
- **İmleç** — SQLite'ın örtük `call_logs.rowid` değeri; hedef başına
  `log_export_destinations.cursor_row_id` içinde kalıcı olarak saklanır. `timestamp` bilinçli olarak imleç olarak kullanılmaz: çağrı yapanlar
  kendi değerlerini sağlayabilir; bu nedenle yavaş bir istek, daha sonra başlayan daha hızlı bir istekten sonra
  yazılabilir ve zaman damgasına dayalı bir imleç bu isteği atlar.
- **Toplu işleme** — istek başına `batch_size` satır (varsayılan 500), çalıştırma başına `max_rows_per_run` satır
  (varsayılan 10000); böylece büyük bir birikim, tek bir tetiklemeyi engellemek yerine birkaç tetiklemede aktarılır.
- **Teslimat** — imleç yalnızca `send()` başarıyla tamamlandıktan sonra ilerler. Başarısız bir toplu işlem,
  imleci olduğu yerde bırakır; böylece aynı satırlar bir sonraki çalıştırmada yeniden denenir. Sağlanan garanti,
  gerçek anlamda tam bir kez teslimat değil, en az bir kez teslimat ile hedef tarafında yinelenen kayıtların ayıklanmasıdır: BigQuery her
  satırı çağrı günlüğü kimliğiyle anahtarlar ve kendi yinelenen kayıt ayıklama zaman aralığı içinde bu anahtarı en iyi çaba esasına göre dikkate alır.
- **Çakışma koruması** — cron tetiklemesi ile `POST .../run` aynı anda devreye girebilir. Kayıtları
  zaten aktarılmakta olan bir hedef, iki kez işlenmek yerine atlanır (çalıştırma sonucunda `skipped: true`);
  böylece eşzamanlı bir çalıştırma, bir toplu işlemi yeniden gönderemez veya imleci geriye yazamaz.
- **Temizleme sonrası kurtarma** — `cursor_row_id`, `MAX(rowid)` değerinin üzerine çıkarsa (tablonun tamamı
  temizlenmiş ve rowid değerleri yeniden başlamışsa), çalıştırıcı kalıcı olarak yeni kayıtları göremez hâle gelmek yerine 0'a geri döner.

### Yalıtılmış çalıştırıcı ve sınırlar

Node üzerinde her hedef çalıştırması ayrı, kısa ömürlü bir işletim sistemi alt süreci başlatır (IPC kullanan
`child_process`, `worker_threads` değil). Gövde okumaları, yükün JSON olarak ayrıştırılması/serileştirilmesi, hedefin
`prepare()` işlemi ve hedefin ağ G/Ç işlemlerinin tümü sunucunun olay döngüsünde değil, burada çalışır.
IPC üzerinden yalnızca yapılandırma ve küçük ilerleme mesajları geçer; dışa aktarılan kayıtlar hiçbir zaman
sunucuya geri dönmez. Cron işi ve Şimdi çalıştır rotası, dışarıya sunulan aynı sonucu ve çakışma korumasını korur.

Alt süreç, sunucunun çözümlenmiş `DATA_DIR/storage.sqlite` dosyasını `node:sqlite` kullanarak salt okunur biçimde,
`busy_timeout=5000` ve `query_only=ON` ayarlarıyla açar. Hiçbir veritabanı tekil örneğini içe aktarmaz ve hiçbir
geçiş, yedekleme veya SQLite güncellemesi gerçekleştirmez. Eksik/bozuk artefakt kayıt takibi (bozuk artefakta ilişkin
UPDATE işlemi dâhil) yalnızca pano ayrıntı yolunda kalır. Her iki yol da saf bir
ayrıntı çözümleyicisini paylaşır; dışa aktarma, eşzamansız dosya sistemi okumalarını ve aynı artefakt → eski
satır içi → eski disk → yok çözümleme sırasını kullanır. Alt süreç okuyucusunu açtığında çalıştırma,
en yüksek ekleme rowid değerinin anlık görüntüsünü alır; daha sonraki eklemeler bir sonraki çalıştırmayı bekler. Bu bir ekleme
sınırıdır, uzun ömürlü bir SQLite işlemi değildir: WAL yazıcıları ve denetim noktaları ağ beklemeleri sırasında
serbest kalır. Mevcut satırlardaki güncellemeler/silmeler bu sınır tarafından dondurulmaz.

Kabul edilen her toplu işlemden sonra alt süreç bir onay bekler. Sunucu önce
`advanceLogExportCursor` ile imleci kalıcı olarak kaydeder, ardından `ack` gönderir; bundan önce bir sonraki toplu işlem başlamaz.
Gönderim hatası, çökme veya zaman aşımı, ilgili toplu işlemin imlecini ilerletmeden başarısızlık kaydı oluşturur. Önceden
onaylanmış toplu işlemler kalıcı olarak kaydedilmiş durumda kalır; en fazla, onaylanmamış tek toplu işlem yeniden gönderilebilir.
Başarı yalnızca `done` sonrasında ve alt süreç sorunsuz biçimde çıktıktan sonra kaydedilir. Başarısızlık durumunda alt süreç
SIGTERM ile sonlandırılır; 500 ms sonra SIGKILL'e geçilir ve çalıştırıcı sürecin kapanmasını bekler.

| Ortam değişkeni                               | Varsayılan | Amaç                                         |
| --------------------------------------------- | ---------- | -------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | Hedef başına geçen gerçek süre sınırı        |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | Alt sürecin MB cinsinden V8 old-space sınırı |

Geçersiz/pozitif olmayan/tam sayı olmayan değerlerde varsayılanlar kullanılır. Yığın ayarı, toplam
RSS sınırı değildir; çok büyük toplu işlemler yine de alt sürecin belleğini tüketebilir ve çalıştırmanın güvenli biçimde başarısız olmasına yol açabilir.
1024 MB varsayılanı, gövdeler etkinleştirilmişken 512 KiB artefaktlardan oluşan varsayılan 500 satırlık toplu işlem için,
BigQuery'nin bayt bazında parçalara ayrılmış JSON serileştirmesi de dâhil olmak üzere ek alan bırakır. Bu, gövde içeren
10000 satırlık bir toplu işlemi güvenli hâle getirmez. V8 yığınının tükenmesi, çözüm adımı içeren bir hata kaydı oluşturur: toplu işlem
boyutunu küçültün veya `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` değerini artırın; imleç son
onaylanan toplu işlemde kalır. Geçmişten kalan satır içi/disk gövdeleri, modern artefakt boyut sınırının kapsamında değildir.
Operatörler, özellikle bellek sınırı olan kapsayıcılarda RSS için ayrıca bütçe ayırmalıdır.

Alt süreç yalnızca çözümlenmiş `DATA_DIR`, `NODE_ENV`, açıkça belirtilmiş `TZ` (eski dosya adı
yerel saat çözümlemesi), mevcut olduğunda `ELECTRON_RUN_AS_NODE` ve şu dış bağlantı girdilerini devralır:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (ve bunların küçük harfli biçimleri),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Genel bir Undici dağıtıcısı, `NO_PROXY` dahil olmak üzere sunucunun yalnızca ortam değişkenlerine dayalı proxy çözümlemesini ve yerel ana bilgisayarlar için
proxy'yi atlama kurallarını paylaşır; `proxyFetch.ts` dosyasını veya onun veritabanı/özellik bayraklarını içe aktarmaz.
Proxy kimlik bilgileri, iletilen çıktılardan ve kaydedilen hatalardan çıkarılarak gizlenir. Hedef kimlik bilgileri
yalnızca tek bir başlatma IPC iletisinde taşınır; asla argv veya ortam üzerinden aktarılmaz; çıktı/hata iletimine
önek eklenir ve içerik temizlenir. Her cron çalıştırmasında Node'un SQLite uyarısının
tekrarlanmasını önlemek için alt süreç yürütme argümanlarında yalnızca `ExperimentalWarning` devre dışı bırakılır; diğer uyarı türleri görünür kalır.

Hedef modülleri, Next.js/yalnızca sunucuya özgü bağımlılıklar olmadan içe aktarılabilir olmalıdır. Mevcut
BigQuery uygulaması bu sözleşmeyi zaten karşılar. Erişim belirteci önbellekleri yalnızca alt sürecin
çalışması boyunca geçerlidir, çalıştırmalar arasında korunmaz. Desteklenen çalışma zamanı Node'dur (`package.json` engines), ancak README'nin Bun
kurulum bölümü ve `Dockerfile.bun`, `bun:sqlite` (`src/lib/db/core.ts` / bağdaştırıcılar) kullanan bir üretim uyumluluğu yolunu da
duyurur. Bu nedenle Bun altında dışa aktarımlar önceki
süreç içi yolu korur ve bir defalık uyarı verir: alt süreç yığın belleği/zaman aşımı yalıtımı kullanılamaz.
Olay döngüsü ve OOM yalıtımı için Node kullanın; burada Bun yalnızca geliştirmeye yönelik olarak değerlendirilmez.

`includeBodies` etkinleştirildiğinde, saatlik bir veri yükü birikimi oluşturmak yerine
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` gibi dakika düzeyinde bir çalışma sıklığını tercih edin.
Toplu işlem ve satır sınırları yine de her çalıştırmayı sınırlar. Süreç başlatma maliyeti, her çalıştırmada her hedef için ödenir;
bu, toplam CPU kullanımını azaltmak yerine küçük bir başlatma maliyeti karşılığında sunucunun olay döngüsünü yalıtır.

### Veri yükleri (istemler ve tamamlamalar)

Varsayılan olarak dışa aktarım yalnızca Günlükler **listesinin** gösterdiği özet alanlarını taşır.
**İstemleri ve yanıtları dışa aktar** (`includeBodies`) seçeneğini açmak, Günlükler **ayrıntı**
bölmesinin her çağrı için gösterdiklerini de gönderir:

| Alan                             | İçerdiği bilgi                                                                |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `request_body` / `response_body` | Çağrı veri yükleri, panoda görüntülendikleri biçimde                          |
| `pipeline_route_decision`        | Yönlendiricinin seçtiği hedef ve model                                        |
| `pipeline_client_request`        | İstemcinin gönderdiği biçimiyle ham istek                                     |
| `pipeline_openai_request`        | Dahili OpenAI biçimine dönüştürüldükten sonraki hali                          |
| `pipeline_provider_request`      | Üst sisteme gerçekten gönderildiği biçimde, sağlayıcının formatında           |
| `pipeline_provider_response`     | Üst sistemden gelen ham yanıt                                                 |
| `pipeline_client_response`       | Çağrıyı yapana geri iletilen içerik                                           |
| `pipeline_error`                 | Başarısız bir çağrı için işlem hattı düzeyindeki hata ayrıntısı               |
| `bodies_truncated`               | Yukarıdaki alanlardan herhangi biri `maxBodyBytes` sınırına ulaştığında doğru |

Bu, istem içeriğidir; dolayısıyla **varsayılan olarak kapalıdır** ve bilinçli olarak hedef başına seçilir.
Gönderilen içerik, panonun gösterdiği içeriktir; çünkü dışa aktarım ve `getCallLogById` aynı ayrıntı
çözümlemesini paylaşır: veri yükleri
yazıldıklarında zaten kişisel olarak tanımlanabilir bilgilerden arındırılmış ve gizli bilgileri maskelenmiştir; ayrıca
`noLog` API anahtarıyla yapılan bir çağrı hiçbir veri yükü saklamaz, dolayısıyla dışa aktarılacak bir şey yoktur.

Veri yükleri, dosya sistemindeki çıktı dosyasından satır başına okunur; dolayısıyla ayrıntıların yüklenmesi yalnızca
bunu isteyen hedefler için gerçekleştirilir. Eksik veya bozuk bir çıktı dosyası, toplu işlemin başarısız olmasına ve imlecin ilerleyememesine
neden olmak yerine özetinin null veri yükleriyle dışa aktarılmasını sağlar.

`maxBodyBytes` (varsayılan 262144) her alanı sınırlar. Daha uzun veri yükleri **atılmak yerine
kısaltılır** — kısaltılmış bir istem bile "ne soruldu" sorusunu yanıtlar — ve satır
`bodies_truncated` ile işaretlenir. Akış halinde parça parça gelen farklar dışa aktarılmaz; birleştirilmiş yanıt
zaten `pipeline_provider_response` ve `pipeline_client_response` içinde bulunur.

---

## 2. Dosyalar

| Bileşen                                 | Konum                                        |
| --------------------------------------- | -------------------------------------------- |
| Hedef sözleşmesi                        | `src/lib/logExport/types.ts`                 |
| Kayıt defteri                           | `src/lib/logExport/registry.ts`              |
| Gizli bilgi işleme                      | `src/lib/logExport/secrets.ts`               |
| Çalıştırıcı (üst süreç IPC)             | `src/lib/logExport/runner.ts`                |
| Süreç yaşam döngüsü                     | `src/lib/logExport/childRunner.ts`           |
| Alt süreç giriş noktası                 | `src/lib/logExport/exportChild.ts`           |
| Salt okunur açıcı                       | `src/lib/db/logExportReadOnly.ts`            |
| Paylaşılan sorgu/eşleme                 | `src/lib/usage/callLogExportQueries.ts`      |
| Ayrıntı çözümleyici                     | `src/lib/usage/callLogDetailResolver.ts`     |
| API izdüşümü                            | `src/lib/logExport/presenter.ts`             |
| BigQuery hedefi                         | `src/lib/logExport/destinations/bigquery.ts` |
| Google hizmet hesabı kimlik doğrulaması | `src/lib/logExport/googleServiceAccount.ts`  |
| Çağrı günlüğü kaynağı                   | `src/lib/usage/callLogExportSource.ts`       |
| Kalıcı depolama                         | `src/lib/db/logExportDestinations.ts`        |
| Cron görevi                             | `src/lib/jobs/logExportJob.ts`               |
| REST katmanı                            | `src/app/api/log-export/`                    |
| Kontrol paneli sayfası                  | `src/app/(dashboard)/dashboard/log-export/`  |

Şema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Tüm rotalar yönetim kimlik doğrulaması gerektirir (`requireManagementAuth`). Gizli bilgiler asla döndürülmez:
saklanan bir gizli bilgi, doğrudan `__stored__` değeri olarak döner ve bir güncellemede bu değerin geri gönderilmesi
saklanan kimlik bilgisini korur.

Türü bir gizli bilgi tanımlayan bir hedefi oluşturmak veya güncellemek **`STORAGE_ENCRYPTION_KEY`
gerektirir**. Bu anahtar olmadan `encrypt()` veriyi sessizce olduğu gibi geçirir; bu nedenle kimlik bilgisini
SQLite'a düz metin olarak yazmak yerine yazma işlemi 400 ile reddedilir (Telegram webhook'unun
uyguladığı korumanın aynısı).

| Yöntem   | Yol                                      | Amaç                                                                        |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Hedef türleri + yapılandırma alanı listeleri                                |
| `GET`    | `/api/log-export/destinations`           | Hedefleri listele (gizli bilgiler gizlenmiş olarak)                         |
| `POST`   | `/api/log-export/destinations`           | Bir hedef oluştur                                                           |
| `GET`    | `/api/log-export/destinations/{id}`      | Tek bir hedefi oku                                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | Adı / etkinlik durumunu / yapılandırmayı / toplu işleme ayarlarını güncelle |
| `DELETE` | `/api/log-export/destinations/{id}`      | Sil                                                                         |
| `POST`   | `/api/log-export/destinations/{id}/test` | Kimlik bilgilerini sına, hiçbir şey yazma                                   |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Bekleyenleri şimdi aktar, zamanlanmış çalıştırmayla aynı yolu kullan        |
| `GET`    | `/api/log-export/status`                 | Cron durumu, son çalıştırmalar, hedef başına bekleyen birikim               |

Kullanıcı arayüzünü genel amaçlı kılan, `GET /api/log-export/types` uç noktasıdır: kontrol paneli formu
döndürülen alan tanımlayıcılarından oluşturulur; böylece yeni bir hedef için kullanıcı arayüzünde değişiklik gerekmez.

---

## 4. BigQuery hedefi

Yapılandırma anahtarları (`type: "bigquery"`):

| Anahtar              | Notlar                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `projectId`          | Veri kümesini barındıran GCP projesi                                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                                           |
| `location`           | Yalnızca veri kümesi oluşturulması gerektiğinde kullanılır (varsayılan `EU`)              |
| `serviceAccountJson` | Hizmet hesabı anahtarı. Gizli bilgi: depolamada şifrelenir, hiçbir zaman geri döndürülmez |
| `autoCreate`         | İlk dışa aktarmada veri kümesini ve tabloyu oluşturur (varsayılan `true`)                 |

Hizmet hesabının hedef tabloda `bigquery.tables.updateData` iznine, ayrıca
`autoCreate` açıkken `bigquery.datasets.create` / `bigquery.tables.create` izinlerine ihtiyacı vardır.

Yapılandırılan bir toplu işlem, HTTP birimi değil, bir **imleç** birimidir: `send()` bunu en fazla
500 satırlık insertAll çağrılarına böler; böylece büyük bir `batch_size`, BigQuery'nin 10 MB istek sınırını aşamaz.
Geçici durum kodlarında (408/429/500/502/503/504), aynı insertIds değerleri yeniden kullanılarak üstel
bekleme ile en fazla üç kez yeniden denenir; kimlik doğrulama ve şema hatalarında ise çalıştırmayı
boşa harcamak yerine ilk denemede hata fırlatılır.

Az önce oluşturulan bir tablo henüz akış uç noktasında görünmez ve uç nokta birkaç saniye boyunca
404 yanıtı verir. Bu 404 için yeniden deneme yapılır, ancak **yalnızca tablo bu çalıştırmada oluşturulduysa** —
gerçekten mevcut olmayan bir tablo için yine hemen hata verilir. Yakın zamanda silinmiş bir tablo adıyla
yeniden tablo oluşturmanın, BigQuery'nin birkaç dakika boyunca akış yoluyla satır eklemeyi reddetmesine
neden olduğunu unutmayın; bu, silip yeniden oluşturma işleminin bir özelliğidir. Bu nedenle bir tabloyu
silip yeniden eklemek yerine yeni bir tablo adı kullanmayı tercih edin.

**Kısmi hata, boş olmayan bir `insertErrors[]` ile HTTP 200 olarak gelir.** Bu durum hata olarak
değerlendirilir ve hata fırlatılır; imlecin BigQuery'nin hiç kabul etmediği satırları geçerek ilerlemesini
engelleyen de budur. `tests/unit/log-export-bigquery.test.ts` bu davranışı güvence altına alır.

İletişim doğrudan REST üzerinden yapılır — kendinden imzalı bir RS256 beyanı,
`https://oauth2.googleapis.com/token` adresinde bir erişim belirteciyle değiştirilir, ardından satırlar
`tabledata.insertAll` adresine gönderilir. Hiçbir Google SDK'sı bağımlılık olarak eklenmez.
Erişim belirteçleri, her (hizmet hesabı, kapsam) çifti için süreç içinde önbelleğe alınır.

Oluşturulan tablo, Günlükler sekmesindeki her alan için bir sütun ve ek olarak `exported_at` sütununu içerir;
düzeni, çağrı günlüklerinin gerçekte nasıl sorgulandığına göre belirlenir:

- **`timestamp` üzerinden gün bazında bölümlenir**; böylece tarihle sınırlandırılmış bir sorgu yalnızca ilgili günleri tarar.
- **`api_key_name`, `provider`, `model`, `status` üzerinden kümelenir** (bu sırayla); böylece çağrıyı
  kimin yaptığına, nereye gönderildiğine veya başarısız olup olmadığına göre filtreleme, her bölüm içindeki
  blokları tarama dışında bırakır. BigQuery en fazla dört kümeleme sütununa izin verir ve sıralama önemlidir:
  yalnızca `api_key_name` üzerindeki bir filtre blokları elerken, yalnızca `status` üzerindeki bir filtre bunu yapmaz.
- `partitionExpirationDays` aracılığıyla **isteğe bağlı bölüm saklama süresi** (0 her şeyi saklar),
  tablo oluşturulurken uygulanır.

Her iki ayar da oluşturma sırasında uygulanır. Mevcut bir tablo, hâlihazırdaki düzenini korur;
bu ayarları kullanmak istiyorsanız hedefi yeni bir tablo kimliğine yönlendirin.

`tests/unit/log-export-bigquery.test.ts`, eşleyici ile tablo şemasının eşzamanlı kaldığını doğrular;
böylece yeni bir çağrı günlüğü sütunu dışa aktarım sırasında sessizce atılamaz.

Toplu işlemler **hem** satır sayısına **hem de** serileştirilmiş bayt miktarına göre parçalara ayrılır.
İçerik yükleri dışa aktarıldığında yalnızca satır sayısı yeterli değildir: istem içeren 500 satır onlarca
megabayt tutabilir ve insertAll, 10 MB'ı aşan bir isteği reddeder. Parçalar, hangisine önce ulaşılırsa,
500 satırda veya 9 MB'ta sonlandırılır.

---

## 5. OTLP/HTTP iz hedefi

Yapılandırma `type: "otlp-http"` kullanır. Bu, kalıcı olarak saklanan çağrı günlüklerinin zamanlanmış, imleç tabanlı bir dışa aktarımıdır;
`open-sse/services/routing/otel.ts` içindeki en iyi çaba esaslı canlı yönlendirme olayı alıcısı değildir.
Bu alıcının ortam değişkenlerini, zamanlayıcılarını veya arabelleklerini okumaz ya da değiştirmez.
Her ikisinin etkinleştirilmesi, birbirinden bağımsız iki tür span üretebilir;
bu çağrı günlüğü span'lerini ayırt etmek için `omniroute.log-export` enstrümantasyon kapsamını kullanın.

| Anahtar                  | Varsayılan / amaç                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `endpoint`               | Gerekli tam HTTP(S) iz URL'si; sonuna `/v1/traces` eklenmez                            |
| `headers`                | İsteğe bağlı `Name: value` satırları veya dizelerden oluşan JSON nesnesi; şifrelenir   |
| `requestHeaderAllowlist` | Boş (kapalı); span öznitelikleri olarak yakalanacak istemci üstbilgisi adları/önekleri |
| `serviceName`            | `omniroute`; kaynak `service.name`                                                     |
| `langfuseMapping`        | `false`; Langfuse üretim/oturum/kullanıcı özniteliklerini ekler                        |
| `identity`               | `pseudonymous`, `keyName` veya `none`                                                  |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                |
| `timeoutMs`              | HTTP denemesi başına `30000`                                                           |
| `environment`            | Ayarlanmamış; isteğe bağlı `langfuse.environment`                                      |

Genel gösterge paneli bu alanları görüntüler. `paths`, bir API dizisini veya tam yolların
yeni satırlarla/virgüllerle ayrıldığı bir metin alanını kabul eder. Gömme, yeniden sıralama ve diğer yollar,
açıkça izin verilmedikçe atlanır. Atlanan satırlar da imleci ilerletir; mevcut
çalıştırıcının `exported`/`exportedTotal` sayaçları, kabul edilen span'ler yerine filtrelenen
satırlar dahil işlenen kaynak satırlarını sayar. Filtreleme, alt süreçte,
IPC/imleç sözleşmesi değiştirilmeden yapılır.

URL doğrulaması, `src/shared/network/outboundUrlGuard.ts` içindeki veritabanı gerektirmeyen
`parseAndValidateNonMetadataUrl` yardımcı işlevini kullanır: `block-metadata` ilkesi. Özel URL'lere
izin verilmiş webhook doğrulayıcısıyla aynı koşulsuz meta veri/protokol/gömülü kimlik bilgisi denetimlerini
uygular, ancak genel bir özellik bayrağı geçersiz kılmasına gerek olmadan localhost/LAN hedeflerine
bilinçli olarak izin verir. Bu, özel HTTP uç noktaları dahil, kendi sunucunuzda barındırılan
Langfuse, Phoenix, Tempo ve Collector uç noktalarını kullanmayı mümkün kılar. Bulut meta verisi sunucuları her zaman engellenir.
Yönlendirmeler izlenmez; dolayısıyla bir toplayıcı, kimlik bilgilerini farklı bir sunucuya yönlendiremez.
Mevcut sözcüksel URL koruması gibi bu da DNS çözümlemesini sabitlemez; yalnızca
operatörün denetimindeki sunucuları yapılandırın. Uç nokta güvenilir bir ağda değilse HTTPS'yi tercih edin.

### Yük ve teslimat

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`), izin verilen
her satır için, tam istek yolu ile adlandırılmış bir CLIENT span taşır. Yola göre adlandırma,
span adına model veya kimlik verileri eklemeden Chat Completions, Responses ve Messages'ı
birbirinden ayırır. Kaynak öznitelikleri `service.name` ve paketin `service.version` değerini içerir.

Normal sohbet denemesi günlükleyicisi (`open-sse/handlers/chatCore/attemptLogging.ts`), tamamlandığında
`duration = Date.now() - startTime` yazar ve zaman damgası sağlamaz;
`src/lib/usage/callLogs.ts` içindeki `saveCallLogOperation`, zaman damgasını varsayılan olarak yazma
(tamamlanma) zamanına ayarlar. Bu nedenle dışa aktarım, bitiş = satır zaman damgası ve başlangıç = bitiş − süre
(milisaniye, ondalık nanosaniyeye dönüştürülür) olarak ayarlanır. Çağıran tarafından sağlanan geçmiş zaman damgaları da
bitiş zamanı olarak korunur; satır bazında başlangıç/tamamlanma ayrımı yoktur.
Null süre sıfır olur. Geçersiz/eksik zaman damgaları, belirlenimci olmayan span'ler oluşturmak yerine
toplu işlemin başarısız olmasına neden olur. `ttftMs` null olabilir ve `omniroute.ttft_ms` ile eşlenir.

Öznitelikler; `gen_ai.operation.name="chat"`, sağlayıcı, istenen/yanıt modeli,
girdi/çıktı token'ları, isteğe bağlı önbellek okuma/önbellek oluşturma/akıl yürütme token'ları, HTTP durumu,
combo, önbellek kaynağı, oturum etiketi ve korelasyon kimliğini içerir. Tamsayı OTLP değerleri ve zaman damgaları
ondalık dizelerdir; dizeler, boole değerleri ve kesirli sayılar, kendilerine özgü OTLP değer
türlerini kullanır. Hata span'leri ERROR durumuna ve hassas bilgilerden arındırılmış bir durum iletisine sahiptir. Standart
kayıt, üst hizmetin sunucu URL'sini içermez; bu nedenle toplayıcıyı yanlışlıkla model sunucusu olarak
tanımlamak yerine `server.address` atlanır. Maliyet dışa aktarılmaz.

İçeriği yalnızca `includeBodies=true` yükler. `langfuseMapping=false` olduğunda,
`gen_ai.input.messages` / `gen_ai.output.messages`, yeniden şekillendirilmiş bir semconv
mesaj dizisini değil, OmniRoute tarafından saklandığı biçimiyle hassas bilgilerden arındırılmış istek/yanıt
gövdesi JSON'unu (ayrıştırılabiliyorsa standartlaştırılmış olarak) taşır. Kırpılmış/JSON olmayan gövdeler ham metin olarak kalır. `langfuseMapping=true` olduğunda,
gövdeler yalnızca `langfuse.observation.input` / `langfuse.observation.output` olarak gönderilir;
her gövdenin bir kez gönderilmesi için `gen_ai.*.messages` öznitelikleri atlanır. Her iki mod da
`maxBodyBytes` değerini mevcut içerik yükleme yolundan devralır;
`omniroute.bodies_truncated=true` kırpılmayı belirtir.
Bu hedef, ek işlem hattı anlık görüntüleri veya hassas bilgilerden arındırılmamış artefakt okumaları eklemez;
isteğe bağlı istek üstbilgisi yakalama, aşağıda açıklanan mevcut yüklenmiş istemci anlık görüntüsünü kullanır.
Gövdeleri dışa aktarırken saatlik bir birikim oluşturmak yerine
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` gibi dakika düzeyinde bir sıklık kullanın.

### İsteğe bağlı istemci istek üstbilgileri

Üstbilgi yakalama **varsayılan olarak kapalıdır**. Hedef yapılandırmasında `requestHeaderAllowlist` değerini ayarlayın
ve **İstemleri ve yanıtları dışa aktar** seçeneğini etkinleştirin (hedefte `includeBodies: true`).
İzin listesi, bir API dizisini veya adların yeni satırlarla/virgüllerle ayrıldığı bir metin alanını kabul eder:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Adlar, sondaki tek bir `*` boş olmayan bir başlık adı öneki seçmediği sürece, büyük/küçük harfe duyarsız ve tam olarak eşleşir.
Tek başına `*`, araya yerleştirilmiş joker karakterler ve geçersiz HTTP başlık adları reddedilir.
En fazla 64 seçici olabilir; her birinin adı/öneki en fazla 256 ASCII baytı olabilir.
Bu ayar, dışa aktarıcının toplayıcıya karşı kimliğini doğrulayan `headers` ayarından ayrıdır.

Yakalama yalnızca, kaydedilmiş ayrıntılı işlem hattının
`clientRawRequest` (veya eski `clientRequest`) alanından doldurulan `pipeline_client_request` alanını okur. Hiçbir zaman sağlayıcı istek başlıklarına geri dönmez.
İstek kaydedildiğinde ayrıntılı işlem hattı günlüklemesinin etkinleştirilmiş olması gerekir.
`includeBodies` devre dışıysa veya istemci anlık görüntüsü JSON'u eksik, bozuk ya da kırpılmışsa hiçbir başlık
özniteliği üretilmez. `maxBodyBytes` değerini artırmak, dışa aktarma sırasında anlık görüntünün kırpılmasını önleyebilir;
hiç kaydedilmemiş ayrıntıları geri getiremez. 1 MiB'ı aşan veya
256'dan fazla başlık girdisi içeren bir anlık görüntü yok sayılır. Mevcut istem/yanıt dışa aktarımı, başlık yakalamayla
birlikte etkin kalır; izin listesi, yalnızca başlıkları yükleyen bir mod sağlamaz.

Seçilen değerler, tek bir dize için bile `http.request.header.<full lowercase header name>` OTLP dize dizilerine dönüşür.
Örneğin, `X-OmniRoute-Meta-Team: example-team`,
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` değerine sahip
`http.request.header.x-omniroute-meta-team` özniteliğine dönüşür.
Önekin tamamı korunur: bunlar sıradan başlıklardır; iş alanı ayrıştırması veya
`omniroute.metadata.*` / Langfuse meta verisi dönüşümü yapılmaz. `langfuseMapping`, başlık
anlamını değiştirmez. Seçilen tek değerli bir `User-Agent`, standart skaler
`user_agent.original` özniteliğini de ayarlar. Tek bir değerin içindeki virgüllere göre bölme yapılmaz. Büyük/küçük harf varyantları, kaydedilmiş
girdi sırasına göre birleştirilir; herhangi bir geçersiz varyant, başlığın tamamının atlanmasına neden olur. Öznitelikler küçük harfli ada göre sıralanır.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API anahtarı başlıkları, adlarında
auth/token/secret/password/credential belirteçleri bulunan başlıklar ve dahili ağ geçidi kimlik bilgileri,
seçilmiş veya depolamada kısmen maskelenmiş olsalar bile her zaman hariç tutulur. Bilinen kimlik bilgisi örüntüleri için
ortak kimlik bilgisi algılayıcısı yeniden kullanılır; sansürleme işaretleri atlanır, güvenli değerler olarak dışa aktarılmaz.
Yalnızca dizeler ve boş olmayan dize dizileri kabul edilir; sayılar veya nesneler zorla dönüştürülmez.
Geçersiz adlar, prototip anahtarları, kontrol karakterleri (yatay sekme hariç) ve hatalı Unicode,
toplu işlemin başarısız olmasına neden olmadan veya içerikleri hatalara yansıtılmadan yok sayılır.

Her span en fazla 32 başlık, başlık başına 16 değer, değer başına 4096 UTF-8 baytı
ve yakalanan başlık adları ile değerlerinin tamamında toplam 16384 UTF-8 baytı yakalar. Boyutu aşan/geçersiz başlıklar
bütünüyle atlanır, kırpılmaz. Seçim, operatörün gizlilik kararıdır: güvenli görünen adlar
yine de kişisel veriler içerebilir ve bu sınırlar/algılayıcılar genel amaçlı bir kişisel veri temizleyicisi değildir.

### Teslimat sınırları

İstekler, zarf dahil 500 span ve 4 MiB UTF-8 JSON ile sınırlıdır.
İzin verilen her span, bir imleç grubunun ilk isteğinden önce boyut denetiminden geçirilir. Tek bir
span sınırı aşarsa grubun hiçbir bölümü gönderilmez ve `maxBodyBytes` değerinin düşürülmesini
öneren bir hatayla işlem başarısız olur; span sessizce atılmaz. Ön kontrol yalnızca kayıt referanslarını ve
bayt sayılarını tutar, her geçici span/JSON'u atar; grubun serileştirilmiş ikinci bir kopyasını
tutmak yerine span'ler, boyutu sınırlı parçalar için yeniden oluşturulur. HTTP 408/429/5xx, ağ hataları ve zaman aşımları için
250/500 ms üstel geri çekilmeyle en fazla üç deneme yapılır. `Retry-After` saniyeleri veya HTTP tarihleri,
gecikmeyi en fazla 5 saniyeye uzatabilir. Diğer durumlarda işlem hemen başarısız olur. OTLP 2xx kısmi reddi de
kaybolan bir span'i onaylamak yerine hata fırlatır; boş veya geçerli JSON onayları,
64 KiB yanıt okuma sınırıyla kabul edilir.

Hatalar yalnızca dışa aktarıcıya ait olguları içerir: HTTP durumu, yeniden deneme sınıfı, deneme sayısı ve gönderilen span
sayısı ya da sabit onay/ağ hatası ifadeleri. Toplayıcı yanıt gövdeleri,
kısmi başarı sayıları ve yanıt başlıkları hiçbir zaman hatalara, günlüklere veya
panoya kopyalanmaz. Başarısız olan veya kısmen kabul edilen bir grup onaylanmaz: hedef,
ilgili durumla Başarısız olarak görünür, imleç son onaylanan grupta kalır ve sonraki çalıştırma
aynı satırları yeniden gönderir. Kalıcı durumlarda, toplayıcı veya yapılandırma
düzeltilene kadar işlem başarısız olmaya devam eder. Yanıt ayrıntıları için toplayıcının kendi günlüklerini kullanın. Çağrı günlüğü hata özetleri,
ayrı sansürleme işlemlerini korur.
`prepare()` hiçbir kaynak sağlamaz; Test tam olarak `{"resourceSpans":[]}` gönderir ve
çağrı günlüğü span'lerini yazmadan HTTP durumunu bildirir.

İz kimlikleri ve span kimlikleri, sırasıyla
`"omniroute.trace\\0" + callLogId` ve `"omniroute.span\\0" + callLogId` üzerinde hesaplanan SHA-256 değerinin ilk 32/16 onaltılık basamağıdır. Yeniden gönderimler
aynı kimlikleri taşır. Bu, yinelenen kayıtların ayıklanacağını garanti etmez: Langfuse
v4 veri alımı dahil bazı arka uçlar, aynı kimliğe sahip span'leri tekilleştirmez. Bir çökme veya parçanın kısmen başarısız olması,
en fazla onaylanmamış tek imleç grubunun yeniden gönderilmesine neden olabilir; yalnızca son HTTP parçası değil,
grubun tamamı yinelenebilir. İmleç grubu boyutunu bu ödünleşimi göz önünde bulundurarak seçin.

### Langfuse örneği

Kendi barındırdığınız bir Langfuse örneği için şu alanları yapılandırın:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Authorization değerini, `public-key:secret-key` sabit dizesinin Base64 kodlaması olarak yerel ortamda oluşturun
(örneğin `Buffer.from(publicKey + ":" + secretKey).toString("base64")` ile).
Gerçek kimlik bilgilerini günlüklere, ekran görüntülerine veya sorun bildirimlerine yapıştırmayın. Eşleme,
`x-langfuse-ingestion-version: 4` başlığını otomatik olarak ayarlar; Authorization yine `headers` içinde sağlanır.
Hem başlıklar hem de oluşturulan kimlik tuzu, mevcut şifrelenmiş gizli alan
mekanizmasını ve API yer tutucularını kullanır; `STORAGE_ENCRYPTION_KEY` gereklidir.

Eşleme; üretim türünü/modelini, JSON kullanım ayrıntılarını (girdi/çıktı/toplam ve mevcut
önbellek anahtarları), JSON girdi/çıktı anlık görüntülerini, ERROR/DEFAULT düzeyini, temizlenmiş durum mesajını,
iz adını, oturum kimliğini, isteğe bağlı ortamı ve sağlayıcı, istenen model, yol, kombinasyon, önbellek
kaynağı ve durum için filtrelenebilir `langfuse.observation.metadata.<key>` alanını ekler.
`langfuse.observation.completion_start_time`, yalnızca TTFT biliniyorsa ve süre sınırları içindeyse
başlangıç + TTFT zamanını ISO 8601 biçiminde içerir. Hiçbir maliyet özniteliği gönderilmez.

Kimlik modları `langfuse.user.id` için geçerlidir:

- `pseudonymous` (varsayılan): API anahtarının dahili kimliğinin, her hedef için rastgele oluşturulan
  32 baytlık bir salt ile hesaplanan HMAC-SHA256 değeri. Salt yoksa oluşturma sırasında üretilir,
  `identitySalt` olarak şifrelenir, hiçbir zaman döndürülmez ve düzenlemeler sırasında korunur. Ham anahtar kimlikleri
  hiçbir zaman span özniteliklerine konulmaz. Bir hedefin salt değerinin yeniden oluşturulması/döndürülmesi kimlikleri değiştirir.
- `keyName`: yapılandırılmış API anahtarı adı; bu operatör etiketini kasıtlı olarak açığa çıkarır.
- `none`: kullanıcı kimliği yoktur. Oturum etiketleri mevcut olduğunda yine dışa aktarılır; bu modlar
  rastgele istem içeriğini veya operatörün sağladığı oturum/korelasyon etiketlerini anonimleştirmez.

### Geçmiş verileri aktarmadan başlatma

Yalnızca oluşturma sırasında **Geçerli konumdan başlat (mevcut günlükleri atla)** seçeneğini etkinleştirin veya
oluşturma API'si yükünün en üst düzeyinde `startFromCurrentPosition: true` iletin. Bu işlem,
mevcut imleç yardımcılarını kullanarak, bir geçiş gerektirmeden `cursor_row_id` değerini tutulan çağrı günlüğündeki
en yüksek mevcut rowid değerine ayarlar. Varsayılan değer false'tur (imleç 0 ve tutulan geçmişin geriye dönük aktarımı).
Bu, güncelleme sırasında imleci sıfırlamaya yönelik bir ayar değildir.

Paylaşılan `ttftMs` eklemesi, BigQuery eşleyicisine ve yeni tablo şemasına null değer alabilen bir `ttft_ms`
sütunu da ekler: şema testi, her kanonik kayıt alanının bir sütuna sahip olmasını gerektirir.
Mevcut tablolar değişmeden dışa aktarılmaya devam eder: `prepare()` tablo şemasını okur ve
yalnızca `ttft_ms` sütunu yoksa bu alanı hariç tutar. Bir sonraki çalıştırmada TTFT verisini almak için
null değer alabilen INT64 sütununu ekleyin veya yeni bir tablo kullanın. PATCH, otomatik şema değişikliği veya ek
izin gerekmez; diğer tüm satır alanlarında katı şema denetimi uygulanmaya devam eder.

---

## 6. Hedef ekleme

1. Bir `LogExportDestinationType` dışa aktaran `src/lib/logExport/destinations/<name>.ts` dosyası oluşturun:
   bir Zod `configSchema`, kullanıcı arayüzü için bir `fields` tanımlayıcı dizisi, `secretFields` ve
   `test()` / `prepare()` / `send(records)` döndüren bir `createClient(config)`.
2. Bunu `src/lib/logExport/registry.ts` içindeki `DESTINATIONS` dizisine ekleyin.
3. `tests/unit/` altında testler yazın.

Değişikliğin tamamı bu kadar: kalıcı depolama, cron işi, REST katmanı, gizli bilgilerin şifrelenmesi ve
kontrol paneli formunun tümü kayıt defterini okur.

Yeni bir hedef için iki kural:

- `send()`, kısmi bir başarısızlık durumunda **hata fırlatmalıdır**. Başarıyla tamamlanması, "bu satırlar hedefte mevcut"
  anlamına gelir ve imleç bu satırları kalıcı olarak geride bırakır.
- Kullanıcının sağladığı bir URL'yi kabul eden hedef, istek göndermeden önce bu URL'yi
  webhook'larla aynı şekilde `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) aracılığıyla
  doğrulamalıdır. BigQuery'nin buna ihtiyacı yoktur: kullandığı ana makineler sabittir.

---

## 7. Kullanım

- **Kontrol paneli**: Entegrasyonlar → Günlük dışa aktarma. Bir hedef ekleyin, satır yazmadan
  kimlik bilgilerini denetlemek için **Test**'i çalıştırın, ardından hedefi etkinleştirin.
- **Bekleyen kayıtlar**: her hedef kartı bekleyen satırları ve imleci gösterir; `GET
/api/log-export/status` aynı sayısal verilerin yanı sıra son 20 iş çalıştırmasını döndürür.
- **Bir hedefin başarısız olması diğerlerini etkilemez** — çalıştırma özeti, hedef bazındaki
  durumu `last_status` / `last_error` içinde kaydeder; iş çalıştırma geçmişi ise toplu sonucu tutar.
- **Bir hedefi silmek, imlecini de siler.** Hedefi yeniden eklemek, saklanan en eski
  çağrı günlüğünden başlatır; bu da hedefte zaten bulunabilecek satırların yeniden gönderilmesine yol açar. BigQuery'de satır başına
  `insertId`, bunu yalnızca BigQuery'nin kendi yinelenen kayıtları ayıklama aralığı içinde telafi eder; bu nedenle
  bir hedefi silmek yerine devre dışı bırakmayı tercih edin.
