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

- **Skeda** — one `JobRegistry` cron job, `log_export`, default to `0 * * * *` (kull siegħa, UTC). Reġistrat `src/lib/initCloudSync.ts`; overridable ma `OMNIROUTE_LOG_EXPORT_CRON`. Kull qurdien ibattal kull** ppermettiet** destinazzjoni, sekwenzjali.
- **Cursor** — SQLite's impliċitu `call_logs.rowid`, jippersisti għal kull destinazzjoni fi `log_export_destinations.cursor_row_id`. `timestamp` deliberatament mhuwiex il-cursor: min iċempel jista 'jforni l-valur tagħhom stess, għalhekk talba bil-mod tista' tinkiteb wara waħda aktar mgħaġġla li bdiet aktar tard, u cursor tat-timestamp jaqbeżha.
- **Batching** — `batch_size` ringieli għal kull talba (default 500), `max_rows_per_run` ringieli għal kull run (default 10000) għalhekk backlog kbir drains fuq diversi qurdien minflok jimblokka waħda.
- **Kunsinna** — il-cursor javvanza biss wara `send()` jirrisolvi. Lott fallut iħalli l-cursor fejn kien, għalhekk l-istess ringieli jerġgħu jiġu ppruvati fil-ġirja li jmiss. Il-garanzija hija ta' l-inqas darba flimkien ma' deduplikazzjoni min-naħa tad-destinazzjoni, mhux vera eżattament darba: BigQuery iċċekkja kull ringiela bl-id tal-log tas-sejħa, li tonora fuq bażi ta' l-aħjar sforz fit-tieqa tad-dedup tagħha stess.
- **Gwardja ta' sovrapożizzjoni** — il-cron tick u `POST .../run` jistgu jisparaw flimkien. Destinazzjoni li diġà qed tixxotta tinqabeż aktar milli titbattal darbtejn (`skipped: true` fir-riżultat tal-ġirja), għalhekk ġirja konkorrenti ma tistax terġa 'tibgħat lott jew tikteb il-cursor lura.
- **Purge l-irkupru** — jekk `cursor_row_id` jispiċċa 'l fuq minn `MAX(rowid)` (it-tabella kollha ġiet imnaddaf u rowids reġgħu bdew), ir-runner jerġa' lura għal 0 aktar milli jmur b'mod permanenti blind.

### Runner iżolat u limiti

Kull destinazzjoni mmexxija fuq Node tibda proċess tifel OS separat u ta' ħajja qasira (`child_process` ma IPC, mhux `worker_threads`). Body reads, payload JSON parsing/serialization, destinazzjoni `prepare()` u destinazzjoni network I/O kollha jimxu hemmhekk, mhux fuq il-loop tal-avveniment tas-server. Biss konfigurazzjoni u messaġġi ta 'progress żgħar jaqsmu IPC; rekords esportati qatt ma jerġgħu lura għas-server. Il-cron job u Run now rotta jżommu l-istess riżultat pubbliku u jirkbu fuq xulxin.

It-tifel jiftaħ is-server `DATA_DIR/storage.sqlite` solvut read-only billi juża `node:sqlite`, `busy_timeout=5000` u `query_only=ON`. Ma jimporta l-ebda DB singleton u ma jwettaq l-ebda migrazzjoni, backups jew aġġornamenti SQLite. Missing/corrupt artifact bookkeeping (inkluż il-corrupt-artifact UPDATE) jibqa 'fil-mogħdija tad-dettall tad-dashboard biss. Iż-żewġ mogħdijiet jaqsmu risolver tad-dettall pur; esportazzjoni tuża filesystem asinkronu jaqra u l-istess artifact → legacy inline → legacy disk → xejn ordni ta 'riżoluzzjoni. A run snapshots l-inserzjoni rowid massimu meta t-tifel jiftaħ il-qarrej tiegħu; inserzjonijiet aktar tard stenna għall-ġirja li jmiss. Din hija konfini ta 'inserzjoni, mhux tranżazzjoni SQLite ta' ħajja twila: il-kittieba u l-punti ta 'kontroll WAL jibqgħu ħielsa waqt l-istennija tan-netwerk. Updates/deletions ta ringieli eżistenti mhumiex iffriżati minn dan il-konfini.

Wara kull lott aċċettat, it-tifel jistenna rikonoxximent. Is-server l-ewwel jippersisti l-cursor `advanceLogExportCursor`, imbagħad jibgħat `ack`; ebda lott li jmiss ma jibda qabel. Falliment tal-bgħit, crash jew timeout jirreġistra l-falliment mingħajr ma javvanza dak il-lott. Lottijiet rikonoxxuti qabel jibqgħu impenjati; l-iktar il-lott wieħed mhux rikonoxxut jista' jerġa' jintbagħat. Is-suċċess huwa rreġistrat biss wara `done` u ħruġ nadif tat-tfal. Il-fallimenti jtemmu lit-tifel SIGTERM, jeskalaw għal SIGKILL wara 500 ms, u r-runner jistenna l-għeluq tal-proċess.

