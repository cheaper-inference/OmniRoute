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

- **Grafiks** — viens `JobRegistry` cron uzdevums, `log_export`, ar noklusējuma grafiku `0 * * * *` (reizi stundā,
  UTC). Reģistrēts failā `src/lib/initCloudSync.ts`; to var pārrakstīt ar `OMNIROUTE_LOG_EXPORT_CRON`.
  Katrā aktivizēšanas reizē secīgi tiek eksportēti visu **iespējoto** galamērķu gaidošie ieraksti.
- **Kursors** — SQLite netiešais `call_logs.rowid`, kas katram galamērķim tiek saglabāts laukā
  `log_export_destinations.cursor_row_id`. `timestamp` apzināti netiek izmantots kā kursors: izsaucēji
  var norādīt savu vērtību, tāpēc lēnu pieprasījumu var ierakstīt pēc ātrāka pieprasījuma, kas sākts
  vēlāk, un laikspiedola kursors to izlaistu.
- **Sadalīšana paketēs** — `batch_size` rindas katrā pieprasījumā (noklusējums: 500), `max_rows_per_run` rindas katrā izpildē
  (noklusējums: 10000), lai lielu uzkrājumu apstrādātu vairākās aktivizēšanas reizēs, nevis bloķētu vienu.
- **Piegāde** — kursors tiek virzīts uz priekšu tikai pēc sekmīgas `send()` izpildes. Ja paketes nosūtīšana neizdodas,
  kursors paliek iepriekšējā vietā, tāpēc tās pašas rindas tiek atkārtoti nosūtītas nākamajā izpildē. Garantija ir
  piegāde vismaz vienu reizi kopā ar dublikātu novēršanu galamērķī, nevis patiesa piegāde tieši vienu reizi: BigQuery katras
  rindas atslēgai izmanto izsaukumu žurnāla ID, ko tas ņem vērā iespēju robežās savā dublikātu novēršanas laika intervālā.
- **Aizsardzība pret pārklāšanos** — cron aktivizēšana un `POST .../run` var notikt vienlaikus. Galamērķis,
  kura ieraksti jau tiek eksportēti, tiek izlaists, nevis apstrādāts divreiz (`skipped: true` izpildes rezultātā),
  tāpēc vienlaicīga izpilde nevar atkārtoti nosūtīt paketi vai pārrakstīt kursoru ar mazāku vērtību.
- **Atkopšanās pēc pilnīgas dzēšanas** — ja `cursor_row_id` kļūst lielāks par `MAX(rowid)` (visa tabula ir
  iztīrīta un rowid vērtības sāktas no jauna), izpildītājs atiestata kursoru uz 0, nevis neatgriezeniski pārstāj pamanīt jaunus ierakstus.

### Izolēts izpildītājs un ierobežojumi

Katra galamērķa izpilde Node vidē palaiž atsevišķu, īslaicīgu operētājsistēmas bērnprocesu (`child_process`
ar IPC, nevis `worker_threads`). Pamattekstu lasīšana, datu satura JSON parsēšana/serializēšana, galamērķa
`prepare()` un galamērķa tīkla ievade/izvade notiek tajā, nevis servera notikumu ciklā.
Caur IPC tiek pārsūtīta tikai konfigurācija un nelieli progresa ziņojumi; eksportētie ieraksti nekad netiek atgriezti
serverī. Cron uzdevums un maršruts Palaist tūlīt saglabā to pašu publisko rezultātu un aizsardzību pret pārklāšanos.

Bērnprocess atver servera noteikto `DATA_DIR/storage.sqlite` tikai lasīšanai, izmantojot `node:sqlite`,
ar `busy_timeout=5000` un `query_only=ON`. Tas neimportē datubāzes vienīgo instanci un neveic
migrācijas, dublēšanu vai SQLite atjauninājumus. Trūkstošu/bojātu artefaktu uzskaite (tostarp
bojāta artefakta UPDATE) paliek tikai informācijas paneļa detalizētās informācijas apstrādes ceļā. Abos ceļos tiek izmantots kopīgs
detalizētās informācijas noteicējs bez blakusefektiem; eksportēšana izmanto asinhronu failu sistēmas lasīšanu un to pašu noteikšanas secību: artefakts → mantotais
iekļautais saturs → mantotais saturs diskā → nav. Izpildes sākumā tiek fiksēts maksimālais ievietoto rindu rowid,
kad bērnprocess atver lasītāju; vēlāk ievietotie ieraksti gaida nākamo izpildi. Tā ir ievietošanas
robeža, nevis ilgstoša SQLite transakcija: tīkla gaidīšanas laikā WAL rakstītāji un kontrolpunktu izveide netiek
bloķēti. Šī robeža nefiksē esošo rindu atjauninājumus/dzēšanu.

