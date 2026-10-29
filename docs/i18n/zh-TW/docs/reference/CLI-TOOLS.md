# CLI Tools — OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇪🇹 [am](../../../am/docs/reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇧🇦 [bs](../../../bs/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇬🇷 [el](../../../el/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇪🇪 [et](../../../et/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇪 [ga](../../../ga/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇳🇬 [ha](../../../ha/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇦🇲 [hy](../../../hy/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇳🇬 [ig](../../../ig/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇬🇪 [ka](../../../ka/docs/reference/CLI-TOOLS.md) · 🇰🇭 [km](../../../km/docs/reference/CLI-TOOLS.md) · 🇮🇳 [kn](../../../kn/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇹 [lt](../../../lt/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ml](../../../ml/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇲🇹 [mt](../../../mt/docs/reference/CLI-TOOLS.md) · 🇲🇲 [my](../../../my/docs/reference/CLI-TOOLS.md) · 🇳🇵 [ne](../../../ne/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇮🇳 [or](../../../or/docs/reference/CLI-TOOLS.md) · 🇮🇳 [pa](../../../pa/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇱🇰 [si](../../../si/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇮 [sl](../../../sl/docs/reference/CLI-TOOLS.md) · 🇷🇸 [sr](../../../sr/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇺🇿 [uz](../../../uz/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇳🇬 [yo](../../../yo/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md)

---

最後更新: 2026-08-23

OmniRoute與分佈在三個專用儀表板頁面上的三類CLI工具整合：

| 頁          | 路線                    | 概念                                                             | 數數         |
| ----------- | ----------------------- | ---------------------------------------------------------------- | ------------ |
| **CLI代碼** | `/dashboard/cli-code`   | 你指向OmniRoute的編碼工具（Client → CLI → OmniRoute → Provider） | 26           |
| **CLI代理** | `/dashboard/cli-agents` | 您指向OmniRoute自治代理（相同流程，範圍更廣）                    | 11           |
| **ACP代理** | `/dashboard/acp-agents` | CLIs ， OmniRoute透過stdio/ACP作為後端產生（反向流）             | 請參閱註冊表 |

舊路由透過 308 重定向： `/dashboard/cli-tools` → `/dashboard/cli-code`、 `/dashboard/agents` → `/dashboard/acp-agents`。

---

## 運作方式

```
CLI 程式碼／CLI 代理程式（使用流程）：
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  （全部指向 OmniRoute）
    http://YOUR_SERVER:20128/v1
           │
           ▼  （OmniRoute 會將請求路由至正確的提供者）
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP 代理程式（反向產生流程）：
    用戶端請求 → OmniRoute → 透過 stdio/ACP 產生 CLI → 回應
```

**優點：**

- 使用一組 API 金鑰管理所有工具
- 在儀表板中追蹤所有 CLI 的成本
- 切換模型時無須重新設定每個工具
- 可在本機及遠端伺服器上運作（VPS、Docker、Akamai、Cloudflare Tunnel）

---

## 使用`setup-*`自動配置