| Ambjent varjabbli                             | Default | Għan                                               |
| --------------------------------------------- | ------- | -------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | Limitu tal-arloġġ tal-ħajt għal kull destinazzjoni |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | Limitu ta' spazju antik tat-tfal V8 MB             |

valuri Invalid/non-positive/non-integer jużaw l-inadempjenzi. L-issettjar tal-borġ mhuwiex limitu RSS totali; lottijiet kbar ħafna xorta jistgħu jeżawrixxu l-memorja tat-tfal u jfallu l-ġirja mingħajr periklu. Id-default 1024 MB iħalli spazju għal ras għal lott default ta '500 ringiela ta' 512 KiB artifacts b'korpi attivati, inkluż is-serialization JSON b'byte-chunked ta ' BigQuery. Ma jagħmilx lott ta 'korpi ta' 10000 ringiela sikur. L-eżawriment tal-munzell V8 jirreġistra falliment azzjonabbli: ibaxxu d-daqs tal-lott jew jgħollu `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; il-cursor jibqa' fl-aħħar lott rikonoxxut. Korpi storiċi inline/disk mhumiex koperti mill-għatu tal-artifact modern. L-operaturi għandhom jibbaġitjaw RSS separatament, speċjalment ġewwa kontenituri limitati għall-memorja.

It-tifel jiret biss `DATA_DIR`, `NODE_ENV`, `TZ` espliċitu (reżoluzzjoni fil-ħin lokali tal-isem tal-fajl legacy), `ELECTRON_RUN_AS_NODE` meta jkun preżenti, u l-inputs 'il barra li ġejjin: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (u `SSL_CERT_FILE`-forom żgħar tagħhom), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_DIR`. Dispatcher globali ta' Undici jaqsam ir-riżoluzzjoni pura tal-proxy tal-ambjent u r-regoli tal-bypass tal-host lokali tas-server, inkluż `NO_PROXY`; ma jimportax `proxyFetch.ts` jew il-bnadar DB/feature taghha. Il-kredenzjali tal-prokura huma redatti mill-output mibgħut u l-iżbalji rreġistrati. Il-kredenzjali tad-destinazzjoni jivvjaġġaw biss f'messaġġ wieħed IPC tal-bidu, qatt argv jew ambjent; output/error forwarding huwa prefissat u sanitizzat. `ExperimentalWarning` biss huwa diżattivat fl-argumenti exec tat-tfal biex tevita li tirrepeti SQLite ta 'Node twissija kull ġirja cron; tipi oħra ta' twissija jibqgħu viżibbli.

Il-moduli tad-destinazzjoni jridu jkunu importabbli minghajr Next.js/server-only dipendenzi. L-implimentazzjoni eżistenti BigQuery diġà tilħaq dak il-kuntratt. Il-caches tat-tokens tal-aċċess jdumu biss għall-ġirja tat-tfal, mhux bejn il-ġirjiet. Node huwa r-runtime appoġġjat (magni `package.json` ). Teżisti mogħdija ta' kompatibilità Bun bl-aħjar sforz, mhux appoġġjata (`bun:sqlite` `src/lib/db/core.ts` / adapters, u `Dockerfile.bun`), għalhekk l-esportazzjonijiet m'għandhomx jinkisru taħtha. Taħt Bun, l-esportazzjonijiet iżommu l-mogħdija fil-proċess preċedenti u jarmu twissija ta 'darba: iżolament heap/timeout tat-tfal mhux disponibbli. Uża Node għal event-loop u iżolament OOM.

Meta `includeBodies` tkun attivata, tippreferi kadenza f'livell ta' minuta bħal `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` aktar milli takkumula tagħbija b'lura fis-siegħa. Il-limiti tal-lott u tar-ringieli għadhom marbuta kull ġirja. L-istartjar tal-proċess jitħallas għal kull destinazzjoni għal kull ġirja; dan jinnegozja spiża żgħira tal-istartjar għall-iżolament tas-server event-loop, mhux imnaqqas l-użu totali CPU.

### Tagħbijiet (prompts u tlestiji)

B'mod awtomatiku l-esportazzjoni ġġorr biss l-oqsma sommarji l-Zkuk** lista** wirjiet. Tixgħel** Esportazzjoni prompts u tweġibiet** (`includeBodies`) addizzjonalment ships what the Logs** dettall** panew juri għal kull sejħa:

| Qasam                            | Dak li jżomm                                                  |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | Is-sejħa tgħaddi hekk kif id-daxxbord jirrendihom             |
| `pipeline_route_decision`        | Liema mira u mudell ir-router qabad                           |
| `pipeline_client_request`        | It-talba mhux maħduma eżattament kif bagħatha l-klijent       |
| `pipeline_openai_request`        | Wara t-traduzzjoni fil-forma interna OpenAI                   |
| `pipeline_provider_request`      | Kif attwalment mibgħuta upstream, fid-djalett tal-fornitur    |
| `pipeline_provider_response`     | Ir-rispons upstream mhux ipproċessat                          |
| `pipeline_client_response`       | Dak li ngħata lura lil min iċempel                            |
| `pipeline_error`                 | Dettall tal-iżball fil-livell tal-pipeline għal sejħa falluta |
| `bodies_truncated`               | Veru meta xi field fuq tolqot `maxBodyBytes`                  |

