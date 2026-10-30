# GEMINI.md (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../GEMINI.md) · 🇪🇹 [am](../am/GEMINI.md) · 🇸🇦 [ar](../ar/GEMINI.md) · 🇦🇿 [az](../az/GEMINI.md) · 🇧🇬 [bg](../bg/GEMINI.md) · 🇧🇩 [bn](../bn/GEMINI.md) · 🇧🇦 [bs](../bs/GEMINI.md) · 🇨🇿 [cs](../cs/GEMINI.md) · 🇩🇰 [da](../da/GEMINI.md) · 🇩🇪 [de](../de/GEMINI.md) · 🇬🇷 [el](../el/GEMINI.md) · 🇪🇸 [es](../es/GEMINI.md) · 🇪🇪 [et](../et/GEMINI.md) · 🇮🇷 [fa](../fa/GEMINI.md) · 🇫🇮 [fi](../fi/GEMINI.md) · 🇫🇷 [fr](../fr/GEMINI.md) · 🇮🇪 [ga](../ga/GEMINI.md) · 🇮🇳 [gu](../gu/GEMINI.md) · 🇳🇬 [ha](../ha/GEMINI.md) · 🇮🇱 [he](../he/GEMINI.md) · 🇮🇳 [hi](../hi/GEMINI.md) · 🇭🇷 [hr](../hr/GEMINI.md) · 🇭🇺 [hu](../hu/GEMINI.md) · 🇦🇲 [hy](../hy/GEMINI.md) · 🇮🇩 [id](../id/GEMINI.md) · 🇳🇬 [ig](../ig/GEMINI.md) · 🇮🇹 [it](../it/GEMINI.md) · 🇯🇵 [ja](../ja/GEMINI.md) · 🇬🇪 [ka](../ka/GEMINI.md) · 🇰🇭 [km](../km/GEMINI.md) · 🇮🇳 [kn](../kn/GEMINI.md) · 🇰🇷 [ko](../ko/GEMINI.md) · 🇱🇹 [lt](../lt/GEMINI.md) · 🇱🇻 [lv](../lv/GEMINI.md) · 🇮🇳 [ml](../ml/GEMINI.md) · 🇮🇳 [mr](../mr/GEMINI.md) · 🇲🇾 [ms](../ms/GEMINI.md) · 🇲🇹 [mt](../mt/GEMINI.md) · 🇲🇲 [my](../my/GEMINI.md) · 🇳🇵 [ne](../ne/GEMINI.md) · 🇳🇱 [nl](../nl/GEMINI.md) · 🇳🇴 [no](../no/GEMINI.md) · 🇮🇳 [or](../or/GEMINI.md) · 🇮🇳 [pa](../pa/GEMINI.md) · 🇵🇭 [phi](../phi/GEMINI.md) · 🇵🇱 [pl](../pl/GEMINI.md) · 🇵🇹 [pt](../pt/GEMINI.md) · 🇧🇷 [pt-BR](../pt-BR/GEMINI.md) · 🇷🇴 [ro](../ro/GEMINI.md) · 🇷🇺 [ru](../ru/GEMINI.md) · 🇱🇰 [si](../si/GEMINI.md) · 🇸🇰 [sk](../sk/GEMINI.md) · 🇸🇮 [sl](../sl/GEMINI.md) · 🇷🇸 [sr](../sr/GEMINI.md) · 🇸🇪 [sv](../sv/GEMINI.md) · 🇰🇪 [sw](../sw/GEMINI.md) · 🇮🇳 [ta](../ta/GEMINI.md) · 🇮🇳 [te](../te/GEMINI.md) · 🇹🇷 [tr](../tr/GEMINI.md) · 🇺🇦 [uk-UA](../uk-UA/GEMINI.md) · 🇵🇰 [ur](../ur/GEMINI.md) · 🇺🇿 [uz](../uz/GEMINI.md) · 🇻🇳 [vi](../vi/GEMINI.md) · 🇳🇬 [yo](../yo/GEMINI.md) · 🇨🇳 [zh-CN](../zh-CN/GEMINI.md) · 🇹🇼 [zh-TW](../zh-TW/GEMINI.md)

---

> **แหล่งข้อมูลจริงเพียงแหล่งเดียว:** กฎทั้งหมดของโปรเจกต์สำหรับผู้ช่วย AI อยู่ใน
> [`AGENTS.md`](AGENTS.md) โปรดอ่านทั้งหมดก่อนทำการเปลี่ยนแปลงใด ๆ — ไฟล์นี้ประกอบด้วยกฎบังคับ 23 ข้อ
> เกณฑ์ตรวจสอบคุณภาพ รูปแบบการเขียนโค้ด กฎการจัดวางไฟล์ / การรักษาความเป็นระเบียบของรูทรีโพซิทอรี แผนผังรีโพซิทอรี
> และหมายเหตุเกี่ยวกับการเข้าถึงระบบสำหรับการพัฒนาในเครื่อง ซึ่งก่อนหน้านี้เคยอยู่ในไฟล์นี้

หมายเหตุเฉพาะสำหรับ Gemini:

- เปิดใช้งานทักษะผ่านเครื่องมือ `activate_skill` (ข้อมูลเมตาของทักษะจะถูกโหลดเมื่อเริ่มเซสชัน
  และเนื้อหาฉบับเต็มจะถูกเปิดใช้งานเมื่อต้องการ)
- ขณะนี้ไม่มีกฎอื่นที่ใช้เฉพาะกับ Gemini อย่าเพิ่มกฎของโปรเจกต์กลับเข้ามาที่นี่ — ให้แก้ไข
  `AGENTS.md` แทน เพื่อให้ผู้ช่วยทุกตัวเห็นคำแนะนำชุดเดียวกัน
