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

## บัญชีรายการเกตและโปรไฟล์การดำเนินการ

### การรับแคนดิเดต

เวิร์กโฟลว์ CI และ Quality Gates แต่ละตัวส่งคำตัดสินที่คงที่: `Gate / CI` และ `Gate / Quality` นโยบายการรับเข้าแบบมีเวอร์ชันของทั้งสองระบุงานต้นทางทุกงานว่าเป็นแบบบังคับหรือแบบให้คำแนะนำ งานที่บังคับและเกี่ยวข้องต้องสำเร็จ: ผลลัพธ์ที่หายไป ถูกยกเลิก ถูกข้าม อยู่ระหว่างดำเนินการ และไม่ทราบสถานะ ไม่สามารถยืนยัน PASS ได้ การจำแนกประเภทเป็น docs-only หรือ catalog-only ที่ถูกต้องสามารถทำให้เลนโค้ดไม่เกี่ยวข้องได้; PR แบบร่างไม่ใช่แคนดิเดตที่ได้รับการยอมรับ ป้ายกำกับ `hotfix` ไม่ได้ยกเว้นหลักฐาน

ทั้งสองเวิร์กโฟลว์ครอบคลุม PR ที่เข้า�สาขา main/release, การ push ไปยัง `main`, การสั่งรันด้วยมือ และเหตุการณ์ merge-group การ push, dispatch และ merge-group จะรันการเลือกแบบเต็ม การ push ไปยัง `release/**` จะไม่เริ่มเวิร์กโฟลว์เหล่านี้ (2026-10-18): แต่ละการเปลี่ยนแปลงได้รันเมทริกซ์บน PR ของตนแล้ว และชุดค่าผสมที่ merge แล้วเป็นหน้าที่ของ Release-Green (`docs/ops/RUNNER_BOX.md` → เลน Hosted) ฟอร์กและ merge group ใช้โฮสต์едรันเนอร์สำหรับงานที่ปกติเลือกใช้ self-hosted runner; ต้องตรวจสอบความจุของโฮสต์едให้เพียงพอก่อนการเปิดใช้งาน

ใบรับผล JSON แต่ละใบระบุ SHA ที่เช็กเอาต์, การรันเวิร์กโฟลว์ และหมายเลขครั้งที่พยายาม CLI จะปฏิเสธหาก SHA ของ checkout และของเหตุการณ์ไม่ตรงกัน การทดสอบเวิร์กโฟลว์ผูกสมาชิกภาพของนโยบายเข้ากับรายการ `needs` ของงานตัดสิน เพื่อให้เลนที่เพิ่มใหม่หรือถูกลบไม่สามารถหายไปอย่างเงียบ ๆ ได้ ใบรับผลครอบคลุมเฉพาะเวิร์กโฟลว์ของตนเอง ไม่ครอบคลุมการเผยแพร่ การดีพลอย หรือภายในของตัวสแกนแบบให้คำแนะนำที่มีอยู่ การเปิดใช้ชื่อเช็กทั้งสองในกฎของสาขาเป็นการเปลี่ยนแปลงเชิงธุรการแยกต่างหาก; การเพิ่มงานเหล่านี้ไม่ได้ป้องกันสาขาโดยตัวมันเอง

### บัญชีรายการสแกนแบบสแตติก

บัญชีรายการ npm-alias แบบมีเวอร์ชันและสมาชิกภาพของการสแกนแบบสแตติกอยู่ใน `config/quality/gate-manifest.json` รัน `npm run check:gate-manifest` เพื่อตรวจสอบชื่อสคริปต์และคำสั่งแบบตรงตัวเทียบกับ `package.json`; การเพิ่ม การลบ และคำสั่งที่คลาดเคลื่อนจะทำให้ทั้งฮุกในเครื่องและงานจำแนกการเปลี่ยนแปลงใน CI ล้มเหลว alias ไม่ใช่งานเวิร์กโฟลว์, อินสแตนซ์เมทริกซ์ หรือกรณีทดสอบ: จำนวนเหล่านี้ต้องไม่ถูกนำเสนอว่าแทนกันได้

ใช้ `npm run quality:scan -- --list` หรือ `npm run quality:scan:fast -- --list` เพื่อตรวจดู alias ที่ถูกเลือกโดยไม่ต้องเรียกใช้งาน ตัวรันจะเรียกใช้ entrypoint ของ npm ดังนั้นรันไทม์ของมัน (รวมถึง Bun ในที่ที่มีการกำหนดค่า) จึงยังคงอยู่ manifest บันทึก alias ที่อยู่นอกโปรไฟล์เหล่านั้นว่าถูกเรียกใช้แยกต่างหาก และคำสั่งบำรุงรักษาถูกห้ามในโปรไฟล์สแกนแบบอ่านอย่างเดียว

