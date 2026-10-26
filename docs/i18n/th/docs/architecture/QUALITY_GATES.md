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

### การรับแคนดิเดต

เวิร์กโฟลว์ CI และ Quality Gates ต่างให้ผลตัดสินที่คงที่ ได้แก่ `Gate / CI` และ
`Gate / Quality` นโยบายการรับแบบมีเวอร์ชันของเวิร์กโฟลว์เหล่านี้ระบุงานต้นทางทุกงาน
ว่าเป็นงานบังคับหรืองานให้คำแนะนำ งานบังคับที่เกี่ยวข้องต้องสำเร็จ โดยผลลัพธ์ที่หายไป
ถูกยกเลิก ถูกข้าม อยู่ระหว่างดำเนินการ หรือไม่ทราบสถานะ ไม่สามารถใช้ยืนยัน PASS ได้
การจัดประเภทเป็น docs-only หรือ catalog-only ที่ถูกต้องอาจทำให้เลนโค้ดไม่เกี่ยวข้อง
แต่ draft PR ไม่ถือเป็นแคนดิเดตที่ยอมรับได้ ป้ายกำกับ `hotfix` ไม่ได้ยกเว้นข้อกำหนดด้านหลักฐาน

เวิร์กโฟลว์ทั้งสองครอบคลุม PR ที่มุ่งเข้า main/release branch, การ push ไปยัง `main`, manual dispatch
และเหตุการณ์ merge-group การ push, dispatch และ merge-group จะเรียกใช้ชุดการตรวจสอบทั้งหมด การ push ไปยัง
`release/**` จะไม่เริ่มเวิร์กโฟลว์เหล่านี้ (2026-10-18): การเปลี่ยนแปลงแต่ละรายการได้เรียกใช้เมทริกซ์ใน PR ของตนแล้ว
และการตรวจสอบชุดการเปลี่ยนแปลงที่ merge แล้วเป็นหน้าที่ของ Release-Green (`docs/ops/RUNNER_BOX.md` → เลน Hosted) ส่วน fork
และ merge group จะใช้ hosted runner สำหรับงานที่ปกติเลือก self-hosted
runner โดยต้องตรวจสอบว่ามีความจุของ hosted runner เพียงพอก่อน rollout

ใบรับรอง JSON แต่ละรายการระบุ SHA ที่ checkout, workflow run และ attempt
CLI จะปฏิเสธกรณี SHA ของ checkout/event ไม่ตรงกัน การทดสอบเวิร์กโฟลว์จะผูกสมาชิกของนโยบาย
เข้ากับรายการ `needs` ของงานตัดสินผล เพื่อไม่ให้เลนที่เพิ่มใหม่หรือถูกนำออกหายไปโดยไม่มีการแจ้งเตือน
ใบรับรองครอบคลุมเฉพาะเวิร์กโฟลว์ของตนเอง ไม่ครอบคลุมการเผยแพร่ การ deploy หรือการทำงานภายใน
ของ advisory scanner ที่มีอยู่ การเปิดใช้งานชื่อ check ทั้งสองในกฎของ branch
เป็นการเปลี่ยนแปลงด้านการดูแลระบบที่ต้องทำแยกต่างหาก การเพิ่มงานเหล่านี้ไม่ได้ทำให้ branch ได้รับการป้องกันโดยอัตโนมัติ

### รายการการสแกนแบบสแตติก

รายการ npm alias แบบมีเวอร์ชันและสมาชิกของการสแกนแบบสแตติกอยู่ใน
`config/quality/gate-manifest.json` เรียกใช้ `npm run check:gate-manifest` เพื่อตรวจสอบ
ชื่อสคริปต์และคำสั่งแบบตรงกันทุกประการเทียบกับ `package.json` การเพิ่ม การนำออก และ
การเปลี่ยนแปลงของคำสั่งจะทำให้ทั้ง local hook และงานจัดประเภทการเปลี่ยนแปลงใน CI ล้มเหลว
alias ไม่ใช่งานของเวิร์กโฟลว์ อินสแตนซ์ของเมทริกซ์ หรือ test case ดังนั้นจึงต้องไม่แสดง
จำนวนเหล่านี้เสมือนว่าสามารถใช้แทนกันได้

ใช้ `npm run quality:scan -- --list` หรือ `npm run quality:scan:fast -- --list`
เพื่อตรวจสอบ alias ที่เลือกโดยไม่ดำเนินการจริง runner จะเรียกใช้
npm entrypoint ดังนั้น runtime ของ entrypoint ดังกล่าว (รวมถึง Bun ในตำแหน่งที่กำหนดค่าไว้) จึงยังคงเดิม
manifest จะบันทึก alias ที่อยู่นอกโปรไฟล์เหล่านั้นว่าเป็นรายการที่ถูกเรียกใช้แยกต่างหาก และ
ห้ามใช้คำสั่งบำรุงรักษาในโปรไฟล์การสแกนแบบอ่านอย่างเดียว

โปรไฟล์เหล่านี้ครอบคลุมเฉพาะการสแกนแบบสแตติกเท่านั้น ไม่ได้รับรองการทดสอบผลิตภัณฑ์
coverage, packaging, การตรวจสอบจากภายนอก หรือการยอมรับสำหรับ release ทั้งหมดของแคนดิเดต
การรับเข้าเวิร์กโฟลว์ใช้ `config/quality/admission-policy.json` ที่เชื่อมโยงไว้และ
`scripts/quality/admission-verdict.mjs` โปรไฟล์ release-observer ยังคงแยกต่างหาก
ให้ตรวจสอบ check และใบรับรองที่เกี่ยวข้องของโปรไฟล์เหล่านั้นโดยอิสระ รายการแบบข้อความ
ด้านล่างใช้สำหรับอ้างอิง ไม่ใช่หลักฐานว่าเกตได้ทำงานจริง

สคริปต์อยู่ภายใต้ `scripts/check/` (เกตตามนโยบาย) และ `scripts/quality/` (กลไก ratchet)
แหล่งข้อมูลจริงของ CI คือ `.github/workflows/ci.yml`

### Fast-path สำหรับ Release PR (`quality.yml`)

`.github/workflows/quality.yml` ทำงานเสริม CI สำหรับ main/release PR, การ push ไปยัง `main`,
dispatch และ merge group โดย PR จะใช้การตรวจสอบแบบรวดเร็วที่กรองตาม path
ส่วน build ที่ซ้ำซ้อนและถูกปิดใช้งานถาวรได้ถูกนำออกแล้ว ขณะที่การตรวจสอบ build/package/boot จริงยังคงอยู่ใน CI

