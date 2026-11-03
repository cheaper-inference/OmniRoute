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

**ขอบเขต:** ผู้ให้บริการรายเดียว connection/account/key.

**วัตถุประสงค์:** ข้ามคีย์ที่ไม่ถูกต้องไปหนึ่งคีย์ในขณะที่การเชื่อมต่ออื่นๆ สำหรับผู้ให้บริการรายเดียวกันยังคงให้บริการอยู่

**การนำไปปฏิบัติ:**

- ทำเครื่องหมายว่าไม่พร้อมใช้งาน: `src/sse/services/auth.ts::markAccountUnavailable()`
- การเลือก: `getProviderCredentials*` ในไฟล์เดียวกัน
- การคำนวณคูลดาวน์: `open-sse/services/accountFallback.ts::checkFallbackError()`
- การตั้งค่า: `src/lib/resilience/settings.ts`

**ฟิลด์ต่อการเชื่อมต่อ:**

- `rateLimitedUntil` — ประทับเวลาจนกว่าคูลดาวน์จะหมดลง
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ตัวนับแบ็คออฟเอ็กซ์โปเนนเชียล

**คูลดาวน์เริ่มต้น:**

- ฐาน OAuth : 5 วินาที
- ฐานคีย์ API: 3 วินาที
- API-key 429: ชอบข้อความรีเซ็ตอัปสตรีม `Retry-After`/reset headers/parseable
- แบ็คออฟ: `baseCooldownMs * 2 ** failureIndex`

**ต่อผู้ให้บริการลองใหม่ล่าช้า** หน้ารายละเอียดผู้ให้บริการมี** ลองล่าช้าอีกครั้ง** เลือก (อัตโนมัติ, 15 วินาที ถึง 1 ชั่วโมง) มันบันทึก `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600 ถึง `PATCH /api/resilience`) เมื่อข้อผิดพลาดขีดจำกัดอัตราไม่มีคำแนะนำในการลองอัปสตรีมใหม่ ค่านั้นจะแทนที่การถอยกลับที่ปรับขนาดสำหรับผู้ให้บริการ และรีเซ็ต `backoffLevel` เป็น 0 (`open-sse/services/rotationConfig.ts::overrideFor`) ลำดับความสำคัญของข้อผิดพลาดที่จำกัดอัตรา โดยสูงสุดอยู่ก่อน: คำแนะนำในการลองอัปสตรีมอีกครั้ง จากนั้นต่อการเชื่อมต่อ `providerSpecificData.rotationOverrides.rateLimitResetSeconds` จากนั้นต่อความล่าช้าในการลองใหม่ต่อผู้ให้บริการ จากนั้น env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` จากนั้นจึงปรับขนาดแบ็คออฟ อัตโนมัติลบฟิลด์ โดยจะมีผลกับเหตุผลในการจำกัดอัตราเท่านั้น โดยจะไม่ส่งผลต่อสถานะเทอร์มินัล

**ป้องกันฝูงฟ้าผ่า:** ป้องกันความล้มเหลวที่เกิดขึ้นพร้อมกันจากการขยายคูลดาวน์มากเกินไปหรือการเพิ่มค่า `backoffLevel` เป็นสองเท่า

**ขีดจำกัดการเกิดพร้อมกัน 429 จะไม่ไต่ขึ้นบันไดแบ็คออฟ** `429` ที่เนื้อหารายงานขีดจำกัดการทำงานพร้อมกัน ("คำขอพร้อมกันมากเกินไป", "ขีดจำกัดการทำงานพร้อมกัน", "ขีดจำกัดคำขอแบบขนาน", GLM `并发数过高`) หมายความว่าบัญชีมีประสิทธิภาพดีแต่ไม่ว่าง `checkFallbackError()` ส่งคืนเหตุผล `concurrency_limited`: เฟลโอเวอร์ไปยังการเชื่อมต่อถัดไปตอนนี้ ทำให้การเชื่อมต่อนี้เย็นลงสำหรับ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) คงที่หรือคำแนะนำในการลองอัปสตรีมใหม่ เก็บ `backoffLevel` ไม่เปลี่ยนแปลง และตั้งค่า `skipProviderBreaker` เนื้อความโควต้าที่ชัดเจนยังคงชนะ ดังนั้นเนื้อความที่ตรงกับรูปแบบโควต้าจะยังคงตัดสินโควต้า การตรวจจับ: `looksLikeConcurrencyLimit()` ใน `src/shared/utils/classify429.ts`; คำตัดสิน: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (ของเบรกเกอร์ `FailureKind`) ไม่มีการเปลี่ยนแปลงและยังคงอ่าน `rate_limit` สำหรับเนื้อหาเหล่านี้

**แผงขายเนื้อหาสตรีมไม่ทำให้บัญชีเย็นลง** เมื่อ content-stall watchdog (`open-sse/utils/streamHandler.ts`) ยอมแพ้กับสตรีมที่ไม่ได้ส่งเอาต์พุตโมเดลทันเวลา `markAccountUnavailable()` จะบันทึกข้อผิดพลาดในการเชื่อมต่อแต่ไม่ได้ตั้งค่าคูลดาวน์: แผงลอยเป็นของคำขอนั้น ซึ่งส่วนใหญ่มักจะเป็นการเปลี่ยนเหตุผลระยะยาวโดยยังไม่มีเอาต์พุต ผู้ดำเนินการสามารถเลือกกลับเข้าร่วมด้วย `resilienceSettings.streamStallCooldown.enabled` (ค่าเริ่มต้น `false`)

**สัญญาณเวลาในการตอบสนองสำหรับการเลือกบัญชี `p2c`** ความพยายามที่ส่งแต่ละครั้งจะบันทึกเวลาเป็นไบต์แรกและผลลัพธ์ต่อการเชื่อมต่อ (และต่อโมเดล + การเชื่อมต่อ) ในหน้าต่างกลิ้งในหน่วยความจำ: 20 ตัวอย่างสุดท้ายภายใน 15 นาที (`open-sse/services/connectionLatencyTracker.ts` บันทึกจาก `safeLogEvents()` ใน `src/sse/handlers/chatHelpers.ts`) เมื่อ `resilienceSettings.p2cLatency.weight` อยู่เหนือ `0` (ช่วง 0-20, ค่าเริ่มต้น `0` ปิด = ) `compareP2CConnections()` ใน `src/sse/services/auth.ts` จะเพิ่มคะแนน `weight` สูงสุดให้กับผู้สมัครแต่ละคนของคู่นั้น ครึ่งหนึ่งมาจากเวลาแฝงซึ่งเป็นอัตราส่วนต่อตัวเลือกที่เร็วกว่า (ช้าสองเท่าใช้เวลาครึ่งหนึ่งเต็ม) และอีกครึ่งหนึ่งมาจากอัตราข้อผิดพลาดแบบกลิ้ง คำนี้ใช้เฉพาะเมื่อผู้สมัครทั้งสองมีตัวอย่างอย่างน้อย 3 ตัวอย่าง ดังนั้นบัญชีใหม่จะไม่ถูกลงโทษ และเพดานยังคงอยู่ต่ำกว่าบทลงโทษที่ถูกบล็อคโควต้าและโควต้าหมด มันไม่ได้เพิ่มวงจรของตัวเอง: บัญชีที่ล้มเหลวยังคงได้รับการจัดการโดยเลเยอร์คูลดาวน์ การล็อกเอาต์ และเบรกเกอร์ ตั้งค่าด้วย `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`

