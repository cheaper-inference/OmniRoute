# Merge Queue & Manual Merge-Train Runbook (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

## Bo'shatish shoxiga qo'nish

Omni navbat `release/vX.Y.Z` ga qo'nishlarni boshqaradi. PR qo'yishdan oldin standart bo'limda `config/merge-queue/config.json` da yuqori darajadagi `mode` o'qing. [Omni-Queue](OMNI_QUEUE.md) ga qarang.

- **`shadow`** tekshirishni amalga oshiradi va qo'lda birlashtirishga qo'yadi. Yakuniy boshida tasdiqlangan PR ga `omni-queue` qo'llang. `npm run queue -- why <PR>` bilan muvofiqlikni tekshiring. `npm run queue -- history --base <branch>` o'sha boshning hukmini kuting. `would-land` bo'yicha davom eting. `culprit-found` yoki `would-dequeue` da birlashtirishni ushlab turing va sababni tuzating.
- **Soya istisnolari.** Joriy tayanch uchiga qarshi yashil rangli to'liq CI bo'lgan poezd alohida navbat hukmisiz davom etishi mumkin. Xuddi shu istisno PR boshi allaqachon joriy tayanch uchini o'z ichiga olgan bo'lsa qo'llaniladi.
- **`live`** qo'nishni boshlash uchun `omni-queue` yorlig'idan foydalanadi. Navbatning o'zi PR tushiradi. Birlashtirish buyruqlarini va navbatga to'g'ridan-to'g'ri surishlarni qoldiring.

Har bir qo'nish egasining ruxsatini va tegishli tekshiruvlarni talab qiladi. `omni-queue` faqat egasi qo'nishga ruxsat berganidan keyin qo'llang. Himoyalangan yoʻllarga tegib turgan navbatda turgan PRs ham ushbu PR uchun egasining `protected-approved` qarorini talab qiladi.

"Faol versiyada yashil eshiklar talab qilinadi" qoidalar to'plamida yashil `Gate / CI` va `Gate / Quality` boshida bo'lishi kerak. Qizil darvozani chetlab o'tish uchun hech qachon `--admin` foydalanmang. Muzlatish bloklari muzlatilgan filialga birlashadi. [Qattiq qoida 21-ga](HARD_RULES_DETAIL.md) qarang. Hech qachon boshqa seans ishlayotganini belgilamang, birlashtirmang yoki tortish so'roviga surmang. [Qattiq qoida 22-ga](HARD_RULES_DETAIL.md) qarang.

## Poezdni tortib olish so'rovi

1. Joriy reliz bazasi uchida poezd filialini ishga tushiring. Birlashtirish majburiyatlari yordamida aniq tasdiqlangan a'zolar rahbarlarini birlashtiring. Squash va rebasedan qochib, ularning sodir etilgan tarixini saqlang.
2. Poyezd filiali uchun bitta tortish so‘rovini oching. Ushbu PR joriy asosiy uchida o'zining to'liq CI bilan tasdiqlang. Qo'nishdan oldin taglik uchini va tasdiqlangan element boshlarini qayta tekshiring. Tasdiqlangan nomzod o'zgarganda poezdni va uning CI yangilang.
3. Tegishli navbat rejimida birlashma majburiyati bilan PR qo‘shing. Jonli rejimda navbatning `merge-ff` qo'nish usuli birlashma majburiyatlarini saqlab qoladi. Asl a'zo boshlariga reliz bo'limidan kirish mumkin bo'ladi. GitHub PRs a'zosini birlashtirilgan deb belgilaydi va majburiyatlar o'z mualliflarini saqlab qoladi.

