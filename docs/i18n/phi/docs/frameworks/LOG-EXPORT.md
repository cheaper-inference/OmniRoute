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

## 4. Destinasyon ng BigQuery

Mga config key (`type: "bigquery"`):

| Key                  | Mga tala                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP project na naglalaman ng dataset                                                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                     |
| `location`           | Ginagamit lamang kapag kailangang likhain ang dataset (default `EU`)                                                |
| `serviceAccountJson` | Key ng service account. Lihim: naka-encrypt habang nakaimbak, hindi kailanman ibinabalik                            |
| `autoCreate`         | Lumikha ng nawawalang dataset/table; may kondisyong magdagdag ng nullable na usage-evidence column (default `true`) |

Kailangan ng service account ang `bigquery.tables.updateData` sa target table, pati na ang
`bigquery.datasets.create` / `bigquery.tables.create` kapag naka-on ang `autoCreate`.
Kailangan din ng `bigquery.tables.update` ang pag-update sa isang umiiral na table upang
maidagdag ang dalawang nullable na usage-evidence field. Kapag walang kinakailangang
permission, mabibigo ang export nang hindi isinusulong ang cursor nito.

Ang isang naka-configure na batch ay isang yunit ng **cursor**, hindi HTTP: hinahati ito ng
`send()` sa mga insertAll call na may hanggang 500 row, kaya hindi maaabot ng malaking
`batch_size` ang 10 MB request cap ng BigQuery. Ang mga transient status (408/429/500/502/503/504)
ay muling sinusubukan nang hanggang tatlong beses gamit ang exponential backoff, at
muling ginagamit ang parehong insertIds; ang mga auth at schema failure ay nagti-throw sa
unang pagtatangka sa halip na ubusin ang run.

Ang isang table na kagagawa pa lamang ay hindi pa agad nakikita ng streaming endpoint, na
sumasagot ng 404 sa loob ng ilang segundo. Muling sinusubukan ang 404 na iyon, ngunit
**kapag ang run na ito lamang ang lumikha ng table** — ang talagang nawawalang table ay
agad na nagfa-fail. Tandaan na kapag muling lumikha ng table gamit ang pangalang kamakailan
lamang na dinelete, tatanggihan ng BigQuery ang streaming insert sa loob ng ilang minuto;
katangian ito ng delete-then-recreate, kaya mas mainam ang bagong pangalan ng table kaysa
burahin at idagdag itong muli.

**Ang isang partial failure ay dumarating bilang HTTP 200 na may hindi walang-lamang `insertErrors[]`.** Itinuturing itong
failure at nagti-throw, na siyang pumipigil sa cursor na umusad lampas sa mga row na hindi
tinanggap ng BigQuery; itinatakda ng `tests/unit/log-export-bigquery.test.ts` ang behavior na ito.

Plain REST ang transport — ipinapalit ang isang self-signed na RS256 assertion sa access token sa
`https://oauth2.googleapis.com/token`, pagkatapos ay ipinapadala ang mga row sa
`tabledata.insertAll`. Walang Google SDK na isinasama. Naka-cache ang mga access token sa
loob ng proseso ayon sa (service account, scope).

Ang nalikhang table ay may isang column para sa bawat field ng Logs tab kasama ang
`exported_at`, at inayos para sa aktuwal na paraan ng pag-query sa mga call log:

- **Hinahati ayon sa araw gamit ang `timestamp`**, kaya ang query na may hangganang petsa ay
  tanging mga araw na iyon ang ini-scan.
- **I-cluster ayon sa `api_key_name`, `provider`, `model`, `status`** (sa ganitong pagkakasunod-sunod), kaya ang pag-filter ayon sa
  kung sino ang nagpatakbo nito, kung saan ito ipinadala, o kung nabigo ito ay nagpa-prune ng
  mga block sa loob ng bawat partition. Pinahihintulutan ng BigQuery ang hanggang apat na
  clustering column at mahalaga ang pagkakasunod-sunod: ang filter sa `api_key_name` lamang
  ay nagpa-prune, samantalang ang filter sa `status` lamang ay hindi.
- **Opsyonal na retention ng partition** gamit ang `partitionExpirationDays` (pinananatili ang lahat kapag 0), na
  inilalapat kapag nililikha ang table.

