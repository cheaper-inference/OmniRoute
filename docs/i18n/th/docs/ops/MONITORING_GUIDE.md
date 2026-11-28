# Monitoring & Observability Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **สรุปสั้นๆ**: OmniRoute มาพร้อมระบบตรวจสอบสถานภาพในตัว ระบบขับเคลื่อนอัตโนมัติสำหรับผู้ให้บริการ การติดตามโควตา และฮุกสำหรับการสังเกตการณ์ คู่มือนี้ครอบคลุมแดชบอร์ด การแจ้งเตือน และการแก้ไขปัญหา

**แหล่งข้อมูล:**

- `src/lib/monitoring/observability.ts` — สแนปช็อตการสังเกตการณ์
- `src/lib/monitoring/comboHealthAutopilot.ts` — ระบบขับเคลื่อนอัตโนมัติสำหรับสถานภาพของคอมโบ
- `src/lib/monitoring/providerHealthAutopilot.ts` — ระบบขับเคลื่อนอัตโนมัติสำหรับผู้ให้บริการ
- `src/lib/monitoring/providerHealthMatrix.ts` — เมทริกซ์สถานภาพของผู้ให้บริการ
- `src/lib/localHealthCheck.ts` — การตรวจสอบสถานภาพภายในเครื่อง
- `src/lib/tokenHealthCheck.ts` — สถานภาพการรีเฟรชโทเค็น
- `src/lib/proxyHealth.ts` — แคชสถานภาพพร็อกซี (อธิบายไว้ใน PROXY_GUIDE.md)

---

## ภาพรวม

OmniRoute มี **การตรวจสอบ 3 ชั้น**:

```
┌──────────────────────────────────────────────────────────────┐
│  ชั้นที่ 1: สถานภาพระบบ (ระดับเซิร์ฟเวอร์)                       │
│  ├─ localHealthCheck.ts — DB, พอร์ต, การพึ่งพาแบบเนทีฟ           │
│  ├─ db/healthCheck.ts — ความสมบูรณ์, FK, อาร์ติแฟกต์ที่ไม่มีเจ้าของ │
│  └─ แดชบอร์ด: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  ชั้นที่ 2: สถานภาพผู้ให้บริการ (ความยืดหยุ่นรายผู้ให้บริการ)          │
│  ├─ providerHealthAutopilot.ts — เซอร์กิตเบรกเกอร์, ช่วงพัก       │
│  ├─ providerHealthMatrix.ts — คะแนนสถานภาพตามผู้ให้บริการ/โมเดล  │
│  └─ แดชบอร์ด: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  ชั้นที่ 3: การสังเกตการณ์แบบเรียลไทม์ (สแนปช็อตขณะรันไทม์)          │
│  ├─ observability.ts — เซอร์กิตเบรกเกอร์, เซสชัน, โควตา            │
│  ├─ tokenHealthCheck.ts — สถานภาพการรีเฟรชโทเค็น OAuth         │
│  └─ เครื่องมือ MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## หน้าแดชบอร์ด

### `/dashboard/health` (สถานภาพระบบ)

แดชบอร์ดสถานภาพระดับบนสุดแสดงข้อมูลดังต่อไปนี้:

| ส่วน                 | ข้อมูลที่แสดง                                                  |
| -------------------- | -------------------------------------------------------------- |
| **สถานะเซิร์ฟเวอร์** | ระยะเวลาทำงาน, เวอร์ชัน, พอร์ต, การเชื่อมต่อที่ใช้งานอยู่      |
| **ฐานข้อมูล**        | การเชื่อมต่อ, ความสมบูรณ์, ขนาด WAL, การย้ายข้อมูลล่าสุด       |
| **สรุปผู้ให้บริการ** | จำนวนที่ใช้งานอยู่, จำนวนที่มีสถานภาพดี, จำนวนเบรกเกอร์ที่เปิด |
| **ตัวตรวจสอบโควตา**  | เซสชันที่ใช้งานอยู่, การแจ้งเตือน, โควตาที่หมดแล้ว             |
| **ข้อผิดพลาดล่าสุด** | ข้อผิดพลาด 10 รายการล่าสุดพร้อมสแต็กเทรซ                       |
| **การใช้ทรัพยากร**   | หน่วยความจำ, CPU, ตัวบ่งชี้แรงกดดันของฮีป                      |

### `/dashboard/providers` (สถานภาพผู้ให้บริการ)

แดชบอร์ดรายผู้ให้บริการ:

| คอลัมน์      | คำอธิบาย                                                 |
| ------------ | -------------------------------------------------------- |
| ผู้ให้บริการ | ID ผู้ให้บริการ + ชื่อที่ใช้แสดง                         |
| สถานภาพ      | สถานะสีเขียว/เหลือง/แดง                                  |
| เซอร์กิต     | สถานะเปิด/ปิด/เปิดครึ่งหนึ่ง                             |
| การเชื่อมต่อ | จำนวนการเชื่อมต่อ, การรีเฟรชล่าสุด                       |
| โมเดล        | โมเดลที่พร้อมใช้งาน, สถานภาพของแต่ละโมเดล                |
| ค่าใช้จ่าย   | ค่าใช้จ่ายของวันนี้, แนวโน้มในช่วง 7 วัน                 |
| ข้อผิดพลาด   | จำนวนข้อผิดพลาดใน 24 ชั่วโมงล่าสุด, คลาสข้อผิดพลาดสูงสุด |

คลิกผู้ให้บริการเพื่อดู:

- คำขอล่าสุดพร้อมรายละเอียดเวลาแฝง
- คะแนนสถานภาพของแต่ละการเชื่อมต่อ
- การล็อกเอาต์ของแต่ละโมเดล
- คำแนะนำจากระบบขับเคลื่อนอัตโนมัติ

### `/dashboard/quota` (การติดตามโควตา)

สำหรับ API key แต่ละรายการ:

- การใช้งานปัจจุบันเทียบกับขีดจำกัด (แถบความคืบหน้า)
- แนวโน้มโควตา (แผนภูมิ 30 วัน)
- เวลารีเซ็ตครั้งถัดไป
- ประวัติการแจ้งเตือน

### `/dashboard/combos` (สถานภาพคอมโบ)

สำหรับแต่ละคอมโบ:

- กลยุทธ์ + เป้าหมาย
- สถานภาพของแต่ละเป้าหมาย
- เหตุการณ์สำรองล่าสุด
- อัตราความสำเร็จ (24 ชั่วโมง, 7 วัน, 30 วัน)

---

## ตรวจสุขภาพ API

OmniRoute เปิดเผย** สอง** พื้นผิวสุขภาพ HTTP ไม่สามารถใช้แทนกันได้สำหรับผู้เรียบเรียง

| เส้นทาง                      | วัตถุประสงค์                                                  | น้ำหนัก                      | ใช้สำหรับ                                                                    |
| ---------------------------- | ------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| `GET /healthz`               | วงจรชีวิต liveness/readiness (`ok` / `starting` / `stopping`) | เล็กน้อย (แฟล็กเฟสเท่านั้น)  | คูเบอร์เนเตส** ความพร้อม** ; อ่อนนุ่ม** ความมีชีวิตชีวา** ถ้าคุณต้องใช้ HTTP |
| `GET /api/monitoring/health` | สรุปผู้ให้บริการ + ระบบลึก (DB, ฮีป, จำนวนแค็ตตาล็อก, …)      | หนัก (ซิงค์ DB / งานตรวจสอบ) | แดชบอร์ด การตรวจสอบเชิงลึกของแบล็คบ็อกซ์ การตรวจสุขภาพในตัวของ Docker        |

> **บันทึก:** เมทริกซ์ความสมบูรณ์ของผู้ให้บริการ ปัญหาอัตโนมัติ การตรวจสอบโควต้า ความสมบูรณ์ของโทเค็น และรายละเอียดเวลาแฝงที่เกินกว่า `/api/monitoring/health` มีให้ใช้งานผ่านทาง** เครื่องมือ MCP** `observability_snapshot` หรือ** แดชบอร์ด** หน้า — ไม่มีเส้นทาง REST เฉพาะสำหรับสิ่งเหล่านั้น

ทั้งสองเส้นทางวิ่งบน** วนซ้ำเหตุการณ์โหนดเดียวกัน** ตามคำขอการจัดการ เส้นทางที่เชื่อมโยงกับ CPU (งานแค็ตตาล็อก `GET /v1/models` ขนาดใหญ่ การบีบอัดบริบทแบบยาว / การนับโทเค็น) อาจทำให้เกิดความล่าช้าได้** ทั้งหมด** ตัวจัดการ HTTP รวมถึง `/healthz` กระบวนการ ≠ ไม่ว่างของเหตุการณ์วนซ้ำไม่ทำงาน ชอบซ่อมหมูมากกว่า การปรับแต่งโพรบจะลดการฆ่าที่ผิดพลาดเท่านั้น

### โพรบออร์เคสตราเตอร์น้ำหนักเบา

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` เมื่อเฟสวงจรการใช้งานเซิร์ฟเวอร์พร้อม
- **503** + `starting` / `stopping` ระหว่างการบู๊ตหรือปิดเครื่อง
- การใช้งาน: `src/app/healthz/route.ts` (ไม่มี DB ping)

### ความสมบูรณ์ของระบบ (ลึก)

```bash
GET /api/monitoring/health
```

การตอบสนอง:

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

