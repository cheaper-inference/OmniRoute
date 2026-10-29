# Log export (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Fitar da rajistar kiran OmniRoute zuwa ma'ajiyar nazarin bayanai ta waje a kai a kai, da ƙarin sabbin bayanai a hankali.

Shafin Logs na dashboard yana adana tarihin buƙatu a SQLite (`call_logs`), wanda
juyawa da manufofin riƙe bayanai suke iyakancewa. Fitar da rajista yana aika waɗannan bayanan bisa jadawali domin su daɗe fiye da
rumbun bayanan cikin gida kuma a haɗa su da wasu bayanai. BigQuery ne wurin karɓa na farko;
tsarin aikin yana amfani da rajista, don haka ana iya ƙara ƙarin wuraren karɓa.

---

## 1. Yadda yake aiki

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Jadawali** — aikin cron guda ɗaya na `JobRegistry`, `log_export`, wanda ƙimarsa ta asali ita ce `0 * * * *` (duk sa'a,
  UTC). An yi masa rajista a `src/lib/initCloudSync.ts`; ana iya sauya shi da `OMNIROUTE_LOG_EXPORT_CRON`.
  Kowace bugawar jadawali tana kwashe bayanai zuwa kowane wurin karɓa da aka **kunna**, ɗaya bayan ɗaya.
- **Alamar ci gaba** — `call_logs.rowid` na SQLite na ɓoye, ana adana shi ga kowane wurin karɓa a
  `log_export_destinations.cursor_row_id`. Da gangan ba a amfani da `timestamp` a matsayin alamar ci gaba: masu kira
  na iya bayar da ƙimarsu, don haka ana iya rubuta buƙata mai jinkiri bayan wata mai sauri da ta fara
  daga baya, kuma alamar ci gaba ta lokaci za ta tsallake ta.
- **Rarrabawa zuwa rukuni** — layuka `batch_size` a kowace buƙata (ƙimar asali 500), layuka `max_rows_per_run` a kowane zagaye
  (ƙimar asali 10000), domin a kwashe tarin bayanai mai yawa a bugawar jadawali da dama maimakon ya toshe guda ɗaya.
- **Isarwa** — alamar ci gaba tana matsawa ne kawai bayan `send()` ya kammala cikin nasara. Rukunin da ya gaza yana barin
  alamar ci gaba a inda take, don haka a sake gwada layukan a zagaye na gaba. Tabbacin shi ne
  isarwa aƙalla sau ɗaya tare da kawar da maimaituwa a wurin karɓa, ba ainihin isarwa sau ɗaya tak ba: BigQuery yana ba kowane
  layi maɓalli bisa id na rajistar kira, wanda yake ƙoƙarin mutuntawa gwargwadon iko a cikin wa'adinsa na kawar da maimaituwa.
- **Kariyar cin karo** — bugawar cron da `POST .../run` na iya faruwa tare. Ana tsallake wurin karɓa
  da ake riga ake kwashe bayanai zuwa gare shi maimakon a yi haka sau biyu (`skipped: true` a sakamakon zagaye),
  don haka zagayen da ke gudana a lokaci guda ba zai iya sake aika rukuni ko mayar da alamar ci gaba baya ba.
- **Farfadowa bayan sharewa** — idan `cursor_row_id` ya wuce `MAX(rowid)` (an
  share dukkan teburin kuma rowids sun sake farawa), mai gudanarwa yana komawa 0 maimakon ya daina ganin sabbin bayanai har abada.

### Mai gudanarwa da aka ware da iyakoki

Kowane zagayen wurin karɓa a Node yana fara wani keɓantaccen ƙaramin tsari na OS mai ɗan gajeren rai (`child_process`
tare da IPC, ba `worker_threads` ba). Karanta jikin bayanai, fassara/tsara JSON na bayanan da za a aika,
`prepare()` na wurin karɓa da shigarwa/fitarwar sadarwar wurin karɓa duk suna gudana a can, ba a madaukin abubuwan da ke faruwa na uwar garke ba.
Saituna da ƙananan saƙonnin ci gaba ne kawai suke ketare IPC; bayanan da aka fitar ba sa komawa
uwar garke. Aikin cron da hanyar Run now suna riƙe sakamakon da ake nunawa da kariyar cin karo iri ɗaya.

Ƙaramin tsarin yana buɗe `DATA_DIR/storage.sqlite` da uwar garke ta tantance don karantawa kawai ta amfani da `node:sqlite`,
tare da `busy_timeout=5000` da `query_only=ON`. Ba ya shigo da DB singleton kuma ba ya yin
ƙaura, ajiyar madadin bayanai ko sabunta SQLite. Kula da bayanan artifact da suka ɓace/lalace (ciki har da
UPDATE na artifact da ya lalace) yana nan a hanyar cikakkun bayanai ta dashboard kawai. Hanyoyin biyu suna amfani da mai
warware cikakkun bayanai marar sauya yanayi guda ɗaya; fitarwa yana amfani da karatun tsarin fayil na asynchronous da jerin warwarewa iri ɗaya: artifact → tsohon
inline → tsohon disk → babu. Zagaye yana ɗaukar hoton iyakar rowid na shigarwa
lokacin da ƙaramin tsarin ya buɗe mai karatunsa; shigarwar da ta biyo baya tana jira zagaye na gaba. Wannan iyakar
shigarwa ce, ba mu'amalar SQLite mai ɗorewa ba: masu rubutun WAL da wuraren tabbatarwa suna nan a sake yayin
jiran sadarwa. Wannan iyaka ba ta daskarar da sabuntawa/share layukan da suke akwai ba.

