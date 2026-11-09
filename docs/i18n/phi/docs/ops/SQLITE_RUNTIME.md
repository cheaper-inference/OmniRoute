# SQLite Runtime Resolution (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

Nire-resolve ng OmniRoute ang SQLite driver nito sa pagsisimula sa pamamagitan ng 5-hakbang na fallback chain:

1. **Naka-bundle na `better-sqlite3`** (sa pamamagitan ng `dependencies` sa `package.json`)
   — pinakamabilis, native binary, ini-install ng `npm install` kapag mayroong mga build tool.

2. **Runtime-installed na `better-sqlite3`** (sa `~/.omniroute/runtime/`)
   — ini-install nang lazy sa unang pagpapatakbo **O** ng `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Bine-validate ang magic bytes ng native na `.node` (ELF / Mach-O / PE) bago i-load
   upang maprotektahan laban sa sira o para sa maling platform na mga binary.

3. **`node:sqlite`** (Node ≥22.5 stdlib) — walang kinakailangang native build; ginagamit kapag
   pumalya ang parehong better-sqlite3 path. Limitado ang hanay ng mga feature.

4. **`sql.js`** (WASM) — panghuling fallback. Gumagana kahit saan ngunit mas mabagal
   at nagsusulat ng data sa takdang pagitan sa halip na sabay-sabay.

## Bakit ganito kakomplikado?

- **Windows EBUSY**: Maaaring pumalya ang `npm install -g omniroute@latest` kung naka-lock
  ng tumatakbong proseso ang `better_sqlite3.node` ng nakaraang bersyon. Iniiwasan
  ng runtime install sa `~/.omniroute/runtime/` ang global npm cache.
- **Walang mga build tool**: Hindi kayang i-compile ng ilang environment (corporate Windows na walang VS Build
  Tools, minimal na Docker images) ang `better-sqlite3`. Kumukuha ang runtime
  installer ng pre-built na binary mula sa npm registry; tinitiyak ng mga fallback
  driver na makakapagsimula pa rin ang OmniRoute kahit pumalya iyon.
- **Mga air-gapped system**: Kung hindi maabot ang npm registry, ginagarantiya ng `node:sqlite`
  o `sql.js` ang pangunahing functionality.

## Pag-validate ng magic byte

Bago mag-load ng runtime-installed na `.node` file, binabasa ng OmniRoute ang unang 8
byte at itinutugma ang mga ito sa mga kilalang magic ng platform:

| Platform              | Mga byte (hex) | Label       |
| --------------------- | -------------- | ----------- |
| Linux                 | `7F 45 4C 46`  | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF`  | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE`  | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE`  | `macho-fat` |
| Windows               | `4D 5A` (MZ)   | `pe`        |

Kapag hindi tumugma ang magic → binabalewala ang file, at nagpapatuloy ang fallback sa susunod na hakbang.

## Pagsuri sa aktibong driver

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Manu-manong kontrol

```bash
# Laktawan ang postinstall warm-up (para sa mabibilis na CI install)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Sapilitang muling i-install ang runtime better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # muling i-install sa susunod na pagsisimula

# Suriin kung aling driver ang aktibo
omniroute config db-info  # (kung umiiral ang CLI command)
```

## Pag-diagnose ng mga synchronous stall

Sa `better-sqlite3`, itakda ang `OMNIROUTE_SQLITE_SLOW_MS=200` bago magsimula upang mag-opt in
sa pagsukat ng oras ng synchronous adapter. Naka-off ito bilang default. Ang nakumpletong operation na tumatagal
nang hindi bababa sa ganoong karaming millisecond ay naglalabas ng `[SQLITE-SLOW]` warning, nang hindi hihigit sa isang beses kada
sampung segundo para sa bawat adapter. Ang warning ay naglalaman lamang ng driver, klase ng operation
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, transaction o maintenance), at
lumipas na mga millisecond: walang SQL, bindings, rows, paths o exception text.

Isa itong tulong sa pag-diagnose, hindi timeout o query optimization. Hindi nito maiuulat
ang isang operation na hindi kailanman bumabalik, maihihiwalay ang CPU work sa paghihintay sa disk, matutukoy
ang eksaktong SQL, o mamamasdan ang mga operation na isinagawa sa pamamagitan ng raw driver handle.
Sadyang hindi kasama ang tagal ng async backup; hindi nilalagyan ng instrumentation ng opt-in na ito ang iba pang SQLite driver.
Kapag na-disable ang variable, ibinabalik ang orihinal na adapter
nang walang mga timing wrapper. Walang pagbabago sa database schema o naka-store na configuration.

Iniuulat ng `/healthz` lag warning ang pinakamataas na event-loop lag mula noong nakaraang sample,
hindi ang lifetime average. Iugnay ang mga timestamp nito sa mga slow-operation warning
at host/storage metric bago ipalagay na ang stall ay dulot ng SQLite o pagkasira ng disk.

## Sanggunian

Implementasyon:

- `bin/cli/runtime/magicBytes.mjs` — mga helper para sa pag-validate ng binary magic byte
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-hakbang na runtime resolver + lazy installer
- `bin/cli/runtime/index.mjs` — startup orchestrator (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm post-install hook (hindi fatal na warm-up)
- `src/lib/db/core.ts` — mga export na `ensureDbInitialized()` / `getDriverInfo()`

## Single-writer na topology (hindi suportado ang HA)

Gumagana pa rin ang driver fallback chain sa itaas sa **iisang proseso**. Ang default na SQLite
OmniRoute ay may **iisang writer**:

- Huwag ikonekta ang dalawang OmniRoute replica sa iisang `storage.sqlite` file.
- Kapag nag-restart ang container, may Recreate deploy, OOM kill, o HEALTHCHECK restart, mapuputol
  ang bawat kasalukuyang SSE session. Walang session drain sa karaniwang path.
- Papatayin ng orchestrator liveness na itinuturing na dead ang mabagal na `/healthz` ang nag-iisang
  replica. Mas piliin ang TCP liveness + HTTP `/healthz` readiness. Tingnan ang
  [Gabay sa Docker — availability](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  at [mga rekomendasyon sa Kubernetes probe](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
