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

## บัญชีรายการ Gate และโปรไฟล์การทำงาน

### การรับผู้สมัครเข้า

เวิร์กโฟลว์ CI และ Quality Gates ต่างก็ส่งผลการตัดสินที่คงที่: `Gate / CI` และ
`Gate / Quality` นโยบายการรับเข้าที่มีเวอร์ชันจะระบุงาน upstream ทุกงานว่าเป็นงานที่จำเป็นหรืองานให้ข้อมูล งานที่จำเป็นและใช้ได้ต้องทำงานสำเร็จ: ผลลัพธ์ที่ขาดหาย ถูกยกเลิก ถูกข้าม อยู่ระหว่างรอ และไม่ทราบค่า ไม่สามารถยืนยัน PASS ได้ การจัดประเภทเป็น docs-only หรือ catalog-only ที่ถูกต้องสามารถทำให้ code lane ไม่อยู่ในขอบเขตที่ใช้ได้; PR แบบร่างไม่ถือเป็นผู้สมัครที่ยอมรับได้ ป้ายกำกับ `hotfix` ไม่ยกเว้นการแสดงหลักฐาน

เวิร์กโฟลว์ทั้งสองครอบคลุม PR ที่ส่งเข้า main/release branches, การ push ไปยัง
`main`, การ dispatch ด้วยตนเอง และเหตุการณ์ merge-group การ push, dispatch และ merge-group จะรันการเลือกทั้งหมด การ push ไปยัง `release/**` จะไม่เริ่มการทำงานเหล่านี้ (2026-10-18): การเปลี่ยนแปลงแต่ละรายการรันเมทริกซ์ไปแล้วบน PR ของตน และชุดค่าที่ merge แล้วเป็นหน้าที่ของ Release-Green (`docs/ops/RUNNER_BOX.md` → Hosted lane) Fork และ merge group ใช้ hosted runners สำหรับงานที่โดยปกติจะเลือก self-hosted
runners; ต้องตรวจสอบให้แน่ใจว่ามีความจุของ hosted runners เพียงพอก่อนเปิดใช้งาน

ใบรับรอง JSON แต่ละรายการจะระบุ SHA ที่ checkout, workflow run และ attempt
CLI จะปฏิเสธเมื่อ checkout/event SHA ไม่ตรงกัน การทดสอบเวิร์กโฟลว์จะผูกสมาชิกภาพของนโยบายกับรายการ `needs` ของงาน verdict เพื่อไม่ให้ lane ที่เพิ่มหรือนำออกหายไปโดยไม่มีการแจ้งเตือน ใบรับรองครอบคลุมเฉพาะเวิร์กโฟลว์ของตนเอง ไม่รวมการเผยแพร่ การดีพลอย หรือรายละเอียดภายในของ advisory scanner ที่มีอยู่ การเปิดใช้งานชื่อการตรวจสอบทั้งสองรายการใน branch rules เป็นการเปลี่ยนแปลงด้านการดูแลระบบที่แยกต่างหาก; การเพิ่มงานเหล่านี้ไม่ได้ทำให้ branch ได้รับการปกป้องโดยตัวมันเอง

### บัญชีรายการ static scan

บัญชีรายการ npm-alias ที่มีเวอร์ชันและสมาชิกของ static-scan อยู่ใน
`config/quality/gate-manifest.json` รัน `npm run check:gate-manifest` เพื่อตรวจสอบชื่อสคริปต์และคำสั่งที่ตรงกันทุกประการกับ `package.json`; การเพิ่ม การนำออก และ command drift จะทำให้ทั้ง local hook และงาน change-classification ใน CI ล้มเหลว alias ไม่ใช่ workflow job, matrix instance หรือ test case: ห้ามนำจำนวนเหล่านี้ไปนำเสนอราวกับเป็นสิ่งที่ใช้แทนกันได้

ใช้ `npm run quality:scan -- --list` หรือ `npm run quality:scan:fast -- --list`
เพื่อตรวจสอบ alias ที่เลือกโดยไม่เรียกใช้งาน runner จะเรียกใช้ npm entrypoint ดังนั้น runtime ของมัน (รวมถึง Bun เมื่อมีการกำหนดค่าไว้) จะยังคงเดิม
manifest จะบันทึก alias ที่อยู่นอกโปรไฟล์เหล่านั้นเป็นรายการที่เรียกใช้แยกต่างหาก และคำสั่ง maintenance จะถูกห้ามในโปรไฟล์การสแกนแบบอ่านอย่างเดียว

โปรไฟล์เหล่านี้ครอบคลุมเฉพาะ static scan เท่านั้น ไม่ได้ยืนยัน product tests,
coverage, packaging, external checks หรือการยอมรับ release อย่างสมบูรณ์ของผู้สมัคร การรับเข้าเวิร์กโฟลว์ใช้ `config/quality/admission-policy.json` และ
`scripts/quality/admission-verdict.mjs` โปรไฟล์ Release-observer ยังคงแยกต่างหาก;
ให้ตรวจสอบ checks และ receipts ที่ใช้ได้ของโปรไฟล์เหล่านั้นโดยอิสระ รายการอธิบายด้านล่างเป็นข้อมูลอ้างอิง ไม่ใช่หลักฐานว่า gate ทำงานจริง

สคริปต์อยู่ภายใต้ `scripts/check/` (policy gates) และ `scripts/quality/` (ratchet engine)
แหล่งข้อมูลจริงของ CI คือ `.github/workflows/ci.yml`

### เส้นทางลัดสำหรับ Release PR (`quality.yml`)

