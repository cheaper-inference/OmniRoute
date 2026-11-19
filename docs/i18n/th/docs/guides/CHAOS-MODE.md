# Chaos Mode (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **แดชบอร์ด:** **Chaos Mode** (แถบด้านข้าง) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (เซสชันแดชบอร์ด) · `POST /api/skills/collect/chaos` (คีย์ API)  
> **ซอร์ส:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode ส่ง **งานหนึ่งงานไปยังผู้ให้บริการหลายรายพร้อมกัน** — ผู้ให้บริการแต่ละรายที่เข้าร่วม
จะส่งอินสแตนซ์ของโมเดลหนึ่งรายการ และคุณจะได้รับคำตอบทั้งหมดเรียงเคียงข้างกัน (หรือเชื่อมต่อกันเป็นลำดับ) นี่คือ
พื้นผิวการประมวลผลแบบหลายโมเดล ไม่ใช่กลยุทธ์การกำหนดเส้นทาง: ทราฟฟิกตามปกติของคุณที่ส่งไปยัง `/v1/chat/completions`
จะไม่ได้รับผลกระทบจากโหมดนี้

**การแยกความแตกต่าง — มีสามสิ่งที่ใช้คำว่า "chaos" อยู่ในชื่อ:**

| สิ่ง                   | คืออะไร                                                                                                                                                                      | เอกสารอยู่ที่                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**         | หน้าแดชบอร์ด + API ที่อธิบายไว้ที่นี่: กระจายงานหนึ่งงานไปยังผู้ให้บริการหลายราย (แบบขนานหรือแบบทำงานร่วมกัน)                                                                | คู่มือนี้                                    |
| `auto/chaos`           | รหัสโมเดล Auto-Combo: กระจายงานแบบขนาน โดยใช้หนึ่งโมเดลต่อผู้ให้บริการ และเรียกอัปสตรีมหนึ่งครั้งต่อราย ไม่ใช่การจำลองข้อผิดพลาด ([รายละเอียด](#autochaos-parallel-fan-out)) | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| การกำหนดค่าคอมโบ Chaos | คอมโบที่บันทึกถาวรซึ่งมี `config.chaos.enabled` จะกระจายงานในลักษณะเดียวกัน (เฉพาะ API); `judgeModel` มีหน้าที่เพียงเลือกคำตอบสุดท้าย โดยไม่มีการเรียกเพื่อสังเคราะห์คำตอบ   | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: การกระจายงานแบบขนาน

`auto/chaos` **ไม่ใช่** ตัวเลือกสำหรับการจำลองข้อผิดพลาดหรือการทดสอบความทนทาน การร้องขอ
`model: "auto/chaos"` บน `/v1/chat/completions` จะ:

1. สร้างพาเนลที่มี **หนึ่งโมเดลต่อผู้ให้บริการ**: ตัวเลือกแรกของผู้ให้บริการ
   แต่ละรายที่เชื่อมต่ออยู่ ตามลำดับในพูลตัวเลือก สูงสุด 5 สมาชิก
   (`OMNIROUTE_CHAOS_MAX_PANEL` โดยจำกัดเพดานไว้ที่ 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`) แพ็กน้ำหนัก `chaos-mode`
   จะกำหนดเพียง `weight` ของสมาชิกแต่ละรายเท่านั้น การกระจายงานจะไม่อ่านค่านี้
2. ส่งคำขอเดียวกันไปยังสมาชิกทุกคนในพาเนล **แบบขนาน** ดังนั้นหนึ่งคำขอ
   จะมีค่าใช้จ่ายเท่ากับการเรียกอัปสตรีมหนึ่งครั้งต่อสมาชิกพาเนลหนึ่งราย
   (`open-sse/services/autoCombo/chaosEngine.ts` ซึ่งถูกส่งต่อมาจาก
   `open-sse/services/combo.ts`)
3. สตรีมบรรทัดสถานะหนึ่งบรรทัดต่อสมาชิกพาเนลเมื่อได้รับผลลัพธ์: โดยค่าเริ่มต้นจะเป็นคอมเมนต์ SSE
   (`: chaos <index> ok|fail <model>`) พร้อมกับอีเวนต์ `omni-chaos-part`
   (`model`, `index`, `ok`, `error`) เมื่อคำขอกำหนด
   `stream_options.include_chaos_parts: true` ข้อมูลเหล่านี้ไม่มีข้อความคำตอบ
4. ส่งคำตอบจากพาเนล **หนึ่งรายการ** เป็นชังก์สุดท้ายในรูปแบบ OpenAI: คำตอบของสมาชิก
   รายแรกในพาเนล (`auto/chaos` กำหนดให้เป็น `judgeModel`) เมื่อทำงานสำเร็จ มิฉะนั้น
   จะใช้คำตอบของสมาชิกรายสุดท้ายที่ทำงานสำเร็จ คำตอบอื่น ๆ จากพาเนลจะไม่ถูกส่งกลับ ดังนั้น
   คุณจึงต้องจ่ายสำหรับการเรียก N ครั้ง แต่ได้รับผลลัพธ์การเติมข้อความเพียงหนึ่งรายการ

## ตั้งค่า

1. เปิด** แดชบอร์ด → โหมด Chaos** (`/dashboard/chaos`).
2. หมุนมัน** บน** เรือโหมด — Chaos** ปิดใช้งานโดยค่าเริ่มต้น** (`enabled: false` ใน `src/lib/chaos/chaosConfig.ts`) ในขณะที่ปิดการใช้งาน `POST /api/chaos/run` จะตอบ `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`
3. เลือกผู้เข้าร่วมและค่าเริ่มต้น (คงอยู่ต่ออินสแตนซ์ผ่านทางร้านค้าการตั้งค่า):

   | สนาม                | ความหมาย                                                                   | ค่าเริ่มต้น/ขีดจำกัด                                |
   | ------------------- | -------------------------------------------------------------------------- | --------------------------------------------------- |
   | `enabled`           | สวิตช์หลัก                                                                 | `false`                                             |
   | `defaultMode`       | `parallel` หรือ `collaborative` (ดูด้านล่าง)                               | `parallel`                                          |
   | `providerOverrides` | การมีส่วนร่วมต่อผู้ให้บริการ (`providerId`, ตัวเลือก `modelId`, `enabled`) | ว่างเปล่า = ทุกผู้ให้บริการที่ใช้งานอยู่ สูงสุด 200 |
   | `systemPrompt`      | แทนที่พรอมต์ระบบ Chaos ในตัว                                               | ไม่บังคับ สูงสุด 10,000 ตัวอักษร                    |
   | `timeoutMs`         | เวลาสูงสุดต่อการโทรรุ่น                                                    | `120000` (5 000–600 000)                            |
   | `maxTokens`         | `max_tokens` ต่อการโทรรุ่น                                                 | `4096` (256–128 000)                                |

4. ให้ผู้ให้บริการที่เข้าร่วมทุกราย** แบบอย่าง** . โมเดลของผู้ให้บริการคือ `modelId` ของการแทนที่ที่เปิดใช้งานบนหน้าโหมด Chaos (ชนะ) มิฉะนั้น** โมเดลเริ่มต้น** ของการเชื่อมต่อ รหัสผู้ให้บริการจะไม่ถูกใช้เป็นชื่อรุ่น ผู้ให้บริการที่ไม่มีทั้งสองอย่าง** ไม่ได้เรียกว่า** : ปรากฏในผลลัพธ์เป็น `status: "error"` พร้อมข้อความ _"ไม่มีชุดโมเดลสำหรับผู้ให้บริการรายนี้ ตั้งค่าโมเดลสำหรับมันในหน้าโหมด Chaos หรือโมเดลเริ่มต้นในการเชื่อมต่อ"_ และ `modelId` ว่างเปล่า ในขณะที่ผู้ให้บริการรายอื่นทำงานตามปกติ หากไม่มีผู้ให้บริการที่เลือกมีโมเดล การรันจะล้มเหลวก่อนคำขออัปสตรีมใดๆ ที่มี _"No provider has a model set. …"_ (HTTP 500 บนจุดปลายทั้งสอง)
5. วิ่ง** ทดสอบจากเพจเอง** — แผงผลลัพธ์จะแสดงคำตอบ สถานะ และระยะเวลาของผู้ให้บริการแต่ละราย

## โหมดการทำงาน

- **`parallel`** — ทุกโมเดลได้รับงานเดียวกันพร้อมกัน คุณจะได้รับคำตอบทั้งหมดแยกจากกัน
- **`collaborative`** — โมเดลทำงาน **เป็นลำดับต่อเนื่อง**: แต่ละโมเดลจะเห็นผลลัพธ์ของโมเดลก่อนหน้า และถูกขอให้ปรับปรุง ขยายความ วิจารณ์ หรือเสนอทางเลือก ฟิลด์ `summary` ของการตอบกลับจะนำผลลัพธ์ที่สำเร็จมาต่อกันตามลำดับการทำงาน (การทำงานแบบขนานไม่มี `summary`)

## API

### เซสชันแดชบอร์ด `POST /api/chaos/run` —

ตรวจสอบสิทธิ์คุกกี้ (เซสชันการจัดการ — ดู [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ); ใช้โดยหน้าแดชบอร์ด

```jsonc
// body
{
  "task": "Compare approaches to X", // required
  "providers": ["glm", "kimi"], // optional filter
  "mode": "parallel", // optional — overrides defaultMode
  "systemPrompt": "…", // optional override
  "maxTokens": 4096, // optional override
}
```

### `POST /api/skills/collect/chaos` — คีย์ API

ตัวแปรผู้ถือโทเค็นสำหรับผู้โทรภายนอก กุญแจจะต้องถือ** การอนุญาตโหมด Chaos** (`chaosModeEnabled`) ซึ่งก็คือ** ปิดโดยค่าเริ่มต้น** — เปิดใช้งานได้ต่อคีย์** แดชบอร์ด → API Manager → แก้ไขคีย์ สิทธิ์ → → Chaos Mode** . ตัวเดียวกับข้างบน

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

จุดสิ้นสุดทั้งสองส่งคืนรูปร่างเดียวกัน:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative mode only
}
```

## การแก้ไขปัญหา

- **`400 Chaos Mode is not enabled`** — ขั้นตอนที่ 2 ด้านบน: สวิตช์ส่วนกลางปิดอยู่
- **คีย์API ถูกปฏิเสธใน `/api/skills/collect/chaos`** — คีย์ขาดสิทธิ์ `chaosModeEnabled` ต่อคีย์ (ปิดโดยค่าเริ่มต้น นี่คือการตั้งค่า ไม่ใช่ข้อผิดพลาด)
- **ผู้ให้บริการแสดง `No model set for this provider`** — ตั้งค่าโมเดลในหน้า Chaos Mode หรือโมเดลเริ่มต้นในการเชื่อมต่อ (ดูการตั้งค่า ขั้นตอนที่ 4)
- **ผู้ให้บริการที่คุณคาดหวังหายไปจากผลลัพธ์** — ตรวจสอบ `providerOverrides` ในหน้า Chaos Mode (การแทนที่ที่ปิดใช้งานจะไม่รวมไว้) และดูว่าการเชื่อมต่อของผู้ให้บริการทำงานอยู่หรือไม่
