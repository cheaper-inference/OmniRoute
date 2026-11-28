# Quota Sharing Engine (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Belge referansı**: `docs/routing/QUOTA_SHARE.md`
> Grup B'nin bir parçasıdır (planlar 16 + 22).

---

## Genel Bakış

Kota Paylaşım Motoru, bir sağlayıcının zamana dayalı kotasını (ör. Codex
5 saatlik pencere, Kimi 1500 istek/saat), aynı bağlantıyı paylaşan birden fazla
API anahtarı arasında adil şekilde dağıtır.

**Çözdüğü sorun:** OmniRoute, birçok API anahtarını aynı üst sağlayıcı hesabı
üzerinden yönlendirir. Paylaşım mantığı olmadan A anahtarından gelen yoğun bir
istek akışı, sağlayıcının saatlik kotasını tüketebilir ve pencere sıfırlanana
kadar B ve C anahtarlarının engellenmesine neden olabilir. Motor bunu şu şekilde önler:

1. Her anahtarın boyut başına kayan tüketimini (%, istekler, token'lar, $) izler.
2. İş-korumalı adil paylaşım algoritması uygular: genel havuz doygun olmadığı
   sürece bir anahtar, kullanılmayan paylardan ödünç alabilir.
3. İstek üst yürütücüye ulaşmadan önce sonucu kritik yolda (`chatCore.ts`) uygular.

---

## Algoritma: Adil Paylaşımlı İş Tasarrufu

`src/lib/quota/fairShare.ts` uygulandı.

### Modlar

| Durum                                      | Mod        | Davranış                                                            |
| ------------------------------------------ | ---------- | ------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Cömert** | Anahtar, küresel limit eksi tüketilen toplam kadar ödünç alınabilir |
| `globalUsedPercent >= saturationThreshold` | **Sıkı**   | Bireysel adil paylaşımı sıkı bir şekilde uygulayın                  |

Varsayılan `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

Bu iki mod, varsayılan ödünç alma modu olan `saturation` bir havuzu tanımlar. `consent` modundaki bir havuz, doygunluk ne olursa olsun her zaman katı kuralları uygular. Bkz. [Onaylı ödünç verme (havuz başına katılım)](#consented-lending-per-pool-opt-in).

### Boyut başına karar

Havuzdaki her etkin boyut için motor şunları hesaplar:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

`percent` boyutları için `consumed` bunun yerine ilişkilendirme kitabından gelir (bkz. [Yüzde boyutları: anahtar başına ilişkilendirme](#percent-dimensions-per-key-attribution) ).

Daha sonra:

- **`policy = hard`** : eğer `consumed > fairShareAllowed` ve mod katı → ise** engellemek** .
- **`policy = soft`** : eğer `consumed > fairShareAllowed` ve mod katı → ise** cezalandırmak** (birleşik olarak öncelikleri kaldırın; asla sabit engelleme yapmayın).
- **`policy = burst`** : Adil paylaşımdan bağımsız olarak küresel boşluk payı mevcut olduğu sürece izin verin.

### Kesinlikle kap

Bir tahsisteki `capValue` + `capUnit` mod veya politikadan bağımsız olarak sert bir tavandır. `consumed >= capValue` her zaman olduğu herhangi bir boyut** bloklar** istek. Bir `percent` başlığı için `consumed` yalnızca anahtara atfedilen kısımdır.

### Çok boyutlu kontrol

Bir istek şu durumlarda engellenir:** herhangi** havuzdaki boyut onu engelleyecektir. Boyutlar bağımsız — %5 saatlik tükenme, haftalık %boyutunu etkilemez.

### Borçlanma

Cömert modda, tahsisi az tüketilen bir anahtar, diğer anahtarların tahsis edilmemiş paylarından fazla olanı kullanabilir. Formül:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

nerede `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Teto global (bu boyut için havuz `limit` ) her zaman sert tavandır.

### Onaylanmış borç verme (havuz başına katılım)

Her havuzun bir ödünç alma modu vardır. `saturation` varsayılandır ve yukarıdaki kuralları korur. `consent` modunda bir `hard` anahtarı, yalnızca diğer anahtarların ödünç vermeyi kabul ettiği kapasite dahilindeki payını aktarır. Yönetici her havuzun modunu ayarlar. Her anahtar sahibi, [Ödünç Verme onayı](#lending-consent) aracılığıyla kendi onayını belirler.

Onay, 0 ila 100 arasında bir yüzdedir ve dönem milisaniye cinsinden isteğe bağlı bir son tarihtir. Anahtar, son teslim tarihi gelecekteyken boşta kalan payının bu yüzdesini ödünç verir.

Bir boyut için `L` etkin sınırdır: plan sınırı çarpı havuzdaki hesaplar. Kapı, talep eden anahtar için şunu hesaplar:

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` anahtarın ağırlığıdır veya hiçbir ağırlık 0'ın üzerinde olmadığında her anahtar için `100 / n`. `lend_k` anahtarın aktif yüzdesidir ve son tarihi geçtiğinde 0'dır. Talep eden anahtarın kendi onayı hiçbir zaman dikkate alınmaz. Bir `hard` anahtarı, tüketimi payı artı `borrowAvailable` ulaştığında reddedilir.

Hiçbir tahsisin talep etmediği kapasite (100 eksi ağırlıkların toplamı) ödünç verilemez. Hiçbir anahtar onu ödünç vermeyi kabul etmedi.

**Örnek.** `L` 1000'dir.

| Anahtar | Ağırlık | Paylaşmak | Tüketilen | Ödünç Verme |
| ------- | ------- | --------- | --------- | ----------- |
| A       | 50      | 500       | 530       | 0%          |
| B       | 30      | 300       | 100       | 50%         |
| C       | 0       | 0         | 60        | 0%          |

- B, boşta kalan 200'ünün %50'sini, yani 100'ü borç veriyor. C zaten kendi payının 60'ını almış durumda. A 40 borç alabilir.
- A 530'da servis ediliyor ve tüketimi 540'a ulaştığında reddediliyor.
- C herhangi bir şeyi kullanmadan önce, A kendi payına eşit veya altındayken, C 100 borç alabiliyordu.
- C herhangi bir şey kullanmadan önce A 530'dayken C 70 ödünç alabiliyordu.

**Sıfır ağırlık.** Ağırlığı 0 olan bir anahtarın payı 0'dır. Yalnızca tüketimi başkalarının ödünç verdiğinin altında olduğunda servis edilir. Kimse borç vermediğinde ilk talebinden reddedilir.

**Son teslim tarihleri.** Hiçbir arka plan görevi bir iznin geçerliliğini sona erdirmez. Her talep, son tarihi kendi zamanıyla karşılaştırır ve o zamana eşit bir son tarih geçmiş olur. Sonlu bir sayı olmayan veya `Date` tutabileceği en büyük tarihi geçmiş olan kayıtlı bir son tarih geçmiş olarak sayılır.

**`soft` ve `burst`.** Borç verme onları sınırlamaz. Bir `soft` anahtarının önceliği, payı aşıldığında kaybolur. Havuzda yer varken bir `burst` anahtarı geçer. Havuzun toplamı limitine ulaştığında havuz tavanı hâlâ her anahtarı reddediyor.

**İstek yolundaki maliyet.** Bir `saturation` havuzu eskisinden daha fazlasını okumaz. Bir `consent` havuzunda sayılabilir bir boyut, başka bir anahtar ödünç verirken yalnızca kendi payına eşit veya daha yüksek bir `hard` anahtarı için diğer anahtarları okur. Daha sonra paralel olarak diğer tuş başına bir okuma yapar. Başarısız bir okuma, o anahtar için 0 tüketimi olarak sayılır. `percent` boyutu okuma eklemez çünkü atıf kitabı her anahtarı içerir.

**Bir havuzu düzenleme.** Bir düzenleme, kalan anahtarların onayını korur. Bu, tahsis düzenlemeleri, grup çapında değiştirmeler ve `ensure` çağrıları için geçerlidir. Kaldırılan bir anahtar, onayını kaybeder ve eklenen anahtar 0'dan başlar. Yönetici yolları, her bir anahtarın onayını döndürür ve asla yazmaz. Bir havuzu tekrar `saturation` geçirmek, saklanan tüm izinleri korur ve bunun o modda hiçbir etkisi yoktur. Havuzun `consent` olarak değiştirilmesi, son tarihi geçmemiş olan kayıtlı izinleri yeniden etkinleştirir. Anahtar sahibi, her iki modda da saklanan izni temizleyebilir.

**Yükseltme.** `lending_percent` ve `lending_until` sütunları zaten mevcutsa geçiş yalnızca `borrow_mode` ekler ve depolanan yüzdeler oldukları gibi kalır. Her havuz `saturation` modunda başlar. Havuz sihirbazında havuz başına `consent` açın. Saklanan değerlerden hiçbir şey çıkarılmaz.

**Sınırlamalar.**

- Borç veren kendi payını kullanmadan önce havuzu tavanında bulabilir. Başkalarının ödünç aldığı kapasite havuzun toplamına dahil edilir.
- Kontrol istekten önce çalışır ve hiçbir şeyi ayırmaz. Eşzamanlı istekler, herhangi biri kaydedilmeden önce tüketimi okur, böylece ödünç verilen kapasite, yayındaki isteklerle sınırlı olarak birden fazla kez harcanabilir. `saturation` modunun paylaşım kontrolü de aynı özelliğe sahiptir.

---

## Kayan Pencere Sayacı

`src/lib/quota/sqliteQuotaStore.ts` ve `redisQuotaStore.ts` içinde uygulanmıştır.

Her `(apiKeyId, dimensionKey)` için iki bölüm:

- `curr`: geçerli bölüm (`floor(nowMs / windowMs)`)
- `prev`: önceki bölüm (`curr - 1`)

Etkin kayan değer:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Hassasiyet**: Yaklaşık %99 doğruluk. Hata, bölümler arasındaki sınırda pencere
boyutunun en fazla %1'i kadardır (2 bölümlü yaklaşımın doğasında vardır).

### Eşzamanlılık

SQLite sürücüsü: `(apiKeyId | dimensionKey)` anahtarı başına bellek içi mutex,
oku-değiştir-yaz yarış durumunu önler. Kalıp, `src/sse/services/auth.ts` içindeki
istek-yığılması karşıtı yaklaşımı yansıtır.

Redis sürücüsü: Atomik artırma için Lua EVAL betiği — tek bir Redis komutu olarak çalışır.

---

## Sürücüler

### SQLite (varsayılan, kurulum gerektirmez)

- Tablo: `quota_consumption` (`073_quota_pools.sql` / `074_quota_consumption.sql` migrasyonlarına bakın).
- Tek örnekli dağıtımlar için en uygunudur.
- Tüm kalıcı veriler mevcut OmniRoute SQLite veritabanında bulunur (`DATA_DIR/storage.sqlite`).

### Redis (isteğe bağlı, çok örnekli)

- `ioredis` npm paketini gerektirir.
- Sayaçlar Redis'te saklanır; meta veriler (havuzlar/tahsisler) ise SQLite'ta kalır.
- Sayaçların paylaşılması gereken çok replikalı dağıtımlar için en uygunudur.

### Sürücüler arasında geçiş

Ayarlar kullanıcı arayüzü (`/dashboard/settings` → Kota Deposu) veya ortam değişkenleri aracılığıyla:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Veritabanı ayarı, ortam değişkenine göre önceliklidir. `driver=redis` olduğu hâlde URL yoksa veya
`ioredis` kurulu değilse fabrika SQLite'a geri döner ve bir uyarı günlüğe kaydeder.

Sürücü seçim sırası:

1. Veritabanı ayarı `quotaStore.driver`
2. Ortam değişkeni `QUOTA_STORE_DRIVER`
3. Varsayılan: `sqlite`

---

## Çok Boyutlu

Bir havuzun birden fazla boyutu olabilir. Her boyut bağımsızdır:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Örnek: Codex planı** (haftalık %5 saat + ):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Bir isteğin izin verilmesi için tüm boyutları karşılaması gerekir.

### Yüzde boyutları: anahtar başına ilişkilendirme

Yüzde planı, hesap ve plan penceresi başına bir kullanım rakamı bildirir. Sağlayıcı API anahtarı başına sayaç vermez.

Bu rakamı anahtarlara bölmek için her havuz, hesap ve plan penceresi başına bir atıf defteri tutar. `src/lib/quota/percentLedger.ts` kitabın kurallarını tutar. `src/lib/quota/percentAttribution.ts` defteri icranın kullandığı sayılara dönüştürür. Sonuç, her bir önemli rotanın jetonlarından oluşturulan bir tahmindir.

#### Kitabı hareket ettiren okumalar

Kitap, talep edilen plan penceresi için yalnızca sağlayıcının kendi şekline göre hareket eder. Bu bağlantılar şunları bildirir:

| sağlayıcı                                 | Pencereleri planla |
| ----------------------------------------- | ------------------ |
| Claude, bir OAuth bağlantısı aracılığıyla | `5h`, `weekly`     |
| Codex                                     | `5h`, `weekly`     |

Bunlar okuma olarak sayılmaz:

- sağlayıcı istemcisinin eski olarak işaretlediği bir yanıt
- sağlayıcının yüzdesini bildirmediği bir Claude penceresi
- başka bir pencerenin şekli veya pencerelerdeki en kötü durum
- hız sınırı başlığı geri dönüşü
- başarısız bir okuma

API anahtarına sahip Claude dahil diğer sağlayıcıların kitabı yoktur. Bu değişiklikten önce olduğu gibi her anahtarın yüzde boyutlarına göre 0 ücret alınır.

Bir okuma doygunluk sinyalinin 30 saniyelik önbelleğini paylaşır. Bir Claude okumasının tarihi, şeklin yanıt başlıklarında gözlemlendiği zamana veya o zaman bilindiğinde kullanım uç noktasından okunduğu zamana göre belirlenir. Diğer okumaların tarihi, önbellek girişinin oluşturulduğu zamana göre belirlenir.

#### Kitabın sakladığı şey

Kaydedilen her istek, tokenlarını havuz, hesap ve anahtar başına bir sayaca bir kez ekler. Bir sayaç yalnızca büyür. Kitap üç şeyi saklıyor:

- taban çizgisi: kitabın açıldığı veya pencerenin en son çevrildiği şekil
- son uygulanan şekil
- Anahtar başına jeton sayacı aynı anda işaretini çağırır

Uygulama veya kullanım yolu ilişkilendirmeyi hesapladığında kitap güncellenir. Yazmalar bir revizyon numarasına göre karşılaştırılır ve ayarlanır. Kaybeden bir yazar, yeni bir okumada yeniden deneme yapar.

#### Bir anahtarın kısmı nasıl hesaplanır?

Kitap okunduğunda her anahtarın kısmı hesaplanır. Taban çizgisinden bu yana rakamın büyümesi, her birinin işaretinden bu yana yönlendirilen jetonlarla orantılı olarak anahtarlar arasında bölünür.

Together, bu belirteçler `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` belirteçleri başına rakamın en fazla bir noktasını açıklar (varsayılan 1.000). Açıklamadıkları büyüme dışsaldır. Temel de dışsaldır.

Örneğin, bir kitap 0'da açılır. Anahtar A daha sonra 900.000 jetonu, anahtar B ise 100.000 jetonu yönlendirir. 60 rakamında A kısmı 54 puan, B kısmı ise 6 puandır.

Anahtar işaretinin altındaki bir sayaç yeniden başlatıldı ve tam olarak sayılıyor. Bir pencerenin ortasındaki havuza katılan bir anahtar gibi işaretsiz bir anahtar, tüm jetonlarını sayar. Belirteçlerin gerisinde kalan bir rakam, bir sonraki okumada ortadan kalkan bir hataya neden olur. Birikmez.

`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` her atıfta okunur. En az 1 gibi sonlu bir sayı olmayan bir değer 1.000'e düşer.

#### Bir okuma kitabı nasıl değiştirir?

İlk eşleştirme kuralı geçerlidir:

1. **Henüz kitap yok:** Okuma kitabı açar. Onun şekli taban çizgisidir ve her sayaç işaretlenmiştir.
2. **Daha eski okumalar:** Son uygulanan okumadan önceki tarihli bir okuma göz ardı edilir. Sıfırlama süresi saklanan değerden 30 dakikadan daha erken olan bir okuma da aynı şekildedir.
3. **Yeni sağlayıcı penceresi:** saklanan süreden 30 dakikadan daha geç bir sıfırlama süresi kitabı çevirir. Şekil taban çizgisi haline gelir ve her sayaç yeniden işaretlenir. Sayaçsız anahtarlar kitaptan çıkar.
4. **Sona eren pencere:** okumanın veri süresinden sonra olmayan kayıtlı bir sıfırlama süresi, pencerenin sona erdiği anlamına gelir. Okuma, şekli ne olursa olsun kitabı dönüştürür.
5. **Daha yüksek rakam:** yalnızca son rakam hareket eder. Taban çizgisi ve işaretler kalır.
6. **Aynı rakam:** şekil, taban çizgisi ve işaretler kalır. Yalnızca kitapta eksik olan bir sıfırlama süresi yazılır.
7. **Alt rakam:** daha düşük bir rakam asla bu şekilde uygulanmaz. Kitabı ancak üç şey tutunca çevirir. Son uygulanan okumadan en az iki dakika daha yenidir. Hiçbir şey pencerenin aynı açık pencere olduğunu söyleyemez. Bir puandan fazla daha düşük.

Üç şey tutulduğunda pencere aynı açık pencere olarak sayılır. Her iki sıfırlama zamanı da bilinmektedir. Birbirlerine 30 dakika uzaklıktalar. Saklanan hala okumanın ilerisindedir. Bu pencerenin içindeki daha düşük bir rakam hiçbir şeyi değiştirmez.

Sıfırlama süresi yalnızca kendisini taşıyan okumanın veri zamanından ileride olduğunda saklanır. Daha yüksek bir rakam, kullanılabilir olduğunda okumanın sıfırlanma süresini saklar, aksi halde saklanan rakamı saklar. Eşit bir rakam, okumanın sıfırlanma süresini yalnızca kitapta sıfırlanma olduğunda kaydeder. Başka hiçbir şeyi değiştirmez. Kitabı döndürmeyen daha düşük bir rakam, sıfırlama süresini kaydetmez.

#### Kitap kullanıldığında

Bir okumadan sonra, kayıtlı sıfırlama zamanı geçerli saatten sonra olmadığı sürece kitap kullanılır. Bu durum, sıfırlamadan hemen önce alınan bir okuma, örneğin önbellekten sunulan bir okuma, sıfırlamadan hemen sonra gözlemlendiğinde ortaya çıkar.

Kullanılabilir bir okuma olmadan, saklanan kitap yalnızca geçerli pencerenin kitabı olabileceği sürece kullanılır. Bu iki durumda geçerlidir:

- sıfırlama zamanı biliniyor ve hala ileride
- sıfırlama süresi yoktur ve onu değiştiren son okuma en fazla 15 dakika eskidir

Aksi takdirde, kitap olmadığında olduğu gibi hiçbir şey atfedilmez. Saklanan sıfırlama süresi geçmiş bir kitaptan hiçbir zaman ücret alınmaz.

#### Yaptırım

Bir anahtarın yüzde boyutundaki tüketimi, ona atfedilen kısım artı harici kısmın payıdır. Dış kısım ilk olarak tahsis talebi olmayan kapasiteyi kullanır (100 eksi ağırlıkların toplamı). Sadece fazla olan kısım tuşlar arasında ağırlıkça paylaştırılıyor.

Bu tüketim, diğer boyutlarda olduğu gibi, anahtarın adil payı ile karşılaştırılır. Doygunluk sinyali `QUOTA_SATURATION_THRESHOLD` (varsayılan 0,5) ulaştığında katı mod yine de başlar. Her sayı etkin sınıra göre ölçeklendirilir: hesap başına sınır çarpı havuzdaki hesap sayısı.

`capUnit: "percent"` mutlak sınır, yalnızca anahtara atfedilen ve aynı şekilde ölçeklenen kısmı sayar. Hesap başına 100 ve k hesap limiti alın. Hizmet hesabı rakamının anahtarın kısmı N/k noktalarına ulaştığında N sınırına ulaşılır. Her hesap kendi defterine göre kontrol edilir. Örneğin iki hesapta, bir hesap rakamının 5 noktasında 10 sınırına ulaşılır.

Mağaza okunamadığında hiçbir şey atfedilmez ve o boyuttaki her anahtara 0 ücret uygulanır. Bir kitap yazımı başarısız olduğunda, bu atıf, kitabı okunduğu şekliyle kullanır. Başarısız bir belirteç yazımı, bu isteğin belirteçlerini kitabın dışında bırakır. Bu hataların hiçbiri bir isteği engellemez.

Bir `consent` havuzunda borç verme formülü, yukarıda açıklandığı gibi her bir anahtarın tüketimini yüzde boyutunda kullanır. Başka bir anahtar ödünç verildiğinde kitap bir kez okunur ve her anahtara atfedilir. Kullanılabilir bir kitap olmadan her anahtara 0 ücret uygulanır. Daha sonra ağırlığı olan bir anahtar geçer ve ağırlığı 0 olan bir anahtar yalnızca başka bir anahtar ödünç verildiğinde geçer.

#### Kullanım yolu

`GET /api/quota/pools/{id}/usage` aynı sayıları aynı fonksiyon aracılığıyla bildirir. Yüzde boyutunun `accounts` havuz bağlantısı başına bir girişi vardır. Üst düzey `consumedTotal` ve `perKey` ilk girişi yansıtır.

Rota mevcut okumayı da uygular, böylece kitabı bir istekte olduğu gibi ilerletebilir. `internal + external` kullanılabilir bir okuma olmadığında veya daha düşük bir rakam uygulanmadığında `consumedTotal` farklı olabilir.

#### Depolama ve saklama

Her iki kota deposu da kitabı saklıyor. SQLite otomatik veritabanı temizleme etkinleştirildiğinde 60 gün boyunca güncellenmeyen satırları kaldırır. Redis havuz bağlantısının defterleri ve sayaçları bir anahtarı paylaşır. Son belirteç yazımı veya defter değişikliğinden 60 gün sonra sona erer. Değişmeyen bir kitap yeniden yazılmaz, dolayısıyla kesinti en uzun plan penceresinin üzerine ayarlanır. Kullanım geçmişinin manuel olarak sıfırlanması SQLite defterleri de temizler (bkz. Sınırlamalar).

#### Sınırlamalar

- Taban çizgisinden bu yana hesap rakamındaki tüm büyüme, o zamandan bu yana yönlendirilen her anahtarın tokenlerine bölünüyor. Bu büyümenin ne zaman gerçekleştiği önemli değil.
- Yani OmniRoute dışında yapılan kullanımlar, tokenlerinin izin verdiği ölçüde anahtarlardan ücretlendirilir. Buna, kitap zaten açıkken, anahtarın pencereden ilk isteğinden önce yapılan kullanım da dahildir.
- Örneğin, dışarıda kullanım, önemli rotaların olmaması durumunda hesabı 60 puan yükseltir. Daha sonra bir anahtar 30.000 jetonu yönlendirir ve rakam 60,6'ya ulaşır.
- Eğer kitap bu kullanımdan önce açık ise anahtar kısmı 30 puandır. Ayrıca 25 ağırlığında dört anahtarla 7,65 harici kullanım taşıyor.
- Kitap bu kullanımdan sonra açılırsa 60 puan temel puandır. Anahtarın payı 0,6 puan olup, harici kullanımda 15 puan taşımaktadır.
- Bir istek veya kullanım rotasına yapılan bir ziyaret kitabı açar. Dolayısıyla, bu tür bir kullanımın temel olarak sayılıp sayılmayacağı, kitabın ne zaman açıldığına bağlıdır.
- Varsayılan tabanla, dışarıda kullanım sırasında 60.000 jetonu yönlendiren bir anahtar, hesabı 60 puan yükseltir ve 60'ın tamamını kendi payı olarak alır.
- 50.000'lik tabanla kendi payı 1,2 puandır. Diğer 58,8'i haricidir ve herhangi bir harici kullanım gibi ağırlığa göre ücretlendirilir.
- `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` planınızda bir puanın maliyetine yakın bir değere ayarlayın. Dışarıdaki kullanım aynı hesaptaki havuzun dışındaki anahtarlardan gelen trafiği içerir.
- Her modda bir yüzde sınırı uygulanır. Hesap doyum eşiğinin çok altındayken sınırlı bir anahtar reddedilebilir.
- Pencerenin başında 10 ve 12 puanlık dış kullanım sınırı alın. 20.000 tokenı yönlendiren bir anahtar daha sonra %12,4'lük bir hesap rakamıyla reddediliyor.
- Bölünme, token hacmine göre yapılan bir tahmindir. Bir istek, istem belirteçleri artı tamamlama belirteçleri olarak sayılır. Önbellek indirimleri ve model fiyatları bu sayıyı değiştirmez.
- Durum 200 ile bitmeyen bir istek, belirteç kaydetmez. Örnekler, istemcinin bağlantısını kestiği bir akış ve kullanım tüketildikten sonra ortaya çıkan yukarı akış hatasıdır.
- Böyle bir talebin neden olduğu kullanım, belirteçlerin izin verdiği ölçüde, belirteçleri kaydeden anahtarlara fatura edilir. Gerisi haricidir. Geri hareket etmiyor. Belirteç kullanımının olmadığını bildiren bir yanıt, belirteçleri de kaydetmez.
- Devam eden bir isteğin kullanımı, isteğin tamamı için başka bir aktif anahtarın kısmında görünebilir. Yalnızca istek 200 durumuyla sona erdiğinde geri döner.
- Bir kitap açıldığında hesapta mevcut olan kullanım, harici kullanım olarak sayılır. Bu, yükseltmeyi, yeni havuzu ve yeni hesabı kapsar. İlk okumadan önce yeni bir pencerede kullanım da harici olarak sayılır.
- Her anahtar, tahsis edilmeyen kapasite talebinden sonra, söz konusu kullanımın ağırlık payı ile başlar. %85'lik bir hesap ve ağırlığı 20 olan beş anahtarla, her biri kullanılan 20 anahtardan 17'si ile başlar.
- Birden fazla hesabın bulunduğu bir havuzda, hizmet hesabının rakamı toplam bütçeye uygulanır. Bu kitapta değişmedi.
- Sağlayıcının açık olarak bildirdiği bir pencerenin içindeki daha düşük bir rakam uygulanmaz. 30 dakikadan fazla geriye giden bir sıfırlama süresi, eski bir okuma olarak kabul edilir.
- Her iki durumda da kitap, depolanan sıfırlama süresi geçinceye kadar durumunu korur. Bundan sonra, bir okuma onu çevirene kadar kitaptan ücret alınmaz.
- Çözüm, manuel kullanım geçmişi sıfırlamadır (`POST /api/settings/purge-usage-history`). SQLite veritabanındaki atıf defterlerini ve bunların belirteç sayaçlarını temizler.
- `all` dönemi her defteri ve sayacı temizler. Daha kısa bir süre önce içinde yazılmayan kitapları temizler. Daha sonra, içinde yazılı olmayan sayaçları temizler, ancak yalnızca kitap kalmamış bir havuz bağlantısı için. Saklanan bir kitap hâlâ her anahtarı tezgahına göre işaretler.
- Şekli hareket etmeyen bir kitap yeniden yazılmaz, dolayısıyla daha kısa bir süre geçerli pencerenin kitabını da temizleyebilir. Bir sonraki okumada mevcut rakamla yeni bir kitap açılıyor.
- Sıfırlama Redis kota deposuna dokunmaz. Orada bir kitap penceresiyle biter veya son yazılmasından 60 gün sonra sona erer.
- Sağlayıcı sıfırlama süresi göndermediğinde, iki okuma arasında sıfırlanan ve eski rakamın üzerinde yeniden doldurulan bir pencere daha yüksek bir rakam gibi görünür. Kitap eski taban çizgisini ve işaretleri koruyor.
- Okumalar yerel saate göre tarihlenir. Sağlayıcının ilerisinde çalıştığında veya bir kaynak sıfırlama zamanını biraz erken bildirdiğinde, kitap bu farkı erkenden kapatabilir.
- Bu kısa aralıktaki büyüme, içine yönlendirilen tokenlara göre bölünüyor. Bir sonraki pencerenin ilk okuması onu düzeltir. Ters çevrilen kitapta sıfırlama süresi bulunmadığında, bu düzeltmenin, uygulanan son okumadan en az iki dakika daha yeni daha düşük bir rakama ihtiyacı vardır.
- Redis deposu tarih okumalarını kendi saatleriyle paylaşan bulut sunucuları, bu saatleri senkronize halde tutun. Saati geride çalışan bir örneğin okumaları daha eski görünür ve göz ardı edilir.
- Saklanan sıfırlama süresinden sonra kullanılabilir bir okuma gelmediğinde, anahtar başına yüzde paylaşımları ve yüzde sınırları, bir okuma geri dönene kadar uygulanmaz. Sıfırlama süresi olmadığında bu, kitabı değiştiren son okumadan 15 dakika sonra başlar.
- Redis mağazasında 60 gün boyunca boşta kalan bir kitabın, çek ile yazılması arasında süresi dolabilir. Daha sonra geçerli bir durum olan 1'in üzerindeki bir revizyonda yeniden oluşturulur.

---

## Plan Çözümleyici

`src/lib/quota/planResolver.ts` içinde uygulanmıştır.

Öncelik sırası (en yüksekten en düşüğe):

1. **Manuel veritabanı geçersiz kılma ayarı** — `connectionId` başına `provider_plans` tablosu.
2. **Bilinen katalog** — `src/lib/quota/planRegistry.ts` (yalnızca veri).
3. **Boş plan** — boyut yoktur, manuel yapılandırma gereklidir.

### Bilinen katalog

| Sağlayıcı             | Boyutlar                                                      |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, bilinmiyor), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Varsayılan yok — manuel yapılandırma gerekli                  |

---

## Boru Hattı Entegrasyonu

### PRE kancası (`open-sse/handlers/chatCore.ts`)

Kimlik doğrulama ve politika kontrollerinden sonra yukarı akış yöneticisinden önce çalışır:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Arızada açılma** : eğer `enforceQuotaShare` atarsa, isteğe bir `pino.warn` günlüğü ile izin verilir. Bu, kota motoru hatasının tüm trafiği engellemesini önler.

**Kapasite geri döndüğünde.** Anahtar payının veya havuz tavanının reddedilmesi, her iki ödünç alma modunda da iki cümleden biriyle biter:

- `percent` penceresi: `. The <window> window resets at <time>.` Sağlayıcının rapor ettiği sıfırlama zamanıdır.
- Sayılabilir birim: `. Enough <window> usage is expected to clear by <time>.` Eğer anahtar başka bir şey göndermiyorsa, zaman kayan pencerenin üst sınırıdır.

`<time>` UTC içindeki bir ISO 8601 anlıktır. Bu durumda ret `Retry-After` taşır: o ana kadar geçen tüm saniye artı bir. Bu kadar uzun süre bekleyen bir istemci, o andan en fazla bir saniye sonra yeniden deneme yapar. Anın bilinmediği durumlarda ret ne cümleyi ne de başlığı taşır. Mutlak bir tavan reddi ikisini de taşımaz. Genel kod `quota_share_blocked` kalır.

Paylaşımın reddedilmesi paylaşılan bağlantıyı etkilemez. Bekleme süresi yok, model kilidi yok ve sağlayıcı kesici arızası yok ve havuzun diğer anahtarlarına hizmet verilmeye devam ediliyor. Bir kombonun her hedefi kendi payına ait anahtarı reddettiğinde kombo beklemeden 429'a cevap verir. Cevabı `Retry-After` olarak ipucunu taşıyor. Gömme yolu, reddini aynı cümleyle sonlandırır ve hiçbir `Retry-After` göndermez.

### POST kancası (tüketim rekoru)

Başarılı bir yanıttan sonra:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Drift notu** : `consume` yanıt sonrasında başarısız olursa, dönen sayaç eksik sayar. Sağlayıcıdan gelen doyum sinyali (örn. `anthropic-ratelimit-unified-5h-utilization`), bir sonraki istekte genel tahmini düzeltir.

### Birleşik yumuşak ceza (`open-sse/services/combo.ts`)

Ne zaman `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Ceza, diğer tüm puanlama faktörlerinden sonra uygulanır. Doymuş bir anahtarın zorla bloke edilmeden seçilmesinin otomatik kombinasyon olasılığını azaltır.

---

## UI Çözüm Yolu

### `/dashboard/costs/quota-share` — Ana havuzlar sayfası

Bileşenler (tümü `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Bileşen                | Amaç                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Yeni kullanıcılara kota paylaşımını açıklayan tanıtım kartı                        |
| `CreatePoolModal`      | Yeni bir kota havuzu oluşturun (bağlantı + adı + başlangıç tahsisleri)             |
| `PoolCard`             | Havuz başına özet: ad, bağlantı, tahsis sayısı                                     |
| `DimensionBar`         | Boyut başına yığılmış çubuk: her anahtarın payı + global kullanımı                 |
| `AllocationTable`      | Tüketilen, adil paylaşım, deficit/surplus, borçlanma bayrağı içeren tablo          |
| `BurnRateChart`        | EMA yanma hızı çizgi grafiği ( `dynamic()` aracılığıyla tembel Recharts)           |
| `EditAllocationsModal` | Bir havuz için tahsis ağırlıklarını, sınırlarını ve politikalarını düzenleme       |
| `BorrowModeField`      | Sihirbazdaki ödünç alma modu seçici (`saturation` veya `consent`)                  |
| `LendingBadge`         | Yalnızca `consent` havuzlarında ödünç veren bir anahtar üzerinde salt okunur rozet |

Borç verme rozeti, belirtilen bölgeyle birlikte UTC cinsinden yüzdeyi ve ayarlandığında son tarihi gösterir. Kullanım anlık görüntüsünün son tarihini değerlendirir. Süresi dolmuş veya okunamayan bir son tarih `lending expired` olarak gösterilir.

Sayfa kancaları:

- `usePools` — her 30 saniyede `GET /api/quota/pools` getirir.
- `usePoolUsage` — talep üzerine `GET /api/quota/pools/[id]/usage` getirir.
- `useLocalStoragePoolMigration` — eski LS verilerini taşımak için bağlantı sırasında bir kez çalışır.

Havuz sihirbazının anahtarlar adımında bir `Show usage by member to key holders` kutusu bulunur. Havuzun `memberBreakdown` seçeneğini ayarlar (bkz. [Üye kullanımı](#member-usage) ). Bunun altında sihirbaz, hangi anahtarın kullanıldığını bilen birinin bir çubuğu o anahtarla eşleştirebileceği konusunda uyarıyor. Kutu işaretlendiğinde, adım üçten az veya 20'den fazla anahtarı listelediğinde çubuklar gizli kaldığından bunu belirtir. Adımdaki anahtarları sayar ve hangisinin istekte bulunabileceğini söyleyemez.

### `/dashboard/costs/quota-share/plans` — Sağlayıcı planı yapılandırması

- `ProviderPlanConfigClient.tsx`: bir sağlayıcı seçmek, çözümlenen planı görüntülemek (katalogdan otomatik veya manuel geçersiz kılma) ve boyutları düzenlemek için açılır menü.
- Değişiklikler `PUT /api/quota/plans/[connectionId]` yazılır.
- Silme işlemi kataloğa veya boş plana geri döner.

---

## Self Servis Kotası API (katılım)

`GET /api/v1/me/quota/{provider}` (aynı zamanda `/v1/me/quota/{provider}` de sunulur), API anahtar sahibinin kendi anahtarıyla paylaşılan aboneliğin ne kadarının kendisine ait olduğunu ve onları neyin engellediğini okumasına olanak tanır. Rota `src/server/selfService/quotaHandler.ts` üzerinde ince bir kabuktur; görünüm `src/lib/quota/selfView.ts` tarafından oluşturulmuştur ve yanıt sözleşmesi `src/shared/schemas/selfQuota.ts` ( `docs/openapi.yaml` içinde `SelfQuotaView` ).

### Etkinleştirme ve kimlik doğrulama

- Özellik bayrağı `QUOTA_SELF_PANEL`, varsayılan `false`. Kapalıyken rotaya ulaşan istek 404 alır. `REQUIRE_API_KEY=true` ile istemci API politikası, bayrak ne olursa olsun rota çalıştırılmadan önce 401 ile eksik veya geçersiz bir anahtarı reddeder. Anahtarı olmayan ancak oturum açılmış bir kontrol paneli oturumuna sahip bir istek, bu politikayı geçer ve rotanın kendi yanıtını alır. Bayrak, diğer tüm bayraklar gibi çözümlenir (kontrol paneli veya REST geçersiz kılma, ardından aynı adı taşıyan ortam değişkeni); [`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md) bakın.
- Her havuzun görünen adı ve her programın etiketi, havuzun anahtar sahiplerine tam olarak yöneticinin yazdığı şekilde döndürülür. Bayrağı açmadan önce, anahtar sahipleri tarafından okunabilecek durumda olup olmadıklarını kontrol edin.
- Anahtar yalnızca başlıklardan okunur: `Authorization: Bearer <key>` veya `x-api-key: <key>`. Her ikisi de gönderildiğinde ilk doğrulayan kullanılır. Sorgu dizesindeki bir anahtar veya bir tanımlama bilgisi dikkate alınmaz. Sunucunun ortam anahtarı reddedildi (401).
- Anahtarın `self:usage` kapsamına ihtiyacı var (onsuz 403).
- Sağlayıcı segmenti kesilir, küçük harfle yazılır ve `^[a-z0-9][a-z0-9._-]{0,63}$` (aksi takdirde 400) göre kontrol edilir, ardından sağlayıcı kayıt defteri aracılığıyla çözümlenir, böylece `cc` gibi bir takma ad `claude` havuzlarını okur. `claude` ve `anthropic` aynı havuzları okur.

### Her görünürlük neyi gösterir?

| Görünürlük   | Gereklilikler                                                                     | Alanlar                                                                                                                                                                                                                                          |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kendi payı   | `self:usage`                                                                      | `pools[]` (ref, ad, sağlayıcı, politika, ağırlık, sınır), `dimensions[].yourShare`, `yourShare` ile `accounts[]` ( `attributed` ve `external` olmadan bir `percent` penceresinde), `blocks`, `availableModels`, `expiresAt`, `apiBaseUrl`        |
| Hesap düzeyi | `self:usage` + `self:account-quota` ve anahtarın `sharedQuotaProviders` sağlayıcı | `percent` penceresinin `yourShare` `dimensions[].total`, `accounts[].dimensions[].account` ve `accounts[].modelWindows`, `attributed` ve `external` ve üye kullanımı açık olan bir havuza `members` ekler (bkz. [Üye kullanımı](#member-usage) ) |

- `sharedQuotaProviders` anahtar başına bir ayardır (`PUT /api/keys/[id]/self-service`): `null`, varsayılan, anahtarın ulaştığı her sağlayıcı anlamına gelir; `[]` yok anlamına gelir. Her havuzun `accountVisible` kendisine hangi görünürlüğün uygulandığını belirtir.
- Hesap çubukları ve model pencereleri yalnızca anahtarın bağlantısını kullanabileceği hesaplar için gösterilir. Anahtarın izin verilen bağlantıların bir listesi olduğunda, onun dışındaki bir hesap `Account N` girişini `account` veya `modelWindows` olmadan tutar. Boş bir liste `/v1/me/status` olduğu gibi kısıtlama olmadığı anlamına gelir. Havuz toplamı (`dimensions[].total`) bu listeye bağlı değildir.
- Yalnızca `self:usage` ile gösterilen iki rakam diğer tuşların kullanımından kaynaklanmaktadır. Bir zamanlama bütçesinin `exhausted` o zamanlama kapsamındaki her anahtarın tüketimini yansıtır. Ağırlıkları sıfır olan bir havuzda anahtarın `weight` `100 / number of members`. Her ikisi de yaptırımın anahtara uygulandığı şeydir.
- Bir havuz yalnızca çağıran anahtara bağlı opak bir değer olan `ref` ile tanımlanır. Yöneticinin yazdığı şekliyle görünen adı (`name`) eklenmiştir. Bir `ref` anahtardan ve sunucunun API anahtarı sırrına (`API_KEY_SECRET`) sahip havuzdan türetilir. Müşteriler bunu sürdürmemelidir: bu sır döndürülürse değişir.
- Hesaplar havuz sırasına göre `Account 1`, `Account 2`, … şeklinde listelenir. Hiçbir havuz kimliği, bağlantı kimliği, hesap e-postası veya hesap adı döndürülmez ve yanıt, dışındaki tüm alanları bırakan sözleşme şeması üzerinden gider.
- Sayılabilir birimler (`requests`, `tokens`, `usd`), kota kapısının uyguladığı havuz grubu olarak rapor edilir: `limit` = plan limiti havuzdaki × hesapları, `fairShare` = ağırlık / 100 × `limit` (her ağırlık 0 olduğunda eşit bölünme), `consumed` = anahtarın kota deposundaki kendi sayacı, `remaining` = `fairShare` − `consumed`, katlanmış 0.
- `blocks.schedules` anahtarın zamanlama pencerelerini listeler (`open`/`closed`, `blackout` veya `outside-window`, `retryAfterSeconds`, rezerve katlar ve pencerenin bütçesinin harcanıp harcanmadığı); `blocks.modelCaps` model başına saatlik limitlerini tüketimle birlikte listeler.
- Sağlayıcının her havuzunun dışındaki bir anahtar `pools: []` ile 200 alır; `availableModels` (anahtarın `/v1/models` gördüğü `qtSd/` kimlikleri), `expiresAt` ve `apiBaseUrl` hala dolu.
- `apiBaseUrl` `OMNIROUTE_PUBLIC_API_BASE_URL`, sonra `OMNIROUTE_PUBLIC_BASE_URL`, aksi halde `null`. Hiçbir zaman isteğin kendi kaynağı değildir.

### `status` ve `reason`

| `status`      | Anlam                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | Güncel bir okuma.                                                                                                                                                                                                                                                                                                                                                           |
| `stale`       | Önbelleğe alınmış bir hesap okuması eski olarak işaretlenmiş veya okunduktan sonra sıfırlama süresi geçmiş bir hesap. Numaralar saklanıyor. Sıfırlama süresi geçen bir model penceresi `modelWindows` grubunun tamamını `stale` işaretler. Anahtarın `percent` penceresindeki kendi payı için: kitap, kapının önbelleğinde onaylanacak bir hesap okuması yapılmadan okundu. |
| `unavailable` | Okumak yok; sayılar `null`, asla `0` değildir. `reason` nedenini söylüyor.                                                                                                                                                                                                                                                                                                  |

| `reason`                          | Ne zaman                                                                                                                                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `store_unavailable`               | Kota deposu okunamadı veya atıf kitaplarını okuyamıyor.                                                                                                    |
| `percent_attribution_unavailable` | Anahtarın bir `percent` penceresindeki kendi payı: söz konusu hesap ve pencere için henüz bir atıf kitabı mevcut değil veya kitapta anahtarı listelemiyor. |
| `percent_window_ended`            | Anahtarın `percent` penceresindeki kendi payı: Kitap, sona eren bir plan penceresine aittir.                                                               |
| `account_not_used_by_key`         | Anahtarın `percent` penceresindeki kendi payı: Hesabın bağlantısı, anahtarın izin verilen bağlantılarının dışında. Kitabı okunmuyor.                       |
| `window_not_reported`             | Sağlayıcı sınırları önbelleğinde bu plan penceresi için okuma yok.                                                                                         |
| `connection_lookup_failed`        | Hesabın bağlantısı okunamadı.                                                                                                                              |
| `not_supported`                   | OmniRoute hesabın sağlayıcısının kullanım sınırlarını okuyamaz.                                                                                            |
| `fetch_failed`                    | Önbelleğe alınmış okuma kullanılamadı ve sağlayıcı sınırlarının yenilenmesi başarısız oldu.                                                                |
| `not_available`                   | Okuma hiçbir kullanım penceresi taşımaz veya hesapta hiç okuma yoktur.                                                                                     |

Kota deposu okunamadığında, `blocks` depo destekli alanları (zamanlama bütçesinin `exhausted`, model sınırının `consumed` ve `reached`) de `null`.

### Ödünç verme izni

`PATCH /api/v1/me/quota/{provider}` arayan anahtarın bir havuz için kendi onayını kaydeder. `GET` bayrağını, başlıklarını ve sağlayıcı kurallarını kullanır. Adı salt okunur olarak okunsa da, `self:usage` kapsamı bu yazmaya izin verir.

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool` `GET` o havuz için döndürdüğü `ref`.
- `lendingPercent` 0 ile 100 arasında bir tamsayıdır. 0 değeri, onayı ve son tarihini temizler. Her iki modda da `lendingPercent` 0 olan bir gövde kabul edilir.
- `lendingUntil` isteğe bağlıdır: epoch milisaniye veya son tarih olmayan `null`. Gelecekte olmalı ve en fazla 86400000000000000. 100000000000'ın altındaki bir değer saniye olarak okunur ve reddedilir.
- Başka herhangi bir alan reddedilir. 4096 bayttan uzun bir gövde reddedilir. Okuma bu boyutta durur, dolayısıyla daha uzun bir gövde hiçbir zaman bütün olarak tutulmaz.

Kontroller bu tablodaki sıraya göre yürütülür. Her ret, sabit bir mesaj içeren standart hata gövdesini kullanır. Bu çeklerden birinin reddedilmesi hiçbir şey ifade etmez.

| Durum | Mesaj                                                                                              | Ne zaman                                                            |
| ----- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 404   | `Not found`                                                                                        | `QUOTA_SELF_PANEL` bayrağı kapalı.                                  |
| 401   | `Valid API key required`                                                                           | Anahtar eksik veya geçersiz ya da sunucunun ortam anahtarı.         |
| 403   | `API key lacks the self:usage scope`                                                               | Anahtarda `self:usage` yok.                                         |
| 400   | `Invalid provider`                                                                                 | Sağlayıcı segmenti geçersiz.                                        |
| 429   | `Too many lending changes. Retry later.`                                                           | Anahtar sınırını aştı. Cevap `Retry-After` taşır.                   |
| 400   | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | Gövde JSON değil, çok uzun veya şemayla eşleşmiyor.                 |
| 400   | `lendingUntil must be a Unix time in milliseconds`                                                 | Son tarih saniye olarak okunur.                                     |
| 400   | `lendingUntil must be in the future`                                                               | Son tarih, talep zamanında veya öncesindedir.                       |
| 404   | `Pool not found`                                                                                   | `ref` bu sağlayıcı için bu anahtarın havuzunu adlandırmıyor.        |
| 403   | `Lending is not enabled for this pool`                                                             | Havuz `saturation` modundadır ve `lendingPercent` 0'ın üzerindedir. |
| 500   | `Failed to build quota view`                                                                       | Başka bir başarısızlık. Nedeni sunucuda günlüğe kaydedildi.         |

Sınır, her anahtar için 60 saniyede 20 istektir. Sağlayıcı kontrolünden geçen her istek sayılır; daha sonra reddedilen veya hiçbir şeyi değiştirmeyen bir istek bile. Anahtarın istek hızı sınırı dışında kendi sayacı vardır.

Saklanan izni değiştiren bir istek, bir `quota.pool.lending.updated` denetim kaydı yazar. Anahtarı eski ve yeni değerlerle adlandırır. Aynı kurum iki kez gönderiyor, bir kez yazıyor, bir kez denetliyor. Cevap, yazmadan sonra oluşturulan tam `GET` görünümüyle 200'dür.

`GET` görünümü borç vermeyi şu şekilde rapor eder:

- Her havuz `borrowMode` (`saturation` veya `consent`) ve anahtarın kendi `lendingPercent` ve `lendingUntil` taşır.
- `lendingActive` yalnızca `consent` havuzunda `true`, yüzdesi 0'ın üzerindedir ve son tarihe ulaşılmamıştır.
- Bir `consent` havuzunda sayılabilir her `dimensions[].yourShare`, `borrowAvailable` taşır. Bu, diğer anahtarların ödünç verdiği, anahtarın kendi payının üzerinde kullanabileceği şeydir.
- `borrowAvailable` kapının formülünü kullanır. Anahtar kendi payının altındayken de diğer tüm anahtarları okur. Paralel olarak diğer anahtar ve sayılabilir boyut başına ekstra bir okuma olan bir `hard` anahtarı için.
- `borrowAvailable` `soft` veya `burst` anahtarı için `null` ve okuma başarısız olduğunda `null`.
- `borrowAvailable` diğer tüm anahtarların bir arada bulunduğu bir rakamdır. İki anahtardan oluşan bir havuzda diğer anahtarın kendi figürüdür.
- `borrowAvailable` henüz `percent` pencereleri veya `accounts[]` bildirilmedi.
- Bir `saturation` havuzunda görünüm, saklanan izni `lendingActive: false` ile ve `borrowAvailable` olmadan bildirir.

### Hatalar

Bu rotanın her yanıtı, başarı ya da hata, `Cache-Control: no-store` taşır. Rota çalıştırılmadan önce gerçekleşen bir ret, onu taşımaz; örneğin, istemci API politikasının 401'i veya IP filtresinin 403'ü. Rotanın hataları, sabit bir mesajla standart hata gövdesini kullanır: 400 (geçersiz sağlayıcı), 401 (eksik veya geçersiz anahtar), 403 (eksik `self:usage`), 404 (bayrak kapalı) ve 500 (`Failed to build quota view`). 500, anahtar aramanın kendisi de dahil olmak üzere, istek rotaya ulaştığında ortaya çıkan her türlü başarısızlığı kapsar; nedeni sunucuda günlüğe kaydedilir ve asla geri döndürülmez. `PATCH` hataları [Ödünç verme onayı](#lending-consent) bölümünde listelenmiştir.

### Sınırlamalar

- `remaining` anahtarın adil payının kullanmadığı kısmıdır. Bu bir garanti değildir. Havuzda yer olduğu sürece anahtar bunun ötesinde de sunulabilir. Havuzun toplamı `limit` ulaştığında, kendi `remaining` ne olursa olsun havuzun her anahtarı reddedilir ve `self:account-quota` olmayan bir anahtar bu toplamı göremez.
- `remaining` tahsisin mutlak `cap` hesaba katmaz. Sınır biriminin bir penceresindeki kendi tüketimi sınır değerine ulaştığında, uygulama anahtarı reddeder.
- Hesap düzeyindeki çubuk, sağlayıcı sınırları önbelleğinden gelir ve uygulama kararının birkaç dakika gecikmesine neden olabilir. Sıfırlama süresi geçen bir okuma `stale` olarak rapor edilir.
- Model başına pencereler (`modelWindows`) yalnızca plan penceresi eşlemesine sahip sağlayıcılar için raporlanır: bugün Claude ve Codex. Diğer sağlayıcılar için, hesap verileri boş bir `windows` listesiyle gösterildiğinde `modelWindows` hala mevcuttur.
- Anahtarın `percent` penceresindeki kendi payı bir tahmindir. İlişkilendirme kitabından gelir ve yukarıdaki "Yüzde boyutları: anahtar başına ilişkilendirme" başlığı altında listelenen tüm sınırlamaları taşır.
- `consumed`, uygulama sayısının adil paylaşımla karşılaştırılmasıdır. Tam olarak `attributed` artı `external`. `attributed` kitabın yönlendirdiği tokenların anahtarını verdiği kısımdır. `external` hesabın kullanımının havuz anahtarlarının hesaba katmadığı anahtarın parçasıdır.
- Her iki parça da yalnızca havuzun `accountVisible` doğru olduğunda gönderilir: anahtarın `self:account-quota` vardır ve sağlayıcı onun `sharedQuotaProviders`. Onsuz bir anahtar, aynı `status` ve `reason` ile tek başına `consumed` alır.
- Her iki parça ve kendi ağırlığı ile bir tutucu, havuzun anahtarlarına yüklenen havuz dışında yapılan kullanımı hesaplayabilir. Hesap kapsamına sahip bir sahip, hesap toplamını zaten görmektedir.
- Pencerede hiçbir şeyi yönlendirmeyen bir anahtar, atfedilen kısmı 0 olduğundan, harici yükünü hala `consumed` okuyabilir.
- Örneğin, A ve B tuşlarının her birinin ağırlığı 50 olan bir kitap 0'da açılıyor. Anahtar A, 900.000 jetonu ve anahtar B 100.000 jetonu yönlendirir. Hesap daha sonra 100 sınırının %60'ına ulaşır. Bu durumda `attributed` A anahtarı için 54, B anahtarı için 6 olur ve `external`, her ikisi için de 0 olur.
- Görünüm kitabı okur ve asla durumunu yazmaz. Bir kitabı açmaz ve asla sağlayıcıdan okuma talebinde bulunmaz. Redis deposunda, geçit okumalarının yaptığı gibi, okuma da arka planda değiştirilen revizyon alanlarını kaldırır.
- Paylaşım, yalnızca kapının önbelleği hesabın okunmasını tuttuğunda `ok`. Biri olmadan `stale` olur, dolayısıyla yeni bir istek olmayan bir havuzda muhtemelen güncelliğini kaybetmiş olarak görünür.
- Havuzdan bir istek geçene kadar paylaşım kullanılamaz. Bu istek defteri açar ve hesabın o andaki rakamı havuz dışında yapılan kullanım olarak sayılır.
- Birden fazla hesabın bulunduğu bir havuzda her hesap girişi, o hesabın kendi defterini ve bir hesabın limitini kullanır. Uygulama her iki tarafı da hesap sayısına göre ölçeklendirir, dolayısıyla oran aynıdır.
- Model başına pencereler anahtar için herhangi bir pay taşımaz. Kitapta model başına veri tutulmaz.
- Bir zamanlamanın rezerv katları görünüm tarafından değerlendirilmez: bir istek `schedule-reserve` nedeni ile reddedilirken bir zamanlama `open` olarak gösterilebilir.
- Aynı anahtarın iki havuzu bir bağlantıyı paylaştığında uygulama bunlardan birini uygular ve görünüm her ikisini de listeler.
- Başarısız anahtar denemelerinde adres başına bir sınır yoktur: Ters proxy'nin arkasında arayanlar bir adresi paylaşabilir (bu, iletilen istemci adreslerinin güvenilir olup olmadığına bağlıdır), dolayısıyla bir kilitleme, her anahtar sahibine giden yolu reddedebilir. `REQUIRE_API_KEY=true` ile, rota çalıştırılmadan önce istemci API politikası tarafından geçersiz bir anahtar reddedilir ve bu rotanın yerine söz konusu politikanın 401 gövdesi kullanılır.

### Üye kullanımı

Yönetici, anahtar sahiplerinin pencere kullanımının havuz üyeleri arasında nasıl bölündüğünü görmesine izin verebilir. Seçenek, havuzun `memberBreakdown` ve varsayılan olarak kapalıdır. Havuz sihirbazında veya `PATCH /api/quota/pools/{id}` ile ayarlanır. `GET /api/quota/pools` ve `GET /api/quota/pools/{id}` bunu rapor ediyor.

Görünümün bir boyutu ancak tüm bunlar geçerli olduğunda `members` taşır:

- havuz seçeneği açık
- havuzda en fazla 20 tahsis edilmiş anahtar bulunur ve bunlardan en az üçü istekte bulunabilir: aktif, iptal edilmemiş, yasaklanmamış ve süresi dolmamış
- havuzun `accountVisible` doğrudur: anahtarın `self:account-quota` vardır ve sağlayıcı onun `sharedQuotaProviders`
- `percent` penceresinde, hesabın bağlantısı anahtarın kullanabileceği bağlantıdır
- anahtarın bu penceredeki kendi payı okundu: `status` `unavailable` değil

Aksi takdirde `members` yoktur. Asla boş bir liste değildir.

- Her dilim `{ slot, consumed, isYou }`. Yanıt şeması, bir dilimdeki diğer özellikleri ve 20'den fazla dilimden oluşan listeyi reddeder. Dilimler slot sırasına göre listelenir.
- Artık istekte bulunamayan bir anahtar da dahil olmak üzere, tahsis edilen anahtar başına bir dilim vardır. Hiçbir faydası olmayan bir üye gerçek bir sıfır gösterir.
- Slot 1 her zaman soran anahtardır ve `isYou` true'dur. Diğer slot numaraları anahtarlanmış bir karmanın dereceleridir. `API_KEY_SECRET` ile anahtarlanmıştır ve havuzu, soran anahtarı ve üyeyi kapsar.
- Dolayısıyla sayılar, sahipleri arasında sıralanmıyor. Bir tutucu için ziyaretler arasında aynı kalırlar. Bir anahtarın havuza ne zaman katıldığını veya havuzdan ayrıldığını ya da bu sırrın ne zaman döndürüldüğünü değiştirebilirler.
- Sayılabilir bir pencerede dilim, üyenin kota deposundaki sayacıdır, kendi `consumed` sayacıyla aynı sayaçtır.
- Bir `percent` penceresinde bir dilim, anahtarın kendi paylaşımı olarak okunan aynı kitaptan üyenin `attributed` kısmıdır. Havuz dışında yapılan kullanımlar asla dilimlere bölünmez. Bu yük ağırlığa göre bölünür, dolayısıyla onu taşıyan dilimler ağırlıkları gösterir.
- Her görünüm paralel olarak diğer üye ve sayılabilir pencere başına bir değer okur. Bir `percent` penceresinde dilimler, paylaşımın kendi kitap okumasının ötesinde herhangi bir okuma maliyetine sahip değildir. Bir değer okunamadığında, o pencerede `members` yoktur ve anahtarın kendi paylaşımı kalır.
- Seçenek ve kullanılabilir anahtarların sayısı havuz başına bir kez okunur ve yalnızca hesap verilerini görebilen bir anahtar için okunur. Seçeneğin veya kullanılabilir anahtar sayısının okunamaması, o havuz için çubukları kapatır. Sunucu bir uyarıyı günlüğe kaydeder ve görünümün geri kalanı oluşturulur.

Çubuklar hiçbir isim veya kimlik taşımaz. Hala anahtar sahibine diğer üyeler hakkında bir şeyler anlatıyorlar:

- Tutucular dilimleri değerlerine göre eşleştirmeye devam edebilir.
- Sabit bir numaralandırma, sahibinin zaman içinde bir üyeyi takip etmesine olanak tanır.
- Dilim sayısı havuzda kaç anahtarın tahsis edildiğini gösterir.
- Üç anahtardan oluşan bir havuzda, hangi anahtarın kullanıldığını bilen biri, son anahtarın ne kullanıldığını söyleyebilir.
- Bir havuz kullanılabilir üç anahtarın altına düştüğünde çubuklar kaybolur. Daha önce alınan görüntülemeler hâlâ her üyenin ne kullandığını gösteriyor.
- Sayılabilir bir pencerede, havuz toplamı eksi dilimler, artık tahsis edilmemiş anahtarların kullanımını gösterebilir.
- Bir hesapta sıfır görüp diğerinde kullanan üye, hangi üyenin hangi hesabı kullandığını gösterebilir.
- `hard` politikasına sahip sayılabilir bir havuzda, bir üyenin adil payında büyümeyi durduran bir dilim, o üyenin ağırlığına işaret eder.

### Kullanım serisi (`GET /api/v1/me/usage`)

`GET /api/v1/me/usage?range=<range>` (ayrıca `/v1/me/usage` de sunulur), arayan anahtarın kendi isteklerinin kullanımını ve maliyetini döndürür: toplamlar, UTC günü başına, gün başına ve model, model başına ve sağlayıcı başına bir giriş. Yukarıdaki kota yolunun bayrağını, kimlik doğrulama kurallarını, `self:usage` kapsamını, `Cache-Control: no-store` ve hata davranışını paylaşır. Anahtar `range` önce kontrol edilir. Hatalar 400 (`Invalid range`), 401, 403, 404 ve 500'dür (`Failed to build usage`).

- `range`, `1d`, `7d`, `30d` (varsayılan) veya `90d` biridir. Başka herhangi bir değer, boş bir değer veya tekrarlanan bir parametre 400'dür. Set, bir çağrının maliyetini sınırlamak için `90d` durur. Görünüm yalnızca ham kullanım geçmişini okur, anahtar taşımayan günlük özetleri asla okur.
- Satırlar arayan anahtarın kimliğine göre seçilir. Anahtar adı sütunu hiçbir zaman eşleşmez ve anahtar kimliği olmadan kaydedilen satırlar hiçbir zaman sayılmaz.
- Bir seri oluşturmak, penceredeki anahtarın satırları üzerinde beş gruplandırılmış sorgu çalıştırır. Oluşturulan seri, tuş ve aralık başına 60 saniye boyunca yeniden kullanılır ve yeniden kullanılan çağrıların hiçbiri çalıştırılmaz. `generatedAt` yaşını verir.
- Seri oluşturulduğunda pencere sona erer. Daha sonra, örneğin saat çarpıklığıyla damgalanan bir satır sayılmaz.
- `coverage.retentionDays` operatörün ham kullanım geçmişi saklama ayarıdır (veritabanı ayarlarında `retention.usageHistory` ). İstenen aralık bu ayardan daha uzun olduğunda `coverage.truncatedByRetention` doğrudur. İki sayıyı karşılaştırır ve satırların gerçekten eksik olup olmadığını kontrol etmez.
- Sağlayıcı, anahtarın kendi istekleri için kayıtlı olarak döndürülür. Model, son `/` sonra kaydedilen addır ve satırlar buna göre gruplandırılır. Her hedefi reddedilen bir birleşik istek, sağlayıcı olarak yönlendirme etiketiyle (birleşik ad, `auto` veya `combo`) ve istemcinin gönderdiği model dizesiyle kaydedilir. Açık devre kesici, model bekleme süresi veya kotaya park edilmiş atlama gibi reddedilen diğer istekler, hedef sağlayıcıyı ve modeli korur.
- Yanıt, sayımların ve maliyetlerin yanı sıra ortalama gecikmeyi, başarı oranlarını ve ilk ve son isteğin zamanlarını da taşır.
- `byModel` en çok talep alan 50 sağlayıcı ve model çiftini listeler. Daha fazla çift olduğunda, girişlerinin toplamı `summary` ulaşmaz ve `summary.uniqueModels` kaydedilen her model yazımını sayar. `byModelTruncated` o zaman doğrudur ve çiftleri kesimin her iki tarafına düşen bir model kısmi toplamları gösterir.
- İki maliyet rapor ediliyor. `costUsd`, kullanım analizlerinin gösterdiği gibi faturalanan maliyettir. Claude Code planı gibi sabit ücretli abonelik sağlayıcıları burada 0 ABD doları sayar. `listPriceUsd`, abonelikler dahil liste fiyatıyla aynı kullanım fiyatına sahiptir. Modelinde fiyat satırı olmayan bir istek, depolanan maliyetini sayar: sağlayıcının bildirdiği veya istek kaydedildiğinde hesaplanan maliyet. Yalnızca hiçbirini içermeyen bir istek 0 olarak sayılır ve işaretçisi yoktur, dolayısıyla toplam kısmi olabilir.
- Yanıt sözleşmesi `src/shared/schemas/selfUsage.ts` ( `docs/openapi.yaml` `SelfUsageSeries` ).

### Self servis sayfası

`QUOTA_SELF_PANEL` açıkken `/quota/{provider}` herkese açık bir sayfadır. Anahtar sahibi buraya bir API anahtarı yazar ve bu anahtarın sağlayıcıya ait havuzlarını görür. Her havuz, havuz penceresi başına bir kart gösterir; havuzun herkes için kullanımı ve anahtarın kendi payı vardır. Havuzun her hesabının, hesabın kullanımı ve anahtarın paylaşımıyla birlikte kendi kartları vardır. Hesabın kullanımı yalnızca anahtar hesap verilerini görebildiğinde görünür. Sayfada ayrıca her hesabın model başına sınırları ve anahtarın kendi kullanımı da listelenir. Bir program şu anda anahtarı engellediğinde bir bildirim görünür. Bir kart, anahtarın model başına her kapağını kullanımıyla birlikte listeler ve ulaşılanları işaretler. `{provider}` bir sağlayıcı kimliği veya takma adıdır (`/quota/claude`, `/quota/cc`). Bilinmeyen bir sağlayıcı ve bayrak kapalıyken her `/quota/*` yolu 404'e yanıt verir. Özel OpenAI veya Antropik uyumlu düğümdeki havuzların sayfası yoktur. API hala onlar adına cevap veriyor.

Sayfada oturum yok. Anahtar yalnızca `GET /api/v1/me/quota/{provider}`, `PATCH /api/v1/me/quota/{provider}` ve `GET /api/v1/me/usage` `Authorization` başlığında gönderilir, hiçbir zaman URL gönderilmez. Sunucunun kabul ettiği bir anahtar sekmenin `sessionStorage` dosyasında tutulur. "Bu cihazda hatırla" ile bunun yerine `localStorage` tutulur ve "Anahtarı unut" onu her ikisinden de kaldırır. Sunucunun reddettiği bir anahtar depodan kaldırılır.

`consent` modundaki bir havuz, bir borç verme kartını gösterir. Burada anahtar sahibi, ödünç verilecek anahtarın boşta kalan payının 0 ila 100'ü arasında bir tam yüzde belirler. İzin sahibi aynı zamanda iznin ne kadar süreceğini de seçer: kapatılana kadar, 1 saat, 8 saat, 24 saat, 7 gün veya 30 gün. Bir süre, kaydetme anından itibaren sayılır. Son tarih yürürlükteyken, sahibi bunun yerine bu süreyi koruyabilir. Kaydetmeden önce bu son tarih geçerse kart hiçbir şey göndermez ve başka bir seçenek sorar. %0 ile son tarih gönderilmez. Kart, saklanan son tarihi, adı verilen saat dilimiyle birlikte gösterir. Son tarihi geçmiş bir onay, sona ermiş olarak gösterilir.

Bir `hard` anahtarı için kart, havuz penceresi başına şu anda anahtara başka hangi anahtarların ödünç verildiğini de listeler. Her satır, diğer tüm tuşların toplamı için bir rakamdır. İki anahtardan oluşan bir havuzda diğer anahtarın kendi figürüdür. Görünümün rapor etmediği bir rakam sıfır olarak değil, mevcut değil olarak okunur. Kartta `soft` veya `burst` anahtarı için herhangi bir rakamın geçerli olmadığı belirtiliyor.

Anahtarı 0'ın üzerinde bir yüzdeyi saklayan `saturation` modundaki bir havuz yalnızca para çekme işlemini gösterir. Saklanan yüzdenin orada hiçbir etkisi olmadığını söylüyor. Para Çekme düğmesi son tarih olmadan 0 gönderir. Saklanan 0'a sahip `saturation` modundaki bir havuz, kredi kartının olmadığını gösterir. Kaydetme işleminden sonra, döndürülen görünümün artık ihtiyaç duymadığı kart, sayfanın görünümü yeniden değişene kadar mesajında kalır.

Sahibi Kaydet veya Geri Çek tuşuna basana kadar hiçbir şey kaydedilmez. Her basış bir `PATCH /api/v1/me/quota/{provider}` isteği gönderir ve ilk basış beklemedeyken ikinci basış hiçbir şey göndermez. Gövde, havuzun opak `ref` görünümden, yüzdeden ve son tarihten taşır. Cevap, yeniden oluşturulmuş kota görünümüdür ve sayfa bunu ikinci bir okuma olmadan gösterir. İki kayıt çakıştığında sayfa, son yanıttan sonra kotayı bir kez okur. Sayfa, izni tarayıcı depolama alanında tutmuyor.

Reddedilen bir değişiklik kartta HTTP durumundan seçilen bir metinle açıklanır. Hata metni okunmadı. Bir 401, anahtarın kabul edilmediğini söylüyor ve kotayı yeniden yüklüyor. 403, havuzun borç verme değişikliklerini kabul etmediğini, 404 ise havuzun gittiğini söylüyor. Her ikisi de kotayı yeniden yükleyen bir düğme sunar. 400 veya başka bir 4xx yanıtı, sahibinden yüzdeyi ve son tarihi kontrol etmesini ister. Bir 429, sahibinden, cevap verildiğinde `Retry-After` saniyeleri ile birlikte beklemesini ister. 5xx yanıtı, 408 veya ağ hatası, değişikliğin kaydedilmemiş olabileceğini belirtir ve girilen değerleri korur. Sözleşmenin dışında bir yanıt kotayı yeniden yükler. Başarısız bir kaydetme, anahtarı tek başına kaldırmaz. Reddedildikten sonra yeniden yükleme yapıldığında sayfa, reddedilen herhangi bir okumada olduğu gibi anahtarı kaldırır.

Bir anahtar kabul edildiğinde sayfada üç sekmeli bir "Araçlarınızı ayarlayın" kartı da gösterilir. "Claude Code" `~/.claude/settings.json` için `env` bloğunu verir. "Kabuk" `export` satırlarıyla aynı değişkenleri verir. "Claude Desktop" üçüncü taraf çıkarım penceresinin değerlerini verir. Modeller, anahtarın o sağlayıcı için arayabileceği kota paylaşımı modelleridir. Anahtarla birlikte böyle bir liste gelmediğinde blok bunun yerine ağ geçidi modeli keşfini etkinleştirir. Ağ geçidi adresi, sunucunun bildirdiği genel API kaynağıdır (`OMNIROUTE_PUBLIC_API_BASE_URL`, sonra `OMNIROUTE_PUBLIC_BASE_URL`). İkisi de ayarlanmadığında kart bir yer tutucu gösterir ve sahibine yöneticiye sormasını söyler. Anahtar yer tutucu olarak gösterilir. "Anahtarımı dahil et", anahtarın tamamını ekrandaki metne ve kopyalama düğmesinin kopyaladığı yere yerleştirir. Bu, kutu temizlenene, anahtar unutulana veya değiştirilene veya sayfa bırakılana kadar sürer. Kart hiçbir istek göndermiyor ve dosya indirme olanağı sunmuyor.

API işaretlerinin `stale` okuması muhtemelen güncelliğini kaybetmiş olarak gösteriliyor. `unavailable` olarak işaretlenen bir okuma, hiçbir zaman sıfır olarak değil, nedeni ile birlikte gösterilir.

Yüzde planlarında sayfa, API bunu bildirdiğinde anahtarın kendi payını alır. Sayının bir tahmin olduğunu söylüyor ve iki parçasını adlandırıyor. Model başına limitler yalnızca hesabı gösterir.

Bir pencere `members` taşıdığında, kartı aynı zamanda slot sırasına göre üye başına bir segment içeren bir çubuk gösterir. Sorma tuşunun bölümü vurgu rengini kullanır. Diğer bölümler temanın grafik renkleri arasında geçiş yapar. Bir metin göstergesi her bölümü değeriyle birlikte listeler; dolayısıyla hiçbir şey renge bağlı değildir. Segmentler `You` veya `Member N` olarak etiketlenir; burada N yuvadır.

### Sayfa için özel bağlantı noktası

`QUOTA_PANEL_PORT` yalnızca self servis sayfasına hizmet veren ikinci bir dinleyiciyi açar. Değişken ayarlanmadığı sürece kapalıdır. `QUOTA_PANEL_HOST` bağlama adresidir ve varsayılan olarak `127.0.0.1`.

Dinleyici bu yolları ana bağlantı noktasına aktarır ve diğer tüm yollar için 404'ü yanıtlar:

| Yol                                                                      | Porsiyonlar                                       |
| ------------------------------------------------------------------------ | ------------------------------------------------- |
| `/quota/{provider}`                                                      | sayfa                                             |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | Sayfanın okuduğu kota görünümü                    |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | Sayfanın okuduğu kullanım serisi                  |
| `/_next/static/`                                                         | Yapının komut dosyaları, stilleri ve yazı tipleri |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | Simgeler                                          |

`GET` ve `HEAD` gövde olmadan aktarılır. Ayrıca gövdeli bir istek de iletilir: sayfanın bir ödünç verme seçeneğini kaydetmek için gönderdiği kota görüntüleme yolunun `PATCH`. Bağlantısı yanıt vermeden kapatılan CONNECT isteği dışında diğer yöntemler 404'e yanıt verir. Bir organın 404'e cevap verdiğini ve bağlantısının kapatıldığını bildiren diğer istekler. Yükseltme istekleri reddedilir ve bağlantıları kapatılır. API bağlantı noktasında olduğu gibi nokta segmenti veya parça işaretçisi içeren bir yol reddedilir. Yazdırılabilir ASCII dışında bir karaktere sahip istek hedefi de öyle. Hedefteki bir ham kontrol karakteri, bu bağlantı noktasının kendi kontrolünden önce HTTP ayrıştırıcısı tarafından 400 olarak yanıtlanır. Çerçevenin kendi kullanımı için ayırdığı istek başlıkları aktarılmaz: `x-middleware-`, `x-invoke-`, `x-nextjs-`, `x-now-` veya `x-next-` ile başlayan adlar ve `x-matched-path` ve `next-resume` adları. İstek onlar olmadan iletilir. Kontrol paneline, oturum açma sayfasına, yönetim API ve çıkarım yollarına bu bağlantı noktası üzerinden erişilemez.

`PATCH`, hiçbir parametre olmadan veya yalnızca `charset=utf-8` ile `Content-Type: application/json` taşımalıdır. 1'den 4096'ya kadar düz rakamlarla yazılmış bir `Content-Length` taşımalı ve `Transfer-Encoding` içermemelidir. Bu kurallardan birini ihlal eden bir `PATCH`, 404'ü yanıtlar. İmzalı veya tekrarlanan gibi bazı hatalı biçimlendirilmiş uzunluklar, bu bağlantı noktasının kendi kontrolünden önce HTTP ayrıştırıcısı tarafından 400 olarak yanıtlanır. Port, ana portla temasa geçmeden önce bildirilen baytları okur ve en fazla 5 saniye bekler. O zamana kadar tamamlanmayan bir gövde 404 yanıtını verir ve bağlantısı kapatılır. Bu durumda veya istemci ilk önce ayrıldığında ana bağlantı noktasına hiçbir şey ulaşmaz. Bağlantı noktası tam olarak bildirilen baytları aynı `Content-Length` ile aktarır. Onlardan sonraki baytlar bağlantıdaki bir sonraki istek olarak okunur. Ön taraftaki TLS ters proxy'si `Content-Length` iletmeli ve istek gövdesini yeniden parçalamamalıdır. Ana bağlantı noktası, `GET` olduğu gibi `Authorization` başlığındaki API anahtarını kontrol eder.

404 gövdesi `{"error":"not_found","message":"Not found."}`. Arızalı bir röle, `detail` alanı olmadan 502 (`api_bridge_unavailable`) veya 504 (`api_bridge_timeout`) yanıtını verir.

Dinleyici `QUOTA_SELF_PANEL` okumaz ve sayfayı açmaz. Bayrak kapalıyken, sayfa ve API ana bağlantı noktasında 404'e yanıt verir ve dinleyici bu yanıtı aktarır.

Geliştirme sunucusunda (`next dev`), sayfa bu bağlantı noktası üzerinden etkileşimli hale gelmez. Geliştirme çalışırken yeniden yükleme soketi bir yükseltme isteğidir ve bağlantı noktası bunu reddeder. Geliştirme sırasında ana bağlantı noktasını kullanın.

Bağlantı noktası düz HTTP hizmet eder ve sayfa API anahtarlarını gönderir. Varsayılan bağlama adresini koruyun ve önüne TLS içeren bir ters proxy koyun. Geri döngü dışındaki bir bağlama adresi bu bildirimi günlüğe kaydeder:

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

Hiçbir yönlendirme başlığı göndermeyen bir geridöngü eşi, ana bağlantı noktasında yerel olarak sayılır. Bu nedenle aynı ana bilgisayardaki bir proxy'nin `X-Forwarded-For` göndermesi gerekir. Özel bir adresteki proxy'ye bu başlık için yalnızca `OMNIROUTE_TRUST_PROXY=private` (veya `lan`) ile güvenilir. Başka herhangi bir eş, bağlantının adresiyle raporlanır ve gönderdiği yönlendirme başlıkları bırakılır.

Dinleyici aynı anda en fazla 256 bağlantıya sahiptir. Bir istemcinin istek başlıklarını göndermek için 10 saniyesi ve isteğin tamamını göndermek için 30 saniyesi vardır. Boşta tutulan canlı tutulan bağlantı yaklaşık 5 saniye sonra kapanır. 60 saniye boyunca etkinlik olmayan bir bağlantı kapatılır. Bu değerler sabittir. Öndeki ters proxy'de de bağlantı ve hız sınırlarını ayarlayın. Ön taraftaki ters proxy, boşta kalan yukarı akış bağlantılarını 5 saniyeden daha kısa bir süre tutmalı veya bunları yeniden kullanmamalıdır. Ana bağlantı noktasına aktarılan röle, API bağlantı noktasının (`API_BRIDGE_*`) yukarı akış zaman aşımlarını kullanır.

Dinleyici ayrıca `API_PORT` ayarlanmadığında da başlar. `QUOTA_PANEL_PORT` yalnızca rakamla yazılan, 1 ile 65535 arasında bir bağlantı noktası olmalıdır. Kontrol paneli bağlantı noktasından ve API bağlantı noktasından farklı olmalıdır. Canlı WebSocket sunucusu açıkken `LIVE_WS_PORT` de farklı olmalıdır (varsayılan 20132). Başka herhangi bir değer hiçbir şeyi açmaz ve bir uyarı günlüğe kaydeder. Reddedilen bir değerle ilgili uyarı, değişkeni adlandırır ve değeri tekrarlamaz. Zaten kullanımda olan bir bağlantı noktası hiçbir şeyi açmaz ve şu uyarıyı günlüğe kaydeder:

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

`OMNIROUTE_BASE_PATH` setiyle dinleyici yukarıdaki her yolu bu önek altında bekler. Derleme zamanında ve çalışma zamanında aynı `OMNIROUTE_BASE_PATH` kullanın. Başına eğik çizgi koyarak ve sonunda eğik çizgi olmadan yazın, örneğin `/omniroute`. `/` ve `/omniroute/` dahil başka bir şekil, yapının bu formları kabul etmesine rağmen bağlantı noktasını bir uyarıyla kapatır. İlk bölümü bir uygulama rotasını adlandıran temel yol da aynı şekildedir: her durumda `api`, `v1`, `v1beta`, `_next`, `quota`, `dashboard`, `docs`, `login`, `codex`, `responses`, `anthropic`, `openai`, `v0` veya `connect`.

Sınırlamalar:

- Sondaki eğik çizgiyle `/quota/{provider}/` bu bağlantı noktasında 404'ü yanıtlar.
- Hizmet çalışanı ve web uygulaması bildirimi bu bağlantı noktasında sunulmaz.
- Kontrol panelindeki özel bir favicon seti bu bağlantı noktasında gösterilmez.
- Uygulama bir temel yol altında çalıştığında simgeler gösterilmez.
- Liman sade HTTP/1.1. konuşuyor
- Başarısız olan bir bağlama, işlem yeniden başlatılana kadar yeniden denenmez.
- Dinleyicinin istemci adresi başına bağlantı veya hız sınırı yoktur.
- Konteyner kurulumları bu bölümün kapsamında değildir.

---

## Ortam Değişkenleri

| Değişken                             | Varsayılan      | Tanım                                                                                                     |
| ------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`                 | `sqlite`        | Kullanılacak sürücü: `sqlite` veya `redis`                                                                |
| `QUOTA_STORE_REDIS_URL`              | _(boş)_         | Redis URL, örneğin `redis://localhost:6379`                                                               |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`           | 0..1; `>= threshold` katı modu etkinleştirir                                                              |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`          | Yüzde plan penceresinin en fazla bir noktasını açıklayan jetonlar                                         |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`           | 0..1; Yumuşak politika kombo puanı çarpanı                                                                |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`            | GC eski `quota_consumption` kovalarını kaldırmasına günler kala                                           |
| `QUOTA_PANEL_PORT`                   | _(ayarlanmadı)_ | Self servis sayfası için özel bağlantı noktası. Ayarlanmamış olması dinleyicinin olmadığı anlamına gelir. |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`     | Bu bağlantı noktasının adresini bağlayın                                                                  |

DB ayarları (`quotaStore.*`) env değişkenlerini geçersiz kılar.

---

## Sorun Giderme

### Redis yapılandırılmış ancak bağlanmıyor

`ioredis` paketinin yüklü olduğunu (`npm ls ioredis`) ve `QUOTA_STORE_REDIS_URL`
adresine erişilebildiğini doğrulayın. Bağlantı başarısız olduğunda fabrika SQLite'a
geri döner (`warn` düzeyinde günlüğe kaydedilir).

### `peek`, eski veri döndürüyor / hata durumunda erişime izin veriyor

`peek` hata verirse `enforceQuotaShare`, sonucu "izin ver" olarak değerlendirir
(hata durumunda erişime izin verme). Kök nedeni belirlemek için `pino` günlüklerindeki
`quota:enforce` ve `quota:factory` girdilerini kontrol edin.

### Tüketim sayacı sapması

Gerçek sağlayıcı kullanımı sayaçlardan farklıysa bu beklenen bir durumdur —
2 bölümlü kayan pencerenin pencere sınırlarında yaklaşık %1 hata payı vardır ve
`consume`, yanıt sonrasında beklemeden çalıştırılır. Doygunluk sinyali
(`saturationSignals.ts`), gerçek sağlayıcı kullanımını 30 saniyelik TTL ile okur ve
`globalUsedPercent` değerini buna göre ayarlar.

### Havuz, tüketim hızı için "veri yok" gösteriyor

`computeBurnRate` en az 2 geçmiş örnek gerektirir. Önceden `consume` çağrısı
bulunmayan yeni havuzlar `tokensPerSecond: 0` ve `timeToExhaustionMs: null`
gösterir.

---

## localStorage'dan Geçiş

`/dashboard/costs/quota-share` ilk kez yüklendiğinde, `useLocalStoragePoolMigration` hook'u
şunları kontrol eder:

1. `localStorage.getItem("omniroute:quota-share:pools")` boş değildir.
2. `GET /api/quota/pools`, `[]` döndürür (DB boştur).

Her ikisi de doğruysa, eski havuzların her birini toplu olarak `POST /api/quota/pools`
adresine gönderir ve ardından localStorage anahtarını kaldırır. Geçiş idempotenttir: 2. koşul yeniden geçiş yapılmasını önler.

---

## Dahili Strateji Sınıflandırması

`quota-share`, **yalnızca dahili** bir yönlendirme stratejisidir
(`src/shared/constants/routingStrategies.ts` içindeki `INTERNAL_ROUTING_STRATEGY_VALUES`).
Yalnızca sistem tarafından oluşturulan `qtSd/` havuz kombinasyonları tarafından kullanılır
ve kullanıcı tarafından seçilebilir bir seçenek olarak UI veya API'de hiçbir zaman
görünmemesi için kasıtlı olarak `ROUTING_STRATEGY_VALUES` kapsamı dışında tutulur.

---

## Test Kapsamı

Kota paylaşımlı motorla birlikte iki katmanlı otomatik kapsama alanı sunulur:

| Süit                | Emretmek                                                               | Neleri kapsıyor                                                                                                                                                                                                          |
| :------------------ | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Birim (29 test)     | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR zamanlayıcı, doygunluk geçidi, eşzamanlılık sınırları, fairShare matematiği, birikim kuyruğuna alma                                                                                                                  |
| Entegrasyon matrisi | `npm run test:combo:matrix`                                            | Gerçek birleşik boru hattı aracılığıyla uçtan uca yönlendirme kararı; DRR adillik + canlı dikişler yoluyla doygunluğun önceliklendirilmesi (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Entegrasyon matrisi, 22 genel stratejinin tamamıyla birlikte CI çalışır. Birim paketi bağımsız olarak çalıştırılabilir.

---

## DB Şema Özeti

`078`, `079` ve `085` geçişleriyle eklenen üç tablo:

- `quota_pools` + `quota_allocations` — havuz tanımları ve anahtar başına tahsisler.
- `quota_consumption` — `(apiKeyId, dimensionKey)` başına 2 kovalı yuvarlanan sayaçlar.
- `provider_plans` — manuel sağlayıcı planı geçersiz kılmaları ( connectionId başına JSON boyutları).

Tüm tablolar eş zamanlı `CREATE TABLE IF NOT EXISTS` geçişleri aracılığıyla eklendi.

Onaylı ödünç verme üç sütun ekler: `quota_allocations.lending_percent` (tamsayı, varsayılan 0), `quota_allocations.lending_until` (epoch milisaniye veya son tarih yok için `NULL` ) ve `quota_pools.borrow_mode` (varsayılan `saturation`). Taşıma işlemi yalnızca bu sütunları ekler ve mevcut hiçbir satırı yazmaz.

Yüzde ilişkilendirme defteri `quota_percent_ledger` (havuz, hesap ve plan penceresi başına bir satır) ve `quota_percent_ledger_tokens` (havuz, hesap ve API anahtarı başına bir jeton sayacı) ekler. `src/lib/db/quotaPercentLedger.ts` bunları okur ve yazar.
