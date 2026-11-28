# Merge Queue & Manual Merge-Train Runbook (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Bir serbest bırakma dalına iniş

Omni-queue, `release/vX.Y.Z` inişleri yönetir. PR yerleştirmeden önce varsayılan dalda `config/merge-queue/config.json` üst düzey `mode` okuyun. Bkz. [Omni-Queue](OMNI_QUEUE.md).

- **`shadow`** doğrulamayı çalıştırır ve girişi manuel birleştirmeye bırakır. Onaylanan PR son noktasında `omni-queue` uygulayın. `npm run queue -- why <PR>` ile uygunluğu kontrol edin. `npm run queue -- history --base <branch>` o kafa için verilecek kararı bekleyin. `would-land` devam edin. `culprit-found` veya `would-dequeue` üzerinde birleştirmeyi basılı tutun ve nedeni düzeltin.
- **Gölge istisnaları.** Mevcut üs ucuna karşı yeşil dolu CI sahip bir tren ayrı bir kuyruk kararı olmadan ilerleyebilir. Aynı istisna, PR kafasının halihazırda geçerli taban ucunu içerdiği durumlarda da geçerlidir.
- **`live`** inişi tetiklemek için `omni-queue` etiketini kullanır. Kuyruk tek başına PR indirir. Birleştirme komutlarını bırakın ve itmeleri kuyruğa yönlendirin.

Her iniş, sahibinin iznini ve gerekli kontrollerin yapılmasını gerektirir. `omni-queue` yalnızca sahibi inişe izin verdikten sonra uygulayın. Korunan yollara dokunan sıraya alınmış PRs aynı zamanda o PR için sahibinin `protected-approved` kararını da gerektirir.

"Aktif sürümde yeşil kapılar gerektir" kural seti, kafada yeşil `Gate / CI` ve `Gate / Quality` gerektirir. Kırmızı bir kapıyı atlamak için asla `--admin` kullanmayın. Serbest bırakma dondurma blokları donmuş dalla birleşir. Bkz. [Katı Kural 21](HARD_RULES_DETAIL.md). Başka bir oturumun çalıştığını belirten bir çekme isteğini asla etiketlemeyin, birleştirmeyin veya iletmeyin. Bkz [. Sert Kural 22](HARD_RULES_DETAIL.md).

## Tren çekme isteği

1. Mevcut yayın tabanı ucunda bir tren şubesi başlatın. Birleştirme taahhütlerini kullanarak tam olarak onaylanmış üye başkanlarını entegre edin. Squash ve rebase'den kaçınarak taahhüt geçmişlerini koruyun.
2. Tren şubesi için bir çekme talebi açın. Bu PR mevcut temel uçta kendi tam CI ile doğrulayın. İnmeden önce taban ucunu ve onaylı üye kafalarını tekrar kontrol edin. Doğrulanan aday değiştiğinde treni ve CI yenileyin.
3. Geçerli kuyruk modunda birleştirme taahhüdüyle tren PR indirin. Canlı modda kuyruğun `merge-ff` açılış yöntemi birleştirme taahhütlerini korur. Orijinal üye kafalarına serbest bırakma şubesinden ulaşılabilir hale gelir. GitHub PRs üyesini birleştirilmiş olarak işaretler ve taahhütler yazarlarını korur.

Genel bir örnek [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). 18 üyeli PRs birleştirdi ve 2026-11-24 tarihinde birleştirme taahhüdüyle indi.

`main` bir sonraki sürüm şubesine geri senkronizasyon da birleştirme taahhüdü yoluyla gerçekleşir. Daha sonraki geri senkronizasyonlar için `main` soyunun korunması gerekir. Bkz. [Çalışma Ağacı Yalıtımı](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash).

