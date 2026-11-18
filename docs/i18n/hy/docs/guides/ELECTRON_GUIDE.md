# Electron Desktop Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Ճշմարտության աղբյուրը.** `electron/` աշխատանքային տարածք** Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute առաքում է բազմպլատֆորմային աշխատասեղանի հավելված (Windows / macOS / Linux), որը կառուցված է**Electron 41** +** էլեկտրոնաշինարար 26.10** . Սեղանի հավելվածը ստեղծում է Next.js ինքնուրույն սերվերը որպես երեխա պրոցես, մատնանշում է `BrowserWindow` դրա վրա և ավելացնում է համակարգի սկուտեղ, ավտոմատ թարմացնող սարք, IPC կամուրջ և զրոյական կոնֆիգուրացիայի գաղտնի bootstrap:

## Ճարտարապետություն

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

## Տարբերակներ

Հաստատված է `electron/package.json` ից.

| Փաթեթ               | Տարբերակ                                                                    |
| ------------------- | --------------------------------------------------------------------------- |
| `electron`          | `^43.4.1`                                                                   |
| `electron-builder`  | `^26.15.3`                                                                  |
| `electron-updater`  | `^6.8.9`                                                                    |
| `better-sqlite3`    | root `^13.0.2` (Node-API-ն նախապես կառուցում է — ոչ Electron վերակառուցում) |
| Հավելվածի տարբերակը | `3.8.0`                                                                     |
| Հավելվածի ID        | `online.omniroute.desktop`                                                  |
| Ապրանքի անվանումը   | `OmniRoute`                                                                 |

## Սցենարներ (արմատային `package.json`)

| Սցենար                            | Նպատակը                                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Սկսում է `npm run dev` + սպասում է `localhost:20128` + գործարկում է Electron                  |
| `npm run electron:build`          | Կառուցում է Next.js, այնուհետև գործարկում է `electron-builder` ընթացիկ OS համար               |
| `npm run electron:build:win`      | Կառուցում է Windows NSIS տեղադրող + շարժական (x64)                                            |
| `npm run electron:build:mac`      | Կառուցում է macOS DMG (Intel + Apple Silicon)                                                 |
| `npm run electron:build:linux`    | Կառուցում է Linux AppImage + DEB (x64 + arm64)                                                |
| `npm run electron:smoke:packaged` | Գործարկում է փաթեթավորված երկուական և զննում `/login` HTTP 200-ի համար, այնուհետև անջատվում է |

`electron/` աշխատանքային տարածքը նաև բացահայտում է.