| งาน                                              | ขอบเขต                                                                                                                                                                                                           | การบล็อก        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | PR ด้านเอกสาร/โค้ด; การอ้างอิงเอกสาร API และ docs-all                                                                                                                                                            | ใช่             |
| `Fast Quality Gates`                             | PR ด้านโค้ด; การตรวจสอบแบบสแตติก, typecheck, dashboard typecheck และ unit test ที่ได้รับผลกระทบ                                                                                                                  | ใช่             |
| `Forgotten sibling tests`                        | PR ด้านโค้ด; ติดตามโมดูลที่เปลี่ยนแปลงไปยัง static consumer และ sibling test ที่อาจเกี่ยวข้อง; เส้นทาง barrel และ dynamic-import จะถูกรายงานเป็นการวินิจฉัยเชิงคำแนะนำ พร้อมข้อยกเว้นจาก allowlist ที่อ้างอิงไว้ | **คำแนะนำ**     |
| `Vitest (fast-path)`                             | PR ด้านโค้ด; ชุดทดสอบ vitest แบบรวดเร็ว                                                                                                                                                                          | ใช่             |
| `Unit Tests fast-path`                           | PR ด้านโค้ด; ชุด unit test แบบ 4 shard                                                                                                                                                                           | ใช่             |
| `No new ESLint warnings`                         | PR ด้านโค้ด; ตัวป้องกัน lint ที่รับรู้ suppression                                                                                                                                                               | ใช่ รวมถึง fork |
| `Merge integrity (changelog + generated skills)` | PR ที่ไม่ใช่ draft; การซิงค์ changelog และ skill ที่สร้างขึ้น                                                                                                                                                    | ใช่ รวมถึง fork |

#### รายงาน Forgotten sibling tests

`npm run check:forgotten-sibling-tests` นำตัวแก้ไขพาธการนำเข้าที่อยู่เบื้องหลังแผนผังผลกระทบต่อการทดสอบมาใช้ซ้ำ
สำหรับโมดูลที่ใช้งานจริงทุกโมดูลที่มีการเปลี่ยนแปลง ระบบจะรายงานสายโซ่แบบกำหนดผลลัพธ์ได้
`changed module/symbol -> static consumer -> candidate sibling test` เมื่อการทดสอบที่เป็นตัวเลือก
ไม่อยู่ใน diff ของ pull request ข้อมูลสรุป Markdown และผลลัพธ์ JSON จะถูกเก็บไว้เป็นอาร์ติแฟกต์
`forgotten-sibling-tests` ของเวิร์กโฟลว์ เพื่อใช้ปรับเทียบก่อนเริ่มบังคับใช้เพื่อบล็อกการผสานโค้ด

การส่งออกซ้ำผ่าน barrel และการนำเข้าแบบไดนามิกใช้เพื่อการวินิจฉัยการแก้ไขพาธเท่านั้น และจะไม่สร้าง
ผลการตรวจพบที่บล็อกการผสานโค้ด ข้อยกเว้นที่ผ่านการตรวจสอบแล้วอยู่ใน
`config/quality/forgotten-sibling-allowlist.json` แต่ละรายการต้องระบุ consumer และการทดสอบที่เป็นตัวเลือก
ให้เหตุผลที่เฉพาะเจาะจง และเชื่อมโยงไปยัง issue หรือ pull request บน GitHub รายการที่มีรูปแบบไม่ถูกต้องจะ
ทำให้การตรวจสอบล้มเหลวตามค่าเริ่มต้น ข้อยกเว้นไม่สามารถระงับกรณีที่การทดสอบที่เป็นตัวเลือกถูกลบ หรือ diff ที่เพิ่ม `.skip`/`.todo`;
การลดความเข้มงวดของ assertion และการปกปิดรูปแบบอื่น ๆ ยังคงอยู่ภายใต้เกต
`check:test-masking` ซึ่งบล็อกการผสานโค้ดโดยอิสระ

### งาน: `lint`

ทำงานกับทุก PR ที่ส่งไปยัง `main` และบล็อกการผสานโค้ดเมื่อทำงานล้มเหลว

