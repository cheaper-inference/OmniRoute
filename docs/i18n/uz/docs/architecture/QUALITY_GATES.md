# Quality Gates Reference (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ushbu hujjat OmniRouteʼdagi barcha CI sifat darvozalari uchun nufuzli maʼlumotnoma hisoblanadi.
Unda har bir darvoza, u nimalarni tekshirishi, qaysi CI topshirigʻida ishlashi, ratchet bazaviy
darajasidan yoki oʻtdi/oʻtmadi siyosatidan foydalanishi hamda tuzilishni bloklashi yoki tavsiyaviy
ekanligi bayon qilingan.

Qisqa xulosa va ruxsat etilganlar roʻyxati siyosati uchun `AGENTS.md` faylidagi
"Quality Gates & Ratchets" boʻlimiga qarang. Xuddi shu tizimning tanqidiy bahosi, yetuklik tasnifi
va vositalarga bogʻliq boʻlmagan takrorlash rejasi uchun
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md) hujjatiga qarang.

---

## Gate inventari va bajarish profillari

### Nomzodni qabul qilish

CI va Quality Gates workflow’larining har biri barqaror verdict chiqaradi: `Gate / CI` va
`Gate / Quality`. Ularning versiyalangan qabul siyosati har bir yuqori oqimdagi job’ni
majburiy yoki tavsiyaviy sifatida sanab chiqadi. Qo‘llaniladigan majburiy job muvaffaqiyatli
yakunlanishi kerak: mavjud bo‘lmagan, bekor qilingan, o‘tkazib yuborilgan, kutilayotgan va
noma’lum natijalar PASS’ni tasdiqlay olmaydi. Yaroqli faqat hujjatlar yoki faqat katalogga
tegishli tasnif kod yo‘nalishini qo‘llanilmaydigan qilishi mumkin; draft PR qabul qilingan
nomzod hisoblanmaydi. `hotfix` yorlig‘i dalillar talabini bekor qilmaydi.

Har ikkala workflow main/release branch’lariga yo‘naltirilgan PR’larni, `main` ga push’larni,
qo‘lda ishga tushirishni va merge-group hodisalarini qamrab oladi. Push, dispatch va
merge-group to‘liq tanlovni ishga tushiradi. `release/**` ga push’lar ularni ishga
tushirmaydi (2026-10-18): har bir o‘zgarish allaqachon o‘z PR’ida matritsadan o‘tgan,
birlashtirilgan kombinatsiya esa Release-Green’ning vazifasidir
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Fork’lar va merge group’lar boshqa holatda
self-hosted runner’larni tanlaydigan job’lar uchun hosted runner’lardan foydalanadi;
ishga chiqarishdan oldin yetarli hosted sig‘imi tekshirilishi kerak.

Har bir JSON receipt tekshirilgan SHA, workflow run va attempt’ni aniqlaydi.
CLI checkout/event SHA mos kelmasligini rad etadi. Workflow testlari siyosatga a’zolikni
verdict job’ining `needs` ro‘yxatiga bog‘laydi, shunda yangi yoki olib tashlangan yo‘nalish
sezdirmasdan yo‘qolib qolmaydi. Receipt’lar o‘z workflow’ini qamrab oladi, lekin
publication, deployment yoki mavjud tavsiyaviy skanerning ichki jarayonlarini qamrab
olmaydi. Branch rules’da ikkala tekshiruv nomini faollashtirish alohida ma’muriy
o‘zgarishdir; bu job’larni qo‘shishning o‘zi branch’ni himoya qilmaydi.

### Statik skan inventari

Versiyalangan npm-alias inventari va statik skan a’zoligi
`config/quality/gate-manifest.json` faylida joylashgan. `package.json` bilan script nomlari
va aniq buyruqlarni tekshirish uchun `npm run check:gate-manifest` buyrug‘ini ishga
tushiring; qo‘shishlar, olib tashlashlar va buyruqdagi og‘ishlar ham lokal hook’ni,
ham CI’dagi o‘zgarishlarni tasniflash job’larini muvaffaqiyatsiz qiladi. Alias workflow
job’i, matritsa nusxasi yoki test holati emas: bu hisoblar o‘zaro almashtiriladigan
sifatida taqdim etilmasligi kerak.

Bajarilmasdan tanlangan alias’larni ko‘rish uchun `npm run quality:scan -- --list` yoki
`npm run quality:scan:fast -- --list` dan foydalaning. Runner npm entrypoint’ini ishga
tushiradi, shuning uchun uning runtime’i (sozlangan bo‘lsa, Bun ham) saqlanadi.
Manifest ushbu profillardan tashqaridagi alias’larni alohida ishga tushiriladigan sifatida
qayd etadi, texnik xizmat buyruqlari esa faqat o‘qish uchun mo‘ljallangan skan
profillarida taqiqlanadi.

Ushbu profillar faqat statik skanni qamrab oladi. Ular mahsulot testlarini, qamrovni,
paketlashni, tashqi tekshiruvlarni yoki nomzodning to‘liq release qabulini
tasdiqlamaydi. Workflow’ga qabul qilish bog‘langan
`config/quality/admission-policy.json` va `scripts/quality/admission-verdict.mjs` dan
foydalanadi. Release-observer profillari alohida qoladi; ularning qo‘llaniladigan
tekshiruvlari va receipt’larini mustaqil ravishda tekshiring. Quyidagi nasriy inventar
ma’lumotnoma hisoblanadi, gate amalda ishga tushganining isboti emas.

Script’lar `scripts/check/` (siyosat gate’lari) va `scripts/quality/` (ratchet engine)
ostida joylashgan. CI uchun haqiqiy manba `.github/workflows/ci.yml` hisoblanadi.

### Release PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` main/release PR’larida, `main` ga push’larda, dispatch va
merge group’larda CI’ni to‘ldiradi. PR’lar yo‘l filtrlari bilan tezkor tekshiruvlardan
foydalanadi. Doimiy ravishda o‘chirilgan takroriy build olib tashlandi; haqiqiy
build/package/boot tekshiruvlari CI’da qoladi.

| Job                                              | Scope                                                                                                                                                                                                                                  | Blocking                      |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Hujjatlar/kod PR’lari; API hujjatlari havolalari va barcha hujjatlar                                                                                                                                                                   | Ha                            |
| `Fast Quality Gates`                             | Kod PR’lari; statik tekshiruvlar, typecheck, dashboard typecheck, ta’sirlangan unit test’lar                                                                                                                                           | Ha                            |
| `Forgotten sibling tests`                        | Kod PR’lari; o‘zgartirilgan modullar statik iste’molchilarga va nomzod sibling test’lariga kuzatiladi; barrel va dynamic-import yo‘llari tavsiyaviy diagnostika sifatida, havola qilingan allowlist istisnolari bilan hisobot qilinadi | **Tavsiyaviy**                |
| `Vitest (fast-path)`                             | Kod PR’lari; tezkor vitest to‘plami                                                                                                                                                                                                    | Ha                            |
| `Unit Tests fast-path`                           | Kod PR’lari; 4-shard unit to‘plami                                                                                                                                                                                                     | Ha                            |
| `No new ESLint warnings`                         | Kod PR’lari; suppressions-aware lint guard                                                                                                                                                                                             | Ha, fork’lar ham shu jumladan |
| `Merge integrity (changelog + generated skills)` | Draft bo‘lmagan PR’lar; changelog va generatsiya qilingan skill’larni sinxronlash                                                                                                                                                      | Ha, fork’lar ham shu jumladan |

#### Forgotten sibling tests hisoboti

`npm run check:forgotten-sibling-tests` test ta’sir xaritasi ortidagi import resolver’dan qayta foydalanadi.
O‘zgartirilgan har bir production modul uchun u nomzod test pull-request diff’ida mavjud bo‘lmaganda, deterministik
`changed module/symbol -> static consumer -> candidate sibling test` zanjirlarini hisobot qiladi. Markdown xulosasi va JSON natijasi
bloklovchi joriy etishdan oldingi kalibrlash uchun `forgotten-sibling-tests` workflow artefakti sifatida saqlanadi.

Barrel qayta eksportlari va dinamik importlar faqat resolution diagnostikasi hisoblanadi; ular hech qachon
bloklovchi topilma yaratmaydi. Ko‘rib chiqilgan istisnolar
`config/quality/forgotten-sibling-allowlist.json` faylida saqlanadi. Har bir yozuvda consumer va nomzod
test ko‘rsatilishi, aniq asos keltirilishi hamda GitHub issue yoki pull request’ga havola berilishi kerak. Noto‘g‘ri formatdagi yozuvlar xavfsiz tarzda rad etiladi. Istisnolar o‘chirilgan nomzod testni yoki `.skip`/`.todo` qo‘shilgan diff’ni bostira olmaydi;
assertion’larni zaiflashtirish va boshqa yashirish holatlari mustaqil ravishda bloklovchi
`check:test-masking` gate zimmasida qoladi.

### Vazifa: `lint`

Har bir `main` ga yuborilgan PR’da ishga tushadi. Xatolik yuz bersa, merge’ni bloklaydi.

