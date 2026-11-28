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

- **Jadawalin** — daya `JobRegistry` cron job, `log_export`, sabawa zuwa `0 * * * *` (sa'a, UTC). Rajista a `src/lib/initCloudSync.ts`; m tare da `OMNIROUTE_LOG_EXPORT_CRON`. Kowane kaska yana magudana kowane** kunna** makoma, bi da bi.
- **Cursor** — SQLite ta fayyace `call_logs.rowid`, ya dage a kowace manufa a cikin `log_export_destinations.cursor_row_id`. `timestamp` ba da gangan ba ne siginan kwamfuta: masu kira za su iya ba da ƙimar kansu, don haka za a iya rubuta buƙatun jinkiri bayan wanda ya fara sauri daga baya, kuma siginan lokaci na lokaci zai tsallake shi.
- **Batching** layuka — `batch_size` a kowane buƙatu (tsoho 500), layin `max_rows_per_run` a kowace gudu (default 10000) don haka babban maƙallan baya yana magudana akan ticks da yawa maimakon toshe ɗaya.
- **Bayarwa** — mai siginar ya ci gaba ne kawai bayan `send()` ya warware. Batch ɗin da bai yi nasara ba yana barin siginan kwamfuta inda yake, don haka ana sake gwada layuka iri ɗaya akan gudu na gaba. Garanti shine aƙalla-sau ɗaya tare da kwafin-gefen-gefen, ba gaskiya bane sau ɗaya: maɓallan BigQuery kowane jere ta ID ɗin kira, wanda yake girmamawa akan ingantaccen ƙoƙari a cikin taga da aka raba.
- **Mai gadi zoba** — cron tick da `POST .../run` na iya yin harbi tare. An tsallake wurin da aka riga an yi magudanar ruwa maimakon a zubar da shi sau biyu (`skipped: true` a cikin sakamakon gudu), don haka gudu na lokaci ɗaya ba zai iya sake aika tsari ba ko rubuta siginan kwamfuta a baya.
- **Share farfadowa** — idan `cursor_row_id` ya ƙare sama da `MAX(rowid)` (an wanke tebur gabaɗaya kuma an sake kunna layuka), mai gudu ya koma 0 maimakon ya makance na dindindin.

### Keɓe mai gudu da iyaka

Kowane wurin da ke gudana akan Node yana farawa daban, tsarin OS na ɗan gajeren lokaci (`child_process` tare da IPC, ba `worker_threads`). Jiki yana karantawa, zazzagewa JSON parsing/serialization, `prepare()` manufa da cibiyar sadarwa I/O duk suna gudana a wurin, ba akan madauki na taron uwar garken ba. Sai kawai daidaitawa da ƙananan saƙonnin ci gaba sun haye IPC; bayanan da aka fitar ba su dawo zuwa uwar garken ba. Aikin cron da Gudu yanzu hanya tana kiyaye sakamakon jama'a iri ɗaya da gadi zoba.

Yaron yana buɗe uwar garken warware `DATA_DIR/storage.sqlite` karanta-kawai ta amfani da `node:sqlite`, tare da `busy_timeout=5000` da `query_only=ON`. Yana shigo da babu DB singleton kuma baya yin ƙaura, madadin ko sabunta SQLite. lissafin kayan tarihi Missing/corrupt (gami da gurɓataccen kayan aikin UPDATE) ya rage a cikin dashboard ɗin hanyar dalla-dalla kawai. Dukansu hanyoyi suna raba tsaftataccen mai warwarewa; fitarwa yana amfani da tsarin fayil ɗin asynchronous karanta da kuma kayan tarihi iri ɗaya → gadon layi → gadon diski → babu wani tsari na ƙuduri. Gudu yana ɗaukar matsakaicin matsakaicin layin saka lokacin da yaro ya buɗe karatunsa; daga baya sakawa jira na gaba gudu. Wannan iyaka ce ta sakawa, ba ma'amalar SQLite mai tsawo ba: marubutan WAL da wuraren bincike suna kasancewa kyauta yayin jiran hanyar sadarwa. ba a daskarar da Updates/deletions na layuka da ake da su ta wannan iyaka.

Bayan kowane rukunin da aka karɓa, yaron yana jiran sanarwa. Sabar ta fara dage siginan kwamfuta da `advanceLogExportCursor`, sannan ta aika da `ack`; babu wani rukuni na gaba da zai fara kafin shi. Rashin gazawar aika, karo ko ƙarewar lokaci yana rikodin gazawar ba tare da haɓaka wannan rukunin ba. Batches da aka yarda da su a baya sun kasance masu himma; a mafi yawan abin da ba a san shi ba za a iya sake aikawa. Ana yin rikodin nasara ne kawai bayan `done` da fitar da yaro mai tsabta. Rashin gazawa yana ƙare yaron da SIGTERM, yana ƙaruwa zuwa SIGKILL bayan 500 ms, kuma mai gudu yana jiran rufewar tsari.

| Canjin yanayi                                 | Tsohuwar | Manufar                                    |
| --------------------------------------------- | -------- | ------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Iyakar bangon agogon kowane-wuri           |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Yaro V8 iyakar sararin samaniya a cikin MB |

ƙimar Invalid/non-positive/non-integer suna amfani da abubuwan da ba a so. Saitin tarin ba jimlar RSS ba ne; Manya-manyan batches har yanzu suna iya kawar da ƙwaƙwalwar yara kuma su kasa gudu cikin aminci. Tsohuwar 1024 MB tana barin ɗakin kai don tsohowar jeri 500 na kayan tarihi na 512 KiB tare da kunna jikin, gami da jeri na BigQuery's byte-chunked JSON. Ba ya sanya rukunin jikkuna mai jere 10000 lafiya. Rashin gajiyar tudu na V8 yana rikodin gazawar da za a iya aiwatarwa: ƙaramin tsari ko haɓaka `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; siginan kwamfuta ya tsaya a ƙarshen da aka yarda da shi. Jikin inline/disk na tarihi ba su rufe da hular kayan tarihi na zamani. Masu aiki dole ne su tsara kasafin RSS daban, musamman a cikin kwantena masu iyakacin ƙwaƙwalwar ajiya.

Yaron ya gaji `DATA_DIR` da aka warware kawai , `NODE_ENV`, `TZ` bayyananne (ƙaddamar da sunan gado na gida), `ELECTRON_RUN_AS_NODE` lokacin da yake nan, da abubuwan shigarwa masu zuwa: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (da ƙananan siffofinsu), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Mai aikawa da Undici na duniya yana raba tsaftataccen mahalli na uwar garke-ƙudurin wakili da ƙa'idodin kewayawa na gida, gami da `NO_PROXY`; ba ya shigo da `proxyFetch.ts` ko tutocinsa na DB/feature. Ana cire takaddun shaidar wakili daga fitarwa da aka tura da kurakurai da aka yi rikodi. Takaddun shaida suna tafiya ne kawai a farkon saƙon IPC ɗaya, ba a taɓa argv ko muhalli ba; tura output/error an riga an tsara shi kuma an tsabtace shi. `ExperimentalWarning` ne kawai aka kashe a cikin muhawarar exec na yara don guje wa maimaita SQLite na Node na gargaɗin kowane cron gudu; sauran nau'ikan gargaɗin sun kasance a bayyane.

Dole ne samfuran hanyar zuwa su kasance masu shigo da su ba tare da dogaro da Next.js/server-only ba. Aiwatar da BigQuery ɗin da ke akwai ya riga ya cika waccan kwangilar. Caches-token yana dawwama don gudun yaro kawai, ba a kan gudu ba. Node shine lokacin aiki mai goyan baya (injunan `package.json` ). Mafi kyawun ƙoƙari, hanyar dacewa Bun mara goyan baya akwai (`bun:sqlite` a cikin `src/lib/db/core.ts` / adaftar, da `Dockerfile.bun`), don haka fitarwa dole ne ya karye a ƙarƙashinsa. Karkashin Bun, fitar da kaya zuwa kasashen waje yana riƙe hanyar da ta gabata a cikin aiwatarwa kuma tana fitar da gargaɗin lokaci ɗaya: babu keɓewar heap/timeout na yaro. Yi amfani da Node don madauki na taron da keɓewar OOM.

Lokacin da aka kunna `includeBodies`, fi son matakin matakin minti ɗaya kamar `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` maimakon tara bayanan dawo da kaya na sa'a. Matsakaicin tsari da iyakokin jere har yanzu suna daure kowane gudu. Ana biyan farawa tsarin kowane makoma ta gudu; wannan yana cinikin ɗan ƙaramin farashin farawa don keɓewar taron madauki na uwar garken, ba a rage yawan amfani da CPU ba.

### Abubuwan da aka biya (sarrafa da kammalawa)

Ta tsohuwa fitarwa tana ɗaukar filayen taƙaice kawai Logs** jeri** nuna. Kunnawa** Fitar da tsokaci da martani** (`includeBodies`) kuma suna jigilar abin da logs** daki-daki** Rubutun yana nuna kowane kira:

| Filin                            | Abin da ya rike                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Kiran yana ɗaukar kaya yayin da dashboard ɗin ke sanya su                         |
| `pipeline_route_decision`        | Wanne manufa da samfurin na'ura mai ba da hanya tsakanin hanyoyin sadarwa ya zaba |
| `pipeline_client_request`        | Buƙatun ɗanyen daidai kamar yadda abokin ciniki ya aiko shi                       |
| `pipeline_openai_request`        | Bayan fassara zuwa siffar OpenAI ta ciki                                          |
| `pipeline_provider_request`      | Kamar yadda a zahiri aika sama, a cikin yaren mai bayarwa                         |
| `pipeline_provider_response`     | Amsa danye na sama                                                                |
| `pipeline_client_response`       | Me aka mayar wa mai kiran                                                         |
| `pipeline_error`                 | Dalla-dalla kuskuren matakin bututu don kiran da bai yi nasara ba                 |
| `bodies_truncated`               | Gaskiya ne lokacin da kowane filin da ke sama ya buga `maxBodyBytes`              |

Wannan abun cikin gaggawa ne, haka yake** kashe ta tsohuwa** kuma da gangan zaɓin makoma. Abin da jirgin ruwa shi ne abin da dashboard ya nuna, saboda fitarwa da `getCallLogById` suna raba ƙuduri dalla-dalla: an riga an cire kayan aikin PII kuma an cire su a asirce lokacin da aka rubuta su, kuma kiran da aka yi tare da maɓalli na `noLog` API ba a adana kaya ba kwata-kwata, don haka babu wani abu don fitarwa.

Ana karanta abubuwan biyan kuɗi a jere daga kayan aikin tsarin fayil, don haka ruwa yana gudana ne kawai don wuraren da ya nemi sa. Wani ɓoyayyen kayan tarihi da ya ɓace ko ɓarna yana fitar da taƙaitaccen bayanin sa tare da kayan aikin da ba shi da amfani maimakon gazawar tsari da kuma ɗaure siginan kwamfuta.

`maxBodyBytes` (default 262144) ya cika kowane filin. Dogayen kaya masu yawa** yanke maimakon faduwa** — wani guntuwar faɗakarwa har yanzu yana amsa "abin da aka tambaya" — kuma layin yana da alamar `bodies_truncated`. Ba a fitar da magudanar ruwa-da-chunk deltas; Amsar da aka haɗa ta riga ta kasance a cikin `pipeline_provider_response` da `pipeline_client_response`.

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

## 4. Wurin tura bayanai na BigQuery

Maɓallan daidaitawa (`type: "bigquery"`):

| Maɓalli              | Bayani                                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Aikin GCP da ke ɗauke da dataset                                                                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                  |
| `location`           | Ana amfani da shi ne kawai lokacin da ake buƙatar ƙirƙirar dataset (tsoho `EU`)                                  |
| `serviceAccountJson` | Maɓallin asusun sabis. Sirri: ana ɓoye shi yayin ajiya, ba a taɓa mayar da shi ba                                |
| `autoCreate`         | Ƙirƙiri dataset/table da ba su wanzu ba; ƙara ginshiƙan shaidar amfani masu nullable bisa sharadi (tsoho `true`) |

Asusun sabis ɗin yana buƙatar `bigquery.tables.updateData` a kan teburin da ake nufi, sannan
`bigquery.datasets.create` / `bigquery.tables.create` idan `autoCreate` yana kunne.
Sabunta teburin da yake akwai domin ƙara filayen shaidar amfani guda biyu masu nullable kuma yana buƙatar
`bigquery.tables.update`. Rashin izini guda ɗaya yana dakatar da fitar da bayanai ba tare da ciyar da cursor ɗinsa gaba ba.

Batch da aka saita raka'a ce ta **cursor**, ba ta HTTP ba: `send()` yana raba shi zuwa kiran insertAll
wanda kowannensu bai wuce layuka 500 ba, don haka babban `batch_size` ba zai iya karya iyakar buƙatar BigQuery ta 10 MB ba.
Ana sake gwada matsayin wucin-gadi (408/429/500/502/503/504) har sau uku tare da ƙarin tazarar lokaci a jere,
ana sake amfani da insertIds iri ɗaya; kurakuran tantancewa da na tsari suna jefa kuskure a yunƙurin farko
maimakon cinye aikin.

Teburin da aka ƙirƙira yanzu-yanzu ba ya bayyana ga wurin karɓar streaming nan take, wanda ke mayar da
404 na ƴan daƙiƙu. Ana sake gwada wannan 404, amma **kawai idan wannan gudu ne ya ƙirƙiri teburin** —
teburin da bai wanzu da gaske ba har yanzu yana kasa da sauri. Ka lura cewa sake ƙirƙirar tebur da suna
da aka share kwanan nan yana sa BigQuery ya ƙi streaming inserts na mintuna da dama; wannan halin
sakamakon sharewa-sannan-sake-ƙirƙira ne, don haka ka fi son sabon sunan tebur maimakon sharewa da sake ƙara shi.

**Rashin nasara na wani ɓangare yana zuwa a matsayin HTTP 200 tare da `insertErrors[]` da ba komai ba.** Ana ɗaukar
hakan a matsayin kuskure kuma a jefa shi, wanda shi ne ke hana cursor wuce layukan da BigQuery bai karɓa ba;
`tests/unit/log-export-bigquery.test.ts` yana tabbatar da wannan ɗabi'a.

Hanyar jigilar bayanai ita ce REST kai tsaye — ana musayar tabbacin RS256 da aka sa hannu da kansa don samun
alamar izini a `https://oauth2.googleapis.com/token`, sannan a aika layuka zuwa `tabledata.insertAll`.
Ba a shigar da Google SDK ba. Ana adana alamun izini a cikin aikin yanzu bisa (asusun sabis, scope).

Teburin da aka ƙirƙira yana ɗauke da ginshiƙi ɗaya ga kowane filin shafin Logs tare da `exported_at`, kuma an tsara shi
domin yadda ake bincika rajistan kiran waya a zahiri:

- **An raba shi bisa rana ta `timestamp`**, don haka tambayar da aka iyakance da kwanan wata kawai tana duba waɗannan ranakun.
- **An haɗa shi bisa `api_key_name`, `provider`, `model`, `status`** (a wannan jere), don haka tacewa bisa
  wanda ya gudanar da shi, inda aka aika shi, ko ko ya gaza tana rage tubalan da ake dubawa a cikin kowane bangare. BigQuery
  yana ba da damar ginshiƙan haɗawa guda huɗu kacal, kuma jere yana da muhimmanci: tacewa bisa `api_key_name` kaɗai
  tana rage tubalan da ake dubawa, amma tacewa bisa `status` kaɗai ba ta yin hakan.
- **Riƙe bangare bisa zaɓi** ta hanyar `partitionExpirationDays` (0 yana riƙe komai), ana amfani da shi
  lokacin da aka ƙirƙiri teburin.

Dukkan saitunan biyu ana amfani da su ne a lokacin ƙirƙira. Teburin da yake akwai yana riƙe tsarin da yake da shi,
don haka ka nuna wurin tura bayanai zuwa sabon `tableId` idan kana son amfani da su.

`tests/unit/log-export-bigquery.test.ts` yana tabbatar da cewa mapper da tsarin tebur suna nan daidaitattu,
don haka ba za a iya watsar da sabon ginshiƙin rajistan kiran waya a ɓoye yayin fitar da shi ba.

Ana raba batches bisa **yawan layuka da kuma adadin bytes bayan serialisation**. Yawan layuka kaɗai bai isa ba
da zarar ana fitar da payloads: layuka 500 masu ɗauke da prompts na iya zama megabytes da dama, kuma insertAll
yana ƙin buƙatar da ta wuce 10 MB. Ana rufe chunks a layuka 500 ko 9 MB, duk wanda ya fara faruwa.

---

## 5. Mak destination na OTLP/HTTP traces

Config yana amfani da `type: "otlp-http"`. Wannan fitarwa ce da aka tsara, wadda cursor ke tallafawa, na
rikodin kiran da aka adana, ba sink ɗin best-effort na live routing-event da ke cikin
`open-sse/services/routing/otel.ts` ba. Ba ya karanta ko canza environment
variables, timers ko buffers na wannan sink ɗin. Kunna duka biyun na iya samar da nau'ikan spans biyu masu zaman kansu;
yi amfani da scope na instrumentation na `omniroute.log-export` don bambance waɗannan call-log spans.

| Maɓalli                  | Default / manufa                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `endpoint`               | Cikakkiyar URL ta HTTP(S) ta traces wajibi ce; ba a ƙara suffix na `/v1/traces` ba          |
| `headers`                | Layukan `Name: value` na zaɓi ko JSON object na strings; an ɓoye su                         |
| `requestHeaderAllowlist` | Fanko (a kashe); sunayen/prefixes na client headers da za a kama a matsayin span attributes |
| `serviceName`            | `omniroute`; resource `service.name`                                                        |
| `langfuseMapping`        | `false`; yana ƙara Langfuse generation/session/user attributes                              |
| `identity`               | `pseudonymous`, `keyName`, ko `none`                                                        |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                     |
| `timeoutMs`              | `30000` a kowane HTTP attempt                                                               |
| `environment`            | Ba a saita ba; `langfuse.environment` na zaɓi                                               |

Dashboard na gaba ɗaya yana nuna waɗannan filayen. `paths` yana karɓar API array ko textarea
mai exact paths da aka raba da sabbin layi/commas. Ana tsallake embeddings, rerank da sauran paths
sai dai idan an ba su izini a sarari. Layukan da aka tsallake har yanzu suna ci gaba da cursor; counters na
`exported`/`exportedTotal` na runner ɗin da ke akwai suna ƙirga layukan tushen da aka sarrafa, har da
layukan da aka tace, maimakon spans da aka karɓa. Ana yin filtering a child, ba tare da canza
kwangilar IPC/cursor ɗinsa ba.

Ingantawar URL tana amfani da helper ɗin `parseAndValidateNonMetadataUrl` wanda ba ya buƙatar DB daga
`src/shared/network/outboundUrlGuard.ts`: manufar `block-metadata`. Tana da binciken metadata/protocol/embedded-credential
iri ɗaya na tilas kamar validator na webhook, tare da ba da izinin private URLs, amma da gangan tana
ba da damar targets na localhost/LAN ba tare da override na global feature-flag ba. Wannan yana ba da damar
self-hosted Langfuse, Phoenix, Tempo da Collector endpoints, har da private HTTP endpoints. Cloud-metadata hosts
ana toshe su koyaushe. Ba a bin redirects, don haka collector ba zai iya tura credentials zuwa wani host daban ba.
Kamar lexical URL guard da ke akwai, wannan ba ya kulle DNS resolution; a saita hosts da operator ke sarrafawa kawai.
A fi son HTTPS duk lokacin da endpoint ba ya kan trusted network.

### Payload da isarwa

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) yana ɗauke da CLIENT
span guda ɗaya ga kowane layi da aka yarda, wanda aka sanya masa suna da exact request path ɗinsa. Sanya suna ta path
yana bambance Chat Completions, Responses da Messages ba tare da saka bayanan model ko identity a sunan span ba.
Resource attributes sun haɗa da `service.name` da `service.version` na package.

