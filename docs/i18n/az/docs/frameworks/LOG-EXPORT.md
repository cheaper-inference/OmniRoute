# Log export (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute çağırış jurnallarının xarici analitika anbarına davamlı, artımlı ixracı.

İdarəetmə panelinin Jurnallar vərəqi sorğu tarixçəsini SQLite-da (`call_logs`) saxlayır; bu tarixçə
rotasiya və saxlanma müddəti ilə məhdudlaşdırılır. Jurnal ixracı eyni qeyd dəstini cədvəl üzrə xaricə göndərir ki, o,
yerli verilənlər bazasından daha uzun müddət saxlanıla və digər məlumatlarla birləşdirilə bilsin. İlk təyinat BigQuery-dir;
konveyer reyestr əsasında qurulduğundan, əlavə təyinatlar mövcud sistemi dəyişmədən əlavə olunur.

---

## 1. Necə işləyir

```
server (konfiqurasiyanın şifrəsini aç + yoxla, kursoru uyğunlaşdır)
  → IPC-ni başlat → təcrid olunmuş exportChild ƏS prosesi
    → yalnız oxunan storage.sqlite → ortaq çağırış jurnalı sorğusu/uyğunlaşdırması
      → artefaktların asinxron yüklənməsi → təyinat prepare()/send()
        → paket IPC → server kursoru saxlayır → təsdiq IPC
          → növbəti paket; tamamlanma IPC → server uğuru qeydə alır
```

- **Cədvəl** — bir `JobRegistry` cron tapşırığı, `log_export`, standart olaraq `0 * * * *` (hər saat,
  UTC). `src/lib/initCloudSync.ts` daxilində qeydiyyata alınır; `OMNIROUTE_LOG_EXPORT_CRON` ilə dəyişdirilə bilər.
  Hər işə düşmədə bütün **aktiv** təyinatların gözləyən qeydləri ardıcıl emal olunur.
- **Kursor** — SQLite-ın gizli `call_logs.rowid` dəyəri, hər təyinat üçün
  `log_export_destinations.cursor_row_id` daxilində saxlanılır. `timestamp` qəsdən kursor kimi istifadə edilmir: çağıranlar
  öz dəyərlərini verə bildiyindən, yavaş sorğu daha gec başlamış sürətli sorğudan sonra yazıla bilər
  və zaman nişanı əsaslı kursor onu ötürərdi.
- **Paketləmə** — hər sorğuda `batch_size` sətir (standart 500), hər icrada `max_rows_per_run` sətir
  (standart 10000); beləliklə, böyük yığılma bir işə düşməni bloklamaq əvəzinə bir neçə işə düşmə ərzində emal olunur.
- **Çatdırılma** — kursor yalnız `send()` uğurla tamamlandıqdan sonra irəliləyir. Paket uğursuz olduqda
  kursor olduğu yerdə qalır və eyni sətirlər növbəti icrada yenidən göndərilir. Təminat
  həqiqi «dəqiq bir dəfə» deyil, «ən azı bir dəfə» çatdırılma və təyinat tərəfində dublikatların aradan qaldırılmasıdır: BigQuery hər
  sətir üçün açar kimi çağırış jurnalının identifikatorundan istifadə edir və öz dublikatları aradan qaldırma intervalı daxilində buna mümkün qədər əməl edir.
- **Üst-üstə düşmədən qorunma** — cron işə düşməsi və `POST .../run` eyni anda baş verə bilər. Artıq
  emal olunan təyinat iki dəfə emal olunmaq əvəzinə ötürülür (icra nəticəsində `skipped: true`),
  buna görə paralel icra paketi yenidən göndərə və ya kursoru geriyə yaza bilməz.
- **Tam təmizlənmədən sonra bərpa** — `cursor_row_id` dəyəri `MAX(rowid)` dəyərindən böyük olarsa (bütün cədvəl
  təmizlənib və rowid dəyərləri yenidən başlayıbsa), icraçı qeydləri həmişəlik görməz hala düşmək əvəzinə kursoru 0-a qaytarır.

### Təcrid olunmuş icraçı və məhdudiyyətlər

Node üzərində hər təyinatın icrası ayrıca, qısamüddətli ƏS törəmə prosesi başladır (IPC ilə `child_process`,
`worker_threads` deyil). Gövdələrin oxunması, faydalı yükün JSON təhlili/serializasiyası, təyinatın
`prepare()` funksiyası və təyinatın şəbəkə giriş-çıxışı serverin hadisə dövrəsində deyil, həmin prosesdə işləyir.
IPC üzərindən yalnız konfiqurasiya və kiçik gedişat mesajları ötürülür; ixrac edilən qeydlər heç vaxt
serverə qayıtmır. Cron tapşırığı və İndi işə sal marşrutu eyni xaricə təqdim olunan nəticəni və üst-üstə düşmədən qorunmanı saxlayır.

Törəmə proses serverin müəyyən etdiyi `DATA_DIR/storage.sqlite` faylını `node:sqlite` vasitəsilə yalnız oxuma rejimində,
`busy_timeout=5000` və `query_only=ON` ilə açır. O, heç bir verilənlər bazası singletonunu idxal etmir və
miqrasiya, ehtiyat nüsxələmə və ya SQLite yeniləmələri həyata keçirmir. Çatışmayan/zədələnmiş artefaktların uçotu (o cümlədən
zədələnmiş artefakt üçün UPDATE) yalnız idarəetmə panelinin təfərrüat emalı yolunda qalır. Hər iki yol eyni yan təsirsiz
təfərrüat həlledicisindən istifadə edir; ixrac asinxron fayl sistemi oxumalarından və eyni artefakt → köhnə
daxili məlumat → köhnə disk məlumatı → heç biri həll ardıcıllığından istifadə edir. Törəmə proses oxuyucusunu açanda icra maksimum əlavəetmə rowid dəyərini
qeydə alır; sonrakı əlavələr növbəti icranı gözləyir. Bu, əlavəetmə
sərhədidir, uzunmüddətli SQLite tranzaksiyası deyil: şəbəkə gözləmələri zamanı WAL yazıcıları və yoxlama nöqtələri sərbəst qalır.
Bu sərhəd mövcud sətirlərin yenilənməsini/silinməsini dondurmur.

