# CORS Configuration & Security (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ควบคุมว่าสิ่งใด **ต้นกำเนิดของเบราว์เซอร์** อาจอ่านการตอบกลับแบบข้ามต้นทางจากรายการที่อนุญาตแบบรวมศูนย์รายการเดียว โมเดลก็คือ **ปิดไม่สำเร็จตามค่าเริ่มต้น** : ไม่อนุญาตให้ใช้ต้นทางจนกว่าคุณจะเลือกใช้ หน้านี้บันทึกว่ารายการที่อนุญาตแก้ไขได้อย่างไร สิ่งที่ `CORS_ALLOW_ALL=true` เปิดเผยจริง ๆ (และที่สำคัญคือ ทำอะไรได้บ้าง **ไม่** ) วิธีกำหนดค่า dev vs การผลิตอย่างปลอดภัย และคำเตือนรันไทม์ที่แดชบอร์ดจะแสดงเมื่อมีไวด์การ์ดใช้งานอยู่

**ที่มาของความจริง:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`, `applyCorsHeaders`, `getCorsStatus`) รายการที่อนุญาตจะถูกใช้เพียงครั้งเดียว ในมิดเดิลแวร์ (`src/server/authz/pipeline.ts`) — ตัวจัดการต่อเส้นทางไม่ได้ตั้งค่า `Access-Control-Allow-Origin` ด้วยตนเอง

## วิธีการแก้ไขแหล่งกำเนิด

สำหรับคำขอแต่ละรายการ มิดเดิลแวร์จะคำนวณค่า `Access-Control-Allow-Origin` ตามลำดับนี้:

1. **`CORS_ALLOW_ALL=true`** (หรือ `CORS_ORIGIN=*` ดั้งเดิม) → สะท้อน `Origin` ของผู้โทรกลับ (หรือ `*` เมื่อไม่มีส่วนหัว `Origin` ) ด้วย `Vary: Origin` ดังนั้นแคชจึงถูกต้อง `applyCorsHeaders()` chokepoint เดียวกันยังเพิ่ม `Vary: Accept-Encoding` ต่อท้ายการตอบสนอง 2xx-with-body บนพื้นผิว `/v1*`/`/v1beta*` ที่ได้รับการตรวจสอบโทเค็น (`relaxForTokenAuth`, RFC 9110 §12.5.5, ปัญหา #6737) ดังนั้นแคช downstream/shared จึงสามารถแยกแยะความแตกต่างระหว่างเวอร์ชันที่บีบอัดและที่ไม่บีบอัดได้อย่างถูกต้อง
2. มิฉะนั้น คำขอ `Origin` จะถูกทำให้เป็นมาตรฐาน (ตัวพิมพ์เล็ก เครื่องหมายทับต่อท้าย) และจับคู่กับ **รายการที่อนุญาตแบบรวม** : :
   - สิ่งแวดล้อม **`CORS_ALLOWED_ORIGINS`** รายการที่คั่นด้วยเครื่องหมายจุลภาค — และ
   - รันไทม์**`corsOrigins`** การตั้งค่า (แดชบอร์ด → Security → _CORS Allowed Origins_) ฉีดผ่าน `setRuntimeAllowedOrigins()` จาก `src/lib/config/runtimeSettings.ts`
3. ไม่มี → ที่ตรงกัน **ไม่มีการส่งส่วนหัว `Access-Control-Allow-Origin`** . เบราว์เซอร์บล็อกการอ่านแบบข้ามต้นทาง นี่คือค่าเริ่มต้นที่ปิดล้มเหลวตามตั้งใจ

| สภาพแวดล้อมที่หลากหลาย | ความหมาย                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV ของต้นทางที่แน่นอนที่จะอนุญาต (แนะนำ)                                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → สะท้อนต้นกำเนิดใด ๆ (ไวด์การ์ด) เดฟเท่านั้น                               |
| `CORS_ORIGIN`          | มรดก `*` มีพฤติกรรมเหมือน `CORS_ALLOW_ALL`; โดยจะมีการเพิ่มค่าเดียวลงในรายการที่อนุญาต |

## โมเดลภัยคุกคาม — สิ่งที่ `CORS_ALLOW_ALL=true` เปิดเผยจริงๆ

คำเตือน OWASP ทั่วไป ("สัญลักษณ์แทน CORS = ไซต์ใด ๆ สามารถเรียก API ของคุณได้ ") คุ้มค่าแก่การพิจารณาอย่างจริงจัง แต่การเปิดเผยของ OmniRoute คือ **แคบกว่ากรณีทั่วไป** เนื่องจากข้อเท็จจริงในการดำเนินการอย่างเป็นรูปธรรมข้อหนึ่ง:

> **`applyCorsHeaders()` ส่วนกลางไม่เคยปล่อย `Access-Control-Allow-Credentials`** เบราว์เซอร์จะไม่เปิดเผยการตอบกลับข้ามต้นทาง _credentialed_ (แบกคุกกี้) เว้นแต่เซิร์ฟเวอร์จะส่ง `Access-Control-Allow-Credentials: true` เส้นทาง CORS ที่แชร์ของ OmniRoute ไม่เคยทำ

ความหมายต่อพื้นผิวแม้กับ `CORS_ALLOW_ALL=true`:

| พื้นผิว                                  | กลไกการตรวจสอบสิทธิ์           | ผลกระทบของไวด์การ์ด CORS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| แดชบอร์ด/ MANAGEMENT `/api/*`            | เซสชันคุกกี้                   | ต้นกำเนิดก็สะท้อนแต่**ไม่มี `Allow-Credentials`** เบราว์เซอร์**บล็อก** การอ่านข้อมูลรับรอง ไซต์ข้ามต้นทางที่เป็นอันตราย **ไม่สามารถอ่านได้** การตอบสนองแดชบอร์ดที่ได้รับการรับรองความถูกต้องของคุณ และคุกกี้เซสชันจะไม่ถูกเปิดเผย                                                                                                                                                                                                                                                                                                 |
| ลูกค้า API `/v1/*`, `/v1beta/*`          | ส่วนหัวของผู้ถือ / `x-api-key` | อนุญาตแล้ว **โดยการออกแบบ** (`relaxForTokenAuth`): เบราว์เซอร์ไม่เคยแนบ `Authorization`/`x-api-key` โดยอัตโนมัติ ดังนั้นหน้าของผู้โจมตีจึงไม่สามารถระบุรหัสของคุณได้ เสียงสะท้อนแบบผ่อนคลายต้องใช้หัวเรื่องที่ได้รับการตรวจสอบสิทธิ์ (คีย์ API หรือเซสชันแดชบอร์ดที่ได้รับการตรวจสอบแล้ว) ไม่ใช่เพียงส่วนหัวข้อมูลรับรอง และจะไม่รวม `Access-Control-Allow-Credentials` ไว้ด้วย การตอบกลับแบบไม่เปิดเผยตัวตน (`REQUIRE_API_KEY=false`) ใช้รายการต้นทางที่อนุญาตที่กำหนดค่าไว้ รวมถึงการเลือกใช้ `CORS_ALLOW_ALL=true` อย่างชัดเจน |
| สาธารณะอ่านอย่างเดียว (`/api/health`, …) | ไม่มี                          | ไม่ละเอียดอ่อน; ไวด์การ์ดไม่เป็นอันตราย                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

ดังนั้น **ที่เหลือ** การเปิดเผย `CORS_ALLOW_ALL=true` ถูกจำกัดอยู่ที่: (ก) ข้ามแหล่งกำเนิดที่ไม่ได้รับการรับรอง **อ่าน** ของข้อมูลที่ไม่ได้รับอนุญาตแล้ว และ (b) ปล่อยให้ CORS**บัตรผ่านก่อนเที่ยวบิน** บนเส้นทางการจัดการ — ซึ่งยังคงต้องมีการตรวจสอบสิทธิ์ซึ่งเพจข้ามต้นทางไม่สามารถให้ได้ มันคือ **ไม่** เวกเตอร์การขโมยเซสชันหรือการขโมยข้อมูลรับรองบนเส้นทาง CORS ที่ใช้ร่วมกัน

### ข้อยกเว้นของแท้หนึ่งรายการ — `/api/v1/agents/`

เส้นทาง Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ตั้งค่าไว้**เป็นเจ้าของ** ส่วนหัว CORS (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) และ **ทำ** ปล่อย `Access-Control-Allow-Origin: <origin>|*` ร่วมกับ `Access-Control-Allow-Credentials: true` นี่คือพื้นผิวเดียวที่มีต้นกำเนิด-เสียงสะท้อนและข้อมูลประจำตัวอยู่ร่วมกัน และมันก็เป็นเช่นนั้น **เป็นอิสระจาก `CORS_ALLOW_ALL`** . เส้นทางเหล่านี้ได้รับการรับรองจากฝ่ายบริหาร (`requireManagementAuth`) ผู้ปฏิบัติงานที่เปิดเผยแดชบอร์ดนอกโฮสต์ควรทราบว่านี่เป็นที่เดียวที่ส่วนหัวการตอบกลับอนุญาตให้อ่านข้อมูลรับรองข้ามแหล่งกำเนิดได้ การกระชับให้อยู่ในรายการที่อนุญาตอย่างชัดเจนจะมีการติดตามแยกจากหลักเกณฑ์ CORS นี้

## รายการตรวจสอบการผลิต

- **ไม่เคยตั้งค่า `CORS_ALLOW_ALL=true` ในการใช้งานจริง** ปล่อยให้มันไม่มีการตั้งค่า
- ตั้งอัน **ชัดเจน** รายการต้นกำเนิด — ไม่ว่าจะเป็น env var หรือฟิลด์ Security-tab:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- หาก OmniRoute ทำงานอยู่ด้านหลังพร็อกซี / ช่องสัญญาณแบบย้อนกลับ (nginx, Caddy, Cloudflare Tunnel, Tailscale) CORS จะเป็น **ไม่** — ควบคุมเดียวของคุณ ตัวป้องกันเส้นทางย้อนกลับยังคงปกป้องเส้นทางที่สามารถวางไข่ได้ (ดู [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ) อย่าปลอมแปลง `X-Forwarded-For: 127.0.0.1` เพื่อ "แก้ไข" 403; ที่เปิดคลาส RCE อีกครั้งเมื่อตัวป้องกันเส้นทางปิด
- ยืนยันสถานะรันไทม์: แดชบอร์ดแสดงก **แบนเนอร์สีเหลืองอำพันถาวร** ภายใต้แดชบอร์ด → Security → Authorization Inventory เมื่อใดก็ตามที่ `CORS_ALLOW_ALL=true` เผยแพร่อยู่ และ `/api/settings/authz-inventory` ส่งคืนเครื่องมือตรวจสอบซองจดหมาย `cors: { allowAll, allowedOrigins }` ที่สามารถสำรวจความคิดเห็นได้

## ความสะดวกในการพัฒนา — อนุญาตให้มีต้นกำเนิดในท้องถิ่นที่เฉพาะเจาะจง

คุณแทบไม่ต้องใช้ไวด์การ์ดเลยแม้แต่ใน dev อนุญาตเฉพาะเซิร์ฟเวอร์ dev ที่คุณใช้:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ต้นทางจะถูกจับคู่โดยไม่คำนึงถึงตัวพิมพ์เล็กและตัวพิมพ์ใหญ่ โดยไม่สนใจเครื่องหมายทับ ดังนั้น `http://localhost:3000` และ `http://localhost:3000/` จึงเทียบเท่ากัน คุณสามารถตั้งค่า CSV เดียวกันได้ที่รันไทม์ใน **แดชบอร์ดความปลอดภัย → → CORS อนุญาตต้นกำเนิด** โดยไม่ต้องรีสตาร์ท

## คีย์API เทียบกับเซสชันคุกกี้

- **Bearer / `x-api-key` (พื้นผิวการอนุมาน `/v1/*` ):** เบราว์เซอร์จะไม่แนบสิ่งเหล่านี้โดยอัตโนมัติ CORS ไม่ใช่สิ่งกีดขวางที่มีความหมายในที่นี้ — คีย์ API คือสิ่งกีดขวาง — ซึ่งเป็นเหตุผลว่าทำไมพื้นผิวนั้นจึงได้รับอนุญาตโดยเจตนา ดังนั้นเบราว์เซอร์และไคลเอนต์ Electron สามารถอ่านคำตอบที่พวกเขามีสิทธิ์ได้รับอยู่แล้ว เสียงสะท้อนแบบผ่อนคลายต้องใช้หัวเรื่องที่ได้รับการตรวจสอบสิทธิ์ (คีย์ API หรือเซสชันแดชบอร์ดที่ได้รับการตรวจสอบแล้ว) ไม่ใช่เพียงส่วนหัวของข้อมูลรับรอง และจะไม่รวม `Access-Control-Allow-Credentials` ไว้ด้วย การตอบกลับแบบไม่ระบุชื่อ (`REQUIRE_API_KEY=false`) ใช้รายการต้นทางที่อนุญาตที่กำหนดค่าไว้ รวมถึงการเลือกใช้ `CORS_ALLOW_ALL=true` อย่างชัดเจน การปฏิเสธการรับรองความถูกต้อง (401) ยังคงสามารถอ่านได้ เพื่อให้ไคลเอนต์สามารถแสดงคีย์ที่ถูกเพิกถอนหรือพิมพ์ผิด (#5242): ไปป์ไลน์ 401 ของตัวเองจะเก็บเสียงสะท้อน และเส้นทางที่ปฏิเสธคีย์เองหลังจากที่ไปป์ไลน์ทำหน้าที่เป็นแบบไม่ระบุชื่อ (`/v1/models` และ `/v1beta/models` พร้อมการกำหนดค่าการรับรองความถูกต้องการจัดการ เส้นทางผู้สมัคร `/v1/files`, `/v1/batches`, `/v1/media`, `/v1/session-leases` และคำสั่งผสมอัตโนมัติที่ขอบเขตเจ้าของ) จะเพิ่มเสียงสะท้อนนั้น 401 ผ่าน `credentialRejectionHeaders()` เสียงสะท้อนจะถูกคีย์ตามคำขอที่มีส่วนหัวข้อมูลรับรอง (`Authorization`, `x-api-key`, `x-goog-api-key` หรือคุกกี้ `auth_token` ) ไม่ใช่เส้นทางที่ตรวจสอบ และไม่เคยจับคู่กับ `Access-Control-Allow-Credentials`; ร่างกายเป็นซองจดหมายข้อผิดพลาดคงที่ เส้นทางการจัดการภายใต้ `/api/v1/` ที่ได้รับการปกป้องโดย `requireManagementAuth()` (`/api/v1/management/*`, `/api/v1/registered-keys`, `/api/v1/providers/[provider]/limits`, `/api/v1/accounts/[id]/limits`, `/api/v1/issues/report`) ไม่ได้ใช้ข้อยกเว้นการปฏิเสธข้อมูลประจำตัวนี้: สำหรับ `REQUIRE_API_KEY=false` การตอบสนอง 401/403 ของพวกเขาจะเป็นไปตามนโยบายต้นกำเนิด CORS ที่กำหนดค่าไว้
- **เซสชันคุกกี้ (แดชบอร์ด):** ป้องกันโดยค่าเริ่มต้นที่ปิดไม่สำเร็จ **และ** หากไม่มี `Access-Control-Allow-Credentials` บนเส้นทางที่ใช้ร่วมกัน เก็บต้นกำเนิด management/dashboard ไว้ไม่ให้มีการกำหนดค่าที่อนุญาต พวกเขาจะต้องปิดสนิทอยู่เสมอ

## การจับมือ WebSocket (`/v1/responses`, `/v1/ws`)

เบราว์เซอร์ไม่ใช้ CORS กับ WebSocket ดังนั้นการขนส่ง WebSocket ที่ส่งคืนเอาต์พุตการอนุมานจะตรวจสอบการจับมือ `Origin` ด้วยตนเอง (`src/server/origin/wsOrigin.ts`): การตอบสนอง WebSocket (`/v1/responses`) และเมื่อ OmniRoute วิ่งผ่าน `npm start` / `npm run dev` สะพาน `/v1/ws` และ `/api/v1/ws` ซึ่งจะสตรีม `/v1/chat/completions`, `/v1/messages` และ `/v1/responses` เป็นเฟรม สะพานขอคำตัดสินของ `/api/v1/ws?handshake=1` และปฏิเสธที่จะอัปเกรด เว้นแต่เส้นทางนั้นจะทำการตรวจสอบ ข้อกำหนดการตรวจสอบสิทธิ์ยังคงใช้แยกต่างหาก การตรวจสอบต้นทางจะผ่านเมื่อ:

- ไม่มีส่วนหัว `Origin` (Codex CLI, SDKs และไคลเอนต์ที่ไม่ใช่เบราว์เซอร์อื่น ๆ );
- `Origin` ได้รับการยอมรับจากรายการที่อนุญาตด้านบน (`CORS_ALLOWED_ORIGINS`, การตั้งค่า `corsOrigins`, `CORS_ORIGIN`, `CORS_ALLOW_ALL`)
- `Origin` เป็นหนึ่งในต้นกำเนิดสาธารณะของ OmniRoute(ฐานสาธารณะที่กำหนดค่า URL ซึ่งเป็นต้นทางที่ส่งต่อของพร็อกซีที่เชื่อถือได้ หรือโฮสต์ loopback/LAN โดยตรงที่กำหนดเป็นตัวอักษร IP หรือ `localhost` — ซึ่งเป็นตัวเลือกเดียวกันกับที่การตรวจสอบการกลายพันธุ์ของแดชบอร์ดใช้) หรือ
- มีคีย์ API ที่ถูกต้อง เช่นเดียวกับบนพื้นผิว HTTP `/v1/*`

สิ่งอื่นใดที่ได้รับ `403 ws_origin_forbidden` คุกกี้เซสชันแดชบอร์ดไม่ได้รับการยกเว้น `Origin` ต่างประเทศ เนื่องจากเบราว์เซอร์จะแนบคุกกี้ดังกล่าวเข้ากับซ็อกเก็ตของหน้าใดๆ `localhost` บนพอร์ตอื่นไม่ถือว่าเป็นแหล่งกำเนิดเดียวกัน เพิ่มต้นกำเนิด dev ดังกล่าวให้กับ `CORS_ALLOWED_ORIGINS`

## ตัวอย่าง: Reverse proxy หน้า OmniRoute

CORS บังคับใช้โดย OmniRoute เอง ดังนั้นโดยทั่วไปแล้วพร็อกซีควรดำเนินการ **ไม่** เพิ่มหรือเขียนส่วนหัว `Access-Control-*` ใหม่ (ส่วนหัวคู่ทำให้เบราว์เซอร์เสียหาย) ยุติ TLS และส่งต่อ — ให้ OmniRoute ตอบ preflight:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Keep the forwarding headers: a proxy on the same host connects from loopback, and they are
    # what tells OmniRoute the caller is not the local operator. A proxy that adds none of them
    # makes every remote caller look local. Never set X-Forwarded-For to 127.0.0.1 either.
}
```

ตั้งค่าต้นทางของเบราว์เซอร์ที่อนุญาตใน OmniRoute (`CORS_ALLOWED_ORIGINS` หรือแท็บความปลอดภัย) ไม่ใช่ในพร็อกซี

## ไฟล์ต้นฉบับ

| กังวล                                             | ไฟล์                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| ความละเอียดของรายการที่อนุญาต + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| แอปพลิเคชันมิดเดิลแวร์ (แหล่งความจริงแหล่งเดียว)  | `src/server/authz/pipeline.ts`                                       |
| การตั้งค่าการแทรกต้นทางรันไทม์ →                  | `src/lib/config/runtimeSettings.ts`                                  |
| สถานะรันไทม์สำหรับแดชบอร์ด                        | `src/app/api/settings/authz-inventory/route.ts`                      |
| ป้ายเตือนแดชบอร์ด                                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| ช่องต้นทางที่อนุญาตของ CORS                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent ต่อเส้นทาง CORS (ข้อยกเว้น)           | `src/lib/cloudAgent/api.ts`                                          |
| การจับมือ WebSocket การตรวจสอบ `Origin`           | `src/server/origin/wsOrigin.ts`                                      |

## ดูเพิ่มเติม

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) การบังคับใช้ลูปแบ็ค — สำหรับเส้นทางที่สามารถวางไข่ได้ (การควบคุมเสริมที่แยกต่างหาก)
- [คู่มือการอนุญาต](../architecture/AUTHZ_GUIDE.md) — ไปป์ไลน์การรับรองความถูกต้องแบบเต็ม
