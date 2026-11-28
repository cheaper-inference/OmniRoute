# Log export (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Nuolatinis, prieauginis „OmniRoute“ iškvietimų žurnalų eksportas į išorinę analitikos saugyklą.

Valdymo skydelio žurnalų skirtuke užklausų istorija saugoma SQLite (`call_logs`), o jos apimtį riboja
rotacija ir saugojimo trukmė. Žurnalų eksportas pagal tvarkaraštį išsiunčia tą patį įrašų rinkinį, kad jis išliktų
ilgiau nei vietinė duomenų bazė ir jį būtų galima sujungti su kitais duomenimis. „BigQuery“ yra pirmoji paskirties vieta;
konvejeris pagrįstas registru, todėl daugiau paskirties vietų galima pridėti nekeičiant esamų.

---

## 1. Kaip tai veikia

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Tvarkaraštis** — vienas `JobRegistry` cron darbas, `log_export`, pagal nutylėjimą `0 * * * *` (valandinis, UTC). Registruotas `src/lib/initCloudSync.ts`; nepaisoma su `OMNIROUTE_LOG_EXPORT_CRON`. Kiekviena erkė nusausina kiekvieną** įjungta** paskirties vietą, nuosekliai.
- **Cursor** — SQLite numanomas `call_logs.rowid`, išliko kiekvienai paskirties vietai `log_export_destinations.cursor_row_id`. `timestamp` sąmoningai nėra žymeklis: skambinantieji gali pateikti savo vertę, todėl lėtą užklausą galima parašyti po greitesnės, kuri prasidėjo vėliau, o laiko žymeklis ją praleis.
- **Pakavimas** — `batch_size` eilučių vienai užklausai (numatytasis 500), `max_rows_per_run` eilučių per paleidimą (numatytasis 10 000), todėl didelis atsilikimas nuteka per kelias žymes, o ne blokuoja vieną.
- **Pristatymas** — žymeklis juda į priekį tik `send()` išsprendus. Nepavykusi partija palieka žymeklį ten, kur buvo, todėl tos pačios eilutės bandomos iš naujo kitą kartą. Garantija yra bent vieną kartą ir paskirties pusės dubliavimo panaikinimas, o ne tiksliai vieną kartą: BigQuery kiekvieną eilutę įveda pagal skambučių žurnalo ID, kurį ji laikosi maksimaliai išnaudodama savo dedup lange.
- **Persidengimo apsauga** — cron tick ir `POST .../run` gali šaudyti kartu. Paskirties vieta, kuri jau išleidžiama, yra praleidžiama, o ne du kartus ištuštinama (paleidimo rezultate `skipped: true` ), todėl vienu metu vykstantis paleidimas negali iš naujo išsiųsti paketo arba įrašyti žymeklio atgal.
- **Išvalymo atkūrimas** — jei `cursor_row_id` atsiduria aukščiau `MAX(rowid)` (visa lentelė buvo išvalyta, o eilutės paleidžiamos iš naujo), bėgikas atsukamas į 0, o ne visam laikui apakinamas.

### Izoliuotas bėgikas ir ribos

Kiekviena paskirties vieta, vykdoma mazge, pradeda atskirą trumpalaikį OS antrinį procesą (`child_process` su IPC, o ne `worker_threads`). Turinys nuskaito, naudingoji apkrova JSON parsing/serialization, paskirties `prepare()` ir paskirties tinklas I/O veikia ten, o ne serverio įvykių cikle. Tik konfigūracijos ir nedidelio progreso pranešimai kerta IPC; eksportuoti įrašai niekada negrįžta į serverį. „Cron“ užduotis ir „Vykdyti dabar“ maršrutas išlaiko tą patį viešą rezultatą ir sutapimo apsaugą.

Vaikas atidaro serverio išspręstą `DATA_DIR/storage.sqlite` tik skaitomą naudodamas `node:sqlite`, su `busy_timeout=5000` ir `query_only=ON`. Jis neimportuoja DB singleton ir neatlieka perkėlimo, atsarginių kopijų ar SQLite atnaujinimų. Missing/corrupt artefaktų buhalterija (įskaitant sugadintą artefaktą UPDATE) lieka tik prietaisų skydelio išsamios informacijos kelyje. Abu kelius dalijasi grynas detalių sprendimas; eksportas naudoja asinchroninį failų sistemos nuskaitymą ir tą patį artefaktą → legacy inline → legacy disk → none rezoliucijos tvarka. Vykdant momentines nuotraukas, kai vaikas atidaro skaitytuvą, didžiausia įterpimo eilutė; vėlesni įdėklai laukia kito paleidimo. Tai yra įterpimo riba, o ne ilgalaikė SQLite operacija: WAL rašikliai ir kontroliniai taškai lieka laisvi tinklo laukimo metu. Updates/deletions esamų eilučių nėra užšaldytos prie šios ribos.

Po kiekvienos priimtos partijos vaikas laukia patvirtinimo. Serveris pirmiausia išlaiko žymeklį su `advanceLogExportCursor`, tada siunčia `ack`; jokia kita partija neprasideda prieš tai. Siuntimo nesėkmė, strigtis arba skirtasis laikas įrašo nesėkmę neperkėlus šios partijos. Anksčiau pripažintos partijos lieka įsipareigojusios; daugiausia galima pakartotinai išsiųsti vieną nepatvirtintą siuntą. Sėkmė fiksuojama tik po `done` ir švaraus vaiko išėjimo. Gedimai nutraukia vaiko funkciją SIGTERM, po 500 ms didėja iki SIGKILL, o bėgikas laukia proceso uždarymo.

