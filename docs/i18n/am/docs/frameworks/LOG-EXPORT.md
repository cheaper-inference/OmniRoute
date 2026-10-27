# Log export (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

የOmniRoute ጥሪ ምዝግቦችን ወደ ውጫዊ የትንታኔ ማከማቻ በተከታታይ እና በየደረጃው መላክ።

የLogs ዳሽቦርድ ትር የጥያቄ ታሪክን በSQLite (`call_logs`) ውስጥ ያስቀምጣል፤ ይህም
በማዞር እና በማቆያ ፖሊሲ የተገደበ ነው። የምዝግብ መላክ ተመሳሳዩን የመዝገብ ስብስብ በጊዜ ሰሌዳ መሠረት
ወደ ውጭ ይልካል፤ በዚህም ከአካባቢያዊው የውሂብ ጎታ በላይ ለረጅም ጊዜ እንዲቆይ እና ከሌሎች ውሂቦች ጋር እንዲጣመር ያደርጋል። BigQuery የመጀመሪያው መድረሻ ነው፤
የማስኬጃ መስመሩ መዝገብ ቤት ስለሆነ፣ ተጨማሪ መድረሻዎችን መጨመር ይቻላል።

---

## 1. እንዴት እንደሚሠራ

```
ሰርቨር (ውቅረትን ዲክሪፕት ማድረግ + ማረጋገጥ፣ ጠቋሚን ማመሳሰል)
  → IPC ማስጀመር → የተነጠለ exportChild OS ፕሮሰስ
    → ለንባብ ብቻ storage.sqlite → የጋራ የጥሪ ምዝግብ መጠይቅ/ማዛመድ
      → ያልተመሳሰለ የአርቲፋክት ማሟላት → መዳረሻ prepare()/send()
        → የባች IPC → ሰርቨሩ ጠቋሚውን ያስቀምጣል → የማረጋገጫ IPC
          → ቀጣዩ ባች፤ done IPC → ሰርቨሩ ስኬትን ይመዘግባል
```

- **መርሐግብር** — አንድ `JobRegistry` cron ሥራ፣ `log_export`፣ ነባሪው `0 * * * *` (በየሰዓቱ፣
  UTC) ነው። በ`src/lib/initCloudSync.ts` ውስጥ ይመዘገባል፤ በ`OMNIROUTE_LOG_EXPORT_CRON`
  ሊቀየር ይችላል። እያንዳንዱ ዙር ሁሉንም **የነቁ** መዳረሻዎች በቅደም ተከተል ያስኬዳል።
- **ጠቋሚ** — የSQLite ስውር `call_logs.rowid` ሲሆን፣ ለእያንዳንዱ መዳረሻ በ
  `log_export_destinations.cursor_row_id` ውስጥ ይቀመጣል። `timestamp` ሆን ተብሎ እንደ ጠቋሚ
  አያገለግልም፦ ጠሪዎች የራሳቸውን ዋጋ ሊያቀርቡ ስለሚችሉ፣ ዘግይቶ የተጠናቀቀ ጥያቄ
  ከእሱ በኋላ ከጀመረ ፈጣን ጥያቄ በኋላ ሊጻፍ ይችላል፤ የጊዜ ማኅተም ጠቋሚም ይህን ይዘለዋል።
- **በባች ማካሄድ** — በእያንዳንዱ ጥያቄ `batch_size` ረድፎች (ነባሪ 500)፣ በእያንዳንዱ
  ማስኬጃ `max_rows_per_run` ረድፎች (ነባሪ 10000) ይላካሉ፤ በዚህም ትልቅ የተጠባባቂ ሥራ
  አንድን ዙር ከማገድ ይልቅ በበርካታ ዙሮች ይጠናቀቃል።
- **ማድረስ** — ጠቋሚው ወደፊት የሚሄደው `send()` በተሳካ ሁኔታ ከተጠናቀቀ በኋላ ብቻ ነው።
  ያልተሳካ ባች ጠቋሚውን ባለበት ይተወዋል፤ ስለዚህ ተመሳሳይ ረድፎች በሚቀጥለው ማስኬጃ
  እንደገና ይሞከራሉ። ዋስትናው ቢያንስ አንድ ጊዜ ማድረስ ከመዳረሻ-ወገን የተደጋጋሚ ውሂብ
  ማስወገድ ጋር እንጂ፣ በእውነት አንድ ጊዜ ብቻ ማድረስ አይደለም፦ BigQuery እያንዳንዱን
  ረድፍ በጥሪ ምዝግብ id ይለያል፤ ይህንም በራሱ የተደጋጋሚ ውሂብ ማስወገጃ ጊዜ መስኮት
  ውስጥ በሚቻለው መጠን ያከብራል።
