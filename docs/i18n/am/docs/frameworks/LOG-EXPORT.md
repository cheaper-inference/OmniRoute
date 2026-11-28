# Log export (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

የOmniRoute ጥሪ መዝገቦችን ወደ ውጫዊ የትንታኔ ማከማቻ ያለማቋረጥ፣ በጭማሪ መላክ።

የመዝገቦች ዳሽቦርድ ትር የጥያቄ ታሪክን በSQLite (`call_logs`) ውስጥ ያስቀምጣል፤ ይህም በማሽከርከርና
በማቆያ ጊዜ የተገደበ ነው። የመዝገብ ኤክስፖርት ተመሳሳይ የመዝገብ ስብስብን በጊዜ ሰሌዳ ወደ ውጭ ይልካል፤ ስለዚህ ከአካባቢያዊው
የውሂብ ጎታ በላይ ሊቆይና ከሌሎች ውሂቦች ጋር ሊጣመር ይችላል። BigQuery የመጀመሪያው መዳረሻ ነው፤
የሂደት መስመሩ በመዝገብ ሥርዓት ላይ የተመሠረተ ስለሆነ፣ ተጨማሪ መዳረሻዎችን በመጨመር ማስፋት ይቻላል።

---

## 1. እንዴት እንደሚሰራ

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **መርሐግብር** — አንድ `JobRegistry` ክሮን ሥራ፣ `log_export`፣ ነባሪ ወደ `0 * * * *` (በሰዓት፣ UTC)። በ `src/lib/initCloudSync.ts` ውስጥ የተመዘገበ; በ `OMNIROUTE_LOG_EXPORT_CRON` ከመጠን በላይ . እያንዳንዱ መዥገር እያንዳንዱን ያጠፋል** ነቅቷል** መድረሻ, በቅደም ተከተል.
- **Cursor** — SQLite ስውር `call_logs.rowid`፣ በ `log_export_destinations.cursor_row_id` ውስጥ በአንድ መድረሻ ጸንቷል። `timestamp` ሆን ብሎ ጠቋሚ አይደለም፡ ደዋዮች የራሳቸውን ዋጋ ሊያቀርቡ ይችላሉ፣ ስለዚህ ቀርፋፋ ጥያቄ በፍጥነት ከጀመረ በኋላ ሊፃፍ ይችላል፣ እና የጊዜ ማህተም ጠቋሚው ይዘላል።
- **ማባዛት።** — `batch_size` ረድፎች በጥያቄ (ነባሪ 500)፣ `max_rows_per_run` ረድፎች በሩጫ (ነባሪ 10000) ስለዚህ አንድ ትልቅ የኋላ ሎግ አንዱን ከመዝጋት ይልቅ በብዙ መዥገሮች ላይ ይፈሳል።
- **ማድረስ** — ጠቋሚው የሚራመደው `send()` ከተፈታ በኋላ ነው። ያልተሳካ ባች ጠቋሚውን በነበረበት ይተዋል፣ ስለዚህ በሚቀጥለው ሩጫ ላይ ተመሳሳይ ረድፎች እንደገና ይሞከራሉ። ዋስትናው ቢያንስ-አንድ ጊዜ እና የመድረሻ-ጎን ማባዛት ነው፣ በትክክል አንድ ጊዜ አይደለም፡- BigQuery እያንዳንዱን ረድፍ በጥሪ ሎግ መታወቂያው ይከፍታል፣ ይህም በራሱ በተቀነሰ መስኮት ውስጥ በተሻለ ጥረት ያከብራል።
- **መደራረብ ጠባቂ** — የ cron tick እና `POST .../run` አብረው መተኮስ ይችላሉ። ቀድሞውንም የሚያፈስ መድረሻ ሁለት ጊዜ ከመፍሰስ ይልቅ ተዘሏል ( በሩጫ ውጤት `skipped: true` )፣ ስለዚህ በአንድ ጊዜ መሮጥ ጥቅሉን እንደገና መላክ ወይም ጠቋሚውን ወደ ኋላ መፃፍ አይችልም።
- **ማገገምን ያፅዱ** — `MAX(rowid)` `cursor_row_id` ካለቀ (ሙሉ ጠረጴዛው ከተጸዳ እና ረድፎች እንደገና ከጀመሩ) ሯጩ በቋሚነት ከመታወር ይልቅ ወደ 0 ይመለሳል።

### ገለልተኛ ሯጭ እና ገደቦች

በመስቀለኛ መንገድ ላይ የሚሄደው እያንዳንዱ መድረሻ የተለየ አጭር ጊዜ የሚቆይ OS ልጅ ሂደት ይጀምራል (`child_process` ከ IPC ጋር እንጂ `worker_threads` አይደለም)። አካል ያነባል፣የክፍያ ጭነት JSON parsing/serialization፣መዳረሻ `prepare()` እና የመድረሻ አውታረ መረብ I/O ሁሉም ወደዚያ የሚሄዱት በአገልጋዩ የክስተት ዑደት ላይ አይደለም። የማዋቀር እና ትንሽ የሂደት መልዕክቶች IPC ይሻገራሉ; ወደ ውጭ የተላኩ መዝገቦች ወደ አገልጋዩ አይመለሱም። የ cron job እና Run now መንገድ ተመሳሳይ የህዝብ ውጤት እና መደራረብ ጥበቃን ያስቀምጣል።

ልጁ `node:sqlite` በመጠቀም የአገልጋዩን የፈታ `DATA_DIR/storage.sqlite` ንባብ ብቻ በ `busy_timeout=5000` እና `query_only=ON` ይከፍታል። ምንም DB ነጠላቶን አያስመጣም እና ምንም አይነት ፍልሰት፣ ምትኬ ወይም SQLite ዝመናዎችን አይሰራም። Missing/corrupt የቅርስ መዝገብ አያያዝ (የተበላሸ-ቅርስ UPDATE ን ጨምሮ) በዳሽቦርድ ዝርዝር መንገድ ላይ ብቻ ይቀራል። ሁለቱም ዱካዎች ንጹህ ዝርዝር ፈቺ ያካፍላሉ; ወደ ውጭ መላክ ያልተመሳሰለ የፋይል ሲስተም ንባቦችን እና ተመሳሳይ የቅርስ → ቅርስ የመስመር ላይ → ቅርስ ዲስክ → ምንም የመፍታት ቅደም ተከተል ይጠቀማል። ልጁ አንባቢውን ሲከፍት አንድ አሂድ ከፍተኛውን የማስገቢያ ሮድ ቅጽበታዊ ገጽ እይታ ያሳያል። በኋላ ማስገቢያዎች ለሚቀጥለው ሩጫ ይጠብቁ. ይህ የማስገቢያ ወሰን ነው፣ ረጅም ዕድሜ ያለው SQLite ግብይት አይደለም WAL ጸሐፊዎች እና የፍተሻ ቦታዎች በኔትወርክ ጥበቃ ጊዜ ነፃ ሆነው ይቆያሉ። የነባር ረድፎች Updates/deletions በዚህ ወሰን አልታሰሩም።

