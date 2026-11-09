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

## 4. የBigQuery መድረሻ

የውቅረት ቁልፎች (`type: "bigquery"`):

| ቁልፍ                  | ማስታወሻዎች                                                       |
| -------------------- | ------------------------------------------------------------- |
| `projectId`          | የውሂብ ስብስቡን የያዘው የGCP ፕሮጀክት                                    |
| `datasetId`          | `[A-Za-z0-9_]+`                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                               |
| `location`           | የውሂብ ስብስቡ መፈጠር ሲያስፈልግ ብቻ ይጠቀማል (ነባሪው `EU`)                    |
| `serviceAccountJson` | የአገልግሎት መለያ ቁልፍ። ሚስጥራዊ፦ በማከማቻ ላይ እያለ ይመሰጠራል፣ ፈጽሞ አይመለስም       |
| `autoCreate`         | በመጀመሪያው ወደ ውጭ ማውጣት ጊዜ የውሂብ ስብስቡን እና ሰንጠረዡን ይፍጠር (ነባሪው `true`) |

የአገልግሎት መለያው በዒላማው ሰንጠረዥ ላይ `bigquery.tables.updateData` ያስፈልገዋል፤ በተጨማሪም
`autoCreate` ሲበራ `bigquery.datasets.create` / `bigquery.tables.create` ያስፈልጉታል።

የተዋቀረ ጥቅል የ**ጠቋሚ** ክፍል እንጂ የHTTP ክፍል አይደለም፦ `send()` እያንዳንዳቸው ቢበዛ 500 ረድፎች ወደሚይዙ የinsertAll
ጥሪዎች ይከፋፍለዋል፤ ስለዚህ ትልቅ `batch_size` የBigQueryን 10 MB የጥያቄ ገደብ ሊያልፍ አይችልም።
ጊዜያዊ ሁኔታዎች (408/429/500/502/503/504) ተመሳሳይ insertIdsን እንደገና በመጠቀም፣ በኤክስፖነንሻል እየጨመረ
በሚሄድ የመጠበቂያ ጊዜ እስከ ሦስት ጊዜ እንደገና ይሞከራሉ፤ የማረጋገጫ እና የመዋቅር ስህተቶች ግን ሂደቱን በከንቱ ከመቀጠል ይልቅ
በመጀመሪያው ሙከራ ላይ ስህተት ያስነሳሉ።

ከጥቂት ጊዜ በፊት የተፈጠረ ሰንጠረዥ ለዥረት ማስገቢያው የመጨረሻ ነጥብ ገና አይታይም፤ ይህም
ለጥቂት ሰከንዶች 404 ይመልሳል። ያ 404 እንደገና ይሞከራል፣ ነገር ግን **ሰንጠረዡን የፈጠረው ይህ አፈጻጸም ሲሆን ብቻ** —
በእውነት የሌለ ሰንጠረዥ ግን አሁንም ወዲያውኑ ይከሽፋል። በቅርቡ በተሰረዘ ስም ሰንጠረዥን
እንደገና መፍጠር BigQuery የዥረት ማስገባቶችን ለብዙ ደቂቃዎች እንዲከለክል እንደሚያደርግ ልብ ይበሉ፤ ይህ
ሰርዞ እንደገና የመፍጠር ባህሪ ስለሆነ፣ ሰንጠረዥን ከመሰረዝ እና እንደገና ከመጨመር ይልቅ አዲስ የሰንጠረዥ ስም ይጠቀሙ።

**ከፊል ውድቀት ባዶ ካልሆነ `insertErrors[]` ጋር እንደ HTTP 200 ይመጣል።** ይህ እንደ
ውድቀት ተቆጥሮ ስህተት ያስነሳል፤ ይህም ጠቋሚው BigQuery ፈጽሞ ካልተቀበላቸው ረድፎች አልፎ
እንዳይሄድ የሚያቆመው ነው፤ `tests/unit/log-export-bigquery.test.ts` ይህን ባህሪ በሙከራ ያረጋግጣል።

የመረጃ ማስተላለፉ ቀጥተኛ REST ነው — በራሱ የተፈረመ RS256 ማረጋገጫ በ
`https://oauth2.googleapis.com/token` ላይ በመዳረሻ ቶከን ይለወጣል፣ ከዚያም ረድፎች ወደ `tabledata.insertAll` ይላካሉ። ምንም የGoogle SDK
አይጨመርም። የመዳረሻ ቶከኖች በእያንዳንዱ (የአገልግሎት መለያ፣ የፈቃድ ወሰን) ጥምረት በሂደቱ ውስጥ በመሸጎጫ ይቀመጣሉ።

የተፈጠረው ሰንጠረዥ ለእያንዳንዱ የምዝግብ ማስታወሻዎች ትር መስክ አንድ ዓምድ እና `exported_at` ይይዛል፤ አቀማመጡም
የጥሪ ምዝግብ ማስታወሻዎች በተግባር እንዴት እንደሚጠየቁ የተመሠረተ ነው፦

