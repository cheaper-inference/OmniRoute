# SQLite Runtime Resolution (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ആരംഭിക്കുമ്പോൾ 5-ഘട്ട ഫാൾബാക്ക് ശൃംഖലയിലൂടെ അതിന്റെ SQLite ഡ്രൈവർ കണ്ടെത്തുന്നു:

1. **ബണ്ടിൽ ചെയ്ത `better-sqlite3`** (`package.json`-ലെ `dependencies` വഴി)
   — ഏറ്റവും വേഗതയുള്ളത്, നേറ്റീവ് ബൈനറി, ബിൽഡ് ടൂളുകൾ ലഭ്യമാകുമ്പോൾ `npm install` ഇൻസ്റ്റാൾ ചെയ്യുന്നു.

2. **റൺടൈമിൽ ഇൻസ്റ്റാൾ ചെയ്ത `better-sqlite3`** (`~/.omniroute/runtime/`-ൽ)
   — ആദ്യമായി പ്രവർത്തിപ്പിക്കുമ്പോൾ ആവശ്യാനുസരണം **അല്ലെങ്കിൽ** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` വഴി ഇൻസ്റ്റാൾ ചെയ്യുന്നു.
   കേടായതോ തെറ്റായ പ്ലാറ്റ്ഫോമിനുള്ളതോ ആയ ബൈനറികൾ ലോഡ് ചെയ്യുന്നത് തടയാൻ,
   ലോഡ് ചെയ്യുന്നതിന് മുമ്പ് നേറ്റീവ് `.node` മാജിക് ബൈറ്റുകൾ (ELF / Mach-O / PE) സാധൂകരിക്കുന്നു.

3. **`node:sqlite`** (Node ≥22.5 സ്റ്റാൻഡേർഡ് ലൈബ്രറി) — നേറ്റീവ് ബിൽഡ് ആവശ്യമില്ല; രണ്ട്
   better-sqlite3 പാതകളും പരാജയപ്പെടുമ്പോൾ ഉപയോഗിക്കുന്നു. പരിമിതമായ സവിശേഷതകൾ മാത്രം.

4. **`sql.js`** (WASM) — അന്തിമ ഫാൾബാക്ക്. എല്ലായിടത്തും പ്രവർത്തിക്കുമെങ്കിലും വേഗത കുറവാണ്,
   കൂടാതെ ഡാറ്റ സമകാലികമായി എഴുതുന്നതിനുപകരം നിശ്ചിത ഇടവേളകളിൽ എഴുതുന്നു.

## ഇത്രയും സങ്കീർണ്ണത എന്തുകൊണ്ട്?

- **Windows EBUSY**: മുമ്പത്തെ പതിപ്പിന്റെ `better_sqlite3.node`, പ്രവർത്തിച്ചുകൊണ്ടിരിക്കുന്ന ഒരു
  പ്രോസസ് ലോക്ക് ചെയ്തിട്ടുണ്ടെങ്കിൽ `npm install -g omniroute@latest` പരാജയപ്പെടാം. `~/.omniroute/runtime/`-ലെ
  റൺടൈം ഇൻസ്റ്റാളേഷൻ ആഗോള npm കാഷിനെ ഒഴിവാക്കുന്നു.
- **ബിൽഡ് ടൂളുകൾ ഇല്ലാത്തത്**: ചില പരിതസ്ഥിതികൾക്ക് (VS Build Tools ഇല്ലാത്ത കോർപ്പറേറ്റ് Windows,
  മിനിമൽ Docker ഇമേജുകൾ) `better-sqlite3` കംപൈൽ ചെയ്യാൻ കഴിയില്ല. റൺടൈം ഇൻസ്റ്റാളർ
  npm രജിസ്ട്രിയിൽനിന്ന് മുൻകൂട്ടി ബിൽഡ് ചെയ്ത ബൈനറി കണ്ടെത്തുന്നു; അതും പരാജയപ്പെട്ടാലും
  OmniRoute ആരംഭിക്കുമെന്ന് ഫാൾബാക്ക് ഡ്രൈവറുകൾ ഉറപ്പാക്കുന്നു.
- **എയർ-ഗ്യാപ്ഡ് സിസ്റ്റങ്ങൾ**: npm രജിസ്ട്രി ലഭ്യമല്ലെങ്കിൽ, `node:sqlite`
  അല്ലെങ്കിൽ `sql.js` അടിസ്ഥാന പ്രവർത്തനക്ഷമത ഉറപ്പാക്കുന്നു.

## മാജിക്-ബൈറ്റ് സാധൂകരണം

റൺടൈമിൽ ഇൻസ്റ്റാൾ ചെയ്ത `.node` ഫയൽ ലോഡ് ചെയ്യുന്നതിന് മുമ്പ്, OmniRoute ആദ്യത്തെ 8
ബൈറ്റുകൾ വായിച്ച് അറിയപ്പെടുന്ന പ്ലാറ്റ്ഫോം മാജിക്കുകളുമായി പൊരുത്തപ്പെടുത്തുന്നു:

| പ്ലാറ്റ്ഫോം           | ബൈറ്റുകൾ (hex) | ലേബൽ        |
| --------------------- | -------------- | ----------- |
| Linux                 | `7F 45 4C 46`  | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF`  | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE`  | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE`  | `macho-fat` |
| Windows               | `4D 5A` (MZ)   | `pe`        |

