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
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Cədvəl** — bir `JobRegistry` cron işi, `log_export`, defolt olaraq `0 * * * *` (saatlıq, UTC). `src/lib/initCloudSync.ts`-də qeydiyyatdan keçmişdir; `OMNIROUTE_LOG_EXPORT_CRON` ilə əvəz edilə bilər. Hər gənə hər drains** aktivləşdirildi** təyinat, ardıcıl olaraq.
- **Cursor** — SQLite- nin gizli `call_logs.rowid`, `log_export_destinations.cursor_row_id` də hər təyinat üçün davam etdi . `timestamp` qəsdən kursor deyil: zəng edənlər öz dəyərini verə bilər, belə ki, sonradan başlayan daha sürətli sorğudan sonra yavaş sorğu yazıla bilər və zaman damğası kursoru onu atlayar.
- **Partiya** hər sorğu üçün — `batch_size` sətirləri (standart 500), hər qaçış üçün `max_rows_per_run` sətirləri (defolt 10000) beləliklə, böyük bir geriləmə birini bloklamaq əvəzinə bir neçə gənə üzərindən boşaldılır.
- **Çatdırılma** — kursor yalnız `send()` həll edildikdən sonra irəliləyir. Uğursuz toplu kursoru olduğu yerdə tərk edir, beləliklə, eyni sətirlər növbəti qaçışda yenidən yoxlanılır. Zəmanət ən azı bir dəfə üstəgəl təyinat tərəfinin dublikasiyasıdır, dəqiq bir dəfə doğru deyil: BigQuery hər cərgəni zəng qeydinin identifikatoru ilə klaviş edir və bu, öz dedup pəncərəsində ən yaxşı səy əsasında qiymətləndirir.
- **Üst-üstə düşən qoruyucu** — the cron tick və `POST .../run` birlikdə atəş edə bilər. Artıq boşaldılan təyinat iki dəfə boşaldılmaq əvəzinə atlanır (çalışma nəticəsində `skipped: true` ), buna görə də paralel qaçış partiyanı yenidən göndərə və ya kursoru geriyə yaza bilməz.
- **Təmizləmə bərpası** — əgər `cursor_row_id` `MAX(rowid)` dən yuxarı olarsa (bütün cədvəl təmizləndi və sıralar yenidən başladılıb), qaçışçı həmişəlik kor olmaq əvəzinə 0-a geri sarılır.

### Təcrid olunmuş qaçışçı və məhdudiyyətlər

Node-da işə salınan hər bir təyinat ayrı, qısamüddətli OS uşaq prosesinə başlayır (`child_process` ilə IPC, `worker_threads` deyil). Bədən oxunuşları, faydalı yük JSON parsing/serialization, təyinat `prepare()` və təyinat şəbəkəsi I/O hamısı serverin hadisə dövrəsində deyil, orada işləyir. Yalnız konfiqurasiya və kiçik irəliləyiş mesajları keçir IPC; ixrac edilmiş qeydlər heç vaxt serverə qayıtmır. Cron işi və İndi Run marşrutu eyni ictimai nəticəni və üst-üstə düşən mühafizəni saxlayır.

Uşaq `busy_timeout=5000` və `query_only=ON` ilə `node:sqlite` istifadə edərək serverin həll edilmiş `DATA_DIR/storage.sqlite` -nı yalnız oxumaq üçün açır. O, heç bir DB singleton idxal etmir və miqrasiya, ehtiyat nüsxələri və ya SQLite yeniləmələri həyata keçirmir. Missing/corrupt artefakt mühasibatlığı ( UPDATE zədələnmiş artefakt daxil olmaqla) yalnız tablosunun təfərrüat yolunda qalır. Hər iki yol təmiz detal həlledicisini paylaşır; ixrac asinxron fayl sistemi oxunuşlarından və eyni artefaktdan istifadə edir → legacy inline → legacy disk → none resolution order. Uşaq oxuyucunu açdıqda qaçış maksimum daxiletmə sətirini çəkir; sonrakı daxiletmələr növbəti qaçışı gözləyir. Bu, uzunmüddətli SQLite əməliyyatı deyil, daxiletmə sərhədidir: WAL yazıçıları və nəzarət nöqtələri şəbəkə gözləmələri zamanı sərbəst qalır. mövcud cərgələrin Updates/deletions bu sərhədlə dondurulmur.

Hər qəbul edilmiş partiyadan sonra uşaq qəbulu gözləyir. Server əvvəlcə kursoru `advanceLogExportCursor` ilə saxlayır, sonra `ack` göndərir; ondan əvvəl növbəti partiya başlamır. Göndərmə uğursuzluğu, qəza və ya vaxt aşımı həmin partiyanı irəlilətmədən uğursuzluğu qeyd edir. Əvvəllər qəbul edilmiş partiyalar sadiq qalır; ən çox bir qəbul edilməmiş partiya yenidən göndərilə bilər. Uğur yalnız `done` və təmiz uşaq çıxışından sonra qeyd olunur. Uğursuzluqlar uşağı SIGTERM ilə dayandırır, 500 ms-dən sonra SIGKILL -ə yüksəlir və qaçışçı prosesin bağlanmasını gözləyir.

