# Reasoning Replay Cache (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **แหล่งข้อมูลที่ถูกต้อง:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40

OmniRoute บันทึก `reasoning_content` ของผู้ช่วยที่สร้างโดยโมเดลโหมดคิด และนำกลับมาใช้ซ้ำอย่างโปร่งใสในคำขอแบบหลายรอบเมื่อผู้ให้บริการต้นทางกำหนดให้ต้องมีข้อมูลดังกล่าว วิธีนี้ช่วยกำจัดข้อผิดพลาด HTTP 400 ที่ผู้ให้บริการซึ่งมีข้อกำหนดเข้มงวดส่งกลับมา เมื่อประวัติการสนทนาของไคลเอนต์ไม่มีข้อมูลการให้เหตุผลจากรอบก่อนหน้า

## เหตุผลที่ต้องมีฟังก์ชันนี้

ผู้ให้บริการโหมดคิดหลายรายจะปฏิเสธรอบการสนทนาต่อเนื่อง เว้นแต่**ข้อความก่อนหน้าของผู้ช่วยจะมี `reasoning_content` ต้นฉบับอยู่ด้วย** ต้นทางจะส่งข้อผิดพลาด 400 พร้อมข้อความในลักษณะดังนี้:

```
พารามิเตอร์ไม่ถูกต้อง: ต้องส่ง reasoning_content ในโหมดคิดกลับไปยัง API
```

แต่โดยทั่วไปแล้ว ไคลเอนต์ต่างๆ (Cursor, Cline, Roo Code, OpenAI SDK) จะตัด `reasoning_content` ออกจากประวัติที่ส่งซ้ำ OmniRoute จึงกู้คืนข้อมูลดังกล่าวจากแคชฝั่งเซิร์ฟเวอร์ เพื่อให้คำขอที่ต้นทางได้รับมีความสอดคล้องกัน Issue #1628 เพิ่มการจัดเก็บข้อมูลแบบผสมผสานระหว่างหน่วยความจำ/SQLite เพื่อให้แคชยังคงอยู่หลังจากรีสตาร์ตโปรเซส

## สถาปัตยกรรม

```
รอบที่ N (ผู้ช่วยสร้างการตอบกลับ):
  → การตอบกลับประกอบด้วย reasoning_content + tool_calls
  → หาก requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      เขียนลงใน (หน่วยความจำ + DB) โดยใช้ tool_call.id แต่ละรายการเป็นคีย์
  → ส่งต่อการตอบกลับไปยังไคลเอนต์ (ซึ่งอาจเก็บหรือไม่เก็บ reasoning ไว้)

รอบที่ N+1 (ไคลเอนต์ส่งข้อความติดตาม):
  → ตัวแปลตรวจพบว่า: requiresReasoningReplay(provider, model) === true
  → สำหรับแต่ละข้อความของผู้ช่วยที่มี tool_calls แต่ไม่มี reasoning_content:
      lookupReasoning(toolCalls[0].id) → หน่วยความจำ → DB
      พบ    → msg.reasoning_content = cached; recordReplay()
      ไม่พบ → msg.reasoning_content = "" (วิธีสำรองแบบเดิมสำหรับ DeepSeek รุ่นเก่า)
  → ต้นทางเห็นประวัติที่สอดคล้องกัน → ไม่มี 400
```

การบันทึกเกิดขึ้นใน `open-sse/handlers/chatCore.ts` (สองตำแหน่ง ณ จุดเรียก `cacheReasoningFromAssistantMessage` ทั้งสองจุด) ส่วนการเล่นซ้ำเกิดขึ้นใน `open-sse/translator/index.ts` หลังการบังคับใช้สคีมา แต่ก่อนส่งต่อคำขอ

