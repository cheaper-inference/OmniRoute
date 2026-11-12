# Log export (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Nepārtraukta, inkrementāla OmniRoute zvanu žurnālu eksportēšana uz ārēju analītikas datu krātuvi.

Žurnālu informācijas paneļa cilne saglabā pieprasījumu vēsturi SQLite (`call_logs`), un tās apjomu
ierobežo rotācija un saglabāšanas termiņš. Žurnālu eksportēšana pēc grafika nosūta to pašu ierakstu
kopu uz ārēju sistēmu, lai tā varētu pastāvēt ilgāk par lokālo datubāzi un tikt apvienota ar citiem
datiem. BigQuery ir pirmais galamērķis; konveijers ir veidots kā reģistrs, tāpēc papildu galamērķus
var pievienot neatkarīgi.

---

## 1. Kā tas darbojas

```
serveris (atšifrē un validē konfigurāciju, saskaņo kursoru)
  → palaiž IPC → izolēts exportChild OS process
    → tikai lasāms storage.sqlite → kopīgs zvanu žurnāla vaicājums/kartēšana
      → asinhrona artefaktu ielāde → galamērķa prepare()/send()
        → paketes IPC → serveris saglabā kursoru → ack IPC
          → nākamā pakete; done IPC → serveris reģistrē panākumus
```

- **Grafiks** — viens `JobRegistry` cron uzdevums `log_export`, kura noklusējuma vērtība ir `0 * * * *` (reizi stundā,
  UTC). Reģistrēts failā `src/lib/initCloudSync.ts`; to var pārrakstīt ar `OMNIROUTE_LOG_EXPORT_CRON`.
  Katrā izpildes reizē secīgi tiek iztukšots katrs **iespējotais** galamērķis.
- **Kursors** — SQLite netiešais `call_logs.rowid`, kas katram galamērķim tiek saglabāts laukā
  `log_export_destinations.cursor_row_id`. `timestamp` apzināti netiek izmantots kā kursors: izsaucēji
  var norādīt savu vērtību, tāpēc lēns pieprasījums var tikt ierakstīts pēc ātrāka pieprasījuma, kas sākts
  vēlāk, un laika zīmoga kursors to izlaistu.
- **Pakešu apstrāde** — `batch_size` rindas vienā pieprasījumā (noklusējums 500), `max_rows_per_run` rindas vienā izpildē
  (noklusējums 10000), lai liels neapstrādāto datu apjoms tiktu iztukšots vairāku izpildes reižu laikā, nevis bloķētu vienu no tām.
- **Piegāde** — kursors tiek virzīts uz priekšu tikai pēc tam, kad `send()` ir sekmīgi pabeigts. Neizdevusies pakete atstāj
  kursoru iepriekšējā vietā, tāpēc tās pašas rindas tiek atkārtoti mēģinātas nākamajā izpildes reizē. Garantija ir
  piegāde vismaz vienu reizi kopā ar dublikātu novēršanu galamērķa pusē, nevis patiesa piegāde tieši vienu reizi: BigQuery identificē katru
  rindu pēc zvanu žurnāla ID, ko tas savā dublikātu novēršanas logā ievēro pēc labāko iespēju principa.
- **Pārklāšanās aizsardzība** — cron izpildes reize un `POST .../run` var tikt aktivizēti vienlaikus. Galamērķis,
  kura iztukšošana jau notiek, tiek izlaists, nevis iztukšots divreiz (`skipped: true` izpildes rezultātā),
  tāpēc paralēla izpilde nevar atkārtoti nosūtīt paketi vai ierakstīt kursoru atpakaļvirzienā.
- **Atkopšana pēc tīrīšanas** — ja `cursor_row_id` kļūst lielāks par `MAX(rowid)` (visa tabula ir
  iztīrīta un rindu ID numerācija sākta no jauna), izpildītājs atiestata to uz 0, nevis neatgriezeniski pārstāj redzēt jaunus datus.

### Izolēts izpildītājs un ierobežojumi

Katra galamērķa izpilde Node vidē palaiž atsevišķu, īslaicīgu OS bērnprocesu (`child_process`
ar IPC, nevis `worker_threads`). Ķermeņu nolasīšana, slodzes JSON parsēšana/serializēšana, galamērķa
`prepare()` un galamērķa tīkla I/O — tas viss notiek bērnprocesā, nevis servera notikumu ciklā.
Pa IPC tiek pārsūtīta tikai konfigurācija un nelieli progresa ziņojumi; eksportētie ieraksti nekad neatgriežas
serverī. Cron uzdevums un maršruts “Palaist tagad” saglabā to pašu publisko rezultātu un pārklāšanās aizsardzību.

Bērnprocess atver servera atrisināto `DATA_DIR/storage.sqlite` tikai lasīšanas režīmā, izmantojot `node:sqlite`,
ar `busy_timeout=5000` un `query_only=ON`. Tas neimportē nevienu DB vienobjekta instanci un neveic
migrācijas, dublēšanu vai SQLite atjauninājumus. Trūkstošu/bojātu artefaktu uzskaite (tostarp
bojāta artefakta UPDATE) paliek tikai informācijas paneļa detalizētā skata ceļā. Abi ceļi koplieto tīru
detalizētās informācijas atrisinātāju; eksportēšana izmanto asinhronu failu sistēmas lasīšanu un to pašu artefakts → mantotais
iegultais saturs → mantotais saturs diskā → nav satura atrisināšanas secību. Kad bērnprocess atver savu lasītāju, izpilde fiksē maksimālo ievietošanas rindas ID;
vēlāk ievietotie ieraksti gaida nākamo izpildes reizi. Tā ir ievietošanas robeža,
nevis ilglaicīga SQLite transakcija: WAL rakstītāji un kontrolpunkti tīkla gaidīšanas laikā var brīvi turpināt darbu.
Šī robeža nefiksē esošo rindu atjauninājumus vai dzēšanu.