ከእያንዳንዱ ተቀባይነት ያለው ስብስብ በኋላ, ህጻኑ እውቅና ለማግኘት ይጠብቃል. አገልጋዩ መጀመሪያ ጠቋሚውን በ `advanceLogExportCursor` ይቀጥላል፣ ከዚያም `ack` ይልካል; ከእሱ በፊት ምንም ቀጣይ ክፍል አይጀምርም. የመላክ አለመሳካት፣ ብልሽት ወይም ጊዜ ማብቂያ ያንን ቡድን ሳያራምድ ውድቀትን ይመዘግባል። ቀደም ሲል እውቅና የተሰጣቸው ቡድኖች ቁርጠኝነት ይቆያሉ; ቢበዛ አንድ እውቅና የሌለው ቡድን እንደገና መላክ ይቻላል. ስኬት `done` እና ንጹህ ልጅ ከወጣ በኋላ ብቻ ይመዘገባል. አለመሳካቶች ልጁን በ SIGTERM ያበቃል፣ ከ500 ሚሴ በኋላ ወደ SIGKILL ያድጋል፣ እና ሯጩ የሂደቱን መዘጋት ይጠብቃል።

| የአካባቢ ተለዋዋጭ                                   | ነባሪ    | ዓላማ                      |
| --------------------------------------------- | ------ | ------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | በየመዳረሻ ግድግዳ ሰዓት ገደብ      |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | የልጅ V8 የድሮ-ቦታ ገደብ MB ውስጥ |

Invalid/non-positive/non-integer እሴቶች ነባሪዎችን ይጠቀማሉ። ክምር ቅንብሩ ጠቅላላ RSS ገደብ አይደለም; በጣም ትላልቅ ስብስቦች አሁንም የልጆችን ማህደረ ትውስታን ያሟጥጡ እና ሩጫውን በደህና ያጣሉ. የ1024 MB ነባሪ ለነባሪ ባለ 500-ረድፍ ባች 512 KiB ቅርሶች የነቃላቸው አካላት ያሏቸው፣ BigQuery's byte-chunked JSON ተከታታይነትን ጨምሮ። ባለ 10000 ረድፎች አካላት ስብስብ ደህና አያደርገውም። V8 ክምር ድካም ሊተገበር የሚችል ውድቀትን ይመዘግባል-የባች መጠን ዝቅተኛ ወይም `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` ያሳድጉ; ጠቋሚው በመጨረሻው የተረጋገጠ ባች ላይ ይቆያል። ታሪካዊ inline/disk አካላት በዘመናዊው የቅርስ ቆብ አይሸፈኑም። ኦፕሬተሮች RSS ለየብቻ ማበጀት አለባቸው፣በተለይ የማህደረ ትውስታ-ውሱን መያዣዎች።

ልጁ የሚወርሰው የተፈታ `DATA_DIR`፣ `NODE_ENV`፣ ግልጽ `TZ` (የቆየ የፋይል ስም የአካባቢ-ጊዜ ጥራት)፣ ባለበት ጊዜ `ELECTRON_RUN_AS_NODE` እና የሚከተሉትን የወጪ ግብአቶች `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (እና ትንሽ ሆሄያቸው) `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. አንድ ዓለም አቀፍ Undici ላኪ የአገልጋዩን ንፁህ የአካባቢ-ተኪ መፍታት እና የአካባቢ-አስተናጋጅ ማለፊያ ደንቦችን ያካፍላል፣ `NO_PROXY`; `proxyFetch.ts` ወይም DB/feature ባንዲራዎቹን አያስመጣም። የተኪ ምስክርነቶች ከተላለፈው ውጤት እና ከተመዘገቡ ስህተቶች ተቀንሰዋል። የመድረሻ ምስክርነቶች የሚጓዙት በአንድ ጅምር IPC መልእክት ብቻ ነው፣ በጭራሽ argv ወይም አካባቢ; output/error ማስተላለፍ ቅድመ ቅጥያ እና የጸዳ ነው። የNode's SQLite እያንዳንዱን የክሮን ሩጫ ማስጠንቀቂያ ላለመድገም በልጅ exec ክርክሮች ውስጥ `ExperimentalWarning` ብቻ ተሰናክሏል። ሌሎች የማስጠንቀቂያ ዓይነቶች አሁንም ይታያሉ።

የመዳረሻ ሞጁሎች ያለ Next.js/server-only ጥገኛ መሆን አለባቸው። አሁን ያለው BigQuery ትግበራ ያንን ውል ያሟላል። የመዳረሻ ማስመሰያ መሸጎጫ የሚቆየው ለልጁ ሩጫ ብቻ ነው እንጂ በመሮጥ ላይ አይደለም። መስቀለኛ መንገድ የሚደገፈው የሩጫ ጊዜ (`package.json` ሞተሮች) ነው። ምርጥ ጥረት፣ የማይደገፍ Bun ተኳሃኝነት ዱካ አለ (`bun:sqlite` በ `src/lib/db/core.ts` /አስማሚ እና `Dockerfile.bun`)፣ ስለዚህ ወደ ውጭ የሚላኩ ምርቶች በእሱ ስር መሰባበር የለባቸውም። በ Bun ስር ወደ ውጭ የሚላኩ ምርቶች ቀዳሚውን በሂደት ላይ ያለውን መንገድ ያቆያሉ እና የአንድ ጊዜ ማስጠንቀቂያ ይሰጣሉ፡ የልጅ heap/timeout ማግለል የለም። ለክስተት-loop እና OOM ማግለል መስቀለኛ መንገድን ይጠቀሙ።

`includeBodies` ሲነቃ የሰዓት ጭነት መዝገብ ከመሰብሰብ ይልቅ እንደ `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` ያለ የደቂቃ ደረጃን ይምረጡ። የቡድን እና የረድፍ ገደቦች አሁንም እያንዳንዱን ሩጫ ያስራሉ። የሂደቱ ጅምር በአንድ መድረሻ በአንድ ሩጫ ይከፈላል; ይህ ለአገልጋይ ክስተት-loop ማግለል አነስተኛ የማስጀመሪያ ወጪ ይገበያያል እንጂ አጠቃላይ CPU አጠቃቀም አይቀንስም።

### የተጫኑ ጭነቶች (ፍላጎቶች እና ማጠናቀቂያዎች)

በነባሪነት ወደ ውጭ መላክ የምዝግብ ማስታወሻዎችን የማጠቃለያ መስኮችን ብቻ ይይዛል** ዝርዝር** ያሳያል። በማብራት ላይ** ጥያቄዎችን እና ምላሾችን ወደ ውጭ ላክ** (`includeBodies`) በተጨማሪም መዝገቦቹ ምን ይልካሉ።** ዝርዝር** ፓነል ለእያንዳንዱ ጥሪ ያሳያል