รอบการตอบของผู้ช่วยแบบธรรมดา (ที่ไม่มีการเรียกใช้เครื่องมือ) ใช้วิธีกำหนดคีย์ที่ต่างออกไป: `buildAssistantMessageCacheKey()` จะสร้างไดเจสต์จากขอบเขตเซสชันร่วมกับทรานสคริปต์รูปแบบ OpenAI ที่ผ่านการทำให้เป็นมาตรฐานจนถึงรอบนั้น เนื่องจาก DeepSeek ต้องการ reasoning ของรอบก่อนหน้า_ทุกรอบ_เมื่อมี `tools` สำหรับปลายทาง Responses-API (ตัวอย่างเช่น `opencode-go/deepseek-v4-flash` ซึ่งกำหนดเส้นทางไปยัง `/responses`) เนื้อหาคำขอที่ส่งไปยังต้นทางจะมี `input` ไม่ใช่ `messages` ดังนั้น `translateRequest()` (`open-sse/translator/index.ts`) จะรายงานทรานสคริปต์แกนกลางที่นำไปสร้างไดเจสต์ผ่านตัวเลือก callback และตำแหน่งบันทึกจะสร้างไดเจสต์จากทรานสคริปต์เดียวกัน กระบวนการเล่นซ้ำของ Responses จะทำงานบนแกนกลาง OpenAI สำหรับรูปแบบต้นทางทุกแบบ ดังนั้นไคลเอนต์ Anthropic Messages (Claude → OpenAI → Responses) จึงได้รับการเล่นซ้ำด้วย

## การจัดเก็บ — หน่วยความจำ + SQLite แบบผสมผสาน

เส้นทางการทำงานหลักใช้ `Map` ในหน่วยความจำ (LRU ตามเวลาที่สร้าง) โดยมีตาราง SQLite รองรับเพื่อกู้คืนหลังการหยุดทำงานและแสดงผลบนแดชบอร์ด

| ชั้นข้อมูล  | การนำไปใช้                                     | วัตถุประสงค์                                      |
| ----------- | ---------------------------------------------- | ------------------------------------------------- |
| หน่วยความจำ | `Map` ใน `open-sse/services/reasoningCache.ts` | ค้นหาได้รวดเร็ว และนำรายการเก่าสุดออกเมื่อครบ 200 |
| DB          | ตาราง `reasoning_cache` (`src/lib/db/`)        | คงข้อมูลไว้หลังรีสตาร์ตและใช้สร้างสถิติ           |

การเขียนข้อมูลจะดำเนินการกับทั้งสองชั้น ส่วนการอ่านจะตรวจสอบหน่วยความจำก่อน แล้วจึงเปลี่ยนไปใช้ DB หากไม่พบข้อมูล (ข้อมูลที่พบใน DB จะถูกนำกลับเข้าสู่หน่วยความจำ) ความล้มเหลวของ DB ไม่ส่งผลร้ายแรง — แคชในหน่วยความจำจะยังคงให้บริการเส้นทางการทำงานหลักต่อไป

**ค่าเริ่มต้น:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- จำนวนรายการสูงสุดในหน่วยความจำ: `200` (`MAX_MEMORY_ENTRIES`)
- การนำรายการออก: `createdAt` ที่เก่าสุดก่อน

## สคีมาฐานข้อมูล

การย้ายข้อมูล: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

ดัชนี: `expires_at`, `provider`, `model`, `created_at` โดย `expires_at` จะถูกจัดเก็บเป็นวินาทีตามเวลา Unix epoch ส่วนเลเยอร์ SELECT จะปรับค่าข้อความแบบเดิมให้อยู่ในรูปแบบมาตรฐานผ่าน `EXPIRES_AT_EPOCH_SQL`

## การตรวจจับผู้ให้บริการ / โมเดล

Replay จะเปิดใช้งานเมื่อ `requiresReasoningReplay(provider, model)` ส่งคืนค่า `true` ฟังก์ชันนี้ตรวจสอบรายการสองรายการใน `open-sse/services/reasoningCache.ts`

