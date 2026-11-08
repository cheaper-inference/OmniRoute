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

## การรับรองความถูกต้องและขอบเขต

เครื่องมือ MCP เรียกสตริงขอบเขตการอ่านจากผู้เรียก การตรวจสอบนั้นเป็นหนึ่งในสามเนมสเปซอิสระ การส่งบอลจากตัวตรวจสอบตัวหนึ่งไม่ใช่การส่งผ่านจากตัวตรวจสอบตัวอื่น กฎคือ [เนมสเปซขอบเขตสามรายการ](#three-scope-namespaces) แค็ตตาล็อกเครื่องมือคือ [ขอบเขตเครื่องมือ MCP](#mcp-tool-scopes)

### เนมสเปซขอบเขตสามรายการ

`manage` บนคีย์ API, `read:compression` บนเครื่องมือ MCP และ `read` บนโทเค็นการเข้าถึง `oma_live_…` ถือเป็นสิทธิ์ที่แตกต่างกันสามแบบ ผู้โทรที่ส่งโทเค็นการเข้าถึง `read` ไปยังเส้นทางการจัดการที่กลายพันธุ์จะได้รับ HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` อันดับนั้นคือ `scopeSatisfies` มันไม่ได้อ่านตาราง MCP และผู้จับคู่ MCP ก็ไม่อ่าน

| เนมสเปซ              | หนังสือรับรอง                                                                              | ตัวตรวจสอบ                   | บัตรผ่านช่วยให้                                       |
| :------------------- | :----------------------------------------------------------------------------------------- | :--------------------------- | :---------------------------------------------------- |
| การจัดการคีย์ API    | `api_keys.scopes`                                                                          | `hasManageScope`             | การจัดการ REST สำหรับคีย์ Bearer นั้น                 |
| สารเติมแต่งคีย์ API  | อาร์เรย์เดียวกัน หนึ่งสตริงที่ตรงกันทุกประการ                                              | ผู้ช่วยที่มีชื่ออยู่ด้านล่าง | ความสามารถอันเดียวเท่านั้น                            |
| ขอบเขตเครื่องมือ MCP | อาร์เรย์เดียวกัน มิฉะนั้น MCP `_meta` (HTTP/SSE เท่านั้น) อย่างอื่น `OMNIROUTE_MCP_SCOPES` | `scopeMatches`               | เครื่องมือนั้น เมื่อเปิดการบังคับใช้แล้ว              |
| โทเค็นการเข้าถึง     | `oma_live_…`                                                                               | `scopeSatisfies`             | เส้นทางการจัดการที่วิธีการและเส้นทางต้องการอันดับนั้น |

การสร้างข้อมูลรับรองแต่ละรายการจะครอบคลุมอยู่ใน [Management Authentication](../guides/MANAGEMENT-AUTH.md)

#### ขอบเขตคีย์ API

อาร์เรย์ `api_keys.scopes` หนึ่งตัวฟีดสองงาน พวกเขาใช้ฟังก์ชั่นที่แตกต่างกัน

**การบริหาร REST** `manage` และ `admin` เป็นสมาชิกของ `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) `hasManageScope` คือสิ่งที่อนุญาตเส้นทางการจัดการสำหรับคีย์นั้น `admin` มีความสามารถในการจัดการบนเส้นทางเหล่านั้น คำว่า `admin` ในที่นี้ไม่ใช่อันดับของโทเค็นการเข้าถึง และไม่ได้ขยายไปสู่ขอบเขตเครื่องมือ MCP

**สตริงการบวก** แต่ละรายการเป็นแบบทดสอบความเป็นสมาชิกที่แน่นอน และแต่ละรายการจะอยู่นอก `MANAGEMENT_API_KEY_SCOPES`

| ขอบเขต                         | บัตรผ่านช่วยให้                                                                                                                                               |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | non-loopback `/api/mcp/` LOCAL_ONLY แกะสลักเท่านั้น (`hasMcpConnectOrManageScope`) คีย์ที่มี `manage` หรือ `admin` ยังคงผ่านการแกะสลักนั้น                    |
| `self:usage`                   | `GET /api/v1/me/status` สำหรับคีย์นี้ (`src/app/api/v1/me/status/route.ts`) `POST /api/keys` เพิ่มขอบเขตนี้ในการสร้าง (`normalizeSelfServiceScopesForCreate`) |
| `self:account-quota`           | โควต้าบัญชีอัปสตรีมภายในเพย์โหลดสถานะนั้น (`src/lib/usage/apiKeySelfService.ts`) เส้นทางสถานะยังคงต้องการ `self:usage`                                        |
| `policy:bypass-provider-quota` | การเรียกอนุมานของคีย์นี้จะข้ามนโยบายโควต้าของผู้ให้บริการ (`hasProviderQuotaBypassScope` ใน `src/sse/handlers/chat.ts`)                                       |