Mai rubuta chat attempt na yau da kullum (`open-sse/handlers/chatCore/attemptLogging.ts`) yana rubuta
`duration = Date.now() - startTime` a lokacin kammalawa kuma ba ya samar da timestamp;
`saveCallLogOperation` a cikin `src/lib/usage/callLogs.ts` yana saita timestamp ta tsohuwa zuwa lokacin rubutawa
(wato lokacin kammalawa). Saboda haka fitarwa tana saita end = timestamp na row, sannan start = end − duration
(milliseconds, an mayar da su zuwa decimal nanoseconds). Timestamps na tarihi da caller ya bayar
ana kiyaye su a matsayin end time ma; babu bambance-bambancen start/completion ga kowane row.
Null duration yana zama zero. Timestamps marasa inganci/ɓatattu suna sa batch ɗin ya gaza maimakon samar da
spans marasa tabbas. `ttftMs` nullable ne kuma ana mapping ɗinsa zuwa `omniroute.ttft_ms`.

Attributes sun haɗa da `gen_ai.operation.name="chat"`, provider, requested/response model,
input/output tokens, cache-read/cache-creation/reasoning tokens na zaɓi, HTTP status,
combo, cache source, session tag da correlation id. Integer OTLP values da timestamps su ne decimal strings;
strings, booleans da fractional numbers suna amfani da native OTLP value variants ɗinsu. Error spans suna da
ERROR status da sanitized status message. Canonical record ba shi da upstream host URL,
saboda haka ana barin `server.address` ba a saka shi ba maimakon a danganta collector ba daidai ba da model server.
Ba a fitar da cost.

