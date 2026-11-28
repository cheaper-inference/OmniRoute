# 🗜️ Prompt Compression Guide — OmniRoute (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Mos kontekstda avtomatik ravishda 15–95% tejang. Qisqacha umumiy maʼlumot uchun [README siqish bo‘limi](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)ga qarang.

## Umumiy ko‘rinish

OmniRoute so‘rovlar yuqori oqimdagi provayderlarga yetib borishidan **oldin** proaktiv tarzda ishlaydigan modulli prompt siqish konveyerini amalga oshiradi. Bu tokenlarni tejash jarayoni shaffof tarzda bajarilishini anglatadi — ish jarayoningizni o‘zgartirish shart emas.

```
Mijoz so‘rovi
  → Siqish strategiyasi selektori
    → Kombinatsiya ustuvor sozlamasi bormi? → Kombinatsiya sozlamasidan foydalanish
    → Avtomatik ishga tushirish chegarasimi? → Avtomatik rejimdan foydalanish
    → Standart rejimmi? → Global sozlamadan foydalanish
    → O‘chirilganmi? → Siqishni o‘tkazib yuborish
  → Tanlangan siqish rejimi
    → Off: Siqish yo‘q
    → Lite: Xavfsiz bo‘shliq/formatlashni tozalash (~15%)
    → Standard: Caveman uslubida ortiqcha so‘zlarni olib tashlash (~30%)
    → Aggressive: Tarixni eskirtirish + umumlashtirish (~50%)
    → Ultra: Evristik qisqartirish + kod bloklarini siyraklashtirish (~75%)
    → RTK: Buyruqlarni hisobga olgan terminal/vosita chiqishini filtrlash (yuqori oqimda 60–90% diapazon)
    → Stacked: Tartiblangan ko‘p mexanizmli konveyer, odatda RTK, so‘ng Caveman (mos kontekstda 78–95% diapazon)
  → Siqilgan so‘rov → Provayder
```

---

## Siqish rejimlari

### O‘chirilgan

Hech qanday siqish qo‘llanmaydi. Barcha xabarlar o‘zgartirilmagan holda uzatiladi.

### Lite rejimi (~15% tejalish, <1ms kechikish)

Eng xavfsiz rejim — formatlashni tozalash. Uning vosita natijalarini qisqartirishi yo‘qotishli bo‘lgani sababli, standart yo‘l (`allow-lossy`, `engine:lite` yoki nomlangan kombinatsiyaga aniq qo‘shilishsiz) `compressToolResults: false` bilan lite rejimida ishlaydi: avvalgi vosita natijalari provayderga o‘zgartirilmagan holda yetib boradi.

| Usul                     | Tavsif                                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Ketma-ket bo‘sh qatorlar va oxiridagi bo‘sh joylarni birlashtirish                                                |
| `dedupSystemPrompt`      | Takroriy tizim xabarlarini olib tashlash                                                                          |
| `compressToolResults`    | Avvalgi vosita natijalarini lite chegarasigacha qisqartirish (yo‘qotishli: faqat so‘rov orqali ruxsat berilganda) |
| `removeRedundantContent` | Takroriy ko‘rsatmalarni olib tashlash                                                                             |
| `replaceImageUrls`       | Base64 tasvir ma’lumotlari URI’larini qisqartirish                                                                |

**Quyidagilar uchun eng ma’qul:** Har doim yoqilgan foydalanish, xavfsizlik muhim bo‘lgan ish jarayonlari.

### Standard rejimi (~30% tejalish)