您不必手動編寫每個工具的配置。 OmniRoute為每個受支援的CLI提供一個`setup-*`命令，該命令讀取**居住**從正在運行的OmniRoute （本地或遠端）中取得模型目錄，並將該工具自己的配置寫入您的電腦：

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive        omniroute setup-zed
omniroute setup-whycodes
```

每個都接受`--remote <url> --api-key <key>` （針對遠端OmniRoute配置本機工具）、 `--dry-run` （無需編寫即可預覽）和`--port`。沒有模型自動發現的工具（Cline、 Kilo、 Roo、 Goose、 Aider、 Qwen、 5dive、 WhyCodes）採用`--model <id>` （以及用於非互動式運行的`--yes` ）。 `setup-5dive`是不在`$HOME`下編寫的配方：它透過在艦隊主機上寫入 root 擁有的身份驗證設定檔來配置 5dive 代理艦隊，因此它透過`sudo`重新執行，並且沒有自己的遠端模式。要在註入正確的環境且根本不編寫配置的情況下啟動CLI ，請使用通用`omniroute run <target>`啟動器（claude、codex、aider、goose、opencode、qwen、gemini、whycodes - 目標和別名來自`bin/cli/cli-manifest.mjs`）；舊版每個工具啟動器`omniroute launch` （Claude代碼）和`omniroute launch-codex` Codex可用。 Gemini CLI僅啟動：它是`omniroute run`目標，但沒有`setup-*`/`configure`配方。

> **完整參考：**主表——每個命令寫入的內容、每個標誌、本地與遠端以及哪些工具需要`/v1`後綴——位於**[CLI集成](../guides/CLI-INTEGRATIONS.md)**。

### 在容器內運行它們

在OmniRoute容器內執行的`setup-*`指令會寫入容器自己的 home，主機CLI不會讀取該 home，而這個指令會隨容器一起消失。 OmniRoute偵測到這一點並使用指令而不是寫入退出`2` 。有兩種支援的方法 — 在主機上安裝CLI ，在容器上安裝`omniroute connect` ，或綁定掛載設定目錄並設定`CLI_CONFIG_HOME` （撰寫`host`設定檔）。每個`setup-*`命令，加上`omniroute configure`和`omniroute config set`，在配置容器自己的CLIs時接受`--allow-container-write`是您實際的意思； `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`對伺服器做同樣的事情。請參閱[Docker指南→配置主機CLI工具](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)。

儀表板的**應用端點**(`POST /api/cli-tools/apply`) 強制執行相同的保護：在容器中，目標未從主機答案綁定安裝的寫入**`422`**使用`containerEphemeralTarget: true`，安全錯誤文字，以及 - 對於具有主機配方的工具（claude、codex、opencode、cline、kilo、 continue） - 在主機上運行的`hostSetupCommand` （例如`omniroute setup-opencode`）；什麼也沒寫。 `dryRun: true`繼續在容器模式下工作，並傳回經過編輯的預覽+目標路徑，而無需接觸磁碟。預覽內容不是要複製或匯入的帶有憑證的配置。應用主機上的原始tool/base URL/API key/model輸入，或使用指示的主機端設定指令。請參閱預覽標頭和請求合約的[CLI配置安全性](../security/CLI-CONFIGURATION.md)。這種行為是故意的，並且由`tests/unit/api/cli-tools/apply-container-guard.test.ts`進行回歸保護——永遠不要透過刪除保護來「修復」422。

---

## 真實來源

統一目錄位於 `src/shared/constants/cliTools.ts`，其定義為 `CLI_TOOLS: Record<string, CliCatalogEntry>`。

每個項目都包含以下欄位（定義於 `src/shared/schemas/cliCatalog.ts`）：

| 欄位                                            | 類型                                                         | 說明                                             |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| `category`                                      | `"code" \| "agent"`                                          | 工具顯示於哪個頁面                               |
| `vendor`                                        | `string`                                                     | 工具來源（「Anthropic」、「OSS (P. Gauthier)」） |
| `acpSpawnable`                                  | `boolean`                                                    | 是否也可作為 ACP Agent 使用（顯示徽章）          |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | 自訂端點支援等級。`"none"` = MITM 待辦清單       |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | 設定機制                                         |
| `id`, `name`, `color`, `description`, `docsUrl` | 標準                                                         | 核心顯示欄位                                     |

具有 `baseUrlSupport: "none"` 的項目**不會顯示**於儀表板頁面中——它們已登錄至計畫 11 的 MITM 待辦清單（請參閱 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`）。

### 能力層級（已收錄 × 可偵測 × 可設定 × 可啟動）

並非每個已收錄的工具都可偵測、可設定或可啟動。每個層級都有一個
宣告來源，並由差異測試確保它們保持一致：

| 層級       | 含義                                                         | 宣告位置                                                        |
| ---------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| **已收錄** | 顯示於儀表板目錄中（名稱、提供者、文件、設定類型）           | `src/shared/constants/cliTools.ts`（`CLI_TOOLS`）               |
| **可偵測** | 二進位檔／設定偵測、健康狀態檢查、設定路徑                   | `src/shared/services/cliRuntime.ts`（`CLI_TOOLS` 執行階段目錄） |
| **可設定** | 受 `omniroute configure <cli>` 支援（已有設定程序）          | `bin/cli/cli-manifest.mjs`（`configure: true`）                 |
| **可啟動** | 受 `omniroute run <target>` 支援（已定義環境變數／引數注入） | `bin/cli/cli-manifest.mjs`（`run: true`）                       |

`bin/cli/cli-manifest.mjs` 是 CLI 命令介面的規範可執行資訊清單：
`run`、`configure` 與 shell 自動完成產生器皆從中衍生其
目標清單、別名解析（例如 `kilocode`/`kilo-code`/`kilo_cli` → `kilo`）
以及 `--model` 旗標的連接方式。差異防護測試
`tests/unit/cli/cli-manifest-drift.test.ts` 會確認資訊清單、執行階段
目錄、UI 目錄及所有使用端介面保持同步——若僅在其中一個介面新增
目標而未同步至其他介面，測試套件便會失敗，而非讓差異悄然產生。