Dan huwa kontenut fil-pront, hekk hu** mitfi awtomatikament** u deliberatament għażla għal kull destinazzjoni. Dak li vapuri huwa dak li juri d-dashboard, minħabba li l-esportazzjoni u `getCallLogById` jaqsmu r-riżoluzzjoni tad-dettall: it-tagħbijiet huma diġà sanitizzati bil-PII u sigrieti meta jinkitbu, u sejħa li ssir b'ċavetta `noLog` API ma taħżen l-ebda tagħbija, għalhekk m'hemm xejn x'esportazzjoni.

It-tagħbijiet ta' ħlas jinqraw għal kull ringiela mill-artifact tas-sistema tal-fajls, għalhekk l-idratazzjoni taħdem biss għal destinazzjonijiet li talbuha. Artifatt nieqes jew korrott jesporta s-sommarju tiegħu b'piżijiet nulli aktar milli jfalli l-lott u jqabbad il-cursor.

`maxBodyBytes` (default 262144) tappi kull qasam. Itwal payloads huma** maqtugħ aktar milli waqa** — pront maqtugħ xorta jwieġeb "dak li kien mistoqsi" — u r-ringiela hija mmarkata `bodies_truncated`. Deltas streamed chunk-by-chunk mhumiex esportati; ir-rispons immuntat huwa diġà `pipeline_provider_response` u `pipeline_client_response`.

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

| Ċavetta              | Noti                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Proġett GCP li fih jinżamm id-dataset                                                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                |
| `location`           | Jintuża biss meta d-dataset irid jinħoloq (default `EU`)                                                       |
| `serviceAccountJson` | Ċavetta tal-kont tas-servizz. Sigriet: kriptat waqt il-ħażna, qatt ma jintbagħat lura                          |
| `autoCreate`         | Joħloq dataset/table nieqsa; iżid b’mod kundizzjonali kolonni nullable għall-evidenza tal-użu (default `true`) |

Il-kont tas-servizz jeħtieġ `bigquery.tables.updateData` fuq it-tabella fil-mira, flimkien ma’
`bigquery.datasets.create` / `bigquery.tables.create` meta `autoCreate` ikun attivat.
L-aġġornament ta’ tabella eżistenti biex iżid iż-żewġ oqsma nullable tal-evidenza tal-użu jeħtieġ ukoll
`bigquery.tables.update`. Permess nieqes ifalli l-esportazzjoni mingħajr ma javvanza l-cursor tagħha.

Batch ikkonfigurat huwa unità ta’ **cursor**, mhux waħda HTTP: `send()` jaqsamha f’sejħiet
insertAll ta’ mhux aktar minn 500 ringiela, għalhekk `batch_size` kbir ma jistax jaqbeż il-limitu ta’
10 MB ta’ BigQuery għat-talbiet. L-istatusi temporanji (408/429/500/502/503/504) jerġgħu jiġu
pproċessati sa tliet darbiet b’backoff esponenzjali, bl-użu mill-ġdid tal-istess insertIds; il-fallimenti
tal-awtentikazzjoni u tal-iskema jarmu żball mal-ewwel tentattiv minflok ma jikkunsmaw ir-run.

Tabella maħluqa ftit mumenti ilu għadha mhijiex viżibbli għall-endpoint tal-istrimjar, li jwieġeb
404 għal ftit sekondi. Dak l-404 jerġa’ jiġi ppruvat, iżda **biss meta dan ir-run ikun ħoloq it-tabella** —
tabella verament nieqsa tibqa’ tfalli immedjatament. Innota li l-ħolqien mill-ġdid ta’ tabella bl-istess isem li
tkun tħassret dan l-aħħar iwassal biex BigQuery jirrifjuta inserzjonijiet tal-istrimjar għal diversi minuti;
din hija karatteristika tal-proċess ta’ tħassir u ħolqien mill-ġdid, għalhekk ippreferi isem ġdid tat-tabella
minflok tħassar u terġa’ żżid waħda.

**Falliment parzjali jasal bħala HTTP 200 b’`insertErrors[]` mhux vojt.** Dan jiġi ttrattat bħala
falliment u jarmi żball, li huwa dak li jwaqqaf lill-cursor milli javvanza lil hinn mir-ringieli li BigQuery
qatt ma aċċetta; `tests/unit/log-export-bigquery.test.ts` jiffissa din l-imġiba.

It-trasport huwa REST sempliċi — assertion iffirmata RS256 u awtofirmata tinbidel għal token ta’
aċċess fuq `https://oauth2.googleapis.com/token`, imbagħad ir-ringieli jintbagħtu lil
`tabledata.insertAll`. Ma jiġi inkluż l-ebda Google SDK. It-tokens ta’ aċċess jinżammu fil-cache
fil-proċess skont (kont tas-servizz, scope).