โปรไฟล์เหล่านี้ครอบคลุมเฉพาะการสแกนแบบสแตติก ไม่ได้รับรองการทดสอบผลิตภัณฑ์ ความครอบคลุม การแพ็กเกจ การตรวจสอบภายนอก หรือการยอมรับการรีลีสเต็มรูปแบบของแคนดิเดต การรับเข้าเวิร์กโฟลว์ใช้ `config/quality/admission-policy.json` และ `scripts/quality/admission-verdict.mjs` ที่ลิงก์ไว้ โปรไฟล์ release-observer ยังคงแยกจากกัน; ให้ตรวจสอบเช็กและใบรับผลที่เกี่ยวข้องของมันแยกต่างหาก บัญชีรายการแบบร้อยแก้วด้านล่างเป็นเพียงข้อมูลอ้างอิง ไม่ใช่หลักฐานว่าเกตได้รันจริง

สคริปต์อยู่ภายใต้ `scripts/check/` (เกตนโยบาย) และ `scripts/quality/` (เอนจิน ratchet) แหล่งความจริงของ CI คือ `.github/workflows/ci.yml`

### เส้นทางเร็วสำหรับ PR รีลีส (`quality.yml`)

`.github/workflows/quality.yml` เสริม CI สำหรับ PR ที่เข้า main/release, การ push ไปยัง `main`, dispatch และ merge group PR ใช้การตรวจสอบแบบเร็วที่กรองตามพาธ การสร้างซ้ำที่ปิดใช้งานแบบถาวรได้ถูกลบออกแล้ว; การตรวจสอบ build/package/boot จริงยังคงอยู่ใน CI

| งาน                                              | ขอบเขต                                                                                                                                                                                                            | การบล็อก        |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | PR แบบ docs/โค้ด; การอ้างอิง API docs และ docs-all                                                                                                                                                                | ใช่             |
| `Fast Quality Gates`                             | PR แบบโค้ด; การตรวจสอบแบบสแตติก, typecheck, typecheck ของแดชบอร์ด, ยูนิตเทสต์ที่ได้รับผลกระทบ                                                                                                                     | ใช่             |
| `Forgotten sibling tests`                        | PR แบบโค้ด; โมดูลที่เปลี่ยนแปลงถูกติดตามไปยังผู้บริโภคแบบสแตติกและยูนิตเทสต์พี่น้องที่เป็นแคนดิเดต; พาธแบบ barrel และ dynamic-import ถูกรายงานเป็น diagnostic แบบให้คำแนะนำ พร้อมข้อยกเว้นใน allowlist ที่อ้างถึง | **ให้คำแนะนำ**  |
| `Vitest (fast-path)`                             | PR แบบโค้ด; ชุดทดสอบ vitest แบบเร็ว                                                                                                                                                                               | ใช่             |
| `Unit Tests fast-path`                           | PR แบบโค้ด; ชุดยูนิตเทสต์แบบ 4 shard                                                                                                                                                                              | ใช่             |
| `No new ESLint warnings`                         | PR แบบโค้ด; ตัวป้องกัน lint ที่ตระหนักถึงการ suppress                                                                                                                                                             | ใช่ รวมถึงฟอร์ก |
| `Merge integrity (changelog + generated skills)` | PR ที่ไม่ใช่ร่าง; changelog และการซิงก์สกิลที่สร้างขึ้น                                                                                                                                                           | ใช่ รวมถึงฟอร์ก |

#### รายงาน forgotten sibling tests

`npm run check:forgotten-sibling-tests` ใช้ import resolver ตัวเดียวกับที่อยู่เบื้องหลัง test-impact map
สำหรับ production module ทุกตัวที่มีการเปลี่ยนแปลง คำสั่งนี้จะรายงานห่วงโซ่
`changed module/symbol -> static consumer -> candidate sibling test` แบบกำหนดได้ (deterministic) เมื่อ candidate
test ไม่มีอยู่ใน diff ของ pull request สรุปแบบ Markdown และผลลัพธ์ JSON จะถูกเก็บไว้เป็น
workflow artifact ชื่อ `forgotten-sibling-tests` เพื่อใช้ปรับเทียบ (calibration) ก่อนที่จะนำไปใช้ในรูปแบบที่บล็อกการทำงาน