`includeBodies=true` kawai ne ke ɗora content. Idan `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` suna ɗauke da sanitized request/response
body JSON kamar yadda OmniRoute ya adana shi (ana canonicalize shi idan ana iya parse ɗinsa), ba wani
messages array na semconv da aka sake tsara ba. Bodies da aka yanke/waɗanda ba JSON ba suna nan a matsayin raw text.
Idan `langfuseMapping=true`, ana fitar da bodies ne kawai a matsayin `langfuse.observation.input` /
`langfuse.observation.output`; ana cire `gen_ai.*.messages` attributes domin a aika kowanne body sau ɗaya.
Duka modes ɗin suna gadon `maxBodyBytes` daga hydration path da ke akwai;
`omniroute.bodies_truncated=true` yana nuna yanke bayanai.
Wannan destination ba ya ƙara wasu pipeline snapshots ko unsanitized artifact reads;
optional request-header capture yana amfani da hydrated client snapshot da ke akwai wanda aka bayyana a ƙasa.
A yi amfani da cadence na matakin minti kamar `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` yayin fitar da
bodies, maimakon tara backlog na awa ɗaya.

### Client request headers na zaɓi

Kama headers yana **kashe ta tsohuwa**. Saita `requestHeaderAllowlist` a cikin config na destination
kuma kunna **Export prompts and responses** (`includeBodies: true` a destination).
Allowlist ɗin yana karɓar API array ko textarea mai sunaye da aka raba da sabbin layi/commas:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Sunaye suna dacewa ba tare da la’akari da babban/ƙaramin harafi ba kuma daidai, sai dai idan `*` guda ɗaya a ƙarshen suna ya zaɓi prefix mara komai na sunan header. Bare `*`, wildcards da aka saka a tsakiya, da sunayen HTTP header marasa inganci ana ƙi su. Akwai selectors 64 aƙalla, kuma kowanne yana da suna/prefix mai tsawon bai wuce bytes 256 na ASCII ba. Wannan saitin ya bambanta da `headers`, wanda ke tantance exporter ga collector.

