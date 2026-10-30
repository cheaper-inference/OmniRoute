# Quality Gates Reference (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Bu sənəd OmniRoute-da bütün CI keyfiyyət qapıları üçün əsas istinaddır.
O, hər bir qapını, qapının nəyi yoxladığını, hansı CI tapşırığında işlədiyini, ratchet baza səviyyəsindən, yoxsa keçdi/qaldı siyasətindən istifadə etdiyini və yığmanı bloklayıb-bloklamadığını, yaxud yalnız tövsiyə xarakterli olub-olmadığını təsvir edir.

Qısa xülasə və icazə siyahısı siyasəti üçün `AGENTS.md` faylındakı "Keyfiyyət Qapıları və Ratchet-lər" bölməsinə baxın. Eyni sistemin kritik qiymətləndirilməsi, yetkinlik təsnifatı və alətdən asılı olmayan təkrarlama planı üçün
[Keyfiyyət Qapıları üzrə Təlimata](../ops/QUALITY_GATE_PLAYBOOK.md) baxın.

---

## Geytlərin inventarı və icra profilləri

### Namizədin qəbul edilməsi

CI və Quality Gates iş axınlarının hər biri sabit hökm yaradır: `Gate / CI` və
`Gate / Quality`. Onların versiyalaşdırılmış qəbul siyasəti hər bir yuxarı axın tapşırığını
məcburi və ya tövsiyə xarakterli kimi sadalayır. Tətbiq olunan məcburi tapşırıq uğurla
tamamlanmalıdır: mövcud olmayan, ləğv edilmiş, ötürülmüş, gözləyən və naməlum nəticələr
PASS statusunu təsdiqləyə bilməz. Etibarlı yalnız sənədlər və ya yalnız kataloq üzrə
təsnifat kod xəttini tətbiqedilməz edə bilər; qaralama PR qəbul olunan namizəd deyil.
`hotfix` etiketi sübut tələbini ləğv etmir.

Hər iki iş axını main/release budaqlarına yönəlmiş PR-ları, `main` budağına push-ları,
əl ilə işə salınmanı və merge-group hadisələrini əhatə edir. Push, dispatch və merge-group
tam seçimi işə salır. `release/**` budaqlarına push-lar onları işə salmır (2026-10-18):
hər dəyişiklik artıq öz PR-ında matrisi icra edib və birləşdirilmiş kombinasiyanın yoxlanması
Release-Green-in işidir (`docs/ops/RUNNER_BOX.md` → Hosted xətti). Fork-lar və merge
qrupları, əks halda self-hosted runner-ləri seçəcək tapşırıqlar üçün hosted runner-lərdən
istifadə edir; yayıma başlamazdan əvvəl kifayət qədər hosted tutumun olduğu təsdiqlənməlidir.

Hər JSON qəbzi checkout edilmiş SHA-nı, iş axını icrasını və cəhdi müəyyənləşdirir.
CLI checkout/hadisə SHA uyğunsuzluğunu rədd edir. İş axını testləri siyasət üzvlüyünü
hökm tapşırığının `needs` siyahısına bağlayır ki, yeni və ya silinmiş xətt səssizcə
yoxa çıxmasın. Təsdiqlər yalnız öz iş axınını əhatə edir; dərc edilməni, yerləşdirməni və ya mövcud tövsiyə xarakterli skanerin daxili mexanizmlərini əhatə etmir. Müvafiq yoxlamaların budaq qaydalarında məcburi edilməsi ayrıca inzibati dəyişiklikdir; onların tapşırıqlarının müəyyənləşdirilməsi öz-özlüyündə budağı qorumur.

`API Route Typecheck` hər iki ümumiləşdirilmiş qərardan və lokal tam müşahidəçinin statik profilindən kənarda olan müstəqil iş axını yoxlamasıdır. Dəqiq namizəd üçün onun nəticəsini ayrıca yoxlayın. `.github/workflows/api-route-typecheck.yml` `main` və ya `release/**` budaqlarına yönəlmiş PR-lərdə, bu budaq ailələrindən hər hansı birinə göndərişlərdə və əl ilə işə salındıqda icra olunur. Onun yol filtri yoxdur. PR-in baza budağının yenidən hədəflənməsi yeni yoxlama tələb edir; mətn/başlıq redaktələri yalnız müşahidə üçün nəzərdə tutulmuş `Admission not requested / API Route Typecheck` adından istifadə edir və qəbul yoxlamasını əvəz edə bilməz. İş axını birləşdirmə qrupu trigger-i elan etmir. Bu yoxlamanı tələb edən hər hansı birləşdirmə növbəsi tətbiqi əvvəlcə həmin hadisə üçün onun icrasını təmin etməlidir.

### UI icra tutumu

CI tam UI inventarını dörd `test-vitest` matris şardı kimi işə salır; hər birində ən çoxu
iki worker və mövcud 15 dəqiqəlik tapşırıq vaxt limiti var. Birinci şard həmçinin
MCP/autoCombo Vitest dəstini işə salır. Məcburi tapşırıq nəticəsi matrisin bütün qollarını
əhatə edir; bir şardın uğursuz olması və ya ləğv edilməsi namizəd qəbulunu təsdiqləyə bilməz.

Gecəlik müşahidəçi hər UI şardı üçün ayrıca dəqiq namizəd qəbzini, o cümlədən birinci qəbzdə
MCP icrasını saxlayır. Dörd qəbzin, jurnalların və uyğun icra identifikatorlarının hamısı
tələb olunur. Lokal `npm run test:vitest:ui` hələ də tam dəsti seçir; tək bir `--shard`
icrası yalnız qismən sübutdur.

### Unit coverage toplanması

On iki unit şardı mövcud test icrası zamanı V8 coverage məlumatlarını toplayır. Uğurlu
şard aralıq Istanbul hesabatı yaratmadan orijinal faylları sıxışdırmaq üçün
`scripts/ci/compact-v8-coverage.mjs` faylını işə salır. Son Coverage tapşırığı namizəd
SHA-sına, runtime-a, mənbə kökünə və məlumat heşlərinə qarşı on iki manifestin hamısını
yoxlayır, sonra c8 reporterlərini və mövcud coverage hədlərini işə salır. Girişlər c8-in
qlobal fayl adı sırasını saxlayır; funksiya/blok coverage məlumatlarının qarışığı üçün
şard üzrə əvvəlcədən birləşdirmə təhlükəlidir. Çatışmayan, yanlış formatlanmış və ya
uyğunsuz şardlar qəbulu uğursuz edir. Uğursuz test şardları xam diaqnostik coverage
məlumatlarını ayrıca saxlayır; həmin məlumatlar yekun birləşdirməyə daxil edilə bilməz.

### Unit icrasının gedişatı haqqında qəbzlər

Ortaq `test:unit:ci:shard` əmri `primary`, `dashboard` və `serial`
mərhələlərini `scripts/ci/unit-progress-reporter.mjs` vasitəsilə qeydə alır. Adi test hesabatı əlçatan olaraq
qalır. Yalnız metadatadan ibarət ayrıca qəbz hər bir faylın başlanmasını və tamamlanmasını qeydə alır,
30 saniyəlik ürək döyüntüsü isə hələ də aktiv olan faylları və onların keçən müddətini siyahıya alır. O,
yalnız icazə siyahısına daxil edilmiş icra metadatasını qeydə alır; test təsvirləri, çıxış məlumatları, xəta mətnləri və tam
mühit seriallaşdırılmır.

CI və Quality JSONL fayllarını `unit-progress-ci-<run>-<attempt>-<shard>` və
`unit-progress-quality-<run>-<attempt>-<shard>` kimi saxlayır. Tapşırığın vaxt limitini aşması sonrakı yükləmənin qarşısını ala bilər;
artıq göndərilmiş ürək döyüntüləri diaqnostik sübut olaraq qalır. Ürək döyüntülərinin olmaması həmçinin
icraçı prosesin bloklandığını və ya dayandırıldığını göstərə bilər. Bu qəbzlər mövcud test seçimini,
paralelliyi, son müddətləri və çıxış statusunu qoruyur; onlar namizədin qəbuluna dair qərar deyil.

### Qəbul nəticələrini birləşdirən modulda saxlanılan sübutlar

`scripts/quality/validate-release-acceptance.mjs` təqdim edilmiş planı və onun manifestlərini birləşdirir; planın tam buraxılış prosesini əhatə etdiyini təsdiqləmir. Plan `VERIFIED` olsa belə, hesabatları açıq şəkildə `releaseAcceptance: false` təyin edir. `release-acceptance.yml` iş axını hələ də real qurma, paketləmə, işə salma və ya irəli keçirmə qəbzləri deyil, kölgə sınaq məlumatlarından istifadə edir.

CLI saxlanılan sübutları yoxlamaq üçün `--evidence-root` tələb edir. Fayllar `<evidence-root>/<artifact_id>/<member>` yolu ilə tapılır və SHA-256 heşi hesablanır. Sübutu olmayan PASS qeydi, çatışmayan və ya dəyişmiş fayl, təhlükəli yol və ya simvolik keçid yoxlamanın təsdiqlənməsinə mane olur. Çatışmayan fayllar boş uğurlu jurnallara bərabər deyil. Mövcud SHA/run/attempt yoxlamaları müstəqil qalır: baytların uyğunluğu köhnəlmiş qəbzi etibarlı etmir. Fayl bütövlüyü icranın həqiqiliyinin və ya artefaktın irəli keçirilməsinin sübutu deyil.

### Statik skan inventarı

Versiyalaşdırılmış npm-alias inventarı və statik skan üzvlüyü
`config/quality/gate-manifest.json` faylında yerləşir. Skript adlarını və dəqiq əmrləri
`package.json` ilə tutuşduraraq yoxlamaq üçün `npm run check:gate-manifest` əmrini işə salın;
əlavələr, silinmələr və əmr yayınmaları həm lokal hook-u, həm də CI-dakı dəyişiklik
təsnifatı tapşırıqlarını uğursuz edir. Alias iş axını tapşırığı, matris instansiyası və ya
test nümunəsi deyil: bu saylar bir-birini əvəz edən göstəricilər kimi təqdim edilməməlidir.

Seçilmiş alias-ları icra etmədən yoxlamaq üçün `npm run quality:scan -- --list` və ya
`npm run quality:scan:fast -- --list` istifadə edin. Runner npm entrypoint-ini çağırır,
buna görə onun runtime-ı (konfiqurasiya edildiyi hallarda Bun daxil olmaqla) qorunur.
Manifest bu profillərdən kənardakı alias-ları ayrıca çağırılan kimi qeydə alır və yalnız
oxuma üçün nəzərdə tutulmuş skan profillərində texniki xidmət əmrləri qadağandır.