---

## 1. CLI代碼目錄（27個工具）

`/dashboard/cli-code`中出現的所有工具。那些帶有`baseUrlSupport: none`連接通過MITM或手動指南而不是自訂基礎URL：

| ID           | 姓名                 | 小販                  | 基本Url支持 | 配置類型     | acp可生成 |
| ------------ | -------------------- | --------------------- | ----------- | ------------ | --------- |
| 克勞德       | Claude代碼           | Anthropic             | 滿的        | 環境         | 真的      |
| 法典         | OpenAI Codex CLI     | OpenAI                | 滿的        | 風俗         | 真的      |
| 零碼         | ZCode（GLM編碼計劃） | 愛                    | 沒有任何    | 風俗         | 錯誤的    |
| 克萊因       | Cline                | OSS （前克勞德·戴夫） | 滿的        | 風俗         | 真的      |
| 公斤         | 基洛程式碼           | 基洛組織              | 滿的        | 風俗         | 錯誤的    |
| 袋鼠         | 袋鼠程式碼           | 袋鼠 (OSS)            | 滿的        | 指導         | 錯誤的    |
| 繼續         | 繼續                 | 繼續.dev              | 滿的        | 指導         | 錯誤的    |
| 助理         | 艾德爾               | OSS （P.高蒂爾）      | 滿的        | 指導         | 真的      |
| 鍛造         | ForgeCode            | HQ                    | 滿的        | 風俗         | 真的      |
| 程式碼       | 程式碼               | 1傑黃 (OSS)           | 滿的        | 風俗         | 錯誤的    |
| 深度搜尋-tui | DeepSeek TUI         | 獵人弓 (OSS)          | 滿的        | 風俗         | 錯誤的    |
| 碼鯨         | CodeWhale            | 赫姆本 (OSS)          | 滿的        | 風俗         | 錯誤的    |
| 開放程式碼   | OpenCode             | 異常（前 SST）        | 滿的        | 指導         | 真的      |
| 機器人       | 工廠機器人           | 工廠AI                | 部分的      | 指導         | 錯誤的    |
| 副駕駛       | GitHub Copilot CLI   | GitHub/MS             | 滿的        | 風俗         | 錯誤的    |
| 遊標 CLI     | Cursor CLI           | 任何領域              | 部分的      | 指導         | 真的      |
| 冶煉         | 冶煉                 | 倫納德塞爾 (OSS)      | 滿的        | 風俗         | 錯誤的    |
| 圓周率       | Pi（pi 編碼代理）    | M.澤克納（OSS）       | 滿的        | 風俗         | 錯誤的    |
| 格羅克構建   | Grok構建             | 人工智慧              | 滿的        | 風俗         | 錯誤的    |
| 壓碎         | 壓碎                 | OSS （魅力）          | 滿的        | 風俗         | 錯誤的    |
| 麴           | Qwen代碼             | Alibaba               | 滿的        | 指導         | 真的      |
| 澤德         | Zed                  | Zed實業               | 滿的        | 指導         | 錯誤的    |
| 游標         | Cursor               | 任何領域              | 沒有任何    | 指導         | 錯誤的    |
| 反重力       | Antigravity          | Google                | 沒有任何    | 中間人       | 錯誤的    |
| 愛馬仕       | 赫爾墨斯             | 諾斯研究              | 沒有任何    | 指導         | 錯誤的    |
| 基羅         | Kiro AI              | Amazon                | 沒有任何    | 中間人       | 錯誤的    |
| 風俗         | 客製化CLI            | —                     | 滿的        | 客製化建造者 | 錯誤的    |

使用`baseUrlSupport: "partial"`的工具會在儀表闆卡中顯示徽章「⚠ Base URL parcial」。
---

## CLI代理目錄（11個工具）

`/dashboard/cli-agents`中出現的自主代理：

