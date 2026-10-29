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

### Oʻchiq

Siqish qoʻllanilmaydi. Barcha xabarlar oʻzgarishsiz oʻtadi.

### Lite rejimi (~15% tejash, <1ms kechikish)

Eng xavfsiz rejim — semantik oʻzgarish mutlaqo yoʻq, faqat formatlash tozalanadi:

| Texnika                  | Tavsif                                                                 |
| ------------------------ | ---------------------------------------------------------------------- |
| `collapseWhitespace`     | Ketma-ket boʻsh qatorlarni va qator oxiri boʻshliqlarini birlashtiradi |
| `dedupSystemPrompt`      | Takroriy tizim xabarlarini oʻchiradi                                   |
| `compressToolResults`    | Uzun tool/function chiqishlarini siqadi                                |
| `removeRedundantContent` | Takroriy koʻrsatmalarni olib tashlaydi                                 |
| `replaceImageUrls`       | base64 rasm data URI larini qisqartiradi                               |

**Tavsiya etiladi:** Doimiy yoqib qoʻyiladigan foydalanish, xavfsizlik jihatidan muhim ish oqimlari.

### Standart rejim (~30% tejash)

[Caveman](https://github.com/JuliusBrussee/caveman) dan ilhomlangan — maʼnoni saqlagan holda toʻldiruvchi soʻzlarni va uzun ifodalarni olib tashlaydi:

- Toʻldiruvchi soʻzlarni olib tashlaydi ("please", "I think", "basically", "actually")
- Uzun iboralarni ixchamlaydi ("in order to" → "to", "as a result of" → "because")
- Muloyim ikkilanish iboralarini olib tashlaydi ("Would you mind...", "If you could possibly...")
- Kodlash promptlari uchun sozlangan 30+ regex qoidasi

**Tavsiya etiladi:** Kundalik kodlash ish oqimlari, xarajatlarni tejashga intiluvchi jamoalar.

### Agresiv rejim (~50% tejash)

Uzun sessiyalar uchun aqlli tarix boshqaruvi:

- **Xabar eskirishi** — eski xabarlar bosqichma-bosqich kuchroq siqiladi
- **Tool natijalarini siqish** — uzun tool chiqishlari qisqartiriladi yoki kesiladi (birinchi/oxirgi
  qatorlar, mos qatorlarni filtrlash, JSON kalitlarini ixchamlash)
- **Strukturaviy yaxlitlik himoyasi** — `tool_use` + `tool_result` juftliklarining izchil qolishini taʼminlaydi
- **Kontekst oynasini hisobga olish** — har bir modelning token limitlariga rioya etadi

**Tavsiya etiladi:** Uzoq davom etadigan debugging sessiyalari, katta kod bazalari.

### Ultra rejimi (~75% tejash)

Token jihatidan kritik stsenariylar uchun maksimal siqish:

- **Evristik qirqish** — proza tokenlarini ball asosida qirqish
- **Strukturani saqlash** — fenced code bloklar, inline code, URL lar va identifikatorlar
  tombstone qilinadi va soʻzma-soʻz qayta tiklanadi, hech qachon qirqilmaydi
- **Ixtiyoriy SLM darajasi** — sozlanganda kichik mahalliy model qirqishni aniqlashtirishi mumkin
- Agresiv rejimdan mustaqil: u xabar eskirtirish, tool-natija siqish yoki fallback summarizerni
  ishga tushirmaydi (faqat SLM darajasidagi xatolik fallback oʻtishni agresiv rejim orqali
  yoʻnaltirishi mumkin)

**Tavsiya etiladi:** Kontekst limitlariga qayta-qayta duch kelayotganingizda.

### RTK rejimi (60-90% upstream oraligʻi)

RTK rejimi kodlash-agent sessiyalarida uchraydigan uzun tool chiqishlari uchun optimallashtirilgan:

- `git status`, `git diff`, `git log`, test runnerlar, TypeScript/Vite/Webpack buildlar,
  ESLint/Biome/Prettier, npm audit/install lar, Docker loglar, infra chiqishi va umumiy shell
  chiqishi kabi buyruq/chiqish sinflarini aniqlaydi
- `open-sse/services/compression/engines/rtk/filters/` ichidan JSON filtr paketlarini qoʻllaydi
- Loyiha yoki global `filters.toml` fayllaridan RTK TOML schema v1 filtrlarini import qiladi,
  loyiha fayllari uchun inline-test validatsiyasi va trust-gating bilan
- Inline verify namunalari bilan 56 ta oʻrnatilgan filtr bilan keladi
- ANSI boshqaruv ketma-ketliklari, progress barlar, takroriy qatorlar va harakat talab qilmaydigan shovqinni olib tashlaydi
- Muvaffaqiyatsizliklar, xatolar, ogohlantirishlar, oʻzgarган fayllar, xulosalar va uzun chiqishning oxirgi qismini saqlaydi
- Trust-gated loyiha filtrlari, global filtrlar va ixtiyoriy redacted raw-output tiklashni qoʻllab-quvvatlaydi

**Tavsiya etiladi:** Shell, build, test, git, grep va fayl-chiqish transkriptlari boʻlgan agent sessiyalari.

### Stacked rejimi (78-95% qoʻllaniladigan oraliq)

Stacked rejimi bir nechta siqish dvigatelini deterministik tartibda ishga tushiradi. Standart pipeline:

```txt
RTK -> Caveman
```

Bu tartib avval terminal/tool chiqishini ixcham holga keltiradi, soʻng qolgan tabiiy-til promptiga
Caveman semantik ixchamlashini qoʻllaydi. Stacked pipelinelarni global yoki routing kombolariga
biriktirilgan siqish kombolari orqali sozlash mumkin.

**Tavsiya etiladi:** Katta tool loglari hamda inson koʻrsatmalari yoki assistant xulosalari aralashgan kontekstlar.

---

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

- **Caveman** — rejim tanlash, til paketlari, oldindan ko‘rish va global standart sozlamalar
- **RTK** — buyruq filtri natijasini oldindan ko‘rish, RTK xavfsizlik sozlamalari va filtrlar katalogi
- **Compression Combos** — marshrutlash kombinatsiyalariga biriktirilgan, nomlangan mexanizm konveyerlari
- **Auto-Trigger Threshold** — tokenlar soni chegaradan oshganda siqishni avtomatik ravishda ishga tushiradi

### Har bir kombinatsiya uchun alohida sozlama

`Dashboard → Context & Cache → Compression Combos` bo‘limida marshrutlash kombinatsiyasiga siqish
kombinatsiyasini biriktiring:

```txt
Kombinatsiya: "free-tier-fallback"
  Siqish kombinatsiyasi: "coding-agent-stack"
  Konveyer: RTK -> Caveman
  Nishonlar:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Bu pulli obunalarda yengil rejimni saqlagan holda bepul/kodlash provayderlarida ketma-ket siqishdan
foydalanish imkonini beradi.

Ushbu "Har bir kombinatsiya uchun alohida sozlama" biriktiruvi **marshrutlash kombinatsiyasining siqish
rejimi** ustuvor sozlamasidan (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — maydon
sxemasi `rtk`, `stacked` va `omniglyph` qiymatlarini ham qabul qiladi) farqli boshqaruv elementidir —
bu ustuvor sozlama nomlangan siqish kombinatsiyasi konveyerini tanlamaydi; u faqat
`resolveCompressionPlan` tomonidan tekshiriladigan `compressionMode` maydonini o‘rnatadi. Uni
kombinatsiya kartasida (`Dashboard → Combos`) yoki #6760 dan boshlab,
`Dashboard → Context & Cache → Compression Combos` bo‘limidagi "Assign to routing" ro‘yxatida, yuqorida
hujjatlashtirilgan konveyerni biriktirish katakchasi yonida har bir marshrutlash kombinatsiyasi uchun
alohida o‘rnatish mumkin. Har ikki interfeys sozlamalarni bir xil `PUT /api/combos/{id}` endpointi
orqali saqlaydi.

### Har bir so‘rov uchun alohida sozlama

Bitta so‘rov uchun siqish rejasini almashtirish maqsadida `x-omniroute-compression` so‘rov sarlavhasini
yuboring. U eng yuqori ustuvorlikka ega — u marshrutlash kombinatsiyasi ustuvor sozlamasi, faol profil,
avtomatik ishga tushirish va paneldagi Default sozlamasidan ustun turadi. Noma’lum qiymatlar e’tiborsiz
qoldiriladi (so‘rov hech qachon rad etilmaydi), global asosiy kalit esa hamon barcha amallarni boshqaradi:
siqish global miqyosda o‘chirilgan bo‘lsa, sarlavha uni yoqa olmaydi. Qiymatlar:

| Qiymat        | Ta’siri                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Bu so‘rov uchun siqish qo‘llanmaydi.                                                                                        |
| `default`     | Panel asosida aniqlangan Default profil (faol profilni e’tiborsiz qoldiradi). Yo‘qotishli mexanizmlar o‘chiq qoladi.        |
| `safe`        | Sarlavhani kiritmaslik bilan bir xil: faqat takrorlarni olib tashlash va bo‘sh joylarni birlashtirish.                      |
| `allow-lossy` | Ushbu so‘rovning operator rejasini, jumladan xulosalar, dolzarblik filtrlari va uslubni qayta yozishni saqlab qoladi.       |
| `engine:<id>` | Yoqilgan bo‘lsa, bitta mexanizm, masalan, `engine:rtk`. Bu ushbu so‘rov uchun o‘sha mexanizmni ixtiyoriy yoqish usulidir.   |
| `<combo>`     | Avval nomi bo‘yicha (katta-kichik harflarni farqlamasdan), keyin esa id bo‘yicha moslashtiriladigan nomlangan kombinatsiya. |

`allow-lossy`, `engine:<id>` yoki nomlangan kombinatsiyasiz yo‘qotishli mexanizmlar qo‘llanmaydi.
Siqish yoqilgan bo‘lsa, so‘rovga seansdagi takrorlarni olib tashlash va bo‘sh joylarni birlashtirish
baribir qo‘llanadi.

Qo‘llangan reja javobdagi `X-OmniRoute-Compression: <mode>; source=<source>` sarlavhasida qaytariladi,
bunda `<source>` quyidagilardan biri bo‘ladi: `request-header`, `routing-override`, `active-profile`,
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

## Kengaytirilgan siqish tizimlari

Yuqorida tavsiflangan 7 ta rejimdan tashqari (manba `codex-responses` va
`omniglyph` rejimlarini ham qabul qiladi, ammo ushbu qoʻllanmada ular yoritilmaydi), quyidagi boʻlimlarda
shu rejimlar ichida yoki ular bilan birga ishlaydigan imkoniyatlar yoritiladi: Tool Result Compression va Progressive Aging
agressiv mexanizmning 1- va 2-bosqichlaridir (Aggressive rejimi va
qatlamlangan konveyerning `aggressive` bosqichi), Stacked Pipeline — Stacked rejimining ishlash usuli, Cache-Aware Compression
keshlash provayderlari uchun siqish yoqilgan paytda `aggressive` va `ultra` rejimlarini `standard` darajasiga
pasaytiradi, Caveman Output Mode va Output Styles esa sukut boʻyicha oʻchirilgan, alohida yoqiladigan tizim prompti koʻrsatmalari boʻlib,
ular soʻrovni siqish oʻrniga model chiqishini shakllantiradi.

### Keshni hisobga oluvchi siqish

Ayrim provayderlar (masalan, promptlarni keshlaydigan Anthropic) **promptlarni keshlash**ni
qoʻllab-quvvatlaydi, bu ularga xarajatlar va kechikishni kamaytirish uchun promptning ayrim qismlarini keshlash
imkonini beradi. Keshlash yoqilganida agressiv siqish aslida unumdorlikka **zarar yetkazishi**
mumkin, chunki u keshlangan tokenlarni oʻzgartirib, keshni yaroqsiz holga keltiradi.

`cachingAware.ts` moduli buni **keshlash kontekstini aniqlash** va
**siqish strategiyasini mos ravishda sozlash** orqali hal qiladi.

#### U qanday ishlaydi

1. **Keshlash kontekstini aniqlash** — Soʻrov tanasida `cache_control` belgilarini qidiradi
2. **Keshlash provayderlarini aniqlash** — Maqsad provayder keshlashni qoʻllab-quvvatlashini tekshiradi
3. **Strategiyani sozlash** — Keshlash provayderlari uchun `aggressive`/`ultra` rejimlarini `standard` darajasiga pasaytiradi
4. **Tizim promptini oʻtkazib yuborish** — Tizim promptlari odatda keshlanadi, shuning uchun ularni siqmaydi

Strategiya yordamchisi `deterministicOnly` bayrogʻini ham qaytaradi, ammo reja tuzuvchisi
faqat strategiyadan foydalanadi — hozirda quyi oqimdagi hech narsa bu bayroqni oʻqimaydi.

#### Kod namunasi

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Kesh belgisi
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Qachon foydalanish kerak

Keshni hisobga oluvchi siqish **har doim yoqilgan** — hech qanday sozlash talab qilinmaydi. U
siqish yoqilganida va maqsad provayder promptlarni keshlashni qoʻllab-quvvatlaganida (Anthropic, OpenAI
va boshqalar) ishga tushadi; aniq `cache_control` belgilari talab qilinmaydi — faqat keshlash provayderining oʻzi
darajani pasaytirishni ishga tushiradi, faqat belgilar esa buni hech qachon amalga oshirmaydi (belgilarni aniqlash strategik
qarorga emas, kesh telemetriyasiga maʼlumot yetkazadi).

### Bosqichma-bosqich eskirish

Uzoq suhbatlarda koʻplab xabar navbatlari toʻplanadi, ammo eski navbatlarning
dolzarbligi kamayib boradi. `progressiveAging.ts` moduli **xabarlarni navbat masofasi boʻyicha soddalashtiradi**
(masofa suhbat oxiridan boshlab oʻlchanadi). Taqdim etilgan standart sozlamalar bilan
(`verbatim: 2, light: 2, moderate: 3`):

- **Oxirgi 2 ta navbat (masofa ≤ 2)**: Oʻzgarishsiz saqlanadi
- **Masofa 3**: Gʻor odami uslubida siqish (ortiqcha soʻzlarni olib tashlash)
- **Masofa 4+**: Assistent xabarlari umumlashtiriladi; foydalanuvchi xabarlari dastlabki
  qatorigacha qisqartirilib, 120 ta belgi bilan cheklanadi; boshqa rollarga tegilmaydi. Tizim promptlari, allaqachon eskirtirilgan
  xabarlar va eng soʻnggi foydalanuvchi xabari masofadan qatʼi nazar har doim oʻzgarishsiz saqlanadi.
  Hech narsa butunlay tashlab yuborilmaydi va taqdim etilgan standart sozlamalarda `light`
  oraligʻiga erishib boʻlmaydi (`light` qiymati `verbatim` qiymatiga teng).

#### Kod namunasi

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... yana 50 ta navbat ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // oxirgi 3 ta navbat: o‘zgartirilmaydi
  light: 8, // masofa <= 8: yengil siqish
  moderate: 20, // masofa <= 20: g‘or odami uslubida siqish
  fullSummary: 5, // tur talab qiladi, oraliqlarga ajratish kodi tomonidan o‘qilmaydi
  // masofa > 20: umumlashtiriladi (assistent) / birinchi qator saqlanadi (foydalanuvchi)
});

// saved = tejalgan tokenlar soni
```

#### Qachon foydalanish kerak

Bosqichma-bosqich eskirish `aggressive` rejimi uchun **har doim yoqilgan** — bu
`compressAggressive()` funksiyasining 2-bosqichidir. Ultra rejimi uni ishga tushirmaydi. U
ayniqsa quyidagilar uchun samarali:

- Uzoq davom etuvchi dasturlash seanslari
- Bir necha kunlik suhbatlar
- Koʻplab vosita chaqiruvlariga ega agentli ish jarayonlari

### Gʻor odami chiqish rejimi

Gʻor odami chiqish rejimi modelning oʻzidan qisqa chiqish soʻraydigan **tizim prompti koʻrsatmalarini**
qoʻshadi — `lite` darajasi toʻliq gaplarni saqlagan holda ixcham javoblarni soʻraydi, `full`
undan «aqlli gʻor odamidek qisqa javob berish»ni soʻraydi, `ultra` esa telegraf uslubidagi chiqishni soʻraydi;
koʻrsatmalar faqat soʻraydi, bunga kafolat bera olmaydi. Soʻrovlar ularni
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) orqali oladi:
`open-sse/handlers/chatCore.ts` avval tanlovni orqaga moslik moslashtirgichi
(`resolveOutputStyleSelection()` funksiyasi
`open-sse/services/compression/outputStyles/backCompat.ts` ichida) yordamida aniqlaydi; `outputStyles`
boʻsh boʻlganda, u yoqilgan `cavemanOutputMode` qiymatini
`cavemanOutputMode.intensity` darajasidagi `terse-prose` chiqish uslubiga moslaydi
(quyidagi Orqaga moslik boʻlimiga qarang); boʻsh boʻlmagan `outputStyles`
tanlovi oʻz holicha ishlatiladi va shundan keyin `cavemanOutputMode.enabled` hamda `intensity` hech qanday
taʼsir koʻrsatmaydi, biroq uning `autoClarity` almashtirgichi qoʻllanishda davom etadi. `outputMode.ts`
koʻrsatma matnlarini (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), kontentni chetlab oʻtish mexanizmini va
kiritish jarayoni ishlatadigan joylashtirish yordamchisini oʻz ichiga oladi; uning `applyCavemanOutputMode()` injektorini
ishlab chiqarish muhitidagi hech bir chaqiruvchi ishlatmaydi.

