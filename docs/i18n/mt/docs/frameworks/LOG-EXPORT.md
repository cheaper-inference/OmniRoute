# Log export (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Esportazzjoni kontinwa u inkrementali tar-reġistri tas-sejħiet ta’ OmniRoute lejn repożitorju estern tal-analitika.

It-tab Logs tad-dashboard iżżomm l-istorja tat-talbiet f’SQLite (`call_logs`), li hija limitata mir-
rotazzjoni u ż-żamma. L-esportazzjoni tar-reġistri tibgħat l-istess sett ta’ rekords skont skeda sabiex ikun jista’ jibqa’ jeżisti
wara d-database lokali u jiġi magħqud ma’ data oħra. BigQuery hija l-ewwel destinazzjoni; il-
pipeline hija reġistru, għalhekk jistgħu jiżdiedu aktar destinazzjonijiet.

---

## 1. Kif taħdem

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Skeda** — kompitu cron wieħed ta’ `JobRegistry`, `log_export`, bil-valur predefinit `0 * * * *` (kull siegħa,
  UTC). Irreġistrat f’`src/lib/initCloudSync.ts`; jista’ jinbidel permezz ta’ `OMNIROUTE_LOG_EXPORT_CRON`.
  Kull attivazzjoni tipproċessa r-rekords pendenti ta’ kull destinazzjoni **attivata**, b’mod sekwenzjali.
- **Cursor** — il-`call_logs.rowid` impliċitu ta’ SQLite, ippersistit għal kull destinazzjoni f’
  `log_export_destinations.cursor_row_id`. `timestamp` deliberatament mhuwiex il-cursor: min jagħmel is-sejħa
  jista’ jipprovdi l-valur tiegħu stess, għalhekk talba bil-mod tista’ tinkiteb wara waħda aktar mgħaġġla li bdiet
  aktar tard, u cursor ibbażat fuq timestamp jaqbiżha.
- **Lottijiet** — `batch_size` ringiela għal kull talba (500 b’mod predefinit), `max_rows_per_run` ringiela għal kull eżekuzzjoni
  (10000 b’mod predefinit), sabiex volum kbir ta’ rekords pendenti jiġi pproċessat fuq diversi attivazzjonijiet minflok jimblokka waħda.
- **Kunsinna** — il-cursor javvanza biss wara li `send()` jitlesta b’suċċess. Lott li jfalli jħalli l-
  cursor fejn kien, għalhekk l-istess ringieli jerġgħu jiġu ppruvati fl-eżekuzzjoni li jmiss. Il-garanzija hija
  mill-inqas darba flimkien ma’ deduplikazzjoni min-naħa tad-destinazzjoni, mhux eżattament darba b’mod assolut: BigQuery juża
  l-id tar-reġistru tas-sejħa bħala ċavetta għal kull ringiela, li jirrispetta fuq bażi tal-aħjar sforz fil-perjodu ta’ deduplikazzjoni tiegħu stess.
- **Protezzjoni kontra sovrappożizzjoni** — l-attivazzjoni cron u `POST .../run` jistgħu jseħħu flimkien. Destinazzjoni
  li diġà qed tiġi pproċessata tinqabeż minflok tiġi pproċessata darbtejn (`skipped: true` fir-riżultat tal-eżekuzzjoni),
  sabiex eżekuzzjoni konkorrenti ma tkunx tista’ terġa’ tibgħat lott jew tmexxi l-cursor lura.
- **Irkupru wara tħassir sħiħ** — jekk `cursor_row_id` jispiċċa ogħla minn `MAX(rowid)` (it-tabella kollha tkun
  tħassret u r-rowids ikunu reġgħu bdew), l-eżekutur jerġa’ jibda minn 0 minflok jibqa’ permanentement ma jsib xejn.

### Eżekutur iżolat u limiti

Kull eżekuzzjoni ta’ destinazzjoni fuq Node tibda proċess wild separat u ta’ ħajja qasira tas-sistema operattiva (`child_process`
b’IPC, mhux `worker_threads`). Il-qari tal-korp, l-analiżi/serjalizzazzjoni tal-payload JSON, id-destinazzjoni
`prepare()` u l-I/O tan-network tad-destinazzjoni kollha jitwettqu hemmhekk, mhux fuq iċ-ċiklu tal-avvenimenti tas-server.
Il-konfigurazzjoni u messaġġi żgħar ta’ progress biss jgħaddu minn IPC; ir-rekords esportati qatt ma jirritornaw lejn
is-server. Il-kompitu cron u r-rotta Run now iżommu l-istess riżultat pubbliku u protezzjoni kontra sovrappożizzjoni.

Il-proċess wild jiftaħ il-`DATA_DIR/storage.sqlite` riżolt tas-server għall-qari biss permezz ta’ `node:sqlite`,
b’`busy_timeout=5000` u `query_only=ON`. Ma jimporta ebda singleton tad-DB u ma jwettaq ebda
migrazzjoni, backup jew aġġornament ta’ SQLite. L-immaniġġjar ta’ rekords ta’ artefatti neqsin/korrotti (inkluż l-
UPDATE tal-artefatt korrott) jibqa’ biss fil-perkors tad-dettalji tad-dashboard. Iż-żewġ perkorsi jaqsmu resolver pur
tad-dettalji; l-esportazzjoni tuża qari asinkronu tas-sistema tal-fajls u l-istess ordni ta’ riżoluzzjoni: artefatt → legacy
inline → legacy disk → xejn. Eżekuzzjoni tieħu snapshot tar-rowid massimu tal-inserzjoni
meta l-proċess wild jiftaħ il-qarrej tiegħu; inserzjonijiet sussegwenti jistennew l-eżekuzzjoni li jmiss. Dan huwa limitu
tal-inserzjoni, mhux tranżazzjoni SQLite fit-tul: il-kittieba tal-WAL u ċ-checkpoints jibqgħu liberi waqt
l-istennijiet tan-network. Aġġornamenti/tħassir ta’ ringieli eżistenti ma jiġux iffriżati minn dan il-limitu.

