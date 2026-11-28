# Quota Sharing Engine (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **文档参考**：`docs/routing/QUOTA_SHARE.md`
> 属于 B 组（计划 16 + 22）。

---

## 概述

配额共享引擎在共享同一连接的多个 API 密钥之间，公平分配提供者基于时间的配额（例如 Codex 的 5 小时窗口、Kimi 的 1500 次请求/小时）。

**它解决的问题：** OmniRoute 使用许多 API 密钥代理访问同一个上游提供者账户。如果没有共享逻辑，密钥 A 的突发请求可能会耗尽提供者在当前小时内的配额，导致密钥 B 和 C 在窗口重置前一直被阻止。该引擎通过以下方式防止这种情况：

1. 按维度（%、请求数、令牌数、$）跟踪每个密钥的滚动用量。
2. 应用工作保持型公平份额算法：只要全局池尚未饱和，密钥就可以借用闲置份额。
3. 在请求到达上游执行器之前，于热路径（`chatCore.ts`）中强制执行计算结果。

---

## 算法：公平分享工作保存

在`src/lib/quota/fairShare.ts`中实现。

### 模式

| 健康）状况                                 | 模式       | 行为                               |
| ------------------------------------------ | ---------- | ---------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **慷慨的** | 密钥可以借用至全局限制减去消耗总量 |
| `globalUsedPercent >= saturationThreshold` | **严格的** | 严格执行个人公平份额               |

默认`saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`)。