| ID         | 姓名         | 小販                 | 基本Url支持 | acp可生成 |
| ---------- | ------------ | -------------------- | ----------- | --------- |
| 愛馬仕代理 | 愛馬仕代理   | 諾斯研究             | 滿的        | 錯誤的    |
| 開爪       | OpenClaw     | OSS （P.斯坦伯格）   | 滿的        | 真的      |
| 鵝         | 鵝           | 區塊 / Linux基金會   | 滿的        | 真的      |
| 口譯員     | 打開解釋器   | OSS                  | 滿的        | 真的      |
| 經         | Warp AI      | Warp公司             | 部分的      | 真的      |
| 代理平台   | 特工套牌     | 阿什什戈普拉尼 (OSS) | 滿的        | 錯誤的    |
| 奧普       | 喔我的圓周率 | OSS                  | 滿的        | 真的      |
| 萊塔       | 萊塔CLI      | 萊塔                 | 滿的        | 錯誤的    |
| 主要代理人 | 首席經紀人   | 原始智力 (OSS)       | 滿的        | 錯誤的    |
| 5次潛水    | 5次潛水      | OSS (5dive-ai)       | 滿的        | 錯誤的    |
| 原因碼     | WhyCodes     | 為什麼選擇公司       | 滿的        | 錯誤的    |

---

## 3. ACP 代理（/dashboard/acp-agents）

此頁面（從 `/dashboard/agents` 重新命名）顯示 OmniRoute 可透過 stdio/ACP 通訊協定作為後端執行引擎**啟動**的 CLI。此目錄在 `src/lib/acp/registry.ts` 中獨立維護，與 `CLI_TOOLS` **並不**相同。

---

## 4. MITM 待辦清單（未顯示於儀表板中）

下列 CLI 原生不支援自訂基礎 URL，因此**不會列於** CLI Code 或 CLI Agents 頁面中。它們是計畫 11 中進行 MITM 攔截的候選項目：

| CLI                 | 原因                                         |
| ------------------- | -------------------------------------------- |
| windsurf            | BYOK 僅限於特定 Claude 模型以及企業 URL/權杖 |
| amp                 | 封閉式生態系統（Sourcegraph）                |
| amazon-q / kiro-cli | AWS SSO 驗證，不支援自訂 URL                 |
| cowork              | Anthropic Desktop，無法設定端點              |

如需完整交叉參照，請參閱 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`。

---

## 5. 批次偵測 API

所有工具的偵測均透過單一端點彙整：

**`GET /api/cli-tools/all-statuses`**

- 驗證：`requireCliToolsAuth(request)`（與其他 `/api/cli-tools/` 路由相同）
- 傳回：`Record<toolId, ToolBatchStatus>`（類型：`src/shared/types/cliBatchStatus.ts`）
- 策略：對所有工具使用 `Promise.all`，每個工具的逾時時間為 5 秒
- 快取：以設定檔 `mtime` 為索引的記憶體內 LRU。當 mtime 變更時，快取即失效。伺服器重新啟動時重設。

每個工具的回應結構：

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // 已清理，不含堆疊追蹤
}
```

---

## 6. 新工具的設定處理常式

具有 `configType: "custom"` 的新工具會使用專用的設定 API 路由：

| 路由                                        | 工具                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode（--base-url 旗標）                                         |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI（OPENAI_BASE_URL，舊版）                            |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale（OPENAI_BASE_URL，主要設定 + 舊版 `~/.deepseek` 同步） |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi 程式設計代理                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build（~/.grok/config.toml、`[model.omniroute]`）           |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code（`~/.qwen/settings.json` + 專用 `.env` 金鑰）          |

所有路由皆使用 `sanitizeErrorMessage()` 產生錯誤回應（硬性規則 #12）。

---

## 7. 儀表板頁面架構

### CLI Code（`/dashboard/cli-code`）

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — 伺服器元件
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — 用戶端網格
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — 工具詳細資訊頁面
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 個專用工具卡片 + `ToolDetailClient.tsx`

### CLI 代理（`/dashboard/cli-agents`）

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — 伺服器元件
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — 用戶端網格
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — 重複使用 `ToolDetailClient`

### ACP 代理（`/dashboard/acp-agents`）

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — 伺服器元件（從 `agents/` 移入）

### 共用 UI 元件（`src/shared/components/cli/`）

| 檔案                    | 用途                               |
| ----------------------- | ---------------------------------- |
| `CliToolCard.tsx`       | 智慧狀態卡片（偵測 + 設定 + 端點） |
| `CliConceptCard.tsx`    | 各頁面的概念說明卡片               |
| `CliComparisonCard.tsx` | 跨 CLI 類型的三欄比較              |
| `BaseUrlSelect.tsx`     | 端點下拉式選單（本機／雲端／自訂） |
| `ApiKeySelect.tsx`      | API 金鑰選擇器                     |
| `ManualConfigModal.tsx` | 可複製的設定片段互動視窗           |

