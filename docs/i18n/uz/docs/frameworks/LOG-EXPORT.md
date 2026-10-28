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

Konfiguratsiya kalitlari (`type: "bigquery"`):

| Kalit                | Izohlar                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `projectId`          | Maʼlumotlar toʻplami joylashgan GCP loyihasi                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                                          |
| `location`           | Faqat maʼlumotlar toʻplamini yaratish kerak boʻlganda ishlatiladi (standart qiymat `EU`) |
| `serviceAccountJson` | Xizmat hisobi kaliti. Maxfiy: saqlashda shifrlanadi, hech qachon qaytarilmaydi           |
| `autoCreate`         | Birinchi eksportda maʼlumotlar toʻplami va jadvalni yaratish (standart qiymat `true`)    |

Xizmat hisobiga maqsadli jadval uchun `bigquery.tables.updateData`, shuningdek,
`autoCreate` yoqilganida `bigquery.datasets.create` / `bigquery.tables.create` ruxsatlari kerak.

Sozlangan paket HTTP birligi emas, balki **kursor** birligidir: `send()` uni koʻpi bilan 500 qatorli insertAll
chaqiruvlariga boʻladi, shuning uchun katta `batch_size` BigQuery soʻrovlarining 10 MB chegarasidan oshib ketmaydi.
Vaqtinchalik holat kodlari (408/429/500/502/503/504) bir xil insertIds qiymatlarini qayta ishlatgan holda,
kutish oraligʻini eksponensial oshirish bilan uch martagacha qayta uriniladi; autentifikatsiya va sxema xatolari esa
butun ishga tushirishni behuda sarflash oʻrniga birinchi urinishdayoq istisno chiqaradi.

Hozirgina yaratilgan jadval oqimli kiritish endpointiga hali koʻrinmaydi va u
bir necha soniya davomida 404 javobini qaytaradi. Bu 404 uchun qayta uriniladi, ammo **faqat jadval ushbu ishga tushirishda yaratilgan boʻlsa** —
haqiqatan ham mavjud boʻlmagan jadval uchun esa xato darhol qaytariladi. Yaqinda oʻchirilgan jadval nomi bilan
jadvalni qayta yaratish BigQuery bir necha daqiqa davomida oqimli kiritishlarni rad etishiga olib kelishini unutmang; bu
oʻchirib, keyin qayta yaratishning oʻziga xos xususiyati, shuning uchun jadvalni oʻchirib qayta qoʻshishdan koʻra yangi nom ishlatgan maʼqul.

**Qisman muvaffaqiyatsizlik boʻsh boʻlmagan `insertErrors[]` bilan HTTP 200 shaklida keladi.** Bu
muvaffaqiyatsizlik deb hisoblanadi va istisno chiqaradi, shu orqali kursorning BigQuery qabul qilmagan qatorlardan
oʻtib ketishi toʻxtatiladi; `tests/unit/log-export-bigquery.test.ts` bu xatti-harakatni mustahkamlaydi.

Uzatish oddiy REST orqali amalga oshiriladi — oʻzi imzolagan RS256 tasdigʻi
`https://oauth2.googleapis.com/token` manzilida kirish tokeniga almashtiriladi, soʻng qatorlar `tabledata.insertAll` ga yuboriladi. Google SDK
qoʻshilmaydi. Kirish tokenlari jarayon ichida har bir (xizmat hisobi, ruxsat doirasi) juftligi uchun keshlanadi.

Yaratilgan jadvalda Logs ichki oynasining har bir maydoni uchun bittadan ustun hamda `exported_at` boʻladi va u
chaqiruv jurnallari amalda qanday soʻralishiga mos tuziladi:

- **`timestamp` boʻyicha kunlik qismlarga ajratiladi**, shuning uchun sana bilan cheklangan soʻrov faqat oʻsha kunlarni skanerlaydi.
- **`api_key_name`, `provider`, `model`, `status` boʻyicha klasterlanadi** (shu tartibda), shuning uchun
  kim ishga tushirgani, qayerga yuborilgani yoki muvaffaqiyatsiz tugagan-tugamaganiga koʻra filtrlash har bir qism ichidagi bloklarni chiqarib tashlaydi. BigQuery
  koʻpi bilan toʻrtta klasterlash ustuniga ruxsat beradi va tartib muhim: faqat `api_key_name` boʻyicha filtr
  bloklarni chiqarib tashlaydi, faqat `status` boʻyicha filtr esa bunday qilmaydi.
