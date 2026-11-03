# SQLite Runtime Resolution (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ਸ਼ੁਰੂਆਤ ਵੇਲੇ 5-ਪੜਾਵੀ ਫਾਲਬੈਕ ਲੜੀ ਰਾਹੀਂ ਆਪਣੇ SQLite ਡਰਾਈਵਰ ਦੀ ਚੋਣ ਕਰਦਾ ਹੈ:

1. **ਬੰਡਲ ਕੀਤਾ `better-sqlite3`** (`package.json` ਵਿੱਚ `dependencies` ਰਾਹੀਂ)
   — ਸਭ ਤੋਂ ਤੇਜ਼, ਨੇਟਿਵ ਬਾਈਨਰੀ, ਜਦੋਂ ਬਿਲਡ ਟੂਲ ਮੌਜੂਦ ਹੋਣ ਤਾਂ `npm install` ਦੁਆਰਾ ਇੰਸਟਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

2. **ਰਨਟਾਈਮ 'ਤੇ ਇੰਸਟਾਲ ਕੀਤਾ `better-sqlite3`** (`~/.omniroute/runtime/` ਵਿੱਚ)
   — ਪਹਿਲੀ ਵਾਰ ਚਲਾਉਣ ਵੇਲੇ ਲੋੜ ਅਨੁਸਾਰ **ਜਾਂ** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` ਦੁਆਰਾ ਇੰਸਟਾਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
   ਲੋਡ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਨੇਟਿਵ `.node` ਮੈਜਿਕ ਬਾਈਟਾਂ (ELF / Mach-O / PE) ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ
   ਤਾਂ ਜੋ ਖਰਾਬ ਜਾਂ ਗਲਤ ਪਲੇਟਫਾਰਮ ਵਾਲੀਆਂ ਬਾਈਨਰੀਆਂ ਤੋਂ ਬਚਿਆ ਜਾ ਸਕੇ।

3. **`node:sqlite`** (Node ≥22.5 ਸਟੈਂਡਰਡ ਲਾਇਬ੍ਰੇਰੀ) — ਕਿਸੇ ਨੇਟਿਵ ਬਿਲਡ ਦੀ ਲੋੜ ਨਹੀਂ; ਉਦੋਂ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ ਜਦੋਂ
   better-sqlite3 ਦੇ ਦੋਵੇਂ ਪਾਥ ਅਸਫਲ ਹੋ ਜਾਂਦੇ ਹਨ। ਸੀਮਤ ਫੀਚਰ ਸੈੱਟ।

4. **`sql.js`** (WASM) — ਆਖਰੀ ਫਾਲਬੈਕ। ਹਰ ਥਾਂ ਕੰਮ ਕਰਦਾ ਹੈ ਪਰ ਹੌਲੀ ਹੈ
   ਅਤੇ ਡਾਟਾ ਸਮਕਾਲੀ ਤੌਰ 'ਤੇ ਲਿਖਣ ਦੀ ਬਜਾਏ ਨਿਯਤ ਅੰਤਰਾਲ 'ਤੇ ਲਿਖਦਾ ਹੈ।

## ਇਹ ਜਟਿਲਤਾ ਕਿਉਂ?

- **Windows EBUSY**: `npm install -g omniroute@latest` ਅਸਫਲ ਹੋ ਸਕਦਾ ਹੈ ਜੇ ਪਿਛਲੇ
  ਵਰਜਨ ਦੀ `better_sqlite3.node` ਫਾਈਲ ਕਿਸੇ ਚੱਲ ਰਹੀ ਪ੍ਰਕਿਰਿਆ ਦੁਆਰਾ ਲੌਕ ਕੀਤੀ ਹੋਵੇ। `~/.omniroute/runtime/` ਵਿੱਚ ਰਨਟਾਈਮ
  ਇੰਸਟਾਲ ਗਲੋਬਲ npm ਕੈਸ਼ ਨੂੰ ਬਾਈਪਾਸ ਕਰ ਦਿੰਦਾ ਹੈ।
- **ਬਿਲਡ ਟੂਲ ਨਹੀਂ**: ਕੁਝ ਵਾਤਾਵਰਣ (`VS Build
Tools` ਤੋਂ ਬਿਨਾਂ ਕਾਰਪੋਰੇਟ Windows, ਘੱਟੋ-ਘੱਟ Docker ਇਮੇਜਾਂ) `better-sqlite3` ਨੂੰ ਕੰਪਾਇਲ ਨਹੀਂ ਕਰ ਸਕਦੇ। ਰਨਟਾਈਮ
  ਇੰਸਟਾਲਰ npm ਰਜਿਸਟਰੀ ਤੋਂ ਪਹਿਲਾਂ ਤੋਂ ਬਿਲਡ ਕੀਤੀ ਬਾਈਨਰੀ ਲੱਭਦਾ ਹੈ; ਫਾਲਬੈਕ
  ਡਰਾਈਵਰ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਨ ਕਿ ਇਸ ਦੇ ਅਸਫਲ ਹੋਣ 'ਤੇ ਵੀ OmniRoute ਸ਼ੁਰੂ ਹੋ ਸਕੇ।
- **ਏਅਰ-ਗੈਪਡ ਸਿਸਟਮ**: ਜੇ npm ਰਜਿਸਟਰੀ ਤੱਕ ਪਹੁੰਚ ਨਾ ਹੋਵੇ, ਤਾਂ `node:sqlite`
  ਜਾਂ `sql.js` ਬੁਨਿਆਦੀ ਕਾਰਜਸ਼ੀਲਤਾ ਦੀ ਗਾਰੰਟੀ ਦਿੰਦੇ ਹਨ।

## ਮੈਜਿਕ-ਬਾਈਟ ਪੁਸ਼ਟੀ

ਰਨਟਾਈਮ 'ਤੇ ਇੰਸਟਾਲ ਕੀਤੀ `.node` ਫਾਈਲ ਨੂੰ ਲੋਡ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, OmniRoute ਪਹਿਲੀਆਂ 8
ਬਾਈਟਾਂ ਪੜ੍ਹਦਾ ਹੈ ਅਤੇ ਜਾਣੀਆਂ-ਪਛਾਣੀਆਂ ਪਲੇਟਫਾਰਮ ਮੈਜਿਕਾਂ ਨਾਲ ਮਿਲਾਉਂਦਾ ਹੈ:

| ਪਲੇਟਫਾਰਮ             | ਬਾਈਟਾਂ (hex)  | ਲੇਬਲ        |
| -------------------- | ------------- | ----------- |
| Linux                | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE      | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (ਯੂਨੀਵਰਸਲ) | `CA FE BA BE` | `macho-fat` |
| Windows              | `4D 5A` (MZ)  | `pe`        |

ਮੈਜਿਕ ਮੇਲ ਨਾ ਖਾਣ 'ਤੇ → ਫਾਈਲ ਨੂੰ ਅਣਡਿੱਠਾ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਫਾਲਬੈਕ ਅਗਲੇ ਪੜਾਅ ਨਾਲ ਜਾਰੀ ਰਹਿੰਦਾ ਹੈ।

## ਸਰਗਰਮ ਡਰਾਈਵਰ ਦੀ ਜਾਂਚ

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## ਹੱਥੀਂ ਨਿਯੰਤਰਣ

```bash
# ਤੇਜ਼ CI ਇੰਸਟਾਲਾਂ ਲਈ postinstall warm-up ਛੱਡੋ
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# ਰਨਟਾਈਮ better-sqlite3 ਨੂੰ ਜ਼ਬਰਦਸਤੀ ਮੁੜ ਇੰਸਟਾਲ ਕਰੋ
rm -rf ~/.omniroute/runtime
omniroute  # ਅਗਲੀ ਸ਼ੁਰੂਆਤ 'ਤੇ ਮੁੜ ਇੰਸਟਾਲ ਹੋਵੇਗਾ

