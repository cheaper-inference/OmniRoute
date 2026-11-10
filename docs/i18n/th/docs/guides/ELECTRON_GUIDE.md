# Electron Desktop Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **ที่มาของความจริง:** พื้นที่ทำงาน `electron/`** อัปเดตล่าสุด:** 28-06-2569 — v3.8.40

OmniRoute จัดส่งแอปเดสก์ท็อปข้ามแพลตฟอร์ม (Windows / macOS / Linux) ที่สร้างขึ้น**Electron 41** +** ผู้สร้างอิเล็กตรอน 26.10** . แอปเดสก์ท็อปสร้างเซิร์ฟเวอร์ Next.js แบบสแตนด์อโลนเป็นกระบวนการย่อย ชี้ `BrowserWindow` ไปที่เซิร์ฟเวอร์ และเพิ่มถาดระบบ ตัวอัปเดตอัตโนมัติ บริดจ์ IPC และบูตสแตรปลับแบบกำหนดค่าเป็นศูนย์

## สถาปัตยกรรม

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

## รุ่นต่างๆ

ยืนยันจาก `electron/package.json`:

| บรรจุุภัณฑ์        | เวอร์ชัน                                                              |
| ------------------ | --------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                             |
| `electron-builder` | `^26.15.3`                                                            |
| `electron-updater` | `^6.8.9`                                                              |
| `better-sqlite3`   | root `^13.0.2` (Node-API สร้างไว้ล่วงหน้า — ไม่มี Electron สร้างใหม่) |
| เวอร์ชันแอป        | `3.8.0`                                                               |
| รหัสแอป            | `online.omniroute.desktop`                                            |
| ชื่อสินค้า         | `OmniRoute`                                                           |

## สคริปต์ (รูท `package.json`)

| สคริปต์                           | วัตถุประสงค์                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `npm run electron:dev`            | เริ่ม `npm run dev` + รอ `localhost:20128` + เปิดตัว Electron                  |
| `npm run electron:build`          | สร้าง Next.js จากนั้นรัน `electron-builder` สำหรับ OS ปัจจุบัน                 |
| `npm run electron:build:win`      | สร้างตัวติดตั้ง Windows NSIS + แบบพกพา (x64)                                   |
| `npm run electron:build:mac`      | สร้าง macOS DMG (Intel + Apple Silicon)                                        |
| `npm run electron:build:linux`    | สร้าง Linux AppImage + DEB (x64 + arm64)                                       |
| `npm run electron:smoke:packaged` | เรียกใช้ไบนารีและโพรบที่ทำแพ็กเกจแล้ว `/login` สำหรับ HTTP 200 จากนั้นปิดตัวลง |

พื้นที่ทำงาน `electron/` ยังเปิดเผย:

- `npm run prepare:bundle` — รัน `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — การสร้าง macOS แบบโค้งเดียว
- `npm run pack` — บิลด์เฉพาะไดเร็กทอรีสำหรับการทดสอบในเครื่อง (ไม่มีตัวติดตั้ง)

## แพ็กรันไทม์เสริม

รุ่นเดสก์ท็อปสามารถเผยแพร่ไฟล์เก็บถาวรรันไทม์เสริมควบคู่ไปกับโปรแกรมติดตั้ง เพย์โหลดเซิร์ฟเวอร์ที่ติดตั้งประกอบด้วย `optional-packs.index.json` (ภายใต้ `resources/app` บน Windows และ Linux) สำหรับรายการ `browser-runtime` ให้อ่าน `packs[].tarball` และดาวน์โหลด** ชื่อไฟล์นั้นมาจากรีลีสเดียวกัน** . ชื่อไฟล์เก็บถาวรประกอบด้วย SHA-256 digest; บิลด์ที่แตกต่างกันอาจต้องใช้ไฟล์เก็บถาวรที่แตกต่างกัน คงชื่อไฟล์ที่ดาวน์โหลดไว้ไม่เปลี่ยนแปลง

คัดลอกดัชนีของแอปที่ติดตั้งและไฟล์เก็บถาวรที่เลือกลงในไดเร็กทอรีเดียว จากนั้นใช้ CLI จากรีลีสเดียวกัน:

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` แสดงสถานะการติดตั้งและการตรวจสอบ ไม่ใช่ชื่อไฟล์เก็บถาวร ดัชนีที่รวมจะเลือกไฟล์เก็บถาวร การติดตั้งจะตรวจสอบการตรวจสอบผลรวมของไฟล์เก็บถาวรก่อนทำการแตกไฟล์ และการตรวจสอบผลรวมของแพ็คเกจก่อนที่จะเปลี่ยนแพ็คที่ติดตั้ง มันอ่านไฟล์ในเครื่อง มันไม่ดาวน์โหลดไฟล์เก็บถาวรที่ขาดหายไป รีสตาร์ทแอปพลิเคชันหลังการติดตั้ง หากการเผยแพร่ไม่มีเนื้อหาที่ตรงกัน แพ็กเสริมจะไม่สามารถใช้ได้ผ่านเนื้อหาของการเผยแพร่นั้น

