# OmniRoute A2A Server Documentation (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute ในฐานะเอเจนต์กำหนดเส้นทางอัจฉริยะ

พื้นผิว A2A มีสองรูปแบบ:

- **JSON-RPC 2.0** ที่ `POST /a2a` (จุดเริ่มต้นมาตรฐาน ซึ่งกำหนดไว้ใน `src/app/a2a/route.ts`)
- **REST** ภายใต้ `/api/a2a/*` สำหรับแดชบอร์ดและเครื่องมือต่าง ๆ (สถานะ รายการงาน การยกเลิก)

งานต่าง ๆ ได้รับการติดตามโดย `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL เริ่มต้น 5 นาที) ส่วนสกิลต่าง ๆ จะถูกส่งต่อผ่าน `A2A_SKILL_HANDLERS` ใน `src/lib/a2a/taskExecution.ts`

## การค้นพบเอเจนต์

```bash
curl http://localhost:20128/.well-known/agent.json
```

ส่งคืน Agent Card ที่อธิบายความสามารถ สกิล และข้อกำหนดด้านการตรวจสอบสิทธิ์ของ OmniRoute

ฟิลด์ `version` ของ Agent Card ดึงค่ามาจาก `process.env.npm_package_version` (ดู `src/app/.well-known/agent.json/route.ts:13`) จึงซิงค์กับ `package.json` โดยอัตโนมัติในทุกรีลีส

---

## การตรวจสอบสิทธิ์

คำขอทั้งหมดไปยัง `/a2a` ต้องใช้คีย์ API ผ่านส่วนหัว `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

หากไม่มีการกำหนดค่าคีย์ API บนเซิร์ฟเวอร์ ระบบจะข้ามการตรวจสอบสิทธิ์

## การเปิดใช้งาน

A2A ควบคุมด้วยสวิตช์ **Endpoints → A2A** และปิดใช้งานตามค่าเริ่มต้น เมื่อปิดใช้งาน
`GET /api/a2a/status` จะรายงาน `status: "disabled"` และ `online: false`; การเรียก JSON-RPC ไปยัง
`POST /a2a` จะส่งคืน HTTP 503 พร้อมรหัสข้อผิดพลาด JSON-RPC `-32000`

---

## เมธอด JSON-RPC 2.0

### `message/send` — การดำเนินการแบบซิงโครนัส

ส่งข้อความไปยังสกิลและรอการตอบกลับที่สมบูรณ์

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

สำหรับ `smart-routing` ค่า `metadata.combo` จะเขียนทับ
`metadata.model` อย่างชัดเจนสำหรับคำขอไปยังเกตเวย์ โดยจะถูกส่งเป็น `model` จริง
ไม่ใช่เป็นฟิลด์ JSON `x-combo` ที่ถูกละเว้น ทั้งนี้ การตรวจสอบ API key ตามปกติของเกตเวย์และ
การอนุญาตสำหรับแต่ละเป้าหมายยังคงมีผล ระบบจะปฏิเสธคอมโบที่ไม่ถูกต้องหรือว่างเปล่า

ผลลัพธ์จะแสดง `requested_combo` (เจตนาของผู้เรียก), `dispatched_model`
(คำขอจริงที่ส่งไปยังเกตเวย์), `response_model` (การตอบกลับจากเกตเวย์) และ
`confirmed_combo` ฟิลด์สุดท้ายจะเป็น `null` เว้นแต่เกตเวย์จะระบุคอมโบอย่างชัดเจน
บันทึกการตัดสินใจของ A2A จะระบุว่าการดำเนินการเป็นของคอมโบที่ได้รับการยืนยันแล้วเท่านั้น
โดยเก็บคำขอที่ยังไม่ได้รับการยืนยันไว้เป็น `requestedCombo`

**การตอบกลับ:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "requested_combo": "fast-coding",
      "confirmed_combo": null,
      "dispatched_model": "fast-coding",
      "response_model": "claude-sonnet",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — การสตรีมผ่าน SSE

ทำงานเหมือนกับ `message/send` แต่ส่งคืน Server-Sent Events สำหรับการสตรีมแบบเรียลไทม์

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**อีเวนต์ SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — ตรวจสอบสถานะงาน

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — ยกเลิกงาน

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## ทักษะที่มีอยู่

OmniRoute เปิดเผย 6 ทักษะ A2A แบบมีสายใน `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` โมดูลทักษะแต่ละโมดูลอยู่ใน `src/lib/a2a/skills/`

