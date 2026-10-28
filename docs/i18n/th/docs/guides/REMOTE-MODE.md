# Remote Mode (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

เรียกใช้ CLI `omniroute` บนแล็ปท็อปของคุณ ขณะที่ตัว OmniRoute ทำงานอยู่ที่อื่น
(เช่น VPS, โฮมเซิร์ฟเวอร์ หรือเครื่องอื่นบน Tailnet ของคุณ) คุณเข้าสู่ระบบเพียงครั้งเดียวด้วย
`omniroute connect` และหลังจากนั้นคำสั่ง CLI **ทุกคำสั่ง** จะมุ่งไปยังเซิร์ฟเวอร์ระยะไกลนั้น
— ใช้คำสั่งเดิม ได้ผลลัพธ์แบบเดิม เพียงแต่ดำเนินการกับเซิร์ฟเวอร์ระยะไกล

ไม่จำเป็นต้องติดตั้งเครื่องมือตัวที่สอง: โหมดระยะไกลใช้ CLI `omniroute` ตามปกติ
ร่วมกับ **โทเค็นการเข้าถึง** ที่กำหนดขอบเขตสิทธิ์

```bash
npm install -g omniroute                 # CLI ปกติ
omniroute connect 192.168.0.15           # เข้าสู่ระบบ (รหัสผ่าน → โทเค็นที่กำหนดขอบเขตสิทธิ์)
omniroute models list                    # ← ตอนนี้แสดงรายการโมเดลของเซิร์ฟเวอร์ระยะไกล
omniroute configure codex                # ← เขียนโปรไฟล์ Codex ภายในเครื่องจากแค็ตตาล็อกระยะไกล
```

---

## วิธีการทำงาน

```
แล็ปท็อปของคุณ                          OmniRoute ระยะไกล (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (รหัสผ่าน → โทเค็น)       │
│  บริบท: vps        │ ───────────────►  │ ออกโทเค็นการเข้าถึงที่กำหนด  │
│  baseUrl, โทเค็น   │  Authorization: Bearer oma_live_…                 │
│                    │ ───────────────►  │ ทุกเส้นทางจัดการ ตรวจสอบสิทธิ์│
│ เขียนการกำหนดค่า   │ ◄───────────────  │ ตามขอบเขตของโทเค็นแต่ละรายการ│
│ ภายในเครื่อง       │                   └───────────────────────────────┘
└────────────────────┘
```

- **บริบท** แต่ละรายการจัดเก็บเซิร์ฟเวอร์หนึ่งเครื่อง (`~/.omniroute/config.json`, `chmod 600`)
  `omniroute contexts use <name>` ใช้สลับเซิร์ฟเวอร์ที่ใช้งานอยู่ ส่วน `default` คือเครื่องภายใน
- **โทเค็นการเข้าถึง** (`oma_live_…`) ใช้อนุญาตคำสั่งการจัดการ โดยแตกต่างจาก
  คีย์ API สำหรับการอนุมาน (`sk-…` ซึ่งใช้กับ `/v1/chat/completions`)
- ฝั่งเซิร์ฟเวอร์จะจัดเก็บเฉพาะแฮช SHA-256 ของโทเค็น ส่วนข้อความธรรมดาจะแสดง
  **เพียงครั้งเดียว** ตอนสร้าง

---

## การเชื่อมต่อ

### ด้วยรหัสผ่านการจัดการ (การเริ่มต้นระบบ)

```bash
omniroute connect 192.168.0.15
# รหัสผ่านการจัดการสำหรับ http://192.168.0.15:20128: ********
# ✔ เชื่อมต่อกับ http://192.168.0.15:20128 แล้ว — บริบท '192.168.0.15' (ขอบเขตสิทธิ์: admin)
```

ขั้นตอนที่ใช้รหัสผ่านจะออกโทเค็น **admin** ตามค่าเริ่มต้น (เมื่อคุณมีรหัสผ่าน
คุณจึงมีสิทธิ์ควบคุมทั้งหมดอยู่แล้ว) ลดขอบเขตสิทธิ์ได้ด้วย `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

ตัวเลือก: `--port <p>` (เมื่อไม่ได้ระบุพอร์ตในโฮสต์), `--name <ctx>` (ชื่อบริบท),
`--scope read|write|admin` หากระบุ URL แบบเต็ม ระบบจะใช้งานตามที่ระบุโดยไม่แก้ไข:
`omniroute connect https://omni.example.com`

### ด้วยโทเค็นที่สร้างไว้ล่วงหน้า

สร้างโทเค็นที่กำหนดขอบเขตสิทธิ์ในแดชบอร์ด (หรือด้วย `omniroute tokens create`) แล้ว
วางโทเค็นได้เลย — ไม่ต้องใช้รหัสผ่าน:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI จะตรวจสอบโทเค็นผ่าน `GET /api/cli/whoami` และบันทึกเป็นบริบทที่ใช้งานอยู่