Wara kull lott aċċettat, il-proċess wild jistenna konferma. Is-server l-ewwel jippersisti
l-cursor permezz ta’ `advanceLogExportCursor`, imbagħad jibgħat `ack`; ebda lott sussegwenti ma jibda qabel dan.
Falliment fit-trażmissjoni, crash jew timeout jirreġistra falliment mingħajr ma javvanza dak il-lott. Lottijiet
ikkonfermati qabel jibqgħu kkommettjati; l-aktar jista’ jerġa’ jintbagħat dak il-lott wieħed mhux ikkonfermat.
Is-suċċess jiġi rreġistrat biss wara `done` u ħruġ nadif tal-proċess wild. Il-fallimenti jitterminaw il-proċess wild
b’SIGTERM, u jgħaddu għal SIGKILL wara 500 ms, u l-eżekutur jistenna li jingħalaq il-proċess.

| Varjabbli tal-ambjent                         | Valur predefinit | Għan                                              |
| --------------------------------------------- | ---------------- | ------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000           | Limitu tal-ħin reali għal kull destinazzjoni      |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024             | Limitu tal-old-space ta’ V8 tal-proċess wild f’MB |

Valuri invalidi/mhux pożittivi/mhux interi jużaw il-valuri predefiniti. L-issettjar tal-heap mhuwiex limitu
totali tal-RSS; lottijiet kbar ħafna xorta jistgħu jeżawrixxu l-memorja tal-proċess wild u jfallu l-eżekuzzjoni b’mod sigur.
Il-valur predefinit ta’ 1024 MB iħalli marġni għal-lott predefinit ta’ 500 ringiela ta’ artefatti ta’ 512 KiB bil-
korpi attivati, inkluża s-serjalizzazzjoni JSON ta’ BigQuery f’biċċiet ibbażati fuq bytes. Dan ma jagħmilx
lott ta’ 10000 ringiela bil-korpi sigur. L-eżawriment tal-heap ta’ V8 jirreġistra falliment b’azzjoni ċara: naqqas id-daqs
tal-lott jew żid `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; il-cursor jibqa’ fl-aħħar
lott ikkonfermat. Il-korpi storiċi inline/fuq id-diska mhumiex koperti mil-limitu modern tal-artefatti.
L-operaturi għandhom jippjanaw l-RSS separatament, speċjalment f’containers b’memorja limitata.

Il-proċess wild jiret biss `DATA_DIR` riżolt, `NODE_ENV`, `TZ` espliċitu (riżoluzzjoni tal-ħin lokali
għal ismijiet ta’ fajls antiki), `ELECTRON_RUN_AS_NODE` meta jkun preżenti, u l-inputs li ġejjin għall-konnessjonijiet ’il barra:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (u l-forom tagħhom b’ittri żgħar),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Dispatcher globali ta’ Undici juża l-istess riżoluzzjoni tal-proxy bbażata biss fuq l-ambjent u l-istess regoli
għall-bypass tal-hosts lokali tas-server, inkluż `NO_PROXY`; ma jimportax `proxyFetch.ts` jew il-flags tiegħu għad-DB/funzjonalitajiet.
Il-kredenzjali tal-proxy jitneħħew mill-output mgħoddi u mill-iżbalji rreġistrati. Il-kredenzjali tad-destinazzjoni
jintbagħtu biss f’messaġġ IPC wieħed tal-bidu, qatt permezz ta’ argv jew tal-ambjent; l-output u l-iżbalji mgħoddija
jingħataw prefiss u jiġu sanitizzati. `ExperimentalWarning` biss jiġi diżattivat fl-argumenti tal-eżekuzzjoni tal-proċess wild biex jiġi evitat
li t-twissija ta’ Node dwar SQLite tiġi ripetuta ma’ kull eżekuzzjoni tal-cron; tipi oħra ta’ twissijiet jibqgħu viżibbli.

Il-moduli tad-destinazzjoni jridu jkunu jistgħu jiġu importati mingħajr dipendenzi ta’ Next.js/riservati għas-server. L-implimentazzjoni
eżistenti ta’ BigQuery diġà tissodisfa dak il-kuntratt. Il-caches tat-tokens tal-aċċess idumu biss għall-eżekuzzjoni
tal-proċess wild, mhux bejn eżekuzzjonijiet. Node huwa l-ambjent ta’ eżekuzzjoni appoġġjat (engines f’`package.json`), iżda t-taqsima
tal-installazzjoni ta’ Bun fir-README u `Dockerfile.bun` jirreklamaw ukoll mogħdija ta’ kompatibbiltà għall-produzzjoni bl-użu ta’
`bun:sqlite` (`src/lib/db/core.ts` / adapters). Għalhekk, taħt Bun, l-esportazzjonijiet iżommu l-mogħdija preċedenti
fl-istess proċess u joħorġu twissija darba biss: l-iżolament tal-heap/timeout tal-proċess wild mhuwiex disponibbli. Uża
Node għall-iżolament tal-event loop u ta’ OOM; Bun mhuwiex meqjus bħala riservat għall-iżvilupp hawnhekk.

Meta `includeBodies` ikun attivat, ippreferi frekwenza fuq livell ta’ minuti bħal
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` minflok tħalli jakkumula volum ta’ payloads għal siegħa sħiħa.
Il-limiti tal-lottijiet u tar-ringieli xorta jillimitaw kull eżekuzzjoni. L-ispiża tal-istartjar tal-proċess titħallas għal kull destinazzjoni f’kull eżekuzzjoni;
dan jibdel spiża żgħira tal-istartjar ma’ iżolament tal-event loop tas-server, mhux ma’ tnaqqis fl-użu totali tas-CPU.

### Payloads (prompts u tweġibiet)