Bayan kowane rukuni da aka amince da shi, ƙaramin tsarin yana jiran saƙon tabbatarwa. Uwar garke da farko tana adana
alamar ci gaba ta `advanceLogExportCursor`, sannan ta aika `ack`; babu rukunin gaba da zai fara kafin haka.
Gazawar aikawa, rushewa ko ƙarewar lokaci yana rubuta gazawa ba tare da matsar da alamar wannan rukunin ba. Rukunonin da aka
riga aka tabbatar suna nan a adane; aƙalla rukunin guda ɗaya da ba a tabbatar ba ne kaɗai za a iya sake aikawa.
Ana rubuta nasara ne kawai bayan `done` da fitowar ƙaramin tsarin ba tare da matsala ba. Gazawa tana dakatar da ƙaramin tsarin
da SIGTERM, sannan ta koma SIGKILL bayan 500 ms, kuma mai gudanarwa yana jira tsarin ya rufe.

| Canjin muhalli                                | Ƙimar asali | Manufa                                        |
| --------------------------------------------- | ----------- | --------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000      | Iyakar lokacin gaske ga kowane wurin karɓa    |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024        | Iyakar old-space na V8 na ƙaramin tsarin a MB |

Ƙimomin da ba su inganta ba/ba su fi sifili ba/ba cikakkun lambobi ba suna amfani da ƙimomin asali. Saitin heap ba iyakar
jimillar RSS ba ne; manyan rukunoni sosai har yanzu na iya ƙarar da ƙwaƙwalwar ƙaramin tsarin su sa zagaye ya gaza cikin aminci.
Ƙimar asali ta 1024 MB tana barin isasshen sarari ga rukunin asali mai layuka 500 na artifacts masu 512 KiB tare da
kunna jikin bayanai, ciki har da tsara JSON na BigQuery zuwa gutsattsari bisa bytes. Ba ya sa
rukunin jikin bayanai mai layuka 10000 ya zama amintacce. Ƙarewar heap na V8 yana rubuta gazawar da ke da matakin gyara: rage girman
rukuni ko ƙara `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; alamar ci gaba tana nan a rukunin ƙarshe
da aka tabbatar. Iyakacin artifact na zamani bai shafi tsoffin jikin bayanai na inline/disk ba.
Masu gudanarwa dole su ware kasafin RSS dabam, musamman a cikin containers masu iyakantacciyar ƙwaƙwalwa.

Tsarin ɗan yana gadon `DATA_DIR` da aka tantance, `NODE_ENV`, `TZ` da aka saita kai tsaye (tsohuwar hanyar
tantance lokacin gida daga sunan fayil), `ELECTRON_RUN_AS_NODE` idan yana nan, da waɗannan saitunan haɗin fita kawai:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (da sigoginsu na ƙananan haruffa),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Mai rarraba buƙatu na Undici na gama-gari yana amfani da hanyar sabar ta tantance wakilin haɗi daga muhalli kawai da ƙa'idodin
ƙetare wakili don na'urorin gida, ciki har da `NO_PROXY`; ba ya shigo da `proxyFetch.ts` ko tutocinsa na DB/fasaloli.
Ana ɓoye bayanan shaidar wakilin haɗi daga fitarwar da aka tura da kurakuran da aka rubuta. Bayanan shaidar wurin aika bayanai
suna tafiya ne kawai a saƙon IPC guda ɗaya na farawa, ba ta argv ko muhalli ba; ana ƙara alamar farko ga fitarwa/kurakuran da ake turawa
kuma ana tsabtace su. `ExperimentalWarning` kawai ake kashewa a muhawarar exec ta tsarin ɗan don guje wa
maimaita gargaɗin SQLite na Node a kowane aikin cron; sauran nau'ikan gargaɗi suna ci gaba da bayyana.

Dole ne a iya shigo da modulolin wurin aika bayanai ba tare da dogaro da Next.js/abubuwan da suka keɓanta ga sabar ba. Tsarin
BigQuery da ake da shi ya riga ya cika wannan sharaɗi. Ma'ajiyar wucin gadi ta token ɗin samun dama tana ɗorewa ne kawai a lokacin
gudanarwar tsarin ɗan, ba tsakanin gudanarwa ba. Node shi ne muhallin gudanarwa da ake tallafawa (`package.json` engines), amma sashen
shigar da Bun a README da `Dockerfile.bun` su ma suna nuna hanyar dacewa don amfani a samarwa ta
`bun:sqlite` (`src/lib/db/core.ts` / adaftoci). Saboda haka, a ƙarƙashin Bun, fitar da bayanai yana riƙe tsohuwar
hanyar cikin tsari ɗaya kuma yana fitar da gargaɗi sau ɗaya: ba a samun keɓancewar heap/lokacin ƙarewar tsarin ɗan. Yi amfani da
Node don keɓance madaukin abubuwan da ke faruwa da OOM; ba a ɗauki Bun a nan a matsayin na haɓakawa kawai ba.

Idan an kunna `includeBodies`, a fi son jadawalin da ke gudana bayan wasu mintuna kamar
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` maimakon tara nauyin bayanai na sa'a guda.
Iyakokin rukuni da layuka har yanzu suna iyakance kowace gudanarwa. Ana biyan kuɗin fara tsari ga kowane wurin aika bayanai a kowace gudanarwa;
wannan yana musanya ƙaramin kuɗin farawa da keɓance madaukin abubuwan da ke faruwa na sabar, ba rage jimillar amfani da CPU ba.

### Nauyin bayanai (saƙonnin umarni da amsoshi)

A tsari na asali, fitarwar tana ɗauke da filayen taƙaitawa kawai waɗanda **jerin** Rajistan ke nunawa. Kunna
**Fitar da saƙonnin umarni da amsoshi** (`includeBodies`) yana kuma aika abin da ɓangaren **cikakken bayani**
na Rajistan ke nunawa ga kowace kira:

| Fili                             | Abin da yake ɗauke da shi                                       |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | Nauyin bayanan kira kamar yadda allon bayanai ke nuna su        |
| `pipeline_route_decision`        | Wurin da samfurin da mai tsara hanya ya zaɓa                    |
| `pipeline_client_request`        | Buƙatar asali daidai yadda abokin hulɗa ya aika ta              |
| `pipeline_openai_request`        | Bayan sauya ta zuwa tsarin OpenAI na ciki                       |
| `pipeline_provider_request`      | Yadda aka aika ta a zahiri zuwa mai samarwa, a tsarinsa         |
| `pipeline_provider_response`     | Amsar asali daga mai samarwa                                    |
| `pipeline_client_response`       | Abin da aka mayar wa mai kira                                   |
| `pipeline_error`                 | Cikakken kuskuren matakin bututun sarrafawa ga kiran da ya gaza |
| `bodies_truncated`               | Gaskiya idan wani filin da ke sama ya kai `maxBodyBytes`        |

Wannan abun cikin saƙon umarni ne, don haka **a kashe yake a tsari na asali** kuma da gangan zaɓinsa yake ga kowane wurin aika bayanai.
Abin da ake aikawa shi ne abin da allon bayanai ke nunawa, domin fitarwa da `getCallLogById` suna amfani da hanyar samo cikakkun bayanai
ɗaya: an riga an
tsabtace nauyin bayanan daga bayanan gano mutum (PII) kuma an ɓoye sirrinsu lokacin rubuta su, kuma kiran da aka yi da
maɓallin API na `noLog` ba ya adana wani nauyin bayanai kwata-kwata, don haka babu abin fitarwa.

Ana karanta nauyin bayanai ga kowane layi daga fayil ɗin da aka adana a tsarin fayiloli, don haka cika cikakkun bayanai yana gudana ne kawai ga wuraren aika bayanai
da suka nema. Idan fayil ɗin ya ɓace ko ya lalace, ana fitar da taƙaitawarsa tare da nauyin bayanai na null maimakon
kasa gudanar da rukunin gaba ɗaya da barin ma'aunin matsayi a makale.

`maxBodyBytes` (na asali 262144) yana iyakance kowane fili. Nauyin bayanai da ya fi tsawo ana **datse shi maimakon
watsar da shi** — saƙon umarni da aka datse har yanzu yana amsa "me aka tambaya" — kuma ana sa wa layin alamar
`bodies_truncated`. Ba a fitar da sauye-sauyen da aka jera sashe-sashe ta rafi; amsar da aka haɗa tana
nan tuni a `pipeline_provider_response` da `pipeline_client_response`.

---

## 2. Fayiloli

| Sashe                             | Wuri                                         |
| --------------------------------- | -------------------------------------------- |
| Ƙa'idar wurin aikawa              | `src/lib/logExport/types.ts`                 |
| Rajista                           | `src/lib/logExport/registry.ts`              |
| Sarrafa bayanan sirri             | `src/lib/logExport/secrets.ts`               |
| Mai gudanarwa (IPC na tsarin uwa) | `src/lib/logExport/runner.ts`                |
| Zagayen rayuwar tsari             | `src/lib/logExport/childRunner.ts`           |
| Mashigar tsarin ɗa                | `src/lib/logExport/exportChild.ts`           |
| Mai buɗewa don karantawa kawai    | `src/lib/db/logExportReadOnly.ts`            |
| Tambaya/daidaitawa na bai ɗaya    | `src/lib/usage/callLogExportQueries.ts`      |
| Mai warware cikakkun bayanai      | `src/lib/usage/callLogDetailResolver.ts`     |
| Tsara bayanan API                 | `src/lib/logExport/presenter.ts`             |
| Wurin aikawa na BigQuery          | `src/lib/logExport/destinations/bigquery.ts` |
| Tabbatar da asalin Google SA      | `src/lib/logExport/googleServiceAccount.ts`  |
| Tushen rajistar kira              | `src/lib/usage/callLogExportSource.ts`       |
| Adanawa na dindindin              | `src/lib/db/logExportDestinations.ts`        |
| Aikin Cron                        | `src/lib/jobs/logExportJob.ts`               |
| Matakin REST                      | `src/app/api/log-export/`                    |
| Shafin allon kulawa               | `src/app/(dashboard)/dashboard/log-export/`  |

Tsarin bayanai: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Ana tabbatar da izinin gudanarwa ga duk hanyoyi (`requireManagementAuth`). Ba a taɓa mayar da bayanan sirri ba:
ana mayar da bayanin sirrin da aka adana a matsayin ƙimar zahiri `__stored__`, kuma sake aika wannan ƙimar yayin sabuntawa
yana riƙe bayanan shaidar da aka adana.

Ƙirƙira ko sabunta wurin aikawa wanda nau'insa ya ayyana bayanin sirri **yana buƙatar
`STORAGE_ENCRYPTION_KEY`**. Idan babu shi, `encrypt()` yana wuce bayanan ba tare da sauya su ko sanarwa ba, don haka ana
ƙin rubutawar da lambar 400 maimakon saka bayanan shaida cikin SQLite a rubutu marar ɓoyewa (irin kariyar da
webhook na Telegram yake amfani da ita).

| Hanya    | Tafarki                                  | Manufa                                                                     |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Nau'ikan wuraren aikawa + jerin filayen saitinsu                           |
| `GET`    | `/api/log-export/destinations`           | Jera wuraren aikawa (an ɓoye bayanan sirri)                                |
| `POST`   | `/api/log-export/destinations`           | Ƙirƙiri wurin aikawa                                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Karanta guda ɗaya                                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | Sabunta suna / kunnawa / saiti / rarrabawa zuwa rukuni                     |
| `DELETE` | `/api/log-export/destinations/{id}`      | Goge                                                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | Gwada bayanan shaida, ba tare da rubuta komai ba                           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Aika duk bayanan da ke jira yanzu, ta hanyar da aikin da aka tsara yake bi |
| `GET`    | `/api/log-export/status`                 | Yanayin Cron, ayyukan baya-bayan nan, bayanan da ke jira ga kowane wuri    |