Bu profillər yalnız statik skanı əhatə edir. Onlar məhsul testlərini, coverage-i,
paketləşdirməni, xarici yoxlamaları və ya namizədin tam buraxılış qəbulunu təsdiqləmir.
İş axınına qəbul əlaqələndirilmiş `config/quality/admission-policy.json` və
`scripts/quality/admission-verdict.mjs` fayllarından istifadə edir. Release-observer
profilləri ayrıca qalır; onların tətbiq olunan yoxlamalarını və qəbzlərini müstəqil şəkildə
araşdırın. Tam müşahidəçinin statik əmrləri `config/quality/release-green-static-profile.json`
faylında bəyan edilib; buraya `audit:deps`, mutation-test seçimi və tərcümə yoxlamaları
daxildir. Loader npm əmrlərini package.json və modelləşdirilmiş CI/Quality bəyanları ilə
tutuşduraraq yoxlayır; shell tokenlərini arqument kimi icra etmək əvəzinə yayınmaları rədd
edir. Məcburi skanerin SKIP/INCOMPLETE çıxışı PASS statusunu təsdiqləyə bilməz. Profil öz
xarici istisnalarını qeydə alır və hosted coverage, test matrisləri, paket və ya yerləşdirmə
sübutunu əvəz etmir. Aşağıdakı mətn inventarı istinad üçündür, geytin həqiqətən işə
salındığına dair sübut deyil.

Skriptlər `scripts/check/` (siyasət geytləri) və `scripts/quality/` (ratchet mühərriki)
altında yerləşir. CI üçün əsas həqiqət mənbəyi `.github/workflows/ci.yml` faylıdır.

### Dərc edilmiş baza sənədlərinin sağlamlığı

`.github/workflows/i18n-base-health.yml` seçilmiş dəyişikliklər `main` və `release/v*` budaqlarına göndərildikdən sonra, həmçinin əl ilə işə salındıqda sənədlərin sağlamlığını müşahidə edir. Onun filtrləri sənədləri, kök Markdown fayllarını, `llm.txt` faylını, tərcümə vəziyyətini/konfiqurasiyasını və müvafiq i18n alətlərini əhatə edir. Yeganə `Published base documentation health` tapşırığı xidmət tərəfindən təmin edilən Ubuntu mühitindən istifadə edir və beş dəqiqəlik vaxt məhdudiyyətinə malikdir. O, yalnız oxuma rejimində doğrulama aparır və asılılıqları quraşdırmadan, tərcümə etmədən və ya vəziyyəti qəbul etmədən diaqnostik qəbz yazır.

`scripts/i18n/check-base-health.mjs` mənbə heşi, çatışmayan hədəf, hədəf heşi, köhnəlmiş tərcümə və bölmə keşi uyğunsuzluqlarının olmamasını tələb edir. O, həmçinin cari əsas sənəd/lokal əhatə dairəsini və onun qeydə alınmış mənşəyini doğrulayır. Etibarsız kontekst, natamam əhatə və ya yoxlayıcının işinin yarımçıq kəsilməsi `INCOMPLETE` nəticəsini yaradır; təsdiqlənmiş yayınma isə `FAIL` nəticəsini yaradır. Hər ikisi uğursuz çıxış statusu qaytarır. Qəbz checkout SHA-sına, iş axınına, icraya və cəhdə bağlanır və `i18n-base-health-<sha>-<run>-<attempt>` adı ilə saxlanılır.

Bu, dərc edilmiş bazanın müstəqil müşahidəsidir. O, PR və ya merge-group hadisəsi, məcburi PR yoxlaması, npm aliası və ya statik skan profilinin üzvünü əlavə etmir. Mövcud diferensial PR siyasəti və əsas yoxlayıcının tövsiyə xarakterli təsnifatları ayrı qalır. Uğurlu yükləmə uğursuz sağlamlıq nəticəsini PASS nəticəsinə çevirə bilməz.

### Release PR sürətli yolu (`quality.yml`)

`.github/workflows/quality.yml` main/release PR-larında, `main` budağına push-larda,
dispatch və merge qruplarında CI-ı tamamlayır. PR-lar yol üzrə filtrlənmiş sürətli
yoxlamalardan istifadə edir. Daimi olaraq deaktiv edilmiş dublikat build silinib;
həqiqi build/package/boot yoxlamaları CI-da qalır.

| Tapşırıq                                         | Əhatə dairəsi                                                                                                                                                                                                                                | Bloklayıcı                  |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `Docs Gates (fast-path)`                         | Sənədlər/kod PR-ləri; API sənədlərinə istinadlar və bütün sənədlər                                                                                                                                                                           | Bəli                        |
| `Fast Quality Gates`                             | Kod PR-ləri; statik yoxlamalar, tip yoxlaması, idarəetmə panelinin tip yoxlaması, təsirə məruz qalan modul testləri                                                                                                                          | Bəli                        |
| `Forgotten sibling tests`                        | Kod PR-ləri; dəyişdirilmiş modullardan statik istehlakçılara və namizəd qonşu testlərə qədər izləmə; barrel və dinamik idxal yolları, istinad edilən icazə siyahısı istisnaları ilə birlikdə məsləhət xarakterli diaqnostika kimi bildirilir | **Məsləhət xarakterli**     |
| `Vitest (fast-path)`                             | Kod PR-ləri; sürətli vitest test dəsti                                                                                                                                                                                                       | Bəli                        |
| `Unit Tests fast-path`                           | Kod PR-ləri; 4 hissəli modul testləri dəsti                                                                                                                                                                                                  | Bəli                        |
| `No new ESLint warnings`                         | Kod PR-ləri; susdurmaları nəzərə alan lint qoruyucusu                                                                                                                                                                                        | Bəli, forklar daxil olmaqla |
| `Merge integrity (changelog + generated skills)` | Qaralama olmayan PR-lər; dəyişiklik jurnalının və yaradılmış bacarıqların sinxronlaşdırılması                                                                                                                                                | Bəli, forklar daxil olmaqla |

#### Unudulmuş qonşu testlər hesabatı

`npm run check:forgotten-sibling-tests` testlərin təsir xəritəsinin əsasındakı idxal həlledicisindən yenidən istifadə edir.
Dəyişdirilmiş hər bir istehsal modulu üçün namizəd test pull request fərqində olmadıqda deterministik
`changed module/symbol -> static consumer -> candidate sibling test` zəncirlərini bildirir. Markdown xülasəsi və JSON nəticəsi
hər hansı bloklayıcı tətbiqdən əvvəl kalibrləmə üçün `forgotten-sibling-tests` iş axını artefaktı kimi saxlanılır.

Barrel təkrar ixracları və dinamik idxallar yalnız həll diaqnostikasıdır; onlar heç vaxt
bloklayıcı nəticə yaratmır. Nəzərdən keçirilmiş istisnalar
`config/quality/forgotten-sibling-allowlist.json` faylında yerləşir. Hər qeyd istehlakçını və namizəd
testi göstərməli, konkret əsaslandırma təqdim etməli və GitHub məsələsinə və ya pull request-ə keçid verməlidir. Səhv formatlanmış qeydlər
qapalı rejimdə xəta ilə nəticələnir. İstisnalar silinmiş namizəd testi və ya `.skip`/`.todo` əlavə edən fərqi susdura bilməz;
təsdiqləmələrin zəiflədilməsi və digər maskalama halları müstəqil şəkildə bloklayıcı olan
`check:test-masking` qapısının nəzarətində qalır.

### Tapşırıq: `lint`

`main` budağına yönəlmiş hər PR-də işə salınır. Uğursuz olarsa, birləşdirməni bloklayır.