---

## ขอบเขตสิทธิ์

มีสามระดับแบบลำดับชั้น (`admin ⊃ write ⊃ read`):

| ขอบเขตสิทธิ์ | สิ่งที่ทำได้                                                                        |
| ------------ | ----------------------------------------------------------------------------------- |
| `read`       | แสดงรายการ/ตรวจสอบ — `models list`, `providers status`, `logs`, `usage`, `cost`     |
| `write`      | read **+** กำหนดค่า/นำไปใช้ — `setup-codex`, `keys add`, `config set`, ชุดคำสั่งผสม |
| `admin`      | write **+** จัดการ — CRUD ของ `tokens`, เพิ่มผู้ให้บริการ, บริการ, นโยบาย, oauth    |

เซิร์ฟเวอร์จะอนุมานขอบเขตสิทธิ์ที่แต่ละเส้นทางต้องใช้จากเมธอด HTTP
(`GET`→read, การเปลี่ยนแปลงข้อมูล→write) ร่วมกับรายการอนุญาตเฉพาะ admin สำหรับส่วนที่ละเอียดอ่อน
(`/api/cli/tokens`, การเปลี่ยนแปลง `/api/providers`, `/api/oauth`, `/api/services`, …)
โทเค็นที่มีขอบเขตสิทธิ์ไม่เพียงพอจะได้รับ `403` พร้อมข้อความที่ชัดเจน

> เส้นทางที่เรียกใช้โปรเซส (`/api/services/*`, `/api/mcp/*`, …) ยังคง
> **เข้าถึงได้เฉพาะผ่าน loopback** — โทเค็นระยะไกลจะไม่สามารถเข้าถึงเส้นทางเหล่านี้ได้ ไม่ว่าจะมีขอบเขตสิทธิ์ระดับใดก็ตาม

---

## การเชื่อมต่อ Antigravity บนการติดตั้งระยะไกล

Antigravity ใช้หน้าจอขอความยินยอมแบบ firstparty/nativeapp ของ Google โดย Google จะ
ส่งคืนรหัสการอนุญาตก็ต่อเมื่อ **loopback redirect**
(`http://127.0.0.1:<port>/callback`) **สามารถเข้าถึงได้จากเบราว์เซอร์ที่
อนุมัติการลงชื่อเข้าใช้** เท่านั้น สำหรับการติดตั้งบน VPS ระยะไกล loopback ดังกล่าวอยู่บน
เซิร์ฟเวอร์ ไม่ใช่บนเครื่องของคุณ ดังนั้นหน้าจอขอความยินยอมจึง **ค้างตลอดไปและไม่
ส่งรหัสออกมาเลย** — วิธีสำรองตามปกติที่ให้ "วาง URL ของ callback" จึงไม่มีสิ่งใดให้
วาง (นี่เป็นข้อจำกัดจากฝั่ง Google: อาการค้างแบบเดียวกันนี้เกิดขึ้นกับพร็อกซีใดๆ
ที่ใช้ไคลเอนต์เดสก์ท็อป Antigravity ที่ให้มาด้วย ไม่ใช่เฉพาะ OmniRoute)

แดชบอร์ดจะตรวจพบปัญหานี้ก่อนที่คุณจะติดค้าง: เมื่อเปิด **Providers → Antigravity →
Connect** จากที่อยู่ซึ่งไม่ใช่ localhost ข้อความทั่วไปที่ระบุให้ "คัดลอก URL ของ callback"
จะถูกแทนที่ด้วยวิธีแก้ไขสองวิธีด้านล่าง โดยกรอกโฮสต์และพอร์ตของคุณไว้ให้แล้ว
(ที่อยู่ LAN ก็นับเช่นกัน — ในบริบทของ callback นี้ `192.168.x.x` ไม่ถือเป็น localhost)

มีสองวิธีที่รองรับสำหรับเชื่อมต่อ Antigravity กับ OmniRoute ระยะไกล

### ตัวเลือก A — ตัวช่วยเข้าสู่ระบบภายในเครื่อง (แนะนำ)

เรียกใช้ OAuth บน **คอมพิวเตอร์ของคุณเอง** ซึ่งสามารถเข้าถึง `127.0.0.1` ได้ ตัวช่วย
จะติดต่อกับ Google โดยตรง ทำให้กระบวนการขอความยินยอมเสร็จสมบูรณ์ในจุดที่เวอร์ชัน
ของแดชบอร์ดไม่สามารถทำได้

**หากคุณเชื่อมต่ออยู่แล้ว** (`omniroute connect <host>`) ก็ไม่จำเป็นต้อง
คัดลอกสิ่งใด — ตัวช่วยจะส่งข้อมูลประจำตัวไปยังการติดตั้งนั้นให้คุณ:

```bash
# บนเครื่อง LOCAL ของคุณ (ต้องมี Node.js และเบราว์เซอร์):
omniroute connect 192.168.0.15        # ทำครั้งเดียว — สร้าง context token ที่มีขอบเขตสิทธิ์ระดับผู้ดูแลระบบ
npx omniroute login antigravity
#   ↳ เปิดหน้าขอความยินยอมของ Google รับ callback ผ่านพอร์ต loopback ภายในเครื่อง
#     แลกเปลี่ยน callback และ POST ข้อมูลประจำตัวไปยัง context ที่ใช้งานอยู่:
#
#   เชื่อมต่อ Antigravity บน http://192.168.0.15:20128 แล้ว (การเชื่อมต่อ abc123)
#   ไม่ต้องวางสิ่งใด — คุณสามารถปิดเทอร์มินัลนี้ได้
```

การส่งจะเกิดขึ้นโดยอัตโนมัติเมื่อ context ที่ใช้งานอยู่ชี้ไปยังเครื่องอื่น
คุณสามารถบังคับการทำงานได้ทั้งสองแบบด้วย `--push` / `--no-push` หรือระบุ
context ที่ต้องการด้วย `--context <name>`

**หากเครื่องของคุณไม่สามารถเข้าถึง VPS ได้** (ถูกไฟร์วอลล์กั้น, ไม่มี SSH, หรือเครื่อง
ถูกแยกออกจากเครือข่าย) ตัวช่วยก็ยังใช้งานได้ — สิ่งเดียวที่ตัวช่วย _จำเป็นต้อง_
เข้าถึงคือ Google ใช้ `--no-push` หรือปล่อยให้การส่งล้มเหลวก็ได้: ตัวช่วยจะเปลี่ยนไป
แสดง blob แทนที่จะทิ้งการอนุญาตที่คุณดำเนินการเสร็จแล้ว

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

จากนั้นไปที่แดชบอร์ด **ระยะไกล**: **Providers → Antigravity → Connect** แล้ววาง
blob `omniroute-cred-v1.…` ลงในช่อง **Step 2** (ช่องนี้รับได้ทั้ง URL ของ
callback หรือ blob ข้อมูลประจำตัว) OmniRoute จะถอดรหัส blob เรียกใช้กระบวนการ
เริ่มต้นใช้งาน Cloud Code ที่ฝั่งเซิร์ฟเวอร์ และบันทึกการเชื่อมต่อแบบถาวร

> blob มี refresh token อยู่ — ให้ปฏิบัติต่อ blob เสมือนเป็นรหัสผ่าน ในกรณีที่ใช้การส่ง
> ข้อมูลดังกล่าวจะถูกส่งเพียงครั้งเดียวผ่านการเชื่อมต่อที่ผ่านการตรวจสอบสิทธิ์ของ context
> ส่วนในกรณีที่ใช้การวาง ข้อมูลจะถูกส่งผ่านการเชื่อมต่อของแดชบอร์ด ไม่ว่าจะใช้วิธีใด
> ข้อมูลจะถูกจัดเก็บแบบเข้ารหัส และเมื่อส่งสำเร็จ ระบบจะไม่แสดงข้อมูลดังกล่าวใน
> เทอร์มินัลของคุณ

แฟล็ก: `--no-browser` (แสดง URL แทนการเปิดโดยอัตโนมัติ), `--port <n>`
(กำหนดพอร์ต loopback แบบตายตัว), `--timeout <ms>`, `--push` / `--no-push` (แทนที่
การตั้งค่าการส่งอัตโนมัติ), `--context <name>` (กำหนดเป้าหมายเป็น context ที่ระบุ)

### ตัวเลือก B — ทันเนล SSH แบบ local-forward

หากคุณมีสิทธิ์เข้าถึง VPS ผ่าน SSH ให้ส่งต่อพอร์ตแดชบอร์ดเพื่อให้
loopback callback เชื่อมกลับไปยังเซิร์ฟเวอร์ผ่านทันเนล:

```bash
# บนเครื่อง LOCAL ของคุณ:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# จากนั้นเปิด http://localhost:20128 ในเบราว์เซอร์ LOCAL ของคุณและเชื่อมต่อ Antigravity
# ตามปกติ — ตอนนี้ redirect ไปยัง 127.0.0.1:20128/callback จะไปถึง VPS ผ่าน SSH
```

เนื่องจากคุณเข้าถึงแดชบอร์ดผ่าน `localhost:20128` กระบวนการขอความยินยอมของ Google
จึงเสร็จสมบูรณ์ และ callback จะถูกส่งไปยังเซิร์ฟเวอร์ผ่านทันเนลเดียวกัน —
ไม่จำเป็นต้องใช้ blob เปิดทันเนลค้างไว้จนกว่าการเชื่อมต่อจะแสดงสถานะว่าใช้งานอยู่

