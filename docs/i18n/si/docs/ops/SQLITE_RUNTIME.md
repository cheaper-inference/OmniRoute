# SQLite Runtime Resolution (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ආරම්භයේදී පියවර 5ක විකල්ප දාමයක් හරහා එහි SQLite ධාවකය නිරාකරණය කරයි:

1. **ඇතුළත් කළ `better-sqlite3`** (`package.json` හි `dependencies` හරහා)
   — වේගවත්ම විකල්පයයි, ස්වදේශීය ද්විමය ගොනුවක් භාවිත කරයි, ගොඩනැගීමේ මෙවලම් පවතින විට `npm install` මඟින් ස්ථාපනය කෙරේ.

2. **ධාවන වේලාවේ ස්ථාපනය කළ `better-sqlite3`** (`~/.omniroute/runtime/` තුළ)
   — පළමු ධාවනයේදී කල් දැමූ ආකාරයෙන් **හෝ** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` මඟින් ස්ථාපනය කෙරේ.
   දූෂිත හෝ වැරදි වේදිකාවකට අදාළ ද්විමය ගොනු පූරණය වීම වැළැක්වීම සඳහා, පූරණයට පෙර ස්වදේශීය `.node` magic bytes (ELF / Mach-O / PE) වලංගු කරයි.

3. **`node:sqlite`** (Node ≥22.5 සම්මත පුස්තකාලය) — ස්වදේශීය ගොඩනැගීමක් අවශ්ය නොවේ; better-sqlite3 මාර්ග දෙකම අසාර්ථක වූ විට භාවිත කෙරේ. සීමිත විශේෂාංග සමූහයක් ඇත.

4. **`sql.js`** (WASM) — අවසාන විකල්පයයි. සෑම තැනකම ක්රියා කරන නමුත් මන්දගාමී වන අතර, සමමුහුර්තව වෙනුවට කාල අන්තරයකට අනුව දත්ත ලියයි.

## මෙතරම් සංකීර්ණ වන්නේ ඇයි?

- **Windows EBUSY**: පෙර අනුවාදයේ `better_sqlite3.node` ධාවනය වන ක්රියාවලියක් මඟින් අගුළු දමා තිබේ නම් `npm install -g omniroute@latest` අසාර්ථක විය හැක.
  `~/.omniroute/runtime/` තුළ ධාවන වේලා ස්ථාපනය ගෝලීය npm හැඹිලිය මඟහරියි.
- **ගොඩනැගීමේ මෙවලම් නොමැති වීම**: සමහර පරිසරවලට (VS Build Tools නොමැති ආයතනික Windows පරිසර, අවම Docker images) `better-sqlite3` සම්පාදනය කළ නොහැක. ධාවන වේලා
  ස්ථාපකය npm registry වෙතින් පෙර-ගොඩනැගූ ද්විමය ගොනුවක් නිරාකරණය කරයි; එය අසාර්ථක වුවද OmniRoute ආරම්භ වීම විකල්ප
  ධාවක මඟින් සහතික කරයි.
- **ජාලයෙන් වෙන් කළ පද්ධති**: npm registry වෙත ළඟා විය නොහැකි නම්, `node:sqlite`
  හෝ `sql.js` මූලික ක්රියාකාරීත්වය සහතික කරයි.

## Magic-byte වලංගුකරණය

ධාවන වේලාවේ ස්ථාපනය කළ `.node` ගොනුවක් පූරණය කිරීමට පෙර, OmniRoute පළමු
bytes 8 කියවා දන්නා වේදිකා magic අගයන් සමඟ සසඳයි:

| වේදිකාව               | Bytes (hex)   | ලේබලය       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

නොගැළපෙන magic අගයක් → ගොනුව නොසලකා හරින අතර, විකල්ප ක්රියාවලිය ඊළඟ පියවරට යයි.

## සක්රිය ධාවකය පරීක්ෂා කිරීම

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## අතින් පාලනය කිරීම

```bash
# වේගවත් CI ස්ථාපන සඳහා postinstall පෙර-සූදානම මඟහරින්න
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# ධාවන වේලා better-sqlite3 බලෙන් නැවත ස්ථාපනය කරන්න
rm -rf ~/.omniroute/runtime
omniroute  # ඊළඟ ආරම්භයේදී නැවත ස්ථාපනය කෙරේ