| መስክ                              | የሚይዘው                                         |
| -------------------------------- | --------------------------------------------- |
| `request_body` / `response_body` | ዳሽቦርዱ ሲያቀርብላቸው ጥሪው ይጫናል።                      |
| `pipeline_route_decision`        | ራውተር የመረጠው የትኛውን ኢላማ እና ሞዴል ነው።               |
| `pipeline_client_request`        | ጥሬው ጥያቄው ልክ ደንበኛው እንደላከው                      |
| `pipeline_openai_request`        | ወደ ውስጣዊ OpenAI ቅርጽ ከተተረጎመ በኋላ                 |
| `pipeline_provider_request`      | በትክክል ወደላይ እንደተላከ፣ በአቅራቢው ዘዬ                  |
| `pipeline_provider_response`     | ወደ ላይ ያለው ጥሬ ምላሽ                              |
| `pipeline_client_response`       | ለጠሪው የተመለሰለት                                  |
| `pipeline_error`                 | ላልተሳካ ጥሪ የቧንቧ መስመር ደረጃ ስህተት ዝርዝር              |
| `bodies_truncated`               | ከላይ ያለው ማንኛውም መስክ `maxBodyBytes` ሲመታ እውነት ነው። |

ይህ ፈጣን ይዘት ነው፣ እንደዛም ነው።** በነባሪ ጠፍቷል** እና ሆን ተብሎ የመድረሻ ምርጫ። ምን መርከቦች የሚያሳየው ዳሽቦርዱ ነው፣ ምክንያቱም ኤክስፖርት እና `getCallLogById` የዝርዝር መፍታትን ስለሚጋሩ፡ የሚጫኑ ጭነቶች ቀድሞውንም በPII ንፁህ እና በሚስጥር የተሰረዙ ሲሆኑ ሲፃፉ ደግሞ በ `noLog` API ቁልፍ የተደረገ ጥሪ ምንም አይነት ጭነት አያከማችም ስለዚህ ወደ ውጭ የሚላከው ምንም ነገር የለም።

የሚከፈሉ ጭነቶች የሚነበቡት ከፋይል ሲስተም አርቲፊክት ነው፣ ስለዚህ እርጥበት የሚሄደው ለጠየቁት መዳረሻዎች ብቻ ነው። የጎደለ ወይም የተበላሸ ቅርስ ማጠቃለያውን ከጥቅሙ ወድቆ ጠቋሚውን ከማሰር ይልቅ ባዶ ጭነቶች ወደ ውጭ ይልካል።

`maxBodyBytes` (ነባሪ 262144) እያንዳንዱን መስክ ይይዛል። ረዣዥም ጭነቶች ናቸው።** ከመውደቅ ይልቅ የተቆረጠ** — የተቀነጨበ ጥያቄ አሁንም "የተጠየቀውን" — ይመልሳል እና ረድፉ በ `bodies_truncated` ተጠቁሟል። የተዘዋወሩ ቸንክ-በ-ክፍል ዴልታዎች ወደ ውጭ አይላኩም; የተሰበሰበው ምላሽ አስቀድሞ `pipeline_provider_response` እና `pipeline_client_response` ውስጥ ነው።

---

## 2. ፋይሎች

| ክፍል              | መገኛ                                          |
| ---------------- | -------------------------------------------- |
| የመዳረሻ ውል         | `src/lib/logExport/types.ts`                 |
| መዝገብ             | `src/lib/logExport/registry.ts`              |
| የሚስጥር አያያዝ       | `src/lib/logExport/secrets.ts`               |
| አስኬጅ (የወላጅ IPC)  | `src/lib/logExport/runner.ts`                |
| የሂደት የሕይወት ዑደት   | `src/lib/logExport/childRunner.ts`           |
| የልጅ ሂደት መግቢያ     | `src/lib/logExport/exportChild.ts`           |
| ለንባብ ብቻ ከፋች      | `src/lib/db/logExportReadOnly.ts`            |
| የጋራ መጠይቅ/ማዛመድ    | `src/lib/usage/callLogExportQueries.ts`      |
| ዝርዝር ፈቺ          | `src/lib/usage/callLogDetailResolver.ts`     |
| የAPI ውሂብ ቅርጽ     | `src/lib/logExport/presenter.ts`             |
| የBigQuery መዳረሻ   | `src/lib/logExport/destinations/bigquery.ts` |
| የGoogle SA ማረጋገጫ | `src/lib/logExport/googleServiceAccount.ts`  |
| የጥሪ መዝገብ ምንጭ     | `src/lib/usage/callLogExportSource.ts`       |
| ቋሚ ማከማቻ          | `src/lib/db/logExportDestinations.ts`        |
| የCron ሥራ         | `src/lib/jobs/logExportJob.ts`               |
| የREST ንብርብር      | `src/app/api/log-export/`                    |
| የዳሽቦርድ ገጽ        | `src/app/(dashboard)/dashboard/log-export/`  |

መዋቅር: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

ሁሉም መስመሮች የአስተዳደር ማረጋገጫ ይፈልጋሉ (`requireManagementAuth`)። ሚስጥሮች ፈጽሞ አይመለሱም፦
የተከማቸ ሚስጥር እንደ ቀጥተኛው እሴት `__stored__` ይመለሳል፣ እና በማዘመን ጊዜ ያንን እሴት መልሶ መላክ
የተከማቸውን የመዳረሻ ማረጋገጫ ይጠብቃል።

ዓይነቱ ሚስጥር እንደሚኖረው የሚገልጽ መዳረሻ መፍጠር ወይም ማዘመን **`STORAGE_ENCRYPTION_KEY`
ያስፈልገዋል**። ይህ ከሌለ `encrypt()` ምንም ሳይቀይር በዝምታ ያሳልፋል፣ ስለዚህ የመዳረሻ ማረጋገጫን በSQLite ውስጥ ያለ ምስጠራ ከማስቀመጥ ይልቅ
የመጻፍ ጥያቄው በ400 ምላሽ ውድቅ ይደረጋል (የTelegram webhook
የሚጠቀምበት ተመሳሳይ ጥበቃ)።

| ዘዴ       | መንገድ                                     | ዓላማ                                            |
| -------- | ---------------------------------------- | ---------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | የመዳረሻ ዓይነቶች + የውቅር መስኮቻቸው ዝርዝር                 |
| `GET`    | `/api/log-export/destinations`           | መዳረሻዎችን መዘርዘር (ሚስጥሮች ተደብቀው)                    |
| `POST`   | `/api/log-export/destinations`           | መዳረሻ መፍጠር                                      |
| `GET`    | `/api/log-export/destinations/{id}`      | አንድ መዳረሻ ማንበብ                                  |
| `PUT`    | `/api/log-export/destinations/{id}`      | ስም / መንቃት / ውቅር / በቡድን ማቀናበርን ማዘመን             |
| `DELETE` | `/api/log-export/destinations/{id}`      | መሰረዝ                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | የመዳረሻ ማረጋገጫዎችን መፈተሽ፣ ምንም አለመጻፍ                 |
| `POST`   | `/api/log-export/destinations/{id}/run`  | አሁን የሚጠብቀውን ሁሉ ማስወጣት፣ ከታቀደው አሂድ ጋር በተመሳሳይ መንገድ |
| `GET`    | `/api/log-export/status`                 | የCron ሁኔታ፣ የቅርብ ጊዜ አሂዶች፣ በእያንዳንዱ ዒላማ የተጠራቀመ ሥራ |

