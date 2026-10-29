# Log export (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Tuloy-tuloy at paunti-unting pag-export ng mga call log ng OmniRoute sa isang panlabas na imbakan para sa analytics.

Pinapanatili ng tab na Logs sa dashboard ang kasaysayan ng mga request sa SQLite (`call_logs`), na nililimitahan ng
rotation at retention. Ipinapadala ng pag-export ng log ang parehong hanay ng mga record ayon sa iskedyul upang manatili ang mga ito
kahit wala na sa lokal na database at maiugnay sa iba pang data. BigQuery ang unang destinasyon; ang
pipeline ay isang registry, kaya maaaring magdagdag pa ng mga destinasyon.

---

## 1. Paano ito gumagana

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Iskedyul** — isang cron job ng `JobRegistry`, ang `log_export`, na may default na `0 * * * *` (bawat oras,
  UTC). Nakarehistro sa `src/lib/initCloudSync.ts`; maaaring palitan gamit ang `OMNIROUTE_LOG_EXPORT_CRON`.
  Sa bawat takbo, pinoproseso nito ang lahat ng nakabinbing record ng bawat **naka-enable** na destinasyon, nang sunud-sunod.
- **Cursor** — ang implicit na `call_logs.rowid` ng SQLite, na sine-save para sa bawat destinasyon sa
  `log_export_destinations.cursor_row_id`. Sadyang hindi ginagamit ang `timestamp` bilang cursor: maaaring
  magbigay ang mga caller ng sarili nilang value, kaya maaaring maisulat ang isang mabagal na request pagkatapos ng mas mabilis na request na nagsimula
  nang mas huli, at malalaktawan ito ng cursor na nakabatay sa timestamp.
- **Pagba-batch** — `batch_size` na mga row bawat request (default na 500), `max_rows_per_run` na mga row bawat takbo
  (default na 10000) upang maubos ang malaking backlog sa ilang takbo sa halip na humarang sa iisang takbo.
- **Paghahatid** — uusad lamang ang cursor pagkatapos matagumpay na matapos ang `send()`. Kapag nabigo ang isang batch, mananatili
  ang cursor sa dating posisyon nito, kaya muling susubukan ang parehong mga row sa susunod na takbo. Ang garantiya ay
  hindi bababa sa isang paghahatid kasama ng pag-aalis ng duplikado sa destinasyon, hindi tunay na eksaktong isang paghahatid: ginagamit ng BigQuery ang call-log id bilang key ng bawat
  row, na kinikilala nito sa abot ng makakaya sa loob ng sarili nitong panahon para sa pag-aalis ng duplikado.
- **Proteksyon laban sa pagsasabay** — maaaring sabay na ma-trigger ang cron tick at `POST .../run`. Ang isang destinasyong
  kasalukuyang pinoproseso ay nilalaktawan sa halip na iproseso nang dalawang beses (`skipped: true` sa resulta ng takbo),
  kaya hindi maaaring muling magpadala ng batch o magsulat ng paatras na cursor ang isang kasabay na takbo.
- **Pagbawi pagkatapos ng purge** — kung lumampas ang `cursor_row_id` sa `MAX(rowid)` (na-purge ang buong table at
  nagsimulang muli ang mga rowid), ibinabalik ng runner ang cursor sa 0 sa halip na permanenteng hindi na makakita ng mga record.

### Nakahiwalay na runner at mga limitasyon

Ang bawat takbo ng destinasyon sa Node ay nagsisimula ng hiwalay at panandaliang OS child process (`child_process`
na may IPC, hindi `worker_threads`). Ang pagbabasa ng body, pag-parse/serialization ng payload JSON, ang
`prepare()` ng destinasyon, at ang network I/O ng destinasyon ay pawang tumatakbo roon, hindi sa event loop ng server.
Configuration at maliliit na mensahe ng progreso lamang ang dumadaan sa IPC; hindi kailanman bumabalik sa
server ang mga na-export na record. Pinananatili ng cron job at ng route na Run now ang parehong pampublikong resulta at proteksyon laban sa pagsasabay.

Binubuksan ng child ang na-resolve na `DATA_DIR/storage.sqlite` ng server bilang read-only gamit ang `node:sqlite`,
na may `busy_timeout=5000` at `query_only=ON`. Hindi ito nag-i-import ng DB singleton at hindi nagsasagawa ng
mga migration, backup o update sa SQLite. Ang pagtatala ng mga nawawala/sirang artifact (kasama ang
UPDATE para sa sirang artifact) ay nananatili lamang sa daloy ng detalye ng dashboard. Parehong gumagamit ang dalawang daloy ng isang purong
detail resolver; gumagamit ang pag-export ng asynchronous na pagbabasa ng filesystem at ng parehong pagkakasunod-sunod ng pag-resolve: artifact → legacy
inline → legacy disk → wala. Kinukuha ng isang takbo ang pinakamataas na insertion rowid
kapag binuksan ng child ang reader nito; maghihintay sa susunod na takbo ang mga susunod na insertion. Hangganan ito ng insertion,
hindi isang pangmatagalang transaksyon sa SQLite: malayang makakapagpatuloy ang mga WAL writer at checkpoint habang
naghihintay sa network. Hindi pinipigilan ng hangganang ito ang mga update/pagtanggal ng mga kasalukuyang row.

