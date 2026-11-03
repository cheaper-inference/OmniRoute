# Electron Desktop Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **সত্যের উত্স:** `electron/` কর্মক্ষেত্র** সর্বশেষ আপডেট:** 2026-06-28 — v3.8.40

OmniRoute একটি ক্রস-প্ল্যাটফর্ম ডেস্কটপ অ্যাপ (Windows / macOS / Linux) তৈরি করে**Electron 41** +** ইলেক্ট্রন-বিল্ডার 26.10** . ডেস্কটপ অ্যাপটি একটি শিশু প্রক্রিয়া হিসাবে Next.js স্ট্যান্ডঅ্যালোন সার্ভার তৈরি করে, এটিতে একটি `BrowserWindow` নির্দেশ করে এবং একটি সিস্টেম ট্রে, অটো-আপডেটার, IPC ব্রিজ এবং জিরো-কনফিগ গোপন বুটস্ট্র্যাপ যোগ করে।

## স্থাপত্য

```
┌──────────────────────────────────────────────┐
│ Electron main process (electron/main.js)     │
│ ├─ Single-instance lock                       │
│ ├─ Child process: Next.js standalone server  │
│ │   (spawned with Electron's Node runtime)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ Auto-update via electron-updater          │
│ ├─ Content Security Policy (session headers) │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## সংস্করণ

`electron/package.json` থেকে নিশ্চিত করা হয়েছে:

| প্যাকেজ            | সংস্করণ                                                               |
| ------------------ | --------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                             |
| `electron-builder` | `^26.15.3`                                                            |
| `electron-updater` | `^6.8.9`                                                              |
| `better-sqlite3`   | রুট `^13.0.2` (নোড-এপিআই পূর্বনির্মাণ করে — না Electron পুনর্নির্মাণ) |
| অ্যাপ সংস্করণ      | `3.8.0`                                                               |
| অ্যাপ আইডি         | `online.omniroute.desktop`                                            |
| পণ্যের নাম         | `OmniRoute`                                                           |

## স্ক্রিপ্ট (মূল `package.json`)

| স্ক্রিপ্ট                         | উদ্দেশ্য                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` + `localhost:20128` + Electron করার জন্য অপেক্ষা করছে                       |
| `npm run electron:build`          | Next.js তৈরি করে তারপর বর্তমান OS জন্য `electron-builder` চালায়                          |
| `npm run electron:build:win`      | Windows NSIS ইনস্টলার + পোর্টেবল তৈরি করে (x64)                                           |
| `npm run electron:build:mac`      | macOS DMG তৈরি করে (Intel + Apple সিলিকন)                                                 |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) তৈরি করে                                               |
| `npm run electron:smoke:packaged` | প্যাকেজ করা বাইনারি চালু করে এবং HTTP 200 এর জন্য `/login` প্রোব করে, তারপর বন্ধ করে দেয় |

`electron/` কর্মক্ষেত্রটিও প্রকাশ করে:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` চালায়
- `npm run build:mac-x64` / `build:mac-arm64` — একক-আর্ক macOS তৈরি করে
- স্থানীয় পরীক্ষার জন্য `npm run pack` — ডিরেক্টরি-শুধুমাত্র বিল্ড (কোন ইনস্টলার নেই)

## ঐচ্ছিক রানটাইম প্যাক

ডেস্কটপ বিল্ডগুলি তাদের ইনস্টলারদের পাশাপাশি ঐচ্ছিক রানটাইম সংরক্ষণাগারগুলি প্রকাশ করতে পারে। ইনস্টল করা সার্ভার পেলোডে `optional-packs.index.json` রয়েছে ( Windows এবং Linux এ `resources/app` এর অধীনে)। `browser-runtime` এন্ট্রির জন্য, `packs[].tarball` পড়ুন এবং ডাউনলোড করুন** একই রিলিজ থেকে সেই সঠিক ফাইলের নাম** . আর্কাইভ নামের একটি SHA-256 ডাইজেস্ট অন্তর্ভুক্ত; বিভিন্ন বিল্ডের জন্য বিভিন্ন আর্কাইভের প্রয়োজন হতে পারে। ডাউনলোড করা ফাইলের নাম অপরিবর্তিত রাখুন।

ইনস্টল করা অ্যাপের সূচী এবং নির্বাচিত সংরক্ষণাগারটি একটি ডিরেক্টরিতে অনুলিপি করুন, তারপর একই রিলিজ থেকে CLI ব্যবহার করুন:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` ইনস্টলেশন এবং যাচাইকরণের অবস্থা প্রদর্শন করে, সংরক্ষণাগার ফাইলের নাম নয়। বান্ডিল করা সূচী সংরক্ষণাগার নির্বাচন করে। ইনস্টলেশন নিষ্কাশনের আগে এর সংরক্ষণাগার চেকসাম এবং ইনস্টল করা প্যাক প্রতিস্থাপন করার আগে এর প্যাকেজ চেকসাম যাচাই করে। এটি স্থানীয় ফাইল পড়ে; এটি অনুপস্থিত সংরক্ষণাগার ডাউনলোড করে না। ইনস্টলেশন পরে অ্যাপ্লিকেশন পুনরায় আরম্ভ করুন. যদি রিলিজের কোনো মিলে যাওয়া সম্পদ না থাকে, তাহলে ঐ রিলিজের সম্পদের মাধ্যমে ঐচ্ছিক প্যাক পাওয়া যায় না।