Capture yana karanta `pipeline_client_request` kawai, wanda aka cike daga `clientRawRequest` (ko `clientRequest` na tsohon tsarin) na cikakken pipeline da aka adana. Ba ya komawa ga request headers na provider. Dole ne a kunna cikakken pipeline logging lokacin da aka yi rikodin request ɗin. Idan an kashe `includeBodies`, ko JSON na client-snapshot ya ɓace, ya lalace ko aka yanke shi, ba a fitar da siffofin header. Ƙara `maxBodyBytes` na iya hana yanke snapshot a lokacin export; amma ba zai dawo da bayanin da ba a taɓa adanawa ba. Snapshot da ya wuce 1 MiB ko ya ƙunshi fiye da entries 256 na header ana yin watsi da shi. Fitar da prompt/response da ke akwai tana ci gaba tare da header capture; allowlist ba ya samar da yanayin hydration na headers-kawai.

Zaɓaɓɓun ƙimomi suna zama OTLP string arrays na `http.request.header.<full lowercase header name>`, har ma idan string ɗaya ce. Misali, `X-OmniRoute-Meta-Team: example-team` ya zama `http.request.header.x-omniroute-meta-team` tare da
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Ana kiyaye cikakken prefix: waɗannan headers na yau da kullum ne, ba a fassara filayen kasuwanci ko a mayar da su zuwa `omniroute.metadata.*` / Langfuse metadata. `langfuseMapping` ba ya canza ma’anar headers. `User-Agent` mai ƙima guda ɗaya da aka zaɓa yana kuma saita standard scalar `user_agent.original`. Ba a raba waƙafi da ke cikin ƙima guda ɗaya. Bambance-bambancen babban/ƙaramin harafi suna haɗuwa bisa tsarin shigarwar da aka adana; idan kowane bambanci ba shi da inganci, ana cire header ɗin gaba ɗaya. Ana jera attributes bisa ƙaramin harafin suna.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, headers na API-key, sunayen da ke ɗauke da alamomin auth/token/secret/password/credential, da bayanan tantancewa na ciki na gateway ana cire su koyaushe, ko da an zaɓe su ko an rufe wani ɓangare daga cikin su a ma’ajiya. Sanannun tsarin credentials suna sake amfani da shared credential detector; alamomin redaction ana cire su, ba a fitar da su a matsayin amintattun ƙimomi ba. Strings da nonempty string arrays kawai ake karɓa; ba a tilasta lambobi ko objects su zama wani nau’i ba. Sunaye marasa inganci, prototype keys, control characters (ban da horizontal tab), da Unicode marar inganci ana yin watsi da su ba tare da lalata batch ko nuna abin da suke ƙunsa a cikin kurakurai ba.