这两种模式描述了默认借用模式`saturation`下的池。无论饱和度如何， `consent`模式下的矿池始终应用严格的规则。请参阅[同意借贷（每个池选择加入）](#consented-lending-per-pool-opt-in) 。

### 按维度决策

对于池中的每个活动维度，引擎计算：

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

对于`percent`维度， `consumed`来自归因手册（请参阅[百分比维度：每键归因](#percent-dimensions-per-key-attribution)）。

然后：

- **`policy = hard`** ：如果`consumed > fairShareAllowed`和模式是严格的→**堵塞**。
- **`policy = soft`** ：如果`consumed > fairShareAllowed`和模式是严格的→**惩罚**（组合中降低优先级；切勿硬块）。
- **`policy = burst`** ：无论公平份额如何，都允许存在全球空间。

### 绝对上限

分配上的`capValue` + `capUnit`是独立于模式或策略的硬性上限。 `consumed >= capValue`始终存在的任何维度**块**的请求。对于`percent` cap， `consumed`只是归属于密钥的部分。

### 多维度检查

请求被阻止，如果**任何**池中的维度会阻挡它。维度是独立的— 5 小时% 的耗尽不会影响每周% 维度。

### 借款

在慷慨模式下，分配未充分消耗的密钥可以使用其他密钥未分配份额的剩余部分。公式为：

```
maxAllowed = globalLimit - consumedByOtherKeys
```

哪里`consumedByOtherKeys = consumedTotal - consumedByThisKey`. teto 全局（该维度的`limit`池）始终是硬上限。

### 同意贷款（每个池选择加入）

每个池都有借用模式。 `saturation`是默认值并保留上述规则。在`consent`模式下， `hard`密钥仅在其他密钥同意借出的容量内传递其份额。管理员设置每个池的模式。每个密钥持有者通过[贷款同意](#lending-consent)来设置自己的同意。

同意是从 0 到 100 的百分比以及以纪元毫秒为单位的可选截止日期。当截止日期在未来时，密钥会借出该比例的闲置份额。

对于一个维度， `L`是有效限制：计划限制乘以池中的帐户。门针对请求密钥计算：

```
share_k         = w_k / 100 × L
idle_k          = max(0, share_k − consumed_k)
lent            = Σ over the other keys of lend_k / 100 × idle_k
taken           = Σ over the other keys of max(0, consumed_k − share_k)
borrowAvailable = max(0, lent − taken)
```

`w_k` is the key's weight, or `100 / n` for every key when no weight is above 0. `lend_k` is the key's active percentage, and 0 once its deadline has passed. The requesting key's own consent never counts. A `hard` key is refused once its consumption reaches its share plus `borrowAvailable`.

没有分配要求的容量（100 减去权重之和）不可出借。没有钥匙同意借给它。

**例子。** `L`是1000。

| 钥匙 | 重量 | 分享 | 已消耗 | 伦兹 |
| ---- | ---- | ---- | ------ | ---- |
| 一个 | 50   | 500  | 530    | 0%   |
| 乙   | 30   | 300  | 100    | 50%  |
| C    | 0    | 0    | 60     | 0%   |

- B 借出其闲置 200 美元中的 50%，即 100 美元。C 已在其份额上多借了 60 美元。 A可以借40。
- A 的服务金额为 530，一旦消费达到 540，则被拒绝。
- 在 C 使用任何东西之前，如果 A 等于或低于其份额，C 可以借 100。
- 在 C 使用任何东西之前，A 的金额为 530，C 可以借用 70。

**零重量。**权重为 0 的密钥的份额为 0。仅当其消耗量低于其他人借出的量时才提供服务。当没有人借出时，它从第一次请求就被拒绝。

**截止日期。**没有后台任务会使同意过期。每个请求都会将截止日期与自己的时间进行比较，并且等于该时间的截止日期已经过去。如果存储的截止日期不是有限的数字，或者超过了`Date`可以保存的最大日期，则视为已通过。

**`soft`和`burst`。**贷款并不限制他们。一旦超过其份额， `soft`密钥就会被取消优先级。当泳池还有空间时， `burst`钥匙就会通过。一旦池的总数达到其限制，池上限仍然拒绝每个密钥。

**请求路径上的成本。** `saturation`池的读取内容与以前没什么不同。在`consent`池中，可数维度仅读取等于或高于其份额的`hard`密钥的其他密钥，而另一个密钥则借出。然后，它并行地对每个其他键进行一次读取。读取失败算作该键的消耗为 0。 `percent`维度不会增加任何读取，因为归属簿包含所有密钥。

**编辑池。**编辑会保留保留密钥的同意。这适用于分配编辑、组范围内的替换和`ensure`调用。删除的密钥将失去其同意，并且添加回来的密钥从 0 开始。管理路由返回每个密钥的同意并且从不写入它。将池切换回`saturation`会保留所有存储的同意，这在该模式下不起作用。再次将池切换到`consent`会重新激活尚未超过截止日期的存储同意。密钥持有者可以在任一模式下清除存储的同意。

**升级中。**如果列`lending_percent`和`lending_until`已存在，则迁移仅添加`borrow_mode`，并且存储的百分比保持原样。每个池都以`saturation`模式启动。在池向导中为每个池打开`consent` 。不会从存储的值推断出任何内容。

**局限性。**

- 贷方可以在使用自己的份额之前发现资金池已达到上限。其他人借用的容量计入池的总量。
- 检查在请求之前运行并且不保留任何内容。并发请求在记录任何消耗之前读取消耗，因此借出的容量可以多次使用，但受运行中请求的限制。 `saturation`模式的共享检查具有相同的属性。

---

## 滑动窗口计数器

实现在 `src/lib/quota/sqliteQuotaStore.ts` 和 `redisQuotaStore.ts` 中。

每个 `(apiKeyId, dimensionKey)` 有两个桶：

- `curr`：当前桶（`floor(nowMs / windowMs)`）
- `prev`：前一个桶（`curr - 1`）

有效滚动值：

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**精度**：约 99% 准确。误差最多为窗口大小的 1%，出现在桶之间的边界处（这是双桶近似法固有的误差）。

### 并发

SQLite 驱动：按 `(apiKeyId | dimensionKey)` 键使用内存互斥锁，以防止读取-修改-写入竞争。该模式与 `src/sse/services/auth.ts` 中防止惊群效应的实现一致。

Redis 驱动：使用 Lua EVAL 脚本进行原子递增——作为单条 Redis 命令执行。

---

## 驱动程序

### SQLite（默认，零安装）

- 表：`quota_consumption`（请参阅迁移文件 `073_quota_pools.sql` / `074_quota_consumption.sql`）。
- 最适合单实例部署。
- 所有持久化数据都存储在现有的 OmniRoute SQLite 数据库中（`DATA_DIR/storage.sqlite`）。

### Redis（可选，多实例）

- 需要 `ioredis` npm 包。
- 计数器存储在 Redis 中；元数据（池/分配）仍存储在 SQLite 中。
- 最适合必须共享计数器的多副本部署。

### 切换驱动程序

通过设置界面（`/dashboard/settings` → 配额存储），或通过环境变量：

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

数据库设置的优先级高于环境变量。如果 `driver=redis` 但未提供 URL，或未安装
`ioredis`，工厂将回退到 SQLite 并记录警告。

驱动程序选择顺序：

1. 数据库设置 `quotaStore.driver`
2. 环境变量 `QUOTA_STORE_DRIVER`
3. 默认值：`sqlite`

---

## 多维度

池可以有多个维度。每个维度都是独立的：

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**示例： Codex计划**（5h% +每周%）：

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

请求必须满足所有允许的尺寸。

### 维度百分比：每键归因

百分比计划报告每个帐户和计划窗口的一个使用数字。提供者没有为每个API密钥提供计数器。

为了在密钥之间分配该数字，每个池为每个帐户和计划窗口保留一个归属簿。 `src/lib/quota/percentLedger.ts`持有本书的规则。 `src/lib/quota/percentAttribution.ts`将书本转化为执法部门使用的数字。结果是根据每个关键路线的令牌构建的估计。

#### 感动书籍的读物

该书仅在所请求的计划窗口的提供者自己的数字上移动。这些连接报告一：

| 提供者                | 规划窗户       |
| --------------------- | -------------- |
| Claude，通过OAuth连接 | `5h`, `weekly` |
| Codex                 | `5h`, `weekly` |

这些不算作阅读：

- 提供者客户端标记为过时的响应
- 提供者未报告其百分比的Claude窗口
- 另一个窗口的数字，或者跨窗口的最坏情况
- 速率限制标头回退
- 读取失败

其他提供者，包括带有API密钥的Claude ，都没有书籍。与此更改之前一样，每个键的百分比尺寸均按 0 收费。

一次读数共享饱和信号的 30 秒缓存。 Claude读数的日期是在响应标头中观察到该数字或从使用端点读取该数字（当该时间已知时）的日期。其他读数的日期是该缓存条目的构建时间。

#### 本书保留了什么

每个记录的请求都会将其令牌一次添加到每个池、帐户和密钥的计数器中。计数器只会增长。书中保留了三件事：

- 基线：书本打开或窗口上次打开时的数字
- 最后应用的数字
- 每个键，同一时刻的令牌计数器称为其标记

当执行或使用路径计算归属时，本书会更新。写入是根据修订号进行比较和设置的。一个作家在重新阅读一次时失败了。

#### 键的部分是如何计算的

每个键的部分都是在阅读本书时计算的。自基线以来数字的增长在键之间按比例分配，每个键自其标记以来路由的令牌成比例。

Together，这些标记最多解释每个`QUOTA_PERCENT_MIN_TOKENS_PER_POINT`标记中的一个点（默认 1,000）。他们没有解释的增长是外部的。基线也是外部的。

例如，一本书在 0 点打开。然后密钥 A 路由 900,000 个令牌，密钥 B 路由 100,000 个令牌。数字为 60 时，A 部分为 54 分，B 部分为 6 分。

低于其钥匙标记的计数器已重新启动并完整计数。没有标记的密钥，例如在窗口中间加入池的密钥，会计算其所有令牌。滞后于标记的数字会导致错误，该错误会在下次读取时消失。它不会积累。

每个属性都会阅读`QUOTA_PERCENT_MIN_TOKENS_PER_POINT` 。不是至少为 1 的有限数的值会回落到 1,000。

#### 阅读如何改变书本

第一个匹配规则适用：

1. **还没有书：**阅读打开书本。它的数字是基线，每个计数器都被标记。
2. **较旧的阅读：**上次应用的读数之前的读数将被忽略。重置时间比存储时间早 30 分钟以上的读数也是如此。
3. **新的提供者窗口：**重置时间比存储的翻书时间晚30分钟以上。该数字成为基线，并且每个计数器都被再次标记。没有柜台的钥匙离开书本。
4. **结束窗口：**存储的复位时间不在读数数据时间之后意味着该窗口已结束。无论书的内容如何，阅读都会改变书的内容。
5. **更高的数字：**只有最后一个人影在动。基线和标记保持不变。
6. **同图：**图形、基线和标记保留。只写了书中缺少的重置时间。
7. **下图：**永远不会应用较低的数字。只有当三件事成立时，这本书才会翻过来。 It is at least two minutes newer than the last applied reading.没有任何迹象表明窗户是同一个打开的窗户。低了不止一分。

The window counts as the same open one when three things hold.两个重置时间都是已知的。两者相距不到 30 分钟。存储的仍领先于读取。 A lower figure inside that window changes nothing.

A reset time is stored only while it is ahead of the data time of the reading that carries it.当该读数可用时，较高的数字存储其读数的重置时间，否则保留存储的读数。 An equal figure records its reading's reset time only when the book has none.它没有改变其他任何东西。不翻书的下图记录了没有重置的时间。

#### 当书被使用时

After a reading, the book is used unless its stored reset time is not after the current time. That case arises when a reading taken just before the reset, such as one served from the cache, is observed just after it.

Without a usable reading, the stored book is used only while it can still be the current window's book.这在两种情况下成立：

- 它的重置时间是已知的并且仍然领先
- it has no reset time, and the last reading that changed it is at most 15 minutes old

Otherwise nothing is attributed, as when there is no book. A book whose stored reset time has passed is never charged.

#### 执行

密钥在百分比维度上的消耗是其归属部分加上外部部分的份额。外部部分首先使用未分配声明的容量（100 减去权重之和）。只有多余的部分按重量在按键之间共享。

对于任何其他维度，将该消耗与密钥的公平份额进行比较。当饱和信号达到`QUOTA_SATURATION_THRESHOLD` （默认0.5）时，严格模式仍然启动。每个数字都按有效限制进行缩放：每个帐户的限制乘以池中的帐户数量。

`capUnit: "percent"`的绝对上限仅计算归因于密钥的部分，并以相同的方式缩放。每个帐户的限制为 100 个和 k 个帐户。当服务帐户的密钥部分达到N/k点时，就达到 N 的上限。每个账户都会根据自己的账簿进行检查。例如，对于两个帐户，一个帐户数字的 5 个点达到 10 的上限。

当无法读取存储时，不会对任何内容进行归因，并且每个键在该维度上的费用为 0。当一本书写入失败时，该归属将使用该书被阅读时的状态。失败的令牌写入会将该请求的令牌从记录中删除。这些失败都不会阻止请求。

在`consent`池中，借贷公式使用每个密钥在百分比维度上的消耗，如上所述。当另一把钥匙借出时，这本书会被读一次并归属于每把钥匙。如果没有可用的书，每把钥匙的费用都是 0。然后，一把有重量的钥匙就可以通过，而重量为 0 的钥匙只有在另一把钥匙借出时才可以通过。

#### 使用路线

`GET /api/quota/pools/{id}/usage`通过相同的函数报告相同的数字。百分比维度在`accounts`中的每个池连接有一个条目。其顶级`consumedTotal`和`perKey`镜像第一个条目。

该路线也应用当前阅读，因此它可以根据请求推进书籍。当没有可用读数或未应用较低的数字时， `internal + external`可能与`consumedTotal`不同。

#### 储存和保留

两家配额商店都保留了这本书。在SQLite上，自动数据库清理在启用后会删除 60 天未更新的行。在Redis上，池连接的书籍和计数器共享一个密钥。它在最后一次代币写入或账簿更改后 60 天到期。一本不改变的书不会被重写，所以截止时间设置在最长的计划窗口之上。手动使用历史重置还会清除SQLite上的书籍（请参阅限制）。

#### 局限性

- 自基线以来帐户数字的所有增长均按此后每个密钥路由的代币划分。这种增长何时发生并不重要。
- 因此，在OmniRoute之外进行的使用将根据密钥的令牌允许的情况进行收费。这包括在钥匙第一次请求窗口之前、当书籍已经打开时进行的使用。
- 例如，在没有关键路线的情况下，外部使用可提高帐户60点。然后一个密钥路由 30,000 个令牌，这个数字达到 60.6。
- 如果该书在使用之前已打开，则钥匙部分为 30 点。它还带有7.65的外部使用，有四个重量为25的按键。
- 如果该书在使用后打开，则 60 分是基线。钥匙部分为0.6分，承载15分的外部使用。
- 请求或访问使用路线即可打开这本书。因此，这种使用是否算作基线取决于书的打开时间。
- 在默认下限的情况下，在外部使用时路由 60,000 个代币的密钥会使帐户增加 60 点，将所有 60 点作为其自己的部分。
- 下限为50,000，其自身部分为1.2分。其他 58.8 是外部使用，按重量计费，就像任何外部使用一样。
- 将`QUOTA_PERCENT_MIN_TOKENS_PER_POINT`设置为接近您计划中的一分成本。外部使用包括来自池外密钥的同一帐户上的流量。
- 百分比上限适用于每种模式。当帐户远低于饱和阈值时，可以拒绝有上限的密钥。
- 在窗口早期将外部使用点数限制为 10 点和 12 点。然后，路由 20,000 个代币的密钥在帐户数字为 12.4% 时被拒绝。
- 分割是按代币数量进行的估计。请求计为提示令牌加上完成令牌。缓存折扣和型号价格不会改变该计数。
- 未以状态 200 结束的请求不会记录任何令牌。示例包括客户端断开连接的流以及消耗使用后的上游错误。
- 此类请求引起的使用量将记入记录令牌的密钥，最多可达其令牌允许的范围。其余的都是外在的。它不会向后移动。报告没有令牌使用情况的响应也不会记录任何令牌。
- 正在进行的请求的使用可以显示在整个请求的另一个活动密钥的部分中。仅当请求以状态 200 结束时，它才会移回。
- 打开图书时帐户上已存在的使用情况算作外部使用。这包括升级、新池和新帐户。在第一次阅读之前在新窗口中使用也算作外部。
- 每个密钥都以其在该使用中的权重份额开始，在容量之后没有分配声明。一个帐户的使用率为 85%，五个密钥的权重为 20，每个密钥一开始就使用了 20 个密钥中的 17 个。
- 在具有多个帐户的池中，服务帐户的数字将应用于总预算。本书对此没有改变。
- 不应用提供者报告为打开的窗口内的较低数字。向后移动超过 30 分钟的重置时间将被视为旧读数。
- 在这两种情况下，书籍都会保持其状态，直到存储的重置时间过去。此后，直到阅读完成后，书籍才会收费。
- 补救措施是手动重置使用历史记录 (`POST /api/settings/purge-usage-history`)。它清除SQLite数据库中的归属簿及其令牌计数器。
- `all`期间清除所有书籍和柜台。较短的时期首先清除其中未写的书籍。然后，它会清除未写入其中的计数器，但仅限于没有剩余书籍的池连接。保存的书仍然在柜台上标记每个钥匙。
- 人物没有移动的书不会被重写，所以更短的时间也可以清除当前窗口的书。下一次阅读将以当前数字打开一本新书。
- 重置不会触及Redis配额存储。一本书以其窗口结束，或者在最后一次写入后 60 天到期。
- 当提供者没有发送重置时间时，在两次读数之间重置并重新填充到旧数字之上的窗口看起来像是更高的数字。这本书保留了旧的基线和标记。
- 读数以当地时钟为准。当它运行得比提供者的时间早，或者消息来源报告重置时间稍早时，本书可以提前发现该差异。
- 这段短暂的时间里的增长被其中路由的代币所分割。下一个窗口的第一个读数会纠正它。当翻过的书没有重置时间时，该校正需要比上次应用的读数至少晚两分钟的较低数字。
- 共享Redis实例使用自己的时钟存储日期读数，因此请保持这些时钟同步。时钟落后的实例的读数看起来较旧并且被忽略。
- 如果在存储的重置时间之后没有可用的读数到达，则在读数返回之前不会强制执行每个键的百分比份额和百分比上限。如果没有重置时间，则从上次阅读改变书籍的 15 分钟后开始。
- 在Redis商店中，闲置 60 天的图书可能会在作者检查和写入之间过期。然后以高于 1 的修订版重新创建它，这是一个有效状态。

---

## 方案解析器

实现在 `src/lib/quota/planResolver.ts` 中。

优先级（从高到低）：

1. **手动数据库覆盖** — `provider_plans` 表，按 `connectionId` 设置。
2. **已知目录** — `src/lib/quota/planRegistry.ts`（仅包含数据）。
3. **空方案** — 没有维度，需要手动配置。

### 已知目录

| 提供者                | 维度                                                          |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h`（limit=0，未知），`tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | 无默认值 — 需要手动配置                                       |

---

## 管道整合

### PRE钩子 (`open-sse/handlers/chatCore.ts`)

在身份验证和策略检查之后，在上游执行器之前运行：

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**失效开放**：如果`enforceQuotaShare`抛出异常，则允许该请求通过`pino.warn`日志。这可以防止配额引擎错误阻止所有流量。

**当容量恢复时。**在两种借用模式下，对密钥份额或池上限的拒绝均以以下两个句子之一结束：

- `percent`窗口： `. The <window> window resets at <time>.`该时间是提供者报告的重置时间。
- 可计数单位： `. Enough <window> usage is expected to clear by <time>.`如果密钥没有发送任何其他内容，则时间是滑动窗口的上限。

`<time>`是UTC中的ISO 8601 瞬间。然后拒绝携带`Retry-After`：直到那一刻的整秒，加上一。等待那么长时间的客户端最多会在该时刻后一秒重试。当未知时刻时，拒绝既不携带句子也不携带标题。绝对的上限拒绝不会带来任何影响。公共代码仍然是`quota_share_blocked`。

共享拒绝不会影响共享连接。它没有设置冷却时间，没有模型锁定，也没有提供者断路器故障，并且池中的其他密钥将继续得到服务。当组合的每个目标都拒绝其共享的密钥时，组合将立即回答 429。它的答案带有`Retry-After`提示。嵌入路径以相同的句子结束其拒绝，并且不发送`Retry-After`。

### POST hook（记录消费）

成功响应后：

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**漂移音符**：如果`consume`后响应失败，则滚动计数器计数不足。来自提供者（例如`anthropic-ratelimit-unified-5h-utilization`）的饱和信号会纠正下一个请求的全局估计。

### 组合软惩罚 (`open-sse/services/combo.ts`)

当`decision.deprioritize === true`时：

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

处罚是在所有其他评分因素之后进行的。它降低了选择饱和密钥的自动组合概率，而无需对其进行硬阻止。

---

## UI演练

### `/dashboard/costs/quota-share` —主池页面

组件（全部在`src/app/(dashboard)/dashboard/costs/quota-share/`中）：

| 成分                   | 目的                                                 |
| ---------------------- | ---------------------------------------------------- |
| `QuotaConceptCard`     | 向新用户解释配额共享的介绍卡                         |
| `CreatePoolModal`      | 创建一个新的配额池（连接+名称+初始分配）             |
| `PoolCard`             | 每个池的摘要：名称、连接、分配计数                   |
| `DimensionBar`         | 每维堆叠条：每个键所占+全局使用量                    |
| `AllocationTable`      | 包含已消耗、公平份额、 deficit/surplus、借用标志的表 |
| `BurnRateChart`        | EMA燃烧率折线图（通过`dynamic()`进行惰性 Recharts）  |
| `EditAllocationsModal` | 编辑池的分配权重、上限和策略                         |
| `BorrowModeField`      | 向导中的借用模式选择器（`saturation`或`consent`）    |
| `LendingBadge`         | 借出密钥上的只读徽章，仅在`consent`池中              |

贷款徽章显示百分比以及设置后的UTC中的截止日期以及指定的区域。它在使用快照时判断截止时间。已过期或无法读取的截止日期显示为`lending expired`。

页面挂钩：

- `usePools` —每 30 秒获取一次`GET /api/quota/pools` 。
- `usePoolUsage` —按需获取`GET /api/quota/pools/[id]/usage` 。
- `useLocalStoragePoolMigration` —在挂载时运行一次以迁移旧的LS数据。

池向导的关键步骤有一个`Show usage by member to key holders`框。它设置池的`memberBreakdown`选项（请参阅[成员使用](#member-usage)）。在其下方，向导警告知道使用哪个键的人可以将条形与该键匹配。勾选该框后，当该步骤列出的键少于 3 个或多于 20 个时，它会这样显示，因为条形图将保持隐藏状态。它对步骤中的键进行计数，但无法判断哪些键可以发出请求。

### `/dashboard/costs/quota-share/plans` —提供者计划配置

- `ProviderPlanConfigClient.tsx`：用于选择提供者、查看已解析计划（从目录自动或手动覆盖）以及编辑维度的下拉列表。
- 更改写入`PUT /api/quota/plans/[connectionId]`。
- 删除将恢复为目录或空计划。

---

## 自助服务配额API （选择加入）

`GET /api/v1/me/quota/{provider}` （也在`/v1/me/quota/{provider}`提供服务）让API密钥持有者使用自己的密钥读取共享订阅的数量以及阻止他们的内容。该路由是`src/server/selfService/quotaHandler.ts`上的一个薄壳；该视图由`src/lib/quota/selfView.ts`构建，其响应合约是`src/shared/schemas/selfQuota.ts` （ `docs/openapi.yaml`中的`SelfQuotaView` ）。

### 启用和身份验证

- 功能标志`QUOTA_SELF_PANEL`，默认`false`。当它关闭时，到达路由的请求会收到 404。使用`REQUIRE_API_KEY=true`时，客户端API策略会在路由运行之前拒绝丢失或无效的密钥，并返回 401，无论标志是什么。没有密钥但已登录仪表板会话的请求会通过该策略并获取路由自己的答案。该标志像其他标志一样解析（仪表板或REST覆盖，然后是同名的环境变量）；参见[`FEATURE_FLAGS.md`](../reference/FEATURE_FLAGS.md) 。
- 每个池的显示名称和每个计划的标签均按照管理员编写的内容返回给池的密钥持有者。在打开标志之前，请检查它们是否适合那些钥匙持有者读取。
- 密钥仅从标头中读取： `Authorization: Bearer <key>`或`x-api-key: <key>`。当两者都发送时，使用第一个验证的。查询字符串或 cookie 中的键将被忽略。服务器的环境密钥被拒绝 (401)。
- 密钥需要`self:usage`范围（403 没有它）。
- 提供者段被修剪、小写并根据`^[a-z0-9][a-z0-9._-]{0,63}$`检查（否则为 400），然后通过提供者注册表进行解析，因此`cc`等别名会读取`claude`池。 `claude`和`anthropic`读取相同的池。

### 每个可见性显示什么

| 能见度   | 需要                                                                            | 领域                                                                                                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 自己分享 | `self:usage`                                                                    | `pools[]` （ref、名称、提供者、策略、权重、上限）、 `dimensions[].yourShare`、 `accounts[]`和`yourShare` （在没有`attributed`和`external` `percent`窗口上）、 `blocks`、 `availableModels`、 `expiresAt`、 `apiBaseUrl`    |
| 账户级别 | `self:usage` + `self:account-quota`，以及密钥的`sharedQuotaProviders`中的提供者 | 在`percent`窗口的`yourShare`上添加`dimensions[].total`、 `accounts[].dimensions[].account`和`accounts[].modelWindows`、 `attributed`和`external` ，并在成员使用开启的池上添加`members` （请参阅[成员使用](#member-usage)） |

- `sharedQuotaProviders`是每个密钥的设置 (`PUT /api/keys/[id]/self-service`)： `null`是默认值，表示密钥到达的每个提供者； `[]`意思是没有。每个池的`accountVisible`都会说明适用于它的可见性。
- 仅针对密钥可能使用其连接的帐户显示帐户栏和模型窗口。当密钥具有允许的连接列表时，其外部的帐户将保留其`Account N`条目，而无需`account`或`modelWindows`。空列表意味着没有限制，就像`/v1/me/status`一样。池总数 (`dimensions[].total`) 不依赖于该列表。
- 单独使用`self:usage`显示的两个数字来自其他密钥的使用。计划预算的`exhausted`反映了该计划下每个键的消耗。在权重全为零的池中，密钥的`weight`为`100 / number of members`。两者都是应用于密钥的强制执行。
- A pool is identified only by `ref`, an opaque value bound to the calling key. Its display name (`name`) is included as the administrator wrote it. A `ref` is derived from the key and the pool with the server's API-key secret (`API_KEY_SECRET`). Clients must not persist it: it changes if that secret is rotated.
- 帐户按池顺序列出为`Account 1`、 `Account 2`、...。不会返回池 ID、连接 ID、帐户电子邮件或帐户名称，并且响应会通过合约架构，从而删除合约架构之外的任何字段。
- 可数单位（`requests`、 `tokens`、 `usd`）被报告为配额门强制执行的池存储桶： `limit` =计划限制池中的×帐户， `fairShare` =权重 / 100 × `limit` （当每个权重为 0 时均等分割）， `consumed` =配额存储中密钥自己的计数器， `remaining` = `fairShare` − `consumed`，下限为 0。
- `blocks.schedules`列出密钥的调度窗口（`open`/`closed`、 `blackout`或`outside-window`、 `retryAfterSeconds`、保留楼层以及是否花费窗口预算）； `blocks.modelCaps`列出了每个模型的每小时上限和消耗量。
- 提供者每个池之外的密钥通过`pools: []`获得 200 ； `availableModels` （密钥在`/v1/models`中看到的`qtSd/` id）、 `expiresAt`和`apiBaseUrl`仍然已填充。
- `apiBaseUrl`是`OMNIROUTE_PUBLIC_API_BASE_URL`，然后`OMNIROUTE_PUBLIC_BASE_URL`，否则是`null`。它绝不是请求本身的来源。

### `status`和`reason`

| `status`      | 意义                                                                                                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ok`          | 当前读数。                                                                                                                                                                                                       |
| `stale`       | 缓存的帐户读取标记为过时，或者自读取后重置时间已过。数字被保留。重置时间已过的一个模型窗口标记整个`modelWindows`组`stale`。对于密钥自己共享的`percent`窗口：这本书是在没有帐户读取门的缓存来确认的情况下读取的。 |
| `unavailable` | 不读书；数字是`null`，而不是`0`。 `reason`说为什么。                                                                                                                                                             |

| `reason`                          | 什么时候                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `store_unavailable`               | 无法读取配额存储，或者无法读取归属簿。                                            |
| `percent_attribution_unavailable` | 密钥自己的`percent`窗口共享：该帐户和窗口尚不存在归属簿，或者该归属簿未列出密钥。 |
| `percent_window_ended`            | 关键自己的`percent`窗口份额：这本书属于一个已经结束的计划窗口。                   |
| `account_not_used_by_key`         | 密钥自己的`percent`窗口共享：帐户的连接超出了密钥允许的连接范围。其书未读。       |
| `window_not_reported`             | 提供者限制缓存没有读取该计划窗口。                                                |
| `connection_lookup_failed`        | 无法读取帐户的连接。                                                              |
| `not_supported`                   | OmniRoute无法读取帐户提供者的使用限制。                                           |
| `fetch_failed`                    | 没有可用的缓存读取，并且提供程序限制刷新失败。                                    |
| `not_available`                   | 读数没有使用窗口，或者帐户根本没有读数。                                          |

当无法读取配额存储时， `blocks`的存储支持字段（计划预算的`exhausted`、模型上限的`consumed`和`reached`）也是`null` 。

### 贷款同意书

`PATCH /api/v1/me/quota/{provider}`记录调用密钥自己对一个池的同意。它使用`GET`的标志、标头和提供者规则。 `self:usage`作用域授权这一写入，尽管其名称读取为只读。

```json
{
  "pool": "qpr_0123456789abcdef0123456789abcdef",
  "lendingPercent": 30,
  "lendingUntil": 1893456000000
}
```

- `pool`是`ref`为该池返回的`GET` 。
- `lendingPercent`是 0 到 100 之间的整数。值为 0 会清除同意及其截止日期。任一模式都接受`lendingPercent` 0 的主体。
- `lendingUntil`是可选的：纪元毫秒，或`null`没有截止日期。它必须是未来且最多 8640000000000000。低于 100000000000 的值读取为秒并被拒绝。
- 任何其他字段都会被拒绝。超过 4096 字节的正文将被拒绝。读取在该大小处停止，因此较长的正文永远不会保持完整。

检查按此表的顺序运行。每次拒绝都使用带有固定消息的标准错误主体。如果其中一项支票被拒绝，则不会产生任何影响。

| 地位 | 信息                                                                                               | 什么时候                                          |
| ---- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 404  | `Not found`                                                                                        | `QUOTA_SELF_PANEL`标志已关闭。                    |
| 401  | `Valid API key required`                                                                           | 密钥丢失或无效，或者是服务器的环境密钥。          |
| 403  | `API key lacks the self:usage scope`                                                               | 关键缺少`self:usage`。                            |
| 400  | `Invalid provider`                                                                                 | 提供者段无效。                                    |
| 429  | `Too many lending changes. Retry later.`                                                           | 钥匙已经超过了极限。答案是`Retry-After`。         |
| 400  | `Body must be { pool, lendingPercent, lendingUntil }. lendingPercent is an integer from 0 to 100.` | 正文不是JSON、太长或与架构不匹配。                |
| 400  | `lendingUntil must be a Unix time in milliseconds`                                                 | 截止日期以秒为单位。                              |
| 400  | `lendingUntil must be in the future`                                                               | 截止日期为请求时间或之前。                        |
| 404  | `Pool not found`                                                                                   | `ref`没有为该提供者指定该密钥的池。               |
| 403  | `Lending is not enabled for this pool`                                                             | 池处于`saturation`模式， `lendingPercent`大于 0。 |
| 500  | `Failed to build quota view`                                                                       | 任何其他失败。其原因已记录在服务器上。            |

每个密钥的限制为每 60 秒 20 个请求。通过提供者检查的每一个请求都很重要，即使是后来拒绝的请求或者没有任何改变的请求。除了密钥的请求速率限制之外，它还有自己的计数器。

更改存储同意的请求会写入一条`quota.pool.lending.updated`审核记录。它用旧值和新值命名键。同一个主体发送两次，一次写入，一次审核。答案是 200，具有完整的`GET`视图，是在写入后构建的。

`GET`视图报告借贷情况如下：

- 每个池都带有`borrowMode` （`saturation`或`consent`），以及密钥自己的`lendingPercent`和`lendingUntil`。
- `lendingActive`是`true` ，仅在`consent`池中，百分比大于0且未达到截止日期。
- 在`consent`池中，每个可数`dimensions[].yourShare`都携带`borrowAvailable`。这是该密钥现在可以在其份额之上使用的、由其他密钥借出的内容。
- `borrowAvailable`使用门的公式。它会读取所有其他密钥，即使该密钥位于其共享之下。对于`hard`键，它是每个其他键和可数维度的一次额外读取，并行。
- `borrowAvailable` is `null` for a `soft` or `burst` key, and `null` when a read fails.
- `borrowAvailable`是所有其他密钥一起的一个数字。在两个钥匙的池中，它是另一个钥匙自己的数字。
- `percent` windows 或`accounts[]`中尚未报告`borrowAvailable` 。
- 在`saturation`池中，视图报告使用`lendingActive: false`存储的同意，而不使用`borrowAvailable`。

### 错误

该路由的每个响应，无论成功还是错误，都带有`Cache-Control: no-store`。在路由运行之前发生的拒绝不携带它，例如客户端API策略的 401 或IP过滤器的 403。路由的错误使用带有固定消息的标准错误正文：400（无效的提供程序）、401（丢失或无效密钥）、403（缺少`self:usage`）、404（标记关闭）和 500 (`Failed to build quota view`)。 500 覆盖请求到达路由后的任何失败，包括密钥查找本身；其原因记录在服务器上并且从未返回。 `PATCH`的错误在[贷款同意](#lending-consent)中列出。

### 局限性

- `remaining`是密钥公平份额中尚未使用的部分。 It is not a guarantee.当泳池还有空间时，仍可在泳池外领取钥匙。一旦池的总数达到`limit`，池中的每个键都会被拒绝，无论它自己的`remaining`是什么，并且没有`self:account-quota`键无法看到该总数。
- `remaining`不考虑分配的绝对`cap` 。一旦其在上限单位窗口中的消耗达到上限值，执行就会拒绝该密钥。
- 帐户级别栏来自提供者限制缓存，可能会延迟执行决策几分钟。重置时间已过的读数报告为`stale`。
- 仅针对具有计划窗口映射的提供者报告每个模型窗口 (`modelWindows`)：目前的Claude和Codex 。对于其他提供者，当显示帐户数据时， `modelWindows`仍然存在，但`windows`列表为空。
- 密钥自己的`percent`窗口份额是一个估计。它来自归因手册，并具有上面“百分比维度：每键归因”下列出的所有限制。
- `consumed`是执行数量与公平份额的比较。 It is `attributed` plus `external`, exactly. `attributed`是本书给出其路由的令牌密钥的部分。 `external`是账户使用的密钥部分，池密钥不予考虑。
- 仅当池的`accountVisible`为 true 时才会发送这两个部分：密钥具有`self:account-quota`并且提供者位于其`sharedQuotaProviders`中。没有它的密钥单独获得`consumed` ，具有相同的`status`和`reason`。
- 通过这两个部件及其自身重量，持有者可以计算出泳池外的使用量，并计入泳池的钥匙中。具有账户范围的持有人已经看到账户总额。
- 在窗口中没有路由任何内容的密钥仍然可以从`consumed`读取其外部费用，因为其属性部分为 0。
- 例如，一本书在 0 处打开，密钥 A 和 B 的权重各为 50。 Key A routes 900,000 tokens and key B 100,000.然后，该帐户达到限制 100 的 60%。则`attributed`对于密钥 A 为 54，对于密钥 B 为 6，并且`external`对于两者都为 0。
- 视图读取这本书，但从不写入其状态。它不会打开一本书，也不会要求提供者阅读。使用Redis存储，读取会在后台删除被取代的修订字段，就像门的读取一样。
- 共享仅是`ok`而门的缓存保存帐户的读数。如果没有，则为`stale`，因此在最近没有请求的池中，它显示为可能已过时。
- 在请求通过池之前，共享不可用。该请求打开账本，此时帐户的数字将计为池外的使用量。
- 在具有多个账户的池中，每个账户条目使用该账户自己的账簿和一个账户的限额。执法双方均按账户数量进行缩放，因此比例相同。
- Per-model windows carry no share for the key. The book keeps no per-model data.
- 视图不会评估时间表的保留楼层：时间表可以显示为`open`而请求因`schedule-reserve`原因被拒绝。
- 当同一密钥的两个池共享一个连接时，强制应用其中之一，并且视图会列出两者。
- 对于失败的密钥尝试没有每个地址的限制：在反向代理后面，调用者可以共享一个地址（这取决于转发的客户端地址是否可信），因此锁定可能会拒绝通往每个密钥持有者的路由。使用`REQUIRE_API_KEY=true`时，客户端API策略会在路由运行之前拒绝无效密钥，并使用该策略的 401 正文而不是该路由的 401 正文。

### 会员使用

管理员可以让密钥持有者查看窗口的使用如何在池成员之间分配。该选项是池的`memberBreakdown`，默认情况下关闭。它是在池向导中或使用`PATCH /api/quota/pools/{id}`设置的。 `GET /api/quota/pools`和`GET /api/quota/pools/{id}`报告了这一点。

仅当所有这些都成立时，视图的维度才带有`members` ：

- the pool's option is on
- 该池最多有 20 个分配的密钥，其中至少三个可以发出请求：有效、未撤销、未禁止且未过期
- 矿池的`accountVisible`为 true：密钥有`self:account-quota`并且提供者在其`sharedQuotaProviders`中
- 在`percent`窗口上，帐户的连接是密钥可以使用的连接之一
- 读取了密钥自己的该窗口份额：它的`status`不是`unavailable`

Otherwise `members` is absent.它绝不是一个空列表。

- 每个切片都是`{ slot, consumed, isYou }`。响应架构拒绝切片上的任何其他属性以及超过 20 个切片的列表。切片按插槽顺序列出。
- 每个分配的键都有一个切片，包括不能再发出请求的键。没有用的成员显示真正的零。
- 插槽 1 始终是询问键， `isYou`为 true。其他槽号是键控哈希的等级。它以`API_KEY_SECRET`为密钥，涵盖池、请求密钥和成员。
- 因此持有者之间的数字并不一致。对于一位持有者来说，他们在两次访问之间保持不变。当密钥加入或离开池时，或者当该密钥轮换时，它们可以更改。
- 在可数窗口上，切片是配额存储中成员的计数器，与其自己的`consumed`计数器相同。
- 在`percent`窗口上，切片是成员的`attributed`部分，来自作为密钥自己的共享读取的同一本书。池外的使用永远不会被分割成切片。该电荷按重量分配，因此携带电荷的切片会显示重量。
- 每个视图并行读取每个其他成员和可数窗口的一个值。在`percent`窗口上，除了共享者自己的书籍阅读之外，切片的阅读成本不高。当无法读取一个值时，该窗口没有`members`，并且该键自己的共享保留。
- 每个池的选项和可用密钥数量都会读取一次，并且仅针对可以查看帐户数据的密钥。选项或可用密钥计数读取失败会关闭该池的栏。服务器记录警告，然后构建视图的其余部分。

这些酒吧没有名字或 ID。他们仍然告诉密钥持有者有关其他成员的事情：

- 持有者仍然可以根据切片的值来匹配切片。
- 稳定的编号可以让持有者随着时间的推移追随一位成员。
- 切片的数量显示了池中分配了多少个键。
- 在三个密钥的池中，知道其中一个密钥使用什么的人可以知道最后一个密钥使用什么。
- 当池中的可用键低于三个时，条就会消失。之前拍摄的视图仍然显示每个成员使用的内容。
- 在可数窗口上，池总数减去切片可以显示不再分配的键的使用情况。
- 在一个帐户上显示零并在另一个帐户上使用的成员可以显示哪个成员使用哪个帐户。
- 在采用`hard`政策的可数池中，停止按成员公平份额增长的切片暗示了该成员的权重。

### 使用系列（`GET /api/v1/me/usage`）

`GET /api/v1/me/usage?range=<range>` （也在`/v1/me/usage`提供服务）返回调用键自己的请求的使用情况和成本：总计、每个UTC日、每天和模型、每个模型和每个提供者的一个条目。它共享上述配额路由的标志、身份验证规则、 `self:usage`范围、 `Cache-Control: no-store`和错误行为。在`range`之前检查密钥。错误为 400 (`Invalid range`)、401、403、404 和 500 (`Failed to build usage`)。

- `range`是`1d`、 `7d`、 `30d` （默认值）或`90d`之一。任何其他值、空值或重复参数都是 400。该集合在`90d`处停止以限制调用成本。该视图仅读取原始使用历史记录，而不会读取不带密钥的每日摘要。
- 行由调用键的 ID 选择。键名称列永远不会匹配，并且记录的没有键 id 的行永远不会被计数。
- 构建系列会对窗口中的键行运行五个分组查询。构建的序列每个键和范围重复使用 60 秒，重复使用的调用不会运行。它的`generatedAt`给出了它的年龄。
- 该窗口在系列构建完成后结束。稍后标记的行（例如通过时钟偏差）不被计算在内。
- `coverage.retentionDays`是运营商的原始使用历史保留设置（数据库设置中的`retention.usageHistory` ）。当请求的范围长于该设置时， `coverage.truncatedByRetention`为 true。它比较两个数字，但不检查行是否确实丢失。
- 提供者按照密钥自己的请求的记录返回。 Model 是最后一个`/`之后记录的名称，行按它分组。每个目标都被拒绝的组合请求将使用作为提供者的路由标签（组合名称`auto`或`combo`）和客户端发送的模型字符串进行记录。其他被拒绝的请求，例如通过断路器开路、模型冷却或配额停放跳过，保留目标提供程序和模型。
- 除了计数和成本之外，响应还包含平均延迟、成功率以及第一个和最后一个请求的时间。
- `byModel`列出了请求最多的 50 个提供者和模型对。对于更多对，其条目加起来不会达到`summary`，并且`summary.uniqueModels`会计算每个记录的模型拼写。那么`byModelTruncated`为真，并且对落在切割两侧的模型显示部分总数。
- 报告了两项成本。 `costUsd`是计费成本，如使用情况分析所示。固定费率订阅提供者（例如Claude Code 计划）的计数为 0 美元。 `listPriceUsd`使用量与标价相同，包括订阅。模型没有价格行的请求会计算其存储的成本：提供者报告的成本，或记录请求时计算的成本。只有两者都没有的请求才算为 0，并且没有标记，因此总计可能是部分的。
- 响应合约是`src/shared/schemas/selfUsage.ts` （ `docs/openapi.yaml`中的`SelfUsageSeries` ）。

### 自助服务页面

With `QUOTA_SELF_PANEL` on, `/quota/{provider}` is a public page.密钥持有者在此处键入API密钥，并查看提供者的该密钥池。每个池子的每个池子窗口显示一张卡，每个人都可以使用该池子，并且钥匙自己共享。池中的每个账户都有自己的卡，有账户的用途和密钥的份额。仅当密钥可以看到帐户数据时，才会显示帐户的使用情况。该页面还列出了每个帐户的每个模型限制以及密钥本身的使用情况。当日程表现在阻止该密钥时，会出现一条通知。卡片列出了每个型号的钥匙上限及其使用情况，并标记了已达到的上限。 `{provider}` is a provider id or its alias (`/quota/claude`, `/quota/cc`).未知的提供者，以及标志关闭时的每个`/quota/*`路径，都会回答 404。自定义 OpenAI 或 Anthropic 兼容节点上的池没有页面。 The API still answers for them.

The page has no session.密钥仅在`GET /api/v1/me/quota/{provider}`、 `PATCH /api/v1/me/quota/{provider}`和`GET /api/v1/me/usage`的`Authorization`标头中发送，而不会在URL中发送。服务器接受的密钥保存在选项卡的`sessionStorage`中。使用“记住在此设备上”时，它会保留在`localStorage`中，而“忘记密钥”则会将其从两者中删除。服务器拒绝的密钥将从存储中删除。

A pool in `consent` mode shows a lending card.在那里，钥匙持有者设定了钥匙闲置份额的 0 到 100 的整数百分比来出借。持有者还可以选择同意的持续时间：直到关闭、1 小时、8 小时、24 小时、7 天或 30 天。 A duration counts from the moment of saving.当截止日期有效时，持有人可以保留它。如果在“保存”之前过了该截止日期，该卡将不发送任何内容并要求其他选择。 With 0% no deadline is sent.该卡显示存储的截止日期及其指定的时区。已过截止日期的同意将显示为已结束。

对于`hard`密钥，该卡还列出了每个池窗口当前借给该密钥的其他密钥。每一行都是所有其他键的一个数字。在两个钥匙的池中，它是另一个钥匙自己的数字。视图不报告的数字读取为不可用，而不是零。对于`soft`或`burst`钥匙，卡上显示没有数字适用。

`saturation`模式下的矿池，其密钥存储的百分比大于 0，仅显示提款。它说存储的百分比在那里没有影响。 Its Withdraw button sends 0 with no deadline. `saturation`模式下的矿池存储了 0，表明没有借出卡。保存后，返回的视图不再需要的卡片将保留其消息，直到页面视图再次更改。

在持有人按下“保存”或“提款”之前，不会保存任何内容。每个压力机都会发送一个`PATCH /api/v1/me/quota/{provider}`请求，而第二个压力机在第一个压力机等待处理时不会发送任何内容。主体带有池的不透明`ref`从视图、百分比和截止日期。答案是重建的配额视图，页面显示它，无需第二次读取。当两个保存重叠时，页面会在最后一个答案后读取一次配额。该页面不会在浏览器存储中保留同意。

拒绝更改会在卡上通过从HTTP状态中选择的文本进行解释。 The error body is not read. 401 表示密钥未被接受并重新加载配额。 403 表示池未进行贷款更改，404 表示池已消失。 Both offer a button that reloads the quota. 400 或另一个 4xx 答案要求持有人检查百分比和截止日期。 429 要求持有者等待，并在得到答复时以`Retry-After`秒数等待。 5xx 答案、408 或网络故障表示更改可能尚未保存，并保留键入的值。合同之外的答复会重新加载配额。 A failed save does not remove the key by itself.当拒绝后重新加载时，页面会像任何被拒绝的读取一样删除密钥。

接受密钥后，该页面还会显示带有三个选项卡的“设置您的工具”卡。 “Claude Code”给出了`~/.claude/settings.json`的`env`块。 “Shell”给出与`export`行相同的变量。 “Claude Desktop”给出了其第三方推理窗口的值。这些模型是密钥可能要求该提供者的配额共享模型。当密钥没有包含此类列表时，该块会改为启用网关模型发现。网关地址是服务器报告的公共API源（`OMNIROUTE_PUBLIC_API_BASE_URL`，然后`OMNIROUTE_PUBLIC_BASE_URL`）。如果两者均未设置，卡片会显示一个占位符并告诉持有者询问管理员。键显示为占位符。 “包括我的密钥”将整个密钥放在屏幕上的文本中以及复制按钮复制的内容中。这种情况会一直持续到盒子被清除、钥匙被遗忘或更换、或者页面被留下为止。该卡不发送请求，也不提供文件下载。

API标记`stale`的读数显示为可能已过时。标记`unavailable`读数会显示其原因，而不是零。

在百分比计划中，当API报告时，页面会绘制密钥自己的份额。它说这个数字是一个估计值并指出了它的两个部分。每个模型的限制仅显示帐户。

当窗口带有`members`时，其卡片还会显示一个栏，每个成员按槽位顺序显示一个段。询问键的部分使用强调色。其他部分循环显示主题的图表颜色。文本图例列出了每个段及其值，因此不依赖于颜色。段标记为`You`或`Member N`，其中 N 是槽。

### 页面专用端口

`QUOTA_PANEL_PORT`打开第二个侦听器，仅为自助服务页面提供服务。除非设置了变量，否则它会关闭。 `QUOTA_PANEL_HOST`是绑定地址，默认为`127.0.0.1`。

侦听器将这些路径中继到主端口，并为每个其他路径应答 404：

| 小路                                                                     | 服务                   |
| ------------------------------------------------------------------------ | ---------------------- |
| `/quota/{provider}`                                                      | 页面                   |
| `/api/v1/me/quota/{provider}`, `/v1/me/quota/{provider}`                 | 查看页面读取的配额     |
| `/api/v1/me/usage`, `/v1/me/usage`                                       | 页面读取的使用系列     |
| `/_next/static/`                                                         | 构建的脚本、样式和字体 |
| `/favicon.ico`, `/favicon.svg`, `/icon-512.png`, `/apple-touch-icon.png` | 图标                   |

`GET`和`HEAD`在没有正文的情况下进行中继。还中继了一个带有正文的请求：配额视图路径的`PATCH` ，页面发送该请求以保存借出选择。任何其他方法都会应答 404，除了CONNECT请求，其连接会在没有应答的情况下关闭。声明主体的任何其他请求都会回答 404，并且其连接将关闭。升级请求被拒绝并且它们的连接被关闭。带有点段或片段标记的路径将被拒绝，如在API端口上。具有可打印ASCII之外的字符的请求目标也是如此。在该端口自己进行检查之前， HTTP解析器会回答目标中的原始控制字符 400。框架保留供自己使用的请求标头不会被转发：以`x-middleware-`、 `x-invoke-`、 `x-nextjs-`、 `x-now-`或`x-next-`开头的名称，以及名称`x-matched-path`和`next-resume`。请求在没有它们的情况下被转发。仪表板、登录页面、管理API和推理路由无法通过此端口访问。

`PATCH`必须携带`Content-Type: application/json`，不带参数或仅带`charset=utf-8` 。它必须携带一个从 1 到 4096 的`Content-Length` ，写为纯数字，并且没有`Transfer-Encoding`。违反这些规则之一的`PATCH`会回答 404。在该端口自己进行检查之前， HTTP解析器会回答 400 一些格式错误的长度，例如带符号或重复的长度。端口在联系主端口之前读取声明的字节，并最多等待 5 秒。此时尚未完成的主体会回答 404，并且其连接将关闭。在这种情况下，或者当客户端先离开时，没有任何东西到达主端口。端口准确地中继声明的字节，具有相同的`Content-Length`。它们之后的字节将作为连接上的下一个请求读取。前面的TLS反向代理必须转发`Content-Length`并且不得重新分块请求正文。主端口检查`Authorization`标头中的API密钥，就像`GET`一样。

404正文是`{"error":"not_found","message":"Not found."}`。失败的中继会应答 502 (`api_bridge_unavailable`) 或 504 (`api_bridge_timeout`)，但没有`detail`字段。

侦听器不会读取`QUOTA_SELF_PANEL`，也不会打开页面。当标志关闭时，页面及其API在主端口上应答 404，并且侦听器中继该应答。

在开发服务器（`next dev`）下，页面不会通过此端口进行交互。开发热重载套接字是升级请求，端口拒绝它。开发时使用主端口。

端口提供普通HTTP服务，页面发送API密钥。保留默认的绑定地址，并在其前面放置一个带有TLS反向代理。除环回之外的绑定地址会记录此通知：

```text
[Quota Panel] Bound to <host>. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.
```

不发送转发标头的环回对等体在主端口上被视为本地。因此同一主机上的代理必须发送`X-Forwarded-For`。仅使用`OMNIROUTE_TRUST_PROXY=private` （或`lan`）的该标头才信任私有地址上的代理。任何其他对等点都通过其连接地址进行报告，并且其发送的转发标头将被丢弃。

侦听器一次最多拥有 256 个连接。客户端有 10 秒的时间发送请求标头，有 30 秒的时间发送整个请求。空闲的保持活动连接将在大约 5 秒后关闭。 60 秒内没有任何活动的连接将被关闭。这些值是固定的。还要在前面的反向代理上设置连接和速率限制。前面的反向代理应将其空闲上游连接保持在 5 秒以内，或者不重用它们。到主端口的中继使用API端口 (`API_BRIDGE_*`) 的上游超时。

当`API_PORT`未设置时，监听器也会启动。 `QUOTA_PANEL_PORT`必须是 1 到 65535 之间的端口，仅以数字形式书写。它必须不同于仪表板端口和API端口。当实时WebSocket服务器打开时，它也必须与`LIVE_WS_PORT`不同（默认 20132）。任何其他值都不会打开任何内容并记录警告。有关拒绝值的警告会为变量命名，并且不会重复该值。已在使用的端口不会打开任何内容并记录此警告：

```text
[Quota Panel] Port <port> is already in use. The quota panel port stays off.
```

设置`OMNIROUTE_BASE_PATH`后，侦听器期望该前缀下的上述每个路径。在构建时和运行时使用相同的`OMNIROUTE_BASE_PATH` 。使用前导斜杠且没有尾随斜杠编写它，例如`/omniroute`。另一种形状，包括`/`和`/omniroute/`，将端口关闭并带有警告，尽管构建接受这些形式。在任何情况下，第一段命名应用程序路由的基本路径也是如此： `api`、 `v1`、 `v1beta`、 `_next`、 `quota`、 `dashboard`、 `docs`、 `login`、 `codex`、 `responses`、 `anthropic`、 `openai`、 `v0`或`connect`。

限制：

- 带有尾部斜杠的`/quota/{provider}/`在此端口上应答 404。
- Service Worker 和 Web 应用程序清单不在此端口上提供服务。
- 此端口上不显示仪表板中设置的自定义图标。
- 当应用程序在基本路径下运行时，不会显示图标。
- 该端口讲普通的HTTP/1.1.
- 在进程重新启动之前，不会重试失败的绑定。
- 侦听器对每个客户端地址没有连接或速率限制。
- 本节不涵盖容器设置。

---

## 环境变量

| 多变的                               | 默认         | 描述                                             |
| ------------------------------------ | ------------ | ------------------------------------------------ |
| `QUOTA_STORE_DRIVER`                 | `sqlite`     | 使用的驱动程序： `sqlite`或`redis`               |
| `QUOTA_STORE_REDIS_URL`              | _（空的）_   | Redis URL, 例如`redis://localhost:6379`          |
| `QUOTA_SATURATION_THRESHOLD`         | `0.5`        | 0..1； `>= threshold`激活严格模式                |
| `QUOTA_PERCENT_MIN_TOKENS_PER_POINT` | `1000`       | 最多解释百分比计划窗口的一个点的令牌             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`     | `0.7`        | 0..1；软政策组合分数的乘数                       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS`   | `14`         | GC删除旧`quota_consumption`存储桶前的天数        |
| `QUOTA_PANEL_PORT`                   | _（未设置）_ | 自助服务页面的专用端口。未设置意味着没有侦听器。 |
| `QUOTA_PANEL_HOST`                   | `127.0.0.1`  | 为该端口绑定地址                                 |

DB设置 (`quotaStore.*`) 覆盖环境变量。

---

## 故障排除

### 已配置 Redis 但无法连接

检查是否已安装 `ioredis`（`npm ls ioredis`），并确认 `QUOTA_STORE_REDIS_URL` 可访问。连接失败时，工厂会回退到 SQLite（以 `warn` 级别记录）。

### `peek` 返回过时结果/失效时放行

如果 `peek` 抛出异常，`enforceQuotaShare` 会将结果视为“允许”（失效时放行）。检查 `pino` 日志中的 `quota:enforce` 和 `quota:factory` 条目以确定根本原因。

### 消耗计数器偏移

如果提供者的实际使用量与计数器不同，这是预期现象——双桶滑动窗口在窗口边界处约有 1% 的误差，并且 `consume` 是响应后即发即弃的操作。饱和度信号（`saturationSignals.ts`）会以 30 秒 TTL 读取提供者的实际利用率，并相应调整 `globalUsedPercent`。

### 配额池的消耗速率显示“无数据”

`computeBurnRate` 至少需要 2 个历史样本。此前未调用过 `consume` 的新配额池将显示 `tokensPerSecond: 0` 和 `timeToExhaustionMs: null`。

---

## 从 localStorage 迁移

首次加载 `/dashboard/costs/quota-share` 时，hook `useLocalStoragePoolMigration`
会检查：

1. `localStorage.getItem("omniroute:quota-share:pools")` 非空。
2. `GET /api/quota/pools` 返回 `[]`（DB 为空）。

如果两个条件均为真，则会将每个旧版池批量提交到 `POST /api/quota/pools`，
然后移除 localStorage 键。该迁移具有幂等性：条件 2 可防止
重复迁移。

---

## 内部策略分类

`quota-share` 是一种**仅供内部使用**的路由策略（位于
`src/shared/constants/routingStrategies.ts` 中的 `INTERNAL_ROUTING_STRATEGY_VALUES`）。
它仅由系统生成的 `qtSd/` 池组合使用，并被特意排除在 `ROUTING_STRATEGY_VALUES`
之外，因此永远不会在 UI 或 API 中作为用户可选选项出现。

---

## 测试覆盖率

配额共享引擎提供两层自动化覆盖：

| 套房              | 命令                                                                   | 它涵盖什么                                                                                                                                                       |
| :---------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 单元（29 项测试） | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR调度程序、饱和门控、并发上限、 fairShare数学、积压队列                                                                                                        |
| 积分矩阵          | `npm run test:combo:matrix`                                            | 通过真实组合管道进行端到端路由决策； DRR公平性+通过实时接缝进行饱和度降低优先级（`registerQuotaFetcher`、 `setLKGP`、 `__setHeadroomSaturationFetcherForTests`） |

集成矩阵与所有 22 种公共策略一起在CI中运行。该单元套件可以独立运行。

---

## DB架构摘要

迁移`078`、 `079`和`085`添加的三个表：

- `quota_pools` + `quota_allocations` —池定义和每键分配。
- `quota_consumption` —每个`(apiKeyId, dimensionKey)`滚动 2 桶计数器。
- `provider_plans` —手动提供者计划覆盖（每个connectionId的JSON维度）。

通过幂等`CREATE TABLE IF NOT EXISTS`迁移添加的所有表。

同意借贷添加了三列： `quota_allocations.lending_percent` （整数，默认 0）、 `quota_allocations.lending_until` （纪元毫秒，或`NULL`表示无截止日期）和`quota_pools.borrow_mode` （默认`saturation`）。它的迁移仅添加这些列，而不写入现有行。

百分比归属簿添加了`quota_percent_ledger` （每个池、账户和计划窗口一行）和`quota_percent_ledger_tokens` （每个池、账户和API密钥一个代币计数器）。 `src/lib/db/quotaPercentLedger.ts`读取和写入它们。
