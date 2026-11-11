# Release-Green: candidate validation and evidence (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green ma'lum bir majburiyatni kuzatadi va uning tekshiruv natijalari haqida xabar beradi. [Sifat Geyts ma'lumotnomasi](../architecture/QUALITY_GATES.md) joriy CI profillarini, zarur tekshiruvlarni va qabul qilish siyosatini belgilaydi. Versiyalangan [qabul siyosati](../../config/quality/admission-policy.json) `Gate / CI` va `Gate / Quality` uchun bajariladigan shartnomadir.

## CI va kuzatuvchi doirasi

`ci.yml` va `quality.yml` so'rovlarni asosiy va chiqarish filiallariga qamrab oladi. Tanlangan profil qaysi ishlar qo'llanilishini belgilaydi. To'liq CI shuningdek, oddiy tortish so'rovi bajarilmaydigan qatorlarni ham o'z ichiga oladi. Tezkor kuzatuvchi natijasi bu ishlarni almashtira olmaydi va tugallangan ish jarayoni o'rami uning kvitansiyalarini almashtira olmaydi.

Ishlab chiqarish qurilishi CI tegishli. `quality.yml` da takroriy maslahat tuzilmasi yo'q. Yo'qolgan artefaktlar, bekor qilingan ish va to'liq bo'lmagan o'lchovlar muvaffaqiyatli kerakli tekshiruvni o'rnatmaydi. Natijalarni qabul qilishdan oldin joriy baza, bosh va birlashtirilgan nomzodni tasdiqlang.

## Mahalliy tasdiqlash

Bog'liqlarini tayyorlagandan so'ng, kuzatuvchini tegishli ishchi daraxtda ishga tushiring. Kuchli tekshirishdan oldin [ishchi daraxti va resurs protokolidan](WORKTREE_ISOLATION.md) foydalaning.

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

Tezkor profil qisman. To'liq profil o'zining modellashtirilgan talablarini tekshiradi va buyruq tushumlarini saqlaydi; u joylashtirishni tasdiqlamaydi yoki tegishli mezbonlik tekshiruvlarini almashtirmaydi. Hisobotda bajarilishdagi xatolik metrik driftdan farqlanadi. Tanlangan siyosatga koʻra, talab qilingan mandallar blokirovka qilinadi. O'tkinchi natijaga erishish uchun bazani ko'tarmang.

## Kechasi va qo'lda tozalash

Tungi relizlar va muvofiqlikni hal qiluvchilar kanonik reliz filialini tanlaydi. Ushbu tanlov ish oqimini ishga tushirgan filialga mos kelishi kerak va to'plamlar hodisaning o'zgarmas SHA foydalanadi. Qo'lda bajarish uchun `release_branch` da mo'ljallangan nashrni tanlang va o'sha ref bo'yicha yuboring:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

Tanlangan kodni bajarishdan oldin tarmoqlararo jo'natish rad etiladi. Xostlangan asosiy to'plamlar `main` tekshirib ko'ring va o'rnatishdan oldin uning SHA hali ham hal qilingan maqsadga mos kelishini tekshiring. Agar hal qilish paytida asosiy harakatlar bo'lsa, yangi topshiriq bo'yicha to'liq bo'lmagan tozalashni qayta bajaring. Turli nomzodlardan olingan kvitansiyalarni birlashtirmang.

## Muvaffaqiyatsizlikni aniqlash va qayta tiklash

Voqeadan diagnostika indeksi sifatida foydalaning, so'ngra aniq ishga tushirish, urinish, muvaffaqiyatsiz qadam va artefaktni tekshiring. Muvaffaqiyatsizlikni hissa qo'shuvchiga bog'lashdan oldin ekvivalent asos va nomzod dalillarni solishtiring. Infratuzilma xatolari, irsiy nuqsonlar, nomzodlarning regressiyasi va kutilayotgan tasdiqlar turli xil tuzatishlarni talab qiladi.

`/green-prs`, `/sweep-reds`, `/validate-release-green` va `/babysit` ko'nikmalari dalillarni to'playdi va hujjatlashtirilgan doirada tuzatishlar tayyorlaydi. Himoyachi kreditini saqlang, ajratilgan ta'mirlash filiallaridan foydalaning va vakolatli birlashishdan oldin barcha kerakli tekshiruvlarni tekshiring. Hech qanday avtomatik rebaseline yoki voqea yopilishi o'tgan joriy nomzod o'rniga.