It-tabella maħluqa jkollha kolonna waħda għal kull qasam tat-tab Logs flimkien ma’
`exported_at`, u tkun organizzata skont kif ir-reġistri tas-sejħiet jiġu attwalment mistoqsija:

- **Maqsuma skont il-ġurnata fuq `timestamp`**, sabiex mistoqsija limitata skont id-data tiskennja biss dawk il-ġranet.
- **Ikklerjata skont `api_key_name`, `provider`, `model`, `status`** (f’dik l-ordni), sabiex l-iffiltrar skont
  min ħaddimha, fejn intbagħtet, jew jekk fallietx jaqbeż il-blokok ġewwa kull partizzjoni. BigQuery
  jippermetti l-aktar erba’ kolonni ta’ clustering u l-ordni hija importanti: filtru fuq
  `api_key_name` waħdu jaqbeż il-blokok, filtru fuq `status` waħdu ma jagħmilx dan.
- **Żamma fakultattiva tal-partizzjonijiet** permezz ta’ `partitionExpirationDays` (0 iżomm kollox), applikata
  meta tinħoloq it-tabella.

Iż-żewġ settings japplikaw fil-ħin tal-ħolqien. Tabella eżistenti żżomm l-organizzazzjoni li diġà għandha,
għalhekk ipponta d-destinazzjoni lejn table id ġdid jekk trid tadotta dawn is-settings.

`tests/unit/log-export-bigquery.test.ts` jiċċekkja li l-mapper u l-iskema tat-tabella jibqgħu sinkronizzati,
għalhekk kolonna ġdida tar-reġistru tas-sejħiet ma tistax titħalla barra bil-moħbi waqt l-esportazzjoni.

Il-batches jinqasmu skont **kemm in-numru ta’ ringieli kif ukoll il-bytes serializzati**. In-numru ta’
ringieli waħdu mhuwiex biżżejjed ladarba jiġu esportati payloads: 500 ringiela li jġorru prompts jistgħu
jkunu għexieren ta’ megabytes, u insertAll jirrifjuta talba ta’ aktar minn 10 MB. Il-biċċiet jingħalqu
f’500 ringiela jew 9 MB, skont liema jintlaħaq l-ewwel.

---

## 5. Destinazzjoni tat-traċċi OTLP/HTTP

Il-konfigurazzjoni tuża `type: "otlp-http"`. Din hija esportazzjoni skedulata, appoġġjata minn cursor, ta’ reġistri persistenti tas-sejħiet, u mhux is-sink tal-avvenimenti tar-routing live bl-aħjar sforz f’`open-sse/services/routing/otel.ts`. Ma taqrax u ma tbiddilx il-varjabbli tal-ambjent, it-tajmers jew il-buffers ta’ dak is-sink. L-attivazzjoni tat-tnejn tista’ tipproduċi żewġ tipi indipendenti ta’ spans; uża l-iskop tal-instrumentazzjoni `omniroute.log-export` biex tiddistingwi dawn l-ispans tar-reġistri tas-sejħiet.

| Key                      | Default / purpose                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `endpoint`               | URL sħiħa meħtieġa tat-traċċi HTTP(S); ma jiżdied l-ebda suffiss `/v1/traces`                              |
| `headers`                | Linji `Name: value` fakultattivi jew oġġett JSON ta’ strings; ikkriptati                                   |
| `requestHeaderAllowlist` | Vojta (mitfija); ismijiet/prefissi tal-headers tal-klijent li għandhom jinqabdu bħala attributi tal-ispans |
| `serviceName`            | `omniroute`; ir-riżorsa `service.name`                                                                     |
| `langfuseMapping`        | `false`; iżżid attributi ta’ ġenerazzjoni/sessjoni/utent ta’ Langfuse                                      |
| `identity`               | `pseudonymous`, `keyName`, jew `none`                                                                      |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                                    |
| `timeoutMs`              | `30000` għal kull tentattiv HTTP                                                                           |
| `environment`            | Mhux issettjat; `langfuse.environment` fakultattiv                                                         |

Id-dashboard ġeneriku tirrendi dawn l-oqsma. `paths` taċċetta array API jew textarea
b’paths eżatti separati b’linji ġodda/virgoli. L-embeddings, ir-reranking u paths oħra
jinqabżu sakemm ma jkunux permessi b’mod espliċitu. Ir-ringieli maqbuża xorta javvanzaw
il-cursor; il-counters `exported`/`exportedTotal` tar-runner eżistenti jgħoddu r-ringieli
tas-sors ipproċessati, inklużi r-ringieli ffiltrati, minflok l-ispans aċċettati. Il-filtrazzjoni
ssir fil-child, mingħajr ma jinbidel il-kuntratt IPC/cursor tiegħu.