**เฟรมเหตุผลรีสตาร์ทงบประมาณแผงเนื้อหา** โมเดลการใช้เหตุผลสามารถคิดเป็นเวลาหลายนาทีก่อนโทเค็นที่มองเห็นได้ครั้งแรก: Claude สตรีมเฟรม `thinking_delta` ซึ่งข้อความการคิดอาจว่างเปล่า และ Responses API จะสตรีมรายการการให้เหตุผลทีละรายการ `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) จดจำเฟรมเหล่านี้ และโปรแกรมเฝ้าระวังจะรีสตาร์ทงบประมาณในแต่ละเฟรม แทนที่จะยกเลิกเทิร์น ยังคงไม่ใช่เอาต์พุตของโมเดล ดังนั้นเทิร์นที่ลงท้ายด้วยการใช้เหตุผลเพียงอย่างเดียวยังคงรายงานว่าว่างเปล่า และเทิร์นที่หยุดการให้เหตุผลและส่งเฉพาะการเต้นของหัวใจเท่านั้นที่ยังคงสะดุดกับสุนัขเฝ้าบ้าน

เฟรม `reasoningContentEvent` ไบนารี่ของ Kiro ที่มีลายเซ็นที่ไม่ว่างเปล่าจะรักษากิจกรรมการให้เหตุผลนี้ผ่านตัวดำเนินการเป็นเดลต้า `reasoning_content` ที่ว่างเปล่า ลายเซ็นจะไม่ถูกส่งต่อ ข้อมูลเมตา เฟรมที่ไม่สมบูรณ์ และลายเซ็นว่างเปล่าไม่ได้เริ่มงบประมาณเนื้อหาใหม่ การหมดเวลาใช้งานสตรีมอิสระและการยกเลิกไคลเอ็นต์ยังคงมีผล (`open-sse/executors/kiro/reasoning.ts`)

**สถานะเทอร์มินัล (คูลดาวน์NOT ):**

- `banned` — ตั้งค่าโดยการแบนคำหลัก / การตรวจจับการแบนบัญชี (ดู [BAN_DETECTION](../security/BAN_DETECTION.md) ) และโดยการปฏิเสธอัปสตรีมต่อคำขอสามครั้งติดต่อกัน (`request_rejected` เช่น Anthropic OAuth 403 "ไม่อนุญาตคำขอ" — `open-sse/services/requestRejectedStreak.ts`); การปฏิเสธเพียงครั้งเดียวจะทำให้การเชื่อมต่อเย็นลงเท่านั้น
- `expired` (เปลี่ยนไปใช้เทอร์มินัลหลังจากลองจำกัดขอบเขตแล้ว — `EXPIRED_RETRY_MAX = 3` พร้อมด้วย exponential backoff — ดังนั้นข้อผิดพลาด OAuth ชั่วคราวสามารถรักษาตัวเองได้ก่อนที่บัญชีจะถูกปิดการใช้งานอย่างถาวร)
- `credits_exhausted`

สิ่งเหล่านี้จะคงอยู่จนกว่าข้อมูลรับรองจะเปลี่ยนไปหรือผู้ปฏิบัติงานจะรีเซ็ตข้อมูลเหล่านั้น อย่าเขียนทับสถานะของเทอร์มินัลด้วยสถานะคูลดาวน์ชั่วคราว

**การกู้คืนที่ขี้เกียจ:** เมื่อ `rateLimitedUntil` ผ่านไป การเชื่อมต่อจะมีสิทธิ์อีกครั้ง เมื่อใช้สำเร็จ `clearAccountError()` จะล้างช่องข้อผิดพลาดทั้งหมด

### ผนังการใช้งาน Claude OAuth : เลนที่มีลำดับความสำคัญต่ำกว่า + รีเซ็ตขีดจำกัดเซสชัน

**ขอบเขต:** การเชื่อมต่อการสมัครสมาชิก Claude (OAuth) หนึ่งรายการ คุณสมบัติทั้งสองอย่างคือ** เลือกใช้ต่อการเชื่อมต่อ** (แก้ไขการเชื่อมต่อ → Claude ส่วน → `lowPriorityMode` / `autoLimitReset` ใน `providerSpecificData` ทั้งเป็นค่าเริ่มต้นปิด) และมิเรอร์คำสั่ง `/low-priority` และ `/limit-reset` ของรหัส Claude (สัญญาสายที่บันทึกจาก Claude Code 2.1.263)

**การนำไปปฏิบัติ:**

- การจำแนกประเภทการตอบสนอง + ของเครื่องสถานะ: `open-sse/services/claudeLowPriority.ts`
- รีเซ็ตไคลเอ็นต์ status/claim : `open-sse/services/claudeLimitReset.ts`
- ตะขอผู้ดำเนินการ (การฉีดส่วนหัว + ลองบัญชีเดียวกันอีกครั้ง): `open-sse/executors/base.ts::execute()`
- ความคงอยู่ของการเลือกใช้: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**สิ่งกระตุ้น:** กำแพงการใช้งาน 5 ชั่วโมง — a `429` ซึ่งส่วนหัวมี `anthropic-ratelimit-unified-status: rejected` และเมื่อบัญชีมีสิทธิ์ `anthropic-ratelimit-unified-slow-offer: treatment` ไม่มีการส่งสิ่งใดก่อนกำแพงแรกนั้น 429; การระเบิด 429 โดยไม่มีส่วนหัวแบบรวมจะผ่านเส้นทางคูลดาวน์ปกติ

**เลนที่มีลำดับความสำคัญต่ำกว่า** (`lowPriorityMode`):

- บนผนัง 429 ผู้ดำเนินการยอมรับข้อเสนอและลองอีกครั้งทันที** เดียวกัน** บัญชีกับ `anthropic-usage-limit: slow`; เลนจะยังคงทำงานอยู่จนกว่าจะมีการประกาศ `anthropic-ratelimit-unified-reset` (+ 60s Grace) และทุกคำขอในหน้าต่างนั้นจะมีส่วนหัว การสกัดกั้น 429 ไม่ถึง `handleChatCore` ดังนั้นการเชื่อมต่อจึงเป็นเช่นนั้น** ไม่** ติดคูลดาวน์และไม่หมุนออกไป
- `anthropic-ratelimit-unified-slow-status` ในการตอบกลับในภายหลัง: `active` / `not_needed` เก็บเลน; `slot_busy` (429) หรือ `529` รอ `anthropic-ratelimit-unified-slow-retry-after` ของเซิร์ฟเวอร์ (ค่าเริ่มต้น 20 วินาที, แคลมป์ 5–600 วินาที, ± 30% กระวนกระวายใจ) แล้วลองอีกครั้ง ขอบเขตด้วย `anthropic-ratelimit-unified-slow-max-wait` (ค่าเริ่มต้น 20 นาที, แคลมป์ 1 นาที–6 ชั่วโมง) — เลยผ่านไปที่เลนสิ้นสุดและบล็อกการยอมรับเย็นลง 10 นาที การรอยังถูกจำกัดด้วยสิ่งที่เหลืออยู่ของการหมดเวลาเริ่มต้นอัพสตรีมของคำขอ (`resolveFetchStartTimeout` โดยค่าเริ่มต้น 10 นาที) ลบด้วยระยะขอบ 5 วินาที: หากไม่มีการจำกัดดังกล่าว การรอสูงสุดเริ่มต้น 20 นาทีจะคงอยู่นานกว่าคำขอ และโหมดสลีปจะถูกยกเลิกกลางคัน โดยปรากฏ `TimeoutError` แทนที่จะเป็นการระบายความร้อนด้วย `max_wait` end + ที่สง่างาม
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible` โรลโอเวอร์หน้าต่าง 5h หรือ `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ซึ่งลงท้ายด้วย `extra_usage` ในสถานะใด ๆ เนื่องจากส่วนที่จ่ายเกินตอนนี้ครอบคลุมกำแพง) สิ้นสุดเลน การตอบสนองจะไหลไปสู่เส้นทางคูลดาวน์ปกติ `budget_exhausted` จะถูกจดจำจนกว่าจะมีการรีเซ็ตงบประมาณที่ประกาศ (≤ 8 วัน)
- การตรวจสอบผนังจะดำเนินการหลังจากความพยายามภายในที่ขับเคลื่อนด้วย 400 ของผู้ดำเนินการเอง (การแก้ไขบริบท, ที่หนีบ thinking/effort, การเรียนรู้อัตโนมัติของพารามิเตอร์) ดังนั้นกำแพง 429 ที่พื้นผิวเพียงหนึ่งครั้งในการลองใหม่เหล่านั้นยังคงถูกสกัดกั้น แทนที่จะไปถึงเส้นทางคูลดาวน์
- สถานะอยู่ในหน่วยความจำต่อการเชื่อมต่อ (การรีสตาร์ทมีค่าใช้จ่ายเพิ่มอีกหนึ่งกำแพง 429 เพื่อยอมรับอีกครั้ง)

**รีเซ็ตขีดจำกัดเซสชัน** (`autoLimitReset` ลองก่อนเลนเมื่อทั้งคู่เปิดอยู่):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` บล็อก; เมื่อ `arm: "reset"` และ `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` กับ `{ "program": "juniper_tide" }` (องค์กร UUID จาก `providerSpecificData.organizationUUID`, bootstrap ทางเลือก)
- `result: reset|not_limited` → คำขอจะถูกลองอีกครั้งด้วยความเร็วสูงสุด (ไม่มีส่วนหัวที่ช้า) `already_used` / `not_offered` memoise `next_available_at` (ค่าเริ่มต้นหนึ่งสัปดาห์); ความล้มเหลวใด ๆ จะถอยออกไป 15 นาที การรีเซ็ตจะเกิดขึ้นสัปดาห์ละครั้งและยังคงนับรวมในขีดจำกัดรายสัปดาห์

ยามการถดถอย: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`

### ความเกี่ยวข้องของเซสชัน (#7274)

**ขอบเขต:** เซสชันไคลเอนต์หนึ่งรายการ (ส่วนหัว `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) ถูกตรึงไว้ที่การเชื่อมต่อเดียวสำหรับ** ใดๆ** ผู้ให้บริการ

**วัตถุประสงค์:** รักษาตัวแทนแบบหลายรอบ (รหัส Claude, aider, ตัวแทนแบบกำหนดเอง) ในบัญชีเดียวกันข้ามคำขอ ลดการสูญเสียบริบทข้ามบัญชีและการเริ่มต้นเย็น 429 ซ้ำกับผู้ให้บริการที่มีสถานะเซสชันต่อบัญชี

**การนำไปปฏิบัติ:**

