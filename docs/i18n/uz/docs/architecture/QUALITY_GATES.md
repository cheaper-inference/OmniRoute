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

CI va Quality Gates workflow'lari har biri barqaror hukm chiqaradi: `Gate / CI` va
`Gate / Quality`. Ularning versiyalangan qabul siyosati har bir yuqori oqim job'ini
talab qilinadigan yoki maslahat tarzidagi deb sanab chiqadi. Amaldagi talab
qilinadigan job muvaffaqiyatli bo'lishi shart: yo'q, bekor qilingan, o'tkazib
yuborilgan, kutilayotgan va noma'lum natijalar PASS holatini o'rnata olmaydi.
Yaroqli docs-only yoki catalog-only tasnifi kod yo'lagini nomaqbul qilishi mumkin;
draft PR qabul qilingan nomzod hisoblanmaydi. `hotfix` yorlig'i dalillarni bekor qilmaydi.

Har ikkala workflow ham main/release branch'lariga PR'larni, `main`ga push'larni, qo'lda
ishga tushirishni va merge-group hodisalarini qamrab oladi. Push, dispatch va merge-group
to'liq tanlovni ishga tushiradi. `release/**`ga push'lar ularni boshlamaydi (2026-10-18): har bir
o'zgarish allaqachon o'z PR'ida matritsani ishga tushirgan va birlashtirilgan kombinatsiya
Release-Green'ning ishi hisoblanadi (`docs/ops/RUNNER_BOX.md` → Hosted lane). Fork'lar
va merge group'lar aks holda self-hosted runner'larni tanlaydigan job'lar uchun hosted
runner'lardan foydalanadi; rollout'dan oldin yetarli hosted sig'im tekshirilishi shart.

Har bir JSON receipt tekshirilgan SHA, workflow run va attempt'ni aniqlaydi.
CLI checkout/event SHA nomuvofiqligini rad etadi. Workflow testlari siyosat a'zoligini
verdict job'ining `needs` ro'yxatiga bog'laydi, shunda yangi qo'shilgan yoki olib tashlangan
yo'lak jimgina yo'qolib qololmaydi. Receipt'lar o'z workflow'ini qamrab oladi, nashr etish,
deploy yoki mavjud maslahat skanerining ichki qismlarini emas. Ikkala check nomini branch
qoidalarida faollashtirish alohida ma'muriy o'zgarishdir; bu job'larni qo'shishning o'zi
branch'ni himoya qilmaydi.

### Statik skan inventari

Versiyalangan npm-alias inventari va statik-skan a'zoligi
`config/quality/gate-manifest.json`da joylashgan. Skript nomlari va aniq buyruqlarni
`package.json`ga qarshi tekshirish uchun `npm run check:gate-manifest`ni ishga tushiring;
qo'shimchalar, olib tashlashlar va buyruq o'zgarishlari ham mahalliy hook'da, ham CI'dagi
o'zgarish-tasnifi job'larida muvaffaqiyatsizlikka olib keladi.
Alias workflow job, matritsa nusxasi yoki test case emas: bu sonlarni
bir-birining o'rnida ishlatiladigan deb ko'rsatish mumkin emas.

Tanlangan alias'larni bajarishsiz ko'rish uchun `npm run quality:scan -- --list` yoki
`npm run quality:scan:fast -- --list`dan foydalaning. Runner npm entrypoint'ini chaqiradi,
shuning uchun uning runtime'i (konfiguratsiya qilingan joylarda Bun ham) saqlanadi.
Manifest ushbu profillardan tashqaridagi alias'larni alohida chaqiriladigan deb qayd etadi,
va read-only scan profillarida texnik xizmat buyruqlari taqiqlangan.

Bu profillar faqat statik skanni qamrab oladi. Ular mahsulot testlarini,
coverage'ni, packaging'ni, tashqi tekshiruvlarni yoki nomzodning to'liq release
qabulini sertifikatlamaydi. Workflow qabuli bog'langan `config/quality/admission-policy.json`
va `scripts/quality/admission-verdict.mjs`dan foydalanadi. Release-observer profillari alohida
bo'lib qoladi; ularning amaldagi check'lari va receipt'larini mustaqil tekshiring. Quyidagi
matn inventari ma'lumotnoma bo'lib, gate haqiqatan ishga tushganining isboti emas.

