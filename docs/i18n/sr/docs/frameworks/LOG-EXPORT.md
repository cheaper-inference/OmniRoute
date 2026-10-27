# Log export (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuirani, inkrementalni izvoz OmniRoute evidencije poziva u eksterno skladište analitičkih podataka.

Kartica Logs na kontrolnoj tabli čuva istoriju zahteva u SQLite bazi (`call_logs`), koja je ograničena
rotacijom i periodom čuvanja. Izvoz evidencije šalje isti skup zapisa prema rasporedu kako bi oni
mogli da nadžive lokalnu bazu podataka i da se povezuju sa drugim podacima. BigQuery je prvo odredište;
cevovod predstavlja registar, pa se dodatna odredišta mogu naknadno dodavati.

---

## 1. Како функционише

```
сервер (дешифровање + провера конфигурације, усклађивање курсора)
  → покретање IPC-а → изоловани exportChild OS процес
    → storage.sqlite само за читање → заједнички упит/мапирање евиденције позива
      → асинхроно учитавање артефаката → одредиште prepare()/send()
        → пакетни IPC → сервер чува курсор → ack IPC
          → следећи пакет; done IPC → сервер бележи успех
```

- **Распоред** — један `JobRegistry` cron задатак, `log_export`, са подразумеваном вредношћу
  `0 * * * *` (сваког сата, UTC). Региструје се у `src/lib/initCloudSync.ts`; може се изменити
  помоћу `OMNIROUTE_LOG_EXPORT_CRON`. При сваком покретању редом се обрађују сва **омогућена**
  одредишта.
- **Курсор** — SQLite-ов имплицитни `call_logs.rowid`, који се трајно чува за свако одредиште у
  `log_export_destinations.cursor_row_id`. `timestamp` намерно није курсор: позиваоци могу да
  задају сопствену вредност, па спор захтев може бити уписан након бржег који је покренут
  касније, а курсор заснован на временској ознаци би га прескочио.
- **Груписање у пакете** — `batch_size` редова по захтеву (подразумевано 500),
  `max_rows_per_run` редова по покретању (подразумевано 10000), тако да се велики заостатак
  обради током више покретања уместо да блокира једно.
- **Испорука** — курсор напредује тек након што се `send()` успешно заврши. Неуспешан пакет
  оставља курсор на истом месту, па се исти редови поново покушавају при следећем покретању.
  Гаранција је најмање једна испорука уз уклањање дупликата на страни одредишта, а не истинска
  тачно једна испорука: BigQuery сваком реду додељује кључ према ID-у евиденције позива, што
  поштује по принципу најбољег могућег покушаја у оквиру сопственог периода дедупликације.
- **Заштита од преклапања** — cron покретање и `POST .../run` могу се активирати истовремено.
  Одредиште које се већ обрађује прескаче се уместо да буде обрађено два пута (`skipped: true`
  у резултату покретања), тако да истовремено покретање не може поново да пошаље пакет нити да
  врати курсор уназад.
- **Опоравак након чишћења** — ако `cursor_row_id` постане већи од `MAX(rowid)` (цела табела је
  очишћена и нумерација rowid вредности је поново покренута), покретач враћа курсор на 0 уместо
  да трајно престане да проналази редове.

### Изоловани покретач и ограничења

Свако покретање одредишта у окружењу Node покреће засебан, краткотрајан подређени OS процес
(`child_process` са IPC-ом, а не `worker_threads`). Читање тела, рашчлањивање/серијализација
JSON корисног садржаја, одредишни `prepare()` и мрежни I/O одредишта извршавају се у том
процесу, а не у серверској петљи догађаја. Cron задатак и рута Run now задржавају исти јавни
резултат и заштиту од преклапања.

