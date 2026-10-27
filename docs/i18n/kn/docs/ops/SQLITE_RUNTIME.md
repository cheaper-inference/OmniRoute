# SQLite Runtime Resolution (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ಪ್ರಾರಂಭವಾಗುವಾಗ 5-ಹಂತದ ಪರ್ಯಾಯ ಸರಣಿಯ ಮೂಲಕ ತನ್ನ SQLite ಡ್ರೈವರ್ ಅನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ:

1. **ಬಂಡಲ್ ಮಾಡಲಾದ `better-sqlite3`** (`package.json`ನಲ್ಲಿನ `dependencies` ಮೂಲಕ)
   — ಅತ್ಯಂತ ವೇಗವಾದದ್ದು, ಸ್ಥಳೀಯ ಬೈನರಿ; ಬಿಲ್ಡ್ ಉಪಕರಣಗಳು ಲಭ್ಯವಿದ್ದಾಗ `npm install` ಮೂಲಕ ಸ್ಥಾಪನೆಯಾಗುತ್ತದೆ.

2. **ರನ್ಟೈಮ್ನಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾದ `better-sqlite3`** (`~/.omniroute/runtime/`ನಲ್ಲಿ)
   — ಮೊದಲ ಚಾಲನೆಯಲ್ಲಿ ಅಗತ್ಯವಿದ್ದಾಗ **ಅಥವಾ** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` ಮೂಲಕ ಸ್ಥಾಪನೆಯಾಗುತ್ತದೆ.
   ದೋಷಪೂರಿತ ಅಥವಾ ತಪ್ಪು ಪ್ಲಾಟ್ಫಾರ್ಮ್ನ ಬೈನರಿಗಳನ್ನು ಲೋಡ್ ಮಾಡುವುದನ್ನು ತಡೆಯಲು,
   ಲೋಡ್ ಮಾಡುವ ಮೊದಲು ಸ್ಥಳೀಯ `.node` ಮ್ಯಾಜಿಕ್ ಬೈಟ್ಗಳನ್ನು (ELF / Mach-O / PE) ಪರಿಶೀಲಿಸುತ್ತದೆ.

3. **`node:sqlite`** (Node ≥22.5 ಪ್ರಮಾಣಿತ ಲೈಬ್ರರಿ) — ಸ್ಥಳೀಯ ಬಿಲ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ; ಎರಡೂ
   better-sqlite3 ಮಾರ್ಗಗಳು ವಿಫಲವಾದಾಗ ಬಳಸಲಾಗುತ್ತದೆ. ಸೀಮಿತ ವೈಶಿಷ್ಟ್ಯಗಳ ಸಮೂಹವನ್ನು ಹೊಂದಿದೆ.

4. **`sql.js`** (WASM) — ಅಂತಿಮ ಪರ್ಯಾಯ. ಎಲ್ಲೆಡೆಯೂ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ಆದರೆ ನಿಧಾನವಾಗಿರುತ್ತದೆ
   ಮತ್ತು ಡೇಟಾವನ್ನು ಸಮಕಾಲಿಕವಾಗಿ ಬರೆಯುವ ಬದಲು ನಿಗದಿತ ಅಂತರಗಳಲ್ಲಿ ಬರೆಯುತ್ತದೆ.

## ಈ ಸಂಕೀರ್ಣತೆ ಏಕೆ?

- **Windows EBUSY**: ಹಿಂದಿನ ಆವೃತ್ತಿಯ `better_sqlite3.node` ಅನ್ನು ಚಾಲನೆಯಲ್ಲಿರುವ
  ಪ್ರಕ್ರಿಯೆಯೊಂದು ಲಾಕ್ ಮಾಡಿದ್ದರೆ `npm install -g omniroute@latest` ವಿಫಲವಾಗಬಹುದು. `~/.omniroute/runtime/`ನಲ್ಲಿನ
  ರನ್ಟೈಮ್ ಸ್ಥಾಪನೆಯು ಜಾಗತಿಕ npm ಕ್ಯಾಶ್ ಅನ್ನು ಬಳಸದೆ ಈ ಸಮಸ್ಯೆಯನ್ನು ತಪ್ಪಿಸುತ್ತದೆ.
- **ಬಿಲ್ಡ್ ಉಪಕರಣಗಳಿಲ್ಲ**: ಕೆಲವು ಪರಿಸರಗಳಲ್ಲಿ (VS Build Tools ಇಲ್ಲದ ಕಾರ್ಪೊರೇಟ್ Windows,
  ಕನಿಷ್ಠ Docker ಇಮೇಜ್ಗಳು) `better-sqlite3` ಅನ್ನು ಕಂಪೈಲ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ರನ್ಟೈಮ್
  ಸ್ಥಾಪಕವು npm ರಿಜಿಸ್ಟ್ರಿಯಿಂದ ಪೂರ್ವ-ಬಿಲ್ಡ್ ಮಾಡಿದ ಬೈನರಿಯನ್ನು ಪಡೆಯುತ್ತದೆ; ಅದು ವಿಫಲವಾದರೂ
  OmniRoute ಪ್ರಾರಂಭವಾಗುವುದನ್ನು ಪರ್ಯಾಯ ಡ್ರೈವರ್ಗಳು ಖಚಿತಪಡಿಸುತ್ತವೆ.
- **ನೆಟ್ವರ್ಕ್ನಿಂದ ಪ್ರತ್ಯೇಕಿಸಲಾದ ಸಿಸ್ಟಮ್ಗಳು**: npm ರಿಜಿಸ್ಟ್ರಿಯನ್ನು ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ,
  `node:sqlite` ಅಥವಾ `sql.js` ಮೂಲಭೂತ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.

## ಮ್ಯಾಜಿಕ್-ಬೈಟ್ ಪರಿಶೀಲನೆ

ರನ್ಟೈಮ್ನಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾದ `.node` ಫೈಲ್ ಅನ್ನು ಲೋಡ್ ಮಾಡುವ ಮೊದಲು, OmniRoute ಮೊದಲ 8
ಬೈಟ್ಗಳನ್ನು ಓದಿ ಅವುಗಳನ್ನು ತಿಳಿದಿರುವ ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಮ್ಯಾಜಿಕ್ಗಳೊಂದಿಗೆ ಹೋಲಿಸುತ್ತದೆ:

| ಪ್ಲಾಟ್ಫಾರ್ಮ್          | ಬೈಟ್ಗಳು (hex) | ಲೇಬಲ್       |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

ಮ್ಯಾಜಿಕ್ ಹೊಂದಿಕೆಯಾಗದಿದ್ದರೆ → ಫೈಲ್ ಅನ್ನು ನಿರ್ಲಕ್ಷಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಮುಂದಿನ ಹಂತದ ಪರ್ಯಾಯವನ್ನು ಪ್ರಯತ್ನಿಸಲಾಗುತ್ತದೆ.

## ಸಕ್ರಿಯ ಡ್ರೈವರ್ ಅನ್ನು ಪರಿಶೀಲಿಸುವುದು

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ಹಸ್ತಚಾಲಿತ ನಿಯಂತ್ರಣ

```bash
# ವೇಗವಾದ CI ಸ್ಥಾಪನೆಗಳಿಗಾಗಿ postinstall ಪೂರ್ವಸಿದ್ಧತೆಯನ್ನು ಬಿಟ್ಟುಬಿಡಿ
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# ರನ್ಟೈಮ್ better-sqlite3 ಅನ್ನು ಬಲವಂತವಾಗಿ ಮರುಸ್ಥಾಪಿಸಿ
rm -rf ~/.omniroute/runtime
omniroute  # ಮುಂದಿನ ಪ್ರಾರಂಭದಲ್ಲಿ ಮರುಸ್ಥಾಪಿಸುತ್ತದೆ

