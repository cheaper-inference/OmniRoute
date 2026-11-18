# Log export (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute chaqiruv jurnallarini tashqi tahliliy maʼlumotlar omboriga uzluksiz, inkremental eksport qilish.

Boshqaruv panelining Jurnallar varagʻi soʻrovlar tarixini SQLite (`call_logs`) bazasida saqlaydi; uning hajmi
rotatsiya va saqlash muddati bilan cheklanadi. Jurnal eksporti shu yozuvlar toʻplamini jadval asosida tashqariga yuboradi, shunda u
mahalliy bazadan uzoqroq saqlanishi va boshqa maʼlumotlar bilan birlashtirilishi mumkin. BigQuery — birinchi manzil;
konveyer reyestrga asoslangan, shu sababli yangi manzillarni qoʻshish mumkin.

---

## 1. Ishlash tartibi

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Jadval** — bitta `JobRegistry` cron vazifasi, `log_export`, standart qiymati `0 * * * *` (har soatda,
  UTC). `src/lib/initCloudSync.ts` faylida roʻyxatdan oʻtkaziladi; uni `OMNIROUTE_LOG_EXPORT_CRON` orqali oʻzgartirish mumkin.
  Har bir ishga tushishda barcha **yoqilgan** manzillar navbatma-navbat qayta ishlanadi.
- **Kursor** — SQLiteʼning yashirin `call_logs.rowid` qiymati; har bir manzil uchun
  `log_export_destinations.cursor_row_id` da saqlanadi. `timestamp` ataylab kursor sifatida ishlatilmaydi: chaqiruvchilar
  oʻz qiymatini berishi mumkin, shuning uchun sekin soʻrov undan keyin boshlangan tezroq soʻrovdan soʻng yozilishi
  mumkin va vaqt belgisi asosidagi kursor uni oʻtkazib yuboradi.
- **Paketlash** — har bir soʻrov uchun `batch_size` ta satr (standart qiymat 500), har bir ishga tushirish uchun `max_rows_per_run` ta satr
  (standart qiymat 10000); shu tariqa katta navbat bitta ishga tushirishni band qilib qoʻyish oʻrniga bir necha ishga tushirish davomida qayta ishlanadi.
- **Yetkazib berish** — kursor faqat `send()` muvaffaqiyatli yakunlangandan soʻng oldinga siljiydi. Paket bajarilmasa,
  kursor oʻz joyida qoladi va keyingi ishga tushirishda shu satrlar qayta yuboriladi. Kafolat —
  kamida bir marta yetkazib berish va manzil tomonida takrorlarni olib tashlash; haqiqiy aynan bir marta yetkazib berish emas: BigQuery har bir
  satr uchun chaqiruv jurnali identifikatorini kalit sifatida ishlatadi va oʻzining takrorlarni aniqlash vaqt oraligʻida uni imkon qadar hisobga oladi.
- **Ustma-ust bajarilishdan himoya** — cron ishga tushishi va `POST .../run` bir vaqtda yuz berishi mumkin. Allaqachon
  qayta ishlanayotgan manzil ikki marta qayta ishlanish oʻrniga oʻtkazib yuboriladi (ishga tushirish natijasida `skipped: true`),
  shu sababli parallel ishga tushirish paketni qayta yubora yoki kursorni orqaga yoza olmaydi.
- **Tozalashdan keyin tiklanish** — agar `cursor_row_id` qiymati `MAX(rowid)` dan katta boʻlib qolsa (butun jadval
  tozalangan va rowid qiymatlari qaytadan boshlangan boʻlsa), bajaruvchi yangi yozuvlarni doimiy ravishda koʻrmay qolish oʻrniga kursorni 0 ga qaytaradi.

### Izolyatsiyalangan bajaruvchi va cheklovlar

Node muhitida har bir manzil uchun ishga tushirish alohida, qisqa muddatli OT farzand jarayonini boshlaydi (IPC bilan `child_process`,
`worker_threads` emas). Tana mazmunini oʻqish, foydali yuk JSONʼini tahlil qilish/serializatsiyalash, manzilning
`prepare()` amali va manzil bilan tarmoq kiritish/chiqarish operatsiyalari serverning hodisalar siklida emas, shu jarayonda bajariladi.
IPC orqali faqat konfiguratsiya va kichik bajarilish holati xabarlari uzatiladi; eksport qilingan yozuvlar
serverga hech qachon qaytmaydi. Cron vazifasi va Hozir ishga tushirish marshruti oʻsha ochiq natija formatini va ustma-ust bajarilishdan himoyani saqlab qoladi.

Farzand jarayon server aniqlagan `DATA_DIR/storage.sqlite` faylini `node:sqlite` yordamida faqat oʻqish rejimida,
`busy_timeout=5000` va `query_only=ON` bilan ochadi. U maʼlumotlar bazasining yagona nusxasini import qilmaydi hamda
migratsiyalar, zaxira nusxalash yoki SQLite yangilanishlarini bajarmaydi. Yoʻqolgan/buzilgan artefaktlarni hisobga olish (jumladan,
buzilgan artefakt uchun UPDATE) faqat boshqaruv panelining tafsilotlar yoʻlida qoladi. Ikkala yoʻl ham sof
tafsilot aniqlagichidan foydalanadi; eksport asinxron fayl tizimi oʻqishlaridan va bir xil artefakt → eski
ichki maʼlumot → eski disk maʼlumoti → mavjud emas aniqlash tartibidan foydalanadi. Farzand jarayon oʻquvchisini ochganida ishga tushirish eng katta kiritish rowid
qiymatini qayd etadi; keyingi kiritishlar navbatdagi ishga tushirishni kutadi. Bu uzoq davom etuvchi SQLite tranzaksiyasi emas,
balki kiritish chegarasidir: tarmoqni kutish vaqtida WAL yozuvchilari va nazorat nuqtalari erkin ishlashda davom etadi.
Mavjud satrlarni yangilash/oʻchirish bu chegara bilan muzlatilmaydi.

