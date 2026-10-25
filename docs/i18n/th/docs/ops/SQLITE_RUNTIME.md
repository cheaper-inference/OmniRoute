# SQLite Runtime Resolution (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute จะตรวจหาไดรเวอร์ SQLite เมื่อเริ่มต้นระบบผ่านลำดับการสำรอง 5 ขั้นตอน:

1. **`better-sqlite3` ที่มาพร้อมแพ็กเกจ** (ผ่าน `dependencies` ใน `package.json`)
   — เร็วที่สุด เป็นไบนารีเนทีฟ และติดตั้งโดย `npm install` เมื่อมีเครื่องมือสำหรับบิลด์

2. **`better-sqlite3` ที่ติดตั้งขณะรันไทม์** (ใน `~/.omniroute/runtime/`)
   — ติดตั้งแบบ Lazy เมื่อเรียกใช้ครั้งแรก **หรือ** โดย `scripts/build/postinstall.mjs → scripts/postinstall.mjs`
   ตรวจสอบ Magic Byte ของไฟล์เนทีฟ `.node` (ELF / Mach-O / PE) ก่อนโหลด
   เพื่อป้องกันไบนารีที่เสียหายหรือสร้างมาสำหรับแพลตฟอร์มอื่น

3. **`node:sqlite`** (ไลบรารีมาตรฐานของ Node ≥22.5) — ไม่ต้องบิลด์โค้ดเนทีฟ ใช้เมื่อ
   เส้นทาง better-sqlite3 ทั้งสองล้มเหลว โดยมีชุดคุณสมบัติที่จำกัด

4. **`sql.js`** (WASM) — ตัวเลือกสำรองสุดท้าย ทำงานได้ทุกที่แต่ช้ากว่า
   และเขียนข้อมูลตามช่วงเวลาแทนการเขียนแบบซิงโครนัส

## เหตุใดจึงซับซ้อนเช่นนี้?

- **Windows EBUSY**: `npm install -g omniroute@latest` อาจล้มเหลวหากไฟล์
  `better_sqlite3.node` ของเวอร์ชันก่อนหน้าถูกล็อกโดยโปรเซสที่กำลังทำงาน การติดตั้งขณะรันไทม์
  ใน `~/.omniroute/runtime/` ช่วยหลีกเลี่ยงแคช npm ส่วนกลาง
- **ไม่มีเครื่องมือสำหรับบิลด์**: บางสภาพแวดล้อม (Windows ขององค์กรที่ไม่มี VS Build
  Tools หรืออิมเมจ Docker แบบมินิมอล) ไม่สามารถคอมไพล์ `better-sqlite3` ได้ ตัวติดตั้งขณะรันไทม์
  จะดึงไบนารีที่บิลด์ไว้ล่วงหน้าจากรีจิสทรี npm ส่วนไดรเวอร์สำรอง
  ช่วยให้ OmniRoute ยังคงเริ่มทำงานได้แม้ว่ากระบวนการดังกล่าวจะล้มเหลว
- **ระบบที่แยกจากเครือข่าย**: หากไม่สามารถเข้าถึงรีจิสทรี npm ได้ `node:sqlite`
  หรือ `sql.js` จะรับประกันฟังก์ชันการทำงานพื้นฐาน

## การตรวจสอบ Magic Byte

ก่อนโหลดไฟล์ `.node` ที่ติดตั้งขณะรันไทม์ OmniRoute จะอ่าน 8 ไบต์แรก
และเปรียบเทียบกับ Magic Byte ที่ทราบของแต่ละแพลตฟอร์ม:

| แพลตฟอร์ม             | ไบต์ (ฐานสิบหก) | ป้ายกำกับ   |
| --------------------- | --------------- | ----------- |
| Linux                 | `7F 45 4C 46`   | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF`   | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE`   | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE`   | `macho-fat` |
| Windows               | `4D 5A` (MZ)    | `pe`        |

หาก Magic Byte ไม่ตรงกัน → ไฟล์จะถูกละเว้น และกระบวนการสำรองจะดำเนินต่อไปยังขั้นตอนถัดไป

## การตรวจสอบไดรเวอร์ที่ใช้งานอยู่

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## การควบคุมด้วยตนเอง

```bash
# ข้ามการวอร์มอัปหลังการติดตั้ง (สำหรับการติดตั้ง CI ที่รวดเร็ว)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# บังคับติดตั้ง better-sqlite3 ขณะรันไทม์ใหม่
rm -rf ~/.omniroute/runtime
omniroute  # จะติดตั้งใหม่เมื่อเริ่มทำงานครั้งถัดไป

