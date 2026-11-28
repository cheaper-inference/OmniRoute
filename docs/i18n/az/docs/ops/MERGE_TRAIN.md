# Merge Queue & Manual Merge-Train Runbook (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Buraxılış filialına enmə

Omni-növbə `release/vX.Y.Z`-ya enişləri idarə edir. PR endirməzdən əvvəl defolt filialda `config/merge-queue/config.json` -də ən yüksək səviyyəli `mode` oxuyun. [Omni-Növbəyə](OMNI_QUEUE.md) baxın.

- **`shadow`** doğrulamanı həyata keçirir və enişi əl ilə birləşməyə buraxır. Təsdiq edilmiş PR `omni-queue` son başlığında tətbiq edin. `npm run queue -- why <PR>` ilə uyğunluğu yoxlayın. `npm run queue -- history --base <branch>`-da o başın hökmünü gözləyin. `would-land` ilə davam edin. `culprit-found` və ya `would-dequeue` da birləşməni saxlayın və səbəbi düzəldin.
- **Kölgə istisnaları.** Cari əsas ucuna qarşı yaşıl tam CI olan qatar ayrıca növbə hökmü olmadan davam edə bilər. Eyni istisna, PR başlığı artıq cari əsas ucunu ehtiva etdikdə tətbiq edilir.
- **`live`** enişi işə salmaq üçün `omni-queue` etiketindən istifadə edir. Növbə tək başına PR yerə düşür. Birləşmə əmrlərini və növbəyə birbaşa itələmələri buraxın.

Hər bir eniş sahibinin icazəsini və müvafiq tələb olunan yoxlamaları tələb edir. Yalnız sahibi eniş icazəsi verdikdən sonra `omni-queue` tətbiq edin. Qorunan yollara toxunan növbəyə qoyulmuş PRs də həmin PR üçün sahibinin `protected-approved` qərarını tələb edir.

"Aktiv buraxılışda yaşıl qapılar tələb olunur" qaydalar dəsti başda yaşıl `Gate / CI` və `Gate / Quality` tələb edir. Qırmızı qapıdan keçmək üçün heç vaxt `--admin` istifadə etməyin. Sərbəst buraxılan dondurma blokları donmuş filiala birləşir. [Sərt Qayda 21-ə](HARD_RULES_DETAIL.md) baxın. Heç vaxt başqa bir seansın işlədiyini işarələməyin, birləşdirməyin və ya çəkmə sorğusuna təkan verməyin. [22-ci sərt qaydaya](HARD_RULES_DETAIL.md) baxın.

## Qatarın çəkilməsi tələbi

1. Cari buraxılış əsas ucunda bir qatar filialına başlayın. Birləşmə öhdəliklərindən istifadə edərək dəqiq təsdiq edilmiş üzv başlarını inteqrasiya edin. Squash və rebase qarşısını almaqla onların törəmə tarixçəsini qoruyun.
2. Qatar filialı üçün bir çəkmə sorğusu açın. Həmin PR cari əsas ucun öz tam CI ilə təsdiq edin. Enişdən əvvəl əsas ucunu və təsdiq edilmiş üzv başlıqlarını yenidən yoxlayın. Təsdiqlənmiş namizəd dəyişdikdə qatarı və onun CI yeniləyin.
3. Land the train PR with a merge commit under the applicable queue mode. In live mode, the queue's `merge-ff` landing method preserves the merge commits. The original member heads become reachable from the release branch. GitHub marks the member PRs as merged and the commits retain their authors.

İctimai bir nümunə [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071) dir. O, 18 üzv PRs birləşdirdi və 2026-11-24 tarixində birləşmə öhdəliyi ilə endi.

`main` dan növbəti buraxılış filialına sinxronizasiya da birləşmə öhdəliyi vasitəsilə həyata keçirilir. Sonrakı sinxronizasiyalar üçün `main` nəslinin qorunması tələb olunur. [İş ağacının izolyasiyasına](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash) baxın.