Pagkatapos ng bawat tinanggap na batch, naghihintay ang child ng pagkilala. Sine-save muna ng server
ang cursor gamit ang `advanceLogExportCursor`, saka ipinapadala ang `ack`; walang susunod na batch na magsisimula bago iyon.
Ang pagkabigo sa pagpapadala, pag-crash o timeout ay nagtatala ng pagkabigo nang hindi isinusulong ang cursor para sa batch na iyon. Nananatiling
naka-commit ang mga batch na dati nang kinilala; ang iisang batch lamang na hindi pa kinikilala ang maaaring muling ipadala.
Itinatala lamang ang tagumpay pagkatapos ng `done` at ng maayos na pag-exit ng child. Tinatapos ng mga pagkabigo ang child
gamit ang SIGTERM, na itinataas sa SIGKILL pagkalipas ng 500 ms, at naghihintay ang runner na magsara ang proseso.

| Environment variable                          | Default | Layunin                                         |
| --------------------------------------------- | ------- | ----------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | Limitasyon sa aktuwal na oras bawat destinasyon |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | Limitasyon ng V8 old-space ng child sa MB       |

Ginagamit ang mga default para sa mga value na di-wasto/hindi positibo/hindi integer. Ang setting ng heap ay hindi kabuuang
limitasyon ng RSS; maaari pa ring maubos ng napakalalaking batch ang memory ng child at ligtas na mapabigo ang takbo.
Ang default na 1024 MB ay naglalaan ng ekstrang kapasidad para sa default na batch na 500 row ng mga artifact na 512 KiB na
naka-enable ang mga body, kasama ang JSON serialization ng BigQuery na hinahati sa mga chunk ayon sa byte. Hindi nito ginagawang ligtas ang isang
batch na 10000 row na may mga body. Ang pagkaubos ng V8 heap ay nagtatala ng pagkabigong may malinaw na hakbang para malutas ito: bawasan ang laki
ng batch o taasan ang `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; nananatili ang cursor sa huling
batch na kinilala. Hindi saklaw ng modernong limitasyon ng artifact ang mga lumang inline/disk body.
Dapat hiwalay na maglaan ng kapasidad para sa RSS ang mga operator, lalo na sa mga container na may limitadong memory.

Minamana lamang ng child process ang na-resolve na `DATA_DIR`, `NODE_ENV`, tahasang `TZ` (pag-resolve ng lokal na oras
para sa mga legacy na filename), `ELECTRON_RUN_AS_NODE` kapag mayroon, at ang mga sumusunod na input para sa outbound:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (at ang mga lowercase na anyo ng mga ito),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Ginagamit ng isang global na Undici dispatcher ang parehong pag-resolve ng proxy batay lamang sa environment at mga panuntunan
sa pag-bypass ng lokal na host ng server, kabilang ang `NO_PROXY`; hindi nito ini-import ang `proxyFetch.ts` o ang mga DB/feature flag nito.
Itinatago ang mga kredensyal ng proxy sa ipinapasang output at mga naitalang error. Ang mga kredensyal ng destinasyon
ay ipinapadala lamang sa iisang panimulang mensahe ng IPC, hindi kailanman sa argv o environment; ang pagpapasa ng output/error ay
nilalagyan ng prefix at nililinis. Tanging `ExperimentalWarning` ang dini-disable sa mga exec argument ng child process upang maiwasang
maulit ang babala ng Node tungkol sa SQLite sa bawat pagtakbo ng cron; nananatiling nakikita ang iba pang uri ng babala.

Dapat ma-import ang mga module ng destinasyon nang walang mga dependency sa Next.js/server-only. Natutugunan na
ng kasalukuyang implementasyon ng BigQuery ang kontratang iyon. Ang mga cache ng access token ay tumatagal lamang habang tumatakbo ang child process,
hindi sa pagitan ng mga pagtakbo. Node ang sinusuportahang runtime (engines sa `package.json`), ngunit ang seksiyon ng README tungkol sa pag-install
ng Bun at ang `Dockerfile.bun` ay nagsasaad din ng landas ng compatibility para sa production gamit ang
`bun:sqlite` (`src/lib/db/core.ts` / mga adapter). Sa Bun, samakatuwid, pinananatili ng mga export ang dating
in-process na paraan at naglalabas ng isang beses na babala: hindi available ang isolation ng heap/timeout sa child process. Gumamit ng
Node para sa isolation ng event loop at OOM; hindi itinuturing na para lamang sa development ang Bun dito.

Kapag naka-enable ang `includeBodies`, mas mainam ang iskedyul na kada ilang minuto gaya ng
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` sa halip na mag-ipon ng backlog ng payload kada oras.
Nililimitahan pa rin ng mga limitasyon sa batch at row ang bawat pagtakbo. May gastos sa pagsisimula ng process para sa bawat destinasyon sa bawat pagtakbo;
ipinagpapalit nito ang maliit na gastos sa pagsisimula para sa isolation ng event loop ng server, hindi para mabawasan ang kabuuang paggamit ng CPU.

### Mga payload (mga prompt at completion)

Bilang default, ang export ay naglalaman lamang ng mga field ng buod na ipinapakita sa **listahan** ng Logs. Kapag in-on ang
**I-export ang mga prompt at tugon** (`includeBodies`), ipinapadala rin ang ipinapakita ng pane ng **detalye**
ng Logs para sa bawat tawag:

| Field                            | Nilalaman nito                                                        |
| -------------------------------- | --------------------------------------------------------------------- |
| `request_body` / `response_body` | Mga payload ng tawag ayon sa pagkaka-render ng dashboard              |
| `pipeline_route_decision`        | Aling target at modelo ang pinili ng router                           |
| `pipeline_client_request`        | Ang hilaw na request na eksaktong gaya ng ipinadala ng client         |
| `pipeline_openai_request`        | Pagkatapos isalin sa panloob na format ng OpenAI                      |
| `pipeline_provider_request`      | Gaya ng aktuwal na ipinadala sa upstream, sa format ng provider       |
| `pipeline_provider_response`     | Ang hilaw na tugon mula sa upstream                                   |
| `pipeline_client_response`       | Ang ibinalik sa tumawag                                               |
| `pipeline_error`                 | Detalye ng error sa antas ng pipeline para sa nabigong tawag          |
| `bodies_truncated`               | True kapag umabot sa `maxBodyBytes` ang alinman sa mga field sa itaas |

Nilalaman ito ng prompt, kaya **naka-off ito bilang default** at sadyang pinipili para sa bawat destinasyon.
Ang ipinapadala ay ang ipinapakita ng dashboard, dahil magkapareho ang pag-resolve ng detalye ng export at `getCallLogById`:
ang mga payload ay
nalinis na ng PII at naitago na ang mga lihim sa oras na isulat ang mga ito, at ang tawag na ginawa gamit ang
API key na `noLog` ay hindi nag-iimbak ng anumang payload, kaya walang ie-export.

Binabasa ang mga payload para sa bawat row mula sa artifact sa filesystem, kaya isinasagawa lamang ang hydration para sa mga destinasyong
humiling nito. Kapag nawawala o sira ang isang artifact, ine-export ang buod nito na may mga null na payload sa halip
na mabigo ang batch at maiwang hindi umuusad ang cursor.

Nililimitahan ng `maxBodyBytes` (default na 262144) ang bawat field. Ang mas mahahabang payload ay **pinuputol sa halip na
alisin** — nasasagot pa rin ng pinutol na prompt ang "ano ang itinanong" — at nilalagyan ang row ng flag na
`bodies_truncated`. Hindi ine-export ang mga delta na ini-stream nang paisa-isang chunk; ang nabuong tugon ay
nasa `pipeline_provider_response` at `pipeline_client_response` na.

---

## 2. Mga File

| Bahagi                          | Lokasyon                                     |
| ------------------------------- | -------------------------------------------- |
| Kontrata ng destinasyon         | `src/lib/logExport/types.ts`                 |
| Rehistro                        | `src/lib/logExport/registry.ts`              |
| Pangangasiwa ng mga lihim       | `src/lib/logExport/secrets.ts`               |
| Tagapagpatakbo (IPC ng parent)  | `src/lib/logExport/runner.ts`                |
| Siklo ng buhay ng proseso       | `src/lib/logExport/childRunner.ts`           |
| Entry point ng child            | `src/lib/logExport/exportChild.ts`           |
| Tagapagbukas na read-only       | `src/lib/db/logExportReadOnly.ts`            |
| Pinagsasaluhang query/pagmamapa | `src/lib/usage/callLogExportQueries.ts`      |
| Tagalutas ng detalye            | `src/lib/usage/callLogDetailResolver.ts`     |
| Proyeksiyon ng API              | `src/lib/logExport/presenter.ts`             |
| Destinasyong BigQuery           | `src/lib/logExport/destinations/bigquery.ts` |
| Pagpapatunay ng Google SA       | `src/lib/logExport/googleServiceAccount.ts`  |
| Pinagmulan ng log ng tawag      | `src/lib/usage/callLogExportSource.ts`       |
| Permanenteng pag-iimbak         | `src/lib/db/logExportDestinations.ts`        |
| Cron job                        | `src/lib/jobs/logExportJob.ts`               |
| Layer ng REST                   | `src/app/api/log-export/`                    |
| Pahina ng dashboard             | `src/app/(dashboard)/dashboard/log-export/`  |

Iskema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Lahat ng ruta ay nangangailangan ng pagpapatunay para sa pamamahala (`requireManagementAuth`). Hindi kailanman ibinabalik ang mga lihim:
ang isang nakaimbak na lihim ay ibinabalik bilang literal na `__stored__`, at ang pagpapadala muli ng halagang iyon sa isang pag-update
ay nagpapanatili sa nakaimbak na kredensiyal.

Ang paggawa o pag-update ng destinasyon na ang uri ay nagdedeklara ng lihim ay **nangangailangan ng
`STORAGE_ENCRYPTION_KEY`**. Kung wala ito, ipinapasa lamang ng `encrypt()` ang datos nang walang abiso, kaya ang pagsusulat ay
tinatanggihan gamit ang 400 sa halip na maglagay ng kredensiyal sa SQLite bilang plaintext (ang parehong proteksiyong
ipinapatupad ng Telegram webhook).

| Metodo   | Path                                     | Layunin                                                                                         |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Mga uri ng destinasyon + listahan ng kanilang mga field ng configuration                        |
| `GET`    | `/api/log-export/destinations`           | Ilista ang mga destinasyon (nakatago ang mga lihim)                                             |
| `POST`   | `/api/log-export/destinations`           | Gumawa ng destinasyon                                                                           |
| `GET`    | `/api/log-export/destinations/{id}`      | Basahin ang isa                                                                                 |
| `PUT`    | `/api/log-export/destinations/{id}`      | I-update ang pangalan / pagkaka-enable / configuration / pagba-batch                            |
| `DELETE` | `/api/log-export/destinations/{id}`      | Tanggalin                                                                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | Suriin ang mga kredensiyal, walang isusulat                                                     |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Iproseso ang lahat ng nakapila ngayon, gamit ang parehong daloy ng nakaiskedyul na pagpapatakbo |
| `GET`    | `/api/log-export/status`                 | Kalagayan ng cron, mga kamakailang pagpapatakbo, backlog bawat target                           |

