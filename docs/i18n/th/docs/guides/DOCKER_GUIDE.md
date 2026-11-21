# 🐳 Docker Guide — OmniRoute (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> เอกสารอ้างอิงฉบับสมบูรณ์สำหรับการปรับใช้ด้วย Docker สำหรับการเริ่มต้นอย่างรวดเร็ว โปรดดู[ส่วน Docker ใน README](../README.md#-docker)

## สารบัญ

- [เรียกใช้งานอย่างรวดเร็ว](#quick-run)
- [ใช้งานร่วมกับไฟล์สภาพแวดล้อม](#with-environment-file)
- [Docker Compose](#docker-compose)
- [โปรไฟล์ที่พร้อมใช้งาน](#available-profiles)
- [การกำหนดค่าเครื่องมือ CLI บนโฮสต์เมื่อ OmniRoute ทำงานใน Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose สำหรับระบบใช้งานจริง](#production-compose)
- [สเตจของ Dockerfile](#dockerfile-stages)
- [ตัวแปรสภาพแวดล้อมที่สำคัญ](#critical-environment-variables)
- [Docker Compose พร้อม Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [แท็กอิมเมจ](#image-tags)
- [การอัปเดตแดชบอร์ดใน Docker](#dashboard-updates-in-docker)
- [ความพร้อมใช้งาน: SQLite เริ่มต้นรองรับเรพลิกาเดียว](#availability-default-sqlite-is-single-replica)
- [ข้อผิดพลาดตามภูมิภาคของ Gemini ภายใน Docker](#gemini-regional-errors-inside-docker)
- [หมายเหตุสำคัญ](#important-notes)

---

## วิ่งด่วน

> **โฮสต์ตัวเองในคำสั่งเดียว?** ดู [คู่มือการโฮสต์ด้วยตนเอง](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (รูปภาพที่เผยแพร่ + Redis, ย้อนกลับเท่านั้น ไม่มีตัวเลือกโปรไฟล์) การเรียกใช้ด่วนด้านล่างเป็นเส้นทางคอนเทนเนอร์เดียวสำหรับผู้ใช้ที่เรียกใช้ Redis ที่อื่นอยู่แล้ว

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## ด้วยไฟล์สิ่งแวดล้อม

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Docker Compose

```bash
# โปรไฟล์พื้นฐาน (ไม่มีเครื่องมือ CLI)
docker compose --profile base up -d

# โปรไฟล์ CLI (มี Claude Code, Codex และ OpenClaw ในตัว)
docker compose --profile cli up -d

# โปรไฟล์โฮสต์ (เน้น Linux เป็นหลัก โดยเมานต์ไบนารี CLI ของโฮสต์เป็นแบบอ่านอย่างเดียว)
docker compose --profile host up -d

# โปรไฟล์เว็บ (Chromium/Playwright สำหรับผู้ให้บริการที่ใช้เว็บเซสชัน)
docker compose --profile web up -d

# รวม CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## โปรไฟล์ที่พร้อมใช้งาน

OmniRoute มาพร้อมโปรไฟล์ Compose สำหรับรูปแบบการปรับใช้หลัก เลือกโปรไฟล์ที่ตรงกับสภาพแวดล้อมของคุณ

| โปรไฟล์              | บริการ           | ควรใช้เมื่อ                                                                                                                                      | คำสั่ง                                       |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (ค่าเริ่มต้น) | `omniroute-base` | เซิร์ฟเวอร์แบบไม่มีส่วนติดต่อผู้ใช้ / รันไทม์ขั้นต่ำ โดยไม่มี CLI ของผู้ให้บริการรวมอยู่ด้วย                                                     | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | เวิร์กโฟลว์แบบเอเจนต์ที่เรียก `omniroute providers/setup/doctor` และ CLI ที่รวมมาให้ (Codex, Claude Code, Droid, OpenClaw)                       | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | โฮสต์ Linux ที่ต้องการการเข้าถึง CLI ของโฮสต์ในลักษณะ `network_mode` โดยเมานต์ `~/.local/bin`, `~/.codex`, `~/.claude` ฯลฯ เป็นแบบอ่านอย่างเดียว | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | เรียกใช้ [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar บนพอร์ต `8317` สำหรับการพร็อกซี CLI ต้นทาง                          | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | ผู้ให้บริการที่ใช้เว็บเซสชันและต้องมีเบราว์เซอร์: `gemini-web`, `claude-web`, `claude-turnstile` (บิลด์ `runner-web` ซึ่งรวม Chromium ไว้แล้ว)   | `docker compose --profile web up -d`         |

> สามารถใช้หลายโปรไฟล์ร่วมกันได้: `docker compose --profile cli --profile cliproxyapi up -d`

## การกำหนดค่าเครื่องมือ CLI บนโฮสต์เมื่อ OmniRoute ทำงานใน Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` และปุ่ม
**บันทึกการกำหนดค่า** บนแดชบอร์ด ล้วนเขียนไฟล์อย่าง `~/.codex/*.config.toml` พาธเหล่านั้น
มีความหมายเฉพาะบนเครื่องที่ CLI ทำงานอยู่จริงเท่านั้น หากเรียกใช้คำสั่งเหล่านี้ภายใน
คอนเทนเนอร์ ไฟล์จะถูกเขียนลงในโฮมของคอนเทนเนอร์เอง (`/home/node` —
อิมเมจทำงานด้วย `USER node`) ซึ่ง CLI บนโฮสต์จะไม่มีวันอ่าน และไฟล์เหล่านั้นจะ
ถูกทิ้งทันทีที่สร้างคอนเทนเนอร์ขึ้นใหม่

OmniRoute ตรวจพบกรณีนี้และปฏิเสธการเขียน พร้อมแสดงคำแนะนำแทนที่จะ
รายงานว่าสำเร็จทั้งที่คุณไม่สามารถใช้งานได้ โดย CLI จะจบการทำงานด้วยรหัส `2` และ API จะตอบกลับด้วย `422`
พร้อม `containerEphemeralTarget: true`

### แนะนำ: เรียกใช้ CLI บนโฮสต์ และเรียกใช้ OmniRoute ใน Docker

คอนเทนเนอร์ให้บริการ API ส่วน CLI ใช้กำหนดค่าเครื่องมือบนโฮสต์ของคุณ

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # กำหนดให้ CLI ชี้ไปยังคอนเทนเนอร์
omniroute setup-codex                      # เขียนลงใน ~/.codex จริงบนโฮสต์ของคุณ
```

นี่คือตัวเลือกที่เหมาะสมเมื่อ Codex, Claude Code, Cursor หรือเครื่องมือที่คล้ายกันทำงานบน
แล็ปท็อปของคุณ ซึ่งเป็นรูปแบบการใช้งานทั่วไป

### ทางเลือก: bind-mount ไดเรกทอรีการกำหนดค่าของโฮสต์ (โปรไฟล์ `host`)

หากคุณต้องการให้คอนเทนเนอร์เขียนการกำหนดค่าบนโฮสต์ ให้เมานต์
ไดเรกทอรีเหล่านั้นเข้ามาและกำหนด `CLI_CONFIG_HOME` ให้ชี้ไปยังรากของการเมานต์ โปรไฟล์ `host`
ได้ดำเนินการนี้ไว้แล้ว:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount คือสิ่งที่ทำให้พาธเชื่อถือได้ โดย OmniRoute จะอ่าน
`/proc/self/mountinfo` และอนุญาตให้เขียนไปยังพาธที่เมานต์ไว้ (รวมถึงไดเรกทอรี
ที่มีไดเรกทอรีย่อยเป็นจุดเมานต์ ซึ่งตรงกับโครงสร้าง `/host-home` ข้างต้นพอดี) ขณะเดียวกัน
ก็ยังคงปฏิเสธพาธที่ไม่ได้เมานต์

### ทางเลือกฉุกเฉิน: กำหนดค่า CLI ภายในคอนเทนเนอร์เอง (ควรใช้เท่าที่จำเป็น)

เมื่อ CLI อยู่ภายในคอนเทนเนอร์จริง ๆ (โปรไฟล์ `cli`) การเขียนดังกล่าว
ถือเป็นการตั้งใจ ให้ส่ง `--allow-container-write` ไปยังคำสั่ง `setup-*` ใด ๆ หรือกำหนด
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` สำหรับเซิร์ฟเวอร์ การเขียนจะดำเนินต่อ
พร้อมคำเตือนว่าข้อมูลจะไม่คงอยู่หลังคอนเทนเนอร์สิ้นสุดลง

> **คำเตือนด้านความปลอดภัย — โปรไฟล์ `cli` + การเมานต์ `docker.sock`**
> โปรไฟล์ `cli` จะ bind-mount `/var/run/docker.sock` เพื่อให้ตัวอัปเดตอัตโนมัติ
> ภายในคอนเทนเนอร์สามารถสร้างสแตกขึ้นใหม่ผ่าน daemon ของโฮสต์ได้
> (`src/lib/system/autoUpdate.ts` จะตรวจหาซ็อกเก็ตดังกล่าวและข้าม
> เส้นทาง Docker เมื่อไม่พบซ็อกเก็ต) ซ็อกเก็ตนี้คือ **ขอบเขตความเชื่อถือระดับ root
> ของโฮสต์**: ทุกสิ่งที่เข้าถึงซ็อกเก็ตนี้ได้จะสามารถควบคุม Docker daemon ของโฮสต์ในฐานะ
> root — โดยสามารถสร้าง ตรวจสอบ หยุด และลบคอนเทนเนอร์ใด ๆ บนโฮสต์ได้
> ผลกระทบ:
>
> 1. **ห้ามเปิดพอร์ตของโปรไฟล์ `cli` สู่เครือข่ายโดยเด็ดขาด** ให้เผยแพร่
>    พอร์ตบน `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — โปรไฟล์ `cli` ที่เข้าถึงได้จาก LAN จะเปลี่ยนช่องโหว่ RCE ระดับแดชบอร์ดให้กลายเป็น
>    การยึดครองโฮสต์โดยสมบูรณ์
> 2. **อย่า bind ไดเรกทอรีเพิ่มเติมใด ๆ จากโฮสต์เข้าไปในโปรไฟล์ `cli`**
>    Docker socket เมื่อใช้ร่วมกับการเมานต์เพิ่มเติมใด ๆ จะทำให้คอนเทนเนอร์มีสิทธิ์
>    อ่าน/เขียนระบบไฟล์และการกำหนดค่าของโฮสต์ได้ทั้งหมด หากต้องการให้เครื่องมือ
>    เข้าถึงโปรเจกต์ ให้เรียกใช้เครื่องมือนั้นภายในเครื่องด้วยไบนารี CLI — อย่าเมานต์โปรเจกต์
>    เข้าไปในคอนเทนเนอร์ `cli`
>
> หากคุณไม่ต้องการการอัปเดตอัตโนมัติภายในคอนเทนเนอร์ ให้ปิดโปรไฟล์ `cli`
> (`COMPOSE_PROFILES=core,redis` หรือค่าที่สั้นกว่า) โปรไฟล์อื่นจะไม่
> เมานต์ Docker socket
>
> ดู `docs/security/MITM-TPROXY-DECRYPT.md` (อยู่ใน git; ไม่ได้คอมไพล์ไว้ใน `/docs`) สำหรับโมเดลภัยคุกคามที่เกี่ยวข้อง
> กับ MITM และดู `docs/security/SUPPLY_CHAIN.md` สำหรับ
> สายโซ่แหล่งที่มาของไบนารี `codex`/`claude-code`/`droid`/`openclaw`

## Redis Sidecar

OmniRoute ใช้ Redis เพื่อรองรับตัวจำกัดอัตราแบบกระจายและแคชที่ใช้ร่วมกัน บริการ `redis` จะถูก **กำหนดไว้เสมอ** ใน `docker-compose.yml` (ไม่มีการควบคุมด้วยโปรไฟล์) และจะเริ่มทำงานพร้อมกับโปรไฟล์อื่นทุกโปรไฟล์

| รายละเอียด                 | ค่า                                            |
| -------------------------- | ---------------------------------------------- |
| อิมเมจ                     | `redis:7-alpine`                               |
| ชื่อคอนเทนเนอร์            | `omniroute-redis`                              |
| พอร์ตภายใน                 | `6379`                                         |
| พอร์ตโฮสต์ (เขียนทับได้)   | `REDIS_PORT` (ค่าเริ่มต้นคือ `6379`)           |
| ที่อยู่โฮสต์ (เขียนทับได้) | `REDIS_BIND_HOST` (ค่าเริ่มต้นคือ `127.0.0.1`) |
| โวลุ่ม                     | `omniroute-redis-data` → `/data`               |
| การตรวจสอบสถานะ            | `redis-cli ping` (ทุก 10 วินาที)               |

ตัวแปรสภาพแวดล้อมที่เกี่ยวข้อง:

- `REDIS_URL` — สตริงการเชื่อมต่อที่ส่งให้แอป (ค่าเริ่มต้นคือ `redis://redis:6379`)
- `REDIS_PORT` — การแมปพอร์ตฝั่งโฮสต์สำหรับคอนเทนเนอร์ Redis
- `REDIS_BIND_HOST` — อินเทอร์เฟซของโฮสต์ที่เผยแพร่พอร์ต ค่าเริ่มต้นคือ `127.0.0.1`

> **เหตุผลที่ใช้ลูปแบ็กเป็นค่าเริ่มต้น:** sidecar ทำงานโดยไม่มี `requirepass` และคอนเทนเนอร์
> ของแอปจะเชื่อมต่อผ่านเครือข่าย compose (`redis:6379`) — พอร์ตที่เผยแพร่มีไว้สำหรับเครื่องมือ
> ฝั่งโฮสต์เท่านั้น (`redis-cli`, `npm run dev` ภายในเครื่อง) การเผยแพร่บน
> `0.0.0.0` จะทำให้ Redis ที่ไม่มีการยืนยันตัวตนถูกเปิดให้ทุกโฮสต์ใน LAN เข้าถึงได้ หากคุณตั้งค่า
> `REDIS_BIND_HOST=0.0.0.0` ให้เพิ่ม `--requirepass` ใน `command:` ของบริการด้วย

ไม่แนะนำให้ **ปิดใช้งาน Redis** (ตัวจำกัดอัตราจะลดระดับไปใช้กลไกสำรองในหน่วยความจำ) หากจำเป็น ให้ลบหรือแสดงความคิดเห็นบล็อกบริการ `redis:` ใน `docker-compose.yml` หรือปรับจำนวนอินสแตนซ์ให้เป็นศูนย์:

```bash
docker compose up -d --scale redis=0
```

## Compose สำหรับระบบใช้งานจริง

สำหรับสแนปช็อตระบบใช้งานจริงแบบแยกส่วนที่ทำงานควบคู่กับสภาพแวดล้อมพัฒนา ให้ใช้ `docker-compose.prod.yml`

| รายละเอียด            | ค่า                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------ |
| ไฟล์                  | `docker-compose.prod.yml`                                                                  |
| พอร์ตแดชบอร์ดเริ่มต้น | `PROD_DASHBOARD_PORT=20130` (แมปไปยังพอร์ตภายใน `${DASHBOARD_PORT:-20128}`)                |
| พอร์ต API เริ่มต้น    | `PROD_API_PORT=20131`                                                                      |
| อิมเมจ                | `omniroute:prod` (สร้างจากเป้าหมาย `runner-cli`)                                           |
| คอนเทนเนอร์ Redis     | `omniroute-redis-prod` (`redis:8.6.2`, ใช้โวลุ่ม `redis-prod-data` แยกเฉพาะ)               |
| โวลุ่มข้อมูล          | `omniroute-prod-data` (โวลุ่มแบบมีชื่อ ซึ่งคงอยู่ระหว่างการสร้างใหม่)                      |
| การตรวจสอบสถานะ       | `node healthcheck.mjs` + `redis-cli ping` โดย `depends_on` จะรอจน Redis มีสถานะพร้อมใช้งาน |

วิธีใช้งาน:

```bash
# สร้างและเริ่มต้นสแต็กสำหรับระบบใช้งานจริง
docker compose -f docker-compose.prod.yml up -d --build

# แสดงบันทึกแบบต่อเนื่อง
docker compose -f docker-compose.prod.yml logs -f

# ปิดสแต็ก (เก็บโวลุ่มไว้)
docker compose -f docker-compose.prod.yml down
```

สแต็กสำหรับระบบใช้งานจริงทำงานควบคู่กับ compose สำหรับการพัฒนาได้ (ใช้ชื่อคอนเทนเนอร์ พอร์ต และโวลุ่มที่แตกต่างกัน) คุณจึงสามารถพัฒนาและปรับปรุงภายในเครื่องต่อไปได้ ขณะที่ระบบใช้งานจริงยังคงทำงานอยู่

## ขั้นตอน Dockerfile

พื้นที่เก็บข้อมูลจัดส่ง Dockerfile แบบหลายขั้นตอน (`Dockerfile`) มีการเปิดเผยสี่ขั้นตอน เลือก `target` ที่เหมาะสมสำหรับกรณีการใช้งานของคุณ

| เวที          | ภาพฐาน                | วัตถุประสงค์                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ติดตั้ง deps (`npm ci --legacy-peer-deps`) และรัน `npm run build` (Turbopack โดยค่าเริ่มต้น — ดูทรัพยากรเวลาสร้างด้านล่าง)                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | รันไทม์การผลิตที่มีเอาต์พุต Next.js แบบสแตนด์อโลน** ไม่มีผู้ให้บริการ CLIs รวมอยู่ด้วย**                                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | เพิ่ม `git`, `docker.io`, `docker-compose` และ global CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`** เลือกสิ่งนี้สำหรับเวิร์กโฟลว์ตัวแทน**                                                                                                                 |
| `runner-web`  | `runner-base`         | เพิ่ม Playwright + เบราว์เซอร์ Chromium (`--with-deps`) สำหรับผู้ให้บริการเว็บเซสชัน: `gemini-web`, `claude-web`, `claude-turnstile`** เลือกตัวเลือกนี้เมื่อคุณใช้ผู้ให้บริการเหล่านั้น** — รูปภาพธรรมดาจะล้มเหลวตามเวลาที่ร้องขอหากไม่มีมัน (ดูหมายเหตุ `-web` ใต้ Release Channels) |

สร้างเป้าหมายเฉพาะด้วยตนเอง:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ทรัพยากรเวลาสร้าง

อาร์กิวเมนต์บิวด์สามรายการควบคุมค่าใช้จ่ายของสเตจ `builder` เป็นเวลา build-time เท่านั้น — `OMNIROUTE_MEMORY_MB` (ด้านล่าง) เป็นปุ่มควบคุมรันไทม์แยกต่างหาก

| สร้างเรื่อง                 | ค่าเริ่มต้น | ผล                                                                                 |
| --------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` สร้างด้วย webpack: หน่วยความจำสูงสุดต่ำลง, ช้าลง `1` เลือกใช้ Turbopack        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | V8 ฮีปเพดาน (`--max-old-space-size`) สำหรับ `next build` ที่เกิด                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | ฟีด `CIRCLE_NODE_TOTAL`; ถัดไปได้มาจาก `workers = N - 1` สำหรับการรวบรวมข้อมูลหน้า |

`OMNIROUTE_BUILD_WORKERS` เป็นคนหนึ่งที่เลี้ยงดูผู้สร้างรายใหญ่และเป็นคนหนึ่งที่น่าสงสัยเมื่อบิลด์ที่มีข้อจำกัดตาย** หลังจาก** `✓ Compiled successfully`. ผู้ปฏิบัติงานข้อมูลเพจแต่ละคนมีกระบวนการของตัวเอง และ `next build` ระดับบนสุดเองก็เช่นกัน การทำสำเนา VPS แบบสด (ปัญหา #7518) วัด RSS สูงสุดของกระบวนการแต่ละกระบวนการที่ ~ 4.5 GB โดยไม่ขึ้นอยู่กับแฟล็กฮีป `NODE_OPTIONS` (Turbopack คอมไพล์ในหน่วยความจำ native/Rust ภายนอกฮีป V8) ค่าเริ่มต้นของ `2` (ผู้ปฏิบัติงาน → 1 คน, รวม 2 กระบวนการ) มีขนาดสำหรับ 16 GB / 4 vCPU GitHub ที่โฮสต์รันเนอร์ที่ไปป์ไลน์การเผยแพร่ใช้ ที่ `8` (คนงาน → 7 คน) ที่นักวิ่งมีหน่วยความจำไม่เพียงพอและ buildkit ล้มเหลวในขั้นตอนด้วย `ResourceExhausted: ... cannot allocate memory`; `3` (คนงาน → 2 คน) ยังคงไม่พอดีเมื่อมีการวัด RSS ต่อกระบวนการโดยตรงแทนที่จะอนุมาน `tests/unit/docker-build-memory-budget.test.ts` คำนวณเลขคณิตเทียบกับตัวเลขที่วัดได้ และจะล้มเหลวหากปุ่มใดปุ่มหนึ่งเกินตัวรันเนอร์

Turbopack คอมไพล์ในหน่วยความจำ Rust ดั้งเดิมที่ยังมีชีวิตอยู่** ข้างนอก** ฮีป V8 ดังนั้น `OMNIROUTE_BUILD_MEMORY_MB` จึงไม่ผูกมัน บนโฮสต์ที่มีเพดานหน่วยความจำ บิลด์นั้น SIGKILLed โดย OOM killer โดยไม่มีข้อความแสดงข้อผิดพลาดเลย — มันหยุดกลางคัน `Creating an optimized production build` ซึ่งอ่านเหมือนหยุดทำงานแทนที่จะเป็นหน่วยความจำไม่เพียงพอ นั่นคือสาเหตุที่ `Dockerfile` ตั้งค่าเริ่มต้นเป็น webpack (`OMNIROUTE_USE_TURBOPACK=0`) ซึ่งต่างจาก `npm run dev` / `npm run build` โดยที่ Turbopack เป็นค่าเริ่มต้นของโค้ด: `docker build .` เปล่าที่ไม่มี args บิลด์ (สิ่งที่ Railway และโฮสต์คลิกเดียวอื่น ๆ ทำงาน) จะต้องไม่ตายอย่างเงียบ ๆ บนตัวสร้างที่ต่อยอดหน่วยความจำ รูปภาพที่เผยแพร่ผ่าน `OMNIROUTE_USE_TURBOPACK=0` อย่างชัดเจนใน `docker-publish.yml` แล้ว สำหรับตัวสร้างที่มี RAM มากมาย ให้เลือก Turbopack เพื่อการสร้างที่เร็วขึ้น:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ถูกเปิดใช้งาน ดังนั้น `next build` จึงรันพาเรนต์** และ** กระบวนการของผู้ปฏิบัติงานและแต่ละรายการจะให้เกียรติ `OMNIROUTE_BUILD_MEMORY_MB` แยกกัน ปรับขนาดเพดานตู้คอนเทนเนอร์ให้สูงกว่าค่าดังกล่าวประมาณสองเท่า ไม่ใช่ครั้งเดียว

วัดบนต้นไม้นี้ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| บันเดิล   | เพดานตู้คอนเทนเนอร์ | ผลลัพธ์                      |
| --------- | ------------------- | ---------------------------- |
| Turbopack | 8 GiB / 16 GiB      | OOM ฆ่าทั้งคู่อย่างเงียบๆ    |
| เว็บแพ็ก  | 8 GiB               | คนงานก่อสร้าง SIGKILLed      |
| เว็บแพ็ก  | 12 GiB              | สำเร็จ โดยสูงสุดที่ 11.1 GiB |

### ค่าเริ่มต้นรันไทม์

ค่าเริ่มต้นที่ส่งออกโดย `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`

พฤติกรรมหน่วยความจำใน Docker:

- รูปภาพตั้งค่า `OMNIROUTE_MEMORY_MB=1024` และได้รับ `NODE_OPTIONS=--max-old-space-size=1024` จากรูปภาพนั้น
- กระบวนการเซิร์ฟเวอร์จริงเริ่มต้นโดยตัวเรียกใช้งานแบบสแตนด์อโลน ซึ่งจะอ่าน `OMNIROUTE_MEMORY_MB` และต่อท้าย `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`
- โหนดใช้ค่า `--max-old-space-size` ที่ทำซ้ำครั้งล่าสุด ดังนั้นการตั้งค่า `OMNIROUTE_MEMORY_MB` จะควบคุมขีดจำกัดฮีป Docker ที่มีประสิทธิผล
- เนื่องจากรูปภาพจะตั้งค่าไว้เสมอ ดังนั้นทางเลือกสำรองที่ปรับเทียบ RAM ของตัวเรียกใช้งานจึงไม่มีผลภายใต้ Docker เพิ่มอย่างชัดเจนสำหรับภาระงาน (ตารางด้านล่าง) `2048` ยังเล็กเกินไปสำหรับ coding-agent `/v1/responses`

### รันไทม์ RAM สำหรับเอเจนต์การเขียนโค้ด

ค่าเริ่มต้น 1 GiB Docker คือ dashboard/light-chat floor ไม่ใช่ขนาดการใช้งานจริง เนื้อความ `POST /v1/responses` แบบยาว (ข้อความหลายร้อยข้อความ เครื่องมือนับสิบ) จะเก็บกราฟในหน่วยความจำหลายกราฟระหว่างการบีบอัด คำขอ ~ 3 MiB / ~ 750k-token สองรายการที่ทับซ้อนกันได้ยกเลิก V8 ที่** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) และยังตี 16 GiB cgroup OOM ดูที่ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)

ขนาด** cgroup `--memory` เหนือฮีป** บัฟเฟอร์เนทีฟ —, SQLite และตัวกลางการบีบอัดอยู่นอก V8

| ภาระงาน                                           | `OMNIROUTE_MEMORY_MB`      | คอนเทนเนอร์/ซีกรุ๊ป             | หมายเหตุ                                                                                                         |
| ------------------------------------------------- | -------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| แดชบอร์ด แชทแสงเดียว                              | `1024` (ค่าเริ่มต้นของภาพ) | ≥2 GiB                          |                                                                                                                  |
| เอเจนต์การเข้ารหัสหนึ่งรายการ (Claude/Codex/Grok) | `8192`                     | ≥10 GiB                         | `/v1/responses` เซสชันเดียวทั่วไป                                                                                |
| `/v1/responses` ยาวสองตัวพร้อมกัน                 | `10240`–`12288`            | ≥12–16 GiB                      | วัด V8 ยกเลิกที่ ~ 12 GiB ฮีป                                                                                    |
| บริบทขนาดยาวสาม + เกิดขึ้นพร้อมกัน                | ไม่ได้อยู่ในกระบวนการเดียว | ทำให้เป็นอนุกรม / เพิ่มเติม RAM | การรับเข้ารุ่นเฮฟวี่เวทเริ่มต้นคือ 1 ครั้งในเที่ยวบิน การเลี้ยงดูโดยไม่มี RAM จะเป็นการรื้อฟื้นการยกเลิกอีกครั้ง |

`omniroute serve` บนโลหะเปลือยจะปรับเทียบ ~ 35% ของ RAM (clamped `[512, 4096]`) เมื่อ `OMNIROUTE_MEMORY_MB` เป็น** ไม่ได้ตั้งค่า** . Docker จะตั้งค่า `1024` ไว้เสมอ ดังนั้นการปรับเทียบจะไม่ทำงานในอิมเมจอย่างเป็นทางการ

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## ตัวแปรสภาพแวดล้อมที่สำคัญ

นอกเหนือจากค่าเริ่มต้นที่ระบุไว้ใน [ENVIRONMENT.md](../reference/ENVIRONMENT.md) ตัวแปรต่อไปนี้มีความสำคัญมากที่สุดเมื่อทำงานภายใต้ Docker:

| ตัวแปร                        | วัตถุประสงค์                                                                                                                                                                                                                                                             | ค่าเริ่มต้น              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | ข้อมูลลับที่ใช้ร่วมกันสำหรับบริดจ์ WebSocket **จำเป็นสำหรับระบบที่ใช้งานจริง** — ตั้งค่าเป็นสตริงสุ่มที่คาดเดาได้ยาก                                                                                                                                                     | ไม่ได้ตั้งค่า (ต้องระบุ) |
| `REDIS_URL`                   | สตริงการเชื่อมต่อสำหรับแบ็กเอนด์ของตัวจำกัดอัตรา / แคช                                                                                                                                                                                                                   | `redis://redis:6379`     |
| `REDIS_PORT`                  | พอร์ตฝั่งโฮสต์สำหรับคอนเทนเนอร์ Redis ที่รวมมาให้                                                                                                                                                                                                                        | `6379`                   |
| `REDIS_BIND_HOST`             | อินเทอร์เฟซโฮสต์ที่ใช้เผยแพร่พอร์ต Redis ที่รวมมาให้ (ใช้ลูปแบ็ก เว้นแต่คุณจะเพิ่ม AUTH)                                                                                                                                                                                 | `127.0.0.1`              |
| `AUTO_UPDATE_HOST_REPO_DIR`   | พาธบนโฮสต์ที่เมานต์เข้าสู่โปรไฟล์ `cli` ที่ `/workspace/omniroute` สำหรับเวิร์กโฟลว์การอัปเดตตนเอง                                                                                                                                                                       | `.` (ไดเรกทอรีปัจจุบัน)  |
| `OMNIROUTE_MEMORY_MB`         | ขีดจำกัดฮีปของ Node ขณะรันไทม์สำหรับเซิร์ฟเวอร์ Docker แบบสแตนด์อโลน โดยเขียนทับค่าเริ่มต้นของอิมเมจข้างต้น สำหรับเอเจนต์เขียนโค้ด: `8192` ขึ้นไป (ดู [RAM ขณะรันไทม์](#runtime-ram-for-coding-agents))                                                                  | `1024`                   |
| `DASHBOARD_PORT` / `API_PORT` | เขียนทับพอร์ตที่เปิดเผยสำหรับแดชบอร์ด (20128) และ API (20129)                                                                                                                                                                                                            | `20128` / `20129`        |
| `APP_BIND_HOST`               | อินเทอร์เฟซโฮสต์ที่ docker-compose ใช้เผยแพร่พอร์ตแดชบอร์ด/API/live-WS เมื่อ `REQUIRE_API_KEY=false` (ค่าเริ่มต้น) ค่า `0.0.0.0` จะเปิดเผยพร็อกซี `/v1` แบบไม่ระบุตัวตนต่อ LAN — ให้ขยายการเข้าถึงเฉพาะเมื่อใช้ `REQUIRE_API_KEY=true` หรือมีรีเวิร์สพร็อกซีอยู่ด้านหน้า | `127.0.0.1`              |
| `CLIPROXY_BIND_HOST`          | อินเทอร์เฟซโฮสต์ที่ docker-compose ใช้เผยแพร่ไซด์คาร์ `cliproxyapi` — วอลุ่มข้อมูลของไซด์คาร์นี้เก็บข้อมูลประจำตัวของผู้ให้บริการ                                                                                                                                        | `127.0.0.1`              |
| `OMNIROUTE_PLUGINS_DIR`       | ไดเรกทอรีที่ตัวสแกนปลั๊กอินขณะรันไทม์ใช้สำหรับอ่านและติดตั้งปลั๊กอิน ให้ตั้งค่าเมื่อปลั๊กอินถูก bind mount: ค่าเริ่มต้นจะอิงตาม `HOME` ซึ่งอิมเมจอาจไม่ได้ export ไว้                                                                                                    | `~/.omniroute/plugins`   |
| `OMNIROUTE_BASE_PATH`         | พาธย่อยของ URL เมื่อเผยแพร่แอปผ่านรีเวิร์สพร็อกซี (เช่น `/omniroute`)                                                                                                                                                                                                    | _(ว่างเปล่า = ราก)_      |
| `NEXT_PUBLIC_BASE_URL`        | ต้นทางสาธารณะสำหรับเบราว์เซอร์ รวมถึงพาธย่อย (เช่น `https://host/omniroute`)                                                                                                                                                                                             | ไม่ได้ตั้งค่า            |
| `PROD_DASHBOARD_PORT`         | พอร์ตแดชบอร์ดฝั่งโฮสต์สำหรับ `docker-compose.prod.yml`                                                                                                                                                                                                                   | `20130`                  |
| `CLIPROXYAPI_PORT`            | พอร์ตฝั่งโฮสต์สำหรับไซด์คาร์ `cliproxyapi`                                                                                                                                                                                                                               | `8317`                   |

## Reverse Proxy บนเส้นทางย่อย (Traefik / nginx)

Next.js `basePath` ถูกคอมไพล์เป็นบันเดิลแบบสแตนด์อโลน OmniRoute บันทึกค่าอบในไฟล์ Sentinel ที่รูทของแอป (เขียนระหว่าง `npm run build`; อ่านโดย `scripts/docker/ensure-docker-base-path.mjs`) และเปรียบเทียบกับ `OMNIROUTE_BASE_PATH` เมื่อคอนเทนเนอร์เริ่มทำงาน เมื่อพวกมันแตกต่างและอิมเมจถูกสร้างขึ้นสำหรับรูทโดเมน จุดเข้าใช้งานจะเขียนรายการสแตนด์อโลนใหม่ ค่าตัวอักษร `basePath`/`assetPrefix` ที่ฝังไว้ (16 ถัดไปจะเรนเดอร์สินทรัพย์ SSR URLs จาก `assetPrefix` เพียงอย่างเดียว — ตัวแก้ไขจะสะท้อนเส้นทางย่อยลงไป) สินทรัพย์ `/_next/static` ที่อบแล้ว URLs (รายการอ้างอิงไคลเอนต์ การนำเข้าสื่อ หน้าแสดงข้อผิดพลาดที่แสดงผลล่วงหน้า) และไคลเอ็นต์ `process.env` shim ก่อน `node dev/run-standalone.mjs` ทำงาน

### เขียนบิลด์ (แนะนำ)

ตั้งค่าตัวแปรทั้งสองใน `.env` จากนั้นสร้างใหม่เพื่อให้อิมเมจและรันไทม์เห็นด้วย:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ส่งต่อ `OMNIROUTE_BASE_PATH` เป็น Docker build-arg และเป็นตัวแปรสภาพแวดล้อมรันไทม์

### เส้นทางย่อยรันไทม์รูทอิมเมจ + ที่สร้างไว้ล่วงหน้า

อิมเมจ `cheaperinference/omniroute:*` ที่เผยแพร่ถูกสร้างขึ้นสำหรับรูทโดเมน คุณยังคงสามารถตั้งค่า `OMNIROUTE_BASE_PATH` ขณะรันไทม์ได้ คอนเทนเนอร์จะแพตช์บันเดิลหนึ่งครั้งเมื่อเริ่มต้น จับคู่กับแหล่งที่มาสาธารณะที่ตรงกัน:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

กำหนดค่าพร็อกซีย้อนกลับเพื่อส่งต่อ** เต็ม** เส้นทางภายนอก (อย่าตัดคำนำหน้า) Traefik ควรกำหนดเส้นทาง `PathPrefix(`/omniroute `)` ไปยังคอนเทนเนอร์โดยไม่มี `StripPrefix` ดังนั้น Next.js ได้รับ `/omniroute/...` และให้บริการสินทรัพย์จาก `/omniroute/_next/...`

การตรวจสอบสุขภาพ Docker จะตรวจสอบจุดสิ้นสุดวงจรการใช้งาน `/healthz` แบบไลท์เวทที่นำหน้าด้วย `OMNIROUTE_BASE_PATH` ที่ใช้งานอยู่ `/api/monitoring/health` ยังคงพร้อมใช้งานสำหรับการวินิจฉัย human/dashboard หากต้องการชี้คอนเทนเนอร์ HEALTHCHECK กลับไป (เช่น สำหรับการบังคับใช้ด้านสุขภาพเชิงลึก) ให้ตั้งค่า `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` เส้นทางนั้นคือก** ลึก** ตรวจสอบ (DB สรุปการตรวจสอบ + ) — เหมาะสำหรับ `HEALTHCHECK` ที่ไม่บ่อยนักของ Docker หากคุณเลือกกลับเข้ามา แต่** ไม่** สำหรับช่วงเวลา Kubernetes `livenessProbe`

สำหรับผู้เรียบเรียง (Kubernetes, Nomad ฯลฯ):

| โพรบ            | ชอบมากกว่า                                                           | หลีกเลี่ยง                                                      |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------------------- |
| ความมีชีวิตชีวา | HTTP `GET /livez` หรือ TCP บนพอร์ตหลัก (`PORT`, ค่าเริ่มต้น `20128`) | `/api/monitoring/health` เป็นความมีชีวิตชีวา                    |
| ความพร้อม       | HTTP `GET /healthz`                                                  | การหมดเวลาที่เข้มงวดซึ่งถือว่าเหตุการณ์ลูปไม่ว่างถือว่าไม่ทำงาน |
| ลึก/กล่องดำ     | `/api/monitoring/health`                                             | —                                                               |

`/healthz` รายงานวงจรชีวิตของกระบวนการ (`ok` / `starting` / `stopping`) `/livez` เป็นแบบกระบวนการเท่านั้น (200 เมื่อใดก็ตามที่ตัวจัดการสามารถรันได้ โดยจะไม่รอความพร้อม) ทั้งสองยังคงทำงานบน Node event loop เดียวกันกับการจัดการคำขอ ดังนั้นแค็ตตาล็อกที่เชื่อมโยงกับ CPU หรืองานการบีบอัดอาจทำให้ — busy ≠ dead ล่าช้าได้ ต้องการความมีชีวิตชีวา TCP หากโพรบ HTTP หมดเวลา คำแนะนำเกี่ยวกับโพรบแบบเต็ม: [คู่มือการตรวจสอบ — คำแนะนำเกี่ยวกับโพรบ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)

## Docker เขียนด้วยแคดดี้ (HTTPS Auto-TLS)

OmniRoute สามารถเปิดเผยได้อย่างปลอดภัยโดยใช้การจัดเตรียม SSL อัตโนมัติของ Caddy ตรวจสอบให้แน่ใจว่าระเบียน DNS A ของโดเมนของคุณชี้ไปที่ IP ของเซิร์ฟเวอร์ของคุณ

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

แคดดี้ตั้งค่าส่วนหัวการส่งต่อมาตรฐานสำหรับคอนเทนเนอร์อัปสตรีม OmniRoute ใช้ `NEXT_PUBLIC_BASE_URL` เป็นแหล่งสาธารณะที่เป็นที่ยอมรับสำหรับการโทรกลับ OAuth และสร้างลิงก์สาธารณะ การเขียนแดชบอร์ดที่ได้รับการรับรองความถูกต้องใช้คำขอที่มีต้นกำเนิดเดียวกันบวกกับการป้องกัน CSRF ที่ผูกกับเซสชัน เปิดใช้งาน `OMNIROUTE_TRUST_PROXY` สำหรับการปรับใช้ขั้นสูงโดยเจตนาที่คุณต้องการให้ OmniRoute รับต้นทางสาธารณะจากส่วนหัวที่ส่งต่อที่เชื่อถือได้ แทนที่จะเป็นการกำหนดค่าที่ชัดเจน

## Cloudflare Quick Tunnel

การรองรับแดชบอร์ดสำหรับการติดตั้งใช้งานด้วย Docker มี **Cloudflare Quick Tunnel** แบบคลิกเดียวที่ `Dashboard → Endpoints` การเปิดใช้ครั้งแรกจะดาวน์โหลด `cloudflared` เฉพาะเมื่อจำเป็น เริ่ม tunnel ชั่วคราวไปยัง endpoint `/v1` ปัจจุบันของคุณ และแสดง URL `https://*.trycloudflare.com/v1` ที่สร้างขึ้นไว้ใต้ URL สาธารณะตามปกติของคุณโดยตรง

คุณสามารถแสดงหรือซ่อนแผง tunnel ของ endpoint (Cloudflare, Tailscale, ngrok) ได้จาก `Settings → Appearance` โดยไม่เปลี่ยนสถานะของ tunnel ที่กำลังทำงานอยู่

### หมายเหตุเกี่ยวกับ Tunnel

- URL ของ Quick Tunnel เป็น URL ชั่วคราวและจะเปลี่ยนทุกครั้งหลังรีสตาร์ต
- Quick Tunnel จะไม่ถูกกู้คืนโดยอัตโนมัติหลังจากรีสตาร์ต OmniRoute หรือคอนเทนเนอร์ ให้เปิดใช้อีกครั้งจากแดชบอร์ดเมื่อจำเป็น
- ปัจจุบันการติดตั้งแบบมีการจัดการรองรับ Linux, macOS และ Windows บน `x64` / `arm64`
- Quick Tunnel แบบมีการจัดการจะใช้ HTTP/2 transport เป็นค่าเริ่มต้น เพื่อหลีกเลี่ยงคำเตือนเกี่ยวกับบัฟเฟอร์ QUIC UDP ที่มีจำนวนมากในสภาพแวดล้อมคอนเทนเนอร์ที่มีทรัพยากรจำกัด ตั้งค่า `CLOUDFLARED_PROTOCOL=quic` หรือ `auto` หากคุณต้องการใช้ transport อื่น
- อิมเมจ Docker มี root CA ของระบบรวมอยู่ด้วย และส่งต่อให้ `cloudflared` แบบมีการจัดการ ซึ่งช่วยหลีกเลี่ยงความล้มเหลวในการตรวจสอบความน่าเชื่อถือของ TLS เมื่อ tunnel เริ่มทำงานภายในคอนเทนเนอร์
- ตั้งค่า `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` หากคุณต้องการให้ OmniRoute ใช้ไบนารีที่มีอยู่แล้วแทนการดาวน์โหลดใหม่

## แท็กรูปภาพ

| ภาพ                          | แท็ก     | ขนาด    | คำอธิบาย                                                   |
| ---------------------------- | -------- | ------- | ---------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | สูงสุด** ที่ตีพิมพ์** SemVer ที่เสถียร (ไม่ใช่ git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | ปักหมุดคลาสแท็กนี้สำหรับ GitOps                            |

อิมเมจเดียวกันนี้ได้รับการเผยแพร่ไปยังที่เก็บสามแห่ง โดยมีข้อมูลสรุปต่อสถาปัตยกรรมที่เหมือนกัน: `cheaperinference/omniroute` (Docker Hub, the Cheaper Inference Organization ตั้งแต่ 3.8.53 เป็นต้นไป), `ghcr.io/cheaper-inference/omniroute` และ Legacy `diegosouzapw/omniroute` ซึ่งเก็บประวัติการดึงและยังคงได้รับทุกรีลีส การปรับใช้ `diegosouzapw/omniroute` ที่มีอยู่จะอัปเดตอยู่เสมอ การเปลี่ยนชื่อรูปภาพเป็นทางเลือก ช่องทางก่อนเผยแพร่ `:next` / `:next-web` ด้านล่างเผยแพร่เฉพาะ `diegosouzapw/omniroute` และ GHCR เท่านั้น

รายการหลายแพลตฟอร์ม: `linux/amd64` + `linux/arm64` Native (Apple Silicon, AWS Graviton, Raspberry Pi) Docker เลือกสถาปัตยกรรมที่ตรงกันโดยอัตโนมัติ ส่งผ่าน `--platform linux/amd64` หากคุณต้องการบังคับการจำลอง AMD64 บนโฮสต์ ARM

### ช่องทางการเผยแพร่

OmniRoute เผยแพร่ช่องทาง Docker แยกต่างหากสำหรับการเผยแพร่ที่เสถียร การทดสอบสาขาการเผยแพร่ที่ใช้งานอยู่ และบิลด์การพัฒนา

| ช่อง                            | แหล่งที่มา                         | ความไม่แน่นอน                 | แนะนำให้ใช้                                                                                                                   |
| ------------------------------- | ---------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | ปล่อย Signed/versioned             | ไม่เปลี่ยนรูป                 | การใช้งานจริงที่ปักหมุดการเผยแพร่ที่แน่นอน                                                                                    |
| `:latest` / `:latest-web`       | สูงสุด** ที่ตีพิมพ์** มี SemVer    | ตัวชี้ที่เสถียรไม่แน่นอน      | ติดตามการเปิดตัวที่มีเสถียรภาพ** หลังจาก** SemVer เผยแพร่งาน — ทำ** ไม่** ติดตาม `main` หรือ `release/v*` ที่ยังไม่ได้เผยแพร่ |
| `:next` / `:next-web`           | สาขา `release/v*` เริ่มต้นปัจจุบัน | ตัวชี้ก่อนเผยแพร่ที่ไม่แน่นอน | การทดสอบการแก้ไขที่ลงสู่สาขารุ่นที่ใช้งานอยู่แต่ยังไม่อยู่ในรุ่นเสถียร                                                        |
| `:main` / `:main-web`           | สาขา `main`                        | ตัวชี้การพัฒนาที่ไม่แน่นอน    | การทดสอบการพัฒนาและบูรณาการเท่านั้น                                                                                           |

#### ผู้ให้บริการเซสชันเว็บ: อิมเมจ `-web`

ทุกช่องด้านบนจะเพิ่มเป็นสองเท่าของแท็ก `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) สร้างขึ้นจากระยะ `runner-web` — รูปภาพเดียวกันบวก Playwright และเบราว์เซอร์ Chromium ภาพธรรมดาจัดส่ง** ปราศจาก** โครเมียม; `gemini-web`, `claude-web` และ `claude-turnstile` ต้องการมัน

ความล้มเหลวถูกเลื่อนออกไป ไม่ใช่เวลาเริ่มต้น: ผู้ให้บริการเหล่านั้นแสดงรายการโมเดลของตนและแสดงว่าเชื่อมต่อในแดชบอร์ด และมีเพียงคำขอแรกเท่านั้นที่ล้มเหลวด้วย

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

หากคุณใช้ผู้ให้บริการเหล่านั้น ให้ดึงแท็ก `-web` ของช่องที่คุณใช้งาน — อยู่แล้ว ไม่มีอะไรเปลี่ยนแปลงอีก ในการติดตั้ง npm/CLI (ไม่มีอิมเมจ Docker ) ส่วนที่ขาดหายไปเทียบเท่าคือไบนารีของเบราว์เซอร์: รัน `npx playwright install chromium` บนโฮสต์

#### การใช้ช่องทางก่อนเผยแพร่

ช่อง `next` จะถูกสร้างขึ้นใหม่ทุกครั้งที่กดไปที่สาขา `release/v*` เริ่มต้นปัจจุบัน และเผยแพร่สำหรับทั้ง AMD64 และ ARM64 สาขาการบำรุงรักษาที่เก่ากว่าไม่สามารถเขียนทับได้ ช่องทางนี้จัดเตรียมอิมเมจที่ดึงได้สำหรับการแก้ไขที่รวมเข้ากับสาขาการเผยแพร่ที่ใช้งานอยู่ก่อนที่จะตัดแท็กที่เสถียรถัดไป

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

สำหรับ Docker Compose ให้แทนที่แท็กรูปภาพที่ใช้โดยโปรไฟล์ที่เลือก จากนั้นดึงและสร้างบริการใหม่:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ความปลอดภัยและการย้อนกลับ

`next` เป็นช่องก่อนเผยแพร่แบบลอยตัว มันอาจจะเปลี่ยนแปลงเมื่อมีการพุชไปยังสาขาการเผยแพร่ที่ใช้งานอยู่และเป็น** ไม่รองรับการใช้งานจริง** . ปักหมุดการแยกย่อยรูปภาพขณะประเมินบิวด์เฉพาะ:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ก่อนการทดสอบ ให้สำรองข้อมูลวอลุ่มข้อมูล OmniRoute หรือไดเร็กทอรีข้อมูลที่ผูกไว้ หากต้องการย้อนกลับ ให้กู้คืนเวอร์ชันเสถียรที่ใช้ก่อนหน้านี้หรือแยกย่อยและสร้างคอนเทนเนอร์ใหม่:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

build-branch release ไม่สามารถย้าย `latest`; เฉพาะเวอร์ชันความหมายที่เสถียรที่มีสิทธิ์เท่านั้นที่สามารถเลื่อนระดับตัวชี้ที่เสถียรได้ อิมเมจ `next` ยังคงการตรวจสอบอิมเมจที่ปล่อยออกมาและบล็อกเกตช่องโหว่ที่สำคัญ

**`latest` ไม่ใช่การรับประกันสกุลเงินสำหรับ git** การแก้ไขแบบรวมบน `main` หรือสาขา `release/v*` ที่ใช้งานอยู่คือ** ไม่** ใน `:latest` จนกระทั่งมีการเผยแพร่อิมเมจ SemVer ที่เสถียรและงานการเผยแพร่จะเลื่อนระดับ `:latest` (สรุปแบบเดียวกับนั้น SemVer) หาก `latest` ดูหยุดนิ่งในขณะที่ GitHub แสดงการแก้ไขแล้ว ให้ดึง `:next` เพื่อทดสอบ release Branch หรือรอแท็ก SemVer

| คุณต้องการ                                                 | ใช้                               |
| ---------------------------------------------------------- | --------------------------------- |
| GitOps /โปรดักชั่นที่ต้องไม่ดริฟท์                         | ปักหมุด `:X.Y.Z` (หรือสรุปรูปภาพ) |
| ติดตามคอกม้าที่เผยแพร่แล้วและยอมรับการสร้างใหม่ในแต่ละรุ่น | `:latest`                         |
| ทดสอบการคอมมิต `release/v*` ที่ยังไม่เผยแพร่               | `:next` (ไม่ใช่การใช้งานจริง)     |
| ทดสอบ `main`                                               | `:main` (ไม่ใช่การใช้งานจริง)     |

## การอัปเดตแดชบอร์ดใน Docker

คอนเทนเนอร์ที่สร้างจากอิมเมจที่เผยแพร่แล้วไม่สามารถแทนที่ตัวเองได้ เมื่อ OmniRoute ตรวจพบว่ากำลังทำงานอยู่ภายใน
คอนเทนเนอร์ (ไม่มี checkout ของ `.git` และไม่ได้ติดตั้งผ่าน npm) แบนเนอร์อัปเดตบนแดชบอร์ดหน้าหลักจะแสดง
คำสั่งสำหรับเรียกใช้บนโฮสต์แทนคำแนะนำสำหรับ npm/git พร้อมปุ่มคัดลอก:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

ชื่อบริการมาจาก `AUTO_UPDATE_SERVICE` (ค่าเริ่มต้นคือ `omniroute` ซึ่งเป็นบริการใน
`docker-compose.selfhost.yml`) `pull` จะอัปเดตเฉพาะแท็กแบบลอยตัว (`latest`, `next`) หากใช้แท็กแบบตรึง
`:X.Y.Z` ให้แก้ไขแท็กก่อน

### การอัปเดตในคลิกเดียวด้วยไฟล์ทริกเกอร์บนโฮสต์

เพื่อให้ **อัปเดตตอนนี้** ยังทำงานได้โดยไม่ต้องเมานต์ `/var/run/docker.sock` (ซึ่งทำให้คอนเทนเนอร์
มีสิทธิ์ root บนโฮสต์ — ดูคำเตือนเกี่ยวกับโปรไฟล์ `cli` ด้านบน) ให้ตั้งค่า `DOCKER_UPDATE_TRIGGER_FILE` ใน
บริการ OmniRoute และเรียกใช้ตัวเฝ้าดูบนโฮสต์:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

พาธต้องอยู่ภายใน `DATA_DIR` (ค่าพาธสัมพัทธ์จะถูกตีความโดยอ้างอิงจากไดเรกทอรีนี้) ค่าอื่นนอกเหนือจากนี้จะ
ถูกปฏิเสธ จากนั้น **อัปเดตตอนนี้** จะเขียน `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` ลงใน
ไฟล์ดังกล่าว ตอบกลับด้วย `202` และแดชบอร์ดจะสำรวจ `/api/system/version` เป็นระยะจนกว่าเวอร์ชันใหม่จะเริ่มทำงาน
แล้วจึงโหลดใหม่ OmniRoute จะไม่เรียกใช้เชลล์หรือคำสั่ง Docker ในโหมดนี้ เช่นเดียวกับการดำเนินการอัปเดต
ทั้งหมด คำขอจะได้รับการยอมรับจากไคลเอนต์ loopback/LAN เท่านั้น

ไดเรกทอรีข้อมูลที่เมานต์แบบ bind ทำให้โฮสต์มีพาธที่คงที่สำหรับเฝ้าดู ตัวอย่างยูนิต `systemd`
(ปรับ `/srv/omniroute` ให้ตรงกับไดเรกทอรีที่มีไฟล์ compose และ `data/` ของคุณ):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Watch for OmniRoute dashboard update requests

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Pull and recreate the OmniRoute container

[Service]
Type=oneshot
WorkingDirectory=/srv/omniroute
ExecStartPre=/usr/bin/rm -f /srv/omniroute/data/update/docker-update.request
ExecStart=/bin/sh -c 'docker compose pull omniroute || (sleep 15 && docker compose pull omniroute)'
ExecStart=/usr/bin/docker compose up -d --force-recreate omniroute
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now omniroute-update.path
```

บริการจะลบคำขอก่อนทำการ pull เพื่อไม่ให้การทำงานที่ล้มเหลววนซ้ำ หากไม่มี
`DOCKER_UPDATE_TRIGGER_FILE` แดชบอร์ดจะยังคงใช้ขั้นตอนคำสั่งแบบดำเนินการด้วยตนเอง

## ความพร้อมใช้งาน: SQLite เริ่มต้นเป็นแบบจำลองเดี่ยว

หุ้น Docker / Kubernetes OmniRoute คือ** หนึ่งกระบวนการโหนด + ตัวเขียน SQLite หนึ่งตัว** . มีความพร้อมใช้งานสูง** ไม่รองรับ** บนโทโพโลยีนั้น

| ข้อจำกัด                                | ผลที่ตามมา                                                                                                                                                                                                                                                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| นักเขียนคนเดียว                         | ทำ** ไม่** รันหลายเรพลิกากับไฟล์ SQLite เดียวกัน นั่นทำให้ DB เสียหาย                                                                                                                                                                                                                                        |
| สร้างใหม่ / รีสตาร์ท / HEALTHCHECK kill | **ไฟดับเต็ม** ของ SSE บนเครื่องบิน เซสชันแดชบอร์ด และสถานะในหน่วยความจำ ลูกค้าที่เชื่อมต่อทุกรายลดลง คำขอใหม่ระหว่างหน้าต่างจุดสิ้นสุดว่างเปล่าจะได้รับพร็อกซีแบบย้อนกลับ**`502 Bad Gateway: Unknown error`** ไม่ใช่ OmniRoute JSON — ลูกค้าไม่สามารถแยกความแตกต่างนี้จากความล้มเหลวของผู้ให้บริการ (#11015) |
| ลูปเหตุการณ์เดียวกันกับ `/healthz`      | แค็ตตาล็อกที่ไม่ว่างหรือการบีบอัดอาจทำให้โพรบล่าช้าได้ หมดเวลาสั้น ๆ จากนั้นรีสตาร์ท** เท่านั้น** แบบจำลอง                                                                                                                                                                                                   |

**โพรบเมทริกซ์** (ดู [คำแนะนำโพรบ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) เพิ่มเติม):

| โพรบ            | เป้า                                                          | อย่าใช้                                                         |
| --------------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| ความมีชีวิตชีวา | TCP บน `PORT` (ค่าเริ่มต้น `20128`) หรือ soft HTTP `/healthz` | `/api/monitoring/health`                                        |
| ความพร้อม       | HTTP `GET /healthz`                                           | การหมดเวลาที่เข้มงวดซึ่งถือว่าเหตุการณ์ลูปไม่ว่างถือว่าไม่ทำงาน |
| ลึก / มนุษย์    | `/api/monitoring/health`                                      | ความมีชีวิตชีวาของ kubelet อัตโนมัติ                            |

**การอัพเกรด:** คาดว่าทุกเซสชันจะลดลง ระบายลูกค้าถ้าคุณทำได้ ไม่มีการอัปเดตแบบกลิ้งในค่าเริ่มต้น SQLite นอกจากนี้การเขียน `restart: unless-stopped` บวก Docker `HEALTHCHECK` จะแทนที่กระบวนการเดียวเมื่อคอนเทนเนอร์ไม่แข็งแรง — รัศมีการระเบิดเท่ากัน

Manifest สำเร็จรูปและแผนภูมิ Helm อยู่ใน `deploy/kubernetes/` และ `deploy/helm/omniroute/` — ดู [คู่มือการปรับใช้ Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md)

ตัวอย่าง Kubernetes สำหรับ a** แบบจำลองเดียว** (จำเป็นต้องสร้างใหม่ อย่าเพิ่ม `replicas` กับไฟล์ SQLite ไฟล์เดียว):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` sleep ให้ kube วางจุดสิ้นสุดบริการก่อน SIGTERM ดังนั้น** ใหม่** การจราจรหยุดเข้าสู่กระบวนการที่กำลังจะตาย `/v1/responses` SSE ในเที่ยวบินใช้งานจนหมดจนถึง `SHUTDOWN_TIMEOUT_MS` (ค่าเริ่มต้น 30 วินาที) ผ่านสัญญาเช่าแบบเฮฟวี่เวท (#11015) คำขอใหม่ที่ยังคงเข้าถึงกระบวนการได้รับ `503` + `Retry-After: 5` สร้างช่องว่างจุดสิ้นสุดที่ว่างเปล่าใหม่จนกว่าการทดแทนจะพร้อมยังคงเกิดปัญหาขัดข้องอย่างหนัก นั่นคือโทโพโลยี SQLite ไม่ใช่การกำหนดค่าโพรบที่ผิดพลาด

Postgres ภายนอก / HA ตัวเขียนหลายตัวคือ** ไม่** เส้นทางหุ้นที่จัดทำเป็นเอกสาร หากคุณต้องการ HA ให้เก็บเรพลิกาเดียวหรือรันโทโพโลยีที่โปรเจ็กต์ได้ทดสอบและจัดทำเอกสารแยกต่างหาก งาน Postgres/MySQL อยู่ใน [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) จนกว่าจะถึงลำนั้น วิธีเดียวที่จะคูณได้** ใหญ่** ความจุ `/v1/responses` คือกระบวนการอิสระ N กระบวนการ (ส่วนถัดไป) ไม่ใช่ `replicas > 1` ในหนึ่งวอลุ่ม

## การขยายขนาด: ไม่มีกระบวนการที่เป็นอิสระ

### ความเป็นเจ้าของการหมุนเวียนโทเค็น Codex

สำเนาของบัญชี Codex หนึ่งบัญชีจะต้องไม่ใช้โทเค็นการรีเฟรชแบบใช้ครั้งเดียวโดยอิสระ บนอินสแตนซ์ที่ใช้เฉพาะข้อมูลประจำตัวที่ซิงโครไนซ์ ให้ตั้งค่า `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (นามแฝง `cx`) ปล่อยให้ไม่มีการตั้งค่าสำหรับเจ้าของการหมุนเวียนคนเดียว แต่ละกระบวนการยังคงต้องการ `DATA_DIR` ของตัวเอง ตัวเลือกนี้ไม่แชร์ SQLite หรือจัดหาการซิงโครไนซ์โทเค็นหรือการล็อคแบบกระจาย

อินสแตนซ์แบบพาสซีฟจะอ่านการเชื่อมต่ออีกครั้งเมื่อจำเป็นต้องรีเฟรช และใช้เฉพาะโทเค็นการเข้าถึงอื่นที่ยังไม่หมดอายุเท่านั้น มิฉะนั้นการรีเฟรชจะถูกปิดใช้งานโดยไม่หมดอายุหรือปิดใช้งานการเชื่อมต่อ หรือนับความล้มเหลวของตัวรีเฟรชเบรกเกอร์ ความล้มเหลวในการรับรองความถูกต้องอัปสตรีมจริงยังคงใช้การบัญชีความล้มเหลวตามปกติ คูลดาวน์แบบเอ็กซ์โพเนนเชียล และข้อผิดพลาดไคลเอ็นต์ปกติ การปิดใช้งานบัญชียังคงเป็นแบบถาวร ซิงโครไนซ์โทเค็นที่หมุนเวียนของเจ้าของก่อนที่โทเค็นการเข้าถึงจะหมดอายุ (โอกาสในการรีเฟรชเชิงรุกเริ่มต้นคือห้านาที) หรือนำเข้าไฟล์การรับรองความถูกต้อง Codex อีกครั้ง การนำเข้าแบบพาสซีฟจะจัดเก็บโทเค็นที่ให้มาโดยไม่มีการตรวจสอบความถูกต้องที่จุดสิ้นสุดโทเค็น การรีเฟรช dashboard/API ด้วยตนเองส่งคืน `409 refresh_disabled`; การเข้าสู่ระบบ OAuth ใหม่ไม่เปลี่ยนแปลง ดู [การอ้างอิงสภาพแวดล้อม](../reference/ENVIRONMENT.md#passive-codex-token-refresh)

กระบวนการโหนดหนึ่งคือ** ฮีป V8 หนึ่งอัน** . ~ 3 MiB / ~ 750k-token coding-agent `POST /v1/responses` (RTK + Caveman) ที่ทับซ้อนกันสองตัวจะยกเลิกฮีปนั้นที่ ~ 12 Gi (`FATAL ERROR: Reached heap limit`) และสามารถ OOM a 16 Gi cgroup ได้ ดู [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). การวัดนั้นก็คือก** งบประมาณหน่วยความจำ** คำเตือน ไม่ใช่ product hard-max ของ long `/v1/responses` สองตัวพร้อมกัน การรับแชทรุ่นเฮฟวี่เวทถูกควบคุมโดยงบประมาณไบต์นำเข้าที่ได้รับอัตโนมัติ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ที่มีขนาดจากเพดาน V8/cgroup เดียวกันนั้น — แทนที่มันขึ้นไปข้างบน (หรือการตั้งค่าขีดจำกัดจำนวนคำขอ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` แบบเดิม) ในกระบวนการที่มีขนาดอยู่แล้วจะรื้อฟื้นการยกเลิกอีกครั้ง แชทขนาดเล็ก `/healthz`, `/v1/models` และ MCP คือ** ไม่** ในหมวกใบนั้น

### หนึ่งกระบวนการ: `/v1/responses` ยาวมากกว่าสองรายการ

ก** สุขภาพดี** กระบวนการ (ฮีปด้านล่าง `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, ค่าเริ่มต้น `0.75`)** อาจ** เรียกใช้ `POST /v1/responses` แบบยาวพร้อมกันมากกว่าสองตัว เมื่องบประมาณไบต์บนเที่ยวบินทั่วทั้งกระบวนการ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ยังคงมีที่ว่าง เนื้อหาที่หรือสูงกว่า `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ค่าเริ่มต้น 256 KiB) ใช้การเช่ารุ่นเฮฟวี่เวทเดียวกันกับคำขอที่มีโครงสร้างจำนวนมาก และใช้ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` Escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) เดียวกัน ไคลเอ็นต์ SSE แบบยาวพร้อมกันหลายสิบรายการ (ตัวดำเนินการมักต้องการ 40–50) คือ** งบประมาณหน่วยความจำ** คำถาม — ขนาดฮีป + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ไม่ใช่ขีดจำกัดผลิตภัณฑ์ "สูงสุด 2" ที่ยาก ฮีปที่ถูกกดดันยังคงหายไปด้วย `503` ที่ลองใหม่ได้ ดังนั้น #7849 จึงไม่ส่งคืน

ถึง** ทวีคูณฮีป** (พื้นที่เก่า V8 อิสระ)** วันนี้** : :

| ทำ                                                                                                                                       | อย่า                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| วิ่ง** ยัง containers/pods** แต่ละอันมีของมัน** เป็นเจ้าของ** `DATA_DIR` /ปริมาตร                                                        | ตั้งค่า `replicas > 1` กับไฟล์ SQLite หนึ่งไฟล์                   |
| ขนาดใหญ่ในเที่ยวบิน + ที่ดี-headroom จากงบประมาณฮีป / บน-ไบต์; 1–2 เป็นค่าเริ่มต้นแบบอนุรักษ์นิยม #7849 ไม่ใช่ค่าสูงสุดของผลิตภัณฑ์ฮาร์ด | ให้หนึ่งกระบวนการ 8 × RAM และจำนวนสูงสุดที่ไม่จำกัด               |
| ทางเลือก: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` สำหรับ** เคาน์เตอร์โควต้าที่ใช้ร่วมกัน**                                  | ปฏิบัติต่อ Redis เหมือนกับ SQLite ที่ใช้ร่วมกัน — ไม่ใช่          |
| ทำซ้ำความลับของผู้ให้บริการลงในแต่ละอินสแตนซ์ (หรือยอมรับแดชบอร์ดที่แบ่งพาร์ติชัน)                                                       | คาดว่าจะมีหนึ่งแดชบอร์ด / บันทึกการโทรหนึ่งรายการระหว่างอินสแตนซ์ |
| ด้านหน้ามีโหลดบาลานเซอร์ เหนียวด้วยคีย์ API หรือเซสชันก็เพียงพอแล้ว                                                                      | จำเป็นต้องมีมิดเดิลแวร์ที่ทราบขนาดเฉพาะผู้จำหน่าย                 |

ความสัมพันธ์ระหว่างเซสชันต่อบัญชียังสามารถแชร์ผ่าน Redis: ตั้ง `OMNIROUTE_SESSION_AFFINITY_STORE=redis` และ `REDIS_URL` ในแต่ละกระบวนการ โดยมีการตั้ง `REDIS_KEY_PREFIX` เดียวกันและค่าบวก `sessionAffinityTtlMs` พินจะแก้ไขข้อมูลประจำตัวบัญชีการใช้งานที่แฮชให้กับการเชื่อมต่อภายในที่มีสิทธิ์ของแต่ละกระบวนการ ดังนั้นบัญชี OAuth ที่มีข้อมูลเมตาของข้อมูลประจำตัวที่ตรงกันไม่จำเป็นต้องมีการเชื่อมต่อที่ตรงกัน IDs ข้อมูลระบุตัวตนของบัญชีที่ทราบจะมีความสำคัญเหนือกว่า IDs ในพื้นที่ที่ขัดแย้งกันในการแก้ไขพินและการขับไล่ที่มีการป้องกัน บันทึกที่ไม่มีตัวตน (หรือการขับไล่ผู้โทรที่ไม่มีตัวตน) จะรักษา ID guard ดั้งเดิมไว้ บัญชีที่ไม่มีข้อมูลระบุตัวตนการใช้งานที่เสถียรยังคงต้องมีการจับคู่ IDs ข้อผิดพลาด Redis หรือการเรียกที่เกิน 100 ms ถอยกลับไปเป็น SQLite ในเครื่อง ร้านค้าความสัมพันธ์ Redis แต่ละแห่งจะจำกัดการดำเนินการคงค้างไว้ที่ 8 ข้าม Redis ทันทีเมื่อเต็ม และปล่อยช่องเฉพาะเมื่องานพื้นฐานเสร็จสิ้น ไม่ใช่เมื่อถึงกำหนดเวลาของผู้โทร ในระหว่างที่ Redis หยุดทำงาน ไม่มีความจริงร่วมกัน: แต่ละอินสแตนซ์จะถอยกลับไปยังความสัมพันธ์เฉพาะที่ของตัวเอง เซสชันอาจปักหมุดใหม่หนึ่งครั้งต่ออินสแตนซ์ และอินสแตนซ์อาจแยกจากกัน ความเหนียวจะกลับมาบรรจบกันอีกครั้งผ่าน Redis เมื่อมันฟื้นตัว การหมดเวลาเกี่ยวข้องกับการรอ ไม่ใช่การส่ง EVAL ซึ่งอาจเกิดขึ้นหลังจากทางเลือกอื่น การเขียนการกำหนดเส้นทางจะเปรียบเทียบค่าที่แน่นอนที่สังเกตได้จากการตัดสินใจในการกำหนดเส้นทาง ไม่ใช่การอ่านเวลาการเปลี่ยนแปลงครั้งใหม่ การสังเกตที่พลาดหรือการสังเกตทางเลือก SQLite จะถูกเปรียบเทียบว่าเป็นคีย์ Redis ที่ขาดหายไป พินที่ล้าสมัยจะถูกแทนที่ด้วย CAS เดียว ดังนั้นคำสั่งที่ล่าช้าจะไม่สามารถแทนที่หรือลบพินที่ใหม่กว่าและแตกต่างออกไปได้ Redis อ่านค่าส่งคืนแบบอะตอมมิกและเซิร์ฟเวอร์ที่เหลือ TTL; ค่าบวก PTTL (หรือไม่มีการหมดอายุ) จะเป็นตัวกำหนดความมีชีวิตชีวา ไม่ใช่การประทับเวลา JSON ของผู้เขียนหรือนาฬิกาของผู้อ่าน สแน็ปช็อตในเครื่องจะแมปที่เหลือ TTL ถึงกำหนดเวลาท้องถิ่น คีย์ JSON ที่มีอยู่ยังคงสามารถอ่านได้ และไบต์ดิบของคีย์เหล่านั้นจะถูกเก็บไว้สำหรับ CASRedis เป็นแหล่งความจริงเพียงแห่งเดียวในขณะที่มันตอบ การแชร์การอัป การแตะ และการลบที่ได้รับการยืนยันจะเป็นการลบรายการในเครื่อง ไม่ต้องติดตั้งหรือรีเฟรช SQLite บนเส้นทาง Redis เก็บเฉพาะการตัดสินใจทางเลือกของอินสแตนซ์นี้จากข้อผิดพลาด Redis การหมดเวลา หรือความอิ่มตัวของการรับเข้า โดยมีขอบเขต TTL เหมือนเมื่อก่อน พินท้องถิ่นที่ขาดหายไปจากการหยุดทำงานในภายหลังทำให้ต้องเสียค่าเลือกใหม่หนึ่งครั้ง (พลาดแคชพร้อมท์หนึ่งครั้ง) ไม่ใช่บัญชีที่ผิดหรือถูกเพิกถอน การเพิกถอนที่ถูกปฏิเสธจะส่งคืนผู้ชนะที่แชร์และ TTL ที่เหลือแบบอะตอมมิก: การเลือกแบบปกติจะตรวจสอบกำหนดเวลาท้องถิ่นที่แมปไว้อีกครั้ง และใช้ผู้ชนะที่มีสิทธิ์ที่ยังมีชีวิตอยู่ แตะการใช้งานและการบันทึกสำหรับบัญชีนั้นโดยไม่ต้องเขียนที่ใช้ร่วมกันอีกครั้ง หากไม่พร้อมใช้งาน การเลือกจะคงผู้สมัครในพื้นที่ ปล่อยพินที่แชร์ไว้ไม่เปลี่ยนแปลง และส่งข้อความแก้ไขข้อบกพร่องหนึ่งข้อความ CAS ที่ถูกปฏิเสธไม่ได้เขียน SQLite; ข้อผิดพลาด Redis การหมดเวลา หรือความอิ่มตัวของการรับเข้าจะใช้การดำเนินการในเครื่องที่มีอยู่แทน หากการตอบกลับของการเปลี่ยนแปลงที่ส่งมาถึงหลังจากการหมดเวลา (ยอมรับ ปฏิเสธ หรือเกิดข้อผิดพลาด) การเปรียบเทียบและลบค่าซีเรียลไลซ์ที่แน่นอนแบบซิงโครนัสจะลบเฉพาะแถวทางเลือกของการหมดเวลาการหมดเวลาที่เหมือนกันของไบต์เท่านั้น ไม่มีการรอระหว่างการเปรียบเทียบและการลบ การเขียนการหยุดทำงานที่ใหม่กว่าจะยังคงอยู่ การไล่ออกที่มีการป้องกันจะลบ PIN ในเครื่องของบัญชีที่ล้มเหลวแม้ว่าจะปิด Redis แล้วก็ตาม และจะล้างอีกครั้งหลังจากยืนยันการไล่ออกที่แชร์แล้ว การตอบกลับที่แชร์ไว้ก่อนหน้านี้ไม่สามารถกู้คืน PIN ในเครื่องที่ถูกไล่ออกได้ เนื่องจากความสำเร็จที่แชร์ไม่เคยเขียน SQLite ทางเลือกสำรองของการหยุดทำงานในภายหลังสามารถ repin บัญชีได้ การเขียนที่ใช้ร่วมกันที่ยอมรับในภายหลังมีอยู่ใน Redis เท่านั้น Redis misses ไม่ปรึกษาสถานะทางเลือกในเครื่อง เมื่อปิดไดรเวอร์ พินที่เลือกใหม่จะยังคงรูปทรง SQLite JSON แบบสี่ฟิลด์แบบเดิมไว้ เฉพาะการกำหนดเส้นทาง Redis เท่านั้นที่เพิ่มข้อมูลระบุตัวตนของบัญชีที่แฮช พินที่ดึงมาล่วงหน้าจะถูกตรวจสอบอีกครั้งที่ขอบเขตการหมดอายุ การเลือกการไม่เช่า Redis จะอ่านร้านค้าซ้ำ แต่การวางแผนการเช่าแบบซิงโครนัสยังคงสามารถใช้พินที่ถูกขับออกระหว่างการดึงข้อมูลล่วงหน้าและการวางแผน (หน้าต่างความพยายามที่ดีที่สุดที่ยอมรับได้) ข้อตกลงการเช่าไม่สามารถสลับบัญชีได้หลังจากการอ้างสิทธิ์แบบถาวร: เมื่อถูกปฏิเสธ การเพิกถอนจะเก็บผู้สมัครที่อ้างสิทธิ์สำหรับคำขอนั้นเท่านั้น และทำให้ผู้ชนะที่ใช้ร่วมกันไม่ถูกแตะต้อง ดังนั้นข้อตกลงข้ามอินสแตนซ์จึงถูกผูกไว้บนเส้นทางนั้น ตารางที่เหลือยังคงมีผลอยู่: สิ่งนี้ไม่แชร์ความเหนียวของเซสชันคอมโบ, การหมุน Codex แบบเนทีฟ, เซมาฟอร์ของบัญชี, การล็อกเอาต์, ขีดจำกัดการใช้จ่าย, การกำหนดค่า หรือบันทึกการโทร

ฮาร์ดแวร์: `/v1/responses` ยาวพร้อมกันต่ออินสแตนซ์คือ a** งบประมาณหน่วยความจำ** คำถาม (ฮีป + บนเที่ยวบิน-ไบต์ / #10110) `N` อิสระ `DATA_DIR` ยังคงทวีคูณฮีป: โฮสต์ RAM ต้องครอบคลุม `N × cgroup` ไม่ใช่ "หนึ่ง 16 Gi pod ที่มี N = 8" ไม่เคย `replicas > 1` ในไฟล์ SQLite ไฟล์เดียว

เขียนภาพร่าง (สองฮีป สองเล่ม — ไม่ใช่ `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

ความหนาแน่นในกระบวนการ (การบีบอัดออกจาก HTTP isolate) คือ [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) คลัสเตอร์โลจิคัลหนึ่งคลัสเตอร์ในสถานะคงทนที่ใช้ร่วมกันคือ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)

## ข้อผิดพลาดด้านภูมิภาคของ Gemini ภายใน Docker

Google AI Studio / Gemini API อาจส่งคืน HTTP 400 พร้อม FAILED_PRECONDITION และ
`User location is not supported for the API use.` การส่งคำขอจากโฮสต์ได้สำเร็จ
ไม่ได้ยืนยันว่าคอนเทนเนอร์ใช้เส้นทางขาออกเดียวกัน ลำดับ DNS,
การเชื่อมต่อ IPv4/IPv6, การกำหนดเส้นทาง VPN และพร็อกซีที่กำหนดไว้อาจแตกต่างกัน โปรดตรวจสอบ
[ภูมิภาคที่ Google รองรับ](https://ai.google.dev/gemini-api/docs/available-regions)
รวมถึงเส้นทางการเชื่อมต่อจริง ข้อผิดพลาดนี้เพียงอย่างเดียวไม่ได้บ่งชี้ว่า API key ไม่ถูกต้อง

### ควรใช้พร็อกซีเฉพาะการเชื่อมต่อ

ใช้ [การกำหนดค่าพร็อกซีแยกตามการเชื่อมต่อ](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ของ OmniRoute สำหรับการเชื่อมต่อ Gemini ที่ได้รับผลกระทบ จากนั้นทำ **Test Connection** ซ้ำ
และส่งคำขอขนาดเล็กโดยใช้โมเดลเดียวกัน วิธีนี้จำกัดการเปลี่ยนแปลงการกำหนดเส้นทางไว้เฉพาะการเชื่อมต่อนั้น
ตรวจสอบว่าคอนเทนเนอร์สามารถเข้าถึงพร็อกซีได้ และการเชื่อมต่อเลือกใช้พร็อกซีนั้นจริง
การเปลี่ยนเส้นทางไม่ได้รับประกันว่าจะผ่านเงื่อนไขด้านภูมิภาคของผู้ให้บริการต้นทาง

### เปรียบเทียบระบบเครือข่ายของโฮสต์และคอนเทนเนอร์

ใช้ key, โมเดล และคำขอเดียวกันเมื่อเปรียบเทียบผลลัพธ์ที่ผ่านการยืนยันตัวตน และอย่า
วางข้อมูลรับรอง รหัสผ่านพร็อกซี หรือ authorization header แบบเต็มลงใน issue
ขั้นแรก ให้ตรวจสอบว่า resolver ของระบบปฏิบัติการเสนอ address family ใดบ้าง โดยใช้คำสั่งเดียวกัน
บนโฮสต์และภายในคอนเทนเนอร์:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

แทนที่ `omniroute` ด้วยบริการที่คุณใช้งาน (เช่น `omniroute-web`) คำสั่งเหล่านี้
จะแสดง address family โดยไม่เปิดเผยข้อมูลรับรองหรือที่อยู่ IP ค่า `6` ที่ส่งคืนมา
แสดงเพียงว่ามีผลลัพธ์ DNS แบบ IPv6 เท่านั้น แต่ **ไม่ได้** ยืนยันว่ามีเส้นทาง IPv6 ที่ใช้งานได้หรือเข้าถึง API ได้
ในกรณีที่ติดตั้ง `curl` ไว้ ให้เปรียบเทียบ `curl -4 -I https://generativelanguage.googleapis.com`
กับ `curl -6 -I https://generativelanguage.googleapis.com` ในทั้งสองสภาพแวดล้อม
การได้รับการตอบกลับ HTTP ยืนยันการเชื่อมต่อสำหรับการทดสอบนั้น แม้ว่าจะเป็นข้อผิดพลาด
จากการไม่ได้ยืนยันตัวตนก็ตาม มีเพียงคำขอไปยังโมเดลที่ผ่านการยืนยันตัวตนเท่านั้นที่ใช้ทดสอบสิทธิ์การใช้งาน Gemini ได้

### ทางเลือกระดับโฮสต์: IPv6 ที่ใช้งานได้และนโยบาย resolver

ผู้รายงาน [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) สามารถกู้คืน
การเข้าถึงในสภาพแวดล้อมของตนได้ด้วยการเปิดใช้งาน IPv6 ของคอนเทนเนอร์และเปลี่ยนการเลือกที่อยู่
ของ glibc โปรดถือว่านี่เป็นทางเลือกเฉพาะสภาพแวดล้อม ตรวจสอบว่า IPv6 ของโฮสต์ใช้งานได้
รวมถึง egress/การกำหนดเส้นทางของคอนเทนเนอร์และกฎไฟร์วอลล์ ก่อนปรับการตั้งค่าของ resolver
การมีที่อยู่ ULA แบบส่วนตัวเพียงอย่างเดียวไม่ได้ยืนยันว่ามีการเชื่อมต่อ IPv6 สาธารณะ

สำหรับบริการที่เชื่อมต่อกับเครือข่ายเริ่มต้นของ Compose อยู่แล้ว ส่วนย่อยนี้จะเปิดใช้งาน
IPv6 บนเครือข่ายดังกล่าว โดยให้คงการตั้งค่าที่เหลือของบริการ พอร์ต volume และการกำหนดค่าไว้:

```yaml
networks:
  default:
    enable_ipv6: true
```

สำหรับเครือข่ายที่มีชื่อ ให้เปิดใช้งานบนเครือข่ายที่บริการเชื่อมต่ออยู่จริง Docker สามารถ
จัดสรร subnet แบบ ULA ได้ โปรดเลือก subnet ที่ระบุอย่างชัดเจนและไม่ทับซ้อนกันเฉพาะเมื่อเครือข่าย
ของคุณต้องใช้เท่านั้น ดู [ระบบเครือข่าย IPv6 ของ Docker](https://docs.docker.com/engine/daemon/ipv6/)
และ [ตัวเลือกเครือข่ายของ Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)

บน **อิมเมจที่ใช้ glibc** ไฟล์ `/etc/gai.conf` สามารถเปลี่ยนการเลือกที่อยู่ได้ Dockerfile
ของ repository ปัจจุบันใช้ Debian ส่วนอิมเมจแบบกำหนดเองที่ใช้ musl ไม่รองรับกลไกเดียวกันนี้
การปรับเปลี่ยนที่มีการรายงานจะเปลี่ยน label ของ ULA จาก `label fc00::/7 6` เป็น
`label fc00::/7 1` ให้เริ่มจากตารางนโยบายฉบับเต็มของอิมเมจและคงรายการอื่นไว้:
การเพิ่มรายการ `label` หรือ `precedence` จะแทนที่ตารางเริ่มต้นนั้น ดังนั้นไฟล์ที่มี
เฉพาะบรรทัดที่เปลี่ยนแปลงจึงไม่เพียงพอ
[เอกสารอ้างอิงการกำหนดค่า glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
อธิบายลักษณะการทำงานดังกล่าว ให้ bind-mount ไฟล์ที่ตรวจสอบแล้วแบบอ่านอย่างเดียวไว้ที่ `/etc/gai.conf`
และสร้างบริการขึ้นใหม่เพื่อใช้การเปลี่ยนแปลง

การดำเนินการนี้จะเปลี่ยนการเลือกที่อยู่ของระบบปฏิบัติการสำหรับ **ทราฟฟิกขาออกทั้งหมดในคอนเทนเนอร์นั้น**
แต่ไม่ได้บังคับให้ทุกแอปพลิเคชันเลือก IPv6 เนื่องจากลำดับ DNS และการเลือกการเชื่อมต่อ
ของ Node ก็มีผลเช่นกัน โดยเฉพาะอย่างยิ่ง `--dns-result-order=ipv4first` จะให้ความสำคัญกับ IPv4
และไม่ใช่วิธีแก้ไขสำหรับความล้มเหลวที่เกิดขึ้นเฉพาะกับ IPv4 ดู [การจัดลำดับ DNS ของ Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)

ทดสอบ Gemini และผู้ให้บริการรายอื่นของคุณอีกครั้งหลังจากมีการเปลี่ยนแปลงระดับโฮสต์
หากต้องการย้อนกลับ ให้ถอด mount ของ `gai.conf` แบบกำหนดเอง คืนค่าการกำหนดค่าเครือข่ายเดิม
และสร้างบริการ/เครือข่ายที่ได้รับผลกระทบขึ้นใหม่ในช่วงเวลาบำรุงรักษา การสร้างเครือข่ายใหม่
อาจรบกวนคอนเทนเนอร์อื่นที่เชื่อมต่ออยู่ อย่าลบ volume ข้อมูลถาวร

## หมายเหตุสำคัญ

- **โหมด SQLite WAL:** ควรปล่อยให้ `docker stop` ทำงานจนเสร็จ เพื่อให้ OmniRoute สามารถทำ checkpoint การเปลี่ยนแปลงล่าสุดกลับไปยัง `storage.sqlite` ได้ ไฟล์ Compose ที่ให้มามีการตั้งค่าระยะเวลาผ่อนผันก่อนหยุดไว้ที่ 40 วินาทีแล้ว หากคุณรันอิมเมจโดยตรง ให้คงค่า `--stop-timeout 40` ไว้
- **`DISABLE_SQLITE_AUTO_BACKUP`:** ตั้งค่าเป็น `true` หากมีการจัดการการสำรองข้อมูลตามรอบ/ก่อนเขียนโดยระบบภายนอกอยู่แล้ว การย้ายฐานข้อมูลที่มีอยู่ยังคงต้องมี snapshot เพื่อความปลอดภัยที่คงทนของตนเอง และกลไกป้องกันการย้ายข้อมูลจำนวนมาก
- **การคงอยู่ของข้อมูล:** เมานต์ volume ไปยัง `/app/data` เสมอ เพื่อให้ฐานข้อมูล คีย์ และการกำหนดค่าของคุณยังคงอยู่เมื่อรีสตาร์ตคอนเทนเนอร์
- **การกำหนดค่าพอร์ต:** เขียนทับตัวแปรสภาพแวดล้อม `PORT` เพื่อเปลี่ยนพอร์ตเริ่มต้น `20128`

## ดูเพิ่มเติม

- [คู่มือการปรับใช้บน VM](../ops/VM_DEPLOYMENT_GUIDE.md) — การตั้งค่า VM + nginx + Cloudflare
- [คู่มือการปรับใช้บน Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — ปรับใช้บน Fly.io
- [การกำหนดค่าสภาพแวดล้อม](../reference/ENVIRONMENT.md) — เอกสารอ้างอิง `.env` ฉบับสมบูรณ์