## Yerli birləşmə qatarı təsdiqləyicisi

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validator baza və PR başlıqlarını götürür və onları birdəfəlik iş ağacında birləşdirir. O, yaranan ağacda bir dəfə paritet dəstini işlədir. Uğursuz başlıq gətirmə və ya birləşmə münaqişəsi həmin PR çıxarır və skript qalan PRs ilə davam edir.

- **`--plan`** seçilmiş rejimin addımlarını çap edir və iş ağacı yaratmadan və ya pultla əlaqə saxlamadan çıxır. Sürətli planı yoxlamaq üçün onu `--fast` ilə birləşdirin.
- **`--fast`** ümumi statik qapıları, `tests/unit/` və `npm run test:vitest` altında seçilmiş dəyişdirilmiş `node:test` fayllarını işlədir. Sürətli rejimdən istifadə edərkən yığılmış ucda gündə ən azı bir dəfə tam yerli yoxlama aparın.
- **Tam rejim** yalnız tam statik qapıları əlavə edir və `npm run test:unit` və `npm run test:vitest` işləyir.

Baza zondu mövcuddursa, nasaz statik qapı toxunulmamış bazada yenidən işə salınır. Skript miras qalmış uğursuzluqları bildirir və hər bir tanınmış pozuntu xətti bazada göründükdə və ümumi sayı artmadıqda davam edir.

| Çıx | Mənası                                                                                                                                              |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0` | Planı çap etdi və ya paketi tamamladı. Paketin xülasəsi hər hansı irsi statik uğursuzluqları və çıxarılan PRs sadalayır.                            |
| `1` | Etibarsız arqumentlər, Git yoxlanışı, uğursuz əvvəlcədən uçuş və ya PR boarded yoxdur.                                                              |
| `2` | Paket yoxlanışı uğursuz oldu və miras alınmış kimi təsnif olunmadı. Operator partiyanı iki hissəyə bölə, pozan PR çıxara və yenidən işə sala bilər. |

Yerli keçid yalnız sahibinin dosyesi üçün diaqnostik sübut təqdim edir. Hər bir eniş üçün hələ də sahibin icazəsi, öz tələb olunan çekləri və müvafiq hallarda kölgə növbəsi hökmü tələb olunur.

## Mərtəbə

- **PR başına.** CI və Keyfiyyət dəyişdirilmiş yollara əsaslanaraq yoxlayır. Kod PRs CI-də ayrıca bölmə və Vitest işləri ilə sürətli keyfiyyətli qapıları və təsirli testləri idarə edir.
- **Növbəyə görə namizəd.** CI və Keyfiyyət öz növbəsində tərtib edilmiş namizəd üçün tam profili idarə edir.
- **Buraxılış üçün ipucu.** Release-Green, yol filtrlərinə uyğun gələn təkanlarda sürətli sərt qapıları işə salır. Gündə üç planlaşdırılan qaçış buraxılış filialı üçün tam taramadan istifadə edir.
- **Buraxılış başına.** Tam CI matrisinə E2E parçaları, paketin yoxlanılması, tarball açılış tüstüsü və əhatə dairəsi yoxlamaları daxildir. [Buraxılış Yoxlama Siyahısına](RELEASE_CHECKLIST.md) baxın.

## `merge-train.sh` üçün təzə yoxlama ilkin şərtləri

Preflight iş ağacları yaratmazdan əvvəl işləyir. `npm ci` ilə asılılıqları quraşdırın. `node_modules/.bin/tsc` icra edilə bilən olduğunu və `node_modules/node_modules` olmadığını təsdiq edin. `node_modules/.bin/bun --version` uğur qazandığını yoxlayın.

Əgər Bun postquraşdırma atılıbsa, `(cd node_modules/bun && node install.js)` işə salın. Provayder ardıcıllığı və məlum simvol yoxlamaları Bun istifadə edir. Doğrulayıcı `npm run check:cycles:ratchet` bloklama qapısı kimi işlədir. Bağımsız `npm run check:cycles` əmri məsləhət xarakteri daşıyır.

## Tarix

Birləşdirmə növbəsi 2026-11-19 tarixində dayandırıldı.
