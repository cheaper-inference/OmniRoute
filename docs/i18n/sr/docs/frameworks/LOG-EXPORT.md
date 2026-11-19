# Log export (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Континуирани, инкрементални извоз OmniRoute евиденције позива у спољно аналитичко складиште.

Картица евиденције на контролној табли чува историју захтева у SQLite бази (`call_logs`), чија је величина ограничена
ротацијом и периодом чувања. Извоз евиденције шаље исти скуп записа према распореду, како би се сачувао
дуже од локалне базе података и повезивао са другим подацима. BigQuery је прво одредиште;
цевовод је организован као регистар, па се додатна одредишта могу накнадно додавати.

---

## 1. Како функционише

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Распоред** — један cron задатак у `JobRegistry`, `log_export`, са подразумеваном вредношћу `0 * * * *` (сваког сата,
  UTC). Регистрован је у `src/lib/initCloudSync.ts`; може се променити помоћу `OMNIROUTE_LOG_EXPORT_CRON`.
  Свако покретање обрађује сва **омогућена** одредишта, редом.
- **Курсор** — имплицитни SQLite `call_logs.rowid`, који се трајно чува за свако одредиште у
  `log_export_destinations.cursor_row_id`. `timestamp` намерно није курсор: позиваоци
  могу да задају сопствену вредност, па спор захтев може бити уписан после бржег који је започет
  касније, а курсор заснован на временској ознаци би га прескочио.
- **Груписање** — `batch_size` редова по захтеву (подразумевано 500), `max_rows_per_run` редова по покретању
  (подразумевано 10000), тако да се велики заостатак обради током више покретања уместо да блокира једно.
- **Испорука** — курсор се помера тек када се `send()` успешно заврши. Неуспела група оставља
  курсор на истом месту, па се исти редови поново шаљу при следећем покретању. Гаранција је
  испорука најмање једном уз дедупликацију на страни одредишта, а не права испорука тачно једном: BigQuery користи
  идентификатор записа позива као кључ сваког реда, који поштује по принципу најбољег напора унутар сопственог прозора дедупликације.
- **Заштита од преклапања** — cron покретање и `POST .../run` могу се активирати истовремено. Одредиште
  које се већ обрађује прескаче се уместо да се обрађује двапут (`skipped: true` у резултату покретања),
  тако да истовремено покретање не може поново послати групу нити померити курсор уназад.
- **Опоравак након брисања** — ако `cursor_row_id` постане већи од `MAX(rowid)` (цела табела је
  обрисана и нумерација rowid вредности је почела испочетка), извршилац враћа курсор на 0 уместо да трајно престане да види нове записе.

### Изоловани извршилац и ограничења

Свако покретање одредишта у Node окружењу покреће засебан, краткотрајан подређени процес оперативног система (`child_process`
са IPC-ом, а не `worker_threads`). Читање тела, парсирање/серијализација JSON садржаја, одредишни
`prepare()` и мрежни улаз/излаз одредишта извршавају се тамо, а не у петљи догађаја сервера.
Преко IPC-а пролазе само конфигурација и мале поруке о напретку; извезени записи се никада не враћају
на сервер. Cron задатак и рута за тренутно покретање задржавају исти јавни резултат и заштиту од преклапања.

Подређени процес отвара серверски разрешену путању `DATA_DIR/storage.sqlite` само за читање помоћу `node:sqlite`,
уз `busy_timeout=5000` и `query_only=ON`. Не увози јединствену инстанцу базе података и не извршава
миграције, резервне копије нити SQLite ажурирања. Обрада недостајућих/оштећених евиденција артефаката (укључујући
UPDATE за оштећене артефакте) остаје искључиво у путањи за детаље на контролној табли. Обе путање деле чисту
функцију за разрешавање детаља; извоз користи асинхрона читања система датотека и исти редослед разрешавања: артефакт → стари
уграђени садржај → стари садржај на диску → ништа. Покретање бележи највећи rowid уметнутих редова
када подређени процес отвори читач; каснија уметања чекају следеће покретање. То је граница
уметања, а не дуготрајна SQLite трансакција: WAL уписивачи и контролне тачке остају слободни током
чекања на мрежу. Ова граница не замрзава ажурирања/брисања постојећих редова.

Након сваке прихваћене групе, подређени процес чека потврду. Сервер најпре трајно чува
курсор помоћу `advanceLogExportCursor`, а затим шаље `ack`; ниједна следећа група не почиње пре тога.
Неуспело слање, пад или истек времена бележи неуспех без померања курсора за ту групу. Претходно
потврђене групе остају трајно сачуване; највише једна непотврђена група може бити поново послата.
Успех се бележи тек након `done` и уредног изласка подређеног процеса. Неуспеси прекидају подређени процес
сигналом SIGTERM, уз прелазак на SIGKILL након 500 ms, а извршилац чека затварање процеса.