- **በ`timestamp` ላይ በቀን የተከፋፈለ ነው**፣ ስለዚህ በቀን የተገደበ መጠይቅ እነዚያን ቀናት ብቻ ይቃኛል።
- **በ`api_key_name`, `provider`, `model`, `status` የተመደበ ነው** (በዚህ ቅደም ተከተል)፣ ስለዚህ ማን
  እንዳስኬደው፣ ወዴት እንደሄደ ወይም መክሸፉን በመመርኮዝ ማጣራት በእያንዳንዱ ክፍፍል ውስጥ የሚቃኙ ብሎኮችን ይቀንሳል። BigQuery
  ቢበዛ አራት የመመደቢያ ዓምዶችን ይፈቅዳል፣ ቅደም ተከተሉም ወሳኝ ነው፦ በ`api_key_name` ብቻ የሚደረግ ማጣራት
  የሚቃኙ ብሎኮችን ይቀንሳል፣ በ`status` ብቻ የሚደረግ ማጣራት ግን አይቀንስም።
- በ`partitionExpirationDays` አማካይነት **አማራጭ የክፍፍል ማቆያ ጊዜ** (0 ሁሉንም ያቆያል)፣
  ሰንጠረዡ ሲፈጠር ተግባራዊ ይሆናል።

ሁለቱም ቅንብሮች በመፍጠር ጊዜ ተግባራዊ ይሆናሉ። ያለ ሰንጠረዥ ቀድሞ የነበረውን አቀማመጥ ይዞ ይቀጥላል፣ ስለዚህ
እነዚህን መጠቀም ከፈለጉ መድረሻውን ወደ አዲስ የሰንጠረዥ መለያ ያመልክቱ።

`tests/unit/log-export-bigquery.test.ts` አዛማጁ እና የሰንጠረዡ መዋቅር ተመሳስለው መቀጠላቸውን
ያረጋግጣል፣ ስለዚህ አዲስ የጥሪ ምዝግብ ማስታወሻ ዓምድ ወደ ውጭ በማውጣት ሂደት ሳይታወቅ ሊቀር አይችልም።

ጥቅሎች **በሁለቱም**፣ በረድፍ ብዛት እና በተከታታይ ቅርጽ በተቀየሩ ባይቶች መጠን ይከፋፈላሉ። የውሂብ ይዘቶች ወደ ውጭ ሲወጡ
የረድፍ ብዛት ብቻውን በቂ አይደለም፦ የግቤት መመሪያዎችን የያዙ 500 ረድፎች አስርተ ሜጋባይቶች ሊሆኑ ይችላሉ፣ insertAllም
ከ10 MB በላይ የሆነ ጥያቄን አይቀበልም። ክፍሎች 500 ረድፎች ወይም 9 MB ሲደርሱ፣ ቀድሞ በደረሰው መሠረት ይዘጋሉ።

---

## 5. የOTLP/HTTP ዱካዎች መዳረሻ

ውቅሩ `type: "otlp-http"` ይጠቀማል። ይህ በመርሐግብር የሚከናወን፣ በጠቋሚ የሚደገፍ የተቀመጡ
የጥሪ መዝገቦች ኤክስፖርት ነው፤ በ
`open-sse/services/routing/otel.ts` ያለው፣ በተቻለ መጠን የሚሠራ የቀጥታ ማዘዋወሪያ ክስተት መቀበያ አይደለም። የዚያን መቀበያ የአካባቢ
ተለዋዋጮች፣ ሰዓት ቆጣሪዎች ወይም ቋቶች አያነብም ወይም አይቀይርም። ሁለቱንም ማንቃት ሁለት ገለልተኛ የስፓን ዓይነቶችን ሊፈጥር ይችላል፤
እነዚህን የጥሪ መዝገብ ስፓኖች ለመለየት የ`omniroute.log-export` የመለኪያ ወሰንን ይጠቀሙ።

| ቁልፍ                      | ነባሪ / ዓላማ                                                       |
| ------------------------ | --------------------------------------------------------------- |
| `endpoint`               | ሙሉ የHTTP(S) ዱካዎች URL ያስፈልጋል፤ የ`/v1/traces` ቅጥያ አይጨመርም           |
| `headers`                | አማራጭ የ`Name: value` መስመሮች ወይም የሕብረቁምፊዎች JSON ኦብጀክት፤ በምስጠራ የተጠበቀ |
| `requestHeaderAllowlist` | ባዶ (ጠፍቷል)፤ እንደ ስፓን ባህሪያት የሚያዙ የደንበኛ ራስጌ ስሞች/ቅድመ ቅጥያዎች           |
| `serviceName`            | `omniroute`፤ የሀብት `service.name`                                |
| `langfuseMapping`        | `false`፤ የLangfuse ማመንጨት/ክፍለ ጊዜ/ተጠቃሚ ባህሪያትን ይጨምራል               |
| `identity`               | `pseudonymous`፣ `keyName`፣ ወይም `none`                           |
| `paths`                  | `/v1/chat/completions`፣ `/v1/responses`፣ `/v1/messages`         |
| `timeoutMs`              | ለእያንዳንዱ የHTTP ሙከራ `30000`                                       |
| `environment`            | አልተዘጋጀም፤ አማራጭ `langfuse.environment`                            |

