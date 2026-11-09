# Log export (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Fitar da rajistan kiran OmniRoute zuwa ma'ajiyar nazari ta waje secara ci gaba kuma a matakai.

Shafin dashboard na Logs yana adana tarihin buƙatu a SQLite (`call_logs`), wanda ake iyakancewa ta hanyar
juyawa da tsare bayanai. Fitar da rajista tana aika wannan tarin bayanan a kan jadawali domin ya daɗe fiye da
ma'ajiyar bayanai ta gida kuma a iya haɗa shi da wasu bayanai. BigQuery ita ce manufa ta farko;
bututun sarrafawar rajista ne, don haka za a iya ƙara ƙarin wuraren manufa.

---

## 1. Yadda yake aiki

```
uwar garke (warware ɓoye-ɓoye + inganta saituna, daidaita siginan matsayi)
  → fara IPC → keɓantaccen tsarin OS na exportChild
    → storage.sqlite na karantawa kawai → tambaya/daidaitawar rajistan kira da aka raba
      → cika artifak ba tare da jiran juna ba → prepare()/send() na manufa
        → IPC na rukuni → uwar garke ta adana siginan matsayi → IPC na ack
          → rukuni na gaba; IPC na done → uwar garke ta rubuta nasara
```

- **Jadawali** — aikin cron guda ɗaya na `JobRegistry`, `log_export`, wanda tsohon saitinsa shi ne `0 * * * *` (kowane awa,
  UTC). Ana rajista da shi a `src/lib/initCloudSync.ts`; ana iya sauya shi da `OMNIROUTE_LOG_EXPORT_CRON`.
  A kowane bugun lokaci, yana sarrafa kowace manufa da aka **kunna**, ɗaya bayan ɗaya.
- **Siginan matsayi** — `call_logs.rowid` na ɓoye na SQLite, wanda ake adanawa ga kowace manufa a
  `log_export_destinations.cursor_row_id`. Da gangan ba a amfani da `timestamp` a matsayin siginan matsayi: masu kira
  na iya bayar da ƙimarsu, don haka ana iya rubuta buƙata mai jinkiri bayan wata mai sauri wadda aka fara
  daga baya, kuma siginan matsayi na lokaci zai tsallake ta.
- **Rarrabawa zuwa rukuni** — layuka `batch_size` a kowace buƙata (tsohon saiti 500), layuka `max_rows_per_run` a kowace gudu
  (tsohon saiti 10000) domin a fitar da babban tari a bugun lokaci da dama maimakon ya toshe guda ɗaya.
- **Isarwa** — siginan matsayi yana gaba ne kawai bayan `send()` ya kammala. Rukunin da ya gaza yana barin
  siginan matsayi a inda yake, don haka za a sake gwada layukan iri ɗaya a gudu na gaba. Garantin shi ne
  aƙalla-sau-ɗaya tare da cire maimaituwa a ɓangaren manufa, ba ainihin sau-ɗaya-takal ba: BigQuery yana bai wa kowane
  layi maɓalli ta amfani da id na rajistan kira, wanda yake mutuntawa gwargwadon ƙoƙari a cikin tagar cire maimaituwarsa.
- **Kariyar ruɓanya gudu** — bugun cron da `POST .../run` na iya faruwa tare. Ana tsallake manufa
  da ake riga ake sarrafawa maimakon a sarrafa ta sau biyu (`skipped: true` a sakamakon gudun),
  don haka gudu mai faruwa lokaci guda ba zai iya sake aika rukuni ko mayar da siginan matsayi baya ba.
- **Farfadowa bayan gogewa** — idan `cursor_row_id` ya ƙare sama da `MAX(rowid)` (an
  goge dukkan teburin kuma rowid suka sake farawa), mai gudanarwar zai mayar da shi zuwa 0 maimakon ya makance har abada.

### Keɓantaccen mai gudanarwa da iyakoki

Kowane gudun manufa a Node yana fara wani keɓantaccen tsarin OS na ɗan lokaci (`child_process`
tare da IPC, ba `worker_threads` ba). Karanta jikin bayanai, fassara/jeranta payload na JSON, `prepare()`
na manufa da I/O na hanyar sadarwar manufa duk suna gudana a can, ba a event loop na uwar garke ba.
Saituna da ƙananan saƙonnin ci gaba ne kawai suke ratsa IPC; bayanan da aka fitar ba sa komawa
uwar garke. Aikin cron da hanyar Run now suna riƙe sakamakon jama'a da kariyar ruɓanya gudu iri ɗaya.

