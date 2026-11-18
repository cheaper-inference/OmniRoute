# Log export (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Uhamishaji endelevu wa kumbukumbu za miito ya OmniRoute kwa nyongeza kwenda kwenye hifadhi ya nje ya uchanganuzi.

Kichupo cha Logs kwenye dashibodi huhifadhi historia ya maombi katika SQLite (`call_logs`), ambayo inawekewa mipaka na
mzunguko wa kumbukumbu na muda wa kuzihifadhi. Uhamishaji wa kumbukumbu hutuma rekodi hizohizo kwa ratiba ili ziweze kudumu zaidi ya
hifadhidata ya ndani na kuunganishwa na data nyingine. BigQuery ndiyo lengwa la kwanza;
mfumo wa uchakataji hutumia rejista, hivyo malengwa mengine yanaweza kuongezwa.

---

## 1. Jinsi unavyofanya kazi

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Ratiba** — kazi moja ya cron ya `JobRegistry`, `log_export`, yenye thamani chaguomsingi ya `0 * * * *` (kila saa,
  UTC). Imesajiliwa katika `src/lib/initCloudSync.ts`; inaweza kubadilishwa kwa `OMNIROUTE_LOG_EXPORT_CRON`.
  Kila kichocheo cha ratiba huchakata rekodi zote zinazosubiri kwa kila lengwa **lililowezeshwa**, moja baada ya jingine.
- **Kielekezi** — `call_logs.rowid` ya SQLite inayopatikana kiotomatiki, inayohifadhiwa kwa kila lengwa katika
  `log_export_destinations.cursor_row_id`. Kwa makusudi, `timestamp` si kielekezi: waitaji
  wanaweza kutoa thamani yao wenyewe, hivyo ombi la polepole linaweza kuandikwa baada ya ombi la haraka zaidi lililoanza
  baadaye, na kielekezi cha muhuri wa muda kingeliruka.
- **Makundi** — safu `batch_size` kwa kila ombi (chaguomsingi 500), safu `max_rows_per_run` kwa kila utekelezaji
  (chaguomsingi 10000) ili rekodi nyingi zinazosubiri zichakatwe katika vichocheo kadhaa vya ratiba badala ya kuzuia kimoja.
- **Uwasilishaji** — kielekezi husonga mbele tu baada ya `send()` kukamilika kwa mafanikio. Kundi lililoshindwa huacha
  kielekezi pale kilipokuwa, hivyo safu hizohizo hujaribiwa tena katika utekelezaji unaofuata. Dhamana ni
  uwasilishaji angalau mara moja pamoja na kuondoa nakala rudufu upande wa lengwa, si uwasilishaji halisi wa mara moja tu: BigQuery huweka ufunguo wa kila
  safu kwa kutumia kitambulisho cha kumbukumbu ya mwito, ambacho hukizingatia kadiri iwezekanavyo ndani ya kipindi chake cha kuondoa nakala rudufu.
- **Kinga ya mwingiliano** — kichocheo cha cron na `POST .../run` vinaweza kuanzishwa pamoja. Lengwa
  ambalo tayari linachakatwa hurukwa badala ya kuchakatwa mara mbili (`skipped: true` katika matokeo ya utekelezaji),
  hivyo utekelezaji sambamba hauwezi kutuma kundi tena au kurudisha kielekezi nyuma.
- **Urejeshaji baada ya kufuta data yote** — ikiwa `cursor_row_id` itakuwa juu ya `MAX(rowid)` (jedwali lote
  lilifutwa na rowid zikaanza upya), kiendeshaji hurudisha kielekezi hadi 0 badala ya kushindwa kabisa kuona rekodi mpya.

### Kiendeshaji kilichotengwa na mipaka

Kila utekelezaji wa lengwa kwenye Node huanzisha mchakato tofauti wa mtoto wa mfumo endeshi unaodumu kwa muda mfupi (`child_process`
wenye IPC, si `worker_threads`). Usomaji wa miili, uchanganuzi/ubadilishaji wa data ya JSON, `prepare()`
ya lengwa na ingizo/tokeo la mtandao la lengwa vyote hutekelezwa humo, si kwenye kitanzi cha matukio cha seva.
Mipangilio na ujumbe mdogo wa maendeleo pekee ndivyo hupitia IPC; rekodi zilizohamishwa hazirudi
kwenye seva kamwe. Kazi ya cron na njia ya Run now huhifadhi matokeo yaleyale yanayoonekana kwa umma na kinga ya mwingiliano.

Mchakato wa mtoto hufungua `DATA_DIR/storage.sqlite` iliyobainishwa na seva kwa usomaji tu kwa kutumia `node:sqlite`,
ikiwa na `busy_timeout=5000` na `query_only=ON`. Hauingizi singleton yoyote ya DB wala kufanya
uhamishaji wa muundo, nakala rudufu au masasisho ya SQLite. Utunzaji wa taarifa za vizalia vinavyokosekana/vilivyoharibika (ikiwemo
UPDATE ya kizalia kilichoharibika) hubaki kwenye njia ya maelezo ya dashibodi pekee. Njia zote mbili hutumia kitatuzi kimoja safi cha
maelezo; uhamishaji hutumia usomaji wa mfumo wa faili usiolandanifu na mpangilio uleule wa utatuzi wa kizalia → data ya zamani
iliyopachikwa → data ya zamani kwenye diski → hakuna. Utekelezaji huchukua picha ya rowid ya juu zaidi ya uingizaji
wakati mchakato wa mtoto unapofungua kisomaji chake; rekodi zinazoongezwa baadaye husubiri utekelezaji unaofuata. Huu ni mpaka wa
uingizaji, si muamala wa SQLite unaodumu kwa muda mrefu: waandishi wa WAL na sehemu za ukaguzi hubaki huru wakati wa
kusubiri mtandao. Masasisho/ufutaji wa safu zilizopo hauzuiwi na mpaka huu.