`.github/workflows/quality.yml` ทำงานเสริมกับ CI บน main/release PRs, การ push ไปยัง `main`,
การ dispatch และ merge groups PR ใช้การตรวจสอบแบบรวดเร็วที่กรองตามเส้นทาง การ build ซ้ำที่ถูกปิดใช้งานถาวรถูกนำออกแล้ว; การตรวจสอบ build/package/boot ที่เป็นของจริงยังคงอยู่ใน CI

| งาน                                              | ขอบเขต                                                                                                                                                                                               | การบล็อก         |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; การอ้างอิง API docs และ docs-all                                                                                                                                                      | ใช่              |
| `Fast Quality Gates`                             | Code PRs; static checks, typecheck, dashboard typecheck, impacted unit tests                                                                                                                         | ใช่              |
| `Forgotten sibling tests`                        | Code PRs; โมดูลที่เปลี่ยนแปลงซึ่งติดตามไปยัง static consumers และ candidate sibling tests; เส้นทาง barrel และ dynamic-import จะรายงานเป็น advisory diagnostics พร้อมข้อยกเว้นใน allowlist ที่อ้างอิง | **ให้ข้อมูล**    |
| `Vitest (fast-path)`                             | Code PRs; fast vitest suite                                                                                                                                                                          | ใช่              |
| `Unit Tests fast-path`                           | Code PRs; ชุด unit suite แบบ 4-shard                                                                                                                                                                 | ใช่              |
| `No new ESLint warnings`                         | Code PRs; suppressions-aware lint guard                                                                                                                                                              | ใช่ รวมถึง forks |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; การซิงค์ changelog และ generated skill                                                                                                                                                | ใช่ รวมถึง forks |

#### รายงาน Forgotten sibling tests

`npm run check:forgotten-sibling-tests` นำตัวแก้ไขการนำเข้าเดียวกับที่อยู่เบื้องหลังแผนผังผลกระทบของการทดสอบมาใช้ซ้ำ
สำหรับโมดูลสำหรับการใช้งานจริงที่มีการเปลี่ยนแปลงทุกโมดูล ระบบจะรายงานสายโซ่
`changed module/symbol -> static consumer -> candidate sibling test` ที่กำหนดผลลัพธ์ได้แน่นอน เมื่อการทดสอบที่เป็นตัวเลือก
ไม่มีอยู่ใน diff ของ pull request โดยจะเก็บสรุป Markdown และผลลัพธ์ JSON ไว้เป็น
อาร์ติแฟกต์ของเวิร์กโฟลว์ `forgotten-sibling-tests` เพื่อปรับเทียบก่อนเปิดใช้การบล็อกใด ๆ

การส่งออกซ้ำจาก barrel และการนำเข้าแบบไดนามิกเป็นเพียงการวินิจฉัยการแก้ไขเท่านั้น โดยจะไม่สร้าง
ผลการตรวจสอบที่บล็อกการทำงานโดยเด็ดขาด ข้อยกเว้นที่ผ่านการตรวจสอบแล้วอยู่ใน
`config/quality/forgotten-sibling-allowlist.json` แต่ละรายการต้องระบุ consumer และการทดสอบที่เป็นตัวเลือก
ให้เหตุผลที่เฉพาะเจาะจง และลิงก์ไปยัง issue หรือ pull request ของ GitHub รายการที่มีรูปแบบไม่ถูกต้องจะทำให้การตรวจสอบล้มเหลวโดยปิดกั้นไว้ก่อน ข้อยกเว้นไม่สามารถยับยั้งการทดสอบที่เป็นตัวเลือกซึ่งถูกลบไปแล้ว หรือ diff ที่เพิ่ม `.skip`/`.todo` ได้ การทำให้ assertion อ่อนลงและการปกปิดรูปแบบอื่น ๆ ยังคงอยู่ภายใต้การตรวจสอบของเกต
`check:test-masking` ซึ่งบล็อกการทำงานอย่างเป็นอิสระ

### งาน: `lint`

ทำงานกับทุก PR ไปยัง `main` และจะบล็อกการรวมเมื่อทำงานล้มเหลว