# ตรวจสอบว่าไดรเวอร์ใดกำลังทำงานอยู่
omniroute config db-info  # (หากมีคำสั่ง CLI นี้)
```

## การวินิจฉัยการหยุดชะงักแบบซิงโครนัส

เมื่อใช้ `better-sqlite3` ให้ตั้งค่า `OMNIROUTE_SQLITE_SLOW_MS=200` ก่อนเริ่มต้นระบบเพื่อเลือก
เปิดใช้การจับเวลาของอะแดปเตอร์แบบซิงโครนัส โดยค่าเริ่มต้นจะปิดอยู่ การดำเนินการที่เสร็จสิ้นและใช้เวลา
อย่างน้อยตามจำนวนมิลลิวินาทีที่กำหนดจะส่งคำเตือน `[SQLITE-SLOW]` ไม่เกินหนึ่งครั้งต่อ
สิบวินาทีต่ออะแดปเตอร์ คำเตือนจะมีเฉพาะไดรเวอร์ คลาสของการดำเนินการ
(`prepare`, `get`, `all`, `run`, `exec`, `pragma`, ธุรกรรม หรือการบำรุงรักษา) และ
ระยะเวลาที่ใช้เป็นมิลลิวินาที โดยไม่มี SQL, bindings, แถวข้อมูล, พาธ หรือข้อความข้อยกเว้น

นี่เป็นเพียงตัวช่วยวินิจฉัย ไม่ใช่การหมดเวลาหรือการปรับประสิทธิภาพคิวรี โดยไม่สามารถรายงาน
การดำเนินการที่ไม่คืนค่ากลับมา แยกแยะงานของ CPU ออกจากการรอดิสก์ ระบุ
SQL ที่แน่นอน หรือสังเกตการดำเนินการผ่านแฮนเดิลไดรเวอร์ดิบ
ระยะเวลาของการสำรองข้อมูลแบบอะซิงโครนัสจะไม่ถูกรวมโดยเจตนา และไดรเวอร์ SQLite อื่นๆ
จะไม่มีการเก็บข้อมูลโดยตัวเลือกนี้ การปิดใช้งานตัวแปรจะคืนค่าอะแดปเตอร์เดิม
โดยไม่มี Wrapper สำหรับจับเวลา ไม่มีการเปลี่ยนแปลงสคีมาฐานข้อมูลหรือการกำหนดค่าที่จัดเก็บไว้

คำเตือนความหน่วงของ `/healthz` จะรายงานค่าสูงสุดของ Event Loop นับจากตัวอย่างก่อนหน้า
ไม่ใช่ค่าเฉลี่ยตลอดอายุการทำงาน ควรเทียบ Timestamp กับคำเตือนการดำเนินการที่ช้า
และเมตริกของโฮสต์/พื้นที่จัดเก็บ ก่อนสรุปว่าการหยุดชะงักเกิดจาก SQLite หรือดิสก์ล้มเหลว

## เอกสารอ้างอิง

การนำไปใช้:

- `bin/cli/runtime/magicBytes.mjs` — ตัวช่วยตรวจสอบ Magic Byte ของไบนารี
- `bin/cli/runtime/sqliteRuntime.mjs` — ตัวแก้ไขรันไทม์แบบ 5 ขั้นตอน + ตัวติดตั้งแบบ Lazy
- `bin/cli/runtime/index.mjs` — ตัวประสานงานการเริ่มต้นระบบ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — Hook หลังการติดตั้งของ npm (การวอร์มอัปที่ล้มเหลวได้โดยไม่ร้ายแรง)
- `src/lib/db/core.ts` — ส่งออก `ensureDbInitialized()` / `getDriverInfo()`

## โทโพโลยีแบบผู้เขียนรายเดียว (ไม่รองรับ HA)

ลำดับไดรเวอร์สำรองด้านบนยังคงทำงานใน **โปรเซสเดียว** โดยค่าเริ่มต้น OmniRoute ที่ใช้ SQLite
เป็นระบบแบบ **ผู้เขียนรายเดียว**:

- อย่าเชื่อมต่อ Replica ของ OmniRoute สองตัวเข้ากับไฟล์ `storage.sqlite` เดียวกัน
- การรีสตาร์ตคอนเทนเนอร์ การดีพลอยแบบ Recreate การหยุดโปรเซสเนื่องจาก OOM หรือการรีสตาร์ตโดย HEALTHCHECK
  จะตัดทุกเซสชัน SSE ที่กำลังทำงานอยู่ เส้นทางมาตรฐานไม่มีกระบวนการระบายเซสชัน
- Liveness ของ Orchestrator ที่ถือว่า `/healthz` ที่ตอบสนองช้าคือระบบตาย จะหยุด
  Replica เพียงตัวเดียว ควรใช้ TCP สำหรับ Liveness + HTTP `/healthz` สำหรับ Readiness โปรดดู
  [คู่มือ Docker — ความพร้อมใช้งาน](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  และ [คำแนะนำ Probe สำหรับ Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)