# සක්රියව ඇති ධාවකය පරීක්ෂා කරන්න
omniroute config db-info  # (CLI විධානය පවතී නම්)
```

## සමමුහුර්ත ඇනහිටීම් හඳුනාගැනීම

`better-sqlite3` සමඟ, සමමුහුර්ත adapter කාල මැනීම සක්රිය කිරීමට ආරම්භයට පෙර `OMNIROUTE_SQLITE_SLOW_MS=200` සකසන්න.
පෙරනිමියෙන් එය අක්රියයි. අවම වශයෙන් එම මිලි තත්පර ගණනක් ගන්නා සම්පූර්ණ වූ මෙහෙයුමක්, එක් එක්
adapter එකකට තත්පර දහයකට උපරිම වශයෙන් එක් වරක් `[SQLITE-SLOW]` අනතුරු ඇඟවීමක් නිකුත් කරයි.
අනතුරු ඇඟවීමේ අඩංගු වන්නේ ධාවකය, මෙහෙයුම් පන්තිය
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaction හෝ maintenance), සහ
ගත වූ මිලි තත්පර පමණි: SQL, bindings, rows, paths හෝ exception පෙළ කිසිවක් එහි අඩංගු නොවේ.

මෙය රෝග විනිශ්චය සඳහා සහායකයක් මිස timeout එකක් හෝ query ප්රශස්තකරණයක් නොවේ. කිසිදා ආපසු නොඑන
මෙහෙයුමක් වාර්තා කිරීමට, CPU කාර්යය disk බලාසිටීම්වලින් වෙන්කර හඳුනාගැනීමට, නිශ්චිත
SQL හඳුනාගැනීමට, හෝ raw driver handle හරහා සිදු කරන මෙහෙයුම් නිරීක්ෂණය කිරීමට එයට නොහැක.
Async backup කාලසීමාව හිතාමතාම බැහැර කර ඇත; වෙනත් SQLite ධාවක මෙම opt-in ක්රමය මඟින්
instrument කර නොමැත. variable එක අක්රිය කිරීමෙන් timing wrappers රහිත මුල් adapter එක
ප්රතිස්ථාපනය වේ. database schema හෝ ගබඩා කළ configuration කිසිවක් වෙනස් නොවේ.

`/healthz` lag අනතුරු ඇඟවීම වාර්තා කරන්නේ සමස්ත ආයුකාල සාමාන්යය නොව, පෙර sample එකේ සිට ඇති
event-loop උපරිමයයි. ඇනහිටීමක් SQLite හෝ disk අසමත් වීමකට ආරෝපණය කිරීමට පෙර එහි timestamps,
මන්දගාමී මෙහෙයුම් අනතුරු ඇඟවීම් සහ host/storage metrics සමඟ සසඳන්න.

## යොමුව

ක්රියාත්මක කිරීම:

- `bin/cli/runtime/magicBytes.mjs` — ද්විමය magic-byte වලංගුකරණ සහායක
- `bin/cli/runtime/sqliteRuntime.mjs` — පියවර 5ක ධාවන වේලා resolver + කල් දැමූ ස්ථාපකය
- `bin/cli/runtime/index.mjs` — ආරම්භක සම්බන්ධීකාරකය (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm පසු-ස්ථාපන hook එක (අසාර්ථක වුවද මාරාන්තික නොවන පෙර-සූදානම)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` exports

## තනි-writer ස්ථලකය (HA සහාය නොදක්වයි)

ඉහත ධාවක විකල්ප දාමය තවමත් **එක් process එකක්** තුළ ක්රියා කරයි. පෙරනිමි SQLite
භාවිතයේදී OmniRoute යනු **තනි writer** එකකි:

- OmniRoute replicas දෙකක් එකම `storage.sqlite` ගොනුවට සම්බන්ධ නොකරන්න.
- container නැවත ආරම්භයක්, Recreate deploy එකක්, OOM kill එකක්, හෝ HEALTHCHECK නැවත ආරම්භයක් මඟින්
  ක්රියාත්මක වෙමින් පවතින සියලු SSE sessions අත්හැරේ. සාමාන්ය මාර්ගයේ session drain කිරීමක් නොමැත.
- මන්දගාමී `/healthz` එකක් අක්රිය ලෙස සලකන orchestrator liveness එකක් පවතින එකම
  replica එක විනාශ කරනු ඇත. TCP liveness + HTTP `/healthz` readiness වඩාත් සුදුසුය. බලන්න:
  [Docker මාර්ගෝපදේශය — ලබාගත හැකි බව](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  සහ [Kubernetes probe නිර්දේශ](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
