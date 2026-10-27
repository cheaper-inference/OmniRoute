# Log export (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute çağrı günlüklerinin harici bir analiz deposuna sürekli ve artımlı olarak aktarılması.

Günlükler panosu sekmesi, istek geçmişini rotasyon ve saklama süresiyle sınırlandırılan SQLite'ta (`call_logs`) tutar. Günlük aktarımı, aynı kayıt kümesini belirli bir zamanlamayla dışarı göndererek kayıtların yerel veritabanından daha uzun süre saklanabilmesini ve diğer verilerle birleştirilebilmesini sağlar. İlk hedef BigQuery'dir; işlem hattı bir kayıt sistemi olduğundan daha fazla hedef eklenebilir.

---

## 1. Nasıl çalışır

```
sunucu (yapılandırmanın şifresini çöz + doğrula, imleci uzlaştır)
  → IPC'yi başlat → yalıtılmış exportChild işletim sistemi işlemi
    → salt okunur storage.sqlite → paylaşılan çağrı günlüğü sorgulama/eşleme
      → zaman uyumsuz yapıt yükleme → hedef prepare()/send()
        → toplu IPC → sunucu imleci kalıcılaştırır → onay IPC'si
          → sonraki toplu işlem; done IPC'si → sunucu başarıyı kaydeder
```

- **Zamanlama** — varsayılan olarak `0 * * * *` (saatlik, UTC) değerini kullanan tek bir
  `JobRegistry` cron işi: `log_export`. `src/lib/initCloudSync.ts` içinde kaydedilir;
  `OMNIROUTE_LOG_EXPORT_CRON` ile geçersiz kılınabilir. Her tetikleme, **etkinleştirilmiş**
  tüm hedefleri sırayla boşaltır.
- **İmleç** — SQLite'ın örtük `call_logs.rowid` değeri, hedef başına
  `log_export_destinations.cursor_row_id` alanında kalıcılaştırılır. `timestamp` özellikle
  imleç olarak kullanılmaz: çağıranlar kendi değerlerini sağlayabilir; bu nedenle yavaş bir
  istek, daha sonra başlayan hızlı bir istekten sonra yazılabilir ve zaman damgası imleci
  bunu atlar.
- **Toplu işleme** — istek başına `batch_size` satır (varsayılan 500), çalıştırma başına
  `max_rows_per_run` satır (varsayılan 10000); böylece büyük bir birikim tek bir çalıştırmayı
  engellemek yerine birkaç tetikleme boyunca boşaltılır.
- **Teslimat** — imleç yalnızca `send()` çözümlendikten sonra ilerler. Başarısız bir toplu
  işlem, imleci bulunduğu yerde bırakır; böylece aynı satırlar bir sonraki çalıştırmada yeniden
  denenir. Garanti, gerçek anlamda tam bir kez değil, en az bir kez teslimat ve hedef tarafında
  yinelenenleri kaldırmadır: BigQuery, her satırı çağrı günlüğü kimliğiyle anahtarlar ve kendi
  yinelenenleri kaldırma penceresi içinde bunu mümkün olan en iyi şekilde uygular.
- **Çakışma koruması** — cron tetiklemesi ile `POST .../run` aynı anda çalışabilir. Hâlihazırda
  boşaltılmakta olan bir hedef iki kez boşaltılmak yerine atlanır (çalıştırma sonucunda
  `skipped: true`); böylece eşzamanlı bir çalıştırma, bir toplu işlemi yeniden gönderemez veya
  imleci geriye yazamaz.
- **Temizleme sonrası kurtarma** — `cursor_row_id`, `MAX(rowid)` değerinin üzerinde kalırsa
  (tablonun tamamı temizlenmiş ve rowid değerleri yeniden başlamışsa), çalıştırıcı kalıcı olarak
  verileri göremez hâle gelmek yerine 0'a geri sarar.

### Yalıtılmış çalıştırıcı ve sınırlar

