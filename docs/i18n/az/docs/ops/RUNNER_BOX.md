# Self-Hosted Runner Box Operations (.113 pool) (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Öz-özünə host edilən hovuz **.113** serverində (`tomni-proxmox-113`) işləyir. 2026-10-18 tarixindən etibarən hər
OmniRoute runner-in **bir rolu**, bir etiketi və iş yükünün ölçülmüş göstəricilərinə uyğun yaddaş/CPU büdcəsi
var. Turbopack slotuna yığma üçün lazım olan resurslar verilir; digər slotların ölçüləri isə onların
ölçülmüş pik göstəricilərinə uyğun təyin edilib. Serverdə resursların izafi ayrılması yalnız Turbopack yığması Release-Green
webpack yığması və lint işi ilə eyni vaxta düşdükdə baş verir; host swap-ı (16 GB) bunu qarşılayır və pull request Build-ləri
host edilən runner-lərdə işlədiyi üçün Turbopack slotu vaxtın böyük hissəsində boş qalır:

| runner               | etiket         | rol                                                                                                                                                     | `MemoryHigh` / `MemoryMax` | `CPUQuota`          |
| -------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack yığmaları: `ci.yml` `Build` (yalnız push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact`, gecəlik a11y yığması | 56 GB / 60 GB (swap 0)     | 1600 %              |
| `omniroute-113-6`    | `omni-release` | Release-Green (`release-green` + `main-green`), webpack yığması                                                                                         | 20 GB / 24 GB (swap 4 GB)  | 800 %               |
| `omniroute-113-2`    | `omni-light`   | gecəlik işlər (Schemathesis, promptfoo, garak, k6) və `quality.yml` `lint-guard`                                                                        | 12 GB / 16 GB (swap 4 GB)  | 600 %               |
| `omniroute-113`      | `omni-light`   | yuxarıdakı ilə eyni hovuz                                                                                                                               | 8 GB / 12 GB               | 400 %               |
| OmniHeuris, OmniMind | (öz repoları)  | yalnız Dependabot (hər biri üçün pik 155 MB, 2026-10-18)                                                                                                | 4 GB / 6 GB                | hər biri üçün 200 % |

2026-10-18 tarixində ölçülüb:

| resurs     | dəyər                             | planlaşdırma üçün mənası                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU  | **78 GB / 32 nüvə**               | Turbopack production yığması məhdudiyyətsiz halda 49 GB pik göstəriciyə çatıb (`tests/unit/ci-build-bundler-webpack.test.ts`); Next 16.3.8-də təkcə compile mərhələsi ~40 GB tutur (`next-build` daxilində 36 GB RSS və 3 GB istifadə edən 17 loader worker-i, 2026-10-18 tarixində ölçülüb); webpack yığması isə ~14–16 GB istifadə edir. Bir Turbopack və bir webpack yığması eyni vaxtda sığır; iki Turbopack yığması isə sığmır |
| swap       | 16 GB                             | `omniroute-113-5` swap söndürülmüş halda (`MemorySwapMax=0`) işləyir, buna görə nəzarətdən çıxan yığma serveri swap etməyə məcbur etmək əvəzinə öz limitində dayandırılır                                                                                                                                                                                                                                                           |
| `/tmp`     | **12 GB tmpfs = RAM**             | burada saxlanılan hər şey yaddaş tutur; qalıqlar 3 saatdan sonra təmizlənir                                                                                                                                                                                                                                                                                                                                                         |
| CPU        | 32 nüvədə load 60 müşahidə edilib | kvotalardan əvvəl bir Turbopack yığması (~1166 % CPU) və eyni serverdəki coverage test dəsti digər listener-lərin heartbeat siqnallarını resurs çatışmazlığına məruz qoyurdu (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                  |
| runner-lər | **7 listener** (2026-10-28)       | 5 OmniRoute + OmniHeuris + OmniMind; `omniroute-113-7` həm də `omni-build` daşıyır; `omniroute-113-3/-4/-8` repodan silinib (2026-10-28)                                                                                                                                                                                                                                                                                            |

Limitlər hər unit-in `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` faylında yerləşir
(əvvəlki dəyərlər `override.conf.bak-20261018` kimi saxlanılıb) və
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` vasitəsilə canlı tətbiq edilib — restart edilməyib, buna görə də
işləyən heç bir job-a toxunulmayıb. Etiketlər də runner API-si vasitəsilə (`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) canlı dəyişdirilir.

## Təmizləyicini quraşdırın (bir dəfə, serverdə)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): hər 30 dəqiqədən bir, jurnalı /var/log/runner-janitor.log faylına yaz
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` tələb olunur: təmizləyici yolu silməzdən əvvəl açıq faylların bir anlıq görüntüsü ilə
onun boş olduğunu təsdiqləyir; bu alət olmadıqda heç nəyi silmir və bunu bildirir
(exit 1). İstənilən dəyişikliyi əvvəlcə `--dry-run` ilə sınayın — o, dəqiq olaraq nə
edəcəyini göstərir və heç nəyə toxunmur.

Hər işə salındıqda etdikləri: öz qalıqlarımızı (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) **tmpfs-də 3 saatdan**, diskdəki
`_work/_temp` daxilində isə 24 saatdan sonra təmizləyir; 75 dəqiqədən köhnə
`next-build` prosesini dayandırır (heç bir iş bu qədər uzun çəkmir — 2026-08-27
tarixində GitHub işi itmiş elan etdikdən sonra onlardan biri 70 dəqiqə işləmişdi);
unit-i **dayandırılmış** runner-ların 48 saatlıq checkout-larını təmizləyir; disk
istifadəsi ≥ 85 %, yaddaş PSI göstəricisi `full/avg60` ≥ 10 % olduqda və listener
sayı `MAX_ACTIVE_RUNNERS` dəyərini aşdıqda xəbərdarlıq edir (omniroute/digər bölgüsü
ilə). Exit 1 = müdaxilə tələb olunur; jurnalı oxuyun.

75 dəqiqə qaydası GitHub-ın artıq imtina etdiyi işi yerinə yetirən build-i aşkarlamır.
`Runner.Listener` öz işini yeniləyə bilmədikdə, `_diag/Runner_*.log` daxilində
`POST request to …/renewjob timed out after 100 seconds` göstərilir, API son uğurlu yenilənmədən
təxminən on dəqiqə sonra işi `completed` (uğursuz) kimi bildirir və `next-build` ona bağlı
heç bir iş olmadan işləməyə davam edir (2026-10-18: #17066 üçün Build prosesi saat 19:43-də
uğursuz oldu, lakin onun build-i beş dəqiqə sonra hələ də 40 GB yaddaş tuturdu). Ən yeni
`_diag/Worker_*.log` daxilində ref-i təsdiqləyin, sonra yalnız build ağacını PID əsasında
SIGTERM ilə dayandırın — `next-build`, `npm run build`, `build-next-isolated.mjs` və
`_work` worker-ları. `Runner.Listener`, `RunnerService.js` və ya `Runner.Worker` proseslərinə
heç vaxt toxunmayın: worker işi ləğv edilmiş kimi bildirir və listener özü yenidən onlayn olur.

## Runner unit-ləri: KillMode

Runner-ın standart `KillMode=process` parametri unit dayandırıldıqda və ya yenidən
başladıldıqda `Runner.Worker → npm → next-build` proseslərini işlək saxlayır — yetim build
ona bağlı heç bir iş olmadan RAM və CPU sərf etməyə davam edir. Hər OmniRoute unit-i
`KillMode=mixed` parametrli drop-in faylına
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
malikdir: əvvəlcə listener-ə SIGTERM, `TimeoutStop` zamanı isə bütün cgroup-a SIGKILL
göndərilir. Bu parametr unit növbəti dəfə yenidən başladıldıqda qüvvəyə minir — boşluq
yoxlamasını və yenidən başlatmanı eyni komandada icra edərək **eyni anda yalnız bir
runner-ı və yalnız boş olduqda** yenidən başladın.

## İstismar qaydaları

- **Eyni anda yalnız bir Turbopack yığması — etiket vasitəsilə məcburi tətbiq edilir.** Tam Turbopack
  `next build` əməliyyatını icra edən hər bir tapşırıq `[self-hosted, omni-build]` hədəfləyir və həmin
  etiketi yalnız **`omniroute-113-5`** daşıyır: `ci.yml` faylındakı `Build`, `npm-publish.yml` faylındakı `publish`, `nightly-v4-build`, `preview-artifact`,
  gecəlik a11y yığması (#16853) və `docker-publish.yml` faylındakı **amd64** (BuildKit daxilində webpack —
  Turbopack orada panikaya düşmüşdü, icra 33253576569). arm64 Docker qolu `ubuntu-24.04-arm` üzərində qalır.
  `docker-publish` amd64, `ci.yml` faylındakı `Build` ilə `heavy-build-main` paralellik qrupunu paylaşır
  (`cancel-in-progress: false`). Docker Engine `omniroute-113-5` üzərində olmalıdır. İkinci Turbopack
  yuvası 78 GB-a sığmır (2 × 33–37 GB və əlavə olaraq sistemin qalan hissəsi); ikinci yuva yalnız
  webpack yığmaları üçün təhlükəsizdir.
- **Pull request yığmaları host edilən icraçılarda işləyir (2026-10-18).** `ci.yml` faylındakı `Build`, `omni-build`-ə yalnız
  `push` və `workflow_dispatch` üçün çatır; hər bir `pull_request` (öz mənbəyindən və ya fork-dan) və `merge_group` yığması
  webpack ilə `ubuntu-latest` üzərində işləyir. Öz mənbəyindən olan hər PR yuvaya yönləndiriləndə Turbopack
  yığması onu 29–58 dəqiqə məşğul saxlayırdı, 18 yığma 18 saata qədər növbədə qalırdı və buraxılış xəttinin öz push yığması
  40 tapşırıqda yalnız bir dəfə yuvanı əldə etmişdi. Host edilən icraçıda eyni PR yığması PR-ın digər
  tapşırıqları ilə yanaşı 8–12 dəqiqə çəkir. `npm-publish` tərəfindən yayımlanan bundler olan Turbopack,
  standart budağın gecəlik a11y yığması (04:41 UTC), yuvaya çatan hər push və ya dispatch yığması,
  eləcə də `npm-publish` özü vasitəsilə buraxılış xəttində yoxlanılmağa davam edir. `tests/unit/build/heavy-build-queue.test.ts`
  dörd şərtli keçidi təsbit edir.
- **Turbopack yuvasını heç vaxt ölçülmüş tələbatından aşağı ölçüləndirməyin.** 2026-10-18 tarixində saat 18:06-da
  `omni-release` üçün yer açmaq məqsədilə yuva 56G/60G-dan 40G/44G-a endirildi. Kompilyasiya mərhələsi bütün
  icra müddəti boyunca `MemoryHigh` həddində qaldı (yaddaş PSI `full` 30–43 %) və cgroup-u paylaşan
  `Runner.Listener` tapşırığını yeniləyə bilmədi. Sahibin 2026-10-17 tarixindəki 56G/60G dəyəri həmin
  gün bərpa edildi. Bu dəyərdən aşağı olduqda yığma uğursuz olmur; sistem həddindən artıq səhifələmə ilə məşğul olur və tapşırıq itirilir.
- **Release-Green-in öz yuvası var (2026-10-18).** O vaxta qədər hər iki Release-Green yoxlaması
  `omni-build` üzərində işləyirdi: hər push zamanı (saatda təxminən 10, bir gündə 100 push icrasından 97-si işin ortasında ləğv edilmişdi)
  və gündə üç dəfə təxminən 2 saatlıq tam yoxlama (05:29 yoxlaması yuva üçün 6 saat gözləmişdi) — yeganə yığma
  yuvasına tutumundan bir neçə dəfə artıq yük düşmüşdü və öz mənbəyindən olan PR yığmaları saatlarla gözləyirdi.
  `release-green` və `main-green` indi `OMNIROUTE_USE_TURBOPACK=0` ilə `omni-release`-i
  (yalnız `omniroute-113-6`) hədəfləyir və başlamış icra artıq daha yeni push tərəfindən ləğv edilmir (gözləyən
  yuva yenə də axını birləşdirir). `tests/unit/build/runner-capacity-routing.test.ts`
  yönləndirməni, webpack keçidini və `omni-release` üzərində heç nəyin Turbopack ilə yığılmamasını təsbit edir.
- **Yüngül hovuz: `omni-light`.** `omniroute-113` və `omniroute-113-2`, yalnız backend üçün
  `next build` tələb edən gecəlik işləri (~5–6 GB; webpack) və `quality.yml` faylındakı `lint-guard` tapşırığını icra edir. `omniroute-113`
  2026-10-18 tarixinədək `MemoryHigh=4G` dəyərinə malik idi — promptfoo yığması orada 54 dəqiqə ərzində
  yaddaşı təkrar-təkrar geri almaqla irəliləmişdi; 8 GB məhdudlaşdırmanı aradan qaldırır.
- **Qəsdən daha az listener.** 2026-08-29 tarixində dörd OmniRoute vahidi deaktiv edildi — hər əlavə
  listener yuxarıdakı yaddaş büdcəsinin daha bir istifadəçisidir. Təmizləyicinin yuxarı həddi 8-dir (cron daxilində `MAX_ACTIVE_RUNNERS=8`): o,
  maşındakı hər `Runner.Listener` prosesini sayır və OmniHeuris + OmniMind bizim beş prosesimizə daha ikisini əlavə edir.
- **Unit və Vitest tapşırıqları host edilən runner-lərdə qalır.** `ci.yml` unit shard-larını və Vitest tapşırığını `[self-hosted, omni-ci]` üzərinə yalnız `vars.USE_VPS_TEST_RUNNER` repo dəyişəni `true` olduqda göndərir, o zaman da yalnız eyni repodan gələn `pull_request` icraları üçün; fork-lar, `merge_group` və push-lar `ubuntu-latest` üzərində qalır (`tests/unit/vps-runner-variable-scope.test.ts`). Dəyişən `false` vəziyyətindədir. 2026-10-28 tarixində üç 4 nüvəli `omni-ci` listener-i `npm ci` üçün 250–270 s sərf etdi və hər unit shard-ı 30 dəqiqəlik tapşırıq limitinə çatdı; host edilən shard üçün bu, ~634 s idi, server isə 17–24 yükündə idi. Listener-lər silindi. Unit shard-ı üçün ölçüləndirilmiş listener-lər olmadan dəyişəni yenidən aktivləşdirməyin.
- **Hər hansı runner məşğul olduğu müddətdə `/tmp` və ya `_work` qovluğunu heç vaxt əl ilə təmizləməyin.**
  Yoxlama ilə silmə arasında fasilə olan yoxla-sonra-sil əməliyyatı 2026-08-27 tarixində aktiv Build tapşırığının
  `_work` qovluğunu itirməsinə səbəb olmuşdu. Təmizləyici yoxlamanı və silməni bir addımda həyata keçirir;
  işi ona buraxın.
- Runner-i tapşırığın ortasında dayandırmaq tapşırığı ləğv edir (canlı müşahidə olunub): `systemctl stop` yalnız
  onun listener prosesinin `Runner.Worker` törəmə prosesi olmadıqda icra edilməlidir — və bunu bir komandada edin.
- İş axınları artefaktları `/tmp` daxilində saxlamamalıdır (bu, RAM-dır). Faylları
  `$RUNNER_TEMP` qovluğuna endirin (diskdədir və hər runner üçün ayrıdır) — 1.3 GB ölçülü `next-build` artefaktının tmpfs-ə endirilməsi 27–32
  dəqiqə, diskdən yüklənməsi isə 2 dəqiqə çəkmişdi.
- `.15` VPS yalnız homologasiya üçündür — onun üzərində heç vaxt CI runner-ləri işləmir.

## Host edilən zolaq (GitHub tərəfindən host edilən icraçılar)

Repo `cheaper-inference` təşkilatına məxsusdur və **Team** planındadır: **eyni vaxtda 60 host edilən tapşırıq**; bu limit təşkilatdakı hər bir repo, hər bir PR yoxlaması, push ilə işə düşən hər bir iş axını və CodeQL-in standart konfiqurasiyası arasında paylaşılır. Aşağıdakı rəqəmlər **Pro** planında (eyni vaxtda 40 host edilən tapşırıq) ölçülüb.
2026-10-18 tarixində birləşdirmə kampaniyası zamanı (`release/v3.8.52` üzərində saatda təxminən
10 birləşdirmə) aparılan ölçmələr: **24 saatda 2,500 iş axını icrası yaradıldı**, 6 saat ərzində
budağa 44 push edildi, PR yoxlamaları saatlarla gözlədiyi və PR-lər onlarsız birləşdirildiyi halda
**106 host edilən tapşırıq növbəyə düşdü**. Budağa edilən hər push zamanı doqquz iş axını işə düşürdü:

| `release/v*` üçün hər push                  | host edilən tapşırıqlar | yüklənmə zamanı nəticə                                              | 2026-10-18 tarixindən etibarən                                                   |
| ------------------------------------------- | ----------------------: | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ci.yml` (tam matris)                       |              30-a qədər | növbəti push tərəfindən ləğv edildi, bir gündə 24-dən 24-ü          | `release/**` push-larında başladılmır (PR icrası + Release-Green)                |
| `quality.yml`                               |                      ~6 | ləğv edildi, 23-dən 23-ü                                            | `release/**` push-larında başladılmır                                            |
| `Release-Green` `--quick`                   |                       0 | `omni-build` üzərində işlədi, 100-dən 97-si ləğv edildi             | `omni-release` yuvası, heç vaxt ləğv edilmir, gözləyən icralar birləşdirilir     |
| `Lock released branch`, `OpenSSF Scorecard` |                       2 | hər push üçün növbədə bir icra                                      | hər ref üçün bir icra (`tests/unit/build/hosted-lane-concurrency.test.ts`)       |
| `Release acceptance` (kölgə hesabatı)       |                       1 | hər push üçün host edilən bir `npm ci`, heç vaxt ləğv edilmir       | dəyişməyib — `paths:` filtri üçün namizəddir                                     |
| `Publish to Docker Hub` → `Deploy to VPS`   |                       2 | hər push üçün ləğv edilir; amd64 qolu `omni-build` üçün yarışır     | dəyişməyib — sahibin yerləşdirmə kanalı                                          |
| CodeQL standart konfiqurasiyası (`dynamic`) |                       4 | hər push üçün `javascript-typescript`, `actions`, `c-cpp`, `python` | dəyişməyib — Settings → Code security; `c-cpp`/`python` burada heç nə skan etmir |

`tests/unit/build/push-storm-diet.test.ts`, `ci.yml` və `quality.yml` fayllarının yalnız `main`
üçün olan push trigger-ini sabitləyir. Yan təsir: Codecov artıq hər release push-u üçün baza
yükləməsi almır (addım məlumat xarakterlidir və `continue-on-error` istifadə edir); repozitoriya
daxilindəki əhatə qapısı və PR şərhi bundan təsirlənmir.

**Daha çox self-hosted tutum host edilən növbəni düzəltmir.** Devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) bir icraçını host edə bilərdi, lakin agent sessiyaları
artıq onun yükünü 20–26 səviyyəsində saxlayır, agent konteynerində Docker demonu yoxdur və
doymuş zolaq host edilən zolaqdır. Eyni anda `.113` maşınında 71 GB boş yer və 5–8 yük var idi;
onun məhdudiyyəti CPU deyil, yuxarıda göstərilən hər listener üçün yaddaş büdcəsidir
(maksimum 6 listener). Qalan imkanlar proseslə bağlıdır: kampaniya PR-lərini Mergify növbəsi
vasitəsilə birləşdirin (`label=queue`; paketlər hər PR üçün bir icra və hər push üçün əlavə bir
icra əvəzinə bir `merge_group` CI icrasını paylaşır), CodeQL standart konfiqurasiyasındakı
dilləri azaldın və `release-acceptance.yml` faylını oxuduğu fayllara əsasən filtrləyin.
