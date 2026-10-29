# SQLite Runtime Resolution (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute កំណត់កម្មវិធីបញ្ជា SQLite របស់វានៅពេលចាប់ផ្ដើម តាមរយៈខ្សែសង្វាក់បម្រុង 5 ជំហាន៖

1. **`better-sqlite3` ដែលបានភ្ជាប់មកជាមួយ** (តាមរយៈ `dependencies` ក្នុង `package.json`)
   — លឿនបំផុត ជា binary ដើម និងត្រូវបានដំឡើងដោយ `npm install` នៅពេលមានឧបករណ៍ build។

2. **`better-sqlite3` ដែលបានដំឡើងពេលដំណើរការ** (ក្នុង `~/.omniroute/runtime/`)
   — ត្រូវបានដំឡើងតាមតម្រូវការនៅពេលដំណើរការលើកដំបូង **ឬ** ដោយ `scripts/build/postinstall.mjs → scripts/postinstall.mjs`។
   វាផ្ទៀងផ្ទាត់ magic bytes របស់ `.node` ដើម (ELF / Mach-O / PE) មុនពេលផ្ទុក
   ដើម្បីការពារពី binary ដែលខូច ឬសម្រាប់ platform មិនត្រឹមត្រូវ។

3. **`node:sqlite`** (stdlib របស់ Node ≥22.5) — មិនត្រូវការ native build ទេ; ប្រើនៅពេល
   ទីតាំង better-sqlite3 ទាំងពីរបរាជ័យ។ មានសំណុំមុខងារកម្រិតកំណត់។

4. **`sql.js`** (WASM) — ជម្រើសបម្រុងចុងក្រោយ។ ដំណើរការបានគ្រប់ទីកន្លែង ប៉ុន្តែយឺតជាង
   ហើយសរសេរទិន្នន័យតាមចន្លោះពេល ជំនួសឱ្យការសរសេរភ្លាមៗបែបសមកាលកម្ម។

## ហេតុអ្វីបានជាមានភាពស្មុគស្មាញនេះ?

- **Windows EBUSY**៖ `npm install -g omniroute@latest` អាចបរាជ័យ ប្រសិនបើ
  `better_sqlite3.node` របស់កំណែមុន ត្រូវបានចាក់សោដោយ process ដែលកំពុងដំណើរការ។ ការដំឡើង
  ពេលដំណើរការក្នុង `~/.omniroute/runtime/` ជៀសវាង npm cache សកល។
- **គ្មានឧបករណ៍ build**៖ បរិស្ថានមួយចំនួន (Windows របស់ស្ថាប័នដែលគ្មាន VS Build
  Tools, Docker images កម្រិតអប្បបរមា) មិនអាច compile `better-sqlite3` បានទេ។ កម្មវិធីដំឡើង
  ពេលដំណើរការ ទាញយក binary ដែលបាន build ជាមុនពី npm registry; កម្មវិធីបញ្ជាបម្រុង
  ធានាថា OmniRoute នៅតែអាចចាប់ផ្ដើមបាន ទោះបីវាបរាជ័យក៏ដោយ។
- **ប្រព័ន្ធដែលផ្ដាច់ពីបណ្ដាញ**៖ ប្រសិនបើមិនអាចចូលដំណើរការ npm registry បាន `node:sqlite`
  ឬ `sql.js` ធានានូវមុខងារមូលដ្ឋាន។

## ការផ្ទៀងផ្ទាត់ magic-byte

មុនពេលផ្ទុកឯកសារ `.node` ដែលបានដំឡើងពេលដំណើរការ OmniRoute អាន 8 bytes ដំបូង
ហើយផ្គូផ្គងជាមួយ magic ដែលស្គាល់សម្រាប់ platform នីមួយៗ៖

| Platform              | Bytes (hex)   | ស្លាក       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

magic ដែលមិនត្រូវគ្នា → ឯកសារត្រូវបានមិនអើពើ ហើយដំណើរការបម្រុងបន្តទៅជំហានបន្ទាប់។

## ការពិនិត្យកម្មវិធីបញ្ជាដែលសកម្ម

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ការគ្រប់គ្រងដោយដៃ

```bash
# រំលងការកម្ដៅទុកជាមុនក្រោយការដំឡើង (សម្រាប់ការដំឡើង CI រហ័ស)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# បង្ខំឱ្យដំឡើង better-sqlite3 ពេលដំណើរការឡើងវិញ
rm -rf ~/.omniroute/runtime
omniroute  # នឹងដំឡើងឡើងវិញនៅពេលចាប់ផ្ដើមលើកបន្ទាប់

# ពិនិត្យមើលថាកម្មវិធីបញ្ជាណាមួយកំពុងសកម្ម
omniroute config db-info  # (ប្រសិនបើមានពាក្យបញ្ជា CLI)
```

## ការធ្វើរោគវិនិច្ឆ័យការជាប់គាំងបែបសមកាលកម្ម