Kowane span yana ɗaukar headers 32 aƙalla, values 16 ga kowane header, bytes 4096 na UTF-8 ga kowace ƙima, da jimillar bytes 16384 na UTF-8 a duk sunayen headers da ƙimomin da aka kama. Headers masu girma fiye da ƙa’ida ko marasa inganci ana cire su gaba ɗaya, ba a yanke su ba. Zaɓe shawarar sirrin operator ce: sunaye masu kama da aminci na iya har yanzu ƙunsar bayanan mutum, kuma waɗannan iyakoki/detectors ba janar PII scrubber ba ne.

### Iyakokin isarwa

Requests an iyakance su zuwa spans 500 da 4 MiB na JSON na UTF-8, har da envelope. Ana duba girman kowane span da aka yarda da shi kafin request na farko na cursor batch. Idan wani span guda ya fi iyakar girma, ba a aika wani ɓangare na wannan batch kuma aikin yana ƙarewa tare da umarnin rage `maxBodyBytes`; ba a zubar da shi a ɓoye ba. Preflight yana riƙe references na records da ƙididdigar bytes kawai, yana watsar da kowane span/JSON na wucin gadi; ana sake gina spans don bounded chunks maimakon riƙe wani kwafin batch da aka serialize. HTTP 408/429/5xx, gazawar network da timeouts suna samun yunƙurin aƙalla uku, tare da exponential backoff na 250/500 ms. `Retry-After` seconds ko ranakun HTTP na iya tsawaita jinkiri har zuwa seconds 5. Sauran statuses suna ƙarewa nan take. OTLP 2xx partial rejection ma yana jefa kuskure maimakon amincewa da span da ya ɓace; empty ko ingantaccen JSON acknowledgements ana karɓa, tare da iyakar karanta response na 64 KiB.