Подређени процес отвара серверски разрешену датотеку `DATA_DIR/storage.sqlite` само за читање
помоћу `node:sqlite`, са `busy_timeout=5000` и `query_only=ON`. Не увози ниједан DB singleton
и не обавља миграције, прављење резервних копија нити SQLite ажурирања. Евидентирање
недостајућих/оштећених артефаката (укључујући UPDATE за оштећени артефакт) остаје само у
путањи детаљног приказа контролне табле. Обе путање користе заједнички чисти разрешавач
детаља; извоз користи асинхроно читање система датотека и исти редослед разрешавања:
артефакт → застарело уграђено тело → застарели диск → ништа. При покретању се прави снимак
највеће rowid вредности уметнутог реда када подређени процес отвори свој читач; каснији уноси
чекају следеће покретање. Ово је граница уметања, а не дуготрајна SQLite трансакција: WAL
писачи и контролне тачке остају слободни током чекања на мрежу. Ажурирања/брисања постојећих
редова нису замрзнута овом границом.

Након сваког прихваћеног пакета, подређени процес чека потврду. Сервер најпре трајно чува
курсор помоћу `advanceLogExportCursor`, а затим шаље `ack`; ниједан следећи пакет не почиње
пре тога. Неуспешно слање, пад или истек времена бележе неуспех без померања курсора за тај
пакет. Претходно потврђени пакети остају сачувани; највише један непотврђени пакет може бити
поново послат. Успех се бележи тек након `done` и уредног завршетка подређеног процеса.
У случају неуспеха, подређени процес се прекида сигналом SIGTERM, а након 500 ms прелази се
на SIGKILL, при чему покретач чека да се процес затвори.

| Променљива окружења                           | Подразумевано | Намена                                |
| --------------------------------------------- | ------------- | ------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000        | Временско ограничење по одредишту     |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024          | Ограничење V8 old-space меморије у MB |

За неважеће вредности, вредности које нису позитивне или нису цели бројеви користе се
подразумеване вредности. Подешавање heap меморије није ограничење укупног RSS-а; веома велики
пакети и даље могу исцрпети меморију подређеног процеса и безбедно прекинути покретање.
Подразумеваних 1024 MB оставља довољно простора за подразумевани пакет од 500 редова са
артефактима од 512 KiB и укљученим телима, укључујући BigQuery-ову JSON серијализацију
подељену на делове према броју бајтова. То не чини безбедним пакет од 10000 редова са телима.
Исцрпљивање V8 heap меморије бележи грешку са јасним упутством: смањите величину пакета или
повећајте `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; курсор остаје на последњем
потврђеном пакету. Историјска уграђена тела/тела на диску нису обухваћена савременим
ограничењем величине артефакта. Оператери морају засебно да планирају RSS, нарочито у
контејнерима са ограниченом меморијом.

Подређени процес наслеђује само разрешени `DATA_DIR`, `NODE_ENV`, експлицитни `TZ`
(разрешавање локалног времена за застареле називе датотека), `ELECTRON_RUN_AS_NODE` када је
присутан и следеће улазне вредности за одлазне везе: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`,
`NO_PROXY` (и њихове варијанте написане малим словима), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`,
`NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Глобални Undici dispatcher користи
заједничко серверско чисто разрешавање проксија из окружења и правила заобилажења локалних
хостова, укључујући `NO_PROXY`; не увози `proxyFetch.ts` нити његове DB/feature заставице.
Акредитиви проксија уклањају се из прослеђеног излаза и забележених грешака. Акредитиви
одредишта преносе се само у једној почетној IPC поруци, никада преко argv-а или окружења;
прослеђивање излаза/грешака добија префикс и прочишћава се. Само је `ExperimentalWarning`
онемогућен у аргументима за покретање подређеног процеса како би се избегло понављање Node
упозорења за SQLite при сваком cron покретању; остали типови упозорења остају видљиви.

Одредишни модули морају моћи да се увезу без зависности од Next.js-а или зависности намењених искључиво серверу. Постојећа
BigQuery имплементација већ испуњава тај услов. Кешеви приступних токена трају само током подређеног
покретања, а не између покретања. Node је подржано окружење за извршавање (`package.json` engines), али одељак
README датотеке о инсталацији Bun-а и `Dockerfile.bun` такође оглашавају путању за продукциону компатибилност која користи
`bun:sqlite` (`src/lib/db/core.ts` / адаптери). Стога, под Bun-ом, извози задржавају претходну
путању унутар процеса и једнократно приказују упозорење: изолација хипа и временског ограничења подређеног процеса није доступна. Користите
Node за изолацију петље догађаја и OOM грешака; Bun се овде не сматра окружењем искључиво за развој.