| Променљива окружења                           | Подразумевано | Намена                                                   |
| --------------------------------------------- | ------------- | -------------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000        | Ограничење укупног времена по одредишту                  |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024          | Ограничење V8 old-space меморије подређеног процеса у MB |

За неважеће/непозитивне/нецелобројне вредности користе се подразумеване вредности. Подешавање динамичке меморије није ограничење
укупног RSS-а; веома велике групе и даље могу исцрпети меморију подређеног процеса и безбедно завршити покретање неуспехом.
Подразумеваних 1024 MB оставља резерву за подразумевану групу од 500 редова са артефактима од 512 KiB и
омогућеним телима, укључујући BigQuery JSON серијализацију у деловима ограниченим бројем бајтова. То не чини
групу од 10000 редова са телима безбедном. Исцрпљивање V8 динамичке меморије бележи неуспех са јасном мером за отклањање: смањите величину
групе или повећајте `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; курсор остаје на последњој
потврђеној групи. Историјска тела уграђена у записе или сачувана на диску нису обухваћена савременим ограничењем величине артефаката.
Оператери морају засебно планирати RSS, нарочито у контејнерима са ограниченом меморијом.

Подређени процес наслеђује само разрешени `DATA_DIR`, `NODE_ENV`, експлицитни `TZ` (застарело разрешавање
локалног времена у називима датотека), `ELECTRON_RUN_AS_NODE` када је присутан и следеће улазне параметре за одлазне везе:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (и њихове облике малим словима),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Глобални Undici диспечер дели серверска правила за разрешавање проксија искључиво из окружења и заобилажење
проксија за локалне хостове, укључујући `NO_PROXY`; не увози `proxyFetch.ts` нити његове заставице базе података и функција.
Акредитиви проксија се уклањају из прослеђеног излаза и забележених грешака. Акредитиви одредишта
преносе се само у једној почетној IPC поруци, никада кроз argv или окружење; прослеђени излаз и грешке
добијају префикс и прочишћавају се. У аргументима за извршавање подређеног процеса онемогућен је само `ExperimentalWarning` како се
Node упозорење за SQLite не би понављало при сваком cron покретању; остале врсте упозорења остају видљиве.

Модули одредишта морају моћи да се увезу без Next.js зависности и зависности намењених само серверу. Постојећа
BigQuery имплементација већ испуњава тај услов. Кешеви приступних токена трају само током извршавања подређеног
процеса, не и између покретања. Node је подржано извршно окружење (engines у `package.json`), али одељак README-а о
инсталацији помоћу Bun-а и `Dockerfile.bun` такође наводе путању компатибилности за продукцију која користи
`bun:sqlite` (`src/lib/db/core.ts` / адаптери). Зато извоз под Bun-ом задржава претходну
путању унутар процеса и једнократно приказује упозорење: изолација меморијске гомиле подређеног процеса и временског ограничења није доступна. Користите
Node за изолацију петље догађаја и заштиту од исцрпљивања меморије; Bun се овде не сматра окружењем само за развој.

Када је `includeBodies` омогућен, дајте предност учесталости на нивоу минута, као што је
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, уместо накупљању једночасовног заостатка садржаја.
Ограничења групе и броја редова и даље ограничавају свако покретање. Трошак покретања процеса настаје за свако одредиште при сваком покретању;
тиме се мали трошак покретања мења за изолацију серверске петље догађаја, а не за смањење укупне употребе процесора.

### Садржаји (упити и одговори)

Подразумевано, извоз садржи само сажета поља која приказује **листа** евиденција. Укључивање опције
**Извези упите и одговоре** (`includeBodies`) додатно шаље оно што окно **детаља**
евиденција приказује за сваки позив:

| Поље                             | Шта садржи                                                 |
| -------------------------------- | ---------------------------------------------------------- |
| `request_body` / `response_body` | Садржаје позива онако како их приказује контролна табла    |
| `pipeline_route_decision`        | Које је одредиште и модел рутер изабрао                    |
| `pipeline_client_request`        | Необрађени захтев тачно онако како га је клијент послао    |
| `pipeline_openai_request`        | Након превођења у интерни OpenAI облик                     |
| `pipeline_provider_request`      | Онако како је заиста послат добављачу, у његовом дијалекту |
| `pipeline_provider_response`     | Необрађени одговор добављача                               |
| `pipeline_client_response`       | Оно што је враћено позиваоцу                               |
| `pipeline_error`                 | Детаље грешке на нивоу цевовода за неуспели позив          |
| `bodies_truncated`               | Тачно када је било које поље изнад достигло `maxBodyBytes` |

Ово је садржај упита, па је **подразумевано искључен** и намерно се бира засебно за свако одредиште.
Шаље се оно што контролна табла приказује, јер извоз и `getCallLogById` деле разрешавање
детаља: из садржаја су
већ уклоњени лични подаци и тајне приликом уписа, а позив обављен помоћу
`noLog` API кључа уопште не чува садржај, па нема шта да се извезе.

Садржаји се читају по редовима из артефакта у систему датотека, па се учитавање детаља извршава само за одредишта
која су то затражила. Ако артефакт недостаје или је оштећен, извози се његов сажетак са null садржајима уместо
да цела група не успе и курсор остане заглављен.

`maxBodyBytes` (подразумевано 262144) ограничава свако поље. Дужи садржаји се **скраћују уместо да се
одбаце** — скраћени упит и даље одговара на питање „шта је тражено“ — а ред се означава са
`bodies_truncated`. Измене које се стримују део по део не извозе се; састављени одговор је
већ у `pipeline_provider_response` и `pipeline_client_response`.

---

## 2. Датотеке

| Компонента                              | Локација                                     |
| --------------------------------------- | -------------------------------------------- |
| Уговор одредишта                        | `src/lib/logExport/types.ts`                 |
| Регистар                                | `src/lib/logExport/registry.ts`              |
| Руковање тајнама                        | `src/lib/logExport/secrets.ts`               |
| Покретач (IPC родитељског процеса)      | `src/lib/logExport/runner.ts`                |
| Животни циклус процеса                  | `src/lib/logExport/childRunner.ts`           |
| Улазна тачка подређеног процеса         | `src/lib/logExport/exportChild.ts`           |
| Отварање само за читање                 | `src/lib/db/logExportReadOnly.ts`            |
| Заједнички упити/мапирање               | `src/lib/usage/callLogExportQueries.ts`      |
| Разрешавање детаља                      | `src/lib/usage/callLogDetailResolver.ts`     |
| API пројекција                          | `src/lib/logExport/presenter.ts`             |
| BigQuery одредиште                      | `src/lib/logExport/destinations/bigquery.ts` |
| Аутентификација Google сервисног налога | `src/lib/logExport/googleServiceAccount.ts`  |
| Извор евиденције позива                 | `src/lib/usage/callLogExportSource.ts`       |
| Трајно чување                           | `src/lib/db/logExportDestinations.ts`        |
| Cron задатак                            | `src/lib/jobs/logExportJob.ts`               |
| REST слој                               | `src/app/api/log-export/`                    |
| Страница контролне табле                | `src/app/(dashboard)/dashboard/log-export/`  |

Шема: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Све руте захтевају управљачку аутентификацију (`requireManagementAuth`). Тајне се никада не враћају:
сачувана тајна се враћа као дословна вредност `__stored__`, а слање те вредности при ажурирању
задржава сачувани акредитив.

Креирање или ажурирање одредишта чији тип декларише тајну **захтева
`STORAGE_ENCRYPTION_KEY`**. Без њега `encrypt()` неприметно пропушта податке без измене, па се упис
одбија статусом 400 уместо да се акредитив упише у SQLite као отворени текст (исту заштиту
примењује и Telegram вебхук).

| Метод    | Путања                                   | Намена                                                         |
| -------- | ---------------------------------------- | -------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Типови одредишта + списак њихових конфигурационих поља         |
| `GET`    | `/api/log-export/destinations`           | Списак одредишта (тајне скривене)                              |
| `POST`   | `/api/log-export/destinations`           | Креирање одредишта                                             |
| `GET`    | `/api/log-export/destinations/{id}`      | Читање једног одредишта                                        |
| `PUT`    | `/api/log-export/destinations/{id}`      | Ажурирање назива / омогућености / конфигурације / груписања    |
| `DELETE` | `/api/log-export/destinations/{id}`      | Брисање                                                        |
| `POST`   | `/api/log-export/destinations/{id}/test` | Провера акредитива, без уписивања                              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Пражњење одмах, истим поступком као при заказаном извршавању   |
| `GET`    | `/api/log-export/status`                 | Стање cron-а, недавна извршавања, заостале ставке по одредишту |

`GET /api/log-export/types` чини кориснички интерфејс генеричким: образац на контролној табли приказује се на основу
враћених описа поља, тако да ново одредиште не захтева измену корисничког интерфејса.

---

## 4. BigQuery odredište

Konfiguracioni ključevi (`type: "bigquery"`):

| Ključ                | Napomene                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP projekat koji sadrži skup podataka                                                                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                         |
| `location`           | Koristi se samo kada skup podataka mora da se kreira (podrazumevano `EU`)                                               |
| `serviceAccountJson` | Ključ servisnog naloga. Tajna vrednost: šifruje se u stanju mirovanja i nikada se ne vraća                              |
| `autoCreate`         | Kreira nedostajući skup podataka/tabelu; uslovno dodaje nullable kolone sa dokazima o korišćenju (podrazumevano `true`) |

Servisnom nalogu je potrebna dozvola `bigquery.tables.updateData` nad ciljnom tabelom, kao i
`bigquery.datasets.create` / `bigquery.tables.create` kada je `autoCreate` uključen.
Ažuriranje postojeće tabele radi dodavanja dva nullable polja sa dokazima o korišćenju takođe
zahteva `bigquery.tables.update`. Nedostajuća dozvola prekida izvoz bez pomeranja kursora.

Konfigurisana grupa je jedinica **kursora**, a ne HTTP jedinica: `send()` je deli na pozive
insertAll sa najviše 500 redova, tako da velika vrednost `batch_size` ne može da prekorači
BigQuery ograničenje zahteva od 10 MB. Privremeni statusi (408/429/500/502/503/504) ponavljaju se
do tri puta uz eksponencijalno čekanje, uz ponovnu upotrebu istih insertIds; greške autentifikacije
i šeme izazivaju izuzetak pri prvom pokušaju, umesto da nepotrebno troše izvršavanje.

Tabela kreirana pre nekoliko trenutaka još nije vidljiva krajnjoj tački za streaming, koja vraća
404 nekoliko sekundi. Taj 404 se ponavlja, ali **samo kada je ova izvršena instanca kreirala tabelu** —
zaista nedostajuća tabela i dalje odmah izaziva grešku. Imajte na umu da ponovno kreiranje tabele
pod imenom koje je nedavno obrisano dovodi do toga da BigQuery odbija streaming umetanja nekoliko
minuta; to je svojstvo operacije brisanja pa ponovnog kreiranja, zato je bolje koristiti novo ime
tabele nego brisati i ponovo dodavati postojeću.

**Delimični neuspeh stiže kao HTTP 200 sa nepraznim `insertErrors[]`.** To se tretira kao neuspeh
i izaziva izuzetak, čime se sprečava pomeranje kursora preko redova koje BigQuery nikada nije
prihvatio; `tests/unit/log-export-bigquery.test.ts` utvrđuje ovo ponašanje.

Transport je običan REST — samopotpisana RS256 tvrdnja razmenjuje se za token za pristup na
`https://oauth2.googleapis.com/token`, a zatim se redovi šalju na `tabledata.insertAll`. Ne
preuzima se nijedan Google SDK. Tokeni za pristup keširaju se u procesu po kombinaciji (servisni
nalog, opseg).

