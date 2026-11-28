# Progressive Web App (PWA) Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md)

---

將OmniRoute儀表板安裝為漸進式 Web 應用程序，以便從主畫面或桌面的獨立視窗中開啟它。安裝的應用程式仍需要連接到OmniRoute伺服器以進行導航、儀表板資料和API請求。快取的靜態資產不提供離線網關或離線儀表板。

## 什麼是PWA？

漸進式 Web 應用程式使用帶有應用程式圖示和單獨視窗的 Web 儀表板。安裝後， OmniRoute：

- 從主畫面或桌面啟動
- 以獨立模式打開，沒有瀏覽器常用的網址列和分頁
- 快取選定的靜態資源
- 支援縱向和橫向

## 安裝

使用另一台裝置上的伺服器的HTTPS位址。當伺服器運行在同一裝置上時， `http://localhost:20128`也滿足瀏覽器可安裝性要求。普通的`http://YOUR_IP:20128`位址不符合這些要求。安裝選單和提示取決於瀏覽器和作業系統。請參閱[MDN的PWA安裝要求](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#https_localhost_or_loopback_are_required)。

### 安卓（Chrome）

1. 在同一支手機上開啟您的OmniRoute HTTPS位址或伺服器的`http://localhost:20128` 。
2. 打開**⋮**選單並選擇**安裝應用程式**或者**新增到主螢幕**，如果提供的話。
3. 確認提示。
4. 從主畫面開啟OmniRoute 。

### iOS (Safari)

1. 在 Safari 中開啟您的OmniRoute HTTPS位址。
2. 輕敲**分享**→**新增到主螢幕**。
3. 確認名稱並點擊**添加**。
4. 從主畫面開啟OmniRoute 。

### 桌面版（Chrome / Edge）

1. 打開您的OmniRoute儀表板。
2. 使用瀏覽器的安裝圖示或**安裝應用程式**選單條目（如果提供）。
3. 確認提示在其自己的視窗中開啟OmniRoute 。

## 特徵

### 獨立視窗

清單設定`display: "standalone"`和`start_url: "/dashboard"`。安裝的應用程式會在應用程式視窗中開啟儀表板。瀏覽器和作業系統控制項仍然會出現；清單不請求全螢幕模式。

### 快取資源和網路要求

[Service Worker](../../public/sw.js)快取選定的同源資源：

| 請求或資產                   | 策略     | 行為                                                                                         |
| ---------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| 安裝時資源                   | 預快取   | `/`、 `/manifest.webmanifest`、 `/icon-512.png`和`/apple-touch-icon.png`在工作器安裝期間快取 |
| Next.js靜態資產（`/_next/`） | 網路優先 | 成功回應更新快取；網路錯誤回退到現有的快取回應                                               |
| 其他靜態CSS、 JS、圖像和字體 | 快取優先 | 現有的快取回應被重複使用；成功的網路回應會在未命中時被快取                                   |
| 頁面導航                     | 旁路     | 瀏覽器直接取得頁面；不提供離線後備服務                                                       |
| API、儀表板和身份驗證路由    | 旁路     | Worker 不會攔截或快取這些要求                                                                |
| 其他非靜態請求               | 網路     | 沒有快取查找或存儲                                                                           |

排除的路由有`/api`、 `/a2a`、 `/dashboard`、 `/v1`、 `/v1beta`、 `/models`、 `/chat`、 `/responses`、 `/codex`、 `/callback`和`/login`，在路径边界处不区分大小写进行匹配。跨域和非 GET 請求也會繞過工作執行緒。

### 連線頁面

`/offline`頁面提供連線訊息、 online/offline指示符、**重試連接**按鈕和狀態頁面的連結。這是**未預先快取**而服務人員則這樣做**不是**將失敗的導航重定向到它。它的存在不會使新頁面無需伺服器即可存取。

### 應用程式圖標

清單宣傳了這些PNG圖示：

| 文件                   | 尺寸    | 使用                       |
| ---------------------- | ------- | -------------------------- |
| `icon-192.png`         | 192×192 | 通用應用程式圖標           |
| `icon-512.png`         | 512×512 | 通用和可屏蔽的應用程式圖標 |
| `apple-touch-icon.png` | 180×180 | 蘋果主螢幕圖標             |

瀏覽器為安裝目標選擇適當的圖示。

### 自動註冊

當瀏覽器支援 Service Worker 時，`PwaRegister`會在生產環境中註冊 Worker。開發模式會取消註冊工作人員並清除快取，以避免過時的資產幹擾熱重載。安裝提示仍由瀏覽器決定。

## 技術架構

### Web 應用程式清單

Next.js從[`src/app/manifest.ts`](../../src/app/manifest.ts)產生`/manifest.webmanifest` 。其關鍵設定為：

| 環境           | 價值                               |
| -------------- | ---------------------------------- |
| `short_name`   | `OmniRoute`                        |
| `start_url`    | `/dashboard`                       |
| `scope`        | `/`                                |
| `display`      | `standalone`                       |
| `orientation`  | `any`                              |
| 背景和主題顏色 | `PWA_THEME_COLORS`的預設燈光調色板 |

清單的名稱和描述是該來源檔案中的靜態值。安裝的清單不會在每次造訪時遵循實例名稱設定或活動調色板。

### 服務人員

[`public/sw.js`](../../public/sw.js)沒有 service-worker 框架依賴性：

- **安裝：**預先快取上面列出的四個資源並啟動新的工作線程。
- **啟用設定:**刪除較舊的快取代並聲明客戶端。
- **拿來：**應用上面的靜態資產策略和路由排除。
- **版本控制：**來源快取名稱是`omniroute-pwa-v3`；生產版本會標記快取標識。
- **通知：**處理傳入的`push`事件並在點擊通知時對焦或開啟視窗。

單獨的推播事件處理程序不會建立活動的推播訂閱或配置的伺服器傳遞。不要假設僅僅因為安裝了PWA就啟用了通知。

### 佈局元資料和註冊

[`src/app/layout.tsx`](../../src/app/layout.tsx)提供清單連結、Apple 獨立元資料、主題顏色和`viewport-fit: cover`。頁面標題和 Apple Web 應用程式標題使用實例名稱。即時瀏覽器主題顏色遵循調色板；安裝清單使用預設的淺色。

[`PwaRegister`](../../src/shared/components/PwaRegister.tsx)在客戶端上運行，並在其URL中向建置ID註冊`/sw.js` 。它檢測不匹配的快取生成，並可以重置工作程序並重新加載一次以從舊安裝中恢復。註冊失敗不會阻止儀表板。

## 與 Termux 一起使用 (Android)

1. 在 Termux 中啟動OmniRoute ： `npx -y omniroute@latest`。
2. 在同一支手機上開啟 Chrome： `http://localhost:20128`。
3. 透過瀏覽器的安裝選單安裝PWA 。
4. 使用儀表板時保持 Termux 伺服器運作。

電話託管網關及其儀表板。對遠端AI提供者的請求仍然需要網路存取。有關設定和 Android 進程生命週期注意事項，請參閱[Termux 指南](TERMUX_GUIDE.md)。

## 從其他設備使用

在手機、平板電腦或桌上型電腦上開啟伺服器的HTTPS位址，然後依照該瀏覽器的安裝流程進行操作。伺服器必須保持可從每個裝置存取。有關遠端存取選項，請參閱[隧道指南](../ops/TUNNELS_GUIDE.md)。

## 客製化

### 實例名稱

這**實例名稱**設定更改儀表板元數據，包括頁面標題和 Apple Web 應用程式標題。產生的清單使用靜態名稱，因此此設定不能保證重新命名已安裝的應用程式。

### 自訂圖示

自訂圖示會變更瀏覽器圖示。安裝清單仍然公佈上面的PNG檔案；更改圖示不會取代那些主螢幕圖示。

## 限制

- **需要連接伺服器：**頁面導航、儀表板狀態和API請求沒有離線回退。
- **無後台同步：**離線操作不會排隊等待重播。
- **瀏覽器差異：**安裝選單、視窗呈現和通知支援因平台而異。
- **無API回應快取：**工作人員不包括API、儀表板和身份驗證路由。
- **靜態安裝圖示：**更新這些圖示需要更改廣告資產；瀏覽器可能會保留已安裝的元資料。

## 文件參考

| 文件                                                                                   | 目的                         |
| -------------------------------------------------------------------------------------- | ---------------------------- |
| [src/app/manifest.ts](../../src/app/manifest.ts)                                       | 產生的 Web 應用程式清單      |
| [public/sw.js](../../public/sw.js)                                                     | 快取、排除和通知事件處理程序 |
| [src/shared/components/PwaRegister.tsx](../../src/shared/components/PwaRegister.tsx)   | 生產註冊和過時快取恢復       |
| [src/app/offline/page.tsx](../../src/app/offline/page.tsx)                             | 連線頁面，不是自動離線後備   |
| [src/app/layout.tsx](../../src/app/layout.tsx)                                         | 頁面元數據和視口設置         |
| [src/shared/constants/pwaThemeColors.ts](../../src/shared/constants/pwaThemeColors.ts) | 共享主題顏色值               |
| [public/icon-512.png](../../public/icon-512.png)                                       | 512 × 512應用程式圖標        |
| [public/apple-touch-icon.png](../../public/apple-touch-icon.png)                       | 180 × 180 蘋果圖標           |