- **የመደራረብ መከላከያ** — የcron ዙሩ እና `POST .../run` በአንድ ጊዜ ሊነሱ ይችላሉ።
  አስቀድሞ እየተካሄደ ያለ መዳረሻ ሁለት ጊዜ ከመካሄድ ይልቅ ይዘለላል (በማስኬጃው ውጤት
  ውስጥ `skipped: true`)፤ ስለዚህ በአንድ ጊዜ የሚካሄድ ማስኬጃ አንድን ባች እንደገና
  መላክ ወይም ጠቋሚውን ወደ ኋላ መጻፍ አይችልም።
- **ከማጽዳት ማገገሚያ** — `cursor_row_id` ከ`MAX(rowid)` በላይ ከሆነ (መላው ሰንጠረዥ
  ተጽድቶ rowid እንደገና ከጀመረ)፣ ማስኬጃው ለዘላለም መረጃ ማየት እንዳይሳነው ጠቋሚውን
  ወደ 0 ይመልሳል።

### የተነጠለ ማስኬጃ እና ገደቦች

በNode ላይ ያለ እያንዳንዱ የመዳረሻ ማስኬጃ የተለየ፣ ለአጭር ጊዜ የሚቆይ የOS ልጅ ፕሮሰስ
ያስጀምራል (`child_process` ከIPC ጋር፣ `worker_threads` አይደለም)። የbody ንባብ፣
የpayload JSON መተንተን/ወደ ተከታታይ ቅርጽ መቀየር፣ የመዳረሻ `prepare()` እና የመዳረሻ
የአውታረ መረብ I/O ሁሉም የሚካሄዱት እዚያ እንጂ በሰርቨሩ event loop ላይ አይደለም።
በIPC በኩል የሚተላለፉት ውቅረት እና አነስተኛ የሂደት መልዕክቶች ብቻ ናቸው፤ ወደ ውጭ
የተላኩ መዝገቦች ወደ ሰርቨሩ ፈጽሞ አይመለሱም። የcron ሥራው እና የRun now route
ተመሳሳዩን የውጭ ውጤት እና የመደራረብ መከላከያ ይጠብቃሉ።

ልጅ ፕሮሰሱ በሰርቨሩ የተወሰነ `DATA_DIR/storage.sqlite` ላይ `node:sqlite`ን በመጠቀም፣
በ`busy_timeout=5000` እና `query_only=ON` ለንባብ ብቻ ይከፍታል። ምንም የDB singleton
አያስመጣም፤ migrations፣ backups ወይም SQLite updates አያከናውንም። የጎደለ/የተበላሸ
አርቲፋክት መዝገብ አያያዝ (የተበላሸውን አርቲፋክት UPDATE ጨምሮ) በdashboard detail path
ውስጥ ብቻ ይቆያል። ሁለቱም መንገዶች ምንም ጎንዮሽ ተጽዕኖ የሌለውን detail resolver
ይጋራሉ፤ export ያልተመሳሰሉ የፋይል ስርዓት ንባቦችን እና ተመሳሳዩን አርቲፋክት →
legacy inline → legacy disk → none የመፍትሔ ቅደም ተከተል ይጠቀማል። ልጁ አንባቢውን
ሲከፍት ማስኬጃው ከፍተኛውን የማስገቢያ rowid ቅጽበታዊ ቅጂ ይይዛል፤ በኋላ የሚገቡ
መዝገቦች እስከሚቀጥለው ማስኬጃ ይጠብቃሉ። ይህ የማስገቢያ ድንበር እንጂ ለረጅም ጊዜ
የሚቆይ SQLite transaction አይደለም፦ በአውታረ መረብ መጠበቂያዎች ጊዜ WAL writers እና
checkpoints ያለገደብ ሊሠሩ ይችላሉ። በነባር ረድፎች ላይ የሚደረጉ ማዘመኛዎች/ስረዛዎች
በዚህ ድንበር አይቆሙም።