Node üzerindeki her hedef çalıştırması, ayrı ve kısa ömürlü bir işletim sistemi alt işlemi
başlatır (IPC kullanan `child_process`; `worker_threads` değil). Gövde okumaları, yük JSON'unun
ayrıştırılması/serileştirilmesi, hedef `prepare()` işlemi ve hedef ağ G/Ç işlemlerinin tamamı
sunucunun olay döngüsünde değil, burada çalışır. IPC üzerinden yalnızca yapılandırma ve küçük
ilerleme mesajları geçer; dışa aktarılan kayıtlar hiçbir zaman sunucuya geri dönmez. Cron işi
ve Şimdi çalıştır rotası aynı genel sonucu ve çakışma korumasını kullanmaya devam eder.

Alt işlem, sunucunun çözümlenmiş `DATA_DIR/storage.sqlite` dosyasını `node:sqlite` kullanarak
salt okunur biçimde, `busy_timeout=5000` ve `query_only=ON` ayarlarıyla açar. Herhangi bir
veritabanı tekil örneğini içe aktarmaz ve geçiş, yedekleme veya SQLite güncellemesi gerçekleştirmez.
Eksik/bozuk yapıt kayıtlarının yönetimi (bozuk yapıt UPDATE işlemi dâhil) yalnızca pano ayrıntı
yolunda kalır. Her iki yol da saf bir ayrıntı çözümleyiciyi paylaşır; dışa aktarma, zaman uyumsuz
dosya sistemi okumalarını ve aynı yapıt → eski satır içi → eski disk → yok çözümleme sırasını
kullanır. Bir çalıştırma, alt işlem okuyucusunu açtığında en yüksek ekleme rowid değerinin
anlık görüntüsünü alır; sonraki eklemeler bir sonraki çalıştırmayı bekler. Bu, uzun ömürlü bir
SQLite işlemi değil, ekleme sınırıdır: WAL yazıcıları ve denetim noktaları, ağ beklemeleri sırasında
serbest kalmaya devam eder. Mevcut satırlardaki güncellemeler/silmeler bu sınır tarafından
dondurulmaz.

Kabul edilen her toplu işlemden sonra alt işlem bir onay bekler. Sunucu önce imleci
`advanceLogExportCursor` ile kalıcılaştırır, ardından `ack` gönderir; bundan önce sonraki toplu
işlem başlamaz. Gönderim hatası, çökme veya zaman aşımı, ilgili toplu işlemin imlecini ilerletmeden
başarısızlık kaydeder. Önceden onaylanmış toplu işlemler işlenmiş olarak kalır; en fazla onaylanmamış
tek bir toplu işlem yeniden gönderilebilir. Başarı yalnızca `done` sonrasında ve alt işlem temiz
biçimde sonlandığında kaydedilir. Başarısızlıklar alt işlemi SIGTERM ile sonlandırır, 500 ms
sonra SIGKILL'e yükseltir ve çalıştırıcı işlemin kapanmasını bekler.

| Ortam değişkeni                               | Varsayılan | Amaç                                  |
| --------------------------------------------- | ---------- | ------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | Hedef başına geçen gerçek süre sınırı |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | Alt işlem V8 old-space sınırı, MB     |

Geçersiz, pozitif olmayan veya tam sayı olmayan değerlerde varsayılanlar kullanılır. Yığın ayarı
toplam RSS sınırı değildir; çok büyük toplu işlemler yine de alt işlem belleğini tüketebilir ve
çalıştırmanın güvenli biçimde başarısız olmasına neden olabilir. Varsayılan 1024 MB, gövdeler
etkinken 512 KiB boyutlu yapıtlardan oluşan varsayılan 500 satırlık toplu işlem için, BigQuery'nin
bayt parçalı JSON serileştirmesi de dâhil olmak üzere yeterli ek alan bırakır. Bu ayar, gövdeler
içeren 10000 satırlık bir toplu işlemi güvenli hâle getirmez. V8 yığın tükenmesi, uygulanabilir
bir başarısızlık kaydeder: toplu işlem boyutunu azaltın veya
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` değerini artırın; imleç, son onaylanan toplu
işlemde kalır. Geçmişe ait satır içi/disk gövdeleri modern yapıt sınırı kapsamında değildir.
Operatörler, özellikle belleği sınırlı konteynerler içinde, RSS için ayrıca kapasite planlamalıdır.

Alt işlem yalnızca çözümlenmiş `DATA_DIR`, `NODE_ENV`, açıkça belirtilmiş `TZ` (eski dosya adı
yerel saat çözümlemesi), mevcut olduğunda `ELECTRON_RUN_AS_NODE` ve aşağıdaki giden bağlantı
girdilerini devralır: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (ve bunların küçük
harfli biçimleri), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`,
`SSL_CERT_DIR`. Genel bir Undici yönlendiricisi, `NO_PROXY` dâhil olmak üzere sunucunun saf ortam
proxy'si çözümlemesini ve yerel ana bilgisayarı atlama kurallarını paylaşır; `proxyFetch.ts` veya
onun veritabanı/özellik bayraklarını içe aktarmaz. Proxy kimlik bilgileri, iletilen çıktıda ve
kaydedilen hatalarda maskelenir. Hedef kimlik bilgileri yalnızca tek bir başlangıç IPC mesajında
taşınır; hiçbir zaman argv veya ortam üzerinden aktarılmaz. Çıktı/hata iletimi öneklenir ve
hassas verilerden arındırılır. Her cron çalıştırmasında Node'un SQLite uyarısının yinelenmesini
önlemek için alt işlem yürütme argümanlarında yalnızca `ExperimentalWarning` devre dışı bırakılır;
diğer uyarı türleri görünür kalır.