Hər qəbul edilmiş paketdən sonra törəmə proses təsdiq gözləyir. Server əvvəlcə
kursoru `advanceLogExportCursor` ilə saxlayır, sonra `ack` göndərir; bundan əvvəl növbəti paket başlamır.
Göndərmə xətası, qəza və ya vaxt aşımı həmin paketin kursorunu irəlilətmədən uğursuzluğu qeydə alır. Əvvəllər
təsdiqlənmiş paketlər təsdiqlənmiş olaraq qalır; ən çoxu bir təsdiqlənməmiş paket yenidən göndərilə bilər.
Uğur yalnız `done` mesajından və törəmə prosesin xətasız çıxışından sonra qeydə alınır. Uğursuzluqlar zamanı törəmə proses
SIGTERM ilə dayandırılır, 500 ms sonra isə SIGKILL tətbiq olunur və icraçı prosesin bağlanmasını gözləyir.

| Mühit dəyişəni                                | Standart | Məqsəd                                      |
| --------------------------------------------- | -------- | ------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Hər təyinat üçün real vaxt limiti           |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Törəmə prosesin V8 old-space limiti, MB ilə |

Yanlış/müsbət olmayan/tam ədəd olmayan dəyərlər üçün standart dəyərlər istifadə olunur. Dinamik yaddaş parametri ümumi
RSS limiti deyil; çox böyük paketlər yenə də törəmə prosesin yaddaşını tükədə və icranın təhlükəsiz şəkildə uğursuz olmasına səbəb ola bilər.
1024 MB standart dəyəri, BigQuery-nin baytlara görə hissələrə bölünmüş JSON serializasiyası da daxil olmaqla,
gövdələr aktiv olduqda 512 KiB artefaktlardan ibarət standart 500 sətirlik paket üçün əlavə ehtiyat saxlayır. Bu, gövdələri olan
10000 sətirlik paketi təhlükəsiz etmir. V8 dinamik yaddaşı tükəndikdə, görülməli tədbiri göstərən xəta qeydə alınır: paket
ölçüsünü azaldın və ya `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` dəyərini artırın; kursor son
təsdiqlənmiş paketdə qalır. Köhnə daxili/disk gövdələrinə müasir artefakt ölçüsü məhdudiyyəti tətbiq edilmir.
Operatorlar, xüsusən yaddaşı məhdud konteynerlərdə, RSS üçün ayrıca resurs planlaşdırmalıdırlar.

Alt proses yalnız həll edilmiş `DATA_DIR`, `NODE_ENV`, açıq şəkildə təyin edilmiş `TZ` (köhnə fayl adlarında
yerli vaxtın müəyyənləşdirilməsi), mövcud olduqda `ELECTRON_RUN_AS_NODE` və aşağıdakı çıxış parametrlərini miras alır:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (və onların kiçik hərflə yazılmış formaları),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Qlobal Undici dispetçeri serverin yalnız mühit dəyişənlərinə əsaslanan proksi müəyyənləşdirmə və yerli hostlar üçün
proksidən yan keçmə qaydalarını, o cümlədən `NO_PROXY` qaydasını paylaşır; o, `proxyFetch.ts` və ya onun verilənlər bazası/funksiya bayraqlarını idxal etmir.
Proksi giriş məlumatları ötürülən çıxışdan və qeydə alınan xətalardan gizlədilir. Təyinatın giriş məlumatları
yalnız bir başlanğıc IPC mesajında ötürülür, heç vaxt argv və ya mühit vasitəsilə ötürülmür; ötürülən çıxışa/xətalara
prefiks əlavə edilir və həssas məlumatlar təmizlənir. Hər cron icrasında Node-un SQLite xəbərdarlığının
təkrarlanmaması üçün alt prosesin icra arqumentlərində yalnız `ExperimentalWarning` söndürülür; digər xəbərdarlıq növləri görünən qalır.

Təyinat modulları Next.js/yalnız server üçün olan asılılıqlar olmadan idxal edilə bilməlidir. Mövcud
BigQuery tətbiqi artıq bu tələbi ödəyir. Giriş tokenlərinin keşləri yalnız alt prosesin
icrası müddətində saxlanılır, icralar arasında saxlanılmır. Dəstəklənən icra mühiti Node-dur (`package.json` engines), lakin README-dəki Bun
quraşdırma bölməsi və `Dockerfile.bun` həmçinin
`bun:sqlite` (`src/lib/db/core.ts` / adapterlər) istifadə edən istehsal mühiti üçün uyğunluq yolunu təqdim edir. Buna görə Bun altında ixraclar əvvəlki
prosesdaxili yolu saxlayır və birdəfəlik xəbərdarlıq verir: alt prosesin heap/vaxt limiti izolyasiyası mövcud deyil.
Hadisə dövrəsi və OOM izolyasiyası üçün Node istifadə edin; burada Bun yalnız inkişaf mühiti üçün nəzərdə tutulmuş sayılmır.

`includeBodies` aktiv olduqda, bir saatlıq faydalı yük yığılmasına yol vermək əvəzinə
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kimi dəqiqə səviyyəli tezliyə üstünlük verin.
Paket və sətir limitləri yenə də hər icranı məhdudlaşdırır. Hər icrada hər təyinat üçün
prosesin başladılması xərci yaranır; bu, ümumi CPU istifadəsini azaltmaq üçün deyil, kiçik başlanğıc xərci müqabilində serverin hadisə dövrəsini izolyasiya etmək üçündür.

### Faydalı yüklər (sorğular və tamamlamalar)

Standart olaraq ixrac yalnız Jurnalların **siyahısında** göstərilən xülasə sahələrini daşıyır.
**Sorğuları və cavabları ixrac et** (`includeBodies`) seçiminin aktivləşdirilməsi əlavə olaraq hər çağırış üçün Jurnalların **təfərrüatlar**
panelində göstərilənləri göndərir:

| Sahə                             | Nə saxlayır                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Çağırışın faydalı yükləri, idarəetmə panelində göstərildiyi kimi                |
| `pipeline_route_decision`        | Marşrutlaşdırıcının seçdiyi hədəf və model                                      |
| `pipeline_client_request`        | Müştərinin göndərdiyi sorğu, olduğu kimi                                        |
| `pipeline_openai_request`        | Daxili OpenAI formatına çevrildikdən sonrakı sorğu                              |
| `pipeline_provider_request`      | Provayderin formatında, faktiki olaraq yuxarı axına göndərildiyi kimi           |
| `pipeline_provider_response`     | Yuxarı axından alınan emal edilməmiş cavab                                      |
| `pipeline_client_response`       | Çağıran tərəfə qaytarılan məlumat                                               |
| `pipeline_error`                 | Uğursuz çağırış üçün konveyer səviyyəli xəta təfərrüatları                      |
| `bodies_truncated`               | Yuxarıdakı sahələrdən hər hansı biri `maxBodyBytes` həddinə çatdıqda doğru olur |

Bu, sorğu məzmunudur, ona görə də **standart olaraq söndürülüb** və qəsdən hər təyinat üçün ayrıca seçilir.
Göndərilənlər idarəetmə panelində göstərilənlərlə eynidir, çünki ixrac və `getCallLogById` təfərrüatların
əldə edilməsi mexanizmini paylaşır: faydalı yüklər
yazılarkən artıq şəxsi identifikasiya məlumatlarından təmizlənir və məxfi məlumatlar gizlədilir;
`noLog` API açarı ilə edilən çağırış isə ümumiyyətlə heç bir faydalı yük saxlamır, buna görə ixrac ediləcək heç nə yoxdur.

Faydalı yüklər fayl sistemindəki artefaktdan hər sətir üçün ayrıca oxunur, buna görə məlumatların tamamlanması yalnız
bunu tələb edən təyinatlar üçün yerinə yetirilir. Artefakt çatışmadıqda və ya zədələndikdə paketi uğursuz etmək və kursoru ilişib saxlamaq əvəzinə
onun xülasəsi null faydalı yüklərlə ixrac edilir.

`maxBodyBytes` (standart dəyər 262144) hər sahənin ölçüsünü məhdudlaşdırır. Daha uzun faydalı yüklər **atılmaq əvəzinə
qısaldılır** — qısaldılmış sorğu yenə də "nə soruşulmuşdu" sualına cavab verir — və sətir
`bodies_truncated` ilə işarələnir. Axınla hissə-hissə ötürülən fərqlər ixrac edilmir; yığılmış cavab
artıq `pipeline_provider_response` və `pipeline_client_response` sahələrindədir.

---

## 2. Fayllar

| Komponent                              | Yerləşmə                                     |
| -------------------------------------- | -------------------------------------------- |
| Təyinat müqaviləsi                     | `src/lib/logExport/types.ts`                 |
| Reyestr                                | `src/lib/logExport/registry.ts`              |
| Məxfi məlumatların idarə edilməsi      | `src/lib/logExport/secrets.ts`               |
| İcraçı (ana proses IPC-si)             | `src/lib/logExport/runner.ts`                |
| Prosesin həyat dövrü                   | `src/lib/logExport/childRunner.ts`           |
| Alt prosesin giriş nöqtəsi             | `src/lib/logExport/exportChild.ts`           |
| Yalnız oxuma rejimində açıcı           | `src/lib/db/logExportReadOnly.ts`            |
| Ortaq sorğu/uyğunlaşdırma              | `src/lib/usage/callLogExportQueries.ts`      |
| Təfərrüat həlledicisi                  | `src/lib/usage/callLogDetailResolver.ts`     |
| API proyeksiyası                       | `src/lib/logExport/presenter.ts`             |
| BigQuery təyinatı                      | `src/lib/logExport/destinations/bigquery.ts` |
| Google xidmət hesabı autentifikasiyası | `src/lib/logExport/googleServiceAccount.ts`  |
| Çağırış jurnalı mənbəyi                | `src/lib/usage/callLogExportSource.ts`       |
| Daimi saxlama                          | `src/lib/db/logExportDestinations.ts`        |
| Cron tapşırığı                         | `src/lib/jobs/logExportJob.ts`               |
| REST qatı                              | `src/app/api/log-export/`                    |
| İdarəetmə paneli səhifəsi              | `src/app/(dashboard)/dashboard/log-export/`  |

Sxem: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Bütün marşrutlar idarəetmə autentifikasiyasından keçir (`requireManagementAuth`). Məxfi məlumatlar heç vaxt qaytarılmır:
saxlanmış məxfi məlumat hərfi `__stored__` dəyəri kimi qaytarılır və yeniləmə zamanı həmin dəyərin geri göndərilməsi
saxlanmış giriş məlumatını qoruyur.

Tipində məxfi məlumat bəyan edilən təyinatın yaradılması və ya yenilənməsi **`STORAGE_ENCRYPTION_KEY`
tələb edir**. Bu olmadan `encrypt()` məlumatı heç bir xəbərdarlıq etmədən dəyişmədən ötürür, buna görə də giriş məlumatını SQLite-a açıq mətn şəklində yazmaq əvəzinə,
yazma əməliyyatı 400 kodu ilə rədd edilir (Telegram webhook-unun tətbiq etdiyi
eyni qoruma).

| Metod    | Yol                                      | Məqsəd                                                                |
| -------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Təyinat tipləri + onların konfiqurasiya sahələrinin siyahısı          |
| `GET`    | `/api/log-export/destinations`           | Təyinatları siyahıla (məxfi məlumatlar gizlədilir)                    |
| `POST`   | `/api/log-export/destinations`           | Təyinat yarat                                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | Bir təyinatı oxu                                                      |
| `PUT`    | `/api/log-export/destinations/{id}`      | Adı / aktivlik vəziyyətini / konfiqurasiyanı / paketləşdirməni yenilə |
| `DELETE` | `/api/log-export/destinations/{id}`      | Sil                                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | Giriş məlumatlarını yoxla, heç nə yazma                               |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Gözləyənləri indi ixrac et, planlaşdırılmış icra ilə eyni yolla       |
| `GET`    | `/api/log-export/status`                 | Cron vəziyyəti, son icralar, hər hədəf üzrə gözləyən məlumatlar       |