Barrel re-exports และ dynamic imports เป็นเพียงข้อมูลวินิจฉัยของการ resolution เท่านั้น ไม่เคยสร้าง
finding ที่บล็อก ข้อยกเว้นที่ผ่านการทบทวนจะอยู่ใน
`config/quality/forgotten-sibling-allowlist.json` แต่ละรายการต้องระบุชื่อ consumer และ candidate
test ให้เหตุผลที่เฉพาะเจาะจง และลิงก์ไปยัง GitHub issue หรือ pull request รายการที่มีรูปแบบไม่ถูกต้องจะ
fail closed ข้อยกเว้นไม่สามารถปิดกั้น candidate test ที่ถูกลบไปแล้ว หรือ diff ที่เพิ่ม `.skip`/`.todo` ได้
การลดทอน assertion และการปกปิดรูปแบบอื่นยังคงเป็นความรับผิดชอบของ
gate `check:test-masking` ซึ่งบล็อกอย่างอิสระ

### งาน: `lint`

ทำงานกับทุก PR ที่เปิดเข้าสู่ `main` บล็อกการ merge เมื่อล้มเหลว

| สคริปต์ (`npm run ...`)           | ตรวจสอบ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | การบล็อก                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`              | เวอร์ชันของ Node.js อยู่ในช่วงที่รองรับ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ใช่                                      |
| `check:cycles`                    | การ import แบบวงกลม (circular imports) ทั่วทั้ง `src/` + `open-sse/` (อิง AST และ resolve tsconfig `paths` แล้ว) การรันแบบ bare จะ exit 1 เมื่อใดก็ตามที่พบ cycle (fail-closed ตั้งแต่ #15281) และจะแสดงรายการ SCC ทั้งหมด `check:cycles:ratchet` (ซึ่งเป็นตัวที่ CI รัน) จะบล็อกเมื่อจำนวนสูงเกินเพดาน `metrics.cycles` ใน `quality-baseline.json` — ปัจจุบันคือ 14, `direction: down` จึงลดลงได้เท่านั้น (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ใช่ (ratchet)                            |
| `check:boundary`                  | การ coupling ของ `open-sse → src`: การ import แบบไฟล์ต่อไฟล์ที่ไม่ซ้ำกันจาก engine เข้ามาใน app (`scripts/quality/measure-boundary.mjs`; รายการ edge คือ backlog สำหรับการแก้ไข core/module-split ของ v4) แบบ bare = รายงานเชิงแนะนำ (advisory) (เหมือนกับ `quality:boundary`) `check:boundary:ratchet` (ซึ่งเป็นตัวที่ CI รัน และอยู่ในลูป ratchet ของ fast-gates ใน `quality.yml` ด้วย) จะบล็อกเมื่อจำนวนสูงเกินเพดาน `metrics.boundaryOpenSseToSrc` ใน `quality-baseline.json` — กำหนดค่าเริ่มต้นที่ 771 ตามที่วัดได้, `direction: down`; `--update` จะลดค่าได้เท่านั้น; เปรียบเทียบกับ base บน PR (`--base-ref`, ดูด้านล่าง)                                                                                                                                                                                                                                                                                                | ใช่ (ratchet)                            |
| `check:route-validation:t06`      | มี Zod schema ครบทุก route (นโยบาย Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ใช่                                      |
| `check:any-budget:t11`            | จำนวน `@ts-expect-error // any` ไม่เกินงบประมาณที่กำหนด (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                      |
| `check:provider-consistency`      | ทุก provider ใน `providers.ts` ต้องมีรายการที่ตรงกันใน `providerRegistry.ts` (และในทางกลับกัน ภายใต้ allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                      |
| `check:model-lifecycle`           | ตาราง routing ทั้งสามที่ดูแลด้วยมือต้องสอดคล้องกับ lifecycle snapshot ที่เช็คอินไว้ (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ต้องไม่ให้คะแนน id ที่ถูกปลดระวาง (retired) ใด ๆ ที่ `REGISTRY` สามารถ route ไปถึงได้; ทุก target ของ `BUILT_IN_ALIASES` ต้องมีอยู่ใน `REGISTRY` และต้องไม่อยู่ใน snapshot ของ id ที่ถูกปลดระวาง; ทุก id ที่ถูกปลดระวางซึ่งยังคงอยู่ใน `REGISTRY` ต้องถูก forward ต่อหรือถูกระบุไว้ใน `allowedRetiredInCatalog`; และต้องไม่มี source หรือ target ใดของ `DEFAULT_DEGRADATION_MAP` ที่ปรากฏว่าถูกปลดระวางใน snapshot นั้น การตรวจสอบนี้ไม่ได้พิสูจน์ว่าโมเดลกำลังให้บริการโดย upstream ที่ทำงานอยู่จริง ออฟไลน์ — เปรียบเทียบกับ `config/quality/model-lifecycle.json` ซึ่งรีเฟรชด้วยมือผ่านคำสั่ง `npm run quality:refresh-model-lifecycle` (ใช้เครือข่าย; ไม่ได้เชื่อมต่อเข้ากับ CI) `allowedRetiredInCatalog` เป็น burn-down ratchet: เพิ่มรายการได้เฉพาะเมื่อมี tracking issue กำกับเท่านั้น | ใช่                                      |
| `check:fetch-targets`             | ทุก `fetch("/api/...")` ใน `src/` ฝั่ง client ต้อง resolve ไปยัง `route.ts` ที่มีอยู่จริง                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                      |
| `check:deps`                      | dependency ทั้งหมดที่ติดตั้งได้ด้วย `npm install` จากทุก `package.json` ใน repo ต้องอยู่ใน `dependency-allowlist.json`; package ใหม่ที่ไม่ได้ pin เวอร์ชันหรือเข้าข่าย slopsquat จะถูกแจ้งเตือน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                      |
| `audit:deps`                      | `npm audit` (root + electron) — ไม่มี advisory ระดับ high/critical (ซ้อนทับกับ osv `check:vuln-ratchet`; ดู Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                      |
| `check:lockfile`                  | ความสมบูรณ์ของ `package-lock.json` — registry ผ่าน https, แฮช integrity, ไม่มีการ override host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                      |
| `check:licenses`                  | allowlist ของใบอนุญาต SPDX สำหรับ production dependencies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                      |
| `check:tracked-artifacts`         | ไม่มี build artifacts / symlinks ของ `node_modules` ที่ถูก commit (รันใน husky pre-commit ด้วย; pre-push เบาโดยตั้งใจ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่                                      |
| `check:ai-attribution`            | ไม่มี trailer `Co-Authored-By` จาก AI/bot หรือ footer ที่แสดงว่าสร้างโดย AI ใน commit ของ PR, title หรือ body — กฎเด็ดขาดข้อที่ 16 (อยู่ในลูป fast-gates ของ `quality.yml` สำหรับ PR→`release/**` — อ่าน event payload และไม่ทำอะไรเมื่อไม่ใช่ PR — และเป็นขั้นตอนเฉพาะ PR ใน lint ของ `ci.yml` สำหรับ PR→`main`; รวมถึง hook `commit-msg` ของ husky; อนุญาต co-author ที่เป็นมนุษย์; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | ทุก exclusion ของ Vitest ต้องระบุ tracking issue และต้องปรากฏใน `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ใช่                                      |
| `check:file-size`                 | ไฟล์ source (`.ts`/`.tsx` ใน `src/`, `open-sse/`, `electron/`, `bin/`) ต้องอยู่ในขีดจำกัด `cap` และไฟล์ test (`*.test.ts(x)`) ต้องอยู่ใน `testCap`; ไฟล์ที่ถูก freeze ไว้ใน `file-size-baseline.json` (`frozen` / `testFrozen`) ต้องไม่ใหญ่เกินขนาดที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                      |
| `check:error-helper`              | การตอบกลับข้อผิดพลาดใน executors/handlers ใช้ `buildErrorBody()` / `sanitizeErrorMessage()` (กฎบังคับข้อที่ 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                      |
| `check:migration-numbering`       | ไฟล์ SQL สำหรับ migration ถูกกำหนดหมายเลขตามลำดับต่อเนื่อง ไม่มีช่องว่างหรือหมายเลขซ้ำกัน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                      |
| `check:public-creds`              | ไม่มีการเขียน OAuth `client_id`/`client_secret` หรือคีย์ Firebase Web แบบ literal นอกไฟล์ `publicCreds.ts` (กฎบังคับข้อที่ 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่                                      |
| `check:db-rules`                  | ไม่มี raw SQL นอกโมดูล `src/lib/db/`; ไม่มีการ barrel-import จาก `localDb.ts` (กฎบังคับข้อที่ 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ใช่                                      |
| `check:known-symbols`             | Provider executors, routing strategies และ translators ที่ลงทะเบียนใน dispatch tables ของตนตรงกับไฟล์ที่มีอยู่บนดิสก์ — ไม่มี symbol ที่ไม่มีเจ้าของหรือไม่ได้ประกาศไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ใช่                                      |
| `check:route-guard-membership`    | ทุก route ที่สร้าง child process จะถูกจำแนกประเภทโดย `isLocalOnlyPath()` (กฎบังคับข้อที่ 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                      |
| `check:test-discovery`            | ทุกไฟล์ `*.test.ts` / `*.spec.ts` ในรีโปถูกเก็บโดย test runner อย่างน้อยหนึ่งตัว (ratchet: รายการ orphan ใน `test-discovery-baseline.json` ลดลงได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                      |
| `check:agent-skills-sync`         | อาร์ติแฟกต์ agent-skills ที่ถูกสร้างขึ้นตรงกับแค็ตตาล็อกต้นทาง (ไม่มีความคลาดเคลื่อน)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | โลโก้/แอสเซ็ตของผู้ให้บริการมีรายการ provenance ที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `lint:json`                       | ไฟล์คอนฟิก JSON สามารถพาร์สได้และผ่านกฎ lint ของรีโป                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | การคอมไพล์ TypeScript โดยไม่มีข้อผิดพลาด (มีเพียงคำเตือนแบบ advisory)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ใช่                                      |
| `typecheck:noimplicit:core`       | `noImplicitAny` แบบเข้มงวด — เป็นการมองไปข้างหน้า; ยังมี call site ที่มีอยู่เดิมจำนวนมากที่ยังต้องเพิ่ม annotation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ที่จำกัดขอบเขตเฉพาะ `src/app/(dashboard)/**` (#7033) — allowlist 27 ไฟล์ที่คัดสรรของ `typecheck:core` ไม่รวม dashboard TSX ใด ๆ และ `next build` ก็ไม่เคย type-check ส่วนนี้เช่นกัน (`next.config.mjs` ตั้งค่า `ignoreBuildErrors: true`) ดังนั้น regression ของ orphaned-identifier ในส่วนนั้น (#6625/#6909) จึงมองไม่เห็นจาก CI ส่วน diff จะเทียบกับ baseline จำนวนต่อไฟล์/ต่อ TS-code ที่ถูก freeze ไว้ (`config/quality/dashboard-typecheck-baseline.json` รูปแบบการบังคับใช้แบบ stale เดียวกับ `check:known-symbols`) — เฉพาะข้อผิดพลาดใหม่ที่เกินจำนวนใน baseline เท่านั้นที่จะทำให้ gate ล้มเหลว; ปรับ ratchet ลงด้วย `--update` เมื่อข้อผิดพลาดที่มีอยู่เดิมถูกแก้ไขแล้ว                                                                                                                                                                                                                                          | ใช่                                      |

### Job: `quality-gate`

ทำงานหลังจาก `test-coverage` บล็อกการ merge เมื่อล้มเหลว

| สคริปต์                      | ตรวจสอบ                                                                                                                                                                  | บล็อกการ merge                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `quality:collect`            | สร้าง `quality-metrics.json` (จำนวน warning ของ ESLint, coverage จากรายงาน shard ที่รวมกัน)                                                                              | ใช่ (เป็นขั้นตอนก่อนหน้า ratchet) |
| `quality:ratchet`            | เมตริกแต่ละตัวใน `quality-baseline.json` ไม่ถดถอย (ESLint warnings ≤ ค่า baseline; coverage ≥ ค่า baseline)                                                              | ใช่                               |
| `check:duplication`          | การทำซ้ำของโค้ด (jscpd@4) ไม่เกินค่า baseline ใน `quality-baseline.json`                                                                                                 | ใช่                               |
| `check:complexity`           | cyclomatic complexity ระดับไฟล์ไม่เกินเพดานที่กำหนด (ESLint core `complexity` + `max-lines-per-function`)                                                                | ใช่                               |
| `check:cognitive-complexity` | ratchet ของ cognitive complexity (`eslint-plugin-sonarjs`) — เป็นการรัน ESLint แยกต่างหาก; CI รันทั้งสองอันรวมกันเป็นสเต็ปเดียวชื่อ `check:complexity-ratchets`          | ใช่                               |
| `check:dead-code`            | ratchet ของ exports / ไฟล์ที่ไม่ได้ใช้งาน (knip) ไม่ถดถอยเมื่อเทียบกับ baseline                                                                                          | ใช่                               |
| `check:compression-budget`   | งบประมาณของ benchmark การบีบอัด — ค่าขั้นต่ำของการประหยัด token ต่อ engine แต่ละตัวต้องไม่ถดถอย                                                                          | ใช่                               |
| `check:type-coverage`        | ratchet ของเปอร์เซ็นต์โค้ดที่มี type (`type-coverage`) ไม่ถดถอย; ครอบคลุม `typecheck:noimplicit:core` ไปเป็นส่วนใหญ่                                                     | ใช่                               |
| `check:codeql-ratchet`       | จำนวน CodeQL alert ที่ยังเปิดอยู่ไม่ถดถอย (อ่านผ่าน `gh api`; ข้ามแบบ graceful เมื่อไม่มี token) — รอบการ refresh และการ trigger ด้วยตนเอง: ดู "CodeQL ratchet" ด้านล่าง | ใช่                               |

### Job: `quality-extended`

ทั้ง job เป็นแบบ advisory (`continue-on-error: true`) ratchet ที่ใช้ npm จะรันจริง
ส่วน scanner ภายนอกจะติดตั้งผ่าน `gh release download` และข้ามตัวเอง (exit 0)
เมื่อยังไม่มี binary

| สคริปต์                  | ตรวจสอบ                                                                                                                                                                                                                         | บล็อกการ merge                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:circular-deps`    | ไม่มี circular dependencies (dpdm)                                                                                                                                                                                              | **เป็นเพียงคำแนะนำ**                     |
| `check:bundle-size`      | ขนาด bundle ไม่เกินเพดานที่กำหนด                                                                                                                                                                                                | **เป็นเพียงคำแนะนำ**                     |
| `check:secrets`          | การสแกน secret (gitleaks) — ข้ามหากไม่มี binary                                                                                                                                                                                 | **เป็นเพียงคำแนะนำ**                     |
| `check:vuln-ratchet`     | ช่องโหว่ของ dependency (osv-scanner) ไม่ถดถอย — ข้ามหากไม่มี binary                                                                                                                                                             | **เป็นเพียงคำแนะนำ**                     |
| `check:workflows`        | lint ของ workflow (actionlint + zizmor); scanner ที่หายไป/ใช้ไม่ได้ รายงานที่ไม่ถูกต้อง หรือ baseline ของ ratchet ที่หายไป จะ fail ในสถานะ INCOMPLETE ส่วนผลตรวจที่ถูกต้องจะเป็นไปตามนโยบาย strict/advisory/ratchet ที่เลือกไว้ | จำเป็นต้องรัน; zizmor ratchet บล็อกใน CI |
| `check:openapi-breaking` | การเปลี่ยนแปลงแบบ breaking ต่อสัญญา public API (`openapi.yaml`) เมื่อเทียบกับ base branch (oasdiff) — ส่งออก `openapiBreaking=N`; ข้ามหากไม่มี oasdiff หรือ resolve base spec ไม่ได้                                            | **เป็นเพียงคำแนะนำ**                     |

### Job: `docs-sync-strict`

รันในทุก PR ที่เข้าสู่ `main` บล็อกการ merge เมื่อล้มเหลว

| Script                         | ตรวจสอบ                                                                                                                                                    | บล็อก                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Meta-gate ที่รัน sub-gate ทั้ง 6 ตัวด้านล่างตามลำดับ                                                                                                       | ใช่                         |
| ↳ `check:docs-sync`            | ความสอดคล้องกันของเวอร์ชันระหว่าง CHANGELOG / OpenAPI / llm.txt                                                                                            | ใช่                         |
| ↳ `check:docs-counts`          | ตัวเลขในเนื้อความ (จำนวน provider, จำนวน migration ฯลฯ) อยู่ภายในช่วง ratchet ของตัวเลขจริง                                                                | ใช่                         |
| ↳ `check:env-doc-sync`         | env var ทุกตัวใน `.env.example` ได้รับการบันทึกไว้ในตารางเอกสาร และในทางกลับกัน                                                                            | ใช่                         |
| ↳ `check:deprecated-versions`  | ไม่มีสตริงเวอร์ชันที่เลิกใช้แล้วในเอกสาร                                                                                                                   | ใช่                         |
| ↳ `check:doc-links`            | ลิงก์ markdown ภายในในเอกสารชี้ไปยังไฟล์จริง (รูปแบบ `[text]`/`(path)`)                                                                                    | ใช่                         |
| ↳ `check:fabricated-docs`      | route, env var, คำสั่ง CLI, ชื่อ hook และ file path ที่อ้างถึงในเอกสารมีอยู่จริงในโค้ดเบส เป็น hard gate ผ่าน `--strict`; ทำแบบ soft-fail เมื่อไม่ใส่ flag | ใช่ (ผ่าน `--strict` ใน CI) |
| `check:cli-i18n`               | สตริงคำสั่ง CLI มีอยู่ในไฟล์ locale ของ i18n ทั้งหมด                                                                                                       | ใช่                         |
| `check:openapi-coverage`       | OpenAPI spec ครอบคลุม route จริงอย่างน้อยตามระดับขั้นต่ำที่กำหนดแบบ ratchet                                                                                | ใช่                         |
| `check:openapi-security-tiers` | annotation ของ security tier ใน `openapi.yaml` สอดคล้องกับการจัดประเภทใน `routeGuard.ts`                                                                   | **เป็นเพียงคำแนะนำ**        |
| `check:openapi-routes`         | ทุก path ใน `openapi.yaml` ชี้ไปยัง `route.ts` จริง (ป้องกันการ hallucinate)                                                                               | ใช่                         |
| `check:docs-symbols`           | การอ้างอิง `/api/...` ทุกจุดใน `docs/**/*.md` ชี้ไปยัง `route.ts` จริง (ป้องกันการ hallucinate)                                                            | ใช่                         |
| `i18n translation drift`       | key ที่ยังไม่ได้แปลในไฟล์ locale ของ i18n — เตือนเท่านั้น                                                                                                  | **เป็นเพียงคำแนะนำ**        |

### งาน: `i18n-ui-coverage`

| Script                             | ตรวจสอบ                                                                                                                                                                          | บล็อก                |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `check-ui-keys-coverage` (อินไลน์) | ความครอบคลุมของ i18n key ของ UI ต้อง ≥ 65%                                                                                                                                       | ใช่                  |
| `check-ui-value-drift` (อินไลน์)   | **value** ภาษาอังกฤษที่ถูกเขียนใหม่ต้องไม่ทิ้งคำแปลที่ล้าสมัยไว้                                                                                                                 | ใช่                  |
| `check-new-key-coverage` (อินไลน์) | key ภาษาอังกฤษ**ใหม่**ต้องถูกแปลในทุก locale — ปฏิเสธ marker `__MISSING__:`                                                                                                      | ใช่                  |
| `check-translation-ratio`          | อัตราส่วนการแปลจริงต่อ locale (leaf ที่เหมือนกับภาษาอังกฤษ / เป็น placeholder / หายไป ซึ่งอยู่นอก allowlist) ต้องไม่เกิน `config/quality/i18n-translation-baseline.json` + slack | **เป็นเพียงคำแนะนำ** |

ต้องใช้ `fetch-depth: 0` — gate ตรวจ value-drift จะ diff `en.json` เทียบกับ merge base

#### `check-ui-value-drift` — gate ป้องกันคำแปลล้าสมัย

จับการถดถอยของ i18n ประเภทเดียวที่ gate อื่นมองไม่เห็นตามโครงสร้าง: เมื่อ value ภาษาอังกฤษ
ถูกเขียนใหม่ แต่คำแปลที่มาจากภาษาอังกฤษ_เวอร์ชันก่อนหน้า_ยังคงค้างอยู่ ทำให้ผู้ใช้
ที่ไม่ได้ใช้ภาษาอังกฤษยังคงอ่านข้อความที่เขียนอย่างมั่นใจแต่กลายเป็นข้อมูลที่ผิดไปแล้ว

ปัญหานี้เคยเกิดขึ้นจริง `oauthModal.googleOAuthWarning` ถูกเขียนใหม่เมื่อตัวช่วยล็อกอิน Antigravity
ถูกเพิ่มเข้ามา (#5203); **39 จาก 43 locale** ยังคงมีข้อความบอกให้ผู้ดูแล "copy the
full URL and paste it below" — ซึ่งเป็นขั้นตอนที่ทำไม่สำเร็จสำหรับ provider นั้น ปัญหานี้
ไม่มีใครสังเกตเห็นจนกระทั่ง #8463 เพราะ:

- `sync-ui-keys` จะเติมเฉพาะ key ที่**ไม่มีอยู่**เท่านั้น ไม่เคยเติม key ที่**ล้าสมัย**;
- `check-ui-keys-coverage` นับเฉพาะ_การมีอยู่_ของ key ดังนั้นคำแปลที่ล้าสมัยจึงถูกนับว่าครอบคลุมแล้ว;
- `check-translation-drift` ติดตามเอกสารมิเรอร์ที่ `docs/i18n/<locale>/**.md` —
  ไม่เคยอ่าน `src/i18n/messages/*.json` บล็อกในงาน `docs-sync-strict` ตั้งแต่
  การ re-sync ช่วง 2026-09: แก้ไขเอกสารหลัก → `npm run i18n:run -- --files=<doc>` (ระดับ section ใช้ทรัพยากรน้อย)

**Diff-aware ไม่ใช่ baseline-backed** ระบบเปรียบเทียบ `en.json` ที่ merge base กับ
working tree สำหรับทุก key ที่ค่าภาษาอังกฤษเปลี่ยนไป locale ใดก็ตามที่ยังคงเก็บ
การแปลเดิมที่ไม่ได้แตะต้องไว้ถือว่าเก่า (stale) สิ่งนี้จงใจ **แช่แข็งหนี้ที่มีอยู่เดิม** — diff
ไม่สามารถเปิดเผยได้ว่าการแปลที่อยู่มานานนั้นมาจากภาษาอังกฤษเวอร์ชันเก่าใด ดังนั้น gate จึงตัดสิน
เฉพาะสิ่งที่การเปลี่ยนแปลงปัจจุบันแตะต้องเท่านั้น ทางเลือกอื่น (baseline แบบ hash ต่อ key) จะมีต้นทุน
เป็นไฟล์ที่ generate ขนาด ~600 KB ซึ่งใหญ่กว่า baseline ที่มีอยู่เดิมที่ใหญ่ที่สุดถึง 3 เท่า และจะเปลี่ยนแปลงทุกครั้งที่มี i18n PR

มีสองวิธีในการผ่าน gate นี้:

1. อัปเดตการแปลที่ได้รับผลกระทบ หรือ
2. ตั้งค่าเป็น `__MISSING__:<new english>` — runtime จะเสิร์ฟภาษาอังกฤษที่แก้ไขแล้ว
   (`src/i18n/request.ts::deepMergeFallback`, #7258) และ key จะเข้าคิวรอการแปล

หาก **ความหมาย** ของสตริงเปลี่ยนไป ควร **เปลี่ยนชื่อ key**: key ใหม่ไม่สามารถสืบทอด
การแปลที่เก่าได้ นั่นคือรูปแบบที่ #8463 ใช้

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

จะ exit 0 พร้อมกับ `SKIP reason=base-unresolved` เมื่อไม่สามารถอ่าน base catalog ได้ (shallow
clone ที่ไม่มี base ref) ซึ่งสอดคล้องกับพฤติกรรมของ `check-openapi-breaking`

### Job: `i18n`

เมทริกซ์การตรวจสอบ i18n แบบเต็ม (หนึ่ง job ต่อหนึ่ง locale) ทั้ง job เป็นแบบ advisory

| Script                          | ตรวจสอบ                            | Blocking                                            |
| ------------------------------- | ---------------------------------- | --------------------------------------------------- |
| `validate_translation.py quick` | ความสมบูรณ์ของการแปลในแต่ละ locale | **Advisory** (`continue-on-error: true` บนทั้ง job) |

### Job: `pr-test-policy`

ทำงานเฉพาะบน pull request เท่านั้น

| Script                 | ตรวจสอบ                                                                                                                                       | Blocking |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR ที่เปลี่ยนแปลง production code ใน `src/`, `open-sse/`, `electron/` หรือ `bin/` ต้องมีหรืออัปเดต test (Hard Rule #8)                        | Yes      |
| `check:test-masking`   | ไฟล์ test ที่เปลี่ยนแปลงต้องไม่ลดจำนวน assert สุทธิหรือเพิ่ม tautology อย่าง `assert.ok(true)`                                                | Yes      |
| `check:pr-evidence`    | เนื้อหา PR ต้องอ้างอิงหลักฐาน test/VPS สำหรับการเปลี่ยนแปลง (ทำให้ Hard Rule #18 เป็นกลไกโดยการ grep เนื้อความใน PR — เปราะบาง ดูที่ Backlog) | Yes      |

### Job: `test-vitest`

ทำงานหลัง `build` บล็อกการ merge เมื่อล้มเหลว

| Suite            | ตรวจสอบ                                                  | Blocking                                                                                                          |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — vitest runner | Yes                                                                                                               |
| `test:vitest:ui` | UI component test — vitest runner                        | **Blocking** — failure ที่มีอยู่เดิมถูกยกเว้นไว้อย่างชัดเจนใน `vitest.config.ts`; failure ใหม่จะทำให้ job ล้มเหลว |

### Nightly workflow (ทำงานตามกำหนดเวลา, แบบ advisory)

workflow เหล่านี้ทำงานตาม cron schedule (และ `workflow_dispatch`) ไม่เคยทำงานบน PR ทั้งหมดเป็นแบบ advisory

| Workflow               | ตรวจสอบ                                                                                                                                                      | Blocking     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `nightly-property`     | property test ด้วย fast-check พร้อม random seed + จำนวน run สูง                                                                                              | **Advisory** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                        | **Advisory** |
| `nightly-llm-security` | promptfoo injection guard (โหมด block) + garak probe (ข้ามเมื่อไม่มี provider secret)                                                                        | **Advisory** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) กับ OmniRoute ที่ทำงานอยู่จริงโดยใช้ `docs/openapi.yaml` — เปิดเผยการละเมิด spec / 500 ที่ไม่ได้ handle (Fase 8 B.4) | **Advisory** |
| `nightly-mutation`     | คะแนน mutation-testing ของ Stryker บน fast unit lane — mutant ที่รอดชีวิตจะเปิดเผย assert ที่อ่อนแอ                                                          | **Advisory** |
| `nightly-compat`       | เมทริกซ์ความเข้ากันได้ของ Node engine ครอบคลุมช่วง `engines.node` ที่รองรับ                                                                                  | **Advisory** |

Performance baseline (heap, TTFB, เวลา build) ถูกบันทึกไว้ ไม่ได้ใช้เป็น gate: ดูที่ [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`)

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
