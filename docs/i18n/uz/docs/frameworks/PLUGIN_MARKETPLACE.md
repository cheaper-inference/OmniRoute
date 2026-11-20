# Plugin Marketplace (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Haqiqiy manba:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` va
> `src/app/(dashboard)/dashboard/plugins/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute WordPress uslubidagi plagin tizimi bilan birga taqdim etiladi. Plaginlar
mustaqil kataloglardir — har birida `plugin.json` manifesti va kirish fayli mavjud —
ular soʻrovlarni qayta ishlash jarayoniga (`onRequest` / `onResponse` / `onError`)
hamda hayotiy sikl hodisalariga (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`) ulanadi.

**Plaginlar marketpleysi** ushbu tizim ustidagi plaginlarni topish qatlamidir. U
oʻrnatish mumkin boʻlgan plaginlarning koʻrib chiqiladigan katalogini taqdim etadi.
Standart holatda katalog kichik ichki boshlangʻich reyestrdan iborat; operator uni
maxsus masofaviy reyestr URL manziliga yoʻnaltirishi mumkin, bu holda olish jarayoni
DNS aniqlashga asoslangan SSRF himoyasi orqali mustahkamlanadi
([Xavfsizlik](#security) boʻlimiga qarang).

Har bir plagin marshruti **faqat loopback orqali ishlaydi** (1-daraja —
`LOCAL_ONLY`): plaginlar kodni yordamchi jarayonlarda yuklaydi va bajaradi, shu
sababli autentifikatsiyadan qatʼi nazar, marshrutlarga loopback boʻlmagan
manbalardan kirib boʻlmaydi.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) fayliga
qarang.

## Bu Together qanday mos keladi

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Ro'yxatga olish kitobi qatlami** — `src/lib/plugins/marketplace.ts`: Katalogni ro'yxatlaydi / qidiradi, har qanday nosozlik bo'lsa urug'lar reestriga qaytadi.
- **Hayotiy tsikl qatlami** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): o'rnatish, yangilash, faollashtirish, o'chirish, o'chirish, skanerlash, ishga tushirish.
- **Manifest qatlami** — `src/lib/plugins/manifest.ts`: Zod sxemasi `plugin.json` uchun standart +.
- **Skaner** — `src/lib/plugins/scanner.ts`: plaginlar katalogi ostidagi diskdagi plaginlarni topadi.
- **Yuklagich** — `src/lib/plugins/loader.ts`: har bir plaginni alohida Node.js bola jarayonida hosil qiladi va IPC orqali qo'ng'iroqlarni bog'laydi. Bola qum qutisi emas (quyida "Plugin ijrosini izolyatsiya qilish" ga qarang).

## Marketpleys katalogi

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) `MarketplaceEntry`
obyektlari roʻyxatini qaytaradi:

| Maydon        | Tur      | Izohlar                                                  |
| ------------- | -------- | -------------------------------------------------------- |
| `name`        | string   | kebab-case formatidagi plagin nomi                       |
| `version`     | string   | semver                                                   |
| `description` | string   | Qisqacha tavsif                                          |
| `author`      | string   | Muallif / tashkilot                                      |
| `license`     | string   | SPDX uslubidagi litsenziya identifikatori                |
| `downloadUrl` | string   | Manbani yuklab olish URL manzili (boʻsh boʻlishi mumkin) |
| `repository`  | string?  | Ixtiyoriy repozitoriy URL manzili                        |
| `tags`        | string[] | Qidirish/filtrlash teglari                               |
| `downloads`   | number   | Yuklab olishlar soni                                     |
| `rating`      | number   | 0–5                                                      |
| `verified`    | boolean  | Yozuv tasdiqlangan deb belgilanganmi                     |
| `lastUpdated` | string   | ISO formatiga yaqin sana satri                           |

Maxsus reyestr URL manzili sozlanmagan boʻlsa, katalog ichki `SEED_REGISTRY`dan
iborat boʻladi (hozirda `request-logger`, `rate-limiter`, `cost-tracker` va
`theme-manager`). Boshlangʻich reyestr doimo mavjud — agar sozlangan masofaviy
reyestrga ulanib boʻlmasa, u `200` boʻlmagan holat kodini qaytarsa yoki tanib
boʻlmaydigan javob tanasini qaytarsa, `listMarketplacePlugins()` ogohlantirishni
jurnalga yozadi va boshlangʻich roʻyxatga qaytadi.

