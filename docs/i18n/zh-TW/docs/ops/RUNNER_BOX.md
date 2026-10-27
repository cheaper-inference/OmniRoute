# Self-Hosted Runner Box Operations (.113 pool) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md)

---

自架集區執行於 **.113** 主機（`tomni-proxmox-113`）上。自 2026-10-18 起，每個
OmniRoute runner 都只有**一種角色**、一個標籤，以及依其工作負載實測結果配置的記憶體／CPU
預算。Turbopack 執行槽會取得建置所需的資源；其他執行槽則依其實測峰值配置。
只有當 Turbopack 建置、Release-Green webpack 建置與 lint 工作同時執行時，該主機才會超額配置；
主機 swap（16 GB）會吸收超出的部分，而且由於 pull request 的 Builds 在託管環境中執行，
Turbopack 執行槽大多數時間都處於閒置狀態：

| runner               | 標籤            | 角色                                                                                                                                        | `MemoryHigh` / `MemoryMax` | `CPUQuota` |
| -------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| `omniroute-113-5`    | `omni-build`    | Turbopack 建置：`ci.yml` `Build`（僅限 push/dispatch）、Docker amd64、`npm-publish`、`nightly-v4-build`、`preview-artifact`、每晚 a11y 建置 | 56 GB / 60 GB（swap 0）    | 1600 %     |
| `omniroute-113-6`    | `omni-release`  | Release-Green（`release-green` + `main-green`）、webpack 建置                                                                               | 20 GB / 24 GB（swap 4 GB） | 800 %      |
| `omniroute-113-2`    | `omni-light`    | 每晚工作（Schemathesis、promptfoo、garak、k6）以及 `quality.yml` `lint-guard`                                                               | 12 GB / 16 GB（swap 4 GB） | 600 %      |
| `omniroute-113`      | `omni-light`    | 與上述相同的集區                                                                                                                            | 8 GB / 12 GB               | 400 %      |
| OmniHeuris, OmniMind | （各自的 repo） | 僅執行 Dependabot（各自峰值為 155 MB，2026-10-18）                                                                                          | 4 GB / 6 GB                | 各 200 %   |

2026-10-18 實測：

| 資源      | 數值                      | 對排程的意義                                                                                                                                                                                                                                                                                                                                  |
| --------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 核心**       | 未設上限的 Turbopack production 建置峰值為 49 GB（`tests/unit/ci-build-bundler-webpack.test.ts`）；在 Next 16.3.8 上，僅編譯階段就會占用約 40 GB（`next-build` 中 36 GB RSS，加上 17 個各占 3 GB 的 loader worker，於 2026-10-18 實測）；webpack 建置約占 14–16 GB。一個 Turbopack 與一個 webpack 建置可以同時容納；兩個 Turbopack 建置則不行 |
| swap      | 16 GB                     | `omniroute-113-5` 執行時停用 swap（`MemorySwapMax=0`），因此失控的建置會在達到上限時被終止，而不會因使用 swap 拖垮整台主機                                                                                                                                                                                                                    |
| `/tmp`    | **12 GB tmpfs = RAM**     | 放在此處的任何內容都會占用記憶體；殘留內容會在 3 小時後清除                                                                                                                                                                                                                                                                                   |
| CPU       | 在 32 核心上觀察到負載 60 | 在設定 quota 之前，一個 Turbopack 建置（約 1166 % CPU）加上同一台主機上的 coverage suite，曾導致其他 listener 的 heartbeat 無法獲得資源（`The self-hosted runner lost communication`，#16853）                                                                                                                                                |
| runners   | **6 個 listener**         | 4 個 OmniRoute，加上 OmniHeuris 與 OmniMind；`omniroute-113-3/-4/-7/-8` 已停用（使用 `systemctl enable --now` 可重新啟用其中一個）                                                                                                                                                                                                            |

這些限制位於各 unit 的 `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
中（先前的值保留為 `override.conf.bak-20261018`），並已透過
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` 即時套用——無須重新啟動，因此沒有
影響任何執行中的工作。標籤則透過 runners API 變更
（`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`），同樣是即時生效。

