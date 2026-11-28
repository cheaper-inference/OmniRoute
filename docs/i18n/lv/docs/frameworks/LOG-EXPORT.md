# Log export (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Nepārtraukta, inkrementāla OmniRoute izsaukumu žurnālu eksportēšana uz ārēju analītikas krātuvi.

Informācijas paneļa cilnē Žurnāli pieprasījumu vēsture tiek glabāta SQLite (`call_logs`), un tās apjomu ierobežo
rotācija un glabāšanas termiņš. Žurnālu eksportēšana pēc grafika nosūta to pašu ierakstu kopu uz ārēju krātuvi, lai tā saglabātos
ilgāk par lokālo datubāzi un to varētu apvienot ar citiem datiem. BigQuery ir pirmais galamērķis;
konveijers ir veidots kā reģistrs, tāpēc jaunus galamērķus var pievienot papildus.

---

## 1. Kā tas darbojas

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Grafiks** — viens `JobRegistry` cron darbs, `log_export`, pēc noklusējuma tiek iestatīts `0 * * * *` (stundu, UTC). Reģistrēts `src/lib/initCloudSync.ts`; ignorējams ar `OMNIROUTE_LOG_EXPORT_CRON`. Katra ērce iztukšo katru** iespējots** galamērķis, secīgi.
- **Cursor** — SQLite netiešais `call_logs.rowid`, saglabājās katram galamērķim `log_export_destinations.cursor_row_id`. `timestamp` apzināti nav kursors: zvanītāji var norādīt savu vērtību, tāpēc lēnu pieprasījumu var rakstīt pēc ātrāka pieprasījuma, kas sākās vēlāk, un laikspiedola kursors to izlaistu.
- **Partiju komplektēšana** — `batch_size` rindas vienā pieprasījumā (noklusējums 500), `max_rows_per_run` rindas izpildē (noklusējuma 10 000), tāpēc liels atlikums tiek iztērēts vairākos atzīmes, nevis bloķē vienu.
- **Piegāde** — kursors virzās uz priekšu tikai pēc `send()` atrisināšanas. Neveiksmīga partija atstāj kursoru vietā, kur tas bija, tāpēc tās pašas rindas tiek mēģinātas atkārtoti nākamajā izpildē. Garantija ir vismaz vienu reizi plus galamērķa puses dublēšanās atcelšana, nevis patiesība tieši vienreiz: BigQuery katru rindu atslēgs ar zvanu žurnāla ID, ko tā ievēro, vislabākajā veidā savā atkopšanas logā.
- **Pārklāšanās aizsargs** — cron ērce un `POST .../run` var izšaut kopā. Mērķis, kas jau tiek iztukšots, tiek izlaists, nevis iztukšots divreiz (darba rezultātos `skipped: true` ), tāpēc vienlaicīga izpilde nevar atkārtoti nosūtīt partiju vai rakstīt kursoru atpakaļ.
- **Iztīrīšanas atgūšana** — ja `cursor_row_id` beidzas virs `MAX(rowid)` (visa tabula tika iztīrīta un rindas tika restartētas), skrējējs attīs uz 0, nevis paliek pastāvīgi akls.

### Izolēts skrējējs un ierobežojumi

Katrs galamērķis, kas tiek palaists mezglā, sāk atsevišķu īslaicīgu OS pakārtotu procesu (`child_process` ar IPC, nevis `worker_threads`). Pamatteksta nolasījumi, lietderīgā slodze JSON parsing/serialization, galamērķa `prepare()` un galamērķa tīkls I/O darbojas tur, nevis servera notikumu cilpā. IPC šķērso tikai konfigurācijas un neliela progresa ziņojumi; eksportētie ieraksti nekad neatgriežas serverī. Cron uzdevums un maršruts Palaist tūlīt saglabā to pašu publisko rezultātu un pārklāšanās aizsardzību.

Bērns atver servera atrisināto `DATA_DIR/storage.sqlite` tikai lasāmu, izmantojot `node:sqlite`, ar `busy_timeout=5000` un `query_only=ON`. Tas neimportē DB singleton un neveic migrāciju, dublējumus vai SQLite atjauninājumus. Missing/corrupt artefaktu grāmatvedība (ieskaitot bojāto artefaktu UPDATE) paliek tikai informācijas paneļa informācijas ceļā. Abiem ceļiem ir kopīgs detaļu risinātājs; eksportēšanai tiek izmantota asinhrona failu sistēmas nolasīšana un tas pats artefakts → mantojums iekļauts → mantojums disks → nav izšķirtspējas secība. Izpildes momentuzņēmumi uzņem maksimālo ievietošanas rindu, kad bērns atver lasītāju; vēlāk ieliktņi gaida nākamo skrējienu. Šī ir ievietošanas robeža, nevis ilgstošs SQLite darījums: WAL rakstītāji un kontrolpunkti paliek brīvi tīkla gaidīšanas laikā. Updates/deletions esošo rindu nav iesaldētas ar šo robežu.

Pēc katras pieņemtās partijas bērns gaida apstiprinājumu. Serveris vispirms saglabā kursoru ar `advanceLogExportCursor`, pēc tam nosūta `ack`; pirms tās nesākas nākamā partija. Sūtīšanas kļūme, avārija vai taimauts reģistrē kļūmi, nepārvirzot šo partiju. Iepriekš atzītās partijas paliek saistības; ne vairāk kā vienu neapstiprināto partiju var nosūtīt atkārtoti. Panākumi tiek reģistrēti tikai pēc `done` un tīra bērna izejas. Kļūmes pārtrauc bērna darbību ar SIGTERM, pieaugot līdz SIGKILL pēc 500 ms, un skrējējs gaida procesa slēgšanu.

