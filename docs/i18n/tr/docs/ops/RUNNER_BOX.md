# Self-Hosted Runner Box Operations (.113 pool) (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Şirket içinde barındırılan havuz **.113** makinesinde (`tomni-proxmox-113`) çalışır. 2026-10-18 tarihinden bu yana her
OmniRoute runner'ının **tek bir rolü**, tek bir etiketi ve iş yükünün ölçülen gereksinimlerine göre
boyutlandırılmış bir bellek/CPU bütçesi vardır. Turbopack yuvası, derlemenin ihtiyaç duyduğu kaynakları alır;
diğer yuvalar ise ölçülen tepe değerlerine göre boyutlandırılmıştır. Makine yalnızca bir Turbopack derlemesi,
bir Release-Green webpack derlemesi ve bir lint işiyle aynı zamana denk geldiğinde kapasitesinin üzerinde
kaynak tahsis eder; ana makinenin swap alanı (16 GB) bunu karşılar ve pull-request derlemeleri barındırılan
runner'larda çalıştığı için Turbopack yuvası çoğu zaman boştadır:

| runner               | etiket           | rol                                                                                                                                                           | `MemoryHigh` / `MemoryMax` | `CPUQuota`     |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------- |
| `omniroute-113-5`    | `omni-build`     | Turbopack derlemeleri: `ci.yml` `Build` (yalnızca push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, gecelik a11y derlemesi | 56 GB / 60 GB (swap 0)     | 1600 %         |
| `omniroute-113-6`    | `omni-release`   | Release-Green (`release-green` + `main-green`), webpack derlemesi                                                                                             | 20 GB / 24 GB (swap 4 GB)  | 800 %          |
| `omniroute-113-2`    | `omni-light`     | gecelik işler (Schemathesis, promptfoo, garak, k6) ve `quality.yml` `lint-guard`                                                                              | 12 GB / 16 GB (swap 4 GB)  | 600 %          |
| `omniroute-113`      | `omni-light`     | yukarıdakiyle aynı havuz                                                                                                                                      | 8 GB / 12 GB               | 400 %          |
| OmniHeuris, OmniMind | (kendi repoları) | yalnızca Dependabot (her biri için tepe değeri 155 MB, 2026-10-18)                                                                                            | 4 GB / 6 GB                | her biri 200 % |

2026-10-18 tarihinde ölçüldü:

| kaynak     | değer                            | zamanlama açısından anlamı                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU  | **78 GB / 32 çekirdek**          | bir Turbopack üretim derlemesi, sınırlandırılmadığında 49 GB tepe değerine ulaştı (`tests/unit/ci-build-bundler-webpack.test.ts`); Next 16.3.8'de yalnızca derleme aşaması ~40 GB kullanıyor (`next-build` içinde 36 GB RSS ve 3 GB kullanan 17 loader worker, 2026-10-18 tarihinde ölçüldü); bir webpack derlemesi ~14–16 GB kullanıyor. Bir Turbopack + bir webpack derlemesi birlikte sığar; iki Turbopack derlemesi sığmaz |
| swap       | 16 GB                            | `omniroute-113-5`, swap kapalıyken (`MemorySwapMax=0`) çalışır; böylece kontrolden çıkan bir derleme, makineyi swap kullanmaya zorlamak yerine üst sınırında sonlandırılır                                                                                                                                                                                                                                                     |
| `/tmp`     | **12 GB tmpfs = RAM**            | burada tutulan her şey bellek kullanır; kalan dosyalar 3 saat sonra temizlenir                                                                                                                                                                                                                                                                                                                                                 |
| CPU        | 32 çekirdekte 60 yük gözlemlendi | kotalardan önce, bir Turbopack derlemesi (~1166 % CPU) ile aynı makinedeki bir coverage paketi, diğer listener'ların heartbeat sinyallerini kaynak yetersizliğine uğrattı (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                |
| runner'lar | **7 listener** (2026-10-28)      | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` ayrıca `omni-build` etiketini de taşır; `omniroute-113-3/-4/-8` depodan silindi (2026-10-28)                                                                                                                                                                                                                                                                            |

Sınırlar, her unit'in `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` dosyasında
bulunur (önceki değerler `override.conf.bak-20261018` olarak saklanmıştır) ve
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` ile canlı olarak uygulanmıştır — yeniden başlatma yapılmadığından
çalışan hiçbir işe dokunulmamıştır. Etiketler de runners API'si aracılığıyla (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) canlı olarak değiştirilir.

## Temizleyiciyi kurun (tek seferlik, sunucuda)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): her 30 dakikada bir, günlüğü /var/log/runner-janitor.log dosyasına yaz
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` gereklidir: temizleyici, bir yolu kaldırmadan önce açık dosyaların tek bir
anlık görüntüsüyle yolun boşta olduğunu doğrular; bu araç olmadan hiçbir şeyi
kaldırmaz, bunu bildirir ve 1 koduyla çıkar. Herhangi bir değişikliği önce
`--dry-run` ile deneyin — tam olarak ne yapacağını yazdırır ve hiçbir şeye dokunmaz.

Her çalıştırmada yaptıkları: **tmpfs üzerinde 3 saat**, diskteki `_work/_temp`
üzerinde ise 24 saat sonra kendi artıklarımızı (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) temizler; 75 dakikadan eski bir `next-build`
sürecini sonlandırır (hiçbir iş bu kadar uzun sürmez — 2026-08-27 tarihinde bir
iş, GitHub işi kayıp ilan ettikten sonra 70 dakika çalışmıştı); birimi
**durdurulmuş** runner'lara ait 48 saatlik checkout'ları temizler; disk kullanımı
≥ %85, bellek PSI `full/avg60` ≥ %10 olduğunda ve dinleyici sayısı
`MAX_ACTIVE_RUNNERS` değerini aştığında (omniroute/diğer dağılımıyla birlikte)
uyarı verir. Çıkış kodu 1 = müdahale gerekiyor; günlüğü okuyun.

75 dakika kuralı, GitHub'ın zaten vazgeçtiği bir işe ait derlemeyi yakalamaz.
`Runner.Listener` işini yenileyemediğinde `_diag/Runner_*.log` içinde
`POST request to …/renewjob timed out after 100 seconds` görünür; API, son başarılı
yenilemeden yaklaşık on dakika sonra işi `completed` (başarısız) olarak bildirir ve
`next-build`, bağlı bir iş olmadan çalışmaya devam eder (2026-10-18: #17066
derlemesi 19:43'te başarısız olmuştu ve derleme beş dakika sonra hâlâ 40 GB yer
tutuyordu). En yeni `_diag/Worker_*.log` içindeki ref'i doğrulayın, ardından yalnızca
derleme ağacına PID üzerinden SIGTERM gönderin — `next-build`, `npm run build`,
`build-next-isolated.mjs` ve `_work` worker'ları. `Runner.Listener`,
`RunnerService.js` veya `Runner.Worker` süreçlerine asla dokunmayın: worker, işi
iptal edilmiş olarak bildirir ve dinleyici kendiliğinden yeniden çevrimiçi olur.

## Runner birimleri: KillMode

Runner'ın varsayılan `KillMode=process` ayarı, bir birim durdurulduğunda veya
yeniden başlatıldığında `Runner.Worker → npm → next-build` süreçlerini çalışır
durumda bırakır — yetim bir derleme, bağlı bir iş olmadan RAM ve CPU tüketmeye
devam eder. Her OmniRoute birimi, `KillMode=mixed` ayarını içeren bir ek
yapılandırmaya
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
sahiptir: önce dinleyiciye SIGTERM, `TimeoutStop` anında ise tüm cgroup'a SIGKILL
gönderilir. Bu ayar, birimin bir sonraki yeniden başlatılmasında etkinleşir —
boşta olma denetimiyle yeniden başlatmayı aynı komutta gerçekleştirerek,
**yalnızca boşta olduğunda ve tek seferde bir runner'ı** yeniden başlatın.

## İşletim kuralları

- **Aynı anda yalnızca bir Turbopack derlemesi — etiketle zorunlu kılınır.** Tam bir Turbopack
  `next build` çalıştıran her iş `[self-hosted, omni-build]` etiketlerini hedefler ve bu etiketi
  yalnızca **`omniroute-113-5`** taşır: `ci.yml` içindeki `Build`, `npm-publish.yml` içindeki
  `publish`, `nightly-v4-build`, `preview-artifact`, gecelik a11y derlemesi (#16853) ve
  `docker-publish.yml` içindeki **amd64** (BuildKit içinde webpack — Turbopack burada panikledi,
  çalışma 33253576569). arm64 Docker aşaması `ubuntu-24.04-arm` üzerinde kalır.
  `docker-publish` amd64, `ci.yml` içindeki `Build` ile `heavy-build-main` eşzamanlılık grubunu
  paylaşır (`cancel-in-progress: false`). Docker Engine, `omniroute-113-5` üzerinde bulunmalıdır.
  İkinci bir Turbopack yuvası 78 GB'a sığmaz (2 × 33–37 GB ve makinenin geri kalan yükü);
  ikinci yuva yalnızca webpack derlemeleri için güvenlidir.
- **Pull request derlemeleri barındırılan çalıştırıcılarda çalışır (2026-10-18).** `ci.yml`
  içindeki `Build`, `omni-build` hedefine yalnızca `push` ve `workflow_dispatch` için ulaşır;
  her `pull_request` (aynı kaynaklı veya fork) ve `merge_group` derlemesi webpack ile
  `ubuntu-latest` üzerinde çalışır. Aynı kaynaklı her PR yuvaya yönlendirildiğinde bir Turbopack
  derlemesi yuvayı 29–58 dakika boyunca meşgul tuttu, 18 derleme 18 saate kadar kuyrukta bekledi
  ve sürüm hattının kendi push derlemesi 40 iş içinde yuvayı yalnızca bir kez alabildi.
  Barındırılan çalıştırıcıda aynı PR derlemesi, PR'ın diğer işlerinin yanında 8–12 dakika sürer.
  `npm-publish` tarafından yayımlanan paketleyici Turbopack; varsayılan dalın gecelik a11y
  derlemesi (04:41 UTC), yuvaya ulaşan her push veya dispatch derlemesi ve `npm-publish`
  tarafından kullanılmaya devam eder. `tests/unit/build/heavy-build-queue.test.ts`,
  dört koşullu geçidi sabitler.
- **Turbopack yuvasını asla ölçülen gereksiniminin altında boyutlandırmayın.** 2026-10-18 saat
  18:06'da `omni-release` için yer açmak amacıyla yuva 56G/60G'den 40G/44G'ye düşürüldü.
  Derleme aşaması tüm çalışma boyunca `MemoryHigh` sınırında kaldı (bellek PSI `full` %30–43)
  ve aynı cgroup'u paylaşan `Runner.Listener` iş atamasını yenileyemedi. Sahibinin
  2026-10-17 tarihli 56G/60G ayarı aynı gün geri yüklendi. Bu değerin altında derleme
  başarısız olmaz; kaynakları tüketerek sürünür ve iş kaybedilir.
- **Release-Green'in kendine ait bir yuvası vardır (2026-10-18).** O zamana kadar her iki
  Release-Green doğrulaması da `omni-build` üzerinde çalışıyordu: her push'ta (saatte yaklaşık
  10; bir günde 100 push çalışmasından 97'si çalışma sırasında iptal edildi) ve günde üç kez,
  yaklaşık 2 saatlik tam tarama olarak (05:29 taraması yuva için 6 saat bekledi) — tek derleme
  yuvasına kapasitesinin birkaç katı yük bindirildi ve aynı kaynaklı PR derlemeleri saatlerce
  bekledi. `release-green` ve `main-green` artık `OMNIROUTE_USE_TURBOPACK=0` ile
  `omni-release` hedefini (yalnızca `omniroute-113-6`) kullanır ve başlatılmış bir çalışma artık
  daha yeni bir push tarafından iptal edilmez (bekleyen yuva yine de yoğun akışı birleştirir).
  `tests/unit/build/runner-capacity-routing.test.ts`; yönlendirmeyi, webpack geçişini ve
  `omni-release` üzerindeki hiçbir şeyin Turbopack ile derlenmediğini sabitler.
- **Hafif havuz: `omni-light`.** `omniroute-113` ve `omniroute-113-2`, yalnızca arka uç için
  `next build` gerektiren gecelik işleri (~5–6 GB; webpack) ve `quality.yml` içindeki
  `lint-guard` işini çalıştırır. `omniroute-113`, 2026-10-18'e kadar `MemoryHigh=4G` ayarına
  sahipti — promptfoo derlemesi burada 54 dakika boyunca bellek geri kazanımıyla ilerlemeye
  çalıştı; 8 GB, kısıtlamayı ortadan kaldırır.
- **Bilerek daha az dinleyici kullanılır.** Dört OmniRoute birimi 2026-08-29 tarihinde devre
  dışı bırakıldı — her ek dinleyici, yukarıdaki bellek bütçesini paylaşan başka bir kiracıdır.
  Temizlik görevlisinin üst sınırı 8'dir (cron içindeki `MAX_ACTIVE_RUNNERS=8`): makinedeki her
  `Runner.Listener` sürecini sayar; OmniHeuris ve OmniMind, bizim beş sürecimize iki tane daha
  ekler.
- **Unit ve Vitest işleri barındırılan çalıştırıcılarda kalır.** `ci.yml`, unit parçalarını ve Vitest işini `[self-hosted, omni-ci]` hedefine yalnızca `vars.USE_VPS_TEST_RUNNER` depo değişkeni `true` olduğunda ve o zaman da yalnızca aynı depodan gelen `pull_request` çalıştırmaları için gönderir; fork'lar, `merge_group` ve push'lar `ubuntu-latest` üzerinde kalır (`tests/unit/vps-runner-variable-scope.test.ts`). Değişken `false` durumundadır. 2026-10-28 tarihinde 4 çekirdekli üç `omni-ci` dinleyicisi `npm ci` için 250–270 s harcadı ve her unit parçası 30 dakikalık iş sınırına takıldı; barındırılan bir parça ise ~634 s sürüyordu ve makinenin yükü 17–24 idi. Dinleyiciler silindi. Değişkeni, bir unit parçası için boyutlandırılmış dinleyiciler olmadan yeniden açmayın.
- **Herhangi bir çalıştırıcı meşgulken `/tmp` veya `_work` dizinini asla elle temizlemeyin.**
  Kontrol ile silme arasında boşluk bırakan bir kontrol-et-sonra-sil işlemi, 2026-08-27
  tarihinde çalışan bir Build işinin `_work` dizinini kaybetmesine neden oldu. Temizlik
  görevlisi kontrolü ve kaldırmayı tek adımda gerçekleştirir; işi ona bırakın.
- Bir çalıştırıcıyı işin ortasında durdurmak işi iptal eder (canlı olarak gözlemlendi):
  `systemctl stop` yalnızca dinleyicisinin bir `Runner.Worker` alt süreci yokken kullanılmalıdır
  — ve bunu tek komutla yapın.
- İş akışları artefaktları `/tmp` içine koymamalıdır (burası RAM'dir). İndirmeleri
  `$RUNNER_TEMP` dizinine (disk üzerinde, çalıştırıcı başına) yapın — 1,3 GB'lık `next-build`
  artefaktının tmpfs üzerine yazılması 27–32 dakika, diskten yüklenmesi ise 2 dakika sürdü.
- `.15` VPS yalnızca homologasyon içindir — üzerinde hiçbir zaman CI çalıştırıcısı çalışmaz.

## Barındırılan hat (GitHub tarafından barındırılan çalıştırıcılar)

Depo, **Team** planındaki `cheaper-inference` kuruluşuna aittir: **eşzamanlı 60 barındırılan iş**; bu kapasite kuruluştaki tüm depolar, tüm PR kontrolleri, her push ile tetiklenen iş akışı ve CodeQL'in varsayılan kurulumu tarafından paylaşılır. Aşağıdaki rakamlar **Pro** planında (eşzamanlı 40 barındırılan iş) ölçülmüştür.
2026-10-18 tarihinde, birleştirme kampanyası sırasında (`release/v3.8.52` üzerinde saatte
~10 birleştirme) ölçülen değerler: **24 saatte oluşturulan 2.500 iş akışı çalıştırması**,
6 saatte dala 44 push ve PR kontrolleri saatlerce beklerken **kuyruğa alınan 106 barındırılan
iş**; PR'ler bu kontroller olmadan birleştirildi. Dala yapılan her push'ta dokuz iş akışı
tetiklendi:

| `release/v*` dalına yapılan her push için   | barındırılan işler | yoğunluk sırasındaki sonuç                                               | 2026-10-18'den beri                                                                     |
| ------------------------------------------- | -----------------: | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `ci.yml` (tam matris)                       |        en fazla 30 | sonraki push tarafından iptal edildi; bir günde 24 çalıştırmanın 24'ü    | `release/**` push'larında başlatılmıyor (PR çalıştırması + Release-Green)               |
| `quality.yml`                               |                 ~6 | iptal edildi; 23 çalıştırmanın 23'ü                                      | `release/**` push'larında başlatılmıyor                                                 |
| `Release-Green` `--quick`                   |                  0 | `omni-build` üzerinde çalıştı; 100 çalıştırmanın 97'si iptal edildi      | `omni-release` yuvası, hiçbir zaman iptal edilmez, bekleyen çalıştırmalar birleştirilir |
| `Lock released branch`, `OpenSSF Scorecard` |                  2 | her push için kuyruğa alınan bir çalıştırma                              | ref başına bir çalıştırma (`tests/unit/build/hosted-lane-concurrency.test.ts`)          |
| `Release acceptance` (gölge rapor)          |                  1 | her push için barındırılan bir `npm ci`, hiçbir zaman iptal edilmedi     | değişmedi — `paths:` filtresi için aday                                                 |
| `Publish to Docker Hub` → `Deploy to VPS`   |                  2 | her push'ta iptal edildi; amd64 ayağı `omni-build` üzerinde rekabet eder | değişmedi — sahibin dağıtım kanalı                                                      |
| CodeQL varsayılan kurulumu (`dynamic`)      |                  4 | push başına `javascript-typescript`, `actions`, `c-cpp`, `python`        | değişmedi — Settings → Code security; `c-cpp`/`python` burada hiçbir şeyi taramıyor     |

`tests/unit/build/push-storm-diet.test.ts`, `ci.yml` ve `quality.yml` dosyalarının yalnızca
`main` için olan push tetikleyicisini sabitler. Yan etki: Codecov artık her sürüm push'ı için
temel yükleme almıyor (adım yalnızca bilgilendirme amaçlıdır ve `continue-on-error`
kullanır); depo içi kapsam geçidi ve PR yorumu bundan etkilenmez.

**Daha fazla şirket içinde barındırılan kapasite, barındırılan kuyruğu düzeltmez.** Devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) bir çalıştırıcı barındırabilir; ancak aracı oturumları
zaten yükünü 20–26 aralığında tutuyor, aracı kapsayıcısında Docker daemon'ı yok ve doygunluğa
ulaşan hat barındırılan hattır. Aynı anda `.113` kutusunda 71 GB boş alan vardı ve yükü
5–8 arasındaydı; buradaki kısıt CPU değil, yukarıda belirtilen dinleyici başına bellek
bütçesidir (en fazla 6 dinleyici). Kalan seçenekler süreçle ilgilidir: kampanya PR'lerini
Mergify kuyruğu üzerinden birleştirin (`label=queue`; toplu işler, PR başına bir çalıştırma
artı push başına bir çalıştırma yerine tek bir `merge_group` CI çalıştırmasını paylaşır),
CodeQL varsayılan kurulum dillerini azaltın ve `release-acceptance.yml` dosyasını okuduğu
dosyalara göre filtreleyin.
