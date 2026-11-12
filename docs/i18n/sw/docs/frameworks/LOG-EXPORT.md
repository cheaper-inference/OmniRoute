# Log export (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Uhamishaji endelevu na wa hatua kwa hatua wa kumbukumbu za simu za OmniRoute kwenda kwenye hifadhi ya nje ya uchanganuzi.

Kichupo cha dashibodi ya Logs huhifadhi historia ya maombi katika SQLite (`call_logs`), ambayo inawekewa kikomo kupitia
uzungushaji na muda wa kuhifadhi. Uhamishaji wa kumbukumbu husafirisha seti hiyo hiyo ya rekodi kwa ratiba ili iweze kudumu zaidi ya
hifadhidata ya ndani na kuunganishwa na data nyingine. BigQuery ndilo lengwa la kwanza; mfumo huu ni sajili, kwa hivyo
malengo zaidi yanaweza kuongezwa.

---

## 1. Jinsi inavyofanya kazi

```
seva (simbua + thibitisha usanidi, sawazisha kishale)
  → anzisha IPC → mchakato wa OS wa exportChild uliotengwa
    → storage.sqlite ya kusoma pekee → hoja/ulinganishaji wa pamoja wa kumbukumbu za simu
      → upakiaji wa vipengee usiolandanishwa → prepare()/send() ya lengwa
        → IPC ya kundi → seva huhifadhi kishale → IPC ya uthibitisho
          → kundi linalofuata; IPC ya kukamilika → seva hurekodi mafanikio
```

- **Ratiba** — kazi moja ya cron ya `JobRegistry`, `log_export`, yenye chaguo-msingi la `0 * * * *` (kila saa,
  UTC). Imesajiliwa katika `src/lib/initCloudSync.ts`; inaweza kubadilishwa kwa `OMNIROUTE_LOG_EXPORT_CRON`.
  Kila utekelezaji hushughulikia kila lengwa **lililowezeshwa**, moja baada ya jingine.
- **Kishale** — `call_logs.rowid` fiche ya SQLite, inayohifadhiwa kwa kila lengwa katika
  `log_export_destinations.cursor_row_id`. `timestamp` haikutumika kimakusudi kama kishale: wapigaji
  wanaweza kutoa thamani yao wenyewe, kwa hivyo ombi la polepole linaweza kuandikwa baada ya ombi la kasi zaidi lililoanza
  baadaye, na kishale cha muhuri wa muda kingeliruka ombi hilo.
- **Ugawaji katika makundi** — safu `batch_size` kwa kila ombi (chaguo-msingi 500), safu `max_rows_per_run` kwa kila utekelezaji
  (chaguo-msingi 10000) ili mlundikano mkubwa ushughulikiwe katika utekelezaji kadhaa badala ya kuzuia utekelezaji mmoja.
- **Uwasilishaji** — kishale husogea mbele tu baada ya `send()` kukamilika. Kundi lililoshindwa huacha
  kishale mahali kilipokuwa, kwa hivyo safu zilezile hujaribiwa tena katika utekelezaji unaofuata. Dhamana ni
  uwasilishaji wa angalau mara moja pamoja na uondoaji wa nakala upande wa lengwa, si uwasilishaji halisi wa mara moja tu: BigQuery hutambulisha kila
  safu kwa kitambulisho cha kumbukumbu ya simu, ambacho huheshimu kwa kadiri iwezekanavyo ndani ya kipindi chake cha uondoaji wa nakala.
- **Kizuizi cha mwingiliano** — utekelezaji wa cron na `POST .../run` vinaweza kuanzishwa kwa pamoja. Lengwa
  ambalo tayari linashughulikiwa hurukwa badala ya kushughulikiwa mara mbili (`skipped: true` katika matokeo ya utekelezaji),
  kwa hivyo utekelezaji sambamba hauwezi kutuma tena kundi au kuandika kishale kurudi nyuma.
- **Urejeshaji baada ya ufutaji** — ikiwa `cursor_row_id` itaishia juu ya `MAX(rowid)` (jedwali lote
  lilifutwa na rowid zikaanza upya), kiendeshi hurudisha kishale hadi 0 badala ya kubaki bila kuona data kabisa.

### Kiendeshi kilichotengwa na vikomo

Kila utekelezaji wa lengwa kwenye Node huanzisha mchakato tofauti wa muda mfupi wa OS (`child_process`
wenye IPC, si `worker_threads`). Usomaji wa body, uchanganuzi/ugeuzaji wa JSON ya payload kuwa mfuatano, `prepare()`
ya lengwa na I/O ya mtandao ya lengwa yote huendeshwa humo, si kwenye kitanzi cha matukio cha seva.
Usanidi na ujumbe mdogo wa maendeleo pekee ndio huvuka IPC; rekodi zilizosafirishwa hazirudi kamwe
kwenye seva. Kazi ya cron na njia ya Endesha sasa hudumisha matokeo yale yale ya umma na kizuizi cha mwingiliano.

Mchakato mtoto hufungua `DATA_DIR/storage.sqlite` iliyotambuliwa na seva kwa hali ya kusoma pekee kwa kutumia `node:sqlite`,
ikiwa na `busy_timeout=5000` na `query_only=ON`. Hauleti singleton yoyote ya DB na haufanyi
uhamishaji, nakala rudufu au masasisho ya SQLite. Uwekaji kumbukumbu wa vipengee vilivyokosekana/vilivyoharibika (ikiwemo
UPDATE ya kipengee kilichoharibika) hubaki katika njia ya maelezo ya dashibodi pekee. Njia zote mbili hutumia kitatuzi safi
cha maelezo; usafirishaji hutumia usomaji wa mfumo wa faili usiolandanishwa na mpangilio uleule wa utatuzi wa kipengee → ya zamani
ya ndani ya mstari → diski ya zamani → hakuna. Utekelezaji hunasa rowid ya juu zaidi ya uingizaji
mchakato mtoto unapofungua kisomaji chake; miingizo ya baadaye husubiri utekelezaji unaofuata. Huu ni mpaka wa
uingizaji, si muamala wa SQLite wa muda mrefu: waandishi na vituo hakikishi vya WAL hubaki huru wakati wa
kusubiri mtandao. Masasisho/ufutaji wa safu zilizopo haufungwi na mpaka huu.