Tsarin ɗan yana buɗe `DATA_DIR/storage.sqlite` da uwar garke ta warware don karantawa kawai ta amfani da `node:sqlite`,
tare da `busy_timeout=5000` da `query_only=ON`. Ba ya shigo da singleton na DB kuma ba ya aiwatar da
migrations, madadin bayanai ko sabuntawar SQLite. Ayyukan rubuta bayanai game da artifak da ya ɓace/lalace (har da
UPDATE na artifak da ya lalace) suna kasancewa ne kawai a hanyar cikakken bayani ta dashboard. Duk hanyoyin biyu suna amfani da mai warware
cikakken bayani marar illa; fitarwa tana amfani da karatun tsarin fayil ba tare da jiran juna ba da kuma tsarin warwarewa iri ɗaya na artifak → tsohon
inline → tsohon disk → babu. Gudu yana ɗaukar hoton mafi girman rowid na shigarwa
lokacin da tsarin ɗan ya buɗe mai karantawarsa; sabbin shigarwa daga baya suna jira har gudu na gaba. Wannan iyakar
shigarwa ce, ba transaction na SQLite mai ɗaukar dogon lokaci ba: masu rubutun WAL da checkpoints suna ci gaba da aiki yayin
jiran hanyar sadarwa. Wannan iyaka ba ta daskarar da sabuntawa/gogewar layukan da ke akwai ba.

Bayan kowane rukuni da aka karɓa, tsarin ɗan yana jiran tabbatarwa. Da farko uwar garke tana adana
siginan matsayi da `advanceLogExportCursor`, sannan ta aika `ack`; ba a fara rukuni na gaba kafin hakan.
Gazawar aikawa, faɗuwar tsari ko ƙarewar lokaci tana rubuta gazawa ba tare da ciyar da wannan rukunin gaba ba. Rukunan da aka
riga aka tabbatar suna ci gaba da kasancewa ajiye; aƙalla rukunin da ba a tabbatar da shi ba guda ɗaya ne kaɗai za a iya sake aikawa.
Ana rubuta nasara ne kawai bayan `done` da fitar tsarin ɗan cikin tsabta. Gazawa tana dakatar da tsarin ɗan
da SIGTERM, sannan a ɗaukaka zuwa SIGKILL bayan 500 ms, kuma mai gudanarwar yana jiran tsarin ya rufe.

| Sauyin muhalli                                | Tsohon saiti | Manufa                                      |
| --------------------------------------------- | ------------ | ------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000       | Iyakar lokacin gudu ga kowace manufa        |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024         | Iyakar tsohon sararin V8 na tsarin ɗan a MB |