`GET /api/log-export/types` የUI አጠቃላይ እንዲሆን የሚያደርገው ነው፦ የዳሽቦርዱ ቅጽ የሚታየው
ከተመለሱት የመስክ ገላጮች በመነሳት ስለሆነ፣ አዲስ መዳረሻ የUI ለውጥ አያስፈልገውም።

---

## 4. BigQuery መድረሻ

የውቅረት ቁልፎች (`type: "bigquery"`):

| ቁልፍ                  | ማስታወሻ                                                                              |
| -------------------- | ---------------------------------------------------------------------------------- |
| `projectId`          | ዳታሴቱን የያዘው GCP ፕሮጀክት                                                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                    |
| `tableId`            | `[A-Za-z0-9_]+`                                                                    |
| `location`           | ዳታሴቱ መፈጠር ሲኖርበት ብቻ ይጠቀማል (ነባሪው `EU`)                                               |
| `serviceAccountJson` | የአገልግሎት መለያ ቁልፍ። ሚስጥራዊ፦ በማከማቻ ላይ ተመስጥሮ ይቀመጣል፣ በፍጹም አይመለስም                          |
| `autoCreate`         | የጎደለውን ዳታሴት/ሠንጠረዥ ይፍጠሩ፤ በሁኔታዊ መልኩ ባዶ ሊሆኑ የሚችሉ የአጠቃቀም-ማስረጃ አምዶችን ይጨምሩ (ነባሪው `true`) |

የአገልግሎት መለያው በታለመው ሠንጠረዥ ላይ `bigquery.tables.updateData` ፈቃድ፣ እንዲሁም
`autoCreate` ንቁ ሲሆን `bigquery.datasets.create` / `bigquery.tables.create` ፈቃዶች ያስፈልጉታል።
ነባር ሠንጠረዥን ሁለቱን ባዶ ሊሆኑ የሚችሉ የአጠቃቀም-ማስረጃ መስኮች ለመጨመር ማዘመንም
`bigquery.tables.update` ይፈልጋል። የጎደለ ፈቃድ ሲኖር ኤክስፖርቱ የኩርሰሩን አቀማመጥ ሳያራምድ ይከሽፋል።

የተዋቀረ ባች የ**ኩርሰር** ክፍል ነው፣ የHTTP ክፍል አይደለም፦ `send()` ባቹን ቢበዛ 500 ረድፎች ወደሚይዙ
insertAll ጥሪዎች ይከፋፍለዋል፤ ስለዚህ ትልቅ `batch_size` የBigQueryን 10 MB የጥያቄ ገደብ ሊያልፍ አይችልም።
ጊዜያዊ ሁኔታዎች (408/429/500/502/503/504) ተመሳሳይ insertIds እንደገና በመጠቀም በexponential
backoff እስከ ሦስት ጊዜ ድረስ እንደገና ይሞከራሉ፤ የማረጋገጫ እና የስኪማ እክሎች ግን
ሩጫውን ሳያባክኑ በመጀመሪያው ሙከራ ላይ ስህተት ያስነሳሉ።

አሁን የተፈጠረ ሠንጠረዥ ለstreaming endpoint ወዲያውኑ አይታይም፤ ለጥቂት ሰከንዶች
404 ይመልሳል። ይህ 404 እንደገና ይሞከራል፣ ነገር ግን **ይህ ሩጫ ሠንጠረዡን የፈጠረው
ሲሆን ብቻ ነው** — በእውነት የጎደለ ሠንጠረዥ ወዲያውኑ ይከሽፋል። በቅርቡ በተሰረዘ
ስም ሠንጠረዥን እንደገና መፍጠር BigQuery የstreaming insert ጥያቄዎችን ለብዙ ደቂቃዎች
እንዲከለክል ያደርገዋል። ይህ የመሰረዝ-ከዚያም-እንደገና-መፍጠር ባህሪ ነው፤ ስለዚህ
አንድን ሠንጠረዥ ከመጣልና እንደገና ከመጨመር ይልቅ አዲስ የሠንጠረዥ ስም መጠቀም ይመረጣል።

**ከፊል አለመሳካት እንደ HTTP 200 ከባዶ ያልሆነ `insertErrors[]` ጋር ይደርሳል።** ይህ
እንደ አለመሳካት ይቆጠራል እና ስህተት ያስነሳል፤ ይህም BigQuery በፍጹም ያልተቀበላቸውን
ረድፎች አልፎ ኩርሰሩ እንዳይራመድ ያደርጋል። `tests/unit/log-export-bigquery.test.ts` ይህን
ባህሪ ያረጋግጣል።

መጓጓዣው መደበኛ REST ነው — በራስ-የተፈረመ RS256 assertion በ
`https://oauth2.googleapis.com/token` ላይ ለaccess token ይለወጣል፣ ከዚያም ረድፎቹ ወደ
`tabledata.insertAll` ይላካሉ። ምንም Google SDK አይጨመርም። Access token ዎች በሂደት ውስጥ
በእያንዳንዱ (service account, scope) ይሸጎጣሉ።

የተፈጠረው ሠንጠረዥ ለእያንዳንዱ የLogs ትር መስክ አንድ አምድ እና `exported_at` ይይዛል፣ እና
የጥሪ ሎጎች በተግባር ለሚጠየቁበት መንገድ ይደራጃል፦

- **በ`timestamp` የቀን ክፍል ይከፋፈላል**፣ ስለዚህ በቀን የተገደበ ጥያቄ እነዚያን ቀናት ብቻ ይመረምራል።
- **በ`api_key_name`, `provider`, `model`, `status` ይክላስተራል** (በዚህ ቅደም ተከተል)፣ ስለዚህ ማን
  እንደሠራው፣ ወዴት እንደተላከው ወይም እንደከሸፈ በመለየት በእያንዳንዱ ክፍል ውስጥ ያሉ ብሎኮች
  ይቀነሳሉ። BigQuery ቢበዛ አራት የክላስተር አምዶችን ይፈቅዳል፣ እና ቅደም ተከተሉ ጠቃሚ ነው፦
  በ`api_key_name` ብቻ የሚደረግ ማጣሪያ ይቀንሳል፣ በ`status` ብቻ የሚደረግ ማጣሪያ ግን አይቀንስም።
- **እንደ አማራጭ የክፍል ማቆያ** በ`partitionExpirationDays` (0 ሁሉንም ያቆያል)፣ ሠንጠረዡ ሲፈጠር ይተገበራል።

ሁለቱም ቅንብሮች በመፍጠሪያ ጊዜ ብቻ ይተገበራሉ። ነባር ሠንጠረዥ ቀድሞ የነበረውን
አቀማመጥ ይጠብቃል፤ ስለዚህ እነዚህን ለመጠቀም ከፈለጉ መድረሻውን ወደ አዲስ የሠንጠረዥ መለያ
ያመልክቱ።

`tests/unit/log-export-bigquery.test.ts` ካርታ ሰሪው እና የሠንጠረዡ ስኪማ በትክክል አብረው
እንደሚሄዱ ያረጋግጣል፤ ስለዚህ አዲስ የጥሪ-ሎግ አምድ በመውጫ መንገድ ላይ በዝምታ
ሊጠፋ አይችልም።

