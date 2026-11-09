# SQLite Runtime Resolution (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

Az OmniRoute indításkor egy ötlépéses tartalékmechanizmuson keresztül választja ki a SQLite-illesztőprogramját:

1. **Csomagolt `better-sqlite3`** (a `package.json` `dependencies` mezőjén keresztül)
   — a leggyorsabb, natív bináris; az `npm install` telepíti, ha rendelkezésre állnak a fordítóeszközök.

2. **Futásidőben telepített `better-sqlite3`** (a `~/.omniroute/runtime/` könyvtárban)
   — az első futtatáskor igény szerint, **VAGY** a `scripts/build/postinstall.mjs → scripts/postinstall.mjs` által telepítve.
   Betöltés előtt ellenőrzi a natív `.node` fájl mágikus bájtjait (ELF / Mach-O / PE),
   hogy védelmet nyújtson a sérült vagy nem megfelelő platformhoz tartozó binárisok ellen.

3. **`node:sqlite`** (Node ≥22.5 szabványos könyvtár) — nincs szükség natív fordításra; akkor használatos,
   ha mindkét better-sqlite3 útvonal sikertelen. Korlátozott funkciókészlettel rendelkezik.

4. **`sql.js`** (WASM) — végső tartalékmegoldás. Mindenhol működik, de lassabb,
   és az adatokat időközönként, nem pedig szinkron módon írja ki.

## Miért ilyen összetett?

- **Windows EBUSY**: Az `npm install -g omniroute@latest` sikertelen lehet, ha az előző
  verzió `better_sqlite3.node` fájlját egy futó folyamat zárolja. A futásidejű
  telepítés a `~/.omniroute/runtime/` könyvtárba megkerüli a globális npm-gyorsítótárat.
- **Nincsenek fordítóeszközök**: Egyes környezetek (például VS Build Tools nélküli vállalati
  Windows-rendszerek vagy minimális Docker-lemezképek) nem képesek lefordítani a `better-sqlite3`
  csomagot. A futásidejű telepítő egy előre lefordított binárist szerez be az npm-regisztrációs
  adatbázisból; a tartalék illesztőprogramok pedig gondoskodnak arról, hogy az OmniRoute akkor is
  elinduljon, ha ez sikertelen.
- **Hálózattól elszigetelt rendszerek**: Ha az npm-regisztrációs adatbázis nem érhető el,
  a `node:sqlite` vagy a `sql.js` garantálja az alapvető működést.

## Mágikusbájt-ellenőrzés

Egy futásidőben telepített `.node` fájl betöltése előtt az OmniRoute beolvassa az első 8
bájtot, és összeveti azokat az ismert platformspecifikus mágikus értékekkel:

| Platform                | Bájtok (hex)  | Címke       |
| ----------------------- | ------------- | ----------- |
| Linux                   | `7F 45 4C 46` | `elf`       |
| macOS 64 bites BE       | `FE ED FA CF` | `macho`     |
| macOS 64 bites LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (univerzális) | `CA FE BA BE` | `macho-fat` |
| Windows                 | `4D 5A` (MZ)  | `pe`        |

Ha a mágikus érték nem egyezik, a fájlt figyelmen kívül hagyja, és a tartalékmechanizmus a következő lépéssel folytatódik.

## Az aktív illesztőprogram ellenőrzése

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Kézi vezérlés

```bash
# A postinstall-előkészítés kihagyása (gyors CI-telepítésekhez)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# A futásidejű better-sqlite3 kényszerített újratelepítése
rm -rf ~/.omniroute/runtime
omniroute  # a következő indításkor újratelepíti

# Az aktív illesztőprogram ellenőrzése
omniroute config db-info  # (ha létezik ilyen CLI-parancs)
```

## Szinkron elakadások diagnosztizálása

A `better-sqlite3` használatakor indítás előtt állítsa az `OMNIROUTE_SQLITE_SLOW_MS=200`
értéket a szinkron adapterműveletek időmérésének bekapcsolásához. Alapértelmezés szerint ez
ki van kapcsolva. Ha egy befejezett művelet legalább ennyi ezredmásodpercet vesz igénybe,
egy `[SQLITE-SLOW]` figyelmeztetés keletkezik, adapterenként legfeljebb tíz másodpercenként
egyszer. A figyelmeztetés kizárólag az illesztőprogramot, a művelet osztályát
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, tranzakció vagy karbantartás), valamint
az eltelt ezredmásodperceket tartalmazza: SQL-t, kötéseket, sorokat, útvonalakat vagy
kivételszöveget nem.

Ez diagnosztikai segédeszköz, nem pedig időtúllépési vagy lekérdezés-optimalizálási
mechanizmus. Nem képes jelenteni azokat a műveleteket, amelyek soha nem térnek vissza,
megkülönböztetni a CPU-munkát a lemezvárakozástól, azonosítani a pontos SQL-t, illetve
megfigyelni a nyers illesztőprogram-kezelőn keresztül végrehajtott műveleteket.
Az aszinkron biztonsági mentések időtartama szándékosan nincs mérve; a többi
SQLite-illesztőprogramra ez az opcionális műszerezés nem terjed ki. A változó kikapcsolása
visszaállítja az eredeti adaptert időmérési burkolók nélkül. Az adatbázisséma és a tárolt
konfiguráció nem változik.

A `/healthz` késleltetési figyelmeztetése az eseményhurok előző mintavétel óta mért
csúcsértékét jelzi, nem pedig az élettartamra számított átlagot. Mielőtt egy elakadást
SQLite- vagy lemezhibának tulajdonítana, vesse össze annak időbélyegeit a lassú műveletekre
vonatkozó figyelmeztetésekkel, valamint a gazdagép és a tároló metrikáival.

## Hivatkozás

Megvalósítás:

- `bin/cli/runtime/magicBytes.mjs` — a bináris mágikus bájtok ellenőrzését végző segédfüggvények
- `bin/cli/runtime/sqliteRuntime.mjs` — ötlépéses futásidejű feloldó és igény szerinti telepítő
- `bin/cli/runtime/index.mjs` — indítási koordinátor (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm-telepítés utáni horog (nem végzetes előkészítés)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` exportok

## Egyetlen írót használó topológia (a HA nem támogatott)

A fenti illesztőprogram-tartalékmechanizmus továbbra is **egyetlen folyamatban** fut.
Az alapértelmezett SQLite-konfigurációjú OmniRoute **egyetlen írót** használ:

- Ne csatlakoztasson két OmniRoute-replikát ugyanahhoz a `storage.sqlite` fájlhoz.
- Egy konténer újraindítása, Recreate-telepítés, OOM miatti leállítás vagy HEALTHCHECK
  általi újraindítás megszakít minden folyamatban lévő SSE-munkamenetet. Az alapértelmezett
  működési útvonalon nincs munkamenet-leürítés.
- Ha az orchestrator életjel-ellenőrzése egy lassú `/healthz` végpontot leállásként értelmez,
  az egyetlen replikát is leállítja. Használjon inkább TCP-alapú életjel-ellenőrzést és HTTP
  `/healthz` készenléti ellenőrzést. Lásd:
  [Docker-útmutató — rendelkezésre állás](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  és [Kubernetes-szondaajánlások](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