#### `credentialHealth`: โพรบแคชกับ SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` คือ** เกจโพรบแคชในหน่วยความจำ** ไม่ใช่การถ่ายโอนข้อมูลสดของ `provider_connections.test_status` หลังจาก #12532 เส้นทางคำขอจะอ่าน `getCachedCredentialHealthSummary()` เท่านั้น โพรบเบื้องหลังรีเฟรชแคชนอกลูปเหตุการณ์

| ชั้น                          | ที่ไหน                                                                | มันหมายถึงอะไร                                                                                                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| เกจโพรบแคช                    | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | ผลลัพธ์การตรวจสอบความสมบูรณ์ของข้อมูลรับรองล่าสุดยังคงอยู่ในหน่วยความจำกระบวนการ `source` อยู่เสมอ `probe-cache`                                                                                   |
| รายละเอียดการเชื่อมต่อล้มเหลว | `credentialHealth.failedConnections`                                  | ปัจจุบัน** เฉพาะเมื่อ `failed > 0`** . รายการขอบเขตของแถวแคชด้วย `status=error` (`connectionId`, `status`, sanitized `lastError` / `lastErrorType`) `failedOmitted` ถูกตั้งค่าเมื่อรายการถูกต่อยอด |
| SQLite สถานะเหนียว            | `credentialHealth.staleDbNonOkCount`                                  | จำนวน** คล่องแคล่ว** (`is_active=1`) แถวการเชื่อมต่อที่ยังคงมี `test_status` เป็นที่รู้จัก non-ok (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)                |

สองชั้นอาจไม่เห็นด้วยโดยเจตนา:

- เกจ `failed=0` ในขณะที่ `staleDbNonOkCount>0` — SQLite ยังคงมี `test_status` ที่เหนียว (เช่น `expired` หรือ `credits_exhausted`) ซึ่งสแน็ปช็อตโพรบแคชล่าสุดไม่นับเป็น `status=error`
- เกจ `failed>0` ในขณะที่ SQLite ดูแข็งแรงดี — การสอบสวนล่าสุดล้มเหลวและถูกแคชไว้ แถว DB ยังไม่ได้รับการอัปเดตหรือถูกล้างในภายหลัง

อย่าแจ้งเตือนเฉพาะ `provider_connections.test_status` เมื่อคัดลอกตำแหน่งข้อมูลนี้ ใช้ `failed` + `failedConnections` สำหรับความล้มเหลวของโพรบที่ใช้งานอยู่ และ `staleDbNonOkCount` เมื่อคุณต้องการจำนวนสถานะ Sticky ที่คงอยู่

### คำแนะนำในการสอบสวน Kubernetes

OmniRoute คือก** กระบวนการโหนดเดียว** (หนึ่งเหตุการณ์วนซ้ำ) หุ้น Docker `HEALTHCHECK` กำหนดเป้าหมาย `/healthz` น้ำหนักเบา `/api/monitoring/health` คือ** หนักเกินไป** สำหรับช่วงความมีชีวิตชีวาของคูเบเล็ต

