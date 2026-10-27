# SQLite Runtime Resolution (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute የSQLite ነጂውን ሲጀምር ባለ 5-ደረጃ ተተኪ ሰንሰለት ይወስናል፦

1. **አብሮ የታሸገ `better-sqlite3`** (በ`package.json` ውስጥ ባለው `dependencies` በኩል)
   — ፈጣኑ፣ የሀገርኛ ባይነሪ ያለው፣ የግንባታ መሣሪያዎች ሲኖሩ `npm install` የሚጭነው።

2. **በአሂድ ጊዜ የተጫነ `better-sqlite3`** (በ`~/.omniroute/runtime/` ውስጥ)
   — በመጀመሪያው አሂድ ጊዜ እንደ አስፈላጊነቱ **ወይም** በ`scripts/build/postinstall.mjs → scripts/postinstall.mjs` ይጫናል።
   የተበላሹ ወይም ለተሳሳተ መድረክ የተዘጋጁ ባይነሪዎች እንዳይጫኑ፣ ከመጫኑ በፊት
   የሀገርኛ `.node` ማጂክ ባይቶችን (ELF / Mach-O / PE) ያረጋግጣል።

3. **`node:sqlite`** (Node ≥22.5 መደበኛ ላይብረሪ) — የሀገርኛ ግንባታ አያስፈልግም፤
   ሁለቱም የbetter-sqlite3 መንገዶች ሲሳኩ ጥቅም ላይ ይውላል። የተገደበ የባህሪያት ስብስብ አለው።

4. **`sql.js`** (WASM) — የመጨረሻው ተተኪ። በሁሉም ቦታ ይሠራል፣ ነገር ግን የቀዘቀዘ ነው
   እና ውሂብን በተመሳሰለ ሁኔታ ከመጻፍ ይልቅ በጊዜ ክፍተት ይጽፋል።

## ይህ ውስብስብነት ለምን ያስፈልጋል?

- **Windows EBUSY**፦ የቀድሞው ስሪት `better_sqlite3.node` በአንድ እየሠራ ባለ ሂደት
  ተቆልፎ ከሆነ `npm install -g omniroute@latest` ሊሳካ አይችልም። በ
  `~/.omniroute/runtime/` ውስጥ በአሂድ ጊዜ መጫን ዓለም አቀፉን የnpm መሸጎጫ ያልፋል።
- **የግንባታ መሣሪያዎች አለመኖር**፦ አንዳንድ አካባቢዎች (VS Build
  Tools የሌለባቸው የድርጅት Windows ሥርዓቶች፣ አነስተኛ Docker ምስሎች) `better-sqlite3`ን
  ማጠናቀር አይችሉም። የአሂድ ጊዜ ጫኚው ቀድሞ የተገነባ ባይነሪ ከnpm መዝገብ ይወስናል፤
  ይህም ቢሳካ እንኳ ተተኪ ነጂዎቹ OmniRoute እንዲጀምር ያረጋግጣሉ።
- **ከውጭ አውታረ መረብ የተለዩ ሥርዓቶች**፦ የnpm መዝገብ ሊደረስበት ካልቻለ፣ `node:sqlite`
  ወይም `sql.js` መሠረታዊ ተግባራዊነትን ያረጋግጣሉ።

## የማጂክ ባይት ማረጋገጫ

በአሂድ ጊዜ የተጫነ `.node` ፋይል ከመጫኑ በፊት፣ OmniRoute የመጀመሪያዎቹን 8
ባይቶች ያነባል እና ከሚታወቁ የመድረክ ማጂክ እሴቶች ጋር ያዛምዳል፦

| መድረክ               | ባይቶች (ሄክስ)    | መለያ         |
| ------------------ | ------------- | ----------- |
| Linux              | `7F 45 4C 46` | `elf`       |
| macOS 64-ቢት BE     | `FE ED FA CF` | `macho`     |
| macOS 64-ቢት LE     | `CF FA ED FE` | `macho-le`  |
| macOS fat (ሁለንተናዊ) | `CA FE BA BE` | `macho-fat` |
| Windows            | `4D 5A` (MZ)  | `pe`        |

የማይዛመድ ማጂክ → ፋይሉ ችላ ይባላል፣ ተተኪውም ወደሚቀጥለው ደረጃ ይቀጥላል።

## ንቁውን ነጂ መፈተሽ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## በእጅ መቆጣጠር

```bash
# ለፈጣን CI ጭነቶች የpostinstall ቅድመ-ማሞቂያን ዝለል
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# የአሂድ ጊዜ better-sqlite3ን በግድ እንደገና ጫን
rm -rf ~/.omniroute/runtime
omniroute  # በሚቀጥለው ጅምር እንደገና ይጫናል

# የትኛው ነጂ ንቁ እንደሆነ ፈትሽ
omniroute config db-info  # (የCLI ትዕዛዙ ካለ)
```

## የተመሳሰሉ መዘግየቶችን መመርመር

