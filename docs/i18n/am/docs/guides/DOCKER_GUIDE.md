# 🐳 Docker Guide — OmniRoute (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> የተሟላ የDocker ማሰማሪያ ማጣቀሻ። በፍጥነት ለመጀመር፣ [የREADME Docker ክፍልን](../README.md#-docker) ይመልከቱ።

## የይዘት ማውጫ

- [ፈጣን አስጀማሪ](#quick-run)
- [ከአካባቢ ፋይል ጋር](#with-environment-file)
- [Docker Compose](#docker-compose)
- [የሚገኙ መገለጫዎች](#available-profiles)
- [OmniRoute በDocker ውስጥ ሲሰራ የአስተናጋጁን CLI መሣሪያዎች ማዋቀር](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [የምርት Compose](#production-compose)
- [የDockerfile ደረጃዎች](#dockerfile-stages)
- [ወሳኝ የአካባቢ ተለዋዋጮች](#critical-environment-variables)
- [Docker Compose ከCaddy (HTTPS) ጋር](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ፈጣን Tunnel](#cloudflare-quick-tunnel)
- [የImage መለያዎች](#image-tags)
- [በDocker ውስጥ የDashboard ዝማኔዎች](#dashboard-updates-in-docker)
- [ተገኝነት፦ ነባሪው SQLite ነጠላ-replica ነው](#availability-default-sqlite-is-single-replica)
- [በDocker ውስጥ የGemini ክልላዊ ስህተቶች](#gemini-regional-errors-inside-docker)
- [ጠቃሚ ማስታወሻዎች](#important-notes)

---

## ፈጣን አስጀማሪ

> **በአንድ ትዕዛዝ በራስዎ ማስተናገድ ይፈልጋሉ?**
> [በራስ የማስተናገጃ መመሪያን](../getting-started/SELF_HOST_GUIDE.md) ይመልከቱ —
> `docker compose -f docker-compose.selfhost.yml up -d` (የታተመ image +
> Redis፣ loopback ብቻ፣ የመገለጫ ምርጫ የሌለው)። ከታች ያለው ፈጣን አስጀማሪ
> Redisን ቀድሞውኑ በሌላ ቦታ ለሚያስኬዱ ተጠቃሚዎች የተዘጋጀ
> የነጠላ-container መንገድ ነው።

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## ከአካባቢ ፋይል ጋር

```bash
# መጀመሪያ .envን ይቅዱና ያርትዑ
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
# መሠረታዊ መገለጫ (የCLI መሣሪያዎች የሉትም)
docker compose --profile base up -d

# የCLI መገለጫ (Claude Code፣ Codex፣ OpenClaw አብረው የተካተቱ)
docker compose --profile cli up -d

# የአስተናጋጅ መገለጫ (በዋነኝነት ለLinux፤ የአስተናጋጁን CLI binaries ለንባብ ብቻ ያገናኛል)
docker compose --profile host up -d

# የድር መገለጫ (ለድር-session አቅራቢዎች Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecarን ያጣምሩ
docker compose --profile cli --profile cliproxyapi up -d
```

## የሚገኙ መገለጫዎች

OmniRoute ለዋና ዋና የማሰማሪያ ቅርጾች የCompose መገለጫዎችን ይዞ ይመጣል። ከአካባቢዎ ጋር የሚዛመደውን ይምረጡ።

| መገለጫ          | አገልግሎት           | መቼ መጠቀም እንዳለብዎ                                                                                                              | ትዕዛዝ                                         |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ነባሪ)  | `omniroute-base` | Headless server / አነስተኛ runtime፣ ምንም የአቅራቢ CLIዎች አብረው አልተካተቱም                                                               | `docker compose --profile base up -d`        |
| `cli`         | `omniroute-cli`  | `omniroute providers/setup/doctor`ን እና አብረው የተካተቱ CLIዎችን (Codex፣ Claude Code፣ Droid፣ OpenClaw) የሚጠሩ የagentic የሥራ ፍሰቶች       | `docker compose --profile cli up -d`         |
| `host`        | `omniroute-host` | `~/.local/bin`፣ `~/.codex`፣ `~/.claude`፣ ወዘተን ለንባብ ብቻ በማገናኘት ወደ አስተናጋጁ CLIዎች `network_mode`-የሚመስል መዳረሻ የሚፈልጉ የLinux አስተናጋጆች | `docker compose --profile host up -d`        |
| `cliproxyapi` | `cliproxyapi`    | ለupstream CLI proxying [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecarን በport `8317` ላይ ያስኪዱ            | `docker compose --profile cliproxyapi up -d` |
| `web`         | `omniroute-web`  | Browser የሚያስፈልጋቸው የድር-session አቅራቢዎች፦ `gemini-web`፣ `claude-web`፣ `claude-turnstile` (`runner-web`ን ይገነባል፣ Chromium ተካትቷል)  | `docker compose --profile web up -d`         |

> በርካታ መገለጫዎችን ማጣመር ይቻላል፦ `docker compose --profile cli --profile cliproxyapi up -d`።

## OmniRoute በDocker ውስጥ ሲሰራ የአስተናጋጁን CLI መሣሪያዎች ማዋቀር

`omniroute setup-codex`፣ `setup-claude`፣ `config set <tool>` እና የዳሽቦርዱ
**ውቅርን አስቀምጥ** አዝራር ሁሉም እንደ `~/.codex/*.config.toml` ያሉ ፋይሎችን ይጽፋሉ። እነዚያ ዱካዎች
ትርጉም የሚኖራቸው CLIው በትክክል በሚሰራበት ማሽን ላይ ብቻ ነው። በኮንቴይነሩ ውስጥ
ካስኬዷቸው፣ ጽሑፉ ወደ ኮንቴይነሩ የራሱ የቤት ማውጫ (`/home/node` —
ምስሉ `USER node` በመጠቀም ይሰራል) ይገባል፤ ምንም የአስተናጋጅ CLI ከዚያ አያነበውም፣ እንዲሁም
ኮንቴይነሩ እንደገና በተፈጠረበት ቅጽበት ይጠፋል።

OmniRoute ይህንን ፈልጎ ያገኛል እና ሊጠቀሙበት የማይችሉትን ስኬት
ከመዘገብ ይልቅ መመሪያዎችን በመስጠት ጽሑፉን አይፈቅድም፦ CLIው በ`2` ይወጣል፣ እና APIው
`containerEphemeralTarget: true` ጋር `422` ይመልሳል።

### የሚመከረው፦ CLIውን በአስተናጋጁ ላይ፣ OmniRouteን በDocker ውስጥ ያስኪዱ

ኮንቴይነሩ APIውን ያቀርባል፤ CLIው ደግሞ የአስተናጋጅ መሣሪያዎችዎን ያዋቅራል።

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLIውን ወደ ኮንቴይነሩ ያመልክቱ
omniroute setup-codex                      # ትክክለኛውን ~/.codex በአስተናጋጅዎ ላይ ይጽፋል
```

Codex፣ Claude Code፣ Cursor ወይም ተመሳሳይ መሣሪያዎች በላፕቶፕዎ
ላይ ሲሰሩ ይህ ትክክለኛው ምርጫ ነው — ይህም የተለመደው አዋቅር ነው።

### አማራጭ፦ የአስተናጋጁን የውቅር ማውጫዎች bind-mount ያድርጉ (`host` መገለጫ)

ኮንቴይነሩ ራሱ የአስተናጋጅዎን ውቅር እንዲጽፍ ከፈለጉ፣
ማውጫዎቹን mount ያድርጉ እና `CLI_CONFIG_HOME`ን ወደ mount ስርወ ማውጫው ያመልክቱ። `host` መገለጫው
ይህንን አስቀድሞ ያደርጋል፦

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

ዱካውን አስተማማኝ የሚያደርገው bind mount ነው፦ OmniRoute
`/proc/self/mountinfo`ን ያነባል እና ወደ mounted ዱካዎች (እንዲሁም ልጅ ማውጫዎቻቸው mounts
ወደሆኑ ማውጫዎች፣ ይህም በትክክል ከላይ ያለው የ`/host-home` ቅርጽ ነው) መጻፍን ይፈቅዳል፤
ነገር ግን mounted ያልሆኑትን አሁንም አይፈቅድም።

### የማምለጫ አማራጭ፦ የኮንቴይነሩን የራሱ CLIs ያዋቅሩ (በጥንቃቄ ይጠቀሙ)

CLIs በእውነት በኮንቴይነሩ ውስጥ ሲኖሩ (የ`cli` መገለጫ)፣ ጽሑፉ
ሆን ተብሎ የሚደረግ ነው። ለማንኛውም `setup-*` ትዕዛዝ `--allow-container-write`ን ያስተላልፉ፣ ወይም
ለአገልጋዩ `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`ን ያዘጋጁ። ጽሑፉ
ከኮንቴይነሩ በኋላ እንደማይቆይ ከሚገልጽ ማስጠንቀቂያ ጋር ይከናወናል።

> **የደህንነት ማስጠንቀቂያ — `cli` መገለጫ + `docker.sock` mount።**
> በኮንቴይነሩ ውስጥ ያለው ራስ-አዘምን ሰጪ ከአስተናጋጁ daemon
> ቁልልን እንደገና መፍጠር እንዲችል፣ የ`cli` መገለጫ `/var/run/docker.sock`ን bind-mount
> ያደርጋል (`src/lib/system/autoUpdate.ts` ያንን socket መኖሩን ይመረምራል እና
> ከሌለ Docker ዱካውን ይዘላል)። ያ socket **የአስተናጋጅ-root እምነት
> ድንበር** ነው፦ እሱን ማግኘት የሚችል ማንኛውም ነገር የአስተናጋጁን Docker daemon እንደ
> root ይቆጣጠራል — በአስተናጋጁ ላይ ያለ ማንኛውንም ኮንቴይነር መፍጠር፣ መመርመር፣ ማቆም እና ማስወገድ ይችላል።
> አንድምታዎቹ፦
>
> 1. **የ`cli` መገለጫውን ወደብ ፈጽሞ ለአውታረ መረቡ አያጋልጡ።** በ
>    `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`) ላይ ያትሙት
>    — በLAN ተደራሽ የሆነ `cli` መገለጫ ማንኛውንም የዳሽቦርድ ደረጃ RCE ወደ
>    ሙሉ የአስተናጋጅ ጥሰት ይለውጣል።
> 2. **ተጨማሪ የአስተናጋጅ ማውጫዎችን ወደ `cli` መገለጫ bind አታድርጉ።**
>    የDocker socket ከማንኛውም ተጨማሪ mount ጋር ለኮንቴይነሩ ወደ ፋይል ስርዓትዎ እና የአስተናጋጅ ውቅርዎ
>    ሙሉ የማንበብ/የመጻፍ ፈቃድ ይሰጠዋል። አንድ መሣሪያ ፕሮጀክትን እንዲያይ ከፈለጉ፣
>    በCLI binaryው በአካባቢው ያስኪዱት — ወደ `cli` ኮንቴይነሩ mount
>    አታድርጉት።
>
> በኮንቴይነሩ ውስጥ ራስ-ሰር ማዘመን ካላስፈለገዎት፣ የ`cli` መገለጫውን ያጥፉት
> (`COMPOSE_PROFILES=core,redis` ወይም አጠር ያለ ውቅር)። ሌሎቹ መገለጫዎች
> የDocker socketን mount አያደርጉም።
>
> ከMITM ጋር የተያያዘውን የስጋት ሞዴል ለማየት `docs/security/MITM-TPROXY-DECRYPT.md`ን (git፤ ወደ `/docs` አልተጠናቀረም) ይመልከቱ፣
> እንዲሁም ለ`codex`/`claude-code`/`droid`/`openclaw` binary መነሻ ሰንሰለት
> `docs/security/SUPPLY_CHAIN.md`ን ይመልከቱ።

## Redis Sidecar

OmniRoute የተሰራጨውን የፍጥነት ገዳቢ እና የጋራ መሸጎጫ ለመደገፍ Redis ላይ ይመረኮዛል። የ`redis` አገልግሎት በ`docker-compose.yml` ውስጥ **ሁልጊዜ ይገለጻል** (የመገለጫ ገደብ የለውም)፣ እና ከማንኛውም ሌላ መገለጫ ጋር አብሮ ይጀምራል።

| ዝርዝር                    | እሴት                                  |
| ----------------------- | ------------------------------------ |
| ምስል                     | `redis:7-alpine`                     |
| የኮንቴይነር ስም              | `omniroute-redis`                    |
| ውስጣዊ ወደብ                | `6379`                               |
| የአስተናጋጅ ወደብ (ሊተካ የሚችል)  | `REDIS_PORT` (ነባሪው `6379`)           |
| የአስተናጋጅ ማሰሪያ (ሊተካ የሚችል) | `REDIS_BIND_HOST` (ነባሪው `127.0.0.1`) |
| የውሂብ ጥራዝ                | `omniroute-redis-data` → `/data`     |
| የጤና ምርመራ                | `redis-cli ping` (በየ10s ልዩነት)        |

ተዛማጅ የአካባቢ ተለዋዋጮች፦

- `REDIS_URL` — ወደ መተግበሪያው የሚገባ የግንኙነት ሕብረቁምፊ (በነባሪ `redis://redis:6379`)።
- `REDIS_PORT` — ለRedis ኮንቴይነር የአስተናጋጅ-ወገን የወደብ ማዛመጃ።
- `REDIS_BIND_HOST` — ወደቡ የሚታተምበት የአስተናጋጅ በይነገጽ። ነባሪው `127.0.0.1` ነው።

> **በነባሪ loopback የሆነበት ምክንያት፦** sidecar ያለ `requirepass` ይሰራል፣ እና የመተግበሪያው
> ኮንቴይነሮች በcompose አውታረ መረብ (`redis:6379`) በኩል ይደርሱበታል — የታተመው ወደብ
> ለአስተናጋጅ-ወገን መሣሪያዎች (`redis-cli`፣ አካባቢያዊ `npm run dev`) ብቻ ነው። በ
> `0.0.0.0` ላይ ማተም ማረጋገጫ የሌለውን Redis በLANዎ ላይ ላለ እያንዳንዱ አስተናጋጅ
> ያጋልጣል። `REDIS_BIND_HOST=0.0.0.0` ካዘጋጁ፣ `--requirepass`ንም ወደ አገልግሎቱ `command:` ያክሉ።

**Redisን ማሰናከል** አይመከርም (የፍጥነት ገዳቢው ወደ የማህደረ ትውስታ አማራጭ ያሽቆለቁላል)። የግድ ከሆነ፣ በ`docker-compose.yml` ውስጥ ያለውን የ`redis:` አገልግሎት ብሎክ ያስወግዱ/አስተያየት ያድርጉበት፣ ወይም ወደ ዜሮ ያመጣጥኑት፦

```bash
docker compose up -d --scale redis=0
```

## የምርት Compose

ከልማት ጎን ለጎን ለሚሰራ የተነጠለ የምርት ቅጽበታዊ ቅጂ፣ `docker-compose.prod.yml`ን ይጠቀሙ።

| ዝርዝር           | እሴት                                                                            |
| -------------- | ------------------------------------------------------------------------------ |
| ፋይል            | `docker-compose.prod.yml`                                                      |
| ነባሪ የዳሽቦርድ ወደብ | `PROD_DASHBOARD_PORT=20130` (ከውስጣዊ `${DASHBOARD_PORT:-20128}` ጋር የተዛመደ)        |
| ነባሪ API ወደብ    | `PROD_API_PORT=20131`                                                          |
| ምስል            | `omniroute:prod` (ከ`runner-cli` ዒላማ የተገነባ)                                     |
| Redis ኮንቴይነር   | `omniroute-redis-prod` (`redis:8.6.2`፣ የተለየ `redis-prod-data` የውሂብ ጥራዝ)        |
| የውሂብ ጥራዝ       | `omniroute-prod-data` (ስም የተሰጠው፣ እንደገና በሚገነባበት ጊዜ የሚቆይ)                        |
| የጤና ምርመራዎች     | `node healthcheck.mjs` + `redis-cli ping`፣ `depends_on` በRedis ጤናማነት ሁኔታ የተገደበ |

አጠቃቀም፦

```bash
# የምርት stackን ይገንቡ እና ያስጀምሩ
docker compose -f docker-compose.prod.yml up -d --build

# ምዝግቦችን በቀጥታ ይልቀቁ
docker compose -f docker-compose.prod.yml logs -f

# ያቁሙ እና ያስወግዱ (የውሂብ ጥራዞችን ያቆዩ)
docker compose -f docker-compose.prod.yml down
```

የምርት stack ከልማት compose ጋር በትይዩ ይሰራል (የተለያዩ የኮንቴይነር ስሞች፣ ወደቦች እና የውሂብ ጥራዞች)፣ ስለዚህ ምርት እንደተነሳ ሳለ በአካባቢዎ ላይ መሻሻልዎን መቀጠል ይችላሉ።

## የDockerfile ደረጃዎች

ማከማቻው ባለብዙ-ደረጃ Dockerfile (`Dockerfile`) ይዟል። አራት ደረጃዎች ቀርበዋል፤ ለአጠቃቀምዎ ትክክለኛውን `target` ይምረጡ።

| ደረጃ           | መሠረታዊ image           | ዓላማ                                                                                                                                                                                                                              |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ጥገኞችን ይጭናል (`npm ci --legacy-peer-deps`) እና `npm run build` ያስኬዳል (በነባሪ Turbopack — ከታች ያለውን የግንባታ ጊዜ ሀብቶች ይመልከቱ)                                                                                                                |
| `runner-base` | `node:26-trixie-slim` | የNext.js ራሱን የቻለ ውጤት ያለው የምርት runtime። **ምንም የአቅራቢ CLI አልተካተተም።**                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | `git`፣ `docker.io`፣ `docker-compose` እና አለምአቀፍ CLIዎችን ይጨምራል፦ `@openai/codex`፣ `@anthropic-ai/claude-code`፣ `droid`፣ `openclaw`። **ራስ-ሰር ወኪል ላላቸው የሥራ ፍሰቶች ይህን ይምረጡ።**                                                            |
| `runner-web`  | `runner-base`         | ለድር-ክፍለጊዜ አቅራቢዎች Playwright + የChromium አሳሽ (`--with-deps`) ይጨምራል፦ `gemini-web`፣ `claude-web`፣ `claude-turnstile`። **እነዚያን አቅራቢዎች ሲጠቀሙ ይህን ይምረጡ** — ያለዚህ ተራው image ጥያቄ በሚቀርብበት ጊዜ ይከሽፋል (በልቀት ቻናሎች ስር ያለውን የ`-web` ማስታወሻ ይመልከቱ)። |

አንድን የተወሰነ target በእጅ ይገንቡ፦

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### የግንባታ ጊዜ ሀብቶች

ሦስት build args የ`builder` ደረጃውን የሀብት ፍጆታ ይቆጣጠራሉ። እነሱ ለግንባታ ጊዜ ብቻ ናቸው —
`OMNIROUTE_MEMORY_MB` (ከታች) የተለየ የruntime ማስተካከያ ነው።

| Build arg                   | ነባሪ    | ተጽዕኖ                                                                                |
| --------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` በwebpack ይገነባል፦ ዝቅተኛ ከፍተኛው የማህደረ ትውስታ ፍጆታ፣ ግን የዘገየ። `1` Turbopackን ለመጠቀም ያስችላል። |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | ለሚጀመረው `next build` የV8 heap ከፍተኛ ገደብ (`--max-old-space-size`)።                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL`ን ያቀርባል፤ Next ለገጽ-ውሂብ ስብስብ `workers = N - 1`ን ያወጣል።              |

ትልቅ builder ላይ ከፍ ማድረግ ያለብዎት እና ሀብት ውስን የሆነ ግንባታ
**ከ** `✓ Compiled successfully` **በኋላ** ሲቋረጥ መጠርጠር ያለብዎት `OMNIROUTE_BUILD_WORKERS`ን ነው። እያንዳንዱ
የገጽ-ውሂብ worker የራሱ የሆነ process ነው፣ ዋናው `next build` ራሱም እንዲሁ ነው፤
በቀጥታ በVPS ላይ የተደረገ ድጋሚ ሙከራ (issue #7518) የእያንዳንዱ process ከፍተኛ RSS
ከ`NODE_OPTIONS` heap flag ነጻ በሆነ መንገድ ~4.5 GB እንደሆነ ለክቷል (Turbopack ከV8 heap
ውጭ ባለው native/Rust ማህደረ ትውስታ ውስጥ ያጠናቅራል)። የ`2` ነባሪ ዋጋ (→ 1 worker፣ በድምሩ 2
processes) የማተሚያ pipeline ለሚጠቀምባቸው 16 GB / 4 vCPU በGitHub ላይ ለሚስተናገዱ runners
ተመጣጥኖ ተዘጋጅቷል። `8` ላይ (→ 7 workers) ያ runner ማህደረ ትውስታው አልቆ
buildkit ደረጃውን `ResourceExhausted: ... cannot allocate memory` በሚል አሳስቶታል፤
`3` (→ 2 workers) እንኳን የእያንዳንዱ process RSS በግምት ፈንታ በቀጥታ ከተለካ በኋላ
አሁንም አልተመጣጠነም። `tests/unit/docker-build-memory-budget.test.ts`
በተለካው አኃዝ ላይ ስሌቱን ያከናውናል፣ ከሁለቱ ማስተካከያዎች አንዱ
ከrunner አቅም በላይ ካደገም ይከሽፋል።

Turbopack ከV8 heap **ውጭ** ባለ native Rust ማህደረ ትውስታ ውስጥ ያጠናቅራል፣ ስለዚህ
`OMNIROUTE_BUILD_MEMORY_MB` ገደብ አያበጅለትም። የማህደረ ትውስታ ገደብ ባለው host ላይ
ግንባታው ምንም የስህተት ጽሑፍ ሳይኖር OOM killer አማካኝነት SIGKILL ይደረጋል — በቀላሉ
በ`Creating an optimized production build` መሃል ይቆማል፣ ይህም ከማህደረ ትውስታ መሟጠጥ
ይልቅ የተንጠለጠለ ያስመስለዋል። ለዚህም ነው `Dockerfile` እንደ `npm run dev` / `npm run build`
በነባሪ ኮድ Turbopackን ከመጠቀም በተቃራኒ webpackን
(`OMNIROUTE_USE_TURBOPACK=0`) በነባሪ የሚጠቀመው፦ ምንም build args የሌለው ተራ `docker build .`
(Railway እና ሌሎች ባለአንድ-ጠቅታ hosts የሚያስኬዱት) ማህደረ ትውስታው በተገደበ builder ላይ
ያለማስጠንቀቂያ መቋረጥ የለበትም። የታተሙት images አስቀድመው `docker-publish.yml` ውስጥ
`OMNIROUTE_USE_TURBOPACK=0`ን በግልጽ ያስተላልፋሉ። ብዙ RAM ባለው builder ላይ ለፈጣን
ግንባታ Turbopackን ለመጠቀም ይምረጡ፦

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ነቅቷል፣ ስለዚህ `next build` ዋና process **እና** worker
process ያስኬዳል፣ እያንዳንዱም `OMNIROUTE_BUILD_MEMORY_MB`ን ለየብቻ ያከብራል። የcontainer
ገደቡን ከዚያ ዋጋ አንድ እጥፍ ሳይሆን በግምት ከሁለት እጥፍ በላይ ያድርጉት።

በዚህ tree ላይ የተለካ (`--target runner-base`፣ `OMNIROUTE_BUILD_MEMORY_MB=6144`)፦

| Bundler   | የcontainer ገደብ | ውጤት                              |
| --------- | -------------- | -------------------------------- |
| Turbopack | 8 GiB / 16 GiB | በሁለቱም ላይ ያለማስጠንቀቂያ OOM-killed ሆነ |
| webpack   | 8 GiB          | build worker SIGKILLed ሆነ        |
| webpack   | 12 GiB         | ተሳካ፣ ከፍተኛው 11.1 GiB ደረሰ          |

### የRuntime ነባሪዎች

በ`runner-base` የሚላኩ ነባሪዎች፦ `PORT=20128`፣ `HOSTNAME=0.0.0.0`፣ `OMNIROUTE_MEMORY_MB=1024`፣ `NODE_OPTIONS=--max-old-space-size=1024`፣ `DATA_DIR=/app/data`፣ `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`።

በDocker ውስጥ የማህደረ ትውስታ ባህሪ፦

- ኢሜጁ `OMNIROUTE_MEMORY_MB=1024`ን ያዘጋጃል፣ ከዚያም `NODE_OPTIONS=--max-old-space-size=1024`ን ያመነጫል።
- ትክክለኛው የሰርቨር ፕሮሰስ የሚጀመረው `OMNIROUTE_MEMORY_MB`ን አንብቦ `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`ን በሚያክለው ራሱን የቻለ ማስጀመሪያ ነው።
- Node በተደጋጋሚ ከተሰጡት `--max-old-space-size` እሴቶች የመጨረሻውን ይጠቀማል፤ ስለዚህ `OMNIROUTE_MEMORY_MB`ን ማዘጋጀት ተግባራዊውን የDocker heap ገደብ ይቆጣጠራል።
- ኢሜጁ ሁልጊዜ ይህን ስለሚያዘጋጅ፣ የማስጀመሪያው በራሱ RAM መጠን የሚስተካከል መጠባበቂያ በDocker ስር ፈጽሞ ጥቅም ላይ አይውልም። ለሥራው ጫና በግልጽ ያሳድጉት (ከታች ያለውን ሰንጠረዥ ይመልከቱ)። `2048` እንኳን ለcoding-agent `/v1/responses` አሁንም በጣም አነስተኛ ነው።

### ለcoding agents የሚያስፈልግ የRuntime RAM

የ1 GiB Docker ነባሪ መጠን ለdashboard/ቀላል ውይይት ዝቅተኛው ገደብ እንጂ የproduction መጠን አይደለም። ረጅም `POST /v1/responses` ይዘቶች (በመቶዎች የሚቆጠሩ መልዕክቶች፣ በአስሮች የሚቆጠሩ መሣሪያዎች) በማመቅ ጊዜ በርካታ በማህደረ ትውስታ ውስጥ ያሉ graphsን እንደያዙ ይቆያሉ። ሁለት ተደራራቢ ~3 MiB / ~750k-token ጥያቄዎች በ**12 GiB** old-space ላይ V8ን እንዲቋረጥ (`FATAL ERROR: Reached heap limit`) አድርገዋል፣ እንዲሁም የ16 GiB cgroup OOM ገደብን ደርሰዋል። [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)ን ይመልከቱ።

የ**cgroup `--memory`ን ከheap በላይ ያዘጋጁ** — native buffers፣ SQLite እና የማመቂያ መካከለኛ ውጤቶች ከV8 ውጭ ይቀመጣሉ።

| የሥራ ጫና                                | `OMNIROUTE_MEMORY_MB` | Container / cgroup      | ማስታወሻዎች                                                                                  |
| ------------------------------------- | --------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| Dashboard፣ አንድ ቀላል ውይይት               | `1024` (የኢሜጁ ነባሪ)     | ≥2 GiB                  |                                                                                          |
| አንድ coding agent (Claude/Codex/Grok)  | `8192`                | ≥10 GiB                 | የተለመደ ባለአንድ-session `/v1/responses`                                                      |
| ሁለት በአንድ ጊዜ የሚካሄዱ ረጅም `/v1/responses` | `10240`–`12288`       | ≥12–16 GiB              | በ~12 GiB heap ላይ የተለካ የV8 መቋረጥ                                                           |
| ሦስት+ በአንድ ጊዜ የሚካሄዱ ረጅም contexts       | በአንድ process ላይ አያድርጉ | በተከታታይ ያከናውኑ / ተጨማሪ RAM | ነባሪው heavyweight admission በሂደት ላይ ለሚገኝ 1 ጥያቄ ነው፤ RAMን ሳያሳድጉ ይህን ማሳደግ መቋረጡን እንደገና ያስከትላል |

`OMNIROUTE_MEMORY_MB` **ሳይዘጋጅ** ሲቀር፣ `omniroute serve` በbare metal ላይ ወደ ~35% የRAM መጠን ይስተካከላል (በ`[512, 4096]` ውስጥ የተገደበ)። Docker ሁልጊዜ `1024`ን ስለሚያዘጋጅ፣ ያ ማስተካከያ በይፋዊው ኢሜጅ ውስጥ ፈጽሞ አይከናወንም።

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## ወሳኝ የአካባቢ ተለዋዋጮች

በ[ENVIRONMENT.md](../reference/ENVIRONMENT.md) ውስጥ ከተመዘገቡት ነባሪዎች በተጨማሪ፣ በDocker ስር ሲሰሩ የሚከተሉት ተለዋዋጮች ከሁሉም የበለጠ አስፈላጊ ናቸው፦

| ተለዋዋጭ                         | ዓላማ                                                                                                                                                                                                                                | ነባሪ                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | ለWebSocket bridge የሚያገለግል የጋራ ሚስጥር። **በproduction ውስጥ ያስፈልጋል** — ወደ ጠንካራ የዘፈቀደ ሕብረቁምፊ ያዘጋጁት።                                                                                                                                       | አልተዘጋጀም (መቅረብ አለበት)    |
| `REDIS_URL`                   | ለrate limiter / cache backend የግንኙነት ሕብረቁምፊ                                                                                                                                                                                        | `redis://redis:6379`   |
| `REDIS_PORT`                  | ለተካተተው Redis container የhost-side port                                                                                                                                                                                             | `6379`                 |
| `REDIS_BIND_HOST`             | የተካተተው Redis port የሚታተምበት host interface (AUTH ካላከሉ በስተቀር loopback)                                                                                                                                                                | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ለself-update workflows በ`cli` profile ውስጥ በ`/workspace/omniroute` ላይ የሚሰቀል host path                                                                                                                                               | `.` (የአሁኑ directory)   |
| `OMNIROUTE_MEMORY_MB`         | ለDocker standalone server የruntime Node heap ከፍተኛ ገደብ፤ ከላይ ያለውን የimage ነባሪ ይተካል። ለcoding agents፦ `8192`+ ([runtime RAM](#runtime-ram-for-coding-agents)ን ይመልከቱ)።                                                                   | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | ለdashboard (20128) እና API (20129) የተጋለጡ portsን ይተኩ                                                                                                                                                                                 | `20128` / `20129`      |
| `APP_BIND_HOST`               | docker-compose የdashboard/API/live-WS portsን የሚያትምበት host interface። `REQUIRE_API_KEY=false` (ነባሪው) ሲሆን፣ `0.0.0.0` ማንነት ማረጋገጫ የሌለውን `/v1` proxy ለLAN ያጋልጣል — `REQUIRE_API_KEY=true` ሲሆን ወይም ከፊት ለፊት reverse proxy ሲኖር ብቻ ወሰኑን ያስፉ። | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | docker-compose የ`cliproxyapi` sidecarን የሚያትምበት host interface — የውሂብ volumeው የprovider ማረጋገጫ መረጃዎችን ይይዛል።                                                                                                                          | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | የruntime plugin scanner የሚያነብበትና የሚጭንበት directory። plugins በbind mount ሲደረጉ ያዘጋጁት፦ ነባሪው `HOME`ን ይከተላል፣ image ደግሞ ይህን ወደ ውጭ ላይልክ ይችላል።                                                                                              | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | appው ከreverse proxy በስተጀርባ ሲታተም የURL subpath (ለምሳሌ፣ `/omniroute`)                                                                                                                                                                  | _(ባዶ = root)_          |
| `NEXT_PUBLIC_BASE_URL`        | subpathን ጨምሮ የይፋ browser origin (ለምሳሌ፣ `https://host/omniroute`)                                                                                                                                                                   | አልተዘጋጀም                |
| `PROD_DASHBOARD_PORT`         | ለ`docker-compose.prod.yml` የhost-side dashboard port                                                                                                                                                                               | `20130`                |
| `CLIPROXYAPI_PORT`            | ለ`cliproxyapi` sidecar የhost-side port                                                                                                                                                                                             | `8317`                 |

## በንዑስ ዱካ ላይ Reverse Proxy (Traefik / nginx)

የNext.js `basePath` በstandalone bundle ውስጥ ይቀናበራል። OmniRoute በተተገበረው
የመተግበሪያው ሥር ያለ የምልክት ፋይል ውስጥ ዋጋውን ይመዘግባል (በ`npm run build` ጊዜ ይጻፋል፤
በ`scripts/docker/ensure-docker-base-path.mjs` ይነበባል) እና ኮንቴይነሩ ሲጀምር ከ
`OMNIROUTE_BASE_PATH` ጋር ያነጻጽረዋል። እሴቶቹ ሲለያዩ እና imageው
ለዶሜኑ ሥር የተገነባ ከሆነ፣ entrypointው standalone manifestsን፣ የተካተቱትን
`basePath`/`assetPrefix` literals (Next 16 የSSR asset URLዎችን ከ
`assetPrefix` ብቻ ያቀርባል — patcherው ንዑስ ዱካውን ወደዚያም ያንጸባርቃል)፣ በቅድሚያ የተካተቱትን
`/_next/static` asset URLዎች (client-reference manifests፣ media imports፣ በቅድሚያ የተቀረጹ
የስህተት ገጾች) እና የclient `process.env` shimን `node dev/run-standalone.mjs`
ከመሄዱ በፊት እንደገና ይጽፋል።

### የCompose build (የሚመከር)

imageው እና runtimeው እንዲጣጣሙ ሁለቱንም variables በ`.env` ውስጥ ያዘጋጁ፣ ከዚያም እንደገና ይገንቡ፦

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH`ን እንደ Docker build-arg እና እንደ
runtime environment variable ያስተላልፋል።

### በቅድሚያ የተገነባ root image + runtime ንዑስ ዱካ

የታተሙት `diegosouzapw/omniroute:*` images ለዶሜኑ ሥር የተገነቡ ናቸው። ቢሆንም
`OMNIROUTE_BASE_PATH`ን በruntime ማዘጋጀት ይችላሉ፤ ኮንቴይነሩ ሲጀምር bundleውን አንድ ጊዜ patch ያደርጋል።
ከሚዛመደው ይፋዊ origin ጋር ያጣምሩት፦

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

reverse proxyው **ሙሉውን** ውጫዊ ዱካ እንዲያስተላልፍ ያዋቅሩት (prefixውን አያስወግዱ)።
Next.js `/omniroute/...`ን ተቀብሎ assetsን ከ
`/omniroute/_next/...` እንዲያቀርብ፣ Traefik `PathPrefix(`/omniroute`)`ን ያለ
`StripPrefix` ወደ ኮንቴይነሩ route ማድረግ አለበት።

የDocker healthcheck ከንቁ `OMNIROUTE_BASE_PATH` በፊት የተጨመረውን ቀላል
የ`/healthz` lifecycle endpoint ይመረምራል። `/api/monitoring/health` ለ
ሰው/dashboard ምርመራዎች እንደተገኘ ይቆያል፤ የኮንቴይነሩን HEALTHCHECK ወደዚያ መልሶ ለማመልከት (ለምሳሌ
ለጥልቅ የጤና ማረጋገጫ)፣ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`ን ያዘጋጁ።
ይህ ዱካ **ጥልቅ** ምርመራ ነው (DB + monitoring summary) — ተመልሰው ለመጠቀም ከመረጡ ለDocker
አልፎ አልፎ ለሚካሄደው `HEALTHCHECK` ተስማሚ ነው፣ ነገር ግን ለKubernetes `livenessProbe`
ክፍተቶች **አይደለም**።

ለorchestrators (Kubernetes፣ Nomad፣ ወዘተ)፦

| ምርመራ           | የሚመረጠው                                                     | የሚወገደው                                          |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| Liveness       | HTTP `GET /livez`፣ ወይም TCP በዋናው port (`PORT`፣ ነባሪ `20128`) | `/api/monitoring/health`ን እንደ liveness          |
| Readiness      | HTTP `GET /healthz`                                        | event-loopን busy መሆን እንደ መሞት የሚቆጥሩ አጭር timeouts |
| ጥልቅ / blackbox | `/api/monitoring/health`                                   | —                                               |

`/healthz` የprocess lifecycleን (`ok` / `starting` / `stopping`) ያሳውቃል። `/livez`
processው በሕይወት መኖሩን ብቻ ያረጋግጣል (handlerው መሄድ በቻለ ቁጥር 200፤
readinessን አይጠብቅም)። ሁለቱም አሁንም request handling በሚጠቀምበት ተመሳሳይ Node event loop ላይ ይሰራሉ፣ ስለዚህ
CPU-bound የcatalog ወይም compression ሥራ ሊያዘገያቸው ይችላል — busy ≠ dead። HTTP
ምርመራዎች time out ካደረጉ TCP livenessን ይምረጡ። ሙሉ የምርመራ መመሪያ፦
[የMonitoring መመሪያ — የKubernetes ምርመራ ምክረ ሐሳቦች](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ከCaddy ጋር (HTTPS Auto-TLS)

OmniRoute የCaddyን ራስ-ሰር SSL አቅርቦት በመጠቀም በደህንነት ለውጭ ሊቀርብ ይችላል። የዶሜንዎ DNS A መዝገብ ወደ አገልጋይዎ IP እንደሚያመለክት ያረጋግጡ።

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
      # ለOAuth መልሶ ጥሪዎች፣ ለዳሽቦርድ አገናኞች እና ለሚፈጠሩ ይፋዊ URLs በአሳሽ በኩል የሚታይ መነሻ።
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # ለታቀዱ ሥራዎች / ራስ-ሰር ጥያቄዎች የውስጥ አገልጋይ-ለአገልጋይ URL።
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

Caddy ለወደላይኛው ኮንቴይነር መደበኛ የማስተላለፊያ ራስጌዎችን ያዘጋጃል። OmniRoute
`NEXT_PUBLIC_BASE_URL`ን ለOAuth መልሶ ጥሪዎች እና ለሚፈጠሩ ይፋዊ
አገናኞች ቀኖናዊ ይፋዊ መነሻ አድርጎ ይጠቀማል፤ ማረጋገጫ የተደረገባቸው የዳሽቦርድ የመጻፍ ጥያቄዎች የተመሳሳይ-መነሻ ጥያቄዎችን ከክፍለ-ጊዜ ጋር ከተሳሰረ CSRF
ጥበቃ ጋር ይጠቀማሉ። OmniRoute ይፋዊውን መነሻ ከግልጽ
ውቅር ይልቅ ከታመኑ የተላለፉ ራስጌዎች እንዲያወጣ ሆን ብለው ለሚፈልጉባቸው የላቁ ስምሪቶች ብቻ `OMNIROUTE_TRUST_PROXY`ን ያንቁ።

## Cloudflare Quick Tunnel

ለDocker ስምሪቶች የዳሽቦርድ ድጋፍ በ`Dashboard → Endpoints` ላይ በአንድ ጠቅታ የሚነቃ **Cloudflare Quick Tunnel**ን ያካትታል። መጀመሪያ ሲነቃ `cloudflared`ን አስፈላጊ ሲሆን ብቻ ያወርዳል፣ ወደ የአሁኑ `/v1` የመጨረሻ ነጥብዎ ጊዜያዊ ዋሻ ያስጀምራል፣ እንዲሁም የተፈጠረውን `https://*.trycloudflare.com/v1` URL በመደበኛው ይፋዊ URLዎ ስር በቀጥታ ያሳያል።

የመጨረሻ ነጥብ ዋሻ ፓነሎች (Cloudflare፣ Tailscale፣ ngrok) ንቁ የዋሻ ሁኔታን ሳይቀይሩ ከ`Settings → Appearance` ሊታዩ ወይም ሊደበቁ ይችላሉ።

### የዋሻ ማስታወሻዎች

- Quick Tunnel URLs ጊዜያዊ ሲሆኑ ከእያንዳንዱ ዳግም ማስጀመር በኋላ ይቀየራሉ።
- Quick Tunnels ከOmniRoute ወይም ከኮንቴይነር ዳግም ማስጀመር በኋላ በራስ-ሰር አይመለሱም። ሲያስፈልግ ከዳሽቦርዱ ዳግም ያንቋቸው።
- የሚተዳደረው ጭነት በአሁኑ ጊዜ Linux፣ macOS እና Windowsን በ`x64` / `arm64` ይደግፋል።
- የሚተዳደሩ Quick Tunnels በተገደቡ የኮንቴይነር አካባቢዎች ውስጥ ጫጫታ ያላቸውን የQUIC UDP ቋት ማስጠንቀቂያዎች ለማስወገድ በነባሪ HTTP/2 ማጓጓዣን ይጠቀማሉ። የተለየ ማጓጓዣ ከፈለጉ `CLOUDFLARED_PROTOCOL=quic` ወይም `auto` ያዘጋጁ።
- Docker ምስሎች የስርዓት CA ስሮችን ያካትታሉ እና ወደሚተዳደረው `cloudflared` ያስተላልፏቸዋል፤ ይህም ዋሻው በኮንቴይነሩ ውስጥ ሲነሳ የTLS እምነት ውድቀቶችን ያስወግዳል።
- OmniRoute አዲስ ፋይል ከማውረድ ይልቅ አስቀድሞ ያለ binaryን እንዲጠቀም ከፈለጉ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ያዘጋጁ።

## የምስል መለያዎች

| ምስል                      | መለያ      | መጠን    | መግለጫ                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | ከፍተኛው **የታተመ** የተረጋጋ SemVer (git `main` አይደለም) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | ለGitOps የዚህን አይነት መለያ ይቆልፉ                     |

ባለብዙ-መድረክ manifest፦ `linux/amd64` + `linux/arm64` ቤተኛ (Apple Silicon፣ AWS Graviton፣ Raspberry Pi)። Docker ተዛማጁን architecture በራስ-ሰር ይመርጣል፤ በARM hosts ላይ AMD64 emulationን በግድ መጠቀም ካስፈለገዎት `--platform linux/amd64`ን ያስተላልፉ።

### የልቀት ቻናሎች

OmniRoute ለተረጋጉ ልቀቶች፣ ለንቁ የልቀት-ቅርንጫፍ ሙከራ እና ለልማት ግንባታዎች የተለያዩ Docker ቻናሎችን ያትማል።

| ቻናል                             | ምንጭ                         | የመለወጥ ችሎታ         | የሚመከር አጠቃቀም                                                                                       |
| ------------------------------- | --------------------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | የተፈረመ/ስሪት የተሰጠው ልቀት         | የማይለወጥ            | ትክክለኛ ልቀትን የሚቆልፉ የምርት ስምሪቶች                                                                       |
| `:latest` / `:latest-web`       | ከፍተኛው **የታተመ** የተረጋጋ SemVer | ተለዋዋጭ የተረጋጋ ጠቋሚ   | ከSemVer የህትመት ሥራ **በኋላ** የተረጋጉ ልቀቶችን ይከተላል — `main`ን ወይም ያልተለቀቁ `release/v*` commitsን **አይከታተልም** |
| `:next` / `:next-web`           | የአሁኑ ነባሪ `release/v*` ቅርንጫፍ | ተለዋዋጭ ቅድመ-ልቀት ጠቋሚ | በንቁው የልቀት ቅርንጫፍ ላይ የገቡ ነገር ግን ገና በተረጋጋ ልቀት ውስጥ ያልተካተቱ ማስተካከያዎችን መሞከር                              |
| `:main` / `:main-web`           | `main` ቅርንጫፍ                | ተለዋዋጭ የልማት ጠቋሚ    | ለልማት እና ለውህደት ሙከራ ብቻ                                                                              |

#### የድር-ክፍለ-ጊዜ አቅራቢዎች፦ የ`-web` ምስሎች

ከላይ ያለው እያንዳንዱ ቻናል ከ`runner-web` ደረጃ የተገነባ `-web` መለያ (`:latest-web`፣ `:<version>-web`፣ `:next-web`፣ `:main-web`) ይኖረዋል — ተመሳሳዩ ምስል ከPlaywright እና Chromium አሳሽ ጋር። መደበኛው ምስል Chromiumን **ሳያካትት** ይቀርባል፤ `gemini-web`፣ `claude-web` እና `claude-turnstile` ያስፈልጋቸዋል።

ውድቀቱ የሚዘገይ እንጂ በማስጀመሪያ ጊዜ አይከሰትም፦ እነዚያ አቅራቢዎች ሞዴሎቻቸውን ይዘረዝራሉ፣ በዳሽቦርዱ ውስጥም እንደተገናኙ ይታያሉ፣ እና የመጀመሪያው ጥያቄ ብቻ በሚከተለው ስህተት ይወድቃል

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

እነዚያን አቅራቢዎች የሚጠቀሙ ከሆነ፣ አሁን ካሉበት ቻናል የ`-web` መለያን pull ያድርጉ — ሌላ ምንም ነገር አይቀየርም። በnpm/CLI ጭነት ላይ (Docker ምስል በሌለበት)፣ ተመጣጣኙ የጎደለው ክፍል የአሳሹ binary ነው፦ በhost ላይ `npx playwright install chromium`ን ያሂዱ።

#### የቅድመ-ልቀት ቻናሉን መጠቀም

`next` ቻናል ወደ አሁኑ ነባሪ `release/v*` ቅርንጫፍ በሚደረግ እያንዳንዱ push ላይ እንደገና የሚገነባ ሲሆን ለAMD64 እና ARM64 ይታተማል። የቆዩ የጥገና ቅርንጫፎች በላዩ ላይ ደርበው መጻፍ አይችሉም። ይህ ቻናል ቀጣዩ የተረጋጋ tag ከመዘጋጀቱ በፊት ወደ ንቁው የልቀት ቅርንጫፍ ለተዋሃዱ ማስተካከያዎች pull ሊደረግ የሚችል image ያቀርባል።

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

ለDocker Compose፣ በተመረጠው profile ጥቅም ላይ የዋለውን image tag override ያድርጉ፣ ከዚያም service-ውን pull አድርገው እንደገና ይፍጠሩ፦

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ደህንነት እና ወደ ቀዳሚው ስሪት መመለስ

`next` ተንሳፋፊ የቅድመ-ልቀት ቻናል ነው። ወደ ንቁው የልቀት ቅርንጫፍ በሚደረግ ማንኛውም push ላይ ሊቀየር የሚችል ሲሆን **ለproduction አጠቃቀም ድጋፍ አይደረግለትም**። አንድን የተወሰነ build በሚገመግሙበት ጊዜ image digest-ውን pin ያድርጉ፦

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ከሙከራው በፊት የOmniRoute data volume ወይም bind-mounted data directory ምትኬ ይያዙ። ወደ ቀዳሚው ስሪት ለመመለስ፣ ቀደም ሲል ጥቅም ላይ የነበረውን የተረጋጋ ስሪት ወይም digest ወደነበረበት ይመልሱ እና container-ውን እንደገና ይፍጠሩ፦

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

የrelease-branch build `latest`ን በፍጹም ማንቀሳቀስ አይችልም፤ የተረጋጋውን pointer promote ማድረግ የሚችለው መስፈርቱን የሚያሟላ የተረጋጋ semantic version ብቻ ነው። የ`next` images የrelease image ፍተሻን እና CRITICAL ተጋላጭነትን የሚያግድ gate ይዘው ይቆያሉ።

**`latest` ለgit ወቅታዊነት ዋስትና አይደለም።** በ`main` ወይም በንቁው `release/v*` ቅርንጫፍ ላይ የተዋሃዱ ማስተካከያዎች የተረጋጋ SemVer image እስኪታተም እና publish job-ው `:latest`ን promote እስኪያደርግ ድረስ (ከዚያ SemVer ጋር ተመሳሳይ digest) በ`:latest` ውስጥ **አይኖሩም**። GitHub ማስተካከያውን አስቀድሞ እያሳየ ሳለ `latest` የቆመ ከመሰለ፣ የrelease branch-ውን ለመሞከር `:next`ን pull ያድርጉ ወይም SemVer tag-ውን ይጠብቁ።

| የሚፈልጉት                                                | ይጠቀሙ                                     |
| ----------------------------------------------------- | ---------------------------------------- |
| መንሸራተት የሌለበት GitOps / production                      | `:X.Y.Z`ን pin ያድርጉ (ወይም image digest-ውን) |
| የታተሙ የተረጋጉ ስሪቶችን መከተል እና በእያንዳንዱ ልቀት እንደገና መፍጠርን መቀበል | `:latest`                                |
| ያልተለቀቁ `release/v*` commitsን መሞከር                     | `:next` (ለproduction አይደለም)              |
| `main`ን መሞከር                                          | `:main` (ለproduction አይደለም)              |

## በDocker ውስጥ የዳሽቦርድ ዝማኔዎች

ከታተመ image የተፈጠረ container ራሱን መተካት አይችልም። OmniRoute በcontainer ውስጥ እየሰራ መሆኑን (`.git` checkout የሌለውና npm install ያልሆነ) ሲያውቅ፣ በመነሻ ዳሽቦርድ ላይ ያለው የዝማኔ ማስታወቂያ ከnpm/git መመሪያዎች ይልቅ በhost ላይ መስራት ያለበትን ትዕዛዝ ከቅጂ አዝራር ጋር ያሳያል፦

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

የservice ስሙ ከ`AUTO_UPDATE_SERVICE` ይመጣል (ነባሪው `omniroute` ሲሆን፣ ይህም በ`docker-compose.selfhost.yml` ውስጥ ያለው service ነው)። `pull` የሚያዘምነው ተንሳፋፊ tag (`latest`፣ `next`) ብቻ ነው፤ ቋሚ በሆነ `:X.Y.Z` tag ሲጠቀሙ መጀመሪያ tag-ውን ያርትዑ።

### በhost trigger file አማካኝነት የአንድ-ጠቅታ ዝማኔዎች

`/var/run/docker.sock`ን mount ሳያደርጉ **Update Now** እንዲሰራ ለማድረግ (ይህም container-ው በhost ላይ root ሥልጣን እንዲኖረው ያደርጋል — ከላይ ያለውን የ`cli` profile ማስጠንቀቂያ ይመልከቱ)፣ በOmniRoute service ላይ `DOCKER_UPDATE_TRIGGER_FILE`ን ያቀናብሩና በhost ላይ watcher ያስኪዱ፦

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

path-ው በ`DATA_DIR` ውስጥ መሆን አለበት (አንጻራዊ እሴቶች ከዚሁ አንጻር ይፈታሉ)፤ ሌላ ማንኛውም ቦታ ውድቅ ይደረጋል። ከዚያ **Update Now** ወደዚያ file `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` ይጽፋል፣ `202` ምላሽ ይሰጣል፣ እና ዳሽቦርዱ አዲሱ version እስኪሰራ ድረስ `/api/system/version`ን በተደጋጋሚ ይፈትሻል፤ ከዚያም እንደገና ይጫናል። በዚህ mode ውስጥ OmniRoute ፈጽሞ shell ወይም Docker ትዕዛዝ አያስኬድም። እንደማንኛውም የዝማኔ እርምጃ፣ ጥያቄው ተቀባይነት የሚያገኘው ከloopback/LAN clients ብቻ ነው።

በbind mount የተደረገ data directory host-ው የሚከታተለው የተረጋጋ path ይሰጠዋል። የ`systemd` units ምሳሌዎች (`/srv/omniroute`ን compose file-ዎን እና `data/`ን ወደያዘው directory ያስተካክሉ)፦

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=የOmniRoute ዳሽቦርድ የዝማኔ ጥያቄዎችን ተከታተል

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=የOmniRoute containerን pull አድርግና እንደገና ፍጠር

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

ያልተሳካ አሂድ ወደ loop እንዳይገባ፣ service-ው pull ከማድረጉ በፊት ጥያቄውን ያስወግዳል። `DOCKER_UPDATE_TRIGGER_FILE` ከሌለ ዳሽቦርዱ በእጅ የሚሰራውን የትዕዛዝ ሂደት ይቀጥላል።

## ተገኝነት፡ ነባሪ SQLite ነጠላ-ብዜት ነው።

የአክሲዮን Docker / Kubernetes OmniRoute ነው።** አንድ መስቀለኛ ሂደት + አንድ SQLite ጸሐፊ** . ከፍተኛ ተደራሽነት ነው።** አይደገፍም።** በዚያ ቶፖሎጂ ላይ.

| ገደብ                                       | መዘዝ                                                                                                                                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ነጠላ ጸሐፊ                                   | መ ስ ራ ት** አይደለም** በተመሳሳዩ SQLite ፋይል ላይ ብዙ ቅጂዎችን ያሂዱ። DB ያበላሻል።                                                                                                                                                                        |
| እንደገና ፍጠር / እንደገና አስጀምር / HEALTHCHECK ግድያ | **ሙሉ መቋረጥ** የበረራ ውስጥ SSE፣ ዳሽቦርድ ክፍለ ጊዜዎች እና የማህደረ ትውስታ ሁኔታ። እያንዳንዱ የተገናኘ ደንበኛ ይወድቃል። በባዶ-ፍጻሜ መስኮቱ ወቅት አዲስ ጥያቄዎች ተገላቢጦሽ ተኪ ያገኛሉ**`502 Bad Gateway: Unknown error`** OmniRoute JSON አይደለም — ደንበኞች ይህንን ከአቅራቢው ውድቀት (#11015) መለየት አይችሉም። |
| እንደ `/healthz` ተመሳሳይ የክስተት ዑደት            | ሥራ የበዛበት ካታሎግ ወይም የመጨመቂያ ምልክት መመርመሪያዎችን ሊያዘገይ ይችላል; አጭር ጊዜ ካለፈ በኋላ እንደገና ይጀምራል** ብቻ** ግልባጭ                                                                                                                                            |

**የፍተሻ ማትሪክስ** (በተጨማሪ [የኩበርኔትስ የምርመራ ምክሮችን](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ይመልከቱ)

| መርማሪ      | ዒላማ                                                  | አይጠቀሙ                                 |
| --------- | ---------------------------------------------------- | ------------------------------------- |
| መኖር       | TCP በ `PORT` (ነባሪ `20128`)፣ ወይም ለስላሳ HTTP `/healthz` | `/api/monitoring/health`              |
| ዝግጁነት     | HTTP `GET /healthz`                                  | የክስተት-ሉፕን እንደ ሞተ የሚቆጥሩ ጥብቅ የጊዜ ማብቂያዎች |
| ጥልቅ / ሰዎች | `/api/monitoring/health`                             | አውቶሜትድ kubelet ህያውነት                  |

**ማሻሻያዎች፡** እያንዳንዱ ክፍለ ጊዜ እንደሚቀንስ ይጠብቁ. ከቻሉ ደንበኞችን አፍስሱ; በነባሪ SQLite ላይ ምንም የሚንከባለል ዝማኔ የለም። `restart: unless-stopped` ፕላስ Docker `HEALTHCHECK` ፃፍ እንዲሁም መያዣው ጤናማ ካልሆነ - ተመሳሳይ ፍንዳታ ራዲየስ በሚሆንበት ጊዜ ብቸኛውን ሂደት ይተካል።

ዝግጁ የሆኑ መግለጫዎች እና የ Helm ገበታ በ `deploy/kubernetes/` እና `deploy/helm/omniroute/` - የ [Kubernetes የማሰማራት መመሪያን](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) ይመልከቱ።

ኩበርኔትስ ቅንጭብጭብ ለ** ነጠላ ቅጂ** (ዳግም መፍጠር ያስፈልጋል፡ በአንድ SQLite ፋይል ላይ `replicas` ከፍ አታድርጉ)

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

`preStop` እንቅልፍ kube እንዲጥል ያስችለዋል የአገልግሎት የመጨረሻ ነጥቦች ከ SIGTERM በፊት** አዲስ** ትራፊክ ወደ ሞት ሂደት መምታት ያቆማል። በበረራ ላይ `/v1/responses` SSE እስከ `SHUTDOWN_TIMEOUT_MS` (ነባሪ 30ዎች) በከባድ ክብደት ማስገቢያ የሊዝ ውል (#11015) ይፈሳል። አሁንም ወደ ሂደቱ የሚደርሱ አዳዲስ ጥያቄዎች `503` + `Retry-After: 5` ያገኛሉ። ተተኪው ዝግጁ እስኪሆን ድረስ ባዶ-መጨረሻ ነጥብ ክፍተቱን እንደገና ይፍጠሩ ከባድ መቋረጥ ነው - ይህ SQLite ቶፖሎጂ ነው እንጂ የመርማሪ ስህተት አይደለም።

ውጫዊ Postgres / ባለብዙ ጸሃፊ HA ነው።** አይደለም** የተመዘገበ የአክሲዮን መንገድ። HA ከፈለጉ፣ ነጠላ ቅጂ ያስቀምጡ ወይም ፕሮጀክቱ የፈተነውን እና በተናጠል የመዘገበውን ቶፖሎጂ ያካሂዱ። የ Postgres/MySQL ስራ በ [# 8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ውስጥ ይኖራል. እስከዚያ መርከቦች ድረስ፣ ብቸኛው የሚደገፍ መንገድ ማባዛት።** ትልቅ** `/v1/responses` አቅም N ገለልተኛ ሂደቶች ነው (ቀጣይ ክፍል)፣ በአንድ ጥራዝ ላይ `replicas > 1` አይደለም።

## ማስፋፋት፦ N ገለልተኛ ሂደቶች

አንድ Node ሂደት **አንድ V8 heap** ነው። ሁለት በከፊል የሚደራረቡ ~3 MiB / ~~750k-token የኮድ ወኪል `POST /v1/responses` ጥያቄዎች (RTK + Caveman) ያንን heap በ~~12 Gi ላይ ያቋርጡታል (`FATAL ERROR: Reached heap limit`)፣ እንዲሁም 16 Gi cgroupን OOM ሊያደርጉ ይችላሉ። [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)ን ይመልከቱ። ይህ ልኬት **የማህደረ ትውስታ በጀት** ማስጠንቀቂያ እንጂ በአንድ ጊዜ ለሚሰሩ ረጅም `/v1/responses` ጥያቄዎች የምርቱ ጥብቅ ከፍተኛ ገደብ ሁለት ነው ማለት አይደለም። ከባድ የውይይት ጥያቄዎችን መቀበል፣ ከዚያው V8/cgroup ጣሪያ በራስ-ሰር በሚወሰን የገቢ ባይት በጀት (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ይገደባል — አስቀድሞ መጠኑ በተወሰነ ሂደት ላይ ይህን ወደ ላይ መሻር (ወይም የቀድሞውን `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` በጥያቄ ብዛት የሚለካ ገደብ ማዘጋጀት) መቋረጡን እንደገና ያስከትላል። አነስተኛ ውይይቶች፣ `/healthz`፣ `/v1/models` እና MCP በዚያ ገደብ ውስጥ **አይካተቱም**።

### አንድ ሂደት፦ ከሁለት በላይ ረጅም `/v1/responses`

**ጤናማ** ሂደት (heap ከ`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` በታች፣ ነባሪው `0.75`) በመላው ሂደቱ ያለው የበረራ ላይ ባይት በጀት (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) አሁንም ቦታ ካለው፣ ከሁለት በላይ በአንድ ጊዜ የሚሰሩ ረጅም `POST /v1/responses` ጥያቄዎችን ማስኬድ **ይችላል**። መጠናቸው ከ`OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ነባሪው 256 KiB) ጋር እኩል ወይም ከዚያ በላይ የሆኑ ይዘቶች፣ መዋቅር-ከባድ ጥያቄዎች የሚወስዱትን ተመሳሳይ የከባድ ስራ ፈቃድ ይወስዳሉ፣ እንዲሁም ተመሳሳዩን [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ማምለጫ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) ይጠቀማሉ። በርካታ በአንድ ጊዜ የሚሰሩ ረጅም SSE ደንበኞች (ኦፕሬተሮች ብዙውን ጊዜ 40–50 ያስፈልጋቸዋል) የ**ማህደረ ትውስታ በጀት** ጉዳይ ነው — heap + ዋና/headroom ቦታዎች + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`ን በአግባቡ ያስተካክሉ — የምርቱ ጥብቅ “ከፍተኛው 2” ገደብ አይደለም። ጫና ያለበት heap #7849 እንዳይመለስ አሁንም እንደገና ሊሞከር በሚችል `503` ጥያቄዎችን ይቀንሳል።

**heapsን ለማባዛት** (ገለልተኛ V8 old-spaces) **ዛሬ**፦

| ያድርጉ                                                                                                                               | አያድርጉ                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **N containers/pods**ን፣ እያንዳንዳቸው የራሳቸው `DATA_DIR` / volume እንዲኖራቸው አድርገው ያስኪዱ                                                      | በአንድ SQLite ፋይል ላይ `replicas > 1` አያዘጋጁ                  |
| የከባድ በረራ ላይ ስራዎችን + healthy-headroomን ከheap / በረራ ላይ ባይት በጀት አንጻር መጠን ይወስኑ፤ 1–2 የ#7849 ጥንቃቄ የተሞላበት ነባሪ እንጂ የምርቱ ጥብቅ ከፍተኛ ገደብ አይደለም | ለአንድ ሂደት 8× RAM እና ያልተገደበ የብዛት ገደብ አይስጡ                  |
| አማራጭ፦ `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` ለ**ጋራ የኮታ ቆጣሪዎች**                                                       | Redisን እንደ የጋራ SQLite አይቁጠሩት — እሱ አይደለም                  |
| የአቅራቢዎችን ሚስጥሮች ወደ እያንዳንዱ instance ያባዙ (ወይም የተከፋፈሉ dashboardsን ይቀበሉ)                                                                | በinstances መካከል አንድ dashboard / አንድ call-log እንዲኖር አይጠብቁ |
| ከፊት ማንኛውንም load balancer ያስቀምጡ፤ በAPI key ወይም session የሚጣበቅ መሆኑ በቂ ነው                                                               | የአቅራቢ-ተኮር፣ መጠንን የሚያውቅ middleware አያስፈልግም                 |

ሃርድዌር፦ በእያንዳንዱ instance በአንድ ጊዜ የሚሰሩ ረጅም `/v1/responses` ጥያቄዎች ብዛት የ**ማህደረ ትውስታ በጀት** ጉዳይ ነው (heap + በረራ ላይ ባይት / #10110)። ገለልተኛ `DATA_DIR`s ያላቸው `N` instances አሁንም heapsን ያባዛሉ፦ የhost RAM `N × cgroup`ን መሸፈን አለበት፣ “N=8 ያለው አንድ 16 Gi pod”ን አይደለም። በአንድ SQLite ፋይል ላይ `replicas > 1`ን ፈጽሞ አይጠቀሙ።

የCompose ንድፍ (ሁለት heaps፣ ሁለት volumes — `deploy.replicas: 2` አይደለም)፦

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

በሂደት ውስጥ ያለ ጥግግት (compressionን ከHTTP isolate ማውጣት) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) ነው። በጋራ ዘላቂ ሁኔታ ላይ ያለ አንድ ሎጂካዊ cluster [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ነው።

## በDocker ውስጥ የGemini ክልላዊ ስህተቶች

Google AI Studio / Gemini API፣ FAILED_PRECONDITION ያለውን HTTP 400 እና
`User location is not supported for the API use.` መመለስ ይችላል። በhost ላይ የተሳካ ጥያቄ
container-ው ተመሳሳይ የወጪ መስመርን እንደሚጠቀም አያረጋግጥም። የDNS ቅደም ተከተል፣
የIPv4/IPv6 ግንኙነት፣ የVPN ማስተላለፊያ እና የተዋቀሩ proxies ሊለያዩ ይችላሉ።
[Google የሚደግፋቸውን ክልሎች](https://ai.google.dev/gemini-api/docs/available-regions)
እንዲሁም ትክክለኛውን የግንኙነት መስመር ያረጋግጡ፤ ይህ ስህተት ብቻውን የተሳሳተ API key መኖሩን አያመለክትም።

### ለየግንኙነቱ የተወሰነ proxy ይምረጡ

ለተጎዳው Gemini ግንኙነት የOmniRouteን
[ለየግንኙነቱ የproxy ውቅር](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ይጠቀሙ፤ ከዚያም **ግንኙነትን ሞክር** እና በተመሳሳይ model አነስተኛ ጥያቄን እንደገና ያስኪዱ።
ይህ የማስተላለፊያ ለውጡን በዚያ ግንኙነት ብቻ እንዲወሰን ያደርገዋል። proxy-ው ከcontainer-ው
ሊደረስበት እንደሚችል እና ግንኙነቱ በእርግጥ እንደሚመርጠው ያረጋግጡ።
መስመሩን መቀየር upstream የክልል ብቁነትን አያረጋግጥም።

### የhost እና container አውታረ መረብን ያነጻጽሩ

የተረጋገጡ ውጤቶችን ሲያነጻጽሩ key-ውን፣ model-ውን እና ጥያቄውን ተመሳሳይ ያድርጉ፤
credentials፣ የproxy passwords ወይም ሙሉ authorization headers በissue ውስጥ ፈጽሞ አይለጥፉ።
መጀመሪያ፣ ተመሳሳዩን command በhost ላይ እና በcontainer ውስጥ በመጠቀም
የOS resolver የትኞቹን የaddress families እንደሚያቀርብ ይመርምሩ፦

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute`ን በሚያስኬዱት service ይተኩት (ለምሳሌ፣ `omniroute-web`)። እነዚህ
commands credentials ወይም IP addresses ሳያሳዩ address familiesን ያትማሉ። የተመለሰ `6`
የIPv6 DNS ውጤት መኖሩን ብቻ ያሳያል፤ ጥቅም ላይ የሚውል IPv6 route ወይም API access
መኖሩን **አያረጋግጥም**። `curl` በተጫነበት ቦታ፣ በሁለቱም environments ውስጥ
`curl -4 -I https://generativelanguage.googleapis.com`ን ከ
`curl -6 -I https://generativelanguage.googleapis.com` ጋር ያነጻጽሩ።
ምላሹ unauthenticated error ቢሆንም፣ የHTTP ምላሽ ለዚያ probe ግንኙነት መኖሩን ያረጋግጣል፤
የGemini ብቁነትን የሚፈትሸው authenticated model request ብቻ ነው።

### የhost ደረጃ አማራጭ፦ የሚሰራ IPv6 እና resolver policy

የ[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ሪፖርት አቅራቢ
የcontainer IPv6ን በማንቃት እና የglibc address selectionን በመቀየር በenvironment-አቸው
ውስጥ accessን መልሰዋል። ይህን ለተወሰነ environment ብቻ እንደሚሠራ አማራጭ ይቁጠሩት።
የresolver preferencesን ከማስተካከልዎ በፊት የhost IPv6 በትክክል እንደሚሠራ፣
የcontainer egress/routing እና firewall rules ትክክል መሆናቸውን ያረጋግጡ።
የግል ULA address ብቻውን የpublic IPv6 connectivity መኖሩን አያረጋግጥም።

ቀድሞውኑ ከCompose default network ጋር ለተያያዙ services፣ ይህ fragment
በዚያ network ላይ IPv6ን ያነቃል፤ የቀረውን service፣ ports፣ volumes እና configuration ያቆዩ፦

```yaml
networks:
  default:
    enable_ipv6: true
```

ለnamed network፣ service-ው በእርግጥ በሚቀላቀልበት network ላይ ያንቁት። Docker
የULA subnet ሊመድብ ይችላል፤ networkዎ ሲፈልገው ብቻ ግልጽ የሆነ፣ የማይደራረብ subnet ይምረጡ።
[Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/) እና
[Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)ን ይመልከቱ።

በ**glibc ላይ በተመሠረተ image** ውስጥ፣ `/etc/gai.conf` address selectionን ሊቀይር ይችላል።
አሁን ያለው የrepository Dockerfile Debianን ይጠቀማል፤ ብጁ musl-based images ይህን ዘዴ አይጋሩም።
ሪፖርት የተደረገው ማስተካከያ የULA labelን ከ`label fc00::/7 6` ወደ
`label fc00::/7 1` ይቀይራል። ከimage-ው ሙሉ policy table ይጀምሩ እና ሌሎቹን
entries ያቆዩ፤ `label` ወይም `precedence` entry መጨመር ያንን default table ስለሚተካ፣
የተቀየረውን መስመር ብቻ የያዘ file በቂ አይደለም።
የ[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
እነዚያን semantics ይገልጻል። የተገመገመውን file በ`/etc/gai.conf` ላይ read-only አድርገው bind-mount ያድርጉ
እና ለውጡን ለመተግበር service-ውን እንደገና ይፍጠሩ።

ይህ ለ**በዚያ container ውስጥ ላለ ሁሉም outbound traffic** የOS address selectionን ይቀይራል።
ሁሉም application IPv6ን እንዲመርጥ አያስገድድም፤ የNode DNS order እና connection selection
እንዲሁም ተጽዕኖ አላቸው። በተለይ፣ `--dns-result-order=ipv4first` IPv4ን ይመርጣል
እና ለIPv4-only failure መፍትሔ አይደለም። [Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)ን ይመልከቱ።

ከማንኛውም የhost ደረጃ ለውጥ በኋላ Geminiን እና ሌሎች providersዎን እንደገና ይፈትሹ።
ወደ ቀድሞው ሁኔታ ለመመለስ፣ ብጁ `gai.conf` mountን ያስወግዱ፣ የቀድሞውን network configuration ይመልሱ
እና በmaintenance window ጊዜ የተጎዳውን service/network እንደገና ይፍጠሩ። networkን እንደገና
መፍጠር ከእሱ ጋር የተያያዙ ሌሎች containersን ሊያቋርጥ ይችላል፤ persistent data volume-ውን አይሰርዙ።

## ጠቃሚ ማስታወሻዎች

- **SQLite WAL ሁነታ፦** OmniRoute የቅርብ ጊዜ ለውጦችን ወደ `storage.sqlite` መልሶ checkpoint ማድረግ እንዲችል `docker stop` እስኪጠናቀቅ መፍቀድ አለብዎት። አብረው የቀረቡት Compose ፋይሎች የ40s የማቆሚያ የእፎይታ ጊዜን አስቀድመው አዘጋጅተዋል። image-ውን በቀጥታ የሚያስኬዱ ከሆነ `--stop-timeout 40`ን ይጠቀሙ።
- **`DISABLE_SQLITE_AUTO_BACKUP`፦** መደበኛ/ከመጻፍ በፊት የሚደረጉ backup-ዎች በውጫዊ መንገድ የሚተዳደሩ ከሆነ ወደ `true` ያዘጋጁት። የነባር database ሽግግሮች አሁንም የራሳቸውን ዘላቂ የደህንነት snapshot እና የጅምላ ሽግግር መከላከያ ይፈልጋሉ።
- **የውሂብ ቋሚነት፦** በcontainer ዳግም ማስጀመሮች መካከል database-ዎን፣ ቁልፎችዎን እና ውቅሮችዎን ለማቆየት ሁልጊዜ volumeን ወደ `/app/data` mount ያድርጉ።
- **የPort ውቅር፦** ነባሪውን `20128` port ለመቀየር `PORT` environment variableን override ያድርጉ።

## በተጨማሪ ይመልከቱ

- [የVM ማሰማሪያ መመሪያ](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare ማዋቀር
- [የFly.io ማሰማሪያ መመሪያ](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — ወደ Fly.io ማሰማራት
- [የEnvironment ውቅር](../reference/ENVIRONMENT.md) — የተሟላ `.env` ማጣቀሻ
