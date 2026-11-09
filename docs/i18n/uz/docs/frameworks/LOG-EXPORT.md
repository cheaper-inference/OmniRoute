# Log export (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute chaqiruv jurnallarini tashqi tahlil omboriga uzluksiz, bosqichma-bosqich eksport qilish.

Logs boshqaruv paneli ichki oynasi soʻrovlar tarixini SQLite (`call_logs`) bazasida saqlaydi; uning hajmi
rotatsiya va saqlash muddati bilan cheklangan. Jurnallarni eksport qilish ayni yozuvlar toʻplamini jadval
asosida tashqi manzilga yuboradi, shunda ular mahalliy maʼlumotlar bazasidan uzoqroq saqlanishi va boshqa
maʼlumotlar bilan birlashtirilishi mumkin. BigQuery — birinchi manzil; konveyer reyestr sifatida qurilgan,
shu sababli boshqa manzillarni qoʻshish mumkin.

---

## 1. Qanday ishlaydi

```
server (konfiguratsiyani deshifrlash + tekshirish, kursorni muvofiqlashtirish)
  → IPC-ni ishga tushirish → izolyatsiyalangan exportChild OT jarayoni
    → faqat oʻqish uchun storage.sqlite → umumiy chaqiruv jurnali soʻrovi/xaritalash
      → artefaktlarni asinxron yuklash → manzil prepare()/send()
        → paket IPC → server kursorni saqlaydi → tasdiqlash IPC
          → keyingi paket; done IPC → server muvaffaqiyatni qayd etadi
```

- **Rejalashtirish** — bitta `JobRegistry` cron vazifasi — `log_export`; standart qiymati
  `0 * * * *` (har soatda, UTC). `src/lib/initCloudSync.ts` faylida roʻyxatdan oʻtkaziladi;
  `OMNIROUTE_LOG_EXPORT_CRON` orqali oʻzgartirish mumkin. Har bir ishga tushishda barcha
  **yoqilgan** manzillar ketma-ket qayta ishlanadi.
- **Kursor** — SQLite-ning yashirin `call_logs.rowid` qiymati, har bir manzil uchun
  `log_export_destinations.cursor_row_id` maydonida saqlanadi. `timestamp` ataylab kursor
  sifatida ishlatilmaydi: chaqiruvchilar oʻz qiymatini taqdim etishi mumkin, shuning uchun
  sekin soʻrov keyinroq boshlangan tezroq soʻrovdan keyin yozilishi mumkin va vaqt belgisi
  kursori uni oʻtkazib yuborgan boʻlardi.
- **Paketlash** — har bir soʻrov uchun `batch_size` qator (standart qiymat 500), har bir
  ishga tushirish uchun `max_rows_per_run` qator (standart qiymat 10000); shu sababli katta
  navbat bitta ishga tushirishni bloklash oʻrniga bir necha ishga tushirish davomida
  qayta ishlanadi.
- **Yetkazib berish** — kursor faqat `send()` muvaffaqiyatli yakunlangandan keyin oldinga
  siljiydi. Muvaffaqiyatsiz paket kursorni avvalgi joyida qoldiradi, shuning uchun ayni qatorlar
  keyingi ishga tushirishda qayta yuboriladi. Kafolat haqiqiy aynan bir martalik yetkazib
  berish emas, balki kamida bir marta yetkazib berish va manzil tomonida dublikatlarni
  yoʻq qilishdan iborat: BigQuery har bir qatorga chaqiruv jurnali identifikatori boʻyicha
  kalit beradi va oʻzining dublikatlarni aniqlash oynasi doirasida bunga imkon qadar amal qiladi.
- **Ustma-ust bajarilishdan himoya** — cron ishga tushishi va `POST .../run` bir vaqtda
  bajarilishi mumkin. Hozirda qayta ishlanayotgan manzil ikki marta qayta ishlanish oʻrniga
  oʻtkazib yuboriladi (ishga tushirish natijasida `skipped: true`), shuning uchun parallel
  ishga tushirish paketni qayta yubora yoki kursorni orqaga yoza olmaydi.