`better-sqlite3`ን ሲጠቀሙ፣ የተመሳሰለ አስማሚ ጊዜ መለኪያን በምርጫ ለማንቃት ከመጀመርዎ በፊት
`OMNIROUTE_SQLITE_SLOW_MS=200`ን ያዘጋጁ። በነባሪነት የተሰናከለ ነው። ቢያንስ
ያንን ያህል ሚሊሰከንድ የወሰደ የተጠናቀቀ ክወና የ`[SQLITE-SLOW]` ማስጠንቀቂያን
ለእያንዳንዱ አስማሚ በአሥር ሰከንድ ውስጥ ቢበዛ አንድ ጊዜ ያወጣል። ማስጠንቀቂያው
ነጂውን፣ የክወናውን ክፍል (`prepare`፣ `get`፣ `all`፣ `run`፣ `exec`፣ `pragma`፣ ግብይት
ወይም ጥገና) እና ያለፉትን ሚሊሰከንዶች ብቻ ይይዛል፦ SQL፣ bindings፣ ረድፎች፣
ዱካዎች ወይም የልዩ ሁኔታ ጽሑፍ አይኖሩበትም።

ይህ የምርመራ መርጃ እንጂ የጊዜ ገደብ ወይም የጥያቄ ማመቻቸት አይደለም። ፈጽሞ
የማይመለስን ክወና ሪፖርት ማድረግ፣ የCPU ሥራን ከዲስክ መጠበቅ መለየት፣
ትክክለኛውን SQL መለየት ወይም በጥሬው የነጂ መያዣ በኩል የሚከናወኑ ክወናዎችን
መከታተል አይችልም። የasync ምትኬ ቆይታ ሆን ተብሎ አልተካተተም፤ ሌሎች የSQLite
ነጂዎች በዚህ በምርጫ በሚነቃ ባህሪ አይመዘገቡም። ተለዋዋጩን ማሰናከል
የጊዜ መለኪያ መጠቅለያዎች የሌሉትን የመጀመሪያውን አስማሚ ይመልሳል።
ምንም የውሂብ ጎታ ንድፍ ወይም የተከማቸ ውቅር አይቀየርም።

የ`/healthz` መዘግየት ማስጠንቀቂያ የሚያሳየው ከቀድሞው ናሙና ጀምሮ ያለውን
ከፍተኛውን የክስተት-ሉፕ መዘግየት እንጂ የሙሉ የሥራ ዘመን አማካይን አይደለም።
መዘግየትን በSQLite ወይም በዲስክ ብልሽት ላይ ከማሳበብዎ በፊት የጊዜ ማኅተሞቹን
ከዘገዩ ክወናዎች ማስጠንቀቂያዎች እና ከአስተናጋጅ/ማከማቻ መለኪያዎች ጋር ያዛምዱ።

## ማጣቀሻ

አተገባበር፦

- `bin/cli/runtime/magicBytes.mjs` — የባይነሪ ማጂክ-ባይት ማረጋገጫ ረዳቶች
- `bin/cli/runtime/sqliteRuntime.mjs` — ባለ 5-ደረጃ የአሂድ ጊዜ ወሳኝ + እንደ አስፈላጊነቱ ጫኚ
- `bin/cli/runtime/index.mjs` — የጅምር አስተባባሪ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — ከnpm ጭነት በኋላ የሚሠራ መንጠቆ (ስህተት ቢኖር አያስቆምም ቅድመ-ማሞቂያ)
- `src/lib/db/core.ts` — የ`ensureDbInitialized()` / `getDriverInfo()` ወደ ውጭ ማቅረቦች

## ነጠላ-ጸሐፊ ቶፖሎጂ (HA አይደገፍም)

ከላይ ያለው የነጂ ተተኪ ሰንሰለት አሁንም በ**አንድ ሂደት** ውስጥ ይሠራል። ነባሪው
የSQLite OmniRoute **ነጠላ ጸሐፊ** ነው፦

- ሁለት የOmniRoute ቅጂዎችን ከአንድ `storage.sqlite` ፋይል ጋር አያያይዙ።
- የኮንቴይነር ዳግም መጀመር፣ Recreate ማሰማራት፣ OOM kill ወይም HEALTHCHECK ዳግም መጀመር
  በሂደት ላይ ያለን እያንዳንዱን የSSE ክፍለ-ጊዜ ያቋርጣል። በመደበኛው መንገድ ላይ የክፍለ-ጊዜ ማሟጠጥ የለም።
- የዘገየ `/healthz`ን እንደ ሞተ የሚቆጥር የአስተባባሪ ሕያውነት ፍተሻ ብቸኛውን
  ቅጂ ያቋርጣል። TCP ሕያውነት + HTTP `/healthz` ዝግጁነትን ይምረጡ።
  [Docker መመሪያ — ተገኝነት](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  እና [የKubernetes መርማሪ ምክሮች](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)ን ይመልከቱ።