#### U qanday ishlaydi

Bu rejim kirishni siqmaydi. U tizim promptiga ko‘rsatmalar blokini qo‘shadi
(quyidagi Kiritish qanday ishlaydi bo‘limiga qarang), so‘rov uchun tanlangan har qanday kirishni siqish rejimi
esa blokni o‘z ichiga olgan matn ustida keyin ham ishlaydi. Har bir daraja oxirida keladigan umumiy
chegaralar bandidan oldin ingliz tilidagi `full` darajasi quyidagicha yozilgan:

> "Aqlli g‘or odamidek qisqa javob ber. Artikllar (a/an/the), ortiqcha so‘zlar (just/really/basically/actually/simply), xushmuomalalik iboralari va ikkilanishni tashla. Gap bo‘laklari mumkin. Qisqa sinonimlardan foydalan (extensive emas, big; implement emas, fix). Barcha texnik mazmun, kod, xatolar, URL manzillar va identifikatorlarni aynan saqla."

Bu, ayniqsa, quyidagilar uchun yaxshi ishlaydi:

- Kod yaratish (qisqaroq natija = kamroq token)
- Tezkor savol-javob (batafsil tushuntirishlarga hojat yo‘q)
- Ommaviy qayta ishlash (o‘tkazuvchanlikni maksimal darajaga oshirish)