እያንዳንዱ ባች ተቀባይነት ካገኘ በኋላ ልጅ ፕሮሰሱ ማረጋገጫ ይጠብቃል። ሰርቨሩ መጀመሪያ
ጠቋሚውን በ`advanceLogExportCursor` ያስቀምጣል፣ ከዚያ `ack` ይልካል፤ ከዚያ በፊት
ምንም ቀጣይ ባች አይጀምርም። የመላክ አለመሳካት፣ መሰናከል ወይም የጊዜ ገደብ ማለፍ
ያንን ባች ወደፊት ሳያስተላልፍ አለመሳካቱን ይመዘግባል። ቀደም ሲል ማረጋገጫ
የተሰጣቸው ባቾች እንደተመዘገቡ ይቆያሉ፤ ቢበዛ ማረጋገጫ ያልተሰጠው አንድ ባች ብቻ
እንደገና ሊላክ ይችላል። ስኬት የሚመዘገበው `done` ከደረሰ እና ልጅ ፕሮሰሱ ያለችግር
ከወጣ በኋላ ብቻ ነው። አለመሳካቶች ልጅ ፕሮሰሱን በSIGTERM ያቋርጣሉ፣ ከ500 ms በኋላ
ወደ SIGKILL ያሳድጋሉ፤ ማስኬጃውም ፕሮሰሱ እስኪዘጋ ይጠብቃል።

| የአካባቢ ተለዋዋጭ                                   | ነባሪ    | ዓላማ                        |
| --------------------------------------------- | ------ | -------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000 | የእያንዳንዱ መዳረሻ አጠቃላይ የጊዜ ገደብ |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024   | የልጅ V8 old-space ገደብ በMB   |

ልክ ያልሆኑ/አዎንታዊ ያልሆኑ/ኢንቲጀር ያልሆኑ ዋጋዎች ነባሪዎቹን ይጠቀማሉ። የheap ቅንብሩ
አጠቃላይ የRSS ገደብ አይደለም፤ በጣም ትልቅ ባቾች አሁንም የልጅ ፕሮሰሱን ማህደረ ትውስታ
ሊያሟጥጡ እና ማስኬጃውን በደህንነት ሊያሳኩት ይችላሉ። የ1024 MB ነባሪ ቅንብር body
የነቃላቸውን 512 KiB አርቲፋክቶች ለያዘው ነባሪ የ500 ረድፍ ባች፣ የBigQuery
በbyte የተከፋፈለ JSON serializationን ጨምሮ፣ ተጨማሪ ቦታ ይተዋል። ይህ ግን 10000
ረድፎች ያሉትን bodies ባች ደህንነቱ የተጠበቀ አያደርገውም። የV8 heap መሟጠጥ ተግባራዊ
መፍትሔ ያለውን አለመሳካት ይመዘግባል፦ የባች መጠኑን ይቀንሱ ወይም
`OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`ን ይጨምሩ፤ ጠቋሚው ማረጋገጫ ባገኘው
የመጨረሻ ባች ላይ ይቆያል። ታሪካዊ inline/disk bodies በዘመናዊው የአርቲፋክት ገደብ
አይሸፈኑም። ኦፕሬተሮች፣ በተለይ በማህደረ ትውስታ ገደብ ባላቸው containers ውስጥ፣
ለRSS የተለየ አቅም መመደብ አለባቸው።