| Aplinkos kintamasis                           | Numatytoji | Tikslas                                                |
| --------------------------------------------- | ---------- | ------------------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000     | Sieninio laikrodžio apribojimas pagal paskirties vietą |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024       | Vaiko V8 senos erdvės apribojimas MB                   |

Invalid/non-positive/non-integer reikšmės naudoja numatytuosius nustatymus. Krūvos nustatymas nėra bendra RSS riba; labai didelės partijos vis tiek gali išsekti vaiko atmintį ir saugiai nepavykti bėgti. Numatytasis 1024 MB palieka vietos numatytajam 500 eilučių 512 KiB artefaktų paketui su įgalintais korpusais, įskaitant BigQuery baitais suskirstytą JSON serializavimą. Dėl to 10 000 eilučių kėbulų partijos nėra saugios. V8 krūvos išnaudojimas įrašo gedimą, dėl kurio galima imtis veiksmų: sumažinkite partijos dydį arba padidinkite `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; žymeklis lieka prie paskutinės patvirtintos partijos. Šiuolaikinis artefaktų dangtelis neuždengia istorinių inline/disk kūnų. Operatoriai turi skirti RSS biudžetą atskirai, ypač ribotos atminties talpyklose.

Vaikas paveldi tik išspręstą `DATA_DIR`, `NODE_ENV`, aiškią `TZ` (senas failo pavadinimo vietos laiko skiriamoji geba), `ELECTRON_RUN_AS_NODE`, kai yra, ir šias išeinančias `SSL_CERT_DIR`: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (ir jų mažąsias formas), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS` `SSL_CERT_FILE` Pasaulinis Undici dispečeris dalijasi gryna serverio aplinkos tarpinio serverio skiriamąja geba ir vietinio pagrindinio kompiuterio apėjimo taisyklėmis, įskaitant `NO_PROXY`; jis neimportuoja `proxyFetch.ts` ar jo DB/feature vėliavėlių. Tarpinio serverio kredencialai pašalinami iš persiųstos išvesties ir įrašytų klaidų. Paskirties kredencialai keliauja tik vienu pradžios IPC pranešimu, niekada argv ar aplinkos; output/error persiuntimas yra su priešdėliu ir išvalytas. Tik `ExperimentalWarning` yra išjungtas antriniuose exec argumentuose, kad būtų išvengta mazgo SQLite įspėjimo kartojimo kiekvieną kartą vykdant cron; kiti įspėjimų tipai lieka matomi.

Paskirties moduliai turi būti importuojami be Next.js/server-only priklausomybių. Esamas BigQuery diegimas jau atitinka tą sutartį. Prieigos prieigos raktų talpyklos galioja tik antriniam bėgimui, o ne skersai. Mazgas yra palaikomas vykdymo laikas (`package.json` varikliai). Egzistuoja geriausias nepalaikomas Bun suderinamumo kelias (`bun:sqlite` `src/lib/db/core.ts` / adapteriuose ir `Dockerfile.bun`), todėl eksportavimas neturi nutrūkti. Pagal Bun eksportuojant išlaikomas ankstesnis proceso kelias ir pateikiamas vienkartinis įspėjimas: vaiko heap/timeout izoliacija nepasiekiama. Naudokite mazgą įvykių ciklo ir OOM izoliacijai.

Kai `includeBodies` įjungtas, pirmenybę teikite minutės ritmui, pvz., `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` o ne valandinio naudingojo krovinio atsilikimo kaupimui. Paketų ir eilučių ribos vis dar riboja kiekvieną paleidimą. Proceso paleidimas apmokamas pagal paskirties vietą už paleidimą; Tai sumažina serverio įvykių ciklo izoliavimo paleidimo išlaidas, o ne sumažina bendrą CPU naudojimą.

### Naudingi kroviniai (raginimai ir užbaigimai)

Pagal numatytuosius nustatymus eksportuojant yra tik suvestinės laukai žurnalai** sąrašą** rodo. Įsijungia** Eksportuokite raginimus ir atsakymus** (`includeBodies`) papildomai siunčia ką Rąstai** detalė** kiekvienam skambučiui rodoma sritis:

| Laukas                           | Kas jame telpa                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Skambučių naudingoji apkrova atliekama taip, kaip juos pateikia prietaisų skydelis |
| `pipeline_route_decision`        | Kurį tikslą ir modelį pasirinko maršrutizatorius                                   |
| `pipeline_client_request`        | Neapdorota užklausa tiksliai tokia, kokia ją išsiuntė klientas                     |
| `pipeline_openai_request`        | Po vertimo į vidinę OpenAI formą                                                   |
| `pipeline_provider_request`      | Kaip iš tikrųjų išsiųsta prieš srovę, teikėjo tarme                                |
| `pipeline_provider_response`     | Neapdorotas atsakas prieš srovę                                                    |
| `pipeline_client_response`       | Kas buvo grąžinta skambinančiajam                                                  |
| `pipeline_error`                 | Dujotiekio lygio klaidos informacija dėl nepavykusio skambučio                     |
| `bodies_truncated`               | Tiesa, kai bet kuris aukščiau esantis laukas pasiekia `maxBodyBytes`               |

Tai greitas turinys, taip ir yra** išjungtas pagal numatytuosius nustatymus** ir sąmoningai pasirinkta pagal paskirties vietą. Tai, ką rodo prietaisų skydelis, nes eksportas ir `getCallLogById` dalijasi detalių raiška: naudingi kroviniai jau yra išvalyti iš PII ir slaptai redaguoti juos parašius, o skambinant naudojant `noLog` API raktą naudingos apkrovos nėra išsaugomos, todėl nėra ką eksportuoti.