### 共用 Hook（`src/shared/hooks/cli/`）

| 檔案                      | 用途                                                       |
| ------------------------- | ---------------------------------------------------------- |
| `useToolBatchStatuses.ts` | 擷取 `/api/cli-tools/all-statuses`，管理載入／重新整理狀態 |

---

## 8. i18n

計畫 14 F9 中新增了以下命名空間：

| 命名空間    | 用途                                                   |
| ----------- | ------------------------------------------------------ |
| `cliCommon` | 共用字串（卡片標籤、概念／比較文字、詳細資料頁面標籤） |
| `cliCode`   | CLI Code 頁面的字串                                    |
| `cliAgents` | CLI Agents 頁面的字串                                  |
| `acpAgents` | ACP Agents 頁面的字串                                  |

已提供完整的 PT-BR 與 EN 翻譯。其他 39 個語系會透過 `src/i18n/request.ts` 中的命名空間層級合併，自動回退至 EN。

---

## 9. 快速開始

### 步驟 1 — 取得 OmniRoute API 金鑰

1. 開啟 `/dashboard/api-manager` → **建立 API 金鑰**
2. 為其命名（例如 `cli-tools`）並選取所有權限
3. 複製金鑰 — 下方每個 CLI 都會用到它

> 您的金鑰格式如下：`sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 步驟 2 — 安裝 CLI 工具

所有基於 npm 的工具都需要 Node.js 22.22.2+ 或 24.x：

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI（可透過 `omniroute run gemini` 啟動 → /v1beta 介面）
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # 基於 Rust

# Pi 程式設計代理
# 安裝方式請參閱 https://github.com/zechnerj/pi-coding-agent

# jcode
# 安裝方式請參閱 https://github.com/1jehuang/jcode
```

---

### 步驟 3 — 透過儀表板設定

1. 前往 `http://localhost:20128/dashboard/cli-code`
2. 在工具網格中找到您的工具
3. 按一下卡片以開啟工具詳細資料頁面
4. 選取您的 API 金鑰與基礎 URL
5. 按一下 **套用設定**，或複製手動設定片段

---

### 步驟 4 — 設定全域環境變數

```bash
# OmniRoute 通用端點
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI 會從根路徑讀取 GOOGLE_GEMINI_BASE_URL（其 SDK 會自行附加 /v1beta/...）
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> 若使用**遠端伺服器**，請將 `localhost:20128` 替換為伺服器 IP 或網域，
> 例如 `http://<your-server-ip>:20128`。

---

### 步驟 4 — 設定各項工具

#### Claude Code

```bash
# 建立 ~/.claude/settings.json：
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Code 請使用統一的 Anthropic 閘道根路徑。請勿在此附加 `/v1`。

**測試：** `claude "say hello"`

---

#### OpenAI Codex

新版 Codex (v0.137+) 僅讀取 `~/.codex/config.toml` — 舊版
`config.yaml` 屬於舊有的 npm CLI，且會被直接忽略而不顯示任何提示。API
金鑰應保留在 `OMNIROUTE_API_KEY` 環境變數（`env_key`）中，絕不要
寫入檔案內：

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

完整參考資料（設定檔、`wire_api`、內容視窗）：[CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md)。

**測試：** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**測試：** `opencode`

> 使用 `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> 來傳送思考變體。

---

#### Cline（CLI 或 VS Code）

**CLI 模式：**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code 模式：**
Cline 擴充功能設定 → API 提供者：`OpenAI Compatible` → 基礎 URL：`http://localhost:20128/v1`

或者使用 OmniRoute 儀表板 → **CLI 工具 → Cline → 套用設定**。

---

#### KiloCode（CLI 或 VS Code）

**CLI 模式：**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code 設定：**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

或者使用 OmniRoute 儀表板 → **CLI 工具 → KiloCode → 套用設定**。

---

#### Continue（VS Code 擴充功能）

編輯 `~/.continue/config.yaml`：

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

編輯後請重新啟動 VS Code。

---

#### VS Code Insiders (`chatLanguageModels.json`)

當 VS Code Insiders 已設定自訂端點模型，而您希望 OmniRoute 無需自訂標頭欄位即可運作時，請使用此方式。

**建議位置：**

