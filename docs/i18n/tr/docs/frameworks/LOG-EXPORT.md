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
`"omniroute.trace\0" + callLogId` ve `"omniroute.span\0" + callLogId` üzerinde hesaplanan SHA-256 değerinin ilk 32/16 onaltılık basamağıdır. Yeniden gönderimler
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

## 7. İşletim

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