B’mod awtomatiku, l-esportazzjoni tinkludi biss l-oqsma tas-sommarju li turi l-**lista** tar-Reġistri. Meta tattiva
**Esporta l-prompts u t-tweġibiet** (`includeBodies`), jintbagħat ukoll dak li turi l-panew tad-**dettall**
tar-Reġistri għal kull sejħa:

| Qasam                            | X’fih                                                             |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | Il-payloads tas-sejħa kif jurihom id-dashboard                    |
| `pipeline_route_decision`        | Liema mira u mudell għażel ir-router                              |
| `pipeline_client_request`        | It-talba mhux ipproċessata eżatt kif bagħatha l-klijent           |
| `pipeline_openai_request`        | Wara t-traduzzjoni fil-format intern ta’ OpenAI                   |
| `pipeline_provider_request`      | Kif fil-fatt intbagħtet lill-fornitur, fid-djalett tiegħu         |
| `pipeline_provider_response`     | It-tweġiba mhux ipproċessata mill-fornitur                        |
| `pipeline_client_response`       | Dak li ngħata lura lil min għamel is-sejħa                        |
| `pipeline_error`                 | Dettalji tal-iżball fil-livell tal-pipeline għal sejħa li falliet |
| `bodies_truncated`               | Veru meta xi qasam minn dawk ta’ hawn fuq laħaq `maxBodyBytes`    |

Dan huwa kontenut tal-prompts, għalhekk huwa **diżattivat b’mod awtomatiku** u deliberatament huwa għażla għal kull destinazzjoni.
Dak li jintbagħat huwa dak li juri d-dashboard, għax l-esportazzjoni u `getCallLogById` jużaw l-istess riżoluzzjoni
tad-dettalji: il-payloads ikunu
diġà sanitizzati minn PII u s-sigrieti jitneħħew meta jinkitbu, u sejħa magħmula b’ċavetta API
`noLog` ma taħżen ebda payload, għalhekk ma jkun hemm xejn x’tesporta.

Il-payloads jinqraw għal kull ringiela mill-artefatt tas-sistema tal-fajls, għalhekk il-popolazzjoni tad-data ssir biss għad-destinazzjonijiet
li talbuha. Artefatt nieqes jew korrott jesporta s-sommarju tiegħu b’payloads null minflok
ifalli l-lott u jħalli l-cursor imwaħħal.

`maxBodyBytes` (valur awtomatiku 262144) jillimita kull qasam. Payloads itwal jiġu **maqtugħin minflok
imwarrbin** — prompt imqassar xorta jwieġeb “x’intalab” — u r-ringiela tiġi mmarkata b’
`bodies_truncated`. Id-differenzi trażmessi biċċa biċċa ma jiġux esportati; it-tweġiba miġbura
diġà tinsab f’`pipeline_provider_response` u `pipeline_client_response`.

---

## 2. Fajls

| Komponent                          | Post                                         |
| ---------------------------------- | -------------------------------------------- |
| Kuntratt tad-destinazzjoni         | `src/lib/logExport/types.ts`                 |
| Reġistru                           | `src/lib/logExport/registry.ts`              |
| Ġestjoni tas-sigrieti              | `src/lib/logExport/secrets.ts`               |
| Eżekutur (IPC tal-proċess ġenitur) | `src/lib/logExport/runner.ts`                |
| Ċiklu tal-ħajja tal-proċess        | `src/lib/logExport/childRunner.ts`           |
| Punt tad-dħul tal-proċess wild     | `src/lib/logExport/exportChild.ts`           |
| Ftuħ għall-qari biss               | `src/lib/db/logExportReadOnly.ts`            |
| Mistoqsijiet/immappjar kondiviżi   | `src/lib/usage/callLogExportQueries.ts`      |
| Riżolvitur tad-dettalji            | `src/lib/usage/callLogDetailResolver.ts`     |
| Projezzjoni tal-API                | `src/lib/logExport/presenter.ts`             |
| Destinazzjoni BigQuery             | `src/lib/logExport/destinations/bigquery.ts` |
| Awtentikazzjoni Google SA          | `src/lib/logExport/googleServiceAccount.ts`  |
| Sors tar-reġistru tas-sejħiet      | `src/lib/usage/callLogExportSource.ts`       |
| Persistenza                        | `src/lib/db/logExportDestinations.ts`        |
| Kompitu Cron                       | `src/lib/jobs/logExportJob.ts`               |
| Saff REST                          | `src/app/api/log-export/`                    |
| Paġna tad-dashboard                | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Ir-rotot kollha jeħtieġu awtentikazzjoni tal-ġestjoni (`requireManagementAuth`). Is-sigrieti qatt ma jintbagħtu lura:
sigriet maħżun jintbagħat lura bħala l-valur litterali `__stored__`, u jekk dak il-valur jintbagħat lura waqt aġġornament
tinżamm il-kredenzjali maħżuna.