#### การจับคู่

แค็ตตาล็อกเป็นตารางภายใต้ [ขอบเขตเครื่องมือ MCP](#mcp-tool-scopes) อย่าถือว่า `MCP_SCOPE_LIST` ใน `src/shared/constants/mcpScopes.ts` เป็นแค็ตตาล็อกนั้น เนื่องจากเป็นเซ็ตย่อยที่พิมพ์ต้นฉบับ เครื่องมือต่อมาจะประกาศขอบเขตเพิ่มเติมข้างๆ (`read:notion`, `read:skills`, `read:local-corpus` และส่วนที่เหลือของตาราง)

`evaluateToolScopes` ใน `open-sse/mcp-server/scopeEnforcement.ts` อนุญาตให้โทรเมื่อทุกขอบเขตที่ต้องการตรงกับขอบเขตที่ได้รับบางส่วน:

- `*` ตรงกับทุกขอบเขตที่จำเป็น
- ขอบเขตที่กำหนดซึ่งลงท้ายด้วย `*` ตรงกับขอบเขตที่กำหนดซึ่งขึ้นต้นด้วยคำนำหน้าก่อนติดดาว `read:*` ตรง `read:compression`
- ขอบเขตที่ได้รับอื่นๆ ทุกรายการจะตรงกับสตริงที่จำเป็นที่เหมือนกันเท่านั้น

คีย์ที่มีขอบเขตเป็น `["manage"]` ล้มเหลว `scopeMatches` สำหรับ `read:compression` การเรียกเดียวกันนี้ล้มเหลวสำหรับ `admin`, `mcp:connect`, `read` และ `write` เมื่อสิ่งเหล่านั้นเป็นสตริงที่ได้รับเพียงสตริงเดียว ไม่มีลำดับชั้นในขอบเขตเครื่องมือ MCP นอกเหนือจากส่วนท้าย `*`

การบังคับใช้ปิดอยู่เว้นแต่ `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (ค่าเริ่มต้น `false`) ขณะที่ปิดอยู่ `evaluateToolScopes` จะอนุญาตการโทรและข้ามแค็ตตาล็อก ในขณะที่เปิดอยู่ HTTP จะใช้ `api_keys.scopes` ของคีย์ Bearer เป็น `authInfo` (โปรดดู [การเชื่อมโยงขอบเขต HTTP ของคีย์ต่อคีย์](#per-key-http-scope-binding-7895) ) เมื่อไม่มีการแก้ไขขอบเขตคีย์ ชุดที่ได้รับจะตกเป็นของ MCP `_meta` (ให้เกียรติเฉพาะสำหรับผู้โทร HTTP/SSE ภายในบริบทการตรวจสอบสิทธิ์ HTTP ส่วน `_meta` ของผู้โทร stdio จะถูกละเว้นเนื่องจากไคลเอ็นต์ควบคุมมัน และไม่มีการระบุตัวตนต่อผู้โทร) จากนั้น `OMNIROUTE_MCP_SCOPES`

#### ขอบเขตโทเค็นการเข้าถึง

โทเค็น `oma_live_…` (`src/lib/accessTokens/scopes.ts`) มี `read`, `write` หรือ `admin` `scopeSatisfies` อยู่ในอันดับ: `admin` ครอบคลุม `write` และ `read` และ `write` ครอบคลุม `read` ขอบเขตที่ไม่รู้จักไม่ครอบคลุมอะไรเลย

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) เปรียบเทียบอันดับนั้นกับ `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` และ `OPTIONS` ต้องการ `read`
- ทุกวิธีอื่น ๆ ต้องใช้ `write`
- เส้นทางใน `ADMIN_SCOPE_PREFIXES` ต้องใช้ `admin` สำหรับทุกวิธี `/api/mcp` อยู่ในรายการนั้น ดังนั้นโทเค็นการเข้าถึง `write` ยังคงไม่สามารถเรียกพื้นผิว MCP HTTP ได้
- เส้นทางใน `ADMIN_MUTATION_PREFIXES` ต้องใช้ `admin` สำหรับการกลายพันธุ์เท่านั้น
- เส้นทางใน `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) ต้องการ `admin` สำหรับการกลายพันธุ์เท่านั้น และเฉพาะบนเส้นทางที่แน่นอนนั้น — เส้นทางย่อย `/api/settings/*` อื่น ๆ เก็บไว้ `write`