አጠቃላይ ዳሽቦርዱ እነዚህን መስኮች ያሳያል። `paths` የAPI ድርድር ወይም ትክክለኛ ዱካዎች
በአዲስ መስመሮች/በነጠላ ሰረዞች የተለዩበት የጽሑፍ ቦታ ይቀበላል። የኢምቤዲንግ፣ የዳግም ደረጃ አሰጣጥ እና ሌሎች ዱካዎች
በግልጽ ካልተፈቀዱ በስተቀር ይዘለላሉ። የተዘለሉ ረድፎችም ጠቋሚውን ወደፊት ያንቀሳቅሳሉ፤ አሁን ያለው
አስኬጅ `exported`/`exportedTotal` ቆጣሪዎች የሚቆጥሩት ተቀባይነት ያገኙ ስፓኖችን ሳይሆን፣ የተጣሩ
ረድፎችንም ጨምሮ የተሠሩ የምንጭ ረድፎችን ነው። ማጣራቱ በልጅ ሂደቱ ውስጥ ይከናወናል፣
የIPC/ጠቋሚ ውሉን ሳይቀይር።

የURL ማረጋገጫ ከ
`src/shared/network/outboundUrlGuard.ts` የመጣውን፣ DB የማይጠቀም `parseAndValidateNonMetadataUrl` ረዳት ይጠቀማል፦ የ`block-metadata` ፖሊሲ። የግል URLዎች
ተፈቅደው እንዳሉበት የwebhook አረጋጋጭ ሁሉ፣ ተመሳሳይ ያለቅድመ ሁኔታ የሜታዳታ/ፕሮቶኮል/የተካተቱ ማረጋገጫዎች ፍተሻዎች አሉት፤
ነገር ግን ዓለም አቀፍ የባህሪ ማብሪያ መሻሪያ ሳያስፈልግ localhost/LAN ዒላማዎችን ሆን ብሎ ይፈቅዳል። ይህ በራስ የሚስተናገዱ የLangfuse፣ Phoenix፣ Tempo እና Collector
መጨረሻ ነጥቦችን፣ የግል HTTP መጨረሻ ነጥቦችንም ጨምሮ፣ ይፈቅዳል። የደመና ሜታዳታ አስተናጋጆች ሁልጊዜ ይታገዳሉ።
ማዞሪያዎች አይከተሉም፣ ስለዚህ ሰብሳቢ የማረጋገጫ መረጃዎችን ወደ ሌላ አስተናጋጅ ማዞር አይችልም።
አሁን እንዳለው በጽሑፍ ቅርጽ የሚመረመር የURL መከላከያ፣ ይህም የDNS መፍታትን አይቆልፍም፤
በኦፕሬተሩ ቁጥጥር ሥር ያሉ አስተናጋጆችን ብቻ ያዋቅሩ። መጨረሻ ነጥቡ በታመነ አውታረ መረብ ላይ በማይገኝበት ጊዜ ሁሉ HTTPSን ይምረጡ።

### የውሂብ ጭነት እና አቅርቦት

OTLP/HTTP JSON (`ExportTraceServiceRequest`፣ `Content-Type: application/json`) ለእያንዳንዱ
የተፈቀደ ረድፍ አንድ CLIENT ስፓን ይይዛል፣ ስሙም ትክክለኛው የጥያቄ ዱካ ይሆናል። በዱካ መሰየም
የሞዴል ወይም የማንነት ውሂብን በስፓን ስም ውስጥ ሳያካትት Chat Completions፣ Responses እና Messagesን
ይለያል። የሀብት ባህሪያት `service.name` እና የፓኬጁን `service.version` ያካትታሉ።