Ƙimomi marasa inganci/marasa kyau/marasa zama cikakkiyar lamba suna amfani da tsoffin saituna. Saitin heap ba cikakkiyar
iyakar RSS ba ce; manyan rukuni sosai za su iya ƙare ƙwaƙwalwar tsarin ɗan kuma gudun ya gaza cikin aminci.
Tsohon saitin 1024 MB yana barin isasshen sarari ga tsohon rukunin layuka 500 na artifak masu girman 512 KiB tare da
kunna jikin bayanai, ciki har da jeranta JSON zuwa gutsattsarin bytes na BigQuery. Ba ya sanya
rukunin jikin bayanai na layuka 10000 ya zama amintacce. Ƙarewar heap na V8 tana rubuta gazawar da za a iya ɗaukar mataki a kai: rage girman
rukuni ko ƙara `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; siginan matsayi yana kasancewa a rukuni na ƙarshe
da aka tabbatar. Tsoffin jikin bayanai na inline/disk ba sa ƙarƙashin iyakar artifak ta zamani.
Dole ne masu gudanarwa su ware RSS dabam, musamman a cikin containers masu iyakacin ƙwaƙwalwa.

Tsarin ɗan yana gado ne kawai daga `DATA_DIR` da aka warware, `NODE_ENV`, takamaiman `TZ` (warware lokacin gida
na sunan tsohon fayil), `ELECTRON_RUN_AS_NODE` idan yana nan, da kuma waɗannan bayanan haɗin fita:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (da nau'ikansu na ƙananan haruffa),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Mai rarraba Undici na duniya yana amfani da warware proxy ta muhalli marar illa da dokokin
kauce wa local-host na uwar garke, ciki har da `NO_PROXY`; ba ya shigo da `proxyFetch.ts` ko alamomin DB/feature nasa.
Ana ɓoye bayanan shaidar proxy daga abin da aka tura da kurakuran da aka rubuta. Bayanan shaidar manufa
suna tafiya ne kawai a cikin saƙon IPC guda ɗaya na farawa, ba ta argv ko muhalli ba; ana saka prefix tare da
tsabtace abin da aka tura/kurakurai. `ExperimentalWarning` kaɗai ake kashewa a hujjojin exec na tsarin ɗan domin kauce wa
maimaita gargaɗin SQLite na Node a kowane gudun cron; sauran nau'ikan gargaɗi suna ci gaba da bayyana.

Dole ne a iya shigo da modulan manufa ba tare da dogaro da Next.js/server-only ba. Aiwatarwar
BigQuery da ake da ita ta riga ta cika wannan ƙa'ida. Ma'ajiyar wucin-gadi ta access-token tana
wanzuwa ne kawai tsawon lokacin gudanarwar child, ba tsakanin gudanarwa daban-daban ba. Node ne
runtime da ake tallafawa (`package.json` engines), amma sashen girka Bun na README da
`Dockerfile.bun` su ma suna nuna hanyar dacewa da production ta amfani da `bun:sqlite`
(`src/lib/db/core.ts` / adapters). Saboda haka, a ƙarƙashin Bun, exports suna ci gaba da amfani
da hanyar in-process ta baya kuma suna fitar da gargaɗi sau ɗaya: ba a samun keɓewar heap/timeout
ta child. Yi amfani da Node don keɓewar event-loop da OOM; ba a ɗauki Bun a matsayin na
development kaɗai a nan ba.

Lokacin da aka kunna `includeBodies`, fi son jadawalin kowane mintuna kaɗan kamar
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` maimakon tara dogon jerin payload na awa guda.
Iyakokin batch da row har yanzu suna kayyade kowace gudana. Ana biyan kuɗin fara process ga
kowace manufa a kowace gudana; wannan yana musanya ƙaramin kuɗin farawa da keɓewar event-loop
na server, ba rage jimillar amfani da CPU ba.

### Payloads (prompts da completions)

Ta tsohuwa, export yana ɗauke da filayen taƙaitawa kawai waɗanda **jerin** Logs ke nunawa. Kunna
**Fitar da prompts da responses** (`includeBodies`) yana kuma aika abin da ɓangaren **cikakkun
bayanai** na Logs ke nunawa ga kowace kira:

| Field                            | Abin da yake ɗauke da shi                                    |
| -------------------------------- | ------------------------------------------------------------ |
| `request_body` / `response_body` | Payloads na kiran yadda dashboard yake nuna su               |
| `pipeline_route_decision`        | Manufa da model da router ya zaɓa                            |
| `pipeline_client_request`        | Raw request daidai yadda client ya aika shi                  |
| `pipeline_openai_request`        | Bayan fassara shi zuwa tsarin OpenAI na ciki                 |
| `pipeline_provider_request`      | Yadda aka aika shi upstream a zahiri, cikin provider dialect |
| `pipeline_provider_response`     | Raw response daga upstream                                   |
| `pipeline_client_response`       | Abin da aka mayar wa mai kiran                               |
| `pipeline_error`                 | Cikakken bayanin kuskuren pipeline na kira da ya gaza        |
| `bodies_truncated`               | True idan wani field da ke sama ya kai `maxBodyBytes`        |

Wannan abun cikin prompt ne, don haka yana **kashe ta tsohuwa** kuma da gangan zaɓi ne na kowace
manufa. Abin da ake aikawa shi ne abin da dashboard ke nunawa, saboda export da
`getCallLogById` suna amfani da hanyar warware cikakkun bayanai iri ɗaya: an riga an
tsabtace payloads daga PII kuma an ɓoye secrets lokacin da ake rubuta su, sannan kiran da aka yi
da API key mai `noLog` ba ya adana wani payload kwata-kwata, don haka babu abin da za a fitar.