ልጅ ፕሮሰሱ የሚወርሰው የተወሰነውን `DATA_DIR`፣ `NODE_ENV`፣ በግልጽ የተቀናበረ `TZ`
(ለlegacy filename የአካባቢ ሰዓት መፍትሔ)፣ በሚገኝበት ጊዜ `ELECTRON_RUN_AS_NODE`ን እና
የሚከተሉትን ወደ ውጭ የሚወጡ ግብዓቶች ብቻ ነው፦ `HTTP_PROXY`፣ `HTTPS_PROXY`፣
`ALL_PROXY`፣ `NO_PROXY` (እና በትንሽ ፊደላት የተጻፉ ቅጾቻቸው)፣
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`፣ `NODE_EXTRA_CA_CERTS`፣ `SSL_CERT_FILE`፣ `SSL_CERT_DIR`።
አጠቃላይ Undici dispatcher የሰርቨሩን ምንም ጎንዮሽ ተጽዕኖ የሌለው የአካባቢ-proxy መፍትሔ
እና `NO_PROXY`ን ጨምሮ የአካባቢ-host ማለፊያ ደንቦችን ይጋራል፤ `proxyFetch.ts`ን ወይም
የእሱን DB/feature flags አያስመጣም። የProxy ማረጋገጫ መረጃዎች ከሚተላለፈው ውጤት እና
ከሚመዘገቡ ስህተቶች ይደበቃሉ። የመዳረሻ ማረጋገጫ መረጃዎች በአንድ የማስጀመሪያ IPC
መልዕክት ብቻ ይተላለፋሉ፤ በargv ወይም በenvironment ፈጽሞ አይተላለፉም። የውጤት/ስህተት
ማስተላለፍ ቅድመ ቅጥያ ይኖረዋል እና የስሱ መረጃ ይወገድበታል። በእያንዳንዱ cron
ማስኬጃ የNode SQLite ማስጠንቀቂያ እንዳይደገም፣ በልጅ ፕሮሰሱ exec arguments ውስጥ
የሚሰናከለው `ExperimentalWarning` ብቻ ነው፤ ሌሎች የማስጠንቀቂያ ዓይነቶች እንደሚታዩ
ይቆያሉ።

የመድረሻ ሞጁሎች ያለ Next.js/በአገልጋይ ላይ ብቻ የሚገኙ ጥገኞች ሊመጡ የሚችሉ መሆን አለባቸው። አሁን ያለው
የBigQuery ትግበራ ይህን ውል አስቀድሞ ያሟላል። የመዳረሻ-ቶከን መሸጎጫዎች የሚቆዩት ለልጅ
ሂደቱ ብቻ እንጂ በተለያዩ ሂደቶች መካከል አይደለም። Node የሚደገፈው runtime ነው (`package.json` engines)፣ ነገር ግን በREADME ውስጥ ያለው የBun
መጫኛ ክፍል እና `Dockerfile.bun` እንዲሁም `bun:sqlite`ን በመጠቀም የምርት አካባቢ ተኳኋኝነት መንገድን
ያስተዋውቃሉ (`src/lib/db/core.ts` / adapters)። ስለዚህ በBun ስር፣ ወደ ውጭ የሚላኩ ውሂቦች የቀድሞውን
በሂደት ውስጥ የሚከናወን መንገድ ይዘው ይቆያሉ እና አንድ ጊዜ ብቻ የሚታይ ማስጠንቀቂያ ይሰጣሉ፦ የልጅ heap/timeout ማግለል አይገኝም።
ለevent-loop እና OOM ማግለል Nodeን ይጠቀሙ፤ Bun እዚህ ለልማት ብቻ እንደሚውል አይቆጠርም።

`includeBodies` ሲነቃ፣ የአንድ ሰዓት የpayload ክምችት ከማከማቸት ይልቅ እንደ
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` ያለ በደቂቃ ደረጃ የሚሰራ ድግግሞሽ ይምረጡ።
የbatch እና የረድፍ ገደቦች አሁንም እያንዳንዱን ሂደት ይገድባሉ። የሂደት ማስጀመሪያ ወጪ በእያንዳንዱ ሂደት ለእያንዳንዱ መድረሻ ይከፈላል፤
ይህም አነስተኛ የማስጀመሪያ ወጪን በአገልጋዩ event-loop ማግለል ይለውጣል እንጂ አጠቃላይ የCPU አጠቃቀምን አይቀንስም።

### Payloads (prompts እና completions)

በነባሪ፣ ወደ ውጭ የሚላከው የLogs **ዝርዝር** የሚያሳያቸውን የማጠቃለያ መስኮች ብቻ ይይዛል።
**Prompts እና responses ወደ ውጭ ላክ** (`includeBodies`)ን ማብራት በተጨማሪ የLogs **ዝርዝር መረጃ**
ፓነል ለእያንዳንዱ ጥሪ የሚያሳየውን ይልካል፦

| መስክ                              | የያዘው ነገር                                       |
| -------------------------------- | ---------------------------------------------- |
| `request_body` / `response_body` | ዳሽቦርዱ እንደሚያቀርባቸው የጥሪው payloads                 |
| `pipeline_route_decision`        | router የመረጠው target እና model                   |
| `pipeline_client_request`        | client በትክክል እንደላከው ያለው raw request            |
| `pipeline_openai_request`        | ወደ ውስጣዊው የOpenAI ቅርጽ ከተተረጎመ በኋላ                |
| `pipeline_provider_request`      | በprovider dialect ወደ upstream በትክክል እንደተላከው    |
| `pipeline_provider_response`     | ያልተቀነባበረው upstream response                    |
| `pipeline_client_response`       | ለጠሪው ተመልሶ የተሰጠው                                |
| `pipeline_error`                 | ላልተሳካ ጥሪ የpipeline-ደረጃ error ዝርዝር              |
| `bodies_truncated`               | ከላይ ካሉት መስኮች ማንኛውም `maxBodyBytes` ላይ ሲደርስ True |