Ang `GET /api/log-export/types` ang dahilan kung bakit pangkalahatan ang UI: binubuo ang form sa dashboard mula sa
mga ibinalik na paglalarawan ng field, kaya hindi nangangailangan ng pagbabago sa UI ang isang bagong destinasyon.

---

## 4. Destinasyong BigQuery

Mga key ng configuration (`type: "bigquery"`):

| Key                  | Mga tala                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `projectId`          | GCP project na naglalaman ng dataset                                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                                          |
| `location`           | Ginagamit lang kapag kailangang gawin ang dataset (default na `EU`)                      |
| `serviceAccountJson` | Key ng service account. Lihim: naka-encrypt habang nakaimbak, hindi kailanman ibinabalik |
| `autoCreate`         | Gawin ang dataset at table sa unang pag-export (default na `true`)                       |

Kailangan ng service account ang `bigquery.tables.updateData` sa target na table, pati ang
`bigquery.datasets.create` / `bigquery.tables.create` kapag naka-on ang `autoCreate`.

Ang naka-configure na batch ay isang yunit ng **cursor**, hindi ng HTTP: hinahati ito ng `send()` sa mga tawag sa insertAll
na may hanggang 500 row, kaya hindi malalampasan ng malaking `batch_size` ang 10 MB na limitasyon ng BigQuery sa request.
Ang mga pansamantalang status (408/429/500/502/503/504) ay muling sinusubukan nang hanggang tatlong beses na may exponential
backoff, gamit muli ang parehong mga insertId; ang mga pagkabigo sa authentication at schema ay naghahagis ng exception sa unang pagsubok sa halip
na sayangin ang pagpapatakbo.

Ang table na kagagawa lang ay hindi pa nakikita ng streaming endpoint, na tumutugon ng
404 sa loob ng ilang segundo. Muling sinusubukan ang 404 na iyon, pero **kapag ang pagpapatakbong ito lang ang gumawa ng table** —
mabilis pa ring mabibigo kapag talagang nawawala ang table. Tandaan na kapag muling gumawa ng table gamit ang pangalang
kamakailan lang binura, tatanggihan ng BigQuery ang mga streaming insert sa loob ng ilang minuto; katangian ito ng
pagbura-at-muling-paggawa, kaya mas mainam na gumamit ng bagong pangalan ng table kaysa magbura at muling magdagdag nito.

**Dumarating ang bahagyang pagkabigo bilang HTTP 200 na may hindi bakanteng `insertErrors[]`.** Itinuturing iyon na
pagkabigo at naghahagis ng exception, na siyang pumipigil sa cursor na lumampas sa mga row na hindi kailanman
tinanggap ng BigQuery; tinitiyak ng `tests/unit/log-export-bigquery.test.ts` ang gawi na ito.

Karaniwang REST ang ginagamit sa transport — ipinapalit ang isang self-signed na RS256 assertion sa access token sa
`https://oauth2.googleapis.com/token`, at pagkatapos ay ipinapadala ang mga row sa `tabledata.insertAll`. Walang Google SDK na
idinadagdag. Kina-cache ang mga access token sa loob ng proseso para sa bawat pares na (service account, scope).

Ang ginawang table ay may isang column para sa bawat field sa tab na Logs, kasama ang `exported_at`, at nakaayos ayon sa
aktuwal na paraan ng pag-query sa mga call log:

- **Naka-partition ayon sa araw sa `timestamp`**, kaya ang query na nililimitahan ayon sa petsa ay ang mga araw na iyon lang ang ini-scan.
- **Naka-cluster ayon sa `api_key_name`, `provider`, `model`, `status`** (sa pagkakasunod na iyon), kaya ang pag-filter ayon sa
  kung sino ang nagpatakbo nito, kung saan ito napunta, o kung nabigo ito ay nag-aalis ng mga block na kailangang i-scan sa bawat partition. Pinapayagan ng BigQuery
  ang hanggang apat na clustering column at mahalaga ang pagkakasunod-sunod: ang filter sa `api_key_name` lang
  ay nagbabawas ng mga block na kailangang i-scan, samantalang ang filter sa `status` lang ay hindi.
- **Opsyonal na pagpapanatili ng partition** sa pamamagitan ng `partitionExpirationDays` (pinapanatili ng 0 ang lahat), na inilalapat
  kapag ginawa ang table.

Parehong inilalapat ang mga setting sa oras ng paggawa. Pinapanatili ng umiiral na table ang kasalukuyang ayos nito, kaya
ituro ang destinasyon sa isang bagong table id kung gusto mong gamitin ang mga ito.

Tinitiyak ng `tests/unit/log-export-bigquery.test.ts` na nananatiling magkatugma ang mapper at ang schema ng table,
kaya hindi maaaring tahimik na mawala ang isang bagong column ng call log habang ine-export.

Hinahati ang mga batch ayon sa **parehong** bilang ng row at laki ng mga serialized byte. Hindi sapat ang bilang lang ng row
kapag nag-e-export na ng mga payload: maaaring umabot sa sampu-sampung megabyte ang 500 row na may mga prompt, at tinatanggihan ng insertAll
ang request na lampas 10 MB. Isinasara ang bawat chunk sa 500 row o 9 MB, alinman ang mauna.