Hedef modüller, Next.js/yalnızca sunucu bağımlılıkları olmadan içe aktarılabilir olmalıdır. Mevcut
BigQuery uygulaması bu sözleşmeyi zaten karşılıyor. Erişim belirteci önbellekleri çalıştırmalar arasında
değil, yalnızca alt işlem çalıştırması boyunca kalır. Node desteklenen çalışma zamanıdır (`package.json` engines), ancak README'deki Bun
kurulum bölümü ve `Dockerfile.bun`, `bun:sqlite` (`src/lib/db/core.ts` / bağdaştırıcılar) kullanan
bir üretim uyumluluğu yolunu da duyurur. Bu nedenle Bun altında dışa aktarımlar önceki
işlem içi yolu korur ve tek seferlik bir uyarı verir: alt işlem heap/zaman aşımı yalıtımı kullanılamaz.
Olay döngüsü ve OOM yalıtımı için Node kullanın; Bun burada yalnızca geliştirmeye yönelik kabul edilmez.

`includeBodies` etkinleştirildiğinde, saatlik bir payload birikimi oluşturmak yerine
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` gibi dakika düzeyinde bir çalışma sıklığını tercih edin.
Toplu iş ve satır sınırları her çalıştırmayı yine de sınırlar. İşlem başlatma maliyeti, her çalıştırmada her hedef için
ödenir; bu, toplam CPU kullanımını azaltmak için değil, sunucu olay döngüsü yalıtımı karşılığında küçük bir başlatma maliyetini göze alır.

### Payload'lar (istemler ve tamamlamalar)

Dışa aktarım varsayılan olarak yalnızca Günlükler **listesinde** gösterilen özet alanlarını taşır. **İstemleri ve yanıtları dışa aktar**
(`includeBodies`) seçeneğinin etkinleştirilmesi, ayrıca Günlükler **ayrıntı**
bölmesinde her çağrı için gösterilenleri gönderir:

| Alan                             | İçeriği                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------- |
| `request_body` / `response_body` | Çağrı payload'larının panoda gösterilen hâli                                 |
| `pipeline_route_decision`        | Yönlendiricinin seçtiği hedef ve model                                       |
| `pipeline_client_request`        | İstemcinin tam olarak gönderdiği ham istek                                   |
| `pipeline_openai_request`        | Dahili OpenAI biçimine çevrildikten sonraki hâli                             |
| `pipeline_provider_request`      | Sağlayıcı lehçesinde, yukarı akışa gerçekten gönderildiği hâli               |
| `pipeline_provider_response`     | Ham yukarı akış yanıtı                                                       |
| `pipeline_client_response`       | Çağrıyı yapana geri iletilen içerik                                          |
| `pipeline_error`                 | Başarısız bir çağrı için işlem hattı düzeyindeki hata ayrıntısı              |
| `bodies_truncated`               | Yukarıdaki alanlardan herhangi biri `maxBodyBytes` sınırına ulaştığında True |

Bu, istem içeriğidir; bu nedenle **varsayılan olarak kapalıdır** ve bilinçli olarak hedef başına yapılan bir seçimdir.
Gönderilenler panoda gösterilenlerle aynıdır; çünkü dışa aktarım ve `getCallLogById` aynı ayrıntı
çözümlemesini paylaşır: payload'lar
yazılırken zaten PII'dan arındırılmış ve gizli bilgiler maskelenmiştir; ayrıca `noLog` API anahtarıyla yapılan bir çağrı
hiçbir payload depolamaz, dolayısıyla dışa aktarılacak hiçbir şey yoktur.

Payload'lar dosya sistemi yapıtından satır başına okunur; dolayısıyla tamamlama işlemi yalnızca bunu
isteyen hedefler için çalışır. Eksik veya bozuk bir yapıt, toplu işi başarısız kılıp imleci takılı bırakmak
yerine özetini null payload'larla dışa aktarır.

`maxBodyBytes` (varsayılan 262144) her alanı sınırlar. Daha uzun payload'lar **atılmak yerine
kırpılır** — kırpılmış bir istem yine de "ne istendi" sorusunu yanıtlar — ve satır
`bodies_truncated` ile işaretlenir. Parça parça akışla iletilen deltalar dışa aktarılmaz; birleştirilmiş yanıt
zaten `pipeline_provider_response` ve `pipeline_client_response` içindedir.

---

## 2. Dosyalar

| Parça                        | Konum                                        |
| ---------------------------- | -------------------------------------------- |
| Hedef sözleşmesi             | `src/lib/logExport/types.ts`                 |
| Kayıt defteri                | `src/lib/logExport/registry.ts`              |
| Gizli bilgi yönetimi         | `src/lib/logExport/secrets.ts`               |
| Çalıştırıcı (üst IPC)        | `src/lib/logExport/runner.ts`                |
| Süreç yaşam döngüsü          | `src/lib/logExport/childRunner.ts`           |
| Alt süreç giriş noktası      | `src/lib/logExport/exportChild.ts`           |
| Salt okunur açıcı            | `src/lib/db/logExportReadOnly.ts`            |
| Paylaşılan sorgu/eşleme      | `src/lib/usage/callLogExportQueries.ts`      |
| Ayrıntı çözümleyici          | `src/lib/usage/callLogDetailResolver.ts`     |
| API gösterimi                | `src/lib/logExport/presenter.ts`             |
| BigQuery hedefi              | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA kimlik doğrulaması | `src/lib/logExport/googleServiceAccount.ts`  |
| Çağrı günlüğü kaynağı        | `src/lib/usage/callLogExportSource.ts`       |
| Kalıcılık                    | `src/lib/db/logExportDestinations.ts`        |
| Cron görevi                  | `src/lib/jobs/logExportJob.ts`               |
| REST katmanı                 | `src/app/api/log-export/`                    |
| Kontrol paneli sayfası       | `src/app/(dashboard)/dashboard/log-export/`  |

Şema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Tüm rotalar yönetim kimlik doğrulaması gerektirir (`requireManagementAuth`). Gizli bilgiler hiçbir zaman döndürülmez:
saklanan bir gizli bilgi `__stored__` değişmez değeri olarak geri gelir ve güncelleme sırasında bu değerin geri gönderilmesi
saklanan kimlik bilgisini korur.

Türü bir gizli bilgi tanımlayan hedefi oluşturmak veya güncellemek **`STORAGE_ENCRYPTION_KEY`
gerektirir**. Bu olmadan `encrypt()` sessizce olduğu gibi aktarım yapar; bu nedenle kimlik bilgisini
SQLite'a düz metin olarak kaydetmek yerine yazma işlemi 400 yanıtıyla reddedilir (Telegram webhook'unun
uyguladığı korumanın aynısı).

| Yöntem   | Yol                                      | Amaç                                                         |
| -------- | ---------------------------------------- | ------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Hedef türleri + bunların yapılandırma alanı listesi          |
| `GET`    | `/api/log-export/destinations`           | Hedefleri listeleme (gizli bilgiler maskelenir)              |
| `POST`   | `/api/log-export/destinations`           | Hedef oluşturma                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | Tek bir hedefi okuma                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | Adı / etkinliği / yapılandırmayı / toplu işlemeyi güncelleme |
| `DELETE` | `/api/log-export/destinations/{id}`      | Silme                                                        |
| `POST`   | `/api/log-export/destinations/{id}/test` | Kimlik bilgilerini sınama, hiçbir şey yazmama                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Şimdi boşaltma, zamanlanmış çalıştırmayla aynı yol           |
| `GET`    | `/api/log-export/status`                 | Cron durumu, son çalıştırmalar, hedef başına birikmiş işler  |

Kullanıcı arayüzünü genel amaçlı yapan şey `GET /api/log-export/types` çağrısıdır: pano formu,
döndürülen alan tanımlayıcılarından oluşturulur; dolayısıyla yeni bir hedef için kullanıcı arayüzü değişikliği gerekmez.

---

## 4. BigQuery hedefi

Yapılandırma anahtarları (`type: "bigquery"`):

| Anahtar              | Notlar                                                                               |
| -------------------- | ------------------------------------------------------------------------------------ |
| `projectId`          | Veri kümesini barındıran GCP projesi                                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                      |
| `tableId`            | `[A-Za-z0-9_]+`                                                                      |
| `location`           | Yalnızca veri kümesinin oluşturulması gerektiğinde kullanılır (varsayılan `EU`)      |
| `serviceAccountJson` | Hizmet hesabı anahtarı. Gizli bilgi: depolamada şifrelenir, hiçbir zaman döndürülmez |
| `autoCreate`         | İlk dışa aktarmada veri kümesini ve tabloyu oluşturur (varsayılan `true`)            |

Hizmet hesabının hedef tabloda `bigquery.tables.updateData` iznine; ayrıca `autoCreate` açıkken
`bigquery.datasets.create` / `bigquery.tables.create` izinlerine ihtiyacı vardır.

Yapılandırılmış bir toplu işlem, HTTP değil bir **imleç** birimidir: `send()` bunu en fazla 500 satırlık
insertAll çağrılarına böler; dolayısıyla büyük bir `batch_size`, BigQuery'nin 10 MB'lık istek sınırının
aşılmasına neden olamaz. Geçici durumlar (408/429/500/502/503/504), aynı insertIds yeniden kullanılarak
üstel geri çekilmeyle en fazla üç kez yeniden denenir; kimlik doğrulama ve şema hataları ise çalıştırmayı
boşa harcamamak için ilk denemede istisna fırlatır.

Birkaç saniye önce oluşturulmuş bir tablo henüz akış uç noktası tarafından görülemez ve uç nokta
birkaç saniye boyunca 404 yanıtı verir. Bu 404 yeniden denenir, ancak **yalnızca tabloyu bu çalıştırma oluşturduysa** —
gerçekten eksik olan bir tablo yine hızla başarısız olur. Yakın zamanda silinmiş bir tabloyu aynı adla yeniden
oluşturmanın, BigQuery'nin akış eklemelerini birkaç dakika boyunca reddetmesine neden olduğunu unutmayın; bu,
silip yeniden oluşturma işleminin bir özelliğidir. Bu nedenle bir tabloyu silip tekrar eklemek yerine yeni bir tablo
adı kullanmayı tercih edin.

**Kısmi bir hata, boş olmayan bir `insertErrors[]` ile HTTP 200 olarak gelir.** Bu, hata olarak değerlendirilir
ve istisna fırlatılır; böylece imlecin BigQuery'nin hiçbir zaman kabul etmediği satırları geçmesi engellenir.
`tests/unit/log-export-bigquery.test.ts` bu davranışı sabitler.

Aktarım düz REST üzerinden yapılır — kendinden imzalı bir RS256 beyanı
`https://oauth2.googleapis.com/token` adresinde erişim belirteciyle değiştirilir, ardından satırlar
`tabledata.insertAll` hedefine gönderilir. Herhangi bir Google SDK'sı dahil edilmez. Erişim belirteçleri,
(hizmet hesabı, kapsam) başına işlem içinde önbelleğe alınır.