ይህ የprompt ይዘት ነው፣ ስለዚህ **በነባሪ ጠፍቷል** እና ሆን ተብሎ በእያንዳንዱ መድረሻ የሚመረጥ ነው።
ወደ ውጭ የሚላከው ዳሽቦርዱ የሚያሳየው ነው፤ ምክንያቱም export እና `getCallLogById` የዝርዝር መረጃ
መፍታትን በጋራ ይጠቀማሉ፦ payloads ሲጻፉ
አስቀድመው PII ተጣርተው እና ሚስጥሮች ተደብቀውባቸዋል፤ እንዲሁም በ
`noLog` API key የተደረገ ጥሪ ምንም payload አያከማችም፣ ስለዚህ ወደ ውጭ የሚላክ ምንም ነገር የለም።

Payloads ከfilesystem artifact በየረድፉ ይነበባሉ፣ ስለዚህ hydration የሚከናወነው
ለጠየቁት መድረሻዎች ብቻ ነው። የጠፋ ወይም የተበላሸ artifact batchን አስከሽፎ cursorን
ከማስቆም ይልቅ ማጠቃለያውን ከnull payloads ጋር ወደ ውጭ ይልካል።

`maxBodyBytes` (ነባሪ 262144) እያንዳንዱን መስክ ይገድባል። ረዘም ያሉ payloads **ከመጣል ይልቅ
ይቆረጣሉ** — የተቆረጠ prompt እንኳን "ምን ተጠየቀ" የሚለውን አሁንም ይመልሳል — እና ረድፉ በ
`bodies_truncated` ምልክት ይደረግበታል። በchunk-by-chunk የተላለፉ deltas ወደ ውጭ አይላኩም፤ የተገጣጠመው response
አስቀድሞ በ`pipeline_provider_response` እና `pipeline_client_response` ውስጥ ይገኛል።

---

## 2. ፋይሎች

| ክፍል             | መገኛ                                          |
| --------------- | -------------------------------------------- |
| የመዳረሻ ውል        | `src/lib/logExport/types.ts`                 |
| መዝገብ            | `src/lib/logExport/registry.ts`              |
| የሚስጥር አያያዝ      | `src/lib/logExport/secrets.ts`               |
| አስኪያጅ (ወላጅ IPC) | `src/lib/logExport/runner.ts`                |
| የሂደት የሕይወት ዑደት  | `src/lib/logExport/childRunner.ts`           |
| የልጅ መግቢያ        | `src/lib/logExport/exportChild.ts`           |
| ለንባብ ብቻ መክፈቻ    | `src/lib/db/logExportReadOnly.ts`            |
| የጋራ መጠይቅ/ማዛመድ   | `src/lib/usage/callLogExportQueries.ts`      |
| የዝርዝር ፈቺ        | `src/lib/usage/callLogDetailResolver.ts`     |
| የAPI ትንበያ       | `src/lib/logExport/presenter.ts`             |
| BigQuery መዳረሻ   | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA ማረጋገጫ | `src/lib/logExport/googleServiceAccount.ts`  |
| የጥሪ ምዝግብ ምንጭ    | `src/lib/usage/callLogExportSource.ts`       |
| ቋሚ ማከማቻ         | `src/lib/db/logExportDestinations.ts`        |
| Cron ሥራ         | `src/lib/jobs/logExportJob.ts`               |
| REST ንብርብር      | `src/app/api/log-export/`                    |
| የዳሽቦርድ ገጽ       | `src/app/(dashboard)/dashboard/log-export/`  |

መርሃግብር፦ `src/lib/db/migrations/170_log_export_destinations.sql`።

---

## 3. REST API

ሁሉም መስመሮች በአስተዳደር ማረጋገጫ (`requireManagementAuth`) የተጠበቁ ናቸው። ሚስጥሮች ፈጽሞ አይመለሱም፦
የተከማቸ ሚስጥር እንደ ቃል በቃል `__stored__` ይመለሳል፤ በማዘመን ጊዜ ያንን እሴት መልሶ መላክ
የተከማቸውን ማረጋገጫ መረጃ እንዳለ ያቆየዋል።

