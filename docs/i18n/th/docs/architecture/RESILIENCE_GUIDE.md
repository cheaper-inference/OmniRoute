# Resilience Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute มีกลไกความยืดหยุ่นที่แตกต่างกันสามประการแต่เกี่ยวข้องกัน แต่ละคนมีขอบเขตและวัตถุประสงค์ที่แตกต่างกัน แยกพวกมันออกจากกันเมื่อทำการดีบักพฤติกรรมการกำหนดเส้นทาง

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> ที่มา: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **ลำดับความสำคัญของ Env-vs-dashboard สำหรับการสลับความยืดหยุ่น** การเลือกรับความยืดหยุ่นในการสลับเริ่มต้นจากสภาพแวดล้อม — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — จัดหาเฉพาะ _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) บูลีนยังคงอยู่ใน `resilienceSettings` (Dashboard →** การตั้งค่า → ความยืดหยุ่น** / `PATCH /api/resilience`, เก็บไว้ใน `key_value`) ชนะค่า env: การทำให้เป็นมาตรฐาน (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) เก็บบูลีนที่เก็บไว้เมื่อใดก็ตามที่มีอยู่ การตั้งค่า env var เป็น `true` ในการปรับใช้ที่แดชบอร์ดบันทึก `false` ไว้แล้ว ดังนั้นจึงไม่เปลี่ยนแปลงอะไรเลย — พลิกสลับเข้า** การตั้งค่า → ความยืดหยุ่น** (หรือล้างช่องที่เก็บไว้) แทน

## 1. Circuit Breaker ระดับผู้ให้บริการ

**ขอบเขต:** ผู้ให้บริการทั้งราย (เช่น `glm`, `openai`, `anthropic`)

**วัตถุประสงค์:** หยุดส่งทราฟฟิกไปยังผู้ให้บริการที่ล้มเหลวซ้ำ ๆ ในระดับอัปสตรีม/บริการ

**ส่วนประกอบการทำงาน:**

- คลาสหลัก: `src/shared/utils/circuitBreaker.ts`
- จุดเชื่อมต่อ (wiring): `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ตรวจสถานะ: `GET /api/monitoring/health`
- API รีเซ็ต: `POST /api/resilience/reset`
- ตัวครอบ (wrappers): `open-sse/services/accountFallback.ts`
- ตารางฐานข้อมูล: `domain_circuit_breakers`

**สถานะ:**

- `CLOSED` — อนุญาตทราฟฟิกตามปกติ
- `DEGRADED` — ยังอนุญาตทราฟฟิกอยู่ แต่ระบบกำลังติดตามความล้มเหลวของผู้ให้บริการที่เพิ่มสูงขึ้น; จะกลับสู่ `CLOSED` เมื่อสำเร็จครบตามจำนวนที่กำหนด เมื่อการทดสอบการเชื่อมต่อผ่าน หรือเมื่อผ่านพ้นช่วงระงับ `OPEN` ที่ยาวที่สุดสำหรับความล้มเหลวชนิดล่าสุด (ค่า `cooldownByKind` ของชนิดนั้น หากไม่มีให้ใช้ `resetTimeout` × `maxBackoffMultiplier` อย่างน้อยหนึ่งรอบคูลดาวน์) โดยไม่มีความล้มเหลวใหม่เกิดขึ้น
- `OPEN` — ผู้ให้บริการถูกบล็อกชั่วคราว; การเราต์แบบ combo จะข้ามไป
- `HALF_OPEN` — หมดเวลารีเซ็ตแล้ว; อนุญาตให้ส่งรีเควสต์สำรวจ (probe)

**ค่าเริ่มต้นที่ปรับแต่งได้ (`open-sse/config/constants.ts` แสดงอยู่ใน Dashboard → Settings → Resilience):**

| Class   | Degraded at       | Opens at         | Reset timeout |
| ------- | ----------------- | ---------------- | ------------- |
| OAuth   | ล้มเหลว 5 ครั้ง   | ล้มเหลว 8 ครั้ง  | 60s           |
| API-key | ล้มเหลว 7 ครั้ง   | ล้มเหลว 12 ครั้ง | 30s           |
| Local   | คำนวณให้อัตโนมัติ | ล้มเหลว 2 ครั้ง  | 15s           |

`degradationThreshold` ควบคุมว่าผู้ให้บริการจะเข้าสู่ `DEGRADED` เมื่อใด; `failureThreshold` ควบคุมว่าเมื่อใดจะเข้าสู่สถานะเปิด (OPEN) และถูกข้าม โปรไฟล์ผู้ให้บริการแบบ Local ยังไม่แสดงในหน้าตั้งค่า Resilience

**รหัสที่ทำให้ทริป:** เฉพาะสถานะระดับผู้ให้บริการ `[408, 500, 502, 503, 504]` ห้ามทริปกับข้อผิดพลาดระดับบัญชี (401/403/429 ส่วนใหญ่ — เหล่านั้นเป็นหน้าที่ของคูลดาวน์หรือการล็อกเอาต์)

**การฟื้นตัวแบบ lazy:** เมื่อ `OPEN` หมดอายุ `getStatus()`, `canExecute()`, `getRetryAfterMs()` จะรีเฟรชสถานะเป็น `HALF_OPEN` การอ่านค่าเหล่านั้น (และความล้มเหลวครั้งถัดไป) จะทำให้ `DEGRADED` ที่ค้างเก่าค่อย ๆ กลับเป็น `CLOSED` ไม่จำเป็นต้องใช้ตัวจับเวลาพื้นหลัง

---

### Provider Cooldown ระดับโกลบอลแบบเลือกเปิดใช้ (window gate)

ชั้นที่สี่ซึ่งเป็นแบบ **opt-in** (`PROVIDER_COOLDOWN_ENABLED` ค่าเริ่มต้น **ปิด**) จะเก็บหน่วยความจำข้ามรีเควสต์ของผู้ให้บริการที่ล้มเหลวไว้ใน `open-sse/services/providerCooldownTracker.ts` ซึ่งการคัดเลือกเป้าหมายของ combo จะนำมาใช้อ้างอิง เพื่อให้รีเควสต์ combo ที่ต่อเนื่องกันหยุดวนซ้ำไปยังผู้ให้บริการที่เพิ่งล้มเหลว รายการระดับผู้ให้บริการจะปฏิบัติตาม window gate ของ `PROVIDER_PROFILES`:

| Profile | trips after (`providerFailureThreshold`) | inside (`providerFailureWindowMs`) | cools for (`providerCooldownMs`) |
| ------- | ---------------------------------------: | ---------------------------------: | -------------------------------: |
| OAuth   |                                     `10` |                            `15min` |                           `5min` |
| API key |                                     `15` |                            `30min` |                          `10min` |

หากต่ำกว่าเกณฑ์ ผู้ให้บริการจะ **ไม่** ถูกถือว่ากำลังคูลดาวน์; ความสำเร็จหนึ่งครั้งจะล้างหน้าต่างเวลานั้น รายการระดับการเชื่อมต่อ (`provider:connectionId`) จะยังคงใช้แบ็กออฟแบบเอ็กซ์โพเนนเชียล `minRetryCooldownMs → maxRetryCooldownMs` แทน การเขียนทับค่า: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`
การป้องกันการถดถอย (regression guard): `tests/unit/provider-cooldown-window-gate.test.ts`

## 2. คูลดาวน์การเชื่อมต่อ

**ขอบเขต:** การเชื่อมต่อ/บัญชี/คีย์ของผู้ให้บริการรายเดียว

**วัตถุประสงค์:** ข้ามคีย์ที่มีปัญหาหนึ่งรายการ ขณะที่การเชื่อมต่ออื่นของผู้ให้บริการรายเดียวกันยังคงให้บริการต่อไป

**การใช้งาน:**

- ทำเครื่องหมายว่าไม่พร้อมใช้งาน: `src/sse/services/auth.ts::markAccountUnavailable()`
- การเลือก: `getProviderCredentials*` ในไฟล์เดียวกัน
- การคำนวณคูลดาวน์: `open-sse/services/accountFallback.ts::checkFallbackError()`
- การตั้งค่า: `src/lib/resilience/settings.ts`

**ฟิลด์ต่อการเชื่อมต่อ:**

- `rateLimitedUntil` — timestamp จนกว่าคูลดาวน์จะหมดอายุ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ตัวนับ exponential backoff

**คูลดาวน์เริ่มต้น:**

- OAuth: 5s
- API-key: 3s
- API-key 429: ให้ความสำคัญกับ upstream `Retry-After`/รีเซ็ต headers/ข้อความรีเซ็ตที่แยกวิเคราะห์ได้
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**ระยะเวลาหน่วงการลองใหม่ต่อผู้ให้บริการ** หน้าแสดงรายละเอียดผู้ให้บริการมี select **Retry delay** (Auto,
15s ถึง 1h) โดยจะบันทึกลงใน
`resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600 ผ่าน `PATCH /api/resilience`) เมื่อข้อผิดพลาดด้าน rate limit ไม่มีคำแนะนำการลองใหม่จาก upstream ค่านี้จะแทนที่ scaled backoff สำหรับผู้ให้บริการ และรีเซ็ต `backoffLevel` เป็น 0
(`open-sse/services/rotationConfig.ts::overrideFor`) ลำดับความสำคัญสำหรับข้อผิดพลาดด้าน rate limit จากสูงสุดไปต่ำสุดคือ: คำแนะนำการลองใหม่จาก upstream, จากนั้น `providerSpecificData.rotationOverrides.rateLimitResetSeconds` ต่อการเชื่อมต่อ, จากนั้นระยะเวลาหน่วงการลองใหม่ต่อผู้ให้บริการ, จากนั้น
env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, และสุดท้าย scaled backoff Auto จะลบฟิลด์นี้ออก มีผลเฉพาะเหตุผล rate-limit เท่านั้น ไม่ส่งผลต่อสถานะ terminal

**ตัวป้องกันฝูงชนแห่กัน (anti-thundering-herd):** ป้องกันไม่ให้ความล้มเหลวที่เกิดขึ้นพร้อมกันขยายคูลดาวน์มากเกินไปหรือเพิ่ม `backoffLevel` ซ้ำสองครั้ง

**429 จากขีดจำกัดการทำงานพร้อมกันจะไม่ไต่ระดับ backoff** `429` ที่ body ระบุขีดจำกัดการทำงานพร้อมกัน ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) หมายความว่าบัญชียังใช้งานได้แต่กำลังทำงานอยู่
`checkFallbackError()` จะส่งคืนเหตุผล `concurrency_limited`: ให้ fail over ไปยังการเชื่อมต่อถัดไปทันที ทำให้การเชื่อมต่อนี้เย็นลงเป็นเวลา `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) หรือใช้คำแนะนำการลองใหม่จาก upstream คงค่า `backoffLevel` เดิม และตั้งค่า `skipProviderBreaker`
หาก body ของโควต้าระบุอย่างชัดเจน จะมีลำดับความสำคัญเหนือกว่า ดังนั้น body ที่ตรงกับรูปแบบโควต้าด้วยจะยังคงได้ผลตัดสินเป็นโควต้า การตรวจจับ: `looksLikeConcurrencyLimit()` ใน `src/shared/utils/classify429.ts`;
ผลตัดสิน: `open-sse/services/accountFallback/concurrencyLimit429.ts` `classify429()` (`FailureKind` ของ breaker) ยังคงไม่เปลี่ยนแปลง และยังอ่าน `rate_limit` สำหรับ body เหล่านี้

**การหยุดชะงักของเนื้อหาในสตรีมจะไม่ทำให้บัญชีเย็นลง** เมื่อ watchdog ตรวจจับการหยุดชะงักของเนื้อหา
(`open-sse/utils/streamHandler.ts`) ยุติการทำงานกับสตรีมที่ไม่ส่งเอาต์พุตจากโมเดลภายในเวลาที่กำหนด
`markAccountUnavailable()` จะบันทึกข้อผิดพลาดไว้ในการเชื่อมต่อ แต่จะไม่ตั้งค่าคูลดาวน์: การหยุดชะงักเป็นของคำขอนั้น โดยส่วนใหญ่มักเกิดจากรอบการให้เหตุผลที่ยาวนานและยังไม่มีเอาต์พุต ผู้ปฏิบัติงานสามารถเลือกเปิดใช้ได้ด้วย `resilienceSettings.streamStallCooldown.enabled`
(ค่าเริ่มต้น `false`)

**สัญญาณเวลาแฝงแบบเลือกเปิดใช้สำหรับการเลือกบัญชี `p2c`** การพยายามที่ถูกส่งออกไปแต่ละครั้งจะบันทึก time-to-first-byte และผลลัพธ์ต่อการเชื่อมต่อ (และต่อการเชื่อมต่อ + โมเดล) ในหน้าต่าง rolling window ในหน่วยความจำ: ตัวอย่าง 20 รายการล่าสุดภายใน 15 นาที
(`open-sse/services/connectionLatencyTracker.ts`, บันทึกจาก `safeLogEvents()` ใน
`src/sse/handlers/chatHelpers.ts`) เมื่อ `resilienceSettings.p2cLatency.weight` มากกว่า
`0` (ช่วง 0-20 ค่าเริ่มต้น `0` = ปิด) `compareP2CConnections()` ใน `src/sse/services/auth.ts` จะเพิ่มคะแนนให้ผู้สมัครแต่ละรายของคู่ได้สูงสุด `weight` คะแนน ครึ่งหนึ่งมาจากเวลาแฝงในรูปอัตราส่วนเทียบกับผู้สมัครที่เร็วกว่า (ช้ากว่าสองเท่าจะได้ครึ่งหนึ่งเต็มจำนวน) และอีกครึ่งหนึ่งมาจากอัตราข้อผิดพลาด rolling window
เงื่อนไขนี้จะมีผลเฉพาะเมื่อผู้สมัครทั้งสองรายมีตัวอย่างอย่างน้อย 3 รายการ เพื่อไม่ลงโทษบัญชีใหม่ และเพดานคะแนนยังคงต่ำกว่าโทษของ quota-blocked และ quota-exhausted ไม่มีการเพิ่ม circuit ของตัวเอง: บัญชีที่ล้มเหลวยังคงได้รับการจัดการโดยชั้น cooldown, lockout และ breaker ตั้งค่าด้วย `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`

**เฟรมการให้เหตุผลจะเริ่มงบประมาณการหยุดชะงักของเนื้อหาใหม่** โมเดลที่ให้เหตุผลอาจใช้เวลาหลายนาทีก่อนโทเค็นที่มองเห็นได้ตัวแรก: Claude สตรีมเฟรม `thinking_delta` ซึ่งข้อความการคิดอาจว่างเปล่า และ Responses API สตรีม reasoning item ทีละรายการ
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) จะรู้จำเฟรมเหล่านี้ และ watchdog จะเริ่มงบประมาณใหม่ในแต่ละเฟรมแทนการยกเลิกรอบการทำงาน เฟรมเหล่านี้ยังไม่ถือเป็นเอาต์พุตจากโมเดล ดังนั้นรอบการทำงานที่จบลงด้วย reasoning เพียงอย่างเดียวยังคงถูกรายงานว่าเป็นค่าว่าง และรอบการทำงานที่หยุด reasoning แล้วส่งเพียง heartbeats จะยังคงทำให้ watchdog ทำงาน

เฟรมไบนารี `reasoningContentEvent` ของ Kiro ที่มี signature ไม่ว่างจะรักษากิจกรรมการให้เหตุผลนี้ผ่าน executor ในรูป delta `reasoning_content` ที่ว่างเปล่า จะไม่มีการส่งต่อ signature ข้อมูลเมทาดาทา เฟรมที่ไม่สมบูรณ์ และ signature ว่างจะไม่เริ่มงบประมาณเนื้อหาใหม่ timeout ของ active-stream ที่เป็นอิสระและการยกเลิกโดยไคลเอ็นต์ยังคงมีผล (`open-sse/executors/kiro/reasoning.ts`)