#### Qachon foydalanish kerak

G‘or odami uslubidagi chiqish rejimi **ixtiyoriy ravishda yoqiladi**. Siqish yoqilganida (`enabled: true`, Compression Settings sahifasidagi asosiy almashtirgich
yoqilgan), uni `cavemanOutputMode.enabled` orqali yoqing; `intensity`
`lite`, `full` yoki `ultra` qiymatini tanlaydi:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Siqish kombinatsiyasining **Chiqish rejimi** almashtirgichi (`outputMode`, darajasi `outputModeIntensity`da)
shu kombinatsiya qo‘llanadigan so‘rovlar uchun ayni almashtirgichni o‘rnatadi,
`omniroute_set_compression_engine` MCP vositasi esa uni o‘zining mantiqiy `outputMode`
argumenti orqali yozadi. Bo‘sh bo‘lmagan `outputStyles` tanlovi bu almashtirgichdan ustun turadi. Boshqaruv
panelida **Qisqa nasr** chiqish uslubini yoqish ayni blokni kiritadi (quyidagi Chiqish
uslublari bo‘limiga qarang).

### Chiqish uslublari (katalog)

Yuqoridagi g‘or odami uslubidagi chiqish rejimi — **eski yagona uslub yo‘li**. 4-bosqich uni
birgalikda ishlatiladigan chiqish uslublari katalogiga umumlashtirdi: `open-sse/services/compression/outputStyles/catalog.ts` ichidagi
`OUTPUT_STYLE_CATALOG`. Har bir uslub modelning o‘zidan tejamkorroq chiqish yaratishni
so‘raydigan tizim prompti ko‘rsatmasidir; uslublarni birga yoqish mumkin
va ular katalog tartibida kiritiladi.