| โพรบ                  | เป้าหมายที่แนะนำ                                                                 | หมายเหตุ                                                                                                                                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **การเริ่มต้น**       | HTTP `GET /healthz` ที่มีความยาว `failureThreshold` (หรือขนาดใหญ่ `startPeriod`) | การย้าย + SQLite แบบเย็นอาจใช้เวลาเกินไม่กี่วินาที                                                                                                                                                                                                                                                        |
| **ความพร้อม**         | HTTP `GET /healthz`                                                              | วงจรชีวิต `ok` / `starting` / `stopping` (200 กับ 503) ยังคงกระพือปีกอยู่หากลูปถูกบล็อกโดย CPU ก** 200 ในหลายวินาทีนั้นไม่ดีต่อสุขภาพ** (#10303) — หมายความว่าลูปเหตุการณ์ถูกอดอาหารก่อนที่ตัวจัดการ 3 ไบต์จะรัน                                                                                          |
| **ความมีชีวิตชีวา**   | HTTP `GET /livez`,** หรือ TCP** บนพอร์ตบริการหลัก (`PORT`, ค่าเริ่มต้น `20128`)  | `/livez` เป็นแบบกระบวนการเท่านั้น (จะเป็น 200 เสมอหากตัวจัดการทำงาน) มันยังคงแชร์ลูปเหตุการณ์ — busy ≠ dead และตรวจไม่พบ event-loop starvation (#10303) ได้ดีไปกว่า TCP ชอบมากกว่า**TCP** ถ้าโพรบ HTTP หมดเวลาภายใต้โหลด catalog/compression ทำ** ไม่** ฆ่าพ็อดบนแผงลอยเหตุการณ์สั้น ๆ ไม่ว่าจะด้วยวิธีใด |
| **สุขภาพอย่างล้ำลึก** | `GET /api/monitoring/health` จากตัวตรวจสอบภายนอก                                 | ไม่ใช่สำหรับ kubelet `livenessProbe` / `readinessProbe` ที่แน่นหนา                                                                                                                                                                                                                                        |

รูปร่างตัวอย่าง (ปรับเกณฑ์สำหรับการสตาร์ทขณะเครื่องเย็นและโหลดการบีบอัด):

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

**อย่า** พอยต์คูเบเล็ต** ความมีชีวิตชีวา** ที่ `/api/monitoring/health` เส้นทางนั้นใช้งานได้จริง DB/monitoring และจะเป็นผลบวกลวงเมื่อโหลด

ที่เกี่ยวข้อง: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (โพรบในขณะที่ลูปเหตุการณ์ไม่ว่าง), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (หมูกำหนดราคาแคตตาล็อก), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (หมูนับโทเค็นการบีบอัด)

### systemd watchdog (วนซ้ำเหตุการณ์แช่แข็ง)

บนโฮสต์ systemd นั้น OmniRoute จะบอกผู้จัดการบริการเมื่อพร้อมและส่งสัญญาณ Ping ต่อไป ดังนั้นเซิร์ฟเวอร์ที่มีเหตุการณ์ลูปค้างจะถูกปิดและรีสตาร์ท แทนที่จะอยู่ต่อและเงียบไป การ Ping มาจากลูปเหตุการณ์ของเซิร์ฟเวอร์: เมื่อเซิร์ฟเวอร์บล็อก จะหยุด และ systemd จะเริ่มบริการใหม่เมื่อ `WatchdogSec` ผ่านไปโดยไม่มีเลย

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) เขียนหน่วยผู้ใช้ด้วยสิ่งนี้แล้ว หน่วยที่คุณเขียนเอง (ค่าเริ่มต้น `Type=simple`) จะไม่มีการเฝ้าระวัง ดังนั้นให้เพิ่มบรรทัดเหล่านี้ในส่วน `[Service]` :

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

หน่วยที่สร้างขึ้นจะตั้งค่า `Restart=on-failure` ดังนั้นให้เพิ่มบรรทัดนั้นด้วย — หากไม่มีโปรแกรมเฝ้าระวังจะฆ่าบริการที่ติดอยู่เท่านั้นแทนที่จะรีสตาร์ท

- `Type=notify`: บริการจะ "เริ่มต้น" เมื่อเซิร์ฟเวอร์ส่ง `READY=1` ไม่ใช่เมื่อกระบวนการแยก `TimeoutStartSec` มีการเริ่มต้นที่ช้า
- `NotifyAccess=all`: การ Ping ถูกส่งโดยกระบวนการเซิร์ฟเวอร์ ซึ่งเป็นรายการย่อยของผู้ดูแล `omniroute serve`
- `WatchdogSec`: ปิงจะดับทุกๆ 60 วินาที ดังนั้นให้ใช้** 120 หรือมากกว่า** . ค่าที่น้อยกว่าจะรีสตาร์ทเซิร์ฟเวอร์ที่มีประสิทธิภาพ
- เรียกใช้ `omniroute serve` ในเบื้องหน้า `--daemon` แยกเซิร์ฟเวอร์ออกจากกลุ่ม cgroup ของหน่วย และการจับมือแจ้งเตือนจะไม่เสร็จสิ้น

ตรวจสอบว่าใช้งานได้หลังจากรีสตาร์ท:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` แสดงความล่าช้าที่กำหนดค่าไว้และ `WatchdogTimestamp` จะเคลื่อนที่ไปข้างหน้าทุกนาที การรีสตาร์ทที่เกิดจาก Watchdog จะถูกบันทึกเป็น `Result=watchdog` หากต้องการปิดปิงในขณะที่ยังคงรักษาหน่วยไว้เดิม ให้ตั้งค่า `OMNIROUTE_DISABLE_SD_NOTIFY=1`; โดยไม่ต้อง `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) ไม่มีอะไรถูกส่ง

โปรแกรมเฝ้าระวังจะตรวจสอบเฉพาะว่าลูปเหตุการณ์ยังคงทำงานอยู่หรือไม่ เซิร์ฟเวอร์ที่ช้าแต่ยังคงหมุนไม่ได้ถูกรีสตาร์ท

### งานเส้นทางคำขอเพิ่มเติม (หน่วยความจำ ทักษะ การรีเฟรชโทเค็น)

การแยกหน่วยความจำ การฉีดทักษะ และการรีเฟรชโทเค็น OAuth แชร์** ลูปเหตุการณ์โหนดหลัก** ด้วย `/healthz` เป็นคุณสมบัติสลับแดชบอร์ด (`memoryEnabled`, `skillsEnabled`) ไม่ใช่พูลผู้ปฏิบัติงาน ดู [ต้นทุนเหตุการณ์ลูปสภาพแวดล้อม —](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)