- ความละเอียด TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ปักหมุด selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- การแยกส่วนหัว (ทั่วไป ผู้ให้บริการใดๆ): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- ตารางพินที่คงอยู่: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- การตั้งค่า: `sessionAffinityTtlMs` ( TTL ทั่วโลกในหน่วย ms, `0` ปิดการใช้งาน) — `src/lib/db/settings.ts` เปลี่ยนชื่อจาก `codexSessionAffinityTtlMs` ของ Codex เท่านั้นโดยการย้าย `124_generic_session_affinity_ttl.sql` ซึ่งดำเนินการผ่าน Codex TTL ที่กำหนดค่าไว้ก่อนหน้านี้เป็นค่าเริ่มต้นใหม่

ก่อนหน้า #7274 `resolveSessionAffinityTtlMs()` ได้รับการประกันตัวอย่างหนักเป็น `0` สำหรับผู้ให้บริการทุกรายยกเว้น `codex` ดังนั้นการตั้งค่า TTL (และส่วนหัวของเซสชัน) จึงไม่มีผลกระทบใดๆ เลย แม้ว่ากลไกการปักหมุดและการแยกส่วนหัวจะไม่เชื่อเรื่องพระเจ้าของผู้ให้บริการแล้วก็ตาม การแก้ไขได้ลบการกลับมาก่อนกำหนดนั้น ตอนนี้ TTL ใช้เหมือนกันกับผู้ให้บริการทุกรายเมื่อตั้งค่าทั่วโลกไว้เหนือ `0`

ส่วนหัวที่สัมพันธ์กับเซสชันทั้งสามจะไม่ถูกส่งต่อ ตัวดำเนินการ — อัปสตรีมจะสร้างส่วนหัวอัปสตรีมของตนเองตั้งแต่เริ่มต้น แทนที่จะส่งส่วนหัวของไคลเอ็นต์ผ่าน ดังนั้นนี่จึงเป็นรหัสความสัมพันธ์ภายในเท่านั้น

### สัญญาเช่าการเชื่อมต่อเซสชันที่ได้รับการจัดการพิเศษ

**ขอบเขต:** หนึ่ง HTTP ที่ได้รับการจัดการที่ใช้งานอยู่ client/session เป็นเจ้าของการเชื่อมต่อ OmniRoute ที่มีสิทธิ์หนึ่งการเชื่อมต่อ

**วัตถุประสงค์:** มอบความเป็นเจ้าของการเชื่อมต่อพิเศษที่คงทนสำหรับลูกค้าที่ต้องการรั้วการกำหนดเส้นทางที่เข้มงวดข้ามคำขอ สิ่งนี้แตกต่างจากความสัมพันธ์ของเซสชัน ซึ่งเป็นการตั้งค่าความต่อเนื่องแบบนุ่มนวล: การเช่าแบบเอกสิทธิ์เฉพาะบุคคลยังคงอยู่ในสถานะวงจรการใช้งานใน SQLite บังคับใช้เจ้าของที่ใช้งานอยู่ทั่วโลกและการเชื่อมต่อที่ใช้งานอยู่เฉพาะ และปฏิเสธการสร้างเก่าก่อนที่จะส่งผู้ให้บริการ

คุณลักษณะนี้เลือกใช้ตามคีย์ API คีย์ที่ได้รับการจัดการจะต้องมีขอบเขต `lease:exclusive` และรายการ `allowedConnections` ที่ไม่ว่างเปล่าอย่างชัดเจน ไคลเอ็นต์ HTTP ใดๆ สามารถใช้จุดสิ้นสุดวงจรการใช้งานได้ ไม่จำเป็นต้องมีชื่อไคลเอ็นต์, user-agent, ผู้ให้บริการ, วิธี OAuth หรือโมเดล สัญญาเช่าเป็นเจ้าของการเชื่อมต่อ ไม่ใช่แบบจำลอง ดังนั้นการเปลี่ยนแปลงแบบจำลองจะยังคงมีผลผูกพันในขณะที่การเชื่อมต่อยังคงมีสิทธิ์ตามปกติ โมเดลปกติ โควต้า สุขภาพ คูลดาวน์ และกฎรายการที่อนุญาตยังคงมีผลบังคับใช้และอาจเปลี่ยนรุ่นเดียวกันเป็นการเชื่อมต่อที่มีสิทธิ์แบบฟรีอื่น

วงจรชีวิตคือ `POST /api/v1/session-leases` โดยมีการดำเนินการ JSON `acquire`, `renew` และ `release` คำขออนุมานที่มีการจัดการจะแสดงค่า `X-OmniRoute-Lease-Owner` ทึบแสงและ `X-OmniRoute-Lease-Generation` ที่แน่นอน เจ้าของใช้ `vlo_` ตามด้วยอักขระ base64url 43 ตัว เก็บเฉพาะแฮช SHA-256 เท่านั้น ทุกรั้วการจัดส่งขั้นสุดท้ายยังผูกคีย์ API ที่ผ่านการรับรองความถูกต้อง ID และการเชื่อมต่อที่ใช้งานอยู่ ID ส่วนหัวการควบคุมการเช่าจะถูกลบออกจากบันทึก สแนปช็อตคำขอที่เก็บไว้ และส่วนหัวของตัวดำเนินการอัปสตรีม

หากการกำหนดเส้นทางแบบธรรมดามีผู้สมัครที่ได้รับการจัดการที่มีสิทธิ์ แต่ผู้สมัครอิสระทุกรายถูกครอบครองโดยสัญญาเช่าที่ใช้งานอยู่ต่างประเทศ OmniRoute ส่งคืน HTTP `429` รหัสการเช่า-ความจุ-ไม่พร้อมใช้งาน สถานะกำลังรอความจุ และขอบเขต `Retry-After` ที่ได้มาจากการหมดอายุที่เกี่ยวข้องเร็วที่สุด สิทธิ์ว่างธรรมดาไม่ใช่การโต้แย้งการเช่า และยังคงรักษาซีแมนทิกส์ข้อผิดพลาดในการกำหนดเส้นทางที่มีอยู่

กลไกที่เกี่ยวข้องยังคงแยกจากกัน:

- การเข้าใช้งานเซสชัน OAuth คือการแจกแจงแบบ soft ภายในกระบวนการสำหรับบัญชี OAuth
- เซมาฟอร์บัญชีให้อนุญาตคำขอพร้อมกันและสิ้นสุดเมื่อคำขอเสร็จสมบูรณ์
- สัญญาเช่าเซสชั่นที่ได้รับการจัดการพิเศษเป็นการเป็นเจ้าของวงจรชีวิตที่คงทนพร้อมกรอบการสร้าง

---

## 3. การล็อกโมเดล (Model Lockout)

**ขอบเขต:** ชุดค่า provider + connection + model

**ขอบเขตของคีย์ตามสถานะ:** สถานะที่ล้มเหลวเป็นตัวกำหนดว่าการล็อกจะเขียนไปยังคีย์ใด
(`resolveLockoutScope()` ใน `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — สัญญาณด้านโควตาหรือสิทธิ์การใช้งาน — ล็อกทั้ง**กลุ่มโควตา**:
  สำหรับ codex คือทั้งขอบเขต `codex` / `spark` (ทุกโมเดล `gpt-5*` ของ
  connection นั้น) สำหรับ provider อื่นใช้ `getQuotaScopedModelForProvider()`
- `404` ล็อกเฉพาะโมเดลนั้นโดยตรง (`getModelLockKey()` จำกัด `not_found` ให้แคบลง)
- สถานะอื่นใด — ความล้มเหลว `5xx` ระดับ transport/server และ `502` ที่ OmniRoute
  สังเคราะห์ขึ้นเองจากการตรวจสอบคุณภาพ — ล็อกเฉพาะชุดค่า
  provider/connection/model ที่แน่ชัด (exact) เท่านั้น stream ที่เสียของโมเดลเดียว
  ไม่ใช่หลักฐานเกี่ยวกับโควตาของบัญชี ก่อนหน้ากฎนี้ response ว่างเพียงครั้งเดียวบน
  `codex/gpt-5.6-luna` จะนำทุกโมเดล `gpt-5*` ของ connection นั้นออกจาก
  การกำหนดเส้นทางนาน 2–30 นาที (เพิ่มขึ้นเรื่อยๆ) ทั้งที่โควตายังไม่ได้ถูกแตะต้อง
- ตัวเลือก `scope` ที่ผู้เรียกระบุอย่างชัดเจนจะมีความสำคัญสูงสุดเสมอ (Antigravity ส่ง `"exact"`)

**วัตถุประสงค์:** หลีกเลี่ยงการปิดใช้งานทั้ง connection เมื่อมีเพียงโมเดลเดียวที่ไม่พร้อมใช้งานหรือถูกจำกัดโควตา

**ตัวอย่าง:**

- provider ที่กำหนดโควตาต่อโมเดลส่งคืน 429
- provider ภายในเครื่องส่งคืน 404 สำหรับโมเดลที่หายไปหนึ่งตัว
- ความล้มเหลวด้านสิทธิ์ของโหมด/โมเดลเฉพาะ provider (เช่น โหมดของ Grok)

**การนำไปใช้:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`

### แดชบอร์ด Model Cooldowns (v3.8.0)

UI: การตั้งค่า → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

แสดงรายการการล็อกที่ใช้งานอยู่พร้อมกับ: provider, connection, model, reason, expiresAt ผู้ดูแลระบบสามารถเปิดใช้งานโมเดลอีกครั้งด้วยตนเองจากการ์ดนี้ได้

**REST API:**

- `GET /api/resilience/model-cooldowns` — แสดงรายการการล็อกที่ใช้งานอยู่
- `DELETE /api/resilience/model-cooldowns` — เปิดใช้งานอีกครั้งด้วยตนเอง Body: `{provider, connection, model}` การยืนยันตัวตน: management

### ตัวจัดการ Cooldown

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)