| Skript (`npm run ...`)            | Yoxlayır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bloklayıcı                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:node-runtime`              | Node.js versiyasının dəstəklənən diapazonda olmasını                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                               |
| `check:test-tla-order`            | `tests/unit` altındakı heç bir `node:test` faylının test qeydə alıb, yuxarı səviyyəli `await` ifadəsinə çatdıqdan sonra əlavə testlər qeydə almamasını (#18045; ratchet: `test-tla-order-allowlist.json` yalnız kiçilə bilər)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bəli                                               |
| `check:cycles`                    | Bütün `src/` + `open-sse/` üzrə dövri importları (AST əsaslı, tsconfig `paths` həll edilir). Hər hansı dövr mövcud olduqda adi yoxlama 1 çıxış kodu ilə tamamlanır (#15281-dən etibarən qapalı-uğursuzluq rejimi) və SCC-ləri sadalayır. `check:cycles:ratchet` (CI-nin işlətdiyi yoxlama) say `quality-baseline.json` faylındakı `metrics.cycles` yuxarı həddini keçdikdə bloklayır — hazırda 14, `direction: down`, buna görə yalnız azala bilər (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Bəli (ratchet)                                     |
| `check:boundary`                  | `open-sse → src` əlaqəliliyi: mühərrikdən tətbiqə unikal fayldan-fayla importlar (`scripts/quality/measure-boundary.mjs`; kənarların siyahısı v4 nüvə/modul-bölünməsi düzəlişlərinin görüləcək işlər siyahısıdır). Adi yoxlama = məsləhət xarakterli hesabat (`quality:boundary` ilə eynidir). `check:boundary:ratchet` (CI-nin işlətdiyi, həmçinin `quality.yml` sürətli keçidlərinin ratchet dövrəsində olan yoxlama) say `quality-baseline.json` faylındakı `metrics.boundaryOpenSseToSrc` yuxarı həddini keçdikdə bloklayır — ölçülmüş 771 dəyəri ilə başladılıb, `direction: down`; `--update` onu yalnız azaldır; PR-lərdə bazaya nisbidir (`--base-ref`, aşağıya baxın)                                                                                                                                                                                                                                                                                                                                                                                    | Bəli (ratchet)                                     |
| `check:route-validation:t06`      | Bütün marşrutlarda Zod sxemləri mövcuddur (Tier 6 siyasəti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Bəli                                               |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayı büdcəni aşmır (Tier 11 turniketi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Bəli                                               |
| `check:provider-consistency`      | `providers.ts` faylındakı hər bir provayderin `providerRegistry.ts` faylında uyğun qeydi var (və əksinə, icazə siyahısı daxilində)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                               |
| `check:model-lifecycle`           | Əl ilə saxlanılan üç marşrutlaşdırma cədvəli repozitoriyaya daxil edilmiş həyat dövrü ani görüntüsü (#11503) ilə uyğun qalır: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` tərəfindən marşrutlaşdırıla bilən, istifadədən çıxarılmış heç bir id-ni qiymətləndirmir; hər bir `BUILT_IN_ALIASES` hədəfi `REGISTRY`-də mövcuddur və istifadədən çıxarılmış id-lərin ani görüntüsündə yoxdur; `REGISTRY`-də hələ də olan hər bir istifadədən çıxarılmış id yönləndirilir və ya `allowedRetiredInCatalog` siyahısında göstərilir; həmçinin heç bir `DEFAULT_DEGRADATION_MAP` mənbəyi və ya hədəfi həmin ani görüntüdə istifadədən çıxarılmış kimi görünmür. Bu, modelin hazırda aktiv yuxarı axın xidməti tərəfindən təqdim edildiyini sübut etmir. Oflayn — əl ilə və `npm run quality:refresh-model-lifecycle` vasitəsilə yenilənən `config/quality/model-lifecycle.json` ilə müqayisə edir (şəbəkə tələb olunur; CI-a qoşulmayıb). `allowedRetiredInCatalog` tədricən azaldılan məhdudlaşdırıcı mexanizmdir: qeydi yalnız izləmə məsələsi ilə birlikdə əlavə edin. | Bəli                                               |
| `check:fetch-targets`             | Müştəri tərəfindəki `src/` daxilində hər bir `fetch("/api/...")` real `route.ts` faylına uyğun gəlir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                               |
| `check:deps`                      | Repozitoriyadakı hər bir `package.json` üzrə `npm install` ilə quraşdırıla bilən bütün asılılıqlar `dependency-allowlist.json` faylındadır; yeni sabitlənməmiş və ya oxşar adla saxtalaşdırılmış paketlər işarələnir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                               |
| `audit:deps`                      | Bütün beş müstəqil lockfile üçün npm auditi (kök, Electron, OpenCode plaginləri v1/v2 və provayder). Kritik xəbərdarlıqlar bloklayır; yüksək səviyyəli xəbərdarlıqlar görünən xəbərdarlıq kimi qalır. Çatışmayan/uğursuz auditlər INCOMPLETE hesab olunur və bloklayır; əhatə dairəsi üzrə lock heşləri və hesabatlar saxlanılır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bəli                                               |
| `check:lockfile`                  | `package-lock.json` bütövlüyü — https reyestri, bütövlük heşləri, host əvəzləmələri yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Bəli                                               |
| `check:licenses`                  | İstehsal asılılıqları üçün SPDX lisenziya icazə siyahısı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bəli                                               |
| `check:tracked-artifacts`         | Build artefaktları / commit edilmiş `node_modules` simvolik keçidləri yoxdur (həmçinin husky pre-commit zamanı işə salınır; pre-push qəsdən yüngül saxlanılıb — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Bəli                                               |
| `check:ai-attribution`            | PR commit-lərində, başlığında və ya mətnində AI/bot `Co-Authored-By` treyleri və ya AI tərəfindən yaradılma altbilgisi yoxdur — Sərt Qayda #16 (`quality.yml` daxilində PR→`release/**` üçün fast-gates dövründə — hadisə faydalı yükünü oxuyur, PR xaricində heç bir əməliyyat etmir — və `ci.yml` lint daxilində PR→`main` üçün yalnız PR-a aid addımda; həmçinin husky `commit-msg` hook-u; insan həmmüəlliflərə icazə verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Hər bir Vitest istisnası izləmə məsələsini göstərir və `config/quality/vitest-exclusions.json` daxilində yer alır (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Bəli                                               |
| `check:file-size`                 | Mənbə faylları (`src/`, `open-sse/`, `electron/`, `bin/` daxilindəki `.ts`/`.tsx`) `cap`, test faylları (`*.test.ts(x)`) isə `testCap` həddini aşmır; `file-size-baseline.json` daxilində dondurulmuş fayllar (`frozen` / `testFrozen`) qeydə alınmış ölçülərindən artıq böyüməməlidir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Bəli                                               |
| `check:error-helper`              | İcraçılardakı/emalçılardakı xəta cavabları `buildErrorBody()` / `sanitizeErrorMessage()` istifadə edir (Sərt Qayda #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                               |
| `check:migration-numbering`       | Miqrasiya SQL faylları ardıcıl nömrələnib, boşluq və ya təkrar yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Bəli                                               |
| `check:public-creds`              | `publicCreds.ts` xaricində literal OAuth `client_id`/`client_secret` və ya Firebase Web açarları yoxdur (Sərt Qayda #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bəli                                               |
| `check:db-rules`                  | `src/lib/db/` modullarından kənarda xam SQL yoxdur; `localDb.ts` faylından barrel-importlar yoxdur (Sərt Qaydalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bəli                                               |
| `check:known-symbols`             | Dispetçer cədvəllərində qeydiyyatdan keçirilmiş provayder icraçıları, marşrutlaşdırma strategiyaları və tərcüməçilər diskdəki fayllarla uyğun gəlir — sahibsiz və ya elan edilməmiş simvollar yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                               |
| `check:route-guard-membership`    | Alt proses yaradan hər bir marşrut `isLocalOnlyPath()` tərəfindən təsnif edilir (Sərt Qaydalar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                               |
| `check:test-discovery`            | Repodakı hər bir `*.test.ts` / `*.spec.ts` faylı ən azı bir test icraçısı tərəfindən toplanır (ratchet: `test-discovery-baseline.json` faylındakı yetim siyahı yalnız kiçilə bilər)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bəli                                               |
| `check:agent-skills-sync`         | Yaradılmış agent bacarıqları artefaktları öz mənbə kataloquna uyğundur (kənarlaşma yoxdur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | Provayder loqoları/aktivləri qeydə alınmış mənşə qeydinə malikdir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON konfiqurasiya faylları təhlil olunur və repo lint qaydalarına uyğundur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript kompilyasiyası xətasızdır (yalnız tövsiyə xarakterli xəbərdarlıqlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bəli                                               |
| `typecheck:noimplicit:core`       | Sərt `noImplicitAny` — gələcəyə yönəlikdir; əvvəlcədən mövcud olan bir çox çağırış nöqtəsi hələ də annotasiyalara ehtiyac duyur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Tövsiyə xarakterli** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` ilə məhdudlaşdırılmış `tsc` (#7033) — `typecheck:core` üçün diqqətlə seçilmiş 27 fayllıq icazə siyahısına heç bir idarə paneli TSX faylı daxil deyil və `next build` də onu heç vaxt tip yoxlamasından keçirmir (`next.config.mjs` daxilində `ignoreBuildErrors: true` təyin edilir), buna görə də oradakı sahibsiz identifikator reqressiyaları (#6625/#6909) CI üçün görünməz idi. Dondurulmuş hər fayl/hər TS kodu üzrə say bazası ilə (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ilə eyni köhnəlmə nəzarəti modeli) fərqlər müqayisə edilir — yalnız baza sayından artıq olan YENİ xətalar yoxlamanın uğursuz olmasına səbəb olur; əvvəlcədən mövcud xəta düzəldildikdə `--update` ilə bazanı azaldın.                                                                                                                                                                                                                                                                                               | Bəli                                               |

### Tapşırıq: `quality-gate`

`test-coverage` tamamlandıqdan sonra icra olunur. Uğursuzluq halında birləşdirməni bloklayır.

| Skript                       | Yoxlayır                                                                                                                                                                                                              | Bloklayıcı             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | `quality-metrics.json` yaradır (ESLint xəbərdarlıqlarının sayı, birləşdirilmiş hissə hesabatından əhatə göstəricisi)                                                                                                  | Bəli (ratçetdən əvvəl) |
| `quality:ratchet`            | `quality-baseline.json` daxilindəki hər bir göstəricinin geriləmədiyini yoxlayır (ESLint xəbərdarlıqları ≤ baza; əhatə ≥ baza)                                                                                        | Bəli                   |
| `check:duplication`          | Kod təkrarlanmasının (jscpd@4) `quality-baseline.json` daxilindəki bazanı aşmadığını yoxlayır                                                                                                                         | Bəli                   |
| `check:complexity`           | Fayl səviyyəsindəki siklomatik mürəkkəbliyin həddi aşmadığını yoxlayır (əsas ESLint `complexity` + `max-lines-per-function`)                                                                                          | Bəli                   |
| `check:cognitive-complexity` | Koqnitiv mürəkkəblik ratçeti (`eslint-plugin-sonarjs`) — ayrıca ESLint keçidi; CI hər ikisini vahid `check:complexity-ratchets` addımı kimi birləşdirərək icra edir                                                   | Bəli                   |
| `check:dead-code`            | İstifadə olunmayan ixraclar/fayllar üçün ratçetin (knip) baza ilə müqayisədə geriləmədiyini yoxlayır                                                                                                                  | Bəli                   |
| `check:compression-budget`   | Sıxılma etalon testi büdcəsi — hər mühərrik üzrə token qənaəti üçün minimum hədlər geriləməməlidir                                                                                                                    | Bəli                   |
| `check:type-coverage`        | Tipləndirilmiş faiz ratçetinin (`type-coverage`) geriləmədiyini yoxlayır; əsasən `typecheck:noimplicit:core` yoxlamasını əhatə edir                                                                                   | Bəli                   |
| `check:codeql-ratchet`       | Açıq CodeQL xəbərdarlıqlarının sayının geriləmədiyini yoxlayır (`gh api` vasitəsilə oxuyur; token olmadıqda problemsiz ötürür) — yeniləmə tezliyi və əl ilə işə salma üçün aşağıdakı "CodeQL ratchet" bölməsinə baxın | Bəli                   |

### Tapşırıq: `quality-extended`

Bu tapşırıq uyğun namizədləri bloklayır. Paket ölçüsü, məxfi məlumat tapıntıları, zəiflik
tapıntıları, iş axını tapıntıları və OpenAPI dəyişiklikləri məcburi ratçetlərlə yoxlanılır.
Dairəvi asılılıq diaqnostikaları tövsiyə xarakterli olaraq qalır. Skaner quraşdırılması məcburidir:
`scripts/ci/install-quality-scanners.sh` sabitlənmiş versiyaları təmin edir və quraşdırma
uğursuzluqlarını ötürür. Çatışmayan alətlər, etibarsız hesabatlar və ya çatışmayan bazalar
məcburi skaner yoxlamasını TAMAMLANMAMIŞ vəziyyətdə saxlayır.

| Skript                   | Yoxlayır                                                                                                                                                                                                                                         | Bloklama                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `check:circular-deps`    | Dövri asılılıqların olmaması (dpdm)                                                                                                                                                                                                              | **Məsləhət xarakterli**                               |
| `check:bundle-size`      | Paket ölçüsünün həddi aşmaması; ölçmənin əlçatan olmaması yoxlamanın uğursuz olması ilə nəticələnir                                                                                                                                              | **--ratchet ilə bloklayıcı**                          |
| `check:secrets`          | Gitleaks aşkarlamalarında geriləmənin olmaması; məcburi skanlar çatışmayan alətləri/mənbəni/baza səviyyəsini, uğursuz skanları və etibarsız hesabatları rədd edir                                                                                | **--ratchet ilə bloklayıcı**                          |
| `check:vuln-ratchet`     | Asılılıqlardakı zəifliklərdə geriləmənin olmaması; məcburi skanlar çatışmayan alətləri, etibarsız hesabatları və ya çatışmayan baza səviyyələrini rədd edir                                                                                      | **--ratchet ilə bloklayıcı**                          |
| `check:workflows`        | İş axınının lint yoxlaması (actionlint + zizmor); çatışmayan/xarab skanerlər, etibarsız hesabatlar və ya çatışmayan ratchet baza səviyyəsi INCOMPLETE kimi uğursuz olur. Etibarlı aşkarlamalar seçilmiş sərt/məsləhət/ratchet siyasətinə tabedir | İcra tələb olunur; zizmor ratchet CI-də bloklayıcıdır |
| `check:openapi-breaking` | Sabitlənmiş hadisə commit-lərinə qarşı ictimai API müqaviləsi (PR merge-base, push before, merge-group base; planlaşdırılmış/əl ilə checkout üçün əvvəlcə birinci valideyn); məcburi ölçmə qapalı şəkildə uğursuz olur                           | **--ratchet ilə bloklayıcı**                          |

### Tapşırıq: `docs-sync-strict`

`main` və ya `release/**` üçün pull request-lərdə bu iş yalnız sənədləşdirmə və ya kod dəyişikliyi kimi təsnif edilmiş, qaralama olmayan (və ya etibarlı növbədəki) namizədlər üçün işləyir. PR olmayan CI hadisələrində də işləyir; bu workflow-un push trigger-i yalnız `main`-i əhatə edir, `release/**`-i yox. Sıfırdan fərqli çıxış kodu ilə bitən addım işi bloklayır; aşağıda göstərilən yalnız hesabat xarakterli tapıntılar və sənədləşdirilmiş istisnalar isə bloklamır.

| Skript                         | Yoxlayır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bloklama                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Aşağıdakı 7 alt keçidi ardıcıl icra edən meta-keçid                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bəli                                                                                                                                               |
| ↳ `check:docs-sync`            | Paket/OpenAPI/CHANGELOG versiyalarının uyğunluğu, dəqiq `llm.txt` güzgüləri, tərcümə edilmiş CHANGELOG bölmə/ölçü invariantları və əvəzlənmiş təkrar sənədlərin olmaması                                                                                                                                                                                                                                                                                                                    | Bəli                                                                                                                                               |
| ↳ `check:docs-frontmatter`     | Kompilyasiya edilmiş sənədləşdirmə səhifələrinin etibarlı frontmatter başlıqlarına malik olması                                                                                                                                                                                                                                                                                                                                                                                             | Bəli                                                                                                                                               |
| ↳ `check:docs-counts`          | Yüksək etibarlı say invariantları sərtdir; fayl sayının evristik yoxlamaları skriptə `--strict` verilmədikcə yalnız xəbərdarlıq edir (CI meta-keçidi bu bayrağı ötürmür)                                                                                                                                                                                                                                                                                                                    | Sərt səviyyə bloklayır; yumşaq səviyyə məsləhət xarakterlidir                                                                                      |
| ↳ `check:env-doc-sync`         | Mənbə kodundakı mühit dəyişəni oxunuşları, `.env.example` və `docs/reference/ENVIRONMENT.md` açıq ignore, doc-only və env-only icazə siyahıları tətbiq edildikdən sonra uyğun gəlir                                                                                                                                                                                                                                                                                                         | Bəli, sənədləşdirilmiş icazə siyahılarından kənarda                                                                                                |
| ↳ `check:deprecated-versions`  | Nəzərə alınmayan sənədləri istisna etməklə, təhlükəsiz tarixi kontekstlərdən kənardakı mümkün köhnə versiyaları və köhnəlmiş yenilənmə tarixlərini bildirir                                                                                                                                                                                                                                                                                                                                 | Cari CI qoşulmasında məsləhət xarakterlidir (`--strict` ötürülmür)                                                                                 |
| ↳ `check:doc-links`            | Sənədlərdəki daxili markdown keçidlərinin real fayllara yönəlməsi (`[text]`/`(path)` forması)                                                                                                                                                                                                                                                                                                                                                                                               | Bəli                                                                                                                                               |
| ↳ `check:fabricated-docs`      | Sənədlərdə qeyd edilən marşrutların, mühit dəyişənlərinin, CLI əmrlərinin, hook adlarının və fayl yollarının kod bazasında mövcud olması. `--strict` vasitəsilə sərt keçid; bayraqsız yumşaq uğursuzluq.                                                                                                                                                                                                                                                                                    | Bəli (CI-də `--strict` vasitəsilə)                                                                                                                 |
| `check:cli-i18n`               | İstifadə edilən CLI `t()` açarları `en`-də mövcuddur; `pt-BR` bütün üst səviyyə bölmələrini saxlayır; `zh-CN` və `zh-TW` `en`-dəki bütün açarları ehtiva edir                                                                                                                                                                                                                                                                                                                               | Bəli                                                                                                                                               |
| `check:openapi-coverage`       | OpenAPI spesifikasiyasının real marşrutların ən azı ratchet ilə müəyyən edilmiş minimum həddini əhatə etməsi                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                                                                                                                               |
| `check:openapi-security-tiers` | Elan edilmiş `x-loopback-only`/`x-always-protected` annotasiyaları `routeGuard.ts` ilə əsaslandırılmalıdır; parser və irəli yoxlamadakı uyğunsuzluqlar bloklayır. Yalnız lokal prefikslər altında çatışmayan `x-loopback-only` üçün əks yoxlama xəbərdarlıq edir; yalnız pattern ilə müəyyən edilən marşrutlar bu əks yoxlamaya daxil edilmir.                                                                                                                                              | Parser/irəli yoxlamalar bloklayır; əks yoxlama məsləhət xarakterlidir                                                                              |
| `check:openapi-routes`         | `openapi.yaml` daxilindəki hər `/api...` yolu əsaslandırılmış `KNOWN_STALE_SPEC` icazə siyahısından sonra parametr adlarından asılı olmayaraq real marşruta uyğun gəlir; köhnəlmiş icazə siyahısı qeydləri də uğursuzluğa səbəb olur                                                                                                                                                                                                                                                        | Bəli                                                                                                                                               |
| `check:docs-symbols`           | Əsas, güzgü olmayan sənədlərdəki daxili `/api/...` URL istinadları real marşruta və ya marşrut ailəsinə uyğun gəlir; proxy/upstream/placeholder/fayl istinadları və əsaslandırılmış `KNOWN_STALE_DOC_REFS` qeydləri istisna edilir, köhnəlmiş icazə siyahısı qeydləri isə uğursuzluğa səbəb olur                                                                                                                                                                                            | Bəli                                                                                                                                               |
| `i18n translation drift`       | Əsas sənədlərin mənbə/hədəf heşlərini və tərcümənin mənşəyini yoxlayır. PR müqayisəsi yalnız eynilə miras qalmış xətalara icazə verir; mənbə, çatışmayan hədəf, hədəf heşi, köhnəlmiş tərcümə və ya bölmə keşi ilə bağlı yeni və ya təsdiqlənməmiş uyğunsuzluqlar bloklayır. PR müqayisəsindən kənarda mənbə/çatışmayan hədəf/hədəf heşi xətaları bloklayır, köhnəlmiş tərcümələr və uyğunsuz bölmə keşləri isə yalnız xəbərdarlıq verir. Köhnə formatlı bölmə keşinin olmaması xəta deyil. | PR-də yeni/təsdiqlənməmiş yayınma bloklayır; eynilə miras qalmış yayınma yalnız xəbərdarlıq verir; PR-dən kənar qaydalar xətanın növündən asılıdır |

### Tapşırıq: `i18n-ui-coverage`

| Skript                                 | Yoxlayır                                                                                                                                                                                                    | Bloklayıcı     |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (sətirdaxili) | UI i18n açarlarının əhatə səviyyəsi ≥ 65%-dir                                                                                                                                                               | Bəli           |
| `check-ui-value-drift` (sətirdaxili)   | Yenidən yazılmış ingiliscə **dəyər** köhnəlmiş tərcümə saxlamır                                                                                                                                             | Bəli           |
| `check-new-key-coverage` (sətirdaxili) | **Yeni** ingiliscə açar hər bir lokal üçün tərcümə edilib — `__MISSING__:` markerinə icazə verilmir                                                                                                         | Bəli           |
| `check-translation-ratio`              | Hər lokal üzrə real tərcümə nisbəti (icazə siyahısından kənarda ingiliscə ilə eyni / yer tutucu / çatışmayan son düyünlər) `config/quality/i18n-translation-baseline.json` + yol verilən həddi keçməməlidir | **Bloklayıcı** |

`fetch-depth: 0` tələb edir — dəyər sürüşməsi qapısı `en.json` faylını birləşdirmə bazası ilə müqayisə edir.

#### `check-ui-value-drift` — köhnəlmiş tərcümə qapısı

Digər qapıların struktur baxımından görə bilmədiyi i18n reqressiyasını aşkarlayır: ingiliscə dəyər
yenidən yazılır, lakin _əvvəlki_ ingiliscə mətndən yaradılmış tərcümələr saxlanılır və nəticədə
ingilis dilindən istifadə etməyən istifadəçilər inamlı şəkildə ifadə edilmiş, lakin artıq yanlış olan mətni oxumağa davam edirlər.

Bu, həqiqətən də buraxılışa daxil olub. Antigravity giriş köməkçisi əlavə edilərkən (#5203)
`oauthModal.googleOAuthWarning` yenidən yazılmışdı; **43 lokaldan 39-u** operatorlara "tam URL-i
kopyalayıb aşağıya yapışdırmağı" bildirən mətni saxlamışdı — həmin provayder üçün tamamlana bilməyən
bir axın. Bu problem #8463-ə qədər nəzərdən qaçdı, çünki:

- `sync-ui-keys` yalnız **olmayan** açarları tamamlayır, **köhnəlmiş** açarları isə heç vaxt yeniləmir;
- `check-ui-keys-coverage` açarın _mövcudluğunu_ hesablayır, buna görə köhnəlmiş tərcümə əhatə olunmuş sayılır;
- `check-translation-drift` `docs/i18n/<locale>/**.md` sənədləşdirmə güzgülərini izləyir —
  o, heç vaxt `src/i18n/messages/*.json` fayllarını oxumur. 2026-09 yenidən sinxronizasiyasından bəri
  `docs-sync-strict` işində bloklayıcıdır: əsas sənədi redaktə edin → `npm run i18n:run -- --files=<doc>` (bölmə səviyyəsində, az xərc tələb edir).

**Fərqdən xəbərdardır, baza göstəricisinə əsaslanmır.** O, birləşdirmə bazasındakı `en.json` faylını
işçi ağacla müqayisə edir; ingiliscə dəyəri dəyişmiş hər açar üçün toxunulmamış tərcüməni hələ də saxlayan
istənilən lokal köhnəlmiş hesab olunur. Bu, mövcud texniki borcu qəsdən **dondurur** — fərq
uzun müddətdir mövcud olan tərcümənin hansı köhnə ingiliscə mətndən yarandığını göstərə bilməz, buna görə qapı
yalnız cari dəyişikliyin toxunduğu hissələri qiymətləndirir. Alternativ yanaşma (hər açar üzrə heş baza göstəricisi)
təxminən 600 KB həcmində yaradılan fayl tələb edərdi; bu, mövcud ən böyük baza göstəricisindən 3 dəfə böyükdür və
hər i18n PR-də dəyişərdi.

Tələbi ödəməyin iki yolu var:

1. təsirlənmiş tərcümələri yeniləyin və ya
2. onları `__MISSING__:<new english>` olaraq təyin edin — bundan sonra icra mühiti düzəldilmiş ingiliscə mətni təqdim edir
   (`src/i18n/request.ts::deepMergeFallback`, #7258) və açar tərcümə növbəsinə əlavə olunur.

Sətrin **mənası** dəyişibsə, **açarın adını dəyişməyə** üstünlük verin: yeni açar köhnəlmiş
tərcüməni miras ala bilməz. #8463-də bu üsuldan istifadə olunub.

```bash
npm run i18n:check-value-drift          # sərt rejim (CI-nin işlətdiyi)
npm run i18n:check-value-drift:warn     # yalnız hesabat
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Dəyər dəyişməsi və yeni açar yoxlamaları dəyişməz müqayisəni
`scripts/i18n/resolve-ui-diff-base.mjs` faylından ortaq şəkildə istifadə edir. İş axını hər iki yoxlamaya eyni baza, baza ucu və
namizəd SHA-larını ötürür. PR/bazanın yenidən hədəflənməsi, push və merge-group icraları öz hadisə
kontekstlərindən istifadə edir. Namizəd budağının əl ilə işə salınması üçün onun dəqiq açıq PR-ı və ya açıq şəkildə göstərilmiş
`i18n_base_sha` girişi tələb olunur. Bu giriş olmadan `main` və ya `release/vX.Y.Z`
üçün əl ilə işə salınma və ya planlaşdırılmış müşahidə son commit-i onun birinci valideyni ilə müqayisə edir; bu,
miras qalmış bütün tərcümə borcunun auditi deyil. Lokal işə salınma üçün açıq şəkildə göstərilmiş müqayisə bazası,
məsələn, yuxarıdakı `BASE_REF` əmri tələb olunur.

Çatışmayan və ya qeyri-müəyyən müqayisə konteksti, oxuna bilməyən və ya etibarsız tələb olunan kataloq və
dəyişdirilmiş namizəd, xəbərdarlıq rejimi də daxil olmaqla, **2** çıxış kodu ilə `INCOMPLETE` nəticəsini yaradır.
Kataloqlar `scripts/i18n/read-ui-catalog.mjs` vasitəsilə oxunur; oxuma xətaları
boş obyektlərlə əvəz edilmir. Nə əlçatan olmayan baza, nə də natamam giriş `PASS` nəticəsini təsdiqləyir.

### İş: `i18n`

Tam i18n yoxlama matrisi (hər lokal üçün bir iş). Bütün iş tövsiyə xarakterlidir.

| Skript                          | Yoxlayır                          | Bloklayıcı                                                    |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------- |
| `validate_translation.py quick` | Hər lokal üzrə tərcümənin tamlığı | **Tövsiyə xarakterli** (bütün işdə `continue-on-error: true`) |

### İş: `pr-test-policy`

Yalnız pull request-lərdə işləyir.

| Skript                 | Yoxlayır                                                                                                                                                       | Bloklayıcı |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` və ya `bin/` daxilində istehsal kodunu dəyişən PR-lər testləri daxil etməli və ya yeniləməlidir (Sərt Qayda #8)               | Bəli       |
| `check:test-masking`   | Dəyişdirilmiş test faylları xalis təsdiq sayını azaltmır və `assert.ok(true)` tavtologiyaları əlavə etmir                                                      | Bəli       |
| `check:pr-evidence`    | PR mətni dəyişiklik üçün test/VPS sübutuna istinad edir (PR mətnində axtarış aparmaqla Sərt Qayda #18-i mexanikləşdirir — etibarsızdır, Bax: Geri Qalan İşlər) | Bəli       |

### İş: `test-vitest`

`changes` təsnifat işi tələb olunur. Tətbiq olunan matris fraqmentləri uğursuzluq halında birləşdirməni bloklayır.

| Dəst             | Yoxlayır                                                 | Bloklayıcı                                                                                                                                                    |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 alət), autoCombo, keş — vitest icraçısı | Bəli                                                                                                                                                          |
| `test:vitest:ui` | UI komponent testləri — vitest icraçısı                  | **Bloklayıcı** — əvvəlcədən mövcud olan xətalar `vitest.config.ts` daxilində açıq şəkildə istisna edilib; yeni xətalar tapşırığın uğursuz olmasına səbəb olur |

### Gecəlik iş axınları (planlaşdırılmış, tövsiyə xarakterli)

Bunlar cron cədvəli üzrə (və `workflow_dispatch` ilə) icra olunur, PR-larda isə heç vaxt icra edilmir. Hamısı tövsiyə xarakterlidir.

| İş axını               | Yoxlayır                                                                                                                                                                                         | Bloklayıcılıq          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `nightly-property`     | təsadüfi başlanğıc dəyəri və yüksək icra sayı ilə fast-check xüsusiyyət testləri                                                                                                                 | **Tövsiyə xarakterli** |
| `nightly-resilience`   | yığın böyüməsi həddi, xaos xəta inyeksiyası, k6 yük/davamlılıq testi                                                                                                                             | **Tövsiyə xarakterli** |
| `nightly-llm-security` | promptfoo inyeksiya mühafizəsi (bloklama rejimi) + garak yoxlamaları (provayder sirri olmadıqda ötürülür)                                                                                        | **Tövsiyə xarakterli** |
| `nightly-schemathesis` | `docs/openapi.yaml` istifadə edərək canlı OmniRoute-a qarşı OpenAPI müqaviləsinin fuzzinqi (schemathesis) — spesifikasiya pozuntularını / emal edilməmiş 500 xətalarını üzə çıxarır (Faza 8 B.4) | **Tövsiyə xarakterli** |
| `nightly-mutation`     | sürətli modul xətti üzrə Stryker mutasiya testi göstəricisi — sağ qalan mutantlar zəif təsdiqləmələri üzə çıxarır                                                                                | **Tövsiyə xarakterli** |
| `nightly-compat`       | dəstəklənən `engines.node` diapazonları üzrə Node mühərriki uyğunluq matrisi                                                                                                                     | **Tövsiyə xarakterli** |

Performans baza göstəriciləri (yığın, TTFB, qurma vaxtı) qeydə alınır, lakin keçid şərti kimi tətbiq edilmir: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) sənədinə baxın (`npm run perf:lts-baseline`).

---

## Sürət mərhələsi (2026-08-30 → v4.0 LTS): bütün baza hədləri 20% yumşaldıldı

Sahibin qərarı (2026-08-30): v4.0 modullaşdırılmasına qədər buraxılış sürəti
texniki borcun həddini qorumaqdan daha vacibdir. Bütün **rəqəmsal** ratchet baza hədləri
audit edilə bilən vahid keçidlə 20% yumşaldıldı və mərhələ `config/quality/quality-baseline.json`
faylında elan edildi:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Nə dəyişdi                                                                                                                                                                                                                                 | Harada                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — aşağı olması daha yaxşı olan saylar ×1.2, yuxarı olması daha yaxşı olan faizlər ÷1.2 (əhatəetmə minimumu 60 olaraq saxlanıldı, `eslintErrors` 0 olaraq qalır, `eslintWarnings` 0 → dondurulmuş susdurma sayının 20%-i) | `quality-baseline.json` (`_relax_velocity_2026_08_30` qeydi bütün əvvəl → sonra dəyərlərini sadalayır) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, hər `frozen[*]` / `testFrozen[*]` sətir həddi ×1.2                                                                                                                                                                       | `file-size-baseline.json`                                                                              |
| fayl üzrə / TS kodu üzrə saylar ×1.2                                                                                                                                                                                                       | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false` olduqda `--require-tighten` tövsiyə xarakteri daşıyır                                                                                                                                                   | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| gecəlik `bank-ratchet-shrinks` dayandırılır (ölçülmüş azalmanı qeydə alaraq əlavə ehtiyatı ləğv edərdi)                                                                                                                                    | `.github/workflows/nightly-release-green.yml`                                                          |

İcazə siyahıları (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) büdcə **deyil** və onlara toxunulmayıb. Keçid/uğursuzluq siyasəti şlüzləri (məxfi məlumatlar, SQL qaydaları,
sənədlər/mühit müqaviləsi, i18n uyğunluğu, vahid testləri) dəyişməyib — uğursuz test hələ də uğursuz testdir.

**Alətlər**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — birdəfəlik
  yumşaltma (`scripts/quality/relax-baselines.mjs`); eyni qeydlə ikinci dəfə işləməkdən imtina edir.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  hər bir rəqəmsal şlüzü CI ilə eyni qaydada ölçür və hər şlüz üzrə qalan ehtiyatı göstərir
  (`scripts/quality/baseline-headroom.mjs`). Gecəlik `baseline-headroom` işi cədvəli iş axını
  icrasının xülasəsində dərc edir və onun JSON/Markdown hesabatını 90 gün saxlanılan
  `baseline-headroom-<run_id>` artefaktı kimi yükləyir. Xəbərdarlıq və kritik sətirlər həddinə
  10%-dən az qalmış və ya artıq onu aşmış şlüzləri müəyyən edir. Büdcələrin istifadə edilməsinə
  dair erkən xəbərdarlıq kimi bu hesabatları nəzərdən keçirin; problemli şlüzün `_rebaseline_*`
  qeydlərini yoxlayın. İş artıq daimi problem yaratmır və ya yeniləmir; #12149 əvvəlki hesabatların
  tarixçəsini qoruyur.

**Yeni kod rejimi (Clean-as-You-Code) — 2026-08-30 tarixindən etibarən, yalnız PR sürətli yolu**

`pull_request` hadisələrində `quality.yml`, `check:file-size`, `check:complexity-ratchets` və
`check:dead-code` komandalarına `--base-ref <PR base SHA>` ötürür. `check:complexity-ratchets` və
`check:dead-code` üçün şlüz HEAD-i birləşmə bazası ilə **yalnız PR-ın toxunduğu fayllar üzrə**
müqayisə edir (`scripts/check/newCodeMode.mjs`: birləşmə bazası müvəqqəti `git worktree` daxilində
reallaşdırılır, ESLint/knip orada və HEAD üzərində işə salınır, fayl üzrə sayların fərqi hesablanır):

- **bloklayıcı** — PR dəyişdirdiyi fayllara siklomatik/koqnitiv pozuntular və ya istifadəsiz ixraclar əlavə edib
  (jurnalda `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **məsləhət xarakterli** — qlobal cəmin dondurulmuş baza göstəricisi ilə müqayisəsi. Miras alınmış yayınma
  günahsız PR-i heç vaxt uğursuz etmir; yayınma buraxılışın uzlaşdırılması zamanı düzəldilmək üçün izlənilir və
  ehtiyat payı tapşırığı tərəfindən nəzarətdə saxlanılır.

`check:file-size` baza istinadını öz qaydalarına uyğun istifadə edir (`scripts/check/check-file-size.mjs`, #8522):
ağacdakı hər bir mənbə və test faylını yoxlayır, `git show` vasitəsilə hər birinin PR bazasındakı sətir
sayını oxuyur və yalnız fayl baza tavanının (`frozen` / `testFrozen` və ya baza həddindən kənar fayl üçün
`cap` / `testCap`) və baza ölçüsünün daha böyüyünü keçəcək qədər böyüdükdə uğursuz olur. Buna görə də
bazada artıq yayınmış fayl günahsız PR-ı heç vaxt qırmızı etmir.

`check:boundary:ratchet` eyni qaydanı özünün yeganə ədədinə tətbiq edir
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR hadisələrində həm
`quality.yml` sürətli yoxlamaları, həm də `ci.yml` lint tapşırığı PR-ın baza SHA-sını ötürür, baza
kommiti `git archive` ixracından ölçülür və PR yalnız onun `open-sse → src` kənarlarının sayı
`metrics.boundaryOpenSseToSrc` ilə bazadakı saydan daha böyük olanını keçdikdə uğursuz olur. Həddi
aşan baza sürüşməsi bildirilir (`base drift herdado`), lakin günahsız PR-ı heç vaxt qırmızı etmir;
push → main mütləq həddi saxlayır, həll edilə bilməyən baza SHA-sı isə xəbərdarlıqla həmin həddə
geri qayıdır.

`workflow_dispatch` icralarında, buraxılışın yaşıl status yoxlamasında və gecəlik ehtiyat payı
tapşırığında PR bazası yoxdur və mütləq (qlobal) müqayisə saxlanılır. Əhatə, təkrarlanma və tip
əhatəsi hələlik qlobal qalır (onların alətləri fayl üzrə fərqi aşağı xərclə yaratmır) — onlar da
eyni yanaşma üçün namizəddir.

**Mərhələnin v4.0-da bağlanması (LTS = əvvəlkindən daha sərt, “normal vəziyyətə qayıdış” deyil)**

1. Təmiz `release/v4.0.0` ucunda: qeydə almaq üçün `npm run quality:headroom --json`, sonra
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, hər bir tip yoxlaması
   keçidinin `--update` seçimi — hər baza göstəricisi ölçülmüş dəyərə endirilir.
2. `quality-baseline.json` faylından `_policy` silin (`--require-tighten` və gecəlik
   ehtiyat toplamanı yenidən aktivləşdirir), `check-openapi-coverage.mjs` daxilində
   `THRESHOLD = 36` (və ya daha yüksək) dəyərini bərpa edin.
3. Modullaşdırmanın fayda verdiyi yerlərdə ölçülmüş dəyərdən də sərt edin: fayl ölçüsünün `cap`
   dəyərini yenidən 1000-ə (və ya 800-ə) endirin, əhatənin minimum hədlərini +5 artırın,
   modullaşdırılmış paketlər üçün ölü ixracların sayını 0 edin.

## Ratchet baza səviyyəsi (`quality-baseline.json`)

Ratchet mühərriki (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json`
faylını oxuyur və onu yeni toplanmış `quality-metrics.json` ilə müqayisə edir. Epsilon
həddindən artıq geriləyən hər hansı metrika qurulmanın uğursuz olmasına səbəb olur.

Hazırda izlənilən metrikalar:

| Metrika               | İstiqamət | Mənası                                      |
| --------------------- | --------- | ------------------------------------------- |
| `eslintWarnings`      | `down`    | ESLint xəbərdarlıqlarının sayı artmamalıdır |
| `coverage.statements` | `up`      | Təlimat əhatəsi azalmamalıdır               |
| `coverage.lines`      | `up`      | Sətir əhatəsi azalmamalıdır                 |
| `coverage.functions`  | `up`      | Funksiya əhatəsi azalmamalıdır              |
| `coverage.branches`   | `up`      | Budaq əhatəsi azalmamalıdır                 |

Real yaxşılaşmadan sonra baza səviyyəsini yeniləmək üçün:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` bayrağı cari ölçülmüş dəyərləri `quality-baseline.json` faylına yazır.
Bu faylı metrikanı yaxşılaşdıran dəyişikliklə birlikdə commit edin. Metrikanı
yaxşılaşdırıb baza səviyyəsini yeniləməyən PR `--require-tighten` tərəfindən aşkarlanacaq
(Mərhələ 6A.5, icrası gözlənilir).

### CodeQL ratchet-i: yeniləmə tezliyi və əl ilə işə salma

`check:codeql-ratchet` **hər PR üzrə deyil, cədvəl əsasında yenilənən repozitoriya vəziyyətini** oxuyur.
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` əmri
`state: configured`, `schedule: weekly` bildirir: bu, hər push üçün analiz deyil,
GitHub-un standart quraşdırma skanıdır. Nəticə etibarilə, xəbərdarlıqları ARADAN QALDIRAN
PR birləşdirildikdən sonra ratchet növbəti planlaşdırılmış skan işə düşənədək köhnə,
daha yüksək sayı oxumağa davam edir — buna görə də skan yenilənənədək bütün açıq
PR-lərdə, o cümlədən düzəliş PR-nin sonrakı dəyişikliklərində geriləmə bildirir.

**Əl ilə yeniləmə**: `gh workflow run codeql.yml --ref release/vX.Y.Z` analizi yenidən
işə salır və xəbərdarlıqları bir neçə dəqiqə ərzində təkrar dərc edir. Əvvəlcə
`.github/workflows/codeql.yml` faylını oxuyun — onun başlığı bunun **GitHub-un "default setup"
rejimi ilə ziddiyyət təşkil etdiyinə görə** yalnız `workflow_dispatch` olduğunu izah edir
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
`push`/`pull_request`/`schedule` trigger-lərini bərpa etmək üçün əvvəlcə **sahib tərəfindən əməliyyat**
tələb olunur: Settings → Code security → CodeQL: Default → Advanced. Bu keçid edilmədən
`schedule:` trigger-i əlavə etməyin — bu, yalnız uğursuz icralar yaradacaq.

**Say azaldıqdan sonra baza səviyyəsini sərtləşdirin** — `node scripts/check/check-codeql-ratchet.mjs
--update` yeni ölçülmüş sayı `quality-baseline.json` →
`metrics.codeqlAlerts.value` daxilinə yazır, beləliklə ratchet köhnə yuxarı həddə doğru
geriləməyə səssizcə icazə vermir. İşlənmiş nümunə (2026-09-02/03): PR #12502 7 real
xəbərdarlığı aradan qaldırdı (ölçülmüş açıq xəbərdarlıq sayı 13 → 6); PR #12530 uyğunluq
üçün dondurulmuş baza səviyyəsini 11 → 6 olaraq sərtləşdirdi; qalan 6 xəbərdarlıq isə
sonradan hər xəbərdarlıq üzrə əsaslandırma ilə rədd edilərək açıq xəbərdarlıqların sayı 0-a endirildi.

**Rəddetmələr operatorun qərarıdır (Sərt Qayda #14)** — rəddetmə şərhində texniki
əsaslandırmanı qeyd etmədən heç vaxt CodeQL xəbərdarlığını rədd etməyin: yuxarı axın
protokolu tələbi üçün `won't fix`, test qurğusu üçün `used in tests`, CodeQL-in görə
bilmədiyi sanitarizator üçün `false positive` (presedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Testlərin təkrar icra siyasəti (WS5.4, v3.8.49)

Təkrar icra hər bir icraçı üçün ayrıca tətbiq olunur, heç vaxt qlobal şəkildə tətbiq edilmir — ümumi təkrar icra real reqressiyaları
görünməz qeyri-sabitliklərə çevirir:

| İcraçı           | Siyasət                                                                                                                                                          | Səbəb                                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | Yalnız CI-də `retries: 1`, `trace: on-first-retry` ilə                                                                                                           | Brauzer/şəbəkə vaxtlaması həqiqətən qeyri-determinikdir; izləmə ilə bir təkrar icra qeyri-sabitliyi diaqnostika edilə bilən artefakta çevirir |
| Vitest           | Qlobal təkrar icra YOXDUR. Qeyri-sabitliyi təsdiqlənmiş test üçün ayrıca, test səviyyəsində təkrar icra təyin edilir (diff-də görünür, PR-da nəzərdən keçirilir) | Karantin siyahısını qeyri-şəffaf deyil, repozitoriyada saxlayır                                                                               |
| node:test (unit) | Heç vaxt təkrar icra YOXDUR                                                                                                                                      | Qeyri-sabit modul testi testdəki xətadır — onu düzəldin, yenidən sınamaqla keçirməyə çalışmayın                                               |

Qeyri-sabitlik telemetriyası tətbiq edildikdən sonra hədəf SLO-lar (WS5.2/5.3): hər test üzrə <1% qeyri-sabitlik dərəcəsi
(“indi düzəlt” həddi), hər konveyer üzrə ≥95% keçid dərəcəsi. Bunlar sənaye üzrə istinad dəyərləridir —
öz ölçmələrimiz əsasında yenidən kalibrlənməlidir.

## Buraxılış səviyyəsində ratchet sürüşməsi (WS5.5, v3.8.49)

Ratchet (fayl ölçüsü, mürəkkəblik, eslint xəbərdarlıqları) TƏMİZ buraxılış
ucunda reqressiyaya uğradıqda — yəni birləşdirmələrin KOMBİNASİYASI reqressiyaya səbəb olduqda və heç bir PR bunu öz
budağında ayrıca təkrarlamadıqda — düzəliş **buraxılış kapitanına aiddir və buraxılış
budağında bir dəfə** edilməlidir: çıxarma/refaktorinqə üstünlük verin; baza səviyyəsini yalnız sənədləşdirilmiş
əsaslandırma qeydi ilə yeniləyin. Kombinasiya sürüşməsini heç vaxt töhfəçinin PR-ına yükləməyin və
hər PR üçün baza səviyyəsini yeniləməyin (bu, real reqressiyaları gizlədir). Əvvəlcə fərqləndirin: problemin sizin PR-dan
qaynaqlandığını fərz etməzdən əvvəl probe iş ağacında təmiz uc üzərində qırmızı nəticəni təkrarlayın.

## Ratchet azalmalarının qeydə alınması — aşağı istiqamət (#8584)

Ratchet yalnız yarı-avtomatikdir və avtomatik olan hissə yanlış hissədir. Həddin **artırılması**
on saniyə çəkən əl ilə JSON redaktəsidir və qırmızı PR-ın blokdan çıxarılmasının ən sürətli yoludur.
Həddin **azaldılması** üçün isə kimsə `--update` icra etməli və nəticəni commit etməlidir — və
`bank-ratchet-shrinks` tapşırığı tətbiq edilənədək heç bir iş axını bunu icra etmirdi. Ölçülmüş nəticə
(2026-07-25): artıq yeni fayllar üçün 800 sətirlik həddə və ya ondan aşağı olan 18 dondurulmuş fayl, ən pis
halda 132× (`src/shared/validation/schemas.ts`, 2,523 həddi daşıyan 19 sətir);
mürəkkəblik tavanı təxminən 37 baza yeniləmə qeydi ərzində `1794 → 2169` yüksəlib və cəmi bir
azalma (−1) olub; “növbəti dövrdə `--update` vasitəsilə sərtləşdirin” ifadəsi 31 dəfə yazılıb və
yalnız bir dəfə yerinə yetirilib. Onu doğuran koddan daha uzunömürlü olan hədd, tamamlanmış hər bir
parçalanmanı faylı növbəti dəfə redaktə edən şəxs üçün səssizcə böyümə güzəştinə çevirir.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** tapşırığı bu dövrəni bağlayır:

|          |                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| İşləyir  | `schedule` (gündə 3×) + `workflow_dispatch` — məqsədli şəkildə `push` **deyil**                                              |
| Ölçür    | ən yüksək `release/vX.Y.Z`, `release-green` ilə eyni həll və inyeksiya qoruması                                              |
| Yazır    | `check:file-size --update` və `check:complexity-ratchets --update` (hər ikisi konstruksiyaya görə yalnız azalma tətbiq edir) |
| Yoxlayır | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                     |
| Göndərir | buraxılış budağına qarşı həmişə aktual olan bir PR — məcburi yenilənir, heç vaxt spam edilmir                                |

Qeydəalma hər `push` üzrə deyil, paketləşdirilmiş şəkildə aparılır, çünki gecikmə tələbi yoxdur (azalmanın
8 saat ərzində qeydə alınması kifayətdir), hər birləşdirmə üzrə icra isə birləşdirmə kampaniyaları zamanı
PR budağını təkrar-təkrar quracaq və hər dəfə tam ESLint keçidinin xərcini ödəyəcəkdi. Aşkarlama `push`
üzərində qalır (`release-green`); yalnız qeydəalma paketləşdirilir.

### Təhlükəsizlik yoxlayıcısı

Tapşırıq baza səviyyələrinə nəzarətsiz şəkildə yazır, buna görə bunu məqbul edən
`verify-ratchet-bank.mjs`-dir. O, `--update` sonrasındakı ağacı `HEAD` ilə müqayisə edir və hər bir
dəyişiklik aşağıdakılardan biri olmadıqda **hər hansı commit yaranmazdan əvvəl tapşırığı dayandırır** —
heç bir PR açılmır:

- `frozen` / `testFrozen` daxilindəki rəqəmsal qeydin **azaldılması** və ya **silinməsi**
- `complexity-baseline.json` → `count` dəyərinin **azaldılması**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` dəyərinin **azaldılması**

Başqa hər şey uğursuzluqla nəticələnir: rəqəmin artırılması, qeydin əlavə edilməsi, `cap`/`testCap`
dəyərinin dəyişdirilməsi və ya `_rebaseline_*` qeydinin silinməsi/yenidən yazılması (bu qeydlər hər bir
tavanın niyə mövcud olduğuna dair audit izidir və fayl qeydləri ilə eyni `frozen` obyekti daxilində saxlanılır).
Həddi artıra bilən bot mövcud vəziyyətdən qəti şəkildə daha pis olardı. Reqressiya qoruması:
`tests/unit/verify-ratchet-bank.test.ts`.

Tapşırıq heç vaxt `release/*` budağına göndərmir — PR-ı insan birləşdirir, buna görə yanlış ölçmə
nəzərdən keçirilmədən tətbiq edilə bilməz.

## İcazə siyahısı siyasəti

Əvvəldən mövcud olan pozuntular səbəbindən uğursuz ola bilməyən hər bir keçid dondurulmuş icazə siyahısından istifadə edir
(məsələn, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Siyasət belədir:

**Əsas səbəbi aradan qaldırın; icazə siyahısından yalnız pozuntu əvvəldən mövcud olduqda və
eyni PR çərçivəsində düzəldilə bilmədikdə istifadə edin.**

İcazə siyahısına qeyd əlavə edərkən:

1. Əsaslandırmanı ehtiva edən şərh əlavə edin.
2. İzləmə məsələsinə istinad edin (məsələn, `// #3498 — Phase 2 feature, not yet implemented`).
3. Pozuntunu aradan qaldıran eyni PR çərçivəsində qeydi silin — artıq aktiv pozuntunu
   istisna etməyən köhnəlmiş qeyd özü də qüsurdur (6A.3 köhnəlmiş-tətbiqetmə mexanizmi
   reallaşdırıldıqdan sonra əlaqəsiz icazə siyahısı qeydi keçidin uğursuz olmasına səbəb olacaq).

Testlərin daha tez keçməsini təmin etmək üçün icazə siyahısına qeydlər **əlavə etməyin**. Böyüyən
icazə siyahısı ilə yaşıl keçid saxta keyfiyyət hissi yaradır.

### PR-nizdə keçid uğursuz olduqda

1. **Keçidin çıxışını diqqətlə oxuyun** — qaydanı konkret olaraq hansı faylın və ya simvolun pozduğunu
   bildirir.
2. **Pozuntunu aradan qaldırın** — keçidlərin əksəriyyəti kod düzgün olan kimi uğurla tamamlanan
   deterministik fayl sistemi yoxlamalarıdır.
3. **Pozuntu əvvəldən mövcuddursa** (yəni onu siz yaratmamısınız, lakin keçid artıq
   onu əhatə edir): əsaslandırma şərhi və izləmə məsələsi ilə birlikdə icazə siyahısına qeyd əlavə edin.
4. **Keçid ratçetdirsə** (əhatə dairəsi, ESLint xəbərdarlıqları, təkrarlanma, mürəkkəblik):
   dəyişikliyiniz göstəricini pisləşdirib. Əsas problemi aradan qaldırın və ya (nadir hallarda) dəyişiklik
   məqsədyönlüdürsə və göstəricinin pisləşməsi məqbuldursa, `npm run quality:ratchet -- --update`
   əmrini icra edin — lakin səbəbini PR təsvirində sənədləşdirin.
5. **Məsləhət xarakterli keçidlər** (`continue-on-error: true`) məlumat məqsədlidir — onlar
   birləşdirməni bloklamır, lakin CI xülasəsində görünür. Buna baxmayaraq, onları düzəldin.

---

## Yeni yoxlamanın əlavə edilməsi

1. `scripts/check/check-<name>.mjs` (və ya `.ts`) yaradın. Siyasət yoxlamaları 0/1 çıxış kodu ilə tamamlanır.
   Ratçet tipli yoxlamalar `collect-metrics.mjs` vasitəsilə `quality-metrics.json` faylına göstərici yazır.
2. `package.json` faylına `"check:<name>": "node scripts/check/check-<name>.mjs"` əlavə edin və
   aliası, eləcə də onun dəqiq əmrini `config/quality/gate-manifest.json` faylında sinxronlaşdırın.
   Mövcud doğrulama aliasını dəyişdirərkən və ya silərkən də eyni sinxronlaşdırmanı tətbiq edin.
   `npm run check:gate-manifest` əmrini işə salın; pre-commit hook-u və CI dəyişiklik təsnifatı
   bu müqavilənin icrasını təmin edir.
3. Onu `.github/workflows/ci.yml` daxilində uyğun tapşırığa
   (siyasət → `lint` və ya `docs-sync-strict`; ratçet → `quality-gate`) qoşun.
4. İcazə siyahısı varsa, köhnəlmiş qeydlərin avtomatik aşkarlanması üçün
   `scripts/check/lib/allowlist.mjs` faylındakı `reportStaleEntries()` funksiyasını tətbiq edin.
5. `tests/unit/build/` daxilində yoxlamanın aşkarlama məntiqini əhatə edən test yazın.
6. Bu sənədi yeniləyin (müvafiq tapşırıq cədvəlinə sətir əlavə edin).

---

## Agent alətləri: dövrədə LSP (seçimlidir)

CI yoxlamalarına əlavə olaraq, OmniRoute **seçimli** `agent-lsp` ilkin strukturunu
(layihə səviyyəli `.mcp.json`, Fase 7 Task 15) təqdim edir. TypeScript dil serverini
kodlaşdırma agentləri üçün əlçatan etmək məqsədilə `.mcp.json` yaradın ki, onlar kodu yazmazdan
**əvvəl** simvolları / diaqnostikanı müəyyənləşdirsinlər — bu, “uydurulmuş simvol” xətalarını
mənbədə azaldan və `typecheck:core` yoxlamasını tamamlayan, iddiadan əvvəl kompilyasiya yanaşmasıdır.
O, qəsdən avtomatik yüklənmir (MCP↔LSP körpüsünü siz seçir və yoxlayırsınız); nasaz qeyd yalnız
bağlantı xətasını jurnala yazır və sessiyaları heç vaxt pozmur.

---

## Rasionallaşdırma üzrə qalıq işlər (ROI icmalı — Mərhələ 9 Dalğa 3)

Bu inventar 2026-06-17 tarixində `ci.yml` ilə tutuşdurulub (əvvəlki versiyada
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` buraxılmışdı). Tutuşdurulmuş dəstin ROI icmalı
aşağıdakı rasionallaşdırma namizədlərini müəyyən etdi. **Birləşdirmələr mexaniki CI
dəyişiklikləridir; keçidlər və ləğvlər operator üçün saxlanılmış siyasət qərarlarıdır.** Aşağıdakılardan
heç biri hələ tətbiq edilməyib.

**Yuxarıda sənədləşdirilməyənlər də var** (tövsiyə xarakterli, aşağı siqnallı): `docs-lint` işi
(markdownlint + Vale, bütün iş üçün `continue-on-error`) və müstəqil skaner iş axınları
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json` daxilindədir, lakin `ci.yml` daxilində bloklayıcı reket mexanizminə qoşulmayıb — bu metrika
hazırda təcrid olunub.

### Birləşdirmə / dublikatların aradan qaldırılması (mexaniki, daha aşağı risk)

Hər bir namizəd 2026-06-17 tarixində aktiv keçid vəziyyətinə əsasən yoxlanılıb (etibar et, amma yoxla);
bir neçə "aşkar" birləşdirmənin əslində texniki borcu gizlətdiyi üzə çıxdı və onlar **təmiz** əvəzləmələr deyil.

- **`check:docs-sync` iki dəfə işə düşür** — `lint` işində ayrıca və yenidən `check:docs-all` (`docs-sync-strict`) daxilində, həmçinin husky pre-commit qarmağında. ✅ **TAMAMLANIB** — ayrıca `lint` çağırışı silindi.
- **CVE skan edilməsi** — ❌ **Təmiz birləşdirmə DEYİL.** `audit:deps` bütün beş lockfile üzrə kritik xəbərdarlıqları və natamam auditləri bloklayır, cari siyasətə əsasən yüksək səviyyəli xəbərdarlıqları isə xəbərdarlıq kimi bildirir; `check:vuln-ratchet` (osv) yalnız repozitoriyada saxlanılan baza göstəricisi ilə müqayisədə _geriləmə_ olduqda uğursuz olur və tələb edilən zaman çatışmayan ölçmələri rədd edir. Semantikalar fərqlidir — `audit:deps` ləğv edilərsə, mütləq kritik keçid və müstəqil paket audit qəbzləri itirilər. Hər ikisini saxlayın.
- **Dövr aşkarlanması** — ✅ **TAMAMLANIB** (#15159 G-01/G-02). Buradakı köhnə mətn `check:cycles` keçidini "yaşıl, seçilmiş" keçid adlandırır və `check:circular-deps` (dpdm) 91 dövr bildirdiyi üçün onun bloklayıcı saxlanmasını əsaslandırırdı. Həmin yaşıl nəticə **yanlış yaşıl** idi: `check:cycles` 5 alt qovluğu (450 fayl) skan edir, yalnız statik `import|export … from` ilə uyğunluq tapır və hər bir `@/` və `@omniroute/open-sse/` spesifikatorunu nəzərə almırdı; buna görə də repozitoriyada üstünlük təşkil edən dinamik import + alias dövrlərini görə bilmirdi. Düzəldildi: keçid indi `src` + `open-sse` daxilində gəzir (5023 fayl), spesifikatorları TypeScript AST-dən toplayır (beləliklə, `import("…")` nəzərə alınır, tip mövqeyindəki `typeof import("…")` isə alınmır) və tsconfig `paths` dəyərlərini həll edir. O, 0 deyil, **14** dövr tapır. Əvvəldən mövcud olan 14 dövr keçid PR-ında düzəldilə bilmədiyi üçün `check:cycles` indi **reketdir** (`--ratchet`, `quality-baseline.json` daxilində yuxarı hədd `metrics.cycles.value = 14`, `direction: down`) — o, istənilən _geriləməni_ bloklayır və say yalnız azala bilər. CI `npm run check:cycles:ratchet` əmrini işə salır. Azaltma prosesi **A-01** ilə birlikdə aparılır. `check:circular-deps` (dpdm) daha geniş ikinci rəy kimi tövsiyə xarakterli qalır.
- **Mürəkkəblik** — ✅ **TAMAMLANIB** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): bir ESLint keçidi, sayım ruleId üzrə aparılır ki, siklomatik+max-lines və koqnitiv baza göstəriciləri müstəqil qalsın; fərdi `check:complexity` / `check:cognitive-complexity` lokal `--update` üçün saxlanılır.
- **`/api` anti-hallüsinasiya** — ✅ **TAMAMLANIB** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` üçün bir FS inventarı, openapi-routes + docs-symbols hələ də müstəqil hesabat verir; fərdi yoxlamalar lokal icralar üçün saxlanılır.
- **`check:node-runtime` 11 işdə icra olunur** — ⚠️ **aşağı ROI.** Hər biri ayrıca runner-dır və yoxlama <1s çəkir; ucuz, işə görə ayrıca qoruyucunun itirilməsi müqabilində ümumi qənaət ~10s-dir. Yaradacağı qarışıqlığa dəyməz.
- **CI lint-də `typecheck:noimplicit:core`** — ✅ **lint işindən silindi** (tövsiyə xarakterli `continue-on-error` idi); bloklayıcı tip səthi `typecheck:core` + `check:type-coverage`-dır. Lokal skript saxlanılıb.

### Keçir / qərar ver (operator siyasəti)

- `check:openapi-security-tiers` (tövsiyə xarakterli) — ❌ **Təmiz şəkildə dəyişdirilə bilməz.** O, 0 çıxış kodu ilə tamamlanır, lakin `LOCAL_ONLY_API_PREFIXES` altında bir neçə `traffic-inspector` marşrutunda `x-loopback-only: true` annotasiyasının olmadığını bildirir. Onu məcburi etmək üçün əvvəlcə həmin annotasiyalar `openapi.yaml` faylına əlavə edilməlidir.
- `typecheck:noimplicit:core` (tövsiyə xarakterli) — əsasən bloklayıcı `check:type-coverage` reketi ilə əhatə olunur. Onu reketə çevirin və ya redundant ikinci `tsc` keçidini ləğv edin.
- `test:vitest:ui` (indi **bloklayıcıdır**) — əvvəldən mövcud olan uğursuzluqlar `vitest.config.ts` daxilində `// #8618` izləmə şərhləri ilə açıq şəkildə istisna edilib; yeni uğursuzluqlar işi uğursuz edir.
- `check:secrets` (gitleaks, bloklayıcı reket) — cari yuxarı hədd `quality-baseline.json` daxilindəki `metrics.secretFindings` dəyəridir. İstənilən istisna əsaslandırılmış `.gitleaks.toml` qeydi tələb edir; əlçatan olmayan ölçmə NATAMAM hesab olunur. Skan GitHub-ın daxili məxfi məlumat skanını və `check:public-creds` yoxlamasını tamamlayır.
- `check:pr-evidence` (bloklayıcıdır, PR mətnini grep ilə axtarır) — yanlış müsbət nəticə riski yüksəkdir; ləğv edilərsə, Sərt Qayda #18-in icrasını zəiflədir, buna görə də bu, həqiqi siyasət qərarıdır.
- `semgrep` (tövsiyə xarakterli müstəqil yoxlama) — OWASP ailələri üzrə CodeQL ilə üst-üstə düşür; onun baza göstəricisini reketə qoşun və ya ləğv edin.

---

## Əlaqəli sənədlər

- Təchizat zənciri (mənşə, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — açar dəstlərinin uyğunluq keçidi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, `i18n-ui-coverage` tapşırığı).
Hər bir `src/i18n/messages/<locale>.json` faylındakı son səviyyə açarları dəstini `en.json` ilə müqayisə edir və
açarın nə vaxt əlavə edilməsindən asılı olmayaraq, çatışmayan və ya artıq hər hansı son səviyyə açarı olduqda uğursuz olur. `__MISSING__:`
yer tutucuları mövcud hesab edilir (onların məzmunu nisbət keçidinin işidir). Bu, fərqə əsaslanan/faizlə işləyən
digər iki keçidin mütləq tamamlayıcısıdır: `check-ui-keys-coverage` hər lokal üçün 80 % minimum həddi tətbiq edir
(~13,000 açardan 43-nün çatışmaması yenə də 99.7 % kimi görünür), `check-new-key-coverage` isə yalnız
PR-ın `en.json` faylına əlavə etdiyi açarları qiymətləndirir. Lokal paketi budağının yaradıldığı günün `en.json`
faylından generasiya olunur və baza yeni açarlar əlavə etməyə davam edərkən tərcümə prosesi günlərlə davam edir; paket PR-ı özü
heç bir açar əlavə etmir, buna görə də paket 1 (#13044) doqquz lokalda 43 açar çatışmazlığı ilə,
paket 2 (#13660) isə səkkiz lokalda 10 açar çatışmazlığı ilə birləşdiriləndə hər iki digər keçid səssiz qaldı (2026-09-15). Xətanı
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ilə düzəldin; `extra` son səviyyə açarı
mənbənin onu sildiyini bildirir — onu lokaldan silin. `--warn` uğursuzluq yaratmadan hesabat verir.
`--catalog=cli` eyni müqayisəni `bin/cli/locales` üzərində işlədir (`npm run i18n:check-keys:cli`);
hər iki addım `i18n-ui-coverage` tapşırığında yerləşir.

#### `check-new-key-coverage` — yeni açarlar üçün i18n keçidi

`check-ui-value-drift` keçidinin tamamlayıcısıdır. Həmin keçid tərcümələri yenilənmədən qalan, lakin ingiliscə dəyəri **yenidən yazılmış**
halları aşkarlayır; bu keçid isə bəzi lokallara heç vaxt əlavə edilməmiş, lakin ingiliscə **əlavə edilmiş**
açarı aşkarlayır.

`check-ui-keys-coverage` bu halı görə bilmir: o, hər lokal üçün faiz minimumunu tətbiq edir və
~13,000 son səviyyə açarından on birinin çatışmaması əhatə göstəricisini 99.9% səviyyəsində saxlayır. Hər dil üzrə faiz
"bu funksiya tərcümə edilmədən buraxıldı" fikrini ifadə edə bilməz — bütöv funksiya yeni lokalda heç bir
mətn olmadan əlavə edilə və göstəricini heç dəyişməyə bilər.

Onun kodlaşdırdığı insident: Orchestration Canvas-ın 3-cü mərhələsi özünün on bir açarını
həmin vaxt mövcud olan 42 lokala tərcümə etdi. Bir neçə saat sonra Aİ dilləri paketi (#13044) repozitoriyadakı
lokalların sayını 51-ə çatdırdı və doqquz yeni lokal (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) həmin açarları heç vaxt
almadı. `deepMergeFallback` çatışmayan açarı ingiliscə mətnlə əvəz edir, buna görə də uğursuzluq
boş interfeys əvəzinə tərcümə edilməmiş interfeys şəklində idi — real və quruluş etibarilə səssiz.

Tamamlayıcısı kimi, bu da **fərqdən xəbərdardır** və birləşdirmə bazasındakı ingiliscə məzmunu işçi
ağacla müqayisə edir; beləliklə, əvvəldən mövcud olan boşluqlar toxunulmaz qalır və keçidi aktivləşdirmək üçün miqrasiyaya ehtiyac olmur.

**`__MISSING__:<english>` markeri bunu təmin etmir (2026-09-17 tarixindən etibarən).** Əvvəllər bu,
sənədləşdirilmiş təxirəsalma üsulu idi — icra zamanı düzgün ingiliscə mətnə geri qayıdılırdı — ta ki 2026-09-16 tarixində
səkkiz funksiya PR-ı 61 açar əlavə edib tərcümə etmək əvəzinə markerləri bütün 65 lokala yerləşdirənə qədər: bu
keçid onların hər birini qəbul etdi, heç nə PR-ları bloklamadı və real tərcümə nisbətini bloklayan keçid
daha sonra buraxılışın son vəziyyətində hamı üçün uğursuz oldu (pt-BR 3.2 % > 2.5 % + 0.5). Marker artıq
çatışmayan tərcümə kimi qiymətləndirilir. Xətanı
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ilə və ya
bütün lokallar üçün paralel şəkildə `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ayrılmış rejimdə təhlükəsizdir, `OMNIROUTE_TRANSLATION_*` mühit dəyişənləri olmadan başlamaqdan imtina edir) ilə düzəldin.
İngiliscə qalmalı olan açar (sabitlənmiş məhsul/mühərrik/bayraq adı) marker arxasında deyil,
`scripts/i18n/untranslatable-keys.json` faylında olmalıdır. `vi` markerləri tamamilə qadağan edir (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — dayandırılmış testlər üçün keçid

`vitest.config.ts` faylının `exclude` siyahısındakı fayl icra olunmayan testdir və ağaca baxan şəxs üçün
əhatə kimi görünür. Altmış iki fayl
`// #8618 — pre-existing failure; remove this exclusion when fixed` şərhinin arxasında toplandı. #8618 məsələsi
2026-08-11 tarixində bağlandı, lakin onun izlədiyi siyahı 45 elementdən 62 elementə qədər böyüdü və hər yeni element
bağlanmış məsələyə istinad edən şərhi miras aldı. Siyahı nəhayət fayl-fayl ölçüldükdə (#13204), **62 fayldan 51-i
heç bir mənbə dəyişikliyi olmadan cari ağacda uğurla keçdi**.

Keçid real fayla uyğun gələn hər istisnadan (a) izləmə məsələsini göstərməyi və
(b) ölçülmüş statusu ilə birlikdə `config/quality/vitest-exclusions.json` faylında yer almağı tələb edir; beləliklə, yeni istisna əlavə etmək
60 elementli massivə daha bir sətir əlavə etmək əvəzinə ayrıca faylda nəzərdən keçirilə bilən fərq yaradır. O, istisna edilmiş
testləri qəsdən yenidən işə salmır — bu, təxminən 10 dəqiqə çəkir və periodik tapşırığa aiddir;
inventar hər birinin son ölçülmə tarixini qeyd edir.