UI-ni universal edən `GET /api/log-export/types`-dır: idarəetmə panelinin forması
qaytarılan sahə təsvirləri əsasında qurulur, buna görə də yeni təyinat UI dəyişikliyi tələb etmir.

---

## 4. BigQuery təyinatı

Konfiqurasiya açarları (`type: "bigquery"`):

| Açar                 | Qeydlər                                                                          |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | Verilənlər dəstinin yerləşdiyi GCP layihəsi                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | Yalnız verilənlər dəsti yaradılmalı olduqda istifadə edilir (standart: `EU`)     |
| `serviceAccountJson` | Xidmət hesabının açarı. Məxfi: saxlanarkən şifrələnir, heç vaxt geri qaytarılmır |
| `autoCreate`         | İlk ixrac zamanı verilənlər dəstini və cədvəli yarat (standart: `true`)          |

Xidmət hesabına hədəf cədvəldə `bigquery.tables.updateData` icazəsi, həmçinin
`autoCreate` aktiv olduqda `bigquery.datasets.create` / `bigquery.tables.create` icazələri lazımdır.

Konfiqurasiya edilmiş paket HTTP vahidi deyil, **kursor** vahididir: `send()` onu hər birində
ən çox 500 sətir olan insertAll çağırışlarına bölür, buna görə böyük `batch_size` BigQuery-nin 10 MB sorğu limitini aşa bilməz.
Müvəqqəti statuslar (408/429/500/502/503/504) zamanı eyni insertIds dəyərlərindən təkrar istifadə edilməklə, eksponensial
artan gözləmə intervalları ilə üç dəfəyədək yenidən cəhd edilir; autentifikasiya və sxem xətaları isə icranı boş yerə
davam etdirmək əvəzinə ilk cəhddə istisna yaradır.

Bir neçə an əvvəl yaradılmış cədvəl axın son nöqtəsində hələ görünmür və bu son nöqtə
bir neçə saniyə ərzində 404 cavabı verir. Bu 404 cavabı zamanı yenidən cəhd edilir, lakin **yalnız cədvəl bu icra zamanı yaradılıbsa** —
həqiqətən mövcud olmayan cədvəl üçün xəta yenə dərhal baş verir. Nəzərə alın ki, yaxın vaxtlarda silinmiş adla
cədvəli yenidən yaratmaq BigQuery-nin bir neçə dəqiqə ərzində axınla sətir əlavə edilməsini rədd etməsinə səbəb olur; bu,
silib-yenidən-yaratma əməliyyatının xüsusiyyətidir, ona görə cədvəli silib yenidən əlavə etməkdənsə, yeni cədvəl adına üstünlük verin.

**Qismən uğursuzluq boş olmayan `insertErrors[]` ilə HTTP 200 kimi gəlir.** Bu, uğursuzluq kimi
qəbul edilir və istisna yaradır; məhz bu, kursorun BigQuery-nin heç vaxt qəbul etmədiyi sətirlərdən
irəli keçməsinin qarşısını alır; `tests/unit/log-export-bigquery.test.ts` bu davranışı təsdiqləyir.

Ötürmə adi REST vasitəsilə aparılır — öz açarı ilə imzalanmış RS256 təsdiqi
`https://oauth2.googleapis.com/token` ünvanında giriş tokeni ilə dəyişdirilir, sonra sətirlər `tabledata.insertAll` ünvanına göndərilir. Heç bir Google SDK-sı
əlavə edilmir. Giriş tokenləri proses daxilində hər (xidmət hesabı, səlahiyyət dairəsi) cütü üçün keşlənir.

Yaradılmış cədvəldə Jurnallar vərəqindəki hər sahə üçün bir sütun, üstəlik `exported_at` olur və cədvəl
çağırış jurnallarının faktiki sorğulanma üsuluna uyğun təşkil edilir:

- **`timestamp` üzrə gündəlik bölmələrə ayrılır**, beləliklə tarixlə məhdudlaşdırılmış sorğu yalnız həmin günləri skan edir.
- **`api_key_name`, `provider`, `model`, `status` üzrə klasterləşdirilir** (bu ardıcıllıqla), beləliklə
  kimin icra etdiyi, hara yönləndirildiyi və ya uğursuz olub-olmadığı üzrə filtrləmə hər bölmə daxilindəki blokları skandan kənarlaşdırır. BigQuery
  ən çox dörd klasterləşdirmə sütununa icazə verir və ardıcıllıq əhəmiyyətlidir: yalnız `api_key_name` üzrə filtr
  blokları skandan kənarlaşdırır, yalnız `status` üzrə filtr isə bunu etmir.
- **Bölmələr üçün istəyə bağlı saxlanma müddəti** `partitionExpirationDays` vasitəsilə (0 hər şeyi saxlayır) təyin edilir və
  cədvəl yaradılarkən tətbiq olunur.

Hər iki parametr yaradılma zamanı tətbiq olunur. Mövcud cədvəl əvvəlki təşkil formasını saxlayır, ona görə
bunları tətbiq etmək istəyirsinizsə, təyinatı yeni cədvəl identifikatoruna yönəldin.

`tests/unit/log-export-bigquery.test.ts` uyğunlaşdırıcının və cədvəl sxeminin sinxron qalmasını yoxlayır,
beləliklə yeni çağırış jurnalı sütunu ixrac zamanı səssizcə itirilə bilməz.