Baada ya kila kundi kukubaliwa, mchakato mtoto husubiri uthibitisho. Kwanza seva huhifadhi
kishale kwa `advanceLogExportCursor`, kisha hutuma `ack`; hakuna kundi linalofuata linaloanza kabla ya hapo.
Kushindwa kwa utumaji, kuvurugika au kuisha kwa muda hurekodi kutofaulu bila kusogeza mbele kundi hilo. Makundi
yaliyothibitishwa awali hubaki yamehifadhiwa; kwa kiwango cha juu, kundi moja ambalo halijathibitishwa linaweza kutumwa tena.
Mafanikio hurekodiwa tu baada ya `done` na mchakato mtoto kutoka bila hitilafu. Hitilafu husimamisha mchakato mtoto
kwa SIGTERM, ikipandishwa hadi SIGKILL baada ya ms 500, na kiendeshi husubiri mchakato kufungwa.

| Kigezo cha mazingira                          | Chaguo-msingi | Kusudi                                                        |
| --------------------------------------------- | ------------- | ------------------------------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000        | Kikomo cha muda halisi kwa kila lengwa                        |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024          | Kikomo cha nafasi ya zamani ya V8 ya mchakato mtoto katika MB |

Thamani batili/zisizo chanya/zisizo nambari kamili hutumia chaguo-msingi. Mpangilio wa heap si kikomo cha jumla cha
RSS; makundi makubwa sana bado yanaweza kumaliza kumbukumbu ya mchakato mtoto na kusababisha utekelezaji kushindwa kwa usalama.
Chaguo-msingi la MB 1024 huacha nafasi ya ziada kwa kundi chaguo-msingi la safu 500 za vipengee vya KiB 512 huku
body zikiwa zimewezeshwa, ikijumuisha ugeuzaji wa JSON kuwa mfuatano kwa vipande vya baiti wa BigQuery. Haufanyi
kundi la body lenye safu 10000 kuwa salama. Kuisha kwa heap ya V8 hurekodi hitilafu inayoweza kushughulikiwa: punguza ukubwa wa
kundi au ongeza `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; kishale hubaki kwenye kundi la mwisho
lililothibitishwa. Body za kihistoria za ndani ya mstari/diski hazijumuishwi kwenye kikomo cha kisasa cha vipengee.
Waendeshaji lazima wapangie RSS kando, hasa ndani ya kontena zenye kikomo cha kumbukumbu.

Mchakato mtoto hurithi tu `DATA_DIR` iliyotambuliwa, `NODE_ENV`, `TZ` iliyobainishwa (utatuzi wa muda wa ndani wa
jina la faili la zamani), `ELECTRON_RUN_AS_NODE` inapokuwepo, na ingizo zifuatazo za mawasiliano ya nje:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (na maumbo yake ya herufi ndogo),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Kisambazaji cha jumla cha Undici hutumia kwa pamoja utatuzi safi wa proksi wa mazingira wa seva na kanuni za
kupita moja kwa moja kwa seva pangishi za ndani, ikijumuisha `NO_PROXY`; hakileti `proxyFetch.ts` au alama zake za DB/vipengele.
Vitambulisho vya proksi hufichwa katika matokeo yaliyosambazwa na hitilafu zilizorekodiwa. Vitambulisho vya lengwa
husafiri tu katika ujumbe mmoja wa kuanza wa IPC, kamwe si argv wala mazingira; usambazaji wa matokeo/hitilafu
huwekewa kiambishi awali na kusafishwa. `ExperimentalWarning` pekee ndiyo huzimwa katika hoja za utekelezaji za mchakato mtoto ili kuepuka
kurudia onyo la SQLite la Node kila cron inapotekelezwa; aina nyingine za maonyo hubaki zikionekana.

Moduli lengwa lazima ziweze kuletwa bila vitegemezi vya Next.js/vya upande wa seva pekee. Utekelezaji uliopo wa
BigQuery tayari unatimiza masharti hayo. Akiba za tokeni za ufikiaji hudumu kwa kipindi cha utekelezaji wa mchakato
mtoto pekee, si kati ya utekelezaji tofauti. Node ndiyo mazingira ya utekelezaji yanayotumika (`package.json` engines), lakini sehemu ya
usakinishaji wa Bun katika README na `Dockerfile.bun` pia zinatangaza njia ya uoanifu wa uzalishaji inayotumia
`bun:sqlite` (`src/lib/db/core.ts` / adapta). Kwa hivyo, chini ya Bun, exports hudumisha njia ya awali
ya ndani ya mchakato na kutoa onyo la mara moja: utengaji wa heap/muda wa kuisha wa mchakato mtoto haupatikani. Tumia
Node kwa utengaji wa event-loop na OOM; Bun haichukuliwi kuwa ya mazingira ya uundaji pekee hapa.

Wakati `includeBodies` imewezeshwa, pendelea ratiba ya kila dakika kadhaa kama vile
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` badala ya kukusanya mrundikano wa payload wa kila saa.
Vikomo vya batch na safu bado hudhibiti kila utekelezaji. Gharama ya kuanzisha mchakato hulipwa kwa kila eneo lengwa katika kila utekelezaji;
hii hubadilishana gharama ndogo ya kuanzisha kwa utengaji wa event-loop ya seva, si kupunguza jumla ya matumizi ya CPU.