## เค้าโครงไดเร็กทอรี

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

มีทั้ง `main.js` และ `preload.js`** ไฟล์CommonJS `.js`** ไม่ใช่ TypeScript การพิมพ์ฝั่งตัวแสดงผลอยู่ใน `electron/types.d.ts`

## สะพาน IPC (`preload.js`)

การโหลดล่วงหน้าจะแสดง API ที่ไวท์ลิสต์บน `window.electronAPI` โดยใช้ `contextBridge` พร้อมด้วย `contextIsolation: true` และ `nodeIntegration: false`

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

วิธีการเปิดเผย:

| โทรเรนเดอร์                                                       | พิมพ์             |
| ----------------------------------------------------------------- | ----------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | วิงวอน            |
| `openExternal(url)`                                               | วิงวอน            |
| `getDataDir()`                                                    | วิงวอน            |
| `restartServer()`                                                 | วิงวอน            |
| `getAppVersion()`                                                 | วิงวอน            |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | วิงวอน            |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | ส่ง               |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | รับ (ผู้กำจัดคืน) |

ผู้ช่วยเหลือรับกลับก** ฟังก์ชั่นการกำจัด** แทนที่จะอาศัย `removeAllListeners` — สิ่งนี้จะป้องกันการสะสมของผู้ฟังเมื่อส่วนประกอบ React ติดตั้งใหม่

## วงจรการใช้งานเซิร์ฟเวอร์

`main.js` จะสร้างบันเดิลแบบสแตนด์อโลน Next.js โดยตรงกับรันไทม์ของโหนด Electron เพื่อหลีกเลี่ยงไม่ให้ ABI ของโมดูลเนทิฟไม่ตรงกับโหนดของระบบ:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

ไฮไลท์:

- `waitForServer()` สำรวจ URL สูงสุด 30 วินาทีก่อนที่จะแสดงหน้าต่าง (ไม่มีหน้าจอว่างเมื่อสตาร์ทเย็น)
- `stdio: "pipe"` จับ stdout/stderr; วลีพร้อม (`Ready` / `listening`) ปล่อย `server-status: running` มากกว่า IPC
- `before-quit` รอนานถึง 5 วินาทีสำหรับ SIGTERM ที่สง่างาม (จุดตรวจ WAL ) จากนั้นส่ง SIGKILL
- ตัวสลับพอร์ตในถาด (`20128`, `3000`, `8080`) จะหยุดและรีสตาร์ทเซิร์ฟเวอร์ จากนั้นโหลด BrowserWindow อีกครั้ง

## Bootstrap ลับที่กำหนดค่าเป็นศูนย์

ในการเปิดตัวครั้งแรก กระบวนการหลักจะสร้างโดยอัตโนมัติและยังคงเป็นความลับที่หายไป:

| ความลับ                  | แหล่งที่มา                                                                      |
| ------------------------ | ------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (ปฏิเสธหากมีเครดิตที่เข้ารหัสอยู่แล้ว) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                        |

