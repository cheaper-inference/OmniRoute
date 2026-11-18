# Log export (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

የOmniRoute ጥሪ መዝገቦችን ወደ ውጫዊ የትንታኔ ማከማቻ ያለማቋረጥ፣ በጭማሪ መላክ።

የመዝገቦች ዳሽቦርድ ትር የጥያቄ ታሪክን በSQLite (`call_logs`) ውስጥ ያስቀምጣል፤ ይህም በማሽከርከርና
በማቆያ ጊዜ የተገደበ ነው። የመዝገብ ኤክስፖርት ተመሳሳይ የመዝገብ ስብስብን በጊዜ ሰሌዳ ወደ ውጭ ይልካል፤ ስለዚህ ከአካባቢያዊው
የውሂብ ጎታ በላይ ሊቆይና ከሌሎች ውሂቦች ጋር ሊጣመር ይችላል። BigQuery የመጀመሪያው መዳረሻ ነው፤
የሂደት መስመሩ በመዝገብ ሥርዓት ላይ የተመሠረተ ስለሆነ፣ ተጨማሪ መዳረሻዎችን በመጨመር ማስፋት ይቻላል።

---

## 1. እንዴት እንደሚሠራ

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **የጊዜ ሰሌዳ** — አንድ `JobRegistry` cron ሥራ፣ `log_export`፣ ነባሪው `0 * * * *` (በየሰዓቱ፣
  UTC) ነው። በ`src/lib/initCloudSync.ts` ይመዘገባል፤ በ`OMNIROUTE_LOG_EXPORT_CRON` መቀየር ይቻላል።
  በእያንዳንዱ የመነሻ ጊዜ **የነቁ** መዳረሻዎችን ሁሉ በተራ ያስተላልፋል።
- **ጠቋሚ** — የSQLite ስውር `call_logs.rowid` ሲሆን፣ ለእያንዳንዱ መዳረሻ በ
  `log_export_destinations.cursor_row_id` ውስጥ በቋሚነት ይቀመጣል። `timestamp` ሆን ተብሎ ጠቋሚ አልተደረገም፤ ጠሪዎች
  የራሳቸውን እሴት ሊያቀርቡ ስለሚችሉ፣ ዘገምተኛ ጥያቄ ከእሱ በኋላ ከጀመረ ፈጣን ጥያቄ በኋላ ሊጻፍ ይችላል፤
  የጊዜ ማህተም ጠቋሚ ደግሞ ያንን ይዘለዋል።
- **በቡድን ማስተላለፍ** — በእያንዳንዱ ጥያቄ `batch_size` ረድፎች (ነባሪ 500)፣ በእያንዳንዱ አሂድ `max_rows_per_run` ረድፎች
  (ነባሪ 10000)፤ ይህም ብዙ የተከማቸ ሥራ አንድን የመነሻ ጊዜ ከማገድ ይልቅ በብዙ የመነሻ ጊዜዎች እንዲተላለፍ ያደርጋል።
- **አቅርቦት** — ጠቋሚው ወደፊት የሚሄደው `send()` በተሳካ ሁኔታ ከተጠናቀቀ በኋላ ብቻ ነው። አንድ ቡድን ካልተሳካ፣
  ጠቋሚው ባለበት ይቆያል፤ ስለዚህ ተመሳሳይ ረድፎች በሚቀጥለው አሂድ እንደገና ይሞከራሉ። የሚሰጠው ዋስትና
  ቢያንስ አንድ ጊዜ ማድረስ እና በመዳረሻው በኩል ድግግሞሽን ማስወገድ ነው፣ በእርግጥ አንድ ጊዜ ብቻ ማድረስ አይደለም፤ BigQuery እያንዳንዱን
  ረድፍ በጥሪ መዝገብ መለያ ይለያል፣ ይህንም በራሱ የድግግሞሽ ማስወገጃ ጊዜ ወሰን ውስጥ በተቻለ መጠን ያከብራል።