| Vides mainīgais                               | Noklusējums | Mērķis                                          |
| --------------------------------------------- | ----------- | ----------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000      | Sienas pulksteņa ierobežojums katram galamērķim |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024        | Bērnu V8 veco vietu ierobežojums MB             |

Invalid/non-positive/non-integer vērtībām tiek izmantoti noklusējuma iestatījumi. Kaudzes iestatījums nav kopējais RSS ierobežojums; ļoti lielas partijas joprojām var izsmelt bērna atmiņu un neizdoties droši. 1024 MB noklusējuma vērtība atstāj brīvu vietu noklusējuma 500 rindu 512 KiB artefaktu partijai ar iespējotiem korpusiem, tostarp BigQuery baitiem sadalīto JSON serializāciju. Tas nepadara drošu 10 000 rindu virsbūves partiju. V8 kaudzes izsmelšana reģistrē darbības traucējumu: samaziniet partijas lielumu vai palieliniet `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursors paliek pie pēdējās apstiprinātās partijas. Mūsdienu artefaktu vāciņi nesedz vēsturiskos inline/disk korpusus. Operatoriem RSS budžets ir jāiekļauj atsevišķi, jo īpaši konteineros ar ierobežotu atmiņu.

Bērns manto tikai atrisināto `DATA_DIR`, `NODE_ENV`, skaidru `TZ` (mantotais faila nosaukuma vietējā laika izšķirtspēja), `ELECTRON_RUN_AS_NODE`, ja tāds ir, un šādas izejošās ievades: `HTTP_PROXY` `SSL_CERT_DIR` `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (un to mazo burtu formas), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS` `SSL_CERT_FILE` Globālais Undici dispečers koplieto servera tīro vides starpniekservera izšķirtspēju un vietējā resursdatora apiešanas noteikumus, tostarp `NO_PROXY`; tas neimportē `proxyFetch.ts` vai tā DB/feature karogus. Starpniekservera akreditācijas dati tiek noņemti no pārsūtītās izvades un ierakstītajām kļūdām. Galamērķa akreditācijas dati tiek pārvietoti tikai vienā sākuma IPC ziņojumā, nekad argv vai vidē; output/error pārsūtīšanai ir pievienots prefikss un tā ir dezinficēta. Tikai `ExperimentalWarning` ir atspējots bērnu exec argumentos, lai izvairītos no mezgla SQLite brīdinājuma atkārtošanas katrā cron izpildē; citi brīdinājumu veidi paliek redzami.

Galamērķa moduļiem ir jābūt importējamiem bez Next.js/server-only atkarībām. Esošā BigQuery ieviešana jau atbilst šim līgumam. Piekļuves pilnvaru kešatmiņas ir paredzētas tikai pakārtotajam skrējienam, nevis pāri skrējieniem. Mezgls ir atbalstītais izpildlaiks (`package.json` dzinēji). Pastāv labākais neatbalstīts Bun saderības ceļš (`bun:sqlite` mapē `src/lib/db/core.ts` / adapters un `Dockerfile.bun`), tāpēc eksportēšana nedrīkst pārtrūkt. Saskaņā ar Bun eksportēšana saglabā iepriekšējo procesa ceļu un izdod vienreizēju brīdinājumu: bērna heap/timeout izolācija nav pieejama. Izmantojiet Node notikumu cilpas un OOM izolācijai.

Kad `includeBodies` ir iespējots, dodiet priekšroku minūtes līmeņa ritmam, piemēram, `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` nevis stundas lietderīgās slodzes uzkrāšanai. Partijas un rindu ierobežojumi joprojām ir saistīti ar katru izpildi. Procesa palaišana tiek apmaksāta katram galamērķim vienā palaijumā; tādējādi tiek tirgotas nelielas starta izmaksas par servera notikumu cilpas izolāciju, nevis samazinātu kopējo CPU izmantošanu.

### Lietderīgās slodzes (uzvednes un pabeigšanas)

Pēc noklusējuma eksportam ir tikai kopsavilkuma lauki žurnāli** sarakstu** rāda. Ieslēdzas** Eksportējiet uzvednes un atbildes** (`includeBodies`) papildus nosūta to, ko Logs** detaļa** rūts parāda katram zvanam:

| Lauks                            | Ko tas satur                                                  |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | Zvana lietderīgās slodzes tiek atveidotas informācijas panelī |
| `pipeline_route_decision`        | Kuru mērķi un modeli maršrutētājs izvēlējās                   |
| `pipeline_client_request`        | Neapstrādāts pieprasījums tieši tā, kā klients to nosūtīja    |
| `pipeline_openai_request`        | Pēc tulkošanas iekšējā OpenAI formā                           |
| `pipeline_provider_request`      | Kā faktiski nosūtīts augšup, pakalpojumu sniedzēja dialektā   |
| `pipeline_provider_response`     | Neapstrādāta reakcija uz augšu                                |
| `pipeline_client_response`       | Kas tika atdots zvanītājam                                    |
| `pipeline_error`                 | Cauruļvada līmeņa kļūdas informācija par neveiksmīgu zvanu    |
| `bodies_truncated`               | Taisnība, ja jebkurš lauks iepriekš sasniedz `maxBodyBytes`   |

Šis ir tūlītējs saturs, tā tas ir** izslēgts pēc noklusējuma** un apzināti noteikta galamērķa izvēle. Informācijas panelī tiek parādīts tas, kas tiek rādīts, jo eksporta un `getCallLogById` koplietošanas detaļu izšķirtspēja: derīgās slodzes jau ir PII sanitizētas un slepeni rediģētas, kad tās tiek rakstītas, un zvans, kas veikts ar `noLog` API atslēgu, nesaglabā lietderīgo kravu, tāpēc nav ko eksportēt.

Lietderīgās slodzes tiek nolasītas katrā rindā no failu sistēmas artefakta, tāpēc hidratācija tiek veikta tikai tiem galamērķiem, kas to pieprasījuši. Trūkstošs vai bojāts artefakts eksportē savu kopsavilkumu ar nulles lietderīgajām slodzēm, nevis neizdodas izpildīt partiju un novirzīt kursoru.

`maxBodyBytes` (noklusējuma 262144) katrā laukā ir lielie burti. Ilgākas kravnesības ir** saīsināts, nevis nomests** — apgrieztā uzvednē joprojām tiek atbildēts "kas tika jautāts" —, un rinda tiek atzīmēta ar `bodies_truncated`. Straumētās deltas pa daļām netiek eksportētas; samontētā atbilde jau ir `pipeline_provider_response` un `pipeline_client_response`.

---

## 2. Faili

| Komponents                               | Atrašanās vieta                              |
| ---------------------------------------- | -------------------------------------------- |
| Galamērķa līgums                         | `src/lib/logExport/types.ts`                 |
| Reģistrs                                 | `src/lib/logExport/registry.ts`              |
| Noslēpumu apstrāde                       | `src/lib/logExport/secrets.ts`               |
| Izpildītājs (vecākprocesa IPC)           | `src/lib/logExport/runner.ts`                |
| Procesa dzīves cikls                     | `src/lib/logExport/childRunner.ts`           |
| Bērnprocesa ieejas punkts                | `src/lib/logExport/exportChild.ts`           |
| Atvēršana tikai lasīšanai                | `src/lib/db/logExportReadOnly.ts`            |
| Koplietojamais vaicājums/kartējums       | `src/lib/usage/callLogExportQueries.ts`      |
| Detalizētās informācijas atrisinātājs    | `src/lib/usage/callLogDetailResolver.ts`     |
| API projekcija                           | `src/lib/logExport/presenter.ts`             |
| BigQuery galamērķis                      | `src/lib/logExport/destinations/bigquery.ts` |
| Google pakalpojuma konta autentifikācija | `src/lib/logExport/googleServiceAccount.ts`  |
| Izsaukumu žurnāla avots                  | `src/lib/usage/callLogExportSource.ts`       |
| Datu saglabāšana                         | `src/lib/db/logExportDestinations.ts`        |
| Cron uzdevums                            | `src/lib/jobs/logExportJob.ts`               |
| REST slānis                              | `src/app/api/log-export/`                    |
| Informācijas paneļa lapa                 | `src/app/(dashboard)/dashboard/log-export/`  |

Shēma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Visiem maršrutiem ir nepieciešama pārvaldības autentifikācija (`requireManagementAuth`). Noslēpumi nekad netiek atgriezti:
saglabāts noslēpums tiek atgriezts kā literālā vērtība `__stored__`, un šīs vērtības nosūtīšana atjauninājumā
saglabā esošos akreditācijas datus.

Veidojot vai atjauninot galamērķi, kura tips deklarē noslēpumu, **ir nepieciešams
`STORAGE_ENCRYPTION_KEY`**. Bez tā `encrypt()` nemanāmi nodod datus tālāk bez izmaiņām, tāpēc ierakstīšana tiek
noraidīta ar statusu 400, nevis akreditācijas dati tiek ievietoti SQLite atklātā tekstā (tādu pašu aizsardzību izmanto
Telegram tīmekļa aizķere).

| Metode   | Ceļš                                     | Mērķis                                                                                    |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Galamērķu tipi un to konfigurācijas lauku saraksts                                        |
| `GET`    | `/api/log-export/destinations`           | Galamērķu saraksts (noslēpumi aizklāti)                                                   |
| `POST`   | `/api/log-export/destinations`           | Izveidot galamērķi                                                                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Nolasīt vienu galamērķi                                                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | Atjaunināt nosaukumu / iespējoto stāvokli / konfigurāciju / apstrādi paketēs              |
| `DELETE` | `/api/log-export/destinations/{id}`      | Dzēst                                                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Pārbaudīt akreditācijas datus, neko neierakstot                                           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Eksportēt gaidošos ierakstus tūlīt, izmantojot to pašu izpildes ceļu kā plānotajā izpildē |
| `GET`    | `/api/log-export/status`                 | Cron stāvoklis, nesenās izpildes, gaidošie ieraksti katram galamērķim                     |

`GET /api/log-export/types` padara lietotāja saskarni universālu: informācijas paneļa veidlapa tiek atveidota no
atgrieztajiem lauku aprakstiem, tāpēc jaunam galamērķim nav nepieciešamas izmaiņas lietotāja saskarnē.

---

## 4. BigQuery galamērķis

Konfigurācijas atslēgas (`type: "bigquery"`):

| Atslēga              | Piezīmes                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP projekts, kurā atrodas datu kopa                                                                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                      |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                      |
| `location`           | Izmanto tikai tad, ja datu kopa ir jāizveido (noklusējums `EU`)                                                      |
| `serviceAccountJson` | Pakalpojuma konta atslēga. Noslēpums: šifrēta miera stāvoklī, nekad netiek atgriezta                                 |
| `autoCreate`         | Izveido trūkstošu datu kopu/tabulu; nosacīti pievieno anulējamas lietojuma pierādījumu kolonnas (noklusējums `true`) |

Pakalpojuma kontam mērķa tabulā ir nepieciešama `bigquery.tables.updateData` atļauja, kā arī
`bigquery.datasets.create` / `bigquery.tables.create`, kad `autoCreate` ir ieslēgts.
Esošas tabulas atjaunināšanai, lai pievienotu divus anulējamus lietojuma pierādījumu laukus, ir nepieciešama arī
`bigquery.tables.update` atļauja. Trūkstoša atļauja eksportu pārtrauc, nevirzot tā kursoru uz priekšu.

Konfigurēta pakete ir **kursa vienība**, nevis HTTP vienība: `send()` to sadala insertAll
izsaukumos, kuros ir ne vairāk kā 500 rindas, tāpēc liels `batch_size` nevar izraisīt BigQuery 10 MB pieprasījumu ierobežojuma pārsniegšanu.
Īslaicīgas kļūmes statusi (408/429/500/502/503/504) tiek mēģināti atkārtoti līdz trim reizēm ar eksponenciālu
atkārtošanas aizkavi, atkārtoti izmantojot tos pašus insertIds; autentifikācijas un shēmas kļūmes izraisa izņēmumu jau pirmajā mēģinājumā,
nevis nevajadzīgi patērē izpildes reizi.

Tikko izveidota tabula vēl nav redzama straumēšanas galapunktam, kas dažas sekundes atbild ar 404. Šis 404 tiek mēģināts atkārtoti, bet **tikai tad, ja šī izpildes reize izveidoja tabulu** —
patiesi trūkstoša tabula joprojām izraisa tūlītēju kļūmi. Ņemiet vērā, ka tabulas atkārtota izveide ar nosaukumu, kas
nesen tika dzēsts, liek BigQuery vairākas minūtes atteikt straumēšanas ievietošanu; tā ir dzēšanas un atkārtotas izveides
īpašība, tāpēc dodiet priekšroku jaunam tabulas nosaukumam, nevis tabulas nomešanai un atkārtotai pievienošanai.

**Daļēja kļūme tiek saņemta kā HTTP 200 ar neaizpildītu `insertErrors[]`.** Tā tiek uzskatīta par
kļūmi un izraisa izņēmumu, kas aptur kursora virzīšanos pāri rindām, kuras BigQuery nekad nav pieņēmis;
`tests/unit/log-export-bigquery.test.ts` fiksē šo darbību.

Transportēšana notiek, izmantojot parastu REST — pašparakstīts RS256 apgalvojums tiek apmainīts pret piekļuves pilnvaru vietnē
`https://oauth2.googleapis.com/token`, pēc tam rindas tiek nosūtītas uz `tabledata.insertAll`. Netiek
pievilkts neviens Google SDK. Piekļuves pilnvaras tiek glabātas procesa atmiņā pa pāriem (pakalpojuma konts, tvērums).