Pēc katras pieņemtās paketes bērnprocess gaida apstiprinājumu. Serveris vispirms saglabā
kursoru ar `advanceLogExportCursor` un pēc tam nosūta `ack`; pirms tā saņemšanas netiek sākta nākamā pakete.
Sūtīšanas kļūme, avārija vai noildze reģistrē neveiksmi, nevirzot uz priekšu attiecīgās paketes kursoru. Iepriekš
apstiprinātās paketes paliek saglabātas; atkārtoti var tikt nosūtīta ne vairāk kā viena neapstiprinātā pakete.
Panākumi tiek reģistrēti tikai pēc `done` saņemšanas un korektas bērnprocesa pabeigšanas. Neveiksmes gadījumā bērnprocess tiek
apturēts ar SIGTERM, pēc 500 ms pārejot uz SIGKILL, un izpildītājs gaida procesa aizvēršanos.

| Vides mainīgais                               | Noklusējums | Nolūks                                          |
| --------------------------------------------- | ----------- | ----------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000      | Galamērķa kopējā izpildes laika limits          |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024        | Bērnprocesa V8 vecās paaudzes atmiņas limits MB |

Nederīgām, nepozitīvām vai neveselām skaitliskām vērtībām tiek izmantotas noklusējuma vērtības. Kaudzes iestatījums nav kopējās
RSS atmiņas ierobežojums; ļoti lielas paketes joprojām var izsmelt bērnprocesa atmiņu un droši izraisīt izpildes neveiksmi.
Noklusējuma 1024 MB vērtība atstāj rezervi noklusējuma 500 rindu paketei ar 512 KiB artefaktiem un
iespējotiem ķermeņiem, tostarp BigQuery JSON serializēšanai baitos sadalītos fragmentos. Tā nepadara
10000 rindu paketi ar ķermeņiem drošu. V8 kaudzes izsmelšana reģistrē praktiski novēršamu kļūmi: samaziniet paketes
izmēru vai palieliniet `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursors paliek pie pēdējās
apstiprinātās paketes. Uz vēsturiskajiem iegultajiem/diskā glabātajiem ķermeņiem mūsdienu artefaktu ierobežojums neattiecas.
Operatoriem RSS patēriņš jāplāno atsevišķi, jo īpaši konteineros ar ierobežotu atmiņu.

Bērnprocess pārmanto tikai atrisināto `DATA_DIR`, `NODE_ENV`, skaidri norādīto `TZ` (mantoto failu nosaukumu
lokālā laika atrisināšanai), `ELECTRON_RUN_AS_NODE`, ja tas ir pieejams, un tālāk norādītās izejošās ievades:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (un to formas ar mazajiem burtiem),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globāls Undici dispečers koplieto servera tīro vides starpniekservera atrisināšanu un lokālo resursdatoru
apiešanas noteikumus, tostarp `NO_PROXY`; tas neimportē `proxyFetch.ts` vai tā DB/funkciju karogus.
Starpniekservera akreditācijas dati tiek aizklāti pārsūtītajā izvadē un reģistrētajās kļūdās. Galamērķa akreditācijas dati
tiek pārsūtīti tikai vienā sākšanas IPC ziņojumā, nekad argv vai vidē; izvades/kļūdu pārsūtīšanai
tiek pievienots prefikss, un tās saturs tiek attīrīts. Bērnprocesa izpildes argumentos tiek atspējots tikai `ExperimentalWarning`, lai
katrā cron izpildes reizē neatkārtotu Node SQLite brīdinājumu; citu veidu brīdinājumi paliek redzami.

Mērķa moduļiem jābūt importējamiem bez Next.js/tikai serverim paredzētām atkarībām. Esošā
BigQuery implementācija jau atbilst šim nosacījumam. Piekļuves pilnvaru kešatmiņas pastāv tikai bērnprocesa
izpildes laikā, nevis starp izpildēm. Node ir atbalstītā izpildvide (`package.json` engines), taču README Bun
instalēšanas sadaļa un `Dockerfile.bun` arī piedāvā produkcijas saderības ceļu, izmantojot
`bun:sqlite` (`src/lib/db/core.ts` / adapterus). Tādēļ Bun vidē eksportēšana saglabā iepriekšējo
procesā izpildāmo ceļu un vienreiz parāda brīdinājumu: bērnprocesa atmiņas kaudzes/noildzes izolācija nav pieejama. Izmantojiet
Node notikumu cikla un OOM izolācijai; Bun šeit netiek uzskatīts par tikai izstrādei paredzētu risinājumu.

Kad ir iespējots `includeBodies`, dodiet priekšroku izpildei ar dažu minūšu intervālu, piemēram,
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, nevis uzkrājiet stundas apjoma lietderīgās slodzes rindu.
Pakešu un rindu ierobežojumi joprojām ierobežo katru izpildi. Procesa palaišanas izmaksas rodas katram mērķim katrā izpildē;
tas apmaina nelielas palaišanas izmaksas pret servera notikumu cikla izolāciju, nevis samazina kopējo CPU lietojumu.

### Lietderīgās slodzes (uzvednes un pabeigšanas rezultāti)

Pēc noklusējuma eksportā tiek iekļauti tikai kopsavilkuma lauki, kurus parāda žurnālu **saraksts**. Ieslēdzot
**Eksportēt uzvednes un atbildes** (`includeBodies`), papildus tiek nosūtīts tas, ko katram izsaukumam parāda žurnālu **detalizētās informācijas**
rūts:

| Lauks                            | Ko tas satur                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Izsaukuma lietderīgās slodzes tādā veidā, kā tās attēlo informācijas panelis                  |
| `pipeline_route_decision`        | Kuru mērķi un modeli maršrutētājs izvēlējās                                                   |
| `pipeline_client_request`        | Neapstrādātais pieprasījums tieši tādā veidā, kā klients to nosūtīja                          |
| `pipeline_openai_request`        | Pieprasījums pēc pārveidošanas iekšējā OpenAI formātā                                         |
| `pipeline_provider_request`      | Pieprasījums tādā veidā, kā tas faktiski tika nosūtīts augšup, pakalpojumu sniedzēja dialektā |
| `pipeline_provider_response`     | Neapstrādātā augšupējā atbilde                                                                |
| `pipeline_client_response`       | Tas, kas tika atdots izsaucējam                                                               |
| `pipeline_error`                 | Konveijera līmeņa kļūdas informācija neveiksmīgam izsaukumam                                  |
| `bodies_truncated`               | Patiess, ja kāds no iepriekš minētajiem laukiem sasniedza `maxBodyBytes`                      |

Tas ir uzvedņu saturs, tāpēc šī iespēja pēc noklusējuma ir **izslēgta** un apzināti tiek izvēlēta katram mērķim atsevišķi.
Tiek nosūtīts tas, ko parāda informācijas panelis, jo eksportēšana un `getCallLogById` izmanto kopīgu detalizētās informācijas
iegūšanas loģiku: lietderīgās slodzes jau ir
attīrītas no PII un tajās ir aizklāti noslēpumi, kad tās tiek ierakstītas, savukārt izsaukums, kas veikts ar
`noLog` API atslēgu, vispār nesaglabā lietderīgo slodzi, tāpēc nav nekā, ko eksportēt.

Lietderīgās slodzes katrai rindai tiek nolasītas no datņu sistēmas artefakta, tāpēc datu papildināšana notiek tikai tiem mērķiem,
kas to ir pieprasījuši. Ja artefakta trūkst vai tas ir bojāts, tiek eksportēts tā kopsavilkums ar nulles vērtības lietderīgajām slodzēm,
nevis pārtraukta paketes apstrāde un iestrēdzināts kursors.

`maxBodyBytes` (pēc noklusējuma 262144) ierobežo katra lauka lielumu. Garākas lietderīgās slodzes tiek **saīsinātas, nevis
atmestas** — apgriezta uzvedne joprojām atbild uz jautājumu „kas tika vaicāts” — un rinda tiek atzīmēta ar
`bodies_truncated`. Straumētās fragmentu deltas netiek eksportētas; saliktā atbilde jau atrodas
`pipeline_provider_response` un `pipeline_client_response`.

---

## 2. Faili

| Daļa                           | Atrašanās vieta                              |
| ------------------------------ | -------------------------------------------- |
| Mērķa līgums                   | `src/lib/logExport/types.ts`                 |
| Reģistrs                       | `src/lib/logExport/registry.ts`              |
| Noslēpumu apstrāde             | `src/lib/logExport/secrets.ts`               |
| Izpildītājs (vecākprocesa IPC) | `src/lib/logExport/runner.ts`                |
| Procesa dzīves cikls           | `src/lib/logExport/childRunner.ts`           |
| Bērnprocesa ieejas punkts      | `src/lib/logExport/exportChild.ts`           |
| Tikai lasāms atvērējs          | `src/lib/db/logExportReadOnly.ts`            |
| Koplietots vaicājums/kartēšana | `src/lib/usage/callLogExportQueries.ts`      |
| Detalizācijas atrisinātājs     | `src/lib/usage/callLogDetailResolver.ts`     |
| API projekcija                 | `src/lib/logExport/presenter.ts`             |
| BigQuery mērķis                | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA autentifikācija      | `src/lib/logExport/googleServiceAccount.ts`  |
| Zvanu žurnāla avots            | `src/lib/usage/callLogExportSource.ts`       |
| Pastāvīgā glabāšana            | `src/lib/db/logExportDestinations.ts`        |
| Cron uzdevums                  | `src/lib/jobs/logExportJob.ts`               |
| REST slānis                    | `src/app/api/log-export/`                    |
| Informācijas paneļa lapa       | `src/app/(dashboard)/dashboard/log-export/`  |

Shēma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Visiem maršrutiem nepieciešama pārvaldības autentifikācija (`requireManagementAuth`). Noslēpumi nekad netiek atgriezti:
saglabāts noslēpums tiek atgriezts kā literāļa vērtība `__stored__`, un šīs vērtības nosūtīšana atpakaļ atjaunināšanas laikā
saglabā esošos akreditācijas datus.

Izveidojot vai atjauninot mērķi, kura tips deklarē noslēpumu, **ir nepieciešama
`STORAGE_ENCRYPTION_KEY`**. Bez tās `encrypt()` nemanāmi atgriež nemainītu vērtību, tādēļ
rakstīšana tiek noraidīta ar statusu 400, nevis akreditācijas dati tiek saglabāti SQLite datubāzē vienkāršā tekstā (tāda pati aizsardzība tiek
izmantota Telegram tīmekļa aizķerei).

| Metode   | Ceļš                                     | Nolūks                                                                      |
| -------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Mērķu tipi un to konfigurācijas lauku saraksti                              |
| `GET`    | `/api/log-export/destinations`           | Uzskaitīt mērķus (noslēpumi aizklāti)                                       |
| `POST`   | `/api/log-export/destinations`           | Izveidot mērķi                                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | Nolasīt vienu                                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Atjaunināt nosaukumu / iespējotu stāvokli / konfigurāciju / pakešu apstrādi |
| `DELETE` | `/api/log-export/destinations/{id}`      | Dzēst                                                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | Pārbaudīt akreditācijas datus, neko nerakstot                               |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Iztukšot tūlīt, izmantojot to pašu ceļu kā plānotajā izpildē                |
| `GET`    | `/api/log-export/status`                 | Cron stāvoklis, nesenās izpildes un neapstrādātais apjoms katram mērķim     |

`GET /api/log-export/types` padara lietotāja saskarni vispārīgu: informācijas paneļa veidlapa tiek atveidota no
atgrieztajiem lauku aprakstiem, tādēļ jaunam mērķim nav nepieciešamas lietotāja saskarnes izmaiņas.

---

## 4. BigQuery mērķis

Konfigurācijas atslēgas (`type: "bigquery"`):

| Atslēga              | Piezīmes                                                                               |
| -------------------- | -------------------------------------------------------------------------------------- |
| `projectId`          | GCP projekts, kurā atrodas datu kopa                                                   |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                                        |
| `location`           | Izmanto tikai tad, ja jāizveido datu kopa (noklusējums `EU`)                           |
| `serviceAccountJson` | Pakalpojuma konta atslēga. Noslēpums: šifrēts glabāšanas laikā, nekad netiek atgriezts |
| `autoCreate`         | Izveidot datu kopu un tabulu pirmās eksportēšanas laikā (noklusējums `true`)           |

Pakalpojuma kontam nepieciešama atļauja `bigquery.tables.updateData` mērķa tabulai, kā arī
`bigquery.datasets.create` / `bigquery.tables.create`, ja `autoCreate` ir ieslēgts.

Konfigurētā pakete ir **kursora** vienība, nevis HTTP vienība: `send()` sadala to `insertAll`
izsaukumos, kuros ir ne vairāk par 500 rindām, tādēļ liela `batch_size` vērtība nevar pārsniegt BigQuery 10 MB pieprasījuma ierobežojumu.
Pārejošu statusu (408/429/500/502/503/504) gadījumā mēģinājums tiek atkārtots līdz trim reizēm ar eksponenciālu
gaidīšanas intervāla palielināšanu, atkārtoti izmantojot tās pašas insertIds; autentifikācijas un shēmas kļūdas izraisa izņēmumu jau pirmajā mēģinājumā,
nevis lieki patērē izpildes mēģinājumus.

Pirms neilga brīža izveidota tabula vēl nav redzama straumēšanas galapunktam, kas dažas
sekundes atbild ar 404. Šāds 404 tiek atkārtoti mēģināts, bet **tikai tad, ja tabula tika izveidota šīs izpildes laikā** —
patiesi neesošas tabulas gadījumā kļūda joprojām rodas nekavējoties. Ņemiet vērā, ka tabulas atkārtota izveide ar nosaukumu, kas
nesen tika dzēsts, liek BigQuery vairākas minūtes noraidīt straumēšanas ievietošanas; tā ir
dzēšanas un atkārtotas izveides īpatnība, tādēļ dodiet priekšroku jaunam tabulas nosaukumam, nevis tabulas dzēšanai un atkārtotai pievienošanai.

**Daļēja kļūme tiek saņemta kā HTTP 200 ar netukšu `insertErrors[]`.** Tā tiek uzskatīta par
kļūmi un izraisa izņēmumu, tādējādi neļaujot kursoram pārvietoties tālāk par rindām, kuras BigQuery
nepieņēma; `tests/unit/log-export-bigquery.test.ts` nostiprina šo uzvedību.

Transportam tiek izmantots vienkāršs REST — pašparakstīts RS256 apliecinājums tiek apmainīts pret piekļuves pilnvaru adresē
`https://oauth2.googleapis.com/token`, pēc tam rindas tiek nosūtītas uz `tabledata.insertAll`. Neviens Google SDK
netiek iekļauts. Piekļuves pilnvaras tiek kešotas procesa ietvaros katram pārim (pakalpojuma konts, tvērums).