Il-validazzjoni tal-URL tuża l-helper `parseAndValidateNonMetadataUrl` mingħajr DB minn
`src/shared/network/outboundUrlGuard.ts`: il-politika `block-metadata`. Din għandha l-istess
kontrolli inkondizzjonati tal-metadata/protokoll/kredenzjali inkorporati bħall-validatur
tal-webhooks, bil-URLs privati permessi, iżda intenzjonalment tippermetti destinazzjonijiet
localhost/LAN mingħajr override globali tal-feature flag. Dan jippermetti endpoints ta’
Langfuse, Phoenix, Tempo u Collector self-hosted, inklużi endpoints HTTP privati. Hosts
tal-cloud metadata jiġu dejjem imblukkati. Ir-ridirezzjonarji ma jiġux segwiti, għalhekk
collector ma jistax jidderieġi l-kredenzjali lejn host differenti. Bħall-gwardja lessikali
eżistenti tal-URLs, din ma tissakkarx ir-riżoluzzjoni tad-DNS; ikkonfigura biss hosts
ikkontrollati mill-operatur. Ippreferi HTTPS kull meta l-endpoint ma jkunx fuq netwerk
ta’ fiduċja.

### Payload u twassil

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) iġorr span
wieħed CLIENT għal kull ringiela permessa, bl-isem ibbażat fuq il-path eżatt tat-talba.
L-ismijiet tal-path jiddistingwu Chat Completions, Responses u Messages mingħajr ma
jdaħħlu dejta dwar il-mudell jew l-identità fl-isem tal-ispan. L-attributi tar-riżorsa
jinkludu `service.name` u `service.version` tal-package.

Il-logger normali tat-tentattivi taċ-chat (`open-sse/handlers/chatCore/attemptLogging.ts`)
jikteb `duration = Date.now() - startTime` mat-tlestija u ma jipprovdix timestamp;
`saveCallLogOperation` f’`src/lib/usage/callLogs.ts` jistabbilixxi t-timestamp bħala default
għall-ħin tal-kitba (it-tlestija). Għalhekk l-esportazzjoni tistabbilixxi end bħala
t-timestamp tar-ringiela u start bħala end − duration (millisekondi, ikkonvertiti għal
nanosekondi deċimali). Timestamps storiċi pprovduti minn min iċempel jiġu ppreservati
wkoll bħala l-ħin end; m’hemm l-ebda distinzjoni għal kull ringiela bejn start u tlestija.
Duration null issir żero. Timestamps invalidi jew nieqsa jfallu l-batch minflok ma
joħolqu spans mhux deterministiċi. `ttftMs` jista’ jkun null u jiġi mmappjat għal
`omniroute.ttft_ms`.

L-attributi jinkludu `gen_ai.operation.name="chat"`, il-provider, il-mudell mitlub/rispons,
it-tokens tal-input/output, tokens fakultattivi tal-cache-read/cache-creation/reasoning,
l-istatus HTTP, il-combo, is-sors tal-cache, it-tag tas-sessjoni u l-ID ta’
korrelazzjoni. Il-valuri interi OTLP u t-timestamps huma strings deċimali; strings,
booleans u numri frazzjonali jużaw il-varjanti nattivi tal-valur OTLP tagħhom. Spans bi
żbalji għandhom status ERROR u messaġġ tal-istatus sanitizzat. Ir-rekord kanoniku ma
għandux URL tal-host upstream, għalhekk `server.address` jitħalla barra minflok ma
jidentifika b’mod żbaljat lill-collector bħala s-server tal-mudell. L-ispiża ma tiġix
esportata.

`includeBodies=true` biss jikkarga l-kontenut. B’`langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` iġorru l-JSON sanitizzat tal-body
tat-talba/rispons kif maħżun minn OmniRoute (ikkannonizzat meta jkun jista’ jiġi parsed),
mhux array ta’ messaġġi semconv ifformat mill-ġdid. Bodies maqtugħa/JSON mhux validu
jibqgħu test mhux ipproċessat. B’`langfuseMapping=true`, il-bodies jinħarġu biss bħala
`langfuse.observation.input` / `langfuse.observation.output`; l-attributi
`gen_ai.*.messages` jitħallew barra sabiex kull body jintbagħat darba biss. Iż-żewġ modi
jirtu `maxBodyBytes` mill-path eżistenti tal-hydration;
`omniroute.bodies_truncated=true` jimmarka l-qtugħ.
Ma jiżdiedu l-ebda snapshots addizzjonali tal-pipeline jew qari ta’ artifacts mhux
sanitizzati minn din id-destinazzjoni; il-qbid fakultattiv tal-header tat-talba juża
l-snapshot eżistenti u hydrated tal-klijent deskritt hawn taħt.
Uża cadence ta’ livell ta’ minuta bħal `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` meta
tesporta l-bodies, minflok takkumula backlog ta’ siegħa.

### Headers fakultattivi tat-talbiet tal-klijent

Il-qbid tal-headers huwa **mitfi b’mod awtomatiku**. Issettja `requestHeaderAllowlist`
fil-konfigurazzjoni tad-destinazzjoni u attiva **Export prompts and responses**
(`includeBodies: true` fid-destinazzjoni).
L-allowlist taċċetta array API jew textarea b’ismijiet separati b’linji ġodda/virgoli:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