## ডিরেক্টরি বিন্যাস

```
electron/
├── package.json              # Electron deps + electron-builder config
├── main.js                   # Main process (24 KB — see annotations below)
├── preload.js                # contextBridge IPC bridge
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI types
├── README.md                 # In-workspace notes
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder output (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Stages .next/electron-standalone bundle
└── dev/
    └── smoke-electron-packaged.mjs       # Post-build smoke test
```

`main.js` এবং `preload.js` উভয়ই**CommonJS `.js` ফাইল** , TypeScript না। রেন্ডারার-সাইড টাইপিংগুলি `electron/types.d.ts` এ থাকে।

## IPC সেতু (`preload.js`)

প্রিলোড `contextIsolation: true` এবং `nodeIntegration: false` এর সাথে `contextBridge` ব্যবহার করে `window.electronAPI` এ একটি সাদা তালিকাভুক্ত API প্রকাশ করে।

```javascript
const VALID_CHANNELS = {
  invoke: [
    "get-app-info",
    "open-external",
    "get-data-dir",
    "restart-server",
    "check-for-updates",
    "download-update",
    "install-update",
    "get-app-version",
  ],
  send: ["window-minimize", "window-maximize", "window-close"],
  receive: ["server-status", "port-changed", "update-status"],
};
```

উন্মুক্ত পদ্ধতি:

| রেন্ডারার কল                                                      | টাইপ                     |
| ----------------------------------------------------------------- | ------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | আহ্বান                   |
| `openExternal(url)`                                               | আহ্বান                   |
| `getDataDir()`                                                    | আহ্বান                   |
| `restartServer()`                                                 | আহ্বান                   |
| `getAppVersion()`                                                 | আহ্বান                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | আহ্বান                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | পাঠান                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | গ্রহণ (রিটার্ন ডিসপোজার) |

রিসিভ হেল্পাররা ফিরে আসে ক** ডিসপোজার ফাংশন** `removeAllListeners` — এর উপর নির্ভর করার পরিবর্তে এটি React উপাদানগুলি পুনরায় মাউন্ট করার সময় শ্রোতাদের জমা হতে বাধা দেয়।

## সার্ভার জীবনচক্র

সিস্টেম নোডের সাথে নেটিভ-মডিউল ABI অমিল এড়াতে`main.js` সরাসরি Electron নোড রানটাইমের সাথে Next.js স্বতন্ত্র বান্ডেল তৈরি করে:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

হাইলাইট:

- `waitForServer()` উইন্ডোটি দেখানোর আগে 30 সেকেন্ড পর্যন্ত URL পোল করে (কোল্ড স্টার্টে কোন ফাঁকা স্ক্রীন নেই)।
- `stdio: "pipe"` stdout/stderr ক্যাপচার করে; প্রস্তুত বাক্যাংশ (`Ready` / `listening`) IPC এর উপর `server-status: running` নির্গত করে।
- `before-quit` graceful SIGTERM (WAL চেকপয়েন্ট) এর জন্য 5 সেকেন্ড পর্যন্ত অপেক্ষা করে তারপর SIGKILL পাঠায়।
- ট্রেতে পোর্ট সুইচার (`20128`, `3000`, `8080`) স্টপ করে এবং সার্ভার পুনরায় চালু করে, তারপর BrowserWindow পুনরায় লোড করে।

## জিরো-কনফিগ সিক্রেট বুটস্ট্র্যাপ

প্রথম লঞ্চে, প্রধান প্রক্রিয়াটি স্বয়ংক্রিয়ভাবে তৈরি হয় এবং অনুপস্থিত গোপনীয়তা বজায় রাখে:

| গোপন                     | উৎস                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                    |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (এনক্রিপ্ট করা ক্রেডগুলি ইতিমধ্যেই বিদ্যমান থাকলে তা অস্বীকার করে) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                    |