Izveidotajā tabulā ir viena kolonna katram cilnes Logs laukam, kā arī `exported_at`, un tā ir izkārtota atbilstoši
tam, kā zvanu žurnāli faktiski tiek vaicāti:

- **Sadalīta pa dienām pēc `timestamp`**, tāpēc vaicājums, kas ierobežots tikai pēc datuma, skenē tikai attiecīgās dienas.
- **Klasterizēta pēc `api_key_name`, `provider`, `model`, `status`** (šādā secībā), tāpēc filtrēšana pēc
  izpildītāja, mērķa vai kļūmes esamības samazina bloku skaitu katrā nodalījumā. BigQuery pieļauj ne vairāk kā četras klasterizācijas kolonnas, un secībai ir nozīme:
  filtrs tikai pēc `api_key_name` samazina skenējamo bloku skaitu, bet filtrs tikai pēc `status` to nedara.
- **Neobligāta nodalījumu saglabāšana**, izmantojot `partitionExpirationDays` (0 saglabā visu), kas tiek
  piemērota tabulas izveides laikā.

Abi iestatījumi tiek piemēroti izveides laikā. Esoša tabula saglabā tai jau piešķirto izkārtojumu, tāpēc, ja vēlaties tos izmantot,
norādiet galamērķim jaunu tabulas ID.

