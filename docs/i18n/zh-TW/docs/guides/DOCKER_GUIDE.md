# 🐳 Docker Guide — OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md)

---

> 完整的 Docker 部署參考。如需快速開始，請參閱 [README 的 Docker 章節](../README.md#-docker)。

## 目錄

- [快速執行](#quick-run)
- [搭配環境變數檔案](#with-environment-file)
- [Docker Compose](#docker-compose)
- [可用的設定檔](#available-profiles)
- [當 OmniRoute 在 Docker 中執行時設定主機 CLI 工具](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [正式環境 Compose](#production-compose)
- [Dockerfile 階段](#dockerfile-stages)
- [關鍵環境變數](#critical-environment-variables)
- [搭配 Caddy（HTTPS）的 Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare 快速通道](#cloudflare-quick-tunnel)
- [映像標籤](#image-tags)
- [Docker 中的儀表板更新](#dashboard-updates-in-docker)
- [可用性：預設 SQLite 僅支援單一複本](#availability-default-sqlite-is-single-replica)
- [Docker 內的 Gemini 區域錯誤](#gemini-regional-errors-inside-docker)
- [重要注意事項](#important-notes)

---

## 快速執行

> **想用一個指令自行託管嗎？** 請參閱
> [自行託管指南](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d`（已發布的映像檔 +
> Redis、僅限回送介面，無須選擇設定檔）。下方的快速執行是供已在其他位置
> 執行 Redis 的使用者採用的單一容器方式。

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## 搭配環境變數檔案

```bash
# 請先複製並編輯 .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# 基礎設定檔（不含 CLI 工具）
docker compose --profile base up -d

# CLI 設定檔（內建 Claude Code、Codex、OpenClaw）
docker compose --profile cli up -d

# 主機設定檔（以 Linux 為優先；以唯讀方式掛載主機 CLI 二進位檔）
docker compose --profile host up -d

# Web 設定檔（供網頁工作階段提供者使用的 Chromium/Playwright）
docker compose --profile web up -d

# 結合 CLI 與 CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## 可用的設定檔

OmniRoute 提供適用於主要部署形式的 Compose 設定檔。請選擇符合您環境的設定檔。

| 設定檔         | 服務             | 使用時機                                                                                                                      | 指令                                         |
| -------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base`（預設） | `omniroute-base` | 無頭伺服器／最小化執行環境，不包含任何提供者 CLI                                                                              | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | 會呼叫 `omniroute providers/setup/doctor` 與隨附 CLI（Codex、Claude Code、Droid、OpenClaw）的代理式工作流程                   | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | 希望透過以唯讀方式掛載 `~/.local/bin`、`~/.codex`、`~/.claude` 等項目，取得類似 `network_mode` 之主機 CLI 存取權的 Linux 主機 | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | 在連接埠 `8317` 上執行 [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar，以供上游 CLI 代理使用             | `docker compose --profile cliproxyapi up -d` |
| `web`          | `omniroute-web`  | 需要瀏覽器的網頁工作階段提供者：`gemini-web`、`claude-web`、`claude-turnstile`（建置 `runner-web`，內含 Chromium）            | `docker compose --profile web up -d`         |

> 可組合多個設定檔：`docker compose --profile cli --profile cliproxyapi up -d`。

## OmniRoute 在 Docker 中執行時設定主機 CLI 工具

`omniroute setup-codex`、`setup-claude`、`config set <tool>`，以及儀表板上的
**儲存設定**按鈕，都會寫入類似 `~/.codex/*.config.toml` 的檔案。這些路徑
只有在 CLI 實際執行的機器上才有意義。如果在容器內執行這些命令，
寫入操作將落在容器自己的家目錄中（`/home/node`——此映像檔以 `USER node`
執行）；主機上的 CLI 永遠不會讀取該位置，而且容器一旦重新建立，
其中的內容就會被捨棄。

OmniRoute 會偵測這種情況並拒絕寫入，同時提供操作指示，而不會回報一個
實際上無法使用的成功結果：CLI 會以 `2` 結束，而 API 則會回應 `422`，
並附帶 `containerEphemeralTarget: true`。

### 建議方式：在主機上執行 CLI，在 Docker 中執行 OmniRoute

容器負責提供 API；CLI 則負責設定主機上的工具。

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # 將 CLI 指向容器
omniroute setup-codex                      # 寫入主機上實際使用的 ~/.codex
```

當 Codex、Claude Code、Cursor 或類似工具在您的筆記型電腦上執行時，
這是正確的選擇——而這也是最常見的設定方式。

### 替代方式：繫結掛載主機設定目錄（`host` profile）

如果您希望容器本身寫入主機設定，請掛載這些目錄，並將
`CLI_CONFIG_HOME` 指向掛載根目錄。`host` profile 已經完成此設定：

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

繫結掛載能讓該路徑值得信任：OmniRoute 會讀取
`/proc/self/mountinfo`，並允許寫入已掛載的路徑（以及子目錄為掛載點的
目錄，而上述 `/host-home` 正是這種結構），同時仍會拒絕寫入未掛載的
路徑。

### 例外手段：設定容器自身的 CLI（請謹慎使用）

如果 CLI 確實位於容器內（`cli` profile），該寫入操作就是有意為之。
請將 `--allow-container-write` 傳給任何 `setup-*` 命令，或為伺服器設定
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`。寫入將會執行，但同時
顯示警告，指出該內容無法在容器重新建立後保留。

> **安全性警告——`cli` profile + `docker.sock` 掛載。**
> `cli` profile 會繫結掛載 `/var/run/docker.sock`，讓容器內的
> 自動更新程式可以透過主機 daemon 重新建立整個 stack
> （`src/lib/system/autoUpdate.ts` 會探測該 socket；如果不存在，
> 就會略過 Docker 路徑）。該 socket 是**具備主機 root 權限的信任
> 邊界**：任何能夠存取它的項目，都能以 root 身分操控主機的 Docker
> daemon——包括建立、檢查、停止及移除主機上的任何容器。
> 這表示：
>
> 1. **絕對不要將 `cli` profile 的連接埠暴露至網路。**請將其發布在
>    `127.0.0.1`（`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`）
>    ——可從 LAN 存取的 `cli` profile，會讓任何儀表板層級的 RCE
>    演變成主機遭全面入侵。
> 2. **不要將任何額外的主機目錄繫結至 `cli` profile。**
>    Docker socket 加上任何其他掛載，都會讓容器取得檔案系統及主機
>    設定的完整讀寫權限。如果您需要讓工具存取某個專案，請透過 CLI
>    二進位檔在本機執行它——不要將該專案掛載至 `cli` 容器。
>
> 如果不需要容器內自動更新，請停用 `cli` profile
> （`COMPOSE_PROFILES=core,redis` 或更精簡的設定）。其他 profile
> 不會掛載 Docker socket。
>
> 如需瞭解 MITM 相關威脅模型，請參閱
> `docs/security/MITM-TPROXY-DECRYPT.md`（位於 git 中；不會編譯至 `/docs`）；
> 如需瞭解 `codex`/`claude-code`/`droid`/`openclaw` 二進位檔的來源鏈，
> 請參閱 `docs/security/SUPPLY_CHAIN.md`。

## Redis Sidecar

OmniRoute 仰賴 Redis 支援分散式速率限制器與共用快取。`redis` 服務在 `docker-compose.yml` 中**一律會定義**（不受任何 profile 限制），並會與任何其他 profile 一同啟動。

| 詳細資料             | 值                                      |
| -------------------- | --------------------------------------- |
| 映像                 | `redis:7-alpine`                        |
| 容器名稱             | `omniroute-redis`                       |
| 內部連接埠           | `6379`                                  |
| 主機連接埠（可覆寫） | `REDIS_PORT`（預設為 `6379`）           |
| 主機綁定（可覆寫）   | `REDIS_BIND_HOST`（預設為 `127.0.0.1`） |
| 磁碟區               | `omniroute-redis-data` → `/data`        |
| 健康檢查             | `redis-cli ping`（間隔 10 秒）          |

相關環境變數：

- `REDIS_URL` — 注入應用程式的連線字串（預設為 `redis://redis:6379`）。
- `REDIS_PORT` — Redis 容器的主機端連接埠對應。
- `REDIS_BIND_HOST` — 發佈連接埠的主機介面。預設為 `127.0.0.1`。

> **為何預設使用迴路位址：** sidecar 執行時未設定 `requirepass`，而應用程式
> 容器會透過 compose 網路（`redis:6379`）存取它——發佈的連接埠僅供主機端工具
> （`redis-cli`、本機 `npm run dev`）使用。若發佈至 `0.0.0.0`，會將未經驗證的
> Redis 暴露給區域網路中的每部主機。若設定 `REDIS_BIND_HOST=0.0.0.0`，
> 也請將 `--requirepass` 加入服務的 `command:`。

不建議**停用 Redis**（速率限制器將降級為記憶體內備援機制）。若確實需要停用，請移除／註解 `docker-compose.yml` 中的 `redis:` 服務區塊，或將其縮放為零：

```bash
docker compose up -d --scale redis=0
```

## Production Compose

若要建立與開發環境並行執行的隔離式正式環境快照，請使用 `docker-compose.prod.yml`。

| 詳細資料         | 值                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------ |
| 檔案             | `docker-compose.prod.yml`                                                            |
| 預設儀表板連接埠 | `PROD_DASHBOARD_PORT=20130`（對應至內部 `${DASHBOARD_PORT:-20128}`）                 |
| 預設 API 連接埠  | `PROD_API_PORT=20131`                                                                |
| 映像             | `omniroute:prod`（從 `runner-cli` 目標建置）                                         |
| Redis 容器       | `omniroute-redis-prod`（`redis:8.6.2`，使用專用的 `redis-prod-data` 磁碟區）         |
| 資料磁碟區       | `omniroute-prod-data`（具名磁碟區，重建後仍會保留）                                  |
| 健康檢查         | `node healthcheck.mjs` + `redis-cli ping`，且 `depends_on` 會以 Redis 健康狀態為條件 |

使用方式：

```bash
# 建置並啟動正式環境堆疊
docker compose -f docker-compose.prod.yml up -d --build

# 串流顯示日誌
docker compose -f docker-compose.prod.yml logs -f

# 關閉並移除（保留磁碟區）
docker compose -f docker-compose.prod.yml down
```

正式環境堆疊可與開發環境 compose 並行執行（使用不同的容器名稱、連接埠和磁碟區），因此你可以在正式環境持續運行的同時，繼續於本機進行迭代開發。

## Dockerfile 階段

此儲存庫提供多階段 Dockerfile（`Dockerfile`）。共有四個可用階段；請依據使用情境選擇正確的 `target`。

| 階段          | 基礎映像檔            | 用途                                                                                                                                                                                                                                              |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | 安裝相依套件（`npm ci --legacy-peer-deps`）並執行 `npm run build`（預設使用 Turbopack——請參閱下方的建置階段資源）                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | 包含 Next.js standalone 輸出的正式環境執行階段。**不包含任何提供者 CLI。**                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | 加入 `git`、`docker.io`、`docker-compose`，以及全域 CLI：`@openai/codex`、`@anthropic-ai/claude-code`、`droid`、`openclaw`。**代理型工作流程請選擇此階段。**                                                                                      |
| `runner-web`  | `runner-base`         | 加入 Playwright 與 Chromium 瀏覽器（`--with-deps`），供網頁工作階段提供者使用：`gemini-web`、`claude-web`、`claude-turnstile`。**使用這些提供者時請選擇此階段**——一般映像檔若未包含這些元件，會在請求時失敗（請參閱發布管道下方的 `-web` 說明）。 |

手動建置特定 target：

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### 建置階段資源

有三個建置引數可控制 `builder` 階段的資源成本。它們僅適用於建置階段——
`OMNIROUTE_MEMORY_MB`（見下文）是另一個獨立的執行階段調整項目。

| 建置引數                    | 預設值 | 效果                                                                          |
| --------------------------- | ------ | ----------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` 使用 webpack 建置：尖峰記憶體較低，但速度較慢。`1` 則啟用 Turbopack。     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | 產生的 `next build` 所使用的 V8 堆積上限（`--max-old-space-size`）。          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | 傳入 `CIRCLE_NODE_TOTAL`；Next 會推導出 `workers = N - 1`，用於收集頁面資料。 |

`OMNIROUTE_BUILD_WORKERS` 是在大型建置主機上應調高的項目，也是資源受限的建置在
`✓ Compiled successfully` **之後**終止時應優先懷疑的項目。每個
頁面資料 worker 都是獨立處理程序，父層 `next build` 本身也是；
在實際 VPS 上重現（issue #7518）時，測得每個處理程序的 RSS 尖峰約為
4.5 GB，且不受 `NODE_OPTIONS` 堆積旗標影響（Turbopack 會在
V8 堆積以外使用原生/Rust 記憶體）。預設值 `2`（→ 1 個 worker，共 2 個
處理程序）是針對發布管線所使用的 16 GB / 4 vCPU GitHub 託管 runner
而設定。設為 `8`（→ 7 個 worker）時，該 runner 會耗盡記憶體，且
buildkit 會以 `ResourceExhausted: ... cannot allocate memory` 使該步驟失敗；
在直接測量各處理程序的 RSS，而非加以推估後，`3`（→ 2 個 worker）仍無法容納。
`tests/unit/docker-build-memory-budget.test.ts`
會根據實測數值進行計算，並在任一調整項目超出 runner 容量時失敗。

Turbopack 會使用位於 V8 堆積**以外**的原生 Rust 記憶體進行編譯，因此
`OMNIROUTE_BUILD_MEMORY_MB` 無法限制它。在設有記憶體上限的主機上，
建置程序接著會遭 OOM killer 以 SIGKILL 終止，且完全沒有錯誤文字——它只會在
`Creating an optimized production build` 期間停止，使其看起來像是停止回應，
而不是記憶體不足。因此，`Dockerfile` 預設使用 webpack
（`OMNIROUTE_USE_TURBOPACK=0`），這與 `npm run dev` / `npm run build`
不同，後兩者的程式碼預設值為 Turbopack：未提供任何建置引數的純
`docker build .`（Railway 與其他一鍵式主機所執行的方式）不得在有記憶體限制的
建置主機上無聲終止。已發布的映像檔也已在 `docker-publish.yml` 中明確傳入
`OMNIROUTE_USE_TURBOPACK=0`。若建置主機有充足 RAM，可選擇啟用 Turbopack
以加快建置速度：

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` 已啟用，因此 `next build` 會執行一個父層處理程序**以及**一個
worker 處理程序，而且兩者會分別遵循 `OMNIROUTE_BUILD_MEMORY_MB`。容器的上限應設定為
約略超過該值的兩倍，而不是一倍。

在此程式碼樹上測得（`--target runner-base`、`OMNIROUTE_BUILD_MEMORY_MB=6144`）：

| 打包工具  | 容器上限       | 結果                        |
| --------- | -------------- | --------------------------- |
| Turbopack | 8 GiB / 16 GiB | 兩者皆遭 OOM 終止，且無訊息 |
| webpack   | 8 GiB          | 建置 worker 遭 SIGKILL 終止 |
| webpack   | 12 GiB         | 成功，尖峰為 11.1 GiB       |

### 執行階段預設值

`runner-base` 匯出的預設值：`PORT=20128`、`HOSTNAME=0.0.0.0`、`OMNIROUTE_MEMORY_MB=1024`、`NODE_OPTIONS=--max-old-space-size=1024`、`DATA_DIR=/app/data`、`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`。

Docker 中的記憶體行為：

- 此映像檔會設定 `OMNIROUTE_MEMORY_MB=1024`，並據此衍生出 `NODE_OPTIONS=--max-old-space-size=1024`。
- 實際的伺服器處理由獨立啟動器啟動；該啟動器會讀取 `OMNIROUTE_MEMORY_MB`，並附加 `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`。
- Node 會使用最後一個重複指定的 `--max-old-space-size` 值，因此設定 `OMNIROUTE_MEMORY_MB` 即可控制 Docker 中實際生效的堆積記憶體上限。
- 由於映像檔一律會設定此值，因此在 Docker 環境下，啟動器本身根據 RAM 校準的後備機制永遠不會生效。請依工作負載明確提高此值（見下表）。對程式設計代理的 `/v1/responses` 而言，`2048` 仍然太小。

### 程式設計代理的執行階段 RAM

Docker 預設的 1 GiB 僅是儀表板／輕量聊天的最低需求，並非正式環境的建議配置。較長的 `POST /v1/responses` 主體（數百則訊息、數十個工具）會在壓縮期間於記憶體中保留多個圖形結構。兩個重疊、各約 3 MiB／約 75 萬 token 的請求，在 **12 GiB** 的 old-space 下曾導致 V8 中止（`FATAL ERROR: Reached heap limit`），也曾觸發 16 GiB cgroup OOM。詳見 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)。

請將 **cgroup `--memory` 設定為高於堆積記憶體的容量**——原生緩衝區、SQLite 與壓縮中間資料皆位於 V8 之外。

| 工作負載                              | `OMNIROUTE_MEMORY_MB`    | 容器／cgroup     | 備註                                                                             |
| ------------------------------------- | ------------------------ | ---------------- | -------------------------------------------------------------------------------- |
| 儀表板、單一輕量聊天                  | `1024`（映像檔預設值）   | ≥2 GiB           |                                                                                  |
| 單一程式設計代理（Claude/Codex/Grok） | `8192`                   | ≥10 GiB          | 典型的單一工作階段 `/v1/responses`                                               |
| 兩個並行的長篇 `/v1/responses`        | `10240`–`12288`          | ≥12–16 GiB       | 實測在約 12 GiB 堆積記憶體時發生 V8 中止                                         |
| 三個以上並行的長上下文                | 請勿在單一處理程序上執行 | 序列化／更多 RAM | 預設重量級准入限制為 1 個進行中請求；若沒有增加 RAM 就提高此限制，將再次引發中止 |

在裸機上執行 `omniroute serve` 時，若未設定 `OMNIROUTE_MEMORY_MB`，會校準為 RAM 的約 35%（限制在 `[512, 4096]` 範圍內）。Docker 一律會設定 `1024`，因此官方映像檔中永遠不會執行此校準。

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## 關鍵環境變數

除了 [ENVIRONMENT.md](../reference/ENVIRONMENT.md) 中記錄的預設值之外，在 Docker 下執行時，以下變數最為重要：

| 變數                          | 用途                                                                                                                                                                                                                      | 預設值                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket 橋接器的共用密鑰。**生產環境中為必填** — 請設定為高強度隨機字串。                                                                                                                                               | 未設定（必須提供）     |
| `REDIS_URL`                   | 速率限制器／快取後端的連線字串                                                                                                                                                                                            | `redis://redis:6379`   |
| `REDIS_PORT`                  | 隨附 Redis 容器的主機端連接埠                                                                                                                                                                                             | `6379`                 |
| `REDIS_BIND_HOST`             | 隨附 Redis 連接埠所發布至的主機介面（除非您新增 AUTH，否則使用迴路介面）                                                                                                                                                  | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 掛載至 `cli` profile 中 `/workspace/omniroute` 的主機路徑，用於自我更新工作流程                                                                                                                                           | `.`（目前目錄）        |
| `OMNIROUTE_MEMORY_MB`         | Docker 獨立伺服器執行階段的 Node 堆積上限；會覆寫上述映像檔預設值。程式設計代理：`8192`+（請參閱[執行階段 RAM](#runtime-ram-for-coding-agents)）。                                                                        | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | 覆寫儀表板 (20128) 與 API (20129) 的公開連接埠                                                                                                                                                                            | `20128` / `20129`      |
| `APP_BIND_HOST`               | docker-compose 用來發布儀表板／API／即時 WS 連接埠的主機介面。當 `REQUIRE_API_KEY=false`（預設值）時，`0.0.0.0` 會將匿名 `/v1` Proxy 公開至區域網路 — 僅應在 `REQUIRE_API_KEY=true` 或前方設有反向 Proxy 時擴大存取範圍。 | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | docker-compose 用來發布 `cliproxyapi` sidecar 的主機介面 — 其資料磁碟區包含提供者憑證。                                                                                                                                   | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | 執行階段外掛掃描器讀取及安裝外掛的目錄。當外掛透過繫結掛載時，請設定此變數：預設值會跟隨 `HOME`，而映像檔不一定會匯出該變數。                                                                                             | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | 應用程式發布於反向 Proxy 後方時的 URL 子路徑（例如 `/omniroute`）                                                                                                                                                         | _(空白 = 根目錄)_      |
| `NEXT_PUBLIC_BASE_URL`        | 包含子路徑的公開瀏覽器來源（例如 `https://host/omniroute`）                                                                                                                                                               | 未設定                 |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` 的主機端儀表板連接埠                                                                                                                                                                            | `20130`                |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar 的主機端連接埠                                                                                                                                                                                      | `8317`                 |

## 子路徑上的反向代理（Traefik / nginx）

Next.js 的 `basePath` 會被編譯進獨立套件中。OmniRoute 會將建置時寫入的值記錄在應用程式根目錄的哨兵檔案中（於 `npm run build` 期間寫入；由 `scripts/docker/ensure-docker-base-path.mjs` 讀取），並在容器啟動時將其與 `OMNIROUTE_BASE_PATH` 比較。當兩者不同，且映像是針對網域根目錄建置時，進入點會在 `node dev/run-standalone.mjs` 執行前，重寫獨立套件資訊清單、內嵌的 `basePath`/`assetPrefix` 常值（Next 16 僅從 `assetPrefix` 產生 SSR 資產 URL，因此修補程式會將子路徑同步至其中）、建置時寫入的 `/_next/static` 資產 URL（用戶端參照資訊清單、媒體匯入、預先算繪的錯誤頁面），以及用戶端的 `process.env` 墊片。

### Compose 建置（建議）

在 `.env` 中設定這兩個變數，然後重新建置，使映像與執行階段設定一致：

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` 會將 `OMNIROUTE_BASE_PATH` 同時轉送為 Docker 建置引數及執行階段環境變數。

### 預先建置的根目錄映像 + 執行階段子路徑

已發布的 `diegosouzapw/omniroute:*` 映像是針對網域根目錄建置的。您仍可在執行階段設定 `OMNIROUTE_BASE_PATH`；容器會在啟動時修補套件一次。請搭配相符的公開來源：

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

設定反向代理以轉送**完整的**外部路徑（請勿移除前綴）。Traefik 應將 `PathPrefix(`/omniroute`)` 路由至容器，且不要使用 `StripPrefix`，如此 Next.js 才會接收到 `/omniroute/...`，並從 `/omniroute/_next/...` 提供資產。

Docker 健康檢查會探測輕量級的 `/healthz` 生命週期端點，並加上目前作用中的 `OMNIROUTE_BASE_PATH` 前綴。`/api/monitoring/health` 仍可用於人工或儀表板診斷；若要讓容器的 HEALTHCHECK 改回指向該端點（例如用於強制執行深度健康檢查），請設定 `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`。此路徑屬於**深度**檢查（DB + 監控摘要），若您選擇重新啟用，適合用於 Docker 低頻率的 `HEALTHCHECK`，但**不適合**用於 Kubernetes `livenessProbe` 的檢查間隔。

對於協調器（Kubernetes、Nomad 等）：

| 探測類型   | 建議                                                            | 避免                                         |
| ---------- | --------------------------------------------------------------- | -------------------------------------------- |
| 存活狀態   | HTTP `GET /livez`，或主連接埠上的 TCP（`PORT`，預設為 `20128`） | 將 `/api/monitoring/health` 用作存活狀態探測 |
| 就緒狀態   | HTTP `GET /healthz`                                             | 使用過短的逾時，將事件迴圈忙碌視為程序已停止 |
| 深度／黑箱 | `/api/monitoring/health`                                        | —                                            |

`/healthz` 會回報程序生命週期（`ok` / `starting` / `stopping`）。`/livez` 僅檢查程序是否存活（只要處理常式能夠執行便回傳 200；它不會等待就緒狀態）。兩者仍與請求處理共用同一個 Node 事件迴圈，因此受 CPU 限制的目錄或壓縮工作可能會延遲回應——忙碌 ≠ 已停止。若 HTTP 探測逾時，建議使用 TCP 存活狀態探測。完整的探測指南：
[監控指南 — Kubernetes 探測建議](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)。

## 搭配 Caddy 使用 Docker Compose（HTTPS 自動 TLS）

OmniRoute 可透過 Caddy 的自動 SSL 配置安全地對外提供服務。請確保您網域的 DNS A 紀錄指向伺服器的 IP。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # 用於 OAuth 回呼、儀表板連結及產生公開 URL 的瀏覽器端來源。
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # 用於排程工作／自行擷取的內部伺服器對伺服器 URL。
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy 會為上游容器設定標準轉送標頭。OmniRoute 使用
`NEXT_PUBLIC_BASE_URL` 作為 OAuth 回呼及所產生公開連結的標準公開來源；
經驗證的儀表板寫入操作會使用同源請求，並搭配與工作階段綁定的 CSRF
保護。僅應在進階部署中啟用 `OMNIROUTE_TRUST_PROXY`，亦即您有意讓
OmniRoute 從受信任的轉送標頭推導公開來源，而不是使用明確設定。

## Cloudflare Quick Tunnel

Docker 部署的儀表板支援在 `Dashboard → Endpoints` 上一鍵啟用 **Cloudflare Quick Tunnel**。首次啟用時，系統只會在需要時下載 `cloudflared`、啟動指向目前 `/v1` 端點的暫時通道，並直接在一般公開 URL 下方顯示產生的 `https://*.trycloudflare.com/v1` URL。

端點通道面板（Cloudflare、Tailscale、ngrok）可從 `Settings → Appearance` 顯示或隱藏，而不會變更作用中通道的狀態。

### 通道注意事項

- Quick Tunnel URL 是暫時性的，每次重新啟動後都會變更。
- OmniRoute 或容器重新啟動後，不會自動還原 Quick Tunnel。需要時請從儀表板重新啟用。
- 受管理安裝目前支援 Linux、macOS 及 Windows 的 `x64`／`arm64`。
- 受管理 Quick Tunnel 預設使用 HTTP/2 傳輸，以避免在資源受限的容器環境中出現大量 QUIC UDP 緩衝區警告。如需不同的傳輸方式，請設定 `CLOUDFLARED_PROTOCOL=quic` 或 `auto`。
- Docker 映像檔內含系統 CA 根憑證，並將其傳遞給受管理的 `cloudflared`，以避免通道在容器內啟動時發生 TLS 信任失敗。
- 如果您希望 OmniRoute 使用現有的二進位檔，而不是下載新的二進位檔，請設定 `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`。

## 映像檔標籤

| 映像檔                   | 標籤     | 大小   | 說明                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | 已**發布**的最高穩定 SemVer（不是 git `main`） |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | 在 GitOps 中固定使用此類標籤                   |

多平台資訊清單：原生支援 `linux/amd64` + `linux/arm64`（Apple Silicon、AWS Graviton、Raspberry Pi）。Docker 會自動選取相符的架構；如果您需要在 ARM 主機上強制使用 AMD64 模擬，請傳入 `--platform linux/amd64`。

### 發布管道

OmniRoute 針對穩定版本、作用中發布分支測試及開發組建，分別發布不同的 Docker 管道。

| 管道                            | 來源                         | 可變性           | 建議用途                                                                                     |
| ------------------------------- | ---------------------------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | 已簽署／具版本編號的發行版本 | 不可變           | 固定使用特定發行版本的正式環境部署                                                           |
| `:latest` / `:latest-web`       | 已**發布**的最高穩定 SemVer  | 可變的穩定指標   | 在 SemVer 發布工作完成**後**跟隨穩定版本——**不會**追蹤 `main` 或尚未發布的 `release/v*` 提交 |
| `:next` / `:next-web`           | 目前預設的 `release/v*` 分支 | 可變的預發布指標 | 測試已合併至作用中發布分支、但尚未納入穩定版本的修正                                         |
| `:main` / `:main-web`           | `main` 分支                  | 可變的開發指標   | 僅供開發及整合測試                                                                           |

#### Web 工作階段提供者：`-web` 映像檔

上述每個管道都另有對應的 `-web` 標籤（`:latest-web`、`:<version>-web`、`:next-web`、`:main-web`），這些映像檔是從 `runner-web` 階段建置而成，也就是相同的映像檔加上 Playwright 和 Chromium 瀏覽器。一般映像檔**不含** Chromium；`gemini-web`、`claude-web` 和 `claude-turnstile` 需要它。

此錯誤會延後發生，而不是在啟動時發生：這些提供者會列出其模型，並在儀表板中顯示為已連線，直到第一次請求時才會失敗，錯誤如下：

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

如果您使用這些提供者，請拉取目前所在管道的 `-web` 標籤，其他設定皆無須變更。如果透過 npm/CLI 安裝（未使用 Docker 映像檔），缺少的對應項目是瀏覽器二進位檔：請在主機上執行 `npx playwright install chromium`。

#### 使用預發布管道

`next` 通道會在每次推送至目前預設的 `release/v*` 分支時重新建置，並針對 AMD64 與 ARM64 發佈。較舊的維護分支無法覆寫此通道。此通道提供可供拉取的映像，包含已合併至作用中發行分支、但尚未建立下一個穩定標籤的修正。

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

若使用 Docker Compose，請覆寫所選設定檔使用的映像標籤，然後拉取映像並重新建立服務：

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### 安全性與復原

`next` 是浮動的預發行通道。每次推送至作用中發行分支時，它都可能變更，且**不支援用於正式環境**。評估特定建置版本時，請固定映像摘要：

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

測試之前，請備份 OmniRoute 資料磁碟區或以繫結方式掛載的資料目錄。若要復原，請還原先前使用的穩定版本或摘要，並重新建立容器：

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

發行分支的建置絕不會移動 `latest`；只有符合資格的穩定語意化版本才能更新穩定版本指標。`next` 映像仍會執行發行映像檢查，並保留會阻擋 CRITICAL 嚴重性漏洞的閘道。

**`latest` 並不保證與 git 保持同步。** 合併至 `main` 或作用中 `release/v*` 分支的修正，必須等到穩定的 SemVer 映像發佈，且發佈作業將 `:latest` 更新至該 SemVer 的相同摘要後，才會包含在 `:latest` 中。如果 GitHub 已顯示修正，但 `latest` 看起來仍未更新，請拉取 `:next` 以測試發行分支，或等待 SemVer 標籤。

| 您的需求                                           | 使用方式                        |
| -------------------------------------------------- | ------------------------------- |
| 不得發生版本漂移的 GitOps／正式環境                | 固定使用 `:X.Y.Z`（或映像摘要） |
| 跟隨已發佈的穩定版本，並接受每次發行時重新建立容器 | `:latest`                       |
| 測試尚未發行的 `release/v*` 提交                   | `:next`（非正式環境）           |
| 測試 `main`                                        | `:main`（非正式環境）           |

## Docker 中的儀表板更新

已發佈映像檔的容器無法自行取代。當 OmniRoute 偵測到它在容器內執行時（沒有 `.git` 簽出，也不是 npm 安裝），首頁儀表板的更新橫幅會顯示要執行的主機命令，而不是 npm/git 指示，並附有複製按鈕：

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

服務名稱來自 `AUTO_UPDATE_SERVICE`（預設為 `omniroute`，即
`docker-compose.selfhost.yml` 中的服務）。`pull` 只會移動浮動標籤（`latest`、`next`）；若使用固定的
`:X.Y.Z` 標籤，請先編輯該標籤。

### 使用主機觸發檔案進行一鍵更新

若要讓 **立即更新** 保持可用，同時不掛載 `/var/run/docker.sock`（這會讓容器取得主機上的
root 權限——請參閱上方的 `cli` 設定檔警告），請在 OmniRoute 服務上設定 `DOCKER_UPDATE_TRIGGER_FILE`，並在主機上執行監看程式：

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

該路徑必須位於 `DATA_DIR` 內（相對值會以它為基準解析）；其他任何路徑都會遭到拒絕。之後，**立即更新** 會將 `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` 寫入該檔案、回應 `202`，而儀表板會輪詢 `/api/system/version`，直到新版本上線後重新載入。在此模式下，OmniRoute 絕不會執行 shell 或 Docker 命令。與所有更新動作一樣，僅接受來自迴路位址/LAN 用戶端的請求。

透過繫結掛載的資料目錄，主機便有穩定的路徑可供監看。以下為 `systemd` 單元範例（請將 `/srv/omniroute` 調整為存放 compose 檔案及 `data/` 的目錄）：

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=監看 OmniRoute 儀表板更新請求

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=拉取並重新建立 OmniRoute 容器

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

服務會在拉取前移除請求，避免失敗的執行重複循環。若未設定 `DOCKER_UPDATE_TRIGGER_FILE`，儀表板會保留手動命令流程。

## 可用性：預設 SQLite 僅支援單一複本

標準 Docker / Kubernetes OmniRoute 是 **一個 Node 程序 + 一個 SQLite 寫入器**。此拓撲**不支援高可用性**。

| 限制                                   | 後果                                                                                                                                                                                                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 單一寫入器                             | **請勿**讓多個複本對同一個 SQLite 檔案執行。這會損毀資料庫。                                                                                                                                                                                              |
| 重新建立 / 重新啟動 / HEALTHCHECK 終止 | 進行中的 SSE、儀表板工作階段與記憶體內狀態會**完全中斷**。每個已連線的用戶端都會斷線。在沒有端點可用的空窗期間，新請求會從反向 Proxy 收到 **`502 Bad Gateway: Unknown error`**，而不是 OmniRoute JSON——用戶端無法將此情況與提供者故障區分開來（#11015）。 |
| 與 `/healthz` 使用相同的事件迴圈       | 忙碌的目錄或壓縮週期可能延遲探查；過短的逾時接著會重新啟動**唯一的**複本。                                                                                                                                                                                |

**探查矩陣**（另請參閱 [Kubernetes 探查建議](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)）：

| 探查                | 目標                                                        | 請勿使用                                   |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------ |
| 存活探查            | `PORT` 上的 TCP（預設為 `20128`），或寬鬆的 HTTP `/healthz` | `/api/monitoring/health`                   |
| 就緒探查            | HTTP `GET /healthz`                                         | 將事件迴圈忙碌視為程序已停止的嚴格逾時設定 |
| 深度檢查 / 人工檢查 | `/api/monitoring/health`                                    | 自動化 kubelet 存活探查                    |

**升級：**請預期每個工作階段都會中斷。如果可以，請先排空用戶端；預設 SQLite 不支援滾動更新。Compose 的 `restart: unless-stopped` 加上 Docker `HEALTHCHECK`，也會在容器狀態為 Unhealthy 時取代唯一的程序——影響範圍相同。

適用於**單一複本**的 Kubernetes 片段（必須使用 Recreate；請勿在只有一個 SQLite 檔案的情況下提高 `replicas`）：

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` 的 sleep 讓 kube 能在傳送 SIGTERM 前移除 Service 端點，使**新的**流量不再送往即將終止的程序。進行中的 `/v1/responses` SSE 會透過重量級准入租約（#11015），最多在 `SHUTDOWN_TIMEOUT_MS`（預設為 30 秒）指定的時間內完成排空。仍送達該程序的新請求會收到 `503` + `Retry-After: 5`。在替代執行個體 Ready 之前，Recreate 造成的無端點空窗期仍會是完全中斷——這是 SQLite 拓撲本身的限制，而非探針設定錯誤。

外部 Postgres／多寫入器 HA **並非**已有文件說明的標準支援方案。如果你需要 HA，請維持單一副本，或使用專案已另行測試並記載於文件中的拓撲。Postgres/MySQL 的相關工作位於 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)。在該功能發布之前，唯一受支援的**大型** `/v1/responses` 容量擴充方式，是執行 N 個彼此獨立的程序（請參閱下一節），而不是在同一個磁碟區上設定 `replicas > 1`。

## 橫向擴充：N 個獨立程序

一個 Node 程序就是**一個 V8 heap**。兩個重疊執行、約 3 MiB / 約 750k-token 的編碼代理程式 `POST /v1/responses`（RTK + Caveman），會在約 12 Gi 時使該 heap 中止（`FATAL ERROR: Reached heap limit`），並可能使 16 Gi cgroup 發生 OOM。請參閱 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)。這項測量結果是**記憶體預算**警告，並非產品將並行長時間 `/v1/responses` 的數量硬性限制為兩個。重量級聊天的准入由自動推導的輸入位元組預算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`、`src/shared/middleware/admissionBudget.ts`）控管，其大小依相同的 V8/cgroup 上限設定——在已完成容量配置的程序上將其向上覆寫（或設定舊版 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` 請求數量上限），會再次導致中止。小型聊天、`/healthz`、`/v1/models` 與 MCP **不受**該上限限制。

### 單一程序：超過兩個長時間 `/v1/responses`

當程序**健康**時（heap 低於 `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`，預設為 `0.75`），只要程序層級的處理中位元組預算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）仍有餘裕，便**可以**同時執行超過兩個長時間的 `POST /v1/responses`。大小等於或高於 `OMNIROUTE_CHAT_LARGE_BODY_BYTES`（預設為 256 KiB）的 body，會取得與結構複雜請求相同的重量級 lease，並使用相同的 [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` 逃生機制（`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`）。數十個同時運作的長時間 SSE 用戶端（營運人員通常需要 40–50 個）是**記憶體預算**問題——請調整 heap、主要/額外餘裕槽位，以及 `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`——而不是產品硬性「最多 2 個」的限制。heap 壓力過高時仍會以可重試的 `503` 卸載請求，以免 #7849 再次發生。

若要在**目前**將 heap 數量倍增（彼此獨立的 V8 old-space）：

| 應該做                                                                                                            | 不應該做                                        |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| 執行 **N 個容器/pod**，每個都使用**各自的** `DATA_DIR` / volume                                                   | 讓 `replicas > 1` 共用同一個 SQLite 檔案        |
| 根據 heap / 處理中位元組預算設定重量級處理中請求數與健康狀態額外餘裕；1–2 是保守的 #7849 預設值，不是產品硬性上限 | 為單一程序提供 8 倍 RAM，並設定無上限的數量上限 |
| 選用：透過 `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` 使用**共用配額計數器**                            | 將 Redis 視為共用 SQLite——它不是                |
| 將提供者密鑰複製到每個執行個體中（或接受彼此分隔的儀表板）                                                        | 預期所有執行個體共用一個儀表板 / 一份呼叫記錄   |
| 前端可使用任何負載平衡器；依 API key 或 session 維持黏著性即可                                                    | 要求提供者特定、可感知大小的 middleware         |

硬體方面：每個執行個體可同時處理多少個長時間 `/v1/responses`，是**記憶體預算**問題（heap + 處理中位元組 / #10110）。具有獨立 `DATA_DIR` 的 `N` 個執行個體仍會使 heap 數量倍增：主機 RAM 必須足以容納 `N × cgroup`，而不是「一個具有 N=8 的 16 Gi pod」。切勿讓 `replicas > 1` 共用同一個 SQLite 檔案。

Compose 範例（兩個 heap、兩個 volume——不是 `deploy.replicas: 2`）：

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

程序內密度（將壓縮移出 HTTP isolate）請參閱 [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)。在共用持久化狀態上建立單一邏輯叢集請參閱 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)。

## Docker 內的 Gemini 區域錯誤

Google AI Studio / Gemini API 可能會傳回 HTTP 400、FAILED_PRECONDITION，以及
`API 使用不支援使用者所在位置。` 主機上的請求成功，
並不代表容器會使用相同的對外路由。DNS 排序、
IPv4/IPv6 連線能力、VPN 路由及已設定的代理伺服器都可能不同。請檢查
[Google 支援的區域](https://ai.google.dev/gemini-api/docs/available-regions)
以及實際的連線路由；僅憑此錯誤無法判定 API 金鑰有問題。

### 優先使用連線專屬代理伺服器

針對受影響的 Gemini 連線，使用 OmniRoute 的[個別連線代理伺服器設定](../ops/PROXY_GUIDE.md#4-level-proxy-system)，
然後使用相同模型再次執行**測試連線**和一個小型請求。
這可將路由變更限制在該連線的範圍內。請確認容器可連線至代理伺服器，
且該連線確實選用了它。變更路由並不保證符合上游的區域資格。

### 比較主機與容器的網路

比較經驗證的結果時，請保持金鑰、模型和請求完全相同；切勿將憑證、
代理伺服器密碼或完整的授權標頭貼到議題中。
首先使用相同命令在主機及容器內檢查作業系統解析器提供哪些位址家族：

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

請將 `omniroute` 替換為您執行的服務（例如 `omniroute-web`）。這些
命令會列印位址家族，而不會顯示憑證或 IP 位址。傳回 `6`
只表示有 IPv6 DNS 結果：這**不能**證明有可用的 IPv6 路由或 API 存取能力。
若已安裝 `curl`，請在兩個環境中比較 `curl -4 -I https://generativelanguage.googleapis.com`
與 `curl -6 -I https://generativelanguage.googleapis.com`。
HTTP 回應即表示該探測具有連線能力，即使回應是未經驗證的錯誤亦然；
只有經驗證的模型請求才能測試 Gemini 的使用資格。

### 主機層級的替代方案：可運作的 IPv6 與解析器原則

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) 的回報者透過啟用容器 IPv6 並變更 glibc 位址選擇，
在其環境中恢復了存取。請將此視為特定環境的替代方案。調整解析器偏好設定前，
請先確認主機 IPv6 可正常運作、容器的對外連線／路由，以及防火牆規則。
僅有私有 ULA 位址並不代表具備公用 IPv6 連線能力。

對於已連接至 Compose 預設網路的服務，以下片段會在該網路上啟用
IPv6；請保留服務、連接埠、磁碟區和組態的其餘內容：

```yaml
networks:
  default:
    enable_ipv6: true
```

若使用具名網路，請在服務實際加入的網路上啟用 IPv6。Docker 可以
配置 ULA 子網路；只有在您的網路有此需求時，才選用明確且不重疊的子網路。
請參閱 [Docker IPv6 網路](https://docs.docker.com/engine/daemon/ipv6/)
和 [Compose 網路選項](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)。

在**以 glibc 為基礎的映像檔**上，`/etc/gai.conf` 可以變更位址選擇。目前的
儲存庫 Dockerfile 使用 Debian；自訂且以 musl 為基礎的映像檔不適用此機制。
回報的調整會將 ULA 標籤從 `label fc00::/7 6` 變更為
`label fc00::/7 1`。請從映像檔的完整原則表開始，並保留其他
項目：新增 `label` 或 `precedence` 項目會取代該預設表，因此只包含
變更行的檔案並不足夠。
[glibc 組態參考](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
記載了這些語意。請將審查過的檔案以唯讀方式繫結掛載至 `/etc/gai.conf`，
並重新建立服務以套用變更。

此操作會變更**該容器中所有對外流量**的作業系統位址選擇。
它不會強制每個應用程式選擇 IPv6：Node 的 DNS 排序和連線
選擇也會造成影響。尤其是，`--dns-result-order=ipv4first` 會優先使用 IPv4，
並不是 IPv4 專屬失敗的解決方法。請參閱 [Node DNS 排序](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)。

進行任何主機層級變更後，請重新測試 Gemini 和其他提供者。若要復原，
請移除自訂的 `gai.conf` 掛載、還原先前的網路組態，並在維護時段內
重新建立受影響的服務／網路。重新建立網路可能會中斷連接至該網路的其他容器；
請勿刪除永久資料磁碟區。

## 重要注意事項

- **SQLite WAL 模式：** 應允許 `docker stop` 完整執行，讓 OmniRoute 能將最新變更檢查點寫回 `storage.sqlite`。隨附的 Compose 檔案已設定 40 秒的停止寬限期。若直接執行映像檔，請保留 `--stop-timeout 40`。
- **`DISABLE_SQLITE_AUTO_BACKUP`：** 若例行／寫入前備份由外部管理，請設為 `true`。現有資料庫的移轉仍需建立其自身的持久安全快照，並使用大量移轉防護機制。
- **資料持久化：** 請務必將磁碟區掛載至 `/app/data`，以便在容器重新啟動後保留資料庫、金鑰與設定。
- **連接埠設定：** 覆寫 `PORT` 環境變數即可變更預設的 `20128` 連接埠。

## 另請參閱

- [VM 部署指南](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare 設定
- [Fly.io 部署指南](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — 部署至 Fly.io
- [環境設定](../reference/ENVIRONMENT.md) — 完整的 `.env` 參考資料