- **Tozalashdan keyin tiklanish** — agar `cursor_row_id` qiymati `MAX(rowid)` qiymatidan
  yuqori boʻlib qolsa (butun jadval tozalangan va rowid qiymatlari boshidan boshlangan boʻlsa),
  bajaruvchi doimiy ravishda maʼlumotlarni koʻrmay qolmaslik uchun kursorni 0 ga qaytaradi.

### Izolyatsiyalangan bajaruvchi va cheklovlar

Node muhitida har bir manzil alohida, qisqa muddatli OT yordamchi jarayonini ishga tushiradi
(`worker_threads` emas, IPC bilan `child_process`). Body maʼlumotlarini oʻqish, foydali yuklama
JSON-ni tahlil qilish/serializatsiya qilish, manzilning `prepare()` amali va manzilga tarmoq
orqali murojaat qilishning barchasi serverning hodisalar siklida emas, shu jarayonda bajariladi.
IPC orqali faqat konfiguratsiya va kichik jarayon holati xabarlari uzatiladi; eksport qilingan
yozuvlar serverga hech qachon qaytmaydi. Cron vazifasi va hozir ishga tushirish marshruti bir xil
ommaviy natija hamda ustma-ust bajarilishdan himoyani saqlab qoladi.

Yordamchi jarayon server tomonidan aniqlangan `DATA_DIR/storage.sqlite` faylini `node:sqlite`
orqali faqat oʻqish rejimida, `busy_timeout=5000` va `query_only=ON` sozlamalari bilan ochadi.
U hech qanday DB singletonini import qilmaydi hamda migratsiya, zaxiralash yoki SQLite
yangilanishlarini bajarmaydi. Yoʻqolgan/buzilgan artefaktlarni hisobga olish (jumladan,
buzilgan artefakt uchun UPDATE amali) faqat boshqaruv panelining tafsilotlar yoʻlida qoladi.
Ikkala yoʻl ham bir xil sof tafsilot aniqlovchisidan foydalanadi; eksport fayl tizimidan
asinxron oʻqishni va artefakt → eski inline → eski disk → mavjud emas aniqlash tartibini
qoʻllaydi. Yordamchi jarayon oʻquvchini ochganda, ishga tushirish maksimal kiritish rowid
qiymatining suratini oladi; keyinroq kiritilgan yozuvlar keyingi ishga tushirishni kutadi.
Bu uzoq muddatli SQLite tranzaksiyasi emas, balki kiritish chegarasidir: WAL yozuvchilari va
nazorat nuqtalari tarmoq kutilayotgan paytda ham erkin ishlashda davom etadi. Mavjud qatorlarning
yangilanishi yoki oʻchirilishi ushbu chegara bilan muzlatilmaydi.

Har bir qabul qilingan paketdan keyin yordamchi jarayon tasdiqlashni kutadi. Server avval
`advanceLogExportCursor` bilan kursorni saqlaydi, keyin `ack` yuboradi; undan oldin keyingi paket
boshlanmaydi. Yuborishdagi xato, jarayonning ishdan chiqishi yoki vaqt tugashi ushbu paket
kursorini oldinga siljitmasdan xatoni qayd etadi. Oldin tasdiqlangan paketlar saqlangan holda
qoladi; koʻpi bilan bitta tasdiqlanmagan paket qayta yuborilishi mumkin. Muvaffaqiyat faqat
`done` dan va yordamchi jarayon xatosiz yakunlangandan keyin qayd etiladi. Xatolik yuz berganda
yordamchi jarayon SIGTERM bilan tugatiladi, 500 ms dan keyin esa SIGKILL ga kuchaytiriladi;
bajaruvchi jarayonning yopilishini kutadi.

| Muhit oʻzgaruvchisi                           | Standart qiymat | Maqsad                                       |
| --------------------------------------------- | --------------- | -------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000          | Har bir manzil uchun real vaqt cheklovi      |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024            | Yordamchi V8 old-space cheklovi, MB hisobida |