Baada ya kila kundi kukubaliwa, mchakato wa mtoto husubiri uthibitisho. Seva kwanza huhifadhi
kielekezi kwa `advanceLogExportCursor`, kisha hutuma `ack`; hakuna kundi linalofuata linaloanza kabla ya hapo.
Hitilafu ya kutuma, kuanguka au kuisha kwa muda hurekodi kushindwa bila kusogeza kielekezi kwa kundi hilo. Makundi
yaliyothibitishwa awali hubaki yamehifadhiwa; kwa kiwango cha juu, ni kundi moja tu ambalo halijathibitishwa linaloweza kutumwa tena.
Mafanikio hurekodiwa tu baada ya `done` na mchakato wa mtoto kuondoka bila hitilafu. Hitilafu husitisha mchakato wa mtoto
kwa SIGTERM, na hatua hiyo kupandishwa hadi SIGKILL baada ya milisekunde 500, huku kiendeshaji kikisubiri mchakato ufungwe.

| Kigezo cha mazingira                          | Chaguomsingi | Kusudi                                                 |
| --------------------------------------------- | ------------ | ------------------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000       | Kikomo cha muda halisi kwa kila lengwa                 |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024         | Kikomo cha old-space ya V8 ya mchakato wa mtoto kwa MB |

Thamani zisizo halali/zisizo chanya/zisizo nambari kamili hutumia chaguomsingi. Mpangilio wa heap si kikomo cha
jumla cha RSS; makundi makubwa sana bado yanaweza kumaliza kumbukumbu ya mchakato wa mtoto na kusababisha utekelezaji kushindwa kwa usalama.
Chaguomsingi la MB 1024 huacha nafasi ya ziada kwa kundi chaguomsingi la safu 500 za vizalia vya KiB 512 huku
miili ikiwa imewezeshwa, ikiwemo ubadilishaji wa JSON wa BigQuery unaogawanywa katika vipande vya baiti. Haufanyi kundi
la safu 10000 lenye miili kuwa salama. Kuisha kwa heap ya V8 hurekodi hitilafu yenye hatua ya kuchukua: punguza ukubwa
wa kundi au ongeza `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kielekezi hubaki kwenye kundi la mwisho
lililothibitishwa. Miili ya kihistoria iliyopachikwa/iliyo kwenye diski haijumuishwi katika kikomo cha kisasa cha vizalia.
Waendeshaji lazima wapangie RSS kando, hasa ndani ya kontena zenye kumbukumbu iliyowekewa kikomo.

Mchakato mtoto hurithi tu `DATA_DIR` iliyotatuliwa, `NODE_ENV`, `TZ` iliyowekwa wazi (utatuzi wa saa
za ndani kwa majina ya faili ya mfumo wa zamani), `ELECTRON_RUN_AS_NODE` inapokuwepo, na ingizo zifuatazo za miunganisho inayotoka:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (pamoja na matoleo yake ya herufi ndogo),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Kisambazaji cha kimataifa cha Undici kinatumia utatuzi uleule wa seva wa proksi unaotegemea mazingira pekee na kanuni za
kupita proksi kwa seva za ndani, ikiwemo `NO_PROXY`; hakiingizi `proxyFetch.ts` wala viashiria vyake vya DB/vipengele.
Taarifa za uthibitishaji wa proksi hufichwa katika matokeo yanayopitishwa na hitilafu zinazorekodiwa. Taarifa za uthibitishaji wa lengwa
hutumwa tu katika ujumbe mmoja wa kuanzisha wa IPC, kamwe si kupitia argv au mazingira; matokeo/hitilafu zinazopitishwa
huongezewa kiambishi awali na kusafishwa. Ni `ExperimentalWarning` pekee inayozimwa katika hoja za utekelezaji za mchakato mtoto ili kuepuka
kurudia onyo la SQLite la Node katika kila utekelezaji wa cron; aina nyingine za maonyo hubaki kuonekana.

Moduli za lengwa lazima ziweze kuingizwa bila vitegemezi vya Next.js/vya seva pekee. Utekelezaji uliopo wa
BigQuery tayari unatimiza sharti hilo. Akiba za tokeni za ufikiaji hudumu tu wakati wa
utekelezaji wa mchakato mtoto, si kati ya utekelezaji tofauti. Node ndiyo mazingira ya utekelezaji yanayoungwa mkono (`package.json` engines), lakini sehemu ya usakinishaji wa Bun
katika README na `Dockerfile.bun` pia zinaeleza njia ya uoanifu wa uzalishaji inayotumia
`bun:sqlite` (`src/lib/db/core.ts` / adapta). Kwa hiyo, chini ya Bun, uhamishaji huhifadhi njia ya awali
ya ndani ya mchakato na kutoa onyo mara moja: utenganishaji wa heap/muda wa mwisho wa mchakato mtoto haupatikani. Tumia
Node kwa utenganishaji wa mzunguko wa matukio na OOM; Bun haichukuliwi hapa kuwa ya maendeleo pekee.

`includeBodies` inapowezeshwa, pendelea ratiba ya kiwango cha dakika kama vile
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` badala ya kukusanya mrundikano wa mizigo ya data wa saa nzima.
Vikomo vya makundi na safu bado vinadhibiti kila utekelezaji. Gharama ya kuanzisha mchakato hulipwa kwa kila lengwa katika kila utekelezaji;
hii hubadilisha gharama ndogo ya kuanzisha kuwa utenganishaji wa mzunguko wa matukio wa seva, si kupunguza jumla ya matumizi ya CPU.

### Mizigo ya data (maagizo na majibu)