หน้าเดียวสำหรับทุก connection ที่ถูกนำออกจากการกำหนดเส้นทางด้วยเหตุผลชั่วคราว
แทนที่จะต้องเปิดหน้าของแต่ละ provider หน้านี้แสดง connection cooldown
การล็อกโมเดล และสถานะสิ้นสุด (terminal states) ล้างค่าเหล่านั้นได้ทีละ connection
ตามที่เลือก หรือสำหรับทุก connection ของ provider หนึ่งๆ
และแก้ไขกฎ cooldown ที่ปรับจูนบ่อยที่สุด: `streamStallCooldown.enabled` และ
base cooldown กับจำนวนขั้นสูงสุดของ backoff ของ `connectionCooldown`
สำหรับ OAuth / API-key (บันทึกผ่าน
`PATCH /api/resilience`) สถานะสิ้นสุด (`banned`, `expired`, `credits_exhausted`)
จะถูกแสดงแต่จะไม่ถูกล้างที่นี่

**REST API** (`src/lib/resilience/cooldownManager.ts`, การยืนยันตัวตน: management):

- `GET /api/resilience/cooldowns[?provider=]` — connection พร้อมสถานะ cooldown
  ที่เหลือ ระดับ backoff ประเภทข้อผิดพลาดล่าสุด และการล็อกโมเดล (ไม่มีข้อมูลรับรอง)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` หรือ
  `{all: true, provider?}` ส่งคืน `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI การตั้งค่าการล็อก + การกู้คืนแบบ success-decay (v3.8.23)

การล็อกโมเดลเปลี่ยนจากพฤติกรรมที่เปิดตลอดและเขียนตายตัว (hardcoded)
มาเป็นฟีเจอร์แบบ opt-in ที่กำหนดค่าได้เต็มรูปแบบ พร้อมการ์ดตั้งค่าของตัวเอง
และเส้นทางการกู้คืนที่ซ่อมตัวเองได้

**การ์ดตั้งค่า:** การตั้งค่า → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)
การ์ดนี้**แตกต่าง**จาก `ModelCooldownsCard` แบบอ่านอย่างเดียวด้านบน
(ซึ่งเพียง _แสดงรายการ_ การล็อกที่ใช้งานอยู่) — การ์ดใหม่นี้ _กำหนดค่าพารามิเตอร์_
ค่าเริ่มต้นอยู่ใน `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| การตั้งค่า              | ค่าเริ่มต้น                      | ความหมาย                                                         |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `enabled`               | `false`                          | สวิตช์หลัก — การล็อกโมเดล**ปิดโดยค่าเริ่มต้น**                   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | สถานะ upstream ที่นับเป็นความล้มเหลวระดับโมเดล                   |
| `baseCooldownMs`        | `120_000` (120 วินาที)           | ระยะเวลาล็อกเริ่มต้นสำหรับความล้มเหลวครั้งแรก                    |
| `maxCooldownMs`         | `1_800_000` (30 นาที)            | เพดานของ cooldown ที่เพิ่มขึ้น                                   |
| `maxBackoffSteps`       | `10`                             | จำนวนขั้นสูงสุดของการเพิ่มระดับ exponential backoff              |
| `useExponentialBackoff` | `true`                           | กำหนดว่าความล้มเหลวซ้ำๆ จะเพิ่ม cooldown แบบ exponential หรือไม่ |

การตั้งค่าจะถูกบันทึกผ่าน settings store ปกติและตรวจสอบความถูกต้องผ่าน
resilience settings schema การ์ดจะจำกัดค่า `baseCooldownMs`/`maxCooldownMs`
(โดย `maxCooldownMs ≥ baseCooldownMs`) และ `maxBackoffSteps`

**การกู้คืนแบบ success-decay:** การกู้คืน**ไม่ใช่**เพียงการหมดเวลาของตัวจับเวลา
response ที่ปกติดีจะค่อยๆ ลดจำนวนความล้มเหลวของโมเดลลง
ดังนั้นโมเดลที่ฟื้นตัวกลางช่วงเวลาจะหยุดการเพิ่มระดับ (และถูกล้าง)
ก่อนที่ตัวจับเวลาจะหมด เมื่อเป้าหมายของ combo สำเร็จ
`open-sse/services/combo.ts` จะเรียก `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) ซึ่งจะ**ลดครึ่งหนึ่ง**ของ `failureCount`
ที่จัดเก็บไว้ (`Math.floor(failureCount / 2)`) เมื่อถึง `0`
รายการล็อกจะถูกลบออกทั้งหมด ฟังก์ชันคู่กัน `recordModelLockoutFailure()`
จะเพิ่มจำนวน (และเพิ่มระดับ cooldown) เมื่อเกิดความล้มเหลวภายในช่วงเวลาเพิ่มระดับ
success-decay นี้มาเพิ่มเติมจากการหมดเวลาปกติ —
เส้นทางใดเส้นทางหนึ่งก็สามารถเปิดใช้งานโมเดลอีกครั้งได้

**สถานะ:** การล็อกถูกเก็บไว้**ในหน่วยความจำ** (`Map` ต่อ process ของ
`ModelLockoutEntry` ที่ใช้คีย์ `provider:connectionId:model` ส่วนการล็อกแบบ
exact-scope ใช้คีย์ `provider:connectionId:exact:model`)
ไม่ได้บันทึกลง DB — จะหายไปเมื่อรีสตาร์ท _การตั้งค่า_จะถูกบันทึก
แต่_สถานะ_การล็อกที่ใช้งานอยู่นั้นชั่วคราว

---

## 4. การควบคุมการแบ่งปันโควต้า (v3.8.36)

บัญชีสมัครสมาชิก (GLM, MiniMax ฯลฯ ) มักจะยอมรับเฉพาะคำขอ ~ 1–3 ที่เกิดขึ้นพร้อมกันเท่านั้น เกินกว่านั้นจะทำให้เกิด 429 วินาทีและคูลดาวน์ นี่คือเฉียบพลันภายใต้** โควต้าแบ่งปัน** (`qtSd/…`) คอมโบ โดยที่คีย์ API หลายคีย์ใช้บัญชีอัปสตรีมร่วมกัน สามชั้นป้องกันไม่ให้บัญชีที่ใช้ร่วมกันถูกน้ำท่วม

### ขีดจำกัดการทำงานพร้อมกันต่อการเชื่อมต่อ (`max_concurrent`)

การเชื่อมต่อของผู้ให้บริการแต่ละรายสามารถประกาศเพดาน `max_concurrent` (`provider_connections.max_concurrent` ตั้งค่าใน modal การเชื่อมต่อ / API / DB) ปล่อยว่างไว้ไม่มีขีดจำกัด นี่คือปุ่มเดียวที่ขับเคลื่อนเลเยอร์การทำให้เป็นอนุกรมด้านล่าง — ตั้งค่าเป็นการทำงานพร้อมกันที่แท้จริงของบัญชี (เช่น GLM ~ 1, MiniMax ~ 2)

### ขีดจำกัดการทำงานพร้อมกันต่อรุ่น (`modelConcurrency`)