### Payload (maagizo na majibu)

Kwa chaguo-msingi, export hubeba sehemu za muhtasari pekee ambazo **orodha** ya Logs huonyesha. Kuwasha
**Hamisha maagizo na majibu** (`includeBodies`) pia hutuma kile ambacho kidirisha cha **maelezo**
cha Logs huonyesha kwa kila mwito:

| Sehemu                           | Inachohifadhi                                                     |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | Payload za mwito jinsi dashibodi inavyoziwasilisha                |
| `pipeline_route_decision`        | Lengo na modeli ambazo kipanga-njia kilichagua                    |
| `pipeline_client_request`        | Ombi ghafi jinsi mteja alivyolituma                               |
| `pipeline_openai_request`        | Baada ya kutafsiriwa kuwa muundo wa ndani wa OpenAI               |
| `pipeline_provider_request`      | Jinsi lilivyotumwa kwa mtoa huduma wa nje, katika lahaja yake     |
| `pipeline_provider_response`     | Jibu ghafi kutoka kwa mtoa huduma wa nje                          |
| `pipeline_client_response`       | Kilichorejeshwa kwa mwitaji                                       |
| `pipeline_error`                 | Maelezo ya hitilafu ya kiwango cha pipeline kwa mwito ulioshindwa |
| `bodies_truncated`               | True wakati sehemu yoyote hapo juu ilifikia `maxBodyBytes`        |

Haya ni maudhui ya maagizo, kwa hivyo **yamezimwa kwa chaguo-msingi** na kwa makusudi ni chaguo la kila eneo lengwa.
Kinachotumwa ndicho dashibodi inachoonyesha, kwa sababu export na `getCallLogById` hushiriki utatuzi wa
maelezo: payload huwa
tayari zimesafishwa PII na taarifa za siri zimefichwa zinapoandikwa, na mwito unaofanywa kwa kutumia
ufunguo wa API wa `noLog` hauhifadhi payload yoyote, kwa hivyo hakuna kitu cha kuhamisha.

Payload husomwa kwa kila safu kutoka kwenye artifact ya mfumo wa faili, kwa hivyo hydration huendeshwa tu kwa maeneo lengwa
yaliyoomba itumike. Artifact inayokosekana au iliyoharibika huhamisha muhtasari wake ikiwa na payload za null badala
ya kufanya batch ishindwe na kuzuia cursor kusonga mbele.

`maxBodyBytes` (chaguo-msingi 262144) huweka kikomo kwa kila sehemu. Payload ndefu zaidi **hukatwa badala ya
kuondolewa** — agizo lililokatwa bado hujibu "nini kiliulizwa" — na safu huwekewa alama ya
`bodies_truncated`. Delta zilizotiririshwa kipande kwa kipande hazihamishwi; jibu lililounganishwa tayari limo
katika `pipeline_provider_response` na `pipeline_client_response`.

---

## 2. Faili

| Sehemu                         | Mahali                                       |
| ------------------------------ | -------------------------------------------- |
| Mkataba wa lengwa              | `src/lib/logExport/types.ts`                 |
| Sajili                         | `src/lib/logExport/registry.ts`              |
| Ushughulikiaji wa siri         | `src/lib/logExport/secrets.ts`               |
| Kiendeshaji (IPC mzazi)        | `src/lib/logExport/runner.ts`                |
| Mzunguko wa maisha ya mchakato | `src/lib/logExport/childRunner.ts`           |
| Kiingilio cha mchakato mtoto   | `src/lib/logExport/exportChild.ts`           |
| Kifunguaji cha kusoma pekee    | `src/lib/db/logExportReadOnly.ts`            |
| Hoja/ulinganishaji wa pamoja   | `src/lib/usage/callLogExportQueries.ts`      |
| Kitatuzi cha maelezo           | `src/lib/usage/callLogDetailResolver.ts`     |
| Uwasilishaji wa API            | `src/lib/logExport/presenter.ts`             |
| Lengwa la BigQuery             | `src/lib/logExport/destinations/bigquery.ts` |
| Uthibitishaji wa Google SA     | `src/lib/logExport/googleServiceAccount.ts`  |
| Chanzo cha kumbukumbu za simu  | `src/lib/usage/callLogExportSource.ts`       |
| Uhifadhi                       | `src/lib/db/logExportDestinations.ts`        |
| Kazi ya cron                   | `src/lib/jobs/logExportJob.ts`               |
| Safu ya REST                   | `src/app/api/log-export/`                    |
| Ukurasa wa dashibodi           | `src/app/(dashboard)/dashboard/log-export/`  |

Skima: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API ya REST

Njia zote zinahitaji uthibitishaji wa usimamizi (`requireManagementAuth`). Siri hazirejeshwi kamwe:
siri iliyohifadhiwa hurudishwa kama thamani halisi `__stored__`, na kutuma thamani hiyo tena wakati wa kusasisha
huhifadhi kitambulisho kilichopo.

Kuunda au kusasisha lengwa ambalo aina yake imetangaza siri **kunahitaji
`STORAGE_ENCRYPTION_KEY`**. Bila hiyo, `encrypt()` hupitisha thamani kimyakimya bila kuibadilisha, kwa hiyo uandishi
hukataliwa kwa 400 badala ya kuweka kitambulisho katika SQLite kama maandishi wazi (ulinzi uleule
unaotumiwa na webhook ya Telegram).

