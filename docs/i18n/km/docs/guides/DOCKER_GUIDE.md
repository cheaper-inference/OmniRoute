# 🐳 Docker Guide — OmniRoute (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> ឯកសារយោងពេញលេញសម្រាប់ការដាក់ឱ្យដំណើរការជាមួយ Docker។ សម្រាប់ការចាប់ផ្ដើមរហ័ស សូមមើល [ផ្នែក Docker ក្នុង README](../README.md#-docker)។

## មាតិកា

- [ដំណើរការរហ័ស](#quick-run)
- [ជាមួយឯកសារបរិស្ថាន](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profiles ដែលមាន](#available-profiles)
- [ការកំណត់រចនាសម្ព័ន្ធឧបករណ៍ CLI លើ host នៅពេល OmniRoute ដំណើរការក្នុង Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose សម្រាប់ Production](#production-compose)
- [ដំណាក់កាល Dockerfile](#dockerfile-stages)
- [អថេរបរិស្ថានសំខាន់ៗ](#critical-environment-variables)
- [Docker Compose ជាមួយ Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tags](#image-tags)
- [ការអាប់ដេត Dashboard ក្នុង Docker](#dashboard-updates-in-docker)
- [លទ្ធភាពប្រើប្រាស់៖ SQLite លំនាំដើមគាំទ្រ replica តែមួយ](#availability-default-sqlite-is-single-replica)
- [កំហុសតាមតំបន់របស់ Gemini ក្នុង Docker](#gemini-regional-errors-inside-docker)
- [ចំណាំសំខាន់ៗ](#important-notes)

---

## ដំណើរការរហ័ស

> **ចង់ self-host ដោយប្រើតែ command មួយមែនទេ?** សូមមើល
> [មគ្គុទ្ទេសក៍ Self-Host](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image ដែលបានបោះពុម្ពផ្សាយ +
> Redis, សម្រាប់តែ loopback, មិនចាំបាច់ជ្រើស profile)។ Quick Run ខាងក្រោមគឺជា
> វិធីប្រើ container តែមួយ សម្រាប់អ្នកប្រើប្រាស់ដែលកំពុងដំណើរការ Redis នៅកន្លែងផ្សេងរួចហើយ។

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ជាមួយឯកសារបរិស្ថាន

```bash
# ជាដំបូង សូមចម្លង និងកែសម្រួល .env
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
# Profile មូលដ្ឋាន (គ្មានឧបករណ៍ CLI)
docker compose --profile base up -d

# Profile CLI (មាន Claude Code, Codex និង OpenClaw ភ្ជាប់មកជាមួយ)
docker compose --profile cli up -d

# Profile host (ផ្តោតលើ Linux ជាចម្បង; mount CLI binaries របស់ host ជា read-only)
docker compose --profile host up -d

# Profile Web (Chromium/Playwright សម្រាប់ providers ដែលប្រើ web-session)
docker compose --profile web up -d

# ផ្សំ CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Profiles ដែលមាន

OmniRoute ផ្ដល់ជូន Compose profiles សម្រាប់ទម្រង់សំខាន់ៗនៃការដាក់ឱ្យដំណើរការ។ សូមជ្រើសរើសមួយដែលត្រូវនឹងបរិស្ថានរបស់អ្នក។

| Profile           | Service          | ពេលដែលគួរប្រើ                                                                                                                                  | Command                                      |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (លំនាំដើម) | `omniroute-base` | Server ដែលគ្មាន UI / runtime អប្បបរមា និងមិនមាន provider CLIs ភ្ជាប់មកជាមួយ                                                                    | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | លំហូរការងារបែប agentic ដែលហៅ `omniroute providers/setup/doctor` និង CLIs ដែលភ្ជាប់មកជាមួយ (Codex, Claude Code, Droid, OpenClaw)                | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux hosts ដែលចង់បានសិទ្ធិចូលប្រើ host CLIs ស្រដៀង `network_mode` ដោយ mount `~/.local/bin`, `~/.codex`, `~/.claude` ជាដើម ក្នុងរបៀប read-only | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | ដំណើរការ [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar លើ port `8317` សម្រាប់ upstream CLI proxying                      | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Web-session providers ដែលត្រូវការកម្មវិធីរុករក៖ `gemini-web`, `claude-web`, `claude-turnstile` (build `runner-web` ដោយរួមបញ្ចូល Chromium)      | `docker compose --profile web up -d`         |

> អាចផ្សំ profiles ច្រើនជាមួយគ្នាបាន៖ `docker compose --profile cli --profile cliproxyapi up -d`។

## ការកំណត់រចនាសម្ព័ន្ធឧបករណ៍ CLI លើ host នៅពេល OmniRoute ដំណើរការក្នុង Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` និងប៊ូតុង
**រក្សាទុកការកំណត់រចនាសម្ព័ន្ធ** របស់ dashboard សុទ្ធតែសរសេរឯកសារដូចជា `~/.codex/*.config.toml`។ ផ្លូវទាំងនោះ
មានន័យតែនៅលើម៉ាស៊ីនដែល CLI ដំណើរការពិតប្រាកដប៉ុណ្ណោះ។ ប្រសិនបើដំណើរការពួកវានៅក្នុង
container ការសរសេរនោះនឹងធ្លាក់ទៅក្នុង home ផ្ទាល់របស់ container (`/home/node` —
image ដំណើរការជា `USER node`) ដែល CLI ណាមួយនៅលើ host នឹងមិនអានវាឡើយ ហើយវានឹងត្រូវ
លុបចោលភ្លាមៗនៅពេល container ត្រូវបានបង្កើតឡើងវិញ។

OmniRoute រកឃើញករណីនេះ ហើយបដិសេធការសរសេរ ដោយផ្តល់សេចក្តីណែនាំជំនួសឱ្យ
ការរាយការណ៍ថាជោគជ័យដែលអ្នកមិនអាចប្រើបាន៖ CLI បញ្ចប់ដោយលេខកូដ `2` ហើយ API ឆ្លើយតប `422`
ជាមួយ `containerEphemeralTarget: true`។

### បានណែនាំ៖ ដំណើរការ CLI នៅលើ host និង OmniRoute ក្នុង Docker

Container ផ្តល់សេវា API; CLI កំណត់រចនាសម្ព័ន្ធឧបករណ៍នៅលើ host របស់អ្នក។

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # តម្រង់ CLI ទៅកាន់ container
omniroute setup-codex                      # សរសេរទៅ ~/.codex ពិតប្រាកដនៅលើ host របស់អ្នក
```

នេះជាជម្រើសត្រឹមត្រូវ នៅពេល Codex, Claude Code, Cursor ឬឧបករណ៍ស្រដៀងគ្នា ដំណើរការលើ
laptop របស់អ្នក — ដែលជាការរៀបចំប្រើប្រាស់ធម្មតា។

### ជម្រើសផ្សេង៖ bind-mount ថត config របស់ host (profile `host`)

ប្រសិនបើអ្នកចង់ឱ្យ container ខ្លួនឯងសរសេរ config របស់ host សូម mount
ថតទាំងនោះចូល ហើយតម្រង់ `CLI_CONFIG_HOME` ទៅកាន់ root របស់ mount។ Profile `host`
បានធ្វើដូច្នេះរួចហើយ៖

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount គឺជាអ្វីដែលធ្វើឱ្យ path អាចទុកចិត្តបាន៖ OmniRoute អាន
`/proc/self/mountinfo` ហើយអនុញ្ញាតឱ្យសរសេរទៅកាន់ path ដែលបាន mount (និងថត
ដែលថតកូនរបស់វាជា mount ដែលត្រូវគ្នាពិតប្រាកដនឹងទម្រង់ `/host-home` ខាងលើ) ខណៈដែល
នៅតែបដិសេធ path ដែលមិនបាន mount។

### ច្រកបន្ទាន់៖ កំណត់រចនាសម្ព័ន្ធ CLI ផ្ទាល់របស់ container (ប្រើដោយប្រុងប្រយ័ត្ន)

នៅពេល CLI ពិតជាស្ថិតនៅក្នុង container (profile `cli`) ការសរសេរនោះ
គឺជាចេតនា។ បញ្ជូន `--allow-container-write` ទៅកាន់ពាក្យបញ្ជា `setup-*` ណាមួយ ឬកំណត់
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` សម្រាប់ server។ ការសរសេរនឹងបន្ត
ជាមួយការព្រមានថា វានឹងមិននៅសល់ក្រោយ container ត្រូវបានបង្កើតឡើងវិញទេ។

> **ការព្រមានសុវត្ថិភាព — profile `cli` + mount `docker.sock`។**
> Profile `cli` ធ្វើ bind-mount `/var/run/docker.sock` ដើម្បីឱ្យ
> auto-updater នៅក្នុង container អាចបង្កើត stack ឡើងវិញតាមរយៈ daemon របស់ host
> (`src/lib/system/autoUpdate.ts` ពិនិត្យរក socket នោះ ហើយរំលង
> ផ្លូវ Docker នៅពេលវាមិនមាន)។ Socket នោះគឺជា **ព្រំដែនទំនុកចិត្តកម្រិត root
> របស់ host**៖ អ្វីក៏ដោយដែលអាចចូលប្រើវាបាន អាចបញ្ជា Docker daemon របស់ host ជា
> root — វាអាចបង្កើត ពិនិត្យ បញ្ឈប់ និងលុប container ណាមួយនៅលើ host។
> ផលប៉ះពាល់៖
>
> 1. **កុំបើក port របស់ profile `cli` ទៅកាន់ network ដាច់ខាត។** Publish
>    វានៅលើ `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profile `cli` ដែលអាចចូលដំណើរការបានពី LAN នឹងបម្លែង RCE កម្រិត dashboard ណាមួយទៅជា
>    ការកាន់កាប់ host ទាំងស្រុង។
> 2. **កុំ bind ថតបន្ថែមណាមួយរបស់ host ចូលក្នុង profile `cli`។**
>    Docker socket រួមជាមួយ mount បន្ថែមណាមួយ នឹងផ្តល់ឱ្យ container នូវសិទ្ធិ
>    អាន/សរសេរពេញលេញទៅកាន់ filesystem និង config របស់ host។ ប្រសិនបើអ្នកត្រូវការឱ្យឧបករណ៍មួយ
>    មើលឃើញ project សូមដំណើរការវានៅ local ជាមួយ binary របស់ CLI — កុំ mount វា
>    ចូលក្នុង container `cli`។
>
> ប្រសិនបើអ្នកមិនត្រូវការ auto-update នៅក្នុង container ទេ សូមទុក profile `cli` ឱ្យបិទ
> (`COMPOSE_PROFILES=core,redis` ឬខ្លីជាងនេះ)។ Profile ផ្សេងទៀតមិន
> mount Docker socket ទេ។
>
> សូមមើល `docs/security/MITM-TPROXY-DECRYPT.md` (git; មិនត្រូវបាន compile ចូលក្នុង `/docs`) សម្រាប់គំរូគំរាមកំហែងដែលពាក់ព័ន្ធ
> ជុំវិញ MITM និង `docs/security/SUPPLY_CHAIN.md` សម្រាប់
> ខ្សែសង្វាក់ប្រភពដើមនៃ binary `codex`/`claude-code`/`droid`/`openclaw`។

## Redis Sidecar

OmniRoute ពឹងផ្អែកលើ Redis ដើម្បីគាំទ្រកម្មវិធីកំណត់អត្រាបែបចែកចាយ និងឃ្លាំងសម្ងាត់រួម។ សេវា `redis` ត្រូវបានកំណត់ **ជានិច្ច** នៅក្នុង `docker-compose.yml` (វាមិនមានការកំណត់តាម profile ទេ) ហើយចាប់ផ្ដើមជាមួយ profile ផ្សេងទៀតណាមួយ។

| ព័ត៌មានលម្អិត                    | តម្លៃ                                      |
| -------------------------------- | ------------------------------------------ |
| Image                            | `redis:7-alpine`                           |
| ឈ្មោះ container                  | `omniroute-redis`                          |
| Port ខាងក្នុង                    | `6379`                                     |
| Port របស់ host (អាចកំណត់ជំនួស)   | `REDIS_PORT` (លំនាំដើមជា `6379`)           |
| ការចងភ្ជាប់ host (អាចកំណត់ជំនួស) | `REDIS_BIND_HOST` (លំនាំដើមជា `127.0.0.1`) |
| Volume                           | `omniroute-redis-data` → `/data`           |
| ការពិនិត្យសុខភាព                 | `redis-cli ping` (ចន្លោះពេល 10 វិនាទី)     |

អថេរបរិស្ថានដែលពាក់ព័ន្ធ៖

- `REDIS_URL` — ខ្សែអក្សរតភ្ជាប់ដែលត្រូវបានបញ្ចូលទៅក្នុងកម្មវិធី (`redis://redis:6379` ជាលំនាំដើម)។
- `REDIS_PORT` — ការផ្គូផ្គង port ខាង host សម្រាប់ container របស់ Redis។
- `REDIS_BIND_HOST` — interface របស់ host ដែល port ត្រូវបានផ្សព្វផ្សាយនៅលើវា។ លំនាំដើមជា `127.0.0.1`។

> **មូលហេតុដែលប្រើ loopback ជាលំនាំដើម៖** sidecar ដំណើរការដោយគ្មាន `requirepass` ហើយ container
> របស់កម្មវិធីចូលប្រើវាតាមបណ្ដាញ compose (`redis:6379`) — port ដែលបានផ្សព្វផ្សាយមាន
> សម្រាប់តែឧបករណ៍នៅខាង host ប៉ុណ្ណោះ (`redis-cli`, `npm run dev` នៅលើម៉ាស៊ីនមូលដ្ឋាន)។ ការផ្សព្វផ្សាយនៅលើ
> `0.0.0.0` នឹងធ្វើឱ្យ Redis ដែលគ្មានការផ្ទៀងផ្ទាត់អត្តសញ្ញាណអាចចូលប្រើបានពីគ្រប់ host នៅលើ LAN របស់អ្នក។ ប្រសិនបើអ្នកកំណត់
> `REDIS_BIND_HOST=0.0.0.0` សូមបន្ថែម `--requirepass` ទៅក្នុង `command:` របស់សេវាផងដែរ។

**ការបិទ Redis** មិនត្រូវបានណែនាំទេ (កម្មវិធីកំណត់អត្រានឹងបន្ថយទៅប្រើមុខងារបម្រុងទុកក្នុងអង្គចងចាំ)។ ប្រសិនបើចាំបាច់ អ្នកអាចលុប/ដាក់ជា comment នូវប្លុកសេវា `redis:` ក្នុង `docker-compose.yml` ឬកំណត់ scale របស់វាទៅសូន្យ៖

```bash
docker compose up -d --scale redis=0
```

## Production Compose

សម្រាប់ snapshot ផលិតកម្មដាច់ដោយឡែកដែលដំណើរការទន្ទឹមជាមួយ dev សូមប្រើ `docker-compose.prod.yml`។

| ព័ត៌មានលម្អិត                | តម្លៃ                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| ឯកសារ                        | `docker-compose.prod.yml`                                                                     |
| Port ផ្ទាំងគ្រប់គ្រងលំនាំដើម | `PROD_DASHBOARD_PORT=20130` (ផ្គូផ្គងទៅ `${DASHBOARD_PORT:-20128}` ខាងក្នុង)                  |
| Port API លំនាំដើម            | `PROD_API_PORT=20131`                                                                         |
| Image                        | `omniroute:prod` (បាន build ពី target `runner-cli`)                                           |
| Container របស់ Redis         | `omniroute-redis-prod` (`redis:8.6.2`, ប្រើ volume `redis-prod-data` ដាច់ដោយឡែក)              |
| Volume ទិន្នន័យ              | `omniroute-prod-data` (មានឈ្មោះ និងរក្សាទុកបន្តក្រោយការ rebuild)                              |
| ការពិនិត្យសុខភាព             | `node healthcheck.mjs` + `redis-cli ping` ដោយ `depends_on` ត្រូវបានកំណត់ឱ្យរង់ចាំសុខភាព Redis |

របៀបប្រើ៖

```bash
# Build និងចាប់ផ្ដើម stack ផលិតកម្ម
docker compose -f docker-compose.prod.yml up -d --build

# បង្ហាញ log ជាបន្តបន្ទាប់
docker compose -f docker-compose.prod.yml logs -f

# បិទ stack (រក្សាទុក volume)
docker compose -f docker-compose.prod.yml down
```

Stack ផលិតកម្មដំណើរការស្របគ្នាជាមួយ dev compose (មានឈ្មោះ container, port និង volume ខុសគ្នា) ដូច្នេះអ្នកអាចបន្តអភិវឌ្ឍនៅលើម៉ាស៊ីនមូលដ្ឋាន ខណៈដែលប្រព័ន្ធផលិតកម្មនៅតែដំណើរការ។

## ដំណាក់កាល Dockerfile

ឃ្លាំងកូដនេះផ្តល់ជូន Dockerfile ពហុដំណាក់កាល (`Dockerfile`)។ មានដំណាក់កាលចំនួនបួនដែលអាចប្រើបាន; សូមជ្រើសរើស `target` ឱ្យត្រឹមត្រូវសម្រាប់ករណីប្រើប្រាស់របស់អ្នក។

| ដំណាក់កាល     | Image មូលដ្ឋាន        | គោលបំណង                                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ដំឡើង dependencies (`npm ci --legacy-peer-deps`) និងដំណើរការ `npm run build` (តាមលំនាំដើមប្រើ Turbopack — សូមមើលធនធានពេល build ខាងក្រោម)                                                                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | បរិស្ថាន runtime សម្រាប់ production ជាមួយលទ្ធផល standalone របស់ Next.js។ **មិនមាន provider CLI ភ្ជាប់មកជាមួយទេ។**                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | បន្ថែម `git`, `docker.io`, `docker-compose` និង CLI សកល៖ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`។ **សូមជ្រើសរើសវាសម្រាប់លំហូរការងារបែប agentic។**                                                                                                                             |
| `runner-web`  | `runner-base`         | បន្ថែម Playwright + កម្មវិធីរុករក Chromium (`--with-deps`) សម្រាប់ provider នៃ web-session៖ `gemini-web`, `claude-web`, `claude-turnstile`។ **សូមជ្រើសរើសវានៅពេលអ្នកប្រើ provider ទាំងនោះ** — image ធម្មតានឹងបរាជ័យនៅពេលមាន request ប្រសិនបើគ្មានវា (សូមមើលកំណត់សម្គាល់ `-web` ក្រោម Release Channels)។ |

Build target ជាក់លាក់ដោយដៃ៖

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ធនធានពេល build

build args ចំនួនបីគ្រប់គ្រងការប្រើប្រាស់ធនធានរបស់ដំណាក់កាល `builder`។ ពួកវាសម្រាប់តែពេល build ប៉ុណ្ណោះ —
`OMNIROUTE_MEMORY_MB` (ខាងក្រោម) គឺជាការកំណត់ runtime ដាច់ដោយឡែក។

| Build arg                   | លំនាំដើម | ឥទ្ធិពល                                                                                               |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` build ដោយប្រើ webpack៖ ប្រើអង្គចងចាំកម្រិតកំពូលទាបជាង ប៉ុន្តែយឺតជាង។ `1` ជ្រើសប្រើ Turbopack។     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | កម្រិតអតិបរមា heap របស់ V8 (`--max-old-space-size`) សម្រាប់ `next build` ដែលត្រូវបានបង្កើតជាដំណើរការ។ |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | ផ្តល់តម្លៃទៅ `CIRCLE_NODE_TOTAL`; Next កំណត់ `workers = N - 1` សម្រាប់ការប្រមូលទិន្នន័យទំព័រ។         |

`OMNIROUTE_BUILD_WORKERS` គឺជាតម្លៃដែលត្រូវបង្កើនលើ builder ដែលមានធនធានខ្ពស់ ហើយក៏ជាតម្លៃដែលត្រូវ
សង្ស័យផងដែរ នៅពេល build ដែលមានធនធានកំណត់បានបរាជ័យ **បន្ទាប់ពី** `✓ Compiled successfully`។ worker
ទិន្នន័យទំព័រនីមួយៗគឺជា process ដាច់ដោយឡែក ហើយ process មេ `next build` ក៏ដូចគ្នា;
ការធ្វើតេស្តផ្ទាល់លើ VPS (issue #7518) បានវាស់ឃើញ peak RSS របស់ process នីមួយៗនៅ
~4.5 GB ដោយមិនពាក់ព័ន្ធនឹង flag heap `NODE_OPTIONS` (Turbopack compile ដោយប្រើ
អង្គចងចាំ native/Rust នៅក្រៅ V8 heap)។ តម្លៃលំនាំដើម `2` (→ worker 1, សរុប 2
processes) ត្រូវបានកំណត់សម្រាប់ runner ដែល host ដោយ GitHub មាន RAM 16 GB / 4 vCPU ដែល
pipeline សម្រាប់ publish ប្រើប្រាស់។ នៅតម្លៃ `8` (→ workers 7) runner នោះបានអស់អង្គចងចាំ ហើយ
buildkit បានធ្វើឱ្យជំហាននោះបរាជ័យជាមួយ `ResourceExhausted: ... cannot allocate memory`;
`3` (→ workers 2) នៅតែមិនអាចដំណើរការបាន បន្ទាប់ពី RSS ក្នុងមួយ process ត្រូវបានវាស់
ដោយផ្ទាល់ជំនួសឱ្យការសន្និដ្ឋាន។ `tests/unit/docker-build-memory-budget.test.ts`
ធ្វើការគណនាដោយផ្អែកលើតួលេខដែលបានវាស់ ហើយនឹងបរាជ័យ ប្រសិនបើការកំណត់ណាមួយ
កើនលើសសមត្ថភាពរបស់ runner។

Turbopack compile ដោយប្រើអង្គចងចាំ native Rust ដែលស្ថិតនៅ **ក្រៅ** V8 heap ដូច្នេះ
`OMNIROUTE_BUILD_MEMORY_MB` មិនអាចកំណត់ព្រំដែនវាបានទេ។ លើ host ដែលមានព្រំដែនអង្គចងចាំ
build នឹងត្រូវ OOM killer បញ្ចប់ដោយ SIGKILL ដោយមិនមានសារកំហុសអ្វីទាំងអស់ — វាគ្រាន់តែ
ឈប់នៅពាក់កណ្តាល `Creating an optimized production build` ដែលមើលទៅដូចជាជាប់គាំង ជាជាង
អស់អង្គចងចាំ។ នេះជាមូលហេតុដែល `Dockerfile` ប្រើ webpack ជាលំនាំដើម
(`OMNIROUTE_USE_TURBOPACK=0`) ខុសពី `npm run dev` / `npm run build` ដែល
Turbopack ជាលំនាំដើមរបស់កូដ៖ `docker build .` ធម្មតាដែលគ្មាន build args (ដែល
Railway និង host ដំឡើងដោយចុចតែម្តងផ្សេងទៀតដំណើរការ) មិនត្រូវបរាជ័យដោយស្ងាត់ស្ងៀមលើ
builder ដែលមានការកំណត់អង្គចងចាំនោះទេ។ image ដែលបាន publish រួចហើយបានបញ្ជូន
`OMNIROUTE_USE_TURBOPACK=0` យ៉ាងជាក់លាក់នៅក្នុង `docker-publish.yml`។ លើ builder
ដែលមាន RAM ច្រើន សូមជ្រើសប្រើ Turbopack ដើម្បីឱ្យ build លឿនជាងមុន៖

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ត្រូវបានបើក ដូច្នេះ `next build` ដំណើរការទាំង process មេ **និង** process
worker ហើយ process នីមួយៗគោរពតាម `OMNIROUTE_BUILD_MEMORY_MB` ដោយឡែកពីគ្នា។ កំណត់ព្រំដែន
container ឱ្យខ្ពស់ជាងតម្លៃនោះប្រហែលពីរដង មិនមែនត្រឹមតែមួយដងទេ។

បានវាស់លើ code tree នេះ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`)៖

| Bundler   | ព្រំដែន container | លទ្ធផល                                     |
| --------- | ----------------- | ------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB    | ត្រូវបាន OOM-kill នៅទាំងពីរ ដោយស្ងាត់ស្ងៀម |
| webpack   | 8 GiB             | build worker ត្រូវបានបញ្ចប់ដោយ SIGKILL     |
| webpack   | 12 GiB            | ជោគជ័យ ដោយឡើងដល់កម្រិតកំពូល 11.1 GiB       |

### តម្លៃលំនាំដើមសម្រាប់ runtime

តម្លៃលំនាំដើមដែល export ដោយ `runner-base`៖ `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`។

ឥរិយាបថអង្គចងចាំនៅក្នុង Docker៖

- Image នេះកំណត់ `OMNIROUTE_MEMORY_MB=1024` ហើយទាញយក `NODE_OPTIONS=--max-old-space-size=1024` ពីវា។
- ដំណើរការ server ពិតប្រាកដត្រូវបានចាប់ផ្ដើមដោយ standalone launcher ដែលអាន `OMNIROUTE_MEMORY_MB` ហើយបន្ថែម `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`។
- Node ប្រើតម្លៃ `--max-old-space-size` ដែលបានធ្វើម្តងទៀតនៅចុងក្រោយ ដូច្នេះការកំណត់ `OMNIROUTE_MEMORY_MB` គ្រប់គ្រងដែនកំណត់ heap ជាក់ស្តែងរបស់ Docker។
- ដោយសារ image តែងតែកំណត់វា fallback ដែលកែតម្រូវតាម RAM របស់ launcher ផ្ទាល់មិនដែលត្រូវបានអនុវត្តក្រោម Docker ទេ។ បង្កើនវាឱ្យច្បាស់លាស់តាម workload (តារាងខាងក្រោម)។ `2048` នៅតែតូចពេកសម្រាប់ coding-agent `/v1/responses`។

### RAM ពេលដំណើរការសម្រាប់ coding agents

តម្លៃលំនាំដើម 1 GiB របស់ Docker គឺជាកម្រិតអប្បបរមាសម្រាប់ dashboard/light-chat មិនមែនជាទំហំសម្រាប់ production ទេ។ Body វែងៗរបស់ `POST /v1/responses` (សាររាប់រយ និង tools រាប់សិប) រក្សាទុកក្រាហ្វជាច្រើននៅក្នុង memory អំឡុងពេល compression។ Request ពីរដែលត្រួតគ្នា និងមានទំហំប្រហែល ~3 MiB / ~750k-token បានធ្វើឱ្យ V8 បញ្ឈប់នៅ old-space ទំហំ **12 GiB** (`FATAL ERROR: Reached heap limit`) ហើយក៏បានជួប cgroup OOM ទំហំ 16 GiB ផងដែរ។ សូមមើល [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)។

កំណត់ទំហំ **cgroup `--memory` ឱ្យខ្ពស់ជាង heap** — native buffers, SQLite និងទិន្នន័យបណ្ដោះអាសន្នរបស់ compression ស្ថិតនៅក្រៅ V8។

| Workload                                   | `OMNIROUTE_MEMORY_MB`       | Container / cgroup             | កំណត់សម្គាល់                                                                                                   |
| ------------------------------------------ | --------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Dashboard និង light chat មួយ               | `1024` (លំនាំដើមរបស់ image) | ≥2 GiB                         |                                                                                                                |
| Coding agent មួយ (Claude/Codex/Grok)       | `8192`                      | ≥10 GiB                        | `/v1/responses` សម្រាប់ session តែមួយជាទូទៅ                                                                    |
| `/v1/responses` វែងពីរដំណើរការព្រមគ្នា     | `10240`–`12288`             | ≥12–16 GiB                     | បានវាស់ឃើញថា V8 បញ្ឈប់នៅ heap ប្រហែល ~12 GiB                                                                   |
| Context វែងបី ឬច្រើនជាងនេះដំណើរការព្រមគ្នា | កុំដំណើរការលើ process តែមួយ | ដំណើរការតាមលំដាប់ / RAM បន្ថែម | ជាលំនាំដើម ការទទួល workload ធ្ងន់ៗកំណត់ត្រឹម 1 in-flight; ការបង្កើនវាដោយគ្មាន RAM នឹងធ្វើឱ្យការបញ្ឈប់កើតឡើងវិញ |

`omniroute serve` លើ bare metal កែតម្រូវទៅប្រហែល ~35% នៃ RAM (កំណត់ក្នុងចន្លោះ `[512, 4096]`) នៅពេល `OMNIROUTE_MEMORY_MB` **មិនត្រូវបានកំណត់**។ Docker តែងតែកំណត់វាជា `1024` ដូច្នេះការកែតម្រូវនោះមិនដែលដំណើរការនៅក្នុង image ផ្លូវការទេ។

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## អថេរបរិស្ថានសំខាន់ៗ

ក្រៅពីតម្លៃលំនាំដើមដែលបានចងក្រងជាឯកសារនៅក្នុង [ENVIRONMENT.md](../reference/ENVIRONMENT.md) អថេរខាងក្រោមមានសារៈសំខាន់បំផុតនៅពេលដំណើរការក្រោម Docker៖

| អថេរ                          | គោលបំណង                                                                                                                                                                                                                                                         | លំនាំដើម                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | ពាក្យសម្ងាត់រួមសម្រាប់ WebSocket bridge។ **តម្រូវឱ្យមានក្នុងបរិស្ថាន production** — កំណត់វាជាខ្សែអក្សរចៃដន្យដែលមានសុវត្ថិភាពខ្ពស់។                                                                                                                              | មិនបានកំណត់ (ត្រូវតែផ្តល់) |
| `REDIS_URL`                   | ខ្សែអក្សរតភ្ជាប់សម្រាប់ rate limiter / cache backend                                                                                                                                                                                                            | `redis://redis:6379`       |
| `REDIS_PORT`                  | ច្រកនៅខាង host សម្រាប់ Redis container ដែលភ្ជាប់មកជាមួយ                                                                                                                                                                                                         | `6379`                     |
| `REDIS_BIND_HOST`             | host interface ដែលច្រក Redis ភ្ជាប់មកជាមួយត្រូវបានដាក់ឱ្យប្រើប្រាស់លើវា (loopback លុះត្រាតែអ្នកបន្ថែម AUTH)                                                                                                                                                     | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | path របស់ host ដែលបាន mount ទៅក្នុង profile `cli` នៅ `/workspace/omniroute` សម្រាប់ workflow ធ្វើបច្ចុប្បន្នភាពដោយខ្លួនឯង                                                                                                                                       | `.` (ថតបច្ចុប្បន្ន)        |
| `OMNIROUTE_MEMORY_MB`         | កម្រិតអតិបរមា Node heap នៅ runtime សម្រាប់ Docker standalone server; វាជំនួសតម្លៃលំនាំដើមរបស់ image ខាងលើ។ សម្រាប់ coding agents៖ `8192`+ (សូមមើល [RAM នៅ runtime](#runtime-ram-for-coding-agents))។                                                            | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | កំណត់ច្រកដែលបើកបង្ហាញសម្រាប់ dashboard (20128) និង API (20129) ជំនួសតម្លៃលំនាំដើម                                                                                                                                                                               | `20128` / `20129`          |
| `APP_BIND_HOST`               | host interface ដែល docker-compose បើកផ្សាយច្រក dashboard/API/live-WS លើវា។ ជាមួយ `REQUIRE_API_KEY=false` (តម្លៃលំនាំដើម) `0.0.0.0` នឹងបើក anonymous proxy `/v1` ទៅកាន់ LAN — គួរពង្រីកការចូលប្រើតែនៅពេលប្រើ `REQUIRE_API_KEY=true` ឬមាន reverse proxy នៅខាងមុខ។ | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | host interface ដែល docker-compose បើកផ្សាយ sidecar `cliproxyapi` លើវា — data volume របស់វាផ្ទុកព័ត៌មានសម្គាល់អត្តសញ្ញាណរបស់ provider។                                                                                                                           | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | ថតដែល runtime plugin scanner អាន និងដំឡើង plugin ទៅក្នុង។ កំណត់វានៅពេល plugin ត្រូវបាន bind-mount៖ តម្លៃលំនាំដើមអាស្រ័យតាម `HOME` ដែល image មិនចាំបាច់ export នោះទេ។                                                                                            | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | URL subpath នៅពេល app ត្រូវបានបើកផ្សាយនៅពីក្រោយ reverse proxy (ឧ. `/omniroute`)                                                                                                                                                                                 | _(ទទេ = root)_             |
| `NEXT_PUBLIC_BASE_URL`        | origin សាធារណៈសម្រាប់ browser ដែលរួមបញ្ចូល subpath (ឧ. `https://host/omniroute`)                                                                                                                                                                                | មិនបានកំណត់                |
| `PROD_DASHBOARD_PORT`         | ច្រក dashboard នៅខាង host សម្រាប់ `docker-compose.prod.yml`                                                                                                                                                                                                     | `20130`                    |
| `CLIPROXYAPI_PORT`            | ច្រកនៅខាង host សម្រាប់ sidecar `cliproxyapi`                                                                                                                                                                                                                    | `8317`                     |

## ប្រូកស៊ីបញ្ច្រាសលើផ្លូវរង (Traefik / nginx)

`basePath` របស់ Next.js ត្រូវបានចងក្រងបញ្ចូលទៅក្នុងបណ្ដុំ standalone។ OmniRoute កត់ត្រាតម្លៃដែលបានបង្កប់នេះនៅក្នុងឯកសារ sentinel មួយនៅថតគោលរបស់កម្មវិធី (សរសេរក្នុងអំឡុងពេល `npm run build`; អានដោយ `scripts/docker/ensure-docker-base-path.mjs`) ហើយប្រៀបធៀបវាជាមួយ `OMNIROUTE_BASE_PATH` នៅពេល container ចាប់ផ្ដើម។ នៅពេលតម្លៃទាំងពីរខុសគ្នា ហើយ image ត្រូវបាន build សម្រាប់ថតគោលរបស់ដែន entrypoint នឹងសរសេរឡើងវិញនូវ manifest របស់ standalone, literal `basePath`/`assetPrefix` ដែលបានបង្កប់ (Next 16 បង្ហាញ URL asset របស់ SSR ពី `assetPrefix` តែប៉ុណ្ណោះ — patcher ចម្លងផ្លូវរងទៅក្នុងវាផងដែរ), URL asset `/_next/static` ដែលបានបង្កប់ (manifest យោងរបស់ client, ការនាំចូល media, ទំព័រកំហុសដែលបាន render ជាមុន) និង shim `process.env` របស់ client មុនពេល `node dev/run-standalone.mjs` ដំណើរការ។

### ការ build ដោយ Compose (បានណែនាំ)

កំណត់អថេរទាំងពីរនៅក្នុង `.env` បន្ទាប់មក build ឡើងវិញ ដើម្បីឱ្យ image និង runtime ត្រូវគ្នា៖

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` បញ្ជូនបន្ត `OMNIROUTE_BASE_PATH` ជា Docker build-arg និងជាអថេរបរិស្ថាន runtime។

### Root image ដែលបាន build ជាមុន + ផ្លូវរង runtime

Image `diegosouzapw/omniroute:*` ដែលបានចេញផ្សាយ ត្រូវបាន build សម្រាប់ថតគោលរបស់ដែន។ អ្នកនៅតែអាចកំណត់ `OMNIROUTE_BASE_PATH` នៅពេល runtime បាន; container នឹង patch បណ្ដុំម្ដងនៅពេលចាប់ផ្ដើម។ ប្រើវាគូជាមួយ public origin ដែលត្រូវគ្នា៖

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

កំណត់រចនាសម្ព័ន្ធប្រូកស៊ីបញ្ច្រាសឱ្យបញ្ជូនបន្តផ្លូវខាងក្រៅ **ទាំងមូល** (កុំដកបុព្វបទចេញ)។ Traefik គួរតែបញ្ជូន `PathPrefix(`/omniroute`)` ទៅកាន់ container ដោយគ្មាន `StripPrefix` ដូច្នេះ Next.js នឹងទទួលបាន `/omniroute/...` និងផ្ដល់ asset ពី `/omniroute/_next/...`។

Docker healthcheck ពិនិត្យ endpoint lifecycle ស្រាល `/healthz` ដែលមានបុព្វបទជា `OMNIROUTE_BASE_PATH` កំពុងប្រើ។ `/api/monitoring/health` នៅតែអាចប្រើបានសម្រាប់ការធ្វើរោគវិនិច្ឆ័យដោយមនុស្ស/dashboard; ដើម្បីកំណត់ឱ្យ HEALTHCHECK របស់ container ត្រឡប់ទៅពិនិត្យវាវិញ (ឧទាហរណ៍ សម្រាប់ការអនុវត្តការត្រួតពិនិត្យសុខភាពស៊ីជម្រៅ) សូមកំណត់ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`។ ផ្លូវនោះគឺជាការត្រួតពិនិត្យ **ស៊ីជម្រៅ** (DB + សេចក្ដីសង្ខេបការត្រួតពិនិត្យ) — សមស្របសម្រាប់ `HEALTHCHECK` ដែលដំណើរការមិនញឹកញាប់របស់ Docker ប្រសិនបើអ្នកជ្រើសរើសប្រើវាវិញ ប៉ុន្តែ **មិនសមស្រប** សម្រាប់ចន្លោះពេល `livenessProbe` របស់ Kubernetes ទេ។

សម្រាប់ orchestrator (Kubernetes, Nomad ជាដើម)៖

| Probe           | គួរប្រើ                                                          | គួរជៀសវាង                                               |
| --------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| Liveness        | HTTP `GET /livez` ឬ TCP លើ port ចម្បង (`PORT`, លំនាំដើម `20128`) | ការប្រើ `/api/monitoring/health` ជា liveness            |
| Readiness       | HTTP `GET /healthz`                                              | timeout ខ្លីពេកដែលចាត់ទុក event-loop ដែលរវល់ថាបានស្លាប់ |
| Deep / blackbox | `/api/monitoring/health`                                         | —                                                       |

`/healthz` រាយការណ៍ពី lifecycle របស់ process (`ok` / `starting` / `stopping`)។ `/livez` ពិនិត្យតែថា process នៅដំណើរការ (200 រាល់ពេល handler អាចដំណើរការ; វាមិនរង់ចាំ readiness ទេ)។ ទាំងពីរនៅតែដំណើរការលើ Node event loop ដូចគ្នានឹងការដោះស្រាយ request ដូច្នេះការងារ catalog ឬ compression ដែលប្រើ CPU ខ្លាំង អាចធ្វើឱ្យវាយឺត — រវល់ ≠ ស្លាប់។ គួរប្រើ TCP liveness ប្រសិនបើ HTTP probe អស់ពេល។ ការណែនាំពេញលេញអំពី probe៖
[មគ្គុទ្ទេសក៍ការត្រួតពិនិត្យ — អនុសាសន៍អំពី probe របស់ Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)។

## Docker Compose ជាមួយ Caddy (HTTPS Auto-TLS)

OmniRoute អាចត្រូវបានដាក់ឱ្យចូលប្រើដោយសុវត្ថិភាព ដោយប្រើការផ្ដល់ SSL ដោយស្វ័យប្រវត្តិរបស់ Caddy។ សូមប្រាកដថា DNS A record របស់ដែនអ្នកចង្អុលទៅកាន់អាសយដ្ឋាន IP របស់ម៉ាស៊ីនមេអ្នក។

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
      # ប្រភពដើមដែលបង្ហាញចំពោះកម្មវិធីរុករក សម្រាប់ OAuth callbacks តំណផ្ទាំងគ្រប់គ្រង និង URL សាធារណៈដែលបានបង្កើត។
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL ខាងក្នុងពីម៉ាស៊ីនមេទៅម៉ាស៊ីនមេ សម្រាប់ការងារដែលបានកំណត់ពេល / ការទាញយកដោយខ្លួនឯង។
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

Caddy កំណត់ forwarding headers ស្តង់ដារសម្រាប់ container ខាងដើម។ OmniRoute ប្រើ
`NEXT_PUBLIC_BASE_URL` ជាប្រភពដើមសាធារណៈផ្លូវការសម្រាប់ OAuth callbacks និងតំណសាធារណៈ
ដែលបានបង្កើត។ ការសរសេរដែលបានផ្ទៀងផ្ទាត់ទៅផ្ទាំងគ្រប់គ្រង ប្រើសំណើ same-origin រួមជាមួយការការពារ CSRF
ដែលភ្ជាប់នឹង session។ បើកប្រើ `OMNIROUTE_TRUST_PROXY` តែសម្រាប់ការដាក់ឱ្យប្រើប្រាស់កម្រិតខ្ពស់ ដែលអ្នកមានបំណង
ឱ្យ OmniRoute កំណត់ប្រភពដើមសាធារណៈពី forwarded headers ដែលទុកចិត្ត ជំនួសឱ្យការកំណត់រចនាសម្ព័ន្ធ
ជាក់លាក់។

## Cloudflare Quick Tunnel

ការគាំទ្រផ្ទាំងគ្រប់គ្រងសម្រាប់ការដាក់ឱ្យប្រើប្រាស់តាម Docker រួមបញ្ចូល **Cloudflare Quick Tunnel** ដែលអាចបើកដោយចុចតែមួយដងនៅលើ `Dashboard → Endpoints`។ ការបើកប្រើលើកដំបូងនឹងទាញយក `cloudflared` តែនៅពេលចាំបាច់ បើកដំណើរការ tunnel បណ្ដោះអាសន្នទៅកាន់ endpoint `/v1` បច្ចុប្បន្នរបស់អ្នក និងបង្ហាញ URL `https://*.trycloudflare.com/v1` ដែលបានបង្កើត ដោយផ្ទាល់នៅខាងក្រោម URL សាធារណៈធម្មតារបស់អ្នក។

ផ្ទាំង tunnel របស់ endpoint (Cloudflare, Tailscale, ngrok) អាចត្រូវបានបង្ហាញ ឬលាក់ពី `Settings → Appearance` ដោយមិនផ្លាស់ប្ដូរស្ថានភាព tunnel ដែលកំពុងសកម្ម។

### កំណត់សម្គាល់អំពី Tunnel

- URL របស់ Quick Tunnel គឺបណ្ដោះអាសន្ន ហើយផ្លាស់ប្ដូរបន្ទាប់ពីការចាប់ផ្ដើមឡើងវិញរាល់លើក។
- Quick Tunnels មិនត្រូវបានស្ដារឡើងវិញដោយស្វ័យប្រវត្តិ បន្ទាប់ពី OmniRoute ឬ container ចាប់ផ្ដើមឡើងវិញទេ។ បើកពួកវាឡើងវិញពីផ្ទាំងគ្រប់គ្រងនៅពេលចាំបាច់។
- ការដំឡើងដែលបានគ្រប់គ្រង បច្ចុប្បន្នគាំទ្រ Linux, macOS និង Windows លើ `x64` / `arm64`។
- Managed Quick Tunnels ប្រើ HTTP/2 transport តាមលំនាំដើម ដើម្បីជៀសវាងការព្រមានអំពី QUIC UDP buffer ដែលរំខាន នៅក្នុងបរិស្ថាន container ដែលមានធនធានកំណត់។ កំណត់ `CLOUDFLARED_PROTOCOL=quic` ឬ `auto` ប្រសិនបើអ្នកចង់ប្រើ transport ផ្សេង។
- Docker images រួមបញ្ចូល system CA roots និងបញ្ជូនពួកវាទៅឱ្យ `cloudflared` ដែលបានគ្រប់គ្រង ដើម្បីជៀសវាងបញ្ហាបរាជ័យនៃការទុកចិត្ត TLS នៅពេល tunnel ចាប់ផ្ដើមនៅក្នុង container។
- កំណត់ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ប្រសិនបើអ្នកចង់ឱ្យ OmniRoute ប្រើ binary ដែលមានស្រាប់ ជំនួសឱ្យការទាញយកថ្មីមួយ។

## ស្លាក Image

| Image                    | ស្លាក    | ទំហំ   | សេចក្ដីពិពណ៌នា                                                            |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer មានស្ថិរភាពដែលបាន **បោះពុម្ពផ្សាយ** ខ្ពស់បំផុត (មិនមែន git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ចាក់សោស្លាកប្រភេទនេះសម្រាប់ GitOps                                        |

Manifest ពហុវេទិកា៖ `linux/amd64` + `linux/arm64` ដើម (Apple Silicon, AWS Graviton, Raspberry Pi)។ Docker ជ្រើសរើសស្ថាបត្យកម្មដែលត្រូវគ្នាដោយស្វ័យប្រវត្តិ។ បញ្ជូន `--platform linux/amd64` ប្រសិនបើអ្នកត្រូវការបង្ខំឱ្យធ្វើ AMD64 emulation នៅលើ ARM hosts។

### បណ្ដាញចេញផ្សាយ

OmniRoute បោះពុម្ពផ្សាយបណ្ដាញ Docker ដាច់ដោយឡែកសម្រាប់ការចេញផ្សាយមានស្ថិរភាព ការសាកល្បង release branch ដែលកំពុងសកម្ម និង development builds។

| បណ្ដាញ                          | ប្រភព                                                 | លទ្ធភាពកែប្រែ                       | ការប្រើប្រាស់ដែលបានណែនាំ                                                                                                            |
| ------------------------------- | ----------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | ការចេញផ្សាយដែលបានចុះហត្ថលេខា/កំណត់កំណែ                | មិនអាចកែប្រែបាន                     | ការដាក់ឱ្យប្រើប្រាស់ production ដែលចាក់សោកំណែចេញផ្សាយជាក់លាក់                                                                       |
| `:latest` / `:latest-web`       | SemVer មានស្ថិរភាពដែលបាន **បោះពុម្ពផ្សាយ** ខ្ពស់បំផុត | ទ្រនិចមានស្ថិរភាពដែលអាចកែប្រែបាន    | តាមដានការចេញផ្សាយមានស្ថិរភាព **បន្ទាប់ពី** ការងារបោះពុម្ព SemVer — **មិន** តាមដាន `main` ឬ commit `release/v*` ដែលមិនទាន់ចេញផ្សាយទេ |
| `:next` / `:next-web`           | branch `release/v*` លំនាំដើមបច្ចុប្បន្ន               | ទ្រនិចមុនការចេញផ្សាយដែលអាចកែប្រែបាន | សាកល្បងការកែតម្រូវដែលបានបញ្ចូលទៅក្នុង release branch សកម្ម ប៉ុន្តែមិនទាន់មានក្នុងការចេញផ្សាយមានស្ថិរភាព                             |
| `:main` / `:main-web`           | branch `main`                                         | ទ្រនិចអភិវឌ្ឍន៍ដែលអាចកែប្រែបាន      | សម្រាប់តែការអភិវឌ្ឍ និងការសាកល្បងរួមបញ្ចូលប៉ុណ្ណោះ                                                                                  |

#### ក្រុមហ៊ុនផ្ដល់ web-session៖ images `-web`

បណ្ដាញនីមួយៗខាងលើក៏មានជាស្លាក `-web` ផងដែរ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ដែលត្រូវបាន build ពី stage `runner-web` — ជា image ដូចគ្នា ប៉ុន្តែបន្ថែម Playwright និងកម្មវិធីរុករក Chromium។ image ធម្មតាត្រូវបានចែកចាយ **ដោយគ្មាន** Chromium។ `gemini-web`, `claude-web` និង `claude-turnstile` ត្រូវការវា។

ការបរាជ័យត្រូវបានពន្យារពេល មិនមែនកើតឡើងនៅពេលចាប់ផ្ដើមទេ៖ ក្រុមហ៊ុនផ្ដល់ទាំងនោះរាយបញ្ជី model របស់ពួកគេ និងបង្ហាញថាបានភ្ជាប់នៅក្នុងផ្ទាំងគ្រប់គ្រង ហើយមានតែសំណើដំបូងប៉ុណ្ណោះដែលបរាជ័យជាមួយ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ប្រសិនបើអ្នកប្រើក្រុមហ៊ុនផ្ដល់ទាំងនោះ សូមទាញយកស្លាក `-web` នៃបណ្ដាញដែលអ្នកកំពុងប្រើរួចហើយ — មិនមានអ្វីផ្សេងទៀតផ្លាស់ប្ដូរទេ។ នៅលើការដំឡើង npm/CLI (គ្មាន Docker image) ផ្នែកដែលខ្វះសមមូលគឺ browser binary៖ ដំណើរការ `npx playwright install chromium` នៅលើ host។

#### ការប្រើប្រាស់បណ្ដាញមុនការចេញផ្សាយ

ឆានែល `next` ត្រូវបានបង្កើតឡើងវិញរាល់ពេលមានការរុញកូដទៅសាខាលំនាំដើម `release/v*` បច្ចុប្បន្ន ហើយត្រូវបានចេញផ្សាយសម្រាប់ទាំង AMD64 និង ARM64។ សាខាថែទាំចាស់ៗមិនអាចសរសេរជាន់លើវាបានទេ។ ឆានែលនេះផ្ដល់ image ដែលអាចទាញយកបាន សម្រាប់ការកែតម្រូវដែលបានបញ្ចូលទៅក្នុងសាខា release សកម្ម មុនពេលបង្កើត tag ស្ថិរភាពបន្ទាប់។

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

សម្រាប់ Docker Compose សូមកំណត់ជំនួស image tag ដែលប្រើដោយ profile ដែលបានជ្រើសរើស បន្ទាប់មកទាញយក និងបង្កើត service ឡើងវិញ៖

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### សុវត្ថិភាព និងការត្រឡប់ទៅកំណែមុន

`next` គឺជាឆានែលមុនការចេញផ្សាយដែលអាចផ្លាស់ប្ដូរបាន។ វាអាចផ្លាស់ប្ដូរនៅរាល់ពេលមានការរុញកូដទៅសាខា release សកម្ម ហើយ **មិនត្រូវបានគាំទ្រសម្រាប់ការប្រើប្រាស់ក្នុង production ទេ**។ សូមចាក់សោ image digest ខណៈពេលវាយតម្លៃ build ជាក់លាក់មួយ៖

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

មុនពេលសាកល្បង សូមបម្រុងទុក volume ទិន្នន័យ OmniRoute ឬថតទិន្នន័យដែលបាន bind-mount។ ដើម្បីត្រឡប់ទៅកំណែមុន សូមស្ដារកំណែស្ថិរភាព ឬ digest ដែលធ្លាប់បានប្រើពីមុន ហើយបង្កើត container ឡើងវិញ៖

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

build ពីសាខា release មិនអាចផ្លាស់ទី `latest` បានឡើយ។ មានតែកំណែ semantic ស្ថិរភាពដែលមានលក្ខណៈសម្បត្តិគ្រប់គ្រាន់ប៉ុណ្ណោះ ដែលអាចដំឡើង pointer ស្ថិរភាពបាន។ image `next` នៅតែរក្សាការត្រួតពិនិត្យ release image និងច្រកទប់ស្កាត់ភាពងាយរងគ្រោះកម្រិត CRITICAL។

**`latest` មិនមែនជាការធានាថា git ទាន់សម័យនោះទេ។** ការកែតម្រូវដែលបានបញ្ចូលនៅលើ `main` ឬនៅលើសាខា `release/v*` សកម្ម **មិនមាន** នៅក្នុង `:latest` ទេ រហូតដល់ image SemVer ស្ថិរភាពត្រូវបានចេញផ្សាយ ហើយ job ចេញផ្សាយដំឡើង `:latest` (digest ដូចគ្នានឹង SemVer នោះ)។ ប្រសិនបើ `latest` ហាក់ដូចជាមិនផ្លាស់ប្ដូរ ខណៈដែល GitHub បង្ហាញការកែតម្រូវរួចហើយ សូមទាញយក `:next` ដើម្បីសាកល្បងសាខា release ឬរង់ចាំ tag SemVer។

| អ្វីដែលអ្នកចង់បាន                                                       | ប្រើ                               |
| ----------------------------------------------------------------------- | ---------------------------------- |
| GitOps / production ដែលមិនត្រូវផ្លាស់ប្ដូរដោយស្វ័យប្រវត្តិ              | ចាក់សោទៅ `:X.Y.Z` (ឬ image digest) |
| តាមដានកំណែស្ថិរភាពដែលបានចេញផ្សាយ និងទទួលយកការបង្កើតឡើងវិញនៅរាល់ release | `:latest`                          |
| សាកល្បង commit `release/v*` ដែលមិនទាន់ចេញផ្សាយ                          | `:next` (មិនមែន production)        |
| សាកល្បង `main`                                                          | `:main` (មិនមែន production)        |

## ការអាប់ដេតផ្ទាំងគ្រប់គ្រងក្នុង Docker

កុងតឺន័រដែលប្រើ image បានបោះពុម្ពផ្សាយមិនអាចជំនួសខ្លួនឯងបានទេ។ នៅពេល OmniRoute រកឃើញថាវាកំពុងដំណើរការនៅក្នុង
កុងតឺន័រ (គ្មានការទាញយក `.git` និងមិនមែនជាការដំឡើងតាម npm) បដាអាប់ដេតនៅលើផ្ទាំងគ្រប់គ្រងទំព័រដើមនឹងបង្ហាញ
ពាក្យបញ្ជា host ដែលត្រូវដំណើរការ ជំនួសឱ្យសេចក្តីណែនាំ npm/git ដោយមានប៊ូតុងចម្លង៖

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

ឈ្មោះសេវាកម្មមកពី `AUTO_UPDATE_SERVICE` (តម្លៃលំនាំដើមគឺ `omniroute` ដែលជាសេវាកម្មនៅក្នុង
`docker-compose.selfhost.yml`)។ `pull` ផ្លាស់ទីតែ tag អណ្តែត (`latest`, `next`) ប៉ុណ្ណោះ។ សម្រាប់ tag
`:X.Y.Z` ដែលបានកំណត់ជាក់លាក់ សូមកែសម្រួល tag ជាមុនសិន។

### ការអាប់ដេតដោយចុចតែម្តងជាមួយឯកសារ trigger របស់ host

ដើម្បីឱ្យ **អាប់ដេតឥឡូវនេះ** បន្តដំណើរការដោយមិនចាំបាច់ mount `/var/run/docker.sock` (ដែលផ្តល់ឱ្យកុងតឺន័រ
នូវសិទ្ធិ root លើ host — សូមមើលការព្រមានអំពី profile `cli` ខាងលើ) សូមកំណត់ `DOCKER_UPDATE_TRIGGER_FILE` នៅលើ
សេវាកម្ម OmniRoute ហើយដំណើរការ watcher នៅលើ host៖

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

ផ្លូវត្រូវតែស្ថិតនៅក្នុង `DATA_DIR` (តម្លៃដែលមានលក្ខណៈ relative នឹងត្រូវបានដោះស្រាយដោយផ្អែកលើវា)។ ផ្លូវផ្សេងទៀត
ទាំងអស់នឹងត្រូវបានបដិសេធ។ បន្ទាប់មក **អាប់ដេតឥឡូវនេះ** នឹងសរសេរ `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` ទៅក្នុង
ឯកសារនោះ ឆ្លើយតបដោយ `202` ហើយផ្ទាំងគ្រប់គ្រងនឹងស្ទង់ `/api/system/version` រហូតដល់កំណែថ្មីដំណើរការ
រួចផ្ទុកឡើងវិញ។ OmniRoute មិនដែលដំណើរការ shell ឬពាក្យបញ្ជា Docker ក្នុងរបៀបនេះទេ។ ដូចសកម្មភាពអាប់ដេត
ទាំងអស់ដែរ សំណើត្រូវបានទទួលយកតែពី client នៅលើ loopback/LAN ប៉ុណ្ណោះ។

ថតទិន្នន័យដែលបាន bind-mount ផ្តល់ឱ្យ host នូវផ្លូវថេរសម្រាប់ត្រួតពិនិត្យ។ ឯកតា `systemd` គំរូ
(កែសម្រួល `/srv/omniroute` ឱ្យត្រូវនឹងថតដែលផ្ទុកឯកសារ compose និង `data/` របស់អ្នក)៖

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

សេវាកម្មលុបសំណើចេញមុនពេល pull ដូច្នេះ ការដំណើរការដែលបរាជ័យនឹងមិនធ្វើម្តងហើយម្តងទៀតទេ។ ប្រសិនបើគ្មាន
`DOCKER_UPDATE_TRIGGER_FILE` ទេ ផ្ទាំងគ្រប់គ្រងនឹងបន្តប្រើដំណើរការពាក្យបញ្ជាដោយដៃ។

## ភាពអាចរកបាន៖ SQLite លំនាំដើមគឺចម្លងតែមួយ

ភាគហ៊ុន Docker / Kubernetes OmniRoute គឺ** ដំណើរការ Node មួយ + មួយ SQLite writer** . ភាពអាចរកបានខ្ពស់គឺ** មិនគាំទ្រ** នៅលើ topology នោះ។

| ឧបសគ្គ                                            | ផលវិបាក                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| អ្នកនិពន្ធទោល។                                    | ធ្វើ** ទេ។** ដំណើរការការចម្លងជាច្រើនប្រឆាំងនឹងឯកសារ SQLite ដូចគ្នា។ នោះធ្វើឱ្យខូច DB។                                                                                                                                                                                                                                     |
| បង្កើតឡើងវិញ / ចាប់ផ្តើមឡើងវិញ / HEALTHCHECK kill | **ការដាច់ភ្លើងពេញលេញ** នៃ SSE ក្នុងជើងហោះហើរ វគ្គ dashboard និងស្ថានភាពនៅក្នុងអង្គចងចាំ។ រាល់អតិថិជនដែលបានតភ្ជាប់ធ្លាក់ចុះ។ សំណើថ្មីក្នុងអំឡុងពេលបង្អួចចំណុចបញ្ចប់ទទេទទួលបានប្រូកស៊ីបញ្ច្រាស**`502 Bad Gateway: Unknown error`** មិនមែន OmniRoute JSON — អតិថិជនមិនអាចបែងចែកវាពីការបរាជ័យរបស់អ្នកផ្តល់សេវាបានទេ (#11015)។ |
| រង្វិលជុំព្រឹត្តិការណ៍ដូចគ្នានឹង `/healthz`       | កាតាឡុករវល់ ឬធីកបង្ហាប់អាចពន្យារការស៊ើបអង្កេត។ ការអស់ពេលដ៏ខ្លី បន្ទាប់មកចាប់ផ្តើមឡើងវិញ** តែប៉ុណ្ណោះ** ចម្លង។                                                                                                                                                                                                             |

**ម៉ាទ្រីសស៊ើបអង្កេត** (សូមមើលផងដែរ [ការណែនាំអំពីការស៊ើបអង្កេត Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| ស៊ើបអង្កេត    | គោលដៅ                                                     | កុំប្រើ                                                       |
| ------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ភាពរស់រវើក    | TCP នៅលើ `PORT` ( `20128` លំនាំដើម) ឬ HTTP `/healthz` ទន់ | `/api/monitoring/health`                                      |
| ការត្រៀមខ្លួន | HTTP `GET /healthz`                                       | ការអស់ពេលតឹងតែងដែលចាត់ទុកព្រឹត្តិការណ៍-រង្វិលជុំរវល់ដូចស្លាប់ |
| ជ្រៅ / មនុស្ស | `/api/monitoring/health`                                  | ភាពរស់រវើក kubelet ស្វ័យប្រវត្តិ                              |

**ធ្វើឱ្យប្រសើរឡើង៖** រំពឹងថារាល់វគ្គនឹងធ្លាក់ចុះ។ ដកអតិថិជនចេញប្រសិនបើអ្នកអាច; មិនមានការធ្វើបច្ចុប្បន្នភាពវិលជុំនៅលើ SQLite លំនាំដើមទេ។ សរសេរ `restart: unless-stopped` បូក Docker `HEALTHCHECK` ក៏នឹងជំនួសដំណើរការតែមួយគត់នៅពេលដែលកុងតឺន័រមិនមានសុខភាពល្អ — កាំផ្ទុះដូចគ្នា។

ការបង្ហាញដែលផលិតរួចរាល់ និងតារាង Helm រស់នៅក្នុង `deploy/kubernetes/` និង `deploy/helm/omniroute/` — សូមមើល [ការណែនាំអំពីការដាក់ឱ្យប្រើប្រាស់ Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) ។

ព័ត៌មានសង្ខេបរបស់ Kubernetes សម្រាប់ a** ការចម្លងតែមួយ** (តម្រូវឱ្យបង្កើតឡើងវិញ កុំលើក `replicas` ទល់នឹងឯកសារ SQLite មួយ)៖

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

`preStop` sleep អនុញ្ញាតឱ្យ kube ទម្លាក់ចំណុចបញ្ចប់សេវាកម្ម មុនពេល SIGTERM ដូច្នេះ** ថ្មី។** ចរាចរណ៍ឈប់ប៉ះពាល់ដល់ដំណើរការស្លាប់។ នៅក្នុងជើងហោះហើរ `/v1/responses` SSE ត្រូវបានបង្ហូររហូតដល់ `SHUTDOWN_TIMEOUT_MS` (30s លំនាំដើម) តាមរយៈការជួលចូលប្រើប្រាស់ទម្ងន់ធ្ងន់ (#11015)។ សំណើថ្មីដែលនៅតែឈានដល់ដំណើរការទទួលបាន `503` + `Retry-After: 5`។ គម្លាតចំណុចបញ្ចប់ទទេឡើងវិញ រហូតទាល់តែការជំនួសគឺរួចរាល់ នៅតែជាការដាច់ខ្លាំង — នោះគឺជា SQLite topology មិនមែនជាការស៊ើបអង្កេតខុសនោះទេ។

Postgres ខាងក្រៅ / ពហុអ្នកនិពន្ធ HA គឺ** ទេ។** ផ្លូវស្តុកឯកសារ។ ប្រសិនបើអ្នកត្រូវការ HA សូមរក្សាការចម្លងតែមួយ ឬដំណើរការ topology ដែលគម្រោងបានសាកល្បង និងចងក្រងជាឯកសារដាច់ដោយឡែក។ ការងារ Postgres/MySQL រស់នៅក្នុង [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ។ រហូតដល់កប៉ាល់នោះ មធ្យោបាយតែមួយគត់ដើម្បីគុណ** ធំ** សមត្ថភាព `/v1/responses` គឺ N ដំណើរការឯករាជ្យ (ផ្នែកបន្ទាប់) មិនមែន `replicas > 1` នៅលើភាគមួយ។

## ការពង្រីកផ្ដេក៖ ដំណើរការឯករាជ្យ N

ដំណើរការ Node មួយគឺជា **V8 heap មួយ**។ សំណើ coding-agent `POST /v1/responses` (RTK + Caveman) ដែលត្រួតគ្នាចំនួនពីរ និងមានទំហំប្រហែល ~3 MiB / ~750k-token ធ្វើឱ្យ heap នោះបញ្ឈប់នៅប្រហែល ~12 Gi (`FATAL ERROR: Reached heap limit`) ហើយអាចបង្កឱ្យ cgroup ទំហំ 16 Gi អស់អង្គចងចាំ (OOM)។ សូមមើល [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)។ ការវាស់វែងនោះគឺជាការព្រមានអំពី **ថវិកាអង្គចងចាំ** មិនមែនជាដែនកំណត់អតិបរមាដាច់ខាតរបស់ផលិតផល ដែលអនុញ្ញាតឱ្យមានសំណើ `/v1/responses` រយៈពេលវែងព្រមគ្នាត្រឹមតែពីរនោះទេ។ ការទទួលយក chat ធ្ងន់ៗត្រូវបានគ្រប់គ្រងដោយថវិកាបៃសម្រាប់ ingest ដែលបានកំណត់ដោយស្វ័យប្រវត្តិ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) និងត្រូវបានកំណត់ទំហំដោយផ្អែកលើដែនកំណត់ V8/cgroup ដដែលនោះ — ការកំណត់តម្លៃវាឱ្យខ្ពស់ជាងមុន (ឬការកំណត់ដែនកំណត់ចំនួនសំណើចាស់ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) លើដំណើរការដែលបានកំណត់ទំហំរួចហើយ នឹងធ្វើឱ្យការបញ្ឈប់នេះកើតឡើងវិញ។ Chat តូចៗ, `/healthz`, `/v1/models` និង MCP **មិន** ស្ថិតនៅក្នុងដែនកំណត់នោះទេ។

### ដំណើរការតែមួយ៖ សំណើ `/v1/responses` រយៈពេលវែងលើសពីពីរ

ដំណើរការដែលមាន **សុខភាពល្អ** (heap ទាបជាង `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ដែលតម្លៃលំនាំដើមគឺ `0.75`) **អាច** ដំណើរការសំណើ `POST /v1/responses` រយៈពេលវែងព្រមគ្នាលើសពីពីរ នៅពេលដែលថវិកាបៃ inflight សម្រាប់ដំណើរការទាំងមូល (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) នៅមានទំហំទំនេរ។ Body ដែលមានទំហំស្មើ ឬធំជាង `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (តម្លៃលំនាំដើម 256 KiB) ប្រើ lease ធ្ងន់ដូចគ្នានឹងសំណើដែលមានរចនាសម្ព័ន្ធស្មុគស្មាញ ហើយប្រើផ្លូវគេច `tryAcquireHealthyHeadroom` ដូចគ្នាពី [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`)។ ការមាន client SSE រយៈពេលវែងរាប់សិបព្រមគ្នា (ជាញឹកញាប់ ប្រតិបត្តិករត្រូវការ 40–50) គឺជាបញ្ហា **ថវិកាអង្គចងចាំ** — ត្រូវកំណត់ទំហំ heap + slot ចម្បង/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — មិនមែនជាដែនកំណត់ផលិតផលដាច់ខាតថា «អតិបរមា 2» នោះទេ។ Heap ដែលរងសម្ពាធនៅតែបដិសេធសំណើដោយប្រើ `503` ដែលអាចសាកល្បងឡើងវិញបាន ដើម្បីកុំឱ្យបញ្ហា #7849 កើតឡើងវិញ។

ដើម្បី **បង្កើនចំនួន heap** (V8 old-space ឯករាជ្យ) **នាពេលបច្ចុប្បន្ន**៖

| អ្វីដែលត្រូវធ្វើ                                                                                                                                                                 | អ្វីដែលមិនត្រូវធ្វើ                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ដំណើរការ **container/pod ចំនួន N** ដោយមួយៗមាន `DATA_DIR` / volume **ផ្ទាល់ខ្លួន**                                                                                                | កំណត់ `replicas > 1` ឱ្យប្រើឯកសារ SQLite តែមួយ                         |
| កំណត់ទំហំ heavy in-flight + healthy-headroom ដោយផ្អែកលើថវិកា heap / inflight-byte; 1–2 គឺជាតម្លៃលំនាំដើមបែបប្រុងប្រយ័ត្នសម្រាប់ #7849 មិនមែនជាដែនកំណត់អតិបរមាដាច់ខាតរបស់ផលិតផលទេ | ផ្ដល់ RAM 8× ឱ្យដំណើរការតែមួយ ហើយប្រើដែនកំណត់ចំនួនដែលគ្មានព្រំដែន      |
| ជាជម្រើស៖ `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` សម្រាប់ **កម្មវិធីរាប់ quota ដែលប្រើរួមគ្នា**                                                                     | ចាត់ទុក Redis ជា SQLite ដែលប្រើរួមគ្នា — វាមិនមែនដូច្នោះទេ             |
| ចម្លង secret របស់ provider ទៅក្នុង instance នីមួយៗ (ឬទទួលយក dashboard ដែលបែងចែកដាច់ដោយឡែក)                                                                                       | រំពឹងថានឹងមាន dashboard តែមួយ / call-log តែមួយសម្រាប់ instance ទាំងអស់ |
| ដាក់ load balancer ណាមួយនៅខាងមុខ; sticky តាម API key ឬ session គឺគ្រប់គ្រាន់                                                                                                     | តម្រូវឱ្យមាន middleware ជាក់លាក់របស់ vendor ដែលដឹងពីទំហំ               |

ផ្នែក hardware៖ ចំនួនសំណើ `/v1/responses` រយៈពេលវែងព្រមគ្នាក្នុង instance នីមួយៗ គឺជាបញ្ហា **ថវិកាអង្គចងចាំ** (heap + inflight-byte / #10110)។ `DATA_DIR` ឯករាជ្យចំនួន `N` នៅតែបង្កើន heap ជាច្រើន៖ RAM របស់ host ត្រូវតែអាចទ្រទ្រង់ `N × cgroup` មិនមែន «pod 16 Gi តែមួយដែលមាន N=8» នោះទេ។ កុំប្រើ `replicas > 1` លើឯកសារ SQLite តែមួយជាដាច់ខាត។

គំរូ Compose (heap ពីរ និង volume ពីរ — មិនមែន `deploy.replicas: 2`)៖

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

ដង់ស៊ីតេក្នុងដំណើរការ (ផ្ទេរការងារ compression ចេញពី HTTP isolate) មាននៅក្នុង [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)។ Cluster ឡូជីខលតែមួយដែលប្រើស្ថានភាពរក្សាទុកយូរអង្វែងរួមគ្នា មាននៅក្នុង [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)។

## កំហុសតាមតំបន់របស់ Gemini នៅក្នុង Docker

Google AI Studio / Gemini API អាចត្រឡប់ HTTP 400 ជាមួយ FAILED_PRECONDITION និង
`User location is not supported for the API use.` សំណើដែលជោគជ័យនៅលើ host
មិនបញ្ជាក់ថា container ប្រើផ្លូវចេញដូចគ្នានោះទេ។ លំដាប់ DNS,
ការតភ្ជាប់ IPv4/IPv6, ផ្លូវ VPN និង proxy ដែលបានកំណត់អាចខុសគ្នា។ ពិនិត្យ
[តំបន់ដែល Google គាំទ្រ](https://ai.google.dev/gemini-api/docs/available-regions)
ព្រមទាំងផ្លូវតភ្ជាប់ជាក់ស្តែងផងដែរ។ កំហុសនេះតែមួយមុខមិនអាចបញ្ជាក់ថា API key មិនត្រឹមត្រូវនោះទេ។

### ផ្តល់អាទិភាពដល់ proxy សម្រាប់ការតភ្ជាប់នីមួយៗ

ប្រើ [ការកំណត់រចនាសម្ព័ន្ធ proxy សម្រាប់ការតភ្ជាប់នីមួយៗ](../ops/PROXY_GUIDE.md#4-level-proxy-system)
របស់ OmniRoute សម្រាប់ការតភ្ជាប់ Gemini ដែលរងផលប៉ះពាល់ រួចធ្វើ **Test Connection** និងសំណើតូចមួយ
ម្តងទៀតដោយប្រើ model ដដែល។ វារក្សាការផ្លាស់ប្តូរផ្លូវឱ្យមានវិសាលភាពត្រឹមការតភ្ជាប់នោះ។ ផ្ទៀងផ្ទាត់
ថា container អាចចូលដល់ proxy ហើយការតភ្ជាប់ពិតជាជ្រើសរើស
វា។ ការផ្លាស់ប្តូរផ្លូវមិនធានាថា upstream នឹងអនុញ្ញាតតាមលក្ខខណ្ឌតំបន់នោះទេ។

### ប្រៀបធៀបបណ្តាញរបស់ host និង container

រក្សា key, model និងសំណើឱ្យដូចគ្នា នៅពេលប្រៀបធៀបលទ្ធផលដែលបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណ។ កុំ
បិទភ្ជាប់ព័ត៌មានសម្ងាត់ ពាក្យសម្ងាត់ proxy ឬ authorization headers ពេញលេញទៅក្នុង issue ឡើយ។
ដំបូង ពិនិត្យមើលថាតើ OS resolver ផ្តល់ address families ណាខ្លះ ដោយប្រើ command ដូចគ្នា
នៅលើ host និងនៅក្នុង container៖

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

ជំនួស `omniroute` ដោយ service ដែលអ្នកដំណើរការ (ឧទាហរណ៍ `omniroute-web`)។ Command ទាំងនេះ
បង្ហាញ address families ដោយមិនមានព័ត៌មានសម្ងាត់ ឬ IP addresses។ តម្លៃ `6` ដែលបានត្រឡប់មក
គ្រាន់តែបង្ហាញលទ្ធផល IPv6 DNS ប៉ុណ្ណោះ៖ វា **មិន** បញ្ជាក់ថាមានផ្លូវ IPv6 ដែលអាចប្រើបាន ឬអាចចូលប្រើ API បានទេ។
នៅកន្លែងដែលបានដំឡើង `curl` សូមប្រៀបធៀប `curl -4 -I https://generativelanguage.googleapis.com`
ជាមួយ `curl -6 -I https://generativelanguage.googleapis.com` នៅក្នុងបរិស្ថានទាំងពីរ។
HTTP response បញ្ជាក់ពីការតភ្ជាប់សម្រាប់ការសាកល្បងនោះ ទោះបីវាជាកំហុសដែលមិនបានផ្ទៀងផ្ទាត់
អត្តសញ្ញាណក៏ដោយ។ មានតែសំណើទៅកាន់ model ដែលបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណប៉ុណ្ណោះ ដែលអាចសាកល្បងលក្ខខណ្ឌអនុញ្ញាតរបស់ Gemini។

### ជម្រើសនៅកម្រិត host៖ IPv6 ដែលដំណើរការ និងគោលការណ៍ resolver

អ្នករាយការណ៍នៃ [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) បានស្ដារ
ការចូលប្រើនៅក្នុងបរិស្ថានរបស់ពួកគេ ដោយបើក IPv6 របស់ container និងផ្លាស់ប្ដូរ
ការជ្រើសរើសអាសយដ្ឋានរបស់ glibc។ សូមចាត់ទុកវាជាជម្រើសជាក់លាក់សម្រាប់បរិស្ថាននោះ។ បញ្ជាក់ថា
IPv6 របស់ host ដំណើរការ, egress/routing របស់ container និង firewall rules ត្រឹមត្រូវ មុនពេលកែសម្រួល preference របស់ resolver។
ការមាន private ULA address តែមួយមុខ មិនបញ្ជាក់ថាមានការតភ្ជាប់ IPv6 សាធារណៈទេ។

សម្រាប់ service ដែលបានភ្ជាប់ទៅ default network របស់ Compose រួចហើយ fragment នេះបើក
IPv6 នៅលើ network នោះ។ សូមរក្សាផ្នែកផ្សេងទៀតនៃ service, ports, volumes និង configuration របស់អ្នក៖

```yaml
networks:
  default:
    enable_ipv6: true
```

សម្រាប់ named network សូមបើកវានៅលើ network ដែល service ពិតជាភ្ជាប់ទៅ។ Docker អាច
បែងចែក ULA subnet បាន។ ជ្រើសរើស subnet ជាក់លាក់ដែលមិនជាន់គ្នា តែនៅពេល network របស់អ្នក
តម្រូវឱ្យធ្វើដូច្នោះប៉ុណ្ណោះ។ សូមមើល [បណ្តាញ IPv6 របស់ Docker](https://docs.docker.com/engine/daemon/ipv6/)
និង [ជម្រើស network របស់ Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)។

នៅលើ **image ដែលផ្អែកលើ glibc** ឯកសារ `/etc/gai.conf` អាចផ្លាស់ប្តូរការជ្រើសរើសអាសយដ្ឋាន។ Dockerfile របស់
repository បច្ចុប្បន្នប្រើ Debian។ image ផ្ទាល់ខ្លួនដែលផ្អែកលើ musl មិនប្រើ mechanism នេះរួមគ្នាទេ។
ការកែសម្រួលដែលបានរាយការណ៍ ផ្លាស់ប្តូរ ULA label ពី `label fc00::/7 6` ទៅ
`label fc00::/7 1`។ ចាប់ផ្តើមពី policy table ពេញលេញរបស់ image ហើយរក្សាទុក entry ផ្សេងទៀតរបស់វា៖
ការបន្ថែម `label` ឬ `precedence` entry នឹងជំនួស default table នោះ ដូច្នេះ file ដែល
មានតែបន្ទាត់ដែលបានផ្លាស់ប្តូរគឺមិនគ្រប់គ្រាន់ទេ។
[ឯកសារយោងនៃការកំណត់រចនាសម្ព័ន្ធ glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ពន្យល់អំពីអត្ថន័យទាំងនោះ។ Bind-mount file ដែលបានពិនិត្យរួចជា read-only នៅ `/etc/gai.conf`
ហើយបង្កើត service ឡើងវិញ ដើម្បីអនុវត្តវា។

វាផ្លាស់ប្តូរការជ្រើសរើសអាសយដ្ឋានរបស់ OS សម្រាប់ **ចរាចរចេញទាំងអស់នៅក្នុង container នោះ**។
វាមិនបង្ខំឱ្យ application ទាំងអស់ជ្រើសរើស IPv6 ទេ៖ លំដាប់ DNS និងការជ្រើសរើស
ការតភ្ជាប់របស់ Node ក៏មានឥទ្ធិពលដែរ។ ជាពិសេស `--dns-result-order=ipv4first` ផ្តល់អាទិភាពដល់ IPv4 ហើយ
មិនមែនជាដំណោះស្រាយសម្រាប់ការបរាជ័យដែលកើតឡើងតែលើ IPv4 ទេ។ សូមមើល [លំដាប់ DNS របស់ Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)។

សាកល្បង Gemini និង provider ផ្សេងទៀតរបស់អ្នកម្តងទៀត បន្ទាប់ពីការផ្លាស់ប្តូរណាមួយនៅកម្រិត host។ ដើម្បី roll back
សូមដក custom `gai.conf` mount ចេញ ស្ដារ network configuration មុន ហើយ
បង្កើត service/network ដែលរងផលប៉ះពាល់ឡើងវិញក្នុងអំឡុង maintenance window។ ការបង្កើត network ឡើងវិញ
អាចរំខានដល់ container ផ្សេងទៀតដែលភ្ជាប់ទៅវា។ កុំលុប persistent data volume។

## កំណត់សម្គាល់សំខាន់ៗ

- **របៀប SQLite WAL:** គួរអនុញ្ញាតឱ្យ `docker stop` ដំណើរការរហូតដល់ចប់ ដើម្បីឱ្យ OmniRoute អាចធ្វើ checkpoint ការផ្លាស់ប្តូរចុងក្រោយត្រឡប់ទៅក្នុង `storage.sqlite`។ ឯកសារ Compose ដែលបានភ្ជាប់មកជាមួយបានកំណត់រយៈពេលអនុគ្រោះសម្រាប់ការបញ្ឈប់ចំនួន 40 វិនាទីរួចហើយ។ ប្រសិនបើអ្នកដំណើរការ image ដោយផ្ទាល់ សូមរក្សា `--stop-timeout 40`។
- **`DISABLE_SQLITE_AUTO_BACKUP`:** កំណត់ជា `true` ប្រសិនបើការបម្រុងទុកតាមកាលកំណត់/មុនពេលសរសេរ ត្រូវបានគ្រប់គ្រងពីខាងក្រៅ។ ការផ្លាស់ប្តូរទិន្នន័យរបស់មូលដ្ឋានទិន្នន័យដែលមានស្រាប់ នៅតែតម្រូវឱ្យមាន snapshot សុវត្ថិភាពដែលរក្សាទុកបានយូរ និងយន្តការការពារសម្រាប់ការផ្លាស់ប្តូរទិន្នន័យទ្រង់ទ្រាយធំដោយឡែក។
- **ការរក្សាទុកទិន្នន័យជាអចិន្ត្រៃយ៍:** ត្រូវ mount volume ទៅកាន់ `/app/data` ជានិច្ច ដើម្បីរក្សាមូលដ្ឋានទិន្នន័យ សោ និងការកំណត់រចនាសម្ព័ន្ធរបស់អ្នក នៅពេល container ចាប់ផ្តើមឡើងវិញ។
- **ការកំណត់រចនាសម្ព័ន្ធច្រក:** កំណត់ជំនួសអថេរបរិស្ថាន `PORT` ដើម្បីផ្លាស់ប្តូរច្រកលំនាំដើម `20128`។

## សូមមើលផងដែរ

- [មគ្គុទ្ទេសក៍ដាក់ឱ្យដំណើរការលើ VM](../ops/VM_DEPLOYMENT_GUIDE.md) — ការរៀបចំ VM + nginx + Cloudflare
- [មគ្គុទ្ទេសក៍ដាក់ឱ្យដំណើរការលើ Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — ដាក់ឱ្យដំណើរការលើ Fly.io
- [ការកំណត់រចនាសម្ព័ន្ធបរិស្ថាន](../reference/ENVIRONMENT.md) — ឯកសារយោង `.env` ពេញលេញ