Kreirana tabela sadrži po jednu kolonu za svako polje kartice Logs, kao i `exported_at`, i
organizovana je za način na koji se dnevnici poziva zapravo upituju:

- **Particionisana po danu na osnovu kolone `timestamp`**, tako da upit ograničen datumom skenira
  samo te dane.
- **Klasterizovana po kolonama `api_key_name`, `provider`, `model`, `status`** (tim redosledom),
  tako da filtriranje po tome ko je izvršio poziv, kuda je poslat ili da li nije uspeo izostavlja
  blokove unutar svake particije. BigQuery dozvoljava najviše četiri kolone za klasterizaciju, a
  redosled je važan: filter samo po `api_key_name` izostavlja blokove, dok ih filter samo po
  `status` ne izostavlja.
- **Opciono zadržavanje particija** putem `partitionExpirationDays` (0 zadržava sve), koje se
  primenjuje prilikom kreiranja tabele.

Obe postavke primenjuju se prilikom kreiranja. Postojeća tabela zadržava postojeću organizaciju,
zato odredište usmerite na novi ID tabele ako želite da ih primenite.

`tests/unit/log-export-bigquery.test.ts` potvrđuje da mapiranje i šema tabele ostaju potpuno
usklađeni, tako da nova kolona dnevnika poziva ne može nečujno da bude izostavljena pri izvozu.