| Uslub                              | `id`            | Nima qiladi                                                                                                                                                                                                                                                                                                           | Ko‘rsatma tillari                             |
| ---------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Qisqa nasr                         | `terse-prose`   | Ortiqcha so‘zlar/artikllar/ikkilanishni tashlaydi; texnik mazmunni aynan saqlaydi. Eski g‘or odami uslubidagi chiqish rejimi bilan bir xil matn (qayta yozilmaydi, unga havola qilinadi).                                                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kamroq kod                         | `less-code`     | YAGNI zinapoyasi: ishlaydigan eng kichik o‘zgarish, so‘ralmagan abstraksiyalarsiz.                                                                                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ot dumi (dangasa katta dasturchi)  | `ponytail`      | "Eng yaxshi kod — hech qachon yozilmagan kod": qayta foydalanish > qayta yozish, asosiy sabab > alomat, ishlaydigan eng qisqa farq.                                                                                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Menda ADHD bor (avval amal)        | `i-have-adhd`   | Avval amal (nasrdan oldin buyruq/yo‘l/parcha), raqamlangan va cheklangan qadamlar, BITTA aniq keyingi qadam, kirish/xulosa/yakunlovchi iboralarsiz. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) asosida moslashtirilgan.                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI filtri                 | `antislop-ui`   | Har bir vizual usul maqsad sinovidan o‘tishi kerak (ierarxiya, o‘ziga xoslik, o‘qish qulayligi); standart gradientlar/shisha/yorqinlik yo‘q, ranglar palitrasi cheklangan, shablon maketlari yo‘q. Har ikki antislop uslubi ishlamaydigan boshqaruv elementlari va uydirma da’volarni taqiqlovchi chegarani qo‘shadi. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop matn va insoniylik filtri | `antislop-copy` | Aniq matn (uzun tirelar, umumiy CTA’lar, urfdagi iboralar, chatbot yakunlari va uydirma faktlarsiz), shuningdek, insonlarga oid qoidalar: WCAG AA kontrasti, ko‘rinadigan fokus, klaviatura orqali foydalanish, bo‘sh/yuklanish/xato holatlari, mobil qayta joylashuv.                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Qisqa CJK (文言)                   | `terse-cjk`     | `full`/`ultra` javobi klassik xitoy tilida (文言); `lite` faqat yordamchi so‘zlar, xushmuomalalik iboralari yoki bezaklarsiz qisqa javoblarni so‘raydi.                                                                                                                                                               | zh (lokal bilan cheklangan, quyiga qarang)    |