ባቾች በ**ሁለቱም የረድፍ ብዛት እና በተከታታይ የተደረጉ ባይቶች** ይከፋፈላሉ። የረድፍ ብዛት
ብቻ በቂ አይደለም፤ payload ዎች ኤክስፖርት ከተደረጉ በኋላ፣ ጥያቄዎችን የያዙ 500 ረድፎች
እስከ አስር ሜጋባይት ሊደርሱ ይችላሉ፣ እና insertAll ከ10 MB በላይ የሆነ ጥያቄን ውድቅ
ያደርጋል። ክፍሎች 500 ረድፎች ወይም 9 MB ላይ — የትኛው ቀድሞ ከደረሰ በእሱ ላይ — ይዘጋሉ።

---

## 5. OTLP/HTTP የtrace መድረሻ

ውቅሩ `type: "otlp-http"` ይጠቀማል። ይህ የተቀመጡ የጥሪ ምዝገባዎችን የሚልክ በመርሐ-ግብር የሚሰራ፣ cursor-የሚደገፍ ማስወጫ ነው፤ በ
`open-sse/services/routing/otel.ts` ውስጥ ካለው በተቻለ መጠን ብቻ የሚሰራ የቀጥታ routing-event sink ጋር
አንድ ዓይነት አይደለም። የዚያን sink የአካባቢ ተለዋዋጮች፣ ሰዓት ቆጣሪዎች ወይም ቋቶች አያነብም እና አይቀይርም። ሁለቱንም ማንቃት ሁለት ገለልተኛ ዓይነቶች ያላቸው spans ሊያመነጭ ይችላል፤ እነዚህን የጥሪ-ምዝገባ spans ለመለየት
`omniroute.log-export` የመሳሪያ ወሰንን ይጠቀሙ።

| Key                      | Default / purpose                                                |
| ------------------------ | ---------------------------------------------------------------- |
| `endpoint`               | የሚያስፈልግ ሙሉ HTTP(S) traces URL፤ የ`/v1/traces` ቅጥያ አይጨመርም          |
| `headers`                | አማራጭ `Name: value` መስመሮች ወይም የstrings JSON object፤ የተመሰጠረ        |
| `requestHeaderAllowlist` | ባዶ (ጠፍቷል)፤ እንደ span attributes ለመያዝ የclient header ስሞች/ቅድመ-ቅጥያዎች |
| `serviceName`            | `omniroute`፤ resource `service.name`                             |
| `langfuseMapping`        | `false`፤ የLangfuse generation/session/user attributes ይጨምራል      |
| `identity`               | `pseudonymous`፣ `keyName` ወይም `none`                             |
| `paths`                  | `/v1/chat/completions`፣ `/v1/responses`፣ `/v1/messages`          |
| `timeoutMs`              | በእያንዳንዱ HTTP ሙከራ `30000`                                         |
| `environment`            | አልተዘጋጀም፤ አማራጭ `langfuse.environment`                             |

አጠቃላይ dashboard እነዚህን መስኮች ያሳያል። `paths` የAPI array ወይም ትክክለኛ paths በአዲስ መስመር/ኮማ የተለዩበት textarea ይቀበላል። Embeddings፣ rerank እና ሌሎች paths በግልጽ ካልተፈቀዱ ይዘለላሉ። የተዘለሉ ረድፎች አሁንም cursorን ያራምዳሉ፤ የነባሩ runner `exported`/`exportedTotal` counters የተሰሩ የምንጭ ረድፎችን፣ የተጣሩ ረድፎችንም ጨምሮ፣ እንጂ የተቀበሉ spansን አይቆጥሩም። ማጣራቱ በchild ውስጥ ይከናወናል፤ የIPC/cursor contractን ሳይቀይር።

የURL ማረጋገጫ ከDB ነፃ የሆነውን `parseAndValidateNonMetadataUrl` helper ከ
`src/shared/network/outboundUrlGuard.ts` ይጠቀማል፦ `block-metadata` policy። ከwebhook validator ጋር ተመሳሳይ ያልተቋረጠ የmetadata/protocol/embedded-credential ምርመራ አለው፤ ነገር ግን private URLs ተፈቅደውለታል፣ እና ያለ global feature-flag override localhost/LAN targetsን ሆን ብሎ ይፈቅዳል። ይህ self-hosted Langfuse፣ Phoenix፣ Tempo እና Collector endpointsን፣ private HTTP endpointsንም ጨምሮ፣ እንዲጠቀሙ ያስችላል። Cloud-metadata hosts ሁልጊዜ ይታገዳሉ። Redirects አይከተሉም፤ ስለዚህ collector ምስጢራዊ መረጃዎችን ወደ ሌላ host ማዞር አይችልም። እንደ ነባሩ lexical URL guard፣ ይህ የDNS resolutionን አያስቀምጥም፤ ስለዚህ operator በሚቆጣጠራቸው hosts ብቻ ያዋቅሩ። endpoint በታመነ ኔትወርክ ላይ ካልሆነ HTTPSን ይመርጡ።

### Payload እና ማድረስ

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) ለእያንዳንዱ የተፈቀደ ረድፍ አንድ
CLIENT span ይይዛል፤ ስሙም ትክክለኛው request path ነው። የpath ስያሜ Chat Completions፣ Responses እና Messagesን ይለያል፤ የmodel ወይም identity መረጃን በspan ስም ውስጥ ሳያስገባ። Resource attributes `service.name` እና የpackageውን `service.version` ያካትታሉ።

መደበኛው chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) ሲጠናቀቅ
`duration = Date.now() - startTime` ይጽፋል፤ timestamp ግን አያቀርብም።
`src/lib/usage/callLogs.ts` ውስጥ ያለው `saveCallLogOperation` timestampን በመጻፍ
(በመጠናቀቂያ) ጊዜ ላይ በነባሪ ያደርገዋል። ስለዚህ export endን ከረድፉ timestamp እና startን ደግሞ end − duration
( milliseconds ወደ decimal nanoseconds ተቀይሮ) ያዘጋጃል። በcaller የቀረቡ ታሪካዊ timestampsም እንዲሁ እንደ end time ይጠበቃሉ፤ በእያንዳንዱ ረድፍ start/completion ለመለየት የሚያስችል መረጃ የለም። Null duration ወደ ዜሮ ይቀየራል። ልክ ያልሆኑ/የጎደሉ timestamps batchን ያሳጥራሉ፤ ያልተወሰኑ spans አይፈጠሩም። `ttftMs` nullable ነው እና ወደ `omniroute.ttft_ms` ይተረጎማል።

Attributes `gen_ai.operation.name="chat"`፣ provider፣ requested/response model፣ input/output tokens፣ አማራጭ cache-read/cache-creation/reasoning tokens፣ HTTP status፣ combo፣ cache source፣ session tag እና correlation id ያካትታሉ። Integer OTLP values እና timestamps እንደ decimal strings ይቀመጣሉ፤ strings፣ booleans እና fractional numbers ደግሞ የተፈጥሮ OTLP value variantsን ይጠቀማሉ። Error spans ERROR status እና የተጣራ status message አላቸው። የcanonical record upstream host URL ስለሌለው፣ collectorን በስህተት እንደ model server ከመለየት ይልቅ `server.address` አይካተትም። Cost አይላክም።

