# Release-Green: candidate validation and evidence (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green xüsusi öhdəliyi müşahidə edir və onun təsdiqləmə nəticələrini bildirir. [Keyfiyyət Qapıları arayışı](../architecture/QUALITY_GATES.md) cari CI profillərini, tələb olunan yoxlamaları və qəbul siyasətini müəyyən edir. `config/quality/admission-policy.json` də versiyalı qəbul siyasəti `Gate / CI` və `Gate / Quality` üçün icra edilə bilən müqavilədir.

## CI və müşahidəçi əhatə dairəsi

`ci.yml` və `quality.yml` sorğuları əsas və buraxılış filiallarına çəkir. Seçilmiş profil hansı işlərin tətbiq olunduğunu müəyyən edir. Tam CI həmçinin adi çəkmə sorğusunun yerinə yetirilmədiyi zolaqları da əhatə edir. Sürətli müşahidəçi nəticəsi bu işləri əvəz edə bilməz və tamamlanmış iş axını paketi onun qəbzlərini əvəz edə bilməz.

İstehsal quruluşu CI ya məxsusdur. `quality.yml` də dublikat məsləhət quruluşu yoxdur. Çatışmayan artefaktlar, ləğv edilmiş iş və natamam ölçmələr uğurlu tələb olunan yoxlamanı yaratmır. Nəticələri qəbul etməzdən əvvəl cari bazanı, rəhbəri və birləşmiş namizədi təsdiqləyin.

## Yerli doğrulama

Asılılıqları hazırladıqdan sonra müşahidəçini sahib olduğu iş ağacında işə salın. Ağır yoxlamadan əvvəl `docs/ops/WORKTREE_ISOLATION.md` -da iş ağacı və resurs protokoluna əməl edin.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Sürətli profil qisməndir. Tam profil onun modelləşdirilmiş tələblərini yoxlayır və əmr daxilolmalarını qoruyur; o, yerləşdirməni təsdiqləmir və ya müvafiq hosted çekləri əvəz etmir. Hesabat icra uğursuzluğunu metrik sürüşmədən fərqləndirir. Tələb olunan tıxaclar seçilmiş siyasətə uyğun olaraq bloklanır. Yalnız keçici bir nəticə əldə etmək üçün baza səviyyəsini yüksəltməyin.

## Gecə və əllə süpürmə işləri

Gecə buraxılışı və uyğunluq həllediciləri kanonik buraxılış filialı seçirlər. Bu seçim iş axınına səbəb olan filiala uyğun olmalıdır və paketlər hadisənin dəyişməz SHA istifadə edir. Əllə icra etmək üçün, `release_branch` də nəzərdə tutulan buraxılışı seçin və həmin istinadda göndərin:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Seçilmiş kodu icra etməzdən əvvəl filiallararası göndəriş rədd edilir. Yerləşdirilmiş əsas dəstlər `main` yoxlayın və quraşdırmadan əvvəl SHA nin hələ də həll edilmiş hədəfə uyğun olduğunu yoxlayın. Qətnamə zamanı əsas hərəkət edərsə, yeni öhdəliyin natamam taramasını təkrar edin. Fərqli namizədlərdən gələn qəbzləri birləşdirməyin.

## Uğursuzluq triajı və bərpası

Hadisəni diaqnostik göstərici kimi istifadə edin, sonra dəqiq qaçışı, cəhdi, uğursuz addımı və artefaktı yoxlayın. Uğursuzluğu töhfə verənə aid etməzdən əvvəl ekvivalent baza və namizəd sübutlarını müqayisə edin. İnfrastruktur xətaları, irsi qüsurlar, namizədlərin reqressiyaları və gözlənilən təsdiqlər müxtəlif vasitələr tələb edir.

`/green-prs`, `/sweep-reds`, `/validate-release-green` və `/babysit` bacarıqları sübutlar toplayır və sənədləşdirilmiş əhatə dairəsi daxilində düzəlişlər hazırlayır. Səlahiyyətli birləşmədən əvvəl ianəçi kreditini saxlayın, təcrid olunmuş təmir filiallarından istifadə edin və bütün tələb olunan yoxlamaları yoxlayın. Heç bir avtomatik rebaseline və ya insident bağlanması keçən cari namizədi əvəz etmir.