`<DATA_DIR>/server.env` থেকে অব্যাহত. `DATA_DIR` সমাধান করে:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` বা `~/.omniroute`
- macOS: `~/.omniroute`

## এনভায়রনমেন্ট ফাইল লুকআপ

সার্ভার তৈরি করার আগে, প্রধান প্রক্রিয়া (`getPreferredEnvFilePath()` in `electron/main.js`) বেছে নেয়** এক** `.env` ফাইল: এর মধ্যে প্রথমটি বিদ্যমান।

1. `$DATA_DIR/.env`, যখন `DATA_DIR` পরিবেশে সেট করা হয় তখন অ্যাপটি চালু করা হয়েছিল।
2. `<resolved DATA_DIR>/.env`, উপরের মত একই ডিফল্ট ব্যবহার করে: `%APPDATA%\omniroute\.env` এ Windows, `$XDG_CONFIG_HOME/omniroute/.env` এবং Linux এ `~/.omniroute/.env` macOS
3. প্রসেস ওয়ার্কিং ডিরেক্টরিতে`.env` ।

মূল প্রক্রিয়াটি শুধুমাত্র সেই ফাইলটি পড়ে; পরে প্রার্থীদের একত্রিত করা হয় না। সার্ভার পরিবেশ তারপর এই অগ্রাধিকার দিয়ে তৈরি করা হয় (সর্বোচ্চ প্রথম):

1. Electron প্রসেস এনভায়রনমেন্ট (অ্যাপ লঞ্চ করা যাই হোক না কেন তা থেকে ভেরিয়েবল উত্তরাধিকারসূত্রে প্রাপ্ত)।
2. নির্বাচিত `.env` ফাইল।
3. `<DATA_DIR>/server.env` (উপরের বুটস্ট্র্যাপ গোপনীয়তা)।

যখন অ্যাপটি শুরু হয় তখন প্রক্রিয়ার পরিবেশ ক্যাপচার করা হয়, তাই অ্যাপটি চলাকালীন একটি সিস্টেম বা ব্যবহারকারীর পরিবেশ পরিবর্তনশীল সেট করা হয় (যার উইন্ডো বন্ধ হওয়ার পরে এটি ট্রেতে বসে থাকা সহ) অ্যাপটি সম্পূর্ণরূপে প্রস্থান না হওয়া পর্যন্ত এবং পুনরায় চালু না হওয়া পর্যন্ত সার্ভারে পৌঁছায় না। রানটাইম নবগুলির জন্য যেমন `CONTEXT_LENGTH_<PROVIDER>` ( [এনভায়রনমেন্ট ভেরিয়েবলগুলি দেখুন: প্রতি-প্রদানকারীর প্রসঙ্গ দৈর্ঘ্য](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), `.env` ফাইলটিকে পছন্দ করুন, তারপর সম্পূর্ণরূপে প্রস্থান করুন (ট্রে,** প্রস্থান করুন** ) এবং পুনরায় লঞ্চ করুন।

## উইন্ডো এবং ট্রে

- `BrowserWindow`: 1400 × 900 (মিনিট 1024 × 700), `backgroundColor: "#0a0a0a"`
- macOS: `titleBarStyle: "hiddenInset"`, `{ x: 16, y: 16 }` এ ট্রাফিক-লাইট।
- Windows/Linux: নেটিভ টাইটেল বার।
- ক্লোজ বোতাম ট্রেতে ছোট করে; ট্রে মেনু আছে** OmniRoute খুলুন** ,** ড্যাশবোর্ড খুলুন** (বাহ্যিক ব্রাউজার),** সার্ভার পোর্ট** সাবমেনু,** আপডেটের জন্য চেক করুন** ,** প্রস্থান করুন** .

## বিষয়বস্তু নিরাপত্তা নীতি

`session.defaultSession.webRequest.onHeadersReceived` এর মাধ্যমে সেট করুন। উল্লেখযোগ্য নির্দেশনা:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- দেব মোড শুধুমাত্র `script-src` এ `'unsafe-eval'` যোগ করে

## স্বয়ংক্রিয় আপডেট

GitHub প্রদানকারীর সাথে `electron-updater` ব্যবহার করে (`diegosouzapw/OmniRoute`)।

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC এর মাধ্যমে রেন্ডারারের কাছে ইভেন্ট ফরওয়ার্ড করা হয়েছে : `checking`, `available`, `not-available`, `downloading` ( `percent` সহ ), `downloaded`, `error`
- `installUpdate()` সার্ভারকে হত্যা করে তারপর `autoUpdater.quitAndInstall()` কল করে
- ডেভ মোডে এড়িয়ে যাওয়া হয়েছে (`!app.isPackaged`)

## পাইপলাইন তৈরি করুন

1. `.next/standalone` এ `npm run build` → Next.js স্বতন্ত্র।
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` তে পুনঃপর্যায়ভুক্ত হয় এবং `server.js` + `required-server-files.json` ভিতরে পরম পাথ পুনর্লিখন করে যাতে বান্ডিলটি স্থানান্তরযোগ্য হয়।
3. `electron-builder` প্যাকেজ `main.js`, `preload.js`, `node_modules`, এবং `extraResources: { ../.next/electron-standalone → app }`।