മാജിക് പൊരുത്തപ്പെടുന്നില്ലെങ്കിൽ → ഫയൽ അവഗണിക്കുകയും ഫാൾബാക്ക് അടുത്ത ഘട്ടത്തിലേക്ക് തുടരുകയും ചെയ്യുന്നു.

## സജീവ ഡ്രൈവർ പരിശോധിക്കൽ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## മാനുവൽ നിയന്ത്രണം

```bash
# വേഗമേറിയ CI ഇൻസ്റ്റാളുകൾക്കായി postinstall വാം-അപ്പ് ഒഴിവാക്കുക
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# റൺടൈം better-sqlite3 നിർബന്ധമായി വീണ്ടും ഇൻസ്റ്റാൾ ചെയ്യുക
rm -rf ~/.omniroute/runtime
omniroute  # അടുത്ത തവണ ആരംഭിക്കുമ്പോൾ വീണ്ടും ഇൻസ്റ്റാൾ ചെയ്യും

# ഏത് ഡ്രൈവറാണ് സജീവമെന്ന് പരിശോധിക്കുക
omniroute config db-info  # (CLI കമാൻഡ് നിലവിലുണ്ടെങ്കിൽ)
```

## സമകാലിക സ്റ്റാളുകൾ കണ്ടെത്തൽ

`better-sqlite3` ഉപയോഗിക്കുമ്പോൾ, സമകാലിക അഡാപ്റ്റർ ടൈമിംഗ് പ്രവർത്തനക്ഷമമാക്കാൻ ആരംഭിക്കുന്നതിന്
മുമ്പ് `OMNIROUTE_SQLITE_SLOW_MS=200` സജ്ജമാക്കുക. സ്ഥിരസ്ഥിതിയിൽ ഇത് ഓഫാണ്. കുറഞ്ഞത് അത്രയും
മില്ലിസെക്കൻഡ് എടുത്ത് പൂർത്തിയായ ഒരു പ്രവർത്തനം, ഓരോ അഡാപ്റ്ററിനും പത്ത് സെക്കൻഡിൽ പരമാവധി ഒരിക്കൽ,
ഒരു `[SQLITE-SLOW]` മുന്നറിയിപ്പ് സൃഷ്ടിക്കുന്നു. മുന്നറിയിപ്പിൽ ഡ്രൈവർ, പ്രവർത്തന ക്ലാസ്
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, ട്രാൻസാക്ഷൻ അല്ലെങ്കിൽ പരിപാലനം), കഴിഞ്ഞുപോയ
മില്ലിസെക്കൻഡുകൾ എന്നിവ മാത്രമേ ഉൾപ്പെടൂ: SQL, ബൈൻഡിങ്ങുകൾ, വരികൾ, പാതകൾ, അല്ലെങ്കിൽ എക്സെപ്ഷൻ ടെക്സ്റ്റ് ഉണ്ടാകില്ല.