Када је `includeBodies` омогућен, предност дајте интервалу на нивоу минута, као што је
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, уместо нагомилавању количине података за читав сат.
Ограничења серије и броја редова и даље ограничавају свако покретање. Покретање процеса плаћа се по одредишту и по покретању;
тиме се мали трошак покретања мења за изолацију серверске петље догађаја, а не за смањење укупне употребе CPU-а.

### Корисни садржаји (упити и довршења)

Извоз подразумевано садржи само поља сажетка која приказује **листа** евиденција. Укључивање опције
**Извези упите и одговоре** (`includeBodies`) додатно шаље оно што окно **детаља**
евиденције приказује за сваки позив:

| Поље                             | Шта садржи                                                      |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | Корисне садржаје позива онако како их контролна табла приказује |
| `pipeline_route_decision`        | Које је одредиште и модел рутер изабрао                         |
| `pipeline_client_request`        | Необрађени захтев тачно онако како га је клијент послао         |
| `pipeline_openai_request`        | Након превођења у интерни OpenAI формат                         |
| `pipeline_provider_request`      | Како је заиста послат узводно, у дијалекту добављача            |
| `pipeline_provider_response`     | Необрађени узводни одговор                                      |
| `pipeline_client_response`       | Оно што је враћено позиваоцу                                    |
| `pipeline_error`                 | Детаљи грешке на нивоу процесног тока за неуспели позив         |
| `bodies_truncated`               | True када било које горенаведено поље достигне `maxBodyBytes`   |

Ово је садржај упита, па је **подразумевано искључен** и намерно се бира засебно за свако одредиште.
Шаље се оно што контролна табла приказује, јер извоз и `getCallLogById` деле исти начин
разрешавања детаља: корисни садржаји су
већ очишћени од PII података и тајне вредности су редиговане када се уписују, а позив упућен помоћу
`noLog` API кључа уопште не чува корисни садржај, па нема шта да се извезе.

Корисни садржаји се читају за сваки ред из артефакта у систему датотека, тако да се хидратација извршава само за одредишта
која су је затражила. Ако артефакт недостаје или је оштећен, извози се његов сажетак са null корисним садржајима,
уместо да серија не успе и показивач остане заглављен.

`maxBodyBytes` (подразумевано 262144) ограничава свако поље. Дужи корисни садржаји се **скраћују уместо
да буду одбачени** — скраћени упит и даље даје одговор на питање „шта је затражено“ — а ред се означава пољем
`bodies_truncated`. Делови који се током стримовања преносе део по део не извозе се; састављени одговор се
већ налази у `pipeline_provider_response` и `pipeline_client_response`.

---

## 2. Датотеке

| Део                             | Локација                                     |
| ------------------------------- | -------------------------------------------- |
| Уговор одредишта                | `src/lib/logExport/types.ts`                 |
| Регистар                        | `src/lib/logExport/registry.ts`              |
| Руковање тајнама                | `src/lib/logExport/secrets.ts`               |
| Покретач (родитељски IPC)       | `src/lib/logExport/runner.ts`                |
| Животни циклус процеса          | `src/lib/logExport/childRunner.ts`           |
| Улазна тачка подређеног процеса | `src/lib/logExport/exportChild.ts`           |
| Отварач само за читање          | `src/lib/db/logExportReadOnly.ts`            |
| Заједнички упит/мапирање        | `src/lib/usage/callLogExportQueries.ts`      |
| Разрешавач детаља               | `src/lib/usage/callLogDetailResolver.ts`     |
| API пројекција                  | `src/lib/logExport/presenter.ts`             |
| BigQuery одредиште              | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA аутентификација       | `src/lib/logExport/googleServiceAccount.ts`  |
| Извор евиденције позива         | `src/lib/usage/callLogExportSource.ts`       |
| Перзистенција                   | `src/lib/db/logExportDestinations.ts`        |
| Cron задатак                    | `src/lib/jobs/logExportJob.ts`               |
| REST слој                       | `src/app/api/log-export/`                    |
| Страница контролне табле        | `src/app/(dashboard)/dashboard/log-export/`  |

