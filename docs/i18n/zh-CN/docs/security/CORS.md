# CORS Configuration & Security (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute控制哪些**浏览器起源**可以从单个集中的白名单中读取跨源响应。模型是**默认失败关闭**：在您选择加入之前，不允许任何来源。本页记录了白名单如何解析、 `CORS_ALLOW_ALL=true`实际公开的内容（以及重要的是，它的作用）**不是**）、如何安全地配置开发与生产，以及通配符生效时仪表板显示的运行时警告。

**事实来源：** `src/server/cors/origins.ts` （`resolveAllowedOrigin`、 `applyCorsHeaders`、 `getCorsStatus`）。允许列表应用一次，在中间件 (`src/server/authz/pipeline.ts`) 中， —每路由处理程序本身不会设置`Access-Control-Allow-Origin` 。

## 原点是如何解析的

对于每个请求，中间件按以下顺序计算`Access-Control-Allow-Origin`值：

1. **`CORS_ALLOW_ALL=true`** （或传统的`CORS_ORIGIN=*`） →回显调用者的`Origin` （或`*` ，当没有`Origin`标头时），使用`Vary: Origin`以便缓存保持正确。相同的`applyCorsHeaders()`阻塞点还将`Vary: Accept-Encoding`附加到令牌验证的`/v1*`/`/v1beta*`表面上的每个 2xx-with-body 响应（`relaxForTokenAuth`， RFC 9110 §12.5.5，问题#6737），因此downstream/shared缓存可以正确区分压缩与未压缩变体。
2. 否则，请求`Origin`会被规范化（小写，删除尾部斜杠）并与**合并白名单**:
   - 环境**`CORS_ALLOWED_ORIGINS`** —逗号分隔列表，以及
   - 运行时**`corsOrigins`**设置（仪表板→安全→ _CORS 允许来源_），通过`setRuntimeAllowedOrigins()`从`src/lib/config/runtimeSettings.ts`注入。
3. 没有匹配→**没有发出`Access-Control-Allow-Origin`标头**。浏览器阻止跨域读取。这是预期的故障关闭默认值。