Har bir qabul qilingan paketdan soʻng farzand jarayon tasdiqni kutadi. Server avval
`advanceLogExportCursor` orqali kursorni saqlaydi, soʻng `ack` yuboradi; undan oldin keyingi paket boshlanmaydi.
Yuborishdagi xato, qulash yoki kutish muddati tugashi shu paket uchun kursorni oldinga siljitmasdan xatolikni qayd etadi. Avval
tasdiqlangan paketlar saqlanganicha qoladi; koʻpi bilan bitta tasdiqlanmagan paket qayta yuborilishi mumkin.
Muvaffaqiyat faqat `done` va farzand jarayonning xatosiz yakunlanishidan keyin qayd etiladi. Xatolik yuz bersa, farzand jarayon
SIGTERM bilan toʻxtatiladi, 500 ms dan keyin esa SIGKILL qoʻllanadi va bajaruvchi jarayonning yopilishini kutadi.

| Muhit oʻzgaruvchisi                           | Standart qiymat | Maqsad                                              |
| --------------------------------------------- | --------------- | --------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000          | Har bir manzil uchun haqiqiy oʻtgan vaqt chegarasi  |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024            | Farzand jarayon V8 old-space chegarasi, MB hisobida |

Yaroqsiz/musbat boʻlmagan/butun son boʻlmagan qiymatlar oʻrniga standart qiymatlar ishlatiladi. Uyum sozlamasi umumiy
RSS chegarasi emas; juda katta paketlar baribir farzand jarayon xotirasini tugatishi va ishga tushirishni xavfsiz tarzda muvaffaqiyatsiz yakunlashi mumkin.
Standart 1024 MB qiymat tana mazmuni yoqilgan holatda 512 KiB artefaktlardan iborat standart 500 satrli paket uchun,
jumladan BigQueryʼning bayt boʻlaklariga ajratilgan JSON serializatsiyasi uchun qoʻshimcha joy qoldiradi. Bu
tana mazmuni bor 10000 satrli paketni xavfsiz qilmaydi. V8 uyum xotirasi tugaganda, yechim koʻrsatilgan xatolik qayd etiladi: paket
hajmini kamaytiring yoki `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` qiymatini oshiring; kursor oxirgi
tasdiqlangan paketda qoladi. Eski ichki/disk tana mazmuniga zamonaviy artefakt chegarasi tatbiq etilmaydi.
Operatorlar, ayniqsa xotirasi cheklangan konteynerlarda, RSS uchun alohida resurs ajratishi kerak.

Farzand jarayon faqat aniqlangan `DATA_DIR`, `NODE_ENV`, aniq berilgan `TZ` (eski fayl nomlari uchun
mahalliy vaqtni aniqlash), mavjud boʻlsa `ELECTRON_RUN_AS_NODE` hamda quyidagi tashqi ulanish parametrlarini meros qilib oladi:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (va ularning kichik harfli shakllari),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Global Undici dispetcheri serverning faqat muhitga asoslangan proksini aniqlash va mahalliy hostlar uchun
proksini chetlab oʻtish qoidalaridan, jumladan `NO_PROXY` dan foydalanadi; u `proxyFetch.ts` yoki uning MB/funksiya bayroqlarini import qilmaydi.
Proksi hisob maʼlumotlari uzatiladigan chiqish va qayd etilgan xatolardan yashiriladi. Qabul qiluvchi manzilning hisob maʼlumotlari
faqat bitta boshlangʻich IPC xabarida uzatiladi, argv yoki muhit orqali hech qachon uzatilmaydi; chiqish/xatolarni uzatishda
prefiks qoʻshiladi va maʼlumotlar tozalanadi. Har bir cron ishga tushishida Nodeʼning SQLite ogohlantirishi
takrorlanmasligi uchun farzand jarayonni ishga tushirish argumentlarida faqat `ExperimentalWarning` oʻchiriladi; boshqa ogohlantirish turlari koʻrinishda qoladi.

Qabul qiluvchi manzil modullarini Next.js/faqat serverga moʻljallangan bogʻliqliklarsiz import qilish mumkin boʻlishi kerak. Mavjud
BigQuery amalga oshirilishi bu talabga allaqachon javob beradi. Kirish tokenlari keshi faqat farzand jarayon
ishlashi davomida saqlanadi, ishga tushirishlar orasida saqlanmaydi. Node qoʻllab-quvvatlanadigan bajarish muhitidir (`package.json` engines), ammo READMEʼning Bun
oʻrnatish boʻlimi va `Dockerfile.bun` ham `bun:sqlite` (`src/lib/db/core.ts` / adapterlar) orqali
ishlab chiqarish muhiti uchun moslik yoʻlini taklif qiladi. Shu sababli Bun ostida eksportlar avvalgi
jarayon ichidagi yoʻlni saqlab qoladi va bir martalik ogohlantirish chiqaradi: farzand jarayonning heap/vaqt cheklovi izolyatsiyasi mavjud emas. Hodisalar
sikli va OOM izolyatsiyasi uchun Nodeʼdan foydalaning; bu yerda Bun faqat dasturlash uchun moʻljallangan deb hisoblanmaydi.

`includeBodies` yoqilganda, bir soatlik foydali yuk navbatini toʻplash oʻrniga
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kabi daqiqa darajasidagi davriylikni tanlang.
Paket va qator cheklovlari har bir ishga tushirishni hamon chegaralaydi. Jarayonni ishga tushirish xarajati har bir manzil uchun har bir ishga tushirishda yuzaga keladi;
bu umumiy CPU sarfini kamaytirish emas, balki server hodisalar sikli izolyatsiyasi evaziga kichik ishga tushirish xarajatini qabul qilishdir.

### Foydali yuklar (promptlar va yakuniy javoblar)

Odatiy holatda eksport faqat Jurnallar **roʻyxati** koʻrsatadigan qisqacha maydonlarni oʻz ichiga oladi.
**Promptlar va javoblarni eksport qilish** (`includeBodies`) yoqilsa, Jurnallarning **tafsilotlar**
panelida har bir chaqiruv uchun koʻrsatiladigan maʼlumotlar ham yuboriladi:

| Maydon                           | Unda nima saqlanadi                                                         |
| -------------------------------- | --------------------------------------------------------------------------- |
| `request_body` / `response_body` | Boshqaruv panelida aks ettirilgan chaqiruv yuklari                          |
| `pipeline_route_decision`        | Marshrutizator tanlagan maqsad va model                                     |
| `pipeline_client_request`        | Mijoz yuborgan holatdagi oʻzgartirilmagan soʻrov                            |
| `pipeline_openai_request`        | Ichki OpenAI shakliga oʻgirilgandan keyingi holat                           |
| `pipeline_provider_request`      | Provayder formatida yuqori oqimga amalda yuborilgan holat                   |
| `pipeline_provider_response`     | Yuqori oqimdan kelgan oʻzgartirilmagan javob                                |
| `pipeline_client_response`       | Chaqiruvchiga qaytarilgan maʼlumot                                          |
| `pipeline_error`                 | Muvaffaqiyatsiz chaqiruv uchun konveyer darajasidagi xato tafsilotlari      |
| `bodies_truncated`               | Yuqoridagi istalgan maydon `maxBodyBytes` chegarasiga yetganda True boʻladi |

Bu prompt mazmuni boʻlgani uchun u **odatiy holatda oʻchirilgan** va ataylab har bir manzil uchun alohida tanlanadi.
Boshqaruv panelida koʻrsatilgan maʼlumot yuboriladi, chunki eksport va `getCallLogById` tafsilotlarni
aniqlash mexanizmidan birgalikda foydalanadi: foydali yuklar
yozilayotganda shaxsni aniqlashga imkon beruvchi maʼlumotlardan tozalanadi va maxfiy maʼlumotlar yashiriladi;
`noLog` API kaliti bilan qilingan chaqiruv esa umuman foydali yuk saqlamaydi, shuning uchun eksport qilinadigan hech narsa boʻlmaydi.

Foydali yuklar fayl tizimidagi artefaktdan har bir qator uchun alohida oʻqiladi, shu sababli maʼlumotlarni toʻldirish faqat
buni soʻragan manzillar uchun bajariladi. Artefakt mavjud boʻlmasa yoki buzilgan boʻlsa, paketni muvaffaqiyatsiz yakunlab, kursorni toʻxtatib qoʻyish oʻrniga,
uning qisqacha maʼlumotlari null foydali yuklar bilan eksport qilinadi.

`maxBodyBytes` (standart qiymati 262144) har bir maydon hajmini cheklaydi. Uzunroq foydali yuklar **tashlab yuborilmaydi,
balki qisqartiriladi** — qisqartirilgan prompt ham «nima soʻralgan edi» degan savolga javob beradi — va qatorga
`bodies_truncated` belgisi qoʻyiladi. Oqim orqali boʻlakma-boʻlak uzatilgan oʻzgarishlar eksport qilinmaydi; yigʻilgan javob
allaqachon `pipeline_provider_response` va `pipeline_client_response` ichida mavjud.

---

## 2. Fayllar

| Qism                                    | Joylashuv                                    |
| --------------------------------------- | -------------------------------------------- |
| Manzil shartnomasi                      | `src/lib/logExport/types.ts`                 |
| Reyestr                                 | `src/lib/logExport/registry.ts`              |
| Maxfiy maʼlumotlarni boshqarish         | `src/lib/logExport/secrets.ts`               |
| Ishga tushiruvchi (ota jarayon IPC)     | `src/lib/logExport/runner.ts`                |
| Jarayonning hayot sikli                 | `src/lib/logExport/childRunner.ts`           |
| Bola jarayon kirish nuqtasi             | `src/lib/logExport/exportChild.ts`           |
| Faqat oʻqish uchun ochuvchi             | `src/lib/db/logExportReadOnly.ts`            |
| Umumiy soʻrov/moslashtirish             | `src/lib/usage/callLogExportQueries.ts`      |
| Tafsilotlarni aniqlovchi                | `src/lib/usage/callLogDetailResolver.ts`     |
| API proyeksiyasi                        | `src/lib/logExport/presenter.ts`             |
| BigQuery manzili                        | `src/lib/logExport/destinations/bigquery.ts` |
| Google xizmat hisobi autentifikatsiyasi | `src/lib/logExport/googleServiceAccount.ts`  |
| Chaqiruvlar jurnali manbasi             | `src/lib/usage/callLogExportSource.ts`       |
| Doimiy saqlash                          | `src/lib/db/logExportDestinations.ts`        |
| Cron vazifasi                           | `src/lib/jobs/logExportJob.ts`               |
| REST qatlami                            | `src/app/api/log-export/`                    |
| Boshqaruv paneli sahifasi               | `src/app/(dashboard)/dashboard/log-export/`  |

Sxema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Barcha marshrutlarda boshqaruv autentifikatsiyasi qoʻllanadi (`requireManagementAuth`). Maxfiy maʼlumotlar hech qachon qaytarilmaydi:
saqlangan maxfiy maʼlumot oʻrniga aynan `__stored__` qiymati qaytariladi va yangilash paytida shu qiymatni qayta yuborish
saqlangan hisob maʼlumotini oʻzgarishsiz qoldiradi.

Turi maxfiy maʼlumotni belgilaydigan manzilni yaratish yoki yangilash **`STORAGE_ENCRYPTION_KEY` mavjud boʻlishini
talab qiladi**. Usiz `encrypt()` maʼlumotni hech qanday ogohlantirishsiz oʻzgartirmay oʻtkazadi, shuning uchun hisob maʼlumotini
SQLite bazasiga ochiq matn shaklida joylash oʻrniga yozish amali 400 xatosi bilan rad etiladi (Telegram webhook ham
xuddi shu himoyani qoʻllaydi).

| Metod    | Yoʻl                                     | Maqsad                                                                                |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Manzil turlari + ularning sozlama maydonlari roʻyxati                                 |
| `GET`    | `/api/log-export/destinations`           | Manzillar roʻyxati (maxfiy maʼlumotlar yashirilgan)                                   |
| `POST`   | `/api/log-export/destinations`           | Manzil yaratish                                                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Bitta manzilni oʻqish                                                                 |
| `PUT`    | `/api/log-export/destinations/{id}`      | Nom / yoqilganlik holati / sozlama / paketlashni yangilash                            |
| `DELETE` | `/api/log-export/destinations/{id}`      | Oʻchirish                                                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | Hisob maʼlumotlarini tekshirish, hech narsa yozmaslik                                 |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Rejalashtirilgan ishga tushirishdagi yoʻl orqali navbatdagilarni hozir eksport qilish |
| `GET`    | `/api/log-export/status`                 | Cron holati, soʻnggi ishga tushirishlar, har bir manzil uchun kutilayotgan yozuvlar   |