Notoʻgʻri, musbat boʻlmagan yoki butun son boʻlmagan qiymatlar uchun standart qiymatlar
ishlatiladi. Heap sozlamasi umumiy RSS cheklovi emas; juda katta paketlar yordamchi jarayon
xotirasini baribir tugatishi va ishga tushirishni xavfsiz tarzda muvaffaqiyatsiz yakunlashi
mumkin. Standart 1024 MB qiymati body maʼlumotlari yoqilgan holda 512 KiB artefaktlardan iborat
standart 500 qatorli paket uchun, jumladan BigQuery-ning bayt boʻlaklariga ajratilgan JSON
serializatsiyasini hisobga olgan holda, yetarli zaxira qoldiradi. Bu body maʼlumotlarini oʻz
ichiga olgan 10000 qatorli paketni xavfsiz qilmaydi. V8 heap xotirasining tugashi amaliy yechim
koʻrsatilgan xatoni qayd etadi: paket hajmini kamaytiring yoki
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` qiymatini oshiring; kursor oxirgi tasdiqlangan
paketda qoladi. Tarixiy inline/disk body maʼlumotlari zamonaviy artefakt cheklovi bilan
qamrab olinmaydi. Operatorlar, ayniqsa xotirasi cheklangan konteynerlarda, RSS uchun alohida
resurs ajratishlari kerak.

Yordamchi jarayon faqat aniqlangan `DATA_DIR`, `NODE_ENV`, aniq koʻrsatilgan `TZ` (eski fayl
nomlaridagi mahalliy vaqtni aniqlash uchun), mavjud boʻlsa `ELECTRON_RUN_AS_NODE` va quyidagi
tashqi ulanish parametrlarini meros qilib oladi: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`,
`NO_PROXY` (hamda ularning kichik harfli shakllari), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`,
`NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Global Undici dispatcher serverning
muhit asosidagi sof proksi aniqlashi va mahalliy hostlarni chetlab oʻtish qoidalaridan,
jumladan `NO_PROXY` dan foydalanadi; u `proxyFetch.ts` yoki uning DB/funksiya bayroqlarini
import qilmaydi. Proksi hisob maʼlumotlari uzatiladigan chiqishdan va qayd etilgan xatolardan
yashiriladi. Manzil hisob maʼlumotlari faqat bitta boshlash IPC xabarida uzatiladi, hech qachon
argv yoki muhit orqali emas; chiqish/xatolarni uzatishda prefiks qoʻshiladi va maxfiy maʼlumotlar
olib tashlanadi. Har bir cron ishga tushishida Node-ning SQLite ogohlantirishini takrorlamaslik
uchun yordamchi jarayonning exec argumentlarida faqat `ExperimentalWarning` oʻchiriladi;
boshqa turdagi ogohlantirishlar koʻrinishda qoladi.

Moʻljal modullari Next.js/server-only bogʻliqliklarisiz import qilinishi kerak. Mavjud
BigQuery implementatsiyasi bu shartga allaqachon javob beradi. Kirish tokenlari keshlari faqat quyi
jarayon bajarilishi davomida saqlanadi, bajarilishlar orasida emas. Node qoʻllab-quvvatlanadigan ish muhitidir
(`package.json` engines), biroq README faylidagi Bun oʻrnatish boʻlimi va `Dockerfile.bun` ham
`bun:sqlite` (`src/lib/db/core.ts` / adapterlar) yordamida ishlab chiqarish muhiti uchun moslik
yoʻlini taqdim etadi. Shu sababli, Bun ostida eksportlar avvalgi jarayon ichidagi yoʻlni saqlab qoladi
va bir martalik ogohlantirish chiqaradi: quyi jarayon xotirasi/vaqt chegarasi izolyatsiyasi mavjud emas.
Voqealar sikli va OOM izolyatsiyasi uchun Node dan foydalaning; Bun bu yerda faqat ishlab chiqish
muhiti uchun deb hisoblanmaydi.