ዓይነቱ ሚስጥር እንዳለው የሚገልጽ መድረሻን መፍጠር ወይም ማዘመን **`STORAGE_ENCRYPTION_KEY`
ያስፈልገዋል**። ያለዚህ `encrypt()` ምንም ሳይለውጥ በዝምታ ያሳልፋል፤ ስለዚህ የማረጋገጫ መረጃን
በSQLite ውስጥ እንደ ግልጽ ጽሑፍ ከማስቀመጥ ይልቅ ጽሑፉ በ400 ውድቅ ይደረጋል (ይህም የTelegram
webhook የሚተገብረው ተመሳሳይ መከላከያ ነው)።

| ዘዴ       | መንገድ                                     | ዓላማ                                               |
| -------- | ---------------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | የመድረሻ ዓይነቶች + የውቅር መስኮቻቸው ዝርዝር                    |
| `GET`    | `/api/log-export/destinations`           | መድረሻዎችን ይዘርዝሩ (ሚስጥሮች ተሸፍነዋል)                      |
| `POST`   | `/api/log-export/destinations`           | መድረሻ ይፍጠሩ                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | አንዱን ያንብቡ                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | ስም / የነቃ ሁኔታ / ውቅር / በጥቅል ማስኬድን ያዘምኑ              |
| `DELETE` | `/api/log-export/destinations/{id}`      | ይሰርዙ                                              |
| `POST`   | `/api/log-export/destinations/{id}/test` | የማረጋገጫ መረጃን ይፈትሹ፣ ምንም አይጻፉ                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | አሁን ያስወግዱ፣ ከታቀደው አሂድ ጋር ተመሳሳይ መንገድ                |
| `GET`    | `/api/log-export/status`                 | የCron ሁኔታ፣ የቅርብ ጊዜ አሂዶች፣ በእያንዳንዱ ዒላማ ያልተከናወኑ ሥራዎች |

`GET /api/log-export/types` UIውን አጠቃላይ እንዲሆን የሚያደርገው ነው፦ የዳሽቦርድ ቅጹ
ከተመለሱት የመስክ ገላጮች ይሳላል፤ ስለዚህ አዲስ መድረሻ ምንም የUI ለውጥ አያስፈልገውም።

---

## 4. BigQuery መድረሻ

የውቅር ቁልፎች (`type: "bigquery"`)፦

| ቁልፍ                  | ማስታወሻዎች                                                   |
| -------------------- | --------------------------------------------------------- |
| `projectId`          | የውሂብ ስብስቡን የያዘው GCP ፕሮጀክት                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                           |
| `location`           | የውሂብ ስብስቡ መፈጠር ሲኖርበት ብቻ ጥቅም ላይ ይውላል (ነባሪ `EU`)            |
| `serviceAccountJson` | የአገልግሎት መለያ ቁልፍ። ሚስጥር፦ በማከማቻ ጊዜ የተመሰጠረ፣ ፈጽሞ የማይመለስ        |
| `autoCreate`         | በመጀመሪያው ወደ ውጭ መላክ ላይ የውሂብ ስብስቡንና ሰንጠረዡን ይፍጠሩ (ነባሪ `true`) |

የአገልግሎት መለያው በዒላማው ሰንጠረዥ ላይ `bigquery.tables.updateData`፣ በተጨማሪም
`autoCreate` ከነቃ `bigquery.datasets.create` / `bigquery.tables.create` ያስፈልገዋል።

የተዋቀረ ጥቅል የHTTP ሳይሆን የ**ጠቋሚ** አሃድ ነው፦ `send()` እስከ 500 ረድፎች ብቻ ወዳሏቸው
insertAll ጥሪዎች ይከፋፍለዋል፤ ስለዚህ ትልቅ `batch_size` የBigQueryን የ10 MB የጥያቄ ገደብ ሊያልፍ
አይችልም። ጊዜያዊ ሁኔታዎች (408/429/500/502/503/504) በኤክስፖነንሺያል መዘግየት እስከ ሦስት
ጊዜ ድረስ፣ ተመሳሳይ insertIdsን እንደገና በመጠቀም ይሞከራሉ፤ የማረጋገጫና የመርሐግብር ውድቀቶች
አሂዱን በከንቱ ከማባከን ይልቅ በመጀመሪያው ሙከራ ላይ ስህተት ይጥላሉ።

