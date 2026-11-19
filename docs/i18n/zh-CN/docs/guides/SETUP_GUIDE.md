# 📖 Setup Guide — OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute 的完整设置参考。如需快速版本，请参阅 [README 中的快速入门](../README.md#-quick-start)。

## 目录

- [安装方式](#install-methods)
- [CLI 工具配置](#cli-tool-configuration)
- [协议设置（MCP + A2A）](#protocol-setup-mcp--a2a)
- [超时配置](#timeout-configuration)
- [分端口模式](#split-port-mode)
- [Void Linux（xbps-src）](#void-linux-xbps-src-template)
- [卸载](#uninstalling)

---

## 安装方法

### npm（推荐）

```bash
npm install -g omniroute
omniroute
```

仪表板在`http://localhost:20128`和API处打开，基础URL是`http://localhost:20128/v1`。

> **npm 用户：**如果 npm 警告安装脚本被阻止（例如`omniroute`、 `better-sqlite3`），请参阅[排除— npm install-scripts 阻塞故障](./TROUBLESHOOTING.md#npm-install-scripts-blocked-warning-global-install)。

### PNPM

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **PNPM 用户：**需要`--allow-build`标志才能启用`better-sqlite3`和`@swc/core`的本机构建脚本。 pnpm v11 上的全局安装不支持`pnpm approve-builds -g`命令。

### 拱门Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR软件包](https://aur.archlinux.org/packages/omniroute-bin)安装OmniRoute并提供 systemd 用户服务。

### 从源头

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows注：**默认情况下，当旧的`%USERPROFILE%\.omniroute`目录不存在时， OmniRoute使用`%APPDATA%\omniroute` 。设置`DATA_DIR`以选择不同的数据目录位置。

> **笔记：** `npm install`在第一次运行时自动从`.env.example`生成`.env` 。后续安装不会覆盖现有的`.env`，因此自定义内容将被保留。要重新播种，请在重新运行之前删除`.env` 。

### Docker

请参阅[Docker指南](./DOCKER_GUIDE.md)，了解完整的Docker设置，包括 Compose 配置文件和 Caddy HTTPS。

### 桌面应用程序（Electron）

OmniRoute提供了一个基于Electron 41 + electro-builder 26.10 构建的桌面包装器。可用脚本（工作空间根目录）：

```bash
npm run electron:dev          # Run desktop with hot-reload
npm run electron:build        # Build for current OS (auto-detected)
npm run electron:build:win    # Windows installer (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Smoke-test packaged build
```

桌面安装程序的版本附加到GitHub版本。有关完整的Electron深入研究（签名、 IPC桥、发行版），请参阅[`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(criado em faseterior)_。

### 无头服务器（CI/automation）

对于无人值守设置（Docker、 Kubernetes 、 CI），请使用：

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

与环境变量（`INITIAL_PASSWORD`、 `OMNIROUTE_WS_BRIDGE_SECRET`等）相结合，这使您可以启动完全可编写脚本的OmniRoute实例。

### CLI选项

| 命令                    | 描述                                                 |
| ----------------------- | ---------------------------------------------------- |
| `omniroute`             | 启动服务器（`PORT=20128`、 API和仪表板位于同一端口） |
| `omniroute setup`       | 指导CLI入门，了解密码和第一个提供者                  |
| `omniroute doctor`      | 无需启动服务器即可运行本地健康检查                   |
| `omniroute providers`   | 发现、列出、验证和测试CLI的提供者                    |
| `omniroute config`      | CLI工具配置—列表、获取、设置、验证配置               |
| `omniroute status`      | 离线状态仪表板—版本、 DB、工具、配置                 |
| `omniroute logs`        | 来自API的流使用日志（支持`--follow`）                |
| `omniroute update`      | 检查或应用OmniRoute更新                              |
| `omniroute provider`    | 管理提供者连接—添加、列表、删除、测试、默认          |
| `omniroute --port 3000` | 将canonical/API端口设置为3000                        |
| `omniroute --mcp`       | 启动MCP服务器（stdio 传输）                          |
| `omniroute --no-open`   | 不要自动打开浏览器                                   |
| `omniroute --help`      | 显示帮助                                             |

无头设置可以使用标志或环境变量编写脚本：

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

无需打开仪表板即可运行本地诊断：

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

从SSH或脚本管理提供者，无需打开仪表板：

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

## CLI 工具配置

### 1) 连接提供者并创建 API 密钥

1. 打开仪表板 → `Providers`，并连接至少一个提供者（OAuth 或 API 密钥）。
2. 打开仪表板 → `Endpoints`，并创建一个 API 密钥。
3. （可选）打开仪表板 → `Combos`，并设置你的回退链。

### 2) 配置你的编码工具

```txt
基础 URL: http://localhost:20128/v1
API 密钥:  [从 Endpoint 页面复制]
模型:      if/qwen3.8-max-preview（或任意提供者/模型前缀）
```

如果你的编辑器无法发送 `Authorization: Bearer ...`，请改用包含令牌的兼容基础地址：

```txt
基础 URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
模型 URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
聊天 URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama 标签 URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

适用于 Claude Code、Codex CLI、Cursor、Cline、OpenClaw、OpenCode 和兼容 OpenAI 的 SDK。

#### 使用 `setup-*` 自动配置

无需手动粘贴基础 URL 和密钥，可让 OmniRoute 根据实时模型目录写入每个工具自己的配置。每个工具使用一条命令：

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml 配置文件
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json（兼容 OpenAI）
omniroute setup-cline        # Cline CLI + VS Code 扩展设置
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml（Continue / cn）
omniroute setup-cursor       # 输出 Cursor 的应用内操作步骤
omniroute setup-roo          # Roo Code 导入 + autoImport 指针
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-zed          # ~/.config/zed/settings.json（openai_compatible）
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

每条命令都接受 `--remote <url> --api-key <key>`，用于配置本地工具以连接**远程** OmniRoute；还支持使用 `--dry-run` 进行预览。若要在注入正确环境变量的情况下启动 CLI，同时完全不写入任何配置，请使用通用启动器 `omniroute run <target>`（claude、codex、aider、goose、opencode、qwen、gemini）；旧版的各工具专用启动器 `omniroute launch`（Claude Code）和 `omniroute launch-codex`（Codex）仍然可用。

有关完整表格（每条命令写入的内容、所有标志、本地与远程模式、基础 URL 的 `/v1` 约定），请参阅 **[CLI 集成](./CLI-INTEGRATIONS.md)**。

有关各工具的详细配置（Claude Code、Codex CLI、Cursor、Cline、OpenClaw、Kilo Code、Copilot 等），请参阅专门的 **[CLI 工具指南](../reference/CLI-TOOLS.md)**。

---

## 协议设置 (MCP + A2A)

### MCP设置（模型上下文协议）

以 stdio 模式启动MCP传输：

```bash
omniroute --mcp
```

推荐的验证流程：

```bash
# 1. Start MCP server
omniroute --mcp

# 2. From your MCP client, call:
omniroute_get_health        # Should return system health
omniroute_list_combos       # Should return active combos

# 3. Or run the full E2E suite:
npm run test:protocols:e2e
```

#### MCP客户端配置

**Claude代码：**

Claude代码通过HTTP连接， `omniroute --mcp` (stdio) 不会启动。 HTTP传输默认处于关闭状态：首先在正在运行的服务器上启用它。当启用仪表板登录时，没有凭据的请求会获取`401`，因此传递包含`mcp:connect` （或`manage`）的API密钥；没有`manage`/`admin`密钥也需要每个工具的范围（请参阅[MCP服务器→ MCP工具范围](../frameworks/MCP-SERVER.md#mcp-tool-scopes)）。

```bash
omniroute mcp enable --transport streamable-http
claude mcp add --transport http omniroute http://localhost:20128/api/mcp/stream \
  --header "Authorization: Bearer your-key"
```

**Cursor / Cline:**

添加到您的MCP设置（stdio，带有密钥，以便调用者拥有主体）：

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

或者，当`mcpTransport`为`streamable-http` （在`/dashboard/mcp`上设置或使用`omniroute mcp enable --transport streamable-http`进行设置）时，将客户端的远程MCP服务器条目指向`http://localhost:20128/api/mcp/stream`。

密钥作为`Authorization: Bearer <api-key>`传输（请参阅[MCP服务器→远程主机的远程访问](../frameworks/MCP-SERVER.md#remote-access-manage-scope-bypass)；远程密钥需要`mcp:connect`及其read/write范围）。

**完整的MCP文档：** [MCP服务器README](../../open-sse/mcp-server/README.md) — 110 工具、 IDE配置、 Python/TS/Go客户端。压缩CCR/dedup工具的操作员参考（标记、先决条件、每个工具范围、检索分页、诊断）：[压缩引擎→先决条件/操作员指南](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup)。

### A2A设置（代理到代理协议）

验证代理卡：

```bash
curl http://localhost:20128/.well-known/agent.json
```

发送任务：

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**完整的A2A文档：** [A2A服务器README](../../src/lib/a2a/README.md) — JSON-RPC 2.0，技能，流媒体，任务生命周期。

---

## 超时配置

### 基本超时设置

对于大多数部署，只需设置以下两个变量：

| 变量                     | 默认值                    | 用途                                                                                         |
| ------------------------ | ------------------------- | -------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                  | 用作上游响应开始超时、隐藏的 Undici 超时、TLS 指纹请求以及 API 桥接请求/代理超时的共享基准值 |
| `STREAM_IDLE_TIMEOUT_MS` | 继承 `REQUEST_TIMEOUT_MS` | 流式数据块之间允许的最大间隔，超过此时间后 OmniRoute 将中止 SSE 流                           |

保留向后兼容性：现有的 `FETCH_TIMEOUT_MS`、`API_BRIDGE_PROXY_TIMEOUT_MS` 和其他各层超时变量仍然有效，并会覆盖共享基准值。

### 提供者特定说明

对于兼容 Claude Code 的上游（`anthropic-compatible-cc-*`），OmniRoute 会根据解析后的 fetch 超时派生出站 `X-Stainless-Timeout` 标头，以确保提供者侧的读取超时与你的环境变量配置保持一致。

对于兼容 Claude Code 的第三方反向代理，OmniRoute 会将默认 `anthropic-beta` 设置保持在保守范围内；当 `Client Cache Control` 保持为 `Auto` 时，只会转发客户端提供的 `cache_control` 标记。仅当上游明确要求经过编辑处理的 Claude 思考流时，才启用各连接的「Enable redact-thinking beta」开关。

### 高级超时覆盖设置

| 变量                                     | 默认值                                     | 用途                                                   |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | 继承 `REQUEST_TIMEOUT_MS`                  | 上游响应开始超时，在收到响应标头之前生效               |
| `FETCH_HEADERS_TIMEOUT_MS`               | 继承 `FETCH_TIMEOUT_MS`                    | Undici 接收上游响应标头的时间限制                      |
| `FETCH_BODY_TIMEOUT_MS`                  | 继承 `FETCH_TIMEOUT_MS`                    | 上游响应体数据块之间的 Undici 时间限制（`0` 表示禁用） |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici TCP 连接超时                                    |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici 空闲 keep-alive 套接字超时                      |
| `TLS_CLIENT_TIMEOUT_MS`                  | 继承 `FETCH_TIMEOUT_MS`                    | 通过 `wreq-js` 发出的 TLS 指纹请求超时                 |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | 继承 `REQUEST_TIMEOUT_MS` 或 `600000`      | 从 API 端口向仪表板端口转发 `/v1` 代理请求的超时       |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | API 桥接服务器的传入请求超时                           |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | API 桥接服务器的传入标头超时                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | API 桥接服务器的 keep-alive 超时                       |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | API 桥接服务器的套接字不活动超时（`0` 表示禁用）       |

> **注意：** 对于流式请求，`FETCH_TIMEOUT_MS` 仅涵盖连接建立和等待第一个上游响应的阶段。流一旦处于活动状态，OmniRoute 只会在实际停滞（`STREAM_IDLE_TIMEOUT_MS`）或 Undici 响应体不活动（`FETCH_BODY_TIMEOUT_MS`）时中止流。

### 反向代理兼容性

如果你在 Nginx、Caddy、Cloudflare 或其他反向代理后运行 OmniRoute，请确保代理超时也高于 OmniRoute 的流式传输/fetch 超时。

---

## 分端口模式

在不同端口上运行 API 和 Dashboard，适用于高级场景（反向代理、容器网络）：

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API：      http://localhost:20128/v1
# Dashboard：http://localhost:20129
```

---

## 作废Linux (xbps-src) 模板

对于 Void Linux用户，您可以使用`xbps-src`构建原生包。将此块保存为`srcpkgs/omniroute/template`：

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
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Regenerate the checksum for each release with:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
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

## 卸载

| 命令                     | 操作                                                               |
| ------------------------ | ------------------------------------------------------------------ |
| `npm run uninstall`      | 移除系统应用，但会将你的数据库和配置**保留**在 `~/.omniroute` 中。 |
| `npm run uninstall:full` | 移除应用，并永久**删除所有配置、密钥和数据库**。                   |

> 有关所有安装方式的详细卸载说明，请参阅 [UNINSTALL.md](./UNINSTALL.md)。