Har bir uslub uchta intensivlik darajasi bilan keladi — `lite`, `full`, `ultra` — va har bir daraja
umumiy chegaralar bandi (`outputMode.ts` ichidagi `SHARED_BOUNDARIES`) bilan tugaydi; bu band
kod bloklari, fayl yo‘llari, buyruqlar, xatolar va URL manzillarni aynan saqlaydi. `terse-prose` va
`terse-cjk` daraja matnlari bu ro‘yxatga identifikatorlarni ham qo‘shadi.

`terse-cjk` ikki joyda `zh` lokali bilan cheklangan. Compression Settings sahifasi
uning qatorini faqat boshqaruv paneli UI tili xitoycha (`zh-CN` yoki `zh-TW`) bo‘lganida ko‘rsatadi,
`applyOutputStyles()` esa uni faqat so‘rovning aniqlangan tili (quyidagi Til
tanlash bo‘limiga qarang) `zh` bo‘lganida kiritadi. Qatorni yashirish saqlangan `terse-cjk` tanlovini
tozalamaydi: sozlamalar API’si har qanday uslub identifikatorini qabul qiladi va sahifada boshqa uslublarni
saqlash uni saqlab qoladi. So‘rov vaqtida `applyOutputStyles()` til tekshiruvi yagona lokal cheklovidir.

#### Kiritish qanday ishlaydi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) tanlovni
katalogga nisbatan aniqlaydi (nomaʼlum idʼlar va lokalga mos kelmaydigan uslublar
olib tashlanadi, bu hech qachon xato hisoblanmaydi; hech qanday uslubga mos kelmaydigan
tanlov tana qismini o‘zgartirmaydi va `no_styles` sifatida o‘tkazib yuboriladi), tanlangan
ko‘rsatmalarni katalogdagi tartibda birlashtiradi,
chegaralar bandini **bir marta** qo‘shadi (shuningdek, `less-code` yoki `ponytail`
tanlanganida xavfsizlik bandini, `SAFETY_BOUNDARIES` yoki uning tarjimasini qo‘shadi) va
blokni bitta idempotentlik belgisi (`[OmniRoute Output Styles]`) bilan boshlaydi, shu
sababli uni qayta qo‘llash hech qanday amal bajarmaydi. Aniqlangan tilning (quyidagi Til
tanlovi bo‘limiga qarang) tarjimasi mavjud bo‘lsa, inglizcha ko‘rsatma o‘rniga
mahalliylashtirilgan ko‘rsatma kiritiladi.

