# Contributing to OmniRoute (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## การตั้งค่าการพัฒนา

### ข้อกำหนดเบื้องต้น

- **Node.js** `>=22.22.2 <23` หรือ `>=24.0.0 <27` (แนะนำ: 24 LTS)
- **เวลา 22.00 น** 10 +

> **Windows กับโหนด 24:** ใช้แพตช์ 24 LTS ปัจจุบัน (อย่างน้อย 24.20.0) รีลีสก่อนหน้านี้สามารถยกเลิกได้หลังจากการทดสอบสำเร็จ เมื่อ `--test-force-exit` ปิดกระบวนการ [การแก้ไข Windows libuv](https://github.com/nodejs/node/pull/61999) ของโหนดช่วยแก้ไขข้อผิดพลาดรันไทม์นี้ เปิดใช้งานการยืนยันการทดสอบและการตรวจสอบทางออกของนักวิ่ง

> **ผู้ใช้ npm v11 + (โหนด 24 +):** หลังจาก `npm install` ให้ตรวจสอบว่าติดตั้งโมดูลดั้งเดิมแล้ว: `node -e "require('better-sqlite3')"` หากล้มเหลวด้วย `MODULE_NOT_FOUND` ให้รัน `npm approve-scripts better-sqlite3 && npm install` ดู [การแก้ไขปัญหา](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)

- **คอมไพล์**

### โคลนและติดตั้ง

```bash
git clone https://github.com/cheaper-inference/OmniRoute.git
cd OmniRoute
npm install
```

### ตัวแปรสภาพแวดล้อม

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ตัวแปรสำคัญสำหรับการพัฒนา:

| ตัวแปร                 | ค่าเริ่มต้นการพัฒนา      | คำอธิบาย                    |
| ---------------------- | ------------------------ | --------------------------- |
| `PORT`                 | `20128`                  | พอร์ตเซิร์ฟเวอร์            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | ฐาน URL สำหรับส่วนหน้า      |
| `JWT_SECRET`           | (สร้างด้านบน)            | ความลับในการลงนาม JWT       |
| `INITIAL_PASSWORD`     | `CHANGEME`               | รหัสผ่านเข้าสู่ระบบครั้งแรก |
| `APP_LOG_LEVEL`        | `info`                   | บันทึกระดับคำฟุ่มเฟือย      |

### การตั้งค่าแดชบอร์ด

แดชบอร์ดมีการสลับ UI สำหรับคุณสมบัติที่สามารถกำหนดค่าผ่านตัวแปรสภาพแวดล้อมได้:

| การตั้งค่าตำแหน่ง    | สลับ                  | คำอธิบาย                                 |
| -------------------- | --------------------- | ---------------------------------------- |
| การตั้งค่า → ขั้นสูง | โหมดแก้ไขข้อบกพร่อง   | เปิดใช้งานบันทึกคำขอแก้ไขข้อบกพร่อง (UI) |
| การตั้งค่า → ทั่วไป  | การมองเห็นแถบด้านข้าง | ส่วนของแถบด้าน Show/hide                 |

การตั้งค่าเหล่านี้จะถูกเก็บไว้ในฐานข้อมูลและคงอยู่ตลอดการรีสตาร์ท โดยแทนที่ค่าเริ่มต้นของ env var เมื่อตั้งค่า

### วิ่งในพื้นที่

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ then assembleStandalone → dist/
npm run start

# Fast backend/API-only compile for contributor changes
npm run build:contributor

# Release build (clean rebuild + HEAD sentinel — required for deploy)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

โครงสร้างผู้สนับสนุนดำเนินการตรวจสอบความถูกต้องแบบคอมไพล์เท่านั้น โดยจะไม่ประกอบการแจกจ่ายแบบสแตนด์อโลนหรือสร้างสินทรัพย์บรรจุภัณฑ์ดั้งเดิมที่เป็นทางเลือก ใช้รุ่นที่ใช้งานจริงปกติเมื่อคุณต้องการตรวจสอบความถูกต้องของชุดรวมที่จัดส่งได้

### สร้างเค้าโครงเอาท์พุต

| ไดเรกทอรี | สารบัญ                                                                | ติดตามแล้ว |
| --------- | --------------------------------------------------------------------- | ---------- |
| `src/`    | แหล่งที่มาของแอปพลิเคชัน (TypeScript / TSX)                           | ใช่        |
| `.build/` | ตัวกลาง — `next build` เอาต์พุต (gitignored, `distDir = .build/next`) | เลขที่     |
| `dist/`   | มัดที่จัดส่งได้ — ประกอบโดย `assembleStandalone` (gitignored)         | เลขที่     |

ไปป์ไลน์การสร้างเป็นการส่งผ่านครั้งเดียว:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (copies standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` ยังทำความสะอาดทั้งสองไดเร็กทอรีก่อนและเขียน `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) เป็นตัวรักษาความสมบูรณ์ในการปรับใช้

`npm run build:contributor` ใช้โปรไฟล์บิลด์แบ็กเอนด์เท่านั้น โดยจะทำการ stub ไฟล์ UI แดชบอร์ดชั่วคราวในขณะที่สร้าง เก็บตัวจัดการเส้นทาง API และกู้คืนไฟล์ต้นฉบับหลังจากสร้าง ใช้ `npm run build` สำหรับการเปลี่ยนแปลงที่ส่งผลต่อแดชบอร์ด UI หรือสำหรับการตรวจสอบความถูกต้องของรีลีสทั้งหมด โปรไฟล์ผู้สนับสนุนไม่สามารถแทนที่รุ่นรุ่นได้

> **หมายเหตุการปรับใช้VPS :** ไดเรกทอรีรูปภาพระยะไกล `/usr/lib/node_modules/omniroute/app/` ไม่มีการเปลี่ยนแปลง ทักษะการปรับใช้จะซิงค์เนื้อหาของ `dist/` ลงไป เฉพาะพาธเอาต์พุตบิลด์ in-repo ที่ถูกย้าย (`app/` → `dist/`)

ค่าเริ่มต้น URLs:

- **แดชบอร์ด** : `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## เวิร์กโฟลว์ Git

> ⚠️ **ห้าม commit ไปยัง `main` โดยตรงโดยเด็ดขาด** ให้ใช้ feature branch เสมอ
>
> **ฐานของ PR:** กำหนดเป้าหมายเป็น branch `release/vX.Y.Z` ที่ใช้งานอยู่ (ไม่ใช่ `main`) โปรดดู
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) สำหรับโมเดล
> หนึ่ง branch ต่อหนึ่ง release + สร้าง tag เมื่อเผยแพร่

```bash
# สร้าง branch จากปลาย branch ของ release ที่ใช้งานอยู่ (ตัวอย่าง: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ทำการแก้ไข ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# เปิด Pull Request โดยกำหนด base = release/v3.8.49
```

### การตั้งชื่อ Branch

| Prefix      | วัตถุประสงค์                 |
| ----------- | ---------------------------- |
| `feat/`     | ฟีเจอร์ใหม่                  |
| `fix/`      | การแก้ไขบั๊ก                 |
| `refactor/` | การปรับโครงสร้างโค้ด         |
| `docs/`     | การเปลี่ยนแปลงเอกสาร         |
| `test/`     | การเพิ่ม/แก้ไขการทดสอบ       |
| `chore/`    | เครื่องมือ, CI, dependencies |

### ข้อความ Commit

ปฏิบัติตาม [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## การรันการทดสอบ

```bash
# การทดสอบทั้งหมด (ยูนิต + vitest + ระบบนิเวศ + e2e)
npm run test:all

# ไฟล์ทดสอบไฟล์เดียว (ตัวรันการทดสอบดั้งเดิมของ Node.js — การทดสอบส่วนใหญ่ใช้วิธีนี้)
node --import tsx/esm --test tests/unit/your-file.test.ts

# เฉพาะการทดสอบยูนิตที่ได้รับผลกระทบจากการเปลี่ยนแปลงของคุณ (ใช้ตัวเลือก TIA เดียวกับเกต CI, #8084)
npm run test:scoped            # การเปลี่ยนแปลงในคอมมิตล่าสุด (หรือแผนผังการทำงาน)
npm run test:scoped:staged     # เฉพาะการเปลี่ยนแปลงที่จัดเตรียมไว้ — เหมาะสำหรับใช้ร่วมกับการรันก่อนคอมมิต
npm run test:scoped:full       # สร้างแผนผังกราฟการนำเข้าใหม่ก่อน (หลังจากเพิ่ม/ย้ายไฟล์)
# Exit 1 + "รันชุดการทดสอบทั้งหมด" หมายความว่าไฟล์ศูนย์กลาง (tsconfig, package.json, …) หรือซอร์ส
# ที่ไม่มีการแมปมีการเปลี่ยนแปลง — ตัวเลือกจะหยุดอย่างปลอดภัยและจะไม่ข้ามโดยไม่แจ้งให้ทราบ

# Vitest (เซิร์ฟเวอร์ MCP, autoCombo, แคช)
npm run test:vitest

# การทดสอบ E2E (ต้องใช้ Playwright)
npm run test:e2e

# E2E สำหรับไคลเอนต์โปรโตคอล (ทรานสปอร์ต MCP, A2A)
npm run test:protocols:e2e

# การทดสอบความเข้ากันได้ของระบบนิเวศ
npm run test:ecosystem

# เกตความครอบคลุม: คำสั่ง/บรรทัด/ฟังก์ชัน/สาขา 60%
npm run test:coverage
npm run coverage:report

# ตรวจสอบ lint + รูปแบบ
npm run lint
npm run check

# การทดสอบ smoke ของคอมโบกับ upstream จริงที่มีเกตควบคุม (ต้องมีสิทธิ์เข้าถึง VPS + เครดิตจากผู้ให้บริการจริง)
# เรียกใช้ผู้ให้บริการจริง — มีค่าใช้จ่ายเล็กน้อย ห้ามรันใน CI เด็ดขาด ข้ามอย่างเรียบร้อยหากไม่มีเกต
# ต้องมี: สิทธิ์เข้าถึง ssh root@192.168.0.15 (โหลดสแนปช็อต DB แบบอ่านอย่างเดียวจาก VPS)
RUN_COMBO_LIVE=1 npm run test:combo:live

# การทดสอบ smoke แบบสดบน VPS ระยะที่ 3 — สคริปต์ Node ESM ธรรมดาที่เรียกใช้เซิร์ฟเวอร์ .15 โดยตรง
# ต้องมี: สิทธิ์เข้าถึง ssh root@192.168.0.15 (สร้าง/รื้อถอนคอมโบผ่าน SSH sqlite)
# เรียกใช้ผู้ให้บริการจริง (มีค่าใช้จ่ายเล็กน้อย) สร้าง/ลบเฉพาะคอมโบ __live_test__* เท่านั้น ห้ามรันใน CI เด็ดขาด
# REQUIRE_API_KEY=false บน .15 จึงไม่ต้องใช้คีย์ API แต่จะใช้ COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY หากกำหนดไว้
npm run test:combo:live:vps              # 7 สถานการณ์ HTTP (ลำดับความสำคัญ/วนรอบ/ถ่วงน้ำหนัก/ต้นทุน/ฟิวชัน/อัตโนมัติ + สถานะระบบ)
npm run test:combo:live:vps:failover     # เพิ่มสถานการณ์ failover ข้ามผู้ให้บริการจริง (รวมทั้งหมด 8 สถานการณ์)
```

หมายเหตุเกี่ยวกับความครอบคลุม:

- `npm run test:coverage` วัดความครอบคลุมของซอร์สสำหรับชุดการทดสอบยูนิตหลัก ไม่รวม `tests/**` และรวม `open-sse/**`
- Pull request ต้องรักษาเกตความครอบคลุมของคำสั่ง/บรรทัด/ฟังก์ชัน/สาขาไว้ที่ **60%+**
- หาก PR เปลี่ยนแปลงโค้ดสำหรับการใช้งานจริงใน `src/`, `open-sse/`, `electron/` หรือ `bin/` จะต้องเพิ่มหรืออัปเดตการทดสอบอัตโนมัติใน PR เดียวกัน
- `npm run coverage:report` แสดงรายงานโดยละเอียดแบบแยกตามไฟล์จากการรันความครอบคลุมครั้งล่าสุด
- `npm run test:coverage:legacy` เก็บรักษาเมตริกรุ่นเก่าไว้เพื่อการเปรียบเทียบย้อนหลัง
- ดูแผนงานการปรับปรุงความครอบคลุมแบบแบ่งระยะได้ที่ `docs/ops/COVERAGE_PLAN.md`

### ข้อกำหนดสำหรับ Pull Request

ก่อนเปิด PR ให้ใช้
[แนวทางมาตรฐานสำหรับการมีส่วนร่วม](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) เพื่อรันวงจรแบบเจาะจงสำหรับ
สิ่งที่คุณเปลี่ยนแปลง ชุดการทดสอบยูนิตทั้งหมด (4 ชาร์ดของ CI), Vitest, เกตความครอบคลุม **60%+** และ
บิลด์สำหรับการใช้งานจริงเป็นความรับผิดชอบของ CI — การรันสิ่งเหล่านี้ในเครื่องไม่ได้ให้ข้อมูลเพิ่มเติมนอกเหนือจากที่การตรวจสอบ PR
จะแจ้งให้คุณทราบอยู่แล้ว และบนเครื่องขนาดเล็กอาจใช้ทรัพยากรของโฮสต์จนเต็มได้ (#8084):

- รันไฟล์ทดสอบที่ครอบคลุมการเปลี่ยนแปลงของคุณ: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- รัน `npm run lint`
- เพิ่มหรืออัปเดตการทดสอบอัตโนมัติใน PR เดียวกันทุกครั้งที่มีการเปลี่ยนแปลงโค้ดสำหรับการใช้งานจริง
- ในไฟล์ `node:test` ให้วาง `await` ระดับบนสุดทั้งหมด (เช่น `await import(...)`) ไว้ก่อน `test()` / `describe()` รายการแรก: ภายใต้ `--test-force-exit` การทดสอบที่ลงทะเบียนหลังจากนั้นอาจไม่ถูกรันโดยไม่มีการแจ้งเตือน (#18045; บังคับใช้โดย `npm run check:test-tla-order`)
- ระบุไฟล์ทดสอบที่เปลี่ยนแปลงหรือเพิ่มเข้ามาในคำอธิบาย PR เมื่อมีการเปลี่ยนแปลงโค้ดสำหรับการใช้งานจริง
- ตรวจสอบผลลัพธ์ SonarQube ใน PR เมื่อมีการกำหนดค่าความลับของโปรเจกต์ใน CI

สถานะการทดสอบปัจจุบัน: **ไฟล์ทดสอบยูนิต 122 ไฟล์** ซึ่งครอบคลุม:

- ตัวแปลของผู้ให้บริการและการแปลงรูปแบบ
- การจำกัดอัตรา, circuit breaker และความยืดหยุ่นต่อความล้มเหลว
- แคชเชิงความหมาย, idempotency และการติดตามความคืบหน้า
- การดำเนินการกับฐานข้อมูลและสคีมา (โมดูล DB 21 โมดูล)
- โฟลว์ OAuth และการยืนยันตัวตน
- การตรวจสอบความถูกต้องของ endpoint API (Zod v4)
- เครื่องมือเซิร์ฟเวอร์ MCP และการบังคับใช้ขอบเขตสิทธิ์
- ระบบ Memory และ Skills

---

## รูปแบบโค้ด

- **ESLint** — รัน `npm run lint` ก่อน commit
- **Prettier** — จัดรูปแบบอัตโนมัติผ่าน `lint-staged` เมื่อ commit (เยื้อง 2 ช่อง, ใช้ semicolon, ใช้ double quote, ความกว้าง 100 อักขระ, ใช้ trailing comma แบบ es5)
- **TypeScript** — โค้ดทั้งหมดใน `src/` ใช้ `.ts`/`.tsx`; `open-sse/` ใช้ `.ts`/`.js`; เขียนเอกสารด้วย TSDoc (`@param`, `@returns`, `@throws`)
- **ห้ามใช้ `eval()`** — ESLint บังคับใช้ `no-eval`, `no-implied-eval`, `no-new-func`
- **การตรวจสอบความถูกต้องด้วย Zod** — ใช้สคีมา Zod v4 สำหรับการตรวจสอบอินพุต API ทั้งหมด
- **การตั้งชื่อ**: ไฟล์ = camelCase/kebab-case, คอมโพเนนต์ = PascalCase, ค่าคงที่ = UPPER_SNAKE

### การจัดการข้อผิดพลาด / บล็อก catch ว่าง

ห้ามปล่อย `catch` ไว้โดยไม่มีคำอธิบาย ให้จัดประเภทเป็นหนึ่งในสองกลุ่ม (เพื่อให้กฎเคร่งครัด
ที่ว่า "ห้ามกลืนข้อผิดพลาดในสตรีม SSE โดยไม่แจ้งให้ทราบ" สามารถนำไปปฏิบัติได้):

- **โดยเจตนา (การทำความสะอาด/การเก็บข้อมูล telemetry แบบพยายามให้ดีที่สุดของเราเอง)** — ความล้มเหลวในจุดนี้เป็นสิ่งที่คาดไว้และ
  ไม่เป็นอันตราย; เพิ่มความคิดเห็นอธิบายเหตุผลหนึ่งบรรทัดโดยไม่ต้องบันทึก log (การบันทึก log ในทุกคำขอคือ
  สัญญาณรบกวนที่แนวทางนี้ต้องการหลีกเลี่ยง)

  ```ts
  } catch {} // การปิด controller ที่ปิดไปแล้วหลังจากไคลเอนต์ตัดการเชื่อมต่อเป็นสิ่งที่คาดไว้
  ```

- **ควรบันทึก log (โค้ดภายนอก/โค้ดที่ผู้เรียกส่งเข้ามา หรือการกลืนข้อผิดพลาดทำให้โฟลว์การควบคุมเปลี่ยนไป)** — คง
  `catch` ไว้ (ห้ามปล่อยให้ทำให้สตรีมล้มเหลว) แต่ให้แสดง `console.debug`/`warn` พร้อมบริบทเพื่อให้
  สามารถตรวจพบความล้มเหลวได้

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

ดูตัวอย่างการนำไปใช้ได้ที่ `open-sse/utils/stream.ts` และ `open-sse/utils/streamHandler.ts`

---

## โครงสร้างโครงการ

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain modules + 130 migrations
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, 22 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 150 executor modules (executor classes + per-provider helpers)
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (110 unique tools, 3 transports, 33 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## การเพิ่ม Provider ใหม่

### ขั้นตอนที่ 1: ลงทะเบียนค่าคงที่ของ Provider

เพิ่มใน `src/shared/constants/providers.ts` — ผ่านการตรวจสอบด้วย Zod เมื่อโหลดโมดูล

### ขั้นตอนที่ 2: เพิ่ม Executor (หากต้องใช้ตรรกะแบบกำหนดเอง)

สร้าง executor ใน `open-sse/executors/your-provider.ts` โดยสืบทอดจาก executor พื้นฐาน

### ขั้นตอนที่ 3: เพิ่ม Translator (หากไม่ใช่รูปแบบ OpenAI)

สร้าง translator สำหรับคำขอ/การตอบกลับใน `open-sse/translator/`

### ขั้นตอนที่ 4: เพิ่มการกำหนดค่า OAuth (หากใช้ OAuth)

เพิ่มข้อมูลประจำตัว OAuth ใน `src/lib/oauth/constants/oauth.ts` และเพิ่ม service ใน `src/lib/oauth/services/`

หาก Provider ต้นทางเผยแพร่ OAuth `client_id`/secret สาธารณะหรือคีย์ Firebase Web API ภายใน CLI / browser bundle สาธารณะของตน **ห้าม** ฝังค่านั้นเป็น string literal ให้ใช้ `resolvePublicCred()` จาก `open-sse/utils/publicCreds.ts` และเพิ่มรายการไบต์ที่ปกปิดค่าไว้ใน `EMBEDDED_DEFAULTS` เวิร์กโฟลว์ภาคบังคับฉบับเต็มมีอธิบายไว้ใน [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)

ภายใน handler/executor ข้อความแสดงข้อผิดพลาดที่จะส่งถึงไคลเอนต์ต้องผ่าน `buildErrorBody()` / `sanitizeErrorMessage()` จาก `open-sse/utils/error.ts` — ห้ามใส่ `err.stack` หรือ `err.message` แบบดิบลงในเนื้อหาของ Response ดูรายละเอียดได้ที่ [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)

### ขั้นตอนที่ 5: ลงทะเบียนโมเดล

เพิ่มคำจำกัดความของโมเดลใน `open-sse/config/providerRegistry.ts`

### ขั้นตอนที่ 6: เพิ่มการทดสอบ

เขียน unit test ใน `tests/unit/` โดยครอบคลุมอย่างน้อย:

- การลงทะเบียน Provider
- การแปลงคำขอ/การตอบกลับ
- การจัดการข้อผิดพลาด

---

## รายการตรวจสอบ Pull Request

- [ ] การทดสอบผ่าน (`npm test`)
- [ ] การตรวจสอบ Lint ผ่าน (`npm run lint`)
- [ ] การ Build สำเร็จ (`npm run build`)
- [ ] เพิ่ม TypeScript types สำหรับ public functions และ interfaces ใหม่แล้ว
- [ ] ไม่มี secrets หรือ fallback values ที่ hardcode ไว้
- [ ] ฝัง public upstream credentials ผ่าน `resolvePublicCred()` (ดู [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)) และไม่ใช้ literals โดยเด็ดขาด
- [ ] Error responses ส่งผ่าน `buildErrorBody()` / `sanitizeErrorMessage()` — ไม่มี raw stack traces ใน response bodies (ดู [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell commands (`exec` / `spawn`) ส่ง runtime values ผ่าน `env` ไม่ใช่ผ่าน string interpolation
- [ ] ตรวจสอบ inputs ทั้งหมดด้วย Zod schemas
- [ ] เพิ่ม **fragment** ของ Changelog ภายใต้ `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` สำหรับการเปลี่ยนแปลงที่ส่งผลต่อผู้ใช้ (ดู [`changelog.d/README.md`](./changelog.d/README.md)) — **ห้าม** แก้ไข `CHANGELOG.md` โดยตรง; fragments จะถูกรวบรวมเมื่อเผยแพร่ release และจะไม่เกิด conflict ระหว่าง PRs
- [ ] อัปเดตเอกสารแล้ว (หากเกี่ยวข้อง)
- [ ] ไม่มี CodeQL / Secret-Scanning alerts ใหม่ หรือแต่ละรายการถูก dismiss พร้อมเหตุผลทางเทคนิคที่อ้างอิงเอกสาร `docs/security/` ที่เกี่ยวข้อง
- [ ] Routes ที่ spawn child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) ถูกจัดประเภทเป็น `isLocalOnlyPath()` ใน `src/server/authz/routeGuard.ts` — ดู [กฎบังคับ #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] ไม่มี trailers `Co-authored-by` ของ AI/bot ใน commit messages (กฎบังคับ #16) — human collaborators ที่นำผลงานมาใช้จะได้รับเครดิตด้วย trailers มาตรฐาน `Co-authored-by: Name <email>`

---

## การเผยแพร่

การเผยแพร่ได้รับการจัดการผ่านเวิร์กโฟลว์ `/generate-release` เมื่อมีการสร้าง GitHub Release ใหม่ แพ็กเกจจะถูก **เผยแพร่ไปยัง npm โดยอัตโนมัติ** ผ่าน GitHub Actions

สำหรับการปรับใช้บน VPS ให้ใช้ `npm run build:release` (ไม่ใช่ `npm run build`) — คำสั่งนี้จะดำเนินการบิลด์ใหม่ทั้งหมดตั้งแต่ต้น รวบรวมบันเดิลไว้ใน `dist/` และเขียนไฟล์ sentinel `dist/BUILD_SHA`
จากนั้นใช้สกิล `/deploy-vps-*-cc` ซึ่งจะใช้ rsync เพื่อซิงค์ `dist/` ไปยังไดเรกทอรี `app/` บนเซิร์ฟเวอร์ระยะไกล

---

## การขอความช่วยเหลือ

- **สถาปัตยกรรม** : ดู [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **อ้างอิง API** : ดู [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **เอกสารความปลอดภัย** : [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **เอกสารปฏิบัติการ** : [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ปัญหา** : [github.com/cheaper-inference/OmniRoute/issues](https://github.com/cheaper-inference/OmniRoute/issues)
