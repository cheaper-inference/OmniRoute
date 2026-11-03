# SQLite Runtime Resolution (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute 在啟動時會透過 5 步驟的備援鏈解析其 SQLite 驅動程式：

1. **內附的 `better-sqlite3`**（透過 `package.json` 中的 `dependencies`）
   — 速度最快，使用原生二進位檔；當環境中具備建置工具時，由 `npm install` 安裝。

2. **執行階段安裝的 `better-sqlite3`**（位於 `~/.omniroute/runtime/`）
   — 首次執行時延遲安裝，**或**由 `scripts/build/postinstall.mjs → scripts/postinstall.mjs` 安裝。
   載入前會驗證原生 `.node` 的魔術位元組（ELF / Mach-O / PE），
   以防止載入損毀或平台不符的二進位檔。

3. **`node:sqlite`**（Node ≥22.5 標準函式庫）— 不需要原生建置；當
   兩個 better-sqlite3 路徑都失敗時使用。功能集較受限。

4. **`sql.js`**（WASM）— 最終備援方案。可在所有環境中運作，但速度較慢，
   且會定期寫入資料，而非同步寫入。

## 為何如此複雜？

- **Windows EBUSY**：如果先前版本的 `better_sqlite3.node` 被執行中的程序鎖定，
  `npm install -g omniroute@latest` 可能會失敗。在 `~/.omniroute/runtime/`
  中執行階段安裝可避開全域 npm 快取。
- **缺少建置工具**：某些環境（沒有 VS Build Tools 的企業 Windows、
  最小化 Docker 映像檔）無法編譯 `better-sqlite3`。執行階段安裝程式會從
  npm 登錄檔解析預先建置的二進位檔；即使失敗，備援驅動程式也能確保
  OmniRoute 仍可啟動。
- **實體隔離系統**：如果無法連線至 npm 登錄檔，`node:sqlite`
  或 `sql.js` 可確保基本功能。

## 魔術位元組驗證

載入執行階段安裝的 `.node` 檔案之前，OmniRoute 會讀取前 8 個
位元組，並比對已知的平台魔術位元組：

| 平台              | 位元組（十六進位） | 標籤        |
| ----------------- | ------------------ | ----------- |
| Linux             | `7F 45 4C 46`      | `elf`       |
| macOS 64 位元 BE  | `FE ED FA CF`      | `macho`     |
| macOS 64 位元 LE  | `CF FA ED FE`      | `macho-le`  |
| macOS fat（通用） | `CA FE BA BE`      | `macho-fat` |
| Windows           | `4D 5A` (MZ)       | `pe`        |

若魔術位元組不符 → 忽略該檔案，並繼續進行下一個備援步驟。

## 檢查使用中的驅動程式

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## 手動控制

```bash
# 略過安裝後的預熱（用於快速 CI 安裝）
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# 強制重新安裝執行階段的 better-sqlite3
rm -rf ~/.omniroute/runtime
omniroute  # 將於下次啟動時重新安裝

# 檢查目前使用中的驅動程式
omniroute config db-info  # （若此 CLI 命令存在）
```

## 診斷同步停滯

使用 `better-sqlite3` 時，請在啟動前設定 `OMNIROUTE_SQLITE_SLOW_MS=200`，
以選擇啟用同步配接器計時。預設為停用。若已完成的操作耗時至少達到指定的
毫秒數，便會發出 `[SQLITE-SLOW]` 警告，每個配接器最多每十秒一次。
警告僅包含驅動程式、操作類別（`prepare`、`get`、`all`、`run`、`exec`、
`pragma`、交易或維護）以及經過的毫秒數：不包含 SQL、繫結、資料列、
路徑或例外狀況文字。

這是一項診斷輔助功能，而非逾時或查詢最佳化機制。它無法回報永不傳回的
操作、區分 CPU 工作與磁碟等待、識別確切的 SQL，或觀察透過原始驅動程式
控制代碼執行的操作。非同步備份的持續時間會刻意排除；其他 SQLite 驅動程式
不受此選擇性功能檢測。停用此變數會還原不含計時包裝函式的原始配接器。
資料庫結構描述或已儲存的組態不會發生任何變更。

`/healthz` 的延遲警告會回報自上次取樣以來的事件迴圈峰值，而非整個存續期間
的平均值。將其時間戳記與慢速操作警告及主機／儲存裝置指標相互比對後，
再將停滯歸因於 SQLite 或磁碟故障。

## 參考資料

實作：

- `bin/cli/runtime/magicBytes.mjs` — 二進位魔術位元組驗證輔助函式
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 步驟執行階段解析器 + 延遲安裝程式
- `bin/cli/runtime/index.mjs` — 啟動協調器（`warmUpRuntimes()`）
- `scripts/postinstall.mjs` — npm 安裝後掛鉤（非致命性預熱）
- `src/lib/db/core.ts` — 匯出 `ensureDbInitialized()` / `getDriverInfo()`

## 單一寫入者拓撲（不支援 HA）

上述驅動程式備援鏈仍在**單一程序**中執行。採用預設 SQLite 的
OmniRoute 是**單一寫入者**：

- 請勿將兩個 OmniRoute 複本連接至同一個 `storage.sqlite` 檔案。
- 容器重新啟動、Recreate 部署、OOM 終止或 HEALTHCHECK 重新啟動，
  都會中斷所有進行中的 SSE 工作階段。預設路徑不會排空工作階段。
- 若協調器的存活探測將回應緩慢的 `/healthz` 視為停止運作，便會終止唯一的
  複本。建議使用 TCP 存活探測 + HTTP `/healthz` 就緒探測。請參閱
  [Docker 指南 — 可用性](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  和 [Kubernetes 探測建議](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)。
