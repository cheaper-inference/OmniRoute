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

## Geytlar roʻyxati va bajarish profillari

### Nomzodni qabul qilish

CI va Quality Gates ish jarayonlarining har biri barqaror yakuniy xulosa chiqaradi: `Gate / CI` va
`Gate / Quality`. Ularning versiyalangan qabul siyosati har bir yuqori oqimdagi vazifani
majburiy yoki tavsiyaviy sifatida roʻyxatlaydi. Qoʻllaniladigan majburiy vazifa muvaffaqiyatli
yakunlanishi kerak: mavjud boʻlmagan, bekor qilingan, oʻtkazib yuborilgan, kutilayotgan va nomaʼlum
natijalar PASS holatini tasdiqlay olmaydi. Faqat hujjatlar yoki faqat katalogga tegishli haqiqiy
tasnif kod yoʻnalishini qoʻllanilmaydigan qilishi mumkin; qoralama PR qabul qilingan nomzod
hisoblanmaydi. `hotfix` yorligʻi dalillar talabini bekor qilmaydi.

Har ikkala ish jarayoni ham main/release shoxlariga yoʻnaltirilgan PRlarni, `main` shoxiga
pushlarni, qoʻlda ishga tushirishni va merge-group hodisalarini qamrab oladi. Push, qoʻlda ishga
tushirish va merge-group toʻliq tanlovni bajaradi. `release/**` shoxlariga pushlar ularni ishga
tushirmaydi (2026-10-18): har bir oʻzgarish allaqachon oʻz PRida matritsadan oʻtgan boʻladi,
birlashtirilgan kombinatsiyani tekshirish esa Release-Green vazifasidir
(`docs/ops/RUNNER_BOX.md` → Hosted lane). Forklar va merge-grouplar boshqa holatlarda
self-hosted runnerlarni tanlaydigan vazifalar uchun hosted runnerlardan foydalanadi; joriy
etishdan oldin yetarli hosted sigʻim mavjudligi tekshirilishi kerak.

Har bir JSON kvitansiyasi checkout qilingan SHA, ish jarayoni ishga tushirilishi va urinishni
aniqlaydi. CLI checkout/hodisa SHA nomuvofiqligini rad etadi. Ish jarayoni testlari siyosatdagi
aʼzolikni yakuniy xulosa vazifasining `needs` roʻyxatiga bogʻlaydi, shuning uchun yangi yoki
olib tashlangan yoʻnalish sezdirmasdan yoʻqolib qolmaydi. Kvitansiyalar nashr qilish, joylashtirish
yoki mavjud tavsiyaviy skanerning ichki jarayonlarini emas, faqat oʻz ish jarayonini qamrab oladi.
Branch qoidalarida har ikkala tekshiruv nomini faollashtirish alohida maʼmuriy oʻzgarishdir;
bu vazifalarni qoʻshishning oʻzi branchni himoyalamaydi.

### Qabul qilish reduktorida saqlanadigan dalillar

`scripts/quality/validate-release-acceptance.mjs` taqdim etilgan reja va uning manifestlarini
reduksiya qiladi; u rejaning toʻliq reliz konveyerini qamrab olishini tasdiqlamaydi. Reja
`VERIFIED` boʻlsa ham, uning hisobotlari `releaseAcceptance: false` qiymatini aniq belgilaydi.
`release-acceptance.yml` ish jarayoni hanuz haqiqiy build, paket, ishga tushirish yoki ilgari
surish kvitansiyalari oʻrniga soya fixturelaridan foydalanadi.

CLI saqlangan dalillarni tekshirish uchun `--evidence-root` parametrini talab qiladi. Fayllar
`<evidence-root>/<artifact_id>/<member>` sifatida aniqlanadi va SHA-256 bilan xeshlanadi.
Dalilsiz PASS yozuvi, mavjud boʻlmagan yoki oʻzgartirilgan fayl, xavfsiz boʻlmagan yoʻl yoki
ramziy havola tekshiruvdan oʻtishga yoʻl qoʻymaydi. Mavjud boʻlmagan fayllar boʻsh muvaffaqiyatli
loglarga teng emas. Mavjud SHA/ishga tushirish/urinish tekshiruvlari mustaqilligicha qoladi:
baytlarning mos kelishi eskirgan kvitansiyani yaroqli qila olmaydi. Fayl yaxlitligi bajarilishning
haqiqiyligi yoki artefakt ilgari surilganining isboti emas.

### UI bajarish sigʻimi

CI toʻliq UI roʻyxatini toʻrtta `test-vitest` matritsa shardlari sifatida ishga tushiradi;
har bir shardda koʻpi bilan ikkita worker va mavjud 15 daqiqalik vazifa muddati mavjud.
Birinchi shard MCP/autoCombo Vitest toʻplamini ham ishga tushiradi. Majburiy vazifa natijasi
matritsaning har bir qismini qamrab oladi; bitta shardning muvaffaqiyatsiz tugashi yoki bekor
qilinishi nomzod qabul qilinganini tasdiqlay olmaydi.

Tungi kuzatuvchi har bir UI shardi uchun alohida aniq-nomzod kvitansiyasini, jumladan birinchi
kvitansiyadagi MCP bajarilishini saqlab qoladi. Barcha toʻrtta kvitansiya, loglar va mos keluvchi
bajarilish identifikatorlari talab qilinadi. Mahalliy `npm run test:vitest:ui` hanuz toʻliq
toʻplamni tanlaydi; bitta `--shard` ishga tushirilishi faqat qisman dalildir.

### Unit qamrovini yigʻish

Oʻn ikkita unit shard mavjud test bajarilishi vaqtida V8 qamrovini yigʻadi. Muvaffaqiyatli
shard oraliq Istanbul hisobotini yaratmasdan asl fayllarni siqish uchun
`scripts/ci/compact-v8-coverage.mjs` skriptini ishga tushiradi. Yakuniy Coverage vazifasi barcha
oʻn ikkita manifestni nomzod SHA, runtime, manba ildizi va maʼlumotlar xeshlariga nisbatan
tekshiradi, soʻng c8 reporterlari va mavjud qamrov chegaralarini ishga tushiradi. Kirish
maʼlumotlari c8ning global fayl nomlari tartibini saqlab qoladi; har bir shardni oldindan
birlashtirish aralash funksiya/blok qamrovi uchun xavfli. Mavjud boʻlmagan, notoʻgʻri tuzilgan
yoki mos kelmaydigan shardlar qabul qilishni muvaffaqiyatsiz qiladi. Muvaffaqiyatsiz test
shardlarining xom diagnostik qamrovi alohida saqlanadi; u yakuniy birlashtirishga kiritilmaydi.

### Statik skanerlash roʻyxati

Versiyalangan npm-alias roʻyxati va statik skanerlash tarkibi
`config/quality/gate-manifest.json` faylida joylashgan. Skript nomlari va aniq buyruqlarni
`package.json` bilan solishtirib tekshirish uchun `npm run check:gate-manifest` buyrugʻini
ishga tushiring; qoʻshishlar, olib tashlashlar va buyruqlardagi ogʻishlar ham mahalliy hook,
ham CIdagi oʻzgarishlarni tasniflash vazifalarini muvaffaqiyatsiz qiladi. Alias ish jarayoni
vazifasi, matritsa nusxasi yoki test holati emas: bu sonlarni oʻzaro almashtiriladigan tarzda
taqdim etish mumkin emas.

