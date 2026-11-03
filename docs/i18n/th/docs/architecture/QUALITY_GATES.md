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

## รายการเกตและโปรไฟล์การทำงาน

### การรับผู้สมัคร

เวิร์กโฟลว์ CI และ Quality Gates ต่างส่งผลการตัดสินที่เสถียร: `Gate / CI` และ
`Gate / Quality` นโยบายการรับเวอร์ชันจะระบุงานต้นทางทุกรายการว่าเป็นข้อบังคับหรือคำแนะนำ
งานข้อบังคับที่ใช้ได้ต้องสำเร็จ: ผลลัพธ์ที่ขาดหาย ถูกยกเลิก ถูกข้าม อยู่ระหว่างรอดำเนินการ
หรือไม่ทราบ ไม่สามารถยืนยัน PASS ได้ การจัดประเภทแบบ docs-only หรือ catalog-only ที่ถูกต้องสามารถทำให้
เลนโค้ดไม่เกี่ยวข้องได้ ส่วน PR แบบร่างไม่ถือเป็นผู้สมัครที่ยอมรับ `hotfix` จะไม่ยกเว้นหลักฐาน

เวิร์กโฟลว์ทั้งสองครอบคลุม PR ที่ส่งเข้าแบรนช์ main/release, การ push ไปยัง `main`, การ dispatch ด้วยตนเอง
และเหตุการณ์ merge-group การ push, dispatch และ merge-group จะเรียกใช้การคัดเลือกแบบเต็ม การ push ไปยัง
`release/**` จะไม่เริ่มเวิร์กโฟลว์เหล่านี้ (2026-10-18): การเปลี่ยนแปลงแต่ละรายการได้รันเมทริกซ์แล้วบน PR
ของตนเอง และชุดค่าผสานเป็นหน้าที่ของ Release-Green (`docs/ops/RUNNER_BOX.md` → เลน Hosted)
Fork และ merge group จะใช้ runner แบบโฮสต์สำหรับงานที่โดยปกติเลือก runner แบบ self-hosted;
ต้องตรวจสอบความจุของโฮสต์ที่เพียงพอก่อนเปิดใช้งาน

ใบรับรอง JSON แต่ละรายการจะระบุ SHA ที่ checkout, workflow run และ attempt
CLI จะปฏิเสธกรณี SHA ของ checkout/event ไม่ตรงกัน การทดสอบเวิร์กโฟลว์จะผูกการเป็นสมาชิกของนโยบาย
เข้ากับรายการ `needs` ของงาน verdict เพื่อไม่ให้เลนใหม่หรือเลนที่ถูกนำออกหายไปโดยไม่มีใครสังเกต
ใบรับรองครอบคลุมเวิร์กโฟลว์ของตนเอง ไม่รวมการเผยแพร่ การติดตั้งใช้งาน หรือรายละเอียดภายในของ
ตัวสแกน advisory ที่มีอยู่ การเปิดใช้งานชื่อการตรวจสอบทั้งสองรายการในกฎของแบรนช์เป็นการเปลี่ยนแปลง
ด้านการดูแลระบบที่แยกต่างหาก; การเพิ่มงานเหล่านี้ไม่ได้ทำให้แบรนช์ได้รับการปกป้องโดยอัตโนมัติ

### รายการ static scan

รายการ npm-alias แบบมีเวอร์ชันและสมาชิกของ static-scan อยู่ใน
`config/quality/gate-manifest.json` เรียกใช้ `npm run check:gate-manifest` เพื่อตรวจสอบชื่อสคริปต์
และคำสั่งที่ตรงกันทุกประการกับ `package.json`; การเพิ่ม การนำออก และคำสั่งที่เปลี่ยนแปลงจะทำให้ทั้ง
local hook และงานจัดประเภทการเปลี่ยนแปลงใน CI ล้มเหลว
Alias ไม่ใช่งานเวิร์กโฟลว์ อินสแตนซ์ของเมทริกซ์ หรือกรณีทดสอบ: ห้ามนำจำนวนเหล่านี้มาเสนอว่าใช้แทนกันได้

ใช้ `npm run quality:scan -- --list` หรือ `npm run quality:scan:fast -- --list`
เพื่อตรวจสอบ alias ที่ถูกเลือกโดยไม่ต้องเรียกใช้ ตัว runner จะเรียก entrypoint ของ npm ดังนั้น runtime
ของมัน (รวมถึง Bun เมื่อมีการกำหนดค่าไว้) จะยังคงเดิม
Manifest จะบันทึก alias นอกเหนือจากโปรไฟล์เหล่านั้นในฐานะรายการที่ถูกเรียกใช้แยกต่างหาก และห้ามใช้
คำสั่งบำรุงรักษาในโปรไฟล์การสแกนแบบอ่านอย่างเดียว

โปรไฟล์เหล่านี้ครอบคลุมเฉพาะ static scan เท่านั้น ไม่ได้รับรองการทดสอบผลิตภัณฑ์ coverage
การแพ็กเกจ การตรวจสอบภายนอก หรือการยอมรับรีลีสอย่างเต็มรูปแบบของผู้สมัคร
การรับเข้าเวิร์กโฟลว์ใช้ `config/quality/admission-policy.json` และ `scripts/quality/admission-verdict.mjs`
โปรไฟล์ release-observer ยังคงแยกต่างหาก; ให้ตรวจสอบการตรวจสอบและใบรับรองที่เกี่ยวข้องของโปรไฟล์เหล่านั้นโดยอิสระ
รายการเชิงอธิบายด้านล่างเป็นข้อมูลอ้างอิง ไม่ใช่หลักฐานว่าเกตทำงานจริง