`tests/unit/log-export-bigquery.test.ts` pārbauda, ka kartētājs un tabulas shēma paliek
sinhronizēti, tāpēc jauna zvanu žurnāla kolonna nevar tikt nemanāmi atmesta ceļā uz galamērķi.

Paketes tiek sadalītas, ņemot vērā **gan rindu skaitu, gan serializēto baitu skaitu**. Ar rindu skaitu vien nepietiek,
kad tiek eksportēti lietderīgās slodzes dati: 500 rindas ar uzvednēm var aizņemt desmitiem megabaitu, un insertAll
noraida pieprasījumu, kas pārsniedz 10 MB. Paketes tiek noslēgtas pie 500 rindām vai 9 MB — atkarībā no tā, kas iestājas vispirms.

---

## 5. OTLP/HTTP trasējuma galamērķis

Konfigurācijā tiek izmantots `type: "otlp-http"`. Šis ir ieplānots, ar kursoru
saistīts saglabāto izsaukumu žurnālu eksports, nevis labākās piepūles reāllaika
maršrutēšanas notikumu saņēmējs failā
`open-sse/services/routing/otel.ts`. Tas nelasa un nemaina šī saņēmēja vides
mainīgos, taimerus vai buferus. Iespējojot abus, var tikt izveidoti divi neatkarīgi
span veidi; izmantojiet `omniroute.log-export` instrumentācijas tvērumu, lai atšķirtu
šos izsaukumu žurnāla span.