- `npm run prepare:bundle` — աշխատում `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — միաձույլ macOS կառուցում
- `npm run pack` — գրացուցակ միայն տեղական փորձարկման համար (առանց տեղադրողի)

## Ընտրովի աշխատաժամանակի փաթեթներ

Desktop build-ները կարող են հրապարակել կամընտիր գործարկման ժամանակի արխիվները իրենց տեղադրողների հետ մեկտեղ: Տեղադրված սերվերի ծանրաբեռնվածությունը պարունակում է `optional-packs.index.json` ( `resources/app` ի տակ Windows ում և Linux): `browser-runtime` մուտքի համար կարդացեք `packs[].tarball` և ներբեռնեք** հենց այդ ֆայլի անունը նույն թողարկումից** . Արխիվային անունները ներառում են SHA-256 digest; տարբեր կառուցումներ կարող են պահանջել տարբեր արխիվներ: Ներբեռնված ֆայլի անունը պահեք անփոփոխ:

Պատճենեք տեղադրված հավելվածի ինդեքսը և ընտրված արխիվը մեկ գրացուցակի մեջ, այնուհետև օգտագործեք CLI նույն թողարկումից.

```bash
omniroute packs list --source /path/to/packs
omniroute packs install browser-runtime --source /path/to/packs
```

`packs list` ցուցադրում է տեղադրման և հաստատման վիճակը, այլ ոչ թե արխիվի ֆայլի անունը: Միավորված ինդեքսն ընտրում է արխիվը: Տեղադրումը ստուգում է իր արխիվային ստուգման գումարը մինչ հանումը, իսկ փաթեթի ստուգման գումարները՝ նախքան տեղադրված փաթեթը փոխարինելը: Այն կարդում է տեղական ֆայլերը; այն չի ներբեռնում բացակայող արխիվները: Տեղադրվելուց հետո վերագործարկեք հավելվածը: Եթե թողարկումը չունի համապատասխան օբյեկտ, կամընտիր փաթեթը հասանելի չէ այդ թողարկման ակտիվների միջոցով:

## Գրացուցակի դասավորություն

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

`main.js` էլ, `preload.js` են**CommonJS `.js` ֆայլեր** , ոչ TypeScript. Renderer-ի կողմի մուտքագրումները ապրում են `electron/types.d.ts` ում:

## IPC կամուրջ (`preload.js`)

Նախաբեռնումը բացահայտում է API սպիտակ ցուցակը `window.electronAPI` ում, օգտագործելով `contextBridge` `contextIsolation: true` և `nodeIntegration: false` հետ:

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

Բացահայտված մեթոդներ.

| Արտադրողի զանգ                                                    | Տեսակ                            |
| ----------------------------------------------------------------- | -------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | կանչել                           |
| `openExternal(url)`                                               | կանչել                           |
| `getDataDir()`                                                    | կանչել                           |
| `restartServer()`                                                 | կանչել                           |
| `getAppVersion()`                                                 | կանչել                           |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | կանչել                           |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | ուղարկել                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | ստանալ (վերադարձնում է տնօրինող) |

Ընդունող օգնականները վերադառնում են ա** տնօրինող գործառույթ** `removeAllListeners` — վրա հենվելու փոխարեն սա կանխում է լսողի կուտակումը, երբ React բաղադրիչները վերամիավորվում են:

## Սերվերի կյանքի ցիկլը

`main.js` ստեղծում է Next.js առանձին փաթեթն ուղղակիորեն Electron Node-ի գործարկման ժամանակի հետ՝ խուսափելու տեղական մոդուլի ABI անհամապատասխանությունից համակարգի հանգույցի հետ:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Առանձնահատկություններ.

- `waitForServer()` ստուգում է URL մինչև 30 վրկ՝ նախքան պատուհանը ցուցադրելը (սառը մեկնարկի դեպքում դատարկ էկրան չկա):
- `stdio: "pipe"` գրավում stdout/stderr; պատրաստ արտահայտությունները (`Ready` / `listening`) emit `server-status: running` over IPC.
- `before-quit` սպասում է մինչև 5 վայրկյան նրբագեղ SIGTERM ին (WAL անցակետ), այնուհետև ուղարկում է SIGKILL:
- Պորտի փոխարկիչը սկուտեղի մեջ (`20128`, `3000`, `8080`) դադարեցնում և վերագործարկում է սերվերը, այնուհետև վերաբեռնում է BrowserWindow ը:

## Zero-config Secret Bootstrap

Առաջին գործարկման ժամանակ հիմնական գործընթացը ինքնաբերաբար ստեղծվում և պահպանում է բացակայող գաղտնիքները.

| Գաղտնիք                  | Աղբյուր                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                       |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (հրաժարվում է, եթե գաղտնագրված հավատարմագրերն արդեն գոյություն ունեն) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                       |

Համառել է `<DATA_DIR>/server.env`. `DATA_DIR` որոշում է.

- Windows: `%APPDATA%\omniroute`
- Linux՝ `$XDG_CONFIG_HOME/omniroute` կամ `~/.omniroute`
- macOS: `~/.omniroute`

## Շրջակա միջավայրի ֆայլերի որոնում

Նախքան սերվերի ձվադրումը, ընտրվում է հիմնական գործընթացը (`getPreferredEnvFilePath()` in `electron/main.js`):** մեկ** `.env` ֆայլ. դրանցից առաջինը, որը գոյություն ունի:

1. `$DATA_DIR/.env`, երբ `DATA_DIR` դրված է այն միջավայրում, որով գործարկվել է հավելվածը:
2. `<resolved DATA_DIR>/.env`, օգտագործելով վերը նշված նույն լռելյայնները. `%APPDATA%\omniroute\.env` Windows ի վրա, `$XDG_CONFIG_HOME/omniroute/.env` կամ `~/.omniroute/.env` Linux և macOS վրա:
3. `.env` գործընթացի աշխատանքային գրացուցակում:

Հիմնական գործընթացը կարդում է միայն այդ ֆայլը; Հետագայում թեկնածուները չեն միավորվում: Սերվերի միջավայրն այնուհետև կառուցվում է այս գերակայությամբ (առաջինը ամենաբարձրը).

1. Electron գործընթացի միջավայրը (փոփոխականներ, որոնք ժառանգվել են այն ամենից, ինչ գործարկվել է հավելվածը):
2. Ընտրված `.env` ֆայլը:
3. `<DATA_DIR>/server.env` (վերևում գտնվող bootstrap գաղտնիքները):

Գործընթացի միջավայրը ֆիքսվում է, երբ ծրագիրը մեկնարկում է, ուստի համակարգի կամ օգտատիրոջ միջավայրի փոփոխականը սահմանված է, երբ հավելվածն աշխատում է (ներառյալ այն, երբ այն նստում է սկուտեղի մեջ՝ պատուհանը փակելուց հետո) չի հասնում սերվերին, քանի դեռ հավելվածն ամբողջությամբ դուրս չի եկել և վերագործարկվել: Գործարկման ժամանակի կոճակների համար, ինչպիսին է `CONTEXT_LENGTH_<PROVIDER>` (տես [Environment Variables. Per-provider-ի համատեքստի երկարությունը](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) ), նախընտրեք `.env` ֆայլը, այնուհետև ամբողջությամբ դուրս գալ (սկուտեղ,** Դուրս գալ** ) և վերագործարկել:

## Պատուհան և սկուտեղ

- `BrowserWindow`՝ 1400 × 900 (min 1024 × 700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, լուսացույց `{ x: 16, y: 16 }`:
- Windows/Linux: հայրենի վերնագրի տող:
- Փակման կոճակը նվազագույնի է հասցնում սկուտեղին; սկուտեղի մենյուն ունի** Բացեք OmniRoute** ,** Բացեք վահանակը** (արտաքին զննարկիչ),** Սերվերի պորտ** ենթամենյու,** Ստուգեք թարմացումների համար** ,** Դուրս գալ** .

## Բովանդակության անվտանգության քաղաքականություն

Սահմանել `session.defaultSession.webRequest.onHeadersReceived` միջոցով: Հատկանշական հրահանգներ.

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev ռեժիմն ավելացնում է `'unsafe-eval'` միայն `script-src` ին

## Ավտոմատ թարմացում

Օգտագործում է `electron-updater` GitHub մատակարարի հետ (`diegosouzapw/OmniRoute`):

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Իրադարձությունները վերահասցեավորվել են մատուցողին `update-status` IPC միջոցով՝ `checking`, `available`, `not-available`, `downloading` ( `percent` ով), `downloaded`, `error`
- `installUpdate()` սպանում է սերվերին, այնուհետև զանգում է `autoUpdater.quitAndInstall()`
- Բաց թողնված է մշակման ռեժիմում (`!app.isPackaged`)

## Կառուցել խողովակաշար

1. `npm run build` → Next.js ինքնուրույն է `.next/standalone`.
2. `prepare-electron-standalone.mjs` → վերափոխվում է `.next/electron-standalone` ի և վերագրում է բացարձակ ուղիները `server.js` + `required-server-files.json` ներսում, որպեսզի փաթեթը տեղափոխվի:
3. `electron-builder` փաթեթներ `main.js`, `preload.js`, `node_modules` և `extraResources: { ../.next/electron-standalone → app }`:

### Կառուցեք թիրախներ

| OS      | Թիրախներ                                    |
| ------- | ------------------------------------------- |
| Windows | NSIS տեղադրող + շարժական (x64)              |
| macOS   | DMG (Intel + arm64, քաշել դեպի հավելվածներ) |
| Linux   | AppImage + DEB (x64 + arm64)                |

NSIS կարգավորումներ. `oneClick: false`, թույլ է տալիս օգտվողին ընտրել տեղադրման գրացուցակը, ստեղծել Desktop և Start-Menu դյուրանցումներ:

## Smoke Testing Packaged Build

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Ավտոմատ կերպով հայտնաբերում է փաթեթավորված երկուականը `electron/dist-electron/` ում ընթացիկ պլատֆորմի համար:
- Գործարկում է մեկուսացված `HOME`/`APPDATA`/`XDG_*` դիրեկտորիաներով, որպեսզի այն չդիպչի մշակողի տվյալներին:
- Հարցումներ `http://127.0.0.1:20128/login` HTTP 200-ի համար 45 վ-ի ընթացքում:
- Ժամացույցներ stderr/stdout ճակատագրական նախշերի համար (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, և այլն):
- Պատրաստ լինելուց հետո սպասում է 2 վրկ կայուն աշխատանքի ժամանակ, այնուհետև թողարկում է SIGTERM և սպասում, որ նավահանգիստը ազատվի:
- CI ում ավտոմատ անցնում է `--no-sandbox --disable-gpu` (և `--disable-dev-shm-usage` Linux ի վրա):