[Caveman](https://github.com/JuliusBrussee/caveman) dan ilhomlangan — ma’noni saqlagan holda to‘ldiruvchi so‘zlar va sergap iboralarni olib tashlaydi:

- To‘ldiruvchi so‘zlarni olib tashlaydi ("please", "I think", "basically", "actually")
- Serhasham iboralarni ixchamlashtiradi ("in order to" → "to", "as a result of" → "because")
- Muloyim ehtiyotkor iboralarni olib tashlaydi ("Would you mind...", "If you could possibly...")
- Kodlash so‘rovlari uchun moslashtirilgan 30 dan ortiq regex qoidalaridan foydalanadi

**Quyidagilar uchun eng ma’qul:** Kundalik kodlash ish jarayonlari, xarajatlarni tejashga e’tibor beradigan jamoalar.

### Aggressive rejimi (~50% tejalish)

Uzoq sessiyalar uchun aqlli tarix boshqaruvi:

- **Xabarlarni eskirtirish** — eski xabarlar bosqichma-bosqich siqiladi
- **Vositа natijalarini siqish** — uzun vosita chiqishlari qisqartiriladi yoki olib tashlanadi (birinchi/oxirgi qatorlar,
  moslik qatorlarini filtrlash, JSON kalitlarini ixchamlashtirish)
- **Strukturaviy yaxlitlik himoyalari** — `tool_use` + `tool_result` juftliklari izchil qolishini ta’minlaydi
- **Kontekst oynasidan xabardorlik** — har bir model uchun token cheklovlariga rioya qiladi

**Quyidagilar uchun eng ma’qul:** Uzoq davom etadigan nosozliklarni tuzatish sessiyalari, katta kod bazalari.

### Ultra rejimi (~75% tejalish)

Tokenlar muhim bo‘lgan vaziyatlar uchun maksimal siqish:

- **Evristik qisqartirish** — matn tokenlarini ball asosida qisqartirish
- **Strukturani saqlash** — bloklangan kod qismlari, ichki kod, URL’lar va identifikatorlar tombstone qilinadi va so‘zma-so‘z qayta tiklanadi, hech qachon qisqartirilmaydi
- **Ixtiyoriy SLM darajasi** — sozlanganda kichik lokal model qisqartirishni takomillashtirishi mumkin
- Aggressive rejimdan mustaqil: u xabarlarni eskirtirish, vosita natijalarini siqish yoki zaxira summarizatorni ishga tushirmaydi (faqat SLM darajasidagi nosozlik zaxira jarayonini aggressive orqali yo‘naltirishi mumkin)

**Quyidagilar uchun eng ma’qul:** Kontekst cheklovlariga qayta-qayta duch kelganda.

### RTK rejimi (yuqori oqimda 60–90%)

RTK rejimi kodlash agenti sessiyalarida uchraydigan sergap vosita chiqishlari uchun optimallashtirilgan:

- `git status`, `git diff`, `git log`, test runner’lari,
  TypeScript/Vite/Webpack build’lari, ESLint/Biome/Prettier, npm audit/o‘rnatishlari, Docker log’lari, infratuzilma
  chiqishlari va umumiy shell chiqishi kabi buyruq/chiqish sinflarini aniqlaydi
- `open-sse/services/compression/engines/rtk/filters/` ichidagi JSON filtr to‘plamlarini qo‘llaydi
- Inline-test
  tekshiruvi va loyiha fayllari uchun ishonch nazorati bilan loyiha yoki global `filters.toml` fayllaridan RTK TOML sxemasi v1 filtrlarini import qiladi
- Inline tekshiruv namunalari bilan birga 56 ta o‘rnatilgan filtrni taqdim etadi
- ANSI boshqaruv ketma-ketliklari, jarayon indikatorlari, takroriy qatorlar va amaliy qiymatga ega bo‘lmagan shovqinni olib tashlaydi
- Muvaffaqiyatsizliklar, xatolar, ogohlantirishlar, o‘zgargan fayllar, xulosalar va uzun chiqishlarning oxirgi qismini saqlab qoladi
- Ishonch nazoratidagi loyiha filtrlari, global filtrlar va ixtiyoriy redaktsiya qilingan xom chiqishni tiklashni qo‘llab-quvvatlaydi

**Quyidagilar uchun eng ma’qul:** Shell, build, test, git, grep va fayl chiqishlari transkriptlariga ega agent sessiyalari.

### Birlashtirilgan rejim (mos keladigan diapazonda 78–95%)

Birlashtirilgan rejim bir nechta siqish mexanizmlarini deterministik tartibda ishga tushiradi. Standart konveyer:

```txt
RTK -> Caveman
```

Bu tartib avval terminal/vosita chiqishini ixchamlashtiradi, so‘ng qolgan tabiiy til so‘roviga Caveman semantik ixchamlashtirishini qo‘llaydi. Birlashtirilgan konveyerlar global miqyosda yoki marshrutlash kombinatsiyalariga biriktirilgan siqish kombinatsiyalari orqali sozlanishi mumkin.

**Quyidagilar uchun eng ma’qul:** Katta vosita loglari hamda inson ko‘rsatmalari yoki yordamchi xulosalarini o‘z ichiga olgan aralash kontekst.

## Yuqori oqimdagi tejash hisobi

OmniRoute siqish orqali tejash ko‘rsatkichlarini ikki manba asosida hujjatlashtiradi: yuqori oqimdagi loyiha benchmarklari va
OmniRoute’ning o‘z dvigatellar kompozitsiyasi.

| Manba   | Bu yerda ishlatilgan yuqori oqim README ko‘rsatkichi                                                                                    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | chiqish tokenlari `~75%` kamroq, benchmark bo‘yicha o‘rtacha chiqish tejami `65%`, diapazon `22-87%` va kirishni `~46%` siquvchi vosita |
| RTK     | buyruq chiqishida `60-90%` tejash; namunaviy seansda `~118,000 -> ~23,900` token yoki `79.7%` tejash (`~80%`)                           |

Bir-birini qoplaydigan vosita/kontekst yuklamalari uchun standart OmniRoute kombinatsiyasi dvigatellarni ketma-ket qo‘llaydi:

```txt
RTK -> Caveman
```

Umumiy tejash qo‘shilmaydi, balki ko‘paytirish orqali hisoblanadi:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Bu `78-95%` ko‘rsatkichi RTK va Caveman bir xil kirish/kontekst yuklamasini qisqartira olgan hollarda amal qiladi.
Caveman javob chiqishi rejimi alohida: u yoqilganda Caveman’ning o‘z chiqish tejash ko‘rsatkichlaridan foydalaning (o‘rtacha `65%`,
asosiy ko‘rsatkich `~75%`, diapazon `22-87%`). Umumiy hisob-kitob tejami prompt va chiqish nisbatiga bog‘liq.

### “Mos keladigan” aslida nimani anglatadi

15-95% asosiy diapazoni haqiqiy, ammo u faqat **takroriy yoki ortiqcha batafsil** kontentga — takrorlangan
xato satrlari, bir xil ogohlantirishni qayta-qayta chiqaradigan build logi, haddan tashqari katta `grep`/faylni o‘qish natijasiga taalluqli.
Bu **har bir** so‘rov shuncha tejaydi degani emas.

Empirik tarzda tasdiqlangan (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): 300 ta bir xil
xato satridan iborat Anthropic shaklidagi `tool_result` blokida `stacked` (RTK + Caveman) ishga tushirilganda
**tokenlar bo‘yicha 95.93% tejash / belgilar bo‘yicha 96.26% tejash** kuzatildi — bu e’lon qilingan
diapazonga to‘liq mos keladi. Ammo ayni konveyer odatiy, takroriy bo‘lmagan vosita chiqishida (toza `grep` mosliklari ro‘yxati,
qisqa fayl o‘qilishi, oddiy suhbat matni) to‘g‘ri ravishda **deyarli nol tejash** beradi, chunki
olib tashlash uchun takroriy hech narsa yo‘q va `validateCompression()` (`validation.ts`) kod bloklari, URL manzillari,
sarlavhalar, versiyalar yoki BARCHA-HARFLARI-KATTA konstanta identifikatorlarini tushirib qoldiradigan yoxud o‘zgartiradigan
qayta yozilgan natijani yuborishni rad etadi.

Bu kutilgan, xavfsiz xatti-harakatdir, xato emas: asosan toza fayllarni o‘qiydigan yoki `grep` orqali qidiradigan dasturlash seansi,
siqish to‘liq yoqilgan bo‘lsa ham, kamtarona umumiy tejashni ko‘radi; muvaffaqiyatsiz takroriy siklga yoki
sergap linterga duch kelgan seans esa bunday trafikda to‘liq 78-95% diapazonni ko‘radi. Bitta seansdagi
past umumiy tejash foizini siqish noto‘g‘ri sozlanganining dalili sifatida qabul qilmang — avval
asosiy vosita chiqishi haqiqatan ham takroriy bo‘lgan-bo‘lmaganini tekshiring.

---

## Token tejash vizualizatsiyasi

```
Siqishsiz:               LLM’ga 47K token yuboriladi
Lite bilan:              40K token yuboriladi          (15% tejash — xavfsiz, doimo yoqilgan)
Standard bilan:          33K token yuboriladi          (30% tejash — caveman-speak qoidalari)
Aggressive bilan:        24K token yuboriladi          (50% tejash — eskirish + umumlashtirish)
Ultra bilan:             12K token yuboriladi          (75% tejash — evristik saralash)
RTK bilan:               19K-5K token yuboriladi       (buyruq/vosita chiqishida 60-90% tejash)
Stacked bilan:           10K-2.5K token yuboriladi     (mos keladigan RTK+Caveman diapazoni 78-95%)
```

---

## Konfiguratsiya

### Boshqaruv paneli

`Dashboard → Context & Cache` bo‘limiga o‘ting:

- **Caveman** — rejim tanlovi, til paketlari, oldindan ko‘rish va global standartlar
- **RTK** — buyruq filtri oldindan ko‘rishi, RTK xavfsizlik sozlamalari va filtr katalogi
- **Compression Combos** — marshrutlash kombinatsiyalariga biriktirilgan nomlangan dvigatel konveyerlari
- **Auto-Trigger Threshold** — tokenlar soni belgilangan chegaradan oshganda siqishni avtomatik yoqish

### Har bir kombinatsiya uchun qayta belgilash

`Dashboard → Context & Cache → Compression Combos` bo‘limida marshrutlash
kombinatsiyasiga siqish kombinatsiyasini biriktiring:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu pulli obunalarda lite rejimini saqlagan holda, bepul/kodlash provayderlarida bosqichma-bosqich
siqishdan foydalanish imkonini beradi.

Ushbu "Per-Combo Override" biriktiruvi **routing-combo compression
mode** qayta belgilashidan (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — maydon sxemasi
`rtk`, `stacked` va `omniglyph` qiymatlarini ham qabul qiladi) farqli boshqaruv vositasidir — bu qayta
belgilash nomlangan siqish kombinatsiyasi konveyerini tanlamaydi; u faqat
`resolveCompressionPlan` tomonidan foydalaniladigan `compressionMode` maydonini o‘rnatadi. Uni
kombinatsiya kartasida (`Dashboard → Combos`) yoki #6760 versiyasidan boshlab,
yuqorida hujjatlashtirilgan konveyerga biriktirish katagi yonidagi
`Dashboard → Context & Cache → Compression Combos` bo‘limidagi "Assign to routing" ro‘yxatida
har bir marshrutlash kombinatsiyasi uchun o‘rnatish mumkin. Har ikkala interfeys ham bir xil
`PUT /api/combos/{id}` endpointi orqali saqlanadi.

### Har bir so‘rov uchun qayta belgilash

Bitta so‘rov uchun siqish rejasini qayta belgilash uchun `x-omniroute-compression` so‘rov
sarlavhasini yuboring. U eng yuqori ustuvorlikka ega — marshrutlash kombinatsiyasi qayta belgilanishi,
faol profil, avtomatik ishga tushirish va paneldagi Default qiymatidan ustun turadi. Noma’lum qiymatlar
e’tiborsiz qoldiriladi (so‘rov hech qachon rad etilmaydi) va global asosiy kalit baribir hammasini
boshqaradi: siqish global ravishda o‘chirilganida, sarlavha uni yoqa olmaydi. Qiymatlar:

| Qiymat        | Ta’siri                                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Ushbu so‘rov uchun siqish amalga oshirilmaydi.                                                                                    |
| `default`     | Paneldan olingan Default profili (faol profil e’tiborga olinmaydi). Yo‘qotishli dvigatellar o‘chiq qoladi.                        |
| `safe`        | Sarlavhani kiritmaslik bilan bir xil.                                                                                             |
| `allow-lossy` | Ushbu so‘rovning operator rejasini, jumladan xulosalar, relevatlik filtrlari va uslub qayta yozishlarini saqlab qoladi.           |
| `engine:<id>` | Yoqilganida bitta dvigatel, masalan, `engine:rtk`. Bu ushbu dvigatel uchun so‘rov darajasidagi aniq yoqishdir.                    |
| `<combo>`     | Nomi bo‘yicha (katta-kichik harflarni farqlamasdan), keyin esa identifikatori bo‘yicha moslashtiriladigan nomlangan kombinatsiya. |

`allow-lossy`, `engine:<id>` yoki nomlangan kombinatsiyasiz yo‘qotishli dvigatellar qo‘llanmaydi. Yo‘qotishli
Default, avtomatik ishga tushirish yoki marshrutlash qayta belgilanishi pasaytirilganda, OmniRoute
sozlangan bosqichma-bosqich konveyerdan tanilgan yo‘qotishsiz bosqichlarni sozlangan tartibda saqlab
qoladi. `session-dedup → lite` zaxira variantiga faqat sozlangan yo‘qotishsiz bosqichlardan hech biri
saqlanib qolmaganda o‘tiladi.

Sozlamalar panelidagi **Effective pipeline** oldindan ko‘rishi odatiy saqlangan holatdagi rejani
ko‘rsatadi. Avtomatik ishga tushirish bajarilishi mumkin bo‘lganda, xuddi shu oldindan ko‘rish uning
shartli samarali konveyerini ham ko‘rsatadi, shuning uchun panel va sarlavhasiz ish vaqtidagi
aniqlash bir-biriga mos bo‘lib qoladi.

Qo‘llangan reja `X-OmniRoute-Compression: <mode>; source=<source>` javob
sarlavhasida qaytariladi; bunda `<source>` quyidagilardan biri bo‘ladi:
`request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` yoki `off`.

### API

```bash
# Siqish sozlamalarini olish
curl http://localhost:20128/api/settings/compression

# Siqish sozlamalarini yangilash
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Muayyan RTK/stacked foydali yuklamasini oldindan ko‘rish
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK filtr paketlarini ro‘yxatlash
curl http://localhost:20128/api/context/rtk/filters

# Ixtiyoriy buyruq metama’lumotlari bilan RTK’ni bevosita sinash
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Nimalar himoyalanadi

Siqish mexanizmi **har doim quyidagilarni saqlab qoladi:**

- ✅ Kod bloklari (chegaralangan va qator ichidagi)
- ✅ URL manzillar va fayl yoʻllari
- ✅ JSON tuzilmalari va tuzilmaviy maʼlumotlar
- ✅ Identifikatorlar va himoyalangan texnik tokenlar
- ✅ Matematik ifodalar
- ✅ Vosita/funksiya chaqiruv taʼriflari
- ✅ Tizim promptlari (lite rejimida)

RTK xom chiqishni tiklash mexanizmi biror narsa saqlanishidan oldin keng tarqalgan API kalitlari, bearer tokenlari, Slack tokenlari, AWS kirish kalitlari,
parollar, tokenlar va maxfiy maʼlumotlarni tahrirlab yashiradi.

---

## Siqish statistikasi

Har bir siqilgan soʻrov server jurnallarida statistikani oʻz ichiga oladi:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Bosqichlar yoʻl xaritasi

| Bosqich    | Rejimlar                                                                                                                                                                            | Holat          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| 1-bosqich  | Oʻchirilgan, Lite                                                                                                                                                                   | ✅ Chiqarilgan |
| 2-bosqich  | Standard, Aggressive, Ultra                                                                                                                                                         | ✅ Chiqarilgan |
| 3-bosqich  | RTK, Stacked, siqish kombinatsiyalari                                                                                                                                               | ✅ Chiqarilgan |
| 4-bosqich  | Chiqish uslublari, SLM darajasidagi Ultra, baholash infratuzilmasi                                                                                                                  | ✅ Chiqarilgan |
| 4C-bosqich | Moslashuvchan kontekst budjeti ("regulyator") — hisoblash mexanizmi + API (`PUT /api/settings/compression` dagi `contextBudget`) + boshqaruv panelidagi rejim/siyosat boshqaruvlari | ✅ Chiqarilgan |

---

## Minnatdorchilik

Standard rejimidagi siqish qoidalari **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) tomonidan yaratilgan **[Caveman](https://github.com/JuliusBrussee/caveman)** — ommalashgan "kam token ishni bajarsa, nega koʻp token ishlatish kerak" loyihasidan ilhomlangan. Caveman chiqish tokenlari `~75%` ga kamayishi, sinovlar boʻyicha chiqishdagi oʻrtacha `65%` tejamkorlik, chiqishdagi `22-87%` diapazon va kirishni siqish vositasi bilan `~46%` tejamkorlik haqida xabar beradi.

RTK rejimi **[RTK AI](https://github.com/rtk-ai)** tomonidan yaratilgan **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — terminal, yigʻish, sinov, git va vosita chiqishlarini filtrlash uchun moʻljallangan yuqori unumli buyruq chiqishini siqish loyihasidan ilhomlangan. RTK `60-90%` tejamkorlik haqida xabar beradi, uning README faylidagi namunaviy seans esa `~80%` tejalganini koʻrsatadi.

---

## Murakkab siqish tizimlari

Yuqorida tavsiflangan 7 ta rejimdan tashqari (manba `codex-responses` va `omniglyph` rejimlarini ham qabul qiladi, bu yoʻriqnomada ularga yoʻl qoʻyilmaydi), quyidagi boʻlimlar ushbu rejimlar ichida yoki yonida ishlaydigan funksiyalarni qamrab oladi: Asbob natijalarini siqish va progressiv qarish agressiv dvigatelning 1 va 2-bosqichlaridir (Agressiv rejim va stacked pipelinening `aggressive` qadami), Siqish yoqilgan paytda keshlash provayderlari uchun keshlash `aggressive` va `ultra` ni `standard` ga pasaytiradi va Caveman Chiqish rejimi va Chiqish uslublari sukut bo‘yicha o‘chirib qo‘yiladigan tizimga oid ko‘rsatmalar bo‘lib, so‘rovni siqish o‘rniga modelning chiqishini shakllantiradi.

### Keshdan xabardor siqish

Ba'zi provayderlar (masalan, tezkor keshlash bilan Anthropic ) qo'llab-quvvatlaydi** tezkor keshlash** , bu esa xarajatlar va kechikishni kamaytirish uchun taklif qismlarini keshlash imkonini beradi. Keshlash yoqilganda, tajovuzkor siqish aslida mumkin** og'riydi** ishlash, chunki u keshlangan tokenlarni o'zgartirib, keshni bekor qiladi.

`cachingAware.ts` moduli buni hal qiladi** keshlash kontekstini aniqlash** va** siqish strategiyasini sozlash** mos ravishda.

#### Bu qanday ishlaydi

1. **Keshlash kontekstini aniqlash** — `cache_control` markerlari uchun so‘rov tanasini skanerlaydi
2. **Keshlash provayderlarini aniqlang** — Maqsadli provayder keshlashni qo'llab-quvvatlashini tekshiradi
3. **Strategiyani sozlash** — keshlash provayderlari uchun `aggressive`/`ultra` versiyasini `standard` ga pasaytiradi
4. **Tizim soʻrovini oʻtkazib yuborish** — Tizim takliflari odatda keshlanadi, shuning uchun ularni siqmang

Strategiya yordamchisi ham `deterministicOnly` bayrog'ini qaytaradi, lekin reja tuzuvchisi faqat strategiyani iste'mol qiladi — quyi oqimda hech narsa bugun bayroqni o'qimaydi.

#### Kod misoli

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Qachon foydalanish kerak

Kesh-xabarli siqish** doim yoniq** — hech qanday konfiguratsiya kerak emas. U har doim siqish yoqilganda ishga tushadi va maqsadli provayder tezkor keshlashni qo'llab-quvvatlaydi (Anthropic, OpenAI va boshqalar); aniq `cache_control` markerlari talab qilinmaydi — faqat keshlash provayderi pasaytirishni ishga tushiradi va faqat markerlar hech qachon bunday qilmaydi (markerni aniqlash strategiya qarorini emas, kesh telemetriyasini ta'minlaydi).

OpenRouter faqat `anthropic/*` modellari uchun keshlash provayderi sifatida hisoblanadi: Claude Code so‘rovlari `cache_control` to‘xtash nuqtalarini (ko‘pi bilan 4 ta) saqlaydi va qo‘riqchi prefiksni himoya qiladi, boshqa har bir OpenRouter oilasi (`openai/`, `google/`, `qwen/`, …) tozalangan va himoyalanmagan holda qoladi.

### Progressiv qarish

Uzoq suhbatlarda ko'plab xabarlar to'planadi, lekin eski navbatlar ahamiyatsiz bo'lib qoladi. `progressiveAging.ts` moduli** burilish masofasi bo'yicha xabarlarni yomonlashtiradi** (suhbat oxiridan o'lchanadigan masofa). Yuborilgan standart sozlamalar bilan (`verbatim: 2, light: 2, moderate: 3`):

- **Oxirgi 2 burilish (masofa ≤ 2)** : So'zma-so'z saqlanadi
- **Masofa 3** : Caveman siqish (plomba olib tashlash)
- **Masofa 4 +** : Yordamchi xabarlari umumlashtiriladi; foydalanuvchi xabarlari birinchi qatorga qisqartirildi, 120 belgi bilan cheklandi; boshqa rollar tegmagan. Tizim ko'rsatmalari, allaqachon eskirgan xabarlar va oxirgi foydalanuvchi xabari masofadan qat'iy nazar har doim so'zma-so'z saqlanadi. Hech narsa to'g'ridan-to'g'ri tashlab qo'yilmaydi va `light` diapazoni jo'natilgan standart sozlamalar bilan bog'lanib bo'lmaydi (`light` `verbatim` teng).

#### Kod misoli

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Qachon foydalanish kerak

Progressiv qarish** doim yoniq** `aggressive` rejimi — uchun bu `compressAggressive()` ning 2-bosqichidir. Ultra rejimi uni ishga tushirmaydi. Bu, ayniqsa, samarali:

- Uzoq muddatli kodlash seanslari
- Ko'p kunlik suhbatlar
- Ko'p vosita chaqiruvlari bilan agentlik ish oqimlari

### G'or odamining chiqish rejimi

Caveman chiqish rejimi qo'shiladi** tizimning tezkor ko'rsatmalari** that modelning o'zidan qisqacha chiqishni so'raydi — `lite` darajasi to'liq jumlalarni saqlaydigan qisqa javoblarni so'raydi, `full` undan "aqlli g'or odami kabi qisqacha javob berishni" so'raydi va `ultra` telegraf chiqishini so'raydi; ko'rsatmalar faqat so'raydi, ular bunga kafolat bera olmaydi. So'rovlar ularni `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) orqali qabul qiladi: `open-sse/handlers/chatCore.ts` birinchi navbatda tanlovni back-compat shim (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`) bilan hal qiladi, u `outputStyles` bo'sh bo'lsa, yoqilgan `cavemanOutputMode` `cavemanOutputMode.intensity` da `terse-prose` chiqish uslubiga moslashtiradi (quyida Back-compat-ga qarang); bo'sh bo'lmagan `outputStyles` tanlovi avvalgidek ishlatiladi va `cavemanOutputMode.enabled` va `intensity` keyin hech qanday ta'sir ko'rsatmaydi, shu bilan birga uning `autoClarity` o'tish tugmasi amal qiladi. `outputMode.ts` ko'rsatma matnlarini (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), kontentni aylanib o'tishni va in'ektsiya ishlatadigan joylashtirish yordamchisini o'z ichiga oladi; o'zining `applyCavemanOutputMode()` injektorida ishlab chiqarish chaqiruvchisi yo'q.

#### Bu qanday ishlaydi

Ushbu rejim kirishni siqmaydi. U tizim soʻroviga koʻrsatma blokini qoʻshadi (quyida inyeksiya qanday ishlaydi) va soʻrov uchun tanlangan har qanday kirishni siqish rejimi blokni olib yuruvchi korpusda hamon keyin ishlaydi. Har bir daraja tugaydigan umumiy chegaralar bandidan oldin inglizcha `full` darajasida shunday deyiladi:

> "Aqlli g'or odamiga o'xshab qisqacha javob bering. Qoldirish maqolalari (a/an/the), to'ldiruvchi (just/really/basically/actually/simply), yoqimli narsalar, to'siqlar. Fragmentlar OK. Qisqa sinonimlar (katta keng emas, tuzatish amalga oshirilmaydi. Barcha texnik mazmun, kod, xatolar, URLs, identifikatorlarni aniq saqlang."

Bu, ayniqsa, quyidagilar uchun yaxshi ishlaydi:

- Kod yaratish (terser chiqishi = kamroq tokenlar)
- Tez savol-javob (batafsil tushuntirishlar kerak emas)
- To'plamli ishlov berish (o'tkazish qobiliyatini maksimal darajada oshirish)

#### Qachon foydalanish kerak

G'or odamining chiqish rejimi** ro'yxatdan o'tish** . Siqish yoqilgan holda (`enabled: true`, Siqish sozlamalari sahifasida asosiy o'tish-o'tish), uni `cavemanOutputMode.enabled` bilan yoqing; `intensity` `lite`, `full` yoki `ultra` tanlaydi:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Siqish kombinatsiyasi** Chiqish rejimi** toggle (`outputMode`, `outputModeIntensity` darajasida ) kombinatsion qo'llaniladigan so'rovlar uchun bir xil kalitni o'rnatadi va `omniroute_set_compression_engine` MCP vositasi uni mantiqiy `outputMode` argumenti orqali yozadi. Bo'sh bo'lmagan `outputStyles` tanlovi ushbu kalitdan ustun turadi. Boshqaruv panelida yoqish** Aniq nasr** chiqish uslubi bir xil blokni kiritadi (quyida Chiqish uslublariga qarang).

### Chiqish uslublari (katalog)

Yuqoridagi Caveman chiqish rejimi** eski yagona uslubli yo'l** . 4-bosqich uni kompozitsion chiqish uslublari katalogiga umumlashtirdi: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Har bir uslub - bu modelning o'zidan arzonroq chiqishni so'raydigan tizimli ko'rsatma; uslublar birgalikda yoqilishi mumkin va katalog tartibida kiritiladi.

| Uslub                                       | `id`            | Nima qiladi                                                                                                                                                                                                                                                          | Ta'lim tillari                                |
| ------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Aniq nasr                                   | `terse-prose`   | filler/articles/hedging tushiring; texnik moddani aniq saqlang. Qadimgi g'or odamining chiqish rejimi bilan bir xil matn (ma'lumot berilgan, qayta yozilmagan).                                                                                                      | uz, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kamroq kod                                  | `less-code`     | YAGNI narvon: eng kichik ish o'zgarishi, so'ralmagan abstraktsiyalar yo'q.                                                                                                                                                                                           | uz, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (dangasa katta ishlab chiqaruvchi) | `ponytail`      | "Eng yaxshi kod hech qachon yozilmagan koddir": > qayta yozishni qayta ishlatish, ildiz sababi > simptomi, eng qisqa ish farqi.                                                                                                                                      | uz, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menda ADHD bor (birinchi harakat)           | `i-have-adhd`   | Harakat avval (nasrdan oldin command/path/snippet ), raqamlangan chegaralangan qadamlar, ONE konkret keyingi qadam, preamble/recap/closers. yo'q [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) dan moslashtirilgan.                              | uz, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filtri                          | `antislop-ui`   | Har bir vizual texnika maqsadli sinovdan o'tishi kerak (ierarxiya, o'ziga xoslik, o'qilishi); standart gradients/glass/glow yo'q, yopilgan palitrasi, shablon tartibi yo'q. Har ikki antislop uslublari no-o'lik-nazorat / no-fabricated-da'vo chegarasini qo'shadi. | uz, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop nusxasi va inson filtri            | `antislop-copy` | Maxsus nusxa (em tiresiz, umumiy CTAs, buzzwords, chatbot yopuvchilar, ixtiro qilingan faktlar) va odamlar qoidalari: WCAG AA kontrasti, ko‘rinadigan fokus, klaviatura masofasi, empty/loading/error holatlari, mobil qayta o‘tkazish.                              | uz, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (māngī)                           | `terse-cjk`     | Klassik xitoy tilida `full`/`ultra` javobi (mángī); `lite` funktsiyali so'zlar, yoqimli narsalar yoki bezaklarsiz faqat qisqa javoblarni so'raydi.                                                                                                                   | zh (mahalliy chegaralangan, pastga qarang)    |

Har bir uslub uchta intensivlik darajasi — `lite`, `full`, `ultra` — yuboradi va har bir daraja kod bloklarini, fayl yo'llarini, buyruqlarni, xatolarni va URLs aniq saqlaydigan umumiy chegaralar bandi ( `outputMode.ts` da `SHARED_BOUNDARIES` ) bilan tugaydi. `terse-prose` va `terse-cjk` darajasidagi matnlar ushbu ro'yxatga identifikatorlarni qo'shadi.

`terse-cjk` ikki joyda `zh` uchun mahalliylashtirilgan. Siqish sozlamalari sahifasida uning qatori faqat asboblar panelidagi UI tili xitoycha (`zh-CN` yoki `zh-TW`) bo‘lganda ko‘rsatiladi va `applyOutputStyles()` uni faqat so‘rovning hal qilingan tili (quyida Til tanlash bo‘limiga qarang) `zh` bo‘lganda kiritadi. Qatorni yashirish saqlangan `terse-cjk` tanlovini tozalamaydi: API sozlamalari istalgan uslub identifikatorini qabul qiladi va sahifadagi boshqa uslublarni saqlash uni saqlab qoladi. So'rov vaqtida `applyOutputStyles()` tilini tekshirish yagona mahalliy eshikdir.

#### Inyeksiya qanday ishlaydi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) katalogga qarshi tanlovni hal qiladi (noma'lum identifikatorlar va tilga mos kelmaydigan uslublar o'chiriladi, hech qachon xato bo'lmaydi; hech qanday uslubni hal qiladigan tanlov tanani o'zgarishsiz qoldiradi, `no_styles` sifatida o'tkazib yuboriladi), tanlangan ko'rsatmalarni katalog tartibida birlashtiradi, chegaralar bandini qo'shadi** bir marta** (plyus xavfsizlik bandi, `SAFETY_BOUNDARIES` yoki uning tarjimasi, `less-code` yoki `ponytail` tanlanganda) va blokni bitta idempotentlik belgisi (`[OmniRoute Output Styles]`) bilan boshlaydi, shuning uchun qayta murojaat qilish no-op hisoblanadi. Yechilgan tilda (quyida Til tanlash boʻlimiga qarang) tarjima boʻlsa, ingliz tili oʻrniga mahalliylashtirilgan yoʻriqnoma kiritiladi.

Bo'sh bo'lmagan `messages` massiviga ega bo'lgan jismda idempotentlik tekshiruvi kontentni aylanib o'tishdan oldin amalga oshiriladi: `[OmniRoute Output Styles]` markeri allaqachon yuqori darajadagi `system` maydonida (satr yoki kontent-blok massivi) yoki string mazmuniga ega tizim xabarida bo'lsa, korpus `already_applied` sifatida o'zgarishsiz qoladi va kalit so'z tekshiruvi bajarilmaydi. Aks holda kontentni aylanib o‘tish ( `open-sse/services/compression/outputMode.ts` da `shouldBypassCavemanOutputMode()` ) oxirgi uchta xabarning matnini, ularning roli qanday bo‘lishidan qat’iy nazar tekshiradi va agar matn xavfsizlik, qaytarilmas harakat yoki tushuntirish kalit so‘zlari yoki tartib sezgir ketma-ketlikka mos kelganda, butun navbat uchun uslublarni o‘tkazib yuboradi: `first`, `then`, `after that`, `before`, `rollback` ichida yoki quyidagi ketma-ketlikda. `delete`, `drop`, `migrate`, `deploy` yoki `backup` bo'yicha 240 `release`. Aylanma yo'l harakatlanayotganda ishlaydi** Avtomatik aniqlikni aylanib o'tish** almashtirish (`cavemanOutputMode.autoClarity`, sukut bo'yicha yoqilgan) yoqilgan; o'chirish tugmachasini o'chirish kalit so'zni tekshirishni o'tkazib yuboradi.

Bypass burilishga ruxsat berganida, hech qachon yangi `messages[0]` yaratmaydigan `placeSystemInstruction()` (bir xil fayl), blokni topadigan birinchisiga joylashtiradi:

1. String tarkibiga ega yetakchi tizim xabari: blok uning matnidan keyin qo‘shiladi.
2. Yuqori darajadagi `system` maydoni: blok satr matnidan keyin qo'shiladi yoki kontent-blok massiviga yangi matn bloki sifatida qo'shiladi.
3. Satr mazmuniga ega birinchi keyingi tizim xabari: blok uning matnidan keyin qo'shiladi.
4. Yuqoridagilarning hech biri: blok `messages` oxirida yangi tizim xabariga o'tadi.

`messages` massivi bo'lmagan (yoki bo'sh bo'lgan) tanada kontentni aylanib o'tish bajarilmaydi va yuqori darajadagi `system` maydoniga maslahat berilmaydi. Blok `instructions` satr matnidan keyin qo'shiladi, agar bu maydonda `[OmniRoute Output Styles]` belgisi mavjud bo'lmasa, u holda korpus `already_applied` sifatida o'zgarishsiz qoladi. Agar tanada `instructions` satr maydoni bo'lmasa, lekin `input` (satr yoki massiv) ga ega bo'lsa, blok `instructions` aylanadi va bu maydon ushlab turilgan har qanday satr bo'lmagan qiymatni almashtiradi. Satr `instructions` maydoni ham, `input` qatori yoki massivi bo'lmagan tana o'zgarishsiz qoldiriladi va `no_messages` sifatida o'tkazib yuboriladi.

#### Qanday yoqish kerak

Boshqaruv panelida:** Siqish konteksti → Siqish sozlamalari** (`/dashboard/context/settings`), Chiqish uslublari boʻlimi: on/off oʻzgartirish tugmasi va daraja selektori bilan har bir uslub uchun bitta qator. Uslublar siqishni o'zi yoqilgan paytda kiritiladi (sahifaning asosiy tugmasi, `enabled`). The** Avtomatik aniqlikni aylanib o'tish** o'zgartirish tugmasi ustida** G'or odami** sahifa (`/dashboard/context/caveman`), uning ichida** Chiqish rejimi** karta. Dasturiy jihatdan siqish konfiguratsiyasi tanlovni quyidagicha davom ettiradi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Orqaga moslashish: `outputStyles` bo'sh bo'lsa, eski `cavemanOutputMode.enabled` sozlamasi `cavemanOutputMode.intensity` da `terse-prose` ga o'rnatiladi. Keyin blok `[OmniRoute Output Styles]` belgisi bilan boshlanadi, bu erda eski `applyCavemanOutputMode()` injektori `[OmniRoute Caveman Output Mode]` yozgan. Marker ostidagi matn en, pt-BR, es, de, fr, it, ru, id va vidagi eski inyeksiyaga mos keladi; ja va zh da chegaralar bandidan oldin bitta qo'shimcha joy oladi. `terse-prose` pt-BR, es, de, fr, it, ru, zh, ja, id va vi ga tarjima qilinadi, shuning uchun hal qilingan tili `hu` boʻlgan soʻrov inglizcha matnni oladi, bu yerda eski injektor oʻzining venger tilidan foydalangan.

Chiqish uslubidagi tilni tanlash (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): `languageConfig.enabled` yoqilgan holda, `autoDetect` so‘rovning `messages` massivida matnga ega bo‘lgan so‘nggi foydalanuvchi xabarini (string mazmuni yoki uning tarkibiy qismlarining `text` ) namuna oladi va Caveman dvigatelining detektorini (`detectCompressionLanguage()`) ishga tushiradi. Detektor Han belgilarli va kanasiz matn uchun `zh` qaytaradi; aks holda u `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` va `id` dan qaysi biri eng koʻp ishora mosligini qaytaradi va `en` hech biri — matniga mos kelmasa, u tasniflay olmagan matn ingliz tilini oladi, hech qachon `defaultLanguage`, va `vi` qachon `vi` uslubi aniqlanmaydi. Responses API tanasi navbatlarini `input` da saqlaydi, u namunalanmagan, shuning uchun u `defaultLanguage`, keyin inglizchani oladi. Agar `messages` dagi hech qanday foydalanuvchi xabarida matn bo'lmasa yoki `autoDetect` o'chirilgan bo'lsa, `defaultLanguage`, keyin ingliz tili qo'llaniladi. Agar `languageConfig.enabled` o'chirilgan bo'lsa, so'rovga siqish kombinatsiyasi qo'llanilmasa, til inglizcha — bo'ladi (so'rovning marshrutlash kombinatsiyasiga tayinlangan kombinatsiya yoki o'rnatilgan stacked quvur liniyasi uchun birlamchi siqish kombinatsiyasi chatCore ga qaytarilsa): kombinatsiyani qo'llash ushbu so'rov uchun `languageConfig.enabled` yoqadi va `defaultLanguage` paketidan bitta qiymatni o'rnatadi (zsqb to'plamidan bitta qiymatni o'rnatadi). `en` ga o'rnatiladigan kombinatsiyaning birinchi to'plami, aks holda saqlangan `autoDetect` (sukut bo'yicha yoqilgan) hali ham amal qiladi. Caveman kiritish mexanizmi har bir matn qismi uchun oʻzining qoida toʻplami tilini har xil — tanlaydi va avtomatik aniqlash oʻchirilgan holda `enabledPacks` ga oʻrnatilgan.

Uslub × tili matritsasi `tests/unit/compression/output-styles-i18n-matrix.test.ts` tomonidan mahkamlangan: har bir katalog uslubi testning `BASELINE_LANGUAGES` ga yozuvi kerak; mahalliy chegaralanmagan uslub pt-BR tarjimasini jo‘natishi kerak (mahalliy chegaralangan `terse-cjk` bu qoidadan ozod qilingan), agar u `KNOWN_ENGLISH_ONLY` ro‘yxatida ko‘rsatilmagan bo‘lsa, u faqat tarjimasi bo‘lmagan uslublarni o‘z ichiga olishi mumkin — har qanday tarjimasi bo‘lgan sanab o‘tilgan uslub sinovdan o‘ta olmaydi; va uslub o'zining `BASELINE_LANGUAGES` yozuvi ro'yxatida ko'rsatilgan tilni yo'qotganda testdan o'tolmaydi. Uslub qo'shish uchun [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) ga qarang.

### Asbob natijalarini siqish

`open-sse/services/compression/toolResultCompressor.ts` -dagi `compressToolResult()` asbob-natija matnini yordamida siqadi** 5 ta strategiya** . U ularni shu tartibda sinab ko'radi va tekshiruvi kontentga mos keladigan birinchi yoqilgan strategiya natijani hal qiladi:

1. **`fileContent`** : 3 yoki undan ortiq satrdan iborat boʻlib, unda hech boʻlmaganda bitta satr bosh chekinishga eʼtibor bermay, `import `, `export `, `function `, `class `, `const `, `let `, `var ` yoki `return ` (kalit soʻz va boʻsh joy) bilan boshlanadigan yoki `if`, `for` yoki `while` `(` ` (` keyin saqlanadi va oxirgi 5 satr, o'rtasi qoplangan.
2. **`grepSearch`** : `<path>:<digits>:` shaklidagi kamida bitta satrdan iborat tarkib, bunda birinchi ikki nuqta oldidagi matnda boʻsh joy yoʻq, faqat oʻsha satrlarni saqlaydi, koʻpi bilan 30 tadan soʻng keyingi mosliklar soni va mos keladigan fayllar roʻyxati; boshqa har bir qator o'chiriladi. Strategiyani ishga tushirish uchun shunday qatorlardan biri kifoya qiladi, shuning uchun `12:30:45` kabi vaqt tamg'asi bilan boshlanadigan jurnal qatori ham hisobga olinadi.
3. **`shellOutput`** : ANSI CSI ketma-ketligini (`ESC[` keyin raqamlar yoki nuqta-vergul, keyin harf, rang kodlarida bo‘lgani kabi) yoki matnning istalgan joyida bo‘sh joy qo‘yiladigan `$` o‘z ichiga olgan chiqish o‘sha ketma-ketlikni yo‘qotadi (boshqa qochishlar, masalan, `ESC[?25l` yoki OSC oyna sarlavhasi ketma-ketligi uning oxirgi satrlari bilan saqlanadi) va ketma-ket 50 davom etadi. qulab tushdi. Ushbu tekshirish `json` va `errorMessage` oldin bajarilganligi sababli, JSON yoki bunday `$` o'z ichiga olgan xato chiqishi `shellOutput` yoqilganda ularga hech qachon etib bormaydi.
4. **`json`** : `{` yoki `[` (ixtiyoriy boʻshliqdan keyin) bilan boshlanadigan 2000 dan ortiq belgidan iborat JSON foydali yuki va tahlillar umumlashtiriladi: 7 dan ortiq elementdan iborat massiv oʻzining birinchi 5 va oxirgi 2 ta elementini va umumiy sonini saqlaydi, obʼyekt esa oʻzining dastlabki 20 ta kalitini saqlaydi, har bir ichki kiritilgan obʼyektning oʻrniga qoʻyilgan qiymat yoki `{…N keys}` bilan almashtiriladi. massiv, N - uning uzunligi) va dastlabki 20 dan keyin tushirilgan kalitlarni sanaydigan `_remaining_<N>_keys` markeri. Skalar qiymatlar to‘liq ko‘chiriladi, shuning uchun 20 yoki undan kam kalitdan iborat bo‘lgan ob’ekt ichki qiymatlari bo‘lmagan holda faqat qayta chekintiriladi — kichraytirilgani belgilar oladi va o‘zgarishsiz qoladi.
5. **`errorMessage`** : istalgan joyda va har qanday harf holatida `error:`, `error ` ( `no error found` dagi kabi boʻshliqdan keyin boʻsh joy qoʻyiladigan soʻz), `[error]`, `exception:`, `exception `, `[exception]` yoki `traceback` oʻz ichiga olgan chiqish oʻzining birinchi qatorini, keyingi 10 qatorni va oxirgi 3 tasini oʻz ichiga oladi, ular orasida `… [N frames elided] …` belgisi qoʻyiladi. Marker faqat birinchi qatorni 13 dan ortiq satrdan keyin paydo bo'ladi, shuning uchun 14 yoki undan kam satrning xato chiqishi qisqartirilmaydi (12 yoki 13 satrda oxirgi 3 ta takroriy satr allaqachon saqlanib qolgan).

Strategiya mos kelgandan so'ng, hatto hech narsani saqlamasa ham, keyingi strategiyalar sinab ko'rilmaydi. Mos strategiya hech qanday taxminiy tokenlarni (uzunligi ÷ 4, yaxlitlangan) — saqlamasa, masalan, 25 satr yoki undan kam kodga o‘xshash fayl yoki 7 element yoki undan kam — bo‘lgan 2000 belgidan ortiq JSON massivida agressiv vosita asl vosita natijasini saqlab qoladi: har ikkala qo‘ng‘iroq qiluvchi (`compressAggressive()`, `compressAnthropicToolResultBlock()` `saved` 0 yoki undan past bo'lsa, `compressToolResult()` o'zi hali ham ushbu strategiyaning natijasini qaytaradi. Asbob-natija bosqichi oxirgi so'z emas: dvigatelning zaxira xulosasi hali ham `tool` yoki `function` xabarini 8192 belgidan (`maxTokensPerMessage`, 2048, 4 marta) qisqartirishi mumkin.

#### Qachon foydalanish kerak

Asbob natijasini siqish agressiv dvigatelning 1-bosqichi ( `open-sse/services/compression/aggressive.ts` da `compressAggressive()` ), shuning uchun u Agressiv rejimda va stacked quvur liniyasining `aggressive` bosqichida ishlaydi. U OpenAI shaklidagi `tool` va `function` xabarlarini hamda Anthropic `tool_result` bloklari ichidagi matnni siqib chiqaradi. Har bir strategiya `aggressive.toolStrategies` ostida o'z kalitiga ega, barchasi sukut bo'yicha yoqilgan. Boshqaruv panelida kalitlar Caveman sahifasida joylashgan** Murakkab** siqish yoqilgan paytda ko'ring va standart rejim Agressiv.

### Yig'ilgan quvur liniyasi

Stacked rejimi ishlaydi** ketma-ket bir nechta dvigatellar** — odatda birinchi RTK (asbob chiqishida 60-90% tejash), keyin qolgan matnda Caveman (~ 46% kiritish tejamkorligi). tuzilgan, ya'ni** 78-95% muvofiq diapazon** (yuqoridagi tejamkorlik matematikasiga qarang): `1 - (1 - 0.60..0.90) × (1 - 0.46)` o'rtacha ≈ 89%.

#### Bu qanday ishlaydi

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Qachon foydalanish kerak

Quyidagilar uchun stacked rejimidan foydalaning:

- Asbob-og'ir ish oqimlari (agent kodlash, tadqiqot)
- Narxga sezgir bo'lgan partiyalarni qayta ishlash
- Sizga maksimal token tejash kerak bo'lganda

Yig'ilgan quvurlar global `stackedPipeline` siqish sozlamalari orqali yoki marshrutlash kombinatsiyasiga tayinlangan nomli siqish kombinatsiyasi orqali (yuqoridagi Har bir kombinatsiyani bekor qilish bo'limiga qarang) — avtomatik kombinatsiyalangan `modePack` orqali emas (bu maydon faqat avtomatik kombinatsiyalangan model tanlashni qayta tortadi va `stacked` yaroqli paket nomi emas) orqali sozlanadi.

---

## Kompressiya kombinatsiyasi istisno sozlamalari

Turli foydalanish holatlari uchun xatti-harakatni aniq sozlash maqsadida global kompressiya rejimini **har bir kombinatsiya uchun** almashtirishingiz mumkin:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Bu quyidagilar uchun foydali:

- **Kodlash kombinatsiyalari**: Uzoq seanslar uchun `aggressive` rejimidan foydalaning
- **Tezkor savol-javob kombinatsiyalari**: Tezkor javoblar uchun `lite` rejimidan foydalaning
- **Koʻp vositali kombinatsiyalar**: Maksimal tejash uchun `stacked` rejimidan foydalaning
- **Ishlab chiqarish kombinatsiyalari**: Keshlovchi provayderlar uchun istisno sozlamasini oʻchirilgan holda qoldiring — doimo faol boʻlgan
  keshni hisobga oluvchi moslashtirish `aggressive`/`ultra` rejimini avtomatik ravishda `standard` rejimiga pasaytiradi
  (tanlash mumkin boʻlgan `cache-aware` rejimi mavjud emas)

---

## Shuningdek qarang

- [Muhit konfiguratsiyasi](../reference/ENVIRONMENT.md) — Kompressiya muhiti oʻzgaruvchilari
- [Arxitektura qoʻllanmasi](../architecture/ARCHITECTURE.md) — Kompressiya konveyerining ichki tuzilishi
- [Foydalanuvchi qoʻllanmasi](../guides/USER_GUIDE.md) — Kompressiya bilan ishlashni boshlash
- [RTK kompressiyasi](./RTK_COMPRESSION.md) — RTK filtrlari, ishonch modeli, tekshirish darvozasi, xom chiqishni tiklash
- [Kompressiya mexanizmlari](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-lar, MCP, boshqaruv paneli
- [Kompressiya qoidalari formati](./COMPRESSION_RULES_FORMAT.md) — JSON qoidalar toʻplami formati
- [Kompressiya til paketlari](./COMPRESSION_LANGUAGE_PACKS.md) — Tilga xos Caveman qoidalari