> Eslatma: marketpleys **katalogi** (koʻrib chiqish/qidirish) boshidan oxirigacha
> ulangan, ammo katalogdan bir marta bosish orqali marketpleysdan **oʻrnatish**
> hali amalga oshirilmagan — marketpleys yozuvidagi boshqaruv panelining
> "Oʻrnatish" tugmasi hozirda "tez orada" xabarini koʻrsatadi. Hozirda oʻrnatish
> lokal yoʻl orqali oʻrnatish jarayoni (`POST /api/plugins`) va diskdagi
> plaginlarni aniqlash (`POST /api/plugins/scan`) orqali bajariladi.

## REST API

Barcha so'nggi nuqtalar boshqaruv autentsiyasini talab qiladi (`requireManagementAuth`)** va** — `/api/plugins` va `/api/plugins/` `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) da keltirilgan.

| Yakuniy nuqta                    | Usul   | Tavsif                                                                 |
| -------------------------------- | ------ | ---------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | O'rnatilgan plaginlar ro'yxati (ixtiyoriy `?status=` filtri)           |
| `/api/plugins`                   | POST   | Plagin manbalari katalogidan plaginni o'rnating                        |
| `/api/plugins/scan`              | POST   | Plagin katalogini skanerlang va yangi plaginlarni ro'yxatdan o'tkazing |
| `/api/plugins/marketplace`       | GET    | Bozor katalogidagi yozuvlarni ro'yxatlash                              |
| `/api/plugins/[name]`            | GET    | O'rnatilgan plagin tafsilotlarini oling                                |
| `/api/plugins/[name]`            | DELETE | Plaginni o'chirib tashlang                                             |
| `/api/plugins/[name]/activate`   | POST   | Faollashtirish ( + registrlari ilgaklarini yuklash)                    |
| `/api/plugins/[name]/deactivate` | POST   | O'chirish (o'chirish `onDeactivate`, ilgaklarni ro'yxatdan o'chirish)  |
| `/api/plugins/[name]/config`     | GET    | Plagin konfiguratsiyasi + konfiguratsiya sxemasini oling               |
| `/api/plugins/[name]/config`     | PUT    | Plagin konfiguratsiyasini yangilash (sxemaga muvofiq tasdiqlangan)     |

`GET /api/plugins` `status` filtri `installed` / `active` / `inactive` / `error` dan birini qabul qiladi. Yaroqsiz qiymat `400` qaytaradi.

### O'rnatilgan plaginlar ro'yxati

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Mahalliy yo'ldan o'rnating

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` an bo'lishi kerak** mutlaq** katalogga yo'l** plagin manbalari katalogida** : plagin ildizi yonida `plugin-sources`, shuning uchun sukut bo'yicha `~/.omniroute/plugin-sources/` yoki bu o'zgaruvchi o'rnatilganda `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` ( `src/lib/plugins/installSource.ts` da `getPluginSourcesDir()` ). Avval u erda plaginni nusxalash yoki klonlash. Agar yo'lda `..` yoki null bayt bo'lsa, ushbu katalogdan tashqarida bo'lsa, uning tashqarisida symlink orqali hal qilinsa, maqsadi undan tashqarida bo'lgan simli havola bo'lsa yoki katalog mavjud bo'lmasa, o'rnatish `400` bilan rad etiladi. Manba katalogida to'g'ri `plugin.json` bo'lishi kerak (yoki uning ota-onasi bo'lishi kerak). Muvaffaqiyatli javob o'rnatilgan plagin qatori bilan `201` bo'ladi.

Boshqa plagin marshrutlaridan farqli o'laroq, bu tizimga kirish o'chirilgan bo'lsa ham (`requireLogin=false`) boshqaruv hisob ma'lumotlarini (boshqaruv paneli seansi yoki boshqarish miqyosidagi API kaliti) talab qiladi: kodni o'rnatish hech qachon anonim harakat emas.

### Bozorni ko'rib chiqing

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Plagin konfiguratsiyasini yangilang

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` har bir taqdim etilgan qiymatni plagin `configSchema` (manifestda e'lon qilingan) bilan tasdiqlaydi: `number` maydonlari `min`/`max` hurmati, `select` maydonlari e'lon qilingan `enum` bilan mos kelishi kerak. Sxemada mavjud bo'lmagan kalitlarga ruxsat beriladi.

## Konfiguratsiya

### Plagin katalogi

Plaginlar OmniRoute maʼlumotlar katalogida joylashadi:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (yoki manifest.main ko‘rsatgan boshqa fayl)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) bu katalogni
uch bosqichda aniqlaydi:

1. **`OMNIROUTE_PLUGINS_DIR`**, agar oʻrnatilgan boʻlsa — `HOME` qiymatidan qatʼi nazar, aynan koʻrsatilganidek ishlatiladi. Bu
   Docker/K8s uchun aniq boshqaruv parametridir; ularda plaginlar daraxti odatda
   konteynerning uy katalogiga aloqasi boʻlmagan yoʻlga bind-mount qilinadi (#11827).
2. `<home>/.omniroute/plugins`, bunda `<home>` qiymati `HOME` / `USERPROFILE`
   muhit oʻzgaruvchilaridan olinadi.
3. `/tmp/.omniroute/plugins`, agar jarayon umuman uy katalogini eksport qilmasa.

Aniqlangan katalog ishga tushirish vaqtida bir marta `scanner.dir_resolved` sifatida jurnalga yoziladi va
qaysi kirish qiymati tanlangani (`OMNIROUTE_PLUGINS_DIR`, `home` yoki `no-home-fallback`) koʻrsatiladi — shu sababli
sezdirmasdan 3-bosqichga tushib qolgan tasvir faqat boʻsh plaginlar roʻyxatini xabar qilish oʻrniga
buni aniq bildiradi.
`POST /api/plugins/scan` shu yerdagi yaroqli `plugin.json` fayliga ega har qanday quyi katalogni topadi
va roʻyxatdan oʻtkazadi; ayni katalog `pluginManager.install()` plaginlarni nusxalaydigan ildiz katalog hamdir,
shuning uchun qiymatni qayta belgilash aniqlash va oʻrnatish joylarini birgalikda koʻchiradi.

> **`OMNIROUTE_PLUGINS_DIR` — bu `OMNIROUTE_PLUGIN_PATH` emas.** Ikkinchisi faqat
> CLI buyruq-plagin yuklagichi (`bin/cli/plugins.mjs`) tomonidan `omniroute` quyi buyruqlarini
> qoʻshadigan `omniroute-cmd-*` npm paketlarini topish uchun oʻqiladi — bu yerda tavsiflangan ish vaqti skaneriga
> hech qanday taʼsir qilmaydi. Bu qism haqida [PLUGINS.md](./PLUGINS.md) fayliga qarang.

### Maxsus marketplace reyestri URL manzili

Marketplace katalogining manbasi `pluginMarketplaceUrl` sozlamasidan oʻqiladi
(`src/lib/plugins/marketplace.ts` fayli `settings.pluginMarketplaceUrl`ni oʻqiydi). U
`http(s)` URL manziliga oʻrnatilganda, `listMarketplacePlugins()` shu URL manzilidan maʼlumot oladi va
yuqori darajadagi JSON yozuvlar massivini yoki `plugins` massiviga ega obyektni
qabul qiladi; satr turidagi `name` qiymatiga ega boʻlmagan yozuvlar filtrlab tashlanadi. Qiymat oʻrnatilmaganida (yoki maʼlumot olish
SSRF himoyasidan oʻtmasa / yaroqsiz javob qaytarsa), ichki boshlangʻich reyestrdan
foydalaniladi.

Boshqaruv panelidagi "Marketplace" ichki varagʻi ushbu URL manzili uchun maydonni taqdim etadi (qiymat
`GET /api/settings` orqali qayta oʻqiladi).

> Amalga oshirishga oid eslatma: boshqaruv panelidagi "Saqlash" amali
> `pluginMarketplaceUrl`ni `PATCH /api/settings`ga yuboradi. Ushbu hujjat yozilgan vaqtda bu
> kalit `updateSettingsSchema` ichida eʼlon qilinmagan
> (`src/shared/validation/settingsSchemas.ts`), shu sababli unga tayanishdan oldin relizingizda
> qiymat saqlanishini tekshiring — kalit sozlamalar omborida mavjud boʻlgach, **oʻqish**
> yoʻli (`getSettings()` →
> `listMarketplacePlugins()`) uni hisobga oladi.

## Xavfsizlik

### Faqat marshrut darajasi — orqaga qaytish

Plaginlar tug'ilgan bola jarayonlarida kodni bajaradi, shuning uchun butun `/api/plugins` yuzasi `LOCAL_ONLY` (1-darajali) tasniflanadi. Orqaga aylanishni amalga oshirish shartsiz ishlaydi** oldin** Har qanday autentifikatsiya tekshiruvi, shuning uchun tunnel orqali qutiga etib boradigan sizib ketgan boshqaruv tokeni hali ham plaginni o'rnatolmaydi, faollashtira olmaydi yoki o'chira olmaydi. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) va qattiq qoidalarga qarang #15 / #17.

### Bozor ro'yxatga olish kitobi SSRF qo'riqchisi

Maxsus ro'yxatga olish kitobi URL tajovuzkor tomonidan ta'sirlanadigan konfiguratsiyadir, shuning uchun uni olishdan oldin `listMarketplacePlugins()` uni ikki qatlamdan o'tkazadi:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` bo'lmagan har qanday narsani rad etadi.
   - Literal private/loopback/link-local/ULA xostlarini rad etadi (IPv4** va** IPv6, shu jumladan IPv4-mapped) kanonik `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`) orqali.
   - Yechiladi** ikkalasi ham** `A` va `AAAA` agar ni qayd qiladi va rad etadi** har qanday** hal qilingan manzil xususiy — umumiy xost nomi → xususiy IP aylanib o'tishni yopadi.
   - **Muvaffaqiyatsiz yopildi** : DNS rezolyutsiyasi xatosi URL ni rad etadi.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): faqat ommaviy URL qo'riqchisini yuklash vaqtida qayta qo'llaydi va** qayta yo'naltirishni bloklaydi** (ommaviy → xususiy `30x` pivot yo'q).

