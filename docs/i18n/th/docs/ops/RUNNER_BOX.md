# Self-Hosted Runner Box Operations (.113 pool) (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

พูลแบบโฮสต์เองทำงานอยู่บนเครื่อง **.113** (`tomni-proxmox-113`) ตั้งแต่ 2026-10-18 รันเนอร์
OmniRoute แต่ละตัวมี **บทบาทเดียว** ป้ายกำกับเดียว และงบหน่วยความจำ/CPU ที่ปรับขนาดตามปริมาณงาน
ที่วัดได้ สล็อต Turbopack ได้รับทรัพยากรตามที่บิลด์ต้องใช้ ส่วนสล็อตอื่นได้รับการปรับขนาดตาม
ค่าสูงสุดที่วัดได้ เครื่องจะจัดสรรทรัพยากรเกินจริงเฉพาะเมื่อบิลด์ Turbopack เกิดขึ้นพร้อมกับบิลด์
webpack ของ Release-Green และงาน lint โดย swap ของโฮสต์ (16 GB) จะรองรับส่วนเกินนั้น และเนื่องจาก
Build ของ pull request ทำงานบนรันเนอร์แบบ hosted สล็อต Turbopack จึงว่างเกือบตลอดเวลา:

| รันเนอร์             | ป้ายกำกับ         | บทบาท                                                                                                                                             | `MemoryHigh` / `MemoryMax` | `CPUQuota`  |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `omniroute-113-5`    | `omni-build`      | บิลด์ Turbopack: `ci.yml` `Build` (เฉพาะ push/dispatch), Docker amd64, `npm-publish`, `nightly-v4-build`, `preview-artifact` และบิลด์ a11y รายคืน | 56 GB / 60 GB (swap 0)     | 1600 %      |
| `omniroute-113-6`    | `omni-release`    | Release-Green (`release-green` + `main-green`), บิลด์ webpack                                                                                     | 20 GB / 24 GB (swap 4 GB)  | 800 %       |
| `omniroute-113-2`    | `omni-light`      | งานรายคืน (Schemathesis, promptfoo, garak, k6) และ `quality.yml` `lint-guard`                                                                     | 12 GB / 16 GB (swap 4 GB)  | 600 %       |
| `omniroute-113`      | `omni-light`      | พูลเดียวกับด้านบน                                                                                                                                 | 8 GB / 12 GB               | 400 %       |
| OmniHeuris, OmniMind | (รีโพของแต่ละตัว) | เฉพาะ Dependabot (สูงสุดตัวละ 155 MB, 2026-10-18)                                                                                                 | 4 GB / 6 GB                | ตัวละ 200 % |

วัดเมื่อ 2026-10-18:

| ทรัพยากร  | ค่า                   | ความหมายต่อการจัดตารางงาน                                                                                                                                                                                                                                                                                                                                                                                 |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **78 GB / 32 คอร์**   | บิลด์ Turbopack สำหรับ production มีค่าสูงสุด 49 GB เมื่อไม่จำกัด (`tests/unit/ci-build-bundler-webpack.test.ts`); บน Next 16.3.8 เฉพาะขั้นตอน compile ใช้ค้างอยู่ที่ ~40 GB (RSS 36 GB ใน `next-build` รวมกับ loader worker 17 ตัวที่ตัวละ 3 GB วัดเมื่อ 2026-10-18); บิลด์ webpack อยู่ที่ ~14–16 GB บิลด์ Turbopack หนึ่งงานกับบิลด์ webpack หนึ่งงานทำงานร่วมกันได้ แต่บิลด์ Turbopack สองงานทำไม่ได้ |
| swap      | 16 GB                 | `omniroute-113-5` ทำงานโดยปิด swap (`MemorySwapMax=0`) ดังนั้นบิลด์ที่ใช้ทรัพยากรผิดปกติจะถูกหยุดที่ขีดจำกัดของมันแทนที่จะทำให้เครื่องใช้ swap                                                                                                                                                                                                                                                            |
| `/tmp`    | **tmpfs 12 GB = RAM** | ทุกอย่างที่เก็บไว้ในนั้นใช้หน่วยความจำ โดยไฟล์ตกค้างจะถูกล้างหลังจาก 3 ชม.                                                                                                                                                                                                                                                                                                                                |
| CPU       | พบโหลด 60 บน 32 คอร์  | ก่อนกำหนดโควตา บิลด์ Turbopack หนึ่งงาน (~1166 % CPU) ร่วมกับชุดทดสอบ coverage บนเครื่องเดียวกันทำให้สัญญาณ heartbeat ของ listener ตัวอื่นขาดช่วง (`The self-hosted runner lost communication`, #16853)                                                                                                                                                                                                   |
| รันเนอร์  | **listener 6 ตัว**    | OmniRoute 4 ตัว + OmniHeuris + OmniMind; `omniroute-113-3/-4/-7/-8` ถูกปิดใช้งาน (`systemctl enable --now` จะเปิดกลับมาหนึ่งตัว)                                                                                                                                                                                                                                                                          |

ขีดจำกัดอยู่ใน `/etc/systemd/system/actions.runner.<…>.service.d/override.conf` ของแต่ละ unit
(ค่าเดิมเก็บไว้เป็น `override.conf.bak-20261018`) และถูกนำไปใช้ขณะระบบทำงานด้วย
`systemctl set-property --runtime … MemoryHigh=… MemoryMax=… CPUQuota=…` — ไม่มีการรีสตาร์ต จึงไม่มี
งานที่กำลังทำงานได้รับผลกระทบ ป้ายกำกับเปลี่ยนผ่าน runners API
(`gh api -X DELETE repos/<repo>/actions/runners/<id>/labels/<label>` /
`gh api -X POST repos/<repo>/actions/runners/<id>/labels -f 'labels[]=<label>'`) ขณะระบบทำงานเช่นกัน

## ติดตั้ง janitor (ครั้งเดียวบนเซิร์ฟเวอร์)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): ทุก 30 นาที บันทึกล็อกไปยัง /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

จำเป็นต้องมี `lsof`: janitor จะยืนยันว่าพาธไม่มีการใช้งานด้วยสแนปช็อตรายการไฟล์ที่เปิดอยู่หนึ่งครั้งก่อนลบ และหากไม่มีเครื่องมือนี้ ระบบจะไม่ลบอะไรเลยพร้อมแจ้งให้ทราบ
(exit 1) ให้ลองการเปลี่ยนแปลงใดๆ ด้วย `--dry-run` ก่อน — ระบบจะแสดงสิ่งที่จะทำอย่างละเอียดและจะไม่แก้ไขสิ่งใด

สิ่งที่ทำในแต่ละครั้ง: กวาดล้างไฟล์ตกค้างของเราเอง (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) หลังจาก **3 ชม. บน tmpfs** และ 24 ชม. บนดิสก์
`_work/_temp`; หยุด `next-build` ที่มีอายุมากกว่า 75 นาที (ไม่มีงานใดทำงานนานขนาดนั้น — เมื่อ
2026-08-27 มีงานหนึ่งทำงานนาน 70 นาทีหลังจาก GitHub ประกาศว่างานสูญหายไปแล้ว); ลบ
checkout ที่เก่ากว่า 48 ชม. ของ runner ซึ่ง unit **หยุดทำงาน**; แจ้งเตือนเมื่อดิสก์ ≥ 85%, memory PSI
`full/avg60` ≥ 10% และมี listener มากกว่า `MAX_ACTIVE_RUNNERS` (พร้อมแจกแจงเป็น
omniroute/อื่นๆ) Exit 1 = ต้องตรวจสอบ; อ่านล็อก

กฎ 75 นาทีตรวจไม่พบบิลด์ที่ GitHub ยกเลิกการติดตามไปแล้ว เมื่อ
`Runner.Listener` ไม่สามารถต่ออายุงานได้ `_diag/Runner_*.log` จะแสดง
`POST request to …/renewjob timed out after 100 seconds`, API จะรายงานว่างาน `completed`
(ล้มเหลว) ประมาณสิบนาทีหลังจากการต่ออายุสำเร็จครั้งล่าสุด และ `next-build` จะยังคงทำงานต่อไป
โดยไม่มีงานผูกอยู่ (2026-10-18: Build ของ #17066 ล้มเหลวเมื่อ 19:43 และบิลด์ของงานดังกล่าวยังคง
ครองพื้นที่ 40 GB ในอีกห้านาทีต่อมา) ยืนยัน ref ใน `_diag/Worker_*.log` ไฟล์ล่าสุด จากนั้น
ส่ง SIGTERM เฉพาะไปยังแผนผังโปรเซสของบิลด์ตาม PID — `next-build`, `npm run build`, `build-next-isolated.mjs` และ
worker ใน `_work` ห้ามแตะต้อง `Runner.Listener`, `RunnerService.js` หรือ `Runner.Worker`:
worker จะรายงานว่างานถูกยกเลิก และ listener จะกลับมาออนไลน์เอง

## Unit ของ runner: KillMode

`KillMode=process` ค่าเริ่มต้นของ runner จะปล่อยให้ `Runner.Worker → npm → next-build`
ทำงานต่อไปเมื่อ unit ถูกหยุดหรือรีสตาร์ต — บิลด์กำพร้าจะยังคงใช้ RAM และ
CPU โดยไม่มีงานผูกอยู่ OmniRoute unit ทุกตัวมี drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
ที่กำหนด `KillMode=mixed`: ส่ง SIGTERM ไปยัง listener ก่อน แล้วจึงส่ง SIGKILL ไปยัง cgroup ทั้งหมดเมื่อถึง
`TimeoutStop` การตั้งค่านี้จะมีผลเมื่อรีสตาร์ต unit ครั้งถัดไป — รีสตาร์ต **ครั้งละหนึ่ง runner
และเฉพาะเมื่อไม่มีงานอยู่เท่านั้น** โดยให้การตรวจสอบว่าไม่มีงานและการรีสตาร์ตอยู่ในคำสั่งเดียวกัน

## กฎการปฏิบัติงาน

- **การบิลด์ Turbopack ครั้งละหนึ่งงาน — บังคับใช้ด้วยเลเบล** ทุกงานที่เรียกใช้ Turbopack แบบเต็มรูปแบบ
  `next build` จะกำหนดเป้าหมายเป็น `[self-hosted, omni-build]` และมีเพียง **`omniroute-113-5`** เท่านั้นที่มี
  เลเบลนี้ ได้แก่ `ci.yml` `Build`, `npm-publish.yml` `publish`, `nightly-v4-build`, `preview-artifact`,
  บิลด์ a11y รายคืน (#16853) และ **amd64** ของ `docker-publish.yml` (webpack ภายใน BuildKit —
  Turbopack เกิด panic ที่นั่นในรัน 33253576569) ส่วน Docker ฝั่ง arm64 ยังคงทำงานบน `ubuntu-24.04-arm`
  `docker-publish` ฝั่ง amd64 ใช้กลุ่ม concurrency `heavy-build-main` ร่วมกับ `ci.yml` `Build`
  (`cancel-in-progress: false`) ต้องมี Docker Engine บน `omniroute-113-5` สล็อต Turbopack
  สล็อตที่สองไม่สามารถรองรับได้ภายใน 78 GB (2 × 33–37 GB บวกกับส่วนที่เหลือของเครื่อง) สล็อตที่สองจะปลอดภัย
  เฉพาะสำหรับบิลด์ webpack เท่านั้น
- **บิลด์ของ Pull Request ทำงานบน hosted runner (2026-10-18)** `ci.yml` `Build` จะไปถึง `omni-build` เฉพาะสำหรับ
  `push` และ `workflow_dispatch` ส่วน `pull_request` ทุกกรณี (ไม่ว่าจะมาจาก origin เดียวกันหรือ fork) และบิลด์
  `merge_group` จะทำงานบน `ubuntu-latest` ด้วย webpack เมื่อ PR จาก origin เดียวกันทุกอันถูกส่งไปยังสล็อต
  บิลด์ Turbopack จะยึดสล็อตไว้นาน 29–58 นาที มีบิลด์ 18 งานเข้าคิวรอนานสูงสุด 18 ชั่วโมง และบิลด์ push
  ของสายรีลีสเองได้ใช้สล็อตเพียงหนึ่งครั้งจาก 40 งาน เมื่อทำงานบน hosted runner บิลด์ PR เดิมใช้เวลา
  8–12 นาทีควบคู่ไปกับงานอื่นของ PR ส่วน Turbopack ซึ่งเป็น bundler ที่ `npm-publish` เผยแพร่
  ยังคงได้รับการทดสอบบนสายรีลีสผ่านบิลด์ a11y รายคืนของ branch เริ่มต้น (04:41 UTC), ผ่านบิลด์จากทุก
  push หรือ dispatch ที่ไปถึงสล็อต และผ่าน `npm-publish` เอง
  `tests/unit/build/heavy-build-queue.test.ts`
  ตรึงเงื่อนไขทั้งสี่ข้อไว้
- **ห้ามกำหนดขนาดสล็อต Turbopack ต่ำกว่าความต้องการที่วัดได้** เมื่อ 2026-10-18 เวลา 18:06 สล็อตถูก
  ลดจาก 56G/60G เป็น 40G/44G เพื่อเพิ่มพื้นที่ให้ `omni-release` ช่วง compile ค้างอยู่ที่
  `MemoryHigh` ตลอดทั้งรัน (memory PSI `full` 30–43 %) และ `Runner.Listener` ซึ่งใช้ cgroup
  ร่วมกันไม่สามารถต่ออายุงานได้ ค่า 56G/60G ที่เจ้าของกำหนดไว้เมื่อ 2026-10-17 ถูกคืนกลับภายใน
  วันเดียวกัน หากต่ำกว่าค่านี้ บิลด์จะไม่ล้มเหลว แต่จะเกิดการ thrash และงานจะสูญหาย
- **Release-Green มีสล็อตของตัวเอง (2026-10-18)** ก่อนหน้านั้นการตรวจสอบ Release-Green ทั้งสองแบบทำงาน
  บน `omni-build` ได้แก่ ทุก push (~10 ครั้ง/ชั่วโมง โดยรันจาก push 97 จาก 100 ครั้งถูกยกเลิกกลางคัน
  ภายในหนึ่งวัน) และการกวาดตรวจแบบเต็มประมาณ 2 ชั่วโมงวันละสามครั้ง (การกวาดตรวจเวลา 05:29 รอสล็อตนาน
  6 ชั่วโมง) — สล็อตบิลด์เพียงสล็อตเดียวถูกใช้งานเกินความจุหลายเท่า และบิลด์ PR จาก origin เดียวกันต้องรอ
  หลายชั่วโมง ขณะนี้ `release-green` และ `main-green` กำหนดเป้าหมายเป็น `omni-release`
  (เฉพาะ `omniroute-113-6`) พร้อม `OMNIROUTE_USE_TURBOPACK=0` และรันที่เริ่มแล้วจะไม่ถูกยกเลิก
  เมื่อมี push ใหม่กว่าอีกต่อไป (สล็อตที่รอดำเนินการยังคงยุบงานจำนวนมากให้เหลือเพียงงานล่าสุด)
  `tests/unit/build/runner-capacity-routing.test.ts`
  ตรึงการกำหนดเส้นทาง การสลับไปใช้ webpack และเงื่อนไขที่ว่าไม่มีสิ่งใดบน `omni-release` บิลด์ด้วย Turbopack
- **พูลสำหรับงานเบา: `omni-light`** `omniroute-113` และ `omniroute-113-2` ใช้รันงานรายคืนที่ต้องการ
  `next build` เฉพาะ backend (~5–6 GB; webpack) และ `quality.yml` `lint-guard` โดย `omniroute-113`
  เคยมี `MemoryHigh=4G` จนถึง 2026-10-18 — บิลด์ promptfoo ต้อง reclaim หน่วยความจำไปตลอด 54 นาที
  บนเครื่องนั้น การเพิ่มเป็น 8 GB ช่วยขจัดการควบคุมความเร็วนี้
- **ตั้งใจให้มี listener น้อยลง** OmniRoute สี่ unit ถูกปิดใช้งานเมื่อ 2026-08-29 — listener ที่เพิ่มขึ้นแต่ละตัว
  คือ tenant เพิ่มอีกหนึ่งรายสำหรับงบประมาณหน่วยความจำข้างต้น เพดานของ janitor คือ 6 (`MAX_ACTIVE_RUNNERS=6` ใน cron) โดยจะนับ
  `Runner.Listener` ทุกตัวบนเครื่อง และ OmniHeuris + OmniMind เพิ่มอีกสองตัวจากสี่ตัวของเรา
- **ห้ามล้าง `/tmp` หรือ `_work` ด้วยตนเองขณะที่ runner ใดก็ตามกำลังทำงาน** การ
  ตรวจสอบก่อนแล้วค่อยลบโดยมีช่วงห่างระหว่างสองขั้นตอน คือสาเหตุที่ทำให้งาน Build ที่กำลังทำงานสูญเสีย
  `_work` เมื่อ 2026-08-27 ส่วน janitor จะตรวจสอบและลบภายในขั้นตอนเดียว
  ปล่อยให้ janitor จัดการ
- การหยุด runner กลางงานจะยกเลิกงาน (พบจากระบบจริง): ใช้ `systemctl stop` เฉพาะ
  เมื่อ listener ไม่มี process ลูก `Runner.Worker` — และต้องทำภายในคำสั่งเดียว
- Workflow ต้องไม่เก็บ artefact ไว้ใน `/tmp` (พื้นที่นี้อยู่ใน RAM) ให้ดาวน์โหลดไปยัง
  `$RUNNER_TEMP` (อยู่บนดิสก์และแยกตาม runner) — artefact `next-build` ขนาด 1.3 GB ใช้เวลา 27–32
  นาทีในการเขียนลง tmpfs และใช้เวลา 2 นาทีในการอัปโหลดจากดิสก์
- VPS `.15` ใช้สำหรับ homologation เท่านั้น — ห้ามใช้รัน CI runner โดยเด็ดขาด

## ช่องทางแบบโฮสต์ (รันเนอร์ที่โฮสต์โดย GitHub)

บัญชีใช้แผน **Pro** ซึ่งรองรับ **งานแบบโฮสต์พร้อมกัน 40 งาน** โดยใช้ร่วมกันระหว่างการตรวจสอบ PR ทั้งหมด
เวิร์กโฟลว์ทั้งหมดที่ทริกเกอร์จากการพุช และการตั้งค่าเริ่มต้นของ CodeQL จากการวัดเมื่อ 2026-10-18 ระหว่าง
แคมเปญการผสานโค้ด (~10 การผสาน/ชั่วโมงบน `release/v3.8.52`) พบว่า: **มีการสร้างการรันเวิร์กโฟลว์ 2,500 ครั้งใน
24 ชม.**, มีการพุชไปยังบรานช์ 44 ครั้งใน 6 ชม., **มีงานแบบโฮสต์เข้าคิว 106 งาน** ขณะที่การตรวจสอบ PR ต้องรอ
หลายชั่วโมง และ PR ถูกผสานโดยไม่มีผลการตรวจสอบเหล่านั้น มีเวิร์กโฟลว์เก้ารายการทำงานทุกครั้งที่พุชไปยังบรานช์:

| ต่อการพุชไปยัง `release/v*`                 | งานแบบโฮสต์ | ผลลัพธ์ระหว่างช่วงงานถาโถม                                      | ตั้งแต่ 2026-10-18                                                                        |
| ------------------------------------------- | ----------: | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `ci.yml` (เมทริกซ์เต็มรูปแบบ)               |   สูงสุด 30 | ถูกยกเลิกโดยการพุชครั้งถัดไป 24 จาก 24 ครั้งในหนึ่งวัน          | ไม่เริ่มทำงานเมื่อพุชไปยัง `release/**` (การรันของ PR + Release-Green)                    |
| `quality.yml`                               |          ~6 | ถูกยกเลิก 23 จาก 23 ครั้ง                                       | ไม่เริ่มทำงานเมื่อพุชไปยัง `release/**`                                                   |
| `Release-Green` `--quick`                   |           0 | ทำงานบน `omni-build` และถูกยกเลิก 97 จาก 100 ครั้ง              | สล็อต `omni-release` ไม่ถูกยกเลิก และรวมการรันที่รอดำเนินการเข้าด้วยกัน                   |
| `Lock released branch`, `OpenSSF Scorecard` |           2 | มีการรันที่เข้าคิวหนึ่งรายการต่อการพุช                          | หนึ่งการรันต่อ ref (`tests/unit/build/hosted-lane-concurrency.test.ts`)                   |
| `Release acceptance` (รายงานเงา)            |           1 | มี `npm ci` แบบโฮสต์หนึ่งครั้งต่อการพุช และไม่ถูกยกเลิก         | ไม่เปลี่ยนแปลง — เป็นตัวเลือกสำหรับตัวกรอง `paths:`                                       |
| `Publish to Docker Hub` → `Deploy to VPS`   |           2 | ถูกยกเลิกในแต่ละการพุช โดยขา amd64 แข่งขันใช้ `omni-build`      | ไม่เปลี่ยนแปลง — ช่องทางปรับใช้ของเจ้าของ                                                 |
| การตั้งค่าเริ่มต้นของ CodeQL (`dynamic`)    |           4 | `javascript-typescript`, `actions`, `c-cpp`, `python` ต่อการพุช | ไม่เปลี่ยนแปลง — การตั้งค่า → ความปลอดภัยของโค้ด; `c-cpp`/`python` ไม่ได้สแกนสิ่งใดที่นี่ |

`tests/unit/build/push-storm-diet.test.ts` กำหนดทริกเกอร์จากการพุชของ `ci.yml` และ
`quality.yml` ให้ทำงานเฉพาะกับ `main` ผลข้างเคียงคือ Codecov จะไม่ได้รับการอัปโหลดฐานต่อการพุช release อีกต่อไป (ขั้นตอนนี้
มีไว้เพื่อให้ข้อมูลและใช้ `continue-on-error`) ส่วนเกตความครอบคลุมภายในรีโพซิทอรีและความคิดเห็นใน PR
ไม่ได้รับผลกระทบ

**การเพิ่มความจุแบบ self-hosted ไม่ได้แก้ปัญหาคิวแบบโฮสต์** devbox
(`devbox-vm-06-dev002`, 24 vCPU / 54 GB) สามารถโฮสต์รันเนอร์ได้ แต่เซสชันของเอเจนต์ทำให้โหลดอยู่ที่
20–26 อยู่แล้ว คอนเทนเนอร์ของเอเจนต์ไม่มี Docker daemon และช่องทางที่อิ่มตัวคือช่องทางแบบโฮสต์
เครื่อง `.113` มีพื้นที่ว่าง 71 GB และโหลด 5–8 ในช่วงเวลาเดียวกัน ข้อจำกัดของเครื่องนี้คือ
งบประมาณหน่วยความจำต่อ listener ข้างต้น (สูงสุด 6 listeners) ไม่ใช่ CPU ส่วนแนวทางที่เหลือเป็น
ด้านกระบวนการ ได้แก่ นำ PR ของแคมเปญเข้าไปรวมผ่านคิว Mergify (`label=queue` โดยแต่ละแบตช์ใช้
การรัน CI ของ `merge_group` ร่วมกันหนึ่งครั้ง แทนที่จะรันหนึ่งครั้งต่อ PR บวกหนึ่งครั้งต่อการพุช), ลดภาษา
ในการตั้งค่าเริ่มต้นของ CodeQL และกรอง `release-acceptance.yml` ตามไฟล์ที่เวิร์กโฟลว์อ่าน