Naudingi kroviniai nuskaitomi kiekvienoje eilutėje iš failų sistemos artefakto, todėl hidratacija vykdoma tik tose paskirties vietose, kurios to paprašė. Trūkstamas arba sugadintas objektas eksportuoja savo suvestinę su nulinėmis naudingosiomis apkrovomis, o ne sugenda paketą ir perkelia žymeklį.

`maxBodyBytes` (numatytasis 262144) kiekviename lauke yra didžiosios raidės. Ilgesnės naudingosios apkrovos yra** sutrumpintas, o ne numestas** — nukirptas raginimas vis tiek atsako "ko buvo paklausta" — ir eilutė pažymėta `bodies_truncated`. Srautinio perdavimo gabalas po gabalo deltos neeksportuojamos; surinktas atsakymas jau yra `pipeline_provider_response` ir `pipeline_client_response`.

---

## 2. Failai

| Dalis                                      | Vieta                                        |
| ------------------------------------------ | -------------------------------------------- |
| Paskirties sutartis                        | `src/lib/logExport/types.ts`                 |
| Registras                                  | `src/lib/logExport/registry.ts`              |
| Slaptųjų duomenų tvarkymas                 | `src/lib/logExport/secrets.ts`               |
| Vykdyklė (pirminio proceso IPC)            | `src/lib/logExport/runner.ts`                |
| Proceso gyvavimo ciklas                    | `src/lib/logExport/childRunner.ts`           |
| Antrinio proceso įėjimo taškas             | `src/lib/logExport/exportChild.ts`           |
| Atvėrimas tik skaityti                     | `src/lib/db/logExportReadOnly.ts`            |
| Bendra užklausa ir susiejimas              | `src/lib/usage/callLogExportQueries.ts`      |
| Išsamios informacijos nustatymas           | `src/lib/usage/callLogDetailResolver.ts`     |
| API projekcija                             | `src/lib/logExport/presenter.ts`             |
| BigQuery paskirtis                         | `src/lib/logExport/destinations/bigquery.ts` |
| Google paslaugos paskyros autentifikavimas | `src/lib/logExport/googleServiceAccount.ts`  |
| Iškvietimų žurnalo šaltinis                | `src/lib/usage/callLogExportSource.ts`       |
| Duomenų išsaugojimas                       | `src/lib/db/logExportDestinations.ts`        |
| Cron užduotis                              | `src/lib/jobs/logExportJob.ts`               |
| REST sluoksnis                             | `src/app/api/log-export/`                    |
| Valdymo skydelio puslapis                  | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Visiems maršrutams taikomas valdymo autentifikavimas (`requireManagementAuth`). Slaptieji duomenys niekada negrąžinami:
išsaugota slaptoji reikšmė grąžinama kaip literalas `__stored__`, o atnaujinant atsiuntus šią reikšmę
išsaugomi esami prisijungimo duomenys.

Kuriant arba atnaujinant paskirtį, kurios tipas deklaruoja slaptąją reikšmę, **būtinas
`STORAGE_ENCRYPTION_KEY`**. Be jo `encrypt()` nepastebimai perduoda duomenis jų nekeisdama, todėl įrašymas
atmetamas su 400 kodu, užuot įrašius prisijungimo duomenis į SQLite atviruoju tekstu (tokia pati apsauga
taikoma Telegram webhook).

| Metodas  | Kelias                                   | Paskirtis                                                                            |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Paskirčių tipai ir jų konfigūracijos laukų sąrašas                                   |
| `GET`    | `/api/log-export/destinations`           | Paskirčių sąrašas (slaptieji duomenys paslėpti)                                      |
| `POST`   | `/api/log-export/destinations`           | Sukurti paskirtį                                                                     |
| `GET`    | `/api/log-export/destinations/{id}`      | Nuskaityti vieną paskirtį                                                            |
| `PUT`    | `/api/log-export/destinations/{id}`      | Atnaujinti pavadinimą / įjungimo būseną / konfigūraciją / skaidymą į paketus         |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ištrinti                                                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | Patikrinti prisijungimo duomenis nieko neįrašant                                     |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Eksportuoti susikaupusius duomenis dabar tuo pačiu būdu kaip suplanuoto vykdymo metu |
| `GET`    | `/api/log-export/status`                 | Cron būsena, naujausi vykdymai, kiekvienos paskirties laukiančių duomenų kiekis      |

`GET /api/log-export/types` leidžia naudoti universalią naudotojo sąsają: valdymo skydelio forma atvaizduojama pagal
grąžintus laukų aprašus, todėl pridėjus naują paskirtį nereikia keisti naudotojo sąsajos.

---

## 4. BigQuery paskirties vieta

Konfigūracijos raktai (`type: "bigquery"`):

| Raktas               | Pastabos                                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP projektas, kuriame yra duomenų rinkinys                                                                                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                                              |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                                              |
| `location`           | Naudojama tik tada, kai reikia sukurti duomenų rinkinį (numatytoji reikšmė `EU`)                                                             |
| `serviceAccountJson` | Paslaugos paskyros raktas. Paslaptis: ramybės būsenoje šifruojamas, niekada negrąžinamas                                                     |
| `autoCreate`         | Sukurti trūkstamą duomenų rinkinį / lentelę; sąlygiškai pridėti nuliui leidžiančius naudojimo įrodymų stulpelius (numatytoji reikšmė `true`) |