| Atslēga                  | Noklusējums / nolūks                                                              |
| ------------------------ | --------------------------------------------------------------------------------- |
| `endpoint`               | Nepieciešams pilns HTTP(S) trasējumu URL; sufikss `/v1/traces` netiek pievienots  |
| `headers`                | Neobligātas `Name: value` rindas vai virkņu JSON objekts; šifrēts                 |
| `requestHeaderAllowlist` | Tukšs (izslēgts); klienta galveņu nosaukumi/priedēkļi, ko tvert kā span atribūtus |
| `serviceName`            | `omniroute`; resurss `service.name`                                               |
| `langfuseMapping`        | `false`; pievieno Langfuse ģenerēšanas/sesijas/lietotāja atribūtus                |
| `identity`               | `pseudonymous`, `keyName` vai `none`                                              |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                           |
| `timeoutMs`              | `30000` katram HTTP mēģinājumam                                                   |
| `environment`            | Nav iestatīts; neobligāts `langfuse.environment`                                  |

Vispārīgais informācijas panelis attēlo šos laukus. `paths` pieņem API masīvu vai teksta
lodziņu ar precīziem ceļiem, kas atdalīti ar jaunām rindām/komatiem. Embeddings, rerank
un citi ceļi tiek izlaisti, ja vien tie nav skaidri atļauti. Izlaistās rindas joprojām
virza kursoru uz priekšu; esošā izpildītāja `exported`/`exportedTotal` skaitītāji uzskaita
apstrādātās avota rindas, tostarp filtrētās rindas, nevis pieņemtos span. Filtrēšana tiek
veikta bērnprocesā, nemainot tā IPC/kursora līgumu.

URL validācijā tiek izmantots no DB neatkarīgais `parseAndValidateNonMetadataUrl` palīgs no
`src/shared/network/outboundUrlGuard.ts`: `block-metadata` politika. Tai ir tādas pašas
beznosacījumu metadatu/protokola/iegultu akreditācijas datu pārbaudes kā tīmekļa āķa
validatoram, bet privātie URL ir atļauti; apzināti tiek atļauti lokālā resursdatora/LAN
mērķi bez globāla funkcionalitātes karoga ignorēšanas. Tas ļauj izmantot paša uzturētus
Langfuse, Phoenix, Tempo un Collector galapunktus, tostarp privātus HTTP galapunktus.
Mākoņa metadatu resursdatori vienmēr tiek bloķēti. Novirzīšana netiek ievērota, tāpēc
kolektors nevar novirzīt akreditācijas datus uz citu resursdatoru. Tāpat kā esošais
leksiskais URL aizsargs, arī šis nepiesaista DNS izšķirtspēju; konfigurējiet tikai
operatora kontrolētus resursdatorus. Ja galapunkts neatrodas uzticamā tīklā, dodiet
priekšroku HTTPS.

### Lietderīgā slodze un piegāde

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) satur vienu
CLIENT span katrai atļautajai rindai; tā nosaukums ir precīzais pieprasījuma ceļš. Ceļa
nosaukumi atšķir Chat Completions, Responses un Messages, neiekļaujot modeļa vai
identitātes datus span nosaukumā. Resursa atribūti ietver `service.name` un pakotnes
`service.version`.

Parastais tērzēšanas mēģinājumu reģistrētājs
(`open-sse/handlers/chatCore/attemptLogging.ts`) pabeigšanas brīdī ieraksta
`duration = Date.now() - startTime` un nepiegādā laika zīmogu;
`saveCallLogOperation` failā `src/lib/usage/callLogs.ts` pēc noklusējuma iestata laika
zīmogu uz rakstīšanas (pabeigšanas) laiku. Tāpēc eksports iestata beigas uz rindas laika
zīmogu un sākumu uz beigas − ilgumu (milisekundes, pārveidotas par decimālām
nanosekundēm). Arī izsaucēja nodrošinātie vēsturiskie laika zīmogi tiek saglabāti kā
beigu laiks; katrai rindai nav atšķirības starp sākumu un pabeigšanu. Nulles ilgums kļūst
par nulli. Nederīgi vai trūkstoši laika zīmogi izraisa pakešapstrādes kļūmi, nevis
nedeterministisku span izveidi. `ttftMs` var būt nulles vērtība un tiek kartēts uz
`omniroute.ttft_ms`.

Atribūti ietver `gen_ai.operation.name="chat"`, nodrošinātāju, pieprasīto/atbildes
modeli, ievades/izvades tokenus, neobligātos kešatmiņas nolasīšanas/izveides/spriešanas
tokenus, HTTP statusu, kombināciju, kešatmiņas avotu, sesijas tagu un korelācijas ID.
Veselus skaitļus OTLP un laika zīmogus attēlo decimālas virknes; virknes, Būla vērtības un
daļskaitļi izmanto savus dabiskos OTLP vērtību variantus. Kļūdu span status ir ERROR, un
statusa ziņojums ir attīrīts. Kanoniskajā ierakstā nav augšupējā resursdatora URL, tāpēc
`server.address` tiek izlaists, nevis kļūdaini identificēts kolektors kā modeļa
serveris. Izmaksas netiek eksportētas.

