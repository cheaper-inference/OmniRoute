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

CI və Quality Gates iş axınlarının hər biri sabit qərar verir: `Gate / CI` və `Gate / Quality`. Onların versiyalı qəbul siyasəti tələb olunan və ya məsləhət kimi hər bir yuxarı işi sadalayır. Müvafiq tələb olunan iş uğur qazanmalıdır: çatışmayan, ləğv edilmiş, atlanmış, gözlənilən və naməlum nəticələr PASS qura bilməz. Etibarlı yalnız sənədlər və ya yalnız kataloq üçün təsnifat kod zolağının tətbiq oluna bilməyəcəyinə səbəb ola bilər; PR layihəsi qəbul edilmiş namizəd deyil. `hotfix` etiketi sübutdan imtina etmir.

Hər iki iş axını PRs main/release filiallarına əhatə edir, `main`-ə itələyir, əl ilə göndərmə və qrup hadisələrini birləşdirir. Tam seçimi itələyin, göndərin və birləşdirin. `release/**` -yə təkanlar onları işə salmır (10-18-2026): hər bir dəyişiklik artıq öz PR də matrisi işlətdi və birləşdirilən birləşmə Release-Green-in işidir (`docs/ops/RUNNER_BOX.md` → Hosted zolaq). Çəngəllər və birləşmə qrupları, əks halda öz-özünə yerləşdirilən qaçışçıları seçən işlər üçün yerləşdirilən qaçışçılardan istifadə edir; buraxılışdan əvvəl kifayət qədər yerləşdirilmiş tutum yoxlanılmalıdır.

Adi bir PR sürətli seçimi idarə edir. Qəbul siyasətinin `full-code` və `full-code-e2e` zolaqları (E2E, inteqrasiya, paket artefaktı, Electron tüstüsü, Bun SQLite, ekosistem və protokol müştəriləri) yalnız Mergify növbə qaralamasında və ya tam icrada işləyir: `gh workflow run ci.yml --ref <branch>`.

Hər bir JSON qəbzi yoxlanılmış SHA, iş axını və cəhdi müəyyən edir. CLI checkout/event SHA uyğunsuzluğunu rədd edir. İş axını testləri siyasət üzvlüyünü hökm işinin `needs` siyahısına bağlayır ki, yeni və ya çıxarılan zolaq səssizcə yoxa çıxmasın. Qəbzlər nəşr, yerləşdirmə və ya mövcud məsləhət skanerinin daxili hissələrini deyil, öz iş axınını əhatə edir. Filial qaydalarında hər iki çek adının aktivləşdirilməsi ayrıca inzibati dəyişiklikdir; Bu işləri əlavə etmək özü bir şöbəni qorumur.

### Növbəni birləşdirin

`queue` etiketi Birləşdirmə növbəsinə (`.mergify.yml`) PR göndərir. Mergify `mergify/merge-queue/` filialında qaralama PR açır, CI orada tam seçimi işə salır və `Gate / CI`, `Gate / Quality` və `Merge integrity (changelog + generated skills)` keçəndə orijinal PR birləşir.

Mergify öz növbəsinin xülasəsini qaralamanın təsvirinə yazır və digər proqramlar da onu redaktə edə bilər. Belə qaralamada `pull_request` `edited` hadisəsi özünün paralellik qrupunu (`-queue-edit-<run_id>`) götürür, ona görə də o, qaralamanın real qaçışını ləğv edə bilməz və o, qapını və matrisi atlar. Yalnız `Merge integrity` hələ də işləyir. Atlanan qapı işi fərqli çek adı daşıyır, çünki Mergify atlanmış `Gate / CI` uğursuz çek kimi oxuyur və PR sıradan çıxarır.

Dequeue sonra, bir təkan həmişə PR requeue deyil. Bu barədə `@mergifyio queue` şərh edin.

### Qəbul reduktorunda saxlanılan sübut

`scripts/quality/validate-release-acceptance.mjs` təchiz edilmiş planı və onun təzahürlərini azaldır; planın tam buraxılış boru kəmərini əhatə etdiyini müəyyən etmir. Onun hesabatları açıq şəkildə `releaseAcceptance: false` təyin edir, hətta bu plan `VERIFIED` olduqda belə. `release-acceptance.yml` iş axını hələ də real quruluş, paket, açılış və ya tanıtım qəbzləri deyil, kölgə qurğularından istifadə edir.

CLI saxlanılan sübutları yoxlamaq üçün `--evidence-root` tələb edir. Fayllar `<evidence-root>/<artifact_id>/<member>` kimi həll edilir və SHA-256 kimi hashed olunur. Sübutsuz PASS qeydi, itkin və ya dəyişdirilmiş fayl, təhlükəli yol və ya simvolik əlaqə yoxlamanın qarşısını alır. Çatışmayan fayllar boş uğurlu qeydlərə bərabər deyil. Mövcud SHA/run/attempt çekləri müstəqil olaraq qalır: uyğun baytlar köhnə qəbzi xilas edə bilməz. Fayl bütövlüyü icranın həqiqiliyinə və ya artefaktın təşviqinə sübut deyil.

### Statik skan edilmiş inventar

Versiyalaşdırılmış npm-ləqəbli inventar və statik-skan üzvlüyü `config/quality/gate-manifest.json`-da yaşayır. Skript adlarını və `package.json` qarşı dəqiq əmrləri təsdiqləmək üçün `npm run check:gate-manifest` işə salın; əlavələr, silinmələr və komanda sürüşməsi həm yerli çəngəl, həm də CI-də dəyişiklik təsnifatı işlərini uğursuz edir. Ləqəb iş axını işi, matris nümunəsi və ya sınaq işi deyil: bu saylar bir-birini əvəz edə bilən kimi təqdim edilməməlidir.

Seçilmiş ləqəbləri icra etmədən yoxlamaq üçün `npm run quality:scan -- --list` və ya `npm run quality:scan:fast -- --list` istifadə edin. Qaçışçı npm giriş nöqtəsini çağırır, ona görə də onun işləmə vaxtı (konfiqurasiya edilmiş Bun daxil olmaqla) saxlanılır. Manifest həmin profillərdən kənar ləqəbləri ayrıca çağırılmış kimi qeyd edir və baxım əmrləri yalnız oxumaq üçün skan profillərində qadağandır.