Paslaugos paskyrai tikslinėje lentelėje reikia `bigquery.tables.updateData`, taip pat
`bigquery.datasets.create` / `bigquery.tables.create`, kai įjungta `autoCreate`.
Atnaujinant esamą lentelę ir pridedant du nuliui leidžiančius naudojimo įrodymų laukus, taip pat reikia
`bigquery.tables.update`. Trūkstamas leidimas nutraukia eksportą neperkeliant jo žymeklio.

Sukonfigūruota grupė yra **žymeklio**, o ne HTTP vienetas: `send()` suskaido ją į insertAll
iškvietimus, kuriuose yra ne daugiau kaip 500 eilučių, todėl didelė `batch_size` reikšmė negali viršyti BigQuery 10 MB užklausos ribos.
Laikinos būsenos (408/429/500/502/503/504) bandomos dar kartą iki trijų kartų, naudojant eksponentinį
delsimą ir tuos pačius insertIds; autentifikavimo ir schemos klaidos išmetamos jau per pirmą bandymą,
užuot eikvojus paleidimą.

Ką tik sukurta lentelė dar nebūna matoma srautinio perdavimo galiniam taškui, kuris kelias
sekundes grąžina 404. Šis 404 bandomas dar kartą, tačiau **tik tada, kai lentelę sukūrė šis paleidimas** —
iš tikrųjų trūkstama lentelė vis tiek sukelia neatidėliotiną klaidą. Atkreipkite dėmesį, kad
atkūrus lentelę tuo pačiu pavadinimu, kai ji neseniai buvo ištrinta, BigQuery kelias minutes atsisako
srautinių įterpimų; tai yra ištrynimo ir atkūrimo ypatybė, todėl verčiau naudokite naują lentelės
pavadinimą, o ne ištrinkite ir pridėkite lentelę iš naujo.

**Dalinė klaida gaunama kaip HTTP 200 su netuščiu `insertErrors[]`.** Tai laikoma
klaida ir išmetama; būtent taip neleidžiama žymekliui pereiti už eilučių, kurių BigQuery
nepriėmė; `tests/unit/log-export-bigquery.test.ts` užfiksuoja tokį elgesį.

Transportas yra paprastas REST — savarankiškai pasirašytas RS256 teiginys iškeičiamas į prieigos
žetoną adresu `https://oauth2.googleapis.com/token`, tada eilutės siunčiamos į `tabledata.insertAll`.
Joks Google SDK neįtraukiamas. Prieigos žetonai proceso metu talpinami pagal (paslaugos paskyrą, sritį).

Sukurtoje lentelėje yra po vieną stulpelį kiekvienam žurnalo kortelės laukui ir `exported_at`, o jos
struktūra pritaikyta tam, kaip iš tikrųjų atliekamos iškvietimų žurnalų užklausos:

- **Dienomis skaidoma pagal `timestamp`**, todėl pagal datą apribota užklausa nuskaito tik tas dienas.
- **Sugrupuota pagal `api_key_name`, `provider`, `model`, `status`** (būtent tokia tvarka), todėl filtravimas pagal
  tai, kas ją vykdė, kur ji buvo nukreipta arba ar nepavyko, pašalina blokus kiekviename skaidinyje. BigQuery
  leidžia daugiausia keturis grupavimo stulpelius, o jų tvarka svarbi: filtras tik pagal `api_key_name`
  pašalina blokus, o filtras tik pagal `status` — ne.
- **Pasirenkamas skaidinių saugojimo laikotarpis** per `partitionExpirationDays` (0 reiškia, kad saugoma viskas), taikomas
  kuriant lentelę.

Abu nustatymai taikomi kūrimo metu. Esama lentelė išlaiko jau turimą struktūrą, todėl
nurodykite naują lentelės ID paskirties vietoje, jei norite juos pritaikyti.

`tests/unit/log-export-bigquery.test.ts` užtikrina, kad atvaizdavimo funkcija ir lentelės schema išliktų
sinchronizuotos, todėl naujas iškvietimų žurnalo stulpelis negali būti tyliai praleistas siunčiant duomenis.

Grupės skaidomos pagal **eilučių skaičių ir serializuotų baitų skaičių**. Vien eilučių skaičiaus nepakanka,
kai eksportuojami naudingojo turinio duomenys: 500 eilučių su užklausų tekstais gali užimti dešimtis megabaitų, o insertAll
atmeta didesnę nei 10 MB užklausą. Grupės baigiamos ties 500 eilučių arba 9 MB riba — priklausomai nuo to, kuri pasiekiama pirmiau.

---

## 5. OTLP/HTTP pėdsakų paskirties vieta

Konfigūracijoje naudojama `type: "otlp-http"`. Tai yra suplanuotas, žymekliu paremtas
išsaugotų skambučių žurnalų eksportavimas, o ne geriausiomis pastangomis veikiantis tiesioginis
maršrutizavimo įvykių imtuvas faile
`open-sse/services/routing/otel.ts`. Jis neskaito ir nekeičia šio imtuvo aplinkos
kintamųjų, laikmačių ar buferių. Įjungus abu, gali būti sukuriamos dvi nepriklausomos
pėdsakų rūšys; naudokite `omniroute.log-export` instrumentavimo sritį, kad atskirtumėte šiuos skambučių žurnalo pėdsakus.

| Raktas                   | Numatytoji reikšmė / paskirtis                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `endpoint`               | Privalomas visas HTTP(S) pėdsakų URL; priesaga `/v1/traces` nepridedama                                          |
| `headers`                | Pasirinktinės `Name: value` eilutės arba eilučių JSON objektas; užšifruojama                                     |
| `requestHeaderAllowlist` | Tuščia (išjungta); kliento antraščių pavadinimai / priešdėliai, kuriuos reikia užfiksuoti kaip pėdsakų atributus |
| `serviceName`            | `omniroute`; išteklius `service.name`                                                                            |
| `langfuseMapping`        | `false`; prideda Langfuse generavimo / seanso / naudotojo atributus                                              |
| `identity`               | `pseudonymous`, `keyName` arba `none`                                                                            |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                                          |
| `timeoutMs`              | `30000` kiekvienam HTTP bandymui                                                                                 |
| `environment`            | Nenustatyta; pasirinktinis `langfuse.environment`                                                                |