ต่างจากผู้ให้บริการที่ใช้ fixed-loopback ด้านล่าง ในกรณีนี้ **ส่งต่อเพียงรายการเดียวก็พอ**:
callback ของ Antigravity ใช้พอร์ตเดียวกับแดชบอร์ด จึงไม่มีพอร์ตเฉพาะของผู้ให้บริการ
พอร์ตที่สองซึ่งต้องสร้างทันเนล

> อีกทางเลือกหนึ่งสำหรับระบบ headless โดยสมบูรณ์ (ไม่ใช้ตัวช่วยและไม่ใช้ทันเนล) คือ
> กำหนดค่าข้อมูลประจำตัว Google OAuth สำหรับเว็บของ **คุณเอง** พร้อม public base URL
> โปรดดู environment variables สำหรับ OAuth ของผู้ให้บริการ ตัวเลือกสองข้อด้านบน
> ไม่จำเป็นต้องตั้งค่า Google เพิ่มเติม

---

## การเชื่อมต่อ Codex / Grok บนการติดตั้งระยะไกล (ผู้ให้บริการที่ใช้ loopback แบบคงที่)

Codex, xAI (`xai-oauth`) และ Grok CLI (`grok-cli`) ลงทะเบียน
`redirect_uri` แบบ loopback ที่**คงที่**ไว้กับแอป OAuth ต้นทาง OmniRoute ไม่สามารถเปลี่ยนแปลงได้ —
ผู้ให้บริการจะส่งเบราว์เซอร์กลับไปยังที่อยู่ที่กำหนดตายตัวเดิมเสมอ:

| ผู้ให้บริการ | Callback แบบคงที่ที่ผู้ให้บริการเปลี่ยนเส้นทางไป |
| ------------ | ------------------------------------------------ |
| `codex`      | `http://localhost:1455/auth/callback`            |
| `xai-oauth`  | `http://127.0.0.1:56121/callback`                |
| `grok-cli`   | `http://127.0.0.1:56122/callback`                |

`localhost` ในที่นี้หมายถึง **เครื่องที่กำลังเรียกใช้เบราว์เซอร์** ขณะที่เซิร์ฟเวอร์ callback
สำหรับ PKCE ของ OmniRoute รอรับการเชื่อมต่ออยู่บน loopback ของ**เซิร์ฟเวอร์** หากเปิดแดชบอร์ดผ่าน
ที่อยู่ LAN เช่น `http://192.168.0.15:20128` ทั้งสองส่วนจะไม่มีทางเชื่อมถึงกัน: authorization
code จะถูกส่งไปยัง `localhost:1455` ของแล็ปท็อปคุณเอง ซึ่งไม่มีสิ่งใดรอรับการเชื่อมต่ออยู่
และผู้ให้บริการจะไม่สามารถลงชื่อเข้าใช้ได้โดยไม่แสดงข้อผิดพลาด

