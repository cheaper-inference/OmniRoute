# Authorization Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **แหล่งข้อมูลที่แท้จริง:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **อัปเดตล่าสุด:** 2026-09-22 — ขอบเขตเนมสเปซชี้ไปที่ MCP-SERVER.md

OmniRoute มีไปป์ไลน์การอนุญาตที่รับรู้เส้นทาง ซึ่งควบคุมทุกคำขอ API การจัดประเภทเป็นแบบ **กำหนดได้** และ **ปิดเมื่อล้มเหลว** — สิ่งใดก็ตามที่ไม่สามารถจัดประเภทได้จะถูกจัดเป็น `MANAGEMENT` และต้องใช้เซสชันหรือโทเค็นระดับการจัดการ หน้านี้อธิบายโมเดลสำหรับวิศวกรที่ดูแลเส้นทางหรือออกแบบปลายทางใหม่

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ที่มา: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## การยืนยันตัวตนสองโหมด

### 1. API Key (Bearer)

ใช้กับ API ของไคลเอนต์ที่เข้ากันได้กับ OpenAI/Anthropic/Gemini และเส้นทางการจัดการบางเส้นทาง เมื่อคีย์มีขอบเขต `manage`

```
Authorization: Bearer <api-key>
```

ตรวจสอบโดย `isValidApiKey()` / `extractApiKey()` ใน `src/sse/services/auth.ts` และส่งออกต่อผ่าน `src/shared/utils/apiAuth.ts` ตัวตรวจสอบยังยอมรับตัวแปรสภาพแวดล้อม `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ในฐานะคีย์ passthrough แบบถาวร (issue #1350)

### 2. Dashboard Session (คุกกี้ auth_token)

ใช้กับหน้าแดชบอร์ดและงานผู้ดูแลระบบ

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

คุกกี้จะถือเป็นเซสชันก็ต่อเมื่อ JWT ผ่านการตรวจสอบ **และ** มี `authenticated: true` (`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`) ผู้ใช้คุกกี้ทุกรายเส้นทางการ์ดของแดชบอร์ด (`isDashboardSessionAuthenticated()`) การรีเฟรชของ authz pipeline, WebSocket handshake, live server, `/api/settings/require-login` และ `/api/auth/status` ล้วนผ่านฟังก์ชันตัวช่วยนี้ ยังมี JWT อื่นที่ลงนามด้วย `JWT_SECRET` อยู่ เช่น การส่งต่อของ Cursor CLI จะออกโทเค็น `iss "omniroute" / aud "cursor-cli"` ให้ผู้ถือคีย์ แต่โทเค็นเหล่านั้นไม่เคยถือเป็นเซสชัน (#13298)

ตรวจสอบโดย `isDashboardSessionAuthenticated()` ใน `src/shared/utils/apiAuth.ts` pipeline จะรีเฟรช JWT อัตโนมัติเมื่อเหลืออายุน้อยกว่า 7 วัน จากอายุการใช้งาน 30 วัน

เซสชันอาจสิ้นสุดก่อนครบ 30 วันได้ เพราะทุกการออกโทเค็นผ่าน `mintDashboardSessionToken` (มีเวลาออก `iat` และรหัส `jti`) และตัวตรวจสอบจะเช็กการตั้งค่าสองรายการ คือ `sessionsValidAfter` ซึ่งถูกตั้งเมื่อมีการเปลี่ยนรหัสผ่าน ทำให้เซสชันทุกเซสชันที่ออกก่อนหน้านั้นไม่ผ่านการตรวจสอบอีกต่อไป (เบราว์เซอร์ที่เปลี่ยนรหัสผ่านจะได้คุกกี้ใหม่) และ `revokedDashboardSessions` ซึ่ง `POST /api/auth/logout` จะเพิ่ม `jti` ของเซสชันที่ออกจากระบบเข้าไป เซสชันที่ออกโดยรีลีสเก่าไม่มีแคลมทั้งสองนี้ จึงยังใช้ได้จนกว่าจะมีการเปลี่ยนรหัสผ่านครั้งแรก หากอ่านการตั้งค่าไม่ได้ เซสชันจะไม่ถูกเชื่อถือ

เส้นทางการจัดการบางเส้นทางยอมรับ **ทั้งสองโหมด** คือคุกกี้ หรือ `Bearer <key>` เมื่อ API key มีขอบเขต `manage` (หรือ `admin`) ซึ่งเป็นสิ่งที่ทำให้เวิร์กโฟลว์ "ตั้งค่าได้ผ่านการเรียก API" ที่เพิ่มใน v3.8 ใช้งานได้

#### การเกตการล็อกอิน OIDC แบบเลือกใช้ (#6973)

การล็อกอินผู้ดูแลระบบของแดชบอร์ดยังรองรับโฟลว์ OIDC (OpenID Connect) แบบ **เลือกเปิดใช้** ควบคู่กับการล็อกอินด้วยรหัสผ่านตามค่าเริ่มต้น โดยการล็อกอินด้วยรหัสผ่านจะไม่ถูกลบออก เพียงแต่มีโฟลว์เสริม:

- จะเปิดใช้งานก็ต่อเมื่อ `settings.oidcEnabled === true` **และ** ตั้งค่า `oidcIssuer` / `oidcClientId` / `oidcClientSecret` ครบทุกค่า (Settings → Auth) มิฉะนั้น `GET /api/auth/oidc/login` จะตอบ `400`
- `GET /api/auth/oidc/login` ค้นหา `authorization_endpoint` จาก `/.well-known/openid-configuration` ของ issuer (หากไม่พบจะใช้ `<issuer>/authorize` แทน) สร้าง redirect URI จากคำขอที่เข้ามา (รองรับ `x-forwarded-proto`) และเปลี่ยนเส้นทางไปยัง IdP พร้อม `state` แบบสุ่มที่เก็บไว้ในคุกกี้ `oidc_state` ชนิด `httpOnly`
- `GET /api/auth/oidc/callback` ตรวจสอบ `state` แลกเปลี่ยน authorization code และตรวจลายเซ็นของ ID token ผ่าน JWKS ของ issuer (`createRemoteJWKSet` ของ `jose` แคชตาม JWKS URI) พร้อมตรวจ `issuer`/`audience` รายการ allowlist `oidcAllowedSubjects` เป็นสิ่งที่จำเป็น โดยจะจับคู่กับแคลม `sub` ของโทเค็นหรือแคลม `email` ซึ่งแคลม email จะถูกใช้เฉพาะเมื่อ `email_verified === true` เท่านั้น ดังนั้นอีเมลที่ยังไม่ได้ยืนยันจาก IdP จะผ่านเกตนี้ไม่ได้เลย และหากไม่มีรายการใดเลย callback จะปฏิเสธการล็อกอินทั้งหมด (`not_configured`)
- เมื่อสำเร็จ ระบบจะออก `auth_token` JWT อายุ 30 วัน **ชนิดเดียวกันทุกประการ** กับที่การล็อกอินด้วยรหัสผ่านออกให้ (`src/app/api/auth/login/route.ts`) ดังนั้น pipeline ของเซสชันแดชบอร์ดที่เหลือ (การรีเฟรชอัตโนมัติ แฟล็กของคุกกี้) จึงไม่เปลี่ยนแปลง OIDC เปลี่ยนเพียงวิธีการออกคุกกี้ ไม่ได้เปลี่ยนสิทธิ์ที่คุกกี้ให้
- การตั้งค่า `oidc*` ทุกตัว (`oidcEnabled`, `oidcDisablePasswordLogin`, `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`, `oidcRedirectPath`, `oidcScopes`) อยู่ใน `SECURITY_IMPACTING_SETTINGS_KEYS` (`src/shared/constants/securityImpactingSettings.ts`) `PATCH /api/settings` จะตอบ `400 PASSWORD_REQUIRED` เว้นแต่ body จะมีรหัสผ่านผู้จัดการในฟิลด์ `currentPassword` (ตอบ `401 PASSWORD_MISMATCH` เมื่อรหัสผ่านไม่ถูกต้อง) `oidcDisablePasswordLogin` จะปฏิเสธการ _ล็อกอิน_ ด้วยรหัสผ่าน (`POST /api/auth/login`) แต่ยังเก็บแฮชรหัสผ่านไว้ และการยืนยันตัวตนซ้ำยังตรวจ `currentPassword` กับแฮชนั้นอยู่
- `corsOrigins` และ `bruteForceProtection` ก็อยู่ใน `SECURITY_IMPACTING_SETTINGS_KEYS` เช่นกัน การผ่อนค่าใดค่าหนึ่งจะทำให้การป้องกันการล็อกอินอ่อนลง จึงต้องยืนยันตัวตนซ้ำด้วย `currentPassword` เหมือนกัน (แท็บความปลอดภัยจะขอให้กรอก) และการนำเข้า JSON จะทิ้งค่าทั้งสองนี้
- คีย์นโยบายความปลอดภัยทุกตัว (รายการใน `SECURITY_IMPACTING_SETTINGS_KEYS` คีย์ `oidc*` ทั้งหมด และสถานะเซสชันแดชบอร์ด) เป็น **สำหรับผู้ดูแลระบบเท่านั้น** บน `PATCH /api/settings` คีย์ API ที่มีขอบเขต `manage` หรือโทเค็นการเข้าถึง `oma_` จะถูกปฏิเสธด้วย `403` แม้จะส่ง `currentPassword` ที่ถูกต้องมาก็ตาม และการปฏิเสธนี้จะถูกบันทึกเป็น audit ว่า `settings.update_failed` พร้อม `reason: OPERATOR_REQUIRED` (`requireOperatorCredential()` ใน `src/lib/api/operatorCredential.ts`) การตั้งค่าทั่วไป (ธีม การตั้งค่าการแสดงผล) ยังคงเขียนได้ด้วยคีย์ `manage` หรือโทเค็นการเข้าถึง `admin` ทุกการเปลี่ยนแปลง `/api/settings` เอง (และ `/api/settings/require-login`) ก็ต้องใช้ขอบเขตโทเค็นการเข้าถึง `admin` ด้วย (`ADMIN_MUTATION_EXACT_PATHS` ใน `src/server/authz/accessScopes.ts` จับคู่เส้นทางแบบตรงทุกตัวอักษร) `GET` ยังคงเป็น `read` ส่วนเส้นทางย่อย `/api/settings/*` อื่น ๆ (พร็อกซี ค่าเริ่มต้นของ combo ชื่อแทนโมเดล การบีบอัด การล้างข้อมูล ฯลฯ) ยังคงใช้ขอบเขต `write` ที่อนุมานจากเมธอด
- `POST /api/settings/import-json` ข้ามการยืนยันตัวตนซ้ำนี้ ดังนั้นก่อนเขียนข้อมูลจึงลบทุกคีย์ที่อยู่ใน `IMPORT_STRIPPED_SETTINGS_KEYS` (ไฟล์เดียวกัน) ได้แก่ รหัสผ่านและ `currentPassword` ทุกรายการใน `SECURITY_IMPACTING_SETTINGS_KEYS` และสถานะเซสชันแดชบอร์ด (`sessionsValidAfter`, `revokedDashboardSessions`) ดังนั้นการนำเข้าแบ็กอัปเก่าจะไม่สามารถฟื้นเซสชันที่ถูกยุติไปแล้วจากการเปลี่ยนรหัสผ่านหรือการออกจากระบบได้

## คลาสของเส้นทาง

`src/server/authz/types.ts` กำหนดคลาสไว้สามคลาส และเส้นทางใดที่จัดประเภทได้อย่างแน่นอนไม่ได้จะตกไปอยู่ที่ `MANAGEMENT` เสมอ

| Class        | Description                                                                                                                                      | Auth required                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `PUBLIC`     | เส้นทางที่ปลอดภัยอย่างชัดเจน — ล็อกอิน ล็อกเอาต์ สถานะ การเริ่มต้นระบบ health check และการบูตสแตรปการเริ่มใช้งาน                                 | ไม่ต้องใช้                                                     |
| `CLIENT_API` | เอนด์พอยต์ให้บริการโมเดล — `/api/v1/*`, `/api/v1beta/*` และ alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` | Bearer key เมื่อเปิดฟีเจอร์แฟล็ก `REQUIRE_API_KEY` ที่มีผลอยู่ |
| `MANAGEMENT` | หน้าแดชบอร์ด การตั้งค่า ผู้ให้บริการ คีย์ และเอนด์พอยต์ของผู้ดูแลระบบและการวินิจฉัย                                                              | เซสชันแดชบอร์ด หรือ Bearer ที่มีขอบเขต `manage`                |

การกระทำบางอย่างใน `MANAGEMENT` เป็น **สำหรับผู้ดูแลระบบเท่านั้น** การมีคีย์ `manage` เพียงอย่างเดียวไม่พอ ได้แก่ การส่งออกข้อมูลรับรองที่เก็บไว้ (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`) การกู้คืนแบ็กอัปทับข้อมูลสดที่ใช้งานอยู่ (`POST /api/db-backups/import` รวมถึง `dryRun=true`, `POST /api/db-backups` การกู้คืนด้วย id, `POST /api/settings/import-json`) และการทำลายจุดกู้คืน (`DELETE /api/db-backups` สำหรับการเคลียร์ และ `PATCH /api/db-backups` เพราะการตั้งค่าการเก็บรักษาที่มันบันทึกไว้จะขับเคลื่อนการลบอัตโนมัติหลังสร้างแบ็กอัปทุกครั้ง) ซึ่งต้องใช้เซสชันแดชบอร์ด ตัวตน CLI ในเครื่อง หรือการปิดการล็อกอินอยู่ การออกโทเค็นการซิงก์ (`POST /api/sync/tokens`) และการสร้างโทเค็นการเข้าถึง CLI แบบ `admin` (`POST /api/cli/tokens`) ต้องใช้เซสชันแดชบอร์ดหรือตัวตน CLI ในเครื่องในทุกโหมดการล็อกอิน คีย์ API ทุกขอบเขตและโทเค็นการเข้าถึง `oma_` ไม่ใช่ข้อมูลรับรองของผู้ดูแลระบบ จึงจะได้รับ `403` ทุกครั้งที่ต้องใช้ข้อมูลรับรองแบบนั้น การตรวจสอบนี้อยู่ใน `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) การเปลี่ยนการตั้งค่าการล็อกอินก็เป็นงานของผู้ดูแลระบบเช่นกัน `POST /api/settings/require-login` (ตั้งรหัสผ่านผู้จัดการ หรือสลับ `requireLogin`) จะยอมรับเฉพาะข้อมูลรับรองเหล่านี้เมื่อมีรหัสผ่านแล้ว ช่วงบูตสแตรปครั้งแรกที่ยังไม่มีรหัสผ่านไม่มีการเปลี่ยนแปลง และเซสชันแดชบอร์ดต้องส่ง `currentPassword` มาเพื่อแทนที่รหัสผ่าน (ตอบ `403` เมื่อไม่มีหรือผิด และบันทึกเป็น audit ว่า `settings.update_failed`) CLI ในเครื่องและอินสแตนซ์ที่ปิดการล็อกอินอยู่จะคงเส้นทางการกู้คืนไว้ และตั้งรหัสผ่านได้โดยไม่ต้องใช้ค่านี้ เพราะทั้งสองผูกกับโฮสต์ที่เป็นเจ้าของไดเรกทอรีข้อมูล

## ไปป์ไลน์ (Pipeline)

```
คำขอขาเข้า → src/proxy.ts
  → runAuthzPipeline() ใน src/server/authz/pipeline.ts
    1. ลบส่วนหัวภายในที่เชื่อถือได้ (x-omniroute-auth-*, x-omniroute-route-class)
    2. สร้างรหัสคำขอ, จัดประเภทเส้นทางผ่าน classifyRoute()
    3. หาก pathname == "/" → เปลี่ยนเส้นทางไปที่ /dashboard
    4. หากกำลังระบาย (ปิดระบบอย่างนุ่มนวล) และ /api/* → 503
    5. หากไม่ใช่ GET /api/* → ตรวจสอบ checkBodySize() guard
    6. หาก OPTIONS → CORS preflight 204
    7. หาก options.enforce == false → ส่งผ่านพร้อมส่วนหัว route-class
    8. มิฉะนั้น: POLICIES[routeClass].evaluate(ctx)
       - อนุญาต  → ประทับ x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - ปฏิเสธ → ข้อผิดพลาด JSON พร้อม correlation_id (หน้าแดชบอร์ด → 302 /login)
```

ส่วนหัวภายในที่เชื่อถือได้ (กำหนดไว้ใน `src/server/authz/headers.ts`) จะ**ถูกลบออกจากคำขอขาเข้า**ก่อนการจัดประเภท — ลูกค้าไม่สามารถใส่ `x-omniroute-auth-*` ล่วงหน้าเพื่อปลอมตัวเป็นผู้ใช้ได้

### สัญญาของนโยบาย (Policy contracts)

แต่ละคลาสของเส้นทางมีนโยบายอยู่ใน `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — จะคืนค่า `allow({ kind: "anonymous", id: "anonymous" })` เสมอ
- **`clientApiPolicy`** (`policies/clientApi.ts`) — ดึง Bearer ออกมา, ตรวจสอบความถูกต้องผ่าน `validateApiKey()` จะเปลี่ยนไปใช้ anonymous ก็ต่อเมื่อแฟล็กคุณสมบัติ `REQUIRE_API_KEY` ที่มีผลบังคับใช้ถูกปิดใช้งาน แฟล็กที่มีผลบังคับใช้จะถูกแก้ไขผ่าน `isRequireApiKeyEnabled()` (การแทนที่แฟล็กคุณสมบัติของ DB > `process.env.REQUIRE_API_KEY` > ค่าเริ่มต้น) ดังนั้นแฟล็กคุณสมบัติของแดชบอร์ดและตัวแปรสภาพแวดล้อมจึงควบคุม `/api/v1/*`, `/api/v1beta/*` และชื่อแทนได้อย่างสอดคล้องกัน; ความล้มเหลวในการแก้ไขจะทำให้การเข้าถึงถูกปฏิเสธ อนุญาตคำขอเซสชันแดชบอร์ดบนเส้นทาง API ของไคลเอ็นต์ (รวมถึง `/api/v1/models` ที่ใช้โดยแคตตาล็อกโมเดลของแดชบอร์ด)
- **`managementPolicy`** (`policies/management.ts`) — ยอมรับเซสชันแดชบอร์ด, คำขอซิงค์โมเดลภายใน (ที่ตรงกับ `/api/providers/[name]/(sync-models|models)`) หรือข้ามทั้งหมดหาก `isAuthRequired()` คืนค่าเป็น false คืนค่า 403 (`AUTH_001`) เมื่อมีโทเค็น Bearer แต่ไม่ถูกต้อง, มิฉะนั้นจะคืนค่า 401 นอกจากนี้ยังบังคับใช้ระดับการป้องกันเส้นทาง (LOCAL_ONLY / ALWAYS_PROTECTED) ก่อนที่จะมีการตรวจสอบการยืนยันตัวตนใดๆ — ดู [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) เส้นทาง LOCAL_ONLY ใน `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (ปัจจุบัน: `/api/mcp/`) อาจเข้าถึงได้จากภายนอก loopback เมื่อคีย์ Bearer มีขอบเขต `manage`; เส้นทาง LOCAL_ONLY อื่นๆ ทั้งหมดจะยังคงเป็น strict-loopback โดยไม่คำนึงถึงขอบเขต

นโยบายที่สำเร็จจะคืนค่า `AuthSubject` ที่มี `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` แฮนเดิลเลอร์ปลายน้ำสามารถอ่านได้ผ่าน `assertAuth(request, "CLIENT_API")` ใน `src/server/authz/assertAuth.ts` แทนที่จะเรียกใช้ตรรกะการยืนยันตัวตนซ้ำ

## รายการเส้นทางสาธารณะ

`src/shared/constants/publicApiRoutes.ts` คือรายการที่อนุญาตอย่างชัดเจน:

รายการนี้ถูกแบ่งตาม **รูปแบบ** และการแบ่งนี้มีผลสำคัญ (GHSA-74g9-q8f6-793h): คำนำหน้าจะถูกจับคู่ด้วย `startsWith()` ดังนั้นจึงจับคู่กับทุกเส้นทางที่อยู่ติดกันซึ่งมีอักขระนำหน้าเหมือนกัน
`/api/usage/om-usage` ในฐานะคำนำหน้าจะถูกทำเครื่องหมายว่า `/api/usage/om-usage<anything>` เป็น PUBLIC และ Next จะแปลงสิ่งนั้นเป็น `/api/usage/[connectionId]` — ซึ่งเป็นตัวจัดการที่ไม่มีการยืนยันตัวตนของตัวเอง

```ts
// โครงสร้างย่อยที่แท้จริง ทุกรายการต้องลงท้ายด้วย "/" (ยืนยันโดยการทดสอบหน่วย)
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // ถือเป็น CLIENT_API ใน classify ไม่ใช่ "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// เส้นทางเดียวที่จับคู่ตรงกัน (มีหรือไม่มีเครื่องหมายทับท้าย)
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// เส้นทางเดียวแบบอ่านอย่างเดียวที่อนุญาตการผ่อนปรน CORS origin ด้วย
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// เส้นทางเดียวแบบอ่านอย่างเดียวที่ไม่มีการผ่อนปรน CORS
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

เส้นทางแบบอ่านอย่างเดียวจะเป็นสาธารณะ **เฉพาะ** สำหรับเมธอดที่ปลอดภัยเท่านั้น ข้อควรทราบ: `classifyRoute()` จะยกเว้น `/api/v1/*` และ `/api/v1beta/*` จากการผ่านไปเป็น PUBLIC — เส้นทางเหล่านี้จะเป็น `CLIENT_API` เสมอ ดังนั้นนโยบายคีย์ Bearer จึงยังคงใช้ได้

## การเพิ่มเส้นทางใหม่

### รูปแบบที่ 1 — ปลายทาง API ของไคลเอนต์สาธารณะ (การยืนยันตัวตนแบบ Bearer)

เส้นทางภายใต้ `/api/v1/` และ `/api/v1beta/` จะถูกจัดประเภทเป็น `CLIENT_API` โดยอัตโนมัติ มิดเดิลแวร์จะบังคับใช้การตรวจสอบ Bearer; ตัวจัดการเส้นทางไม่จำเป็นต้องทำซ้ำ แต่สามารถอ่าน subject ได้หากเป็นประโยชน์

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler logic
}
```

### รูปแบบที่ 2 — ปลายทางสำหรับการจัดการ (เซสชันหรือ Bearer + จัดการ)

ใช้ `requireManagementAuth()` จาก `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler logic
}
```

`requireManagementAuth()` จะคืนค่า `null` เมื่อสำเร็จ หรือคืนค่า `Response` ข้อผิดพลาดแบบ JSON:

- 401 `AUTH_001` "Authentication required" — ไม่มีข้อมูลรับรองเลย
- 403 — Bearer ไม่ถูกต้อง **หรือ** มี Bearer แต่คีย์ไม่มีขอบเขต `manage` / `admin`

`hasManageScope(scopes)` จะคืนค่า true สำหรับ `"manage"` หรือ `"admin"`

### รูปแบบที่ 3 — การเพิ่มลงในรายการที่อนุญาตสาธารณะ

เลือกชุดตามรูปแบบ ไม่ใช่ตามความสะดวก เส้นทางเดียวจะอยู่ใน `PUBLIC_API_ROUTES_EXACT` (หรือ `PUBLIC_READONLY_CORS_API_ROUTES` สำหรับ GET-only); เฉพาะโครงสร้างย่อยที่แท้จริงเท่านั้นที่จะอยู่ใน `PUBLIC_API_ROUTE_PREFIXES` และ **ต้องลงท้ายด้วย `/`** การใส่เส้นทางเดียวในรายการคำนำหน้ายังเป็นการเผยแพร่เส้นทางที่อยู่ติดกันทั้งหมดที่ใช้ตัวอักษรนำหน้าเดียวกัน — รวมถึงเส้นทางพี่น้องที่มีส่วนของไดนามิกที่เพิ่มเข้ามาภายหลัง (GHSA-74g9-q8f6-793h) อัปเดตการทดสอบหน่วยที่ `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` และ `tests/unit/authz/classify.test.ts`

## สโคป

สามเนมสเปซ ตัวตรวจสอบแต่ละตัวจะอ่านเฉพาะสตริงของตัวเองเท่านั้น การเปรียบเทียบแบบเคียงข้างกัน รวมถึงเหตุผลที่ `manage` ล้มเหลวในการ `scopeMatches` สำหรับ `read:compression` และเหตุผลที่โทเค็นการเข้าถึงแบบ `read` ไม่สามารถ `PATCH /api/keys/{id}` ได้ อยู่ที่ [Three scope namespaces](../frameworks/MCP-SERVER.md#three-scope-namespaces)

คีย์ API มีอาร์เรย์ `scopes` (จัดเก็บเป็น JSON ใน `api_keys.scopes` ดู `src/lib/db/apiKeys.ts`)

### สโคปการจัดการ

- `manage` / `admin` — `hasManageScope` การเข้าถึงเส้นทาง API การจัดการแบบ Bearer
- `mcp:connect`, `self:usage`, `self:account-quota` และ `policy:bypass-provider-quota` เป็นสโคปแบบเพิ่มค่าที่ตรงกันทุกประการ สโคปเหล่านี้อยู่นอก `MANAGEMENT_API_KEY_SCOPES` `mcp:connect` จะเปิดเฉพาะส่วน `/api/mcp/` ที่ไม่ใช่ loopback เท่านั้น

### สโคปเครื่องมือ MCP

แค็ตตาล็อกและกฎการจับคู่ (สตริงที่เหมือนกัน หรือสโคปที่ได้รับซึ่งลงท้ายด้วย `*`): [MCP tool scopes](../frameworks/MCP-SERVER.md#mcp-tool-scopes) `MCP_SCOPE_LIST` ใน `src/shared/constants/mcpScopes.ts` เป็นชุดย่อยที่พิมพ์ไว้แต่เดิม ไม่ใช่แค็ตตาล็อกทั้งหมดนั้น การบังคับใช้จะทำงานใน `open-sse/mcp-server/scopeEnforcement.ts` หลังจาก `resolveCallerScopeContext()` แก้ไขสโคปจากข้อมูลการรับรองความถูกต้องของ MCP, เมตาดาต้าคำขอ หรือ `OMNIROUTE_MCP_SCOPES` จะยังคงปิดอยู่เว้นแต่ `OMNIROUTE_MCP_ENFORCE_SCOPES=true`

### สโคปโทเค็นการเข้าถึง

`read` / `write` / `admin` บนโทเค็น `oma_live_…` จัดอันดับโดย `scopeSatisfies` (`src/lib/accessTokens/scopes.ts`) การจัดอันดับนี้ใช้กับข้อมูลประจำตัวของโทเค็นการเข้าถึงเท่านั้น ดู [Management Authentication](../guides/MANAGEMENT-AUTH.md)

## สวิตช์การกำหนดให้ต้องยืนยันตัวตน

`isAuthRequired()` ใน `src/shared/utils/apiAuth.ts` ตัดสินว่าคำขอหนึ่ง ๆ จะถูกบังคับให้ยืนยันตัวตน **หรือไม่** ดังนี้:

- `settings.requireLogin === false` → ปิดการยืนยันตัวตนทั้งระบบ ยกเว้นระดับที่ป้องกันเสมอ (ดู [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md)) และการเรียกที่ออกข้อมูลรับรองซึ่งระบบยอมรับ ซึ่งต้องใช้ข้อมูลรับรองเดียวกับตอนที่เปิดการล็อกอิน ได้แก่ การออกโทเค็นการซิงก์ การสร้างโทเค็นการเข้าถึง CLI ทุกขอบเขต การสร้างคีย์ API ที่มีขอบเขต `manage`/`admin` การให้ขอบเขตนั้นแก่คีย์ การสร้างใหม่หรือการเปิดเผยคีย์ดังกล่าว (`requireCredentialForManagementScopedKey()` ใน `src/lib/api/requireManagementAuth.ts`) คีย์สำหรับการอนุมาน (inference) อย่างเดียวยังคงเปิดอยู่
- ยังไม่ได้ตั้งรหัสผ่าน **และ** ไม่มีตัวแปรสภาพแวดล้อม `INITIAL_PASSWORD` → โหมดบูตสแตรปอนุญาตวิซาร์ดการเริ่มต้นใช้งานและคำขอจาก loopback แต่คำขอจากเครือข่ายภายนอกยังต้องใช้ข้อมูลรับรอง
- ข้อผิดพลาดของ DB ใด ๆ → ปิดล็อก (fails closed, ค่าเริ่มต้นที่ปลอดภัย)

การบังคับใช้ API key ของไคลเอนต์ใช้ `isRequireApiKeyEnabled()` ใน `src/shared/utils/featureFlags.ts` แทนการอ่าน `process.env.REQUIRE_API_KEY` โดยตรง ซึ่งสำคัญสำหรับอินสแตนซ์ที่นำไปใช้งานจริง เมื่อสลับ `REQUIRE_API_KEY` ใน Dashboard → Feature Flags ระบบจะเก็บค่า override ลงฐานข้อมูล และมีผลทันทีต่อ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` และการตรวจสอบการยืนยันตัวตนของ client API อื่น ๆ ที่ใช้ฟังก์ชันตัวช่วยนี้ร่วมกัน หากอ่านที่เก็บ feature flag ไม่ได้ การยืนยันตัวตนของ client API จะปิดล็อกและต้องการคีย์

## การเปลี่ยนแปลงที่ส่งผลกระทบ — v3.8.0

เอนด์พอยต์ `/api/v1/agents/tasks/*` และ `/api/resilience/model-cooldowns` **ตอนนี้ต้องมีการรับรองความถูกต้องของการจัดการ** (คอมมิต `588a0333`) ไคลเอ็นต์ที่เคยส่งคีย์ API ปกติโดยไม่มีสโคป `manage` จะได้รับ `403` การย้ายข้อมูล: ออกสโคป `manage` ให้กับคีย์ในแดชบอร์ด API Keys หรือใช้เซสชันแดชบอร์ดที่เข้าสู่ระบบแล้ว

## การเปลี่ยนแปลงพฤติกรรม — v3.8.2

`/api/mcp/*` (เซิร์ฟเวอร์ MCP ระยะไกล) ยังคงเป็น LOCAL_ONLY โดยค่าเริ่มต้น แต่ตอนนี้ยอมรับคำขอที่ไม่ใช่ loopback เมื่อส่วนหัว `Authorization: Bearer <api-key>` มีสโคป `manage` ส่วนที่แยกออกมาถูกจำกัดอย่างชัดเจนต่อเส้นทางผ่าน `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ใน `src/server/authz/routeGuard.ts`; ส่วนนำหน้า LOCAL_ONLY ที่เป็นพี่น้องกัน `/api/cli-tools/runtime/*` ไม่สามารถข้ามได้โดยเจตนาเนื่องจากสามารถสร้างกระบวนการย่อยแบบสุ่มได้ คำขอที่ไม่ระบุชื่อไปยัง `/api/mcp/*` จากที่ไม่ใช่ loopback ยังคงส่งคืน `403 LOCAL_ONLY` — ค่าเริ่มต้นสำหรับเส้นทาง LOCAL_ONLY ใหม่ใดๆ ยังคงเป็น strict-loopback ดู [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)

## การทดสอบ

- การทดสอบหน่วย: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`
- รายการที่อนุญาตสาธารณะ: `tests/unit/public-api-routes.test.ts`
- เรียกใช้แบบเน้น: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`

## การดีบัก

ไปป์ไลน์จะประทับการตอบกลับด้วย:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

สำหรับการร้องขอที่ผ่านการรับรองความถูกต้อง ส่วนหัวการร้องขอต้นน้ำ (ฝั่งแฮนเดิลเลอร์) จะรวมถึง:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ใช้ `assertAuth(req, expectedClass)` ภายในแฮนเดิลเลอร์ — มันจะโยน `AuthzAssertionError` พร้อมโค้ด `AUTHZ_NOT_INITIALIZED` หากมิดเดิลแวร์ถูกข้าม (มีประโยชน์สำหรับการตรวจจับการถดถอยของการกำหนดค่าในการทดสอบ)

## ดูเพิ่มเติม

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ตัวทำเครื่องหมายการรับรองความถูกต้องต่อปลายทาง
- [COMPLIANCE.md](../security/COMPLIANCE.md) — บันทึกการตรวจสอบสำหรับเหตุการณ์การรับรองความถูกต้อง
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — สามเนมสเปซขอบเขตและแคตตาล็อกขอบเขตเครื่องมือ MCP
- แหล่งที่มา: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