Bendra prietaisų skydelė atvaizduoja šiuos laukus. `paths` priima API masyvą arba
teksto lauką, kuriame tikslūs keliai atskirti naujomis eilutėmis / kableliais. Įterpimai, perrikiavimas
ir kiti keliai praleidžiami, nebent būtų aiškiai leisti. Praleistos eilutės vis tiek perkelia žymeklį į priekį;
esamo vykdyklės `exported` / `exportedTotal` skaitikliai skaičiuoja apdorotas šaltinio eilutes, įskaitant filtruotas,
o ne priimtus pėdsakus. Filtravimas atliekamas antriniame procese, nekeičiant jo IPC / žymeklio sutarties.

URL tikrinimui naudojamas nuo DB nepriklausantis `parseAndValidateNonMetadataUrl` pagalbinis įrankis iš
`src/shared/network/outboundUrlGuard.ts`: `block-metadata` politika. Ji atlieka tuos pačius
besąlyginius metaduomenų / protokolo / įterptų kredencialų patikrinimus kaip ir saityno kabliuko tikrintuvas,
tačiau privatūs URL leidžiami, todėl nereikalingas visuotinis funkcijos vėliavėlės perrašymas. Tai leidžia naudoti
savarankiškai talpinamus Langfuse, Phoenix, Tempo ir Collector galinius taškus, įskaitant privačius HTTP galinius taškus.
Debesijos metaduomenų pagrindiniai kompiuteriai visada blokuojami. Peradresavimai nevykdomi, todėl kolektorius negali
peradresuoti kredencialų į kitą pagrindinį kompiuterį. Kaip ir esamas leksinis URL apsaugos mechanizmas, šis mechanizmas
nepririša DNS skyrimo; konfigūruokite tik operatoriaus valdomus pagrindinius kompiuterius. Kai galinis taškas nėra
patikimame tinkle, pirmenybę teikite HTTPS.

### Naudingieji duomenys ir pristatymas

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) perduoda vieną
CLIENT pėdsaką kiekvienai leidžiamai eilutei; pėdsakas pavadinamas tiksliu užklausos keliu. Kelio pavadinimas
atskiria Chat Completions, Responses ir Messages, neįterpdamas modelio ar tapatybės duomenų į pėdsako pavadinimą.
Ištekliaus atributai apima `service.name` ir paketo `service.version`.

Įprastas pokalbio bandymo registratorius (`open-sse/handlers/chatCore/attemptLogging.ts`) užbaigiant įrašo
`duration = Date.now() - startTime` ir nepateikia laiko žymos;
`saveCallLogOperation` faile `src/lib/usage/callLogs.ts` pagal numatytuosius nustatymus nustato laiko žymą įrašymo
(užbaigimo) metu. Todėl eksportuojant pabaigos laikas nustatomas pagal eilutės laiko žymą, o pradžios laikas yra pabaiga
minus trukmė (milisekundės konvertuojamos į dešimtaines nanosekundes). Skambinančiojo pateiktos istorinės laiko žymos
taip pat išsaugomos kaip pabaigos laikas; nėra atskiro kiekvienos eilutės pradžios / užbaigimo indikatoriaus.
Nulinė trukmė paverčiama nuliu. Dėl netinkamų arba trūkstamų laiko žymų paketas atmetamas, o ne sukuriami
nedeterministiniai pėdsakai. `ttftMs` gali būti nulinis ir susiejamas su `omniroute.ttft_ms`.

Atributai apima `gen_ai.operation.name="chat"`, teikėją, prašomą / atsako modelį,
įvesties / išvesties žetonus, pasirinktinius talpyklos skaitymo / kūrimo / samprotavimo žetonus, HTTP būseną,
derinį, talpyklos šaltinį, seanso žymą ir koreliacijos ID. Sveikieji OTLP dydžiai ir laiko žymos pateikiami
dešimtainėmis eilutėmis; eilutės, loginės reikšmės ir trupmeniniai skaičiai naudoja savo vietinius OTLP reikšmių
variantus. Klaidos pėdsakų būsena yra ERROR, o būsenos pranešimas – išvalytas. Kanoniniame įraše nėra pradinio
pagrindinio kompiuterio URL, todėl `server.address` praleidžiamas, užuot neteisingai nurodžius kolektorių kaip
modelio serverį. Kaina neeksportuojama.

Tik `includeBodies=true` įkelia turinį. Kai `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` perduoda išvalytą užklausos / atsako
kūno JSON, saugomą OmniRoute (jei galima išanalizuoti, jis kanonikalizuojamas), o ne iš naujo suformuotą semconv
pranešimų masyvą. Sutrumpinti / ne JSON formatu esantys kūnai lieka neapdorotu tekstu. Kai
`langfuseMapping=true`, kūnai siunčiami tik kaip `langfuse.observation.input` / `langfuse.observation.output`;
`gen_ai.*.messages` atributai praleidžiami, kad kiekvienas kūnas būtų siunčiamas vieną kartą. Abu režimai paveldi
`maxBodyBytes` iš esamo įkėlimo kelio;
`omniroute.bodies_truncated=true` nurodo apkarpymą.
Ši paskirties vieta neprideda papildomų konvejerio momentinių kopijų ar nevalytų artefaktų skaitymų;
pasirinktinis užklausos antraščių fiksavimas naudoja esamą įkeltą kliento momentinę kopiją, aprašytą toliau.
Eksportuojant kūnus naudokite minučių tikslumo periodiškumą, pavyzdžiui,
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, o ne kaupkite valandinį atsilikusių įrašų kiekį.