`GET /api/log-export/types` shi ne ke sa UI ya zama na bai ɗaya: ana gina fom ɗin allon kulawa daga
bayanin filayen da aka mayar, don haka sabon wurin aikawa ba ya buƙatar sauyin UI.

---

## 4. Makomar BigQuery

Maɓallan daidaitawa (`type: "bigquery"`):

| Maɓalli              | Bayani                                                                              |
| -------------------- | ----------------------------------------------------------------------------------- |
| `projectId`          | Aikin GCP da ke ɗauke da tarin bayanai                                              |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                     |
| `location`           | Ana amfani da shi ne kawai idan za a ƙirƙiri tarin bayanai (tsoho `EU`)             |
| `serviceAccountJson` | Maɓallin asusun sabis. Sirri: ana ɓoye shi yayin adanawa, ba a taɓa mayar da shi ba |
| `autoCreate`         | Ƙirƙiri tarin bayanai da tebur a fitarwa ta farko (tsoho `true`)                    |

Asusun sabis yana buƙatar `bigquery.tables.updateData` a kan teburin da ake nufi, tare da
`bigquery.datasets.create` / `bigquery.tables.create` idan an kunna `autoCreate`.

Rukunin da aka daidaita raka'ar **cursor** ce, ba ta HTTP ba: `send()` yana rarraba shi zuwa kiran insertAll
masu layuka 500 aƙalla iyaka, don haka babban `batch_size` ba zai iya ƙetare iyakar buƙata ta 10 MB ta BigQuery ba.
Ana sake gwada lambobin matsayi na wucin gadi (408/429/500/502/503/504) har sau uku tare da ƙara
lokacin jira a ninki-ninki, ana sake amfani da insertIds iri ɗaya; gazawar tantancewa da tsarin bayanai suna jefa kuskure a yunƙurin farko maimakon
ɓata dukkan aikin.

Teburin da aka ƙirƙira yanzu-yanzu bai riga ya bayyana ga wurin karɓar bayanai masu gudana ba, wanda ke mayar da
404 na wasu daƙiƙu. Ana sake gwada wannan 404, amma **sai idan wannan aikin ne ya ƙirƙiri teburin** —
teburin da babu shi da gaske har yanzu yana gaza nan da nan. Lura cewa sake ƙirƙirar tebur da sunan da
aka goge kwanan nan yana sa BigQuery ya ƙi shigar da bayanai masu gudana na mintuna da dama; wannan
halayya ce ta gogewa sannan a sake ƙirƙirawa, don haka ya fi kyau a yi amfani da sabon sunan tebur maimakon gogewa da sake ƙara shi.

**Gazawar wani ɓangare tana zuwa a matsayin HTTP 200 tare da `insertErrors[]` da ba komai ba.** Ana ɗaukar wannan a matsayin
gazawa kuma yana jefa kuskure, wanda shi ne ke hana cursor ci gaba ya wuce layukan da BigQuery bai taɓa
karɓa ba; `tests/unit/log-export-bigquery.test.ts` yana tabbatar da wannan halayya.

Ana jigilar bayanai ta REST kai tsaye — ana musanya shaidar RS256 da aka sanya wa hannu da kai da token na shiga a
`https://oauth2.googleapis.com/token`, sannan layuka su tafi zuwa `tabledata.insertAll`. Ba a shigo da Google SDK
ba. Ana adana token na shiga a ma'ajiyar wucin gadi cikin tsarin aiki bisa ga kowane (asusun sabis, iyakar izini).

Teburin da aka ƙirƙira yana da ginshiƙi ɗaya ga kowane filin shafin Logs tare da `exported_at`, kuma an tsara shi bisa
yadda ake yin tambayoyi kan bayanan kira a zahiri:

- **An raba shi kashi-kashi bisa rana ta amfani da `timestamp`**, don haka tambayar da aka iyakance da kwanan wata tana bincika waɗannan ranakun kawai.
- **An haɗa shi rukuni-rukuni bisa `api_key_name`, `provider`, `model`, `status`** (a wannan jeri), don haka tacewa bisa
  wanda ya gudanar da shi, inda ya tafi, ko ko ya gaza yana ware tubalan da ba a buƙata a cikin kowane kashi. BigQuery
  yana ba da damar ginshiƙan haɗa rukuni guda huɗu aƙalla iyaka kuma jerinsu yana da muhimmanci: tacewa da `api_key_name` kaɗai
  yana ware tubalan da ba a buƙata, tacewa da `status` kaɗai ba ya yi.
- **Zaɓin wa'adin riƙe kashi** ta hanyar `partitionExpirationDays` (0 yana riƙe komai), ana aiwatar da shi
  lokacin da aka ƙirƙiri teburin.

Duk saitunan biyu suna aiki ne a lokacin ƙirƙirawa. Teburin da yake akwai yana riƙe da tsarin da yake da shi, don haka
sanya makomar ta nufi sabon id na tebur idan kana son amfani da su.

`tests/unit/log-export-bigquery.test.ts` yana tabbatar da cewa mai taswirawa da tsarin tebur suna tafiya
tare, don haka ba za a iya watsar da sabon ginshiƙin bayanan kira a ɓoye yayin fitarwa ba.