| Mbinu    | Njia                                     | Kusudi                                                                 |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Aina za lengwa + orodha ya sehemu zake za usanidi                      |
| `GET`    | `/api/log-export/destinations`           | Orodhesha malengwa (siri zimefichwa)                                   |
| `POST`   | `/api/log-export/destinations`           | Unda lengwa                                                            |
| `GET`    | `/api/log-export/destinations/{id}`      | Soma lengwa moja                                                       |
| `PUT`    | `/api/log-export/destinations/{id}`      | Sasisha jina / kuwezeshwa / usanidi / uwekaji katika makundi           |
| `DELETE` | `/api/log-export/destinations/{id}`      | Futa                                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | Jaribu vitambulisho, usiandike chochote                                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Hamisha sasa, kwa njia sawa na utekelezaji ulioratibiwa                |
| `GET`    | `/api/log-export/status`                 | Hali ya Cron, utekelezaji wa hivi karibuni, mlundikano kwa kila lengwa |

`GET /api/log-export/types` ndiyo inayofanya UI iwe ya jumla: fomu ya dashibodi huonyeshwa kutokana na
vifafanuzi vya sehemu vinavyorejeshwa, kwa hiyo lengwa jipya halihitaji mabadiliko ya UI.

---

## 4. Lengwa la BigQuery

Vifunguo vya usanidi (`type: "bigquery"`):

| Ufunguo              | Maelezo                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `projectId`          | Mradi wa GCP unaohifadhi seti ya data                                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                |
| `location`           | Hutumiwa tu wakati seti ya data inapaswa kuundwa (chaguo-msingi `EU`)                          |
| `serviceAccountJson` | Ufunguo wa akaunti ya huduma. Siri: umesimbwa kwa njia fiche unapohifadhiwa, haurejeshwi kamwe |
| `autoCreate`         | Unda seti ya data na jedwali wakati wa uhamishaji wa kwanza (chaguo-msingi `true`)             |

Akaunti ya huduma inahitaji `bigquery.tables.updateData` kwenye jedwali lengwa, pamoja na
`bigquery.datasets.create` / `bigquery.tables.create` wakati `autoCreate` imewashwa.

Kundi lililosanidiwa ni kitengo cha **kishale**, si cha HTTP: `send()` huligawanya katika miito ya insertAll
yenye upeo wa safu mlalo 500, kwa hiyo `batch_size` kubwa haiwezi kuzidi kikomo cha ombi cha MB 10 cha BigQuery.
Hali za muda (408/429/500/502/503/504) hujaribiwa tena hadi mara tatu kwa ucheleweshaji unaoongezeka
kwa kasi ya kielelezo, huku insertIds zilezile zikitumiwa tena; hitilafu za uthibitishaji na skima hutupa hitilafu katika jaribio la kwanza
badala ya kupoteza utekelezaji.

Jedwali lililoundwa muda mfupi uliopita bado halionekani kwa kituo cha utiririshaji, ambacho hujibu
404 kwa sekunde chache. 404 hiyo hujaribiwa tena, lakini **ikiwa tu utekelezaji huu uliunda jedwali** —
jedwali ambalo kwa kweli halipo bado hushindwa mara moja. Kumbuka kuwa kuunda upya jedwali kwa jina ambalo
lilifutwa hivi karibuni hufanya BigQuery ikatae uingizaji wa kutiririsha kwa dakika kadhaa; hiyo ni
sifa ya kufuta-kisha-kuunda-upya, kwa hiyo ni bora kutumia jina jipya la jedwali badala ya kuliondoa na kuliongeza tena.

**Hitilafu ya sehemu huwasili kama HTTP 200 yenye `insertErrors[]` isiyo tupu.** Hiyo huchukuliwa kama
hitilafu na hutupa hitilafu, jambo linalozuia kishale kusonga mbele kupita safu mlalo ambazo BigQuery
haikukubali; `tests/unit/log-export-bigquery.test.ts` huthibitisha tabia hiyo.

Usafirishaji hutumia REST ya kawaida — dai la RS256 lililotiwa saini kibinafsi hubadilishwa kuwa tokeni ya ufikiaji katika
`https://oauth2.googleapis.com/token`, kisha safu mlalo hutumwa kwa `tabledata.insertAll`. Hakuna SDK ya Google
inayoongezwa. Tokeni za ufikiaji huhifadhiwa kwa muda ndani ya mchakato kwa kila jozi ya (akaunti ya huduma, upeo).

Jedwali linaloundwa huwa na safu wima moja kwa kila sehemu ya kichupo cha Logs pamoja na `exported_at`, na hupangwa kwa
jinsi kumbukumbu za miito zinavyoulizwa:

- **Hugawanywa kwa siku kulingana na `timestamp`**, kwa hiyo hoja iliyowekewa mipaka ya tarehe huchanganua siku hizo pekee.
- **Hupangwa katika makundi kulingana na `api_key_name`, `provider`, `model`, `status`** (kwa mpangilio huo), kwa hiyo kuchuja kulingana na
  nani aliyeiendesha, ilikoenda, au kama ilishindwa huondoa vizuizi visivyohitajika ndani ya kila sehemu. BigQuery
  huruhusu safu wima zisizozidi nne za upangaji katika makundi na mpangilio ni muhimu: kichujio cha `api_key_name` pekee
  huondoa vizuizi visivyohitajika, lakini kichujio cha `status` pekee hakifanyi hivyo.
- **Uhifadhi wa hiari wa sehemu** kupitia `partitionExpirationDays` (0 huhifadhi kila kitu), unaotumika
  jedwali linapoundwa.

Mipangilio yote miwili hutumika wakati wa kuunda. Jedwali lililopo huhifadhi mpangilio wowote ambao tayari linao, kwa hivyo
elekeza lengwa kwenye kitambulisho kipya cha jedwali ikiwa ungependa kuitumia.

`tests/unit/log-export-bigquery.test.ts` huhakikisha kuwa kipangaji na skima ya jedwali zinaendelea
kuwiana, ili safu wima mpya ya kumbukumbu za simu isipotezwe kimyakimya wakati wa kuhamishwa.