Tanlangan aliaslarni bajarmasdan koʻrib chiqish uchun
`npm run quality:scan -- --list` yoki `npm run quality:scan:fast -- --list`
buyrugʻidan foydalaning. Runner npm kirish nuqtasini chaqiradi, shuning uchun uning runtime
muhiti (jumladan, sozlangan joylarda Bun) saqlanadi. Manifest ushbu profillardan tashqaridagi
aliaslarni alohida chaqiriladigan sifatida qayd etadi va faqat oʻqish uchun moʻljallangan
skanerlash profillarida texnik xizmat buyruqlari taqiqlanadi.

Bu profillar faqat statik skanerlashni qamrab oladi. Ular mahsulot testlari, qamrov,
paketlash, tashqi tekshiruvlar yoki nomzodning relizga toʻliq qabul qilinishini tasdiqlamaydi.
Ish jarayoniga qabul qilish bogʻlangan `config/quality/admission-policy.json` va
`scripts/quality/admission-verdict.mjs` fayllaridan foydalanadi. Release-observer profillari
alohida qoladi; ularning tegishli tekshiruvlari va kvitansiyalarini mustaqil ravishda koʻrib
chiqing. Toʻliq observerning statik buyruqlari `config/quality/release-green-static-profile.json`
faylida eʼlon qilingan boʻlib, ular `audit:deps`, mutatsiya testi tanlovi va tarjima
tekshiruvlarini oʻz ichiga oladi. Loader npm buyruqlarini package.json va modellashtirilgan
CI/Quality deklaratsiyalariga nisbatan tekshiradi; u shell tokenlarini argument sifatida
bajarish oʻrniga ogʻishlarni rad etadi. Majburiy skanerning SKIP/INCOMPLETE chiqishi PASS
holatini tasdiqlay olmaydi. Profil oʻzining tashqi istisnolarini qayd etadi va hosted qamrov,
test matritsalari, paket yoki joylashtirish dalillarini almashtirmaydi. Quyidagi matnli roʻyxat
maʼlumotnoma boʻlib, geyt amalda bajarilganining isboti emas.

Skriptlar `scripts/check/` (siyosat geytlari) va `scripts/quality/` (ratchet mexanizmi) ostida
joylashgan. CIning yagona ishonchli manbasi `.github/workflows/ci.yml` hisoblanadi.

### Release PR tezkor yoʻli (`quality.yml`)

`.github/workflows/quality.yml` `main`/reliz PRlarida, `main`ga yuborishlarda,
dispatch va merge guruhlarida CI’ni toʻldiradi. PRlar yoʻl boʻyicha filtrlangan tezkor tekshiruvlardan foydalanadi. Doimiy ravishda
oʻchirib qoʻyilgan takroriy build olib tashlandi; haqiqiy build/package/boot tekshiruvlari CI’da qoladi.

| Job                                              | Qamrov                                                                                                                                                                                                                                                               | Bloklovchi             |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Hujjatlar/kod PRlari; API hujjatlari havolalari va docs-all                                                                                                                                                                                                          | Ha                     |
| `Fast Quality Gates`                             | Kod PRlari; statik tekshiruvlar, typecheck, dashboard typecheck, taʼsirlangan unit testlar                                                                                                                                                                           | Ha                     |
| `Forgotten sibling tests`                        | Kod PRlari; oʻzgartirilgan modullar statik isteʼmolchilar va ehtimoliy sibling testlargacha kuzatiladi; barrel va dynamic-import yoʻllari tavsiyaviy diagnostika sifatida hisobot qilinadi, bunda havola qilingan ruxsat etilgan roʻyxat istisnolari hisobga olinadi | **Tavsiyaviy**         |
| `Vitest (fast-path)`                             | Kod PRlari; tezkor vitest toʻplami                                                                                                                                                                                                                                   | Ha                     |
| `Unit Tests fast-path`                           | Kod PRlari; 4-shard unit toʻplami                                                                                                                                                                                                                                    | Ha                     |
| `No new ESLint warnings`                         | Kod PRlari; suppressions hisobga olinadigan lint himoyasi                                                                                                                                                                                                            | Ha, forklar ham kiradi |
| `Merge integrity (changelog + generated skills)` | Draft boʻlmagan PRlar; changelog va generatsiya qilingan skill sinxronizatsiyasi                                                                                                                                                                                     | Ha, forklar ham kiradi |

#### Unutilgan sibling testlar hisoboti

`npm run check:forgotten-sibling-tests` test taʼsiri xaritasi ortidagi import resolveridan qayta foydalanadi.
Har bir oʻzgartirilgan ishlab chiqarish moduli uchun, ehtimoliy test
pull request diffida mavjud boʻlmasa, u deterministik
`changed module/symbol -> static consumer -> candidate sibling test` zanjirlarini hisobot qiladi. Markdown xulosasi va JSON natijasi
har qanday bloklovchi joriy etishdan oldin kalibrlash uchun `forgotten-sibling-tests` workflow artefakti sifatida saqlanadi.

Barrel qayta eksportlari va dinamik importlar faqat resolution diagnostikasidir; ular hech qachon
bloklovchi topilma yaratmaydi. Koʻrib chiqilgan istisnolar
`config/quality/forgotten-sibling-allowlist.json` ichida saqlanadi. Har bir yozuv isteʼmolchi va ehtimoliy
testni koʻrsatishi, aniq asos keltirishi hamda GitHub issue yoki pull requestiga havola berishi kerak. Notoʻgʻri tuzilgan yozuvlar
yopiq holatda xatoga olib keladi. Istisnolar oʻchirilgan ehtimoliy testni yoki `.skip`/`.todo` qoʻshuvchi diffni chetlab oʻta olmaydi;
assertionlarni zaiflashtirish va boshqa niqoblash holatlari mustaqil ravishda bloklovchi
`check:test-masking` gate tomonidan boshqariladi.

### Job: `lint`

`main`ga yoʻnaltirilgan har bir PRda ishga tushadi. Xatolik yuz bersa, mergeni bloklaydi.