Ana rarraba rukunoni bisa **duka biyun** yawan layuka da adadin bytes bayan an jera bayanan don aikawa. Yawan layuka kaɗai bai isa ba
idan ana fitar da cikakkun bayanan saƙonni: layuka 500 masu ɗauke da umarnin shigarwa na iya kai megabytes da dama, kuma insertAll
yana ƙin buƙatar da ta wuce 10 MB. Ana rufe gutsure idan ya kai layuka 500 ko 9 MB, duk wanda ya fara zuwa.

---

## 5. Wurin aika traces na OTLP/HTTP

Saitin yana amfani da `type: "otlp-http"`. Wannan fitarwa ce da aka tsara lokacinta, wadda ke amfani da cursor don fitar da
rajistar kira da aka adana, ba wurin karɓar abubuwan routing kai tsaye na ƙoƙarin-gwargwado da ke cikin
`open-sse/services/routing/otel.ts` ba. Ba ya karanta ko sauya environment variables,
masu ƙidayar lokaci ko buffers na wannan wurin karɓa. Kunna su duka na iya samar da nau'ikan spans guda biyu masu zaman kansu;
yi amfani da instrumentation scope na `omniroute.log-export` don bambance waɗannan spans na rajistar kira.

| Maɓalli                  | Tsohon ƙima / manufa                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `endpoint`               | Ana buƙatar cikakken URL na traces na HTTP(S); ba a liƙa ƙarin `/v1/traces` a ƙarshe                           |
| `headers`                | Layukan `Name: value` ko JSON object mai strings na zaɓi; ana ɓoye su da encryption                            |
| `requestHeaderAllowlist` | Babu komai (a kashe); sunayen headers/farkon sunayensu na abokin ciniki da za a ɗauka a matsayin siffofin span |
| `serviceName`            | `omniroute`; resource `service.name`                                                                           |
| `langfuseMapping`        | `false`; yana ƙara siffofin generation/session/user na Langfuse                                                |
| `identity`               | `pseudonymous`, `keyName`, ko `none`                                                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                                        |
| `timeoutMs`              | `30000` ga kowane yunƙurin HTTP                                                                                |
| `environment`            | Ba a saita ba; `langfuse.environment` na zaɓi                                                                  |

Dashboard na gama-gari yana nuna waɗannan filayen. `paths` yana karɓar array na API ko textarea
mai ainihin paths da aka raba da sabbin layuka/waƙafi. Ana tsallake embeddings, rerank da sauran paths
sai dai idan an ba su izini a sarari. Layukan da aka tsallake suna ci gaba da matsar da cursor; masu ƙidayar
`exported`/`exportedTotal` na runner da ake da shi suna ƙirga layukan tushe da aka sarrafa, har da layukan
da aka tace, maimakon spans da aka karɓa. Ana yin tacewar a cikin tsarin ɗan,
ba tare da sauya yarjejeniyarsa ta IPC/cursor ba.

Tantance URL yana amfani da mataimakin `parseAndValidateNonMetadataUrl` wanda ba ya buƙatar DB daga
`src/shared/network/outboundUrlGuard.ts`: manufar `block-metadata`. Yana da binciken
metadata/protocol/bayanan shiga da aka saka a ciki marasa sharadi iri ɗaya da na mai tantance webhook
lokacin da aka amince da URLs masu zaman kansu, amma da gangan yana ba da damar wuraren localhost/LAN ba tare da
override na feature-flag na duniya ba. Wannan yana ba da damar endpoints na Langfuse, Phoenix, Tempo da Collector
da ake gudanarwa a kan na'urar kai, har da endpoints na HTTP masu zaman kansu. Kullum ana toshe hosts na cloud-metadata.
Ba a bin redirects, don haka collector ba zai iya karkatar da bayanan shiga zuwa wani host ba.
Kamar mai tsaron URL na lexical da ake da shi, wannan ba ya kulle DNS resolution; sai a saita
hosts da mai gudanarwa ke sarrafawa kawai. A fifita HTTPS duk lokacin da endpoint ba ya kan hanyar sadarwa da aka amince da ita.

### Payload da isarwa

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) yana ɗauke da
span na CLIENT guda ɗaya ga kowane layi da aka amince da shi, wanda ake sa wa sunan ainihin path na buƙatarsa. Sanya suna bisa path yana bambance
Chat Completions, Responses da Messages ba tare da saka bayanan model ko asali a cikin
sunan span ba. Siffofin resource sun haɗa da `service.name` da `service.version` na package.

Mai rubuta rajistar yunƙurin tattaunawa na yau da kullum (`open-sse/handlers/chatCore/attemptLogging.ts`) yana rubuta
`duration = Date.now() - startTime` lokacin kammalawa kuma ba ya bayar da timestamp;
`saveCallLogOperation` a cikin `src/lib/usage/callLogs.ts` yana saita timestamp zuwa lokacin rubutawa
(kammalawa) idan ba a bayar ba. Saboda haka fitarwa tana saita ƙarshen lokaci = timestamp na layin da farkon lokaci = ƙarshen lokaci − duration
(milliseconds, da aka juya zuwa nanoseconds na decimal). Ana kuma kiyaye timestamps na tarihi
da mai kira ya bayar a matsayin lokacin ƙarshe; babu mai bambance farawa/kammalawa ga kowane layi.
Duration mai null yana zama sifili. Timestamps marasa inganci/waɗanda suka ɓace suna sa batch ya gaza maimakon ƙirƙirar
spans marasa tabbataccen sakamako. `ttftMs` na iya zama null kuma ana daidaita shi da `omniroute.ttft_ms`.

