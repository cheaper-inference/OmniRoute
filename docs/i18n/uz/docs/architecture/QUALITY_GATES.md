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

## Darvoza inventarizatsiyasi va ijro profillari

### Nomzodni qabul qilish

CI va Quality Gates ish oqimlarining har biri barqaror hukm chiqaradi: `Gate / CI` va `Gate / Quality`. Ularning versiyali qabul siyosati talab yoki maslahat sifatida har bir yuqoridagi ishni sanab o'tadi. Tegishli talab qilinadigan ish muvaffaqiyatli bo'lishi kerak: etishmayotgan, bekor qilingan, o'tkazib yuborilgan, kutilayotgan va noma'lum natijalar PASS o'rnatolmaydi. Faqat hujjatlar yoki faqat kataloglar uchun toʻgʻri tasniflash kodlar qatorini qoʻllanilmaydigan qilib qoʻyishi mumkin; PR loyihasi qabul qilingan nomzod emas. `hotfix` yorlig'i dalillardan voz kechmaydi.

Ikkala ish oqimi ham PRs main/release tarmoqlariga qamrab oladi, `main` ga surish, qo'lda jo'natish va birlashma-guruh hodisalarini qamrab oladi. Push, jo'natish va birlashtirish guruhlari to'liq tanlovni ishga tushiradi. `release/**` ga surish ularni boshlamaydi (2026-10-18): har bir o‘zgarish allaqachon matritsani o‘z PR -da ishga tushirgan va birlashtirilgan kombinatsiya Release-Greenning ishi (`docs/ops/RUNNER_BOX.md` → Hosted lane). Forks va birlashma guruhlari, aks holda o'z-o'zidan ishlaydigan yuguruvchilarni tanlaydigan ishlar uchun joylashtirilgan yuguruvchilardan foydalanadi; ishga tushirishdan oldin yetarli darajada sig‘im tekshirilishi kerak.

Oddiy PR tezkor tanlovni boshqaradi. Qabul qilish siyosatining `full-code` va `full-code-e2e` qatorlari (E2E, integratsiya, paket artefakti, Electron smoke, Bun SQLite, ekotizim va protokol mijozlari) faqat Mergify navbat qoralamasida yoki to‘liq ishga tushiriladi: `gh workflow run ci.yml --ref <branch>`.

Har bir JSON kvitansiyasi tekshirilgan SHA, ish jarayonining bajarilishini va urinishlarini aniqlaydi. CLI checkout/event SHA mos kelmasligini rad etadi. Ish jarayoni testlari siyosat a'zoligini hukm ishining `needs` ro'yxatiga bog'laydi, shuning uchun yangi yoki olib tashlangan qator jimgina yo'qolib qolmaydi. Kvitansiyalar nashr, tarqatish yoki mavjud maslahat skanerining ichki qismlarini emas, balki o'zlarining ish jarayonini qamrab oladi. Filial qoidalarida ikkala chek nomini faollashtirish alohida ma'muriy o'zgarish hisoblanadi; bu ishlarni qo'shishning o'zi filialni himoya qilmaydi.

### Navbatni birlashtirish

`queue` yorlig'i birlashtirish navbatiga PR yuboradi (`.mergify.yml`). Birlashtirish `mergify/merge-queue/` filialida PR qoralamasini ochadi, CI u yerda to‘liq tanlovni ishga tushiradi va `Gate / CI`, `Gate / Quality` va `Merge integrity (changelog + generated skills)` o‘tganda asl PR birlashadi.

Mergify o'zining navbat xulosasini qoralama tavsifiga yozadi va boshqa ilovalar ham uni tahrirlashi mumkin. Bunday qoralamadagi `pull_request` `edited` hodisasi oʻzining parallellik guruhini (`-queue-edit-<run_id>`) oladi, shuning uchun u qoralamaning haqiqiy ishini bekor qila olmaydi va u darvoza va matritsani oʻtkazib yuboradi. Faqat `Merge integrity` hali ham ishlaydi. O'tkazib yuborilgan darvoza vazifasi boshqa chek nomiga ega, chunki Mergify o'tkazib yuborilgan `Gate / CI` muvaffaqiyatsiz tekshiruv sifatida o'qiydi va PR navbatdan chiqaradi.

O'chirishdan so'ng, surish har doim ham PR talab qilmaydi. Bunga `@mergifyio queue` izoh qoldiring.

### Statik skanerlash inventar