## Yerel birleştirme treni doğrulayıcısı

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Doğrulayıcı, tabanı ve PR kafalarını getirir ve bunları tek kullanımlık bir çalışma ağacında birleştirir. Ortaya çıkan ağaçta eşlik paketini bir kez çalıştırır. Başarısız bir kafa getirme veya birleştirme çakışması PR çıkarır ve komut dosyası kalan PRs ile devam eder.

- **`--plan`** seçilen modun adımlarını yazdırır ve bir çalışma ağacı oluşturmadan veya uzaktan kumandaya başvurmadan çıkar. Hızlı planı incelemek için `--fast` ile birleştirin.
- **`--fast`** ortak statik geçitleri, seçilen değiştirilmiş `node:test` dosyalarını `tests/unit/` ve `npm run test:vitest` altında çalıştırır. Hızlı modu kullanırken, biriken ipucu üzerinde günde en az bir kez tam yerel doğrulama çalıştırın.
- **Tam mod** yalnızca tam statik geçitleri ekler ve `npm run test:unit` ve `npm run test:vitest` çalıştırır.

Temel sonda mevcutsa, arızalı bir statik kapı, dokunulmamış tabanda yeniden çalıştırılır. Komut dosyası, devralınan hataları bildirir ve tanınan her ihlal satırı tabanda göründüğünde ve toplam sayı artmadığında devam eder.

| Çıkış | Anlam                                                                                                                                                                  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`   | Planı yazdırdı veya paketi tamamladı. Paket özeti, devralınan tüm statik hataları ve çıkarılan PRs listeler.                                                           |
| `1`   | Geçersiz bağımsız değişkenler, Git ödemesi yok, ön kontrol başarısız oldu veya PR binilmedi.                                                                           |
| `2`   | Bir paket denetimi başarısız oldu ve devralınmış olarak nitelendirilmedi. Operatör toplu işi ikiye bölebilir, rahatsız edici PR çıkarabilir ve yeniden çalıştırabilir. |

Yerel geçiş kartı yalnızca sahibinin dosyası için teşhis kanıtı sağlar. Her iniş hâlâ sahibinin iznini, kendi gerekli kontrollerini ve uygun olduğunda gölge kuyruk kararını gerektirir.

## Katmanlama

- **PR başına.** CI ve Kalite seçim kontrolleri, değiştirilen yollara göre yapılır. Code PRs, CI ayrı birim ve Vitest işleriyle hızlı kaliteli geçitleri ve etkilenen testleri çalıştırır.
- **Sıra adayı başına.** CI ve Quality, sıra ref'inde oluşturulan adayın tam profilini çalıştırır.
- **Sürüm ipucu başına.** Release-Green, yol filtreleriyle eşleşen itmelerde hızlı sert geçitleri çalıştırır. Günde üç programlı çalıştırma, sürüm dalı için tam taramayı kullanır.
- **Sürüm başına.** Tam CI matrisi, E2E parçalarını, paket doğrulamasını, tarball önyükleme dumanını ve kapsam kontrollerini içerir. [Sürüm Kontrol Listesine](RELEASE_CHECKLIST.md) bakın.

## `merge-train.sh` için yeni ödeme önkoşulları

Ön kontrol, çalışma ağaçları oluşturulmadan önce çalışır. Bağımlılıkları `npm ci` ile yükleyin. `node_modules/.bin/tsc` çalıştırılabilir olduğunu ve `node_modules/node_modules` bulunmadığını doğrulayın. `node_modules/.bin/bun --version` başarılı olup olmadığını kontrol edin.

Bun postinstall atlandıysa `(cd node_modules/bun && node install.js)` komutunu çalıştırın. Sağlayıcı tutarlılığı ve bilinen sembol kontrolleri Bun kullanır. Doğrulayıcı `npm run check:cycles:ratchet` engelleme kapısı olarak çalıştırır. Bağımsız `npm run check:cycles` komutu tavsiye niteliğindedir.

## Tarih

Birleştirme birleştirme sırası 2026-11-19 tarihinde kullanımdan kaldırıldı.