Ommaviy misol [PR #21071](https://github.com/cheaper-inference/OmniRoute/pull/21071). U 18 a'zo PRs birlashtirdi va 2026-11-24 da birlashish majburiyati bilan qo'ndi.

`main` dan keyingi reliz filialiga sinxronlash ham birlashma majburiyati orqali amalga oshiriladi. Keyingi sinxronlashlar uchun `main` nasl-nasabini saqlab qolish talab qilinadi. [Ish daraxti izolyatsiyasiga](WORKTREE_ISOLATION.md#sync-back-landings-are-merge-commits-never-squash) qarang.

## Mahalliy birlashma-poezd validatori

```bash
scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
```

Validator taglik va PR boshlarini oladi va ularni bir martalik ishchi daraxtda birlashtiradi. Olingan daraxtda bir marta paritet to'plamini boshqaradi. Muvaffaqiyatsiz bosh olib kelish yoki birlashtirish nizosi bu PR chiqaradi va skript qolgan PRs bilan davom etadi.

- **`--plan`** tanlangan rejim qadamlarini chop etadi va ishchi daraxtini yaratmasdan yoki masofadan boshqarish pultiga murojaat qilmasdan chiqadi. Tez rejani tekshirish uchun uni `--fast` bilan birlashtiring.
- **`--fast`** umumiy statik eshiklarni, `tests/unit/` va `npm run test:vitest` ostida tanlangan o'zgartirilgan `node:test` fayllarini ishga tushiradi. Tez rejimdan foydalanganda to'plangan uchida kuniga kamida bir marta to'liq mahalliy tekshirishni bajaring.
- **To'liq rejim** faqat to'liq statik eshiklarni qo'shadi va `npm run test:unit` va `npm run test:vitest` ishga tushiradi.

Agar asosiy zond mavjud bo'lsa, ishlamay qolgan statik eshik tegilmagan bazada qayta ishga tushiriladi. Skript meros qilib olingan nosozliklar haqida xabar beradi va har bir tan olingan qoidabuzarlik qatori bazada paydo bo'lganda va umumiy soni o'smaganda davom etadi.

| Chiqish | Ma'nosi                                                                                                                                                                           |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`     | Rejani chop etdi yoki to'plamni yakunladi. To'plamning xulosasida meros qilib olingan statik nosozliklar va chiqarilgan PRs ro'yxati keltirilgan.                                 |
| `1`     | Argumentlar noto‘g‘ri, Git hisobi yo‘q, oldindan parvoz amalga oshmadi yoki PR bortiga kirmadi.                                                                                   |
| `2`     | To'plam tekshiruvi muvaffaqiyatsiz tugadi va meros sifatida qabul qilinmadi. Operator to'plamni ikkiga bo'lishi, buzuvchi PR chiqarib tashlashi va qayta ishga tushirishi mumkin. |

Mahalliy ruxsatnoma faqat egasining ma'lumotlari uchun diagnostik dalillarni taqdim etadi. Har bir qo'nish uchun hali ham egasining ruxsati, o'zining zarur tekshiruvlari va tegishli bo'lsa, soya navbatining hukmi talab qilinadi.

## Bog'lanish

- **PR uchun.** CI va Sifat tanlovi o'zgartirilgan yo'llar asosida tekshiriladi. Kod PRs tez sifatli eshiklar va ta'sirli testlarni amalga oshiradi, CI ichida alohida birlik va Vitest ishlari bilan.
- **Navbat bo'yicha nomzod.** CI va Sifat oʻz navbati boʻyicha tuzilgan nomzod uchun toʻliq profilni ishga tushiradi.
- **Chiqarish uchun maslahat.** Release-Green o'zining yo'l filtrlariga mos keladigan surishlarda tezkor qattiq eshiklarni ishga tushiradi. Kuniga uchta rejalashtirilgan yugurish relizlar bo'limi uchun to'liq tekshirishdan foydalanadi.
- **Chiqarish uchun.** To'liq CI matritsasi E2E shardlarini, paketlarni tekshirishni, tarball yuklash tutunini va qamrovni tekshirishni o'z ichiga oladi. [Chiqarish nazorat ro'yxatiga](RELEASE_CHECKLIST.md) qarang.

## `merge-train.sh` uchun yangi hisob-kitob shartlari

Preflight ishchi daraxtlarni yaratishdan oldin ishlaydi. `npm ci` bilan bog'liqliklarni o'rnating. `node_modules/.bin/tsc` bajariladigan va `node_modules/node_modules` mavjud emasligini tasdiqlang. `node_modules/.bin/bun --version` muvaffaqiyatli ekanligini tekshiring.

Agar Bun keyingi o'rnatish o'tkazib yuborilgan bo'lsa, `(cd node_modules/bun && node install.js)` ishga tushiring. Provayderning muvofiqligi va ma'lum belgilar tekshiruvi Bun foydalanadi. Validator `npm run check:cycles:ratchet` blokirovka qiluvchi eshik sifatida ishlaydi. Mustaqil `npm run check:cycles` buyrug'i maslahatdir.

## Tarix

Birlashtirish navbati 2026-11-19 da tugatilgan.
