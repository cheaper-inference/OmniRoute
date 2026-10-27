# Quality Gates Reference (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

เอกสารนี้เป็นแหล่งอ้างอิงหลักที่มีผลบังคับใช้สำหรับเกตตรวจสอบคุณภาพ CI ทั้งหมดใน OmniRoute
โดยอธิบายแต่ละเกต สิ่งที่เกตตรวจสอบ งาน CI ที่เกตทำงานอยู่ นโยบายที่ใช้ว่าเป็น
ค่าฐานแบบ ratchet หรือผ่าน/ไม่ผ่าน รวมถึงเกตนั้นบล็อกบิลด์หรือมีไว้เพื่อให้คำแนะนำ

สำหรับสรุปแบบย่อและนโยบาย allowlist โปรดดูส่วน "Quality Gates & Ratchets"
ใน `AGENTS.md` สำหรับการประเมินเชิงวิพากษ์ การจัดระดับวุฒิภาวะ และแผนการจำลองระบบเดียวกัน
โดยไม่ขึ้นกับเครื่องมือ โปรดดู
[คู่มือ Quality Gate](../ops/QUALITY_GATE_PLAYBOOK.md)

---

## รายการเกตและโปรไฟล์การดำเนินการ

### การรับผู้สมัคร

เวิร์กโฟลว์ CI และ Quality Gates ต่างให้ผลตัดสินที่คงที่ ได้แก่ `Gate / CI` และ
`Gate / Quality` นโยบายการรับเข้าแบบมีเวอร์ชันของทั้งสองเวิร์กโฟลว์ระบุงานต้นทางทุกงาน
ว่าเป็นงานที่จำเป็นหรืองานให้คำแนะนำ งานที่จำเป็นและเข้าเกณฑ์ต้องสำเร็จ โดยผลลัพธ์ที่หายไป
ถูกยกเลิก ถูกข้าม อยู่ระหว่างดำเนินการ หรือไม่ทราบสถานะ ไม่สามารถยืนยัน PASS ได้ การจำแนก
ที่ถูกต้องว่าเป็นเฉพาะเอกสารหรือเฉพาะแค็ตตาล็อกอาจทำให้เลนโค้ดไม่เข้าเกณฑ์ใช้งาน
แต่ PR แบบร่างไม่ถือเป็นผู้สมัครที่ได้รับการยอมรับ ป้ายกำกับ `hotfix` ไม่ได้ยกเว้นข้อกำหนดด้านหลักฐาน

ทั้งสองเวิร์กโฟลว์ครอบคลุม PR ที่มุ่งเข้าสู่กิ่ง main/release, การพุชไปยัง `main`, การสั่งทำงานด้วยตนเอง
และเหตุการณ์ merge-group การพุช การสั่งทำงาน และ merge-group จะเรียกใช้การเลือกแบบเต็ม การพุชไปยัง
`release/**` จะไม่เริ่มเวิร์กโฟลว์เหล่านี้ (2026-10-18) เนื่องจากการเปลี่ยนแปลงแต่ละรายการได้เรียกใช้เมทริกซ์ใน PR
ของตนแล้ว และชุดการเปลี่ยนแปลงที่ผสานแล้วเป็นหน้าที่ของ Release-Green (`docs/ops/RUNNER_BOX.md` → เลนแบบโฮสต์) ฟอร์ก
และ merge group ใช้รันเนอร์แบบโฮสต์สำหรับงานที่ตามปกติจะเลือกรันเนอร์แบบโฮสต์เอง
โดยต้องตรวจสอบว่ามีความจุแบบโฮสต์เพียงพอก่อนเปิดใช้งาน

ใบรับรอง JSON แต่ละรายการระบุ SHA ที่เช็กเอาต์ การเรียกใช้เวิร์กโฟลว์ และครั้งที่พยายาม
CLI จะปฏิเสธเมื่อ SHA ของการเช็กเอาต์และเหตุการณ์ไม่ตรงกัน การทดสอบเวิร์กโฟลว์ผูกสมาชิกของนโยบาย
เข้ากับรายการ `needs` ของงานตัดสิน เพื่อไม่ให้เลนที่เพิ่มใหม่หรือถูกนำออกหายไปโดยไม่มีการแจ้งเตือน
ใบรับรองครอบคลุมเฉพาะเวิร์กโฟลว์ของตนเอง ไม่ครอบคลุมการเผยแพร่ การปรับใช้ หรือการทำงานภายใน
ของตัวสแกนให้คำแนะนำที่มีอยู่ การเปิดใช้งานชื่อเช็กทั้งสองในกฎของกิ่งเป็นการเปลี่ยนแปลงด้านการดูแลระบบ
ที่แยกต่างหาก การเพิ่มงานเหล่านี้ไม่ได้ปกป้องกิ่งโดยตัวมันเอง

### หลักฐานที่เก็บรักษาไว้ในตัวลดผลการยอมรับ

`scripts/quality/validate-release-acceptance.mjs` ลดรูปแผนที่ระบุและไฟล์แมนิเฟสต์ของแผนนั้น
แต่ไม่ได้ยืนยันว่าแผนครอบคลุมไปป์ไลน์การเผยแพร่ทั้งหมด รายงานของสคริปต์กำหนด
`releaseAcceptance: false` ไว้อย่างชัดเจน แม้ว่าแผนนั้นจะเป็น
`VERIFIED` ก็ตาม เวิร์กโฟลว์ `release-acceptance.yml` ยังคงใช้ฟิกซ์เจอร์เงา ไม่ใช่
ใบรับรองจริงจากการบิลด์ การทำแพ็กเกจ การบูต หรือการโปรโมต

CLI กำหนดให้ใช้ `--evidence-root` เพื่อตรวจสอบหลักฐานที่เก็บรักษาไว้ ไฟล์จะได้รับการแก้ตำแหน่ง
เป็น `<evidence-root>/<artifact_id>/<member>` และแฮชด้วย SHA-256 ระเบียน PASS
ที่ไม่มีหลักฐาน ไฟล์ที่หายไปหรือเปลี่ยนแปลง พาธที่ไม่ปลอดภัย หรือ symlink จะขัดขวาง
การตรวจสอบ ไฟล์ที่หายไปไม่เทียบเท่ากับล็อกว่างที่สำเร็จ การตรวจสอบ SHA/การเรียกใช้/ครั้งที่พยายาม
ที่มีอยู่ยังคงเป็นอิสระต่อกัน กล่าวคือไบต์ที่ตรงกันไม่สามารถกู้ใบรับรองที่ล้าสมัยได้
ความสมบูรณ์ของไฟล์ไม่ใช่หลักฐานยืนยันความถูกต้องแท้จริงของการดำเนินการหรือการโปรโมตอาร์ติแฟกต์

### ความจุการดำเนินการ UI

CI เรียกใช้รายการ UI ทั้งหมดเป็นเมทริกซ์ `test-vitest` จำนวนสี่ชาร์ด โดยแต่ละชาร์ดมีเวิร์กเกอร์
ได้สูงสุดสองตัวและใช้กำหนดเวลางาน 15 นาทีที่มีอยู่ ชาร์ดแรกยังเรียกใช้
ชุด Vitest ของ MCP/autoCombo ด้วย ผลลัพธ์ของงานที่จำเป็นครอบคลุมทุกเลกของเมทริกซ์
การล้มเหลวหรือการยกเลิกชาร์ดใดชาร์ดหนึ่งไม่สามารถยืนยันการรับผู้สมัครได้

ตัวสังเกตการณ์รายคืนเก็บใบรับรองผู้สมัครที่ตรงกันทุกประการแยกต่างหากสำหรับ UI แต่ละชาร์ด
รวมถึงการดำเนินการ MCP ในใบรับรองแรก จำเป็นต้องมีใบรับรองทั้งสี่รายการ ล็อก และ
ข้อมูลประจำตัวการดำเนินการที่ตรงกัน การเรียกใช้ `npm run test:vitest:ui` ในเครื่องยังคงเลือก
ชุดทดสอบทั้งหมด ส่วนการเรียกใช้ `--shard` เพียงหนึ่งครั้งเป็นเพียงหลักฐานบางส่วน

### การรวบรวมความครอบคลุมของยูนิต

ยูนิตชาร์ดทั้งสิบสองรายการรวบรวมความครอบคลุม V8 ระหว่างการดำเนินการทดสอบที่มีอยู่ ชาร์ดที่สำเร็จ
จะเรียกใช้ `scripts/ci/compact-v8-coverage.mjs` เพื่อบีบอัดไฟล์ต้นฉบับโดยไม่สร้าง
รายงาน Istanbul ขั้นกลาง งาน Coverage ขั้นสุดท้ายจะตรวจสอบแมนิเฟสต์ทั้งสิบสองรายการเทียบกับ
SHA ของผู้สมัคร รันไทม์ รูทซอร์ส และแฮชข้อมูล จากนั้นเรียกใช้ตัวสร้างรายงานของ c8 และเกณฑ์
ความครอบคลุมที่มีอยู่ อินพุตจะรักษาลำดับชื่อไฟล์ส่วนกลางของ c8 ไว้ การผสานล่วงหน้าแยกตามชาร์ด
ไม่ปลอดภัยสำหรับความครอบคลุมฟังก์ชัน/บล็อกแบบผสม ชาร์ดที่หายไป มีรูปแบบไม่ถูกต้อง
หรือเข้ากันไม่ได้จะทำให้การรับเข้าไม่ผ่าน ชาร์ดทดสอบที่ล้มเหลวจะเก็บความครอบคลุมดิบ
สำหรับการวินิจฉัยไว้แยกต่างหาก และไม่สามารถนำเข้าสู่การผสานขั้นสุดท้ายได้

### รายการสแกนแบบสแตติก

รายการนามแฝง npm แบบมีเวอร์ชันและสมาชิกของการสแกนแบบสแตติกอยู่ใน
`config/quality/gate-manifest.json` เรียกใช้ `npm run check:gate-manifest` เพื่อตรวจสอบ
ชื่อสคริปต์และคำสั่งที่ตรงกันทุกประการกับ `package.json` การเพิ่ม การนำออก และ
การเปลี่ยนแปลงคำสั่งจะทำให้ทั้งฮุกในเครื่องและงานจำแนกการเปลี่ยนแปลงใน CI ล้มเหลว
นามแฝงไม่ใช่งานของเวิร์กโฟลว์ อินสแตนซ์เมทริกซ์ หรือกรณีทดสอบ ดังนั้นจึงห้ามนำจำนวนเหล่านี้
มาเสนอว่าใช้แทนกันได้

ใช้ `npm run quality:scan -- --list` หรือ `npm run quality:scan:fast -- --list`
เพื่อตรวจสอบนามแฝงที่เลือกโดยไม่ดำเนินการ รันเนอร์เรียกใช้จุดเริ่มต้น npm
ดังนั้นรันไทม์ของจุดเริ่มต้นนั้นจึงยังคงอยู่ รวมถึง Bun ในตำแหน่งที่กำหนดค่าไว้
แมนิเฟสต์บันทึกนามแฝงที่อยู่นอกโปรไฟล์เหล่านั้นว่าได้รับการเรียกใช้แยกต่างหาก และ
ห้ามใช้คำสั่งบำรุงรักษาในโปรไฟล์สแกนแบบอ่านอย่างเดียว

โปรไฟล์เหล่านี้ครอบคลุมเฉพาะการสแกนแบบสแตติก ไม่ได้รับรองการทดสอบผลิตภัณฑ์
ความครอบคลุม การทำแพ็กเกจ การตรวจสอบภายนอก หรือการยอมรับการเผยแพร่ทั้งหมดของผู้สมัคร
การรับเข้าของเวิร์กโฟลว์ใช้ `config/quality/admission-policy.json` ที่เชื่อมโยงไว้และ
`scripts/quality/admission-verdict.mjs` โปรไฟล์ของตัวสังเกตการณ์การเผยแพร่ยังคงแยกต่างหาก
ควรตรวจสอบเช็กและใบรับรองที่เข้าเกณฑ์ของโปรไฟล์เหล่านั้นโดยอิสระ คำสั่งสแตติกของตัวสังเกตการณ์แบบเต็ม
ได้รับการประกาศใน `config/quality/release-green-static-profile.json` ซึ่งรวมถึง
`audit:deps` การเลือกการทดสอบการกลายพันธุ์ และการตรวจสอบคำแปล ตัวโหลดจะตรวจสอบคำสั่ง npm
เทียบกับ package.json และการประกาศ CI/Quality ที่จำลองไว้ โดยจะปฏิเสธความคลาดเคลื่อน
แทนการดำเนินการโทเค็นเชลล์ในฐานะอาร์กิวเมนต์ เอาต์พุต SKIP/INCOMPLETE จากตัวสแกนที่จำเป็น
ไม่สามารถยืนยัน PASS ได้ โปรไฟล์บันทึกข้อยกเว้นภายนอกของตน และไม่ได้ใช้แทน
ความครอบคลุมแบบโฮสต์ เมทริกซ์การทดสอบ หลักฐานการทำแพ็กเกจ หรือหลักฐานการปรับใช้ รายการแบบร้อยแก้วด้านล่าง
เป็นข้อมูลอ้างอิง ไม่ใช่หลักฐานว่าเกตได้ดำเนินการจริง

