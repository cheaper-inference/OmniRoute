# Progressive Web App (PWA) Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

将OmniRoute仪表板安装为渐进式 Web 应用程序，以便从主屏幕或桌面的独立窗口中打开它。安装的应用程序仍然需要连接到OmniRoute服务器以进行导航、仪表板数据和API请求。缓存的静态资产不提供离线网关或离线仪表板。

## 什么是PWA？

渐进式 Web 应用程序使用带有应用程序图标和单独窗口的 Web 仪表板。安装后， OmniRoute：

- 从主屏幕或桌面启动
- 以独立模式打开，没有浏览器常用的地址栏和选项卡
- 缓存选定的静态资源
- 支持纵向和横向

## 安装

使用另一台设备上的服务器的HTTPS地址。当服务器运行在同一设备上时， `http://localhost:20128`也满足浏览器可安装性要求。普通的`http://YOUR_IP:20128`地址不满足这些要求。安装菜单和提示取决于浏览器和操作系统。请参阅[MDN的PWA安装要求](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required)。

### 安卓（Chrome）

1. 在同一部手机上打开您的OmniRoute HTTPS地址或服务器的`http://localhost:20128` 。
2. 打开**⋮**菜单并选择**安装应用程序**或者**添加到主屏幕**，如果提供的话。
3. 确认提示。
4. 从主屏幕打开OmniRoute 。

### iOS (Safari)

1. 在 Safari 中打开您的OmniRoute HTTPS地址。
2. 轻敲**分享**→**添加到主屏幕**。
3. 确认名称并点击**添加**。
4. 从主屏幕打开OmniRoute 。

### 桌面版（Chrome / Edge）

1. 打开您的OmniRoute仪表板。
2. 使用浏览器的安装图标或**安装应用程序**菜单条目（如果提供）。
3. 确认提示在其自己的窗口中打开OmniRoute 。

## 特征

### 独立窗口

清单设置`display: "standalone"`和`start_url: "/dashboard"`。安装的应用程序会在应用程序窗口中打开仪表板。浏览器和操作系统控件仍然会出现；清单不请求全屏模式。

### 缓存资源和网络要求

[Service Worker](../../public/sw.js)缓存选定的同源资源：

| 请求或资产                   | 战略     | 行为                                                                                         |
| ---------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| 安装时资源                   | 预缓存   | `/`、 `/manifest.webmanifest`、 `/icon-512.png`和`/apple-touch-icon.png`在工作器安装期间缓存 |
| Next.js静态资产（`/_next/`） | 网络优先 | 成功响应更新缓存；网络错误回退到现有的缓存响应                                               |
| 其他静态CSS、 JS、图像和字体 | 缓存优先 | 现有的缓存响应被重用；成功的网络响应会在未命中时被缓存                                       |
| 页面导航                     | 旁路     | 浏览器直接获取页面；不提供离线后备服务                                                       |
| API、仪表板和身份验证路由    | 旁路     | Worker 不会拦截或缓存这些请求                                                                |
| 其他非静态请求               | 网络     | 没有缓存查找或存储                                                                           |

排除的路由有`/api`、 `/a2a`、 `/dashboard`、 `/v1`、 `/v1beta`、 `/models`、 `/chat`、 `/responses`、 `/codex`、 `/callback`和`/login`，在路径边界处不区分大小写进行匹配。跨域和非 GET 请求也会绕过工作线程。

### 连接页面

`/offline`页面提供连接消息、 online/offline指示符、**重试连接**按钮和状态页面的链接。这是**未预先缓存**而服务人员则这样做**不是**将失败的导航重定向到它。它的存在不会使新页面无需服务器即可访问。

### 应用程序图标

清单宣传了这些PNG图标：

| 文件                   | 尺寸    | 使用                       |
| ---------------------- | ------- | -------------------------- |
| `icon-192.png`         | 192×192 | 通用应用程序图标           |
| `icon-512.png`         | 512×512 | 通用和可屏蔽的应用程序图标 |
| `apple-touch-icon.png` | 180×180 | 苹果主屏幕图标             |

浏览器为安装目标选择适当的图标。

### 自动注册