**สถานะ terminal (ไม่ใช่คูลดาวน์):**

- `banned` — ตั้งค่าโดยการตรวจจับ banned-keyword / account-ban (ดู [BAN_DETECTION](../security/BAN_DETECTION.md)) การปฏิเสธจาก upstream ต่อคำขอ (`request_rejected` เช่น Anthropic OAuth 403 "Request not allowed") จะไม่ตั้งค่านี้: ระบบจะนับแยกตามการเชื่อมต่อและโมเดล และนำโมเดลดังกล่าวออกจาก rotation ด้วยคูลดาวน์ที่เพิ่มขึ้น โดยมีเพดานที่ `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) หรือทำให้การเชื่อมต่อเย็นลงเมื่อไม่ทราบโมเดล — `open-sse/services/requestRejectedStreak.ts`
- `expired` (เปลี่ยนเป็น terminal หลังการลองใหม่ตามจำนวนที่จำกัด — `EXPIRED_RETRY_MAX = 3` พร้อม exponential backoff — เพื่อให้ข้อผิดพลาด OAuth ชั่วคราวสามารถกู้คืนได้เองก่อนที่บัญชีจะถูกปิดใช้งานอย่างถาวร)
- `credits_exhausted`

สิ่งเหล่านี้จะคงอยู่จนกว่าข้อมูลรับรองจะเปลี่ยนแปลง หรือผู้ปฏิบัติงานจะรีเซ็ต สิ่งที่อยู่ในสถานะสิ้นสุดแล้วต้องไม่ถูกเขียนทับด้วยสถานะคูลดาวน์ชั่วคราว

**การกู้คืนแบบ Lazy:** เมื่อพ้นเวลา `rateLimitedUntil` แล้ว การเชื่อมต่อจะกลับมามีสิทธิ์ใช้งานอีกครั้ง เมื่อใช้งานสำเร็จ `clearAccountError()` จะล้างฟิลด์ข้อผิดพลาดทั้งหมด

### กำแพงการใช้งาน Claude OAuth: lane ลำดับความสำคัญต่ำ + การรีเซ็ตขีดจำกัดเซสชัน

**ขอบเขต:** การเชื่อมต่อ Claude subscription (OAuth) หนึ่งรายการ ฟีเจอร์ทั้งสองเป็นแบบ **เลือกเปิดใช้ต่อการเชื่อมต่อ** (Edit connection → ส่วน Claude → `lowPriorityMode` / `autoLimitReset` ใน `providerSpecificData` โดยค่าเริ่มต้นปิดทั้งคู่) และทำงานสอดคล้องกับคำสั่ง `/low-priority` และ `/limit-reset` ของ Claude Code (สัญญาการเชื่อมต่อบันทึกจาก Claude Code 2.1.263)

**การนำไปใช้:**

- state machine + การจัดประเภทการตอบกลับ: `open-sse/services/claudeLowPriority.ts`
- ไคลเอ็นต์สถานะ/การอ้างสิทธิ์การรีเซ็ต: `open-sse/services/claudeLimitReset.ts`
- hook ของ executor (การเพิ่ม header + การลองใหม่ด้วยบัญชีเดิม): `open-sse/executors/base.ts::execute()`
- การคงค่าการเลือกเปิดใช้: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ทริกเกอร์:** กำแพงการใช้งาน 5 ชั่วโมง — `429` ที่ header มี
`anthropic-ratelimit-unified-status: rejected` และเมื่อบัญชีมีสิทธิ์
`anthropic-ratelimit-unified-slow-offer: treatment` จะไม่มีการส่งสิ่งใดก่อนถึง `429` แรกจากกำแพงนี้ ส่วน `429` แบบ burst ที่ไม่มี unified headers จะเข้าสู่เส้นทางคูลดาวน์ปกติ

**lane ลำดับความสำคัญต่ำ** (`lowPriorityMode`):

- เมื่อเกิด `429` จากกำแพง executor จะรับข้อเสนอและลองใหม่ทันทีด้วยบัญชี **เดิม** โดยใช้ `anthropic-usage-limit: slow`; lane จะยังทำงานจนกว่าจะถึงค่า `anthropic-ratelimit-unified-reset` ที่ประกาศไว้ (+ grace period 60 วินาที) และทุกคำขอในช่วงเวลาดังกล่าวจะมี header นี้ `429` ที่ถูกดักไว้จะไม่ไปถึง `handleChatCore` ดังนั้นการเชื่อมต่อจะ **ไม่** ถูกนำไปคูลดาวน์และจะไม่ถูกหมุนเปลี่ยนออก
- `anthropic-ratelimit-unified-slow-status` ในการตอบกลับครั้งถัดไป: `active` / `not_needed` จะคง lane ไว้; `slot_busy` (429) หรือ `529` จะรอตามค่า `anthropic-ratelimit-unified-slow-retry-after` ของเซิร์ฟเวอร์ (ค่าเริ่มต้น 20 วินาที จำกัดช่วง 5–600 วินาที และสุ่ม jitter ±30%) แล้วลองใหม่ โดยมีขอบเขตจาก `anthropic-ratelimit-unified-slow-max-wait` (ค่าเริ่มต้น 20 นาที จำกัดช่วง 1 นาที–6 ชั่วโมง) — เมื่อเกินเวลานี้ lane จะสิ้นสุดลง และช่วงพัก 10 นาทีจะป้องกันการรับข้อเสนอซ้ำ เวลารอยังถูกจำกัดเพิ่มเติมด้วยเวลาที่เหลือของ timeout การเริ่ม upstream ของคำขอนั้นเอง (`resolveFetchStartTimeout` ค่าเริ่มต้น 10 นาที) ลบด้วยเผื่อไว้ 5 วินาที: หากไม่มีการจำกัดนี้ ค่า max-wait เริ่มต้น 20 นาทีจะยาวนานกว่าคำขอ และการ sleep จะถูกยกเลิกกลางคัน ทำให้แสดง `TimeoutError` แทนการสิ้นสุดอย่างเรียบร้อยด้วย `max_wait` + ช่วงพัก
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, การเลื่อนรอบของช่วงเวลา 5 ชั่วโมง หรือ `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ซึ่งจะสิ้นสุดเป็น `extra_usage` ไม่ว่าสถานะใด เนื่องจาก paid overage ครอบคลุมกำแพงนี้แล้ว) จะสิ้นสุด lane; จากนั้นการตอบกลับจะไหลเข้าสู่เส้นทางคูลดาวน์ปกติ `budget_exhausted` จะถูกจดจำจนกว่าจะถึงการรีเซ็ตงบประมาณที่ประกาศไว้ (ไม่เกิน 8 วัน)
- การตรวจสอบกำแพงจะทำงานหลังจากการลองใหม่ภายใน attempt ของ executor เองที่ขับเคลื่อนด้วย `400` (การแก้ไข context, การจำกัด thinking/effort, การเรียนรู้พารามิเตอร์อัตโนมัติ) ดังนั้น `429` จากกำแพงที่ปรากฏเฉพาะในการลองใหม่รายการใดรายการหนึ่งก็ยังถูกดักไว้ แทนที่จะเข้าสู่เส้นทางคูลดาวน์
- สถานะอยู่ในหน่วยความจำแยกตามการเชื่อมต่อ (การรีสตาร์ตจะทำให้ต้องรอ `429` จากกำแพงเพิ่มอีกหนึ่งครั้งเพื่อรับข้อเสนอใหม่)

**การรีเซ็ตขีดจำกัดเซสชัน** (`autoLimitReset` ซึ่งจะลองก่อน lane เมื่อเปิดใช้ทั้งคู่):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → บล็อก `juniper_tide`; เมื่อ `arm: "reset"` และ `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` พร้อม
  `{ "program": "juniper_tide" }` (UUID ขององค์กรจาก `providerSpecificData.organizationUUID` และ fallback จาก bootstrap)
- `result: reset|not_limited` → จะลองคำขอใหม่ด้วยความเร็วเต็ม (ไม่มี slow header)
  `already_used` / `not_offered` จะบันทึก `next_available_at` ไว้ (ค่าเริ่มต้นหนึ่งสัปดาห์); ความล้มเหลวใด ๆ จะหน่วงการลองใหม่ 15 นาที การรีเซ็ตทำได้สัปดาห์ละครั้งและยังนับรวมในขีดจำกัดรายสัปดาห์

การตรวจสอบการถดถอย: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`,
`tests/unit/claude-low-priority-executor.test.ts`

### ใช้การรีเซ็ตแบบธนาคารโดยอัตโนมัติ

**ขอบเขต:** การเชื่อมต่อการสมัครสมาชิก Codex และ Claude (OAuth)**เลือกใช้** : การตั้งค่า `bankedResetAutoApply` ปิดอยู่และอยู่ในโหมด `dry-run` ตามค่าเริ่มต้น (การตั้งค่า → AI → ใช้การรีเซ็ตแบบธนาคารอัตโนมัติ)

**วัตถุประสงค์:** ใช้จ่ายการรีเซ็ตแบบธนาคารด้วยตนเองเมื่อบัญชีถึงขีดจำกัดการใช้งาน แทนที่จะรอให้ผู้ให้บริการกด "แลก" ในหน้าขีดจำกัดของผู้ให้บริการ

| ประเภทสินเชื่อ (`creditTypes`) | สิ่งที่แลกมา                                     | มันวิ่งไปไหน.                                     |
| ------------------------------ | ------------------------------------------------ | ------------------------------------------------- |
| `codexCredits`                 | เครดิตการรีเซ็ต Codex                            | งานพื้นหลังทุกๆ 60 วินาที                         |
| `claudeCredits`                | เงินช่วยเหลือจากธนาคาร Claude (เครดิต `GRANT` )  | งานพื้นหลังทุกๆ 60 วินาที                         |
| `claudeSessionReset`           | การรีเซ็ตขีดจำกัดเซสชันรายสัปดาห์Claude (ด้านบน) | เส้นทางคำขอโดยใช้นโยบายเดียวกันกับการสลับต่อบัญชี |

**การนำไปปฏิบัติ:**

- การตัดสินใจที่แท้จริง (กฎเดียวที่ตั้งไว้สำหรับทั้งสองเส้นทาง): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- งานพื้นหลัง: `src/lib/services/bankedResetAutoApply.ts` (เริ่มใน `src/instrumentation-node.ts`)
- ประตูเส้นทางคำขอ Claude : `src/lib/usage/claudeSessionResetPolicy.ts` ลงทะเบียนผ่าน `setClaudeLimitResetPolicy()` ใน `open-sse/services/claudeLimitReset.ts`
- ประวัติ แคป และเว็บฮุค: `src/lib/usage/bankedResetAudit.ts`
- ประวัติ API: `GET /api/settings/banked-reset-auto/history?limit=50` (รับรองความถูกต้องการจัดการ)

**ลำดับการตัดสินใจ** (กฎข้อแรกที่ล้มเหลวคือเหตุผลที่บันทึกไว้):

1. ปิดคุณสมบัติ ปิดประเภทเครดิต หรือบัญชีอยู่นอกขอบเขต (`accountScope` `all` / `selected` บวกกับแผนที่ `connections` ต่อบัญชี)
2. นอกกำหนดการ UTC ที่เป็นตัวเลือก (`startHourUtc` > `endHourUtc` ข้ามเที่ยงคืน)
3. ขีดจำกัดในช่วง 24 ชั่วโมงที่ผ่านมา: `maxPerAccountPerDay` (1), `maxPerDay` (3) และ `minSpacingMinutes` (30) ระหว่างการไถ่ถอนสองครั้ง
4. ทริกเกอร์: หน้าต่าง `session` หรือ `weekly` ที่มีกำแพง (อ่านจาก `getQuotaWindowStatus().reachedThreshold` ไม่ใช่ `isAccountQuotaExhausted()` ซึ่งจะรายงานเฉพาะบัญชีที่ใช้ทุกหน้าต่าง) หรือเครดิตที่หมดอายุภายใน `expiringCreditHours` (24) ในบัญชีที่ใช้อย่างน้อย `expiringCreditMinUsedPercent` (50)
5. Natural-reset guard: ข้ามเมื่อหน้าต่าง 5 ชั่วโมงที่มีกำแพงรีเซ็ตภายใน `sessionResetGuardMinutes` (90) หรือหน้าต่างรายสัปดาห์ที่มีกำแพงภายใน `weeklyResetGuardHours` (12)
6. ชั้นรายสัปดาห์: ข้ามการรีเซ็ต 5 ชั่วโมงเมื่อรายสัปดาห์ที่เหลือต่ำกว่า `weeklyFloorPercent` (10)
7. โหมด `last-resort` : ข้ามไปในขณะที่บัญชีอื่นที่อยู่ในขอบเขตของผู้ให้บริการรายเดียวกันมี `poolHeadroomPercent` (10) เหลืออยู่ในทั้งสองหน้าต่าง เครดิตที่หมดอายุจะกระตุ้นให้ข้ามสิ่งนี้
8. `dry-run` บันทึกแถวและไม่แลกอะไรเลย แลก `last-resort` และ `eager`

ข้อมูลโควต้าที่หายไปจะไม่ปลดล็อคการแลกรางวัล: ไม่ทราบเวลารีเซ็ตหรือการข้ามการใช้งานรายสัปดาห์

**รีเซ็ตเซสชัน Claude :** เมื่อปิดคุณสมบัติหรือปิด `claudeSessionReset` การสลับ `autoLimitReset` ต่อบัญชีจะตัดสินใจเหมือนเดิมทุกประการ เมื่อเปิดทั้งสองอย่าง คุณลักษณะนี้จะมาแทนที่การสลับต่อบัญชี: บัญชีที่อยู่ในขอบเขตสามารถอ้างสิทธิ์ได้เฉพาะเมื่อนโยบายอนุญาตเท่านั้น และในโหมด `dry-run` จะไม่มีการอ้างสิทธิ์ใดๆ

**ความปลอดภัย:** งานจะแลกได้มากที่สุดหนึ่งเครดิตต่อขีด ตัดสินใจก่อนที่จะแสดงรายการเครดิต (บัญชีที่ข้ามจะไม่ปรากฏในรายการ) ใช้คีย์ idempotency `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` และสำรองบัญชีออกเป็นเวลา 1 ชั่วโมงหลังจากการลงรายการหรือการไถ่ถอนที่ล้มเหลว การตัดสินใจไถ่ถอน ความล้มเหลว และการทดลองดำเนินการทุกครั้งจะถูกเขียนไปยัง `audit_log` (`action: "bankedReset.redeem"` ไม่มีโทเค็นหรือรหัสเครดิต) ตัวพิมพ์ใหญ่จะนับจากแถวเหล่านั้น ดังนั้นจึงสามารถรีสตาร์ทได้ การแลกที่สำเร็จจะทำให้เว็บฮุค `provider.reset_redeemed` เริ่มทำงานเช่นกัน

ตัวป้องกันการถดถอย: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`

### ความสอดคล้องของเซสชัน (#7274)

**ขอบเขต:** เซสชันไคลเอ็นต์หนึ่งรายการ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) จะถูกผูกกับการเชื่อมต่อหนึ่งรายการ สำหรับ **provider ใด ๆ**

**วัตถุประสงค์:** ทำให้ agent แบบหลายรอบ (Claude Code, aider, custom agents) ใช้บัญชีเดิมต่อเนื่องในคำขอต่าง ๆ ลดการสูญเสีย context ข้ามบัญชีและลด `429` จากการเริ่มต้นแบบเย็นซ้ำ ๆ ใน provider ที่มีสถานะเซสชันแยกตามบัญชี