Siffofin sun haɗa da `gen_ai.operation.name="chat"`, mai bayarwa, model da aka nema/na amsa,
tokens na shigarwa/fitarwa, tokens na cache-read/cache-creation/reasoning na zaɓi, matsayin HTTP,
combo, tushen cache, alamar session da correlation id. Ƙimomin integer na OTLP da timestamps
strings ne na decimal; strings, booleans da lambobi masu kaso suna amfani da nau'ikan ƙimar OTLP
nasu na asali. Spans na kuskure suna da matsayin ERROR da saƙon matsayi da aka tsabtace. Rikodin
asali ba shi da URL na upstream host, don haka ana barin `server.address` maimakon a yi kuskuren
ɗaukar collector a matsayin sabar model. Ba a fitar da kuɗin amfani.

`includeBodies=true` kaɗai ne ke loda cikakken abun ciki. Da `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` suna ɗauke da JSON na jikin buƙata/amsa
da aka tsabtace kamar yadda OmniRoute ya adana shi (ana mayar da shi tsarin asali idan ana iya parse ɗinsa), ba array
na saƙonnin semconv da aka sake fasalta ba. Jikunan da aka yanke/waɗanda ba JSON ba suna nan a matsayin ɗanyen rubutu. Da `langfuseMapping=true`,
ana fitar da jikuna ne kawai a matsayin `langfuse.observation.input` / `langfuse.observation.output`;
ana barin siffofin `gen_ai.*.messages` don a aika kowane jiki sau ɗaya. Dukkan hanyoyin biyu
suna gadon `maxBodyBytes` daga hanyar loda cikakken abun ciki da ake da ita;
`omniroute.bodies_truncated=true` yana nuna yankewa.
Wannan wurin aika bayanai ba ya ƙara wasu snapshots na pipeline ko karanta artifacts marasa tsabtacewa;
ɗaukar request-header na zaɓi yana amfani da cikakken snapshot na abokin ciniki da ake da shi wanda aka bayyana a ƙasa.
Yi amfani da jadawalin mintuna kamar `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` yayin fitar da
jikuna, maimakon tara bayanan da ba a sarrafa ba na kowace awa.

### Headers na buƙatar abokin ciniki na zaɓi

Ɗaukar headers yana **a kashe bisa tsohon saiti**. Saita `requestHeaderAllowlist` a saitin wurin aika bayanai
kuma kunna **Fitar da prompts da amsoshi** (`includeBodies: true` a wurin aika bayanai).
Jerin izinin yana karɓar array na API ko textarea mai sunaye da aka raba da sabon layi/waƙafi:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Sunaye suna dacewa da juna daidai ba tare da la’akari da manyan ko ƙananan haruffa ba, sai dai idan `*` guda ɗaya a ƙarshe ya zaɓi mafari
na sunan header wanda ba fanko ba. Ana ƙin `*` shi kaɗai, alamomin maye-gurbi da aka saka a tsakiya da sunayen header na HTTP marasa inganci.
Akwai masu zaɓe da ba su wuce 64 ba, kowannensu yana da suna/mafari da bai wuce bait 256 na ASCII ba.
Wannan saiti ya bambanta da `headers`, wanda ke tantance mai fitarwa ga mai tarawa.

Ɗaukar bayanai yana karanta `pipeline_client_request` kawai, wanda ake cika shi daga
`clientRawRequest` na cikakken pipeline da aka adana (ko tsohon `clientRequest`). Ba ya taɓa komawa ga header na buƙatar mai samarwa.
Dole ne an kunna cikakken rubuta rajistar pipeline lokacin da aka rubuta buƙatar. Idan an
kashe `includeBodies`, ko JSON na hoton bayanan abokin ciniki ya ɓace, ya lalace ko an datse shi, ba a fitar da siffofin
header. Ƙara `maxBodyBytes` na iya hana datse hoton bayanai a lokacin fitarwa;
ba zai iya dawo da cikakkun bayanan da ba a taɓa adanawa ba. Ana watsi da hoton bayanai da ya wuce 1 MiB ko yake ɗauke da
shigarwar header fiye da 256. Fitar da prompt/amsa da ake yi tana ci gaba da kasancewa a kunne tare da
ɗaukar header; jerin izini ba ya samar da yanayin cika bayanai na header kaɗai.

Ƙimomin da aka zaɓa suna zama jerin zaren OTLP na `http.request.header.<full lowercase header name>`,
ko da zare guda ɗaya ne. Misali, `X-OmniRoute-Meta-Team: example-team` yana zama
`http.request.header.x-omniroute-meta-team` tare da
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Ana kiyaye cikakken mafari: waɗannan header ne na yau da kullum, ba tare da tantance filayen kasuwanci ko
juyawa zuwa metadata na `omniroute.metadata.*` / Langfuse ba. `langfuseMapping` ba ya canza ma’anar
header. Zaɓaɓɓen `User-Agent` mai ƙima guda ɗaya kuma yana saita daidaitacciyar ƙima guda ta
`user_agent.original`. Ba a raba wakafi da ke cikin ƙima guda ɗaya. Ana haɗa bambance-bambancen manyan da ƙananan haruffa bisa
tsarin shigarwar da aka adana; duk wani bambanci marar inganci yana sa a bar duk header ɗin. Ana tsara siffofi bisa suna mai ƙananan haruffa.

Koyaushe ana ware Authorization, Proxy-Authorization, Cookie, Set-Cookie, header na maɓallin API, sunayen da ke ɗauke da
alamomin auth/token/secret/password/credential, da bayanan shaidar ƙofar shiga ta ciki,
ko da an zaɓe su ko an rufe wani ɓangarensu a ma’ajiya. Sanannun tsare-tsaren bayanan shaida suna sake amfani da
mai gano bayanan shaida na bai ɗaya; ana barin alamomin ɓoye bayanai, ba a fitar da su a matsayin ƙimomi masu aminci ba.
Zare da jerin zare marasa fanko kawai ake karɓa; ba a tilasta lambobi ko abubuwa su koma zare.
Ana watsi da sunaye marasa inganci, maɓallan prototype, haruffan sarrafawa (sai dai tab na kwance) da Unicode marar tsari
ba tare da sa rukunin ya gaza ko nuna abubuwan da suke ɗauke da su a cikin kurakurai ba.