当浏览器支持 Service Worker 时，`PwaRegister`会在生产环境中注册 Worker。开发模式会取消注册工作人员并清除缓存，以避免过时的资产干扰热重载。安装提示仍然由浏览器决定。

## 技术架构

### Web 应用程序清单

Next.js从[`src/app/manifest.ts`](../../src/app/manifest.ts)生成`/manifest.webmanifest` 。其关键设置为：

| 环境           | 价值                               |
| -------------- | ---------------------------------- |
| `short_name`   | `OmniRoute`                        |
| `start_url`    | `/dashboard`                       |
| `scope`        | `/`                                |
| `display`      | `standalone`                       |
| `orientation`  | `any`                              |
| 背景和主题颜色 | `PWA_THEME_COLORS`的默认灯光调色板 |

清单的名称和描述是该源文件中的静态值。安装的清单不会在每次访问时遵循实例名称设置或活动调色板。

### 服务人员

[`public/sw.js`](../../public/sw.js)没有 service-worker 框架依赖性：

- **安装：**预缓存上面列出的四个资源并激活新的工作线程。
- **激活：**删除较旧的缓存代并声明客户端。
- **拿来：**应用上面的静态资产策略和路由排除。
- **版本控制：**源缓存名称是`omniroute-pwa-v3`；生产版本会标记缓存标识。
- **通知：**处理传入的`push`事件并在单击通知时聚焦或打开窗口。

单独的推送事件处理程序不会建立活动的推送订阅或配置的服务器传递。不要假设仅仅因为安装了PWA就启用了通知。

### 布局元数据和注册

[`src/app/layout.tsx`](../../src/app/layout.tsx)提供清单链接、Apple 独立元数据、主题颜色和`viewport-fit: cover`。页面标题和 Apple Web 应用程序标题使用实例名称。实时浏览器主题颜色遵循调色板；安装清单使用默认的浅色。

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx)在客户端上运行，并在其URL中向构建ID注册`/sw.js` 。它检测不匹配的缓存生成，并可以重置工作程序并重新加载一次以从旧安装中恢复。注册失败不会阻止仪表板。

## 与 Termux 一起使用 (Android)

1. 在 Termux 中启动OmniRoute ： `npx -y omniroute@latest`。
2. 在同一部手机上打开 Chrome： `http://localhost:20128`。
3. 通过浏览器的安装菜单安装PWA 。
4. 使用仪表板时保持 Termux 服务器运行。

电话托管网关及其仪表板。对远程AI提供者的请求仍然需要网络访问。有关设置和 Android 进程生命周期注意事项，请参阅[Termux 指南](TERMUX_GUIDE.md)。

## 从其他设备使用

在手机、平板电脑或台式机上打开服务器的HTTPS地址，然后按照该浏览器的安装流程进行操作。服务器必须保持可从每个设备访问。有关远程访问选项，请参阅[隧道指南](../ops/TUNNELS_GUIDE.md)。

## 定制化

### 实例名称

这**实例名称**设置更改仪表板元数据，包括页面标题和 Apple Web 应用程序标题。生成的清单使用静态名称，因此此设置不能保证重命名已安装的应用程序。

### 自定义图标

自定义图标会更改浏览器图标。安装清单仍然公布上面的PNG文件；更改图标不会替换那些主屏幕图标。

## 局限性

- **需要连接服务器：**页面导航、仪表板状态和API请求没有离线回退。
- **无后台同步：**离线操作不会排队等待重播。
- **浏览器差异：**安装菜单、窗口呈现和通知支持因平台而异。
- **无API响应缓存：**工作人员不包括API、仪表板和身份验证路由。
- **静态安装图标：**更新这些图标需要更改广告资产；浏览器可能会保留已安装的元数据。

## 文件参考

| 文件                                                                                   | 目的                         |
| -------------------------------------------------------------------------------------- | ---------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | 生成的 Web 应用程序清单      |
| [public/sw.js](../../public/sw.js)                                                     | 缓存、排除和通知事件处理程序 |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | 生产注册和过时缓存恢复       |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | 连接页面，不是自动离线后备   |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | 页面元数据和视口设置         |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | 共享主题颜色值               |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512应用程序图标        |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 苹果图标           |