ยังคงอยู่ที่ `<DATA_DIR>/server.env` `DATA_DIR` แก้ไขเป็น:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` หรือ `~/.omniroute`
- macOS: `~/.omniroute`

## ค้นหาไฟล์สภาพแวดล้อม

ก่อนที่จะวางไข่เซิร์ฟเวอร์ กระบวนการหลัก (`getPreferredEnvFilePath()` ใน `electron/main.js`) จะเลือก** หนึ่ง** `.env` : ไฟล์แรกที่มีอยู่

1. `$DATA_DIR/.env` เมื่อตั้งค่า `DATA_DIR` ในสภาพแวดล้อมที่แอปเปิดตัวด้วย
2. `<resolved DATA_DIR>/.env` โดยใช้ค่าเริ่มต้นเดียวกันกับด้านบน: `%APPDATA%\omniroute\.env` บน Windows, `$XDG_CONFIG_HOME/omniroute/.env` หรือ `~/.omniroute/.env` บน Linux และ macOS
3. `.env` ในไดเร็กทอรีการทำงานของกระบวนการ

กระบวนการหลักจะอ่านเฉพาะไฟล์นั้นเท่านั้น ผู้สมัครในภายหลังจะไม่ถูกรวมเข้าด้วยกัน สภาพแวดล้อมเซิร์ฟเวอร์จะถูกสร้างขึ้นโดยมีความสำคัญนี้ (สูงสุดก่อน):

1. สภาพแวดล้อมกระบวนการ Electron (ตัวแปรที่สืบทอดมาจากอะไรก็ตามที่เปิดตัวแอป)
2. ไฟล์ `.env` ที่เลือก
3. `<DATA_DIR>/server.env` (ความลับของบูตสแตรปด้านบน)

สภาพแวดล้อมของกระบวนการจะถูกบันทึกเมื่อแอปเริ่มทำงาน ดังนั้นตัวแปรสภาพแวดล้อมของระบบหรือผู้ใช้ที่ตั้งค่าในขณะที่แอปกำลังทำงาน (รวมถึงในขณะที่แอปอยู่ในถาดหลังจากปิดหน้าต่าง) จะไม่เข้าถึงเซิร์ฟเวอร์จนกว่าแอปจะออกโดยสมบูรณ์และเปิดใช้งานใหม่อีกครั้ง สำหรับปุ่มรันไทม์ เช่น `CONTEXT_LENGTH_<PROVIDER>` (ดู [ตัวแปรสภาพแวดล้อม: ความยาวบริบทต่อผู้ให้บริการ](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ) เลือกใช้ไฟล์ `.env` จากนั้นออกทั้งหมด (ถาด** ล้มเลิก** ) และเปิดใหม่อีกครั้ง

## หน้าต่างและถาด

- `BrowserWindow`: 1400 × 900 (ต่ำสุด 1,024 × 700), `backgroundColor: "#0a0a0a"`
- macOS: `titleBarStyle: "hiddenInset"`, สัญญาณไฟจราจรที่ `{ x: 16, y: 16 }`
- Windows/Linux: แถบหัวเรื่องดั้งเดิม
- ปุ่มปิดย่อเล็กสุดไปที่ถาด เมนูถาดก็มี** เปิด OmniRoute** ,** เปิดแดชบอร์ด** (เบราว์เซอร์ภายนอก)** พอร์ตเซิร์ฟเวอร์** เมนูย่อย** ตรวจสอบการอัปเดต** ,** ล้มเลิก** .

## นโยบายการรักษาความปลอดภัยของเนื้อหา

ตั้งค่าผ่าน `session.defaultSession.webRequest.onHeadersReceived` คำสั่งเด่น:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- โหมด Dev จะเพิ่ม `'unsafe-eval'` ให้กับ `script-src` เท่านั้น

## อัปเดตอัตโนมัติ

ใช้ `electron-updater` กับผู้ให้บริการ GitHub (`diegosouzapw/OmniRoute`)

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- เหตุการณ์ที่ส่งต่อไปยัง renderer ผ่าน `update-status` IPC: `checking`, `available`, `not-available`, `downloading` (กับ `percent`), `downloaded`, `error`
- `installUpdate()` ฆ่าเซิร์ฟเวอร์แล้วเรียก `autoUpdater.quitAndInstall()`
- ข้ามไปในโหมด dev (`!app.isPackaged`)

## สร้างท่อ

1. `npm run build` → Next.js แบบสแตนด์อโลนใน `.next/standalone`
2. `prepare-electron-standalone.mjs` → สเตจใหม่เป็น `.next/electron-standalone` และเขียนพาธสัมบูรณ์ภายใน `server.js` + `required-server-files.json` ดังนั้นบันเดิลจึงสามารถย้ายตำแหน่งได้
3. แพ็คเกจ `electron-builder` `main.js`, `preload.js`, `node_modules` และ `extraResources: { ../.next/electron-standalone → app }`

### สร้างเป้าหมาย

| OS      | เป้าหมาย                                 |
| ------- | ---------------------------------------- |
| Windows | ตัวติดตั้ง NSIS + แบบพกพา (x64)          |
| macOS   | DMG (Intel + arm64, ลากไปยังแอปพลิเคชัน) |
| Linux   | AppImage + DEB (x64 + arm64)             |

การตั้งค่า NSIS : `oneClick: false` อนุญาตให้ผู้ใช้เลือกไดเร็กทอรีการติดตั้ง สร้างทางลัดบนเดสก์ท็อปและเมนูเริ่ม

## การทดสอบควันที่บรรจุในแพ็คเกจ

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- ค้นหาไบนารีที่แพ็กเกจไว้โดยอัตโนมัติใน `electron/dist-electron/` สำหรับแพลตฟอร์มปัจจุบัน
- เปิดตัวด้วยไดเร็กทอรี `HOME`/`APPDATA`/`XDG_*` ที่แยกออกมา จึงไม่กระทบกับข้อมูลของนักพัฒนา
- โพล `http://127.0.0.1:20128/login` สำหรับ HTTP 200 ภายใน 45 วินาที
- เฝ้าดู stderr/stdout สำหรับรูปแบบที่ร้ายแรง (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` ฯลฯ )
- รอรันไทม์ที่เสถียร 2 วินาทีหลังจากพร้อม จากนั้นออก SIGTERM และรอให้พอร์ตว่าง
- ใน CI จะส่งผ่าน `--no-sandbox --disable-gpu` โดยอัตโนมัติ (และ `--disable-dev-shm-usage` บน Linux)

การแทนที่ Env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`

## การลงนามรหัส

`electron/package.json` ทำ** ไม่** ข้อมูลรับรองการลงนามแบบลวดโดยตรง ส่งผ่านพวกเขาผ่าน env vars ไปที่ `electron-builder`:

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

การลงนาม AppImage เป็นทางเลือก — ตั้งค่า `LINUX_GPG_KEY` หากลงนาม

## การกระจาย

สิ่งประดิษฐ์ลงจอดใน `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

มีการเผยแพร่การเผยแพร่ไปยัง GitHub Releases (`diegosouzapw/OmniRoute`) ซึ่งเป็นที่ที่ `electron-updater` ตรวจสอบเวอร์ชันใหม่ด้วย

## การแก้ไขปัญหา

| อาการ                                                                 | แก้ไข                                                                                                                                                            |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` หลังจาก Electron การชนครั้งใหญ่ | better-sqlite3 v13 จัดส่ง Node-API ที่สร้างไว้ล่วงหน้า — รัน `npm install` อีกครั้งที่รูทและ `prepare:bundle` (จะตรวจสอบการสร้างล่วงหน้าสำหรับแพลตฟอร์มปัจจุบัน) |
| `ERR_DLOPEN_FAILED` สำหรับโมดูลดั้งเดิม                               | รัน `prepare:bundle` — อีกครั้งซึ่งจะล้มเหลวอย่างรวดเร็วเมื่อ Node-API prebuild สำหรับแพลตฟอร์มปัจจุบันหายไป                                                     |
| หน้าต่างปรากฏว่างเปล่าบน Linux                                        | ยืนยันว่าเซิร์ฟเวอร์ Next.js เชื่อมโยงกับ PORT จริง ๆ (ตรวจสอบบันทึก `[Server]` )                                                                                |
| แผงลอยรับรองเอกสาร macOS                                              | ตรวจสอบให้แน่ใจว่าได้ส่งออก `APPLE_*` vars ไม่ใช่แค่ใน `.env`                                                                                                    |
| คำเตือน Windows SmartScreen                                           | ลงชื่อด้วยใบรับรอง EV หรือผู้ใช้คลิกขวาที่ → "Run ต่อไป"                                                                                                         |
| การทดสอบควันล้มเหลวเมื่อมีการใช้งานพอร์ต                              | หยุดเซิร์ฟเวอร์ dev ภายในเครื่องในปี 20128 ก่อนที่จะรัน `electron:smoke:packaged`                                                                                |

## ดูเพิ่มเติม

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ที่มา: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- ผู้ช่วย: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