Bo‘sh bo‘lmagan `messages` massiviga ega tana qismida idempotentlik tekshiruvi kontentni
chetlab o‘tishdan oldin bajariladi: `[OmniRoute Output Styles]` belgisi yuqori darajadagi
`system` maydonida (satr yoki kontent bloklari massivi) yoxud satrli kontentga ega tizim
xabarida allaqachon mavjud bo‘lsa, tana qismi `already_applied` sifatida o‘zgartirilmaydi
va kalit so‘zlar tekshiruvi bajarilmaydi. Aks holda, kontentni chetlab o‘tish
(`open-sse/services/compression/outputMode.ts` ichidagi
`shouldBypassCavemanOutputMode()`) rollaridan qatʼi nazar, oxirgi uchta xabarning matnini
tekshiradi va ushbu matn xavfsizlik, qaytarib bo‘lmaydigan amal yoki aniqlashtirishga oid
kalit so‘zlarga yoxud tartibga bog‘liq ketma-ketlikka mos kelsa, butun navbat uchun
uslublarni o‘tkazib yuboradi: `first`, `then`, `after that`, `before`, `rollback` yoki
`backup` so‘zidan keyin 240 ta belgi ichida `delete`, `drop`, `migrate`, `deploy` yoki
`release` kelishi. Chetlab o‘tish **Auto-Clarity Bypass** almashtirgichi
(`cavemanOutputMode.autoClarity`, standart holatda yoqilgan) yoqilganida ishlaydi;
almashtirgichni o‘chirish kalit so‘zlar tekshiruvini o‘tkazib yuboradi.

Chetlab o‘tish navbatni davom ettirishga ruxsat berganda, `placeSystemInstruction()`
(xuddi shu faylda), hech qachon yangi `messages[0]` yaratmasdan, blokni quyidagi
variantlardan birinchi topilganiga joylashtiradi:

1. Satrli kontentga ega boshlang‘ich tizim xabari: blok uning matnidan keyin qo‘shiladi.
2. Yuqori darajadagi `system` maydoni: blok satr matnidan keyin qo‘shiladi yoki kontent
   bloklari massiviga yangi matn bloki sifatida qo‘shiladi.
3. Keyinroq kelgan, satrli kontentga ega birinchi tizim xabari: blok uning matnidan
   keyin qo‘shiladi.
4. Yuqoridagilarning hech biri mavjud bo‘lmasa: blok `messages` oxiridagi yangi tizim
   xabariga joylashtiriladi.

`messages` massivi bo‘lmagan (yoki u bo‘sh bo‘lgan) tana qismida kontentni chetlab
o‘tish bajarilmaydi va yuqori darajadagi `system` maydoni hisobga olinmaydi. Blok satrli
`instructions` maydoni matnidan keyin qo‘shiladi, bu maydon
`[OmniRoute Output Styles]` belgisini allaqachon o‘z ichiga olgan holat bundan mustasno;
bunday holda tana qismi `already_applied` sifatida o‘zgartirilmaydi. Tana qismida satrli
`instructions` maydoni bo‘lmasa, ammo `input` (satr yoki massiv) mavjud bo‘lsa, blok
`instructions` qiymatiga aylanib, ushbu maydondagi har qanday satr bo‘lmagan qiymatni
almashtiradi. Satrli `instructions` maydoni ham, satr yoki massiv ko‘rinishidagi `input`
ham bo‘lmagan tana qismi o‘zgartirilmaydi va `no_messages` sifatida o‘tkazib yuboriladi.

#### Qanday yoqiladi

Boshqaruv panelida: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), Output styles bo‘limi: har bir uslub uchun yoqish/o‘chirish
almashtirgichi va daraja tanlagichiga ega alohida qator mavjud. Uslublar siqishning o‘zi
yoqilganida (sahifadagi asosiy `enabled` almashtirgichi) kiritiladi. **Auto-Clarity
Bypass** almashtirgichi **Caveman** sahifasidagi
(`/dashboard/context/caveman`) **Output Mode** kartasida joylashgan. Dasturiy usulda
siqish konfiguratsiyasi tanlovni quyidagicha saqlaydi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Orqaga muvofiqlik: `outputStyles` bo‘sh bo‘lib turganida, eski
`cavemanOutputMode.enabled` sozlamasi `cavemanOutputMode.intensity` darajasidagi
`terse-prose` bilan moslashtiriladi. Shundan so‘ng blok `[OmniRoute Output Styles]`
belgisi bilan boshlanadi, eski `applyCavemanOutputMode()` kirituvchisi esa
`[OmniRoute Caveman Output Mode]` belgisini yozgan. Belgi ostidagi matn en, pt-BR, es,
de, fr, it, ru, id va vi tillarida eski kiritma bilan bir xil; ja va zh tillarida
chegaralar bandidan oldin bitta qo‘shimcha bo‘shliq mavjud. `terse-prose` pt-BR, es, de,
fr, it, ru, zh, ja, id va vi tillariga tarjima qilinadi, shu sababli aniqlangan tili
`hu` bo‘lgan so‘rov eski kirituvchi ishlatgan vengercha matn o‘rniga inglizcha matnni
oladi.

