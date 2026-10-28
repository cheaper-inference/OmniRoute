# 🐳 Docker Guide — OmniRoute (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker yordamida joylashtirish bo‘yicha to‘liq ma’lumotnoma. Tezkor boshlash uchun [README faylidagi Docker bo‘limi](../README.md#-docker) bilan tanishing.

## Mundarija

- [Tezkor ishga tushirish](#quick-run)
- [Muhit fayli bilan](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Mavjud profillar](#available-profiles)
- [OmniRoute Docker ichida ishlaganda host CLI vositalarini sozlash](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis yordamchi konteyneri](#redis-sidecar)
- [Ishlab chiqarish muhiti uchun Compose](#production-compose)
- [Dockerfile bosqichlari](#dockerfile-stages)
- [Muhim muhit o‘zgaruvchilari](#critical-environment-variables)
- [Caddy (HTTPS) bilan Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare tezkor tunneli](#cloudflare-quick-tunnel)
- [Tasvir teglari](#image-tags)
- [Docker ichida boshqaruv panelini yangilash](#dashboard-updates-in-docker)
- [Mavjudlik: standart SQLite faqat bitta replikani qo‘llab-quvvatlaydi](#availability-default-sqlite-is-single-replica)
- [Docker ichidagi Gemini mintaqaviy xatolari](#gemini-regional-errors-inside-docker)
- [Muhim eslatmalar](#important-notes)

---

## Tezkor ishga tushirish

> **Bitta buyruq bilan o‘zingiz joylashtirmoqchimisiz?**
> [Mustaqil joylashtirish qo‘llanmasi](../getting-started/SELF_HOST_GUIDE.md) bilan tanishing —
> `docker compose -f docker-compose.selfhost.yml up -d` (e’lon qilingan tasvir +
> Redis, faqat loopback interfeysi, profil tanlash talab qilinmaydi). Quyidagi tezkor ishga tushirish
> usuli Redis’ni boshqa joyda allaqachon ishga tushirgan foydalanuvchilar uchun
> bitta konteynerli variantdir.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Muhit fayli bilan

```bash
# Avval .env faylidan nusxa oling va uni tahrirlang
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
# Asosiy profil (CLI vositalarisiz)
docker compose --profile base up -d

# CLI profili (Claude Code, Codex, OpenClaw ichiga o‘rnatilgan)
docker compose --profile cli up -d

# Host profili (avvalo Linux uchun; host CLI binar fayllarini faqat o‘qish rejimida ulaydi)
docker compose --profile host up -d

# Web profili (veb-sessiya provayderlari uchun Chromium/Playwright)
docker compose --profile web up -d

# CLI va CLIProxyAPI yordamchi konteynerini birlashtirish
docker compose --profile cli --profile cliproxyapi up -d
```

## Mavjud profillar

OmniRoute asosiy joylashtirish shakllari uchun Compose profillari bilan taqdim etiladi. Muhitingizga mos profilni tanlang.

| Profil            | Xizmat           | Qachon foydalanish kerak                                                                                                                                                | Buyruq                                       |
| ----------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standart) | `omniroute-base` | Interfeyssiz server / minimal ish muhiti, provayder CLI vositalari qo‘shilmagan                                                                                         | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | `omniroute providers/setup/doctor` va ichiga o‘rnatilgan CLI vositalarini (Codex, Claude Code, Droid, OpenClaw) chaqiradigan agentli ish jarayonlari                    | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` va boshqalarni faqat o‘qish rejimida ulash orqali host CLI vositalariga `network_mode` kabi kirishni xohlaydigan Linux hostlari | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Yuqori oqimdagi CLI proksilash uchun [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) yordamchi konteynerini `8317` portida ishga tushirish                  | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Brauzer talab qiladigan veb-sessiya provayderlari: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` yig‘iladi, Chromium kiritilgan)                         | `docker compose --profile web up -d`         |

> Bir nechta profilni birlashtirish mumkin: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker’da ishlaganda host CLI vositalarini sozlash

`omniroute setup-codex`, `setup-claude`, `config set <tool>` va boshqaruv panelidagi
**Konfiguratsiyani saqlash** tugmasi `~/.codex/*.config.toml` kabi fayllarga yozadi. Bu yoʻllar
faqat CLI amalda ishlayotgan kompyuterda maʼnoga ega. Ularni konteyner ichida
ishga tushirsangiz, yozuv konteynerning oʻz uy katalogiga (`/home/node` —
tasvir `USER node` bilan ishlaydi) tushadi; hostdagi hech bir CLI uni hech qachon oʻqimaydi va
konteyner qayta yaratilishi bilan u yoʻq qilinadi.

OmniRoute buni aniqlaydi va foydalana olmaydigan muvaffaqiyat haqida
xabar berish oʻrniga, koʻrsatmalar bilan yozishni rad etadi: CLI `2` kodi bilan yakunlanadi,
API esa `containerEphemeralTarget: true` bilan `422` javobini qaytaradi.

### Tavsiya etiladi: CLI’ni hostda, OmniRoute’ni Docker’da ishga tushiring

Konteyner API’ga xizmat koʻrsatadi; CLI esa hostdagi vositalaringizni sozlaydi.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI’ni konteynerga yoʻnaltiring
omniroute setup-codex                      # hostdagi haqiqiy ~/.codex katalogiga yozadi
```

Codex, Claude Code, Cursor yoki shunga oʻxshash vositalar noutbukingizda ishlasa,
bu toʻgʻri tanlovdir — odatda aynan shunday sozlama qoʻllanadi.

### Muqobil usul: host konfiguratsiya kataloglarini bind-mount qiling (`host` profili)

Agar konteynerning oʻzi host konfiguratsiyasiga yozishini istasangiz,
kataloglarni ulab, `CLI_CONFIG_HOME` qiymatini ulashning ildiz katalogiga yoʻnaltiring. `host` profili
buni allaqachon bajaradi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Yoʻlni ishonchli qiladigan narsa bind mount hisoblanadi: OmniRoute
`/proc/self/mountinfo` faylini oʻqiydi va ulangan yoʻllarga (shuningdek,
ichki kataloglari ulangan kataloglarga — yuqoridagi `/host-home` tuzilmasi aynan shunday)
yozishga ruxsat beradi, ulanmagan yoʻllarga yozishni esa rad etishda davom etadi.

### Favqulodda yechim: konteynerning oʻz CLI vositalarini sozlash (ehtiyotkorlik bilan foydalaning)

CLI vositalari haqiqatan ham konteyner ichida joylashgan boʻlsa (`cli` profili), yozish
ataylab amalga oshiriladi. Istalgan `setup-*` buyrugʻiga `--allow-container-write` parametrini uzating
yoki server uchun `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` qiymatini oʻrnating. Yozish
konteynerdan uzoqroq saqlanmasligi haqidagi ogohlantirish bilan davom etadi.

> **Xavfsizlik ogohlantirishi — `cli` profili + `docker.sock` ulanishi.**
> Konteyner ichidagi avtomatik yangilagich stekni host demoni orqali qayta yarata olishi uchun
> `cli` profili `/var/run/docker.sock` faylini bind-mount qiladi
> (`src/lib/system/autoUpdate.ts` ushbu soket mavjudligini tekshiradi va u
> boʻlmasa Docker yoʻlini chetlab oʻtadi). Bu soket **host root huquqlariga ishonch
> chegarasi** hisoblanadi: unga kira oladigan har qanday narsa hostdagi Docker demonini
> root sifatida boshqaradi — u hostdagi istalgan konteynerni yaratishi, tekshirishi,
> toʻxtatishi va oʻchirishi mumkin.
> Oqibatlari:
>
> 1. **`cli` profilining portini hech qachon tarmoqqa ochmang.** Uni
>    `127.0.0.1` manzilida eʼlon qiling (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN orqali kirish mumkin boʻlgan `cli` profili boshqaruv paneli darajasidagi har qanday RCE’ni
>    hostning toʻliq buzib kirilishiga aylantiradi.
> 2. **`cli` profiliga boshqa hech qanday host katalogini bind-mount qilmang.**
>    Docker soketi va har qanday qoʻshimcha ulanish konteynerga fayl tizimingiz hamda host
>    konfiguratsiyangizga toʻliq oʻqish/yozish imkonini beradi. Agar vosita loyihani
>    koʻrishi kerak boʻlsa, uni CLI binar fayli orqali mahalliy ishga tushiring — loyihani
>    `cli` konteyneriga ulamang.
>
> Agar konteyner ichida avtomatik yangilash kerak boʻlmasa, `cli` profilini oʻchirilgan holda qoldiring
> (`COMPOSE_PROFILES=core,redis` yoki qisqaroq variant). Boshqa profillar
> Docker soketini ulamaydi.
>
> MITM bilan bogʻliq tahdid modeli uchun `docs/security/MITM-TPROXY-DECRYPT.md` fayliga (git’da mavjud; `/docs` ichiga kompilyatsiya qilinmaydi),
> `codex`/`claude-code`/`droid`/`openclaw` binar fayllarining kelib chiqish zanjiri uchun esa
> `docs/security/SUPPLY_CHAIN.md` fayliga qarang.

## Redis Sidecar

OmniRoute taqsimlangan soʻrovlar tezligi cheklagichi va umumiy keshni taʼminlash uchun Redisʼga tayanadi. `redis` xizmati `docker-compose.yml` faylida **har doim belgilangan** (unda profil cheklovi yoʻq) va istalgan boshqa profil bilan birga ishga tushadi.

| Tafsilot                           | Qiymat                                           |
| ---------------------------------- | ------------------------------------------------ |
| Tasvir                             | `redis:7-alpine`                                 |
| Konteyner nomi                     | `omniroute-redis`                                |
| Ichki port                         | `6379`                                           |
| Xost porti (qayta belgilash)       | `REDIS_PORT` (standart qiymati `6379`)           |
| Xost bogʻlanishi (qayta belgilash) | `REDIS_BIND_HOST` (standart qiymati `127.0.0.1`) |
| Jild                               | `omniroute-redis-data` → `/data`                 |
| Holat tekshiruvi                   | `redis-cli ping` (10s interval)                  |

Tegishli muhit oʻzgaruvchilari:

- `REDIS_URL` — ilovaga kiritiladigan ulanish satri (standart qiymati `redis://redis:6379`).
- `REDIS_PORT` — Redis konteyneri uchun xost tomonidagi port xaritalanishi.
- `REDIS_BIND_HOST` — port eʼlon qilinadigan xost interfeysi. Standart qiymati `127.0.0.1`.

> **Nega standart holatda loopback ishlatiladi:** sidecar `requirepass`siz ishlaydi va ilova
> konteynerlari unga compose tarmogʻi (`redis:6379`) orqali ulanadi — eʼlon qilingan port
> faqat xost tomonidagi vositalar (`redis-cli`, mahalliy `npm run dev`) uchun kerak.
> `0.0.0.0` manzilida eʼlon qilish autentifikatsiyasiz Redisʼni LAN tarmogʻingizdagi barcha
> xostlarga ochib qoʻyadi. Agar `REDIS_BIND_HOST=0.0.0.0` qiymatini oʻrnatsangiz,
> xizmatning `command:` qatoriga `--requirepass` parametrini ham qoʻshing.

**Redisʼni oʻchirib qoʻyish** tavsiya etilmaydi (soʻrovlar tezligi cheklagichi xotiradagi zaxira mexanizmiga oʻtib, imkoniyatlari pasayadi). Agar bunga majbur boʻlsangiz, `docker-compose.yml` faylidagi `redis:` xizmat blokini olib tashlang/izohga aylantiring yoki uni nolga masshtablang:

```bash
docker compose up -d --scale redis=0
```

## Ishlab chiqarish uchun Compose

Dasturlash muhiti bilan yonma-yon ishlaydigan izolyatsiyalangan ishlab chiqarish nusxasi uchun `docker-compose.prod.yml` faylidan foydalaning.

| Tafsilot                            | Qiymat                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| Fayl                                | `docker-compose.prod.yml`                                                           |
| Boshqaruv panelining standart porti | `PROD_DASHBOARD_PORT=20130` (ichki `${DASHBOARD_PORT:-20128}` portiga xaritalanadi) |
| APIʼning standart porti             | `PROD_API_PORT=20131`                                                               |
| Tasvir                              | `omniroute:prod` (`runner-cli` maqsadidan yigʻiladi)                                |
| Redis konteyneri                    | `omniroute-redis-prod` (`redis:8.6.2`, maxsus `redis-prod-data` jildi)              |
| Maʼlumotlar jildi                   | `omniroute-prod-data` (nomlangan, qayta yigʻishlar orasida saqlanadi)               |
| Holat tekshiruvlari                 | `node healthcheck.mjs` + `redis-cli ping`, `depends_on` Redis holatiga bogʻlangan   |

Foydalanish tartibi:

```bash
# Ishlab chiqarish stekini yigʻish va ishga tushirish
docker compose -f docker-compose.prod.yml up -d --build

# Loglarni oqimda koʻrish
docker compose -f docker-compose.prod.yml logs -f

# Toʻxtatish va olib tashlash (jildlarni saqlab qolish)
docker compose -f docker-compose.prod.yml down
```

Ishlab chiqarish steki dasturlash compose muhiti bilan parallel ravishda ishlaydi (konteyner nomlari, portlari va jildlari turlicha), shu sababli ishlab chiqarish muhiti ishlab turgan paytda mahalliy tarzda ishni davom ettirishingiz mumkin.

## Dockerfile bosqichlari

Repozitoriy ko‘p bosqichli Dockerfile (`Dockerfile`) bilan taqdim etiladi. To‘rtta bosqich mavjud; foydalanish holatingiz uchun mos `target`ni tanlang.

| Bosqich       | Asosiy obraz          | Maqsad                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Bog‘liqliklarni o‘rnatadi (`npm ci --legacy-peer-deps`) va `npm run build`ni ishga tushiradi (sukut bo‘yicha Turbopack — quyidagi Yig‘ish vaqtidagi resurslar bo‘limiga qarang)                                                                                                                    |
| `runner-base` | `node:26-trixie-slim` | Next.js mustaqil chiqishi bilan ishlab chiqarish muhiti. **Hech qanday provayder CLI vositalari kiritilmagan.**                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` va global CLI vositalarini qo‘shadi: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Agentli ish jarayonlari uchun shuni tanlang.**                                                                                                      |
| `runner-web`  | `runner-base`         | Veb-sessiya provayderlari uchun Playwright + Chromium brauzerini (`--with-deps`) qo‘shadi: `gemini-web`, `claude-web`, `claude-turnstile`. **Ushbu provayderlardan foydalansangiz, shuni tanlang** — oddiy obraz busiz so‘rov vaqtida ishlamaydi (Reliz kanallari ostidagi `-web` izohiga qarang). |

Muayyan targetni qo‘lda yig‘ish:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Yig‘ish vaqtidagi resurslar

Uchta yig‘ish argumenti `builder` bosqichining resurs sarfini boshqaradi. Ular faqat yig‘ish vaqtida amal qiladi —
`OMNIROUTE_MEMORY_MB` (quyida) esa alohida, bajarilish vaqtiga oid sozlamadir.

| Yig‘ish argumenti           | Standart | Ta’siri                                                                                                            |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` webpack bilan yig‘adi: xotira cho‘qqisi pastroq, ammo sekinroq. `1` Turbopackni yoqadi.                        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Ishga tushirilgan `next build` uchun V8 heap chegarasi (`--max-old-space-size`).                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL`ga uzatiladi; Next sahifa ma’lumotlarini to‘plash uchun `workers = N - 1`ni hisoblab chiqaradi. |

`OMNIROUTE_BUILD_WORKERS` — kuchli builderda oshiriladigan va resurslari
cheklangan yig‘ish **`✓ Compiled successfully`dan keyin** to‘xtab qolsa, gumon
qilinadigan parametrdir. Har bir sahifa ma’lumotlari workeri alohida jarayon
bo‘lib, asosiy `next build`ning o‘zi ham alohida jarayondir; real VPSdagi
takroriy sinov (issue #7518) har bir jarayonning eng yuqori RSS ko‘rsatkichi
`NODE_OPTIONS` heap bayrog‘idan qat’i nazar ~4.5 GB ekanini o‘lchadi (Turbopack
V8 heapidan tashqaridagi mahalliy/Rust xotirasida kompilyatsiya qiladi).
Standart `2` qiymati (→ 1 worker, jami 2 jarayon) nashr qilish pipeline’i
foydalanadigan 16 GB / 4 vCPU GitHub-hosted runnerlar uchun moslangan. `8`
qiymatida (→ 7 worker) o‘sha runner xotirasi tugadi va buildkit bosqichni
`ResourceExhausted: ... cannot allocate memory` xatosi bilan yakunladi;
har bir jarayon RSS ko‘rsatkichi taxmin qilinmay, to‘g‘ridan-to‘g‘ri
o‘lchanganida `3` (→ 2 worker) ham sig‘madi.
`tests/unit/docker-build-memory-budget.test.ts` o‘lchangan qiymat asosida
hisob-kitob qiladi va parametrlardan biri runner imkoniyatidan oshsa, test
muvaffaqiyatsiz tugaydi.

Turbopack V8 heapidan **tashqarida** joylashgan mahalliy Rust xotirasida
kompilyatsiya qiladi, shu sababli `OMNIROUTE_BUILD_MEMORY_MB` uni cheklamaydi.
Xotira chegarasi mavjud hostda yig‘ish OOM killer tomonidan hech qanday xato
matnisiz SIGKILL qilinadi — u shunchaki `Creating an optimized production build`
jarayonining o‘rtasida to‘xtaydi va bu xotira yetishmovchiligi emas, osilib
qolishdek ko‘rinadi. Shu sababli `Dockerfile` sukut bo‘yicha webpackdan
(`OMNIROUTE_USE_TURBOPACK=0`) foydalanadi; bu borada u `npm run dev` /
`npm run build`dan farq qiladi, chunki ularda kod bo‘yicha standart Turbopackdir:
hech qanday yig‘ish argumentlarisiz oddiy `docker build .` (Railway va boshqa
bir marta bosish orqali ishga tushiruvchi hostlar bajaradigan buyruq) xotirasi
cheklangan builderda indamay to‘xtab qolmasligi kerak. Nashr qilingan obrazlar
allaqachon `docker-publish.yml` ichida `OMNIROUTE_USE_TURBOPACK=0`ni aniq
uzatadi. Yetarlicha RAMga ega builderda tezroq yig‘ish uchun Turbopackni yoqing:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` yoqilgan, shu sababli `next build` asosiy **va** worker
jarayonini ishga tushiradi hamda ularning har biri `OMNIROUTE_BUILD_MEMORY_MB`
qiymatiga alohida rioya qiladi. Konteyner chegarasini bu qiymatdan bir emas,
taxminan ikki baravar yuqori qilib belgilang.

Ushbu daraxtda o‘lchangan (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Konteyner chegarasi | Natija                                             |
| --------- | ------------------- | -------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB      | har ikkala holatda OOM sababli indamay to‘xtatildi |
| webpack   | 8 GiB               | build worker SIGKILL qilindi                       |
| webpack   | 12 GiB              | muvaffaqiyatli, cho‘qqisi 11.1 GiB                 |

### Bajarilish vaqtidagi standart qiymatlar

`runner-base` tomonidan eksport qilinadigan standart qiymatlar: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker ichidagi xotira xatti-harakati:

- Tasvir `OMNIROUTE_MEMORY_MB=1024` qiymatini o‘rnatadi va undan `NODE_OPTIONS=--max-old-space-size=1024` qiymatini hosil qiladi.
- Amaldagi server jarayoni mustaqil ishga tushirgich tomonidan boshlanadi; u `OMNIROUTE_MEMORY_MB` qiymatini o‘qiydi va `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` parametrini qo‘shadi.
- Node takrorlangan `--max-old-space-size` qiymatlarining oxirgisidan foydalanadi, shuning uchun `OMNIROUTE_MEMORY_MB` ni sozlash Docker uchun amaldagi heap cheklovini boshqaradi.
- Tasvir bu qiymatni doim o‘rnatgani sababli, ishga tushirgichning RAM hajmiga moslangan zaxira qiymati Docker ostida hech qachon qo‘llanmaydi. Ish yukiga qarab uni aniq oshiring (quyidagi jadvalga qarang). `2048` coding-agent `/v1/responses` uchun hamon juda kichik.

### Coding agentlari uchun ish vaqtidagi RAM

Docker uchun standart 1 GiB — ishlab chiqarish muhiti hajmi emas, balki boshqaruv paneli/yengil chat uchun minimal darajadir. Uzun `POST /v1/responses` tanalari (yuzlab xabarlar, o‘nlab vositalar) siqish vaqtida bir nechta xotira ichidagi grafiklarni saqlab turadi. Bir-biriga ustma-ust kelgan taxminan 3 MiB / 750 ming tokenli ikkita so‘rov **12 GiB** old-space hajmida V8 ishini to‘xtatgan (`FATAL ERROR: Reached heap limit`) va 16 GiB cgroup OOM holatiga ham olib kelgan. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ga qarang.

**cgroup `--memory` hajmini heap hajmidan kattaroq qilib belgilang** — mahalliy buferlar, SQLite va siqishning oraliq ma’lumotlari V8 dan tashqarida joylashadi.

| Ish yuki                                         | `OMNIROUTE_MEMORY_MB`               | Konteyner / cgroup               | Izohlar                                                                                                                                                               |
| ------------------------------------------------ | ----------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boshqaruv paneli, bitta yengil chat              | `1024` (tasvirdagi standart qiymat) | ≥2 GiB                           |                                                                                                                                                                       |
| Bitta coding agenti (Claude/Codex/Grok)          | `8192`                              | ≥10 GiB                          | Odatdagi bitta seansli `/v1/responses`                                                                                                                                |
| Bir vaqtdagi ikkita uzun `/v1/responses`         | `10240`–`12288`                     | ≥12–16 GiB                       | Taxminan 12 GiB heap hajmida V8 to‘xtashi kuzatilgan                                                                                                                  |
| Bir vaqtdagi uchta yoki undan ko‘p uzun kontekst | bitta jarayonda ishlatmang          | ketma-ket bajaring / ko‘proq RAM | Standart og‘ir so‘rovlar cheklovi bir vaqtda 1 ta bajarilayotgan so‘rovdir; RAM hajmini oshirmasdan bu cheklovni ko‘tarish to‘xtash holatini qayta keltirib chiqaradi |

Oddiy tizimda `omniroute serve`, `OMNIROUTE_MEMORY_MB` **o‘rnatilmagan** bo‘lsa, RAM hajmining taxminan 35% ini hisoblab belgilaydi (`[512, 4096]` oralig‘i bilan cheklanadi). Docker har doim `1024` ni o‘rnatadi, shuning uchun bu moslash jarayoni rasmiy tasvirda hech qachon bajarilmaydi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Muhim muhit o‘zgaruvchilari

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) faylida hujjatlashtirilgan standart sozlamalardan tashqari, Docker ostida ishga tushirishda quyidagi o‘zgaruvchilar eng muhim hisoblanadi:

| O‘zgaruvchi                   | Maqsadi                                                                                                                                                                                                                                                                            | Standart qiymat                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ko‘prigi uchun umumiy maxfiy kalit. **Ishlab chiqarish muhitida talab qilinadi** — kuchli tasodifiy satrga o‘rnating.                                                                                                                                                    | o‘rnatilmagan (berilishi shart) |
| `REDIS_URL`                   | So‘rovlar chastotasini cheklovchi / kesh serveri uchun ulanish satri                                                                                                                                                                                                               | `redis://redis:6379`            |
| `REDIS_PORT`                  | Birga taqdim etiladigan Redis konteyneri uchun xost tomonidagi port                                                                                                                                                                                                                | `6379`                          |
| `REDIS_BIND_HOST`             | Birga taqdim etiladigan Redis porti e’lon qilinadigan xost interfeysi (AUTH qo‘shmaguningizcha loopback)                                                                                                                                                                           | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | O‘zini yangilash jarayonlari uchun `cli` profiliga `/workspace/omniroute` manzilida ulangan xost yo‘li                                                                                                                                                                             | `.` (joriy katalog)             |
| `OMNIROUTE_MEMORY_MB`         | Docker avtonom serveri uchun Node heap xotirasining ishlash vaqtidagi yuqori chegarasi; yuqoridagi obraz standart qiymatini bekor qiladi. Dasturlash agentlari: `8192`+ ([ishlash vaqtidagi RAM](#runtime-ram-for-coding-agents) bo‘limiga qarang).                                | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Boshqaruv paneli (20128) va API (20129) uchun ochiq portlarni o‘zgartirish                                                                                                                                                                                                         | `20128` / `20129`               |
| `APP_BIND_HOST`               | docker-compose boshqaruv paneli/API/jonli WS portlarini e’lon qiladigan xost interfeysi. `REQUIRE_API_KEY=false` (standart) bo‘lsa, `0.0.0.0` anonim `/v1` proksisini LAN uchun ochadi — faqat `REQUIRE_API_KEY=true` bilan yoki oldida teskari proksi mavjud bo‘lsa kengaytiring. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | docker-compose `cliproxyapi` yordamchi konteynerini e’lon qiladigan xost interfeysi — uning ma’lumotlar jildida provayder hisob ma’lumotlari saqlanadi.                                                                                                                            | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Ishlash vaqtidagi plagin skaneri o‘qiydigan va plaginlarni o‘rnatadigan katalog. Plaginlar bind-mount orqali ulanganida uni belgilang: standart qiymat `HOME` ga bog‘liq, obraz esa uni eksport qilmasligi mumkin.                                                                 | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | Ilova teskari proksi ortida e’lon qilingandagi URL quyi yo‘li (masalan, `/omniroute`)                                                                                                                                                                                              | _(bo‘sh = ildiz)_               |
| `NEXT_PUBLIC_BASE_URL`        | Quyi yo‘lni o‘z ichiga olgan ommaviy brauzer manbasi (masalan, `https://host/omniroute`)                                                                                                                                                                                           | o‘rnatilmagan                   |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` uchun xost tomonidagi boshqaruv paneli porti                                                                                                                                                                                                             | `20130`                         |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` yordamchi konteyneri uchun xost tomonidagi port                                                                                                                                                                                                                      | `8317`                          |

## Quyi yoʻlda teskari proksi (Traefik / nginx)

Next.js `basePath` qiymati standalone toʻplamiga kompilyatsiya qilinadi. OmniRoute oʻrnatilgan
qiymatni ilova ildizidagi sentinel faylga yozib qoʻyadi (`npm run build` vaqtida yoziladi;
`scripts/docker/ensure-docker-base-path.mjs` tomonidan oʻqiladi) va konteyner ishga
tushganda uni `OMNIROUTE_BASE_PATH` bilan taqqoslaydi. Agar ular farq qilsa va tasvir
domen ildizi uchun yaratilgan boʻlsa, kirish nuqtasi `node dev/run-standalone.mjs`
ishga tushishidan oldin standalone manifestlarini, ichki `basePath`/`assetPrefix`
literallarini (Next 16 SSR resurs URL manzillarini faqat `assetPrefix` asosida hosil
qiladi — yamovchi quyi yoʻlni unga ham aks ettiradi), oʻrnatilgan `/_next/static`
resurs URL manzillarini (mijoz havolalari manifestlari, media importlari, oldindan
renderlangan xato sahifalari) va mijoz `process.env` moslashtiruvchisini qayta yozadi.

### Compose orqali yaratish (tavsiya etiladi)

Tasvir va bajarilish muhiti bir-biriga mos kelishi uchun `.env` faylida ikkala
oʻzgaruvchini ham belgilang, soʻng tasvirni qayta yarating:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` fayli `OMNIROUTE_BASE_PATH` qiymatini Docker yaratish argumenti
va bajarilish muhiti oʻzgaruvchisi sifatida uzatadi.

### Oldindan yaratilgan ildiz tasviri + bajarilish vaqtidagi quyi yoʻl

Eʼlon qilingan `diegosouzapw/omniroute:*` tasvirlari domen ildizi uchun yaratilgan.
Shunga qaramay, bajarilish vaqtida `OMNIROUTE_BASE_PATH` qiymatini belgilashingiz
mumkin; konteyner ishga tushishda toʻplamga bir marta yamoq qoʻllaydi. Uni mos ommaviy
origin bilan birga sozlang:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Teskari proksini tashqi yoʻlni **toʻliq** uzatadigan qilib sozlang (prefiksni olib
tashlamang). Traefik `PathPrefix(`/omniroute`)` yoʻnalishini konteynerga `StripPrefix`
siz yoʻnaltirishi kerak, shunda Next.js `/omniroute/...` yoʻlini qabul qiladi va
resurslarni `/omniroute/_next/...` manzilidan taqdim etadi.

Docker sogʻliq tekshiruvi faol `OMNIROUTE_BASE_PATH` prefiksi qoʻshilgan yengil
`/healthz` hayot sikli endpointini tekshiradi. `/api/monitoring/health` foydalanuvchi
yoki boshqaruv paneli diagnostikasi uchun mavjud boʻlib qoladi; konteyner
HEALTHCHECK tekshiruvini yana unga yoʻnaltirish uchun (masalan, chuqur sogʻliq
nazoratini taʼminlash maqsadida) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`
qiymatini belgilang. Bu yoʻl **chuqur** tekshiruvdir (maʼlumotlar bazasi + monitoring
xulosasi) — qayta yoqishni tanlasangiz, Docker'ning kamdan-kam bajariladigan
`HEALTHCHECK` tekshiruvi uchun mos, ammo Kubernetes `livenessProbe` intervallari
uchun **mos emas**.

Orkestratorlar uchun (Kubernetes, Nomad va boshqalar):

| Tekshiruv       | Afzal                                                                 | Saqlaning                                                                         |
| --------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Faollik         | HTTP `GET /livez` yoki asosiy portdagi TCP (`PORT`, standart `20128`) | Faollik tekshiruvi sifatida `/api/monitoring/health`                              |
| Tayyorlik       | HTTP `GET /healthz`                                                   | Voqealar sikli bandligini ishlamay qolish deb hisoblaydigan qisqa kutish vaqtlari |
| Chuqur / tashqi | `/api/monitoring/health`                                              | —                                                                                 |

`/healthz` jarayonning hayot sikli holatini (`ok` / `starting` / `stopping`) xabar
qiladi. `/livez` faqat jarayon ishlayotganini tekshiradi (ishlov beruvchi ishga tusha
olganida har doim 200 qaytaradi; u tayyorlikni kutmaydi). Har ikkisi ham soʻrovlarga
ishlov berish bilan bir xil Node voqealar siklida bajariladi, shu sababli CPU talab
qiladigan katalog yoki siqish ishlari ularni kechiktirishi mumkin — band ≠ ishlamayapti.
HTTP tekshiruvlari vaqti tugab qolsa, TCP faollik tekshiruvini afzal koʻring. Tekshiruvlar
boʻyicha toʻliq koʻrsatmalar:
[Monitoring qoʻllanmasi — Kubernetes tekshiruvlari boʻyicha tavsiyalar](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy bilan Docker Compose (HTTPS Auto-TLS)

OmniRoute’ni Caddy’ning avtomatik SSL taʼminoti yordamida xavfsiz tarzda tashqi tarmoqqa ochish mumkin. Domeningizning DNS A yozuvi serveringiz IP manziliga yoʻnaltirilganiga ishonch hosil qiling.

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
      # OAuth qayta chaqiruvlari, boshqaruv paneli havolalari va yaratilgan ommaviy URL manzillari uchun brauzerga moʻljallangan origin.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Rejalashtirilgan vazifalar / oʻziga yuboriladigan soʻrovlar uchun ichki serverlararo URL.
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

Caddy yuqori oqimdagi konteyner uchun standart yoʻnaltirish sarlavhalarini oʻrnatadi. OmniRoute OAuth qayta chaqiruvlari va yaratilgan ommaviy havolalar uchun
`NEXT_PUBLIC_BASE_URL` qiymatidan kanonik ommaviy origin sifatida foydalanadi;
autentifikatsiyalangan boshqaruv panelidagi yozish amallari bir xil origin soʻrovlari hamda seansga bogʻlangan CSRF
himoyasidan foydalanadi. `OMNIROUTE_TRUST_PROXY` parametrini faqat OmniRoute ommaviy origin’ni aniq
konfiguratsiya oʻrniga ishonchli yoʻnaltirilgan sarlavhalardan ataylab aniqlashini istaydigan ilgʻor
joylashtirishlarda yoqing.

## Cloudflare Quick Tunnel

Docker joylashtirishlari uchun boshqaruv paneli `Dashboard → Endpoints` sahifasida bir marta bosish orqali ishga tushiriladigan **Cloudflare Quick Tunnel** imkoniyatini oʻz ichiga oladi. Birinchi marta yoqilganda `cloudflared` faqat zarur boʻlgandagina yuklab olinadi, joriy `/v1` endpoint’ingizga vaqtinchalik tunnel ishga tushiriladi va yaratilgan `https://*.trycloudflare.com/v1` URL manzili odatiy ommaviy URL manzilingiz ostida koʻrsatiladi.

Endpoint tunnel panellarini (Cloudflare, Tailscale, ngrok) faol tunnel holatini oʻzgartirmasdan `Settings → Appearance` orqali koʻrsatish yoki yashirish mumkin.

### Tunnel boʻyicha eslatmalar

- Quick Tunnel URL manzillari vaqtinchalik boʻlib, har bir qayta ishga tushirishdan keyin oʻzgaradi.
- OmniRoute yoki konteyner qayta ishga tushirilgandan keyin Quick Tunnel’lar avtomatik tiklanmaydi. Zarur boʻlganda ularni boshqaruv panelidan qayta yoqing.
- Boshqariladigan oʻrnatish hozirda `x64` / `arm64` arxitekturalaridagi Linux, macOS va Windows tizimlarini qoʻllab-quvvatlaydi.
- Boshqariladigan Quick Tunnel’lar cheklangan konteyner muhitlarida shovqinli QUIC UDP buferi ogohlantirishlarining oldini olish uchun standart holatda HTTP/2 transportidan foydalanadi. Boshqa transportdan foydalanmoqchi boʻlsangiz, `CLOUDFLARED_PROTOCOL=quic` yoki `auto` qiymatini oʻrnating.
- Docker tasvirlari tizim CA ildiz sertifikatlarini oʻz ichiga oladi va ularni boshqariladigan `cloudflared` jarayoniga uzatadi, bu tunnel konteyner ichida ishga tushirilganda TLS ishonch xatolarining oldini oladi.
- OmniRoute yangi nusxani yuklab olish oʻrniga mavjud bajariladigan fayldan foydalanishini istasangiz, `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` qiymatini oʻrnating.

## Tasvir teglari

| Tasvir                   | Teg      | Hajmi  | Tavsif                                                          |
| ------------------------ | -------- | ------ | --------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Eng yuqori **nashr qilingan** barqaror SemVer (git `main` emas) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps uchun ushbu turdagi tegni qatʼiy belgilang               |

Koʻp platformali manifest: mahalliy `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker mos arxitekturani avtomatik ravishda tanlaydi; ARM xostlarida AMD64 emulyatsiyasini majburan ishlatish kerak boʻlsa, `--platform linux/amd64` parametrini uzating.

### Reliz kanallari

OmniRoute barqaror relizlar, faol reliz tarmogʻini sinash va ishlab chiqish tuzilmalari uchun alohida Docker kanallarini nashr qiladi.

| Kanal                           | Manba                                         | Oʻzgaruvchanlik                          | Tavsiya etilgan foydalanish                                                                                                          |
| ------------------------------- | --------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Imzolangan/versiyalangan reliz                | Oʻzgarmas                                | Aniq relizga qatʼiy bogʻlangan ishlab chiqarish joylashtirishlari                                                                    |
| `:latest` / `:latest-web`       | Eng yuqori **nashr qilingan** barqaror SemVer | Oʻzgaruvchan barqaror koʻrsatkich        | SemVer nashr vazifasidan **keyin** barqaror relizlarni kuzatadi — `main` yoki nashr qilinmagan `release/v*` commit’larini kuzatmaydi |
| `:next` / `:next-web`           | Joriy standart `release/v*` tarmogʻi          | Oʻzgaruvchan pre-reliz koʻrsatkichi      | Faol reliz tarmogʻiga kiritilgan, ammo hali barqaror relizga qoʻshilmagan tuzatishlarni sinash                                       |
| `:main` / `:main-web`           | `main` tarmogʻi                               | Oʻzgaruvchan ishlab chiqish koʻrsatkichi | Faqat ishlab chiqish va integratsion sinovlar uchun                                                                                  |

#### Veb-seans provayderlari: `-web` tasvirlari

Yuqoridagi har bir kanal `runner-web` bosqichidan yaratilgan `-web` tegiga (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ham ega — bu Playwright va Chromium brauzeri qoʻshilgan ayni tasvirdir. Oddiy tasvir Chromium’siz yetkazib beriladi; `gemini-web`, `claude-web` va `claude-turnstile` undan foydalanishni talab qiladi.

Xatolik ishga tushirish vaqtida emas, keyinroq yuz beradi: bu provayderlar oʻz modellarini roʻyxatda koʻrsatadi va boshqaruv panelida ulangan holatda koʻrinadi, faqat birinchi soʻrov quyidagi xato bilan yakunlanadi:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Agar ushbu provayderlardan foydalansangiz, hozir foydalanayotgan kanalingizning `-web` tegini yuklab oling — boshqa hech narsa oʻzgarmaydi. npm/CLI orqali oʻrnatishda (Docker tasvirisiz) unga teng keladigan yetishmayotgan qism brauzerning bajariladigan faylidir: xostda `npx playwright install chromium` buyrugʻini ishga tushiring.

#### Pre-reliz kanalidan foydalanish

`next` kanali joriy standart `release/v*` tarmogʻiga har bir push amalga oshirilganda qayta yigʻiladi va AMD64 hamda ARM64 uchun eʼlon qilinadi. Eski texnik xizmat tarmoqlari uning ustiga yozolmaydi. Bu kanal keyingi barqaror teg yaratilishidan oldin faol reliz tarmogʻiga birlashtirilgan tuzatishlarni yuklab olish mumkin boʻlgan obraz sifatida taqdim etadi.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose uchun tanlangan profil ishlatadigan obraz tegini almashtiring, soʻng servis obrazini yuklab olib, servisni qayta yarating:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Xavfsizlik va oldingi holatga qaytarish

`next` — oʻzgaruvchan dastlabki reliz kanali. U faol reliz tarmogʻiga har qanday push amalga oshirilganda oʻzgarishi mumkin va **ishlab chiqarish muhitida foydalanish uchun qoʻllab-quvvatlanmaydi**. Muayyan yigʻilishni baholash vaqtida obraz dayjestini qatʼiy belgilang:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sinovdan oldin OmniRoute maʼlumotlar tomi yoki bind-mount qilingan maʼlumotlar katalogining zaxira nusxasini yarating. Oldingi holatga qaytarish uchun avval ishlatilgan barqaror versiya yoki dayjestni tiklang va konteynerni qayta yarating:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Reliz tarmogʻidagi yigʻilish hech qachon `latest` koʻrsatkichini siljita olmaydi; barqaror koʻrsatkichni faqat talablarga javob beradigan barqaror semantik versiya yangilashi mumkin. `next` obrazlarida reliz obrazini tekshirish va CRITICAL darajadagi zaifliklar aniqlanganda bloklash mexanizmi saqlanadi.

**`latest` git uchun dolzarblik kafolati emas.** `main` yoki faol `release/v*` tarmogʻiga birlashtirilgan tuzatishlar barqaror SemVer obrazi eʼlon qilinib, eʼlon qilish vazifasi `:latest` tegini yangilamaguncha (uning dayjesti shu SemVer bilan bir xil boʻladi) `:latest` tarkibiga kirmaydi. GitHub tuzatish allaqachon mavjudligini koʻrsatayotgan boʻlsa-yu, `latest` oʻzgarmagandek koʻrinsa, reliz tarmogʻini sinash uchun `:next` obrazini yuklab oling yoki SemVer tegini kuting.

| Maqsadingiz                                                                               | Ishlatiladigan variant                        |
| ----------------------------------------------------------------------------------------- | --------------------------------------------- |
| Oʻzgarmasligi shart boʻlgan GitOps / ishlab chiqarish muhiti                              | `:X.Y.Z` ni (yoki obraz dayjestini) belgilang |
| Eʼlon qilingan barqaror versiyalarni kuzatish va har bir relizda qayta yaratishga rozilik | `:latest`                                     |
| Eʼlon qilinmagan `release/v*` commitlarini sinash                                         | `:next` (ishlab chiqarish uchun emas)         |
| `main` tarmogʻini sinash                                                                  | `:main` (ishlab chiqarish uchun emas)         |

## Dockerʼda boshqaruv paneli yangilanishlari

Eʼlon qilingan obraz konteyneri oʻzini oʻzi almashtira olmaydi. OmniRoute konteyner ichida ishlayotganini aniqlasa (`.git` checkout mavjud emas va npm orqali oʻrnatilmagan boʻlsa), bosh boshqaruv panelidagi yangilanish banneri npm/git koʻrsatmalari oʻrniga ishga tushirilishi kerak boʻlgan host buyrugʻini nusxalash tugmasi bilan koʻrsatadi:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Xizmat nomi `AUTO_UPDATE_SERVICE` dan olinadi (standart qiymat — `omniroute`, yaʼni `docker-compose.selfhost.yml` ichidagi xizmat). `pull` faqat oʻzgaruvchan tegni (`latest`, `next`) yangilaydi; mahkamlangan `:X.Y.Z` tegi ishlatilsa, avval tegni tahrirlang.

### Host trigger fayli orqali bir bosishda yangilash

`/var/run/docker.sock` faylini mount qilmasdan **Hozir yangilash** funksiyasini ishlatish uchun (uni mount qilish konteynerga hostdagi root huquqini beradi — yuqoridagi `cli` profiliga oid ogohlantirishga qarang), OmniRoute xizmatida `DOCKER_UPDATE_TRIGGER_FILE` ni belgilang va hostda kuzatuvchini ishga tushiring:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Yoʻl `DATA_DIR` ichida boʻlishi shart (nisbiy qiymatlar unga nisbatan aniqlanadi); boshqa barcha yoʻllar rad etiladi. Shundan soʻng **Hozir yangilash** ushbu faylga `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` yozadi, `202` javobini qaytaradi va boshqaruv paneli yangi versiya ishga tushgunicha `/api/system/version` manzilini soʻrab turadi, keyin esa qayta yuklanadi. Bu rejimda OmniRoute hech qachon shell yoki Docker buyrugʻini ishga tushirmaydi. Boshqa barcha yangilash amallaridagi kabi, soʻrov faqat loopback/LAN mijozlaridan qabul qilinadi.

Bind orqali mount qilingan maʼlumotlar katalogi hostga kuzatish uchun barqaror yoʻl beradi. Namunaviy `systemd` unitlari (`/srv/omniroute` ni compose faylingiz va `data/` joylashgan katalogga moslang):

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

Xizmat olishdan oldin soʻrovni oʻchiradi, shu sababli muvaffaqiyatsiz bajarilish siklga tushib qolmaydi. `DOCKER_UPDATE_TRIGGER_FILE` belgilanmasa, boshqaruv paneli qoʻlda bajariladigan buyruq jarayonidan foydalanishda davom etadi.

## Mavjudligi: standart SQLite bitta nusxali

Birja Docker / Kubernetes OmniRoute hisoblanadi** bitta tugun jarayoni + bitta SQLite yozuvchi** . Mavjudligi yuqori** qo'llab-quvvatlanmaydi** bu topologiyada.

| Cheklov                                                        | Natija                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yagona yozuvchi                                                | Do** emas** bir xil SQLite fayliga qarshi bir nechta replikalarni ishga tushiring. Bu DB ni buzadi.                                                                                                                                                                                                        |
| Qayta yaratish / qayta ishga tushirish / HEALTHCHECK o'ldirish | **To'liq uzilish** parvozdagi SSE, asboblar paneli seanslari va xotira holati. Har bir ulangan mijoz tushadi. Bo'sh so'nggi nuqta oynasidagi yangi so'rovlar teskari proksini oladi**`502 Bad Gateway: Unknown error`** , OmniRoute JSON emas — mijozlar buni provayder xatosidan ajrata olmaydi (#11015). |
| `/healthz` bilan bir xil hodisa tsikli                         | Band bo'lgan katalog yoki siqish belgisi probalarni kechiktirishi mumkin; qisqa vaqt tugashidan so'ng uni qayta ishga tushiradi** faqat** replika.                                                                                                                                                         |

**Prob matritsasi** (shuningdek qarang: [Kubernetes tekshiruvi tavsiyalari](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Prob             | Maqsad                                                        | foydalanmang                                                   |
| ---------------- | ------------------------------------------------------------- | -------------------------------------------------------------- |
| Jonlilik         | TCP da `PORT` (standart `20128`) yoki yumshoq HTTP `/healthz` | `/api/monitoring/health`                                       |
| Tayyorlik        | HTTP `GET /healthz`                                           | Hodisa-loop bandini o'lik deb hisoblaydigan qattiq taym-autlar |
| Chuqur / odamlar | `/api/monitoring/health`                                      | Avtomatlashtirilgan kubelet jonliligi                          |

**Yangilanishlar:** har bir seans tushishini kuting. Iloji bo'lsa, mijozlarni to'kib tashlang; standart SQLite hech qanday yangilanish yo'q. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` konteyner nosog‘lom bo‘lganda ham yagona jarayonni almashtiradi — bir xil portlash radiusi.

Tayyor manifestlar va Helm diagrammasi `deploy/kubernetes/` va `deploy/helm/omniroute/` -da yashaydi — [Kubernetesni joylashtirish bo'yicha qo'llanmaga](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) qarang.

a uchun Kubernetes parchasi** bitta nusxa** (Qayta yaratish kerak; bitta SQLite faylga nisbatan `replicas` ko'tarmang):

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

`preStop` uyqusi kube xizmatining so'nggi nuqtalarini SIGTERM oldin tushirishga imkon beradi** yangi** trafik o'lish jarayoniga urishni to'xtatadi. Parvozdagi `/v1/responses` SSE og'ir vaznli kirish ijarasi (#11015) orqali `SHUTDOWN_TIMEOUT_MS` gacha (standart 30s) sarflanadi. Jarayonga yetib boradigan yangi so'rovlar `503` + `Retry-After: 5` oladi. O'zgartirish tayyor bo'lgunga qadar qayta yaratish bo'sh nuqta bo'shlig'i qiyin uzilish bo'lib qoladi - bu zond noto'g'ri konfiguratsiyasi emas, balki SQLite topologiyasi.

Tashqi Postgres / ko'p yozuvchi HA hisoblanadi** emas** hujjatlashtirilgan zaxira yo'li. Agar sizga HA kerak bo'lsa, bitta nusxani saqlang yoki loyiha sinovdan o'tkazgan va alohida hujjatlashtirilgan topologiyani ishga tushiring. Postgres/MySQL ishi [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) da yashaydi. Bu kemalar qadar, ko'paytirishning yagona qo'llab-quvvatlanadigan usuli** katta** `/v1/responses` sig'imi N mustaqil jarayon (keyingi bo'lim), bir jilddagi `replicas > 1` emas.

## Gorizontal masshtablash: N ta mustaqil jarayon

Bitta Node jarayoni — bu **bitta V8 uyumi**. Bir-birini qoplaydigan, hajmi ~3 MiB / ~750 ming tokenli ikkita kodlash agenti `POST /v1/responses` soʻrovi (RTK + Caveman) ~12 GiB da ushbu uyumning avariyali toʻxtashiga (`FATAL ERROR: Reached heap limit`) sabab boʻladi va 16 GiB cgroup xotirasini tugatishi mumkin. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ga qarang. Bu oʻlchov bir vaqtda bajariladigan uzoq `/v1/responses` soʻrovlari soni uchun mahsulotdagi qatʼiy maksimum emas, balki **xotira budjeti** haqidagi ogohlantirishdir. Ogʻir chatlarni qabul qilish avtomatik hisoblangan kiruvchi baytlar budjeti (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) bilan cheklanadi; u ayni V8/cgroup chegarasidan kelib chiqib belgilanadi — allaqachon oʻlchami belgilangan jarayonda uni oshirib qoʻyish (yoki eski `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` soʻrovlar soni chegarasini oʻrnatish) avariyali toʻxtash muammosini qayta yuzaga keltiradi. Kichik chatlar, `/healthz`, `/v1/models` va MCP bu cheklovga **kirmaydi**.

### Bitta jarayon: ikkitadan ortiq uzoq `/v1/responses`

**Sogʻlom** jarayon (uyum `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` qiymatidan past, standart qiymat `0.75`) jarayon miqyosidagi bajarilayotgan soʻrovlar bayt budjetida (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) hali joy boʻlsa, bir vaqtda ikkitadan ortiq uzoq `POST /v1/responses` soʻrovini bajarishi **mumkin**. Hajmi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` qiymatiga (standart qiymat 256 KiB) teng yoki undan katta boʻlgan soʻrov tanalari tuzilmasi murakkab soʻrovlar bilan bir xil ogʻir vaznli ruxsatni oladi va ayni [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` istisnosidan (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) foydalanadi. Bir vaqtda oʻnlab uzoq SSE mijozlarini ishlatish (operatorlarga koʻpincha 40–50 ta kerak boʻladi) mahsulotdagi qatʼiy “maksimal 2 ta” cheklovi emas, balki **xotira budjeti** masalasidir — uyum + asosiy/zaxira sigʻim slotlari + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ni mos ravishda oʻlchamlang. Bosim ostidagi uyum #7849 qaytib kelmasligi uchun baribir qayta urinish mumkin boʻlgan `503` javobi bilan yukni kamaytiradi.

**Uyumlar sonini koʻpaytirish** (mustaqil V8 old-space hududlari) uchun **hozir**:

| Bajaring                                                                                                                                                                                                                     | Bajarmang                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Har birida **oʻz** `DATA_DIR` / jildi boʻlgan **N ta konteyner/pod** ishga tushiring                                                                                                                                         | Bitta SQLite fayli uchun `replicas > 1` oʻrnating                                   |
| Bir vaqtda bajariladigan ogʻir soʻrovlar + sogʻlom zaxira sigʻimini uyum / bajarilayotgan soʻrovlar bayt budjetidan kelib chiqib belgilang; 1–2 — #7849 uchun konservativ standart qiymat, mahsulotdagi qatʼiy maksimum emas | Bitta jarayonga 8× RAM va cheklanmagan son chegarasini bering                       |
| Ixtiyoriy: **umumiy kvota hisoblagichlari** uchun `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                                                       | Redisʼni umumiy SQLite deb hisoblamang — u bunday emas                              |
| Provayder sirlarini har bir nusxaga koʻchiring (yoki ajratilgan boshqaruv panellariga rozi boʻling)                                                                                                                          | Barcha nusxalar uchun bitta boshqaruv paneli / bitta chaqiruv jurnalini kutmang     |
| Oldiga istalgan yuk muvozanatlagichini qoʻying; API kaliti yoki sessiya boʻyicha biriktirish yetarli                                                                                                                         | Muayyan yetkazib beruvchiga xos, oʻlchamni hisobga oluvchi middleware talab qilmang |

Uskuna: har bir nusxada bir vaqtda bajariladigan uzoq `/v1/responses` soʻrovlari soni **xotira budjeti** masalasidir (uyum + bajarilayotgan soʻrovlar baytlari / #10110). Mustaqil `DATA_DIR` larga ega `N` ta nusxa baribir uyumlar sonini koʻpaytiradi: xost RAM hajmi “N=8 boʻlgan bitta 16 GiB pod”ni emas, `N × cgroup` hajmini qoplashi kerak. Bitta SQLite faylida hech qachon `replicas > 1` ishlatmang.

Compose namunasi (ikkita uyum, ikkita jild — `deploy.replicas: 2` emas):

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

Jarayon ichidagi zichlik (HTTP izolyatidan tashqaridagi siqish) — [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Umumiy doimiy holatga ega bitta mantiqiy klaster — [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Docker ichidagi Gemini hududiy xatolari

Google AI Studio / Gemini API HTTP 400 javobini FAILED_PRECONDITION va
`User location is not supported for the API use.` xabari bilan qaytarishi mumkin. Xostdagi muvaffaqiyatli soʻrov
konteyner ham ayni chiquvchi yoʻnalishdan foydalanishini isbotlamaydi. DNS tartibi,
IPv4/IPv6 ulanishi, VPN marshrutizatsiyasi va sozlangan proksilar farq qilishi mumkin.
[Google qoʻllab-quvvatlaydigan hududlar](https://ai.google.dev/gemini-api/docs/available-regions)ni
hamda amaldagi ulanish yoʻnalishini tekshiring; bu xatoning oʻzi API kaliti notoʻgʻri ekanini bildirmaydi.

### Ulanishga xos proksini afzal koʻring

Taʼsirlangan Gemini ulanishi uchun OmniRoute’ning
[har bir ulanish uchun proksi konfiguratsiyasi](../ops/PROXY_GUIDE.md#4-level-proxy-system)dan
foydalaning, soʻng **Test Connection** va ayni model bilan kichik soʻrovni takrorlang.
Bu marshrutizatsiya oʻzgarishini faqat shu ulanish doirasida saqlaydi. Proksiga
konteyner ichidan ulanish mumkinligini va ulanish haqiqatda uni tanlayotganini tekshiring.
Yoʻnalishni oʻzgartirish yuqori darajadagi xizmatda hududiy muvofiqlikni kafolatlamaydi.

### Xost va konteyner tarmoqlarini taqqoslang

Autentifikatsiyalangan natijalarni taqqoslashda kalit, model va soʻrovni bir xil saqlang;
hisobotga hech qachon hisob maʼlumotlari, proksi parollari yoki toʻliq avtorizatsiya
sarlavhalarini joylamang. Avval OS rezolveri qaysi manzil oilalarini taklif qilishini
xostda va konteyner ichida bir xil buyruq yordamida tekshiring:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute`ni siz ishga tushirayotgan xizmat bilan almashtiring (masalan,
`omniroute-web`). Bu buyruqlar hisob maʼlumotlari yoki IP manzillarisiz manzil
oilalarini chiqaradi. Qaytarilgan `6` faqat IPv6 DNS natijasi mavjudligini koʻrsatadi:
u ishlaydigan IPv6 yoʻnalishi yoki API’ga kirish mavjudligini **isbotlamaydi**.
`curl` oʻrnatilgan joylarda har ikkala muhitda
`curl -4 -I https://generativelanguage.googleapis.com` va
`curl -6 -I https://generativelanguage.googleapis.com` natijalarini taqqoslang.
HTTP javobi, hatto u autentifikatsiyasiz xato boʻlsa ham, shu tekshiruv uchun ulanish
mavjudligini isbotlaydi; Gemini’dan foydalanish huquqini faqat autentifikatsiyalangan
model soʻrovi tekshiradi.

### Xost darajasidagi muqobil yechim: ishlaydigan IPv6 va rezolver siyosati

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) muallifi oʻz muhitida
konteyner IPv6’ini yoqish va glibc manzil tanlashini oʻzgartirish orqali kirishni
tiklagan. Buni muayyan muhitga xos muqobil yechim sifatida koʻring. Rezolver
afzalliklarini sozlashdan oldin xost IPv6’i ishlayotganini, konteynerning chiquvchi
trafik/marshrutizatsiyasini va fayervol qoidalarini tekshiring. Xususiy ULA manzilining
oʻzi ommaviy IPv6 ulanishi mavjudligini bildirmaydi.

Compose’ning standart tarmogʻiga allaqachon ulangan xizmatlar uchun ushbu parcha
oʻsha tarmoqda IPv6’ni yoqadi; xizmat, portlar, jildlar va konfiguratsiyaning qolgan
qismini saqlab qoling:

```yaml
networks:
  default:
    enable_ipv6: true
```

Nomlangan tarmoq uchun IPv6’ni xizmat amalda ulanadigan tarmoqda yoqing. Docker ULA
quyi tarmogʻini ajratishi mumkin; aniq va boshqa tarmoqlar bilan kesishmaydigan quyi
tarmoqni faqat tarmogʻingiz buni talab qilganda tanlang. [Docker IPv6 tarmogʻi](https://docs.docker.com/engine/daemon/ipv6/)
va [Compose tarmoq parametrlari](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)ga qarang.

**glibc asosidagi image**da `/etc/gai.conf` manzil tanlashni oʻzgartirishi mumkin.
Joriy repozitoriy Dockerfile’i Debian’dan foydalanadi; maxsus musl asosidagi image’lar
bu mexanizmdan foydalanmaydi. Xabar qilingan sozlama ULA yorligʻini
`label fc00::/7 6`dan `label fc00::/7 1`ga oʻzgartiradi. Image’ning toʻliq siyosat
jadvalidan boshlang va undagi boshqa yozuvlarni saqlab qoling: `label` yoki `precedence`
yozuvini qoʻshish ushbu standart jadvalni almashtiradi, shuning uchun faqat oʻzgartirilgan
qatorni oʻz ichiga olgan fayl yetarli emas.
[glibc konfiguratsiyasi maʼlumotnomasi](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
bu semantikani hujjatlashtiradi. Tekshirilgan faylni `/etc/gai.conf` manziliga faqat
oʻqish rejimida bind-mount qiling va oʻzgarishni qoʻllash uchun xizmatni qayta yarating.

Bu oʻsha konteynerdagi **barcha chiquvchi trafik** uchun OS manzil tanlashini
oʻzgartiradi. Bu har bir ilovani IPv6’ni tanlashga majburlamaydi: Node’ning DNS tartibi
va ulanish tanlovi ham muhim. Xususan, `--dns-result-order=ipv4first` IPv4’ni afzal
koʻradi va faqat IPv4 bilan bogʻliq nosozlik uchun yechim emas.
[Node DNS tartibi](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)ga qarang.

Xost darajasidagi har qanday oʻzgarishdan soʻng Gemini va boshqa provayderlaringizni
qayta sinang. Orqaga qaytarish uchun maxsus `gai.conf` ulanish nuqtasini olib tashlang,
avvalgi tarmoq konfiguratsiyasini tiklang va texnik xizmat oynasi davomida taʼsirlangan
xizmat/tarmoqni qayta yarating. Tarmoqni qayta yaratish unga ulangan boshqa
konteynerlarning ishini toʻxtatishi mumkin; doimiy maʼlumotlar jildini oʻchirmang.

## Muhim eslatmalar

- **SQLite WAL rejimi:** OmniRoute eng soʻnggi oʻzgarishlarni `storage.sqlite` fayliga checkpoint qilishi uchun `docker stop` buyrugʻiga yakunlanish imkonini berish kerak. Toʻplamdagi Compose fayllarida toʻxtatish uchun 40 soniyalik imtiyozli muddat allaqachon belgilangan. Agar tasvirni bevosita ishga tushirsangiz, `--stop-timeout 40` parametrini saqlang.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Muntazam/yozishdan oldingi zaxira nusxalari tashqi vositalar orqali boshqarilsa, `true` qiymatini belgilang. Mavjud maʼlumotlar bazasi migratsiyalari uchun hamon alohida ishonchli xavfsizlik nusxasi va ommaviy migratsiyadan himoya mexanizmi talab qilinadi.
- **Maʼlumotlarni doimiy saqlash:** Konteyner qayta ishga tushirilganda maʼlumotlar bazasi, kalitlar va konfiguratsiyalarni saqlab qolish uchun har doim `/app/data` manziliga hajm ulang.
- **Port konfiguratsiyasi:** Standart `20128` portini oʻzgartirish uchun `PORT` muhit oʻzgaruvchisini qayta belgilang.

## Shuningdek qarang

- [VMʼga joylashtirish qoʻllanmasi](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare sozlamalari
- [Fly.ioʼga joylashtirish qoʻllanmasi](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.ioʼga joylashtirish
- [Muhit konfiguratsiyasi](../reference/ENVIRONMENT.md) — Toʻliq `.env` maʼlumotnomasi