**การนำไปใช้:**

- การแก้ค่า TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- การเลือก/สร้าง pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- การดึง header (ทั่วไป ใช้ได้กับทุก provider): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- ตาราง pin ที่คงอยู่: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- การตั้งค่า: `sessionAffinityTtlMs` (TTL ส่วนกลางในหน่วย ms, `0` ปิดใช้งาน) — `src/lib/db/settings.ts` เปลี่ยนชื่อจาก `codexSessionAffinityTtlMs` ซึ่งใช้เฉพาะ Codex โดย migration `124_generic_session_affinity_ttl.sql` จะนำ TTL ของ Codex ที่เคยกำหนดไว้มาใช้เป็นค่าเริ่มต้นใหม่

ก่อนหน้า #7274, `resolveSessionAffinityTtlMs()` จะหยุดทำงานทันทีด้วยค่า `0` สำหรับทุก provider ยกเว้น `codex` ดังนั้นการตั้งค่า TTL (และ session headers) จึงไม่มีผลกับที่อื่น แม้ว่ากลไก pinning และการดึง header จะไม่ผูกกับ provider อยู่แล้ว การแก้ไขนี้นำ early-return ดังกล่าวออก ทำให้ TTL มีผลกับทุก provider อย่างสม่ำเสมอเมื่อกำหนดค่าทั่วโลกให้มากกว่า `0`

session-affinity headers ทั้งสามรายการจะไม่ถูกส่งต่อไปยัง upstream — executors จะสร้าง upstream headers ของตนเองตั้งแต่ต้น แทนที่จะส่งต่อ client headers ดังนั้นค่านี้จึงยังเป็นเพียงรหัสเชื่อมโยงภายในเท่านั้น

### lease การเชื่อมต่อเซสชันแบบมีการจัดการโดยเฉพาะ экскusive

**ขอบเขต:** ไคลเอนต์/เซสชัน HTTP แบบจัดการที่ทำงานอยู่หนึ่งรายการจะเป็นเจ้าของการเชื่อมต่อ OmniRoute ที่เข้าเกณฑ์หนึ่งรายการ

**วัตถุประสงค์:** จัดให้มีการเป็นเจ้าของการเชื่อมต่อแบบเอกสิทธิ์ที่คงทน สำหรับไคลเอนต์ที่ต้องการขอบเขตการกำหนดเส้นทางแบบเข้มงวดข้ามคำขอ ซึ่งแตกต่างจากความผูกพันกับเซสชันที่เป็นเพียงการต้องการความต่อเนื่องแบบผ่อนปรน:
ลีสแบบเอกสิทธิ์จะคงสถานะวงจรชีวิตไว้ใน SQLite บังคับใช้ความไม่ซ้ำกันทั่วทั้งระบบของเจ้าของที่ทำงานอยู่และการเชื่อมต่อที่ทำงานอยู่ และปฏิเสธเจเนอเรชันที่ล้าสมัยก่อนส่งต่อไปยังผู้ให้บริการ

ฟีเจอร์นี้เปิดใช้แยกตาม API key คีย์แบบจัดการต้องมีสโคป `lease:exclusive` และรายการ `allowedConnections` ที่ระบุไว้อย่างชัดเจนและไม่ว่างเปล่า ไคลเอนต์ HTTP ใด ๆ ก็สามารถใช้จุดปลายทางวงจรชีวิตนี้ได้ โดยไม่จำเป็นต้องระบุชื่อไคลเอนต์, user-agent, ผู้ให้บริการ, วิธี OAuth หรือโมเดล ลีสเป็นเจ้าของการเชื่อมต่อ ไม่ใช่โมเดล ดังนั้นการเปลี่ยนโมเดลจะยังคงการผูกนี้ไว้ตราบเท่าที่การเชื่อมต่อยังคงเข้าเกณฑ์ตามปกติ กฎปกติด้านโมเดล โควตา สุขภาพ คูลดาวน์ และรายการอนุญาตยังคงมีผลสูงสุด และอาจเปลี่ยนเจเนอเรชันเดียวกันไปยังการเชื่อมต่ออื่นที่เข้าเกณฑ์และว่างอยู่

วงจรชีวิตคือ `POST /api/v1/session-leases` โดยมีการดำเนินการ JSON เป็น `acquire`, `renew` และ `release`
คำขอ inference แบบจัดการจะส่งค่า `X-OmniRoute-Lease-Owner` แบบทึบและค่า `X-OmniRoute-Lease-Generation` ที่ตรงกันทุกประการ เจ้าของใช้ `vlo_` ตามด้วยอักขระ base64url จำนวน 43 ตัว โดยจะจัดเก็บเฉพาะแฮช SHA-256 เท่านั้น กลไกกั้นก่อนการส่งต่อทุกครั้งยังผูกกับ ID ของ API key ที่ผ่านการยืนยันตัวตนและ ID ของการเชื่อมต่อที่ทำงานอยู่ด้วย ส่วนหัวควบคุมลีสจะถูกนำออกจากบันทึก สแนปช็อตคำขอที่เก็บไว้ และส่วนหัวของตัวดำเนินการ upstream

หากการกำหนดเส้นทางตามปกติมีผู้สมัครแบบจัดการที่เข้าเกณฑ์ แต่ผู้สมัครที่ว่างอยู่ทั้งหมดถูกลีสที่ทำงานอยู่ของบุคคลอื่นครอบครอง OmniRoute จะส่งคืน HTTP `429`, โค้ด `lease-capacity-unavailable`, สถานะ `waiting-for-capacity` และ `Retry-After` ที่มีขอบเขต ซึ่งคำนวณจากเวลาหมดอายุที่เกี่ยวข้องเร็วที่สุด การไม่มีสิทธิ์ที่เข้าเกณฑ์ตามปกติไม่ถือเป็นการแย่งใช้ลีส และยังคงใช้ความหมายของข้อผิดพลาดด้านการกำหนดเส้นทางเดิม

กลไกที่เกี่ยวข้องยังคงแยกจากกัน:

- การครอบครองเซสชัน OAuth เป็นการกระจายแบบผ่อนปรนภายในโปรเซสสำหรับบัญชี OAuth
- เซมาฟอร์ของบัญชีจะมอบสิทธิ์การทำงานพร้อมกันของคำขอ และสิ้นสุดลงเมื่อคำขอเสร็จสมบูรณ์
- ลีสเซสชันแบบเอกสิทธิ์สำหรับเซสชันแบบจัดการคือการเป็นเจ้าของวงจรชีวิตที่คงทนและมีตัวกั้นเจเนอเรชัน

---

## 3. การล็อกโมเดล

**ขอบเขต:** ทริปเปิล provider + connection + model

**ขอบเขตคีย์ตามสถานะ:** สถานะที่ล้มเหลวจะเป็นตัวกำหนดว่าการล็อกจะเขียนไปยังคีย์ใด
(`resolveLockoutScope()` ใน `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — สัญญาณโควตาหรือสิทธิ์การใช้งาน — ล็อก **ตระกูลโควตา**:
  สำหรับ codex จะเป็นขอบเขต `codex` / `spark` ทั้งหมด (โมเดล `gpt-5*` ทุกโมเดลของ
  connection) สำหรับ provider อื่น ๆ จะใช้ `getQuotaScopedModelForProvider()`
- `404` จะล็อกโมเดลพื้นฐาน (`getModelLockKey()` จะจำกัดให้แคบลงเป็น `not_found`)
- สถานะอื่น ๆ — ความล้มเหลวด้านการขนส่ง/เซิร์ฟเวอร์ `5xx` และ `502` ที่ OmniRoute
  สร้างขึ้นเองจากการตรวจสอบคุณภาพ — จะล็อกเฉพาะทูเพิล
  provider/connection/model ที่ **ตรงกันทุกประการ** เท่านั้น สตรีมที่มีปัญหาของโมเดลหนึ่ง
  ไม่ใช่หลักฐานเกี่ยวกับโควตาของบัญชี ก่อนมีกฎนี้ การตอบกลับว่างเปล่าหนึ่งครั้งบน
  `codex/gpt-5.6-luna` จะนำโมเดล `gpt-5*` ทุกโมเดลของ connection นั้นออกจากการกำหนดเส้นทาง
  เป็นเวลา 2–30 นาที (โดยเพิ่มระดับขึ้นเรื่อย ๆ) ทั้งที่โควตาของโมเดลยังไม่ได้รับผลกระทบ
- ตัวเลือก `scope` ที่ caller ระบุอย่างชัดเจนจะมีผลเหนือกว่าเสมอ (Antigravity ส่งค่า `"exact"`)

**วัตถุประสงค์:** หลีกเลี่ยงการปิดใช้งาน connection ทั้งหมดเมื่อมีเพียงโมเดลเดียวที่ไม่พร้อมใช้งานหรือมีโควตาจำกัด

**ตัวอย่าง:**

- provider ที่มีโควตาแยกตามโมเดลและส่งคืน 429
- provider ภายในเครื่องที่ส่งคืน 404 สำหรับโมเดลที่ไม่มีอยู่หนึ่งโมเดล
- ความล้มเหลวด้านสิทธิ์การใช้งานโหมด/โมเดลเฉพาะของ provider (เช่น โหมดของ Grok)

**การใช้งาน:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`

### แดชบอร์ดการพักโมเดล (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

แสดงรายการการล็อกที่กำลังทำงานอยู่พร้อมด้วย: provider, connection, model, เหตุผล, expiresAt ผู้ปฏิบัติงานสามารถเปิดใช้งานโมเดลอีกครั้งด้วยตนเองจากการ์ดนี้

**REST API:**

- `GET /api/resilience/model-cooldowns` — แสดงรายการการล็อกที่กำลังทำงานอยู่
- `DELETE /api/resilience/model-cooldowns` — เปิดใช้งานอีกครั้งด้วยตนเอง Body: `{provider, connection, model}` Auth: management

### ตัวจัดการการพัก

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)

หน้าเดียวสำหรับทุก connection ที่ถูกนำออกจากการกำหนดเส้นทางด้วยเหตุผลชั่วคราว แทนการเปิดหน้า provider แต่ละหน้า โดยจะแสดงรายการการพักของ connection การล็อกโมเดล และสถานะสิ้นสุด สามารถล้างสถานะเหล่านี้แยกตาม connection ตามรายการที่เลือก หรือสำหรับทุก connection ของ provider และแก้ไขกฎการพักที่มีการปรับแต่งบ่อยที่สุด ได้แก่ `streamStallCooldown.enabled` และการพักพื้นฐาน `connectionCooldown` รวมถึงจำนวนขั้นตอนการเพิ่ม backoff สูงสุดของ OAuth / API-key (บันทึกผ่าน `PATCH /api/resilience`) สถานะสิ้นสุด (`banned`, `expired`, `credits_exhausted`) จะแสดงในรายการ แต่จะไม่ถูกล้างจากที่นี่

การ์ด **กฎการพักสำหรับข้อผิดพลาด** ในหน้าเดียวกันใช้แก้ไขกฎข้อผิดพลาดของผู้ปฏิบัติงาน (`settings.providerErrorRules`) และค่าเริ่มต้นแบบ catch-all ราย provider (`settings.providerErrorDefaults`) ผ่าน `PATCH /api/settings` — ดูหัวข้อ "กฎที่ผู้ปฏิบัติงานประกาศ" ภายใต้ §7 สำหรับวิธีที่กฎเหล่านี้จับคู่ ระยะเวลาคือค่าเริ่มต้น (ไม่มีการพักที่ระบุอย่างชัดเจน), 30 นาที, 1 ชั่วโมง, 5 ชั่วโมง, 24 ชั่วโมง หรือกำหนดเองตั้งแต่ 1 ถึง 43,200 นาที (30 วัน)

**REST API** (`src/lib/resilience/cooldownManager.ts`, auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — connection พร้อมสถานะ เวลาการพักที่เหลือ ระดับ backoff ประเภทข้อผิดพลาดล่าสุด และการล็อกโมเดล (ไม่มีข้อมูลรับรอง)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` หรือ `{all: true, provider?}`; ส่งคืน `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI การตั้งค่าการล็อกโมเดล + การกู้คืนด้วยการลดระดับเมื่อสำเร็จ (v3.8.23)

การล็อกโมเดลเปลี่ยนจากพฤติกรรมที่เปิดใช้งานตลอดเวลาและกำหนดค่าตายตัวในโค้ด มาเป็นฟีเจอร์ที่กำหนดค่าได้อย่างสมบูรณ์และเลือกเปิดใช้งานได้ พร้อมการกู้คืนแบบซ่อมแซมตัวเอง

**การ์ดการตั้งค่า:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)
การ์ดนี้ **แตกต่าง** จาก `ModelCooldownsCard` แบบอ่านอย่างเดียวด้านบน (ซึ่งใช้เพียง
_แสดงรายการ_ การล็อกที่กำลังทำงานอยู่) — การ์ดใหม่นี้ใช้_กำหนดค่าพารามิเตอร์_ ค่าเริ่มต้นอยู่ใน
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| การตั้งค่า              | ค่าเริ่มต้น                      | ความหมาย                                                                  |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `enabled`               | `false`                          | สวิตช์หลัก — การล็อกโมเดล **ปิดใช้งานตามค่าเริ่มต้น**                     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | สถานะจาก upstream ที่นับเป็นความล้มเหลหระดับโมเดล                         |
| `baseCooldownMs`        | `120_000` (120 s)                | ระยะเวลาการล็อกเริ่มต้นสำหรับความล้มเหลวครั้งแรก                          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | ขีดจำกัดของระยะเวลาการพักที่เพิ่มระดับแล้ว                                |
| `maxBackoffSteps`       | `10`                             | จำนวนขั้นตอนสูงสุดของการเพิ่มระดับแบบ exponential backoff                 |
| `useExponentialBackoff` | `true`                           | กำหนดว่าจะเพิ่มระยะเวลาการพักแบบเลขชี้กำลังเมื่อเกิดความล้มเหลวซ้ำหรือไม่ |

การตั้งค่าจะคงอยู่ผ่าน settings store ปกติและตรวจสอบความถูกต้องผ่าน resilience settings schema การ์ดจะจำกัดค่า `baseCooldownMs`/`maxCooldownMs` (โดย `maxCooldownMs ≥ baseCooldownMs`) และ `maxBackoffSteps`