การเชื่อมต่อยังสามารถประกาศเพดานการทำงานพร้อมกันต่อรุ่นที่แน่นอนเพิ่มเติมภายในแผนที่ `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

ตั้งไว้ในโมดอลการเชื่อมต่อ (** ขีดจำกัดอัตราจะแทนที่ → ขีดจำกัดการทำงานพร้อมกันต่อโมเดล** , หนึ่ง `model=cap` ต่อบรรทัด) หรือผ่าน `PATCH /api/providers/[id]` ที่มีรูปร่าง JSON เหมือนกัน ความหมายที่สำคัญ:

- **การเชื่อมต่อทั่วทั้งเทียบกับเฉพาะรุ่น:** `maxConcurrent` ยังคงเป็นเพดานการเชื่อมต่อที่ใช้ร่วมกัน เมื่อทั้งสองใช้ เกตทั้งสองจะได้รับอะตอมในเกตคอมโพสิตเดียวกัน (`global → provider → account → model`) พฤติกรรมที่มีประสิทธิผลคือขีดจำกัดที่บังคับใช้ที่เข้มงวดยิ่งขึ้น
- **การจับคู่คีย์โมเดลที่ตรงกันทุกประการ:** กุญแจสำคัญคือสตริงโมเดลที่ส่งผ่านไปยังตัวดำเนินการหลังจากการกำหนดเส้นทางความละเอียด — โดยปกติแล้วจะเป็นรหัสโมเดลอัปสตรีมเปลือย (`glm-5`) ไม่ใช่นามแฝง `provider/model` ฝั่งไคลเอ็นต์ (`zai/glm-5` ไม่ตรงกับ `glm-5`) ค่าเป็นเพดานคำขอจำนวนเต็มบวกพร้อมกัน
- **การรอคิวในพื้นที่ ไม่มีการค้นพบ:** คำขอส่วนเกินเข้าคิวภายในเครื่องด้วยซีแมนทิกส์ queue/timeout ที่มีอยู่ (พิมพ์ข้อผิดพลาดการรับเข้า `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ) OmniRoute ไม่พบหรืออนุมานนโยบายอัปสตรีม — จะบังคับใช้เพดานที่แน่นอนตามที่ผู้ปฏิบัติงานกำหนดค่าไว้ ประตูโมเดลอิ่มตัวจะไม่ปิดการใช้งานผู้ให้บริการ และไม่เคยสร้างการล็อกโมเดลถาวร พฤติกรรม 429/cooldown/fallback ของอัปสตรีมยังคงเป็นแบ็คสต็อปข้อผิดพลาด
- **ขอบเขตต่อการเชื่อมต่อ ต่อกระบวนการ:** ตัวพิมพ์ใหญ่ต่อการเชื่อมต่อฐานข้อมูลและเก็บไว้ในหน่วยความจำ ดังนั้นการเชื่อมต่อสองรายการที่ใช้คีย์ API อัปสตรีมเดียวกันซ้ำจึงไม่ทำงานร่วมกัน
- **ไม่ได้กำหนดค่าหมายถึงไม่เปลี่ยนแปลง:** การละเว้นแผนที่ (หรือปล่อยให้ฟิลด์แดชบอร์ดว่าง) จะไม่มีการเพิ่มประตูแบบจำลอง ตัวอย่างการกำหนดค่าโดยไม่ต้องยืนยันขีดจำกัดของผู้ให้บริการสากล:

```text
glm-5=1
glm-4.7=3
```

### การซีเรียลไลซ์คำขอแบ่งใช้โควต้า

เมื่อการจัดส่งโควต้าแชร์กำหนดเป้าหมายการเชื่อมต่อที่ประกาศค่าบวก `max_concurrent` คำขอนั้นพร้อมกัน** บัญชี** ถูกทำให้เป็นอนุกรมผ่านเซมาฟอร์ต่อการเชื่อมต่อ (คีย์ `qsconn:<connectionId>`): คำขอที่มากเกินไป** รออยู่ในคิว** แทนที่จะท่วมบัญชี มันคือ** เปิดไม่สำเร็จ** — คิวที่อิ่มตัวหรือการหมดเวลาจะดำเนินการโดยไม่มีช่อง แทนที่จะปฏิเสธคำขอที่สามารถจัดส่งได้ สลับเข้า** การตั้งค่า → ความยืดหยุ่น → โควต้าแบ่งปันต่อการเชื่อมต่อพร้อมกัน** (`resilienceSettings.quotaShareConcurrencyLimit.enabled` เป็นค่าเริ่มต้น) หากไม่มี `max_concurrent` cap พฤติกรรมจะไม่เปลี่ยนแปลง

> ประตูการกำหนดเส้นทางการแบ่งโควต้า (`selectQuotaShareTarget`, DRR + P2C) นั้นเปิดไม่ได้และมีเพียง _deprioritizes_ การเชื่อมต่อ at-cap — พร้อมด้วยพูลการเชื่อมต่อเดี่ยวซึ่งไม่สามารถจำกัดได้ยาก ดังนั้นเซมาฟอร์นี้จึงเป็นสิ่งที่มีน้ำท่วมจริง

### ลองอีกครั้งโดยคำนึงถึงคูลดาวน์คอมโบ

สำหรับทุกกลยุทธ์คอมโบ (เมื่อเปิดใช้งาน) คำขอที่จะตกผลึก 429 สำหรับคูลดาวน์ชั่วคราว SHORT จะรอและจัดส่งใหม่แทนที่จะส่งคืน 429 — ซึ่งจะครอบคลุมหน้าต่าง TPM/RPM คลาส Gemini (~ 60 วินาทีลองใหม่หลังจาก) ในคอมโบหลายรุ่น เช่น เป้าหมายทั้งสองของคอมโบ 2 โมเดลที่มีอัตราจำกัดต่อโมเดล ล้อมรอบด้วย `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) ใน** การตั้งค่า → ความยืดหยุ่น** . มันไม่เคยรอ `quota_exhausted` (ล็อคจนถึงเที่ยงคืน) หรือเหตุผล auth/not-found

คำสั่งผสมสามารถเลือกไม่ใช้ `config.comboCooldownWaitEnabled: false` ได้ เฉพาะ `false` ตามตัวอักษรเท่านั้นที่ปิดใช้งานการรอคอมโบที่ใช้ร่วมกันเหล่านี้ (คูลดาวน์หลังการจัดส่งและการรอ circuit-open/model-lock ก่อนการจัดส่ง) และส่วนขยายการหมดเวลาการรองบประมาณรอ Missing หรือ `true` รักษานโยบายสากลไว้ `true` ไม่สามารถเปิดใช้งานการรอที่ปิดใช้งานทั่วโลกได้ `targetTimeoutMs` ที่ชัดเจนยังคงชนะ การเลือกไม่รับนี้จะไม่เปลี่ยนการรอก่อนการจัดส่งแบบ Native-Codex ที่แยกต่างหาก

เกตเดียวกันครอบคลุมกรณีก่อนการจัดส่ง (#16319): เมื่อทุกเป้าหมายของคอมโบถูกข้ามก่อนที่จะพยายามใดๆ เกิดขึ้น เนื่องจากโมเดลอยู่ในการล็อกเอาต์ชั่วคราวระยะสั้น พาธการพยายามเป็นศูนย์จะรอการล็อกไว้ใต้เพดานเดียวกันและจัดส่งใหม่ แทนที่จะตอบ `503 ALL_TARGETS_SKIPPED` ที่ไม่มีคำใบ้ เมื่อไม่อนุญาตให้รอ (เพดาน ความพยายามหรืองบประมาณหมด หรือคุณลักษณะปิด) การตอบสนองของเทอร์มินัลจะอัปเกรดเป็น `429 rate_limit_error` ที่มี `retry_after` / `reset_at` จากการหมดอายุการล็อกชั่วคราวที่เร็วที่สุด โควต้า การตรวจสอบสิทธิ์ และการล็อกที่ไม่พบ จะคงค่า Hint-less 503 ไว้

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

## 7. การตีความสถานะ Upstream ใหม่ (ข้อผิดพลาดโควตาที่รายงานสถานะผิด)

**ขอบเขต:** เกตเวย์ upstream แห่งเดียวที่รายงานการหมดโควตาชั่วคราวด้วยสถานะ HTTP ที่ไม่ถูกต้อง

**วัตถุประสงค์:** แก้ไขสถานะที่ทำให้เข้าใจผิดก่อนการจำแนกประเภท (classification) เพื่อให้ผู้ใช้ปลายทาง (fallback engine, combo aggregation, และ response ที่ส่งถึง client) เห็นธรรมชาติที่แท้จริงของความล้มเหลวว่าสามารถ retry ได้

เกตเวย์บางแห่งส่งสัญญาณการหมดโควตาชั่วคราวด้วยสถานะ HTTP ที่ไม่สามารถ retry ได้ `agentrouter.org` ส่งกลับ `403` (บางครั้ง `400`) พร้อมเนื้อความภาษาจีน (`用户额度不足` / `额度不足`) แทนที่จะเป็น `429` ตามมาตรฐาน Client อย่าง Claude Code ตีความ `403` เป็นความล้มเหลวถาวรและยกเลิกเซสชัน และหากไม่มีการแก้ไข fallback engine จะจำแนกมันเป็น `AUTH_ERROR` แทนที่จะเป็นเหตุการณ์โควตา

**การ implement:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — รายการกฎต่อ provider หนึ่งรายการ (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`) จับคู่ผ่าน `applyStatusRestatement()`
- จุดเรียกใช้: บล็อก `providerFailure:` ใน `open-sse/handlers/chatCore.ts` (ประมาณบรรทัดที่ 3654) ทันทีหลังจากที่ `parseUpstreamError()` แยกวิเคราะห์ response จาก upstream ที่มีสถานะ HTTP แสดงข้อผิดพลาด (`!providerResponse.ok`) และก่อนที่การจำแนกประเภทใด ๆ จะทำงาน เพื่อให้ผู้ใช้ปลายทางทุกตัวเห็นสถานะที่แก้ไขแล้ว ข้อผิดพลาดที่ฝังอยู่ภายใน SSE stream ที่มีสถานะ `200` จะไปตามเส้นทางการแยกวิเคราะห์ stream แยกต่างหากในภายหลัง และ**ไม่**อยู่ภายใต้ hook นี้ในปัจจุบัน — เป็นข้อจำกัดที่รู้กัน ซึ่งยังไม่จำเป็นสำหรับสถานะผิดของ agentrouter (ซึ่งปรากฏเป็นสถานะ HTTP แสดงข้อผิดพลาด)
- สิทธิ์ในการ retry: `429` อยู่ใน `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`) ดังนั้นข้อผิดพลาดที่ถูกตีความใหม่จึงมีช่วงเวลา retry ที่แท้จริง แทนที่จะปรากฏเป็น `403` ที่ตายสนิท
- `defaultRetryAfterMs` แบบสังเคราะห์ `60s` (`upstreamStatusRestatement.ts`) เป็นเพียงสิ่งที่ response ที่ถูกตีความใหม่บอกกับ **client** เท่านั้น มันไม่ใช่ระยะเวลา cooldown/lockout ภายในของ connection — ส่วนนั้นถูกควบคุมแยกต่างหากโดยกลไกที่จัดการข้อผิดพลาดที่ถูกตีความใหม่จริง ๆ (backoff ที่เพิ่มขึ้นเรื่อย ๆ ของ Connection Cooldown, §2, ฐาน `3s` สำหรับ provider แบบ API-key หรือ Model Lockout, §3 สำหรับ provider แบบ per-model-quota เช่น agentrouter) Router สามารถกลับมามีสิทธิ์ retry ภายในได้เร็วกว่าช่วงเวลา 60 วินาทีที่ประกาศให้ client ทราบ — เป็นส่วนเผื่อที่ตั้งใจไว้ ไม่ใช่บั๊ก