Kwa chaguomsingi uhamishaji hubeba tu sehemu za muhtasari zinazoonyeshwa kwenye **orodha** ya Kumbukumbu. Kuwasha
**Hamisha maagizo na majibu** (`includeBodies`) pia hutuma yale yanayoonyeshwa kwenye kidirisha cha **maelezo**
cha Kumbukumbu kwa kila mwito:

| Sehemu                           | Inachohifadhi                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Mizigo ya data ya mwito kama dashibodi inavyoionyesha                               |
| `pipeline_route_decision`        | Lengwa na modeli zilizochaguliwa na kipanga njia                                    |
| `pipeline_client_request`        | Ombi ghafi kama lilivyotumwa na mteja kabisa                                        |
| `pipeline_openai_request`        | Baada ya kubadilishwa kuwa muundo wa ndani wa OpenAI                                |
| `pipeline_provider_request`      | Kama lilivyotumwa kwa mtoa huduma, katika muundo wake                               |
| `pipeline_provider_response`     | Jibu ghafi kutoka kwa mtoa huduma                                                   |
| `pipeline_client_response`       | Kilichorudishwa kwa mwitaji                                                         |
| `pipeline_error`                 | Maelezo ya hitilafu katika kiwango cha mnyororo wa uchakataji kwa mwito ulioshindwa |
| `bodies_truncated`               | Kweli ikiwa sehemu yoyote hapo juu ilifikia `maxBodyBytes`                          |

Haya ni maudhui ya maagizo, kwa hiyo **yamezimwa kwa chaguomsingi** na kwa makusudi huchaguliwa kwa kila lengwa.
Kinachotumwa ndicho kinachoonyeshwa na dashibodi, kwa sababu uhamishaji na `getCallLogById` hutumia utatuzi uleule
wa maelezo: mizigo ya data
tayari husafishwa taarifa binafsi zinazoweza kumtambulisha mtu na kufichwa siri inapoandikwa, na mwito unaofanywa kwa
ufunguo wa API wa `noLog` hauhifadhi mzigo wowote wa data, hivyo hakuna cha kuhamisha.

Mizigo ya data husomwa kwa kila safu kutoka kwenye faili ya mfumo wa faili, kwa hiyo ujazaji wa data hufanyika tu kwa malengwa
yaliyouomba. Faili inayokosekana au iliyoharibika huhamisha muhtasari wake huku mizigo ya data ikiwa null badala ya
kusababisha kundi kushindwa na kukwamisha kishale.

`maxBodyBytes` (chaguomsingi 262144) huweka kikomo kwa kila sehemu. Mizigo mirefu zaidi ya data **hukatwa badala ya
kuondolewa** — agizo lililokatwa bado hujibu "nini kiliulizwa" — na safu huwekewa alama ya
`bodies_truncated`. Mabadiliko yanayotiririshwa kipande kwa kipande hayahamishwi; jibu lililounganishwa
tayari liko katika `pipeline_provider_response` na `pipeline_client_response`.

---

## 2. Faili

| Kipengele                                    | Mahali                                       |
| -------------------------------------------- | -------------------------------------------- |
| Mkataba wa lengwa                            | `src/lib/logExport/types.ts`                 |
| Rejista                                      | `src/lib/logExport/registry.ts`              |
| Ushughulikiaji wa siri                       | `src/lib/logExport/secrets.ts`               |
| Kiendeshaji (IPC ya mchakato mzazi)          | `src/lib/logExport/runner.ts`                |
| Mzunguko wa maisha wa mchakato               | `src/lib/logExport/childRunner.ts`           |
| Sehemu ya kuanzia ya mchakato mtoto          | `src/lib/logExport/exportChild.ts`           |
| Kifunguzi cha kusoma tu                      | `src/lib/db/logExportReadOnly.ts`            |
| Hoja/ulinganishaji unaoshirikiwa             | `src/lib/usage/callLogExportQueries.ts`      |
| Kitatuzi cha maelezo                         | `src/lib/usage/callLogDetailResolver.ts`     |
| Uwasilishaji wa API                          | `src/lib/logExport/presenter.ts`             |
| Lengwa la BigQuery                           | `src/lib/logExport/destinations/bigquery.ts` |
| Uthibitishaji wa akaunti ya huduma ya Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Chanzo cha kumbukumbu za miito               | `src/lib/usage/callLogExportSource.ts`       |
| Uhifadhi wa kudumu                           | `src/lib/db/logExportDestinations.ts`        |
| Kazi ya Cron                                 | `src/lib/jobs/logExportJob.ts`               |
| Tabaka la REST                               | `src/app/api/log-export/`                    |
| Ukurasa wa dashibodi                         | `src/app/(dashboard)/dashboard/log-export/`  |

Skima: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Njia zote zinahitaji uthibitishaji wa usimamizi (`requireManagementAuth`). Siri hazirejeshwi kamwe:
siri iliyohifadhiwa hurejeshwa kama thamani halisi `__stored__`, na kutuma thamani hiyo tena wakati wa kusasisha
huhifadhi kitambulisho kilichopo.

Kuunda au kusasisha lengwa ambalo aina yake inabainisha siri **kunahitaji
`STORAGE_ENCRYPTION_KEY`**. Bila hiyo, `encrypt()` hupitisha data bila kuibadilisha wala kutoa onyo, hivyo uandishi
hukataliwa kwa msimbo wa 400 badala ya kuweka kitambulisho katika SQLite kama maandishi yasiyosimbwa (kinga ileile ambayo
webhook ya Telegram hutumia).