መደበኛው የውይይት ሙከራ መዝጋቢ (`open-sse/handlers/chatCore/attemptLogging.ts`) ሲጠናቀቅ
`duration = Date.now() - startTime` ይጽፋል፣ የጊዜ ማህተም ግን አያቀርብም፤
በ`src/lib/usage/callLogs.ts` ያለው `saveCallLogOperation` የጊዜ ማህተሙን በነባሪ
የመጻፍ (የማጠናቀቅ) ጊዜ ያደርገዋል። ስለዚህ ኤክስፖርቱ መጨረሻ = የረድፍ የጊዜ ማህተም፣ መጀመሪያ = መጨረሻ − ቆይታ
(ሚሊሰከንዶች፣ ወደ አስርዮሽ ናኖሰከንዶች የተቀየሩ) ብሎ ያዘጋጃል። በጠሪው የቀረቡ ታሪካዊ የጊዜ ማህተሞችም
እንደ መጨረሻ ጊዜ ይጠበቃሉ፤ ለእያንዳንዱ ረድፍ የመጀመሪያ/የማጠናቀቂያ መለያ የለም።
null የሆነ ቆይታ ዜሮ ይሆናል። ልክ ያልሆኑ/የጎደሉ የጊዜ ማህተሞች የማይወሰኑ ስፓኖችን ከመፍጠር ይልቅ
ቡድኑን እንዲሳካ ያደርጋሉ። `ttftMs` null ሊሆን ይችላል፣ እና ወደ `omniroute.ttft_ms` ይመደባል።

ባህሪያቱ `gen_ai.operation.name="chat"`፣ አቅራቢ፣ የተጠየቀ/የምላሽ ሞዴል፣
የግቤት/የውጤት ቶከኖች፣ አማራጭ የመሸጎጫ ንባብ/የመሸጎጫ ፍጠራ/የማመዛዘን ቶከኖች፣ የHTTP ሁኔታ፣
ጥምረት፣ የመሸጎጫ ምንጭ፣ የክፍለ ጊዜ መለያ እና የትስስር መለያ ያካትታሉ። የኢንቲጀር OTLP እሴቶች እና የጊዜ ማህተሞች
አስርዮሽ ሕብረቁምፊዎች ናቸው፤ ሕብረቁምፊዎች፣ ቡሊያኖች እና ክፍልፋይ ቁጥሮች የራሳቸውን የOTLP እሴት
ዓይነቶች ይጠቀማሉ። የስህተት ስፓኖች ERROR ሁኔታ እና የተጣራ የሁኔታ መልዕክት አላቸው። መደበኛው
መዝገብ የላይኛው አስተናጋጅ URL የለውም፣ ስለዚህ ሰብሳቢውን በስህተት እንደ ሞዴል አገልጋይ
ከመለየት ይልቅ `server.address` ይቀራል። ወጪ ኤክስፖርት አይደረግም።

ይዘትን የሚሞላው `includeBodies=true` ብቻ ነው። `langfuseMapping=false` ሲሆን፣
`gen_ai.input.messages` / `gen_ai.output.messages` በOmniRoute እንደተቀመጠው የተጣራ የጥያቄ/የምላሽ
አካል JSON (ሊተነተን ሲችል ወደ መደበኛ ቅርጽ የተቀየረ) ይይዛሉ፣ እንጂ ዳግም ቅርጽ የተሰጠው የsemconv
መልዕክቶች ድርድር አይደለም። የተቆረጡ/JSON ያልሆኑ አካላት ጥሬ ጽሑፍ ሆነው ይቆያሉ። `langfuseMapping=true` ሲሆን፣
አካላት እንደ `langfuse.observation.input` / `langfuse.observation.output` ብቻ ይወጣሉ፤
እያንዳንዱ አካል አንድ ጊዜ ብቻ እንዲላክ የ`gen_ai.*.messages` ባህሪያት ይቀራሉ። ሁለቱም ሁነታዎች
ከነባሩ የይዘት ሙሌት መንገድ `maxBodyBytes`ን ይወርሳሉ፤
`omniroute.bodies_truncated=true` መቆረጥን ያመለክታል።
ይህ መዳረሻ ተጨማሪ የፓይፕላይን ቅጽበታዊ ቅጂዎችን ወይም ያልተጣሩ የአርቲፋክት ንባቦችን አይጨምርም፤
አማራጭ የጥያቄ ራስጌ መያዣ ከዚህ በታች የተገለጸውን ነባር፣ በይዘት የተሞላ የደንበኛ ቅጽበታዊ ቅጂ ይጠቀማል።
አካላትን ኤክስፖርት ሲያደርጉ በሰዓት የሚጠራቀም ያልተሠራ ሥራ ከመፍጠር ይልቅ፣
እንደ `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` ያለ በደቂቃ ደረጃ የሚደጋገም መርሐግብር ይጠቀሙ።

### አማራጭ የደንበኛ ጥያቄ ራስጌዎች

የራስጌ መያዣ **በነባሪ ጠፍቷል**። በመዳረሻ ውቅሩ ውስጥ `requestHeaderAllowlist`ን ያዘጋጁ
እና **ጥያቄዎችን እና ምላሾችን ኤክስፖርት አድርግ**ን ያንቁ (በመዳረሻው ላይ `includeBodies: true`)።
የፈቃድ ዝርዝሩ የAPI ድርድር ወይም በአዲስ መስመር/በነጠላ ሰረዝ የተለዩ ስሞች ያሉበት የጽሑፍ ቦታ ይቀበላል፦

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

