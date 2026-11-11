# Quality Gates Reference (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Bu sənəd OmniRoute-da bütün CI keyfiyyət qapıları üçün əsas istinaddır.
O, hər bir qapını, qapının nəyi yoxladığını, hansı CI tapşırığında işlədiyini, ratchet baza səviyyəsindən, yoxsa keçdi/qaldı siyasətindən istifadə etdiyini və yığmanı bloklayıb-bloklamadığını, yaxud yalnız tövsiyə xarakterli olub-olmadığını təsvir edir.

Qısa xülasə və icazə siyahısı siyasəti üçün `AGENTS.md` faylındakı "Keyfiyyət Qapıları və Ratchet-lər" bölməsinə baxın. Eyni sistemin kritik qiymətləndirilməsi, yetkinlik təsnifatı və alətdən asılı olmayan təkrarlama planı üçün
[Keyfiyyət Qapıları üzrə Təlimata](../ops/QUALITY_GATE_PLAYBOOK.md) baxın.

---

## Gate inventar və icra profilləri

### Namizəd qəbulu

CI və Quality Gates iş axınlarının hər biri sabit qərar verir: `Gate / CI` və `Gate / Quality`. Onların versiyalı qəbul siyasəti tələb olunan və ya məsləhət xarakterli hər bir yuxarı işi sadalayır. Müvafiq tələb olunan iş uğur qazanmalıdır: çatışmayan, ləğv edilmiş, atlanmış, gözlənilən və naməlum nəticələr PASS qura bilməz. Etibarlı yalnız sənədlər və ya yalnız kataloq üçün təsnifat kod zolağının qeyri-mümkün olmasına səbəb ola bilər; adi layihə PR qəbul edilmiş namizəd deyil. `hotfix` etiketi sübutlardan imtina etmir.

Hər iki iş axını PRs main/release filiallarına əhatə edir, `main` yə itələyir, əl ilə göndərmə və qrup hadisələrini birləşdirir. Tam seçimi itələyin, göndərin və birləşdirin. Etibarlı Mergify növbə layihəsi həmçinin müvafiq `full-code`/`full-code-e2e` işlərini icra edir; adi PRs onları atlayın. Əl ilə birləşmədən əvvəl, dəqiq namizədə tam göndəriş göndərin. `release/**` yə təkan bu iş axınlarını başlatmır; Buraxılış-Yaşıl birləşdirilmiş bazanı ayrıca müşahidə edir (`docs/ops/RUNNER_BOX.md` → Hosted zolağı). Çəngəllər və birləşmə qrupları, əks halda öz-özünə yerləşdirilən qaçışçıları seçən işlər üçün yerləşdirilən qaçışçılardan istifadə edir; buraxılışdan əvvəl kifayət qədər yerləşdirilmiş tutum yoxlanılmalıdır.

Adi bir PR sürətli seçimi həyata keçirir. Qəbul siyasətinin `full-code` və `full-code-e2e` zolaqları (E2E, inteqrasiya, paket artefaktı, Electron tüstüsü, Bun SQLite, ekosistem və protokol müştəriləri) yalnız Mergify növbə qaralamasında və ya tam dövrədə işləyir: `gh workflow run ci.yml --ref <branch>`.

Hər bir JSON qəbzi yoxlanılmış SHA, iş axını və cəhdi müəyyən edir. CLI checkout/event SHA uyğunsuzluğunu rədd edir. İş axını testləri siyasət üzvlüyünü hökm işinin `needs` siyahısına bağlayır ki, yeni və ya çıxarılan zolaq səssizcə yoxa çıxmasın. Qəbzlər nəşr, yerləşdirmə və ya mövcud məsləhət skanerinin daxili hissələrini deyil, öz iş axınını əhatə edir. Filial qaydalarında tələb olunan müvafiq yoxlamaların aparılması ayrıca inzibati dəyişiklikdir; Öz işlərini təyin etmək bir şöbəni qorumur.

`API Route Typecheck` həm ümumi hökmlərdən, həm də yerli tam müşahidəçinin statik profilindən kənar müstəqil iş axını yoxlanışıdır. Dəqiq namizəd üçün onun nəticəsini ayrıca yoxlayın. `.github/workflows/api-route-typecheck.yml` PRs də `main` və ya `release/**` yə işləyir, hər iki filial ailəsinə, manual göndərmə və `checks_requested` tipli `merge_group` hadisələrinə təkan verir. Onun heç bir yol filtri yoxdur. Qrupları birləşdirin `merge_group.head_sha` yoxlayın; digər hadisələr `github.sha` yə baxın. Bütün hadisələr eyni API diaqnostik qapısı və qapı vahidi testlərindən istifadə edir. PR baza retargetləri yeni çek tələb edir; body/title redaktələri yalnız müşahidə üçün `Admission not requested / API Route Typecheck` adından istifadə edir və qəbul yoxlamasını əvəz edə bilməz.

### Qəbul reduktorunda saxlanılan sübut

`scripts/quality/validate-release-acceptance.mjs` təchiz edilmiş planı və onun təzahürlərini azaldır; planın tam buraxılış boru kəmərini əhatə etdiyini müəyyən etmir. Onun hesabatları açıq şəkildə `releaseAcceptance: false` təyin edir, hətta bu plan `VERIFIED` olsa belə. `release-acceptance.yml` iş axını hələ də real quruluş, paket, açılış və ya tanıtım qəbzləri deyil, kölgə qurğularından istifadə edir.

CLI saxlanılan sübutları yoxlamaq üçün `--evidence-root` tələb edir. Fayllar `<evidence-root>/<artifact_id>/<member>` kimi həll edilir və SHA-256 kimi hashing edilir. Sübutsuz, itkin və ya dəyişdirilmiş fayl, təhlükəli yol və ya simvolik əlaqə olmayan PASS qeydi yoxlamanın qarşısını alır. Çatışmayan fayllar boş uğurlu qeydlərə bərabər deyil. Mövcud SHA/run/attempt çekləri müstəqil olaraq qalır: uyğun baytlar köhnə qəbzi xilas edə bilməz. Fayl bütövlüyü icranın həqiqiliyinə və ya artefaktın təşviqinə sübut deyil.

### DAST təsdiqlənmiş CI quruluşunu istehlak edir

Tələb olunan `dast-smoke` CI işi `build` dən sonra `.github/workflows/dast-smoke.yml` çağırır. Dəstəklənən çəngəl PRs, buraxılış hədəfi PRs və birləşmə qrupları daxil olmaqla, quruluş kimi eyni code/draft seçimini izləyir. Çatışmayan, uğursuz, ləğv edilmiş və ya gözlənilmədən atlanmış DAST iş blokları `Gate / CI`. Yenidən istifadə edilə bilən iş axınının müstəqil PR/dispatch tetikleyicisi yoxdur; manuel yoxlama CI-nın göndərilməsindən istifadə edir, beləliklə quruculuq və istehlakçı bir işdə qalır.

`scripts/ci/next-build-provenance.mjs` tam Növbəti artefaktı tar həzmi, repository/event/run, istehsalçı cəhdi, head/base/checkout/tree, iş axını identifikasiyası, kilid faylı, dəqiq Node version/ABI, platforma və paketləyici ilə möhürləyir. DAST dəyişməz artefakt ID `needs.build.outputs` dən seçir, yükləmə həzminin yoxlanılmasını tələb edir və `scripts/ci/unpack-ci-build.py` vasitəsilə icazə verilən iki üzvünü çıxarmazdan əvvəl müstəqil olaraq ZIP istehsalçı həzminə qarşı heş edir. Növbəti ağac çıxarılmazdan əvvəl manifest və tar arxivi də müstəqil istehsalçının nəticələrinə uyğun olmalıdır. O, heç vaxt ən son uğurlu filial quruluşunu axtarmır. ID və bütün girişlər hələ də uyğunlaşdıqda, qismən təkrar icra eyni istehsalçı cəhdini təkrar istifadə edə bilər; qəbz hər iki cəhdi qeyd edir.