Env-ը գերագնահատում է՝ `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`:

## Կոդի ստորագրում

`electron/package.json` անում** ոչ** մետաղալարով ստորագրման հավատարմագրերը ուղղակիորեն: Անցեք դրանք env vars-ի միջոցով `electron-builder`.

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

AppImage ստորագրումը կամընտիր է — սահմանված `LINUX_GPG_KEY` ստորագրման դեպքում:

## Բաշխում

Արտեֆակտները վայրէջք են կատարում `electron/dist-electron/` ում.

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Թողարկումները հրապարակվում են GitHub Releases (`diegosouzapw/OmniRoute`), որտեղ նաև `electron-updater` ստուգում է նոր տարբերակները:

## Անսարքությունների վերացում

| Ախտանիշ                                                           | Ուղղել                                                                                                                                                                              |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` հետո Electron հիմնական bump | better-sqlite3 v13-ը ուղարկում է Node-API-ն նախապես կառուցում է — նորից գործարկում `npm install` արմատից և `prepare:bundle` (այն հաստատում է ընթացիկ պլատֆորմի նախնական կառուցումը) |
| `ERR_DLOPEN_FAILED` մայրենի մոդուլի համար                         | Վերագործարկեք `prepare:bundle` — այն արագորեն ձախողվում է, երբ առկա պլատֆորմի համար Node-API նախնական կառուցումը բացակայում է:                                                      |
| Պատուհանը դատարկ է հայտնվում Linux ում                            | Հաստատեք Next.js սերվերը իրականում կապված է PORT ին (ստուգեք `[Server]` տեղեկամատյանները)                                                                                           |
| macOS նոտարական կրպակներ                                          | Համոզվեք, որ `APPLE_*` vars արտահանվում են, ոչ միայն `.env` ում                                                                                                                     |
| Windows SmartScreen նախազգուշացում                                | Մուտքագրեք EV cert-ով, կամ օգտատերերը աջ սեղմեք → «Համենայն դեպս գործարկել»                                                                                                         |
| Ծխի թեստը ձախողվում է օգտագործման պորտի հետ                       | Նախքան `electron:smoke:packaged` գործարկելը դադարեցրեք 20128-ի ցանկացած տեղական մշակող սերվեր                                                                                       |

## Տես նաև

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Աղբյուր՝ `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Օգնողներ՝ `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