Ana karanta payloads ga kowace row daga artifact na filesystem, don haka hydration yana gudana
ne kawai ga wuraren manufa da suka buƙace shi. Idan artifact ya ɓace ko ya lalace, ana fitar da
taƙaitawarsa tare da payloads masu null maimakon batch ya gaza kuma cursor ya makale.

`maxBodyBytes` (tsoho 262144) yana iyakance kowane field. Ana **datse payloads masu tsawo maimakon
a watsar da su** — prompt da aka datse har yanzu yana amsa "me aka tambaya" — kuma ana yi wa row
alama da `bodies_truncated`. Ba a fitar da deltas da aka stream chunk-by-chunk; response da aka
haɗa ya riga ya kasance a cikin `pipeline_provider_response` da `pipeline_client_response`.

---

## 2. Fayiloli

| Sashi                             | Wuri                                         |
| --------------------------------- | -------------------------------------------- |
| Kwangilar manufa                  | `src/lib/logExport/types.ts`                 |
| Rijista                           | `src/lib/logExport/registry.ts`              |
| Sarrafa sirri                     | `src/lib/logExport/secrets.ts`               |
| Mai gudanarwa (IPC na uwar tsari) | `src/lib/logExport/runner.ts`                |
| Zagayowar rayuwar tsari           | `src/lib/logExport/childRunner.ts`           |
| Mashigar ƙaramin tsari            | `src/lib/logExport/exportChild.ts`           |
| Mai buɗewa na karantawa kawai     | `src/lib/db/logExportReadOnly.ts`            |
| Tambaya/daidaitawa da aka raba    | `src/lib/usage/callLogExportQueries.ts`      |
| Mai warware cikakkun bayanai      | `src/lib/usage/callLogDetailResolver.ts`     |
| Bayyanar API                      | `src/lib/logExport/presenter.ts`             |
| Manufar BigQuery                  | `src/lib/logExport/destinations/bigquery.ts` |
| Tabbatar da Google SA             | `src/lib/logExport/googleServiceAccount.ts`  |
| Tushen rajistar kira              | `src/lib/usage/callLogExportSource.ts`       |
| Adana bayanai                     | `src/lib/db/logExportDestinations.ts`        |
| Aikin Cron                        | `src/lib/jobs/logExportJob.ts`               |
| Matakin REST                      | `src/app/api/log-export/`                    |
| Shafin dashboard                  | `src/app/(dashboard)/dashboard/log-export/`  |

Tsarin bayanai: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Duk hanyoyin suna buƙatar tantancewar gudanarwa (`requireManagementAuth`). Ba a taɓa dawo da bayanan sirri:
ana dawo da sirrin da aka adana a matsayin ainihin `__stored__`, kuma aika wannan ƙimar a lokacin sabuntawa
yana riƙe bayanan tantancewar da aka adana.

Ƙirƙira ko sabunta manufa wadda nau'inta ya ayyana sirri **yana buƙatar
`STORAGE_ENCRYPTION_KEY`**. Idan babu shi, `encrypt()` yana wuce bayanin ba tare da wani canji ba, saboda haka
ana ƙin rubutawar da 400 maimakon saka bayanan tantancewa cikin SQLite a matsayin rubutu marar ɓoyewa (irin kariyar da
webhook na Telegram yake amfani da ita).

| Hanya    | Tafarki                                  | Manufa                                                             |
| -------- | ---------------------------------------- | ------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Nau'ikan manufa + jerin filayen daidaitawarsu                      |
| `GET`    | `/api/log-export/destinations`           | Jera manufofi (an ɓoye bayanan sirri)                              |
| `POST`   | `/api/log-export/destinations`           | Ƙirƙiri manufa                                                     |
| `GET`    | `/api/log-export/destinations/{id}`      | Karanta guda ɗaya                                                  |
| `PUT`    | `/api/log-export/destinations/{id}`      | Sabunta suna / kunnawa / daidaitawa / haɗa-rukuni                  |
| `DELETE` | `/api/log-export/destinations/{id}`      | Share                                                              |
| `POST`   | `/api/log-export/destinations/{id}/test` | Gwada bayanan tantancewa, kada a rubuta komai                      |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Kwashe yanzu, ta hanya ɗaya da gudanarwar da aka tsara             |
| `GET`    | `/api/log-export/status`                 | Halin Cron, gudanarwa na baya-bayan nan, tarin aikin kowane manufa |