---

## 5. Destinasyon ng mga OTLP/HTTP trace

Gumagamit ang configuration ng `type: "otlp-http"`. Isa itong naka-iskedyul na pag-export ng mga nakaimbak na
call log na gumagamit ng cursor, hindi ang best-effort na live routing-event sink sa
`open-sse/services/routing/otel.ts`. Hindi nito binabasa o binabago ang mga environment
variable, timer, o buffer ng sink na iyon. Kapag parehong pinagana, maaaring makagawa ng dalawang magkahiwalay na uri ng span;
gamitin ang instrumentation scope na `omniroute.log-export` upang matukoy ang mga call-log span na ito.

| Key                      | Default / layunin                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `endpoint`               | Kinakailangang buong HTTP(S) traces URL; walang idinaragdag na hulaping `/v1/traces`                  |
| `headers`                | Opsyonal na mga linyang `Name: value` o JSON object ng mga string; naka-encrypt                       |
| `requestHeaderAllowlist` | Walang laman (naka-off); mga pangalan/prefix ng client header na kukunin bilang mga attribute ng span |
| `serviceName`            | `omniroute`; resource na `service.name`                                                               |
| `langfuseMapping`        | `false`; nagdaragdag ng mga attribute ng generation/session/user para sa Langfuse                     |
| `identity`               | `pseudonymous`, `keyName`, o `none`                                                                   |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                               |
| `timeoutMs`              | `30000` sa bawat HTTP attempt                                                                         |
| `environment`            | Hindi nakatakda; opsyonal na `langfuse.environment`                                                   |

Ipinapakita ng pangkalahatang dashboard ang mga field na ito. Tumatanggap ang `paths` ng API array o textarea
na may mga eksaktong path na pinaghihiwalay ng mga bagong linya/kuwit. Nilalaktawan ang embeddings, rerank, at iba pang path
maliban kung tahasang pinapayagan. Ipinapasulong pa rin ng mga nilaktawang row ang cursor; binibilang ng mga counter na
`exported`/`exportedTotal` ng kasalukuyang runner ang mga naprosesong source row, kabilang ang mga na-filter
na row, sa halip na ang mga tinanggap na span. Ginagawa ang pag-filter sa child, nang hindi binabago ang
kontrata nito sa IPC/cursor.

Gumagamit ang URL validation ng helper na `parseAndValidateNonMetadataUrl` na hindi nangangailangan ng DB mula sa
`src/shared/network/outboundUrlGuard.ts`: ang patakarang `block-metadata`. Mayroon itong kaparehong
walang-kondisyong pagsusuri sa metadata/protocol/naka-embed na credential gaya ng webhook validator na
pinapayagan ang mga pribadong URL, ngunit sadyang pinapayagan nito ang mga localhost/LAN target nang walang pandaigdigang
feature-flag override. Pinapahintulutan nito ang mga self-hosted na endpoint ng Langfuse, Phoenix, Tempo, at Collector,
kabilang ang mga pribadong HTTP endpoint. Palaging bina-block ang mga cloud-metadata host.
Hindi sinusundan ang mga redirect, kaya hindi maaaring i-redirect ng collector ang mga credential sa ibang host.
Tulad ng kasalukuyang lexical URL guard, hindi nito itinatakda nang permanente ang DNS resolution; mag-configure lamang
ng mga host na kontrolado ng operator. Mas piliin ang HTTPS kapag wala sa pinagkakatiwalaang network ang endpoint.

### Payload at paghahatid

Ang OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) ay naglalaman ng isang
CLIENT span sa bawat pinapayagang row, na ipinapangalan ayon sa eksaktong request path nito. Natutukoy sa pangalan ng path ang
Chat Completions, Responses, at Messages nang hindi isinasama ang data ng modelo o pagkakakilanlan sa
pangalan ng span. Kabilang sa mga resource attribute ang `service.name` at ang `service.version` ng package.

Isinusulat ng karaniwang chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) ang
`duration = Date.now() - startTime` sa pagkumpleto at hindi ito nagbibigay ng timestamp;
itinatakda ng `saveCallLogOperation` sa `src/lib/usage/callLogs.ts` ang default na timestamp sa oras ng pagsulat
(pagkumpleto). Kaya itinatakda ng export ang end = timestamp ng row at start = end − duration
(millisecond, na kino-convert sa mga decimal na nanosecond). Pinapanatili rin bilang oras ng pagtatapos ang mga makasaysayang timestamp
na ibinigay ng caller; walang pantukoy ng simula/pagkumpleto sa bawat row.
Nagiging zero ang null na duration. Nagpapabigo sa batch ang mga di-wasto/nawawalang timestamp sa halip na gumawa
ng mga di-deterministikong span. Maaaring null ang `ttftMs` at nakamapa ito sa `omniroute.ttft_ms`.

Kabilang sa mga attribute ang `gen_ai.operation.name="chat"`, provider, hiniling/isinagot na modelo,
mga input/output token, opsyonal na mga cache-read/cache-creation/reasoning token, HTTP status,
combo, pinagmulan ng cache, session tag, at correlation id. Mga decimal string ang mga integer na OTLP value at timestamp;
ginagamit ng mga string, boolean, at fractional na numero ang kani-kanilang katutubong OTLP value
variant. May ERROR status at nilinis na status message ang mga error span. Walang upstream host URL ang canonical
record, kaya hindi isinasama ang `server.address` sa halip na maling tukuyin
ang collector bilang model server. Hindi ine-export ang gastos.