แดชบอร์ดจะตรวจพบกรณีนี้ก่อนเปิดป๊อปอัป และแสดงคำสั่งสำหรับสร้าง tunnel
แทนที่จะปล่อยให้การเข้าสู่ระบบล้มเหลวโดยไม่มีข้อความแจ้ง (#8046)

### วิธีแก้ไข — forward พอร์ต**ทั้งสอง**

```bash
# บนเครื่องที่กำลังเรียกใช้เบราว์เซอร์:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# จากนั้นเปิด http://localhost:20128 และเชื่อมต่อ Codex จากที่นั่น
```

จำเป็นต้อง forward สองรายการ และการ forward เพียงรายการเดียวก็ยังคงล้มเหลว:

- **`20128`** (พอร์ตของแดชบอร์ด) ทำให้ origin เป็น localhost จริง ซึ่งเป็นเงื่อนไขที่
  ทำให้ OmniRoute เริ่มเซิร์ฟเวอร์ callback สำหรับ PKCE — origin จาก LAN จะไม่
  เข้าสู่ branch นี้
- **`1455`** (พอร์ต callback แบบคงที่ของผู้ให้บริการ) คือปลายทางที่เบราว์เซอร์ถูกส่งกลับไป
  และต้อง tunnel ต่อไปยัง loopback ของเซิร์ฟเวอร์

เปลี่ยน `1455` เป็น `56121`/`56122` เมื่อเชื่อมต่อ xAI หรือ Grok CLI และเปลี่ยน `20128` เป็น
พอร์ตแดชบอร์ดที่คุณใช้จริง เปิด tunnel ค้างไว้จนกว่าสถานะการเชื่อมต่อจะแสดงว่า
ทำงานอยู่

> **ไม่มีสิทธิ์เข้าถึง SSH?** Codex และ Grok CLI รองรับการวางโทเค็นเช่นกัน — ใช้แท็บ **Paste API
> Key** / **Import auth.json** ในกล่องโต้ตอบการเชื่อมต่อ วิธีนี้ไม่มี callback แบบ loopback
> จึงใช้งานได้จากทุก origin นอกจากนี้ Codex ยังรองรับ access token แบบเปล่า
> หรือ blob ของเซสชัน `~/.codex/auth.json`

---

## การจัดการโทเค็น

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ แสดงความลับเพียงครั้งเดียว — คัดลอกตอนนี้
omniroute tokens list                 # ซ่อนค่าบางส่วน: id, name, scope, prefix, status, expiry
omniroute tokens revoke <id|prefix>   # เพิกถอนทันที
omniroute tokens scopes               # อธิบายขอบเขตทั้งสาม
```

คำสั่ง `tokens` ต้องใช้ข้อมูลรับรองระดับ **admin** นอกจากนี้ยังจัดการโทเค็นได้ในแดชบอร์ดที่ **Settings → Access Tokens** (สร้าง เพิกถอน คัดลอกได้ครั้งเดียว)

โทเค็นจะไม่มีวันถูกสร้างด้วยสิทธิ์ที่มากกว่าที่ผู้สร้างมี โทเค็น `admin` จะสร้างได้เฉพาะผู้ดูแลระบบเท่านั้น ได้แก่ เซสชันแดชบอร์ด CLI ในเครื่องบนเซิร์ฟเวอร์เอง หรือ `omniroute connect` ที่ใช้รหัสผ่าน ข้อมูลรับรองของเครื่อง (โทเค็นการเข้าถึง `admin` หรือ API key ที่มีขอบเขต `manage`/`admin`) สร้างได้เฉพาะโทเค็น `write` และ `read` หากขอ `--scope admin` จะได้รับ `403` การปิดการล็อกอินไม่ได้เปิดช่องให้สร้างโทเค็นได้ เพราะโทเค็นการเข้าถึงทุกขอบเขตเป็นข้อมูลรับรองที่เส้นทางที่ยืนยันตัวตนแล้วยอมรับ ดังนั้นการเรียกแบบไม่ระบุตัวตนจะได้รับ `401` ในทุกขอบเขต

---

## การตั้งค่า CLI สำหรับเขียนโค้ดจากแคตตาล็อกระยะไกล

`omniroute configure` อ่านแคตตาล็อกโมเดลสดของ **เซิร์ฟเวอร์ที่ใช้งานอยู่** และเขียนการตั้งค่าลงบนเครื่องของ **คุณ**

```bash
omniroute configure codex
#   Providers: glm, kmc, ollamacloud, opencode-go, …   （รายการผู้ให้บริการ）
#   Provider: glm
#   Model id: glm/glm-5.2
#   ✔ เขียน ~/.codex/glm52.config.toml แล้ว
#   วิธีใช้:  codex --profile glm52

# แบบไม่โต้ตอบ
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# เก็บโมเดลที่ใช้บ่อยไว้ด้านบนสุดของตัวเลือกแบบโต้ตอบ
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

ตัวเลือกจะเก็บเฉพาะรหัสโมเดล (ไม่เก็บ URL หรือข้อมูลรับรอง) ไว้ในไฟล์ `model-preferences.json` ในเครื่อง โดยแยกตามบริบทและเป้าหมาย CLI รายการโปรดจะแสดงก่อนการเลือกล่าสุด ใช้ `--unfavorite` เพื่อลบโมเดลที่เลือกออกจากรายการของบริบท/เป้าหมายนั้น

โปรไฟล์ที่เขียนออกไปจะอ้างอิงคีย์การอนุมานผ่านตัวแปรสภาพแวดล้อม (`OMNIROUTE_API_KEY`) ดังนั้นความลับจะไม่ถูกเขียนลงดิสก์ สำหรับการตั้งค่า Codex พื้นฐานครั้งเดียว (บล็อก `[model_providers.omniroute]`) ดู [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md)

### เปิด CLI ไปยังเซิร์ฟเวอร์ระยะไกล (ไม่เขียนการตั้งค่า)

`omniroute run <target>` ก็ใช้บริบทที่ใช้งานอยู่เช่นกัน URL ฐานของระยะไกลและข้อมูลรับรองของบริบทจะถูกฉีดเข้าไปในโพรเซสที่เปิดขึ้นเท่านั้น

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → ระยะไกล
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# ดูตัวอย่างว่าจะเปิดอะไรบ้างแบบแม่นยำ (แสดงเฉพาะชื่อคีย์ของตัวแปรสภาพแวดล้อม ไม่แสดงค่า):
omniroute run codex --dry-run --json
```

เป้าหมาย: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` (แหล่งข้อมูลเดียว: `bin/cli/cli-manifest.mjs`) Qwen และ Gemini ทำงานใน home ชั่วคราวที่แยกจากกันซึ่งจะถูกลบเมื่อออก ดังนั้นการเปิดแต่ละครั้งจะไม่แตะต้องหรือรั่วไหลเข้าไปในการตั้งค่าเครื่องมือส่วนตัวของคุณ

### คำสั่งตั้งค่าแยกตาม CLI

CLI ที่รองรับแต่ละตัวมีคำสั่งตั้งค่าที่รู้จักระยะไกล (ทุกคำสั่งเคารพบริบทที่ใช้งานอยู่ หรือใช้ `--remote <url> --api-key <key>`)

| CLI         | Command                    | สิ่งที่เขียน                                                                                                                                                                 |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | โปรไฟล์ `~/.codex/<name>.config.toml` (ต่อโมเดล)                                                                                                                             |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (ต่อโมเดล)                                                                                                                         |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — ผู้ให้บริการ `omniroute` ที่เข้ากันได้กับ OpenAI พร้อมทุกโมเดลในแคตตาล็อก (รันด้วย `opencode -m omniroute/<model>`)                     |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (โหมด CLI) + แสดงการตั้งค่าส่วนขยาย VS Code ให้วาง (เข้ากันได้กับ OpenAI, Base URL **ไม่มี** `/v1`)                               |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + การตั้งค่า `kilocode.*` ของ VS Code — เข้ากันได้กับ OpenAI, Base URL **มี** `/v1`                                                    |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **มี** `/v1`, คีย์ระบุผ่าน `${{ secrets.OMNIROUTE_API_KEY }}`                       |
| Cursor      | `omniroute setup-cursor`   | แสดงขั้นตอนในแอป (Settings → Models → Override OpenAI Base URL ใส่ Base URL **มี** `/v1` + คีย์ + โมเดล) การตั้งค่าของ Cursor เป็น SQLite ที่อ่านยาก จึงใช้ได้เฉพาะแผงแชต    |
| Roo Code    | `omniroute setup-roo`      | เขียน JSON สำหรับนำเข้า Roo (`~/.omniroute/roo-settings.json`) + ตั้งค่า `roo-cline.autoImportSettingsPath` + แสดงขั้นตอนบน UI (เข้ากันได้กับ OpenAI, Base URL **มี** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — ผู้ให้บริการ `openai-compat`, `base_url` **มี** `/v1`, คีย์ผ่าน `$OMNIROUTE_API_KEY`                                                          |
| Zed         | `omniroute setup-zed`      | `~/.config/zed/settings.json` — `language_models.openai_compatible.omniroute`, `api_url` **มี** `/v1`, คีย์ที่ Zed อ่านจาก `$OMNIROUTE_API_KEY` (ไม่ได้เขียนลงไฟล์)          |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **ไม่มี** `/v1` + `GOOSE_MODEL`) + สูตร env                                                           |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **ไม่มี** `/v1` + `model: openai/<id>`) + สูตร env (`aider --message --yes`)                                                          |
| Qwen Code   | `omniroute setup-qwen`     | รายการ V4 `modelProviders.openai` ใน `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` ใน `~/.qwen/.env`                                                                         |