สคริปต์อยู่ภายใต้ `scripts/check/` (เกตนโยบาย) และ `scripts/quality/` (เอนจินแรตเชต)
แหล่งข้อมูลจริงของ CI คือ `.github/workflows/ci.yml`

### เส้นทางด่วนสำหรับ PR การเผยแพร่ (`quality.yml`)

`.github/workflows/quality.yml` ทำงานเสริม CI สำหรับ PR ที่ส่งไปยัง main/release, การพุชไปยัง `main`,
การ dispatch และ merge groups ส่วน PR จะใช้การตรวจสอบแบบรวดเร็วที่กรองตาม path งาน build ที่ซ้ำซ้อน
และถูกปิดใช้งานอย่างถาวรถูกนำออกแล้ว ส่วนการตรวจสอบ build/package/boot จริงยังคงอยู่ใน CI

| งาน                                              | ขอบเขต                                                                                                                                                                                                          | บล็อกการผสาน    |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | PR เอกสาร/โค้ด; การอ้างอิงเอกสาร API และ docs-all                                                                                                                                                               | ใช่             |
| `Fast Quality Gates`                             | PR โค้ด; การตรวจสอบแบบสถิต, typecheck, typecheck ของ dashboard และ unit test ที่ได้รับผลกระทบ                                                                                                                   | ใช่             |
| `Forgotten sibling tests`                        | PR โค้ด; ติดตามโมดูลที่เปลี่ยนแปลงไปยัง consumer แบบสถิตและ sibling test ที่อาจเกี่ยวข้อง; path ของ barrel และ dynamic import จะถูกรายงานเป็นข้อมูลวินิจฉัยเชิงแนะนำ พร้อมข้อยกเว้นใน allowlist ที่มีการอ้างอิง | **เชิงแนะนำ**   |
| `Vitest (fast-path)`                             | PR โค้ด; ชุดทดสอบ vitest แบบรวดเร็ว                                                                                                                                                                             | ใช่             |
| `Unit Tests fast-path`                           | PR โค้ด; ชุด unit test แบบ 4 shard                                                                                                                                                                              | ใช่             |
| `No new ESLint warnings`                         | PR โค้ด; ตัวควบคุม lint ที่คำนึงถึงการ suppression                                                                                                                                                              | ใช่ รวมถึง fork |
| `Merge integrity (changelog + generated skills)` | PR ที่ไม่ใช่ draft; การซิงค์ changelog และ skill ที่สร้างขึ้น                                                                                                                                                   | ใช่ รวมถึง fork |

#### รายงาน Forgotten sibling tests

`npm run check:forgotten-sibling-tests` ใช้ import resolver ที่อยู่เบื้องหลังแผนที่ผลกระทบต่อการทดสอบซ้ำ
สำหรับโมดูล production ที่เปลี่ยนแปลงแต่ละโมดูล ระบบจะรายงานสายโซ่
`changed module/symbol -> static consumer -> candidate sibling test` ที่ให้ผลลัพธ์แน่นอน เมื่อ test ที่อาจเกี่ยวข้อง
ไม่ปรากฏอยู่ใน diff ของ pull request สรุป Markdown และผลลัพธ์ JSON จะถูกเก็บไว้เป็น
อาร์ติแฟกต์ `forgotten-sibling-tests` ของ workflow เพื่อใช้ปรับเทียบก่อนนำการบล็อกมาใช้งาน

การ re-export ผ่าน barrel และ dynamic import เป็นเพียงข้อมูลวินิจฉัยด้านการ resolve เท่านั้น และจะไม่สร้าง
ผลการตรวจพบที่บล็อกการผสาน ข้อยกเว้นที่ผ่านการตรวจทานจะอยู่ใน
`config/quality/forgotten-sibling-allowlist.json` แต่ละรายการต้องระบุ consumer และ candidate
test ให้เหตุผลที่เฉพาะเจาะจง และลิงก์ไปยัง GitHub issue หรือ pull request รายการที่มีรูปแบบไม่ถูกต้องจะทำให้
การตรวจสอบล้มเหลวแบบ fail-closed ข้อยกเว้นไม่สามารถระงับ candidate test ที่ถูกลบ หรือ diff ที่เพิ่ม `.skip`/`.todo`;
การลดความเข้มงวดของ assertion และการปกปิดรูปแบบอื่น ๆ ยังคงอยู่ภายใต้ gate
`check:test-masking` ซึ่งบล็อกการผสานอย่างเป็นอิสระ

### งาน: `lint`

ทำงานในทุก PR ที่ส่งไปยัง `main` และบล็อกการผสานเมื่อล้มเหลว