`GET /api/log-export/types` UIʼni universal qiladi: boshqaruv paneli shakli
qaytarilgan maydon tavsiflari asosida chiziladi, shuning uchun yangi manzil qoʻshilganda UIʼni oʻzgartirish shart emas.

---

## 4. BigQuery manzili

Sozlama kalitlari (`type: "bigquery"`):

| Kalit                | Izoh                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Dataset joylashgan GCP loyihasi                                                                                         |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                         |
| `location`           | Faqat dataset yaratilishi kerak bo‘lganda ishlatiladi (standart qiymat `EU`)                                            |
| `serviceAccountJson` | Service-account kaliti. Maxfiy: saqlanganda shifrlanadi, hech qachon qaytarilmaydi                                      |
| `autoCreate`         | Yetishmayotgan dataset/jadvalni yaratish; nullable usage-evidence ustunlarini shartli qo‘shish (standart qiymat `true`) |

Service account maqsadli jadval uchun `bigquery.tables.updateData` ruxsatiga, shuningdek
`autoCreate` yoqilganida `bigquery.datasets.create` / `bigquery.tables.create` ruxsatlariga ega
bo‘lishi kerak. Mavjud jadvalga ikkita nullable usage-evidence maydonini qo‘shish uchun ham
`bigquery.tables.update` talab qilinadi. Yetishmayotgan ruxsat eksportni kursorni oldinga
siljitmasdan muvaffaqiyatsiz tugatadi.

Sozlangan paket HTTP birligi emas, **kursor** birligidir: `send()` uni ko‘pi bilan 500 ta
qatorli insertAll chaqiruvlariga bo‘ladi, shuning uchun katta `batch_size` BigQuery’ning 10 MB
so‘rov chegarasini buzolmaydi. Vaqtinchalik holatlar (408/429/500/502/503/504) eksponensial
kechikish bilan uch martagacha qayta uriniladi va bir xil insertIds qayta ishlatiladi; autentifikatsiya
va sxema xatolari esa ishga resurs sarflamaslik uchun birinchi urinishdayoq xatolik chiqaradi.

Bir necha lahza oldin yaratilgan jadval streaming endpoint’ida hali ko‘rinmasligi va bir necha
soniya davomida 404 qaytarishi mumkin. Bu 404 qayta uriniladi, ammo **faqat joriy ish jadvalni
yaratgan bo‘lsa** — haqiqatan yetishmayotgan jadval esa darhol xatolik bilan yakunlanadi. Yaqinda
o‘chirilgan jadvalni o‘sha nom ostida qayta yaratish BigQuery’ning streaming insertlarini bir necha
daqiqa davomida rad etishiga olib kelishini yodda tuting; bu o‘chirish va qayta yaratishning o‘ziga
xos xususiyati, shuning uchun jadvalni o‘chirib, qayta qo‘shishdan ko‘ra yangi jadval nomidan
foydalaning.

**Qisman xatolik HTTP 200 va bo‘sh bo‘lmagan `insertErrors[]` bilan keladi.** Bu xatolik sifatida
ko‘riladi va xatolik chiqaradi; shu orqali BigQuery qabul qilmagan qatorlardan keyin kursorning
oldinga siljishi to‘xtatiladi. `tests/unit/log-export-bigquery.test.ts` bu xatti-harakatni
qat’iy tekshiradi.

Transport oddiy REST hisoblanadi — o‘z-o‘zini imzolagan RS256 assertion
`https://oauth2.googleapis.com/token` manzilida access token’ga almashtiriladi, so‘ng qatorlar
`tabledata.insertAll` ga yuboriladi. Hech qanday Google SDK yuklanmaydi. Access tokenlari
jarayon ichida (service account, scope) juftligi bo‘yicha keshlanadi.

Yaratilgan jadval Logs yorlig‘idagi har bir maydon uchun bittadan ustun hamda `exported_at`
ustunini o‘z ichiga oladi va qo‘ng‘iroq jurnallari amalda qanday so‘ralishiga moslab tuziladi:

- **`timestamp` bo‘yicha kunlarga bo‘lingan**, shuning uchun sana bilan chegaralangan so‘rov
  faqat tegishli kunlarni skanerlaydi.
- **`api_key_name`, `provider`, `model`, `status` bo‘yicha klasterlangan** (shu tartibda), shuning
  uchun kim ishga tushirgani, qayerga yuborilgani yoki muvaffaqiyatsiz bo‘lgan-bo‘lmaganini
  filtrlash har bir bo‘lim ichidagi bloklarni qisqartiradi. BigQuery ko‘pi bilan to‘rtta klasterlash
  ustuniga ruxsat beradi va ularning tartibi muhim: faqat `api_key_name` bo‘yicha filtr bloklarni
  qisqartiradi, faqat `status` bo‘yicha filtr esa buni qilmaydi.
- **`partitionExpirationDays` orqali ixtiyoriy bo‘limlarni saqlash muddati** (`0` hammasini
  saqlaydi), jadval yaratilganda qo‘llanadi.

Har ikkala sozlama ham yaratish vaqtida qo‘llanadi. Mavjud jadval o‘zida mavjud bo‘lgan tuzilmani
saqlab qoladi, shuning uchun ulardan foydalanmoqchi bo‘lsangiz, manzilni yangi jadval id’siga
yo‘naltiring.

`tests/unit/log-export-bigquery.test.ts` mapper va jadval sxemasi hamohangligini tekshiradi,
shuning uchun yangi qo‘ng‘iroq jurnali ustuni eksport vaqtida jimgina tashlab ketilmaydi.

Paketlar **qatorlar soni va seriyalashtirilgan baytlar** bo‘yicha ham bo‘linadi. Faqat qatorlar soni
yetarli emas, chunki payloadlar eksport qilinganda 500 ta promptli qator o‘nlab megabayt bo‘lishi
mumkin va insertAll 10 MB dan katta so‘rovni rad etadi. Bo‘laklar 500 ta qator yoki 9 MB ga
yetganda — qaysi biri avval sodir bo‘lsa — yopiladi.