Versiyalangan npm-taxallus inventarizatsiyasi va statik skanerlash aʼzoligi `config/quality/gate-manifest.json` da mavjud. Skript nomlarini va `package.json` qarshi aniq buyruqlarni tekshirish uchun `npm run check:gate-manifest` ishga tushiring; qo'shimchalar, olib tashlashlar va buyruqlar drifti ham mahalliy kancada, ham CI da o'zgartirish-klassifikatsiya ishlarida muvaffaqiyatsizlikka uchraydi. Taxallus ish jarayoni ishi, matritsa misoli yoki sinov ishi emas: bu hisoblar bir-birini almashtirib bo'lmaydigan qilib ko'rsatilmasligi kerak.

Tanlangan taxalluslarni bajarmasdan tekshirish uchun `npm run quality:scan -- --list` yoki `npm run quality:scan:fast -- --list` foydalaning. Yuguruvchi npm kirish nuqtasini chaqiradi, shuning uchun uning ish vaqti (sozlangan joyda Bun bilan birga) saqlanib qoladi. Manifest ushbu profillardan tashqaridagi taxalluslarni alohida chaqirilgandek yozadi va faqat o'qish uchun mo'ljallangan skanerlash profillarida texnik xizmat ko'rsatish buyruqlari taqiqlanadi.

Bu profillar faqat statik skanerlashni qamrab oladi. Ular mahsulot sinovlari, qamrovi, qadoqlanishi, tashqi tekshiruvlari yoki nomzodning to'liq relizlar qabul qilinishini tasdiqlamaydi. Ish oqimini qabul qilish bog'langan `config/quality/admission-policy.json` va `scripts/quality/admission-verdict.mjs` dan foydalanadi. Reliz-kuzatuvchi profillari alohida qoladi; ularning amaldagi cheklari va kvitansiyalarini mustaqil ravishda tekshirish. Quyidagi nasriy inventar ma'lumotnoma bo'lib, darvoza haqiqatan ham yugurganligini tasdiqlovchi dalil emas.

Skriptlar `scripts/check/` (politika eshiklari) va `scripts/quality/` (ratchet engine) ostida yashaydi. Haqiqatning CI manbai `.github/workflows/ci.yml` dir.

### PR fast-path (`quality.yml`) ni chiqaring

`.github/workflows/quality.yml` main/release PRs ustida CI to‘ldiradi, `main` ga suradi, guruhlarni jo‘natadi va birlashtiradi. PRs yo'l bilan filtrlangan tezkor tekshiruvlardan foydalaning. Doimiy o'chirilgan dublikat o'chirildi; haqiqiy build/package/boot tekshiruvlari CI ichida qoladi. Birlik to'plami va vitest faqat CI (`Unit Tests (N/8)` va `Vitest`) da ishlaydi.

| Ish                                              | Qo'llash doirasi                                                                                                                                      | Bloklash                  |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs va docs-all                                                                                                              | Ha                        |
| `Fast Quality Gates`                             | PRs kodi; statik tekshiruvlar, tip tekshiruvi, asboblar paneli turini tekshirish, ta'sirlangan birlik testlari, unutilgan aka-uka testlari (maslahat) |
| `No new ESLint warnings`                         | PRs kodi; bostirishdan xabardor tuklar himoyasi                                                                                                       | Ha, shu jumladan vilkalar |
| `Merge integrity (changelog + generated skills)` | Loyihadan tashqari PRs; o'zgarishlar jurnali va yaratilgan mahorat sinxronlashi                                                                       | Ha, shu jumladan vilkalar |