L-ismijiet jaqblu mingħajr ma jitqiesu l-ittri kbar u żgħar u b’mod eżatt, sakemm `*` wieħed fit-tarf ma jagħżilx prefiss mhux vojt ta’ isem ta’ header. `*` waħdu, wildcards inkorporati u ismijiet invalidi ta’ headers HTTP jiġu rrifjutati.
Hemm l-iktar 64 selettur, kull wieħed b’isem/prefiss ta’ mhux aktar minn 256 byte ASCII.
Dan l-issettjar huwa separat minn `headers`, li jawtentika lill-esportatur mal-kollettur.

Il-qbid jaqra biss `pipeline_client_request`, li jimtela minn `clientRawRequest` tal-pipeline dettaljat issejvjat (jew `clientRequest` legat). Qatt ma jaqa’ lura għall-headers tat-talba tal-provider.
Ir-reġistrazzjoni tal-pipeline dettaljat trid tkun attivata meta t-talba tkun ġiet irreġistrata. Meta `includeBodies` ikun diżattivat, jew meta l-JSON tal-istampa tal-klijent ikun nieqes, korrott jew maqtugħ, ma jinħarġu l-ebda attributi tal-headers. Iż-żieda ta’ `maxBodyBytes` tista’ tevita t-tqattigħ tal-istampa fil-ħin tal-esportazzjoni; ma tistax tirkupra dettalji li qatt ma ġew issejvjati. Stampa ta’ aktar minn 1 MiB jew li fiha aktar minn 256 entrata ta’ header tiġi injorata. L-esportazzjoni eżistenti tal-prompt/tweġiba tibqa’ attivata flimkien mal-qbid tal-headers; l-allowlist ma tipprovdix modalità ta’ hydration għall-headers biss.

Il-valuri magħżula jsiru arrays ta’ strings OTLP `http.request.header.<full lowercase header name>`, anki għal string waħda. Pereżempju, `X-OmniRoute-Meta-Team: example-team` isir
`http.request.header.x-omniroute-meta-team` b’
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Il-prefiss sħiħ jinżamm: dawn huma headers ordinarji, mingħajr parsing ta’ oqsma tan-negozju jew konverżjoni għal `omniroute.metadata.*` / metadata ta’ Langfuse. `langfuseMapping` ma jbiddilx is-semantika tal-headers. `User-Agent` magħżul b’valur wieħed jistabbilixxi wkoll l-attribut skalari standard `user_agent.original`. Il-virgoli ġewwa valur wieħed ma jinqasmux. Varjanti li jvarjaw fil-kapitalizzazzjoni jingħaqdu fl-ordni tal-entrati ssejvjati; jekk ikun hemm kwalunkwe varjant invalidu, dak il-header kollu jitħalla barra. L-attributi jiġu ordnati skont l-isem b’ittri żgħar.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, headers taċ-ċwievet API, ismijiet li fihom indikaturi ta’ auth/token/secret/password/credential, u kredenzjali interni tal-gateway dejjem jiġu esklużi, anki jekk magħżula jew parzjalment moħbija fil-ħażna. Il-mudelli magħrufa tal-kredenzjali jerġgħu jużaw id-detettur komuni tal-kredenzjali; il-markaturi ta’ redazzjoni jitħallew barra u ma jiġux esportati bħala valuri sikuri. Jiġu aċċettati biss strings u arrays mhux vojta ta’ strings; l-ebda numru jew oġġett ma jiġi kkonvertit. Ismijiet invalidi, ċwievet tal-prototip, karattri ta’ kontroll (minbarra t-tab orizzontali) u Unicode mhux iffurmat tajjeb jiġu injorati mingħajr ma jfalli l-lott jew il-kontenut tagħhom jidher fl-iżbalji.

Kull span jaqbad l-iktar 32 header, 16-il valur għal kull header, 4096 byte UTF-8 għal kull valur, u total ta’ 16384 byte UTF-8 madwar l-ismijiet u l-valuri tal-headers maqbuda. Headers kbar wisq jew invalidi jitħallew barra sħaħ, mhux maqtugħin. L-għażla hija deċiżjoni ta’ privatezza tal-operatur: ismijiet li jidhru sikuri xorta jista’ jkun fihom dejta personali, u dawn il-limiti/detetturi mhumiex għodda ġenerali għat-tindif tal-PII.

### Limiti tat-twassil

It-talbiet huma limitati għal 500 span u 4 MiB ta’ JSON UTF-8, inkluż l-envelope.
Kull span permess jiġi vverifikat mid-daqs qabel l-ewwel talba ta’ lott tal-cursor. Span individwali akbar mil-limitu ma jibgħat l-ebda parti minn dak il-lott u jfalli b’gwida biex jitnaqqas `maxBodyBytes`; ma jintremax b’mod sieket. Il-preflight iżomm biss referenzi għar-rekords u għadd ta’ bytes, u jarmi kull span/JSON temporanju; l-ispans jerġgħu jinbnew għal biċċiet limitati minflok ma tinżamm kopja serializzata oħra tal-lott. HTTP 408/429/5xx, fallimenti tan-netwerk u timeouts jiksbu l-iktar tliet tentattivi, b’backoff esponenzjali ta’ 250/500 ms. Sekondi `Retry-After` jew dati HTTP jistgħu jestendu dewmien sa 5 sekondi. Statusijiet oħra jfallu immedjatament. Rifjut parzjali OTLP 2xx iqajjem ukoll żball minflok ma jirrikonoxxi span mitluf; acknowledgements vojta jew JSON validu jiġu aċċettati, b’limitu ta’ 64 KiB għall-qari tat-tweġiba.