## 5. OTLP/HTTP traces manzili

Konfiguratsiyada `type: "otlp-http"` ishlatiladi. Bu
saqlangan chaqiruv jurnallarining rejalashtirilgan, kursor bilan boshqariladigan eksportidir;
`open-sse/services/routing/otel.ts` dagi eng yaxshi harakat bilan jonli routing-event qabul qiluvchisi
emas. U qabul qiluvchining muhit o‘zgaruvchilari, taymerlari yoki buferlarini o‘qimaydi va
o‘zgartirmaydi. Ikkalasini ham yoqish spanlarning ikki mustaqil turini hosil qilishi mumkin;
ushbu chaqiruv jurnali spanlarini ajratish uchun `omniroute.log-export` instrumentation scope’dan
foydalaning.

| Kalit                    | Standart qiymat / maqsad                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `endpoint`               | To‘liq HTTP(S) traces URL manzili talab qilinadi; `/v1/traces` suffiksi qo‘shilmaydi              |
| `headers`                | Ixtiyoriy `Name: value` qatorlari yoki satrlardan iborat JSON obyekt; shifrlanadi                 |
| `requestHeaderAllowlist` | Bo‘sh (o‘chirilgan); span atributlari sifatida yozib olinadigan client header nomlari/prefikslari |
| `serviceName`            | `omniroute`; `service.name` resursi                                                               |
| `langfuseMapping`        | `false`; Langfuse generation/session/user atributlarini qo‘shadi                                  |
| `identity`               | `pseudonymous`, `keyName` yoki `none`                                                             |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                           |
| `timeoutMs`              | Har bir HTTP urinish uchun `30000`                                                                |
| `environment`            | Belgilanmagan; ixtiyoriy `langfuse.environment`                                                   |

Umumiy dashboard bu maydonlarni ko‘rsatadi. `paths` API massividan yoki yangi qatorlar/vergullar
bilan ajratilgan aniq pathlardan iborat textarea’dan qiymat qabul qiladi. Embeddings, rerank va
boshqa pathlar aniq ruxsat berilmasa, o‘tkazib yuboriladi. O‘tkazib yuborilgan qatorlar ham
kursorni oldinga siljitadi; mavjud runner’ning `exported`/`exportedTotal` hisoblagichlari qabul
qilingan spanlarni emas, filtrlab tashlangan qatorlarni ham qo‘shgan holda qayta ishlangan manba
qatorlarini hisoblaydi. Filtrlash child jarayonida amalga oshiriladi va uning IPC/cursor
shartnomasi o‘zgartirilmaydi.

URL tekshiruvi `src/shared/network/outboundUrlGuard.ts` dagi DB’siz
`parseAndValidateNonMetadataUrl` yordamchisidan foydalanadi: `block-metadata` siyosati.
Unda webhook validatoridagi metadata/protocol/embedded-credential tekshiruvlari shartsiz
amal qiladi, private URLlar esa ruxsat etiladi, biroq global feature-flag override’siz
localhost/LAN manzillariga ataylab ruxsat beriladi. Bu self-hosted Langfuse, Phoenix, Tempo va
Collector endpointlariga, jumladan private HTTP endpointlariga ruxsat beradi. Cloud-metadata
hostlari har doim bloklanadi. Redirectlar kuzatilmaydi, shuning uchun collector credentiallarni
boshqa hostga yo‘naltira olmaydi. Mavjud lexical URL guard kabi, bu DNS resolution’ni
mahkamlamaydi; faqat operator boshqaradigan hostlarni sozlang. Endpoint ishonchli tarmoqda
bo‘lmasa, HTTPS’dan foydalanish afzal.

### Payload va yetkazib berish

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) ruxsat berilgan
har bir qator uchun bitta CLIENT span olib yuradi; span nomi uning aniq request path’i bilan
belgilanadi. Path nomlanishi Chat Completions, Responses va Messages’ni span nomiga model yoki
identity ma’lumotlarini joylamagan holda ajratib turadi. Resurs atributlari `service.name` va
paketning `service.version` qiymatlarini o‘z ichiga oladi.

Oddiy chat urinishlari loggeri (`open-sse/handlers/chatCore/attemptLogging.ts`) yakunlanganda
`duration = Date.now() - startTime` qiymatini yozadi va timestamp taqdim etmaydi;
`src/lib/usage/callLogs.ts` dagi `saveCallLogOperation` esa timestamp’ni yozish
(yakunlanish) vaqtiga o‘rnatadi. Shu sababli eksport end = qator timestamp’i, start esa
end − duration sifatida belgilanadi (millisekundlar o‘nlik nanosekundlarga aylantiriladi).
Chaqiruvchi taqdim etgan tarixiy timestamplar ham end vaqti sifatida saqlanadi; har bir qator
uchun start/yakunlanish farqlovchisi mavjud emas. Null duration nolga aylanadi. Yaroqsiz yoki
yetishmayotgan timestamplar deterministik bo‘lmagan spanlar yaratish o‘rniga batch’ni
muvaffaqiyatsiz qiladi. `ttftMs` nullable bo‘lib, `omniroute.ttft_ms` ga moslashtiriladi.

Atributlar `gen_ai.operation.name="chat"`, provider, so‘ralgan/javob modelini, input/output
tokenlarini, ixtiyoriy cache-read/cache-creation/reasoning tokenlarini, HTTP status’ni,
combo, cache source, session tag va correlation id’ni o‘z ichiga oladi. Integer OTLP
qiymatlari va timestamplar o‘nlik satrlar ko‘rinishida bo‘ladi; satrlar, booleanlar va kasrli
sonlar o‘zlarining native OTLP value variantlaridan foydalanadi. Xato spanlari ERROR status’iga
ega bo‘ladi va tozalangan status xabarini o‘z ichiga oladi. Canonical record’da upstream host
URL mavjud emas, shuning uchun `server.address` model serverini noto‘g‘ri tarzda collector
sifatida ko‘rsatmaslik uchun tashlab ketiladi. Cost eksport qilinmaydi.