Tikai `includeBodies=true` ielādē saturu. Ja `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` satur attīrītu pieprasījuma/atbildes
pamatteksta JSON, kā tas glabājas OmniRoute (parsējama satura gadījumā kanonizēts), nevis
pārveidotu semconv ziņojumu masīvu. Saīsināti/ne-JSON pamatteksti paliek neapstrādāts
teksts. Ja `langfuseMapping=true`, pamatteksti tiek izvadīti tikai kā
`langfuse.observation.input` / `langfuse.observation.output`; `gen_ai.*.messages`
atribūti tiek izlaisti, lai katrs pamatteksts tiktu nosūtīts vienreiz. Abi režīmi pārmanto
`maxBodyBytes` no esošā ielādes ceļa;
`omniroute.bodies_truncated=true` norāda saīsināšanu.
Šis galamērķis nepievieno papildu konveijera momentuzņēmumus vai neattīrītu artefaktu
nolasīšanu; neobligātā pieprasījuma galveņu tveršana izmanto tālāk aprakstīto esošo
ielādēto klienta momentuzņēmumu.
Izmantojiet minūtes līmeņa biežumu, piemēram, `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
eksportējot pamattekstus, nevis uzkrājot stundu ilgu neapstrādātu rindu.

### Neobligātās klienta pieprasījuma galvenes

Galveņu tveršana pēc noklusējuma ir **izslēgta**. Iestatiet galamērķa konfigurācijā
`requestHeaderAllowlist` un iespējojiet **Export prompts and responses**
(`includeBodies: true` galamērķī).
Atļauju saraksts pieņem API masīvu vai teksta lodziņu ar nosaukumiem, kas atdalīti ar
jaunām rindām/komatiem:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Nosaukumi tiek salīdzināti, neņemot vērā reģistru, un tiem precīzi jāatbilst, ja vien viens beigu
`*` neizvēlas netukšu galvenes nosaukuma prefiksu. Atsevišķs `*`, iegultas aizstājējzīmes un
nederīgi HTTP galveņu nosaukumi tiek noraidīti. Ir ne vairāk kā 64 atlasītāji, un katra
nosaukums/prefikss var būt līdz 256 ASCII baitiem garš.
Šis iestatījums ir atsevišķs no `headers`, kas autentificē eksportētāju kolektorā.

Tveršana nolasa tikai `pipeline_client_request`, kas aizpildīts no saglabātā detalizētā
pipeline `clientRawRequest` (vai mantotā `clientRequest`). Tā nekad neizmanto nodrošinātāja
pieprasījuma galvenes kā rezerves avotu. Detalizētai pipeline reģistrēšanai jābūt iespējotai
brīdī, kad pieprasījums tika ierakstīts. Ja `includeBodies` ir atspējots vai trūkst,
klienta momentuzņēmuma JSON ir bojāts vai apgriezts, galveņu atribūti netiek izvadīti.
Palielinot `maxBodyBytes`, var izvairīties no momentuzņēmuma apgriešanas eksportēšanas laikā;
tas nevar atjaunot detalizētu informāciju, kas nekad nav saglabāta. Momentuzņēmums, kas pārsniedz
1 MiB vai satur vairāk nekā 256 galveņu ierakstus, tiek ignorēts. Esošā uzvednes/atbildes
eksportēšana paliek iespējota līdzās galveņu tveršanai; atļaušanas saraksts nenodrošina tikai
galveņu hidratācijas režīmu.

Atlasītās vērtības kļūst par `http.request.header.<full lowercase header name>` OTLP virkņu
masīviem, pat ja ir tikai viena virkne. Piemēram, `X-OmniRoute-Meta-Team: example-team` kļūst
par `http.request.header.x-omniroute-meta-team` ar
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Viss prefikss tiek saglabāts: tās ir parastas galvenes bez biznesa lauku parsēšanas vai
`omniroute.metadata.*` / Langfuse metadatu pārveidošanas. `langfuseMapping` nemaina galveņu
semantiku. Atlasīta vienas vērtības `User-Agent` galvene iestata arī standarta skalāro
`user_agent.original`. Komati vienas vērtības ietvaros netiek sadalīti. Reģistra varianti tiek
apvienoti saglabāto ierakstu secībā; ja kāds variants ir nederīgs, visa attiecīgā galvene tiek
izlaista. Atribūti tiek sakārtoti pēc nosaukuma ar mazajiem burtiem.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, API atslēgu galvenes,
nosaukumi, kas satur auth/token/secret/password/credential marķierus, un iekšējie vārtejas
akreditācijas dati vienmēr tiek izslēgti, pat ja tie ir atlasīti vai krātuvē daļēji maskēti.
Zināmi akreditācijas datu paraugi izmanto koplietojamo akreditācijas datu detektoru; rediģēšanas
marķieri tiek izlaisti, nevis eksportēti kā drošas vērtības. Tiek pieņemtas tikai virknes un
netukši virkņu masīvi; skaitļi vai objekti netiek piespiedu kārtā pārveidoti. Nederīgi nosaukumi,
prototipa atslēgas, vadības rakstzīmes (izņemot horizontālo tabulāciju) un nepareizi veidots
Unicode tiek ignorēti, neizraisot pakešu kļūmi vai to satura atspoguļošanu kļūdās.

Katrā span tiek tvertas ne vairāk kā 32 galvenes, 16 vērtības katrai galvenei, 4096 UTF-8 baiti
katrai vērtībai un kopā 16384 UTF-8 baiti starp tverto galveņu nosaukumiem un vērtībām.
Pārmērīgi lielas vai nederīgas galvenes tiek izlaistas pilnībā, nevis apgrieztas. Atlase ir
operatora privātuma lēmums: arī šķietami droši nosaukumi var saturēt personas datus, un šie
ierobežojumi/detektori nav vispārējs PII tīrītājs.

### Piegādes ierobežojumi

Pieprasījumu ierobežo līdz 500 span un 4 MiB UTF-8 JSON, ieskaitot aploksni.
Katram atļautajam span tiek pārbaudīts izmērs pirms pirmā pieprasījuma kursora paketē. Ja
atsevišķs span pārsniedz ierobežojumu, neviena šīs paketes daļa netiek nosūtīta un tiek
parādīti norādījumi samazināt `maxBodyBytes`; tas netiek klusi atmests. Iepriekšējā pārbaude
saglabā tikai ierakstu atsauces un baitu skaitu, izmetot katru pagaidu span/JSON; span tiek
atjaunoti ierobežota lieluma blokiem, neuzglabājot otru serializētu paketes kopiju. HTTP 408/429/5xx,
tīkla kļūmes un taimauti saņem ne vairāk kā
trīs mēģinājumus ar eksponenciālu 250/500 ms atkāpi. `Retry-After` sekundes vai HTTP datumi
var pagarināt aizkavi līdz 5 sekundēm. Citi statusi izraisa tūlītēju kļūmi. OTLP 2xx daļējs
noraidījums arī izraisa izņēmumu, nevis pazaudēta span apstiprināšanu; tukši vai derīgi JSON
apstiprinājumi tiek pieņemti, un atbildes nolasīšanai tiek piemērots 64 KiB ierobežojums.

Kļūdas satur tikai eksportētāja pārziņā esošus faktus: HTTP statusu, atkārtošanas klasi,
mēģinājumu skaitu un nosūtīto span skaitu vai fiksētu apstiprinājuma/tīkla kļūmes tekstu.
Kolektora atbilžu pamatteksti, daļējas sekmes skaits un atbildes galvenes nekad netiek kopētas
kļūdās, žurnālos vai informācijas panelī. Neizdevusies vai daļēji pieņemta pakete netiek
apstiprināta: galamērķis ar šo statusu tiek rādīts kā Failing, kursors paliek pie pēdējās
apstiprinātās paketes, un nākamajā izpildē tiek atkārtoti nosūtītas tās pašas rindas.
Pastāvīgie statusi turpina izraisīt kļūmi, līdz kolektors vai konfigurācija tiek salabota.
Atbildes detalizētu informāciju skatiet paša kolektora žurnālos. Izsaukumu žurnāla kļūdu
kopsavilkumiem tiek saglabāta to atsevišķā rediģēšana.
`prepare()` neko neizveido; Test nosūta tieši `{"resourceSpans":[]}` un ziņo par HTTP statusu,
neierakstot izsaukumu žurnāla span.

Izsekošanas ID un span ID ir SHA-256 pirmie attiecīgi 32/16 heksadecimālie cipari, kas
aprēķināti pār
`"omniroute.trace\\0" + callLogId` un `"omniroute.span\\0" + callLogId`. Atkārtoti nosūtījumi
satur identiskus ID. Tā nav deduplikācijas garantija: dažas aizmugursistēmas, tostarp Langfuse
v4 ingestēšana, nededuplikē span ar vienādu ID. Avārija vai daļēja bloka kļūme var atkārtoti
nosūtīt ne vairāk kā vienu neapstiprināto kursora paketi; visa šī pakete var tikt dublēta,
nevis tikai tās pēdējais HTTP bloks. Izvēloties kursora paketes lielumu, ņemiet vērā šo
kompromisu.

### Langfuse piemērs

Konfigurējiet šos laukus pašmitinātai Langfuse instancei:

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

Lokāli izveidojiet Authorization vērtību kā literālās virknes `public-key:secret-key`
Base64 kodējumu (piemēram, ar `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Neievietojiet īstus akreditācijas datus žurnālos, ekrānuzņēmumos vai problēmu ziņojumos.
Pārveidošana automātiski iestata `x-langfuse-ingestion-version: 4`; Authorization joprojām tiek
norādīts `headers`. Gan galvenes, gan ģenerētās identitātes sāls izmanto esošo šifrētā slepenā
lauka mehānismu un API vietturus; nepieciešams `STORAGE_ENCRYPTION_KEY`.

