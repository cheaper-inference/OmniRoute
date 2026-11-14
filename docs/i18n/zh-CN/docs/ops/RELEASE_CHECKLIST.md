# Release Checklist (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **最后更新：** 2026-08-28 — v3.8.51
> 使用 Claude Code 技能实现自动化，从而简化发布流程。
>
> **在两次发布之间保持队列/分支为绿色：**请参阅 [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> （`/green-prs` 系列 + `npm run check:release-green` + `/babysit` + nightly）。定期运行
> 这些流程——尤其是在执行此检查清单**之前**——可确保发布 PR 从绿色状态开始。

## 概要

```bash
# 1. 提升版本并生成 CHANGELOG（技能）
/version-bump-cc patch    # 或 minor/major

# 2. 在本地运行质量门禁
npm run check              # lint + 测试
npm run test:coverage      # 完整覆盖率门禁（60/60/60/60）

# 3. 构建并进行冒烟测试
npm run build
npm run test:e2e           # 可选，但建议运行

# 4. 生成发布（技能）
/generate-release-cc

# 5. 部署（技能）
/deploy-vps-both-cc        # 或 akamai-cc / local-cc

# 6. 捕获发布证据（技能）
/capture-release-evidences-cc
```

## npm 可信发布（自 v3.8.51 起为默认方式）— 按需暂存，直接发布作为后备方案

默认情况下，`npm-publish.yml` 通过 **npm 可信发布（OIDC）**进行发布：
`stage-npm` 作业（由 GitHub 托管）会在该次运行中使用 GitHub 的 id-token 换取一个短期 npm
凭证——仓库机密中无需保存长期 npm 令牌，无需进行 2FA 提示，并附带来源证明。
如今，可绕过 2FA 的令牌正在被逐步淘汰，这正是 npm 批准的绕过方式；
它恢复了项目截至 v3.8.48 所采用的全自动流程，同时保留
WS1.3 保证（泄露的令牌无法单独执行发布——因为根本不存在令牌）。

**一次性设置（所有者）：**npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub：owner `diegosouzapw`、repo `OmniRoute`、workflow `npm-publish.yml`
（environment：none）。在完成该设置之前，自动步骤将以 `ENEEDAUTH` 失败：
请使用 `publish_mode=staged`（见下文）或 `direct` 重新分派。

### 暂存发布（按需使用 — `publish_mode=staged`）

npm-publish 工作流不再直接发布：它会启动打包后的 tarball
（`check:pack-boot`），然后运行 `npm stage publish`——完全相同的字节会被暂存在
注册表中，但在所有者批准之前**无法安装**。人工 2FA 门禁已移至验证之后，
而非验证之前。

**工作流变为绿色后，所有者执行的流程：**

1. `npm stage list omniroute`——查找暂存 ID（也会显示在工作流摘要中）。
2. 验证暂存的字节（建议）：运行 `npm stage download <id>`，然后将下载的
   tarball 安装到临时前缀中并启动它（`npm run check:pack-boot` 会在 CI 中自动执行
   相同的打包→安装→启动判定）。
3. `npm stage approve <id>`——2FA 提示本身即为发布操作。`npm stage reject <id>` 会将其丢弃。
4. 发布后安全网：发布后验证器（v3.8.49 计划中的 WS1.4）会在干净的容器中从
   公共注册表安装已发布的版本并启动它。

**紧急后备方案：**通过 `workflow_dispatch` 并设置 `publish_mode=direct`，可恢复
旧版的即时 `npm publish`（仅当暂存功能本身出现异常时使用；需记录原因）。

**一次性加固（所有者，npmjs.com）：**为
`omniroute` 配置仅暂存模式的 Trusted Publisher，使泄露的长期令牌无法从任何位置直接执行
`npm publish`——CI 只能暂存；只有所有者的 2FA 才能正式发布。

**损坏制品处理手册（未更改）：**默认应立即执行
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
（数分钟内生效、可逆）；仅可在 72 小时/无依赖项的窗口期内使用 `npm unpublish`，
且绝不能将其作为首选操作。Docker：切勿重写版本标签——回滚是将
`latest` 重新指向最后一个正常的摘要。

**Docker Hub `latest`（每次发布稳定 SemVer 版本时均为必需）：**
`docker-publish` 工作流必须同时标记 **`X.Y.Z`**，并且在
`should-promote-latest.sh` 确认该版本是最高的稳定 SemVer 时，还必须使用
**相同的摘要**标记 `:latest`。作业完成后：Hub 中 `latest` 的摘要必须等于新的
SemVer 摘要，且 `last_updated` 已更新。不要让 `:latest` 继续指向较旧的
构建，而发布说明却在介绍仅存在于 git 中的修复。Compose
快速入门使用 `:latest`；GitOps 应继续固定到 `X.Y.Z`。请参阅
[Docker 发布通道](../guides/DOCKER_GUIDE.md#release-channels)和 #10317。

## 热修复快速通道（标签 `hotfix`）

带有 `hotfix` 标签的 PR 会跳过繁重的 CI 矩阵（9 分片 E2E、覆盖率棘轮、
质量门禁、扩展质量检查），并保留快速且高信号的门禁：构建、
单元测试分片、集成测试、vitest、lint/类型检查、文档同步、`check:pack-artifact`
以及 tarball 启动冒烟测试（`check:pack-boot`）。目标：在 ≤15 分钟内通过，而不是约 33 分钟。

**准入策略——必须同时满足以下四项（参考 Chromium/VS Code/Node 紧急通道）：**

1. **严重程度**：生产环境已中断——已发布的制品在启动时崩溃 /
   安全修复 / 此版本的所有用户均受影响。“重要”不等于“中断”。
2. **权限**：只有仓库所有者可以添加 `hotfix` 标签。该标签本身即表示
   批准——绝不可在活动 PR 上自行使用。
3. **证据**：PR 正文须链接到上一次繁重套件完全通过的运行记录（即被跳过的
   作业原本会重新验证的套件），以及针对该修复先失败后通过的测试。
4. **范围**：仅限 cherry-pick——只包含最小修复，不得重构，不得夹带其他更改。

被跳过的覆盖率/棘轮检查范围会由发布分支上的下一次完整运行重新验证
（持续保持发布分支为绿色）——该通道只跳过等待，绝不跳过验证。
仅测试的差异（所有文件均位于 `tests/` 下，且均不位于 `tests/e2e/` 下）会自动跳过 E2E
矩阵，无需任何标签。

## 详细清单

### 预发布

- [ ] 所有针对此版本的PRs都合并到`release/vX.Y.0`
- [ ] 此版本的所有开放Linear/issue项目均已关闭或推送到下一个里程碑
- [ ] `release/vX.Y.0`分支上的CI绿色
- [ ] 代码中没有`TODO(release)`标记： `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker基础镜像是最新的（当前是`node:24.15.0-trixie-slim`）

### 版本和变更日志

- [ ] 运行`/version-bump-cc <patch|minor|major>` （Claude代码技巧）
  - 凸块`package.json`, `electron/package.json`
  - 从最后一个标签以来的 git 提交重新生成`CHANGELOG.md`
  - 更新README.md徽章
- [ ] 如果需要，手动审查CHANGELOG.md并清理提交消息
- [ ] 确保`CHANGELOG.md`中最新的 semver 部分等于`package.json`版本
- [ ] 将`## [Unreleased]`保留为后续工作的第一个变更日志部分
- [ ] 更新`docs/openapi.yaml` → `info.version`必须等于`package.json`版本

### 代码质量

- [ ] `npm run lint` — 0 个错误（警告是预先存在的）
- [ ] `npm run typecheck:core` —干净
- [ ] `npm run typecheck:noimplicit:core` —干净（严格）
- [ ] `npm run check:cycles:ratchet` —在冻结的`metrics.cycles`上限内（裸`check:cycles`在任何周期上退出 1， #15281）
- [ ] `npm run check:any-budget:t11` —在预算范围内
- [ ] `npm run check:route-validation:t06` —干净
- [ ] `npm run check:node-runtime` —支持的运行时底线满足（`>=22.22.2 <23`、 `>=24.0.0 <27`、 `src/shared/utils/nodeRuntimeSupport.ts`中的`SUPPORTED_NODE_RANGE` ；与`package.json` `engines`对齐）

### 测试

- [ ] `npm run test:unit` —通行证
- [ ] `npm run test:vitest` — pass（MCP服务器， autoCombo，缓存）
- [ ] `npm run test:coverage` —门60/60/60/60满足 (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass（如果更改请触摸DB / 处理程序）
- [ ] `npm run test:combo:matrix` — pass（组合策略矩阵：确定性地证明所有22个公共路由策略的选择决策；在接触组合路由、策略解析或后备逻辑时运行）
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` —**optional/manual** （门控真实上游烟雾；从VPS `root@192.168.0.15`获取只读DB快照；命中真实提供者，花费积分；从不在CI中运行；没有门就干净地跳过）
- [ ] `npm run test:combo:live:vps` —**optional/manual** （Phase-3 VPS live Smoke：通过普通 Node ESM针对实时`.15`服务器的 7 个HTTP场景；需要`ssh root@192.168.0.15`； creates/deletes仅`__live_test__*`组合；命中真正的提供者；从不在CI中运行）
- [ ] `npm run test:e2e` —通行证（UI更改）
- [ ] `npm run test:protocols:e2e` —通行证（MCP/A2A更改）
- [ ] `npm run test:ecosystem` —通行证

### 挂钩（哈士奇验证）

Husky hooks 存在于`.husky/`中并在 git 操作上自动运行。

- **预提交：** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **预推：**快速确定性门— `npm run check:any-budget:t11 && npm run check:tracked-artifacts` （于 2026 年 6 月 13 日激活）。有意排除`test:unit` （慢；由CI `test-unit`作业覆盖）。
  - 在推送发布分支之前手动运行`npm run test:unit` 。

如果挂钩失败：修复根本问题，不要使用`--no-verify`绕过。

### 常规提交

所有与发布相关的提交都必须遵循`type(scope): subject`格式。

**有效类型：** `feat`、 `fix`、 `refactor`、 `docs`、 `test`、 `chore`、 `perf`、 `style`、 `ci`

**有效范围：** `db`、 `sse`、 `oauth`、 `dashboard`、 `api`、 `cli`、 `docker`、 `ci`、 `mcp`、 `a2a`、 `memory`、 `skills`、 `cloud-agent`、 `guardrails`、 `compression`、 `auto-combo`、 `resilience`、 `providers`、 `executors`、 `translator`、 `domain`、 `authz`

重大更改：在范围后添加`BREAKING CHANGE:`页脚或`!` （例如`feat(api)!: drop /v0`）。

### 文档

- [ ] `npm run check:docs-sync`通过（通过预提交自动运行）
- [ ] `npm run check:docs-all`通过（总括：docs-sync + docs-counts + env-doc-sync +弃用版本+ doc-links）
- [ ] `npm run check:env-doc-sync`退出 0 —代码↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env 合约完好无损
- [ ] `npm run check:doc-links`退出 0 —重组后没有损坏的内部 Markdown 引用
- [ ] `docs/architecture/ARCHITECTURE.md`审查了storage/runtime漂移
- [ ] `docs/guides/TROUBLESHOOTING.md`审查了环境变量和操作漂移
- [ ] 如果`.env.example`更改： `docs/reference/ENVIRONMENT.md`更新
- [ ] 如果新功能有UI: `docs/guides/USER_GUIDE.md`提到它
- [ ] 如果新功能有API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`已更新
- [ ] 如果新功能是模块：存在专用`docs/<MODULE>.md`
- [ ] 如果发生重大更改： `docs/guides/TROUBLESHOOTING.md`有迁移说明

### 国际化

- [ ] `npm run i18n:check`退出 0 —翻译状态 (`.i18n-state.json`) 与源文档同步（严格模式下没有漂移源；警告模式建议对于最后一刻的文档修饰是可以接受的，但在标记之前应该为 0）
- [ ] `npm run i18n:check-ui-coverage`在每个UI区域设置等于或高于 80% 覆盖下限时退出 0 —
- [ ] `npm run i18n:sync-ui:dry`在所有 66 个目标语言环境中报告 0 个缺失键（除`en`源之外的每个语言环境）
- [ ] 如果源英文文档发生更改，请在标记之前运行`npm run i18n:run` （需要`.env`中的`OMNIROUTE_TRANSLATION_API_KEY` ）
- [ ] 如果翻译贡献较小，可以推迟到下一个版本（在CHANGELOG中跟踪）

### 数据库迁移

- [ ] 如果`src/lib/db/migrations/`有新文件：
  - [ ] 每个迁移都是幂等的（`CREATE TABLE IF NOT EXISTS`等）
  - [ ] 包含在事务中的迁移
  - [ ] 编号正确（顺序无间隙）
- [ ] 全新安装测试：删除`~/.omniroute/omniroute.db`并运行`npm run dev`
- [ ] 对现有安装进行测试：备份DB、运行迁移、验证架构
- [ ] 如果迁移重写表，则正确处理WAL文件（`-wal`、 `-shm`）

### 提供者目录（Zod 验证）

- [ ] `src/shared/constants/providers.ts` Zod架构在加载时有效
  - [ ] 所有提供者都有必填字段（`id`、 `label`、 `kind`等）
  - [ ] `freeNote`为新的免费提供者提供
  - [ ] OAuth提供者已在`src/lib/oauth/constants/oauth.ts`中注册了`oauthConfig`
- [ ] 如果添加了新的提供者： `open-sse/executors/`中对应的执行者
- [ ] 如果非 OpenAI 格式： `open-sse/translator/`中的转换器
- [ ] 在`open-sse/config/providerRegistry.ts`注册的型号
- [ ] `tests/unit/`中的单元测试涵盖提供者分类和路由

### 桌面（Electron）

如果`electron/`改变：

- [ ] `npm run electron:smoke:packaged`通行证
- [ ] 至少针对`:win`、 `:mac`、 `:linux`之一进行测试的构建
- [ ] 代码签名证书未过期（如果签名）
- [ ] `electron/package.json`版本与 root `package.json`匹配
- [ ] 如果发布到`stable`则自动更新通道指针

### 构建布局

存储库使用三个不同的输出目录—永远不会混淆它们：

| 目录      | 目的                                       | 被跟踪？   |
| --------- | ------------------------------------------ | ---------- |
| `src/`    | 申请来源（TypeScript / TSX）               | 是的       |
| `.build/` | 构建中间体— `next build`输出 (`distDir`)   | 否（忽略） |
| `dist/`   | 由`assembleStandalone`组装的可交付 npm 包— | 否（忽略） |

> **操作员注意事项：**远程VPS映像目录仍为`/usr/lib/node_modules/omniroute/app/`。只有**回购协议内**构建输出已移动（`app/` → `dist/`）。部署技能 rsync `dist/`内容到远程`app/` dir —中，无需更改VPS路径。

**单一构建流程：**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

NOT运行`npm run build` ，然后运行一个单独的`npm run build:cli`来部署—使用`npm run build:release` ，它在一个命令中执行干净的重建+哨兵。

### 工件验证

- [ ] `npm run build:release`成功， `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact`清洁—无`app.__qa_backup`、 `scripts/scratch`、 `package-lock.json`或其他局部残留物
- [ ] `dist/server.js`构建后存在
- [ ] 可选的本地打包运行时烟雾： `npm run dev:candidate -- build`在隔离的`DATA_DIR`上启动打包的 tarball 后的`npm run dev:candidate -- validate`并检查`/api/health` + `/v1/models` （请参阅[贡献黄金路径](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop)）

### 标记和发布

- [ ] 运行`/generate-release-cc` （Claude代码技巧）：
  - 创建标签`vX.Y.Z`
  - 推送标签和分支
  - 打开GitHub Release 并包含变更日志正文
  - 附加Electron安装程序（如果已构建）
- [ ] 或者手动：
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 部署

部署技能使用轻型 rsync 流—没有`npm pack`，没有`npm i -g`：

- [ ] 使用与目标匹配的部署技能：
  - `/deploy-vps-local-cc` —本地VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` —两者
- [ ] 部署前确认`dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] 构建必须在`node_modules`真实的地方运行（主要结帐或`npm ci`'d 工作树— NOT符号链接工作树）
- [ ] 冒烟测试部署实例：
  - 打开`/dashboard/health` →检查版本字符串是否与release匹配
  - 针对已知提供者运行`/v1/chat/completions`请求
  - 验证`/api/monitoring/health`返回`CLOSED`断路器
  - 确认MCP传输响应（`/mcp` HTTP、 `/mcp-sse` SSE）

### 发布后

- [ ] 运行`/capture-release-evidences-cc` （Claude代码技巧）
  - 捕获WebP screenshots/recordings的新功能
  - 附加到发行说明/博客文章
- [ ] 更新GitHub讨论/ Discord并发布公告
- [ ] 打开下一个版本的里程碑
- [ ] 如果重要：固定讨论或在`news.json`中发布应用内横幅

### 雷达公开发射门

Radar 公告是有意与`active: false`共同承诺的。激活是在以下每一项都得到证实后进行的单独更改：

- [ ] 所有堆叠的雷达PRs均已合并，释放尖端CI为绿色
- [ ] 部署并烟雾OSS雷达路线， `RADAR_ENABLED`默认情况下仍处于关闭状态
- [ ] 在指定的 Radar 主机上烟雾`GET /planos`、 `/termos`、 `/privacidade`和`/reembolso`
- [ ] 私人服务中的记录运营商identity/contact/address和所有者批准的法律审查
- [ ] 仅在测试模式下练习 Stripe Checkout 和签名的 Webhook
- [ ] 使用经批准的sender/domain执行一封加密交易电子邮件传送
- [ ] 证明备份恢复和一项受监督、预算上限的研究运行
- [ ] 在接受捐赠证据之前批准BRL/PIX审查政策
- [ ] 仅在前面的门之后才启用公共结帐，然后激活新的`news.json` ID
- [ ] 验证主页横幅使用本地化副本，并且在旧的ID被关闭后，新的ID会重新出现

## 嵌入式服务冒烟测试 (v3.8.4+)

在发布任何包含嵌入式服务变更的版本之前，请验证：

### 全新数据库启动（用于发现迁移冲突 — 在 v3.8.4 热修复后添加）

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 等待 10 秒以完成启动
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` 返回 `"9router"`（不能是 404，也不能是 500）。确认迁移 `071_services.sql` 已应用且初始行已写入。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` 返回 3 行。
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` 返回 2 行（验证 `070_webhooks_kind_metadata.sql` 已应用）。
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` 通过 — 防止未来出现冲突。

### 9Router

- [ ] `POST /api/services/9router/install` 在 2 分钟内返回 200，并包含 `installedVersion`
- [ ] `POST /api/services/9router/start` 在 30 秒内返回 200 和 `state: "running"`
- [ ] `GET /api/services/9router/status` 报告 `health: "healthy"`
- [ ] 使用 `"model": "9router/auto/..."` 调用 `POST /v1/chat/completions` 返回 200（通过 9Router 进行端到端路由）
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` 在代理内呈现 9Router 原生 UI（不使用直接指向 `127.0.0.1:port` 的 iframe）
- [ ] `POST /api/services/9router/rotate-key` 返回 `{ keyRotated: true }`，且服务干净重启
- [ ] `POST /api/services/9router/stop` 返回 200 和 `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` 返回 SSE 流，其中包含带有近期日志行的 `snapshot` 事件
- [ ] 在 PATH 中没有 `npm` 的环境里安装时，返回 500 和友好的错误消息（不包含堆栈跟踪）

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` 在 2 分钟内返回 200
- [ ] `POST /api/services/cliproxy/start` 在 30 秒内返回 200 和 `state: "running"`
- [ ] `GET /api/services/cliproxy/status` 报告 `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` 返回 200 和 `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` 返回 SSE 流

### 安全性回归测试

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` 返回 `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` 返回 `403 LOCAL_ONLY`
- [ ] 来自 `/api/services/*` 的错误响应不包含 `err.stack` 或绝对文件路径

## v3.8.0+ 检查项

在发布任何 v3.8.x 版本之前，请验证以下附加项目：

- [ ] `omniroute --tray` 可在 macOS 上启动（systray2 已安装到 `~/.omniroute/runtime/`）
- [ ] `omniroute --tray` 可在 Linux 上启动（需要 DISPLAY；若未设置，应给出友好错误）
- [ ] `omniroute --tray` 可在 Windows 上启动（使用 PowerShell NotifyIcon，无额外二进制文件）
- [ ] `omniroute config tray enable` 创建自动启动项；禁用时会将其移除
- [ ] `npm install -g omniroute@<this-version>` 执行 postinstall 时不会发生致命退出
- [ ] 更新路径会保留可选依赖项：`omniroute update --apply` 和自动更新程序
      运行 `npm install -g … --include=optional`，以确保 `optionalDependencies`（better-sqlite3、
      keytar、tls-client，以及 llmlingua SLM 栈：`@atjsh/llmlingua-2@2.0.5`、
      `js-tiktoken`）在更新后仍然存在。ultra `modelPath` SLM 层还需要
      tinybert 模型，该模型会在首次使用时自动下载到 `${DATA_DIR}/models/llmlingua`。随后，Postinstall
      (`scripts/build/colocateOptionals.mjs`) 会将 SLM 可选依赖闭包集中放置到
      `dist/node_modules` 中，使 worker 解析到唯一的 `@huggingface/transformers` ^4.2.0
      实例 — 独立 trace 仅捆绑 transformers，不包含动态导入的
      可选依赖项；若不这样做，worker 会使用根目录的 transformers 加载 llmlingua-2，
      并且 SLM 层会静默地进入故障开放状态。
- [ ] `omniroute status` 在没有 `.env` 时仍可工作（CLI 令牌路径，仅限环回地址）
- [ ] `curl http://localhost:20128/api/shutdown` 返回 401（始终受保护的路由）
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` 返回 401（环回保护）
- [ ] SQLite 运行时在首次运行时解析为 `bundled`（捆绑的二进制文件对当前平台有效）
- [ ] 删除 `node_modules/better-sqlite3` 时，SQLite 运行时回退到 `runtime`
- [ ] 智能 MCP 过滤器可压缩真实的 `playwright-mcp browser_snapshot` 输出（缩减幅度 ≥50%）
- [ ] 所有 10 个 `skills/omniroute*/SKILL.md` 文件均可通过 GitHub 原始内容 URL 公开获取
- [ ] 在全新设置中，入门向导显示“How It Works”层级导览步骤
- [ ] 主页仪表板的层级覆盖率组件显示已配置/已激活数量

---

## 3.9.0 LTS 切分（已在 3.8.58 中演练）

v3.8.59 之后的下一个版本是 3.9.0，其顶端提交将分化为两个长期维护分支：
`stable/v3`（v3 LTS 版本线，npm `latest`）和 `develop`（v4，版本提升至 4.0.0，npm
`nightly`）。分支/渠道模型、前向移植和标签请参阅
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md)；计划请参阅 [ROADMAP](../../ROADMAP.md)（阶段 3）。切分仅执行一次；
3.8.58 会在 fork 上进行端到端演练，而 3.8.59 则以
[GO/NO-GO 检查清单](./LTS_GO_NO_GO.md)收尾。

### 试运行（只读，可随时安全执行）

```bash
npm run release:dry-run-lts-cut                       # 实际切分：从 HEAD 创建 3.9.0，前一个标签为 v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # 固定源提交
```

`scripts/release/dry-run-lts-cut.mjs` 不执行任何操作：它读取 git 和 `gh`，并输出
完整流程——前置条件（源可解析；源仓库具有完整历史记录——
浅克隆无法推送 `stable/v3`，接收端会在遇到第一个嫁接的父提交时拒绝该 pack，
因此请从完整克隆执行切分，或先执行 `git fetch --unshallow origin`——前一个
标签存在；`package.json` 为目标版本；存在一个打开的 `release-freeze` issue；现有
发布分支上没有打开的 `Release branch not green` issue——不存在的分支会报告
`?`（未知），绝不会报告为绿色——Mergify `release` 队列已配置（G11：`queue_rules`、
`checks_timeout`、标签 `queue`）；`release/*` 规则集仍会阻止删除和强制推送；并且
`stable/v3` 和 `develop` 尚不存在）、两个分支步骤、哪些休眠工作流的触发器和
`if:` 条件会变为 true（以及哪些仍受仓库变量限制或固定到规范仓库）、预期的
dist-tags（`latest` → 3.9.0，`next` 和 `nightly` 为空）以及回滚流程。退出码 `0` =
`RESULT: READY`，`1` = 某项阻塞性前置条件失败（`✗`），`2` = 用法错误。
`--advisory <id,...>` 会将某项检查降级为警告（`!`），但不会隐藏它。

请在 3.9.0 发布冻结仍处于开启状态时执行实际切分的试运行——分支会在创建标签之后、
阶段 12c 解除冻结之前创建。

### 3.8.58 演练（仅限 fork）

```bash
# 1. 使用演练参数在当前顶端提交上进行试运行
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. 针对 FORK 远程仓库执行（会拒绝 origin 或 URL 为规范仓库的任何远程仓库；
#    每个步骤都会在终端中请求确认）
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. 在 fork 中运行休眠工作流（如果试运行报告固定到了规范仓库，
#    则使用 workflow_dispatch），然后回滚
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

develop 版本提升提交通过 git 底层命令构建（不会触及工作树），并会更新与周期开启提交
相同的五个文件：`package.json`、`open-sse/package.json`、
`electron/package.json`、`package-lock.json` 和 `docs/openapi.yaml`。随后会在
`develop` 上开启 `[4.0.0]` CHANGELOG 章节及其 i18n 镜像，并在该分支的第一个
PR 之前完成。该脚本绝不会更改 npm dist-tags——请在临时软件包上演练这些操作。

### PR 预览制品（构建一次，推广相同的字节内容）

`.github/workflows/preview-artifact.yml` 从 PR 头部提交构建一个生产 tarball，并
验证该确切构建（#8084 切片 (a)）。仅支持同一仓库内的 PR；不会发布任何内容。

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # 或添加 `preview-artifact` 标签
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # 安装预览版本
```

该运行会执行 `npm ci`、`npm run build:release`、`npm run check:pack-artifact`，
打包 tarball，运行 `npm run check:pack-boot`（使用伪造的密钥和临时数据目录），
再次打包；除非摘要完全相同，否则运行失败。随后记录 `artifact-identity.json`
（头部 SHA、基准 SHA、锁文件哈希、平台、架构、node ABI、打包器、构建策略——
`scripts/release/artifact-identity.mjs`），并在单独的作业中证明该 tarball。
推广预览版本意味着安装该 tarball：绝不要从源代码重新构建。

### 切分（3.9.0，在 GO 之后）

1. GO 已记录在 [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) 中。
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` 输出 `RESULT: READY`。
3. 使用试运行输出的命令，手动在 `origin` 上创建分支——该脚本拒绝推送到
   `origin`。若要复用已审核的 develop 提交，请先在 3.9.0 顶端提交上，针对你的
   fork 执行 `--execute` 演练；它会输出两个 SHA，随后可以推送相同的提交：

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. 在第一个 PR 合并之前，保护 `stable/v3` 和 `develop`（规则集 + 合并队列）。
5. 休眠的工作流会根据分支是否存在而启用：`forward-port.yml`（推送到
   `stable/v3`）、`validate-stable-pr.yml`（以 `stable/v3` 为目标分支的 PR）和 `nightly-v4-build.yml`
   （构建 `develop`）。正式启用前，请设置仓库密钥 `secrets.FORWARD_PORT_TOKEN`（以便 CI 在
   前向移植 PR 上运行）；在所有者将仓库变量 `vars.NIGHTLY_PUBLISH` 设置为 `true`，且 npm 可信发布接受
   `nightly-v4-build.yml` 之前，夜间发布将保持关闭。渠道解析由 `scripts/release/dist-tag.mjs` 负责，即
   `npm-publish.yml` 使用的同一解析器。
6. 验证渠道：`npm view omniroute dist-tags --json` 应显示 `latest` = 3.9.0，且在 v4 发布之前不存在
   `next` / `nightly`。
7. 如有需要，可执行回滚：`git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   和 `npm dist-tag add omniroute@3.8.59 latest`。

---

## 回滚

如果发布存在严重问题：

1. `gh release edit vX.Y.Z --prerelease`（标记为非最新版本）
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`（仅当用户尚未采用该版本时）
3. 或者：在 `release/vX.Y.0` 上进行热修复 → 发布补丁版本 `vX.Y.(Z+1)`
4. 立即在 GitHub Discussions 和 Discord 中发布通知

## 硬性规则

- 绝不直接提交到 `main`
- 绝不对 `main` 或 `release/*` 分支使用 `git push --force`
- 绝不跳过 Husky 钩子（`--no-verify`）
- 绝不提交密钥、凭据或 `.env` 文件
- 覆盖率必须保持在 ≥60/60/60/60（语句/行/函数/分支）
- 修改 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生产代码时，始终包含或更新测试

## 自动同步检查

在创建 PR 之前，先在本地运行文档同步保护检查：

```bash
npm run check:docs-sync
```

CI 也会在 `.github/workflows/ci.yml` 中运行此检查（lint 作业）。