Paketlər **həm** sətir sayına, **həm də** seriallaşdırılmış bayt ölçüsünə görə hissələrə bölünür. Sorğu məzmunları ixrac edildikdə
təkcə sətir sayı kifayət etmir: promptları ehtiva edən 500 sətir onlarla meqabayt tuta bilər və insertAll
10 MB-dan böyük sorğunu rədd edir. Hissələr 500 sətrə və ya 9 MB-a çatdıqda tamamlanır — hansı həddə əvvəl çatılarsa.

---

## 5. OTLP/HTTP izlərinin təyinatı

Konfiqurasiya `type: "otlp-http"` istifadə edir. Bu, saxlanılmış çağırış jurnallarının
planlaşdırılmış, kursor əsaslı ixracıdır; `open-sse/services/routing/otel.ts` daxilindəki
canlı marşrutlaşdırma hadisələrini mümkün qədər çatdırmağa çalışan qəbuledici deyil. O, həmin qəbuledicinin mühit
dəyişənlərini, taymerlərini və ya buferlərini oxumur və dəyişdirmir. Hər ikisinin aktivləşdirilməsi iki müstəqil növ span yarada bilər;
bu çağırış jurnalı spanlarını fərqləndirmək üçün `omniroute.log-export` instrumentasiya əhatəsindən istifadə edin.

| Açar                     | Standart dəyər / məqsəd                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `endpoint`               | Tam HTTP(S) iz URL-i tələb olunur; `/v1/traces` sonluğu əlavə edilmir                           |
| `headers`                | İstəyə bağlı `Name: value` sətirləri və ya sətir dəyərlərindən ibarət JSON obyekti; şifrələnir  |
| `requestHeaderAllowlist` | Boş (söndürülüb); span atributları kimi qeydə alınacaq müştəri başlıqlarının adları/prefiksləri |
| `serviceName`            | `omniroute`; resursun `service.name` atributu                                                   |
| `langfuseMapping`        | `false`; Langfuse generasiya/sessiya/istifadəçi atributları əlavə edir                          |
| `identity`               | `pseudonymous`, `keyName` və ya `none`                                                          |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                         |
| `timeoutMs`              | Hər HTTP cəhdi üçün `30000`                                                                     |
| `environment`            | Təyin edilməyib; istəyə bağlı `langfuse.environment`                                            |

Ümumi idarəetmə paneli bu sahələri göstərir. `paths` API massivi və ya dəqiq yolların
yeni sətirlər/vergüllərlə ayrıldığı mətn sahəsi qəbul edir. Embeddings, rerank və digər yollar
açıq şəkildə icazə verilmədikcə ötürülür. Ötürülən sətirlər də kursoru irəlilədir; mövcud
icraçının `exported`/`exportedTotal` sayğacları qəbul edilmiş spanları deyil, filtrlənmiş
sətirlər də daxil olmaqla emal edilmiş mənbə sətirlərini sayır. Filtrləmə törəmə prosesdə, onun
IPC/kursor müqaviləsini dəyişdirmədən həyata keçirilir.

URL yoxlaması `src/shared/network/outboundUrlGuard.ts` daxilindəki verilənlər bazasından
asılı olmayan `parseAndValidateNonMetadataUrl` köməkçisindən istifadə edir: `block-metadata` siyasəti. O,
özəl URL-lərə icazə verilmiş webhook yoxlayıcısı ilə eyni şərtsiz metadata/protokol/URL-ə daxil edilmiş giriş məlumatları yoxlamalarını
tətbiq edir, lakin qlobal funksiya bayrağını dəyişmədən localhost/LAN hədəflərinə qəsdən
icazə verir. Bu, öz serverinizdə yerləşdirilən Langfuse, Phoenix, Tempo və Collector
son nöqtələrindən, o cümlədən özəl HTTP son nöqtələrindən istifadə etməyə imkan verir. Bulud metadatası hostları həmişə bloklanır.
Yönləndirmələr izlənilmir, buna görə kollektor giriş məlumatlarını başqa hosta yönləndirə bilməz.
Mövcud leksik URL qoruyucusu kimi, bu da DNS həllini sabitləmir; yalnız
operatorun nəzarətində olan hostları konfiqurasiya edin. Son nöqtə etibarlı şəbəkədə deyilsə, HTTPS-ə üstünlük verin.

### Faydalı yük və çatdırılma

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) icazə verilmiş hər sətir üçün
dəqiq sorğu yoluna uyğun adlandırılmış bir CLIENT spanı daşıyır. Yola əsaslanan adlandırma
model və ya kimlik məlumatlarını span adına daxil etmədən Chat Completions, Responses və Messages-i
fərqləndirir. Resurs atributlarına `service.name` və paketin `service.version` atributu daxildir.

Adi çat cəhdi jurnalçısı (`open-sse/handlers/chatCore/attemptLogging.ts`) tamamlanma zamanı
`duration = Date.now() - startTime` yazır və vaxt nişanı təqdim etmir;
`src/lib/usage/callLogs.ts` daxilindəki `saveCallLogOperation` vaxt nişanını standart olaraq yazılma
(tamamlanma) vaxtına təyin edir. Buna görə ixrac zamanı son = sətrin vaxt nişanı və başlanğıc = son − müddət
(millisaniyə ilə, onluq nanosaniyələrə çevrilərək) təyin olunur. Çağıran tərəfin təqdim etdiyi keçmiş vaxt nişanları
da son vaxt kimi saxlanılır; hər sətir üçün başlanğıc/tamamlanma fərqləndiricisi yoxdur.
Null müddət sıfıra çevrilir. Yanlış/çatışmayan vaxt nişanları
qeyri-deterministik spanlar yaratmaq əvəzinə paketin uğursuz olmasına səbəb olur. `ttftMs` null ola bilər və `omniroute.ttft_ms` atributuna uyğunlaşdırılır.