Makundi hugawanywa kulingana na **vyote viwili**, idadi ya safu mlalo na baiti zilizobadilishwa kuwa mfuatano. Idadi ya safu mlalo pekee haitoshi
mara tu payload zinaposafirishwa: safu mlalo 500 zenye prompts zinaweza kufikia makumi ya megabaiti, na insertAll
hukataa ombi linalozidi MB 10. Vipande hufungwa vinapofikia safu mlalo 500 au MB 9, chochote kinachotangulia.

---

## 5. Lengwa la traces za OTLP/HTTP

Usanidi hutumia `type: "otlp-http"`. Huu ni uhamishaji ulioratibiwa, unaotumia kishale, wa kumbukumbu
za miito zilizohifadhiwa, si kipokezi cha matukio ya uelekezaji cha moja kwa moja kinachofanya kadiri kinavyoweza katika
`open-sse/services/routing/otel.ts`. Hausomi wala kubadilisha vigeu vya mazingira,
vipima muda au bafa za kipokezi hicho. Kuwasha vyote viwili kunaweza kuzalisha aina mbili huru za spans;
tumia wigo wa ufuatiliaji wa `omniroute.log-export` kutofautisha spans hizi za kumbukumbu za miito.

| Ufunguo                  | Chaguomsingi / madhumuni                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `endpoint`               | URL kamili ya HTTP(S) ya traces inahitajika; kiambishi tamati cha `/v1/traces` hakiongezwi |
| `headers`                | Mistari ya hiari ya `Name: value` au objekti ya JSON ya mifuatano; husimbwa kwa njia fiche |
| `requestHeaderAllowlist` | Tupu (imezimwa); majina/viambishi awali vya vichwa vya mteja vya kunaswa kama sifa za span |
| `serviceName`            | `omniroute`; rasilimali `service.name`                                                     |
| `langfuseMapping`        | `false`; huongeza sifa za Langfuse za uzalishaji/kikao/mtumiaji                            |
| `identity`               | `pseudonymous`, `keyName`, au `none`                                                       |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                    |
| `timeoutMs`              | `30000` kwa kila jaribio la HTTP                                                           |
| `environment`            | Haijawekwa; `langfuse.environment` ya hiari                                                |

Dashibodi ya jumla huonyesha sehemu hizi. `paths` hukubali safu ya API au eneo la maandishi
lenye njia kamili zilizotenganishwa kwa mistari mipya/koma. Embeddings, rerank na njia nyingine
hurukwa isipokuwa ziruhusiwe waziwazi. Safu mlalo zilizorukwa bado husogeza kishale mbele; vihesabu
vya `exported`/`exportedTotal` vya kitekelezaji kilichopo huhesabu safu mlalo za chanzo zilizochakatwa, zikiwemo
safu mlalo zilizochujwa, badala ya spans zilizokubaliwa. Uchujaji hufanywa katika mchakato mtoto, bila kubadilisha
mkataba wake wa IPC/kishale.

Uthibitishaji wa URL hutumia kisaidizi cha `parseAndValidateNonMetadataUrl` kisichotumia DB kutoka
`src/shared/network/outboundUrlGuard.ts`: sera ya `block-metadata`. Kina ukaguzi uleule
usio na masharti wa metadata/itifaki/vitambulisho vilivyopachikwa kama kithibitishaji cha webhook chenye
URL za faragha zilizoruhusiwa, lakini kwa makusudi huruhusu malengo ya localhost/LAN bila
kubatilisha bendera ya kipengele ya kimataifa. Hii huruhusu endpoints za Langfuse, Phoenix, Tempo na Collector
zinazohostiwa binafsi, zikiwemo endpoints za HTTP za faragha. Hosti za metadata za wingu huzuiwa daima.
Uelekezaji upya haufuatwi, hivyo collector haiwezi kuelekeza upya vitambulisho kwenda kwa hosti tofauti.
Kama kilinzi kilichopo cha URL kinachotegemea maandishi, hiki hakifungi utatuzi wa DNS; sanidi tu
hosti zinazodhibitiwa na mwendeshaji. Pendelea HTTPS kila wakati endpoint isipokuwa kwenye mtandao unaoaminika.

### Data inayotumwa na uwasilishaji

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) hubeba span moja ya
CLIENT kwa kila safu mlalo iliyoruhusiwa, iliyopewa jina la njia halisi ya ombi lake. Kutaja kwa njia hutofautisha
Chat Completions, Responses na Messages bila kupachika data ya modeli au utambulisho katika
jina la span. Sifa za rasilimali zinajumuisha `service.name` na `service.version` ya kifurushi.

Kinakili cha kawaida cha majaribio ya gumzo (`open-sse/handlers/chatCore/attemptLogging.ts`) huandika
`duration = Date.now() - startTime` kazi inapokamilika na hakitoi muhuri wa muda;
`saveCallLogOperation` katika `src/lib/usage/callLogs.ts` huweka muhuri wa muda kwa chaguomsingi kuwa wakati
wa kuandika (kukamilika). Kwa hiyo uhamishaji huweka mwisho = muhuri wa muda wa safu mlalo na mwanzo = mwisho − muda
(milisekunde, zinazobadilishwa kuwa nanosekunde za desimali). Mihuri ya muda ya kihistoria iliyotolewa na mwitaji
pia huhifadhiwa kama wakati wa mwisho; hakuna kiashiria cha mwanzo/kukamilika kwa kila safu mlalo.
Muda wa null huwa sifuri. Mihuri ya muda batili/inayokosekana husababisha kundi kushindwa badala ya kuunda
spans zisizo na matokeo thabiti. `ttftMs` inaweza kuwa null na huambatanishwa na `omniroute.ttft_ms`.