`includeBodies` yoqilganda, bir soatlik foydali yuk navbatini toʻplash oʻrniga
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kabi daqiqalar darajasidagi davriylikni afzal koʻring.
Paket va qator cheklovlari har bir bajarilishni baribir chegaralaydi. Jarayonni ishga tushirish xarajati
har bir moʻljal uchun har bir bajarilishda sarflanadi; bu umumiy CPU sarfini kamaytirish uchun emas,
balki kichik ishga tushirish xarajati evaziga server voqealar siklini izolyatsiya qilish uchun xizmat qiladi.

### Foydali yuklar (promptlar va yakuniy javoblar)

Standart holatda eksport faqat Jurnallar **roʻyxati** koʻrsatadigan umumlashtiruvchi maydonlarni
oʻz ichiga oladi. **Promptlar va javoblarni eksport qilish** (`includeBodies`) yoqilsa, har bir chaqiruv
uchun Jurnallar **tafsilotlar** panelida koʻrsatiladigan maʼlumotlar ham yuboriladi:

| Maydon                           | Undagi maʼlumot                                                          |
| -------------------------------- | ------------------------------------------------------------------------ |
| `request_body` / `response_body` | Boshqaruv paneli koʻrsatadigan chaqiruv yuklari                          |
| `pipeline_route_decision`        | Router tanlagan maqsad va model                                          |
| `pipeline_client_request`        | Mijoz aynan yuborgan dastlabki soʻrov                                    |
| `pipeline_openai_request`        | Ichki OpenAI shakliga oʻgirilgandan keyingi soʻrov                       |
| `pipeline_provider_request`      | Provayder dialektida yuqori oqimga amalda yuborilgan soʻrov              |
| `pipeline_provider_response`     | Yuqori oqimdan olingan dastlabki javob                                   |
| `pipeline_client_response`       | Chaqiruvchiga qaytarilgan maʼlumot                                       |
| `pipeline_error`                 | Muvaffaqiyatsiz chaqiruv uchun konveyer darajasidagi xato tafsilotlari   |
| `bodies_truncated`               | Yuqoridagi biror maydon `maxBodyBytes` chegarasiga yetganda rost boʻladi |

Bu prompt tarkibi boʻlgani sababli, u **standart holatda oʻchirilgan** va ataylab har bir moʻljal
uchun alohida tanlanadi. Eksport va `getCallLogById` tafsilotlarni aniqlash mexanizmini birgalikda
ishlatgani sababli, boshqaruv panelida koʻrsatilgan maʼlumotning oʻzi yuboriladi: foydali yuklar
yozilayotgan vaqtda ulardagi PII allaqachon tozalangan va sirlar yashirilgan boʻladi, `noLog`
API kaliti bilan bajarilgan chaqiruv esa umuman hech qanday foydali yukni saqlamaydi, shuning uchun
eksport qilinadigan hech narsa boʻlmaydi.

Foydali yuklar har bir qator uchun fayl tizimidagi artefaktdan oʻqiladi, shu sababli maʼlumotlarni
toʻldirish faqat buni soʻragan moʻljallar uchun bajariladi. Yoʻqolgan yoki buzilgan artefakt paketni
xatoga uchratib, kursorni toʻxtatib qoʻyish oʻrniga uning umumlashtiruvchi maʼlumotlarini null
foydali yuklar bilan eksport qiladi.

`maxBodyBytes` (standart qiymati 262144) har bir maydonni cheklaydi. Uzunroq foydali yuklar
**tashlab yuborilmaydi, balki qisqartiriladi** — qirqilgan prompt ham «nima soʻralgan edi?» degan
savolga javob beradi — va qator `bodies_truncated` bilan belgilanadi. Oqim orqali qismlarga boʻlib
uzatilgan deltalar eksport qilinmaydi; yigʻilgan javob allaqachon `pipeline_provider_response` va
`pipeline_client_response` ichida mavjud.

---

## 2. Fayllar