Izveidotajā tabulā ir viena kolonna katram cilnes Logs laukam, kā arī `exported_at`, un tās izkārtojums ir pielāgots tam,
kā zvanu žurnāli faktiski tiek vaicāti:

- **Sadalīta pa dienām, izmantojot `timestamp`**, tādēļ vaicājums ar datuma ierobežojumu skenē tikai attiecīgās dienas.
- **Klasterizēta pēc `api_key_name`, `provider`, `model`, `status`** (šādā secībā), tādēļ filtrēšana pēc tā,
  kurš to izpildīja, uz kurieni tas tika nosūtīts vai vai tas neizdevās, atmet blokus katra nodalījuma ietvaros. BigQuery
  pieļauj ne vairāk kā četras klasterizācijas kolonnas, un secībai ir nozīme: filtrs tikai pēc `api_key_name`
  atmet blokus, bet filtrs tikai pēc `status` to nedara.
- **Neobligāta nodalījumu glabāšanas termiņa iestatīšana**, izmantojot `partitionExpirationDays` (0 saglabā visu), kas tiek piemērota
  tabulas izveides laikā.

Abi iestatījumi tiek lietoti izveides laikā. Esoša tabula saglabā savu pašreizējo izkārtojumu, tāpēc,
ja vēlaties tos izmantot, norādiet galamērķim jaunu tabulas ID.