**การกู้คืนด้วยการลดระดับเมื่อสำเร็จ:** การกู้คืนไม่ได้อาศัยเพียงการหมดเวลาของตัวจับเวลา การตอบกลับที่ปกติจะลดจำนวนความล้มเหลวของโมเดลลง ทำให้โมเดลที่กลับมาทำงานได้ระหว่างช่วงเวลานั้นหยุดการเพิ่มระดับ (และถูกล้าง) ก่อนที่ตัวจับเวลาจะหมด เมื่อเป้าหมาย combo สำเร็จ `open-sse/services/combo.ts` จะเรียก `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) ซึ่งจะ **หาร** ค่า `failureCount` ที่จัดเก็บไว้ลงครึ่งหนึ่ง (`Math.floor(failureCount / 2)`); เมื่อค่าลดลงถึง `0` รายการการล็อกจะถูกลบออกทั้งหมด เมธอดคู่กันคือ `recordModelLockoutFailure()` ซึ่งจะเพิ่มจำนวน (และเพิ่มระดับระยะเวลาการพัก) เมื่อเกิดความล้มเหลวภายในช่วงเวลาการเพิ่มระดับ การลดระดับเมื่อสำเร็จนี้ทำงานเพิ่มเติมจากการหมดเวลาของตัวจับเวลาตามปกติ — ทั้งสองเส้นทางสามารถเปิดใช้งานโมเดลอีกครั้งได้

**สถานะ:** lockout ถูกเก็บไว้ **ในหน่วยความจำ** (เป็น `Map` แยกตามโปรเซสของ
`ModelLockoutEntry` โดยใช้ `provider:connectionId:model` เป็นคีย์ ส่วน lock ที่มีขอบเขต
ตรงกันทุกประการใช้ `provider:connectionId:exact:model`) และจะไม่ถูกบันทึกลงใน
DB — ข้อมูลเหล่านี้จะสูญหายเมื่อรีสตาร์ต ระบบจะบันทึก _การตั้งค่า_ ไว้ แต่
_สถานะ_ lockout ที่กำลังทำงานอยู่เป็นข้อมูลชั่วคราว

---

## 4. การควบคุมการทำงานพร้อมกันแบบแบ่งโควตา (v3.8.36)

บัญชีแบบสมัครสมาชิก (GLM, MiniMax ฯลฯ) มักยอมรับคำขอพร้อมกันเพียงประมาณ 1–3
รายการเท่านั้น การส่งคำขอเกินจำนวนดังกล่าวจะทำให้เกิด 429 และช่วง cooldown
ปัญหานี้รุนแรงเป็นพิเศษกับคอมโบแบบ **quota-share** (`qtSd/…`) ซึ่งคีย์ API
หลายรายการใช้บัญชี upstream เดียวกัน มีสามชั้นที่ช่วยป้องกันไม่ให้บัญชีที่ใช้ร่วมกัน
ถูกรบกวนด้วยคำขอจำนวนมากเกินไป

### ขีดจำกัดการทำงานพร้อมกันต่อการเชื่อมต่อ (`max_concurrent`)

การเชื่อมต่อของผู้ให้บริการแต่ละรายการสามารถกำหนดเพดาน `max_concurrent` ได้
(`provider_connections.max_concurrent` ซึ่งตั้งค่าได้ในหน้าต่างการเชื่อมต่อ / API / DB)
เว้นว่างไว้หากไม่ต้องการจำกัด ค่านี้เป็นปุ่มควบคุมเดียวที่ขับเคลื่อนชั้นการจัดลำดับ
คำขอด้านล่าง — ตั้งค่าให้ตรงกับจำนวนการทำงานพร้อมกันจริงของบัญชี (เช่น GLM ประมาณ 1, MiniMax ประมาณ 2)

### ขีดจำกัดการทำงานพร้อมกันต่อโมเดล (`modelConcurrency`)

การเชื่อมต่อสามารถกำหนดเพดานการทำงานพร้อมกันที่แน่นอนสำหรับแต่ละโมเดลเพิ่มเติมได้
ภายในแมป `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

ตั้งค่าได้ในหน้าต่างการเชื่อมต่อ (**Rate limit overrides → Per-model
concurrency caps** โดยใส่ `model=cap` หนึ่งรายการต่อบรรทัด) หรือผ่าน
`PATCH /api/providers/[id]` โดยใช้โครงสร้าง JSON เดียวกัน ความหมายของคีย์มีดังนี้:

- **ระดับการเชื่อมต่อเทียบกับเฉพาะโมเดล:** `maxConcurrent` ยังคงเป็นเพดานร่วม
  สำหรับการเชื่อมต่อทั้งหมด เมื่อใช้ทั้งสองแบบ ระบบจะขอสิทธิ์ผ่านทั้งสองเกต
  แบบอะตอมมิกใน composite gate เดียวกัน
  (`global → provider → account → model`) โดยพฤติกรรมที่มีผลจริงจะใช้ขีดจำกัด
  ที่เข้มงวดกว่าซึ่งเกี่ยวข้อง
- **ตรงกับคีย์โมเดลแบบตรงตัว:** คีย์ต้องเป็นสตริงโมเดลที่ส่งให้ executor
  หลังการแก้เส้นทาง — โดยปกติคือรหัสโมเดล upstream แบบสั้น
  (`glm-5`) ไม่ใช่ alias `provider/model` ฝั่งไคลเอ็นต์ (`zai/glm-5` จะไม่ตรงกับ
  `glm-5`) ค่าต่าง ๆ ต้องเป็นเพดานจำนวนคำขอพร้อมกันที่เป็นจำนวนเต็มบวก
- **การจัดคิวภายในเครื่อง ไม่มีการค้นหา:** คำขอส่วนเกินจะถูกจัดคิวภายในเครื่อง
  โดยใช้ความหมายเดิมของคิว/timeout (ข้อผิดพลาดในการรับคำขอแบบมีประเภท
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`) OmniRoute จะไม่ค้นหาหรืออนุมาน
  นโยบายของ upstream แต่จะบังคับใช้เพดานที่ผู้ดูแลกำหนดไว้อย่างตรงตัว
  เกตของโมเดลที่เต็มจะไม่ปิดใช้งานผู้ให้บริการ และไม่สร้างการล็อกโมเดลแบบถาวร
  พฤติกรรม 429/cooldown/fallback จาก upstream ยังคงเป็นกลไกสำรองเมื่อเกิดข้อผิดพลาด
- **ขอบเขตต่อการเชื่อมต่อและต่อโพรเซส:** ขีดจำกัดมีผลแยกตามการเชื่อมต่อในฐานข้อมูล
  และเก็บไว้ในหน่วยความจำ ดังนั้นการเชื่อมต่อสองรายการที่ใช้คีย์ API upstream เดียวกัน
  จะไม่ประสานงานกัน
- **ไม่ได้กำหนดหมายถึงไม่เปลี่ยนแปลง:** การไม่ใส่แมป (หรือปล่อยช่องในแดชบอร์ดว่าง)
  จะไม่เพิ่มเกตของโมเดล ตัวอย่างการกำหนดค่าโดยไม่ประกาศขีดจำกัดสากลสำหรับผู้ให้บริการ:

```text
glm-5=1
glm-4.7=3
```

### การจัดลำดับคำขอของ quota-share

เมื่อการส่งคำขอแบบ quota-share เลือกการเชื่อมต่อที่กำหนดค่า
`max_concurrent` เป็นค่าบวก คำขอพร้อมกันไปยัง **บัญชีนั้น** จะถูกจัดลำดับ
ผ่าน semaphore ต่อการเชื่อมต่อ (คีย์ `qsconn:<connectionId>`): คำขอส่วนเกินจะ
**รออยู่ในคิว** แทนที่จะส่งคำขอจำนวนมากไปยังบัญชี ระบบเป็นแบบ **fail-open** —
หากคิวเต็มหรือ timeout ระบบจะดำเนินการต่อโดยไม่ใช้สล็อต แทนที่จะปฏิเสธคำขอที่สามารถ
ส่งได้ การตั้งค่านี้อยู่ที่ **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled` ค่าเริ่มต้น
เป็น on) หากไม่มีการกำหนดเพดาน `max_concurrent` พฤติกรรมจะไม่เปลี่ยนแปลง

> เกตการกำหนดเส้นทาง quota-share (`selectQuotaShareTarget`, DRR + P2C) เองก็เป็น
> แบบ fail-open และเพียง _ลดลำดับความสำคัญ_ ของการเชื่อมต่อที่ถึงเพดานแล้วเท่านั้น —
> หากมีพูลที่มีการเชื่อมต่อเดียว เกตนี้จะไม่สามารถจำกัดแบบเข้มงวดได้ ดังนั้น semaphore
> นี้จึงเป็นสิ่งที่ควบคุมคำขอจำนวนมากเกินไปได้จริง

### การลองใหม่โดยคำนึงถึง cooldown ของคอมโบ

สำหรับกลยุทธ์คอมโบทุกแบบ (เมื่อเปิดใช้งาน) หากคำขอจะทำให้เกิด 429
เนื่องจาก cooldown ชั่วคราวระยะสั้น ระบบจะรอให้ช่วงดังกล่าวสิ้นสุดแล้วส่งคำขอใหม่
แทนที่จะส่งคืน 429 — ซึ่งครอบคลุมช่วงเวลา TPM/RPM แบบคลาส Gemini (retry-after
ประมาณ 60 วินาที) บนคอมโบหลายโมเดล เช่น เป้าหมายทั้งสองรายการของคอมโบ 2 โมเดล
ถูกจำกัดอัตราต่อโมเดล การทำงานนี้อยู่ภายใต้ `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ใน **Settings → Resilience**
ระบบจะไม่รอเมื่อเป็น `quota_exhausted` (ถูกล็อกจนถึงเที่ยงคืน) หรือเหตุผลด้าน
การยืนยันตัวตน/ไม่พบ

คอมโบสามารถเลือกไม่ใช้ได้ด้วย `config.comboCooldownWaitEnabled: false` เฉพาะค่า
`false` แบบตรงตัวเท่านั้นที่ปิดการรอร่วมของคอมโบเหล่านี้ (การรอ cooldown หลัง
ส่งคำขอและการรอ circuit-open/model-lock ก่อนส่งคำขอ) รวมถึงการขยายขอบเขตเวลาขั้นต่ำ
ของ timeout ตามงบประมาณการรอ หากไม่ระบุค่าหรือเป็น `true` จะคงใช้นโยบายส่วนกลาง
ไว้ โดย `true` ไม่สามารถเปิดใช้การรอที่ถูกปิดใช้งานทั่วโลกได้
`targetTimeoutMs` ที่กำหนดไว้อย่างชัดเจนยังคงมีผลเหนือกว่า การเลือกไม่ใช้นี้
ไม่เปลี่ยนแปลงการรอก่อนส่งคำขอของ native-Codex turn-pin ซึ่งเป็นคนละส่วนกัน

เกตเดียวกันนี้ครอบคลุมกรณีก่อนส่งคำขอ (#16319): เมื่อเป้าหมายทุกตัวของคอมโบถูกข้าม
ก่อนที่จะมีการลองส่งคำขอ เนื่องจากโมเดลอยู่ในช่วงล็อกชั่วคราวระยะสั้น เส้นทางที่มี
การลองเป็นศูนย์จะรอให้การล็อกสิ้นสุดภายใต้เพดานเดียวกันแล้วส่งคำขอใหม่ แทนที่จะตอบ
`503 ALL_TARGETS_SKIPPED` โดยไม่มีคำแนะนำ หากไม่อนุญาตให้รอ (ถึงเพดาน จำนวนครั้ง
ที่ลองหรือ budget หมด หรือปิดฟีเจอร์) การตอบกลับสุดท้ายจะถูกยกระดับเป็น
`429 rate_limit_error` พร้อม `retry_after` / `reset_at` จากเวลาสิ้นสุดการล็อกชั่วคราว
ที่เร็วที่สุด การล็อกด้านโควตา การยืนยันตัวตน และไม่พบ จะยังคงเป็น 503 โดยไม่มีคำแนะนำ

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. การควบคุมการเข้าคิวของ Request (v3.8.49 · issue #6593)

**ขอบเขต**: คิว rate-limit ภายในเครื่องต่อ provider+connection (`open-sse/services/rateLimitManager.ts`
ซึ่งทำงานบน Bottleneck) อยู่ชั้นถัดลงไปจากกลไกทั้งสามข้างต้น

**`maxWaitMs` กำหนดขอบเขตการรอในคิว; `executionMaxWaitMs` กำหนดขอบเขตการทำงาน**
ทั้งสองถูกแยกออกจากกันโดยเจตนา และไม่มีตัวใดส่งค่าให้กัน

`resilienceSettings.requestQueue.maxWaitMs` คือ **งบประมาณการรอในคิว**: ครอบคลุม
การรอ slot ของ provider แล้วรออยู่ในสถานะ QUEUED และตัวจับเวลาจะถูกล้าง
ทันทีที่งานออกจากสถานะ QUEUED และเริ่มทำงาน
(`rateLimitManager.ts`, `wrappedFn`) request ที่เกินค่านี้จะไม่มีวันไปถึง
upstream ค่าเริ่มต้น 30000ms กำหนดโดย `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ใน `src/lib/resilience/settings.ts` และถูกปักหมุดโดย
`tests/unit/ratelimit-admission-control-6593.test.ts` ดังนั้นการเปลี่ยนค่านี้
จะทำให้ test นั้นเป็นสีแดง แทนที่จะทิ้งย่อหน้านี้ให้ล้าสมัยอย่างเงียบ ๆ

`resilienceSettings.requestQueue.executionMaxWaitMs` คือค่าที่ Bottleneck
รับเข้าไปเป็น `expiration` ของงาน ซึ่งตัวจับเวลาจะเริ่มหลังจาก dispatch เท่านั้น
เป็นตัวกันชนสำรองสำหรับ executor ที่ไม่มี upstream timeout ของตัวเอง
และจะถูกยกขึ้นให้เท่ากับ fetch-start timeout ของ executor เองหากค่านั้นสูงกว่า
จึงไม่สามารถตัด response ที่กำลังทำงานอยู่อย่างสมบูรณ์กลางคันได้ ค่าเริ่มต้น
600000ms (10 นาที)

การส่งงบประมาณคิวเข้าไปใน `expiration` คือสิ่งที่เคยฆ่า gateway แบบ non-incremental
กลางเที่ยวบิน — เพราะพวกมันทำงานเป็นหลายนาทีอย่างถูกต้องก่อนจะได้ byte แรก —
และเป็นเหตุผลที่ expiration จะถูกเปิดเผยเป็น `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ในขณะที่งบประมาณคิวใช้
รหัส queue-timeout แทน สามารถ override ค่าใดก็ได้ผ่าน `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) หรือ dashboard
(**Settings → Resilience**) ทั้งคู่ถูก clamp ให้อยู่ในช่วง 1ms–24h เมื่อถูก normalize

**ลำดับความสำคัญ สำหรับทั้งคู่:** env var จะให้เพียง _ค่าเริ่มต้น_ เท่านั้น ค่า
ที่บันทึกไว้ใน `resilienceSettings.requestQueue` (dashboard / API patch จัดเก็บ
ใน `key_value`) จะชนะ และค่า
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ต่อ connection จะชนะอีกที ดังนั้นการตั้ง
env var บน deployment ที่มีค่าที่บันทึกไว้แล้วจึง
ไม่เปลี่ยนแปลงอะไรเลย — ให้ล้างหรืออัปเดตค่าที่บันทึกไว้แทน

ระยะเวลาอยู่ในคิวถูกจำกัดโดย `maxWaitMs`; `maxQueueDepth` ด้านล่างจำกัดว่า
จะมี caller คิวอยู่พร้อมกันได้กี่ตัว