Ang `includeBodies=true` lamang ang naglo-load ng nilalaman. Kapag `langfuseMapping=false`,
naglalaman ang `gen_ai.input.messages` / `gen_ai.output.messages` ng nilinis na request/response
body JSON ayon sa pagkakaimbak ng OmniRoute (ginagawang canonical kapag maaaring i-parse), hindi ng binagong semconv
messages array. Nananatiling raw text ang mga pinutol/hindi JSON na body. Kapag `langfuseMapping=true`,
inilalabas lamang ang mga body bilang `langfuse.observation.input` / `langfuse.observation.output`;
hindi isinasama ang mga attribute na `gen_ai.*.messages` upang isang beses lamang maipadala ang bawat body. Parehong mode
ang nagmamana ng `maxBodyBytes` mula sa kasalukuyang proseso ng pag-load ng nilalaman;
minamarkahan ng `omniroute.bodies_truncated=true` ang pagputol.
Walang idinaragdag na mga karagdagang pipeline snapshot o pagbasa ng mga hindi nilinis na artifact ang destinasyong ito;
ginagamit ng opsyonal na pagkuha ng request header ang kasalukuyang na-load na client snapshot na inilalarawan sa ibaba.
Gumamit ng iskedyul na nasa antas ng minuto gaya ng `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kapag nag-e-export
ng mga body, sa halip na hayaang maipon ang mga ito kada oras.

### Mga opsyonal na client request header

**Naka-off bilang default** ang pagkuha ng header. Itakda ang `requestHeaderAllowlist` sa configuration ng destinasyon
at paganahin ang **I-export ang mga prompt at tugon** (`includeBodies: true` sa destinasyon).
Tumatanggap ang allowlist ng API array o textarea na may mga pangalang pinaghihiwalay ng bagong linya/kuwit:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Eksaktong tumutugma ang mga pangalan nang hindi isinasaalang-alang ang laki ng titik, maliban kung ang isang `*` sa pinakadulo ay pumipili ng di-bakanteng
prefix ng pangalan ng header. Tinatanggihan ang nag-iisang `*`, mga wildcard sa loob ng pangalan, at mga di-wastong pangalan ng HTTP header.
May hanggang 64 na selector, bawat isa ay may pangalan/prefix na hindi lalampas sa 256 ASCII byte.
Hiwalay ang setting na ito sa `headers`, na nagpapatunay ng pagkakakilanlan ng exporter sa collector.

Binabasa lamang ng pagkuha ang `pipeline_client_request`, na pinupunan mula sa `clientRawRequest`
(o sa legacy na `clientRequest`) ng naka-save na detalyadong pipeline. Hindi ito kailanman gumagamit ng mga header ng request sa provider bilang fallback.
Dapat naka-enable ang detalyadong pag-log ng pipeline noong naitala ang request. Kapag
naka-disable ang `includeBodies`, o kapag nawawala, sira, o naputol ang JSON ng snapshot ng client, walang inilalabas na
attribute ng header. Maaaring maiwasan ng pagpapataas ng `maxBodyBytes` ang pagkaputol ng snapshot sa oras ng pag-export;
hindi nito maibabalik ang detalyeng hindi kailanman na-save. Binabalewala ang snapshot na lampas sa 1 MiB o naglalaman ng higit sa
256 na entry ng header. Nananatiling naka-enable ang kasalukuyang pag-export ng prompt/response kasabay ng
pagkuha ng header; hindi nagbibigay ang allowlist ng hydration mode para sa mga header lamang.

Nagiging mga OTLP string array na `http.request.header.<full lowercase header name>` ang mga napiling value,
kahit para sa iisang string. Halimbawa, ang `X-OmniRoute-Meta-Team: example-team` ay nagiging
`http.request.header.x-omniroute-meta-team` na may
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Pinananatili ang buong prefix: mga karaniwang header ang mga ito, na walang pag-parse ng business field o
pag-convert sa `omniroute.metadata.*` / metadata ng Langfuse. Hindi binabago ng `langfuseMapping` ang kahulugan
ng mga header. Itinatakda rin ng napiling `User-Agent` na may iisang value ang karaniwang scalar na
`user_agent.original`. Hindi hinahati ang mga kuwit sa loob ng isang value. Pinagsasama ang mga variant ng laki ng titik ayon sa naka-save na
pagkakasunod-sunod ng mga entry; kapag may di-wastong variant, inaalis ang buong header na iyon. Inaayos ang mga attribute ayon sa pangalang nasa maliliit na titik.

Palaging hindi isinasama ang Authorization, Proxy-Authorization, Cookie, Set-Cookie, mga API-key header, mga pangalang naglalaman ng
mga panandang auth/token/secret/password/credential, at mga panloob na kredensyal ng gateway,
kahit napili ang mga ito o bahagyang natakpan sa storage. Ginagamit muli ng mga kilalang pattern ng kredensyal
ang nakabahaging detector ng kredensyal; inaalis ang mga pananda ng redaction, hindi ine-export bilang ligtas na mga value.
Mga string at di-bakanteng string array lamang ang tinatanggap; walang sapilitang pag-convert ng mga numero o object.
Binabalewala ang mga di-wastong pangalan, prototype key, control character (maliban sa horizontal tab), at maling anyo ng Unicode
nang hindi pinapabigo ang batch o inilalantad ang nilalaman ng mga ito sa mga error.

Kumukuha ang bawat span ng hanggang 32 header, 16 na value bawat header, 4096 UTF-8 byte bawat value,
at 16384 na kabuuang UTF-8 byte para sa lahat ng nakuhang pangalan at value ng header. Buong inaalis ang mga header na sobrang laki/di-wasto,
hindi pinuputol. Ang pagpili ay desisyon ng operator hinggil sa privacy: ang mga pangalang mukhang ligtas
ay maaari pa ring maglaman ng personal na data, at ang mga limitasyon/detector na ito ay hindi pangkalahatang panlinis ng PII.

### Mga limitasyon sa paghahatid

Nililimitahan ang mga request sa 500 span at 4 MiB ng UTF-8 JSON, kasama ang envelope.
Sinusuri ang laki ng bawat pinapayagang span bago ang unang request ng isang cursor batch. Kapag ang isang
span ay mas malaki sa limitasyon, walang ipinapadalang bahagi ng batch na iyon at nabibigo ito na may gabay na babaan ang
`maxBodyBytes`; hindi ito basta inaalis nang walang abiso. Mga reference lamang ng record at
bilang ng byte ang pinananatili ng preflight, at itinatapon ang bawat pansamantalang span/JSON; muling binubuo ang mga span para sa mga chunk na may takdang laki
sa halip na magpanatili ng ikalawang serialized na kopya ng batch. Ang HTTP 408/429/5xx, mga pagkabigo sa network, at mga timeout ay may hanggang
tatlong pagtatangka, na may 250/500 ms na exponential backoff. Maaaring pahabain ng mga segundo o HTTP date sa `Retry-After`
ang pagkaantala hanggang 5 segundo. Agad na nabibigo ang ibang status. Nagbubunsod din ng error ang bahagyang pagtanggi sa OTLP 2xx sa halip na
kilalanin bilang natanggap ang isang nawalang span; tinatanggap ang mga pagkilalang walang laman o may wastong JSON, na may
64 KiB na limitasyon sa pagbasa ng tugon.

Naglalaman lamang ang mga error ng mga impormasyong mula sa exporter: HTTP status, kategorya ng muling pagtatangka, bilang ng mga pagtatangka at naipadalang
span, o nakapirming pananalita para sa pagkabigo sa pagkilala/network. Ang mga body ng tugon ng collector,
bilang ng bahagyang tagumpay, at mga header ng tugon ay hindi kailanman kinokopya sa mga error, log, o sa
dashboard. Hindi kinikilalang natanggap ang isang nabigo o bahagyang tinanggap na batch: ipinapakita ng destination ang
Failing kasama ng status na iyon, nananatili ang cursor sa huling batch na kinilalang natanggap, at sa susunod na pagtakbo ay
muling ipinapadala ang parehong mga row. Patuloy na nabibigo ang mga permanenteng status hanggang sa maayos ang collector o configuration.
Gamitin ang sariling mga log ng collector para sa mga detalye ng tugon. Pinananatili ng mga buod ng error sa call-log
ang hiwalay nilang redaction.
Walang inihahandang resource ang `prepare()`; eksaktong `{"resourceSpans":[]}` ang ipinapadala ng Test at iniuulat nito ang
HTTP status nang hindi nagsusulat ng mga span ng call-log.

Ang mga trace id at span id ay ang unang 32/16 na hex digit ng SHA-256 ng
`"omniroute.trace\\0" + callLogId` at `"omniroute.span\\0" + callLogId`. Magkaparehong id ang dala ng
mga muling pagpapadala. Hindi ito garantiya ng deduplication: ang ilang backend, kabilang ang ingestion ng Langfuse
v4, ay hindi nag-aalis ng mga duplikadong span na may parehong id. Ang pag-crash o bahagyang pagkabigo ng chunk ay maaaring
magdulot ng muling pagpapadala ng hanggang isang cursor batch na hindi pa kinikilalang natanggap; maaaring madoble ang buong batch na iyon,
hindi lamang ang huling HTTP chunk nito. Piliin ang laki ng cursor batch nang isinasaalang-alang ang kapalit na iyon.

### Halimbawa ng Langfuse

I-configure ang mga field na ito para sa isang self-hosted na instance ng Langfuse:

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

Lokal na buuin ang value ng Authorization bilang Base64 ng literal na string na `public-key:secret-key`
(halimbawa, gamit ang `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Huwag mag-paste ng mga tunay na kredensyal sa mga log, screenshot, o issue. Awtomatikong
itinatakda ng mapping ang `x-langfuse-ingestion-version: 4`; ibinibigay pa rin ang Authorization sa `headers`.
Parehong ginagamit ng mga header at ng nabuong identity salt ang kasalukuyang mekanismo ng naka-encrypt na secret field
at mga placeholder ng API; kinakailangan ang `STORAGE_ENCRYPTION_KEY`.