Bu profillər yalnız statik taramanı əhatə edir. Onlar məhsul testlərini, əhatə dairəsini, qablaşdırmanı, xarici yoxlamaları və ya namizədin tam buraxılış qəbulunu təsdiq etmir. İş axınının qəbulu əlaqəli `config/quality/admission-policy.json` və `scripts/quality/admission-verdict.mjs` istifadə edir. Buraxılış-müşahidəçi profilləri ayrı qalır; onların müvafiq çek və qəbzlərini müstəqil şəkildə yoxlayın. Tam müşahidəçinin statik əmrləri `audit:deps`, mutasiya testi seçimi və tərcümə yoxlamaları daxil olmaqla `config/quality/release-green-static-profile.json`-də elan edilir. Yükləyici package.json və modelləşdirilmiş CI/Quality bəyannamələrinə qarşı npm əmrlərini təsdiq edir; o, arqument kimi qabıq işarələrini yerinə yetirmək əvəzinə drifti rədd edir. Tələb olunan skaner SKIP/INCOMPLETE çıxışı PASS qura bilmir. Profil öz xarici istisnalarını qeyd edir və yerləşdirilən əhatə dairəsini, sınaq matrislərini, paket və ya yerləşdirmə sübutlarını əvəz etmir. Aşağıdakı nəsr inventar bir istinaddır, bir qapının həqiqətən qaçdığını sübut etmir.

Skriptlər `scripts/check/` (siyasət qapıları) və `scripts/quality/` (ratchet engine) altında yaşayır. Həqiqətin CI mənbəyi `.github/workflows/ci.yml` dir.

### PR sürətli yolunu buraxın (`quality.yml`)

`.github/workflows/quality.yml` main/release PRs üzərində CI tamamlayır, `main` yə itələyir, qrupları göndərir və birləşdirir. PRs yol filtrli sürətli yoxlamalardan istifadə edir. Daimi əlil olan dublikat quruluş silindi; real build/package/boot çekləri CI-da qalır. Vahid dəsti və vitest yalnız CI də işləyir (`Unit Tests (N/8)` və `Vitest`).

| İş                                               | Əhatə dairəsi                                                                                                                                 | Bloklama                         |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs və docs-all                                                                                                      | Bəli                             |
| `Fast Quality Gates`                             | PRs kodu; statik yoxlamalar, tip yoxlanışı, tablosuna tip yoxlanışı, təsirə məruz qalmış vahid testləri, unudulmuş qardaş testləri (məsləhət) |
| `No new ESLint warnings`                         | PRs kodu; supressions-xəbərdar lint qoruyucu                                                                                                  | Bəli, çəngəllər də daxil olmaqla |
| `Merge integrity (changelog + generated skills)` | Qaralama olmayan PRs; dəyişiklik jurnalı və yaradılan bacarıq sinxronizasiyası                                                                | Bəli, çəngəllər də daxil olmaqla |