İstehlakçı yalnız oxumaq üçün depo icazəsi və heç bir repozitor sirri olmayan Linux runner-də qalır. O, istehsalçının dəqiq Node versiyasını quraşdırır, sonra CLI ni `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` ilə yığır. `scripts/build/standaloneInput.mjs` hər hansı bir ehtiyat qurmadan əvvəl itkin müstəqil serveri rədd edir; normal yerli CLI quruluşları mövcud ehtiyatlarını saxlayır. Server hazırlığı, Sxema və promptfoo hamısı dəyişməz 25 dəqiqəlik iş limiti daxilində uğur qazanmalıdır. Mənbə qəbzi uğurlu DAST skanını deyil, giriş şəxsiyyətini və baytları sübut edir. Artefaktın müddəti, qaçışçının kəsilməsi və ya uğursuz skaner natamam və ya uğursuz sübut olaraq qalır; məsləhət paketi vasitəsilə PASS ola bilməz.

### UI icra qabiliyyəti

CI tam UI inventarını dörd `test-vitest` matris parçası kimi idarə edir, hər bir hissədə ən çoxu iki işçi və mövcud 15 dəqiqəlik iş müddəti. Birinci parça həmçinin MCP/autoCombo Vitest dəstini idarə edir. Tələb olunan iş nəticəsi hər bir matrisin ayağını əhatə edir; bir parçanın uğursuzluğu və ya ləğvi namizədin qəbulunu müəyyən edə bilməz.

Gecə müşahidəçisi ilk qəbzdə MCP icrası daxil olmaqla, hər bir UI parçası üçün ayrıca dəqiq namizəd qəbzini saxlayır. Bütün dörd qəbz, qeydlər və uyğun icra şəxsiyyətləri tələb olunur. Yerli `npm run test:vitest:ui` hələ də tam dəsti seçir; bir `--shard` qaçışı yalnız qismən sübutdur.

### Vahid əhatə dairəsi kolleksiyası

On iki bölmə parçası mövcud sınaq icrası zamanı V8 əhatə dairəsini toplayır. Uğurlu bir parça, aralıq İstanbul hesabatı yaratmadan orijinal faylları sıxışdırmaq üçün `scripts/ci/compact-v8-coverage.mjs` işə salır. Yekun Əhatə işi namizəd SHA, icra müddəti, mənbə kökü və məlumat hashlərinə qarşı bütün on iki manifestləri yoxlayır, sonra c8 reportyorlarını və mövcud əhatə dairəsini işə salır. Daxiletmələr c8-in qlobal fayl adı sırasını saxlayır; parça başına əvvəlcədən birləşmə qarışıq function/block əhatə dairəsi üçün təhlükəlidir. Çatışmayan, qüsurlu və ya uyğun olmayan parçalar qəbul edilmir. Uğursuz test qırıntıları xam diaqnostik əhatə dairəsini ayrıca saxlayır; son birləşməyə daxil ola bilməz.

### Bölmənin icrası üzrə irəliləyiş qəbzləri

Paylaşılan `test:unit:ci:shard` əmri `scripts/ci/unit-progress-reporter.mjs` vasitəsilə `primary`, `dashboard` və `serial` mərhələlərini qeyd edir. Normal sınaq hesabatı mövcud olaraq qalır. Yalnız metadata üçün ayrıca qəbz hər bir faylın başlanğıcını və tamamlanmasını qeyd edir və 30 saniyəlik ürək döyüntüsü hələ də aktiv olan faylları və onların keçən vaxtını siyahıya alır. O, yalnız icazə verilmiş icra metadatasını qeyd edir; test təsvirləri, çıxış, xəta orqanları və tam mühit seriallaşdırılmır.

CI JSONL fayllarını `unit-progress-ci-<run>-<attempt>-<shard>` kimi saxlayır. İş vaxtı aşımı sonradan yükləmənin qarşısını ala bilər; artıq buraxılmış ürək döyüntüləri diaqnostik sübut olaraq qalır. Çatışmayan ürək döyüntüləri də bloklanmış və ya dayandırılmış qaçış prosesini əks etdirə bilər. Bu qəbzlər mövcud test seçimini, paralelliyi, son tarixləri və çıxış statusunu qoruyur; onlar namizəd-qəbul hökmləri deyil.

### Növbəni birləşdirin

`queue` etiketi Birləşdirmə növbəsinə (`.mergify.yml`) PR göndərir. Mergify `mergify/merge-queue/` filialında qaralama PR açır, CI orada tam seçimi həyata keçirir və `Gate / CI`, `Gate / Quality` və `Merge integrity (changelog + generated skills)` keçəndə orijinal PR birləşir.

Mergify öz növbə xülasəsini qaralamanın təsvirinə yazır. Body/title-only `pull_request` `edited` hadisələri icra üçün xüsusi paralellik qrupundan istifadə edir və təsnifatı, matrisləri sınaqdan keçirmir, bütövlük və ya qəbul qərarını birləşdirmir. Yalnız müşahidə üçün çek adları `Gate / CI` və ya `Gate / Quality` əvəz edə bilməz. Hədəf bazasını dəyişən redaktə namizədin yeni təsdiqini tələb edir.

Növbədən çıxdıqdan sonra təkan həmişə PR tələb etmir. Bu barədə `@mergifyio queue` şərh edin.

### Statik skan edilmiş inventar

Versiyalaşdırılmış npm-ləqəbli inventar və statik-skan üzvlüyü `config/quality/gate-manifest.json`-da canlıdır. Skript adlarını və dəqiq əmrləri `package.json` ilə təsdiqləmək üçün `npm run check:gate-manifest` işə salın; əlavələr, silinmələr və komanda sürüşməsi CI də həm yerli çəngəl, həm də dəyişdirmə təsnifat işlərində uğursuz olur. Ləqəb iş axını işi, matris nümunəsi və ya sınaq işi deyil: bu saylar bir-birini əvəz edə bilən kimi təqdim edilməməlidir.

Seçilmiş ləqəbləri icra etmədən yoxlamaq üçün `npm run quality:scan -- --list` və ya `npm run quality:scan:fast -- --list` istifadə edin. Qaçışçı npm giriş nöqtəsini çağırır, ona görə də onun işləmə vaxtı (konfiqurasiya edilmiş Bun daxil olmaqla) qorunur. Manifest həmin profillərdən kənar ləqəbləri ayrıca çağırılmış kimi qeyd edir və baxım əmrləri yalnız oxumaq üçün skan profillərində qadağandır.

Bu profillər yalnız statik skanı əhatə edir. Onlar məhsul testlərini, əhatə dairəsini, qablaşdırmanı, xarici yoxlamaları və ya namizədin tam buraxılış qəbulunu təsdiq etmir. İş axınının qəbulu əlaqəli `config/quality/admission-policy.json` və `scripts/quality/admission-verdict.mjs` dən istifadə edir. Buraxılış-müşahidəçi profilləri ayrı qalır; onların müvafiq çek və qəbzlərini müstəqil şəkildə yoxlayın. Tam müşahidəçinin statik əmrləri `audit:deps`, mutasiya testi seçimi və tərcümə yoxlamaları daxil olmaqla `config/quality/release-green-static-profile.json`-də elan edilir. Yükləyici npm əmrlərini package.json və modelləşdirilmiş CI/Quality bəyannamələrinə qarşı doğrulayır; o, arqument kimi qabıq işarələrini yerinə yetirmək əvəzinə drifti rədd edir. Tələb olunan skaner SKIP/INCOMPLETE çıxışı PASS qura bilməz. Profil öz xarici istisnalarını qeyd edir və yerləşdirilən əhatə dairəsini, sınaq matrislərini, paket və ya yerləşdirmə sübutlarını əvəz etmir. Aşağıdakı nəsr inventar bir istinaddır, bir qapının həqiqətən qaçdığını sübut etmir.