L-iżbalji fihom biss fatti proprjetà tal-esportatur: l-istatus HTTP, il-klassi tat-tentattiv mill-ġdid, in-numru ta’ tentattivi u l-għadd ta’ spans mibgħuta, jew kliem fiss dwar falliment ta’ acknowledgement/netwerk. Il-kontenut tat-tweġibiet tal-kollettur, l-għadd ta’ rifjuti parzjali u l-headers tat-tweġiba qatt ma jiġu kkupjati fl-iżbalji, fil-logs jew fid-dashboard. Lott fallut jew parzjalment aċċettat ma jiġix rikonoxxut: id-destinazzjoni turi Failing b’dak l-istatus, il-cursor jibqa’ fl-aħħar lott rikonoxxut, u l-ġirja li jmiss terġa’ tibgħat l-istess ringieli. Statusijiet permanenti jibqgħu jfallu sakemm il-kollettur jew il-konfigurazzjoni jiġu rranġati. Uża l-logs tal-kollettur stess għad-dettalji tat-tweġiba. Is-sommarji tal-iżbalji tal-call-log iżommu r-redazzjoni separata tagħhom.
`prepare()` ma jipprovdi xejn; Test jibgħat eżattament `{"resourceSpans":[]}` u jirrapporta l-istatus HTTP mingħajr ma jikteb spans fil-call-log.

L-IDs tat-trace u l-IDs tal-span huma l-ewwel 32/16-il ċifra eżadeċimali ta’ SHA-256 fuq
`"omniroute.trace\\0" + callLogId` u `"omniroute.span\\0" + callLogId`. L-ibgħat mill-ġdid iġorru IDs identiċi. Din mhijiex garanzija ta’ deduplikazzjoni: xi backends, inkluż l-ingestion ta’ Langfuse v4, ma jwettqux deduplikazzjoni ta’ spans bl-istess ID. Crash jew falliment parzjali ta’ biċċa jista’ jerġa’ jibgħat l-iktar il-lott wieħed tal-cursor li ma ġiex rikonoxxut; dak il-lott kollu jista’ jiġi duplikat, mhux biss l-aħħar biċċa HTTP tiegħu. Agħżel id-daqs tal-lott tal-cursor b’dan il-kompromess f’moħħok.

### Eżempju ta’ Langfuse

Ikkonfigura dawn l-oqsma għal istanza ta’ Langfuse self-hosted:

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