Kurakurai suna ƙunsar bayanan da exporter ya mallaka kawai: HTTP status, ajin retry, adadin yunƙuri da spans da aka aika, ko tsayayyen wording na acknowledgement/network failure. Ba a taɓa kwafe response bodies na collector, ƙididdigar partial-success da response headers zuwa kurakurai, logs ko dashboard ba. Batch da ya gaza ko aka karɓa wani ɓangare ba a amince da shi: destination yana nuna Failing tare da wannan status, cursor yana nan a batch na ƙarshe da aka amince da shi, kuma run na gaba zai sake aika rows ɗin nan. Permanent statuses suna ci gaba da gazawa har sai an gyara collector ko configuration. Yi amfani da logs na collector kansa don cikakkun bayanan response. Takaitattun kurakuran call-log suna riƙe redaction nasu daban.
`prepare()` ba ya samar da komai; Test yana aika daidai `{"resourceSpans":[]}` kuma yana bayar da rahoton HTTP status ba tare da rubuta call-log spans ba.

Trace ids da span ids su ne hex digits 32/16 na farko na SHA-256 bisa
`"omniroute.trace\\0" + callLogId` da `"omniroute.span\\0" + callLogId`. Sake aikawa yana ɗauke da ids iri ɗaya. Wannan ba garantin deduplication ba ne: wasu backends, har da Langfuse v4 ingestion, ba sa deduplicate spans masu id iri ɗaya. Crash ko gazawar partial chunk na iya sake aika cursor batch guda ɗaya da ba a amince da shi ba aƙalla; ana iya maimaita wannan batch gaba ɗaya, ba HTTP chunk na ƙarshe kaɗai ba. Zaɓi girman cursor batch tare da la’akari da wannan musayar fa’ida da haɗari.