Oluşturulan tablo, Günlükler sekmesindeki her alan için bir sütunun yanı sıra `exported_at` sütununu içerir
ve çağrı günlüklerinin gerçek sorgulanma biçimine uygun olarak düzenlenir:

- **`timestamp` üzerinde gün bazında bölümlenir**; böylece tarihle sınırlandırılan bir sorgu yalnızca ilgili günleri tarar.
- **`api_key_name`, `provider`, `model`, `status` ölçütlerine göre kümelenir** (bu sırayla); böylece işlemi
  kimin çalıştırdığına, nereye gittiğine veya başarısız olup olmadığına göre filtreleme, her bölüm içindeki blokları
  eler. BigQuery en fazla dört kümeleme sütununa izin verir ve sıra önemlidir: yalnızca `api_key_name` filtresi
  eleme yaparken yalnızca `status` filtresi yapmaz.
- **`partitionExpirationDays` aracılığıyla isteğe bağlı bölüm saklama süresi** (`0` her şeyi saklar), tablo
  oluşturulurken uygulanır.

Her iki ayar da oluşturma sırasında uygulanır. Mevcut bir tablo, hâlihazırda sahip olduğu düzeni korur; bu nedenle bunları kullanmak istiyorsanız hedefi yeni bir tablo kimliğine yönlendirin.