Pēc katras pieņemtās paketes bērnprocess gaida apstiprinājumu. Serveris vispirms saglabā
kursoru ar `advanceLogExportCursor`, pēc tam nosūta `ack`; nākamā pakete netiek sākta pirms tā saņemšanas.
Nosūtīšanas kļūmes, avārijas vai taimauta gadījumā tiek reģistrēta kļūme, nevirzot šīs paketes kursoru uz priekšu. Iepriekš
apstiprinātās paketes paliek saglabātas; atkārtoti var tikt nosūtīta ne vairāk kā viena neapstiprinātā pakete.
Sekmīgs rezultāts tiek reģistrēts tikai pēc `done` un bērnprocesa korektas iziešanas. Kļūmju gadījumā bērnprocess tiek apturēts
ar SIGTERM, pēc 500 ms pārejot uz SIGKILL, un izpildītājs gaida procesa aizvēršanu.

| Vides mainīgais                               | Noklusējums | Nolūks                                             |
| --------------------------------------------- | ----------- | -------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000      | Katra galamērķa kopējā izpildes laika ierobežojums |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024        | Bērnprocesa V8 old-space ierobežojums MB           |

Nederīgu, nepozitīvu vai neveselu vērtību vietā tiek izmantotas noklusējuma vērtības. Kaudzes iestatījums nav kopējās
RSS atmiņas ierobežojums; ļoti lielas paketes joprojām var izsmelt bērnprocesa atmiņu un droši pārtraukt izpildi ar kļūmi.
Noklusējuma 1024 MB atstāj rezervi noklusējuma 500 rindu paketei ar 512 KiB artefaktiem, ja
ir iespējoti pamatteksti, tostarp BigQuery JSON serializēšanai baitos ierobežotos blokos. Tas nepadara
10000 rindu paketi ar pamattekstiem drošu. V8 kaudzes izsmelšanas gadījumā tiek reģistrēta kļūme ar norādi uz risinājumu: samaziniet paketes
lielumu vai palieliniet `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kursors paliek pie pēdējās
apstiprinātās paketes. Uz vēsturiskajiem iekļautajiem vai diskā glabātajiem pamattekstiem mūsdienu artefaktu lieluma ierobežojums neattiecas.
Operatoriem RSS atmiņas apjoms jāplāno atsevišķi, īpaši konteineros ar ierobežotu atmiņu.

Pakārtotais process manto tikai atrisināto `DATA_DIR`, `NODE_ENV`, skaidri norādīto `TZ` (mantoto failu nosaukumu
vietējā laika noteikšanai), `ELECTRON_RUN_AS_NODE`, ja tas ir iestatīts, un tālāk norādītos izejošo savienojumu parametrus:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (un to formas ar mazajiem burtiem),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Globālais Undici dispečers izmanto tos pašus servera starpniekservera noteikšanas noteikumus, kuru pamatā ir tikai vides mainīgie, un lokālo resursdatoru
apiešanas noteikumus, tostarp `NO_PROXY`; tas neimportē `proxyFetch.ts` vai tā datubāzes/funkciju karodziņus.
Starpniekservera akreditācijas dati tiek aizklāti pārsūtītajā izvadē un reģistrētajās kļūdās. Galamērķa akreditācijas dati
tiek nosūtīti tikai vienā sākuma IPC ziņojumā, nekad argv vai vides mainīgajos; pārsūtītajai izvadei un kļūdām tiek
pievienots prefikss, un tās tiek attīrītas. Pakārtotā procesa izpildes argumentos tiek atspējots tikai `ExperimentalWarning`, lai
katrā cron izpildē neatkārtotu Node brīdinājumu par SQLite; citu veidu brīdinājumi paliek redzami.

Galamērķa moduļiem jābūt importējamiem bez Next.js/servera puses atkarībām. Esošā
BigQuery realizācija jau atbilst šai prasībai. Piekļuves pilnvaru kešatmiņas pastāv tikai pakārtotā procesa
izpildes laikā, nevis starp izpildēm. Atbalstītā izpildvide ir Node (`package.json` engines), taču README Bun
instalēšanas sadaļa un `Dockerfile.bun` piedāvā arī ar produkcijas vidi saderīgu risinājumu, izmantojot
`bun:sqlite` (`src/lib/db/core.ts` / adapteri). Tāpēc Bun vidē eksportēšana saglabā iepriekšējo
izpildi tajā pašā procesā un vienreiz parāda brīdinājumu: pakārtotā procesa dinamiskās atmiņas/taimauta izolācija nav pieejama. Izmantojiet
Node notikumu cikla un atmiņas izsīkuma (OOM) izolācijai; Bun šeit netiek uzskatīts par paredzētu tikai izstrādei.

Ja ir iespējots `includeBodies`, ieteicams izmantot intervālu minūšu līmenī, piemēram,
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, nevis uzkrāt stundas laikā sakrājušos datu apjomu.
Pakešu un rindu ierobežojumi joprojām ierobežo katru izpildi. Procesa palaišanas izmaksas rodas katram galamērķim katrā izpildē;
nelielas palaišanas izmaksas tiek apmainītas pret servera notikumu cikla izolāciju, nevis mazāku kopējo CPU lietojumu.

### Datu saturs (uzvednes un ģenerētās atbildes)

Pēc noklusējuma eksportā ir tikai tie kopsavilkuma lauki, kas redzami žurnālu **sarakstā**. Iespējojot
**Eksportēt uzvednes un atbildes** (`includeBodies`), papildus tiek nosūtīts tas, kas katram izsaukumam redzams žurnālu **detalizētās informācijas**
panelī:

| Lauks                            | Ko tas satur                                                              |
| -------------------------------- | ------------------------------------------------------------------------- |
| `request_body` / `response_body` | Izsaukuma dati tā, kā tos attēlo informācijas panelis                     |
| `pipeline_route_decision`        | Maršrutētāja izvēlētais mērķis un modelis                                 |
| `pipeline_client_request`        | Neapstrādāts pieprasījums tieši tāds, kā to nosūtīja klients              |
| `pipeline_openai_request`        | Pēc pārveidošanas iekšējā OpenAI formātā                                  |
| `pipeline_provider_request`      | Faktiski pakalpojuma sniedzējam nosūtītais pieprasījums tā formātā        |
| `pipeline_provider_response`     | Neapstrādāta pakalpojuma sniedzēja atbilde                                |
| `pipeline_client_response`       | Izsaucējam atgrieztie dati                                                |
| `pipeline_error`                 | Apstrādes konveijera līmeņa kļūdas informācija par neveiksmīgu izsaukumu  |
| `bodies_truncated`               | Patiess, ja kāds no iepriekš minētajiem laukiem sasniedzis `maxBodyBytes` |

Tas ir uzvedņu saturs, tāpēc šī iespēja ir **pēc noklusējuma izslēgta** un apzināti tiek izvēlēta katram galamērķim atsevišķi.
Tiek nosūtīts tas, kas redzams informācijas panelī, jo eksportēšana un `getCallLogById` izmanto vienu un to pašu detalizētās informācijas
iegūšanas mehānismu: datos
personu identificējošā informācija jau ir attīrīta un noslēpumi aizklāti to ierakstīšanas brīdī, savukārt izsaukums ar
`noLog` API atslēgu nesaglabā nekādu datu saturu, tāpēc nav ko eksportēt.

Datu saturs katrai rindai tiek nolasīts no failu sistēmas artefakta, tāpēc datu ielāde notiek tikai tiem galamērķiem,
kas to pieprasījuši. Ja artefakta nav vai tas ir bojāts, tiek eksportēts tā kopsavilkums ar null vērtībām datu satura vietā, nevis
pārtraukta visas paketes apstrāde un apturēta kursora virzība.

`maxBodyBytes` (noklusējums 262144) ierobežo katra lauka lielumu. Garāks datu saturs tiek **saīsināts, nevis
atmests** — arī apgriezta uzvedne joprojām atbild uz jautājumu “kas tika vaicāts” — un rinda tiek atzīmēta ar
`bodies_truncated`. Straumēto fragmentu secīgās izmaiņas netiek eksportētas; apkopotā atbilde
jau ir ietverta `pipeline_provider_response` un `pipeline_client_response`.

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