**รหัสผู้ให้บริการ (ต้องตรงกันทั้งหมด โดยไม่คำนึงถึงตัวพิมพ์เล็ก-ใหญ่):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**รูปแบบ regex ของโมเดล (ไม่คำนึงถึงตัวพิมพ์เล็ก-ใหญ่):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` และ `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro โดยอาจมีส่วนต่อท้าย `-free` หรือไม่ก็ได้)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

การเพิ่มผู้ให้บริการ/โมเดลแบบเข้มงวดรายการใหม่ หมายถึงการเพิ่มรายการต่อท้ายหนึ่งในลิสต์เหล่านี้ และเขียน unit test เพื่อยืนยันการแทรก replay คำอธิบาย PR ควรอ้างอิงข้อความข้อผิดพลาด 400 จาก upstream ที่เป็นเหตุผลของการเปลี่ยนแปลงนี้แบบตรงตัว

## REST API

แคชมี endpoint สองรายการภายใต้ `src/app/api/cache/reasoning/route.ts` โดยทั้งสองรายการต้องใช้การยืนยันตัวตนสำหรับการจัดการ (`isAuthenticated` จาก `@/shared/utils/apiAuth`)

| เมธอด  | Endpoint                                                  | คำอธิบาย                                                     |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | `/api/cache/reasoning`                                    | สถิติ + รายการแบบแบ่งหน้า                                    |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | รายการที่กรองแล้ว (`limit` ถูกจำกัดให้อยู่ในช่วง `[1, 200]`) |
| DELETE | `/api/cache/reasoning`                                    | ล้างข้อมูลทั้งหมด (หน่วยความจำ + DB) และรีเซ็ตจำนวน hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | ล้างเฉพาะรายการของผู้ให้บริการหนึ่งราย                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ลบรายการเดียว                                                |

**โครงสร้างการตอบกลับของ GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## หมายเหตุด้านการปฏิบัติงาน

- **การล้างข้อมูล:** `cleanupReasoningCache()` ล้างรายการในหน่วยความจำที่หมดอายุ และเรียกใช้ `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` worker สำหรับตรวจสอบสถานะจะเรียกใช้ฟังก์ชันนี้เป็นระยะ
- **การกู้คืนหลังแครช:** หลังจากรีสตาร์ต หน่วยความจำจะว่างเปล่า แต่ DB ยังคงเก็บรายการที่ยังไม่หมดอายุไว้ การค้นหาครั้งแรกสำหรับ `tool_call_id` ที่กำหนดจะเป็น DB hit ส่วนการค้นหาครั้งถัดไปจะเป็น memory hit
- **ไม่มี reasoning ก็ไม่มีแคช:** `cacheReasoningFromAssistantMessage` ส่งคืนค่า `0` เมื่อข้อความของ assistant ไม่มีฟิลด์ `reasoning_content` / `reasoning` ดังนั้นการตอบกลับแบบไม่ใช้การคิดจึงไม่มีค่าใช้จ่าย
- **การเขียนก็ถูกควบคุมเช่นกัน:** จุดเรียกใช้ทั้งสองจุดใน `chatCore.ts` (แบบไม่สตรีมและแบบสตรีม) จะเรียก `cacheReasoningFromAssistantMessage()` เฉพาะเมื่อ `requiresReasoningReplay(provider, model)` เป็น `true` เท่านั้น ซึ่งเป็น predicate เดียวกับที่ฝั่งอ่านตรวจสอบ การติดตั้งที่ไม่เคยใช้งานผู้ให้บริการที่ต้องใช้ replay จะไม่ต้องรับภาระจากการเขียน การอัปเดตดัชนี และ try/catch ในทุกการตอบกลับที่มี reasoning
- **ผู้ให้บริการแบบไม่เข้มงวด:** เมื่อ `requiresReasoningReplay` เป็น `false` และรูปแบบเป้าหมายคือ OpenAI ตัวแปลจะ **นำฟิลด์ `reasoning_content` ออก** จากข้อความขาออก เนื่องจาก OpenAI Chat Completions ไม่ยอมรับฟิลด์นี้