Atributlara `gen_ai.operation.name="chat"`, provayder, sorğulanan/cavab modeli,
giriş/çıxış tokenləri, istəyə bağlı keşdən oxuma/keş yaratma/mühakimə tokenləri, HTTP statusu,
combo, keş mənbəyi, sessiya etiketi və korrelyasiya identifikatoru daxildir. Tam ədəd OTLP dəyərləri və vaxt nişanları
onluq sətirlərdir; sətirlər, məntiqi dəyərlər və kəsr ədədləri öz doğma OTLP dəyər
variantlarından istifadə edir. Xəta spanları ERROR statusuna və təmizlənmiş status mesajına malikdir. Kanonik
qeyddə yuxarı axın hostunun URL-i yoxdur, buna görə kollektoru yanlışlıqla
model serveri kimi göstərmək əvəzinə `server.address` buraxılır. Xərc ixrac edilmir.

Yalnız `includeBodies=true` məzmunu yükləyib tamamlayır. `langfuseMapping=false` olduqda,
`gen_ai.input.messages` / `gen_ai.output.messages` yenidən formalaşdırılmış semconv
mesajlar massivini deyil, OmniRoute tərəfindən saxlanılmış təmizlənmiş sorğu/cavab
gövdəsinin JSON-unu (təhlil edilə bildikdə kanonikləşdirilmiş şəkildə) daşıyır. Kəsilmiş/JSON olmayan gövdələr xam mətn olaraq qalır. `langfuseMapping=true` olduqda,
gövdələr yalnız `langfuse.observation.input` / `langfuse.observation.output` kimi göndərilir;
hər gövdənin bir dəfə göndərilməsi üçün `gen_ai.*.messages` atributları buraxılır. Hər iki rejim
`maxBodyBytes` dəyərini mövcud məzmun yükləmə yolundan götürür;
`omniroute.bodies_truncated=true` kəsilməni işarələyir.
Bu təyinat əlavə emal xətti ani görüntüləri və ya təmizlənməmiş artefakt oxumaları əlavə etmir;
istəyə bağlı sorğu başlıqlarının qeydə alınması aşağıda təsvir edilən, mövcud yüklənmiş müştəri ani görüntüsündən istifadə edir.
Gövdələri ixrac edərkən saatlıq yığılma yaratmaq əvəzinə
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kimi dəqiqə səviyyəli intervaldan istifadə edin.

### İstəyə bağlı müştəri sorğusu başlıqları

Başlıqların qeydə alınması **standart olaraq söndürülüb**. Təyinat konfiqurasiyasında `requestHeaderAllowlist` təyin edin
və **Sorğuları və cavabları ixrac et** seçimini aktivləşdirin (təyinatda `includeBodies: true`).
İcazə siyahısı API massivi və ya adların yeni sətir/vergüllə ayrıldığı mətn sahəsi qəbul edir:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Adlar böyük-kiçik hərf fərqi nəzərə alınmadan və tam uyğunluqla müqayisə edilir; yalnız sonda yerləşən tək `*` boş olmayan
başlıq adı prefiksini seçir. Tək `*`, adın daxilindəki əvəzedici simvollar və etibarsız HTTP başlıq adları rədd edilir.
Ən çox 64 selektor ola bilər və hər birinin adı/prefiksi ən çox 256 ASCII baytı uzunluğunda ola bilər.
Bu parametr eksporteri kollektorda autentifikasiya edən `headers` parametrindən ayrıdır.

Başlıqların toplanması yalnız saxlanmış ətraflı konveyerin
`clientRawRequest` (və ya köhnə `clientRequest`) sahəsindən doldurulan `pipeline_client_request` sahəsini oxuyur. Provayder sorğusunun başlıqlarına heç vaxt ehtiyat mənbə kimi müraciət edilmir.
Sorğu qeydə alınarkən ətraflı konveyer jurnallaşdırması aktiv olmalı idi.
`includeBodies` deaktivdirsə və ya müştəri vəziyyətinin anlıq görüntüsünün JSON-u yoxdursa, zədələnibsə və ya kəsilibsə, heç bir başlıq
atributu yaradılmır. `maxBodyBytes` dəyərini artırmaq ixrac zamanı anlıq görüntünün kəsilməsinin qarşısını ala bilər;
bu, heç vaxt saxlanmamış təfərrüatları bərpa edə bilməz. Ölçüsü 1 MiB-dan böyük olan və ya
256-dan çox başlıq qeydi ehtiva edən anlıq görüntü nəzərə alınmır. Mövcud sorğu/cavab ixracı başlıqların toplanması ilə yanaşı
aktiv qalır; icazə siyahısı yalnız başlıqların yüklənməsi rejimini təmin etmir.