**การ retry ที่ระบุในบอดี: pacing vs lockout** บอดีของ 429 สามารถระบุเวลารอ
ของตัวเองได้ (Gemini `RetryInfo.retryDelay` ข้อความ "retry after Ns") ซึ่ง
`updateFromResponseBody` จะอ่าน เวลารอที่พอดีกับ `maxWaitMs` ของ connection
คือ pacing: limiter จะล้าง reservoir ของตัวเองตามเวลานั้นและ call ที่คิวอยู่
จะ dispatch เมื่อ reservoir เติมเต็ม เวลารอที่นานกว่า `maxWaitMs` ไม่ใช่สิ่งที่
คิวจะรอครบได้ — Gemini ตอบ quota รายวันที่หมดแล้วด้วย
`retryDelay: "86399s"` `Retry-After` ที่ถูก relay บน 429 ที่สร้างใหม่ (#16528)
ทำให้ fallback engine ล็อกโมเดลตามช่วงเวลานั้นอยู่แล้ว แต่การหยุด limiter
ไปด้วยจะยังทำให้ call ใดก็ตามที่มาถึง key เร็วเกินไป (เช่น หลังการ reset
resilience) หยุดชะงักตลอดทั้ง `maxWaitMs` เมื่อเวลารอเช่นนี้มาจาก detail
แบบ `RetryInfo` ของ Google ที่มีชนิด (provenance แบบ `google_rpc_retry_info`)
และ limiter ของ key นั้น scope อยู่กับโมเดลแล้ว (ดู `getLimiterKey`) 429 จะกลายเป็น
การล็อกโมเดลบน connection นั้นแทน (`lockModelForLongBodyRetry` ใน
`open-sse/services/rateLimitManager/bodyRetryPause.ts` จำกัดสูงสุดที่ 24h) และ
limiter จะไม่ถูกหยุด การเลือก account จะข้ามเมื่อพบการล็อกนั้นผ่าน
`isModelLocked()` เช่นเดียวกับ gate ก่อน dispatch ของ combo สำหรับ target ที่
ปักหมุดกับ connection นั้น บน antigravity ซึ่ง limiter เป็นต่อ quota family
การล็อกจะอยู่บนโมเดลที่แน่นอน เหมือนการล็อก quota อื่น ๆ ของมัน ชื่อที่
client ขอมาก็ถูกล็อกด้วยเมื่อ alias ถูก resolve ไปที่โมเดลนั้น เพราะการตรวจสอบ
เหล่านั้นใช้ชื่อที่ร้องขอ; มันถูกล็อกแบบแน่นอน (`lockExactModel`) ดังนั้น alias
ที่ข้าม quota family ของ antigravity หรือ scope ของ codex จะไม่ล็อกของตัวเอง
คำใบ้แบบ prose, `retryDelay` ที่ไม่มีชนิด หรือ
limiter ที่ใช้ร่วมกันทั้ง connection จะคงการหยุดชั่วคราวไว้ เมื่อ limiter ที่
เส้นทาง 429 เพิ่งสร้างใหม่ถูกหยุดจริง caller ที่เวลาคิวที่เหลือจะสิ้นสุดก่อน
การหยุดจะถูกปฏิเสธทันทีด้วยรหัส queue-timeout (`checkLimiterPause`)
แทนที่จะรอจนครบเวลานั้น; เวลาสิ้นสุดที่บันทึกไว้ถูกยึดก่อนที่ limiter จะถูกสร้าง
ตรงจุดที่ Bottleneck เริ่มนาฬิกา refresh ของมัน และการเปลี่ยนแปลงใด ๆ ของ
reservoir ในภายหลังจะลืมมันไป ครอบคลุมโดย
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` และ
`tests/unit/rate-limit-body-retry-pause.test.ts`

**`maxQueueDepth` — เพดานการยอมรับแบบ opt-in (ใหม่)** `resilienceSettings.requestQueue.maxQueueDepth`
จำกัดว่ามี request ได้สูงสุดเท่าใดที่นั่งคิวอยู่ (ยังไม่ได้ dispatch) สำหรับ
provider+connection เดียวพร้อมกัน เมื่อคิวมี request ครบ `maxQueueDepth`
แล้ว request ใหม่จะถูกปฏิเสธอย่างรวดเร็วด้วย error ที่มีชนิด
`code: "RATE_LIMIT_QUEUE_FULL"` **ก่อน** ที่มันจะไปถึง `limiter.schedule()`
เสียอีก — การปฏิเสธจึงถูกและเกิดก่อนงาน
prompt-compression / translation ขั้นปลายทางใด ๆ สำหรับ request นั้น ค่าเริ่มต้น `0` =
ปิดใช้งาน ซึ่งคงพฤติกรรมคิวไม่จำกัดเดิมไว้; จำกัดช่วง 0–100000
override ผ่าน `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) หรือ
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch)

การตรวจสอบการยอมรับเข้าคิวเองเป็น pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) จึง
ทำ unit test ได้โดยไม่ต้องมี Bottleneck limiter จริง

> RFC ที่เปิด #6593 ยังเสนอแฟล็ก `bypassCompressionOnRateLimit`
> ไว้ด้วย อย่างไรก็ตาม pipeline ใน `open-sse/services/compression/` ของ repo นี้
> เป็นการบีบอัด prompt/context บน LLM request ฝั่งขาออก (`chatCore.ts`
> บริเวณบล็อก `resolveCompressionSettings`/`selectCompressionStrategy`)
> ไม่ใช่ HTTP response compression บน body ของ 429 ที่สร้างขึ้น — จึงไม่มี
> code path ที่ตรงกับแฟล็ก bypass ตามตัวอักษร นอกจากนี้ ขั้นตอนการบีบอัด prompt
> ยังทำงาน _ก่อน_ `withRateLimit()` ใน request pipeline อยู่แล้ว ดังนั้น
> การสลับลำดับเพื่อข้ามขั้นตอนนี้เมื่อเกิดการปฏิเสธแบบ queue-full เป็นการเปลี่ยนแปลง
> ที่แยกออกไปและใหญ่กว่าขอบเขตของ issue นี้ จึงตั้งใจ **ไม่** implement
> ไว้ที่นี่ และทิ้งไว้เป็นงานต่อเนื่อง หากการประหยัด CPU ที่ได้คุ้มกับ
> ความเสี่ยงจากการสลับลำดับ

### ตาข่ายนิรภัยเปิดใช้ Rate-Limit อัตโนมัติ และการป้องกัน Connection (`rateLimitProtection`)

**ตาข่ายนิรภัยเปิดใช้อัตโนมัติ** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders` ค่าเริ่มต้น `true`):
โดยค่าเริ่มต้น OmniRoute จะเปิดใช้การป้องกันด้วย rate-limit queue ให้กับ provider connection ทุกตัวที่ใช้งานอยู่และเป็นประเภท API key (`getProviderCategory(provider) === "apikey"` โดยอัตโนมัติ สิ่งนี้ช่วยให้มั่นใจว่า request ขาเข้าที่ส่งไปยัง upstream API key ที่ไวต่อ rate limit จะถูกจัดคิวและควบคุมอัตราผ่าน Bottleneck แทนที่จะพุ่งชนจนเกิด 429 error จาก upstream ตาข่ายนิรภัยนี้สามารถเขียนทับได้ผ่าน environment variable `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` เพื่อปิด, `true`/`1`/`on` เพื่อบังคับเปิด) ซึ่งมีความสำคัญเหนือกว่าการตั้งค่าบน dashboard ที่บันทึกไว้ (**Settings → Resilience** / `PATCH /api/resilience`)

**ความหมายของ `rateLimitProtection` ระดับ connection:**
การป้องกัน rate limit ระดับ connection ถูกติดตามผ่านฟิลด์ boolean `rateLimitProtection` บน provider connection (บันทึกเป็น `rate_limit_protection` ใน SQLite):

- **เปิดอย่างชัดเจน (`rateLimitProtection === true`)**: เปิดใช้การป้องกัน rate limit สำหรับ connection นี้อย่างชัดเจน โดยไม่ขึ้นกับประเภทของ provider หรือสถานะของตาข่ายนิรภัยเปิดใช้อัตโนมัติ
- **ปิดอย่างชัดเจน (`rateLimitProtection === false`)**: ปิดการป้องกันแบบชัดเจน แต่ **ไม่ได้** ถอน connection แบบ API key ที่ใช้งานอยู่ออกจากตาข่ายนิรภัยเปิดใช้อัตโนมัติระดับ global ใน `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) ค่า `false` และ `undefined` มีความหมายเทียบเท่ากัน: เฉพาะ `rateLimitProtection === true` เท่านั้นที่ถือเป็นการ override อย่างชัดเจน หาก `rateLimitProtection` เป็น `false` (หรือไม่ได้ตั้งค่า) connection แบบ API key ที่ใช้งานอยู่จะยังตรงเงื่อนไขการเปิดใช้อัตโนมัติและยังคงอยู่ภายใต้การป้องกัน rate limit
- **ไม่มีการ opt-out ระดับ connection**: ขณะนี้ผู้ดูแลระบบยังไม่สามารถระบุว่า "connection แบบ API key ที่ใช้งานอยู่เพียงตัวเดียวนี้ต้องทำงานโดยไม่มีการป้องกันด้วย rate-limit queue" ในขณะที่ยังเปิดใช้ auto-enable สำหรับตัวอื่นอยู่ หากต้องการให้ connection แบบ API key ทำงานโดยไม่มี rate-limit queue ทั้งหมด จะต้องปิดตาข่ายนิรภัยในระดับ global (`RATE_LIMIT_AUTO_ENABLE=false` หรือ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)

**เส้นทางการเขียนที่รองรับ:**

