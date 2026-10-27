# OmniRoute MCP Server Documentation (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> เซิร์ฟเวอร์ Model Context Protocol ที่มีเครื่องมือ 110 รายการ ครอบคลุมการดำเนินการด้าน routing, cache, compression, memory, skills, proxy, pool, Radar และ context source
>
> แหล่งข้อมูลอ้างอิงหลัก: `open-sse/mcp-server/server.ts` คำนวณได้ว่าเป็น **เครื่องมือที่ไม่ซ้ำกัน 110 รายการ** ด้วย `countUniqueMcpTools()`: คำจำกัดความมาตรฐาน 45 รายการ (รวมถึงเครื่องมือวงจรชีวิต CCR ทั้งหกรายการ ชุดเครื่องมือ agent-skills สามรายการ `omniroute_radar_catalog` และ `omniroute_x_search`) รวมกับ memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3) และเครื่องมือ compression สำหรับ RTK เท่านั้นอีกสองรายการ

## การติดตั้ง

OmniRoute MCP มีมาให้ในตัว เริ่มใช้งานด้วย:

```bash
omniroute --mcp
```

หรือผ่าน transport แบบ open-sse:

```bash
# transport แบบ HTTP streamable (พอร์ต 20130)
omniroute --dev  # MCP เริ่มทำงานโดยอัตโนมัติที่ endpoint /mcp
```

transport แบบ HTTP (`sse` / `streamable-http` ซึ่งให้บริการภายในโปรเซสโดยเซิร์ฟเวอร์แดชบอร์ด) จะ
ปิดอยู่โดยค่าเริ่มต้น และก่อนหน้านี้สามารถเปิดหรือปิดได้จากหน้า `/dashboard/mcp` เท่านั้น ตั้งแต่ v3.8.51
เป็นต้นมา CLI มีความสามารถเทียบเท่ากันแล้ว:

```bash
omniroute mcp status                                  # สถานะ enabled/online, transport และจำนวนเครื่องมือ
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # รีเซ็ตเซสชัน sse/streamable-http ที่กำลังทำงาน
```

`mcp enable`/`mcp disable` ส่งคำขอ PATCH ไปยังการตั้งค่า `mcpEnabled` เดียวกัน (และอาจรวมถึง `mcpTransport`)
ที่แดชบอร์ดใช้เปิดหรือปิดผ่าน `/api/settings` ส่วน `mcp restart` จะเรียก `POST /api/mcp/restart`: โดยจะยุติ
เซสชัน `sse`/`streamable-http` ที่กำลังทำงาน เพื่อให้คำขอถัดไปเริ่มต้นใหม่ได้อย่างเรียบร้อย ส่งคืน
`409` หาก MCP ถูกปิดใช้งาน และ `501` สำหรับ transport แบบ `stdio` (ไคลเอนต์ stdio เป็นเจ้าของ
โปรเซสย่อยของตนเอง จึงไม่มี handle ภายในโปรเซสสำหรับเริ่มการทำงานใหม่)

## Transport

เซิร์ฟเวอร์ MCP เปิดให้ใช้ transport สามแบบ ซึ่งทั้งหมดทำงานบน factory `createMcpServer()` เดียวกัน:

| Transport         | ตำแหน่ง                                      | กรณีที่ควรใช้                                          |
| :---------------- | :------------------------------------------- | :----------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | การผสานรวมกับ IDE (Claude Desktop, Cursor ฯลฯ)         |
| `sse`             | `POST/GET /api/mcp/sse` ผ่าน `httpTransport` | ไคลเอนต์เบราว์เซอร์/เอเจนต์ที่ต้องใช้ event stream     |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | ไคลเอนต์ HTTP แบบหลายเซสชัน (ส่วนหัว `mcp-session-id`) |

transport แบบ HTTP ที่ใช้งานอยู่ (`sse` หรือ `streamable-http`) จะถูกเลือกด้วยการตั้งค่า `mcpTransport` การสลับ transport จะปิดเซสชันที่มีอยู่บน transport อีกแบบหนึ่ง

### การเข้าถึงจากระยะไกล (การข้ามข้อจำกัดด้วย scope แบบ manage)

`/api/mcp/*` อยู่ในระดับ LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — โดยค่าเริ่มต้นจะมีเพียงโฮสต์ loopback (`localhost`, `127.0.0.1`, `::1`) เท่านั้นที่เข้าถึงได้ ตั้งแต่ v3.8.2 เป็นต้นมา ไคลเอนต์ที่ไม่ใช่ loopback สามารถเชื่อมต่อได้ หากส่ง `Authorization: Bearer <api-key>` ซึ่งคีย์นั้นมี scope `manage` นี่เป็นวิธีเดียวในการเข้าถึงเซิร์ฟเวอร์ MCP ระยะไกลผ่าน tunnel, reverse proxy หรือชื่อโฮสต์สาธารณะ