สคริปต์อยู่ภายใต้ `scripts/check/` (เกตนโยบาย) และ `scripts/quality/` (เอนจิน ratchet)
แหล่งข้อมูลหลักของ CI คือ `.github/workflows/ci.yml`

### เส้นทางด่วนสำหรับ Release PR (`quality.yml`)

`.github/workflows/quality.yml` ทำงานเสริมกับ CI บน PR ของ main/release, การ push ไปยัง `main`,
dispatch และ merge group PR จะใช้การตรวจสอบแบบเร็วตามเส้นทาง
บิลด์ซ้ำที่ถูกปิดใช้งานถาวรถูกนำออกแล้ว ส่วนการตรวจสอบ build/package/boot จริงยังคงอยู่ใน CI

| งาน                                              | ขอบเขต                                                                                                                                                                                                         | การบล็อก        |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | PR ของเอกสาร/โค้ด; การอ้างอิงเอกสาร API และ docs-all                                                                                                                                                           | ใช่             |
| `Fast Quality Gates`                             | PR ของโค้ด; การตรวจสอบแบบ static, typecheck, dashboard typecheck, การทดสอบยูนิตที่ได้รับผลกระทบ                                                                                                                | ใช่             |
| `Forgotten sibling tests`                        | PR ของโค้ด; โมดูลที่เปลี่ยนแปลงซึ่งติดตามไปยัง static consumer และการทดสอบ sibling ที่เป็นผู้สมัคร; เส้นทาง barrel และ dynamic-import จะถูกรายงานเป็นการวินิจฉัยแบบคำแนะนำ โดยมีข้อยกเว้น allowlist ที่อ้างอิง | **เป็นคำแนะนำ** |
| `Vitest (fast-path)`                             | PR ของโค้ด; ชุด vitest แบบเร็ว                                                                                                                                                                                 | ใช่             |
| `Unit Tests fast-path`                           | PR ของโค้ด; ชุดทดสอบยูนิตแบบ 4 ชาร์ด                                                                                                                                                                           | ใช่             |
| `No new ESLint warnings`                         | PR ของโค้ด; ตัวป้องกัน lint ที่รับรู้การ suppress                                                                                                                                                              | ใช่ รวมถึง fork |
| `Merge integrity (changelog + generated skills)` | PR ที่ไม่ใช่แบบร่าง; การซิงค์ changelog และ generated skill                                                                                                                                                    | ใช่ รวมถึง fork |

#### รายงาน Forgotten sibling tests

`npm run check:forgotten-sibling-tests` นำตัวแก้ไขการนำเข้าเดียวกับที่อยู่เบื้องหลังแผนผังผลกระทบของการทดสอบกลับมาใช้
สำหรับโมดูลการทำงานจริงทุกโมดูลที่มีการเปลี่ยนแปลง ระบบจะแสดงสายโซ่
`changed module/symbol -> static consumer -> candidate sibling test` ที่กำหนดผลลัพธ์ได้แน่นอน เมื่อการทดสอบ
ที่เป็นตัวเลือกไม่มีอยู่ใน diff ของ pull request โดยจะเก็บสรุป Markdown และผลลัพธ์ JSON ไว้เป็น
อาร์ติแฟกต์ของเวิร์กโฟลว์ `forgotten-sibling-tests` เพื่อใช้ปรับเทียบก่อนเปิดใช้การบล็อก

การส่งออกซ้ำผ่าน Barrel และการนำเข้าแบบไดนามิกใช้สำหรับการวินิจฉัยการแก้ไขปัญหาเท่านั้น โดยจะไม่สร้าง
ผลการตรวจพบที่บล็อกการทำงานโดยเด็ดขาด ข้อยกเว้นที่ผ่านการตรวจทานจะอยู่ใน
`config/quality/forgotten-sibling-allowlist.json` แต่ละรายการต้องระบุ consumer และการทดสอบที่เป็นตัวเลือก
ให้เหตุผลเฉพาะเจาะจง และแนบลิงก์ไปยัง GitHub issue หรือ pull request รายการที่มีรูปแบบไม่ถูกต้องจะทำให้
ระบบปฏิเสธโดยค่าเริ่มต้น ข้อยกเว้นไม่สามารถระงับการทดสอบที่เป็นตัวเลือกซึ่งถูกลบไปแล้ว หรือ diff ที่เพิ่ม `.skip`/`.todo` ได้
การทำให้ assertion อ่อนลงและการปกปิดในรูปแบบอื่นยังคงอยู่ภายใต้การตรวจสอบโดยเกต
`check:test-masking` ซึ่งบล็อกการทำงานอย่างเป็นอิสระ

### งาน: `lint`

ทำงานกับ PR ทุกตัวที่ส่งไปยัง `main` และบล็อกการ merge หากทำงานล้มเหลว