| สคริปต์ (`npm run ...`)           | ตรวจสอบความถูกต้อง                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | มีผลบล็อก                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | เวอร์ชัน Node.js อยู่ภายในช่วงที่รองรับ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                       |
| `check:cycles`                    | การ import แบบวนซ้ำทั่วทั้ง `src/` + `open-sse/` (อิง AST และ resolve `paths` ของ tsconfig แล้ว) การเรียกใช้แบบเปล่าจะออกด้วยรหัส 1 เมื่อมีวงจรใด ๆ (ปิดกั้นไว้ก่อนเมื่อเกิดข้อผิดพลาดตั้งแต่ #15281) และแสดงรายการ SCC `check:cycles:ratchet` (คำสั่งที่ CI เรียกใช้) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.cycles` ใน `quality-baseline.json` — ปัจจุบันคือ 14, `direction: down` ดังนั้นจึงลดลงได้เท่านั้น (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่ (ratchet)                             |
| `check:boundary`                  | การเชื่อมโยง `open-sse → src`: การ import แบบไฟล์ต่อไฟล์ที่ไม่ซ้ำกันจากเอนจินเข้าสู่แอป (`scripts/quality/measure-boundary.mjs`; รายการ edge คือรายการงานค้างสำหรับการแก้ไขโครงสร้าง core/module-split ของ v4) แบบเปล่า = รายงานคำแนะนำ (เหมือนกับ `quality:boundary`) `check:boundary:ratchet` (คำสั่งที่ CI เรียกใช้ และอยู่ในลูป ratchet ของ fast-gates ใน `quality.yml` ด้วย) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.boundaryOpenSseToSrc` ใน `quality-baseline.json` — ตั้งค่าเริ่มต้นไว้ที่ค่าที่วัดได้คือ 771, `direction: down`; `--update` จะลดค่าได้เท่านั้น; เปรียบเทียบกับฐานบน PR (`--base-ref` ดูด้านล่าง)                                                                                                                                                                                                                                                                                                              | ใช่ (ratchet)                             |
| `check:route-validation:t06`      | มีสคีมา Zod อยู่ในทุก route (นโยบาย Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ใช่                                       |
| `check:any-budget:t11`            | จำนวน `@ts-expect-error // any` ไม่เกินงบประมาณ (catraca ระดับ 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                       |
| `check:provider-consistency`      | ผู้ให้บริการทุกรายใน `providers.ts` มีรายการที่ตรงกันใน `providerRegistry.ts` (และในทางกลับกัน ภายในรายการที่อนุญาต)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `check:model-lifecycle`           | ตารางกำหนดเส้นทางสามตารางที่ดูแลด้วยตนเองยังคงสอดคล้องกับสแนปช็อตวงจรชีวิตที่เช็กอินไว้ (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ไม่ให้คะแนน ID ที่เลิกใช้งานแล้วซึ่ง `REGISTRY` ยังสามารถกำหนดเส้นทางได้; เป้าหมายของ `BUILT_IN_ALIASES` ทุกรายการอยู่ใน `REGISTRY` และไม่อยู่ในสแนปช็อต ID ที่เลิกใช้งานแล้ว; ID ที่เลิกใช้งานแล้วทุกรายการซึ่งยังอยู่ใน `REGISTRY` จะถูกส่งต่อหรือแสดงอยู่ใน `allowedRetiredInCatalog`; และไม่มีต้นทางหรือปลายทางของ `DEFAULT_DEGRADATION_MAP` รายการใดปรากฏว่าเลิกใช้งานแล้วในสแนปช็อตดังกล่าว การตรวจสอบนี้ไม่ได้พิสูจน์ว่าโมเดลกำลังได้รับการให้บริการโดยต้นทางที่ใช้งานอยู่จริงในขณะนี้ ทำงานแบบออฟไลน์ — เปรียบเทียบกับ `config/quality/model-lifecycle.json` ซึ่งรีเฟรชด้วยตนเองโดยใช้ `npm run quality:refresh-model-lifecycle` (ใช้เครือข่าย; ไม่ได้เชื่อมเข้ากับ CI) `allowedRetiredInCatalog` เป็นกลไกควบคุมเพื่อลดจำนวนลง: เพิ่มรายการได้เฉพาะเมื่อมีประเด็นสำหรับติดตามเท่านั้น | ใช่                                       |
| `check:fetch-targets`             | `fetch("/api/...")` ทุกรายการใน `src/` ฝั่งไคลเอนต์ชี้ไปยัง `route.ts` ที่มีอยู่จริง                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `check:deps`                      | การขึ้นต่อกันทั้งหมดที่สามารถติดตั้งด้วย `npm install` จาก `package.json` ทุกไฟล์ในที่เก็บโค้ดอยู่ใน `dependency-allowlist.json`; แพ็กเกจใหม่ที่ไม่ได้ตรึงเวอร์ชันหรือมีชื่อเลียนแบบแบบ slopsquatting จะถูกทำเครื่องหมาย                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ใช่                                       |
| `audit:deps`                      | `npm audit` (รูท + Electron) — ไม่มีคำแนะนำด้านความปลอดภัยระดับสูง/วิกฤต (ซ้ำซ้อนกับ OSV `check:vuln-ratchet`; ดูรายการงานค้างด้านการปรับให้สมเหตุสมผล)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                       |
| `check:lockfile`                  | ความสมบูรณ์ของ `package-lock.json` — รีจิสทรี https, แฮชตรวจสอบความสมบูรณ์, ไม่มีการเขียนทับโฮสต์                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่                                       |
| `check:licenses`                  | รายการอนุญาตไลเซนส์ SPDX สำหรับ dependencies ที่ใช้ใน production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ใช่                                       |
| `check:tracked-artifacts`         | ไม่มี build artifacts / symlink ของ `node_modules` ที่ถูก commit (ทำงานใน husky pre-commit ด้วย; pre-push ถูกกำหนดให้ทำงานแบบเบาโดยเจตนา — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่                                       |
| `check:ai-attribution`            | ไม่มี trailer `Co-Authored-By` ของ AI/bot หรือ footer ที่ระบุการสร้างโดย AI ใน commit, ชื่อ หรือเนื้อหาของ PR — กฎเคร่งครัดข้อที่ 16 (อยู่ในลูป fast-gates ของ `quality.yml` สำหรับ PR→`release/**` — อ่าน event payload, ไม่ดำเนินการใด ๆ หากไม่ใช่ PR — และเป็นขั้นตอนเฉพาะ PR ใน lint ของ `ci.yml` สำหรับ PR→`main`; รวมถึง hook `commit-msg` ของ husky; อนุญาตผู้เขียนร่วมที่เป็นมนุษย์; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | ข้อยกเว้น Vitest ทุกรายการต้องระบุ issue สำหรับติดตามและปรากฏอยู่ใน `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `check:file-size`                 | ไฟล์ source (`.ts`/`.tsx` ใน `src/`, `open-sse/`, `electron/`, `bin/`) ต้องมีขนาดไม่เกิน `cap` และไฟล์ทดสอบ (`*.test.ts(x)`) ต้องไม่เกิน `testCap`; ไฟล์ที่ถูกตรึงไว้ใน `file-size-baseline.json` (`frozen` / `testFrozen`) ต้องไม่เพิ่มขนาดเกินค่าที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                       |
| `check:error-helper`              | การตอบกลับข้อผิดพลาดใน executors/handlers ใช้ `buildErrorBody()` / `sanitizeErrorMessage()` (กฎบังคับ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ใช่                                       |
| `check:migration-numbering`       | ไฟล์ Migration SQL มีหมายเลขเรียงตามลำดับ โดยไม่มีหมายเลขขาดหายหรือซ้ำกัน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ใช่                                       |
| `check:public-creds`              | ไม่มีค่า OAuth `client_id`/`client_secret` หรือคีย์ Firebase Web แบบค่าคงที่นอก `publicCreds.ts` (กฎบังคับ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                       |
| `check:db-rules`                  | ไม่มี SQL ดิบภายนอกโมดูล `src/lib/db/`; ไม่มีการนำเข้าแบบ barrel จาก `localDb.ts` (กฎบังคับ #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                       |
| `check:known-symbols`             | Provider executors, กลยุทธ์การกำหนดเส้นทาง และ translators ที่ลงทะเบียนในตาราง dispatch ตรงกับไฟล์บนดิสก์ — ไม่มีสัญลักษณ์ที่ไม่มีไฟล์รองรับหรือไม่ได้ประกาศ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                       |
| `check:route-guard-membership`    | ทุก route ที่สร้าง child process ได้รับการจัดประเภทโดย `isLocalOnlyPath()` (กฎบังคับ #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                       |
| `check:test-discovery`            | ทุกไฟล์ `*.test.ts` / `*.spec.ts` ใน repo ถูกเก็บรวบรวมโดย test runner อย่างน้อยหนึ่งตัว (กลไก ratchet: รายการไฟล์กำพร้าใน `test-discovery-baseline.json` ทำได้เพียงลดลงเท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่                                       |
| `check:test-tla-order`            | ไม่มีไฟล์ `node:test` ภายใต้ `tests/unit` ที่ลงทะเบียนการทดสอบ พบ `await` ที่ระดับบนสุด แล้วจึงลงทะเบียนการทดสอบเพิ่มเติม (#18045; กลไก ratchet: `test-tla-order-allowlist.json` ทำได้เพียงลดลงเท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ใช่                                       |
| `check:agent-skills-sync`         | อาร์ติแฟกต์ agent-skills ที่สร้างขึ้นตรงกับแค็ตตาล็อกต้นทาง (ไม่มีความคลาดเคลื่อน)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | โลโก้/แอสเซ็ตของผู้ให้บริการมีรายการบันทึกแหล่งที่มา                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | ไฟล์กำหนดค่า JSON สามารถแยกวิเคราะห์ได้และเป็นไปตามกฎ lint ของ repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | การคอมไพล์ TypeScript โดยไม่มีข้อผิดพลาด (มีเพียงคำเตือนเชิงแนะนำ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                       |
| `typecheck:noimplicit:core`       | `noImplicitAny` แบบเข้มงวด — มุ่งรองรับอนาคต; จุดเรียกใช้งานเดิมจำนวนมากยังคงต้องเพิ่มคำอธิบายประกอบชนิดข้อมูล                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **เชิงแนะนำ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ที่จำกัดขอบเขตไว้เฉพาะ `src/app/(dashboard)/**` (#7033) — รายการอนุญาตที่คัดสรรไว้ 27 ไฟล์ของ `typecheck:core` ไม่มี TSX ของแดชบอร์ดรวมอยู่เลย และ `next build` ก็ไม่เคยตรวจสอบประเภทให้ส่วนนี้เช่นกัน (`next.config.mjs` กำหนด `ignoreBuildErrors: true`) ดังนั้นรีเกรสชันจากตัวระบุที่ไม่มีการอ้างอิงในส่วนนั้น (#6625/#6909) จึงไม่ปรากฏให้ CI ตรวจพบ เปรียบเทียบความแตกต่างกับเส้นฐานแบบตรึงของจำนวนต่อไฟล์/ต่อรหัส TS (`config/quality/dashboard-typecheck-baseline.json` ซึ่งใช้รูปแบบการบังคับตรวจสอบข้อมูลเก่าเช่นเดียวกับ `check:known-symbols`) — เฉพาะข้อผิดพลาดใหม่ที่เกินจำนวนในเส้นฐานเท่านั้นที่จะทำให้เกตล้มเหลว ลดค่าเส้นฐานด้วย `--update` เมื่อแก้ไขข้อผิดพลาดที่มีอยู่เดิมแล้ว                                                                                                                                                                                                                           | ใช่                                       |

### งาน: `quality-gate`

ทำงานหลังจาก `test-coverage` และบล็อกการผสานเมื่อเกิดความล้มเหลว

| สคริปต์                      | ตรวจสอบความถูกต้อง                                                                                                                                                                                  | มีผลบล็อก                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | สร้าง `quality-metrics.json` (จำนวนคำเตือน ESLint และความครอบคลุมจากรายงานชาร์ดที่ผสานแล้ว)                                                                                                         | ใช่ (เป็นขั้นต้นทางของแรตเชต) |
| `quality:ratchet`            | เมตริกแต่ละรายการใน `quality-baseline.json` ต้องไม่ถดถอย (คำเตือน ESLint ≤ เส้นฐาน; ความครอบคลุม ≥ เส้นฐาน)                                                                                         | ใช่                           |
| `check:duplication`          | การทำซ้ำของโค้ด (jscpd@4) ต้องไม่เกินเส้นฐานใน `quality-baseline.json`                                                                                                                              | ใช่                           |
| `check:complexity`           | ความซับซ้อนเชิงวัฏจักรระดับไฟล์ต้องไม่เกินขีดจำกัด (`complexity` + `max-lines-per-function` ของ ESLint หลัก)                                                                                        | ใช่                           |
| `check:cognitive-complexity` | แรตเชตความซับซ้อนเชิงการรับรู้ (`eslint-plugin-sonarjs`) — ESLint ทำงานแยกต่างหาก; CI เรียกใช้ทั้งสองส่วนโดยรวมเป็นขั้นตอน `check:complexity-ratchets` ขั้นตอนเดียว                                 | ใช่                           |
| `check:dead-code`            | แรตเชตของไฟล์/การส่งออกที่ไม่ได้ใช้ (knip) ต้องไม่ถดถอยเมื่อเทียบกับเส้นฐาน                                                                                                                         | ใช่                           |
| `check:compression-budget`   | งบประมาณเบนช์มาร์กการบีบอัด — ค่าขั้นต่ำของการประหยัดโทเค็นต่อเอนจินต้องไม่ถดถอย                                                                                                                    | ใช่                           |
| `check:type-coverage`        | แรตเชตเปอร์เซ็นต์ที่มีการระบุประเภท (`type-coverage`) ต้องไม่ถดถอย; ครอบคลุมหน้าที่ส่วนใหญ่ของ `typecheck:noimplicit:core`                                                                          | ใช่                           |
| `check:codeql-ratchet`       | จำนวนการแจ้งเตือน CodeQL ที่เปิดอยู่ต้องไม่ถดถอย (อ่านผ่าน `gh api`; ข้ามอย่างไม่ก่อให้เกิดข้อผิดพลาดเมื่อไม่มีโทเค็น) — สำหรับรอบการรีเฟรชและการทริกเกอร์ด้วยตนเอง โปรดดู "แรตเชต CodeQL" ด้านล่าง | ใช่                           |

### งาน: `quality-extended`

งานทั้งหมดเป็นเพียงคำแนะนำ (`continue-on-error: true`) แรตเชตที่ใช้ npm จะทำงานจริง
ส่วนสแกนเนอร์ภายนอกจะติดตั้งผ่าน `gh release download` และข้ามการทำงานเอง (ออกด้วยรหัส 0)
เมื่อยังไม่มีไบนารี

| สคริปต์                  | ตรวจสอบความถูกต้อง                                                                                                                                                                                                         | มีผลบล็อก                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:circular-deps`    | ไม่มีการขึ้นต่อกันแบบวนรอบ (dpdm)                                                                                                                                                                                          | **คำแนะนำ**                                 |
| `check:bundle-size`      | ขนาดบันเดิลต้องไม่เกินขีดจำกัด                                                                                                                                                                                             | **คำแนะนำ**                                 |
| `check:secrets`          | การสแกนข้อมูลลับ (gitleaks) — ข้ามหากไม่มีไบนารี                                                                                                                                                                           | **คำแนะนำ**                                 |
| `check:vuln-ratchet`     | ช่องโหว่ของการขึ้นต่อกัน (osv-scanner) ต้องไม่ถดถอย — ข้ามหากไม่มีไบนารี                                                                                                                                                   | **คำแนะนำ**                                 |
| `check:workflows`        | การตรวจสอบเวิร์กโฟลว์ (actionlint + zizmor); สแกนเนอร์ที่ขาดหาย/เสียหาย รายงานที่ไม่ถูกต้อง หรือเส้นฐานแรตเชตที่ขาดหาย จะทำให้สถานะเป็น INCOMPLETE ผลการตรวจพบที่ถูกต้องจะเป็นไปตามนโยบายแบบเข้มงวด/คำแนะนำ/แรตเชตที่เลือก | ต้องดำเนินการ; แรตเชต zizmor มีผลบล็อกใน CI |
| `check:openapi-breaking` | การเปลี่ยนแปลงที่ทำให้สัญญา API สาธารณะ (`openapi.yaml`) ไม่เข้ากันเมื่อเทียบกับสาขาฐาน (oasdiff) — สร้าง `openapiBreaking=N`; ข้ามหากไม่มี oasdiff หรือไม่สามารถแก้ไขข้อมูลจำเพาะฐานได้                                   | **คำแนะนำ**                                 |

### งาน: `docs-sync-strict`

ทำงานกับทุก PR ที่ส่งไปยัง `main` และบล็อกการผสานเมื่อเกิดความล้มเหลว

| สคริปต์                        | สิ่งที่ตรวจสอบความถูกต้อง                                                                                                                                          | มีผลบล็อก                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `check:docs-all`               | เกตระดับเมตาที่เรียกใช้เกตย่อย 6 รายการด้านล่างตามลำดับ                                                                                                            | ใช่                         |
| ↳ `check:docs-sync`            | ความสอดคล้องของเวอร์ชันระหว่าง CHANGELOG / OpenAPI / llm.txt                                                                                                       | ใช่                         |
| ↳ `check:docs-counts`          | จำนวนที่ระบุในเนื้อหา (จำนวนผู้ให้บริการ จำนวนการย้ายข้อมูล เป็นต้น) อยู่ภายในช่วงแรตเชตของจำนวนจริง                                                               | ใช่                         |
| ↳ `check:env-doc-sync`         | ตัวแปรสภาพแวดล้อมทุกตัวใน `.env.example` มีการจัดทำเอกสารไว้ในตารางเอกสาร และในทางกลับกัน                                                                          | ใช่                         |
| ↳ `check:deprecated-versions`  | ไม่มีสตริงเวอร์ชันที่เลิกใช้งานแล้วในเอกสาร                                                                                                                        | ใช่                         |
| ↳ `check:doc-links`            | ลิงก์ markdown ภายในเอกสารชี้ไปยังไฟล์ที่มีอยู่จริง (รูปแบบ `[text]`/`(path)`)                                                                                     | ใช่                         |
| ↳ `check:fabricated-docs`      | เส้นทาง ตัวแปรสภาพแวดล้อม คำสั่ง CLI ชื่อ hook และพาธไฟล์ที่อ้างถึงในเอกสารมีอยู่จริงในฐานโค้ด เป็นเกตแบบเข้มงวดผ่าน `--strict`; ล้มเหลวแบบไม่บล็อกเมื่อไม่มีแฟล็ก | ใช่ (ผ่าน `--strict` ใน CI) |
| `check:cli-i18n`               | สตริงคำสั่ง CLI มีอยู่ในไฟล์ locale ของ i18n ทุกไฟล์                                                                                                               | ใช่                         |
| `check:openapi-coverage`       | ข้อกำหนด OpenAPI ครอบคลุมเส้นทางจริงอย่างน้อยตามค่าขั้นต่ำที่กำหนดด้วยแรตเชต                                                                                       | ใช่                         |
| `check:openapi-security-tiers` | คำอธิบายกำกับระดับความปลอดภัยใน `openapi.yaml` สอดคล้องกับการจัดประเภทใน `routeGuard.ts`                                                                           | **คำแนะนำ**                 |
| `check:openapi-routes`         | ทุกพาธใน `openapi.yaml` ชี้ไปยัง `route.ts` ที่มีอยู่จริง (ป้องกันข้อมูลที่แต่งขึ้น)                                                                               | ใช่                         |
| `check:docs-symbols`           | ทุกการอ้างอิง `/api/...` ใน `docs/**/*.md` ชี้ไปยัง `route.ts` ที่มีอยู่จริง (ป้องกันข้อมูลที่แต่งขึ้น)                                                            | ใช่                         |
| `i18n translation drift`       | คีย์ที่ยังไม่ได้แปลในไฟล์ locale ของ i18n — แสดงคำเตือนเท่านั้น                                                                                                    | **คำแนะนำ**                 |

### งาน: `i18n-ui-coverage`

| สคริปต์                               | สิ่งที่ตรวจสอบความถูกต้อง                                                                                                                                                                | มีผลบล็อก   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (แบบอินไลน์) | ความครอบคลุมของคีย์ i18n สำหรับ UI อยู่ที่ ≥ 65%                                                                                                                                         | ใช่         |
| `check-ui-value-drift` (แบบอินไลน์)   | **ค่า** ภาษาอังกฤษที่ถูกเขียนใหม่ต้องไม่เหลือคำแปลเก่าค้างอยู่                                                                                                                           | ใช่         |
| `check-new-key-coverage` (แบบอินไลน์) | คีย์ภาษาอังกฤษ **ใหม่** ต้องได้รับการแปลในทุก locale — ตัวทำเครื่องหมาย `__MISSING__:` จะถูกปฏิเสธ                                                                                       | ใช่         |
| `check-translation-ratio`             | อัตราส่วนคำแปลจริงต่อ locale (รายการที่เหมือนภาษาอังกฤษ / เป็นตัวยึดตำแหน่ง / ขาดหาย และอยู่นอกรายการที่อนุญาต) ต้องไม่เกิน `config/quality/i18n-translation-baseline.json` + ค่าผ่อนผัน | **คำแนะนำ** |

ต้องใช้ `fetch-depth: 0` — เกตตรวจจับความคลาดเคลื่อนของค่าจะเปรียบเทียบความแตกต่างของ `en.json` กับฐานการผสาน

#### `check-ui-value-drift` — เกตตรวจจับคำแปลเก่า

ตรวจจับการถดถอยของ i18n รูปแบบหนึ่งที่เกตอื่นไม่สามารถตรวจพบได้ในเชิงโครงสร้าง: เมื่อค่าภาษาอังกฤษ
ถูกเขียนใหม่ แต่คำแปลที่สร้างจากภาษาอังกฤษ _เวอร์ชันก่อนหน้า_ ยังคงอยู่ ทำให้
ผู้ใช้ที่ไม่ได้ใช้ภาษาอังกฤษยังคงอ่านข้อความที่เขียนอย่างมั่นใจแต่ปัจจุบันไม่ถูกต้อง

เหตุการณ์นี้เกิดขึ้นจริงในเวอร์ชันที่เผยแพร่ `oauthModal.googleOAuthWarning` ถูกเขียนใหม่เมื่อมีการเพิ่มตัวช่วยเข้าสู่ระบบ
ของ Antigravity (#5203); **39 จาก 43 locale** ยังคงมีข้อความบอกผู้ดูแลให้ "คัดลอก
URL แบบเต็มแล้ววางด้านล่าง" — ขั้นตอนที่ไม่สามารถดำเนินการจนเสร็จสิ้นได้สำหรับผู้ให้บริการรายนั้น ปัญหานี้
ไม่มีใครสังเกตเห็นจนกระทั่ง #8463 เนื่องจาก:

- `sync-ui-keys` เติมคีย์ย้อนหลังเฉพาะคีย์ที่ **ไม่มีอยู่** เท่านั้น ไม่เคยอัปเดตคีย์ที่ **เก่า**;
- `check-ui-keys-coverage` นับ _การมีอยู่_ ของคีย์ ดังนั้นคำแปลเก่าจึงถูกนับว่าครอบคลุมแล้ว;
- `check-translation-drift` ติดตามสำเนาเอกสาร `docs/i18n/<locale>/**.md` —
  โดยไม่เคยอ่าน `src/i18n/messages/*.json` มีผลบล็อกในงาน `docs-sync-strict` ตั้งแต่
  การซิงค์ใหม่ใน 2026-09: แก้ไขเอกสารหลัก → `npm run i18n:run -- --files=<doc>` (ระดับส่วน ใช้ทรัพยากรน้อย)

**รับรู้ความแตกต่าง ไม่ได้อิง baseline** ระบบจะเปรียบเทียบ `en.json` ณ merge base กับ
working tree สำหรับทุกคีย์ที่ค่าภาษาอังกฤษเปลี่ยนแปลง locale ใดก็ตามที่ยังคงมี
คำแปลเดิมที่ไม่ได้แก้ไขจะถือว่าล้าสมัย วิธีนี้จงใจ **ตรึงหนี้เดิมที่มีอยู่แล้ว** — diff
ไม่สามารถระบุได้ว่าคำแปลที่มีมานานนั้นมาจากข้อความภาษาอังกฤษเก่าใด ดังนั้น gate จึงตัดสิน
เฉพาะส่วนที่การเปลี่ยนแปลงปัจจุบันแตะต้องเท่านั้น ทางเลือกอื่น (baseline แบบ hash ต่อคีย์) จะทำให้ต้องมี
ไฟล์ที่สร้างขึ้นขนาดประมาณ 600 KB ซึ่งใหญ่กว่า baseline ที่มีอยู่ซึ่งใหญ่ที่สุดถึง 3 เท่า และจะเปลี่ยนแปลงทุกครั้งที่มี i18n PR

มีสองวิธีในการทำให้ผ่าน:

1. อัปเดตคำแปลที่ได้รับผลกระทบ หรือ
2. ตั้งค่าเป็น `__MISSING__:<new english>` — จากนั้น runtime จะใช้ข้อความภาษาอังกฤษที่แก้ไขแล้ว
   (`src/i18n/request.ts::deepMergeFallback`, #7258) และคีย์ดังกล่าวจะเข้าสู่คิวรอการแปล

หาก **ความหมาย** ของข้อความเปลี่ยนไป ควร **เปลี่ยนชื่อคีย์**: คีย์ใหม่ไม่สามารถรับช่วง
คำแปลที่ล้าสมัยได้ นี่คือรูปแบบที่ #8463 ใช้

```bash
npm run i18n:check-value-drift          # โหมดเข้มงวด (แบบที่ CI เรียกใช้)
npm run i18n:check-value-drift:warn     # รายงานเท่านั้น
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ออกด้วยสถานะ 0 พร้อม `SKIP reason=base-unresolved` เมื่อไม่สามารถอ่าน catalog ต้นทางได้ (shallow
clone ที่ไม่มี base ref) โดยทำงานสอดคล้องกับ `check-openapi-breaking`

### งาน: `i18n`

เมทริกซ์การตรวจสอบ i18n แบบเต็ม (หนึ่งงานต่อ locale) งานทั้งหมดเป็นเพียงคำแนะนำ

| สคริปต์                         | ตรวจสอบ                       | การบล็อก                                              |
| ------------------------------- | ----------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | ความครบถ้วนของคำแปลต่อ locale | **คำแนะนำ** (`continue-on-error: true` สำหรับทั้งงาน) |

### งาน: `pr-test-policy`

ทำงานเฉพาะกับ pull request

| สคริปต์                | ตรวจสอบ                                                                                                                                                  | การบล็อก |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR ที่เปลี่ยนโค้ด production ใน `src/`, `open-sse/`, `electron/` หรือ `bin/` ต้องเพิ่มหรืออัปเดตการทดสอบ (กฎตายตัวข้อที่ 8)                              | ใช่      |
| `check:test-masking`   | ไฟล์ทดสอบที่เปลี่ยนแปลงต้องไม่ลดจำนวน assert สุทธิหรือเพิ่ม tautology แบบ `assert.ok(true)`                                                              | ใช่      |
| `check:pr-evidence`    | เนื้อหา PR ต้องอ้างอิงหลักฐานการทดสอบ/VPS สำหรับการเปลี่ยนแปลง (ทำให้กฎตายตัวข้อที่ 18 เป็นอัตโนมัติด้วยการ grep ข้อความใน PR — เปราะบาง โปรดดู Backlog) | ใช่      |

### งาน: `test-vitest`

ทำงานหลัง `build` และบล็อกการ merge หากล้มเหลว

| ชุดการทดสอบ      | ตรวจสอบ                                                       | การบล็อก                                                                                                           |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 เครื่องมือ), autoCombo, cache — ตัวรัน vitest | ใช่                                                                                                                |
| `test:vitest:ui` | การทดสอบคอมโพเนนต์ UI — ตัวรัน vitest                         | **บล็อก** — ความล้มเหลวที่มีอยู่ก่อนถูกยกเว้นไว้อย่างชัดเจนใน `vitest.config.ts`; ความล้มเหลวใหม่จะทำให้งานล้มเหลว |

### workflow รายคืน (ตามกำหนดเวลา, เป็นคำแนะนำ)

รายการเหล่านี้ทำงานตามกำหนดเวลา cron (และ `workflow_dispatch`) โดยไม่ทำงานบน PR และทั้งหมดเป็นเพียงคำแนะนำ

| Workflow               | ตรวจสอบ                                                                                                                                                            | การบล็อก    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `nightly-property`     | การทดสอบ property ด้วย fast-check โดยใช้ seed แบบสุ่มและจำนวนรอบการรันสูง                                                                                          | **คำแนะนำ** |
| `nightly-resilience`   | gate สำหรับการเติบโตของ heap, การฉีดข้อผิดพลาดแบบ chaos, การทดสอบโหลด/soak ด้วย k6                                                                                 | **คำแนะนำ** |
| `nightly-llm-security` | ตัวป้องกันการ injection ของ promptfoo (โหมดบล็อก) + probe ของ garak (ข้ามหากไม่มี provider secret)                                                                 | **คำแนะนำ** |
| `nightly-schemathesis` | การ fuzz สัญญา OpenAPI (schemathesis) กับ OmniRoute ที่กำลังทำงานโดยใช้ `docs/openapi.yaml` — เผยให้เห็นการละเมิดข้อกำหนด / 500 ที่ไม่ได้รับการจัดการ (ระยะ 8 B.4) | **คำแนะนำ** |
| `nightly-mutation`     | คะแนนการทดสอบ mutation ของ Stryker บนเลน unit แบบเร็ว — mutant ที่รอดเผยให้เห็น assert ที่อ่อนแอ                                                                   | **คำแนะนำ** |
| `nightly-compat`       | เมทริกซ์ความเข้ากันได้ของ Node engine ครอบคลุมช่วง `engines.node` ที่รองรับ                                                                                        | **คำแนะนำ** |

baseline ด้านประสิทธิภาพ (heap, TTFB, เวลา build) จะถูกบันทึกไว้ แต่ไม่ใช้เป็น gate: ดู [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)

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

ทุกเกตที่ไม่สามารถล้มเหลวจากการละเมิดที่มีอยู่ก่อนแล้วจะใช้ allowlist แบบตรึงไว้
(เช่น `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) โดยมีนโยบายดังนี้:

**แก้ไขสาเหตุที่แท้จริง ใช้ allowlist เฉพาะเมื่อการละเมิดนั้นมีอยู่ก่อนแล้วและ
ไม่สามารถแก้ไขได้ภายใน PR เดียวกัน**

เมื่อเพิ่มรายการลงใน allowlist:

1. ใส่ความคิดเห็นที่อธิบายเหตุผล
2. อ้างอิง issue ที่ใช้ติดตาม (เช่น `// #3498 — ฟีเจอร์ระยะที่ 2 ซึ่งยังไม่ได้พัฒนา`)
3. ลบรายการดังกล่าวใน PR เดียวกับที่แก้ไขการละเมิด — รายการที่ค้างอยู่และไม่ได้
   ระงับการละเมิดที่ยังเกิดขึ้นจริงอีกต่อไปถือเป็นข้อบกพร่องเช่นกัน (การบังคับใช้เพื่อตรวจจับ
   รายการค้างใน 6A.3 จะทำให้เกตล้มเหลวเมื่อพบรายการ allowlist ที่ไม่มีการละเมิดรองรับ หลังจากนำไปใช้แล้ว)

**ห้าม** เพิ่มรายการใน allowlist เพื่อให้การทดสอบผ่านเร็วขึ้น เกตที่เป็นสีเขียวพร้อมกับ
allowlist ที่เพิ่มขึ้นเรื่อย ๆ เป็นเพียงภาพลวงตาของคุณภาพ

### เมื่อเกตล้มเหลวใน PR ของคุณ

1. **อ่านผลลัพธ์ของเกตอย่างละเอียด** — ผลลัพธ์จะระบุอย่างชัดเจนว่าไฟล์หรือสัญลักษณ์ใด
   ละเมิดกฎ
2. **แก้ไขการละเมิด** — เกตส่วนใหญ่เป็นการตรวจสอบระบบไฟล์แบบกำหนดผลได้แน่นอน ซึ่งจะผ่านทันที
   เมื่อโค้ดถูกต้อง
3. **หากการละเมิดมีอยู่ก่อนแล้ว** (กล่าวคือ คุณไม่ได้เป็นผู้ทำให้เกิด แต่ตอนนี้เกต
   ครอบคลุมถึงการละเมิดนั้นแล้ว): ให้เพิ่มรายการ allowlist พร้อมความคิดเห็นอธิบายเหตุผลและ issue สำหรับติดตาม
4. **หากเกตเป็นแบบ ratchet** (coverage, คำเตือน ESLint, การทำซ้ำ, ความซับซ้อน):
   การเปลี่ยนแปลงของคุณทำให้เมตริกแย่ลง ให้แก้ไขปัญหาที่เป็นต้นเหตุ หรือในกรณีที่พบได้น้อย ให้รัน
   `npm run quality:ratchet -- --update` หากเป็นการเปลี่ยนแปลงโดยตั้งใจและยอมรับ
   การเสื่อมลงของเมตริกได้ — แต่ต้องบันทึกเหตุผลไว้ในคำอธิบาย PR
5. **เกตเชิงแนะนำ** (`continue-on-error: true`) มีไว้ให้ข้อมูล — เกตเหล่านี้จะไม่ขัดขวาง
   การ merge แต่จะปรากฏในสรุป CI อย่างไรก็ตาม ควรแก้ไขปัญหาเหล่านี้ด้วย

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

## รายการงานค้างสำหรับการปรับปรุงให้มีเหตุผล (การทบทวน ROI — ระยะ 9 รอบ 3)

รายการนี้ได้รับการตรวจสอบเทียบกับ `ci.yml` เมื่อ 2026-06-17 (เวอร์ชันก่อนหน้านี้ไม่ได้ระบุ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`) การทบทวน ROI ของชุดรายการที่ตรวจสอบแล้ว
พบตัวเลือกสำหรับการปรับปรุงให้มีเหตุผลดังต่อไปนี้ **การรวมเป็นการเปลี่ยนแปลง CI
เชิงกล ส่วนการสลับ/ยกเลิกเป็นการตัดสินใจเชิงนโยบายที่สงวนไว้สำหรับผู้ปฏิบัติการ** รายการด้านล่าง
ยังไม่มีการนำไปใช้

**รายการที่ยังไม่ได้บันทึกไว้ข้างต้นด้วย** (เชิงแนะนำ, สัญญาณต่ำ): งาน `docs-lint`
(markdownlint + Vale โดยทั้งงานตั้งค่า `continue-on-error`) และเวิร์กโฟลว์สแกนเนอร์แบบแยกเดี่ยว
`semgrep.yml` / `codeql.yml` / `scorecard.yml` ค่า `semgrepFindings: 0` อยู่ใน
`quality-baseline.json` แต่ยังไม่ได้เชื่อมต่อกับ ratchet แบบบล็อกใน `ci.yml` — ปัจจุบันเมตริกนี้
ไม่มีการใช้งาน

### รวม / ขจัดความซ้ำซ้อน (เชิงกล, ความเสี่ยงต่ำกว่า)

ตัวเลือกแต่ละรายการได้รับการตรวจสอบกับสถานะ gate ที่ใช้งานจริงเมื่อ 2026-06-17 (เชื่อใจแต่ต้องตรวจสอบ)
การรวมหลายรายการที่ดู “ชัดเจน” กลับพบว่าซ่อนหนี้ทางเทคนิคไว้ และ **ไม่ใช่** การแทนที่ที่ทำได้โดยตรงอย่างปลอดภัย

- **`check:docs-sync` ทำงานสองครั้ง** — ทำงานแยกเดี่ยวในงาน `lint` และทำงานอีกครั้งภายใน `check:docs-all` (`docs-sync-strict`) รวมถึงใน husky pre-commit hook ✅ **เสร็จแล้ว** — นำการเรียกใช้แบบแยกเดี่ยวใน `lint` ออกแล้ว
- **การสแกน CVE** — ❌ **ไม่ใช่การรวมที่ทำได้โดยตรงอย่างปลอดภัย** `audit:deps` ล้มเหลวทันทีเมื่อพบ CVE ระดับสูง/วิกฤตใด ๆ ส่วน `check:vuln-ratchet` (osv) จะล้มเหลวเฉพาะเมื่อมี _การถดถอย_ เมื่อเทียบกับ baseline (ปัจจุบันมีระดับ MODERATE 1 รายการ) ความหมายต่างกัน — การนำ `audit:deps` ออกจะทำให้สูญเสีย gate แบบค่าสัมบูรณ์สำหรับระดับสูง/วิกฤต ให้คงทั้งสองรายการไว้
- **การตรวจจับวงจร** — ✅ **เสร็จแล้ว** (#15159 G-01/G-02) ข้อความเดิมในส่วนนี้เรียก `check:cycles` ว่าเป็น gate ที่ “ผ่านและคัดสรรมาแล้ว” และให้เหตุผลว่าควรคงการบล็อกไว้ เนื่องจาก `check:circular-deps` (dpdm) รายงานวงจร 91 รายการ แต่การผ่านนั้นเป็น **ผลผ่านลวง**: `check:cycles` สแกนไดเรกทอรีย่อย 5 รายการ (450 ไฟล์) จับคู่เฉพาะ `import|export … from` แบบสแตติก และตัด specifier ที่เป็น `@/` และ `@omniroute/open-sse/` ทั้งหมดออก จึงไม่สามารถตรวจพบวงจรจาก dynamic import + alias ซึ่งเป็นวงจรส่วนใหญ่ใน repo ได้ แก้ไขแล้ว: ขณะนี้ gate ตรวจไล่ผ่าน `src` + `open-sse` (5023 ไฟล์), รวบรวม specifier จาก TypeScript AST (ดังนั้น `import("…")` จะถูกนับ แต่ `typeof import("…")` ในตำแหน่งประเภทจะไม่ถูกนับ) และ resolve `paths` ของ tsconfig โดยพบวงจร **14** รายการ ไม่ใช่ 0 เนื่องจากไม่สามารถแก้ไขวงจรเดิมทั้ง 14 รายการใน gate PR ได้ ขณะนี้ `check:cycles` จึงเป็น **ratchet** (`--ratchet`, เพดาน `metrics.cycles.value = 14` ใน `quality-baseline.json`, `direction: down`) — โดยจะบล็อก _การถดถอย_ ใด ๆ และจำนวนวงจรจะลดลงได้เท่านั้น CI เรียกใช้ `npm run check:cycles:ratchet` การทยอยลดจำนวนจะดำเนินไปพร้อมกับ **A-01** ส่วน `check:circular-deps` (dpdm) ยังคงเป็นรายการเชิงแนะนำเพื่อใช้เป็นความเห็นที่สองในขอบเขตที่กว้างกว่า
- **ความซับซ้อน** — ✅ **เสร็จแล้ว** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ตรวจไล่ด้วย ESLint เพียงรอบเดียว และนับตาม ruleId เพื่อให้ baseline ของ cyclomatic+max-lines และ cognitive ยังคงเป็นอิสระจากกัน ส่วน `check:complexity` / `check:cognitive-complexity` แต่ละรายการยังคงไว้สำหรับ `--update` ภายในเครื่อง
- **การป้องกันข้อมูลหลอนของ `/api`** — ✅ **เสร็จแล้ว** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): จัดทำรายการ FS ของ `src/app/api` เพียงครั้งเดียว โดย openapi-routes + docs-symbols ยังคงรายงานแยกกัน และยังคงรายการแต่ละรายการไว้สำหรับการเรียกใช้ภายในเครื่อง
- **`check:node-runtime` ทำงานใน 11 งาน** — ⚠️ **ROI ต่ำ** แต่ละงานใช้ runner แยกกันและการตรวจสอบใช้เวลาน้อยกว่า 1 วินาที เวลาที่ประหยัดได้รวมประมาณ 10 วินาที ซึ่งไม่คุ้มกับการสูญเสียตัวป้องกันราคาถูกในแต่ละงานและความวุ่นวายจากการเปลี่ยนแปลง
- **`typecheck:noimplicit:core` ใน CI lint** — ✅ **นำออกจากงาน lint แล้ว** (เดิมเป็นเชิงแนะนำโดยใช้ `continue-on-error`) พื้นผิวประเภทที่บล็อกคือ `typecheck:core` + `check:type-coverage` โดยยังคงสคริปต์สำหรับใช้งานภายในเครื่องไว้

### สลับ / ตัดสินใจ (นโยบายของผู้ปฏิบัติการ)

- `check:openapi-security-tiers` (เชิงแนะนำ) — ❌ **ไม่สามารถสลับได้โดยตรงอย่างปลอดภัย** แม้จะจบการทำงานด้วย 0 แต่เตือนว่า route หลายรายการของ `traffic-inspector` ภายใต้ `LOCAL_ONLY_API_PREFIXES` ไม่มี annotation `x-loopback-only: true` การบังคับใช้จำเป็นต้องเพิ่ม annotation เหล่านั้นใน `openapi.yaml` ก่อน
- `typecheck:noimplicit:core` (เชิงแนะนำ) — ถูกแทนที่โดย ratchet `check:type-coverage` ที่บล็อกอยู่เป็นส่วนใหญ่แล้ว ให้สลับเป็น ratchet หรือนำการรัน `tsc` รอบที่สองซึ่งซ้ำซ้อนออก
- `test:vitest:ui` (ขณะนี้ **บล็อก**) — ความล้มเหลวที่มีอยู่เดิมถูกยกเว้นไว้อย่างชัดเจนใน `vitest.config.ts` พร้อมความคิดเห็นติดตาม `// #8618` ส่วนความล้มเหลวใหม่จะทำให้งานล้มเหลว
- `check:secrets` (gitleaks ซึ่งเป็น ratchet แบบบล็อกที่ตรึงไว้ที่ผลบวกลวงที่มีเอกสารกำกับ 3 รายการ) — เพิ่มทั้ง 3 รายการลงใน allowlist เพื่อให้เหลือ 0 หรือลดระดับเป็นเชิงแนะนำ มีขอบเขตทับซ้อนกับการสแกน secret แบบเนทีฟของ GitHub + `check:public-creds`
- `check:pr-evidence` (บล็อก โดยค้นหาข้อความในเนื้อหา PR ด้วย grep) — มีความเสี่ยงสูงที่จะเกิดผลบวกลวง หากนำออกจะทำให้การบังคับใช้กฎตายตัวข้อที่ 18 อ่อนแอลง ดังนั้นนี่จึงเป็นการตัดสินใจเชิงนโยบายอย่างแท้จริง
- `semgrep` (แบบแยกเดี่ยวเชิงแนะนำ) — มีขอบเขตทับซ้อนกับ CodeQL สำหรับกลุ่ม OWASP ให้เชื่อม baseline ของมันเข้ากับ ratchet หรือนำออก

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