- Linux：`~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows：`%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**使用權杖化 OmniRoute 別名的範例：**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**注意事項：**

- 將 `sk-your-omniroute-key` 替換為在 OmniRoute 中建立的 API 金鑰。
- `url` 欄位應指向 `/api/v1/vscode/{token}/chat/completions`。
- `modelsUrl` 欄位應指向 `/api/v1/vscode/{token}/models`。
- 當用戶端支援自訂標頭時，建議優先使用一般的 `/v1` + Bearer 標頭流程。
- 內嵌於 URL 的權杖是相容性備援方案，且可能會出現在編輯器日誌或代理伺服器歷程記錄中。

---

#### Kiro CLI (Amazon)

```bash
# 登入您的 AWS/Kiro 帳戶：
kiro-cli login

# 此 CLI 使用其自身的驗證機制——Kiro CLI 本身不需要使用 OmniRoute 作為後端。
# 其他工具則可搭配 OmniRoute 使用 kiro-cli。
kiro-cli status
```

若使用 **Kiro IDE** 桌面應用程式，請使用 OmniRoute 所公開的 MITM 端點，
其位置在 `/dashboard/cli-tools → Kiro`。

---

## 10. 內部 OmniRoute CLI

`omniroute` 二進位檔提供伺服器生命週期、設定、診斷及提供者管理等指令。進入點：`bin/omniroute.mjs`。

```bash
omniroute                              # 啟動伺服器（預設連接埠為 20128）
omniroute setup                        # 互動式設定精靈
omniroute doctor                       # 檢查設定、資料庫、連接埠及執行環境
omniroute providers list               # 已設定的提供者連線
omniroute providers test-all           # 測試每個使用中的連線
omniroute reset-password               # 重設管理員密碼
omniroute logs                         # 串流顯示請求日誌
omniroute health                       # 詳細健康狀態（斷路器、快取、記憶體）
omniroute --version                    # 輸出版本
omniroute --help                       # 顯示所有指令
```

### 設定與初始化

```bash
omniroute setup                        # 互動式設定精靈
omniroute setup --non-interactive      # CI／自動化模式（讀取環境變數與旗標）
omniroute setup --password '<value>'   # 直接設定管理員密碼
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # 一次完成新增及測試提供者
```

非互動式設定可辨識的環境變數：

| 變數                | 用途                                                          |
| ------------------- | ------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | 提供者 API 金鑰（透過 Commander `.env()` 繫結至 `--api-key`） |
| `DATA_DIR`          | 覆寫 OmniRoute 資料目錄                                       |

所有其他非互動式輸入都透過旗標傳遞，而非環境變數：
`--password`、`--provider`、`--provider-name`、`--provider-base-url`、`--default-model`
（請參閱上方的 `omniroute setup` 選項）。

### 診斷

```bash
omniroute doctor                       # 檢查設定、資料庫、連接埠、執行環境、記憶體及存活狀態
omniroute doctor --json                # 機器可讀的 JSON
omniroute doctor --no-liveness         # 略過 HTTP 健康狀態探測
omniroute doctor --host 0.0.0.0        # 覆寫存活狀態主機
omniroute doctor --liveness-url <url>  # 覆寫完整的健康狀態端點 URL
```

doctor 會執行下列檢查：`設定`、`資料庫`、`儲存空間／加密`、
`連接埠可用性`、`Node 執行環境`、`原生二進位檔`（better-sqlite3）、
`記憶體`及`伺服器存活狀態`。若任何檢查結果為 `fail`，程式將以非零狀態碼結束。

### 提供者管理

```bash
omniroute providers available                       # OmniRoute 提供者目錄
omniroute providers available --search openai       # 依 ID／名稱／別名／類別篩選目錄
omniroute providers available --category api-key    # 依類別篩選（api-key、oauth、free、...）
omniroute providers available --json                # 機器可讀的 JSON

omniroute providers list                            # 已設定的提供者連線
omniroute providers list --json

omniroute providers test <id|name>                  # 測試一個已設定的連線
omniroute providers test-all                        # 測試每個使用中的連線
omniroute providers validate                        # 僅限本機的結構驗證
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # 現有的 OAuth 流程
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` 採 API 優先，因此會針對
使用中的本機或遠端情境運作。憑證輸入應使用
`--credential-stdin` 或 `--credential-env`；`--dry-run --json` 僅會回報
經遮蔽處理的存在狀態／結構。`providers available` 會讀取 OmniRoute 目錄；
`providers list/test/test-all/validate` 則保留其本機 SQLite 行為，
不需要啟動伺服器。

