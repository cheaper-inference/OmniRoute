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

CLI กำหนดให้ `--evidence-root` เพื่อตรวจสอบหลักฐานที่เก็บไว้ ไฟล์ได้รับการแก้ไขเป็น `<evidence-root>/<artifact_id>/<member>` และแฮชเป็น SHA-256 บันทึก PASS ที่ไม่มีหลักฐาน ไฟล์สูญหายหรือมีการเปลี่ยนแปลง เส้นทางที่ไม่ปลอดภัย หรือลิงก์สัญลักษณ์จะป้องกันการตรวจสอบ ไฟล์ที่หายไปไม่เท่ากับบันทึกที่สำเร็จที่ว่างเปล่า การตรวจสอบ SHA/run/attempt ที่มีอยู่ยังคงเป็นอิสระ: ไบต์ที่ตรงกันไม่สามารถช่วยเหลือใบเสร็จเก่าได้ ความสมบูรณ์ของไฟล์ไม่ใช่ข้อพิสูจน์ถึงความถูกต้องของการดำเนินการหรือการส่งเสริมสิ่งประดิษฐ์

### สินค้าคงคลังสแกนแบบคงที่

สินค้าคงคลัง npm-alias เวอร์ชันและการเป็นสมาชิก static-scan อยู่ใน `config/quality/gate-manifest.json` เรียกใช้ `npm run check:gate-manifest` เพื่อตรวจสอบชื่อสคริปต์และคำสั่งที่ตรงกับ `package.json`; การเพิ่ม การลบ และการดริฟต์คำสั่งจะล้มเหลวทั้งงาน hook ในเครื่องและงานการเปลี่ยนแปลงการจัดประเภทใน CI นามแฝงไม่ใช่งานเวิร์กโฟลว์ อินสแตนซ์เมทริกซ์ หรือกรณีทดสอบ: จำนวนเหล่านี้ต้องไม่แสดงให้ใช้แทนกันได้

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
| `check:model-lifecycle`           | ตารางเส้นทางที่ดูแลรักษาด้วยมือทั้งสามตารางจะสอดคล้องกับสแน็ปช็อตวงจรการใช้งานที่เช็คอิน (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ไม่มีคะแนน id ที่เลิกใช้ซึ่ง `REGISTRY` สามารถกำหนดเส้นทางได้ ทุกเป้าหมาย `BUILT_IN_ALIASES` มีอยู่ใน `REGISTRY` และไม่มีอยู่ในสแน็ปช็อต id ที่เลิกใช้แล้ว รหัสที่เลิกใช้งานทุกรหัสที่ยังอยู่ใน `REGISTRY` จะถูกส่งต่อหรือแสดงเป็น `allowedRetiredInCatalog`; และไม่มีแหล่งที่มาหรือเป้าหมาย `DEFAULT_DEGRADATION_MAP` ปรากฏขึ้นในสแน็ปช็อตนั้น สิ่งนี้ไม่ได้พิสูจน์ว่าปัจจุบันโมเดลให้บริการโดยอัพสตรีมแบบสด ออฟไลน์ — เปรียบเทียบกับ `config/quality/model-lifecycle.json` รีเฟรชด้วยมือด้วย `npm run quality:refresh-model-lifecycle` (เครือข่าย ไม่ได้ต่อสายเข้ากับ CI) `allowedRetiredInCatalog` เป็นวงล้อที่เหนื่อยหน่าย: เพิ่มรายการที่มีปัญหาในการติดตามเท่านั้น                                | ใช่                                       |
| `check:fetch-targets`             | ทุก `fetch("/api/...")` ใน `src/` ฝั่งไคลเอ็นต์จะแปลงเป็น `route.ts` จริง                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:deps`                      | `npm install` -able deps ทั้งหมดในทุก ๆ `package.json` ใน repo อยู่ใน `dependency-allowlist.json`; แพ็คเกจใหม่ที่ไม่ได้ปักหมุดหรือ slopsquatted ถูกตั้งค่าสถานะ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `audit:deps`                      | การตรวจสอบ npm ของไฟล์ล็อคอิสระทั้งห้าไฟล์ (root, Electron, ปลั๊กอิน OpenCode v1/v2 และผู้ให้บริการ) บล็อกคำแนะนำที่สำคัญ คำแนะนำระดับสูงยังคงเป็นคำเตือนที่มองเห็นได้ การตรวจสอบ Missing/failed คือ INCOMPLETE และ block; แฮชการล็อกตามขอบเขตและรายงานจะถูกเก็บไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ใช่                                       |
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
| `check:agent-skills-sync`         | อาร์ติแฟกต์ทักษะตัวแทนที่สร้างขึ้นตรงกับแค็ตตาล็อกแหล่งที่มา (ไม่มีการเบี่ยงเบน) โหมดวางจำหน่ายจะตรวจสอบทุกทักษะ คุณลักษณะ PR (โหมด `pr` ) ตรวจสอบเฉพาะทักษะที่มีข้อความที่สร้างขึ้นซึ่งแก้ไข — ดู [ไฟล์ที่สร้างขึ้นและพื้นฐานที่ได้รับ](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | ผู้ให้บริการ logos/assets มีรายการแหล่งที่มาที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | ไฟล์กำหนดค่า JSON จะแยกวิเคราะห์และเป็นไปตามกฎ repo lint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | การรวบรวม TypeScript โดยไม่มีข้อผิดพลาด (คำเตือนคำแนะนำเท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ใช่                                       |
| `typecheck:noimplicit:core`       | การมองไปข้างหน้าอย่างเข้มงวด `noImplicitAny` — ; ไซต์การโทรที่มีอยู่แล้วจำนวนมากยังต้องการคำอธิบายประกอบ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **ที่ปรึกษา** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` กำหนดขอบเขตไว้ที่ `src/app/(dashboard)/**` (#7033) — รายการที่อนุญาต 27 ไฟล์ที่รวบรวมไว้ของ `typecheck:core` ไม่รวมแดชบอร์ดใด ๆ TSX และ `next build` ไม่เคยพิมพ์ตรวจสอบมันเช่นกัน (`next.config.mjs` ตั้งค่า `ignoreBuildErrors: true`) ดังนั้นการถดถอยตัวระบุเด็กกำพร้าที่นั่น (#6625/#6909) ไม่สามารถมองเห็นได้ CI แตกต่างกับเส้นฐานการนับ per-file/per-TS-code ที่แช่แข็ง (`config/quality/dashboard-typecheck-baseline.json` รูปแบบการบังคับใช้เก่าเช่นเดียวกับ `check:known-symbols`) — เฉพาะข้อผิดพลาด NEW ที่เกินกว่าการนับพื้นฐานที่ล้มเหลวเกต วงล้อลงด้วย `--update` เมื่อแก้ไขข้อผิดพลาดที่มีอยู่แล้ว                                                                                                                                                                                                                         | ใช่                                       |
| `check:build-typecheck`           | ตรวจสอบประเภทการผลิตทั้งแอป `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) รายการ 27 ไฟล์ที่อนุญาตของ Surface `typecheck:core` และประตูแดชบอร์ดไม่ครอบคลุม แตกต่างกับ `config/quality/build-typecheck-baseline.json`; การนับใหม่หรือที่เพิ่มขึ้นต่อ- (ไฟล์, โค้ด) ล้มเหลว การนับที่ต่ำกว่าขอให้คุณวงล้อ `--update` ปฏิเสธในขณะที่การรันมีคู่ใหม่หรือคู่ที่ยกขึ้น เว้นแต่ว่า `--force-regressions` จะถูกส่งผ่าน และปฏิเสธไฟล์ที่ถูกปิดเสียงใหม่ เว้นแต่ว่าจะส่งผ่าน `--force-nocheck` ดังนั้นการขยายเส้นฐานให้กว้างขึ้นให้เป็นสีเขียวและให้ความเงียบถาวรจึงเป็นการกระทำโดยเจตนาที่แยกจากกัน `--force` เปลือยถูกปฏิเสธ นอกจากนี้ ยังสแกนขอบเขตบิลด์สำหรับ `@ts-nocheck` กับ `config/quality/ts-nocheck-baseline.json` เนื่องจากไฟล์ที่ใช้งานจะไม่รายงานการวินิจฉัยเลย มิฉะนั้นจะมองไม่เห็นทุกเกต | ใช่                                       |

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
| `check:type-scale-ratchet`   | ขนาดประเภท Kit: ขนาดต่ำกว่า 12 px และ `font-bold` ใน `src/` จะลดลงเท่านั้น (`typeScaleSubFloorSizes`, `typeScaleFontBold`); ยังอยู่ใน hook การคอมมิตล่วงหน้าด้วย   | ใช่                  |

### งาน: `quality-extended`

งานผสม โดยไม่มีระดับงาน `continue-on-error`: ขั้นตอนที่ผ่าน `--ratchet` ทำให้งานล้มเหลวในการถดถอยที่วัดเทียบกับ `quality-baseline.json` คำแนะนำเฉพาะ `check:circular-deps` และขั้นตอนการติดตั้งสแกนเนอร์ (ระดับขั้นตอน `continue-on-error: true`) เครื่องสแกนภายนอกติดตั้งผ่าน `gh release download`; `check:secrets` ข้ามตัวเอง (ออก 0) เมื่อ gitleaks หายไป ในขณะที่ `check:vuln-ratchet`, `check:workflows` และ `check:openapi-breaking` ล้มเหลวในการปิดเมื่อการวัดหายไป

| สคริปต์                  | ตรวจสอบ                                                                                                                                                                                                                | การปิดกั้น                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:circular-deps`    | ไม่มีการพึ่งพาแบบวงกลม (dpdm)                                                                                                                                                                                          | **ที่ปรึกษา**                                |
| `check:bundle-size`      | ขนาดมัดไม่เกินฝา; ขนาดที่ไม่สามารถวัดได้ก็ล้มเหลวเช่นกัน                                                                                                                                                               | **การบล็อกด้วย --ratchet**                   |
| `check:secrets`          | การสแกนความลับ (gitleaks) — จะข้ามหากไม่มีไบนารี                                                                                                                                                                       | **การบล็อกด้วย --ratchet**                   |
| `check:vuln-ratchet`     | ช่องโหว่ในการพึ่งพา (osv-scanner) จะไม่ถดถอย — `--ratchet` ล้มเหลวเนื่องจาก INCOMPLETE (ทางออก 2) หากไม่ได้วัด                                                                                                         | **การบล็อกด้วย --ratchet**                   |
| `check:workflows`        | ผ้าสำลีเวิร์กโฟลว์ (actionlint + zizmor); เครื่องสแกน missing/broken รายงานที่ไม่ถูกต้อง หรือบรรทัดฐานวงล้อที่ขาดหายไปจะล้มเหลวเนื่องจาก INCOMPLETE การค้นพบที่ถูกต้องเป็นไปตามนโยบาย strict/advisory/ratchet ที่เลือก | จำเป็นต้องดำเนินการ; วงล้อ zizmor บล็อกใน CI |
| `check:openapi-breaking` | สัญญา API สาธารณะกับเหตุการณ์ที่ปักหมุดไว้ (PR merge-base, push before, merge-group base; scheduled/manual checkout parent ลำดับแรก); การวัดที่จำเป็นล้มเหลวในการปิด                                                   | **การบล็อกด้วย --ratchet**                   |

### งาน: `docs-sync-strict`

ทำงานบนทุก ๆ PR ถึง `main` บล็อกผสานเมื่อล้มเหลว

| สคริปต์                        | ตรวจสอบ                                                                                                                                        | การปิดกั้น                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Meta-gate ที่รันประตูย่อย 6 ประตูด้านล่างตามลำดับ                                                                                              | ใช่                         |
| ↳ `check:docs-sync`            | ความสอดคล้องของเวอร์ชัน CHANGELOG / OpenAPI ; โหมด release รวมถึงมิเรอร์ 66 `llm.txt` และส่วน CHANGELOG ที่แปลแล้ว (โหมด PR : มิเรอร์เห็นด้วย) | ใช่                         |
| ↳ `check:docs-counts`          | การนับร้อยแก้ว (จำนวนผู้ให้บริการ จำนวนการอพยพ ฯลฯ) สองโหมด: `pr` บนคุณสมบัติ PRs, `release` ที่อื่น — ดู "ค่าที่ได้รับ" ด้านล่าง              | ใช่                         |
| ↳ `check:env-doc-sync`         | ทุก env var ใน `.env.example` ได้รับการบันทึกไว้ในตารางเอกสาร และในทางกลับกัน                                                                  | ใช่                         |
| ↳ `check:deprecated-versions`  | ไม่มีสตริงเวอร์ชันที่เลิกใช้แล้วในเอกสาร                                                                                                       | ใช่                         |
| ↳ `check:doc-links`            | ลิงก์มาร์กดาวน์ภายในในเอกสารแก้ไขเป็นไฟล์จริง (แบบฟอร์ม `[text]`/`(path)` )                                                                    | ใช่                         |
| ↳ `check:fabricated-docs`      | เส้นทาง, env vars, คำสั่ง CLI, ชื่อ hook และเส้นทางไฟล์ที่อ้างถึงในเอกสารมีอยู่ใน codebase ฮาร์ดเกตผ่าน `--strict`; ซอฟต์เฟลโดยไม่มีแฟล็ก      | ใช่ (ผ่าน `--strict` ใน CI) |
| `check:cli-i18n`               | ปุ่ม CLI `t()` มีอยู่ใน `bin/cli/locales/en.json` (ทั้งสองโหมด); ความเท่าเทียมกันของ pt-BR / zh-CN / zh-TW กับ `en.json` ในโหมดรีลีสเท่านั้น   | ใช่                         |
| `check:openapi-coverage`       | ข้อมูลจำเพาะ OpenAPI ครอบคลุมอย่างน้อยพื้นวงล้อของเส้นทางจริง                                                                                  | ใช่                         |
| `check:openapi-security-tiers` | คำอธิบายประกอบระดับความปลอดภัยใน `openapi.yaml` สอดคล้องกับการจัดประเภท `routeGuard.ts`                                                        | **ที่ปรึกษา**               |
| `check:openapi-routes`         | ทุกเส้นทางใน `openapi.yaml` แก้ไขเป็น `route.ts` จริง (ป้องกันภาพหลอน)                                                                         | ใช่                         |
| `check:docs-symbols`           | การอ้างอิง `/api/...` ทุกรายการใน `docs/**/*.md` จะแก้ไขเป็น `route.ts` จริง (ป้องกันภาพหลอน)                                                  | ใช่                         |
| `i18n translation drift`       | `docs/i18n/**` mirrors เทียบกับ `.i18n-state.json` ที่ปรึกษา — บน PRs (มิเรอร์ถูกรีเฟรชโดยคลื่นการแปล) เข้มงวดในการพุชและทุกคืน                | **ที่ปรึกษา** บน PRs        |

#### มิเรอร์การแปลเป็นไฟล์ที่ได้รับ (โหมด PR เทียบกับโหมด release)

คุณลักษณะ PR แก้ไขเฉพาะแหล่งข้อมูลภาษาอังกฤษเท่านั้น มิเรอร์ `docs/i18n/<locale>/**` (รวมถึงสำเนา 66 `llm.txt` และไฟล์ `CHANGELOG.md` ที่แปลแล้ว) และ `.i18n-state.json` จะถูกเขียนใหม่ในขั้นตอนเดียวโดย wave การแปล (สาขา `docs/i18n-*` / `chore/i18n-*`, `i18n-mirror-refresh.yml` ที่กำหนดเวลาไว้) และโดยการเปิดตัว (`npm run release:sync-changelog-i18n`) ดังนั้นประตูกระจกจึงทำงานในสองโหมด แก้ไขโดย `scripts/check/lib/gateMode.mjs` (`--mode=pr|release` จากนั้น `OMNIROUTE_GATE_MODE` จากนั้นเหตุการณ์ Actions การรันในเครื่องคือ `release`):

- โหมด `check:docs-sync` — release รันทุกการตรวจสอบ โหมด PR จะเก็บเวอร์ชัน package.json/OpenAPI, ส่วนหัว CHANGELOG รูต และตัวป้องกันเอกสารที่ถูกแทนที่ และพิมพ์ `SKIP reason=pr-mode` สำหรับสำเนามิเรอร์ `llm.txt` และส่วน CHANGELOG ที่แปลแล้ว — เว้นแต่ PR จะเขียนมิเรอร์: สาขาหลักที่ประกาศเป็นผู้เขียนของตระกูล `docs/i18n/**` ใน `config/quality/derived-paths/*.json` จะรันการตรวจสอบทั้งสองอย่างเข้มงวด และเมื่อฐาน diff แก้ไข การเปลี่ยนแปลงที่มีการแก้ไข diff `docs/i18n/<locale>/llm.txt` ของตัวเอง หรือ `CHANGELOG.md` รันที่ตรวจสอบอย่างเคร่งครัด ฐาน diff ไม่ได้รับการแก้ไขในการชำระเงิน depth-1 (งาน `docs-sync-strict` ) ดังนั้นโหมด PR ยังรันการตรวจสอบหนึ่งครั้งที่ไม่จำเป็นต้องมีฐาน: มิเรอร์ `llm.txt` ทุกตัวจะต้องมีอยู่ เก็บตัวคั่น `---` ไว้ และพกพาเนื้อหาหลักหรือเนื้อหาที่มิเรอร์ส่วนใหญ่ใช้ร่วมกัน ฐานที่ขยับจะทำให้กระจกทุกบานมีสภาพเก่าและผ่านไปเท่าๆ กัน การแก้ไขกระจกข้างหนึ่งด้วยมือล้มเหลว ไฟล์ `CHANGELOG.md` ที่แปลแล้วไม่มีการตรวจสอบดังกล่าวในการชำระเงิน depth-1 PR
- hook การคอมมิตล่วงหน้าจะรัน `check-docs-sync.mjs --mode=pr`: การคอมมิตจะถูกตัดสินจากสิ่งที่มันทำ หากไม่มีแฟล็ก การรันในเครื่องจะเป็นโหมดรีลีส และหนึ่ง PR ที่รวมเข้าด้วยกันซึ่งแก้ไขรูท `llm.txt` จะบล็อกทุกการคอมมิตบนฐานนั้นในภายหลังจนกว่าคลื่นจะรัน กฎเดียวกันนี้ใช้กับเกตที่รับรู้โหมดใด ๆ ที่ Husky hook ทำงาน: hook ผ่าน `--mode=pr` และคำตัดสินที่เข้มงวดยังคงอยู่กับการรันโหมด release (release PR, พุชไปที่ `main`, การรันโลคัลธรรมดา)
- การทดสอบหน่วยเนื้อหามิเรอร์ (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) โหมดการเปิดตัว — ยืนยันทุกสถานที่ โหมด PR ยืนยันเฉพาะมิเรอร์ที่เป็นปัจจุบันด้วยแหล่งที่มาภาษาอังกฤษตาม `.i18n-state.json` (แฮชทั้งไฟล์ หรือแฮชส่วนที่บันทึกไว้ของส่วนที่หมุดทดสอบ) และข้ามอันเก่าพร้อมเหตุผล การตรวจสอบที่มา `target_hash` จะทำงานสำหรับทุกภาษาในทั้งสองโหมด ความสดเป็นไปตามส่วน `## ` หน่วยแฮช `run-translation.mjs` ส่วนที่ยาว (รายการเกตของไฟล์นี้มีประมาณครึ่งหนึ่ง) หมายถึงการแก้ไขใดๆ ในนั้นจะทำให้มิเรอร์เหล่านั้นค้าง และการยืนยันโหมด PR ของมันจะข้ามไปจนถึงคลื่นลูกถัดไป จุดยึดที่แหล่งข้อมูลภาษาอังกฤษไม่มีอีกต่อไปจะกลับไปเป็นการเปรียบเทียบทั้งไฟล์
- `i18n translation drift` คำแนะนำ — เกี่ยวกับ PRs เข้มงวดในการกด ทุกคืน และการตัดการปล่อย ดังนั้นมิเรอร์เก่าจึงไม่สามารถจัดส่งในการปล่อยได้

`scripts/i18n/sync-llm-mirrors.mjs` (ส่งออกเป็น `syncLlmMirrors()` ด้วย `--dry-run`) เขียนกระจก `llm.txt` ใหม่ การรีเฟรชรีลีส คลื่นการแปล และ `i18n-mirror-refresh.yml` ตามกำหนดการจะรัน (การรีเฟรชตรวจพบมิเรอร์ `llm.txt` เก่าที่มีการรันแบบแห้ง เนื่องจากรายงานดริฟท์ไม่ได้แสดงรายการ และซิงค์ก่อน `check:docs-all`)

สิบสอง README SVGs ภายใต้ `docs/diagrams/` ถูกสร้างขึ้น (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` สร้างใหม่ทั้งหมด) แต่ละรายการมีการทดสอบหน่วยเปรียบเทียบไบต์ (`tests/unit/docs/readme-*-svg.test.ts`, งาน `test-unit`) ซึ่งจะล้มเหลวเมื่อไฟล์ที่คอมมิตค้างอยู่ในโหมดรีลีส ใน PR, `check:generated-artifacts` ตัดสิน SVG การแก้ไข PR และการดริฟท์ของฐานถูกปล่อยให้รีเฟรชการเปิดตัว (ดูที่ [Generated files and พื้นฐานที่ได้รับ](#generated-files-and-derived-baselines-written-at-release) ) — และ `check:docs-counts` อ่านตัวเลขที่เป็นที่ยอมรับจากโหนด `<text>` ของพวกเขา — ซึ่งเป็นสาเหตุที่ขั้นตอนการสรุปทำให้ทุกสตริงที่เค้าร่างในไฟล์เป็นสิ่งที่มองไม่เห็น `<text>` การตรวจสอบหมายเลขมาตรฐาน SVG จะอ่านไฟล์ที่อยู่ในรายการ `SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, plus `public/images/tier-flow-dark.svg` และ `tier-flow-light.svg`; การอ้างสิทธิ์ฟรีตลอดไปรายการแค็ตตาล็อกการเกิดซ้ำพูลและการให้คะแนนปัจจัยยังอ่าน `promise-pillars.svg`, `free-tier-budget.svg` และ `strategies-grid.svg` จำนวนตัวสร้างเหล่านี้ดึงออกมา (ผลรวมของผู้ให้บริการ, เครื่องมือ MCP, กลยุทธ์การกำหนดเส้นทาง, ผู้ให้บริการฟรีตลอดไป, …) มาจากข้อเท็จจริงสแนปชอต `docs/reference/derived-facts.json` ถึง `scripts/docs/readmeFacts.mjs` ไม่ใช่จากตัวอักษร ดังนั้น การสร้างไดอะแกรมใหม่บนสาขาใดๆ จะสร้างไฟล์ที่คอมมิตอีกครั้ง `free-tier-budget.svg` ดึงแถวจากสแน็ปช็อตเดียวกัน (`code.freeTierBudget` แค็ตตาล็อกสรุปบันทึกการตรวจสอบข้อเท็จจริง) ดังนั้นการเปลี่ยนแปลงใน `FREE_MODEL_BUDGETS` จะมาถึงการ์ดในการรีเฟรชครั้งถัดไป แทนที่จะเปลี่ยนเป็น CI เป็นสีแดง

### ค่าที่ได้รับ: โหมดเกต `pr` และ `release`

คุณลักษณะ PR ไม่เคยเขียนค่าที่ขึ้นอยู่กับสถานะของฐาน: ผู้ให้บริการ การโยกย้าย จำนวนเครื่องมือ MCP และกลยุทธ์ หมายเลข README SVG สแน็ปช็อตข้อเท็จจริง ขั้นตอนหนึ่งจะคำนวณใหม่ทั้งหมด `npm run release:refresh-derived` รันโดยรีลีสและโดยรีเฟรชที่ได้รับทุกคืน PR ดังนั้น** ระหว่างรีลีส ฐานจะอยู่เบื้องหลังโค้ดสดตามการออกแบบ** และเกตหรือการทดสอบที่เปรียบเทียบแผนผังกับโค้ดสดจะเป็นสีแดงในทุก ๆ PR หลังจากที่พี่น้องเพิ่มผู้ให้บริการ ประตูที่ตัดสินค่าที่ได้รับจึงทำงานในโหมดใดโหมดหนึ่งจากสองโหมด ซึ่งแก้ไขโดย `scripts/check/lib/gateMode.mjs` (ชนะนัดแรก):

1. `--mode=pr|release` บนบรรทัดคำสั่ง
2. ตัวแปรสภาพแวดล้อม `OMNIROUTE_GATE_MODE` (`pr` หรือ `release`);
3. อัตโนมัติ จากเหตุการณ์การดำเนินการ GitHub : `pull_request` ที่ส่วนหัวไม่ใช่ `release/v*`, `merge_group` หรือการกดไปที่ `omni-queue/**` → `pr`; ทุกอย่างอื่น (พุช, กำหนดเวลา, จัดส่ง, การเปิดตัว PR `release/v* → main`, การรันในเครื่องใดๆ) → `release`

`check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) ใดที่ล้มเหลวในแต่ละโหมด:

| โหมด      | ล้มเหลว                                                                                                                                                                                                                                                                                                                                                                                                | ต้องการข้อเท็จจริงสด |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `release` | การตรวจสอบทุกครั้ง ความเท่าเทียมกันอย่างเข้มงวดกับข้อเท็จจริงที่รวบรวมจากแผนผัง (พฤติกรรมที่เกตมีอยู่เสมอ): จำนวนเก่า เวอร์ชัน พื้นที่ครอบคลุม หรือหมายเลข SVG เป็นการดริฟท์ STRICT                                                                                                                                                                                                                    | ใช่                  |
| `pr`      | เฉพาะสิ่งที่การเปลี่ยนแปลงทำ ซึ่งแตกต่างกับฐาน PR ที่มีตัวแยกการอ้างสิทธิ์เดียวกัน: (1) ค่าที่ได้รับการจัดการที่ไม่มีอยู่ในฐานสำหรับการตรวจสอบและไฟล์นั้น ("PR แก้ไขหมายเลขที่ได้รับการจัดการ — คืนค่าบรรทัดเป็นข้อความฐาน"); (2) ต้องเรียกร้องค่าสินไหมทดแทนที่ฐานบรรทุกและศีรษะสูญหาย ค่าคงที่ของเนื้อหาที่ไม่จำเป็นต้องเรียกใช้ข้อเท็จจริงในโหมดเผยแพร่ การตรวจสอบเฉพาะรุ่นจะถูกแสดงรายการและข้ามไป | เลขที่               |

ไฟล์คำแนะนำตัวแทนดำเนินการ** เลขที่** จำนวนที่ได้รับทั้งหมด: `AGENTS.md`, `llm.txt` (และสำเนา `docs/i18n/*/llm.txt` ของมัน), bs `AGENTS.md` fork, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` และทุก ๆ `skills/*/SKILL.md` ชี้ไปที่แหล่งที่มา (เช่น `ROUTING_STRATEGY_VALUES` ใน `src/shared/constants/routingStrategies.ts`) และไปที่ `npm run facts` แทน ค่าคงที่ "ไม่มีการนับที่ได้รับ (ไฟล์คำสั่งเอเจนต์ …)" ไม่ผ่านการนับ (ผู้ให้บริการ การโยกย้าย เครื่องมือและขอบเขต MCP กลยุทธ์การกำหนดเส้นทาง ปัจจัยการให้คะแนน แพ็กโหมด) ในทั้งสองโหมด ดังนั้นการรีเฟรชรีลีสจึงไม่จำเป็นต้องเขียนไฟล์คำสั่งใหม่

ในโหมด `pr` สาขาตัวเขียนอาจแก้ไขค่าที่ได้รับการจัดการ: `chore/derived-*` (การรีเฟรชทุกคืน PR), `release/v*` และคลื่นการแปล `docs/i18n-*` และ `chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`) คิวแบทช์ (`merge_group`, Mergifyร่าง, `omni-queue/**`) จะไม่ถูกตัดสินอีกครั้ง: พวกเขารวม PRs ประตูที่ตัดสินแล้วทีละคน

รหัสออก: `0` clean · `1` STRICT drift (หรือ soft drift ด้วย `--strict`) หรือการละเมิดค่าที่ได้รับการจัดการ · โครงสร้างพื้นฐาน `2` — ไม่สามารถรวบรวมข้อเท็จจริงของโค้ดได้ (โพรบ tsx ล้มเหลวหรือหมดเวลาใช้งาน การหมดเวลาคือ `OMNIROUTE_FACTS_TIMEOUT_MS` ค่าเริ่มต้น 600000 ms) หรือใน CI ฐาน PR ไม่สามารถแก้ไขได้ ทางออกที่ 2 ไม่เคยทำให้เกิดความแตกต่างของเอกสาร: รันงานใหม่หรือแก้ไขสภาพแวดล้อม

โดยที่แต่ละโหมดทำงาน:

| ที่ไหน                                                                                                             | โหมด                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| คุณลักษณะ PR — `ci.yml` job `docs-sync-strict` ขั้นตอน `quality.yml` "ความถูกต้องของเอกสาร"                        | `pr` (อัตโนมัติ); งานผ่านฐานเป็น `BASE_SHA` และเช็คเอาท์ด้วย `fetch-depth: 2`                                                                                                           |
| `merge_group`, ผู้สมัคร `omni-queue/**`, รายการประตูเต็มของรถไฟผสาน                                                | `pr`                                                                                                                                                                                    |
| ปล่อย PR (`release/v* → main`) การพุช การกำหนดเวลา และการรันแบบแมนนวล                                              | `release`                                                                                                                                                                               |
| Release-สีเขียว (`scripts/quality/validate-release-green.mjs`)                                                     | รายการ HARD ทำงานด้วย `OMNIROUTE_GATE_MODE=pr` ("ฐานแตกหรือไม่"); รายการ DRIFT `derived-refresh` รัน `npm run release:refresh-derived -- --check` (มุมมองที่เข้มงวด ไม่เคยเปิดฐานสีแดง) |
| ปล่อย (`/generate-release` เฟส 0a และ 1; การเดินสายทักษะเป็นการเปลี่ยนแปลงที่ได้รับการอนุมัติจากเจ้าของแยกต่างหาก) | `npm run release:refresh-derived` เขียนไฟล์ที่ได้รับ การตรวจสอบของ release PR จากนั้นทำงานในโหมด `release`                                                                              |
| `nightly-derived-refresh.yml` (รายวัน, สูงสุด `release/vX.Y.Z`, ข้ามภายใต้ release-freeze)                         | `npm run release:refresh-derived -- --profile=nightly`; ในทางกลับกันมันทำให้ ONE PR เปิดจาก `chore/derived-refresh`; ไม่เคยผสาน                                                         |

คำสั่งเบื้องหลัง:

- `npm run facts` พิมพ์ทุกหมายเลขที่ได้รับเป็น JSON (`scripts/release/facts.mjs`) `--key=code.mcpTools` พิมพ์ค่าเดียว `--snapshot` อ่านสแน็ปช็อตที่คอมมิตแทนแผนผังสด ทางออกที่ 2 เมื่อไม่สามารถรวบรวมข้อเท็จจริงได้
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) คำนวณไฟล์ที่ได้รับอีกครั้งในครั้งเดียว ตามลำดับนี้ (รหัสขั้นตอนสำหรับ `--only=`): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (สแน็ปช็อต), `numbers` (แผนการเขียนใหม่ของเกตนับที่ใช้กับเอกสาร จากนั้นส่งต่อไปยังมิเรอร์ `docs/i18n/` ), `readme-diagrams`, `skills` (สร้าง `SKILL.md`), `e2e-timings` (ข้ามไปจนถึงแผนผัง จัดส่ง `syncE2eTimings`), `ui-keys` (คีย์พรุน `en.json` ลดลงและด้วยค่าเริ่มต้น `--rewritten-since=<ref>` — `origin/main` — ค่าภาษาอังกฤษที่เขียนใหม่ตั้งแต่รีลีสครั้งล่าสุด), `llm-mirrors` และ `verify-generated` (หลังจากเขียน `check:generated-artifacts` และ `check:agent-skills-sync` ในโหมด release จะต้องผ่าน ข้ามใน `--check` และเมื่อ `--only` ปล่อยมันออกไป ความล้มเหลวคือทางออก 2) ขั้นตอน `changelog` คือการเลือกเข้าร่วม (`--with-changelog` โปรไฟล์ release เท่านั้น) `--profile=nightly` ไม่เคยแตะการอ้างสิทธิ์เวอร์ชัน ด้วย `-- --check` จะไม่เขียนอะไรเลยและออกจาก 1 เมื่อไฟล์ใด ๆ มีการเปลี่ยนแปลงหรือค่าที่ได้รับการจัดการจำเป็นต้องแก้ไขด้วยตนเอง (แสดงทั้งสองรายการ) ทางออก 2 เมื่อโครงสร้างพื้นฐานขัดข้อง `--json` พิมพ์ผลลัพธ์เป็น JSON
- `docs/reference/derived-facts.json` คือสแน็ปช็อตของข้อเท็จจริงที่ใช้การรีเฟรชครั้งล่าสุด เฉพาะการรีเฟรชเท่านั้นที่เขียนมัน เครื่องกำเนิด README SVG อ่านมัน และการทดสอบหน่วย PR-time จะเปรียบเทียบเอกสารที่คอมมิตและไฟล์ที่สร้างขึ้นด้วย — ไม่เคยกับโค้ดสด การเปรียบเทียบสดครั้งเดียวของชุดคือ "การรีเฟรชรีลีสปิดรอบ" ใน `tests/unit/check-docs-counts-sync.test.ts`: ด้วยข้อเท็จจริงที่ใช้งานอยู่ แผนการเขียนซ้ำของการรีเฟรชที่ใช้ในหน่วยความจำทำให้ไม่มีการดริฟท์ STRICT ซึ่งไม่ได้รายงาน และการวางแผนใหม่จะไม่เปลี่ยนแปลงอะไรเลย

หากต้องการทำซ้ำในเครื่อง (การรันในเครื่องมีค่าเริ่มต้นเป็น `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

หากไม่มีฐานที่แก้ไขได้ (ไม่มี `BASE_SHA`/`BASE_REF`, ไม่มีในเครื่อง `origin/release/v<version>`) การเรียกใช้ `pr` ในเครื่องจะพิมพ์คำเตือนและข้ามส่วนต่างแทนที่จะล้มเหลว

### งาน: `i18n-ui-coverage`

| สคริปต์                            | ตรวจสอบ                                                                                                                                                              | การปิดกั้น                   |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check-ui-keys-coverage` (อินไลน์) | ความครอบคลุมของคีย์UI i18n คือ ≥ 65%                                                                                                                                 | ใช่ (ทั้งสองโหมด)            |
| `check:ui-icu`                     | ทุกข้อความของทุกแค็ตตาล็อก UI จะคอมไพล์ด้วย `IntlMessageFormat`                                                                                                      | ใช่ (ทั้งสองโหมด)            |
| `check-ui-value-drift` (อินไลน์)   | เป็นภาษาอังกฤษที่เขียนใหม่** ค่า** ไม่ทิ้งคำแปลเก่าๆ ไว้เบื้องหลัง                                                                                                   | ใช่ (โหมดวางจำหน่ายเท่านั้น) |
| `check-new-key-coverage` (อินไลน์) | ก** ใหม่** คีย์ภาษาอังกฤษได้รับการแปลในทุกสถานที่ — เครื่องหมาย `__MISSING__:` ถูกปฏิเสธ                                                                             | ใช่ (โหมดวางจำหน่ายเท่านั้น) |
| `check-key-completeness` (อินไลน์) | ทุกแค็ตตาล็อก UI (และด้วย `--catalog=cli` ทุกแค็ตตาล็อก CLI ) มีชุดคีย์ของ `en.json`; ในโหมด `pr` แต่ละแค็ตตาล็อกที่ PR เปลี่ยนกับตัวเองที่ฐานผสาน                   | ใช่ (ทั้งสองโหมด)            |
| `check-translation-ratio`          | อัตราส่วนการแปลตามจริงต่อภาษา (เหมือนกับภาษาอังกฤษ / ตัวยึดตำแหน่ง / การหายไปนอกรายการที่อนุญาต) ต้องไม่เกิน `config/quality/i18n-translation-baseline.json` + slack | ใช่ (โหมดวางจำหน่ายเท่านั้น) |

ต้องการ `fetch-depth: 0` — ประตูค่าดริฟท์จะแตกต่าง `en.json` กับฐานที่ผสาน

**สองโหมด (ตั้งแต่ 11-11-2569)** คุณลักษณะ PR เพิ่มหรือเขียนคีย์ใหม่ใน `en.json` (และ `bin/cli/locales/en.json`) และไม่แตะภาษาอื่น `check:pr-derived-paths` (job `pr-test-policy`, family `config/quality/derived-paths/translation.json`) ล้มเหลวในฟีเจอร์ PR ที่ทำ สถานที่อื่นๆ จะเสร็จสมบูรณ์หนึ่งครั้งต่อการเปิดตัวโดย `release:refresh-derived` ซึ่งเรียก `syncUiKeys()` ใน `scripts/i18n/sync-ui-keys.mjs` (เพิ่มคีย์ที่หายไป ตัดอันที่ทิ้ง ทำเครื่องหมายการแปลภาษาอังกฤษที่เขียนใหม่ด้วย `rewrittenSinceRef` การแปล) หรือโดยคลื่นการแปล ประตูอ่านโหมดจาก `scripts/check/lib/gateMode.mjs`: ในโหมด `pr` (คุณสมบัติ PRs, `merge_group`, `omni-queue/**`) ประตูโหมดการเปิดตัวด้านบนพิมพ์ `SKIP reason=pr-mode` และทางออก 0; ในโหมด `release` (release PR, pushes to `main`, `workflow_dispatch`, local run) พวกมันเข้มงวดเหมือนเดิม และใน release PR ตัว diff-aware จะได้รับ `BASE_REF=origin/main` ดังนั้นพวกเขาจะตัดสินทุกคีย์ที่วงจรเพิ่มหรือเขียนใหม่ ดูตัวอย่างคำตัดสินของฟีเจอร์-PR ในเครื่องด้วย `--mode=pr`

PR ที่ยังคงเปลี่ยนแค็ตตาล็อกโลแคลในโหมด `pr` (คลื่นการแปล การรีเฟรชรีลีส การแก้ไขเฉพาะการแปลเท่านั้น) จะไม่ถูกข้าม: `check-key-completeness` จะตัดสินแต่ละแค็ตตาล็อกที่มีการเปลี่ยนแปลงเทียบกับแค็ตตาล็อกเดียวกันที่ฐานผสาน (`scripts/i18n/lib/touched-catalogs.mjs`) และล้มเหลวในคีย์ที่แค็ตตาล็อกหายไป คีย์ `en.json` ขาด การแปลจริงกลายเป็นเครื่องหมาย `__MISSING__:` หรือเป็นข้อความภาษาอังกฤษ หรือค่าที่ไม่สอดแทรก placeholders/tags ของสตริงภาษาอังกฤษอีกต่อไป PR ไม่ได้สัมผัส แค็ตตาล็อกใหม่ใน PR ต้องมีชุดคีย์ `en.json` ทั้งหมด ซึ่งครอบคลุมถึงอัตราส่วนและเกตความเท่าเทียมกันของ CLI ที่จะเห็นสำหรับแคตตาล็อก PR

การทดสอบหน่วย locale-parity (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) ทำตามโหมดเดียวกันผ่าน `tests/_helpers/localeParityMode.ts`: ในโหมด `pr` พวกเขาจะข้ามการยืนยันคีย์-พาริตี้ และปล่อยให้รีลีสรีเฟรชพาริตีตัวยึดตำแหน่งของคีย์ที่ภาษาอังกฤษเปลี่ยนไปตั้งแต่ฐานผสาน (ทุกคีย์เมื่อการชำระเงินแบบตื้นของงานทดสอบหน่วยไม่สามารถอ่านได้) ตัวช่วยนั้นคือ.** เท่านั้น** การข้ามแบบมีเงื่อนไขของโหมดที่ได้รับอนุมัติ: `check:test-masking` นับ `.skip(` และ `{ skip: true }` แต่ไม่ใช่ `{ skip: "<reason>" }` ที่คำนวณแล้วที่ส่งคืน ดังนั้น `tests/unit/locale-parity-mode.test.ts` จะปักหมุดรายการการทดสอบที่อนุญาตให้ใช้ — การเพิ่มรายการหนึ่งเป็นการแก้ไขที่ได้รับการตรวจสอบแล้วในรายการนั้น

#### `check-ui-value-drift` — ประตูการแปลเก่า

จับการถดถอย i18n อย่างหนึ่งที่ประตูอื่นๆ ไม่สามารถมองเห็นได้ในเชิงโครงสร้าง: ค่าภาษาอังกฤษจะถูกเขียนใหม่และคำแปลที่ได้มาจาก _previous_ English ยังคงอยู่ข้างหลัง ดังนั้นผู้ใช้ที่ไม่ได้ใช้ภาษาอังกฤษจึงอ่านสำเนาด้วยถ้อยคำอย่างมั่นใจ ซึ่งตอนนี้เป็นสำเนาที่ผิด

อันนี้ส่งจริง.. `oauthModal.googleOAuthWarning` ถูกเขียนใหม่เมื่อตัวช่วยเข้าสู่ระบบ Antigravity ลงจอด (#5203);** 39 จาก 43 แห่ง** เก็บข้อความบอกโอเปอเรเตอร์ให้ "คัดลอก URL แบบเต็มแล้ววางไว้ด้านล่าง" — โฟลว์ที่ไม่สามารถดำเนินการได้สำหรับผู้ให้บริการรายนั้น มันไม่มีใครสังเกตเห็นจนกระทั่ง #8463 เพราะ:

- `sync-ui-keys` จะทดแทนเฉพาะคีย์ที่เป็น** ไม่มา** ไม่เคยเป็นแบบนั้น** เหม็นอับ** ;
- `check-ui-keys-coverage` นับคีย์ _presence_ ดังนั้นคะแนนการแปลเก่าจึงถือว่าครอบคลุม
- `check-translation-drift` ติดตามเอกสารประกอบ `docs/i18n/<locale>/**.md` สะท้อน — มันไม่เคยอ่าน `src/i18n/messages/*.json` มันทำงานใน job `docs-sync-strict`: คำแนะนำเกี่ยวกับ PRs เข้มงวดในการพุชและทุกคืน คลื่นการแปลจะรีเฟรชมิเรอร์ ไม่ใช่ฟีเจอร์ PR

**รับรู้ความแตกต่าง ไม่ได้รับการสนับสนุนพื้นฐาน** โดยจะเปรียบเทียบ `en.json` ที่ฐานผสานกับแผนผังการทำงาน สำหรับคีย์ทุกอันที่ค่าภาษาอังกฤษเปลี่ยนไป สถานที่ใดๆ ที่ยังคงมีคำแปลที่ยังไม่ได้ถูกแตะต้องนั้นจะไม่เก่า นี้จงใจ** ระงับหนี้ที่มีอยู่แล้ว** — a diff ไม่สามารถเปิดเผยว่าคำแปลที่มีมายาวนานในภาษาอังกฤษโบราณมาจากภาษาใด ดังนั้นประตูจะตัดสินเฉพาะการเปลี่ยนแปลงที่เกิดขึ้นในปัจจุบันเท่านั้น ทางเลือกอื่น (พื้นฐานแฮชต่อคีย์) จะมีราคาไฟล์ ~ 600 KB ที่สร้างขึ้น 3 × เป็นพื้นฐานที่ใหญ่ที่สุดที่มีอยู่ โดยปั่นป่วนทุกๆ i18n PR

สองวิธีเพื่อตอบสนองความต้องการ:

1. อัปเดตคำแปลที่ได้รับผลกระทบหรือ
2. ตั้งค่าเป็น `__MISSING__:<new english>` — รันไทม์จากนั้นให้บริการภาษาอังกฤษที่แก้ไข (`src/i18n/request.ts::deepMergeFallback`, #7258) และคิวคีย์สำหรับการแปล

ถ้าเป็นเชือก** ความหมาย** เปลี่ยนแล้วชอบ** เปลี่ยนชื่อคีย์** : คีย์ใหม่ไม่สามารถสืบทอดการแปลเก่าได้ นั่นคือรูปแบบ #8463 ที่ใช้

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ออกจาก 0 ด้วย `SKIP reason=base-unresolved` เมื่อไม่สามารถอ่านแค็ตตาล็อกฐานได้ (โคลนแบบตื้นที่ไม่มีการอ้างอิงฐาน) การทำมิเรอร์ `check-openapi-breaking` โหมดวางจำหน่ายเท่านั้น: คุณลักษณะ PR เขียนภาษาอังกฤษใหม่และหยุดอยู่ตรงนั้น การรีเฟรชรีลีสจะทำเครื่องหมายการแปลที่ทิ้งไว้ (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, เดียวกัน `findStaleTranslations`)

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
| `nightly-resilience`   | ประตูการเจริญเติบโตแบบฮีป, การฉีดความผิดพลาดแบบเคออส, k6 load/soak                                                                              | **ที่ปรึกษา** |
| `nightly-llm-security` | promptfoo injector guard (โหมดบล็อก) โพรบ + garak (ข้ามโดยไม่มีความลับของผู้ให้บริการ)                                                          | **ที่ปรึกษา** |
| `nightly-schemathesis` | OpenAPI สัญญาคลุมเครือ (แผนผัง) กับ OmniRoute แบบสดโดยใช้ `docs/openapi.yaml` — ละเมิดข้อกำหนดพื้นผิว / 500s ที่ไม่สามารถจัดการได้ (Fase 8 B.4) | **ที่ปรึกษา** |
| `nightly-mutation`     | คะแนนการทดสอบการกลายพันธุ์ของสไตรเกอร์เหนือยูนิตเลนที่รวดเร็ว — การกลายพันธุ์ที่รอดชีวิตแสดงการยืนยันที่อ่อนแอ                                  | **ที่ปรึกษา** |
| `nightly-compat`       | เมทริกซ์ความเข้ากันได้ของ Node Engine ในช่วง `engines.node` ที่รองรับ                                                                           | **ที่ปรึกษา** |

เส้นฐานด้านประสิทธิภาพ (ฮีป, TTFB, เวลาบิวด์) จะถูกบันทึก ไม่ใช่รั้วรอบขอบชิด: ดู [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)

---

## ระยะความเร็ว (30-08-2569 → v4.0 LTS): ทุกเส้นพื้นฐานคลายตัวลง 20%

การตัดสินใจของเจ้าของ (30-08-2569): จนถึงการปรับให้เป็นโมดูลเวอร์ชัน 4.0 ความเร็วในการจัดส่งมีความสำคัญมากกว่าการจำกัดวงเงินหนี้ ทั้งหมด** ตัวเลข** เส้นฐานของวงล้อถูกคลายลง 20% ในการส่งผ่านที่ตรวจสอบได้ครั้งเดียว และเฟสถูกประกาศเป็น `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| สิ่งที่เปลี่ยนแปลงไป                                                                                                                                                                   | ที่ไหน                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — นับต่ำลงดีกว่า × 1.2, เปอร์เซ็นต์สูงกว่าดีกว่า ÷ 1.2 (พื้นที่ครอบคลุม 60 เก็บไว้, `eslintErrors` ยังคงเป็น 0, `eslintWarnings` 0 → 20% ของจำนวนการปราบปรามแช่แข็ง) | `quality-baseline.json` (บันทึกย่อ `_relax_velocity_2026_08_30` แสดงรายการทุก ๆ ก่อน → หลัง)           |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ทุกบรรทัด `frozen[*]` / `testFrozen[*]` สูงสุด × 1.2                                                                                                                 | `file-size-baseline.json`                                                                              |
| ต่อไฟล์ / ต่อรหัส TS นับ × 1.2                                                                                                                                                         | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` เป็นที่ปรึกษาในขณะที่ `_policy.requireTighten === false`                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| `bank-ratchet-shrinks` หยุดชั่วคราวทุกคืน (มันจะธนาคารการหดตัวที่วัดได้และยกเลิก headroom)                                                                                             | `.github/workflows/nightly-release-green.yml`                                                          |

รายการที่อนุญาต (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`, …) คือ** ไม่** งบประมาณและไม่ถูกแตะต้อง ประตูนโยบาย Pass/fail (ความลับ, กฎ SQL, สัญญา docs/env, ความเท่าเทียมกันของ i18n, การทดสอบหน่วย) ไม่มีการเปลี่ยนแปลง — การทดสอบสีแดงยังคงเป็นการทดสอบสีแดง

**เครื่องมือ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — การพักผ่อนแบบช็อตเดียว (`scripts/quality/relax-baselines.mjs`); ปฏิเสธที่จะทำงานสองครั้งด้วยโน้ตเดียวกัน
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — วัดทุกเกตตัวเลขในแบบที่ CI ทำ และพิมพ์ headroom ที่เหลือต่อเกต (`scripts/quality/baseline-headroom.mjs`) งาน `baseline-headroom` ทุกคืนจะเผยแพร่ตารางในสรุปการรันเวิร์กโฟลว์และอัปโหลดรายงาน JSON/Markdown เป็น `baseline-headroom-<run_id>` โดยเก็บไว้เป็นเวลา 90 วัน คำเตือนและแถววิกฤติระบุประตูภายใน 10% ของขีดจำกัดหรือเกินไปแล้ว ตรวจสอบรายงานเหล่านี้เป็นการเตือนล่วงหน้าเกี่ยวกับงบประมาณที่ใช้ไป ตรวจสอบบันทึก `_rebaseline_*` ของประตูที่กระทำผิด งานไม่สร้างหรืออัปเดตปัญหาถาวรอีกต่อไป #12149 จะเก็บรักษาประวัติการรายงานก่อนหน้านี้

**โหมดโค้ดใหม่ (Clean-as-You-Code) — ตั้งแต่ 30-08-2569, PR fast-path เท่านั้น**

ในเหตุการณ์ `pull_request` `quality.yml` ส่งผ่าน `--base-ref <PR base SHA>` ไปที่ `check:file-size`, `check:complexity-ratchets` และ `check:dead-code` สำหรับ `check:complexity-ratchets` และ `check:dead-code` ประตูจะเปรียบเทียบ HEAD กับฐานผสาน** จำกัดเฉพาะไฟล์ที่ PR สัมผัส** (`scripts/check/newCodeMode.mjs`: การผสานฐานเกิดขึ้นจริงใน `git worktree` แบบใช้แล้วทิ้ง ESLint/knip ทำงานที่นั่นและบน HEAD จำนวนต่อไฟล์จะแตกต่างกัน):

- **การปิดกั้น** — PR เพิ่มการละเมิด cyclomatic/cognitive หรือการส่งออกที่ไม่ทำงานในไฟล์ที่มีการเปลี่ยนแปลง (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` ในบันทึก);
- **ที่ปรึกษา** — ผลรวมทั่วโลกเทียบกับค่าพื้นฐานที่แช่แข็ง การดริฟท์ที่สืบทอดมาไม่เคยทำให้ PR ผู้บริสุทธิ์แดง; การดริฟท์จะถูกแช่แข็งอีกครั้งเมื่อมีการกระทบยอดการรีลีสและเฝ้าดูโดยงานเฮดรูม

`check:file-size` ใช้การอ้างอิงฐานตามเงื่อนไขของตัวเอง (`scripts/check/check-file-size.mjs`, #8522): มันจะตรวจสอบทุกแหล่งที่มาและไฟล์ทดสอบในแผนผัง อ่านจำนวนบรรทัดของแต่ละคนที่ฐาน PR ด้วย `git show` และล้มเหลวเฉพาะไฟล์เมื่อมันขยายเกินเพดานฐานที่ใหญ่กว่า (`frozen` / `testFrozen` หรือ `cap` / `testCap` สำหรับไฟล์ที่อยู่นอกพื้นฐาน) และขนาดฐานของมัน ไฟล์ที่ลอยอยู่บนฐานแล้วจึงไม่ทำให้ PR บริสุทธิ์เป็นสีแดง

`check:boundary:ratchet` ใช้กฎเดียวกันกับหมายเลขเดียว (`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): ในเหตุการณ์ PR ทั้ง `quality.yml` fast-gates และ `ci.yml` lint job ส่งผ่าน PR base SHA คอมมิตฐานจะถูกวัดจากการส่งออก `git archive` และ PR จะล้มเหลวเฉพาะเมื่อจำนวน `open-sse → src` edge เกินค่าที่มากกว่าของ `metrics.boundaryOpenSseToSrc` และจำนวนบนฐาน มีการรายงานฐานดริฟท์เหนือเพดาน (`base drift herdado`) แต่ไม่เคยทำให้ PR บริสุทธิ์เป็นสีแดง push → main จะคงเพดานสัมบูรณ์ไว้ และ SHA ฐานที่ไม่สามารถแก้ไขได้จะถอยกลับไปพร้อมกับคำเตือน

ตัวเลือก omni-queue (การพุชไปที่ `omni-queue/**` ดูที่ [OMNI_QUEUE.md](../ops/OMNI_QUEUE.md) ) จะได้รับการปฏิบัติเช่นเดียวกับคำขอดึง: เวิร์กโฟลว์ทั้งสองส่งผ่านฐานผู้สมัคร (`needs.changes.outputs.candidateBase`) เป็น `--base-ref` และ `check:ts7-diagnostics-ratchet` ก็วิ่งสวนทางกับมันเช่นกัน สำหรับเกตโค้ดใหม่สองตัว ฐานการเปรียบเทียบคือ SHA เอง ไม่ใช่พาเรนต์แรกของการคอมมิตการรวมระดับสูงสุด ดังนั้นทุกคำขอดึงของแบตช์จะถูกตัดสิน

`workflow_dispatch` ทำงาน การกวาดสีเขียวแบบ release และงาน headroom ทุกคืนไม่มีฐาน PR และเก็บการเปรียบเทียบแบบสัมบูรณ์ (ทั่วโลก) ความครอบคลุม การทำซ้ำ และการครอบคลุมประเภทยังคงอยู่ในระดับโลกในขณะนี้ (เครื่องมือของพวกเขาไม่ได้สร้างความแตกต่างต่อไฟล์ในราคาถูก) ผู้สมัคร — สำหรับการรักษาแบบเดียวกัน

**ปิดเฟสที่ v4.0 (LTS = แน่นกว่าเดิม ไม่ใช่ "กลับสู่ภาวะปกติ")**

1. ในเคล็ดลับ `release/v4.0.0` ล้วนๆ: `npm run quality:headroom --json` สำหรับบันทึก จากนั้น `npm run quality:ratchet -- --update`, `check:file-size --update`, `check:complexity-ratchets --update`, `check:dead-code --update` `--update` — ของประตูตรวจสอบแต่ละประเภทแต่ละบรรทัดพื้นฐานจะลดลงเป็นค่าที่วัดได้
2. ลบ `_policy` ออกจาก `quality-baseline.json` (ติดอาวุธ `--require-tighten` และการธนาคารทุกคืน) กู้คืน `THRESHOLD = 36` (หรือสูงกว่า) ใน `check-openapi-coverage.mjs`
3. กระชับเกินกว่าที่วัดได้เมื่อโมดูลาร์ได้รับผลตอบแทน: ขนาดไฟล์ `cap` กลับไปเป็น 1,000 (หรือ 800), พื้นครอบคลุม + 5, การส่งออกที่ไม่ทำงาน 0 สำหรับแพ็คเกจแบบโมดูลาร์

## วงล้อพื้นฐาน (`quality-baseline.json`)

กลไกวงล้อ (`scripts/quality/check-quality-ratchet.mjs`) อ่าน `quality-baseline.json` และเปรียบเทียบกับ `quality-metrics.json` ที่รวบรวมใหม่ หน่วยวัดใดๆ ที่ถดถอยเกินกว่าเอปไซลอนจะล้มเหลวในการสร้าง

ตัวชี้วัดที่ติดตามปัจจุบัน:

| เมตริก                | ทิศทาง | ความหมาย                               |
| --------------------- | ------ | -------------------------------------- |
| `eslintWarnings`      | `down` | จำนวนคำเตือน ESLint จะต้องไม่เพิ่มขึ้น |
| `coverage.statements` | `up`   | ความคุ้มครองคำชี้แจงจะต้องไม่ตก        |
| `coverage.lines`      | `up`   | ความครอบคลุมของเส้นต้องไม่ตก           |
| `coverage.functions`  | `up`   | ความครอบคลุมของฟังก์ชันต้องไม่ตก       |
| `coverage.branches`   | `up`   | ความครอบคลุมสาขาต้องไม่ตก              |

หากต้องการอัปเดตข้อมูลพื้นฐานหลังการปรับปรุงอย่างแท้จริง:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

ธง `--update` เขียนค่าที่วัดได้ในปัจจุบันลงใน `quality-baseline.json` การปรับปรุงการธนาคารคืองาน release/nightly ไม่ใช่คุณลักษณะ PR: `--require-tighten` (Fase 6A.5) ล้มเหลวในการปรับปรุงที่ไม่ได้รับการปรับปรุงในโหมดรีลีสเท่านั้น (พุช, กำหนดเวลา, รีลีส PR, การรันในเครื่อง) ในคุณลักษณะ PR (โหมดเกต `pr` ) จะพิมพ์การปรับปรุงเป็นข้อมูลและส่งผ่าน การถดถอยล้มเหลวในทั้งสองโหมด ในช่วงความเร็ว จะมีการแจ้งเตือนทุกที่ (`_policy.requireTighten: false`) ดู [ไฟล์ที่สร้างขึ้นและพื้นฐานที่ได้รับ](#generated-files-and-derived-baselines-written-at-release)

### วงล้อ CodeQL : รีเฟรชจังหวะและทริกเกอร์แบบแมนนวล

`check:codeql-ratchet` อ่าน** สถานะ repo รีเฟรชตามกำหนดเวลา — ไม่ใช่ต่อ PR** `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` รายงาน `state: configured`, `schedule: weekly`: การสแกนการตั้งค่าเริ่มต้นของ GitHub ไม่ใช่การวิเคราะห์แบบพุช ผลที่ตามมา: หลังจาก PR ที่ FIXES แจ้งเตือนรวมเข้าด้วยกัน วงล้อจะอ่านค่าเก่าและจำนวนที่สูงกว่าจนกว่าการสแกนตามกำหนดเวลาครั้งถัดไปจะรัน — ดังนั้นจึงรายงานการถดถอยในทุก ๆ ที่เปิด PR รวมถึงการติดตามผลของ PR ที่แก้ไข จนกว่าการสแกนจะตามทัน

**รีเฟรชด้วยตนเอง** : `gh workflow run codeql.yml --ref release/vX.Y.Z` รันการวิเคราะห์อีกครั้งและเผยแพร่การแจ้งเตือนอีกครั้งภายในไม่กี่นาที อ่าน `.github/workflows/codeql.yml` ก่อน — ส่วนหัวอธิบายว่ามันคือ `workflow_dispatch` -only** เพราะมันขัดแย้งกับ "การตั้งค่าเริ่มต้น" ของ GitHub** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`) การกู้คืนทริกเกอร์ `push`/`pull_request`/ `schedule` ต้องใช้** การกระทำของเจ้าของก่อน** : การตั้งค่า ความปลอดภัยรหัส → → CodeQL: ค่าเริ่มต้น → ขั้นสูง อย่าเพิ่มทริกเกอร์ `schedule:` โดยไม่มีสวิตช์นั้น — เพราะจะทำให้การรันล้มเหลวเท่านั้น

**กระชับเส้นฐานหลังจากที่นับลดลง** — `node scripts/check/check-codeql-ratchet.mjs --update` เขียนจำนวนที่วัดใหม่ลงใน `quality-baseline.json` → `metrics.codeqlAlerts.value` ดังนั้นวงล้อไม่อนุญาตให้มีการถดถอยกลับขึ้นไปบนเพดานเก่า ตัวอย่างการทำงาน (2026-09-02/03): PR #12502 แก้ไขการแจ้งเตือนจริง 7 รายการ (13 → 6 วัดเปิด); PR #12530 ทำให้เส้นฐานแช่แข็ง 11 → 6 กระชับขึ้นเพื่อให้ตรงกัน จากนั้นส่วนที่เหลืออีก 6 คนก็ถูกไล่ออกโดยมีเหตุผลต่อการแจ้งเตือนเหลือ 0 เปิด

**การเลิกจ้างเป็นการเรียกร้องของผู้ปฏิบัติงาน (Hard Rule #14)** — ไม่เคยละทิ้งการแจ้งเตือน CodeQL โดยไม่บันทึกเหตุผลทางเทคนิคไว้ในความคิดเห็นในการเลิกจ้าง: `won't fix` สำหรับข้อกำหนดโปรโตคอลอัปสตรีม, `used in tests` สำหรับฟิกซ์เจอร์ทดสอบ, `false positive` สำหรับน้ำยาฆ่าเชื้อ CodeQL ไม่สามารถมองเห็นได้ (แบบอย่าง: `docs/security/ERROR_SANITIZATION.md`)

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

## ไฟล์ที่สร้างขึ้นและพื้นฐานที่ได้รับ (เขียนเมื่อเผยแพร่)

แผน 13-11-2569 ("ตัวเลขและข้อความที่ได้รับได้รับการแก้ไขเมื่อเผยแพร่เท่านั้น"): คุณลักษณะ PR เปลี่ยนแปลง** แหล่งที่มา** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, แค็ตตาล็อกทักษะ, แค็ตตาล็อกระดับฟรี, ข้อมูลจำเพาะ e2e ใหม่ จะไม่สร้างไฟล์ที่คำนวณจากแหล่งนั้นขึ้นมาใหม่ และไม่ได้รวมการปรับปรุงที่วัดได้ไว้เป็นค่าพื้นฐาน ไฟล์เหล่านั้นจะถูกเขียนใหม่หนึ่งครั้งโดยการรีเฟรช release (`release:refresh-derived`) หรือโดยการรีเฟรชทุกคืน PR ก่อนหน้านี้ PR พี่น้องทุกคนมีสำเนาที่สร้างขึ้นใหม่ของตัวเองและขัดแย้งกับการผสานครั้งถัดไป (13/13/2569: 30 จาก 321 open PRs เขียนใหม่ `PROVIDER_REFERENCE.md`, 26–28 เขียนไดอะแกรม README )

**ยาม.** `check:pr-derived-paths` (งาน `pr-test-policy`) ล้มเหลวในฟีเจอร์ PR ที่แตะไฟล์ของตระกูลใน `config/quality/derived-paths/`:

| ตระกูล      | ไฟล์                                                                                                                                                                     | เขียนใหม่โดย                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; สิบสองสร้าง README SVGs; `skills/*/references/**`; ไฟล์ `SKILL.md` ที่ไม่มีบล็อกแบบกำหนดเอง | `release:refresh-derived` (ข้อเท็จจริง), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                        | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                           |

นักเขียน (`release/v*`, `chore/derived-*` และ `chore/bank-ratchet-*` สำหรับ baselines) ได้รับการยกเว้น PR จึงเป็นเช่นนี้ที่เปลี่ยนแปลงเพียงตระกูลเดียวบวกกับสหายของมัน (สำหรับ `generated`: สคริปต์ตัวสร้าง, การทดสอบ, อินพุตทักษะตัวแทน — `src/shared/constants/agentSkills.ts`, เอกสาร `skills/**` ที่เขียนด้วยมือ, `docs/openapi.yaml` — และ `changelog.d/**`) เช่น การเปลี่ยนแปลงโครงร่างฮีโร่ด้วย SVG ที่สร้างใหม่ หรือการแก้ไขทักษะที่การทดสอบอ่านไฟล์ `SKILL.md` ที่สร้างใหม่ `SKILL.md` ที่มีบล็อก `<!-- skill:custom-start -->` ที่เขียนด้วยลายมือไม่อยู่ในกลุ่ม: บล็อกที่กำหนดเองจะสามารถแก้ไขได้ถัดจากคุณลักษณะ

**การตรวจสอบต่อโหมดเกต** (`scripts/check/lib/gateMode.mjs`; ผู้ช่วย `scripts/check/lib/derivedArtifactScope.mjs`):

| ตรวจสอบ                                                                            | `release` (พุช กำหนดเวลา ปล่อย PR ท้องถิ่น)                           | `pr` (ฟีเจอร์ PR, แบตช์คิว)                                                                                                                                                                           |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                          | ทุกทักษะจะต้องเท่ากับเอาท์พุตของตัวสร้าง                              | เฉพาะทักษะที่มีข้อความที่สร้างขึ้น (นอกบล็อกแบบกำหนดเอง) หรือการแก้ไข `references/` PR มิฉะนั้น `SKIP reason=pr-mode`                                                                                 |
| `check:generated-artifacts` (README SVGs + e2e การกำหนดเวลา ต้องการประวัติแบบเต็ม) | ทุก SVG เท่ากับตัวกำเนิดของมัน ข้อมูลจำเพาะทุกรายการมีรายการกำหนดเวลา | เฉพาะสิ่งประดิษฐ์ที่แก้ไข PR ; ส่วนที่เหลือ `SKIP reason=pr-mode`; ไม่มีฐานที่แตกต่างกัน → ทุกสิ่งประดิษฐ์ที่ตัดสิน (ปิดไม่สำเร็จ)                                                                    |
| README SVG การทดสอบเปรียบเทียบไบต์ (`tests/unit/docs/readme-*-svg.test.ts`)        | ทุก ๆ SVG                                                             | เฉพาะ SVG ที่แก้ไข PR เมื่อฐานแก้ไข การชำระเงิน PR แบบตื้นของ `test-unit` ไม่มีฐาน ดังนั้นการทดสอบจึงข้ามด้วย `SKIP reason=base-unresolved` และ `check:generated-artifacts` เป็นเจ้าของการเปรียบเทียบ |
| ความสมบูรณ์ของการกำหนดเวลา e2e (`tests/unit/balance-e2e-shards.test.ts`)           | ทุกสเปกมีรายการ                                                       | กฎเดียวกันกับการทดสอบ SVG (สเป็คใหม่ทำงานโดยมีน้ำหนักเฉลี่ย)                                                                                                                                          |
| `check-quality-ratchet.mjs --require-tighten`                                      | การปรับปรุงแบบ un-banked ล้มเหลว (ยกเว้น `_policy`)                   | รายงานการปรับปรุง ไม่เคยล้มเหลว การถดถอยยังคงล้มเหลว                                                                                                                                                  |

โหมดรีลีสจะเก็บคำตัดสิน รหัสทางออก และข้อความที่เช็คเหล่านี้มีก่อนการแยก เพิ่มได้สูงสุดหนึ่งบรรทัด โดยตั้งชื่อโหมดที่ได้รับการแก้ไข (`[agent-skills-sync] mode=release (auto: local run)`) การทดสอบข้ามผ่านตัวเลือก `{ skip: releaseOnlyUnlessTouched(...) }` ของ node:test ซึ่ง `check:test-masking` แสดงรายการในบล็อกแบบรายงานเท่านั้น (ไม่ใช่ทั้ง `.skip(` หรือ `{ skip: true }` ดังนั้นจึงไม่นับเป็นการข้ามแบบฮาร์ด) `check:generated-artifacts` ทำงานโดยที่ฐานสามารถแก้ไขได้: job `lint` (`fetch-depth: 0`) หลังจาก `check:agent-skills-sync` ในพื้นที่ `npm run check:generated-artifacts -- --mode=pr` แสดงให้เห็นว่าขั้นตอนใดตัดสินจาก PR การตรวจสอบข้ามผลรวมของผู้ให้บริการของ `check:docs-counts` ("ผลรวมการอ้างอิงของผู้ให้บริการ (doc เทียบกับโมดูลสด)") เป็นส่วนหนึ่งของเกตการนับและติดตามโหมดของเกตนั้นเอง

ไม่ได้อยู่ในครอบครัวโดยมีวัตถุประสงค์: ไฟล์นโยบายที่ตัดสินใจโดยผู้คน (`gate-manifest.json` รายการที่อนุญาต `admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`) และเพดานคุณลักษณะ PR อาจต้องแก้ไขพร้อมกับโค้ด (รายการเมตริก `quality-baseline.json`, พื้นฐาน typecheck/file-size/complexity, `eslint-suppressions.json` — ตัดโดยการดำเนินการล่วงหน้า ESLint ทำงานเมื่อ PR แก้ไขการละเมิดที่แช่แข็ง) `src/i18n/routeNamespaces.generated.json` ก็ถูกสร้างขึ้นเช่นกัน แต่ยังคงอยู่ในฟีเจอร์ PRs: แอปจะนำเข้ามัน ณ รันไทม์ ดังนั้นจึงไม่สามารถรอการรีเฟรชได้

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
2. **แก้ไขการละเมิด** — gate ส่วนใหญ่เป็นการตรวจสอบระบบไฟล์ที่กำหนดซึ่งจะผ่านทันทีที่โค้ดถูกต้อง
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
- **การตรวจจับวงจร** — ✅**DONE** (#15159 G-01/G-02) ข้อความเก่าที่นี่เรียกว่า `check:cycles` "ประตูสีเขียวที่ดูแลจัดการ" และให้เหตุผลในการบล็อกเนื่องจาก `check:circular-deps` (dpdm) รายงาน 91 รอบ สีเขียวนั้นคือก** สีเขียวเท็จ** : `check:cycles` สแกน 5 ไดเรกทอรีย่อย (450 ไฟล์) จับคู่เฉพาะ `import|export … from` แบบคงที่ และทิ้งตัวระบุ `@/` และ `@omniroute/open-sse/` ทุกตัว ดังนั้นจึงไม่เห็นวงจรนามแฝง + นำเข้าแบบไดนามิกที่ครอบงำ repo แก้ไขแล้ว: ตอนนี้เกตเดิน `src` + `open-sse` (ไฟล์ 5023) รวบรวมตัวระบุจาก TypeScript AST (ดังนั้น `import("…")` นับและ `typeof import("…")` ตำแหน่งประเภทไม่) และแก้ไข tsconfig `paths` มันพบ** 14** รอบ ไม่ใช่ 0 เนื่องจาก 14 รอบที่มีอยู่แล้วไม่สามารถแก้ไขได้ในเกต PR ตอนนี้ `check:cycles` จึงเป็น** วงล้อ** (`--ratchet`, เพดาน `metrics.cycles.value = 14` ใน `quality-baseline.json`, `direction: down`) — จะบล็อก _regression_ ใด ๆ และการนับสามารถลดลงเท่านั้น CI วิ่ง `npm run check:cycles:ratchet` ขี่เบิร์นดาวน์ด้วย**A-01** . `check:circular-deps` (dpdm) ยังคงเป็นคำแนะนำในฐานะความคิดเห็นที่สองที่กว้างขึ้น
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

- ห่วงโซ่อุปทาน (แหล่งที่มา, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — พาริตี้เกตชุดคีย์

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, งาน `i18n-ui-coverage`) เปรียบเทียบชุดคีย์ลีฟของทุก `src/i18n/messages/<locale>.json` กับ `en.json` และล้มเหลวกับลีฟที่ขาดหายไปหรือลีฟพิเศษ ไม่ว่าคีย์จะถูกเพิ่มเมื่อใด ตัวยึดตำแหน่ง `__MISSING__:` นับเป็นปัจจุบัน (เนื้อหาคือธุรกิจของประตูอัตราส่วน) มันเป็นส่วนเสริมที่สมบูรณ์ของประตู diff-based/percentage ทั้งสอง: `check-ui-keys-coverage` บังคับใช้พื้น 80 % ต่อสถานที่ (คีย์ที่หายไป 43 รายการจาก ~ 13,000 ยังคงอ่านได้ 99.7 %) และ `check-new-key-coverage` ตัดสินเฉพาะคีย์ที่ PR เพิ่มใน `en.json` ชุดสถานที่ถูกสร้างขึ้นจาก `en.json` ของวันที่สาขาถูกตัดและแปลเป็นเวลาวันในขณะที่ฐานยังคงเพิ่มคีย์ แบทช์ PR ไม่ได้เพิ่มคีย์เอง ดังนั้นพี่น้องทั้งสองจึงเงียบเมื่อแบทช์ 1 (#13044) ลงคีย์ 43 คีย์สั้นในเก้าโลแคลและแบทช์ 2 (#13660) 10 คีย์สั้นในแปด (2026-09-15) แก้ไขสีแดงด้วย `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` leaf หมายความว่าแหล่งที่มาทิ้งมัน — `sync-ui-keys` ทิ้งมัน (`--prune-extra` เป็นค่าเริ่มต้น) `--warn` รายงานโดยไม่ล้มเหลว `--catalog=cli` รันการเปรียบเทียบแบบเดียวกันกับ `bin/cli/locales` (`npm run i18n:check-keys:cli`); ทั้งสองขั้นตอนอยู่ใน job `i18n-ui-coverage` การตรวจสอบแบบสัมบูรณ์คือโหมดรีลีสเท่านั้น: คุณลักษณะ PR เห็น `SKIP reason=pr-mode` และการแก้ไขรันในการรีเฟรชรีลีสหรือเวฟการแปล ไม่เคยอยู่ในคุณลักษณะ PR; PR ที่เปลี่ยนแคตตาล็อกสถานที่ให้แต่ละแห่งตัดสินโดยเทียบกับฐานผสานแทน (ดู "สองโหมด" ใต้ job `i18n-ui-coverage`)

#### `check-new-key-coverage` — เกต i18n คีย์ใหม่

พี่น้องของ `check-ui-value-drift`. อันนั้นจับค่าภาษาอังกฤษได้นั่นเอง** เขียนใหม่** ขณะที่คำแปลถูกทิ้งไว้ข้างหลัง อันนี้จับคีย์ภาษาอังกฤษนั่นคือ** เพิ่ม** ในขณะที่บางพื้นที่ไม่เคยได้รับมัน

`check-ui-keys-coverage` ไม่เห็นคลาสนี้: บังคับใช้เปอร์เซ็นต์ขั้นต่ำต่อโลแคล และคีย์ที่หายไปสิบเอ็ดคีย์จาก ~ 13,000 ออกจากความครอบคลุมที่ 99.9% เปอร์เซ็นต์ต่อภาษาไม่สามารถแสดง "คุณลักษณะนี้จัดส่งโดยไม่ได้แปล" — คุณลักษณะทั้งหมดสามารถเข้าสู่ตำแหน่งใหม่โดยไม่มีข้อความและไม่ต้องย้ายหมายเลข

เหตุการณ์ที่มีการเข้ารหัส: ระยะที่ 3 ของ Orchestration Canvas แปลคีย์ทั้ง 11 คีย์ใน 42 ตำแหน่งที่มีอยู่ในขณะนั้น ชั่วโมงต่อมากลุ่มภาษาสหภาพยุโรป (#13044) ได้นำ repo ไปที่ 51 สถานที่ และผู้มาใหม่เก้าคน (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ไม่เคยได้รับพวกเขา `deepMergeFallback` แทนที่ภาษาอังกฤษสำหรับคีย์ที่ขาดไป ดังนั้นโหมดความล้มเหลวจึงไม่ได้แปล UI แทนที่จะเป็น UI — ที่ว่างเปล่าจริง และเงียบกริบจากการสร้าง

เหมือนเป็นพี่น้องกันเลย** ต่างตระหนักดี** โดยเปรียบเทียบภาษาอังกฤษที่ฐานผสานกับแผนผังการทำงาน ดังนั้นช่องว่างที่มีอยู่แล้วจึงถูกแช่แข็งไว้ และไม่จำเป็นต้องมีการโยกย้ายเพื่อเปิดประตู

**เครื่องหมาย `__MISSING__:<english>` ไม่เป็นไปตามนั้น (ตั้งแต่ 17-09-2569)** มันเคยเป็นเอกสารการเลื่อนเวลา — รันไทม์กลับมาเพื่อแก้ไขภาษาอังกฤษ — จนกระทั่งแปดฟีเจอร์ PRs ในวันที่ 2026-09-16 ได้เพิ่ม 61 คีย์และประทับเครื่องหมายลงในสถานที่ทั้งหมด 65 แห่งแทนที่จะแปล: เกตนี้ยอมรับทุกอัน ไม่มีอะไรปิดกั้น PRs และเกตอัตราส่วนการแปลจริงที่บล็อกนั้นล้มเหลวในเคล็ดลับการเปิดตัวสำหรับทุกคน (pt-BR 3.2 % > 2.5 % + 0.5) ขณะนี้เครื่องหมายถูกตัดสินว่าเป็นคำแปลที่ขาดไป โหมด Release เฉพาะตั้งแต่วันที่ 13-11-2569 เท่านั้น: คุณลักษณะ PR เห็น `SKIP reason=pr-mode` และในการเปิดตัว PR (`BASE_REF=origin/main`) ประตูจะตัดสินทุกคีย์ที่รอบเพิ่ม แก้ไขสีแดงในการรีเฟรชรีลีสหรือคลื่นการแปลด้วย `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` หรือสถานที่ทั้งหมดขนานกับ `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, ปฏิเสธที่จะเริ่มต้นโดยไม่มี `OMNIROUTE_TRANSLATION_*` env) คีย์ที่ต้องยังคงเป็นภาษาอังกฤษ (ชื่อ product/engine/flag ที่ปักหมุดไว้) จะอยู่ใน `scripts/i18n/untranslatable-keys.json` โดยไม่เคยอยู่หลังเครื่องหมาย `vi` แบนเครื่องหมายทันที (`tests/unit/i18n-vi-completeness.test.ts`)

#### `check-vitest-exclusions` — ประตูทดสอบที่จอดอยู่

ไฟล์ในรายการ `exclude` ของ `vitest.config.ts` เป็นการทดสอบที่ไม่ได้ทำงาน และดูเหมือนว่าจะครอบคลุมถึงใครก็ตามที่อ่านแผนผัง `// #8618 — pre-existing failure; remove this exclusion when fixed` มีไฟล์หกสิบสองไฟล์สะสมอยู่ด้านหลังความคิดเห็น ปัญหา #8618 ถูกปิดในวันที่ 11-08-2569 ในขณะที่รายการที่ติดตามเพิ่มขึ้นจาก 45 รายการเป็น 62 รายการ โดยรายการใหม่แต่ละรายการสืบทอดความคิดเห็นที่ชี้ไปที่ปัญหาที่ตายแล้ว ในที่สุดเมื่อรายการถูกวัดทีละไฟล์ (#13204)** 51 จาก 62 รายการส่งผ่านไปยังแผนผังปัจจุบันโดยไม่มีการเปลี่ยนแปลงแหล่งที่มา** .

เกตต้องการการยกเว้นทุกรายการที่แก้ไขเป็นไฟล์จริงเพื่อ (ก) ตั้งชื่อปัญหาการติดตามและ (ข) ปรากฏใน `config/quality/vitest-exclusions.json` พร้อมสถานะที่วัดได้ ดังนั้นการเพิ่มหนึ่งรายการจึงเป็นส่วนต่างที่ตรวจสอบได้ในไฟล์เฉพาะ แทนที่จะเป็นอีกหนึ่งบรรทัดในอาร์เรย์ 60 รายการ โดยจงใจไม่รันการทดสอบที่แยกออก — อีกครั้งซึ่งมีราคา ~ 10 นาทีและอยู่ในงานเป็นระยะ บันทึกสินค้าคงคลังเมื่อมีการวัดครั้งล่าสุด