`tests/unit/log-export-bigquery.test.ts` nodrošina, ka kartētājs un tabulas shēma paliek
sinhronizēti, tāpēc jaunu zvanu žurnāla kolonnu eksportēšanas laikā nevar nemanāmi atmest.

Paketes tiek sadalītas daļās, ņemot vērā **gan** rindu skaitu, **gan** serializēto baitu apjomu. Ar rindu skaitu vien nepietiek,
kad tiek eksportētas slodzes: 500 rindas ar uzvednēm var aizņemt desmitiem megabaitu, un insertAll
noraida pieprasījumu, kas pārsniedz 10 MB. Daļas tiek noslēgtas pie 500 rindām vai 9 MB — atkarībā no tā, kurš ierobežojums tiek sasniegts pirmais.

---

## 5. OTLP/HTTP trasējumu galamērķis

Konfigurācijā tiek izmantots `type: "otlp-http"`. Tas ir plānots saglabāto izsaukumu žurnālu eksports,
kas izmanto kursoru, nevis reāllaika maršrutēšanas notikumu saņēmējs failā
`open-sse/services/routing/otel.ts`, kas darbojas bez piegādes garantijas. Tas nelasa un nemaina šī saņēmēja vides
mainīgos, taimerus vai buferus. Iespējojot abus, var tikt izveidoti divi neatkarīgi laidumu veidi;
izmantojiet instrumentācijas tvērumu `omniroute.log-export`, lai atšķirtu šos izsaukumu žurnālu laidumus.