Sifa zinajumuisha `gen_ai.operation.name="chat"`, mtoa huduma, modeli iliyoombwa/ya jibu,
tokeni za ingizo/tokeo, tokeni za hiari za kusoma akiba/kuunda akiba/ufikiri, hali ya HTTP,
combo, chanzo cha akiba, lebo ya kikao na kitambulisho cha uhusiano. Thamani namba kamili za OTLP na mihuri ya muda
ni mifuatano ya desimali; mifuatano, thamani za boolean na namba za sehemu hutumia aina zao asilia za thamani za OTLP.
Spans za hitilafu zina hali ya ERROR na ujumbe wa hali uliosafishwa. Rekodi sanifu
haina URL ya hosti ya huduma ya juu, hivyo `server.address` huachwa badala ya kuitambulisha kimakosa
collector kama seva ya modeli. Gharama haihamishwi.

Ni `includeBodies=true` pekee inayopakia maudhui. Ikiwa `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` hubeba JSON iliyosafishwa ya mwili wa ombi/jibu
kama ilivyohifadhiwa na OmniRoute (ikiwekwa katika umbo sanifu inapoweza kuchanganuliwa), si safu ya
ujumbe ya semconv iliyobadilishwa umbo. Miili iliyokatwa/isiyo JSON hubaki maandishi ghafi. Ikiwa `langfuseMapping=true`,
miili hutolewa tu kama `langfuse.observation.input` / `langfuse.observation.output`;
sifa za `gen_ai.*.messages` huachwa ili kila mwili utumwe mara moja. Hali zote mbili
hurithi `maxBodyBytes` kutoka kwenye njia iliyopo ya upakiaji wa maudhui;
`omniroute.bodies_truncated=true` huashiria ukataji.
Hakuna nakala za ziada za hali za pipeline wala usomaji wa vizalia visivyosafishwa unaoongezwa na lengwa hili;
unasaji wa hiari wa vichwa vya ombi hutumia nakala iliyopo ya hali ya mteja iliyopakiwa kama ilivyoelezwa hapa chini.
Tumia ratiba ya kiwango cha dakika kama vile `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` unapohamisha
miili, badala ya kukusanya mrundikano wa kila saa.

### Vichwa vya hiari vya maombi ya mteja

Unasaji wa vichwa **umezimwa kwa chaguomsingi**. Weka `requestHeaderAllowlist` katika usanidi wa lengwa
na uwashe **Hamisha maagizo na majibu** (`includeBodies: true` kwenye lengwa).
Orodha ya ruhusa hukubali safu ya API au eneo la maandishi lenye majina yaliyotenganishwa kwa mistari mipya/koma:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Majina hulinganishwa kikamilifu bila kujali herufi kubwa au ndogo, isipokuwa `*` moja ya mwisho inapochagua kiambishi awali kisicho tupu
cha jina la kichwa. `*` pekee, vibambo badala vilivyopachikwa na majina batili ya vichwa vya HTTP hukataliwa.
Kuna viteuzi visivyozidi 64, kila kimoja kikiwa na jina/kiambishi awali cha baiti za ASCII zisizozidi 256.
Mpangilio huu ni tofauti na `headers`, ambayo huthibitisha utambulisho wa kisafirishaji kwa mkusanyaji.

Unasaji husoma `pipeline_client_request` pekee, inayojazwa kutoka kwenye
`clientRawRequest` ya pipeline ya kina iliyohifadhiwa (au `clientRequest` ya zamani). Hautumii kamwe vichwa vya ombi la mtoa huduma kama mbadala.
Uwekaji kumbukumbu wa kina wa pipeline lazima uwe ulikuwa umewashwa wakati ombi liliporekodiwa.
`includeBodies` ikiwa imezimwa, au JSON ya picha ya hali ya mteja ikiwa haipo, imeharibika au imekatwa, hakuna sifa
za vichwa zinazotolewa. Kuongeza `maxBodyBytes` kunaweza kuzuia kukatwa kwa picha ya hali wakati wa kusafirisha;
hakuwezi kurejesha maelezo ambayo hayakuwahi kuhifadhiwa. Picha ya hali inayozidi MiB 1 au yenye zaidi ya
maingizo 256 ya vichwa hupuuzwa. Usafirishaji uliopo wa ingizo/jibu huendelea kufanya kazi pamoja na
unasaji wa vichwa; orodha ya vinavyoruhusiwa haitoi hali ya kujaza data ya vichwa pekee.

Thamani zilizochaguliwa huwa safu za mifuatano za OTLP za `http.request.header.<full lowercase header name>`,
hata kwa mfuatano mmoja. Kwa mfano, `X-OmniRoute-Meta-Team: example-team` huwa
`http.request.header.x-omniroute-meta-team` yenye
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Kiambishi awali kizima huhifadhiwa: hivi ni vichwa vya kawaida, bila uchanganuzi wa sehemu za biashara au
ubadilishaji kuwa metadata ya `omniroute.metadata.*` / Langfuse. `langfuseMapping` haibadilishi maana
ya vichwa. `User-Agent` iliyochaguliwa yenye thamani moja pia huweka thamani moja ya kawaida ya
`user_agent.original`. Koma ndani ya thamani moja hazitumiki kuigawanya. Tofauti za herufi kubwa na ndogo huunganishwa kwa
mpangilio wa maingizo yaliyohifadhiwa; tofauti yoyote batili husababisha kichwa hicho kizima kuachwa. Sifa hupangwa kwa jina lenye herufi ndogo.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, vichwa vya funguo za API, majina yenye
alama za auth/token/secret/password/credential, na taarifa za ndani za uthibitishaji za lango daima
huondolewa, hata zikichaguliwa au kufichwa kwa sehemu kwenye hifadhi. Miundo inayojulikana ya taarifa za uthibitishaji hutumia tena
kitambuzi cha pamoja cha taarifa za uthibitishaji; alama za kuficha taarifa huachwa, hazisafirishwi kama thamani salama.
Mifuatano na safu zisizo tupu za mifuatano pekee hukubaliwa; namba wala objekti hazibadilishwi kwa lazima.
Majina batili, funguo za prototype, vibambo vya udhibiti (isipokuwa tabo mlalo) na Unicode yenye muundo mbaya
hupuuzwa bila kufanya kundi lishindwe au kuonyesha maudhui yake kwenye hitilafu.