| สคริปต์ (`npm run ...`)           | ตรวจสอบ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | บล็อก                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | เวอร์ชัน Node.js อยู่ภายในช่วงที่รองรับ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                     |
| `check:cycles`                    | การนำเข้าแบบวนรอบระหว่าง `src/` + `open-sse/` ทั้งหมด (อิง AST และแก้ไข `paths` ของ tsconfig แล้ว) การออกด้วยรหัส 1 แบบ Bare จะเกิดขึ้นทุกครั้งที่มีวงจรใด ๆ (ป้องกันการตรวจสอบผ่านโดยไม่ตั้งใจตั้งแต่ #15281) และจะแสดงรายการ SCC `check:cycles:ratchet` (สิ่งที่ CI เรียกใช้) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.cycles` ใน `quality-baseline.json` — ปัจจุบันคือ 14, `direction: down` ดังนั้นจึงลดลงได้เท่านั้น (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่ (ratchet)                           |
| `check:boundary`                  | การเชื่อมโยง `open-sse → src`: การนำเข้าแบบไฟล์ต่อไฟล์ที่ไม่ซ้ำกันจากเอนจินเข้าสู่แอป (`scripts/quality/measure-boundary.mjs`; รายการขอบเขตนี้คือรายการงานค้างสำหรับการแก้ไข v4 core/module-split) Bare = รายงานเชิงให้ข้อมูล (เช่นเดียวกับ `quality:boundary`) `check:boundary:ratchet` (สิ่งที่ CI เรียกใช้ และอยู่ในลูป ratchet ของ fast-gates ใน `quality.yml` ด้วย) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.boundaryOpenSseToSrc` ใน `quality-baseline.json` — ตั้งค่าเริ่มต้นที่ค่าที่วัดได้ 771, `direction: down`; `--update` จะลดค่าได้เท่านั้น; อิงความแตกต่างจาก base ใน pull request (`--base-ref` ดูด้านล่าง)                                                                                                                                                                                                                                                                                                                                                             | ใช่ (ratchet)                           |
| `check:route-validation:t06`      | มีสคีมา Zod ในทุกเส้นทาง (นโยบาย Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ใช่                                     |
| `check:any-budget:t11`            | จำนวน `@ts-expect-error // any` ต้องไม่เกินงบประมาณ (catraca ระดับ 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                     |
| `check:provider-consistency`      | ผู้ให้บริการทุกรายใน `providers.ts` มีรายการที่ตรงกันใน `providerRegistry.ts` (และในทางกลับกัน ภายใน allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                     |
| `check:model-lifecycle`           | ตารางการกำหนดเส้นทางที่ดูแลด้วยตนเองทั้งสามตารางต้องสอดคล้องกับสแนปชอตวงจรชีวิตที่เช็กอินไว้ (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ต้องไม่ให้คะแนน id ที่เลิกใช้งานแล้วซึ่ง `REGISTRY` สามารถกำหนดเส้นทางได้; เป้าหมาย `BUILT_IN_ALIASES` ทุกตัวต้องมีอยู่ใน `REGISTRY` และไม่มีอยู่ในสแนปชอต id ที่เลิกใช้งานแล้ว; id ที่เลิกใช้งานแล้วทุกตัวซึ่งยังอยู่ใน `REGISTRY` ต้องถูกส่งต่อหรือแสดงอยู่ใน `allowedRetiredInCatalog`; และไม่มี source หรือ target ของ `DEFAULT_DEGRADATION_MAP` ใดปรากฏว่าเลิกใช้งานแล้วในสแนปชอตนั้น สิ่งนี้ไม่ได้พิสูจน์ว่าโมเดลกำลังให้บริการโดย upstream ที่ยังทำงานอยู่ในปัจจุบัน ทำงานแบบออฟไลน์ — เปรียบเทียบกับ `config/quality/model-lifecycle.json` ซึ่งรีเฟรชด้วยตนเองด้วย `npm run quality:refresh-model-lifecycle` (เครือข่าย; ไม่ได้เชื่อมต่อกับ CI) `allowedRetiredInCatalog` เป็นกลไก burn-down ratchet: เพิ่มรายการได้เฉพาะเมื่อมี issue สำหรับติดตาม                                                                              | ใช่                                     |
| `check:fetch-targets`             | `fetch("/api/...")` ทุกรายใน `src/` ฝั่งไคลเอนต์ต้องแก้ไปยัง `route.ts` จริง                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                     |
| `check:deps`                      | dependency ที่ติดตั้งได้ด้วย `npm install` ทั้งหมดในทุก `package.json` ของ repo ต้องอยู่ใน `dependency-allowlist.json`; จะแจ้งเตือนแพ็กเกจใหม่ที่ไม่ได้ pin หรือเป็น slopsquatting                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                     |
| `audit:deps`                      | `npm audit` (root + electron) — ต้องไม่มีคำแนะนำด้านความปลอดภัยระดับสูงหรือวิกฤต (ซ้ำซ้อนกับ osv `check:vuln-ratchet`; ดู Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                     |
| `check:lockfile`                  | ความสมบูรณ์ของ `package-lock.json` — รีจิสทรี https, แฮชความสมบูรณ์, ไม่มีการแทนที่โฮสต์                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ใช่                                     |
| `check:licenses`                  | รายการอนุญาตสิทธิ์การใช้งาน SPDX สำหรับดีเพนเดนซีที่ใช้ในโปรดักชัน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                     |
| `check:tracked-artifacts`         | ไม่มีอาร์ติแฟกต์จากการบิลด์ / symlink ของ `node_modules` ที่ถูกคอมมิต (ทำงานใน husky pre-commit ด้วย; pre-push ตั้งใจให้ทำงานแบบเบา — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                     |
| `check:ai-attribution`            | ไม่มี trailer `Co-Authored-By` ของ AI/บอต หรือส่วนท้ายที่ระบุการสร้างด้วย AI ในคอมมิต, ชื่อเรื่อง หรือเนื้อหาของ PR — กฎเข้มงวด #16 (ในลูป fast-gates ของ `quality.yml` สำหรับ PR→`release/**` — อ่าน event payload และไม่ทำงานนอก PR — และเป็นขั้นตอนเฉพาะ PR ใน lint ของ `ci.yml` สำหรับ PR→`main`; รวมถึงฮุก `commit-msg` ของ husky; อนุญาตผู้ร่วมเขียนที่เป็นมนุษย์; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | การยกเว้น Vitest ทุกกรณีต้องระบุ issue สำหรับติดตาม และปรากฏใน `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                     |
| `check:file-size`                 | ไฟล์ซอร์ส (`.ts`/`.tsx` ใน `src/`, `open-sse/`, `electron/`, `bin/`) ต้องมีขนาดไม่เกิน `cap` และไฟล์ทดสอบ (`*.test.ts(x)`) ต้องมีขนาดไม่เกิน `testCap`; ไฟล์ที่ถูกตรึงไว้ใน `file-size-baseline.json` (`frozen` / `testFrozen`) ต้องไม่ขยายเกินขนาดที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                     |
| `check:error-helper`              | การตอบกลับข้อผิดพลาดในตัวประมวลผล/ตัวจัดการใช้ `buildErrorBody()` / `sanitizeErrorMessage()` (กฎเคร่งครัดข้อ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่                                     |
| `check:migration-numbering`       | ไฟล์ SQL สำหรับการย้ายข้อมูลมีการกำหนดหมายเลขตามลำดับ ไม่มีหมายเลขขาดหายหรือซ้ำกัน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                     |
| `check:public-creds`              | ไม่มีค่า OAuth `client_id`/`client_secret` หรือตำแหน่ง Web Key ของ Firebase แบบระบุค่าตายตัวอยู่นอก `publicCreds.ts` (กฎเคร่งครัดข้อ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ใช่                                     |
| `check:db-rules`                  | ไม่มี SQL ดิบอยู่นอกโมดูล `src/lib/db/` และไม่มีการนำเข้าจาก `localDb.ts` ผ่าน barrel (กฎเคร่งครัดข้อ #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                     |
| `check:known-symbols`             | ตัวประมวลผลของผู้ให้บริการ กลยุทธ์การกำหนดเส้นทาง และตัวแปลภาษาที่ลงทะเบียนไว้ในตาราง dispatch สอดคล้องกับไฟล์บนดิสก์ — ไม่มีสัญลักษณ์ที่ไม่มีเจ้าของหรือไม่ได้ประกาศ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ใช่                                     |
| `check:route-guard-membership`    | ทุกเส้นทางที่สร้างโพรเซสลูกจะถูกจัดประเภทโดย `isLocalOnlyPath()` (กฎเคร่งครัดข้อ #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ใช่                                     |
| `check:test-discovery`            | ไฟล์ `*.test.ts` / `*.spec.ts` ทุกไฟล์ใน repo ถูกรวบรวมโดย test runner อย่างน้อยหนึ่งตัว (ratchet: รายการไฟล์ที่ไม่มีการใช้งานใน `test-discovery-baseline.json` สามารถลดลงได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                     |
| `check:test-tla-order`            | ไม่มีไฟล์ `node:test` ภายใต้ `tests/unit` ที่ลงทะเบียนการทดสอบ พบ `await` ระดับบนสุด แล้วลงทะเบียนการทดสอบเพิ่มเติม (#18045; ratchet: `test-tla-order-allowlist.json` สามารถลดลงได้เท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                     |
| `check:agent-skills-sync`         | อาร์ติแฟกต์ agent-skills ที่สร้างขึ้นตรงกับแค็ตตาล็อกต้นทาง (ไม่มีข้อมูลคลาดเคลื่อน)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | โลโก้/แอสเซ็ตของผู้ให้บริการมีรายการแหล่งที่มาที่บันทึกไว้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | ไฟล์การกำหนดค่า JSON แยกวิเคราะห์ได้และเป็นไปตามกฎ lint ของ repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | การคอมไพล์ TypeScript โดยไม่มีข้อผิดพลาด (คำเตือนที่ไม่บังคับให้แก้ไขเท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                     |
| `typecheck:noimplicit:core`       | `noImplicitAny` แบบเข้มงวด — รองรับการพัฒนาในอนาคต โดยจุดเรียกใช้งานที่มีอยู่เดิมจำนวนมากยังต้องเพิ่มการระบุชนิดข้อมูล                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **คำแนะนำ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ที่จำกัดขอบเขตไว้ที่ `src/app/(dashboard)/**` (#7033) — allowlist 27 ไฟล์ที่คัดสรรของ `typecheck:core` ไม่รวม TSX ของ dashboard และ `next build` ก็ไม่ตรวจสอบชนิดข้อมูลเช่นกัน (`next.config.mjs` กำหนด `ignoreBuildErrors: true`) ดังนั้นการถดถอยของตัวระบุที่ไม่มีเจ้าของในส่วนนั้น (#6625/#6909) จึงไม่ปรากฏใน CI เปรียบเทียบความแตกต่างกับ baseline จำนวนต่อไฟล์/ต่อรหัส TS ที่ตรึงไว้ (`config/quality/dashboard-typecheck-baseline.json` ซึ่งใช้รูปแบบการบังคับใช้ข้อมูลเก่าค้างแบบเดียวกับ `check:known-symbols`) — เฉพาะข้อผิดพลาดใหม่ที่เกินจำนวนใน baseline เท่านั้นที่จะทำให้ gate ไม่ผ่าน; ลดค่า baseline ด้วย `--update` เมื่อแก้ไขข้อผิดพลาดที่มีอยู่เดิมแล้ว                                                                                                                                                                                                                                                                                                  | ใช่                                     |
| `check:build-typecheck`           | ตรวจสอบชนิดข้อมูลของแอปทั้งชุดในโหมด production โดยใช้ `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`) ซึ่งไม่อยู่ในขอบเขตที่ allowlist 27 ไฟล์ของ `typecheck:core` และ gate ของ dashboard ครอบคลุม เปรียบเทียบความแตกต่างกับ `config/quality/build-typecheck-baseline.json`; หากจำนวนต่อคู่ (ไฟล์, รหัส) เพิ่มขึ้นหรือมีรายการใหม่ การตรวจสอบจะไม่ผ่าน ส่วนจำนวนที่ลดลงจะขอให้คุณปรับลด baseline `--update` จะปฏิเสธขณะที่การรันมีคู่รายการใหม่หรือมีจำนวนเพิ่มขึ้น เว้นแต่จะส่ง `--force-regressions` และจะปฏิเสธไฟล์ที่ถูกทำให้เงียบใหม่ เว้นแต่จะส่ง `--force-nocheck` ดังนั้นการขยาย baseline เพื่อให้ผ่านและการให้สิทธิ์ปิดเสียงอย่างถาวรจึงเป็นการดำเนินการโดยตั้งใจสองอย่างที่แยกจากกัน ค่า `--force` แบบเดี่ยวจะถูกปฏิเสธ นอกจากนี้ยังสแกนขอบเขตการ build หา `@ts-nocheck` โดยเทียบกับ `config/quality/ts-nocheck-baseline.json` เนื่องจากไฟล์ที่ใช้สิ่งนี้จะไม่รายงาน diagnostics ใดเลย และมิฉะนั้นจะไม่ปรากฏต่อ gate ใด ๆ | ใช่                                     |

#### โปรแกรมตรวจสอบชนิดข้อมูลสองโปรแกรมให้คำตอบต่างกัน

`typecheck:core` และ `check:build-typecheck` คอมไพล์คนละโปรแกรมภายใต้ตัวเลือกที่ต่างกัน
และไฟล์เดียวกันอาจไม่มีข้อผิดพลาดในโปรแกรมหนึ่ง แต่มีข้อผิดพลาดจำนวนมากในอีกโปรแกรมหนึ่ง

`tsconfig.build.json` กำหนด `"strict": false` ดังนั้น `noImplicitAny` จึงปิดอยู่ ส่วนการกำหนดค่า core
จะคอมไพล์ allowlist 27 ไฟล์ที่คัดสรรด้วยตัวเลือกที่เข้มงวดกว่า และติดตามกราฟการนำเข้าของแต่ละรายการ
ดังนั้นไฟล์ที่ไม่เคยปรากฏในโปรแกรม build ก็ยังถูกตรวจสอบที่นั่น

ผลลัพธ์นี้สำคัญเมื่อตัดสินว่าไฟล์มีการระบุชนิดข้อมูลแล้วหรือไม่: **diagnostics เป็นศูนย์
ภายใต้ `check:build-typecheck` ไม่ได้หมายความว่าเป็นศูนย์** การถอด `@ts-nocheck` ออกจากไฟล์ 26 ไฟล์
แสดงให้เห็นว่า 23 ไฟล์ไม่มีข้อผิดพลาดในโปรแกรม build; ในจำนวนนี้สิบหกไฟล์พบข้อผิดพลาด implicit-any
ประมาณ 120 รายการในโปรแกรมแบบเข้มงวด ตรวจสอบทั้งสองโปรแกรมก่อนระบุว่าไฟล์ไม่มีข้อผิดพลาด

### งาน: `quality-gate`

ทำงานหลัง `test-coverage` และจะบล็อกการ merge หากล้มเหลว

| Script                       | Validates                                                                                                                                                                                     | Blocking               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | สร้าง `quality-metrics.json` (จำนวนคำเตือนของ ESLint, coverage จากรายงาน shard ที่รวมแล้ว)                                                                                                    | ใช่ (อยู่ก่อน ratchet) |
| `quality:ratchet`            | แต่ละเมตริกใน `quality-baseline.json` ต้องไม่ถดถอย (คำเตือนของ ESLint ≤ baseline; coverage ≥ baseline)                                                                                        | ใช่                    |
| `check:duplication`          | การทำซ้ำของโค้ด (jscpd@4) ต้องไม่เกิน baseline ใน `quality-baseline.json`                                                                                                                     | ใช่                    |
| `check:complexity`           | ความซับซ้อนแบบไซโคลแมติกระดับไฟล์ต้องไม่เกินค่าจำกัด (ESLint core `complexity` + `max-lines-per-function`)                                                                                    | ใช่                    |
| `check:cognitive-complexity` | ratchet ของความซับซ้อนเชิงการรับรู้ (`eslint-plugin-sonarjs`) — การตรวจผ่าน ESLint แยกต่างหาก; CI เรียกใช้ทั้งสองรายการรวมเป็นขั้นตอน `check:complexity-ratchets` เดียว                       | ใช่                    |
| `check:dead-code`            | ratchet ของ export / ไฟล์ที่ไม่ได้ใช้งาน (knip) ต้องไม่ถดถอยเมื่อเทียบกับ baseline                                                                                                            | ใช่                    |
| `check:compression-budget`   | งบประมาณการวัดประสิทธิภาพการบีบอัด — ค่าขั้นต่ำของการประหยัดโทเค็นแยกตาม engine ต้องไม่ถดถอย                                                                                                  | ใช่                    |
| `check:type-coverage`        | ratchet ของเปอร์เซ็นต์โค้ดที่มี type (`type-coverage`) ต้องไม่ถดถอย; โดยส่วนใหญ่ครอบคลุม `typecheck:noimplicit:core`                                                                          | ใช่                    |
| `check:codeql-ratchet`       | จำนวนการแจ้งเตือน CodeQL ที่เปิดอยู่ต้องไม่ถดถอย (อ่านผ่าน `gh api`; ข้ามอย่างเหมาะสมโดยไม่ล้มเหลวหากไม่มีโทเค็น) — ดูกำหนดการรีเฟรชและทริกเกอร์ด้วยตนเองได้ที่ "ratchet ของ CodeQL" ด้านล่าง | ใช่                    |

### งาน: `quality-extended`

ทั้งงานเป็นการให้ข้อมูลประกอบ (`continue-on-error: true`) โดยไม่บล็อก การตรวจแบบ ratchet ที่ใช้ npm จะทำงานจริง ส่วนเครื่องมือตรวจสอบภายนอกจะติดตั้งผ่าน `gh release download` และข้ามการทำงานด้วยตนเอง (exit 0) เมื่อยังไม่มีไบนารี

| Script                   | Validates                                                                                                                                                                                                                               | Blocking                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:circular-deps`    | ต้องไม่มีการพึ่งพาแบบวนรอบ (dpdm)                                                                                                                                                                                                       | **ให้คำแนะนำ**                                 |
| `check:bundle-size`      | ขนาด bundle ต้องไม่เกินค่าจำกัด                                                                                                                                                                                                         | **ให้คำแนะนำ**                                 |
| `check:secrets`          | การสแกนความลับ (gitleaks) — ข้ามการทำงานหากไม่มีไบนารี                                                                                                                                                                                  | **ให้คำแนะนำ**                                 |
| `check:vuln-ratchet`     | ช่องโหว่ของ dependencies (osv-scanner) ต้องไม่ถดถอย — ข้ามการทำงานหากไม่มีไบนารี                                                                                                                                                        | **ให้คำแนะนำ**                                 |
| `check:workflows`        | การตรวจ lint ของ workflow (actionlint + zizmor); หากเครื่องมือตรวจสอบขาดหาย/ทำงานผิดพลาด รายงานไม่ถูกต้อง หรือไม่มี baseline ของ ratchet จะล้มเหลวเป็น INCOMPLETE ผลการตรวจที่ถูกต้องจะเป็นไปตามนโยบาย strict/advisory/ratchet ที่เลือก | ต้องดำเนินการ; ratchet ของ zizmor จะบล็อกใน CI |
| `check:openapi-breaking` | การเปลี่ยนแปลงที่ทำให้เกิด breaking change ต่อสัญญา API สาธารณะ (`openapi.yaml`) เมื่อเทียบกับ branch ฐาน (oasdiff) — แสดงผล `openapiBreaking=N`; ข้ามการทำงานหากไม่มี oasdiff หรือไม่สามารถแก้ไขข้อมูลจำเพาะฐานได้                     | **ให้คำแนะนำ**                                 |

### งาน: `docs-sync-strict`

ทำงานกับทุก PR ไปยัง `main` และจะบล็อกการ merge หากล้มเหลว

| Script                         | ตรวจสอบ                                                                                                                                                           | บล็อกการทำงาน               |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | เมตาเกตที่เรียกใช้ซับเกตทั้ง 6 รายการด้านล่างตามลำดับ                                                                                                             | ใช่                         |
| ↳ `check:docs-sync`            | ความสอดคล้องของเวอร์ชัน CHANGELOG / OpenAPI / llm.txt                                                                                                             | ใช่                         |
| ↳ `check:docs-counts`          | จำนวนในข้อความบรรยาย (จำนวนผู้ให้บริการ จำนวนการย้ายระบบ ฯลฯ) อยู่ภายในช่วง ratchet ของจำนวนจริง                                                                  | ใช่                         |
| ↳ `check:env-doc-sync`         | ตัวแปรสภาพแวดล้อมทุกตัวใน `.env.example` มีการบันทึกไว้ในตารางเอกสาร และในทางกลับกัน                                                                              | ใช่                         |
| ↳ `check:deprecated-versions`  | ไม่มีสตริงเวอร์ชันที่เลิกใช้แล้วในเอกสาร                                                                                                                          | ใช่                         |
| ↳ `check:doc-links`            | ลิงก์ Markdown ภายในเอกสารชี้ไปยังไฟล์จริง (`[text]`/`(path)` form)                                                                                               | ใช่                         |
| ↳ `check:fabricated-docs`      | routes, env vars, CLI commands, hook names และ file paths ที่อ้างถึงในเอกสารมีอยู่จริงใน codebase เกตแบบเข้มงวดผ่าน `--strict`; หากไม่มีแฟล็กจะล้มเหลวแบบไม่บล็อก | ใช่ (ผ่าน `--strict` ใน CI) |
| `check:cli-i18n`               | สตริงคำสั่ง CLI มีอยู่ในไฟล์ locale ของ i18n ทั้งหมด                                                                                                              | ใช่                         |
| `check:openapi-coverage`       | สเปก OpenAPI ครอบคลุมอย่างน้อยจำนวนขั้นต่ำของ routes จริงตาม ratchet                                                                                              | ใช่                         |
| `check:openapi-security-tiers` | คำอธิบายระดับความปลอดภัยใน `openapi.yaml` สอดคล้องกับการจัดประเภทใน `routeGuard.ts`                                                                               | **เป็นคำแนะนำ**             |
| `check:openapi-routes`         | ทุก path ใน `openapi.yaml` ชี้ไปยัง `route.ts` จริง (ป้องกันการสร้างข้อมูลขึ้นเอง)                                                                                | ใช่                         |
| `check:docs-symbols`           | การอ้างอิง `/api/...` ทุกแห่งใน `docs/**/*.md` ชี้ไปยัง `route.ts` จริง (ป้องกันการสร้างข้อมูลขึ้นเอง)                                                            | ใช่                         |
| `i18n translation drift`       | คีย์ที่ยังไม่ได้แปลในไฟล์ locale ของ i18n — แจ้งเตือนเท่านั้น                                                                                                     | **เป็นคำแนะนำ**             |

SVG ทั้งสิบสองไฟล์ของ README ภายใต้ `docs/diagrams/` ถูกสร้างขึ้นโดยอัตโนมัติ (`scripts/docs/gen-readme-<name>.mjs`;
`npm run docs:readme-diagrams` จะสร้างไฟล์ทั้งหมดใหม่) แต่ละไฟล์มีการทดสอบยูนิตแบบเปรียบเทียบไบต์
(`tests/unit/docs/readme-*-svg.test.ts`, งาน `test-unit`) ซึ่งจะล้มเหลวเมื่อไฟล์ที่ commit ไว้ล้าสมัย และ `check:docs-counts` จะอ่านตัวเลขมาตรฐานจากโหนด `<text>` — นี่คือเหตุผลที่ขั้นตอนการแปลงเส้นเป็นโครงร่างเก็บสตริงที่แปลงแล้วทุกสตริงไว้ในไฟล์เป็น `<text>` ที่มองไม่เห็น การตรวจสอบตัวเลขมาตรฐานของ SVG จะอ่านไฟล์ที่ระบุไว้ใน
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg` รวมถึง `public/images/tier-flow-dark.svg` และ `tier-flow-light.svg`;
ข้ออ้างเกี่ยวกับ free-forever, catalog-entry, recurring-pool และ scoring-factors ยังอ่านจาก
`promise-pillars.svg`, `free-tier-budget.svg` และ `strategies-grid.svg` ด้วย `free-tier-budget.svg`
ดึงตัวเลขจากตัวโหลดแค็ตตาล็อกที่ใช้งานจริง ดังนั้นการเปลี่ยนแปลง `FREE_MODEL_BUDGETS` หรือชื่อที่แสดงของผู้ให้บริการจะทำให้ CI ล้มเหลวจนกว่าจะสร้างไฟล์นั้นใหม่

### งาน: `i18n-ui-coverage`

| Script                            | ตรวจสอบ                                                                                                                                                                                 | บล็อกการทำงาน   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | ความครอบคลุมคีย์ i18n ของ UI ≥ 65%                                                                                                                                                      | ใช่             |
| `check-ui-value-drift` (inline)   | การเขียน **ค่า** ภาษาอังกฤษใหม่จะไม่ทิ้งคำแปลเก่าค้างไว้                                                                                                                                | ใช่             |
| `check-new-key-coverage` (inline) | คีย์ภาษาอังกฤษ **ใหม่** ได้รับการแปลในทุก locale — การมีเครื่องหมาย `__MISSING__:` จะถูกปฏิเสธ                                                                                          | ใช่             |
| `check-translation-ratio`         | อัตราส่วนการแปลจริงต่อ locale (รายการที่เหมือนกับภาษาอังกฤษ / placeholder / รายการที่ขาดหายไปซึ่งอยู่นอก allowlist) ต้องไม่เกิน `config/quality/i18n-translation-baseline.json` + slack | **เป็นคำแนะนำ** |

ต้องใช้ `fetch-depth: 0` — เกตตรวจสอบค่าที่เปลี่ยนแปลงจะเปรียบเทียบ `en.json` กับ merge base

#### `check-ui-value-drift` — เกตตรวจสอบคำแปลที่ล้าสมัย

ตรวจจับการถดถอยของ i18n หนึ่งกรณีที่เกตอื่น ๆ ไม่สามารถมองเห็นได้ในเชิงโครงสร้าง: ค่าในภาษาอังกฤษถูกเขียนใหม่
แต่คำแปลที่สร้างจากภาษาอังกฤษ _ก่อนหน้า_ ยังคงค้างอยู่ ทำให้ผู้ใช้ที่ไม่ใช่ภาษาอังกฤษยังคงอ่านข้อความที่ใช้ถ้อยคำอย่างมั่นใจ
แต่ไม่ถูกต้องแล้ว

กรณีนี้ถูกนำไปใช้งานจริง `oauthModal.googleOAuthWarning` ถูกเขียนใหม่เมื่อส่วนช่วยล็อกอิน Antigravity
ถูกเพิ่มเข้ามา (#5203); **39 จาก 43 locale** ยังคงมีข้อความบอกผู้ปฏิบัติงานให้ "คัดลอก URL ทั้งหมดและวางไว้ด้านล่าง"
ซึ่งเป็นโฟลว์ที่ไม่สามารถดำเนินการให้เสร็จสิ้นสำหรับผู้ให้บริการรายนั้นได้ ปัญหานี้ไม่ถูกพบจนกระทั่ง #8463 เนื่องจาก:

- `sync-ui-keys` เติมเฉพาะคีย์ที่ **ไม่มีอยู่** เท่านั้น ไม่ใช่คีย์ที่ **ล้าสมัย**;
- `check-ui-keys-coverage` นับการมีอยู่ของคีย์ ดังนั้นคำแปลที่ล้าสมัยจึงยังถูกนับว่าครอบคลุม;
- `check-translation-drift` ติดตามมิเรอร์เอกสาร `docs/i18n/<locale>/**.md` —
  ไม่เคยอ่าน `src/i18n/messages/*.json` การบล็อกอยู่ในงาน `docs-sync-strict` ตั้งแต่การซิงค์ใหม่ใน
  2026-09: แก้ไขเอกสารหลัก → `npm run i18n:run -- --files=<doc>` (ระดับส่วน มีค่าใช้จ่ายต่ำ)

**ตระหนักถึง diff ไม่ใช่อาศัย baseline** เปรียบเทียบ `en.json` ที่ merge base กับ working tree;
สำหรับทุกคีย์ที่ค่าภาษาอังกฤษเปลี่ยนไป locale ใดก็ตามที่ยังมีคำแปลซึ่งไม่ได้ถูกแตะต้องจะถือว่าล้าสมัย
แนวทางนี้จงใจ **ตรึงหนี้ค้างเดิม** — diff ไม่สามารถเปิดเผยได้ว่าคำแปลที่มีมานานมาจากภาษาอังกฤษเก่าเวอร์ชันใด
ดังนั้นเกตจะตัดสินเฉพาะสิ่งที่การเปลี่ยนแปลงปัจจุบันแตะต้องเท่านั้น ทางเลือกอื่น (baseline แบบแฮชต่อคีย์)
จะมีต้นทุนเป็นไฟล์ที่สร้างขึ้นขนาดประมาณ 600 KB ซึ่งใหญ่กว่า baseline ที่มีอยู่ที่ใหญ่ที่สุด 3 เท่า และทำให้เกิดการเปลี่ยนแปลง
ในทุก PR ด้าน i18n

มีสองวิธีที่จะทำให้ผ่าน:

1. อัปเดตคำแปลที่ได้รับผลกระทบ หรือ
2. ตั้งค่าเป็น `__MISSING__:<new english>` — จากนั้น runtime จะให้บริการภาษาอังกฤษที่แก้ไขแล้ว
   (`src/i18n/request.ts::deepMergeFallback`, #7258) และคีย์จะถูกจัดคิวเพื่อแปล

หาก **ความหมาย** ของสตริงเปลี่ยนไป ให้เลือก **เปลี่ยนชื่อคีย์**: คีย์ใหม่ไม่สามารถสืบทอดคำแปลที่ล้าสมัยได้
นี่คือรูปแบบที่ #8463 ใช้

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

จบการทำงานด้วยรหัส 0 พร้อม `SKIP reason=base-unresolved` เมื่อไม่สามารถอ่านแค็ตตาล็อกฐานได้ (shallow
clone ที่ไม่มี base ref) เช่นเดียวกับ `check-openapi-breaking`

### งาน: `i18n`

เมทริกซ์การตรวจสอบ i18n แบบเต็ม (หนึ่งงานต่อ locale) งานทั้งหมดเป็นการแจ้งเตือน

| สคริปต์                         | ตรวจสอบ                       | การบล็อก                                               |
| ------------------------------- | ----------------------------- | ------------------------------------------------------ |
| `validate_translation.py quick` | ความครบถ้วนของคำแปลต่อ locale | **การแจ้งเตือน** (`continue-on-error: true` ในทั้งงาน) |

### งาน: `pr-test-policy`

ทำงานเฉพาะบน pull request เท่านั้น

| สคริปต์                | ตรวจสอบ                                                                                                                                 | การบล็อก |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR ที่เปลี่ยนโค้ดสำหรับใช้งานจริงใน `src/`, `open-sse/`, `electron/` หรือ `bin/` ต้องมีหรืออัปเดตการทดสอบ (กฎตายตัวข้อ #8)              | ใช่      |
| `check:test-masking`   | ไฟล์ทดสอบที่เปลี่ยนแปลงไม่ลดจำนวน assert สุทธิ หรือเพิ่ม tautology `assert.ok(true)`                                                    | ใช่      |
| `check:pr-evidence`    | เนื้อหา PR อ้างอิงหลักฐานจากการทดสอบ/VPS สำหรับการเปลี่ยนแปลง (ทำให้กฎตายตัวข้อ #18 เป็นกลไกโดยค้นหาข้อความใน PR — เปราะบาง ดู Backlog) | ใช่      |

### งาน: `test-vitest`

ทำงานหลัง `build` และบล็อกการ merge หากล้มเหลว

| ชุดทดสอบ         | ตรวจสอบ                                                          | การบล็อก                                                                                                           |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | เซิร์ฟเวอร์ MCP (110 เครื่องมือ), autoCombo, แคช — ตัวรัน vitest | ใช่                                                                                                                |
| `test:vitest:ui` | การทดสอบคอมโพเนนต์ UI — ตัวรัน vitest                            | **บล็อก** — ความล้มเหลวที่มีอยู่ก่อนถูกยกเว้นไว้อย่างชัดเจนใน `vitest.config.ts`; ความล้มเหลวใหม่จะทำให้งานล้มเหลว |

### เวิร์กโฟลว์รายคืน (ตามกำหนดเวลา เป็นการแจ้งเตือน)

สิ่งเหล่านี้ทำงานตามกำหนดเวลา cron (และ `workflow_dispatch`) และไม่ทำงานบน PR ทั้งหมดเป็นการแจ้งเตือน

| Workflow               | ตรวจสอบ                                                                                                                                                                 | การบล็อก    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | การทดสอบพร็อพเพอร์ตีด้วย fast-check โดยใช้ seed แบบสุ่ม + จำนวนรอบการทำงานสูง                                                                                           | **คำแนะนำ** |
| `nightly-resilience`   | เกณฑ์ heap-growth, การฉีดข้อผิดพลาดแบบ chaos, การทดสอบโหลด/ความทนทานด้วย k6                                                                                             | **คำแนะนำ** |
| `nightly-llm-security` | ตัวป้องกันการฉีดของ promptfoo (โหมดบล็อก) + โพรบของ garak (ข้ามเมื่อไม่มี secret ของ provider)                                                                          | **คำแนะนำ** |
| `nightly-schemathesis` | การ fuzz สัญญา OpenAPI (schemathesis) กับ OmniRoute ที่กำลังทำงานอยู่ โดยใช้ `docs/openapi.yaml` — ตรวจพบการละเมิดสเปก / ข้อผิดพลาด 500 ที่ไม่ได้จัดการ (ระยะที่ 8 B.4) | **คำแนะนำ** |
| `nightly-mutation`     | คะแนนการทดสอบแบบ mutation ด้วย Stryker บนเลน fast unit — mutant ที่รอดอยู่บ่งชี้ถึง assert ที่อ่อนแอ                                                                    | **คำแนะนำ** |
| `nightly-compat`       | เมทริกซ์ความเข้ากันได้ของเอนจิน Node ครอบคลุมช่วง `engines.node` ที่รองรับ                                                                                              | **คำแนะนำ** |

ค่าพื้นฐานด้านประสิทธิภาพ (heap, TTFB, เวลา build) จะถูกบันทึกไว้ ไม่ได้นำมาเป็นเกณฑ์บล็อก: ดู [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
