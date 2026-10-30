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

## Geytlar inventari va bajarish profillari

### Nomzodni qabul qilish

CI va Quality Gates ish jarayonlarining har biri barqaror hukm chiqaradi: `Gate / CI` va
`Gate / Quality`. Ularning versiyalangan qabul qilish siyosati barcha yuqori oqimdagi vazifalarni
majburiy yoki tavsiyaviy sifatida sanab oʻtadi. Qoʻllaniladigan majburiy vazifa muvaffaqiyatli
yakunlanishi kerak: mavjud boʻlmagan, bekor qilingan, oʻtkazib yuborilgan, kutilayotgan va nomaʼlum
natijalar PASS holatini tasdiqlay olmaydi. Faqat hujjatlarga yoki faqat katalogga oid toʻgʻri
tasnif kod yoʻnalishini qoʻllanilmaydigan qilishi mumkin; qoralama PR qabul qilinadigan nomzod
emas. `hotfix` yorligʻi dalillar talabini bekor qilmaydi.

Har ikkala ish jarayoni main/release shoxlariga yuborilgan PRlarni, `main` shoxiga pushlarni, qoʻlda
ishga tushirishni va merge-group hodisalarini qamrab oladi. Push, dispatch va merge-group toʻliq
tanlovni bajaradi. `release/**` shoxlariga pushlar ularni ishga tushirmaydi (2026-10-18): har bir
oʻzgarish matritsani oʻz PRida allaqachon bajargan boʻladi, birlashtirilgan kombinatsiya esa
Release-Green vazifasidir (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forklar va merge-grouplar,
aks holda self-hosted runnerlarni tanlaydigan vazifalar uchun hosted runnerlardan foydalanadi;
joriy etishdan oldin yetarli hosted sigʻim mavjudligi tekshirilishi kerak.

Har bir JSON kvitansiyasi checkout qilingan SHA, ish jarayoni bajarilishi va urinishni aniqlaydi.
CLI checkout/hodisa SHA mos kelmasligini rad etadi. Ish jarayoni testlari siyosat aʼzoligini hukm
vazifasining `needs` roʻyxatiga bogʻlaydi, shuning uchun yangi yoki olib tashlangan yoʻnalish
sezdirmasdan yoʻqolib qolmaydi. Tasdiq qaydlari nashr qilish, joylashtirish yoki mavjud tavsiya beruvchi skanerning ichki tuzilishini emas, faqat o‘z ish jarayonini qamrab oladi. Tegishli tekshiruvlarni tarmoq qoidalarida majburiy qilish alohida ma’muriy o‘zgarishdir; ularning vazifalarini belgilashning o‘zi tarmoqni himoya qilmaydi.

`API Route Typecheck` — har ikkala jamlangan xulosadan ham, mahalliy to‘liq kuzatuvchining statik profilidan ham tashqarida bo‘lgan mustaqil ish jarayoni tekshiruvi. Aniq nomzod uchun uning natijasini alohida tekshiring. `.github/workflows/api-route-typecheck.yml` `main` yoki `release/**` tarmoqlariga yo‘naltirilgan PR’larda, ushbu tarmoq oilalaridan biriga push qilinganda va qo‘lda ishga tushirilganda bajariladi. Unda yo‘l filtri yo‘q. PR asosiy tarmog‘ini qayta yo‘naltirish yangi tekshiruvni talab qiladi; tavsif/sarlavha tahrirlari faqat kuzatuv uchun mo‘ljallangan `Admission not requested / API Route Typecheck` nomidan foydalanadi va qabul tekshiruvining o‘rnini bosa olmaydi. Ish jarayonida birlashtirish guruhi uchun trigger e’lon qilinmagan. Ushbu tekshiruvni talab qiladigan har qanday birlashtirish navbatini joriy etishdan oldin uning mazkur hodisa uchun bajarilishi ta’minlanishi kerak.

### UI bajarish sigʻimi

CI toʻliq UI inventarini toʻrtta `test-vitest` matritsa shardi sifatida bajaradi; har birida koʻpi
bilan ikkita worker va mavjud 15 daqiqalik vazifa muddati mavjud. Birinchi shard, shuningdek,
MCP/autoCombo Vitest toʻplamini ham bajaradi. Majburiy vazifa natijasi matritsaning har bir qismini
qamrab oladi; bitta shardning muvaffaqiyatsizligi yoki bekor qilinishi nomzod qabul qilinganini
tasdiqlay olmaydi.

Tungi kuzatuvchi har bir UI shardi uchun alohida, aynan nomzodga tegishli kvitansiyani, jumladan
birinchi kvitansiyadagi MCP bajarilishini saqlab qoladi. Toʻrtta kvitansiya, loglar va mos keluvchi
bajarish identifikatorlarining barchasi talab qilinadi. Mahalliy `npm run test:vitest:ui` hali ham
toʻliq toʻplamni tanlaydi; bitta `--shard` bajarilishi faqat qisman dalildir.

### Unit coverage maʼlumotlarini yigʻish

Oʻn ikkita unit shardi mavjud test bajarilishi davomida V8 coverage maʼlumotlarini yigʻadi.
Muvaffaqiyatli shard oraliq Istanbul hisobotini yaratmasdan asl fayllarni siqish uchun
`scripts/ci/compact-v8-coverage.mjs` skriptini bajaradi. Yakuniy Coverage vazifasi barcha oʻn ikkita
manifestni nomzod SHA, runtime, manba ildizi va maʼlumotlar xeshlariga nisbatan tekshiradi, soʻng
c8 reporterlarini va mavjud coverage chegaralarini ishga tushiradi. Kirish maʼlumotlari c8 global
fayl nomlari tartibini saqlab qoladi; har bir shard boʻyicha oldindan birlashtirish aralash
funksiya/blok coverage uchun xavfsiz emas. Mavjud boʻlmagan, notoʻgʻri shakllangan yoki mos
kelmaydigan shardlar qabul qilishni muvaffaqiyatsiz qiladi. Muvaffaqiyatsiz test shardlari xom
diagnostik coverage maʼlumotlarini alohida saqlab qoladi; ular yakuniy birlashtirishga kira olmaydi.

### Unit bajarilish jarayoni qaydlari

Umumiy `test:unit:ci:shard` buyrugʻi `primary`, `dashboard` va `serial`
bosqichlarini `scripts/ci/unit-progress-reporter.mjs` orqali qayd etadi. Odatiy test hisoboti
mavjudligicha qoladi. Faqat metamaʼlumotlardan iborat alohida qayd har bir faylning ishga tushishi va yakunlanishini
qayd etadi, 30 soniyalik yurak urishi signali esa hali ham faol fayllar va ularning oʻtgan vaqtini koʻrsatadi. Unda
faqat ruxsat etilgan bajarilish metamaʼlumotlari qayd etiladi; test tavsiflari, chiqish maʼlumotlari, xatolik tafsilotlari va toʻliq
muhit serializatsiya qilinmaydi.

CI va Quality JSONL fayllarini `unit-progress-ci-<run>-<attempt>-<shard>` va
`unit-progress-quality-<run>-<attempt>-<shard>` sifatida saqlaydi. Vazifa vaqtining tugashi keyingi yuklashga toʻsqinlik qilishi mumkin;
allaqachon yuborilgan yurak urishi signallari diagnostik dalil boʻlib qoladi. Yurak urishi signallarining yoʻqligi
bloklangan yoki toʻxtatilgan runner jarayonini ham anglatishi mumkin. Bu qaydlar mavjud test tanlovi,
parallellik, muddatlar va chiqish holatini saqlab qoladi; ular nomzodni qabul qilish haqidagi hukmlar emas.

### Qabul natijalarini birlashtiruvchi moduldagi saqlangan dalillar

`scripts/quality/validate-release-acceptance.mjs` taqdim etilgan reja va uning manifestlarini birlashtiradi; reja butun reliz jarayonini qamrab olishini tasdiqlamaydi. Reja `VERIFIED` boʻlsa ham, uning hisobotlari aniq `releaseAcceptance: false` belgilaydi. `release-acceptance.yml` ish oqimi hanuz haqiqiy build, package, boot yoki promotion qaydlari emas, shadow sinov maʼlumotlaridan foydalanadi.

Saqlangan dalillarni tekshirish uchun CLI `--evidence-root` talab qiladi. Fayllar `<evidence-root>/<artifact_id>/<member>` yoʻlidan topiladi va SHA-256 xeshi hisoblanadi. Dalilsiz PASS yozuvi, yoʻqolgan yoki oʻzgargan fayl, xavfsiz boʻlmagan yoʻl yoki ramziy havola tasdiqlashga toʻsqinlik qiladi. Yoʻqolgan fayllar muvaffaqiyatli bajarilishlarning boʻsh jurnallariga teng emas. Mavjud SHA/run/attempt tekshiruvlari mustaqil qoladi: mos baytlar eskirgan qaydni yaroqli qila olmaydi. Fayl yaxlitligi bajarilishning haqiqiyligini yoki artefakt promotion jarayonini isbotlamaydi.

### Statik skanerlash inventari

Versiyalangan npm-alias inventari va statik skanerlash aʼzoligi
`config/quality/gate-manifest.json` faylida joylashgan. Skript nomlari va aniq buyruqlarni
`package.json` bilan solishtirib tekshirish uchun `npm run check:gate-manifest` buyrugʻini bajaring;
qoʻshishlar, olib tashlashlar va buyruqdagi ogʻishlar mahalliy hookni ham, CI ichidagi oʻzgarishlarni
tasniflash vazifalarini ham muvaffaqiyatsiz qiladi. Alias ish jarayoni vazifasi, matritsa nusxasi
yoki test holati emas: bu miqdorlar oʻzaro almashtiriladigan qilib koʻrsatilmasligi kerak.

Tanlangan aliaslarni bajarmasdan tekshirish uchun `npm run quality:scan -- --list` yoki
`npm run quality:scan:fast -- --list` dan foydalaning. Runner npm kirish nuqtasini ishga tushiradi,
shu sababli uning runtime muhiti (sozlangan joylarda Bun ham) saqlanadi. Manifest ushbu profillardan
tashqaridagi aliaslarni alohida chaqiriladigan sifatida qayd etadi va read-only skanerlash
profillarida texnik xizmat buyruqlari taqiqlanadi.

Bu profillar faqat statik skanerlashni qamrab oladi. Ular mahsulot testlari, coverage, paketlash,
tashqi tekshiruvlar yoki nomzodning reliz uchun toʻliq qabul qilinishini tasdiqlamaydi. Ish jarayoni
orqali qabul qilish bogʻlangan `config/quality/admission-policy.json` va
`scripts/quality/admission-verdict.mjs` dan foydalanadi. Release-observer profillari alohida
qoladi; ularning qoʻllaniladigan tekshiruvlari va kvitansiyalarini mustaqil tekshiring. Toʻliq
kuzatuvchining statik buyruqlari `config/quality/release-green-static-profile.json` faylida eʼlon
qilingan boʻlib, ularga `audit:deps`, mutatsiya testini tanlash va tarjima tekshiruvlari kiradi.
Loader npm buyruqlarini package.json hamda modellashtirilgan CI/Quality deklaratsiyalariga nisbatan
tekshiradi; u shell tokenlarini argument sifatida bajarish oʻrniga ogʻishlarni rad etadi. Majburiy
skanerning SKIP/INCOMPLETE chiqishi PASS holatini tasdiqlay olmaydi. Profil oʻzining tashqi
istisnolarini qayd etadi va hosted coverage, test matritsalari, paket yoki joylashtirish dalillarini
almashtirmaydi. Quyidagi matnli inventar maʼlumotnoma boʻlib, geyt haqiqatda bajarilganining isboti
emas.

Skriptlar `scripts/check/` (siyosat geytlari) va `scripts/quality/` (ratchet mexanizmi) ostida
joylashgan. CI uchun haqiqatning yagona manbasi `.github/workflows/ci.yml` hisoblanadi.

### E’lon qilingan baza hujjatlari holati

`.github/workflows/i18n-base-health.yml` tanlangan `main` va `release/v*` tarmoqlariga yuborishlardan so‘ng hamda qo‘lda ishga tushirilganda hujjatlar holatini kuzatadi. Uning filtrlari hujjatlarni, ildiz katalogdagi Markdown fayllarini, `llm.txt` faylini, tarjima holati/konfiguratsiyasini va tegishli i18n vositalarini qamrab oladi. Yagona `Published base documentation health` vazifasi boshqariladigan Ubuntu muhitidan va besh daqiqalik vaqt chegarasidan foydalanadi. U faqat o‘qish rejimida tekshiradi va bog‘liqliklarni o‘rnatmasdan, tarjima qilmasdan yoki holatni qabul qilmasdan diagnostika qaydnomasini yozadi.

`scripts/i18n/check-base-health.mjs` manba xeshi, yetishmayotgan maqsad fayli, maqsad xeshi, eskirgan tarjima va bo‘lim keshi bilan bog‘liq nomuvofiqliklar bo‘lmasligini talab qiladi. Shuningdek, u joriy asosiy hujjat/lokal qamrovini va uning qayd etilgan kelib chiqishini tekshiradi. Yaroqsiz kontekst, to‘liq bo‘lmagan qamrov yoki tekshiruvchining ish jarayoni uzilishi `INCOMPLETE` natijasini beradi; tasdiqlangan og‘ish esa `FAIL` natijasini beradi. Har ikkisi ham muvaffaqiyatsiz chiqish holatini qaytaradi. Qaydnoma checkout SHA qiymati, ish jarayoni, ishga tushirish va urinish bilan bog‘lanadi hamda `i18n-base-health-<sha>-<run>-<attempt>` nomi ostida saqlanadi.

Bu e’lon qilingan bazaning mustaqil kuzatuvidir. U PR yoki birlashtirish guruhi hodisasini, majburiy PR tekshiruvini, npm taxallusini yoki statik tekshiruv profili a’zosini qo‘shmaydi. Mavjud differensial PR siyosati va asosiy tekshiruvchining tavsiyaviy tasniflari alohida qoladi. Muvaffaqiyatli yuklash muvaffaqiyatsiz holat natijasini PASS holatiga aylantira olmaydi.

### Release PR tezkor yoʻli (`quality.yml`)

`.github/workflows/quality.yml` main/release PRlari, `main` shoxiga pushlar, dispatch va merge
grouplarda CI imkoniyatlarini toʻldiradi. PRlar yoʻl boʻyicha filtrlangan tezkor tekshiruvlardan
foydalanadi. Doimiy ravishda oʻchirib qoʻyilgan takroriy build olib tashlandi; haqiqiy
build/package/boot tekshiruvlari CI ichida qoladi.

| Vazifa                                           | Qamrov doirasi                                                                                                                                                                                                                                       | Bloklovchi               |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `Docs Gates (fast-path)`                         | Hujjatlar/kod PRlari; API hujjatlari havolalari va barcha hujjatlar                                                                                                                                                                                  | Ha                       |
| `Fast Quality Gates`                             | Kod PRlari; statik tekshiruvlar, tur tekshiruvi, boshqaruv paneli tur tekshiruvi, taʼsirlangan modul testlari                                                                                                                                        | Ha                       |
| `Forgotten sibling tests`                        | Kod PRlari; o‘zgartirilgan modullardan statik isteʼmolchilar va ehtimoliy turdosh testlargacha kuzatuv; barrel va dinamik import yo‘llari ruxsat etilganlar ro‘yxatidagi istisnolarga havolalar bilan maslahat diagnostikasi sifatida xabar qilinadi | **Maslahat xarakterida** |
| `Vitest (fast-path)`                             | Kod PRlari; tezkor vitest testlar to‘plami                                                                                                                                                                                                           | Ha                       |
| `Unit Tests fast-path`                           | Kod PRlari; 4 segmentli modul testlari to‘plami                                                                                                                                                                                                      | Ha                       |
| `No new ESLint warnings`                         | Kod PRlari; bostirishlarni hisobga oluvchi lint himoyasi                                                                                                                                                                                             | Ha, forklarda ham        |
| `Merge integrity (changelog + generated skills)` | Qoralama bo‘lmagan PRlar; o‘zgarishlar jurnali va yaratilgan ko‘nikmalarni sinxronlash                                                                                                                                                               | Ha, forklarda ham        |

#### Unutilgan turdosh testlar hisoboti

`npm run check:forgotten-sibling-tests` test taʼsiri xaritasi asosidagi import aniqlagichidan qayta foydalanadi.
Har bir o‘zgartirilgan ishlab chiqarish moduli uchun, ehtimoliy test
pull-request diffida mavjud bo‘lmasa, u deterministik
`changed module/symbol -> static consumer -> candidate sibling test` zanjirlarini xabar qiladi. Markdown xulosasi va JSON natijasi
har qanday bloklovchi joriy etishdan oldingi kalibrlash uchun `forgotten-sibling-tests` ish jarayoni artefakti sifatida saqlanadi.

Barrel qayta eksportlari va dinamik importlar faqat aniqlash diagnostikasidir; ular hech qachon
bloklovchi topilmani yaratmaydi. Ko‘rib chiqilgan istisnolar
`config/quality/forgotten-sibling-allowlist.json` faylida saqlanadi. Har bir yozuv isteʼmolchi va ehtimoliy
testni ko‘rsatishi, aniq asos keltirishi hamda GitHub muammosi yoki pull requestiga havola berishi shart. Noto‘g‘ri tuzilgan yozuvlar
yopiq holatda xatoga olib keladi. Istisnolar o‘chirilgan ehtimoliy testni yoki `.skip`/`.todo` qo‘shadigan diffni yashira olmaydi;
tasdiqlarni zaiflashtirish va boshqa niqoblash holatlari mustaqil ravishda bloklovchi
`check:test-masking` nazoratiga tegishli bo‘lib qoladi.

### Vazifa: `lint`

`main` uchun har bir PRda ishga tushadi. Muvaffaqiyatsiz yakunlansa, birlashtirishni bloklaydi.

| Skript (`npm run ...`)            | Tekshiradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Bloklovchi                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `check:node-runtime`              | Node.js versiyasi qoʻllab-quvvatlanadigan diapazonda ekanini                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ha                                         |
| `check:test-tla-order`            | `tests/unit` ichidagi hech bir `node:test` fayli testni roʻyxatdan oʻtkazmasligi, yuqori darajadagi `await`ga yetib bormasligi va undan keyin yana testlarni roʻyxatdan oʻtkazmasligini (#18045; ratchet: `test-tla-order-allowlist.json` faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                         |
| `check:cycles`                    | Butun `src/` + `open-sse/` boʻylab siklik importlarni (AST asosida, tsconfig `paths` yoʻllari aniqlangan holda). Har qanday sikl mavjud boʻlsa, oddiy rejim 1 kodi bilan yakunlanadi (#15281 dan beri yopiq holda rad etish) va SCClarni roʻyxatlaydi. `check:cycles:ratchet` (CI ishga tushiradigan tekshiruv) son `quality-baseline.json` faylidagi `metrics.cycles` yuqori chegarasidan oshganda bloklaydi — hozirda 14, `direction: down`, shuning uchun u faqat kamayishi mumkin (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ha (ratchet)                               |
| `check:boundary`                  | `open-sse → src` bogʻliqligini: mexanizmdan ilovaga yoʻnaltirilgan yagona fayldan-faylga importlarni (`scripts/quality/measure-boundary.mjs`; qirralar roʻyxati v4 yadrosi/modulga ajratish tuzatishlari uchun bajarilmagan ishlar roʻyxatidir). Oddiy rejim = maslahat beruvchi hisobot (`quality:boundary` bilan bir xil). `check:boundary:ratchet` (CI ishga tushiradigan, shuningdek, `quality.yml` tezkor tekshiruvlar ratchet sikliga kiritilgan tekshiruv) son `quality-baseline.json` faylidagi `metrics.boundaryOpenSseToSrc` yuqori chegarasidan oshganda bloklaydi — boshlangʻich qiymat sifatida oʻlchangan 771 belgilangan, `direction: down`; `--update` uni faqat pasaytiradi; PRlarda bazaga nisbatan ishlaydi (`--base-ref`, quyiga qarang)                                                                                                                                                                                                                                                                                                                                                             | Ha (ratchet)                               |
| `check:route-validation:t06`      | Barcha routelarda Zod sxemalari mavjud (6-daraja siyosati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ha                                         |
| `check:any-budget:t11`            | `@ts-expect-error // any` soni belgilangan limitdan oshmaydi (11-daraja nazorati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                         |
| `check:provider-consistency`      | `providers.ts` ichidagi har bir provayderning `providerRegistry.ts` ichida mos yozuvi mavjud (va aksincha, ruxsat etilganlar roʻyxati doirasida)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ha                                         |
| `check:model-lifecycle`           | Qoʻlda yuritiladigan uchta marshrutlash jadvali repozitoriyga kiritilgan hayot sikli surati (#11503) bilan muvofiq qoladi: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` marshrutlay oladigan, foydalanishdan chiqarilgan hech bir identifikatorga ball bermaydi; har bir `BUILT_IN_ALIASES` maqsadi `REGISTRY` ichida mavjud va foydalanishdan chiqarilgan identifikatorlar suratida yoʻq; `REGISTRY` ichida hanuz mavjud boʻlgan har bir foydalanishdan chiqarilgan identifikator boshqa manzilga yoʻnaltirilgan yoki `allowedRetiredInCatalog` ichida koʻrsatilgan; shuningdek, hech bir `DEFAULT_DEGRADATION_MAP` manbasi yoki maqsadi ushbu suratda foydalanishdan chiqarilgan sifatida koʻrsatilmagan. Bu modelga ayni paytda faol yuqori oqim xizmati xizmat koʻrsatayotganini isbotlamaydi. Oflayn — `config/quality/model-lifecycle.json` bilan taqqoslaydi; u `npm run quality:refresh-model-lifecycle` yordamida qoʻlda yangilanadi (tarmoq talab etiladi; CI tizimiga ulanmagan). `allowedRetiredInCatalog` — bosqichma-bosqich qisqartirish mexanizmi: yozuvni faqat kuzatuv muammosi bilan birga qoʻshing. | Ha                                         |
| `check:fetch-targets`             | Mijoz tomonidagi `src/` ichidagi har bir `fetch("/api/...")` haqiqiy `route.ts` fayliga yoʻnaltiriladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:deps`                      | Repozitoriydagi har bir `package.json` boʻylab `npm install` orqali oʻrnatiladigan barcha bogʻliqliklar `dependency-allowlist.json` ichida mavjud; versiyasi aniq belgilanmagan yoki slopsquatting xavfiga ega yangi paketlar belgilanadi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                         |
| `audit:deps`                      | Barcha beshta mustaqil lockfile (ildiz, Electron, OpenCode plaginlari v1/v2 va provider) uchun npm auditi. Kritik ogohlantirishlar bloklaydi; yuqori darajadagi ogohlantirishlar ko‘rinadigan ogohlantirish sifatida qoladi. Yetishmayotgan/muvaffaqiyatsiz auditlar INCOMPLETE hisoblanadi va bloklaydi; har bir qamrov uchun lock xeshlari va hisobotlar saqlanadi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                         |
| `check:lockfile`                  | `package-lock.json` yaxlitligi — https reyestri, yaxlitlik xeshlari, host almashtirishlari yo‘q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                         |
| `check:licenses`                  | Ishlab chiqarish bog‘liqliklari uchun SPDX litsenziyalari ruxsat etilgan ro‘yxati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                         |
| `check:tracked-artifacts`         | Build artefaktlari / commit qilingan `node_modules` ramziy havolalari yo‘q (husky pre-commit jarayonida ham ishga tushadi; pre-push ataylab yengil — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                         |
| `check:ai-attribution`            | PR commitlari, sarlavhasi yoki asosiy matnida AI/bot `Co-Authored-By` treyleri yoki AI tomonidan yaratilganlik futeri yo‘q — Qat’iy qoida #16 (`quality.yml` faylidagi PR→`release/**` uchun tezkor tekshiruvlar siklida — hodisa ma’lumotlarini o‘qiydi, PR bo‘lmasa hech qanday amal bajarmaydi — va `ci.yml` lint jarayonidagi PR→`main` uchun faqat PRga tegishli qadam; shuningdek, husky `commit-msg` hook’i; inson hammualliflarga ruxsat beriladi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Har bir Vitest istisnosi kuzatuv muammosini ko‘rsatadi va `config/quality/vitest-exclusions.json` faylida mavjud (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                         |
| `check:file-size`                 | Manba fayllari (`src/`, `open-sse/`, `electron/`, `bin/` ichidagi `.ts`/`.tsx`) `cap` chegarasidan, test fayllari (`*.test.ts(x)`) esa `testCap` chegarasidan oshmaydi; `file-size-baseline.json` ichida muzlatilgan (`frozen` / `testFrozen`) fayllar qayd etilgan hajmidan oshmasligi kerak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ha                                         |
| `check:error-helper`              | Ijrochi/ishlov beruvchilardagi xato javoblari `buildErrorBody()` / `sanitizeErrorMessage()` funksiyalaridan foydalanadi (Qat’iy qoida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ha                                         |
| `check:migration-numbering`       | Migratsiya SQL fayllari ketma-ket raqamlangan, bo‘shliqlar yoki takroriy raqamlar yo‘q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:public-creds`              | `publicCreds.ts` tashqarisida literal OAuth `client_id`/`client_secret` yoki Firebase Web kalitlari yo‘q (Qat’iy qoida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                         |
| `check:db-rules`                  | `src/lib/db/` modullaridan tashqarida to‘g‘ridan-to‘g‘ri SQL yo‘q; `localDb.ts` faylidan barrel-importlar yo‘q (Qat’iy qoidalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                         |
| `check:known-symbols`             | Dispetcherlik jadvallarida ro‘yxatdan o‘tkazilgan provayder ijrochilari, marshrutlash strategiyalari va tarjimonlar diskdagi fayllarga mos keladi — yetim yoki e’lon qilinmagan belgilar yo‘q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ha                                         |
| `check:route-guard-membership`    | Ichki jarayonni ishga tushiradigan har bir marshrut `isLocalOnlyPath()` orqali tasniflanadi (Qatʼiy qoidalar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                         |
| `check:test-discovery`            | Repodagi har bir `*.test.ts` / `*.spec.ts` fayli kamida bitta test ishga tushirgichi tomonidan aniqlanadi (ratchet: `test-discovery-baseline.json` ichidagi yetim fayllar roʻyxati faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                         |
| `check:agent-skills-sync`         | Yaratilgan agent-koʻnikmalari artefaktlari ularning manba katalogiga mos keladi (tafovut yoʻq)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | Provayder logotiplari/aktivlari uchun qayd etilgan kelib chiqish yozuvi mavjud                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | JSON konfiguratsiya fayllari tahlildan muvaffaqiyatli oʻtadi va repo lint qoidalariga mos keladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript xatolarsiz kompilyatsiya qilinadi (faqat tavsiyaviy ogohlantirishlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ha                                         |
| `typecheck:noimplicit:core`       | Qatʼiy `noImplicitAny` — istiqbolga yoʻnaltirilgan; avvaldan mavjud koʻplab chaqiruv joylari hali ham annotatsiyalarni talab qiladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Tavsiyaviy** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` doirasidagi `tsc` (#7033) — `typecheck:core` uchun saralangan 27 faylli ruxsat roʻyxati hech qanday dashboard TSX faylini oʻz ichiga olmaydi, `next build` ham uni hech qachon tur tekshiruvidan oʻtkazmaydi (`next.config.mjs` faylida `ignoreBuildErrors: true` oʻrnatilgan), shu sababli u yerdagi yetim identifikator regressiyalari (#6625/#6909) CI uchun koʻrinmas edi. Har bir fayl/TS kodi boʻyicha muzlatilgan xatolar soni bazaviy koʻrsatkichi (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` bilan bir xil eskirganlikni nazorat qilish qolipi) bilan farqlarni tekshiradi — faqat bazaviy sondan oshgan YANGI xatolar tekshiruvdan oʻta olmaydi; avvaldan mavjud xato tuzatilganda `--update` yordamida bazaviy koʻrsatkichni pasaytiring.                                                                                                                                                                                                                                                                                                            | Ha                                         |

### Vazifa: `quality-gate`

`test-coverage`dan keyin ishga tushadi. Xatolik yuz bersa, birlashtirishni bloklaydi.

| Skript                       | Tekshiradi                                                                                                                                                                                                                                           | Bloklovchi            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `quality:collect`            | `quality-metrics.json` faylini yaratadi (ESLint ogohlantirishlari soni, birlashtirilgan shard hisobotidan qamrov)                                                                                                                                    | Ha (ratchetdan oldin) |
| `quality:ratchet`            | `quality-baseline.json` ichidagi har bir koʻrsatkich regressiyaga uchramaganini tekshiradi (ESLint ogohlantirishlari ≤ bazaviy koʻrsatkich; qamrov ≥ bazaviy koʻrsatkich)                                                                            | Ha                    |
| `check:duplication`          | Kod takrorlanishi (jscpd@4) `quality-baseline.json` ichidagi bazaviy koʻrsatkichdan oshmasligini tekshiradi                                                                                                                                          | Ha                    |
| `check:complexity`           | Fayl darajasidagi siklomatik murakkablik chegaradan oshmasligini tekshiradi (asosiy ESLint `complexity` + `max-lines-per-function`)                                                                                                                  | Ha                    |
| `check:cognitive-complexity` | Kognitiv murakkablik ratcheti (`eslint-plugin-sonarjs`) — alohida ESLint tekshiruvi; CI ikkalasini yagona `check:complexity-ratchets` bosqichi sifatida birlashtirib ishga tushiradi                                                                 | Ha                    |
| `check:dead-code`            | Ishlatilmaydigan eksportlar/fayllar ratcheti (knip) bazaviy koʻrsatkichga nisbatan regressiyaga uchramaganini tekshiradi                                                                                                                             | Ha                    |
| `check:compression-budget`   | Siqish samaradorligi sinovi budjeti — har bir mexanizm uchun token tejashning minimal chegaralari regressiyaga uchramasligi kerak                                                                                                                    | Ha                    |
| `check:type-coverage`        | Turlashtirilgan kod foizi ratcheti (`type-coverage`) regressiyaga uchramaganini tekshiradi; asosan `typecheck:noimplicit:core` vazifasini ham qamrab oladi                                                                                           | Ha                    |
| `check:codeql-ratchet`       | Ochiq CodeQL ogohlantirishlari soni regressiyaga uchramaganini tekshiradi (`gh api` orqali oʻqiydi; tokensiz holatda muammosiz oʻtkazib yuboradi) — yangilash davriyligi va qoʻlda ishga tushirish uchun quyidagi "CodeQL ratcheti" boʻlimiga qarang | Ha                    |

### Vazifa: `quality-extended`

Bu vazifa tegishli nomzodlarni bloklaydi. Toʻplam hajmi, maxfiy maʼlumotlar topilmalari, zaiflik
topilmalari, workflow topilmalari va OpenAPI oʻzgarishlari majburiy ratchetlar yordamida tekshiriladi.
Siklik bogʻliqlik diagnostikasi tavsiyaviyligicha qoladi. Skanerlarni oʻrnatish majburiy:
`scripts/ci/install-quality-scanners.sh` biriktirilgan versiyalarni taʼminlaydi va
oʻrnatishdagi xatoliklarni tarqatadi. Yetishmayotgan vositalar, yaroqsiz hisobotlar yoki yetishmayotgan bazaviy koʻrsatkichlar
majburiy skaner tekshiruvini TUGALLANMAGAN holatda qoldiradi.

| Skript                   | Tekshiradi                                                                                                                                                                                                                                                                                              | Bloklash holati                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Siklik bogʻliqliklar yoʻqligi (dpdm)                                                                                                                                                                                                                                                                    | **Tavsiyaviy**                                          |
| `check:bundle-size`      | Toʻplam hajmi belgilangan chegaradan oshmasligi; oʻlchovni olib boʻlmasa, tekshiruv muvaffaqiyatsiz tugaydi                                                                                                                                                                                             | **--ratchet bilan bloklovchi**                          |
| `check:secrets`          | Gitleaks topilmalari ortib ketmasligi; majburiy tekshiruvlar mavjud boʻlmagan vosita/manba/boshlangʻich koʻrsatkichni, muvaffaqiyatsiz tekshiruvlarni va yaroqsiz hisobotlarni rad etadi                                                                                                                | **--ratchet bilan bloklovchi**                          |
| `check:vuln-ratchet`     | Bogʻliqliklardagi zaifliklar ortib ketmasligi; majburiy tekshiruvlar mavjud boʻlmagan vositalar, yaroqsiz hisobotlar yoki mavjud boʻlmagan boshlangʻich koʻrsatkichlarni rad etadi                                                                                                                      | **--ratchet bilan bloklovchi**                          |
| `check:workflows`        | Ish jarayonini lint orqali tekshirish (actionlint + zizmor); mavjud boʻlmagan yoki ishlamayotgan skanerlar, yaroqsiz hisobotlar yoxud mavjud boʻlmagan ratchet boshlangʻich koʻrsatkichi INCOMPLETE sifatida yakunlanadi. Yaroqli topilmalar tanlangan qatʼiy/tavsiyaviy/ratchet siyosatiga amal qiladi | Bajarilishi shart; zizmor ratchet CI muhitida bloklaydi |
| `check:openapi-breaking` | Ommaviy API shartnomasini biriktirilgan hodisa commitlariga nisbatan tekshiradi (PR merge-base, push before, merge-group base; rejalashtirilgan/qoʻlda ishga tushirishda avval checkout first parent); majburiy oʻlchov bajarilmasa, yopiq holatda xato bilan yakunlanadi                               | **--ratchet bilan bloklovchi**                          |

### Vazifa: `docs-sync-strict`

`main` yoki `release/**` ga yo‘naltirilgan birlashtirish so‘rovlarida bu vazifa faqat qoralama bo‘lmagan (yoki ishonchli navbatdan kelgan), hujjat yoki kod o‘zgarishi sifatida tasniflangan nomzodlar uchun ishlaydi. U PR bo‘lmagan CI hodisalarida ham ishlaydi; ushbu ish jarayonining push ishga tushirgichi faqat `main` ni qamrab oladi, `release/**` ni emas. Noldan farqli chiqish kodi bilan tugagan qadam vazifani bloklaydi; faqat hisobotda ko‘rsatiladigan topilmalar va quyida hujjatlashtirilgan istisnolar bloklamaydi.

| Skript                         | Tekshiradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bloklash holati                                                                                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Quyidagi 7 ta quyi nazoratni ketma-ket ishga tushiradigan meta-nazorat                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                                                                                                                                  |
| ↳ `check:docs-sync`            | Paket/OpenAPI/CHANGELOG versiyalarining muvofiqligi, `llm.txt` ning aynan bir xil ko‘zgu nusxalari, tarjima qilingan CHANGELOG bo‘limlari va o‘lchamiga oid o‘zgarmas shartlar hamda yangilari bilan almashtirilgan takroriy hujjatlarning yo‘qligi                                                                                                                                                                                                                                                                                             | Ha                                                                                                                                                  |
| ↳ `check:docs-frontmatter`     | Kompilyatsiya qilingan hujjat sahifalarida yaroqli frontmatter sarlavhalari mavjudligi                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                                                                                                                                  |
| ↳ `check:docs-counts`          | Ishonchliligi yuqori bo‘lgan sanoq invariantlari qatʼiy tekshiriladi; fayllar sonining evristik tekshiruvlari, skriptga `--strict` berilmasa, faqat ogohlantiradi (CI meta-nazorati bu bayroqni uzatmaydi)                                                                                                                                                                                                                                                                                                                                      | Qatʼiy daraja bloklaydi; yumshoq daraja tavsiyaviy                                                                                                  |
| ↳ `check:env-doc-sync`         | Eʼtiborga olinmaydigan, faqat hujjatlarda mavjud va faqat muhitda mavjud o‘zgaruvchilar uchun aniq ruxsat ro‘yxatlari qo‘llangach, manba kodidagi muhit o‘zgaruvchilarini o‘qishlar, `.env.example` va `docs/reference/ENVIRONMENT.md` bir-biriga mos keladi                                                                                                                                                                                                                                                                                    | Ha, hujjatlashtirilgan ruxsat ro‘yxatlaridan tashqarida                                                                                             |
| ↳ `check:deprecated-versions`  | Eʼtiborga olinmaydigan hujjatlarni chiqarib tashlab, xavfsiz tarixiy kontekstlardan tashqaridagi ehtimol eskirgan versiyalar va eskirgan yangilanish sanalari haqida xabar beradi                                                                                                                                                                                                                                                                                                                                                               | Joriy CI sozlamasida tavsiyaviy (`--strict` uzatilmaydi)                                                                                            |
| ↳ `check:doc-links`            | Hujjatlardagi ichki markdown havolalari haqiqiy fayllarga olib borishi (`[text]`/`(path)` shakli)                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ha                                                                                                                                                  |
| ↳ `check:fabricated-docs`      | Hujjatlarda keltirilgan marshrutlar, muhit oʻzgaruvchilari, CLI buyruqlari, hook nomlari va fayl yoʻllari kod bazasida mavjudligi. `--strict` orqali qatʼiy nazorat; bayroqsiz holatda yumshoq xato.                                                                                                                                                                                                                                                                                                                                            | Ha (CI muhitida `--strict` orqali)                                                                                                                  |
| `check:cli-i18n`               | CLI ishlatadigan `t()` kalitlari `en` da mavjud; `pt-BR` har bir yuqori darajadagi bo‘limni saqlaydi; `zh-CN` va `zh-TW` da `en` dagi har bir kalit mavjud                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                                                                                                                                  |
| `check:openapi-coverage`       | OpenAPI spetsifikatsiyasi haqiqiy marshrutlarning kamida ratchet bilan belgilangan minimal miqdorini qamrab olishi                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                                                                                                                                  |
| `check:openapi-security-tiers` | Eʼlon qilingan `x-loopback-only`/`x-always-protected` annotatsiyalari `routeGuard.ts` da asoslangan bo‘lishi kerak; tahlillagich xatolari va to‘g‘ri yo‘nalishdagi tekshiruv nomuvofiqliklari bloklaydi. Faqat mahalliy kirishga ruxsat beruvchi prefikslar ostida `x-loopback-only` yetishmasligini teskari tekshirish ogohlantiradi, faqat andozalar orqali belgilangan marshrutlar esa ushbu teskari tekshiruvdan chiqarib tashlanadi.                                                                                                       | Tahlillagich va to‘g‘ri yo‘nalishdagi tekshiruvlar bloklaydi; teskari tekshiruv tavsiyaviy                                                          |
| `check:openapi-routes`         | Asoslantirilgan `KNOWN_STALE_SPEC` ruxsat ro‘yxati qo‘llangach, `openapi.yaml` ichidagi har bir `/api...` yo‘li parametr farqlarini hisobga olmasdan haqiqiy marshrutga mos keladi; ruxsat ro‘yxatidagi eskirgan yozuvlar ham tekshiruvni muvaffaqiyatsiz qiladi                                                                                                                                                                                                                                                                                | Ha                                                                                                                                                  |
| `check:docs-symbols`           | Ko‘zgu nusxasi bo‘lmagan kanonik hujjatlardagi ichki `/api/...` URL havolalari haqiqiy marshrut yoki marshrutlar oilasiga mos keladi; proksi, yuqori oqim, o‘rinbosar va fayl havolalari hamda asoslantirilgan `KNOWN_STALE_DOC_REFS` yozuvlari chiqarib tashlanadi, ruxsat ro‘yxatidagi eskirgan yozuvlar esa tekshiruvni muvaffaqiyatsiz qiladi                                                                                                                                                                                               | Ha                                                                                                                                                  |
| `i18n translation drift`       | Asosiy hujjatlarning manba/maqsad xeshlarini va tarjimaning kelib chiqishini tekshiradi. PR taqqoslash faqat aynan bir xil meros qolgan xatolarga ruxsat beradi; manba, yetishmayotgan maqsad, maqsad xeshi, eskirgan tarjima yoki bo‘lim keshidagi yangi yoxud tasdiqlanmagan nomuvofiqliklar bloklaydi. PR taqqoslashdan tashqarida manba/yetishmayotgan maqsad/maqsad xeshi xatolari bloklaydi, eskirgan tarjimalar va nomuvofiq bo‘lim keshlari esa faqat ogohlantirish bo‘lib qoladi. Eski formatdagi bo‘lim keshining yo‘qligi xato emas. | Yangi/tasdiqlanmagan PR og‘ishi bloklaydi; aynan bir xil meros qolgan og‘ish faqat ogohlantirishdir; PR tashqarisidagi qoidalar xato turiga bog‘liq |

### Vazifa: `i18n-ui-coverage`

| Skript                           | Tekshiradi                                                                                                                                                                                                                                               | Bloklaydi      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (ichki) | UI i18n kalitlari qamrovi ≥ 65%                                                                                                                                                                                                                          | Ha             |
| `check-ui-value-drift` (ichki)   | Qayta yozilgan inglizcha **qiymat** ortida eskirgan tarjima qolmasligini                                                                                                                                                                                 | Ha             |
| `check-new-key-coverage` (ichki) | **Yangi** inglizcha kalit har bir lokal uchun tarjima qilinganini — `__MISSING__:` markeri rad etiladi                                                                                                                                                   | Ha             |
| `check-translation-ratio`        | Har bir lokal uchun haqiqiy tarjimalar nisbati (inglizchaga aynan bir xil / toʻldirgich / ruxsat berilganlar roʻyxatidan tashqarida yetishmayotgan barglar) `config/quality/i18n-translation-baseline.json` + ruxsat etilgan cheklovdan oshmasligi kerak | **Bloklovchi** |

`fetch-depth: 0` talab qilinadi — qiymat oʻzgarishi nazorati `en.json` faylini birlashtirish bazasi bilan solishtiradi.

#### `check-ui-value-drift` — eskirgan tarjimalar nazorati

Boshqa nazoratlar tuzilmaviy jihatdan aniqlay olmaydigan yagona i18n regressiyasini aniqlaydi: inglizcha qiymat
qayta yoziladi, ammo _oldingi_ inglizcha matndan olingan tarjimalar oʻzgarmay qoladi, natijada
ingliz tilidan boshqa tillardagi foydalanuvchilar ishonch bilan yozilgan, ammo endi notoʻgʻri matnni oʻqishda davom etadilar.

Bu haqiqatan ham ishlab chiqarish versiyasiga chiqib ketgan. Antigravity tizimga kirish yordamchisi qoʻshilganda (#5203)
`oauthModal.googleOAuthWarning` qayta yozilgan; **43 ta lokaldan 39 tasida** operatorlarga "toʻliq URL manzilini nusxalab,
quyiga joylashtirish" aytilgan matn saqlanib qolgan — bu provayder uchun yakunlab boʻlmaydigan jarayon. Bu holat
#8463 gacha sezilmagan, chunki:

- `sync-ui-keys` faqat **mavjud boʻlmagan** kalitlarni toʻldiradi, **eskirganlarini** esa hech qachon yangilamaydi;
- `check-ui-keys-coverage` kalitning _mavjudligini_ hisoblaydi, shu sababli eskirgan tarjima qamrab olingan deb hisoblanadi;
- `check-translation-drift` `docs/i18n/<locale>/**.md` hujjat nusxalarini kuzatadi —
  u hech qachon `src/i18n/messages/*.json` fayllarini oʻqimaydi. 2026-09 qayta sinxronlashdan buyon `docs-sync-strict`
  vazifasida bloklaydi: asosiy hujjatni tahrirlang → `npm run i18n:run -- --files=<doc>` (boʻlim darajasida, arzon).

**Farqlarni hisobga oladi, bazaviy koʻrsatkichga tayanmaydi.** U birlashtirish bazasidagi `en.json` faylini
ishchi daraxt bilan taqqoslaydi; inglizcha qiymati oʻzgargan har bir kalit uchun tegilmagan tarjimani saqlab
qolgan har qanday lokal eskirgan hisoblanadi. Bu ataylab **avvaldan mavjud qarzdorlikni muzlatadi** — farq
uzoq vaqtdan beri mavjud tarjima qaysi eski inglizcha matndan olinganini koʻrsata olmaydi, shuning uchun nazorat
faqat joriy oʻzgarish tegadigan qismlarni baholaydi. Muqobil yechim (har bir kalit uchun xesh bazaviy koʻrsatkichi)
taxminan 600 KB hajmdagi yaratiladigan faylni talab qiladi, bu mavjud eng katta bazaviy koʻrsatkichdan 3 baravar
katta boʻlib, har bir i18n PR da oʻzgarishlarga sabab boʻladi.

Uni qanoatlantirishning ikki usuli mavjud:

1. taʼsirlangan tarjimalarni yangilash yoki
2. ularni `__MISSING__:<new english>` qiymatiga oʻrnatish — shunda bajarilish muhiti tuzatilgan inglizcha matnni
   taqdim etadi (`src/i18n/request.ts::deepMergeFallback`, #7258) va kalit tarjima navbatiga qoʻshiladi.

Agar satrning **maʼnosi** oʻzgargan boʻlsa, **kalit nomini oʻzgartirishni** afzal koʻring: yangi kalit eskirgan
tarjimani meros qilib olmaydi. #8463 aynan shu andozadan foydalangan.

```bash
npm run i18n:check-value-drift          # qatʼiy (CI ishga tushiradigan variant)
npm run i18n:check-value-drift:warn     # faqat hisobot
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Qiymat siljishi va yangi kalit nazoratlari
`scripts/i18n/resolve-ui-diff-base.mjs` dagi yagona o‘zgarmas taqqoslashdan foydalanadi. Ish jarayoni ikkala tekshiruvga ham bir xil asos, asos uchi va
nomzod SHA qiymatlarini uzatadi. PR/asosni qayta nishonlash, push va merge-group ishga tushirishlari o‘z hodisa
kontekstidan foydalanadi. Nomzod tarmoqni qo‘lda ishga tushirish uchun uning aynan mos ochiq PR’i yoki aniq
`i18n_base_sha` kirishi talab qilinadi. Ushbu kirishsiz `main` yoki `release/vX.Y.Z` ni qo‘lda ishga tushirish yoxud reja asosida kuzatish
oxirgi commitni uning birinchi ota-commit’i bilan taqqoslaydi; bu meros bo‘lib qolgan barcha
tarjima qarzining auditi emas. Mahalliy ishga tushirish uchun aniq taqqoslash asosi talab qilinadi,
masalan, yuqoridagi `BASE_REF` buyrug‘i.

Taqqoslash kontekstining yo‘qligi yoki noaniqligi, talab qilinadigan katalogni o‘qib bo‘lmasligi yoki uning yaroqsizligi hamda
nomzodning o‘zgarishi, ogohlantirish rejimida ham, **2** chiqish kodi bilan `INCOMPLETE` natijasini beradi.
Kataloglarni o‘qish uchun `scripts/i18n/read-ui-catalog.mjs` ishlatiladi; o‘qishdagi xatolar
bo‘sh obyektlar bilan almashtirilmaydi. Mavjud bo‘lmagan asos ham, to‘liq bo‘lmagan kirish ham PASS holatini belgilamaydi.

### Vazifa: `i18n`

Toʻliq i18n tekshiruv matritsasi (har bir lokal uchun bittadan vazifa). Butun vazifa tavsiyaviy hisoblanadi.

| Skript                          | Tekshiradi                             | Bloklaydi                                                 |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Har bir lokal tarjimasining toʻliqligi | **Tavsiyaviy** (butun vazifada `continue-on-error: true`) |

### Vazifa: `pr-test-policy`

Faqat pull requestlarda ishga tushadi.

| Skript                 | Tekshiradi                                                                                                                                                               | Bloklaydi |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` yoki `bin/` ichidagi ishlab chiqarish kodini oʻzgartiradigan PR lar testlarni oʻz ichiga olishi yoki yangilashi kerak (Qatʼiy qoida #8) | Ha        |
| `check:test-masking`   | Oʻzgartirilgan test fayllari sof tasdiqlar sonini kamaytirmasligini yoki `assert.ok(true)` tavtologiyalarini qoʻshmasligini                                              | Ha        |
| `check:pr-evidence`    | PR matnida oʻzgarish uchun test/VPS dalillari keltirilganini (PR matnini grep orqali tekshirib, Qatʼiy qoida #18 ni avtomatlashtiradi — moʻrt, Backlog ga qarang)        | Ha        |

### Vazifa: `test-vitest`

`changes` tasniflash vazifasini talab qiladi. Tegishli matritsa shardlari muvaffaqiyatsizlik yuz bersa, birlashtirishni bloklaydi.

| Toʻplam          | Tekshiradi                                                                | Bloklovchi                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 ta vosita), autoCombo, kesh — vitest ishga tushiruvchisi | Ha                                                                                                                                       |
| `test:vitest:ui` | UI komponent testlari — vitest ishga tushiruvchisi                        | **Bloklovchi** — avvaldan mavjud xatolar `vitest.config.ts` faylida aniq istisno qilingan; yangi xatolar vazifani muvaffaqiyatsiz qiladi |

### Tungi ish jarayonlari (rejalashtirilgan, tavsiyaviy)

Bular cron jadvali asosida (va `workflow_dispatch` orqali) ishga tushadi, PRlarda esa hech qachon ishga tushmaydi. Ularning barchasi tavsiyaviy.

| Ish jarayoni           | Tekshiradi                                                                                                                                                                                                          | Bloklovchi     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | tasodifiy boshlangʻich qiymat va ko‘p sonli ishga tushirishlar bilan fast-check xususiyat testlari                                                                                                                  | **Tavsiyaviy** |
| `nightly-resilience`   | heap oʻsishi cheklovi, nosozliklarni xaotik kiritish, k6 yuklama/uzoq muddatli yuklama testi                                                                                                                        | **Tavsiyaviy** |
| `nightly-llm-security` | promptfoo inyeksiya himoyasi (bloklash rejimi) + garak tekshiruvlari (provayder siri boʻlmasa, oʻtkazib yuboriladi)                                                                                                 | **Tavsiyaviy** |
| `nightly-schemathesis` | `docs/openapi.yaml` yordamida ishlayotgan OmniRoute tizimiga qarshi OpenAPI shartnomasini fuzzing qilish (schemathesis) — spetsifikatsiya buzilishlari / ishlov berilmagan 500 xatolarini aniqlaydi (8-bosqich B.4) | **Tavsiyaviy** |
| `nightly-mutation`     | tezkor modul testlari yoʻnalishi boʻyicha Stryker mutatsion testlash bahosi — omon qolgan mutantlar zaif assertlarni aniqlaydi                                                                                      | **Tavsiyaviy** |
| `nightly-compat`       | qoʻllab-quvvatlanadigan `engines.node` diapazonlari boʻylab Node muhiti mosligi matritsasi                                                                                                                          | **Tavsiyaviy** |

Unumdorlikning bazaviy koʻrsatkichlari (heap, TTFB, qurish vaqti) qayd etiladi, ammo cheklov sifatida qoʻllanmaydi: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) ga qarang.

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
- **tavsiyaviy** — global jami va muzlatilgan bazaviy holat o‘rtasidagi farq. Meros bo‘lib o‘tgan og‘ish
  aybsiz PR’ni hech qachon qizil holatga keltirmaydi; og‘ish relizni muvofiqlashtirish vaqtida tuzatish uchun kuzatib boriladi va
  zaxira sig‘imi vazifasi tomonidan nazorat qilinadi.

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
2. `package.json` fayliga `"check:<name>": "node scripts/check/check-<name>.mjs"` ni qoʻshing va
   taxallus hamda uning aniq buyrugʻini `config/quality/gate-manifest.json` faylida sinxronlashtiring.
   Mavjud tekshiruv taxallusini oʻzgartirish yoki olib tashlashda ham xuddi shu sinxronlashtirishni bajaring.
   `npm run check:gate-manifest` buyrugʻini ishga tushiring; pre-commit hook va CI oʻzgarishlar tasnifi
   ushbu kelishuvga rioya etilishini taʼminlaydi.
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