Output uslubi tilini tanlash (`outputStyles/apply.ts` ichidagi
`resolveOutputStyleLanguage()`): `languageConfig.enabled` yoqilgan bo‘lsa, `autoDetect`
so‘rovning `messages` massividagi matnga ega eng so‘nggi foydalanuvchi xabaridan namuna
oladi (satrli kontent yoki uning kontent qismlaridagi `text`) va unda Caveman
mexanizmining aniqlagichini (`detectCompressionLanguage()`) ishga tushiradi. Matnda Han
belgilari mavjud va kana mavjud bo‘lmasa, aniqlagich `zh` qaytaradi; aks holda, `it`,
`pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` va `id` orasidan eng ko‘p ishora mosligi
topilganini, hech biri mos kelmasa esa `en` qaytaradi — tasniflay olmaydigan matn
`defaultLanguage` emas, har doim ingliz tilini oladi va uslublar `vi` matni bilan
taqdim etilsa ham, `vi` hech qachon aniqlanmaydi. Responses API tana qismi o‘z
navbatlarini `input` ichida saqlaydi, undan namuna olinmaydi, shu sababli u avval
`defaultLanguage`, keyin esa ingliz tilini oladi. `messages` ichidagi hech bir
foydalanuvchi xabarida matn bo‘lmasa yoki `autoDetect` o‘chirilgan bo‘lsa, avval
`defaultLanguage`, keyin esa ingliz tili qo‘llanadi. `languageConfig.enabled`
o‘chirilgan bo‘lsa, til inglizcha bo‘ladi — so‘rovga siqish kombinatsiyasi qo‘llanadigan
holat bundan mustasno (so‘rovning marshrutlash kombinatsiyasiga tayinlangan kombinatsiya
yoki ichki o‘rnatilgan stacked pipeline uchun chatCore qaytadigan standart siqish
kombinatsiyasi): kombinatsiyani qo‘llash ushbu so‘rov uchun `languageConfig.enabled`
qiymatini yoqadi va `defaultLanguage` qiymatini kombinatsiyaning til paketlaridan
o‘rnatadi (agar saqlangan qiymat kombinatsiya paketlaridan biri bo‘lsa, o‘sha qiymat;
aks holda, standart qiymati `en` bo‘lgan kombinatsiyaning birinchi paketi), bunda
saqlangan `autoDetect` qiymati (standart holatda yoqilgan) qo‘llanishda davom etadi.
Caveman kiritish mexanizmi qoida paketi tilini boshqacha tanlaydi — har bir matn qismi
uchun alohida va avtomatik aniqlash o‘chirilganida `enabledPacks` asosida cheklangan
holda.

Uslub × til matritsasi
`tests/unit/compression/output-styles-i18n-matrix.test.ts` orqali qatʼiy belgilanadi: katalogdagi har bir uslub testning `BASELINE_LANGUAGES` roʻyxatida yozuvga ega boʻlishi kerak; lokal bilan cheklanmagan uslub pt-BR tarjimasi bilan taqdim etilishi kerak (lokal bilan cheklangan `terse-cjk` bu qoidadan ozod), agar u `KNOWN_ENGLISH_ONLY` roʻyxatida boʻlmasa. Bu roʻyxatda faqat umuman tarjimasi boʻlmagan uslublar boʻlishi mumkin — roʻyxatdagi uslubning biror tarjimasi mavjud boʻlsa, test muvaffaqiyatsiz yakunlanadi; shuningdek, uslub oʻzining `BASELINE_LANGUAGES` yozuvida keltirilgan tilni yoʻqotsa, testdan oʻta olmaydi. Uslub qoʻshish uchun
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) fayliga qarang.

### Vosita natijasini siqish

`open-sse/services/compression/toolResultCompressor.ts` faylidagi `compressToolResult()`
vosita natijasi matnini **5 ta strategiya** yordamida siqadi. U ularni quyidagi tartibda sinab koʻradi va tekshiruvi kontentga mos kelgan birinchi yoqilgan strategiya natijani belgilaydi:

1. **`fileContent`**: 3 yoki undan ortiq qatordan iborat kontentda kamida bitta qator, boshlangʻich chekinish hisobga olinmaganda, `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` yoki `return ` bilan (kalit soʻz va undan keyingi boʻshliq), yoxud `if`,
   `for` yoki `while` dan keyin `(` yoki ` (` bilan boshlansa, dastlabki 20 va oxirgi 5 qatorni saqlab, olib tashlangan oʻrta qismni belgilaydi.