Kowane span yana ɗaukar header da ba su wuce 32 ba, ƙimomi 16 ga kowane header, bait 4096 na UTF-8 ga kowace ƙima,
da jimillar bait 16384 na UTF-8 a duk sunaye da ƙimomin header da aka ɗauka. Ana barin header da suka wuce girma ko marasa inganci
gaba ɗaya, ba a datse su ba. Zaɓi shawarar sirri ce ta mai gudanarwa: sunayen da suke kama da masu aminci
har yanzu suna iya ɗauke da bayanan mutum, kuma waɗannan iyakoki/masu ganowa ba kayan share PII na gama gari ba ne.

### Iyakokin isarwa

Ana iyakance buƙatu zuwa span 500 da 4 MiB na JSON na UTF-8, har da ambulan bayanai.
Ana duba girman kowane span da aka amince da shi kafin buƙatar farko ta rukunin cursor. Idan
span guda ɗaya ya fi iyaka girma, ba a aika kowane ɓangare na rukunin ba kuma yana gaza tare da umarnin rage
`maxBodyBytes`; ba a jefar da shi a ɓoye ba. Binciken farko yana riƙe da manazartan rikodi da
ƙidayar bait kawai, yana watsar da kowane span/JSON na wucin gadi; ana sake gina span don gutsattsari masu iyaka
maimakon riƙe kwafi na biyu na rukunin da aka jera. HTTP 408/429/5xx, gazawar hanyar sadarwa da ƙarewar lokacin jira suna samun aƙalla iyakar
yunƙuri uku, tare da jinkirin sake gwadawa na 250/500 ms mai ƙaruwa ninki-ninki. Daƙiƙun `Retry-After` ko kwanakin HTTP
na iya tsawaita jinkiri har zuwa daƙiƙa 5. Sauran matsayin suna gaza nan take. Ƙin karɓar wani ɓangare na OTLP 2xx ma yana jefa kuskure maimakon
tabbatar da karɓar span da ya ɓace; ana karɓar tabbacin karɓa marar komai ko mai ingantaccen JSON, tare da
iyakar karanta amsa ta 64 KiB.

Kurakurai suna ɗauke da hujjojin mai fitarwa kawai: matsayin HTTP, nau’in sake gwadawa, yunƙuri da adadin span
da aka aika, ko tsayayyen rubutun gazawar tabbacin karɓa/hanyar sadarwa. Ba a taɓa kwafe jikin amsoshin mai tarawa,
ƙidayar nasarar wani ɓangare da header na amsa zuwa kurakurai, rajistoci ko
allon bayanai ba. Ba a tabbatar da karɓar rukunin da ya gaza ko aka karɓi wani ɓangarensa ba: wurin da ake aikawa yana nuna
Gazawa tare da wannan matsayin, cursor yana tsaya a rukunin ƙarshe da aka tabbatar da karɓa, kuma gudu na gaba
yana sake aika layuka iri ɗaya. Matsayi na dindindin suna ci gaba da gaza har sai an gyara mai tarawa ko saitin.
Yi amfani da rajistocin mai tarawa kansa don cikakkun bayanan amsa. Taƙaitattun kurakuran rajistar kira suna riƙe da
tsarin ɓoye bayanansu dabam.
`prepare()` ba ya tanadar da komai; Gwaji yana aika `{"resourceSpans":[]}` daidai kuma yana ba da rahoton
matsayin HTTP ba tare da rubuta span na rajistar kira ba.

ID na trace da ID na span su ne lambobin hex 32/16 na farko na SHA-256 a kan
`"omniroute.trace\\0" + callLogId` da `"omniroute.span\\0" + callLogId`. Sake aikawa yana ɗauke da
ID iri ɗaya. Wannan ba garantin kawar da maimaituwa ba ne: wasu tsarin bayan fage, ciki har da karɓar bayanai na Langfuse
v4, ba sa kawar da span masu ID iri ɗaya. Rushewa ko gazawar wani ɓangaren gutsattsari na iya
sake aika rukunin cursor guda ɗaya da ba a tabbatar da karɓarsa ba a mafi yawa; ana iya maimaita wannan rukunin gaba ɗaya,
ba kawai gutsattsarinsa na HTTP na ƙarshe ba. Zaɓi girman rukunin cursor tare da la’akari da wannan musaya.

### Misalin Langfuse

Saita waɗannan filaye don tsarin Langfuse da kake ɗaukar nauyinsa da kanka:

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