### Misalin Langfuse

Saita waɗannan filayen don Langfuse instance da aka self-host:

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

Gina ƙimar Authorization a gida a matsayin Base64 na literal `public-key:secret-key`
string (misali ta amfani da `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Kada a liƙa credentials na gaske a logs, screenshots ko issues. Mapping ɗin yana saita
`x-langfuse-ingestion-version: 4` ta atomatik; har yanzu ana samar da Authorization a cikin `headers`.
Dukkan headers da generated identity salt suna amfani da tsarin encrypted secret-field mechanism da API placeholders da ke akwai; ana buƙatar `STORAGE_ENCRYPTION_KEY`.

Taswira tana ƙara nau'in/ƙirar ƙirƙarawa, bayanan amfani da JSON (shigarwa/fitarwa/jimilla da maɓallan cache da ake da su), hotunan JSON na shigarwa/fitarwa, matakin ERROR/DEFAULT, saƙon matsayi da aka tsabtace, sunan trace, id ɗin zaman, da zaɓin yanayi da kuma
`langfuse.observation.metadata.<key>` da za a iya tacewa don mai samarwa, ƙirar da aka nema, hanya, haɗi, tushen cache da matsayi. `langfuse.observation.completion_start_time` ISO 8601 ne a lokacin farawa + TTFT kawai idan an san TTFT kuma yana cikin tsawon lokacin. Ba a aika sifofin kuɗi.

Yanayin identity suna aiki da `langfuse.user.id`:

- `pseudonymous` (tsoho): HMAC-SHA256 na id ɗin cikin gida na maɓallin API tare da gishirin byte 32 na bazuwar da keɓe ga kowace makoma. Ana samar da gishirin lokacin ƙirƙira idan babu shi, ana ɓoye shi a matsayin `identitySalt`, ba a taɓa mayar da shi ba, kuma ana riƙe shi yayin gyare-gyare. Ba a taɓa saka ɗanyen id ɗin maɓalli cikin sifofin span ba. Sake ƙirƙira ko jujjuya gishirin makoma yana canza identities.
- `keyName`: sunan maɓallin API da aka tsara, wanda da gangan yake bayyana wannan lakabin ma'aikaci.
- `none`: babu user id. Har yanzu ana fitar da alamun zaman idan suna nan; waɗannan yanaye-yanayen ba sa ɓoye kowane irin abun ciki na prompt ko alamun zaman/haɗa da ma'aikaci ya bayar.

### Farawa ba tare da backfill ba

A lokacin ƙirƙira kawai, kunna **Fara daga matsayi na yanzu (tsallake rajistan ayyukan da ake da su)** ko aika
`startFromCurrentPosition: true` a matakin sama na bayanan buƙatar API na ƙirƙira. Yana saita
`cursor_row_id` zuwa matsakaicin rowid na rajistan kiran da aka riƙe a yanzu ta amfani da mataimakan cursor da ake da su, ba tare da ƙaura ba. Tsohon ƙima ita ce false (cursor 0 da backfill na tarihin da aka riƙe).
Ba saitin sake saita cursor ba ne na lokacin sabuntawa.

Ƙarin `ttftMs` na gama-gari yana ƙara ginshiƙin `ttft_ms` mai nullable ga mapper na BigQuery
da tsarin sabon tebur: gwajin tsarin yana buƙatar kowane filin rikodin canonical ya sami ginshiƙi. Teburorin da ake da su suna ci gaba da fitarwa ba tare da canji ba: `prepare()` yana karanta tsarin tebur kuma yana cire `ttft_ms` kawai idan wannan ginshiƙin ba ya nan. Ƙara ginshiƙin INT64 mai nullable don samun TTFT
a gudu na gaba, ko amfani da sabon tebur. Ginshiƙin TTFT na zaɓi ba ya jawo sabunta tsarin. Ginshiƙan shaidar amfani
suna bin tsarin dacewa na sharadi, na zaɓi, da aka bayyana a ƙasa; sauran filayen layi suna riƙe tsauraran binciken tsarin.

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

## 7. Aiki da shi

- **Dashboard**: Haɗin kai → Fitar da log. Ƙara wurin aika bayanai, gudanar da **Test** don duba bayanan tantancewa
  ba tare da rubuta layuka ba, sannan kunna shi.
- **Abubuwan da suka taru**: katin kowane wurin aika bayanai yana nuna layukan da suke jira da alamar ci gaba; `GET
/api/log-export/status` yana dawo da adadin iri ɗaya tare da gudanarwar ayyuka 20 na ƙarshe.
- **Gazawar wani wurin aika bayanai ba ta sa sauran su gaza ba** — taƙaitaccen sakamakon gudanarwa yana adana
  matsayi na kowane wurin aika bayanai a cikin `last_status` / `last_error`, kuma tarihin gudanarwar aiki yana riƙe da jimillar.
- **Share wurin aika bayanai yana share alamar ci gabansa.** Sake ƙarawa yana farawa daga tsohon
  log ɗin kira da aka adana, wanda ke sake aika layukan da wurin aika bayanan ya riga ya mallaka. A BigQuery, `insertId` na kowane layi yana hana
  maimaitawa ne kawai a cikin wa’adin BigQuery na kansa na gano kwafi, saboda haka an fi son kashe
  wurin aika bayanai maimakon share shi.

### Daidaituwar tsarin shaidar amfani

Sabbin teburin BigQuery sun haɗa da `usage_evidence` mai iya zama babu (STRING mai ɗauke da JSON) da
`usage_estimated` (BOOL). Idan an kunna `autoCreate`, teburin da yake akwai zai iya karɓar
waɗannan ginshiƙai masu iya zama babu da suka ɓace kawai. Mai fitarwa yana kiyaye cikakken tsarin
da yake akwai, har da bayanan filaye, sannan yana aika PATCH mai sharaɗi ta amfani da etag da aka dawo da shi. Canjin tsarin da aka yi a lokaci guda yana sa fitarwar ta gaza maimakon ta maye gurbin
shi; gudanarwa na gaba zai sake karanta teburin.

Idan an kashe `autoCreate`, ƙara waɗannan ginshiƙai da kanku kafin fitar da bayanan da ke ɗauke da shaidar amfani. Rashin metadata na tsarin/etag ko sabuntawa da ya gaza shima yana hana saka bayanan da ke ɗauke da shaida. Alamar ci gaban fitarwar ba ta ci gaba a wannan gazawar ba, kuma ba a taɓa zubar da shaidar a ɓoye ba. Adana log na cikin gida har yanzu yana aiki yayin da aka toshe fitarwa, don haka a warware gazawar kafin layukan tushen da aka adana su ƙare.