Skriptlər `scripts/check/` (siyasət qapıları) və `scripts/quality/` (ratchet engine) altında yaşayır. Həqiqətin CI mənbəyi `.github/workflows/ci.yml` dir.

### Nəşr edilmiş əsas sənədlərin sağlamlığı

`.github/workflows/i18n-base-health.yml` `main` və `release/v*` yə seçilmiş təkanlardan sonra və əl ilə göndərildikdə sənədlərin sağlamlığını müşahidə edir. Onun filtrləri sənədləri, kök Markdown, `llm.txt`, tərcümə state/configuration və müvafiq i18n alətlərini əhatə edir. Tək `Published base documentation health` işi hosted Ubuntu və beş dəqiqəlik son tarixdən istifadə edir. O, yalnız oxumaq üçün doğrulama həyata keçirir və asılılıq quraşdırma, tərcümə və ya dövlət qəbulu olmadan diaqnostik qəbz yazır.

`scripts/i18n/check-base-health.mjs` sıfır mənbə-hash, çatışmayan hədəf, hədəf-hash, köhnə tərcümə və bölmə-keş uyğunsuzluqlarını tələb edir. O, həmçinin cari əsas document/locale əhatə dairəsini və onun qeydə alınmış mənşəyini təsdiqləyir. Yanlış kontekst, natamam əhatə və ya kəsilmiş yoxlayıcı `INCOMPLETE` yaradır; təsdiqlənmiş sürüşmə `FAIL` yaradır. Hər ikisi uğursuz çıxış statusunu qaytarır. Qəbz SHA, iş axını, qaçış və cəhdin yoxlanılması ilə bağlıdır və `i18n-base-health-<sha>-<run>-<attempt>` kimi saxlanılır.

Bu nəşr olunan bazanın müstəqil müşahidəsidir. O PR və ya birləşmə qrupu hadisəsini, tələb olunan PR yoxlamasını, npm ləqəbini və ya statik skan profili üzvünü əlavə etmir. Əsas yoxlayıcı həmçinin mütləq rejimdə bütün beş sinfi bloklayır. Adi PR hazırlığı qəbuldan ayrı qalır. Uğurlu yükləmə uğursuz sağlamlıq nəticəsini PASS yə çevirə bilməz.

Adi PR `--baseline-evidence` tərəfindən yaradılan əsas hesabatla `--preflight` dən istifadə edir. O, ingilis mənbəsini yalnız tam tərcümə qeydi və faktiki hədəf baytları həmin dəqiq bazadan dəyişmədikdə gözləyə bilər. Yeni hədəf və ya bölmə keşi uyğunsuzluqları hələ də bloklanır və natamam sübutlar hazırlığa icazə verə bilməz. Hesabat `preparationPending` və `mergeReady` ayrıca ifşa edir: uğurlu hazırlıq gözlənilən tərcümələri birləşməyə hazır etmir. Qəbuldan əvvəl tərtib edilmiş namizəddəki təsirlənmiş güzgüləri yeniləyin. Etibarlı Mergify növbə namizədi, `merge_group`, filial təkanları və əl ilə CI qaçışları `--warn` və ya irsi uğursuzluq bağışlanması olmadan mütləq yoxlayıcıdan istifadə edir. Çatışmayan hədəf hashləri və silinmiş qeydə alınmış əsas fayllarla azaldılmış əhatə dairəsi uğurlu mütləq hökm çıxara bilməz.

### PR sürətli yolunu buraxın (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs də CI tamamlayır, `main` yə təkan verir, qrupları göndərir və birləşdirir. PRs yol süzgəcindən keçirilmiş sürətli yoxlamalardan istifadə edir. Daimi əlil olan dublikat quruluş silindi; real build/package/boot çekləri CI-də qalır. Vahid dəsti və vitest yalnız CI də (`Unit Tests (N/12)` və `Vitest`) işləyir.

| İş                                               | Əhatə dairəsi                                                                                                                                                                                                       | Bloklama                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API sənədlərin referansları və sənədlərin hamısı                                                                                                                                                     | Bəli                             |
| `Fast Quality Gates`                             | kodu PRs; statik yoxlamalar, tip yoxlanışı, tablosuna tip yoxlanışı, təsirli vahid testləri                                                                                                                         | Bəli                             |
| `Forgotten sibling tests`                        | kodu PRs; statik istehlakçılar və namizəd qardaş testləri üçün izlənilən modulları dəyişdirdi; barel və dinamik idxal yolları istinad edilən icazəli siyahı istisnaları ilə məsləhət diaqnostikası kimi bildirilir. | **Məsləhət**                     |
| `No new ESLint warnings`                         | kodu PRs; supressions-xəbərdar lint qoruyucu                                                                                                                                                                        | Bəli, çəngəllər də daxil olmaqla |
| `Merge integrity (changelog + generated skills)` | Qaralama olmayan PRs; dəyişiklik jurnalı və yaradılan bacarıq sinxronizasiyası                                                                                                                                      | Bəli, çəngəllər də daxil olmaqla |