`PATCH /api/keys/{id}` เป็นการเปลี่ยนแปลงและไม่ได้อยู่ในรายชื่อผู้ดูแลระบบ ดังนั้นโทเค็น `read` ได้รับ 403 `Access token scope 'read' is insufficient; 'write' required.` โทเค็นการเข้าถึง `write` หรือ `admin` เป็นไปตามเส้นทางนั้น แดชบอร์ด JWT โทเค็นรหัสเครื่องจักร CLI แบบวนกลับ และคีย์ API ที่มี `manage` หรือ `admin` ใช้สาขาอื่นและไม่ได้จำกัดให้แคบลงตามอันดับนี้

โทเค็นการเข้าถึงที่ส่งผ่าน `scopeSatisfies` สำหรับ `/api/mcp` ได้ล้างประตูการจัดการเท่านั้น การเรียกเครื่องมือยังคงทำงาน `scopeMatches` กับขอบเขตคีย์ API อันดับโทเค็นการเข้าถึงไม่ใช่อินพุตของ `scopeMatches`

### ขอบเขตเครื่องมือ MCP

การบังคับใช้ขอบเขตเป็นศูนย์กลางใน `open-sse/mcp-server/scopeEnforcement.ts` เครื่องมือแต่ละอย่างต้องมีขอบเขตเฉพาะ:

| ขอบเขต                | เครื่องมือ                                                                                                                                                                       |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                        |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                           |
| `read:quota`          | `check_quota`                                                                                                                                                                    |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                           |
| `read:models`         | `list_models_catalog`                                                                                                                                                            |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                    |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                            |
| `write:budget`        | `set_budget_guard`                                                                                                                                                               |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                      |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                   |
| `read:cache`          | `cache_stats`                                                                                                                                                                    |
| `write:cache`         | `cache_flush`                                                                                                                                                                    |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                       |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                            |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                 |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                           |
| `read:memory`         | `memory_search`                                                                                                                                                                  |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                     |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                               |
| `write:skills`        | `skills_enable`                                                                                                                                                                  |
| `execute:skills`      | `skills_execute`                                                                                                                                                                 |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                 |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                          |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                        |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                 |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                   |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                               |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                  |
| `read:obsidian`       | 13 อ่านเครื่องมือ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 เครื่องมือการเขียน — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …            |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                |

รองรับขอบเขต Wildcard: `read:*` ให้สิทธิ์ขอบเขตการอ่านทั้งหมด, `*` ให้สิทธิ์การเข้าถึงแบบเต็ม

### `mcp:connect` — ความสามารถในเส้นทางแคบ (#7895)

การเข้าถึง HTTP/SSE MCP Transport (`/api/mcp/*`) จาก non-loopback ต้องใช้ `/api/mcp/` LOCAL_ONLY carve-out (ดู `docs/security/ROUTE_GUARD_TIERS.md`) ในอดีตนั้นการแกะสลักออกนั้นยอมรับเฉพาะ `manage`/`admin` -scope API key — แบบเต็มที่กว้างเกินไปสำหรับผู้โทรที่ต้องการพูดเท่านั้น MCP ตอนนี้ `src/shared/constants/managementScopes.ts` ส่งออก `MCP_CONNECT_SCOPE = "mcp:connect"`: ขอบเขตเพิ่มเติมที่แคบ (แบบอย่างเดียวกับ `SELF_USAGE_SCOPE`) ที่อนุญาต ONLY `/api/mcp/` บายพาสใน `src/server/authz/policies/management.ts` — มันไม่ให้สิทธิ์การเข้าถึงเส้นทางการจัดการอื่น ๆ และจงใจเก็บ OUT ของ `MANAGEMENT_API_KEY_SCOPES` การถือกุญแจ `manage`/`admin` ยังคงผ่านการแกะสลักไม่เปลี่ยนแปลง `mcp:connect` เป็นทางเลือกที่มีสิทธิพิเศษต่ำกว่าสำหรับผู้โทร MCP ระยะไกลเท่านั้น ตรวจสอบผ่าน `hasMcpConnectOrManageScope()`