Parehong inilalapat ang mga setting sa oras ng paglikha. Pinananatili ng umiiral na table ang
kasalukuyan nitong layout, kaya ituro ang destination sa bagong table id kung nais mong
gamitin ang mga ito.

Tinitiyak ng `tests/unit/log-export-bigquery.test.ts` na nananatiling naka-lockstep ang mapper at
ang table schema, kaya hindi maaaring tahimik na mawala ang isang bagong call-log column
habang inilalabas.

Hinahati ang mga batch ayon sa **bilang ng row at mga serialised byte**. Hindi sapat ang bilang
ng row lamang kapag ine-export ang mga payload: ang 500 row na may mga prompt ay maaaring
umabot sa sampu-sampung megabyte, at tinatanggihan ng insertAll ang request na lampas sa 10 MB.
Nagsasara ang mga chunk sa 500 row o 9 MB, alinman ang mauna.

---

## 5. Destinasyon ng OTLP/HTTP traces

Gumagamit ang config ng `type: "otlp-http"`. Isa itong naka-schedule at cursor-backed na export ng mga naka-persist na call log, hindi ang best-effort live routing-event sink sa
`open-sse/services/routing/otel.ts`. Hindi nito binabasa o binabago ang mga environment
variable, timer, o buffer ng sink na iyon. Kapag parehong pinagana, maaaring makagawa ng
dalawang magkahiwalay na uri ng span; gamitin ang instrumentation scope na
`omniroute.log-export` upang makilala ang mga call-log span na ito.

| Key                      | Default / layunin                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `endpoint`               | Kinakailangang buong HTTP(S) traces URL; walang idinadagdag na `/v1/traces` suffix                 |
| `headers`                | Opsyonal na mga linyang `Name: value` o JSON object ng mga string; naka-encrypt                    |
| `requestHeaderAllowlist` | Walang laman (naka-off); mga pangalan/prefix ng client header na kukunan bilang mga span attribute |
| `serviceName`            | `omniroute`; resource na `service.name`                                                            |
| `langfuseMapping`        | `false`; nagdaragdag ng mga attribute para sa Langfuse generation/session/user                     |
| `identity`               | `pseudonymous`, `keyName`, o `none`                                                                |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                            |
| `timeoutMs`              | `30000` bawat HTTP attempt                                                                         |
| `environment`            | Hindi nakatakda; opsyonal na `langfuse.environment`                                                |

Nire-render ng generic dashboard ang mga field na ito. Tumatanggap ang `paths` ng API
array o textarea na may eksaktong mga path na pinaghiwalay ng mga newline/comma. Nilalaktawan
ang embeddings, rerank, at iba pang path maliban kung tahasang pinahintulutan. Umaabante pa
rin ang cursor sa mga nilaktawang row; binibilang ng mga kasalukuyang `exported`/`exportedTotal`
counter ng runner ang mga naprosesong source row, kabilang ang mga na-filter na row, sa halip
na ang mga tinanggap na span. Isinasagawa ang pag-filter sa child, nang hindi binabago ang
IPC/cursor contract nito.

Gumagamit ang URL validation ng DB-free na `parseAndValidateNonMetadataUrl` helper mula sa
`src/shared/network/outboundUrlGuard.ts`: ang patakarang `block-metadata`. Mayroon itong
parehong unconditional na mga pagsusuri sa metadata/protocol/embedded-credential gaya ng
webhook validator, na may pagpayag sa mga private URL, ngunit sadyang pinapahintulutan ang
mga localhost/LAN target nang walang global feature-flag override. Pinahihintulutan nito ang
mga self-hosted na Langfuse, Phoenix, Tempo, at Collector endpoint, kabilang ang mga private
HTTP endpoint. Palaging bina-block ang mga cloud-metadata host. Hindi sinusundan ang mga
redirect, kaya hindi maaaring i-redirect ng collector ang mga credential sa ibang host.
Gaya ng kasalukuyang lexical URL guard, hindi nito pini-pin ang DNS resolution; i-configure
lamang ang mga host na kontrolado ng operator. Mas mainam ang HTTPS kapag ang endpoint ay
wala sa pinagkakatiwalaang network.

### Payload at delivery