#### Unudulmuş qardaş testləri hesabatı

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` -nin məsləhət addımı kimi işləyir və test-təsir xəritəsinin arxasında idxal həlledicisini təkrar istifadə edir. Hər dəyişdirilmiş istehsal modulu üçün, namizəd testi çəkilmə tələbi fərqində olmadıqda, deterministik `changed module/symbol -> static consumer -> candidate sibling test` zəncirləri haqqında məlumat verir. Markdown xülasəsi və JSON nəticəsi hər hansı bloklama yayımından əvvəl kalibrləmə üçün `forgotten-sibling-tests` iş axını artefaktı kimi saxlanılır.

Barelin təkrar ixracı və dinamik idxalı yalnız həlledici diaqnostikadır; onlar heç vaxt bloklayan tapıntı yaratmırlar. Nəzərdən keçirilmiş istisnalar `config/quality/forgotten-sibling-allowlist.json`-da yaşayır. Hər bir giriş istehlakçı və namizəd testini adlandırmalı, konkret əsaslandırma verməli və GitHub məsələsini əlaqələndirməlidir və ya sorğunu çəkməlidir. Səhv tərtib edilmiş girişlər bağlana bilmir. İstisnalar silinmiş namizəd testini və ya `.skip`/`.todo` əlavə edən fərqi sıxışdıra bilməz; təsdiqin zəifləməsi və digər maskalanma müstəqil olaraq bloklanan `check:test-masking` qapısına məxsus olaraq qalır.

### Vəzifə: `lint`

Hər PR dan `main` yə qədər işləyir. Bloklar uğursuzluqla birləşir.

| Skript (`npm run ...`)            | Doğrulayır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bloklama                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js versiyası dəstəklənən diapazondadır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bəli                                     |
| `check:cycles`                    | Bütün `src/` + `open-sse/` üzrə dövri idxal (AST əsaslı, tsconfig `paths` həll olundu). Hər hansı bir dövrə mövcud olduqda ( #15281 dən bəri uğursuz qapalı) 1-dən çılpaq çıxır və SCCs sadalayır. `check:cycles:ratchet` ( CI nə işlədir) sayı `quality-baseline.json` -da `metrics.cycles` tavanını aşdıqda bloklayır, — hazırda 14, `direction: down`, ona görə də yalnız düşə bilər (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli (ratchet)                           |
| `check:boundary`                  | `open-sse → src` birləşməsi: mühərrikdən proqrama unikal fayldan fayla idxal (`scripts/quality/measure-boundary.mjs`; kənar siyahı v4 core/module-split remediation backlogudur). Çılpaq = məsləhət hesabatı ( `quality:boundary` ilə eynidir). `check:boundary:ratchet` ( CI işlədiyi, həm də `quality.yml` sürətli qapılar ratchet döngəsində) hesablama `quality-baseline.json` — -da `metrics.boundaryOpenSseToSrc` tavanını aşdıqda bloklanır 771, `direction: down`; `--update` yalnız onu aşağı salır; baza-nisbi PRs (`--base-ref`, aşağıya baxın)                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli (ratchet)                           |
| `check:route-validation:t06`      | Zod sxemləri bütün marşrutlarda mövcuddur (Tier 6 siyasəti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bəli                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayı büdcəni keçmir (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                     |
| `check:provider-consistency`      | `providers.ts` dakı hər bir provayderin `providerRegistry.ts` də uyğun girişi var (və əksinə, icazə verilən siyahıda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bəli                                     |
| `check:model-lifecycle`           | Əl ilə saxlanılan üç marşrutlaşdırma cədvəli yoxlanılmış həyat dövrü snapshotına (#11503) uyğun olaraq qalır: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` istiqamətləndirə biləcəyi heç bir təqaüdçü identifikatoru hesab etmir; hər bir `BUILT_IN_ALIASES` hədəfi `REGISTRY` -də mövcuddur və təqaüdçü-id snapshot-da yoxdur; hələ də `REGISTRY` də olan hər bir təqaüdçü id `allowedRetiredInCatalog` də yönləndirilir və ya siyahıya salınır; və həmin anlıq görüntüdə heç bir `DEFAULT_DEGRADATION_MAP` mənbəyi və ya hədəfi təqaüdə çıxmış görünmür. Bu, bir modelə hazırda canlı yuxarı axının xidmət etdiyini sübut etmir. Offline —, `config/quality/model-lifecycle.json` ilə əl ilə yenilənmiş `npm run quality:refresh-model-lifecycle` ilə müqayisə edir (şəbəkə; CI-ə qoşulmayıb). `allowedRetiredInCatalog` yandırılmış cırcırdır: yalnız izləmə problemi olan giriş əlavə edin.                                                                                                          | Bəli                                     |
| `check:fetch-targets`             | Müştəri tərəfindəki `src/` də hər bir `fetch("/api/...")` real `route.ts` yə həll edir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bəli                                     |
| `check:deps`                      | Repodakı hər `package.json` üzrə bütün `npm install` -able depləri `dependency-allowlist.json` dədir; yeni açılmış və ya əyilmiş paketlər işarələnib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bəli                                     |
| `audit:deps`                      | bütün beş müstəqil kilid faylının npm auditi (kök, Electron, OpenCode plaginləri v1/v2 və provayder). Kritik məsləhətlər bloku; yüksək tövsiyələr görünən xəbərdarlıq olaraq qalır. Missing/failed auditləri INCOMPLETE və blokdur; əhatə dairəsi üzrə kilid hashləri və hesabatlar saxlanılır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                     |
| `check:lockfile`                  | `package-lock.json` integrity — https qeydiyyatı, bütövlük hashləri, host overrides yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                     |
| `check:licenses`                  | İstehsal asılılıqları üçün SPDX lisenziya icazə siyahısı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Bəli                                     |
| `check:tracked-artifacts`         | Quraşdırma artefaktları / icra edilmiş `node_modules` simvolik əlaqələri yoxdur (həmçinin husky pre-commit rejimində işləyir; pre-push qəsdən yüngül — #6716 dir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bəli                                     |
| `check:ai-attribution`            | yox AI/bot `Co-Authored-By` treyler və ya AI nəsli altbilgisi PR öhdəliyi, adı və ya orqanı — Sərt qayda #16 (də `quality.yml` fast-gates loop for PR→ `release/**` — hadisə yükünü oxuyur, qeyri-op off PRs — və yalnız PR üçün bir addım `ci.yml` üçün tük PR→ `main`; həm də husky `commit-msg` qarmaq; insan həmmüəlliflərə icazə verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Hər bir Vitest istisnası izləmə problemini adlandırır və `config/quality/vitest-exclusions.json` də (#13204) görünür                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bəli                                     |
| `check:file-size`                 | Mənbə fayllar ( `src/`, `open-sse/`, `electron/`, `bin/`-də `.ts`/`.tsx` ) `cap` daxilində və test faylları (`*.test.ts(x)`) `testCap` daxilində qalır; `file-size-baseline.json` də (`frozen` / `testFrozen`) dondurulmuş fayllar qeydə alınmış ölçüsündən kənara çıxmamalıdır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                     |
| `check:error-helper`              | executors/handlers -da səhv cavabları `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12) istifadə edir.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Bəli                                     |
| `check:migration-numbering`       | Miqrasiya SQL faylları ardıcıl olaraq nömrələnir, boşluqlar və ya dublikatlar yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bəli                                     |
| `check:public-creds`              | `publicCreds.ts` xaricində hərfi OAuth `client_id`/`client_secret` və ya Firebase Veb düymələri yoxdur (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bəli                                     |
| `check:db-rules`                  | `src/lib/db/` modullarından kənarda xam SQL yoxdur; `localDb.ts` dən barel idxalı yoxdur ( #2/#5 Sərt Qaydaları)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bəli                                     |
| `check:known-symbols`             | Təchizatçı icraçıları, marşrutlaşdırma strategiyaları və göndərmə cədvəllərində qeydə alınmış tərcüməçilər — diskindəki fayllarla uyğun gəlir, heç bir yetim və ya elan olunmamış simvollar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bəli                                     |
| `check:route-guard-membership`    | Uşaq prosesi yaradan hər bir marşrut `isLocalOnlyPath()` (Hard Rules #15/#17) tərəfindən təsnif edilir.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bəli                                     |
| `check:test-discovery`            | Repodakı hər bir `*.test.ts` / `*.spec.ts` faylı ən azı bir sınaqçı tərəfindən toplanır (ratchet: `test-discovery-baseline.json` -də yetimlərin siyahısı yalnız kiçilə bilər)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Bəli                                     |
| `check:test-tla-order`            | `tests/unit` altında heç bir `node:test` faylı testi qeydiyyatdan keçirmir, yüksək səviyyəli `await` yə çatır, sonra daha çox qeydiyyatdan keçir (#18045; ratchet: `test-tla-order-allowlist.json` yalnız kiçilə bilər)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bəli                                     |
| `check:agent-skills-sync`         | Yaradılmış agent bacarıqları artefaktları onların mənbə kataloquna uyğun gəlir (drift yoxdur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Provayder logos/assets qeydə alınmış mənbə qeydini daşıyır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | JSON konfiqurasiya faylları repo lint qaydalarını təhlil edir və təmin edir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Səhvsiz TypeScript tərtibi (yalnız məsləhət xəbərdarlıqları)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                     |
| `typecheck:noimplicit:core`       | Ciddi `noImplicitAny` — gələcəyə baxan; bir çox əvvəlcədən mövcud olan zəng saytlarının hələ də qeydlərə ehtiyacı var                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Məsləhət** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ( `src/app/(dashboard)/**` #7033 üçün əhatə olunmuş — `typecheck:core`-nin seçilmiş 27 fayldan ibarət icazələr siyahısına heç bir idarə paneli TSX daxil deyil və `next build` onu heç vaxt tip yoxlamır (`next.config.mjs` `ignoreBuildErrors: true` təyin edir ), ona görə də orada yetim identifikator reqressiyaları (#6625/#6909) CI üçün görünməz idi. Dondurulmuş per-file/per-TS-code hesabının əsas xəttinə qarşı fərqlər (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ilə eyni köhnəlmiş icra nümunəsi ) — yalnız əsas hesabdan kənar NEW xətaları qapını keçmir; əvvəlcədən mövcud xəta düzəldildikdə `--update` ilə aşağı salın.                                                                                                                                                                                                                                                                                                                          | Bəli                                     |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), səthi `typecheck:core`-nin 27 fayldan ibarət icazələr siyahısı və idarə paneli qapısı üzərindən bütün proqram istehsal növü yoxlanışı əhatə etmir. `config/quality/build-typecheck-baseline.json` yə qarşı fərqlər; yeni və ya yüksəldilmiş (fayl, kod) sayı uğursuz olarsa, aşağı sayı sizdən cırcırlamağı xahiş edir. `--force-regressions` qəbul edilmədikcə qaçış yeni və ya qaldırılmış cütdən ibarət olduğu halda `--update` imtina edir və `--force-nocheck` keçməyincə yeni susdurulmuş fayldan imtina edir, beləliklə, yaşıllıq əldə etmək üçün baza xəttini genişləndirmək və daimi sükut təmin etmək iki ayrı məqsədli hərəkətdir. Çılpaq bir `--force` rədd edilir. Həmçinin `config/quality/ts-nocheck-baseline.json` qarşı `@ts-nocheck` üçün qurma sahəsini skan edir, çünki ondan istifadə edən fayl heç bir diaqnostika barədə məlumat vermir və əks halda hər qapı üçün görünməz olacaq. | Bəli                                     |

#### İki tip yoxlama proqramı fərqli cavab verir

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) və `check:build-typecheck` müxtəlif seçimlər altında müxtəlif proqramlar tərtib edir və eyni fayl birində təmiz, digərində isə xətalarla dolu ola bilər.

`tsconfig.build.json` `"strict": false` təyin edir, ona görə də `noImplicitAny` söndürülür. Əsas konfiqurasiya daha sərt seçimlərlə seçilmiş 27 fayldan ibarət icazə siyahısını tərtib edir və hər bir girişin idxal qrafikini izləyir, buna görə də quraşdırma proqramında heç vaxt görünməyən fayllar hələ də orada yoxlanılır.

Nəticə faylın yazıldığını mühakimə edərkən əhəmiyyətlidir:**`check:build-typecheck` üzrə sıfır diaqnostika sıfır demək deyil** . 26 fayldan `@ts-nocheck` çıxarılması, qurma proqramında onlardan 23-nün təmiz olduğunu göstərdi; onlardan on altısı təxminən 120 gizli səhvlə üzləşdi - ciddi birində hər hansı bir səhv. Faylı təmiz adlandırmadan əvvəl hər ikisini yoxlayın.

### Vəzifə: `quality-gate`

`test-coverage` dan sonra çalışır. Bloklar uğursuzluqla birləşir.

| Skript                       | Doğrulayır                                                                                                                                             | Bloklama                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `quality:collect`            | `quality-metrics.json` yayır (ESLint xəbərdarlıq sayı, birləşdirilmiş parça hesabatından əhatə dairəsi)                                                | Bəli (ratchetdən yuxarı) |
| `quality:ratchet`            | `quality-baseline.json` -da hər bir metrik reqressiya olmayıb (ESLint xəbərdarlıqları ≤ bazası; əhatə dairəsi ≥ bazası)                                | Bəli                     |
| `check:duplication`          | Kodun təkrarlanması (jscpd@4) `quality-baseline.json`-da əsas xətti keçmir                                                                             | Bəli                     |
| `check:complexity`           | Fayl səviyyəli siklomatik mürəkkəblik həddi keçmir (əsas ESLint `complexity` + `max-lines-per-function`)                                               | Bəli                     |
| `check:cognitive-complexity` | Koqnitiv mürəkkəblik cırcırcığı (`eslint-plugin-sonarjs`) — ayrı ESLint keçidi; CI hər ikisi tək `check:complexity-ratchets` addımı kimi birləşdirilir | Bəli                     |
| `check:dead-code`            | İstifadə edilməmiş ixrac/fayllar cırcır (knip) bazaya nisbətən geri qalmır                                                                             | Bəli                     |
| `check:compression-budget`   | Sıxılma benchmark büdcəsi — hər mühərrik üçün token qənaət mərtəbələri geriləməməlidir                                                                 | Bəli                     |
| `check:type-coverage`        | Faiz tipli ratchet (`type-coverage`) reqressiya etmir; əsasən `typecheck:noimplicit:core` əhatə edir                                                   | Bəli                     |

### Vəzifələr: `codeql-scan` və `codeql-admission`

`codeql-scan` bütün konfiqurasiya edilmiş analiz kateqoriyalarını istehsal edir. Bu iş uğurla başa çatdıqdan sonra `codeql-admission` onun dəqiq yükləmələrini və namizəd xəbərdarlığını təsdiqləyir. Hər ikisi yalnız sənəd namizədləri daxil olmaqla, `Gate / CI`-nin tələb olunan asılılıqlarıdır. İnzibati aktivləşdirmə və kanareyka tələbləri aşağıda "CodeQL ratchet" altında təsvir edilmişdir.

| Skript                 | Doğrulayır                                                                                                                                                                                             | Bloklama |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:codeql-ratchet` | Namizəd ref/SHA və bütün konfiqurasiya edilmiş analiz kateqoriyaları xəbərdarlıq siqnalından əvvəl cari olmalıdır; itkin sübut blokları. Qlobal inventar ayrı qalır — aşağıda "CodeQL ratchet"-ə baxın | Bəli     |

### Vəzifə: `quality-extended`

İş uyğun namizədləri bloklayır. Paket ölçüsü, gizli tapıntılar, zəiflik tapıntıları, iş axını tapıntıları və OpenAPI dəyişiklikləri tələb olunan cırcırlarla yoxlanılır. Dairəvi asılılıq diaqnostikası məsləhət xarakteri daşıyır. Skaner quraşdırılması tələb olunur: `scripts/ci/install-quality-scanners.sh` bərkidilmiş versiyaları təmin edir və quraşdırma uğursuzluqlarını təbliğ edir. Çatışmayan alətlər, etibarsız hesabatlar və ya çatışmayan əsas xətlər tələb olunan INCOMPLETE skaner qapısını tərk edir.

| Skript                   | Doğrulayır                                                                                                                                                                                                                   | Bloklama                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:circular-deps`    | Dairəvi asılılıq yoxdur (dpdm)                                                                                                                                                                                               | **Məsləhət**                                        |
| `check:bundle-size`      | Paketin ölçüsü qapaqdan çox deyil; mövcud olmayan ölçmə uğursuz olur                                                                                                                                                         | **--ratchet ilə bloklama**                          |
| `check:secrets`          | Gitleaks tapıntıları geri çəkilmir; tələb olunan skanlar çatışmayan tools/source/baseline, uğursuz skanları və etibarsız hesabatları rədd edir                                                                               | **--ratchet ilə bloklama**                          |
| `check:vuln-ratchet`     | Asılılıq zəiflikləri geri çəkilmir; tələb olunan skanlar çatışmayan alətləri, etibarsız hesabatları və ya çatışmayan əsas xətləri rədd edir                                                                                  | **--ratchet ilə bloklama**                          |
| `check:workflows`        | İş axını linti (actionlint + zizmor); missing/broken skanerləri, etibarsız hesabatlar və ya çatışmayan ratchet bazası INCOMPLETE kimi uğursuz olur. Etibarlı tapıntılar seçilmiş strict/advisory/ratchet siyasətinə uyğundur | İcra tələb olunur; CI da zizmor ratchet bloklanması |
| `check:openapi-breaking` | Saxlanmış hadisə öhdəliyinə qarşı ictimai API müqaviləsi (PR birləşmə bazası, əvvəl təkan, birləşmə qrupu bazası; scheduled/manual yoxlaması ilk valideyn); tələb olunan ölçmə uğursuz bağlandı                              | **--ratchet ilə bloklama**                          |

### Vəzifə: `docs-sync-strict`

`main` və ya `release/**` yə cəlbetmə sorğuları üçün bu iş yalnız sənədləşmə və ya kod dəyişiklikləri kimi təsnif edilmiş qaralama olmayan (və ya etibarlı növbə) namizədlər üçün işləyir. O, həmçinin qeyri-PR CI hadisələri üzərində işləyir; bu iş axınının təkan triggeri `main` deyil, yalnız `release/**`-ni əhatə edir. Sıfırdan fərqli çıxan addım işi bloklayır; yalnız hesabat xarakterli tapıntılar və aşağıda sənədləşdirilmiş istisnalar yoxdur.

| Skript                         | Doğrulayır                                                                                                                                                                                                                                                                                                                                                                                                                         | Bloklama                                                                                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Aşağıdakı 7 alt qapını ardıcıl olaraq idarə edən meta-qapı                                                                                                                                                                                                                                                                                                                                                                         | Bəli                                                                                                                                                  |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG versiyasının uyğunluğu, dəqiq `llm.txt` güzgüləri, tərcümə edilmiş CHANGELOG section/size invariantları və əvəz edilmiş dublikat sənədlərin olmaması                                                                                                                                                                                                                                                     | Bəli                                                                                                                                                  |
| ↳ `check:docs-frontmatter`     | Tərtib edilmiş sənədlər səhifələrində etibarlı ön material başlıqları var                                                                                                                                                                                                                                                                                                                                                          | Bəli                                                                                                                                                  |
| ↳ `check:docs-counts`          | Yüksək inamlı sayma invariantları sərtdir; Evristik fayl sayı yoxlamaları yalnız skript `--strict` qəbul etmədiyi halda xəbərdarlıq edir ( CI meta-qapısı onu keçmir)                                                                                                                                                                                                                                                              | Ciddi səviyyəli bloklama; yumşaq səviyyəli məsləhət                                                                                                   |
| ↳ `check:env-doc-sync`         | Mənbə env oxuyur, `.env.example` və `docs/reference/ENVIRONMENT.md` açıq-aşkar yox sayma, yalnız sənəd və yalnız env üçün icazə siyahılarından sonra razılaşır                                                                                                                                                                                                                                                                     | Bəli, sənədləşdirilmiş icazə siyahıları xaricində                                                                                                     |
| ↳ `check:deprecated-versions`  | Təhlükəsiz tarixi kontekstlər və köhnəlmiş yeniləmə tarixləri xaricində potensial köhnə versiyalar barədə məlumat verir, nəzərə alınmayan sənədlər istisna olmaqla                                                                                                                                                                                                                                                                 | Cari CI naqillərində məsləhət (`--strict` keçilməyib)                                                                                                 |
| ↳ `check:doc-links`            | Sənədlərdəki daxili işarələmə bağlantıları real fayllara həll olunur (`[text]`/`(path)` forması)                                                                                                                                                                                                                                                                                                                                   | Bəli                                                                                                                                                  |
| ↳ `check:fabricated-docs`      | Marşrutlar, env vars, CLI əmrləri, çəngəl adları və sənədlərdə göstərilən fayl yolları kod bazasında mövcuddur. `--strict` vasitəsilə sərt qapı; bayraqsız soft-fail.                                                                                                                                                                                                                                                              | Bəli ( CI də `--strict` vasitəsilə)                                                                                                                   |
| `check:cli-i18n`               | İstifadə olunmuş CLI `t()` açarları `en`-də mövcuddur; `pt-BR` hər bir yüksək səviyyəli bölməni saxlayır; `zh-CN` və `zh-TW` `en` dən hər bir açarı ehtiva edir                                                                                                                                                                                                                                                                    | Bəli                                                                                                                                                  |
| `check:openapi-coverage`       | OpenAPI spesifikasiyası ən azı real marşrutların cızıqlanmış mərtəbəsini əhatə edir                                                                                                                                                                                                                                                                                                                                                | Bəli                                                                                                                                                  |
| `check:openapi-security-tiers` | Elan edilmiş `x-loopback-only`/`x-always-protected` annotasiyaları `routeGuard.ts` tərəfindən dəstəklənməlidir; təhliledici və irəli uyğunsuzluqlar bloku. Yalnız yerli prefikslər altında çatışmayan `x-loopback-only` nin əks yoxlanışı xəbərdarlıq edir və yalnız naxışlı marşrutlar bu əks keçiddən çıxarılır.                                                                                                                 | Parser/forward bloklanmasını yoxlayır; əks yoxlama məsləhəti                                                                                          |
| `check:openapi-routes`         | `openapi.yaml` -də hər bir `/api...` yolu əsaslandırılmış `KNOWN_STALE_SPEC` icazə siyahısından sonra parametrə həssaslıqla real marşruta həll edir; köhnə icazəli siyahı girişləri də uğursuz olur                                                                                                                                                                                                                                | Bəli                                                                                                                                                  |
| `check:docs-symbols`           | Kanonik güzgü olmayan sənədlərdəki daxili `/api/...` URL istinadları real marşrut və ya marşrut ailəsinə həll edilir; proxy/upstream/placeholder/file arayışları və əsaslandırılmış `KNOWN_STALE_DOC_REFS` qeydləri xaric edilir və köhnə icazəli siyahı girişləri uğursuz olur                                                                                                                                                    | Bəli                                                                                                                                                  |
| `i18n translation drift`       | Mütləq qəbul sıfır mənbə, çatışmayan hədəf, hədəf-hash, köhnə tərcümə və bölmə-keş uyğunsuzluqlarını tələb edir. Adi PR hazırlığı dəqiq irsi sübutları və ya dəyişməz tam vəziyyət və hədəf baytları ilə yalnız ingilis dilində gözlənilən dəyişikliyi saxlaya bilər; onun hesabatı ayrıca birləşməyə hazır olduğunu bəyan edir. Çatışmayan hədəf hashləri və natamam əsas sübut bloku. Olmayan köhnə bölmə keşi uğursuzluq deyil. | Bütün beş sinif queue/base qəbulunu bloklayır; adi hazırlıq yalnız sübut edilmiş miras qalmış və ya yalnız ingilis dilində gözlənilən işə icazə verir |

`docs/diagrams/` altında on iki README SVGs yaradılır (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` onların hamısını bərpa edir). Hər birinin bayt-müqayisə vahidi testi (`tests/unit/docs/readme-*-svg.test.ts`, iş `test-unit`) var ki, bu, təhvil verilmiş fayl köhnə olduqda uğursuz olur və `check:docs-counts` onların `<text>` qovşaqlarından — dən kanonik nömrələri oxuyur, buna görə də təsvir addımı faylda göstərilən hər bir sətiri görünməz `<text>` kimi saxlayır. SVG kanonik nömrələri yoxlanışı `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) -də sadalanan faylları oxuyur : `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, üstəgəl `public/images/tier-flow-dark.svg` və `tier-flow-light.svg`; pulsuz-əbədi, kataloq-giriş, təkrarlanan-hovuz və qol faktorları iddiaları da `promise-pillars.svg`, `free-tier-budget.svg` və `strategies-grid.svg`. `free-tier-budget.svg` öz rəqəmlərini canlı kataloq yükləyicisindən çəkir, ona görə də `FREE_MODEL_BUDGETS` ya və ya provayderin displey adına dəyişiklik həmin fayl bərpa olunana qədər CI qırmızı rəngə çevirir.

### Vəzifə: `i18n-ui-coverage`

| Skript                            | Doğrulayır                                                                                                                                                                                 | Bloklama     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `check-ui-keys-coverage` (daxili) | UI i18n əsas əhatə dairəsi ≥ 65% təşkil edir                                                                                                                                               | Bəli         |
| `check-ui-value-drift` (daxili)   | Yenidən yazılmış ingilis dili **dəyər** geridə heç bir köhnəlmiş tərcümə qoymur                                                                                                            | Bəli         |
| `check-new-key-coverage` (daxili) | A **yeni** İngilis açarı hər — dilinə tərcümə edilir və `__MISSING__:` markeri rədd edilir                                                                                                 | Bəli         |
| `check-translation-ratio`         | Yerli dil üzrə real tərcümə nisbəti (icazə siyahısından kənarda eyni-ingilis dili / yer tutan / itkin yarpaqlar) `config/quality/i18n-translation-baseline.json` + boşluğunu keçməməlidir. | **Bloklama** |

`fetch-depth: 0` — lazımdır dəyər-drift qapısı birləşmə bazasına qarşı `en.json` fərqləndirir.

#### `check-ui-value-drift` — köhnəlmiş tərcümə qapısı

Digər qapıların struktur olaraq görə bilmədiyi bir i18n reqressiyasını tutur: İngilis dəyəri yenidən yazılır və _əvvəlki_ İngilis dilindən alınan tərcümələr geridə qalır, beləliklə qeyri-ingilis istifadəçilər əminliklə yazılmış, indi səhv olan surəti oxumağa davam edirlər.

Bu real olaraq göndərildi. Antigravity giriş köməkçisi eniş zamanı `oauthModal.googleOAuthWarning` yenidən yazılmışdır (#5203);**43 yerdən 39-u** operatorlara "tam URL ni kopyalayın və aşağıya yapışdırın" deyən mətni saxladı — həmin provayder üçün tamamlaya bilməyən bir axın. #8463 qədər diqqətdən kənarda qaldı, çünki:

- `sync-ui-keys` yalnız açarları doldurur **yox** , heç vaxt olanlar **köhnəlmiş** ;
- `check-ui-keys-coverage` əsas _mövcudluğu_ hesablayır, buna görə də köhnə tərcümə əhatə olunduğu kimi qiymətləndirir;
- `check-translation-drift` `docs/i18n/<locale>/**.md` sənədlərini izləyir — `src/i18n/messages/*.json` vaxt oxumur. 2026-09-cu ilin yenidən sinxronizasiyasından bəri `docs-sync-strict` işinin bloklanması: → `npm run i18n:run -- --files=<doc>` əsas sənədini redaktə edin (bölmə səviyyəsində, ucuz).

**Fərqlilikdən xəbərdardır, bazaya əsaslanmır.** O, birləşmə bazasında `en.json` işləyən ağacla müqayisə edir; İngilis dili dəyəri dəyişən hər bir açar üçün hələ də toxunulmamış tərcüməsi olan hər hansı bir dil köhnəlmişdir. Bu qəsdən **əvvəllər mövcud olan borcları dondurur** — a diff uzun müddət davam edən tərcümənin hansı köhnə ingilis dilindən gəldiyini aşkar edə bilməz, buna görə də qapı yalnız cari dəyişikliyin nəyə toxunduğunu mühakimə edir. Alternativ (hər açar hash bazası) hər i18n PR-də çalxalanan ~ 600 KB faylına, 3 × ən böyük mövcud bazaya başa gələcəkdir.

Onu qane etməyin iki yolu:

1. təsirə məruz qalan tərcümələri yeniləyin və ya
2. onları iş vaxtını `__MISSING__:<new english>` — olaraq təyin edin, sonra düzəliş edilmiş ingilis dilini (`src/i18n/request.ts::deepMergeFallback`, #7258) və tərcümə üçün əsas növbələrə xidmət edir.

Əgər simli **məna** dəyişdirmək, üstünlük vermək **açarın adının dəyişdirilməsi** : yeni açar köhnə tərcüməni miras ala bilməz. Bu, #8463 istifadə etdiyi nümunədir.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Dəyər sürüşməsi və yeni açar qapıları `scripts/i18n/resolve-ui-diff-base.mjs` dan bir dəyişməz müqayisəni bölüşür. İş axını hər iki yoxlamaya eyni baza, əsas tip və namizəd SHAs keçir. PR/base-retarget, təkan və birləşmə qrupları öz hadisə kontekstindən istifadə edir. Namizəd filialının göndərilməsi onun dəqiq açıq PR və ya açıq `i18n_base_sha` girişini tələb edir. Bu daxiletmə olmadan `main` və ya `release/vX.Y.Z` nin göndərilməsi və ya planlaşdırılmış müşahidəsi sonuncu öhdəliyi onun birinci valideyni ilə müqayisə edir; bu, bütün miras qalmış tərcümə borcunun auditi deyil. Yerli çağırış üçün aydın müqayisə bazası tələb olunur, məsələn, yuxarıdakı `BASE_REF` əmri.

Çatışmayan və ya qeyri-müəyyən müqayisə konteksti, oxunmayan və ya etibarsız tələb olunan kataloq və dəyişdirilmiş namizəd çıxış kodu ilə `INCOMPLETE` yaradır **2** , o cümlədən xəbərdarlıq rejimində. Kataloq oxu `scripts/i18n/read-ui-catalog.mjs` istifadə edir; oxunmuş nasazlıqlar boş obyektlərlə əvəz edilmir. Nə əlçatan olmayan baza, nə də natamam giriş PASS təyin etmir.

### Vəzifə: `i18n`

Tam i18n doğrulama matrisi (hər yerli üçün bir iş). Bütün iş məsləhətdir.

| Skript                          | Doğrulayır                | Bloklama                                                |
| ------------------------------- | ------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | Yerə görə tərcümə tamlığı | **Məsləhət** (Bütün iş üzrə `continue-on-error: true` ) |

### Vəzifə: `pr-test-policy`

Yalnız çəkmə sorğuları üzərində işləyir.

| Skript                 | Doğrulayır                                                                                                                                   | Bloklama |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` və ya `bin/` -də istehsal kodunu dəyişdirən PRs testləri daxil etməli və ya yeniləməlidir (Zərin Qayda #8)  | Bəli     |
| `check:test-masking`   | Dəyişdirilmiş test faylları xalis təsdiq sayını azaltmır və ya `assert.ok(true)` tautologiyalarını əlavə etmir                               | Bəli     |
| `check:pr-evidence`    | PR orqanı dəyişiklik üçün test/VPS sübutlarına istinad edir ( PR nəsri — kövrək grepping ilə Hard Rule #18 mexanikləşdirir, Backlog-a baxın) | Bəli     |

### Vəzifə: `test-vitest`

`changes` təsnifat işinə ehtiyacı var. Tətbiq olunan matris parçaları bloku uğursuzluqla birləşir.

| Suite            | Doğrulayır                                            | Bloklama                                                                                                                                |
| ---------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alət), autoCombo, keş — vitest runner | Bəli                                                                                                                                    |
| `test:vitest:ui` | UI komponenti — vitest koşucusunu sınaqdan keçirir    | **Bloklama** — `vitest.config.ts` əvvəlcədən mövcud olan uğursuzluqlar açıq şəkildə istisna olunur; yeni uğursuzluqlar işi uğursuz edir |

### Gecə iş axınları (planlı, məsləhət)

Bunlar cron cədvəlində (və `workflow_dispatch`) işləyir, heç vaxt PRs də deyil. Hamısı məsləhətdir.

| İş axını               | Doğrulayır                                                                                                                                                                      | Bloklama     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | təsadüfi toxum + yüksək qaçış sayı ilə əmlak testlərini sürətli yoxlayın                                                                                                        | **Məsləhət** |
| `nightly-resilience`   | yığın-böyümə qapısı, xaos nasazlığı-injection, k6 load/soak                                                                                                                     | **Məsləhət** |
| `nightly-llm-security` | promptfoo injection mühafizəsi (blok rejimi) + qara zondları (provayder sirri olmadan atlanır)                                                                                  | **Məsləhət** |
| `nightly-schemathesis` | `docs/openapi.yaml` — səthlərinin spesifik pozuntuları / idarə olunmayan 500s (Fase 8 B.4) istifadə edərək canlı OmniRoute yə qarşı OpenAPI müqaviləsinin tündləşməsi (sxeması) | **Məsləhət** |
| `nightly-mutation`     | Sürətli vahid zolaqlı — üzərində Stryker mutasiya testi balı, sağ qalan mutantların səthi zəif təsdiq edir.                                                                     | **Məsləhət** |
| `nightly-compat`       | Dəstəklənən `engines.node` diapazonlarında qovşaq mühərrik uyğunluğu matrisi                                                                                                    | **Məsləhət** |

Performansın əsas göstəriciləri (yığın, TTFB, qurulma vaxtı) qeyd olunur, qapalı deyil: bax [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

### CodeQL ratchet: namizəd qəbulu və anbar inventar

CI açıq asılılıq zənciri vasitəsilə namizəd CodeQL qəbuluna sahibdir: `codeql-scan` `codeql.yml` də dörd dilli matrisa çağırır, sonra `codeql-admission` `node scripts/check/check-codeql-ratchet.mjs --candidate` idarə edir. `Gate / CI` hər iki nəticəni tələb edir. Keyfiyyət öz rəqəmsal yoxlamalarını saxlayır, lakin istehsalçı bitirməmişdən əvvəl skanerdən sorğu keçirmir; Təkcə `Gate / Quality` tam namizəd qəbulu deyil. CodeQL yalnız sənədləri olan namizədlər üçün tələb olunur.

`config/quality/codeql-admission-policy.json` -dakı siyasət Fəaliyyətlər, C/C++, JavaScript/TypeScript və Python, sorğu paketinin defoltunu, uzaq təhlükə modelini və qurma rejimini heç birini seçmir. İstehsalçının əvvəlcədən uçuşu gözlənilən aktivasiya qeydini rədd edir və açıq hədəf siyahısından kənar filialları ayırır. Cari hədəflər əsasdır və release/v3.8.54. Müqavilə testləri bu sonlu siyahı və texniki xidmət təkan tetiğini paket versiyası ilə müqayisə edir; növbəti buraxılış onboarding nəzərdən keçirilməlidir. CI-nin mövcud daha geniş buraxılışlı PR triggeri saxlanılır, lakin boşaldılmamış hədəf ölçülməmiş PASS əldə etmək əvəzinə hasilatdan əvvəl HOLD bildirir.

Hər bir matris işi öz faktiki SARIF yükləmə ID, dil, kateqoriya, qaçış və cəhd, zəng edənin iş prosesinin şəxsiyyəti, hadisə ref/head/base/merge SHA və siyasət hashini qeyd edir. Asılı iş yalnız bu qaçışın qəbzlərini endirir və artefakt həzmlərini təsdiqləyir. Bu, dörd kateqoriyanın hamısını, uğurlu istehsalçını və hər bir dəqiq yükləmənin tamamlanmasını tələb edir. O, filialda tapılan ən son analizdən deyil, API-nin sarif_id filtrindən istifadə edir. Qismən təkrar yarışlar eyni yarışın və namizədin əvvəlki cəhdinin uğurlu kateqoriyalarından təkrar istifadə edə bilər, nəticə çıxaran cəhdi qoruyub saxlaya bilər; uğursuz cari istehsalçı əvvəlki yaşıl sübutları təkrar istifadə edə bilməz.

CodeQL əməliyyatı emal üçün gözləyir, lakin onun bərkidilmiş icrası xəbərdarlıq edə bilər və status oxunarkən uğursuzluq və ya tükənmiş gözləmədən sonra davam edə bilər. Beləliklə, qəbul prosesi yenidən yoxlayır. Çatışmayan kateqoriyalar, gözlənilən emal, uğursuz və ya ləğv edilmiş işlər, köhnə identifikasiya, natamam səhifələşdirmə və ya əlçatmaz APIs HOLD yaradır və 2-dən çıxış edir. Müstəqil skaner iş axını üçün sabit gözləmə qalmır. Skan edilməmiş PR keçə bilməz, çünki xəbərdarlıq sorğusu 0 qaytardı. `metrics.codeqlAlerts.value` dən yuxarı ölçülmüş say 1-dən çıxır; digər filialın xəbərdarlıqlarını qəbul etmək üçün əsas xətt qaldırılmır. [Yükləmə statusu və təhlil axtarışı](https://docs.github.com/en/rest/code-scanning/code-scanning).

Qəbz qeydləri IDs, kateqoriyalar, alət versiyaları, ref/SHA, əsas və xəbərdarlıq nömrələrini yükləyir və təhlil edir. SARIF identity/result sayı, minimum qayda sayları və dəqiq xəbərdarlıq nümunələri məcburi olaraq qalır. PR/analysis şəxsiyyətləri qəbul etməzdən əvvəl yenidən yoxlanılır. Bu yoxlamalar hər çıxarılan mənbə faylının inventarını deyil, konfiqurasiya edilmiş kateqoriya əhatə dairəsini yaradır. C/C++ no-build hasilatı layihənin qurulması zamanı yaradılan kodu daxil etmir. Mənbə istisnaları hələ də nəzərdən keçirilməlidir və ianəçi atributunun müqayisəli dəqiq əsas sübutu lazımdır.

`codeql-maintenance.yml` PR/main istehsalçılarını təkrarlamadan aktiv buraxılışlı təkan skanları və həftəlik cədvəli təmin edir. `nightly-codeql-inventory.yml`, `--strict-measurement` və ölçmə mümkün olmadıqda uğursuzluqla birlikdə repozitoriya miqyasında baza xəttini ayrı saxlayır. Yerli miras kolleksiyaçısının zərif atlaması namizəd qəbulu deyil. Təsdiqlənmiş aşağı qlobal sayından sonra sərtləşdirmə açıq bir `--update` olaraq qalır.

Defolt Quraşdırma konfiqurasiya edilərkən Qabaqcıl iş axını dərc edilməməlidir: GitHub bu kombinasiyanı rədd edir. Nəzərdən keçirilmiş inzibati keçid yenidən oxunana qədər onun versiyalı siyasəti gözləmədə qalır. Nəşrdən əvvəl operator anbarı, head/base/tree, policy/patch/rollback heşlərini və müşahidə olunan quraşdırma vəziyyətini sancaqlar; `node scripts/quality/codeql-producer.mjs verify-admin-readback` təmin edilmiş gözlənilən və faktiki JSON qeydlərini yoxlayır. Bu, texniki qoruyucudur, operatorun təsdiqi və ya təzə oxunuşların alınması üçün əvəzedici deyil. PR nişanı heç vaxt Administrasiyaya giriş tələb etmir. Yayımlanma və hər hansı skaner dəyişikliyi ayrıca oxunuş və real PR, çəngəl və birləşmə qrupu uyğunluğu sübutunu tələb edir.

Çəngəllər hosted runners, davamlı etimadnaməsi olmadan yoxlama, istehsalçıda heç bir layihə install/build və miras qalmış anbar sirlərindən istifadə edir. GitHub azaldılmış çəngəl nişanı ilə pull_request hadisəsi üçün SARIF yükləməsini dəstəkləyir; ilk dəfə töhfə icrasının təsdiqi GitHub siyasəti olaraq qalır. Etibarsız kodu icra etmək üçün heç vaxt pull_request_target istifadə etməyin. Miqrasiyanın tamamlandığını hesab etməzdən əvvəl faktiki nişan icazələrini, analiz_açarını və idarə olunan kanareykadakı bütün kateqoriya mühitlərini təsdiqləyin. [Çəngəllə yükləmə qaydaları](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [ziddiyyətli quraşdırma rejimləri](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**İşdən çıxarılmalar operatorun çağırışıdır (Hard Rule #14)** — işdən çıxarılma şərhində texniki əsaslandırma qeyd etmədən heç vaxt CodeQL xəbərdarlığını rədd etmir: yuxarı axın-protokol tələbi üçün `won't fix`, sınaq qurğusu üçün `used in tests`, `false positive` təmizləyici üçün CodeQL görə bilmir (presedent: `docs/security/ERROR_SANITIZATION.md`).

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

**Yuxarıda həmçinin sənədləşdirilməyənlər** (məsləhətçi, zəif siqnal): `docs-lint` işi (markdownlint + Vale, bütün iş `continue-on-error`) və müstəqil `semgrep.yml` / `scorecard.yml` skaner axınları. CodeQL artıq yuxarıdakı aktivləşdirmə tələblərinə uyğun olaraq `Gate / CI` daxilində məcburi istehsalçı və qəbul işlərinə malikdir. `semgrepFindings: 0` `quality-baseline.json` daxilindədir, amma `ci.yml` daxilində bloklayıcı geriləməmə həddinə qoşulmayıb — metrik hazırda əlaqəsizdir.

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
