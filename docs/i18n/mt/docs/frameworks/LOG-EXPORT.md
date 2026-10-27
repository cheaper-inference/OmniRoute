# Log export (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Esportazzjoni kontinwa u inkrementali tar-reġistri tas-sejħiet ta’ OmniRoute lejn maħżen estern tal-analitika.

It-tab tad-dashboard Logs iżomm l-istorja tat-talbiet f’SQLite (`call_logs`), li hija limitata mir-
rotazzjoni u ż-żamma. L-esportazzjoni tar-reġistri tibgħat l-istess sett ta’ rekords skont skeda sabiex ikun jista’ jibqa’ jeżisti lil hinn
mid-database lokali u jingħaqad ma’ data oħra. BigQuery hija l-ewwel destinazzjoni; il-
pipeline huwa reġistru, għalhekk jistgħu jiżdiedu aktar destinazzjonijiet.

---

## 1. Kif jaħdem

```
server (jiddeċifra + jivvalida l-konfigurazzjoni, jirrikonċilja l-cursor)
  → jibda l-IPC → proċess OS exportChild iżolat
    → storage.sqlite għall-qari biss → query/immappjar kondiviż tar-reġistru tas-sejħiet
      → idratazzjoni asinkronika tal-artefatti → prepare()/send() tad-destinazzjoni
        → IPC tal-lott → is-server jippersisti l-cursor → IPC ta' konferma
          → il-lott li jmiss; IPC ta' tlestija → is-server jirreġistra s-suċċess
```

- **Skeda** — job cron wieħed ta' `JobRegistry`, `log_export`, li awtomatikament ikun
  `0 * * * *` (kull siegħa, UTC). Irreġistrat f'`src/lib/initCloudSync.ts`; jista' jinbidel
  b'`OMNIROUTE_LOG_EXPORT_CRON`. Kull eżekuzzjoni tbattal kull destinazzjoni **attivata**,
  waħda wara l-oħra.
- **Cursor** — il-`call_logs.rowid` impliċitu ta' SQLite, ippersistit għal kull destinazzjoni
  f'`log_export_destinations.cursor_row_id`. `timestamp` deliberatament mhuwiex il-cursor:
  min jagħmel is-sejħa jista' jipprovdi l-valur tiegħu stess, għalhekk talba bil-mod tista'
  tinkiteb wara waħda aktar mgħaġġla li bdiet aktar tard, u cursor ibbażat fuq timestamp
  jaqbiżha.
- **Tqassim f'lottijiet** — `batch_size` ringieli għal kull talba (default 500),
  `max_rows_per_run` ringieli għal kull eżekuzzjoni (default 10000), sabiex xogħol pendenti
  kbir jitbattal fuq diversi eżekuzzjonijiet minflok jimblokka waħda.
- **Kunsinna** — il-cursor javvanza biss wara li `send()` jiġi riżolt. Lott li jfalli jħalli
  l-cursor fejn kien, għalhekk l-istess ringieli jerġgħu jiġu ppruvati fl-eżekuzzjoni li jmiss.
  Il-garanzija hija kunsinna mill-inqas darba flimkien ma' eliminazzjoni tad-duplikati min-naħa
  tad-destinazzjoni, mhux eżattament darba waħda: BigQuery jidentifika kull ringiela permezz
  tal-id tar-reġistru tas-sejħiet, li jirrispetta fuq bażi tal-aħjar sforz matul it-tieqa
  interna tiegħu għat-tneħħija tad-duplikati.
- **Protezzjoni kontra sovrapożizzjoni** — l-eżekuzzjoni cron u `POST .../run` jistgħu
  jattivaw ruħhom flimkien. Destinazzjoni li diġà qiegħda titbattal tinqabeż minflok titbattal
  darbtejn (`skipped: true` fir-riżultat tal-eżekuzzjoni), sabiex eżekuzzjoni konkorrenti ma
  tkunx tista' terġa' tibgħat lott jew tikteb il-cursor lura.