### Pasirinktinės kliento užklausos antraštės

Antraščių fiksavimas pagal numatytuosius nustatymus yra **išjungtas**. Paskirties vietos konfigūracijoje nustatykite
`requestHeaderAllowlist` ir įjunkite **Eksportuoti raginimus ir atsakus**
(`includeBodies: true` paskirties vietoje). Leidžiamų reikšmių sąrašas priima API masyvą arba teksto lauką,
kuriame pavadinimai atskirti naujomis eilutėmis / kableliais:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Pavadinimai sutampa nepaisant raidžių registro ir turi sutapti tiksliai, nebent viena pabaigoje esanti `*` parenka netuščio
antraštės pavadinimo prefiksą. Vienišas `*`, įterptiniai pakaitos simboliai ir netinkami HTTP antraščių pavadinimai atmetami.
Yra ne daugiau kaip 64 parinkikliai, kiekvieno jų pavadinimas arba prefiksas gali būti ne ilgesnis nei 256 ASCII baitai.
Šis nustatymas yra atskiras nuo `headers`, kuris autentifikuoja eksportuotoją kolektoriuje.

Fiksavimas skaito tik `pipeline_client_request`, užpildomą iš išsaugoto išsamaus srauto `clientRawRequest`
(arba senojo `clientRequest`). Jis niekada nenaudoja teikėjo užklausos antraščių kaip atsarginio šaltinio.
Įrašant užklausą turi būti įjungtas išsamus srauto žurnalų registravimas. Kai `includeBodies` išjungtas arba
trūksta kliento momentinės kopijos JSON, ji sugadinta ar sutrumpinta, antraščių atributai nesukuriami.
Padidinus `maxBodyBytes` galima išvengti momentinės kopijos sutrumpinimo eksportavimo metu;
tai negali atkurti išsamios informacijos, kuri niekada nebuvo išsaugota. Didesnė nei 1 MiB momentinė kopija
arba momentinė kopija, kurioje yra daugiau nei 256 antraščių įrašai, ignoruojama. Esamas raginimo / atsakymo
eksportavimas lieka įjungtas kartu su antraščių fiksavimu; leidžiamų sąrašas nesuteikia tik antraštėms skirto
duomenų papildymo režimo.

Pasirinktos reikšmės tampa `http.request.header.<full lowercase header name>` OTLP eilučių masyvais,
net jei yra tik viena eilutė. Pavyzdžiui, `X-OmniRoute-Meta-Team: example-team` tampa
`http.request.header.x-omniroute-meta-team` su
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Visas prefiksas išsaugomas: tai įprastos antraštės, be verslo laukų analizavimo ar
`omniroute.metadata.*` / Langfuse metaduomenų konvertavimo. `langfuseMapping` nekeičia antraščių semantikos.
Pasirinkta vienos reikšmės `User-Agent` antraštė taip pat nustato standartinį skaliarą
`user_agent.original`. Kableliai vienoje reikšmėje neskaidomi. Skirtingi raidžių registro variantai sujungiami
išsaugotų įrašų tvarka; jei kuris nors variantas netinkamas, visa ta antraštė neįtraukiama.
Atributai rikiuojami pagal pavadinimą mažosiomis raidėmis.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, API raktų antraštės, pavadinimai, kuriuose yra
autentifikavimo, prieigos rakto, paslapties, slaptažodžio ar kredencialo žymenų, ir vidiniai šliuzo kredencialai
visada pašalinami, net jei jie pasirinkti arba saugykloje iš dalies užmaskuoti. Žinomuose kredencialų šablonuose
pakartotinai naudojamas bendras kredencialų detektorius; redagavimo žymekliai pašalinami, o ne eksportuojami kaip
saugios reikšmės. Priimamos tik eilutės ir netušti eilučių masyvai; skaičiai ir objektai neperverčiami.
Netinkami pavadinimai, prototipo raktai, valdymo simboliai (išskyrus horizontalųjį tabuliavimo simbolį) ir
netinkamai suformuotas Unicode ignoruojami nesukeliant paketo klaidos ir neatspindint jų turinio klaidose.

Kiekvienas segmentas fiksuoja ne daugiau kaip 32 antraštes, 16 reikšmių vienai antraštei, 4096 UTF-8 baitus vienai
reikšmei ir 16384 bendrus UTF-8 baitus visiems fiksuojamiems antraščių pavadinimams bei reikšmėms.
Per didelės arba netinkamos antraštės pašalinamos visos, o ne sutrumpinamos. Pasirinkimas yra operatoriaus
privatumo sprendimas: saugiai atrodantys pavadinimai vis tiek gali turėti asmens duomenų, o šios ribos ir
detektoriai nėra bendros PII valymo priemonės.

### Pristatymo ribos