Kila span hunasa vichwa visivyozidi 32, thamani 16 kwa kila kichwa, baiti 4096 za UTF-8 kwa kila thamani,
na jumla ya baiti 16384 za UTF-8 katika majina na thamani za vichwa vilivyonaswa. Vichwa vikubwa kupita kiasi au batili
huachwa vyote, havikatwi. Uteuzi ni uamuzi wa faragha wa mwendeshaji: majina yanayoonekana salama
bado yanaweza kuwa na data binafsi, na mipaka/vitambuzi hivi si kisafishaji cha jumla cha taarifa binafsi zinazoweza kumtambulisha mtu (PII).

### Mipaka ya uwasilishaji

Maombi yanawekewa kikomo cha span 500 na MiB 4 za JSON ya UTF-8, ikijumuisha bahasha.
Ukubwa wa kila span inayoruhusiwa hukaguliwa kabla ya ombi la kwanza la kundi la kishale. Span moja
inayozidi kikomo huzuia sehemu yoyote ya kundi hilo kutumwa na husababisha hitilafu yenye maelekezo ya kupunguza
`maxBodyBytes`; haiondolewi kimyakimya. Ukaguzi wa awali huhifadhi marejeleo ya rekodi na
idadi za baiti pekee, ukiondoa kila span/JSON ya muda; span huundwa upya kwa vipande vyenye ukubwa uliowekewa kikomo
badala ya kuhifadhi nakala ya pili ya kundi iliyosirialishwa. HTTP 408/429/5xx, hitilafu za mtandao na kuisha kwa muda wa kusubiri hupewa majaribio yasiyozidi
matatu, kwa muda wa kusubiri unaoongezeka kipeo wa ms 250/500. Sekunde au tarehe za HTTP za `Retry-After`
zinaweza kuongeza muda wa kusubiri hadi sekunde 5. Hali nyingine hushindwa mara moja. Kukataliwa kwa sehemu kwa OTLP 2xx pia husababisha hitilafu badala ya
kuthibitisha span iliyopotea; uthibitisho mtupu au wa JSON halali hukubaliwa, kukiwa na
kikomo cha KiB 64 cha kusoma jibu.

Hitilafu zina ukweli unaomilikiwa na kisafirishaji pekee: hali ya HTTP, aina ya jaribio upya, idadi ya majaribio na
span zilizotumwa, au ujumbe maalumu usiobadilika wa hitilafu ya uthibitisho/mtandao. Miili ya majibu ya mkusanyaji,
idadi za mafanikio ya sehemu na vichwa vya majibu havinakiliwi kamwe kwenye hitilafu, kumbukumbu au
dashibodi. Kundi lililoshindwa au lililokubaliwa kwa sehemu halithibitishwi: lengwa huonyesha
hali ya Kushindwa pamoja na hali hiyo, kishale hubaki kwenye kundi la mwisho lililothibitishwa, na utekelezaji unaofuata
hutuma tena safu zilezile. Hali za kudumu huendelea kushindwa hadi mkusanyaji au usanidi
urekebishwe. Tumia kumbukumbu za mkusanyaji mwenyewe kupata maelezo ya jibu. Muhtasari wa hitilafu za kumbukumbu za miito hudumisha
utaratibu wake tofauti wa kuficha taarifa.
`prepare()` haiandai chochote; Jaribio hutuma hasa `{"resourceSpans":[]}` na kuripoti
hali ya HTTP bila kuandika span za kumbukumbu za miito.

Vitambulisho vya trace na span ni tarakimu 32/16 za kwanza za heksadesimali za SHA-256 ya
`"omniroute.trace\0" + callLogId` na `"omniroute.span\0" + callLogId`. Utumaji upya hubeba
vitambulisho vilevile. Hii si dhamana ya kuondoa nakala rudufu: baadhi ya mifumo ya nyuma, ikijumuisha upokeaji wa Langfuse
v4, haiondoi span rudufu zenye kitambulisho kilekile. Kuanguka kwa programu au kushindwa kwa sehemu ya kipande kunaweza
kusababisha kutumwa upya kwa kundi moja tu la kishale ambalo halijathibitishwa; kundi hilo lote linaweza kurudiwa,
si kipande chake cha mwisho cha HTTP pekee. Chagua ukubwa wa kundi la kishale ukizingatia athari hiyo.

### Mfano wa Langfuse

Sanidi sehemu hizi kwa instansi ya Langfuse inayojihifadhi yenyewe:

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

