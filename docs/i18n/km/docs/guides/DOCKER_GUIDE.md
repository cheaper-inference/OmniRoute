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

## រត់រហ័ស

> **ម៉ាស៊ីនខ្លួនឯងនៅក្នុងពាក្យបញ្ជាតែមួយ?** សូមមើល [មគ្គុទ្ទេសក៍ម៉ាស៊ីនខ្លួនឯង](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (រូបភាពដែលបានបោះផ្សាយ + Redis, loopback-only, មិនមានជម្រើសទម្រង់)។ ការរត់រហ័សខាងក្រោមគឺជាផ្លូវកុងតឺន័រតែមួយសម្រាប់អ្នកប្រើប្រាស់ដែលដំណើរការ Redis នៅកន្លែងផ្សេងរួចហើយ។

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## ជាមួយឯកសារបរិស្ថាន

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

ឃ្លាំងបញ្ជូន Dockerfile ពហុដំណាក់កាល (`Dockerfile`) ។ បួនដំណាក់កាលត្រូវបានលាតត្រដាង; ជ្រើសរើស `target` ត្រឹមត្រូវសម្រាប់ករណីប្រើប្រាស់របស់អ្នក។

| ដំណាក់កាល     | រូបភាពមូលដ្ឋាន        | គោលបំណង                                                                                                                                                                                                                                                                                        |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ដំឡើង deps (`npm ci --legacy-peer-deps`) និងដំណើរការ `npm run build` (Turbopack តាមលំនាំដើម — សូមមើលធនធាន Build-time ខាងក្រោម)                                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | ពេលវេលាដំណើរការផលិតកម្មជាមួយនឹងលទ្ធផល Next.js ឯករាជ្យ។** គ្មានអ្នកផ្តល់សេវា CLIs រួមបញ្ចូលទេ។**                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | បន្ថែម `git`, `docker.io`, `docker-compose` និង CLIs សកល៖ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`។** ជ្រើសរើសវាសម្រាប់លំហូរការងារភ្នាក់ងារ។**                                                                                                                        |
| `runner-web`  | `runner-base`         | បន្ថែម Playwright + កម្មវិធីរុករកតាមអ៊ីនធឺណិត Chromium (`--with-deps`) សម្រាប់អ្នកផ្តល់សេវាបណ្តាញ៖ `gemini-web`, `claude-web`, `claude-turnstile`។** ជ្រើសរើសវានៅពេលអ្នកប្រើអ្នកផ្តល់សេវាទាំងនោះ** — រូបភាពធម្មតាបរាជ័យនៅពេលស្នើសុំដោយគ្មានវា (សូមមើលកំណត់ចំណាំ `-web` នៅក្រោមឆានែលចេញផ្សាយ) ។ |

បង្កើតគោលដៅជាក់លាក់មួយដោយដៃ៖

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ធនធានពេលវេលាសាងសង់

args សាងសង់ចំនួនបីគ្រប់គ្រងនូវអ្វីដែលដំណាក់កាល `builder` មានតម្លៃ។ ពួកគេគឺជាពេលវេលាសាងសង់តែប៉ុណ្ណោះ — `OMNIROUTE_MEMORY_MB` (ខាងក្រោម) គឺជាប៊ូតុងពេលដំណើរការដាច់ដោយឡែក។

| បង្កើត arg                  | លំនាំដើម | ឥទ្ធិពល                                                                                    |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` បង្កើតជាមួយ webpack: ការចងចាំកំពូលទាប យឺតជាង។ `1` ជ្រើសរើស Turbopack។                  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | V8 heap ceiling (`--max-old-space-size`) សម្រាប់ `next build` ពង។                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | ចិញ្ចឹម `CIRCLE_NODE_TOTAL`; បន្ទាប់ទាញយក `workers = N - 1` សម្រាប់ការប្រមូលទិន្នន័យទំព័រ។ |

`OMNIROUTE_BUILD_WORKERS` គឺជាអ្នកដែលត្រូវលើកឡើងលើអ្នកសាងសង់ដ៏ធំម្នាក់ ហើយអ្នកដែលត្រូវសង្ស័យថានៅពេលដែលការសាងសង់ដែលជាប់គាំងបានស្លាប់** បន្ទាប់ពី** `✓ Compiled successfully`។ អ្នកធ្វើការទិន្នន័យទំព័រនីមួយៗគឺជាដំណើរការរបស់វាផ្ទាល់ ហើយ `next build` មេក៏ដូចគ្នាដែរ។ ការបន្តពូជ VPS ផ្ទាល់ (បញ្ហា #7518) បានវាស់វែង RSS កំពូលនៃដំណើរការនីមួយៗនៅ ~ 4.5 GB ឯករាជ្យនៃទង់ `NODE_OPTIONS` heap (Turbopack ចងក្រងនៅក្នុងអង្គចងចាំ native/Rust នៅខាងក្រៅ V8 heap) ។ លំនាំដើមរបស់ `2` (→ 1 worker, 2 processes total) មានទំហំសម្រាប់អ្នករត់ 16 GB / 4 vCPU GitHub ដែលបំពង់ផ្សព្វផ្សាយប្រើ។ នៅ `8` (→ 7 កម្មករ) ដែលរត់ចេញពីអង្គចងចាំហើយ buildkit បានបរាជ័យក្នុងជំហានជាមួយ `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 កម្មករ) នៅតែមិនសមស្របនៅពេលដែល RSS ក្នុងមួយដំណើរការត្រូវបានវាស់ដោយផ្ទាល់ជំនួសឱ្យការសន្និដ្ឋាន។ `tests/unit/docker-build-memory-budget.test.ts` ធ្វើលេខនព្វន្ធធៀបនឹងតួលេខដែលបានវាស់ ហើយបរាជ័យប្រសិនបើ knob ណាមួយលើសពីអ្នករត់។

Turbopack ចងក្រងនៅក្នុងការចងចាំ Rust ដើមដែលរស់នៅ** នៅខាងក្រៅ** V8 heap ដូច្នេះ `OMNIROUTE_BUILD_MEMORY_MB` មិនចងវាទេ។ នៅលើម៉ាស៊ីនដែលមានពិដានអង្គចងចាំ ការស្ថាបនាគឺបន្ទាប់មក SIGKILLed ដោយឃាតករ OOM ដោយគ្មានអត្ថបទកំហុសអ្វីទាំងអស់ — វាគ្រាន់តែឈប់ពាក់កណ្តាល `Creating an optimized production build` ដែលអានដូចជាការព្យួរជាជាងការចេញពីអង្គចងចាំ។ នោះហើយជាមូលហេតុដែល `Dockerfile` កំណត់លំនាំដើមទៅ webpack (`OMNIROUTE_USE_TURBOPACK=0`) មិនដូច `npm run dev` / `npm run build` ដែល Turbopack គឺជាកូដលំនាំដើម៖ `docker build .` ទទេដែលមិនមាន build args (អ្វីដែលផ្លូវរថភ្លើង និងម៉ាស៊ីនចុចមួយដងផ្សេងទៀតដំណើរការ) មិនត្រូវស្លាប់ដោយស្ងៀមស្ងាត់នៅលើកម្មវិធីបង្កើតអង្គចងចាំនោះទេ។ រូបភាពដែលបានបោះផ្សាយរួចហើយឆ្លងកាត់ `OMNIROUTE_USE_TURBOPACK=0` យ៉ាងច្បាស់នៅក្នុង `docker-publish.yml`។ នៅលើអ្នកសាងសង់ដែលមាន RAM ច្រើន សូមជ្រើសរើស Turbopack សម្រាប់ការស្ថាបនាលឿនជាងមុន៖

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ត្រូវបានបើក ដូច្នេះ `next build` ដំណើរការមេ** និង** ដំណើរការកម្មករ និងកិត្តិយសនីមួយៗ `OMNIROUTE_BUILD_MEMORY_MB` ដាច់ដោយឡែកពីគ្នា។ ទំហំពិដានកុងតឺន័រខាងលើប្រហែលពីរដងនៃតម្លៃនោះ មិនមែនម្តងទេ។

វាស់នៅលើដើមឈើនេះ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| កញ្ចប់       | ពិដានកុងតឺន័រ  | លទ្ធផល                                |
| ------------ | -------------- | ------------------------------------- |
| Turbopack    | 8 GiB / 16 GiB | អូម សម្លាប់ទាំងពីរនាក់យ៉ាងស្ងៀមស្ងាត់ |
| កញ្ចប់បណ្ដាញ | 8 GiB          | កម្មករសំណង់ SIGKILLed                 |
| កញ្ចប់បណ្ដាញ | 12 GiB         | ទទួលបានជោគជ័យ ឈានដល់កម្រិត 11.1 GiB   |

### ពេលវេលាដំណើរការលំនាំដើម

លំនាំដើមនាំចេញដោយ `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`។

អាកប្បកិរិយានៃការចងចាំនៅក្នុង Docker:

- រូបភាពកំណត់ `OMNIROUTE_MEMORY_MB=1024` ហើយទាញយក `NODE_OPTIONS=--max-old-space-size=1024` ពីវា។
- ដំណើរការម៉ាស៊ីនមេពិតប្រាកដត្រូវបានចាប់ផ្តើមដោយកម្មវិធីបើកដំណើរការឯករាជ្យ ដែលអាន `OMNIROUTE_MEMORY_MB` និងបន្ថែម `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`។
- Node ប្រើតម្លៃ `--max-old-space-size` ចុងក្រោយបង្អស់ ដូច្នេះការកំណត់ `OMNIROUTE_MEMORY_MB` គ្រប់គ្រងដែនកំណត់ Docker heap ដែលមានប្រសិទ្ធភាព។
- ដោយសារតែរូបភាពតែងតែកំណត់វា ការកំណត់ RAM ផ្ទាល់ខ្លួនរបស់ launcher មិនត្រូវបានអនុវត្តនៅក្រោម Docker ទេ។ បង្កើនវាឱ្យច្បាស់លាស់សម្រាប់បន្ទុកការងារ (តារាងខាងក្រោម) ។ `2048` នៅតែតូចពេកសម្រាប់ `/v1/responses` ភ្នាក់ងារសរសេរកូដ។

### Runtime RAM សម្រាប់ភ្នាក់ងារសរសេរកូដ

លំនាំដើម 1 GiB Docker គឺជាជាន់ dashboard/light-chat មិនមែនជាទំហំផលិតកម្មទេ។ សាកសព `POST /v1/responses` វែង (រាប់រយសារ ឧបករណ៍រាប់សិប) រក្សាក្រាហ្វក្នុងអង្គចងចាំច្រើនក្នុងអំឡុងពេលបង្ហាប់។ ~ 3 MiB / ~ 750k-token ត្រួតគ្នាពីរបានបោះបង់ V8 នៅ** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) ហើយក៏ប៉ះនឹង 16 GiB cgroup OOM។ សូមមើល [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ។

ទំហំ** cgroup `--memory` ខាងលើ heap** — native buffers, SQLite, និង compression intermediates អង្គុយនៅខាងក្រៅ V8.

| បន្ទុកការងារ                             | `OMNIROUTE_MEMORY_MB`   | កុងតឺន័រ / cgroup | កំណត់ចំណាំ                                                                                       |
| ---------------------------------------- | ----------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| ផ្ទាំងគ្រប់គ្រង ការជជែកពន្លឺមួយ។         | `1024` (លំនាំដើមរូបភាព) | ≥2 GiB            |                                                                                                  |
| ភ្នាក់ងារសរសេរកូដមួយ (Claude/Codex/Grok) | `8192`                  | ≥10 GiB           | `/v1/responses` វគ្គតែមួយធម្មតា។                                                                 |
| `/v1/responses` វែងពីរស្របគ្នា។          | `10240`–`12288`         | ≥12–16 GiB        | វាស់ V8 បោះបង់នៅ ~ 12 GiB heap                                                                   |
| បី+ បរិបទវែងដំណាលគ្នា។                   | កុំដំណើរការតែមួយ        | សៀរៀល/បន្ថែម RAM  | ការទទួលយកទម្ងន់ធ្ងន់លំនាំដើមគឺ 1 ក្នុងជើងហោះហើរ; ការចិញ្ចឹមវាដោយគ្មាន RAM ណែនាំការរំលូតកូនឡើងវិញ |

`omniroute serve` នៅលើលោហៈទទេ calibrate ~ 35% នៃ RAM (clamped `[512, 4096]`) នៅពេលដែល `OMNIROUTE_MEMORY_MB` គឺ** មិនបានកំណត់** . Docker តែងតែកំណត់ `1024` ដូច្នេះការក្រិតមិនដំណើរការក្នុងរូបភាពផ្លូវការទេ។

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## ប្រូកស៊ីបញ្ច្រាសនៅលើផ្លូវរង (Traefik / nginx)

Next.js `basePath` ត្រូវបានចងក្រងជាបណ្តុំដាច់ដោយឡែក។ OmniRoute កត់ត្រាតម្លៃដុតនំនៅក្នុងឯកសារ sentinel នៅ root កម្មវិធី (សរសេរក្នុងអំឡុងពេល `npm run build` អានដោយ `scripts/docker/ensure-docker-base-path.mjs`) ហើយប្រៀបធៀបវាជាមួយ `OMNIROUTE_BASE_PATH` នៅពេលដែលកុងតឺន័រចាប់ផ្តើម។ នៅពេលដែលពួកវាខុសគ្នា ហើយរូបភាពត្រូវបានបង្កើតឡើងសម្រាប់ root ដែន ចំណុចចូលសរសេរឡើងវិញនូវឯកតាឯកត្តជន តួអក្សរ `basePath`/`assetPrefix` ដែលបានបង្កប់ (បន្ទាប់ 16 បង្ហាញ SSR ទ្រព្យសកម្ម URLs ពី `assetPrefix` តែម្នាក់ឯង — បំណះកញ្ចក់ឆ្លុះ subpath ចូលទៅក្នុងវា) URLs `/_next/static` ដែលគេឱ្យឈ្មោះថា មេឌៀដែលនាំចូល (present) ទំព័រកំហុស) និងអតិថិជន `process.env` shim មុនពេល `node dev/run-standalone.mjs` ដំណើរការ។

### បង្កើតការបង្កើត (បានផ្ដល់អនុសាសន៍)

កំណត់អថេរទាំងពីរនៅក្នុង `.env` បន្ទាប់មកបង្កើតឡើងវិញ ដូច្នេះរូបភាព និងពេលដំណើរការយល់ព្រម៖

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` បញ្ជូនបន្ត `OMNIROUTE_BASE_PATH` ជា Docker build-arg និងជាអថេរបរិស្ថានពេលដំណើរការ។

### រូបភាពឫសដែលបានសាងសង់ជាមុន + ផ្លូវរងពេលរត់

រូបភាព `cheaperinference/omniroute:*` ដែលត្រូវបានផ្សព្វផ្សាយត្រូវបានបង្កើតឡើងសម្រាប់ជា root ដែន។ អ្នកនៅតែអាចកំណត់ `OMNIROUTE_BASE_PATH` នៅពេលដំណើរការ។ កុងតឺន័របំណះកញ្ចប់ម្តងនៅពេលចាប់ផ្តើម។ ផ្គូផ្គងវាជាមួយប្រភពដើមសាធារណៈដែលត្រូវគ្នា៖

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

កំណត់រចនាសម្ព័ន្ធប្រូកស៊ីបញ្ច្រាសដើម្បីបញ្ជូនបន្ត** ពេញ** ផ្លូវខាងក្រៅ (កុំដកបុព្វបទ) ។ Traefik គួរតែបញ្ជូន `PathPrefix(`/omniroute `)` ទៅកាន់កុងតឺន័រដោយគ្មាន `StripPrefix` ដូច្នេះ Next.js ទទួលបាន `/omniroute/...` និងបម្រើទ្រព្យសម្បត្តិពី `/omniroute/_next/...`។

ការពិនិត្យសុខភាព Docker ស៊ើបអង្កេតចំណុចបញ្ចប់នៃវដ្តជីវិត `/healthz` ទម្ងន់ស្រាល ដែលដាក់បុព្វបទជាមួយ `OMNIROUTE_BASE_PATH` សកម្ម។ `/api/monitoring/health` នៅតែមានសម្រាប់ការធ្វើរោគវិនិច្ឆ័យ human/dashboard ; ដើម្បីចង្អុលកុងតឺន័រ HEALTHCHECK ត្រឡប់មកវិញនៅវា (ឧទាហរណ៍សម្រាប់ការពង្រឹងសុខភាពជ្រៅ) កំណត់ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`។ ផ្លូវនោះគឺ ក** ជ្រៅ** ពិនិត្យ (សង្ខេបការត្រួតពិនិត្យ DB + ) — សមរម្យសម្រាប់ `HEALTHCHECK` ដែលមិនញឹកញាប់របស់ Docker ប្រសិនបើអ្នកជ្រើសរើសត្រឡប់មកវិញ ប៉ុន្តែ** ទេ។** សម្រាប់ចន្លោះពេល Kubernetes `livenessProbe` ។

សម្រាប់វង់ភ្លេង (Kubernetes, Nomad ជាដើម)៖

| ស៊ើបអង្កេត        | ចូលចិត្ត                                                     | ជៀសវាង                                                        |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| ភាពរស់រវើក        | HTTP `GET /livez` ឬ TCP នៅលើច្រកមេ (`PORT` លំនាំដើម `20128`) | `/api/monitoring/health` ជាភាពរស់រវើក                         |
| ការត្រៀមខ្លួន     | HTTP `GET /healthz`                                          | ការអស់ពេលតឹងតែងដែលចាត់ទុកព្រឹត្តិការណ៍-រង្វិលជុំរវល់ដូចស្លាប់ |
| ជ្រៅ / ប្រអប់ខ្មៅ | `/api/monitoring/health`                                     | —                                                             |

`/healthz` រាយការណ៍វដ្តជីវិតដំណើរការ (`ok` / `starting` / `stopping`) ។ `/livez` គឺដំណើរការតែប៉ុណ្ណោះ (200 ពេលណាដែលអ្នកដោះស្រាយអាចដំណើរការ វាមិនរង់ចាំការត្រៀមខ្លួនទេ)។ ទាំងពីរនៅតែដំណើរការនៅលើ Node event loop ដូចការដោះស្រាយសំណើ ដូច្នេះហើយ CPU-bound catalog ឬ compression work អាចពន្យារពេល — busy ≠ dead។ ចូលចិត្តភាពរស់រវើក TCP ប្រសិនបើ HTTP អស់ពេល។ ការណែនាំអំពីការស៊ើបអង្កេតពេញលេញ៖ [ការណែនាំអំពីការត្រួតពិនិត្យ — ការណែនាំអំពីការស៊ើបអង្កេត Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ។

## Docker តែងជាមួយ Caddy (HTTPS Auto-TLS)

OmniRoute អាចត្រូវបានលាតត្រដាងដោយសុវត្ថិភាពដោយប្រើការផ្តល់ SSL ដោយស្វ័យប្រវត្តិរបស់ Caddy ។ ធានាឱ្យប្រាកដ DNS A record របស់ដែនរបស់អ្នកចង្អុលទៅ IP របស់ម៉ាស៊ីនមេរបស់អ្នក។

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

Caddy កំណត់បឋមកថាបញ្ជូនបន្តស្តង់ដារសម្រាប់កុងតឺន័រខាងលើ។ OmniRoute ប្រើ `NEXT_PUBLIC_BASE_URL` ជាប្រភពដើមសាធារណៈ Canonical សម្រាប់ការហៅត្រឡប់ OAuth និងបង្កើតតំណភ្ជាប់សាធារណៈ។ ផ្ទាំងគ្រប់គ្រងដែលបានផ្ទៀងផ្ទាត់ការសរសេរប្រើសំណើដើមដូចគ្នា បូកនឹងការការពារ CSRF ដែលចងភ្ជាប់សម័យ។ បើកដំណើរការតែ `OMNIROUTE_TRUST_PROXY` សម្រាប់ការដាក់ពង្រាយកម្រិតខ្ពស់ ដែលអ្នកមានបំណងចង់ OmniRoute ទាញយកប្រភពដើមសាធារណៈពីបឋមកថាដែលបានបញ្ជូនបន្តដែលគួរឱ្យទុកចិត្តជំនួសឱ្យការកំណត់រចនាសម្ព័ន្ធច្បាស់លាស់។

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

## ស្លាករូបភាព

| រូបភាព                       | ស្លាក    | ទំហំ    | ការពិពណ៌នា                                                       |
| ---------------------------- | -------- | ------- | ---------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | ខ្ពស់បំផុត** បោះពុម្ពផ្សាយ** SemVer ស្ថិរភាព (មិនមែន git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | ខ្ទាស់ថ្នាក់នៃស្លាកនេះសម្រាប់ GitOps                             |

រូបភាពដូចគ្នានេះត្រូវបានបោះផ្សាយទៅកាន់ឃ្លាំងចំនួនបី ជាមួយនឹងការសង្ខេបស្ថាបត្យកម្មដូចគ្នា៖ `cheaperinference/omniroute` (Docker Hub, the Cheaper Inference organization, from 3.8.53 on), `ghcr.io/cheaper-inference/omniroute` និង legacy `diegosouzapw/omniroute` ដែលរក្សាប្រវត្តិទាញរបស់វា ហើយនៅតែទទួលបានរាល់ការចេញផ្សាយ។ ការដាក់ពង្រាយ `diegosouzapw/omniroute` ដែលមានស្រាប់បន្តធ្វើបច្ចុប្បន្នភាព។ ការប្តូរឈ្មោះរូបភាពគឺស្រេចចិត្ត។ ឆានែល `:next` / `:next-web` មុនចេញផ្សាយខាងក្រោមត្រូវបានបោះពុម្ពទៅ `diegosouzapw/omniroute` និង GHCR ប៉ុណ្ណោះ។

ពហុវេទិកាបង្ហាញ៖ `linux/amd64` + `linux/arm64` ដើម (Apple Silicon, AWS Graviton, Raspberry Pi) ។ Docker ជ្រើសរើសស្ថាបត្យកម្មដែលត្រូវគ្នាដោយស្វ័យប្រវត្តិ។ ឆ្លងកាត់ `--platform linux/amd64` ប្រសិនបើអ្នកត្រូវការបង្ខំការត្រាប់តាម AMD64 នៅលើម៉ាស៊ីន ARM ។

### ចេញផ្សាយឆានែល

OmniRoute បោះពុម្ពផ្សាយបណ្តាញ Docker ដាច់ដោយឡែកសម្រាប់ការចេញផ្សាយដែលមានស្ថេរភាព ការធ្វើតេស្តសាខាការចេញផ្សាយសកម្ម និងការកសាងការអភិវឌ្ឍន៍។

| ឆានែល                           | ប្រភព                                           | ភាពអាចផ្លាស់ប្តូរបាន។                     | ការប្រើប្រាស់ដែលបានណែនាំ                                                                                                                      |
| ------------------------------- | ----------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | ការចេញផ្សាយ Signed/versioned                    | មិនអាចផ្លាស់ប្តូរបាន។                     | ការដាក់ពង្រាយផលិតកម្មដែលកំណត់ការចេញផ្សាយពិតប្រាកដ                                                                                             |
| `:latest` / `:latest-web`       | ខ្ពស់បំផុត** បោះពុម្ពផ្សាយ** SemVer មានស្ថេរភាព | ទ្រនិចមានស្ថេរភាពដែលអាចផ្លាស់ប្តូរបាន។    | ធ្វើតាមការចេញផ្សាយដែលមានស្ថេរភាព** បន្ទាប់ពី** SemVer បោះផ្សាយការងារ — ធ្វើ** ទេ។** តាមដាន `main` ឬ `release/v*` ដែលមិនបានចេញផ្សាយ ប្រព្រឹត្ត |
| `:next` / `:next-web`           | សាខា `release/v*` លំនាំដើមបច្ចុប្បន្ន           | ទ្រនិចមុនការចេញផ្សាយដែលអាចផ្លាស់ប្តូរបាន។ | ការសាកល្បងជួសជុលដែលបានចុះចតនៅលើសាខាចេញផ្សាយសកម្ម ប៉ុន្តែមិនទាន់ស្ថិតក្នុងការចេញផ្សាយដែលមានស្ថេរភាពនៅឡើយ                                       |
| `:main` / `:main-web`           | សាខា`main`                                      | ទ្រនិចអភិវឌ្ឍន៍ដែលអាចផ្លាស់ប្តូរបាន។      | ការអភិវឌ្ឍន៍ និងការធ្វើតេស្តរួមបញ្ចូលតែប៉ុណ្ណោះ                                                                                               |

#### អ្នកផ្តល់វគ្គបណ្តាញ៖ រូបភាព `-web`

រាល់ឆានែលខាងលើកើនឡើងទ្វេដងជាស្លាក `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ដែលបង្កើតឡើងពីដំណាក់កាល `runner-web` — រូបភាពដូចគ្នាបូក Playwright និងកម្មវិធីរុករក Chromium ។ នាវារូបភាពធម្មតា។** ដោយគ្មាន** ក្រូមីញ៉ូម; `gemini-web`, `claude-web` និង `claude-turnstile` ត្រូវការវា។

ការបរាជ័យត្រូវបានពន្យារពេល មិនមែនជាពេលចាប់ផ្តើមទេ៖ អ្នកផ្តល់សេវាទាំងនោះរាយបញ្ជីម៉ូដែលរបស់ពួកគេ ហើយបង្ហាញថាបានភ្ជាប់នៅក្នុងផ្ទាំងគ្រប់គ្រង ហើយមានតែសំណើដំបូងប៉ុណ្ណោះដែលបរាជ័យ។

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ប្រសិនបើអ្នកប្រើអ្នកផ្តល់សេវាទាំងនោះ ទាញស្លាក `-web` នៃឆានែលដែលអ្នកមានរួចហើយនៅលើ — គ្មានអ្វីផ្លាស់ប្តូរទៀតទេ។ នៅលើការដំឡើង npm/CLI (គ្មានរូបភាព Docker ) បំណែកដែលបាត់ដែលសមមូលគឺជាកម្មវិធីរុករកគោលពីរ៖ ដំណើរការ `npx playwright install chromium` នៅលើម៉ាស៊ីន។

#### ដោយប្រើឆានែលមុនការចេញផ្សាយ

ឆានែល `next` ត្រូវបានបង្កើតឡើងវិញនៅលើរាល់ការជំរុញទៅកាន់សាខា `release/v*` លំនាំដើមបច្ចុប្បន្ន ហើយត្រូវបានបោះពុម្ពសម្រាប់ទាំង AMD64 និង ARM64។ សាខាថែទាំចាស់មិនអាចសរសេរជាន់លើវាបានទេ។ ឆានែលផ្តល់នូវរូបភាពដែលអាចទាញបានសម្រាប់ការជួសជុលដែលបានបញ្ចូលទៅក្នុងសាខាចេញផ្សាយសកម្ម មុនពេលស្លាកស្ថេរភាពបន្ទាប់ត្រូវបានកាត់។

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

សម្រាប់ Docker Compose បដិសេធស្លាករូបភាពដែលបានប្រើដោយទម្រង់ដែលបានជ្រើសរើស បន្ទាប់មកទាញ និងបង្កើតសេវាកម្មឡើងវិញ៖

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### សុវត្ថិភាព និងការវិលត្រឡប់មកវិញ

`next` គឺជាឆានែលមុនការចេញផ្សាយអណ្តែត។ វាអាចផ្លាស់ប្តូរនៅលើការជំរុញណាមួយទៅកាន់សាខាចេញផ្សាយសកម្ម និងជា** មិនត្រូវបានគាំទ្រសម្រាប់ការប្រើប្រាស់ផលិតកម្ម** . ខ្ទាស់រូបភាពសង្ខេប ខណៈពេលដែលវាយតម្លៃការស្ថាបនាជាក់លាក់មួយ៖

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

មុនពេលធ្វើតេស្ត សូមបម្រុងទុកបរិមាណទិន្នន័យ OmniRoute ឬថតទិន្នន័យដែលបានភ្ជាប់។ ដើម្បីត្រលប់មកវិញ សូមស្ដារកំណែដែលមានស្ថេរភាពដែលបានប្រើពីមុន ឬរំលាយ ហើយបង្កើតធុងឡើងវិញ៖

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

ការស្ថាបនាសាខាចេញផ្សាយមិនអាចផ្លាស់ទី `latest` បានទេ ; មានតែកំណែ semantic ស្ថិរភាពដែលមានសិទ្ធិអាចលើកកម្ពស់ទ្រនិចស្ថេរភាព។ រូបភាព `next` រក្សាការត្រួតពិនិត្យរូបភាពដែលបានចេញផ្សាយ និងរារាំងច្រកទ្វារភាពងាយរងគ្រោះ CRITICAL ។

**`latest` មិនមែនជាការធានារូបិយប័ណ្ណសម្រាប់ git ទេ។** រួមបញ្ចូលគ្នានូវការជួសជុលនៅលើ `main` ឬនៅលើសាខា `release/v*` សកម្មគឺ** ទេ។** ក្នុង `:latest` រហូតដល់រូបភាព SemVer មានស្ថិរភាពត្រូវបានបោះផ្សាយ ហើយការងារបោះផ្សាយផ្សព្វផ្សាយ `:latest` (ការសង្ខេបដូចគ្នានឹង SemVer នោះ ). ប្រសិនបើ `latest` មើលទៅជាប់គាំង ខណៈពេលដែល GitHub បង្ហាញការជួសជុលរួចហើយ ទាញ `:next` ដើម្បីសាកល្បងសាខាចេញផ្សាយ ឬរង់ចាំស្លាក SemVer ។

| អ្នកចង់បាន                                                                          | ប្រើ                            |
| ----------------------------------------------------------------------------------- | ------------------------------- |
| GitOps / ផលិតកម្មដែលមិនត្រូវរសាត់                                                   | ខ្ទាស់ `:X.Y.Z` (ឬរូបភាពសង្ខេប) |
| អនុវត្តតាមស្ថិរភាពដែលបានបោះពុម្ពផ្សាយ និងទទួលយកការបង្កើតឡើងវិញនៅលើការចេញផ្សាយនីមួយៗ | `:latest`                       |
| សាកល្បង `release/v*` ដែលមិនចេញផ្សាយ                                                 | `:next` (មិនផលិត)               |
| សាកល្បង `main`                                                                      | `:main` (មិនផលិត)               |

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

## ការធ្វើមាត្រដ្ឋាន៖ ដំណើរការឯករាជ្យ

### Codex កម្មសិទ្ធិបង្វិលសញ្ញាសម្ងាត់

ច្បាប់ចម្លងនៃគណនី Codex មួយមិនត្រូវប្រើប្រាស់ថូខឹនធ្វើឱ្យស្រស់ប្រើតែមួយដងដោយឯករាជ្យឡើយ។ នៅលើករណីដែលប្រើប្រាស់តែព័ត៌មានសម្ងាត់ដែលបានធ្វើសមកាលកម្ម កំណត់ `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`) ។ ទុកវាចោលដោយមិនកំណត់លើម្ចាស់បង្វិលតែមួយ។ ដំណើរការនីមួយៗនៅតែត្រូវការ `DATA_DIR` របស់វាផ្ទាល់។ ជម្រើសនេះមិនចែករំលែក SQLite ឬផ្គត់ផ្គង់ការធ្វើសមកាលកម្មសញ្ញាសម្ងាត់ ឬការចាក់សោដែលបានចែកចាយទេ។

វត្ថុអកម្មអានការតភ្ជាប់ឡើងវិញនៅពេលដែលត្រូវការការធ្វើឱ្យស្រស់ឡើងវិញ ហើយទទួលយកតែសញ្ញាសម្គាល់ការចូលប្រើដែលមិនទាន់ផុតកំណត់ខុសគ្នា។ បើមិនដូច្នេះទេ ការធ្វើឱ្យស្រស់ត្រូវបានបិទដោយមិនផុតកំណត់ ឬបិទដំណើរការការតភ្ជាប់ ឬរាប់ការបរាជ័យនៃកម្មវិធីបំបែកការធ្វើឱ្យស្រស់។ ការបរាជ័យនៃការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវតាមចរន្តពិតប្រាកដនៅតែប្រើការបរាជ័យធម្មតានៃគណនេយ្យ ការបន្ថយអិចស្ប៉ូណង់ស្យែល និងកំហុសម៉ាស៊ីនភ្ញៀវធម្មតា។ ការបិទគណនីនៅតែជាអចិន្ត្រៃយ៍។ ធ្វើសមកាលកម្មថូខឹនដែលបានបង្វិលរបស់ម្ចាស់ មុនពេលការចូលប្រើថូខឹនផុតកំណត់ (លំនាំដើមនៃការធ្វើឱ្យស្រស់សកម្មគឺប្រាំនាទី) ឬនាំចូលឯកសារផ្ទៀងផ្ទាត់ Codex ឡើងវិញ។ ការនាំចូលអកម្មរក្សាទុកថូខឹនដែលបានផ្តល់ដោយមិនចាំបាច់បញ្ជាក់សុពលភាពវានៅចំណុចបញ្ចប់សញ្ញាសម្ងាត់។ dashboard/API refresh ដោយដៃ ត្រឡប់ `409 refresh_disabled`; ការចូល OAuth ថ្មីមិនផ្លាស់ប្តូរទេ។ សូមមើល [ឯកសារយោងបរិស្ថាន](../reference/ENVIRONMENT.md#passive-codex-token-refresh) ។

ដំណើរការ Node មួយគឺ** មួយ V8 ហ៊ា** . ~ 3 MiB / ~ 750k-token coding-agent `POST /v1/responses` (RTK + Caveman) បោះបង់ហ៊ានោះនៅ ~ 12 Gi (`FATAL ERROR: Reached heap limit`) ហើយអាច OOM a 16 Gi cgroup ។ សូមមើល [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) ។ ការវាស់វែងនោះគឺ ក** ថវិកានៃការចងចាំ** ការព្រមាន មិនមែនជាផលិតផល hard-max នៃ `/v1/responses` វែងស្របគ្នាពីរទេ។ ការចូលប្រើការជជែកដែលមានទម្ងន់ធ្ងន់ត្រូវបានបិទដោយថវិកា ingest byte ដែលទាញយកដោយស្វ័យប្រវត្តិ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ដែលមានទំហំពីពិដាន V8/cgroup ដូចគ្នា — ត្រួតលើវាឡើងលើ (ឬការកំណត់ចំនួនកេរ្តិ៍ដំណែល `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) នៅលើដំណើរការដែលមានទំហំរួចហើយ ណែនាំការបោះបង់ឡើងវិញ។ ការជជែកតូច `/healthz` `/v1/models` និង MCP គឺ** ទេ។** នៅក្នុងមួកនោះ។

### ដំណើរការមួយ: ច្រើនជាងពីរ `/v1/responses` វែង

ក** មានសុខភាពល្អ** ដំណើរការ (ហ៊ាបខាងក្រោម `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, `0.75` លំនាំដើម)** ឧសភា** ដំណើរការ `POST /v1/responses` យូរជាងពីរក្នុងពេលដំណាលគ្នា នៅពេលដែលថវិកាដំណើរការ-បៃបៃ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) នៅតែមានកន្លែង។ តួនៅ ឬខាងលើ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (លំនាំដើម 256 KiB) ទទួលយកការជួលទម្ងន់ធ្ងន់ដូចគ្នាទៅនឹងសំណើដែលមានរចនាសម្ព័ន្ធធ្ងន់ ហើយប្រើ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ដូចគ្នា (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ។ អតិថិជន SSE យូរដំណាលគ្នារាប់សិបនាក់ (ប្រតិបត្តិករជាញឹកញាប់ត្រូវការ 40-50) គឺ a** ថវិកានៃការចងចាំ** សំណួរ — ទំហំ heap + primary/headroom រន្ធ + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — មិនមែនជាដែនកំណត់ផលិតផល "អតិបរមា 2" រឹង។ គំនរសម្ពាធនៅតែស្រក់ជាមួយ `503` ដែលអាចសាកល្បងបាន ដូច្នេះ #7849 មិនត្រឡប់មកវិញទេ។

ទៅ** គុណនឹងហ៊ា** (ចន្លោះចាស់ V8 ឯករាជ្យ)** ថ្ងៃនេះ** :

| ធ្វើ                                                                                                                                  | កុំ                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| រត់** N containers/pods** នីមួយៗជាមួយរបស់វា។** ផ្ទាល់ខ្លួន** `DATA_DIR` / កម្រិតសំឡេង                                                 | កំណត់ `replicas > 1` ទល់នឹងឯកសារ SQLite មួយ។                 |
| ទំហំធ្ងន់នៅក្នុងជើងហោះហើរ + healthy-headroom ពីថវិកា heap / inflight-byte; 1-2 គឺជាលំនាំដើម #7849 អភិរក្ស មិនមែនជាផលិតផលរឹងអតិបរមាទេ។ | ផ្តល់ឱ្យដំណើរការមួយ 8 × RAM និងមួករាប់គ្មានដែនកំណត់          |
| ស្រេចចិត្ត៖ `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` សម្រាប់** បញ្ជរកូតាចែករំលែក**                                        | ចាត់ទុក Redis ជាការចែករំលែក SQLite — វាមិនមែនទេ។             |
| ចម្លងអាថ៌កំបាំងនៃអ្នកផ្តល់សេវាទៅក្នុងឧទាហរណ៍នីមួយៗ (ឬទទួលយកផ្ទាំងគ្រប់គ្រងដែលបានបែងចែក)                                               | រំពឹងថាផ្ទាំងគ្រប់គ្រងមួយ / កំណត់ហេតុការហៅចូលមួយនៅទូទាំងករណី |
| ផ្នែកខាងមុខជាមួយនឹងតុល្យភាពបន្ទុកណាមួយ; ស្អិតដោយគ្រាប់ចុច API ឬវគ្គគឺគ្រប់គ្រាន់ហើយ។                                                  | ទាមទារឧបករណ៍កណ្តាលដែលដឹងពីទំហំជាក់លាក់របស់អ្នកលក់            |

ភាពស្និទ្ធស្នាលពីសម័យទៅគណនីក៏អាចចែករំលែកតាមរយៈ Redis ផងដែរ៖ កំណត់ `OMNIROUTE_SESSION_AFFINITY_STORE=redis` និង `REDIS_URL` នៅលើដំណើរការនីមួយៗ ជាមួយនឹង `REDIS_KEY_PREFIX` ដូចគ្នា និងការកំណត់ `sessionAffinityTtlMs` វិជ្ជមាន។ Pins ដោះស្រាយអត្តសញ្ញាណគណនីប្រើប្រាស់ដែលបាន hashed ទៅនឹងការតភ្ជាប់មូលដ្ឋានដែលមានសិទ្ធិរបស់ដំណើរការនីមួយៗ ដូច្នេះគណនី OAuth ដែលមានទិន្នន័យមេតានៃអត្តសញ្ញាណដែលត្រូវគ្នា មិនចាំបាច់មានការតភ្ជាប់ដែលត្រូវគ្នា IDs ទេ។ អត្តសញ្ញាណគណនីដែលគេស្គាល់មានអាទិភាពជាង IDs ក្នុងតំបន់ផ្ទុយគ្នាក្នុងការដោះស្រាយម្ជុល និងការបណ្តេញចេញដោយការពារ។ កំណត់ត្រាដោយគ្មានអត្តសញ្ញាណ (ឬអ្នកហៅចេញដោយគ្មានអត្តសញ្ញាណ) រក្សាកេរ្តិ៍ដំណែល ID យាម។ គណនីដែលមិនមានអត្តសញ្ញាណប្រើប្រាស់ស្ថិរភាពនៅតែទាមទារ IDs ដែលត្រូវគ្នា កំហុស Redis ឬការហៅលើសពី 100 ms ត្រឡប់ទៅ SQLite មូលដ្ឋានវិញ។ ហាងទំនាក់ទំនង Redis នីមួយៗកំណត់ប្រតិបត្តិការលេចធ្លោនៅ 8 រំលង Redis ភ្លាមៗនៅពេលពេញ ហើយបញ្ចេញរន្ធដោតតែនៅពេលដែលការងារមូលដ្ឋានបានដោះស្រាយ មិនមែននៅកាលបរិច្ឆេទកំណត់អ្នកហៅចូលទេ។ ក្នុងអំឡុងពេលការដាច់ Redis មិនមានការពិតរួមគ្នាទេ៖ វត្ថុនីមួយៗត្រឡប់ទៅរកភាពស្និទ្ធស្នាលក្នុងមូលដ្ឋានរបស់វា វគ្គអាចកំណត់ឡើងវិញម្តងក្នុងមួយករណី ហើយករណីអាចខុសគ្នា។ ភាពស្អិតរមួតឡើងវិញតាមរយៈ Redis នៅពេលដែលវាងើបឡើងវិញ។ ការអស់ពេលកំណត់ការរង់ចាំ មិនមែនជា EVAL ដែលបានផ្ញើទេ ដែលអាចចុះចតបន្ទាប់ពីការត្រលប់មកវិញ។ ការសរសេរផ្លូវប្រៀបធៀបតម្លៃពិតប្រាកដដែលបានសង្កេតឃើញដោយការសម្រេចចិត្តនៃការកំណត់ផ្លូវ មិនមែនជាការអានពេលវេលាផ្លាស់ប្តូរថ្មីនោះទេ។ ការខកខានដែលបានសង្កេត ឬការសង្កេត SQLite ត្រលប់មកវិញប្រៀបធៀបជាគ្រាប់ចុច Redis អវត្តមាន។ ម្ជុលដែលលែងប្រើត្រូវបានជំនួសក្នុង CAS មួយ ដូច្នេះពាក្យបញ្ជាយឺតមិនអាចជំនួស ឬលុបម្ជុលថ្មីជាងនេះបានទេ។ Redis អាន atomically ត្រឡប់តម្លៃ និងម៉ាស៊ីនមេដែលនៅសល់ TTL; PTTL វិជ្ជមាន (ឬគ្មានការផុតកំណត់) កំណត់ភាពរស់រវើក មិនមែនត្រាពេលវេលា JSON របស់អ្នកសរសេរ ឬនាឡិការបស់អ្នកអាននោះទេ។ ផែនទីរូបថតក្នុងតំបន់ដែលនៅសេសសល់ TTL ដល់កាលបរិច្ឆេទកំណត់ក្នុងស្រុក។ គ្រាប់ចុច JSON ដែលមានស្រាប់នៅតែអាចអានបាន ហើយបៃឆៅរបស់ពួកគេត្រូវបានរក្សាទុកសម្រាប់ CAS។ Redis គឺជាប្រភពនៃការពិតតែមួយគត់ខណៈពេលដែលវាឆ្លើយ។ ការបញ្ជាក់ដែលបានចែករំលែក ប៉ះ និងលុបលុបធាតុមូលដ្ឋានចេញ កុំដំឡើង ឬផ្ទុកវាឡើងវិញ។ SQLite នៅលើផ្លូវ Redis ផ្ទុកតែការសម្រេចចិត្តធ្លាក់ចុះផ្ទាល់ខ្លួនរបស់វត្ថុនេះពីកំហុស Redis ការអស់ពេលឬការតិត្ថិភាពនៃការចូលរៀន TTL-bounded ដូចពីមុន។ ម្ជុលក្នុងស្រុកដែលបាត់នៅពេលការដាច់ភ្លើងនៅពេលក្រោយចំណាយលើការជ្រើសរើសថ្មីមួយ (ការខកខានក្នុងឃ្លាំងសម្ងាត់ភ្លាមៗ) មិនមែនជាគណនីខុស ឬត្រូវបានបណ្តេញចេញនោះទេ។ ការលើកឡើងដែលបានច្រានចោល ប្រគល់អ្នកឈ្នះដែលបានចែករំលែក និង TTL ដែលនៅសេសសល់របស់វាតាមបែបអាតូមៈ ការជ្រើសរើសធម្មតាពិនិត្យកាលបរិច្ឆេទកំណត់ក្នុងតំបន់ដែលបានគូសវាសឡើងវិញ ហើយប្រើអ្នកឈ្នះដែលមានសិទ្ធិបន្តផ្ទាល់ ដោយប៉ះការប្រើប្រាស់ និងការចូលគណនីនោះដោយមិនចាំបាច់សរសេរចែករំលែកផ្សេងទៀត។ ប្រសិនបើវាមិនអាចប្រើបាន ការជ្រើសរើសរក្សាបេក្ខជនក្នុងតំបន់ ទុកលេខសម្ងាត់ដែលបានចែករំលែកមិនផ្លាស់ប្តូរ ហើយបញ្ចេញសារបំបាត់កំហុសមួយ។ ច្រានចោល CAS មិនសរសេរ SQLite; កំហុស Redis ការអស់ពេល ឬការតិត្ថិភាពនៃការចូលរៀន អនុវត្តប្រតិបត្តិការមូលដ្ឋានដែលមានស្រាប់ជំនួសវិញ។ ប្រសិនបើការឆ្លើយតបរបស់ការផ្លាស់ប្តូរដែលបានផ្ញើមកដល់បន្ទាប់ពីការអស់ពេល (ទទួលយក បដិសេធ ឬកំហុស) ការធ្វើសមកាលកម្មតម្លៃសៀរៀលពិតប្រាកដដែលប្រៀបធៀប និងលុបនឹងដកចេញតែជួរដេកថយក្រោយនៃពេលវេលាអស់ពេលដូចគ្នាបឺតប៉ុណ្ណោះ។ គ្មានការរង់ចាំរវាងការប្រៀបធៀប និងការលុបនោះទេ។ ការសរសេរដាច់ថ្មីត្រូវបានរក្សាទុក។ ការបណ្តេញចេញដោយការពារនឹងដកលេខសម្ងាត់ក្នុងតំបន់ផ្ទាល់ខ្លួនរបស់គណនីដែលបរាជ័យ សូម្បីតែ Redis ចុះក្រោម ហើយសម្អាតវាម្តងទៀតបន្ទាប់ពីការបណ្តេញចេញដែលបានបញ្ជាក់។ ការរង់ចាំការឆ្លើយតបដែលបានចែករំលែកពីមុនមិនអាចស្ដារលេខសម្ងាត់មូលដ្ឋានដែលត្រូវបានបណ្តេញចេញបានទេ ដោយសារការចែករំលែកជោគជ័យមិនដែលសរសេរ SQLite ទេ។ ការខកខាននៅពេលក្រោយអាចដំណើរការគណនីឡើងវិញបាន។ ការសរសេរដែលបានចែករំលែកដែលទទួលយកនៅពេលក្រោយមាននៅក្នុង Redis ប៉ុណ្ណោះ។ Redis ខកខានមិនបានពិគ្រោះជាមួយស្ថានភាពធ្លាក់ចុះក្នុងតំបន់។ ជាមួយនឹងការបិទកម្មវិធីបញ្ជា ម្ជុលដែលបានជ្រើសរើសថ្មីរក្សាទម្រង់ SQLite JSON បួនវាល។ មានតែ Redis routing បន្ថែមអត្តសញ្ញាណគណនី hashed ។ ម្ជុលដែលបានទាញយកពីមុនត្រូវបានពិនិត្យឡើងវិញនៅព្រំដែនផុតកំណត់របស់វា។ ការជ្រើសរើសមិនជួល Redis អានហាងឡើងវិញ ប៉ុន្តែការធ្វើផែនការជួលស្របគ្នានៅតែអាចប្រើម្ជុលដែលត្រូវបានបណ្តេញចេញរវាងការទាញយកជាមុន និងការធ្វើផែនការ (បង្អួចដែលទទួលយកបានល្អបំផុត)។ កិច្ចសន្យាជួលមិនអាចប្តូរគណនីបានទេបន្ទាប់ពីការទាមទារជាប់លាប់៖ នៅលើការបដិសេធដែលត្រូវបានច្រានចោល វារក្សាបេក្ខជនដែលបានទាមទារសម្រាប់សំណើនោះតែប៉ុណ្ណោះ ហើយទុកឱ្យអ្នកឈ្នះដែលបានចែករំលែកមិនត្រូវបានប៉ះពាល់ ដូច្នេះការព្រមព្រៀងលើករណីនានាត្រូវបានកំណត់នៅលើផ្លូវនោះ។ តារាងដែលនៅសល់នៅតែអនុវត្ត៖ នេះមិនចែករំលែកភាពជាប់គាំងនៃសម័យបន្សំ, ម្ជុលវេន Codex ដើម, គណនី semaphores, ការចាក់សោរ, ដែនកំណត់ចំណាយ, ការកំណត់រចនាសម្ព័ន្ធ ឬកំណត់ហេតុការហៅទូរសព្ទ។

Hardware៖ per-instance concurrent long `/v1/responses` is a** ថវិកានៃការចងចាំ** សំណួរ (heap + inflight-byte / #10110) ។ `N` ឯករាជ្យ `DATA_DIR` s នៅតែគុណច្រើន៖ ម៉ាស៊ីន RAM ត្រូវតែគ្របដណ្តប់ `N × cgroup` មិនមែន "16 Gi pod ជាមួយ N = 8" ទេ។ កុំ `replicas > 1` នៅលើឯកសារ SQLite មួយ។

តែងសេចក្តីព្រាង (ពីរហ៊ា, ពីរភាគ — មិន `deploy.replicas: 2`):

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

ដង់ស៊ីតេនៅក្នុងដំណើរការ (ការបង្ហាប់ចេញពី HTTP ដាច់ដោយឡែក) គឺ [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ។ ចង្កោមឡូជីខលមួយនៅលើស្ថានភាពប្រើប្រាស់បានយូរដែលបានចែករំលែកគឺ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ។

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