Užklausos ribojamos iki 500 segmentų ir 4 MiB UTF-8 JSON, įskaitant apvalkalą.
Kiekvienas leidžiamas segmentas patikrinamas dėl dydžio prieš siunčiant pirmąją žymeklio paketo užklausą.
Jei atskiras segmentas viršija ribą, jokia to paketo dalis nesiunčiama ir pateikiama rekomendacija sumažinti
`maxBodyBytes`; jis tyliai neatmetamas. Išankstinis patikrinimas išsaugo tik įrašų nuorodas ir baitų skaičius,
išmesdamas kiekvieną laikiną segmento / JSON reikšmę; segmentai atkuriami ribotoms dalims, todėl nelaikoma
antros serijiniu būdu sukurtos paketo kopijos. HTTP 408/429/5xx, tinklo klaidoms ir skirties laikui taikoma
ne daugiau kaip trys bandymai su 250/500 ms eksponentiniu laukimu. `Retry-After` sekundės arba HTTP datos
gali pratęsti laukimą iki 5 sekundžių. Kiti būsenos kodai iškart sukelia klaidą. OTLP 2xx dalinis atmetimas
taip pat sukelia klaidą, užuot patvirtinus prarastą segmentą; tušti arba tinkami JSON patvirtinimai priimami,
o atsakymo skaitymas ribojamas iki 64 KiB.

Klaidose pateikiami tik eksportuotojui priklausantys faktai: HTTP būsena, pakartotinių bandymų klasė, bandymų
skaičius ir išsiųstų segmentų skaičius arba fiksuotas patvirtinimo / tinklo klaidos tekstas. Kolektoriaus atsakymų
turinys, dalinio sėkmingo apdorojimo skaičiai ir atsakymo antraštės niekada nekopijuojami į klaidas, žurnalus ar
skydelį. Nepavykęs arba iš dalies priimtas paketas nepatvirtinamas: paskirties vietoje rodoma `Failing` su ta būsena,
žymeklis lieka ties paskutiniu patvirtintu paketu, o kitas paleidimas išsiunčia tas pačias eilutes dar kartą.
Nuolatinės klaidos būsenos išlieka tol, kol sutvarkomas kolektorius arba konfigūracija. Atsakymo išsamios informacijos
ieškokite paties kolektoriaus žurnaluose. Skambučių žurnalo klaidų suvestinėms taikomas atskiras redagavimas.
`prepare()` nieko neparengia; „Test“ siunčia tiksliai `{"resourceSpans":[]}` ir pateikia HTTP būseną
neįrašydamas skambučių žurnalo segmentų.

Pėdsakų ID ir segmentų ID yra pirmieji 32/16 šešioliktainių SHA-256 simbolių, apskaičiuotų pagal
`"omniroute.trace\\0" + callLogId` ir `"omniroute.span\\0" + callLogId`. Pakartotiniai siuntimai turi
identiškus ID. Tai nėra dublikatų šalinimo garantija: kai kurios posistemės, įskaitant Langfuse v4 duomenų
priėmimą, nepašalina segmentų su tuo pačiu ID. Dėl gedimo arba dalinio dalies siuntimo sutrikimo gali būti
išsiųstas pakartotinai ne daugiau kaip vienas nepatvirtintas žymeklio paketas; visas šis paketas gali būti
dubliuotas, o ne tik paskutinė jo HTTP dalis. Rinkdamiesi žymeklio paketo dydį atsižvelkite į šį kompromisą.

### Langfuse pavyzdys

Savarankiškai talpinamam Langfuse egzemplioriui sukonfigūruokite šiuos laukus:

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