ជាមួយ `better-sqlite3` សូមកំណត់ `OMNIROUTE_SQLITE_SLOW_MS=200` មុនពេលចាប់ផ្ដើម ដើម្បីជ្រើសចូល
ការវាស់ពេលវេលា adapter បែបសមកាលកម្ម។ តាមលំនាំដើម វាត្រូវបានបិទ។ ប្រតិបត្តិការដែលបានបញ្ចប់ និងចំណាយពេល
យ៉ាងហោចណាស់ចំនួនមិល្លីវិនាទីនោះ នឹងបញ្ចេញការព្រមាន `[SQLITE-SLOW]` ច្រើនបំផុតម្ដងក្នុងមួយ
ដប់វិនាទីសម្រាប់ adapter នីមួយៗ។ ការព្រមានមានតែកម្មវិធីបញ្ជា ថ្នាក់ប្រតិបត្តិការ
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaction ឬ maintenance) និង
ចំនួនមិល្លីវិនាទីដែលបានកន្លងផុត៖ គ្មាន SQL, bindings, rows, paths ឬអត្ថបទ exception ទេ។

នេះគឺជាជំនួយសម្រាប់ការធ្វើរោគវិនិច្ឆ័យ មិនមែនជា timeout ឬការបង្កើនប្រសិទ្ធភាព query ទេ។ វាមិនអាចរាយការណ៍
អំពីប្រតិបត្តិការដែលមិនត្រឡប់មកវិញ មិនអាចបែងចែកការងារ CPU ពីការរង់ចាំ disk មិនអាចកំណត់អត្តសញ្ញាណ
SQL ជាក់លាក់ ឬសង្កេតប្រតិបត្តិការដែលបានធ្វើតាមរយៈ handle របស់កម្មវិធីបញ្ជាដើមបានទេ។
រយៈពេល backup បែបអសមកាលកម្មត្រូវបានដកចេញដោយចេតនា; កម្មវិធីបញ្ជា SQLite ផ្សេងទៀតមិនត្រូវបាន
បំពាក់ឧបករណ៍វាស់ដោយការជ្រើសចូលនេះទេ។ ការបិទ variable នឹងស្ដារ adapter ដើម
ដោយគ្មាន timing wrappers។ មិនមានការផ្លាស់ប្ដូរ database schema ឬការកំណត់រចនាសម្ព័ន្ធដែលបានរក្សាទុកទេ។

ការព្រមានអំពី lag របស់ `/healthz` រាយការណ៍កម្រិតកំពូលរបស់ event-loop ចាប់តាំងពី sample មុន
មិនមែនមធ្យមភាគពេញមួយអាយុកាលទេ។ សូមផ្គូផ្គង timestamps របស់វាជាមួយការព្រមានប្រតិបត្តិការយឺត
និង metrics របស់ host/storage មុនពេលសន្និដ្ឋានថាការជាប់គាំងបណ្ដាលមកពី SQLite ឬ disk បរាជ័យ។

## ឯកសារយោង

ការអនុវត្ត៖

- `bin/cli/runtime/magicBytes.mjs` — helpers សម្រាប់ផ្ទៀងផ្ទាត់ magic-byte របស់ binary
- `bin/cli/runtime/sqliteRuntime.mjs` — កម្មវិធីដោះស្រាយ runtime 5 ជំហាន + កម្មវិធីដំឡើងតាមតម្រូវការ
- `bin/cli/runtime/index.mjs` — កម្មវិធីសម្របសម្រួលការចាប់ផ្ដើម (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook ក្រោយការដំឡើងរបស់ npm (ការកម្ដៅទុកជាមុនដែលមិនបង្កឱ្យបរាជ័យ)
- `src/lib/db/core.ts` — ការនាំចេញ `ensureDbInitialized()` / `getDriverInfo()`

## សណ្ឋាន writer តែមួយ (មិនគាំទ្រ HA)

ខ្សែសង្វាក់កម្មវិធីបញ្ជាបម្រុងខាងលើនៅតែដំណើរការក្នុង **process តែមួយ**។ តាមលំនាំដើម SQLite
របស់ OmniRoute គឺជា **writer តែមួយ**៖

- កុំភ្ជាប់ replica របស់ OmniRoute ពីរទៅឯកសារ `storage.sqlite` តែមួយ។
- ការចាប់ផ្ដើម container ឡើងវិញ, Recreate deploy, OOM kill ឬការចាប់ផ្ដើមឡើងវិញដោយ HEALTHCHECK នឹងផ្ដាច់
  រាល់ SSE session ដែលកំពុងដំណើរការ។ មិនមានការបង្ហូរ session នៅលើផ្លូវស្តង់ដារទេ។
- liveness របស់ orchestrator ដែលចាត់ទុក `/healthz` យឺតថាបានស្លាប់ នឹងបញ្ឈប់
  replica តែមួយគត់។ គួរប្រើ TCP liveness + HTTP `/healthz` readiness។ សូមមើល
  [មគ្គុទ្ទេសក៍ Docker — ភាពអាចប្រើបាន](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  និង [អនុសាសន៍ Kubernetes probe](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)។