- **የመደራረብ መከላከያ** — የcron መነሻ ጊዜ እና `POST .../run` በአንድ ጊዜ ሊነሱ ይችላሉ። ውሂብ
  እያስተላለፈ ያለ መዳረሻ ሁለት ጊዜ ከማስተላለፍ ይልቅ ይዘለላል (በአሂዱ ውጤት ውስጥ `skipped: true`)፣
  ስለዚህ በተመሳሳይ ጊዜ የሚካሄድ አሂድ ቡድንን እንደገና መላክ ወይም ጠቋሚውን ወደኋላ መጻፍ አይችልም።
- **ከማጽዳት በኋላ ማገገም** — `cursor_row_id` ከ`MAX(rowid)` በላይ ከሆነ (ሰንጠረዡ በሙሉ
  ተጸድቶ rowid እንደገና መቆጠር ከጀመረ)፣ አስኬጁ እስከመጨረሻው ምንም ማየት ከማቆም ይልቅ ወደ 0 ይመለሳል።

### የተለየ አስኬጅ እና ገደቦች

በNode ላይ የሚካሄድ እያንዳንዱ የመዳረሻ አሂድ የተለየ፣ አጭር ዕድሜ ያለው የOS ንዑስ ሂደት ይጀምራል (`child_process`
ከIPC ጋር፣ `worker_threads` አይደለም)። የይዘት ንባቦች፣ የሚላከው ውሂብ JSON ትንተና/ተከታታይ ቅርጸት መስጠት፣ የመዳረሻ
`prepare()` እና የመዳረሻ የአውታረ መረብ I/O ሁሉ በዚያ ይከናወናሉ፣ በአገልጋዩ የክስተት ዑደት ላይ አይደለም።
በIPC የሚያልፉት ውቅር እና አነስተኛ የሂደት መልዕክቶች ብቻ ናቸው፤ ወደ ውጭ የተላኩ መዝገቦች ወደ
አገልጋዩ አይመለሱም። የcron ሥራውና የ«አሁን አስኪድ» መስመሩ ተመሳሳይ ይፋዊ ውጤትና የመደራረብ መከላከያ ይዘው ይቀጥላሉ።

ንዑስ ሂደቱ በአገልጋዩ የተወሰነውን `DATA_DIR/storage.sqlite` በ`node:sqlite` አማካኝነት ለንባብ ብቻ ይከፍታል፣
ከ`busy_timeout=5000` እና `query_only=ON` ጋር። ምንም የDB ነጠላ አብነት አያስመጣም፣ እንዲሁም
ማዛወር፣ ምትኬ መሥራት ወይም የSQLite ማዘመን አያከናውንም። የጎደሉ/የተበላሹ የቅሪት ፋይሎች መዝገብ አያያዝ (የተበላሸ ቅሪት ፋይል
UPDATE ጨምሮ) በዳሽቦርዱ ዝርዝር መንገድ ውስጥ ብቻ ይቀራል። ሁለቱም መንገዶች ንጹህ የዝርዝር
ፈቺ ይጋራሉ፤ ኤክስፖርት ያልተመሳሰሉ የፋይል ሥርዓት ንባቦችን እና ተመሳሳይ የቅሪት ፋይል → የቆየ
ውስጠ-መስመር → የቆየ ዲስክ → ምንም የመፍቻ ቅደም ተከተል ይጠቀማል። ንዑስ ሂደቱ አንባቢውን ሲከፍት አሂዱ ከፍተኛውን የማስገቢያ rowid
ይመዘግባል፤ በኋላ የሚገቡ መዝገቦች ቀጣዩን አሂድ ይጠብቃሉ። ይህ የማስገቢያ
ወሰን እንጂ ለረጅም ጊዜ የሚቆይ የSQLite ግብይት አይደለም፤ አውታረ መረብ በሚጠበቅበት ጊዜ የWAL ጸሐፊዎችና የፍተሻ ነጥቦች ነጻ ይቀጥላሉ።
ነባር ረድፎችን ማዘመን/መሰረዝ በዚህ ወሰን አይታገድም።