| Ətraf mühit dəyişkənliyi                      | Defolt | Məqsəd                              |
| --------------------------------------------- | ------ | ----------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | Hər təyinat üçün divar saatı limiti |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | MB-da uşaq V8 köhnə boşluq limiti   |

Invalid/non-positive/non-integer dəyərləri standartları istifadə edir. Yığın parametri ümumi RSS limiti deyil; çox böyük partiyalar hələ də uşaq yaddaşını tükəndirə və təhlükəsiz şəkildə qaça bilər. 1024 MB defolt, BigQuery-nin bayt-parçalanmış JSON serializasiyası da daxil olmaqla, gövdələri aktivləşdirilmiş 512 KiB artefaktdan ibarət defolt 500 cərgə toplu üçün boşluq buraxır. Bu, 10000 cərgəlik gövdə partiyasını təhlükəsiz etmir. V8 yığın tükənməsi təsirli bir uğursuzluğu qeyd edir: partiyanın ölçüsünü azaldın və ya `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` artırın; kursor sonuncu təsdiq edilmiş topluda qalır. Tarixi inline/disk cisimləri müasir artefakt qapağı ilə əhatə olunmur. Operatorlar RSS ayrıca, xüsusən də yaddaş məhdud konteynerlər daxilində büdcə ayırmalıdırlar.

Uşaq yalnız həll edilmiş `DATA_DIR`, `NODE_ENV`, açıq `TZ` (miras fayl adı yerli vaxt ayırdetmə), mövcud olduqda `ELECTRON_RUN_AS_NODE` və aşağıdakı gedən daxiletmələri miras alır: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (və `SSL_CERT_DIR` kiçik hərf formaları), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS` `SSL_CERT_FILE` Qlobal Undici dispetçer serverin təmiz mühit-proksi həllini və `NO_PROXY` daxil olmaqla yerli hostdan yan keçmə qaydalarını paylaşır; `proxyFetch.ts` və ya onun DB/feature bayraqlarını idxal etmir. Proksi etimadnamələri yönləndirilmiş çıxışdan və qeydə alınmış səhvlərdən redaktə edilir. Təyinat etimadnamələri yalnız bir başlanğıc IPC mesajında səyahət edir, heç vaxt argv və ya mühitdə deyil; output/error yönləndirilməsi prefiks edilir və təmizlənir. Yalnız `ExperimentalWarning` uşaq icra arqumentlərində qeyri-aktivdir ki, Node-un SQLite lərinin hər cron qaçışına xəbərdarlıq etməsinin qarşısını almaq; digər xəbərdarlıq növləri görünən qalır.

Təyinat modulları Next.js/server-only asılılığı olmadan idxal edilə bilən olmalıdır. Mövcud BigQuery tətbiqi artıq həmin müqaviləyə cavab verir. Access-token keşləri yalnız uşaq qaçışı üçün davam edir, qaçışlar arasında deyil. Node dəstəklənən iş vaxtıdır (`package.json` mühərrikləri). Ən yaxşı səy, dəstəklənməyən Bun uyğunluğu yolu mövcuddur ( `src/lib/db/core.ts` / adapterlərdə `bun:sqlite` və `Dockerfile.bun`), buna görə də ixraclar onun altından pozulmamalıdır. Bun altında ixraclar əvvəlki prosesdaxili yolu saxlayır və birdəfəlik xəbərdarlıq verir: uşaq heap/timeout izolyasiyası əlçatan deyil. Hadisə döngəsi və OOM izolyasiyası üçün Node istifadə edin.

`includeBodies` aktivləşdirildikdə, saatlıq faydalı yükün yığılması əvəzinə, `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kimi dəqiqə səviyyəli kadansa üstünlük verin. Partiya və sıra məhdudiyyətləri hələ də hər qaçışa bağlıdır. Prosesin işə salınması hər qaçış üçün təyinat üzrə ödənilir; bu, ümumi CPU istifadəsini azaltmaqla deyil, server hadisə-loop təcrid üçün kiçik bir başlanğıc dəyəri ticarət edir.

### Faydalı yüklər (istəklər və tamamlamalar)

Varsayılan olaraq, ixrac yalnız jurnalların xülasə sahələrini daşıyır** siyahı** göstərir. Yandırılır** İxrac sorğuları və cavablar** (`includeBodies`) əlavə olaraq Logs nə göndərir** təfərrüat** panel hər zəng üçün göstərilir:

| Sahə                             | Nə tutur                                                   |
| -------------------------------- | ---------------------------------------------------------- |
| `request_body` / `response_body` | İdarə paneli onları göstərdiyi kimi zəng faydalı yüklənir  |
| `pipeline_route_decision`        | Router hansı hədəfi və modeli seçdi                        |
| `pipeline_client_request`        | Xam sorğu tam olaraq müştərinin göndərdiyi kimi            |
| `pipeline_openai_request`        | Daxili OpenAI formasına tərcümə edildikdən sonra           |
| `pipeline_provider_request`      | Əslində provayder ləhcəsində yuxarıya göndərildiyi kimi    |
| `pipeline_provider_response`     | Xam yuxarı axın cavabı                                     |
| `pipeline_client_response`       | Nə zəng edənə qaytarıldı                                   |
| `pipeline_error`                 | Uğursuz zəng üçün boru kəməri səviyyəsində xəta detalı     |
| `bodies_truncated`               | Yuxarıdakı hər hansı sahə `maxBodyBytes` vurduqda doğrudur |

Bu operativ məzmundur, belədir** default olaraq söndürülür** və bilərəkdən hər bir təyinat yeri seçimi. Gəmilər tablosunun göstərdiyi şeydir, çünki ixrac və `getCallLogById` təfərrüatlı qətnaməni paylaşır: faydalı yüklər yazıldıqda artıq PII-dən təmizlənir və məxfi redaktə edilir və `noLog` API açarı ilə edilən zəng heç bir yükü saxlamır, buna görə də ixrac ediləcək heç nə yoxdur.

Faydalı yüklər fayl sistemi artefaktından hər cərgə oxunur, buna görə nəmləndirmə yalnız bunu tələb edən istiqamətlər üçün işləyir. Çatışmayan və ya pozulmuş artefakt, topluda uğursuzluq və kursoru bağlamaq əvəzinə, öz xülasəsini sıfır faydalı yüklərlə ixrac edir.

`maxBodyBytes` (defolt 262144) hər sahəni əhatə edir. Daha uzun faydalı yüklər** azaltmaq əvəzinə kəsildi** — kəsilmiş sorğu hələ də "nə soruşulub" sualına cavab verir — və sıra `bodies_truncated` ilə işarələnir. Streamed chunk-by-chunk deltalar ixrac edilmir; yığılmış cavab artıq `pipeline_provider_response` və `pipeline_client_response` dədir.

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

| Açar                 | Qeydlər                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Dataset-i saxlayan GCP layihəsi                                                                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                      |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                      |
| `location`           | Yalnız dataset yaradılmalı olduqda istifadə edilir (standart `EU`)                                                   |
| `serviceAccountJson` | Xidmət hesabının açarı. Məxfi məlumat: yaddaşda şifrələnir, heç vaxt geri qaytarılmır                                |
| `autoCreate`         | Çatışmayan dataset-i/cədvəli yaradır; nullable istifadə sübutu sütunlarını şərti olaraq əlavə edir (standart `true`) |

Xidmət hesabına hədəf cədvəl üzərində `bigquery.tables.updateData`, həmçinin `autoCreate` aktiv olduqda
`bigquery.datasets.create` / `bigquery.tables.create` icazələri lazımdır.
Mövcud cədvələ iki nullable istifadə sübutu sahəsini əlavə etmək üçün də
`bigquery.tables.update` tələb olunur. Çatışmayan icazə eksportu dayandırır və kursorunu irəlilətmir.

Konfiqurasiya edilmiş paket HTTP vahidi deyil, **kursor** vahididir: `send()` onu ən çox 500 sətrlik
insertAll çağırışlarına bölür, buna görə böyük `batch_size` BigQuery-nin 10 MB-lıq sorğu limitini
aşa bilməz. Keçici statuslar (408/429/500/502/503/504) eksponensial
gecikmə ilə üç dəfəyə qədər yenidən yoxlanılır və eyni insertIds istifadə olunur; autentifikasiya və
sxem xətaları isə icranı boş yerə sərf etməmək üçün ilk cəhddə istisna yaradır.

Bir neçə dəqiqə əvvəl yaradılmış cədvəl axın endpoint-i üçün hələ görünməyə bilər və endpoint
bir neçə saniyə ərzində 404 cavabı qaytara bilər. Bu 404 yenidən yoxlanılır, lakin **yalnız bu icra
cədvəli yaradıbsa** — həqiqətən çatışmayan cədvəl dərhal uğursuz olur. Qeyd edək ki,
bu yaxınlarda silinmiş cədvəlin adını yenidən yaratmaq BigQuery-nin axın əlavələrini bir neçə dəqiqə
ərzində rədd etməsinə səbəb olur; bu, silib-yenidən yaratma əməliyyatının xüsusiyyətidir, buna görə də
cədvəli silib yenidən əlavə etmək əvəzinə yeni cədvəl adından istifadə etmək daha məqsədəuyğundur.

**Qismən uğursuzluq boş olmayan `insertErrors[]` ilə HTTP 200 şəklində gəlir.** Bu, uğursuzluq
kimi qəbul edilir və istisna yaradır; nəticədə BigQuery-nin qəbul etmədiyi sətrlərdən sonra kursorun
irəliləməsinin qarşısı alınır. `tests/unit/log-export-bigquery.test.ts` bu davranışı təsdiqləyir.