| Atslēga                  | Noklusējums / mērķis                                                                |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `endpoint`               | Obligāts pilns HTTP(S) trasējumu URL; sufikss `/v1/traces` netiek pievienots        |
| `headers`                | Neobligātas `Name: value` rindas vai JSON objekts ar virknēm; šifrēts               |
| `requestHeaderAllowlist` | Tukšs (izslēgts); klienta galveņu nosaukumi/prefiksi, ko tvert kā laidumu atribūtus |
| `serviceName`            | `omniroute`; resursa atribūts `service.name`                                        |
| `langfuseMapping`        | `false`; pievieno Langfuse ģenerēšanas/sesijas/lietotāja atribūtus                  |
| `identity`               | `pseudonymous`, `keyName` vai `none`                                                |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                             |
| `timeoutMs`              | `30000` katram HTTP mēģinājumam                                                     |
| `environment`            | Nav iestatīts; neobligāts `langfuse.environment`                                    |

Vispārīgais informācijas panelis attēlo šos laukus. `paths` pieņem API masīvu vai teksta lauku
ar precīziem ceļiem, kas atdalīti ar jaunām rindām/komatiem. Iegulumu, pārkārtošanas un citi ceļi tiek
izlaisti, ja vien tie nav skaidri atļauti. Arī izlaistās rindas pārvieto kursoru uz priekšu; esošā
izpildītāja `exported`/`exportedTotal` skaitītāji uzskaita apstrādātās avota rindas, ieskaitot izfiltrētās
rindas, nevis pieņemtos laidumus. Filtrēšana tiek veikta pakārtotajā procesā, nemainot tā
IPC/kursora līgumu.

URL validācija izmanto palīgfunkciju `parseAndValidateNonMetadataUrl` no
`src/shared/network/outboundUrlGuard.ts`, kas neizmanto datubāzi: politiku `block-metadata`. Tai ir tādas pašas
beznosacījumu metadatu/protokola/iegulto akreditācijas datu pārbaudes kā tīmekļa aizķeres validatoram ar
atļautiem privātiem URL, taču tā apzināti atļauj localhost/LAN mērķus bez globālas
funkcionalitātes karodziņa ignorēšanas. Tas ļauj izmantot pašmitinātus Langfuse, Phoenix, Tempo un Collector
galapunktus, tostarp privātus HTTP galapunktus. Mākoņa metadatu resursdatori vienmēr tiek bloķēti.
Novirzīšanām netiek sekots, tāpēc savācējs nevar novirzīt akreditācijas datus uz citu resursdatoru.
Tāpat kā esošā leksiskā URL aizsardzība, arī šī nefiksē DNS atrisinājumu; konfigurējiet tikai
operatora kontrolētus resursdatorus. Dodiet priekšroku HTTPS, ja galapunkts neatrodas uzticamā tīklā.

### Datu saturs un piegāde

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) pārraida vienu
CLIENT laidumu katrai atļautajai rindai, nosaucot to pēc precīzā pieprasījuma ceļa. Nosaukšana pēc ceļa atšķir
Chat Completions, Responses un Messages, neiekļaujot modeļa vai identitātes datus
laiduma nosaukumā. Resursa atribūti ietver `service.name` un pakotnes `service.version`.

Parastais tērzēšanas mēģinājumu reģistrētājs (`open-sse/handlers/chatCore/attemptLogging.ts`) pabeigšanas brīdī ieraksta
`duration = Date.now() - startTime` un nenorāda laikspiedolu;
`saveCallLogOperation` failā `src/lib/usage/callLogs.ts` pēc noklusējuma iestata laikspiedolu uz ierakstīšanas
(pabeigšanas) laiku. Tāpēc eksports iestata beigas = rindas laikspiedols un sākums = beigas − ilgums
(milisekundes, pārvērstas decimālās nanosekundēs). Arī izsaucēja norādītie vēsturiskie laikspiedoli
tiek saglabāti kā beigu laiks; katrai rindai nav sākuma/pabeigšanas atšķiršanas pazīmes.
Nulles vērtības ilgums kļūst par nulli. Nederīgu/trūkstošu laikspiedolu dēļ visa pakete neizdodas, nevis tiek izveidoti
nedeterministiski laidumi. `ttftMs` var būt nulles vērtība, un tas tiek kartēts uz `omniroute.ttft_ms`.