Ang OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) ay nagdadala
ng isang CLIENT span bawat pinahintulutang row, na pinapangalanan batay sa eksaktong request
path nito. Tinutukoy ng path naming ang Chat Completions, Responses, at Messages nang hindi
isinisingit ang model o identity data sa pangalan ng span. Kabilang sa resource attribute ang
`service.name` at `service.version` ng package.

Isinusulat ng normal na chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) ang
`duration = Date.now() - startTime` kapag kumpleto na at hindi nagbibigay ng timestamp;
itinatakda ng `saveCallLogOperation` sa `src/lib/usage/callLogs.ts` ang timestamp bilang oras ng
pagsulat (oras ng pagkumpleto) bilang default. Kaya itinatakda ng export ang end bilang
timestamp ng row at ang start bilang end − duration (milliseconds, na kino-convert sa decimal
nanoseconds). Pinananatili rin ang mga timestamp sa nakaraan na ibinigay ng caller bilang oras
ng end; walang discriminator sa bawat row para sa start/completion. Nagiging zero ang null na
duration. Nagdudulot ng pagkabigo sa batch ang mga invalid o nawawalang timestamp sa halip na
lumikha ng mga hindi deterministic na span. Nullable ang `ttftMs` at itinatapat sa
`omniroute.ttft_ms`.

Kabilang sa mga attribute ang `gen_ai.operation.name="chat"`, provider, requested/response
model, input/output token, mga opsyonal na cache-read/cache-creation/reasoning token, HTTP
status, combo, cache source, session tag, at correlation id. Ang mga integer na OTLP value at
timestamp ay mga decimal string; ginagamit ng mga string, boolean, at fractional number ang
kanilang native OTLP value variant. May ERROR status at sanitized status message ang mga error
span. Walang upstream host URL ang canonical record, kaya iniiwasang isama ang
`server.address` sa halip na maling tukuyin ang collector bilang model server. Hindi ine-export
ang cost.