Il-ħolqien jew l-aġġornament ta' destinazzjoni li t-tip tagħha jiddikjara sigriet **jeħtieġ
`STORAGE_ENCRYPTION_KEY`**. Mingħajrha `encrypt()` jgħaddi d-data mingħajr tibdil u mingħajr twissija, għalhekk il-kitba tiġi
rrifjutata b'400 minflok ma titqiegħed kredenzjali f'SQLite bħala test mhux iċċifrat (l-istess protezzjoni li
japplika l-webhook ta' Telegram).

| Metodu   | Mogħdija                                 | Għan                                                                             |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipi ta' destinazzjoni + il-lista tal-oqsma tal-konfigurazzjoni tagħhom          |
| `GET`    | `/api/log-export/destinations`           | Elenka d-destinazzjonijiet (bis-sigrieti moħbija)                                |
| `POST`   | `/api/log-export/destinations`           | Oħloq destinazzjoni                                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | Aqra destinazzjoni waħda                                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aġġorna l-isem / l-attivazzjoni / il-konfigurazzjoni / l-ipproċessar f'lottijiet |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ħassar                                                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | Ittestja l-kredenzjali, mingħajr ma tikteb xejn                                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Ipproċessa l-pendenti kollha issa, bl-istess fluss bħall-eżekuzzjoni skedata     |
| `GET`    | `/api/log-export/status`                 | Stat ta' Cron, eżekuzzjonijiet reċenti, xogħol pendenti għal kull destinazzjoni  |

`GET /api/log-export/types` huwa dak li jagħmel l-UI ġenerika: il-formola tad-dashboard tinbena mid-
deskritturi tal-oqsma li jintbagħtu lura, għalhekk destinazzjoni ġdida ma teħtieġ ebda bidla fl-UI.

---

## 4. Destinazzjoni BigQuery

Ċwievet tal-konfigurazzjoni (`type: "bigquery"`):

| Ċavetta              | Noti                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------- |
| `projectId`          | Il-proġett GCP li fih is-sett tad-data                                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                                        |
| `location`           | Jintuża biss meta jrid jinħoloq is-sett tad-data (valur predefinit `EU`)               |
| `serviceAccountJson` | Ċavetta tal-kont tas-servizz. Sigrieta: kriptata meta maħżuna, qatt ma tintbagħat lura |
| `autoCreate`         | Oħloq is-sett tad-data u t-tabella mal-ewwel esportazzjoni (valur predefinit `true`)   |

Il-kont tas-servizz jeħtieġ `bigquery.tables.updateData` fuq it-tabella fil-mira, kif ukoll
`bigquery.datasets.create` / `bigquery.tables.create` meta `autoCreate` ikun attivat.

Lott ikkonfigurat huwa unità ta’ **cursor**, mhux waħda HTTP: `send()` jaqsmu f’sejħiet insertAll
ta’ mhux aktar minn 500 ringiela, sabiex `batch_size` kbir ma jkunx jista’ jaqbeż il-limitu ta’ 10 MB għal kull talba ta’ BigQuery.
L-istati tranżitorji (408/429/500/502/503/504) jerġgħu jiġu ppruvati sa tliet darbiet b’intervall
li jiżdied b’mod esponenzjali, bl-użu mill-ġdid tal-istess insertIds; il-fallimenti tal-awtentikazzjoni u tal-iskema jqajmu eċċezzjoni mal-ewwel tentattiv minflok
ikomplu jaħlu l-eżekuzzjoni.

Tabella li tkun għadha kemm inħolqot ma tkunx għadha viżibbli għall-endpoint tal-istreaming, li jwieġeb
404 għal ftit sekondi. Dak l-404 jerġa’ jiġi ppruvat, iżda **biss meta din l-eżekuzzjoni tkun ħolqot it-tabella** —
tabella li tkun tassew nieqsa xorta twassal għal falliment immedjat. Innota li jekk terġa’ toħloq tabella b’isem li
tħassar dan l-aħħar, BigQuery jirrifjuta inserzjonijiet bl-istreaming għal diversi minuti; din hija
karatteristika tat-tħassir segwit mill-ħolqien mill-ġdid, għalhekk agħżel isem ġdid għat-tabella minflok tħassarha u terġa’ żżidha.

**Falliment parzjali jasal bħala HTTP 200 b’`insertErrors[]` mhux vojt.** Dan jitqies bħala
falliment u jqajjem eċċezzjoni, u huwa dan li jwaqqaf il-cursor milli javvanza lil hinn minn ringieli li BigQuery qatt ma
aċċetta; `tests/unit/log-export-bigquery.test.ts` jivverifika din l-imġiba.

It-trasport juża REST sempliċi — asserzjoni RS256 iffirmata minnha nnifisha tiġi skambjata għal token ta’ aċċess fuq
`https://oauth2.googleapis.com/token`, imbagħad ir-ringieli jintbagħtu lil `tabledata.insertAll`. Ma jiddaħħal
ebda SDK ta’ Google. It-tokens ta’ aċċess jinżammu fil-cache fi ħdan il-proċess għal kull par (kont tas-servizz, ambitu).

It-tabella maħluqa jkollha kolonna waħda għal kull field tat-tab Logs flimkien ma’ `exported_at`, u tkun organizzata skont
kif fil-fatt isiru l-mistoqsijiet fuq ir-reġistri tas-sejħiet:

- **Maqsuma f’partizzjonijiet ta’ kuljum fuq `timestamp`**, sabiex mistoqsija limitata skont id-data tiskennja biss dawk il-jiem.
- **Miġbura fi clusters skont `api_key_name`, `provider`, `model`, `status`** (f’dik l-ordni), sabiex l-iffiltrar skont
  min wettaqha, fejn marret, jew jekk fallietx jeskludi blokok ġewwa kull partizzjoni. BigQuery
  jippermetti mhux aktar minn erba’ kolonni ta’ clustering u l-ordni hija importanti: filtru fuq `api_key_name` biss
  jeskludi blokok, filtru fuq `status` biss ma jagħmilx hekk.
- **Żamma fakultattiva tal-partizzjonijiet** permezz ta’ `partitionExpirationDays` (0 iżomm kollox), applikata
  meta tinħoloq it-tabella.

Iż-żewġ settings japplikaw fil-ħin tal-ħolqien. Tabella eżistenti żżomm l-organizzazzjoni li diġà għandha, għalhekk
ipponta d-destinazzjoni lejn id ta’ tabella ġdida jekk trid tadottahom.

`tests/unit/log-export-bigquery.test.ts` jivverifika li l-mapper u l-iskema tat-tabella jibqgħu
sinkronizzati, sabiex kolonna ġdida tar-reġistru tas-sejħiet ma tkunx tista’ titħalla barra fis-skiet waqt l-esportazzjoni.

Il-lottijiet jinqasmu f’biċċiet skont **kemm** l-għadd ta’ ringieli kif ukoll il-bytes serjalizzati. L-għadd ta’ ringieli waħdu mhuwiex biżżejjed
ladarba jiġu esportati l-payloads: 500 ringiela li jkun fihom prompts jistgħu jammontaw għal għexieren ta’ megabytes, u insertAll
jirrifjuta talba ta’ aktar minn 10 MB. Il-biċċiet jingħalqu meta jilħqu 500 ringiela jew 9 MB, skont liema jintlaħaq l-ewwel.

---

## 5. Destinazzjoni tat-traċċi OTLP/HTTP

Il-konfigurazzjoni tuża `type: "otlp-http"`. Din hija esportazzjoni skedata, ibbażata fuq cursor, tar-reġistri
persistenti tas-sejħiet, mhux id-destinazzjoni diretta tal-avvenimenti tar-routing li taħdem fuq bażi tal-aħjar sforz f’
`open-sse/services/routing/otel.ts`. Ma taqrax jew tibdel il-varjabbli tal-ambjent,
it-timers jew il-buffers ta’ dik id-destinazzjoni. Jekk tattiva t-tnejn, jistgħu jinħolqu żewġ tipi indipendenti ta’ spans;
uża l-ambitu tal-istrumentazzjoni `omniroute.log-export` biex tiddistingwi dawn l-ispans tar-reġistri tas-sejħiet.

| Ċavetta                  | Valur predefinit / għan                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `endpoint`               | URL HTTP(S) sħiħ għat-traċċi, obbligatorju; ma jiżdied ebda suffiss `/v1/traces`                      |
| `headers`                | Linji `Name: value` jew oġġett JSON ta’ strings, fakultattivi; kriptati                               |
| `requestHeaderAllowlist` | Vojta (diżattivata); ismijiet/prefissi tal-headers tal-klijent biex jinqabdu bħala attributi tal-span |
| `serviceName`            | `omniroute`; riżorsa `service.name`                                                                   |
| `langfuseMapping`        | `false`; iżid attributi ta’ ġenerazzjoni/sessjoni/utent ta’ Langfuse                                  |
| `identity`               | `pseudonymous`, `keyName`, jew `none`                                                                 |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                               |
| `timeoutMs`              | `30000` għal kull tentattiv HTTP                                                                      |
| `environment`            | Mhux issettjat; `langfuse.environment` fakultattiv                                                    |

Id-dashboard ġeneriku juri dawn l-oqsma. `paths` jaċċetta array tal-API jew żona tat-test
b’paths eżatti separati b’linji ġodda/virgoli. Embeddings, rerank u paths oħra
jinqabżu sakemm ma jkunux permessi espliċitament. Ir-ringieli maqbuża xorta javvanzaw il-cursor; il-counters
`exported`/`exportedTotal` tar-runner eżistenti jgħoddu r-ringieli tas-sors ipproċessati, inklużi r-ringieli
ffiltrati, aktar milli l-ispans aċċettati. L-iffiltrar isir fil-proċess sekondarju, mingħajr ma jinbidel
il-kuntratt IPC/cursor tiegħu.

Il-validazzjoni tal-URL tuża l-funzjoni awżiljarja `parseAndValidateNonMetadataUrl`, li ma tiddependix fuq DB, minn
`src/shared/network/outboundUrlGuard.ts`: il-politika `block-metadata`. Għandha l-istess
kontrolli inkondizzjonati tal-metadata/protokoll/kredenzjali inkorporati bħall-validatur tal-webhook
b’URLs privati permessi, iżda tippermetti deliberatament destinazzjonijiet localhost/LAN mingħajr
override globali permezz ta’ feature flag. Dan jippermetti endpoints ta’ Langfuse, Phoenix, Tempo u Collector
ospitati lokalment, inklużi endpoints HTTP privati. Hosts tal-metadata tal-cloud huma dejjem imblukkati.
Ir-ridirezzjonijiet ma jiġux segwiti, għalhekk collector ma jistax jirridirezzjona kredenzjali lejn host differenti.
Bħall-protezzjoni lessikali eżistenti tal-URL, dan ma jiffissax ir-riżoluzzjoni DNS; ikkonfigura biss
hosts ikkontrollati mill-operatur. Ippreferi HTTPS kull meta l-endpoint ma jkunx fuq network fdat.

### Payload u konsenja

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) iġorr span wieħed
tat-tip CLIENT għal kull ringiela permessa, imsemmi skont il-path eżatt tat-talba tagħha. L-ismijiet ibbażati fuq il-path jiddistingwu
Chat Completions, Responses u Messages mingħajr ma jinkorporaw data tal-mudell jew tal-identità
fl-isem tal-span. L-attributi tar-riżorsa jinkludu `service.name` u `service.version` tal-pakkett.

