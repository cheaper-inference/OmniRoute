# CLAUDE.md (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**กฎของโปรเจ็กต์ทั้งหมดอยู่ใน [`AGENTS.md`](AGENTS.md)** — แหล่งความจริงแห่งเดียวสำหรับผู้ช่วย AI ทุกคน การนำเข้าด้านบนโหลดไว้แล้ว อย่าเพิ่มกฎของโครงการอีกครั้งที่นี่ ทุกอย่างด้านล่างใช้ ONLY กับ Claude Code — การปรับปรุงการปฏิบัติงานของกฎที่กำหนดไว้แล้วใน `AGENTS.md`

## การแยก Worktree — Claude รหัสเฉพาะ

- ยืนยันสาขาฐานกับโอเปอเรเตอร์ผ่าน `AskUserQuestion` (Hard Rule #19) เว้นแต่พวกเขาจะบอกคุณแล้ว
- สร้างแผนผังงานด้วย `scripts/dev/new-worktree.sh <branch> <confirmed-base>` (อยู่ใต้ `.claude/worktrees/` ฮาร์ดลิงก์ `node_modules` และคัดลอก `.husky/_`) จากนั้นเรียก `EnterWorktree` ด้วย `path` ผ่านฐานเสมอ: หากไม่มีสคริปต์จะเลือกค่าสูงสุด `release/*` ซึ่งอาจไม่ใช่ค่าที่ผู้ดำเนินการยืนยัน เวิร์กทรีที่ `EnterWorktree` สร้างขึ้นเองนั้นไม่มีทั้งฮาร์ดลิงก์หรือ hooks ดังนั้นจึงไม่มีการคอมมิตเกตล่วงหน้าในนั้น

## ตัวแทนย่อยและคอมไพล์

ตัวแทนย่อยทุกรายที่แตะ git (เครื่องมือตัวแทนหรือสคริปต์เวิร์กโฟลว์) จะได้รับกฎยากของ #22 a `git stash` แบนคำต่อคำในพร้อมต์ — การเกิดขึ้นซ้ำที่บันทึกไว้ของเหตุการณ์ที่ซ่อนนั้นมาจากตัวแทนย่อย

## การวางแผนอาร์ติแฟกต์ — แทนที่พาธมหาอำนาจ

ทักษะมหาอำนาจจะประกาศค่าเริ่มต้นภายใต้ `docs/superpowers/plans/`, `docs/superpowers/specs/` และ `docs/research/` เขียนใหม่แต่ละรายการให้เทียบเท่ากับ `_tasks/` ใน `AGENTS.md` → "Planning & Research Artifacts" ก่อนที่จะเขียน และคอมมิตด้วย `git -C _tasks …` ไม่เคยอยู่ใน repo หลัก

## เกาไฟล์ — `_artifacts/` ไม่ใช่ `/tmp`

โปรเจ็กต์นี้จะแทนที่ scratchpad เซสชันของสายรัด (`/tmp/claude-*/…`) เขียนไฟล์ชั่วคราวที่ส่งออก —, zip ที่สร้างขึ้น, เอาต์พุตระดับกลางแบบครั้งเดียว — ถึง `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`: เส้นทาง `_*` รูทที่ gitignor ดังนั้นผู้ดำเนินการจึงค้นหาและลบรอยขีดข่วนทั้งหมดในที่เดียว แผนงาน ข้อมูลจำเพาะ การวิจัย และการส่งมอบที่ทนทานไปที่ `_tasks/` แทน (Hard Rule #23)

## ฐานสีแดง

หากต้องการระบายสถานะสีแดงที่สะสม (ปลายฐาน + red PRs) ให้ใช้ทักษะ `/sweep-reds`