- **Qismlarni saqlash muddatini ixtiyoriy belgilash** `partitionExpirationDays` orqali amalga oshiriladi (0 hammasini saqlaydi) va
  jadval yaratilayotganda qoʻllanadi.

Ikkala sozlama ham yaratish vaqtida qoʻllanadi. Mavjud jadval oʻzining avvalgi tuzilishini saqlaydi, shuning uchun
ulardan foydalanmoqchi boʻlsangiz, manzilni yangi jadval identifikatoriga yoʻnaltiring.

`tests/unit/log-export-bigquery.test.ts` moslashtirgich va jadval sxemasining oʻzaro
muvofiqligini tekshiradi, shuning uchun yangi chaqiruv jurnali ustuni eksport paytida bildirmasdan tashlab ketilmaydi.

Paketlar qatorlar soni va seriallashtirilgan baytlar hajmining **ikkalasiga ham** qarab boʻlinadi. Yuklamalar eksport qilina boshlagach,
faqat qatorlar soni yetarli boʻlmaydi: promptlarni oʻz ichiga olgan 500 qator oʻnlab megabayt boʻlishi mumkin, insertAll esa
10 MB dan katta soʻrovni rad etadi. Boʻlaklar 500 qatorga yoki 9 MB ga yetganda — qaysi biri oldin yuz bersa — yakunlanadi.

---

## 5. OTLP/HTTP treyslarini yuborish manzili

Konfiguratsiyada `type: "otlp-http"` ishlatiladi. Bu saqlangan chaqiruv jurnallarini
kursor asosida, jadval bo‘yicha eksport qilish mexanizmidir; u
`open-sse/services/routing/otel.ts` ichidagi imkon qadar yetkazib berishga mo‘ljallangan jonli marshrutlash hodisalari qabul qiluvchisi emas. U o‘sha qabul qiluvchining muhit
o‘zgaruvchilari, taymerlari yoki buferlarini o‘qimaydi va o‘zgartirmaydi. Ikkalasini ham yoqish ikki mustaqil turdagi spanlarni hosil qilishi mumkin;
ushbu chaqiruv jurnali spanlarini ajratish uchun `omniroute.log-export` instrumentatsiya doirasidan foydalaning.

| Kalit                    | Standart qiymat / maqsad                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `endpoint`               | Treyslar uchun majburiy to‘liq HTTP(S) URL; `/v1/traces` qo‘shimchasi qo‘shilmaydi                     |
| `headers`                | Ixtiyoriy `Name: value` satrlari yoki satrlardan iborat JSON obyekti; shifrlanadi                      |
| `requestHeaderAllowlist` | Bo‘sh (o‘chirilgan); span atributlari sifatida yozib olinadigan mijoz sarlavhalari nomlari/prefikslari |
| `serviceName`            | `omniroute`; resursning `service.name` atributi                                                        |
| `langfuseMapping`        | `false`; Langfuse generatsiya/sessiya/foydalanuvchi atributlarini qo‘shadi                             |
| `identity`               | `pseudonymous`, `keyName` yoki `none`                                                                  |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                                |
| `timeoutMs`              | Har bir HTTP urinishi uchun `30000`                                                                    |
| `environment`            | Belgilanmagan; ixtiyoriy `langfuse.environment`                                                        |

Umumiy boshqaruv paneli ushbu maydonlarni ko‘rsatadi. `paths` API massivi yoki aniq yo‘llar
yangi satrlar/vergullar bilan ajratilgan ko‘p satrli matn maydonini qabul qiladi. Embedding, qayta saralash va boshqa yo‘llar
aniq ruxsat berilmasa, o‘tkazib yuboriladi. O‘tkazib yuborilgan qatorlar ham kursorni oldinga suradi; mavjud
bajaruvchining `exported`/`exportedTotal` hisoblagichlari qabul qilingan spanlarni emas, balki qayta ishlangan manba qatorlarini, jumladan filtrlab chiqarilgan
qatorlarni sanaydi. Filtrlash bola jarayonda, uning
IPC/kursor shartnomasini o‘zgartirmasdan amalga oshiriladi.