እያንዳንዱ ቡድን ከተቀበለ በኋላ፣ ንዑስ ሂደቱ ማረጋገጫ ይጠብቃል። አገልጋዩ በመጀመሪያ
ጠቋሚውን በ`advanceLogExportCursor` በቋሚነት ያስቀምጣል፣ ከዚያ `ack` ይልካል፤ ከዚያ በፊት ቀጣዩ ቡድን አይጀምርም።
የመላክ አለመሳካት፣ ድንገተኛ መቋረጥ ወይም የጊዜ ማብቂያ የዚያን ቡድን ጠቋሚ ሳያራምድ ውድቀትን ይመዘግባል። ቀደም ሲል
የተረጋገጡ ቡድኖች ተቀምጠው ይቆያሉ፤ ቢበዛ አንዱ ያልተረጋገጠ ቡድን ብቻ እንደገና ሊላክ ይችላል።
ስኬት የሚመዘገበው `done` እና ንዑስ ሂደቱ ያለ ስህተት መውጣቱ ከተረጋገጡ በኋላ ብቻ ነው። ውድቀቶች ንዑስ ሂደቱን
በSIGTERM ያቋርጣሉ፣ ከ500 ms በኋላ ወደ SIGKILL ያሳድጋሉ፣ አስኬጁም ሂደቱ እስኪዘጋ ይጠብቃል።

| የአካባቢ ተለዋዋጭ                                   | ነባሪ    | ዓላማ                           |
| --------------------------------------------- | ------ | ----------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | ለእያንዳንዱ መዳረሻ የጠቅላላ ጊዜ ገደብ     |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | የንዑስ ሂደቱ V8 old-space ገደብ በMB |

ልክ ያልሆኑ/አዎንታዊ ያልሆኑ/ኢንቲጀር ያልሆኑ እሴቶች ነባሪዎቹን ይጠቀማሉ። የheap ቅንብሩ የጠቅላላ
RSS ገደብ አይደለም፤ በጣም ትላልቅ ቡድኖች አሁንም የንዑስ ሂደቱን ማህደረ ትውስታ ሊያሟጥጡና አሂዱን በደህና ሊያስወድቁ ይችላሉ።
የ1024 MB ነባሪ እሴት ይዘቶች ሲነቁ፣ የBigQuery በባይት ቁርጥራጮች የሚደረግ JSON ተከታታይ ቅርጸት መስጠትን
ጨምሮ፣ ለነባሪው 500 ረድፍ ያለው የ512 KiB ቅሪት ፋይሎች ቡድን ተጨማሪ ክፍተት ይተዋል። ይህ
10000 ረድፍ ያለውን ይዘቶች የያዘ ቡድን ደህንነቱ የተጠበቀ አያደርገውም። የV8 heap መሟጠጥ እርምጃ ሊወሰድበት የሚችል ውድቀት ይመዘግባል፤ የቡድኑን
መጠን ይቀንሱ ወይም `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` ያሳድጉ፤ ጠቋሚው በመጨረሻው
በተረጋገጠ ቡድን ላይ ይቆያል። የቆዩ ውስጠ-መስመር/ዲስክ ይዘቶች በዘመናዊው የቅሪት ፋይል ገደብ አይሸፈኑም።
አስተዳዳሪዎች ለRSS በተለየ መልኩ የማህደረ ትውስታ በጀት መመደብ አለባቸው፣ በተለይም በማህደረ ትውስታ የተገደቡ ኮንቴይነሮች ውስጥ።