Grupe se dele na osnovu **broja redova i serijalizovanih bajtova**. Sam broj redova nije dovoljan
kada se izvoze korisni podaci: 500 redova koji sadrže upite mogu zauzimati desetine megabajta, a
insertAll odbija zahtev veći od 10 MB. Grupe se zatvaraju na 500 redova ili 9 MB, šta god prvo
nastupi.

---

## 5. Одредиште за OTLP/HTTP трагове

Конфигурација користи `type: "otlp-http"`. Ово је заказани извоз сачуваних
дневника позива заснован на показивачу, а не sink за најбољи покушај усмеравања
догађаја уживо у `open-sse/services/routing/otel.ts`. Не чита нити мења променљиве
окружења, тајмере или бафере тог sink-а. Омогућавање оба може произвести две независне
врсте span-ова; користите опсег инструментације `omniroute.log-export` да бисте
разликовали ове span-ове дневника позива.

| Кључ                     | Подразумевано / сврха                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `endpoint`               | Обавезни пуни URL за HTTP(S) трагове; суфикс `/v1/traces` се не додаје                    |
| `headers`                | Опционе линије `Name: value` или JSON објекат ниски; шифровано                            |
| `requestHeaderAllowlist` | Празно (искључено); називи/префикси заглавља клијента који се хватају као атрибути span-а |
| `serviceName`            | `omniroute`; ресурс `service.name`                                                        |
| `langfuseMapping`        | `false`; додаје Langfuse атрибуте генерације/сесије/корисника                             |
| `identity`               | `pseudonymous`, `keyName` или `none`                                                      |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                   |
| `timeoutMs`              | `30000` по HTTP покушају                                                                  |
| `environment`            | Није постављено; опционални `langfuse.environment`                                        |