Sukurkite Authorization reikšmę vietoje kaip tekstinės eilutės `public-key:secret-key` Base64 reikšmę
(pavyzdžiui, naudodami `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Nekelkite tikrų kredencialų į žurnalus, ekrano kopijas ar pranešimus apie problemas. Susiejimas automatiškai
nustato `x-langfuse-ingestion-version: 4`; Authorization vis tiek pateikiamas `headers`.
Tiek antraštėms, tiek sugeneruotai tapatybės druskai naudojamas esamas šifruoto slapto lauko mechanizmas
ir API vietos rezervavimo ženklai; reikalingas `STORAGE_ENCRYPTION_KEY`.

Susiejimas prideda generavimo tipą/modelį, JSON naudojimo informaciją (įvestį / išvestį / bendrą reikšmę ir pasiekiamus talpyklos raktus), JSON įvesties / išvesties momentines kopijas, ERROR/DEFAULT lygį, išvalytą būsenos pranešimą, sekimo pavadinimą, seanso ID, pasirinktinę aplinką ir filtruojamus
`langfuse.observation.metadata.<key>` laukus, skirtus teikėjui, pageidaujamam modeliui, keliui, deriniui, talpyklos šaltiniui ir būsenai. `langfuse.observation.completion_start_time` yra ISO 8601 reikšmė pradžios momentu + TTFT tik tada, kai TTFT yra žinomas ir neviršija trukmės. Jokie kainos atributai nesiunčiami.

Tapatybės režimai taikomi `langfuse.user.id`:

- `pseudonymous` (numatytasis): API rakto vidinio ID HMAC-SHA256, naudojant atsitiktinę kiekvienai paskirties vietai skirtą 32 baitų druską. Jei druskos nėra, ji sugeneruojama kuriant objektą, užšifruojama kaip `identitySalt`, niekada negrąžinama ir išsaugoma atliekant pakeitimus. Neapdoroti raktų ID niekada neįrašomi į sekos atributus. Iš naujo sukūrus paskirties vietos druską arba ją pakeitus, pasikeičia tapatybės.
- `keyName`: sukonfigūruotas API rakto pavadinimas, sąmoningai atskleidžiantis tą operatoriaus etiketę.
- `none`: naudotojo ID nėra. Seanso žymos vis tiek eksportuojamos, jei yra; šie režimai neanonimizuoja savavališko raginimo turinio arba operatoriaus pateiktų seanso / koreliacijos etikečių.

### Pradžia be ankstesnių duomenų užpildymo

Tik kuriant objektą įjunkite **Pradėti nuo dabartinės pozicijos (praleisti esamus žurnalus)** arba aukščiausio lygio kūrimo API naudingojoje apkrovoje perduokite
`startFromCurrentPosition: true`. Tai inicijuoja
`cursor_row_id` dabartine didžiausia išsaugota iškvietimų žurnalo rowid reikšme, naudojant esamus žymeklio pagalbinius mechanizmus, neatliekant migracijos. Numatytoji reikšmė yra false (žymeklis 0 ir išsaugotos istorijos užpildymas).
Tai nėra naujinimo metu naudojama žymeklio nustatymo iš naujo nuostata.

Bendras `ttftMs` papildymas taip pat prideda pasirenkamą `ttft_ms` stulpelį BigQuery susiejimo mechanizmui
ir naujos lentelės schemai: jos schemos testas reikalauja, kad kiekvienas kanoninis įrašo laukas turėtų stulpelį. Esamos lentelės toliau eksportuojamos nepakitusios: `prepare()` nuskaito lentelės schemą
ir praleidžia tik `ttft_ms`, jei tokio stulpelio nėra. Pridėkite pasirenkamą INT64 stulpelį, kad TTFT būtų įtrauktas
per kitą vykdymą, arba naudokite naują lentelę. Pasirenkamas TTFT stulpelis nesukelia schemos naujinimo. Naudojimo įrodymo stulpeliai
laikosi toliau aprašyto sąlyginio, pasirenkamo suderinamumo srauto; kiti eilučių laukai ir toliau tikrinami griežtai.

---

## 6. Paskirties vietos pridėjimas

1. Sukurkite `src/lib/logExport/destinations/<name>.ts`, eksportuojantį `LogExportDestinationType`:
   Zod `configSchema`, naudotojo sąsajai skirtą `fields` aprašų masyvą, `secretFields` ir
   `createClient(config)`, grąžinantį `test()` / `prepare()` / `send(records)`.
2. Pridėkite jį į `DESTINATIONS` masyvą faile `src/lib/logExport/registry.ts`.
3. Parašykite testus kataloge `tests/unit/`.

Tai ir yra visas pakeitimas: duomenų išsaugojimas, cron užduotis, REST sluoksnis, slaptųjų duomenų šifravimas ir
valdymo skydelio forma naudoja registrą.

Dvi taisyklės naujai paskirties vietai:

- `send()` **privalo išmesti išimtį**, jei įvyksta dalinė nesėkmė. Sėkmingas užbaigimas reiškia „paskirties vieta turi šias eilutes“,
  o žymeklis visam laikui perkeliamas už jų.
- Paskirties vieta, priimanti naudotojo pateiktą URL, prieš siųsdama užklausą privalo jį patikrinti naudodama
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  kaip tai daroma su žiniatinklio atgaliniais iškvietimais. BigQuery to nereikia: jo serverių adresai yra konstantos.

---

## 7. Naudojimas

- **Skydelis**: Integracijos → Žurnalų eksportavimas. Pridėkite paskirties vietą, paleiskite **Tikrinti**, kad patikrintumėte kredencialus
  neįrašydami eilučių, tada ją įjunkite.
- **Neapdorotas sąrašas**: kiekvienos paskirties vietos kortelėje rodomos laukiančios eilutės ir kursorius; `GET
/api/log-export/status` grąžina tuos pačius rodiklius ir paskutinius 20 užduočių vykdymų.
- **Nepavykus vienai paskirties vietai, kitos nenutraukiamos** — vykdymo suvestinėje įrašoma kiekvienos paskirties vietos
  būsena laukuose `last_status` / `last_error`, o užduočių vykdymų istorijoje išsaugoma bendra būsena.
- **Ištrynus paskirties vietą, ištrinamas jos kursorius.** Ją pridėjus iš naujo, pradedama nuo seniausio išsaugoto
  iškvietimo žurnalo įrašo, todėl dar kartą siunčiamos eilutės, kurias paskirties vieta gali jau turėti. Naudojant „BigQuery“,
  kiekvienos eilutės `insertId` apsaugo nuo to tik „BigQuery“ dedublikavimo laikotarpiu, todėl, užuot trynę paskirties vietą,
  verčiau ją išjunkite.

### Naudojimo įrodymų schemos suderinamumas

Naujose „BigQuery“ lentelėse yra galintys būti tušti `usage_evidence` (STRING su JSON) ir
`usage_estimated` (BOOL) laukai. Įjungus `autoCreate`, esama lentelė gali gauti
tik šiuos trūkstamus galinčius būti tuščius stulpelius. Eksportuotojas išsaugo visą esamą
schemą, įskaitant laukų metaduomenis, ir pateikia sąlyginę PATCH užklausą naudodamas
grąžintą etag. Dėl lygiagretaus schemos pakeitimo eksportas nepavyksta, užuot perrašius
schemą; kito vykdymo metu lentelė nuskaitoma dar kartą.

Kai `autoCreate` išjungta, prieš eksportuodami įrašus su naudojimo įrodymais šiuos stulpelius
turite pridėti patys. Trūkstami schemos arba etag metaduomenys ar nepavykęs atnaujinimas taip pat
neleidžia įterpti įrašų su įrodymais. Eksporto kursorius dėl šios klaidos neperslenka, o
įrodymai niekada tyliai neatmetami. Vietiniam žurnalų saugojimui vis tiek taikomas saugojimo laikotarpis,
kol eksportas užblokuotas, todėl klaidą išspręskite prieš pasibaigiant saugomų šaltinio eilučių galiojimui.