### สุขภาพของผู้ให้บริการ

> **ไม่มีจุดสิ้นสุด REST** ข้อมูลสุขภาพของผู้ให้บริการสามารถดูได้จากเครื่องมือ MCP `observability_snapshot` หรือหน้าแดชบอร์ด `/dashboard/providers`

### รายละเอียดผู้ให้บริการ

> **ไม่มีจุดสิ้นสุด REST** รายละเอียดต่อผู้ให้บริการสามารถดูได้จากหน้าแดชบอร์ด `/dashboard/providers`

---

## ระบบควบคุมสถานะผู้ให้บริการอัตโนมัติ

โมดูล `providerHealthAutopilot.ts` เป็น **ระบบฟื้นฟูตัวเอง** ที่:

1. ตรวจพบปัญหาของผู้ให้บริการ (วงจรเปิด ช่วงพักการเชื่อมต่อ การระงับการใช้งาน และคำเตือนโควตา)
2. สร้าง **การดำเนินการที่แนะนำ** เพื่อแก้ไขปัญหาเหล่านั้น
3. เลือก **ดำเนินการโดยอัตโนมัติ** สำหรับการดำเนินการที่มีความเสี่ยงต่ำได้

### ประเภทปัญหาที่ตรวจพบ

| ประเภทปัญหา                  | ระดับความรุนแรง | ตัวอย่างเงื่อนไข                               |
| ---------------------------- | --------------- | ---------------------------------------------- |
| `provider_circuit_open`      | วิกฤต           | ตัวตัดวงจรเปิดหลังจากล้มเหลว 5 ครั้ง           |
| `provider_circuit_half_open` | คำเตือน         | วงจรกำลังทดสอบการกู้คืน                        |
| `connection_cooldown`        | คำเตือน         | การเชื่อมต่ออยู่ในช่วงพักหลังได้รับ 429        |
| `stale_connection_error`     | คำเตือน         | การรีเฟรชล่าสุดล้มเหลวเมื่อกว่า 30 นาทีที่แล้ว |
| `terminal_connection_error`  | วิกฤต           | OAuth ถูกเพิกถอน หรือคีย์ไม่ถูกต้อง            |
| `inactive_connection`        | ข้อมูล          | การเชื่อมต่อถูกปิดใช้งานในการตั้งค่า           |
| `model_lockout`              | คำเตือน         | โมเดลที่ระบุถูกกักกัน                          |
| `quota_monitor_warning`      | คำเตือน         | ใช้โควตาไปแล้ว 80% ขึ้นไป                      |

### ประเภทการดำเนินการที่สร้างขึ้น

| การดำเนินการ                   | ความเสี่ยง | คำอธิบาย                                |
| ------------------------------ | ---------- | --------------------------------------- |
| `clear_provider_breaker`       | ปานกลาง    | รีเซ็ตตัวตัดวงจรกลับเป็นสถานะปิด        |
| `clear_connection_cooldown`    | ต่ำ        | ยกเลิกช่วงพักของการเชื่อมต่อ            |
| `clear_stale_connection_error` | ต่ำ        | ล้างแฟล็กข้อผิดพลาดที่ค้างอยู่          |
| `clear_model_lockout`          | ต่ำ        | เปิดใช้งานโมเดลที่ถูกกักกันอีกครั้ง     |
| `reactivate_connection`        | ปานกลาง    | เปิดใช้งานการเชื่อมต่อที่ถูกปิดอีกครั้ง |
| `deactivate_connection`        | สูง        | ปิดใช้งานการเชื่อมต่อที่มีปัญหา         |

### API

> **ไม่มี REST endpoint** ปัญหาที่ระบบควบคุมอัตโนมัติตรวจพบสามารถเข้าถึงได้ผ่านเครื่องมือ MCP `observability_snapshot` หรือแดชบอร์ด ระบบควบคุมอัตโนมัติทำงานอยู่ภายใน โดยกำหนดค่าพฤติกรรมผ่านฐานข้อมูลการตั้งค่า (ฟิลด์ `autopilotMode` ของแต่ละการเชื่อมต่อ) ไม่ใช่ตัวแปรสภาพแวดล้อม — การใช้ `grep -rn` เพื่อค้นหาตัวแปรสภาพแวดล้อมสำหรับโหมดระบบควบคุมอัตโนมัติจะไม่พบผลลัพธ์ใดๆ

### โหมดระบบควบคุมอัตโนมัติ

ระบบควบคุมอัตโนมัติทำงานใน **โหมดดำเนินการด้วยตนเอง** โดยค่าเริ่มต้น โดยจะตรวจพบปัญหาและสร้างการดำเนินการที่แนะนำ แต่จะไม่นำไปใช้โดยอัตโนมัติ สามารถนำการดำเนินการไปใช้ผ่านแดชบอร์ดได้