```bash
# OpenCode (ผู้ให้บริการที่เข้ากันได้กับ OpenAI, โมเดลทั้งหมดในแคตตาล็อก, VPS ระยะไกล)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # เก็บเฉพาะโมเดลที่ตรงกัน
opencode -m omniroute/glm/glm-5.2 "..."          # ส่งออก OMNIROUTE_API_KEY ก่อน
```

---

> OpenCode ยังมีการเชื่อมต่อแบบ **plugin** ที่ครบกว่า: `omniroute setup opencode` (รองรับ `--remote` แล้ว) จะติดตั้ง `@omniroute/opencode-plugin`
> `setup-opencode` เป็นทางเลือกที่เบากว่าซึ่งเข้ากันได้กับ OpenAI API key ถูกอ้างอิงผ่าน `{env:OMNIROUTE_API_KEY}` และไม่เคยถูกเขียนลงดิสก์
>
> บน OpenCode v2 ให้ใช้ `@omniroute/opencode-plugin-v2` แทน แคตตาล็อกเหมือนกัน แต่สัญญาของ loader ต่างกัน โดยจะอ่านคีย์จากที่เก็บข้อมูลรับรองของ OpenCode เองเมื่อเชื่อมต่อการผสานรวมไว้แล้ว ดังนั้นเกตเวย์ระยะไกลจึงไม่ต้องมีคีย์อยู่ใน `opencode.json` เลย

---

## การจัดการคอนเท็กซ์ (สลับระหว่างเซิร์ฟเวอร์)

**คอนเท็กซ์** คือเซิร์ฟเวอร์ที่บันทึกไว้ (baseUrl + ข้อมูลรับรอง + ขอบเขต) `omniroute connect`
จะสร้างคอนเท็กซ์และทำให้มันทำงานอยู่; หลังจากนั้นทุกคำสั่งจะกำหนดเป้าหมายไปที่คอนเท็กซ์นั้น จัดการและ
สลับระหว่างคอนเท็กซ์ด้วย `omniroute contexts`:

```bash
omniroute contexts list            # คอนเท็กซ์ทั้งหมด; คอนเท็กซ์ที่ทำงานอยู่จะถูกทำเครื่องหมาย ●
omniroute contexts current         # เซิร์ฟเวอร์ที่ทำงานอยู่, สถานะการตรวจสอบสิทธิ์, ขอบเขต
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**สลับเซิร์ฟเวอร์** — ทุกคำสั่งที่ตามมาจะใช้คอนเท็กซ์ที่ทำงานอยู่:

```bash
omniroute contexts use vps         # → ตอนนี้ทุกคำสั่งจะส่งไปยัง VPS ระยะไกล
omniroute tokens list              #   (ทำงานกับ VPS)

omniroute contexts use default     # → กลับไปที่ localhost
omniroute tokens list              #   (ทำงานกับเซิร์ฟเวอร์ในเครื่อง)
```

**เพิ่มคอนเท็กซ์ด้วยตนเอง** (แทนที่จะใช้ `connect`), ตรวจสอบ หรือเปลี่ยนชื่อ:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # รายละเอียดทั้งหมดสำหรับหนึ่งคอนเท็กซ์
omniroute contexts rename staging stg
```

**ลบคอนเท็กซ์** — จะมีการแจ้งเตือนเพื่อยืนยัน; ส่ง `--yes` เพื่อข้ามการยืนยัน
(จำเป็นสำหรับสคริปต์ / เชลล์ที่ไม่ใช่แบบโต้ตอบ ซึ่งจะปฏิเสธอย่างปลอดภัย):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) ไม่สามารถลบได้ การลบคอนเท็กซ์ที่ทำงานอยู่จะกลับไปใช้
> `default` เคล็ดลับ: การลบคอนเท็กซ์จะลบเฉพาะข้อมูลรับรองที่บันทึกไว้ใน**เครื่อง**เท่านั้น —
> เพิกถอนโทเค็นบนเซิร์ฟเวอร์ด้วย `omniroute tokens revoke <id>` เพื่อยกเลิกการเข้าถึงจริง ๆ

**ส่งออก / นำเข้า** คอนเท็กซ์ (เช่น เพื่อย้ายระหว่างเครื่อง) การส่งออกจะละเว้น
ข้อมูลรับรองโดยค่าเริ่มต้น รวมถึงข้อมูลรับรองที่จัดเก็บโดยการสำรองไฟล์ ใช้
`--include-secrets` อย่างชัดเจนเมื่อต้องการสำรองข้อมูลที่มีข้อมูลรับรองที่สามารถพกพาได้:

```bash
omniroute contexts export --out contexts.json     # ถูกแก้ไข; ปลายทางเริ่มต้น: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # เขียนทับ; --merge เพื่อเก็บข้อมูลที่มีอยู่
omniroute contexts migrate --yes                  # ย้ายโทเค็นข้อความธรรมดาแบบเก่าไปยังพวงกุญแจ
```

`--include-secrets` จะแก้ไขการอ้างอิงพวงกุญแจก่อนการส่งออกและจะล้มเหลวหาก
ข้อมูลรับรองที่อ้างอิงไม่สามารถอ่านได้ `--no-secrets` จะมีความสำคัญเสมอ
ไฟล์ส่งออกจะถูกเขียนแบบอะตอมมิกด้วยโหมด `0600` ถือว่าการส่งออกที่มี
ความลับอย่างชัดเจนเป็นข้อมูลลับ บนระบบที่ไม่มีหน้าจอและไม่มีพวงกุญแจ OS ที่ใช้งานได้
CLI จะกลับไปใช้ `config.json` ด้วยโหมด `0600` และพิมพ์คำเตือนเพียงครั้งเดียว;
การส่งออกเริ่มต้นจะยังคงถูกแก้ไขในโหมดนี้

---

## การตรวจสอบแบบครบวงจรอย่างรวดเร็ว

วงจรการทำงานที่สามารถคัดลอกและวางได้ เพื่อยืนยันการตั้งค่าระยะไกลตั้งแต่ต้น — เชื่อมต่อ สร้าง
โทเค็นที่มีขอบเขต กำหนดเส้นทางคำสั่ง สลับกลับ และรื้อถอน แทนที่
`192.168.0.15` ด้วยโฮสต์/IP ของเซิร์ฟเวอร์ของคุณ (Tailscale, LAN หรือ URL
`https://…` สาธารณะ)