### การเชื่อมโยงขอบเขต HTTP ต่อคีย์ (#7895)

เหนือ HTTP/SSE ตอนนี้ `open-sse/mcp-server/httpTransport.ts` แก้ไข `api_keys.scopes` จริงของผู้โทรผ่าน `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) และส่งต่อไปยัง MCP SDK ของ `transport.handleRequest(req, { authInfo })` ดังนั้น `extra.authInfo.scopes` เข้าถึงการเรียกใช้เครื่องมือแต่ละครั้งจะสะท้อนถึงขอบเขตของ Bearer key `scopeEnforcement.ts` ของ `resolveCallerScopeContext()` จัดลำดับความสำคัญ `authInfo` มากกว่า `_meta` และ `OMNIROUTE_MCP_SCOPES` env fallback — สิ่งนี้จะเติมเฉพาะแหล่งที่มาแรกที่มีลำดับความสำคัญสูงสุดเท่านั้น ซึ่งก่อนหน้านี้ไม่ได้ฟีดผ่าน HTTP เมื่อไม่มีคีย์ API ได้รับการแก้ไข (ไม่มีส่วนหัว คีย์ที่ไม่ถูกต้อง) `authInfo` จะยังคง `undefined` และการแก้ไขจะตกไปสู่ห่วงโซ่ `meta`/env ที่มีอยู่ไม่เปลี่ยนแปลง stdio ไม่มีตัวตนต่อผู้โทร (ดู `mcpCallerIdentity.ts`) และไม่ได้รับผลกระทบจากการเชื่อมโยงต่อคีย์ — โดยจะข้ามขั้นตอน `_meta` (`_meta` ได้รับเกียรติเฉพาะในบริบท HTTP auth #15159) และแก้ไขได้จากคีย์ `OMNIROUTE_MCP_SCOPES` env เพียงอย่างเดียว

**การบังคับใช้จะบังคับใช้สำหรับผู้เรียก HTTP/SSE ที่มีขอบเขตแคบ โดยไม่คำนึงถึง `OMNIROUTE_MCP_ENFORCE_SCOPES`** `OMNIROUTE_MCP_ENFORCE_SCOPES` ที่ใช้ค่าเริ่มต้นเป็น `false` จะปลอดภัยสำหรับโฟลว์โอเปอเรเตอร์เดี่ยว local/stdio เท่านั้น โดยที่ไม่มีการระบุตัวตนต่อผู้โทรที่จะกำหนดขอบเขต `open-sse/mcp-server/server.ts::withScopeEnforcement()` เปลี่ยนการบังคับใช้ขอบเขตต่อเครื่องมือโดยไม่มีเงื่อนไข (`shouldForceScopeEnforcement()` ใน `scopeEnforcement.ts`) เมื่อใดก็ตามที่ `resolveCallerScopeContext()` แก้ไข `source === "authInfo"` (เช่นส่วนหัวการอนุญาต HTTP ต่อคีย์จริง HTTP/SSE-only) AND คีย์นั้นไม่ได้เก็บขอบเขต `manage`/`admin` แบบเต็ม วิธีนี้จะปิดช่องว่างที่การถือคีย์ ONLY ขอบเขตการบายพาส `mcp:connect` ที่แคบ — ที่บันทึกไว้ข้างต้นเป็นการไม่ให้สิทธิ์ใดๆ ยกเว้น `/api/mcp/` LOCAL_ONLY ที่แยกออกมา — สามารถเรียกใช้เครื่องมือ MCP ทุกอันได้เมื่อผู้ดำเนินการเปิดใช้งานการเข้าถึง remote/non-loopback MCP เพียงเพราะ `OMNIROUTE_MCP_ENFORCE_SCOPES` จัดส่ง `false` ตามค่าเริ่มต้น คีย์ `manage`/`admin` แบบเต็มบน HTTP และผู้เรียก stdio/local ทุกคน คงพฤติกรรมของ `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated ที่มีอยู่ไว้ไม่เปลี่ยนแปลง

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