URL tekshiruvi
`src/shared/network/outboundUrlGuard.ts` faylidagi ma’lumotlar bazasiga bog‘liq bo‘lmagan `parseAndValidateNonMetadataUrl` yordamchi funksiyasidan, ya’ni
`block-metadata` siyosatidan foydalanadi. Unda xususiy URL manzillariga ruxsat berilgan webhook tekshiruvchisidagi kabi
metadata/protokol/URL ichiga joylangan hisob ma’lumotlari bo‘yicha bir xil shartsiz tekshiruvlar mavjud,
ammo u global funksiya bayrog‘i orqali cheklovni bekor qilmasdan localhost/LAN manzillariga ataylab ruxsat beradi. Bu
o‘z serverida joylashtirilgan Langfuse, Phoenix, Tempo va Collector
oxirgi nuqtalaridan, jumladan xususiy HTTP oxirgi nuqtalaridan foydalanish imkonini beradi. Bulut metama’lumotlari xostlari doim bloklanadi.
Qayta yo‘naltirishlarga amal qilinmaydi, shu sababli kollektor hisob ma’lumotlarini boshqa xostga yo‘naltira olmaydi.
Mavjud leksik URL himoyasi kabi, bu mexanizm ham DNS aniqlash natijasini qat’iy bog‘lamaydi; faqat
operator nazoratidagi xostlarni sozlang. Oxirgi nuqta ishonchli tarmoqda bo‘lmasa, HTTPS’dan foydalanishni afzal ko‘ring.

### Foydali yuk va yetkazib berish

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) har bir
ruxsat etilgan qator uchun aynan so‘rov yo‘li bilan nomlangan bitta CLIENT spanini uzatadi. Yo‘l asosida nomlash
Chat Completions, Responses va Messages so‘rovlarini span nomiga model yoki identifikatsiya ma’lumotlarini
kiritmasdan farqlaydi. Resurs atributlariga `service.name` va paketning `service.version` atributi kiradi.

Oddiy chat urinishi jurnal yozuvchisi (`open-sse/handlers/chatCore/attemptLogging.ts`) yakunlanganda
`duration = Date.now() - startTime` qiymatini yozadi va vaqt belgisini bermaydi;
`src/lib/usage/callLogs.ts` ichidagi `saveCallLogOperation` vaqt belgisini sukut bo‘yicha yozish
(yakunlanish) vaqtiga tenglaydi. Shuning uchun eksport tugash vaqtini qatorning vaqt belgisiga, boshlanish vaqtini esa tugash vaqti − davomiylikka
(millisekundlardan o‘nlik nanosekundlarga o‘girilgan holda) tenglaydi. Chaqiruvchi taqdim etgan tarixiy vaqt belgilari
ham tugash vaqti sifatida saqlanadi; har bir qator uchun boshlanish/yakunlanishni farqlovchi belgi yo‘q.
Null davomiylik nolga aylanadi. Noto‘g‘ri yoki mavjud bo‘lmagan vaqt belgilari
deterministik bo‘lmagan spanlar yaratish o‘rniga butun paketning xato bilan tugashiga olib keladi. `ttftMs` null bo‘lishi mumkin va `omniroute.ttft_ms` ga moslanadi.

Atributlarga `gen_ai.operation.name="chat"`, provayder, so‘ralgan/javobdagi model,
kirish/chiqish tokenlari, ixtiyoriy keshdan o‘qish/kesh yaratish/mulohaza tokenlari, HTTP holati,
kombinatsiya, kesh manbasi, sessiya tegi va korrelyatsiya identifikatori kiradi. OTLP butun son qiymatlari va vaqt belgilari
o‘nlik satrlar ko‘rinishida beriladi; satrlar, mantiqiy qiymatlar va kasr sonlar o‘zining tabiiy OTLP qiymat
variantlaridan foydalanadi. Xato spanlari ERROR holatiga va maxfiy ma’lumotlardan tozalangan holat xabariga ega. Kanonik
yozuvda yuqori oqim xostining URL manzili yo‘q, shuning uchun kollektorni model serveri sifatida noto‘g‘ri
ko‘rsatish o‘rniga `server.address` tashlab ketiladi. Xarajat eksport qilinmaydi.

