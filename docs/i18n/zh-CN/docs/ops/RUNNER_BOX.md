# Self-Hosted Runner Box Operations (.113 pool) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

自 2026-10-18 起，自托管池运行在 **.113** 主机（`tomni-proxmox-113`）上。每个
OmniRoute 运行器都有**一个角色**、一个标签，以及根据其工作负载实测结果设定的内存/CPU 预算。
Turbopack 插槽获得构建所需的资源；其他插槽则按照其实际峰值分配资源。只有当 Turbopack 构建、
Release-Green webpack 构建和 lint 作业同时运行时，该主机才会超额分配；主机的交换空间（16 GB）
会吸收超出的部分。由于拉取请求的 Build 在托管运行器上执行，Turbopack 插槽大部分时间都处于空闲状态：

| 运行器               | 标签           | 角色                                                                                                                                      | `MemoryHigh` / `MemoryMax`     | `CPUQuota` |
| -------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------- |
| `omniroute-113-5`    | `omni-build`   | Turbopack 构建：`ci.yml` `Build`（仅 push/dispatch）、Docker amd64、`npm-publish`、`nightly-v4-build`、`preview-artifact`、夜间 a11y 构建 | 56 GB / 60 GB（交换空间 0）    | 1600 %     |
| `omniroute-113-6`    | `omni-release` | Release-Green（`release-green` + `main-green`）、webpack 构建                                                                             | 20 GB / 24 GB（交换空间 4 GB） | 800 %      |
| `omniroute-113-2`    | `omni-light`   | 夜间任务（Schemathesis、promptfoo、garak、k6）和 `quality.yml` `lint-guard`                                                               | 12 GB / 16 GB（交换空间 4 GB） | 600 %      |
| `omniroute-113`      | `omni-light`   | 与上方相同的池                                                                                                                            | 8 GB / 12 GB                   | 400 %      |
| OmniHeuris, OmniMind | （各自的仓库） | 仅 Dependabot（2026-10-18 实测每个峰值为 155 MB）                                                                                         | 4 GB / 6 GB                    | 每个 200 % |

2026-10-18 实测：

| 资源      | 数值                         | 对调度的意义                                                                                                                                                                                                                                                                                                                                           |
| --------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU | **78 GB / 32 核**            | 未设上限时，一次 Turbopack 生产构建的峰值为 49 GB（`tests/unit/ci-build-bundler-webpack.test.ts`）；在 Next 16.3.8 上，仅编译阶段就会占用约 40 GB（`next-build` 中 36 GB RSS，另有 17 个各占 3 GB 的 loader worker，实测于 2026-10-18）；一次 webpack 构建约占 14–16 GB。一个 Turbopack 构建和一个 webpack 构建可以同时容纳；两个 Turbopack 构建则不行 |
| 交换空间  | 16 GB                        | `omniroute-113-5` 在关闭交换空间的情况下运行（`MemorySwapMax=0`），因此失控的构建会在达到上限时被终止，而不是导致整台主机开始使用交换空间                                                                                                                                                                                                              |
| `/tmp`    | **12 GB tmpfs = RAM**        | 任何存放在其中的内容都会占用内存；残留内容会在 3 小时后被清理                                                                                                                                                                                                                                                                                          |
| CPU       | 在 32 核上观察到负载为 60    | 设置配额之前，一个 Turbopack 构建（约 1166 % CPU）加上同一主机上的覆盖率测试套件，会导致其他监听器的心跳无法获得资源（`The self-hosted runner lost communication`，#16853）                                                                                                                                                                            |
| 运行器    | **7 个监听器**（2026-10-28） | 5 个 OmniRoute + OmniHeuris + OmniMind；`omniroute-113-7` 同时承载 `omni-build`；`omniroute-113-3/-4/-8` 已从仓库中删除（2026-10-28）                                                                                                                                                                                                                  |