- **Irkupru wara tindif** — jekk `cursor_row_id` jispiċċa ogħla minn `MAX(rowid)` (it-tabella
  kollha tkun tnaddfet u r-rowids reġgħu bdew mill-bidu), ir-runner jerġa' lura għal 0 minflok
  jibqa' għami b'mod permanenti.

### Runner iżolat u limiti

Kull eżekuzzjoni ta' destinazzjoni fuq Node tibda proċess child separat u b'ħajja qasira
tas-sistema operattiva (`child_process` bl-IPC, mhux `worker_threads`). Il-qari tal-body,
il-parsing/is-serializzazzjoni tal-JSON tal-payload, `prepare()` tad-destinazzjoni u l-I/O
tan-network tad-destinazzjoni kollha jitħaddmu hemmhekk, mhux fuq l-event loop tas-server.
Il-konfigurazzjoni u messaġġi żgħar tal-progress biss jgħaddu mill-IPC; ir-rekords esportati
qatt ma jirritornaw lis-server. Il-job cron u r-rotta Run now iżommu l-istess riżultat pubbliku
u protezzjoni kontra s-sovrapożizzjoni.

Il-proċess child jiftaħ il-`DATA_DIR/storage.sqlite` riżolt tas-server għall-qari biss bl-użu
ta' `node:sqlite`, b'`busy_timeout=5000` u `query_only=ON`. Ma jimporta l-ebda singleton
tad-DB u ma jwettaq l-ebda migrazzjoni, backup jew aġġornament ta' SQLite. Iż-żamma tar-rekords
ta' artefatti neqsin/bil-ħsara (inkluż l-UPDATE tal-artefatt bil-ħsara) tibqa' biss fil-mogħdija
tad-dettalji tad-dashboard. Iż-żewġ mogħdijiet jużaw l-istess risolvitur pur tad-dettalji;
l-esportazzjoni tuża qari asinkroniku mis-sistema tal-fajls u l-istess ordni ta' riżoluzzjoni:
artefatt → inline legacy → disk legacy → xejn. Eżekuzzjoni tieħu snapshot tal-ogħla rowid
ta' inserzjoni meta l-proċess child jiftaħ ir-reader tiegħu; inserzjonijiet ta' wara jistennew
sal-eżekuzzjoni li jmiss. Dan huwa limitu ta' inserzjoni, mhux tranżazzjoni SQLite fit-tul:
il-writers u ċ-checkpoints ta' WAL jibqgħu ħielsa waqt l-istennija tan-network.
L-aġġornamenti/it-tħassir ta' ringieli eżistenti ma jiġux iffriżati minn dan il-limitu.

Wara kull lott aċċettat, il-proċess child jistenna konferma. Is-server l-ewwel jippersisti
l-cursor b'`advanceLogExportCursor`, imbagħad jibgħat `ack`; l-ebda lott sussegwenti ma jibda
qabel dan. Falliment fit-trażmissjoni, crash jew timeout jirreġistra falliment mingħajr ma
javvanza dak il-lott. Lottijiet ikkonfermati qabel jibqgħu kkommettuti; l-iktar lott wieħed
mhux ikkonfermat jista' jerġa' jintbagħat. Is-suċċess jiġi rreġistrat biss wara `done` u ħruġ
nadif tal-proċess child. Il-fallimenti jitterminaw il-proċess child b'SIGTERM, u jeskalaw għal
SIGKILL wara 500 ms, filwaqt li r-runner jistenna li jingħalaq il-proċess.

| Varjabbli tal-ambjent                         | Default | Għan                                         |
| --------------------------------------------- | ------- | -------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | Limitu ta' ħin reali għal kull destinazzjoni |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | Limitu tal-old-space V8 tal-child f'MB       |