#### Unudulmuş qardaş testləri hesabatı

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` -nin məsləhət addımı kimi işləyir və test-təsir xəritəsinin arxasında idxal həlledicisini təkrar istifadə edir. Hər dəyişdirilmiş istehsal modulu üçün, namizəd testi çəkilmə tələbi fərqində olmadıqda, deterministik `changed module/symbol -> static consumer -> candidate sibling test` zəncirləri haqqında məlumat verir. Markdown xülasəsi və JSON nəticəsi hər hansı bloklama yayımından əvvəl kalibrləmə üçün `forgotten-sibling-tests` iş axını artefaktı kimi saxlanılır.

Barelin təkrar ixracı və dinamik idxalı yalnız həlledici diaqnostikadır; onlar heç vaxt bloklayan tapıntı yaratmırlar. Nəzərdən keçirilmiş istisnalar `config/quality/forgotten-sibling-allowlist.json`-da yaşayır. Hər bir giriş istehlakçı və namizəd testini adlandırmalı, konkret əsaslandırma verməli və GitHub məsələsini əlaqələndirməlidir və ya sorğunu çəkməlidir. Səhv tərtib edilmiş girişlər bağlana bilmir. İstisnalar silinmiş namizəd testini və ya `.skip`/`.todo` əlavə edən fərqi sıxışdıra bilməz; iddianın zəifləməsi və digər maskalanma müstəqil şəkildə bloklanan `check:test-masking` qapısına məxsus olaraq qalır.

### İş: `lint`

Hər PR dan `main` qədər işləyir. Bloklar uğursuzluqla birləşir.

| Skript (`npm run ...`)            | Doğrulayır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Bloklama                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js versiyası dəstəklənən diapazondadır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Bəli                                     |
| `check:cycles`                    | Bütün `src/` + `open-sse/` üzrə dövri idxal (AST əsaslı, tsconfig `paths` həll olundu). Çılpaq hər hansı bir dövrə mövcud olduqda 1-dən çıxır ( #15281 dən bəri uğursuz bağlanıb) və SCCs siyahıya alır. `check:cycles:ratchet` ( CI nə işləyir) sayı `quality-baseline.json` — -da `metrics.cycles` tavanını aşdıqda bloklanır, `direction: down`, ona görə də yalnız düşə bilər (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bəli (ratchet)                           |
| `check:boundary`                  | `open-sse → src` birləşməsi: mühərrikdən proqrama unikal fayldan fayla idxal (`scripts/quality/measure-boundary.mjs`; kənar siyahı v4 core/module-split remediation backlogudur). Çılpaq = məsləhət hesabatı ( `quality:boundary` ilə eyni). `check:boundary:ratchet` ( CI nə işlədir, həmçinin `quality.yml` sürətli qapılar ratchet döngəsində) bloklar hesablama `quality-baseline.json` — -da `metrics.boundaryOpenSseToSrc` tavanını aşdıqda bloklanır 771, `direction: down`; `--update` yalnız onu aşağı salır; PRs üzrə baza-nisbi (`--base-ref`, aşağıya baxın)                                                                                                                                                                                                                                                                                                                                                                                               | Bəli (ratchet)                           |
| `check:route-validation:t06`      | Zod sxemləri bütün marşrutlarda mövcuddur (Tier 6 siyasəti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Bəli                                     |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayı büdcədən çox deyil (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bəli                                     |
| `check:provider-consistency`      | `providers.ts` -dakı hər bir provayderin `providerRegistry.ts` -də uyğun girişi var (və əksinə, icazə verilən siyahıda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                     |
| `check:model-lifecycle`           | Əl ilə saxlanılan üç marşrutlaşdırma cədvəli yoxlanılmış həyat dövrü snapşotuna (#11503) uyğun olaraq qalır: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` istiqamətləndirə biləcəyi heç bir təqaüdçü identifikatoru hesab etmir; hər bir `BUILT_IN_ALIASES` hədəfi `REGISTRY` -də mövcuddur və təqaüdçü-id snapshot-da yoxdur; `REGISTRY` də olan hər bir təqaüdçü identifikatoru yönləndirilir və ya `allowedRetiredInCatalog`-da siyahıya alınır; və həmin snapshotda heç bir `DEFAULT_DEGRADATION_MAP` mənbəyi və ya hədəfi təqaüdə çıxmış görünmür. Bu, bir modelə hazırda canlı yuxarı axının xidmət etdiyini sübut etmir. Oflayn —, `config/quality/model-lifecycle.json` ilə əl ilə yenilənmiş `npm run quality:refresh-model-lifecycle` ilə müqayisə edir (şəbəkə; CI-ə qoşulmayıb). `allowedRetiredInCatalog` yandırılmış cırcırdır: yalnız izləmə problemi olan bir giriş əlavə edin.                                                                       | Bəli                                     |
| `check:fetch-targets`             | Müştəri tərəfi `src/` -də hər bir `fetch("/api/...")` real `route.ts`-ə həll olunur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bəli                                     |
| `check:deps`                      | Repodakı hər `package.json` üzrə bütün `npm install` -able depsləri `dependency-allowlist.json` dədir; yeni açılmış və ya əyilmiş paketlər işarələnib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Bəli                                     |
| `audit:deps`                      | bütün beş müstəqil kilid faylının npm auditi (root, Electron, OpenCode plaginləri v1/v2 və provayder). Kritik məsləhətlər bloku; yüksək tövsiyələr görünən xəbərdarlıq olaraq qalır. Missing/failed auditləri INCOMPLETE və blokdur; əhatə dairəsi üzrə kilid hashləri və hesabatlar saxlanılır.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Bəli                                     |
| `check:lockfile`                  | `package-lock.json` integrity — https reyestri, bütövlük hashləri, hostun ləğvi yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bəli                                     |
| `check:licenses`                  | istehsal asılılıqları üçün SPDX lisenziya icazəli siyahısı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Bəli                                     |
| `check:tracked-artifacts`         | Quraşdırma artefaktları/təsdiq edilmiş `node_modules` simvolik keçidləri yoxdur (həmçinin husky pre-commitdə işləyir; pre-push qəsdən yüngül — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Bəli                                     |
| `check:ai-attribution`            | PR commits, başlıq və ya gövdə — Hard Rule #16 ( PR→ `release/**` — üçün `quality.yml` fast-gates loopunda hadisə yükünü oxuyur, no-op off PRs — və in PR stepqzqz- `ci.yml` PR→AI/bot `Co-Authored-By` ya AI nəsli altbilgisi yoxdur.`main` həmçinin husky `commit-msg` hook #14436;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Hər Vitest istisnası izləmə problemini adlandırır və `config/quality/vitest-exclusions.json` (#13204) - da görünür                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bəli                                     |
| `check:file-size`                 | Mənbə fayllar ( `src/`, `open-sse/`, `electron/`, `bin/` də `.ts`/`.tsx` ) `cap` daxilində və test faylları (`*.test.ts(x)`) `testCap` daxilində qalır; `file-size-baseline.json` (`frozen` / `testFrozen`) ilə dondurulmuş fayllar qeydə alınmış ölçüsünü keçməməlidir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                     |
| `check:error-helper`              | executors/handlers -da səhv cavabları `buildErrorBody()` / `sanitizeErrorMessage()` istifadə edir (Sərt Qayda #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bəli                                     |
| `check:migration-numbering`       | Miqrasiya SQL faylları ardıcıl olaraq nömrələnir, boşluqlar və ya dublikatlar yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Bəli                                     |
| `check:public-creds`              | `publicCreds.ts` xaricində hərfi OAuth `client_id`/`client_secret` və ya Firebase Veb düymələri yoxdur (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bəli                                     |
| `check:db-rules`                  | `src/lib/db/` modulları xaricində xam SQL yoxdur; `localDb.ts` -dən barel idxalı yoxdur (Sərt Qaydalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bəli                                     |
| `check:known-symbols`             | Göndərmə cədvəllərində qeydə alınmış provayder icraçıları, marşrutlaşdırma strategiyaları və tərcüməçilər heç bir yetim və ya elan edilməmiş simvollar olmadan — fayllara uyğun gəlir.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bəli                                     |
| `check:route-guard-membership`    | Uşaq prosesi yaradan hər marşrut `isLocalOnlyPath()` (Sərt Qaydalar #15/#17) ilə təsnif edilir.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Bəli                                     |
| `check:test-discovery`            | Repodakı hər bir `*.test.ts` / `*.spec.ts` faylı ən azı bir sınaqçı tərəfindən toplanır (ratchet: `test-discovery-baseline.json` -dəki yetim siyahı yalnız kiçilə bilər)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bəli                                     |
| `check:test-tla-order`            | `tests/unit` altında heç bir `node:test` faylı testi qeydə almır, yüksək səviyyəli `await` vurur, sonra daha çox qeyd edir (#18045; ratchet: `test-tla-order-allowlist.json` yalnız kiçilə bilər)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bəli                                     |
| `check:agent-skills-sync`         | Yaradılmış agent bacarıqları artefaktları onların mənbə kataloquna uyğun gəlir (drift yoxdur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | Provayder logos/assets qeydə alınmış mənşə qeydini daşıyır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON konfiqurasiya faylları repo lint qaydalarını təhlil edir və təmin edir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | səhvsiz TypeScript tərtibi (yalnız məsləhət xəbərdarlıqları)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                     |
| `typecheck:noimplicit:core`       | Ciddi `noImplicitAny` — gələcəyə baxan; bir çox əvvəlcədən mövcud olan zəng saytlarının hələ də qeydlərə ehtiyacı var                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Məsləhət** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` (#7033) üçün əhatə olunmuş `src/app/(dashboard)/**` `typecheck:core` — nin seçilmiş 27-fayl icazəli siyahısına heç bir idarə paneli TSX daxil deyil və `next build` heç vaxt onu yazın-yoxlamır (`next.config.mjs` `ignoreBuildErrors: true` təyin edir), ona görə də orada yetim identifikator reqressiyaları görünmürdü (#6625/#6909CI. Dondurulmuş per-file/per-TS-code sayının baza xəttinə qarşı fərqlər (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ilə eyni köhnəlmiş tətbiq nümunəsi ) — yalnız əsas hesabdan kənar NEW səhvləri qapıdan keçmir; əvvəlcədən mövcud xəta düzəldildikdə `--update` ilə aşağı salın.                                                                                                                                                                                                                                                                                                         | Bəli                                     |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), səth `typecheck:core`-nin 27-fayl icazəli siyahısı və idarə paneli qapısı üzərində tam tətbiq istehsal növü yoxlanışı əhatə olunmur. `config/quality/build-typecheck-baseline.json` qarşı fərqlər; yeni və ya yüksəldilmiş (fayl, kod) sayı uğursuz olarsa, aşağı sayı sizdən cırcırlamağı xahiş edir. `--force-regressions` qəbul edilmədikcə yeni və ya yüksəldilmiş cütlük işlədiyi halda `--update` imtina edir və `--force-nocheck` keçməyincə yeni susdurulmuş fayldan imtina edir, beləliklə yaşıllıq əldə etmək üçün baza xəttini genişləndirmək və daimi sükut təmin etmək iki ayrı məqsədli hərəkətdir. Çılpaq `--force` rədd edilir. Həmçinin `@ts-nocheck` üçün qurma sahəsini `config/quality/ts-nocheck-baseline.json` qarşı skan edir, çünki ondan istifadə edən fayl heç bir diaqnostika barədə məlumat vermir və əks halda hər qapıya görünməz olacaq. | Bəli                                     |

#### İki tip yoxlama proqramı fərqli cavab verir

`typecheck:core` və `check:build-typecheck` müxtəlif variantlar altında müxtəlif proqramlar tərtib edir və eyni fayl birində təmiz, digərində isə xətalarla dolu ola bilər.

`tsconfig.build.json` `"strict": false` təyin edir, ona görə də `noImplicitAny` söndürülür. Əsas konfiqurasiya daha sərt seçimlərlə seçilmiş 27 fayldan ibarət icazə siyahısını tərtib edir və hər bir girişin idxal qrafikini izləyir, buna görə də quraşdırma proqramında heç vaxt görünməyən fayllar hələ də orada yoxlanılır.

Nəticə faylın yazıldığını mühakimə edərkən əhəmiyyətlidir:** `check:build-typecheck` altında sıfır diaqnostika sıfır demək deyil** . 26 fayldan `@ts-nocheck` çıxarmaq, qurma proqramında onlardan 23-nü təmiz göstərdi; Onlardan on altısı 120-yə yaxın üstüörtülü səhv aşkar etdi - ciddi birində hər hansı bir səhv. Faylı təmiz adlandırmadan əvvəl hər ikisini yoxlayın.

### İş: `quality-gate`

`test-coverage` arxasınca qaçır. Bloklar uğursuzluqla birləşir.

| Skript                       | Doğrulayır                                                                                                                                                                 | Bloklama                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | `quality-metrics.json` yayır (ESLint xəbərdarlıq sayı, birləşdirilmiş parça hesabatından əhatə dairəsi)                                                                    | Bəli (ratchetdən yuxarı) |
| `quality:ratchet`            | `quality-baseline.json` -dakı hər bir metrik reqressiya etməyib (ESLint xəbərdarlıqları ≤ baza xətti; əhatə dairəsi ≥ bazası)                                              | Bəli                     |
| `check:duplication`          | Kodun təkrarlanması (jscpd@4) `quality-baseline.json`-da əsas xətti keçmir                                                                                                 | Bəli                     |
| `check:complexity`           | Fayl səviyyəli siklomatik mürəkkəblik həddi keçmir (əsas ESLint `complexity` + `max-lines-per-function`)                                                                   | Bəli                     |
| `check:cognitive-complexity` | Koqnitiv mürəkkəblik ratchet (`eslint-plugin-sonarjs`) — ayrı ESLint keçidi; CI qaçışları hər ikisi tək `check:complexity-ratchets` addımı kimi birləşdirilir              | Bəli                     |
| `check:dead-code`            | İstifadə edilməmiş ixrac/fayllar cırcır (knip) bazaya nisbətən geri qalmır                                                                                                 | Bəli                     |
| `check:compression-budget`   | Sıxılma meyarının büdcə — hər mühərrik üçün token qənaət mərtəbələri geriləməməlidir                                                                                       | Bəli                     |
| `check:type-coverage`        | Faiz tipli ratchet (`type-coverage`) geri çəkilmir; əsasən `typecheck:noimplicit:core` əhatə edir                                                                          | Bəli                     |
| `check:codeql-ratchet`       | Açıq CodeQL xəbərdarlığının sayı geri qalmır ( `gh api` vasitəsilə oxunur; zərif-tokensiz keçin) — yeniləmə kadansı və manuel tetikleyici: aşağıda "CodeQL ratchet"ə baxın | Bəli                     |

### İş: `quality-extended`

Bütün iş məsləhətdir (`continue-on-error: true`). npm-əsaslı ratchets real üçün çalışır; xarici skanerlər `gh release download` vasitəsilə quraşdırılır və binar hələ də olmadıqda özünü atlayır (0-dan çıxış).

| Skript                   | Doğrulayır                                                                                                                                                                                                                  | Bloklama                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `check:circular-deps`    | Dairəvi asılılıq yoxdur (dpdm)                                                                                                                                                                                              | **Məsləhət**                                     |
| `check:bundle-size`      | Paketin ölçüsü qapaqdan çox deyil                                                                                                                                                                                           | **Məsləhət**                                     |
| `check:secrets`          | Gizli tarama (gitleaks) ikili olmadıqda — atlayır                                                                                                                                                                           | **Məsləhət**                                     |
| `check:vuln-ratchet`     | Asılılıq zəiflikləri (osv-skaneri) reqressiya etmir — `--ratchet` uğursuz olur, çünki ölçülmədikdə INCOMPLETE (çıxış 2)                                                                                                     | **Məsləhət**                                     |
| `check:workflows`        | İş axını lint (actionlint + zizmor); missing/broken skanerləri, etibarsız hesabatlar və ya çatışmayan ratchet bazası INCOMPLETE kimi uğursuz olur. Etibarlı tapıntılar seçilmiş strict/advisory/ratchet siyasətinə uyğundur | İcra tələb olunur; CI zizmor ratchet bloklanması |
| `check:openapi-breaking` | Saxlanmış hadisə öhdəliyinə qarşı ictimai API müqaviləsi (PR birləşmə bazası, əvvəl təkan, birləşmə qrupu bazası; scheduled/manual yoxlaması ilk valideyn); tələb olunan ölçmə uğursuz bağlandı                             | **--ratchet ilə bloklama**                       |

### İş: `docs-sync-strict`

Hər PR dan `main` qədər işləyir. Bloklar uğursuzluqla birləşir.

| Skript                         | Doğrulayır                                                                                                                                                            | Bloklama                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:docs-all`               | Aşağıdakı 6 alt qapını ardıcıl olaraq idarə edən meta-qapı                                                                                                            | Bəli                                |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiyasının uyğunluğu                                                                                                                  | Bəli                                |
| ↳ `check:docs-counts`          | Nəsrdəki saylar (provayderlərin sayı, miqrasiya sayı və s.) real sayların cırtdan pəncərəsindədir.                                                                    | Bəli                                |
| ↳ `check:env-doc-sync`         | `.env.example` -da hər bir env var sənədlər cədvəlində sənədləşdirilir və əksinə                                                                                      | Bəli                                |
| ↳ `check:deprecated-versions`  | Sənədlərdə köhnəlmiş versiya sətirləri yoxdur                                                                                                                         | Bəli                                |
| ↳ `check:doc-links`            | Sənədlərdəki daxili işarələmə bağlantıları real fayllara həll olunur (`[text]`/`(path)` forması)                                                                      | Bəli                                |
| ↳ `check:fabricated-docs`      | Sənədlərdə göstərilən marşrutlar, env vars, CLI əmrləri, çəngəl adları və fayl yolları kod bazasında mövcuddur. `--strict` vasitəsilə sərt qapı; bayraqsız soft-fail. | Bəli ( CI-də `--strict` vasitəsilə) |
| `check:cli-i18n`               | CLI əmr sətirləri bütün i18n yerli fayllarında mövcuddur                                                                                                              | Bəli                                |
| `check:openapi-coverage`       | OpenAPI spec real marşrutların ən azı cızıqlanmış mərtəbəsini əhatə edir                                                                                              | Bəli                                |
| `check:openapi-security-tiers` | `openapi.yaml` -da təhlükəsizlik səviyyəsi annotasiyaları `routeGuard.ts` təsnifatlarına uyğundur                                                                     | **Məsləhət**                        |
| `check:openapi-routes`         | `openapi.yaml` -da hər bir yol əsl `route.ts` (anti-hallüsinasiya) həll olur.                                                                                         | Bəli                                |
| `check:docs-symbols`           | `docs/**/*.md` -dəki hər `/api/...` istinadı real `route.ts` (anti-hallüsinasiya) çevrilir.                                                                           | Bəli                                |
| `i18n translation drift`       | i18n yerli fayllarında tərcümə olunmamış açarlar — yalnız xəbərdarlıq edir                                                                                            | **Məsləhət**                        |

`docs/diagrams/` altında on iki README SVGs yaradılır (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` onların hamısını bərpa edir). Hər birinin bayt-müqayisə vahid testi (`tests/unit/docs/readme-*-svg.test.ts`, iş `test-unit`) var ki, o, qəbul edilmiş fayl köhnəldikdə uğursuz olur və `check:docs-counts` öz `<text>` qovşaqlarından — kanonik nömrələri oxuyur, buna görə də təsvir addımı faylda hər bir qeyd edilmiş sətri görünməz `<text>` kimi saxlayır. SVG kanonik-rəqəmlər yoxlanışı `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) -də sadalanan faylları oxuyur: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` və `tier-flow-light.svg`; free-forever, kataloq-giriş, təkrarlanan-hovuz və skorlama faktorları iddiaları da `promise-pillars.svg`, `free-tier-budget.svg` və `strategies-grid.svg` oxunur. `free-tier-budget.svg` öz rəqəmlərini canlı kataloq yükləyicisindən çəkir, ona görə də `FREE_MODEL_BUDGETS` və ya provayderin displey adına dəyişiklik həmin fayl bərpa olunana qədər CI qırmızı rəngdə saxlayır.

### İş: `i18n-ui-coverage`

| Skript                            | Doğrulayır                                                                                                                                                                                     | Bloklama     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (daxili) | UI i18n açarının əhatə dairəsi ≥ 65%                                                                                                                                                           | Bəli         |
| `check-ui-value-drift` (daxili)   | Yenidən yazılmış ingilis dili** dəyər** geridə heç bir köhnəlmiş tərcümə qoymur                                                                                                                | Bəli         |
| `check-new-key-coverage` (daxili) | A** yeni** İngilis açarı hər dilə tərcümə olunur — a `__MISSING__:` markeri rədd edilir                                                                                                        | Bəli         |
| `check-translation-ratio`         | Lokal üçün real tərcümə nisbəti (icazə siyahısından kənarda eyni-ingilis dili / yer tutucu / çatışmayan yarpaqlar) `config/quality/i18n-translation-baseline.json` + boşluqdan çox olmamalıdır | **Məsləhət** |

`fetch-depth: 0` — lazımdır dəyər-drift qapısı birləşmə bazasına qarşı `en.json` fərqlənir.

#### `check-ui-value-drift` — köhnəlmiş-tərcümə qapısı

Digər qapıların struktur olaraq görə bilmədiyi bir i18n reqressiyasını tutur: İngilis dəyəri yenidən yazılır və _əvvəlki_ İngilis dilindən alınan tərcümələr geridə qalır, beləliklə qeyri-ingilis istifadəçilər əminliklə yazılmış, indi səhv olan surəti oxumağa davam edirlər.

Bu real olaraq göndərildi. Antigravity giriş köməkçisi yerə endikdə `oauthModal.googleOAuthWarning` yenidən yazılmışdır (#5203);** 43 yerdən 39-u** operatorlara "tam URL kopyalayın və aşağıya yapışdırın" deyən mətni saxladı ki, bu provayder üçün tamamlana bilməyən bir —. #8463 qədər diqqətdən kənarda qaldı, çünki:

- `sync-ui-keys` yalnız olan açarları doldurur** yox** , heç vaxt olanlar** köhnəlmiş** ;
- `check-ui-keys-coverage` açarı _presence_ hesablayır, buna görə də köhnə tərcümə əhatə olunduğu kimi qiymətləndirir;
- `check-translation-drift` `docs/i18n/<locale>/**.md` sənədlərinin güzgülərini izləyir — heç vaxt `src/i18n/messages/*.json` oxumur. 2026-09-cu ilin yenidən sinxronizasiyasından sonra `docs-sync-strict` işində bloklanır: əsas sənədi redaktə edin → `npm run i18n:run -- --files=<doc>` (bölmə səviyyəsində, ucuz).

**Fərqlilikdən xəbərdardır, bazaya əsaslanmır.** Birləşmə bazasında `en.json` işləyən ağacla müqayisə edir; İngilis dili dəyəri dəyişən hər bir açar üçün hələ də toxunulmamış tərcüməsi olan hər hansı bir dil köhnəlmişdir. Bu qəsdən** əvvəllər mövcud olan borcları dondurur** — a diff uzun müddət davam edən tərcümənin hansı köhnə ingilis dilindən gəldiyini aşkar edə bilməz, buna görə də qapı yalnız cari dəyişikliyin nəyə toxunduğunu mühakimə edir. Alternativ (hər açar hash bazası) ~ 600 KB yaradılan fayla başa gələcək, 3 × ən böyük mövcud baza, hər i18n PR də çalınır.

Onu qane etməyin iki yolu:

1. təsirə məruz qalan tərcümələri yeniləyin və ya
2. onları iş vaxtını `__MISSING__:<new english>` — olaraq təyin edin, sonra düzəldilmiş ingilis dilini (`src/i18n/request.ts::deepMergeFallback`, #7258) və tərcümə üçün əsas növbələrə xidmət edir.

Əgər simli** məna** dəyişdirmək, üstünlük vermək** açarın adının dəyişdirilməsi** : yeni açar köhnə tərcüməni miras ala bilməz. Bu istifadə edilən #8463 nümunəsidir.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Əsas kataloqu oxumaq mümkün olmadıqda (əsas ref olmadan dayaz klon), `check-openapi-breaking` aynası ilə 0-dan `SKIP reason=base-unresolved` ilə çıxır.

### İş: `i18n`

Tam i18n doğrulama matrisi (hər yerli üçün bir iş). Bütün iş məsləhətdir.

| Skript                          | Doğrulayır                | Bloklama                                                |
| ------------------------------- | ------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | Yerə görə tərcümə tamlığı | **Məsləhət** (bütün iş üzrə `continue-on-error: true` ) |

### İş: `pr-test-policy`

Yalnız çəkmə sorğuları üzərində işləyir.

| Skript                 | Doğrulayır                                                                                                                                    | Bloklama |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` və ya `bin/` -də istehsal kodunu dəyişən PRs testləri daxil etməli və ya yeniləməlidir (Sərt Qayda #8)       | Bəli     |
| `check:test-masking`   | Dəyişdirilmiş test faylları xalis təsdiq sayını azaltmır və ya `assert.ok(true)` tautologiyaları əlavə etmir                                  | Bəli     |
| `check:pr-evidence`    | PR orqanı dəyişiklik üçün test/VPS sübutlarını gətirir ( PR nəsrini — kövrək grepping etməklə Hard Rule #18 mexanikləşdirir, Backlog-a baxın) | Bəli     |

### İş: `test-vitest`

`build` arxasınca qaçır. Bloklar uğursuzluqla birləşir.

| Suite            | Doğrulayır                                              | Bloklama                                                                                                                              |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alət), autoCombo, cache — vitest runner | Bəli                                                                                                                                  |
| `test:vitest:ui` | UI komponenti — vitest runner test edir                 | **Bloklama** — əvvəlcədən mövcud uğursuzluqlar `vitest.config.ts`-də açıq şəkildə istisna edilir; yeni uğursuzluqlar işi uğursuz edir |

### Gecə iş axınları (planlı, məsləhət)

Bunlar cron cədvəlində (və `workflow_dispatch`) işləyir, heç vaxt PRs olmur. Hamısı məsləhətdir.

| İş axını               | Doğrulayır                                                                                                                                                                    | Bloklama     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | təsadüfi toxum + yüksək run sayı ilə əmlak testlərini sürətli yoxlayın                                                                                                        | **Məsləhət** |
| `nightly-resilience`   | yığın-böyümə qapısı, xaos xətası-injection, k6 load/soak                                                                                                                      | **Məsləhət** |
| `nightly-llm-security` | promptfoo injection mühafizəsi (blok rejimi) + garak zondları (provayder sirri olmadan atlandı)                                                                               | **Məsləhət** |
| `nightly-schemathesis` | `docs/openapi.yaml` — səthlərinin spesifik pozuntuları / idarə olunmayan 500s (Fase 8 B.4) istifadə edərək canlı OmniRoute ə qarşı OpenAPI müqaviləsinin puslanması (sxeması) | **Məsləhət** |
| `nightly-mutation`     | Sürətli vahid zolaqlı — üzərində Stryker mutasiya testi balı, sağ qalan mutantların zəif təsdiqini göstərir.                                                                  | **Məsləhət** |
| `nightly-compat`       | Dəstəklənən `engines.node` diapazonlarında mühərrik uyğunluğu matrisi                                                                                                         | **Məsləhət** |

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
- **tövsiyə xarakterli** — qlobal cəmin dondurulmuş baza həddi ilə müqayisəsi. Miras alınmış yayınma
  günahsız PR-ı heç vaxt qırmızı etmir; yayınma buraxılış uzlaşdırılması zamanı yenidən dondurulur və
  ehtiyat işi tərəfindən izlənilir.

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

## İcazə Siyahısı Siyasəti

Əvvəlki pozuntulara görə uğursuz ola bilməyən hər bir qapı dondurulmuş icazə siyahısından istifadə edir (məsələn, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Siyasət belədir:

**Kök səbəbi aradan qaldırın; icazəli siyahıdan yalnız pozuntu əvvəlcədən mövcud olduqda və eyni PR-da düzəldilə bilməyəndə istifadə edin.**

İcazə verilən siyahıya giriş əlavə edərkən:

1. Əsaslandırma ilə bir şərh əlavə edin.
2. İzləmə probleminə istinad edin (məsələn, `// #3498 — Phase 2 feature, not yet implemented`).
3. Pozuntu aradan qaldıran eyni PR -dakı girişi silin — artıq aktiv pozuntunu aradan qaldırmayan köhnə girişin özü bir qüsurdur (6A.3 köhnəlmə tətbiqi həyata keçirildikdən sonra yetim icazəli siyahı girişində keçidi uğursuz edəcək).

Et** yox** testlərin daha sürətli keçməsi üçün icazələr siyahısına daxil olanları əlavə edin. Artan icazə siyahısı olan yaşıl qapı yanlış keyfiyyət hissidir.

### PR-da bir qapı uğursuz olduqda

1. **Qapı çıxışını diqqətlə oxuyun** — hansı faylın və ya simvolun qaydanı pozduğunu dəqiq deyir.
2. **Pozuntu düzəldin** — əksər qapılar kod düzgün olan kimi keçən deterministik fayl sistemi yoxlamalarıdır.
3. **Əgər pozuntu əvvəldən baş veribsə** (yəni, siz bunu təqdim etməmisiniz, lakin qapı indi onu əhatə edir): əsaslandırma şərhi və izləmə problemi ilə icazə siyahısına giriş əlavə edin.
4. **Qapı cırcırdırsa** (əhatə dairəsi, ESLint xəbərdarlıqları, təkrarlama, mürəkkəblik): dəyişikliyiniz metrikanı daha da pisləşdirdi. Əsas problemi həll edin və ya dəyişiklik qəsdəndirsə və metrik deqradasiya məqbuldursa (nadir hallarda) `npm run quality:ratchet -- --update` işə salın —, lakin bunun səbəbini PR təsvirində sənədləşdirin.
5. **Məsləhət qapıları** (`continue-on-error: true`) məlumat xarakterli — dir, birləşməni bloklamır, lakin CI xülasəsində görünür. Onları hər halda düzəldin.

---

## Yeni yoxlamanın əlavə edilməsi

1. `scripts/check/check-<name>.mjs` (və ya `.ts`) yaradın. Siyasət yoxlamaları 0/1 çıxış kodu ilə tamamlanır.
   Ratçet tipli yoxlamalar `collect-metrics.mjs` vasitəsilə `quality-metrics.json` faylına göstərici yazır.
2. `package.json` faylına `"check:<name>": "node scripts/check/check-<name>.mjs"` əlavə edin.
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

## Rasionalizasiyanın geridə qalması (ROI baxış — Fase 9 Onda 3)

Bu inventar 2026-06-17 tarixində `ci.yml` ilə tutuşdurulub (əvvəlki versiyada `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence` buraxılıb). Barışdırılmış dəstin ROI baxışı aşağıdakı səmərələşdirmə namizədlərini müəyyən etdi.** Birləşmələr mexaniki CI dəyişiklikləridir; flips/drops operator üçün qorunan siyasət qərarlarıdır.** Aşağıdakı heç bir şey hələ tətbiq edilməyib.

**Həmçinin yuxarıda sənədsiz** (məsləhət, aşağı siqnal): `docs-lint` işi (markdownlint + Vale, bütün iş `continue-on-error`) və müstəqil skaner iş axınları `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` `quality-baseline.json` dadır, lakin `ci.yml` — də bloklama raçetinə qoşulmayıb, metrik hazırda yetimdir.

### Birləşdirmə / təkmilləşdirmə (mexaniki, aşağı risk)

Hər bir namizəd 2026-06-17 tarixində canlı qapı vəziyyətinə qarşı təsdiqləndi (etibar et, amma yoxla); borcu gizlətmək üçün bir neçə "açıq-aşkar" birləşmə çıxdı və var** yox** təmiz açılan yerlər.

- **`check:docs-sync` iki dəfə çalışır** — `lint` işində müstəqil və yenidən `check:docs-all` (`docs-sync-strict`) və husky pre-commit çəngəl daxilində. ✅**DONE** — müstəqil `lint` çağırışı silindi.
- **CVE tarama** — ❌**NOT təmiz birləşmə.** `audit:deps` bütün beş kilid faylı üzrə kritik tövsiyələri və natamam auditləri bloklayır, eyni zamanda cari siyasətə əsasən xəbərdarlıq kimi yüksək tövsiyələri bildirir; `check:vuln-ratchet` (osv) yalnız _reqressiya_ üzrə yoxlanılmış bazaya qarşı uğursuz olur və tələb olunduqda çatışmayan ölçmələri rədd edir. Fərqli semantika — düşməsi `audit:deps` mütləq kritik qapını və müstəqil paket audit qəbzlərini itirəcək. İkisini də saxla.
- **Dövr aşkarlanması** — ✅**DONE** (#15159 G-01/G-02). Buradakı köhnə mətn `check:cycles` "yaşıl, seçilmiş" qapı adlandırdı və `check:circular-deps` (dpdm) 91 dövr bildirdiyi üçün onu blokada saxlamağa haqq qazandırdı. Həmin yaşıl a** yalançı yaşıl** : `check:cycles` 5 alt kataloqu (450 fayl) skan etdi, yalnız statik `import|export … from` ilə uyğunlaşdı və hər `@/` və `@omniroute/open-sse/` spesifikatorunu buraxdı, ona görə də repoda üstünlük təşkil edən dinamik-import + ləqəb dövrlərini görə bilmədi. Düzəltildi: darvaza indi `src` + `open-sse` (5023 fayl) gəzir, TypeScript AST -dən təyinediciləri toplayır ( `import("…")` sayır və `typeof import("…")` tip mövqeyi belə deyil) və tsconfig `paths` həll edir. Tapır** 14** dövrlər, 0 deyil. Çünki PR qapısında əvvəlcədən mövcud olan 14 dövr təyin edilə bilməz, `check:cycles` indi** cırcır** (`--ratchet`, tavan `metrics.cycles.value = 14` in `quality-baseline.json`, `direction: down`) — hər hansı _reqressiyanı bloklayır və say yalnız düşə bilər. CI `npm run check:cycles:ratchet` ilə işləyir. Yandırılan gəzintilər**A-01** . `check:circular-deps` (dpdm) daha geniş ikinci rəy olaraq məsləhətçi olaraq qalır.
- **Mürəkkəblik** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): bir ESLint yeriş, ruleId ilə hesablanır ki, siklomatik + maksimum xətləri və koqnitiv əsas xətlər müstəqil qalsın; fərdi `check:complexity` / `check:cognitive-complexity` yerli `--update` üçün qalır.
- **`/api` anti-hallüsinasiya** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): bir FS inventar `src/app/api`, openapi-marşrutlar + sənəd simvolları hələ də müstəqil şəkildə hesabat verir; şəxslər yerli qaçışlar üçün qalır.
- **`check:node-runtime` 11 iş yerində çalışır** — ⚠️** aşağı ROI.** Hər biri ayrıca qaçışçıdır və çek < 1s-dir; ümumi qənaət ~ 10s, iş başına ucuz bir gözətçini itirməyə qarşı. Çaşmağa dəyməz.
- **`typecheck:noimplicit:core` on CI lint** — ✅** lint işindən uzaqlaşdırıldı** (məsləhət `continue-on-error` idi); bloklama növü səthi `typecheck:core` + `check:type-coverage`. Yerli skript saxlanılıb.

### Flip / qərar (operator siyasəti)

- `check:openapi-security-tiers` (məsləhət) — ❌**NOT təmiz çevrilə bilər.** O, 0-dan çıxır, lakin xəbərdarlıq edir ki, `LOCAL_ONLY_API_PREFIXES` altında bir neçə `traffic-inspector` marşrutunda `x-loopback-only: true` annotasiyası yoxdur. Onu tətbiq etmək üçün əvvəlcə `openapi.yaml` a həmin annotasiyaları əlavə etmək lazımdır.
- `typecheck:noimplicit:core` (məsləhət) — əsasən bloklama `check:type-coverage` ratchet tərəfindən qəbul edilir. Cırcağa çevirin və ya lazımsız ikinci `tsc` keçidini buraxın.
- `test:vitest:ui` (indi** bloklama** ) — əvvəlcədən mövcud uğursuzluqlar `// #8618` izləmə şərhləri ilə `vitest.config.ts` də açıq şəkildə istisna edilir; yeni uğursuzluqlar işi uğursuz edir.
- `check:secrets` (gitleaks, 3 sənədləşdirilmiş yalan pozitivdə dondurulmuş bloklama cırtdanı) — 3-ün 0-a çatmasına icazə verin və ya məsləhətçiyə endirin. Üst-üstə düşür GitHub yerli gizli skan edən + `check:public-creds`.
- `check:pr-evidence` (bloklama, greps PR-bədən nəsri) — yüksək yalan-müsbət risk; Çıxarıldığı təqdirdə Hard Rule #18 tətbiqini zəiflədir, ona görə də bu, əsl siyasət çağırışıdır.
- `semgrep` (məsləhətçi müstəqil) — OWASP ailələri üçün CodeQL üst-üstə düşür; onun əsas xəttini tıxac və ya düşmə ilə bağlayın.

---

## Əlaqədar Sənədlər

- Təchizat zənciri (mənbə, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — açar dəsti paritet qapısı

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, iş `i18n-ui-coverage`). Hər `src/i18n/messages/<locale>.json` nin yarpaq açar dəstini `en.json` ilə müqayisə edir və açarın nə vaxt əlavə olunmasından asılı olmayaraq, hər hansı olmayan və ya əlavə yarpaqda uğursuz olur. `__MISSING__:` yer tutucuları indiki kimi sayılır (onların məzmunu nisbət qapısının işidir). Bu, iki diff-based/percentage qapısının mütləq tamamlayıcısıdır: `check-ui-keys-coverage` hər bir yerli üçün 80% mərtəbə tətbiq edir ( ~ 13.000-dən 43-ü olmayan düymə hələ də 99.7% oxunur) və `check-new-key-coverage` yalnız PR `en.json` a əlavə etdiyi düymələri mühakimə edir. Şöbənin kəsildiyi günün `en.json` -dən yerli qrup yaradılır və baza açarları əlavə etməyə davam edərkən günlərlə tərcümə olunur; toplu PR özü heç bir açar əlavə etmir, buna görə də 1-ci qrup (#13044) doqquz yerli dildə 43 düymə, 2-ci qrup (#13660) səkkizdə 10 düymə qısa olduqda (2026-09-15) hər iki bacı səssiz qaldı. Qırmızı rəngi `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ilə düzəldin; `extra` yarpağı mənbənin onu atdığını bildirir — onu yerli dildən silin. `--warn` uğursuz olmadan hesabat verir. `--catalog=cli` eyni müqayisəni `bin/cli/locales` (`npm run i18n:check-keys:cli`) üzərində işləyir; hər iki addım `i18n-ui-coverage` işində yaşayır.

#### `check-new-key-coverage` — yeni açar i18n qapısı

`check-ui-value-drift` bacısı. Bu bir İngilis dəyərini tutur** yenidən yazılmışdır** onun tərcümələri geridə qalarkən; bu bir ingilis açarını tutur** əlavə etdi** bəzi yerlilər bunu heç vaxt qəbul etməsə də.

`check-ui-keys-coverage` bu sinfi görə bilmir: o, hər bir dil üçün faiz dərəcəsini tətbiq edir və ~ 13,000-dən on bir yox düyməsi əhatə dairəsini 99,9% təşkil edir. Hər dil üzrə faiz "bu xüsusiyyət tərcümə edilməmiş şəkildə göndərilmiş" — ifadə edə bilməz.

Kodlaşdırdığı hadisə: Orkestrasiya Canvasının 3-cü Fazası on bir açarını o zaman mövcud olan 42 yerli dilə tərcümə etdi. Saatlar sonra Aİ-dilli paket (#13044) repo 51 yerə apardı və doqquz yeni gələn (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) onları heç vaxt qəbul etmədi. `deepMergeFallback` ingilis dilini olmayan açarı əvəz edir, ona görə də uğursuzluq rejimi boş UI — real deyil, tərcümə olunmamış UI idi və konstruksiyaya görə səssiz idi.

Qardaşı kimidir** fərqindən xəbərdar** , birləşmə bazasında ingilis dilini işləyən ağacla müqayisə edərək, əvvəlcədən mövcud boşluqlar donmuş qalır və qapının işə salınması üçün miqrasiya tələb olunmur.

**`__MISSING__:<english>` markeri onu qane etmir (2026-09-17 tarixindən).** Əvvəllər sənədləşdirilmiş təxirə salınmış — idi, səkkiz funksiya PRs 2026-09-16 tarixində 61 açar əlavə edənə və tərcümə etmək əvəzinə markeri bütün 65 dilə möhürləyənə qədər iş vaxtı ingiliscə — düzəltmək üçün geri düşür: bu darvaza hər birini qəbul etdi, heç bir şey PRs maneə törətmədi və hər kəs translate nisbəti uğursuz oldu. (pt-BR 3,2 % > 2,5 % + 0,5). Marker indi olmayan tərcümə kimi qiymətləndirilir. Qırmızı rəngi `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ilə və ya `npm run i18n:translate-new-keys` ilə paralel olaraq bütün yerliləri düzəldin (`scripts/i18n/translate-new-keys.sh`, ayrılmış-safe, `OMNIROUTE_TRANSLATION_*` env olmadan başlamaqdan imtina edir). İngilis dilində qalmalı olan açar (saxlanmış product/engine/flag adı) `scripts/i18n/untranslatable-keys.json`-ə aiddir, heç vaxt markerin arxasında deyil. `vi` markerləri birbaşa qadağan edir (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — park edilmiş sınaq qapısı

`vitest.config.ts`-nın `exclude` siyahısındakı fayl işləməyən bir testdir və ağacı oxuyan hər kəs üçün əhatə kimi görünür. Şərhin arxasında toplanmış altmış iki fayl `// #8618 — pre-existing failure; remove this exclusion when fixed`. Məsələ #8618 11-08-2026-cı il tarixində bağlandı, izlədiyi siyahı 45 girişdən 62-yə yüksəldi, hər yenisi ölü məsələyə işarə edən şərhi miras aldı. Siyahı nəhayət fayl üzrə ölçüləndə (#13204),** 62-dən 51-i mənbə dəyişikliyi olmadan cari ağaca qarşı keçdi** .

Qapı (a) izləmə problemini adlandırmaq və (b) ölçülmüş statusu ilə `config/quality/vitest-exclusions.json` -da görünmək üçün real faylı həll edən hər bir istisna tələb edir, ona görə də birinin əlavə edilməsi 60 girişli massivdə daha bir sətir deyil, xüsusi faylda nəzərdən keçirilə bilən fərqdir. O ~ 10 dəqiqəyə başa gələn və dövri işə aid olan xaric edilmiş — testlərini qəsdən təkrar etmir; hər birinin sonuncu ölçüldüyü zaman inventar qeydləri.