ከጥቂት ጊዜ በፊት የተፈጠረ ሰንጠረዥ ለዥረት መጨረሻ ነጥቡ ገና አይታይም፤ ስለዚህም ለጥቂት
ሰከንዶች 404 ይመልሳል። ያ 404 እንደገና ይሞከራል፣ ነገር ግን **ይህ አሂድ ሰንጠረዡን
ሲፈጥር ብቻ** ነው — በእርግጥ የሌለ ሰንጠረዥ ግን ወዲያውኑ ይወድቃል። በቅርቡ በተሰረዘ ስም ስር
ሰንጠረዥን እንደገና መፍጠር BigQuery ለብዙ ደቂቃዎች የዥረት ማስገባቶችን ውድቅ እንዲያደርግ
እንደሚያደርገው ያስተውሉ፤ ይህ የመሰረዝ-ከዚያም-እንደገና-የመፍጠር ባህሪ ስለሆነ፣ ሰንጠረዥን
ከማስወገድና እንደገና ከማከል ይልቅ አዲስ የሰንጠረዥ ስም መጠቀም ይመረጣል።

**ከፊል ውድቀት ባዶ ያልሆነ `insertErrors[]` ይዞ እንደ HTTP 200 ይመጣል።** ይህ እንደ
ውድቀት ተቆጥሮ ስህተት ይጥላል፤ ይህም BigQuery ካልተቀበላቸው ረድፎች አልፎ ጠቋሚው እንዳይራመድ
ያስቆመዋል፤ `tests/unit/log-export-bigquery.test.ts` ባህሪውን ያረጋግጣል።

መጓጓዣው ተራ REST ነው — በራስ የተፈረመ RS256 ማረጋገጫ በ
`https://oauth2.googleapis.com/token` የመዳረሻ ቶከን ለማግኘት ይለወጣል፣ ከዚያም ረድፎቹ ወደ
`tabledata.insertAll` ይሄዳሉ። ምንም Google SDK አይጨመርም። የመዳረሻ ቶከኖች በእያንዳንዱ
(የአገልግሎት መለያ፣ ወሰን) በሂደቱ ውስጥ በመሸጎጫ ይቀመጣሉ።

የተፈጠረው ሰንጠረዥ ለእያንዳንዱ የLogs ትር መስክ አንድ ዓምድ ከ`exported_at` ጋር ይይዛል፤
እንዲሁም የጥሪ ሎጎች በተግባር ለሚጠየቁበት መንገድ ተዘጋጅቷል፦

- **በ`timestamp` ላይ በቀን የተከፋፈለ**፣ ስለዚህ በቀን የተወሰነ ጥያቄ እነዚያን ቀናት ብቻ ይቃኛል።
- **በ`api_key_name`፣ `provider`፣ `model`፣ `status` የተከማቸ** (በዚያ ቅደም ተከተል)፣ ስለዚህ
  ማን እንዳስኬደው፣ ወዴት እንደሄደ ወይም እንደወደቀ መሰረት ማጣራት በእያንዳንዱ ክፍል ውስጥ
  ያሉ ጥቅሎችን ይቀንሳል። BigQuery ቢበዛ አራት የክላስተሪንግ ዓምዶችን ይፈቅዳል፣ እና ቅደም
  ተከተሉ አስፈላጊ ነው፦ በ`api_key_name` ብቻ ማጣራት ይቀንሳል፣ በ`status` ብቻ ማጣራት ግን
  አይቀንስም።
- በ`partitionExpirationDays` በኩል **አማራጭ የክፍል ማቆያ** (0 ሁሉንም ያቆያል)፣ ሰንጠረዡ
  ሲፈጠር ይተገበራል።

ሁለቱም ቅንብሮች በመፍጠር ጊዜ ተግባራዊ ይሆናሉ። ነባር ሰንጠረዥ ቀድሞውኑ ያለውን አቀማመጥ ይዞ ይቆያል፤ ስለዚህ
እነዚህን መተግበር ከፈለጉ መድረሻውን ወደ አዲስ የሰንጠረዥ id ያመልክቱ።