Ibni l-valur ta’ Authorization lokalment bħala Base64 tas-stringa litterali `public-key:secret-key`
(per eżempju b’`Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Twaħħalx kredenzjali reali fil-logs, screenshots jew issues. Il-mapping jistabbilixxi awtomatikament `x-langfuse-ingestion-version: 4`; Authorization xorta tiġi pprovduta f’`headers`.
Kemm il-headers kif ukoll is-salt tal-identità ġġenerat jużaw il-mekkaniżmu eżistenti tal-oqsma sigrieti kriptati u l-placeholders tal-API; `STORAGE_ENCRYPTION_KEY` huwa meħtieġ.

Il-mapping iżid it-tip/il-mudell tal-ġenerazzjoni, id-dettalji tal-użu tal-JSON (input/output/total u ċ-ċwievet disponibbli tal-cache), snapshots tal-input/output tal-JSON, il-livell ERROR/DEFAULT, messaġġ tal-istatus sanitizzat, isem tat-trace, id tas-sessjoni, ambjent fakultattiv u
`langfuse.observation.metadata.<key>` li jista’ jiġi ffiltrat għall-provider, il-mudell mitlub, il-path, il-combo, is-sors tal-cache u l-istatus. `langfuse.observation.completion_start_time` huwa f’format ISO 8601 fil-bidu + TTFT biss meta t-TTFT ikun magħruf u fi ħdan id-durata. L-ebda attributi tal-ispiża ma jintbagħtu.

Il-modi tal-identità japplikaw għal `langfuse.user.id`:

- `pseudonymous` (default): HMAC-SHA256 tal-id interna taċ-ċavetta API b’salt każwali ta’ 32 byte għal kull destinazzjoni. Is-salt jiġi ġġenerat fil-ħolqien jekk ma jkunx preżenti, jiġi kkodifikat bħala `identitySalt`, qatt ma jintbagħat lura, u jinżamm waqt l-editjar. L-ids mhux ipproċessati taċ-ċwievet qatt ma jitqiegħdu fl-attributi tal-span. Il-ħolqien mill-ġdid jew ir-rotazzjoni tas-salt ta’ destinazzjoni tibdel l-identitajiet.
- `keyName`: l-isem ikkonfigurat taċ-ċavetta API, u b’hekk jiġi żvelat intenzjonalment dak it-tikketta tal-operatur.
- `none`: l-ebda user id. It-tags tas-sessjoni xorta jiġu esportati meta jkunu preżenti; dawn il-modi ma janonimizzawx kontenut arbitrarju tal-prompt jew tikketti tas-sessjoni/korrelazzjoni pprovduti mill-operatur.

### Tibda mingħajr backfill

Fil-ħolqien biss, attiva **Ibda mill-pożizzjoni attwali (aqbeż il-logs eżistenti)** jew għaddi
`startFromCurrentPosition: true` fil-livell ta’ fuq tal-payload tal-API tal-ħolqien. Dan jinizjalizza
`cursor_row_id` għall-massimu attwali tar-rowid tal-call-log miżmum bl-użu tal-helpers eżistenti tal-cursor, mingħajr migrazzjoni. Id-default huwa false (cursor 0 u backfill tal-istorja miżmuma).
Mhuwiex setting biex jiġi resetjat il-cursor waqt aġġornament.

Iż-żieda kondiviża ta’ `ttftMs` iżżid ukoll kolonna nullable `ttft_ms` mal-mapper ta’ BigQuery
u mal-iskema tat-tabella l-ġdida: it-test tal-iskema jeħtieġ li kull qasam kanoniku tar-rekord ikollu kolonna. It-tabelli eżistenti jkomplu jesportaw mingħajr tibdil: `prepare()` jaqra l-iskema tat-tabella u jneħħi biss `ttft_ms` meta dik il-kolonna ma tkunx preżenti. Żid il-kolonna nullable INT64 biex tikseb it-TTFT
fir-run li jmiss, jew uża tabella ġdida. Il-kolonna fakultattiva tat-TTFT ma tiskattax aġġornament tal-iskema. Il-kolonni tal-evidenza tal-użu
isegwu l-fluss ta’ kompatibbiltà kondizzjonali u opt-in hawn taħt; oqsma oħra tar-row iżommu verifika stretta tal-iskema.

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

## 7. Tħaddimha

- **Dashboard**: Integrazzjonijiet → Esportazzjoni tal-logs. Żid destinazzjoni, agħżel **Ittestja** biex tiċċekkja l-kredenzjali
  mingħajr ma tikteb ringieli, imbagħad attivaha.
- **Backlog**: kull karta tad-destinazzjoni turi r-ringieli pendenti u l-cursor; `GET
/api/log-export/status` jirritorna l-istess ċifri flimkien mal-aħħar 20 eżekuzzjoni tal-job.
- **Destinazzjoni li tfalli ma tfallix lill-oħrajn** — is-sommarju tal-eżekuzzjoni jirreġistra l-istatus għal kull destinazzjoni
  f’`last_status` / `last_error`, u l-istorja tal-eżekuzzjonijiet tal-job iżżomm l-aggregat.
- **It-tħassir ta’ destinazzjoni jħassar il-cursor tagħha.** Meta terġa’ żżidha tibda mill-eqdem
  log ta’ sejħiet miżmum, u b’hekk terġa’ tibgħat ringieli li d-destinazzjoni jista’ jkun diġà għandha. Fuq BigQuery l-`insertId` għal kull ringiela
  jassorbi dan biss fit-tieqa ta’ deduplikazzjoni ta’ BigQuery stess, għalhekk ippreferi tiddiżattiva
  destinazzjoni minflok tħassarha.

### Kompatibbiltà tal-iskema tal-evidenza tal-użu

It-tabelli l-ġodda ta’ BigQuery jinkludu `usage_evidence` li jista’ jkun null (STRING li fih JSON) u
`usage_estimated` (BOOL). Meta `autoCreate` ikun attivat, tabella eżistenti tista’ tirċievi biss dawn il-kolonni nullabbli neqsin. L-esportatur iżomm l-iskema eżistenti sħiħa,
inkluża l-metadata tal-oqsma, u jibgħat PATCH kondizzjonali billi juża l-etag ritornat. Bidla konkorrenti fl-iskema tfalli l-esportazzjoni minflok ma tissostitwiha;
l-eżekuzzjoni li jmiss terġa’ taqra t-tabella.

Meta `autoCreate` ikun diżattivat, żid dawn il-kolonni int stess qabel tesporta rekords
b’evidenza tal-użu. Metadata nieqsa tal-iskema/etag jew aġġornament li falla jipprevjenu wkoll inserzjonijiet li fihom evidenza. Il-cursor tal-esportazzjoni ma javvanzax meta jseħħ dak il-falliment u
l-evidenza qatt ma titħalla barra b’mod sieket. Iż-żamma lokali tal-logs tibqa’ tapplika waqt li esportazzjoni tkun imblukkata, għalhekk issolvi l-falliment qabel ma jiskadu r-ringieli tas-sors miżmuma.