አንድ በመጨረሻ ያለ `*` ባዶ ያልሆነ የራስጌ ስም ቅድመ ቅጥያ ካልመረጠ በስተቀር፣ ስሞች የትልቅና የትንሽ ፊደል ልዩነትን ሳያገናዝቡ በትክክል ይዛመዳሉ።
ብቻውን ያለ `*`፣ በመሃል የገቡ ሁለገብ ምልክቶች እና ልክ ያልሆኑ የHTTP ራስጌ ስሞች ውድቅ ይደረጋሉ።
ቢበዛ 64 መራጮች ሊኖሩ ይችላሉ፤ የእያንዳንዳቸው ስም/ቅድመ ቅጥያ ቢበዛ 256 ASCII ባይቶች ይሆናል።
ይህ ቅንብር ላኪውን ለሰብሳቢው ከሚያረጋግጠው `headers` የተለየ ነው።

መያዙ ከተቀመጠው ዝርዝር የሂደት ሰንሰለት `clientRawRequest` (ወይም የቀድሞው `clientRequest`) የሚሞላውን
`pipeline_client_request` ብቻ ያነባል። በምትኩ የአቅራቢውን የጥያቄ ራስጌዎች ፈጽሞ አይጠቀምም።
ጥያቄው ሲመዘገብ ዝርዝር የሂደት ሰንሰለት ምዝገባ ነቅቶ መሆን አለበት።
`includeBodies` ከተሰናከለ፣ ወይም የደንበኛው ቅጽበታዊ ቅጂ JSON ከጠፋ፣ ከተበላሸ ወይም ከተቆረጠ፣ ምንም የራስጌ
ባህሪያት አይወጡም። `maxBodyBytes` መጨመር በመላክ ጊዜ የቅጽበታዊ ቅጂውን መቆረጥ ሊያስወግድ ይችላል፤
ፈጽሞ ያልተቀመጠ ዝርዝር ግን መመለስ አይችልም። ከ1 MiB በላይ የሆነ ወይም ከ256 በላይ
የራስጌ ግቤቶችን የያዘ ቅጽበታዊ ቅጂ ችላ ይባላል። ነባሩ የግቤት መልዕክት/ምላሽ መላክ ከራስጌ
መያዝ ጋር አብሮ እንደነቃ ይቀጥላል፤ የፍቃድ ዝርዝሩ ራስጌዎችን ብቻ የሚሞላ ሁነታ አያቀርብም።

