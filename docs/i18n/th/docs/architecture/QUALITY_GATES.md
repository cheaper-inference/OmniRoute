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

## เกตสินค้าคงคลังและโปรไฟล์การดำเนินการ

### การรับสมัครผู้สมัคร

เวิร์กโฟลว์ CI และ Quality Gates ต่างก็ส่งคำตัดสินที่เสถียร: `Gate / CI` และ `Gate / Quality` นโยบายการรับเข้าศึกษาตามเวอร์ชันจะระบุงานขั้นต้นทุกงานตามความจำเป็นหรือตามคำแนะนำ งานที่จำเป็นที่เกี่ยวข้องจะต้องสำเร็จ: ขาดหายไป ยกเลิก ข้าม รอดำเนินการ และผลลัพธ์ที่ไม่รู้จักไม่สามารถสร้าง PASS ได้ การจัดหมวดหมู่เอกสารเท่านั้นหรือแค็ตตาล็อกเท่านั้นที่ถูกต้องอาจทำให้ช่องโค้ดใช้ไม่ได้ ร่าง PR ไม่ถือเป็นผู้สมัครที่ได้รับการยอมรับ ป้ายกำกับ `hotfix` จะไม่ยกเว้นหลักฐาน

เวิร์กโฟลว์ทั้งสองครอบคลุม PRs ลงในสาขา main/release, พุชไปที่ `main`, การจัดส่งแบบแมนนวล และเหตุการณ์การรวมกลุ่ม พุช จัดส่ง และรวมกลุ่มดำเนินการเลือกทั้งหมด การพุชไปที่ `release/**` ไม่ได้เริ่มต้น (18-10-2569): การเปลี่ยนแปลงแต่ละครั้งได้รันเมทริกซ์บน PR ของมันแล้วและชุดค่าผสมที่รวมเข้าด้วยกันนั้นเป็นงานของ Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane) ทางแยกและกลุ่มรวมใช้นักวิ่งที่โฮสต์สำหรับงานที่เลือกนักวิ่งที่โฮสต์เอง ต้องตรวจสอบความจุที่โฮสต์เพียงพอก่อนเปิดตัว

PR ธรรมดาจะรันการเลือกอย่างรวดเร็ว เลน `full-code` และ `full-code-e2e` ของนโยบายการรับเข้า (E2E, การบูรณาการ, สิ่งประดิษฐ์ของแพ็คเกจ, Electron ควัน, Bun SQLite, ระบบนิเวศและไคลเอ็นต์โปรโตคอล) ทำงานบน Mergify คิวแบบร่างหรือรันเต็ม: `gh workflow run ci.yml --ref <branch>`

ใบเสร็จรับเงิน JSON แต่ละใบจะระบุ SHA ที่เช็คเอาท์ การรันเวิร์กโฟลว์ และความพยายาม CLI ปฏิเสธ checkout/event SHA ที่ไม่ตรงกัน การทดสอบเวิร์กโฟลว์เชื่อมโยงการเป็นสมาชิกนโยบายกับรายการ `needs` ของงานตัดสิน ดังนั้นช่องทางใหม่หรือที่ถูกลบออกไม่สามารถหายไปอย่างเงียบๆ ได้ ใบเสร็จรับเงินครอบคลุมขั้นตอนการทำงานของตนเอง ไม่ใช่การเผยแพร่ การปรับใช้ หรือภายในของเครื่องสแกนที่ปรึกษาที่มีอยู่ การเปิดใช้งานชื่อเช็คทั้งสองในกฎสาขาเป็นการเปลี่ยนแปลงการดูแลระบบที่แยกจากกัน การเพิ่มงานเหล่านี้ไม่ได้ป้องกันสาขา

### รวมคิว

ป้ายกำกับ `queue` จะส่ง PR ไปยังคิว Mergify (`.mergify.yml`) Mergify จะเปิดแบบร่าง PR บนสาขา `mergify/merge-queue/`, CI รันการเลือกแบบเต็มที่นั่น และ PR ดั้งเดิมจะรวมเข้าด้วยกันเมื่อ `Gate / CI`, `Gate / Quality` และ `Merge integrity (changelog + generated skills)` ผ่าน

Mergify เขียนสรุปคิวลงในคำอธิบายของฉบับร่าง และแอปอื่นๆ ก็สามารถแก้ไขได้เช่นกัน เหตุการณ์ `pull_request` `edited` บนแบบร่างจะใช้กลุ่มการทำงานพร้อมกันของตัวเอง (`-queue-edit-<run_id>`) ดังนั้นจึงไม่สามารถยกเลิกการรันจริงของแบบร่างได้ และจะข้ามเกตและเมทริกซ์ มีเพียง `Merge integrity` เท่านั้นที่ยังคงทำงานอยู่ งานเกตที่ข้ามมีชื่อการตรวจสอบที่แตกต่างกัน เนื่องจาก Mergify อ่าน `Gate / CI` ที่ข้ามเป็นการตรวจสอบที่ล้มเหลว และตัดคิว PR

หลังจากการถอนคิว การพุชจะไม่ส่ง PR ใหม่เสมอไป ความคิดเห็น `@mergifyio queue` กับมัน

### หลักฐานที่เก็บไว้ในตัวลดการยอมรับ

`scripts/quality/validate-release-acceptance.mjs` ลดแผนที่ให้มาและรายการของมัน ไม่ได้กำหนดว่าแผนครอบคลุมไปป์ไลน์การปล่อยที่สมบูรณ์ รายงานตั้งค่าไว้อย่างชัดเจน `releaseAcceptance: false` แม้ว่าแผนนั้นจะเป็น `VERIFIED` ก็ตาม เวิร์กโฟลว์ `release-acceptance.yml` ยังคงใช้การติดตั้งเงา ไม่ใช่บิลด์จริง แพ็คเกจ การบูต หรือใบเสร็จรับเงินโปรโมชัน

CLI กำหนดให้ `--evidence-root` เพื่อตรวจสอบหลักฐานที่เก็บไว้ ไฟล์ได้รับการแก้ไขเป็น `<evidence-root>/<artifact_id>/<member>` และแฮชเป็น SHA-256 บันทึก PASS ที่ไม่มีหลักฐาน ไฟล์หายไปหรือมีการเปลี่ยนแปลง เส้นทางที่ไม่ปลอดภัย หรือลิงก์สัญลักษณ์จะป้องกันการตรวจสอบ ไฟล์ที่หายไปไม่เท่ากับบันทึกที่สำเร็จที่ว่างเปล่า การตรวจสอบ SHA/run/attempt ที่มีอยู่ยังคงเป็นอิสระ: ไบต์ที่ตรงกันไม่สามารถช่วยเหลือใบเสร็จเก่าได้ ความสมบูรณ์ของไฟล์ไม่ใช่ข้อพิสูจน์ถึงความถูกต้องของการดำเนินการหรือการส่งเสริมสิ่งประดิษฐ์

### สินค้าคงคลังสแกนแบบคงที่

สินค้าคงคลัง npm-alias เวอร์ชันและการเป็นสมาชิก static-scan อยู่ใน `config/quality/gate-manifest.json` เรียกใช้ `npm run check:gate-manifest` เพื่อตรวจสอบชื่อสคริปต์และคำสั่งที่ตรงกับ `package.json`; การเพิ่ม การลบ และการดริฟท์คำสั่งจะล้มเหลวทั้งงาน hook ในเครื่องและงานการเปลี่ยนแปลงการจัดประเภทใน CI นามแฝงไม่ใช่งานเวิร์กโฟลว์ อินสแตนซ์เมทริกซ์ หรือกรณีทดสอบ: จำนวนเหล่านี้ต้องไม่แสดงให้ใช้แทนกันได้