Faqat `includeBodies=true` content’ni yuklaydi. `langfuseMapping=false` bo‘lganda,
`gen_ai.input.messages` / `gen_ai.output.messages` OmniRoute tomonidan saqlangan sanitizatsiya
qilingan request/response body JSON’ini olib yuradi (parse qilish mumkin bo‘lsa,
canonicalizatsiya qilinadi), u qayta shakllantirilgan semconv messages massivi emas.
Qirqilgan/non-JSON bodylar xom matn sifatida qoladi. `langfuseMapping=true` bo‘lganda,
bodylar faqat `langfuse.observation.input` / `langfuse.observation.output` sifatida chiqariladi;
`gen_ai.*.messages` atributlari tashlab ketiladi, shunda har bir body bir marta yuboriladi.
Har ikkala rejim ham mavjud hydration path’dan `maxBodyBytes` qiymatini meros qilib oladi;
`omniroute.bodies_truncated=true` qirqilganini bildiradi.
Ushbu destination qo‘shimcha pipeline snapshotlari yoki sanitizatsiya qilinmagan artifact
o‘qishlarini qo‘shmaydi; ixtiyoriy request-header capture quyida tavsiflangan mavjud hydrated
client snapshot’dan foydalanadi. Bodylarni eksport qilishda soatlik backlog to‘plash o‘rniga
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kabi minutlik intervaldan foydalaning.

### Ixtiyoriy client request headerlari

Header capture **standart bo‘yicha o‘chirilgan**. Destination konfiguratsiyasida
`requestHeaderAllowlist` ni o‘rnating va **Export prompts and responses** ni yoqing
(destination’da `includeBodies: true`).

Allowlist API massividan yoki yangi qator/vergul bilan ajratilgan nomlarga ega textarea’dan
foydalanadi:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nomlar registrga bogʻliq boʻlmagan holda va aniq mos keladi, faqat bitta yakuniy `*` belgisi boʻsh boʻlmagan
header-name prefiksini tanlaydi. Yolgʻiz `*`, ichki wildcard belgilar va yaroqsiz HTTP header nomlari rad etiladi.
Koʻpi bilan 64 ta selektor boʻlishi mumkin, ularning har biridagi nom/prefiks uzunligi ASCII formatida koʻpi bilan 256 bayt.
Bu sozlama eksportchini collector’da autentifikatsiya qiluvchi `headers` sozlamasidan alohida.

Capture faqat saqlangan batafsil pipeline’ning `clientRawRequest` (yoki eski `clientRequest`) maydonidan toʻldiriladigan
`pipeline_client_request` maʼlumotini oʻqiydi. U hech qachon provider request headerlariga qaytib murojaat qilmaydi.
Soʻrov yozib olingan paytda batafsil pipeline loglash yoqilgan boʻlishi kerak. `includeBodies` oʻchirilgan boʻlsa yoki
client-snapshot JSON mavjud boʻlmasa, buzilgan boʻlsa yoxud kesilgan boʻlsa, header atributlari chiqarilmaydi.
`maxBodyBytes` qiymatini oshirish eksport vaqtida snapshot kesilishini oldini olishi mumkin;
u hech qachon saqlanmagan tafsilotni tiklay olmaydi. 1 MiB dan katta yoki 256 tadan ortiq header yozuvini
oʻz ichiga olgan snapshot eʼtiborsiz qoldiriladi. Mavjud prompt/response eksporti header capture bilan birga yoqilgan holda qoladi;
allowlist faqat headerlarni hydration qilish rejimini taqdim etmaydi.

Tanlangan qiymatlar, hatto bitta string boʻlsa ham, OTLP string massivlari sifatida
`http.request.header.<full lowercase header name>` ga aylanadi. Masalan,
`X-OmniRoute-Meta-Team: example-team` quyidagicha
`http.request.header.x-omniroute-meta-team` atributini hosil qiladi:
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Toʻliq prefiks saqlanadi: bular oddiy headerlar boʻlib, biznes maydonlarini tahlil qilish yoki
`omniroute.metadata.*` / Langfuse metadata konversiyasi bajarilmaydi. `langfuseMapping` header semantikasini
oʻzgartirmaydi. Tanlangan bitta qiymatli `User-Agent` standart `user_agent.original` scalar qiymatini ham oʻrnatadi.
Bitta qiymat ichidagi vergullar boʻlinmaydi. Registri turlicha variantlar saqlangan yozuvlar tartibida birlashtiriladi;
istalgan yaroqsiz variant butun headerni chiqarib tashlaydi. Atributlar kichik harfdagi nom boʻyicha tartiblanadi.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key headerlari, auth/token/secret/password/credential
markerlarini oʻz ichiga olgan nomlar va ichki gateway credentiallari, hatto tanlangan yoki saqlashda qisman maskalangan
boʻlsa ham, har doim chiqarib tashlanadi. Maʼlum credential patternlari umumiy credential detector’dan foydalanadi;
redaction markerlari chiqarib tashlanadi va xavfsiz qiymatlar sifatida eksport qilinmaydi.
Faqat stringlar va boʻsh boʻlmagan string massivlari qabul qilinadi; sonlar yoki obyektlar boshqa turga oʻgirilmaydi.
Yaroqsiz nomlar, prototype kalitlari, boshqaruv belgilaridan (horizontal tab bundan mustasno) va notoʻgʻri shakllangan
Unicode’dan iborat qiymatlar batch bajarilishini toʻxtatmasdan yoki ularning mazmunini xatolarda aks ettirmasdan eʼtiborsiz qoldiriladi.

Har bir span koʻpi bilan 32 ta header, har bir header uchun 16 ta qiymat, har bir qiymat uchun 4096 UTF-8 bayt
va qayd etilgan header nomlari hamda qiymatlarining umumiy hajmi sifatida 16384 UTF-8 baytni qamrab oladi.
Hajmi oshgan/yaroqsiz headerlar toʻliq chiqarib tashlanadi, kesilmaydi. Tanlov operatorning maxfiylikka oid qaroridir:
xavfsiz koʻrinadigan nomlar ham shaxsiy maʼlumotlarni oʻz ichiga olishi mumkin, bu chegaralar/detectorlar esa umumiy
PII tozalagichi hisoblanmaydi.