Valuri invalidi/mhux pożittivi/mhux sħaħ jużaw il-valuri default. Is-setting tal-heap mhuwiex
limitu RSS totali; lottijiet kbar ħafna xorta jistgħu jeżawrixxu l-memorja tal-proċess child
u jġiegħlu l-eżekuzzjoni tfalli b'mod sikur. Il-valur default ta' 1024 MB iħalli spazju żejjed
għal-lott default ta' 500 ringiela b'artefatti ta' 512 KiB meta l-bodies ikunu attivati,
inkluża s-serializzazzjoni JSON ta' BigQuery maqsuma f'biċċiet ta' bytes. Dan ma jagħmilx
lott ta' 10000 ringiela bil-bodies sikur. L-eżawriment tal-heap ta' V8 jirreġistra falliment
li fuqu tista' tittieħed azzjoni: naqqas id-daqs tal-lott jew żid
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; il-cursor jibqa' fl-aħħar lott ikkonfermat.
Il-bodies storiċi inline/fuq id-disk mhumiex koperti mil-limitu modern tal-artefatti.
L-operaturi għandhom jallokaw l-RSS separatament, speċjalment ġewwa containers b'memorja
limitata.

Il-proċess child jiret biss il-`DATA_DIR` riżolt, `NODE_ENV`, `TZ` espliċitu (għar-riżoluzzjoni
legacy tal-ħin lokali fl-ismijiet tal-fajls), `ELECTRON_RUN_AS_NODE` meta jkun preżenti, u
l-inputs outbound li ġejjin: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (u l-forom
tagħhom b'ittri żgħar), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`,
`SSL_CERT_FILE`, `SSL_CERT_DIR`. Dispatcher globali ta' Undici juża l-istess riżoluzzjoni pura
tal-proxy tal-ambjent tas-server u r-regoli biex jiġu evitati proxies għal hosts lokali,
inkluż `NO_PROXY`; ma jimportax `proxyFetch.ts` jew il-flags tiegħu tad-DB/karatteristiċi.
Il-kredenzjali tal-proxy jitneħħew mill-output mibgħut u mill-iżbalji rreġistrati.
Il-kredenzjali tad-destinazzjoni jgħaddu biss f'messaġġ IPC wieħed tal-bidu, qatt f'argv jew
fl-ambjent; it-twassil tal-output/iżbalji jingħata prefiss u jiġi ssanitizzat.
`ExperimentalWarning` biss jiġi diżattivat fl-argumenti exec tal-proċess child sabiex ma
tirrepetix it-twissija SQLite ta' Node ma' kull eżekuzzjoni cron; tipi oħra ta' twissijiet
jibqgħu viżibbli.

Il-moduli tad-destinazzjoni jridu jkunu importabbli mingħajr dipendenzi ta’ Next.js jew dipendenzi
għas-server biss. L-implimentazzjoni eżistenti ta’ BigQuery diġà tissodisfa dak il-kuntratt. Il-caches
tat-tokens tal-aċċess idumu biss tul l-eżekuzzjoni tal-proċess sekondarju, mhux bejn eżekuzzjoni u oħra.
Node huwa r-runtime appoġġjat (`package.json` engines), iżda t-taqsima tal-installazzjoni ta’ Bun
fir-README u `Dockerfile.bun` jirreklamaw ukoll rotta ta’ kompatibbiltà għall-produzzjoni li tuża
`bun:sqlite` (`src/lib/db/core.ts` / adapters). Għalhekk, taħt Bun, l-esportazzjonijiet iżommu r-rotta
preċedenti fl-istess proċess u joħorġu twissija ta’ darba: l-iżolament tal-heap/tal-timeout tal-proċess
sekondarju mhuwiex disponibbli. Uża Node għall-iżolament tal-event loop u tal-OOM; hawnhekk Bun
mhuwiex meqjus bħala għall-iżvilupp biss.

Meta `includeBodies` ikun attivat, ippreferi frekwenza ta’ kull ftit minuti bħal
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` minflok takkumula xogħol b’lura ta’ payloads għal siegħa
sħiħa. Il-limiti tal-batches u tar-ringieli xorta jillimitaw kull eżekuzzjoni. L-ispiża tal-istartjar
tal-proċess titħallas għal kull destinazzjoni f’kull eżekuzzjoni; dan jissagrifika spiża żgħira
tal-istartjar għall-iżolament mill-event loop tas-server, mhux għal tnaqqis fl-użu totali tas-CPU.

### Payloads (promptijiet u komplezzjonijiet)

B’mod awtomatiku, l-esportazzjoni tinkludi biss l-oqsma tas-sommarju li turi l-**lista**
tal-Logs. Meta tattiva **Esporta l-promptijiet u t-tweġibiet** (`includeBodies`), jintbagħat ukoll
dak li juri l-ħġieġa tad-**dettalji** tal-Logs għal kull sejħa:

| Qasam                            | X’fih                                                             |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | Il-payloads tas-sejħa kif jurihom id-dashboard                    |
| `pipeline_route_decision`        | Liema mira u mudell għażel ir-router                              |
| `pipeline_client_request`        | It-talba mhux ipproċessata eżatt kif bagħatha l-klijent           |
| `pipeline_openai_request`        | Wara t-traduzzjoni għall-forma interna ta’ OpenAI                 |
| `pipeline_provider_request`      | Kif intbagħtet effettivament upstream, fid-djalett tal-fornitur   |
| `pipeline_provider_response`     | It-tweġiba mhux ipproċessata minn upstream                        |
| `pipeline_client_response`       | Dak li ngħata lura lil min għamel is-sejħa                        |
| `pipeline_error`                 | Dettalji tal-iżball fil-livell tal-pipeline għal sejħa li falliet |
| `bodies_truncated`               | Veru meta xi qasam hawn fuq laħaq `maxBodyBytes`                  |

Dan huwa kontenut tal-prompt, għalhekk huwa **diżattivat b’mod awtomatiku** u intenzjonalment
huwa għażla għal kull destinazzjoni. Dak li jintbagħat huwa dak li juri d-dashboard, għax
l-esportazzjoni u `getCallLogById` jużaw l-istess riżoluzzjoni tad-dettalji: il-payloads ikunu
diġà tneħħitilhom il-PII u ġew mgħottija fihom is-sigrieti meta jinkitbu, u sejħa magħmula b’ċavetta
tal-API `noLog` ma taħżen l-ebda payload, għalhekk ma jkun hemm xejn x’jiġi esportat.

Il-payloads jinqraw ringiela b’ringiela mill-artifatt tas-sistema tal-fajls, għalhekk l-idratazzjoni
ssir biss għad-destinazzjonijiet li talbuha. Artifatt nieqes jew korrott jesporta s-sommarju tiegħu
b’payloads nulli minflok ifalli l-batch u jħalli l-cursor imwaħħal.

`maxBodyBytes` (il-valur awtomatiku huwa 262144) jillimita kull qasam. Payloads itwal jiġu
**maqtugħa minflok eliminati** — prompt maqtugħ xorta jwieġeb “x’intalab” — u r-ringiela tiġi
mmarkata b’`bodies_truncated`. Id-deltas imxandra biċċa biċċa ma jiġux esportati; it-tweġiba
assemblata diġà tinsab f’`pipeline_provider_response` u `pipeline_client_response`.

---

## 2. Fajls

| Komponent                      | Post                                         |
| ------------------------------ | -------------------------------------------- |
| Kuntratt tad-destinazzjoni     | `src/lib/logExport/types.ts`                 |
| Reġistru                       | `src/lib/logExport/registry.ts`              |
| Ġestjoni tas-sigrieti          | `src/lib/logExport/secrets.ts`               |
| Eżekutur (IPC ġenitur)         | `src/lib/logExport/runner.ts`                |
| Ċiklu tal-ħajja tal-proċess    | `src/lib/logExport/childRunner.ts`           |
| Punt tad-dħul tal-proċess wild | `src/lib/logExport/exportChild.ts`           |
| Opener għall-qari biss         | `src/lib/db/logExportReadOnly.ts`            |
| Mistoqsija/immappjar kondiviżi | `src/lib/usage/callLogExportQueries.ts`      |
| Riżolvitur tad-dettalji        | `src/lib/usage/callLogDetailResolver.ts`     |
| Projezzjoni tal-API            | `src/lib/logExport/presenter.ts`             |
| Destinazzjoni BigQuery         | `src/lib/logExport/destinations/bigquery.ts` |
| Awtentikazzjoni Google SA      | `src/lib/logExport/googleServiceAccount.ts`  |
| Sors tar-reġistru tas-sejħiet  | `src/lib/usage/callLogExportSource.ts`       |
| Persistenza                    | `src/lib/db/logExportDestinations.ts`        |
| Kompitu cron                   | `src/lib/jobs/logExportJob.ts`               |
| Saff REST                      | `src/app/api/log-export/`                    |
| Paġna tad-dashboard            | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Ir-rotot kollha huma awtentikati għall-ġestjoni (`requireManagementAuth`). Is-sigrieti qatt ma jintbagħtu lura:
sigriet maħżun jintbagħat lura bħala l-valur litterali `__stored__`, u jekk dan il-valur jerġa' jintbagħat f'aġġornament
il-kredenzjali maħżuna tinżamm.

Il-ħolqien jew l-aġġornament ta' destinazzjoni li t-tip tagħha jiddikjara sigriet **jeħtieġ
`STORAGE_ENCRYPTION_KEY`**. Mingħajrha, `encrypt()` sempliċement jgħaddi l-valur mingħajr tibdil u mingħajr twissija, għalhekk il-kitba
tiġi rrifjutata b'400 minflok ma titqiegħed kredenzjali fi SQLite bħala test mhux kriptat (l-istess protezzjoni li
japplika l-webhook ta' Telegram).

| Metodu   | Mogħdija                                 | Għan                                                                     |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Tipi ta' destinazzjoni + il-lista tal-oqsma tal-konfigurazzjoni tagħhom  |
| `GET`    | `/api/log-export/destinations`           | Elenka d-destinazzjonijiet (is-sigrieti moħbija)                         |
| `POST`   | `/api/log-export/destinations`           | Oħloq destinazzjoni                                                      |
| `GET`    | `/api/log-export/destinations/{id}`      | Aqra waħda                                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aġġorna l-isem / l-istat attivat / il-konfigurazzjoni / ir-raggruppament |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ħassar                                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | Ittestja l-kredenzjali, mingħajr ma tikteb xejn                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Battal issa, bl-istess mogħdija bħall-eżekuzzjoni skedata                |
| `GET`    | `/api/log-export/status`                 | Stat tal-cron, eżekuzzjonijiet riċenti, xogħol pendenti għal kull mira   |

`GET /api/log-export/types` huwa dak li jagħmel l-UI ġenerika: il-formola tad-dashboard tiġi rrendjata mid-deskrizzjonijiet
tal-oqsma mibgħuta lura, għalhekk destinazzjoni ġdida ma teħtieġ ebda bidla fl-UI.

---

## 4. Destinazzjoni BigQuery

Ċwievet tal-konfigurazzjoni (`type: "bigquery"`):

| Ċavetta              | Noti                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------- |
| `projectId`          | Il-proġett GCP li fih jinsab id-dataset                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                                        |
| `location`           | Tintuża biss meta d-dataset ikollu jinħoloq (valur predefinit `EU`)                    |
| `serviceAccountJson` | Ċavetta tal-kont tas-servizz. Sigriet: kriptata waqt il-ħażna, qatt ma tintbagħat lura |
| `autoCreate`         | Oħloq id-dataset u t-tabella mal-ewwel esportazzjoni (valur predefinit `true`)         |

Il-kont tas-servizz jeħtieġ `bigquery.tables.updateData` fuq it-tabella fil-mira, flimkien ma'
`bigquery.datasets.create` / `bigquery.tables.create` meta `autoCreate` jkun attivat.

Lott ikkonfigurat huwa unità tal-**cursor**, mhux waħda HTTP: `send()` jaqsmu f'sejħiet insertAll
ta' mhux aktar minn 500 ringiela, għalhekk `batch_size` kbir ma jistax jaqbeż il-limitu ta' 10 MB għal talba ta' BigQuery.
L-istatus temporanji (408/429/500/502/503/504) jerġgħu jiġu ppruvati sa tliet darbiet b'dewmien
esponenzjali, bl-istess insertIds jerġgħu jintużaw; il-fallimenti tal-awtentikazzjoni u tal-iskema joħolqu eċċezzjoni mal-ewwel tentattiv minflok
ma jaħlu l-eżekuzzjoni.

Tabella li tkun għadha kemm inħolqot ma tkunx għadha viżibbli għall-endpoint tal-istreaming, li jirrispondi
b'404 għal ftit sekondi. Dak l-404 jerġa' jiġi ppruvat, iżda **biss meta din l-eżekuzzjoni tkun ħolqot it-tabella** —
tabella li tkun tassew nieqsa xorta tfalli minnufih. Innota li l-ħolqien mill-ġdid ta' tabella taħt isem li
reċentement tħassar iwassal biex BigQuery jirrifjuta inserts permezz ta' streaming għal diversi minuti; din hija
karatteristika tat-tħassir segwit mill-ħolqien mill-ġdid, għalhekk ippreferi isem ġdid għat-tabella minflok tħassar u terġa' żżid waħda.

**Falliment parzjali jasal bħala HTTP 200 b'`insertErrors[]` mhux vojt.** Dan jiġi ttrattat bħala
falliment u joħloq eċċezzjoni, li twaqqaf il-cursor milli javvanza lil hinn mir-ringieli li BigQuery qatt ma
aċċetta; `tests/unit/log-export-bigquery.test.ts` jiffissa dan l-aġir.

It-trasport juża REST sempliċi — asserzjoni RS256 iffirmata minnha nnifisha tiġi skambjata għal token ta' aċċess fuq
`https://oauth2.googleapis.com/token`, imbagħad ir-ringieli jintbagħtu lil `tabledata.insertAll`. Ma jiżdied ebda SDK ta'
Google. It-tokens ta' aċċess jinżammu fil-cache fil-proċess għal kull (kont tas-servizz, kamp ta' applikazzjoni).