`tests/unit/log-export-bigquery.test.ts` ማፐሩና የሰንጠረዡ መርሐግብር በተመሳሳይ ሁኔታ
እንዲራመዱ ያረጋግጣል፤ በመሆኑም አዲስ የጥሪ ምዝግብ ዓምድ ወደ ውጭ በሚላክበት ሂደት ያለማስጠንቀቂያ ሊተው አይችልም።

ባቾች በ**ሁለቱም** የረድፍ ብዛትና ተከታታይ ተደርገው በተቀመጡ ባይቶች መጠን ይከፋፈላሉ። የውሂብ ጭነቶች ወደ ውጭ መላክ ከጀመሩ በኋላ የረድፍ ብዛት ብቻ በቂ አይደለም፤ መጠየቂያዎችን የያዙ 500 ረድፎች በአስር ሜጋባይቶች ሊለኩ ይችላሉ፣ እና insertAll
ከ10 MB በላይ የሆነ ጥያቄን አይቀበልም። ክፍሎቹ 500 ረድፎች ወይም 9 MB ሲደርሱ፣ ከሁለቱ ቀድሞ የደረሰው ላይ ይዘጋሉ።

---

## 5. መድረሻ ማከል

1. `LogExportDestinationType` የሚያስወጣ `src/lib/logExport/destinations/<name>.ts` ይፍጠሩ፦
   የZod `configSchema`፣ ለUI የሚያገለግል የ`fields` መግለጫ ድርድር፣ `secretFields`፣ እና
   `test()` / `prepare()` / `send(records)` የሚመልስ `createClient(config)`።
2. በ`src/lib/logExport/registry.ts` ውስጥ ወዳለው `DESTINATIONS` ድርድር ያክሉት።
3. በ`tests/unit/` ስር ሙከራዎችን ይጻፉ።

ለውጡ በሙሉ ይህ ብቻ ነው፦ የውሂብ ማቆያው፣ የcron ሥራው፣ የREST ንብርብሩ፣ የሚስጥር ምስጠራው እና
የdashboard ቅጹ ሁሉም registryውን ያነባሉ።

ለአዲስ መድረሻ ሁለት ደንቦች አሉ፦

- በከፊል ሲወድቅ `send()` **የግድ ስህተት መወርወር አለበት**። በስኬት መጠናቀቁ “መድረሻው እነዚህን ረድፎች ይዟል” ማለት ሲሆን፣
  cursorውም እነሱን በቋሚነት አልፎ ይሄዳል።
- ተጠቃሚው ያቀረበውን URL የሚቀበል መድረሻ፣ ልክ webhooks እንደሚያደርጉት፣ fetch ከማድረጉ በፊት
  በ`parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) በኩል ማረጋገጥ አለበት።
  BigQuery ይህን አያስፈልገውም፦ hostsዎቹ ቋሚዎች ናቸው።

---

## 6. ማስኬድ

- **Dashboard**፦ Integrations → Log export። መድረሻ ያክሉ፣ ረድፎችን ሳይጽፉ credentialsን ለማረጋገጥ
  **Test**ን ያስኪዱ፣ ከዚያም ያንቁት።
- **Backlog**፦ የእያንዳንዱ መድረሻ ካርድ በመጠባበቅ ላይ ያሉ ረድፎችን እና cursorውን ያሳያል፤ `GET
/api/log-export/status` ተመሳሳይ አኃዞችን ከመጨረሻዎቹ 20 የሥራ አስኬዶች ጋር ይመልሳል።
- **የአንድ መድረሻ ውድቀት ሌሎቹን አያወድቅም** — የአስኬዱ ማጠቃለያ የእያንዳንዱን መድረሻ
  ሁኔታ በ`last_status` / `last_error` ውስጥ ይመዘግባል፣ የሥራ አስኬድ ታሪኩም ድምር ውጤቱን ያቆያል።
- **መድረሻን መሰረዝ cursorውንም ይሰርዛል።** እንደገና ማከል ከቆየው እጅግ ጥንታዊው
  የጥሪ log ይጀምራል፤ ይህም መድረሻው አስቀድሞ የያዛቸውን ረድፎች እንደገና ይልካል። በBigQuery ላይ የእያንዳንዱ ረድፍ
  `insertId` ይህን የሚያስወግደው በBigQuery የራሱ የድግግሞሽ ማስወገጃ ጊዜ መስኮት ውስጥ ብቻ ነው፤ ስለዚህ መድረሻን
  ከመሰረዝ ይልቅ ማሰናከልን ይምረጡ።