Kartēšana pievieno ģenerēšanas tipu/modeli, JSON lietojuma detalizētu informāciju (ievades/izvades/kopējo
un pieejamās kešatmiņas atslēgas), JSON ievades/izvades momentuzņēmumus, ERROR/DEFAULT līmeni,
sanitizētu statusa ziņojumu, izsekošanas nosaukumu, sesijas ID, neobligātu vidi un filtrējamu
`langfuse.observation.metadata.<key>` pakalpojumu sniedzējam, pieprasītajam modelim, ceļam, kombinācijai, kešatmiņas
avotam un statusam. `langfuse.observation.completion_start_time` ir ISO 8601 vērtība
sākumā + TTFT tikai tad, ja TTFT ir zināms un ietilpst ilgumā. Izmaksu atribūti netiek nosūtīti.

Identitātes režīmi attiecas uz `langfuse.user.id`:

- `pseudonymous` (noklusējums): API atslēgas iekšējā ID HMAC-SHA256 ar nejaušu
  katram galamērķim paredzētu 32 baitu sāli. Sāls tiek ģenerēts izveides laikā, ja tā nav,
  šifrēts kā `identitySalt`, nekad netiek atgriezts un tiek saglabāts rediģēšanas laikā.
  Neapstrādāti atslēgu ID nekad netiek ievietoti izsekošanas atribūtos. Galamērķa sāls
  atkārtota izveide/rotācija maina identitātes.
- `keyName`: konfigurētais API atslēgas nosaukums, apzināti atklājot šo operatora apzīmējumu.
- `none`: lietotāja ID netiek izmantots. Sesijas tagi joprojām tiek eksportēti, ja tie ir
  pieejami; šie režīmi neanonimizē patvaļīgu uzvedņu saturu vai operatora nodrošinātās sesijas/korelācijas etiķetes.