# ಯಾವ ಡ್ರೈವರ್ ಸಕ್ರಿಯವಾಗಿದೆ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ
omniroute config db-info  # (CLI ಕಮಾಂಡ್ ಅಸ್ತಿತ್ವದಲ್ಲಿದ್ದರೆ)
```

## ಸಮಕಾಲಿಕ ಸ್ಥಗಿತಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುವುದು

`better-sqlite3` ಬಳಸುವಾಗ, ಸಮಕಾಲಿಕ ಅಡಾಪ್ಟರ್ ಸಮಯಮಾಪನವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು
`OMNIROUTE_SQLITE_SLOW_MS=200` ಹೊಂದಿಸಿ. ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಇದು ನಿಷ್ಕ್ರಿಯವಾಗಿರುತ್ತದೆ. ಕನಿಷ್ಠ
ಅಷ್ಟು ಮಿಲಿಸೆಕೆಂಡ್ಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ಪೂರ್ಣಗೊಂಡ ಕಾರ್ಯಾಚರಣೆಯು `[SQLITE-SLOW]` ಎಚ್ಚರಿಕೆಯನ್ನು
ಹೊರಸೂಸುತ್ತದೆ; ಪ್ರತಿ ಅಡಾಪ್ಟರ್ಗೆ ಹತ್ತು ಸೆಕೆಂಡ್ಗಳಲ್ಲಿ ಗರಿಷ್ಠ ಒಮ್ಮೆ ಮಾತ್ರ. ಎಚ್ಚರಿಕೆಯು ಡ್ರೈವರ್,
ಕಾರ್ಯಾಚರಣೆ ವರ್ಗ (`prepare`, `get`, `all`, `run`, `exec`, `pragma`, ವಹಿವಾಟು ಅಥವಾ ನಿರ್ವಹಣೆ)
ಮತ್ತು ಕಳೆದ ಮಿಲಿಸೆಕೆಂಡ್ಗಳನ್ನು ಮಾತ್ರ ಒಳಗೊಂಡಿರುತ್ತದೆ: SQL, ಬೈಂಡಿಂಗ್ಗಳು, ಸಾಲುಗಳು, ಪಥಗಳು ಅಥವಾ
ವಿನಾಯಿತಿ ಪಠ್ಯ ಇರುವುದಿಲ್ಲ.

ಇದು ರೋಗನಿರ್ಣಯದ ಸಹಾಯಕ ಸಾಧನವಾಗಿದ್ದು, ಕಾಲಮಿತಿ ಅಥವಾ ಕ್ವೆರಿ ಆಪ್ಟಿಮೈಸೇಶನ್ ಅಲ್ಲ. ಎಂದಿಗೂ
ಹಿಂತಿರುಗದ ಕಾರ್ಯಾಚರಣೆಯನ್ನು ವರದಿ ಮಾಡಲು, CPU ಕಾರ್ಯವನ್ನು ಡಿಸ್ಕ್ ಕಾಯುವಿಕೆಯಿಂದ ಪ್ರತ್ಯೇಕಿಸಲು,
ನಿಖರವಾದ SQL ಅನ್ನು ಗುರುತಿಸಲು ಅಥವಾ ನೇರ ಡ್ರೈವರ್ ಹ್ಯಾಂಡಲ್ ಮೂಲಕ ನಿರ್ವಹಿಸಲಾದ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು
ಗಮನಿಸಲು ಇದಕ್ಕೆ ಸಾಧ್ಯವಿಲ್ಲ. ಅಸಮಕಾಲಿಕ ಬ್ಯಾಕಪ್ ಅವಧಿಯನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಹೊರಗಿಡಲಾಗಿದೆ;
ಇತರ SQLite ಡ್ರೈವರ್ಗಳನ್ನು ಈ ಐಚ್ಛಿಕ ಸಮಯಮಾಪನವು ಒಳಗೊಳ್ಳುವುದಿಲ್ಲ. ವೇರಿಯೇಬಲ್ ಅನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದರೆ
ಸಮಯಮಾಪನ ರ್ಯಾಪರ್ಗಳಿಲ್ಲದ ಮೂಲ ಅಡಾಪ್ಟರ್ ಮರುಸ್ಥಾಪನೆಯಾಗುತ್ತದೆ. ಡೇಟಾಬೇಸ್ ಸ್ಕೀಮಾ ಅಥವಾ ಸಂಗ್ರಹಿತ
ಕಾನ್ಫಿಗರೇಶನ್ನಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆಗಳಾಗುವುದಿಲ್ಲ.

`/healthz` ಲ್ಯಾಗ್ ಎಚ್ಚರಿಕೆಯು ಸಂಪೂರ್ಣ ಜೀವಿತಾವಧಿಯ ಸರಾಸರಿಯ ಬದಲು ಹಿಂದಿನ ಮಾದರಿಯ ನಂತರದ
ಈವೆಂಟ್-ಲೂಪ್ ಗರಿಷ್ಠ ಮೌಲ್ಯವನ್ನು ವರದಿ ಮಾಡುತ್ತದೆ. ಸ್ಥಗಿತವನ್ನು SQLite ಅಥವಾ ಡಿಸ್ಕ್ ವೈಫಲ್ಯಕ್ಕೆ
ಕಾರಣವೆಂದು ನಿರ್ಧರಿಸುವ ಮೊದಲು ಅದರ ಟೈಮ್ಸ್ಟ್ಯಾಂಪ್ಗಳನ್ನು ನಿಧಾನ ಕಾರ್ಯಾಚರಣೆಯ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು
ಹೋಸ್ಟ್/ಸ್ಟೋರೇಜ್ ಮೆಟ್ರಿಕ್ಗಳೊಂದಿಗೆ ಪರಸ್ಪರ ಸಂಬಂಧಿಸಿ.

## ಉಲ್ಲೇಖ

ಅನುಷ್ಠಾನ:

- `bin/cli/runtime/magicBytes.mjs` — ಬೈನರಿ ಮ್ಯಾಜಿಕ್-ಬೈಟ್ ಪರಿಶೀಲನಾ ಸಹಾಯಕಗಳು
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-ಹಂತದ ರನ್ಟೈಮ್ ನಿರ್ಧಾರಕ + ಅಗತ್ಯವಿದ್ದಾಗ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಸ್ಥಾಪಕ
- `bin/cli/runtime/index.mjs` — ಪ್ರಾರಂಭ ಸಂಯೋಜಕ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm ಸ್ಥಾಪನೆಯ ನಂತರದ ಹುಕ್ (ವಿಫಲವಾದರೂ ಅಪಾಯಕಾರಿಯಲ್ಲದ ಪೂರ್ವಸಿದ್ಧತೆ)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ಎಕ್ಸ್ಪೋರ್ಟ್ಗಳು

## ಏಕ-ರೈಟರ್ ಟೋಪಾಲಜಿ (HA ಬೆಂಬಲಿತವಲ್ಲ)

ಮೇಲಿನ ಡ್ರೈವರ್ ಪರ್ಯಾಯ ಸರಣಿಯು ಇನ್ನೂ **ಒಂದೇ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ** ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಪೂರ್ವನಿಯೋಜಿತ
SQLite OmniRoute ಒಂದು **ಏಕ ರೈಟರ್** ಆಗಿದೆ:

- ಒಂದೇ `storage.sqlite` ಫೈಲ್ಗೆ ಎರಡು OmniRoute ಪ್ರತಿರೂಪಗಳನ್ನು ಲಗತ್ತಿಸಬೇಡಿ.
- ಕಂಟೇನರ್ ಮರುಪ್ರಾರಂಭ, Recreate ನಿಯೋಜನೆ, OOM kill ಅಥವಾ HEALTHCHECK ಮರುಪ್ರಾರಂಭವು
  ಪ್ರಗತಿಯಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು SSE ಸೆಷನ್ ಅನ್ನು ಸ್ಥಗಿತಗೊಳಿಸುತ್ತದೆ. ಪ್ರಮಾಣಿತ ಮಾರ್ಗದಲ್ಲಿ ಸೆಷನ್ಗಳನ್ನು ಕ್ರಮಬದ್ಧವಾಗಿ ಮುಕ್ತಾಯಗೊಳಿಸುವ ವ್ಯವಸ್ಥೆ ಇಲ್ಲ.
- ನಿಧಾನವಾದ `/healthz` ಅನ್ನು ಸ್ಥಗಿತವೆಂದು ಪರಿಗಣಿಸುವ ಆರ್ಕೆಸ್ಟ್ರೇಟರ್ ಲೈವ್ನೆಸ್ ಪರಿಶೀಲನೆಯು ಏಕೈಕ
  ಪ್ರತಿರೂಪವನ್ನೇ ಕೊನೆಗೊಳಿಸುತ್ತದೆ. TCP ಲೈವ್ನೆಸ್ + HTTP `/healthz` ಸಿದ್ಧತಾ ಪರಿಶೀಲನೆಯನ್ನು ಆದ್ಯತೆ ನೀಡಿ. ನೋಡಿ:
  [Docker ಮಾರ್ಗದರ್ಶಿ — ಲಭ್ಯತೆ](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ಮತ್ತು [Kubernetes ಪ್ರೋಬ್ ಶಿಫಾರಸುಗಳು](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