Seçilmiş dəyərlər, hətta tək sətir olduqda belə, `http.request.header.<full lowercase header name>` OTLP sətir massivlərinə çevrilir.
Məsələn, `X-OmniRoute-Meta-Team: example-team`
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` dəyəri ilə
`http.request.header.x-omniroute-meta-team` atributuna çevrilir.
Tam prefiks qorunur: bunlar biznes sahələrinin təhlili və ya
`omniroute.metadata.*` / Langfuse metadatasına çevrilmə olmadan adi başlıqlardır. `langfuseMapping` başlıqların
semantikasını dəyişmir. Seçilmiş təkdəyərli `User-Agent` həmçinin standart skalyar
`user_agent.original` atributunu təyin edir. Bir dəyərin daxilindəki vergüllər üzrə bölünmə aparılmır. Böyük-kiçik hərf variantları saxlanmış
qeydlərin ardıcıllığı ilə birləşdirilir; hər hansı etibarsız variant bütün başlığın buraxılmasına səbəb olur. Atributlar kiçik hərfli ada görə sıralanır.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API açarı başlıqları, adlarında
auth/token/secret/password/credential işarələri olan başlıqlar və daxili şlüzün giriş məlumatları həmişə
istisna edilir, hətta seçilmiş və ya saxlanmada qismən maskalanmış olsalar belə. Məlum giriş məlumatı nümunələri
ortaq giriş məlumatı detektorundan istifadə edir; gizlətmə markerləri buraxılır, təhlükəsiz dəyərlər kimi ixrac edilmir.
Yalnız sətirlər və boş olmayan sətir massivləri qəbul edilir; ədədlər və obyektlər məcburi çevrilmir.
Etibarsız adlar, prototip açarları, idarəetmə simvolları (üfüqi tabulyasiya istisna olmaqla) və səhv formalaşmış Unicode
paketin uğursuz olmasına və ya onların məzmununun xətalarda əks olunmasına səbəb olmadan nəzərə alınmır.

Hər span ən çox 32 başlıq, hər başlıq üçün 16 dəyər, hər dəyər üçün 4096 UTF-8 baytı
və toplanmış başlıq adları ilə dəyərləri üzrə cəmi 16384 UTF-8 baytı toplayır. Həddindən böyük/etibarsız başlıqlar
kəsilmir, bütövlükdə buraxılır. Seçim operatorun məxfiliklə bağlı qərarıdır: təhlükəsiz görünən adlar
yenə də şəxsi məlumat ehtiva edə bilər və bu məhdudiyyətlər/detektorlar ümumi təyinatlı fərdi identifikasiya məlumatı təmizləyicisi deyil.

### Çatdırılma məhdudiyyətləri

Sorğular zərf daxil olmaqla 500 span və 4 MiB UTF-8 JSON ilə məhdudlaşdırılır.
İcazə verilən hər spanın ölçüsü kursor paketinin ilk sorğusundan əvvəl yoxlanılır. Ayrı-ayrı
span limitdən böyükdürsə, həmin paketin heç bir hissəsi göndərilmir və `maxBodyBytes`
dəyərini azaltmaq tövsiyəsi ilə xəta yaranır; span səssizcə atılmır. İlkin yoxlama yalnız qeyd istinadlarını və
bayt saylarını saxlayır, hər müvəqqəti spanı/JSON-u atır; paketin ikinci seriallaşdırılmış nüsxəsini
saxlamaq əvəzinə spanlar məhdud ölçülü hissələr üçün yenidən qurulur. HTTP 408/429/5xx, şəbəkə nasazlıqları və gözləmə vaxtının bitməsi zamanı
250/500 ms eksponensial gözləmə ilə ən çox üç cəhd edilir. `Retry-After` saniyələri və ya HTTP tarixləri
gözləməni 5 saniyəyə qədər uzada bilər. Digər statuslar dərhal uğursuzluq yaradır. OTLP 2xx qismən rədd cavabı da
itirilmiş spanı təsdiqləmək əvəzinə xəta yaradır; boş və ya etibarlı JSON təsdiqləri
64 KiB cavab oxuma limiti ilə qəbul edilir.

Xətalar yalnız eksporterə aid faktları ehtiva edir: HTTP statusu, təkrar cəhd sinfi, cəhdlərin və göndərilmiş spanların
sayı və ya təsdiq/şəbəkə nasazlığı haqqında sabit mətn. Kollektorun cavab gövdələri,
qismən uğur sayları və cavab başlıqları heç vaxt xətalara, jurnallara və ya
idarə panelinə köçürülmür. Uğursuz və ya qismən qəbul edilmiş paket təsdiqlənmir: təyinat həmin statusla
uğursuzluq vəziyyətini göstərir, kursor son təsdiqlənmiş paketdə qalır və növbəti icra
eyni sətirləri yenidən göndərir. Daimi statuslar kollektor və ya konfiqurasiya
düzəldilənədək uğursuzluq yaratmağa davam edir. Cavab təfərrüatları üçün kollektorun öz jurnallarından istifadə edin. Çağırış jurnalı xəta xülasələrinin
ayrıca gizlətmə mexanizmi saxlanılır.
`prepare()` heç nə yaratmır; Test dəqiq olaraq `{"resourceSpans":[]}` göndərir və
çağırış jurnalı spanlarını yazmadan HTTP statusunu bildirir.

İz identifikatorları və span identifikatorları
`"omniroute.trace\\0" + callLogId` və `"omniroute.span\\0" + callLogId` üzərində hesablanmış SHA-256-nın ilk 32/16 onaltılıq rəqəmidir. Təkrar göndərişlərdə
eyni identifikatorlar istifadə olunur. Bu, dublikatların aradan qaldırılmasına zəmanət deyil: Langfuse
v4 qəbulu da daxil olmaqla bəzi arxa sistemlər eyni identifikatorlu spanların dublikatlarını aradan qaldırmır. Qəza və ya hissənin qismən uğursuzluğu
ən çox bir təsdiqlənməmiş kursor paketinin yenidən göndərilməsinə səbəb ola bilər; yalnız onun son HTTP hissəsi deyil,
bütün paket təkrarlana bilər. Kursor paketinin ölçüsünü seçərkən bu kompromisi nəzərə alın.

### Langfuse nümunəsi

Öz serverinizdə yerləşdirilən Langfuse instansiyası üçün bu sahələri konfiqurasiya edin:

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

Authorization dəyərini lokal olaraq hərfi `public-key:secret-key`
sətrinin Base64 kodlaşdırılması ilə yaradın (məsələn, `Buffer.from(publicKey + ":" + secretKey).toString("base64")` ilə).
Həqiqi giriş məlumatlarını jurnallara, ekran görüntülərinə və ya problem bildirişlərinə yapışdırmayın. Uyğunlaşdırma avtomatik olaraq
`x-langfuse-ingestion-version: 4` təyin edir; Authorization yenə də `headers` daxilində verilir.
Həm başlıqlar, həm də yaradılmış identiklik duzu mövcud şifrələnmiş məxfi sahə
mexanizmindən və API yer tutucularından istifadə edir; `STORAGE_ENCRYPTION_KEY` tələb olunur.

Uyğunlaşdırma generasiya növünü/modelini, JSON istifadə təfərrüatlarını (giriş/çıxış/cəmi və mövcud
keş açarları), JSON giriş/çıxış anlıq görüntülərini, ERROR/DEFAULT səviyyəsini, təmizlənmiş status mesajını,
iz adını, sessiya identifikatorunu, istəyə bağlı mühiti və provayder, tələb olunan model, yol, kombinasiya, keş
mənbəyi və status üçün filtrlənə bilən
`langfuse.observation.metadata.<key>` atributunu əlavə edir. `langfuse.observation.completion_start_time` yalnız TTFT məlum olduqda və müddət daxilində olduqda
başlanğıc + TTFT anını ISO 8601 formatında göstərir. Heç bir xərc atributu göndərilmir.

Kimlik rejimləri `langfuse.user.id` atributuna tətbiq olunur:

- `pseudonymous` (standart): API açarının daxili identifikatorunun hər təyinat üçün təsadüfi
  32 baytlıq salt ilə HMAC-SHA256 heşi. Salt mövcud deyilsə, yaradılma zamanı generasiya olunur,
  `identitySalt` kimi şifrələnir, heç vaxt qaytarılmır və redaktələr zamanı saxlanılır. Xam açar identifikatorları heç vaxt
  span atributlarına daxil edilmir. Təyinatın salt dəyərinin yenidən yaradılması/dəyişdirilməsi kimlikləri dəyişir.
- `keyName`: konfiqurasiya edilmiş API açarının adı; bu, operatorun verdiyi həmin etiketi qəsdən açıqlayır.
- `none`: istifadəçi identifikatoru yoxdur. Sessiya teqləri mövcud olduqda yenə də ixrac edilir; bu rejimlər
  ixtiyari prompt məzmununu və ya operatorun təqdim etdiyi sessiya/korrelyasiya etiketlərini anonimləşdirmir.

### Tarixçəni geriyə dönük doldurmadan başlamaq

Yalnız yaradılma zamanı **Cari mövqedən başla (mövcud jurnalları ötür)** seçimini aktivləşdirin və ya
yaratma API sorğusunun məlumat yükünün üst səviyyəsində `startFromCurrentPosition: true` ötürün. Bu,
miqrasiya aparmadan, mövcud kursor köməkçi funksiyalarından istifadə edərək `cursor_row_id` dəyərini hazırda saxlanılan çağırış jurnalı sətirlərinin maksimum rowid dəyərinə
təyin edir. Standart dəyər false-dur (kursor 0 və saxlanılan tarixçənin geriyə dönük doldurulması).
Bu, yeniləmə zamanı kursoru sıfırlamaq üçün parametr deyil.

Paylaşılan `ttftMs` əlavəsi BigQuery uyğunlaşdırıcısına və yeni cədvəl sxeminə
null qəbul edən `ttft_ms` sütununu da əlavə edir: onun sxem testi hər kanonik qeyd sahəsi üçün
sütun olmasını tələb edir. Mövcud cədvəllər dəyişiklik olmadan ixrac edilməyə davam edir: `prepare()` cədvəl sxemini oxuyur və
həmin sütun olmadıqda yalnız `ttft_ms` sahəsini buraxır. Növbəti işəsalmada TTFT əldə etmək üçün null qəbul edən INT64 sütununu
əlavə edin və ya yeni cədvəldən istifadə edin. PATCH, avtomatik sxem dəyişikliyi və ya əlavə
icazələr tələb olunmur; bütün digər sətir sahələri üçün ciddi sxem yoxlaması saxlanılır.

---

## 6. Təyinat məntəqəsinin əlavə edilməsi

1. `LogExportDestinationType` ixrac edən `src/lib/logExport/destinations/<name>.ts` yaradın:
   Zod `configSchema`, istifadəçi interfeysi üçün `fields` deskriptor massivi, `secretFields` və
   `test()` / `prepare()` / `send(records)` qaytaran `createClient(config)`.
2. Onu `src/lib/logExport/registry.ts` faylındakı `DESTINATIONS` massivinə əlavə edin.
3. `tests/unit/` daxilində testlər yazın.

Dəyişiklik bütövlükdə bundan ibarətdir: verilənlərin saxlanması, cron tapşırığı, REST qatı, məxfi məlumatların şifrələnməsi və
idarəetmə panelindəki forma — hamısı reyestrdən oxuyur.

Yeni təyinat məntəqəsi üçün iki qayda:

- Qismən uğursuzluq olduqda `send()` **istisna atmalıdır**. Uğurla tamamlanma "bu sətirlər təyinat məntəqəsində var" deməkdir
  və kursor həmişəlik həmin sətirləri keçir.
- İstifadəçinin təqdim etdiyi URL-i qəbul edən təyinat məntəqəsi sorğu göndərməzdən əvvəl onu
  vebhuklarda olduğu kimi `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) vasitəsilə yoxlamalıdır.
  BigQuery üçün buna ehtiyac yoxdur: onun hostları sabitdir.