Gina ƙimar Authorization a na’urarka a matsayin Base64 na zaren `public-key:secret-key`
kai tsaye (misali da `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Kada ka liƙa ainihin bayanan shaida cikin rajistoci, hotunan allo ko rahotannin matsala. Daidaitawar tana
saita `x-langfuse-ingestion-version: 4` ta atomatik; har yanzu ana bayar da Authorization a `headers`.
Duka header da gishirin ainihi da aka samar suna amfani da tsarin filin sirri mai ɓoyayyen bayanai
da alamomin maye-gurbi na API da ake da su; ana buƙatar `STORAGE_ENCRYPTION_KEY`.

Taswirantawa yana ƙara nau'i/samfurin samarwa, bayanan amfani na JSON (shigarwa/fitarwa/jimilla da maɓallan
cache da ake da su), hotunan halin shigarwa/fitarwa na JSON, matakin ERROR/DEFAULT, saƙon matsayi da aka tsabtace,
sunan trace, id na zama, environment na zaɓi da kuma
`langfuse.observation.metadata.<key>` da za a iya tacewa don mai samarwa, samfurin da aka nema, hanya, combo, tushen
cache da matsayi. `langfuse.observation.completion_start_time` yana cikin ISO 8601 a
lokacin farawa + TTFT ne kawai idan an san TTFT kuma yana cikin tsawon lokacin. Ba a aika siffofin kuɗi.

Hanyoyin tantance ainihi suna aiki a kan `langfuse.user.id`:

- `pseudonymous` (na asali): HMAC-SHA256 na id na cikin gida na maɓallin API tare da salt na bazuwar
  byte 32 ga kowace makoma. Ana samar da salt lokacin ƙirƙira idan babu shi, a ɓoye shi
  a matsayin `identitySalt`, ba a taɓa mayar da shi ba, kuma ana riƙe shi yayin gyare-gyare. Ba a taɓa
  saka id na maɓalli kai tsaye cikin siffofin span ba. Sake ƙirƙira/sauya salt na makoma yana sauya ainihi.
- `keyName`: sunan maɓallin API da aka saita, wanda da gangan yake bayyana wannan lakabin mai gudanarwa.
- `none`: babu id na mai amfani. Har yanzu ana fitar da alamomin zama idan suna nan; waɗannan hanyoyin ba sa
  ɓoye ainihi a cikin duk wani abun cikin prompt ko lakabin zama/alaƙantawa da mai gudanarwa ya bayar.

### Farawa ba tare da cike bayanan baya ba

A lokacin ƙirƙira kawai, kunna **Fara daga matsayin yanzu (tsallake rajistocin da ke akwai)** ko aika
`startFromCurrentPosition: true` a matakin sama na payload na API na ƙirƙira. Yana saita
`cursor_row_id` zuwa mafi girman rowid na rajistar kira da aka adana a yanzu ta amfani da mataimakan cursor
da ke akwai, ba tare da migration ba. Na asali shi ne false (cursor 0 da cike tarihin da aka adana).
Wannan ba saitin sake saita cursor ba ne a lokacin sabuntawa.

Ƙarin `ttftMs` na bai ɗaya kuma yana ƙara ginshiƙin `ttft_ms` mai iya karɓar null zuwa mapper na BigQuery
da schema na sabon tebur: gwajin schema ɗinsa yana buƙatar kowane filin daidaitaccen rikodi ya kasance yana da
ginshiƙi. Teburan da ke akwai suna ci gaba da fitarwa ba tare da canji ba: `prepare()` yana karanta schema na tebur kuma
yana tsallake `ttft_ms` kawai idan wannan ginshiƙin ba ya nan. Ƙara ginshiƙin INT64 mai iya karɓar null don samun TTFT
a gudu na gaba, ko amfani da sabon tebur. Ba a buƙatar PATCH, sauya schema ta atomatik ko ƙarin
izini; duk sauran filayen layi suna ci gaba da bin tsauraran binciken schema.

---

## 6. Ƙara wurin aika bayanai

1. Ƙirƙiri `src/lib/logExport/destinations/<name>.ts` wanda yake fitar da `LogExportDestinationType`:
   `configSchema` na Zod, jerin masu bayyana `fields` don UI, `secretFields`, da
   `createClient(config)` wanda yake dawo da `test()` / `prepare()` / `send(records)`.
2. Ƙara shi cikin jerin `DESTINATIONS` a `src/lib/logExport/registry.ts`.
3. Rubuta gwaje-gwaje a ƙarƙashin `tests/unit/`.

Wannan shi ne dukkan canjin: adana bayanai, aikin cron, ɓangaren REST, ɓoye bayanan sirri da
fom ɗin dashboard duk suna karanta rajistar.

Ƙa'idoji biyu don sabon wurin aika bayanai:

- `send()` **dole ne ya jefa kuskure** idan wani ɓangare ya gaza. Kammalawa ba tare da kuskure ba yana nufin "wurin aika bayanai yana da waɗannan layuka",
  kuma alamar matsayi tana wuce su har abada.
- Wurin aika bayanai da yake karɓar URL daga mai amfani dole ne ya tabbatar da ingancinsa ta hanyar
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) kafin ɗauko bayanai,
  kamar yadda webhooks suke yi. BigQuery ba ya buƙatar wannan: sunayen sabobinsa tsayayyun ƙimomi ne.

---

## 7. Amfani da shi

- **Dashboard**: Haɗe-haɗe → Fitar da rajistan ayyuka. Ƙara wurin aika bayanai, gudanar da **Gwaji** don duba bayanan shiga
  ba tare da rubuta layuka ba, sannan kunna shi.
- **Bayanan da ke jiran aikawa**: kowane katin wurin aika bayanai yana nuna layukan da ke jiran aikawa da alamar matsayi; `GET
/api/log-export/status` yana dawo da waɗannan adadin tare da gudu 20 na ƙarshe na aikin.
- **Gazawar wurin aika bayanai ɗaya ba ta sa sauran su gaza** — taƙaitaccen bayanin gudu yana rubuta matsayin kowane wurin aika bayanai
  a cikin `last_status` / `last_error`, kuma tarihin gudun aikin yana adana jimillar sakamakon.
- **Share wurin aika bayanai yana share alamar matsayinsa.** Sake ƙara shi yana farawa daga mafi tsufan
  rajistan kira da aka riƙe, wanda yake sake aika layukan da watakila wurin aika bayanai ya riga ya mallaka. A BigQuery, `insertId` na kowane layi
  yana hana wannan maimaitawar ne kawai a cikin lokacin kawar da maimaitattun bayanai na BigQuery kansa, don haka ya fi kyau a kashe
  wurin aika bayanai maimakon a share shi.