```bash
# ให้สิทธิ์ scope แบบ manage: เปิดหน้า API Keys ของแดชบอร์ดแล้วเปิดใช้
# "Management Access" สำหรับคีย์ หรือ POST scopes:["manage"] ขณะสร้างคีย์

# จากนั้นเชื่อมต่อจากไคลเอนต์ MCP ระยะไกล:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

คีย์ที่ไม่มี scope `manage` (หรือไม่มี Bearer) จะได้รับ `403 LOCAL_ONLY` ส่วน prefix ที่อยู่ในระดับเดียวกันอย่าง `/api/cli-tools/runtime/*` ถูกกำหนดโดยเจตนาให้ไม่สามารถข้ามข้อจำกัดนี้ได้ — ดู [ระดับ Route Guard — ข้อยกเว้นสำหรับ scope แบบ manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)

### การตรวจสอบ Origin

หลังการยืนยันตัวตน ทุกคำขอที่ไปยัง `/api/mcp/*` — ทั้ง transport และเส้นทางจัดการอย่าง `status`, `tools`, `audit`, `restart` — จะถูกตรวจสอบเฮดเดอร์ `Origin` ไม่ว่าผู้เรียกจะเป็นใคร (API key, โทเคน CLI, เซสชัน dashboard หรือ loopback แบบไม่ระบุตัวตนเมื่อปิดการล็อกอิน) นี่คือการป้องกัน DNS rebinding ที่ข้อกำหนด MCP Streamable HTTP บังคับ

- **ไม่มีเฮดเดอร์ `Origin`** → อนุญาต OmniRoute CLI, SDK และไคลเอนต์ IDE ไม่ส่งเฮดเดอร์นี้
- **`Origin` ที่อนุญาต** → `localhost` / `127.0.0.1` / `[::1]` บนพอร์ตใดก็ได้ หรือ origin สาธารณะของ OmniRoute เอง: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, origin ที่ reverse proxy ที่เชื่อถือได้ส่งต่อมา (`OMNIROUTE_TRUST_PROXY` เฉพาะเมื่อไม่ได้ตั้ง base URL) หรือโฮสต์ IP แบบ loopback/LAN ที่เข้าถึงโดยตรง เฮดเดอร์ `Host` เพียงอย่างเดียวไม่มีทางทำให้ origin ใดเชื่อถือได้
- **`Origin` อื่นใด รวมถึง `null`** → `403` พร้อมเนื้อหาข้อผิดพลาด JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"` เซสชัน dashboard ที่แสดงโทเคน CSRF ที่ถูกต้องยังคงได้รับอนุญาต เช่นเดียวกับการเขียนอื่นๆ ของ dashboard

ไคลเอนต์ MCP บนเบราว์เซอร์ที่ให้บริการหลัง reverse proxy ต้องตั้ง `OMNIROUTE_PUBLIC_BASE_URL` และไม่มีรายการอนุญาตสำหรับ origin อื่น คำขอ preflight ของ CORS (`OPTIONS`) ไม่ถูกตรวจ Origin แต่คำขอที่ตามมาจะถูกตรวจ

## การกำหนดค่า IDE

ดู[การกำหนดค่าไคลเอนต์ MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) สำหรับการตั้งค่า Claude Desktop,
Cursor, Cline และไคลเอนต์ MCP ที่เข้ากันได้

---

## เครื่องมือที่จำเป็น (14) — ระยะที่ 1

| เครื่องมือ                      | ขอบเขต                | คำอธิบาย                                                                                                                 |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | ระยะเวลาการทำงาน หน่วยความจำ ตัวตัดวงจร ขีดจำกัดอัตรา และสถิติแคช                                                        |
| `omniroute_list_combos`         | `read:combos`         | คอมโบทั้งหมดที่กำหนดค่าไว้พร้อมกลยุทธ์ (เลือกแสดงเมตริกได้)                                                              |
| `omniroute_get_combo_metrics`   | `read:combos`         | เมตริกประสิทธิภาพสำหรับคอมโบที่ระบุ                                                                                      |
| `omniroute_switch_combo`        | `write:combos`        | เปิดใช้งานหรือปิดใช้งานคอมโบ                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | สร้างคอมโบที่ผ่านการตรวจสอบผ่าน API คอมโบที่มีอยู่                                                                       |
| `omniroute_check_quota`         | `read:quota`          | โควตาที่ใช้/ทั้งหมด เปอร์เซ็นต์ที่เหลือ เวลารีเซ็ต และสถานะโทเค็น                                                        |
| `omniroute_route_request`       | `execute:completions` | ส่งคำขอการเติมเต็มแชตผ่านการกำหนดเส้นทางของ OmniRoute                                                                    |
| `omniroute_cost_report`         | `read:usage`          | รายงานค่าใช้จ่ายตามช่วงเวลา (เซสชัน/วัน/สัปดาห์/เดือน)                                                                   |
| `omniroute_list_models_catalog` | `read:models`         | แค็ตตาล็อกโมเดลฉบับเต็มพร้อมความสามารถ สถานะ และราคา                                                                     |
| `omniroute_radar_catalog`       | `read:radar`          | แค็ตตาล็อก Radar ภายในเครื่องที่มีลายเซ็น พร้อมตัวกรองผู้ให้บริการ/ตระกูลที่เลือกใช้ได้                                  |
| `omniroute_tool_search`         | `read:tools`          | ค้นหาเครื่องมือจากแค็ตตาล็อก MCP ที่ลงทะเบียนไว้                                                                         |
| `omniroute_web_search`          | `execute:search`      | ค้นหาเว็บผ่านผู้ให้บริการค้นหาที่กำหนดค่าไว้ ไม่ใช่ X/Twitter                                                            |
| `omniroute_x_search`            | `execute:search`      | ค้นหา X ผ่าน xAI/SuperGrok หรือเลือก `xquik-search` สำหรับผลลัพธ์จาก Xquik API ต้องมีข้อมูลรับรองสำหรับแบ็กเอนด์ที่เลือก |
| `omniroute_web_fetch`           | `execute:search`      | ดึงเนื้อหาเว็บผ่านผู้ให้บริการดึงข้อมูลที่กำหนดค่าไว้                                                                    |

## เครื่องมือขั้นสูง (11) — ระยะที่ 2

| เครื่องมือ                         | ขอบเขตสิทธิ์                         | คำอธิบาย                                                                                                 |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | จำลองการกำหนดเส้นทางแบบไม่ดำเนินการจริงพร้อมแผนผังสำรอง                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | กำหนดงบประมาณของเซสชันพร้อมการดำเนินการแบบลดระดับ/บล็อก/แจ้งเตือน                                        |
| `omniroute_set_routing_strategy`   | `write:combos`                       | อัปเดตกลยุทธ์คอมโบขณะรันไทม์ (priority/weighted/auto/ฯลฯ)                                                |
| `omniroute_set_resilience_profile` | `write:resilience`                   | ใช้ค่าที่ตั้งไว้ล่วงหน้าสำหรับความยืดหยุ่น `aggressive` / `balanced` / `conservative`                    |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | ทดสอบผู้ให้บริการทุกรายในคอมโบแบบสดโดยใช้การเรียกต้นทางจริง                                              |
| `omniroute_get_provider_metrics`   | `read:health`                        | เมตริกแยกตามผู้ให้บริการ พร้อมเวลาแฝง p50/p95/p99 และสถานะเซอร์กิตเบรกเกอร์                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | แนะนำคอมโบตามประเภทงาน โดยคำนึงถึงข้อจำกัดด้านงบประมาณ/เวลาแฝง                                           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | อธิบายเหตุผลที่คำขอถูกกำหนดเส้นทางไปยังผู้ให้บริการรายหนึ่ง (ปัจจัยการให้คะแนน + เส้นทางสำรอง)           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | สแนปช็อตเซสชันฉบับเต็ม: ค่าใช้จ่าย โทเค็น โมเดล/ผู้ให้บริการยอดนิยม ข้อผิดพลาด ตัวควบคุมงบประมาณ         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | วินิจฉัย (และเลือกซ่อมแซมอัตโนมัติ) ความคลาดเคลื่อนของฐานข้อมูล เช่น การอ้างอิงคอมโบที่เสียหาย/แถวกำพร้า |
| `omniroute_sync_pricing`           | `pricing:write`                      | ซิงค์ข้อมูลราคาจากแหล่งภายนอก (LiteLLM); รองรับ `dryRun`                                                 |

## เครื่องมือแคช (2)

| เครื่องมือ              | ขอบเขตสิทธิ์  | คำอธิบาย                                                  |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | สถิติแคชเชิงความหมาย แคชพรอมต์ และภาวะดำเนินการครั้งเดียว |
| `omniroute_cache_flush` | `write:cache` | ล้างแคชทั่วทั้งระบบหรือตามลายเซ็น/โมเดล                   |

## เครื่องมือบีบอัด (13)

| เครื่องมือ                          | ขอบเขตสิทธิ์        | คำอธิบาย                                                                                                                  |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | การตั้งค่าการบีบอัด สรุปการวิเคราะห์ และสถิติที่คำนึงถึงแคช (รวมเมทาดาทา `analytics.mcpDescriptionCompression`)           |
| `omniroute_compression_configure`   | `write:compression` | กำหนดค่าโหมดการบีบอัด เกณฑ์ อัตราส่วนเป้าหมาย การคงพรอมต์ระบบไว้ และการเปิด/ปิดการบีบอัดคำอธิบาย MCP                      |
| `omniroute_set_compression_engine`  | `write:compression` | เลือกเอนจินที่ใช้งานอยู่ (off/caveman/rtk/stacked) และระดับความเข้มของ Caveman/RTK                                        |
| `omniroute_list_compression_combos` | `read:compression`  | แสดงรายการคอมโบการบีบอัดที่มีชื่อและไปป์ไลน์เอนจินของแต่ละคอมโบ                                                           |
| `omniroute_compression_combo_stats` | `read:compression`  | การวิเคราะห์ที่จัดกลุ่มตามคอมโบการบีบอัดและเอนจิน                                                                         |
| `omniroute_ccr_store`               | `write:compression` | จัดเก็บเนื้อหาที่แยกตามผู้เรียกไว้ในที่เก็บ CCR ในหน่วยความจำซึ่งมีขนาดจำกัด และส่งคืนเครื่องหมายพร้อมการอ้างอิง `ccr://` |
| `omniroute_ccr_retrieve`            | `read:compression`  | เรียกคืนเนื้อหา CCR แบบเต็ม หรือด้วยโหมดส่วนต้น ส่วนท้าย บรรทัด grep และสถิติ                                             |
| `omniroute_ccr_inspect`             | `read:compression`  | ตรวจสอบเมทาดาทา CCR ที่ผู้เรียกเป็นเจ้าของโดยไม่ส่งคืนเนื้อหา                                                             |
| `omniroute_ccr_list`                | `read:compression`  | แสดงรายการเมทาดาทาแบบแบ่งหน้าสำหรับบล็อก CCR ที่ผู้เรียกเป็นเจ้าของ                                                       |
| `omniroute_ccr_delete`              | `write:compression` | ลบบล็อก CCR ที่ผู้เรียกเป็นเจ้าของ                                                                                        |
| `omniroute_ccr_stats`               | `read:compression`  | รายงานการใช้หน่วยความจำที่จำกัดขอบเขตตามผู้เรียก ตัวนับวงจรชีวิต และขีดจำกัดของที่เก็บ                                    |
| `omniroute_rtk_discover`            | `read:compression`  | ค้นหาสัญญาณรบกวนที่เกิดซ้ำในตัวอย่างเอาต์พุต RTK ที่เลือกเข้าร่วม                                                         |
| `omniroute_rtk_learn`               | `read:compression`  | สร้างร่างตัวกรอง RTK ที่ตรวจทานได้จากตัวอย่างที่เลือกเข้าร่วม                                                             |

รายการ CCR จะอยู่ในหน่วยความจำเท่านั้นและหายไปเมื่อรีสตาร์ต แต่ละบล็อกจำกัดไว้ที่ 2 MiB แต่ละ
ตัวตนหลักจำกัดไว้ที่ 16 MiB และที่เก็บส่วนกลางจำกัดไว้ที่ 64 MiB โดยค่าเริ่มต้น รายการจะมี TTL 24 ชั่วโมง (สูงสุด
เจ็ดวัน) การเรียกคืนผ่าน MCP แบบเต็มจำกัดไว้ที่ 256 KiB ส่วนบล็อกที่ใหญ่กว่ายังคงเข้าถึงได้ผ่าน
โหมดช่วงและ grep การจัดเก็บ การเรียกคืน การแสดงรายการ การตรวจสอบ การลบ และสถิติจะถูกแยกตาม
ตัวตนหลักของ API key ที่ผ่านการตรวจสอบสิทธิ์แล้ว บันทึกการตรวจสอบมีเฉพาะแฮชและเมทาดาทาขนาด โดยไม่มีเนื้อหา

`omniroute_compression_status` รายงานการบีบอัดคำอธิบาย MCP แยกต่างหากภายใต้
`analytics.mcpDescriptionCompression` ค่าเหล่านี้เป็นค่าประมาณขนาดเมตาดาต้าสำหรับคำอธิบาย MCP ที่สามารถแสดงรายการได้
(`tools`, `prompts`, `resources` และ `resourceTemplates`) ไม่ใช่ข้อมูลการใช้งานที่ได้รับจากผู้ให้บริการ
และมีการกำกับด้วย `source: "mcp_metadata_estimate"`

### ตัวกรองโครงสร้างการช่วยการเข้าถึง MCP (v3.8.0)

นอกเหนือจากเครื่องมือบีบอัดข้างต้น OmniRoute ยังมีตัวกรองหลังการดำเนินการที่
บีบอัด **ผลลัพธ์ของเครื่องมือ** จากเครื่องมือเบราว์เซอร์/การช่วยการเข้าถึงของ MCP ก่อนส่งกลับไปยัง
เอเจนต์ ตัวกรองนี้ไม่ใช่เครื่องมือ — โดยจะทำงานอย่างโปร่งใสกับผลลัพธ์ของเครื่องมือใดๆ ที่มี
ข้อความโครงสร้างการช่วยการเข้าถึงหรือสแนปช็อตเบราว์เซอร์ที่มีรายละเอียดมาก (≥2000 อักขระ)

ลักษณะการทำงานหลัก:

- ยุบบรรทัดพี่น้องที่ซ้ำกันต่อเนื่องกัน ≥30 บรรทัดให้เป็นสรุปส่วนต้น + ส่วนท้าย
- รักษาจุดยึด `[ref=eXX]` ที่ Playwright/computer-use ต้องใช้
- ตัดข้อความที่มีขนาดใหญ่เกินไป (>50,000 อักขระ) แบบบังคับ พร้อมคำแนะนำในการนำทาง
- การประหยัดที่คาดไว้: **60–80%** สำหรับเพย์โหลดสแนปช็อตเบราว์เซอร์

การกำหนดค่า: `compression.mcpAccessibility` ในการตั้งค่าส่วนกลาง (การย้ายข้อมูล 056)
การใช้งานจริง: `open-sse/services/compression/engines/mcpAccessibility/`
เอกสารฉบับเต็ม: [กลไกการบีบอัด — ตัวกรองโครงสร้างการช่วยการเข้าถึง MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)

ดู [กลไกการบีบอัด](../compression/COMPRESSION_ENGINES.md) และ [การบีบอัด RTK](../compression/RTK_COMPRESSION.md) สำหรับ
โมเดลการบีบอัดขณะรันไทม์ที่อยู่เบื้องหลังเครื่องมือเหล่านี้

## เครื่องมือ 1Proxy (3)

| เครื่องมือ                  | ขอบเขต         | คำอธิบาย                                                                      |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | ดึงพร็อกซีฟรีจากมาร์เก็ตเพลส 1proxy (ตัวกรองโปรโตคอล/ประเทศ/คุณภาพ/จำนวน)     |
| `omniroute_oneproxy_rotate` | `read:proxies` | รับพร็อกซีถัดไปที่พร้อมใช้งานตามกลยุทธ์ (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | สถิติพูล สถานะการซิงค์ และการกระจายตามโปรโตคอลและประเทศ                       |

## เครื่องมือหน่วยความจำ (3)

กำหนดไว้ใน `open-sse/mcp-server/tools/memoryTools.ts` การยืนยันตัวตน/ขอบเขตถูกบังคับใช้ผ่านไปป์ไลน์ขอบเขต MCP มาตรฐาน

| เครื่องมือ                | ขอบเขต         | คำอธิบาย                                                                          |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | ค้นหาหน่วยความจำตามคำค้นหา / ประเภท / คีย์ API พร้อมบังคับใช้ขีดจำกัดโทเค็น       |
| `omniroute_memory_add`    | `write:memory` | เพิ่มรายการหน่วยความจำใหม่ (`factual` / `episodic` / `procedural` / `semantic`)   |
| `omniroute_memory_clear`  | `write:memory` | ล้างหน่วยความจำสำหรับคีย์ API โดยเลือกกรองตามประเภทหรือเวลาประทับ `olderThan` ได้ |

## เครื่องมือทักษะ (4)

กำหนดไว้ใน `open-sse/mcp-server/tools/skillTools.ts` รองรับโดย `src/lib/skills/registry` + `src/lib/skills/executor`

| เครื่องมือ                    | ขอบเขต           | คำอธิบาย                                                                                |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | แสดงรายการทักษะที่ลงทะเบียนไว้ พร้อมตัวเลือกกรองตามคีย์ API ชื่อ หรือสถานะการเปิดใช้งาน |
| `omniroute_skills_enable`     | `write:skills`   | เปิดหรือปิดใช้งานทักษะที่ระบุด้วย ID                                                    |
| `omniroute_skills_execute`    | `execute:skills` | เรียกใช้ทักษะด้วยอินพุตที่ระบุและส่งคืนระเบียนการดำเนินการ                              |
| `omniroute_skills_executions` | `read:skills`    | แสดงรายการประวัติการเรียกใช้ทักษะล่าสุด                                                 |

## แหล่งบริบท Notion (6)

กำหนดไว้ใน `open-sse/mcp-server/tools/notionTools.ts` โทเค็นถูกจัดเก็บไว้ในตาราง `key_value` ผ่าน `src/lib/db/notion.ts` ไคลเอนต์ REST อยู่ใน `src/lib/notion/api.ts` API การตั้งค่าอยู่ใน `src/app/api/settings/notion/route.ts` UI แดชบอร์ดอยู่ใน `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`

กำหนดค่าโทเค็นการผสานรวม Notion ของคุณจากแท็บ **แหล่งบริบท** ในแดชบอร์ด Endpoint หรือผ่าน REST API:

```bash
# ตั้งค่าโทเค็น
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# ตรวจสอบสถานะ
curl http://localhost:20128/api/settings/notion

# ยกเลิกการเชื่อมต่อ
curl -X DELETE http://localhost:20128/api/settings/notion
```

| เครื่องมือ                   | ขอบเขต         | คำอธิบาย                                                |
| :--------------------------- | :------------- | :------------------------------------------------------ |
| `notion_search`              | `read:notion`  | ค้นหาข้อความแบบเต็มในทุกหน้าและฐานข้อมูล                |
| `notion_get_page`            | `read:notion`  | รับหน้าตาม ID พร้อมคุณสมบัติของหน้า                     |
| `notion_list_block_children` | `read:notion`  | แสดงรายการบล็อกลูกของหน้าหรือบล็อก                      |
| `notion_query_database`      | `read:notion`  | สืบค้นฐานข้อมูลด้วยตัวกรอง การเรียงลำดับ และการแบ่งหน้า |
| `notion_get_database`        | `read:notion`  | รับสคีมาฐานข้อมูลตาม ID                                 |
| `notion_append_blocks`       | `write:notion` | เพิ่มบล็อกลูกต่อท้ายบล็อกแม่ (สูงสุด 100 รายการต่อคำขอ) |

## เครื่องมือแค็ตตาล็อก Agent Skill (3 รายการ)

กำหนดไว้ใน `open-sse/mcp-server/tools/agentSkillTools.ts` และขับเคลื่อนโดย `src/lib/agentSkills/catalog` เครื่องมือเหล่านี้เปิดให้ไคลเอนต์ MCP และเอเจนต์ภายนอกเข้าถึงแค็ตตาล็อกเอกสาร Agent Skills ซึ่งมี 45 รายการ ขอบเขตสิทธิ์: `read:catalog`

| เครื่องมือ                        | ขอบเขตสิทธิ์   | คำอธิบาย                                                                                                                                           |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | แสดงรายการ Agent Skill ทั้ง 45 รายการ พร้อมตัวกรอง `category` (api\|cli) และ `area` ซึ่งเป็นตัวเลือก โดยส่งคืนข้อมูลเมตาและความครอบคลุม            |
| `omniroute_agent_skills_get`      | `read:catalog` | รับข้อมูลเมตาแบบเต็มและเนื้อหา SKILL.md สำหรับ Skill รายการเดียวตาม `id` มาตรฐาน                                                                   |
| `omniroute_agent_skills_coverage` | `read:catalog` | สถิติความครอบคลุม: จำนวน Skill จาก API 23 รายการ, CLI 21 รายการ และ config 1 รายการ ที่มีไฟล์ SKILL.md อยู่ในระบบไฟล์ เทียบกับจำนวนรวมในแค็ตตาล็อก |

ดูแค็ตตาล็อกฉบับเต็มและวิธีที่เอเจนต์ภายนอกใช้งานได้ที่ [AGENT-SKILLS.md](./AGENT-SKILLS.md)

## เฟรมเวิร์กที่เกี่ยวข้อง (v3.8.0)

รายการเครื่องมือ MCP ข้างต้น (เครื่องมือที่ไม่ซ้ำกัน 110 รายการ ซึ่งคำนวณโดย `countUniqueMcpTools()`) ถูกกำหนดขอบเขตโดยเจตนา
ให้ครอบคลุมการดำเนินงานด้านการกำหนดเส้นทาง/แคช/การบีบอัด/หน่วยความจำ/Skill/พร็อกซี/แหล่งที่มาของบริบทในขณะรันไทม์ มีเฟรมเวิร์กที่เกี่ยวข้องอีกสองรายการ
ซึ่งมาพร้อมกับเซิร์ฟเวอร์ MCP ใน v3.8.0 และมีเอกสารแยกต่างหาก:

### Cloud Agents

Cloud Agents คือเอเจนต์ AI สำหรับเขียนโค้ดที่ทำงานนอกโพรเซส (codex-cloud, cursor-cloud, devin, jules) ซึ่งเชื่อมต่อกับ
OmniRoute ผ่านโมเดลการเชื่อมต่อเดียวกับที่ใช้สำหรับผู้ให้บริการ LLM โดยเปิดให้เข้าถึงผ่าน
REST ของตนเอง (`/api/v1/agents/*`) และ **ไม่ได้** เป็นส่วนหนึ่งของแค็ตตาล็อกเครื่องมือ MCP
— การเรียก Cloud Agent จะไม่ใช้ขอบเขตสิทธิ์ MCP

- การใช้งานจริง: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)
- วงจรการทำงาน: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
- เอกสาร: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)

### Guardrails

Guardrails คือตัวกรองก่อน/หลังการดำเนินการ (vision-bridge, pii-masker, prompt-injection)
ที่ใช้ภายในไปป์ไลน์แชต โดยจะทำงานก่อนถึงเลเยอร์เครื่องมือ/การกำหนดเส้นทาง MCP
และส่งการละเมิดแบบมีโครงสร้างไปยังไปป์ไลน์การตรวจสอบ ทั้งนี้ Guardrails ไม่ได้ถูกเรียกใช้ในฐานะเครื่องมือ MCP

- การใช้งานจริง: `src/lib/guardrails/`
- เอกสาร: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)

เมื่อดีบักการเรียก MCP ที่ดูเหมือนจะถูกบล็อก ให้ตรวจสอบทั้งบันทึกการตรวจสอบ MCP
(รายการ `scope_denied:*`) และร่องรอยการตรวจสอบของ Guardrails — คำขออาจถูกปฏิเสธโดย
Guardrail **ก่อน** ที่จะไปถึงเลเยอร์บังคับใช้ขอบเขตสิทธิ์ MCP

---

## เอนด์พอยต์ REST API

| เอนด์พอยต์             | เมธอด                 | คำอธิบาย                                                                                               | การยืนยันตัวตน                 |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------- | :----------------------------- |
| `/api/mcp/status`      | `GET`                 | สถานะเซิร์ฟเวอร์: สัญญาณ heartbeat, สถานะการขนส่ง HTTP, สรุปกิจกรรมการตรวจสอบ                          | การจัดการ (เซสชัน/ผู้ดูแลระบบ) |
| `/api/mcp/tools`       | `GET`                 | แค็ตตาล็อกเครื่องมือ (ชื่อ, คำอธิบาย, ขอบเขตสิทธิ์, เฟส, เอนด์พอยต์ต้นทาง)                             | การจัดการ                      |
| `/api/mcp/sse`         | `GET` / `POST`        | เอนด์พอยต์การขนส่ง SSE (ควบคุมโดย `mcpEnabled` + `mcpTransport === "sse"`)                             | คีย์ API + ขอบเขตสิทธิ์        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | การขนส่ง HTTP แบบสตรีมได้ (ใช้ส่วนหัว `mcp-session-id`; `DELETE` ยุติเซสชัน)                           | คีย์ API + ขอบเขตสิทธิ์        |
| `/api/mcp/audit`       | `GET`                 | รายการบันทึกการตรวจสอบจาก `mcp_tool_audit` (ตัวกรอง: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | การจัดการ                      |
| `/api/mcp/audit/stats` | `GET`                 | สถิติการตรวจสอบแบบรวม (`totalCalls`, `successRate`, `avgDurationMs`, เครื่องมือยอดนิยม)                | การจัดการ                      |

ไฟล์ต้นฉบับ: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`

ทั้งการขนส่ง SSE และ HTTP แบบสตรีมได้จะถูกบล็อกจนกว่าจะเปิดใช้งานเซิร์ฟเวอร์ MCP ใน Settings (`mcpEnabled`) และเลือก `mcpTransport` ที่เหมาะสม หากกำหนดค่าการขนส่งไม่ถูกต้อง เส้นทางจะส่งคืน HTTP 400 พร้อมคำแนะนำให้เปลี่ยนการตั้งค่า

---

## การยืนยันตัวตนและขอบเขตสิทธิ์

การเรียกใช้เครื่องมือ MCP จะอ่านสตริงขอบเขตสิทธิ์จากผู้เรียก การตรวจสอบดังกล่าวเป็นหนึ่งในเนมสเปซอิสระสามรายการ การผ่านตัวตรวจสอบหนึ่งไม่ได้หมายความว่าจะผ่านตัวตรวจสอบอื่นด้วย กฎต่างๆ อยู่ที่ [เนมสเปซขอบเขตสิทธิ์สามรายการ](#three-scope-namespaces)
แค็ตตาล็อกเครื่องมืออยู่ที่ [ขอบเขตสิทธิ์ของเครื่องมือ MCP](#mcp-tool-scopes)

### เนมสเปซขอบเขตสิทธิ์สามรายการ

`manage` บนคีย์ API, `read:compression` บนเครื่องมือ MCP และ `read` บนโทเค็นการเข้าถึง `oma_live_…` เป็นสิทธิ์อนุญาตสามรายการที่แตกต่างกัน ผู้เรียกที่ส่งโทเค็นการเข้าถึง `read` ไปยังเส้นทางการจัดการที่แก้ไขข้อมูลจะได้รับ HTTP 403
`Access token scope 'read' is insufficient; 'write' required.`
ลำดับสิทธิ์ดังกล่าวคือ `scopeSatisfies` ซึ่งจะไม่ตรวจสอบตาราง MCP และตัวจับคู่ MCP ก็จะไม่ตรวจสอบลำดับสิทธิ์นี้

| เนมสเปซ                       | ข้อมูลประจำตัว                                                    | ตัวตรวจสอบ                    | เมื่อผ่านจะอนุญาต                                           |
| :---------------------------- | :---------------------------------------------------------------- | :---------------------------- | :---------------------------------------------------------- |
| การจัดการด้วยคีย์ API         | `api_keys.scopes`                                                 | `hasManageScope`              | REST สำหรับการจัดการของคีย์ Bearer นั้น                     |
| สิทธิ์เพิ่มเติมของคีย์ API    | อาร์เรย์เดียวกัน โดยใช้สตริงที่ตรงกันทุกประการ                    | ตัวช่วยที่ระบุชื่อไว้ด้านล่าง | เฉพาะความสามารถนั้นเพียงรายการเดียว                         |
| ขอบเขตสิทธิ์ของเครื่องมือ MCP | อาร์เรย์เดียวกัน หรือ `_meta` ของ MCP หรือ `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                | เครื่องมือนั้น เมื่อเปิดใช้การบังคับใช้                     |
| โทเค็นการเข้าถึง              | `oma_live_…`                                                      | `scopeSatisfies`              | เส้นทางการจัดการที่เมธอดและพาธกำหนดให้ต้องมีลำดับสิทธิ์นั้น |

การออกข้อมูลประจำตัวแต่ละประเภทอธิบายไว้ใน
[การยืนยันตัวตนสำหรับการจัดการ](../guides/MANAGEMENT-AUTH.md)

#### ขอบเขตสิทธิ์ของคีย์ API

อาร์เรย์ `api_keys.scopes` หนึ่งรายการรองรับงานสองอย่าง โดยใช้ฟังก์ชันที่แตกต่างกัน

**REST สำหรับการจัดการ** `manage` และ `admin` เป็นสมาชิกของ
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`)
`hasManageScope` เป็นสิ่งที่อนุญาตเส้นทางการจัดการสำหรับคีย์นั้น `admin` สามารถใช้ความสามารถด้านการจัดการบนเส้นทางเหล่านั้นได้ คำว่า `admin` ในที่นี้ไม่ใช่ลำดับสิทธิ์ของโทเค็นการเข้าถึง และไม่ได้ขยายเป็นขอบเขตสิทธิ์ของเครื่องมือ MCP

**สตริงสิทธิ์เพิ่มเติม** แต่ละรายการเป็นการทดสอบความเป็นสมาชิกที่ต้องตรงกันทุกประการ และแต่ละรายการยังคงอยู่นอก `MANAGEMENT_API_KEY_SCOPES`

| ขอบเขตสิทธิ์                   | เมื่อผ่านจะอนุญาต                                                                                                                                                     |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | เฉพาะข้อยกเว้น LOCAL_ONLY ของ `/api/mcp/` ที่ไม่ได้มาจาก loopback (`hasMcpConnectOrManageScope`) คีย์ที่มี `manage` หรือ `admin` ยังคงผ่านข้อยกเว้นนี้                |
| `self:usage`                   | `GET /api/v1/me/status` สำหรับคีย์นี้ (`src/app/api/v1/me/status/route.ts`) `POST /api/keys` จะเพิ่มขอบเขตสิทธิ์นี้เมื่อสร้าง (`normalizeSelfServiceScopesForCreate`) |
| `self:account-quota`           | โควตาบัญชีต้นทางภายในเพย์โหลดสถานะนั้น (`src/lib/usage/apiKeySelfService.ts`) เส้นทางสถานะยังคงต้องใช้ `self:usage`                                                   |
| `policy:bypass-provider-quota` | การเรียกใช้การอนุมานของคีย์นี้จะข้ามนโยบายโควตาของผู้ให้บริการ (`hasProviderQuotaBypassScope` ใน `src/sse/handlers/chat.ts`)                                          |

#### การจับคู่

แค็ตตาล็อกคือตารางภายใต้ [ขอบเขตสิทธิ์ของเครื่องมือ MCP](#mcp-tool-scopes) อย่าถือว่า `MCP_SCOPE_LIST` ใน `src/shared/constants/mcpScopes.ts` เป็นแค็ตตาล็อกดังกล่าว เนื่องจากรายการนั้นเป็นเพียงชุดย่อยดั้งเดิมที่มีการกำหนดชนิด เครื่องมือที่เพิ่มเข้ามาภายหลังประกาศขอบเขตสิทธิ์เพิ่มเติมไว้ข้างๆ รายการนั้น (`read:notion`, `read:skills`, `read:local-corpus` และรายการที่เหลือในตาราง)

`evaluateToolScopes` ใน `open-sse/mcp-server/scopeEnforcement.ts` อนุญาตการเรียกเมื่อขอบเขตสิทธิ์ที่จำเป็นทุกรายการตรงกับขอบเขตสิทธิ์ที่ได้รับบางรายการ:

- `*` ตรงกับขอบเขตสิทธิ์ที่จำเป็นทุกรายการ
- ขอบเขตสิทธิ์ที่ได้รับซึ่งลงท้ายด้วย `*` จะตรงกับขอบเขตสิทธิ์ที่จำเป็นซึ่งขึ้นต้นด้วยคำนำหน้าก่อนเครื่องหมายดอกจัน `read:*` ตรงกับ `read:compression`
- ขอบเขตสิทธิ์อื่นที่ได้รับแต่ละรายการจะตรงกับสตริงขอบเขตสิทธิ์ที่จำเป็นซึ่งเหมือนกันทุกประการเท่านั้น

คีย์ที่มีขอบเขตสิทธิ์เป็น `["manage"]` จะไม่ผ่าน `scopeMatches` สำหรับ `read:compression`
การเรียกเดียวกันจะไม่ผ่านเช่นกันสำหรับ `admin`, `mcp:connect`, `read` และ `write` เมื่อสตริงเหล่านั้นเป็นขอบเขตสิทธิ์เดียวที่ได้รับ ไม่มีลำดับชั้นระหว่างขอบเขตสิทธิ์ของเครื่องมือ MCP นอกเหนือจาก `*` ที่ส่วนท้าย

การบังคับใช้จะปิดอยู่ เว้นแต่ `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (ค่าเริ่มต้นคือ
`false`) ขณะที่ปิดอยู่ `evaluateToolScopes` จะอนุญาตการเรียกและข้ามแค็ตตาล็อก ขณะที่เปิดอยู่ HTTP จะใช้ `api_keys.scopes` ของคีย์ Bearer เป็น `authInfo` (ดู [การผูกขอบเขตสิทธิ์ HTTP ต่อคีย์](#per-key-http-scope-binding-7895))
เมื่อไม่สามารถหาขอบเขตสิทธิ์ของคีย์ได้ ชุดสิทธิ์ที่ได้รับจะย้อนกลับไปใช้ `_meta` ของ MCP แล้วจึงใช้ `OMNIROUTE_MCP_SCOPES`

#### ขอบเขตสิทธิ์ของโทเค็นการเข้าถึง

โทเค็น `oma_live_…` (`src/lib/accessTokens/scopes.ts`) มี `read`, `write` หรือ `admin` โดย `scopeSatisfies` เป็นลำดับสิทธิ์: `admin` ครอบคลุม `write` และ `read` ส่วน `write` ครอบคลุม `read` ขอบเขตสิทธิ์ที่ไม่รู้จักจะไม่ครอบคลุมสิ่งใด

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) เปรียบเทียบลำดับสิทธิ์นั้นกับ `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` และ `OPTIONS` ต้องใช้ `read`
- เมธอดอื่นทั้งหมดต้องใช้ `write`
- พาธใน `ADMIN_SCOPE_PREFIXES` ต้องใช้ `admin` สำหรับทุกเมธอด `/api/mcp` อยู่ในรายการดังกล่าว ดังนั้นโทเค็นการเข้าถึง `write` จึงยังคงไม่สามารถเรียกใช้อินเทอร์เฟซ HTTP ของ MCP ได้
- พาธใน `ADMIN_MUTATION_PREFIXES` ต้องใช้ `admin` เฉพาะสำหรับการแก้ไขข้อมูล
- พาธใน `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`,
  `/api/settings/require-login`) ต้องใช้ `admin` เฉพาะสำหรับการแก้ไขข้อมูล และเฉพาะบนพาธที่ตรงกันทุกประการเท่านั้น ส่วนเส้นทางย่อย `/api/settings/*` อื่นๆ ยังคงใช้ `write`

`PATCH /api/keys/{id}` เป็นการเปลี่ยนแปลงข้อมูลและไม่ได้อยู่ในรายการผู้ดูแลระบบเหล่านั้น ดังนั้นโทเค็น
`read` จะได้รับ 403
`Access token scope 'read' is insufficient; 'write' required.`
โทเค็นการเข้าถึงแบบ `write` หรือ `admin` เป็นไปตามข้อกำหนดของเส้นทางนั้น ส่วน JWT ของแดชบอร์ด,
โทเค็น machine-id ของ CLI แบบ loopback และ API key ที่มี `manage` หรือ `admin` จะใช้
เงื่อนไขสาขาอื่นและไม่ถูกจำกัดด้วยลำดับระดับนี้

โทเค็นการเข้าถึงที่ผ่าน `scopeSatisfies` สำหรับ `/api/mcp` หมายความว่าผ่านเพียง
ด่านการจัดการเท่านั้น การเรียกใช้เครื่องมือยังคงเรียก `scopeMatches` เพื่อตรวจสอบกับขอบเขตของ API key
โดยลำดับระดับของโทเค็นการเข้าถึงไม่ได้เป็นอินพุตของ `scopeMatches`

### ขอบเขตของเครื่องมือ MCP

การบังคับใช้ขอบเขตถูกรวมศูนย์ไว้ที่ `open-sse/mcp-server/scopeEnforcement.ts`
เครื่องมือแต่ละรายการต้องใช้ขอบเขตเฉพาะดังต่อไปนี้:

| ขอบเขต                | เครื่องมือ                                                                                                                                                                              |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                       |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                               |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                  |
| `read:quota`          | `check_quota`                                                                                                                                                                           |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                  |
| `read:models`         | `list_models_catalog`                                                                                                                                                                   |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                           |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                   |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                      |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                             |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                          |
| `read:cache`          | `cache_stats`                                                                                                                                                                           |
| `write:cache`         | `cache_flush`                                                                                                                                                                           |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                              |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                       |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                   |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                        |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                  |
| `read:memory`         | `memory_search`                                                                                                                                                                         |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                            |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                      |
| `write:skills`        | `skills_enable`                                                                                                                                                                         |
| `execute:skills`      | `skills_execute`                                                                                                                                                                        |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                        |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                 |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                               |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                        |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                          |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                      |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                         |
| `read:obsidian`       | เครื่องมืออ่าน 13 รายการ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | เครื่องมือเขียน 9 รายการ — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                       |

รองรับสโคปแบบไวลด์การ์ด: `read:*` ให้สิทธิ์แก่สโคปการอ่านทั้งหมด ส่วน `*` ให้สิทธิ์เข้าถึงอย่างเต็มรูปแบบ

### `mcp:connect` — ความสามารถแบบจำกัดสำหรับเส้นทาง (#7895)

การเข้าถึงการรับส่งข้อมูล MCP ผ่าน HTTP/SSE (`/api/mcp/*`) จากที่อยู่ที่ไม่ใช่ลูปแบ็กจำเป็นต้องใช้
ข้อยกเว้น LOCAL_ONLY ของ `/api/mcp/` (ดู `docs/security/ROUTE_GUARD_TIERS.md`) ในอดีต
ข้อยกเว้นดังกล่าวยอมรับเฉพาะคีย์ API ที่มีสโคป `manage`/`admin` แบบเต็มเท่านั้น ซึ่งกว้างเกินไปสำหรับ
ผู้เรียกที่ต้องการเพียงสื่อสารกับ MCP ขณะนี้ `src/shared/constants/managementScopes.ts`
ส่งออก `MCP_CONNECT_SCOPE = "mcp:connect"` ซึ่งเป็นสโคปแบบจำกัดที่เพิ่มเข้ามา (ตามแนวทางเดียวกับ
`SELF_USAGE_SCOPE`) โดยอนุญาตเฉพาะการข้ามข้อจำกัดของ `/api/mcp/` ใน
`src/server/authz/policies/management.ts` เท่านั้น — ไม่ได้ให้สิทธิ์เข้าถึงเส้นทางการจัดการอื่นใด
และจงใจไม่รวมไว้ใน `MANAGEMENT_API_KEY_SCOPES` คีย์ที่มีสโคป `manage`/`admin`
ยังคงผ่านข้อยกเว้นนี้ได้เช่นเดิม ส่วน `mcp:connect` เป็นทางเลือกที่มีสิทธิ์ต่ำกว่าสำหรับ
ผู้เรียกจากระยะไกลที่ใช้เฉพาะ MCP โดยตรวจสอบผ่าน `hasMcpConnectOrManageScope()`

### การผูกสโคป HTTP แยกตามคีย์ (#7895)

เมื่อใช้งานผ่าน HTTP/SSE ขณะนี้ `open-sse/mcp-server/httpTransport.ts` จะตรวจหาค่า
`api_keys.scopes` จริงของผู้เรียกผ่าน `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
และส่งค่านั้นไปยัง `transport.handleRequest(req, { authInfo })` ของ MCP SDK เพื่อให้
`extra.authInfo.scopes` ที่ส่งถึงการเรียกเครื่องมือแต่ละครั้งสะท้อนสโคปจริงของ Bearer key
`resolveCallerScopeContext()` ใน `scopeEnforcement.ts` ให้ความสำคัญกับ `authInfo` มากกว่า
`_meta` และค่าทดแทนจากตัวแปรสภาพแวดล้อม `OMNIROUTE_MCP_SCOPES` อยู่แล้ว — การเปลี่ยนแปลงนี้เพียงเติมข้อมูลให้กับ
แหล่งข้อมูลแรกที่มีลำดับความสำคัญสูงสุด ซึ่งก่อนหน้านี้ไม่ได้รับข้อมูลผ่าน HTTP เมื่อไม่สามารถระบุคีย์ API ได้
(ไม่มีส่วนหัว หรือคีย์ไม่ถูกต้อง) `authInfo` จะยังคงเป็น `undefined` และการตรวจหาจะดำเนินต่อไปตาม
ลำดับ `meta`/ตัวแปรสภาพแวดล้อมเดิมโดยไม่มีการเปลี่ยนแปลง stdio ไม่มีข้อมูลระบุตัวตนแยกตามผู้เรียก (ดู
`mcpCallerIdentity.ts`) และไม่ได้รับผลกระทบ — ยังคงใช้ลำดับค่าทดแทนจาก `_meta`/ตัวแปรสภาพแวดล้อมต่อไป

**การบังคับใช้จะถูกเปิดสำหรับผู้เรียก HTTP/SSE ที่มีสโคปแบบจำกัดเสมอ โดยไม่ขึ้นกับ
`OMNIROUTE_MCP_ENFORCE_SCOPES`** การที่ `OMNIROUTE_MCP_ENFORCE_SCOPES` มีค่าเริ่มต้นเป็น `false` จะปลอดภัยเฉพาะ
สำหรับขั้นตอนการทำงานแบบผู้ดำเนินการคนเดียวผ่าน local/stdio ซึ่งไม่มีข้อมูลระบุตัวตนแยกตามผู้เรียกให้ใช้กำหนดสโคป
`open-sse/mcp-server/server.ts::withScopeEnforcement()` จะเปิดการบังคับใช้สโคปแยกตามเครื่องมือ
โดยไม่มีเงื่อนไข (`shouldForceScopeEnforcement()` ใน `scopeEnforcement.ts`)
เมื่อใดก็ตามที่ `resolveCallerScopeContext()` ระบุได้ว่า
`source === "authInfo"` (กล่าวคือ เป็นส่วนหัว HTTP Authorization จริงที่แยกตามคีย์และใช้กับ HTTP/SSE เท่านั้น) และคีย์นั้น
ไม่มีสโคป `manage`/`admin` แบบเต็ม การดำเนินการนี้อุดช่องโหว่ที่คีย์ซึ่งมีเพียง
สโคปข้อยกเว้นแบบจำกัด `mcp:connect` — ซึ่งอธิบายไว้ข้างต้นว่าไม่ได้อนุญาตสิ่งใดนอกจาก
ข้อยกเว้น LOCAL_ONLY ของ `/api/mcp/` — มิฉะนั้นอาจเรียกใช้เครื่องมือ MCP ทุกตัวได้เมื่อผู้ดำเนินการ
เปิดใช้งานการเข้าถึง MCP จากระยะไกล/ที่ไม่ใช่ลูปแบ็ก เพียงเพราะ `OMNIROUTE_MCP_ENFORCE_SCOPES` มาพร้อมกับ
ค่าเริ่มต้น `false` คีย์ที่มีสโคป `manage`/`admin` แบบเต็มผ่าน HTTP และผู้เรียกผ่าน stdio/local ทุกคน จะยังคง
ใช้พฤติกรรมเดิมที่ควบคุมด้วย `OMNIROUTE_MCP_ENFORCE_SCOPES` โดยไม่มีการเปลี่ยนแปลง

---

## ตัวแปรสภาพแวดล้อม

| ตัวแปร                                  | ค่าเริ่มต้น                                 | วัตถุประสงค์                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                    | URL ฐานที่เซิร์ฟเวอร์ MCP ใช้เมื่อเรียก API ภายในของ OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_API_KEY`                     | (ว่าง)                                      | คีย์ API ที่ส่งต่อเป็น `Authorization: Bearer` ไปยังการเรียก API ภายใน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (เปิดใช้งานเฉพาะเมื่อเป็น `"true"`) | เมื่อเปิดใช้งาน การขาดขอบเขตสิทธิ์จะทำให้การเรียกเครื่องมือถูกปฏิเสธและบันทึก `scope_denied:<reason>` ลงในบันทึกการตรวจสอบ นอกจากนี้ การบังคับใช้จะเปิดอยู่เสมอโดยไม่คำนึงถึงแฟล็กนี้ สำหรับผู้เรียกผ่าน HTTP/SSE ทุกรายที่ระบุได้จากส่วนหัว Authorization แบบรายคีย์ (`source === "authInfo"`) ซึ่งไม่มีขอบเขตสิทธิ์ `manage`/`admin` อย่างเต็มรูปแบบ — เช่น คีย์ที่มีเพียงขอบเขตสิทธิ์ข้ามผ่านแบบจำกัด `mcp:connect` — ดังนั้น ค่าเริ่มต้นนี้จึงปลอดภัยเฉพาะสำหรับโฟลว์แบบผู้ดำเนินการรายเดียวผ่าน local/stdio เท่านั้น และไม่ควรใช้กับการเข้าถึงระยะไกลที่ไม่ใช่ loopback |
| `OMNIROUTE_MCP_SCOPES`                  | (ว่าง)                                      | รายการขอบเขตสิทธิ์ที่อนุญาตซึ่งคั่นด้วยจุลภาคและถือว่า "พร้อมใช้งาน" โดยค่าเริ่มต้น (ใช้เมื่อผู้เรียกไม่ได้ระบุขอบเขตสิทธิ์ของตนเอง)                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ไม่ได้ตั้งค่า = เปิด)                      | เมื่อตั้งค่าเป็น `0/false/off/no` จะปิดใช้งานการบีบอัดคำอธิบาย MCP ขณะลงทะเบียน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ไม่ได้ตั้งค่า = เปิด)                      | นามแฝงสำรองสำหรับตัวเลือกเดียวกับด้านบน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                     | ระยะเวลาสูงสุดก่อนยกเลิกสำหรับการอ่านข้อมูลการจัดการภายใน (สถานะระบบ ความยืดหยุ่น ชุดค่าผสม โควตา การใช้งาน)                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                     | ระยะเวลาสูงสุดก่อนยกเลิกสำหรับฮอปที่รอผู้ให้บริการ (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MCP_TOOL_DENY`                         | (ไม่ได้ตั้งค่า = ไม่มีตัวกรอง)              | ชื่อเครื่องมือที่คั่นด้วยจุลภาคซึ่งจะถูกตัดออกจาก `tools/list` (การลดจำนวนชนิดของเครื่องมือ — ดูด้านล่าง)                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `MCP_TOOL_ALLOW`                        | (ไม่ได้ตั้งค่า = ไม่มีตัวกรอง)              | รายชื่อเครื่องมือที่คั่นด้วยเครื่องหมายจุลภาคเพื่อเก็บไว้เฉพาะรายการเหล่านี้ (โหมดรายการอนุญาต — ดูด้านล่าง)                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `DATA_DIR`                              | `~/.omniroute`                              | ไฟล์ฮาร์ตบีตจะถูกเขียนไปยัง `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

---

## การบีบอัดคำอธิบาย

รีจิสทรีเครื่องมือ พรอมต์ และทรัพยากรของ MCP สามารถบีบอัดคำอธิบายขณะลงทะเบียน/แสดงรายการ เพื่อลดขนาดเมทาดาทาที่เปิดเผยต่อไคลเอนต์ (และลดค่าใช้จ่ายของบริบทพรอมต์ตามไปด้วย) การทำงานนี้อยู่ใน `open-sse/mcp-server/descriptionCompressor.ts` และเชื่อมเข้ากับเซิร์ฟเวอร์ MCP ผ่าน `compressMcpRegistryMetadata` ภายใน `createMcpServer()`

- การบีบอัดจะประมวลผลข้อความคำอธิบายโดยใช้ชุดกฎ Caveman (`getRulesForContext("all", "full")`) พร้อมการแยกบล็อกที่ต้องเก็บรักษาไว้ (ช่วงโค้ด บล็อกแบบมีรั้ว ฯลฯ) เพื่อไม่ให้เนื้อหาเชิงโครงสร้างถูกแก้ไข
- เปิดหรือปิดต่อการปรับใช้แต่ละรายการผ่านค่า `compression.mcpDescriptionCompressionEnabled` ในตารางการตั้งค่า `key_value` (ค่าเริ่มต้น: เปิดใช้งาน) — แสดงใน UI เป็น **การวิเคราะห์ → การบีบอัดคำอธิบาย MCP**
- เปิดหรือปิดทั้งโปรเซสผ่าน `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` หรือ `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`
- สถิติแบบเรียลไทม์แสดงผ่าน `omniroute_compression_status` ภายใต้ `analytics.mcpDescriptionCompression` และติดแท็ก `source: "mcp_metadata_estimate"` เพื่อแยกความแตกต่างจากข้อมูลการใช้งานจริงที่ได้รับจากผู้ให้บริการ

---

## การลดจำนวนเครื่องมือ (F4.3)

การบีบอัดคำอธิบายช่วยลดขนาดเมทาดาทาของเครื่องมือแต่ละรายการ ส่วน **การลดจำนวนเครื่องมือ** ก้าวไปอีกขั้นด้วยการลด _จำนวน_ เครื่องมือที่ประกาศทั้งหมด การประกาศเครื่องมือให้น้อยลงในแมนิเฟสต์ `tools/list` ช่วยลดต้นทุนโทเค็นต่อคำขอที่โมเดลของไคลเอนต์ต้องใช้กับแค็ตตาล็อกเครื่องมือ (การบีบอัด "เลเยอร์ 5") การทำงานนี้เป็นตัวกรองแบบไร้สถานะอย่างแท้จริงใน `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) ซึ่งเชื่อมเข้ากับลูปการลงทะเบียนใน `createMcpServer()` (`open-sse/mcp-server/server.ts`)

**ต้องเลือกเปิดใช้ โดยค่าเริ่มต้นจะปิดอยู่** ตัวกรองจะทำงานก็ต่อเมื่อมีการตั้งค่าตัวแปรสภาพแวดล้อมอย่างน้อยหนึ่งในสองตัว หากไม่ได้ตั้งค่าทั้งสองตัว เครื่องมือทั้ง 110 รายการจะถูกประกาศโดยไม่มีการเปลี่ยนแปลง

| ตัวแปร           | โหมด                                                                                                            |
| :--------------- | :-------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | บัญชีดำ — ชื่อเครื่องมือที่คั่นด้วยจุลภาค ซึ่งจะถูกตัดออกจาก `tools/list` เสมอ                                  |
| `MCP_TOOL_ALLOW` | รายการอนุญาต — ชื่อเครื่องมือที่คั่นด้วยจุลภาค โดยจะเก็บไว้เฉพาะรายการเหล่านี้ ส่วนรายการอื่นทั้งหมดจะถูกตัดออก |

`deny` มีลำดับความสำคัญเหนือ `allow` ชื่อจะถูกคั่นด้วยจุลภาค ตัดช่องว่างหัวท้าย และละเว้นรายการว่าง ตัวอย่าง:

```bash
# ตัดเครื่องมือสองรายการออกจากแค็ตตาล็อก
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# ประกาศเฉพาะเครื่องมือสำหรับการกำหนดเส้นทางและโควตา (โหมดรายการอนุญาต)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**วิธีนำเครื่องมือที่ถูกกรองออก:** การลงทะเบียนจะสำเร็จเสมอ จากนั้นเครื่องมือที่โปรไฟล์ปฏิเสธจะถูกเรียก `.disable()` บนแฮนเดิล MCP SDK ดังนั้นเครื่องมือนั้นจะไม่ปรากฏใน `tools/list` แต่การเชื่อมต่อยังคงอยู่ครบถ้วน (สามารถเปิด/ปิดได้อย่างเรียบร้อยโดยไม่ต้องลงทะเบียนใหม่) ตัวแยกวิเคราะห์โปรไฟล์คือ `readMcpToolProfileFromEnv(process.env)` ซึ่งจะคืนค่า `null` (ไม่มีการกรอง) เมื่อตัวแปรทั้งสองว่างเปล่า

โครงสร้าง `ToolProfile` ที่สมบูรณ์ยิ่งขึ้นเบื้องหลัง `reduceToolManifest` ยังรองรับการกรองด้วยส่วนร่วมของขอบเขต (`allowScopes` พร้อมการจับคู่ไวลด์การ์ดแบบ `read:*`) และขีดจำกัด `maxTools` ที่ให้ผลลัพธ์แน่นอน แต่การตั้งค่าทั้งสองนี้จำเป็นต้องใช้แมนิเฟสต์ฉบับเต็ม ณ เวลาลงทะเบียน และในปัจจุบัน **ยังไม่** เปิดให้กำหนดผ่านตัวแปรสภาพแวดล้อม (ฮุกระดับ `tools/list` เป็นงานติดตามผลที่บันทึกไว้) สามารถใช้ `estimateManifestTokens()` เพื่อเปรียบเทียบต้นทุนโทเค็นของแมนิเฟสต์ก่อนและหลังการลดได้

---

## ฮาร์ตบีตขณะรันไทม์

การขนส่งแบบ stdio จะบันทึกข้อมูลสถานะการทำงานไว้ที่ `${DATA_DIR}/runtime/mcp-heartbeat.json` ทุก 5 วินาที แดชบอร์ด (`/api/mcp/status`) จะอ่านไฟล์นี้ร่วมกับสถานะการทำงานของ PID เพื่อระบุค่า `online` ส่วนการขนส่งแบบ HTTP จะรายงานสถานะจาก `getMcpHttpStatus()` ภายในกระบวนการแทน (ไม่มีการเขียนไฟล์)

สแนปช็อตฮาร์ตบีตประกอบด้วย:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## การบันทึกการตรวจสอบ

การเรียกใช้เครื่องมือทุกครั้งจะถูกบันทึกลงในตาราง SQLite `mcp_tool_audit` โดย `open-sse/mcp-server/audit.ts`:

- ชื่อเครื่องมือ อาร์กิวเมนต์ (แฮช/ตัดทอนตาม `auditLevel` ของแต่ละเครื่องมือ) และผลลัพธ์
- ระยะเวลาเป็น ms แฟล็กสำเร็จ/ล้มเหลว และข้อความแสดงข้อผิดพลาด (ถ้ามี)
- แฮชคีย์ API และการประทับเวลา
- การปฏิเสธขอบเขตจะถูกบันทึกเป็น `scope_denied:<reason>` พร้อมรายการขอบเขตที่ขาดหายไป

ใช้แดชบอร์ดหรือ REST endpoint `/api/mcp/audit` และ `/api/mcp/audit/stats` เพื่อตรวจสอบการเรียกใช้ล่าสุด

---

## ไฟล์

| ไฟล์                                                                     | วัตถุประสงค์                                                               |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | แฟกทอรีเซิร์ฟเวอร์ MCP, จุดเริ่มต้น stdio, การลงทะเบียนเครื่องมือตามขอบเขต |
| `open-sse/mcp-server/httpTransport.ts`                                   | การขนส่ง SSE + Streamable HTTP (การจัดการเซสชัน)                           |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | การประเมินขอบเขตเครื่องมือและการระบุตัวผู้เรียก                            |
| `open-sse/mcp-server/audit.ts`                                           | การบันทึกบันทึกการตรวจสอบการเรียกใช้เครื่องมือ (`mcp_tool_audit`)          |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | ตัวเขียนสัญญาณชีพ stdio (`mcp-heartbeat.json`)                             |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | การบีบอัดคำอธิบายสำหรับรีจิสทรีเครื่องมือ / พรอมต์ / ทรัพยากร              |
| `open-sse/mcp-server/schemas/tools.ts`                                   | สคีมา Zod + รีจิสทรีเครื่องมือ (`MCP_TOOLS`, 45 รายการ)                    |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | ตัวจัดการเครื่องมือ Phase 2 + แคช + 1proxy                                 |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | ตัวจัดการเครื่องมือบีบอัด                                                  |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | คำจำกัดความเครื่องมือหน่วยความจำ (3 เครื่องมือ)                            |
| `open-sse/mcp-server/tools/skillTools.ts`                                | คำจำกัดความเครื่องมือทักษะ (4 เครื่องมือ)                                  |
| `open-sse/mcp-server/tools/notionTools.ts`                               | คำจำกัดความเครื่องมือแหล่งบริบท Notion (6 เครื่องมือ)                      |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | คำจำกัดความเครื่องมือเกมมิฟิเคชัน (8 เครื่องมือ)                           |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | เครื่องมือสำหรับการลงทะเบียนและจัดการปลั๊กอิน (8 เครื่องมือ)               |
| `src/app/api/mcp/status/route.ts`                                        | เอนด์พอยต์ `/api/mcp/status`                                               |
| `src/app/api/mcp/tools/route.ts`                                         | เอนด์พอยต์ `/api/mcp/tools`                                                |
| `src/app/api/mcp/sse/route.ts`                                           | เส้นทางการขนส่ง SSE `/api/mcp/sse`                                         |
| `src/app/api/mcp/stream/route.ts`                                        | เส้นทางการขนส่ง Streamable HTTP `/api/mcp/stream`                          |
| `src/app/api/mcp/audit/route.ts`                                         | การสืบค้นบันทึกการตรวจสอบ `/api/mcp/audit`                                 |
| `src/app/api/mcp/audit/stats/route.ts`                                   | เมตริกการตรวจสอบแบบรวม `/api/mcp/audit/stats`                              |
| `src/lib/notion/api.ts`                                                  | ไคลเอนต์ Notion REST API (การลองใหม่, การหมดเวลา, การจำแนกข้อผิดพลาด)      |
| `src/lib/db/notion.ts`                                                   | การจัดเก็บโทเค็น Notion แบบถาวร (ตาราง `key_value`)                        |
| `src/app/api/settings/notion/route.ts`                                   | API การตั้งค่า Notion (GET/POST/DELETE)                                    |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI สำหรับจัดการโทเค็น Notion                                               |
| `tests/unit/notion-api.test.ts`                                          | การทดสอบไคลเอนต์ Notion API (7 รายการ)                                     |
| `tests/unit/notion-tools.test.ts`                                        | การทดสอบการบังคับใช้ขอบเขตของเครื่องมือ Notion (10 รายการ)                 |
| `tests/unit/db/notion.test.mjs`                                          | การทดสอบโมดูลฐานข้อมูล Notion (3 รายการ)                                   |