`includeBodies=true` ብቻ contentን ያስገባል። ከ
`langfuseMapping=false` ጋር፣ `gen_ai.input.messages` / `gen_ai.output.messages` በOmniRoute እንደተቀመጠው የተጣራ request/response body JSONን ይይዛሉ (ሊተነተን ከቻለ canonicalized ይሆናል)፤ እንደገና የተቀረጸ semconv messages array አይደሉም። Clipped/non-JSON bodies እንደ raw text ይቀራሉ። `langfuseMapping=true` ሲሆን bodies እንደ `langfuse.observation.input` / `langfuse.observation.output` ብቻ ይላካሉ፤ እያንዳንዱ body አንድ ጊዜ ብቻ እንዲላክ `gen_ai.*.messages` attributes አይካተቱም። ሁለቱም modes ከነባሩ hydration path `maxBodyBytes`ን ይወርሳሉ፤
`omniroute.bodies_truncated=true` መቆረጡን ያመለክታል። በዚህ destination ምክንያት ተጨማሪ pipeline snapshots ወይም ያልተጣሩ artifact reads አይጨመሩም፤ አማራጭ request-header capture ከታች የተገለጸውን ነባር hydrated client snapshot ይጠቀማል። bodiesን በምትልኩበት ጊዜ የሰዓት በየሰዓቱ የሚሰበሰብ backlog ከመፍጠር ይልቅ እንደ `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` ያለ የደቂቃ ደረጃ cadence ይጠቀሙ።

### አማራጭ የclient request headers

Header capture **በነባሪ ጠፍቷል**። በdestination config ውስጥ `requestHeaderAllowlist`ን ያዘጋጁ እና **Export prompts and responses**ን ያንቁ
(`includeBodies: true` በdestination ላይ)። የallowlist የAPI array ወይም በአዲስ መስመር/ኮማ የተለዩ ስሞች ያሉበት textarea ይቀበላል፦

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

ስሞች የፊደል ማስቀመጫን ሳይለዩ እና በትክክል ይዛመዳሉ፤ ነገር ግን አንድ የመጨረሻ `*` ያልባዶ
የheader-name ቅድመ ቅጥያን ሊመርጥ ይችላል። ባዶ `*`፣ በመሃል የተገጠሙ wildcards እና ልክ ያልሆኑ የHTTP header ስሞች ውድቅ ይደረጋሉ።
ቢበዛ 64 selectors አሉ፤ እያንዳንዱም ስም/ቅድመ ቅጥያ ቢበዛ 256 ASCII bytes ሊኖረው ይችላል።
ይህ ቅንብር ላኪውን በcollector ላይ ከማረጋገጥ ከሚጠቀምበት `headers` የተለየ ነው።

Capture የሚያነበው ከተቀመጠው detailed pipeline `clientRawRequest` (ወይም የቆየው `clientRequest`) የተሞላውን `pipeline_client_request` ብቻ ነው። ወደ provider request headers ፈጽሞ አይመለስም።
ጥያቄው በተመዘገበበት ጊዜ detailed pipeline logging መነቃቃት ነበረበት።
`includeBodies` ከተሰናከለ፣ ወይም የclient-snapshot JSON ከጠፋ፣ ከተበላሸ ወይም ከተቆረጠ፣ ምንም header attributes አይላኩም።
`maxBodyBytes` መጨመር በexport ጊዜ የሚከሰተውን snapshot መቆረጥ ሊከላከል ይችላል፤ ነገር ግን ፈጽሞ ያልተቀመጠ ዝርዝርን መመለስ አይችልም።
ከ1 MiB በላይ የሆነ ወይም ከ256 በላይ header entries የያዘ snapshot ችላ ይባላል። ነባሩ prompt/response export ከheader capture ጎን ለጎን እንደነበረ ይቀጥላል፤ allowlist የheaders-only hydration mode አያቀርብም።