| Qism                                | Joylashuv                                    |
| ----------------------------------- | -------------------------------------------- |
| Maqsad kontrakti                    | `src/lib/logExport/types.ts`                 |
| Reyestr                             | `src/lib/logExport/registry.ts`              |
| Sirlarni boshqarish                 | `src/lib/logExport/secrets.ts`               |
| Ishga tushiruvchi (ota-jarayon IPC) | `src/lib/logExport/runner.ts`                |
| Jarayon hayotiy sikli               | `src/lib/logExport/childRunner.ts`           |
| Bola jarayon kirish nuqtasi         | `src/lib/logExport/exportChild.ts`           |
| Faqat oʻqish uchun ochuvchi         | `src/lib/db/logExportReadOnly.ts`            |
| Umumiy soʻrov/xaritalash            | `src/lib/usage/callLogExportQueries.ts`      |
| Tafsilotlarni aniqlovchi            | `src/lib/usage/callLogDetailResolver.ts`     |
| API proyeksiyasi                    | `src/lib/logExport/presenter.ts`             |
| BigQuery maqsadi                    | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA autentifikatsiyasi        | `src/lib/logExport/googleServiceAccount.ts`  |
| Qoʻngʻiroqlar jurnali manbasi       | `src/lib/usage/callLogExportSource.ts`       |
| Doimiy saqlash                      | `src/lib/db/logExportDestinations.ts`        |
| Cron vazifasi                       | `src/lib/jobs/logExportJob.ts`               |
| REST qatlami                        | `src/app/api/log-export/`                    |
| Boshqaruv paneli sahifasi           | `src/app/(dashboard)/dashboard/log-export/`  |

Sxema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Barcha marshrutlar boshqaruv autentifikatsiyasidan o‘tadi (`requireManagementAuth`). Sirlar hech qachon qaytarilmaydi:
saqlangan sir literal `__stored__` ko‘rinishida qaytariladi va yangilash vaqtida shu qiymatni qayta yuborish
saqlangan hisob ma’lumotlarini o‘zgarishsiz qoldiradi.

Turi sir mavjudligini e’lon qiladigan manzilni yaratish yoki yangilash uchun **`STORAGE_ENCRYPTION_KEY`
talab qilinadi**. Usiz `encrypt()` hech qanday o‘zgartirishsiz uzatadi, shuning uchun hisob ma’lumotlarini
SQLite’ga ochiq matn ko‘rinishida yozish o‘rniga so‘rov 400 xatosi bilan rad etiladi (Telegram webhook’i
qo‘llaydigan himoya bilan bir xil).

| Metod    | Yo‘l                                     | Maqsad                                                                  |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Manzil turlari va ularning konfiguratsiya maydonlari ro‘yxati           |
| `GET`    | `/api/log-export/destinations`           | Manzillar ro‘yxati (sirlar yashirilgan)                                 |
| `POST`   | `/api/log-export/destinations`           | Manzil yaratish                                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | Bitta manzilni o‘qish                                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | Nom / yoqilganlik / konfiguratsiya / paketlashni yangilash              |
| `DELETE` | `/api/log-export/destinations/{id}`      | O‘chirish                                                               |
| `POST`   | `/api/log-export/destinations/{id}/test` | Hisob ma’lumotlarini tekshirish, hech narsa yozmaslik                   |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Darhol bo‘shatish, rejalashtirilgan ishga tushirish bilan bir xil yo‘l  |
| `GET`    | `/api/log-export/status`                 | Cron holati, so‘nggi ishga tushirishlar, har bir maqsad bo‘yicha navbat |

`GET /api/log-export/types` UI’ni universal qiladi: boshqaruv panelidagi shakl
qaytarilgan maydon deskriptorlari asosida chiziladi, shuning uchun yangi manzil UI’da hech qanday o‘zgarishni talab qilmaydi.

---

## 4. BigQuery manzili

Konfiguratsiya kalitlari (`type: "bigquery"`):

| Kalit                | Izohlar                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| `projectId`          | Dataset joylashgan GCP loyihasi                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                                             |
| `location`           | Faqat dataset yaratilishi kerak bo‘lganda ishlatiladi (standart `EU`)       |
| `serviceAccountJson` | Xizmat hisobi kaliti. Sir: saqlashda shifrlanadi, hech qachon qaytarilmaydi |
| `autoCreate`         | Birinchi eksportda dataset va jadvalni yaratish (standart `true`)           |