Генеричка контролна табла приказује ова поља. `paths` прихвата API низ или текстуално
поље са тачним путањама раздвојеним новим редовима/зарезима. Embeddings, rerank и друге
путање се прескачу осим ако нису изричито дозвољене. Прескочени редови и даље померају
показивач; бројачи `exported`/`exportedTotal` постојећег runner-а броје обрађене изворне
редове, укључујући филтриране редове, а не прихваћене span-ове. Филтрирање се обавља у
child процесу, без промене његовог IPC/уговора показивача.

Валидација URL-а користи помоћну функцију без базе података
`parseAndValidateNonMetadataUrl` из `src/shared/network/outboundUrlGuard.ts`: политику
`block-metadata`. Она има исте безусловне провере метаподатака/протокола/уграђених
акредитива као и валидатор webhook-а, при чему су приватни URL-ови дозвољени, али
намерно дозвољава одредишта на localhost/LAN мрежи без глобалног прекидача функције.
Ово омогућава self-hosted Langfuse, Phoenix, Tempo и Collector одредишта, укључујући
приватна HTTP одредишта. Хостови cloud метаподатака су увек блокирани.
Преусмеравања се не прате, па collector не може да преусмери акредитиве на други хост.
Као и постојећа лексичка провера URL-а, ово не фиксира DNS резолуцију; конфигуришите
само хостове којима управља оператор. Користите HTTPS кад год endpoint није на
поузданој мрежи.

### Садржај и испорука

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) преноси
по један CLIENT span за сваки дозвољени ред, именован његовом тачном путањом захтева.
Именовање по путањи разликује Chat Completions, Responses и Messages без уношења података
о моделу или идентитету у назив span-а. Атрибути ресурса укључују `service.name` и
`service.version` пакета.

Уобичајени logger покушаја chat захтева
(`open-sse/handlers/chatCore/attemptLogging.ts`) уписује
`duration = Date.now() - startTime` по завршетку и не прослеђује временску ознаку;
`saveCallLogOperation` у `src/lib/usage/callLogs.ts` подразумевано поставља временску
ознаку на време уписа (завршетка). Извоз зато поставља end на временску ознаку реда, а
start на end − duration (у милисекундама, претворено у децималне наносекунде).
Временске ознаке из прошлости које је доставио позивалац такође се задржавају као време
end; не постоји разликовање почетка/завршетка по реду. Нулта вредност duration-а постаје
нула. Неважеће или недостајуће временске ознаке обустављају batch уместо да креирају
недетерминистичке span-ове. `ttftMs` може бити null и мапира се на `omniroute.ttft_ms`.

Атрибути укључују `gen_ai.operation.name="chat"`, добављача, затражени/одговорени
модел, улазне/излазне токене, опционе токене за читање из кеша/креирање кеша/резоновање,
HTTP статус, комбинацију, извор кеша, ознаку сесије и идентификатор корелације. Целобројне
OTLP вредности и временске ознаке су децималне ниске; ниске, логичке вредности и
разломљени бројеви користе своје изворне OTLP варијанте вредности. Error span-ови имају
статус ERROR и санитирану статусну поруку. Канонски запис нема URL узводног хоста, па се
`server.address` изоставља уместо да се collector погрешно идентификује као сервер
модела. Трошак се не извози.