- **`POST /api/rate-limits`**: เส้นทางการเขียนสำหรับจัดการที่รองรับ เพื่อสลับค่า `rateLimitProtection` ของ connection (`{ connectionId: string, enabled: boolean }`) การเรียกด้วย `enabled: true` จะเปิดการป้องกันแบบชัดเจน การเรียกด้วย `enabled: false` จะลบการป้องกันแบบชัดเจนออก (แม้ว่า connection แบบ API key ที่ใช้งานอยู่จะยังคงอยู่ภายใต้ตาข่ายนิรภัยระดับ global หากเปิดใช้ auto-enable อยู่)
- **`PUT /api/providers/[id]`**: ตั้งใจ **ไม่** รับหรือสลับค่า `rateLimitProtection` (#11278) การอัปเดต metadata ของ provider connection ผ่าน `PUT /api/providers/[id]` จะไม่เปลี่ยนแปลงสถานะการป้องกัน rate limit ที่บันทึกไว้เสมอ

---

## 6. โปรแกรมเฝ้าระวังปริมาณงานสตรีมช้า (#9709)

ตัวป้องกัน `resilienceSettings.streamRecovery.throughputWatchdog` ซึ่งเป็นอุปกรณ์เสริมจะตรวจจับอัปสตรีมที่ยังคงส่งชิ้นส่วนอยู่ แต่สร้างเอาต์พุตของผู้ช่วยที่ต่ำกว่าอัตราเอาต์พุตที่มีประโยชน์ที่กำหนดค่าไว้ มันจงใจแตกต่างจากการหมดเวลาที่ไม่ได้ใช้งาน: การเต้นของหัวใจและข้อมูลเมตาจะไม่รีเซ็ตตัวจับเวลาและไม่นับเป็นความคืบหน้า นอกจากนี้ยังแตกต่างจากกำหนดเวลาความพยายามอย่างหนัก (#9153) ซึ่งยังคงเป็นเพดานความปลอดภัยที่สมบูรณ์โดยไม่คำนึงถึงคุณภาพของผลผลิต

สุนัขเฝ้าบ้านต้องอบอุ่นร่างกายก่อนตามด้วยหน้าต่างกลิ้งทั้งหมดก่อนจึงจะยกเลิกได้ โดยนับส่วนเดลต้าข้อความจากเหตุการณ์เอาต์พุต API การเสร็จสิ้นการแชทและการตอบกลับ (พร็อกซีไบต์ UTF-8 แบบอนุรักษ์นิยม) ละเว้นเหตุการณ์เฉพาะการใช้งานเท่านั้นและว่างเปล่า และระงับการตัดสินในขณะที่เหตุการณ์การเรียกใช้เครื่องมือหรือการให้เหตุผลอยู่ระหว่างดำเนินการ มันถูกปิดใช้งานโดยค่าเริ่มต้นและสามารถเปิดใช้งานได้ด้วย `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (ค่า env นั้นจะส่งเฉพาะค่าเริ่มต้น — `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean ที่บันทึกไว้เท่านั้นที่จะชนะ ดูบันทึกย่อลำดับความสำคัญของ env-vs-dashboard ที่ด้านบนของคู่มือนี้) หน้าต่าง การอุ่นเครื่อง อัตราขั้นต่ำ และเอาท์พุตที่วัดได้ขั้นต่ำนั้นถูกล้อมรอบด้วยเลเยอร์การปรับสภาพปกติของการตั้งค่าความยืดหยุ่นปกติ

เมื่อเปิดใช้งาน การยกเลิกโปรแกรมเฝ้าระวังจะถูกนำไปใช้กับความพยายามอัปสตรีมที่ใช้งานอยู่เท่านั้น ก่อนไบต์ที่ไคลเอ็นต์มองเห็นได้ เส้นทางการกู้คืนก่อนเวลาของบัญชีเดียวกันที่มีอยู่อาจเปิดความพยายามอีกครั้ง หลังจากคอมมิตแล้ว สตรีมจะไม่ถูกเล่นซ้ำแบบสุ่มสี่สุ่มห้า เฉพาะสัญญาการต่อเนื่องกลางสตรีมที่ปลอดภัยที่มีอยู่เท่านั้นที่สามารถต่อส่วนต่อท้ายได้ การสรุปผลยังคงเป็นแบบช็อตเดียว ดังนั้นการบัญชีการใช้งานและการปล่อยเซมาฟอร์จะไม่ซ้ำกัน

---

## 7. การระบุสถานะจาก upstream ใหม่ (ข้อผิดพลาดโควตาที่ระบุสถานะผิด)

**ขอบเขต:** upstream gateway หนึ่งตัวที่รายงานโควตาชั่วคราวหมดด้วยสถานะ HTTP ที่ไม่ถูกต้อง

**วัตถุประสงค์:** แก้ไขสถานะที่ทำให้เข้าใจผิด **ก่อน** การจัดประเภท เพื่อให้ผู้ใช้ปลายทาง (fallback engine, การรวมผลแบบ combo และการตอบกลับไปยังไคลเอ็นต์) เห็นลักษณะที่ควรลองใหม่ของความล้มเหลวอย่างถูกต้อง

Gateway บางตัวส่งสัญญาณว่าโควตาหมดชั่วคราวด้วยสถานะ HTTP ที่ไม่ควรลองใหม่ `agentrouter.org` ส่ง `403` (บางครั้งเป็น `400`) พร้อมเนื้อหาภาษาจีน (`用户额度不足` / `额度不足`) แทน `429` มาตรฐาน ไคลเอ็นต์อย่าง Claude
Code ถือว่า `403` เป็นความล้มเหลวถาวรและยุติเซสชัน และหากไม่มีการแก้ไข
fallback engine จะจัดประเภทเป็น `AUTH_ERROR` แทนที่จะเป็นเหตุการณ์โควตา

**การนำไปใช้:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — รายการกฎแยกตามผู้ให้บริการ (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`) ซึ่งจับคู่ผ่าน `applyStatusRestatement()`
- จุดเรียกใช้: บล็อก `providerFailure:` ใน `open-sse/handlers/chatCore.ts`
  (ประมาณบรรทัด 3654) ทันทีหลังจาก `parseUpstreamError()` แยกวิเคราะห์การตอบกลับจาก upstream ที่มีสถานะ HTTP เป็นข้อผิดพลาด (`!providerResponse.ok`) และก่อนที่จะเริ่มการจัดประเภทใด ๆ เพื่อให้ผู้ใช้ปลายทางทุกตัวเห็นสถานะที่แก้ไขแล้ว ข้อผิดพลาดที่ฝังอยู่ภายในสตรีม SSE ที่มีสถานะ `200` จะใช้เส้นทางการแยกวิเคราะห์สตรีมแยกต่างหากในภายหลัง และ **ยังไม่** อยู่ภายใต้ hook นี้ — เป็นข้อจำกัดที่ทราบแล้ว และยังไม่จำเป็นสำหรับ misstatus ของ agentrouter ซึ่งแสดงออกมาเป็นสถานะ HTTP ที่เป็นข้อผิดพลาด
- สิทธิ์ในการลองใหม่: `429` อยู่ใน `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) ดังนั้นข้อผิดพลาดที่ระบุสถานะใหม่จะมีช่วงเวลาสำหรับลองใหม่จริง แทนที่จะแสดงเป็น `403` ที่ไม่สามารถดำเนินการต่อได้
- ค่า `defaultRetryAfterMs` แบบสังเคราะห์ `60s` (`upstreamStatusRestatement.ts`)
  เป็นเพียงค่าที่การตอบกลับซึ่งระบุสถานะใหม่แจ้งแก่ **ไคลเอ็นต์** เท่านั้น ไม่ใช่ระยะเวลาคูลดาวน์/ล็อกเอาต์ภายในของการเชื่อมต่อ — ระยะเวลาดังกล่าวถูกควบคุมแยกต่างหากโดยกลไกที่จัดการข้อผิดพลาดซึ่งถูกระบุสถานะใหม่จริง ๆ (Connection Cooldown ที่ใช้ backoff เพิ่มขึ้นตามลำดับ §2 ค่าเริ่มต้น `3s` สำหรับผู้ให้บริการแบบ API-key หรือ Model Lockout §3 สำหรับผู้ให้บริการที่ใช้โควตาต่อโมเดล เช่น agentrouter) Router อาจมีสิทธิ์ลองใหม่ภายในได้เร็วกว่าช่วงเวลา 60s ที่ประกาศแก่ไคลเอ็นต์ — เป็น headroom ที่ตั้งใจไว้ ไม่ใช่บั๊ก

ข้อผิดพลาดถาวร (`无权访问模型` ของ agentrouter — ไม่มีสิทธิ์เข้าถึงโมเดลนี้) จะไม่ถูกระบุสถานะใหม่ **โดยเด็ดขาด**: `excludeMarkers` จะยับยั้งกฎแม้ `textMarkers` จะจับคู่ได้ ดังนั้นข้อผิดพลาดจะคงสถานะเดิมไว้ และไม่มีการลองใหม่อย่างไม่สิ้นสุด กฎการจัดประเภทของผู้ให้บริการที่ตรงกัน
(`agentrouter-model-access-denied` ใน `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, มี base cooldown ที่ประกาศไว้เป็น
`6h`) จะถูกตรวจสอบโดย `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_ก่อน_ การคืนค่าก่อนกำหนด `FORBIDDEN` แบบทั่วไปของหมวด apikey โดยมีเงื่อนไขว่าต้อง
`honorsRuleLockScope(provider)` (#10334 — ขณะนี้มีเฉพาะ agentrouter ผ่าน allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ใน `providerErrorRules.ts`) ค่า cooldown 6h ที่กฎประกาศไว้จะส่งต่อมาเป็น `fallbackResult.baseCooldownMs` แต่ยังคงเข้าสู่เส้นทาง lockout ต่อโมเดลสำหรับโควตาต่อโมเดลที่มีอยู่เดิม (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()` ซึ่ง #10334 ไม่ได้เปลี่ยนแปลง ยกเว้นแหล่งที่มาของ cooldown): ค่านี้จะถูกจำกัดไม่ให้เกิน `mlSettings.maxCooldownMs` ของผู้ปฏิบัติการ (ค่าเริ่มต้น `1_800_000ms` / 30min) เช่นเดียวกับ model lockout อื่น ๆ ทั้งหมด และ_เหตุผลของ lockout ที่บันทึกไว้_ยังคงเป็นค่า hardcoded เดิม `"forbidden"` ไม่ใช่ `"auth_error"` ของกฎ — สิ่งที่ได้รับการเคารพตลอดทั้งระบบมีเพียงระยะเวลา cooldown ไม่ใช่สตริงเหตุผล การเชื่อมต่อเองยังคงทำงานอยู่ และโมเดลพี่น้องบนการเชื่อมต่อเดียวกันจะไม่ได้รับผลกระทบ

ข้อผิดพลาดโควตาที่ระบุสถานะใหม่ (`额度不足`) จะไปถึงกฎของผู้ให้บริการใน production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"` โดยไม่ประกาศ cooldown ของตัวเอง — ค่าเริ่มต้น scaled backoff ของเลเยอร์ persistence จะถูกนำมาใช้) ตั้งแต่ #10334 เป็นต้นมา `scope` บน
`ProviderErrorRuleMatch` จะถูกใช้ตั้งแต่ต้นจนจบ **แต่**เฉพาะผู้ให้บริการใน allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` เท่านั้น (`providerErrorRules.ts` —
ปัจจุบันมีเพียง `"agentrouter"` ซึ่งควบคุมผ่าน `honorsRuleLockScope()`) สำหรับผู้ให้บริการรายอื่นทั้งหมด `scope` ยังคงมีไว้เพื่อให้ข้อมูลเท่านั้น เช่นเดียวกับก่อน #10334
`checkFallbackError` จะแสดง scope ของกฎที่ตรงกันเป็น
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) คือ guard ที่ใช้ร่วมกันเพื่อยืนยันว่า
`ruleScope` ปลอดภัยอย่างแท้จริงที่จะนำมาใช้เป็นสัญญาณระดับการเชื่อมต่อที่กู้คืนได้เอง (scope `"connection"`, reason `quota_exhausted`, ต้องไม่เป็น `permanent` และต้องไม่เป็น `creditsExhausted` — เป็นการป้องกันกรณีในอนาคตที่กฎจับคู่ scope `"connection"` เข้ากับสถานะบัญชีถาวร) มีผู้ใช้สองส่วนเรียกใช้ฟังก์ชันนี้:

- **การคงอยู่** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  แทนที่จะเข้าสู่สาขาการล็อกเอาต์แบบ **ต่อโมเดล** ของ passthrough-provider
  (agentrouter คือ `passthroughModels: true` → `hasPerModelQuota()`
  คืนค่า `true`) ระบบจะใช้ **คูลดาวน์การเชื่อมต่อชั่วคราว** —
  `testStatus: "unavailable"` + `rateLimitedUntil` และจะไม่กำหนดสถานะสิ้นสุด
  (`credits_exhausted`/`banned`/`expired`) — ดังนั้นการเชื่อมต่อจะกู้คืนตัวเอง
  เมื่อพ้นช่วงคูลดาวน์ แทนที่จะต้องรีเซ็ตข้อมูลรับรองด้วยตนเอง
  ข้ามขั้นตอนนี้สำหรับการเชื่อมต่อที่มี `disableCooling: true` (#2997):
  ตัวเลือกไม่ใช้คูลดาวน์นี้จะไปเข้าสู่การล็อกเอาต์แบบต่อโมเดลแทน
  (เป็นข้อแลกเปลี่ยนที่มีการบันทึกไว้ — ดูคอมเมนต์ในโค้ดเหนือสาขานี้)
- **การกำหนดเส้นทางคอมโบภายในคำขอเดียวกัน** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): guard เดียวกันนี้จะทำเครื่องหมาย
  การเชื่อมต่อไว้ในชุด `exhaustedConnections` ที่อยู่ในหน่วยความจำ โดยใช้คีย์
  `${provider}:${connectionId}` การทำเช่นนี้จะข้ามเฉพาะ target ที่เหลือของคำขอเดียวกัน
  ซึ่ง _ตัวมันเองมี `connectionId` ที่ตรงกันอย่างแน่นอน_ อยู่ในอ็อบเจ็กต์ target ของตัวเอง
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ก่อนการค้นหา `exhaustedConnections`) — คอมโบแบบรายการโมเดลทั่วไป
  ซึ่ง target พี่น้องไม่มี `connectionId` ที่ถูกตรึงไว้เป็นของตัวเอง และจะมีการแก้ค่าเพียง
  รายการเดียวต่อการ dispatch จากเฮดเดอร์ `X-OmniRoute-Selected-Connection-Id`
  ของ response จะไม่พบคีย์ที่ตรงกันนี้ สำหรับกรณีทั่วไปดังกล่าว การป้องกันจริงไม่ให้ leg
  ที่เหลือนำบัญชีที่เพิ่งใช้จนหมดกลับมาใช้ซ้ำ **ไม่ใช่** ชุด Set นี้ — แต่เป็นชั้นการคงอยู่
  ที่กล่าวไว้ข้างต้น (`rateLimitedUntil` ของการเชื่อมต่อมีค่าเป็นเวลาในอนาคต)
  ร่วมกับ guard เดียวกันนี้ที่ระงับ `transientRateLimitedProviders` สำหรับความล้มเหลว
  (ดู "การออกแบบสองขั้นตอน" และคอมเมนต์ในโค้ดของสาขา
  `isAgentrouterConnectionQuotaScope` ใน `targetExhaustion.ts`): เมื่อ Set นี้ไม่ได้ถูกทำเครื่องหมาย
  `allowRateLimitedConnection` ของ `combo.ts` ที่บังคับให้อนุญาต
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) จะไม่ทำงานสำหรับ leg
  ที่เหลือของ provider ดังนั้นตัวกรอง `rateLimitedUntil` ของการเลือกข้อมูลรับรอง
  (`src/sse/services/auth.ts:1238`) จะทำงานตามปกติ และ leg ที่เหลือจะเลือกการเชื่อมต่อ
  agentrouter อื่นที่ยังมีสิทธิ์ใช้งาน หรือจะล้มเหลวโดยไม่มีข้อมูลรับรองที่พร้อมใช้งาน —
  ระบบจะไม่บังคับย้อนกลับไปยังการเชื่อมต่อที่สาขานี้เพิ่งใช้คูลดาวน์

### การออกแบบสองขั้นตอน: การเขียนสถานะใหม่ แล้วจึงจัดประเภท

การเขียนสถานะใหม่ (`upstreamStatusRestatement.ts`) และกฎการจัดประเภทของ provider
(`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) เป็นรีจิสทรีที่แยกจากกัน โดยทั้งคู่ใช้รหัส provider
และเครื่องหมายข้อความเป็นคีย์ แต่ทำงานในตำแหน่งที่ต่างกันและมีวัตถุประสงค์ต่างกัน:
การเขียนสถานะใหม่จะแก้ไขสถานะ HTTP ตั้งแต่เนิ่น ๆ ใน `chatCore.ts`;
ส่วนกฎการจัดประเภทจะเลือก `reason` สำรองและล็อก `scope`
(`model` / `provider` / `connection`) ภายใน `checkFallbackError()`
(`open-sse/services/accountFallback.ts`)

กฎการจัดประเภทจะเห็นเฉพาะ **ข้อความ** ข้อผิดพลาดแบบเต็มเท่านั้น
(จำเป็นสำหรับการจับคู่เครื่องหมายใน body เช่น `额度不足`) สำหรับ provider
ที่อยู่ใน allowlist `FULL_TEXT_RULE_PROVIDERS` ใน `providerErrorRules.ts`
— ปัจจุบันมีเพียง `"agentrouter"` เท่านั้น สำหรับ provider อื่นทุกตัวใน
**แค็ตตาล็อก built-in**, `checkFallbackError` จะส่งให้ `getProviderErrorRuleMatch`
เฉพาะข้อผิดพลาดที่มีโครงสร้าง (`{code, type}`) ซึ่งเพียงพอสำหรับกฎที่อิงเฮดเดอร์/
สถานะ/โค้ด แต่จะมองไม่เห็นเครื่องหมายในข้อความของ body
ตัวช่วย `resolveRuleMatchBody()` จะเป็นผู้เลือกสิ่งนี้: ใช้ข้อความข้อผิดพลาดแบบเต็ม
สำหรับ provider ที่อยู่ใน allowlist และใช้ข้อผิดพลาดที่มีโครงสร้างสำหรับ provider อื่น
การเพิ่ม provider แบบ **built-in** ลงใน `FULL_TEXT_RULE_PROVIDERS`
เป็นการเลือกเปิดใช้แบบเจาะจงต่อ provider อย่างชัดเจน — มีไว้เพื่อให้เส้นทางเริ่มต้น
สำหรับ provider ทุกตัวที่ไม่อยู่ในรายการยังคงเหมือนเดิมทุกไบต์

`scope` ของกฎ (`model` / `provider` / `connection`) เป็นการเลือกเปิดใช้อีกส่วนหนึ่ง
ที่แยกจาก `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` จะแสดงค่านี้เป็น
`fallbackResult.ruleScope` เท่านั้น และผู้ใช้ปลายทางจะยอมรับค่านี้ในลักษณะอื่นนอกเหนือจาก
ป้ายข้อมูล เมื่อเป็น provider ที่อยู่ใน allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ในไฟล์เดียวกันเท่านั้น (ควบคุมผ่าน
`honorsRuleLockScope()` — ปัจจุบันมีเพียง `"agentrouter"` เท่านั้น)
ดู "ข้อผิดพลาดโควตาที่เขียนสถานะใหม่" ด้านบน สำหรับสิ่งที่การจับคู่
`scope: "connection"` จะทำเมื่อ provider อยู่ใน allowlist นั้น

**#11104 — กฎที่ผู้ดำเนินการประกาศจะข้าม allowlist ทั้งสองรายการ** ผู้ดำเนินการสามารถ
ประกาศกฎต่อ provider ขณะรันไทม์ผ่าน `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
โดยไม่ต้องแก้ไขไฟล์นี้ การบังคับให้กฎของผู้ดำเนินการต้องอยู่ภายใต้
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlist
ที่มีไว้เพื่อปกป้องพฤติกรรม **เริ่มต้น** ของกฎจากแค็ตตาล็อก built-in — จะทำให้กลไก
settings ใช้งานไม่ได้สำหรับ provider ทุกตัว ยกเว้นตัวที่อยู่ในรายการอยู่แล้ว
เนื่องจากการประกาศกฎถือเป็นการเลือกเปิดใช้โดยชัดแจ้งของผู้ดำเนินการอยู่แล้ว
ทั้ง `resolveRuleMatchBody()` และ `honorsRuleLockScope()` จะตรวจสอบ
`hasOperatorRuleForProvider()` ก่อน: provider ที่มีกฎของผู้ดำเนินการจะได้รับข้อความ
ข้อผิดพลาดดิบ และจะใช้ `scope` ที่ประกาศไว้ โดยไม่คำนึงว่าจะปรากฏอยู่ใน allowlist
รายการใดรายการหนึ่งหรือไม่

**กฎที่ผู้ดำเนินการประกาศ** (`OperatorProviderErrorRule`): แต่ละกฎมี `status`
ที่เป็นตัวเลือก และ `match` ที่เป็นตัวเลือก (สตริงย่อยแบบไม่คำนึงถึงตัวพิมพ์เล็กใหญ่
ของข้อความข้อผิดพลาด ไม่ใช่ RegExp จึงไม่สามารถทำให้เกิด ReDoS ได้) และต้องกำหนด
อย่างน้อยหนึ่งรายการจากสองรายการนี้ เมื่อกำหนดทั้งคู่ จะใช้เงื่อนไข AND;
ฟิลด์ที่เว้นไว้จะจับคู่กับค่าใดก็ได้ ดังนั้น `{match: "insufficient_quota"}`
จะจับคู่กับสถานะใดก็ตามที่มีโค้ดดังกล่าว กฎแรกที่จับคู่ได้จะเป็นกฎที่ถูกใช้
`cooldownMs` รับค่าได้สูงสุด 30 วัน และมีกฎรวมได้ไม่เกิน 50 กฎ

**ค่าเริ่มต้นแบบครอบคลุมทั้งหมด** (`settings.providerErrorDefaults`, ต้องเปิดใช้โดยกำหนดค่าผ่าน
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
โดย `cooldownMs` ตั้งแต่ 1 นาทีถึง 30 วัน ค่าเริ่มต้นจะมีผลเฉพาะเมื่อไม่มีกฎของ
ผู้ดำเนินการและไม่มีกฎจากแค็ตตาล็อกในตัวที่ตรงกัน และมีผลเฉพาะกับข้อผิดพลาด 402, 403, 408,
429 และ 5xx เท่านั้น ข้อผิดพลาดด้านรูปแบบคำขอ (400, 404, 409, 413, 422) และ
401 ที่ไม่มีรายละเอียดเพิ่มเติมยังคงใช้การจัดการของตนเอง หากไม่ได้ระบุ `reason` ไว้
เหตุผลจะมาจากสถานะในลักษณะเดียวกับที่ `classifyError` ทำ การประกาศค่าเริ่มต้นถือเป็น
กฎของผู้ดำเนินการสำหรับ `hasOperatorRuleForProvider()` ดังนั้น `scope` (ค่าเริ่มต้นคือ
`"connection"`) จะได้รับการเคารพ ระยะเวลาคูลดาวน์ที่มีผลของค่าเริ่มต้นจะเป็นค่าที่ยาวกว่า
ระหว่าง `cooldownMs` กับคำแนะนำการลองใหม่ของผู้ให้บริการเอง (`Retry-After`,
`x-ratelimit-reset` หรือคำแนะนำการรีเซ็ตใน body ซึ่งเป็นคำแนะนำเดียวกับที่ engine
เคารพเมื่อเปิดใช้การตั้งค่าคูลดาวน์การเชื่อมต่อ "use upstream retry hints") ดังนั้น
ค่าเริ่มต้นจึงสามารถขยายคำแนะนำจาก upstream ที่สั้นกว่าได้ แต่จะไม่ตัดระยะเวลาการรีเซ็ตจริง
ให้สั้นลง กฎของผู้ดำเนินการที่ระบุไว้อย่างชัดเจนจะใช้ `cooldownMs` ตามที่กำหนดทุกประการ
ทั้งกฎและค่าเริ่มต้นไม่สามารถข้ามตัวป้องกันคูลดาวน์การเชื่อมต่อใน
`markAccountUnavailable` ได้ กล่าวคือ คูลดาวน์ที่กำลังทำงานอยู่และยาวกว่าจะไม่ถูกลดลง
และสถานะปลายทางจะไม่ถูกเขียนทับ ตัวตรวจจับข้อความในตัวที่ทำงานก่อนหน้านี้ใน
`checkFallbackError` (เครดิตหมด โควต้ารายวัน บัญชีถูกปิดใช้งาน) ยังคงมีลำดับความสำคัญสูงกว่า
สำหรับวลีของตนเอง

**ช่องว่างที่ทราบ — `providerRuleRegistry` ไม่เคยถูกตรวจสอบสำหรับ HTTP 400**
แขนง `BAD_REQUEST` ของ `checkFallbackError` จัดประเภทสถานะ 400 ทั้งหมดผ่านอาร์เรย์แพตเทิร์น
ของตนเอง (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` เป็นต้นใน `accountFallback.ts`) และส่งค่ากลับก่อนที่จะไปถึง
แขนง `configuredRule`/`getProviderErrorRuleMatch` ด้านบน กฎจากแค็ตตาล็อกในตัว
(หรือกฎของผู้ดำเนินการ) ที่มี `status: 400` จึงถูกต้องตามไวยากรณ์แต่จะไม่ทำงาน ปัจจุบันไม่มี
กฎที่กำหนดเป้าหมายเป็น 400 ดังนั้นจึงไม่ส่งผลกระทบต่อการทำงานจริง — แต่กฎ 400 ในอนาคต
จำเป็นต้องแก้ไขแขนงนี้ก่อน ซึ่งเป็นการเปลี่ยนแปลงที่ใหญ่กว่าการเพิ่มกฎ เนื่องจากจะ
จัดประเภท 400 ใหม่สำหรับผู้ให้บริการทุกรายที่อาศัยพฤติกรรมของอาร์เรย์แพตเทิร์นอยู่แล้ว
และอยู่นอกขอบเขตของการเพิ่มกฎสำหรับผู้ให้บริการรายเดียว

### การเพิ่ม gateway ที่รายงานโควต้าผิด

1. ลงทะเบียนอาร์เรย์กฎหนึ่งรายการใน `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) โดยให้ `textMarkers`
   เฉพาะเจาะจงกับผู้ให้บริการ ห้ามนำวลีภาษาอังกฤษทั่วไปที่ชนกับ
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) กลับมาใช้ซ้ำ
2. ลงทะเบียนกฎการจัดประเภทเพิ่มเติมใน
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ได้ตามต้องการ
   เพื่อเลือกขอบเขตการล็อกที่ถูกต้อง (`connection` สำหรับโควต้าที่ครอบคลุมทั้งบัญชี
   `model` สำหรับข้อผิดพลาดเฉพาะโมเดล) ขั้นตอนนี้จะมีผลในการทำงานจริงเฉพาะกับผู้ให้บริการ
   ที่กฎจำเป็นต้องใช้ข้อความข้อผิดพลาดทั้งหมด (ตัวระบุใน body): ให้เพิ่มรหัสผู้ให้บริการใน
   `FULL_TEXT_RULE_PROVIDERS` ในไฟล์เดียวกัน — มิฉะนั้น `checkFallbackError` จะส่งให้กฎ
   ตรวจสอบได้เพียงข้อผิดพลาดแบบมีโครงสร้าง `{code, type}` และกฎที่ตรวจสอบข้อความใน body
   จะไม่ตรงกับทราฟฟิกจริง กฎที่จับคู่โดยอาศัย `status`/`headers` เพียงอย่างเดียว
   (เช่นของ Opencode หรือ Minimax) ไม่จำเป็นต้องเปิดใช้ตัวเลือกนี้ แยกกันนั้น หากกฎ
   ประกาศ `scope: "connection"` และจุดประสงค์คือคูลดาวน์ที่ครอบคลุมทั้งการเชื่อมต่อจริง
   พร้อมการข้ามคอมโบในคำขอเดียวกัน (ไม่ใช่เพียงป้ายกำกับเพื่อให้ข้อมูล) ให้เพิ่มรหัส
   ผู้ให้บริการใน `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ในไฟล์เดียวกัน — ตัวเลือกนี้เป็น
   สิ่งที่ควบคุมการใช้งานในรูปแบบ `isAgentrouterConnectionQuotaScope()` ใน
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) และ
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) หากไม่มีตัวเลือกนี้ `scope`
   จะยังคงส่งต่อผ่าน `fallbackResult.ruleScope` แต่จะไม่มีการดำเนินการใด ๆ กับค่านี้