Il-logger normali tat-tentattivi taċ-chat (`open-sse/handlers/chatCore/attemptLogging.ts`) jikteb
`duration = Date.now() - startTime` mat-tlestija u ma jipprovdix timestamp;
`saveCallLogOperation` f’`src/lib/usage/callLogs.ts` juża b’mod predefinit il-ħin tal-kitba
(tlestija) bħala timestamp. Għalhekk l-esportazzjoni tissettja t-tmiem = timestamp tar-ringiela u l-bidu = tmiem − tul
(millisekondi, konvertiti għal nanosekondi deċimali). Timestamps storiċi pprovduti minn min isejjaħ
jinżammu wkoll bħala l-ħin tat-tmiem; ma hemm ebda indikatur għal kull ringiela li jiddistingwi l-bidu mit-tlestija.
Tul null isir żero. Timestamps invalidi/neqsin ifallu l-lott minflok joħolqu
spans mhux deterministiċi. `ttftMs` jista’ jkun null u jiġi mmappjat għal `omniroute.ttft_ms`.

L-attributi jinkludu `gen_ai.operation.name="chat"`, il-fornitur, il-mudell mitlub/tar-rispons,
tokens tad-dħul/ħruġ, tokens fakultattivi tal-qari mill-cache/ħolqien tal-cache/raġunament, l-istatus HTTP,
combo, is-sors tal-cache, it-tikketta tas-sessjoni u l-id tal-korrelazzjoni. Il-valuri interi OTLP u t-timestamps
huma strings deċimali; strings, valuri booleani u numri frazzjonali jużaw il-varjanti nattivi rispettivi tal-valuri OTLP.
Spans ta’ żbalji għandhom status ERROR u messaġġ tal-istatus sanitizzat. Ir-rekord kanoniku
m’għandux URL tal-host upstream, għalhekk `server.address` jitħalla barra minflok
jidentifika ħażin il-collector bħala s-server tal-mudell. L-ispiża ma tiġix esportata.