對於自訂的 OpenAI 相容或 Anthropic 相容節點，請使用 `omniroute nodes add`
傳回的節點 ID 附加憑證，指令為 `omniroute keys add "$NODE_ID" --stdin`。
這需要伺服器正在執行，且使用中的情境必須具備管理驗證。
CLI 使用 `POST /api/providers`，此端點會驗證節點，並將其端點
設定複製到連線中。若缺少節點、授權失敗或伺服器無法使用，
則會傳回錯誤，而不會建立本機備援憑證。

`nodes add --base-url` 會設定節點端點；此位址不同於
`OMNIROUTE_BASE_URL` 中的伺服器位址。若要處理 OpenAPI 檔案，請使用
`omniroute openapi dump --format json --out ./openapi.json`；全域 `--output`
用於選擇 CLI 顯示格式，而不是目的地檔名。

### 復原與重設

```bash
omniroute reset-password                # 重設管理員密碼（亦可使用：omniroute-reset-password）
omniroute reset-encrypted-columns       # 顯示警告，並對加密憑證重設進行試執行
omniroute reset-encrypted-columns --force  # 實際將 SQLite 中的加密憑證設為 null
```

### 憑證匯出（⚠ 請謹慎處理）

```bash
omniroute auth export                                 # 顯示警告與確認關卡——不存取資料庫
omniroute auth export --force                          # 將所有連線的已解密憑證以 JSON 格式匯出至 stdout
omniroute auth export --force --id <id>                 # 僅匯出相符的連線
omniroute auth export --force --format env               # 輸出 OMNIROUTE_<PROVIDER>_<FIELD>=<value> 格式的行
omniroute auth export --force --out creds.json           # 寫入檔案（以 0600 權限建立）
```

`auth export` **僅限本機使用**（直接讀取 SQLite，不經由 HTTP 路由），且會刻意列印／寫入
**明文** `apiKey`/`accessToken`/`refreshToken`/`idToken` 值——這是功能，而不是
錯誤。若未指定 `--force`，則不會從資料庫讀取任何內容，也不會解密任何內容。在輸出任何明文之前，
一律會先將警告橫幅列印至 stderr。必須設定 `STORAGE_ENCRYPTION_KEY`。
若某個欄位解密失敗（例如金鑰過期或密文損毀），則會回報為
`<field>DecryptFailed: true`，而不會中止整個匯出作業或洩漏底層錯誤。

### 其他子命令

除非另有註明，否則這些命令皆假設 OmniRoute 伺服器正在執行：

```bash
omniroute status                       # 完整的執行階段狀態
omniroute logs                         # 串流請求日誌（--json、--search、--follow）
omniroute config list                  # 顯示已設定的 CLI 工具

omniroute provider list                # 列出可用的提供者（providers list 的別名）
omniroute provider add                 # 將 OmniRoute 註冊為工具的提供者
omniroute keys add | list | remove     # 管理 API 金鑰
omniroute models [provider]            # 列出模型（--json、--search）
omniroute combo list | switch | create | delete

omniroute backup                       # 建立設定與資料庫的快照
omniroute restore                      # 從先前的快照還原

omniroute health                       # 詳細的健康狀態（斷路器、快取、記憶體）
omniroute quota                        # 提供者配額用量
omniroute cache                        # 快取狀態
omniroute cache clear                  # 清除語意與簽章快取

omniroute mcp status | restart         # MCP 伺服器狀態／重新啟動
omniroute a2a status | card            # A2A 伺服器狀態／代理程式卡片

omniroute tunnel list | create | stop  # 管理通道（cloudflare/tailscale/ngrok）
omniroute env show | get <k> | set <k> <v>  # 檢視／設定環境變數（暫時）

omniroute test                         # 提供者連線能力冒煙測試
omniroute update                       # 檢查更新
omniroute completion                   # 產生 shell 自動補全
```

### 常用旗標

| 旗標                | 說明                                            |
| ------------------- | ----------------------------------------------- |
| `--no-open`         | 啟動時不自動開啟瀏覽器                          |
| `--port <n>`        | 覆寫 API 連接埠（預設為 20128）                 |
| `--mcp`             | 透過 stdio 以 MCP 伺服器模式執行（供 IDE 使用） |
| `--non-interactive` | CI 模式（不顯示提示；從環境變數／旗標讀取）     |
| `--json`            | 機器可讀的 JSON 輸出（doctor、providers 等）    |
| `--help`, `-h`      | 顯示命令專屬說明                                |
| `--version`, `-v`   | 列印已安裝的版本                                |