ข้อผิดพลาดถาวร (`无权访问模型` ของ agentrouter — ไม่มีสิทธิ์เข้าถึงโมเดลนี้) จะไม่ถูกตีความใหม่เสมอ: `excludeMarkers` คัดค้านกฎแม้ว่า `textMarkers` จะตรง ดังนั้นข้อผิดพลาดจึงคงสถานะเดิมไว้ และไม่มีอะไร retry มันไปตลอดกาล กฎการจำแนกประเภท provider ที่ตรงกัน (`agentrouter-model-access-denied` ใน `open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope: "model"`, มี base cooldown ที่ประกาศไว้ `6h`) ถูกปรึกษาโดย `checkFallbackError` (`open-sse/services/accountFallback.ts`) _ก่อน_ early-return แบบทั่วไปของหมวด apikey `FORBIDDEN` โดยมีเงื่อนไขที่ `honorsRuleLockScope(provider)` (#10334 — ปัจจุบันใช้เฉพาะ agentrouter ผ่าน allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ใน `providerErrorRules.ts`) cooldown 6 ชั่วโมงที่ประกาศไว้ของกฎไหลผ่านไปเป็น `fallbackResult.baseCooldownMs` แต่ยังคงป้อนเข้าสู่เส้นทาง lockout แบบ per-model-quota ที่มีอยู่เดิม (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()` ไม่เปลี่ยนแปลงโดย #10334 ยกเว้นแหล่งที่มาของ cooldown): มันถูก clamp ลงให้เท่ากับ `mlSettings.maxCooldownMs` ของผู้ดูแลระบบ (ค่าเริ่มต้น `1_800_000ms` / 30 นาที) เช่นเดียวกับ model lockout อื่น ๆ ทุกตัว และ _เหตุผล lockout ที่ถูกบันทึกถาวร_ ยังคงเป็น `"forbidden"` ที่ hardcode ไว้เดิม ไม่ใช่ `"auth_error"` ของกฎ — มีเพียงระยะเวลา cooldown เท่านั้นที่ถูกนำไปใช้ตลอดทั้งเส้นทาง ไม่ใช่สตริงเหตุผล ตัว connection เองยังคง active อยู่ โมเดลอื่น ๆ บน connection เดียวกันไม่ได้รับผลกระทบ

ข้อผิดพลาดโควตาที่ถูกตีความใหม่ (`额度不足`) ไปถึงกฎ provider ใน production (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope: "connection"`, ไม่มี cooldown ที่ประกาศไว้เอง — ใช้ค่าเริ่มต้น backoff แบบปรับสเกลของชั้น persistence) ตั้งแต่ #10334 เป็นต้นมา `scope` บน `ProviderErrorRuleMatch` ถูกนำไปใช้ตลอดทั้งเส้นทาง แต่**เฉพาะ**สำหรับ provider ที่อยู่ใน allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` — วันนี้มีเฉพาะ `"agentrouter"` ควบคุมผ่าน `honorsRuleLockScope()`) สำหรับ provider อื่นทุกตัว `scope` ยังคงเป็นเพียงข้อมูลประกอบ เช่นเดียวกับก่อน #10334 `checkFallbackError` แสดง scope ของกฎที่ตรงกันเป็น `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) คือ guard ที่ใช้ร่วมกันซึ่งยืนยันว่า `ruleScope` ปลอดภัยที่จะนำไปใช้เป็นสัญญาณระดับ connection ที่กู้คืนตัวเองได้อย่างแท้จริง (scope `"connection"`, reason `quota_exhausted`, ไม่เคยเป็น `permanent`, ไม่เคยเป็น `creditsExhausted` — เป็นการป้องกันกฎในอนาคตที่จับคู่ scope `"connection"` กับสถานะบัญชีถาวร) มีผู้ใช้สองรายที่เรียกใช้มัน:

- **การคงสถานะ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  แทนที่จะเข้าสู่แขนงการล็อก **รายโมเดล** ของผู้ให้บริการแบบส่งผ่าน
  (agentrouter มีค่า `passthroughModels: true` → `hasPerModelQuota()`
  คืนค่า `true`) ระบบจะใช้ **ช่วงพักการเชื่อมต่อชั่วคราว** —
  `testStatus: "unavailable"` + `rateLimitedUntil` โดยไม่กำหนดสถานะสิ้นสุดถาวร
  (`credits_exhausted`/`banned`/`expired`) — เพื่อให้การเชื่อมต่อกู้คืนได้เอง
  เมื่อช่วงพักสิ้นสุดลง แทนที่จะต้องรีเซ็ตข้อมูลประจำตัวด้วยตนเอง
  ระบบจะข้ามขั้นตอนนี้สำหรับการเชื่อมต่อที่มี `disableCooling: true` (#2997):
  การเลือกไม่ใช้ดังกล่าวจะเข้าสู่การล็อกรายโมเดลแทน (เป็นข้อแลกเปลี่ยนที่มีการบันทึกไว้ —
  ดูความคิดเห็นในโค้ดเหนือแขนงนี้)
- **การกำหนดเส้นทางแบบผสมภายในคำขอเดียวกัน** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): guard เดียวกันจะทำเครื่องหมาย
  การเชื่อมต่อไว้ในชุดข้อมูล `exhaustedConnections` ภายในหน่วยความจำ โดยใช้คีย์
  `${provider}:${connectionId}` การดำเนินการนี้จะข้ามเฉพาะเป้าหมายที่เหลือใน
  คำขอเดียวกันซึ่ง _มี `connectionId` เดียวกันนั้นอยู่แล้ว_ ในออบเจ็กต์เป้าหมาย
  ของตัวเอง (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ก่อนค้นหาใน `exhaustedConnections`) — ชุดผสมแบบรายการโมเดลธรรมดา
  ซึ่งเป้าหมายข้างเคียงไม่มี `connectionId` ที่ตรึงไว้เป็นของตัวเอง และระบบจะระบุ
  การเชื่อมต่อเฉพาะในแต่ละครั้งที่ส่งคำขอจากส่วนหัว
  `X-OmniRoute-Selected-Connection-Id` ของการตอบกลับ จะไม่มีทางพบคีย์ที่ตรงกันนั้น
  สำหรับกรณีทั่วไปนี้ กลไกป้องกันที่แท้จริงไม่ให้ส่วนที่เหลือนำบัญชีที่เพิ่งหมดโควตา
  กลับมาใช้ซ้ำจึงไม่ใช่ Set นี้ — แต่เป็นเลเยอร์การคงสถานะข้างต้น
  (`rateLimitedUntil` ของการเชื่อมต่อถูกกำหนดเป็นเวลาในอนาคตแล้ว) ร่วมกับ guard
  เดียวกันนี้ที่ระงับ `transientRateLimitedProviders` สำหรับความล้มเหลวดังกล่าว
  (ดู "การออกแบบสองขั้นตอน" และความคิดเห็นในโค้ดของแขนง
  `isAgentrouterConnectionQuotaScope` ใน `targetExhaustion.ts`): เมื่อ Set นั้น
  ไม่ถูกทำเครื่องหมาย การบังคับอนุญาตด้วย `allowRateLimitedConnection` ของ
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) จะไม่ทำงาน
  กับส่วนที่เหลือของผู้ให้บริการ ดังนั้นตัวกรอง `rateLimitedUntil` ของการเลือก
  ข้อมูลประจำตัว (`src/sse/services/auth.ts:1238`) จึงถูกใช้งานตามปกติ และส่วนที่เหลือ
  จะเลือกการเชื่อมต่อ agentrouter อื่นที่ยังใช้งานได้ หรือไม่ก็ล้มเหลวเนื่องจาก
  ไม่มีข้อมูลประจำตัวที่พร้อมใช้งาน — โดยจะไม่บังคับย้อนกลับไปใช้การเชื่อมต่อ
  ที่แขนงนี้เพิ่งกำหนดช่วงพักไว้

