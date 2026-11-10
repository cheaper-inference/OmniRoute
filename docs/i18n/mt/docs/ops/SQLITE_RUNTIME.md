# SQLite Runtime Resolution (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute jiddetermina d-driver SQLite tiegħu waqt l-istartjar permezz ta’ katina ta’ riżerva f’5 passi:

1. **`better-sqlite3` inkluż** (permezz ta’ `dependencies` f’`package.json`)
   — l-aktar veloċi, binarju nattiv, installat minn `npm install` meta jkunu preżenti l-għodod tal-build.

2. **`better-sqlite3` installat waqt it-tħaddim** (f’`~/.omniroute/runtime/`)
   — installat biss meta jkun meħtieġ fl-ewwel tħaddim **JEW** minn `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Jivvalida l-magic bytes nattivi ta’ `.node` (ELF / Mach-O / PE) qabel it-tagħbija
   sabiex jipproteġi kontra binarji korrotti jew għal pjattaforma żbaljata.

3. **`node:sqlite`** (librerija standard ta’ Node ≥22.5) — ma jeħtieġ ebda build nattiv; jintuża meta
   jfallu ż-żewġ mogħdijiet ta’ better-sqlite3. Sett limitat ta’ funzjonalitajiet.

4. **`sql.js`** (WASM) — l-aħħar għażla ta’ riżerva. Jaħdem kullimkien iżda huwa aktar bil-mod
   u jikteb id-data f’intervalli minflok b’mod sinkroniku.

## Għaliex din il-kumplessità?

- **Windows EBUSY**: `npm install -g omniroute@latest` jista’ jfalli jekk
  `better_sqlite3.node` tal-verżjoni preċedenti jkun imsakkar minn proċess li jkun qed jaħdem. L-installazzjoni
  waqt it-tħaddim f’`~/.omniroute/runtime/` tevita l-cache globali ta’ npm.
- **Ebda għodda tal-build**: Xi ambjenti (Windows korporattiv mingħajr VS Build
  Tools, immaġnijiet Docker minimi) ma jistgħux jikkompilaw `better-sqlite3`. L-installatur
  waqt it-tħaddim isib binarju mibni minn qabel mir-reġistru ta’ npm; id-drivers
  ta’ riżerva jiżguraw li OmniRoute xorta jistartja anki jekk dan ifalli.
- **Sistemi iżolati min-network**: Jekk ir-reġistru ta’ npm ma jkunx aċċessibbli, `node:sqlite`
  jew `sql.js` jiggarantixxu funzjonalità bażika.

## Validazzjoni tal-magic bytes

Qabel it-tagħbija ta’ fajl `.node` installat waqt it-tħaddim, OmniRoute jaqra l-ewwel 8
bytes u jqabbilhom mal-magic bytes magħrufa tal-pjattaformi:

| Pjattaforma            | Bytes (hex)   | Tikketta    |
| ---------------------- | ------------- | ----------- |
| Linux                  | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE        | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE        | `CF FA ED FE` | `macho-le`  |
| macOS fat (universali) | `CA FE BA BE` | `macho-fat` |
| Windows                | `4D 5A` (MZ)  | `pe`        |

Magic byte li ma jaqbilx → il-fajl jiġi injorat u l-proċess ta’ riżerva jkompli għall-pass li jmiss.

## Verifika tad-driver attiv

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Kontroll manwali

```bash
# Aqbeż it-tħejjija ta’ postinstall (għal installazzjonijiet CI veloċi)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Erġa’ installa bil-forza l-better-sqlite3 waqt it-tħaddim
rm -rf ~/.omniroute/runtime
omniroute  # jerġa’ jiġi installat fl-istartjar li jmiss

# Iċċekkja liema driver huwa attiv
omniroute config db-info  # (jekk jeżisti l-kmand CLI)
```

## Dijanjosi ta’ waqfiet sinkroniċi

B’`better-sqlite3`, issettja `OMNIROUTE_SQLITE_SLOW_MS=200` qabel l-istartjar sabiex
tattiva l-kejl tal-ħin sinkroniku tal-adapter. B’mod predefinit dan ikun diżattivat. Operazzjoni
kompluta li tieħu mill-inqas dak l-ammont ta’ millisekondi toħroġ twissija `[SQLITE-SLOW]`,
mhux aktar minn darba kull għaxar sekondi għal kull adapter. It-twissija jkun fiha biss
id-driver, il-klassi tal-operazzjoni (`prepare`, `get`, `all`, `run`, `exec`, `pragma`,
tranżazzjoni jew manutenzjoni), u l-millisekondi li jkunu għaddew: ebda SQL, bindings,
ringieli, mogħdijiet jew test tal-eċċezzjoni.

Din hija għajnuna dijanjostika, mhux timeout jew ottimizzazzjoni tal-query. Ma tistax tirrapporta
operazzjoni li qatt ma tirritorna, tiddistingwi xogħol tas-CPU minn stennija għad-diska,
tidentifika l-SQL eżatt, jew tosserva operazzjonijiet imwettqa permezz tal-handle mhux ipproċessat
tad-driver. It-tul ta’ backup asinkroniku huwa eskluż apposta; drivers SQLite oħrajn mhumiex
strumentati minn din l-għażla fakultattiva. Id-diżattivazzjoni tal-varjabbli tirrestawra l-adapter
oriġinali mingħajr wrappers għall-kejl tal-ħin. Ma jsir ebda tibdil fl-iskema tad-database jew
fil-konfigurazzjoni maħżuna.

It-twissija dwar id-dewmien ta’ `/healthz` tirrapporta l-ogħla valur tal-event loop mill-kampjun
preċedenti, mhux il-medja tul il-ħajja kollha. Qabbel it-timestamps tagħha mat-twissijiet dwar
operazzjonijiet bil-mod u mal-metriċi tal-host/tal-ħażna qabel tattribwixxi waqfa lil SQLite jew
lil ħsara fid-diska.

## Referenza

Implimentazzjoni:

- `bin/cli/runtime/magicBytes.mjs` — utilitajiet għall-validazzjoni tal-magic bytes tal-binarji
- `bin/cli/runtime/sqliteRuntime.mjs` — resolver f’5 passi waqt it-tħaddim + installatur lazy
- `bin/cli/runtime/index.mjs` — orkestratur tal-istartjar (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook ta’ npm wara l-installazzjoni (tħejjija mhux fatali)
- `src/lib/db/core.ts` — exports ta’ `ensureDbInitialized()` / `getDriverInfo()`

## Topoloġija b’kittieb wieħed (HA mhux appoġġjat)

Il-katina ta’ drivers ta’ riżerva hawn fuq xorta taħdem fi **proċess wieħed**. Bil-konfigurazzjoni
SQLite predefinita, OmniRoute għandu **kittieb wieħed**:

- Tqabbadx żewġ repliki ta’ OmniRoute mal-istess fajl `storage.sqlite`.
- Ristartjar ta’ container, deploy Recreate, OOM kill, jew ristartjar minn HEALTHCHECK iwaqqaf
  kull sessjoni SSE li tkun għaddejja. Fil-mogħdija standard ma jsir ebda tbattil tas-sessjonijiet.
- Kontroll tal-liveness tal-orkestratur li jqis `/healthz` bil-mod bħala mejjet joqtol l-unika
  replika. Ippreferi TCP liveness + readiness ta’ HTTP `/healthz`. Ara
  [Gwida ta’ Docker — disponibbiltà](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  u [Rakkomandazzjonijiet għall-probes ta’ Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