Шема: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Све руте су заштићене управљачком аутентификацијом (`requireManagementAuth`). Тајне се никада не враћају:
сачувана тајна се враћа као литерал `__stored__`, а слање те вредности назад приликом ажурирања
задржава сачувани акредитив.

Прављење или ажурирање одредишта чији тип декларише тајну **захтева
`STORAGE_ENCRYPTION_KEY`**. Без њега је `encrypt()` тихи пролаз без измена, па се упис
одбија статусом 400 уместо да се акредитив стави у SQLite као обичан текст (исту заштиту
примењује Telegram webhook).

| Метод    | Путања                                   | Сврха                                                       |
| -------- | ---------------------------------------- | ----------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Типови одредишта + листа њихових конфигурационих поља       |
| `GET`    | `/api/log-export/destinations`           | Листа одредишта (тајне су редиговане)                       |
| `POST`   | `/api/log-export/destinations`           | Прављење одредишта                                          |
| `GET`    | `/api/log-export/destinations/{id}`      | Читање једног одредишта                                     |
| `PUT`    | `/api/log-export/destinations/{id}`      | Ажурирање назива / омогућености / конфигурације / груписања |
| `DELETE` | `/api/log-export/destinations/{id}`      | Брисање                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Провера акредитива, без уписивања                           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Пражњење одмах, истом путањом као заказано извршавање       |
| `GET`    | `/api/log-export/status`                 | Стање Cron-а, недавна извршавања, заостатак по циљу         |

`GET /api/log-export/types` чини кориснички интерфејс генеричким: образац контролне табле се приказује на основу
враћених дескриптора поља, тако да ново одредиште не захтева измену корисничког интерфејса.

---

## 4. BigQuery одредиште

Конфигурациони кључеви (`type: "bigquery"`):

| Кључ                 | Напомене                                                                   |
| -------------------- | -------------------------------------------------------------------------- |
| `projectId`          | GCP пројекат који садржи скуп података                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                            |
| `location`           | Користи се само када скуп података мора да се направи (подразумевано `EU`) |
| `serviceAccountJson` | Кључ услужног налога. Тајна: шифрована у мировању, никада се не враћа      |
| `autoCreate`         | Прављење скупа података и табеле при првом извозу (подразумевано `true`)   |

Услужном налогу је потребна дозвола `bigquery.tables.updateData` над циљном табелом, као и
`bigquery.datasets.create` / `bigquery.tables.create` када је `autoCreate` укључен.

Конфигурисана група је јединица **курсора**, а не HTTP-а: `send()` је дели на `insertAll`
позиве од највише 500 редова, тако да велика вредност `batch_size` не може да премаши BigQuery ограничење захтева од 10 MB.
Привремени статуси (408/429/500/502/503/504) покушавају се поново до три пута уз експоненцијално
одлагање, при чему се поново користе исти insertIds; грешке аутентификације и шеме изазивају изузетак при првом покушају,
уместо да непотребно троше извршавање.

Табела направљена пре неколико тренутака још није видљива крајњој тачки за стримовање, која
неколико секунди враћа 404. Тај 404 се поново покушава, али **само када је ово извршавање направило табелу** —
табела која заиста недостаје и даље одмах изазива грешку. Имајте у виду да поновно прављење табеле под називом који
је недавно обрисан доводи до тога да BigQuery неколико минута одбија стримоване уносе; то је
својство поступка брисања па поновног прављења, зато радије користите нов назив табеле него да је избришете и поново додате.

**Делимичан неуспех стиже као HTTP 200 са непразним `insertErrors[]`.** То се третира као
неуспех и изазива изузетак, чиме се спречава да курсор напредује преко редова које BigQuery никада није
прихватио; `tests/unit/log-export-bigquery.test.ts` фиксира ово понашање.