Само `includeBodies=true` учитава садржај. Када је `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` садрже санитизовани JSON тела
захтева/одговора како га је сачувао OmniRoute (канонизован када је могуће рашчланити),
а не поново обликовани semconv низ порука. Одсечена/не-JSON тела остају необрађени текст.
Када је `langfuseMapping=true`, тела се емитују само као
`langfuse.observation.input` / `langfuse.observation.output`; атрибути
`gen_ai.*.messages` се изостављају како би се свако тело послало једном. Оба режима
наслеђују `maxBodyBytes` из постојеће путање учитавања;
`omniroute.bodies_truncated=true` означава одсецање.
Ово одредиште не додаје додатне снимке pipeline-а нити читање несанираних артефаката;
опционално хватање заглавља захтева користи постојећи учитани снимак клијента описан у
наставку. Користите cadence на нивоу минута, као што је
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, када извозите тела, уместо акумулирања
сатног заостатка.

### Опционална заглавља захтева клијента

Хватање заглавља је **подразумевано искључено**. Поставите `requestHeaderAllowlist` у конфигурацији одредишта
и омогућите **Export prompts and responses** (`includeBodies: true` на одредишту).
Allowlist прихвата API низ или текстуално поље са називима раздвојеним новим редовима/зарезима:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Имена се поклапају без обзира на величину слова и тачно, осим ако једна завршна `*` не изабере непразан
префикс имена заглавља. Самостална `*`, уграђени џокери и неважећа имена HTTP заглавља се одбијају.
Постоји највише 64 селектора, од којих сваки има име/префикс од највише 256 ASCII бајтова.
Ово подешавање је одвојено од `headers`, које аутентификује извозник према сакупљачу.

Снимање чита само `pipeline_client_request`, попуњен из сачуваног детаљног pipeline-а
`clientRawRequest` (или застарелог `clientRequest`). Никада се не враћа на заглавља захтева добављача.
Детаљно евидентирање pipeline-а морало је бити омогућено када је захтев забележен. Када је
`includeBodies` онемогућен, или када недостаје, неисправан је или скраћен JSON снимка клијента,
не емитују се атрибути заглавља. Повећање вредности `maxBodyBytes` може спречити скраћивање снимка
у тренутку извоза; не може повратити детаље који никада нису сачувани. Снимак већи од 1 MiB или
са више од 256 уноса заглавља се занемарује. Постојећи извоз захтева/одговора остаје омогућен
поред снимања заглавља; листа дозвољених не обезбеђује режим хидратације само за заглавља.

Изабране вредности постају OTLP низови ниски `http.request.header.<full lowercase header name>`,
чак и за једну ниску. На пример, `X-OmniRoute-Meta-Team: example-team` постаје
`http.request.header.x-omniroute-meta-team` са
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Цео префикс се чува: ово су обична заглавља, без рашчлањивања пословних поља или конверзије у
`omniroute.metadata.*` / Langfuse метаподатке. `langfuseMapping` не мења семантику заглавља.
Изабрани једновредносни `User-Agent` такође поставља стандардни скалар
`user_agent.original`. Зарези унутар једне вредности се не раздвајају. Варијанте величине слова
се спајају редоследом у сачуваним уносима; свака неважећа варијанта изоставља цело то заглавље.
Атрибути су поређани према имену претвореном у мала слова.

`Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, заглавља API кључева, имена која
садрже маркере за аутентификацију/токен/тајну/лозинку/акредитиве и интерни акредитиви gateway-а
увек се изузимају, чак и ако су изабрани или делимично маскирани у складишту. Познати обрасци
акредитива поново користе заједнички детектор акредитива; маркери редиговања се изостављају, а не
извозе као безбедне вредности. Прихватају се само ниске и непразни низови ниски; бројеви и објекти
се не претварају. Неважећа имена, кључеви прототипа, контролни знакови (осим хоризонталног табулатора)
и неисправан Unicode се занемарују без неуспешне обраде групе или одражавања њиховог садржаја у грешкама.

Сваки span обухвата највише 32 заглавља, 16 вредности по заглављу, 4096 UTF-8 бајтова по вредности
и укупно 16384 UTF-8 бајта за сва снимљена имена и вредности заглавља. Прекомерно велика/неважећа
заглавља се изостављају у целини, а не скраћују. Избор је одлука оператора о приватности: имена
која делују безбедно и даље могу садржати личне податке, а ова ограничења и детектори нису општи
алат за уклањање личних података.

### Ограничења испоруке

Захтеви су ограничени на 500 span-ова и 4 MiB UTF-8 JSON-а, укључујући омотач.
Величина сваког дозвољеног span-а проверава се пре првог захтева серије курсора. Ако је појединачни
span већи од ограничења, ниједан део те серије се не шаље и обрада не успева уз упутство да се
смањи `maxBodyBytes`; не одбацује се прећутно. Предпровера задржава само референце на записе
и бројеве бајтова, одбацујући сваки привремени span/JSON; span-ови се поново граде за ограничене
делове уместо да се задржи друга сериализована копија серије. HTTP 408/429/5xx, мрежне грешке и
истек времена добијају највише три покушаја, са експоненцијалним повратним чекањем од 250/500 ms.
`Retry-After` у секундама или HTTP датуми могу продужити чекање до 5 секунди. Остали статуси
одмах доводе до неуспеха. OTLP 2xx делимично одбијање такође изазива грешку уместо потврђивања
изгубљеног span-а; празне или важеће JSON потврде се прихватају, уз ограничење читања одговора
од 64 KiB.

Грешке садрже само чињенице у власништву извозника: HTTP статус, класу поновног покушаја,
број покушаја и број послатих span-ова, или фиксни текст о неуспешној потврди/мрежној грешци.
Тела одговора сакупљача, бројеви делимично успешних обрада и заглавља одговора никада се не
копирају у грешке, евиденције или контролну таблу. Неуспешна или делимично прихваћена серија
се не потврђује: одредиште приказује статус Failing, курсор остаје на последњој потврђеној серији,
а следеће покретање поново шаље исте редове. Трајни статуси настављају да доводе до неуспеха
све док се сакупљач или конфигурација не поправе. За детаље о одговору користите сопствене
евиденције сакупљача. Резимеи грешака у евиденцији позива задржавају своју засебну редакцију.
`prepare()` не обезбеђује ништа; Test шаље POST тачно са `{"resourceSpans":[]}` и извештава
о HTTP статусу без уписивања span-ова евиденције позива.

ID-јеви трагова и ID-јеви span-ова су првих 32/16 хексадецималних цифара SHA-256 вредности над
`"omniroute.trace\\0" + callLogId` и `"omniroute.span\\0" + callLogId`. Поновна слања носе
идентичне ID-јеве. Ово није гаранција дедупликације: неки позадински системи, укључујући Langfuse
v4 унос, не уклањају дупликате span-ова са истим ID-јем. Пад или делимични неуспех дела може
поново послати највише једну непотврђену серију курсора; цела та серија може бити дуплирана,
а не само њен последњи HTTP део. Величину серије курсора изаберите имајући у виду овај компромис.

### Langfuse пример

Конфигуришите ова поља за self-hosted Langfuse инстанцу:

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

Локално направите вредност Authorization-а као Base64 дословног низа `public-key:secret-key`
(на пример помоћу `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Не уносите стварне акредитиве у евиденције, снимке екрана или issues. Мапирање аутоматски
поставља `x-langfuse-ingestion-version: 4`; Authorization се и даље прослеђује у `headers`.
И заглавља и генерисана со за идентитет користе постојећи механизам шифрованих поља тајни и
API чувара места; `STORAGE_ENCRYPTION_KEY` је обавезан.

Mapiranje dodaje tip/model generisanja, detalje o upotrebi JSON-a (ulaz/izlaz/ukupno i dostupne
ključeve keša), snimke JSON ulaza/izlaza, nivo ERROR/DEFAULT, sanitizovanu statusnu poruku,
naziv traga, ID sesije, opciono okruženje i polje koje se može filtrirati
`langfuse.observation.metadata.<key>` za provajdera, zatraženi model, putanju, kombinaciju, izvor
keša i status. `langfuse.observation.completion_start_time` je u formatu ISO 8601 i postavlja se
na vreme početka + TTFT samo kada je TTFT poznat i unutar trajanja. Atributi troška se ne šalju.

Režimi identiteta primenjuju se na `langfuse.user.id`:

- `pseudonymous` (podrazumevano): HMAC-SHA256 internog ID-ja API ključa sa nasumičnim solima od 32 bajta za svako odredište. Sól se generiše prilikom kreiranja ako ne postoji, šifruje se kao `identitySalt`, nikada se ne vraća i zadržava se tokom izmena. Sirovi ID-jevi ključeva nikada se ne upisuju u atribute span-a. Ponovno kreiranje ili rotiranje soli odredišta menja identitete.
- `keyName`: konfigurisani naziv API ključa, čime se namerno otkriva ta oznaka operatora.
- `none`: nema ID-ja korisnika. Oznake sesije se i dalje izvoze kada postoje; ovi režimi ne anonimizuju proizvoljan sadržaj upita niti oznake sesije/korespondencije koje je uneo operator.

### Pokretanje bez popunjavanja prethodnih podataka