Nəqliyyat mexanizmi sadə REST-dir — öz imzası ilə imzalanmış RS256 təsdiqi
`https://oauth2.googleapis.com/token` ünvanında giriş tokeninə dəyişdirilir, sonra sətrlər
`tabledata.insertAll`-a göndərilir. Heç bir Google SDK-si əlavə edilmir. Giriş tokenləri proses
daxilində (xidmət hesabı, əhatə dairəsi) üzrə keşlənir.

Yaradılmış cədvəldə Logs tabındakı hər sahə üçün bir sütun və `exported_at` olur və cədvəl
çağırış jurnallarının faktiki sorğulanma üsuluna uyğun qurulur:

- **`timestamp` üzrə günlərə bölünür**, beləliklə tarixlə məhdudlaşdırılmış sorğu yalnız həmin günləri skan edir.
- **`api_key_name`, `provider`, `model`, `status` üzrə (bu ardıcıllıqla) klasterləşdirilir**, beləliklə
  sorğunu kimin icra etdiyinə, onun hara yönləndirildiyinə və ya uğursuz olub-olmadığına görə filtr
  tətbiq edildikdə hər bölmənin daxilindəki bloklar ixtisar olunur. BigQuery ən çox dörd klasterləşdirmə
  sütununa icazə verir və ardıcıllıq əhəmiyyətlidir: yalnız `api_key_name` üzrə filtr blokları
  ixtisar edir, yalnız `status` üzrə filtr isə bunu etmir.
- `partitionExpirationDays` vasitəsilə **istəyə bağlı bölmə saxlanma müddəti** (0 hər şeyi saxlayır);
  bu parametr cədvəl yaradılarkən tətbiq edilir.

Hər iki parametr yalnız yaradılma zamanı tətbiq olunur. Mövcud cədvəl artıq malik olduğu quruluşu
saxlayır; buna görə də bunları tətbiq etmək istəyirsinizsə, təyinatı yeni cədvəl identifikatoruna yönəldin.

`tests/unit/log-export-bigquery.test.ts` mapper-in və cədvəl sxeminin sinxronluğunu qoruduğunu
təsdiqləyir, beləliklə yeni çağırış jurnalı sütunu çıxış zamanı səssizcə itirilə bilməz.

Paketlər həm **sətr sayına**, həm də serializasiya olunmuş baytların sayına görə bölünür. Yalnız
sətr sayını nəzərə almaq payload-lar eksport edildikdən sonra kifayət etmir: prompt-ları daşıyan 500
sətr onlarla meqabayt ola bilər və insertAll 10 MB-dan böyük sorğunu rədd edir. Paketlər, bunlardan
hansı daha tez baş verirsə, 500 sətrdə və ya 9 MB-da bağlanır.

---

## 5. OTLP/HTTP izləri təyinatı

Konfiqurasiya `type: "otlp-http"` istifadə edir. Bu, davamlılaşdırılmış çağırış
jurnallarının planlaşdırılmış, kursor əsaslı ixracıdır; `open-sse/services/routing/otel.ts`
faylındakı ən yaxşı səy prinsipi ilə işləyən canlı marşrutlaşdırma hadisələri qəbuledicisi
deyil. O, həmin qəbuledicinin mühit dəyişənlərini, taymerlərini və ya buferlərini oxumur
və dəyişmir. Hər ikisinin aktivləşdirilməsi iki müstəqil span növünün yaranmasına səbəb
ola bilər; bu çağırış jurnalı span-larını fərqləndirmək üçün `omniroute.log-export`
instrumentasiya əhatəsindən istifadə edin.

| Açar                     | İlkin dəyər / məqsəd                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `endpoint`               | Tələb olunan tam HTTP(S) izləri URL-i; `/v1/traces` suffiksi əlavə edilmir             |
| `headers`                | İstəyə bağlı `Name: value` sətirləri və ya sətirlərdən ibarət JSON obyekti; şifrələnir |
| `requestHeaderAllowlist` | Boş (söndürülüb); span atributları kimi tutulacaq klient başlıq adları/prefiksləri     |
| `serviceName`            | `omniroute`; resursun `service.name` dəyəri                                            |
| `langfuseMapping`        | `false`; Langfuse generasiya/sessiya/istifadəçi atributlarını əlavə edir               |
| `identity`               | `pseudonymous`, `keyName` və ya `none`                                                 |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                |
| `timeoutMs`              | Hər HTTP cəhdi üçün `30000`                                                            |
| `environment`            | Təyin edilməyib; istəyə bağlı `langfuse.environment`                                   |

Ümumi idarəetmə paneli bu sahələri göstərir. `paths` API massivi və ya yeni
sətirlər/vergüllərlə ayrılmış dəqiq yolları ehtiva edən mətn sahəsini qəbul edir.
Embeddings, rerank və digər yollar açıq şəkildə icazə verilmədikcə ötürülmür.
Ötürülməyən sətirlər yenə də kursoru irəlilədir; mövcud icraedicinin
`exported`/`exportedTotal` sayğacları qəbul edilmiş span-ları deyil, filtrlənmiş sətirlər
də daxil olmaqla işlənmiş mənbə sətirlərini sayır. Filtrləmə uşaq prosesində aparılır və
onun IPC/kursor müqaviləsi dəyişdirilmir.