`GET /api/log-export/types` ne yake sa UI ya zama na gama-gari: ana gina fom ɗin dashboard daga
bayanan filaye da aka dawo da su, don haka sabuwar manufa ba ta buƙatar wani canji ga UI.

---

## 4. Manufar BigQuery

Maɓallan daidaitawa (`type: "bigquery"`):

| Maɓalli              | Bayani                                                                          |
| -------------------- | ------------------------------------------------------------------------------- |
| `projectId`          | Aikin GCP da ke ɗauke da dataset                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                                                 |
| `location`           | Ana amfani da shi ne kawai idan dole ne a ƙirƙiri dataset (tsoho `EU`)          |
| `serviceAccountJson` | Maɓallin service-account. Sirri: an ɓoye shi yayin ajiya, ba a taɓa dawo da shi |
| `autoCreate`         | Ƙirƙiri dataset da table a fitarwa ta farko (tsoho `true`)                      |

Service account yana buƙatar `bigquery.tables.updateData` a kan table ɗin da aka nufa, tare da
`bigquery.datasets.create` / `bigquery.tables.create` lokacin da aka kunna `autoCreate`.

Rukunin da aka daidaita naúrar **cursor** ce, ba ta HTTP ba: `send()` yana raba shi zuwa kiraye-kirayen insertAll
masu layuka aƙalla 500, don haka babban `batch_size` ba zai iya karya iyakar buƙata ta 10 MB ta BigQuery ba.
Ana sake gwada halayen wucin gadi (408/429/500/502/503/504) har sau uku tare da ƙara lokacin jira a hankali,
ana sake amfani da insertIds iri ɗaya; gazawar tantancewa da tsarin bayanai suna jefa kuskure tun a gwajin farko
maimakon ɓata gudanarwar.

Table da aka ƙirƙira ƴan daƙiƙu da suka wuce bai riga ya bayyana ga streaming endpoint ba, wanda ke amsawa da
404 na ƴan daƙiƙu. Ana sake gwada wannan 404, amma **kawai idan wannan gudanarwar ce ta ƙirƙiri table ɗin** —
table da babu shi da gaske zai gaza nan take. Ka lura cewa sake ƙirƙirar table da sunan wanda
aka goge kwanan nan yana sa BigQuery ya ƙi streaming inserts na tsawon mintuna da dama; wannan
siffa ce ta gogewa-sannan-sake-ƙirƙirawa, don haka ya fi kyau a yi amfani da sabon sunan table maimakon gogewa da sake ƙara shi.

**Gazawar wani ɓangare tana zuwa a matsayin HTTP 200 tare da `insertErrors[]` wanda ba fanko ba.** Ana ɗaukar wannan a matsayin
gazawa kuma yana jefa kuskure, wanda ke hana cursor ci gaba ya wuce layukan da BigQuery bai taɓa
karɓa ba; `tests/unit/log-export-bigquery.test.ts` yana tabbatar da wannan halayya.

Hanyar jigilar bayanai REST ce kai tsaye — ana musanya ikirarin RS256 da aka sanya wa hannu da kansa da access token a
`https://oauth2.googleapis.com/token`, sannan layuka su tafi zuwa `tabledata.insertAll`. Ba a haɗa wani Google SDK ba.
Ana adana access tokens na ɗan lokaci a cikin tsarin aiki ga kowane (service account, scope).

Table da aka ƙirƙira yana ɗauke da ginshiƙi ɗaya ga kowane filin shafin Logs tare da `exported_at`, kuma an tsara shi
bisa yadda ake binciken rajistan kira a zahiri:

- **An raba shi bisa rana a kan `timestamp`**, don haka binciken da aka iyakance da kwanan wata yana binciken waɗannan ranakun kawai.
- **An haɗa shi rukuni bisa `api_key_name`, `provider`, `model`, `status`** (a wannan jeri), don haka tacewa bisa
  wanda ya gudanar da shi, inda ya tafi, ko ko ya gaza tana cire tubalan da ba su dace ba a cikin kowane partition. BigQuery
  yana ba da damar ginshiƙan clustering guda huɗu aƙalla kuma tsarin jeri yana da muhimmanci: tacewa bisa `api_key_name` kaɗai
  tana cirewa, amma tacewa bisa `status` kaɗai ba ta yi.