It-tabella maħluqa jkollha kolonna waħda għal kull qasam fit-tab Logs flimkien ma' `exported_at`, u tkun organizzata skont
kif fil-fatt jiġu kkonsultati r-reġistri tas-sejħiet:

- **Maqsuma skont il-jum fuq `timestamp`**, sabiex mistoqsija limitata bid-data tiskannja biss dawk il-jiem.
- **Miġbura skont `api_key_name`, `provider`, `model`, `status`** (f'dik l-ordni), sabiex l-iffiltrar skont
  min eżegwiha, fejn marret, jew jekk fallietx jeskludi blokok f'kull partizzjoni. BigQuery
  jippermetti mhux aktar minn erba' kolonni ta' raggruppament u l-ordni hija importanti: filtru fuq `api_key_name` waħdu
  jeskludi, filwaqt li filtru fuq `status` waħdu ma jagħmilx dan.
- **Żamma fakultattiva tal-partizzjonijiet** permezz ta' `partitionExpirationDays` (0 iżomm kollox), applikata
  meta tinħoloq it-tabella.

Iż-żewġ settings japplikaw fil-ħin tal-ħolqien. Tabella eżistenti żżomm it-tqassim li diġà għandha, għalhekk
ippunta d-destinazzjoni lejn id ta' tabella ġdida jekk trid tadottahom.

`tests/unit/log-export-bigquery.test.ts` jiżgura li l-mapper u l-iskema tat-tabella jibqgħu
sinkronizzati, sabiex kolonna ġdida tar-reġistru tas-sejħiet ma tkunx tista' titħalla barra fis-skiet waqt l-esportazzjoni.

Il-lottijiet jinqasmu skont **kemm** l-għadd ta' ringieli **kif ukoll** il-bytes serializzati. L-għadd ta' ringieli waħdu mhuwiex biżżejjed
ladarba l-payloads jiġu esportati: 500 ringiela li jġorru prompts jistgħu jammontaw għal għexieren ta' megabytes, u insertAll
jirrifjuta talba ta' aktar minn 10 MB. Il-biċċiet jingħalqu meta jilħqu 500 ringiela jew 9 MB, skont liema jiġi l-ewwel.

---

## 5. Żieda ta' destinazzjoni

1. Oħloq `src/lib/logExport/destinations/<name>.ts` li jesporta `LogExportDestinationType`:
   `configSchema` ta' Zod, array ta' deskritturi `fields` għall-UI, `secretFields`, u
   `createClient(config)` li jirritorna `test()` / `prepare()` / `send(records)`.
2. Żidha mal-array `DESTINATIONS` f'`src/lib/logExport/registry.ts`.
3. Ikteb tests taħt `tests/unit/`.

Din hija l-bidla kollha: il-persistenza, il-job cron, is-saff REST, il-kriptaġġ tas-sigrieti u
l-formola tad-dashboard kollha jaqraw mir-reġistru.

Żewġ regoli għal destinazzjoni ġdida:

- `send()` **għandu joħroġ eċċezzjoni** f'każ ta' falliment parzjali. Jekk jitlesta b'suċċess, dan ifisser "id-destinazzjoni għandha dawn ir-ringieli",
  u l-cursor jgħaddi lil hinn minnhom b'mod permanenti.
- Destinazzjoni li tieħu URL ipprovdut mill-utent trid tivvalidah permezz ta'
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) qabel tagħmel fetch,
  bl-istess mod bħall-webhooks. BigQuery m'għandux bżonn dan: il-hosts tiegħu huma kostanti.