URL yoxlaması `src/shared/network/outboundUrlGuard.ts` faylındakı verilənlər bazasından
asılı olmayan `parseAndValidateNonMetadataUrl` köməkçisindən istifadə edir:
`block-metadata` siyasəti. Bu siyasət webhook yoxlayıcısındakı metadata/protokol/gömülü
etimadnamə yoxlamalarını qeyd-şərtsiz eyni qaydada tətbiq edir, lakin şəxsi URL-lərə
icazə verir və qlobal funksiya bayrağı üzərindən dəyişiklik tələb etmir. Bu, şəxsi HTTP
endpoint-ləri də daxil olmaqla, öz serverinizdə yerləşdirilən Langfuse, Phoenix, Tempo və
Collector endpoint-lərindən istifadə etməyə imkan verir. Bulud metadata hostları həmişə
bloklanır. Yönləndirmələr izlənilmir; buna görə kollektor etimadnamələri başqa hosta
yönləndirə bilməz. Mövcud leksik URL qorumasında olduğu kimi, bu mexanizm DNS
rezolyusiyasını sabitləmir; yalnız operatorun nəzarət etdiyi hostları konfiqurasiya edin.
Endpoint etibarlı şəbəkədə yerləşmədikdə HTTPS-ə üstünlük verin.

### Payload və çatdırılma

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) icazə
verilmiş hər sətir üçün bir CLIENT span daşıyır; span dəqiq sorğu yolunun adı ilə
adlandırılır. Yol adlandırılması span adında model və ya identifikasiya məlumatlarını
yerləşdirmədən Chat Completions, Responses və Messages sorğularını fərqləndirir. Resurs
atributlarına `service.name` və paketin `service.version` dəyərləri daxildir.

Adi çat cəhdi qeydiyyatçısı (`open-sse/handlers/chatCore/attemptLogging.ts`) tamamlanma
zamanı `duration = Date.now() - startTime` yazır və zaman möhürü təqdim etmir;
`src/lib/usage/callLogs.ts` faylındakı `saveCallLogOperation` zaman möhürünü yazılma
(tamamlanma) vaxtına təyin edir. Buna görə ixrac zamanı end = sətirin zaman möhürü,
start = end − duration olur (millisaniyələr onluq nanosaniyələrə çevrilir). Çağıran
tərəfindən verilmiş tarixi zaman möhürləri də end vaxtı kimi qorunur; hər sətir üzrə
başlanğıc/tamamlanma fərqləndiricisi yoxdur. Null duration sıfıra çevrilir. Yanlış və ya
çatışmayan zaman möhürləri qeyri-deterministik span-lar yaratmaq əvəzinə paketin
uğursuz olmasına səbəb olur. `ttftMs` nullable-dır və `omniroute.ttft_ms` atributuna
uyğunlaşdırılır.

Atributlara `gen_ai.operation.name="chat"`, provayder, tələb olunan/cavab model,
giriş/çıxış tokenləri, istəyə bağlı keşdən oxuma/keş yaratma/əsaslandırma tokenləri, HTTP
statusu, combo, keş mənbəyi, sessiya teqi və korrelyasiya identifikatoru daxildir. Tam
ədəd OTLP dəyərləri və zaman möhürləri onluq sətirlərdir; sətirlər, boolean dəyərlər və
kəsr ədədləri öz yerli OTLP dəyər variantlarından istifadə edir. Xəta span-ları ERROR
statusuna və təmizlənmiş status mesajına malikdir. Kanonik qeyddə upstream host URL-i
olmadığı üçün `server.address` buraxılır; beləliklə kollektor yanlış olaraq model serveri
kimi göstərilmir. Xərc ixrac edilmir.

Yalnız `includeBodies=true` məzmunu yükləyir. `langfuseMapping=false` olduqda,
`gen_ai.input.messages` / `gen_ai.output.messages` atributları OmniRoute tərəfindən
saxlanılan təmizlənmiş sorğu/cavab gövdəsi JSON-unu (təhlil edilə bildikdə
kanonikləşdirilmiş formada) daşıyır; onlar yenidən formalaşdırılmış semconv mesajlar
massivi deyil. Kəsilmiş/JSON olmayan gövdələr xam mətn olaraq qalır.
`langfuseMapping=true` olduqda, gövdələr yalnız `langfuse.observation.input` /
`langfuse.observation.output` kimi ötürülür; hər gövdənin bir dəfə göndərilməsi üçün
`gen_ai.*.messages` atributları buraxılır. Hər iki rejim mövcud yükləmə yolundan
`maxBodyBytes` dəyərini miras alır; kəsilməni `omniroute.bodies_truncated=true`
göstərir. Bu təyinat tərəfindən əlavə pipeline snapshot-ları və ya təmizlənməmiş
artefakt oxunuşları əlavə edilmir; istəyə bağlı sorğu başlığı tutulması aşağıda təsvir
olunan mövcud yüklənmiş klient snapshot-ından istifadə edir. Gövdələri ixrac edərkən
saatlıq geridə qalan iş yığını toplamaq əvəzinə, `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`
kimi dəqiqə səviyyəli intervaldan istifadə edin.