`includeBodies=true` biss jimla l-kontenut. B’`langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` iġorru l-JSON sanitizzat tal-body tat-talba/rispons
kif maħżun minn OmniRoute (kanonikalizzat meta jista’ jiġi analizzat), mhux array ta’ messaġġi semconv
ristrutturat. Bodies imqassra jew mhux JSON jibqgħu test mhux ipproċessat. B’`langfuseMapping=true`,
il-bodies jintbagħtu biss bħala `langfuse.observation.input` / `langfuse.observation.output`;
l-attributi `gen_ai.*.messages` jitħallew barra sabiex kull body jintbagħat darba. Iż-żewġ modi
jirtu `maxBodyBytes` mill-mogħdija eżistenti tal-mili tal-kontenut;
`omniroute.bodies_truncated=true` jindika tqassir.
Din id-destinazzjoni ma żżid ebda snapshots addizzjonali tal-pipeline jew qari ta’ artefatti mhux sanitizzati;
il-qbid fakultattiv tal-headers tat-talba juża s-snapshot eżistenti tal-klijent mimli bil-kontenut deskritt hawn taħt.
Uża frekwenza fuq livell ta’ minuti bħal `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` meta tesporta
l-bodies, minflok tħalli xogħol jakkumula għal siegħa.

### Headers fakultattivi tat-talbiet tal-klijent

Il-qbid tal-headers huwa **diżattivat b’mod predefinit**. Issettja `requestHeaderAllowlist` fil-konfigurazzjoni tad-destinazzjoni
u attiva **Esporta l-prompts u r-risponsi** (`includeBodies: true` fid-destinazzjoni).
Il-lista tal-permessi taċċetta array tal-API jew żona tat-test b’ismijiet separati b’linji ġodda/virgoli:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

L-ismijiet jitqabblu eżattament mingħajr distinzjoni bejn ittri kbar u żgħar, sakemm `*` wieħed fit-tarf ma jagħżilx prefiss mhux vojt
ta’ isem ta’ header. `*` waħdu, wildcards inkorporati u ismijiet invalidi ta’ headers HTTP jiġu rrifjutati.
Hemm massimu ta’ 64 selettur, kull wieħed b’isem/prefiss ta’ mhux aktar minn 256 byte ASCII.
Dan is-setting huwa separat minn `headers`, li jawtentika l-esportatur mal-kollettur.

Il-qbid jaqra biss `pipeline_client_request`, li jimtela minn
`clientRawRequest` (jew il-verżjoni l-antika `clientRequest`) tal-pipeline dettaljat issejvjat. Qatt ma juża l-headers tat-talba tal-fornitur bħala alternattiva.
Il-logging dettaljat tal-pipeline irid ikun ġie attivat meta ġiet irreġistrata t-talba. Meta
`includeBodies` ikun diżattivat, jew meta l-JSON tal-istantanja tal-klijent ikun nieqes, korrott jew maqtugħ, ma jinħarġu ebda
attributi tal-headers. Iż-żieda ta’ `maxBodyBytes` tista’ tevita li l-istantanja tinqata’ waqt l-esportazzjoni;
ma tistax tirrestawra dettalji li qatt ma ġew issejvjati. Istantanja ta’ aktar minn 1 MiB jew li fiha aktar minn
256 entrata ta’ header tiġi injorata. L-esportazzjoni eżistenti tal-prompt/tweġiba tibqa’ attivata flimkien
mal-qbid tal-headers; il-lista ta’ permessi ma tipprovdix modalità ta’ idratazzjoni għall-headers biss.

Il-valuri magħżula jsiru arrays ta’ strings OTLP `http.request.header.<full lowercase header name>`,
anke għal string wieħed. Pereżempju, `X-OmniRoute-Meta-Team: example-team` isir
`http.request.header.x-omniroute-meta-team` bi
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Il-prefiss kollu jinżamm: dawn huma headers ordinarji, mingħajr parsing ta’ oqsma tan-negozju jew
konverżjoni għal `omniroute.metadata.*` / metadata ta’ Langfuse. `langfuseMapping` ma jbiddilx is-semantika
tal-headers. `User-Agent` magħżul b’valur wieħed jistabbilixxi wkoll l-iskalar standard
`user_agent.original`. Il-virgoli f’valur wieħed ma jintużawx biex jinqasam. Varjanti b’ittri kbar u żgħar jingħaqdu fl-ordni
tal-entrati ssejvjati; kwalunkwe varjant invalidu jikkawża l-ommissjoni ta’ dak il-header kollu. L-attributi jiġu ordnati skont l-isem b’ittri żgħar.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, headers ta’ API keys, ismijiet li fihom
markaturi auth/token/secret/password/credential, u kredenzjali interni tal-gateway dejjem jiġu
esklużi, anke jekk jintgħażlu jew ikunu parzjalment mgħottija fil-ħażna. Mudelli magħrufa ta’ kredenzjali jerġgħu jużaw
id-ditekter kondiviż tal-kredenzjali; il-markaturi tar-redazzjoni jitħallew barra, mhux jiġu esportati bħala valuri sikuri.
Jiġu aċċettati biss strings u arrays mhux vojta ta’ strings; l-ebda numru jew oġġett ma jiġi kkonvertit awtomatikament.
Ismijiet invalidi, ċwievet tal-prototip, karattri ta’ kontroll (ħlief tab orizzontali) u Unicode malformat
jiġu injorati mingħajr ma jfalli l-lott jew jiġi riprodott il-kontenut tagħhom fl-iżbalji.