ใช้ `npm run quality:scan -- --list` หรือ `npm run quality:scan:fast -- --list` เพื่อตรวจสอบนามแฝงที่เลือกโดยไม่ต้องดำเนินการ รันเนอร์เรียกใช้จุดเข้าใช้งาน npm ดังนั้นรันไทม์ (รวมถึง Bun ที่กำหนดค่าไว้) จึงยังคงอยู่ รายการบันทึกนามแฝงภายนอกโปรไฟล์เหล่านั้นตามที่เรียกใช้แยกต่างหาก และคำสั่งการบำรุงรักษาไม่ได้รับอนุญาตในโปรไฟล์การสแกนแบบอ่านอย่างเดียว

โปรไฟล์เหล่านี้ครอบคลุมเฉพาะการสแกนแบบคงที่เท่านั้น พวกเขาไม่รับรองการทดสอบผลิตภัณฑ์ ความครอบคลุม บรรจุภัณฑ์ การตรวจสอบภายนอก หรือการยอมรับการเปิดตัวเต็มรูปแบบของผู้สมัคร การรับเวิร์กโฟลว์ใช้ `config/quality/admission-policy.json` และ `scripts/quality/admission-verdict.mjs` ที่เชื่อมโยง โปรไฟล์ผู้สังเกตการณ์การเปิดตัวยังคงแยกจากกัน ตรวจสอบเช็คและใบเสร็จรับเงินที่เกี่ยวข้องอย่างอิสระ คำสั่งสแตติกของผู้สังเกตการณ์แบบเต็มจะถูกประกาศใน `config/quality/release-green-static-profile.json` รวมถึง `audit:deps` การเลือกการทดสอบการกลายพันธุ์ และการตรวจสอบการแปล ตัวโหลดตรวจสอบคำสั่ง npm กับ package.json และการประกาศ CI/Quality แบบโมเดล มันปฏิเสธการดริฟท์แทนที่จะดำเนินการโทเค็นเชลล์เป็นอาร์กิวเมนต์ เอาต์พุต SKIP/INCOMPLETE ของสแกนเนอร์ที่จำเป็นไม่สามารถสร้าง PASS ได้ โปรไฟล์จะบันทึกข้อยกเว้นภายนอกและไม่ได้แทนที่ความครอบคลุมที่โฮสต์ เมทริกซ์ทดสอบ แพ็กเกจ หรือหลักฐานการใช้งาน รายการร้อยแก้วด้านล่างเป็นข้อมูลอ้างอิง ไม่ใช่ข้อพิสูจน์ว่าประตูวิ่งได้จริง

สคริปต์อยู่ภายใต้ `scripts/check/` (ประตูนโยบาย) และ `scripts/quality/` (เครื่องมือวงล้อ) แหล่งที่มาของความจริง CI คือ `.github/workflows/ci.yml`

### ปล่อยเส้นทางด่วน PR (`quality.yml`)

`.github/workflows/quality.yml` เติมเต็ม CI บน main/release PRs, พุชไปที่ `main`, จัดส่งและรวมกลุ่ม PRs ใช้การตรวจสอบด่วนแบบกรองพาธ โครงสร้างที่ซ้ำกันที่ปิดใช้งานอย่างถาวรถูกลบออก การตรวจสอบ build/package/boot จริงจะยังคงอยู่ใน CI ชุดหน่วยและ vitest ทำงานเฉพาะใน CI (`Unit Tests (N/8)` และ `Vitest`)

| งาน                                              | ขอบเขต                                                                                                                                      | การปิดกั้น          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; การอ้างอิงเอกสาร API และเอกสารทั้งหมด                                                                                        | ใช่                 |
| `Fast Quality Gates`                             | รหัส PRs; การตรวจสอบแบบคงที่, การตรวจสอบประเภท, การตรวจสอบประเภทแดชบอร์ด, การทดสอบหน่วยที่ได้รับผลกระทบ, การทดสอบพี่น้องที่ถูกลืม (คำแนะนำ) |
| `No new ESLint warnings`                         | รหัส PRs; การ์ดป้องกันผ้าสำลีที่รับรู้ถึงการปราบปราม                                                                                        | ใช่ รวมทั้งส้อมด้วย |
| `Merge integrity (changelog + generated skills)` | PRs ที่ไม่ใช่ร่าง ; บันทึกการเปลี่ยนแปลงและการซิงค์ทักษะที่สร้างขึ้น                                                                        | ใช่ รวมทั้งส้อมด้วย |

#### รายงานผลการตรวจพี่น้องที่ถูกลืม

`npm run check:forgotten-sibling-tests` ทำงานเป็นขั้นตอนคำแนะนำของ `Fast Quality Gates` และนำตัวแก้ไขการนำเข้ากลับมาใช้ใหม่เบื้องหลังแมปการทดสอบผลกระทบ สำหรับทุกโมดูลการผลิตที่เปลี่ยนแปลง ระบบจะรายงานลูกโซ่ `changed module/symbol -> static consumer -> candidate sibling test` ที่กำหนดไว้ เมื่อการทดสอบผู้สมัครไม่อยู่ในส่วนต่างคำขอดึง สรุป Markdown และผลลัพธ์ JSON จะยังคงอยู่เป็นส่วนเวิร์กโฟลว์ `forgotten-sibling-tests` สำหรับการสอบเทียบก่อนที่จะเริ่มใช้การบล็อกใดๆ

การส่งออกซ้ำแบบ Barrel และการนำเข้าแบบไดนามิกเป็นเพียงการวินิจฉัยความละเอียดเท่านั้น พวกเขาไม่เคยสร้างการค้นพบที่ปิดกั้น ตรวจสอบข้อยกเว้นอยู่ใน `config/quality/forgotten-sibling-allowlist.json` แต่ละรายการจะต้องตั้งชื่อการทดสอบผู้บริโภคและผู้สมัคร ให้เหตุผลเฉพาะ และเชื่อมโยงปัญหา GitHub หรือคำขอดึง รายการที่มีรูปแบบไม่ถูกต้องปิดไม่สำเร็จ ข้อยกเว้นไม่สามารถระงับการทดสอบผู้สมัครที่ถูกลบหรือส่วนต่างที่เพิ่ม `.skip`/`.todo`; การยืนยันที่อ่อนแอลงและการมาสก์อื่น ๆ ยังคงเป็นของเกต `check:test-masking` ที่ปิดกั้นอย่างอิสระ

### งาน: `lint`

ทำงานบนทุก ๆ PR ถึง `main` บล็อกผสานเมื่อล้มเหลว