Atribūti ietver `gen_ai.operation.name="chat"`, pakalpojumu sniedzēju, pieprasīto/atbildes modeli,
ievades/izvades tokenus, neobligātus kešatmiņas lasīšanas/kešatmiņas izveides/spriešanas tokenus, HTTP statusu,
kombināciju, kešatmiņas avotu, sesijas birku un korelācijas identifikatoru. Veselu skaitļu OTLP vērtības un laikspiedoli
ir decimālas virknes; virknes, Būla vērtības un daļskaitļi izmanto savus sākotnējos OTLP vērtību
variantus. Kļūdu laidumiem ir ERROR statuss un attīrīts statusa ziņojums. Kanoniskajā
ierakstā nav augšupējā resursdatora URL, tāpēc `server.address` tiek izlaists, nevis kļūdaini
identificē savācēju kā modeļa serveri. Izmaksas netiek eksportētas.

Tikai `includeBodies=true` ielādē saturu. Ja `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` satur attīrītu pieprasījuma/atbildes
satura JSON tādā formā, kādā to saglabā OmniRoute (kanonizētu, ja to var parsēt), nevis pārveidotu semconv
ziņojumu masīvu. Saīsināts saturs vai saturs, kas nav JSON, paliek neapstrādāta teksta veidā. Ja `langfuseMapping=true`,
saturs tiek izvadīts tikai kā `langfuse.observation.input` / `langfuse.observation.output`;
atribūti `gen_ai.*.messages` tiek izlaisti, lai katrs saturs tiktu nosūtīts vienreiz. Abi režīmi
manto `maxBodyBytes` no esošā satura ielādes ceļa;
`omniroute.bodies_truncated=true` norāda uz saīsināšanu.
Šis galamērķis nepievieno papildu konveijera momentuzņēmumus vai neattīrītu artefaktu lasīšanu;
neobligātā pieprasījuma galveņu tveršana izmanto tālāk aprakstīto esošo ielādēto klienta momentuzņēmumu.
Eksportējot saturu, izmantojiet minūšu līmeņa periodiskumu, piemēram, `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
nevis uzkrājiet stundas laikā neapstrādātu ierakstu rindu.

### Neobligātas klienta pieprasījuma galvenes

Galveņu tveršana **pēc noklusējuma ir izslēgta**. Galamērķa konfigurācijā iestatiet `requestHeaderAllowlist`
un iespējojiet **Eksportēt uzvednes un atbildes** (`includeBodies: true` galamērķī).
Atļauto saraksts pieņem API masīvu vai teksta lauku ar nosaukumiem, kas atdalīti ar jaunām rindām/komatiem:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nosaukumi tiek salīdzināti precīzi, neņemot vērā burtu reģistru, izņemot gadījumu, kad viens `*` beigās atlasa netukšu
galvenes nosaukuma prefiksu. Atsevišķs `*`, iegultas aizstājējzīmes un nederīgi HTTP galveņu nosaukumi tiek noraidīti.
Atļauti ne vairāk kā 64 atlasītāji, katram nosaukums/prefikss nedrīkst pārsniegt 256 ASCII baitus.
Šis iestatījums ir atsevišķs no `headers`, kas autentificē eksportētāju kolektorā.

Tveršana lasa tikai `pipeline_client_request`, kas tiek aizpildīts no saglabātā detalizētā konveijera
`clientRawRequest` (vai mantotā `clientRequest`). Tā nekad neizmanto pakalpojuma sniedzēja pieprasījuma galvenes kā rezerves avotu.
Pieprasījuma ierakstīšanas brīdī bija jābūt iespējotai detalizētai konveijera žurnalēšanai. Ja
`includeBodies` ir atspējots vai klienta momentuzņēmuma JSON trūkst, ir bojāts vai apgriezts, galveņu
atribūti netiek izvadīti. Palielinot `maxBodyBytes`, var novērst momentuzņēmuma apgriešanu eksportēšanas laikā;
tas nevar atjaunot detaļas, kas nekad nav saglabātas. Momentuzņēmums, kas pārsniedz 1 MiB vai satur vairāk nekā
256 galveņu ierakstus, tiek ignorēts. Esošā uzvedņu/atbilžu eksportēšana paliek iespējota līdztekus
galveņu tveršanai; atļauto elementu saraksts nenodrošina datu ielādes režīmu tikai galvenēm.

Atlasītās vērtības kļūst par `http.request.header.<full lowercase header name>` OTLP virkņu masīviem,
pat ja ir tikai viena virkne. Piemēram, `X-OmniRoute-Meta-Team: example-team` kļūst par
`http.request.header.x-omniroute-meta-team` ar
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Pilnais prefikss tiek saglabāts: tās ir parastas galvenes bez biznesa lauku parsēšanas vai
`omniroute.metadata.*` / Langfuse metadatu pārveidošanas. `langfuseMapping` nemaina galveņu
semantiku. Atlasīta `User-Agent` galvene ar vienu vērtību iestata arī standarta skalāro atribūtu
`user_agent.original`. Komati vienas vērtības ietvaros netiek izmantoti sadalīšanai. Reģistra varianti tiek apvienoti saglabāto
ierakstu secībā; jebkurš nederīgs variants izraisa visas attiecīgās galvenes izlaišanu. Atribūti tiek sakārtoti pēc nosaukuma ar mazajiem burtiem.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API atslēgu galvenes, nosaukumi, kas satur
auth/token/secret/password/credential marķierus, un iekšējie vārtejas akreditācijas dati vienmēr tiek
izslēgti, pat ja tie ir atlasīti vai krātuvē daļēji maskēti. Zināmu akreditācijas datu paraugu atpazīšanai tiek atkārtoti izmantots
koplietotais akreditācijas datu detektors; aizklāšanas marķieri tiek izlaisti, nevis eksportēti kā drošas vērtības.
Tiek pieņemtas tikai virknes un netukši virkņu masīvi; skaitļi un objekti netiek automātiski pārveidoti.
Nederīgi nosaukumi, prototipa atslēgas, vadības rakstzīmes (izņemot horizontālo tabulāciju) un nepareizi veidots Unicode
tiek ignorēti, neizraisot paketes kļūmi un neatspoguļojot to saturu kļūdu ziņojumos.

Katrs laidums tver ne vairāk kā 32 galvenes, 16 vērtības katrai galvenei, 4096 UTF-8 baitus katrai vērtībai
un kopā 16384 UTF-8 baitus visu tverto galveņu nosaukumiem un vērtībām. Pārāk lielas vai nederīgas galvenes
tiek pilnībā izlaistas, nevis apgrieztas. Atlase ir operatora lēmums par privātumu: šķietami droši nosaukumi
joprojām var saturēt personas datus, un šie ierobežojumi/detektori nav vispārīgs personas identificējošas informācijas attīrīšanas līdzeklis.

### Piegādes ierobežojumi

Pieprasījumiem ir noteikts 500 laidumu un 4 MiB UTF-8 JSON ierobežojums, ieskaitot aploksni.
Katra atļautā laiduma lielums tiek pārbaudīts pirms kursora paketes pirmā pieprasījuma. Ja atsevišķs
laidums pārsniedz ierobežojumu, netiek nosūtīta neviena šīs paketes daļa, un tiek ziņots par kļūmi ar norādi samazināt
`maxBodyBytes`; tas netiek klusi atmests. Iepriekšējā pārbaude saglabā tikai atsauces uz ierakstiem un
baitu skaitu, atmetot katru pagaidu laidumu/JSON; laidumi tiek veidoti no jauna ierobežota izmēra daļām,
nevis atmiņā tiek turēta otra serializēta paketes kopija. HTTP 408/429/5xx, tīkla kļūmju un noildžu gadījumā tiek veikti ne vairāk kā
trīs mēģinājumi ar 250/500 ms eksponenciālu aizturi. `Retry-After` norādītās sekundes vai HTTP datumi
var pagarināt aizturi līdz 5 sekundēm. Citi statusi izraisa tūlītēju kļūmi. Arī OTLP 2xx daļēja noraidīšana izraisa izņēmumu, nevis
zaudēta laiduma apstiprināšanu; tiek pieņemti tukši apstiprinājumi vai derīgi JSON apstiprinājumi ar
64 KiB atbildes nolasīšanas ierobežojumu.

Kļūdu ziņojumi satur tikai eksportētāja rīcībā esošus faktus: HTTP statusu, atkārtoto mēģinājumu kategoriju, mēģinājumu un nosūtīto laidumu
skaitu vai fiksētu apstiprinājuma/tīkla kļūmes formulējumu. Kolektora atbilžu saturs,
daļējas izdošanās skaitļi un atbilžu galvenes nekad netiek kopētas kļūdu ziņojumos, žurnālos vai
informācijas panelī. Neveiksmīga vai daļēji pieņemta pakete netiek apstiprināta: galamērķī tiek rādīts
kļūmes stāvoklis ar attiecīgo statusu, kursors paliek pie pēdējās apstiprinātās paketes, un nākamā izpilde
atkārtoti nosūta tās pašas rindas. Pastāvīgie statusi turpina izraisīt kļūmes, līdz tiek novērsta kolektora vai konfigurācijas
problēma. Lai iegūtu detalizētu informāciju par atbildēm, izmantojiet paša kolektora žurnālus. Izsaukumu žurnāla kļūdu kopsavilkumiem tiek saglabāta
atsevišķa sensitīvās informācijas aizklāšana.
`prepare()` neko nesagatavo; pārbaude nosūta tieši `{"resourceSpans":[]}` un ziņo par
HTTP statusu, neierakstot izsaukumu žurnāla laidumus.

Trasējumu ID un laidumu ID ir pirmie 32/16 heksadecimālie cipari no SHA-256 vērtības, kas aprēķināta attiecīgi virknei
`"omniroute.trace\0" + callLogId` un `"omniroute.span\0" + callLogId`. Atkārtoti sūtījumi izmanto
identiskus ID. Tas negarantē dublikātu novēršanu: dažas aizmugursistēmas, tostarp Langfuse
v4 datu saņemšana, nenovērš laidumu ar vienādiem ID dublēšanos. Avārija vai daļēja daļas kļūme var
izraisīt ne vairāk kā vienas neapstiprinātās kursora paketes atkārtotu nosūtīšanu; var tikt dublēta visa šī pakete,
nevis tikai tās pēdējā HTTP daļa. Izvēloties kursora paketes lielumu, ņemiet vērā šo kompromisu.

### Langfuse piemērs

Pašmitinātai Langfuse instancei konfigurējiet šos laukus:

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

Izveidojiet Authorization vērtību lokāli kā burtiskas virknes `public-key:secret-key`
Base64 kodējumu (piemēram, ar `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Neielīmējiet īstus akreditācijas datus žurnālos, ekrānuzņēmumos vai problēmu pieteikumos. Kartēšana automātiski
iestata `x-langfuse-ingestion-version: 4`; Authorization joprojām tiek norādīta laukā `headers`.
Gan galvenes, gan ģenerētā identitātes sāls izmanto esošo šifrēto slepeno lauku
mehānismu un API vietturus; ir nepieciešams `STORAGE_ENCRYPTION_KEY`.

