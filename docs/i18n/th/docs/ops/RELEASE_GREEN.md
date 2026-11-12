# Release-Green: candidate validation and evidence (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

Release-Green สังเกตการกระทำที่เฉพาะเจาะจงและรายงานผลการตรวจสอบ [ข้อมูลอ้างอิง Quality Gates](../architecture/QUALITY_GATES.md) จะกำหนดโปรไฟล์ CI ปัจจุบัน การตรวจสอบที่จำเป็น และนโยบายการยอมรับ นโยบายการรับเข้าตามเวอร์ชันใน `config/quality/admission-policy.json` เป็นสัญญาปฏิบัติการสำหรับ `Gate / CI` และ `Gate / Quality`

## CI และขอบเขตผู้สังเกตการณ์

`ci.yml` และ `quality.yml` ครอบคลุมคำขอดึงไปยังสาขาหลักและสาขาที่เผยแพร่ โปรไฟล์ที่เลือกจะกำหนดว่าจะสมัครงานใดบ้าง CI แบบเต็มยังรวมถึงเลนที่คำขอดึงแบบธรรมดาไม่ดำเนินการด้วย ผลลัพธ์จากการสังเกตอย่างรวดเร็วไม่สามารถแทนที่งานเหล่านั้นได้ และ wrapper เวิร์กโฟลว์ที่เสร็จสมบูรณ์ไม่สามารถแทนที่ใบเสร็จรับเงินได้

รุ่นที่ใช้งานจริงเป็นของ CI ไม่มีการสร้างคำแนะนำที่ซ้ำกันใน `quality.yml` สิ่งประดิษฐ์ที่หายไป งานที่ถูกยกเลิก และการวัดที่ไม่สมบูรณ์ไม่ได้ทำให้การตรวจสอบที่จำเป็นสำเร็จ ยืนยันฐานปัจจุบัน หัวหน้า และผู้สมัครแบบรวมก่อนที่จะยอมรับผล

## การตรวจสอบความถูกต้องในท้องถิ่น

เรียกใช้ผู้สังเกตการณ์ในแผนผังการทำงานที่เป็นเจ้าของหลังจากเตรียมการขึ้นต่อกันแล้ว ปฏิบัติตามแผนผังงานและโปรโตคอลทรัพยากรใน `docs/ops/WORKTREE_ISOLATION.md` ก่อนการตรวจสอบความถูกต้องอย่างหนัก

```bash
npm run check:release-green -- --quick --json
npm run check:release-green -- --with-build --full-ci --json
```

โปรไฟล์ด่วนเป็นบางส่วน โปรไฟล์แบบเต็มจะตรวจสอบข้อกำหนดตามแบบจำลองและรักษาการรับคำสั่ง แต่ไม่ได้รับรองการปรับใช้หรือทดแทนการตรวจสอบที่โฮสต์ที่เกี่ยวข้อง รายงานจะแยกแยะความล้มเหลวในการดำเนินการจากการลอยตัวของเมตริก วงล้อที่จำเป็นยังคงปิดกั้นตามนโยบายที่เลือก อย่ายกพื้นฐานเพียงเพื่อให้ได้ผลลัพธ์ที่ผ่าน

## การกวาดกลางคืนและแบบแมนนวล

ตัวแก้ไขการเผยแพร่และความเข้ากันได้ทุกคืนจะเลือกสาขาการเผยแพร่ตามรูปแบบบัญญัติ การเลือกนั้นจะต้องตรงกับสาขาที่ทริกเกอร์เวิร์กโฟลว์ และชุดใช้ SHA ที่ไม่เปลี่ยนรูปของเหตุการณ์ สำหรับการดำเนินการด้วยตนเอง ให้เลือกรุ่นที่ต้องการใน `release_branch` และส่งไปที่การอ้างอิงเดียวกันนั้น:

```bash
gh workflow run nightly-release-green.yml --ref "$release_branch" -f branch="$release_branch"
gh workflow run nightly-compat.yml --ref "$release_branch" -f branch="$release_branch"
```

การจัดส่งข้ามสาขาถูกปฏิเสธก่อนที่จะดำเนินการรหัสที่เลือก โฮสต์ชุดหลักชำระเงิน `main` และตรวจสอบว่า SHA ยังคงตรงกับเป้าหมายที่ได้รับการแก้ไขก่อนการติดตั้ง หากการเคลื่อนไหวหลักในระหว่างการแก้ไข ให้รันการกวาดล้างที่ไม่สมบูรณ์ในคอมมิตใหม่อีกครั้ง อย่ารวมใบเสร็จรับเงินชุดจากผู้สมัครที่แตกต่างกัน

## การคัดแยกและการกู้คืนความล้มเหลว

ใช้เหตุการณ์เป็นดัชนีการวินิจฉัย จากนั้นตรวจสอบการทำงาน ความพยายาม ขั้นตอนที่ล้มเหลว และสิ่งที่ไม่ชัดเจน เปรียบเทียบฐานที่เทียบเท่ากับหลักฐานของผู้สมัครก่อนที่จะระบุถึงความล้มเหลวของผู้ร่วมให้ข้อมูล ข้อผิดพลาดของโครงสร้างพื้นฐาน ข้อบกพร่องที่สืบทอดมา การถดถอยของผู้สมัคร และการอนุมัติที่รอดำเนินการ จำเป็นต้องมีการแก้ไขที่แตกต่างกัน

ทักษะ `/green-prs`, `/sweep-reds`, `/validate-release-green` และ `/babysit` รวบรวมหลักฐานและเตรียมการแก้ไขภายใต้ขอบเขตที่บันทึกไว้ เก็บเครดิตผู้มีส่วนร่วม ใช้สาขาการซ่อมแซมแบบแยกส่วน และตรวจสอบการตรวจสอบที่จำเป็นทั้งหมดก่อนการรวมที่ได้รับอนุญาต ไม่มีการทดแทนการปรับฐานใหม่โดยอัตโนมัติหรือการปิดเหตุการณ์สำหรับผู้สมัครปัจจุบันที่ผ่าน
