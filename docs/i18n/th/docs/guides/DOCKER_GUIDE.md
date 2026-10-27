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

## เรียกใช้งานอย่างรวดเร็ว

> **โฮสต์ด้วยตนเองด้วยคำสั่งเดียวใช่ไหม?** โปรดดู
> [คู่มือการโฮสต์ด้วยตนเอง](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (อิมเมจที่เผยแพร่แล้ว +
> Redis, รับการเชื่อมต่อผ่าน loopback เท่านั้น, ไม่ต้องเลือกโปรไฟล์) ส่วนการเรียกใช้งานอย่างรวดเร็วด้านล่างนี้เป็น
> แนวทางแบบคอนเทนเนอร์เดียวสำหรับผู้ใช้ที่เรียกใช้ Redis ที่อื่นอยู่แล้ว

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ใช้งานร่วมกับไฟล์สภาพแวดล้อม

```bash
# คัดลอกและแก้ไข .env ก่อน
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
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

## สเตจของ Dockerfile

รีโพซิทอรีนี้มาพร้อม Dockerfile แบบหลายสเตจ (`Dockerfile`) โดยมีสี่สเตจให้เลือกใช้ โปรดเลือก `target` ที่เหมาะกับกรณีใช้งานของคุณ

| สเตจ          | อิมเมจพื้นฐาน         | วัตถุประสงค์                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ติดตั้งแพ็กเกจที่ต้องใช้ (`npm ci --legacy-peer-deps`) และเรียกใช้ `npm run build` (ค่าเริ่มต้นใช้ Turbopack — ดูหัวข้อทรัพยากรขณะบิลด์ด้านล่าง)                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | รันไทม์สำหรับโปรดักชันพร้อมเอาต์พุตแบบ standalone ของ Next.js **ไม่มี CLI ของผู้ให้บริการรวมอยู่ด้วย**                                                                                                                                                                                      |
| `runner-cli`  | `runner-base`         | เพิ่ม `git`, `docker.io`, `docker-compose` และ CLI แบบ global ได้แก่ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw` **เลือกสเตจนี้สำหรับเวิร์กโฟลว์แบบเอเจนต์**                                                                                                          |
| `runner-web`  | `runner-base`         | เพิ่ม Playwright + เบราว์เซอร์ Chromium (`--with-deps`) สำหรับผู้ให้บริการเซสชันเว็บ ได้แก่ `gemini-web`, `claude-web`, `claude-turnstile` **เลือกสเตจนี้เมื่อคุณใช้ผู้ให้บริการเหล่านั้น** — อิมเมจธรรมดาจะล้มเหลวเมื่อมีคำขอหากไม่มีส่วนนี้ (ดูหมายเหตุ `-web` ในหัวข้อช่องทางการเผยแพร่) |

บิลด์ target ที่ระบุด้วยตนเอง:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ทรัพยากรขณะบิลด์

อาร์กิวเมนต์สำหรับการบิลด์สามรายการควบคุมต้นทุนทรัพยากรของสเตจ `builder` โดยมีผลเฉพาะขณะบิลด์เท่านั้น —
`OMNIROUTE_MEMORY_MB` (ด้านล่าง) เป็นตัวปรับแยกต่างหากสำหรับรันไทม์

| อาร์กิวเมนต์สำหรับการบิลด์  | ค่าเริ่มต้น | ผล                                                                                       |
| --------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` บิลด์ด้วย webpack: ใช้หน่วยความจำสูงสุดน้อยกว่า แต่ช้ากว่า `1` เลือกใช้ Turbopack    |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | ขีดจำกัดฮีปของ V8 (`--max-old-space-size`) สำหรับ `next build` ที่ถูกสร้างเป็นโปรเซสใหม่ |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | ป้อนค่าให้ `CIRCLE_NODE_TOTAL`; Next คำนวณ `workers = N - 1` สำหรับการรวบรวมข้อมูลหน้า   |

`OMNIROUTE_BUILD_WORKERS` คือตัวที่ควรเพิ่มเมื่อใช้เครื่องบิลด์ขนาดใหญ่ และเป็นตัวที่ควร
สงสัยเมื่อการบิลด์บนระบบที่มีทรัพยากรจำกัดล้มเหลว **หลังจาก** `✓ Compiled successfully` แล้ว worker
สำหรับข้อมูลหน้าแต่ละตัวเป็นโปรเซสแยกกัน และ `next build` ตัวแม่เองก็เช่นกัน
การจำลองปัญหาบน VPS จริง (issue #7518) วัดค่า RSS สูงสุดของแต่ละโปรเซสได้ที่
~4.5 GB โดยไม่ขึ้นกับแฟล็กฮีป `NODE_OPTIONS` (Turbopack คอมไพล์โดยใช้
หน่วยความจำ native/Rust ที่อยู่นอกฮีป V8) ค่าเริ่มต้น `2` (→ 1 worker รวมทั้งหมด 2
โปรเซส) ถูกกำหนดให้เหมาะกับ runner ที่โฮสต์โดย GitHub ซึ่งมีหน่วยความจำ 16 GB / 4 vCPU และใช้โดย
ไปป์ไลน์การเผยแพร่ เมื่อกำหนดเป็น `8` (→ 7 workers) runner ดังกล่าวมีหน่วยความจำไม่เพียงพอ และ
buildkit ทำขั้นตอนนั้นล้มเหลวด้วย `ResourceExhausted: ... cannot allocate memory`;
แม้แต่ `3` (→ 2 workers) ก็ยังไม่พอดี เมื่อวัด RSS ต่อโปรเซสโดยตรง
แทนการอนุมาน `tests/unit/docker-build-memory-budget.test.ts`
จะคำนวณเทียบกับค่าที่วัดได้ และล้มเหลวหากตัวปรับใดตัวปรับหนึ่ง
มีขนาดเกินความสามารถของ runner

Turbopack คอมไพล์โดยใช้หน่วยความจำ native ของ Rust ที่อยู่ **นอก** ฮีป V8 ดังนั้น
`OMNIROUTE_BUILD_MEMORY_MB` จึงไม่สามารถจำกัดหน่วยความจำส่วนนี้ได้ บนโฮสต์ที่มีขีดจำกัดหน่วยความจำ
การบิลด์จะถูก OOM killer ส่ง SIGKILL โดยไม่มีข้อความแสดงข้อผิดพลาดเลย — กระบวนการจะ
หยุดกลาง `Creating an optimized production build` ไปเฉย ๆ ซึ่งดูคล้ายกับค้าง
มากกว่าหน่วยความจำไม่เพียงพอ ด้วยเหตุนี้ `Dockerfile` จึงใช้ webpack เป็นค่าเริ่มต้น
(`OMNIROUTE_USE_TURBOPACK=0`) ซึ่งต่างจาก `npm run dev` / `npm run build` ที่
โค้ดใช้ Turbopack เป็นค่าเริ่มต้น: การเรียก `docker build .` โดยไม่ส่งอาร์กิวเมนต์สำหรับการบิลด์ (ซึ่งเป็นสิ่งที่
Railway และโฮสต์แบบคลิกเดียวอื่น ๆ เรียกใช้) ต้องไม่ล้มเหลวอย่างเงียบ ๆ บนเครื่องบิลด์
ที่จำกัดหน่วยความจำ อิมเมจที่เผยแพร่แล้วส่ง `OMNIROUTE_USE_TURBOPACK=0`
อย่างชัดเจนใน `docker-publish.yml` อยู่แล้ว บนเครื่องบิลด์ที่มี RAM มากเพียงพอ ให้เลือกใช้
Turbopack เพื่อให้บิลด์ได้เร็วขึ้น:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

มีการเปิดใช้ `webpackBuildWorker` ดังนั้น `next build` จึงเรียกทั้งโปรเซสตัวแม่ **และ** โปรเซส worker
โดยแต่ละโปรเซสจะใช้ `OMNIROUTE_BUILD_MEMORY_MB` แยกกัน กำหนดขีดจำกัดของคอนเทนเนอร์
ให้สูงกว่าค่านี้ประมาณสองเท่า ไม่ใช่หนึ่งเท่า

ค่าที่วัดได้จากโค้ดชุดนี้ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | ขีดจำกัดของคอนเทนเนอร์ | ผลลัพธ์                                      |
| --------- | ---------------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB         | ถูก OOM-killed ทั้งสองค่าโดยไม่มีข้อความใด ๆ |
| webpack   | 8 GiB                  | worker สำหรับการบิลด์ถูก SIGKILL             |
| webpack   | 12 GiB                 | สำเร็จ โดยมีการใช้งานสูงสุดที่ 11.1 GiB      |

### ค่าเริ่มต้นขณะรันไทม์

ค่าเริ่มต้นที่ส่งออกโดย `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

ลักษณะการทำงานของหน่วยความจำใน Docker:

- อิมเมจกำหนด `OMNIROUTE_MEMORY_MB=1024` และสร้างค่า `NODE_OPTIONS=--max-old-space-size=1024` จากตัวแปรนี้
- โปรเซสเซิร์ฟเวอร์จริงเริ่มทำงานโดย standalone launcher ซึ่งอ่าน `OMNIROUTE_MEMORY_MB` และเพิ่ม `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`
- Node ใช้ค่า `--max-old-space-size` ค่าสุดท้ายเมื่อระบุซ้ำ ดังนั้นการกำหนด `OMNIROUTE_MEMORY_MB` จึงควบคุมขีดจำกัด heap ที่มีผลจริงใน Docker
- เนื่องจากอิมเมจกำหนดค่านี้ไว้เสมอ fallback ของ launcher ที่ปรับเทียบตาม RAM จึงไม่ถูกนำมาใช้ภายใต้ Docker ให้เพิ่มค่านี้อย่างชัดเจนตามเวิร์กโหลด (ตารางด้านล่าง) ค่า `2048` ยังน้อยเกินไปสำหรับ `/v1/responses` ของ coding agent

### RAM ขณะรันไทม์สำหรับ coding agent

ค่าเริ่มต้น Docker ที่ 1 GiB เป็นเพียงค่าขั้นต่ำสำหรับแดชบอร์ด/แชตเบา ๆ ไม่ใช่ขนาดสำหรับการใช้งานจริงในระบบ production เนื้อหา `POST /v1/responses` ขนาดยาว (หลายร้อยข้อความ เครื่องมือหลายสิบรายการ) จะเก็บกราฟในหน่วยความจำหลายชุดไว้ระหว่างการบีบอัด คำขอที่ซ้อนทับกันสองรายการ ขนาดประมาณ ~3 MiB / ~750k-token ต่อรายการ ทำให้ V8 หยุดทำงานเมื่อ old-space อยู่ที่ **12 GiB** (`FATAL ERROR: Reached heap limit`) และยังทำให้เกิด cgroup OOM ที่ 16 GiB ด้วย ดู [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)

กำหนดขนาด **cgroup `--memory` ให้สูงกว่า heap** — native buffer, SQLite และข้อมูลชั่วคราวระหว่างการบีบอัดอยู่นอก V8

| เวิร์กโหลด                                | `OMNIROUTE_MEMORY_MB`         | คอนเทนเนอร์ / cgroup              | หมายเหตุ                                                                                                                    |
| ----------------------------------------- | ----------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| แดชบอร์ด, แชตเบา ๆ หนึ่งรายการ            | `1024` (ค่าเริ่มต้นของอิมเมจ) | ≥2 GiB                            |                                                                                                                             |
| coding agent หนึ่งตัว (Claude/Codex/Grok) | `8192`                        | ≥10 GiB                           | `/v1/responses` แบบเซสชันเดียวโดยทั่วไป                                                                                     |
| `/v1/responses` แบบยาวสองรายการพร้อมกัน   | `10240`–`12288`               | ≥12–16 GiB                        | ตรวจพบว่า V8 หยุดทำงานเมื่อ heap อยู่ที่ประมาณ ~12 GiB                                                                      |
| บริบทยาวตั้งแต่สามรายการขึ้นไปพร้อมกัน    | อย่ารันในโปรเซสเดียว          | เรียงลำดับการประมวลผล / เพิ่ม RAM | ค่าเริ่มต้นของการควบคุมงานหนักอนุญาตให้ทำงานพร้อมกัน 1 รายการ การเพิ่มค่านี้โดยไม่เพิ่ม RAM จะทำให้เกิดการหยุดทำงานอีกครั้ง |

เมื่อไม่ได้กำหนด `OMNIROUTE_MEMORY_MB` การใช้ `omniroute serve` บน bare metal จะปรับเทียบเป็นประมาณ 35% ของ RAM (โดยจำกัดไว้ที่ `[512, 4096]`) แต่ Docker กำหนดค่าเป็น `1024` เสมอ ดังนั้นการปรับเทียบนี้จึงไม่ทำงานในอิมเมจอย่างเป็นทางการ

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Reverse Proxy บนพาธย่อย (Traefik / nginx)

`basePath` ของ Next.js ถูกคอมไพล์รวมไว้ในบันเดิล standalone โดย OmniRoute จะบันทึกค่าที่ฝังไว้
ลงในไฟล์ sentinel ที่รากของแอป (เขียนระหว่าง `npm run build` และอ่านโดย
`scripts/docker/ensure-docker-base-path.mjs`) แล้วเปรียบเทียบกับ
`OMNIROUTE_BASE_PATH` เมื่อคอนเทนเนอร์เริ่มทำงาน หากค่าแตกต่างกันและอิมเมจถูก
บิลด์มาสำหรับรากของโดเมน entrypoint จะเขียน manifests ของ standalone ใหม่ รวมถึง
ลิเทอรัล `basePath`/`assetPrefix` ที่ฝังไว้ (Next 16 เรนเดอร์ URL ของแอสเซต SSR จาก
`assetPrefix` เพียงอย่างเดียว — patcher จึงคัดลอกพาธย่อยไปยังค่านี้ด้วย), URL แอสเซต
`/_next/static` ที่ฝังไว้ (client-reference manifests, การนำเข้าสื่อ, หน้าแสดงข้อผิดพลาด
ที่ prerender ไว้) และ shim `process.env` ฝั่งไคลเอนต์ ก่อนที่ `node dev/run-standalone.mjs`
จะทำงาน

### การบิลด์ด้วย Compose (แนะนำ)

ตั้งค่าตัวแปรทั้งสองใน `.env` จากนั้นบิลด์ใหม่เพื่อให้อิมเมจและรันไทม์ใช้ค่าตรงกัน:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ส่งต่อ `OMNIROUTE_BASE_PATH` ทั้งในรูปแบบ Docker build-arg และ
ตัวแปรสภาพแวดล้อมขณะรันไทม์

### อิมเมจรากที่บิลด์ไว้ล่วงหน้า + พาธย่อยขณะรันไทม์

อิมเมจ `diegosouzapw/omniroute:*` ที่เผยแพร่ถูกบิลด์มาสำหรับรากของโดเมน แต่คุณยังคง
ตั้งค่า `OMNIROUTE_BASE_PATH` ขณะรันไทม์ได้ โดยคอนเทนเนอร์จะแพตช์บันเดิลหนึ่งครั้งเมื่อเริ่มทำงาน
ให้ใช้ร่วมกับ public origin ที่ตรงกัน:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

กำหนดค่า reverse proxy ให้ส่งต่อพาธภายนอกแบบ **เต็มพาธ** (อย่าตัด
prefix ออก) Traefik ควรกำหนดเส้นทาง `PathPrefix(`/omniroute`)` ไปยังคอนเทนเนอร์โดยไม่ใช้
`StripPrefix` เพื่อให้ Next.js ได้รับ `/omniroute/...` และให้บริการแอสเซตจาก
`/omniroute/_next/...`

Docker healthcheck จะตรวจสอบ endpoint สำหรับวงจรชีวิตแบบเบา `/healthz` ซึ่งมี
`OMNIROUTE_BASE_PATH` ที่ใช้งานอยู่เป็น prefix ส่วน `/api/monitoring/health` ยังคงพร้อมใช้งานสำหรับ
การวินิจฉัยโดยผู้ใช้หรือแดชบอร์ด หากต้องการให้ HEALTHCHECK ของคอนเทนเนอร์กลับไปตรวจสอบ endpoint นี้
(ตัวอย่างเช่น เพื่อบังคับใช้การตรวจสอบสุขภาพเชิงลึก) ให้ตั้งค่า `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`
พาธดังกล่าวเป็นการตรวจสอบแบบ **เชิงลึก** (ฐานข้อมูล + สรุปการมอนิเตอร์) — เหมาะสำหรับ
`HEALTHCHECK` ของ Docker ที่ทำงานไม่บ่อย หากคุณเลือกกลับมาใช้ แต่ **ไม่** เหมาะสำหรับช่วงเวลา
ของ `livenessProbe` ใน Kubernetes

สำหรับ orchestrator (Kubernetes, Nomad ฯลฯ):

| Probe           | ควรใช้                                                               | หลีกเลี่ยง                                                   |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ |
| Liveness        | HTTP `GET /livez` หรือ TCP บนพอร์ตหลัก (`PORT`, ค่าเริ่มต้น `20128`) | ใช้ `/api/monitoring/health` เป็น liveness                   |
| Readiness       | HTTP `GET /healthz`                                                  | timeout ที่สั้นจนมองว่า event loop ที่กำลังยุ่งนั้นหยุดทำงาน |
| Deep / blackbox | `/api/monitoring/health`                                             | —                                                            |

`/healthz` รายงานวงจรชีวิตของโปรเซส (`ok` / `starting` / `stopping`) ส่วน `/livez`
ตรวจสอบเพียงว่าโปรเซสยังทำงานอยู่ (ส่งคืน 200 เมื่อใดก็ตามที่ handler สามารถทำงานได้ โดยไม่รอ
readiness) ทั้งสองยังคงทำงานบน event loop ของ Node เดียวกับการจัดการคำขอ ดังนั้น
งาน catalog หรือการบีบอัดที่ใช้ CPU สูงอาจทำให้การตอบสนองล่าช้าได้ — ยุ่ง ≠ หยุดทำงาน ควรใช้ TCP
สำหรับ liveness หาก HTTP probe หมดเวลา ดูคำแนะนำฉบับเต็มเกี่ยวกับ probe:
[คู่มือการมอนิเตอร์ — คำแนะนำสำหรับ probe ของ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose พร้อม Caddy (HTTPS Auto-TLS)

สามารถเปิดให้เข้าถึง OmniRoute ได้อย่างปลอดภัยโดยใช้การจัดเตรียม SSL อัตโนมัติของ Caddy โปรดตรวจสอบว่า DNS A record ของโดเมนชี้ไปยัง IP ของเซิร์ฟเวอร์ของคุณ

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origin ที่เบราว์เซอร์เข้าถึงสำหรับ OAuth callback, ลิงก์แดชบอร์ด และ URL สาธารณะที่สร้างขึ้น
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL ภายในระหว่างเซิร์ฟเวอร์สำหรับงานตามกำหนดเวลา / การเรียกข้อมูลกลับมายังตัวเอง
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

Caddy จะตั้งค่า forwarding header มาตรฐานสำหรับคอนเทนเนอร์ upstream OmniRoute ใช้
`NEXT_PUBLIC_BASE_URL` เป็น origin สาธารณะหลักสำหรับ OAuth callback และลิงก์สาธารณะที่สร้างขึ้น
ส่วนการเขียนข้อมูลในแดชบอร์ดที่ผ่านการยืนยันตัวตนจะใช้คำขอแบบ same-origin พร้อมการป้องกัน CSRF
ที่ผูกกับเซสชัน เปิดใช้ `OMNIROUTE_TRUST_PROXY` เฉพาะสำหรับการติดตั้งใช้งานขั้นสูงที่คุณตั้งใจ
ให้ OmniRoute ระบุ origin สาธารณะจาก forwarded header ที่เชื่อถือได้แทนการกำหนดค่าโดยตรงเท่านั้น

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

## แท็กอิมเมจ

| อิมเมจ                   | แท็ก     | ขนาด   | คำอธิบาย                                                                 |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer เสถียรที่ **เผยแพร่แล้ว** และมีเวอร์ชันสูงสุด (ไม่ใช่ git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ปักหมุดแท็กประเภทนี้สำหรับ GitOps                                        |

manifest แบบหลายแพลตฟอร์ม: `linux/amd64` + `linux/arm64` แบบเนทีฟ (Apple Silicon, AWS Graviton, Raspberry Pi) Docker จะเลือกสถาปัตยกรรมที่ตรงกันโดยอัตโนมัติ ให้ส่ง `--platform linux/amd64` หากคุณจำเป็นต้องบังคับใช้การจำลอง AMD64 บนโฮสต์ ARM

### ช่องทางการเผยแพร่

OmniRoute เผยแพร่ช่องทาง Docker แยกกันสำหรับรุ่นเสถียร การทดสอบ release branch ที่ใช้งานอยู่ และรุ่นสำหรับการพัฒนา

| ช่องทาง                         | แหล่งที่มา                                           | ความสามารถในการเปลี่ยนแปลง             | การใช้งานที่แนะนำ                                                                                                    |
| ------------------------------- | ---------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | รุ่นที่ลงนาม/กำหนดเวอร์ชันแล้ว                       | เปลี่ยนแปลงไม่ได้                      | การติดตั้งใช้งานจริงที่ปักหมุดรุ่นเฉพาะ                                                                              |
| `:latest` / `:latest-web`       | SemVer เสถียรที่ **เผยแพร่แล้ว** และมีเวอร์ชันสูงสุด | ตัวชี้รุ่นเสถียรที่เปลี่ยนแปลงได้      | ติดตามรุ่นเสถียร **หลังจาก** งานเผยแพร่ SemVer — **ไม่** ติดตาม `main` หรือ commit ของ `release/v*` ที่ยังไม่เผยแพร่ |
| `:next` / `:next-web`           | branch `release/v*` เริ่มต้นในปัจจุบัน               | ตัวชี้รุ่นก่อนเผยแพร่ที่เปลี่ยนแปลงได้ | ทดสอบการแก้ไขที่รวมอยู่ใน release branch ที่ใช้งานอยู่แล้ว แต่ยังไม่ได้รวมอยู่ในรุ่นเสถียร                           |
| `:main` / `:main-web`           | branch `main`                                        | ตัวชี้รุ่นพัฒนาที่เปลี่ยนแปลงได้       | สำหรับการพัฒนาและการทดสอบการผสานรวมเท่านั้น                                                                          |

#### ผู้ให้บริการเซสชันเว็บ: อิมเมจ `-web`

ทุกช่องทางข้างต้นมีแท็ก `-web` ควบคู่กัน (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ซึ่งสร้างจาก stage `runner-web` — เป็นอิมเมจเดียวกันที่เพิ่ม Playwright และเบราว์เซอร์ Chromium อิมเมจปกติจะจัดส่งมา **โดยไม่มี** Chromium ส่วน `gemini-web`, `claude-web` และ `claude-turnstile` จำเป็นต้องใช้ Chromium

ความล้มเหลวจะเกิดขึ้นภายหลัง ไม่ใช่ระหว่างการเริ่มต้นระบบ: ผู้ให้บริการเหล่านั้นจะแสดงรายการโมเดลและแสดงสถานะว่าเชื่อมต่อแล้วในแดชบอร์ด และจะล้มเหลวเฉพาะเมื่อส่งคำขอครั้งแรก โดยแสดงข้อความ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

หากคุณใช้ผู้ให้บริการเหล่านั้น ให้ดึงแท็ก `-web` ของช่องทางที่คุณใช้งานอยู่แล้ว — ไม่จำเป็นต้องเปลี่ยนแปลงอย่างอื่น สำหรับการติดตั้งผ่าน npm/CLI (ไม่ได้ใช้อิมเมจ Docker) ส่วนประกอบที่ขาดหายไปในลักษณะเดียวกันคือไบนารีของเบราว์เซอร์: ให้เรียกใช้ `npx playwright install chromium` บนโฮสต์

#### การใช้ช่องทางรุ่นก่อนเผยแพร่

ช่องทาง `next` จะถูกสร้างใหม่ทุกครั้งที่มีการ push ไปยัง branch เริ่มต้น `release/v*` ปัจจุบัน และเผยแพร่สำหรับทั้ง AMD64 และ ARM64 โดย branch บำรุงรักษารุ่นเก่าจะไม่สามารถเขียนทับช่องทางนี้ได้ ช่องทางนี้มี image ที่สามารถ pull ได้สำหรับการแก้ไขที่ merge เข้า branch รุ่นที่ใช้งานอยู่แล้ว ก่อนที่จะสร้าง tag stable ถัดไป

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

สำหรับ Docker Compose ให้ override tag ของ image ที่ profile ที่เลือกใช้งาน จากนั้น pull และสร้าง service ขึ้นใหม่:

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

`next` เป็นช่องทาง pre-release แบบเปลี่ยนแปลงได้ โดยอาจเปลี่ยนแปลงเมื่อมีการ push ใดๆ ไปยัง branch รุ่นที่ใช้งานอยู่ และ **ไม่รองรับการใช้งานในระบบ production** ให้ตรึง image digest ขณะประเมิน build ที่เฉพาะเจาะจง:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ก่อนทดสอบ ให้สำรองข้อมูล volume ของ OmniRoute หรือไดเรกทอรีข้อมูลที่ bind mount ไว้ หากต้องการย้อนกลับ ให้กู้คืนเวอร์ชัน stable หรือ digest ที่ใช้ก่อนหน้านี้ แล้วสร้าง container ขึ้นใหม่:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

build จาก release branch จะไม่มีทางเปลี่ยน `latest` ได้ มีเพียงเวอร์ชัน stable ที่เป็นไปตาม semantic version และมีคุณสมบัติตรงตามเงื่อนไขเท่านั้นที่สามารถเลื่อนตัวชี้ stable ได้ image ของ `next` ยังคงผ่านการตรวจสอบ release image และด่านบล็อกช่องโหว่ระดับ CRITICAL

**`latest` ไม่ใช่การรับประกันความเป็นปัจจุบันเมื่อเทียบกับ git** การแก้ไขที่ merge เข้า `main` หรือ branch `release/v*` ที่ใช้งานอยู่ **จะยังไม่อยู่ใน** `:latest` จนกว่าจะมีการเผยแพร่ image ที่เป็น SemVer แบบ stable และงานเผยแพร่เลื่อน `:latest` ให้ชี้ไปยัง image นั้น (มี digest เดียวกับ SemVer ดังกล่าว) หาก `latest` ดูเหมือนไม่เปลี่ยนแปลง ขณะที่ GitHub แสดงการแก้ไขแล้ว ให้ pull `:next` เพื่อทดสอบ release branch หรือรอ tag SemVer

| สิ่งที่คุณต้องการ                                                | ให้ใช้                            |
| ---------------------------------------------------------------- | --------------------------------- |
| GitOps / production ที่ต้องไม่มีการเปลี่ยนแปลงโดยไม่ตั้งใจ       | ตรึง `:X.Y.Z` (หรือ image digest) |
| ติดตาม stable ที่เผยแพร่แล้วและยอมรับการสร้างใหม่ในแต่ละ release | `:latest`                         |
| ทดสอบ commit ของ `release/v*` ที่ยังไม่เผยแพร่                   | `:next` (ไม่ใช่ production)       |
| ทดสอบ `main`                                                     | `:main` (ไม่ใช่ production)       |

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

## ความพร้อมใช้งาน: SQLite เริ่มต้นรองรับเพียงเรพลิกาเดียว

OmniRoute มาตรฐานบน Docker / Kubernetes ประกอบด้วย **หนึ่งโปรเซส Node + หนึ่งตัวเขียน SQLite** โทโพโลยีนี้ **ไม่รองรับ** ความพร้อมใช้งานสูง

| ข้อจำกัด                                         | ผลที่ตามมา                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ตัวเขียนเพียงตัวเดียว                            | **ห้าม** เรียกใช้หลายเรพลิกากับไฟล์ SQLite เดียวกัน เพราะจะทำให้ DB เสียหาย                                                                                                                                                                                                                                                                          |
| การสร้างใหม่ / รีสตาร์ต / การหยุดโดย HEALTHCHECK | เกิด **การหยุดให้บริการทั้งหมด** สำหรับ SSE ที่กำลังดำเนินการ เซสชันแดชบอร์ด และสถานะในหน่วยความจำ ไคลเอนต์ทุกตัวที่เชื่อมต่ออยู่จะหลุด คำขอใหม่ระหว่างช่วงที่ไม่มีเอนด์พอยต์จะได้รับ **`502 Bad Gateway: Unknown error`** จากพร็อกซีย้อนกลับ ไม่ใช่ JSON ของ OmniRoute — ไคลเอนต์จึงไม่สามารถแยกแยะกรณีนี้จากความล้มเหลวของผู้ให้บริการได้ (#11015) |
| ใช้ event loop เดียวกับ `/healthz`               | การประมวลผลแค็ตตาล็อกหรือการบีบอัดที่ยุ่งอาจทำให้โพรบล่าช้า จากนั้น timeout ที่สั้นจะรีสตาร์ตเรพลิกา **เพียงตัวเดียว**                                                                                                                                                                                                                               |

**เมทริกซ์โพรบ** (ดูเพิ่มเติมที่ [คำแนะนำสำหรับโพรบ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| โพรบ                   | เป้าหมาย                                                            | ห้ามใช้                                                           |
| ---------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Liveness               | TCP บน `PORT` (ค่าเริ่มต้น `20128`) หรือ HTTP แบบผ่อนปรน `/healthz` | `/api/monitoring/health`                                          |
| Readiness              | HTTP `GET /healthz`                                                 | timeout ที่เข้มงวดซึ่งถือว่า event loop ที่กำลังยุ่งนั้นหยุดทำงาน |
| เชิงลึก / สำหรับมนุษย์ | `/api/monitoring/health`                                            | liveness อัตโนมัติของ kubelet                                     |

**การอัปเกรด:** ให้คาดว่าเซสชันทั้งหมดจะหลุด ให้ระบายไคลเอนต์ออกหากทำได้ เนื่องจากไม่มีการอัปเดตแบบ rolling บน SQLite เริ่มต้น `restart: unless-stopped` ของ Compose ร่วมกับ `HEALTHCHECK` ของ Docker จะเปลี่ยนโปรเซสเพียงตัวเดียวเมื่อคอนเทนเนอร์อยู่ในสถานะ Unhealthy เช่นกัน — โดยมีขอบเขตผลกระทบเท่ากัน

ตัวอย่าง Kubernetes สำหรับ **เรพลิกาเดียว** (จำเป็นต้องใช้ Recreate และห้ามเพิ่ม `replicas` สำหรับไฟล์ SQLite เดียว):

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

การหน่วงเวลาด้วย `preStop` ช่วยให้ kube นำเอนด์พอยต์ของ Service ออกก่อนส่ง SIGTERM เพื่อให้ทราฟฟิก **ใหม่** หยุดเข้าถึงโปรเซสที่กำลังยุติ คำขอ SSE ของ `/v1/responses` ที่กำลังดำเนินการอยู่จะได้รับเวลาสำหรับระบายคำขอสูงสุดตามค่า `SHUTDOWN_TIMEOUT_MS` (ค่าเริ่มต้น 30 วินาที) ผ่านกลไก heavyweight admission leases (#11015) คำขอใหม่ที่ยังคงมาถึงโปรเซสจะได้รับ `503` + `Retry-After: 5` ช่วงที่ไม่มีเอนด์พอยต์จากการใช้ Recreate จนกว่าโปรเซสทดแทนจะอยู่ในสถานะ Ready ยังคงทำให้บริการหยุดชะงักโดยสมบูรณ์ ซึ่งเป็นลักษณะของโทโพโลยี SQLite ไม่ใช่การกำหนดค่าโพรบที่ผิดพลาด

Postgres ภายนอก / HA แบบหลายตัวเขียน **ไม่ใช่** แนวทางมาตรฐานที่มีการจัดทำเอกสารไว้ หากคุณต้องการ HA ให้คงไว้เพียงหนึ่งเรพลิกา หรือใช้โทโพโลยีที่โปรเจกต์ได้ทดสอบและจัดทำเอกสารแยกไว้แล้ว งานเกี่ยวกับ Postgres/MySQL อยู่ใน [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) จนกว่าฟีเจอร์ดังกล่าวจะพร้อมใช้งาน วิธีเดียวที่รองรับในการเพิ่มความจุสำหรับคำขอ `/v1/responses` **ขนาดใหญ่** คือใช้โปรเซสอิสระจำนวน N โปรเซส (ดูส่วนถัดไป) ไม่ใช่การตั้งค่า `replicas > 1` บนวอลุ่มเดียวกัน

## การขยายระบบแนวนอน: N โปรเซสอิสระ

หนึ่งโปรเซส Node คือ **หนึ่งฮีป V8** คำขอ `POST /v1/responses` ของ coding agent (RTK + Caveman) ที่ซ้อนทับกันสองคำขอ โดยแต่ละคำขอมีขนาดประมาณ 3 MiB / 750k โทเค็น จะทำให้ฮีปนั้นยุติการทำงานที่ประมาณ 12 Gi (`FATAL ERROR: Reached heap limit`) และอาจทำให้ cgroup ขนาด 16 Gi เกิด OOM ดู [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ผลการวัดดังกล่าวเป็นคำเตือนเรื่อง **งบประมาณหน่วยความจำ** ไม่ใช่ขีดจำกัดสูงสุดแบบตายตัวของผลิตภัณฑ์ที่อนุญาตให้มีคำขอ `/v1/responses` แบบยาวพร้อมกันได้เพียงสองคำขอ การรับแชตที่ใช้ทรัพยากรสูงถูกควบคุมด้วยงบประมาณไบต์ขาเข้าที่คำนวณโดยอัตโนมัติ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ซึ่งกำหนดขนาดจากเพดาน V8/cgroup เดียวกัน — การกำหนดค่าทับให้สูงขึ้น (หรือการตั้งค่าขีดจำกัดจำนวนคำขอแบบเดิม `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) บนโปรเซสที่กำหนดขนาดไว้แล้ว จะทำให้ปัญหาการยุติการทำงานกลับมาอีกครั้ง แชตขนาดเล็ก, `/healthz`, `/v1/models` และ MCP **ไม่** อยู่ภายใต้ขีดจำกัดดังกล่าว

### หนึ่งโปรเซส: คำขอ `/v1/responses` แบบยาวมากกว่าสองคำขอ

โปรเซสที่ **มีสถานะปกติ** (ฮีปต่ำกว่า `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ซึ่งมีค่าเริ่มต้นเป็น `0.75`) **อาจ** รันคำขอ `POST /v1/responses` แบบยาวพร้อมกันมากกว่าสองคำขอได้ เมื่อยังมีพื้นที่เหลือในงบประมาณไบต์ระหว่างดำเนินการทั่วทั้งโปรเซส (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) เนื้อหาคำขอที่มีขนาดตั้งแต่ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ขึ้นไป (ค่าเริ่มต้น 256 KiB) จะใช้สิทธิ์การทำงานสำหรับงานหนักแบบเดียวกับคำขอที่มีโครงสร้างซับซ้อน และใช้ทางเลี่ยง `tryAcquireHealthyHeadroom` เดียวกันจาก [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) การรองรับไคลเอนต์ SSE แบบยาวพร้อมกันหลายสิบราย (ผู้ดูแลระบบมักต้องการ 40–50 ราย) เป็นคำถามเรื่อง **งบประมาณหน่วยความจำ** — ต้องกำหนดขนาดฮีป + สล็อตหลัก/พื้นที่สำรอง + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ไม่ใช่ข้อจำกัดแบบตายตัวของผลิตภัณฑ์ที่ว่า “สูงสุด 2” ฮีปที่อยู่ภายใต้แรงกดดันจะยังคงลดภาระด้วย `503` ที่ลองใหม่ได้ เพื่อไม่ให้ปัญหา #7849 กลับมา

หากต้องการ **เพิ่มจำนวนฮีปเป็นทวีคูณ** (พื้นที่ old-space ของ V8 ที่แยกจากกัน) **ในปัจจุบัน**:

| ควรทำ                                                                                                                                                                                      | ไม่ควรทำ                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| รัน **N คอนเทนเนอร์/พ็อด** โดยแต่ละรายการมี `DATA_DIR` / วอลุ่มเป็นของตัวเอง                                                                                                               | ตั้งค่า `replicas > 1` ให้ใช้งานไฟล์ SQLite เดียวกัน                    |
| กำหนดขนาดงานหนักระหว่างดำเนินการ + พื้นที่สำรองเมื่อสถานะปกติจากงบประมาณฮีป / ไบต์ระหว่างดำเนินการ โดย 1–2 เป็นค่าเริ่มต้นแบบระมัดระวังตาม #7849 ไม่ใช่ขีดจำกัดสูงสุดแบบตายตัวของผลิตภัณฑ์ | ให้ RAM แก่โปรเซสเดียวเพิ่มขึ้น 8 เท่าและใช้ขีดจำกัดจำนวนแบบไม่จำกัด    |
| ทางเลือก: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` สำหรับ **ตัวนับโควตาที่ใช้ร่วมกัน**                                                                                         | ปฏิบัติต่อ Redis เสมือนเป็น SQLite ที่ใช้ร่วมกัน — Redis ไม่ใช่เช่นนั้น |
| ทำสำเนาข้อมูลลับของผู้ให้บริการไปยังแต่ละอินสแตนซ์ (หรือยอมรับแดชบอร์ดที่แยกจากกัน)                                                                                                        | คาดหวังให้มีแดชบอร์ดเดียว / บันทึกการเรียกใช้งานเดียวสำหรับทุกอินสแตนซ์ |
| วางโหลดบาลานเซอร์ใดก็ได้ไว้ด้านหน้า การกำหนดความคงที่ตาม API key หรือเซสชันก็เพียงพอ                                                                                                       | กำหนดให้ต้องใช้มิดเดิลแวร์ที่รับรู้ขนาดเฉพาะของผู้จำหน่าย               |

ฮาร์ดแวร์: จำนวนคำขอ `/v1/responses` แบบยาวที่ทำงานพร้อมกันต่ออินสแตนซ์เป็นคำถามเรื่อง **งบประมาณหน่วยความจำ** (ฮีป + ไบต์ระหว่างดำเนินการ / #10110) `DATA_DIR` อิสระจำนวน `N` รายการยังคงเพิ่มจำนวนฮีปเป็นทวีคูณ: RAM ของโฮสต์ต้องรองรับ `N × cgroup` ไม่ใช่ “พ็อด 16 Gi หนึ่งรายการที่มี N=8” ห้ามใช้ `replicas > 1` กับไฟล์ SQLite เดียวกันโดยเด็ดขาด

ตัวอย่าง Compose (สองฮีป สองวอลุ่ม — ไม่ใช่ `deploy.replicas: 2`):

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

ความหนาแน่นภายในโปรเซส (ย้ายการบีบอัดออกจาก HTTP isolate) อยู่ใน [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ส่วนคลัสเตอร์เชิงตรรกะหนึ่งชุดบนสถานะถาวรที่ใช้ร่วมกันอยู่ใน [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)

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
