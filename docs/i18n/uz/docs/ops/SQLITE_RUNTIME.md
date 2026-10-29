# SQLite Runtime Resolution (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ishga tushish vaqtida SQLite drayverini 5 bosqichli zaxira variantlar zanjiri orqali aniqlaydi:

1. **Birga yetkazib beriladigan `better-sqlite3`** (`package.json` ichidagi `dependencies` orqali)
   — eng tezkor variant, mahalliy ikkilik fayl; yaratish vositalari mavjud bo‘lsa, `npm install` orqali o‘rnatiladi.

2. **Ishlash vaqtida o‘rnatiladigan `better-sqlite3`** (`~/.omniroute/runtime/` ichida)
   — birinchi ishga tushirishda **YOKI** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` orqali zaruratga qarab o‘rnatiladi.
   Yuklashdan oldin mahalliy `.node` faylining signatura baytlarini (ELF / Mach-O / PE) tekshiradi,
   bu buzilgan yoki noto‘g‘ri platformaga mo‘ljallangan ikkilik fayllardan himoya qiladi.

3. **`node:sqlite`** (Node ≥22.5 standart kutubxonasi) — mahalliy yaratish talab qilinmaydi; har ikkala
   better-sqlite3 yo‘li ham ishlamasa qo‘llanadi. Imkoniyatlari cheklangan.

4. **`sql.js`** (WASM) — so‘nggi zaxira variant. Hamma joyda ishlaydi, ammo sekinroq
   va ma’lumotlarni sinxron tarzda emas, ma’lum oraliqlarda yozadi.

## Nega bu qadar murakkab?

- **Windows EBUSY**: agar oldingi versiyaning `better_sqlite3.node` fayli ishlayotgan jarayon tomonidan
  qulflangan bo‘lsa, `npm install -g omniroute@latest` muvaffaqiyatsiz tugashi mumkin. `~/.omniroute/runtime/`
  ichidagi ish vaqti o‘rnatmasi global npm keshini chetlab o‘tadi.
- **Yaratish vositalari yo‘q**: ayrim muhitlar (VS Build Tools mavjud bo‘lmagan korporativ Windows,
  minimal Docker tasvirlari) `better-sqlite3` paketini kompilyatsiya qila olmaydi. Ish vaqti
  o‘rnatuvchisi npm reyestridan oldindan yaratilgan ikkilik faylni oladi; bu ham ishlamasa,
  zaxira drayverlar OmniRoute baribir ishga tushishini ta’minlaydi.
- **Tarmoqdan uzilgan tizimlar**: npm reyestriga ulanib bo‘lmasa, `node:sqlite`
  yoki `sql.js` asosiy funksionallikni kafolatlaydi.

## Signatura baytlarini tekshirish

Ishlash vaqtida o‘rnatilgan `.node` faylini yuklashdan oldin OmniRoute dastlabki 8
baytni o‘qiydi va ularni ma’lum platforma signaturalari bilan solishtiradi:

| Platforma             | Baytlar (hex) | Yorliq      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Signatura mos kelmasa → fayl e’tiborga olinmaydi, zaxira zanjiri keyingi bosqichga o‘tadi.

## Faol drayverni tekshirish

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Qo‘lda boshqarish

```bash
# Tezkor CI o‘rnatmalari uchun o‘rnatishdan keyingi dastlabki tayyorlashni o‘tkazib yuborish
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Ish vaqtidagi better-sqlite3 paketini majburan qayta o‘rnatish
rm -rf ~/.omniroute/runtime
omniroute  # keyingi ishga tushirishda qayta o‘rnatiladi

# Qaysi drayver faol ekanini tekshirish
omniroute config db-info  # (agar CLI buyrug‘i mavjud bo‘lsa)
```

## Sinxron to‘xtab qolishlarni aniqlash

`better-sqlite3` bilan sinxron adapter vaqtini o‘lchashni yoqish uchun ishga tushirishdan oldin
`OMNIROUTE_SQLITE_SLOW_MS=200` ni o‘rnating. Standart holatda bu o‘chirilgan. Bajarilishi
kamida shuncha millisekund davom etgan operatsiya har bir adapter uchun o‘n soniyada ko‘pi
bilan bir marta `[SQLITE-SLOW]` ogohlantirishini chiqaradi. Ogohlantirish faqat drayver,
operatsiya turi (`prepare`, `get`, `all`, `run`, `exec`, `pragma`, tranzaksiya yoki texnik xizmat)
va o‘tgan millisekundlar sonini o‘z ichiga oladi: SQL, bog‘lanmalar, qatorlar, yo‘llar yoki
istisno matni kiritilmaydi.

Bu taym-aut yoki so‘rovni optimallashtirish vositasi emas, balki diagnostika yordamchisidir.
U hech qachon qaytmaydigan operatsiya haqida xabar bera olmaydi, protsessor ishini disk kutishidan
ajrata olmaydi, aniq SQL so‘rovini aniqlay olmaydi yoki drayverning bevosita deskriptori orqali
bajarilgan operatsiyalarni kuzata olmaydi. Asinxron zaxiralash davomiyligi ataylab hisobga
olinmaydi; boshqa SQLite drayverlari ushbu ixtiyoriy kuzatuv bilan jihozlanmagan. O‘zgaruvchini
o‘chirib qo‘yish vaqt o‘lchash o‘ramlarisiz asl adapterni tiklaydi. Ma’lumotlar bazasi sxemasi
yoki saqlangan konfiguratsiya o‘zgarmaydi.

`/healthz` kechikish ogohlantirishi butun ishlash davridagi o‘rtacha qiymatni emas, avvalgi
namunadan keyingi hodisalar siklining eng yuqori kechikishini bildiradi. To‘xtab qolishni SQLite
yoki disk nosozligi bilan bog‘lashdan oldin uning vaqt belgilarini sekin operatsiya
ogohlantirishlari hamda xost/xotira qurilmasi ko‘rsatkichlari bilan solishtiring.

## Ma’lumotnoma

Amalga oshirish:

- `bin/cli/runtime/magicBytes.mjs` — ikkilik signatura baytlarini tekshirish yordamchilari
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 bosqichli ish vaqti aniqlagichi + zaruratga qarab o‘rnatuvchi
- `bin/cli/runtime/index.mjs` — ishga tushirish orkestratori (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm o‘rnatishdan keyingi xuki (xatolik yuz bersa ham davom etuvchi dastlabki tayyorlash)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` eksportlari

## Yagona yozuvchi topologiyasi (HA qo‘llab-quvvatlanmaydi)

Yuqoridagi drayver zaxira zanjiri baribir **bitta jarayonda** ishlaydi. Standart SQLite
bilan OmniRoute **yagona yozuvchi** hisoblanadi:

- Bitta `storage.sqlite` fayliga ikkita OmniRoute replikasini ulamang.
- Konteynerning qayta ishga tushishi, Recreate joylashtirishi, OOM tufayli to‘xtatilishi yoki HEALTHCHECK
  qayta ishga tushirishi bajarilayotgan barcha SSE seanslarini uzadi. Standart yo‘lda seanslarni
  bosqichma-bosqich yakunlash mavjud emas.
- Sekin ishlayotgan `/healthz` ni ishlamay qolgan deb hisoblaydigan orkestratorning faoliyat tekshiruvi
  yagona replikani to‘xtatadi. TCP faoliyat tekshiruvi + HTTP `/healthz` tayyorlik tekshiruvini afzal
  ko‘ring. [Docker qo‘llanmasi — mavjudlik](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  va [Kubernetes tekshiruvlari bo‘yicha tavsiyalar](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)ga qarang.