- **Riƙewar partition na zaɓi** ta hanyar `partitionExpirationDays` (0 yana riƙe komai), ana amfani da ita
  lokacin da aka ƙirƙiri table.

Dukkan saitunan biyu suna aiki ne a lokacin ƙirƙirawa. Teburin da yake akwai yana riƙe da tsarin da yake da shi, don haka
ka nuna wurin da za a aika zuwa sabon id na tebur idan kana son amfani da su.

`tests/unit/log-export-bigquery.test.ts` yana tabbatar da cewa mai daidaitawa da tsarin tebur suna ci gaba da
daidaituwa sosai, don haka ba za a iya watsar da sabon ginshiƙin rajistar kira a ɓoye yayin fitarwa ba.

Ana rarraba rukuni-rukuni bisa ga **duka** adadin layuka da kuma bytes da aka serialise. Adadin layuka kaɗai bai isa ba
da zarar an fitar da payloads: layuka 500 masu ɗauke da prompts na iya kaiwa gomman megabytes, kuma insertAll
yana ƙin buƙatar da ta wuce 10 MB. Ana rufe kowane rukuni idan ya kai layuka 500 ko 9 MB, duk wanda ya fara kaiwa.

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
`"omniroute.trace\0" + callLogId` da `"omniroute.span\0" + callLogId`. Sake aikawa yana ɗauke da
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

## 6. Ƙara wurin aikawa

1. Ƙirƙiri `src/lib/logExport/destinations/<name>.ts` wanda yake fitar da `LogExportDestinationType`:
   wani `configSchema` na Zod, jerin bayanan `fields` don UI, `secretFields`, da kuma
   `createClient(config)` wanda yake dawo da `test()` / `prepare()` / `send(records)`.
2. Ƙara shi cikin jerin `DESTINATIONS` da ke `src/lib/logExport/registry.ts`.
3. Rubuta gwaje-gwaje a ƙarƙashin `tests/unit/`.

Wannan shi ne duk canjin: ma'ajiyar bayanai, aikin cron, matakin REST, ɓoye sirrika, da fom ɗin
dashboard duk suna karanta rajistar.

Ka'idoji biyu don sabon wurin aikawa:

- `send()` **dole ne ya jefa kuskure** idan an samu gazawar wani ɓangare. Idan ya kammala cikin nasara, hakan yana nufin "wurin aikawa yana da waɗannan layukan",
  kuma siginar matsayi za ta wuce su har abada.
- Wurin aikawa da yake karɓar URL da mai amfani ya bayar dole ne ya tabbatar da ingancinsa ta
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) kafin ɗauko bayanai,
  kamar yadda webhooks suke yi. BigQuery ba ya buƙatar wannan: rundunoninsa tabbatattu ne.

---

## 7. Gudanar da shi

- **Dashboard**: Integrations → Log export. Ƙara wurin aikawa, gudanar da **Test** don bincika bayanan tantancewa
  ba tare da rubuta layuka ba, sannan kunna shi.
- **Jerin jiran aiki**: kowane katin wurin aikawa yana nuna layukan da ke jira da siginar matsayi; `GET
/api/log-export/status` yana dawo da waɗannan alkaluman tare da bayanan gudanuwar ayyuka 20 na ƙarshe.
- **Gazawar wani wurin aikawa ba ta sa sauran su gaza ba** — taƙaitaccen sakamakon gudanuwar yana adana matsayin kowane wurin aikawa
  a `last_status` / `last_error`, yayin da tarihin gudanuwar aikin yake adana sakamakon gaba ɗaya.
- **Share wurin aikawa yana share siginar matsayinsa.** Sake ƙara shi yana farawa daga mafi tsohon
  rajistan kira da aka riƙe, wanda zai sake aika layukan da mai yiwuwa wurin aikawar ya riga ya adana. A BigQuery, `insertId`
  na kowane layi yana hana maimaituwar ne kawai a cikin tazarar lokacin cire maimaituwa ta BigQuery, don haka ya fi kyau a kashe
  wurin aikawa maimakon share shi.