Skriptlar `scripts/check/` (siyosat gate'lari) va `scripts/quality/` (ratchet engine) ostida joylashgan.
CI uchun haqiqat manbai — `.github/workflows/ci.yml`.

### Release PR fast-path (`quality.yml`)

`.github/workflows/quality.yml` main/release PR'lari, `main`ga push'lar,
dispatch va merge group'larda CI'ni to'ldiradi. PR'lar path bo'yicha filtrlangan fast check'lardan
foydalanadi. Doimiy o'chirilgan takroriy build olib tashlandi; haqiqiy build/package/boot
check'lari CI'da qoladi.

| Job                                              | Qamrov                                                                                                                                                                                                                            | Bloklovchi                 |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PR'lari; API docs ref'lari va docs-all                                                                                                                                                                                  | Ha                         |
| `Fast Quality Gates`                             | Code PR'lari; statik check'lar, typecheck, dashboard typecheck, ta'sirlangan unit testlar                                                                                                                                         | Ha                         |
| `Forgotten sibling tests`                        | Code PR'lari; o'zgartirilgan modullar statik iste'molchilar va nomzod sibling testlarga kuzatiladi; barrel va dynamic-import yo'llari maslahat diagnostikasi sifatida xabar qilinadi, havola qilingan allowlist istisnolari bilan | **Maslahat**               |
| `Vitest (fast-path)`                             | Code PR'lari; tezkor vitest to'plami                                                                                                                                                                                              | Ha                         |
| `Unit Tests fast-path`                           | Code PR'lari; 4-shard unit to'plami                                                                                                                                                                                               | Ha                         |
| `No new ESLint warnings`                         | Code PR'lari; suppressions'ni hisobga oluvchi lint guard                                                                                                                                                                          | Ha, fork'larni ham qo'shib |
| `Merge integrity (changelog + generated skills)` | Non-draft PR'lar; changelog va generatsiya qilingan skill sinxronligi                                                                                                                                                             | Ha, fork'larni ham qo'shib |

#### Forgotten sibling tests report

`npm run check:forgotten-sibling-tests` test ta’siri xaritasi orqasidagi import resolveridan qayta foydalanadi.
Har bir o‘zgargan production modul uchun, agar nomzod test pull-request diffida mavjud bo‘lmasa, u deterministik
`changed module/symbol -> static consumer -> candidate sibling test` zanjirlarini bildiradi. Markdown xulosasi va JSON natijasi
har qanday bloklovchi joriy etishdan oldin kalibrlash uchun `forgotten-sibling-tests` workflow artefakti sifatida saqlanadi.

Barrel qayta eksportlari va dinamik importlar faqat rezolyutsiya diagnostikasi hisoblanadi; ular hech qachon
bloklovchi topilma yaratmaydi. Ko‘rib chiqilgan istisnolar
`config/quality/forgotten-sibling-allowlist.json` faylida joylashgan. Har bir yozuv iste’molchi va nomzod
testni nomlashi, aniq asos keltirishi hamda GitHub issue yoki pull requestga havola qilishi kerak. Noto‘g‘ri formatdagi yozuvlar
yopiq holatda rad etiladi. Istisnolar o‘chirilgan nomzod testni yoki `.skip`/`.todo` qo‘shadigan diffni bosa olmaydi;
assertion zaiflashuvi va boshqa maskalashlar mustaqil ravishda bloklovchi
`check:test-masking` gate’i javobgarligida qoladi.

### Ish: `lint`

`main`ga har bir PRda ishlaydi. Muvaffaqiyatsizlikda mergeni bloklaydi.

| Skript (`npm run ...`)            | Nimani tekshiradi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bloklovchi                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | Node.js versiyasi qoʻllab-quvvatlanadigan oraliqda ekanligini                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                       |
| `check:cycles`                    | Butun `src/` + `open-sse/` boʻylab aylanma importlar (AST asosida, tsconfig `paths` hal qilingan). Har qanday sikl mavjud boʻlsa, bare 1 bilan chiqadi (fail-closed, #15281 dan beri) va SCCʼlarni roʻyxatlaydi. `check:cycles:ratchet` (CI ishlatadigan) soni `quality-baseline.json` faylidagi `metrics.cycles` chegarasidan oshsa bloklaydi — hozirda 14, `direction: down`, yaʼni faqat kamayishi mumkin (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha (ratchet)                             |
| `check:boundary`                  | `open-sse → src` bogʻlanishi: dvigateldan ilovaga noyob fayl-fayl importlari (`scripts/quality/measure-boundary.mjs`; edge roʻyxati — v4 core/module-split tuzatish ishlarining backlogʻi). Bare = maslahat hisoboti (`quality:boundary` bilan bir xil). `check:boundary:ratchet` (CI ishlatadigan, shuningdek `quality.yml` fast-gates ratchet siklida ham) soni `quality-baseline.json` faylidagi `metrics.boundaryOpenSseToSrc` chegarasidan oshsa bloklaydi — oʻlchangan 771 qiymatida belgilangan, `direction: down`; `--update` faqat pasaytiradi; PRʼlarda bazaga nisbatan (`--base-ref`, pastga qarang)                                                                                                                                                                                                                                                                                                   | Ha (ratchet)                             |
| `check:route-validation:t06`      | Barcha marshrutlarda Zod sxemalari mavjudligi (Tier 6 siyosati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                       |
| `check:any-budget:t11`            | `@ts-expect-error // any` soni byudjetdan oshmaydi (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                       |
| `check:provider-consistency`      | `providers.ts` dagi har bir provayderning `providerRegistry.ts` da mos yozuvi bor (va aksincha, allowlist doirasida)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                       |
| `check:model-lifecycle`           | Qoʻlda yuritiladigan uchta marshrutlash jadvali repozitoriyga kiritilgan lifecycle snapshot bilan izchil qoladi (#11503): `FITNESS_TABLE` (`taskFitness.ts`) `REGISTRY` marshrutlay oladigan hech qanday isteʼfodagi id ga ball bermaydi; har bir `BUILT_IN_ALIASES` nishoni `REGISTRY` da mavjud va isteʼfodagi id lar snapshotida yoʻq; `REGISTRY` da qolgan har bir isteʼfodagi id yoʻnaltirilgan yoki `allowedRetiredInCatalog` roʻyxatida keltirilgan; va hech qanday `DEFAULT_DEGRADATION_MAP` manbasi yoki nishoni oʻsha snapshotda isteʼfodagi deb koʻrinmaydi. Bu model hozirda tirik upstream tomonidan xizmat qilinishini isbotlamaydi. Oflayn — `config/quality/model-lifecycle.json` bilan solishtiradi, u qoʻlda `npm run quality:refresh-model-lifecycle` bilan yangilanadi (tarmoq; CI ga ulanmagan). `allowedRetiredInCatalog` — burn-down ratchet: yozuvni faqat tracking issue bilan qoʻshing. | Ha                                       |
| `check:fetch-targets`             | Mijoz tomonidagi `src/` dagi har bir `fetch("/api/...")` haqiqiy `route.ts` ga hal boʻladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                       |
| `check:deps`                      | Repodagi har bir `package.json` boʻylab barcha `npm install` qilinadigan bogʻliqliklar `dependency-allowlist.json` da; yangi pin qilinmagan yoki slopsquatted paketlar belgilanadi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                       |
| `audit:deps`                      | `npm audit` (root + electron) — yuqori/kritik ogohlantirishlar yoʻq (osv `check:vuln-ratchet` bilan ustma-ust tushadi; Rationalization Backlog ga qarang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ha                                       |
| `check:lockfile`                  | `package-lock.json` yaxlitligi — https registr, integrity xeshlari, host override'lari yo'q                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                       |
| `check:licenses`                  | Ishlab chiqarish bog'liqliklari uchun SPDX litsenziya ruxsat ro'yxati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ha                                       |
| `check:tracked-artifacts`         | Build artefaktlari / commit qilingan `node_modules` symlinklari yo'q (shuningdek husky pre-commit'da ishlaydi; pre-push ataylab yengil — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ha                                       |
| `check:ai-attribution`            | PR commitlarida, sarlavhasida yoki matnida AI/bot `Co-Authored-By` traileri yoki AI generatsiyasi footeri yo'q — Qat'iy qoida #16 (`quality.yml` ichidagi PR→`release/**` uchun fast-gates siklida — hodisa payloadini o'qiydi, PR bo'lmagan holatda no-op — va PR→`main` uchun `ci.yml` lint ichidagi faqat PR uchun qadam; shuningdek husky `commit-msg` hooki; inson hammualliflarga ruxsat; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ha                                       |
| `check:vitest-exclusions`         | Har bir Vitest istisnosi kuzatuv issue'sini nomlaydi va `config/quality/vitest-exclusions.json` ichida mavjud bo'ladi (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ha                                       |
| `check:file-size`                 | Manba fayllar (`src/`, `open-sse/`, `electron/`, `bin/` ichidagi `.ts`/`.tsx`) `cap` doirasida, test fayllari (`*.test.ts(x)`) esa `testCap` doirasida qoladi; `file-size-baseline.json` ichida muzlatilgan fayllar (`frozen` / `testFrozen`) yozib qo'yilgan hajmdan oshmasligi kerak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ha                                       |
| `check:error-helper`              | Ijrochilar/handlerlarda xatolik javoblari `buildErrorBody()` / `sanitizeErrorMessage()` dan foydalanadi (Qat'iy qoida #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ha                                       |
| `check:migration-numbering`       | Migratsiya SQL fayllari ketma-ket raqamlangan, boʻshliqlar yoki takrorlanishlar yoʻq                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ha                                       |
| `check:public-creds`              | `publicCreds.ts` dan tashqarida literal OAuth `client_id`/`client_secret` yoki Firebase Web kalitlari yoʻq (Qat'iy qoida #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                       |
| `check:db-rules`                  | `src/lib/db/` modullaridan tashqarida xom SQL yoʻq; `localDb.ts` dan barrel-importlar yoʻq (Qat'iy qoidalar #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                       |
| `check:known-symbols`             | Provayder ijrochilari, marshrutlash strategiyalari va tarjimonlarning dispatch jadvallarida roʻyxatga olinganlari diskdagi fayllarga mos keladi — yetim yoki e'lon qilinmagan belgilar yoʻq                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ha                                       |
| `check:route-guard-membership`    | Har bir child process yaratadigan route `isLocalOnlyPath()` tomonidan tasniflanadi (Qat'iy qoidalar #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ha                                       |
| `check:test-discovery`            | Repozitoriydagi har bir `*.test.ts` / `*.spec.ts` fayli kamida bitta test runner tomonidan yigʻiladi (ratchet: `test-discovery-baseline.json` dagi yetim fayllar roʻyxati faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ha                                       |
| `check:test-tla-order`            | `tests/unit` ostidagi hech bir `node:test` fayli test roʻyxatdan oʻtkazib, top-level `await` ga yetib, soʻngra yana testlar roʻyxatdan oʻtkazmaydi (#18045; ratchet: `test-tla-order-allowlist.json` faqat qisqarishi mumkin)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ha                                       |
| `check:agent-skills-sync`         | Generatsiya qilingan agent-skills artefaktlari oʻz manba katalogiga mos keladi (nomuvofiqlik yoʻq)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Provayder logotiplari/aktivlari qayd etilgan kelib chiqish (provenance) yozuviga ega                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON konfiguratsiya fayllari parse qilinadi va repo lint qoidalariga mos keladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | TypeScript kompilyatsiyasi xatolarsiz (faqat maslahat xarakteridagi ogohlantirishlar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ha                                       |
| `typecheck:noimplicit:core`       | Qatʼiy `noImplicitAny` — kelajakka qaratilgan; koʻplab mavjud chaqiruv joylari hali ham annotatsiyalarni talab qiladi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Maslahat** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` `src/app/(dashboard)/**` bilan cheklangan (#7033) — `typecheck:core`ning tanlangan 27 faylli ruxsat roʻyxati hech qanday dashboard TSXni oʻz ichiga olmaydi va `next build` ham uni hech qachon tekshirmaydi (`next.config.mjs` `ignoreBuildErrors: true`ni oʻrnatadi), shu sababli u yerdagi yetim identifikator regressiyalari (#6625/#6909) CI uchun koʻrinmas edi. Muzlatilgan har bir fayl/har bir TS kodi soni bazasiga nisbatan farqlar (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` bilan bir xil eskirgan majburlash namunasi) — faqat bazadagi sondan tashqari YANGI xatolar gate'ni muvaffaqiyatsiz qiladi; oldindan mavjud xato tuzatilganda `--update` bilan ratchetni pasaytiring.                                                                                                                                                                              | Ha                                       |

### Ish: `quality-gate`

`test-coverage`dan keyin ishlaydi. Muvaffaqiyatsizlikda birlashtirishni bloklaydi.

| Skript                       | Tekshiradi                                                                                                                                                                                                  | Bloklovchi           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | `quality-metrics.json`ni chiqaradi (ESLint ogohlantirishlar soni, birlashtirilgan shard hisobotidan coverage)                                                                                               | Ha (ratchet oldidan) |
| `quality:ratchet`            | `quality-baseline.json`dagi har bir metrika yomonlashmagan (ESLint ogohlantirishlari ≤ baza; coverage ≥ baza)                                                                                               | Ha                   |
| `check:duplication`          | Kod dublikatsiyasi (jscpd@4) `quality-baseline.json`dagi bazadan oshmaydi                                                                                                                                   | Ha                   |
| `check:complexity`           | Fayl darajasidagi tsiklomatik murakkablik chegaradan oshmaydi (asosiy ESLint `complexity` + `max-lines-per-function`)                                                                                       | Ha                   |
| `check:cognitive-complexity` | Kognitiv murakkablik ratcheti (`eslint-plugin-sonarjs`) — alohida ESLint bosqichi; CI ikkalasini birlashtirib yagona `check:complexity-ratchets` qadami sifatida ishga tushiradi                            | Ha                   |
| `check:dead-code`            | Ishlatilmagan eksportlar / fayllar ratcheti (knip) bazaga nisbatan yomonlashmaydi                                                                                                                           | Ha                   |
| `check:compression-budget`   | Siqish benchmark byudjeti — har bir dvigatel uchun token tejash minimal chegaralari yomonlashmasligi kerak                                                                                                  | Ha                   |
| `check:type-coverage`        | Foizda tiplashtirilgan ratchet (`type-coverage`) yomonlashmaydi; asosan `typecheck:noimplicit:core`ni qamrab oladi                                                                                          | Ha                   |
| `check:codeql-ratchet`       | Ochiq CodeQL ogohlantirishlari soni yomonlashmaydi (`gh api` orqali oʻqiydi; token boʻlmasa muloyim oʻtkazib yuboradi) — yangilash davriyligi va qoʻlda ishga tushirish: quyidagi "CodeQL ratchet"ga qarang | Ha                   |

### Ish: `quality-extended`

Butun ish maslahat xarakterida (`continue-on-error: true`). npm'ga asoslangan ratchetlar haqiqiy ishlaydi; tashqi skanerlar `gh release download` orqali oʻrnatiladi va binar hali mavjud boʻlmasa oʻzini oʻtkazib yuboradi (exit 0).

| Skript                   | Tekshiradi                                                                                                                                                                                                                                                        | Bloklovchi                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | Aylanma bogʻliqliklar yoʻq (dpdm)                                                                                                                                                                                                                                 | **Maslahat**                                       |
| `check:bundle-size`      | Bundle hajmi chegaradan oshmaydi                                                                                                                                                                                                                                  | **Maslahat**                                       |
| `check:secrets`          | Maxfiy maʼlumotlarni skanerlash (gitleaks) — binar boʻlmasa oʻtkazib yuboradi                                                                                                                                                                                     | **Maslahat**                                       |
| `check:vuln-ratchet`     | Bogʻliqlik zaifliklari (osv-scanner) yomonlashmaydi — binar boʻlmasa oʻtkazib yuboradi                                                                                                                                                                            | **Maslahat**                                       |
| `check:workflows`        | Ish oqimi lint (actionlint + zizmor); yetishmayotgan/buzilgan skanerlar, notoʻgʻri hisobotlar yoki yetishmayotgan ratchet bazasi INCOMPLETE sifatida muvaffaqiyatsizlikka olib keladi. Toʻgʻri topilmalar tanlangan strict/advisory/ratchet siyosatiga boʻysunadi | Bajarilishi shart; CI'da zizmor ratcheti bloklaydi |
| `check:openapi-breaking` | Ommaviy API shartnomasidagi (`openapi.yaml`) asosiy branchga nisbatan buzuvchi oʻzgarishlar (oasdiff) — `openapiBreaking=N`ni chiqaradi; oasdiff yoʻq boʻlsa yoki asosiy spetsifikatsiyani aniqlab boʻlmasa oʻtkazib yuboradi                                     | **Maslahat**                                       |

### Ish: `docs-sync-strict`

`main`ga har bir PRda ishlaydi. Muvaffaqiyatsizlikda birlashtirishni bloklaydi.

| Skript                         | Tekshiradi                                                                                                                                                                   | Bloklovchi                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | Quyidagi 6 ta sub-gate'ni ketma-ket ishga tushiruvchi meta-gate                                                                                                              | Ha                           |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiyalar izchilligi                                                                                                                          | Ha                           |
| ↳ `check:docs-counts`          | Matn ichidagi sonlar (provayderlar soni, migratsiyalar soni va h.k.) haqiqiy sonlarning ratchet oynasi ichida                                                                | Ha                           |
| ↳ `check:env-doc-sync`         | `.env.example` dagi har bir env o'zgaruvchisi hujjatlar jadvalida hujjatlashtirilgan va aksincha                                                                             | Ha                           |
| ↳ `check:deprecated-versions`  | Hujjatlarda eskirgan versiya satrlari yo'q                                                                                                                                   | Ha                           |
| ↳ `check:doc-links`            | Hujjatlardagi ichki markdown havolalar haqiqiy fayllarga olib boradi (`[text]`/`(path)` shaklida)                                                                            | Ha                           |
| ↳ `check:fabricated-docs`      | Hujjatlarda keltirilgan route'lar, env o'zgaruvchilari, CLI buyruqlari, hook nomlari va fayl yo'llari kod bazasida mavjud. `--strict` orqali qattiq gate; flagsiz soft-fail. | Ha (`--strict` orqali CI da) |
| `check:cli-i18n`               | CLI buyruq satrlari barcha i18n locale fayllarida mavjud                                                                                                                     | Ha                           |
| `check:openapi-coverage`       | OpenAPI spetsifikatsiyasi haqiqiy route'larning kamida ratchetlangan minimal qismini qamrab oladi                                                                            | Ha                           |
| `check:openapi-security-tiers` | `openapi.yaml` dagi xavfsizlik darajasi annotatsiyalari `routeGuard.ts` tasniflariga mos keladi                                                                              | **Tavsiyaviy**               |
| `check:openapi-routes`         | `openapi.yaml` dagi har bir yo'l haqiqiy `route.ts` ga olib boradi (anti-hallucination)                                                                                      | Ha                           |
| `check:docs-symbols`           | `docs/**/*.md` dagi har bir `/api/...` havolasi haqiqiy `route.ts` ga olib boradi (anti-hallucination)                                                                       | Ha                           |
| `i18n translation drift`       | i18n locale fayllaridagi tarjima qilinmagan kalitlar — faqat ogohlantirish                                                                                                   | **Tavsiyaviy**               |

`docs/diagrams/` ostidagi o'n ikkita README SVG generatsiya qilinadi (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` ularning barchasini qayta generatsiya qiladi). Har birining bayt-baytga
solishtiruvchi unit testi bor (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` jobi), u commit qilingan
fayl eskirgan bo'lsa muvaffaqiyatsiz bo'ladi, va `check:docs-counts` kanonik sonlarni ularning `<text>`
tugunlaridan o'qiydi — shuning uchun sonlar hech qachon path'larga aylantirilmaydi. SVG kanonik sonlar
tekshiruvi `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) ro'yxatida keltirilgan fayllarni
o'qiydi: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`,
`comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, shuningdek `public/images/tier-flow-dark.svg`
va `tier-flow-light.svg`; free-forever, catalog-entry, recurring-pool va scoring-factors da'volari ham
`promise-pillars.svg`, `free-tier-budget.svg` va `strategies-grid.svg` fayllarini o'qiydi.
`free-tier-budget.svg` o'z raqamlarini jonli katalog yuklovchisidan oladi, shuning uchun
`FREE_MODEL_BUDGETS` yoki provayderning ko'rsatiladigan nomi o'zgarsa, o'sha fayl qayta generatsiya
qilinmaguncha CI qizil bo'ladi.

### Job: `i18n-ui-coverage`

| Skript                            | Tekshiradi                                                                                                                                                                                                                  | Bloklovchi     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | UI i18n kalitlar qamrovi ≥ 65%                                                                                                                                                                                              | Ha             |
| `check-ui-value-drift` (inline)   | Qayta yozilgan ingliz **qiymati** orqasida eskirgan tarjima qolmaydi                                                                                                                                                        | Ha             |
| `check-new-key-coverage` (inline) | **Yangi** ingliz kaliti har bir locale'da tarjima qilingan — `__MISSING__:` belgisi rad etiladi                                                                                                                             | Ha             |
| `check-translation-ratio`         | Har bir locale bo'yicha haqiqiy tarjima nisbati (inglizchaga bir xil / placeholder / allowlist'dan tashqaridagi yetishmayotgan barglar) `config/quality/i18n-translation-baseline.json` + slack qiymatidan oshmasligi kerak | **Tavsiyaviy** |

`fetch-depth: 0` talab qilinadi — value-drift gate `en.json` ni merge base bilan diff qiladi.

#### `check-ui-value-drift` — eskirgan tarjima gate'i

Boshqa tekshiruvlar strukturaviy jihatdan koʻra olmaydigan yagona i18n regressiyasini ushlaydi: inglizcha qiymat qayta yoziladi, _oldingi_ inglizchadan olingan tarjimalar esa ortda qoladi, natijada ingliz boʻlmagan foydalanuvchilar ishonch bilan yozilgan, endi notoʻgʻri matnni oʻqishda davom etadilar.

Bu haqiqatda chiqarilgan. `oauthModal.googleOAuthWarning` Antigravity login yordamchisi qoʻshilganda qayta yozilgan (#5203); **43 ta lokalning 39 tasi** operatorlarga "toʻliq URL'ni nusxalab, pastga qoʻying" deb aytuvchi matnni saqlab qoldi — bu provayder uchun tugallanmaydigan oqim. Bu #8463 gacha sezilmadi, chunki:

- `sync-ui-keys` faqat **mavjud boʻlmagan** kalitlarni toʻldiradi, hech qachon **eskirgan**larini emas;
- `check-ui-keys-coverage` kalitlarning _mavjudligini_ sanaydi, shuning uchun eskirgan tarjima qoplangan deb baholanadi;
- `check-translation-drift` `docs/i18n/<locale>/**.md` hujjat nusxalarini kuzatadi — u hech qachon `src/i18n/messages/*.json` fayllarini oʻqimaydi. 2026-09 qayta sinxronlashdan buyon `docs-sync-strict` jobida bloklaydi: asosiy hujjatni tahrirlang → `npm run i18n:run -- --files=<doc>` (boʻlim darajasida, arzon).

**Diff'ni hisobga oladi, baseline'ga tayanmaydi.** U merge base'dagi `en.json`ni working tree bilan solishtiradi; inglizcha qiymati oʻzgargan har bir kalit uchun tegmagan tarjimani saqlab qolgan har qanday lokal eskirgan hisoblanadi. Bu ataylab **avvaldan mavjud qarzni muzlatadi** — diff uzoq vaqtdan beri mavjud tarjima qaysi eski inglizchadan kelganini koʻrsata olmaydi, shuning uchun tekshiruv faqat joriy oʻzgarish tegadigan qismni baholaydi. Muqobil variant (har bir kalit uchun hash baseline) ~600 KB generatsiya qilinadigan fayl hisobiga tushadi, bu mavjud eng katta baseline'dan 3× katta va har bir i18n PR'da oʻzgarib turadi.

Uni qondirishning ikki yoʻli:

1. ta'sirlangan tarjimalarni yangilang, yoki
2. ularni `__MISSING__:<new english>` ga oʻrnating — shunda runtime tuzatilgan inglizchani taqdim etadi (`src/i18n/request.ts::deepMergeFallback`, #7258) va kalit tarjima navbatiga tushadi.

Agar satrning **ma'nosi** oʻzgargan boʻlsa, **kalitni qayta nomlashni** afzal koʻring: yangi kalit eskirgan tarjimani meros qilib olishi mumkin emas. #8463 shu usuldan foydalangan.

```bash
npm run i18n:check-value-drift          # qat'iy (CI shuni ishlatadi)
npm run i18n:check-value-drift:warn     # faqat hisobot
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Agar asosiy katalog (base catalog) oʻqib boʻlmasa (base ref'siz shallow clone), `SKIP reason=base-unresolved` bilan 0 kod bilan chiqadi, bu `check-openapi-breaking` bilan bir xil ishlaydi.

### Job: `i18n`

Toʻliq i18n tekshiruv matritsasi (har bir lokal uchun bitta job). Butun job maslahat xarakterida.

| Skript                          | Tekshiradi                             | Bloklovchi                                                       |
| ------------------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| `validate_translation.py quick` | Har bir lokal uchun tarjima toʻliqligi | **Maslahat xarakterida** (butun jobda `continue-on-error: true`) |

### Job: `pr-test-policy`

Faqat pull request'larda ishlaydi.

| Skript                 | Tekshiradi                                                                                                                                                | Bloklovchi |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` yoki `bin/` ichidagi production kodini oʻzgartiruvchi PR'lar testlarni qoʻshishi yoki yangilashi shart (Qat'iy qoida #8) | Ha         |
| `check:test-masking`   | Oʻzgartirilgan test fayllari sof assert sonini kamaytirmaydi yoki `assert.ok(true)` tavtologiyalarini qoʻshmaydi                                          | Ha         |
| `check:pr-evidence`    | PR matni oʻzgarish uchun test/VPS dalillarini keltiradi (PR matnini grep qilish orqali #18 Qat'iy qoidani mexanizatsiyalaydi — nozik, Backlog'ga qarang)  | Ha         |

### Job: `test-vitest`

`build`dan keyin ishlaydi. Muvaffaqiyatsizlikda merge'ni bloklaydi.

| Toʻplam          | Tekshiradi                                                   | Bloklovchi                                                                                                                |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 ta vosita), autoCombo, cache — vitest runner | Ha                                                                                                                        |
| `test:vitest:ui` | UI komponent testlari — vitest runner                        | **Bloklaydi** — avvaldan mavjud xatoliklar `vitest.config.ts`da aniq chiqarib tashlangan; yangi xatoliklar jobni yiqitadi |

### Tungi workflow'lar (jadval boʻyicha, maslahat xarakterida)

Bular cron jadvali boʻyicha (va `workflow_dispatch`da) ishlaydi, hech qachon PR'larda emas. Barchasi maslahat xarakterida.

| Ish oqimi              | Tekshiradi                                                                                                                                                                                     | Bloklovchi      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | tasodifiy seed va yuqori ishga tushirish soni bilan fast-check property testlari                                                                                                               | **Bloklamaydi** |
| `nightly-resilience`   | heap o'sishi nazorati, chaos xatolik in'ektsiyasi, k6 yuklama/soak                                                                                                                             | **Bloklamaydi** |
| `nightly-llm-security` | promptfoo in'ektsiya qo'riqchisi (block rejimi) + garak tekshiruvlari (provayder siri bo'lmasa o'tkazib yuboriladi)                                                                            | **Bloklamaydi** |
| `nightly-schemathesis` | jonli OmniRoute'ga qarshi `docs/openapi.yaml` yordamida OpenAPI kontrakt fuzzing (schemathesis) — spetsifikatsiya buzilishlari / ishlov berilmagan 500 xatolarni yuzaga chiqaradi (Fase 8 B.4) | **Bloklamaydi** |
| `nightly-mutation`     | tezkor unit yo'nalishi bo'yicha Stryker mutatsiya-testlash bahosi — omon qolgan mutantlar zaif assertlarni yuzaga chiqaradi                                                                    | **Bloklamaydi** |
| `nightly-compat`       | qo'llab-quvvatlanadigan `engines.node` diapazonlari bo'yicha Node engine moslik matritsasi                                                                                                     | **Bloklamaydi** |

Unumdorlik bazaviy ko'rsatkichlari (heap, TTFB, build vaqti) qayd etiladi, lekin darvozalanmaydi: qarang [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