Faqat `includeBodies=true` bo‘lgandagina mazmun yuklab to‘ldiriladi. `langfuseMapping=false` bo‘lganda,
`gen_ai.input.messages` / `gen_ai.output.messages` qayta shakllantirilgan semconv
xabarlar massivi emas, balki OmniRoute’da saqlangan, maxfiy ma’lumotlardan tozalangan so‘rov/javob
tanasi JSON’ini (tahlil qilish mumkin bo‘lsa, kanoniklashtirilgan holda) uzatadi. Qisqartirilgan/JSON bo‘lmagan tanalar oddiy matnligicha qoladi. `langfuseMapping=true` bo‘lganda,
tanalar faqat `langfuse.observation.input` / `langfuse.observation.output` sifatida chiqariladi;
har bir tana bir marta yuborilishi uchun `gen_ai.*.messages` atributlari tashlab ketiladi. Ikkala rejim ham
mavjud yuklab to‘ldirish yo‘lidan `maxBodyBytes` qiymatini oladi;
`omniroute.bodies_truncated=true` qisqartirishni bildiradi.
Ushbu manzil qo‘shimcha ishlov berish zanjiri oniy nusxalarini yoki maxfiy ma’lumotlardan tozalanmagan artefaktlarni o‘qishni qo‘shmaydi;
ixtiyoriy so‘rov sarlavhalarini yozib olish quyida tavsiflangan mavjud yuklab to‘ldirilgan mijoz oniy nusxasidan foydalanadi.
Tanalarni eksport qilishda bir soatlik navbatni to‘plash o‘rniga,
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kabi daqiqalik davriylikdan foydalaning.

### Ixtiyoriy mijoz so‘rovi sarlavhalari

Sarlavhalarni yozib olish **sukut bo‘yicha o‘chirilgan**. Manzil konfiguratsiyasida `requestHeaderAllowlist` ni belgilang
va **Promptlar va javoblarni eksport qilish** parametrini yoqing (manzilda `includeBodies: true`).
Ruxsat ro‘yxati API massivi yoki nomlar yangi satr/vergul bilan ajratilgan ko‘p satrli matn maydonini qabul qiladi:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nomlar katta-kichik harflarni hisobga olmasdan aniq moslashtiriladi, faqat oxiridagi yagona `*` bo‘sh bo‘lmagan
sarlavha nomi prefiksini tanlaydigan holat bundan mustasno. Alohida `*`, nom ichidagi joker belgilar va yaroqsiz HTTP sarlavha nomlari rad etiladi.
Ko‘pi bilan 64 ta selektor bo‘lishi mumkin, har birining nomi/prefiksi ko‘pi bilan 256 ASCII baytdan iborat bo‘ladi.
Bu sozlama eksportyorni kollektorda autentifikatsiya qiladigan `headers` sozlamasidan alohida.

Yig‘ish faqat saqlangan batafsil konveyerning `clientRawRequest` (yoki eski `clientRequest`) maydonidan
to‘ldiriladigan `pipeline_client_request` maydonini o‘qiydi. U hech qachon provayder so‘rovi sarlavhalariga murojaat qilmaydi.
So‘rov qayd etilgan paytda konveyerni batafsil jurnallash yoqilgan bo‘lishi kerak. Agar
`includeBodies` o‘chirilgan bo‘lsa yoki mijoz holati nusxasining JSON ma’lumotlari yo‘q, buzilgan yoki kesilgan bo‘lsa, hech qanday sarlavha
atributlari chiqarilmaydi. `maxBodyBytes` qiymatini oshirish eksport paytida holat nusxasi kesilishining oldini olishi mumkin;
ammo u hech qachon saqlanmagan tafsilotlarni tiklay olmaydi. Hajmi 1 MiB dan oshgan yoki
256 tadan ortiq sarlavha yozuvini o‘z ichiga olgan holat nusxasi e’tiborga olinmaydi. Mavjud prompt/javob eksporti
sarlavhalarni yig‘ish bilan birga yoqilgan holda qoladi; ruxsat ro‘yxati faqat sarlavhalarni yuklash rejimini taqdim etmaydi.