የተመረጡ እሴቶች ወደ `http.request.header.<full lowercase header name>` OTLP string arrays ይቀየራሉ፤ አንድ ብቻ string ቢሆንም እንኳ። ለምሳሌ፣
`X-OmniRoute-Meta-Team: example-team` ወደ
`http.request.header.x-omniroute-meta-team` ይቀየራል፣ ይህም
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` ይሆናል።
ሙሉ ቅድመ ቅጥያው ይጠበቃል፤ እነዚህ መደበኛ headers ናቸው፣ የbusiness-field parsing ወይም የ`omniroute.metadata.*` / Langfuse metadata conversion አይደረግባቸውም።
`langfuseMapping` የheader semantics አይቀይርም። አንድ እሴት ብቻ ያለው `User-Agent` ከተመረጠ መደበኛውን scalar `user_agent.original` ይወስናል። በአንድ እሴት ውስጥ ያሉ commas አይከፈሉም። የcase ልዩነት ያላቸው ቅርጾች በተቀመጡበት entry order ይዋሃዳሉ፤ ልክ ያልሆነ variant ካለ ግን ያ header በሙሉ አይካተትም። Attributes በlowercase ስም ቅደም ተከተል ይደራጃሉ።

Authorization፣ Proxy-Authorization፣ Cookie፣ Set-Cookie፣ API-key headers፣ auth/token/secret/password/credential markers የያዙ ስሞች እና የውስጥ gateway credentials ሁልጊዜ ይገለላሉ፤ ቢመረጡ ወይም በstorage ውስጥ በከፊል masked ቢሆኑም እንኳ።
የታወቁ credential patterns የጋራ credential detector ን እንደገና ይጠቀማሉ፤ redaction markers ይወገዳሉ እንጂ እንደደህና እሴቶች አይላኩም።
strings እና ባዶ ያልሆኑ string arrays ብቻ ይቀበላሉ፤ numbers ወይም objects ወደ ሌላ አይነት አይቀየሩም።
ልክ ያልሆኑ ስሞች፣ prototype keys፣ control characters (ከhorizontal tab በስተቀር) እና የተበላሸ Unicode በbatch ሳይሳካ ወይም ይዘታቸው በerrors ውስጥ ሳይንጸባረቅ ችላ ይባላሉ።

እያንዳንዱ span ቢበዛ 32 headers፣ በእያንዳንዱ header 16 values፣ ለእያንዳንዱ value 4096 UTF-8 bytes፣ እና በተያዙ header ስሞችና እሴቶች ሁሉ ድምር 16384 UTF-8 bytes ይይዛል።
መጠናቸውን ያለፉ/ልክ ያልሆኑ headers ሙሉ በሙሉ ይወገዳሉ፤ አይቆረጡም።
Selection የoperator privacy ውሳኔ ነው፤ ደህና የሚመስሉ ስሞች እንኳ የግል መረጃ ሊይዙ ይችላሉ፣ እነዚህም bounds/detectors አጠቃላይ PII scrubber አይደሉም።

### የማድረስ ገደቦች

Requests ወደ 500 spans እና 4 MiB UTF-8 JSON ይገደባሉ፤ envelope ጨምሮ።
እያንዳንዱ allowed span ከcursor batch የመጀመሪያ request በፊት የመጠን ምርመራ ያልፋል።
ከግደቡ የሚበልጥ አንድ span የዚያን batch ክፍል ሳይልክ ይቀራል እና `maxBodyBytes` እንዲቀነስ መመሪያ ያለው ስህተት ይፈጥራል፤ በዝምታ አይጣልም።
Preflight የrecord references እና byte counts ብቻ ይይዛል፤ እያንዳንዱን temporary span/JSON ይሰርዛል። spans የbatch ሁለተኛ የተከተበ ቅጂ ሳይያዝ ለተወሰኑ bounded chunks እንደገና ይገነባሉ። HTTP 408/429/5xx፣ network failures እና timeouts ቢበዛ
ሶስት attempts ያገኛሉ፣ በ250/500 ms exponential backoff። `Retry-After` seconds ወይም HTTP dates
delay እስከ 5 seconds ሊያራዝሙ ይችላሉ። ሌሎች statuses ወዲያውኑ ይሳካሉ። OTLP 2xx partial rejection እንዲሁ ከacknowledge
ሳይደረግ የጠፋ span ስለሚያመለክት ስህተት ይጥላል፤ ባዶ ወይም ልክ ያለው JSON acknowledgements ይቀበላሉ፣ የresponse-read ገደቡም
64 KiB ነው።

Errors የላኪው ባለቤትነት ያላቸውን እውነታዎች ብቻ ይይዛሉ፦ HTTP status፣ retry class፣ attempts እና sent span counts፣ ወይም ቋሚ የacknowledgement/network failure አገላለጽ።
የCollector response bodies፣ partial-success counts እና response headers በerrors፣ logs ወይም dashboard ውስጥ ፈጽሞ አይቀዱም።
የተሳካ ያልሆነ ወይም በከፊል የተቀበለ batch acknowledge አይደረግም፤ destination በዚያ status `Failing` ይሆናል፣ cursor በመጨረሻ በተቀበለው batch ላይ ይቆያል፣ እና ቀጣዩ run ተመሳሳይ rows እንደገና ይልካል።
Permanent statuses collector ወይም configuration እስኪስተካከል ድረስ መሳካታቸውን ይቀጥላሉ። ለresponse details የcollector የራሱን logs ይጠቀሙ።
የCall-log error summaries የራሳቸውን የredaction ሂደት ይጠብቃሉ።
`prepare()` ምንም ነገር አያዘጋጅም፤ Test በትክክል `{"resourceSpans":[]}` ይልካል እና
HTTP status ያሳያል፣ call-log spans ሳይጽፍ።

Trace ids እና span ids የSHA-256 የመጀመሪያ 32/16 hex digits ናቸው፤ ይህም በ
`"omniroute.trace\\0" + callLogId` እና `"omniroute.span\\0" + callLogId` ላይ ይሰላል። እንደገና የሚላኩት
identical ids ይይዛሉ። ይህ የdeduplication ዋስትና አይደለም፤ Langfuse
v4 ingestionን ጨምሮ አንዳንድ backends ተመሳሳይ-id spans አያጣምሩም። አንድ crash ወይም partial chunk failure
ቢከሰት እንደገና ሊላክ የሚችለው ቢበዛ ያልተቀበለው cursor batch ብቻ ነው፤ ያ ሙሉ batch ሊደገም ይችላል እንጂ የመጨረሻው HTTP chunk ብቻ አይደለም። የcursor batch size ሲመርጡ ይህን ልውውጥ በአሳብ ያስገቡ።

### የLangfuse ምሳሌ

በራስዎ በሚያስተዳድሩት Langfuse instance እነዚህን fields ያዋቅሩ፦

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

የAuthorization እሴቱን በአካባቢዎ የliteral `public-key:secret-key`
string ወደ Base64 በመቀየር ይገንቡ፤ ለምሳሌ `Buffer.from(publicKey + ":" + secretKey).toString("base64")` በመጠቀም።
እውነተኛ credentials በlogs፣ screenshots ወይም issues ውስጥ አያስገቡ። Mapping በራስ-ሰር
`x-langfuse-ingestion-version: 4` ያዘጋጃል፤ Authorization ግን አሁንም በ`headers` ውስጥ መቅረብ አለበት።
ሁለቱም headers እና የተፈጠረው identity salt ነባሩን encrypted secret-field mechanism እና API placeholders ይጠቀማሉ፤ `STORAGE_ENCRYPTION_KEY` ያስፈልጋል።

Mapping የማመንጨት አይነት/ሞዴል፣ የJSON አጠቃቀም ዝርዝሮች (ግብዓት/ውጤት/ጠቅላላ እና የሚገኙ
የመሸጎጫ ቁልፎች)፣ የJSON ግብዓት/ውጤት ቅጽበታዊ ምስሎች፣ ERROR/DEFAULT ደረጃ፣ የተጣራ
የሁኔታ መልዕክት፣ የtrace ስም፣ የsession መለያ፣ እንዲሁም እንደ provider፣ የተጠየቀ ሞዴል፣ path፣ combo፣ የመሸጎጫ
ምንጭ እና ሁኔታ ያሉ መረጃዎችን የሚያመለክቱ አማራጭ አካባቢ እና ማጣሪያ ሊደረግበት የሚችል
`langfuse.observation.metadata.<key>` ይጨምራል። `langfuse.observation.completion_start_time` በመጀመሪያ ጊዜ የISO 8601 ቅርጸት ነው፤
TTFT የሚታወቅ እና በቆይታው ውስጥ ብቻ ሲሆን ከTTFT ጋር ይጨመራል። ምንም የወጪ ባህሪያት አይላኩም።

የማንነት ሁነታዎች ለ`langfuse.user.id` ይተገበራሉ፦

- `pseudonymous` (ነባሪ)፦ የAPI ቁልፉ የውስጥ መለያ ከየመድረሻው ጋር ብቻ በሚያገለግል የ32-ባይት የዘፈቀደ ጨው HMAC-SHA256 ይሆናል። ጨዉ ከሌለ በመፍጠር ጊዜ ይመነጫል፣ እንደ `identitySalt` ይመሰጠራል፣ በፍጹም አይመለስም፣ እና በማስተካከያዎች ወቅት ይጠበቃል። ጥሬ የቁልፍ መለያዎች በspan ባህሪያት ውስጥ በፍጹም አይገቡም። የመድረሻውን ጨው እንደገና መፍጠር/መቀየር ማንነቶችን ይቀይራል።
- `keyName`፦ የተዋቀረው የAPI ቁልፍ ስም፣ ይህም የኦፕሬተሩን መለያ ሆን ተብሎ ያሳያል።
- `none`፦ ምንም የተጠቃሚ መለያ የለም። የsession መለያ ምልክቶች ሲኖሩ አሁንም ይላካሉ፤ እነዚህ ሁነታዎች የዘፈቀደ የጥያቄ ይዘትን ወይም በኦፕሬተር የቀረቡ የsession/ትስስር መለያዎችን ስም-አልባ አያደርጉም።

### ያለ backfill መጀመር

በመፍጠር ጊዜ ብቻ **ከአሁኑ ቦታ ጀምር (ያሉ ምዝገባዎችን ዝለል)** ን ያንቁ ወይም
በcreate API payload ከላይኛው ደረጃ `startFromCurrentPosition: true` ያስተላልፉ። ይህ ያለ migration የአሁኑን ከፍተኛ የተጠበቀ የcall-log rowid
በነባር cursor helpers በመጠቀም `cursor_row_id` ውስጥ ያስጀምራል። ነባሪው false ነው (cursor 0 እና የተጠበቀ ታሪክ backfill)።
ይህ በማዘመን ጊዜ የcursor ዳግም ማስጀመሪያ ቅንብር አይደለም።

የጋራው `ttftMs` መጨመር በBigQuery mapper እና በአዲሱ የሰንጠረዥ ስኪማ ላይ nullable `ttft_ms` ኮለም ይጨምራል፤ የስኪማ ሙከራውም እያንዳንዱ የcanonical መዝገብ መስክ ኮለም እንዲኖረው ይጠይቃል። ያሉ ሰንጠረዦች ለውጥ ሳይደረግባቸው መላክን ይቀጥላሉ፦ `prepare()` የሰንጠረዡን ስኪማ ያነባል እና ያ ኮለም ከሌለ ብቻ `ttft_ms` ን ያስወግዳል። TTFT በሚቀጥለው ሩጫ እንዲካተት nullable INT64 ኮለሙን ይጨምሩ ወይም አዲስ ሰንጠረዥ ይጠቀሙ። አማራጩ የTTFT ኮለም የስኪማ ማዘመኛን አያስነሳም። የአጠቃቀም-ማስረጃ ኮለሞች ከታች ያለውን ሁኔታዊ፣ በፈቃደኝነት የሚነቃ የተኳኋኝነት ሂደት ይከተላሉ፤ ሌሎች የረድፍ መስኮች ግን ጥብቅ የስኪማ ምርመራን ይጠብቃሉ።

---

## 6. መዳረሻ ማከል

1. `LogExportDestinationType` ወደ ውጭ የሚያቀርብ `src/lib/logExport/destinations/<name>.ts` ይፍጠሩ፦
   የZod `configSchema`፣ ለተጠቃሚ በይነገጹ የ`fields` ገላጭ ድርድር፣ `secretFields`፣ እና
   `test()` / `prepare()` / `send(records)` የሚመልስ `createClient(config)`።
2. በ`src/lib/logExport/registry.ts` ውስጥ ወዳለው `DESTINATIONS` ድርድር ያክሉት።
3. በ`tests/unit/` ስር ሙከራዎችን ይጻፉ።

ለውጡ ይህ ብቻ ነው፦ ቋሚ ማከማቻው፣ የcron ሥራው፣ የREST ንብርብሩ፣ የሚስጥር መረጃ ምስጠራው እና
የዳሽቦርዱ ቅጽ ሁሉም ከመዝገቡ ያነባሉ።

ለአዲስ መዳረሻ ሁለት ደንቦች አሉ፦

- `send()` ከፊል አለመሳካት ሲከሰት **ስህተት መወርወር አለበት**። በስኬት መጠናቀቅ ማለት «መዳረሻው እነዚህ ረድፎች አሉት» ማለት ነው፣
  እና ጠቋሚው እነሱን አልፎ በቋሚነት ወደፊት ይሄዳል።
- በተጠቃሚ የቀረበ URL የሚቀበል መዳረሻ፣ መረጃ ከማምጣቱ በፊት
  ልክ እንደ webhooks፣ በ`parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) አማካይነት ማረጋገጥ አለበት።
  BigQuery ይህን አያስፈልገውም፦ አስተናጋጆቹ ቋሚዎች ናቸው።