| สคริปต์ (`npm run ...`)           | ตรวจสอบ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | บล็อก                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | เวอร์ชัน Node.js อยู่ภายในช่วงที่รองรับ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ใช่                                         |
| `check:cycles`                    | การนำเข้าแบบวนรอบทั่วทั้ง `src/` + `open-sse/` (อิง AST และแก้ไข `paths` ของ tsconfig แล้ว) คำสั่งแบบเปล่าจะออกด้วยรหัส 1 ทุกครั้งที่มีวงจรใด ๆ (ทำงานแบบ fail-closed ตั้งแต่ #15281) และแสดงรายการ SCC `check:cycles:ratchet` (สิ่งที่ CI เรียกใช้) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.cycles` ใน `quality-baseline.json` — ปัจจุบันคือ 14, `direction: down` จึงลดลงได้เท่านั้น (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ใช่ (ratchet)                               |
| `check:boundary`                  | การเชื่อมโยง `open-sse → src`: การนำเข้าแบบไฟล์ต่อไฟล์ที่ไม่ซ้ำกันจาก engine ไปยังแอป (`scripts/quality/measure-boundary.mjs`; รายการ edge คือ backlog สำหรับการแก้ไข v4 core/module-split) คำสั่งแบบเปล่าจะสร้างรายงานเชิงให้ข้อมูล (เช่นเดียวกับ `quality:boundary`) `check:boundary:ratchet` (สิ่งที่ CI เรียกใช้ และอยู่ในลูป ratchet ของ fast-gates ใน `quality.yml` ด้วย) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.boundaryOpenSseToSrc` ใน `quality-baseline.json` — เริ่มต้นที่ค่าที่วัดได้ 771, `direction: down`; `--update` จะลดค่าได้เท่านั้น; ใช้ค่าที่สัมพันธ์กับ base บน PR (`--base-ref` ดูด้านล่าง)                                                                                                                                                                                                                                                                                                                      | ใช่ (ratchet)                               |
| `check:route-validation:t06`      | มีสคีมา Zod อยู่ในทุก route (นโยบาย Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ใช่                                         |
| `check:any-budget:t11`            | จำนวน `@ts-expect-error // any` ต้องไม่เกินงบประมาณ (catraca ระดับ 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                         |
| `check:provider-consistency`      | ผู้ให้บริการทุกตัวใน `providers.ts` ต้องมีรายการที่ตรงกันใน `providerRegistry.ts` (และในทางกลับกัน โดยอยู่ภายใน allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ใช่                                         |
| `check:model-lifecycle`           | ตารางการกำหนดเส้นทางที่ดูแลด้วยตนเองทั้งสามตารางต้องสอดคล้องกับสแนปชอตวงจรการใช้งานที่เช็กอินไว้ (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ต้องไม่ให้คะแนน id ที่เลิกใช้งานแล้วซึ่ง `REGISTRY` สามารถกำหนดเส้นทางได้; เป้าหมายของ `BUILT_IN_ALIASES` ทุกตัวต้องมีอยู่ใน `REGISTRY` และไม่อยู่ในสแนปชอต id ที่เลิกใช้งานแล้ว; id ที่เลิกใช้งานแล้วทุกตัวซึ่งยังอยู่ใน `REGISTRY` ต้องถูกส่งต่อหรืออยู่ใน `allowedRetiredInCatalog`; และไม่มี source หรือ target ของ `DEFAULT_DEGRADATION_MAP` ใดปรากฏว่าเลิกใช้งานแล้วในสแนปชอตนั้น การตรวจสอบนี้ไม่ได้พิสูจน์ว่าโมเดลกำลังให้บริการโดย upstream ที่ทำงานอยู่ในปัจจุบัน ทำงานแบบออฟไลน์ — เปรียบเทียบกับ `config/quality/model-lifecycle.json` ซึ่งรีเฟรชด้วยตนเองโดยใช้ `npm run quality:refresh-model-lifecycle` (ต้องใช้เครือข่าย; ไม่ได้เชื่อมเข้ากับ CI) `allowedRetiredInCatalog` เป็นกลไก ratchet สำหรับลดรายการค้าง: เพิ่มรายการได้เฉพาะเมื่อมี issue สำหรับติดตามเท่านั้น | ใช่                                         |
| `check:fetch-targets`             | `fetch("/api/...")` ทุกตัวใน `src/` ฝั่งไคลเอ็นต์ต้องแก้ไขเส้นทางไปยัง `route.ts` ที่มีอยู่จริง                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                         |
| `check:deps`                      | dependency ที่ติดตั้งได้ด้วย `npm install` ทั้งหมดใน `package.json` ทุกไฟล์ภายใน repository ต้องอยู่ใน `dependency-allowlist.json`; ต้องแจ้งเตือนแพ็กเกจใหม่ที่ไม่ระบุเวอร์ชันหรือแพ็กเกจที่ถูกสวมรอยชื่อ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                         |
| `audit:deps`                      | `npm audit` (root + electron) — ต้องไม่มีคำแนะนำด้านความปลอดภัยระดับสูงหรือวิกฤต (ซ้ำซ้อนกับ osv `check:vuln-ratchet`; ดู Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ใช่                                         |
| `check:lockfile`                  | ความถูกต้องของ `package-lock.json` — รีจิสทรี https, แฮชความถูกต้อง และไม่มีการแทนที่โฮสต์                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ใช่                                         |
| `check:licenses`                  | รายการใบอนุญาต SPDX ที่อนุญาตสำหรับ dependency ที่ใช้ใน production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ใช่                                         |
| `check:tracked-artifacts`         | ไม่มี build artifact / symlink ของ `node_modules` ที่ commit ไว้ (ทำงานใน husky pre-commit ด้วย; pre-push ตั้งใจให้ทำงานเพียงเล็กน้อย — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                         |
| `check:ai-attribution`            | ไม่มี trailer `Co-Authored-By` ของ AI/บอต หรือส่วนท้ายที่ระบุการสร้างโดย AI ใน commit, ชื่อเรื่อง หรือเนื้อหาของ PR — กฎสำคัญข้อ #16 (อยู่ในลูป fast-gates ของ `quality.yml` สำหรับ PR→`release/**` — อ่าน event payload และไม่ทำงานนอก PR — และเป็นขั้นตอนเฉพาะ PR ใน lint ของ `ci.yml` สำหรับ PR→`main`; รวมถึง hook `commit-msg` ของ husky; อนุญาตผู้เขียนร่วมที่เป็นมนุษย์; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:vitest-exclusions`         | ทุก exclusion ของ Vitest ต้องระบุ issue สำหรับติดตาม และต้องปรากฏใน `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                         |
| `check:file-size`                 | ไฟล์ต้นฉบับ (`.ts`/`.tsx` ใน `src/`, `open-sse/`, `electron/`, `bin/`) ต้องมีขนาดไม่เกิน `cap` และไฟล์ทดสอบ (`*.test.ts(x)`) ต้องมีขนาดไม่เกิน `testCap`; ไฟล์ที่ถูกตรึงไว้ใน `file-size-baseline.json` (`frozen` / `testFrozen`) ต้องไม่เติบโตเกินขนาดที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่                                         |
| `check:error-helper`              | การตอบกลับข้อผิดพลาดใน executors/handlers ใช้ `buildErrorBody()` / `sanitizeErrorMessage()` (กฎสำคัญ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                         |
| `check:migration-numbering`       | ไฟล์ SQL สำหรับการย้ายข้อมูลมีหมายเลขเรียงตามลำดับ ไม่มีหมายเลขขาดหายหรือซ้ำกัน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                         |
| `check:public-creds`              | ไม่มี `client_id`/`client_secret` ของ OAuth แบบระบุค่าโดยตรง หรือคีย์เว็บของ Firebase นอก `publicCreds.ts` (กฎสำคัญ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                         |
| `check:db-rules`                  | ไม่มี SQL ดิบอยู่นอกโมดูลใน `src/lib/db/` และไม่มีการนำเข้าจาก `localDb.ts` ผ่าน barrel (กฎสำคัญ #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ใช่                                         |
| `check:known-symbols`             | ตัวประมวลผลของผู้ให้บริการ กลยุทธ์การกำหนดเส้นทาง และตัวแปลที่ลงทะเบียนไว้ในตาราง dispatch ตรงกับไฟล์บนดิสก์ — ไม่มีสัญลักษณ์ที่ไม่มีไฟล์รองรับหรือไม่ได้ประกาศไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ใช่                                         |
| `check:route-guard-membership`    | ทุกเส้นทางที่สร้างกระบวนการลูกจะถูกจัดประเภทโดย `isLocalOnlyPath()` (กฎสำคัญ #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ใช่                                         |
| `check:test-discovery`            | ไฟล์ `*.test.ts` / `*.spec.ts` ทุกไฟล์ใน repo ถูกรวบรวมโดย test runner อย่างน้อยหนึ่งตัว (ratchet: รายการไฟล์ที่ไม่มีการใช้งานใน `test-discovery-baseline.json` สามารถลดลงได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                         |
| `check:test-tla-order`            | ไม่มีไฟล์ `node:test` ภายใต้ `tests/unit` ที่ลงทะเบียนการทดสอบ พบ `await` ระดับบนสุด แล้วลงทะเบียนการทดสอบเพิ่มเติม (#18045; ratchet: `test-tla-order-allowlist.json` สามารถลดลงได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ใช่                                         |
| `check:agent-skills-sync`         | artifacts ของ agent-skills ที่สร้างขึ้นตรงกับแค็ตตาล็อกต้นทาง (ไม่มีความคลาดเคลื่อน)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | โลโก้/แอสเซ็ตของ provider มีรายการแหล่งที่มาที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | ไฟล์การกำหนดค่า JSON แยกวิเคราะห์ได้และเป็นไปตามกฎ lint ของ repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | การคอมไพล์ TypeScript โดยไม่มีข้อผิดพลาด (คำเตือนเป็นเพียงข้อมูลประกอบเท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` แบบเข้มงวด — เป็นแนวทางสำหรับอนาคต โดยจุดเรียกใช้งานที่มีอยู่เดิมจำนวนมากยังต้องเพิ่มคำอธิบายประเภท                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **เป็นคำแนะนำ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ที่กำหนดขอบเขตไว้เฉพาะ `src/app/(dashboard)/**` (#7033) — allowlist 27 ไฟล์ที่คัดสรรไว้ของ `typecheck:core` ไม่มี TSX ของ dashboard อยู่เลย และ `next build` ก็ไม่เคยตรวจสอบชนิดข้อมูลส่วนนี้เช่นกัน (`next.config.mjs` กำหนด `ignoreBuildErrors: true`) ดังนั้นการถดถอยของตัวระบุที่ไม่มีต้นทางในส่วนนั้น (#6625/#6909) จึงไม่ปรากฏใน CI ความแตกต่างจะถูกตรวจสอบเทียบกับ baseline จำนวนต่อไฟล์/ต่อโค้ด TS ที่หยุดไว้ (`config/quality/dashboard-typecheck-baseline.json` ใช้รูปแบบการบังคับใช้ข้อมูลเก่าแบบเดียวกับ `check:known-symbols`) — มีเพียงข้อผิดพลาดใหม่ที่เกินจำนวนใน baseline เท่านั้นที่จะทำให้ gate ไม่ผ่าน; ลดค่า ratchet ด้วย `--update` เมื่อแก้ไขข้อผิดพลาดที่มีอยู่เดิมแล้ว                                                                                                                                                                                                                                | ใช่                                         |

### งาน: `quality-gate`

ทำงานหลัง `test-coverage` และจะบล็อกการ merge หากล้มเหลว

| สคริปต์                      | ตรวจสอบ                                                                                                                                                                                                 | บล็อก                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `quality:collect`            | สร้าง `quality-metrics.json` (จำนวนคำเตือนของ ESLint, coverage จากรายงาน shard ที่รวมแล้ว)                                                                                                              | ใช่ (เป็น upstream ของ ratchet) |
| `quality:ratchet`            | เมตริกแต่ละรายการใน `quality-baseline.json` ต้องไม่ถดถอย (คำเตือนของ ESLint ≤ baseline; coverage ≥ baseline)                                                                                            | ใช่                             |
| `check:duplication`          | การทำโค้ดซ้ำ (jscpd@4) ต้องไม่เกิน baseline ใน `quality-baseline.json`                                                                                                                                  | ใช่                             |
| `check:complexity`           | ความซับซ้อนแบบ cyclomatic ระดับไฟล์ต้องไม่เกินค่าจำกัด (ESLint core `complexity` + `max-lines-per-function`)                                                                                            | ใช่                             |
| `check:cognitive-complexity` | การทำ ratchet สำหรับความซับซ้อนเชิงการรับรู้ (`eslint-plugin-sonarjs`) — เป็นการตรวจสอบ ESLint แยกต่างหาก; CI เรียกใช้ทั้งสองรายการรวมเป็นขั้นตอนเดียวคือ `check:complexity-ratchets`                   | ใช่                             |
| `check:dead-code`            | การทำ ratchet สำหรับ export / ไฟล์ที่ไม่ได้ใช้งาน (knip) ต้องไม่ถดถอยเมื่อเทียบกับ baseline                                                                                                             | ใช่                             |
| `check:compression-budget`   | งบประมาณการทดสอบการบีบอัด — ค่าขั้นต่ำของการประหยัดโทเค็นแยกตาม engine ต้องไม่ถดถอย                                                                                                                     | ใช่                             |
| `check:type-coverage`        | การทำ ratchet ของเปอร์เซ็นต์โค้ดที่ระบุชนิดข้อมูล (`type-coverage`) ต้องไม่ถดถอย; ครอบคลุมการตรวจสอบ `typecheck:noimplicit:core` เป็นส่วนใหญ่                                                           | ใช่                             |
| `check:codeql-ratchet`       | จำนวนการแจ้งเตือน CodeQL ที่เปิดอยู่ต้องไม่ถดถอย (อ่านผ่าน `gh api`; ข้ามอย่างเหมาะสมโดยไม่ล้มเหลวหากไม่มีโทเค็น) — ดูรอบการรีเฟรชและทริกเกอร์ด้วยตนเองได้ที่หัวข้อ "การทำ ratchet ของ CodeQL" ด้านล่าง | ใช่                             |

### งาน: `quality-extended`

งานทั้งหมดเป็นการให้คำแนะนำ (`continue-on-error: true`) การทำ ratchet ที่ใช้ npm จะทำงานจริง ส่วนเครื่องมือสแกนภายนอกจะติดตั้งผ่าน `gh release download` และข้ามตัวเอง (exit 0) เมื่อยังไม่มีไบนารี

| สคริปต์                  | ตรวจสอบ                                                                                                                                                                                                                          | การบล็อก                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:circular-deps`    | ไม่มี dependency แบบวนรอบ (dpdm)                                                                                                                                                                                                 | **ให้คำแนะนำ**                               |
| `check:bundle-size`      | ขนาด bundle ต้องไม่เกินค่าจำกัด                                                                                                                                                                                                  | **ให้คำแนะนำ**                               |
| `check:secrets`          | การสแกนความลับ (gitleaks) — ข้ามหากไม่มีไบนารี                                                                                                                                                                                   | **ให้คำแนะนำ**                               |
| `check:vuln-ratchet`     | ช่องโหว่ของ dependency (osv-scanner) ต้องไม่ถดถอย — ข้ามหากไม่มีไบนารี                                                                                                                                                           | **ให้คำแนะนำ**                               |
| `check:workflows`        | การตรวจสอบ workflow (actionlint + zizmor); หากเครื่องมือสแกนหายไป/ทำงานผิดพลาด รายงานไม่ถูกต้อง หรือไม่มี baseline ของ ratchet จะล้มเหลวเป็น INCOMPLETE ผลการตรวจสอบที่ถูกต้องจะเป็นไปตามนโยบาย strict/advisory/ratchet ที่เลือก | ต้องดำเนินการ; ratchet ของ zizmor บล็อกใน CI |
| `check:openapi-breaking` | การเปลี่ยนแปลงที่ทำให้สัญญา API สาธารณะ (`openapi.yaml`) ไม่เข้ากันได้เมื่อเทียบกับ branch ฐาน (oasdiff) — สร้าง `openapiBreaking=N`; ข้ามหากไม่มี oasdiff หรือไม่สามารถแก้ไขข้อมูลจำเพาะฐานได้                                  | **ให้คำแนะนำ**                               |

### งาน: `docs-sync-strict`

ทำงานในทุก PR ไปยัง `main` และจะบล็อกการ merge หากล้มเหลว

| สคริปต์                        | ตรวจสอบ                                                                                                                                                                        | บล็อกการทำงาน               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `check:docs-all`               | เมตาเกตที่เรียกใช้ซับเกตทั้ง 6 รายการด้านล่างตามลำดับ                                                                                                                          | ใช่                         |
| ↳ `check:docs-sync`            | ความสอดคล้องของเวอร์ชันใน CHANGELOG / OpenAPI / llm.txt                                                                                                                        | ใช่                         |
| ↳ `check:docs-counts`          | จำนวนในข้อความบรรยาย (จำนวนผู้ให้บริการ จำนวนการย้ายระบบ และอื่น ๆ) อยู่ภายในช่วง ratchet ของจำนวนจริง                                                                         | ใช่                         |
| ↳ `check:env-doc-sync`         | ตัวแปรสภาพแวดล้อมทุกตัวใน `.env.example` ได้รับการบันทึกไว้ในตารางเอกสาร และในทางกลับกัน                                                                                       | ใช่                         |
| ↳ `check:deprecated-versions`  | ไม่มีสตริงเวอร์ชันที่เลิกใช้แล้วในเอกสาร                                                                                                                                       | ใช่                         |
| ↳ `check:doc-links`            | ลิงก์ Markdown ภายในเอกสารชี้ไปยังไฟล์จริง (`[text]`/`(path)` form)                                                                                                            | ใช่                         |
| ↳ `check:fabricated-docs`      | เส้นทาง ตัวแปรสภาพแวดล้อม คำสั่ง CLI ชื่อ hook และเส้นทางไฟล์ที่อ้างถึงในเอกสารมีอยู่จริงใน codebase บล็อกการทำงานแบบเข้มงวดด้วย `--strict`; หากไม่มีแฟล็กจะล้มเหลวแบบไม่บล็อก | ใช่ (ผ่าน `--strict` ใน CI) |
| `check:cli-i18n`               | สตริงคำสั่ง CLI มีอยู่ในไฟล์ locale ของ i18n ทั้งหมด                                                                                                                           | ใช่                         |
| `check:openapi-coverage`       | สเปก OpenAPI ครอบคลุมเส้นทางจริงอย่างน้อยตามเกณฑ์ขั้นต่ำที่กำหนดด้วย ratchet                                                                                                   | ใช่                         |
| `check:openapi-security-tiers` | คำอธิบายระดับความปลอดภัยใน `openapi.yaml` สอดคล้องกับการจัดประเภทใน `routeGuard.ts`                                                                                            | **เชิงให้คำแนะนำ**          |
| `check:openapi-routes`         | ทุก path ใน `openapi.yaml` ชี้ไปยัง `route.ts` ที่มีอยู่จริง (ป้องกันการสร้างข้อมูลขึ้นเอง)                                                                                    | ใช่                         |
| `check:docs-symbols`           | การอ้างอิง `/api/...` ทุกแห่งใน `docs/**/*.md` ชี้ไปยัง `route.ts` ที่มีอยู่จริง (ป้องกันการสร้างข้อมูลขึ้นเอง)                                                                | ใช่                         |
| `i18n translation drift`       | คีย์ที่ยังไม่ได้แปลในไฟล์ locale ของ i18n — แจ้งเตือนเท่านั้น                                                                                                                  | **เชิงให้คำแนะนำ**          |

ไฟล์ SVG ของ README ทั้งสิบสองไฟล์ภายใต้ `docs/diagrams/` ถูกสร้างขึ้นโดยอัตโนมัติ (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` จะสร้างไฟล์ทั้งหมดขึ้นใหม่) แต่ละไฟล์มีการทดสอบแบบ unit test ที่เปรียบเทียบไบต์
(`tests/unit/docs/readme-*-svg.test.ts`, งาน `test-unit`) ซึ่งจะล้มเหลวเมื่อไฟล์ที่ commit ไว้เก่าเกินไป และ `check:docs-counts` จะอ่านตัวเลขมาตรฐานจากโหนด `<text>` — ด้วยเหตุนี้ขั้นตอนการทำเส้นขอบจึงเก็บสตริงที่มีการทำเส้นขอบทั้งหมดไว้ในไฟล์ในรูป `<text>` ที่มองไม่เห็น การตรวจสอบตัวเลขมาตรฐานของ SVG จะอ่านไฟล์ที่ระบุไว้ใน
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg` รวมถึง `public/images/tier-flow-dark.svg` และ `tier-flow-light.svg`;
ข้อกล่าวอ้างเกี่ยวกับ free-forever, catalog-entry, recurring-pool และ scoring-factors ยังอ่านจาก
`promise-pillars.svg`, `free-tier-budget.svg` และ `strategies-grid.svg` ด้วย `free-tier-budget.svg`
ดึงตัวเลขจากตัวโหลด catalog ที่ใช้งานจริง ดังนั้นการเปลี่ยนแปลง `FREE_MODEL_BUDGETS` หรือชื่อที่แสดงของผู้ให้บริการจะทำให้ CI เป็นสีแดงจนกว่าจะสร้างไฟล์นั้นขึ้นใหม่

### งาน: `i18n-ui-coverage`

| สคริปต์                           | ตรวจสอบ                                                                                                                                                                                 | บล็อกการทำงาน      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (inline) | ความครอบคลุมคีย์ i18n ของ UI อยู่ที่ ≥ 65%                                                                                                                                              | ใช่                |
| `check-ui-value-drift` (inline)   | การเขียน **ค่า** ภาษาอังกฤษใหม่จะไม่ทิ้งคำแปลเก่าค้างไว้                                                                                                                                | ใช่                |
| `check-new-key-coverage` (inline) | คีย์ภาษาอังกฤษ **ใหม่** ได้รับการแปลในทุก locale — ระบบจะปฏิเสธเครื่องหมาย `__MISSING__:`                                                                                               | ใช่                |
| `check-translation-ratio`         | อัตราส่วนการแปลจริงต่อ locale (รายการที่เหมือนกับภาษาอังกฤษ / placeholder / รายการที่ขาดหายไปซึ่งอยู่นอก allowlist) ต้องไม่เกิน `config/quality/i18n-translation-baseline.json` + slack | **เชิงให้คำแนะนำ** |

ต้องใช้ `fetch-depth: 0` — เกตตรวจสอบ value-drift จะเปรียบเทียบ `en.json` กับ merge base

#### `check-ui-value-drift` — เกตตรวจสอบคำแปลเก่าค้างcida

ตรวจจับรีเกรสชันด้าน i18n หนึ่งกรณีที่เกตอื่น ๆ ไม่สามารถมองเห็นได้ในเชิงโครงสร้าง: ค่าในภาษาอังกฤษถูกเขียนใหม่ แต่คำแปลที่สร้างจากภาษาอังกฤษ _ก่อนหน้า_ ยังคงอยู่ ทำให้ผู้ใช้ที่ไม่ใช่ภาษาอังกฤษยังคงอ่านข้อความที่ใช้ถ้อยคำอย่างมั่นใจแต่ไม่ถูกต้องแล้ว

กรณีนี้ถูกนำไปใช้งานจริง `oauthModal.googleOAuthWarning` ถูกเขียนใหม่เมื่อ helper สำหรับการเข้าสู่ระบบ Antigravity ถูกเพิ่มเข้ามา (#5203); **39 จาก 43 locale** ยังคงมีข้อความบอกผู้ปฏิบัติงานให้ “คัดลอก URL ทั้งหมดแล้ววางด้านล่าง” — ซึ่งเป็นขั้นตอนที่ไม่สามารถทำให้เสร็จสิ้นสำหรับผู้ให้บริการรายนั้นได้ ปัญหานี้ไม่ถูกสังเกตจนกระทั่ง #8463 เนื่องจาก:

- `sync-ui-keys` จะเติมเฉพาะคีย์ที่ **ไม่มีอยู่** เท่านั้น ไม่เคยเติมคีย์ที่ **ล้าสมัย**;
- `check-ui-keys-coverage` นับการมีอยู่ของคีย์ ดังนั้นคำแปลที่ล้าสมัยจึงถูกนับว่าครอบคลุม;
- `check-translation-drift` ติดตามสำเนาเอกสาร `docs/i18n/<locale>/**.md` —
  ไม่เคยอ่าน `src/i18n/messages/*.json` เลย บล็อกอยู่ใน job `docs-sync-strict` ตั้งแต่การซิงก์ใหม่ใน
  2026-09: แก้ไขเอกสารหลัก → `npm run i18n:run -- --files=<doc>` (ระดับ section และใช้ทรัพยากรน้อย)

**รับรู้ความแตกต่าง ไม่ได้อิง baseline** เปรียบเทียบ `en.json` ที่ merge base กับ working tree; สำหรับทุกคีย์ที่ค่าภาษาอังกฤษเปลี่ยนแปลง หาก locale ใดยังคงมีคำแปลที่ไม่ได้แตะต้อง คำนั้นจะถือว่าล้าสมัย แนวทางนี้จงใจ **ตรึงหนี้เดิมที่มีอยู่ก่อนแล้ว** — diff ไม่สามารถเปิดเผยได้ว่าคำแปลที่มีมานานนั้นมาจากภาษาอังกฤษเวอร์ชันเก่าใด ดังนั้นเกตจะตรวจเฉพาะสิ่งที่การเปลี่ยนแปลงปัจจุบันแตะต้องเท่านั้น ทางเลือกอื่น (baseline แบบแฮชต่อคีย์) จะมีต้นทุนเป็นไฟล์ที่สร้างขึ้นขนาดประมาณ 600 KB ซึ่งใหญ่กว่า baseline ที่มีอยู่ใหญ่ที่สุด 3 เท่า และจะเปลี่ยนแปลงทุกครั้งที่มี i18n PR

มีสองวิธีที่จะทำให้ผ่าน:

1. อัปเดตคำแปลที่ได้รับผลกระทบ หรือ
2. ตั้งค่าเป็น `__MISSING__:<new english>` — จากนั้น runtime จะให้บริการภาษาอังกฤษที่แก้ไขแล้ว
   (`src/i18n/request.ts::deepMergeFallback`, #7258) และคิวคีย์ดังกล่าวไว้สำหรับการแปล

หาก **ความหมาย** ของสตริงเปลี่ยนไป ให้เลือก **เปลี่ยนชื่อคีย์**: คีย์ใหม่จะไม่สามารถสืบทอดคำแปลที่ล้าสมัยได้ นี่คือรูปแบบที่ #8463 ใช้

```bash
npm run i18n:check-value-drift          # เข้มงวด (สิ่งที่ CI รัน)
npm run i18n:check-value-drift:warn     # รายงานเท่านั้น
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ออกด้วยรหัส 0 พร้อม `SKIP reason=base-unresolved` เมื่อไม่สามารถอ่านแค็ตตาล็อกฐานได้ (โคลนแบบ shallow
ที่ไม่มี base ref) เช่นเดียวกับ `check-openapi-breaking`

### Job: `i18n`

เมทริกซ์การตรวจสอบ i18n แบบเต็ม (หนึ่ง job ต่อหนึ่ง locale) ทั้ง job เป็นการแจ้งเตือนเท่านั้น

| สคริปต์                         | ตรวจสอบ                           | การบล็อก                                                     |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | ความครบถ้วนของคำแปลในแต่ละ locale | **แจ้งเตือนเท่านั้น** (`continue-on-error: true` ในทั้ง job) |

### Job: `pr-test-policy`

ทำงานเฉพาะบน pull request เท่านั้น

| สคริปต์                | ตรวจสอบ                                                                                                                                  | การบล็อก |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR ที่เปลี่ยนโค้ดสำหรับใช้งานจริงใน `src/`, `open-sse/`, `electron/` หรือ `bin/` ต้องเพิ่มหรืออัปเดตการทดสอบ (กฎบังคับข้อ #8)            | ใช่      |
| `check:test-masking`   | ไฟล์ทดสอบที่เปลี่ยนแปลงต้องไม่ลดจำนวน assert สุทธิ หรือเพิ่ม tautology `assert.ok(true)`                                                 | ใช่      |
| `check:pr-evidence`    | เนื้อหา PR อ้างอิงหลักฐานการทดสอบ/VPS สำหรับการเปลี่ยนแปลงนั้น (ทำให้กฎบังคับข้อ #18 เป็นกลไกโดยค้นหาข้อความใน PR — เปราะบาง ดู Backlog) | ใช่      |

### Job: `test-vitest`

ทำงานหลัง `build` และบล็อกการ merge หากล้มเหลว

| ชุดทดสอบ         | ตรวจสอบ                                                  | การบล็อก                                                                                                              |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — ตัวรัน vitest | ใช่                                                                                                                   |
| `test:vitest:ui` | การทดสอบคอมโพเนนต์ UI — ตัวรัน vitest                    | **บล็อก** — ความล้มเหลวที่มีอยู่ก่อนแล้วถูกแยกออกอย่างชัดเจนใน `vitest.config.ts`; ความล้มเหลวใหม่จะทำให้ job ล้มเหลว |

### เวิร์กโฟลว์ Nightly (ตามกำหนดเวลา, แจ้งเตือนเท่านั้น)

ทำงานตามกำหนดการ cron (และ `workflow_dispatch`) และจะไม่ทำงานบน PR ทั้งหมดเป็นการแจ้งเตือนเท่านั้น

| เวิร์กโฟลว์            | การตรวจสอบ                                                                                                                                                                      | การบล็อก    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | การทดสอบพร็อพเพอร์ตีด้วย fast-check โดยใช้ seed แบบสุ่ม + จำนวนรอบสูง                                                                                                           | **คำแนะนำ** |
| `nightly-resilience`   | เกตการเติบโตของ heap, การแทรกข้อผิดพลาดแบบ chaos, การทดสอบโหลด/ความทนทานด้วย k6                                                                                                 | **คำแนะนำ** |
| `nightly-llm-security` | ตัวป้องกันการแทรก promptfoo (โหมดบล็อก) + โพรบ garak (ข้ามหากไม่มี secret ของผู้ให้บริการ)                                                                                      | **คำแนะนำ** |
| `nightly-schemathesis` | การทำ fuzzing สัญญา OpenAPI (schemathesis) กับ OmniRoute ที่กำลังทำงานอยู่โดยใช้ `docs/openapi.yaml` — ตรวจพบการละเมิดข้อกำหนด / ข้อผิดพลาด 500 ที่ไม่ได้จัดการ (ระยะที่ 8 B.4) | **คำแนะนำ** |
| `nightly-mutation`     | คะแนนการทดสอบ mutation ด้วย Stryker ในเลนการทดสอบยูนิตแบบเร็ว — mutant ที่ยังอยู่แสดงให้เห็นถึง assert ที่อ่อนแอ                                                                | **คำแนะนำ** |
| `nightly-compat`       | เมทริกซ์ความเข้ากันได้ของเอนจิน Node ในช่วง `engines.node` ที่รองรับ                                                                                                            | **คำแนะนำ** |

จะบันทึกค่าพื้นฐานด้านประสิทธิภาพ (heap, TTFB, เวลา build) แต่จะไม่ใช้เป็นเกต: ดู [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)

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