| ทักษะ                   | ID                   | คำอธิบาย                                                                                                                              | แท็ก                     | ตัวอย่าง                                     |
| :---------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :----------------------- | :------------------------------------------- |
| การกำหนดเส้นทางอัจฉริยะ | `smart-routing`      | กำหนดเส้นทางพร้อมต์ผ่าน provider/combo ที่เหมาะสมที่สุดโดยใช้คอมโบเอ็นจิ้นของ OmniRoute การให้คะแนน +                                 | เส้นทางผู้ให้บริการ      | "กำหนดเส้นทางพร้อมท์นี้ผ่านโมเดลที่ดีที่สุด" |
| การจัดการโควต้า         | `quota-management`   | รายงานสถานะโควต้าต่อผู้ให้บริการ ช่วยให้ผู้โทรตัดสินใจว่าควร throttle/switch เมื่อใด                                                  | โควต้าผู้ให้บริการ       | "ตรวจสอบโควต้าเพื่อมานุษยวิทยา"              |
| การค้นพบผู้ให้บริการ    | `provider-discovery` | แสดงรายการผู้ให้บริการที่ติดตั้งพร้อมความสามารถ ธงระดับฟรี สถานะ OAuth                                                                | ผู้ให้บริการ การค้นพบ    | “มีผู้ให้บริการอะไรบ้าง?”                    |
| การวิเคราะห์ต้นทุน      | `cost-analysis`      | ประมาณการต้นทุนของ request/conversation ตามการใช้งานล่าสุดของแค็ตตาล็อก +                                                             | ต้นทุนการใช้งาน          | "ประมาณการค่าใช้จ่ายสำหรับการสนทนานี้"       |
| รายงานสุขภาพ            | `health-report`      | รวมเซอร์กิตเบรกเกอร์ คูลดาวน์ สถานะการล็อคต่อผู้ให้บริการ                                                                             | สุขภาพความยืดหยุ่น       | "แสดงสถานะสุขภาพของผู้ให้บริการทั้งหมด"      |
| ความสามารถของรายการ     | `list-capabilities`  | ส่งคืนแค็ตตาล็อกทักษะตัวแทน 45 รายการเต็ม (23 API + 21 CLI + 1 config) เป็นตารางมาร์กดาวน์ที่มี SKILL.md URLs แบบดิบสำหรับการฉีดบริบท | แคตตาล็อก การค้นพบ ทักษะ | "แสดงรายการความสามารถ OmniRoute ทั้งหมด"     |

> บัตรตัวแทนควรสอดคล้องกับแค็ตตาล็อกผู้ให้บริการ 381 รายที่ใช้งานอยู่ จำนวนผู้ให้บริการและข้อมูลเมตา free/no-auth มาจากรีจิสทรีรันไทม์

### รายละเอียดทักษะ `list-capabilities`

ทักษะ `list-capabilities` มีประโยชน์อย่างยิ่งสำหรับตัวแทนภายนอกที่ต้องการค้นหาว่า OmniRoute เปิดเผยอะไรบ้างก่อนที่จะส่งการเรียก API มันจะส่งคืนสิ่งประดิษฐ์ตาราง markdown ที่มีโครงสร้าง:

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

แต่ละแถวจะมีคอลัมน์ `rawUrl` ดังนั้นเอเจนต์จึงสามารถดึงข้อมูล SKILL.md แบบเต็มได้ทันที ฟิลด์ `metadata.totalSkills` สะท้อนขนาดแค็ตตาล็อก (45 วันนี้) การใช้งาน: `src/lib/a2a/skills/listCapabilities.ts` ดูเพิ่มเติมที่ [AGENT-SKILLS.md](./AGENT-SKILLS.md)

---

## REST API (เสริม)

ตำแหน่งข้อมูล JSON-RPC `/a2a` คือจุดเริ่มต้น A2A ตามรูปแบบบัญญัติ ตำแหน่งข้อมูล REST ด้านล่างให้การเข้าถึงเสริมสำหรับแดชบอร์ดและเครื่องมือภายนอก:

| จุดสิ้นสุด                   | วิธี | คำอธิบาย                                                   | การรับรองความถูกต้อง                                                                                 |
| :--------------------------- | :--- | :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `/api/a2a/status`            | GET  | สถานะเซิร์ฟเวอร์ ทักษะที่ลงทะเบียน                         | (สาธารณะ)                                                                                            |
| `/api/a2a/tasks`             | GET  | แสดงรายการงานด้วยตัวกรอง                                   | การจัดการหรือคีย์ API (ดูด้านล่าง)                                                                   |
| `/api/a2a/tasks/[id]`        | GET  | รับงานโดย ID                                               | การจัดการหรือคีย์ API (ดูด้านล่าง)                                                                   |
| `/api/a2a/tasks/[id]/cancel` | POST | ยกเลิกงานที่กำลังทำงานอยู่                                 | การจัดการหรือคีย์ API (ดูด้านล่าง)                                                                   |
| `/.well-known/agent.json`    | GET  | บัตรตัวแทน (การค้นพบ A2A )                                 | (สาธารณะ แคช 3600)                                                                                   |
| `/api/a2a/tasks`             | POST | การมอบหมายขาเข้าไปยังกองเรือ OmniConductor (ตัวนำ PRD RF5) | เช่นเดียวกับ `GET` บวก `OMNIROUTE_API_KEY` หากตั้งค่าในขณะที่ `REQUIRE_API_KEY` ปิดอยู่ `a2aEnabled` |

ใครสามารถผ่านไปยังเส้นทาง `/api/a2a/tasks*` นั้นขึ้นอยู่กับการเข้าสู่ระบบและการตั้งค่าคีย์ API:

- `requireLogin=true` (ค่าเริ่มต้น): มิดเดิลแวร์ยอมรับเฉพาะข้อมูลรับรองการจัดการ (เซสชันแดชบอร์ด, `manage` -scope คีย์ API, โทเค็นการเข้าถึง `oma_` ) และ `OMNIROUTE_API_KEY` คีย์การอนุมานธรรมดาได้รับ `403` ในส่วนหัว `Authorization` มิดเดิลแวร์จะใช้เพียง `OMNIROUTE_API_KEY` เป็น `Bearer <key>`; คีย์เปล่าหรือแท็บหลังจาก `Bearer` ได้รับ `401`
- `requireLogin=false` หรือหน้าต่างลูปแบ็คก่อนออนบอร์ด: ด้วย `REQUIRE_API_KEY=true` คีย์ OmniRoute API หรือข้อมูลรับรองการจัดการที่ถูกต้องใดๆ ได้รับการยอมรับ และผู้โทรที่ไม่ระบุชื่อจะได้รับ `401`; เมื่อปิด `REQUIRE_API_KEY` เส้นทางจะเปิดอยู่
- `POST /api/a2a/tasks` ต้องการ `OMNIROUTE_API_KEY` เพิ่มเติมในส่วนหัว `Authorization` เมื่อตั้งค่าตัวแปรนั้นและ `REQUIRE_API_KEY` ปิดอยู่ ส่วนหัวอื่นๆ เช่น `x-api-key` จะไม่นับรวมอยู่ด้วย เมื่อปิดการเข้าสู่ระบบหรือก่อนการเริ่มต้นใช้งาน คีย์จะส่งผ่านโดยมีหรือไม่มีคำนำหน้า `Bearer` เมื่อเปิดเข้าสู่ระบบ มีเพียง `Bearer <key>` เท่านั้นที่จะผ่านมิดเดิลแวร์ได้

ในกรณีที่จำเป็นต้องมีข้อมูลประจำตัว โทเค็น `read` -scope `oma_` จะใช้ได้กับ `GET` เท่านั้น

**การมอบหมายตัวนำขาเข้า (`POST /api/a2a/tasks`):** ตัวแทน A2A ภายนอกมอบหมายงานการเขียนโค้ดให้กับฟลีต OmniConductor ผ่าน OmniRoute เนื้อความ: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — เฉพาะทักษะของตัวนำเรือเดินสมุทร (ที่ประกาศบนบัตรตัวแทน) เท่านั้นที่สามารถมอบหมายได้ จำเป็นต้องมี `metadata.conductor.repo.url` (ฟลีตทำงานบน git repos) เส้นทางแปลเป็น `POST /v1/tasks` ของฮับโดยใช้ `CONDUCTOR_ORCHESTRATOR_TOKEN` ฝั่งเซิร์ฟเวอร์ (fallback `CONDUCTOR_HUB_TOKEN`) และส่งคืน `201 { conductor_task_id, state: "submitted" }`; สถานะของงานจะไหลย้อนกลับผ่าน SSE→A2A mirror (RF1) และมองเห็นได้ผ่าน `GET /api/a2a/tasks?skill=conductor`

---

## การเพิ่มทักษะใหม่

