# Quality Gates Reference (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Bu sənəd OmniRoute-da bütün CI keyfiyyət qapıları üçün əsas istinaddır.
O, hər bir qapını, qapının nəyi yoxladığını, hansı CI tapşırığında işlədiyini, ratchet baza səviyyəsindən, yoxsa keçdi/qaldı siyasətindən istifadə etdiyini və yığmanı bloklayıb-bloklamadığını, yaxud yalnız tövsiyə xarakterli olub-olmadığını təsvir edir.

Qısa xülasə və icazə siyahısı siyasəti üçün `AGENTS.md` faylındakı "Keyfiyyət Qapıları və Ratchet-lər" bölməsinə baxın. Eyni sistemin kritik qiymətləndirilməsi, yetkinlik təsnifatı və alətdən asılı olmayan təkrarlama planı üçün
[Keyfiyyət Qapıları üzrə Təlimata](../ops/QUALITY_GATE_PLAYBOOK.md) baxın.

---

## Qapı inventarı və icra profilləri

### Namizəd qəbulu

CI və Quality Gates iş axınlarının hər biri sabit qərar verir: `Gate / CI` və
`Gate / Quality`. Onların versiyalaşdırılmış qəbul siyasəti hər bir yuxarı axın
işini məcburi və ya məsləhətçi kimi sadalayır. Tətbiq olunan məcburi iş uğurlu
olmalıdır: çatışmayan, ləğv edilmiş, ötürülmüş, gözlənilən və naməlum nəticələr
PASS-i təsdiq edə bilməz. Etibarlı yalnız-sənəd və ya yalnız-kataloq təsnifatı
kod zolağını tətbiqedilməz edə bilər; qaralama PR qəbul edilmiş namizəd deyil.
`hotfix` etiketi sübut tələbindən azad etmir.

Hər iki iş axını main/release budaqlarına yönələn PR-ləri, `main`-ə push-ları,
əl ilə işə salma və birləşmə qrupu hadisələrini əhatə edir. Push, əl ilə işə salma
və birləşmə qrupu tam seçimi icra edir. `release/**` budaqlarına push-lar onları
başlatmır (2026-10-18): hər dəyişiklik matrisi artıq öz PR-ında icra edib və
birləşdirilmiş kombinasiya Release-Green-in işidir (`docs/ops/RUNNER_BOX.md` →
Hosted zolağı). Fork-lar və birləşmə qrupları əks halda self-hosted runner-ları
seçəcək işlər üçün hosted runner-lardan istifadə edir; rollout-dan əvvəl kifayət
qədər hosted tutumun mövcudluğu yoxlanılmalıdır.

Hər JSON qəbzı checkout edilmiş SHA-nı, iş axını icrasını və cəhdi
müəyyənləşdirir. CLI checkout/hadisə SHA uyğunsuzluğunu rədd edir. İş axını
testləri siyasət üzvlüyünü qərar işinin `needs` siyahısına bağlayır ki, yeni və
ya silinmiş zolaq səssizcə itə bilməsin. Qəbzlər öz iş axınlarını əhatə edir;
nəşri, yerləşdirməni və ya mövcud məsləhətçi skanerin daxili quruluşunu yox.
Budak qaydalarında hər iki yoxlama adının aktivləşdirilməsi ayrıca inzibati
dəyişiklikdir; bu işlərin əlavə olunması özü-özündə budağı qorumur.

### Statik skan inventarı

Versiyalaşdırılmış npm-alias inventarı və statik-skan üzvlüyü
`config/quality/gate-manifest.json` faylında saxlanılır. Skript adlarını və dəqiq
əmrləri `package.json` ilə yoxlamaq üçün `npm run check:gate-manifest` əmrini
icra edin; əlavələr, silinmələr və əmr sapması həm lokal hook-u, həm də CI-dakı
dəyişiklik-təsnifatı işlərini uğursuzluğa məhkum edir. Alias nə iş axını işidir,
nə matris instansiyası, nə də test halı: bu saylar bir-birinin əvəzi kimi təqdim
edilməməlidir.

Seçilmiş alias-ları icra etmədən yoxlamaq üçün `npm run quality:scan -- --list`
və ya `npm run quality:scan:fast -- --list` əmrindən istifadə edin. Runner npm
giriş nöqtəsini çağırır, ona görə də onun runtime-ı (konfiqurasiya olunduğu yerdə
Bun daxil olmaqla) qorunur. Manifest həmin profillərdən kənarda qalan alias-ları
ayrıca çağırılan kimi qeyd edir və baxım əmrləri yalnız-oxunan skan profillərində
qadağandır.

Bu profillər yalnız statik skanı əhatə edir. Onlar məhsul testlərini, əhatə
dərəcəsini, paketlənməni, xarici yoxlamaları və ya namizədin tam buraxılış
qəbulunu təsdiqləmir. İş axını qəbulunda əlaqələndirilmiş
`config/quality/admission-policy.json` və `scripts/quality/admission-verdict.mjs`
istifadə olunur. Release-observer profilləri ayrıca qalır; onların tətbiq olunan
yoxlamalarını və qəbzələrini müstəqil şəkildə yoxlayın. Aşağıdakı nəsr inventarı
istinad xarakterlidir, qapının həqiqətən icra olunduğunun sübutu deyil.

Skriptlər `scripts/check/` (siyasət qapıları) və `scripts/quality/` (ratchet
mühərriki) qovluqlarında yerləşir. CI-ın həqiqət mənbəyi
`.github/workflows/ci.yml` faylıdır.

### Release PR sürətli yolu (`quality.yml`)

`.github/workflows/quality.yml` main/release PR-lərində, `main`-ə push-larda,
əl ilə işə salma və birləşmə qruplarında CI-ı tamamlayır. PR-lər yol-filtrlənmiş
sürətli yoxlamalardan istifadə edir. Daimi olaraq deaktiv edilmiş dublikat build
silindi; real build/paket/boot yoxlamaları CI-da qalır.