| สคริปต์ (`npm run ...`)           | ตรวจสอบ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | การปิดกั้น                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | เวอร์ชัน Node.js อยู่ในช่วงที่รองรับ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ใช่                                       |
| `check:cycles`                    | การนำเข้าแบบวงกลมทั่วทั้ง `src/` + `open-sse/` (อิง AST, tsconfig `paths` แก้ไขแล้ว) Bare ออก 1 เมื่อใดก็ตามที่มีรอบใด ๆ อยู่ (ปิดล้มเหลวตั้งแต่ #15281) และแสดงรายการ SCCs `check:cycles:ratchet` (สิ่งที่ CI ทำงาน) บล็อกเมื่อจำนวนเกินเพดาน `metrics.cycles` ใน `quality-baseline.json` — ปัจจุบัน 14, `direction: down` ดังนั้นจึงสามารถตกได้เท่านั้น (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่ (วงล้อ)                               |
| `check:boundary`                  | การเชื่อมต่อ `open-sse → src` : การนำเข้าไฟล์ต่อไฟล์ที่ไม่ซ้ำกันจากเอ็นจิ้นไปยังแอป (`scripts/quality/measure-boundary.mjs`; รายการขอบคืองานค้างในการแก้ไข v4 core/module-split ) รายงานคำแนะนำ Bare = (เหมือนกับ `quality:boundary`) `check:boundary:ratchet` (สิ่งที่ CI ทำงาน รวมถึงใน `quality.yml` fast-gates ratchet loop) บล็อกเมื่อจำนวนเกินเพดาน `metrics.boundaryOpenSseToSrc` ใน `quality-baseline.json` — seeded ที่ 771 ที่วัดได้ `direction: down`; `--update` ลดระดับลงเท่านั้น ฐานสัมพัทธ์บน PRs (`--base-ref` ดูด้านล่าง)                                                                                                                                                                                                                                                                                                    | ใช่ (วงล้อ)                               |
| `check:route-validation:t06`      | มีสกีมา Zod ในทุกเส้นทาง (นโยบายระดับ 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                       |
| `check:any-budget:t11`            | จำนวน `@ts-expect-error // any` ไม่เกินงบประมาณ (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                       |
| `check:provider-consistency`      | ผู้ให้บริการทุกรายใน `providers.ts` มีรายการที่ตรงกันใน `providerRegistry.ts` (และในทางกลับกัน ภายในรายการที่อนุญาต)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ใช่                                       |
| `check:model-lifecycle`           | ตารางเส้นทางที่ดูแลรักษาด้วยมือทั้งสามตารางจะสอดคล้องกับสแน็ปช็อตวงจรการใช้งานที่เช็คอิน (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ไม่มีคะแนน id ที่เลิกใช้ซึ่ง `REGISTRY` สามารถกำหนดเส้นทางได้ ทุกเป้าหมาย `BUILT_IN_ALIASES` มีอยู่ใน `REGISTRY` และไม่มีอยู่ในสแน็ปช็อต id ที่เลิกใช้แล้ว รหัสที่เลิกใช้งานทุกรหัสที่ยังอยู่ใน `REGISTRY` จะถูกส่งต่อหรือแสดงรายการเป็น `allowedRetiredInCatalog`; และไม่มีแหล่งที่มาหรือเป้าหมาย `DEFAULT_DEGRADATION_MAP` ปรากฏขึ้นในสแน็ปช็อตนั้น สิ่งนี้ไม่ได้พิสูจน์ว่าปัจจุบันโมเดลให้บริการโดยต้นทางแบบสด ออฟไลน์ — เปรียบเทียบกับ `config/quality/model-lifecycle.json` รีเฟรชด้วยมือด้วย `npm run quality:refresh-model-lifecycle` (เครือข่าย ไม่ได้ต่อสายเข้ากับ CI) `allowedRetiredInCatalog` เป็นวงล้อที่เหนื่อยหน่าย: เพิ่มรายการที่มีปัญหาในการติดตามเท่านั้น                            | ใช่                                       |
| `check:fetch-targets`             | ทุก `fetch("/api/...")` ใน `src/` ฝั่งไคลเอ็นต์จะแปลงเป็น `route.ts` จริง                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:deps`                      | `npm install` -able deps ทั้งหมดในทุก ๆ `package.json` ใน repo อยู่ใน `dependency-allowlist.json`; แพ็คเกจใหม่ที่ไม่ได้ปักหมุดหรือ slopsquatted ถูกตั้งค่าสถานะ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `audit:deps`                      | การตรวจสอบ npm ของไฟล์ล็อคอิสระทั้งห้าไฟล์ (รูท, Electron, ปลั๊กอิน OpenCode v1/v2 และผู้ให้บริการ) บล็อกคำแนะนำที่สำคัญ คำแนะนำระดับสูงยังคงเป็นคำเตือนที่มองเห็นได้ การตรวจสอบ Missing/failed คือ INCOMPLETE และ block; แฮชการล็อกตามขอบเขตและรายงานจะถูกเก็บไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                       |
| `check:lockfile`                  | ความสมบูรณ์ของ `package-lock.json` รีจิสทรี — https, แฮชความสมบูรณ์, ไม่มีการแทนที่โฮสต์                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                       |
| `check:licenses`                  | รายการที่อนุญาตของใบอนุญาต SPDX สำหรับการขึ้นต่อกันของการผลิต                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                       |
| `check:tracked-artifacts`         | ไม่มีการสร้างสิ่งประดิษฐ์ / ลิงก์สัญลักษณ์ `node_modules` ที่คอมมิต (ยังรันใน husky pre-commit; pre-push นั้นเบาโดยเจตนา — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                       |
| `check:ai-attribution`            | ไม่มีตัวอย่าง AI/bot `Co-Authored-By` หรือส่วนท้ายของการสร้าง AI ใน PR คอมมิต ชื่อ หรือเนื้อหา — Hard Rule #16 (ใน `quality.yml` fast-gates loop สำหรับ PR→ `release/**` — อ่านเพย์โหลดเหตุการณ์ no-op off PRs — และขั้นตอน PR-only ใน `ci.yml` lint สำหรับ PR→ `main`; นอกจากนี้ อนุญาตให้มีผู้เขียนร่วม `commit-msg` #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | การแยก Vitest ทุกรายการจะตั้งชื่อปัญหาการติดตามและปรากฏใน `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                       |
| `check:file-size`                 | ไฟล์ต้นฉบับ (`.ts`/`.tsx` ใน `src/`, `open-sse/`, `electron/`, `bin/`) จะอยู่ภายใน `cap` และไฟล์ทดสอบ (`*.test.ts(x)`) ภายใน `testCap`; ไฟล์ที่ถูกแช่แข็งใน `file-size-baseline.json` (`frozen` / `testFrozen`) จะต้องไม่ใหญ่เกินขนาดที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                       |
| `check:error-helper`              | การตอบสนองข้อผิดพลาดใน executors/handlers ใช้ `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ใช่                                       |
| `check:migration-numbering`       | ไฟล์ SQL ของการย้ายข้อมูลจะมีหมายเลขกำกับตามลำดับ ไม่มีช่องว่างหรือซ้ำกัน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:public-creds`              | ไม่มีตัวอักษร OAuth `client_id`/`client_secret` หรือ Firebase Web คีย์ภายนอก `publicCreds.ts` (กฎยาก #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:db-rules`                  | ไม่มี SQL แบบดิบภายนอกโมดูล `src/lib/db/` ไม่มีการนำเข้าบาร์เรลจาก `localDb.ts` (กฎยาก #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                       |
| `check:known-symbols`             | ผู้ดำเนินการของผู้ให้บริการ กลยุทธ์การกำหนดเส้นทาง และนักแปลที่ลงทะเบียนในตารางการจัดส่งตรงกับไฟล์บนดิสก์ — ไม่มีสัญลักษณ์ที่ถูกละเลยหรือไม่ได้ประกาศ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ใช่                                       |
| `check:route-guard-membership`    | ทุกเส้นทางที่สร้างกระบวนการลูกจะถูกจำแนกตาม `isLocalOnlyPath()` (กฎยาก #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `check:test-discovery`            | ไฟล์ `*.test.ts` / `*.spec.ts` ทุกไฟล์ใน repo จะถูกรวบรวมโดยผู้ทดสอบอย่างน้อยหนึ่งคน (วงล้อ: รายการเด็กกำพร้าใน `test-discovery-baseline.json` สามารถย่อขนาดได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                       |
| `check:test-tla-order`            | ไม่มีไฟล์ `node:test` ภายใต้ `tests/unit` ที่ลงทะเบียนการทดสอบ เข้าสู่ระดับบนสุด `await` จากนั้นลงทะเบียนเพิ่มเติม (#18045; ratchet: `test-tla-order-allowlist.json` สามารถย่อขนาดได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ใช่                                       |
| `check:agent-skills-sync`         | สิ่งประดิษฐ์ทักษะตัวแทนที่สร้างขึ้นตรงกับแค็ตตาล็อกแหล่งที่มา (ไม่มีการดริฟท์)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | ผู้ให้บริการ logos/assets มีรายการแหล่งที่มาที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | ไฟล์กำหนดค่า JSON จะแยกวิเคราะห์และเป็นไปตามกฎ repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | การรวบรวม TypeScript โดยไม่มีข้อผิดพลาด (คำเตือนคำแนะนำเท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ใช่                                       |
| `typecheck:noimplicit:core`       | การมองไปข้างหน้าอย่างเข้มงวด `noImplicitAny` — ; ไซต์การโทรที่มีอยู่แล้วจำนวนมากยังต้องการคำอธิบายประกอบ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **ที่ปรึกษา** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` กำหนดขอบเขตไว้ที่ `src/app/(dashboard)/**` (#7033) — รายการที่อนุญาต 27 ไฟล์ที่รวบรวมไว้ของ `typecheck:core` ไม่รวมแดชบอร์ดใด ๆ TSX และ `next build` ไม่เคยพิมพ์ตรวจสอบมันเช่นกัน (`next.config.mjs` ตั้งค่า `ignoreBuildErrors: true`) ดังนั้นการถดถอยตัวระบุเด็กกำพร้าที่นั่น (#6625/#6909) ไม่สามารถมองเห็นได้ CI แตกต่างกับเส้นฐานการนับ per-file/per-TS-code ที่แช่แข็ง (`config/quality/dashboard-typecheck-baseline.json` รูปแบบการบังคับใช้เก่าเช่นเดียวกับ `check:known-symbols`) — เฉพาะข้อผิดพลาด NEW ที่เกินกว่าการนับพื้นฐานที่ล้มเหลวเกต วงล้อลงด้วย `--update` เมื่อแก้ไขข้อผิดพลาดที่มีอยู่แล้ว                                                                                                                                                                                                                         | ใช่                                       |
| `check:build-typecheck`           | ตรวจสอบประเภทการผลิตทั้งแอป `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) รายการ 27 ไฟล์ที่อนุญาตของ Surface `typecheck:core` และประตูแดชบอร์ดไม่ครอบคลุม แตกต่างกับ `config/quality/build-typecheck-baseline.json`; การนับใหม่หรือที่เพิ่มขึ้นต่อ- (ไฟล์, รหัส) ล้มเหลว การนับที่ต่ำกว่าขอให้คุณวงล้อ `--update` ปฏิเสธในขณะที่การรันมีคู่ใหม่หรือคู่ที่ยกขึ้น เว้นแต่ว่า `--force-regressions` จะถูกส่งผ่าน และปฏิเสธไฟล์ที่ถูกปิดเสียงใหม่ เว้นแต่ว่าจะส่งผ่าน `--force-nocheck` ดังนั้นการขยายเส้นฐานให้กว้างขึ้นให้เป็นสีเขียวและให้ความเงียบถาวรจึงเป็นการกระทำโดยเจตนาที่แยกจากกัน `--force` เปลือยถูกปฏิเสธ นอกจากนี้ ยังสแกนขอบเขตบิลด์สำหรับ `@ts-nocheck` กับ `config/quality/ts-nocheck-baseline.json` เนื่องจากไฟล์ที่ใช้งานจะไม่รายงานการวินิจฉัยเลย มิฉะนั้นจะมองไม่เห็นทุกเกต | ใช่                                       |

#### โปรแกรมตรวจสอบการพิมพ์สองโปรแกรมตอบต่างกัน

`typecheck:core` และ `check:build-typecheck` คอมไพล์โปรแกรมที่แตกต่างกันภายใต้ตัวเลือกที่แตกต่างกัน และไฟล์เดียวกันสามารถล้างได้ในไฟล์หนึ่งและเต็มไปด้วยข้อผิดพลาดในอีกไฟล์หนึ่ง

`tsconfig.build.json` ตั้งค่า `"strict": false` ดังนั้น `noImplicitAny` จึงปิดอยู่ การกำหนดค่าหลักจะรวบรวมรายการที่อนุญาต 27 ไฟล์ที่คัดสรรแล้วพร้อมตัวเลือกที่เข้มงวดกว่าและเป็นไปตามกราฟการนำเข้าของแต่ละรายการ ดังนั้นไฟล์ที่ไม่เคยปรากฏในโปรแกรมบิลด์จะยังคงถูกตรวจสอบอยู่ที่นั่น

ผลที่ตามมามีความสำคัญเมื่อตัดสินว่าไฟล์ถูกพิมพ์หรือไม่:** การวินิจฉัยเป็นศูนย์ภายใต้ `check:build-typecheck` ไม่ได้หมายความว่าเป็นศูนย์** . การปอก `@ts-nocheck` จากไฟล์ 26 ไฟล์แสดงให้เห็นว่า 23 ไฟล์นั้นสะอาดในโปรแกรมบิลด์ สิบหกรายการพบข้อผิดพลาดโดยนัยประมาณ 120 รายการในส่วนที่เข้มงวด ตรวจสอบทั้งสองอย่างก่อนที่จะเรียกไฟล์ให้สะอาด

### งาน: `quality-gate`

วิ่งตาม `test-coverage` บล็อกผสานเมื่อล้มเหลว

| สคริปต์                      | ตรวจสอบ                                                                                                                                                            | การปิดกั้น           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `quality:collect`            | ปล่อย `quality-metrics.json` (จำนวนคำเตือน ESLint ความครอบคลุมจากรายงานส่วนที่รวมเข้าด้วยกัน)                                                                      | ใช่ (ต้นทางของวงล้อ) |
| `quality:ratchet`            | แต่ละเมตริกใน `quality-baseline.json` ไม่ได้ถดถอย (ESLint คำเตือน ≤ baseline; ความครอบคลุม ≥ baseline)                                                             | ใช่                  |
| `check:duplication`          | การทำสำเนาโค้ด (jscpd@4) ไม่เกินค่าพื้นฐานใน `quality-baseline.json`                                                                                               | ใช่                  |
| `check:complexity`           | ความซับซ้อนของไซโคลมาติกระดับไฟล์ไม่เกินขีดจำกัด (core ESLint `complexity` + `max-lines-per-function`)                                                             | ใช่                  |
| `check:cognitive-complexity` | วงล้อความซับซ้อนทางปัญญา (`eslint-plugin-sonarjs`) — แยก ESLint ผ่าน; CI รันทั้งสองแบบรวมเป็นขั้นตอน `check:complexity-ratchets` เดียว                             | ใช่                  |
| `check:dead-code`            | วงล้อส่งออก / ไฟล์ที่ไม่ได้ใช้ (knip) จะไม่ถดถอยเทียบกับพื้นฐาน                                                                                                    | ใช่                  |
| `check:compression-budget`   | งบประมาณมาตรฐานการบีบอัด — ต่อพื้นประหยัดโทเค็นต่อเครื่องยนต์ต้องไม่ถดถอย                                                                                          | ใช่                  |
| `check:type-coverage`        | วงล้อชนิดเปอร์เซ็นต์ (`type-coverage`) ไม่ถดถอย ส่วนใหญ่ย่อย `typecheck:noimplicit:core`                                                                           | ใช่                  |
| `check:codeql-ratchet`       | จำนวนการแจ้งเตือน CodeQL ที่เปิดไม่ถดถอย (อ่านผ่าน `gh api`; ข้ามอย่างสง่างามโดยไม่มีโทเค็น) จังหวะการรีเฟรช — และทริกเกอร์แบบแมนนวล: ดู "CodeQL ratchet" ด้านล่าง | ใช่                  |

### งาน: `quality-extended`

งานทั้งหมดเป็นการให้คำปรึกษา (`continue-on-error: true`) เฟืองที่ใช้ npm ทำงานจริง เครื่องสแกนภายนอกจะติดตั้งผ่าน `gh release download` และข้ามตัวเอง (ออก 0) เมื่อยังไม่มีไบนารี่

| สคริปต์                  | ตรวจสอบ                                                                                                                                                                                                                | การปิดกั้น                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:circular-deps`    | ไม่มีการพึ่งพาแบบวงกลม (dpdm)                                                                                                                                                                                          | **ที่ปรึกษา**                                |
| `check:bundle-size`      | ขนาดมัดไม่เกินฝา                                                                                                                                                                                                       | **ที่ปรึกษา**                                |
| `check:secrets`          | การสแกนความลับ (gitleaks) — ข้ามหากไม่มีไบนารี                                                                                                                                                                         | **ที่ปรึกษา**                                |
| `check:vuln-ratchet`     | ช่องโหว่ในการพึ่งพา (osv-scanner) จะไม่ถดถอย — `--ratchet` ล้มเหลวเนื่องจาก INCOMPLETE (ทางออก 2) หากไม่ได้วัด                                                                                                         | **ที่ปรึกษา**                                |
| `check:workflows`        | ผ้าสำลีเวิร์กโฟลว์ (actionlint + zizmor); เครื่องสแกน missing/broken รายงานที่ไม่ถูกต้อง หรือบรรทัดฐานวงล้อที่ขาดหายไปจะล้มเหลวเนื่องจาก INCOMPLETE การค้นพบที่ถูกต้องเป็นไปตามนโยบาย strict/advisory/ratchet ที่เลือก | จำเป็นต้องดำเนินการ; วงล้อ zizmor บล็อกใน CI |
| `check:openapi-breaking` | สัญญา API สาธารณะกับเหตุการณ์ที่ปักหมุดไว้ (PR merge-base, push before, merge-group base; scheduled/manual checkout parent ลำดับแรก); การวัดที่จำเป็นล้มเหลวในการปิด                                                   | **การบล็อกด้วย --ratchet**                   |

### งาน: `docs-sync-strict`

ทำงานบนทุก ๆ PR ถึง `main` บล็อกผสานเมื่อล้มเหลว

| สคริปต์                        | ตรวจสอบ                                                                                                                                   | การปิดกั้น                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Meta-gate ที่รันประตูย่อย 6 ประตูด้านล่างตามลำดับ                                                                                         | ใช่                         |
| ↳ `check:docs-sync`            | ความสอดคล้องของเวอร์ชัน CHANGELOG / OpenAPI / llm.txt                                                                                     | ใช่                         |
| ↳ `check:docs-counts`          | การนับร้อยแก้ว (การนับผู้ให้บริการ การนับการโยกย้าย ฯลฯ) อยู่ภายในหน้าต่างวงล้อของการนับจริง                                              | ใช่                         |
| ↳ `check:env-doc-sync`         | ทุก env var ใน `.env.example` ได้รับการบันทึกไว้ในตารางเอกสาร และในทางกลับกัน                                                             | ใช่                         |
| ↳ `check:deprecated-versions`  | ไม่มีสตริงเวอร์ชันที่เลิกใช้แล้วในเอกสาร                                                                                                  | ใช่                         |
| ↳ `check:doc-links`            | ลิงก์มาร์กดาวน์ภายในในเอกสารแก้ไขเป็นไฟล์จริง (รูปแบบ `[text]`/`(path)` )                                                                 | ใช่                         |
| ↳ `check:fabricated-docs`      | เส้นทาง, env vars, คำสั่ง CLI, ชื่อ hook และเส้นทางไฟล์ที่อ้างถึงในเอกสารมีอยู่ใน codebase ฮาร์ดเกตผ่าน `--strict`; ซอฟต์เฟลโดยไม่มีแฟล็ก | ใช่ (ผ่าน `--strict` ใน CI) |
| `check:cli-i18n`               | สตริงคำสั่ง CLI มีอยู่ในไฟล์โลแคล i18n ทั้งหมด                                                                                            | ใช่                         |
| `check:openapi-coverage`       | ข้อมูลจำเพาะ OpenAPI ครอบคลุมอย่างน้อยพื้นวงล้อของเส้นทางจริง                                                                             | ใช่                         |
| `check:openapi-security-tiers` | คำอธิบายประกอบระดับความปลอดภัยใน `openapi.yaml` สอดคล้องกับการจัดประเภท `routeGuard.ts`                                                   | **ที่ปรึกษา**               |
| `check:openapi-routes`         | ทุกเส้นทางใน `openapi.yaml` แก้ไขเป็น `route.ts` จริง (ป้องกันภาพหลอน)                                                                    | ใช่                         |
| `check:docs-symbols`           | การอ้างอิง `/api/...` ทุกรายการใน `docs/**/*.md` จะแก้ไขเป็น `route.ts` จริง (ป้องกันภาพหลอน)                                             | ใช่                         |
| `i18n translation drift`       | คีย์ที่ไม่ได้แปลในไฟล์โลแคล i18n — เตือนเท่านั้น                                                                                          | **ที่ปรึกษา**               |

สิบสอง README SVGs ภายใต้ `docs/diagrams/` ถูกสร้างขึ้น (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` สร้างใหม่ทั้งหมด) แต่ละไฟล์มีการทดสอบหน่วยเปรียบเทียบไบต์ (`tests/unit/docs/readme-*-svg.test.ts`, งาน `test-unit`) ซึ่งจะล้มเหลวเมื่อไฟล์ที่คอมมิตไม่มีการอัปเดต และ `check:docs-counts` อ่านหมายเลขมาตรฐานจากโหนด `<text>` ของพวกเขา — ซึ่งเป็นเหตุผลว่าทำไมขั้นตอนการสรุปจึงเก็บทุกสตริงที่สรุปไว้ในไฟล์เป็น `<text>` ที่มองไม่เห็น การตรวจสอบหมายเลขมาตรฐาน SVG จะอ่านไฟล์ที่อยู่ในรายการ `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` และ `tier-flow-light.svg`; การอ้างสิทธิ์ฟรีตลอดไปรายการแค็ตตาล็อกการเกิดซ้ำพูลและการให้คะแนนปัจจัยยังอ่าน `promise-pillars.svg`, `free-tier-budget.svg` และ `strategies-grid.svg` `free-tier-budget.svg` ดึงตัวเลขจากตัวโหลดแค็ตตาล็อกสด ดังนั้นการเปลี่ยนเป็น `FREE_MODEL_BUDGETS` หรือชื่อที่แสดงของผู้ให้บริการจะเป็นสีแดง CI จนกว่าไฟล์นั้นจะถูกสร้างใหม่

### งาน: `i18n-ui-coverage`

| สคริปต์                            | ตรวจสอบ                                                                                                                                                              | การปิดกั้น    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (อินไลน์) | ความครอบคลุมของคีย์UI i18n คือ ≥ 65%                                                                                                                                 | ใช่           |
| `check-ui-value-drift` (อินไลน์)   | เป็นภาษาอังกฤษที่เขียนใหม่** ค่า** ไม่ทิ้งคำแปลเก่าๆ ไว้เบื้องหลัง                                                                                                   | ใช่           |
| `check-new-key-coverage` (อินไลน์) | ก** ใหม่** คีย์ภาษาอังกฤษได้รับการแปลในทุกสถานที่ — เครื่องหมาย `__MISSING__:` ถูกปฏิเสธ                                                                             | ใช่           |
| `check-translation-ratio`          | อัตราส่วนการแปลตามจริงต่อภาษา (เหมือนกับภาษาอังกฤษ / ตัวยึดตำแหน่ง / การหายไปนอกรายการที่อนุญาต) ต้องไม่เกิน `config/quality/i18n-translation-baseline.json` + slack | **ที่ปรึกษา** |

ต้องการ `fetch-depth: 0` — ประตูค่าดริฟท์จะแตกต่าง `en.json` กับฐานที่ผสาน

#### `check-ui-value-drift` — ประตูการแปลเก่า

จับการถดถอย i18n อย่างหนึ่งที่ประตูอื่นๆ ไม่สามารถมองเห็นได้ในเชิงโครงสร้าง: ค่าภาษาอังกฤษจะถูกเขียนใหม่และคำแปลที่ได้มาจาก _previous_ English ยังคงอยู่ข้างหลัง ดังนั้นผู้ใช้ที่ไม่ได้ใช้ภาษาอังกฤษจึงอ่านสำเนาด้วยถ้อยคำอย่างมั่นใจ ซึ่งตอนนี้เป็นสำเนาที่ผิด

อันนี้ส่งจริง.. `oauthModal.googleOAuthWarning` ถูกเขียนใหม่เมื่อตัวช่วยเข้าสู่ระบบ Antigravity ลงจอด (#5203);** 39 จาก 43 แห่ง** เก็บข้อความบอกโอเปอเรเตอร์ให้ "คัดลอก URL แบบเต็มแล้ววางไว้ด้านล่าง" — โฟลว์ที่ไม่สามารถดำเนินการได้สำหรับผู้ให้บริการรายนั้น มันไม่มีใครสังเกตเห็นจนกระทั่ง #8463 เพราะ:

- `sync-ui-keys` จะทดแทนเฉพาะคีย์ที่เป็น** ไม่มา** ไม่เคยเป็นแบบนั้น** เหม็นอับ** ;
- `check-ui-keys-coverage` นับคีย์ _presence_ ดังนั้นคะแนนการแปลเก่าจึงถือว่าครอบคลุม
- `check-translation-drift` ติดตามเอกสารประกอบ `docs/i18n/<locale>/**.md` สะท้อน — มันไม่เคยอ่าน `src/i18n/messages/*.json` การบล็อกในงาน `docs-sync-strict` นับตั้งแต่การซิงค์ใหม่ในปี 2569-52: แก้ไขเอกสารหลัก → `npm run i18n:run -- --files=<doc>` (ระดับส่วน ราคาถูก)

**รับรู้ความแตกต่าง ไม่ได้รับการสนับสนุนพื้นฐาน** โดยจะเปรียบเทียบ `en.json` ที่ฐานผสานกับแผนผังการทำงาน สำหรับคีย์ทุกอันที่ค่าภาษาอังกฤษเปลี่ยนไป สถานที่ใด ๆ ที่ยังคงมีคำแปลที่ยังไม่ได้ถูกแตะต้องนั้นจะไม่เก่า นี้จงใจ** ระงับหนี้ที่มีอยู่แล้ว** — a diff ไม่สามารถเปิดเผยว่าคำแปลที่มีมายาวนานในภาษาอังกฤษโบราณมาจากภาษาใด ดังนั้นประตูจะตัดสินเฉพาะการเปลี่ยนแปลงที่เกิดขึ้นในปัจจุบันเท่านั้น ทางเลือกอื่น (พื้นฐานแฮชต่อคีย์) จะมีราคาไฟล์ ~ 600 KB ที่สร้างขึ้น 3 × เป็นพื้นฐานที่ใหญ่ที่สุดที่มีอยู่ โดยปั่นป่วนทุกๆ i18n PR

สองวิธีเพื่อตอบสนองความต้องการ:

1. อัปเดตคำแปลที่ได้รับผลกระทบหรือ
2. ตั้งค่าเป็น `__MISSING__:<new english>` — รันไทม์จากนั้นให้บริการภาษาอังกฤษที่แก้ไข (`src/i18n/request.ts::deepMergeFallback`, #7258) และคิวคีย์สำหรับการแปล

ถ้าเป็นเชือก** ความหมาย** เปลี่ยนแล้วชอบ** เปลี่ยนชื่อคีย์** : คีย์ใหม่ไม่สามารถสืบทอดการแปลเก่าได้ นั่นคือรูปแบบ #8463 ใช้

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ออกจาก 0 ด้วย `SKIP reason=base-unresolved` เมื่อไม่สามารถอ่านแค็ตตาล็อกฐานได้ (โคลนแบบตื้นที่ไม่มีการอ้างอิงฐาน) การทำมิเรอร์ `check-openapi-breaking`

### งาน: `i18n`

เมทริกซ์การตรวจสอบ i18n แบบเต็ม (หนึ่งงานต่อสถานที่) งานทั้งหมดเป็นที่ปรึกษา

| สคริปต์                         | ตรวจสอบ                        | การปิดกั้น                                             |
| ------------------------------- | ------------------------------ | ------------------------------------------------------ |
| `validate_translation.py quick` | ความสมบูรณ์ของการแปลต่อสถานที่ | **ที่ปรึกษา** (`continue-on-error: true` ในงานทั้งหมด) |

### งาน: `pr-test-policy`

ทำงานตามคำขอดึงเท่านั้น

| สคริปต์                | ตรวจสอบ                                                                                                                       | การปิดกั้น |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PRs ที่เปลี่ยนรหัสการผลิตใน `src/`, `open-sse/`, `electron/` หรือ `bin/` จะต้องรวมหรืออัปเดตการทดสอบ (Hard Rule #8)           | ใช่        |
| `check:test-masking`   | ไฟล์ทดสอบที่เปลี่ยนแปลงไม่ลดจำนวนการยืนยันสุทธิหรือเพิ่ม `assert.ok(true)` tautologies                                        | ใช่        |
| `check:pr-evidence`    | เนื้อความ PR อ้างอิงหลักฐาน test/VPS สำหรับการเปลี่ยนแปลง (กลไกฮาร์ดกฎ #18 โดย grepping PR ร้อยแก้ว — เปราะบาง ดูที่ Backlog) | ใช่        |

### งาน: `test-vitest`

วิ่งตาม `build` บล็อกผสานเมื่อล้มเหลว

| ห้องสวีท         | ตรวจสอบ                                                         | การปิดกั้น                                                                                                               |
| ---------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | เซิร์ฟเวอร์MCP (110 เครื่องมือ), autoCombo, แคช — vitest runner | ใช่                                                                                                                      |
| `test:vitest:ui` | การทดสอบส่วนประกอบ UI — vitest runner                           | **การปิดกั้น** ความล้มเหลวที่มีอยู่แล้ว — ถูกแยกออกอย่างชัดเจนใน `vitest.config.ts`; ความล้มเหลวครั้งใหม่ทำให้งานล้มเหลว |

### ขั้นตอนการทำงานทุกคืน (ตามกำหนดเวลา การให้คำปรึกษา)

สิ่งเหล่านี้ทำงานตามกำหนดเวลา cron (และ `workflow_dispatch`) ไม่เคยทำงานบน PRs ล้วนเป็นที่ปรึกษา

| ขั้นตอนการทำงาน        | ตรวจสอบ                                                                                                                                         | การปิดกั้น    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | การทดสอบคุณสมบัติตรวจสอบอย่างรวดเร็วด้วยการสุ่มจำนวนการรันเมล็ด + สูง                                                                           | **ที่ปรึกษา** |
| `nightly-resilience`   | ประตูการเจริญเติบโตของฮีป, การฉีดข้อผิดพลาดเคออส, k6 load/soak                                                                                  | **ที่ปรึกษา** |
| `nightly-llm-security` | promptfoo injector guard (โหมดบล็อก) โพรบ + garak (ข้ามโดยไม่มีความลับของผู้ให้บริการ)                                                          | **ที่ปรึกษา** |
| `nightly-schemathesis` | OpenAPI สัญญาคลุมเครือ (แผนผัง) กับ OmniRoute แบบสดโดยใช้ `docs/openapi.yaml` — ละเมิดข้อกำหนดพื้นผิว / 500s ที่ไม่สามารถจัดการได้ (Fase 8 B.4) | **ที่ปรึกษา** |
| `nightly-mutation`     | คะแนนการทดสอบการกลายพันธุ์ของสไตรเกอร์เหนือยูนิตเลนที่รวดเร็ว — การกลายพันธุ์ที่รอดชีวิตแสดงการยืนยันที่อ่อนแอ                                  | **ที่ปรึกษา** |
| `nightly-compat`       | เมทริกซ์ความเข้ากันได้ของ Node Engine ในช่วง `engines.node` ที่รองรับ                                                                           | **ที่ปรึกษา** |

เส้นฐานด้านประสิทธิภาพ (ฮีป, TTFB, เวลาบิวด์) จะถูกบันทึก ไม่ใช่การควบคุมดูแล: ดู [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)

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

## นโยบายรายการที่อนุญาต

ทุกประตูที่ไม่สามารถล้มเหลวในการละเมิดที่มีอยู่แล้วจะใช้รายการที่อนุญาตแบบแช่แข็ง (เช่น `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) นโยบายคือ:

**แก้ไขต้นเหตุ; ใช้รายการที่อนุญาตเฉพาะเมื่อมีการละเมิดอยู่แล้วและไม่สามารถแก้ไขได้ใน PR เดียวกัน**

เมื่อเพิ่มรายการลงในรายการที่อนุญาต ให้ทำดังนี้

1. รวมความคิดเห็นพร้อมเหตุผล
2. อ้างอิงถึงปัญหาการติดตาม (เช่น `// #3498 — Phase 2 feature, not yet implemented`)
3. ลบรายการใน PR เดียวกันที่แก้ไขการละเมิด — รายการเก่าที่ไม่ระงับการละเมิดที่ใช้งานอยู่อีกต่อไปถือเป็นข้อบกพร่อง (การบังคับใช้เก่าของ 6A.3 จะทำให้เกตล้มเหลวในรายการที่อนุญาตที่ถูกละเลยเมื่อนำไปใช้งาน)

ทำ** ไม่** เพิ่มรายการที่อนุญาตเพื่อให้การทดสอบผ่านเร็วขึ้น ประตูสีเขียวที่มีรายการที่อนุญาตเพิ่มขึ้นถือเป็นความรู้สึกผิดๆ เกี่ยวกับคุณภาพ

### เมื่อเกตล้มเหลวบน PR ของคุณ

1. **อ่านเอาต์พุตเกตอย่างระมัดระวัง** — จะบอกคุณอย่างชัดเจนว่าไฟล์หรือสัญลักษณ์ใดละเมิดกฎ
2. **แก้ไขการละเมิด** — เกตส่วนใหญ่เป็นการตรวจสอบระบบไฟล์ที่กำหนดซึ่งจะผ่านทันทีที่โค้ดถูกต้อง
3. **หากมีการละเมิดอยู่ก่อนแล้ว** (เช่น คุณไม่ได้แนะนำมัน แต่ตอนนี้เกตครอบคลุมมันแล้ว): เพิ่มรายการที่อนุญาตพร้อมความคิดเห็นที่ให้เหตุผลและปัญหาการติดตาม
4. **หากประตูเป็นวงล้อ** (ความครอบคลุม คำเตือน ESLint การทำซ้ำ ความซับซ้อน): การเปลี่ยนแปลงของคุณทำให้การวัดแย่ลง แก้ไขปัญหาที่ซ่อนอยู่ หรือเรียกใช้ `npm run quality:ratchet -- --update` (ไม่บ่อยนัก) หากการเปลี่ยนแปลงนั้นเกิดขึ้นโดยเจตนาและการลดประสิทธิภาพของหน่วยเมตริกนั้นยอมรับได้ — แต่บันทึกสาเหตุไว้ในคำอธิบาย PR
5. **ประตูที่ปรึกษา** (`continue-on-error: true`) เป็น — ที่ให้ข้อมูลซึ่งไม่ได้บล็อกการผสาน แต่ปรากฏในสรุป CI แก้ไขมันต่อไป

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

## การหาเหตุผลเข้าข้างตนเอง Backlog ( ทบทวน ROI — Fase 9 Onda 3)

สินค้าคงคลังนี้ได้รับการกระทบยอดกับ `ci.yml` เมื่อวันที่ 17-06-2026 (เวอร์ชันก่อนหน้าละเว้น `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`) การตรวจสอบ ROI ของชุดที่กระทบยอดระบุผู้สมัครการหาเหตุผลเข้าข้างตนเองต่อไปนี้** การผสานเป็นการเปลี่ยนแปลง CI เชิงกล flips/drops คือการตัดสินใจเชิงนโยบายที่สงวนไว้สำหรับผู้ปฏิบัติงาน** ยังไม่มีการใช้ด้านล่างนี้

**ไม่มีเอกสารข้างต้นด้วย** (คำแนะนำ สัญญาณต่ำ): งาน `docs-lint` (markdownlint + Vale, งานทั้งหมด `continue-on-error`) และเวิร์กโฟลว์เครื่องสแกนแบบสแตนด์อโลน `semgrep.yml` / `codeql.yml` / `scorecard.yml` `semgrepFindings: 0` อยู่ใน `quality-baseline.json` แต่ไม่ได้ต่อสายเข้ากับวงล้อบล็อกใน `ci.yml` — ตัวชี้วัดปัจจุบันไม่มีการเชื่อมโยง

### ผสาน / ลบข้อมูลซ้ำ (กลไก ความเสี่ยงต่ำกว่า)

ผู้สมัครแต่ละคนได้รับการตรวจสอบกับสถานะเกตเวย์สดในวันที่ 17-06-2026 (เชื่อใจแต่ตรวจสอบ) การรวมกิจการที่ "ชัดเจน" หลายครั้งกลับกลายเป็นเพื่อซ่อนหนี้และเป็น** ไม่** ดรอปอินที่สะอาด

- **`check:docs-sync` ทำงานสองครั้ง** — แบบสแตนด์อโลนในงาน `lint` และอีกครั้งภายใน `check:docs-all` (`docs-sync-strict`) และ hook ที่กระทำล่วงหน้าแบบ Husky ✅**DONE** — การร้องขอ `lint` แบบสแตนด์อโลนถูกลบออก
- **การสแกน CVE** — ❌**NOT เป็นการผสานที่สะอาดหมดจด** `audit:deps` บล็อกคำแนะนำที่สำคัญและการตรวจสอบที่ไม่สมบูรณ์ในไฟล์ล็อคทั้งห้าไฟล์ ขณะเดียวกันก็รายงานคำแนะนำระดับสูงเป็นคำเตือนภายใต้นโยบายปัจจุบัน `check:vuln-ratchet` (osv) ล้มเหลวเฉพาะใน _regression_ เทียบกับพื้นฐานที่เช็คอิน และปฏิเสธการวัดที่ขาดหายไปเมื่อจำเป็น ความหมายที่แตกต่างกัน — ที่ปล่อย `audit:deps` จะสูญเสียประตูวิกฤตแบบสัมบูรณ์และใบเสร็จรับเงินการตรวจสอบแพ็คเกจอิสระ เก็บไว้ทั้งสองอย่าง
- **การตรวจจับวงจร** — ✅**DONE** (#15159 G-01/G-02) ข้อความเก่าที่นี่เรียกว่า `check:cycles` "ประตูสีเขียวที่ได้รับการดูแลจัดการ" และให้เหตุผลในการบล็อกเนื่องจาก `check:circular-deps` (dpdm) รายงาน 91 รอบ สีเขียวนั้นคือก** สีเขียวเท็จ** : `check:cycles` สแกน 5 ไดเรกทอรีย่อย (450 ไฟล์) จับคู่เฉพาะ `import|export … from` แบบคงที่ และทิ้งตัวระบุ `@/` และ `@omniroute/open-sse/` ทุกตัว ดังนั้นจึงไม่เห็นวงจรนามแฝง + นำเข้าแบบไดนามิกที่ครอบงำ repo แก้ไขแล้ว: ตอนนี้เกตเดิน `src` + `open-sse` (ไฟล์ 5023) รวบรวมตัวระบุจาก TypeScript AST (ดังนั้น `import("…")` นับและ `typeof import("…")` ตำแหน่งประเภทไม่) และแก้ไข tsconfig `paths` มันพบ** 14** รอบ ไม่ใช่ 0 เนื่องจาก 14 รอบที่มีอยู่แล้วไม่สามารถแก้ไขได้ในเกต PR ตอนนี้ `check:cycles` จึงเป็น** วงล้อ** (`--ratchet`, เพดาน `metrics.cycles.value = 14` ใน `quality-baseline.json`, `direction: down`) — จะบล็อก _regression_ ใด ๆ และการนับสามารถลดลงเท่านั้น CI วิ่ง `npm run check:cycles:ratchet` ขี่เบิร์นดาวน์ด้วย**A-01** . `check:circular-deps` (dpdm) ยังคงเป็นคำแนะนำในฐานะความคิดเห็นที่สองที่กว้างขึ้น
- **ความซับซ้อน** — ✅**DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): เดิน ESLint หนึ่งครั้ง นับด้วย ruleId ดังนั้นบรรทัดสูงสุด + แบบไซโคลมาติกและพื้นฐานการรับรู้ยังคงเป็นอิสระ `check:complexity` / `check:cognitive-complexity` แต่ละตัวยังคงอยู่สำหรับ `--update` ในพื้นที่
- **`/api` ต่อต้านภาพหลอน** — ✅**DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): หนึ่งรายการ FS ของ `src/app/api`, openapi-routes + docs-สัญลักษณ์ยังคงรายงานอย่างเป็นอิสระ บุคคลยังคงอยู่เพื่อดำเนินการในพื้นที่
- **`check:node-runtime` ทำงานใน 11 งาน** — ⚠️** ROI ต่ำ** แต่ละคนเป็นนักวิ่งที่แยกจากกันและเช็คคือ < 1s; ประหยัดได้ทั้งหมด ~ วินาที เทียบกับการสูญเสียผู้พิทักษ์ต่องานราคาถูก ไม่คุ้มค่าที่จะปั่น
- **`typecheck:noimplicit:core` บน CI lint** — ✅** ถูกลบออกจากงานผ้าสำลี** (เป็นที่ปรึกษา `continue-on-error`); พื้นผิวประเภทการปิดกั้นคือ `typecheck:core` + `check:type-coverage` สคริปต์ท้องถิ่นยังคงอยู่

### พลิก / ตัดสินใจ (นโยบายผู้ประกอบการ)

- `check:openapi-security-tiers` (ที่ปรึกษา) — ❌**NOT พลิกได้อย่างหมดจด** ออกจาก 0 แต่เตือนว่าเส้นทาง `traffic-inspector` หลายเส้นทางภายใต้ `LOCAL_ONLY_API_PREFIXES` ขาดคำอธิบายประกอบ `x-loopback-only: true` การบังคับใช้จำเป็นต้องเพิ่มคำอธิบายประกอบเหล่านั้นใน `openapi.yaml` ก่อน
- `typecheck:noimplicit:core` (ที่ปรึกษา) — ส่วนใหญ่ย่อยโดยการบล็อกวงล้อ `check:type-coverage` พลิกไปที่วงล้อหรือปล่อย `tsc` pass ที่สองที่ซ้ำซ้อน
- `test:vitest:ui` (ตอนนี้** การปิดกั้น** ) ความล้มเหลวที่มีอยู่แล้ว — จะถูกแยกออกอย่างชัดเจนใน `vitest.config.ts` พร้อมด้วยความคิดเห็นในการติดตาม `// #8618` ความล้มเหลวครั้งใหม่ทำให้งานล้มเหลว
- `check:secrets` (gitleaks การปิดกั้นวงล้อที่แช่แข็งที่ 3 เอกสารผลบวกลวง) — อนุญาตรายการ 3 ให้ถึง 0 หรือลดระดับเป็นที่ปรึกษา ทับซ้อน GitHub การสแกนความลับดั้งเดิม + `check:public-creds`
- `check:pr-evidence` (การปิดกั้น, greps PR-body prose) — ความเสี่ยงเชิงบวกที่ผิดพลาดสูง; ทำให้การบังคับใช้ #18 ของ Hard Rule อ่อนลงหากหลุด ดังนั้นนี่จึงเป็นการเรียกร้องนโยบายอย่างแท้จริง
- `semgrep` (ที่ปรึกษาแบบสแตนด์อโลน) — ทับซ้อน CodeQL สำหรับตระกูล OWASP ; โยงเส้นฐานเข้ากับวงล้อหรือหล่น

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