## 安裝清理程式（僅需一次，在主機上執行）

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron（root）：每 30 分鐘執行一次，記錄至 /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

必須安裝 `lsof`：清理程式會透過一次開啟檔案快照來確認路徑處於閒置狀態，
然後才將其移除；若沒有此工具，它不會移除任何內容，並會明確指出原因
（exit 1）。任何變更都應先使用 `--dry-run` 測試——它會準確列出將執行的
操作，而且不會修改任何內容。

每次執行時會進行以下操作：清理由我們產生的殘留項目（`runner-*`、`omniroute-*`、
`next-build*`、`e2e-build.tar.gz`），在 **tmpfs 上超過 3 小時**或磁碟上的
`_work/_temp` 中超過 24 小時後移除；終止執行超過 75 分鐘的 `next-build`
（沒有任何任務會執行這麼久——在 2026-08-27，某次執行在 GitHub 已將其任務
判定為遺失後仍持續了 70 分鐘）；清除所屬單元已**停止**之 runner 的 48 小時前
checkout；在磁碟使用率 ≥ 85%、記憶體 PSI `full/avg60` ≥ 10%，或 listener 數量
超過 `MAX_ACTIVE_RUNNERS` 時發出警示（並列出 omniroute/其他的細分資訊）。
exit 1 = 需要處理；請查看日誌。

75 分鐘規則無法攔截 GitHub 已放棄其任務的建置。當
`Runner.Listener` 無法續約其任務時，`_diag/Runner_*.log` 會顯示
`POST request to …/renewjob timed out after 100 seconds`；API 會在最後一次成功續約後
約十分鐘將任務回報為 `completed`（失敗），但 `next-build` 仍會在未連結任何任務的
情況下繼續執行（2026-10-18：#17066 的建置在 19:43 被判定失敗，但其建置程序在五分鐘後
仍占用 40 GB）。請先在最新的 `_diag/Worker_*.log` 中確認 ref，然後依 PID 僅對建置程序樹
傳送 SIGTERM——包括 `next-build`、`npm run build`、`build-next-isolated.mjs` 與
`_work` worker。絕對不要動到 `Runner.Listener`、`RunnerService.js` 或 `Runner.Worker`：
worker 會將任務回報為已取消，而 listener 會自行恢復上線。

## Runner 單元：KillMode

Runner 的預設 `KillMode=process` 會在單元停止或重新啟動後，留下仍在執行的
`Runner.Worker → npm → next-build`——孤立的建置程序會在未連結任何任務的情況下，
持續消耗 RAM 與 CPU。每個 OmniRoute 單元都包含一個 drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)，
其中設定了 `KillMode=mixed`：先向 listener 傳送 SIGTERM，並在達到
`TimeoutStop` 時向整個 cgroup 傳送 SIGKILL。此設定會在單元下次重新啟動時生效——
每次僅重新啟動**一個 runner，且只能在其閒置時執行**，並將閒置檢查與重新啟動放在
同一個命令中。

## 操作規則

- **一次只能執行一個 Turbopack 建置——透過標籤強制執行。** 每個執行完整 Turbopack
  `next build` 的工作都以 `[self-hosted, omni-build]` 為目標，而且只有 **`omniroute-113-5`** 帶有該
  標籤：`ci.yml` 的 `Build`、`npm-publish.yml` 的 `publish`、`nightly-v4-build`、`preview-artifact`、
  每夜 a11y 建置（#16853），以及 `docker-publish.yml` 的 **amd64**（在 BuildKit 內使用 webpack——
  Turbopack 曾在該處發生 panic，執行編號 33253576569）。arm64 Docker 工作仍在 `ubuntu-24.04-arm` 上執行。
  `docker-publish` 的 amd64 與 `ci.yml` 的 `Build` 共用 `heavy-build-main` 並行群組
  （`cancel-in-progress: false`）。Docker Engine 必須位於 `omniroute-113-5`。第二個 Turbopack
  槽位無法容納於 78 GB 中（2 × 33–37 GB，再加上機器其餘部分）；第二個槽位僅對
  webpack 建置安全。