Nagdaragdag ang mapping ng uri/modelo ng generation, mga detalye ng paggamit sa JSON (input/output/kabuuan at mga available na
cache key), mga snapshot ng input/output sa JSON, antas na ERROR/DEFAULT, nilinis na mensahe ng status,
pangalan ng trace, session id, opsyonal na environment at nafi-filter na
`langfuse.observation.metadata.<key>` para sa provider, hiniling na modelo, path, combo, pinagmulan ng
cache at status. Ang `langfuse.observation.completion_start_time` ay nasa ISO 8601 sa
oras ng pagsisimula + TTFT lamang kapag alam ang TTFT at nasa loob ito ng tagal. Walang ipinapadalang mga attribute ng gastos.

Nalalapat ang mga identity mode sa `langfuse.user.id`:

- `pseudonymous` (default): HMAC-SHA256 ng internal id ng API key gamit ang random na
  32-byte salt para sa bawat destinasyon. Binubuo ang salt sa paggawa kung wala pa ito, ini-encrypt
  bilang `identitySalt`, hindi kailanman ibinabalik, at pinapanatili sa mga pag-edit. Hindi kailanman
  inilalagay ang mga raw key id sa mga span attribute. Nagbabago ang mga identity kapag muling ginawa/pinalitan ang salt ng isang destinasyon.