| Mbinu    | Njia                                     | Kusudi                                                                               |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Aina za malengwa + orodha ya sehemu zake za usanidi                                  |
| `GET`    | `/api/log-export/destinations`           | Kuorodhesha malengwa (siri zimefichwa)                                               |
| `POST`   | `/api/log-export/destinations`           | Kuunda lengwa                                                                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Kusoma lengwa moja                                                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | Kusasisha jina / hali ya kuwashwa / usanidi / upangaji wa mafungu                    |
| `DELETE` | `/api/log-export/destinations/{id}`      | Kufuta                                                                               |
| `POST`   | `/api/log-export/destinations/{id}/test` | Kupima vitambulisho, bila kuandika chochote                                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Kuhamisha rekodi zote zinazosubiri sasa, kwa njia ileile ya utekelezaji ulioratibiwa |
| `GET`    | `/api/log-export/status`                 | Hali ya Cron, utekelezaji wa karibuni, rekodi zinazosubiri kwa kila lengwa           |

`GET /api/log-export/types` ndiyo inayofanya UI itumike kwa aina zote: fomu ya dashibodi huundwa kutokana na
vifafanuzi vya sehemu vinavyorejeshwa, hivyo lengwa jipya halihitaji mabadiliko ya UI.

---

## 4. Lengwa la BigQuery

Vifunguo vya usanidi (`type: "bigquery"`):

| Kifunguo             | Maelezo                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | Mradi wa GCP unaoshikilia mkusanyiko wa data                                                                                                            |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                                                         |
| `location`           | Hutumika tu wakati mkusanyiko wa data unapaswa kuundwa (chaguomsingi ni `EU`)                                                                           |
| `serviceAccountJson` | Ufunguo wa akaunti ya huduma. Siri: husimbwa kwa njia fiche wakati wa kuhifadhiwa, haurudishwi                                                          |
| `autoCreate`         | Unda mkusanyiko wa data/jedwali ambalo halipo; kwa masharti ongeza safu wima za ushahidi wa matumizi zinazokubali thamani tupu (chaguomsingi ni `true`) |

Akaunti ya huduma inahitaji `bigquery.tables.updateData` kwenye jedwali lengwa, pamoja na
`bigquery.datasets.create` / `bigquery.tables.create` wakati `autoCreate` imewashwa.
Kusasisha jedwali lililopo ili kuongeza sehemu mbili za ushahidi wa matumizi zinazokubali thamani tupu pia kunahitaji
`bigquery.tables.update`. Ruhusa ikikosekana, uhamishaji hushindwa bila kusogeza kielekezi chake.

Kundi lililosanidiwa ni kitengo cha **kielekezi**, si cha HTTP: `send()` huligawanya katika
miito ya insertAll yenye kiwango cha juu cha safu 500, kwa hiyo `batch_size` kubwa haiwezi kufikisha kikomo cha ombi cha MB 10 cha BigQuery.
Hali za muda mfupi (408/429/500/502/503/504) hujaribiwa tena hadi mara tatu kwa kusubiri
kwa muda unaoongezeka kwa kielelezo, huku insertIds zilezile zikitumika; hitilafu za uthibitishaji na za
schema hutupwa kwenye jaribio la kwanza badala ya kutumia muda wa uendeshaji.

Jedwali lililoundwa muda mfupi uliopita bado halionekani kwa endpoint ya utiririshaji, ambayo hujibu
404 kwa sekunde chache. Hiyo 404 hujaribiwa tena, lakini **ni wakati tu ambapo uendeshaji huu uliunda jedwali** —
jedwali ambalo halipo kweli bado husababisha kushindwa mara moja. Kumbuka kuwa kuunda tena jedwali kwa jina
ambalo lilifutwa hivi karibuni hufanya BigQuery ikatae uingizaji wa utiririshaji kwa dakika kadhaa;
hiyo ni sifa ya kulifuta kisha kuliumba tena, kwa hiyo pendelea jina jipya la jedwali badala ya kuliondoa na kuliongeza tena.

**Hitilafu sehemu hufika kama HTTP 200 yenye `insertErrors[]` isiyo tupu.** Hii hushughulikiwa kama
hitilafu na hutupwa, jambo linalozuia kielekezi kusonga mbele ya safu ambazo BigQuery haikukubali;
`tests/unit/log-export-bigquery.test.ts` inathibitisha tabia hii.

Usafirishaji ni REST tupu — dai la RS256 lililotiwa saini kibinafsi hubadilishwa kuwa tokeni ya ufikiaji katika
`https://oauth2.googleapis.com/token`, kisha safu hutumwa kwa `tabledata.insertAll`. Hakuna SDK ya Google
inayoongezwa. Tokeni za ufikiaji huhifadhiwa kwenye mchakato kwa kila jozi ya (akaunti ya huduma, scope).

Jedwali lililoundwa huwa na safu wima moja kwa kila sehemu ya kichupo cha Kumbukumbu pamoja na `exported_at`, na limepangwa kwa
jinsi kumbukumbu za simu zinavyoulizwa kwa hakika:

- **Hugawanywa kwa siku kwa kutumia `timestamp`**, kwa hiyo swali lililowekewa kikomo kwa tarehe huchanganua siku hizo pekee.
- **Huunganishwa kwa makundi kwa kutumia `api_key_name`, `provider`, `model`, `status`** (kwa mpangilio huo), ili uchujaji kwa
  nani aliyeendesha, ulikoelekezwa, au kama ulishindwa upunguze vizuizi ndani ya kila sehemu. BigQuery
  inaruhusu safu wima zisizozidi nne za clustering na mpangilio ni muhimu: kichujio cha `api_key_name` pekee
  hupunguza vizuizi vinavyochanganuliwa, lakini kichujio cha `status` pekee hakifanyi hivyo.
- **Uhifadhi wa hiari wa sehemu** kupitia `partitionExpirationDays` (0 huhifadhi kila kitu), unaotumika
  wakati jedwali linapoundwa.

Mipangilio yote miwili hutumika wakati wa kuunda. Jedwali lililopo huhifadhi mpangilio lilionao tayari, kwa hiyo
elekeza lengwa kwenye kitambulisho kipya cha jedwali ikiwa ungependa kuitumia.