የተመረጡ እሴቶች አንድ ሕብረቁምፊ ብቻ ቢሆኑም እንኳ፣ `http.request.header.<full lowercase header name>` የሚባሉ የOTLP ሕብረቁምፊ ድርድሮች ይሆናሉ።
ለምሳሌ፣ `X-OmniRoute-Meta-Team: example-team` ወደ
`http.request.header.x-omniroute-meta-team` ይቀየራል፣ እሴቱም
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}` ይሆናል።
ሙሉው ቅድመ ቅጥያ ይጠበቃል፤ እነዚህ ተራ ራስጌዎች ናቸው፣ የንግድ መስክ ትንተና ወይም
`omniroute.metadata.*` / Langfuse ሜታዳታ ልወጣ አይደረግባቸውም። `langfuseMapping` የራስጌዎችን
ትርጉም አይቀይርም። የተመረጠ አንድ እሴት ያለው `User-Agent` መደበኛውን ነጠላ እሴት
`user_agent.original` ጭምር ያዘጋጃል። በአንድ እሴት ውስጥ ያሉ ኮማዎች አይከፋፈሉም። በፊደል መጠን የሚለያዩ ቅጾች በተቀመጡበት
የግቤት ቅደም ተከተል ይዋሃዳሉ፤ ማንኛውም ልክ ያልሆነ ቅጽ ያንን ሙሉ ራስጌ ያስቀራል። ባህሪያቱ በትንሽ ፊደል ስም ቅደም ተከተል ይደረደራሉ።

Authorization፣ Proxy-Authorization፣ Cookie፣ Set-Cookie፣ የAPI ቁልፍ ራስጌዎች፣
auth/token/secret/password/credential አመልካቾችን የያዙ ስሞች እና የውስጥ መግቢያ ማረጋገጫዎች ሁልጊዜ
ይገለላሉ፣ ቢመረጡም ወይም በማከማቻ ውስጥ በከፊል ቢሸፈኑም እንኳ። የታወቁ የማረጋገጫ ቅጦች
የጋራውን የማረጋገጫ መለያ ይጠቀማሉ፤ የመሸፈኛ ምልክቶች ይቀራሉ እንጂ እንደ ደህንነታቸው የተጠበቀ እሴቶች አይላኩም።
ሕብረቁምፊዎች እና ባዶ ያልሆኑ የሕብረቁምፊ ድርድሮች ብቻ ይቀበላሉ፤ ቁጥሮች ወይም ነገሮች በግድ አይለወጡም።
ልክ ያልሆኑ ስሞች፣ የፕሮቶታይፕ ቁልፎች፣ የቁጥጥር ቁምፊዎች (ከአግድም ታብ በስተቀር) እና የተበላሸ Unicode
ጥቅሉን ሳያስተጓጉሉ ወይም ይዘታቸውን በስህተቶች ውስጥ ሳያሳዩ ችላ ይባላሉ።

እያንዳንዱ ስፓን ቢበዛ 32 ራስጌዎችን፣ በእያንዳንዱ ራስጌ 16 እሴቶችን፣ በእያንዳንዱ እሴት 4096 UTF-8 ባይቶችን፣
እና በተያዙ የራስጌ ስሞችና እሴቶች በአጠቃላይ 16384 UTF-8 ባይቶችን ይይዛል። መጠናቸው ያለፈ/ልክ ያልሆኑ ራስጌዎች
ሙሉ በሙሉ ይቀራሉ እንጂ አይቆረጡም። ምርጫው የኦፕሬተሩ የግላዊነት ውሳኔ ነው፤ ደህንነታቸው የተጠበቀ የሚመስሉ ስሞችም
የግል ውሂብ ሊይዙ ይችላሉ፣ እነዚህ ገደቦች/መለያዎችም አጠቃላይ የPII ማጽጃ አይደሉም።

### የማድረስ ገደቦች

ጥያቄዎች መጠቅለያውን ጨምሮ በ500 ስፓኖች እና በ4 MiB UTF-8 JSON ይገደባሉ።
እያንዳንዱ የተፈቀደ ስፓን የጠቋሚ ጥቅሉ የመጀመሪያ ጥያቄ ከመላኩ በፊት መጠኑ ይፈተሻል። አንድ
ስፓን ከገደቡ በላይ ከሆነ፣ የዚያን ጥቅል ምንም ክፍል ሳይልክ `maxBodyBytes` እንዲቀነስ
በሚመክር ስህተት ይቋረጣል፤ በዝምታ አይጣልም። ቅድመ ፍተሻው የመዝገብ ማጣቀሻዎችን እና
የባይት ብዛቶችን ብቻ ያቆያል፣ እያንዳንዱን ጊዜያዊ ስፓን/JSON ይጥላል፤ ስፓኖች ሁለተኛ ተከታታይ ቅጂ
ከመያዝ ይልቅ ለተገደቡ ክፍሎች እንደገና ይገነባሉ። HTTP 408/429/5xx፣ የአውታረ መረብ ብልሽቶች እና የጊዜ ማብቂያዎች ቢበዛ
ሦስት ሙከራዎችን ያገኛሉ፣ በ250/500 ms እየጨመረ በሚሄድ መጠበቂያ። የ`Retry-After` ሰከንዶች ወይም የHTTP ቀኖች
መዘግየቱን እስከ 5 ሰከንዶች ሊያራዝሙት ይችላሉ። ሌሎች ሁኔታዎች ወዲያውኑ ይቋረጣሉ። የOTLP 2xx ከፊል እምቢታም
የጠፋ ስፓን መቀበሉን ከማረጋገጥ ይልቅ ስህተት ያስነሳል፤ ባዶ ወይም ልክ የሆኑ የJSON ማረጋገጫዎች ይቀበላሉ፣ ምላሽ
የማንበብ ገደቡም 64 KiB ነው።

ስህተቶች በላኪው ብቻ የሚታወቁ እውነታዎችን ይይዛሉ፦ የHTTP ሁኔታ፣ የድጋሚ ሙከራ ምድብ፣ የሙከራዎች እና የተላኩ ስፓኖች
ብዛት፣ ወይም ቋሚ የማረጋገጫ/የአውታረ መረብ ብልሽት መልዕክቶች። የሰብሳቢው ምላሽ አካላት፣
የከፊል ስኬት ቆጠራዎች እና የምላሽ ራስጌዎች ወደ ስህተቶች፣ መዝገቦች ወይም
ዳሽቦርዱ ፈጽሞ አይቀዱም። የከሸፈ ወይም በከፊል የተቀበለ ጥቅል መቀበሉ አይረጋገጥም፤ መድረሻው
በዚያ ሁኔታ ላይ እየከሸፈ መሆኑን ያሳያል፣ ጠቋሚው በመጨረሻ መቀበሉ በተረጋገጠው ጥቅል ላይ ይቆያል፣ ቀጣዩ አፈጻጸምም
እነዚያኑ ረድፎች እንደገና ይልካል። ቋሚ ሁኔታዎች ሰብሳቢው ወይም ውቅሩ
እስኪስተካከል ድረስ መክሸፋቸውን ይቀጥላሉ። ለምላሽ ዝርዝሮች የሰብሳቢውን የራሱን መዝገቦች ይጠቀሙ። የጥሪ መዝገብ የስህተት ማጠቃለያዎች
የተለየ የመሸፈኛ ሂደታቸውን ያቆያሉ።
`prepare()` ምንም አያዘጋጅም፤ ሙከራ በትክክል `{"resourceSpans":[]}` ይልካል እና
የጥሪ መዝገብ ስፓኖችን ሳይጽፍ የHTTP ሁኔታን ያሳያል።

የክትትል መለያዎች እና የስፓን መለያዎች በቅደም ተከተል በ
`"omniroute.trace\\0" + callLogId` እና `"omniroute.span\\0" + callLogId` ላይ ከተሰላው SHA-256 የመጀመሪያዎቹ 32/16 የአስራ ስድስትዮሽ አሃዞች ናቸው። ድጋሚ መላኮች
ተመሳሳይ መለያዎችን ይይዛሉ። ይህ የተደጋጋሚ ማስወገድ ዋስትና አይደለም፤ የLangfuse
v4 ቅበላን ጨምሮ አንዳንድ የጀርባ ስርዓቶች ተመሳሳይ መለያ ያላቸውን ስፓኖች አያስወግዱም። ብልሽት ወይም የከፊል ቁራጭ መክሸፍ
ቢበዛ መቀበሉ ያልተረጋገጠውን አንድ የጠቋሚ ጥቅል እንደገና ሊልክ ይችላል፤ ያ ሙሉ ጥቅል ሊደገም ይችላል፣
የመጨረሻው የHTTP ክፍሉ ብቻ አይደለም። ይህን መደራደር በአእምሮ በመያዝ የጠቋሚ ጥቅሉን መጠን ይምረጡ።

### የLangfuse ምሳሌ

በራስዎ ለሚያስተናግዱት የLangfuse አገልግሎት እነዚህን መስኮች ያዋቅሩ፦

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

የAuthorization እሴቱን በአካባቢዎ የቀጥተኛው `public-key:secret-key`
ሕብረቁምፊ Base64 አድርገው ይገንቡ (ለምሳሌ በ`Buffer.from(publicKey + ":" + secretKey).toString("base64")`)።
እውነተኛ ማረጋገጫዎችን ወደ መዝገቦች፣ የማያ ገጽ ቅጂዎች ወይም የችግር ሪፖርቶች አይለጥፉ። ማዛመዱ በራስ-ሰር
`x-langfuse-ingestion-version: 4` ያዘጋጃል፤ Authorization አሁንም በ`headers` ውስጥ ይቀርባል።
ሁለቱም ራስጌዎች እና የሚፈጠረው የማንነት ሶልት ነባሩን የተመሰጠረ የሚስጥር መስክ
ዘዴ እና የAPI ቦታ ያዦችን ይጠቀማሉ፤ `STORAGE_ENCRYPTION_KEY` ያስፈልጋል።

ማዛመዱ የማመንጨት ዓይነት/ሞዴል፣ የJSON አጠቃቀም ዝርዝሮችን (ግቤት/ውጤት/ጠቅላላ እና ያሉ
የመሸጎጫ ቁልፎች)፣ የJSON ግቤት/ውጤት ቅጽበታዊ ቅጂዎችን፣ ERROR/DEFAULT ደረጃን፣ የተጣራ የሁኔታ መልዕክትን፣
የክትትል ስምን፣ የክፍለ ጊዜ መለያን፣ አማራጭ አካባቢን እና ለአቅራቢ፣ ለተጠየቀው ሞዴል፣ ለዱካ፣ ለጥምረት፣ ለመሸጎጫ
ምንጭ እና ሁኔታ ሊጣራ የሚችል
`langfuse.observation.metadata.<key>` ይጨምራል። `langfuse.observation.completion_start_time`፣ TTFT ሲታወቅ እና በቆይታው ውስጥ ሲሆን ብቻ፣
የመጀመሪያ ጊዜ + TTFT በISO 8601 ቅርጸት ይሆናል። ምንም የወጪ ባህሪያት አይላኩም።

የማንነት ሁነታዎች በ`langfuse.user.id` ላይ ይተገበራሉ፦

- `pseudonymous` (ነባሪ)፦ ለእያንዳንዱ መዳረሻ በዘፈቀደ ከሚፈጠር
  ባለ32-ባይት ሶልት ጋር የAPI ቁልፉ ውስጣዊ መለያ HMAC-SHA256። ሶልቱ ከሌለ በመፍጠር ጊዜ ይመነጫል፣
  እንደ `identitySalt` ይመሰጠራል፣ ፈጽሞ ተመልሶ አይሰጥም፣ እና በአርትዖት ጊዜ ይቆያል። ጥሬ የቁልፍ መለያዎች
  በስፓን ባህሪያት ውስጥ ፈጽሞ አይገቡም። የመዳረሻን ሶልት እንደገና መፍጠር/ማደስ ማንነቶችን ይለውጣል።
- `keyName`፦ የተዋቀረው የAPI ቁልፍ ስም፣ ያንን የኦፕሬተር መለያ ሆን ተብሎ ያሳያል።
- `none`፦ የተጠቃሚ መለያ የለም። የክፍለ ጊዜ መለያ ምልክቶች ሲኖሩ አሁንም ወደ ውጭ ይላካሉ፤ እነዚህ ሁነታዎች
  የዘፈቀደ የፕሮምፕት ይዘትን ወይም በኦፕሬተር የቀረቡ የክፍለ ጊዜ/የተዛማጅነት መለያዎችን ማንነት አልባ አያደርጉም።

### ያለ ታሪካዊ ውሂብ ዳግም ሙሌት መጀመር

በመፍጠር ጊዜ ብቻ፣ **ከአሁኑ ቦታ ጀምር (ያሉትን መዝገቦች ዝለል)** ያንቁ ወይም
`startFromCurrentPosition: true` በመፍጠሪያ API የውሂብ ጥቅል የላይኛው ደረጃ ላይ ያስተላልፉ። ይህ ያሉትን የጠቋሚ
አጋዥ ተግባራት በመጠቀም፣ ያለ ማዛወር፣ `cursor_row_id`ን በአሁኑ ጊዜ ተጠብቆ ካለው የጥሪ መዝገብ ከፍተኛው rowid
ያስጀምረዋል። ነባሪው false ነው (ጠቋሚ 0 እና የተጠበቀውን ታሪክ ዳግም መሙላት)።
ይህ በማዘመን ጊዜ ጠቋሚን እንደገና የማስጀመር ቅንብር አይደለም።

የጋራው `ttftMs` ጭማሪ በBigQuery ማዛመጃ
እና በአዲስ ሰንጠረዥ ስኪማ ላይ null ሊሆን የሚችል `ttft_ms` ዓምድ ይጨምራል፤ የስኪማ ሙከራው እያንዳንዱ መደበኛ የመዝገብ መስክ
ዓምድ እንዲኖረው ይጠይቃል። ያሉ ሰንጠረዦች ሳይለወጡ ወደ ውጭ መላካቸውን ይቀጥላሉ፦ `prepare()` የሰንጠረዡን ስኪማ ያነባል እና
ያ ዓምድ በሌለበት ጊዜ `ttft_ms`ን ብቻ ይተዋል። በሚቀጥለው ሂደት TTFT ለማግኘት
null ሊሆን የሚችል INT64 ዓምድ ያክሉ፣ ወይም አዲስ ሰንጠረዥ ይጠቀሙ። PATCH፣ ራስ-ሰር የስኪማ ለውጥ ወይም ተጨማሪ
ፈቃዶች አያስፈልጉም፤ ሌሎቹ ሁሉም የረድፍ መስኮች ጥብቅ የስኪማ ማረጋገጫን ይቀጥላሉ።

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

## 7. ማስኬድ

- **ዳሽቦርድ**፦ ውህደቶች → የምዝግብ ወደ ውጭ መላክ። መዳረሻ ያክሉ፣ ረድፎችን ሳይጽፉ የመግቢያ ማረጋገጫ መረጃዎችን ለማጣራት **ሙከራ**ን ያስኪዱ፣
  ከዚያም ያንቁት።
- **በመጠባበቅ ላይ ያለ ክምችት**፦ እያንዳንዱ የመዳረሻ ካርድ በመጠባበቅ ላይ ያሉ ረድፎችን እና ጠቋሚውን ያሳያል፤ `GET
/api/log-export/status` እነዚሁኑ አሃዞች ከመጨረሻዎቹ 20 የሥራ ሂደቶች ጋር ይመልሳል።
- **የአንድ መዳረሻ አለመሳካት ሌሎቹን አያስከሽፍም** — የሂደቱ ማጠቃለያ የእያንዳንዱን መዳረሻ
  ሁኔታ በ`last_status` / `last_error` ውስጥ ይመዘግባል፣ የሥራ ሂደት ታሪኩም አጠቃላይ ውጤቱን ይይዛል።
- **መዳረሻን መሰረዝ ጠቋሚውንም ይሰርዛል።** እንደገና ማከል ከተያዘው እጅግ አሮጌ
  የጥሪ ምዝግብ ይጀምራል፤ ይህም መዳረሻው አስቀድሞ የያዛቸውን ረድፎች እንደገና ይልካል። በBigQuery ላይ የእያንዳንዱ ረድፍ
  `insertId` ይህን ድግግሞሽ የሚያስወግደው በBigQuery የራሱ ድግግሞሽ ማስወገጃ የጊዜ ገደብ ውስጥ ብቻ ነው፤ ስለዚህ
  መዳረሻን ከመሰረዝ ይልቅ ማሰናከልን ይምረጡ።