Kull span jaqbad massimu ta’ 32 header, 16-il valur għal kull header, 4096 byte UTF-8 għal kull valur,
u total ta’ 16384 byte UTF-8 għall-ismijiet u l-valuri tal-headers maqbuda flimkien. Headers kbar wisq jew invalidi
jitħallew barra kollha kemm huma, mhux jinqatgħu. L-għażla hija deċiżjoni tal-operatur dwar il-privatezza: ismijiet li jidhru sikuri
xorta jistgħu jkun fihom data personali, u dawn il-limiti/ditekters mhumiex għodda ġenerali għat-tneħħija ta’ PII.

### Limiti tal-kunsinna

It-talbiet huma limitati għal 500 span u 4 MiB ta’ JSON UTF-8, inkluż l-envelop.
Id-daqs ta’ kull span permess jiġi ċċekkjat qabel l-ewwel talba ta’ lott tal-cursor. Span individwali
akbar mil-limitu ma jibgħat ebda parti minn dak il-lott u jfalli bi gwida biex jitnaqqas
`maxBodyBytes`; ma jitħalliex barra fis-skiet. Il-verifika preliminari żżomm biss referenzi għar-rekords u
għadd tal-bytes, u tarmi kull span/JSON temporanju; l-ispans jerġgħu jinbnew għal biċċiet limitati
minflok tinżamm it-tieni kopja serjalizzata tal-lott. HTTP 408/429/5xx, fallimenti tan-network u timeouts jingħataw massimu ta’
tliet tentattivi, b’dewmien esponenzjali ta’ 250/500 ms. Sekondi jew dati HTTP f’`Retry-After`
jistgħu jestendu d-dewmien sa 5 sekondi. Statuses oħra jfallu minnufih. Rifjut parzjali OTLP 2xx ukoll iqajjem żball minflok
jikkonferma span mitluf; jiġu aċċettati konfermi vojta jew b’JSON validu, b’limitu
ta’ 64 KiB għall-qari tat-tweġiba.

L-iżbalji fihom biss fatti tal-esportatur: status HTTP, klassi ta’ tentattiv mill-ġdid, tentattivi u għadd
ta’ spans mibgħuta, jew kliem fiss dwar falliment tal-konferma/network. Il-korpi tat-tweġibiet tal-kollettur,
l-għadd ta’ suċċessi parzjali u l-headers tat-tweġibiet qatt ma jiġu kkupjati fl-iżbalji, fil-logs jew fid-
dashboard. Lott li jfalli jew jiġi aċċettat parzjalment ma jiġix ikkonfermat: id-destinazzjoni turi
Li qed ifalli b’dak l-istatus, il-cursor jibqa’ fl-aħħar lott ikkonfermat, u l-eżekuzzjoni li jmiss
terġa’ tibgħat l-istess ringieli. Statuses permanenti jibqgħu jfallu sakemm il-kollettur jew il-konfigurazzjoni
jiġu rranġati. Uża l-logs tal-kollettur stess għad-dettalji tat-tweġibiet. Is-sommarji tal-iżbalji fil-log tas-sejħiet iżommu
r-redazzjoni separata tagħhom.
`prepare()` ma jipproviżjona xejn; Test jibgħat eżattament `{"resourceSpans":[]}` u jirrapporta
l-istatus HTTP mingħajr ma jikteb spans tal-log tas-sejħiet.

L-IDs tat-traċċi u l-IDs tal-ispans huma l-ewwel 32/16-il ċifra eżadeċimali ta’ SHA-256 fuq
`"omniroute.trace\\0" + callLogId` u `"omniroute.span\\0" + callLogId`. Meta jerġgħu jintbagħtu, iġorru
IDs identiċi. Din mhijiex garanzija ta’ deduplikazzjoni: xi backends, inkluża l-inġestjoni ta’ Langfuse
v4, ma jneħħux spans duplikati bl-istess ID. Kraxx jew falliment parzjali ta’ biċċa jista’
jerġa’ jibgħat, l-aktar, il-lott wieħed tal-cursor li ma ġiex ikkonfermat; dak il-lott kollu jista’ jiġi duplikat,
mhux biss l-aħħar biċċa HTTP tiegħu. Agħżel id-daqs tal-lott tal-cursor b’dan il-kompromess f’moħħok.

### Eżempju ta’ Langfuse

Ikkonfigura dawn l-oqsma għal istanza ta’ Langfuse ospitata minnek stess:

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