---

## 可用的 API 端點

| 端點                       | 說明                         | 用途                      |
| -------------------------- | ---------------------------- | ------------------------- |
| `/v1/chat/completions`     | 標準聊天（所有提供者）       | 所有現代工具              |
| `/v1/responses`            | Responses API（OpenAI 格式） | Codex、代理式工作流程     |
| `/v1/completions`          | 舊版文字補全                 | 使用 `prompt:` 的舊版工具 |
| `/v1/embeddings`           | 文字嵌入                     | RAG、搜尋                 |
| `/v1/images/generations`   | 圖像生成                     | GPT-Image、Flux 等        |
| `/v1/audio/speech`         | 文字轉語音                   | ElevenLabs、OpenAI TTS    |
| `/v1/audio/transcriptions` | 語音轉文字                   | Deepgram、AssemblyAI      |

以下為可直接貼上的範例，其中包含已權杖化的 OmniRoute URL：

```txt
權杖範例：sk-a3ab3c080beaee3a-69f4a4-070d71af

標準 OpenAI 基底位址：http://localhost:20128/v1
VS Code 模型：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code 聊天：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama 標籤：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama 聊天：http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## 疑難排解

| 錯誤                             | 原因                  | 修正方式                                     |
| -------------------------------- | --------------------- | -------------------------------------------- |
| `Connection refused`             | OmniRoute 未執行      | `omniroute serve`                            |
| `401 Unauthorized`               | API 金鑰錯誤          | 在 `/dashboard/api-manager` 中檢查           |
| `No combo configured`            | 沒有作用中的路由組合  | 在 `/dashboard/combos` 中設定                |
| CLI 顯示「not installed」        | 二進位檔不在 PATH 中  | 檢查 `which <command>`                       |
| 安裝後儀表板顯示「not detected」 | 快取已過期            | 在儀表板中按一下「⟳ Refresh detection」      |
| 舊連結 `/dashboard/cli-tools`    | v3.8.6 之前版本的書籤 | 自動重新導向至 `/dashboard/cli-code` (308)   |
| 舊連結 `/dashboard/agents`       | v3.8.6 之前版本的書籤 | 自動重新導向至 `/dashboard/acp-agents` (308) |

## 使用 OmniRoute CLI 管理推論金鑰政策

使用已驗證的管理環境（請參閱[遠端模式](../guides/REMOTE-MODE.md)），
依照現有推論金鑰的 ID 檢視或更新該金鑰：

```bash
omniroute --output json keys policy show KEY_ID
omniroute keys policy set KEY_ID --unrestricted
omniroute --output json keys policy show KEY_ID
```

`--unrestricted` 是 `--model-access-mode all` 的別名。此更新會清除
模型允許清單。它會保留範圍、連線規則、封鎖的模型、速率限制
及成本限制，因此這些其他控制措施仍可能拒絕請求。明確指定
`--allowed-models ""` 也會選取 `all`；將其與
`--model-access-mode restricted` 結合使用，可維持受限制的金鑰且不允許任何模型。
除非明確指定，否則以逗號分隔的非空白清單會選取 `restricted`。
在傳送請求之前，互相矛盾的 `all` 與非空白允許清單組合會遭到拒絕。

`--rate-limit 30` 會設定每分鐘的請求數，並保留其他時間
區間的規則。`--max-cost 5` 會啟用每日美元上限，而不變更每週上限；
`--max-cost 0` 會移除每日上限，並保留現有的用量限制切換狀態
及每週上限。省略的政策欄位會維持不變。速率變更會先讀取
目前的政策；請避免同時編輯同一金鑰的速率限制陣列。

政策命令會使用已驗證的 `GET`/`PATCH /api/keys/{id}`，並遵循作用中的
環境及全域 `--api-key` 選項。JSON 輸出僅包含政策欄位，
不包含儲存的金鑰或其遮罩表示形式。僅限推論的認證
無法授權管理變更。遇到 401/403 時，必須檢查管理
認證與環境；這並不表示本機 CLI 權杖或 salt 發生故障。
如需瞭解獨立的本機驗證合約，請參閱 [CLI 權杖](../security/CLI_TOKEN.md)。