`tests/unit/log-export-bigquery.test.ts`, eşleyicinin ve tablo şemasının birbiriyle uyumlu kalmasını doğrular; böylece yeni bir çağrı günlüğü sütunu dışa aktarma sırasında sessizce atılamaz.

Toplu işlemler **hem** satır sayısına hem de serileştirilmiş bayt miktarına göre parçalara ayrılır. Yükler dışa aktarıldığında yalnızca satır sayısı yeterli değildir: istemleri taşıyan 500 satır onlarca megabayt olabilir ve insertAll, 10 MB üzerindeki istekleri reddeder. Parçalar, hangisine önce ulaşılırsa 500 satırda veya 9 MB'ta kapatılır.

---

## 5. Hedef ekleme

1. Bir `LogExportDestinationType` dışa aktaran `src/lib/logExport/destinations/<name>.ts` dosyasını oluşturun:
   UI için bir Zod `configSchema`, bir `fields` tanımlayıcı dizisi, `secretFields` ve
   `test()` / `prepare()` / `send(records)` döndüren bir `createClient(config)`.
2. Bunu `src/lib/logExport/registry.ts` içindeki `DESTINATIONS` dizisine ekleyin.
3. Testleri `tests/unit/` altında yazın.

Değişikliğin tamamı bundan ibarettir: kalıcılık katmanı, cron görevi, REST katmanı, gizli değerlerin şifrelenmesi ve
dashboard formunun tamamı registry'yi okur.