### Sākšana bez iepriekšējo datu aizpildīšanas

Tikai izveides laikā iespējojiet **Sākt no pašreizējās pozīcijas (izlaist esošos žurnālus)** vai
izveides API lietderīgās slodzes augšējā līmenī nododiet
`startFromCurrentPosition: true`. Tas inicializē
`cursor_row_id` ar pašreizējo maksimālo saglabātā zvanu žurnāla rowid, izmantojot esošos kursora
palīgmehānismus, bez migrācijas. Noklusējuma vērtība ir false (kursors 0 un saglabātās vēstures
iepriekšēja aizpildīšana). Tas nav kursora atiestatīšanas iestatījums atjaunināšanas laikā.

Koplietojamā `ttftMs` pievienošana pievieno arī anulējamu `ttft_ms` kolonnu BigQuery kartētājam
un jaunas tabulas shēmai: shēmas tests pieprasa, lai katram kanoniskā ieraksta laukam būtu
kolonna. Esošās tabulas turpina eksportēt nemainītus datus: `prepare()` nolasa tabulas shēmu
un izlaiž tikai `ttft_ms`, ja šīs kolonnas nav. Pievienojiet anulējamu INT64 kolonnu, lai
saņemtu TTFT nākamajā izpildes reizē, vai izmantojiet jaunu tabulu. Neobligātā TTFT kolonna
neizraisa shēmas atjaunināšanu. Lietojuma pierādījumu kolonnas izmanto tālāk aprakstīto
nosacīto, pēc izvēles aktivizējamo saderības plūsmu; citi rindu lauki saglabā stingru shēmas pārbaudi.

---

## 6. Galamērķa pievienošana

1. Izveidojiet `src/lib/logExport/destinations/<name>.ts`, kas eksportē `LogExportDestinationType`:
   Zod `configSchema`, `fields` deskriptoru masīvu lietotāja saskarnei, `secretFields` un
   `createClient(config)`, kas atgriež `test()` / `prepare()` / `send(records)`.
2. Pievienojiet to `DESTINATIONS` masīvam failā `src/lib/logExport/registry.ts`.
3. Uzrakstiet testus direktorijā `tests/unit/`.

Tās ir visas izmaiņas: datu saglabāšana, cron uzdevums, REST slānis, slepeno datu šifrēšana un
vadības paneļa veidlapa izmanto reģistru.

Divi noteikumi jaunam galamērķim:

- `send()` **ir jāizmet izņēmums**, ja rodas daļēja kļūme. Veiksmīga izpilde nozīmē, ka “galamērķī ir šīs rindas”,
  un kursors tiek neatgriezeniski pārvietots aiz tām.
- Galamērķim, kas pieņem lietotāja norādītu URL, pirms pieprasījuma veikšanas tas ir jāvalidē, izmantojot
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  tāpat kā to dara tīmekļa aizķeres. BigQuery tas nav nepieciešams: tā resursdatori ir konstanti.

---

## 7. Darbināšana

- **Informācijas panelis**: Integrations → Log export. Pievienojiet mērķi, palaidiet **Testēt**, lai pārbaudītu akreditācijas datus
  bez rindu ierakstīšanas, pēc tam to iespējojiet.
- **Neapstrādāto datu uzkrājums**: katrā mērķa kartītē tiek rādītas neapstrādātās rindas un kursors; `GET
/api/log-export/status` atgriež tos pašus skaitļus, kā arī pēdējās 20 uzdevumu izpildes.
- **Viena neveiksmīga mērķa darbība neizraisa pārējo darbību neveiksmi** — izpildes kopsavilkumā
  katram mērķim tiek reģistrēts statuss laukos `last_status` / `last_error`, bet uzdevumu izpildes vēsturē tiek saglabāti apkopotie dati.
- **Dzēšot mērķi, tiek dzēsts arī tā kursors.** Pievienojot to no jauna, dati tiek sūtīti no senākā saglabātā
  zvanu žurnāla ieraksta, tādējādi atkārtoti nosūtot rindas, kas mērķī, iespējams, jau atrodas. BigQuery gadījumā katras rindas
  `insertId` to novērš tikai pašas BigQuery dublēšanās novēršanas logā, tāpēc mērķi ieteicams atspējot, nevis dzēst.

### Lietojuma pierādījumu shēmas saderība

Jaunas BigQuery tabulas ietver neobligātu `usage_evidence` (STRING, kas satur JSON) un
`usage_estimated` (BOOL). Ja ir iespējota `autoCreate`, esošai tabulai var pievienot
tikai šīs trūkstošās nulles vērtības pieļaujošās kolonnas. Eksportētājs saglabā visu esošo
shēmu, tostarp lauku metadatus, un, izmantojot atgriezto etag, nosūta nosacītu PATCH pieprasījumu. Vienlaicīgas
shēmas izmaiņas gadījumā eksports neizdodas, nevis pārraksta shēmu; nākamajā izpildē tabula tiek nolasīta atkārtoti.

Ja `autoCreate` ir atspējota, pirms ierakstu ar lietojuma pierādījumiem eksportēšanas šīs
kolonnas pievienojiet paši. Trūkstoši shēmas vai etag metadati, kā arī neveiksmīgs atjauninājums,
arī novērš ierakstu ar pierādījumiem ievietošanu. Eksporta kursors šādas neveiksmes gadījumā netiek pārvietots,
un pierādījumi nekad netiek klusi atmesti. Vietējā žurnālu saglabāšana joprojām tiek piemērota, kamēr eksports ir bloķēts,
tāpēc novērsiet kļūmi, pirms beidzas saglabāšanas periods avota rindām.