---

## 7. İstismar

- **İdarəetmə paneli**: İnteqrasiyalar → Jurnal ixracı. Təyinat məntəqəsi əlavə edin, sətirləri yazmadan
  giriş məlumatlarını yoxlamaq üçün **Test** əməliyyatını işə salın, sonra onu aktivləşdirin.
- **Növbədəki məlumatlar**: hər təyinat məntəqəsinin kartında gözləyən sətirlər və kursor göstərilir; `GET
/api/log-export/status` eyni göstəriciləri və tapşırığın son 20 icrasını qaytarır.
- **Bir təyinat məntəqəsinin uğursuzluğu digərlərinin uğursuzluğuna səbəb olmur** — icra xülasəsi hər təyinat məntəqəsinin
  vəziyyətini `last_status` / `last_error` daxilində qeydə alır, tapşırığın icra tarixçəsi isə ümumi nəticəni saxlayır.
- **Təyinat məntəqəsi silindikdə onun kursoru da silinir.** Yenidən əlavə edildikdə proses saxlanılan ən köhnə
  çağırış jurnalından başlayır və təyinat məntəqəsində artıq mövcud ola bilən sətirlər yenidən göndərilir. BigQuery-də hər sətirə aid
  `insertId` bunun qarşısını yalnız BigQuery-nin öz dublikatları aradan qaldırma müddəti daxilində alır, buna görə də təyinat məntəqəsini
  silməkdənsə deaktiv etməyə üstünlük verin.