### Yetkazib berish cheklovlari

Soʻrovlar envelope bilan birga koʻpi bilan 500 ta span va 4 MiB UTF-8 JSON bilan cheklanadi.
Ruxsat berilgan har bir span cursor batch uchun birinchi soʻrovdan oldin hajm boʻyicha tekshiriladi. Chegaradan katta
alohida span shu batchning hech bir qismini yubormaydi va `maxBodyBytes` ni kamaytirish boʻyicha koʻrsatma bilan
xatolik yuz beradi; u jimlik bilan tashlab yuborilmaydi. Preflight faqat yozuv havolalari va baytlar sonini saqlaydi,
har bir vaqtinchalik span/JSONni tashlab yuboradi; batchning ikkinchi serializatsiya qilingan nusxasini xotirada
saqlamaslik uchun spanlar cheklangan qismlar uchun qayta yaratiladi. HTTP 408/429/5xx, tarmoq xatolari va timeoutlar
koʻpi bilan uch marta uriniladi, eksponensial kechikish 250/500 ms boʻladi. `Retry-After` soniyalari yoki HTTP sanalari
kechikishni 5 soniyagacha uzaytirishi mumkin. Boshqa statuslar darhol xatolik beradi. OTLP 2xx qisman rad etilsa ham
yoʻqolgan span tasdiqlanmasligi uchun exception chiqariladi; boʻsh yoki yaroqli JSON tasdiqlovlari qabul qilinadi,
javobni oʻqish 64 KiB bilan cheklanadi.

Xatolar faqat eksportchiga tegishli faktlarni oʻz ichiga oladi: HTTP statusi, qayta urinish klassi, urinishlar soni va
yuborilgan spanlar soni yoki tasdiqlash/tarmoq xatosi haqidagi qatʼiy matn. Collector javob bodylari,
qisman muvaffaqiyat sonlari va response headerlari xatolar, loglar yoki dashboard’ga hech qachon ko‘chirilmaydi.
Muvaffaqiyatsiz yoki qisman qabul qilingan batch tasdiqlanmaydi: destination shu status bilan Failing holatini
koʻrsatadi, cursor oxirgi tasdiqlangan batchda qoladi va keyingi ishga tushishda ayni qatorlar qayta yuboriladi.
Doimiy statuslar collector yoki konfiguratsiya tuzatilmaguncha xatolik berishda davom etadi. Javob tafsilotlari uchun
collector’ning oʻz loglaridan foydalaning. Call-log xatolari xulosalari alohida redaction’ni saqlab qoladi.
`prepare()` hech narsa provision qilmaydi; Test aynan `{"resourceSpans":[]}` ni yuboradi va call-log spanlarini yozmasdan
HTTP statusini bildiradi.

Trace id va span id qiymatlari mos ravishda
`"omniroute.trace\\0" + callLogId` va `"omniroute.span\\0" + callLogId` ustida hisoblangan SHA-256 ning
birinchi 32/16 ta hex raqamidir. Qayta yuborishlar bir xil idlarni olib yuradi. Bu deduplikatsiya kafolati emas:
baʼzi backendlar, jumladan Langfuse v4 ingestion, bir xil id’li spanlarni deduplikatsiya qilmaydi.
Crash yoki qisman chunk xatosi koʻpi bilan tasdiqlanmagan bitta cursor batchni qayta yuborishi mumkin; faqat uning
oxirgi HTTP chunk’i emas, butun batch takrorlanishi mumkin. Cursor batch hajmini shu murosani hisobga olgan holda tanlang.

### Langfuse misoli

Self-hosted Langfuse instance uchun quyidagi maydonlarni sozlang:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Authorization qiymatini lokal ravishda literal `public-key:secret-key` stringining Base64 ko‘rinishi sifatida yarating
(masalan, `Buffer.from(publicKey + ":" + secretKey).toString("base64")` yordamida).
Haqiqiy credentiallarni loglar, screenshotlar yoki issue’lar ichiga joylashtirmang. Mapping avtomatik ravishda
`x-langfuse-ingestion-version: 4` ni o‘rnatadi; Authorization baribir `headers` ichida taqdim etiladi.
Headerlar va yaratilgan identity salt mavjud shifrlangan secret-field mexanizmi hamda API placeholderlardan foydalanadi;
`STORAGE_ENCRYPTION_KEY` talab qilinadi.

Moslashtirish generatsiya turi/modeli, JSON’dan foydalanish tafsilotlari (input/output/total va mavjud
kesh kalitlari), JSON input/output snapshotlari, ERROR/DEFAULT darajasi, tozalangan holat xabari,
trace nomi, sessiya identifikatori, ixtiyoriy muhit va provider, so‘ralgan model, yo‘l, kombinatsiya, kesh
manbasi hamda holat bo‘yicha filtrlash mumkin bo‘lgan
`langfuse.observation.metadata.<key>` maydonini qo‘shadi. `langfuse.observation.completion_start_time`
boshlanish vaqtida ISO 8601 formatida bo‘ladi + TTFT faqat TTFT ma’lum bo‘lsa va davomiylik
doirasida bo‘lsa qo‘shiladi. Hech qanday xarajat atributlari yuborilmaydi.

Identifikatsiya rejimlari `langfuse.user.id` uchun qo‘llanadi:

- `pseudonymous` (standart): API kalitining ichki identifikatoridan per-destination tasodifiy 32 baytli salt yordamida hisoblangan HMAC-SHA256. Salt yaratishda mavjud bo‘lmasa hosil qilinadi, `identitySalt` sifatida shifrlanadi, hech qachon qaytarilmaydi va tahrirlash vaqtida saqlanib qoladi. Xom kalit identifikatorlari hech qachon span atributlariga joylanmaydi. Destination salt’ini qayta yaratish/almashtirish identifikatorlarni o‘zgartiradi.
- `keyName`: sozlangan API kaliti nomi, bu operator yorlig‘ini ataylab oshkor qiladi.
- `none`: foydalanuvchi identifikatori yo‘q. Sessiya teglari mavjud bo‘lsa, baribir eksport qilinadi; bu rejimlar ixtiyoriy prompt tarkibini yoki operator tomonidan taqdim etilgan sessiya/korelatsiya yorliqlarini anonimlashtirmaydi.