- `keyName`: ang naka-configure na pangalan ng API key, na sadyang inilalantad ang label na iyon ng operator.
- `none`: walang user id. Ini-export pa rin ang mga session tag kapag mayroon; hindi ginagawang
  anonymous ng mga mode na ito ang anumang nilalaman ng prompt o mga label ng session/correlation na ibinigay ng operator.

### Pagsisimula nang walang backfill

Sa paggawa lamang, i-enable ang **Magsimula sa kasalukuyang posisyon (laktawan ang mga umiiral na log)** o ipasa ang
`startFromCurrentPosition: true` sa pinakamataas na antas ng payload ng create API. Itinatakda nito ang paunang halaga ng
`cursor_row_id` sa kasalukuyang pinakamataas na pinanatiling rowid ng call-log gamit ang mga umiiral na cursor
helper, nang walang migration. Ang default ay false (cursor 0 at backfill ng pinanatiling kasaysayan).
Hindi ito setting para sa pag-reset ng cursor sa oras ng pag-update.

Ang pagdaragdag ng nakabahaging `ttftMs` ay nagdaragdag din ng nullable na column na `ttft_ms` sa BigQuery mapper
at schema ng bagong table: hinihingi ng schema test nito na may katumbas na
column ang bawat field ng canonical record. Patuloy na nag-e-export ang mga umiiral na table nang walang pagbabago: binabasa ng `prepare()` ang schema ng table at
inaalis lamang ang `ttft_ms` kapag wala ang column na iyon. Idagdag ang nullable na INT64 column upang makuha ang TTFT
sa susunod na pagtakbo, o gumamit ng bagong table. Hindi kailangan ng PATCH, awtomatikong pagbabago ng schema o karagdagang
mga pahintulot; nananatili ang mahigpit na pagsusuri ng schema para sa lahat ng iba pang field ng row.

---

## 6. Pagdaragdag ng destinasyon

1. Gumawa ng `src/lib/logExport/destinations/<name>.ts` na nag-e-export ng `LogExportDestinationType`:
   isang Zod `configSchema`, isang array ng mga descriptor na `fields` para sa UI, `secretFields`, at isang
   `createClient(config)` na nagbabalik ng `test()` / `prepare()` / `send(records)`.
2. Idagdag ito sa array na `DESTINATIONS` sa `src/lib/logExport/registry.ts`.
3. Sumulat ng mga test sa ilalim ng `tests/unit/`.

Iyan na ang buong pagbabago: ang persistence, ang cron job, ang REST layer, ang pag-encrypt ng mga lihim, at ang
form sa dashboard ay pawang bumabasa sa registry.

Dalawang tuntunin para sa bagong destinasyon:

- Ang `send()` ay **dapat maghagis ng exception** kapag may bahagyang pagkabigo. Ang matagumpay na pagkumpleto ay nangangahulugang "nasa destinasyon na ang mga row na ito",
  at permanenteng lalampasan na ng cursor ang mga ito.
- Ang destinasyong tumatanggap ng URL na ibinigay ng user ay dapat mag-validate nito gamit ang
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) bago kumuha ng data,
  gaya ng ginagawa ng mga webhook. Hindi ito kailangan ng BigQuery: mga constant ang mga host nito.

---

## 7. Pagpapatakbo nito

- **Dashboard**: Mga Integrasyon → Pag-export ng log. Magdagdag ng destinasyon, patakbuhin ang **Subukan** para suriin ang mga kredensyal
  nang hindi nagsusulat ng mga row, pagkatapos ay paganahin ito.
- **Mga nakabinbin**: ipinapakita ng bawat card ng destinasyon ang mga nakabinbing row at ang cursor; ibinabalik ng `GET
/api/log-export/status` ang parehong mga bilang kasama ang huling 20 pagpapatakbo ng job.
- **Hindi pinapabigo ng isang pumapalya na destinasyon ang iba** — itinatala ng buod ng pagpapatakbo ang status ng bawat destinasyon
  sa `last_status` / `last_error`, at pinananatili ng kasaysayan ng pagpapatakbo ng job ang pinagsama-samang resulta.
- **Kapag nag-delete ng destinasyon, made-delete rin ang cursor nito.** Kapag idinagdag itong muli, magsisimula ito sa pinakamatandang pinanatiling
  call log, kaya muling maipapadala ang mga row na maaaring nasa destinasyon na. Sa BigQuery, pinipigilan ng `insertId` ng bawat row
  ang pagdodoble ngunit sa loob lamang ng sariling palugit ng BigQuery para sa pag-aalis ng duplicate, kaya mas piliing i-disable
  ang destinasyon kaysa i-delete ito.