Транспорт користи обичан REST — самопотписана RS256 тврдња размењује се за приступни токен на
`https://oauth2.googleapis.com/token`, а затим редови одлазе у `tabledata.insertAll`. Ниједан Google SDK се
не укључује. Приступни токени се кеширају унутар процеса за сваки пар (услужни налог, опсег).

Направљена табела садржи по једну колону за свако поље картице Logs, као и `exported_at`, и организована је
према начину на који се евиденције позива заиста упитују:

- **Партиционисана по дану на основу `timestamp`**, тако да упит ограничен датумом скенира само те дане.
- **Кластерована по `api_key_name`, `provider`, `model`, `status`** (тим редоследом), тако да филтрирање према
  томе ко је извршио позив, куда је отишао или да ли је био неуспешан одбацује блокове унутар сваке партиције. BigQuery
  дозвољава највише четири колоне за кластеровање и редослед је битан: филтер само по `api_key_name`
  одбацује блокове, док филтер само по `status` то не чини.
- **Опционално задржавање партиција** путем `partitionExpirationDays` (0 задржава све), које се примењује
  приликом прављења табеле.

Обе поставке се примењују у тренутку креирања. Постојећа табела задржава распоред који већ има, па
усмерите одредиште на нови ID табеле ако желите да их примените.

`tests/unit/log-export-bigquery.test.ts` проверава да ли мапер и шема табеле остају
усклађени, тако да нова колона евиденције позива не може неприметно да буде изостављена приликом извоза.

Пакети се деле на делове према **оба** критеријума: броју редова и броју бајтова након серијализације. Сам број редова није довољан
када се извозе корисни садржаји: 500 редова који садрже упите могу заузимати десетине мегабајта, а insertAll
одбија захтев већи од 10 MB. Део се затвара када достигне 500 редова или 9 MB, шта год се прво догоди.

---

## 5. Dodavanje odredišta

1. Kreirajte `src/lib/logExport/destinations/<name>.ts` koji izvozi `LogExportDestinationType`:
   Zod `configSchema`, niz deskriptora `fields` za korisnički interfejs, `secretFields` i
   `createClient(config)` koji vraća `test()` / `prepare()` / `send(records)`.
2. Dodajte ga u niz `DESTINATIONS` u datoteci `src/lib/logExport/registry.ts`.
3. Napišite testove u direktorijumu `tests/unit/`.

To je cela izmena: sloj za perzistenciju, cron zadatak, REST sloj, šifrovanje tajnih podataka i
obrazac na kontrolnoj tabli koriste registar.

Dva pravila za novo odredište:

- `send()` **mora da izazove izuzetak** pri delimičnom neuspehu. Uspešno izvršenje znači „odredište ima ove redove“,
  a kursor se trajno pomera iza njih.
- Odredište koje prihvata URL koji je uneo korisnik mora da ga validira pomoću
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) pre slanja zahteva,
  na isti način kao webhook-ovi. BigQuery ovo ne zahteva: njegovi hostovi su konstante.

---

## 6. Upravljanje

- **Kontrolna tabla**: Integracije → Izvoz evidencije. Dodajte odredište, pokrenite **Test** da proverite pristupne podatke
  bez upisivanja redova, a zatim ga omogućite.
- **Zaostali redovi**: svaka kartica odredišta prikazuje redove na čekanju i kursor; `GET
/api/log-export/status` vraća iste podatke, kao i poslednjih 20 izvršavanja zadatka.
- **Neuspeh jednog odredišta ne uzrokuje neuspeh ostalih** — rezime izvršavanja beleži status svakog odredišta
  u `last_status` / `last_error`, dok istorija izvršavanja zadatka čuva zbirne podatke.
- **Brisanjem odredišta briše se i njegov kursor.** Ponovno dodavanje počinje od najstarije sačuvane
  evidencije poziva, čime se ponovo šalju redovi koje odredište možda već sadrži. U BigQuery-ju `insertId`
  svakog reda sprečava duplikate samo unutar BigQuery-jevog sopstvenog vremenskog okvira za uklanjanje duplikata,
  pa je bolje onemogućiti odredište nego ga izbrisati.