#### Unutilgan aka-uka testlari hisoboti

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` ning maslahat qadami sifatida ishlaydi va test-ta'sir xaritasi orqasida import hal qiluvchidan qayta foydalanadi. Har bir o'zgartirilgan ishlab chiqarish moduli uchun nomzod testi tortishish so'rovi farqida yo'q bo'lganda, u deterministik `changed module/symbol -> static consumer -> candidate sibling test` zanjirlari haqida xabar beradi. Markdown xulosasi va JSON natijasi har qanday blokirovkadan oldin kalibrlash uchun `forgotten-sibling-tests` ish oqimi artefakti sifatida saqlanadi.

Barrel reeksport va dinamik import faqat rezolyutsiya diagnostikasi; ular hech qachon blokirovka qiluvchi topilma yaratmaydilar. Ko'rib chiqilgan istisnolar `config/quality/forgotten-sibling-allowlist.json` yashaydi. Har bir yozuv iste'molchi va nomzod testini nomlashi, ma'lum bir mantiqiy asosni keltirishi va GitHub muammosi yoki tortishish so'rovini bog'lashi kerak. Noto'g'ri kiritilgan yozuvlar yopilmadi. Istisnolar o'chirilgan nomzod testini yoki `.skip`/`.todo` qo'shadigan farqni bostira olmaydi; tasdiqlashni zaiflashtirish va boshqa niqoblash mustaqil ravishda blokirovka qiluvchi `check:test-masking` darvozasiga tegishli bo'lib qoladi.

### Lavozim: `lint`

Har bir PR dan `main` ishlaydi. Bloklar muvaffaqiyatsizlikka uchraganida birlashadi.

| Skript (`npm run ...`)            | Tasdiqlaydi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bloklash                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js versiyasi qo'llab-quvvatlanadigan diapazonda                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                       |
| `check:cycles`                    | Circular imports across all of `src/` + `open-sse/` (AST-based, tsconfig `paths` resolved). Bare exits 1 whenever any cycle exists (fail-closed since #15281) and lists the SCCs. `check:cycles:ratchet` (what CI runs) blocks when the count exceeds the `metrics.cycles` ceiling in `quality-baseline.json` — currently 14, `direction: down`, so it can only fall (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha (ratchet)                             |
| `check:boundary`                  | `open-sse → src` ulanishi: dvigateldan ilovaga noyob fayldan faylga import qilish (`scripts/quality/measure-boundary.mjs`; chekka roʻyxat v4 core/module-split remediation backlog). Yalang'och = maslahat hisoboti ( `quality:boundary` bilan bir xil). `check:boundary:ratchet` (nima CI ishlaydi, shuningdek `quality.yml` fast-gates ratchet loopda) o'lchangan 771, `direction: down` da urug'langan `quality-baseline.json` — `metrics.boundaryOpenSseToSrc` shiftidan oshib ketganda bloklaydi; `--update` faqat uni pasaytiradi; PRs bo'yicha tayanch-nisbiy (`--base-ref`, pastga qarang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha (ratchet)                             |
| `check:route-validation:t06`      | Zod sxemalari barcha marshrutlarda mavjud (6-darajali siyosat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` soni byudjetdan oshmaydi (11-darajali katraka)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                       |
| `check:provider-consistency`      | `providers.ts` -dagi har bir provayder `providerRegistry.ts` -da mos yozuvga ega (va aksincha, ruxsat etilgan ro'yxatda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                       |
| `check:model-lifecycle`           | Qo'lda saqlanuvchi uchta marshrutlash jadvali ro'yxatdan o'tgan hayot siklining surati (#11503) bilan mos bo'lib qoladi: `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` yo'naltira oladigan identifikatorni bekor qilmaydi; har bir `BUILT_IN_ALIASES` nishoni `REGISTRY` da mavjud va nafaqaga chiqqan id snapshotida mavjud emas; `REGISTRY` har bir nafaqaga chiqqan identifikator yo'naltiriladi yoki `allowedRetiredInCatalog` da ro'yxatga olinadi; va bu suratda hech qanday `DEFAULT_DEGRADATION_MAP` manbasi yoki maqsad bekor qilingan ko‘rinmaydi. Bu hozirda modelga jonli yuqori oqim tomonidan xizmat ko'rsatilayotganligini isbotlamaydi. Oflayn — `config/quality/model-lifecycle.json` bilan qo'lda yangilangan `npm run quality:refresh-model-lifecycle` bilan taqqoslanadi (tarmoq; CI ga ulanmagan). `allowedRetiredInCatalog` - bu kuydiriladigan kalit: yozuvni faqat kuzatuv muammosi bilan qo'shing.                                                                                                                                                                                 | Ha                                       |
| `check:fetch-targets`             | Mijoz tomonidagi `src/` dagi har bir `fetch("/api/...")` haqiqiy `route.ts` ga aylanadi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                       |
| `check:deps`                      | Repodagi har bir `package.json` bo'ylab barcha `npm install` -able deplari `dependency-allowlist.json`; yangi ochilmagan yoki egilgan paketlar belgilandi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                       |
| `audit:deps`                      | `npm audit` (ildiz + elektron) — hech qanday high/critical maslahati yo'q (osv `check:vuln-ratchet` bilan bir-biriga o'xshash; Ratsionalizatsiya orqasiga qarang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                       |
| `check:lockfile`                  | `package-lock.json` integrity — https registrlari, yaxlitlik xeshlari, xostni bekor qilmaslik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ha                                       |
| `check:licenses`                  | ishlab chiqarishga bog'liqlik uchun SPDX litsenziyasi ruxsat etilgan ro'yxat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                       |
| `check:tracked-artifacts`         | Qurilish artefaktlari/tasdiqlangan `node_modules` simli havolalari yoʻq (shuningdek, husky pre-commit da ishlaydi; pre-push qasddan engil — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ha                                       |
| `check:ai-attribution`            | PR commits, sarlavha yoki korpus — Hard Rule #16 ( PR→ `release/**` — uchun `quality.yml` fast-gates siklida hodisaning foydali yukini o‘qiydi, no-op off PRs — va in PRQtqz-→ `main` da) hech PRAI/bot `Co-Authored-By` treyleri yoki AI avlod altbilgisi yo‘q. `ci.yml` ham husky `commit-msg` hook #14436;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | Har bir Vitest istisnosi kuzatuv muammosini nomlaydi va `config/quality/vitest-exclusions.json` (#13204) da paydo bo'ladi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ha                                       |
| `check:file-size`                 | Source files (`.ts`/`.tsx` in `src/`, `open-sse/`, `electron/`, `bin/`) stay within `cap` and test files (`*.test.ts(x)`) within `testCap`; files frozen in `file-size-baseline.json` (`frozen` / `testFrozen`) must not grow past their recorded size                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                       |
| `check:error-helper`              | executors/handlers xato javoblari `buildErrorBody()` / `sanitizeErrorMessage()` (Qattiq qoida #12) dan foydalanadi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ha                                       |
| `check:migration-numbering`       | Migratsiya SQL fayllari ketma-ket raqamlangan, bo'shliqlar yoki dublikatlar yo'q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ha                                       |
| `check:public-creds`              | `publicCreds.ts` dan tashqarida literal OAuth `client_id`/`client_secret` yoki Firebase veb kalitlari yo'q (Qattiq qoida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ha                                       |
| `check:db-rules`                  | `src/lib/db/` modullaridan tashqarida xom SQL yo'q; `localDb.ts` dan barrel importi yo'q (Qattiq qoidalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ha                                       |
| `check:known-symbols`             | Provayder ijrochilari, marshrutlash strategiyalari va ularning jo'natish jadvallarida ro'yxatdan o'tgan tarjimonlar diskdagi fayllarga mos keladi — hech qanday yetim yoki e'lon qilinmagan belgilar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                       |
| `check:route-guard-membership`    | Bola jarayonini tug'diradigan har bir marshrut `isLocalOnlyPath()` (Qattiq qoidalar #15/#17) bo'yicha tasniflanadi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ha                                       |
| `check:test-discovery`            | Repodagi har bir `*.test.ts` / `*.spec.ts` fayli kamida bitta sinovchi tomonidan to'planadi (ratchet: `test-discovery-baseline.json` etimlar ro'yxati faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                       |
| `check:test-tla-order`            | `tests/unit` ostida hech qanday `node:test` fayli testni qayd etmaydi, yuqori darajadagi `await` ga tegmaydi, keyin esa ko‘proq ro‘yxatdan o‘tkazmaydi (#18045; ratchet: `test-tla-order-allowlist.json` faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                       |
| `check:agent-skills-sync`         | Yaratilgan agent mahorati artefaktlari ularning manba katalogiga mos keladi (driftsiz)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Provayder logos/assets kelib chiqishi haqida ma'lumotga ega                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | JSON konfiguratsiya fayllari repo lint qoidalarini tahlil qiladi va qondiradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | xatosiz TypeScript kompilyatsiyasi (faqat maslahatli ogohlantirishlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                       |
| `typecheck:noimplicit:core`       | Qattiq `noImplicitAny` — istiqbolli; ko'plab oldindan mavjud qo'ng'iroq saytlari hali ham izohlarga muhtoj                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Maslahat** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` `src/app/(dashboard)/**` (#7033) ga kengaytirilgan — `typecheck:core` ning tanlangan 27 fayldan iborat ruxsat etilgan ro‘yxati hech qanday boshqaruv paneli TSX o‘z ichiga olmaydi va `next build` uni hech qachon yozilmaydi (`next.config.mjs` `ignoreBuildErrors: true` ni o‘rnatadi), shuning uchun u yerda yetim identifikator regressiyalari (#6625/#6909) CI edi. Muzlatilgan per-file/per-TS-code soniga nisbatan farqlar (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` bilan bir xil eskirgan ijro namunasi ) — faqat bazaviy hisoblashdan tashqari NEW xatolar darvozadan chiqmaydi; Oldindan mavjud xatolik tuzatilganda `--update` bilan pastga siljiting.                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                       |
| `check:build-typecheck`           | `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) boʻyicha toʻliq ilovalar ishlab chiqarish turini tekshirish, `typecheck:core` sirtining 27-fayl ruxsat etilgan roʻyxati va asboblar paneli eshigi qamrab olinmaydi. `config/quality/build-typecheck-baseline.json` qarshi farqlar; yangi yoki ko'tarilgan (fayl, kod) hisobi muvaffaqiyatsiz tugadi, pastroq raqam sizdan ratchet qilishni so'raydi. Agar `--force-regressions` topshirilmagan bo‘lsa, ishga tushirishda yangi yoki ko‘tarilgan juftlik mavjud bo‘lsa, `--update` rad etadi va `--force-nocheck` topshirilmasa, yangi o‘chirilgan faylni rad etadi, shuning uchun yashil rangga ega bo‘lish uchun asosiy chiziqni kengaytirish va doimiy sukunatni berish ikkita alohida ataylab qilingan harakatdir. Yalang'och `--force` rad etiladi. Shuningdek, `config/quality/ts-nocheck-baseline.json` qarshi `@ts-nocheck` uchun tuzilish doirasini skanerlaydi, chunki undan foydalanadigan fayl hech qanday diagnostika haqida xabar bermaydi va aks holda har bir darvoza uchun ko'rinmas bo'ladi. | Ha                                       |

#### Ikkita turdagi tekshiruv dasturlari boshqacha javob beradi

`typecheck:core` va `check:build-typecheck` turli xil variantlar ostida turli dasturlarni kompilyatsiya qiladi va bir fayl birida toza, ikkinchisida esa xatolarga to'la bo'lishi mumkin.

`tsconfig.build.json` `"strict": false` o'rnatadi, shuning uchun `noImplicitAny` o'chirilgan. Asosiy konfiguratsiya qattiqroq variantlarga ega 27 fayldan iborat ruxsat etilgan roʻyxatni tuzadi va har bir yozuvning import grafigiga amal qiladi, shuning uchun qurish dasturida hech qachon koʻrinmaydigan fayllar hali ham u yerda tekshiriladi.

Natija faylning terilgan yoki yozilmaganligini baholashda muhim ahamiyatga ega:** `check:build-typecheck` ostida nol diagnostika nol degani emas** . 26 ta fayldan `@ts-nocheck` olib tashlash, ulardan 23 tasini qurish dasturida toza ko'rsatdi; Ulardan o'n oltitasi 120 ga yaqin yashirin xatolarni aniqladi - qat'iy birida har qanday xato. Faylni toza deb chaqirishdan oldin ikkalasini ham tekshiring.

### Lavozim: `quality-gate`

`test-coverage` dan keyin ishlaydi. Bloklar muvaffaqiyatsizlikka uchraganida birlashadi.

| Skript                       | Tasdiqlaydi                                                                                                                                                                              | Bloklash                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | `quality-metrics.json` chiqaradi (ESLint ogohlantirish soni, birlashtirilgan parcha hisobotidan qamrov)                                                                                  | Ha (ratchetning yuqori oqimi) |
| `quality:ratchet`            | `quality-baseline.json` har bir ko‘rsatkich regressiyaga uchramagan (ESLint ogohlantirishlari ≤ bazaviy chiziq; qamrov ≥ bazaviy chiziq)                                                 | Ha                            |
| `check:duplication`          | Kodning takrorlanishi (jscpd@4) `quality-baseline.json` asosiy qiymatdan oshmaydi                                                                                                        | Ha                            |
| `check:complexity`           | Fayl darajasidagi siklomatik murakkablik chegaradan oshmaydi (yadro ESLint `complexity` + `max-lines-per-function`)                                                                      | Ha                            |
| `check:cognitive-complexity` | Kognitiv murakkablik ratchet (`eslint-plugin-sonarjs`) — alohida ESLint pass; CI yugurishlari ikkalasi ham bitta `check:complexity-ratchets` qadami sifatida birlashtirilgan             | Ha                            |
| `check:dead-code`            | Foydalanilmayotgan eksport/fayllar ratchet (knip) boshlang'ich ko'rsatkichga nisbatan orqaga qaytmaydi                                                                                   | Ha                            |
| `check:compression-budget`   | Dvigatel uchun token-tejamkorlik qavatlarining siqilish benchmarki byudjeti — regressiyaga uchramasligi kerak                                                                            | Ha                            |
| `check:type-coverage`        | Foiz bilan yozilgan ratchet (`type-coverage`) regressiyaga uchramaydi; asosan `typecheck:noimplicit:core` o'z ichiga oladi                                                               | Ha                            |
| `check:codeql-ratchet`       | Ochiq CodeQL ogohlantirishlar soni qaytarilmaydi ( `gh api` orqali o‘qiladi; graceful-tokensiz o‘tish) — yangilash kadensi va qo‘lda ishga tushirish: quyidagi “CodeQL ratchet”ga qarang | Ha                            |

### Lavozim: `quality-extended`

Butun ish maslahatdir (`continue-on-error: true`). npm-ga asoslangan ratchets haqiqiy ishlaydi; tashqi skanerlar `gh release download` orqali o'rnatiladi va ikkilik hali mavjud bo'lmaganda o'z-o'zidan o'tib ketadi (0 dan chiqish).

| Skript                   | Tasdiqlaydi                                                                                                                                                                                                                                   | Bloklash                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `check:circular-deps`    | Doiraviy bog'liqliklar yo'q (dpdm)                                                                                                                                                                                                            | **Maslahat**                                               |
| `check:bundle-size`      | To'plamning o'lchami qopqoqdan oshmaydi                                                                                                                                                                                                       | **Maslahat**                                               |
| `check:secrets`          | Ikkilik bo'lmasa, maxfiy skanerlash (gitleaks) — o'tkazib yuboriladi                                                                                                                                                                          | **Maslahat**                                               |
| `check:vuln-ratchet`     | Agar ikkilik bo'lmasa, bog'liqlik zaifliklari (osv-skaner) — o'tkazib yuborishlarini regressiya qilmaydi                                                                                                                                      | **Maslahat**                                               |
| `check:workflows`        | Ish oqimi lint (actionlint + zizmor); missing/broken skanerlari, noto'g'ri hisobotlar yoki etishmayotgan ratchet bazaviy chiziq INCOMPLETE sifatida ishlamayapti. Yaroqli topilmalar tanlangan strict/advisory/ratchet siyosatiga amal qiladi | Bajarish talab qilinadi; CI da zizmor ratchet blokirovkasi |
| `check:openapi-breaking` | Ommaviy API shartnomasiga (`openapi.yaml`) o'zgarishlarni buzish asosiy filialga (oasdiff) — `openapiBreaking=N` chiqaradi; oasdiff bo'lmasa yoki asosiy spetsifikatsiyani hal qilib bo'lmasa o'tkazib yuboradi                               | **Maslahat**                                               |

### Lavozim: `docs-sync-strict`

Har bir PR dan `main` ishlaydi. Bloklar muvaffaqiyatsizlikka uchraganida birlashadi.

| Skript                         | Tasdiqlaydi                                                                                                                                                                  | Bloklash                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Quyidagi 6 ta pastki eshiklarni ketma-ket boshqaradigan meta-shlyuz                                                                                                          | Ha                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiyasining mustahkamligi                                                                                                                    | Ha                         |
| ↳ `check:docs-counts`          | Nasrdagi sonlar (provayderlar soni, migratsiya soni va h.k.) haqiqiy sonlarning ratchet oynasida.                                                                            | Ha                         |
| ↳ `check:env-doc-sync`         | `.env.example` dagi har bir env var hujjat jadvalida hujjatlashtirilgan va aksincha                                                                                          | Ha                         |
| ↳ `check:deprecated-versions`  | Hujjatlarda eskirgan versiya satrlari yo'q                                                                                                                                   | Ha                         |
| ↳ `check:doc-links`            | Hujjatlardagi ichki belgilash havolalari haqiqiy fayllarga o'rnatiladi (`[text]`/`(path)` shakli)                                                                            | Ha                         |
| ↳ `check:fabricated-docs`      | Hujjatlarda keltirilgan marshrutlar, env vars, CLI buyruqlari, kanca nomlari va fayl yo'llari kodlar bazasida mavjud. `--strict` orqali qattiq darvoza; bayroqsiz soft-fail. | Ha ( `--strict` orqali CI) |
| `check:cli-i18n`               | CLI buyruq satrlari barcha i18n mahalliy fayllarida mavjud                                                                                                                   | Ha                         |
| `check:openapi-coverage`       | OpenAPI spec hech bo'lmaganda haqiqiy marshrutlarning bir qavatini qamrab oladi                                                                                              | Ha                         |
| `check:openapi-security-tiers` | `openapi.yaml` xavfsizlik darajasining izohlari `routeGuard.ts` tasniflariga mos keladi                                                                                      | **Maslahat**               |
| `check:openapi-routes`         | `openapi.yaml` har bir yo'l haqiqiy `route.ts` (gallyutsinatsiyaga qarshi) o'tadi.                                                                                           | Ha                         |
| `check:docs-symbols`           | `docs/**/*.md` -dagi har bir `/api/...` havolasi haqiqiy `route.ts` (gallyutsinatsiyaga qarshi) ga aylanadi.                                                                 | Ha                         |
| `i18n translation drift`       | i18n mahalliy fayllaridagi tarjima qilinmagan kalitlar — faqat ogohlantiradi                                                                                                 | **Maslahat**               |

`docs/diagrams/` ostida o'n ikki README SVGs hosil bo'ladi (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` ularning barchasini qayta tiklaydi). Ularning har birida bayt-qiyoslash birligi testi (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` vazifasi) mavjud bo‘lib, u o‘rnatilgan fayl eskirganida bajarilmaydi va `check:docs-counts` o‘z `<text>` tugunlaridan — kanonik raqamlarni o‘qiydi, shuning uchun konturlash bosqichi fayldagi har bir belgilangan qatorni ko‘rinmas `<text>` sifatida saqlaydi. SVG kanonik-raqamlar tekshiruvi `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) da sanab o'tilgan fayllarni o'qiydi: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` va `tier-flow-light.svg`; free-forever, katalogga kirish, takrorlanuvchi hovuz va ball faktorlari da'volari ham `promise-pillars.svg`, `free-tier-budget.svg` va `strategies-grid.svg` ni o'qiydi. `free-tier-budget.svg` o'z raqamlarini jonli katalog yuklagichidan oladi, shuning uchun `FREE_MODEL_BUDGETS` yoki provayder nomiga o'zgartirish fayl qayta tiklanmaguncha CI ko'rinishida qizil rangda bo'ladi.

### Lavozim: `i18n-ui-coverage`

| Skript                            | Tasdiqlaydi                                                                                                                                                                                                                              | Bloklash     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check-ui-keys-coverage` (inline) | UI i18n kalitining qamrovi ≥ 65%                                                                                                                                                                                                         | Ha           |
| `check-ui-value-drift` (inline)   | Qayta yozilgan inglizcha** qiymat** ortda hech qanday eskirgan tarjima qoldirmaydi                                                                                                                                                       | Ha           |
| `check-new-key-coverage` (inline) | A** yangi** Ingliz kaliti har bir tilga tarjima qilinadi — a `__MISSING__:` markeri rad etiladi                                                                                                                                          | Ha           |
| `check-translation-ratio`         | Har bir mahalliy til uchun real tarjima nisbati (ruxsat berilgan roʻyxatdan tashqarida bir xil/ingliz tiliga / toʻldiruvchi/ etishmayotgan barglar) `config/quality/i18n-translation-baseline.json` + boʻsh boʻlishidan oshmasligi kerak | **Maslahat** |

`fetch-depth: 0` — kerak qiymat-drift eshigi birlashma bazasiga nisbatan `en.json` farq qiladi.

#### `check-ui-value-drift` — eskirgan-tarjima darvozasi

Boshqa eshiklar tizimli ravishda ko'ra olmaydigan bir i18n regressiyasini ushlaydi: ingliz tilidagi qiymat qayta yoziladi va _oldingi_ ingliz tilidan olingan tarjimalar ortda qoladi, shuning uchun ingliz tilini bilmaydigan foydalanuvchilar ishonch bilan yozilgan, hozir noto'g'ri nusxani o'qishda davom etadilar.

Bu haqiqiy yuborilgan. Antigravity login yordamchisi tushganda `oauthModal.googleOAuthWarning` qayta yozildi (#5203);** 43 ta hududdan 39 tasi** operatorlarga "to'liq URL dan nusxa ko'chiring va uni pastga qo'ying" degan matnni ushlab turdi, bu provayder uchun to'liq bajarilmaydigan —. Bu #8463 e'tibordan chetda qoldi, chunki:

- `sync-ui-keys` faqat kalitlarni to'ldiradi** yo'q** , hech qachon bunday emas** eskirgan** ;
- `check-ui-keys-coverage` kalit _presence_ni hisoblaydi, shuning uchun eskirgan tarjima qamrab olingan deb baholanadi;
- `check-translation-drift` `docs/i18n/<locale>/**.md` hujjatlarini aks ettiradi — u hech qachon `src/i18n/messages/*.json` o'qimaydi. 2026-09-yilda qayta sinxronlashdan beri `docs-sync-strict` ishini bloklash: asosiy hujjatni tahrirlash → `npm run i18n:run -- --files=<doc>` (bo‘lim darajasida, arzon).

**Diff-xabar, asosiy emas.** U birlashma bazasida `en.json` ishlaydigan daraxt bilan taqqoslaydi; Ingliz tilidagi qiymati o'zgargan har bir kalit uchun tegilmagan tarjimasi mavjud bo'lgan har qanday til eskirgan. Bu ataylab** ilgari mavjud bo'lgan qarzlarni muzlatib qo'yadi** — a diff uzoq vaqtdan beri mavjud bo'lgan tarjima qaysi eski ingliz tilidan kelganini aniqlay olmaydi, shuning uchun darvoza faqat joriy o'zgarish nimaga ta'sir qilishini baholaydi. Muqobil variant (har bir kalit uchun xesh-bazal chiziq) ~ 600 KB ishlab chiqarilgan faylga tushadi, har bir i18n PR uchun 3 × eng katta mavjud asosiy chiziq.

Uni qondirishning ikki yo'li:

1. ta'sir qilingan tarjimalarni yangilang yoki
2. ularni ish vaqtini `__MISSING__:<new english>` — ga o'rnating, so'ngra tuzatilgan ingliz tiliga (`src/i18n/request.ts::deepMergeFallback`, #7258) va tarjima uchun kalit navbatlarga xizmat qiladi.

Agar string bo'lsa** ma'nosi** o'zgardi, afzal** kalit nomini o'zgartirish** : yangi kalit eski tarjimani meros qilib olmaydi. Bu #8463 namunasi ishlatilgan.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Asosiy katalogni o'qib bo'lmaganda `SKIP reason=base-unresolved` bilan 0 dan chiqadi (asosiy ko'rsatgichsiz sayoz klon), `check-openapi-breaking` aks ettiradi.

### Lavozim: `i18n`

To'liq i18n tasdiqlash matritsasi (har bir mahalliy parametr uchun bitta ish). Butun ish maslahatdir.

| Skript                          | Tasdiqlaydi                              | Bloklash                                                     |
| ------------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Har bir til uchun tarjimaning toʻliqligi | **Maslahat** (butun ish bo'yicha `continue-on-error: true` ) |

### Lavozim: `pr-test-policy`

Faqat tortishish so'rovlari bo'yicha ishlaydi.

| Skript                 | Tasdiqlaydi                                                                                                                                                     | Bloklash |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` yoki `bin/` da ishlab chiqarish kodini o'zgartiradigan PRs testlarni o'z ichiga olishi yoki yangilashi kerak (Qattiq qoida #8) | Ha       |
| `check:test-masking`   | O'zgartirilgan test fayllari aniq tasdiqlar sonini kamaytirmaydi yoki `assert.ok(true)` tavtologiyalarini qo'shmaydi                                            | Ha       |
| `check:pr-evidence`    | PR tanasi o'zgarish uchun test/VPS dalillarini keltiradi ( PR — grepping orqali Hard Rule #18 mexanizatsiyalashtiradi, Backlogga qarang)                        | Ha       |

### Lavozim: `test-vitest`

`build` dan keyin ishlaydi. Bloklar muvaffaqiyatsizlikka uchraganida birlashadi.

| Suite            | Tasdiqlaydi                                             | Bloklash                                                                                                                            |
| ---------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 asbob), autoCombo, kesh — vitest runner | Ha                                                                                                                                  |
| `test:vitest:ui` | UI komponenti — vitest runnerni sinab ko'radi           | **Bloklash** — oldindan mavjud nosozliklar `vitest.config.ts` da aniq chiqarib tashlanadi; yangi muvaffaqiyatsizliklar ishni buzadi |

### Tungi ish oqimlari (rejalashtirilgan, maslahat)

Ular cron jadvalida (va `workflow_dispatch`) ishlaydi, hech qachon PRs da emas. Hammasi maslahatchi.

| Ish jarayoni           | Tasdiqlaydi                                                                                                                                                                        | Bloklash     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | tasodifiy urug ' + yuqori yugurish soni bilan tez tekshirish mulk testlar                                                                                                          | **Maslahat** |
| `nightly-resilience`   | to'p-o'sish darvozasi, xaos xato-in'ektsiya, k6 load/soak                                                                                                                          | **Maslahat** |
| `nightly-llm-security` | promptfoo injection guard (blok rejimi) + garak problari (provayder sirisiz o'tkazib yuborilgan)                                                                                   | **Maslahat** |
| `nightly-schemathesis` | `docs/openapi.yaml` — sirtlari spetsifikatsiyasi buzilishlari / ishlov berilmagan 500s (Fase 8 B.4) yordamida jonli OmniRoute ga qarshi OpenAPI kontraktini xiralashtirish (sxema) | **Maslahat** |
| `nightly-mutation`     | Stryker mutatsion testining tezkor birlik yo'li — bo'yicha omon qolgan mutantlar zaif tasdiqlaydi                                                                                  | **Maslahat** |
| `nightly-compat`       | Qo'llab-quvvatlanadigan `engines.node` diapazonlari bo'ylab tugun mexanizmi moslik matritsasi                                                                                      | **Maslahat** |

Ishlashning asosiy ko'rsatkichlari (uyma, TTFB, qurish vaqti) qayd etiladi, ular yopiq emas: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`) ga qarang.

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