`tests/unit/log-export-bigquery.test.ts` inathibitisha kuwa mwekaji ramani na schema ya jedwali vinaendelea
sambamba, kwa hiyo safu mpya ya kumbukumbu ya simu haiwezi kuachwa kimya kimya wakati wa kuitoa.

Makundi hugawanywa kwa kuzingatia **idadi ya safu na baiti zilizowekwa katika mfumo wa mfuatano**. Idadi ya safu pekee haitoshi
mara payloads zinaposafirishwa: safu 500 zenye vidokezo zinaweza kuwa makumi ya megabaiti, na insertAll
hukataa ombi linalozidi MB 10. Makundi hufungwa kwenye safu 500 au MB 9, kulingana na kitakachofikiwa kwanza.

---

## 5. Mahali pa kulengwa kwa traces za OTLP/HTTP

Usanidi hutumia `type: "otlp-http"`. Huu ni uhamishaji uliopangwa, unaotegemea cursor, wa kumbukumbu za simu zilizohifadhiwa, si sinki la matukio ya uelekezaji wa moja kwa moja linalotumia juhudi bora zaidi katika
`open-sse/services/routing/otel.ts`. Hausomi wala kubadilisha vigezo vya mazingira, vipima muda au vihifadhi vya sinki hilo. Kuwasha vyote viwili kunaweza kutoa aina mbili huru za spans;
tumia scope ya instrumentation ya `omniroute.log-export` kutofautisha spans hizi za kumbukumbu za simu.

| Key                      | Chaguo-msingi / madhumuni                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| `endpoint`               | URL kamili ya traces ya HTTP(S) inayohitajika; kiambishi `/v1/traces` hakiongezwi         |
| `headers`                | Mistari ya hiari ya `Name: value` au kitu cha JSON cha strings; husimbwa kwa njia fiche   |
| `requestHeaderAllowlist` | Tupu (imezimwa); majina/viambishi awali vya vichwa vya mteja vya kunasa kama sifa za span |
| `serviceName`            | `omniroute`; resource `service.name`                                                      |
| `langfuseMapping`        | `false`; huongeza sifa za Langfuse za generation/session/user                             |
| `identity`               | `pseudonymous`, `keyName`, au `none`                                                      |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                   |
| `timeoutMs`              | `30000` kwa kila jaribio la HTTP                                                          |
| `environment`            | Haijawekwa; `langfuse.environment` ya hiari                                               |

Dashibodi ya jumla huonyesha sehemu hizi. `paths` hukubali safu ya API au eneo la maandishi lenye njia kamili zilizotenganishwa kwa mistari mipya/comma. Njia za embeddings, rerank na nyingine hurukwa isipokuwa ziruhusiwe wazi. Safu zilizorukwa bado huendeleza cursor; vihesabu vya `exported`/`exportedTotal` vya runner iliyopo huhesabu safu za chanzo zilizochakatwa, pamoja na safu zilizochujwa, badala ya spans zilizokubaliwa. Uchujaji hufanywa katika child, bila kubadilisha mkataba wake wa IPC/cursor.

Uthibitishaji wa URL hutumia msaidizi wa `parseAndValidateNonMetadataUrl` usiohitaji DB kutoka
`src/shared/network/outboundUrlGuard.ts`: sera ya `block-metadata`. Una ukaguzi uleule wa lazima wa metadata/protocol/kitambulisho kilichopachikwa kama validator ya webhook, huku URL za faragha zikiruhusiwa, lakini kwa makusudi huruhusu malengo ya localhost/LAN bila override ya kimataifa ya feature flag. Hii huwezesha endpoints za Langfuse, Phoenix, Tempo na Collector zinazojihudumia, zikiwemo endpoints za HTTP za faragha. Hosts za cloud-metadata huzuiwa kila wakati. Redirects hazifuatwi, hivyo collector haiwezi kuelekeza upya credentials kwenye host tofauti. Kama URL guard ya kilaksema iliyopo, hii haifungi utatuzi wa DNS; sanidi tu hosts zinazodhibitiwa na operator. Pendelea HTTPS kila endpoint isipokuwa ikiwa iko kwenye mtandao unaoaminika.

### Payload na uwasilishaji

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) hubeba span moja ya CLIENT kwa kila safu iliyoruhusiwa, iliyopewa jina kulingana na njia yake kamili ya ombi. Uwekaji majina wa njia hutofautisha Chat Completions, Responses na Messages bila kupachika data ya model au utambulisho kwenye jina la span. Sifa za resource zinajumuisha `service.name` na `service.version` ya package.

Logger ya kawaida ya majaribio ya chat (`open-sse/handlers/chatCore/attemptLogging.ts`) huandika
`duration = Date.now() - startTime` inapokamilika na haitoi timestamp;
`saveCallLogOperation` katika `src/lib/usage/callLogs.ts` huweka timestamp kwa chaguo-msingi kuwa wakati wa kuandika
(kukamilika). Kwa hiyo uhamishaji huweka end = timestamp ya safu na start = end − duration
(milliseconds, zilizobadilishwa kuwa decimal nanoseconds). Timestamps za kihistoria zilizotolewa na mwitaji
zinahifadhiwa pia kama wakati wa end; hakuna kitofautishi cha start/completion kwa kila safu.
Duration ya null huwa sifuri. Timestamps batili/zinazokosekana husababisha batch kushindwa badala ya kuunda spans zisizo za deterministic. `ttftMs` ni nullable na huwekwa kwenye `omniroute.ttft_ms`.