### İstəyə bağlı klient sorğu başlıqları

Başlıq tutulması **standart olaraq söndürülüb**. Təyinat konfiqurasiyasında
`requestHeaderAllowlist` təyin edin və **Sorğuları və cavabları ixrac et** seçimini
aktivləşdirin (təyinatda `includeBodies: true`).

İcazə siyahısı API massivi və ya yeni sətir/vergüllə ayrılmış adları qəbul edən mətn sahəsi
kimi işləyir:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Adlar böyük-kiçik hərfə həssas olmadan və tam uyğunlaşdırılır; yalnız sondakı tək `*` boş olmayan
header-adı prefiksini seçir. Tək `*`, daxili wildcard-lar və etibarsız HTTP header adları rədd edilir.
Ən çox 64 selector ola bilər və hər birinin adı/prefiksi ən çox 256 ASCII baytından ibarət ola bilər.
Bu parametr `headers` parametrindən ayrıdır; `headers` exporter-i collector-a autentifikasiya edir.

Capture yalnız saxlanılmış ətraflı pipeline-dan `clientRawRequest` (və ya köhnə `clientRequest`) əsasında
doldurulan `pipeline_client_request` məlumatını oxuyur. O, heç vaxt provider request header-larına
qayıtmır. Ətraflı pipeline logging sorğu qeydə alınarkən aktivləşdirilmiş olmalıdır. `includeBodies`
deaktiv olduqda və ya client-snapshot JSON-u çatışmadıqda, korlandıqda və ya kəsildikdə heç bir header
atributu yaradılmır. `maxBodyBytes` dəyərinin artırılması export zamanı snapshot-un kəsilməsinin qarşısını
ala bilər; heç vaxt saxlanılmamış detalları bərpa edə bilməz. 1 MiB-dan böyük və ya 256-dan çox header
entry-si olan snapshot nəzərə alınmır. Mövcud prompt/response export-u header capture ilə yanaşı aktiv
qalır; allowlist yalnız header-lar üçün hydration rejimi təmin etmir.

Seçilmiş dəyərlər, hətta tək string üçün də, OTLP string massivləri kimi
`http.request.header.<full lowercase header name>` atributlarına çevrilir. Məsələn,
`X-OmniRoute-Meta-Team: example-team` belə bir
`http.request.header.x-omniroute-meta-team` atributuna çevrilir:
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Tam prefiks qorunur: bunlar adi header-lardır; biznes-sahəsi parsing-i və ya
`omniroute.metadata.*` / Langfuse metadata çevrilməsi aparılmır. `langfuseMapping` header
semantikasını dəyişmir. Seçilmiş, tək dəyərli `User-Agent` həmçinin standart scalar
`user_agent.original` atributunu təyin edir. Bir dəyərin daxilindəki vergüllər bölünmür. Böyük-kiçik
hərf variantları saxlanılmış entry sırasına əsasən birləşdirilir; hər hansı etibarsız variant həmin
header-ın hamısının buraxılmasına səbəb olur. Atributlar kiçik hərflərlə yazılmış ada görə sıralanır.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-key header-ları, auth/token/secret/password/credential
marker-ları olan adlar və daxili gateway credential-ları seçilsə və ya storage-da qismən maskalansa belə,
həmişə xaric edilir. Məlum credential nümunələri ümumi credential detector-dan istifadə edir; redaction
marker-ları təhlükəsiz dəyər kimi ixrac edilmir. Yalnız string-lər və boş olmayan string massivləri qəbul edilir;
ədədlər və obyektlər çevrilmir. Etibarsız adlar, prototype key-lər, control character-lər (horizontal tab
istisna olmaqla) və düzgün formalaşmamış Unicode dəyərləri batch uğursuz olmadan və məzmunları error-larda
əks olunmadan nəzərə alınmır.

Hər span ən çox 32 header, hər header üçün 16 dəyər, hər dəyər üçün 4096 UTF-8 baytı və capture edilmiş
header adları ilə dəyərləri üzrə ümumilikdə 16384 UTF-8 baytı saxlayır. Ölçüsü həddən artıq böyük və ya
etibarsız header-lar kəsilmir, bütöv şəkildə buraxılır. Seçim operatorun məxfilik qərarıdır: təhlükəsiz
görünən adlar belə şəxsi məlumatlar ehtiva edə bilər və bu məhdudiyyətlər/detector-lar ümumi PII
təmizləyicisi deyil.

### Çatdırılma məhdudiyyətləri

