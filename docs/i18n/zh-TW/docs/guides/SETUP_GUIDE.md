# 📖 Setup Guide — OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute 的完整設定參考。如需快速版本，請參閱 [README 中的快速入門](../README.md#-quick-start)。

## 目錄

- [安裝方式](#install-methods)
- [CLI 工具設定](#cli-tool-configuration)
- [通訊協定設定（MCP + A2A）](#protocol-setup-mcp--a2a)
- [逾時設定](#timeout-configuration)
- [分離連接埠模式](#split-port-mode)
- [Void Linux（xbps-src）](#void-linux-xbps-src-template)
- [解除安裝](#uninstalling)

---

## 安裝方法

### npm（推薦）

```bash
npm install -g omniroute
omniroute
```

儀表板在`http://localhost:20128`和API處打開，基礎URL是`http://localhost:20128/v1`。

> **npm 用戶：**如果 npm 警告安裝腳本被封鎖（例如`omniroute`、 `better-sqlite3`），請參閱[排除— npm install-scripts 阻塞故障](./TROUBLESHOOTING.md#npm-install-scripts-blocked-warning-global-install)。

### PNPM

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **PNPM 使用者：**需要`--allow-build`標誌才能啟用`better-sqlite3`和`@swc/core`的本機構建腳本。 pnpm v11 上的全域安裝不支援`pnpm approve-builds -g`指令。

### 拱門Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR軟體包](https://aur.archlinux.org/packages/omniroute-bin)安裝OmniRoute並提供 systemd 用戶服務。

### 從源頭

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows註：**預設情況下，當舊的`%USERPROFILE%\.omniroute`目錄不存在時， OmniRoute使用`%APPDATA%\omniroute` 。設定`DATA_DIR`以選擇不同的資料目錄位置。

> **筆記：** `npm install`在第一次運行時自動從`.env.example`產生`.env` 。後續安裝不會覆蓋現有的`.env`，因此自訂內容將被保留。若要重新播種，請在重新執行之前刪除`.env` 。

### Docker

請參閱[Docker指南](./DOCKER_GUIDE.md)，以了解完整的Docker設置，包括 Compose 設定檔和 Caddy HTTPS。

### 桌面應用程式（Electron）

OmniRoute提供了一個基於Electron 41 + electro-builder 26.10 建構的桌麵包裝器。可用腳本（工作空間根目錄）：

```bash
npm run electron:dev          # Run desktop with hot-reload
npm run electron:build        # Build for current OS (auto-detected)
npm run electron:build:win    # Windows installer (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Smoke-test packaged build
```

桌面安裝程式的版本附加到GitHub版本。有關完整的Electron深入研究（簽名、 IPC橋、發行版），請參閱[`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(criado em faseterior)_。

### 無頭伺服器（CI/automation）

對於無人值守設定（Docker、 Kubernetes 、 CI），請使用：

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

與環境變數（`INITIAL_PASSWORD`、 `OMNIROUTE_WS_BRIDGE_SECRET`等）結合，這使您可以啟動完全可編寫腳本的OmniRoute實例。

### CLI選項

| 命令                    | 描述                                                   |
| ----------------------- | ------------------------------------------------------ |
| `omniroute`             | 啟動伺服器（`PORT=20128`、 API和儀表板位於同一連接埠） |
| `omniroute setup`       | 指導CLI入門，了解密碼和第一個提供者                    |
| `omniroute doctor`      | 無需啟動伺服器即可運行本地健康檢查                     |
| `omniroute providers`   | 發現、列出、驗證和測試CLI的提供者                      |
| `omniroute config`      | CLI工具配置—清單、取得、設定、驗證配置                 |
| `omniroute status`      | 離線狀態儀表板—版本、 DB、工具、配置                   |
| `omniroute logs`        | 來自API的流使用日誌（支援`--follow`）                  |
| `omniroute update`      | 檢查或套用OmniRoute更新                                |
| `omniroute provider`    | 管理提供者連接—新增、清單、刪除、測試、預設            |
| `omniroute --port 3000` | 將canonical/API埠設定為3000                            |
| `omniroute --mcp`       | 啟動MCP伺服器（stdio 傳輸）                            |
| `omniroute --no-open`   | 不要自動開啟瀏覽器                                     |
| `omniroute --help`      | 顯示幫助                                               |

無頭設定可以使用標誌或環境變數編寫腳本：

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

無需打開儀表板即可運行本地診斷：

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

從SSH或腳本管理提供者，無需開啟儀表板：

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## CLI 工具設定

### 1) 連接提供者並建立 API 金鑰

1. 開啟儀表板 → `Providers`，並連接至少一個提供者（OAuth 或 API 金鑰）。
2. 開啟儀表板 → `Endpoints`，並建立一組 API 金鑰。
3. （選用）開啟儀表板 → `Combos`，並設定備援鏈。

### 2) 將程式開發工具指向 OmniRoute

```txt
基礎 URL：http://localhost:20128/v1
API 金鑰：[從 Endpoint 頁面複製]
模型：    if/qwen3.8-max-preview（或任何提供者/模型前綴）
```

如果您的編輯器無法傳送 `Authorization: Bearer ...`，請改用包含權杖的相容性基礎網址：

```txt
基礎 URL：http://localhost:20128/api/v1/vscode/YOUR_KEY/
模型 URL：http://localhost:20128/api/v1/vscode/YOUR_KEY/models
聊天 URL：http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama 標籤 URL：http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

支援 Claude Code、Codex CLI、Cursor、Cline、OpenClaw、OpenCode，以及與 OpenAI 相容的 SDK。

#### 使用 `setup-*` 自動設定

無需手動貼上基礎 URL 和金鑰，讓 OmniRoute 根據即時模型目錄，為每個工具寫入各自的設定。每個工具使用一個命令：

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml 設定檔
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json（與 OpenAI 相容）
omniroute setup-cline        # Cline CLI + VS Code 擴充功能設定
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml（Continue / cn）
omniroute setup-cursor       # 顯示 Cursor 的應用程式內操作步驟
omniroute setup-roo          # Roo Code 匯入 + autoImport 指標
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-zed          # ~/.config/zed/settings.json（openai_compatible）
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

每個命令都接受 `--remote <url> --api-key <key>`，以便將本機工具設定為連接至**遠端** OmniRoute，並可使用 `--dry-run` 預覽。若要注入正確的環境變數來啟動 CLI，且完全不寫入任何設定，請使用通用啟動器 `omniroute run <target>`（claude、codex、aider、goose、opencode、qwen、gemini）；舊版的各工具啟動器 `omniroute launch`（Claude Code）和 `omniroute launch-codex`（Codex）仍然可用。

如需完整表格（每個命令會寫入的內容、所有旗標、本機與遠端的差異，以及基礎 URL 的 `/v1` 慣例），請參閱 **[CLI 整合](./CLI-INTEGRATIONS.md)**。

如需各工具的詳細設定方式（Claude Code、Codex CLI、Cursor、Cline、OpenClaw、Kilo Code、Copilot 等），請參閱專門的 **[CLI 工具指南](../reference/CLI-TOOLS.md)**。

---

## 協定設定 (MCP + A2A)

### MCP設定（模型上下文協定）

以 stdio 模式啟動MCP傳輸：

```bash
omniroute --mcp
```

推薦的驗證流程：

```bash
# 1. Start MCP server
omniroute --mcp

# 2. From your MCP client, call:
omniroute_get_health        # Should return system health
omniroute_list_combos       # Should return active combos

# 3. Or run the full E2E suite:
npm run test:protocols:e2e
```

#### MCP客戶端配置

**Claude代碼：**

Claude程式碼透過HTTP連接， `omniroute --mcp` (stdio) 不會啟動。 HTTP傳輸預設為關閉狀態：首先在正在運行的伺服器上啟用它。當啟用儀表板登入時，沒有憑證的請求會取得`401`，因此傳遞包含`mcp:connect` （或`manage`）的API鑰；沒有`manage`/`admin`金鑰也需要每個工具的範圍（請參閱[MCP伺服器→ MCP工具範圍](../frameworks/MCP-SERVER.md#mcp-tool-scopes)）。

```bash
omniroute mcp enable --transport streamable-http
claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream \
  --header "Authorization: Bearer your-key"
```

**Cursor / Cline:**

新增到您的MCP設定（stdio，帶有金鑰，以便呼叫者擁有主體）：

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {
        "OMNIROUTE_API_KEY": "your-key",
        "OMNIROUTE_BASE_URL": "http://localhost:20128"
      }
    }
  }
}
```

或者，當`mcpTransport`為`streamable-http` （在`/dashboard/mcp`上設定或使用`omniroute mcp enable --transport streamable-http`進行設定）時，將客戶端的遠端MCP伺服器項目指向`http://localhost:20128/api/mcp/stream`。

密鑰作為`Authorization: Bearer <api-key>`傳輸（請參閱[MCP伺服器→遠端主機的遠端存取](../frameworks/MCP-SERVER.md#remote-access-manage-scope-bypass)；遠端密鑰需要`mcp:connect`及其read/write範圍）。

**完整的MCP文件：** [MCP伺服器README](../../open-sse/mcp-server/README.md) — 110 工具、 IDE設定、 Python/TS/Go客戶端。壓縮CCR/dedup工具的操作員參考（標記、先決條件、每個工具範圍、擷取分頁、診斷）：[壓縮引擎→先決條件/操作員指南](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup)。

### A2A設定（代理到代理協定）

驗證代理卡：

```bash
curl http://localhost:20128/.well-known/agent.json
```

發送任務：

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**完整的A2A文件：** [A2A伺服器README](../../src/lib/a2a/README.md) — JSON-RPC 2.0，技能，串流媒體，任務生命週期。

---

## 逾時配置

### 基本超時

對於大多數部署，您只需要這兩個變數：

| 多變的                   | 預設                     | 目的                                                                               |
| ------------------------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                 | 上游回應啟動逾時、隱藏 Undici 逾時、 TLS指紋請求和API橋request/proxy逾時的共用基線 |
| `STREAM_IDLE_TIMEOUT_MS` | 繼承`REQUEST_TIMEOUT_MS` | OmniRoute中止SSE流之前流塊之間的最大間隙                                           |

保留向後相容性：現有的`FETCH_TIMEOUT_MS`、 `API_BRIDGE_PROXY_TIMEOUT_MS`和其他每層逾時變數仍然有效並覆寫共用基線。

### 提供者特定註釋

For Claude Code-compatible upstreams (`anthropic-compatible-cc-*`), OmniRoute derives the outbound `X-Stainless-Timeout` header from the resolved fetch timeout so provider-side read timeouts stay aligned with your env configuration.

對於第三方Claude代碼相容的反向代理， OmniRoute保留預設的`anthropic-beta`設定保守，並且當`Client Cache Control`保留在`Auto`上時，僅轉送客戶端提供的`cache_control`標記。只有當上游特別需要編輯Claude思考流時，才啟用每個連線的「啟用編輯思考 beta」切換。

### 高級超時覆蓋

| 多變的                                   | 預設                                       | 目的                                             |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | 繼承`REQUEST_TIMEOUT_MS`                   | 在回應標頭到達之前使用上游回應啟動逾時           |
| `FETCH_HEADERS_TIMEOUT_MS`               | 繼承`FETCH_TIMEOUT_MS`                     | Undici 接收上游回應標頭的時間限制                |
| `FETCH_BODY_TIMEOUT_MS`                  | 繼承`FETCH_TIMEOUT_MS`                     | 上游主體區塊之間的 Undici 時間限制（`0`停用它）  |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici TCP連接超時                               |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici 空閒保持活動套接字逾時                    |
| `TLS_CLIENT_TIMEOUT_MS`                  | 繼承`FETCH_TIMEOUT_MS`                     | 透過`wreq-js`發出的TLS指紋請求逾時               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | 繼承`REQUEST_TIMEOUT_MS`或`600000`         | `/v1`代理從API連接埠轉送到儀表板連接埠的逾時     |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | API橋接伺服器上的傳入請求逾時                    |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | API橋接伺服器上的傳入標頭逾時                    |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | API橋接伺服器上的保持活動逾時                    |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | API橋接伺服器上的套接字不會活動逾時（`0`禁用它） |

> **筆記：**對於串流請求， `FETCH_TIMEOUT_MS`僅涵蓋連線設定/等待第一個上游回應。一旦流處於活動狀態， OmniRoute將僅在實際停頓 (`STREAM_IDLE_TIMEOUT_MS`) 或 Undici 主體不活動 (`FETCH_BODY_TIMEOUT_MS`) 時中止。

### 反向代理相容性

如果您在 Nginx、Caddy、 Cloudflare或其他反向代理程式後面執行OmniRoute ，請確保代理程式逾時也高於OmniRoute stream/fetch逾時。

---

## 分離連接埠模式

在不同的連接埠上執行 API 與儀表板，適用於進階情境（反向代理、容器網路）：

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API：      http://localhost:20128/v1
# 儀表板：   http://localhost:20129
```

---

## 作廢Linux (xbps-src) 模板

對於 Void Linux用戶，您可以使用`xbps-src`建置原生包。將此區塊儲存為`srcpkgs/omniroute/template`：

```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/cheaper-inference/OmniRoute"
distfiles="https://github.com/cheaper-inference/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Regenerate the checksum for each release with:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/cheaper-inference/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## 解除安裝

| 指令                     | 動作                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| `npm run uninstall`      | 移除系統應用程式，但會在 `~/.omniroute` 中**保留您的資料庫與設定**。 |
| `npm run uninstall:full` | 移除應用程式，並永久**清除所有設定、金鑰及資料庫**。                 |

> 如需各種安裝方式的詳細解除安裝說明，請參閱 [UNINSTALL.md](./UNINSTALL.md)。