Xizmat hisobiga maqsad jadvalda `bigquery.tables.updateData`, shuningdek `autoCreate` yoqilganida
`bigquery.datasets.create` / `bigquery.tables.create` ruxsatlari kerak.

Sozlangan paket HTTP birligi emas, **kursor** birligidir: `send()` uni ko‘pi bilan 500 qatordan iborat
insertAll chaqiruvlariga bo‘ladi, shu sababli katta `batch_size` BigQuery’ning 10 MB so‘rov cheklovini buzmaydi.
Vaqtinchalik holatlar (408/429/500/502/503/504) bir xil insertIds’dan foydalangan holda eksponensial
kechikish bilan uch martagacha qayta uriniladi; autentifikatsiya va sxema xatolari esa ishga tushirishni
behuda davom ettirmaslik uchun birinchi urinishdayoq istisno chiqaradi.

Bir necha lahza oldin yaratilgan jadval oqimli uzatish endpoint’iga hali ko‘rinmaydi va u bir necha soniya
davomida 404 javobini qaytaradi. Bu 404 qayta uriniladi, ammo **faqat jadval shu ishga tushirish vaqtida yaratilgan bo‘lsa** —
haqiqatan mavjud bo‘lmagan jadval uchun jarayon darhol xato bilan tugaydi. Yaqinda o‘chirilgan jadvalni ayni nom ostida
qayta yaratish BigQuery’ning bir necha daqiqa davomida oqimli kiritishlarni rad etishiga olib kelishini unutmang;
bu o‘chirish va qayta yaratish xususiyati, shuning uchun jadvalni o‘chirib, qayta qo‘shish o‘rniga yangi jadval
nomidan foydalaning.

**Qisman muvaffaqiyatsizlik bo‘sh bo‘lmagan `insertErrors[]` bilan HTTP 200 ko‘rinishida keladi.** Bu xato sifatida
qabul qilinadi va istisno chiqaradi; aynan shu holat kursorning BigQuery qabul qilmagan qatorlardan o‘tib ketishini
to‘xtatadi; `tests/unit/log-export-bigquery.test.ts` ushbu xatti-harakatni mustahkamlaydi.

Transport oddiy REST orqali amalga oshiriladi — o‘z-o‘zidan imzolangan RS256 tasdiqnomasi
`https://oauth2.googleapis.com/token` manzilida kirish tokeniga almashtiriladi, so‘ng qatorlar `tabledata.insertAll`’ga
yuboriladi. Hech qanday Google SDK qo‘shilmaydi. Kirish tokenlari har bir (xizmat hisobi, qamrov) juftligi uchun
jarayon ichida keshlanadi.

Yaratilgan jadval Logs sahifasidagi har bir maydon uchun bittadan ustun hamda `exported_at` ustunini o‘z ichiga oladi
va chaqiruv jurnallarining amalda qanday so‘ralishiga mos ravishda tuziladi:

- **`timestamp` bo‘yicha kunlik bo‘limlarga ajratilgan**, shuning uchun sana bilan chegaralangan so‘rov faqat o‘sha kunlarni skanerlaydi.
- **`api_key_name`, `provider`, `model`, `status` bo‘yicha klasterlangan** (shu tartibda), shuning uchun
  kim ishga tushirgani, qayerga yuborilgani yoki muvaffaqiyatsiz tugaganiga ko‘ra filtrlash har bir bo‘lim ichidagi
  bloklarni qisqartiradi. BigQuery ko‘pi bilan to‘rtta klasterlash ustuniga ruxsat beradi va tartib muhim:
  faqat `api_key_name` bo‘yicha filtr bloklarni qisqartiradi, faqat `status` bo‘yicha filtr esa qisqartirmaydi.
- **`partitionExpirationDays` orqali ixtiyoriy bo‘limlarni saqlash muddati** (`0` hammasini saqlaydi), jadval
  yaratilganda qo‘llanadi.