# ਜਾਂਚੋ ਕਿ ਕਿਹੜਾ ਡਰਾਈਵਰ ਸਰਗਰਮ ਹੈ
omniroute config db-info  # (ਜੇ CLI ਕਮਾਂਡ ਮੌਜੂਦ ਹੋਵੇ)
```

## ਸਮਕਾਲੀ ਰੁਕਾਵਟਾਂ ਦਾ ਨਿਦਾਨ

`better-sqlite3` ਨਾਲ, ਸਮਕਾਲੀ ਅਡੈਪਟਰ ਟਾਈਮਿੰਗ ਚਾਲੂ ਕਰਨ ਲਈ ਸ਼ੁਰੂਆਤ ਤੋਂ ਪਹਿਲਾਂ `OMNIROUTE_SQLITE_SLOW_MS=200` ਸੈੱਟ ਕਰੋ।
ਮੂਲ ਰੂਪ ਵਿੱਚ ਇਹ ਬੰਦ ਹੁੰਦੀ ਹੈ। ਘੱਟੋ-ਘੱਟ ਇੰਨੇ ਮਿਲੀਸਕਿੰਟ ਲੈਣ ਵਾਲੀ ਮੁਕੰਮਲ ਕਾਰਵਾਈ
ਹਰ ਅਡੈਪਟਰ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ ਹਰ ਦਸ ਸਕਿੰਟਾਂ ਵਿੱਚ ਇੱਕ ਵਾਰ `[SQLITE-SLOW]` ਚੇਤਾਵਨੀ ਜਾਰੀ ਕਰਦੀ ਹੈ।
ਚੇਤਾਵਨੀ ਵਿੱਚ ਸਿਰਫ਼ ਡਰਾਈਵਰ, ਕਾਰਵਾਈ ਦੀ ਸ਼੍ਰੇਣੀ
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, ਟ੍ਰਾਂਜ਼ੈਕਸ਼ਨ ਜਾਂ ਰੱਖ-ਰਖਾਅ), ਅਤੇ
ਬੀਤੇ ਮਿਲੀਸਕਿੰਟ ਹੁੰਦੇ ਹਨ: ਕੋਈ SQL, ਬਾਈਂਡਿੰਗਾਂ, ਕਤਾਰਾਂ, ਪਾਥ ਜਾਂ ਅਪਵਾਦ ਟੈਕਸਟ ਨਹੀਂ ਹੁੰਦਾ।

ਇਹ ਨਿਦਾਨ ਲਈ ਸਹਾਇਕ ਹੈ, ਟਾਈਮਆਉਟ ਜਾਂ ਕਵੇਰੀ ਅਨੁਕੂਲਨ ਨਹੀਂ। ਇਹ ਉਸ ਕਾਰਵਾਈ ਬਾਰੇ ਰਿਪੋਰਟ ਨਹੀਂ ਕਰ ਸਕਦਾ
ਜੋ ਕਦੇ ਵਾਪਸ ਨਹੀਂ ਆਉਂਦੀ, CPU ਦੇ ਕੰਮ ਨੂੰ ਡਿਸਕ ਉਡੀਕਾਂ ਤੋਂ ਵੱਖਰਾ ਨਹੀਂ ਕਰ ਸਕਦਾ, ਸਟੀਕ SQL ਦੀ ਪਛਾਣ ਨਹੀਂ ਕਰ ਸਕਦਾ,
ਜਾਂ ਰੌ ਡਰਾਈਵਰ ਹੈਂਡਲ ਰਾਹੀਂ ਕੀਤੀਆਂ ਕਾਰਵਾਈਆਂ ਦਾ ਨਿਰੀਖਣ ਨਹੀਂ ਕਰ ਸਕਦਾ।
ਅਸਮਕਾਲੀ ਬੈਕਅੱਪ ਦੀ ਮਿਆਦ ਨੂੰ ਜਾਣਬੁੱਝ ਕੇ ਬਾਹਰ ਰੱਖਿਆ ਗਿਆ ਹੈ; ਹੋਰ SQLite ਡਰਾਈਵਰਾਂ ਨੂੰ
ਇਸ ਚੋਣਵੀਂ ਸਹੂਲਤ ਰਾਹੀਂ ਇੰਸਟਰੂਮੈਂਟ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ। ਵੇਰੀਏਬਲ ਨੂੰ ਅਯੋਗ ਕਰਨ ਨਾਲ ਟਾਈਮਿੰਗ ਰੈਪਰਾਂ ਤੋਂ ਬਿਨਾਂ
ਮੂਲ ਅਡੈਪਟਰ ਮੁੜ ਬਹਾਲ ਹੋ ਜਾਂਦਾ ਹੈ। ਡਾਟਾਬੇਸ ਸਕੀਮਾ ਜਾਂ ਸਟੋਰ ਕੀਤੀ ਸੰਰਚਨਾ ਵਿੱਚ ਕੋਈ ਤਬਦੀਲੀ ਨਹੀਂ ਹੁੰਦੀ।

`/healthz` ਲੈਗ ਚੇਤਾਵਨੀ ਪਿਛਲੇ ਨਮੂਨੇ ਤੋਂ ਬਾਅਦ ਦੇ ਇਵੈਂਟ-ਲੂਪ ਦੇ ਸਿਖਰ ਦੀ ਰਿਪੋਰਟ ਕਰਦੀ ਹੈ,
ਨਾ ਕਿ ਪੂਰੇ ਜੀਵਨਕਾਲ ਦੀ ਔਸਤ ਦੀ। ਕਿਸੇ ਰੁਕਾਵਟ ਨੂੰ SQLite ਜਾਂ ਡਿਸਕ ਦੀ ਅਸਫਲਤਾ ਮੰਨਣ ਤੋਂ ਪਹਿਲਾਂ
ਇਸ ਦੇ ਟਾਈਮਸਟੈਂਪਾਂ ਨੂੰ ਹੌਲੀਆਂ ਕਾਰਵਾਈਆਂ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਹੋਸਟ/ਸਟੋਰੇਜ ਮੈਟ੍ਰਿਕਸ ਨਾਲ ਮਿਲਾਓ।

## ਹਵਾਲਾ

ਲਾਗੂਕਰਨ:

- `bin/cli/runtime/magicBytes.mjs` — ਬਾਈਨਰੀ ਮੈਜਿਕ-ਬਾਈਟ ਪੁਸ਼ਟੀ ਲਈ ਸਹਾਇਕ
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-ਪੜਾਵੀ ਰਨਟਾਈਮ ਰਿਜ਼ਾਲਵਰ + ਲੋੜ ਅਨੁਸਾਰ ਇੰਸਟਾਲਰ
- `bin/cli/runtime/index.mjs` — ਸ਼ੁਰੂਆਤੀ ਆਰਕੈਸਟਰੇਟਰ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm ਇੰਸਟਾਲੇਸ਼ਨ-ਉਪਰੰਤ ਹੁੱਕ (ਗੈਰ-ਘਾਤਕ warm-up)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ਐਕਸਪੋਰਟ

## ਇੱਕ-ਲੇਖਕ ਟੋਪੋਲੋਜੀ (HA ਅਸਮਰਥਿਤ)

ਉਪਰੋਕਤ ਡਰਾਈਵਰ ਫਾਲਬੈਕ ਲੜੀ ਫਿਰ ਵੀ **ਇੱਕ ਪ੍ਰਕਿਰਿਆ** ਵਿੱਚ ਚੱਲਦੀ ਹੈ। ਮੂਲ SQLite
OmniRoute ਇੱਕ **ਇੱਕਲਾ ਲੇਖਕ** ਹੈ:

- ਦੋ OmniRoute ਰੈਪਲਿਕਾਵਾਂ ਨੂੰ ਇੱਕੋ `storage.sqlite` ਫਾਈਲ ਨਾਲ ਨਾ ਜੋੜੋ।
- ਕੰਟੇਨਰ ਰੀਸਟਾਰਟ, Recreate ਡਿਪਲੌਇ, OOM kill, ਜਾਂ HEALTHCHECK ਰੀਸਟਾਰਟ ਨਾਲ
  ਹਰ ਚੱਲ ਰਿਹਾ SSE ਸੈਸ਼ਨ ਬੰਦ ਹੋ ਜਾਂਦਾ ਹੈ। ਮੂਲ ਪਾਥ 'ਤੇ ਕੋਈ ਸੈਸ਼ਨ ਡਰੇਨ ਨਹੀਂ ਹੁੰਦਾ।
- ਜੇ ਆਰਕੈਸਟਰੇਟਰ ਲਾਈਵਨੈੱਸ ਕਿਸੇ ਹੌਲੇ `/healthz` ਨੂੰ ਮ੍ਰਿਤ ਮੰਨਦੀ ਹੈ, ਤਾਂ ਇਹ ਇਕਲੌਤੀ
  ਰੈਪਲਿਕਾ ਨੂੰ ਬੰਦ ਕਰ ਦੇਵੇਗੀ। TCP ਲਾਈਵਨੈੱਸ + HTTP `/healthz` ਰੈਡੀਨੈੱਸ ਨੂੰ ਤਰਜੀਹ ਦਿਓ। ਵੇਖੋ
  [Docker ਗਾਈਡ — ਉਪਲਬਧਤਾ](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  ਅਤੇ [Kubernetes ਪ੍ਰੋਬ ਸਿਫ਼ਾਰਸ਼ਾਂ](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)।