---

## ระบบควบคุมสถานะคอมโบอัตโนมัติ

`comboHealthAutopilot.ts` เป็นระบบที่เทียบเท่ากับระบบควบคุมผู้ให้บริการอัตโนมัติ แต่ทำงาน **เฉพาะสำหรับคอมโบ** โดยระบบจะ:

- ตรวจพบคอมโบที่มีสถานะผิดปกติ
- แนะนำการจัดลำดับเป้าหมายใหม่
- แนะนำให้ปิดใช้งานเป้าหมายที่เสียหาย
- ลบเป้าหมายที่ใช้งานไม่ได้ออกโดยอัตโนมัติหลังจากล้มเหลว N ครั้ง

### ตัวอย่างปัญหาของคอมโบ

```
คอมโบ "always-on" (กลยุทธ์ตามลำดับความสำคัญ)
├─ เป้าหมาย 1: openai/gpt-5 (ปกติ)
├─ เป้าหมาย 2: anthropic/claude-opus-4-6 (⚠️ โมเดลถูกระงับจนถึง 14:00)
└─ เป้าหมาย 3: kiro/claude-sonnet-4-5 (ปกติ)

การดำเนินการที่แนะนำ: จัดลำดับใหม่ — ย้าย kiro ไว้เหนือ anthropic จนกว่าการระงับจะสิ้นสุด
```

---

## ตัวตรวจสอบโควตา

`observability.ts` เปิดเผย **ตัวตรวจสอบโควตาแยกตามเซสชัน** สำหรับผู้ให้บริการแบบสมัครสมาชิก (Claude Code, Codex, GitHub Copilot):

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

### ความหมายของสถานะ

| สถานะ       | เมื่อใด                  | การดำเนินการของ UI                                      |
| ----------- | ------------------------ | ------------------------------------------------------- |
| `starting`  | กำลังสำรวจข้อมูลครั้งแรก | แสดงตัวหมุน                                             |
| `idle`      | ไม่มีกิจกรรมล่าสุด       | ซ่อนจากแดชบอร์ด                                         |
| `healthy`   | มีโควตาเหลือมากกว่า 50%  | แสดงจุดสีเขียว                                          |
| `warning`   | มีโควตาเหลือน้อยกว่า 50% | แสดงการแจ้งเตือนสีเหลือง                                |
| `exhausted` | โควตาเท่ากับ 0%          | แสดงบล็อกสีแดง และกำหนดเส้นทางไปยังผู้ให้บริการรายถัดไป |
| `error`     | การสำรวจข้อมูลล้มเหลว    | แสดงจุดสีแดง และลองอีกครั้งในเร็วๆ นี้                  |

### API

> **ไม่มี REST endpoint** ข้อมูลตัวตรวจสอบโควตาสามารถเข้าถึงได้ผ่านเครื่องมือ MCP `observability_snapshot` หรือแดชบอร์ด

---

## สแนปช็อตความสามารถในการสังเกตการณ์