- **提取要求的建置在託管執行器上執行（2026-10-18）。** `ci.yml` 的 `Build` 僅在
  `push` 與 `workflow_dispatch` 時進入 `omni-build`；所有 `pull_request`（同來源或 fork）及
  `merge_group` 建置都在 `ubuntu-latest` 上使用 webpack 執行。當每個同來源 PR 都被導向該槽位時，
  一個 Turbopack 建置會占用它 29–58 分鐘，18 個建置最長排隊 18 小時，而發布線自己的 push 建置
  在 40 個工作中僅有一次取得該槽位。在託管執行器上，相同的 PR 建置與該 PR 的其他
  工作並行時只需 8–12 分鐘。`npm-publish` 所發布的打包器 Turbopack，仍會在發布線上透過
  預設分支的每夜 a11y 建置（04:41 UTC）、每個進入該槽位的 push 或 dispatch 建置，
  以及 `npm-publish` 本身進行驗證。`tests/unit/build/heavy-build-queue.test.ts`
  固定了這個四條件閘門。
- **絕不可將 Turbopack 槽位配置得低於其實測需求。** 在 2026-10-18 18:06，為了替
  `omni-release` 騰出空間，該槽位從 56G/60G 降至 40G/44G。整個執行期間，編譯階段都停留在
  `MemoryHigh`（記憶體 PSI `full` 為 30–43 %），而共用該 cgroup 的 `Runner.Listener`
  無法續約其工作。當天已恢復為擁有者於 2026-10-17 設定的 56G/60G。
  低於該數值時，建置不會直接失敗；它會反覆換頁，而工作最終會遺失。
- **Release-Green 擁有自己的槽位（2026-10-18）。** 在此之前，兩項 Release-Green 驗證都在
  `omni-build` 上執行：每次 push（約 10 次/小時；一天內 100 次 push 執行中有 97 次在工作途中取消）
  以及每天三次約 2 小時的完整掃描（05:29 的掃描等待該槽位達 6 小時）——單一建置
  槽位的需求超出容量數倍，同來源 PR 建置也因此等候數小時。
  `release-green` 與 `main-green` 現在以 `omni-release`（僅 `omniroute-113-6`）為目標，並設定
  `OMNIROUTE_USE_TURBOPACK=0`；已開始的執行不再因較新的 push 而取消（等待中的槽位仍會合併這波大量請求）。
  `tests/unit/build/runner-capacity-routing.test.ts`
  固定了路由、webpack 切換，以及 `omni-release` 上不得使用 Turbopack 建置的規則。
- **輕量集區：`omni-light`。** `omniroute-113` 與 `omniroute-113-2` 執行需要
  僅後端 `next build`（約 5–6 GB；webpack）的每夜工作，以及 `quality.yml` 的 `lint-guard`。直到
  2026-10-18，`omniroute-113` 的 `MemoryHigh=4G`——promptfoo 建置在該處歷經 54 分鐘的反覆回收才完成；
  8 GB 可消除節流。
- **刻意減少監聽器數量。** 2026-08-29 已停用四個 OmniRoute 單元——每個額外的
  監聽器都是上述記憶體預算的另一個租戶。清理程式上限為 6（cron 中的 `MAX_ACTIVE_RUNNERS=6`）：它會計算
  機器上的每個 `Runner.Listener`，而 OmniHeuris + OmniMind 會在我們的四個之外再增加兩個。
- **任何執行器忙碌時，絕不可手動清理 `/tmp` 或 `_work`。** 先檢查後刪除且兩者之間
  存在時間間隔，正是 2026-08-27 一個執行中的 Build 工作遺失其
  `_work` 的原因。清理程式會在單一步驟中完成檢查與移除；
  交給它處理。