ልጅ ሂደቱ የሚወርሰው የተወሰነውን `DATA_DIR`፣ `NODE_ENV`፣ በግልጽ የተቀመጠውን `TZ` (ለቆዩ የፋይል ስሞች
የአካባቢ ሰዓት አወሳሰን)፣ ካለ `ELECTRON_RUN_AS_NODE`፣ እና የሚከተሉትን የወጪ ግንኙነት ግብዓቶች ብቻ ነው፦
`HTTP_PROXY`፣ `HTTPS_PROXY`፣ `ALL_PROXY`፣ `NO_PROXY` (እና በትንንሽ ፊደላት የተጻፉ ቅጾቻቸው)፣
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`፣ `NODE_EXTRA_CA_CERTS`፣ `SSL_CERT_FILE`፣ `SSL_CERT_DIR`።
ዓለም አቀፍ የUndici አሰራጭ፣ `NO_PROXY`ን ጨምሮ፣ የአገልጋዩን በአካባቢ ተለዋዋጮች ብቻ የሚወሰን የፕሮክሲ አወሳሰን እና የአካባቢ አስተናጋጅ
ማለፊያ ደንቦች ይጋራል፤ `proxyFetch.ts`ን ወይም የእሱን የውሂብ ጎታ/ባህሪ መቆጣጠሪያዎች አያስገባም።
የፕሮክሲ ማረጋገጫ መረጃዎች ከሚተላለፈው ውጤት እና ከሚመዘገቡ ስህተቶች ይደበቃሉ። የመድረሻ ማረጋገጫ መረጃዎች
በአንድ የመነሻ IPC መልዕክት ብቻ ይተላለፋሉ፣ በargv ወይም በአካባቢ ተለዋዋጮች ፈጽሞ አይተላለፉም፤ የውጤት/ስህተት ማስተላለፍ
ቅድመ ቅጥያ ይጨመርበታል፣ እንዲሁም ይጣራል። በእያንዳንዱ የcron አሂድ የNode SQLite ማስጠንቀቂያ
እንዳይደገም፣ በልጅ ሂደቱ የማስፈጸሚያ አርግመንቶች ውስጥ `ExperimentalWarning` ብቻ ይሰናከላል፤ ሌሎች የማስጠንቀቂያ ዓይነቶች መታየታቸውን ይቀጥላሉ።

የመድረሻ ሞጁሎች ያለ Next.js/ለአገልጋይ ብቻ የሆኑ ጥገኞች ሊመጡ የሚችሉ መሆን አለባቸው። ያለው
የBigQuery ትግበራ ይህን ውል አስቀድሞ ያሟላል። የመዳረሻ ቶከን መሸጎጫዎች የሚቆዩት በልጅ ሂደቱ
አሂድ ውስጥ ብቻ ነው፣ ከአንድ አሂድ ወደ ሌላ አይቀጥሉም። Node የሚደገፈው የማስኬጃ አካባቢ ነው (`package.json` engines)፣ ነገር ግን በREADME ያለው የBun
መጫኛ ክፍል እና `Dockerfile.bun` እንዲሁም
`bun:sqlite`ን (`src/lib/db/core.ts` / አስማሚዎች) በመጠቀም ለምርት አካባቢ የሚስማማ መንገድ እንዳለ ያሳያሉ። ስለዚህ በBun ላይ ወደ ውጭ መላክ የቀድሞውን
በሂደቱ ውስጥ የሚሠራ መንገድ ይጠቀማል፣ እና የአንድ ጊዜ ማስጠንቀቂያ ያወጣል፦ የልጅ ሂደት የheap/የጊዜ ገደብ ማግለል አይገኝም። ለ
ክስተት ዙር እና ለOOM ማግለል Nodeን ይጠቀሙ፤ Bun እዚህ ለልማት ብቻ እንደሚውል አይቆጠርም።

`includeBodies` ሲነቃ፣ የአንድ ሰዓት ጭነት ክምችት ከማከማቸት ይልቅ
እንደ `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` ያለ በደቂቃ ደረጃ የሆነ የአሂድ ድግግሞሽ ይምረጡ።
የቡድን እና የረድፍ ገደቦች እያንዳንዱን አሂድ መገደባቸውን ይቀጥላሉ። ለእያንዳንዱ መድረሻ በእያንዳንዱ አሂድ የሂደት ማስጀመሪያ ወጪ ይኖራል፤
ይህ ትንሽ የማስጀመሪያ ወጪን በመክፈል የአገልጋዩን የክስተት ዙር ማግለል ያስገኛል እንጂ አጠቃላይ የCPU አጠቃቀምን አይቀንስም።

### ጭነቶች (ጥያቄዎች እና ማሟያዎች)

በነባሪነት ወደ ውጭ የሚላከው የምዝግብ ማስታወሻዎች **ዝርዝር** የሚያሳየውን የማጠቃለያ መስኮች ብቻ ይይዛል።
**ጥያቄዎችን እና ምላሾችን ወደ ውጭ ላክ** (`includeBodies`) ማንቃት፣ ለእያንዳንዱ ጥሪ የምዝግብ ማስታወሻዎች **ዝርዝር መረጃ**
ክፍል የሚያሳየውን በተጨማሪ ይልካል፦

| መስክ                              | የሚይዘው                                               |
| -------------------------------- | --------------------------------------------------- |
| `request_body` / `response_body` | ዳሽቦርዱ እንደሚያሳያቸው ያሉ የጥሪ ጭነቶች                         |
| `pipeline_route_decision`        | መምሪያው የመረጠው ዒላማ እና ሞዴል                              |
| `pipeline_client_request`        | ደንበኛው እንደላከው ያለ ያልተቀየረ ጥያቄ                          |
| `pipeline_openai_request`        | ወደ ውስጣዊው የOpenAI ቅርጽ ከተቀየረ በኋላ                      |
| `pipeline_provider_request`      | በአቅራቢው ቅርጸት በእርግጥ ወደ አቅራቢው እንደተላከው                  |
| `pipeline_provider_response`     | ከአቅራቢው የመጣው ያልተቀየረ ምላሽ                              |
| `pipeline_client_response`       | ለጠሪው ተመልሶ የተሰጠው                                     |
| `pipeline_error`                 | ላልተሳካ ጥሪ በማቀነባበሪያ ሰንሰለት ደረጃ ያለ የስህተት ዝርዝር           |
| `bodies_truncated`               | ከላይ ካሉት መስኮች ማንኛውም `maxBodyBytes` ላይ ሲደርስ እውነት ይሆናል |

ይህ የጥያቄ ይዘት ስለሆነ፣ **በነባሪነት ጠፍቷል** እና ሆን ተብሎ ለእያንዳንዱ መድረሻ የሚመረጥ ነው።
ወደ ውጭ መላክ እና `getCallLogById` ተመሳሳይ የዝርዝር መረጃ
አወሳሰን ስለሚጋሩ፣ የሚላከው ዳሽቦርዱ የሚያሳየው ነው፦ ጭነቶች
በሚጻፉበት ጊዜ አስቀድመው ከግል መለያ መረጃ ተጣርተው ሚስጥራዊ መረጃዎችም ተደብቀዋል፣ እንዲሁም
በ`noLog` API ቁልፍ የተደረገ ጥሪ ምንም ጭነት አያከማችም፣ ስለዚህ ወደ ውጭ የሚላክ ምንም ነገር የለም።

ጭነቶች ከፋይል ስርዓቱ ቅርስ ለእያንዳንዱ ረድፍ ይነበባሉ፣ ስለዚህ ይዘትን መሙላት የሚከናወነው
ይህን ለጠየቁ መድረሻዎች ብቻ ነው። የጠፋ ወይም የተበላሸ ቅርስ፣ ቡድኑን ከማስቆም እና
ጠቋሚውን ከማስቀረት ይልቅ፣ ማጠቃለያውን ባዶ ጭነቶች ጋር ወደ ውጭ ይልካል።

`maxBodyBytes` (ነባሪው 262144) እያንዳንዱን መስክ ይገድባል። ረዘም ያሉ ጭነቶች **ከመጣል ይልቅ
ይቆረጣሉ** — የተቆረጠ ጥያቄም ቢሆን “ምን ተጠየቀ” የሚለውን ይመልሳል — እና ረድፉ በ
`bodies_truncated` ምልክት ይደረግበታል። በዥረት ቁራጭ በቁራጭ የሚመጡ ለውጦች ወደ ውጭ አይላኩም፤ የተገጣጠመው ምላሽ
ቀድሞውኑ በ`pipeline_provider_response` እና `pipeline_client_response` ውስጥ አለ።

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
