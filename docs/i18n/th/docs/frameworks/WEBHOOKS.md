# Webhooks (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ที่มาของความจริง:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`**อัปเดตล่าสุด:** 28-06-2569 — เวอร์ชัน 3.8.40

OmniRoute สามารถยิง HTTP webhooks บนกิจกรรมแพลตฟอร์มได้ ใช้เพื่อผสานรวมกับ Slack, PagerDuty, Datadog, บริการแจ้งเตือนภายใน หรือตัวรับ HTTP ใดๆ

ผู้มอบหมายงานลงนามการจัดส่งแต่ละครั้งด้วย HMAC-SHA256 ลองอีกครั้งเมื่อเกิดความล้มเหลวชั่วคราว ติดตามความสมบูรณ์ของการจัดส่งต่อเว็บฮุค และปิดใช้งานตำแหน่งข้อมูลอัตโนมัติที่ล้มเหลวอย่างต่อเนื่อง

## กิจกรรมที่รองรับ

ประเภท `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, ใช้โดย `src/lib/webhookDispatcher.ts`) ปัจจุบันจำลองเหตุการณ์เจ็ดเหตุการณ์:

| เหตุการณ์                 | ไฟไหม้เมื่อ                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `request.completed`       | คำขอพร็อกซีเสร็จสมบูรณ์แล้ว                                                                  |
| `request.failed`          | คำขอพร็อกซีล้มเหลวหลังจาก retries/fallback ทั้งหมด                                           |
| `quota.exceeded`          | คีย์ API ข้ามเกณฑ์ budget/quota                                                              |
| `proxy.set_aside`         | สมาชิกกลุ่มพร็อกซีถูกกันไว้หลังจากการปฏิเสธซ้ำแล้วซ้ำอีก (การเปลี่ยนผ่านเท่านั้น)            |
| `proxy.pool.exhausted`    | สมาชิกของขอบเขตพูลพร็อกซีทุกคนถูกกันไว้                                                      |
| `provider.reset_redeemed` | ใช้การรีเซ็ตแบบธนาคารโดยอัตโนมัติเพื่อแลกเครดิตการรีเซ็ตหรือการรีเซ็ตเซสชันรายสัปดาห์ Claude |
| `test.ping`               | เหตุการณ์สังเคราะห์ที่ใช้โดยจุดสิ้นสุดการทดสอบ                                               |

การสมัครสมาชิกยอมรับ `"*"` ตามตัวอักษรเพื่อรับทุกกิจกรรม ชื่อเหตุการณ์ที่ไม่รู้จักใน `events` จะถูกละเว้นในเวลาจัดส่ง

> หมายเหตุ: ตัวส่ง API เป็นแบบต่อสาย แต่ไซต์การโทรจริงสำหรับเหตุการณ์ที่ไม่ใช่`test.ping` บางเหตุการณ์ยังคงเริ่มต้นอยู่ ตรวจสอบ `grep dispatchEvent` เพื่อดูว่าเส้นทางใดเรียกใช้โปรแกรมเลือกจ่ายงานในรีลีสของคุณ

## สถาปัตยกรรม

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

การจัดส่งเป็นไปอย่างง่ายดายและลืมสำหรับผู้โทร: `Promise.allSettled` กลืนข้อผิดพลาดต่อเว็บฮุค ดังนั้นผู้รับที่ไม่ดีรายหนึ่งจึงไม่สามารถบล็อกผู้รับรายอื่นได้

## การลงนาม HMAC

เมื่อ webhook มี `secret` OmniRoute จะลงนามเนื้อหา JSON และส่ง:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ชื่อส่วนหัวใช้คำนำหน้า `X-Webhook-*` (ไม่ใช่ `X-OmniRoute-*`) ค่าลายเซ็นคือ `sha256=<hex>` — ตรวจสอบคำนำหน้าแบบเต็ม

หากเรียกใช้ `createWebhook` โดยไม่มีข้อมูลลับ โมดูล DB จะสร้างหนึ่งรายการ (`whsec_<48 hex>`) ดังนั้น webhooks ทั้งหมดจะถูกลงนามตามค่าเริ่มต้น

### กำลังตรวจสอบกับผู้รับ

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ตรวจสอบกับ **ดิบ** ขอเนื้อหาก่อนที่จะแยกวิเคราะห์ JSON ใด ๆ

## นโยบายการลองซ้ำและความล้มเหลว

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- หมดเวลา 10 วินาทีต่อครั้ง (`AbortController`)
- HTTP 2xx ถือเป็นความสำเร็จ
- HTTP 3xx/4xx นับเป็นสถานะสุดท้ายที่ไม่สามารถลองใหม่ได้ — ที่บันทึกว่าจัดส่งด้วย `success = res.ok`
- มีการลองข้อผิดพลาด HTTP 5xx และเครือข่ายอีกครั้งโดยมีแบ็คออฟแบบเอ็กซ์โปเนนเชียล: `2^attempt * 1000 ms` (1 วินาที, 2 วินาที, 4 วินาที)
- หลังจาก `maxRetries` การจัดส่งจะถูกบันทึกว่าล้มเหลว
- การจัดส่งแต่ละครั้งจะอัปเดต `last_triggered_at`, `last_status` และรีเซ็ตหรือเพิ่ม `failure_count`
- ผู้มอบหมายงานจะเรียก `disableWebhooksWithHighFailures(10)` หลังจากกระจายออกแต่ละครั้ง ดังนั้น webhook ใดๆ ที่มี `failure_count >= 10` จะถูกปิดใช้งานโดยอัตโนมัติ

## ฐานข้อมูล

ตาราง `webhooks` (การย้าย `011_webhooks.sql`):

| คอลัมน์             | พิมพ์   | หมายเหตุ                                             |
| ------------------- | ------- | ---------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                 |
| `url`               | TEXT    | URL ปลายทาง                                          |
| `events`            | TEXT    | อาร์เรย์JSON ; `["*"]` เริ่มต้น                      |
| `secret`            | TEXT    | ข้อมูลลับ HMAC (สร้างขึ้นอัตโนมัติหากไม่ได้รับ)      |
| `enabled`           | INT     | 0/1; ค่าเริ่มต้นเป็น 1                               |
| `description`       | TEXT    | ป้ายกำกับของมนุษย์ที่เป็นตัวเลือก                    |
| `created_at`        | TEXT    | `datetime('now')`                                    |
| `last_triggered_at` | TEXT    | อัปเดตทุกครั้งที่พยายามจัดส่ง                        |
| `last_status`       | INT     | สถานะ HTTP ของความพยายามครั้งล่าสุด (0 เครือข่าย = ) |
| `failure_count`     | INT     | รีเซ็ตเป็น 0 เมื่อสำเร็จ + 1 เมื่อล้มเหลว            |

ประวัติการจัดส่งจะยังคงอยู่ในตาราง `webhook_deliveries` เฉพาะ (การย้าย `069_webhook_deliveries.sql` ที่เขียนผ่าน `src/lib/db/webhookDeliveries.ts::insertDelivery` ทุกครั้งที่พยายาม) นอกเหนือจากตัวนับรวมในแถว `webhooks` ข้อมูลเมตาชนิด (Slack / Discord / Telegram / หม้อแปลงเพย์โหลดแบบกำหนดเอง) ถูกเพิ่มโดย `070_webhooks_kind_metadata.sql`

## REST API

ตำแหน่งข้อมูลทั้งหมดต้องมีการตรวจสอบสิทธิ์การจัดการ (`requireManagementAuth`)

| จุดสิ้นสุด                      | วิธี   | คำอธิบาย                                   |
| ------------------------------- | ------ | ------------------------------------------ |
| `/api/webhooks`                 | GET    | แสดงรายการ webhooks (ปกปิดความลับ)         |
| `/api/webhooks`                 | POST   | สร้างเว็บฮุค                               |
| `/api/webhooks/[id]`            | GET    | รายละเอียด Webhook (ความลับเต็ม)           |
| `/api/webhooks/[id]`            | PUT    | อัปเดตฟิลด์                                |
| `/api/webhooks/[id]`            | DELETE | ลบ                                         |
| `/api/webhooks/[id]/test`       | POST   | ยิง `test.ping` (ไม่ต้องลองใหม่)           |
| `/api/webhooks/[id]/deliveries` | GET    | ความพยายามในการส่งล่าสุดสำหรับหนึ่งเว็บฮุค |
| `/api/webhooks/validate-url`    | POST   | การตรวจสอบ URL ก่อนการบิน (การ์ด SSRF )    |

`GET /api/webhooks` ปิดบังความลับของ `<first 10 chars>...` เพื่อหลีกเลี่ยงไม่ให้ข้อมูลรั่วไหลในหน้ารายการ ใช้ `[id]` GET เมื่อคุณต้องการความลับจริงๆ

### สร้างเว็บฮุค

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

หากละเว้น `secret` เซิร์ฟเวอร์จะสร้างข้อมูลลับ `whsec_<hex>` และส่งคืนในการตอบกลับ

### ทดสอบเว็บฮุค

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

ส่งกลับ `{ delivered, status, error }` ไม่มีการพยายามลองใหม่ — มีประโยชน์สำหรับการตรวจสอบอย่างรวดเร็วว่าผู้รับยอมรับเพย์โหลดและลายเซ็น

## แดชบอร์ด

หน้าแดชบอร์ดที่ `/dashboard/webhooks` (ดู `src/app/(dashboard)/dashboard/webhooks/page.tsx`) ให้:

- Create/edit webhooks พร้อมด้วยตัวเลือกเหตุการณ์
- ตัวบ่งชี้สถานะ (ใช้งานอยู่ / ไม่ได้ใช้งาน / เกิดข้อผิดพลาด) ตาม `enabled`, `failure_count` และ `last_status`
- การส่งมอบการทดสอบเพียงคลิกเดียว
- สลับ enable/disable ด้วยตนเอง

## ตัวอย่างเพย์โหลด

### คำขอเสร็จสมบูรณ์

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### ทดสอบ.ปิง

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

รูปร่างฟิลด์สำหรับเหตุการณ์ที่ไม่ใช่`test.ping` ถูกกำหนดโดยไซต์การโทรที่ปล่อยมันออกมา ถือว่าวัตถุ `data` เป็นแบบที่เข้ากันได้กับการส่งต่อ (เพิ่มฟิลด์ ไม่ต้องขึ้นอยู่กับการขาดงาน)

## แนวทางปฏิบัติที่ดีที่สุด

- **ตรวจสอบลายเซ็นในการจัดส่งทุกครั้ง** กับเนื้อหาดิบ — ป้องกัน POSTs ที่ถูกปลอมแปลงจากใครก็ตามที่คาดเดาเว็บฮุค URL ของคุณ
- **ตอบสนอง 2xx ภายใน ~ 5 วินาที** — ผู้ส่งจะหมดเวลาเป็นเวลา 10 วินาที ตัวรับสัญญาณที่ช้าจะกินการลองซ้ำและทำให้ `failure_count` ขยายตัว
- **ทำให้ตัวจัดการไม่มีอำนาจ** การลอง — อีกครั้งและซีแมนทิกส์การนำส่งอย่างน้อยหนึ่งครั้งหมายความว่าสามารถทำซ้ำได้
- **สมัครสมาชิกน้อยที่สุด** — แสดงรายการเฉพาะเหตุการณ์ที่คุณใช้จริงเท่านั้น `"*"` จะเพิ่มต้นทุนให้กับตัวรับที่คุณไม่ได้ควบคุม
- **ดู `failure_count`** ตำแหน่งข้อมูล — ถูกปิดใช้งานโดยอัตโนมัติเมื่อเกิดความล้มเหลวติดต่อกัน 10 ครั้ง รีเซ็ตโดยการเรียก `PUT /api/webhooks/[id]` ด้วย `enabled: true` หลังจากแก้ไขเครื่องรับ
- **หมุนเวียนความลับเป็นระยะ** — `PUT` `secret` ใหม่ ปรับใช้ค่าใหม่กับตัวรับ และยืนยันผ่านทางจุดสิ้นสุดการทดสอบ

## ดูเพิ่มเติม

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — พื้นผิว API การจัดการเต็มรูปแบบ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — เซอร์กิตเบรกเกอร์ / ซีแมนทิกส์คูลดาวน์เบื้องหลังความล้มเหลวของผู้ให้บริการที่เกิดขึ้นผ่าน `request.failed`
- ที่มา: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