Kartējums pievieno ģenerēšanas tipu/modeli, JSON lietojuma informāciju (ievade/izvade/kopā un pieejamās
kešatmiņas atslēgas), JSON ievades/izvades momentuzņēmumus, ERROR/DEFAULT līmeni, sanitizētu statusa ziņojumu,
izsekošanas nosaukumu, sesijas ID, neobligātu vidi un filtrējamu
`langfuse.observation.metadata.<key>` pakalpojumu sniedzējam, pieprasītajam modelim, ceļam, kombinācijai, kešatmiņas
avotam un statusam. `langfuse.observation.completion_start_time` ir ISO 8601 formātā izteikts
sākuma laiks + TTFT tikai tad, ja TTFT ir zināms un ietilpst ilgumā. Izmaksu atribūti netiek sūtīti.

Identitātes režīmi attiecas uz `langfuse.user.id`:

- `pseudonymous` (noklusējums): API atslēgas iekšējā ID HMAC-SHA256 ar nejaušu,
  katram galamērķim atsevišķu 32 baitu sāli. Ja sāls nav, tas tiek ģenerēts izveides laikā, šifrēts
  kā `identitySalt`, nekad netiek atgriezts un tiek saglabāts rediģēšanas laikā. Neapstrādāti atslēgu ID nekad
  netiek ievietoti izsekošanas posmu atribūtos. Galamērķa sāls atkārtota izveide vai rotācija maina identitātes.