Har ikkala sozlama ham yaratish vaqtida qoʻllanadi. Mavjud jadval oʻzining joriy tuzilishini saqlab qoladi, shu sababli
ularni qoʻllamoqchi boʻlsangiz, manzil sifatida yangi jadval identifikatorini koʻrsating.

`tests/unit/log-export-bigquery.test.ts` mapper va jadval sxemasi doimo bir-biriga mos boʻlishini tekshiradi,
shuning uchun yangi chaqiruv jurnali ustuni eksport paytida sezdirmasdan tashlab yuborilmaydi.

Paketlar **ham** qatorlar soni, **ham** serializatsiya qilingan baytlar boʻyicha qismlarga ajratiladi. Foydali yuklar eksport
qilinganda faqat qatorlar sonining oʻzi yetarli emas: soʻrov matnlarini oʻz ichiga olgan 500 qator oʻnlab megabayt boʻlishi mumkin va insertAll
10 MB dan katta soʻrovni rad etadi. Qismlar 500 qatorga yoki 9 MB ga yetganda — qaysi biri avval sodir boʻlsa — yopiladi.

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
`"omniroute.trace\0" + callLogId` va `"omniroute.span\0" + callLogId` ustidan hisoblangan SHA-256 ning dastlabki 32/16 ta o‘n oltilik raqamidir. Qayta yuborishlarda
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

## 6. Manzil qoʻshish

1. `LogExportDestinationType` ni eksport qiladigan `src/lib/logExport/destinations/<name>.ts` faylini yarating:
   UI uchun Zod `configSchema`, `fields` deskriptorlari massivi, `secretFields` va
   `test()` / `prepare()` / `send(records)` ni qaytaradigan `createClient(config)`.
2. Uni `src/lib/logExport/registry.ts` faylidagi `DESTINATIONS` massiviga qoʻshing.
3. `tests/unit/` ichida testlar yozing.

Oʻzgartirishning barchasi shundan iborat: doimiy saqlash qatlami, cron vazifasi, REST qatlami, maxfiy maʼlumotlarni shifrlash va
boshqaruv paneli shakli — barchasi registrdan maʼlumot oladi.

Yangi manzil uchun ikkita qoida:

- Qisman xatolik yuz berganda `send()` **xatolik chiqarishi shart**. Muvaffaqiyatli yakunlanish “ushbu manzilda bu qatorlar mavjud” degan maʼnoni anglatadi
  va kursor ulardan doimiy ravishda oʻtib ketadi.
- Foydalanuvchi taqdim etgan URL manzilini qabul qiladigan manzil soʻrov yuborishdan oldin uni,
  xuddi vebhuklar kabi, `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) orqali tekshirishi shart.
  BigQuery uchun bu talab qilinmaydi: uning hostlari oʻzgarmas.

---

## 7. Uni boshqarish

- **Boshqaruv paneli**: Integratsiyalar → Jurnal eksporti. Manzil qoʻshing, qatorlarni yozmasdan hisob maʼlumotlarini tekshirish uchun **Sinov**ni ishga tushiring, soʻng uni yoqing.
- **Navbat**: har bir manzil kartasi kutilayotgan qatorlar va kursorni koʻrsatadi; `GET
/api/log-export/status` ayni koʻrsatkichlar bilan birga oxirgi 20 ta vazifa ishga tushirilishini qaytaradi.
- **Bitta manzilning xatoligi boshqalariga taʼsir qilmaydi** — ishga tushirish xulosasi har bir manzil holatini
  `last_status` / `last_error` da qayd etadi, vazifani ishga tushirish tarixi esa umumiy natijani saqlaydi.
- **Manzilni oʻchirish uning kursorini ham oʻchiradi.** Uni qayta qoʻshish eng eski saqlanib qolgan
  chaqiruv jurnalidan boshlanadi va manzilda allaqachon mavjud boʻlishi mumkin boʻlgan qatorlarni qayta yuboradi. BigQueryʼda har bir qator uchun
  `insertId` buni faqat BigQueryʼning oʻz deduplikatsiya oynasi ichida bartaraf etadi, shuning uchun manzilni oʻchirishdan
  koʻra uni oʻchirib qoʻyish afzal.