这些限制位于各单元的 `/etc/systemd/system/actions.runner.<…>.service.d/override.conf`
中（之前的值保存在 `override.conf.bak-20261018`），并通过
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` 实时应用——无需重启，因此没有
影响任何正在运行的作业。标签通过运行器 API 更改
（`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`），同样实时生效。

## 安装清理程序（一次性，在服务器上操作）

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron（root）：每 30 分钟运行一次，日志写入 /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=8 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

必须安装 `lsof`：清理程序会通过一次打开文件快照来确认路径处于空闲状态，
然后才将其删除；如果没有该工具，它不会删除任何内容，并会明确说明
（退出码 1）。进行任何更改前，请先使用 `--dry-run` 试运行——它会准确打印将要
执行的操作，但不会改动任何内容。

每次运行时，它会执行以下操作：清理我们自己遗留的文件（`runner-*`、`omniroute-*`、
`next-build*`、`e2e-build.tar.gz`），在 **tmpfs 上超过 3 小时**以及磁盘上的
`_work/_temp` 中超过 24 小时后进行清理；终止运行时间超过 75 分钟的 `next-build`
（没有任何作业会运行这么久——2026-08-27，在 GitHub 已宣布某项作业丢失后，该作业
仍运行了 70 分钟）；清理单元已**停止**的 runner 中超过 48 小时的 checkout；
在磁盘使用率 ≥ 85%、内存 PSI `full/avg60` ≥ 10%，以及监听器数量超过
`MAX_ACTIVE_RUNNERS` 时发出警报（并细分为 omniroute/其他）。退出码 1 = 需要处理；
请查看日志。

75 分钟规则无法捕获 GitHub 已放弃但仍在运行的构建。当
`Runner.Listener` 无法续订其作业时，`_diag/Runner_*.log` 会显示
`POST request to …/renewjob timed out after 100 seconds`，API 会在最后一次成功续订后
约十分钟将作业报告为 `completed`（失败），而 `next-build` 会在没有关联作业的情况下
继续运行（2026-10-18：#17066 的 Build 在 19:43 被标记为失败，但五分钟后其构建仍
占用 40 GB）。在最新的 `_diag/Worker_*.log` 中确认 ref，然后仅按 PID 对构建进程树
发送 SIGTERM——包括 `next-build`、`npm run build`、`build-next-isolated.mjs` 和
`_work` worker。切勿触碰 `Runner.Listener`、`RunnerService.js` 或 `Runner.Worker`：
worker 会将作业报告为已取消，而监听器会自行恢复上线。

## Runner 单元：KillMode

runner 的默认 `KillMode=process` 会在单元停止或重启后留下仍在运行的
`Runner.Worker → npm → next-build`——孤儿构建会在没有关联作业的情况下继续消耗内存和
CPU。每个 OmniRoute 单元都带有一个 drop-in 配置
（`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`），
其中设置了 `KillMode=mixed`：先向监听器发送 SIGTERM，然后在达到 `TimeoutStop` 时向
整个 cgroup 发送 SIGKILL。该设置会在单元下次重启时生效——每次**仅重启一个 runner，
并且只能在其空闲时进行**，同时必须在同一条命令中执行空闲检查和重启。

## 操作规则

- **同一时间只运行一个 Turbopack 构建——通过标签强制实施。** 每个运行完整 Turbopack
  `next build` 的作业都以 `[self-hosted, omni-build]` 为目标，并且只有 **`omniroute-113-5`** 带有该
  标签：`ci.yml` 的 `Build`、`npm-publish.yml` 的 `publish`、`nightly-v4-build`、`preview-artifact`、
  夜间 a11y 构建 (#16853)，以及 `docker-publish.yml` 的 **amd64**（BuildKit 内使用 webpack——
  Turbopack 曾在那里出现 panic，运行 33253576569）。arm64 Docker 分支仍在 `ubuntu-24.04-arm` 上运行。
  `docker-publish` 的 amd64 与 `ci.yml` 的 `Build` 共享 `heavy-build-main` 并发组
  (`cancel-in-progress: false`)。`omniroute-113-5` 上必须安装 Docker Engine。78 GB 无法容纳第二个
  Turbopack 槽位（2 × 33–37 GB，再加上该主机上的其余负载）；第二个槽位仅对 webpack 构建是安全的。
- **拉取请求构建在托管运行器上运行 (2026-10-18)。** `ci.yml` 的 `Build` 仅针对
  `push` 和 `workflow_dispatch` 使用 `omni-build`；所有 `pull_request`（同源或 fork）以及
  `merge_group` 构建都在 `ubuntu-latest` 上使用 webpack 运行。当每个同源 PR 都被路由到该槽位时，
  一个 Turbopack 构建会占用它 29–58 分钟，18 个构建最长排队 18 小时，而发布分支自身的 push 构建
  在 40 个作业中仅有一次获得该槽位。在托管运行器上，同一个 PR 构建与该 PR 的其他作业并行运行时
  只需 8–12 分钟。`npm-publish` 发布时使用的打包器 Turbopack 仍会在发布分支上得到验证：默认分支的
  夜间 a11y 构建 (04:41 UTC)、每个获得该槽位的 push 或手动触发构建，以及 `npm-publish` 本身都会使用它。
  `tests/unit/build/heavy-build-queue.test.ts` 固定了这一四条件门禁。
- **绝不能将 Turbopack 槽位的容量设为低于实测需求。** 在 2026-10-18 18:06，为了给 `omni-release`
  腾出空间，该槽位从 56G/60G 下调到 40G/44G。整个运行期间，编译阶段始终处于 `MemoryHigh`
  限制（内存 PSI `full` 为 30–43 %），而共享该 cgroup 的 `Runner.Listener` 无法续租其作业。
  当天恢复了 2026-10-17 时原有的 56G/60G 配置。低于该值时，构建不会直接失败；它会陷入抖动，
  最终导致作业丢失。
- **Release-Green 拥有自己的槽位 (2026-10-18)。** 在此之前，两项 Release-Green 验证都在
  `omni-build` 上运行：每次 push 都会运行（约 10 次/小时；一天内 100 次 push 运行中有 97 次
  在执行过程中被取消），此外每天还有三次约 2 小时的完整扫描（05:29 的扫描为等待槽位排队了 6 小时）——
  单个构建槽位的超额订阅达到数倍，同源 PR 构建需要等待数小时。`release-green` 和 `main-green`
  现在以 `omni-release`（仅 `omniroute-113-6`）为目标，并设置 `OMNIROUTE_USE_TURBOPACK=0`；
  已启动的运行不再因新的 push 而取消（等待中的槽位仍会合并这类触发风暴）。
  `tests/unit/build/runner-capacity-routing.test.ts` 固定了路由、webpack 开关，并确保
  `omni-release` 上没有任何构建使用 Turbopack。
- **轻量池：`omni-light`。** `omniroute-113` 和 `omniroute-113-2` 运行仅需要后端
  `next build` 的夜间任务（约 5–6 GB；webpack），以及 `quality.yml` 的 `lint-guard`。
  `omniroute-113` 在 2026-10-18 之前一直设置为 `MemoryHigh=4G`——promptfoo 构建在那里因内存回收
  而艰难运行了 54 分钟；提高到 8 GB 后可消除限流。
- **有意减少监听器数量。** 2026-08-29 禁用了四个 OmniRoute 单元——每增加一个监听器，就会为上述
  内存预算增加一个租户。清理程序的上限为 8（cron 中的 `MAX_ACTIVE_RUNNERS=8`）：它会统计该主机上的
  每个 `Runner.Listener`，而 OmniHeuris 和 OmniMind 在我们的五个监听器之外又增加了两个。
- **Unit 和 Vitest 作业保留在托管运行器上。** 只有当仓库变量 `vars.USE_VPS_TEST_RUNNER` 为 `true` 时，`ci.yml` 才会把其单元测试分片和 Vitest 作业发送到 `[self-hosted, omni-ci]`，而且即便如此也只针对同一仓库的 `pull_request` 运行；fork、`merge_group` 和推送仍在 `ubuntu-latest` 上运行（`tests/unit/vps-runner-variable-scope.test.ts`）。该变量为 `false`。2026-10-28，三个 4 核 `omni-ci` 监听器执行 `npm ci` 耗时 250–270 秒，且每个单元测试分片都触及 30 分钟的作业时限，而托管分片约需 634 秒，当时主机负载为 17–24。这些监听器已被删除。在没有按单元测试分片规格配置的监听器之前，不要重新开启该变量。
- **任何运行器繁忙时，绝不能手动清理 `/tmp` 或 `_work`。** 先检查、隔一段时间再删除的操作，
  正是 2026-08-27 一个正在运行的 Build 作业丢失其 `_work` 的原因。清理程序会在一个步骤中完成检查
  和删除；让它来处理。
- 在作业执行过程中停止运行器会取消该作业（已在线实测）：仅当其监听器没有 `Runner.Worker`
  子进程时才能执行 `systemctl stop`——并且要用一条命令完成。
- 工作流不得将产物存放在 `/tmp` 中（它位于 RAM 上）。应下载到 `$RUNNER_TEMP`
  （每个运行器各自使用的磁盘目录）——1.3 GB 的 `next-build` 产物下载到 tmpfs 花费了 27–32
  分钟，而从磁盘上传只需 2 分钟。
- `.15` VPS 仅用于验收环境——绝不运行 CI 运行器。

## 托管通道（GitHub-hosted runners）

该仓库属于 `cheaper-inference` 组织，使用 **Team** 计划：**60 个并发托管作业**，由组织内的所有仓库、所有 PR 检查、所有由推送触发的工作流以及 CodeQL 的默认设置共享。下文数据是在 **Pro** 计划（40 个并发托管作业）下测得的。2026-10-18 在一次合并活动期间（`release/v3.8.52` 上约每小时合并 10 次）测得：**24 小时内创建了 2,500 次工作流运行**，6 小时内向该分支推送了 44 次，**106 个托管作业排队等待**，与此同时，PR 检查等待了数小时，并且 PR 在未完成这些检查的情况下被合并。每次推送到该分支时都会触发九个工作流：

| 每次推送到 `release/v*`                     | 托管作业数 | 风暴期间的结果                                                     | 自 2026-10-18 起                                                            |
| ------------------------------------------- | ---------: | ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `ci.yml`（完整矩阵）                        |    最多 30 | 被下一次推送取消，一天内 24 次全部取消                             | 不再因推送到 `release/**` 而启动（PR 运行 + Release-Green）                 |
| `quality.yml`                               |         ~6 | 被取消，23 次全部取消                                              | 不再因推送到 `release/**` 而启动                                            |
| `Release-Green` `--quick`                   |          0 | 在 `omni-build` 上运行，100 次中有 97 次被取消                     | 使用 `omni-release` 槽位，永不取消，待处理的运行会合并                      |
| `Lock released branch`、`OpenSSF Scorecard` |          2 | 每次推送产生一个排队运行                                           | 每个 ref 一次运行（`tests/unit/build/hosted-lane-concurrency.test.ts`）     |
| `Release acceptance`（影子报告）            |          1 | 每次推送产生一个托管的 `npm ci`，且永不取消                        | 未更改——适合添加 `paths:` 过滤器                                            |
| `Publish to Docker Hub` → `Deploy to VPS`   |          2 | 每次推送都会取消；amd64 执行分支在 `omni-build` 上争用资源         | 未更改——所有者的部署通道                                                    |
| CodeQL 默认设置（`dynamic`）                |          4 | 每次推送运行 `javascript-typescript`、`actions`、`c-cpp`、`python` | 未更改——Settings → Code security；`c-cpp`/`python` 在此处没有任何可扫描内容 |

`tests/unit/build/push-storm-diet.test.ts` 固定了 `ci.yml` 和 `quality.yml` 仅在推送到 `main` 时触发的配置。副作用：Codecov 不再针对每次发布分支推送接收基础上传（该步骤仅供参考，并设有 `continue-on-error`）；仓库内的覆盖率门禁和 PR 评论不受影响。

**增加自托管容量无法解决托管队列问题。** devbox
（`devbox-vm-06-dev002`，24 vCPU / 54 GB）可以托管一个 runner，但 agent 会话已经使其负载保持在 20–26，agent 容器没有 Docker daemon，而且饱和的是托管通道。在同一时刻，`.113` 主机有 71 GB 可用空间，负载为 5–8；其限制是上述每个 listener 的内存预算（上限为 6 个 listener），而不是 CPU。剩余的调节手段属于流程层面：通过 Mergify 队列合入活动 PR（`label=queue`，批次共享一次 `merge_group` CI 运行，而不是每个 PR 运行一次、每次推送再运行一次）、精简 CodeQL 默认设置中的语言，并根据 `release-acceptance.yml` 所读取的文件为其添加过滤条件。