3. เพิ่มการทดสอบยูนิตโดยจำลองตาม
   `tests/unit/upstream-status-restatement.test.ts`
   และ `tests/unit/agentrouter-error-rules.test.ts` (รวมตัวป้องกัน
   not-permanent / not-creditsExhausted และ — หากผู้ให้บริการจำเป็นต้องใช้ allowlist —
   การทดสอบที่ยืนยันว่า `resolveRuleMatchBody()` ส่งคืนข้อความทั้งหมดเฉพาะสำหรับ
   ผู้ให้บริการรายนั้น)

ไม่จำเป็นต้องแก้ไข `chatCore.ts`, `classifyError` หรือ combo

#### ล็อกแบบแบ่งตาม egress-bucket (#10880)

ผู้ให้บริการใน `EGRESS_BUCKETED_LOCK_PROVIDERS` (ตระกูล opencode) จะถูกถือว่าเป็น
upstream ที่แบ่ง bucket ตาม IP (free tier ของ opencode แบ่งตาม IP ไม่ใช่ตามบัญชี —
ดู #9611): สถานะ 429 ที่จัดประเภทเป็น `quota_exhausted`
**หรือ** `rate_limit_exceeded` จะทำให้การเชื่อมต่อของตระกูลที่อยู่ใน allowlist
ทุกการเชื่อมต่อ ซึ่งมี IP egress ที่ทราบล่าสุดตรงกับ IP ของการเชื่อมต่อที่ล้มเหลว
เข้าสู่คูลดาวน์ ก่อนที่การหมุนเวียนจะลองใช้การเชื่อมต่อเหล่านั้น
— เพื่อหลีกเลี่ยงการเรียก upstream ที่ล้มเหลวแน่นอนจำนวน N-1 ครั้ง
(รูปแบบเดียวกับ #10460/#10525) การรวม `rate_limit_exceeded` ไว้เป็นสิ่งที่ตั้งใจ:
บนเส้นทาง `markAccountUnavailable` กฎเฉพาะของ opencode จะไม่ตรงกัน (ไม่มีการส่ง
headers/body ไปยัง `checkFallbackError`, opencode ไม่ได้อยู่ใน
`FULL_TEXT_RULE_PROVIDERS`) ดังนั้น 429 ที่ body มีข้อความโควต้าสมาชิก
("monthly usage limit reached") จะถูกจัดประเภทเป็น `quota_exhausted` โดย fallback
ของข้อความโควต้า (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
คูลดาวน์ 1 ชั่วโมง) ก่อนที่จะไปถึงกฎ `status_429` — ขณะที่ 429 ที่ไม่มีข้อความโควต้า
(การจำกัดอัตราแบบปกติ) จะถูกจัดประเภทผ่านกฎ `status_429` เป็น
`rate_limit_exceeded` และยังคงทำให้ตระกูล IP เข้าสู่คูลดาวน์ สำหรับผู้ให้บริการใน
allowlist การจำกัดอัตราตาม IP ให้สัญญาณเดียวกันกับโควต้าที่หมดแล้ว ข้อจำกัดที่สมเหตุสมผลคือ:

- **พยายามอย่างดีที่สุด**: lock จะค้นหา `egress_ip` ล่าสุดที่ทราบของการเชื่อมต่อจาก `proxy_logs`
  (ภายในช่วงเวลา 24 ชั่วโมง, ทำงานแบบ synchronous และไม่มีแคช) หากแคชยังว่าง (ไม่เคย
  ตรวจสอบ egress IP มาก่อน) หรือไม่พบแถว การเชื่อมต่อที่ล้มเหลวจะยังคงถูกทำให้เย็นลงโดย
  branch (บันทึกเช่นเดียวกับในปัจจุบัน) เพียงแต่จะไม่มีการล็อก sibling
- **ไม่มีวันเป็นสถานะสิ้นสุด**: cooldown เป็นหน้าต่างโควตาที่ต่ออายุได้
  (`testStatus: "unavailable"`); จะไม่มีการอนุมานสถานะถาวรจากสัญญาณระดับ IP
  การเชื่อมต่อที่มี `disableCooling` จะข้าม branch นี้ทั้งหมด
- **Granularity ของ lock เปลี่ยนไปสำหรับ family ที่อยู่ใน allowlist**: นี่คือการเปลี่ยน scope
  ไม่ใช่เพียงการปรับปรุง sibling เท่านั้น opencode เป็น provider แบบ `passthroughModels`
  ดังนั้นก่อน branch นี้ 429 จะทำให้เกิดการล็อกระดับ MODEL; ตอนนี้จะทำให้เกิด cooldown
  ระดับการเชื่อมต่อ — รวมถึงกรณีที่ operator ใช้การเชื่อมต่อเพียงรายการเดียวโดยไม่มี sibling
  เลยด้วย นี่คือ granularity ที่ตารางกฎของ opencode ประกาศไว้อยู่แล้วว่าถูกต้อง
  (`scope: "connection"`, `providerErrorRules.ts`) แต่ไม่เคยถูกใช้งานจนถึงตอนนี้ เพราะ
  opencode ไม่ได้อยู่ใน `HONORS_RULE_LOCK_SCOPE_PROVIDERS` branch นี้จะเขียน cooldown ของ
  การเชื่อมต่อที่ล้มเหลวและ `backoffLevel` ด้วยตัวเอง โดยเลียนแบบ branch
  agentrouter ที่มี scope ระดับการเชื่อมต่อ จากนั้นจึง return — การบล็อกระดับโมเดลและ
  generic path ด้านล่างจะไม่ถูกเรียกใช้งาน
- **รวม Combo ด้วย**: เช่นเดียวกับ branch ของ agentrouter scope นี้จงใจไม่สนใจการลดระดับ
  `persistUnavailableState`/`isCombo` ที่ caller แบบ combo ใช้กับ 429 การล็อกระดับโมเดล
  ไม่ใช่รูปแบบที่อ่อนกว่าของ scope นี้ แต่เป็นหน่วยที่ไม่ถูกต้อง: เนื่องจากไม่ได้บอกอะไร
  เกี่ยวกับ IP ที่ใช้งานจนหมดโควตา การหมุนเวียน combo จึงยังคงเรียกใช้งานหนึ่งครั้งที่
  รับประกันว่าจะล้มเหลวต่อ sibling แต่ละรายการ
- **ความปลอดภัยของ sibling**: sibling ที่อยู่ในสถานะสิ้นสุดแล้ว (banned/credits_exhausted)
  หรืออยู่ใน cooldown ที่ยาวนานกว่าอยู่แล้ว จะไม่ถูกเขียนทับ
- **Allowlist แบบจำกัดเฉพาะ**: การขยาย `EGRESS_BUCKETED_LOCK_PROVIDERS` เป็นการตัดสินใจ
  โดย owner อย่างชัดเจน จะไม่มีการเชื่อมต่อทั่วไป (pattern #10334/#10419) query สำหรับ
  sibling จะอ้างอิง allowlist เดียวกันนั้น แทนที่จะเขียนซ้ำเป็น SQL literal ดังนั้นการขยาย
  allowlist จึงยังคงเป็นการเปลี่ยนแปลงเพียงบรรทัดเดียว
- **การหมุนเวียน Egress IP ทั้งสองทิศทาง**: หน้าต่างการค้นหา (24 ชั่วโมง) กว้างกว่า TTL
  ของแคช egress-IP (5 นาที) มาก ดังนั้น "IP ล่าสุดที่ทราบ" จึงเป็นประวัติ ไม่ใช่สถานะปัจจุบัน
  หาก proxy ของการเชื่อมต่อหมุนเวียนภายในหน้าต่างดังกล่าว lock อาจ **พลาด** IP ที่แชร์กัน
  อยู่จริง (IP ที่บันทึกไว้คือ IP ใหม่ซึ่งยังไม่ถูกใช้จนหมดโควตา) — และในทางกลับกันก็อาจ
  **ทำให้ sibling ที่หมุนเวียนออกจาก** IP ที่ใช้จนหมดโควตาไปแล้วเย็นลงได้ กรณีที่สอง
  ทำให้ sibling นั้นเสีย cooldown ไปหนึ่งหน้าต่าง ทั้งสองกรณียอมรับได้ในฐานะข้อจำกัดแบบ
  พยายามอย่างดีที่สุดของการค้นหาจากประวัติ
- **ต้นทุน**: การสแกน `proxy_logs` ที่มีขอบเขตจำนวนสองครั้ง (กรองตามหน้าต่างเวลาผ่าน
  `idx_pl_timestamp`) และทำเฉพาะเมื่อเกิด 429 เท่านั้น ไม่ต้องเพิ่มดัชนีใหม่
  (migration 134 YAGNI) วัดจากสำเนา DB ที่มีทราฟฟิกจริงและมีขนาดปานกลาง โดย instance
  ที่มี throughput สูงจะมีจำนวนแถวในหน้าต่างเวลาเดียวกันมากขึ้นตามสัดส่วน

## ฟีเจอร์ Resilience อื่นๆ

- **กลยุทธ์การกำหนดเส้นทาง 20 แบบ** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — ดู [AUTO-COMBO.md](../routing/AUTO-COMBO.md)
- **การกำหนดเส้นทางแบบรับรู้การรีเซ็ต** (v3.8.0) — จัดลำดับความสำคัญของการเชื่อมต่อตามเวลารีเซ็ตโควต้า
- **การลดประสิทธิภาพโหมด background** — Responses API `background: true` จะถูกลดระดับเป็นแบบ sync พร้อมคำเตือน
- **การตรวจจับขีดจำกัดเครื่องมือแบบไดนามิก** — ถอยการใช้งาน provider เมื่อถึงขีดจำกัดจำนวนเครื่องมือ
- **Emergency fallback** — ควบคุมโดย `OMNIROUTE_EMERGENCY_FALLBACK`; ผู้ดูแลระบบสามารถแทนที่ค่านี้ได้จากหน้า Feature Flags โดยไม่ต้องรีสตาร์ท

---

## การดีบัก

- Weighted combo ตอบกลับด้วย `503 all_targets_cooling_down` (มีการตั้งค่า `Retry-After`, `diagnostics.excluded` แสดงรายการทุก target พร้อม `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool ได้รับการกำหนดค่าและเชื่อมต่อแล้ว เพียงแต่ทุก target ถูกแยกออกโดยตัวจับเวลา resilience; คำเตือน `[COMBO] Weighted selection: every target excluded before dispatch — …` จะระบุเหตุผลและวินาทีที่เหลือ ส่วน `404 no_executable_targets` จาก combo เดียวกันหมายความว่าไม่มีตัวจับเวลา resilience เกี่ยวข้อง (ไม่มีอะไรให้รัน หรือทุกบัญชีไม่ผ่านการตรวจสอบความพร้อมใช้งาน) สร้างขึ้นใน `open-sse/services/combo/pinRecovery.ts` จากรายการ exclusion ที่รวบรวมใน `targetResolution.ts`
- ทุก key ของ provider ถูกข้าม → ตรวจสอบทั้งสถานะ circuit breaker และ `rateLimitedUntil`/`testStatus` ของแต่ละการเชื่อมต่อ
- Provider ถูกแยกออกถาวรหลังช่วงเวลารีเซ็ต → โค้ดอ่าน `state` ดิบแทนที่จะใช้ `getStatus()`/`canExecute()`
- key หนึ่งล้มเหลว แต่ key อื่นควรทำงาน → ควรใช้ connection cooldown แทน circuit breaker
- โมเดลเดียวล้มเหลว → ควรใช้ model lockout แทน connection cooldown
- สถานะควรกู้คืนตัวเองแต่ไม่ทำ → ตรวจสอบ timestamp ในอนาคต + เส้นทางการอ่านที่รีเฟรชสถานะที่หมดอายุ สถานะถาวรต้องมีการเปลี่ยนแปลงด้วยตนเอง

---

## สถานะ Runtime — ข้อมูลอ้างอิงด่วนสำหรับ agent

> ย้ายมาแบบตรงตัวจาก `AGENTS.md` → "Resilience Runtime State" (PR #12743) เพื่อให้
> คู่มือ agent อยู่ภายใต้งบประมาณ context 40k นี่คือมุมมองแบบย่อที่มุ่งเน้น agent ของ
> ส่วนต่างๆ ข้างต้น; ส่วนที่มีหมายเลขกำกับยังคงเป็นข้อมูลอ้างอิงฉบับเต็ม

OmniRoute มีกลไจความล้มเหลวชั่วคราวสามแบบที่เกี่ยวข้องแต่แตกต่างกัน โปรดแยก
ขอบเขตของแต่ละกลไจออกจากกันเมื่อดีบักพฤติกรรมการกำหนดเส้นทาง ดู
[ไดอะแกรม resilience 3 ชั้น](../diagrams/exported/resilience-3layers.svg)
(ต้นฉบับ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
สำหรับแผนที่ภาพรวม

### Provider Circuit Breaker

**ขอบเขต**: ทั้ง provider เช่น `glm`, `openai`, `anthropic`

**วัตถุประสงค์**: หยุดส่งทราฟฟิกไปยัง provider ที่ล้มเหลวซ้ำๆ ในระดับ
upstream/บริการ เพื่อไม่ให้ provider ที่ไม่สมบูรณ์เพียงตัวเดียวทำให้ทุกคำขอช้าลง

**การนำไปใช้งาน**:

- คลาสหลัก: `src/shared/utils/circuitBreaker.ts`
- การเชื่อมต่อ gate/การทำงานของ Chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API สถานะ runtime: `src/app/api/monitoring/health/route.ts`
- Wrapper ที่ใช้ร่วมกัน: `open-sse/services/accountFallback.ts`
- ตารางสถานะที่จัดเก็บ: `domain_circuit_breakers`

**สถานะ** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: อนุญาตทราฟฟิกปกติ
- `DEGRADED`: แถบเตือนล่วงหน้า — ความล้มเหลวข้ามเกณฑ์ degradation แต่ยังไม่ถึง
  เกณฑ์ breaker; ทราฟฟิกยังคงไหล แดชบอร์ดแสดงคำเตือน การทดสอบการเชื่อมต่อที่ผ่าน
  หรือช่วงเวลาที่เงียบโดยไม่มีความล้มเหลวใหม่จะทำให้กลับสู่ `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` มีรายละเอียดของช่วงเวลานี้)
- `OPEN`: provider ถูกบล็อกชั่วคราว; ผู้เรียกจะได้รับการตอบกลับแบบ provider-circuit-open
  หรือ combo routing จะข้ามไปยัง target อื่น
- `HALF_OPEN`: หมดเวลารีเซ็ตแล้ว; อนุญาตคำขอตรวจสอบ หากสำเร็จจะปิด
  breaker หากล้มเหลวจะเปิดอีกครั้ง

**ค่าเริ่มต้น** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES` ใช้งานผ่าน
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` ใน `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` ใน `src/sse/handlers/chatHelpers.ts`) breaker ระดับ
provider ทั้งตัวทำงานบน `circuitBreakerThreshold` / `circuitBreakerReset`:

| โปรไฟล์ | degrade ที่ | เปิดที่ (`circuitBreakerThreshold`) | รีเซ็ต (`circuitBreakerReset`) |
| ------- | ----------: | ----------------------------------: | -----------------------------: |
| OAuth   |         `5` |                                 `8` |                          `60s` |
| API key |         `7` |                                `12` |                          `30s` |
| Local   |  (ได้มาจาก) |                                 `2` |                          `15s` |

`PROVIDER_PROFILES` ยังกำหนด `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 นาที) และ `providerCooldownMs` (5/10/1 นาที): สิ่งเหล่านี้ขับเคลื่อน
**window gate ของ Provider Cooldown ระดับ global แบบ opt-in** (`PROVIDER_COOLDOWN_ENABLED` ค่าเริ่มต้น
ปิดอยู่) — รายการระดับ provider ใน `open-sse/services/providerCooldownTracker.ts` จะนับเป็น
กำลัง cooldown ก็ต่อเมื่อมีความล้มเหลว `providerFailureThreshold` ครั้งภายใน `providerFailureWindowMs` แล้วจึง
cooldown เป็นเวลา `providerCooldownMs` ค่าเหล่านี้ไม่ใช่เกณฑ์ของ breaker ที่กำลังทำงานอยู่ — อย่าปรับค่าเหล่านี้
โดยคาดหวังพฤติกรรมของ breaker ทุกค่าเริ่มต้นสามารถแทนที่ได้ผ่าน
ตัวแปรสภาพแวดล้อม `OMNIROUTE_PROVIDER_BREAKER_*` และ `OMNIROUTE_CIRCUIT_BREAKER_*`;
ตารางอ้างอิงที่ถูกต้องตาม runtime อยู่ใน `docs/architecture/RESILIENCE_GUIDE.md`

เฉพาะสถานะความล้มเหลวระดับ provider เท่านั้นที่ควรทำให้ provider breaker ทำงาน:

```ts
(408, 500, 502, 503, 504);
```

อย่าทำให้ breaker ของทั้ง provider ทำงานสำหรับข้อผิดพลาดปกติระดับบัญชี/key/โมเดล เช่น กรณี
`401`, `403` หรือ `429` ส่วนใหญ่ กรณีเหล่านั้นมักจะอยู่ในขอบเขตของ connection cooldown หรือ model
lockout ข้อผิดพลาด `403` ของ provider แบบ API key ทั่วไปควรสามารถกู้คืนได้ เว้นแต่จะถูกจัดประเภท
เป็นข้อผิดพลาดระดับ provider/บัญชีที่สิ้นสุดถาวร

Breaker ใช้การกู้คืนแบบ lazy ไม่ได้ใช้ background timer เมื่อ `OPEN` หมดอายุ
การอ่านค่าเช่น `getStatus()`, `canExecute()` และ `getRetryAfterMs()` จะรีเฟรชสถานะเป็น
`HALF_OPEN` เพื่อให้แดชบอร์ดและตัวสร้าง combo candidate ไม่ตัด provider
ที่หมดอายุแล้วออกไปตลอดกาล

### คูลดาวน์ของ Connection

**ขอบเขต**: connection/บัญชี/คีย์หนึ่งรายการของ provider

**วัตถุประสงค์**: ข้ามคีย์/บัญชีที่มีปัญหาชั่วคราวหนึ่งรายการ โดยยังอนุญาตให้ connection
อื่นของ provider เดียวกันยังให้บริการ request ต่อไปได้

**การ implement**:

- เส้นทางการเขียน/อัปเดต: `src/sse/services/auth.ts::markAccountUnavailable()`
- การเลือก/กรองบัญชี: `src/sse/services/auth.ts::getProviderCredentials...`
- การคำนวณคูลดาวน์: `open-sse/services/accountFallback.ts::checkFallbackError()`
- การตั้งค่า: `src/lib/resilience/settings.ts`

ฟิลด์สำคัญบน connection ของ provider:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ในระหว่างการเลือกบัญชี connection จะถูกข้ามเมื่อ:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

คูลดาวน์ก็เป็นแบบ lazy เช่นกัน: เมื่อ `rateLimitedUntil` ผ่านไปแล้ว connection จะกลับมา
มีสิทธิ์ถูกเลือกอีกครั้ง เมื่อใช้งานสำเร็จ `clearAccountError()` จะล้าง `testStatus`,
`rateLimitedUntil`, ฟิลด์ error และ `backoffLevel`

พฤติกรรมคูลดาวน์เริ่มต้นของ connection:

- คูลดาวน์พื้นฐานของ OAuth: `5s`
- คูลดาวน์พื้นฐานของ API-key: `3s`
- กรณี `429` ของ API-key ควรใช้คำใบ้การ retry จาก upstream (`Retry-After`, reset headers หรือ
  ข้อความ reset ที่ parse ได้) ก่อนเสมอเมื่อมีให้ใช้
- ความล้มเหลวที่กู้คืนได้ซ้ำๆ จะใช้ exponential backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

ตัวป้องกัน anti-thundering-herd ป้องกันไม่ให้ความล้มเหลวที่เกิดพร้อมกันบน connection
เดียวกันขยายคูลดาวน์ซ้ำหลายครั้ง หรือเพิ่ม `backoffLevel` ซ้ำสอง

สถานะแบบ terminal ไม่ใช่คูลดาวน์ `banned`, `expired` (ซึ่งจะกลายเป็น terminal ก็ต่อเมื่อ
retry แบบจำกัดจำนวนครบ N ครั้งผ่าน `EXPIRED_RETRY_MAX` แล้ว) และ `credits_exhausted`
มีเจตนาให้คงสถานะไม่พร้อมใช้งานไว้จนกว่า credentials/การตั้งค่าจะเปลี่ยน หรือผู้ดูแลระบบ
รีเซ็ตเอง อย่าเขียนทับสถานะ terminal ด้วยสถานะคูลดาวน์ชั่วคราว

### การ Lockout โมเดล

**ขอบเขต**: provider + connection + model

**วัตถุประสงค์**: หลีกเลี่ยงการปิดใช้งาน connection ทั้งหมดเมื่อมีเพียงโมเดลเดียวที่
ไม่พร้อมใช้งานหรือถูกจำกัดโควตาสำหรับ connection นั้น

ตัวอย่าง:

- Provider ที่มีโควตาแยกต่อโมเดล ส่งกลับ `429`
- Provider แบบ local ส่งกลับ `404` สำหรับโมเดลที่ไม่มีอยู่
- ความล้มเหลวด้านสิทธิ์ของโหมด/โมเดลเฉพาะ provider เช่น โหมดของ Grok ที่เลือกไว้

Model lockout อยู่ใน `open-sse/services/accountFallback.ts` และช่วยให้ connection
เดียวกันยังให้บริการโมเดลอื่นต่อไปได้

### คำแนะนำในการดีบัก

- หากคีย์ทั้งหมดของ provider ถูกข้าม ให้ตรวจสอบทั้งสถานะของ provider breaker และ
  `rateLimitedUntil`/`testStatus` ของแต่ละ connection
- หาก provider ดูเหมือนถูกตัดออกอย่างถาวรหลังช่วงเวลารีเซ็ต ให้ตรวจสอบว่าโค้ดกำลัง
  อ่าน `state` ดิบแทนที่จะใช้ `getStatus()`/`canExecute()` หรือไม่
- หากคีย์ของ provider ตัวหนึ่งล้มเหลวแต่ตัวอื่นควรทำงานได้ ให้เลือกใช้ connection cooldown
  มากกว่า provider breaker
- หากมีเพียงโมเดลเดียวที่ล้มเหลว ให้เลือกใช้ model lockout มากกว่า connection cooldown
- หากสถานะใดควรกู้คืนตัวเองได้ สถานะนั้นควรมี timestamp/reset timeout ในอนาคต และมี
  เส้นทางการอ่านที่รีเฟรชสถานะที่หมดอายุ ส่วนสถานะถาวรจำเป็นต้องเปลี่ยน credential
  หรือ config ด้วยตนเอง

---

## การระบุลายนิ้วมือ TLS และการซ่อนตัว (Stealth)

การซ่อนตัวเฉพาะผู้ให้บริการ (JA3/JA4, CCH, obfuscation) มีเอกสารแยกต่างหาก — ดู `docs/security/STEALTH_GUIDE.md` (git; ไม่ได้คอมไพล์รวมอยู่ใน `/docs`)

---

## การทดสอบความทนทาน (Phase 8 · Block C)

นอกเหนือจาก unit test สำหรับตรรกะด้านความทนทานแล้ว ยังมีการทดสอบอีกสามรายการที่ทดสอบ runtime ภายใต้สภาวะที่มีภาระหนัก/ข้อขัดข้องจริง (ทั้งหมดเป็น integration/nightly — ไม่มีตัวไหนบล็อก PR):

| การทดสอบ    | รายละเอียด                                                                                                                                                             | วิธีรัน                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | โหนด fake-upstream ฉีด latency/reset/timeout/503 จริงเข้าไป; ตรวจสอบว่า circuit breaker เปิด/ฟื้นตัว และ `checkFallbackError` จัดประเภท 503 เป็น fallback ที่กู้คืนได้ | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | สตรีม ~500 รายการต่อ `createSSEStream` ภายใต้ `--expose-gc`; ล้มเหลวหาก heap เติบโตเกินเพดานที่กำหนด (ตัวป้องกัน OOM #3069)                                            | `npm run test:heap`                      |
| k6 soak     | โหลดต่อเนื่องยิงไปยัง `/api/monitoring/health`; มีเกณฑ์ p95/error                                                                                                      | `k6 run tests/load/k6-soak.js` (nightly) |

ประสานงานโดย `.github/workflows/nightly-resilience.yml` (cron + dispatch) ใน `test:integration` แบบค่าเริ่มต้น การทดสอบ chaos และ heap จะข้ามตัวเอง (หากไม่มี `RUN_CHAOS_INT`/`--expose-gc`)

---

## ดูเพิ่มเติม

- [คู่มือสถาปัตยกรรม](./ARCHITECTURE.md) — สถาปัตยกรรมระบบและการทำงานภายใน
- [คู่มือผู้ใช้](../guides/USER_GUIDE.md) — ผู้ให้บริการ คอมโบ และการผสานรวม CLI
- [กลไก Auto-Combo](../routing/AUTO-COMBO.md) — การให้คะแนน 16 ปัจจัย ชุดโหมด (mode packs)