Sifa zinajumuisha `gen_ai.operation.name="chat"`, provider, model iliyoombwa/ya majibu,
tokeni za input/output, tokeni za hiari za cache-read/cache-creation/reasoning, hali ya HTTP,
combo, chanzo cha cache, tag ya session na kitambulisho cha uhusiano. Thamani kamili za OTLP na timestamps
ni strings za desimali; strings, booleans na nambari za sehemu hutumia variants zao asilia za thamani
za OTLP. Spans za hitilafu zina hali ya ERROR na ujumbe wa hali uliosafishwa. Rekodi ya kikanoni haina URL ya host ya upstream, kwa hiyo `server.address` haijumuishwi badala ya kuitambulisha kimakosa collector kama server ya model. Gharama haihamishwi.

Ni `includeBodies=true` pekee inayopakia maudhui. Kwa `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` hubeba JSON ya mwili wa ombi/jibu uliosafishwa
kama ilivyohifadhiwa na OmniRoute (ikiwezekana kuchanganuliwa kwa muundo wa kikanoni), si safu ya ujumbe ya semconv iliyoundwa upya. Miili iliyokatwa/isiyo ya JSON hubaki kuwa maandishi ghafi. Kwa `langfuseMapping=true`,
miili hutolewa tu kama `langfuse.observation.input` / `langfuse.observation.output`;
sifa za `gen_ai.*.messages` huachwa ili kila mwili utumwe mara moja. Hali zote mbili hurithi
`maxBodyBytes` kutoka njia iliyopo ya upakiaji;
`omniroute.bodies_truncated=true` huashiria kukatwa.
Hakuna snapshots za ziada za pipeline au usomaji wa artifact ambao haujasafishwa unaoongezwa na destination hii;
kunasa vichwa vya ombi kwa hiari hutumia snapshot iliyopo ya mteja iliyopakiwa iliyoelezwa hapa chini.
Tumia mzunguko wa kiwango cha dakika kama `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` wakati wa kuhamisha
miili, badala ya kukusanya mrundiko wa kila saa.

### Vichwa vya hiari vya ombi la mteja

Kunasa vichwa kumezimwa **kwa chaguo-msingi**. Weka `requestHeaderAllowlist` katika usanidi wa destination
na uwashe **Hamisha vidokezo na majibu** (`includeBodies: true` kwenye destination).
Allowlist hukubali safu ya API au eneo la maandishi lenye majina yaliyotenganishwa kwa mistari mipya/comma:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Majina hulingana bila kujali herufi kubwa au ndogo na kwa usahihi, isipokuwa `*` moja ya mwisho
ichague kiambishi awali kisicho tupu cha jina la header. `*` pekee, wildcards zilizopachikwa na
majina batili ya HTTP header hukataliwa. Kuna selectors zisizozidi 64, kila moja ikiwa na jina/kiambishi
awali kisichozidi baiti 256 za ASCII. Mipangilio hii ni tofauti na `headers`, ambayo huithibitisha
exporter kwa collector.

Capture husoma tu `pipeline_client_request`, inayojazwa kutoka `clientRawRequest` (au
`clientRequest` ya zamani) ya pipeline iliyohifadhiwa yenye maelezo ya kina. Haijawahi kutumia
header za ombi la provider kama njia mbadala. Uwekaji wa kumbukumbu wa pipeline yenye maelezo ya kina
lazima uwe umewezeshwa ombi liliporekodiwa. `includeBodies` ikiwa imezimwa, au JSON ya client-snapshot
ikiwa haipo, imeharibika au imekatwa, hakuna attributes za header zinazotolewa. Kuongeza
`maxBodyBytes` kunaweza kuzuia snapshot kukatwa wakati wa export; hakuwezi kurejesha maelezo
ambayo hayakuhifadhiwa kamwe. Snapshot yenye ukubwa zaidi ya MiB 1 au iliyo na entries zaidi ya
256 za header hupuuzwa. Export iliyopo ya prompt/response hubaki imewezeshwa pamoja na capture
ya header; allowlist haitoi hali ya hydration ya headers pekee.

Thamani zilizochaguliwa huwa arrays za strings za OTLP katika `http.request.header.<full lowercase header name>`,
hata kwa string moja. Kwa mfano, `X-OmniRoute-Meta-Team: example-team` huwa
`http.request.header.x-omniroute-meta-team` yenye
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Kiambishi awali kamili huhifadhiwa: hizi ni headers za kawaida, bila uchanganuzi wa business-field au
ubadilishaji kuwa `omniroute.metadata.*` / Langfuse metadata. `langfuseMapping` haibadilishi
maana ya header. `User-Agent` iliyochaguliwa yenye thamani moja pia huweka scalar ya kawaida
`user_agent.original`. Koma zilizo ndani ya thamani moja hazigawanywi. Tofauti za herufi kubwa na
ndogo huunganishwa kwa mpangilio wa entries zilizohifadhiwa; tofauti yoyote batili huondoa header
nzima. Attributes hupangwa kwa jina la herufi ndogo.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, headers za API-key, majina yaliyo na
alama za auth/token/secret/password/credential, na credentials za ndani za gateway huondolewa
kila mara, hata zikichaguliwa au kufichwa kwa sehemu katika hifadhi. Miundo ya credentials inayojulikana
hutumia tena kitambua credentials cha pamoja; alama za kuficha huondolewa, si kutumwa kama
thamani salama. Ni strings na arrays zisizo tupu za strings pekee zinazokubaliwa; nambari au objects
hazibadilishwi kuwa strings. Majina batili, funguo za prototype, herufi za udhibiti (isipokuwa tab
ya mlalo) na Unicode iliyoharibika hupuuziwa bila kusababisha batch kushindwa au maudhui yake
kujitokeza kwenye errors.

Kila span huhifadhi headers zisizozidi 32, values 16 kwa kila header, baiti 4096 za UTF-8 kwa
kila value, na jumla ya baiti 16384 za UTF-8 kwa majina na values zote za header zilizokusanywa.
Headers zilizozidi ukubwa/vilio batili huondolewa nzima, hazikatwi. Uchaguzi ni uamuzi wa faragha wa
operator: majina yanayoonekana salama bado yanaweza kuwa na data ya kibinafsi, na mipaka/vitambua
hivi si scrubber ya jumla ya PII.