---

## 7. እሱን መጠቀም

- **ዳሽቦርድ**: Integrations → Log export። መድረሻ ያክሉ፣ ማረጋገጫዎቹን ረድፎች ሳይጽፉ ለመፈተሽ **Test** ያስኪዱ፣
  ከዚያም ያንቁት።
- **የተጠባባቂ ሥራ**: እያንዳንዱ የመድረሻ ካርድ በመጠባበቅ ላይ ያሉ ረድፎችን እና ጠቋሚውን ያሳያል፤ `GET
/api/log-export/status` ተመሳሳይ አሃዞችን ከመጨረሻዎቹ 20 የሥራ ማስኬጃዎች ጋር ይመልሳል።
- **አንድ ያልተሳካ መድረሻ ሌሎቹን አያስከፍልም** — የማስኬጃ ማጠቃለያው በ`last_status` / `last_error` ውስጥ የእያንዳንዱን መድረሻ ሁኔታ ይመዘግባል፣ እና የሥራ ማስኬጃ ታሪኩ ድምር ውጤቱን ይይዛል።
- **መድረሻን መሰረዝ ጠቋሚውን ይሰርዛል።** እንደገና ሲጨመር ከቆዩት የጥሪ ሎጎች ውስጥ ከአሮጌው ጀምሮ ይጀምራል፤ ይህም መድረሻው አስቀድሞ የያዛቸውን ረድፎች እንደገና እንዲልክ ሊያደርገው ይችላል። በBigQuery ላይ በየረድፉ ያለው `insertId` ይህንን የሚያስተናግደው በBigQuery የራሱ የድግግሞሽ ማስወገጃ ጊዜ መስኮት ውስጥ ብቻ ስለሆነ፣ መድረሻን ከመሰረዝ ይልቅ ማሰናከል ይመረጣል።

### የአጠቃቀም-ማስረጃ የስኪማ ተኳኋኝነት

አዲስ BigQuery ሰንጠረዦች አማራጭ `usage_evidence` (JSON የያዘ STRING) እና `usage_estimated` (BOOL) ያካትታሉ። `autoCreate` ከነቃ፣ ነባር ሰንጠረዥ እነዚህ የጎደሉ አማራጭ አምዶችን ብቻ ሊቀበል ይችላል። ላኪው የመስክ ሜታዳታን ጨምሮ ሙሉውን ነባር ስኪማ ይጠብቃል፣ እና በተመለሰው etag በመጠቀም ሁኔታዊ PATCH ያቀርባል። በተመሳሳይ ጊዜ የሚደረግ የስኪማ ለውጥ ኤክስፖርቱ እንዲሳካ አያደርግም እንጂ ያለውን አይተካም፤ በሚቀጥለው ማስኬጃ ሰንጠረዡ እንደገና ይነበባል።

`autoCreate` ከተሰናከለ፣ የአጠቃቀም ማስረጃ ያላቸውን መዝገቦች ከመላክዎ በፊት እነዚህን አምዶች እርስዎ ያክሉ። የጎደለ የስኪማ/etag ሜታዳታ ወይም ያልተሳካ ዝመና ማስረጃ ያላቸው ገቢዎችንም ይከላከላል። በዚህ ውድቀት ላይ የኤክስፖርት ጠቋሚው አይራመድም፣ እና ማስረጃው በዝምታ አይጠፋም። ኤክስፖርቱ በታገደበት ጊዜም የአካባቢያዊ ሎግ ማቆያ ደንቡ ተፈጻሚ ስለሚሆን፣ የቆዩት የምንጭ ረድፎች ከመጥፋታቸው በፊት ውድቀቱን ይፍቱ።