| 环境变量               | 意义                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV的确切来源允许（推荐）。                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` →回显任何来源（通配符）。仅限开发。                   |
| `CORS_ORIGIN`          | 遗产。 `*`行为类似于`CORS_ALLOW_ALL`；将单个值添加到允许列表中。 |

## `CORS_ALLOW_ALL=true`真正暴露的威胁模型—

通用的OWASP警告（“通配符CORS =任何站点都可以调用你的API”）值得认真对待，但OmniRoute的曝光是**比一般情况更窄**，因为一个具体的实施事实：

> **中央`applyCorsHeaders()`从不发出`Access-Control-Allow-Credentials`。**除非服务器发送`Access-Control-Allow-Credentials: true`，否则浏览器不会公开_credentialed_（带有 cookie 的）跨域响应。 OmniRoute的共享CORS路径永远不会。

即使使用`CORS_ALLOW_ALL=true`，这对每个表面意味着什么：

| 表面                           | 认证机制              | 通配符CORS的作用                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 仪表板 / MANAGEMENT `/api/*`   | Cookie 会话           | 起源已得到回应，但是**没有`Allow-Credentials`**浏览器**块**经过认证的阅读。恶意跨源站点**无法阅读**您经过身份验证的仪表板响应，并且会话 cookie 不会公开。                                                                                                                                                                                                                 |
| 客户API `/v1/*`, `/v1beta/*`   | 承载/ `x-api-key`标头 | 已经宽容了**按设计**(`relaxForTokenAuth`)：浏览器永远不会自动附加`Authorization`/`x-api-key`，因此攻击者的页面无法提供您的密钥。宽松的回显需要经过身份验证的主题（经过验证的API密钥或仪表板会话），而不仅仅是凭证标头，并且从不包含`Access-Control-Allow-Credentials`。匿名响应 (`REQUIRE_API_KEY=false`) 使用配置的来源允许列表，包括显式`CORS_ALLOW_ALL=true`选择加入。 |
| 公共只读（`/api/health`，...） | 没有任何              | 不敏感；通配符是无害的。                                                                                                                                                                                                                                                                                                                                                  |

所以**残差**`CORS_ALLOW_ALL=true`的暴露仅限于： (a) 非认证的跨源**读**已经未经验证的数据，以及 (b) 让CORS**飞行前通行证**在管理路由—上，它仍然需要跨源页面无法提供的身份验证。这是**不是**共享CORS路径上的会话劫持或凭证盗窃向量。

### 正品异常— `/api/v1/agents/`

云代理路由（`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`）设置它们的**自己的**CORS标头（`src/lib/cloudAgent/api.ts`、 `getCloudAgentCorsHeaders`）和**做**与`Access-Control-Allow-Credentials: true`一起发出`Access-Control-Allow-Origin: <origin>|*` 。这是起源回声和凭证共存的单一表面，并且它是**独立于`CORS_ALLOW_ALL`** 。这些路由经过管理验证（`requireManagementAuth`）；在脱离主机的情况下公开仪表板的操作员应该意识到，这是响应标头允许跨域凭据读取的地方。将其收紧到明确的许可名单与此CORS指南分开进行跟踪。

## 生产清单

- **切勿在生产中设置`CORS_ALLOW_ALL=true` 。**保持其未设置状态。
- 设置一个**明确的**原始列表—环境变量或安全选项卡字段：

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- 如果OmniRoute在反向代理/隧道（nginx、Caddy、 Cloudflare Tunnel、 Tailscale）后面运行，则CORS是**不是**您唯一的控制—环回路由保护仍然保护能够生成的路由（请参阅[ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ）。不要伪造`X-Forwarded-For: 127.0.0.1`来“修复”403；重新打开路由防护关闭的RCE类。
- 确认运行时状态：仪表板显示**持久的琥珀色旗帜**每当`CORS_ALLOW_ALL=true`处于活动状态时， `/api/settings/authz-inventory`都会返回`cors: { allowAll, allowedOrigins }`信封监控工具可以轮询的情况下，在仪表板→安全→授权清单下。

## 开发便利性—允许特定的本地起源

即使在开发中，你也很少需要通配符。仅允许您使用的开发服务器：

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

源匹配时不区分大小写，忽略尾部斜杠，因此`http://localhost:3000`和`http://localhost:3000/`是等效的。可以在运行时设置相同的CSV**仪表板→安全→ CORS允许的来源**无需重新启动。

## API密钥与 cookie 会话

- **承载/ `x-api-key` （ `/v1/*`推理面）：**浏览器永远不会自动附加这些。 CORS在这里不是一个有意义的障碍— API关键是障碍—这就是为什么该表面是故意允许的，以便浏览器和Electron客户端可以读取他们已经有权获得的响应。宽松的回显需要经过身份验证的主题（经过验证的API密钥或仪表板会话），而不仅仅是凭证标头，并且从不包含`Access-Control-Allow-Credentials`。匿名响应 (`REQUIRE_API_KEY=false`) 使用配置的来源允许列表，包括显式`CORS_ALLOW_ALL=true`选择加入。身份验证拒绝 (401) 保持可读，以便客户端可以显示已撤销或输入错误的密钥 (#5242)：管道自己的 401 保留回显，并且在管道将其作为匿名服务后拒绝密钥本身的路由（配置了管理身份验证的`/v1/models`和`/v1beta/models` ，所有者范围的`/v1/files`、 `/v1/batches`、 `/v1/media`、 `/v1/session-leases`和自动组合候选路由）通过以下方式将回显添加到该 401 `credentialRejectionHeaders()`.回显以携带凭证标头（`Authorization`、 `x-api-key`、 `x-goog-api-key`或`auth_token` cookie）的请求为关键，而不是在路由检查的其中一个上，并且永远不会与`Access-Control-Allow-Credentials`配对；主体是一个固定误差包络线。由`requireManagementAuth()`保护的`/api/v1/`下的管理路由（`/api/v1/management/*`、 `/api/v1/registered-keys`、 `/api/v1/providers/[provider]/limits`、 `/api/v1/accounts/[id]/limits`、 `/api/v1/issues/report`）不使用此凭据拒绝例外：使用`REQUIRE_API_KEY=false`时，它们的401/403响应遵循配置的CORS源策略。
- **Cookie 会话（仪表板）：**受故障关闭默认值保护**和**由于共享路径上缺少`Access-Control-Allow-Credentials` 。让management/dashboard起源远离任何允许的配置；它们必须完全保持故障关闭状态。

## WebSocket握手（`/v1/responses`、 `/v1/ws`）

浏览器不会将CORS应用于WebSocket，因此返回推理输出的WebSocket传输会检查握手`Origin`本身 (`src/server/origin/wsOrigin.ts`)：响应WebSocket (`/v1/responses`)，并且当OmniRoute运行通过`npm start` / `npm run dev`时， `/v1/ws`和`/api/v1/ws`桥接器将`/v1/chat/completions`、 `/v1/messages`和`/v1/responses`作为帧进行流式传输。桥接器向`/api/v1/ws?handshake=1`请求判决并拒绝升级，除非该路由运行了检查。身份验证要求仍然单独适用。来源检查在以下情况下通过：

- 它没有`Origin`标头（Codex CLI、 SDKs和其他非浏览器客户端）；
- `Origin`由上面的白名单允许（`CORS_ALLOWED_ORIGINS`、 `corsOrigins`设置、 `CORS_ORIGIN`、 `CORS_ALLOW_ALL`）；
- `Origin`是OmniRoute自己的公共来源之一（配置的公共基础URL、受信任代理的转发来源或作为IP文字或`localhost` —给出的直接loopback/LAN主机，与仪表板突变检查使用的候选者相同）；或者
- 它带有一个有效的API密钥，就像在HTTP `/v1/*`表面上一样。

其他任何事情都会得到`403 ws_origin_forbidden`。仪表板会话 cookie 不会免除外部`Origin`，因为浏览器将其附加到任何页面的套接字。另一个端口上的`localhost`不被视为同源；将此类开发起源添加到`CORS_ALLOWED_ORIGINS`。

## 示例： OmniRoute前面的反向代理

CORS是由OmniRoute本身强制执行的，因此代理通常应该**不是**添加或重写`Access-Control-*`标头（双标头会破坏浏览器）。终止TLS并转发—让OmniRoute应答预检：

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

在OmniRoute （`CORS_ALLOWED_ORIGINS`或安全选项卡）中设置允许的浏览器来源，而不是在代理中。

## 源文件

| 忧虑                            | 文件                                                                 |
| ------------------------------- | -------------------------------------------------------------------- |
| 许可名单决议+ `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| 中间件应用程序（单一事实来源）  | `src/server/authz/pipeline.ts`                                       |
| 设置→运行时源注入               | `src/lib/config/runtimeSettings.ts`                                  |
| 仪表板的运行时状态              | `src/app/api/settings/authz-inventory/route.ts`                      |
| 仪表板警告横幅                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS允许的来源字段              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent 每路由CORS （例外） | `src/lib/cloudAgent/api.ts`                                          |
| WebSocket握手`Origin`检查       | `src/server/origin/wsOrigin.ts`                                      |

## 参见

- [路由保护层](./ROUTE_GUARD_TIERS.md)—环回强制执行可生成的路由（单独的补充控制）。
- [授权指南](../architecture/AUTHZ_GUIDE.md)—完整的身份验证管道。