### লক্ষ্য তৈরি করুন

| OS      | টার্গেট                                      |
| ------- | -------------------------------------------- |
| Windows | NSIS ইনস্টলার + পোর্টেবল (x64)               |
| macOS   | DMG (Intel + arm64, ড্র্যাগ-টু-অ্যাপ্লিকেশন) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS সেটিংস: `oneClick: false`, ব্যবহারকারীকে ইনস্টল ডিরেক্টরি নির্বাচন করতে দেয়, ডেস্কটপ এবং স্টার্ট-মেনু শর্টকাট তৈরি করে।

## স্মোক টেস্টিং প্যাকেজড বিল্ড

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- বর্তমান প্ল্যাটফর্মের জন্য `electron/dist-electron/` তে প্যাকেজ করা বাইনারি স্বয়ংক্রিয়ভাবে আবিষ্কার করে।
- বিচ্ছিন্ন `HOME`/`APPDATA`/`XDG_*` ডিরেক্টরিগুলির সাথে লঞ্চ করে যাতে এটি বিকাশকারী ডেটা স্পর্শ না করে৷
- 45 সেকেন্ডের মধ্যে HTTP 200 এর জন্য পোল `http://127.0.0.1:20128/login` ।
- মারাত্মক প্যাটার্নের জন্য stderr/stdout ঘড়ি (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, ইত্যাদি)।
- প্রস্তুতির পরে 2 সেকেন্ড স্থিতিশীল রানটাইম অপেক্ষা করে, তারপর SIGTERM জারি করে এবং বন্দরটি মুক্ত হওয়ার জন্য অপেক্ষা করে।
- CI তে, স্বয়ংক্রিয়ভাবে `--no-sandbox --disable-gpu` পাস করে (এবং `--disable-dev-shm-usage` এ Linux)।

Env ওভাররাইড করে: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`।

## কোড সাইনিং

`electron/package.json` করে** না** ওয়্যার সাইনিং শংসাপত্র সরাসরি. env vars এর মাধ্যমে `electron-builder` এ তাদের পাস করুন:

### macOS

```bash
export APPLE_ID=<email>
export APPLE_APP_SPECIFIC_PASSWORD=<password>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:win
```

### Linux

AppImage স্বাক্ষর হল ঐচ্ছিক — সেট `LINUX_GPG_KEY` যদি স্বাক্ষর করা হয়।

## বিতরণ

কৃত্রিম জিনিসগুলি `electron/dist-electron/` তে ল্যান্ড করে:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

রিলিজগুলি GitHub রিলিজে প্রকাশিত হয় (`diegosouzapw/OmniRoute`), যেখানে `electron-updater` নতুন সংস্করণের জন্য পরীক্ষা করে।

## সমস্যা সমাধান

| উপসর্গ                                                           | ঠিক করুন                                                                                                                                                   |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` পরে Electron প্রধান ধাক্কা | better-sqlite3 v13 ships Node-API রুট এবং `prepare:bundle` এ — রি-রান `npm install` পূর্বনির্মাণ করে (এটি বর্তমান প্ল্যাটফর্মের জন্য প্রি-বিল্ড যাচাই করে) |
| নেটিভ মডিউলের জন্য `ERR_DLOPEN_FAILED`                           | `prepare:bundle` — পুনরায় চালান এটি দ্রুত ব্যর্থ হয় যখন বর্তমান প্ল্যাটফর্মের জন্য নোড-এপিআই প্রিবিল্ড অনুপস্থিত থাকে                                    |
| Linux এ উইন্ডো ফাঁকা দেখা যাচ্ছে                                 | নিশ্চিত করুন Next.js সার্ভার আসলে PORT এর সাথে আবদ্ধ ( `[Server]` লগ চেক করুন)                                                                             |
| macOS নোটারাইজেশন স্টল                                           | শুধুমাত্র `.env` তে নয়, `APPLE_*` vars রপ্তানি করা হয়েছে তা নিশ্চিত করুন                                                                                 |
| Windows SmartScreen সতর্কতা                                      | EV শংসাপত্র দিয়ে সাইন ইন করুন, অথবা ব্যবহারকারীরা → ডান-ক্লিক করুন "যেভাবেই হোক চালান"                                                                    |
| পোর্ট-ইন-ব্যবহারের সাথে ধোঁয়া পরীক্ষা ব্যর্থ হয়                | `electron:smoke:packaged` চালানোর আগে 20128-এ যেকোনো স্থানীয় ডেভ সার্ভার বন্ধ করুন                                                                        |

## এছাড়াও দেখুন

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- উত্স: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- সাহায্যকারী: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