Ikkala qatlamda ham muvaffaqiyatsiz bo'lgan URL so'rovni bekor qilmaydi — bozor indamay o'rnatilgan urug'lar reestriga qaytadi va ogohlantirishni qayd qiladi.

> Bu qo'riqchi A + AAAA hal qilish va IPv4-only tekshiruvi o'rniga kanonik `isPrivateHost` foydalanish uchun PR #3774 da qattiqlashtirilgan.

### Plaginni bajarish izolyatsiyasi

> **Plaginlar sinov muhitiga kiritilmagan.** Bola OmniRoute foydalanuvchisi sifatida ishlaydigan oddiy Node.js jarayoni bo'lib, VM konteksti va Node.js ruxsati bayroqlari yo'q, shuning uchun plagin kodi foydalanuvchi har qanday faylni o'qishi va yozishi, dasturlarni ishga tushirishi va tarmoqqa kirishi mumkin. `requires.permissions` faqat bolaning qaysi muhit o'zgaruvchilarini olishini hal qiladi; boshqa ruxsatlar bajarilmaydi. Faqat o'zingiz ishonadigan plaginlarni o'rnating. Quyidagi jarayon chegarasida buzilishlar va osilib qolishlar mavjud; bu xavfsizlik chegarasi emas.

- **Jarayonni izolyatsiya qilish** — `loadPlugin()` (`src/lib/plugins/loader.ts`) har bir plaginni alohida Node.js bola jarayonida hosil qiladi va IPC orqali muloqot qiladi. Hook qo'ng'iroqlari `SIGTERM` → `SIGKILL` eskalatsiyasi bilan vaqt tugashiga ega.
- **Env ruxsat etilgan ro'yxat** — bola faqat ruxsat etilgan ro'yxatdagi muhit o'zgaruvchilari to'plamini oladi; kengroq to'plam faqat manifest `env` ruxsatini so'raganda beriladi.
- **Manba muhofazasini o'rnating** — `POST /api/plugins` faqat plagin manbalari katalogidan oʻqiydi (“Mahalliy yoʻldan oʻrnatish” boʻlimiga qarang): yoʻl `realpath` bilan kanoniklashtiriladi, qatʼiy ravishda shu katalog ichida boʻlishi kerak va undan qochib ketadigan simli havolani olib yuruvchi manba daraxti hech narsa nusxa koʻchirilishidan oldin rad etiladi.
- **Yo'lni ushlab turish** — install/upgrade/uninstall plagin katalogi va `manifest.main` hal qilishini tasdiqlaydi** ichida** boshqariladigan plagin ildizini har qanday nusxa ko'chirish yoki rekursiv o'chirishdan oldin ( `manifest.main` da o'zgartirilgan DB yo'llari va `../` traversalidan himoya qiladi). Faollashtirish `realpath` orqali simli havolalarni hal qiladi va plagin katalogidan qochadigan kirish nuqtasini yuklashni rad etadi.
- **Ixtiyoriy yaxlitlik pin** — manifest `integrity` (`sha256-<base64>`, SRI formati) maydonini e'lon qilishi mumkin. Mavjud bo'lsa, yuklovchi yuklash vaqtida kirish fayli xeshini tekshiradi va mos kelmasligi sababli faollashtirishni rad etadi. Bu o'zgartirishni aniqlash imkoniyati,** emas** xavfsizlik chegarasi: yuklangan plagin nima qila olishini cheklamaydi.
- **Hooklarda mijoz hisob ma'lumotlari yo'q** — `onRequest`, `onResponse` va `onError` ga uzatilgan kontekstda `authorization`, `x-api-key`, `proxy-authorization` va `cookie` sarlavhalari olib tashlangan va API kalit yozuvi kalit qiymatiga ega emas (`redactPluginContext()` da `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) tomonidan tasdiqlangan:

| Maydon             | Turi      | Eslatmalar                                                                |
| ------------------ | --------- | ------------------------------------------------------------------------- |
| `name`             | ip        | Majburiy; kabob qutisi (`^[a-z0-9-]+$`), 1–100 belgi                      |
| `version`          | ip        | Majburiy; semver (`MAJOR.MINOR.PATCH`)                                    |
| `description`      | string?   | ≤ 500 belgi                                                               |
| `author`           | string?   | ≤ 200 belgi                                                               |
| `license`          | string?   | Standart `MIT`                                                            |
| `main`             | string?   | Kirish fayli; sukut bo'yicha `index.js`                                   |
| `source`           | enum?     | `local` \| `marketplace` (standart `local`)                               |
| `tags`             | string[]? | Teglarni qidirish                                                         |
| `requires`         | ob'ekt?   | `{ omniroute?, permissions[] }`                                           |
| `hooks`            | ob'ekt?   | Plagin qaysi ilgaklarni amalga oshirishini e'lon qiluvchi mantiqiylar     |
| `skills`           | ob'ekt[]? | Ixtiyoriy malaka ta'riflari                                               |
| `enabledByDefault` | mantiqiy? | O'rnatish paytida avtomatik faollashtirish                                |
| `configSchema`     | ob'ekt?   | Konfiguratsiya maydonlari xaritasi (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Ixtiyoriy `sha256-<base64>` kirish fayli PIN                              |

Ruxsatlar enum `network` / `file-read` / `file-write` / `env` / `exec` dan olinadi. Faqat `env` ish vaqti effektiga ega (bola uchun bir oz kattaroq muhit o'zgaruvchilarining ruxsat etilgan ro'yxati); qolganlari deklaratsiya bo'lib, ular ijro etilmaydi.

## Hayotiy sikl jarayoni

```
install (POST /api/plugins, yoʻl)
  → manifestni skanerlash/tekshirish → vaqtinchalik joyga nusxalash → main fayli katalog ichida ekanini tasdiqlash
  → atomar tarzda ~/.omniroute/plugins/<name> ichiga qayta nomlash → DB qatorini kiritish
  → onInstall ni ishga tushirish → agar enabledByDefault boʻlsa: faollashtirish

activate (POST /api/plugins/{name}/activate)
  → realpath orqali katalog chegarasida ekanini tekshirish → loadPlugin() (quyi jarayonni ishga tushirish)
  → eʼlon qilingan hook’larni roʻyxatdan oʻtkazish → status = "active" → onActivate ni ishga tushirish

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate ni ishga tushirish (roʻyxatdan chiqarishdan OLDIN) → hook’larni roʻyxatdan chiqarish
  → quyi jarayonni toʻxtatish → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → faol boʻlsa, faolsizlantirish → onUninstall ni ishga tushirish
  → plugin katalogini katalog chegarasi tekshirilgan holda rekursiv oʻchirish → DB qatorini oʻchirish
```

`install` buyrugʻi manifest versiyasi oʻrnatilgan versiyadan **qatʼiy ravishda
yangiroq** boʻlgan katalog uchun qayta ishga tushirilsa, avtomatik yangilash
amalga oshiriladi (toza qayta oʻrnatish; konfiguratsiya standart qiymatlarga
qaytariladi). Bir xil yoki eskiroq versiya rad etiladi.

## Maʼlumotlar bazasi

`plugins` jadvali (`076_create_plugins.sql` migratsiyasi):

| Ustun           | Tur     | Izohlar                                                            |
| --------------- | ------- | ------------------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                               |
| `name`          | TEXT    | Noyob                                                              |
| `version`       | TEXT    | semver; standart qiymat `1.0.0`                                    |
| `description`   | TEXT    | Ixtiyoriy                                                          |
| `author`        | TEXT    | Ixtiyoriy                                                          |
| `license`       | TEXT    | Standart qiymat `MIT`                                              |
| `main`          | TEXT    | Kirish fayli; standart qiymat `index.js`                           |
| `source`        | TEXT    | Standart qiymat `local`                                            |
| `tags`          | TEXT    | JSON massivi; standart qiymat `[]`                                 |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                   |
| `enabled`       | INT     | 0/1; standart qiymat 0                                             |
| `manifest`      | TEXT    | Toʻliq manifest JSON’i                                             |
| `config`        | TEXT    | JSON; standart qiymat `{}`                                         |
| `config_schema` | TEXT    | JSON; standart qiymat `{}`                                         |
| `hooks`         | TEXT    | Eʼlon qilingan hook nomlarining JSON massivi; standart qiymat `[]` |
| `permissions`   | TEXT    | JSON massivi; standart qiymat `[]`                                 |
| `plugin_dir`    | TEXT    | Mutlaq oʻrnatish katalogi                                          |
| `error_message` | TEXT    | `status = "error"` boʻlganda oʻrnatiladi                           |
| `installed_at`  | TEXT    | `datetime('now')`                                                  |
| `updated_at`    | TEXT    | `datetime('now')`                                                  |
| `activated_at`  | TEXT    | Faollashtirilganda oʻrnatiladi                                     |

Plugin metrikalari/tahlillari qoʻshimcha jadvallarda kuzatib boriladi
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Boshqaruv paneli

`/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) da boshqaruv paneli sahifasida ikkita yorliq mavjud:

- **Oʻrnatilgan** — o'rnatilgan plaginlarni ularning e'lon qilingan ilgaklari, activate/deactivate tugmasi, o'chirish tugmasi va "Plaginlarni skanerlash" (`POST /api/plugins/scan`) bilan ro'yxatga oladi.
- **Bozor** — maxsus ro'yxatga olish kitobini o'rnatish uchun maydon bilan `GET /api/plugins/marketplace` dan katalogni ko'rsatadi URL.

Sahifada har doim plaginlar OmniRoute jarayonining to'liq imtiyozlari bilan ishlashi haqida ogohlantirish ko'rsatiladi.

Har bir plagin konfiguratsiya sahifasi `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`) da yashaydi.

## Shuningdek qarang

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  nima uchun `/api/plugins` faqat loopback uchun ochiq (1-daraja)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — tegishli ko‘nikmalar freymvorki
  (`src/lib/skills/`); plaginlar o‘z manifestida ko‘nikmalarni e’lon qilishi mumkin
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — hodisalarga asoslangan chiquvchi
  integratsiyalar
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  har bir plagin marshruti xato javoblari uchun foydalanadigan `buildErrorBody()` andozasi