### Mipaka ya uwasilishaji

Maombi yanawekewa kikomo cha spans 500 na MiB 4 ya JSON ya UTF-8, ikijumuisha envelope.
Kila span iliyoruhusiwa hukaguliwa ukubwa kabla ya ombi la kwanza la batch ya cursor. Span moja
iliyo kubwa kuliko kikomo haitumi sehemu yoyote ya batch hiyo na hushindwa ikiwa na mwongozo wa
kupunguza `maxBodyBytes`; haiondolewi kimya kimya. Preflight huhifadhi marejeleo ya rekodi na
hesabu za baiti pekee, huku ikitupa kila span/JSON ya muda; spans hujengwa upya kwa vipande vyenye
mipaka badala ya kuhifadhi nakala ya pili iliyoserializwa ya batch. HTTP 408/429/5xx, kushindwa kwa
mtandao na timeouts hupata hadi majaribio matatu, kwa exponential backoff ya 250/500 ms. Sekunde
za `Retry-After` au tarehe za HTTP zinaweza kuongeza delay hadi sekunde 5. Status nyingine hushindwa
mara moja. Kukataliwa kwa sehemu kwa OTLP 2xx pia husababisha exception badala ya kuthibitisha span
iliyopotea; acknowledgements za JSON tupu au halali zinakubaliwa, kwa kikomo cha kusoma jibu cha
KiB 64.

Errors huwa na mambo yanayomilikiwa na exporter pekee: status ya HTTP, aina ya retry, idadi ya
majaribio na idadi ya spans zilizotumwa, au maneno yasiyobadilika ya kushindwa kwa acknowledgement/
mtandao. Miili ya majibu ya collector, hesabu za partial-success na response headers haziwahi
kunakiliwa kwenye errors, logs au dashboard. Batch iliyoshindwa au kukubaliwa kwa sehemu
haithibitishwi: destination huonyesha Failing ikiwa na status hiyo, cursor hubaki kwenye batch
ya mwisho iliyothibitishwa, na utekelezaji unaofuata hutuma tena rows zilezile. Status za kudumu
huendelea kushindwa hadi collector au configuration irekebishwe. Tumia logs za collector yenyewe
kwa maelezo ya jibu. Muhtasari wa errors wa call-log una redaction yake tofauti.
`prepare()` hai-provision chochote; Test hutuma hasa `{"resourceSpans":[]}` na kuripoti
status ya HTTP bila kuandika call-log spans.

Trace ids na span ids ni tarakimu 32/16 za kwanza za hex za SHA-256 juu ya
`"omniroute.trace\\0" + callLogId` na `"omniroute.span\\0" + callLogId`. Utumaji tena hubeba
ids zilezile. Hii si guarantee ya deduplication: baadhi ya backends, ikiwemo ingestion ya Langfuse
v4, hazifanyi deduplicate spans zenye id ileile. Kuanguka kwa mfumo au kushindwa kwa sehemu ya
chunk kunaweza kutuma tena batch moja tu ya cursor ambayo haikuthibitishwa; batch hiyo nzima
inaweza kujirudia, si chunk yake ya mwisho ya HTTP pekee. Chagua ukubwa wa batch ya cursor
ukizingatia tradeoff hiyo.

### Mfano wa Langfuse

Sanidi sehemu hizi kwa instance ya Langfuse inayojihifadhi yenyewe:

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