1. **สร้างไฟล์ทักษะ:** `src/lib/a2a/skills/<your-skill>.ts`

   ส่งออกฟังก์ชัน async `(task: A2ATask, caller?: A2ACallerContext) => Promise<{ artifacts, metadata }>` ติดตามรูปทรงของทักษะที่มีอยู่ เช่น `smartRouting.ts`. หากทักษะโทรกลับเข้าสู่ OmniRoute ผ่าน HTTP ให้สร้างส่วนหัวด้วย `buildSelfLoopHeaders(caller)` จาก `src/lib/a2a/selfLoopAuth.ts` เพื่อให้การโทรทำงานด้วยคีย์ของผู้เรียก A2A ไม่ใช่ `OMNIROUTE_API_KEY` และส่ง `redirect: "error"` ไปยัง `fetch` ดังนั้นการเปลี่ยนเส้นทางจะไม่ได้รับคีย์ ตัวช่วยสร้างเฉพาะส่วนหัวเท่านั้น แต่ละทักษะจะกำหนดนโยบายการเปลี่ยนเส้นทางเอง โดยจะส่ง `UnsafeSelfLoopTargetError` แทนที่จะแนบคีย์เมื่อ URL ฐานที่แก้ไขแล้วนั้นเป็น http ธรรมดานอกเครือข่ายส่วนตัว (ลูปแบ็ค ชื่อคอนเทนเนอร์หรือบริการ และที่อยู่ส่วนตัวก็โอเค) หรือเก็บข้อมูลประจำตัวไว้ ดังนั้นทักษะที่กลืนสายที่ถูกปฏิเสธจะต้องสร้างข้อผิดพลาดนั้นขึ้นมาใหม่

2. **ตัวจัดการการลงทะเบียน:** ใน `src/lib/a2a/taskExecution.ts` ให้เพิ่มรายการไปที่ `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task, caller) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task, caller);
     },
   };
   ```

3. **เปิดเผยในบัตรตัวแทน:** ใน `src/lib/a2a/agentCardMetadata.ts` (แชร์โดย `/.well-known/agent.json` และ `/.well-known/agent-card.json`) ให้ต่อท้ายอาร์เรย์ `skills` :

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **เขียนแบบทดสอบ:** `tests/unit/a2a-<your-skill>.test.ts` ครอบคลุมเส้นทางข้อผิดพลาด + เส้นทางแห่งความสุข

5. **เอกสาร** ทักษะใหม่ในตาราง `Available Skills` ของไฟล์นี้

---

## TTL ของงาน

งานจะหมดอายุหลังจาก `ttlMinutes` (ค่าเริ่มต้น 5 นาที) — กำหนดค่าใน constructor ของ `A2ATaskManager` ที่ `src/lib/a2a/taskManager.ts:82` หากต้องการปรับแต่ง ให้ fork การสร้างอินสแตนซ์ `A2ATaskManager` และส่งค่าอื่นเข้าไป (เช่น `new A2ATaskManager(15)` สำหรับ TTL 15 นาที) โดย interval ที่ทำงานเบื้องหลังจะตรวจสอบและกวาดงานที่หมดอายุทุก 60 วินาที

---

## วงจรชีวิตของงาน

```
ส่งแล้ว → กำลังทำงาน → เสร็จสมบูรณ์
                       → ล้มเหลว
                       → ยกเลิกแล้ว
```

- โดยค่าเริ่มต้น งานจะหมดอายุหลังจาก 5 นาที (ดู [TTL ของงาน](#task-ttl))
- สถานะสิ้นสุด: `completed`, `failed`, `cancelled`
- บันทึกเหตุการณ์จะติดตามการเปลี่ยนสถานะทุกครั้ง

---

## รหัสข้อผิดพลาด

| รหัส   | ความหมาย                                      |
| :----- | :-------------------------------------------- |
| -32700 | ข้อผิดพลาดในการแยกวิเคราะห์ (JSON ไม่ถูกต้อง) |
| -32600 | คำขอไม่ถูกต้อง / ไม่ได้รับอนุญาต              |
| -32601 | ไม่พบเมธอดหรือทักษะ                           |
| -32602 | พารามิเตอร์ไม่ถูกต้อง                         |
| -32603 | ข้อผิดพลาดภายใน                               |
| -32000 | ปิดใช้งาน endpoint A2A                        |

---

## ตัวอย่างการบูรณาการ

### หลาม (คำขอ)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (ดึงข้อมูล)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