- 在工作進行途中停止執行器會取消該工作（已在實際環境中觀察到）：僅當監聽器沒有
  `Runner.Worker` 子行程時才能執行 `systemctl stop`——而且必須在單一命令中完成。
- 工作流程不得將產物存放在 `/tmp`（它位於 RAM 中）。請下載至
  `$RUNNER_TEMP`（位於磁碟上，且每個執行器各自獨立）——1.3 GB 的 `next-build` 產物寫入 tmpfs
  需要 27–32 分鐘，而從磁碟上傳只需 2 分鐘。
- `.15` VPS 僅供驗收測試使用——絕不執行 CI 執行器。

## 託管通道（GitHub-hosted runners）

此帳戶使用 **Pro** 方案：**40 個並行託管作業**，由所有 PR 檢查、所有由推送觸發的工作流程，以及 CodeQL 的預設設定共用。於 2026-10-18 的一次合併行動期間測得（`release/v3.8.52` 上約每小時 10 次合併）：**24 小時內建立了 2,500 次工作流程執行**，6 小時內有 44 次推送至該分支，PR 檢查等待數小時期間，有 **106 個託管作業排入佇列**，而 PR 在未完成這些檢查的情況下即被合併。每次推送至該分支時，都會觸發九個工作流程：

| 每次推送至 `release/v*`                     | 託管作業數 | 大量觸發期間的結果                                                 | 自 2026-10-18 起                                                          |
| ------------------------------------------- | ---------: | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `ci.yml`（完整矩陣）                        |    最多 30 | 被下一次推送取消；一天內 24 次全數取消                             | 不會因 `release/**` 推送而啟動（PR 執行 + Release-Green）                 |
| `quality.yml`                               |         ~6 | 被取消；23 次全數取消                                              | 不會因 `release/**` 推送而啟動                                            |
| `Release-Green` `--quick`                   |          0 | 在 `omni-build` 上執行；100 次中有 97 次被取消                     | 使用 `omni-release` 時槽、絕不取消，待處理的執行會合併                    |
| `Lock released branch`、`OpenSSF Scorecard` |          2 | 每次推送都有一次執行排入佇列                                       | 每個 ref 執行一次（`tests/unit/build/hosted-lane-concurrency.test.ts`）   |
| `Release acceptance`（影子報告）            |          1 | 每次推送都有一次託管的 `npm ci`，且從未取消                        | 不變——適合加入 `paths:` 篩選條件                                          |
| `Publish to Docker Hub` → `Deploy to VPS`   |          2 | 每次推送時均被取消；amd64 執行分支會競爭 `omni-build`              | 不變——擁有者的部署通道                                                    |
| CodeQL 預設設定（`dynamic`）                |          4 | 每次推送執行 `javascript-typescript`、`actions`、`c-cpp`、`python` | 不變——Settings → Code security；`c-cpp`/`python` 在此處沒有任何可掃描內容 |

`tests/unit/build/push-storm-diet.test.ts` 固定了 `ci.yml` 與 `quality.yml` 僅限 `main` 的推送觸發條件。副作用：Codecov 不再於每次 release 推送時收到基準上傳（該步驟僅供參考，且設有 `continue-on-error`）；儲存庫內的覆蓋率閘門與 PR 留言不受影響。

**增加自架容量無法解決託管佇列問題。** devbox（`devbox-vm-06-dev002`，24 vCPU / 54 GB）可以託管 runner，但代理程式工作階段已使其負載維持在 20–26，代理程式容器也沒有 Docker daemon，而已飽和的是託管通道。同一時間，`.113` 主機有 71 GB 可用空間，負載為 5–8；它的限制是上述每個 listener 的記憶體預算（上限為 6 個 listener），而非 CPU。剩餘可採取的手段都屬於流程層面：透過 Mergify 佇列合併行動中的 PR（`label=queue`；批次共用一次 `merge_group` CI 執行，而不是每個 PR 執行一次、每次推送再執行一次）、精簡 CodeQL 預設設定中的語言，以及依照 `release-acceptance.yml` 所讀取的檔案加以篩選。