ഇത് ഒരു ഡയഗ്നോസ്റ്റിക് സഹായിയാണ്; ടൈംഔട്ടോ ക്വറി ഒപ്റ്റിമൈസേഷനോ അല്ല. ഒരിക്കലും തിരികെ വരാത്ത
ഒരു പ്രവർത്തനം റിപ്പോർട്ട് ചെയ്യാനോ, CPU പ്രവർത്തനത്തെ ഡിസ്ക് കാത്തിരിപ്പിൽനിന്ന് വേർതിരിച്ചറിയാനോ,
കൃത്യമായ SQL തിരിച്ചറിയാനോ, റോ ഡ്രൈവർ ഹാൻഡിൽ വഴി നടത്തിയ പ്രവർത്തനങ്ങൾ നിരീക്ഷിക്കാനോ ഇതിന് കഴിയില്ല.
അസിങ്ക്രണസ് ബാക്കപ്പ് ദൈർഘ്യം മനഃപൂർവം ഒഴിവാക്കിയിരിക്കുന്നു; മറ്റ് SQLite ഡ്രൈവറുകളിൽ ഈ ഐച്ഛിക
ഇൻസ്ട്രുമെന്റേഷൻ ഇല്ല. വേരിയബിൾ പ്രവർത്തനരഹിതമാക്കുന്നത് ടൈമിംഗ് റാപ്പറുകൾ ഇല്ലാത്ത യഥാർഥ അഡാപ്റ്റർ
പുനഃസ്ഥാപിക്കുന്നു. ഡാറ്റാബേസ് സ്കീമയിലോ സംഭരിച്ച കോൺഫിഗറേഷനിലോ മാറ്റമൊന്നുമില്ല.

`/healthz` ലാഗ് മുന്നറിയിപ്പ്, ആജീവനാന്ത ശരാശരിയല്ല, മുൻ സാമ്പിളിന് ശേഷമുള്ള ഇവന്റ്-ലൂപ്പ് പീക്കാണ്
റിപ്പോർട്ട് ചെയ്യുന്നത്. ഒരു സ്റ്റാളിന് SQLite-നെയോ ഡിസ്ക് പരാജയത്തെയോ കാരണമായി കണക്കാക്കുന്നതിന് മുമ്പ്,
അതിന്റെ ടൈംസ്റ്റാമ്പുകൾ മന്ദഗതിയിലുള്ള പ്രവർത്തന മുന്നറിയിപ്പുകളുമായും ഹോസ്റ്റ്/സ്റ്റോറേജ് മെട്രിക്കുകളുമായും
പരസ്പരം ബന്ധപ്പെടുത്തി പരിശോധിക്കുക.

## റഫറൻസ്

ഇംപ്ലിമെന്റേഷൻ:

- `bin/cli/runtime/magicBytes.mjs` — ബൈനറി മാജിക്-ബൈറ്റ് സാധൂകരണ സഹായികൾ
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-ഘട്ട റൺടൈം റിസോൾവർ + ആവശ്യാനുസരണ ഇൻസ്റ്റാളർ
- `bin/cli/runtime/index.mjs` — സ്റ്റാർട്ടപ്പ് ഓർക്കസ്ട്രേറ്റർ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm പോസ്റ്റ്-ഇൻസ്റ്റാൾ ഹുക്ക് (പരാജയം നിർണായകമല്ലാത്ത വാം-അപ്പ്)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` എക്സ്പോർട്ടുകൾ

## ഒറ്റ-റൈറ്റർ ടോപ്പോളജി (HA പിന്തുണയ്ക്കുന്നില്ല)

മുകളിലെ ഡ്രൈവർ ഫാൾബാക്ക് ശൃംഖല ഇപ്പോഴും **ഒരൊറ്റ പ്രോസസിലാണ്** പ്രവർത്തിക്കുന്നത്. സ്ഥിരസ്ഥിതി SQLite
OmniRoute ഒരു **ഒറ്റ റൈറ്ററാണ്**:

- ഒരേ `storage.sqlite` ഫയലിലേക്ക് രണ്ട് OmniRoute റെപ്ലിക്കകൾ ബന്ധിപ്പിക്കരുത്.
- ഒരു കണ്ടെയ്നർ റീസ്റ്റാർട്ട്, Recreate ഡിപ്ലോയ്, OOM kill, അല്ലെങ്കിൽ HEALTHCHECK റീസ്റ്റാർട്ട്,
  പുരോഗമിച്ചുകൊണ്ടിരിക്കുന്ന എല്ലാ SSE സെഷനുകളും അവസാനിപ്പിക്കുന്നു. സ്റ്റോക്ക് പാതയിൽ സെഷൻ ഡ്രെയിൻ ഇല്ല.
- മന്ദഗതിയിലുള്ള `/healthz`-നെ പ്രവർത്തനരഹിതമായി കണക്കാക്കുന്ന ഓർക്കസ്ട്രേറ്റർ ലൈവ്നസ് ഏക
  റെപ്ലിക്കയെ അവസാനിപ്പിക്കും. TCP ലൈവ്നസ് + HTTP `/healthz` റെഡിനസ് തിരഞ്ഞെടുക്കുക. കാണുക:
  [Docker ഗൈഡ് — ലഭ്യത](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  കൂടാതെ [Kubernetes പ്രോബ് ശുപാർശകൾ](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
