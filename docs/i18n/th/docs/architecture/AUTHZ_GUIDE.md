# Authorization Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **แหล่งข้อมูลที่แท้จริง:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **อัปเดตล่าสุด:** 2026-09-22 — ขอบเขตเนมสเปซชี้ไปที่ MCP-SERVER.md

OmniRoute มีไปป์ไลน์การอนุญาตที่รับรู้เส้นทาง ซึ่งควบคุมทุกคำขอ API การจัดประเภทเป็นแบบ **กำหนดได้** และ **ปิดเมื่อล้มเหลว** — สิ่งใดก็ตามที่ไม่สามารถจัดประเภทได้จะถูกจัดเป็น `MANAGEMENT` และต้องใช้เซสชันหรือโทเค็นระดับการจัดการ หน้านี้อธิบายโมเดลสำหรับวิศวกรที่ดูแลเส้นทางหรือออกแบบปลายทางใหม่

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> ที่มา: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## โหมดการยืนยันตัวตน 2 รูปแบบ

### 1. คีย์ API (Bearer)

ใช้สำหรับ API ของไคลเอนต์ที่เข้ากันได้กับ OpenAI/Anthropic/Gemini และเส้นทางการจัดการบางส่วนเมื่อคีย์มีขอบเขต `manage`

```
Authorization: Bearer <api-key>
```