| สคริปต์ (`npm run ...`)           | ตรวจสอบ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | มีผลบล็อก                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | เวอร์ชัน Node.js อยู่ภายในช่วงที่รองรับ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                       |
| `check:cycles`                    | การนำเข้าแบบวนซ้ำทั่วทั้ง `src/` + `open-sse/` (อิง AST และ resolve `paths` ของ tsconfig) การรันแบบพื้นฐานจะจบด้วยรหัส 1 เมื่อมีวงจรใด ๆ อยู่ (fail-closed ตั้งแต่ #15281) และแสดงรายการ SCC ทั้งหมด `check:cycles:ratchet` (ที่ CI เรียกใช้) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.cycles` ใน `quality-baseline.json` — ปัจจุบันคือ 14, `direction: down` ดังนั้นจึงลดลงได้เท่านั้น (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ใช่ (ratchet)                             |
| `check:boundary`                  | การเชื่อมโยง `open-sse → src`: การนำเข้าจากไฟล์หนึ่งไปยังอีกไฟล์หนึ่งแบบไม่ซ้ำ จากเอนจินเข้าสู่แอป (`scripts/quality/measure-boundary.mjs`; รายการ edge คือรายการงานคงค้างสำหรับการแก้ไข core/module-split ของ v4) แบบพื้นฐาน = รายงานเพื่อให้คำแนะนำ (เหมือนกับ `quality:boundary`) `check:boundary:ratchet` (ที่ CI เรียกใช้ และอยู่ในลูป ratchet ของ fast-gates ใน `quality.yml` ด้วย) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.boundaryOpenSseToSrc` ใน `quality-baseline.json` — ตั้งต้นไว้ที่ค่าที่วัดได้ 771, `direction: down`; `--update` จะลดค่าได้เท่านั้น; เปรียบเทียบกับฐานใน PR (`--base-ref` ดูด้านล่าง)                                                                                                                                                                                                                                                                                                                            | ใช่ (ratchet)                             |
| `check:route-validation:t06`      | มีสคีมา Zod ในทุก route (นโยบาย Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                       |
| `check:any-budget:t11`            | จำนวน `@ts-expect-error // any` ไม่เกินงบประมาณ (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                       |
| `check:provider-consistency`      | ผู้ให้บริการทุกรายใน `providers.ts` มีรายการที่ตรงกันใน `providerRegistry.ts` (และในทางกลับกัน ภายใน allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `check:model-lifecycle`           | ตารางการกำหนดเส้นทางสามตารางที่ดูแลด้วยตนเองยังคงสอดคล้องกับสแนปช็อตวงจรชีวิตที่บันทึกไว้ในรีโพซิทอรี (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ไม่ให้คะแนน id ที่เลิกใช้งานแล้วซึ่ง `REGISTRY` ยังสามารถกำหนดเส้นทางได้; เป้าหมายของ `BUILT_IN_ALIASES` ทุกรายการมีอยู่ใน `REGISTRY` และไม่มีอยู่ในสแนปช็อต id ที่เลิกใช้งานแล้ว; id ที่เลิกใช้งานแล้วทุกรายการซึ่งยังอยู่ใน `REGISTRY` จะถูกส่งต่อหรือระบุไว้ใน `allowedRetiredInCatalog`; และไม่มีต้นทางหรือปลายทางของ `DEFAULT_DEGRADATION_MAP` รายการใดปรากฏว่าเลิกใช้งานแล้วในสแนปช็อตดังกล่าว การตรวจสอบนี้ไม่ได้พิสูจน์ว่าโมเดลกำลังให้บริการโดย upstream ที่ใช้งานอยู่ในขณะนี้ ทำงานแบบออฟไลน์ — เปรียบเทียบกับ `config/quality/model-lifecycle.json` ซึ่งรีเฟรชด้วยตนเองโดยใช้ `npm run quality:refresh-model-lifecycle` (ใช้เครือข่าย; ไม่ได้เชื่อมเข้ากับ CI) `allowedRetiredInCatalog` เป็นกลไก ratchet สำหรับทยอยลดจำนวน: เพิ่มรายการได้เฉพาะเมื่อมี tracking issue เท่านั้น | ใช่                                       |
| `check:fetch-targets`             | `fetch("/api/...")` ทุกรายการใน `src/` ฝั่งไคลเอนต์สามารถแปลงไปยัง `route.ts` ที่มีอยู่จริงได้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ใช่                                       |
| `check:deps`                      | dependency ทั้งหมดที่ติดตั้งได้ด้วย `npm install` จาก `package.json` ทุกไฟล์ในรีโพซิทอรีอยู่ใน `dependency-allowlist.json`; package ใหม่ที่ไม่ได้ตรึงเวอร์ชันหรือมีลักษณะเป็น slopsquatting จะถูกแจ้งเตือน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                       |
| `audit:deps`                      | การตรวจสอบด้วย npm audit สำหรับ lockfile อิสระทั้งห้าไฟล์ (root, Electron, ปลั๊กอิน OpenCode v1/v2 และ provider) คำแนะนำด้านความปลอดภัยระดับวิกฤตจะบล็อก ส่วนคำแนะนำระดับสูงยังคงแสดงเป็นคำเตือน การตรวจสอบที่หายไป/ล้มเหลวจะมีสถานะ INCOMPLETE และบล็อกไว้; hash ของ lock และรายงานแยกตาม scope จะถูกเก็บรักษาไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                       |
| `check:lockfile`                  | ความถูกต้องสมบูรณ์ของ `package-lock.json` — รีจิสทรี https, แฮชความถูกต้องสมบูรณ์, ไม่มีการแทนที่โฮสต์                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ใช่                                       |
| `check:licenses`                  | รายการอนุญาตสิทธิ์การใช้งาน SPDX สำหรับ dependencies ที่ใช้ใน production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                       |
| `check:tracked-artifacts`         | ไม่มี build artifacts / symlinks ของ `node_modules` ที่ commit ไว้ (ทำงานใน husky pre-commit ด้วย; ตั้งใจให้ pre-push มีขั้นตอนน้อย — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่                                       |
| `check:ai-attribution`            | ไม่มี trailer `Co-Authored-By` ของ AI/บอต หรือ footer ที่ระบุว่าสร้างโดย AI ใน commits, ชื่อ หรือเนื้อหาของ PR — กฎเคร่งครัดข้อที่ 16 (อยู่ในลูป fast-gates ของ `quality.yml` สำหรับ PR→`release/**` — อ่าน event payload และไม่ดำเนินการใด ๆ หากไม่ใช่ PR — และเป็นขั้นตอนเฉพาะ PR ใน lint ของ `ci.yml` สำหรับ PR→`main`; รวมถึง hook `commit-msg` ของ husky; อนุญาตผู้เขียนร่วมที่เป็นมนุษย์; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | การยกเว้น Vitest ทุกรายการต้องระบุ tracking issue และปรากฏอยู่ใน `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                       |
| `check:file-size`                 | ไฟล์ซอร์ส (`.ts`/`.tsx` ใน `src/`, `open-sse/`, `electron/`, `bin/`) ต้องมีขนาดไม่เกิน `cap` และไฟล์ทดสอบ (`*.test.ts(x)`) ต้องไม่เกิน `testCap`; ไฟล์ที่ตรึงไว้ใน `file-size-baseline.json` (`frozen` / `testFrozen`) ต้องไม่ขยายเกินขนาดที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ใช่                                       |
| `check:error-helper`              | การตอบกลับข้อผิดพลาดใน executors/handlers ใช้ `buildErrorBody()` / `sanitizeErrorMessage()` (กฎบังคับ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                       |
| `check:migration-numbering`       | ไฟล์ Migration SQL มีหมายเลขเรียงตามลำดับ โดยไม่มีหมายเลขขาดหรือซ้ำกัน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ใช่                                       |
| `check:public-creds`              | ไม่มี OAuth `client_id`/`client_secret` แบบค่าลิเทอรัลหรือคีย์ Firebase Web ภายนอก `publicCreds.ts` (กฎบังคับ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                       |
| `check:db-rules`                  | ไม่มี SQL ดิบภายนอกโมดูล `src/lib/db/`; ไม่มีการนำเข้าแบบ barrel จาก `localDb.ts` (กฎบังคับ #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                       |
| `check:known-symbols`             | Provider executors, routing strategies และ translators ที่ลงทะเบียนในตาราง dispatch ตรงกับไฟล์บนดิสก์ — ไม่มีสัญลักษณ์ที่ไม่มีไฟล์รองรับหรือไม่ได้ประกาศ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                       |
| `check:route-guard-membership`    | ทุก route ที่สร้าง child process ได้รับการจำแนกโดย `isLocalOnlyPath()` (กฎบังคับ #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:test-discovery`            | ไฟล์ `*.test.ts` / `*.spec.ts` ทุกไฟล์ใน repo ถูกรวบรวมโดย test runner อย่างน้อยหนึ่งตัว (ratchet: รายการไฟล์กำพร้าใน `test-discovery-baseline.json` ลดลงได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ใช่                                       |
| `check:test-tla-order`            | ไม่มีไฟล์ `node:test` ภายใต้ `tests/unit` ที่ลงทะเบียนการทดสอบ พบ top-level `await` แล้วจึงลงทะเบียนการทดสอบเพิ่มเติม (#18045; ratchet: `test-tla-order-allowlist.json` ลดลงได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                       |
| `check:agent-skills-sync`         | อาร์ติแฟกต์ agent-skills ที่สร้างขึ้นตรงกับแค็ตตาล็อกต้นทาง (ไม่มีความคลาดเคลื่อน)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | โลโก้/แอสเซ็ตของผู้ให้บริการมีรายการแหล่งที่มาที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | ไฟล์การกำหนดค่า JSON สามารถ parse ได้และเป็นไปตามกฎ lint ของ repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | คอมไพล์ TypeScript โดยไม่มีข้อผิดพลาด (มีเพียงคำเตือนเชิงแนะนำ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `typecheck:noimplicit:core`       | `noImplicitAny` แบบเข้มงวด — มุ่งรองรับอนาคต; ตำแหน่งเรียกใช้งานเดิมจำนวนมากยังคงต้องเพิ่ม annotation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **เชิงแนะนำ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ที่จำกัดขอบเขตไว้เฉพาะ `src/app/(dashboard)/**` (#7033) — รายการอนุญาต 27 ไฟล์ที่คัดสรรไว้ของ `typecheck:core` ไม่ได้รวม TSX ของแดชบอร์ดใดๆ และ `next build` ก็ไม่เคยตรวจสอบชนิดให้เช่นกัน (`next.config.mjs` ตั้งค่า `ignoreBuildErrors: true`) ดังนั้นรีเกรสชันของตัวระบุที่ไม่มีการประกาศในส่วนนั้น (#6625/#6909) จึงไม่ปรากฏต่อ CI เปรียบเทียบส่วนต่างกับค่าพื้นฐานแบบตรึงของจำนวนต่อไฟล์/ต่อรหัส TS (`config/quality/dashboard-typecheck-baseline.json` โดยใช้รูปแบบการบังคับตรวจสอบความล้าสมัยเดียวกับ `check:known-symbols`) — เฉพาะข้อผิดพลาดใหม่ที่เกินจำนวนในค่าพื้นฐานเท่านั้นที่จะทำให้เกตล้มเหลว ให้ปรับค่าลงด้วย `--update` เมื่อแก้ไขข้อผิดพลาดที่มีอยู่ก่อนแล้ว                                                                                                                                                                                                                                                         | ใช่                                       |

### งาน: `quality-gate`

ทำงานหลังจาก `test-coverage` และบล็อกการผสานเมื่อเกิดความล้มเหลว

| สคริปต์                      | สิ่งที่ตรวจสอบ                                                                                                                                                               | การบล็อก                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `quality:collect`            | สร้าง `quality-metrics.json` (จำนวนคำเตือน ESLint และความครอบคลุมจากรายงานชาร์ดที่ผสานแล้ว)                                                                                  | ใช่ (เป็นต้นทางของแรตเช็ต) |
| `quality:ratchet`            | แต่ละเมตริกใน `quality-baseline.json` ไม่มีการถดถอย (คำเตือน ESLint ≤ ค่าพื้นฐาน; ความครอบคลุม ≥ ค่าพื้นฐาน)                                                                 | ใช่                        |
| `check:duplication`          | การทำซ้ำของโค้ด (jscpd@4) ไม่เกินค่าพื้นฐานใน `quality-baseline.json`                                                                                                        | ใช่                        |
| `check:complexity`           | ความซับซ้อนเชิงวัฏจักรระดับไฟล์ไม่เกินเพดาน (กฎ `complexity` + `max-lines-per-function` ของ ESLint หลัก)                                                                     | ใช่                        |
| `check:cognitive-complexity` | แรตเช็ตความซับซ้อนเชิงการรับรู้ (`eslint-plugin-sonarjs`) — การรัน ESLint แยกต่างหาก; CI รันทั้งสองรายการรวมกันเป็นขั้นตอนเดียวคือ `check:complexity-ratchets`               | ใช่                        |
| `check:dead-code`            | แรตเช็ตการส่งออก / ไฟล์ที่ไม่ได้ใช้ (knip) ไม่มีการถดถอยเมื่อเทียบกับค่าพื้นฐาน                                                                                              | ใช่                        |
| `check:compression-budget`   | งบประมาณเบนช์มาร์กการบีบอัด — ค่าขั้นต่ำของการประหยัดโทเค็นต่อเอนจินต้องไม่ถดถอย                                                                                             | ใช่                        |
| `check:type-coverage`        | แรตเช็ตเปอร์เซ็นต์โค้ดที่มีชนิด (`type-coverage`) ไม่มีการถดถอย; ครอบคลุมหน้าที่ส่วนใหญ่ของ `typecheck:noimplicit:core`                                                      | ใช่                        |
| `check:codeql-ratchet`       | จำนวนการแจ้งเตือน CodeQL ที่เปิดอยู่ไม่มีการถดถอย (อ่านผ่าน `gh api`; ข้ามอย่างเหมาะสมเมื่อไม่มีโทเค็น) — รอบการรีเฟรชและการทริกเกอร์ด้วยตนเอง: ดู "แรตเช็ต CodeQL" ด้านล่าง | ใช่                        |

### งาน: `quality-extended`

งานนี้บล็อกแคนดิเดตที่เกี่ยวข้อง มีการตรวจสอบขนาดบันเดิล การตรวจพบข้อมูลลับ
การตรวจพบช่องโหว่ การตรวจพบปัญหาในเวิร์กโฟลว์ และการเปลี่ยนแปลง OpenAPI ด้วยแรตเช็ตที่จำเป็น
การวินิจฉัยการขึ้นต่อกันแบบวนซ้ำยังคงเป็นเพียงคำแนะนำ จำเป็นต้องติดตั้งสแกนเนอร์:
`scripts/ci/install-quality-scanners.sh` จัดเตรียมเวอร์ชันที่ตรึงไว้และส่งต่อ
ความล้มเหลวในการติดตั้ง เครื่องมือที่ขาดหายไป รายงานที่ไม่ถูกต้อง หรือค่าพื้นฐานที่ขาดหายไปจะทำให้
เกตสแกนเนอร์ที่จำเป็นอยู่ในสถานะ INCOMPLETE

| สคริปต์                  | สิ่งที่ตรวจสอบ                                                                                                                                                                                                               | การบล็อก                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:circular-deps`    | ไม่มีการขึ้นต่อกันแบบวนรอบ (dpdm)                                                                                                                                                                                            | **คำแนะนำ**                                   |
| `check:bundle-size`      | ขนาดบันเดิลไม่เกินขีดจำกัด การวัดที่ไม่พร้อมใช้งานถือว่าไม่ผ่าน                                                                                                                                                              | **บล็อกเมื่อใช้ --ratchet**                   |
| `check:secrets`          | ผลการตรวจพบของ Gitleaks ต้องไม่ถดถอย การสแกนที่จำเป็นจะปฏิเสธกรณีไม่มีเครื่องมือ/ซอร์ส/ข้อมูลฐาน การสแกนล้มเหลว และรายงานที่ไม่ถูกต้อง                                                                                       | **บล็อกเมื่อใช้ --ratchet**                   |
| `check:vuln-ratchet`     | ช่องโหว่ของการขึ้นต่อกันต้องไม่ถดถอย การสแกนที่จำเป็นจะปฏิเสธกรณีไม่มีเครื่องมือ รายงานไม่ถูกต้อง หรือไม่มีข้อมูลฐาน                                                                                                         | **บล็อกเมื่อใช้ --ratchet**                   |
| `check:workflows`        | ตรวจสอบเวิร์กโฟลว์ (actionlint + zizmor) เครื่องมือสแกนที่ไม่มี/เสีย รายงานไม่ถูกต้อง หรือไม่มีข้อมูลฐาน ratchet จะถือว่าล้มเหลวด้วยสถานะ INCOMPLETE ผลการตรวจพบที่ถูกต้องจะเป็นไปตามนโยบาย strict/advisory/ratchet ที่เลือก | ต้องดำเนินการ โดย zizmor ratchet จะบล็อกใน CI |
| `check:openapi-breaking` | ตรวจสอบสัญญา Public API เทียบกับคอมมิตเหตุการณ์ที่ตรึงไว้ (merge-base ของ PR, ค่าก่อน push, ฐานของ merge-group; สำหรับ scheduled/manual ให้ checkout parent แรก) การวัดที่จำเป็นจะล้มเหลวแบบปิด                              | **บล็อกเมื่อใช้ --ratchet**                   |

### งาน: `docs-sync-strict`

สำหรับ pull request ไปยัง `main` หรือ `release/**` งานนี้จะทำงานเฉพาะกับรายการที่ไม่ใช่ฉบับร่าง (หรืออยู่ในคิวที่เชื่อถือได้) และได้รับการจัดประเภทว่าเป็นการเปลี่ยนแปลงเอกสารหรือโค้ด นอกจากนี้ยังทำงานกับเหตุการณ์ CI ที่ไม่ใช่ PR ด้วย โดยทริกเกอร์ push ของเวิร์กโฟลว์นี้ครอบคลุมเฉพาะ `main` ไม่ครอบคลุม `release/**` ขั้นตอนที่จบด้วยรหัสออกที่ไม่ใช่ศูนย์จะบล็อกงาน ส่วนข้อค้นพบที่รายงานอย่างเดียวและข้อยกเว้นที่ระบุไว้ด้านล่างจะไม่บล็อกงาน

| สคริปต์                        | สิ่งที่ตรวจสอบ                                                                                                                                                                                                                                                                                                                                           | การบล็อก                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | เมตาเกตที่เรียกใช้เกตย่อยทั้ง 7 รายการด้านล่างตามลำดับ                                                                                                                                                                                                                                                                                                   | ใช่                                                                                                                   |
| ↳ `check:docs-sync`            | ความสอดคล้องของเวอร์ชันแพ็กเกจ/OpenAPI/CHANGELOG, สำเนามิเรอร์ของ `llm.txt` ที่ตรงกันทุกประการ, เงื่อนไขคงที่ของส่วนและขนาดของ CHANGELOG ที่แปลแล้ว และการไม่มีเอกสารซ้ำที่ถูกแทนที่ไปแล้ว                                                                                                                                                               | ใช่                                                                                                                   |
| ↳ `check:docs-frontmatter`     | หน้าเอกสารที่คอมไพล์แล้วมีชื่อใน frontmatter ที่ถูกต้อง                                                                                                                                                                                                                                                                                                  | ใช่                                                                                                                   |
| ↳ `check:docs-counts`          | เงื่อนไขคงที่ของจำนวนที่มีความเชื่อมั่นสูงบังคับใช้อย่างเข้มงวด ส่วนการตรวจจำนวนไฟล์แบบฮิวริสติกจะแจ้งเตือนเท่านั้น เว้นแต่สคริปต์จะได้รับ `--strict` (เมตาเกตของ CI ไม่ได้ส่งแฟล็กนี้)                                                                                                                                                                  | ระดับเข้มงวดบล็อก; ระดับผ่อนปรนให้คำแนะนำ                                                                             |
| ↳ `check:env-doc-sync`         | การอ่านตัวแปรสภาพแวดล้อมในซอร์สโค้ด, `.env.example` และ `docs/reference/ENVIRONMENT.md` สอดคล้องกันหลังใช้รายการข้อยกเว้นที่ระบุไว้อย่างชัดเจนสำหรับรายการที่ละเว้น รายการที่มีเฉพาะในเอกสาร และรายการที่มีเฉพาะในสภาพแวดล้อม                                                                                                                            | ใช่ สำหรับรายการนอกเหนือจากรายการข้อยกเว้นที่บันทึกไว้                                                                |
| ↳ `check:deprecated-versions`  | รายงานเวอร์ชันที่อาจล้าสมัยซึ่งอยู่นอกบริบทเชิงประวัติศาสตร์ที่ปลอดภัย และวันที่อัปเดตที่เก่า โดยไม่นับเอกสารที่กำหนดให้ละเว้น                                                                                                                                                                                                                           | ให้คำแนะนำในการกำหนดค่า CI ปัจจุบัน (ไม่ได้ส่ง `--strict`)                                                            |
| ↳ `check:doc-links`            | ลิงก์ markdown ภายในเอกสารชี้ไปยังไฟล์ที่มีอยู่จริง (รูปแบบ `[text]`/`(path)`)                                                                                                                                                                                                                                                                           | ใช่                                                                                                                   |
| ↳ `check:fabricated-docs`      | เส้นทาง ตัวแปรสภาพแวดล้อม คำสั่ง CLI ชื่อ hook และพาธไฟล์ที่อ้างถึงในเอกสารต้องมีอยู่ในโค้ดเบส เป็นเกตบังคับเมื่อใช้ `--strict` และอนุญาตให้ล้มเหลวได้เมื่อไม่มีแฟล็ก                                                                                                                                                                                    | ใช่ (ผ่าน `--strict` ใน CI)                                                                                           |
| `check:cli-i18n`               | คีย์ `t()` ที่ CLI ใช้งานมีอยู่ใน `en`; `pt-BR` คงทุกส่วนระดับบนสุดไว้; `zh-CN` และ `zh-TW` มีคีย์ครบถ้วนตรงกับ `en`                                                                                                                                                                                                                                     | ใช่                                                                                                                   |
| `check:openapi-coverage`       | ข้อกำหนด OpenAPI ครอบคลุมเส้นทางจริงอย่างน้อยตามค่าขั้นต่ำที่กำหนดด้วย ratchet                                                                                                                                                                                                                                                                           | ใช่                                                                                                                   |
| `check:openapi-security-tiers` | คำอธิบายประกอบ `x-loopback-only`/`x-always-protected` ที่ประกาศไว้ต้องมี `routeGuard.ts` รองรับ; ข้อผิดพลาดของตัวแยกวิเคราะห์และความไม่ตรงกันในการตรวจไปข้างหน้าจะบล็อก การตรวจย้อนกลับเพื่อหา `x-loopback-only` ที่ขาดไปภายใต้คำนำหน้าเฉพาะการเข้าถึงภายในเครื่องจะแจ้งเตือน และเส้นทางที่กำหนดด้วยแพตเทิร์นเท่านั้นจะไม่รวมอยู่ในการตรวจย้อนกลับรอบนี้ | การตรวจตัวแยกวิเคราะห์/ไปข้างหน้าบล็อก; การตรวจย้อนกลับให้คำแนะนำ                                                     |
| `check:openapi-routes`         | แต่ละพาธ `/api...` ใน `openapi.yaml` ตรงกับเส้นทางจริงโดยไม่ขึ้นกับความแตกต่างของพารามิเตอร์ หลังใช้รายการข้อยกเว้น `KNOWN_STALE_SPEC` ที่มีเหตุผลรองรับ; รายการข้อยกเว้นที่ล้าสมัยก็ทำให้การตรวจล้มเหลวด้วย                                                                                                                                             | ใช่                                                                                                                   |
| `check:docs-symbols`           | การอ้างอิง URL ภายใน `/api/...` ในเอกสารหลักที่ไม่ใช่สำเนามิเรอร์ตรงกับเส้นทางจริงหรือกลุ่มเส้นทาง; การอ้างอิงพร็อกซี/อัปสตรีม/ตัวยึดตำแหน่ง/ไฟล์ และรายการ `KNOWN_STALE_DOC_REFS` ที่มีเหตุผลรองรับจะได้รับการยกเว้น ส่วนรายการข้อยกเว้นที่ล้าสมัยจะทำให้การตรวจล้มเหลว                                                                                 | ใช่                                                                                                                   |
| `i18n translation drift`       | แฮชต้นทาง/ปลายทางของเอกสารแปลในชุดหลักตรงกับ `.i18n-state.json` PR จะล้มเหลวเฉพาะเมื่อมีความคลาดเคลื่อนที่เพิ่มเข้ามาใหม่ในต้นทาง ปลายทางที่หายไป หรือแฮชปลายทาง; การตรวจที่ไม่ใช่ PR เป็นแบบเข้มงวด ความคลาดเคลื่อนที่ PR สืบทอดมาและแฮชต้นทางของปลายทางที่ล้าสมัยจะเป็นคำเตือน                                                                         | ความคลาดเคลื่อนใหม่ใน PR และความคลาดเคลื่อนในการตรวจแบบเข้มงวดที่ไม่ใช่ PR บล็อก; รายการที่สืบทอดมา/ล้าสมัยให้คำแนะนำ |

SVG สำหรับ README ทั้งสิบสองไฟล์ใต้ `docs/diagrams/` สร้างด้วย `scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` จะสร้างทั้งหมดใหม่
แต่ละไฟล์มี unit test ที่เปรียบเทียบแบบไบต์ต่อไบต์ (`tests/unit/docs/readme-*-svg.test.ts` ในงาน `test-unit`) ซึ่งจะล้มเหลวเมื่อไฟล์ที่ commit ไว้ล้าสมัย
`check:docs-counts` อ่านตัวเลขมาตรฐานจากโหนด `<text>` ของไฟล์เหล่านี้ จึงไม่แปลงตัวเลขเป็นพาธเส้นขอบตัวอักษรเด็ดขาด
การตรวจตัวเลขมาตรฐานใน SVG อ่านไฟล์ที่ระบุใน `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`
การตรวจข้อความอ้างอิงเกี่ยวกับผู้ให้บริการที่ใช้ฟรีตลอดไป รายการในแค็ตตาล็อก พูลที่ต่ออายุเป็นรอบ และปัจจัยการให้คะแนน ยังอ่าน `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg` ด้วย
`free-tier-budget.svg` รับตัวเลขจากตัวโหลดแค็ตตาล็อกปัจจุบัน ดังนั้นการเปลี่ยน `FREE_MODEL_BUDGETS` หรือชื่อแสดงผลของผู้ให้บริการจะทำให้ CI ล้มเหลวจนกว่าจะสร้างไฟล์นั้นใหม่

### งาน: `i18n-ui-coverage`

| สคริปต์                               | สิ่งที่ตรวจสอบ                                                                                                                                                                      | การบล็อก    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (แบบอินไลน์) | ความครอบคลุมของคีย์ i18n สำหรับ UI ≥ 65%                                                                                                                                            | ใช่         |
| `check-ui-value-drift` (แบบอินไลน์)   | **ค่า** ภาษาอังกฤษที่เขียนใหม่ต้องไม่ทิ้งคำแปลเก่าที่ล้าสมัยไว้                                                                                                                     | ใช่         |
| `check-new-key-coverage` (แบบอินไลน์) | คีย์ภาษาอังกฤษ **ใหม่** ต้องได้รับการแปลในทุกโลเคล — มาร์กเกอร์ `__MISSING__:` จะถูกปฏิเสธ                                                                                          | ใช่         |
| `check-translation-ratio`             | อัตราส่วนคำแปลจริงต่อโลเคล (รายการที่เหมือนภาษาอังกฤษ / เป็นตัวยึดตำแหน่ง / ขาดหาย และอยู่นอกรายการอนุญาต) ต้องไม่เกิน `config/quality/i18n-translation-baseline.json` + ค่าผ่อนผัน | **คำแนะนำ** |

ต้องใช้ `fetch-depth: 0` — เกตตรวจสอบการคลาดเคลื่อนของค่าจะเปรียบเทียบ diff ของ `en.json` กับ merge base

#### `check-ui-value-drift` — เกตตรวจจับคำแปลล้าสมัย

ตรวจจับการถดถอยของ i18n ประเภทหนึ่งที่เกตอื่นไม่สามารถมองเห็นได้ในเชิงโครงสร้าง: ค่า
ภาษาอังกฤษถูกเขียนใหม่ แต่คำแปลที่สร้างจากภาษาอังกฤษ _เวอร์ชันก่อนหน้า_ ยังคงอยู่ ทำให้
ผู้ใช้ที่ไม่ได้ใช้ภาษาอังกฤษยังคงอ่านข้อความที่ดูน่าเชื่อถือแต่ปัจจุบันไม่ถูกต้องแล้ว

ปัญหานี้เคยถูกปล่อยใช้งานจริง `oauthModal.googleOAuthWarning` ถูกเขียนใหม่เมื่อเพิ่มตัวช่วย
เข้าสู่ระบบ Antigravity (#5203); **39 จาก 43 โลเคล** ยังคงมีข้อความที่บอกผู้ดูแลให้ "คัดลอก
URL แบบเต็มแล้ววางไว้ด้านล่าง" — ซึ่งเป็นขั้นตอนที่ไม่สามารถดำเนินการจนเสร็จสมบูรณ์สำหรับผู้ให้บริการรายนั้น ปัญหานี้
ไม่มีใครสังเกตเห็นจนกระทั่ง #8463 เนื่องจาก:

- `sync-ui-keys` เติมเฉพาะคีย์ที่ **ไม่มีอยู่** เท่านั้น และจะไม่แตะคีย์ที่ **ล้าสมัย**;
- `check-ui-keys-coverage` นับ _การมีอยู่_ ของคีย์ ดังนั้นคำแปลที่ล้าสมัยจึงถูกนับว่าครอบคลุมแล้ว;
- `check-translation-drift` ติดตามสำเนาเอกสาร `docs/i18n/<locale>/**.md` —
  โดยไม่เคยอ่าน `src/i18n/messages/*.json` บล็อกอยู่ในงาน `docs-sync-strict` ตั้งแต่การ
  ซิงก์ใหม่ใน 2026-09: แก้ไขเอกสารหลัก → `npm run i18n:run -- --files=<doc>` (ระดับส่วน ประหยัด)

**อิงตาม diff ไม่ได้อิงตาม baseline** โดยจะเปรียบเทียบ `en.json` ที่ merge base กับ
working tree; สำหรับทุกคีย์ที่ค่าภาษาอังกฤษเปลี่ยนแปลง โลเคลใดก็ตามที่ยังคงเก็บ
คำแปลเดิมที่ไม่ได้แก้ไขไว้จะถือว่าล้าสมัย วิธีนี้จงใจ **ตรึงหนี้เดิมที่มีอยู่แล้ว** — diff
ไม่สามารถระบุได้ว่าคำแปลที่มีมานานนั้นมาจากภาษาอังกฤษเวอร์ชันเก่าใด ดังนั้นเกตจึงตัดสิน
เฉพาะสิ่งที่การเปลี่ยนแปลงปัจจุบันแตะต้อง ทางเลือกอื่น (baseline แฮชต่อคีย์) จะทำให้เกิด
ไฟล์ที่สร้างขึ้นขนาดประมาณ 600 KB ซึ่งใหญ่กว่า baseline ที่มีอยู่ซึ่งใหญ่ที่สุดถึง 3 เท่า และเปลี่ยนแปลงในทุก PR ของ i18n

มีสองวิธีที่จะทำให้ผ่าน:

1. อัปเดตคำแปลที่ได้รับผลกระทบ หรือ
2. ตั้งค่าเป็น `__MISSING__:<new english>` — จากนั้นรันไทม์จะแสดงภาษาอังกฤษที่แก้ไขแล้ว
   (`src/i18n/request.ts::deepMergeFallback`, #7258) และคีย์จะเข้าสู่คิวเพื่อรอการแปล

หาก **ความหมาย** ของสตริงเปลี่ยนไป ควรเลือก **เปลี่ยนชื่อคีย์**: คีย์ใหม่ไม่สามารถสืบทอด
คำแปลที่ล้าสมัยได้ นี่คือรูปแบบที่ #8463 ใช้

```bash
npm run i18n:check-value-drift          # โหมดเข้มงวด (แบบที่ CI เรียกใช้)
npm run i18n:check-value-drift:warn     # รายงานเท่านั้น
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

จบการทำงานด้วยรหัส 0 พร้อม `SKIP reason=base-unresolved` เมื่อไม่สามารถอ่านแค็ตตาล็อกฐานได้ (เช่น shallow
clone ที่ไม่มี base ref) ซึ่งสอดคล้องกับ `check-openapi-breaking`

### งาน: `i18n`

เมทริกซ์การตรวจสอบ i18n แบบเต็ม (หนึ่งงานต่อโลเคล) งานทั้งหมดเป็นเพียงคำแนะนำ

| สคริปต์                         | สิ่งที่ตรวจสอบ              | การบล็อก                                              |
| ------------------------------- | --------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | ความสมบูรณ์ของคำแปลต่อโลเคล | **คำแนะนำ** (`continue-on-error: true` สำหรับทั้งงาน) |

### งาน: `pr-test-policy`

ทำงานเฉพาะกับ pull request

| สคริปต์                | สิ่งที่ตรวจสอบ                                                                                                                                             | การบล็อก |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR ที่เปลี่ยนโค้ดสำหรับใช้งานจริงใน `src/`, `open-sse/`, `electron/` หรือ `bin/` ต้องเพิ่มหรืออัปเดตการทดสอบ (กฎตายตัว #8)                                 | ใช่      |
| `check:test-masking`   | ไฟล์ทดสอบที่เปลี่ยนแปลงต้องไม่ลดจำนวน assert สุทธิหรือเพิ่มสัจนิรันดร์ `assert.ok(true)`                                                                   | ใช่      |
| `check:pr-evidence`    | เนื้อหา PR ต้องอ้างอิงหลักฐานการทดสอบ/VPS สำหรับการเปลี่ยนแปลงนั้น (ทำให้กฎตายตัว #18 เป็นระบบอัตโนมัติด้วยการ grep ข้อความใน PR — เปราะบาง โปรดดูงานค้าง) | ใช่      |

### งาน: `test-vitest`

ทำงานหลังจาก `build` และจะบล็อกการ merge เมื่อล้มเหลว

| ชุดทดสอบ         | ตรวจสอบความถูกต้อง                                               | การบล็อก                                                                                                        |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | เซิร์ฟเวอร์ MCP (110 เครื่องมือ), autoCombo, แคช — ตัวรัน vitest | ใช่                                                                                                             |
| `test:vitest:ui` | การทดสอบคอมโพเนนต์ UI — ตัวรัน vitest                            | **บล็อก** — ความล้มเหลวที่มีอยู่ก่อนถูกแยกออกอย่างชัดเจนใน `vitest.config.ts`; ความล้มเหลวใหม่จะทำให้งานล้มเหลว |

### เวิร์กโฟลว์รายคืน (ตามกำหนดเวลา, เพื่อให้คำแนะนำ)

เวิร์กโฟลว์เหล่านี้ทำงานตามกำหนดเวลา cron (และ `workflow_dispatch`) โดยจะไม่ทำงานบน PR ทั้งหมดมีไว้เพื่อให้คำแนะนำ

| เวิร์กโฟลว์            | ตรวจสอบความถูกต้อง                                                                                                                                                     | การบล็อก    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | การทดสอบพร็อพเพอร์ตีด้วย fast-check โดยใช้ค่าเริ่มต้นแบบสุ่ม + จำนวนรอบการรันสูง                                                                                       | **คำแนะนำ** |
| `nightly-resilience`   | เกณฑ์การเติบโตของฮีป, การฉีดข้อผิดพลาดแบบ chaos, การทดสอบโหลด/การทำงานต่อเนื่องด้วย k6                                                                                 | **คำแนะนำ** |
| `nightly-llm-security` | ตัวป้องกันการแทรก promptfoo (โหมดบล็อก) + โพรบ garak (ข้ามหากไม่มีข้อมูลลับของผู้ให้บริการ)                                                                            | **คำแนะนำ** |
| `nightly-schemathesis` | การฟัซสัญญา OpenAPI (schemathesis) กับ OmniRoute ที่ทำงานอยู่โดยใช้ `docs/openapi.yaml` — เปิดเผยการละเมิดข้อกำหนด / ข้อผิดพลาด 500 ที่ไม่ได้รับการจัดการ (Fase 8 B.4) | **คำแนะนำ** |
| `nightly-mutation`     | คะแนนการทดสอบแบบ mutation ของ Stryker ในเลนยูนิตแบบเร็ว — มิวแทนต์ที่รอดเผยให้เห็น assert ที่ไม่รัดกุม                                                                 | **คำแนะนำ** |
| `nightly-compat`       | เมทริกซ์ความเข้ากันได้ของเอนจิน Node ครอบคลุมช่วง `engines.node` ที่รองรับ                                                                                             | **คำแนะนำ** |

มีการบันทึกค่าฐานประสิทธิภาพ (ฮีป, TTFB, เวลาในการบิลด์) แต่ไม่ได้ใช้เป็นเกณฑ์บล็อก: ดู [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)

---

## ระยะเร่งความเร็ว (2026-08-30 → v4.0 LTS): ผ่อนปรนค่าฐานทุกค่า 20%

การตัดสินใจของผู้รับผิดชอบ (2026-08-30): จนกว่าจะมีการปรับโครงสร้างเป็นโมดูลใน v4.0 ความเร็วในการส่งมอบมีความสำคัญมากกว่า
การควบคุมหนี้ทางเทคนิคให้อยู่ในระดับเดิม ค่าฐานแบบ ratchet ที่เป็น **ตัวเลข** ทุกค่าถูกผ่อนปรน 20% ในรอบเดียว
ที่ตรวจสอบย้อนหลังได้ และมีการประกาศระยะนี้ไว้ใน `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| สิ่งที่เปลี่ยนแปลง                                                                                                                                                                                          | ตำแหน่ง                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — จำนวนที่ยิ่งต่ำยิ่งดี ×1.2, เปอร์เซ็นต์ที่ยิ่งสูงยิ่งดี ÷1.2 (คงค่าขั้นต่ำของ coverage ไว้ที่ 60, `eslintErrors` ยังคงเป็น 0, `eslintWarnings` 0 → 20% ของจำนวน suppression ที่ตรึงไว้) | `quality-baseline.json` (หมายเหตุ `_relax_velocity_2026_08_30` แสดงค่าก่อน → หลังทุกค่า)               |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ขีดจำกัดจำนวนบรรทัดของ `frozen[*]` / `testFrozen[*]` ทุกค่า ×1.2                                                                                                                          | `file-size-baseline.json`                                                                              |
| จำนวนต่อไฟล์ / ต่อโค้ด TS ×1.2                                                                                                                                                                              | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` เปลี่ยนเป็นเพียงคำแนะนำเมื่อ `_policy.requireTighten === false`                                                                                                                         | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| หยุด `bank-ratchet-shrinks` รายคืนชั่วคราว (มิฉะนั้นจะบันทึกค่าที่ลดลงจากการวัดและทำให้พื้นที่เผื่อหายไป)                                                                                                   | `.github/workflows/nightly-release-green.yml`                                                          |

รายการที่อนุญาต (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **ไม่ใช่** งบประมาณและไม่ได้ถูกแก้ไข เกณฑ์นโยบายผ่าน/ไม่ผ่าน (ข้อมูลลับ, กฎ SQL,
สัญญา docs/env, ความสอดคล้องของ i18n, การทดสอบหน่วย) ยังคงเดิม — การทดสอบที่ล้มเหลวยังคงถือว่าล้มเหลว

**เครื่องมือ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — การผ่อนปรนแบบ
  ครั้งเดียว (`scripts/quality/relax-baselines.mjs`); จะปฏิเสธการทำงานซ้ำด้วยหมายเหตุเดียวกัน
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  วัดเกณฑ์ตัวเลขทุกเกณฑ์ด้วยวิธีเดียวกับ CI และแสดงพื้นที่เผื่อที่เหลืออยู่สำหรับแต่ละเกณฑ์
  (`scripts/quality/baseline-headroom.mjs`) งาน `baseline-headroom` รายคืนจะเผยแพร่
  ตารางในสรุปการรัน workflow และอัปโหลดรายงาน JSON/Markdown เป็น
  `baseline-headroom-<run_id>` โดยเก็บรักษาไว้ 90 วัน แถวคำเตือนและวิกฤตจะระบุเกณฑ์
  ที่เหลือระยะไม่เกิน 10% ก่อนถึงขีดจำกัด หรือเกินขีดจำกัดไปแล้ว ให้ตรวจสอบรายงานเหล่านี้เพื่อเป็นสัญญาณเตือนล่วงหน้า
  ว่างบประมาณกำลังถูกใช้ไป และตรวจสอบหมายเหตุ `_rebaseline_*` ของเกณฑ์ที่เป็นปัญหา งานนี้จะไม่
  สร้างหรืออัปเดต issue ถาวรอีกต่อไป; #12149 เก็บรักษาประวัติรายงานก่อนหน้านี้ไว้

**โหมดโค้ดใหม่ (Clean-as-You-Code) — ตั้งแต่ 2026-08-30 เฉพาะเส้นทางด่วนของ PR**

ในเหตุการณ์ `pull_request` ไฟล์ `quality.yml` จะส่ง `--base-ref <PR base SHA>` ให้กับ `check:file-size`,
`check:complexity-ratchets` และ `check:dead-code` สำหรับ `check:complexity-ratchets` และ
`check:dead-code` เกณฑ์จะเปรียบเทียบ HEAD กับ merge-base โดย **จำกัดเฉพาะไฟล์ที่ PR
แก้ไข** (`scripts/check/newCodeMode.mjs`: merge-base จะถูกสร้างเป็นไฟล์จริงใน
`git worktree` ชั่วคราว จากนั้นรัน ESLint/knip ที่นั่นและบน HEAD แล้วหาผลต่างของจำนวนต่อไฟล์):

- **บล็อก** — PR เพิ่มการละเมิด cyclomatic/cognitive หรือ dead exports ในไฟล์ที่แก้ไข
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` ในบันทึก);
- **คำแนะนำ** — ยอดรวมทั่วทั้งระบบเทียบกับค่าฐานที่ตรึงไว้ ความคลาดเคลื่อนที่สืบทอดมาไม่ทำให้
  PR ที่ไม่เกี่ยวข้องล้มเหลว; ความคลาดเคลื่อนจะถูกตรึงใหม่ระหว่างการกระทบยอดรุ่นเผยแพร่ และเฝ้าติดตามโดยงาน headroom

`check:file-size` ใช้ base ref ตามเงื่อนไขของตัวเอง (`scripts/check/check-file-size.mjs`, #8522):
โดยจะตรวจสอบไฟล์ซอร์สและไฟล์ทดสอบทุกไฟล์ใน tree อ่านจำนวนบรรทัดของแต่ละไฟล์ ณ ฐานของ PR
ด้วย `git show` และทำให้ไฟล์ล้มเหลวเฉพาะเมื่อไฟล์ขยายเกินค่าที่มากกว่าระหว่างเพดานค่าฐาน
(`frozen` / `testFrozen` หรือ `cap` / `testCap` สำหรับไฟล์ที่อยู่นอกค่าฐาน) กับขนาดที่ฐาน
ดังนั้นไฟล์ที่คลาดเคลื่อนไปแล้วบนฐานจะไม่ทำให้ PR ที่ไม่เกี่ยวข้องล้มเหลว

`check:boundary:ratchet` ใช้กฎเดียวกันกับตัวเลขเพียงค่าเดียวของมัน
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): ในเหตุการณ์ PR ทั้ง fast-gate ของ
`quality.yml` และงาน lint ของ `ci.yml` จะส่งค่า SHA ฐานของ PR โดยคอมมิตฐานจะถูกวัดจากการส่งออกด้วย `git archive`
และ PR จะล้มเหลวเฉพาะเมื่อจำนวน edge ของ `open-sse → src` สูงกว่าค่าที่มากกว่าระหว่าง
`metrics.boundaryOpenSseToSrc` กับจำนวนบนฐาน ระบบจะรายงาน base drift ที่สูงกว่าเพดาน
(`base drift herdado`) แต่จะไม่ทำให้ PR ที่ไม่ได้เป็นต้นเหตุกลายเป็นสีแดง ส่วน push → main
ยังคงใช้เพดานสัมบูรณ์ และ SHA ฐานที่ไม่สามารถ resolve ได้จะย้อนกลับไปใช้เพดานดังกล่าวพร้อมคำเตือน

การรัน `workflow_dispatch`, การกวาดตรวจ release-green และงาน headroom รายคืนไม่มีฐาน PR
และยังคงใช้การเปรียบเทียบแบบสัมบูรณ์ (ทั่วทั้งระบบ) ส่วน coverage, duplication และ type-coverage
ยังคงเป็นแบบทั่วทั้งระบบในขณะนี้ (เครื่องมือของส่วนเหล่านี้ไม่สามารถสร้าง diff รายไฟล์ได้อย่างประหยัด) — และเป็นตัวเลือกสำหรับการปรับใช้แนวทางเดียวกัน

**การปิดเฟสที่ v4.0 (LTS = เข้มงวดกว่าเดิม ไม่ใช่ "กลับสู่ภาวะปกติ")**

1. บน tip ของ `release/v4.0.0` แบบล้วน: รัน `npm run quality:headroom --json` เพื่อบันทึกไว้ จากนั้นรัน
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` และ `--update` ของ typecheck gate
   แต่ละรายการ — baseline ทุกค่าจะลดลงมาเท่ากับค่าที่วัดได้
2. ลบ `_policy` ออกจาก `quality-baseline.json` (เปิดใช้งาน `--require-tighten` และการสะสม
   รายคืนอีกครั้ง) และคืนค่า `THRESHOLD = 36` (หรือสูงกว่า) ใน `check-openapi-coverage.mjs`
3. ปรับให้เข้มงวดยิ่งกว่าค่าที่วัดได้ในจุดที่การทำ modularization ให้ผลลัพธ์: คืนค่า `cap` ของ file-size เป็น 1000
   (หรือ 800), เพิ่ม coverage floor อีก +5 และกำหนด dead exports เป็น 0 สำหรับ package ที่ทำ modularization แล้ว

## ค่าอ้างอิง Ratchet (`quality-baseline.json`)

กลไก ratchet (`scripts/quality/check-quality-ratchet.mjs`) จะอ่าน `quality-baseline.json`
และเปรียบเทียบกับ `quality-metrics.json` ที่เพิ่งรวบรวมมาใหม่ เมตริกใดก็ตามที่ถดถอย
เกินค่า epsilon จะทำให้บิลด์ล้มเหลว

เมตริกที่ติดตามอยู่ในปัจจุบัน:

| เมตริก                | ทิศทาง | ความหมาย                              |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | จำนวนคำเตือน ESLint ต้องไม่เพิ่มขึ้น  |
| `coverage.statements` | `up`   | ความครอบคลุมของ statement ต้องไม่ลดลง |
| `coverage.lines`      | `up`   | ความครอบคลุมของบรรทัดต้องไม่ลดลง      |
| `coverage.functions`  | `up`   | ความครอบคลุมของฟังก์ชันต้องไม่ลดลง    |
| `coverage.branches`   | `up`   | ความครอบคลุมของ branch ต้องไม่ลดลง    |

หากต้องการอัปเดตค่าอ้างอิงหลังจากมีการปรับปรุงจริง:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

แฟล็ก `--update` จะเขียนค่าที่วัดได้ในปัจจุบันลงใน `quality-baseline.json`
ให้ commit ไฟล์นี้พร้อมกับการเปลี่ยนแปลงที่ปรับปรุงเมตริก PR ที่ปรับปรุง
เมตริกโดยไม่อัปเดตค่าอ้างอิงจะถูกตรวจพบโดย `--require-tighten` (ระยะ 6A.5,
รอการนำไปใช้งาน)

### Ratchet ของ CodeQL: รอบการรีเฟรชและการทริกเกอร์ด้วยตนเอง

`check:codeql-ratchet` อ่าน **สถานะของ repo ซึ่งรีเฟรชตามกำหนดเวลา — ไม่ใช่ต่อ PR**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` รายงาน
`state: configured`, `schedule: weekly`: นี่คือการสแกนแบบ default setup ของ GitHub ไม่ใช่การวิเคราะห์
ทุกครั้งที่ push ผลที่ตามมาคือ หลังจาก PR ที่แก้ไขการแจ้งเตือนถูก merge แล้ว ratchet จะยังคงอ่าน
จำนวนเดิมที่สูงกว่าอยู่จนกว่าการสแกนตามกำหนดเวลาครั้งถัดไปจะทำงาน — จึงรายงานการถดถอย
ใน PR ที่เปิดอยู่ทุก PR รวมถึง PR ติดตามผลของ PR ที่แก้ไขนั้นเอง จนกว่าการสแกนจะตามทัน

**การรีเฟรชด้วยตนเอง**: `gh workflow run codeql.yml --ref release/vX.Y.Z` จะเรียกใช้
การวิเคราะห์อีกครั้งและเผยแพร่การแจ้งเตือนใหม่ภายในไม่กี่นาที อ่าน `.github/workflows/codeql.yml`
ก่อน — ส่วนหัวของไฟล์อธิบายว่าไฟล์นี้ใช้เฉพาะ `workflow_dispatch` **เนื่องจากขัดแย้งกับ
"default setup" ของ GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`) การนำทริกเกอร์ `push`/`pull_request`/
`schedule` กลับมาต้องให้ **เจ้าของดำเนินการก่อน**: Settings → Code security →
CodeQL: Default → Advanced อย่าเพิ่มทริกเกอร์ `schedule:` หากยังไม่ได้สลับการตั้งค่านี้ — เพราะจะ
ทำให้เกิดเฉพาะรันที่ล้มเหลวเท่านั้น

**ปรับค่าอ้างอิงให้เข้มงวดขึ้นหลังจากจำนวนลดลง** — `node scripts/check/check-codeql-ratchet.mjs
--update` จะเขียนจำนวนใหม่ที่วัดได้ลงใน `quality-baseline.json` →
`metrics.codeqlAlerts.value` เพื่อไม่ให้ ratchet ยอมให้เกิดการถดถอยกลับขึ้นไปถึง
เพดานเดิมโดยไม่มีการแจ้งเตือน ตัวอย่างการทำงาน (2026-09-02/03): PR #12502 แก้ไขการแจ้งเตือนจริง 7 รายการ
(วัดจำนวนที่เปิดอยู่ได้ 13 → 6 รายการ); PR #12530 ปรับค่าอ้างอิงที่ตรึงไว้ให้เข้มงวดขึ้นจาก 11 → 6 เพื่อให้ตรงกัน จากนั้น
การแจ้งเตือนที่เหลืออีก 6 รายการถูกปิดพร้อมเหตุผลประกอบรายรายการ จนเหลือรายการที่เปิดอยู่ 0 รายการ

**การปิดการแจ้งเตือนเป็นการตัดสินใจของผู้ดำเนินการ (กฎเคร่งครัดข้อที่ #14)** — ห้ามปิดการแจ้งเตือน CodeQL
โดยไม่บันทึกเหตุผลทางเทคนิคไว้ในความคิดเห็นประกอบการปิด: `won't fix` สำหรับ
ข้อกำหนดของโปรโตคอลต้นทาง, `used in tests` สำหรับ fixture ที่ใช้ทดสอบ, `false positive`
สำหรับ sanitizer ที่ CodeQL ตรวจไม่พบ (แบบอย่าง: `docs/security/ERROR_SANITIZATION.md`)

---

## นโยบายการลองทดสอบซ้ำ (WS5.4, v3.8.49)

การลองซ้ำกำหนดแยกตาม runner เท่านั้น ไม่ใช่การลองซ้ำแบบครอบคลุมทั้งหมด — เพราะการลองซ้ำแบบครอบคลุมจะเปลี่ยน regression ที่เกิดขึ้นจริง
ให้กลายเป็น flake ที่มองไม่เห็น:

| Runner           | นโยบาย                                                                                                                                                 | เหตุผล                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | `retries: 1` เฉพาะใน CI พร้อม `trace: on-first-retry`                                                                                                  | จังหวะเวลาของเบราว์เซอร์/เครือข่ายมีความไม่แน่นอนจริง การลองซ้ำหนึ่งครั้งพร้อม trace จะเปลี่ยน flake ให้เป็น artifact ที่วินิจฉัยได้ |
| Vitest           | ไม่มีการลองซ้ำแบบ global การทดสอบที่พิสูจน์แล้วว่า flaky จะได้รับการกำหนดให้ลองซ้ำอย่างชัดเจนเป็นราย test (มองเห็นได้ใน diff และได้รับการตรวจสอบใน PR) | ทำให้รายการ quarantine อยู่ใน repo และไม่คลุมเครือ                                                                                   |
| node:test (unit) | ไม่มีการลองซ้ำไม่ว่าในกรณีใด                                                                                                                           | unit test ที่ flaky คือบั๊กในการทดสอบ — ให้แก้ไข อย่าสุ่มรันใหม่                                                                     |

SLO เป้าหมายเมื่อมี telemetry ของ flake แล้ว (WS5.2/5.3): อัตรา flake ต่อการทดสอบ <1%
(เกณฑ์ "แก้ทันที") และอัตราผ่านต่อ pipeline ≥95% ค่ามาตรฐานอ้างอิงของอุตสาหกรรม —
ให้ปรับเทียบใหม่จากค่าที่เราวัดได้เอง

## การเลื่อนถอยของ Ratchet ระดับรีลีส (WS5.5, v3.8.49)

เมื่อ ratchet (ขนาดไฟล์, ความซับซ้อน, คำเตือน eslint) ถดถอยบนปลายรีลีสที่เป็น PURE
กล่าวคือ เกิดการถดถอยจากผลรวมของการ merge และไม่มี PR ใดเพียงรายการเดียวที่ทำให้เกิด
การถดถอยซ้ำได้บน branch ของตนเอง การแก้ไขนั้นเป็นหน้าที่ของ **release captain เพียงครั้งเดียวบน
release branch**: ให้เลือกการแยกโค้ด/refactor เป็นอันดับแรก และ rebaseline เฉพาะเมื่อมีรายการ
เหตุผลที่บันทึกไว้เท่านั้น ห้ามผลักภาระการเลื่อนถอยจากผลรวมไปยัง PR ของ contributor และห้าม
rebaseline แยกตาม PR (เพราะจะซ่อน regression ที่เกิดขึ้นจริง) ให้แยกแยะสาเหตุก่อน: ทำให้สถานะ
แดงเกิดซ้ำบนปลายรีลีสที่เป็น pure ใน probe worktree ก่อนสันนิษฐานว่า PR ของคุณเป็นสาเหตุ

## การเก็บสะสมการลดค่า Ratchet — ทิศทางขาลง (#8584)

ratchet เป็นระบบอัตโนมัติเพียงครึ่งเดียว และเป็นครึ่งที่ผิดเสียด้วย การ **เพิ่ม** cap คือการแก้ไข
JSON ด้วยตนเองซึ่งใช้เวลาสิบวินาที และเป็นวิธีที่เร็วที่สุดในการปลดล็อก PR ที่เป็นสีแดง
การ **ลด** cap ต้องมีผู้รัน `--update` และ commit ผลลัพธ์ — และก่อนที่จะมี job
`bank-ratchet-shrinks` ก็ไม่มี workflow ใดรันคำสั่งนี้ ผลที่วัดได้
(2026-07-25): มีไฟล์ frozen 18 ไฟล์ที่มีขนาดไม่เกิน cap 800 บรรทัดสำหรับไฟล์ใหม่อยู่แล้ว โดยกรณีที่แย่ที่สุด
อยู่ที่ 132 เท่า (`src/shared/validation/schemas.ts` มี 19 บรรทัดแต่ถือ cap ไว้ที่ 2,523);
เพดานความซับซ้อนขยับจาก `1794 → 2169` ตลอดบันทึก rebaseline ประมาณ 37 รายการ โดยลดลงเพียง
ครั้งเดียว (−1); และมีการเขียนว่า "ปรับให้เข้มงวดผ่าน `--update` ในรอบถัดไป" 31 ครั้ง แต่ทำจริง
เพียงครั้งเดียว cap ที่ยังคงอยู่หลังจากโค้ดที่ทำให้ต้องมี cap นั้นหมดไปแล้ว จะเปลี่ยนทุกการแยกส่วนโค้ด
ที่เสร็จสมบูรณ์ให้กลายเป็นโควตาการเติบโตสำหรับผู้ที่มาแก้ไขไฟล์นั้นเป็นรายถัดไปโดยไม่ส่งสัญญาณเตือน

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ปิดวงจรดังกล่าว:

|          |                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| รันเมื่อ | `schedule` (3×/วัน) + `workflow_dispatch` — ตั้งใจ **ไม่** ใช้ `push`                                       |
| วัดผล    | `release/vX.Y.Z` ที่สูงที่สุด โดยใช้การ resolve และ injection guard แบบเดียวกับ `release-green`             |
| เขียน    | `check:file-size --update` และ `check:complexity-ratchets --update` (ทั้งสองลดค่าได้อย่างเดียวตามโครงสร้าง) |
| ตรวจสอบ  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                    |
| ส่งมอบ   | PR ที่เป็นปัจจุบันเสมอเพียงรายการเดียวไปยัง release branch — อัปเดตแบบบังคับและไม่สร้างสแปม                 |

การเก็บสะสมจะทำเป็นชุดแทนที่จะทำทุกครั้งที่ push เพราะไม่มีข้อกำหนดด้าน latency (เก็บสะสมการลดค่า
ภายใน 8 ชั่วโมงก็เพียงพอ) ขณะที่การรันทุกครั้งที่ merge จะสร้าง PR branch ใหม่ซ้ำหลายครั้ง
ระหว่างแคมเปญ merge และเสียค่าใช้จ่ายในการรัน ESLint แบบเต็มทุกครั้ง การตรวจจับยังคงทำเมื่อ
push (`release-green`); มีเพียงการเก็บสะสมเท่านั้นที่ทำเป็นชุด

### ตัวตรวจสอบความปลอดภัย

job นี้เขียนลง baseline โดยไม่มีผู้ดูแล ดังนั้น `verify-ratchet-bank.mjs` จึงเป็นสิ่งที่ทำให้
การดำเนินการดังกล่าวยอมรับได้ มันจะ diff tree หลัง `--update` กับ `HEAD` และ **ยุติ job
ก่อนที่จะมี commit ใดเกิดขึ้น** — โดยไม่เปิด PR — เว้นแต่ทุกการเปลี่ยนแปลงจะเป็นหนึ่งในรายการต่อไปนี้:

- รายการตัวเลข `frozen` / `testFrozen` ที่ถูก **ลดค่า** หรือ **ลบออก**
- `complexity-baseline.json` → `count` ถูก **ลดค่า**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` ถูก **ลดค่า**

สิ่งอื่นทั้งหมดจะถือว่าล้มเหลว: การเพิ่มตัวเลข, การเพิ่มรายการ, การเปลี่ยน `cap`/`testCap` หรือ
การลบ/เขียนบันทึก `_rebaseline_*` ใหม่ (บันทึกเหล่านี้คือ audit trail ที่อธิบายว่าเหตุใดเพดานแต่ละค่า
จึงมีอยู่ และถูกจัดเก็บภายใน object `frozen` เดียวกับรายการไฟล์)
บอตที่สามารถเพิ่ม cap ได้จะแย่กว่าสถานะปัจจุบันอย่างชัดเจน ตัวป้องกัน regression:
`tests/unit/verify-ratchet-bank.test.ts`

job นี้จะไม่ push ไปยัง `release/*` — มนุษย์เป็นผู้ merge PR ดังนั้นผลการวัดที่ผิดพลาด
จึงไม่สามารถถูกรวมเข้าไปโดยไม่ได้รับการตรวจสอบได้

## นโยบาย Allowlist

ทุกเกตที่ไม่สามารถล้มเหลวจากการละเมิดที่มีอยู่ก่อนแล้วจะใช้ allowlist ที่ตรึงไว้
(เช่น `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) โดยมีนโยบายดังนี้:

**แก้ไขสาเหตุที่แท้จริง และใช้ allowlist เฉพาะเมื่อการละเมิดนั้นมีอยู่ก่อนแล้วและ
ไม่สามารถแก้ไขได้ใน PR เดียวกัน**

เมื่อเพิ่มรายการลงใน allowlist:

1. ใส่ความคิดเห็นพร้อมเหตุผลประกอบ
2. อ้างอิงปัญหาที่ใช้ติดตาม (เช่น `// #3498 — Phase 2 feature, not yet implemented`)
3. ลบรายการนั้นใน PR เดียวกับที่แก้ไขการละเมิด — รายการที่ล้าสมัยและไม่ได้
   ระงับการละเมิดที่ยังเกิดขึ้นอยู่ถือเป็นข้อบกพร่องในตัวเอง (การบังคับใช้รายการล้าสมัยใน 6A.3 จะ
   ทำให้เกตล้มเหลวเมื่อพบรายการ allowlist ที่ไม่มีการละเมิดรองรับ หลังจากนำระบบนี้มาใช้แล้ว)

**อย่า** เพิ่มรายการ allowlist เพื่อให้การทดสอบผ่านเร็วขึ้น เกตที่เป็นสีเขียวพร้อมกับ
allowlist ที่เพิ่มขึ้นเรื่อย ๆ ทำให้เข้าใจผิดว่ามีคุณภาพดี

### เมื่อเกตล้มเหลวใน PR ของคุณ

1. **อ่านผลลัพธ์ของเกตอย่างละเอียด** — ผลลัพธ์จะบอกอย่างชัดเจนว่าไฟล์หรือสัญลักษณ์ใดละเมิด
   กฎ
2. **แก้ไขการละเมิด** — เกตส่วนใหญ่เป็นการตรวจสอบระบบไฟล์แบบให้ผลลัพธ์แน่นอน ซึ่งจะผ่านทันที
   ที่โค้ดถูกต้อง
3. **หากการละเมิดมีอยู่ก่อนแล้ว** (กล่าวคือ คุณไม่ได้เป็นผู้ทำให้เกิด แต่ตอนนี้เกต
   ครอบคลุมการละเมิดนั้น): ให้เพิ่มรายการ allowlist พร้อมความคิดเห็นที่ระบุเหตุผลและปัญหาที่ใช้ติดตาม
4. **หากเกตเป็นแบบ ratchet** (ความครอบคลุม, คำเตือน ESLint, ความซ้ำซ้อน, ความซับซ้อน):
   การเปลี่ยนแปลงของคุณทำให้เมตริกแย่ลง ให้แก้ไขปัญหาที่ต้นเหตุ หรือในกรณีที่พบได้น้อย ให้เรียกใช้
   `npm run quality:ratchet -- --update` หากการเปลี่ยนแปลงนั้นเกิดขึ้นโดยตั้งใจและยอมรับได้ที่เมตริก
   จะลดลง — แต่ต้องระบุเหตุผลไว้ในคำอธิบาย PR
5. **เกตเชิงแนะนำ** (`continue-on-error: true`) มีไว้เพื่อให้ข้อมูล — โดยจะไม่ขัดขวาง
   การผสานโค้ด แต่จะปรากฏในสรุป CI ถึงกระนั้นก็ควรแก้ไขอยู่ดี

---

## การเพิ่มเกตใหม่

1. สร้าง `scripts/check/check-<name>.mjs` (หรือ `.ts`) เกตเชิงนโยบายจะจบการทำงานด้วยรหัส 0/1
   ส่วนเกตแบบ ratchet จะส่งเมตริกไปยัง `quality-metrics.json` ผ่าน `collect-metrics.mjs`
2. เพิ่ม `"check:<name>": "node scripts/check/check-<name>.mjs"` ลงใน `package.json`
3. เชื่อมต่อเกตใน `.github/workflows/ci.yml` ภายใต้ job ที่เหมาะสม
   (นโยบาย → `lint` หรือ `docs-sync-strict`; ratchet → `quality-gate`)
4. หากเกตมี allowlist ให้ใช้ `reportStaleEntries()` จาก
   `scripts/check/lib/allowlist.mjs` เพื่อให้ตรวจจับรายการที่ค้างอยู่ได้โดยอัตโนมัติ
5. เขียนการทดสอบใน `tests/unit/build/` ซึ่งครอบคลุมตรรกะการตรวจจับของเกต
6. อัปเดตเอกสารนี้ (เพิ่มแถวในตาราง job ที่เกี่ยวข้อง)

---

## เครื่องมือสำหรับเอเจนต์: LSP-in-the-loop (เลือกใช้ได้)

นอกเหนือจากเกต CI แล้ว OmniRoute ยังมาพร้อมโครงร่าง `agent-lsp` แบบ **เลือกใช้ได้**
(`.mcp.json` ระดับโปรเจกต์, Fase 7 Task 15) ให้สร้าง `.mcp.json`
เพื่อเปิดให้เอเจนต์เขียนโค้ดเข้าถึงเซิร์ฟเวอร์ภาษา TypeScript เพื่อให้เอเจนต์สามารถตรวจหาสัญลักษณ์ /
การวินิจฉัย **ก่อน** เขียนโค้ด — เป็นกลไกตรวจสอบก่อนกล่าวอ้างว่า compile ได้ ซึ่งทำงานเสริมกับ
`typecheck:core` และลดข้อผิดพลาดประเภท "สัญลักษณ์ที่แต่งขึ้น" ได้ตั้งแต่ต้นทาง กลไกนี้ตั้งใจ
ไม่ให้โหลดโดยอัตโนมัติ (คุณเป็นผู้เลือกและตรวจสอบบริดจ์ MCP↔LSP) รายการที่เสียจะเพียงบันทึก
ข้อผิดพลาดในการเชื่อมต่อ และจะไม่ทำให้เซสชันหยุดทำงาน

---

## รายการค้างสำหรับการปรับให้มีประสิทธิภาพ (การทบทวน ROI — ระยะ 9 รอบ 3)

รายการนี้ได้รับการตรวจสอบเทียบกับ `ci.yml` เมื่อ 2026-06-17 (เวอร์ชันก่อนหน้านี้ไม่ได้ระบุ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`) การทบทวน ROI ของชุดที่ตรวจสอบแล้ว
พบรายการที่อาจปรับให้มีประสิทธิภาพดังต่อไปนี้ **การรวมเป็นการเปลี่ยนแปลง CI
เชิงกลไก ส่วนการสลับ/ยกเลิกเป็นการตัดสินใจเชิงนโยบายที่สงวนไว้สำหรับผู้ดำเนินการ** รายการด้านล่างนี้
ยังไม่ได้ถูกนำไปใช้

**รายการที่ไม่ได้จัดทำเอกสารไว้ข้างต้นเช่นกัน** (เชิงแนะนำ, สัญญาณต่ำ): งาน `docs-lint`
(markdownlint + Vale โดยทั้งงานใช้ `continue-on-error`) และเวิร์กโฟลว์สแกนเนอร์แบบแยกเดี่ยว
`semgrep.yml` / `codeql.yml` / `scorecard.yml` ค่า `semgrepFindings: 0` อยู่ใน
`quality-baseline.json` แต่ไม่ได้เชื่อมเข้ากับ ratchet แบบบล็อกใน `ci.yml` — ปัจจุบันเมตริกนี้
ถูกปล่อยไว้โดยไม่มีการใช้งาน

### รวม / กำจัดความซ้ำซ้อน (เชิงกลไก, ความเสี่ยงต่ำกว่า)

รายการแต่ละรายการได้รับการตรวจสอบเทียบกับสถานะ gate ที่ใช้งานจริงเมื่อ 2026-06-17 (เชื่อใจแต่ต้องตรวจสอบ);
การรวมหลายรายการที่ดู “ชัดเจน” กลับซ่อนหนี้ทางเทคนิคไว้และ **ไม่ใช่** สิ่งที่สามารถนำมาแทนได้โดยตรงอย่างไร้ปัญหา

- **`check:docs-sync` ทำงานสองครั้ง** — แยกเดี่ยวในงาน `lint` และอีกครั้งภายใน `check:docs-all` (`docs-sync-strict`) รวมถึงใน husky pre-commit hook ✅ **เสร็จแล้ว** — นำการเรียกใช้แบบแยกเดี่ยวใน `lint` ออกแล้ว
- **การสแกน CVE** — ❌ **ไม่ใช่การรวมที่ทำได้อย่างไร้ปัญหา** `audit:deps` บล็อกคำแนะนำด้านความปลอดภัยระดับวิกฤตและการตรวจสอบที่ไม่สมบูรณ์ใน lockfile ทั้งห้าไฟล์ ขณะเดียวกันก็รายงานคำแนะนำระดับสูงเป็นคำเตือนตามนโยบายปัจจุบัน ส่วน `check:vuln-ratchet` (osv) จะล้มเหลวเฉพาะเมื่อมี _การถดถอย_ เมื่อเทียบกับ baseline ที่ commit ไว้ และปฏิเสธค่าการวัดที่หายไปเมื่อมีการกำหนดให้ต้องใช้ ทั้งสองมีความหมายต่างกัน — การยกเลิก `audit:deps` จะทำให้สูญเสีย gate ระดับวิกฤตแบบสัมบูรณ์และหลักฐานการตรวจสอบแพ็กเกจที่เป็นอิสระจากกัน ให้คงทั้งสองรายการไว้
- **การตรวจหาวงจร** — ✅ **เสร็จแล้ว** (#15159 G-01/G-02) ข้อความเดิมในส่วนนี้เรียก `check:cycles` ว่าเป็น gate ที่ “ผ่านและผ่านการคัดสรร” และให้เหตุผลว่าควรคงการบล็อกไว้ เพราะ `check:circular-deps` (dpdm) รายงานวงจร 91 รายการ สถานะผ่านนั้นเป็น **ผลผ่านลวง**: `check:cycles` สแกนไดเรกทอรีย่อย 5 แห่ง (450 ไฟล์), จับคู่เฉพาะ `import|export … from` แบบสแตติก และตัด specifier ที่เป็น `@/` และ `@omniroute/open-sse/` ทั้งหมดออก จึงไม่สามารถมองเห็นวงจร dynamic-import + alias ซึ่งเป็นส่วนใหญ่ของ repo ได้ แก้ไขแล้ว: ขณะนี้ gate จะไล่ตรวจ `src` + `open-sse` (5023 ไฟล์), รวบรวม specifier จาก TypeScript AST (ดังนั้น `import("…")` จึงถูกนับ แต่ `typeof import("…")` ในตำแหน่งของ type ไม่ถูกนับ) และ resolve `paths` ของ tsconfig โดยพบวงจร **14** รายการ ไม่ใช่ 0 เนื่องจากไม่สามารถแก้ไขวงจรเดิมที่มีอยู่แล้ว 14 รายการภายใน PR ของ gate ได้ ตอนนี้ `check:cycles` จึงเป็น **ratchet** (`--ratchet`, เพดาน `metrics.cycles.value = 14` ใน `quality-baseline.json`, `direction: down`) — โดยจะบล็อก _การถดถอย_ ใดๆ และจำนวนดังกล่าวลดลงได้เท่านั้น CI เรียกใช้ `npm run check:cycles:ratchet` การทยอยลดจำนวนจะดำเนินการร่วมกับ **A-01** ส่วน `check:circular-deps` (dpdm) ยังคงเป็นคำแนะนำในฐานะความเห็นที่สองซึ่งครอบคลุมกว่า
- **ความซับซ้อน** — ✅ **เสร็จแล้ว** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ตรวจด้วย ESLint รอบเดียว, นับตาม ruleId เพื่อให้ baseline ของ cyclomatic+max-lines และ cognitive ยังคงเป็นอิสระจากกัน ส่วน `check:complexity` / `check:cognitive-complexity` แต่ละรายการยังคงไว้สำหรับ `--update` ในเครื่อง
- **การป้องกันการสร้างข้อมูลเท็จสำหรับ `/api`** — ✅ **เสร็จแล้ว** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): จัดทำรายการ FS ของ `src/app/api` เพียงครั้งเดียว โดย openapi-routes + docs-symbols ยังคงรายงานแยกจากกัน ส่วนรายการแต่ละรายการยังคงไว้สำหรับการเรียกใช้ในเครื่อง
- **`check:node-runtime` ทำงานใน 11 งาน** — ⚠️ **ROI ต่ำ** แต่ละงานใช้ runner แยกกันและการตรวจสอบใช้เวลาน้อยกว่า 1 วินาที; ประหยัดเวลารวมได้ประมาณ 10 วินาที แต่ต้องแลกกับการสูญเสียตัวป้องกันราคาถูกในแต่ละงาน ไม่คุ้มกับความเปลี่ยนแปลงที่เกิดขึ้น
- **`typecheck:noimplicit:core` ใน CI lint** — ✅ **นำออกจากงาน lint แล้ว** (เดิมเป็นคำแนะนำโดยใช้ `continue-on-error`); พื้นผิว type แบบบล็อกคือ `typecheck:core` + `check:type-coverage` โดยยังคงสคริปต์สำหรับใช้ในเครื่องไว้

### สลับ / ตัดสินใจ (นโยบายของผู้ดำเนินการ)

- `check:openapi-security-tiers` (เชิงแนะนำ) — ❌ **ไม่สามารถสลับได้อย่างไร้ปัญหา** คำสั่งจบด้วยสถานะ 0 แต่เตือนว่า route ของ `traffic-inspector` หลายรายการภายใต้ `LOCAL_ONLY_API_PREFIXES` ไม่มี annotation `x-loopback-only: true` การบังคับใช้จำเป็นต้องเพิ่ม annotation เหล่านั้นลงใน `openapi.yaml` ก่อน
- `typecheck:noimplicit:core` (เชิงแนะนำ) — ส่วนใหญ่ถูกครอบคลุมอยู่แล้วโดย ratchet แบบบล็อก `check:type-coverage` ให้สลับเป็น ratchet หรือยกเลิกการรัน `tsc` รอบที่สองซึ่งซ้ำซ้อน
- `test:vitest:ui` (ขณะนี้ **บล็อก**) — ความล้มเหลวที่มีอยู่ก่อนถูกยกเว้นไว้อย่างชัดเจนใน `vitest.config.ts` พร้อมความคิดเห็นติดตาม `// #8618`; ความล้มเหลวใหม่จะทำให้งานล้มเหลว
- `check:secrets` (gitleaks, ratchet แบบบล็อก) — เพดานปัจจุบันคือ `metrics.secretFindings` ใน `quality-baseline.json` ข้อยกเว้นใดๆ ต้องมีรายการใน `.gitleaks.toml` พร้อมเหตุผลประกอบ; หากไม่มีค่าการวัดจะถือว่า INCOMPLETE การสแกนนี้ทำงานเสริมกับการสแกน secret แบบ native ของ GitHub และ `check:public-creds`
- `check:pr-evidence` (แบบบล็อก, grep ข้อความร้อยแก้วในเนื้อหา PR) — มีความเสี่ยงสูงที่จะเกิดผลบวกลวง; หากยกเลิกจะทำให้การบังคับใช้ Hard Rule #18 อ่อนลง ดังนั้นนี่จึงเป็นการตัดสินใจเชิงนโยบายอย่างแท้จริง
- `semgrep` (แบบแยกเดี่ยวเชิงแนะนำ) — มีขอบเขตทับซ้อนกับ CodeQL สำหรับกลุ่ม OWASP; ให้เชื่อม baseline ของมันเข้ากับ ratchet หรือยกเลิก

---

## เอกสารที่เกี่ยวข้อง

- ห่วงโซ่อุปทาน (ที่มา, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — เกตตรวจสอบความเท่าเทียมกันของชุดคีย์

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, งาน `i18n-ui-coverage`)
เปรียบเทียบชุดคีย์ปลายสุดของทุกไฟล์ `src/i18n/messages/<locale>.json` กับ `en.json` และจะล้มเหลว
เมื่อพบคีย์ปลายสุดที่ขาดหายหรือเกินมา โดยไม่คำนึงว่าคีย์นั้นถูกเพิ่มเมื่อใด ตัวยึดตำแหน่ง
`__MISSING__:` จะนับว่ามีอยู่แล้ว (เนื้อหาของตัวยึดเป็นหน้าที่ของเกตตรวจสอบอัตราส่วน) เกตนี้เป็นส่วนเติมเต็ม
โดยสมบูรณ์ของเกตอีกสองตัวที่อิงส่วนต่าง/เปอร์เซ็นต์: `check-ui-keys-coverage` กำหนดค่าขั้นต่ำ 80 %
ต่อ locale (แม้ขาดไป 43 คีย์จากทั้งหมดประมาณ 13,000 คีย์ ก็ยังแสดงเป็น 99.7 %) และ
`check-new-key-coverage` จะพิจารณาเฉพาะคีย์ที่ PR เพิ่มลงใน `en.json` ชุด locale หนึ่งจะถูกสร้างขึ้นจาก
`en.json` ณ วันที่ตัด branch และใช้เวลาหลายวันในการแปล ขณะที่ base ยังคงมีการเพิ่มคีย์ต่อไป แต่ PR
ของชุดดังกล่าวไม่ได้เพิ่มคีย์ใดด้วยตัวเอง ดังนั้นเกตพี่น้องทั้งสองจึงไม่ส่งสัญญาณเมื่อชุดที่ 1 (#13044)
ถูกรวมโดยขาดไป 43 คีย์ในเก้า locale และชุดที่ 2 (#13660) ขาดไป 10 คีย์ในแปด locale
(2026-09-15) แก้สถานะแดงด้วย
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; คีย์ปลายสุดที่เป็น `extra`
หมายความว่าต้นทางลบคีย์นั้นแล้ว — ให้ลบออกจาก locale ด้วย `--warn` จะรายงานโดยไม่ทำให้งานล้มเหลว
`--catalog=cli` จะเรียกใช้การเปรียบเทียบเดียวกันกับ `bin/cli/locales` (`npm run i18n:check-keys:cli`);
ทั้งสองขั้นตอนอยู่ในงาน `i18n-ui-coverage`

#### `check-new-key-coverage` — เกต i18n สำหรับคีย์ใหม่

เป็นเกตพี่น้องของ `check-ui-value-drift` โดยเกตนั้นตรวจจับค่าภาษาอังกฤษที่ถูก **เขียนใหม่**
ขณะที่คำแปลยังไม่ได้รับการอัปเดต ส่วนเกตนี้ตรวจจับคีย์ภาษาอังกฤษที่ถูก **เพิ่ม**
แต่บาง locale ไม่เคยได้รับคีย์นั้น

`check-ui-keys-coverage` ไม่สามารถตรวจพบกรณีประเภทนี้ได้ เพราะมันบังคับใช้ค่าขั้นต่ำเป็นเปอร์เซ็นต์ต่อ locale
และการขาดไปสิบเอ็ดคีย์จากคีย์ปลายสุดประมาณ 13,000 คีย์ยังทำให้ความครอบคลุมอยู่ที่ 99.9% เปอร์เซ็นต์
ต่อภาษาไม่สามารถสื่อความหมายว่า "ฟีเจอร์นี้เผยแพร่โดยยังไม่ได้แปล" ได้ — ฟีเจอร์ทั้งชุดอาจเข้าสู่
locale ใหม่โดยไม่มีข้อความเลย แต่ตัวเลขก็แทบไม่เปลี่ยนแปลง

เหตุการณ์ที่เกตนี้บันทึกไว้คือ: Phase 3 ของ Orchestration Canvas แปลคีย์ทั้งสิบเอ็ดคีย์ใน 42 locale
ที่มีอยู่ในขณะนั้น หลายชั่วโมงต่อมา ชุดภาษาของสหภาพยุโรป (#13044) ทำให้ repository มีทั้งหมด
51 locale และ locale ใหม่ทั้งเก้า (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ไม่เคย
ได้รับคีย์เหล่านั้น `deepMergeFallback` จะแทนคีย์ที่ขาดด้วยภาษาอังกฤษ ดังนั้นรูปแบบความล้มเหลว
จึงเป็น UI ที่ไม่ได้รับการแปลแทนที่จะเป็น UI ว่างเปล่า — เป็นปัญหาจริงและเงียบโดยธรรมชาติของการออกแบบ

เช่นเดียวกับเกตพี่น้อง เกตนี้ **รับรู้ส่วนต่าง** โดยเปรียบเทียบภาษาอังกฤษ ณ merge base กับ working
tree ดังนั้นช่องว่างที่มีอยู่ก่อนแล้วจะยังคงถูกตรึงไว้ และไม่ต้องมีการย้ายข้อมูลก่อนเปิดใช้เกต

**มาร์กเกอร์ `__MISSING__:<english>` ไม่ถือว่าผ่านเกตนี้ (ตั้งแต่ 2026-09-17)** ก่อนหน้านี้มาร์กเกอร์ดังกล่าว
เป็นวิธีเลื่อนการแปลที่ระบุไว้ในเอกสาร — runtime จะ fallback ไปใช้ภาษาอังกฤษที่ถูกต้อง — จนกระทั่ง
feature PR แปดรายการเมื่อ 2026-09-16 เพิ่ม 61 คีย์และใส่มาร์กเกอร์ลงในทั้ง 65 locale แทนการแปล:
เกตนี้ยอมรับทุก PR ไม่มีสิ่งใดขัดขวาง PR เหล่านั้น และจากนั้นเกตตรวจสอบอัตราส่วนคำแปลจริงแบบบล็อก
ก็ล้มเหลวที่ release tip สำหรับทุกคน (pt-BR 3.2 % > 2.5 % + 0.5) ปัจจุบันมาร์กเกอร์จะถูกพิจารณา
ว่าเป็นคำแปลที่ขาดหาย แก้สถานะแดงด้วย
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` หรือ
ดำเนินการทุก locale แบบขนานด้วย `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ใช้งานได้อย่างปลอดภัยในโหมด detached และจะไม่เริ่มทำงานหากไม่มี env `OMNIROUTE_TRANSLATION_*`)
คีย์ที่จำเป็นต้องคงเป็นภาษาอังกฤษ (ชื่อผลิตภัณฑ์/เอนจิน/แฟล็กที่กำหนดตายตัว) ต้องอยู่ใน
`scripts/i18n/untranslatable-keys.json` และต้องไม่ซ่อนอยู่หลังมาร์กเกอร์ `vi` ห้ามใช้มาร์กเกอร์
โดยเด็ดขาด (`tests/unit/i18n-vi-completeness.test.ts`)

#### `check-vitest-exclusions` — เกตสำหรับเทสต์ที่ถูกพักไว้

ไฟล์ที่อยู่ในรายการ `exclude` ของ `vitest.config.ts` คือเทสต์ที่ไม่ได้ทำงาน และในสายตาของผู้ที่อ่าน
โครงสร้างไฟล์ เทสต์นั้นดูเหมือนเป็นส่วนหนึ่งของความครอบคลุม มีไฟล์สะสมอยู่หลังคอมเมนต์
`// #8618 — pre-existing failure; remove this exclusion when fixed` ถึงหกสิบสองไฟล์ Issue #8618
ถูกปิดเมื่อ 2026-08-11 ขณะที่รายการที่ติดตามโดย issue นี้เพิ่มจาก 45 รายการเป็น 62 รายการ โดยแต่ละ
รายการใหม่รับช่วงคอมเมนต์ที่ชี้ไปยัง issue ที่ปิดไปแล้ว เมื่อมีการวัดผลรายการดังกล่าวทีละไฟล์ในที่สุด
(#13204) พบว่า **51 จาก 62 ไฟล์ผ่านกับ tree ปัจจุบันโดยไม่ต้องเปลี่ยนแปลง source ใดๆ**

เกตนี้กำหนดให้ทุก exclusion ที่ resolve ไปยังไฟล์จริงต้อง (a) ระบุ tracking issue และ
(b) ปรากฏใน `config/quality/vitest-exclusions.json` พร้อมสถานะที่วัดได้ เพื่อให้การเพิ่ม exclusion
เป็น diff ที่ตรวจสอบได้ในไฟล์เฉพาะ แทนที่จะเป็นเพียงอีกหนึ่งบรรทัดในอาร์เรย์ที่มี 60 รายการ เกตนี้
ตั้งใจไม่เรียกใช้เทสต์ที่ถูก exclude ซ้ำ — การทำเช่นนั้นใช้เวลาประมาณ 10 นาทีและควรอยู่ในงานที่รัน
เป็นระยะ ส่วน inventory จะบันทึกว่าแต่ละรายการถูกวัดผลครั้งล่าสุดเมื่อใด