| İş                                               | Əhatə                                                                                                                                                                                                                     | Bloklayıcı                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `Docs Gates (fast-path)`                         | Sənəd/kod PR-ləri; API sənəd istinadları və docs-all                                                                                                                                                                      | Bəli                         |
| `Fast Quality Gates`                             | Kod PR-ləri; statik yoxlamalar, typecheck, dashboard typecheck, təsirə məruz qalan vahid testləri                                                                                                                         | Bəli                         |
| `Forgotten sibling tests`                        | Kod PR-ləri; dəyişdirilmiş modullar statik istehlakçılara və namizəd qardaş testlərinə qədər izlənir; barrel və dinamik-import yolları istinad edilmiş allowlist istisnaları ilə məsləhətçi diaqnostikası kimi bildirilir | **Məsləhətçi**               |
| `Vitest (fast-path)`                             | Kod PR-ləri; sürətli vitest dəsti                                                                                                                                                                                         | Bəli                         |
| `Unit Tests fast-path`                           | Kod PR-ləri; 4 şardlı vahid dəsti                                                                                                                                                                                         | Bəli                         |
| `No new ESLint warnings`                         | Kod PR-ləri; suppression-ları nəzərə alan lint keşikçisi                                                                                                                                                                  | Bəli, fork-lar daxil olmaqla |
| `Merge integrity (changelog + generated skills)` | Qaralama olmayan PR-lər; changelog və yaradılmış bacarıqların sinxronizasiyası                                                                                                                                            | Bəli, fork-lar daxil olmaqla |

#### Unudulmuş qardaş testləri hesabatı

`npm run check:forgotten-sibling-tests` test-təsir xəritəsinin arxasındakı import rezolverini yenidən istifadə edir.
Hər dəyişdirilmiş produksiya modulu üçün, namizəd test pull-request diff-ində olmadıqda deterministik
`changed module/symbol -> static consumer -> candidate sibling test` zəncirlərini bildirir. Markdown xülasəsi və JSON nəticəsi, hər hansı bloklayıcı buraxılışdan əvvəl kalibrasiya üçün
`forgotten-sibling-tests` workflow artefaktı kimi saxlanılır.

Barrel re-exportları və dinamik importlar yalnız həll diaqnostikasıdır; onlar heç vaxt
bloklayıcı tapıntı yaratmır. Nəzərdən keçirilmiş istisnalar
`config/quality/forgotten-sibling-allowlist.json` faylında yerləşir. Hər qeyd istehlakçını və namizəd
testi göstərməli, konkret əsaslandırma verməli və GitHub issue və ya pull request-ə keçid verməlidir. Səhv formalaşdırılmış qeydlər
qapalı rejimdə uğursuz olur. İstisnalar silinmiş namizəd testi və ya `.skip`/`.todo` əlavə edən diff-i
gizlədə bilməz; assertion zəiflədilməsi və digər maskalama müstəqil şəkildə bloklayan
`check:test-masking` qapısının məsuliyyətində qalır.

### Tapşırıq: `lint`

`main` qoluna açılan hər PR-da işə düşür. Uğursuzluq halında merge-i bloklayır.