- `keyName`: konfigurētais API atslēgas nosaukums, apzināti atklājot šo operatora etiķeti.
- `none`: bez lietotāja ID. Sesiju birkas joprojām tiek eksportētas, ja tās ir pieejamas; šie režīmi
  neanonimizē patvaļīgu uzvedņu saturu vai operatora norādītas sesiju/korelācijas etiķetes.

### Sākšana bez vēsturisko datu ielādes

Tikai izveides laikā iespējojiet **Sākt no pašreizējās pozīcijas (izlaist esošos žurnālus)** vai nododiet
`startFromCurrentPosition: true` izveides API pieprasījuma satura augšējā līmenī. Tas inicializē
`cursor_row_id` ar pašreizējo maksimālo saglabāto izsaukumu žurnāla rowid, izmantojot esošās kursora
palīgfunkcijas, bez migrācijas. Noklusējuma vērtība ir false (kursors 0 un saglabātās vēstures ielāde).
Tas nav kursora atiestatīšanas iestatījums atjaunināšanas laikā.

Koplietojamais `ttftMs` papildinājums BigQuery kartētājam
un jaunu tabulu shēmai pievieno arī kolonnu `ttft_ms`, kurā ir atļauta null vērtība: shēmas tests pieprasa, lai katram kanoniskā ieraksta laukam būtu
kolonna. Esošo tabulu eksports turpinās bez izmaiņām: `prepare()` nolasa tabulas shēmu un
izlaiž tikai `ttft_ms`, ja šīs kolonnas nav. Pievienojiet INT64 kolonnu, kurā ir atļauta null vērtība, lai iegūtu TTFT
nākamajā izpildes reizē, vai izmantojiet jaunu tabulu. Nav nepieciešams PATCH, automātiska shēmas mainīšana vai papildu
atļaujas; visiem pārējiem rindas laukiem tiek saglabāta stingra shēmas pārbaude.

---

## 6. Galamērķa pievienošana

1. Izveidojiet `src/lib/logExport/destinations/<name>.ts`, kas eksportē `LogExportDestinationType`:
   Zod `configSchema`, `fields` deskriptoru masīvu lietotāja saskarnei, `secretFields` un
   `createClient(config)`, kas atgriež `test()` / `prepare()` / `send(records)`.
2. Pievienojiet to masīvam `DESTINATIONS` failā `src/lib/logExport/registry.ts`.
3. Izveidojiet testus direktorijā `tests/unit/`.

Tās ir visas nepieciešamās izmaiņas: datu saglabāšana, cron uzdevums, REST slānis, noslēpumu šifrēšana un
informācijas paneļa veidlapa izmanto reģistru.

Divi noteikumi jaunam galamērķim:

- `send()` **obligāti jāizmet izņēmums** daļējas kļūmes gadījumā. Sekmīga izpilde nozīmē: „galamērķī ir šīs rindas”,
  un kursors neatgriezeniski tiek pārvietots aiz tām.
- Galamērķim, kas pieņem lietotāja norādītu URL, tas pirms pieprasījuma veikšanas ir jāpārbauda ar
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) tāpat, kā tas tiek darīts tīmekļa aizķerēm.
  BigQuery tas nav nepieciešams: tā resursdatoru nosaukumi ir konstantes.

---

## 7. Ekspluatācija

- **Informācijas panelis**: Integrācijas → Žurnālu eksportēšana. Pievienojiet galamērķi, palaidiet **Testēt**, lai pārbaudītu akreditācijas datus,
  neierakstot rindas, un pēc tam iespējojiet to.
- **Neapstrādāto ierakstu rinda**: katra galamērķa kartītē ir redzamas neapstrādātās rindas un kursors; `GET
/api/log-export/status` atgriež tos pašus rādītājus, kā arī pēdējās 20 uzdevuma izpildes.
- **Viena galamērķa kļūme neizraisa pārējo kļūmi** — izpildes kopsavilkumā katra galamērķa
  statuss tiek ierakstīts laukos `last_status` / `last_error`, bet uzdevumu izpildes vēsturē tiek saglabāts kopējais rezultāts.
- **Dzēšot galamērķi, tiek dzēsts tā kursors.** Pievienojot to atkārtoti, apstrāde sākas no vecākā saglabātā
  zvanu žurnāla ieraksta, tādēļ atkārtoti tiek nosūtītas rindas, kas galamērķī, iespējams, jau ir. Pakalpojumā BigQuery katras rindas
  `insertId` to novērš tikai paša BigQuery deduplikācijas loga ietvaros, tādēļ ieteicams galamērķi
  atspējot, nevis dzēst.