Sorğular envelope daxil olmaqla 500 span və 4 MiB UTF-8 JSON ilə məhdudlaşır.
İcazə verilən hər span cursor batch-inin ilk sorğusundan əvvəl ölçü yoxlamasından keçirilir. Limitdən
böyük fərdi span həmin batch-in heç bir hissəsini göndərmir və `maxBodyBytes` dəyərini azaltmaq
istiqamətində göstərişlərlə uğursuz olur; səssizcə buraxılmır. Preflight yalnız record reference-larını
və bayt saylarını saxlayır, hər müvəqqəti span/JSON-u atır; ikinci seriallaşdırılmış batch nüsxəsi
saxlanılmasın deyə span-lar məhdud ölçülü hissələr üçün yenidən yaradılır. HTTP 408/429/5xx, şəbəkə
uğursuzluqları və timeout-lar ən çox üç cəhd alır və 250/500 ms eksponensial backoff tətbiq olunur.
`Retry-After` saniyələri və ya HTTP tarixləri gecikməni 5 saniyəyədək artıra bilər. Digər status-lar
dərhal uğursuz olur. OTLP 2xx qismən rəddi də itirilmiş span-ı təsdiqləmək əvəzinə exception yaradır;
boş və ya etibarlı JSON təsdiqləri qəbul edilir və cavabın oxunması 64 KiB ilə məhdudlaşdırılır.

Error-lar yalnız exporter-in sahib olduğu faktları ehtiva edir: HTTP statusu, retry sinfi, cəhdlərin sayı
və göndərilmiş span sayı, yaxud sabit acknowledgement/network failure mətnləri. Collector response body-ləri,
partial-success sayları və response header-ları heç vaxt error-lara, log-lara və dashboard-a köçürülmür.
Uğursuz və ya qismən qəbul edilmiş batch təsdiqlənmir: destination həmin statusla Failing göstərir,
cursor son təsdiqlənmiş batch-də qalır və növbəti icra eyni sətirləri yenidən göndərir. Permanent status-lar
collector və ya konfiqurasiya düzəldilənədək uğursuz olaraq qalır. Response detalları üçün collector-un
öz log-larından istifadə edin. Call-log error xülasələri ayrıca redaction mexanizmini saxlayır.
`prepare()` heç nə provision etmir; Test tam olaraq `{"resourceSpans":[]}` göndərir və call-log span-ları
yazmadan HTTP statusunu bildirir.

Trace id-lər və span id-lər
`"omniroute.trace\\0" + callLogId` və `"omniroute.span\\0" + callLogId` üzərində SHA-256-nın
ilk 32/16 hexadecimal rəqəmidir. Yenidən göndərişlər eyni id-ləri daşıyır. Bu, deduplication zəmanəti deyil:
Langfuse v4 ingestion daxil olmaqla bəzi backend-lər eyni-id-li span-ları deduplicate etmir. Crash və ya
qismən chunk uğursuzluğu ən çox təsdiqlənməmiş bir cursor batch-inin yenidən göndərilməsinə səbəb ola bilər;
yalnız son HTTP chunk deyil, həmin batch-in hamısı dublikat ola bilər. Cursor batch ölçüsünü bu mübadiləni
nəzərə alaraq seçin.

### Langfuse nümunəsi

Self-hosted Langfuse instance üçün bu sahələri konfiqurasiya edin:

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

Authorization dəyərini lokal olaraq literal `public-key:secret-key` sətrinin Base64-ü kimi yaradın
(məsələn, `Buffer.from(publicKey + ":" + secretKey).toString("base64")` vasitəsilə).
Həqiqi credential-ları log-lara, screenshot-lara və ya issue-lara yerləşdirməyin. Mapping avtomatik olaraq
`x-langfuse-ingestion-version: 4` təyin edir; Authorization yenə də `headers` daxilində verilir.
Həm header-lar, həm də yaradılmış identity salt mövcud encrypted secret-field mexanizmindən və API
placeholder-larından istifadə edir; `STORAGE_ENCRYPTION_KEY` tələb olunur.

Xəritələmə generasiya tipini/modelini, JSON istifadə təfərrüatlarını (giriş/çıxış/cəmi və mövcud keş açarları), JSON giriş/çıxış anlıq görüntülərini, ERROR/DEFAULT səviyyəsini, sanitarlaşdırılmış status mesajını, trace adını, sessiya identifikatorunu, provayder, tələb olunan model, yol, kombinasiyа, keş mənbəyi və status üçün ixtiyari mühiti və filtrlənə bilən
`langfuse.observation.metadata.<key>` məlumatlarını əlavə edir. `langfuse.observation.completion_start_time` ISO 8601 formatındadır və yalnız TTFT məlumdursa və müddət daxilindədirsə, başlanğıc vaxtına + TTFT əlavə edilməklə hesablanır. Heç bir xərc atributu göndərilmir.

Kimlik rejimləri `langfuse.user.id` üçün tətbiq edilir:

- `pseudonymous` (standart): API açarının daxili identifikatorunun təsadüfi, təyinat üzrə 32 baytlıq duz ilə HMAC-SHA256 nəticəsi. Duz yaradılma zamanı yoxdursa yaradılır, `identitySalt` kimi şifrələnir, heç vaxt geri qaytarılmır və redaktələr zamanı saxlanılır. Xam açar identifikatorları heç vaxt span atributlarına yerləşdirilmir. Təyinatın duzunun yenidən yaradılması/dəyişdirilməsi identifikatorları dəyişir.
- `keyName`: konfiqurasiya edilmiş API açarının adı; operator etiketinin qəsdən açıqlanmasıdır.
- `none`: istifadəçi identifikatoru yoxdur. Sessiya teqləri mövcud olduqda yenə də ixrac edilir; bu rejimlər ixtiyari sorğu məzmununu və ya operator tərəfindən təqdim edilmiş sessiya/korrelyasiya etiketlərini anonimləşdirmir.

### Geriyə doldurma olmadan başlama

Yalnız yaradılma zamanı **Cari mövqedən başla (mövcud jurnalları ötür)** seçimini aktivləşdirin və ya yaratma API yükünün ən üst səviyyəsində
`startFromCurrentPosition: true` ötürün. Bu, mövcud kursor köməkçilərindən istifadə etməklə və miqrasiya olmadan `cursor_row_id` dəyərini saxlanılan çağırış jurnalı sətirlərinin cari maksimum rowid dəyərinə təyin edir. Standart dəyər false-dur (kursor 0 və saxlanılmış tarixçənin geriyə doldurulması).
Bu, yeniləmə zamanı kursorun sıfırlanması ayarı deyil.

Paylaşılan `ttftMs` əlavəsi BigQuery xəritələyicisinə və yeni cədvəl sxeminə nullable `ttft_ms` sütununu da əlavə edir: onun sxem testi hər bir kanonik qeyd sahəsinin bir sütuna malik olmasını tələb edir. Mövcud cədvəllər dəyişmədən ixrac edilməyə davam edir: `prepare()` cədvəl sxemini oxuyur və yalnız həmin sütun olmadıqda `ttft_ms` sütununu çıxarır. Növbəti icrada TTFT əldə etmək üçün nullable INT64 sütununu əlavə edin və ya yeni cədvəldən istifadə edin. İxtiyari TTFT sütunu sxem yeniləməsini işə salmır. İstifadə sübutu sütunları aşağıda göstərilən şərti, qoşulma tələb edən uyğunluq axınını izləyir; digər sətir sahələri ciddi sxem yoxlamasını saxlayır.

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

## 7. İstifadə

- **İdarə paneli**: İnteqrasiyalar → Jurnal ixracı. Təyinat əlavə edin, etimadnamələri
  yazmadan yoxlamaq üçün **Sına** əməliyyatını icra edin, sonra onu aktivləşdirin.
- **Gözləmə növbəsi**: hər təyinat kartında gözləyən sətirlər və kursor göstərilir; `GET
/api/log-export/status` eyni göstəriciləri, həmçinin son 20 tapşırıq icrasını qaytarır.
- **Uğursuz təyinat digərlərinin uğursuz olmasına səbəb olmur** — icmalda hər təyinatın
  statusu `last_status` / `last_error` sahələrində qeyd olunur, tapşırıq icra tarixçəsi isə
  ümumi nəticəni saxlayır.
- **Təyinatın silinməsi onun kursorunu da silir.** Təyinatı yenidən əlavə etdikdə, ən köhnə
  saxlanılan çağırış jurnalından başlayır və təyinatın artıq saxladığı sətirləri yenidən göndərə
  bilər. BigQuery-də hər sətir üçün `insertId` bunu yalnız BigQuery-nin öz dublikatların
  aradan qaldırılması pəncərəsi daxilində neytrallaşdırır; buna görə təyinatı silməkdənsə
  deaktiv etmək üstün tutulur.

### İstifadə sübutu sxeminin uyğunluğu

Yeni BigQuery cədvəllərinə null ola bilən `usage_evidence` (JSON ehtiva edən STRING) və
`usage_estimated` (BOOL) sütunları daxildir. `autoCreate` aktiv olduqda, mövcud cədvələ
yalnız bu çatışmayan null ola bilən sütunlar əlavə edilə bilər. İxracçı sahə metadataları da
daxil olmaqla mövcud sxemi tam şəkildə qoruyur və qaytarılmış etag ilə şərti PATCH göndərir.
Paralel sxem dəyişikliyi onun üzərinə yazılmaq əvəzinə ixracın uğursuz olmasına səbəb olur;
növbəti icra cədvəli yenidən oxuyur.

`autoCreate` deaktiv olduqda, istifadə sübutu olan qeydləri ixrac etməzdən əvvəl bu
sütunları özünüz əlavə edin. Sxem/etag metadatalarının çatışmaması və ya uğursuz yeniləmə
də sübut ehtiva edən daxiletmələrin qarşısını alır. Bu uğursuzluq zamanı ixrac kursoru
irəliləmir və sübut heç vaxt səssizcə atılmır. İxrac bloklandığı müddətdə yerli jurnalın
saxlanma qaydaları yenə tətbiq olunur; buna görə saxlanılan mənbə sətirlərinin müddəti
bitməzdən əvvəl uğursuzluğu aradan qaldırın.