| Skript (`npm run ...`)            | Yoxlayır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bloklayır                                           |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:node-runtime`              | Node.js versiyasının dəstəklənən aralıq daxilində olması                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                                |
| `check:cycles`                    | `src/` + `open-sse/` üzrə dairəvi importlar (AST əsaslı, tsconfig `paths` həll edilmiş). Sadə variant hər hansı dövr mövcud olduqda 1 kodu ilə çıxır (#15281-dən bəri fail-closed) və SCC-ləri siyahıya alır. `check:cycles:ratchet` (CI-ın işlətdiyi) say `quality-baseline.json` faylındakı `metrics.cycles` həddini aşdıqda bloklayır — hazırda 14, `direction: down`, yəni yalnız azala bilər (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bəli (ratchet)                                      |
| `check:boundary`                  | `open-sse → src` bağlılığı: mühərrikdən tətbiqə unikal fayldan-fayla importlar (`scripts/quality/measure-boundary.mjs`; kənar siyahısı v4 core/module-split aradan qaldırma işlər siyahısıdır). Sadə variant = məsləhət xarakterli hesabat (`quality:boundary` ilə eyni). `check:boundary:ratchet` (CI-ın işlətdiyi, həmçinin `quality.yml` fast-gates ratchet dövründə) say `quality-baseline.json` faylındakı `metrics.boundaryOpenSseToSrc` həddini aşdıqda bloklayır — ölçülmüş 771 ilə ilkinləşdirilib, `direction: down`; `--update` yalnız azalda bilər; PR-lərdə baza-nisbi (`--base-ref`, aşağıya baxın)                                                                                                                                                                                                                                                                       | Bəli (ratchet)                                      |
| `check:route-validation:t06`      | Bütün marşrutlarda Zod sxemlərinin mövcudluğu (Tier 6 siyasəti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bəli                                                |
| `check:any-budget:t11`            | `@ts-expect-error // any` sayı büdcəni aşmır (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bəli                                                |
| `check:provider-consistency`      | `providers.ts`-dəki hər provayderin `providerRegistry.ts`-də uyğun qeydi var (və əksinə, allowlist daxilində)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                                |
| `check:model-lifecycle`           | Əllə saxlanılan üç marşrutlaşdırma cədvəli reposa əlavə edilmiş lifecycle snapshot-ı ilə uyğun qalır (#11503): `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY`-nin marşrutlaşdıra biləcəyi heç bir köhnəlmiş id-yə bal vermir; hər `BUILT_IN_ALIASES` hədəfi `REGISTRY`-də mövcuddur və köhnəlmiş id snapshot-ında yoxdur; `REGISTRY`-də hələ də qalan hər köhnəlmiş id ya yönləndirilir, ya da `allowedRetiredInCatalog`-da siyahıya alınıb; və heç bir `DEFAULT_DEGRADATION_MAP` mənbəyi və ya hədəfi həmin snapshot-da köhnəlmiş görünmür. Bu, modelin hazırda canlı upstream tərəfindən təqdim olunduğunu sübut etmir. Offline — `config/quality/model-lifecycle.json` ilə müqayisə aparır, əllə `npm run quality:refresh-model-lifecycle` ilə yenilənir (şəbəkə; CI-ya qoşulmayıb). `allowedRetiredInCatalog` bir burn-down ratchet-dir: qeyd yalnız izləmə issue-su ilə əlavə edin. | Bəli                                                |
| `check:fetch-targets`             | Client tərəfdəki `src/`-dəki hər `fetch("/api/...")` real `route.ts`-ə həll olunur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bəli                                                |
| `check:deps`                      | Repo-dakı hər `package.json` üzrə `npm install` edilə bilən bütün asılılıqlar `dependency-allowlist.json`-dadır; yeni pinlənməmiş və ya slopsquat edilmiş paketlər işarələnir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                                |
| `audit:deps`                      | `npm audit` (root + electron) — yüksək/kritik tövsiyələr yoxdur (osv `check:vuln-ratchet` ilə üst-üstə düşür; bax: Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Bəli                                                |
| `check:lockfile`                  | `package-lock.json` bütövlüyü — https registry, bütövlük heşləri, host əvəzləmələri yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                                |
| `check:licenses`                  | İstehsal asılılıqları üçün SPDX lisenziya icazə siyahısı                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                                |
| `check:tracked-artifacts`         | Build artefaktları / commit edilmiş `node_modules` symlink-ləri yoxdur (həmçinin husky pre-commit-də işləyir; pre-push qəsdən yüngüldür — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Bəli                                                |
| `check:ai-attribution`            | PR commit-lərində, başlıqda və ya mətndə AI/bot `Co-Authored-By` trailer-i və ya AI-generasiya footer-i yoxdur — Sərt Qayda #16 (PR→`release/**` üçün `quality.yml` fast-gates dövrəsində — hadisə payload-unu oxuyur, PR-lərdən kənarda no-op — və PR→`main` üçün `ci.yml` lint-də yalnız-PR addımı; həmçinin husky `commit-msg` hook-u; insan həmmüəlliflərə icazə verilir; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Hər Vitest istisnası izləmə issue-sunu göstərir və `config/quality/vitest-exclusions.json`-da görünür (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Bəli                                                |
| `check:file-size`                 | Mənbə faylları (`src/`, `open-sse/`, `electron/`, `bin/`-dəki `.ts`/`.tsx`) `cap` həddində qalır, test faylları (`*.test.ts(x)`) isə `testCap` həddində; `file-size-baseline.json`-da dondurulmuş fayllar (`frozen` / `testFrozen`) qeydə alınmış ölçülərindən artıq böyüməməlidir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bəli                                                |
| `check:error-helper`              | Executor/handler-lərdə xəta cavabları `buildErrorBody()` / `sanitizeErrorMessage()` funksiyalarından istifadə edir (Sərt Qayda #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bəli                                                |
| `check:migration-numbering`       | Miqrasiya SQL faylları ardıcıl nömrələnib, boşluq və ya təkrarlanma yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Bəli                                                |
| `check:public-creds`              | `publicCreds.ts` faylından kənarda literal OAuth `client_id`/`client_secret` və ya Firebase Web açarları yoxdur (Sərt Qayda #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Bəli                                                |
| `check:db-rules`                  | `src/lib/db/` modullarından kənarda xam SQL yoxdur; `localDb.ts`-dən barrel-import yoxdur (Sərt Qaydalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Bəli                                                |
| `check:known-symbols`             | Öz dispatch cədvəllərində qeydiyyatdan keçmiş provayder executorları, marşrutlaşdırma strategiyaları və tərcüməçilər diskdəki fayllara uyğun gəlir — sahibsiz və ya bəyan edilməmiş simvollar yoxdur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Bəli                                                |
| `check:route-guard-membership`    | Uşaq proses yaradan hər bir marşrut `isLocalOnlyPath()` tərəfindən təsnif edilir (Sərt Qaydalar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Bəli                                                |
| `check:test-discovery`            | Repodakı hər `*.test.ts` / `*.spec.ts` faylı ən azı bir test runner tərəfindən toplanır (ratchet: `test-discovery-baseline.json`-dakı yetim siyahı yalnız azala bilər)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Bəli                                                |
| `check:agent-skills-sync`         | Generasiya olunmuş agent-skills artefaktları öz mənbə kataloqu ilə uyğun gəlir (sapma yoxdur)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                     |
| `check:provider-asset-provenance` | Provayder loqoları/aktivləri qeydə alınmış mənşə (provenance) yazısı daşıyır                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                     |
| `lint:json`                       | JSON konfiqurasiya faylları parse olunur və reponun lint qaydalarına uyğundur                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                     |
| `typecheck:core`                  | TypeScript kompilyasiyası xətasız (yalnız məsləhət xarakterli xəbərdarlıqlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Bəli                                                |
| `typecheck:noimplicit:core`       | Sərt `noImplicitAny` — gələcəyə yönəlmiş; bir çox artıq mövcud olan çağırış yerləri hələ də annotasiya tələb edir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | **Məsləhət xarakterli** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` üzrə məhdudlaşdırılmış `tsc` (#7033) — `typecheck:core`-un seçilmiş 27 fayldan ibarət icazə siyahısı heç bir dashboard TSX-i əhatə etmir və `next build` də onu heç vaxt tip yoxlamasından keçirmir (`next.config.mjs` `ignoreBuildErrors: true` təyin edir), buna görə oradakı yetim identifikator reqressiyaları (#6625/#6909) CI üçün görünməz idi. Dondurulmuş fayl/TS-kod sayı bazası ilə müqayisə (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` ilə eyni köhnəlmişlik-məcburiyyət nümunəsi) — yalnız baza sayından artıq YENİ xətalar qapını uğursuz edir; artıq mövcud olan xəta düzəldildikdə `--update` ilə aşağı ratchet edin.                                                                                                                                                                                          | Bəli                                                |

### Tapşırıq: `quality-gate`

`test-coverage`-dən sonra işləyir. Uğursuzluq halında birləşməni bloklayır.

| Skript                       | Yoxlayır                                                                                                                                                                                                     | Bloklayır                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `quality:collect`            | `quality-metrics.json` yaradır (ESLint xəbərdarlıqlarının sayı, birləşdirilmiş shard hesabatından əhatə)                                                                                                     | Bəli (ratchet-dən əvvəl) |
| `quality:ratchet`            | `quality-baseline.json`-dakı hər bir metrika reqressiya etməyib (ESLint xəbərdarlıqları ≤ baza; əhatə ≥ baza)                                                                                                | Bəli                     |
| `check:duplication`          | Kod dublikatı (jscpd@4) `quality-baseline.json`-dakı baza həddini aşmır                                                                                                                                      | Bəli                     |
| `check:complexity`           | Fayl səviyyəli tsiklomatik mürəkkəblik həddi aşmır (əsas ESLint `complexity` + `max-lines-per-function`)                                                                                                     | Bəli                     |
| `check:cognitive-complexity` | Koqnitiv mürəkkəblik ratchet-i (`eslint-plugin-sonarjs`) — ayrıca ESLint keçidi; CI hər ikisini tək `check:complexity-ratchets` addımı kimi birləşmiş işlədir                                                | Bəli                     |
| `check:dead-code`            | İstifadə olunmamış exportlar / fayllar ratchet-i (knip) baza ilə müqayisədə reqressiya etmir                                                                                                                 | Bəli                     |
| `check:compression-budget`   | Sıxılma benchmark büdcəsi — hər mühərrik üçün token qənaətinin minimum hədləri reqressiya etməməlidir                                                                                                        | Bəli                     |
| `check:type-coverage`        | Faiz-tiplənmə ratchet-i (`type-coverage`) reqressiya etmir; böyük ölçüdə `typecheck:noimplicit:core`-u əhatə edir                                                                                            | Bəli                     |
| `check:codeql-ratchet`       | Açıq CodeQL xəbərdarlıqlarının sayı reqressiya etmir (`gh api` vasitəsilə oxuyur; token olmadan zərif şəkildə ötüklənir) — yenilənmə tezliyi və əl ilə işə salma: aşağıdakı "CodeQL ratchet" bölməsinə baxın | Bəli                     |

### Tapşırıq: `quality-extended`

Bütün tapşırıq məsləhət xarakterlidir (`continue-on-error: true`). npm əsaslı
ratchet-lər real işləyir; xarici skanerlər `gh release download` vasitəsilə
quraşdırılır və binar fayl hələ də mövcud olmadıqda özlərini ötükləyirlər (exit 0).

| Skript                   | Yoxlayır                                                                                                                                                                                                                             | Bloklayır                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `check:circular-deps`    | Dairəvi asılılıqlar yoxdur (dpdm)                                                                                                                                                                                                    | **Məsləhət**                                      |
| `check:bundle-size`      | Bundle ölçüsü həddi aşmır                                                                                                                                                                                                            | **Məsləhət**                                      |
| `check:secrets`          | Gizli məlumatların skanlanması (gitleaks) — binar fayl yoxdursa ötüklənir                                                                                                                                                            | **Məsləhət**                                      |
| `check:vuln-ratchet`     | Asılılıq zəiflikləri (osv-scanner) reqressiya etmir — binar fayl yoxdursa ötüklənir                                                                                                                                                  | **Məsləhət**                                      |
| `check:workflows`        | Workflow lint (actionlint + zizmor); çatışmayan/pozulmuş skanerlər, etibarsız hesabatlar və ya çatışmayan ratchet baza xətti INCOMPLETE kimi uğursuz olur. Etibarlı tapıntılar seçilmiş strict/advisory/ratchet siyasətinə əməl edir | İcra tələb olunur; CI-də zizmor ratchet bloklayır |
| `check:openapi-breaking` | Baza budağına nisbətən açıq API müqaviləsində (`openapi.yaml`) qırıcı dəyişikliklər (oasdiff) — `openapiBreaking=N` yaradır; oasdiff yoxdursa və ya baza spesifikasiyası müəyyən edilə bilmirsə ötüklənir                            | **Məsləhət**                                      |

### Tapşırıq: `docs-sync-strict`

`main`-ə olan hər bir PR-da işləyir. Uğursuzluq halında birləşməni bloklayır.

| Skript                         | Yoxlayır                                                                                                                                                                                            | Bloklayır                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Aşağıdakı 6 alt-qapını ardıcıl olaraq işə salan meta-qapı                                                                                                                                           | Bəli                        |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiya uyğunluğu                                                                                                                                                     | Bəli                        |
| ↳ `check:docs-counts`          | Nəsrdəki saylar (provayder sayı, miqrasiya sayı və s.) real sayların ratchet pəncərəsi daxilindədir                                                                                                 | Bəli                        |
| ↳ `check:env-doc-sync`         | `.env.example`-dəki hər mühit dəyişəni sənədlər cədvəlində sənədləşdirilib və əksinə                                                                                                                | Bəli                        |
| ↳ `check:deprecated-versions`  | Sənədlərdə köhnəlmiş versiya sətirləri yoxdur                                                                                                                                                       | Bəli                        |
| ↳ `check:doc-links`            | Sənədlərdəki daxili markdown keçidləri real fayllara açılır (`[text]`/`(path)` forması)                                                                                                             | Bəli                        |
| ↳ `check:fabricated-docs`      | Sənədlərdə istinad olunan marşrutlar, mühit dəyişənləri, CLI əmrləri, hook adları və fayl yolları kod bazasında mövcuddur. `--strict` ilə sərt qapı; bayraqsız halda yumşaq uğursuzluq (soft-fail). | Bəli (CI-da `--strict` ilə) |
| `check:cli-i18n`               | CLI əmr sətirləri bütün i18n lokal fayllarında mövcuddur                                                                                                                                            | Bəli                        |
| `check:openapi-coverage`       | OpenAPI spesifikasiyası real marşrutların ən azı ratchet edilmiş minimum həddini əhatə edir                                                                                                         | Bəli                        |
| `check:openapi-security-tiers` | `openapi.yaml`-dəki təhlükəsizlik səviyyəsi annotasiyaları `routeGuard.ts` təsnifatları ilə uyğundur                                                                                                | **Məsləhət xarakterli**     |
| `check:openapi-routes`         | `openapi.yaml`-dəki hər yol real `route.ts` faylına açılır (hallüsinasiya əleyhinə)                                                                                                                 | Bəli                        |
| `check:docs-symbols`           | `docs/**/*.md`-dəki hər `/api/...` istinadı real `route.ts` faylına açılır (hallüsinasiya əleyhinə)                                                                                                 | Bəli                        |
| `i18n translation drift`       | i18n lokal fayllarında tərcümə olunmamış açarlar — yalnız xəbərdarlıq                                                                                                                               | **Məsləhət xarakterli**     |

### İş: `i18n-ui-coverage`

| Skript                                 | Yoxlayır                                                                                                                                                                                                 | Bloklayır               |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check-ui-keys-coverage` (sətirdaxili) | UI i18n açar əhatəsi ≥ 65%-dir                                                                                                                                                                           | Bəli                    |
| `check-ui-value-drift` (sətirdaxili)   | Yenidən yazılmış ingilis **dəyəri** arxada köhnəlmiş tərcümə qoymur                                                                                                                                      | Bəli                    |
| `check-new-key-coverage` (sətirdaxili) | **Yeni** ingilis açarı hər lokalda tərcümə olunub — `__MISSING__:` markeri rədd edilir                                                                                                                   | Bəli                    |
| `check-translation-ratio`              | Lokal üzrə real tərcümə nisbəti (icazə siyahısından kənarda qalan ingiliscə ilə eyni / placeholder / itkin yarpaqlar) `config/quality/i18n-translation-baseline.json` + əlavə boşluq həddini aşmamalıdır | **Məsləhət xarakterli** |

`fetch-depth: 0` tələb olunur — value-drift qapısı `en.json` faylını merge base ilə müqayisə edir.

#### `check-ui-value-drift` — köhnəlmiş tərcümə qapısı

Digər qapıların struktur baxımdan görə bilmədiyi yeganə i18n reqressiyanı tutur: ingilis dəyəri
yenidən yazılır və _əvvəlki_ ingilisdən törədilmiş tərcümələr geridə qalır, nəticədə ingilis dili
bilməyən istifadəçilər inamla yazılmış, lakin artıq yanlış olan mətni oxumağa davam edirlər.

Bu real olaraq baş verib. `oauthModal.googleOAuthWarning` Antigravity giriş köməkçisi əlavə
olunanda (#5203) yenidən yazıldı; **43 lokaldan 39-u** operatorlara «tam URL-i kopyalayın və
aşağıya yapışdırın» deyən mətni saxladı — həmin provayder üçün tamamlana bilməyən bir axın. Bu,
#8463-ə qədər nəzərdən qaçdı, çünki:

- `sync-ui-keys` yalnız **mövcud olmayan** açarları doldurur, heç vaxt **köhnəlmiş** olanları yox;
- `check-ui-keys-coverage` açarın _mövcudluğunu_ sayır, ona görə də köhnəlmiş tərcümə əhatə olunmuş kimi qiymətləndirilir;
- `check-translation-drift` `docs/i18n/<locale>/**.md` sənəd güzgülərini izləyir —
  o, heç vaxt `src/i18n/messages/*.json` fayllarını oxumur. 2026-09 yenidən sinxronizasiyasından
  bəri `docs-sync-strict` işində bloklayır: əsas sənədi redaktə edin → `npm run i18n:run -- --files=<doc>` (bölmə səviyyəsində, yüngül).

**Fərqə əsaslı, baza xətti ilə dəstəklənmir.** O, `en.json` faylını merge base nöqtəsində işçi ağacı ilə müqayisə edir; ingilis dəyəri dəyişən hər bir açar üçün toxunulmamış tərcüməni saxlayan istənilən lokal köhnəlmiş sayılır. Bu, qəsdən **mövcud borcu dondurur** — diff uzun müddətdir mövcud olan tərcümənin hansı köhnə ingilis mətnindən gəldiyini göstərə bilmir, ona görə də qapı yalnız cari dəyişikliyin toxunduqlarını qiymətləndirir. Alternativ (hər açar üzrə hash baza xətti) ~600 KB-lıq generasiya olunmuş fayla başa gələrdi — mövcud ən böyük baza xəttinin 3 qatı — və hər i18n PR-da yenidən dəyişməli olardı.

Onu təmin etməyin iki yolu var:

1. təsirə məruz qalan tərcümələri yeniləyin, və ya
2. onları `__MISSING__:<new english>` olaraq təyin edin — bu zaman runtime düzəldilmiş ingilis mətnini təqdim edir (`src/i18n/request.ts::deepMergeFallback`, #7258) və açar tərcümə növbəsinə düşür.

Əgər sətirin **mənası** dəyişibsə, **açarın adını dəyişməyi** üstün tutun: yeni açar köhnəlmiş tərcüməni miras ala bilməz. #8463 məhz bu nümunədən istifadə edib.

```bash
npm run i18n:check-value-drift          # sərt (CI bunu işlədir)
npm run i18n:check-value-drift:warn     # yalnız hesabat
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Baza kataloqu oxuna bilmədikdə (baza ref-i olmayan dayaz klon) `SKIP reason=base-unresolved` ilə 0 çıxış kodu qaytarır, `check-openapi-breaking`-in davranışını əks etdirir.

### Tapşırıq: `i18n`

Tam i18n validasiya matrisi (hər lokal üçün bir tapşırıq). Bütün tapşırıq məsləhət xarakterlidir.

| Skript                          | Validasiya edir                | Bloklayır                                                    |
| ------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| `validate_translation.py quick` | Hər lokal üzrə tərcümə tamlığı | **Məsləhət** (bütün tapşırıq üzrə `continue-on-error: true`) |

### Tapşırıq: `pr-test-policy`

Yalnız pull request-lərdə işləyir.

| Skript                 | Validasiya edir                                                                                                                                      | Bloklayır |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` və ya `bin/` qovluqlarında istehsal kodunu dəyişən PR-lər test əlavə etməli və ya yeniləməlidir (Sərt Qayda #8)     | Bəli      |
| `check:test-masking`   | Dəyişilmiş test faylları xalis assert sayını azaltmamalı və ya `assert.ok(true)` tavtologiyaları əlavə etməməlidir                                   | Bəli      |
| `check:pr-evidence`    | PR mətni dəyişiklik üçün test/VPS sübutlarına istinad etməlidir (PR mətnini grep-ləyərək Sərt Qayda #18-i mexanikləşdirir — kövrəkdir, bax: Backlog) | Bəli      |

### Tapşırıq: `test-vitest`

`build`-dan sonra işləyir. Uğursuzluq halında birləşməni bloklayır.

| Dəst             | Validasiya edir                                        | Bloklayır                                                                                                                         |
| ---------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 alət), autoCombo, keş — vitest runner | Bəli                                                                                                                              |
| `test:vitest:ui` | UI komponent testləri — vitest runner                  | **Bloklayır** — mövcud uğursuzluqlar `vitest.config.ts`-də açıq şəkildə istisna edilib; yeni uğursuzluqlar tapşırığı uğursuz edir |

### Gecə iş axınları (planlaşdırılmış, məsləhət)

Bunlar cron cədvəli ilə (və `workflow_dispatch` ilə) işləyir, heç vaxt PR-lərdə yox. Hamısı məsləhət xarakterlidir.

| İş axını               | Validasiya edir                                                                                                                                                                       | Bloklayır    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | təsadüfi toxum + yüksək işlətmə sayı ilə fast-check property testləri                                                                                                                 | **Məsləhət** |
| `nightly-resilience`   | heap-artım qapısı, xaos xəta inyeksiyası, k6 yük/davamlı yük                                                                                                                          | **Məsləhət** |
| `nightly-llm-security` | promptfoo inyeksiya mühafizəsi (blok rejimi) + garak zondları (provider secret olmadıqda keçirilir)                                                                                   | **Məsləhət** |
| `nightly-schemathesis` | `docs/openapi.yaml` istifadə edərək canlı OmniRoute-a qarşı OpenAPI müqavilə fuzzinqi (schemathesis) — spesifikasiya pozuntularını / emal edilməmiş 500-ləri üzə çıxarır (Fase 8 B.4) | **Məsləhət** |
| `nightly-mutation`     | sürətli vahid zolağı üzrə Stryker mutasiya-testi balı — sağ qalan mutantlar zəif assert-ləri üzə çıxarır                                                                              | **Məsləhət** |
| `nightly-compat`       | dəstəklənən `engines.node` aralıqları üzrə Node mühərriki uyğunluq matrisi                                                                                                            | **Məsləhət** |

Performans baza xətləri (heap, TTFB, yığma müddəti) qeydə alınır, qapılanmır: bax: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

## İcazə siyahısı siyasəti

Əvvəldən mövcud olan pozuntular səbəbindən uğursuz ola bilməyən hər bir yoxlama sabitləşdirilmiş icazə siyahısından
(məsələn, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) istifadə edir. Siyasət belədir:

**Əsas səbəbi aradan qaldırın; icazə siyahısından yalnız pozuntu əvvəldən mövcud olduqda və
eyni PR çərçivəsində düzəldilə bilmədikdə istifadə edin.**

İcazə siyahısına qeyd əlavə edərkən:

1. Əsaslandırmanı ehtiva edən şərh əlavə edin.
2. İzləmə məsələsinə istinad edin (məsələn, `// #3498 — Mərhələ 2 funksionallığı, hələ həyata keçirilməyib`).
3. Pozuntunu düzəldən eyni PR çərçivəsində qeydi silin — artıq aktiv pozuntunu
   istisna etməyən köhnəlmiş qeyd özü də qüsurdur (6A.3 köhnəlmiş-tətbiqetmə funksiyası
   həyata keçirildikdən sonra sahibsiz icazə siyahısı qeydi yoxlamanın uğursuz olmasına
   səbəb olacaq).

Testlərin daha tez keçməsi üçün icazə siyahısına qeydlər əlavə **etməyin**. Böyüyən
icazə siyahısı ilə uğurlu yoxlama yanlış keyfiyyət təəssüratı yaradır.

### PR-nizdə yoxlama uğursuz olduqda

1. **Yoxlama çıxışını diqqətlə oxuyun** — o, qaydanı hansı faylın və ya simvolun pozduğunu
   dəqiq göstərir.
2. **Pozuntunu düzəldin** — yoxlamaların əksəriyyəti kod düzgün olan kimi uğurla keçən
   deterministik fayl sistemi yoxlamalarıdır.
3. **Pozuntu əvvəldən mövcuddursa** (yəni onu siz yaratmamısınız, lakin yoxlama artıq
   onu əhatə edir): əsaslandırma şərhi və izləmə məsələsi ilə birlikdə icazə siyahısına qeyd əlavə edin.
4. **Yoxlama ratçetdirsə** (əhatə dairəsi, ESLint xəbərdarlıqları, təkrarlanma, mürəkkəblik):
   dəyişikliyiniz göstəricini pisləşdirib. Əsas problemi düzəldin və ya (nadir hallarda) dəyişiklik
   qəsdən edilibsə və göstəricinin pisləşməsi məqbuldursa, `npm run quality:ratchet -- --update`
   əmrini icra edin — lakin səbəbini PR təsvirində sənədləşdirin.
5. **Məsləhət xarakterli yoxlamalar** (`continue-on-error: true`) məlumat məqsədlidir — onlar
   birləşdirməni bloklamır, lakin CI xülasəsində görünür. Buna baxmayaraq, onları düzəldin.

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

## Rasionallaşdırma ehtiyat siyahısı (ROI icmalı — Mərhələ 9 Dalğa 3)

Bu inventar 2026-06-17 tarixində `ci.yml` ilə tutuşduruldu (əvvəlki versiyada
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` buraxılmışdı). Tutuşdurulmuş dəstin ROI icmalı
aşağıdakı rasionallaşdırma namizədlərini müəyyən etdi. **Birləşdirmələr mexaniki CI
dəyişiklikləridir; çevirmə/ləğvetmə qərarları operatorun səlahiyyətində olan siyasət qərarlarıdır.** Aşağıdakılardan heç biri
hələ tətbiq edilməyib.

**Yuxarıda sənədləşdirilməyənlər də var** (məsləhət xarakterli, zəif siqnal): `docs-lint` işi
(markdownlint + Vale, bütün iş üçün `continue-on-error`) və müstəqil skaner iş axınları
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json` daxilindədir, lakin `ci.yml` daxilində bloklayıcı bir xırxır mexanizminə qoşulmayıb — metrik
hazırda təcrid olunub.

### Birləşdirmə / təkrarların aradan qaldırılması (mexaniki, daha az riskli)

Hər bir namizəd 2026-06-17 tarixində mövcud qapı vəziyyətinə əsasən yoxlanılıb (etibar et, amma yoxla);
bir neçə «aşkar» birləşdirmənin borcu gizlətdiyi üzə çıxdı və onlar **birbaşa əvəzləmə üçün uyğun deyil**.

- **`check:docs-sync` iki dəfə işə düşür** — `lint` işində ayrıca və yenidən `check:docs-all` (`docs-sync-strict`) daxilində, həmçinin husky pre-commit qarmağında. ✅ **TAMAMLANDI** — ayrıca `lint` çağırışı silindi.
- **CVE skanlaması** — ❌ **Təmiz birləşdirmə DEYİL.** `audit:deps` istənilən yüksək/kritik CVE olduqda sərt şəkildə uğursuz olur; `check:vuln-ratchet` (osv) isə yalnız baza xətti ilə müqayisədə _geriləmə_ olduqda uğursuz olur (hazırda 1 MODERATE). Semantikaları fərqlidir — `audit:deps` ləğv edilsəydi, mütləq yüksək/kritik qapı itirilərdi. Hər ikisini saxlayın.
- **Dövr aşkarlanması** — ✅ **TAMAMLANDI** (#15159 G-01/G-02). Buradakı köhnə mətn `check:cycles` yoxlamasını «yaşıl, seçilmiş» qapı adlandırır və `check:circular-deps` (dpdm) 91 dövr bildirdiyi üçün onu bloklayıcı saxlamağı əsaslandırırdı. Həmin yaşıl status **yanlış yaşıl** idi: `check:cycles` 5 alt kataloqu (450 fayl) skan edir, yalnız statik `import|export … from` nümunələrini uyğunlaşdırır və hər bir `@/` və `@omniroute/open-sse/` spesifikatorunu kənarlaşdırırdı; buna görə repozitoriyada üstünlük təşkil edən dinamik import + alias dövrlərini görə bilmirdi. Düzəldildi: qapı indi `src` + `open-sse` daxilində gəzir (5023 fayl), spesifikatorları TypeScript AST-dən toplayır (beləliklə, `import("…")` nəzərə alınır, tip mövqeyindəki `typeof import("…")` isə alınmır) və tsconfig `paths` dəyərlərini həll edir. O, 0 deyil, **14** dövr tapır. Əvvəldən mövcud olan 14 dövr qapı PR-ında düzəldilə bilmədiyi üçün `check:cycles` indi **xırxır mexanizmidir** (`--ratchet`, `quality-baseline.json` daxilində yuxarı hədd `metrics.cycles.value = 14`, `direction: down`) — istənilən _geriləməni_ bloklayır və say yalnız azala bilər. CI `npm run check:cycles:ratchet` əmrini işə salır. Azaltma işi **A-01** ilə birlikdə aparılır. `check:circular-deps` (dpdm) daha geniş ikinci rəy kimi məsləhət xarakterli qalır.
- **Mürəkkəblik** — ✅ **TAMAMLANDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): bir ESLint keçidi, ruleId üzrə sayır ki, siklomatik+max-lines və koqnitiv baza xətləri müstəqil qalsın; ayrı-ayrı `check:complexity` / `check:cognitive-complexity` yoxlamaları lokal `--update` üçün saxlanılır.
- **`/api` anti-hallüsinasiya yoxlaması** — ✅ **TAMAMLANDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` üçün bir FS inventarı, openapi-routes + docs-symbols yenə də müstəqil hesabat verir; fərdi yoxlamalar lokal icralar üçün saxlanılır.
- **`check:node-runtime` 11 işdə icra olunur** — ⚠️ **aşağı ROI.** Hər biri ayrıca icra mühitidir və yoxlama <1s çəkir; ümumi qənaət ~10s təşkil edir, əvəzində isə hər iş üçün ucuz qoruyucu itirilir. Yaradacağı qarışıqlığa dəyməz.
- **CI lint-də `typecheck:noimplicit:core`** — ✅ **lint işindən silindi** (məsləhət xarakterli `continue-on-error` idi); bloklayıcı tip səthi `typecheck:core` + `check:type-coverage` ilə təmin edilir. Lokal skript saxlanıldı.

### Çevirmə / qərarvermə (operator siyasəti)

- `check:openapi-security-tiers` (məsləhət xarakterli) — ❌ **Təmiz şəkildə çevrilə BİLMƏZ.** 0 kodu ilə çıxır, lakin `LOCAL_ONLY_API_PREFIXES` altındakı bir neçə `traffic-inspector` marşrutunda `x-loopback-only: true` annotasiyasının olmadığını bildirir. Onu məcburi etmək üçün əvvəlcə həmin annotasiyalar `openapi.yaml` faylına əlavə edilməlidir.
- `typecheck:noimplicit:core` (məsləhət xarakterli) — bloklayıcı `check:type-coverage` xırxır mexanizmi tərəfindən əsasən əhatə olunur. Xırxır mexanizminə çevirin və ya lazımsız ikinci `tsc` keçidini ləğv edin.
- `test:vitest:ui` (indi **bloklayıcıdır**) — əvvəldən mövcud uğursuzluqlar `vitest.config.ts` daxilində `// #8618` izləmə şərhləri ilə açıq şəkildə istisna edilib; yeni uğursuzluqlar işin uğursuz olmasına səbəb olur.
- `check:secrets` (gitleaks, 3 sənədləşdirilmiş yanlış müsbət nəticədə dondurulmuş bloklayıcı xırxır mexanizmi) — 0-a çatmaq üçün bu 3 nəticəni icazə siyahısına əlavə edin və ya məsləhət xarakterli statusa endirin. GitHub-un daxili məxfi məlumat skanlaması + `check:public-creds` ilə üst-üstə düşür.
- `check:pr-evidence` (bloklayıcıdır, PR mətnini grep ilə axtarır) — yanlış müsbət nəticə riski yüksəkdir; ləğv edilərsə, Sərt Qayda #18-in icrasını zəiflədir, buna görə bu, həqiqi siyasət qərarıdır.
- `semgrep` (məsləhət xarakterli müstəqil yoxlama) — OWASP ailələri üzrə CodeQL ilə üst-üstə düşür; baza xəttini xırxır mexanizminə qoşun və ya ləğv edin.

---

## Əlaqəli sənədlər

- Təchizat zənciri (mənşə, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — açar dəstlərinin uyğunluq qapısı

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, `i18n-ui-coverage` tapşırığı).
Hər bir `src/i18n/messages/<locale>.json` faylındakı son səviyyə açarları dəstini `en.json` ilə müqayisə edir və
açarın nə vaxt əlavə edilməsindən asılı olmayaraq, çatışmayan və ya əlavə son səviyyə açarı olduqda uğursuz olur. `__MISSING__:`
yer tutucuları mövcud sayılır (onların məzmunu nisbət qapısının işidir). Bu, fərqə əsaslanan/faizli digər iki
qapının mütləq tamamlayıcısıdır: `check-ui-keys-coverage` hər lokal üçün 80 % minimum həddi tətbiq edir
(~13,000 açardan 43-nün çatışmaması yenə də 99.7 % kimi görünür), `check-new-key-coverage` isə yalnız
PR-ın `en.json` faylına əlavə etdiyi açarları qiymətləndirir. Lokal paketi budağının ayrıldığı gün mövcud olan
`en.json` əsasında yaradılır və əsas budaq açarlar əlavə etməyə davam edərkən tərcümə işi günlərlə davam edir;
paket PR-ı özü heç bir açar əlavə etmir, buna görə paket 1 (#13044) doqquz lokalda 43 açar çatışmazlığı ilə,
paket 2 (#13660) isə səkkiz lokalda 10 açar çatışmazlığı ilə birləşdiriləndə hər iki əlaqəli qapı səssiz qaldı
(2026-09-15). Qırmızı nəticəni
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ilə düzəldin; `extra` son səviyyə açarı
mənbənin onu sildiyini bildirir — həmin açarı lokaldan silin. `--warn` uğursuzluq yaratmadan hesabat verir.
`--catalog=cli` eyni müqayisəni `bin/cli/locales` üzərində aparır (`npm run i18n:check-keys:cli`);
hər iki addım `i18n-ui-coverage` tapşırığında yer alır.

#### `check-new-key-coverage` — yeni açarların i18n qapısı

`check-ui-value-drift` qapısının əlaqəli qapısıdır. Həmin qapı ingiliscə dəyərin **yenidən yazıldığı**,
lakin tərcümələrin geridə qaldığı halları aşkarlayır; bu qapı isə ingiliscə açarın **əlavə edildiyi**,
lakin bəzi lokalların onu heç almadığı halları aşkarlayır.

`check-ui-keys-coverage` bu halı görə bilmir: o, hər lokal üçün faizlə minimum hədd tətbiq edir və
~13,000 son səviyyə açarından on birinin çatışmaması əhatə səviyyəsini 99.9% saxlayır. Hər dil üzrə faiz
“bu funksiya tərcüməsiz buraxıldı” vəziyyətini ifadə edə bilməz — bütöv bir funksiya yeni lokalda heç bir
mətn olmadan buraxıla və göstəricini heç dəyişməyə bilər.

Bu qapının kodlaşdırdığı insident: Orchestration Canvas-ın 3-cü mərhələsi öz on bir açarını həmin vaxt
mövcud olan 42 lokalın hamısında tərcümə etdi. Bir neçə saat sonra Aİ dilləri paketi (#13044) repozitoriyanı
51 lokala çatdırdı və doqquz yeni lokal (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) həmin açarları
heç vaxt almadı. `deepMergeFallback` çatışmayan açarı ingiliscə mətnlə əvəz edir, buna görə uğursuzluq
boş interfeys deyil, tərcümə edilməmiş interfeys şəklində idi — real və quruluş etibarilə səssiz.

Əlaqəli qapı kimi bu da **fərqdən xəbərdardır**: birləşdirmə bazasındakı ingiliscəni işçi ağacla müqayisə edir,
beləliklə əvvəlcədən mövcud olan boşluqlar olduğu kimi qalır və qapını aktivləşdirmək üçün miqrasiya tələb olunmur.

**`__MISSING__:<english>` markeri bu tələbi ödəmir (2026-09-17 tarixindən etibarən).** Əvvəllər bu, sənədləşdirilmiş
təxirəsalma üsulu idi — icra zamanı düzgün ingiliscə mətnə geri qayıdılırdı — ta ki 2026-09-16 tarixində səkkiz
funksiya PR-ı 61 açar əlavə edib onları tərcümə etmək əvəzinə markerləri bütün 65 lokala yerləşdirənədək:
bu qapı onların hamısını qəbul etdi, PR-ları heç nə bloklamadı və real tərcümə nisbətini bloklayıcı şəkildə
yoxlayan qapı daha sonra buraxılışın son nöqtəsində hər kəs üçün uğursuz oldu (pt-BR 3.2 % > 2.5 % + 0.5).
İndi marker çatışmayan tərcümə kimi qiymətləndirilir. Qırmızı nəticəni
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ilə və ya
bütün lokalları paralel şəkildə `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ayrılmış rejimdə təhlükəsizdir, `OMNIROUTE_TRANSLATION_*` mühit dəyişənləri olmadan işə başlamaqdan imtina edir)
ilə düzəldin. İngiliscə qalmalı olan açar (sabitləşdirilmiş məhsul/mühərrik/bayraq adı)
heç vaxt marker arxasında deyil, `scripts/i18n/untranslatable-keys.json` daxilində olmalıdır.
`vi` markerləri tamamilə qadağan edir (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — dayandırılmış testlər qapısı

`vitest.config.ts` faylının `exclude` siyahısındakı fayl işlədilməyən testdir və ağacı oxuyan hər kəs üçün
əhatə kimi görünür. Altmış iki fayl
`// #8618 — əvvəlcədən mövcud olan uğursuzluq; düzəldildikdə bu istisnanı silin` şərhinin arxasında toplandı.
#8618 məsələsi 2026-08-11 tarixində bağlandı, lakin onun izlədiyi siyahı 45 qeyddən 62 qeydə qədər böyüdü
və hər yeni qeyd artıq bağlı olan məsələyə yönələn şərhi miras aldı. Siyahı nəhayət fayl-fayl ölçüldükdə
(#13204), **62 fayldan 51-i mənbədə heç bir dəyişiklik edilmədən cari ağacda uğurla keçdi**.

Qapı real fayla uyğun gələn hər bir istisnanın (a) izləmə məsələsini göstərməsini və
(b) ölçülmüş statusu ilə birlikdə `config/quality/vitest-exclusions.json` daxilində olmasını tələb edir;
beləliklə yeni istisna əlavə etmək 60 qeyddən ibarət massivdə daha bir sətir deyil, xüsusi faylda nəzərdən
keçirilə bilən fərq olur. Qapı istisna edilmiş testləri qəsdən yenidən işə salmır — bu, təxminən 10 dəqiqə
çəkir və dövri tapşırığa aiddir; inventar hər birinin son ölçülmə vaxtını qeydə alır.