### การออกแบบสองขั้นตอน: กำหนดสถานะใหม่ แล้วจึงจัดประเภท

การกำหนดสถานะใหม่ (`upstreamStatusRestatement.ts`) และกฎการจัดประเภทผู้ให้บริการ
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`) เป็นรีจิสทรี
คนละชุดที่ต่างก็ใช้รหัสผู้ให้บริการและตัวบ่งชี้ข้อความเป็นคีย์ แต่ทำงานคนละตำแหน่ง
และมีวัตถุประสงค์ต่างกัน: การกำหนดสถานะใหม่จะแก้ไขสถานะ HTTP ตั้งแต่ช่วงต้นใน
`chatCore.ts`; ส่วนกฎการจัดประเภทจะเลือก `reason` สำรองและ `scope` ของการล็อก
(`model` / `provider` / `connection`) ภายใน `checkFallbackError()`
(`open-sse/services/accountFallback.ts`)

กฎการจัดประเภทจะมองเห็น **ข้อความ** ข้อผิดพลาดฉบับเต็มเท่านั้น (ซึ่งจำเป็นต่อการจับคู่
ตัวบ่งชี้ในเนื้อหา เช่น `额度不足`) สำหรับผู้ให้บริการที่อยู่ในรายการอนุญาต
`FULL_TEXT_RULE_PROVIDERS` ใน `providerErrorRules.ts` — ปัจจุบันมีเพียง
`"agentrouter"` สำหรับผู้ให้บริการรายอื่นทุกรายใน **แค็ตตาล็อกที่มีมาให้ในระบบ**
`checkFallbackError` จะส่งให้ `getProviderErrorRuleMatch` เฉพาะข้อผิดพลาดแบบมีโครงสร้าง
(`{code, type}`) ซึ่งเพียงพอสำหรับกฎที่อิงส่วนหัว/สถานะ/รหัส แต่ไม่สามารถตรวจจับ
ตัวบ่งชี้ในข้อความเนื้อหาได้ ตัวช่วย `resolveRuleMatchBody()` เป็นผู้ดำเนินการเลือกนี้:
ใช้ข้อความข้อผิดพลาดฉบับเต็มสำหรับผู้ให้บริการในรายการอนุญาต และใช้ข้อผิดพลาด
แบบมีโครงสร้างสำหรับรายอื่น การเพิ่มผู้ให้บริการ **ที่มีมาให้ในระบบ** ลงใน
`FULL_TEXT_RULE_PROVIDERS` เป็นการเลือกใช้โดยชัดแจ้งแยกตามผู้ให้บริการ —
กลไกนี้มีไว้เพื่อให้เส้นทางเริ่มต้นของผู้ให้บริการทุกรายที่ไม่อยู่ในรายการ
ยังคงเหมือนเดิมทุกไบต์

`scope` ของกฎ (`model` / `provider` / `connection`) เป็นการเลือกใช้ที่แยกต่างหาก
จาก `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` เพียงเปิดเผยค่านี้เป็น
`fallbackResult.ruleScope` และตัวใช้งานปลายทางจะปฏิบัติต่อค่านี้เป็นอย่างอื่น
นอกเหนือจากป้ายกำกับให้ข้อมูล เฉพาะสำหรับผู้ให้บริการที่อยู่ในรายการอนุญาต
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ในไฟล์เดียวกันเท่านั้น (ควบคุมผ่าน
`honorsRuleLockScope()` — ปัจจุบันมีเพียง `"agentrouter"`) ดูหัวข้อ
"ข้อผิดพลาดโควตาที่กำหนดสถานะใหม่" ด้านบนสำหรับรายละเอียดว่าการจับคู่
`scope: "connection"` จะทำอะไรจริงเมื่อผู้ให้บริการอยู่ในรายการอนุญาตดังกล่าว

**#11104 — กฎที่ผู้ปฏิบัติงานประกาศจะข้ามรายการอนุญาตทั้งสองรายการ**
ผู้ปฏิบัติงานสามารถประกาศกฎแยกตามผู้ให้บริการขณะรันไทม์ผ่าน
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
โดยไม่ต้องแก้ไขไฟล์นี้ การนำกฎของผู้ปฏิบัติงานไปควบคุมด้วย
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — ซึ่งเป็น
รายการอนุญาตที่มีไว้เพื่อปกป้องพฤติกรรม **เริ่มต้น** ของกฎในแค็ตตาล็อกที่มีมาให้ในระบบ —
จะทำให้กลไกการตั้งค่าไม่เกิดผลกับผู้ให้บริการทุกราย ยกเว้นรายที่มีอยู่ในรายการแล้ว
เนื่องจากการประกาศกฎก็คือการเลือกใช้อย่างชัดแจ้งของผู้ปฏิบัติงานอยู่แล้ว
ทั้ง `resolveRuleMatchBody()` และ `honorsRuleLockScope()` จะตรวจสอบ
`hasOperatorRuleForProvider()` ก่อน: ผู้ให้บริการที่มีกฎของผู้ปฏิบัติงานจะได้รับ
ข้อความข้อผิดพลาดดิบและมีการบังคับใช้ `scope` ที่ประกาศไว้ ไม่ว่าจะปรากฏอยู่ใน
รายการอนุญาตใดรายการหนึ่งด้วยหรือไม่ก็ตาม

**ช่องว่างที่ทราบ — ไม่มีการเรียกใช้ `providerRuleRegistry` สำหรับ HTTP 400**
แขนง `BAD_REQUEST` ของ `checkFallbackError` จะจัดประเภทสถานะ 400 ทั้งหมด
ผ่านอาร์เรย์รูปแบบของตัวเอง (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` และอื่น ๆ ใน `accountFallback.ts`) และคืนค่าก่อน
ที่จะไปถึงแขนง `configuredRule`/`getProviderErrorRuleMatch` ที่อยู่ด้านบน
กฎในแค็ตตาล็อกที่มีมาให้ในระบบ (หรือกฎของผู้ปฏิบัติงาน) ที่มี `status: 400`
มีไวยากรณ์ที่ถูกต้อง แต่จะไม่มีวันทำงาน ปัจจุบันไม่มีกฎใดกำหนดเป้าหมายเป็น 400
ดังนั้นจึงไม่มีสิ่งใดในระบบที่ใช้งานจริงได้รับผลกระทบ — แต่กฎ 400 ในอนาคต
จำเป็นต้องแก้ไขแขนงนี้ก่อน ซึ่งเป็นการเปลี่ยนแปลงที่ใหญ่กว่าการเพิ่มกฎ
(เพราะจะจัดประเภท 400 ใหม่สำหรับผู้ให้บริการทุกรายที่พึ่งพาพฤติกรรมของอาร์เรย์รูปแบบ
อยู่แล้ว) และอยู่นอกขอบเขตของการเพิ่มกฎสำหรับผู้ให้บริการเพียงรายเดียว

### การเพิ่มเกตเวย์ที่รายงานสถานะโควตาผิดพลาด

1. ลงทะเบียนอาร์เรย์กฎหนึ่งชุดใน `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) โดยต้องทำให้ `textMarkers`
   เฉพาะเจาะจงกับผู้ให้บริการแต่ละราย ห้ามนำวลีภาษาอังกฤษทั่วไปที่ชนกับ
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) มาใช้ซ้ำ
2. (ไม่บังคับ) ลงทะเบียนกฎการจำแนกประเภทใน
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) เพื่อเลือกขอบเขต
   การล็อกที่ถูกต้อง (`connection` สำหรับโควตาระดับบัญชี, `model` สำหรับ
   ข้อผิดพลาดระดับโมเดล) ขั้นตอนนี้จะมีผลใน production เฉพาะกับผู้ให้บริการ
   ที่กฎของตนต้องการข้อความข้อผิดพลาดแบบเต็ม (body markers): ให้เพิ่ม provider id
   ลงใน `FULL_TEXT_RULE_PROVIDERS` ในไฟล์เดียวกัน — มิฉะนั้น
   `checkFallbackError` จะส่งเฉพาะข้อผิดพลาดที่มีโครงสร้าง `{code, type}`
   ให้กับกฎเสมอ และกฎที่อิงข้อความ body จะไม่มีวันตรงกับทราฟฟิกจริง
   กฎที่ตรงจาก `status`/`headers` เพียงอย่างเดียว (เช่น ของ Opencode หรือ
   Minimax) ไม่จำเป็นต้อง opt-in นี้ อีกประการหนึ่ง หากกฎประกาศ
   `scope: "connection"` และเจตนาคือการคูลดาวน์ทั้งการเชื่อมต่อจริง พร้อมข้าม
   combo ในรีเควสต์เดียวกัน (ไม่ใช่แค่ป้ายกำกับเพื่อให้ข้อมูล) ให้เพิ่ม
   provider id ลงใน `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ในไฟล์เดียวกัน —
   นี่คือสิ่งที่ควบคุมการใช้งานสไตล์ `isAgentrouterConnectionQuotaScope()` ใน
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) และ
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) หากไม่มีสิ่งนี้ `scope`
   จะยังคงไหลผ่าน `fallbackResult.ruleScope` แต่จะไม่มีอะไรนำไปใช้งาน