Jenga thamani ya Authorization ndani ya mfumo kama Base64 ya string halisi ya `public-key:secret-key`
(kwa mfano kwa kutumia `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Usibandike credentials halisi kwenye logs, screenshots au issues. Mapping huweka kiotomatiki
`x-langfuse-ingestion-version: 4`; Authorization bado hutolewa katika `headers`.
Headers zote mbili na salt ya identity iliyotengenezwa hutumia utaratibu uliopo wa encrypted
secret-field na API placeholders; `STORAGE_ENCRYPTION_KEY` inahitajika.

Uwekaji wa ramani huongeza aina/modeli ya uundaji, maelezo ya matumizi ya JSON (ingizo/tokeo/jumla na funguo za kache zinazopatikana), vijipicha vya ingizo/tokeo vya JSON, kiwango cha ERROR/DEFAULT, ujumbe wa hali uliosafishwa, jina la ufuatiliaji, kitambulisho cha kipindi, mazingira ya hiari na
`langfuse.observation.metadata.<key>` yanayoweza kuchujwa kwa mtoa huduma, modeli iliyoombwa, njia, mchanganyiko, chanzo cha kache na hali. `langfuse.observation.completion_start_time` ni ISO 8601 wakati wa kuanza + TTFT tu wakati TTFT inajulikana na iko ndani ya muda uliotumika. Hakuna sifa za gharama zinazotumwa.

Hali za utambulisho hutumika kwa `langfuse.user.id`:

- `pseudonymous` (chaguo-msingi): HMAC-SHA256 ya kitambulisho cha ndani cha ufunguo wa API kwa kutumia salt ya baiti 32 ya nasibu kwa kila lengwa. Salt huzalishwa wakati wa kuunda ikiwa haipo, husimbwa kama `identitySalt`, hairudishwi kamwe, na huhifadhiwa wakati wa kuhariri. Vitambulisho ghafi vya funguo haviwekwi kamwe kwenye sifa za span. Kuunda upya au kuzungusha salt ya lengwa hubadilisha vitambulisho.
- `keyName`: jina lililosanidiwa la ufunguo wa API, likifichua kimakusudi lebo hiyo ya mwendeshaji.
- `none`: hakuna kitambulisho cha mtumiaji. Lebo za vipindi bado hutumwa zinapopatikana; hali hizi hazifanyi maudhui holela ya vidokezo au lebo za kipindi/uwiano zilizotolewa na mwendeshaji kuwa zisizotambulisha.

### Kuanza bila ujazaji wa nyuma

Wakati wa kuunda pekee, washa **Start from current position (skip existing logs)** au pitisha
`startFromCurrentPosition: true` katika kiwango cha juu cha mzigo wa ombi la API la uundaji. Hii huanzisha
`cursor_row_id` kwa rowid ya juu zaidi ya sasa ya rekodi ya simu iliyohifadhiwa kwa kutumia visaidizi vilivyopo vya kishale, bila uhamishaji. Chaguo-msingi ni false (kishale 0 na ujazaji wa historia iliyohifadhiwa ya nyuma).
Hii si mipangilio ya kuweka upya kishale wakati wa kusasisha.

Nyongeza ya pamoja ya `ttftMs` pia huongeza safu wima ya `ttft_ms` inayoweza kuwa NULL kwenye mchoraji wa BigQuery
na schema ya jedwali jipya: jaribio lake la schema linahitaji kila uga wa rekodi halisi uwe na safu wima. Majedwali yaliyopo yanaendelea kutuma bila mabadiliko: `prepare()` husoma schema ya jedwali na kuacha tu `ttft_ms` inapokosekana safu hiyo. Ongeza safu wima ya INT64 inayoweza kuwa NULL ili kupata TTFT
katika uendeshaji unaofuata, au tumia jedwali jipya. Safu wima ya hiari ya TTFT haisababishi sasisho la schema. Safu wima za ushahidi wa matumizi
hufuata mtiririko wa uoanifu wa masharti na wa kujijumuisha kwa hiari ulio hapa chini; sehemu nyingine za safu zinaendelea kuhitaji ukaguzi mkali wa schema.

---

## 6. Kuongeza lengwa

1. Unda `src/lib/logExport/destinations/<name>.ts` inayohamisha `LogExportDestinationType`:
   `configSchema` ya Zod, safu ya vifafanuzi vya `fields` kwa ajili ya kiolesura cha mtumiaji, `secretFields`, na
   `createClient(config)` inayorejesha `test()` / `prepare()` / `send(records)`.
2. Iongeze kwenye safu ya `DESTINATIONS` katika `src/lib/logExport/registry.ts`.
3. Andika majaribio ndani ya `tests/unit/`.

Hayo ndiyo mabadiliko yote: uhifadhi wa kudumu, kazi ya cron, safu ya REST, usimbaji fiche wa siri na
fomu ya dashibodi vyote husoma sajili hiyo.

Kanuni mbili za lengwa jipya:

- `send()` **lazima itupe hitilafu** iwapo sehemu ya operesheni itashindwa. Kukamilika bila hitilafu kunamaanisha "lengwa lina safu mlalo hizi",
  na kishale cha ufuatiliaji huzipita kabisa.
- Lengwa linalopokea URL iliyotolewa na mtumiaji lazima liithibitishe kupitia
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) kabla ya kuleta data,
  kwa namna ileile inayotumiwa na webhook. BigQuery haihitaji hili: anwani za seva zake ni thamani zisizobadilika.

---

## 7. Kuiendesha

- **Dashibodi**: Integrations → Log export. Ongeza lengwa, endesha **Jaribu** ili kukagua vitambulisho
  bila kuandika safu, kisha liwezeshe.
- **Foleni ya nyuma**: kila kadi ya lengwa huonyesha safu zinazosubiri na kishale; `GET
/api/log-export/status` hurudisha takwimu hizo hizo pamoja na uendeshaji 20 wa mwisho wa kazi.
- **Lengwa linaloshindwa halisababishi mengine kushindwa** — muhtasari wa uendeshaji huhifadhi hali ya kila lengwa
  katika `last_status` / `last_error`, na historia ya uendeshaji wa kazi huhifadhi jumla.
- **Kufuta lengwa hufuta kishale chake.** Kuliongeza tena huanza kutoka kwenye kumbukumbu ya zamani zaidi iliyohifadhiwa
  ya simu, hivyo hutuma tena safu ambazo huenda lengwa tayari linazo. Kwenye BigQuery, `insertId` ya kila safu huzuia
  marudio hayo tu ndani ya muda wa BigQuery wa kuondoa marudio, kwa hiyo pendelea kuzima
  lengwa badala ya kulifuta.

### Upatanifu wa schema ya ushahidi wa matumizi

Majedwali mapya ya BigQuery yanajumuisha `usage_evidence` inayoweza kuwa tupu (STRING iliyo na JSON) na
`usage_estimated` (BOOL). `autoCreate` ikiwa imewezeshwa, jedwali lililopo linaweza kupokea
safu hizi zinazokosekana pekee, mradi ziwe za hiari. Kihamishaji huhifadhi schema kamili iliyopo,
pamoja na metadata ya sehemu, na hutuma PATCH ya masharti kwa kutumia etag iliyorejeshwa. Mabadiliko ya wakati mmoja
kwenye schema husababisha uhamishaji ushindwe badala ya kuandikwa juu;
uendeshaji unaofuata husoma jedwali tena.

`autoCreate` ikiwa imezimwa, ongeza safu hizi mwenyewe kabla ya kuhamisha rekodi
zenye ushahidi wa matumizi. Metadata ya schema/etag inayokosekana au sasisho lililoshindwa pia huzuia uingizaji
wenye ushahidi. Kishale cha uhamishaji hakisongi mbele baada ya kushindwa huko, na
ushahidi hauondolewi kimyakimya. Uhifadhi wa ndani wa kumbukumbu bado hutumika wakati uhamishaji umezuiwa,
kwa hiyo tatua hitilafu kabla ya safu za chanzo zilizohifadhiwa kuisha muda.