ตรวจสอบโดย `isValidApiKey()` / `extractApiKey()` ใน `src/sse/services/auth.ts` และส่งออกซ้ำผ่าน `src/shared/utils/apiAuth.ts` ตัวตรวจสอบยังยอมรับตัวแปรสภาพแวดล้อม `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` เป็นคีย์ passthrough แบบถาวรด้วย (issue #1350)

### 2. เซสชันแดชบอร์ด (คุกกี้ auth_token)

สำหรับหน้าแดชบอร์ดและการดำเนินการของผู้ดูแลระบบ

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

คุกกี้จะถือเป็นเซสชันก็ต่อเมื่อ JWT ตรวจสอบได้ **และ** มีค่า `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`) ผู้ใช้คุกกี้ทุกจุด (ตัวป้องกันเส้นทางแดชบอร์ด (`isDashboardSessionAuthenticated()`), การรีเฟรชในกระบวนการ authz, การจับมือ WebSocket, เซิร์ฟเวอร์แบบไลฟ์, `/api/settings/require-login`, `/api/auth/status`) จะเรียกใช้ตัวช่วยดังกล่าว
JWT อื่นที่ลงนามด้วย `JWT_SECRET` ก็มีอยู่เช่นกัน — Cursor CLI passthrough จะสร้างโทเค็น `iss "omniroute" / aud "cursor-cli"` สำหรับผู้ถือคีย์ — และจะไม่ถือเป็นเซสชันโดยเด็ดขาด
(#13298)

ตรวจสอบโดย `isDashboardSessionAuthenticated()` ใน `src/shared/utils/apiAuth.ts` กระบวนการจะรีเฟรช JWT โดยอัตโนมัติเมื่อเหลืออายุการใช้งานน้อยกว่า 7 วันจากอายุการใช้งาน 30 วัน

เซสชันยังสามารถสิ้นสุดก่อนครบ 30 วันได้ เนื่องจากตัวสร้างโทเค็นทุกตัวเรียกใช้ `mintDashboardSessionToken` (ซึ่งกำหนดเวลาออก `iat` และรหัส `jti`) และตัวตรวจสอบจะตรวจสอบการตั้งค่า 2 รายการ ได้แก่ `sessionsValidAfter` ซึ่งตั้งค่าเมื่อมีการเปลี่ยนรหัสผ่าน ทำให้เซสชันทั้งหมดที่ออกก่อนหน้านั้นไม่ผ่านการตรวจสอบอีกต่อไป (เบราว์เซอร์ที่เปลี่ยนรหัสผ่านจะได้รับคุกกี้ใหม่) และ `revokedDashboardSessions` ซึ่ง `POST /api/auth/logout` จะเพิ่ม `jti` ของเซสชันที่ออกจากระบบลงไป เซสชันที่สร้างโดยรีลีสเก่าจะไม่มี claim ทั้งสองรายการ และยังคงใช้ได้จนกว่าจะมีการเปลี่ยนรหัสผ่านครั้งแรก หากไม่สามารถอ่านการตั้งค่าได้ จะไม่ถือว่าเซสชันนั้นเชื่อถือได้

เส้นทางการจัดการบางส่วนยอมรับ **โหมดใดโหมดหนึ่ง**: คุกกี้ หรือ `Bearer <key>` เมื่อคีย์ API มีขอบเขต `manage` (หรือ `admin`) สิ่งนี้ช่วยให้เวิร์กโฟลว์ "กำหนดค่าได้ผ่านการเรียก API" ที่เพิ่มเข้ามาใน v3.8 ทำงานได้

#### เกตการเข้าสู่ระบบ OIDC แบบไม่บังคับ (#6973)

การเข้าสู่ระบบของผู้ดูแลแดชบอร์ดยังรองรับโฟลว์ OIDC (OpenID Connect) แบบ **เลือกเปิดใช้** ควบคู่กับการเข้าสู่ระบบด้วยรหัสผ่านเริ่มต้น — การเข้าสู่ระบบด้วยรหัสผ่านจะไม่ถูกนำออก เพียงแต่มีการเพิ่มวิธีดังกล่าวเข้ามา:

- ปิดใช้งานไว้ เว้นแต่ `settings.oidcEnabled === true` **และ**กำหนดค่า
  `oidcIssuer` / `oidcClientId` / `oidcClientSecret` ครบทั้งหมด (Settings → Auth)
  มิฉะนั้น `GET /api/auth/oidc/login` จะส่งคืน `400`
- `GET /api/auth/oidc/login` จะค้นหา `authorization_endpoint` จาก
  `/.well-known/openid-configuration` ของ issuer (หากไม่พบจะใช้
  `<issuer>/authorize`), สร้าง URI สำหรับ redirect จากคำขอขาเข้า
  (รองรับ `x-forwarded-proto`) และ redirect ไปยัง IdP พร้อม `state` แบบสุ่ม
  ซึ่งจัดเก็บไว้ในคุกกี้ `oidc_state` ที่มีแฟล็ก `httpOnly`
- `GET /api/auth/oidc/callback` จะตรวจสอบ `state`, แลก authorization code
  และตรวจสอบลายเซ็นของ ID token ผ่าน JWKS ของ issuer
  (`createRemoteJWKSet` ของ `jose` ซึ่งแคชแยกตาม URI ของ JWKS) พร้อมตรวจสอบ
  `issuer`/`audience` การอนุญาตให้เข้าสู่แดชบอร์ดต้องมีรายการ
  `oidcAllowedSubjects` ที่ไม่ว่าง, นโยบาย `oidcAdmissionClaim` หรือมีทั้งสองอย่าง
  รายการ subject จะจับคู่กับ `sub` หรือ `email` ได้เฉพาะเมื่อ
  `email_verified === true` เท่านั้น นโยบาย claim ที่เป็นตัวเลือกจะรับพาธของ claim
  ใน ID token ที่คั่นด้วยจุด (เช่น `realm_access.roles`) และอาร์เรย์ของค่าที่ยอมรับ
  claim ที่แก้ไขค่าแล้วต้องเป็นอาร์เรย์ของสตริงที่มีค่าที่ยอมรับอย่างน้อยหนึ่งค่า
  หากกำหนดค่าทั้งสองนโยบาย ทั้งสองนโยบายต้องผ่าน การไม่มี claim หรือ claim ที่มีรูปแบบ
  ไม่ถูกต้องจะถือว่าไม่ผ่านโดยปริยาย และหากไม่มีนโยบายใดเลย callback จะปฏิเสธการเข้าสู่ระบบ
  (`not_configured`) การกำหนดค่าที่ใช้เฉพาะ subject เดิมจะยังทำงานเหมือนเดิม
- โดยปกติ Keycloak จะแมป realm roles ลงใน access token ไม่ใช่ ID token เสมอไป
  หากต้องการกำหนดให้ต้องมี realm role `admin` ให้กำหนด protocol mapper สำหรับไคลเอ็นต์นี้
  เพื่อให้รวม `realm_access.roles` ไว้ใน **ID token** จากนั้นตั้งค่า
  `oidcAdmissionClaim` เป็น `{ "path": "realm_access.roles", "values": ["admin"] }`
  ตรวจสอบ claim ใน ID token จริงสำหรับไคลเอ็นต์นี้ก่อนเปิดใช้การอนุญาตเฉพาะตาม role
  เนื่องจากแอปพลิเคชันจะไม่อ่าน role จาก access token การปฏิเสธโทเค็นจากฝั่ง IdP
  สามารถใช้เสริมได้ แต่ไม่สามารถแทนที่การตรวจสอบฝั่งแอปพลิเคชันนี้
- เมื่อสำเร็จ ระบบจะสร้าง JWT `auth_token` อายุ 30 วัน **แบบเดียวกันทุกประการ**
  กับที่การเข้าสู่ระบบด้วยรหัสผ่านออกให้ (`src/app/api/auth/login/route.ts`)
  ดังนั้นกระบวนการเซสชันแดชบอร์ดส่วนที่เหลือ (การรีเฟรชอัตโนมัติ แฟล็กคุกกี้)
  จึงไม่เปลี่ยนแปลง — OIDC เพียงแทนที่วิธีสร้างคุกกี้ ไม่ได้เปลี่ยนสิทธิ์ที่คุกกี้มอบให้
  การเปลี่ยนแปลง role/group ใน IdP จะไม่ทำให้เซสชัน OmniRoute ที่มีอยู่เป็นโมฆะ
  การออกจากระบบ การเปลี่ยนรหัสผ่าน หรือการหมดอายุของเซสชันยังคงเป็นตัวกำหนดอายุเซสชัน
- การตั้งค่า `oidc*` ทุกตัว (`oidcEnabled`, `oidcDisablePasswordLogin`,
  `oidcIssuer`, `oidcClientId`, `oidcClientSecret`, `oidcAllowedSubjects`,
  `oidcAdmissionClaim`, `oidcRedirectPath`, `oidcScopes`) อยู่ใน
  `SECURITY_IMPACTING_SETTINGS_KEYS`
  (`src/shared/constants/securityImpactingSettings.ts`): `PATCH /api/settings`
  จะตอบกลับ `400 PASSWORD_REQUIRED` เว้นแต่ body จะมีรหัสผ่านสำหรับการจัดการเป็น
  `currentPassword` (หากไม่ถูกต้องจะเป็น `401 PASSWORD_MISMATCH`)
  `oidcDisablePasswordLogin` จะปฏิเสธการเข้าสู่ระบบด้วยรหัสผ่าน
  (`POST /api/auth/login`) แต่ยังคงเก็บแฮชรหัสผ่านไว้ และการยืนยันตัวตนซ้ำยังคงตรวจสอบ
  `currentPassword` กับแฮชดังกล่าว
- `corsOrigins` และ `bruteForceProtection` ก็อยู่ใน `SECURITY_IMPACTING_SETTINGS_KEYS`
  เช่นกัน: การผ่อนปรนค่าใดค่าหนึ่งจะลดความเข้มงวดของการป้องกันการเข้าสู่ระบบ
  ดังนั้นจึงต้องยืนยันตัวตนซ้ำด้วย `currentPassword` เช่นเดียวกัน
  (แท็บ Security จะขอค่านี้) และการนำเข้า JSON จะตัดค่าเหล่านี้ออก
- คีย์นโยบายความปลอดภัยทุกคีย์ — รายการใน `SECURITY_IMPACTING_SETTINGS_KEYS`,
  คีย์ `oidc*` ทุกตัว และสถานะเซสชันแดชบอร์ด — เป็นสิทธิ์ **operator-only**
  สำหรับ `PATCH /api/settings`: API key ที่มีขอบเขต manage หรือ access token `oma_`
  จะถูกปฏิเสธด้วย `403` แม้จะส่ง `currentPassword` ที่ถูกต้อง และการปฏิเสธจะถูกบันทึก
  เป็น `settings.update_failed` พร้อม `reason: OPERATOR_REQUIRED`
  (`requireOperatorCredential()` ใน `src/lib/api/operatorCredential.ts`)
  การตั้งค่าทั่วไป (ธีม ค่ากำหนดการแสดงผล) ยังคงเขียนได้ด้วยคีย์ `manage`
  หรือ access token `admin` การเปลี่ยนแปลงทุกครั้งของ `/api/settings` เอง
  (รวมถึง `/api/settings/require-login`) ยังต้องมีขอบเขต access token `admin`
  (`ADMIN_MUTATION_EXACT_PATHS` ใน `src/server/authz/accessScopes.ts`
  ซึ่งจับคู่พาธแบบตรงทั้งหมด); `GET` ยังคงใช้ `read` และเส้นทางย่อยอื่นของ
  `/api/settings/*` (พร็อกซี ค่าเริ่มต้นแบบผสม ชื่อแทนโมเดล การบีบอัด การล้างข้อมูล…)
  ยังคงใช้ขอบเขต `write` ที่อนุมานจากเมธอด
- `POST /api/settings/import-json` จะข้ามการยืนยันตัวตนซ้ำ ดังนั้นจะตัดคีย์ทุกตัวใน
  `IMPORT_STRIPPED_SETTINGS_KEYS` (ไฟล์เดียวกัน) ออกก่อนเขียน ได้แก่ รหัสผ่านและ
  `currentPassword`, รายการทั้งหมดใน `SECURITY_IMPACTING_SETTINGS_KEYS`
  และสถานะเซสชันแดชบอร์ด (`sessionsValidAfter`, `revokedDashboardSessions`)
  ดังนั้นการนำเข้าข้อมูลสำรองเก่าจะไม่สามารถทำให้เซสชันกลับมาใช้งานได้อีก
  หากเซสชันนั้นสิ้นสุดลงแล้วจากการเปลี่ยนรหัสผ่านหรือการออกจากระบบ

#### การเข้าสู่ระบบด้วย TOTP แบบสองปัจจัยที่เป็นตัวเลือก (#16619)

ลงทะเบียนได้จาก Settings → Security; ปิดใช้งานไว้จนกว่าผู้ปฏิบัติงานจะเปิดใช้
(`src/server/auth/dashboardMfa.ts`)

- **ครอบคลุมอะไรบ้าง:** การเข้าสู่ระบบด้วยรหัสผ่าน (`POST /api/auth/login` ซึ่งจากนั้นต้องใช้
  `POST /api/auth/mfa/verify`) และ `omniroute connect` (`POST /api/cli/connect`
  ซึ่งปฏิเสธการแลกเปลี่ยนที่ใช้เฉพาะรหัสผ่าน และรับรหัสเป็น `totp`)
- **ไม่ครอบคลุมอะไรบ้าง:** การลงชื่อเข้าใช้ด้วย OIDC / SSO (`/api/auth/oidc/callback`) จะ
  ไม่ขอ OmniRoute TOTP โดยอาศัยปัจจัยที่สองของผู้ให้บริการข้อมูลประจำตัวเอง ดังนั้น
  ให้บังคับใช้ MFA ใน IdP หากเปิดใช้งาน OIDC
- **การกู้คืน** (อุปกรณ์สูญหาย ไม่มีรหัสกู้คืนเหลือ หรือไม่สามารถยืนยันปัจจัยหนึ่งได้อีกต่อไป
  เช่น หลังจาก `STORAGE_ENCRYPTION_KEY` เปลี่ยนแปลง):
  1. รีสตาร์ตเซิร์ฟเวอร์โดยตั้งค่า `OMNIROUTE_DISABLE_MFA=true`
  2. บนโฮสต์นั้นเอง (เพียร์แบบ loopback และ `Host` แบบ loopback เช่น
     `http://localhost:20128`) ให้ลงชื่อเข้าใช้ด้วยรหัสผ่าน ปัจจัยที่สองจะถูกข้าม
     สำหรับต้นทางนั้นเท่านั้น ส่วนต้นทางอื่นทั้งหมดยังคงต้องใช้รหัส
  3. ใน การตั้งค่า → ความปลอดภัย → ปิดใช้งาน ให้กรอกรหัสผ่านและเว้นรหัสไว้
     `POST /api/auth/mfa/disable` ยอมรับเนื้อหาคำขอที่ไม่มี `code` เฉพาะขณะที่
     ตั้งค่าตัวแปรดังกล่าวและคำขอมาจากโฮสต์เท่านั้น โดยยังคงต้องมีเซสชันแดชบอร์ด
     และรหัสผ่านปัจจุบัน และจะถูกบันทึกการตรวจสอบเป็น `auth.mfa.disabled` ด้วย
     `secondFactor: "recovery_switch"`
  4. ยกเลิกการตั้งค่า `OMNIROUTE_DISABLE_MFA` รีสตาร์ต และลงทะเบียนใหม่หากจำเป็น

## คลาสเส้นทาง

`src/server/authz/types.ts` กำหนดสามคลาส; เส้นทางใด ๆ ที่ไม่สามารถจำแนกได้จะกลับไปเป็น `MANAGEMENT` ตามกำหนด

| ระดับ        | คำอธิบาย                                                                                                                                       | ต้องมีการตรวจสอบสิทธิ์                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `PUBLIC`     | เส้นทางที่ปลอดภัยอย่างชัดเจน การเข้าสู่ระบบ —, ออกจากระบบ, สถานะ, สุขภาพ, การเริ่มต้นใช้งานบูตสแตรป                                            | ไม่มี                                                                   |
| `CLIENT_API` | จุดสิ้นสุดการแสดงโมเดล — `/api/v1/*`, `/api/v1beta/*` บวกนามแฝง `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` | รหัสผู้ถือเมื่อเปิดใช้งานแฟล็กคุณลักษณะ `REQUIRE_API_KEY` ที่มีผลใช้งาน |
| `MANAGEMENT` | หน้าแดชบอร์ด การตั้งค่า ผู้ให้บริการ คีย์ จุดสิ้นสุดของผู้ดูแลระบบและการวินิจฉัย                                                               | เซสชันแดชบอร์ด OR Bearer พร้อมขอบเขต `manage`                           |

การกระทำของ `MANAGEMENT` บางประการคือ** ผู้ดำเนินการเท่านั้น** : ปุ่ม `manage` นั้นไม่เพียงพอ การส่งออกข้อมูลรับรองที่เก็บไว้ (`GET /api/settings/export-json`, `GET /api/db-backups/export`, `GET /api/db-backups/exportAll`) การกู้คืนการสำรองข้อมูลบนข้อมูลสด (`POST /api/db-backups/import` รวมถึง `dryRun=true`, `POST /api/db-backups` กู้คืนโดย id, `POST /api/settings/import-json`) การทำลายจุดคืนค่า ( การล้างข้อมูล `DELETE /api/db-backups` และ `PATCH /api/db-backups` เนื่องจากการเก็บรักษาที่ยังคงอยู่ ขับเคลื่อนการตัดอัตโนมัติหลังจากการสำรองข้อมูลทุกครั้ง) จำเป็นต้องมีเซสชันแดชบอร์ด เรื่อง CLI ในเครื่อง หรือปิดใช้งานการเข้าสู่ระบบ การออกโทเค็นการซิงค์ (`POST /api/sync/tokens`) และการสร้างโทเค็นการเข้าถึง `admin` CLI (`POST /api/cli/tokens`) จำเป็นต้องมีเซสชันแดชบอร์ดหรือหัวเรื่อง CLI ในเครื่องในทุกโหมดการเข้าสู่ระบบ คีย์ API ของขอบเขตใดๆ และโทเค็นการเข้าถึง `oma_` ไม่ใช่ข้อมูลรับรองของผู้ปฏิบัติงาน โดยจะได้รับ `403` ทุกครั้งที่จำเป็น เช็คอยู่ใน `src/lib/api/operatorCredential.ts` (`resolveOperatorCredential()` / `requireOperatorCredential()`) การเปลี่ยนการตั้งค่าการเข้าสู่ระบบเป็นเพียงผู้ดำเนินการเท่านั้น: `POST /api/settings/require-login` (ตั้งรหัสผ่านการจัดการ / สลับ `requireLogin`) ยอมรับเฉพาะข้อมูลรับรองเหล่านั้นเมื่อมีรหัสผ่านอยู่ — หน้าต่างบูตสแตรปที่ทำงานครั้งแรก (ยังไม่มีรหัสผ่าน) จะไม่เปลี่ยนแปลง — และเซสชันแดชบอร์ดต้องส่ง `currentPassword` เพื่อแทนที่รหัสผ่าน (`403` เมื่อหายไปหรือผิด ตรวจสอบเป็น `settings.update_failed`) CLI ในเครื่องและอินสแตนซ์ที่ปิดใช้งานการเข้าสู่ระบบจะเก็บเส้นทางการกู้คืนไว้และอาจตั้งรหัสผ่านโดยไม่มีเส้นทางดังกล่าว เนื่องจากทั้งสองถูกผูกไว้กับโฮสต์ที่เป็นเจ้าของไดเร็กทอรีข้อมูล

## ไปป์ไลน์

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

ส่วนหัวภายในที่เชื่อถือได้ (กำหนดใน `src/server/authz/headers.ts`) คือ** ถูกตัดออกจากคำขอที่เข้ามา** ก่อนการจำแนกประเภทไคลเอ็นต์ — ไม่สามารถเติม `x-omniroute-auth-*` ล่วงหน้าเพื่อเลียนแบบหัวเรื่องได้

### สัญญานโยบาย

แต่ละคลาสเส้นทางมีนโยบายเป็น `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — จะส่งกลับ `allow({ kind: "anonymous", id: "anonymous" })` เสมอ
- **`clientApiPolicy`** (`policies/clientApi.ts`) — แยก Bearer ตรวจสอบผ่าน `validateApiKey()` ตกสู่สถานะไม่ระบุชื่อเฉพาะเมื่อมีการปิดใช้งานแฟล็กคุณลักษณะ `REQUIRE_API_KEY` ที่มีผลใช้งาน แฟล็กที่มีประสิทธิผลได้รับการแก้ไขผ่าน `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`) ดังนั้น Dashboard Feature Flags และตัวแปรสภาพแวดล้อมจะควบคุม `/api/v1/*`, `/api/v1beta/*` และนามแฝงอย่างสม่ำเสมอ ความล้มเหลวของตัวแก้ไขล้มเหลวปิด อนุญาตคำขอเซสชันแดชบอร์ดบนเส้นทาง API ของไคลเอ็นต์ (รวมถึง `/api/v1/models` ที่ใช้โดยแค็ตตาล็อกโมเดลแดชบอร์ด) เมื่อเปิดใช้งาน Entra ID SSO ผู้ถือที่มีโครงสร้างเป็นโทเค็น Entra (สามเซ็กเมนต์ base64url, `RS*` alg, `kid`) จะได้รับการจัดการโดยสาขา SSO** ก่อน** `validateApiKey()` และคำตัดสินถือเป็นที่สิ้นสุด — จะไม่ผ่านไปยังเส้นทางคีย์ API หรือสาขาที่ลดระดับลงเป็นนิรนาม ดังนั้นการหยุดทำงานของผู้ให้บริการข้อมูลประจำตัวจึงไม่กลายเป็นการเข้าถึงแบบเปิด คีย์ API แบบคงที่จะไม่ได้รับผลกระทบ ดู [ที่ ID SSO](../security/ENTRA_SSO.md)
- **`managementPolicy`** (`policies/management.ts`) — ยอมรับเซสชันแดชบอร์ด คำขอซิงค์โมเดลภายใน (จับคู่กับ `/api/providers/[name]/(sync-models|models)`) หรือข้ามทั้งหมดหาก `isAuthRequired()` ส่งคืนค่าเท็จ ส่งคืน 403 (`AUTH_001`) เมื่อมีโทเค็น Bearer อยู่แต่ไม่ถูกต้อง มิฉะนั้น 401 จะส่งคืน นอกจากนี้ยังบังคับใช้ระดับการป้องกันเส้นทาง (LOCAL_ONLY / ALWAYS_PROTECTED) ก่อนสาขาการรับรองความถูกต้องใดๆ — โปรดดูที่ [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) เส้นทาง LOCAL_ONLY ใน `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (วันนี้: `/api/mcp/`) อาจเข้าถึงได้จาก non-loopback เมื่อคีย์ Bearer มีขอบเขต `manage` เส้นทาง LOCAL_ONLY อื่นๆ ทั้งหมดยังคงเป็นแบบวนกลับแบบเข้มงวดโดยไม่คำนึงถึงขอบเขต

นโยบายที่ประสบความสำเร็จจะส่งคืน `AuthSubject` ด้วย `kind ∈ { client_api_key, dashboard_session, management_key, anonymous, sso_user }` ตัวจัดการดาวน์สตรีมสามารถอ่านผ่าน `assertAuth(request, "CLIENT_API")` ใน `src/server/authz/assertAuth.ts` แทนที่จะรันตรรกะการตรวจสอบสิทธิ์อีกครั้ง

## รายการเส้นทางสาธารณะ

`src/shared/constants/publicApiRoutes.ts` เป็นรายการที่อนุญาตอย่างชัดเจน:

รายการจะถูกแบ่งตาม** รูปร่าง** และการแยกเป็นแบบรับน้ำหนัก (GHSA-74g9-q8f6-793h): คำนำหน้าจับคู่กับ `startsWith()` ดังนั้นจึงจับคู่ทุกเส้นทางที่อยู่ติดกันซึ่งใช้อักขระนำร่วมกัน `/api/usage/om-usage` เป็นคำนำหน้าที่มีเครื่องหมาย `/api/usage/om-usage<anything>` PUBLIC และ Next แก้ไขสิ่งนั้นเป็น `/api/usage/[connectionId]` — ตัวจัดการที่ไม่มีการรับรองความถูกต้องของตัวเอง

```ts
// Genuine subtrees. Every entry MUST end in "/" (asserted by a unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Single routes, matched EXACTLY (with or without a trailing slash).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/auth/mfa/verify", // login step 2 for opt-in TOTP; needs the MFA-pending cookie
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Read-only single routes that also take the CORS origin relaxation.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Read-only single route WITHOUT the CORS relaxation.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

เส้นทางแบบอ่านอย่างเดียวเป็นแบบสาธารณะ** เท่านั้น** เพื่อวิธีการที่ปลอดภัย หมายเหตุ: `classifyRoute()` แยก `/api/v1/*` และ `/api/v1beta/*` ออกจาก PUBLIC fall-through — ซึ่งจะเป็น `CLIENT_API` เสมอ ดังนั้นนโยบาย Bearer-key ยังคงมีผลใช้อยู่

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

## จำเป็นต้องมีการสลับการรับรองความถูกต้อง

`isAuthRequired()` ใน `src/shared/utils/apiAuth.ts` ตัดสินใจว่า** ใดๆ** การรับรองความถูกต้องถูกบังคับใช้สำหรับคำขอ:

- `settings.requireLogin === false` → auth ถูกปิดใช้งานทั่วโลก ยกเว้นระดับที่มีการป้องกันตลอดเวลา (ดู [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md) ) และการเรียกที่มอบข้อมูลรับรองที่ยอมรับ ซึ่งต้องใช้ข้อมูลรับรองเดียวกันกับเมื่อเปิดการเข้าสู่ระบบ: การออกโทเค็นการซิงค์ การสร้างโทเค็นการเข้าถึง CLI ที่ขอบเขตใด ๆ และสร้างคีย์ API ด้วยขอบเขต `manage`/`admin` การอนุญาตขอบเขตนั้นให้กับคีย์ หรือการสร้างใหม่ หรือเปิดเผยคีย์ดังกล่าว (`requireCredentialForManagementScopedKey()` ใน `src/lib/api/requireManagementAuth.ts`) คีย์สำหรับการอนุมานเท่านั้นยังคงเปิดอยู่ การเขียนแฟล็กคุณลักษณะที่ได้รับการป้องกัน (`REQUIRE_API_KEY` แฟล็ก Security อื่นๆ และแฟล็ก SSRF / TLS / MCP-scope / sandbox ที่แสดงอยู่ใน [Feature Flags](../reference/FEATURE_FLAGS.md#rest-api) ) และการบันทึกการตั้งค่าการมาสก์ PII (`PUT /api/settings/pii`) ยังจำเป็นต้องมีหนังสือรับรองอยู่
- ไม่มีการกำหนดค่ารหัสผ่าน** และ** ไม่มีโหมดบูทสแตรป `INITIAL_PASSWORD` env var → อนุญาตให้ใช้วิซาร์ดการออนบอร์ดและคำขอลูปแบ็คได้ แต่คำขอเครือข่ายที่เปิดเผยยังคงต้องการข้อมูลรับรอง ข้อยกเว้น: การเขียนแฟล็กคุณลักษณะที่ได้รับการป้องกันและการบันทึกการตั้งค่าการมาสก์ PII (`PUT /api/settings/pii`) จำเป็นต้องมีข้อมูลรับรองแม้จะมาจากลูปแบ็ค ดังนั้นการวนกลับด้วยตัวเองจึงไม่เพียงพอ
- ข้อผิดพลาด DB ใดๆ → ล้มเหลวในการปิด (ปลอดภัยโดยค่าเริ่มต้น)

การบังคับใช้คีย์ API ของไคลเอ็นต์ใช้ `isRequireApiKeyEnabled()` ใน `src/shared/utils/featureFlags.ts` ไม่ใช่การอ่าน `process.env.REQUIRE_API_KEY` โดยตรง สิ่งนี้สำคัญสำหรับอินสแตนซ์ที่ปรับใช้: การสลับ `REQUIRE_API_KEY` ในแดชบอร์ด → Feature Flags จะจัดเก็บการแทนที่ DB และส่งผลทันที `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` และการตรวจสอบการตรวจสอบสิทธิ์ไคลเอ็นต์-API อื่นๆ ที่ใช้ตัวช่วยนี้ร่วมกัน หากไม่สามารถอ่านที่เก็บค่าสถานะคุณลักษณะได้ ไคลเอ็นต์ API auth จะปิดไม่สำเร็จและต้องใช้คีย์

## การเปลี่ยนแปลงที่ส่งผลกระทบ — v3.8.0

เอนด์พอยต์ `/api/v1/agents/tasks/*` และ `/api/resilience/model-cooldowns` **ตอนนี้ต้องมีการรับรองความถูกต้องของการจัดการ** (คอมมิต `588a0333`) ไคลเอ็นต์ที่เคยส่งคีย์ API ปกติโดยไม่มีสโคป `manage` จะได้รับ `403` การย้ายข้อมูล: ออกสโคป `manage` ให้กับคีย์ในแดชบอร์ด API Keys หรือใช้เซสชันแดชบอร์ดที่เข้าสู่ระบบแล้ว

## การเปลี่ยนแปลงพฤติกรรม — v3.8.2

`/api/mcp/*` (เซิร์ฟเวอร์ MCP ระยะไกล) ยังคงเป็น LOCAL_ONLY โดยค่าเริ่มต้น แต่ตอนนี้ยอมรับคำขอที่ไม่ใช่ loopback เมื่อส่วนหัว `Authorization: Bearer <api-key>` มีสโคป `manage` ส่วนที่แยกออกมาถูกจำกัดอย่างชัดเจนต่อเส้นทางผ่าน `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ใน `src/server/authz/routeGuard.ts`; ส่วนนำหน้า LOCAL_ONLY ที่เป็นพี่น้องกัน `/api/cli-tools/runtime/*` ไม่สามารถข้ามได้โดยเจตนาเนื่องจากสามารถสร้างกระบวนการย่อยแบบสุ่มได้ คำขอที่ไม่ระบุชื่อไปยัง `/api/mcp/*` จากที่ไม่ใช่ loopback ยังคงส่งคืน `403 LOCAL_ONLY` — ค่าเริ่มต้นสำหรับเส้นทาง LOCAL_ONLY ใหม่ใดๆ ยังคงเป็น strict-loopback ดู [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)

## การทดสอบ

- การทดสอบหน่วย: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`
- รายการที่อนุญาตสาธารณะ: `tests/unit/public-api-routes.test.ts`
- เรียกใช้แบบเน้น: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`

## การดีบัก

ไปป์ไลน์จะประทับคำตอบด้วย:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

สำหรับคำขอที่ได้รับการตรวจสอบสิทธิ์ ส่วนหัวคำขออัปสตรีม (ฝั่งตัวจัดการ) ยังรวมถึง:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous | sso_user
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous" | <entra-oid>
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

ใช้ `assertAuth(req, expectedClass)` ภายในตัวจัดการ — มันจะส่ง `AuthzAssertionError` พร้อมรหัส `AUTHZ_NOT_INITIALIZED` หากมิดเดิลแวร์ถูกข้าม (มีประโยชน์สำหรับการตรวจจับการถดถอยของการกำหนดค่าในการทดสอบ)

## ดูเพิ่มเติม

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ตัวทำเครื่องหมายการรับรองความถูกต้องต่อปลายทาง
- [COMPLIANCE.md](../security/COMPLIANCE.md) — บันทึกการตรวจสอบสำหรับเหตุการณ์การรับรองความถูกต้อง
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md#three-scope-namespaces) — สามเนมสเปซขอบเขตและแคตตาล็อกขอบเขตเครื่องมือ MCP
- แหล่งที่มา: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