### Backfill qilmasdan boshlash

Faqat yaratish vaqtida **Joriy joylashuvdan boshlash (mavjud jurnallarni o‘tkazib yuborish)** opsiyasini yoqing yoki create API payload’ining yuqori darajasida
`startFromCurrentPosition: true` ni yuboring. Bu mavjud cursor yordamchilari yordamida
`cursor_row_id` qiymatini saqlab qolingan call-log qatorlarining joriy maksimal rowid qiymatiga
o‘rnatadi va migratsiyani talab qilmaydi. Standart qiymat false (cursor 0 va saqlangan tarixni
backfill qilish). Bu yangilash vaqtida cursor’ni qayta o‘rnatish sozlamasi emas.

Umumiy `ttftMs` qo‘shilishi BigQuery mapper’iga va yangi jadval sxemasiga nullable `ttft_ms` ustunini
ham qo‘shadi: uning sxema testi kanonik yozuvning har bir maydoni uchun ustun mavjud bo‘lishini
talab qiladi. Mavjud jadvallar o‘zgarmagan holda eksport qilinishda davom etadi:
`prepare()` jadval sxemasini o‘qiydi va faqat ushbu ustun mavjud bo‘lmaganda `ttft_ms` ni
chiqarib tashlaydi. Keyingi ishga tushirishda TTFT olish uchun nullable INT64 ustunini qo‘shing
yoki yangi jadvaldan foydalaning. Ixtiyoriy TTFT ustuni sxema yangilanishini ishga tushirmaydi. Foydalanish dalillariga oid ustunlar quyida keltirilgan shartli, ixtiyoriy yoqiladigan moslik oqimiga
amal qiladi; boshqa qator maydonlari qat’iy sxema tekshiruvini saqlab qoladi.

---

## 6. Yangi manzil qoʻshish

1. `LogExportDestinationType` turini eksport qiluvchi `src/lib/logExport/destinations/<name>.ts` faylini yarating:
   Zod `configSchema` sxemasi, UI uchun `fields` deskriptorlar massivi, `secretFields` va
   `test()` / `prepare()` / `send(records)` qaytaruvchi `createClient(config)`.
2. Uni `src/lib/logExport/registry.ts` faylidagi `DESTINATIONS` massiviga qoʻshing.
3. `tests/unit/` ichida testlar yozing.

Barcha oʻzgarish shundan iborat: doimiy saqlash, cron vazifasi, REST qatlami, maxfiy maʼlumotlarni shifrlash va
boshqaruv panelidagi forma — barchasi reyestrdan oʻqiydi.

Yangi manzil uchun ikkita qoida:

- Qisman xatolik yuz berganda `send()` **istisno chiqarishi shart**. Muvaffaqiyatli yakunlanish “bu satrlar manzilda mavjud” degan maʼnoni anglatadi,
  kursor esa ulardan butunlay oʻtib ketadi.
- Foydalanuvchi kiritgan URL manzilini qabul qiluvchi manzil soʻrov yuborishdan oldin uni
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) orqali,
  xuddi vebhuklar kabi tekshirishi shart. BigQuery uchun bu kerak emas: uning hostlari oʻzgarmas qiymatlardir.

---

## 7. Undan foydalanish

- **Boshqaruv paneli**: Integratsiyalar → Log eksporti. Manzil qo‘shing, hisob ma’lumotlarini
  yozuvlar kiritmasdan tekshirish uchun **Sinov**ni ishga tushiring, so‘ng uni yoqing.
- **Navbat**: har bir manzil kartasida kutilayotgan qatorlar va kursor ko‘rsatiladi; `GET
/api/log-export/status` xuddi shu ko‘rsatkichlarni, shuningdek oxirgi 20 ta ishga tushirishni qaytaradi.
- **Bitta manzildagi xato boshqalariga ta’sir qilmaydi** — ishga tushirish xulosasi har bir manzil
  holatini `last_status` / `last_error`da qayd etadi, ishga tushirishlar tarixi esa jamlanma holatni saqlaydi.
- **Manzilni o‘chirish uning kursorini ham o‘chiradi.** Uni qayta qo‘shish eng eski saqlanib
  qolgan chaqiruvlar jurnalidan boshlanadi va manzilda allaqachon mavjud bo‘lishi mumkin bo‘lgan
  qatorlarni qayta yuboradi. BigQuery’da har bir qatorning `insertId`i buni faqat BigQuery’ning
  o‘z takroriy yozuvlarni yo‘qotish oynasi ichida bartaraf etadi, shuning uchun manzilni o‘chirishdan
  ko‘ra uni o‘chirib qo‘yish ma’qul.

### Foydalanish dalillari sxemasi bilan moslik

Yangi BigQuery jadvallarida nullable `usage_evidence` (JSON saqlovchi STRING) va
`usage_estimated` (BOOL) mavjud. `autoCreate` yoqilganida, mavjud jadvalga faqat shu
yetishmayotgan nullable ustunlarni qo‘shish mumkin. Eksport qiluvchi maydon metama’lumotlarini ham
qo‘shgan holda mavjud sxemani to‘liq saqlaydi va qaytarilgan etagdan foydalanib shartli `PATCH`
yuboradi. Bir vaqtda yuz bergan sxema o‘zgarishi eksportning xato bilan tugashiga olib keladi,
ammo mavjud sxemaning ustiga yozilmaydi; keyingi ishga tushirishda jadval qaytadan o‘qiladi.

`autoCreate` o‘chirilganida, foydalanish dalillari mavjud yozuvlarni eksport qilishdan oldin bu
ustunlarni o‘zingiz qo‘shing. Sxema/etag metama’lumotlarining yetishmasligi yoki yangilashdagi xato
dalillar mavjud yozuvlarni kiritishga ham to‘sqinlik qiladi. Eksport kursori bunday xatoda oldinga
siljimaydi va dalillar hech qachon jimgina tashlab yuborilmaydi. Eksport bloklangan paytda ham
mahalliy jurnalni saqlash qoidalari amal qiladi, shuning uchun saqlanadigan manba qatorlari muddati
tugashidan oldin xatoni bartaraf eting.