Ang `includeBodies=true` lamang ang nagha-hydrate ng content. Kapag
`langfuseMapping=false`, taglay ng `gen_ai.input.messages` / `gen_ai.output.messages` ang
sanitized request/response body JSON ayon sa pagkaka-store ng OmniRoute (naka-canonicalize kapag
maaaring i-parse), hindi isang binagong semconv messages array. Nananatiling raw text ang mga
na-clip o hindi JSON na body. Kapag `langfuseMapping=true`, inilalabas lamang ang mga body
bilang `langfuse.observation.input` / `langfuse.observation.output`; inaalis ang mga
`gen_ai.*.messages` attribute upang isang beses lamang maipadala ang bawat body. Parehong
minamana ng mga mode ang `maxBodyBytes` mula sa kasalukuyang hydration path;
tinutukoy ng `omniroute.bodies_truncated=true` ang clipping.
Walang idinadagdag na karagdagang pipeline snapshot o unsanitized artifact read ang destinasyong
ito; ginagamit ng opsyonal na request-header capture ang kasalukuyang hydrated client snapshot
na inilalarawan sa ibaba. Gumamit ng cadence na nasa antas ng minuto gaya ng
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` kapag nag-e-export ng mga body, sa halip na mag-ipon
ng hourly backlog.

### Opsyonal na client request header

**Naka-off bilang default** ang header capture. Itakda ang `requestHeaderAllowlist` sa config
ng destination at paganahin ang **Export prompts and responses**
(`includeBodies: true` sa destination).
Tumatanggap ang allowlist ng API array o textarea na may mga pangalan na pinaghiwalay ng
newline/comma:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Ang mga pangalan ay nagtutugma nang hindi isinasaalang-alang ang malaking titik at eksakto, maliban kung ang isang nag-iisang pangwakas na `*` ay pumipili ng hindi bakanteng prefix ng pangalan ng header. Tinatanggihan ang nag-iisang `*`, mga wildcard na nasa loob ng pangalan, at mga di-wastong pangalan ng HTTP header. May hanggang 64 na selector, na ang bawat isa ay may pangalan/prefix na hanggang 256 ASCII byte. Hiwalay ang setting na ito sa `headers`, na nagpapatunay sa exporter sa collector.

Ang capture ay nagbabasa lamang mula sa `pipeline_client_request`, na pinupunan mula sa naka-save na detalyadong pipeline na `clientRawRequest` (o legacy na `clientRequest`). Hindi ito kailanman bumabalik sa mga header ng request ng provider. Dapat ay naka-enable ang detalyadong pag-log ng pipeline noong naitala ang request. Kapag naka-disable ang `includeBodies`, o kapag nawawala, sira, o na-truncate ang JSON ng client snapshot, walang header attribute na inilalabas. Maaaring maiwasan ng pagtaas ng `maxBodyBytes` ang pag-truncate ng snapshot sa oras ng export; hindi nito maibabalik ang detalyeng hindi kailanman nai-save. Hindi pinapansin ang snapshot na lampas 1 MiB o naglalaman ng higit sa 256 header entry. Nananatiling naka-enable ang kasalukuyang prompt/response export kasabay ng header capture; hindi nagbibigay ang allowlist ng hydration mode na headers-only.

Ang mga napiling value ay nagiging mga OTLP string array na `http.request.header.<full lowercase header name>`, kahit iisang string lamang ang laman. Halimbawa, ang `X-OmniRoute-Meta-Team: example-team` ay nagiging `http.request.header.x-omniroute-meta-team` na may
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Pinananatili ang buong prefix: mga ordinaryong header ang mga ito, nang walang business-field parsing o conversion sa `omniroute.metadata.*` / Langfuse metadata. Hindi binabago ng `langfuseMapping` ang semantics ng header. Ang isang napiling single-valued na `User-Agent` ay nagtatakda rin ng karaniwang scalar na `user_agent.original`. Hindi hinahati ang mga kuwit na nasa loob ng isang value. Pinagsasama ang mga variant ng malaking titik ayon sa pagkakasunud-sunod ng mga naka-save na entry; kapag may isang di-wastong variant, inaalis ang buong header. Inaayos ang mga attribute ayon sa lowercase na pangalan.

Palaging hindi isinasama ang Authorization, Proxy-Authorization, Cookie, Set-Cookie, mga API-key header, mga pangalang naglalaman ng mga marker na auth/token/secret/password/credential, at mga kredensyal ng internal gateway, kahit napili o bahagyang na-mask sa storage. Muling ginagamit ng mga kilalang pattern ng kredensyal ang shared credential detector; inaalis ang mga redaction marker at hindi inilalabas bilang ligtas na value. Mga string at hindi bakanteng string array lamang ang tinatanggap; hindi kino-coerce ang mga numero o object. Binabalewala ang mga di-wastong pangalan, prototype key, control character (maliban sa horizontal tab), at malformed Unicode nang hindi pinapabagsak ang batch o ipinapakita ang nilalaman ng mga ito sa mga error.

Ang bawat span ay kumukuha ng hanggang 32 header, 16 na value bawat header, 4096 UTF-8 byte bawat value, at kabuuang 16384 UTF-8 byte para sa mga nakuhang pangalan at value ng header. Buong inaalis ang mga header na lampas sa sukat o di-wasto; hindi tina-truncate ang mga ito. Ang pagpili ay desisyon ng operator tungkol sa privacy: maaari pa ring maglaman ng personal na data ang mga pangalang mukhang ligtas, at hindi pangkalahatang PII scrubber ang mga limitasyon/detector na ito.

### Mga limitasyon sa delivery

Nililimitahan ang mga request sa 500 span at 4 MiB ng UTF-8 JSON, kabilang ang envelope. Sinusuri ang laki ng bawat pinapayagang span bago ang unang request ng isang cursor batch. Kapag mas malaki sa limitasyon ang isang span, walang bahagi ng batch na iyon ang ipinapadala at nabibigo ito na may gabay na babaan ang `maxBodyBytes`; hindi ito tahimik na inaalis. Ang preflight ay nagtatago lamang ng mga reference ng record at bilang ng byte, at itinatapon ang bawat pansamantalang span/JSON; muling binubuo ang mga span para sa may-bounding na chunk sa halip na magpanatili ng ikalawang serialized na kopya ng batch. Ang HTTP 408/429/5xx, mga network failure, at timeout ay nagkakaroon ng hanggang tatlong pagtatangka, na may exponential backoff na 250/500 ms. Maaaring pahabain ng `Retry-After` na mga segundo o HTTP date ang delay nang hanggang 5 segundo. Agad na nabibigo ang ibang status. Ang OTLP 2xx partial rejection ay nagdudulot din ng error sa halip na kilalanin ang nawawalang span; tinatanggap ang walang laman o wastong JSON acknowledgement, na may 64 KiB na limitasyon sa pagbasa ng response.

Ang mga error ay naglalaman lamang ng mga fact na pagmamay-ari ng exporter: HTTP status, retry class, bilang ng mga pagtatangka at ipinadalang span, o nakapirming wording para sa acknowledgement/network failure. Hindi kailanman kinokopya sa mga error, log, o dashboard ang mga body ng response ng collector, bilang ng partial-success, at mga response header. Hindi ina-acknowledge ang nabigo o bahagyang natanggap na batch: ipinapakita ng destination ang Failing na may status na iyon, nananatili ang cursor sa huling na-acknowledge na batch, at muling ipinapadala ng susunod na run ang parehong row. Patuloy na mabibigo ang mga permanenteng status hanggang maayos ang collector o configuration. Gamitin ang sariling log ng collector para sa mga detalye ng response. Pinananatili ng mga error summary ng call-log ang hiwalay nitong redaction.
Ang `prepare()` ay hindi nagpo-provision ng anuman; ang Test ay eksaktong nagpo-post ng `{"resourceSpans":[]}` at nag-uulat ng HTTP status nang hindi nagsusulat ng call-log span.

Ang mga trace id at span id ay ang unang 32/16 hex digit ng SHA-256 sa `"omniroute.trace\\0" + callLogId` at `"omniroute.span\\0" + callLogId`. Pareho ang id na dala ng mga muling pagpapadala. Hindi ito garantiya ng deduplication: may ilang backend, kabilang ang Langfuse v4 ingestion, na hindi nagde-deduplicate ng mga span na may parehong id. Maaaring muling maipadala ng crash o partial chunk failure ang pinakamarami ay isang hindi na-acknowledge na cursor batch; maaaring ma-duplicate ang buong batch na iyon, hindi lamang ang huling HTTP chunk nito. Isaalang-alang ang tradeoff na ito sa pagpili ng laki ng cursor batch.

### Halimbawa ng Langfuse

I-configure ang mga field na ito para sa self-hosted na Langfuse instance:

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

Buuin nang lokal ang Authorization value bilang Base64 ng literal na string na `public-key:secret-key` (halimbawa, gamit ang `Buffer.from(publicKey + ":" + secretKey).toString("base64")`). Huwag maglagay ng totoong kredensyal sa mga log, screenshot, o issue. Awtomatikong itinatakda ng mapping ang `x-langfuse-ingestion-version: 4`; ibinibigay pa rin ang Authorization sa `headers`.
Parehong gumagamit ang mga header at ang nabuong identity salt ng umiiral na mekanismo para sa mga naka-encrypt na secret field at mga API placeholder; kinakailangan ang `STORAGE_ENCRYPTION_KEY`.

Idinaragdag ng mapping ang generation type/model, mga detalye ng paggamit ng JSON (input/output/total at mga available na
cache key), mga snapshot ng JSON input/output, level na ERROR/DEFAULT, nilinis na status message,
trace name, session id, opsyonal na environment at nafi-filter na
`langfuse.observation.metadata.<key>` para sa provider, hinihinging model, path, combo, pinagmulan
ng cache at status. Ang `langfuse.observation.completion_start_time` ay nasa ISO 8601 sa
simula + TTFT lamang kapag alam ang TTFT at nasa loob ito ng duration. Walang ipinapadalang attribute para sa gastos.

Nalalapat ang mga identity mode sa `langfuse.user.id`:

- `pseudonymous` (default): HMAC-SHA256 ng internal id ng API key gamit ang random na
  32-byte salt para sa bawat destination. Ginagawa ang salt sa paglikha kung wala ito, ine-encrypt
  bilang `identitySalt`, hindi kailanman ibinabalik, at pinananatili sa panahon ng mga pag-edit.
  Hindi kailanman inilalagay ang mga raw key id sa mga span attribute. Ang muling paglikha o pag-rotate
  ng salt ng isang destination ay nagpapalit ng mga identity.
- `keyName`: ang naka-configure na pangalan ng API key, na sadyang naglalantad ng label ng operator.
- `none`: walang user id. Ine-export pa rin ang mga session tag kapag mayroon; hindi ina-anonymize
  ng mga mode na ito ang arbitraryong prompt content o mga session/correlation label na ibinigay ng operator.

### Pagsisimula nang walang backfill

Sa paglikha lamang, paganahin ang **Magsimula sa kasalukuyang posisyon (laktawan ang mga umiiral na log)** o ipasa ang
`startFromCurrentPosition: true` sa top level ng create API payload. Inisyalisa nito ang
`cursor_row_id` sa kasalukuyang maximum na retained call-log rowid gamit ang mga umiiral na cursor
helper, nang walang migration. Ang default ay false (cursor 0 at backfill ng retained history).
Hindi ito setting para sa pag-reset ng cursor sa oras ng update.

Ang ibinahaging pagdaragdag ng `ttftMs` ay nagdaragdag din ng nullable na `ttft_ms` column sa BigQuery mapper
at sa new-table schema: hinihingi ng schema test nito na ang bawat canonical record field ay may
column. Patuloy na nag-e-export nang hindi nagbabago ang mga umiiral na table: binabasa ng `prepare()` ang table schema
at inaalis lamang ang `ttft_ms` kapag wala ang column na iyon. Idagdag ang nullable na INT64 column para makuha ang TTFT
sa susunod na run, o gumamit ng bagong table. Hindi nagti-trigger ng schema update ang opsyonal na TTFT column. Ang mga column para sa ebidensiya ng paggamit
ay sumusunod sa conditional, opt-in compatibility flow sa ibaba; nananatiling mahigpit ang schema checking para sa iba pang row field.

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

- **Dashboard**: Mga Integrasyon → Pag-export ng log. Magdagdag ng destinasyon, isagawa ang **Subukan** upang suriin ang mga kredensyal
  nang hindi nagsusulat ng mga row, pagkatapos ay paganahin ito.
- **Backlog**: ipinapakita ng bawat card ng destinasyon ang mga nakabinbing row at ang cursor; `GET
/api/log-export/status` ay nagbabalik ng parehong mga numero kasama ang huling 20 pagtakbo ng job.
- **Hindi pinapabagsak ng bagsak na destinasyon ang iba** — itinatala ng buod ng pagtakbo ang status ng bawat destinasyon sa `last_status` / `last_error`, at pinananatili ng kasaysayan ng pagtakbo ng job ang pinagsama-samang resulta.
- **Ang pagtanggal ng destinasyon ay nagtatanggal ng cursor nito.** Kapag muli itong idinagdag, magsisimula ito sa pinakamatandang natitirang call log, kaya muli nitong ipapadala ang mga row na maaaring nasa destinasyon na. Sa BigQuery, sinasalo lamang ng bawat-row na `insertId` ang ganitong duplicate sa loob ng sariling window ng pag-deduplicate ng BigQuery, kaya mas mainam na huwag paganahin ang isang destinasyon kaysa tanggalin ito.

### Pagkakatugma ng schema para sa ebidensiya ng paggamit

Kasama sa mga bagong talahanayan ng BigQuery ang nullable na `usage_evidence` (STRING na naglalaman ng JSON) at
`usage_estimated` (BOOL). Kapag naka-enable ang `autoCreate`, maaari lamang makatanggap ang isang umiiral na talahanayan ng
mga nawawalang nullable na column na ito. Pinananatili ng exporter ang buong umiiral na
schema, kasama ang metadata ng field, at nagsusumite ng conditional PATCH gamit ang ibinalik na etag. Nabibigo ang pag-export kapag may kasabay na pagbabago sa schema sa halip na ma-overwrite
ito; babasahin muli ng susunod na pagtakbo ang talahanayan.

Kapag naka-disable ang `autoCreate`, idagdag mismo ang mga column na ito bago mag-export ng mga record
na may ebidensiya ng paggamit. Pinipigilan din ng nawawalang metadata ng schema/etag o ng nabigong update ang mga insert na may ebidensiya. Hindi sumusulong ang export cursor kapag nangyari ang pagkabigong iyon at hindi kailanman tahimik na itinatapon ang ebidensiya. Patuloy pa ring nalalapat ang lokal na retention ng log habang naka-block ang isang export, kaya lutasin ang pagkabigo bago mag-expire ang mga source row na nasa retention.