---

## 6. Kif tħaddmu

- **Dashboard**: Integrations → Log export. Żid destinazzjoni, ħaddem **Test** biex tiċċekkja l-kredenzjali
  mingħajr ma tikteb ringieli, imbagħad attivaha.
- **Backlog**: kull karta tad-destinazzjoni turi r-ringieli pendenti u l-cursor; `GET
/api/log-export/status` jirritorna l-istess ċifri flimkien mal-aħħar 20 eżekuzzjoni tal-job.
- **Destinazzjoni li tfalli ma ġġiegħelx lill-oħrajn ifallu** — is-sommarju tal-eżekuzzjoni jirreġistra l-istatus għal kull destinazzjoni
  f'`last_status` / `last_error`, u l-istorja tal-eżekuzzjonijiet tal-job iżżomm ir-riżultat aggregat.
- **Meta tħassar destinazzjoni, jitħassar il-cursor tagħha.** Jekk terġa' żżidha, tibda mill-eqdem
  call log miżmum, u għalhekk jerġgħu jintbagħtu ringieli li d-destinazzjoni jista' jkun li diġà għandha. Fuq BigQuery, il-`insertId`
  għal kull ringiela jassorbi dan biss fil-perjodu ta' deduplikazzjoni ta' BigQuery stess, għalhekk aħjar
  tiddiżattiva destinazzjoni milli tħassarha.