| Skript (`npm run ...`)            | Tekshiradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bloklovchi                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Node.js versiyasi qoʻllab-quvvatlanadigan diapazonda ekanini                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                         |
| `check:cycles`                    | Butun `src/` + `open-sse/` boʻylab siklik importlarni (AST asosida, tsconfig `paths` yechilgan holda). Oddiy ishga tushirish har qanday sikl mavjud boʻlganda 1 kodi bilan yakunlanadi (#15281 dan beri xatolik yuz berganda yopiladi) va SCClarni roʻyxatlaydi. `check:cycles:ratchet` (CI ishga tushiradigan variant) sikllar soni `quality-baseline.json` faylidagi `metrics.cycles` chegarasidan oshganda bloklaydi — hozir 14, `direction: down`, shuning uchun u faqat kamayishi mumkin (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha (ratchet)                               |
| `check:boundary`                  | `open-sse → src` bogʻliqligi: mexanizmdan ilovaga noyob fayldan-faylga importlar (`scripts/quality/measure-boundary.mjs`; bogʻlanishlar roʻyxati v4 yadro/modulga ajratish tuzatishlari uchun bajarilmagan ishlar roʻyxatidir). Oddiy ishga tushirish = tavsiyaviy hisobot (`quality:boundary` bilan bir xil). `check:boundary:ratchet` (CI ishga tushiradigan variant, shuningdek, `quality.yml` tezkor tekshiruvlar ratchet siklida) son `quality-baseline.json` faylidagi `metrics.boundaryOpenSseToSrc` chegarasidan oshganda bloklaydi — oʻlchangan 771 qiymati bilan boshlangan, `direction: down`; `--update` uni faqat pasaytiradi; PRlarda bazaga nisbatan ishlaydi (`--base-ref`, quyiga qarang)                                                                                                                                                                                                                                                                                                                                                                                      | Ha (ratchet)                               |
| `check:route-validation:t06`      | Barcha marshrutlarda Zod sxemalari mavjudligini (6-daraja siyosati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ha                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` soni belgilangan limitdan oshmaydi (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ha                                         |
| `check:provider-consistency`      | `providers.ts` ichidagi har bir provayder `providerRegistry.ts` ichida mos yozuvga ega (va aksincha, ruxsat etilganlar roʻyxati doirasida)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                         |
| `check:model-lifecycle`           | Qoʻlda yuritiladigan uchta marshrutlash jadvali repozitoriyga kiritilgan hayot sikli surati (#11503) bilan muvofiq qoladi: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` marshrutlay oladigan, foydalanishdan chiqarilgan hech qanday id uchun ball belgilamaydi; har bir `BUILT_IN_ALIASES` nishoni `REGISTRY` ichida mavjud va foydalanishdan chiqarilgan id suratida yoʻq; `REGISTRY` ichida hanuz mavjud boʻlgan har bir foydalanishdan chiqarilgan id boshqa manzilga yoʻnaltirilgan yoki `allowedRetiredInCatalog` ichida koʻrsatilgan; va hech bir `DEFAULT_DEGRADATION_MAP` manbasi yoki nishoni ushbu suratda foydalanishdan chiqarilgan sifatida koʻrsatilmagan. Bu modelga ayni paytda faol yuqori oqim xizmati tomonidan xizmat koʻrsatilayotganini isbotlamaydi. Oflayn — qoʻlda `npm run quality:refresh-model-lifecycle` orqali yangilanadigan `config/quality/model-lifecycle.json` bilan solishtiradi (tarmoq talab etiladi; CI tizimiga ulanmagan). `allowedRetiredInCatalog` — bosqichma-bosqich kamaytirish mexanizmi: yozuvni faqat kuzatuv masalasi bilan birga qoʻshing. | Ha                                         |
| `check:fetch-targets`             | Mijoz tomonidagi `src/` ichidagi har bir `fetch("/api/...")` haqiqiy `route.ts` fayliga mos keladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                         |
| `check:deps`                      | Repozitoriydagi har bir `package.json` boʻylab `npm install` orqali oʻrnatiladigan barcha bogʻliqliklar `dependency-allowlist.json` ichida mavjud; versiyasi mahkamlanmagan yoki slopsquatting xavfiga ega yangi paketlar belgilanadi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                         |
| `audit:deps`                      | Beshta mustaqil lockfile (ildiz, Electron, OpenCode plaginlari v1/v2 va provayder) uchun npm auditi. Kritik ogohlantirishlar bloklaydi; yuqori darajadagi ogohlantirishlar koʻrinadigan ogohlantirish sifatida qoladi. Yetishmayotgan/muvaffaqiyatsiz auditlar INCOMPLETE hisoblanadi va bloklaydi; har bir qamrovga oid lock xeshlari va hisobotlar saqlanadi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha                                         |
| `check:lockfile`                  | `package-lock.json` yaxlitligi — https reyestri, yaxlitlik xeshlari, host almashtirishlari yoʻq                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha                                         |
| `check:licenses`                  | Ishlab chiqarish bogʻliqliklari uchun SPDX litsenziyalarining ruxsat etilgan roʻyxati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                         |
| `check:tracked-artifacts`         | Build artefaktlari / commit qilingan `node_modules` ramziy havolalari yoʻq (husky pre-commit jarayonida ham ishga tushadi; pre-push ataylab yengil qilingan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ha                                         |
| `check:ai-attribution`            | PR commitlari, sarlavhasi yoki matnida AI/bot `Co-Authored-By` treyleri yoki AI yaratganini bildiruvchi footer yoʻq — Qatʼiy qoida #16 (`quality.yml` ichidagi PR→`release/**` uchun fast-gates siklida — hodisa payloadini oʻqiydi, PR boʻlmasa hech narsa qilmaydi — va `ci.yml` lintida PR→`main` uchun faqat PRga tegishli qadam; shuningdek, husky `commit-msg` hooki; inson hammualliflarga ruxsat beriladi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Har bir Vitest istisnosi kuzatuv masalasini koʻrsatadi va `config/quality/vitest-exclusions.json` faylida mavjud (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `check:file-size`                 | Manba fayllari (`src/`, `open-sse/`, `electron/`, `bin/` ichidagi `.ts`/`.tsx`) `cap` doirasida, test fayllari (`*.test.ts(x)`) esa `testCap` doirasida qoladi; `file-size-baseline.json` faylida muzlatilgan fayllar (`frozen` / `testFrozen`) qayd etilgan hajmidan oshmasligi kerak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:error-helper`              | Executorlar/handlerlardagi xato javoblari `buildErrorBody()` / `sanitizeErrorMessage()` dan foydalanadi (Qatʼiy qoida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                         |
| `check:migration-numbering`       | Migratsiya SQL fayllari ketma-ket raqamlangan, bo‘shliqlar yoki takroriy raqamlar yo‘q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:public-creds`              | `publicCreds.ts` tashqarisida literal OAuth `client_id`/`client_secret` yoki Firebase Web kalitlari yo‘q (Qatʼiy qoida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                         |
| `check:db-rules`                  | `src/lib/db/` modullaridan tashqarida bevosita SQL yo‘q; `localDb.ts` dan barrel-importlar yo‘q (Qatʼiy qoidalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ha                                         |
| `check:known-symbols`             | Dispatch jadvallarida ro‘yxatdan o‘tkazilgan provayder executorlari, marshrutlash strategiyalari va translatorlar diskdagi fayllarga mos keladi — yetim yoki eʼlon qilinmagan symbolllar yo‘q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:route-guard-membership`    | Ichki jarayonni ishga tushiradigan har bir marshrut `isLocalOnlyPath()` orqali tasniflangan (Qatʼiy qoidalar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                         |
| `check:test-discovery`            | Repodagi har bir `*.test.ts` / `*.spec.ts` fayli kamida bitta test ishga tushirgichi tomonidan toʻplanadi (ratchet: `test-discovery-baseline.json` ichidagi yetim fayllar roʻyxati faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                         |
| `check:test-tla-order`            | `tests/unit` ostidagi hech bir `node:test` fayli testni roʻyxatdan oʻtkazib, yuqori darajadagi `await`ga yetib, soʻng yana testlarni roʻyxatdan oʻtkazmaydi (#18045; ratchet: `test-tla-order-allowlist.json` faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:agent-skills-sync`         | Yaratilgan agent-koʻnikmalari artefaktlari ularning manba katalogiga mos keladi (tafovut yoʻq)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Provayder logotiplari/aktivlari uchun qayd etilgan kelib chiqish yozuvi mavjud                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | JSON konfiguratsiya fayllari tahlildan muvaffaqiyatli oʻtadi va repo lint qoidalariga javob beradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript kompilyatsiyasi xatolarsiz amalga oshadi (faqat tavsiyaviy ogohlantirishlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ha                                         |
| `typecheck:noimplicit:core`       | Qatʼiy `noImplicitAny` — kelajakka yoʻnaltirilgan; oldindan mavjud koʻplab chaqiruv joylari hali ham annotatsiyalarga muhtoj                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Tavsiyaviy** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` bilan cheklangan `tsc` (#7033) — `typecheck:core`ning sinchiklab tanlangan 27 faylli ruxsat roʻyxati hech qanday dashboard TSX faylini oʻz ichiga olmaydi, `next build` esa uni umuman tur tekshiruvidan oʻtkazmaydi (`next.config.mjs` faylida `ignoreBuildErrors: true` oʻrnatilgan), shu sababli u yerdagi yetim-identifikator regressiyalari (#6625/#6909) CI uchun koʻrinmas edi. Har bir fayl/har bir TS-kod boʻyicha muzlatilgan xatolar soni bazaviy koʻrsatkichi bilan farqlarni tekshiradi (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` bilan bir xil eskirganlikni nazorat qilish andozasi) — faqat bazaviy sondan oshgan YANGI xatolar darvozadan oʻta olmaydi; avvaldan mavjud xato tuzatilganda `--update` bilan bazaviy koʻrsatkichni pasaytiring.                                                                                                                                                                                                                                                                        | Ha                                         |

### Vazifa: `quality-gate`

`test-coverage`dan keyin ishga tushadi. Muvaffaqiyatsizlik yuz bersa, birlashtirishni bloklaydi.

| Skript                       | Tekshiradi                                                                                                                                                                                                                                       | Bloklovchi            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `quality:collect`            | `quality-metrics.json`ni hosil qiladi (ESLint ogohlantirishlari soni, birlashtirilgan shard hisobotidan qamrov)                                                                                                                                  | Ha (ratchetdan oldin) |
| `quality:ratchet`            | `quality-baseline.json`dagi har bir metrikada regressiya yuz bermaganini tekshiradi (ESLint ogohlantirishlari ≤ bazaviy koʻrsatkich; qamrov ≥ bazaviy koʻrsatkich)                                                                               | Ha                    |
| `check:duplication`          | Kod takrorlanishi (jscpd@4) `quality-baseline.json`dagi bazaviy koʻrsatkichdan oshmasligini tekshiradi                                                                                                                                           | Ha                    |
| `check:complexity`           | Fayl darajasidagi siklomatik murakkablik chegaradan oshmasligini tekshiradi (asosiy ESLint `complexity` + `max-lines-per-function`)                                                                                                              | Ha                    |
| `check:cognitive-complexity` | Kognitiv murakkablik ratcheti (`eslint-plugin-sonarjs`) — alohida ESLint oʻtishi; CI ikkalasini yagona `check:complexity-ratchets` bosqichi sifatida birlashtirib ishga tushiradi                                                                | Ha                    |
| `check:dead-code`            | Ishlatilmaydigan eksportlar/fayllar ratcheti (knip) bazaviy koʻrsatkichka nisbatan regressiya qilmasligini tekshiradi                                                                                                                            | Ha                    |
| `check:compression-budget`   | Siqish benchmarki byudjeti — har bir mexanizm uchun token tejashning minimal chegaralari regressiya qilmasligi kerak                                                                                                                             | Ha                    |
| `check:type-coverage`        | Turlanganlik foizi ratcheti (`type-coverage`) regressiya qilmasligini tekshiradi; `typecheck:noimplicit:core`ni katta darajada oʻz ichiga oladi                                                                                                  | Ha                    |
| `check:codeql-ratchet`       | Ochiq CodeQL ogohlantirishlari soni regressiya qilmasligini tekshiradi (`gh api` orqali oʻqiydi; tokensiz holatda muammosiz oʻtkazib yuboradi) — yangilash davriyligi va qoʻlda ishga tushirish uchun quyidagi "CodeQL ratchet" boʻlimiga qarang | Ha                    |

### Vazifa: `quality-extended`

Bu vazifa tegishli nomzodlarni bloklaydi. Paket hajmi, maxfiy maʼlumotlar topilmalari, zaiflik
topilmalari, ish jarayoni topilmalari va OpenAPI oʻzgarishlari majburiy ratchetlar bilan
tekshiriladi. Siklik bogʻliqlik diagnostikasi tavsiyaviy boʻlib qoladi. Skanerlarni oʻrnatish majburiy:
`scripts/ci/install-quality-scanners.sh` biriktirilgan versiyalarni taqdim etadi va oʻrnatishdagi
muvaffaqiyatsizliklarni uzatadi. Yetishmayotgan vositalar, yaroqsiz hisobotlar yoki mavjud boʻlmagan
bazaviy koʻrsatkichlar majburiy skaner darvozasini TUGALLANMAGAN holatda qoldiradi.

| Skript                   | Tekshiradi                                                                                                                                                                                                                                               | Bloklash holati                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Siklik bogʻliqliklar yoʻqligi (dpdm)                                                                                                                                                                                                                     | **Tavsiyaviy**                                          |
| `check:bundle-size`      | Toʻplam hajmi belgilangan chegaradan oshmasligi; oʻlchovni olib boʻlmasa, tekshiruv muvaffaqiyatsiz yakunlanadi                                                                                                                                          | **--ratchet bilan bloklovchi**                          |
| `check:secrets`          | Gitleaks topilmalari ortib ketmasligi; majburiy skanerlashlarda vosita/manba/asosiy koʻrsatkich yoʻqligi, muvaffaqiyatsiz skanerlashlar va yaroqsiz hisobotlar rad etiladi                                                                               | **--ratchet bilan bloklovchi**                          |
| `check:vuln-ratchet`     | Bogʻliqliklardagi zaifliklar ortib ketmasligi; majburiy skanerlashlarda vositalar yoʻqligi, yaroqsiz hisobotlar yoki asosiy koʻrsatkichlar yoʻqligi rad etiladi                                                                                          | **--ratchet bilan bloklovchi**                          |
| `check:workflows`        | Ish jarayonini lint qilish (actionlint + zizmor); yoʻq/buzilgan skanerlar, yaroqsiz hisobotlar yoki yoʻq ratchet asosiy koʻrsatkichi INCOMPLETE sifatida xatoga olib keladi. Yaroqli topilmalar tanlangan strict/advisory/ratchet siyosatiga amal qiladi | Bajarilishi shart; zizmor ratchet CI muhitida bloklaydi |
| `check:openapi-breaking` | Ommaviy API shartnomasini mahkamlangan hodisa commitlari bilan solishtiradi (PR merge-base, push oldingi holati, merge-group asosi; rejalashtirilgan/qoʻlda checkout uchun birinchi ota commit); majburiy oʻlchov mavjud boʻlmasa, tekshiruv rad etadi   | **--ratchet bilan bloklovchi**                          |

### Vazifa: `docs-sync-strict`

`main` yoki `release/**` ga yo‘naltirilgan birlashtirish so‘rovlarida bu vazifa faqat qoralama bo‘lmagan (yoki ishonchli navbatdan kelgan), hujjat yoki kod o‘zgarishi sifatida tasniflangan nomzodlar uchun ishlaydi. U PR bo‘lmagan CI hodisalarida ham ishlaydi; ushbu ish jarayonining push ishga tushirgichi faqat `main` ni qamrab oladi, `release/**` ni emas. Noldan farqli chiqish kodi bilan tugagan qadam vazifani bloklaydi; faqat hisobotda ko‘rsatiladigan topilmalar va quyida hujjatlashtirilgan istisnolar bloklamaydi.

| Skript                         | Tekshiradi                                                                                                                                                                                                                                                                                                                                                                                                                                | Bloklash holati                                                                                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Quyidagi 7 ta quyi nazoratni ketma-ket ishga tushiradigan meta-nazorat                                                                                                                                                                                                                                                                                                                                                                    | Ha                                                                                                                                                  |
| ↳ `check:docs-sync`            | Paket/OpenAPI/CHANGELOG versiyalarining muvofiqligi, `llm.txt` ning aynan bir xil ko‘zgu nusxalari, tarjima qilingan CHANGELOG bo‘limlari va o‘lchamiga oid o‘zgarmas shartlar hamda yangilari bilan almashtirilgan takroriy hujjatlarning yo‘qligi                                                                                                                                                                                       | Ha                                                                                                                                                  |
| ↳ `check:docs-frontmatter`     | Kompilyatsiya qilingan hujjat sahifalarida yaroqli frontmatter sarlavhalari mavjudligi                                                                                                                                                                                                                                                                                                                                                    | Ha                                                                                                                                                  |
| ↳ `check:docs-counts`          | Ishonchliligi yuqori bo‘lgan sanoq invariantlari qatʼiy tekshiriladi; fayllar sonining evristik tekshiruvlari, skriptga `--strict` berilmasa, faqat ogohlantiradi (CI meta-nazorati bu bayroqni uzatmaydi)                                                                                                                                                                                                                                | Qatʼiy daraja bloklaydi; yumshoq daraja tavsiyaviy                                                                                                  |
| ↳ `check:env-doc-sync`         | Eʼtiborga olinmaydigan, faqat hujjatlarda mavjud va faqat muhitda mavjud o‘zgaruvchilar uchun aniq ruxsat ro‘yxatlari qo‘llangach, manba kodidagi muhit o‘zgaruvchilarini o‘qishlar, `.env.example` va `docs/reference/ENVIRONMENT.md` bir-biriga mos keladi                                                                                                                                                                              | Ha, hujjatlashtirilgan ruxsat ro‘yxatlaridan tashqarida                                                                                             |
| ↳ `check:deprecated-versions`  | Eʼtiborga olinmaydigan hujjatlarni chiqarib tashlab, xavfsiz tarixiy kontekstlardan tashqaridagi ehtimol eskirgan versiyalar va eskirgan yangilanish sanalari haqida xabar beradi                                                                                                                                                                                                                                                         | Joriy CI sozlamasida tavsiyaviy (`--strict` uzatilmaydi)                                                                                            |
| ↳ `check:doc-links`            | Hujjatlardagi ichki markdown havolalari haqiqiy fayllarga olib borishi (`[text]`/`(path)` shakli)                                                                                                                                                                                                                                                                                                                                         | Ha                                                                                                                                                  |
| ↳ `check:fabricated-docs`      | Hujjatlarda keltirilgan marshrutlar, muhit oʻzgaruvchilari, CLI buyruqlari, hook nomlari va fayl yoʻllari kod bazasida mavjudligi. `--strict` orqali qatʼiy tekshiruv; bayroqsiz yumshoq xatolik.                                                                                                                                                                                                                                         | Ha (CI muhitida `--strict` orqali)                                                                                                                  |
| `check:cli-i18n`               | CLI ishlatadigan `t()` kalitlari `en` da mavjud; `pt-BR` har bir yuqori darajadagi bo‘limni saqlaydi; `zh-CN` va `zh-TW` da `en` dagi har bir kalit mavjud                                                                                                                                                                                                                                                                                | Ha                                                                                                                                                  |
| `check:openapi-coverage`       | OpenAPI spetsifikatsiyasi haqiqiy marshrutlarning kamida ratchet orqali belgilangan eng quyi miqdorini qamrab olishi                                                                                                                                                                                                                                                                                                                      | Ha                                                                                                                                                  |
| `check:openapi-security-tiers` | Eʼlon qilingan `x-loopback-only`/`x-always-protected` annotatsiyalari `routeGuard.ts` da asoslangan bo‘lishi kerak; tahlillagich xatolari va to‘g‘ri yo‘nalishdagi tekshiruv nomuvofiqliklari bloklaydi. Faqat mahalliy kirishga ruxsat beruvchi prefikslar ostida `x-loopback-only` yetishmasligini teskari tekshirish ogohlantiradi, faqat andozalar orqali belgilangan marshrutlar esa ushbu teskari tekshiruvdan chiqarib tashlanadi. | Tahlillagich va to‘g‘ri yo‘nalishdagi tekshiruvlar bloklaydi; teskari tekshiruv tavsiyaviy                                                          |
| `check:openapi-routes`         | Asoslantirilgan `KNOWN_STALE_SPEC` ruxsat ro‘yxati qo‘llangach, `openapi.yaml` ichidagi har bir `/api...` yo‘li parametr farqlarini hisobga olmasdan haqiqiy marshrutga mos keladi; ruxsat ro‘yxatidagi eskirgan yozuvlar ham tekshiruvni muvaffaqiyatsiz qiladi                                                                                                                                                                          | Ha                                                                                                                                                  |
| `check:docs-symbols`           | Ko‘zgu nusxasi bo‘lmagan kanonik hujjatlardagi ichki `/api/...` URL havolalari haqiqiy marshrut yoki marshrutlar oilasiga mos keladi; proksi, yuqori oqim, o‘rinbosar va fayl havolalari hamda asoslantirilgan `KNOWN_STALE_DOC_REFS` yozuvlari chiqarib tashlanadi, ruxsat ro‘yxatidagi eskirgan yozuvlar esa tekshiruvni muvaffaqiyatsiz qiladi                                                                                         | Ha                                                                                                                                                  |
| `i18n translation drift`       | Asosiy tarjima qilingan hujjatlar to‘plamining manba va nishon xeshlari `.i18n-state.json` ga mos keladi. PR faqat yangidan kiritilgan manba tafovuti, nishonning yo‘qligi yoki nishon xeshi tafovuti tufayli tekshiruvdan o‘tmaydi; PR bo‘lmagan tekshiruvlar qatʼiy. PR ga avvaldan meros bo‘lib kelgan tafovutlar va eskirgan nishonlarning manba xeshlari ogohlantirish sifatida beriladi.                                            | PR dagi yangi tafovutlar va PR tashqarisidagi qatʼiy tekshiriladigan tafovutlar bloklaydi; avvaldan meros bo‘lgan yoki eskirgan holatlar tavsiyaviy |

`docs/diagrams/` ostidagi o‘n ikkita README SVG fayli `scripts/docs/gen-readme-<name>.mjs` orqali yaratiladi; `npm run docs:readme-diagrams` ularning barchasini qayta yaratadi.
Har birining baytma-bayt taqqoslaydigan birlik testi bor (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` vazifasi); repozitoriyga yozilgan fayl eskirganda test muvaffaqiyatsiz tugaydi.
`check:docs-counts` kanonik sonlarni ularning `<text>` tugunlaridan o‘qiydi, shu sababli raqamlar hech qachon kontur yo‘llariga aylantirilmaydi.
SVG kanonik sonlar tekshiruvi `SVG_DIAGRAM_FILES` ichida (`scripts/check/check-docs-counts-sync.mjs`) ko‘rsatilgan fayllarni o‘qiydi: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`.
Doim bepul provayderlar, katalog yozuvlari, takrorlanuvchi resurs havzalari va baholash omillari haqidagi da’volar tekshiruvi ham `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg` fayllarini o‘qiydi.
`free-tier-budget.svg` sonlarni joriy katalog yuklagichidan oladi; shuning uchun `FREE_MODEL_BUDGETS` yoki provayderning ko‘rsatiladigan nomi o‘zgarsa, shu fayl qayta yaratilguncha CI muvaffaqiyatsiz bo‘ladi.

### Vazifa: `i18n-ui-coverage`

| Skript                           | Tekshiradi                                                                                                                                                                                                                                               | Bloklovchi     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (ichki) | UI i18n kalitlari qamrovi ≥ 65%                                                                                                                                                                                                                          | Ha             |
| `check-ui-value-drift` (ichki)   | Qayta yozilgan inglizcha **qiymat** ortida eskirgan tarjima qolmasligini                                                                                                                                                                                 | Ha             |
| `check-new-key-coverage` (ichki) | **Yangi** inglizcha kalit har bir lokalga tarjima qilinganini — `__MISSING__:` belgisi rad etiladi                                                                                                                                                       | Ha             |
| `check-translation-ratio`        | Har bir lokal uchun haqiqiy tarjima ulushi (ruxsat etilganlar roʻyxatidan tashqaridagi inglizcha bilan bir xil / toʻldiruvchi / mavjud boʻlmagan elementlar) `config/quality/i18n-translation-baseline.json` + ruxsat etilgan ogʻishdan oshmasligi kerak | **Tavsiyaviy** |

`fetch-depth: 0` talab qilinadi — qiymat siljishi darvozasi `en.json` faylini birlashtirish bazasi bilan solishtiradi.

#### `check-ui-value-drift` — eskirgan tarjima darvozasi

Boshqa darvozalar tuzilmaviy jihatdan aniqlay olmaydigan yagona i18n regressiyasini aniqlaydi: inglizcha qiymat
qayta yoziladi, ammo _avvalgi_ inglizcha matndan olingan tarjimalar saqlanib qoladi, natijada
ingliz tilidan boshqa tillardagi foydalanuvchilar ishonchli ohangda yozilgan, lekin endi notoʻgʻri boʻlgan matnni oʻqishda davom etadi.

Bu muammo haqiqatan ham chiqarilgan versiyaga kirib ketgan. Antigravity tizimga kirish yordamchisi qoʻshilganda (#5203)
`oauthModal.googleOAuthWarning` qayta yozilgan; **43 ta lokaldan 39 tasi** operatorlarga «toʻliq URL manzilini
nusxalab, quyiga joylashtirish»ni aytuvchi matnni saqlab qolgan — bu provayder uchun bunday jarayonni yakunlab
boʻlmaydi. Bu #8463 gacha sezilmay qoldi, chunki:

- `sync-ui-keys` faqat **mavjud boʻlmagan** kalitlarni toʻldiradi, **eskirgan** kalitlarni esa hech qachon yangilamaydi;
- `check-ui-keys-coverage` kalitning _mavjudligini_ hisoblaydi, shuning uchun eskirgan tarjima qamrab olingan deb baholanadi;
- `check-translation-drift` `docs/i18n/<locale>/**.md` hujjat koʻzgularini kuzatadi —
  u hech qachon `src/i18n/messages/*.json` fayllarini oʻqimaydi. 2026-09 qayta sinxronlashdan buyon `docs-sync-strict`
  topshirigʻida bloklovchi: asosiy hujjatni tahrirlang → `npm run i18n:run -- --files=<doc>` (boʻlim darajasida, kam xarajatli).

**Bazaga emas, farqqa asoslangan.** U birlashtirish bazasidagi `en.json` faylini ishchi daraxt bilan
solishtiradi; inglizcha qiymati oʻzgargan har bir kalit uchun oʻzgartirilmagan tarjimani saqlab turgan
har qanday lokal eskirgan hisoblanadi. Bu ataylab **oldindan mavjud qarzdorlikni muzlatadi** — farq
uzoq vaqtdan beri mavjud tarjima qaysi eski inglizcha matndan olinganini koʻrsata olmaydi, shuning uchun darvoza
faqat joriy oʻzgarish tegadigan qismlarni baholaydi. Muqobil variant (har bir kalit uchun xesh bazasi) taxminan
600 KB hajmdagi yaratiluvchi faylni talab qiladi, bu mavjud eng katta bazadan 3 baravar katta va har bir i18n PRda oʻzgaradi.

Talabni qondirishning ikki usuli mavjud:

1. taʼsirlangan tarjimalarni yangilang yoki
2. ularni `__MISSING__:<new english>` qiymatiga oʻrnating — shunda bajarilish muhiti tuzatilgan inglizcha matnni taqdim etadi
   (`src/i18n/request.ts::deepMergeFallback`, #7258) va kalit tarjima navbatiga qoʻshiladi.

Agar satrning **maʼnosi** oʻzgargan boʻlsa, **kalit nomini oʻzgartirish** afzal: yangi kalit eskirgan
tarjimani meros qilib olmaydi. #8463 aynan shu namunadan foydalangan.

```bash
npm run i18n:check-value-drift          # qatʼiy (CI ishga tushiradigan variant)
npm run i18n:check-value-drift:warn     # faqat hisobot
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Bazaviy katalogni oʻqib boʻlmaganda (bazaviy refsiz sayoz
klon) `SKIP reason=base-unresolved` bilan 0 kodida yakunlanadi; bu `check-openapi-breaking` xatti-harakatiga mos keladi.

### Topshiriq: `i18n`

Toʻliq i18n tekshiruv matritsasi (har bir lokal uchun bittadan topshiriq). Butun topshiriq tavsiyaviy hisoblanadi.

| Skript                          | Tekshiradi                             | Bloklovchi                                                   |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Har bir lokal uchun tarjima toʻliqligi | **Tavsiyaviy** (butun topshiriqda `continue-on-error: true`) |

### Topshiriq: `pr-test-policy`

Faqat pull requestlarda ishga tushadi.

| Skript                 | Tekshiradi                                                                                                                                                       | Bloklovchi |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` yoki `bin/` ichidagi ishlab chiqarish kodini oʻzgartiruvchi PRlar testlarni qoʻshishi yoki yangilashi kerak (Qatʼiy qoida №8)   | Ha         |
| `check:test-masking`   | Oʻzgartirilgan test fayllari tasdiqlar umumiy sonini kamaytirmasligini yoki `assert.ok(true)` tavtologiyalarini qoʻshmasligini                                   | Ha         |
| `check:pr-evidence`    | PR matnida oʻzgarish uchun test/VPS dalillari keltirilganini (PR matnini grep orqali tekshirib, Qatʼiy qoida №18ni mexanizatsiyalaydi — moʻrt, Backlogga qarang) | Ha         |

### Topshiriq: `test-vitest`

`build`dan keyin ishga tushadi. Xatolik yuz bersa, birlashtirishni bloklaydi.

| Toʻplam          | Tekshiradi                                                                | Bloklovchi                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 ta vosita), autoCombo, kesh — vitest ishga tushiruvchisi | Ha                                                                                                                                             |
| `test:vitest:ui` | UI komponent testlari — vitest ishga tushiruvchisi                        | **Bloklovchi** — avvaldan mavjud xatoliklar `vitest.config.ts` faylida aniq istisno qilingan; yangi xatoliklar vazifani muvaffaqiyatsiz qiladi |

### Tungi ish jarayonlari (rejalashtirilgan, tavsiyaviy)

Bular cron jadvali asosida (va `workflow_dispatch` orqali) ishga tushadi, PRlarda esa hech qachon ishga tushmaydi. Ularning barchasi tavsiyaviy.

| Ish jarayoni           | Tekshiradi                                                                                                                                                                                                    | Bloklovchi     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | tasodifiy boshlangʻich qiymat va koʻp sonli ishga tushirishlar bilan fast-check xususiyat testlari                                                                                                            | **Tavsiyaviy** |
| `nightly-resilience`   | xotira uyumi oʻsishi nazorati, xaosli nosozlik kiritish, k6 yuklama/uzoq muddatli yuklama sinovi                                                                                                              | **Tavsiyaviy** |
| `nightly-llm-security` | promptfoo injeksiyadan himoyasi (bloklash rejimi) + garak tekshiruvlari (provayder siri boʻlmasa oʻtkazib yuboriladi)                                                                                         | **Tavsiyaviy** |
| `nightly-schemathesis` | `docs/openapi.yaml` yordamida ishlayotgan OmniRouteʼga qarshi OpenAPI shartnomasini fuzzing qilish (schemathesis) — spetsifikatsiya buzilishlari / qayta ishlanmagan 500 xatolarini aniqlaydi (8-bosqich B.4) | **Tavsiyaviy** |
| `nightly-mutation`     | tezkor modul testlari yoʻnalishi boʻyicha Stryker mutatsion testlash bahosi — omon qolgan mutantlar zaif tasdiqlarni aniqlaydi                                                                                | **Tavsiyaviy** |
| `nightly-compat`       | qoʻllab-quvvatlanadigan `engines.node` diapazonlari boʻyicha Node dvigateli moslik matritsasi                                                                                                                 | **Tavsiyaviy** |

Unumdorlikning asosiy koʻrsatkichlari (xotira uyumi, TTFB, qurish vaqti) qayd etiladi, ammo ular boʻyicha cheklov qoʻyilmaydi: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) fayliga qarang (`npm run perf:lts-baseline`).

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

## Ruxsat berilganlar roʻyxati siyosati

Oldindan mavjud buzilishlarda muvaffaqiyatsiz tugamasligi kerak boʻlgan har bir nazorat muzlatilgan ruxsat berilganlar roʻyxatidan foydalanadi
(masalan, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Siyosat quyidagicha:

**Asosiy sababni tuzating; ruxsat berilganlar roʻyxatidan faqat buzilish oldindan mavjud boʻlsa va
uni ayni PR doirasida tuzatib boʻlmasa foydalaning.**

Ruxsat berilganlar roʻyxatiga yozuv qoʻshganda:

1. Asoslantiruvchi izoh kiriting.
2. Kuzatuv muammosiga havola bering (masalan, `// #3498 — Phase 2 feature, not yet implemented`).
3. Buzilishni tuzatadigan ayni PR doirasida yozuvni olib tashlang — endi faol buzilishni
   yashirmaydigan eskirgan yozuvning oʻzi nuqson hisoblanadi (6A.3 eskirgan majburlash mexanizmi
   joriy qilingach, yetim qolgan ruxsat berilganlar roʻyxati yozuvi nazoratning muvaffaqiyatsiz tugashiga sabab boʻladi).

Testlarni tezroq oʻtkazish uchun ruxsat berilganlar roʻyxatiga yozuvlar qoʻshmang. Ruxsat berilganlar
roʻyxati kengayib borayotgan paytdagi yashil nazorat sifat haqida yolgʻon tasavvur beradi.

### PRʼingizda nazorat muvaffaqiyatsiz tugaganda

1. **Nazorat chiqishini diqqat bilan oʻqing** — unda aynan qaysi fayl yoki belgi qoidani buzgani
   koʻrsatiladi.
2. **Buzilishni tuzating** — aksariyat nazoratlar deterministik fayl tizimi tekshiruvlari boʻlib,
   kod toʻgʻrilanishi bilan muvaffaqiyatli oʻtadi.
3. **Agar buzilish oldindan mavjud boʻlsa** (yaʼni, uni siz kiritmagansiz, ammo nazorat endi
   uni qamrab olayotgan boʻlsa): asoslantiruvchi izoh va kuzatuv muammosi bilan ruxsat berilganlar roʻyxatiga yozuv qoʻshing.
4. **Agar nazorat ratchet boʻlsa** (qamrov, ESLint ogohlantirishlari, takrorlanish, murakkablik):
   oʻzgartirishingiz koʻrsatkichni yomonlashtirgan. Asosiy muammoni tuzating yoki (kamdan-kam hollarda),
   agar oʻzgartirish qasddan qilingan va koʻrsatkichning yomonlashishi maqbul boʻlsa,
   `npm run quality:ratchet -- --update` buyrugʻini ishga tushiring — ammo sababini PR tavsifida hujjatlashtiring.
5. **Maslahat beruvchi nazoratlar** (`continue-on-error: true`) faqat axborot uchun moʻljallangan —
   ular birlashtirishni bloklamaydi, ammo CI xulosasida koʻrinadi. Shunga qaramay, ularni tuzating.

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

## Ratsionalizatsiya bo‘yicha bajarilmagan ishlar (ROI ko‘rib chiqishi — 9-bosqich, 3-to‘lqin)

Ushbu inventar 2026-06-17 sanasida `ci.yml` bilan muvofiqlashtirildi (oldingi versiyada
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` kiritilmagan edi). Muvofiqlashtirilgan to‘plamning ROI ko‘rib chiqilishi
quyidagi ratsionalizatsiya nomzodlarini aniqladi. **Birlashtirishlar CI’dagi mexanik
o‘zgarishlardir; almashtirishlar/olib tashlashlar esa operator ixtiyoridagi siyosiy qarorlardir.** Quyidagilarning hech biri
hali qo‘llanilmagan.

**Yuqorida hujjatlashtirilmagan yana bir qism** (tavsiya xususiyatida, signal darajasi past): `docs-lint` vazifasi
(markdownlint + Vale, butun vazifa uchun `continue-on-error`) va mustaqil skaner ish jarayonlari
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json` ichida mavjud, ammo `ci.yml` ichidagi bloklovchi ratchet’ga ulanmagan — metrika
hozirda yetim holatda.

### Birlashtirish / takrorlarni yo‘qotish (mexanik, xavfi pastroq)

Har bir nomzod 2026-06-17 sanasidagi amaldagi darvoza holatiga nisbatan tekshirildi (ishon, ammo tekshir);
bir nechta “aniq” birlashtirishlar yashirin qarzdorlikni berkitishi aniqlandi va ular **to‘g‘ridan-to‘g‘ri xavfsiz almashtirishlar emas**.

- **`check:docs-sync` ikki marta ishga tushadi** — `lint` vazifasida mustaqil ravishda, shuningdek `check:docs-all` (`docs-sync-strict`) ichida va husky pre-commit hook’ida. ✅ **BAJARILDI** — mustaqil `lint` chaqiruvi olib tashlandi.
- **CVE skanerlash** — ❌ **Toza birlashtirish EMAS.** `audit:deps` barcha beshta lockfile bo‘yicha kritik tavsiyalarni va to‘liq bajarilmagan auditlarni bloklaydi, joriy siyosatga ko‘ra yuqori darajadagi tavsiyalarni esa ogohlantirish sifatida bildiradi; `check:vuln-ratchet` (osv) esa faqat repozitoriyga kiritilgan boshlang‘ich ko‘rsatkichga nisbatan _regressiya_ yuz bersa muvaffaqiyatsiz tugaydi va talab qilinganida mavjud bo‘lmagan o‘lchovlarni rad etadi. Semantikasi turlicha — `audit:deps` olib tashlansa, mutlaq kritik darvoza va mustaqil paket auditi dalolatnomalari yo‘qoladi. Ikkalasini ham saqlang.
- **Sikllarni aniqlash** — ✅ **BAJARILDI** (#15159 G-01/G-02). Bu yerdagi eski matn `check:cycles`’ni “yashil, saralangan” darvoza deb atagan va `check:circular-deps` (dpdm) 91 ta sikl haqida xabar bergani sababli uni bloklovchi holatda saqlashni asoslagan. Bu yashil holat **soxta yashil** edi: `check:cycles` 5 ta quyi katalogni (450 ta fayl) skanerlagan, faqat statik `import|export … from` bilan moslikni tekshirgan hamda har bir `@/` va `@omniroute/open-sse/` spetsifikatorini tashlab yuborgan, shu sababli repozitoriyda ustun bo‘lgan dinamik import + alias sikllarini ko‘ra olmagan. Tuzatildi: darvoza endi `src` + `open-sse` bo‘ylab yuradi (5023 ta fayl), spetsifikatorlarni TypeScript AST’dan yig‘adi (shu sababli `import("…")` hisobga olinadi, tur pozitsiyasidagi `typeof import("…")` esa olinmaydi) va tsconfig `paths`’ni aniqlaydi. U 0 emas, **14** ta sikl topadi. Oldindan mavjud 14 ta siklni darvoza PR’i ichida tuzatib bo‘lmagani uchun `check:cycles` endi **ratchet** (`--ratchet`, `quality-baseline.json` ichida `metrics.cycles.value = 14` yuqori chegarasi, `direction: down`) — u har qanday _regressiya_’ni bloklaydi va miqdor faqat kamayishi mumkin. CI `npm run check:cycles:ratchet`’ni ishga tushiradi. Kamaytirib borish ishlari **A-01** bilan birga olib boriladi. `check:circular-deps` (dpdm) kengroq ikkinchi fikr sifatida tavsiya xususiyatida qoladi.
- **Murakkablik** — ✅ **BAJARILDI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): bitta ESLint yurishi, siklomatik+max-lines va kognitiv boshlang‘ich ko‘rsatkichlar mustaqil qolishi uchun hisoblash ruleId bo‘yicha amalga oshiriladi; alohida `check:complexity` / `check:cognitive-complexity` lokal `--update` uchun saqlanadi.
- **`/api` anti-gallyutsinatsiyasi** — ✅ **BAJARILDI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api` uchun bitta FS inventarizatsiyasi, openapi-routes + docs-symbols hali ham mustaqil ravishda hisobot beradi; alohida tekshiruvlar lokal ishga tushirishlar uchun saqlanadi.
- **`check:node-runtime` 11 ta vazifada ishga tushadi** — ⚠️ **ROI past.** Har biri alohida runner va tekshiruv <1s davom etadi; arzon, har bir vazifa uchun alohida himoyani yo‘qotish evaziga jami tejash ~10s. Bunday o‘zgarishlarga arzimaydi.
- **CI lint’dagi `typecheck:noimplicit:core`** — ✅ **lint vazifasidan olib tashlandi** (avval tavsiya xususiyatidagi `continue-on-error` edi); bloklovchi tur yuzasi — `typecheck:core` + `check:type-coverage`. Lokal skript saqlandi.

### Almashtirish / qaror qilish (operator siyosati)

- `check:openapi-security-tiers` (tavsiya xususiyatida) — ❌ **To‘g‘ridan-to‘g‘ri almashtirib bo‘lmaydi.** U 0 kodi bilan tugaydi, biroq `LOCAL_ONLY_API_PREFIXES` ostidagi bir nechta `traffic-inspector` yo‘nalishlarida `x-loopback-only: true` annotatsiyasi yo‘qligi haqida ogohlantiradi. Uni majburiy qilish uchun avval `openapi.yaml` fayliga ushbu annotatsiyalarni qo‘shish zarur.
- `typecheck:noimplicit:core` (tavsiya xususiyatida) — asosan bloklovchi `check:type-coverage` ratchet’i bilan qamrab olingan. Uni ratchet’ga almashtiring yoki takroriy ikkinchi `tsc` yurishini olib tashlang.
- `test:vitest:ui` (endi **bloklovchi**) — oldindan mavjud muvaffaqiyatsizliklar `vitest.config.ts` ichida `// #8618` kuzatuv izohlari bilan aniq istisno qilingan; yangi muvaffaqiyatsizliklar vazifani muvaffaqiyatsiz yakunlaydi.
- `check:secrets` (gitleaks, bloklovchi ratchet) — joriy yuqori chegara `quality-baseline.json` ichidagi `metrics.secretFindings`. Har qanday istisno asoslangan `.gitleaks.toml` yozuvini talab qiladi; o‘lchov mavjud bo‘lmasa, natija INCOMPLETE hisoblanadi. Skanerlash GitHub’ning mahalliy maxfiy ma’lumotlarni skanerlash funksiyasi va `check:public-creds`’ni to‘ldiradi.
- `check:pr-evidence` (bloklovchi, PR tanasidagi nasriy matnni grep orqali tekshiradi) — noto‘g‘ri ijobiy natija xavfi yuqori; olib tashlansa, Hard Rule #18 talabi ijrosi zaiflashadi, shuning uchun bu haqiqiy siyosiy qarordir.
- `semgrep` (mustaqil, tavsiya xususiyatida) — OWASP oilalari bo‘yicha CodeQL bilan ustma-ust tushadi; uning boshlang‘ich ko‘rsatkichini ratchet’ga ulang yoki olib tashlang.

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