2. **`grepSearch`**: `<path>:<digits>:` shaklidagi kamida bitta qatorga ega kontentda birinchi ikki nuqtadan oldingi matnda boʻshliq boʻlmasa, faqat shunday qatorlarni saqlaydi, koʻpi bilan 30 tasini, undan keyin qolgan mosliklar soni va mos kelgan fayllar roʻyxatini beradi; boshqa barcha qatorlar olib tashlanadi. Strategiyani ishga tushirish uchun shunday bitta qatorning oʻzi yetarli, shu sababli `12:30:45` kabi vaqt tamgʻasi bilan boshlangan jurnal qatori ham hisobga olinadi.
3. **`shellOutput`**: ANSI CSI ketma-ketligini (`ESC[` dan keyin raqamlar yoki nuqtali vergullar va soʻng harf, rang kodlaridagi kabi) yoki matnning istalgan joyida keyin boʻshliq keladigan `$` belgisini oʻz ichiga olgan chiqish bu ketma-ketliklarni yoʻqotadi (boshqa escape ketma-ketliklari, masalan `ESC[?25l` yoki OSC oyna sarlavhasi ketma-ketligi saqlanadi) va ketma-ket takrorlangan qatorlarni birlashtirgan holda oxirgi 50 qatorni saqlaydi. Bu tekshiruv `json` va `errorMessage` dan oldin bajarilgani sababli, shunday `$` belgisini oʻz ichiga olgan JSON yoki xato chiqishi `shellOutput` yoqilgan paytda ulargacha hech qachon yetib bormaydi.
4. **`json`**: ixtiyoriy boʻshliqdan keyin `{` yoki `[` bilan boshlanadigan, tahlildan muvaffaqiyatli oʻtadigan va 2 000 belgidan uzun JSON foydali yuki qisqacha jamlanadi: 7 tadan ortiq elementli massiv dastlabki 5 va oxirgi 2 elementini hamda umumiy sonini saqlaydi; obyekt esa dastlabki 20 kalitini saqlaydi, har bir ichki obyekt yoki massiv qiymati `{…N keys}` toʻldiruvchisi bilan almashtiriladi (massiv uchun N uning uzunligidir) va dastlabki 20 tadan keyin olib tashlangan kalitlar sonini koʻrsatuvchi `_remaining_<N>_keys` belgisi qoʻshiladi. Skalyar qiymatlar toʻliq koʻchiriladi, shu sababli ichki qiymatlarsiz 20 yoki undan kam kalitli obyekt faqat qayta chekinish bilan formatlanadi — minimallashtirilgan obyektga belgilar qoʻshiladi va u oʻzgarishsiz qoladi.
5. **`errorMessage`**: istalgan joyda va harflarning katta-kichikligidan qatʼi nazar `error:`,
   `error ` (`no error found` dagidek soʻzdan keyin boʻshliq), `[error]`,
   `exception:`, `exception `, `[exception]` yoki `traceback` boʻlgan chiqish birinchi qatorni, keyingi 10 qatorni va oxirgi 3 qatorni saqlaydi hamda ular orasidagi qatorlar oʻrniga `… [N frames elided] …` belgisini qoʻyadi. Bu belgi faqat birinchi qatordan keyin 13 tadan ortiq qator boʻlganda paydo boʻladi, shu sababli 14 yoki undan kam qatorli xato chiqishi qisqartirilmaydi (12 yoki 13 qatorda oxirgi 3 qator allaqachon saqlangan qatorlarni takrorlaydi).

Strategiya mos kelgach, hatto u hech narsani tejamasa ham, keyingi strategiyalar sinab koʻrilmaydi. Mos kelgan strategiya hisoblangan tokenlarni (uzunlik ÷ 4, yuqoriga yaxlitlanadi) tejamasa — masalan, kodga oʻxshash 25 yoki undan kam qatorli fayl yoxud 7 yoki undan kam elementga ega, 2 000 belgidan uzun JSON massivi — agressiv mexanizm asl vosita natijasini saqlab qoladi: har ikkala chaqiruvchi (`compressAggressive()` va `compressAnthropicToolResultBlock()`) `saved` 0 yoki undan kichik boʻlganda asl nusxani saqlaydi, `compressToolResult()` ning oʻzi esa baribir shu strategiyaning chiqishini qaytaradi. Vosita natijasi bosqichi yakuniy qaror emas: mexanizmning zaxira jamlovchisi 8 192 belgidan uzun `tool` yoki `function` xabarini hamon qisqartirishi mumkin (`maxTokensPerMessage`, 2 048, 4 ga koʻpaytiriladi).

#### Qachon foydalanish kerak

Vosita natijasini siqish agressiv mexanizmning 1-bosqichidir (`open-sse/services/compression/aggressive.ts` faylidagi `compressAggressive()`), shu sababli u Aggressive rejimida va qatlamlangan konveyerning `aggressive` bosqichida ishlaydi. U OpenAI shaklidagi `tool` va `function` xabarlarini hamda Anthropic `tool_result` bloklari ichidagi matnni siqadi. Har bir strategiyaning `aggressive.toolStrategies` ostida oʻz almashtirgichi mavjud va ularning barchasi standart holatda yoqilgan. Boshqaruv panelida siqish yoqilgan va standart rejim Aggressive boʻlganda, almashtirgichlar Caveman sahifasining **Advanced** koʻrinishida joylashgan.

### Qatlamlangan konveyer

Qatlamlangan rejim **bir nechta mexanizmni ketma-ket** ishga tushiradi — odatda avval RTK
(vosita chiqishida 60–90% tejash), soʻng qolgan matnda Caveman (~46% kirish
tejalishi). Birlashtirilganda bu **78–95% mos diapazonni** beradi (yuqoridagi Upstream Savings Math boʻlimiga qarang): `1 - (1 - 0.60..0.90) × (1 - 0.46)` oʻrtacha ≈89%.

#### U qanday ishlaydi

```
Kirish (1000 token)
  → RTK (buyruqni hisobga oluvchi filtr) → 200 token
    → Caveman (ortiqcha qismlarni olib tashlash) → 108 token
  → Chiqish (108 token, ~89% tejash)
```

#### Qachon foydalanish kerak

Qatlamlangan rejimdan quyidagilar uchun foydalaning:

- Vositalar koʻp ishlatiladigan ish jarayonlari (agentli dasturlash, tadqiqot)
- Xarajatga sezgir paketli qayta ishlash
- Maksimal token tejash kerak boʻlganda

Qatlamlangan konveyerlar global `stackedPipeline` siqish sozlamasi orqali yoki marshrutlash kombinatsiyasiga biriktirilgan nomlangan siqish kombinatsiyasi orqali sozlanadi (yuqoridagi Per-Combo Override boʻlimiga qarang) — auto-combo `modePack` orqali emas (bu maydon faqat auto-combo model tanlovining vaznlarini qayta taqsimlaydi va `stacked` yaroqli paket nomi emas).

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