3. เพิ่ม unit test โดยอิงตาม `tests/unit/upstream-status-restatement.test.ts`
   และ `tests/unit/agentrouter-error-rules.test.ts` (รวมถึง guard สำหรับ
   not-permanent / not-creditsExhausted และ — หากผู้ให้บริการต้องการ allowlist —
   เทสต์ที่ยืนยันว่า `resolveRuleMatchBody()` คืนข้อความเต็มเฉพาะสำหรับ
   ผู้ให้บริการนั้น)

ไม่จำเป็นต้องเปลี่ยนแปลง `chatCore.ts`, `classifyError` หรือ combo แต่อย่างใด

#### การล็อกแบบกลุ่ม egress (#10880)

ผู้ให้บริการใน `EGRESS_BUCKETED_LOCK_PROVIDERS` (กลุ่ม opencode) จะถูกปฏิบัติ
เหมือน upstream ที่จัดกลุ่มตาม IP (free tier ของ opencode จัดกลุ่มตาม IP
ไม่ใช่ตามบัญชี — ดู #9611): เมื่อ status-429 ถูกจำแนกเป็น `quota_exhausted`
**หรือ** `rate_limit_exceeded` การเชื่อมต่อทุกตัวในกลุ่มที่อยู่ใน allowlist
ซึ่งมี egress IP ล่าสุดที่ทราบตรงกับของการเชื่อมต่อที่ล้มเหลว จะถูกคูลดาวน์
ก่อนที่ rotation จะได้ลองใช้งาน
— เพื่อหลีกเลี่ยงการเรียก upstream ที่รับประกันว่าล้มเหลว N-1 ครั้ง (รูปแบบเดียวกับ #10460/#10525)
การรวม `rate_limit_exceeded` นั้นตั้งใจไว้โดยเจตนา: บนเส้นทาง `markAccountUnavailable`
กฎเฉพาะของ opencode จะไม่ตรงเลย (ไม่มี headers/body ถูกส่งให้
`checkFallbackError`, opencode ไม่ได้อยู่ใน `FULL_TEXT_RULE_PROVIDERS`) ดังนั้น
429 ที่ body มีข้อความโควตาสมาชิก ("monthly usage limit
reached") จะถูกจำแนกเป็น `quota_exhausted` โดย quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; คูลดาวน์ 1 ชั่วโมง)
ก่อนที่กฎ `status_429` จะถูกพิจารณา — ขณะที่ 429 ที่ไม่มีข้อความโควตา
(rate limiting ธรรมดา) จะถูกจำแนกผ่านกฎ `status_429` เป็น `rate_limit_exceeded`
และยังคงคูลดาวน์กลุ่ม IP นั้นอยู่ดี สำหรับผู้ให้บริการที่อยู่ใน allowlist
rate limit แบบจัดกลุ่มตาม IP คือสัญญาณเดียวกับโควตาที่หมดไป ข้อจำกัดที่ต้องยอมรับ:

- **แบบพยายามเต็มที่ (best-effort)**: ล็อกจะแกะหา `egress_ip` ล่าสุดที่ทราบ
  ของการเชื่อมต่อจาก `proxy_logs` (ช่วงย้อนหลัง 24 ชั่วโมง แบบ synchronous
  ไม่มีแคช) กรณีแคชว่าง (ไม่เคยตรวจสอบ egress IP มาก่อน) หรือไม่มีแถวข้อมูล
  → การเชื่อมต่อที่ล้มเหลวยังคงถูก cool โดย branch นั้น (บันทึกเหมือนปัจจุบัน)
  เพียงแต่ไม่มี sibling ใดถูกล็อก
- **ไม่เป็นสถานะสิ้นสุดเสมอ (never terminal)**: cooldown คือหน้าต่างโควต้าที่
  ต่ออายุได้ (`testStatus: "unavailable"`); สถานะถาวรจะไม่ถูกอนุมานมาจาก
  สัญญาณระดับ IP เสมอไป การเชื่อมต่อแบบ `disableCooling` จะข้าม branch
  นี้ไปทั้งหมด
- **ความละเอียดของล็อกเปลี่ยนไปสำหรับตระกูลที่อยู่ใน allowlist**: นี่คือการ
  เปลี่ยนขอบเขต ไม่ใช่เพียงการเพิ่มประสิทธิภาพ sibling opencode เป็น
  provider แบบ `passthroughModels` ดังนั้นก่อน branch นี้ 429 จะทำให้เกิด
  การล็อกเอาต์ระดับต่อ-MODEL; ตอนนี้มันสร้าง connection cooldown แทน —
  รวมถึงกรณี operator ที่รันการเชื่อมต่อเพียงตัวเดียวโดยไม่มี sibling เลย
  นั่นคือความละเอียดที่ตารางกฎของ opencode ประกาศไว้แล้วว่าถูกต้อง
  (`scope: "connection"`, `providerErrorRules.ts`) แต่ยังไม่เคยถูกใช้จริง
  เพราะ opencode ไม่ได้อยู่ใน `HONORS_RULE_LOCK_SCOPE_PROVIDERS` branch
  นี้เขียน cooldown + `backoffLevel` ของการเชื่อมต่อที่ล้มเหลวเอง โดยเลียนแบบ
  branch ของ agentrouter ที่ใช้ขอบเขตระดับ connection แล้ว return —
  การบล็อกแบบต่อ-model และเส้นทางทั่วไปด้านล่างจะไม่ถูกเรียกถึงเลย
- **รวม combo ด้วย**: เช่นเดียวกับ branch ของ agentrouter ขอบเขตนี้จงใจ
  เพิกเฉยต่อการลดระดับ `persistUnavailableState`/`isCombo` ที่ผู้เรียกแบบ
  combo ใช้กับ 429 การล็อกเอาต์แบบต่อ-model ไม่ใช่รูปแบบที่อ่อนกว่าของ
  ขอบเขตนี้ แต่เป็นหน่วยที่ผิด: มันไม่ได้บอกอะไรเลยเกี่ยวกับ IP ที่หมดโควต้า
  ดังนั้นการหมุนเวียน combo จะยังคงเผาการเรียกที่การันตีว่าล้มเหลวหนึ่งครั้ง
  ต่อ sibling หนึ่งตัว
- **ความปลอดภัยของ sibling**: sibling ที่เป็นสถานะสิ้นสุดอยู่แล้ว
  (banned/credits_exhausted) หรืออยู่ใน cooldown ที่ยาวกว่าอยู่แล้ว
  จะไม่ถูกเขียนทับเด็ดขาด
- **Allowlist แบบจำกัดเฉพาะ**: การขยาย `EGRESS_BUCKETED_LOCK_PROVIDERS`
  เป็นการตัดสินใจโดยชัดแจ้งของเจ้าของ; ไม่มีการเดินสายแบบทั่วไป
  (pattern #10334/#10419) คิวรี sibling จะผูกกับ allowlist เดียวกันนั้น
  แทนที่จะเขียนซ้ำเป็น SQL literal ดังนั้นการขยายจึงยังคงเป็นการเปลี่ยนแปลง
  เพียงบรรทัดเดียว
- **การหมุนเวียน Egress IP ทั้งสองทิศทาง**: ช่วงเวลาการค้นหา (24 ชั่วโมง)
  กว้างกว่า TTL ของแคช egress-IP (5 นาที) มาก ดังนั้น "IP ล่าสุดที่ทราบ"
  จึงเป็นประวัติ ไม่ใช่สถานะปัจจุบัน หากพร็อกซีของการเชื่อมต่อหมุนเวียน
  ภายในช่วงเวลานั้น ล็อกอาจ **พลาด** IP ที่ใช้ร่วมกันจริง (IP ที่บันทึกไว้
  คือ IP ใหม่ที่ยังไม่หมดโควต้า) — และในทางกลับกันอย่างสมมาตร อาจ
  **cool sibling ที่หมุนออกไปแล้ว** จาก IP ที่หมดโควต้า กรณีหลังทำให้
  sibling นั้นเสียหน้าต่าง cooldown ไปหนึ่งรอบ; ทั้งสองกรณีถือเป็นข้อจำกัด
  แบบ best-effort ที่ยอมรับได้ของการค้นหาที่อิงประวัติ
- **ต้นทุน**: การสแกน `proxy_logs` แบบจำกัดขอบเขตสองครั้ง (กรองตามช่วงเวลา
  ผ่าน `idx_pl_timestamp`) เฉพาะตามความถี่ของ 429 เท่านั้น ไม่มีดัชนีใหม่
  (migration 134 YAGNI) วัดผลบนสำเนาฐานข้อมูลทราฟฟิกจริงขนาดปานกลาง;
  อินสแตนซ์ที่มีทรูพุตสูงจะเก็บแถวในช่วงเวลาเดียวกันมากขึ้นตามสัดส่วน

---

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