Unda thamani ya Authorization kwenye kifaa chako kama Base64 ya mfuatano halisi wa `public-key:secret-key`
(kwa mfano kwa kutumia `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Usibandike taarifa halisi za uthibitishaji kwenye kumbukumbu, picha za skrini au ripoti za matatizo. Ulinganishaji huweka
`x-langfuse-ingestion-version: 4` kiotomatiki; Authorization bado hutolewa katika `headers`.
Vichwa pamoja na chumvi ya utambulisho inayozalishwa hutumia utaratibu uliopo wa sehemu za siri zilizosimbwa fiche
na vishikilia nafasi vya API; `STORAGE_ENCRYPTION_KEY` inahitajika.

Ulinganishaji huongeza aina/modeli ya uzalishaji, maelezo ya matumizi ya JSON (ingizo/tokeo/jumla na
funguo za akiba zinazopatikana), nakala za hali ya ingizo/tokeo za JSON, kiwango cha ERROR/DEFAULT, ujumbe wa hali uliosafishwa,
jina la ufuatiliaji, kitambulisho cha kipindi, mazingira ya hiari na
`langfuse.observation.metadata.<key>` inayoweza kuchujwa kwa mtoa huduma, modeli iliyoombwa, njia, mchanganyiko, chanzo
cha akiba na hali. `langfuse.observation.completion_start_time` huwa katika umbizo la ISO 8601 ikiwa ni
muda wa kuanza + TTFT tu wakati TTFT inajulikana na iko ndani ya muda wa tukio. Hakuna sifa za gharama zinazotumwa.

Hali za utambulisho hutumika kwa `langfuse.user.id`:

- `pseudonymous` (chaguo-msingi): HMAC-SHA256 ya kitambulisho cha ndani cha ufunguo wa API pamoja na thamani nasibu
  ya salt ya baiti 32 kwa kila lengwa. Salt huzalishwa wakati wa kuunda ikiwa haipo, husimbwa kwa njia fiche
  kama `identitySalt`, hairudishwi kamwe, na huhifadhiwa wakati wa kuhariri. Vitambulisho ghafi vya funguo haviwekwi kamwe
  katika sifa za span. Kuunda upya/kubadilisha salt ya lengwa hubadilisha utambulisho.
- `keyName`: jina lililosanidiwa la ufunguo wa API, likifichua kimakusudi lebo hiyo ya mwendeshaji.
- `none`: hakuna kitambulisho cha mtumiaji. Lebo za kipindi bado husafirishwa zikiwepo; hali hizi hazifanyi
  maudhui yoyote ya prompt au lebo za kipindi/uhusianishaji zilizotolewa na mwendeshaji kuwa bila utambulisho.

### Kuanza bila kujaza data ya awali

Wakati wa kuunda pekee, washa **Anza kutoka nafasi ya sasa (ruka kumbukumbu zilizopo)** au pitisha
`startFromCurrentPosition: true` katika kiwango cha juu cha data ya ombi la API ya kuunda. Hii huweka thamani ya awali ya
`cursor_row_id` kuwa rowid ya juu zaidi ya sasa ya kumbukumbu za miito zilizohifadhiwa kwa kutumia vitendakazi saidizi vya kishale vilivyopo,
bila uhamishaji. Chaguo-msingi ni false (kishale 0 na kujaza historia iliyohifadhiwa).
Huu si mpangilio wa kuweka upya kishale wakati wa kusasisha.

Ongezeko la pamoja la `ttftMs` pia huongeza safu wima ya `ttft_ms` inayoruhusu null kwenye kilinganishi cha BigQuery
na skima ya jedwali jipya: jaribio lake la skima linahitaji kila uga wa rekodi sanifu uwe na
safu wima. Majedwali yaliyopo yanaendelea kusafirisha bila mabadiliko: `prepare()` husoma skima ya jedwali na
huacha tu `ttft_ms` wakati safu wima hiyo haipo. Ongeza safu wima ya INT64 inayoruhusu null ili kupata TTFT
katika utekelezaji unaofuata, au tumia jedwali jipya. Hakuna PATCH, mabadiliko ya kiotomatiki ya skima au ruhusa
za ziada zinazohitajika; sehemu nyingine zote za safu mlalo zinaendelea kukaguliwa kwa ukali dhidi ya skima.

---

## 6. Kuongeza lengwa

1. Unda `src/lib/logExport/destinations/<name>.ts` inayohamisha `LogExportDestinationType`:
   `configSchema` ya Zod, safu ya vifafanuzi vya `fields` kwa ajili ya UI, `secretFields`, na
   `createClient(config)` inayorejesha `test()` / `prepare()` / `send(records)`.
2. Iongeze kwenye safu ya `DESTINATIONS` katika `src/lib/logExport/registry.ts`.
3. Andika majaribio chini ya `tests/unit/`.

Hayo ndiyo mabadiliko yote: uhifadhi, kazi ya cron, safu ya REST, usimbaji fiche wa siri na
fomu ya dashibodi zote husoma sajili.

Sheria mbili za lengwa jipya:

- `send()` **lazima itupe hitilafu** ikiwa kuna kutofaulu kwa sehemu. Kukamilika kunamaanisha "lengwa lina safu hizi",
  na kishale husogea mbele yao kabisa.
- Lengwa linalotumia URL iliyotolewa na mtumiaji lazima liithibitishe kupitia
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) kabla ya kuichota,
  kwa njia ileile inayotumiwa na webhooks. BigQuery haihitaji hili: vipangishi vyake ni thabiti.

---

## 7. Kuiendesha

- **Dashibodi**: Integrations → Log export. Ongeza lengwa, tumia **Test** kukagua vitambulisho
  bila kuandika safu, kisha liwashe.
- **Mlundikano**: kila kadi ya lengwa huonyesha safu zinazosubiri na kishale; `GET
/api/log-export/status` hurejesha takwimu hizohizo pamoja na utekelezaji 20 wa mwisho wa kazi.
- **Lengwa linaloshindwa halisababishi mengine yashindwe** — muhtasari wa utekelezaji hurekodi hali ya kila lengwa
  katika `last_status` / `last_error`, na historia ya utekelezaji wa kazi huhifadhi jumla.
- **Kufuta lengwa hufuta kishale chake.** Kuliongeza tena huanzia kwenye kumbukumbu ya zamani zaidi ya simu
  iliyohifadhiwa, jambo ambalo hutuma upya safu ambazo huenda lengwa tayari linazo. Kwenye BigQuery, `insertId`
  ya kila safu hushughulikia hilo ndani tu ya kipindi cha BigQuery chenyewe cha kuondoa nakala, kwa hivyo ni bora
  kuzima lengwa badala ya kulifuta.