| Skript (`npm run ...`)            | Tekshiradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Bloklaydi                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versiyasi qoʻllab-quvvatlanadigan oraliqda ekanini                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                         |
| `check:cycles`                    | `src/` + `open-sse/` dagi barcha doiraviy importlarni (AST asosida, tsconfig `paths` yechilgan holda). Bare har qanday sikl mavjud boʻlganda 1 bilan chiqadi ( #15281 dan beri fail-closed) va SCC larni roʻyxatlaydi. `check:cycles:ratchet` (CI ishga tushiradigan skript) son `quality-baseline.json` dagi `metrics.cycles` chegarasidan oshganda bloklaydi — hozirda 14, `direction: down`, shuning uchun faqat kamayishi mumkin (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha (ratchet)                               |
| `check:boundary`                  | `open-sse → src` bogʻliqligi: engineʼdan ilovaga boʻlgan fayldan-faylga noyob importlar (`scripts/quality/measure-boundary.mjs`; chekka roʻyxati v4 core/module-split tuzatishlar backlogidir). Bare = maslahat beruvchi hisobot (`quality:boundary` bilan bir xil). `check:boundary:ratchet` (CI ishga tushiradigan skript, shuningdek `quality.yml` fast-gates ratchet siklida) son `quality-baseline.json` dagi `metrics.boundaryOpenSseToSrc` chegarasidan oshganda bloklaydi — oʻlchangan 771 qiymatida boshlangan, `direction: down`; `--update` faqat uni pasaytiradi; PR larda bazaga nisbatan (`--base-ref`, quyida koʻring)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha (ratchet)                               |
| `check:route-validation:t06`      | Barcha yoʻnalishlarda Zod sxemalari mavjudligini (6-darajali siyosat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` soni budjetdan oshmaydi (11-darajali turniket)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `check:provider-consistency`      | `providers.ts` ichidagi har bir provayder uchun `providerRegistry.ts` ichida mos yozuv mavjud (va aksincha, ruxsat etilganlar roʻyxati doirasida)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                         |
| `check:model-lifecycle`           | Qoʻlda yuritiladigan uchta marshrutlash jadvali repozitoriyga kiritilgan hayot sikli surati (#11503) bilan muvofiq qoladi: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` marshrutlay oladigan isteʼfoga chiqarilgan hech bir id uchun ball bermaydi; har bir `BUILT_IN_ALIASES` maqsadi `REGISTRY` ichida mavjud va isteʼfoga chiqarilgan idʼlar suratida yoʻq; `REGISTRY` ichida qolgan har bir isteʼfoga chiqarilgan id boshqa manzilga yoʻnaltirilgan yoki `allowedRetiredInCatalog` ichida koʻrsatilgan; shuningdek, `DEFAULT_DEGRADATION_MAP` manbasi yoki maqsadlaridan hech biri ushbu suratda isteʼfoga chiqarilgan sifatida koʻrsatilmagan. Bu modelga hozirda faol yuqori oqim xizmati tomonidan xizmat koʻrsatilayotganini isbotlamaydi. Oflayn — qoʻlda `npm run quality:refresh-model-lifecycle` orqali yangilanadigan `config/quality/model-lifecycle.json` bilan taqqoslaydi (tarmoq talab qilinadi; CI tizimiga ulanmagan). `allowedRetiredInCatalog` faqat qisqarib boruvchi cheklovdir: yozuvni faqat kuzatuv muammosi mavjud boʻlgandagina qoʻshing.                                                                        | Ha                                         |
| `check:fetch-targets`             | Mijoz tomonidagi `src/` ichidagi har bir `fetch("/api/...")` haqiqiy `route.ts` fayliga olib boradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ha                                         |
| `check:deps`                      | Repozitoriydagi har bir `package.json` boʻylab `npm install` orqali oʻrnatiladigan barcha bogʻliqliklar `dependency-allowlist.json` ichida mavjud; versiyasi mahkamlanmagan yoki slopsquatting usulidagi yangi paketlar belgilab qoʻyiladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                         |
| `audit:deps`                      | `npm audit` (asosiy loyiha + electron) — yuqori/kritik darajadagi tavsiyalar yoʻq (osv `check:vuln-ratchet` bilan ustma-ust tushadi; Ratsionalizatsiya beklogiga qarang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `check:lockfile`                  | `package-lock.json` yaxlitligi — https registri, yaxlitlik xeshlari, host override'lari yo‘q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:licenses`                  | Ishlab chiqarish bog‘liqliklari uchun SPDX litsenziyalarining ruxsat etilgan ro‘yxati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:tracked-artifacts`         | Build artefaktlari / commit qilingan `node_modules` symlink'lari yo‘q (husky pre-commit'da ham ishga tushadi; pre-push ataylab yengil — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha                                         |
| `check:ai-attribution`            | PR commit'lari, sarlavhasi yoki matnida AI/bot `Co-Authored-By` trailer'i yoki AI tomonidan yaratilgan footer yo‘q — #16 qat’iy qoida (`quality.yml` dagi PR→`release/**` uchun fast-gates siklida — event payload'ini o‘qiydi, PR'lardan tashqarida hech narsa qilmaydi — va PR→`main` uchun `ci.yml` lint'ida faqat PR'ga tegishli qadam; shuningdek husky `commit-msg` hook'ida; inson hammualliflariga ruxsat berilgan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Har bir Vitest exclusion tracking issue'ni ko‘rsatadi va `config/quality/vitest-exclusions.json` faylida mavjud (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `check:file-size`                 | Manba fayllari (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/` ichida) `cap` chegarasida, test fayllari (`*.test.ts(x)`) esa `testCap` chegarasida qoladi; `file-size-baseline.json` da muzlatilgan (`frozen` / `testFrozen`) fayllar qayd etilgan hajmidan kattalashmasligi kerak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                         |
| `check:error-helper`              | Executorlar/handlerlardagi xato javoblarida `buildErrorBody()` / `sanitizeErrorMessage()` ishlatiladi (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:migration-numbering`       | Migration SQL fayllari ketma-ket raqamlangan, bo‘shliqlar yoki takrorlar mavjud emas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                         |
| `check:public-creds`              | `publicCreds.ts` tashqarisida OAuth `client_id`/`client_secret` yoki Firebase Web kalitlarining literal qiymatlari mavjud emas (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha                                         |
| `check:db-rules`                  | `src/lib/db/` modullaridan tashqarida xom SQL mavjud emas; `localDb.ts` dan barrel-importlar mavjud emas (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                         |
| `check:known-symbols`             | Dispatch jadvallarida ro‘yxatdan o‘tkazilgan provider executorlari, routing strategiyalari va translatorlar diskdagi fayllarga mos keladi — yetim yoki e’lon qilinmagan belgilar mavjud emas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:route-guard-membership`    | Child process ishga tushiradigan har bir route `isLocalOnlyPath()` orqali tasniflanadi (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                         |
| `check:test-discovery`            | Repozitoriydagi har bir `*.test.ts` / `*.spec.ts` fayl kamida bitta test runner tomonidan to‘planadi (ratchet: `test-discovery-baseline.json` dagi yetim fayllar ro‘yxati faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ha                                         |
| `check:test-tla-order`            | `tests/unit` ostidagi hech bir `node:test` fayli testni ro‘yxatdan o‘tkazib, yuqori darajadagi `await` ga yetib bormaydi va keyin yana testlarni ro‘yxatdan o‘tkazmaydi (#18045; ratchet: `test-tla-order-allowlist.json` faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ha                                         |
| `check:agent-skills-sync`         | Yaratilgan agent-ko‘nikmalari artefaktlari ularning manba katalogiga mos keladi (tafovut yo‘q)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | Provayder logotiplari/aktivlari uchun qayd etilgan kelib chiqish ma’lumoti mavjud                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON konfiguratsiya fayllari tahlil qilinadi va repozitoriy lint qoidalariga javob beradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | Xatolarsiz TypeScript kompilyatsiyasi (faqat maslahat xarakteridagi ogohlantirishlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `typecheck:noimplicit:core`       | Qat’iy `noImplicitAny` — kelajakni ko‘zlaydi; avvaldan mavjud ko‘plab chaqiruv joylariga hali ham annotatsiyalar kerak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Tavsiyaviy** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` `src/app/(dashboard)/**` doirasida ishlaydi (#7033) — `typecheck:core`ning saralangan 27 ta fayldan iborat ruxsat etilgan ro‘yxatiga birorta ham dashboard TSX fayli kirmaydi, `next build` ham uni hech qachon turlar bo‘yicha tekshirmaydi (`next.config.mjs` `ignoreBuildErrors: true`ni o‘rnatadi), shu sababli u yerdagi yetim identifikator regressiyalari (#6625/#6909) CI uchun ko‘rinmas edi. Muzlatilgan, fayl/TS-kod bo‘yicha alohida hisoblar bazasi bilan farqlarni tekshiradi (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`dagi eskirgan-enforcement andozasi bilan bir xil) — faqat bazadagi hisobdan oshib ketgan YANGI xatolar gate’ni muvaffaqiyatsiz qiladi; avvaldan mavjud xato tuzatilganda `--update` bilan hisobni kamaytirib boring.                                                                                                                                                                                                                                                                                                                                               | Ha                                         |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) orqali butun ilova uchun production tur tekshiruvi; `typecheck:core`ning 27 ta fayldan iborat ruxsat etilgan ro‘yxati va dashboard gate qamrab olmaydigan yuzani tekshiradi. `config/quality/build-typecheck-baseline.json` bilan farqlarni tekshiradi; har bir (fayl, kod) bo‘yicha yangi yoki oshgan hisob muvaffaqiyatsizlikka olib keladi, kamaygan hisob esa ratchet qilishni so‘raydi. Ishga tushirish yangi yoki oshgan juftlikni o‘z ichiga olgan paytda `--update` rad etiladi, agar `--force-regressions` berilmasa; shuningdek, yangi jim qilingan fayl ham `--force-nocheck` berilmasa rad etiladi. Shu sababli baseline’ni kengaytirib natijani muvaffaqiyatli qilish va doimiy jimlik berish — ataylab bajariladigan ikkita alohida amal hisoblanadi. Oddiy `--force` rad etiladi. Shuningdek, build doirasida `@ts-nocheck`ni `config/quality/ts-nocheck-baseline.json` bilan solishtirib tekshiradi, chunki undan foydalanadigan fayl umuman diagnostika chiqarmaydi va aks holda barcha gate’lar uchun ko‘rinmas bo‘lib qoladi. | Ha                                         |

#### Ikki tur tekshirish dasturi turlicha javob beradi

`typecheck:core` va `check:build-typecheck` turli parametrlar ostida turli
dasturlarni kompilyatsiya qiladi va ayni fayl birida toza, boshqasida esa xatolarga
to‘la bo‘lishi mumkin.

`tsconfig.build.json` `"strict": false`ni belgilaydi, shuning uchun `noImplicitAny`
o‘chiq. Core konfiguratsiyasi qat’iyroq parametrlar bilan saralangan 27 ta fayldan
iborat ruxsat etilgan ro‘yxatni kompilyatsiya qiladi va har bir yozuvning import
grafigi bo‘ylab yuradi, shu sababli build dasturida hech qachon ko‘rinmaydigan fayllar
ham u yerda tekshiriladi.

Bu jihat fayl tiplarga ega yoki yo‘qligini baholashda muhim: **`check:build-typecheck`
ostida nolinchi diagnostika nolinchi degani emas**. 26 ta fayldan `@ts-nocheck`ni olib
tashlash build dasturida ularning 23 tasi toza ekanini ko‘rsatdi; ulardan o‘n oltitasi
qat’iy dasturda taxminan 120 ta implicit-any xatosini yuzaga chiqardi. Faylni toza deb
e’lon qilishdan oldin ikkalasini ham tekshiring.

### Job: `quality-gate`

`test-coverage`dan keyin ishlaydi. Muvaffaqiyatsiz bo‘lsa, merge’ni bloklaydi.

| Script                       | Validatsiya qiladi                                                                                                                                                                                                                                      | Bloklaydi                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | `quality-metrics.json` faylini chiqaradi (ESLint ogohlantirishlari soni, birlashtirilgan shard hisobotidan olingan qamrov)                                                                                                                              | Ha (`ratchet`dan yuqorida) |
| `quality:ratchet`            | `quality-baseline.json` dagi har bir metrik regressiyaga uchramagan (ESLint ogohlantirishlari ≤ baseline; qamrov ≥ baseline)                                                                                                                            | Ha                         |
| `check:duplication`          | Kod takrorlanishi (jscpd@4) `quality-baseline.json` dagi baselinedan oshmaydi                                                                                                                                                                           | Ha                         |
| `check:complexity`           | Fayl darajasidagi siklomatik murakkablik belgilangan chegaradan oshmaydi (asosiy ESLint `complexity` + `max-lines-per-function`)                                                                                                                        | Ha                         |
| `check:cognitive-complexity` | Kognitiv murakkablik `ratchet`i (`eslint-plugin-sonarjs`) — alohida ESLint tekshiruvi; CI ikkalasini yagona `check:complexity-ratchets` bosqichi sifatida birlashtirib ishga tushiradi                                                                  | Ha                         |
| `check:dead-code`            | Ishlatilmagan eksportlar / fayllar `ratchet`i (knip) baseline bilan solishtirganda regressiyaga uchramaydi                                                                                                                                              | Ha                         |
| `check:compression-budget`   | Siqish mezoni budjeti — har bir dvigatel bo‘yicha token tejalishi minimumlari regressiyaga uchramasligi kerak                                                                                                                                           | Ha                         |
| `check:type-coverage`        | Tiplangan foiz `ratchet`i (`type-coverage`) regressiyaga uchramaydi; asosan `typecheck:noimplicit:core` ni qamrab oladi                                                                                                                                 | Ha                         |
| `check:codeql-ratchet`       | Ochiq CodeQL ogohlantirishlari soni regressiyaga uchramaydi (`gh api` orqali o‘qiydi; tokensiz holatda xatolikka olib kelmasdan o‘tkazib yuboradi) — yangilash davriyligi va qo‘lda ishga tushirish uchun quyidagi "CodeQL `ratchet`i" bo‘limiga qarang | Ha                         |

### Job: `quality-extended`

Butun job maslahat sifatida ishlaydi (`continue-on-error: true`). npm asosidagi `ratchet`lar
amalda ishga tushadi; tashqi skanerlar `gh release download` orqali o‘rnatiladi va
binar fayl hali mavjud bo‘lmasa, o‘zini o‘tkazib yuboradi (exit 0).

| Script                   | Validatsiya qiladi                                                                                                                                                                                                                                              | Bloklashi                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:circular-deps`    | Aylana bog‘liqliklar mavjud emas (dpdm)                                                                                                                                                                                                                         | **Maslahat sifatida**                                |
| `check:bundle-size`      | Bundle hajmi belgilangan chegaradan oshmaydi                                                                                                                                                                                                                    | **Maslahat sifatida**                                |
| `check:secrets`          | Maxfiy ma’lumotlarni skanerlash (gitleaks) — binar fayl mavjud bo‘lmasa, o‘tkazib yuboradi                                                                                                                                                                      | **Maslahat sifatida**                                |
| `check:vuln-ratchet`     | Bog‘liqliklar zaifliklari (osv-scanner) regressiyaga uchramaydi — binar fayl mavjud bo‘lmasa, o‘tkazib yuboradi                                                                                                                                                 | **Maslahat sifatida**                                |
| `check:workflows`        | Workflow lintingi (actionlint + zizmor); skanerlar yetishmasa/ishlamasa, hisobotlar yaroqsiz bo‘lsa yoki `ratchet` baseline’i yetishmasa, INCOMPLETE sifatida xatolik yuz beradi. Yaroqli topilmalar tanlangan qat’iy/maslahat/`ratchet` siyosatiga amal qiladi | Bajarilishi shart; CI’da zizmor `ratchet`i bloklaydi |
| `check:openapi-breaking` | Bazaviy branch bilan solishtirganda ommaviy API shartnomasidagi (`openapi.yaml`) buzuvchi o‘zgarishlar (oasdiff) — `openapiBreaking=N` ni chiqaradi; oasdiff mavjud bo‘lmasa yoki bazaviy spetsifikatsiyani aniqlab bo‘lmasa, o‘tkazib yuboradi                 | **Maslahat sifatida**                                |

### Job: `docs-sync-strict`

`main` ga yuboriladigan har bir PR’da ishga tushadi. Xatolik yuz bersa, merge’ni bloklaydi.

| Script                         | Validates                                                                                                                                                                                  | Blocking                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `check:docs-all`               | Quyidagi 6 ta quyi tekshiruvni ketma-ket ishga tushiradigan meta-gate                                                                                                                      | Ha                           |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiyalarining izchilligi                                                                                                                                   | Ha                           |
| ↳ `check:docs-counts`          | Nasrdagi hisoblar (provayderlar soni, migratsiyalar soni va boshqalar) haqiqiy hisoblarning ratchet oynasi doirasida bo‘lishi                                                              | Ha                           |
| ↳ `check:env-doc-sync`         | `.env.example` dagi har bir muhit o‘zgaruvchisi hujjatlar jadvalida hujjatlashtirilgan va aksincha                                                                                         | Ha                           |
| ↳ `check:deprecated-versions`  | Hujjatlarda eskirgan versiya satrlari yo‘q                                                                                                                                                 | Ha                           |
| ↳ `check:doc-links`            | Hujjatlardagi ichki markdown havolalari haqiqiy fayllarga yo‘naltiriladi (`[text]`/`(path)` shakli)                                                                                        | Ha                           |
| ↳ `check:fabricated-docs`      | Hujjatlarda keltirilgan marshrutlar, muhit o‘zgaruvchilari, CLI buyruqlari, hook nomlari va fayl yo‘llari kod bazasida mavjud. `--strict` orqali qat’iy tekshiruv; bayroqsiz yumshoq xato. | Ha (`--strict` orqali CI’da) |
| `check:cli-i18n`               | CLI buyruq satrlari barcha i18n lokal fayllarida mavjud                                                                                                                                    | Ha                           |
| `check:openapi-coverage`       | OpenAPI spetsifikatsiyasi haqiqiy marshrutlarning kamida ratchet qilingan quyi chegarasini qamrab oladi                                                                                    | Ha                           |
| `check:openapi-security-tiers` | `openapi.yaml` dagi xavfsizlik darajasi annotatsiyalari `routeGuard.ts` tasniflariga mos keladi                                                                                            | **Tavsiyaviy**               |
| `check:openapi-routes`         | `openapi.yaml` dagi har bir yo‘l haqiqiy `route.ts` fayliga mos keladi (gallyutsinatsiyaga qarshi)                                                                                         | Ha                           |
| `check:docs-symbols`           | `docs/**/*.md` dagi har bir `/api/...` havolasi haqiqiy `route.ts` fayliga mos keladi (gallyutsinatsiyaga qarshi)                                                                          | Ha                           |
| `i18n translation drift`       | i18n lokal fayllaridagi tarjima qilinmagan kalitlar — faqat ogohlantirish                                                                                                                  | **Tavsiyaviy**               |

`docs/diagrams/` ostidagi o‘n ikkita README SVG fayli generatsiya qilinadi (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ularning barchasini qayta generatsiya qiladi). Har birida baytma-bayt taqqoslovchi unit testi
(`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` job) mavjud bo‘lib, saqlangan fayl eskirganida muvaffaqiyatsiz tugaydi, `check:docs-counts` esa `<text>` tugunlaridan kanonik raqamlarni o‘qiydi — shuning uchun konturlarni chizish bosqichi konturi chizilgan har bir satrni faylda ko‘rinmas `<text>` sifatida saqlaydi. SVG kanonik-raqamlar tekshiruvi
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) da ko‘rsatilgan fayllarni o‘qiydi: `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, shuningdek `public/images/tier-flow-dark.svg` va `tier-flow-light.svg`; `free-forever`,
`catalog-entry`, `recurring-pool` va `scoring-factors` da’volari ham `promise-pillars.svg`, `free-tier-budget.svg` va
`strategies-grid.svg` fayllarini o‘qiydi. `free-tier-budget.svg` raqamlarini faol katalog yuklagichidan oladi, shuning uchun
`FREE_MODEL_BUDGETS` yoki provayderning ko‘rsatiladigan nomi o‘zgarsa, fayl qayta generatsiya qilinmaguncha CI muvaffaqiyatsiz tugaydi.

### Job: `i18n-ui-coverage`

| Script                            | Validates                                                                                                                                                                                                                           | Blocking       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n kalitlari qamrovi ≥ 65%                                                                                                                                                                                                     | Ha             |
| `check-ui-value-drift` (inline)   | Qayta yozilgan inglizcha **qiymat** ortida eskirgan tarjima qolmasligi                                                                                                                                                              | Ha             |
| `check-new-key-coverage` (inline) | **Yangi** inglizcha kalit har bir lokalda tarjima qilingan — `__MISSING__:` belgisi rad etiladi                                                                                                                                     | Ha             |
| `check-translation-ratio`         | Har bir lokal bo‘yicha haqiqiy tarjima nisbati (inglizcha bilan bir xil / placeholder / allowlist tashqarisida qolgan yetishmayotgan qiymatlar) `config/quality/i18n-translation-baseline.json` + slack qiymatidan oshmasligi kerak | **Tavsiyaviy** |

`fetch-depth: 0` talab qilinadi — qiymat-drift tekshiruvi `en.json` faylini merge base bilan farqlaydi.

#### `check-ui-value-drift` — eskirgan tarjimalarni tekshirish gati

Boshqa gate’lar strukturaviy jihatdan ko‘ra olmaydigan yagona i18n regressiyasini aniqlaydi: inglizcha qiymat
qayta yoziladi va _oldingi_ inglizcha qiymatdan hosil qilingan tarjimalar ortda qoladi, natijada
inglizcha bo‘lmagan foydalanuvchilar ishonchli ifodalangan, ammo endi noto‘g‘ri matnni o‘qishda davom etadi.

Bu haqiqatan ham chiqarilgan. Antigravity
login yordamchisi qo‘shilganda `oauthModal.googleOAuthWarning` qayta yozilgan (#5203); **43 ta locale ichidan 39 tasi**
operatorlarga "to‘liq URL’ni nusxalab, quyidagi maydonga joylashtiring" deb aytuvchi matnni saqlab qolgan — bu
ushbu provayder uchun yakunlab bo‘lmaydigan jarayon. Bu holat #8463 gacha sezilmagan, chunki:

- `sync-ui-keys` faqat **mavjud bo‘lmagan** kalitlarni to‘ldiradi, **eskirgan** kalitlarni emas;
- `check-ui-keys-coverage` kalit _mavjudligi_ni hisoblaydi, shuning uchun eskirgan tarjima ham qamrab olingan deb baholanadi;
- `check-translation-drift` `docs/i18n/<locale>/**.md` hujjat nusxalaridagi o‘zgarishlarni kuzatadi —
  u hech qachon `src/i18n/messages/*.json` fayllarini o‘qimaydi. 2026-09 dagi qayta sinxronlashdan beri `docs-sync-strict` job’ida bloklovchi:
  asosiy hujjatni tahrirlang → `npm run i18n:run -- --files=<doc>` (bo‘lim darajasida, arzon).

**Diff-aware, baseline-backed emas.** U merge bazasidagi `en.json` faylini ishchi daraxt bilan taqqoslaydi; inglizcha qiymati o‘zgargan har bir kalit uchun
o‘zgartirilmagan tarjimani saqlab qolgan istalgan locale eskirgan hisoblanadi. Bu ataylab **avvaldan mavjud qarzdorlikni muzlatadi** — diff uzoq vaqt davomida mavjud bo‘lgan tarjima qaysi eski inglizcha matndan kelib chiqqanini aniqlay olmaydi, shuning uchun gate faqat joriy o‘zgarish tegayotgan narsalarni baholaydi. Muqobil variant (har bir kalit uchun hash baseline) taxminan 600 KB hajmdagi generatsiya qilingan faylni talab qilardi — mavjud eng katta baseline’dan 3 baravar katta — va har bir i18n PR’da qayta-qayta o‘zgarardi.

Buni qanoatlantirishning ikki yo‘li bor:

1. ta’sirlangan tarjimalarni yangilang, yoki
2. ularni `__MISSING__:<new english>` qiymatiga o‘rnating — runtime keyin tuzatilgan inglizcha matnni taqdim etadi
   (`src/i18n/request.ts::deepMergeFallback`, #7258) va kalit tarjima uchun navbatga qo‘yiladi.

Agar satrning **ma’nosi** o‘zgargan bo‘lsa, **kalit nomini o‘zgartirishni** afzal ko‘ring: yangi kalit eskirgan
tarjimani meros qilib ololmaydi. #8463 da aynan shu yondashuv ishlatilgan.

```bash
npm run i18n:check-value-drift          # qat’iy (CI ishga tushiradigan)
npm run i18n:check-value-drift:warn     # faqat hisobot
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Agar base katalogini o‘qib bo‘lmasa (base ref mavjud bo‘lmagan shallow clone), `check-openapi-breaking` dagi kabi
`SKIP reason=base-unresolved` bilan 0 kodini qaytaradi.

### Job: `i18n`

To‘liq i18n validatsiya matritsasi (har bir locale uchun bittadan job). Butun job tavsiyaviy hisoblanadi.

| Script                          | Validates                                  | Blocking                                                   |
| ------------------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| `validate_translation.py quick` | Har bir locale bo‘yicha tarjima to‘liqligi | **Tavsiyaviy** (butun job uchun `continue-on-error: true`) |

### Job: `pr-test-policy`

Faqat pull request’larda ishga tushadi.

| Script                 | Validates                                                                                                                                                     | Blocking |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` yoki `bin/` ichidagi production kodini o‘zgartirgan PR’lar testlarni qo‘shishi yoki yangilashi kerak (8-qattiq qoida)        | Ha       |
| `check:test-masking`   | O‘zgartirilgan test fayllari assert’larning sof sonini kamaytirmaydi yoki `assert.ok(true)` tautologiyalarini qo‘shmaydi                                      | Ha       |
| `check:pr-evidence`    | PR matni o‘zgarish uchun test/VPS dalillariga havola beradi (PR matnini grep qilish orqali 18-qattiq qoidani mexanizatsiya qiladi — mo‘rt, Backlog’ga qarang) | Ha       |

### Job: `test-vitest`

`build` dan keyin ishga tushadi. Xatolik yuz bersa, merge’ni bloklaydi.

| Suite            | Validates                                                   | Blocking                                                                                                                     |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 ta tool), autoCombo, cache — vitest runner | Ha                                                                                                                           |
| `test:vitest:ui` | UI komponent testlari — vitest runner                       | **Bloklovchi** — avvaldan mavjud xatoliklar `vitest.config.ts` da aniq chiqarib tashlangan; yangi xatoliklar job’ni yiqitadi |

### Nightly workflows (rejalashtirilgan, tavsiyaviy)

Ular cron jadvali bo‘yicha (va `workflow_dispatch` orqali) ishga tushadi, hech qachon PR’larda ishlamaydi. Barchasi tavsiyaviy.

| Ish jarayoni           | Tasdiqlaydi                                                                                                                                                                           | Bloklash       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | tasodifiy seed + yuqori ishga tushirishlar soni bilan fast-check xususiyat testlari                                                                                                   | **Tavsiyaviy** |
| `nightly-resilience`   | heap o‘sishi nazorati, chaos xatolarni kiritish, k6 yuklama/uzluksiz ishlash testlari                                                                                                 | **Tavsiyaviy** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak tekshiruvlari (provider secret bo‘lmasa o‘tkazib yuboriladi)                                                                           | **Tavsiyaviy** |
| `nightly-schemathesis` | jonli OmniRoute’ga qarshi `docs/openapi.yaml` yordamida OpenAPI kontraktini fuzzing orqali sinash — spetsifikatsiya buzilishlari / qayta ishlanmagan 500-larni aniqlaydi (Faza 8 B.4) | **Tavsiyaviy** |
| `nightly-mutation`     | fast unit lane bo‘yicha Stryker mutation-testing ko‘rsatkichi — saqlanib qolgan mutantlar zaif assertlarni aniqlaydi                                                                  | **Tavsiyaviy** |
| `nightly-compat`       | qo‘llab-quvvatlanadigan `engines.node` diapazonlari bo‘yicha Node engine moslik matritsasi                                                                                            | **Tavsiyaviy** |

Ishlash samaradorligi bazaviy ko‘rsatkichlari (heap, TTFB, build vaqti) qayd etiladi, lekin nazorat qilinmaydi: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) ga qarang (`npm run perf:lts-baseline`).

---

## Tezlik bosqichi (2026-08-30 → v4.0 LTS): barcha bazaviy chegaralar 20% ga yumshatildi

Masʼulning qarori (2026-08-30): v4.0 modullashtirilishigacha texnik qarzni cheklashdan ko‘ra
yetkazib berish tezligi muhimroq. Barcha **raqamli** ratchet bazaviy chegaralari audit qilish
mumkin bo‘lgan yagona o‘tishda 20% ga yumshatildi va bosqich `config/quality/quality-baseline.json`
faylida eʼlon qilindi:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Nima o‘zgardi                                                                                                                                                                                                                                            | Qayerda                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — kamroq bo‘lsa yaxshiroq bo‘lgan sonlar ×1.2, ko‘proq bo‘lsa yaxshiroq bo‘lgan foizlar ÷1.2 (qamrovning quyi chegarasi 60 bo‘lib qoldi, `eslintErrors` 0 bo‘lib qoladi, `eslintWarnings` 0 → muzlatilgan bostirishlar sonining 20% i) | `quality-baseline.json` (`_relax_velocity_2026_08_30` izohida har bir oldingi → keyingi qiymat keltirilgan) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                         | `complexity-baseline.json`, `duplication-baseline.json`                                                     |
| `cap`, `testCap`, har bir `frozen[*]` / `testFrozen[*]` qator chegarasi ×1.2                                                                                                                                                                             | `file-size-baseline.json`                                                                                   |
| har bir fayl / har bir TS kodi bo‘yicha sonlar ×1.2                                                                                                                                                                                                      | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`      |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                      | `scripts/check/check-openapi-coverage.mjs`                                                                  |
| `_policy.requireTighten === false` bo‘lganda `--require-tighten` tavsiyaviy bo‘ladi                                                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                                 |
| tungi `bank-ratchet-shrinks` to‘xtatib turiladi (u o‘lchangan qisqarishni zaxiralab, bo‘sh chegarani bekor qilgan bo‘lardi)                                                                                                                              | `.github/workflows/nightly-release-green.yml`                                                               |

Ruxsat ro‘yxatlari (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **budjetlar emas** va ularga tegilmadi. O‘tish/o‘tmaslik siyosati nazoratlari (sirlar, SQL qoidalari,
hujjatlar/muhit shartnomasi, i18n mosligi, birlik testlari) o‘zgarmadi — muvaffaqiyatsiz test hamon muvaffaqiyatsiz testdir.

**Vositalar**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — bir
  martalik yumshatish (`scripts/quality/relax-baselines.mjs`); ayni izoh bilan ikkinchi marta
  ishga tushirishni rad etadi.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  har bir raqamli nazoratni CI dagi kabi o‘lchaydi va har bir nazorat uchun qolgan bo‘sh chegarani
  chiqaradi (`scripts/quality/baseline-headroom.mjs`). Tungi `baseline-headroom` vazifasi
  jadvalni ish jarayoni bajarilishining xulosasida eʼlon qiladi va uning JSON/Markdown hisobotini
  90 kun saqlanadigan `baseline-headroom-<run_id>` artefakti sifatida yuklaydi. Ogohlantirish va
  jiddiy holat qatorlari o‘z yuqori chegarasining 10% i ichida bo‘lgan yoki undan oshib ketgan
  nazoratlarni ko‘rsatadi. Budjetlar sarflanayotgani haqida erta ogohlantirish olish uchun ushbu
  hisobotlarni ko‘rib chiqing; muammo keltirib chiqargan nazoratning `_rebaseline_*` izohlarini
  tekshiring. Vazifa endi doimiy muammo yozuvini yaratmaydi yoki yangilamaydi; #12149 avvalgi
  hisobotlar tarixini saqlaydi.

**Yangi kod rejimi (Clean-as-You-Code) — 2026-08-30 dan beri, faqat PR tezkor yo‘li uchun**

`pull_request` hodisalarida `quality.yml` fayli `check:file-size`,
`check:complexity-ratchets` va `check:dead-code` ga `--base-ref <PR base SHA>` uzatadi.
`check:complexity-ratchets` va `check:dead-code` uchun nazorat HEAD ni birlashish bazasi bilan
**faqat PR o‘zgartirgan fayllar doirasida** taqqoslaydi (`scripts/check/newCodeMode.mjs`:
birlashish bazasi vaqtinchalik `git worktree` ichida yaratiladi, ESLint/knip o‘sha yerda va
HEAD da ishga tushiriladi hamda har bir fayl bo‘yicha sonlarning farqi hisoblanadi):

- **bloklovchi** — PR o‘zi o‘zgartirgan fayllarda siklomatik/kognitiv murakkablik buzilishlarini
  yoki foydalanilmayotgan eksportlarni qo‘shgan (`complexityNewCode=`, `cognitiveComplexityNewCode=`,
  `deadExportsNewCode=` jurnalda);
- **tavsiyaviy** — global jami qiymatning muzlatilgan bazaviy chegara bilan taqqoslanishi.
  Meros qolgan og‘ish aloqasi bo‘lmagan PR ni hech qachon muvaffaqiyatsiz qilmaydi; og‘ish
  relizni muvofiqlashtirish paytida qayta muzlatiladi va bo‘sh chegara vazifasi tomonidan kuzatiladi.

`check:file-size` bazaviy havoladan o‘z qoidalari asosida foydalanadi
(`scripts/check/check-file-size.mjs`, #8522): u daraxtdagi har bir manba va test faylini
tekshiradi, har birining PR bazasidagi qatorlar sonini `git show` yordamida o‘qiydi va fayl
faqat uning hajmi bazaviy yuqori chegarasi (`frozen` / `testFrozen` yoki bazaviy ro‘yxatda
bo‘lmagan fayl uchun `cap` / `testCap`) hamda bazaviy hajmidan kattaroq bo‘lgan qiymatdan
oshib ketgandagina muvaffaqiyatsiz deb topiladi. Shu sababli bazada allaqachon og‘ib ketgan
fayl aloqasi bo‘lmagan PR ni hech qachon muvaffaqiyatsiz qilmaydi.

`check:boundary:ratchet` xuddi shu qoidani o‘zining yagona soniga qo‘llaydi
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR hodisalarida ham
`quality.yml` tezkor tekshiruvlari, ham `ci.yml` lint vazifasi PR asosining SHA qiymatini uzatadi, asosiy commit
`git archive` eksportidan o‘lchanadi va PR faqat uning `open-sse → src` qirralari
soni `metrics.boundaryOpenSseToSrc` qiymati bilan asosdagi sonning kattarog‘idan oshgandagina muvaffaqiyatsiz tugaydi. Asosdagi limitdan
yuqori siljish (`base drift herdado`) haqida xabar beriladi, ammo bu hech qachon aybsiz PRni qizil holatga tushirmaydi; push → main
mutlaq limitni saqlab qoladi, aniqlab bo‘lmaydigan asos SHA qiymati esa ogohlantirish bilan shu limitga qaytadi.

`workflow_dispatch` ishga tushirishlari, release-green to‘liq tekshiruvi va tungi zaxira vazifasida PR asosi
mavjud emas va ular mutlaq (global) taqqoslashni saqlab qoladi. Qamrov, takrorlanish va tur qamrovi hozircha
global bo‘lib qoladi (ularning vositalari har bir fayl bo‘yicha farqni arzon hisoblamaydi) — ularga ham xuddi shunday yondashuvni qo‘llash mumkin.

**Bosqichni v4.0 da yakunlash (LTS = avvalgidan qat’iyroq, “normal holatga qaytish” emas)**

1. Sof `release/v4.0.0` uchida: qayd uchun `npm run quality:headroom --json`, so‘ng
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, har bir typecheck tekshiruvining
   `--update` buyrug‘ini ishga tushiring — barcha boshlang‘ich ko‘rsatkichlar o‘lchangan qiymatgacha pasayadi.
2. `quality-baseline.json` faylidan `_policy` ni o‘chiring (`--require-tighten` va tungi
   zaxiralashni qayta faollashtiradi), `check-openapi-coverage.mjs` ichidagi `THRESHOLD = 36` qiymatini (yoki undan yuqorisini) tiklang.
3. Modullashtirish samara bergan joylarda o‘lchangan qiymatdan ham qat’iyroq chegaralarni belgilang: fayl o‘lchami uchun `cap` ni yana 1000
   (yoki 800) ga tushiring, qamrovning quyi chegaralarini +5 ga oshiring, modullashtirilgan paketlar uchun foydalanilmaydigan eksportlarni 0 ga tushiring.

## Ratchet bazaviy darajasi (`quality-baseline.json`)

Ratchet mexanizmi (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` faylini o‘qiydi
va uni yangi yig‘ilgan `quality-metrics.json` bilan taqqoslaydi. Epsilon qiymatidan ortiq
yomonlashgan har qanday metrika build jarayonining muvaffaqiyatsiz tugashiga sabab bo‘ladi.

Hozirda kuzatiladigan metrikalar:

| Metrika               | Yo‘nalish | Ma’nosi                                        |
| --------------------- | --------- | ---------------------------------------------- |
| `eslintWarnings`      | `down`    | ESLint ogohlantirishlari soni oshmasligi kerak |
| `coverage.statements` | `up`      | Ifodalar qamrovi pasaymasligi kerak            |
| `coverage.lines`      | `up`      | Satrlar qamrovi pasaymasligi kerak             |
| `coverage.functions`  | `up`      | Funksiyalar qamrovi pasaymasligi kerak         |
| `coverage.branches`   | `up`      | Tarmoqlar qamrovi pasaymasligi kerak           |

Haqiqiy yaxshilanishdan so‘ng bazaviy darajani yangilash uchun:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` bayrog‘i joriy o‘lchangan qiymatlarni `quality-baseline.json` fayliga yozadi.
Bu faylni metrikani yaxshilagan o‘zgarish bilan birga commit qiling. Metrikani yaxshilab,
bazaviy darajani yangilamagan PR `--require-tighten` orqali aniqlanadi (6A.5-bosqich,
amalga oshirilishi kutilmoqda).

### CodeQL ratcheti: yangilash davriyligi va qo‘lda ishga tushirish

`check:codeql-ratchet` **har bir PR uchun emas, jadval asosida yangilanadigan repo holatini** o‘qiydi.
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` buyrug‘i
`state: configured`, `schedule: weekly` deb xabar beradi: bu har bir push uchun
tahlil emas, GitHub’ning default-setup skanidir. Natijada: ogohlantirishlarni TUZATADIGAN PR
merge qilingandan so‘ng ratchet keyingi rejalashtirilgan skan ishga tushguniga qadar eski,
yuqoriroq sonni o‘qishda davom etadi — shu sababli skan yangilanmaguncha har bir ochiq PR’da,
jumladan tuzatuvchi PR’ning keyingi o‘zgarishlarida ham regressiya haqida xabar beradi.

**Qo‘lda yangilash**: `gh workflow run codeql.yml --ref release/vX.Y.Z` tahlilni qayta
ishga tushiradi va ogohlantirishlarni bir necha daqiqa ichida qayta e’lon qiladi. Avval
`.github/workflows/codeql.yml` faylini o‘qing — uning sarlavhasida bu faqat
`workflow_dispatch` orqali ishlashi **GitHub’ning "default setup" konfiguratsiyasi bilan
ziddiyatga kirishishi sababli** ekani tushuntirilgan (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` triggerlarini qayta tiklash uchun avval **egasi amal bajarishi kerak**:
Settings → Code security → CodeQL: Default → Advanced. Bu o‘zgartirishsiz `schedule:`
triggerini qo‘shmang — u faqat muvaffaqiyatsiz ishga tushirishlarni keltirib chiqaradi.

**Son kamaygandan keyin bazaviy darajani qat’iylashtiring** — `node scripts/check/check-codeql-ratchet.mjs
--update` yangi o‘lchangan sonni `quality-baseline.json` →
`metrics.codeqlAlerts.value` ichiga yozadi, shuning uchun ratchet eski yuqori chegaragacha
bo‘lgan regressiyaga yashirincha ruxsat bermaydi. Amaliy misol (2026-09-02/03): PR #12502
7 ta haqiqiy ogohlantirishni tuzatdi (o‘lchangan ochiq ogohlantirishlar 13 → 6); PR #12530
mos kelishi uchun muzlatilgan bazaviy darajani 11 → 6 ga qat’iylashtirdi; qolgan 6 tasi
keyin har bir ogohlantirish uchun asos keltirilgan holda yopildi va ochiq ogohlantirishlar
soni 0 ga tushirildi.

**Ogohlantirishlarni yopish operatorning qaroridir (Qat’iy qoida #14)** — yopish izohida
texnik asosni qayd etmasdan hech qachon CodeQL ogohlantirishini yopmang: yuqori oqim
protokoli talabi uchun `won't fix`, test fiksturasi uchun `used in tests`, CodeQL aniqlay
olmaydigan sanitizer uchun `false positive` (namuna: `docs/security/ERROR_SANITIZATION.md`).

---

## Testlarni qayta urinish siyosati (WS5.4, v3.8.49)

Qayta urinish har bir runner uchun alohida belgilanadi, hech qachon global tarzda qoʻllanmaydi — umumiy qayta urinish haqiqiy regressiyalarni
koʻrinmas beqarorliklarga aylantiradi:

| Runner           | Siyosat                                                                                                                                        | Sabab                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | Faqat CI muhitida `retries: 1`, `trace: on-first-retry` bilan                                                                                  | Brauzer/tarmoq vaqtlari haqiqatan ham deterministik emas; trace bilan bitta qayta urinish beqarorlikni tashxislash mumkin boʻlgan artefaktga aylantiradi |
| Vitest           | Global qayta urinish YOʻQ. Beqarorligi isbotlangan test har bir test uchun alohida qayta urinish oladi (diffʼda koʻrinadi, PRʼda tekshiriladi) | Karantin roʻyxatini repozitoriyda saqlaydi, u hech qachon noaniq boʻlmaydi                                                                               |
| node:test (unit) | Hech qachon qayta urinish YOʻQ                                                                                                                 | Beqaror unit-test — testdagi xato; uni tuzating, qayta ishga tushirish bilan omadni sinamang                                                             |

Beqarorlik telemetriyasi ishga tushgandan keyingi maqsadli SLOʼlar (WS5.2/5.3): har bir test uchun <1% beqarorlik darajasi
(“hozir tuzatish” chegarasi), har bir pipeline uchun ≥95% muvaffaqiyat darajasi. Sohadagi etalon qiymatlar —
oʻz oʻlchovlarimiz asosida qayta kalibrlanadi.

## Reliz darajasidagi ratchet ogʻishi (WS5.5, v3.8.49)

Ratchet (fayl hajmi, murakkablik, eslint ogohlantirishlari) SOF reliz
uchida regressiyaga uchraganda — yaʼni mergeʼlar KOMBINATSIYASI uni yomonlashtirgan boʻlsa va hech bir alohida PR
oʻz branchʼida regressiyani takrorlamasa — tuzatish **reliz kapitani zimmasida boʻlib, bir marta, reliz
branchʼida** bajariladi: ajratib olish/refaktoringni afzal koʻring; faqat hujjatlashtirilgan
asos yozuvi bilan qayta bazalang. Kombinatsion ogʻishni hech qachon hissa qoʻshuvchi PRʼiga yuklamang va hech qachon
har bir PR uchun qayta bazalamang (bu haqiqiy regressiyalarni yashiradi). Avval farqlang: PRʼingiz bunga sabab boʻldi deb taxmin qilishdan oldin,
probe worktreeʼda sof uchdagi qizil holatni takrorlang.

## Ratchet qisqarishlarini saqlab qoʻyish — pasayish yoʻnalishi (#8584)

Ratchet faqat yarmigacha avtomatik va avtomatik boʻlgan yarmi notoʻgʻri. Chegarani **oshirish** —
oʻn soniya oladigan qoʻlda bajariluvchi JSON tahriri va qizil PRʼni blokdan chiqarishning eng tezkor usuli.
Uni **pasaytirish** uchun kimdir `--update` buyrugʻini ishga tushirib, natijani commit qilishi kerak — va
`bank-ratchet-shrinks` jobʼi joriy etilguniga qadar hech bir workflow buni bajarmagan. Oʻlchangan natija
(2026-07-25): 18 ta muzlatilgan fayl allaqachon yangi fayllar uchun 800 qatorlik chegarada yoki undan pastda, eng yomon holat
132× (`src/shared/validation/schemas.ts`, 19 qator uchun 2,523 chegara); murakkablik chegarasi
taxminan 37 ta qayta bazalash qaydi davomida `1794 → 2169` ga koʻtarilgan, atigi bitta pasayish (−1) boʻlgan;
va “keyingi siklda `--update` orqali qatʼiylashtirish” 31 marta yozilib, bir marta bajarilgan. Uni yuzaga keltirgan koddan
uzoqroq yashaydigan chegara har bir yakunlangan dekompozitsiyani faylni keyingi tahrirlaydigan shaxs uchun yashirincha
oʻsish ruxsatiga aylantiradi.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** jobʼi bu siklni yopadi:

|            |                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| Ishlaydi   | `schedule` (kuniga 3×) + `workflow_dispatch` — ataylab `push` emas                                                      |
| Oʻlchaydi  | eng yuqori `release/vX.Y.Z`, `release-green` bilan bir xil aniqlash + injection himoyasi                                |
| Yozadi     | `check:file-size --update` va `check:complexity-ratchets --update` (ikkalasi ham tuzilishi boʻyicha faqat qisqartiradi) |
| Tekshiradi | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                |
| Yetkazadi  | reliz branchʼiga qarshi doim joriy boʻlgan bitta PR — majburan yangilanadi, hech qachon spam qilinmaydi                 |

Saqlash har bir push uchun emas, paketlab bajariladi, chunki uning kechikish talabi yoʻq (8 soat ichida saqlangan qisqarish
yetarli), har bir merge uchun ishga tushirish esa merge kampaniyalari davomida PR branchʼini qayta-qayta yigʻadi
va har safar toʻliq ESLint tekshiruvi uchun resurs sarflaydi. Aniqlash pushʼda qoladi
(`release-green`); faqat saqlash paketlab bajariladi.

### Xavfsizlik verifikatori

Job bazaviy qiymatlarga nazoratsiz yozadi, shuning uchun `verify-ratchet-bank.mjs` buni
maqbul qiladi. U `--update`dan keyingi daraxtni `HEAD` bilan diff qiladi va har bir oʻzgarish quyidagilardan biri boʻlmasa,
**hech qanday commit yaratilishidan oldin jobʼni toʻxtatadi** — hech qanday PR ochilmaydi:

- `frozen` / `testFrozen` raqamli yozuvi **pasaytirilgan** yoki **olib tashlangan**
- `complexity-baseline.json` → `count` **pasaytirilgan**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **pasaytirilgan**

Boshqa har qanday oʻzgarish xatoga olib keladi: raqamni oshirish, yozuv qoʻshish, `cap`/`testCap`ni oʻzgartirish yoki
`_rebaseline_*` qaydini oʻchirish/qayta yozish (bu qaydlar har bir chegara nega mavjudligi haqidagi audit izi boʻlib,
fayl yozuvlari bilan bir xil `frozen` obyekti ichida saqlanadi).
Chegarani oshira oladigan bot joriy holatdan mutlaqo yomonroq boʻlardi. Regressiya himoyasi:
`tests/unit/verify-ratchet-bank.test.ts`.

Job hech qachon `release/*`ga push qilmaydi — PRʼni inson merge qiladi, shuning uchun notoʻgʻri oʻlchov
tekshirilmasdan qabul qilinmaydi.

## Ruxsat etilganlar roʻyxati siyosati

Oldindan mavjud buzilishlar sababli muvaffaqiyatsiz tugashi mumkin boʻlmagan har bir tekshiruv muzlatilgan ruxsat etilganlar roʻyxatidan foydalanadi
(masalan, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Siyosat quyidagicha:

**Asosiy sababni tuzating; ruxsat etilganlar roʻyxatidan faqat buzilish oldindan mavjud boʻlsa va
uni ayni PR doirasida tuzatib boʻlmasa foydalaning.**

Ruxsat etilganlar roʻyxatiga yozuv qoʻshayotganda:

1. Asoslantirish berilgan izohni kiriting.
2. Kuzatuv muammosiga havola bering (masalan, `// #3498 — 2-bosqich funksiyasi, hali amalga oshirilmagan`).
3. Buzilishni tuzatadigan ayni PR doirasida yozuvni olib tashlang — faol buzilishni endi
   istisno qilmaydigan eskirgan yozuvning oʻzi nuqson hisoblanadi (amalga oshirilgach, 6A.3 eskirgan-qoidalarni-nazorat-qilish
   yetim qolgan ruxsat etilganlar roʻyxati yozuvi sababli tekshiruvni muvaffaqiyatsiz yakunlaydi).

Testlarni tezroq oʻtkazish uchun ruxsat etilganlar roʻyxatiga yozuvlar **qoʻshmang**. Kengayib borayotgan
ruxsat etilganlar roʻyxati bilan yashil tekshiruv sifat haqida soxta tasavvur beradi.

### PRʼingizda tekshiruv muvaffaqiyatsiz tugaganda

1. **Tekshiruv chiqishini diqqat bilan oʻqing** — unda qoidani aynan qaysi fayl yoki belgi buzganligi
   koʻrsatiladi.
2. **Buzilishni tuzating** — aksariyat tekshiruvlar deterministik fayl tizimi tekshiruvlari boʻlib, kod
   toʻgʻrilanishi bilan muvaffaqiyatli oʻtadi.
3. **Agar buzilish oldindan mavjud boʻlsa** (yaʼni uni siz kiritmagansiz, ammo tekshiruv endi uni
   qamrab olayotgan boʻlsa): asoslantiruvchi izoh va kuzatuv muammosi bilan ruxsat etilganlar roʻyxatiga yozuv qoʻshing.
4. **Agar tekshiruv ratchet turida boʻlsa** (qamrov, ESLint ogohlantirishlari, takrorlanish, murakkablik):
   oʻzgartirishingiz koʻrsatkichni yomonlashtirgan. Asosiy muammoni tuzating yoki (kamdan-kam hollarda), agar oʻzgartirish
   ataylab qilingan va koʻrsatkichning yomonlashuvi maqbul boʻlsa, `npm run quality:ratchet -- --update` buyrugʻini
   bajaring — ammo sababini PR tavsifida hujjatlashtiring.
5. **Tavsiyaviy tekshiruvlar** (`continue-on-error: true`) axborot uchun xizmat qiladi — ular birlashtirishni
   bloklamaydi, ammo CI xulosasida koʻrinadi. Shunga qaramay, ularni tuzating.

---

## Yangi tekshiruv qoʻshish

1. `scripts/check/check-<name>.mjs` (yoki `.ts`) faylini yarating. Siyosat tekshiruvlari 0/1 kodi bilan yakunlanadi.
   Ratchet uslubidagi tekshiruvlar `collect-metrics.mjs` orqali `quality-metrics.json` fayliga koʻrsatkich yozadi.
2. `package.json` fayliga `"check:<name>": "node scripts/check/check-<name>.mjs"` ni qoʻshing.
3. Uni `.github/workflows/ci.yml` faylida tegishli vazifaga ulang
   (siyosat → `lint` yoki `docs-sync-strict`; ratchet → `quality-gate`).
4. Agar unda ruxsat etilganlar roʻyxati boʻlsa, eskirgan yozuvlar avtomatik aniqlanishi uchun
   `scripts/check/lib/allowlist.mjs` faylidagi `reportStaleEntries()` ni qoʻllang.
5. `tests/unit/build/` ichida tekshiruvning aniqlash mantiqini qamrab oluvchi test yozing.
6. Ushbu hujjatni yangilang (tegishli vazifa jadvaliga qator qoʻshing).

---

## Agent vositalari: sikl ichidagi LSP (ixtiyoriy)

CI tekshiruvlaridan tashqari, OmniRoute **ixtiyoriy** `agent-lsp` asosini ham taqdim etadi
(loyiha darajasidagi `.mcp.json`, 7-bosqich, 15-vazifa). Kod yozuvchi agentlarga TypeScript til serverini taqdim etish uchun `.mcp.json`
yarating, shunda ular kod yozishdan **oldin** belgilarni aniqlaydi /
diagnostikani bajaradi — bu `typecheck:core` uchun daʼvo qilishdan oldin kompilyatsiya qiluvchi hamroh boʻlib,
“oʻylab topilgan belgi” xatolarini manbaning oʻzida kamaytiradi. U ataylab avtomatik yuklanmaydi
(MCP↔LSP koʻprigini siz tanlaysiz va tekshirasiz); buzilgan yozuv faqat ulanish xatosini qayd etadi va
hech qachon seanslarni buzmaydi.

---

## Ratsionalizatsiya uchun vazifalar roʻyxati (ROI koʻrib chiqishi — 9-bosqich, 3-toʻlqin)

Ushbu inventar 2026-06-17 sanasida `ci.yml` bilan solishtirib muvofiqlashtirildi (avvalgi versiyada
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` tushirib qoldirilgan edi). Muvofiqlashtirilgan toʻplamning ROI tahlili
quyidagi ratsionalizatsiya nomzodlarini aniqladi. **Birlashtirishlar mexanik CI
oʻzgarishlaridir; holatni almashtirish/oʻchirish esa operator ixtiyoridagi siyosiy qarorlardir.** Quyidagilarning hech biri
hali qoʻllanmagan.

**Yuqorida hujjatlashtirilmagan boshqa elementlar ham bor** (tavsiyaviy, signal darajasi past): `docs-lint` vazifasi
(markdownlint + Vale, butun vazifa uchun `continue-on-error`) va alohida skaner ish jarayonlari
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json` ichida mavjud, ammo `ci.yml` ichidagi bloklovchi ratchet’ga ulanmagan — metrika
hozirda yetim qolgan.

### Birlashtirish / takrorlarni yoʻqotish (mexanik, xavfi pastroq)

Har bir nomzod 2026-06-17 sanasidagi amaldagi gate holatiga nisbatan tekshirildi (ishoning, ammo tekshiring);
bir nechta «ravshan» birlashtirishlar aslida yashirin texnik qarzni berkitishi aniqlandi va ular **toʻgʻridan-toʻgʻri qoʻllashga** yaroqli emas.

- **`check:docs-sync` ikki marta ishga tushadi** — `lint` vazifasida alohida va yana `check:docs-all` (`docs-sync-strict`) ichida hamda husky pre-commit hook’ida. ✅ **BAJARILDI** — alohida `lint` chaqiruvi olib tashlandi.
- **CVE skanerlash** — ❌ **Toza birlashtirish EMAS.** `audit:deps` har qanday high/critical CVE’da qatʼiy xato bilan toʻxtaydi; `check:vuln-ratchet` (osv) esa faqat boshlangʻich koʻrsatkichga nisbatan _regressiya_ boʻlganda xato beradi (hozirda 1 MODERATE). Semantikasi turlicha — `audit:deps` olib tashlansa, mutlaq high/critical gate yoʻqoladi. Ikkalasini ham saqlang.
- **Sikllarni aniqlash** — ✅ **BAJARILDI** (#15159 G-01/G-02). Bu yerdagi eski matnda `check:cycles` «yashil, saralangan» gate deb atalgan va `check:circular-deps` (dpdm) 91 ta sikl haqida xabar bergani sababli uni bloklovchi sifatida saqlash asoslangan edi. Bu yashil holat **soxta yashil** edi: `check:cycles` 5 ta quyi katalogni (450 ta fayl) skanerlagan, faqat statik `import|export … from` bilan moslikni topgan va barcha `@/` hamda `@omniroute/open-sse/` spetsifikatorlarini tashlab yuborgan, shu sababli repozitoriyda ustun boʻlgan dinamik import + alias sikllarini koʻra olmagan. Tuzatildi: gate endi `src` + `open-sse` boʻylab yuradi (5023 ta fayl), spetsifikatorlarni TypeScript AST’dan yigʻadi (shuning uchun `import("…")` hisobga olinadi, tur pozitsiyasidagi `typeof import("…")` esa olinmaydi) va tsconfig `paths` qiymatlarini aniqlaydi. U 0 emas, **14** ta sikl topadi. Avvaldan mavjud 14 ta siklni gate PR ichida tuzatib boʻlmagani sababli `check:cycles` endi **ratchet** (`--ratchet`, `quality-baseline.json` ichida yuqori chegara `metrics.cycles.value = 14`, `direction: down`) — u har qanday _regressiya_ ni bloklaydi va son faqat kamayishi mumkin. CI `npm run check:cycles:ratchet` buyrugʻini ishga tushiradi. Bosqichma-bosqich kamaytirish **A-01** bilan birga olib boriladi. `check:circular-deps` (dpdm) kengroq ikkinchi xulosa sifatida tavsiyaviy holatda qoladi.
- **Murakkablik** — ✅ **BAJARILDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): bitta ESLint oʻtishi, hisoblash ruleId boʻyicha amalga oshiriladi, shuning uchun cyclomatic+max-lines va cognitive boshlangʻich koʻrsatkichlari mustaqil qoladi; alohida `check:complexity` / `check:cognitive-complexity` lokal `--update` uchun saqlanadi.
- **`/api` anti-gallyutsinatsiyasi** — ✅ **BAJARILDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` uchun yagona FS inventari, openapi-routes + docs-symbols hamon mustaqil hisobot beradi; alohida tekshiruvlar lokal ishga tushirishlar uchun saqlanadi.
- **`check:node-runtime` 11 ta vazifada ishga tushadi** — ⚠️ **ROI past.** Har biri alohida runner va tekshiruv <1s davom etadi; umumiy tejash ~10s, buning evaziga har bir vazifa uchun arzon himoya yoʻqoladi. Bunday oʻzgartirishlar bilan bogʻliq ortiqcha tashvishga arzimaydi.
- **CI lint’dagi `typecheck:noimplicit:core`** — ✅ **lint vazifasidan olib tashlandi** (tavsiyaviy `continue-on-error` edi); bloklovchi tur yuzasi `typecheck:core` + `check:type-coverage` hisoblanadi. Lokal script saqlab qolindi.

### Holatni almashtirish / qaror qabul qilish (operator siyosati)

- `check:openapi-security-tiers` (tavsiyaviy) — ❌ **Toza tarzda almashtirib boʻlmaydi.** U 0 kodi bilan yakunlanadi, ammo `LOCAL_ONLY_API_PREFIXES` ostidagi bir nechta `traffic-inspector` marshrutlarida `x-loopback-only: true` annotatsiyasi yoʻqligi haqida ogohlantiradi. Uni majburiy qilish uchun avval ushbu annotatsiyalarni `openapi.yaml` fayliga qoʻshish kerak.
- `typecheck:noimplicit:core` (tavsiyaviy) — asosan bloklovchi `check:type-coverage` ratchet’i bilan qamrab olingan. Uni ratchet’ga aylantiring yoki takroriy ikkinchi `tsc` oʻtishini olib tashlang.
- `test:vitest:ui` (hozir **bloklovchi**) — avvaldan mavjud nosozliklar `vitest.config.ts` ichida `// #8618` kuzatuv izohlari bilan ochiq tarzda istisno qilingan; yangi nosozliklar vazifani muvaffaqiyatsiz yakunlaydi.
- `check:secrets` (gitleaks, hujjatlashtirilgan 3 ta yolgʻon ijobiy natijada muzlatilgan bloklovchi ratchet) — 0 ga yetkazish uchun ushbu 3 tasini ruxsat etilganlar roʻyxatiga kiriting yoki tavsiyaviy darajaga tushiring. GitHub’ning ichki secret-scanning funksiyasi + `check:public-creds` bilan ustma-ust tushadi.
- `check:pr-evidence` (bloklovchi, PR-body matnini grep orqali qidiradi) — yolgʻon ijobiy natija xavfi yuqori; olib tashlansa, Hard Rule #18 ijrosi zaiflashadi, shuning uchun bu haqiqiy siyosiy qarordir.
- `semgrep` (alohida tavsiyaviy) — OWASP oilalari boʻyicha CodeQL bilan ustma-ust tushadi; uning boshlangʻich koʻrsatkichini ratchet’ga ulang yoki olib tashlang.

---

## Tegishli hujjatlar

- Taʼminot zanjiri (kelib chiqish maʼlumotlari, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kalitlar toʻplami tengligi darvozasi

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, `i18n-ui-coverage` vazifasi).
Har bir `src/i18n/messages/<locale>.json` faylidagi oxirgi daraja kalitlari toʻplamini `en.json` bilan solishtiradi va kalit qachon qoʻshilganidan qatʼi nazar, biror kalit yoʻq yoki ortiqcha boʻlsa, tekshiruvni muvaffaqiyatsiz yakunlaydi. `__MISSING__:` toʻldirgichlari mavjud deb hisoblanadi (ularning tarkibi nisbat darvozasining vazifasidir). Bu farq va foizga asoslangan ikkita darvozaning mutlaq toʻldiruvchisidir: `check-ui-keys-coverage` har bir lokal uchun 80 % minimal chegarani taʼminlaydi (~13,000 kalitdan 43 tasi yoʻq boʻlsa ham, natija 99.7 % boʻlib koʻrinadi), `check-new-key-coverage` esa faqat PR `en.json` fayliga qoʻshgan kalitlarni baholaydi. Lokal paketi uning tarmogʻi ajratilgan kundagi `en.json` asosida yaratiladi va asosiy tarmoqqa kalitlar qoʻshilishda davom etayotgan paytda bir necha kun tarjima qilinadi; paket PRʼining oʻzi hech qanday kalit qoʻshmaydi, shu sababli 1-paket (#13044) toʻqqizta lokalda 43 ta kalit yetishmagan holda, 2-paket (#13660) esa sakkizta lokalda 10 ta kalit yetishmagan holda birlashtirilganda (2026-09-15), ikkala qarindosh darvoza ham jim qoldi. Qizil holatni
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` bilan tuzating; `extra` oxirgi daraja kaliti manbadan olib tashlanganini anglatadi — uni lokaldan oʻchiring. `--warn` muvaffaqiyatsizlikka olib kelmasdan xabar beradi.
`--catalog=cli` xuddi shu taqqoslashni `bin/cli/locales` ustida bajaradi (`npm run i18n:check-keys:cli`);
ikkala qadam ham `i18n-ui-coverage` vazifasida joylashgan.

#### `check-new-key-coverage` — yangi kalitlar uchun i18n darvozasi

`check-ui-value-drift` darvozasining qarindoshi. U inglizcha qiymat **qayta yozilib**, tarjimalari esa yangilanmay qolgan holatlarni aniqlaydi; bu darvoza esa inglizcha kalit **qoʻshilib**, ayrim lokallarga umuman kiritilmagan holatlarni aniqlaydi.

`check-ui-keys-coverage` bu turdagi muammoni koʻra olmaydi: u har bir lokal uchun foizli minimal chegarani taʼminlaydi, ~13,000 ta oxirgi daraja kalitidan oʻn bittasi yoʻq boʻlsa ham, qamrov 99.9% boʻlib qoladi. Har bir til uchun foiz «bu funksiya tarjimasiz chiqarildi» degan holatni ifodalay olmaydi — butun bir funksiya yangi lokalga hech qanday matnsiz qoʻshilishi va koʻrsatkichni umuman oʻzgartirmasligi mumkin.

Bu tekshiruv kodlashtirgan hodisa: Orchestration Canvasʼning 3-bosqichi oʻzining oʻn bitta kalitini oʻsha paytda mavjud boʻlgan 42 ta lokalga tarjima qildi. Bir necha soatdan soʻng Yevropa Ittifoqi tillari paketi (#13044) repozitoriydagi lokallar sonini 51 taga yetkazdi, yangi qoʻshilgan toʻqqizta lokal (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) esa bu kalitlarni hech qachon olmadi. `deepMergeFallback` yoʻq kalit oʻrniga inglizcha matnni qoʻyadi, shuning uchun nosozlik boʻsh UI emas, tarjima qilinmagan UI koʻrinishida namoyon boʻldi — bu haqiqiy va tuzilishi sababli jim qoladigan muammo edi.

Qarindosh darvoza kabi, bu ham **farqdan xabardor**: u birlashtirish bazasidagi inglizcha matnni ishchi daraxt bilan solishtiradi, shu sababli avvaldan mavjud boʻlgan boʻshliqlar oʻzgarishsiz qoladi va darvozani yoqish uchun hech qanday migratsiya talab qilinmaydi.

**`__MISSING__:<english>` markeri bu talabni qanoatlantirmaydi (2026-09-17 dan boshlab).** Ilgari u hujjatlashtirilgan kechiktirish usuli edi — bajarilish vaqtida tizim toʻgʻri inglizcha matnga qaytadi — biroq 2026-09-16 kuni sakkizta funksiya PRʼi 61 ta kalit qoʻshib, ularni tarjima qilish oʻrniga barcha 65 ta lokalga marker qoʻydi: bu darvoza ularning barchasini qabul qildi, PRʼlarni hech narsa toʻxtatmadi, shundan keyin haqiqiy tarjimalar nisbatini bloklovchi darvoza relizning eng soʻnggi nuqtasida hamma uchun muvaffaqiyatsiz yakunlandi (pt-BR 3.2 % > 2.5 % + 0.5). Endi marker yoʻq tarjima sifatida baholanadi. Qizil holatni
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` bilan yoki barcha lokallarni parallel ravishda `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ajratilgan holatda xavfsiz, `OMNIROUTE_TRANSLATION_*` muhit oʻzgaruvchilarisiz ishga tushishni rad etadi) bilan tuzating. Inglizcha qolishi shart boʻlgan kalit (qatʼiy belgilangan mahsulot, dvigatel yoki bayroq nomi) marker ortida emas, `scripts/i18n/untranslatable-keys.json` ichida boʻlishi kerak. `vi` markerlarni butunlay taqiqlaydi (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — chetga surilgan testlar darvozasi

`vitest.config.ts` faylining `exclude` roʻyxatidagi fayl ishga tushirilmaydigan testdir, ammo daraxtni oʻqigan kishiga u qamrovning bir qismidek koʻrinadi. Oltmish ikkita fayl
`// #8618 — pre-existing failure; remove this exclusion when fixed` izohi ortida toʻplanib qoldi. #8618 masalasi 2026-08-11 kuni yopildi, u kuzatib borgan roʻyxat esa 45 ta yozuvdan 62 tagacha oʻsdi va har bir yangi yozuv yopilgan masalaga ishora qiluvchi izohni meros qilib oldi. Roʻyxat nihoyat har bir fayl boʻyicha oʻlchanganda (#13204), **62 ta fayldan 51 tasi manba kodiga hech qanday oʻzgartirish kiritmasdan joriy daraxtda muvaffaqiyatli oʻtdi**.

Darvoza haqiqiy faylga mos keladigan har bir istisnodan (a) kuzatuv masalasini koʻrsatishni va (b) oʻlchangan holati bilan `config/quality/vitest-exclusions.json` faylida mavjud boʻlishni talab qiladi; shu tariqa yangi istisno qoʻshish 60 yozuvli massivga yana bir qator kiritish emas, balki maxsus fayldagi koʻrib chiqilishi mumkin boʻlgan farqqa aylanadi. U ataylab chiqarib tashlangan testlarni qayta ishga tushirmaydi — bu ~10 daqiqa vaqt oladi va davriy vazifaga tegishli; inventar har bir test oxirgi marta qachon oʻlchanganini qayd etadi.