Samo prilikom kreiranja omogućite **Počni od trenutne pozicije (preskoči postojeće logove)** ili prosledite
`startFromCurrentPosition: true` na najvišem nivou sadržaja zahteva za API za kreiranje. To inicijalizuje
`cursor_row_id` na trenutni maksimalni zadržani rowid reda dnevnika poziva koristeći postojeće pomoćne
funkcije kursora, bez migracije. Podrazumevana vrednost je false (kursor 0 i popunjavanje zadržane istorije).
Ovo nije postavka za resetovanje kursora prilikom ažuriranja.

Dodavanje deljenog `ttftMs` takođe dodaje nullable kolonu `ttft_ms` u BigQuery mapiranje
i šemu nove tabele: test šeme zahteva da svako kanonsko polje zapisa ima kolonu. Postojeće tabele
nastavljaju da se izvoze nepromenjeno: `prepare()` čita šemu tabele i izostavlja samo `ttft_ms`
kada ta kolona ne postoji. Dodajte nullable kolonu INT64 da biste dobili TTFT pri sledećem pokretanju
ili koristite novu tabelu. Opcionа TTFT kolona ne pokreće ažuriranje šeme. Kolone sa podacima o upotrebi
prate uslovni tok kompatibilnosti sa eksplicitnim uključivanjem naveden u nastavku; ostala polja reda
zadržavaju strogu proveru šeme.

---

## 6. Додавање одредишта

1. Направите `src/lib/logExport/destinations/<name>.ts` који извози `LogExportDestinationType`:
   Zod `configSchema`, низ дескриптора `fields` за кориснички интерфејс, `secretFields` и
   `createClient(config)` који враћа `test()` / `prepare()` / `send(records)`.
2. Додајте га у низ `DESTINATIONS` у `src/lib/logExport/registry.ts`.
3. Напишите тестове у `tests/unit/`.

То је цела измена: трајно чување података, cron задатак, REST слој, шифровање тајних података и
образац на контролној табли читају регистар.

Два правила за ново одредиште:

- `send()` **мора да баци изузетак** при делимичном неуспеху. Успешно завршавање значи „одредиште има ове редове“,
  а курсор се трајно помера иза њих.
- Одредиште које прихвата URL који је навео корисник мора да га провери помоћу
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) пре слања захтева,
  на исти начин као веб-хукови. BigQuery-ју ово није потребно: његови хостови су константе.

---

## 7. Korišćenje

- **Kontrolna tabla**: Integracije → Izvoz evidencije. Dodajte odredište, pokrenite **Test** da biste proverili akreditive
  bez upisivanja redova, a zatim ga omogućite.
- **Zaostaci**: kartica svakog odredišta prikazuje redove na čekanju i kursor; `GET
/api/log-export/status` vraća iste podatke, kao i poslednjih 20 pokretanja poslova.
- **Neuspeh jednog odredišta ne dovodi do neuspeha ostalih** — rezime pokretanja beleži status po odredištu
  u `last_status` / `last_error`, a istorija pokretanja poslova čuva zbirni status.
- **Brisanje odredišta briše njegov kursor.** Ponovno dodavanje počinje od najstarijeg sačuvanog
  zapisa poziva, čime se ponovo šalju redovi koje odredište možda već sadrži. Na BigQuery-ju, `insertId` po redu
  sprečava duplikate samo unutar sopstvenog BigQuery prozora za uklanjanje duplikata, zato je bolje onemogućiti
  odredište nego ga obrisati.

### Kompatibilnost šeme dokaza o korišćenju

Nove BigQuery tabele uključuju nullable `usage_evidence` (STRING koji sadrži JSON) i
`usage_estimated` (BOOL). Kada je `autoCreate` omogućeno, postojeća tabela može da dobije
samo ove nedostajuće nullable kolone. Izvoznik čuva celokupnu postojeću šemu,
uključujući metapodatke polja, i šalje uslovni PATCH koristeći vraćeni etag. Istovremena promena šeme
dovodi do neuspeha izvoza umesto prepisivanja; pri sledećem pokretanju tabela se ponovo čita.

Kada je `autoCreate` onemogućeno, sami dodajte ove kolone pre izvoza zapisa
sa dokazima o korišćenju. Nedostajući metapodaci šeme/etag-a ili neuspešno ažuriranje takođe sprečavaju umetanja koja sadrže dokaze. Kursor izvoza se ne pomera nakon tog neuspeha i
dokazi se nikada ne odbacuju nečujno. Lokalno zadržavanje evidencije i dalje važi dok je izvoz blokiran, zato rešite neuspeh pre nego što sačuvani izvorni redovi isteknu.