## ความเป็นเจ้าของข้อมูลเหตุผลแบบทึบของ Muse

Muse (`muse-code`) คืนข้อมูลเหตุผลแบบทึบที่ผูกกับผู้เรียก (`encrypted_content`) การเล่นซ้ำด้วยบัญชีอื่นหรือข้อมูลรับรองที่ออกใหม่จะล้มเหลวที่ต้นทาง ดังนั้นคำขอ OAuth แบบเนทีฟจึงใช้ความเป็นเจ้าของระดับเซสชันแทนการหมุนเวียนรายคำขอ (`src/sse/services/museSessionOwnership.ts` บังคับใช้ใน `src/sse/handlers/chat.ts`) การเชื่อมต่อ API key ที่เลือกอย่างชัดเจน และการตั้งค่าที่มีแต่ API key ยังคงใช้การกำหนดเส้นทางเดิมโดยไม่มีโหมดความเป็นเจ้าของนี้

- ระบุ ID เซสชันที่คงที่ในทุกเทิร์น โดยใช้ `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` หรือ `x-codex-session-id` หรือใช้ `prompt_cache_key`, `session_id`, `conversation_id` หรือ `metadata.session_id` ในเนื้อหา ตามลำดับความสำคัญนี้ หาก ID ขาดหายหรือว่างและมีบัญชี OAuth แบบเนทีฟที่ใช้งานอยู่ตั้งแต่สองบัญชีขึ้นไป ระบบจะคืน 400 หากมีบัญชี OAuth เดียว จะไม่มีบัญชีอื่นให้หมุนเวียน ดังนั้นคำขอดังกล่าวจึงยังใช้การกำหนดเส้นทางโดยไม่ปักหมุด ขอบเขตนี้รวม ID ของ OmniRoute API key ของผู้เรียกด้วย
- เซสชันอิสระที่เริ่มใหม่จะกระจายแบบวนรอบไปยังบัญชี OAuth แบบเนทีฟที่ใช้งานอยู่และนโยบายการเชื่อมต่อของ API key อนุญาต โดยเรียงตาม ID การเชื่อมต่อ การวนรอบจะข้ามบัญชีที่อยู่ในช่วงพักการเชื่อมต่อ มีสถานะสิ้นสุด (`banned`, `expired`, `credits_exhausted`) หรือถูกล็อกสำหรับโมเดลที่ร้องขอ ความล้มเหลวจากต้นทางของ Muse จะบันทึกสถานะช่วงพักและเบรกเกอร์เช่นเดียวกับผู้ให้บริการอื่น การบังคับใช้การเชื่อมต่ออย่างชัดเจนจะข้ามการวนรอบสำหรับเซสชันใหม่ แต่ไม่สามารถแทนเจ้าของหลังจากเจ้าของส่งคำตอบสำเร็จแล้ว
- ก่อนที่เจ้าของจะส่งคำตอบสำเร็จ หากเจ้าของใช้งานไม่ได้ เซสชันจะถูกยึดสิทธิ์ใหม่บนบัญชีที่ปกติ หลังคำตอบที่สำเร็จครั้งแรก เซสชันจะปักหมุดอยู่กับเจ้าของนั้นจนกว่าจะไม่มีการใช้งานเป็นเวลา 30 วัน (`MUSE_SESSION_IDLE_TTL_MS`)
- ทุกคำขอต่อเนื่องและเทิร์นผลลัพธ์เครื่องมือยังปักหมุดกับเจ้าของเซสชัน ทั้งการเชื่อมต่อ ข้อมูลระบุตัวตนของบัญชี และรุ่นของข้อมูลรับรองการอนุมาน จะถูกตรวจสอบอีกครั้งก่อนเรียกต้นทาง รวมถึงการลองใหม่หลังรีเฟรชข้อมูลรับรอง ID การเรียกใช้/การอ้างอิงรายการของ Responses และ ID การเรียกเครื่องมือของ Chat Completions ต้องเคยถูกบันทึกสำหรับเซสชันและรุ่นนั้น
- ระเบียน SQLite `key_value` ในเนมสเปซ `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) เก็บความเป็นเจ้าของและเคอร์เซอร์การหมุนเวียนไว้ข้ามการเริ่มระบบใหม่ ทุกครั้งที่ยึดสิทธิ์และส่งคำตอบจะอัปเดตเวลาที่เซสชันมีการใช้งาน เซสชันที่ไม่ได้ใช้งานนานกว่า `MUSE_SESSION_IDLE_TTL_MS` จะถูกตัดออก ทั้งการปักหมุดเจ้าของ ธงว่าเคยส่งคำตอบแล้ว และแฮชของข้อมูลทึบ/การอ้างอิงที่บันทึกไว้ โดยทำอย่างถี่ที่สุดหนึ่งครั้งใน 10 นาทีและแบ่งเป็นชุดที่จำกัดขนาด ดังนั้นการนำประวัติมาเล่นซ้ำในภายหลังจะถูกปฏิเสธแบบปลอดภัยเพราะไม่รู้จักเจ้าของ ระเบียนมี ID การเชื่อมต่อและแฮชของข้อมูลระบุตัวตนบัญชี ข้อมูลรับรอง เนื้อหาแบบทึบ และการอ้างอิงคำขอต่อเนื่อง ไม่ได้เก็บความลับหรือประวัติการสนทนา ไคลเอนต์ต้องเก็บและส่งประวัติทั้งหมดพร้อมข้อมูลเหตุผลแบบทึบ
- ข้อมูลเหตุผลแบบทึบที่ไม่รู้จักหรือเป็นของผู้อื่น เจ้าของที่หายไป บัญชีเจ้าของที่ใช้งานไม่ได้ หรือการเปลี่ยนรุ่นเมื่อมีประวัติที่บันทึกไว้ จะถูกปฏิเสธแบบปลอดภัยด้วย 4xx/503 อย่างชัดเจน จะไม่มีการสลับข้ามบัญชีโดยไม่แจ้งและไม่มีการทิ้งข้อมูลเหตุผล
- คีย์ที่ออกใหม่ของบัญชีเดิมจะถูกนำมาใช้ได้เฉพาะเมื่อเซสชันไม่มีประวัติที่เล่นซ้ำได้บันทึกไว้ เซสชันที่มีประวัติจะยังถูกปฏิเสธแบบปลอดภัยจนกว่าจะเริ่มใหม่
- คำตอบว่างจากต้นทาง (`upstream_empty_response` / `empty_response` โดยยังไม่มีสิ่งใดถูกส่งออกไปให้ผู้เรียก) จะถูกลองใหม่ไม่เกินสองครั้งกับเจ้าของเดิม หลัง 0.5 วินาทีแล้วตามด้วย 1.5 วินาที (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`) หากทุกครั้งยังว่าง จะคืน 502 เดิมโดยไม่ทำเครื่องหมายช่วงพักหรือเบรกเกอร์ ดังนั้นคำตอบที่ไม่เสถียรชั่วคราวจึงไม่ล็อกเจ้าของ
- คำขอ `muse-code` ทั้งหมดข้ามทั้งการอ่านและเขียนแคชเชิงความหมาย รวมถึงการเขียนระหว่างสตรีม เพื่อไม่ให้เอาต์พุตแบบทึบที่แคชไว้ได้รับเจ้าของเซสชันคนละราย

การทดสอบป้องกันการถดถอย: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` และ `tests/unit/chatcore-semantic-cache.test.ts`

## ดูเพิ่มเติม

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — เซอร์กิตเบรกเกอร์ ช่วงพักการทำงาน และการล็อกโมเดล
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — การวินิจฉัยข้อผิดพลาด 400 จากต้นทาง
- ซอร์สโค้ด: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- การย้ายข้อมูล: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- เส้นทาง API: `src/app/api/cache/reasoning/route.ts`
- ปัญหาต้นฉบับ: #1628