Yeni bir hedef için iki kural vardır:

- `send()`, kısmi bir hata durumunda **mutlaka hata fırlatmalıdır**. Başarıyla sonuçlanması, "hedef bu satırlara sahip"
  anlamına gelir ve imleç kalıcı olarak bu satırların ötesine ilerler.
- Kullanıcı tarafından sağlanan bir URL'yi alan hedef, isteği göndermeden önce bu URL'yi
  webhook'larla aynı şekilde `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) aracılığıyla doğrulamalıdır.
  BigQuery için buna gerek yoktur: kullandığı ana makineler sabittir.

---

## 6. İşletim

- **Dashboard**: Integrations → Log export. Bir hedef ekleyin, satır yazmadan kimlik bilgilerini
  kontrol etmek için **Test** işlemini çalıştırın ve ardından hedefi etkinleştirin.
- **İş yükü birikimi**: Her hedef kartı bekleyen satırları ve imleci gösterir; `GET
/api/log-export/status`, aynı değerlerin yanı sıra son 20 görev çalıştırmasını da döndürür.
- **Başarısız olan bir hedef diğerlerini başarısız kılmaz** — çalıştırma özeti, her hedefe ait
  durumu `last_status` / `last_error` alanlarına kaydeder; görev çalıştırma geçmişi ise toplu sonucu saklar.
- **Bir hedef silindiğinde imleci de silinir.** Yeniden eklendiğinde, saklanan en eski
  çağrı günlüğünden başlar; bu da hedefte zaten bulunabilecek satırların yeniden gönderilmesine neden olur. BigQuery'de satır başına
  `insertId`, bunu yalnızca BigQuery'nin kendi yinelenen kayıtları kaldırma zaman aralığı içinde engeller; bu nedenle
  bir hedefi silmek yerine devre dışı bırakmayı tercih edin.