Ibni l-valur Authorization lokalment bħala Base64 tal-istring litterali `public-key:secret-key`
(pereżempju b’`Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Tippejstjax kredenzjali reali fil-logs, fi screenshots jew f’issues. L-immappjar awtomatikament
jistabbilixxi `x-langfuse-ingestion-version: 4`; Authorization xorta jingħata f’`headers`.
Kemm il-headers kif ukoll is-salt tal-identità ġġenerat jużaw il-mekkaniżmu eżistenti ta’ oqsma sigrieti kriptati
u l-placeholders tal-API; `STORAGE_ENCRYPTION_KEY` hija meħtieġa.

L-immappjar iżid it-tip/mudell tal-ġenerazzjoni, dettalji tal-użu f’JSON (input/output/total u ċ-ċwievet
tal-cache disponibbli), snapshots tal-input/output f’JSON, livell ERROR/DEFAULT, messaġġ tal-istatus sanitizzat,
isem tat-trace, id tas-sessjoni, ambjent fakultattiv u
`langfuse.observation.metadata.<key>` li jista’ jiġi ffiltrat għall-fornitur, il-mudell mitlub, il-mogħdija, il-kombinazzjoni, is-sors
tal-cache u l-istatus. `langfuse.observation.completion_start_time` ikun f’ISO 8601 fil-ħin
tal-bidu + TTFT biss meta t-TTFT ikun magħruf u fil-limiti tat-tul ta’ żmien. Ma jintbagħtu ebda attributi tal-ispiża.

Il-modi tal-identità japplikaw għal `langfuse.user.id`:

- `pseudonymous` (default): HMAC-SHA256 tal-id intern taċ-ċavetta tal-API b’salt każwali
  ta’ 32 byte għal kull destinazzjoni. Is-salt jiġi ġġenerat waqt il-ħolqien jekk ikun nieqes, jiġi kriptat
  bħala `identitySalt`, qatt ma jintbagħat lura, u jinżamm waqt il-modifiki. L-ids mhux ipproċessati taċ-ċwievet qatt ma
  jitqiegħdu fl-attributi tal-ispan. Il-ħolqien mill-ġdid jew ir-rotazzjoni tas-salt ta’ destinazzjoni jibdel l-identitajiet.
- `keyName`: l-isem konfigurat taċ-ċavetta tal-API, li intenzjonalment jiżvela dik it-tikketta tal-operatur.
- `none`: ebda id tal-utent. It-tags tas-sessjoni xorta jiġu esportati meta jkunu preżenti; dawn il-modi ma
  janonimizzawx kontenut arbitrarju tal-prompts jew tikketti tas-sessjoni/korrelazzjoni pprovduti mill-operatur.

### Bidu mingħajr mili retroattiv

Waqt il-ħolqien biss, attiva **Ibda mill-pożizzjoni attwali (aqbeż il-logs eżistenti)** jew għaddi
`startFromCurrentPosition: true` fl-ogħla livell tal-payload tal-API tal-ħolqien. Dan jinizjalizza
`cursor_row_id` għall-ogħla rowid attwali miżmum fil-log tas-sejħiet billi juża l-funzjonijiet awżiljarji eżistenti tal-cursor,
mingħajr migrazzjoni. Il-valur default huwa false (cursor 0 u mili retroattiv tal-istorja miżmuma).
Dan mhuwiex setting biex jiġi rrisettjat il-cursor waqt aġġornament.

Iż-żieda kondiviża ta’ `ttftMs` iżżid ukoll kolonna `ttft_ms` li tista’ tkun null fil-mapper ta’ BigQuery
u fl-iskema għal tabelli ġodda: it-test tal-iskema tiegħu jeħtieġ li kull field tar-rekord kanoniku jkollu
kolonna. It-tabelli eżistenti jkomplu jiġu esportati mingħajr bidliet: `prepare()` jaqra l-iskema tat-tabella u
jħalli barra biss `ttft_ms` meta dik il-kolonna tkun nieqsa. Żid il-kolonna INT64 li tista’ tkun null biex tikseb it-TTFT
fl-eżekuzzjoni li jmiss, jew uża tabella ġdida. Ma huma meħtieġa ebda PATCH, tibdil awtomatiku tal-iskema jew permessi
addizzjonali; il-fields l-oħra kollha tar-ringiela jibqgħu soġġetti għal verifika stretta tal-iskema.

---

## 6. Żieda ta’ destinazzjoni

1. Oħloq `src/lib/logExport/destinations/<name>.ts` li jesporta `LogExportDestinationType`:
   `configSchema` ta’ Zod, array ta’ deskritturi `fields` għall-UI, `secretFields`, u
   `createClient(config)` li jirritorna `test()` / `prepare()` / `send(records)`.
2. Żidu mal-array `DESTINATIONS` f’`src/lib/logExport/registry.ts`.
3. Ikteb testijiet taħt `tests/unit/`.

Din hija l-bidla kollha: il-persistenza, il-kompitu cron, is-saff REST, il-kriptaġġ tas-sigrieti u l-
formola tad-dashboard kollha jaqraw ir-reġistru.

Żewġ regoli għal destinazzjoni ġdida:

- `send()` **għandu jitfa’ eċċezzjoni** f’każ ta’ falliment parzjali. Jekk jitlesta b’suċċess, dan ifisser "id-destinazzjoni għandha dawn ir-ringieli",
  u l-cursor jgħaddi lil hinn minnhom b’mod permanenti.
- Destinazzjoni li taċċetta URL ipprovdut mill-utent trid tivvalidah permezz ta’
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) qabel ma tirkupra d-data,
  bl-istess mod kif jagħmlu l-webhooks. BigQuery ma jeħtieġx dan: il-hosts tiegħu huma kostanti.

---

## 7. Kif tħaddmu

- **Dashboard**: Integrazzjonijiet → Esportazzjoni tar-reġistri. Żid destinazzjoni, ħaddem **Test** biex tiċċekkja l-kredenzjali
  mingħajr ma tikteb ringieli, imbagħad attivaha.
- **Ringieli pendenti**: kull kard ta’ destinazzjoni turi r-ringieli pendenti u l-cursor; `GET
/api/log-export/status` jirritorna l-istess ċifri flimkien mal-aħħar 20 eżekuzzjoni tal-kompitu.
- **Destinazzjoni li tfalli ma tikkawżax il-falliment tal-oħrajn** — is-sommarju tal-eżekuzzjoni jirreġistra l-istatus ta’ kull destinazzjoni
  f’`last_status` / `last_error`, u l-istorja tal-eżekuzzjonijiet tal-kompitu żżomm ir-riżultat aggregat.
- **It-tħassir ta’ destinazzjoni jħassar il-cursor tagħha.** Jekk terġa’ żżidha, tibda mill-eqdem
  reġistru ta’ sejħa li jkun għadu miżmum, u dan jerġa’ jibgħat ringieli li d-destinazzjoni jaf diġà għandha. F’BigQuery, l-
  `insertId` ta’ kull ringiela jassorbi dan biss fil-perjodu ta’ deduplikazzjoni ta’ BigQuery stess, għalhekk aħjar tiddiżattiva
  destinazzjoni milli tħassarha.