Tanlangan qiymatlar hatto bitta satr bo‘lsa ham, `http.request.header.<full lowercase header name>` OTLP satr massivlariga aylanadi.
Masalan, `X-OmniRoute-Meta-Team: example-team`
`http.request.header.x-omniroute-meta-team` atributiga aylanadi va qiymati
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` bo‘ladi.
To‘liq prefiks saqlanadi: bular oddiy sarlavhalar bo‘lib, biznes maydonlari tahlili yoki
`omniroute.metadata.*` / Langfuse metama’lumotlariga aylantirish bajarilmaydi. `langfuseMapping` sarlavha
semantikasini o‘zgartirmaydi. Tanlangan bir qiymatli `User-Agent` standart skalyar
`user_agent.original` atributini ham o‘rnatadi. Bitta qiymat ichidagi vergullar bo‘yicha ajratilmaydi. Harf registri bilan farqlanuvchi variantlar saqlangan
yozuvlar tartibida birlashtiriladi; istalgan yaroqsiz variant butun sarlavhaning chiqarib tashlanishiga olib keladi. Atributlar kichik harfdagi nom bo‘yicha tartiblanadi.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API kaliti sarlavhalari, nomida
auth/token/secret/password/credential belgilari bor sarlavhalar va ichki shlyuz hisob ma’lumotlari, hatto
tanlangan yoki saqlashda qisman niqoblangan bo‘lsa ham, doim chiqarib tashlanadi. Ma’lum hisob ma’lumotlari andozalari uchun
umumiy hisob ma’lumotlari detektori qayta ishlatiladi; yashirish belgilari xavfsiz qiymat sifatida eksport qilinmaydi, balki chiqarib tashlanadi.
Faqat satrlar va bo‘sh bo‘lmagan satr massivlari qabul qilinadi; sonlar yoki obyektlar majburan o‘zgartirilmaydi.
Yaroqsiz nomlar, prototip kalitlari, boshqaruv belgilari (gorizontal tabulyatsiyadan tashqari) va noto‘g‘ri Unicode
paketni xatoga uchratmasdan yoki ularning mazmunini xatolarda aks ettirmasdan e’tiborsiz qoldiriladi.

Har bir span ko‘pi bilan 32 ta sarlavhani, har bir sarlavha uchun 16 ta qiymatni, har bir qiymat uchun 4096 UTF-8 baytni
va yig‘ilgan sarlavha nomlari hamda qiymatlari bo‘yicha jami 16384 UTF-8 baytni qamrab oladi. Hajmi ortiqcha yoki yaroqsiz sarlavhalar
kesilmaydi, balki butunlay chiqarib tashlanadi. Tanlash — operatorning maxfiylikka oid qarori: xavfsiz ko‘rinadigan nomlar
ham shaxsiy ma’lumotlarni o‘z ichiga olishi mumkin, bu cheklovlar va detektorlar esa shaxsni aniqlash mumkin bo‘lgan ma’lumotlarni umumiy tozalash vositasi emas.

### Yetkazib berish cheklovlari

So‘rovlar tashqi qobiqni ham hisobga olgan holda 500 ta span va 4 MiB UTF-8 JSON bilan cheklanadi.
Har bir ruxsat etilgan span kursor paketining birinchi so‘rovidan oldin hajm bo‘yicha tekshiriladi. Alohida
span limitdan katta bo‘lsa, paketning hech bir qismi yuborilmaydi va `maxBodyBytes` qiymatini kamaytirish
tavsiyasi bilan xato qaytariladi; u bildirmasdan tashlab yuborilmaydi. Dastlabki tekshiruv faqat yozuv havolalari va
bayt sonlarini saqlab, har bir vaqtinchalik span/JSONni olib tashlaydi; paketning ikkinchi serializatsiyalangan nusxasini saqlash o‘rniga
spanlar hajmi cheklangan qismlar uchun qayta tuziladi. HTTP 408/429/5xx, tarmoq nosozliklari va kutish vaqti tugashi holatlarida
250/500 ms eksponensial kechikish bilan ko‘pi bilan uch marta uriniladi. `Retry-After` soniyalari yoki HTTP sanalari
kechikishni 5 soniyagacha uzaytirishi mumkin. Boshqa holat kodlari darhol xatoga olib keladi. OTLP 2xx qisman rad etilishi ham
yo‘qolgan spanni tasdiqlash o‘rniga xato chiqaradi; bo‘sh yoki yaroqli JSON tasdiqlari qabul qilinadi,
javobni o‘qish hajmi esa 64 KiB bilan cheklanadi.

Xatolar faqat eksportyorga tegishli faktlarni o‘z ichiga oladi: HTTP holati, qayta urinish toifasi, urinishlar va yuborilgan spanlar
soni yoki tasdiq/tarmoq nosozligi haqidagi qat’iy belgilangan matn. Kollektor javobining tanasi,
qisman muvaffaqiyat sonlari va javob sarlavhalari hech qachon xatolar, jurnallar yoki
boshqaruv paneliga ko‘chirilmaydi. Xatoga uchragan yoki qisman qabul qilingan paket tasdiqlanmaydi: manzil
shu holat bilan nosoz deb ko‘rsatiladi, kursor oxirgi tasdiqlangan paketda qoladi va keyingi ishga tushirishda
ayni qatorlar qayta yuboriladi. Doimiy holat kodlari kollektor yoki konfiguratsiya
tuzatilmaguncha xato berishda davom etadi. Javob tafsilotlari uchun kollektorning o‘z jurnallaridan foydalaning. Chaqiruv jurnali xatolari xulosalari
uchun alohida yashirish mexanizmi saqlanadi.
`prepare()` hech qanday resurs yaratmaydi; sinov aynan `{"resourceSpans":[]}` ni yuboradi va
chaqiruv jurnali spanlarini yozmasdan HTTP holatini bildiradi.

Trace identifikatorlari va span identifikatorlari
`"omniroute.trace\\0" + callLogId` va `"omniroute.span\\0" + callLogId` ustidan hisoblangan SHA-256 ning dastlabki 32/16 ta o‘n oltilik raqamidir. Qayta yuborishlarda
bir xil identifikatorlar ishlatiladi. Bu takrorlarni bartaraf etish kafolati emas: ayrim server tizimlari, jumladan Langfuse
v4 qabul qilish tizimi, bir xil identifikatorli spanlar takrorlarini bartaraf etmaydi. Avariya yoki qismning qisman xatosi
ko‘pi bilan bitta tasdiqlanmagan kursor paketining qayta yuborilishiga olib kelishi mumkin; faqat uning oxirgi HTTP qismi emas,
balki butun paket takrorlanishi mumkin. Kursor paketi hajmini tanlashda shu murosani hisobga oling.

### Langfuse misoli

O‘z serveringizda joylashtirilgan Langfuse nusxasi uchun quyidagi maydonlarni sozlang:

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

Authorization qiymatini mahalliy ravishda aynan `public-key:secret-key` satrining Base64 ko‘rinishi sifatida
tuzing (masalan, `Buffer.from(publicKey + ":" + secretKey).toString("base64")` yordamida).
Haqiqiy hisob ma’lumotlarini jurnallar, skrinshotlar yoki muammo xabarlariga joylamang. Moslashtirish avtomatik ravishda
`x-langfuse-ingestion-version: 4` ni o‘rnatadi; Authorization esa hali ham `headers` orqali beriladi.
Sarlavhalar ham, yaratilgan identifikatsiya tuzi ham mavjud shifrlangan maxfiy maydon
mexanizmi va API o‘rinbosarlaridan foydalanadi; `STORAGE_ENCRYPTION_KEY` talab qilinadi.

Moslashtirish generatsiya turi/modeli, JSON formatidagi foydalanish tafsilotlari (kirish/chiqish/jami va mavjud
kesh kalitlari), JSON formatidagi kirish/chiqish oniy nusxalari, ERROR/DEFAULT darajasi, maxfiy maʼlumotlardan tozalangan holat xabari,
trassa nomi, sessiya identifikatori, ixtiyoriy muhit hamda provayder, soʻralgan model, yoʻl, kombinatsiya, kesh
manbasi va holati uchun filtrlash mumkin boʻlgan
`langfuse.observation.metadata.<key>` atributlarini qoʻshadi. `langfuse.observation.completion_start_time` faqat
TTFT maʼlum boʻlsa va davomiylik doirasida boʻlsa, boshlanish vaqti + TTFT qiymatining ISO 8601 formatidagi ifodasidir. Xarajat atributlari yuborilmaydi.

Identifikatsiya rejimlari `langfuse.user.id` uchun qoʻllanadi:

- `pseudonymous` (standart): API kalitining ichki identifikatoridan har bir manzil uchun tasodifiy
  32 baytli tuz bilan hisoblangan HMAC-SHA256. Tuz mavjud boʻlmasa, yaratish paytida hosil qilinadi, `identitySalt`
  sifatida shifrlanadi, hech qachon qaytarilmaydi va tahrirlash paytida saqlab qolinadi. Kalitlarning asl identifikatorlari hech qachon
  span atributlariga kiritilmaydi. Manzil tuzini qayta yaratish/almashtirish identifikatorlarni oʻzgartiradi.
- `keyName`: sozlangan API kaliti nomi; bu operator belgisini ataylab oshkor qiladi.
- `none`: foydalanuvchi identifikatori yoʻq. Sessiya teglari mavjud boʻlsa, baribir eksport qilinadi; bu rejimlar
  ixtiyoriy prompt mazmunini yoki operator taqdim etgan sessiya/korrelyatsiya belgilarini anonimlashtirmaydi.

### Eski maʼlumotlarni yuklamasdan boshlash

Faqat yaratish paytida **Joriy pozitsiyadan boshlash (mavjud jurnallarni oʻtkazib yuborish)** parametrini yoqing yoki
yaratish API soʻrovi maʼlumotlarining yuqori darajasida `startFromCurrentPosition: true` ni uzating. U mavjud kursor
yordamchilari orqali `cursor_row_id` ni saqlanayotgan chaqiruv jurnallarining joriy eng katta rowid qiymatiga oʻrnatadi,
migratsiyasiz. Standart qiymat false (kursor 0 va saqlangan tarixni qayta yuklash).
Bu yangilash paytida kursorni qayta oʻrnatish sozlamasi emas.

Umumiy `ttftMs` qoʻshimchasi BigQuery moslashtiruvchisi
va yangi jadval sxemasiga null qiymat qabul qiluvchi `ttft_ms` ustunini ham qoʻshadi: uning sxema testi har bir kanonik yozuv maydoni uchun
ustun boʻlishini talab qiladi. Mavjud jadvallar oʻzgarishsiz eksport qilinishda davom etadi: `prepare()` jadval sxemasini oʻqiydi va
faqat `ttft_ms` ustuni mavjud boʻlmaganda uni tashlab ketadi. Keyingi ishga tushirishda TTFT olish uchun
null qiymat qabul qiluvchi INT64 ustunini qoʻshing yoki yangi jadvaldan foydalaning. PATCH, sxemani avtomatik oʻzgartirish yoki qoʻshimcha
ruxsatlar talab qilinmaydi; qolgan barcha qator maydonlari uchun qatʼiy sxema tekshiruvi saqlanadi.

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

## 7. Ishlatish

- **Boshqaruv paneli**: Integratsiyalar → Jurnalni eksport qilish. Manzil qoʻshing, satrlarni yozmasdan
  hisob maʼlumotlarini tekshirish uchun **Sinov** tugmasini bosing, soʻng uni yoqing.
- **Navbat**: har bir manzil kartochkasida kutilayotgan satrlar va kursor koʻrsatiladi; `GET
/api/log-export/status` xuddi shu koʻrsatkichlarni hamda vazifaning oxirgi 20 ta bajarilishini qaytaradi.
- **Bitta manzildagi xatolik boshqalariga taʼsir qilmaydi** — bajarilish xulosasi har bir manzilning
  holatini `last_status` / `last_error` ichida qayd etadi, vazifaning bajarilish tarixi esa umumiy natijani saqlaydi.
- **Manzil oʻchirilsa, uning kursori ham oʻchiriladi.** Uni qayta qoʻshish saqlanib qolgan eng eski
  chaqiruv jurnalidan boshlanadi, natijada manzilda allaqachon mavjud boʻlishi mumkin boʻlgan satrlar qayta yuboriladi. BigQueryʼda har bir satrning
  `insertId` qiymati buni faqat BigQueryʼning oʻz takroriy yozuvlarni bartaraf etish vaqt oraligʻi ichida qoplaydi, shuning uchun
  manzilni oʻchirishdan koʻra uni oʻchirib qoʻyishni afzal koʻring.
