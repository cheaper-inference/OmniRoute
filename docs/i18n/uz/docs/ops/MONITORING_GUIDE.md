# Monitoring & Observability Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Qisqacha**: OmniRoute ichki holat monitoringi, provayder avtopiloti, kvota kuzatuvi va kuzatuvchanlik ilgaklari bilan birga taqdim etiladi. Ushbu qoʻllanma boshqaruv paneli, ogohlantirishlar va nosozliklarni bartaraf etishni qamrab oladi.

**Manbalar:**

- `src/lib/monitoring/observability.ts` — kuzatuvchanlik oniy tasviri
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombinatsiya holati avtopiloti
- `src/lib/monitoring/providerHealthAutopilot.ts` — provayder avtopiloti
- `src/lib/monitoring/providerHealthMatrix.ts` — provayder holati matritsasi
- `src/lib/localHealthCheck.ts` — mahalliy holat tekshiruvi
- `src/lib/tokenHealthCheck.ts` — tokenni yangilash holati
- `src/lib/proxyHealth.ts` — proksi holati keshi (PROXY_GUIDE.md faylida yoritilgan)

---

## Umumiy koʻrinish

OmniRouteʼda **3 ta monitoring qatlami** mavjud:

```
┌──────────────────────────────────────────────────────────────┐
│  1-qatlam: Tizim holati (server darajasida)                  │
│  ├─ localHealthCheck.ts — DB, portlar, mahalliy bogʻliqliklar│
│  ├─ db/healthCheck.ts — yaxlitlik, FK, yetim artefaktlar     │
│  └─ Boshqaruv paneli: /dashboard/health                      │
├──────────────────────────────────────────────────────────────┤
│  2-qatlam: Provayder holati (har bir provayder barqarorligi) │
│  ├─ providerHealthAutopilot.ts — uzgich, kutish davrlari     │
│  ├─ providerHealthMatrix.ts — provayder/model holat ballari  │
│  └─ Boshqaruv paneli: /dashboard/providers                   │
├──────────────────────────────────────────────────────────────┤
│  3-qatlam: Jonli kuzatuvchanlik (ish vaqtidagi oniy tasvirlar)│
│  ├─ observability.ts — uzgichlar, seanslar, kvota            │
│  ├─ tokenHealthCheck.ts — OAuth tokenini yangilash holati    │
│  └─ MCP vositalari: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Boshqaruv paneli sahifalari

### `/dashboard/health` (Tizim holati)

Yuqori darajadagi holat boshqaruv paneli quyidagilarni koʻrsatadi:

| Boʻlim                       | Nimani koʻrsatadi                                     |
| ---------------------------- | ----------------------------------------------------- |
| **Server holati**            | Ishlash vaqti, versiya, port, faol ulanishlar         |
| **Maʼlumotlar bazasi**       | Ulanish, yaxlitlik, WAL hajmi, soʻnggi migratsiyalar  |
| **Provayder xulosasi**       | Faol, sogʻlom va uzgichi ochiq provayderlar soni      |
| **Kvota monitorlari**        | Faol seanslar, ogohlantirish holati, tugagan kvotalar |
| **Soʻnggi xatolar**          | Stek treyslari bilan soʻnggi 10 ta xato               |
| **Resurslardan foydalanish** | Xotira, CPU, uyum bosimi indikatori                   |

### `/dashboard/providers` (Provayder holati)

Har bir provayder uchun boshqaruv paneli:

| Ustun      | Tavsif                                               |
| ---------- | ---------------------------------------------------- |
| Provayder  | Provayder IDsi + koʻrsatiladigan nomi                |
| Holat      | Yashil/sariq/qizil holat                             |
| Uzgich     | Ochiq/yopiq/yarim ochiq holat                        |
| Ulanishlar | Ulanishlar soni, soʻnggi yangilanish                 |
| Modellar   | Mavjud modellar, har bir model holati                |
| Xarajat    | Bugungi xarajat, 7 kunlik tendensiya                 |
| Xatolar    | Soʻnggi 24 soatdagi xatolar soni, asosiy xato klassi |

Quyidagilarni koʻrish uchun provayder ustiga bosing:

- Kechikish tafsilotlari bilan soʻnggi soʻrovlar
- Har bir ulanish boʻyicha holat ballari
- Har bir model boʻyicha blokirovkalar
- Avtopilot tavsiyalari

### `/dashboard/quota` (Kvota kuzatuvi)

Har bir API kaliti uchun:

- Joriy foydalanish va limit nisbati (jarayon paneli)
- Kvota tendensiyasi (30 kunlik diagramma)
- Keyingi tiklanish vaqti
- Ogohlantirishlar tarixi

### `/dashboard/combos` (Kombinatsiyalar holati)

Har bir kombinatsiya uchun:

- Strategiya + maqsadlar
- Har bir maqsad holati
- Soʻnggi zaxira variantiga oʻtish hodisalari
- Muvaffaqiyat darajasi (24 soat, 7 kun, 30 kun)

---

## Salomatlik tekshiruvi API

OmniRoute fosh qiladi** ikki** HTTP salomatlik yuzalari. Ular orkestrlar uchun almashtirilmaydi.

| Yo'l                         | Maqsad                                                                              | Og'irligi                                | uchun foydalaning                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| `GET /healthz`               | Hayot davri liveness/readiness (`ok` / `starting` / `stopping`)                     | Arzimas (faqat faza belgisi)             | Kubernetes** tayyorlik** ; yumshoq** tiriklik** agar siz HTTP foydalanishingiz kerak bo'lsa |
| `GET /api/monitoring/health` | Chuqur tizim + provayderi haqida qisqacha ma'lumot (DB, to'p, kataloglar soni, ...) | Og'ir (sinxronlash DB / monitoring ishi) | Boshqaruv panellari, qora quti chuqur tekshiruvlari, Docker o'rnatilgan sog'liq tekshiruvi  |

> **Eslatma:** Provayderning sog'lig'i matritsalari, avtopilot muammolari, kvota monitorlari, token salomatligi va `/api/monitoring/health` tashqari kechikish tafsilotlari**MCP vositasi** `observability_snapshot` yoki** asboblar paneli** — sahifalarida ular uchun maxsus REST marshrutlari mavjud emas.

Ikkala marshrut ham bo'ylab harakatlanadi** bir xil tugun hodisasi davri** so'rovni qayta ishlash sifatida. CPU bilan bog'langan yo'l (katta `GET /v1/models` katalogi ishi, uzoq kontekstli siqish / tokenlarni hisoblash) kechiktirishi mumkin** hammasi** HTTP ishlov beruvchilari, shu jumladan `/healthz`. Voqealar-loop band ≠ jarayoni tugadi. Cho'chqani mahkamlashni afzal ko'ring; probni sozlash faqat yolg'on o'ldirishni kamaytiradi.

### Yengil vaznli orkestr probi

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` serverning hayot aylanish bosqichi tayyor bo'lganda
- **503** yuklash yoki o'chirish paytida + `starting` / `stopping`
- Amalga oshirish: `src/app/healthz/route.ts` ( DB ping yo'q)

### Tizim salomatligi (chuqur)

```bash
GET /api/monitoring/health
```

Javob:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: prob-kesh va SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` the** xotiradagi prob-kesh o'lchagich** , `provider_connections.test_status` ning jonli borini emas. #12532 dan keyin so'rov yo'li faqat `getCachedCredentialHealthSummary()` o'qiydi; fon problari voqea tsiklidan keshni yangilaydi.

| Qatlam                            | Qayerda                                                               | Bu nimani anglatadi                                                                                                                                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Prob-kesh o'lchagich              | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | So‘nggi hisob ma’lumotlarini tekshirish natijalari hali ham jarayon xotirasida saqlanadi. `source` har doim `probe-cache`.                                                                                                           |
| Muvaffaqiyatsiz ulanish tafsiloti | `credentialHealth.failedConnections`                                  | Hozirgi** faqat `failed > 0` bo'lganda** . `status=error` (`connectionId`, `status`, tozalangan `lastError` / `lastErrorType`) bilan kesh qatorlarining chegaralangan roʻyxati. `failedOmitted` ro'yxat chegaralanganda o'rnatiladi. |
| SQLite yopishqoq holati           | `credentialHealth.staleDbNonOkCount`                                  | soni** faol** (`is_active=1`) davomli `test_status` maʼlum boʻlmagan ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) boʻlgan bogʻlanish qatorlari.                                              |

Ikki qatlam maqsadga muvofiq kelmasligi mumkin:

- `staleDbNonOkCount>0` — SQLite hali ham yopishqoq `test_status` (masalan `expired` yoki `credits_exhausted`) mavjud bo‘lganda, `failed=0` o‘lchagichining so‘nggi prob-kesh snapshoti `status=error` sifatida hisoblanmaydi.
- SQLite ko'rinishida `failed>0` o'lchagichi sog'lom — yaqindagi tekshiruv muvaffaqiyatsiz tugadi va keshlangan; DB qatori yangilanmagan yoki keyinroq tozalangan.

Ushbu oxirgi nuqtani qirib tashlashda faqat `provider_connections.test_status` haqida ogohlantirmang. Jonli zond nosozliklari uchun `failed` + `failedConnections` foydalaning va doimiy yopishqoq holat soni kerak bo'lganda `staleDbNonOkCount` foydalaning.

### Kubernetes tadqiqot tavsiyalari

OmniRoute - a** yagona tugun jarayoni** (bitta hodisa tsikli). Qimmatli Docker `HEALTHCHECK` engil vaznli `/healthz` ni maqsad qiladi. `/api/monitoring/health` hisoblanadi** juda og'ir** kubelet jonlilik intervallari uchun.

| Prob                  | Tavsiya etilgan maqsad                                                           | Eslatmalar                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ish boshlash**      | HTTP `GET /healthz` uzun `failureThreshold` (yoki katta `startPeriod`) bilan     | Sovuq start + SQLite migratsiya bir necha soniyadan oshib ketishi mumkin                                                                                                                                                                                                                                                                                                        |
| **Tayyorlik**         | HTTP `GET /healthz`                                                              | Hayot davri `ok` / `starting` / `stopping` (200 va 503). Agar pastadir protsessor tomonidan bloklangan bo'lsa, hali ham yopiladi. A** Bir necha soniya ichida 200 sog'lom emas** (#10303) — bu 3 baytlik ishlov beruvchi ishga tushgunga qadar voqea sikli och qolganligini bildiradi.                                                                                          |
| **Jonlilik**          | HTTP `GET /livez`,** yoki TCP** asosiy xizmat portida (`PORT`, standart `20128`) | `/livez` faqat jarayonda ishlaydi (agar ishlov beruvchi ishlayotgan bo'lsa, har doim 200). U hali ham — busy ≠ dead hodisasini baham ko‘radi va u hodisa tsikli ochligini (#10303) TCP dan yaxshiroq aniqlamaydi. Afzal**TCP** agar HTTP problari catalog/compression yuki ostida vaqt tugasa; qilmoq** emas** har qanday yo'l bilan qisqa voqea-loop do'konlarda pod o'ldirish |
| **Chuqur salomatlik** | tashqi tekshirgichdan `GET /api/monitoring/health`                               | Kubelet `livenessProbe` / qattiq `readinessProbe` uchun emas                                                                                                                                                                                                                                                                                                                    |

Misol shakli (sovuq boshlash va siqish yukiga chegaralarni sozlang):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**Bunday qilma** nuqta kubelet** tiriklik** `/api/monitoring/health`. Bu yo'l haqiqiy DB/monitoring ishlaydi va yuk ostida noto'g'ri ijobiy bo'ladi.

Aloqador: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (hodisalar tsikli band bo'lganda tekshirishlar), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (katalog narxlari cho'chqasi), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (siqish tokenini hisoblash cho'chqasi).

### systemd watchdog (muzlatilgan hodisalar davri)

Tizimli xostda OmniRoute xizmat menejeriga u tayyor bo'lganda xabar beradi va unga ping yuborishda davom etadi, shuning uchun voqea tsikli tiqilib qolgan server o'chib qoladi va jim turish o'rniga qayta ishga tushadi. Pinglar serverning o'z voqealar tsiklidan kelib chiqadi: bloklanganda ular to'xtaydi va `WatchdogSec` tugashi bilan systemd xizmatni qayta ishga tushiradi.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) allaqachon bu bilan foydalanuvchi birligini yozadi. O'zingiz yozgan birlik (standart `Type=simple`) hech qanday kuzatuvchiga ega emas, shuning uchun uning `[Service]` bo'limiga quyidagi qatorlarni qo'shing:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Yaratilgan birlik `Restart=on-failure` o'rnatadi, shuning uchun u holda — qatorini qo'shing, kuzatuvchi kuch uni qayta ishga tushirish o'rniga faqat tiqilib qolgan xizmatni o'ldiradi.

- `Type=notify`: xizmat server `READY=1` yuborganida "boshlanadi", jarayon vilkalar bo'lganda emas. `TimeoutStartSec` sekin boshlashni chegaralaydi.
- `NotifyAccess=all`: pinglar `omniroute serve` supervayzerining bolasi bo'lgan server jarayoni tomonidan yuboriladi.
- `WatchdogSec`: pinglar har 60 soniyada o'chadi, shuning uchun foydalaning** 120 yoki undan ko'p** . Kichikroq qiymatlar sog'lom serverni qayta ishga tushiradi.
- Oldindan `omniroute serve` ishga tushiring. `--daemon` serverni birlik guruhidan ajratadi va bildirishnoma bilan qo'l siqish hech qachon tugamaydi.

Qayta ishga tushirilgandan so'ng uning faolligini tekshiring:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` sozlangan kechikishni ko'rsatadi va `WatchdogTimestamp` har daqiqa oldinga siljiydi. Qo'riqchi tomonidan qayta ishga tushirish `Result=watchdog` sifatida qayd etiladi. Jihozni avvalgidek ushlab turganda pinglarni o'chirish uchun `OMNIROUTE_DISABLE_SD_NOTIFY=1` o'rnating; `NOTIFY_SOCKET` holda (terminal, Docker, Electron, Windows) hech narsa yuborilmaydi.

Qo'riqchi faqat voqea tsiklining ishlashini tekshiradi. Sekin, lekin hali ham aylanayotgan server qayta ishga tushmaydi.

### Ixtiyoriy so'rov yo'li bilan ishlash (xotira, ko'nikmalar, tokenni yangilash)

Xotirani ajratib olish, ko'nikmalarni kiritish va OAuth tokenini yangilash** asosiy tugun hodisa tsikli** `/healthz` bilan. Ular asboblar panelini almashtirish funksiyalari (`memoryEnabled`, `skillsEnabled`), ishchilar puli emas. [Atrof-muhit — voqea-loop narxiga](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) qarang.

### Provayder salomatligi

> **REST oxirgi nuqtasi yo'q.** Provayderning sog'lig'i haqidagi ma'lumotlar MCP vositasi `observability_snapshot` yoki asboblar paneli `/dashboard/providers` sahifasi orqali mavjud.

### Provayder tafsilotlari

> **REST oxirgi nuqtasi yo'q.** Har bir provayder haqida ma'lumot asboblar panelidagi `/dashboard/providers` sahifasi orqali mavjud.

---

## Provayder salomatligi avtopiloti

`providerHealthAutopilot.ts` moduli quyidagilarni bajaradigan **oʻzini oʻzi tiklash tizimi**dir:

1. Provayder muammolarini aniqlaydi (ochiq circuit breaker, kutish davrlari, bloklanishlar, kvota ogohlantirishlari)
2. Ularni hal qilish uchun **tavsiya etilgan amallarni** yaratadi
3. Ixtiyoriy ravishda past xavfli amallarni **avtomatik bajaradi**

### Aniqlanadigan muammo turlari

| Muammo turi                  | Jiddiylik     | Namuna shart                                              |
| ---------------------------- | ------------- | --------------------------------------------------------- |
| `provider_circuit_open`      | kritik        | 5 ta xatodan soʻng circuit breaker ochiq                  |
| `provider_circuit_half_open` | ogohlantirish | Circuit tiklanishni sinamoqda                             |
| `connection_cooldown`        | ogohlantirish | 429 dan soʻng ulanish kutish davrida                      |
| `stale_connection_error`     | ogohlantirish | Oxirgi yangilash 30+ daqiqa oldin muvaffaqiyatsiz tugagan |
| `terminal_connection_error`  | kritik        | OAuth bekor qilingan, kalit yaroqsiz                      |
| `inactive_connection`        | axborot       | Sozlamalarda ulanish oʻchirilgan                          |
| `model_lockout`              | ogohlantirish | Muayyan model karantinda                                  |
| `quota_monitor_warning`      | ogohlantirish | Kvotadan foydalanish 80%+                                 |

### Yaratiladigan amal turlari

| Amal                           | Xavf   | Tavsif                                    |
| ------------------------------ | ------ | ----------------------------------------- |
| `clear_provider_breaker`       | oʻrta  | Circuit breakerni yopiq holatga qaytarish |
| `clear_connection_cooldown`    | past   | Ulanishdan kutish davrini olib tashlash   |
| `clear_stale_connection_error` | past   | Eskirgan xato belgisini tozalash          |
| `clear_model_lockout`          | past   | Karantindagi modelni qayta yoqish         |
| `reactivate_connection`        | oʻrta  | Faolsizlantirilgan ulanishni qayta yoqish |
| `deactivate_connection`        | yuqori | Muammoli ulanishni oʻchirish              |

### API

> **REST endpoint mavjud emas.** Avtopilot muammolari MCP vositasi `observability_snapshot` yoki boshqaruv paneli orqali mavjud. Avtopilot ichki tartibda ishlaydi; uning xatti-harakati muhit oʻzgaruvchilari orqali emas, sozlamalar maʼlumotlar bazasi orqali (har bir ulanish uchun `autopilotMode` maydoni) sozlanadi — avtopilot rejimiga oid muhit oʻzgaruvchisini `grep -rn` orqali qidirish hech qanday natija bermaydi.

### Avtopilot rejimi

Avtopilot standart holatda **qoʻlda boshqarish rejimida** ishlaydi — u muammolarni aniqlaydi va tavsiya etilgan amallarni yaratadi, ammo ularni avtomatik qoʻllamaydi. Amallarni boshqaruv paneli orqali qoʻllash mumkin.

---

## Combo salomatligi avtopiloti

`comboHealthAutopilot.ts` — provayder avtopilotining **combo uchun maxsus** muqobilidir. U:

- Nosogʻlom combolarni aniqlaydi
- Nishonlarni qayta tartiblashni tavsiya qiladi
- Ishlamayotgan nishonlarni oʻchirishni taklif qiladi
- N ta xatodan soʻng ishlamaydigan nishonlarni avtomatik olib tashlaydi

### Combo muammolariga misollar

```
Combo "always-on" (ustuvorlik strategiyasi)
├─ Nishon 1: openai/gpt-5 (sogʻlom)
├─ Nishon 2: anthropic/claude-opus-4-6 (⚠️ model 14:00 gacha bloklangan)
└─ Nishon 3: kiro/claude-sonnet-4-5 (sogʻlom)

Tavsiya etilgan amal: Qayta tartiblash — bloklanish muddati tugaguncha kiro ni anthropic dan yuqoriga koʻchirish
```

---

## Kvota monitorlari

`observability.ts` obuna provayderlari (Claude Code, Codex, GitHub Copilot) uchun **har bir sessiyaga oid kvota monitorlarini** taqdim etadi:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Holatlarning maʼnolari

| Holat       | Qachon                         | UI amali                                     |
| ----------- | ------------------------------ | -------------------------------------------- |
| `starting`  | Dastlabki soʻrov bajarilmoqda  | Yuklanish indikatori                         |
| `idle`      | Yaqinda faollik boʻlmagan      | Boshqaruv panelida yashiriladi               |
| `healthy`   | Kvotaning > 50% qismi qolgan   | Yashil nuqta                                 |
| `warning`   | Kvotaning < 50% qismi qolgan   | Sariq ogohlantirish                          |
| `exhausted` | Kvota = 0%                     | Qizil blok, keyingi provayderga yoʻnaltirish |
| `error`     | Soʻrov muvaffaqiyatsiz tugagan | Qizil nuqta, tez orada qayta urinish         |

### API

> **REST endpoint mavjud emas.** Kvota monitori maʼlumotlari MCP vositasi `observability_snapshot` yoki boshqaruv paneli orqali mavjud.

---

## Kuzatuvchanlik surati

MCP vositasi `observability_snapshot` AI agentlari uchun **tizimning toʻliq suratini** qaytaradi:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* yuqoriga qarang */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agentlar bundan **marshrutlash qarorlarini** qabul qilish uchun foydalanadi — masalan, «agar openai zanjiri ochiq boʻlsa, avval anthropic xizmatiga marshrutlang».

---

## Token holatini tekshirish

OAuth provayderlari (Claude Code, GitHub Copilot, Cursor) tokenlarni **davriy ravishda yangilab turishni** talab qiladi. `src/lib/tokenHealthCheck.ts` fon rejalashtiruvchisini ishga tushiradi:

- **Tekshiruv sikli**: har 60 soniyada (`src/lib/tokenHealthCheck.ts:30` faylida `TICK_MS = 60 * 1000` boʻyicha tekshiruv)
- **Har bir ulanish uchun holatni tekshirish oraligʻi**: standart qiymat — 60 daqiqa (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); sozlamalar maʼlumotlar bazasi orqali sozlanadi
- **401 holatida oldindan yangilash**: har bir ulanish interceptori tomonidan boshqariladi

### Token holati

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Sozlash

Token holatini tekshirish sozlamalari `tokenHealthCheck.ts` tomonidan ichki tarzda boshqariladi.

### Token holati

> **REST endpoint mavjud emas.** Token holati maʼlumotlari boshqaruv paneli yoki MCP vositasi `observability_snapshot` orqali mavjud.

---

## Ogohlantirishlar

### Oʻrnatilgan kanallar

OmniRoute **3 ta ogohlantirish kanalini** qoʻllab-quvvatlaydi:

| Kanal                    | Sozlash               | Qoʻllanish holati                 |
| ------------------------ | --------------------- | --------------------------------- |
| Boshqaruv paneli banneri | Doimo yoqilgan        | Ilova ichidagi bildirishnomalar   |
| Webhook                  | URL manzilini sozlang | Slack, Discord, PagerDuty         |
| Jurnal                   | Standart              | Tashqi jurnal agregatsiyasi uchun |

### Webhook sozlamalari

> **Eslatma:** Webhook ogohlantirish sozlamalari boshqaruv panelining Sozlamalar sahifasi orqali boshqariladi. Webhook URL manzili, hodisalarni filtrlash va foydali yukni sozlash uchun Sozlamalar interfeysiga qarang.

### Ogohlantirish turlari

| Ogohlantirish                | Qachon                                                                | Standart jiddiylik |
| ---------------------------- | --------------------------------------------------------------------- | ------------------ |
| `provider_circuit_open`      | Zanjir ochilganda                                                     | kritik             |
| `provider_circuit_half_open` | Zanjir tiklanishi sinovdan oʻtkazilganda                              | axborot            |
| `quota_warning`              | Kvota 80% yoki undan yuqori boʻlganda                                 | ogohlantirish      |
| `quota_exhausted`            | Kvota 100% boʻlganda                                                  | kritik             |
| `token_refresh_failed`       | Ketma-ket 3 yoki undan koʻp yangilash muvaffaqiyatsiz boʻlganda       | ogohlantirish      |
| `token_expired`              | Tokenning amal qilish muddati oʻtganda                                | kritik             |
| `combo_target_unhealthy`     | Combo nishoni 1 soat yoki undan koʻp vaqt sovitish holatida boʻlganda | ogohlantirish      |
| `db_integrity_warning`       | FK buzilishlari soni 0 dan katta boʻlganda                            | ogohlantirish      |
| `heap_pressure`              | Heap ishlatilishi chegara qiymatining 80% idan oshganda               | ogohlantirish      |

---

## Samaradorlik metrikalari

### Kuzatiladigan metrikalar

| Metrika                 | Turi        | Manba                           |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | hisoblagich | `services/usage.ts`             |
| `request_latency_ms`    | gistogramma | `services/usage.ts`             |
| `tokens_consumed`       | hisoblagich | `services/usage.ts`             |
| `cost_usd`              | hisoblagich | `services/usage.ts`             |
| `provider_errors`       | hisoblagich | `services/errorClassifier.ts`   |
| `circuit_state_changes` | hisoblagich | `services/resilience.ts`        |
| `cache_hits`            | hisoblagich | `services/signatureCache.ts`    |
| `compression_savings`   | gistogramma | `services/compression/stats.ts` |
| `quota_used`            | o‘lchov     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | o‘lchov     | `observability.ts`              |

### Kechikish protsentillari (p50/p95/p99)

> **REST endpoint mavjud emas.** Kechikish protsentillari haqidagi ma’lumotlar boshqaruv panelidagi `/dashboard/health` sahifasida mavjud. Prometheus/OpenTelemetry eksporti v3.9 uchun rejalashtirilgan.

### Prometheus / OpenTelemetry eksporti (2-bosqich)

v3.9 uchun rejalashtirilgan: Prometheus, OpenTelemetry va Datadog tizimlariga bevosita eksport.

Hozircha istalgan HTTP asosidagi monitoring tizimi (Prometheus blackbox exporter, Datadog HTTP tekshiruvi va boshqalar) yordamida `/api/monitoring/health` endpointidan ma’lumotlarni yig‘ing.

---

## Ogohlantirish retseptlari

### Slack

> **Eslatma:** Webhook ogohlantirishlari boshqaruv panelining Settings sahifasi orqali sozlanadi — webhook uchun maxsus muhit o‘zgaruvchilari mavjud emas (`grep -rn` hech qanday natija qaytarmaydi). Webhook URL manzili, hodisalarni filtrlash va foydali yuklamani moslashtirish uchun Settings interfeysiga qarang.

### Discord

> Webhook ogohlantirishlari Slack bilan bir xil Settings interfeysi jarayonidan foydalanadi. Discord bir xil JSON foydali yuklama shaklini qabul qiladi.

### PagerDuty

> Webhook ogohlantirishlari bir xil Settings interfeysi jarayonidan foydalanadi. PagerDuty Events API v2 marshrutlash kalitlari Settings interfeysida sozlanadi.

### Maxsus webhook (JSON)

> JSON tanasi bilan POST so‘rovlarini qabul qiladigan istalgan HTTP endpoint ishlaydi. URL manzilini Settings interfeysida sozlang.

---

## Boshqaruv paneli konfiguratsiyasi

### Holat boshqaruv panelini moslashtirish

`~/.omniroute/dashboard.json` faylini yarating:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Provayderni yuqoriga mahkamlash

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Muammolarni bartaraf etish

### "Provayder sog‘lom holatda ekanini ko‘rsatmoqda, ammo so‘rovlar bajarilmayapti"

1. **Avtopilot muammolari**ni tekshiring — ehtimol, model bloklangan
2. Muayyan xato sinfi uchun **so‘nggi xatolar**ni ko‘rib chiqing
3. Provayder kartasidagi **ulanish testini** sinab ko‘ring
4. Provayderda **yuqori oqim tezligi cheklovi** mavjudligini tekshiring (mahalliy tizimda ko‘rinmaydi)

### "Kvota sog‘lom holatda ekanini ko‘rsatmoqda, ammo 429 xatolarini ko‘ryapman"

- 429 provayder kvotangizni ishlatib bo‘lganingizni bildirayotganini anglatadi
- OmniRoute kvota kuzatuvi **eskirgan** bo‘lishi mumkin — haqiqiy ma’lumot provayder tomonida
- Kvota ma’lumotlari ichki kvota monitori orqali avtomatik ravishda yangilanadi

### "Kombinatsiya ishlamayapti, ammo barcha maqsadlar sog‘lom ko‘rinmoqda"

- Maqsadlarni tartiblash muammolari uchun **kombinatsiya holati** boshqaruv panelini tekshiring
- **Zaxira variantga o‘tish hodisalari**ni ko‘rib chiqing — ehtimol, kombinatsiya variantlarni juda tez tugatmoqda
- **Strategiya** foydalanish holatingizga mos kelishini tekshiring (ustuvorlik, navbatma-navbat yoki avtomatik)

### "Ma’lumotlar bazasi holatini tekshirish muvaffaqiyatsiz tugamoqda"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` buyrug‘ini ishga tushiring
- Agar "ok" bo‘lsa — bu yolg‘on ogohlantirish, holat tekshiruvi haddan tashqari qat’iy ishlamoqda
- Boshqa har qanday natija bo‘lsa — **OmniRoute’ni to‘xtating** va [favqulodda tiklash qo‘llanmasi](./DATABASE_GUIDE.md#disaster-recovery)ga amal qiling

### "Xotira uyumiga bosim kritik darajada"

```bash
# Joriy uyumni tekshirish
node -e "console.log(process.memoryUsage())"

# GC’ni qo‘lda ishga tushirish (agar --expose-gc bo‘lsa)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Bir vaqtda bajariladigan so‘rovlar sonini kamaytiring (muhit o‘zgaruvchisi orqali emas, boshqaruv panelining Settings sahifasi orqali sozlanadi)
# `MAX_CONCURRENT_REQUESTS` muhit o‘zgaruvchisi mavjud emas — uni Settings → Concurrency bo‘limida sozlang.
```

---

## Shuningdek qarang

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — foydalanish va xarajatlarni kuzatish
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — ma’lumotlar bazasi sxemasi va holati
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proksi holati (alohida kesh)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — tizim arxitekturasi
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — avtomatik uzgich tafsilotlari
- Manba: `src/lib/monitoring/` (4 ta fayl, 2121 qator kod)