เครื่องมือ MCP `observability_snapshot` ส่งคืน **สแนปช็อตระบบที่สมบูรณ์** สำหรับเอเจนต์ AI:

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
  "quotaMonitors": {/* ดูด้านบน */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

เอเจนต์ใช้ข้อมูลนี้เพื่อ **ตัดสินใจเกี่ยวกับการกำหนดเส้นทาง** — ตัวอย่างเช่น "หากวงจรของ openai เปิดอยู่ ให้กำหนดเส้นทางไปยัง anthropic ก่อน"

---

## การตรวจสอบสถานะโทเค็น

ผู้ให้บริการ OAuth (Claude Code, GitHub Copilot, Cursor) จำเป็นต้อง **รีเฟรชโทเค็นเป็นระยะ** `src/lib/tokenHealthCheck.ts` เรียกใช้ตัวกำหนดตารางเวลาที่ทำงานอยู่เบื้องหลัง:

- **รอบการตรวจสอบ**: ทุก 60 วินาที (ตรวจสอบตาม `TICK_MS = 60 * 1000` ที่ `src/lib/tokenHealthCheck.ts:30`)
- **ช่วงเวลาตรวจสอบสถานะต่อการเชื่อมต่อ**: ค่าเริ่มต้นคือ 60 นาที (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); สามารถกำหนดค่าได้ผ่านฐานข้อมูลการตั้งค่า
- **การรีเฟรชล่วงหน้าเมื่อพบ 401**: จัดการโดย interceptor ของแต่ละการเชื่อมต่อ

### สถานะโทเค็น

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

### การกำหนดค่า

การกำหนดค่าการตรวจสอบสถานะโทเค็นได้รับการจัดการภายในโดย `tokenHealthCheck.ts`

### สถานะโทเค็น

> **ไม่มี REST endpoint** ข้อมูลสถานะโทเค็นพร้อมใช้งานผ่านแดชบอร์ดหรือเครื่องมือ MCP `observability_snapshot`

---

## การแจ้งเตือน

### ช่องทางในตัว

OmniRoute รองรับ **ช่องทางการแจ้งเตือน 3 ช่องทาง**:

| ช่องทาง          | การตั้งค่า         | กรณีการใช้งาน                        |
| ---------------- | ------------------ | ------------------------------------ |
| แบนเนอร์แดชบอร์ด | เปิดใช้งานตลอดเวลา | การแจ้งเตือนภายในแอป                 |
| Webhook          | กำหนดค่า URL       | Slack, Discord, PagerDuty            |
| บันทึกเหตุการณ์  | ค่าเริ่มต้น        | สำหรับการรวมบันทึกเหตุการณ์จากภายนอก |

### การกำหนดค่า Webhook

> **หมายเหตุ:** การกำหนดค่าการแจ้งเตือนผ่าน Webhook จัดการผ่านหน้าการตั้งค่าของแดชบอร์ด โปรดดู UI การตั้งค่าสำหรับ URL ของ Webhook การกรองเหตุการณ์ และการปรับแต่ง payload

### ประเภทการแจ้งเตือน

| การแจ้งเตือน                 | เมื่อ                                                   | ระดับความรุนแรงเริ่มต้น |
| ---------------------------- | ------------------------------------------------------- | ----------------------- |
| `provider_circuit_open`      | วงจรเปิด                                                | วิกฤต                   |
| `provider_circuit_half_open` | วงจรกำลังทดสอบการกู้คืน                                 | ข้อมูล                  |
| `quota_warning`              | โควตาอยู่ที่ 80% ขึ้นไป                                 | คำเตือน                 |
| `quota_exhausted`            | โควตาอยู่ที่ 100%                                       | วิกฤต                   |
| `token_refresh_failed`       | การรีเฟรชล้มเหลวติดต่อกัน 3 ครั้งขึ้นไป                 | คำเตือน                 |
| `token_expired`              | โทเค็นเลยเวลาหมดอายุแล้ว                                | วิกฤต                   |
| `combo_target_unhealthy`     | เป้าหมายแบบ Combo อยู่ในช่วงพักเป็นเวลา 1 ชั่วโมงขึ้นไป | คำเตือน                 |
| `db_integrity_warning`       | การละเมิด FK > 0                                        | คำเตือน                 |
| `heap_pressure`              | การใช้งานฮีป > 80% ของเกณฑ์                             | คำเตือน                 |

---

## เมตริกประสิทธิภาพ

### เมตริกที่ติดตาม

| เมตริก                  | ประเภท    | แหล่งที่มา                      |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | ตัวนับ    | `services/usage.ts`             |
| `request_latency_ms`    | ฮิสโตแกรม | `services/usage.ts`             |
| `tokens_consumed`       | ตัวนับ    | `services/usage.ts`             |
| `cost_usd`              | ตัวนับ    | `services/usage.ts`             |
| `provider_errors`       | ตัวนับ    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ตัวนับ    | `services/resilience.ts`        |
| `cache_hits`            | ตัวนับ    | `services/signatureCache.ts`    |
| `compression_savings`   | ฮิสโตแกรม | `services/compression/stats.ts` |
| `quota_used`            | เกจ       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | เกจ       | `observability.ts`              |

### เปอร์เซ็นไทล์ของเวลาแฝง (p50/p95/p99)

> **ไม่มี REST endpoint** ข้อมูลเปอร์เซ็นไทล์ของเวลาแฝงมีให้ใช้งานผ่านหน้าแดชบอร์ด `/dashboard/health` โดยมีแผนรองรับการส่งออกไปยัง Prometheus/OpenTelemetry ใน v3.9

### การส่งออกไปยัง Prometheus / OpenTelemetry (ระยะที่ 2)

มีแผนสำหรับ v3.9: รองรับการส่งออกโดยตรงไปยัง Prometheus, OpenTelemetry และ Datadog

ในระหว่างนี้ ให้ดึงข้อมูลจาก `/api/monitoring/health` ด้วยระบบตรวจสอบที่ทำงานผ่าน HTTP ใดก็ได้ (Prometheus blackbox exporter, Datadog HTTP check เป็นต้น)

---

## แนวทางการตั้งค่าการแจ้งเตือน

### Slack

> **หมายเหตุ:** การแจ้งเตือนผ่าน Webhook กำหนดค่าได้จากหน้า Settings ของแดชบอร์ด — ไม่มีตัวแปรสภาพแวดล้อมสำหรับ Webhook โดยเฉพาะ (`grep -rn` ไม่พบผลลัพธ์) โปรดดู UI ของ Settings สำหรับ URL ของ Webhook, การกรองเหตุการณ์ และการปรับแต่งเพย์โหลด

### Discord

> การแจ้งเตือนผ่าน Webhook ใช้ขั้นตอนใน UI ของ Settings แบบเดียวกับ Slack โดย Discord รองรับโครงสร้างเพย์โหลด JSON แบบเดียวกัน

### PagerDuty

> การแจ้งเตือนผ่าน Webhook ใช้ขั้นตอนใน UI ของ Settings แบบเดียวกัน โดยคีย์การกำหนดเส้นทางของ PagerDuty Events API v2 จะกำหนดค่าใน UI ของ Settings

### Webhook แบบกำหนดเอง (JSON)

> สามารถใช้ HTTP endpoint ใดก็ได้ที่รองรับ POST พร้อมเนื้อหา JSON โดยกำหนดค่า URL ใน UI ของ Settings

---

## การกำหนดค่าแดชบอร์ด

### ปรับแต่งแดชบอร์ดสถานะระบบ

สร้างไฟล์ `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ปักหมุดผู้ให้บริการไว้ด้านบน

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## การแก้ไขปัญหา

### "ผู้ให้บริการแจ้งว่าสถานะปกติ แต่คำขอล้มเหลว"

1. ตรวจสอบ **ปัญหาของ autopilot** — โมเดลอาจถูกล็อกไม่ให้ใช้งาน
2. ดู **ข้อผิดพลาดล่าสุด** สำหรับคลาสข้อผิดพลาดที่ระบุ
3. ลองใช้ **การทดสอบการเชื่อมต่อ** ในการ์ดของผู้ให้บริการ
4. ตรวจสอบว่าผู้ให้บริการ **ถูกจำกัดอัตราที่ต้นทาง** หรือไม่ (ไม่สามารถมองเห็นได้จากระบบภายใน)

### "โควตาแสดงว่าสถานะปกติ แต่พบ 429"

- 429 หมายความว่าผู้ให้บริการระบุว่าคุณใช้โควตาหมดแล้ว
- การติดตามโควตาของ OmniRoute อาจเป็นข้อมูล **ล้าสมัย** — ข้อมูลจากผู้ให้บริการต้นทางถือเป็นข้อมูลจริง
- ข้อมูลโควตาจะรีเฟรชโดยอัตโนมัติผ่านตัวตรวจสอบโควตาภายใน

### "Combo ล้มเหลว แต่เป้าหมายทั้งหมดดูเหมือนมีสถานะปกติ"

- ตรวจสอบแดชบอร์ด **สถานะของ combo** เพื่อดูปัญหาการจัดลำดับเป้าหมาย
- ดู **เหตุการณ์ fallback** — combo อาจลองใช้ตัวเลือกทั้งหมดเร็วเกินไป
- ตรวจสอบว่า **กลยุทธ์** ตรงกับกรณีการใช้งานของคุณ (priority เทียบกับ round-robin เทียบกับ auto)

### "การตรวจสอบสถานะฐานข้อมูลล้มเหลว"

- เรียกใช้ `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- หากได้ผลลัพธ์เป็น "ok" — เป็นการแจ้งเตือนผิดพลาด เนื่องจากการตรวจสอบสถานะเข้มงวดเกินไป
- หากได้ผลลัพธ์อื่น — **หยุด OmniRoute** และทำตาม[คู่มือการกู้คืนจากความเสียหาย](./DATABASE_GUIDE.md#disaster-recovery)

### "แรงกดดันต่อฮีปหน่วยความจำอยู่ในระดับวิกฤต"

```bash
# ตรวจสอบฮีปปัจจุบัน
node -e "console.log(process.memoryUsage())"

# เรียกใช้ GC ด้วยตนเอง (หากใช้ --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ลดจำนวนคำขอที่ทำงานพร้อมกัน (กำหนดค่าผ่านหน้า Settings ของแดชบอร์ด ไม่ใช่ตัวแปรสภาพแวดล้อม)
# ไม่มีตัวแปรสภาพแวดล้อม `MAX_CONCURRENT_REQUESTS` — ให้กำหนดค่าใน Settings → Concurrency
```

---

## ดูเพิ่มเติม

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — การติดตามการใช้งานและค่าใช้จ่าย
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — สคีมาฐานข้อมูลและสถานะการทำงาน
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — สถานะการทำงานของพร็อกซี (แคชแยกต่างหาก)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — สถาปัตยกรรมระบบ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — รายละเอียดวงจรตัดไฟ
- ซอร์ส: `src/lib/monitoring/` (4 ไฟล์, 2121 บรรทัดโค้ด)