```bash
# 1. เชื่อมต่อ (รหัสผ่าน → โทเค็น admin ซึ่งบันทึกเป็นบริบทและกำหนดให้ใช้งานอยู่)
omniroute connect 192.168.0.15                 # หรือ: --key oma_live_xxxx  (ไม่ใช้รหัสผ่าน)
omniroute contexts current                     # แสดงเซิร์ฟเวอร์ระยะไกล + ขอบเขต

# 2. ใช้งาน — ตอนนี้คำสั่งจัดการจะทำงานกับเซิร์ฟเวอร์ระยะไกล
omniroute tokens create --name laptop --scope read   # สร้างโทเค็นที่มีขอบเขตแคบลง
omniroute tokens list                                 # รายการที่ปกปิดข้อมูลแล้ว จากเซิร์ฟเวอร์ระยะไกล

# 3. สลับไปมา
omniroute contexts use default                 # → ภายในเครื่อง
omniroute contexts use 192-168-0-15            # → กลับไปยังเซิร์ฟเวอร์ระยะไกลอีกครั้ง (ชื่อจาก `contexts list`)

# 4. รื้อถอน หมายเหตุ: `contexts remove` จะลบเฉพาะข้อมูลประจำตัวในเครื่อง —
#    คำสั่งนี้จะไม่เพิกถอนโทเค็นบนเซิร์ฟเวอร์ หากต้องการ
#    ยุติการเข้าถึงจริง ให้เพิกถอนบนเซิร์ฟเวอร์ก่อน
omniroute tokens revoke <id|prefix>            # ยุติการเข้าถึงบนเซิร์ฟเวอร์
omniroute contexts remove 192-168-0-15 --yes   # ลบบริบทภายในเครื่อง (แม้กำลังใช้งานอยู่ → จะกลับไปใช้ default), ไม่ถามยืนยัน
```

> `--yes` ทำให้ `contexts remove` ทำงานแบบไม่โต้ตอบ (จำเป็นในสคริปต์/CI; หากไม่ระบุ
> เชลล์ที่ไม่โต้ตอบจะปฏิเสธอย่างปลอดภัยแทนที่จะค้าง) การลบบริบทที่
> **ใช้งานอยู่**จะเปลี่ยนกลับไปใช้ `default` โดยอัตโนมัติ

---

## หมายเหตุด้านความปลอดภัย

- โทเค็นในรูปแบบข้อความธรรมดาจะแสดงเพียงครั้งเดียว โดยจะจัดเก็บถาวรเฉพาะแฮช SHA-256 เท่านั้น (เช่นเดียวกับ API keys)
- `omniroute connect` ใช้กลไกล็อกเอาต์เมื่อพยายามเข้าสู่ระบบแบบ brute-force และการบันทึก audit log ร่วมกับระบบเข้าสู่ระบบ
- ควรใช้ HTTPS หรือ Tailnet สำหรับการรับส่งข้อมูล โดยค่าเริ่มต้น โฮสต์เปล่าจะใช้ `http://`
  เพื่อความสะดวกในการใช้งานผ่าน LAN/Tailscale — ให้ส่ง URL แบบเต็มในรูปแบบ `https://…` เพื่อใช้ TLS
- ไฟล์บริบทภายในเครื่องที่แนะนำคือ `~/.omniroute/config.json` (`chmod 600`)
  ซึ่งมีเพียง `credentialRef` เท่านั้น ส่วนตัวโทเค็นจะถูกเก็บไว้ในพวงกุญแจของระบบปฏิบัติการ
  (`keytar`) และจะไม่ถูกพิมพ์ลงในล็อก การติดตั้งแบบ headless ที่ไม่มี
  พวงกุญแจแบบเนทีฟซึ่งใช้งานได้ จะใช้ไฟล์ `0600` เดียวกันเป็นทางเลือกสำรองอย่างชัดเจนและ
  แสดงคำเตือนหนึ่งครั้ง ใช้ `omniroute contexts migrate --yes` หลังจากติดตั้ง
  แบ็กเอนด์พวงกุญแจแล้ว

---

## API endpoints (ข้อมูลอ้างอิง)

| เมธอด  | เส้นทาง               | การยืนยันตัวตน          | ขอบเขต                           |
| ------ | --------------------- | ----------------------- | -------------------------------- |
| POST   | `/api/cli/connect`    | รหัสผ่านสำหรับการจัดการ | — (สาธารณะ, ป้องกันด้วยรหัสผ่าน) |
| GET    | `/api/cli/whoami`     | โทเค็นการเข้าถึง        | อ่าน                             |
| GET    | `/api/cli/tokens`     | โทเค็นการเข้าถึง        | ผู้ดูแลระบบ                      |
| POST   | `/api/cli/tokens`     | โทเค็นการเข้าถึง        | ผู้ดูแลระบบ                      |
| DELETE | `/api/cli/tokens/:id` | โทเค็นการเข้าถึง        | ผู้ดูแลระบบ                      |

ดูสคีมาแบบเต็มได้ที่ [openapi.yaml](../openapi.yaml)
