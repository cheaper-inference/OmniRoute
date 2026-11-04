# 🐳 Docker Guide — OmniRoute (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> සම්පූර්ණ Docker යෙදවීම් යොමුව. ඉක්මනින් ආරම්භ කිරීම සඳහා, [README හි Docker කොටස](../README.md#-docker) බලන්න.

## පටුන

- [ඉක්මන් ධාවනය](#quick-run)
- [පරිසර ගොනුවක් සමඟ](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ලබාගත හැකි පැතිකඩ](#available-profiles)
- [OmniRoute Docker තුළ ධාවනය වන විට සත්කාරක CLI මෙවලම් වින්යාස කිරීම](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [නිෂ්පාදන Compose](#production-compose)
- [Dockerfile අදියර](#dockerfile-stages)
- [අත්යවශ්ය පරිසර විචල්ය](#critical-environment-variables)
- [Caddy (HTTPS) සමඟ Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ඉක්මන් උමඟ](#cloudflare-quick-tunnel)
- [Image ටැග්](#image-tags)
- [Docker තුළ Dashboard යාවත්කාලීන](#dashboard-updates-in-docker)
- [ලබාගත හැකි බව: පෙරනිමි SQLite එකම replica එකකට සීමා වේ](#availability-default-sqlite-is-single-replica)
- [Docker තුළ Gemini කලාපීය දෝෂ](#gemini-regional-errors-inside-docker)
- [වැදගත් සටහන්](#important-notes)

---

## ඉක්මන් ධාවනය

> **එක් විධානයකින් ස්වයං-සත්කාරක කිරීමක් අවශ්යද?**
> [ස්වයං-සත්කාරක මාර්ගෝපදේශය](../getting-started/SELF_HOST_GUIDE.md) බලන්න —
> `docker compose -f docker-compose.selfhost.yml up -d` (ප්රකාශිත image එකක් +
> Redis, loopback සඳහා පමණක්, පැතිකඩ තේරීමක් නැත). පහත ඉක්මන් ධාවන ක්රමය
> වෙනත් ස්ථානයක දැනටමත් Redis ධාවනය කරන පරිශීලකයන් සඳහා වන
> තනි-container ක්රමයයි.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## පරිසර ගොනුවක් සමඟ

```bash
# පළමුව .env පිටපත් කර සංස්කරණය කරන්න
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
# මූලික පැතිකඩ (CLI මෙවලම් නොමැත)
docker compose --profile base up -d

# CLI පැතිකඩ (Claude Code, Codex, OpenClaw ඇතුළත් කර ඇත)
docker compose --profile cli up -d

# සත්කාරක පැතිකඩ (ප්රධාන වශයෙන් Linux සඳහා; සත්කාරක CLI binary කියවීමට පමණක් mount කරයි)
docker compose --profile host up -d

# වෙබ් පැතිකඩ (වෙබ්-සැසි සැපයුම්කරුවන් සඳහා Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecar ඒකාබද්ධ කරන්න
docker compose --profile cli --profile cliproxyapi up -d
```

## ලබාගත හැකි පැතිකඩ

OmniRoute ප්රධාන යෙදවුම් ආකාර සඳහා Compose පැතිකඩ සමඟ සපයනු ලැබේ. ඔබගේ පරිසරයට ගැළපෙන එක තෝරන්න.

| පැතිකඩ           | සේවාව            | භාවිත කළ යුත්තේ කවදාද                                                                                                                       | විධානය                                       |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (පෙරනිමි) | `omniroute-base` | Headless සේවාදායකය / අවම runtime එක, සැපයුම්කරුගේ CLI ඇතුළත් කර නැත                                                                         | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` සහ ඇතුළත් කර ඇති CLI (Codex, Claude Code, Droid, OpenClaw) කැඳවන agentic workflow                        | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` ආදිය කියවීමට පමණක් mount කිරීමෙන් සත්කාරක CLI වෙත `network_mode`-වැනි ප්රවේශයක් අවශ්ය Linux සත්කාරක | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | upstream CLI proxy කිරීම සඳහා `8317` port එක මත [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar එක ධාවනය කරන්න          | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | browser එකක් අවශ්ය වෙබ්-සැසි සැපයුම්කරුවන්: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` build කරයි, Chromium ඇතුළත්ය)      | `docker compose --profile web up -d`         |

> පැතිකඩ කිහිපයක් ඒකාබද්ධ කළ හැක: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker තුළ ක්රියාත්මක වන විට host CLI මෙවලම් වින්යාස කිරීම

`omniroute setup-codex`, `setup-claude`, `config set <tool>` සහ dashboard හි
**වින්යාසය සුරකින්න** බොත්තම යන සියල්ලම `~/.codex/*.config.toml` වැනි ගොනු ලියයි. එම paths
අර්ථවත් වන්නේ CLI එක සැබවින්ම ක්රියාත්මක වන යන්ත්රයේ පමණි. ඒවා container එක තුළ
ක්රියාත්මක කළහොත්, ලිවීම container එකේම home directory එකට (`/home/node` —
image එක `USER node` ලෙස ක්රියාත්මක වේ) යයි. කිසිදු host CLI එකක් එය කිසිදා කියවන්නේ නැති අතර,
container එක නැවත නිර්මාණය කළ සැණින් එය ඉවත දැමේ.

OmniRoute මෙය හඳුනාගෙන, ඔබට භාවිත කළ නොහැකි සාර්ථකත්වයක් වාර්තා කිරීම වෙනුවට
උපදෙස් සමඟ ලිවීම ප්රතික්ෂේප කරයි: CLI එක `2` සමඟ පිටවන අතර API එක
`containerEphemeralTarget: true` සමඟ `422` ලෙස පිළිතුරු දෙයි.

### නිර්දේශිත ක්රමය: CLI එක host එකේත්, OmniRoute Docker තුළත් ක්රියාත්මක කරන්න

Container එක API එක සපයයි; CLI එක ඔබේ host මෙවලම් වින්යාස කරයි.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI එක container එක වෙත යොමු කරන්න
omniroute setup-codex                      # ඔබේ host එකේ සැබෑ ~/.codex වෙත ලියයි
```

Codex, Claude Code, Cursor හෝ සමාන මෙවලම් ඔබේ laptop එකේ ක්රියාත්මක වන විට —
එනම් සාමාන්ය සැකසුමේදී — මෙය නිවැරදි තේරීමයි.

### විකල්ප ක්රමය: host config directories bind-mount කරන්න (`host` profile)

Container එකම ඔබේ host config වෙත ලිවීමට ඔබට අවශ්ය නම්, එම directories
mount කර `CLI_CONFIG_HOME` mount root එක වෙත යොමු කරන්න. `host` profile එක
දැනටමත් මෙය සිදු කරයි:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Path එක විශ්වාසදායක කරන්නේ bind mount එකයි: OmniRoute
`/proc/self/mountinfo` කියවා mounted paths වෙත (සහ එහි child directories
mount කර ඇති directories වෙතද — ඉහත `/host-home` ආකෘතිය හරියටම එයයි)
ලිවීමට ඉඩ දෙන අතර, mount නොකළ ඒවා තවදුරටත් ප්රතික්ෂේප කරයි.

### හදිසි විකල්පය: container එකේම CLIs වින්යාස කරන්න (අවම වශයෙන් භාවිත කරන්න)

CLIs සැබවින්ම container එක තුළ පවතින විට (`cli` profile), එම ලිවීම
චේතනාන්විතය. ඕනෑම `setup-*` command එකකට `--allow-container-write` ලබා දෙන්න,
නැතහොත් server එක සඳහා `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` සකසන්න.
එම ලිවීම container එකෙන් පසුව නොපවතින බවට අනතුරු ඇඟවීමක් සමඟ ඉදිරියට යයි.

> **ආරක්ෂක අනතුරු ඇඟවීම — `cli` profile + `docker.sock` mount.**
> Container එක තුළ ඇති auto-updater එකට host daemon එකෙන් stack එක නැවත
> නිර්මාණය කළ හැකි වන පරිදි `cli` profile එක `/var/run/docker.sock`
> bind-mount කරයි (`src/lib/system/autoUpdate.ts` එම socket එක තිබේදැයි පරීක්ෂා කර,
> එය නොමැති විට Docker path එක මඟ හරියි). එම socket එක **host-root විශ්වාස
> සීමාවකි**: එයට ළඟා විය හැකි ඕනෑම දෙයකට root ලෙස host Docker daemon එක
> පාලනය කළ හැකිය — එයට host එකේ ඕනෑම container එකක් නිර්මාණය කිරීමට, පරීක්ෂා
> කිරීමට, නැවැත්වීමට සහ ඉවත් කිරීමට හැකිය.
> එහි ප්රතිවිපාක:
>
> 1. **`cli` profile එකේ port එක කිසිවිටෙක network එකට නිරාවරණය නොකරන්න.**
>    එය `127.0.0.1` මත publish කරන්න (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN එකෙන් ප්රවේශ විය හැකි `cli` profile එකක්, dashboard මට්ටමේ ඕනෑම RCE එකක්
>    සම්පූර්ණ host අත්පත් කර ගැනීමක් බවට පත් කරයි.
> 2. **`cli` profile එක තුළට අමතර host directories කිසිවක් bind නොකරන්න.**
>    Docker socket එක සමඟ වෙනත් ඕනෑම mount එකක් තිබීමෙන් container එකට ඔබේ
>    filesystem සහ host config වෙත සම්පූර්ණ read/write ප්රවේශය ලැබේ. මෙවලමකට
>    project එකක් දැකීමට අවශ්ය නම්, CLI binary එක භාවිතයෙන් එය locally ක්රියාත්මක කරන්න —
>    එය `cli` container එක තුළට mount නොකරන්න.
>
> ඔබට container එක තුළ auto-update අවශ්ය නොවේ නම්, `cli` profile එක අක්රියව තබන්න
> (`COMPOSE_PROFILES=core,redis` හෝ ඊට කෙටි අගයක්). අනෙකුත් profiles
> Docker socket එක mount නොකරයි.
>
> MITM සම්බන්ධ තර්ජන ආකෘතිය සඳහා `docs/security/MITM-TPROXY-DECRYPT.md`
> (git තුළ ඇත; `/docs` වෙත compile කර නැත) බලන්න, එමෙන්ම
> `codex`/`claude-code`/`droid`/`openclaw` binary provenance දාමය සඳහා
> `docs/security/SUPPLY_CHAIN.md` බලන්න.

## Redis Sidecar

OmniRoute විසින් බෙදාහැරුණු අනුපාත සීමාකාරකය සහ හවුල් හැඹිලිය සඳහා Redis භාවිත කරයි. `redis` සේවාව `docker-compose.yml` තුළ **සැමවිටම අර්ථ දක්වා ඇත** (එයට පැතිකඩ දොරටුවක් නොමැත) සහ වෙනත් ඕනෑම පැතිකඩක් සමඟ ආරම්භ වේ.

| විස්තරය                  | අගය                                      |
| ------------------------ | ---------------------------------------- |
| ප්රතිරූපය                | `redis:7-alpine`                         |
| බහාලුම් නාමය             | `omniroute-redis`                        |
| අභ්යන්තර පෝට් එක         | `6379`                                   |
| ධාරක පෝට් එක (අතික්රමණය) | `REDIS_PORT` (පෙරනිමිය `6379`)           |
| ධාරක බැඳීම (අතික්රමණය)   | `REDIS_BIND_HOST` (පෙරනිමිය `127.0.0.1`) |
| වෙළුම                    | `omniroute-redis-data` → `/data`         |
| සෞඛ්ය පරීක්ෂාව           | `redis-cli ping` (තත්පර 10ක පරතරයකින්)   |

අදාළ පරිසර විචල්ය:

- `REDIS_URL` — යෙදුමට ඇතුළත් කරන සම්බන්ධතා තන්තුව (පෙරනිමියෙන් `redis://redis:6379`).
- `REDIS_PORT` — Redis බහාලුම සඳහා ධාරක-පාර්ශ්වීය පෝට් සිතියම්ගත කිරීම.
- `REDIS_BIND_HOST` — පෝට් එක ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත. පෙරනිමිය `127.0.0.1`.

> **පෙරනිමියෙන් loopback භාවිත කරන්නේ ඇයි:** sidecar එක `requirepass` නොමැතිව ක්රියාත්මක වන අතර, යෙදුම්
> බහාලුම් compose ජාලය (`redis:6379`) හරහා එයට ළඟා වේ — ප්රකාශිත පෝට් එක
> ඇත්තේ ධාරක-පාර්ශ්වීය මෙවලම් (`redis-cli`, දේශීය `npm run dev`) සඳහා පමණි. එය
> `0.0.0.0` මත ප්රකාශයට පත් කිරීමෙන් සත්යාපනය නොකළ Redis සේවාවක් ඔබගේ LAN ජාලයේ සෑම ධාරකයකටම නිරාවරණය වේ. ඔබ
> `REDIS_BIND_HOST=0.0.0.0` සකසන්නේ නම්, සේවාවේ `command:` වෙත `--requirepass` ද එක් කරන්න.

**Redis අක්රිය කිරීම** නිර්දේශ නොකරයි (අනුපාත සීමාකාරකය මතකය-තුළ fallback එකකට පහත වැටෙනු ඇත). එය අත්යවශ්ය නම්, `docker-compose.yml` තුළ ඇති `redis:` සේවා කොටස ඉවත් කිරීම/අදහස් සටහනක් බවට පත් කිරීම හෝ එය ශුන්යයට පරිමාණය කිරීම සිදු කරන්න:

```bash
docker compose up -d --scale redis=0
```

## නිෂ්පාදන Compose

සංවර්ධන පරිසරය සමඟ සමාන්තරව ක්රියාත්මක වන හුදකලා නිෂ්පාදන snapshot එකක් සඳහා, `docker-compose.prod.yml` භාවිත කරන්න.

| විස්තරය                     | අගය                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------- |
| ගොනුව                       | `docker-compose.prod.yml`                                                             |
| පෙරනිමි උපකරණ පුවරු පෝට් එක | `PROD_DASHBOARD_PORT=20130` (අභ්යන්තර `${DASHBOARD_PORT:-20128}` වෙත සිතියම්ගත කර ඇත) |
| පෙරනිමි API පෝට් එක         | `PROD_API_PORT=20131`                                                                 |
| ප්රතිරූපය                   | `omniroute:prod` (`runner-cli` ඉලක්කයෙන් ගොඩනඟා ඇත)                                   |
| Redis බහාලුම                | `omniroute-redis-prod` (`redis:8.6.2`, වෙන් කළ `redis-prod-data` වෙළුම)               |
| දත්ත වෙළුම                  | `omniroute-prod-data` (නාමික, නැවත ගොඩනැගීම් අතරතුර සුරැකෙන)                          |
| සෞඛ්ය පරීක්ෂා               | `node healthcheck.mjs` + `redis-cli ping`, Redis සෞඛ්යය මත පාලනය වන `depends_on` සමඟ  |

භාවිත කරන ආකාරය:

```bash
# නිෂ්පාදන stack එක ගොඩනඟා ආරම්භ කරන්න
docker compose -f docker-compose.prod.yml up -d --build

# ලොග් සජීවීව පෙන්වන්න
docker compose -f docker-compose.prod.yml logs -f

# වසා දමන්න (වෙළුම් තබා ගන්න)
docker compose -f docker-compose.prod.yml down
```

නිෂ්පාදන stack එක සංවර්ධන compose එක සමඟ සමාන්තරව ක්රියාත්මක වේ (වෙනස් බහාලුම් නාම, පෝට් සහ වෙළුම්), එබැවින් නිෂ්පාදන පරිසරය ක්රියාත්මකව තිබියදී ඔබට දේශීයව වැඩිදියුණු කිරීම් දිගටම කරගෙන යා හැක.

## Dockerfile අදියර

ගබඩාව බහු-අදියර Dockerfile එකක් (`Dockerfile`) සමඟ නිකුත් වේ. අදියර හතරක් ලබා දී ඇත; ඔබේ භාවිත අවස්ථාව සඳහා නිවැරදි `target` එක තෝරන්න.

| අදියර         | මූලික image එක        | අරමුණ                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | පරායත්තතා ස්ථාපනය කරයි (`npm ci --legacy-peer-deps`) සහ `npm run build` ධාවනය කරයි (පෙරනිමියෙන් Turbopack — පහත ගොඩනැගීම්-කාලීන සම්පත් බලන්න)                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone ප්රතිදානය සහිත නිෂ්පාදන ධාවන පරිසරය. **සපයන්නන්ගේ CLI කිසිවක් ඇතුළත් නොවේ.**                                                                                                                                                                                             |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` සහ ගෝලීය CLI එක් කරයි: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **නියෝජිත-පාදක කාර්ය ප්රවාහ සඳහා මෙය තෝරන්න.**                                                                                                               |
| `runner-web`  | `runner-base`         | වෙබ්-සැසි සපයන්නන් සඳහා Playwright + Chromium බ්රවුසරයක් (`--with-deps`) එක් කරයි: `gemini-web`, `claude-web`, `claude-turnstile`. **එම සපයන්නන් භාවිත කරන විට මෙය තෝරන්න** — මෙය නොමැතිව සාමාන්ය image එක ඉල්ලීම් සිදු කරන අවස්ථාවේ අසාර්ථක වේ (නිකුතු නාලිකා යටතේ ඇති `-web` සටහන බලන්න). |

නිශ්චිත target එකක් අතින් ගොඩනඟන්න:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ගොඩනැගීම්-කාලීන සම්පත්

`builder` අදියරේ සම්පත් පිරිවැය build args තුනකින් පාලනය වේ. ඒවා ගොඩනැගීම් කාලයට පමණක් අදාළ වේ —
`OMNIROUTE_MEMORY_MB` (පහත) යනු වෙනම ධාවන-කාලීන පාලකයකි.

| Build arg                   | පෙරනිමිය | බලපෑම                                                                                                          |
| --------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` webpack සමඟ ගොඩනඟයි: උපරිම මතක භාවිතය අඩු නමුත් මන්දගාමීය. `1` Turbopack භාවිතයට මාරු වේ.                  |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | ආරම්භ කරන ලද `next build` සඳහා V8 heap උපරිම සීමාව (`--max-old-space-size`).                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` වෙත අගය ලබා දෙයි; පිටු-දත්ත රැස් කිරීම සඳහා Next විසින් `workers = N - 1` ව්යුත්පන්න කරයි. |

විශාල builder එකකදී වැඩි කළ යුතුත්, සීමිත සම්පත් සහිත ගොඩනැගීමක් `✓ Compiled successfully` **පසු** බිඳ වැටෙන විට සැක කළ යුතුත් විචල්යය වන්නේ `OMNIROUTE_BUILD_WORKERS` ය.
සෑම පිටු-දත්ත worker එකක්ම වෙනම process එකක් වන අතර, මව් `next build` එකද එසේම වේ;
සජීවී VPS ප්රතිනිෂ්පාදනයකදී (ගැටලුව #7518), `NODE_OPTIONS` heap flag එකෙන් ස්වාධීනව සෑම process එකකම උපරිම RSS අගය
~4.5 GB ලෙස මනින ලදී (Turbopack සම්පාදනය සිදුවන්නේ V8 heap එකෙන් පිටත
native/Rust මතකය තුළය). `2` පෙරනිමි අගය (→ worker 1ක්, සමස්ත process 2ක්)
ප්රකාශන pipeline එක භාවිත කරන 16 GB / 4 vCPU GitHub-hosted runner සඳහා ගැළපෙන පරිදි සකසා ඇත.
`8` දී (→ worker 7ක්) එම runner එකේ මතකය අවසන් වූ අතර
buildkit විසින් `ResourceExhausted: ... cannot allocate memory` සමඟ පියවර අසාර්ථක කරන ලදී;
එක්-process RSS අගය අනුමාන කිරීම වෙනුවට සෘජුවම මැනීමෙන් පසුව `3` (→ worker 2ක්) ද තවමත් ප්රමාණවත් නොවීය.
`tests/unit/docker-build-memory-budget.test.ts`
මනින ලද අගය මත ගණනය කිරීම් සිදු කරන අතර, එම පාලක දෙකෙන් එකක් හෝ runner එකේ ධාරිතාව ඉක්මවා ගියහොත් අසාර්ථක වේ.

Turbopack සම්පාදනය සිදුවන්නේ V8 heap එකෙන් **පිටත** පවතින native Rust මතකය තුළ බැවින්,
`OMNIROUTE_BUILD_MEMORY_MB` මඟින් එය සීමා නොවේ. මතක සීමාවක් ඇති host එකකදී
ගොඩනැගීම කිසිදු දෝෂ පෙළක් නොමැතිව OOM killer විසින් SIGKILL කරනු ලැබේ — එය
`Creating an optimized production build` අතරමැද සරලව නතර වන අතර, මතකය අවසන් වීමක් ලෙස නොව
හිරවීමක් ලෙස පෙනේ. `npm run dev` / `npm run build` තුළ
Turbopack කේතයේ පෙරනිමිය වුවද, `Dockerfile` එක webpack
(`OMNIROUTE_USE_TURBOPACK=0`) පෙරනිමිය කරන්නේ එබැවිනි: build args නොමැති සරල `docker build .` එකක්
(Railway සහ අනෙකුත් එක්-ක්ලික් host ධාවනය කරන්නේ මෙයයි) මතකය සීමා කළ builder එකකදී
නිහඬව බිඳ වැටිය යුතු නොවේ. ප්රකාශිත images දැනටමත් `docker-publish.yml` තුළ
`OMNIROUTE_USE_TURBOPACK=0` පැහැදිලිව ලබා දෙයි. ප්රමාණවත් RAM සහිත builder එකකදී,
වේගවත් ගොඩනැගීමක් සඳහා Turbopack භාවිතයට මාරු වන්න:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` සක්රීය කර ඇති බැවින්, `next build` මව් process එකක් **සහ** worker
process එකක් ධාවනය කරන අතර, ඒ සෑම එකක්ම `OMNIROUTE_BUILD_MEMORY_MB` වෙන වෙනම පිළිපදියි. Container
සීමාව එම අගය මෙන් එක් ගුණයකට නොව, ආසන්න වශයෙන් දෙගුණයකට වඩා ඉහළින් සකසන්න.

මෙම tree එක මත මනින ලදී (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container සීමාව | ප්රතිඵලය                        |
| --------- | --------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | දෙකේදීම නිහඬව OOM-kill විය      |
| webpack   | 8 GiB           | build worker එක SIGKILL විය     |
| webpack   | 12 GiB          | සාර්ථක විය, උපරිමය 11.1 GiB විය |

### ධාවන-කාලීන පෙරනිමි

`runner-base` මඟින් export කරන පෙරනිමි: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker තුළ මතක හැසිරීම:

- රූපය `OMNIROUTE_MEMORY_MB=1024` සකසන අතර එයින් `NODE_OPTIONS=--max-old-space-size=1024` ව්යුත්පන්න කරයි.
- සැබෑ සේවාදායක ක්රියාවලිය ස්වාධීන දියත්කාරකය මඟින් ආරම්භ කරනු ලබන අතර, එය `OMNIROUTE_MEMORY_MB` කියවා `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` අමුණයි.
- Node විසින් නැවත නැවත සඳහන් වන අවසාන `--max-old-space-size` අගය භාවිත කරන බැවින්, `OMNIROUTE_MEMORY_MB` සැකසීමෙන් ඵලදායී Docker heap සීමාව පාලනය වේ.
- රූපය සෑම විටම එය සකසන බැවින්, දියත්කාරකයේම RAM අනුව ක්රමාංකනය කළ පසුබැසීම Docker යටතේ කිසි විටෙකත් යෙදෙන්නේ නැත. වැඩභාරයට ගැළපෙන ලෙස එය පැහැදිලිවම වැඩි කරන්න (පහත වගුව බලන්න). කේතකරණ නියෝජිත `/v1/responses` සඳහා `2048` ද තවමත් ඉතා කුඩාය.

### කේතකරණ නියෝජිතයන් සඳහා ධාවනකාල RAM

1 GiB Docker පෙරනිමිය නිෂ්පාදන ප්රමාණයක් නොව, උපකරණ පුවරුව/සැහැල්ලු කතාබස් සඳහා අවම සීමාවකි. දිගු `POST /v1/responses` අන්තර්ගත (පණිවිඩ සිය ගණනක් සහ මෙවලම් දස ගණනක්) සම්පීඩනය අතරතුර මතකයේ පවතින ප්රස්තාර කිහිපයක් රඳවා ගනී. එකිනෙක අතිච්ඡාදනය වන ~3 MiB / ~750k-token ඉල්ලීම් දෙකක් **12 GiB** old-space එකකදී V8 නවතා දමා ඇත (`FATAL ERROR: Reached heap limit`) සහ 16 GiB cgroup OOM සීමාවට ද ළඟා වී ඇත. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) බලන්න.

**cgroup `--memory` heap එකට වඩා වැඩි ලෙස සකසන්න** — ස්වදේශීය buffers, SQLite සහ සම්පීඩන අතරමැදි දත්ත V8 පිටත පවතී.

| වැඩභාරය                                    | `OMNIROUTE_MEMORY_MB`        | Container / cgroup         | සටහන්                                                                                                            |
| ------------------------------------------ | ---------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| උපකරණ පුවරුව, එක් සැහැල්ලු කතාබහක්         | `1024` (රූපයේ පෙරනිමිය)      | ≥2 GiB                     |                                                                                                                  |
| එක් කේතකරණ නියෝජිතයෙක් (Claude/Codex/Grok) | `8192`                       | ≥10 GiB                    | සාමාන්ය තනි සැසි `/v1/responses`                                                                                 |
| සමගාමී දිගු `/v1/responses` දෙකක්          | `10240`–`12288`              | ≥12–16 GiB                 | ~12 GiB heap එකකදී V8 නවතා දැමීම මිනුම් කර ඇත                                                                    |
| සමගාමී දිගු සන්දර්භ තුනක් හෝ වැඩි ගණනක්    | එක් ක්රියාවලියක සිදු නොකරන්න | අනුක්රමික කරන්න / වැඩි RAM | පෙරනිමි බර වැඩභාර පිළිගැනීම එකවර ක්රියාත්මක වන 1කට සීමා වේ; RAM වැඩි නොකර එය ඉහළ දැමීමෙන් නවතා දැමීම නැවත ඇති වේ |

`OMNIROUTE_MEMORY_MB` **සකසා නොමැති** විට bare metal මත `omniroute serve` RAM වලින් ~35%කට ක්රමාංකනය කරයි (`[512, 4096]` පරාසයට සීමා කර). Docker සෑම විටම `1024` සකසන බැවින්, නිල රූපය තුළ එම ක්රමාංකනය කිසි විටෙකත් ක්රියාත්මක නොවේ.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## තීරණාත්මක පරිසර විචල්ය

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) හි ලේඛනගත කර ඇති පෙරනිමි අගයන්ට අමතරව, Docker යටතේ ධාවනය කිරීමේදී පහත විචල්ය වඩාත් වැදගත් වේ:

| විචල්යය                       | අරමුණ                                                                                                                                                                                                                                                                                     | පෙරනිමිය                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket බ්රිජ් එක සඳහා හවුල් රහස. **නිෂ්පාදන පරිසරයේ අනිවාර්යයි** — ප්රබල අහඹු තන්තුවකට සකසන්න.                                                                                                                                                                                         | සකසා නැත (සැපයිය යුතුය) |
| `REDIS_URL`                   | අනුපාත සීමාකාරකය / හැඹිලි පසුබිම සඳහා සම්බන්ධතා තන්තුව                                                                                                                                                                                                                                    | `redis://redis:6379`    |
| `REDIS_PORT`                  | ඇතුළත් කර ඇති Redis කන්ටේනරය සඳහා ධාරක-පාර්ශ්වීය පෝට් එක                                                                                                                                                                                                                                  | `6379`                  |
| `REDIS_BIND_HOST`             | ඇතුළත් කර ඇති Redis පෝට් එක ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත (ඔබ AUTH එක් නොකරන්නේ නම් ලූප්බැක්)                                                                                                                                                                                         | `127.0.0.1`             |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ස්වයං-යාවත්කාලීන කාර්ය ප්රවාහ සඳහා `/workspace/omniroute` හි `cli` පැතිකඩට මවුන්ට් කරන ධාරක මාර්ගය                                                                                                                                                                                        | `.` (වත්මන් නාමාවලිය)   |
| `OMNIROUTE_MEMORY_MB`         | Docker ස්වාධීන සේවාදායකය සඳහා ධාවනකාල Node හීප් උපරිම සීමාව; ඉහත ඉමේජයේ පෙරනිමිය අභිබවා යයි. කේතකරණ නියෝජිතයන්: `8192`+ ([ධාවනකාල RAM](#runtime-ram-for-coding-agents) බලන්න).                                                                                                            | `1024`                  |
| `DASHBOARD_PORT` / `API_PORT` | උපකරණ පුවරුව (20128) සහ API (20129) සඳහා නිරාවරණය කළ පෝට් අභිබවා සකසයි                                                                                                                                                                                                                    | `20128` / `20129`       |
| `APP_BIND_HOST`               | docker-compose මඟින් උපකරණ පුවරුව/API/සජීවී-WS පෝට් ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත. `REQUIRE_API_KEY=false` (පෙරනිමිය) සමඟ, `0.0.0.0` නිර්නාමික `/v1` ප්රොක්සිය LAN වෙත නිරාවරණය කරයි — මෙය පුළුල් කරන්නෙ `REQUIRE_API_KEY=true` සමඟ හෝ ඉදිරියෙන් ප්රතිවර්ත ප්රොක්සියක් තිබේ නම් පමණි. | `127.0.0.1`             |
| `CLIPROXY_BIND_HOST`          | docker-compose මඟින් `cliproxyapi` සයිඩ්කාර් එක ප්රකාශයට පත් කරන ධාරක අතුරුමුහුණත — එහි දත්ත වෙළුමෙහි සැපයුම්කරුගේ අක්තපත්ර අඩංගු වේ.                                                                                                                                                     | `127.0.0.1`             |
| `OMNIROUTE_PLUGINS_DIR`       | ධාවනකාල ප්ලගිනය ස්කෑනරය කියවන සහ ස්ථාපනය කරන නාමාවලිය. ප්ලගින බයින්ඩ්-මවුන්ට් කර ඇත්නම් එය සකසන්න: පෙරනිමිය `HOME` අනුගමනය කරයි, නමුත් ඉමේජයක් එය අපනයනය නොකළ හැක.                                                                                                                        | `~/.omniroute/plugins`  |
| `OMNIROUTE_BASE_PATH`         | යෙදුම ප්රතිවර්ත ප්රොක්සියක් පිටුපස ප්රකාශයට පත් කරන විට භාවිත කරන URL උපමාර්ගය (උදා. `/omniroute`)                                                                                                                                                                                        | _(හිස් = මූලය)_         |
| `NEXT_PUBLIC_BASE_URL`        | උපමාර්ගය ඇතුළත් පොදු බ්රවුසර මූලාරම්භය (උදා. `https://host/omniroute`)                                                                                                                                                                                                                    | සකසා නැත                |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` සඳහා ධාරක-පාර්ශ්වීය උපකරණ පුවරු පෝට් එක                                                                                                                                                                                                                         | `20130`                 |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` සයිඩ්කාර් එක සඳහා ධාරක-පාර්ශ්වීය පෝට් එක                                                                                                                                                                                                                                    | `8317`                  |

## උපමාර්ගයක Reverse Proxy (Traefik / nginx)

Next.js `basePath` එක standalone bundle එක තුළට compile කෙරේ. OmniRoute විසින් යෙදුමේ root හි ඇති sentinel ගොනුවක build කරන ලද අගය සටහන් කරයි (`npm run build` අතරතුර ලියනු ලබන අතර,
`scripts/docker/ensure-docker-base-path.mjs` මඟින් කියවනු ලැබේ) සහ container එක ආරම්භ වන විට එය
`OMNIROUTE_BASE_PATH` සමඟ සසඳයි. ඒවා වෙනස් වන විට සහ image එක domain root සඳහා
build කර ඇති විට, entrypoint එක `node dev/run-standalone.mjs` ධාවනය වීමට පෙර
standalone manifests, ඇතුළත් කර ඇති `basePath`/`assetPrefix` literals (Next 16 විසින් SSR asset URLs
`assetPrefix` වෙතින් පමණක් render කරයි — patcher එක උපමාර්ගය එයටද පිටපත් කරයි), build කර ඇති
`/_next/static` asset URLs (client-reference manifests, media imports, පෙර-render කළ
error pages) සහ client `process.env` shim එක නැවත ලියයි.

### Compose build (නිර්දේශිතයි)

`.env` තුළ variables දෙකම සකසා, image එක සහ runtime එක එකඟ වන පරිදි නැවත build කරන්න:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` මඟින් `OMNIROUTE_BASE_PATH`, Docker build-arg එකක් ලෙසත්
runtime environment variable එකක් ලෙසත් යොමු කරයි.

### පෙර-build කළ root image එක + runtime උපමාර්ගය

ප්රකාශිත `diegosouzapw/omniroute:*` images domain root සඳහා build කර ඇත. ඔබට තවමත්
runtime අවස්ථාවේදී `OMNIROUTE_BASE_PATH` සැකසිය හැක; container එක startup අවස්ථාවේදී bundle එක එක් වරක් patch කරයි.
එයට ගැළපෙන public origin එකද සමඟ සකසන්න:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

**සම්පූර්ණ** බාහිර path එක forward කිරීමට reverse proxy එක වින්යාස කරන්න (prefix එක ඉවත් නොකරන්න).
Next.js වෙත `/omniroute/...` ලැබී, assets
`/omniroute/_next/...` වෙතින් සපයන පරිදි, Traefik විසින් `StripPrefix` නොමැතිව
`PathPrefix(`/omniroute`)` container එක වෙත route කළ යුතුය.

Docker healthcheck එක, සක්රිය `OMNIROUTE_BASE_PATH` prefix කර ඇති සැහැල්ලු `/healthz` lifecycle endpoint එක
probe කරයි. මානව/dashboard diagnostics සඳහා `/api/monitoring/health` තවමත් ලබාගත හැක;
container HEALTHCHECK එක නැවත එයට යොමු කිරීමට (උදාහරණයක් ලෙස ගැඹුරු health enforcement සඳහා),
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` සකසන්න.
එම path එක **ගැඹුරු** පරීක්ෂාවකි (DB + monitoring summary) — ඔබ එය නැවත සක්රිය කිරීමට තෝරාගන්නේ නම්,
Docker හි අඩු වාර ගණනකින් ක්රියාත්මක වන `HEALTHCHECK` සඳහා සුදුසු නමුත් Kubernetes `livenessProbe`
intervals සඳහා **සුදුසු නොවේ**.

orchestrators (Kubernetes, Nomad, ආදිය) සඳහා:

| Probe           | වඩාත් සුදුසුයි                                                       | වළකින්න                                                 |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, හෝ ප්රධාන port එකේ TCP (`PORT`, පෙරනිමිය `20128`) | liveness ලෙස `/api/monitoring/health`                   |
| Readiness       | HTTP `GET /healthz`                                                  | event-loop එක කාර්යබහුල වීම dead ලෙස සලකන දැඩි timeouts |
| Deep / blackbox | `/api/monitoring/health`                                             | —                                                       |

`/healthz` මඟින් process lifecycle එක (`ok` / `starting` / `stopping`) වාර්තා කරයි. `/livez` යනු
process එක සජීවීද යන්න පමණක් පරීක්ෂා කිරීමකි (handler එක ධාවනය කළ හැකි සෑම අවස්ථාවකම 200; එය
readiness සඳහා රැඳී නොසිටී). මේ දෙකම request handling ක්රියාත්මක වන Node event loop එකේම
තවමත් ධාවනය වන බැවින්, CPU-bound catalog හෝ compression කාර්යයන්ට ඒවා ප්රමාද කළ හැක —
කාර්යබහුල ≠ dead. HTTP probes කල් ඉකුත් වුවහොත් TCP liveness භාවිතයට ප්රමුඛත්වය දෙන්න.
සම්පූර්ණ probe මාර්ගෝපදේශය:
[Monitoring මාර්ගෝපදේශය — Kubernetes probe නිර්දේශ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy සමඟ Docker Compose (HTTPS Auto-TLS)

Caddy හි ස්වයංක්රීය SSL සැපයීම භාවිතයෙන් OmniRoute ආරක්ෂිතව නිරාවරණය කළ හැක. ඔබගේ වසමේ DNS A වාර්තාව ඔබගේ සේවාදායකයේ IP ලිපිනය වෙත යොමු වන බව සහතික කරගන්න.

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
      # OAuth ආපසු කැඳවීම්, උපකරණ පුවරු සබැඳි සහ ජනනය කළ පොදු URL සඳහා බ්රවුසරය මුහුණ දෙන මූලාරම්භය.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # නියමිත කාර්යයන් / ස්වයං-ලබාගැනීම් සඳහා අභ්යන්තර සේවාදායකයෙන්-සේවාදායකයට URL එක.
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

Caddy විසින් upstream බහාලුම සඳහා සම්මත යොමුකිරීමේ ශීර්ෂක සකසයි. OAuth ආපසු කැඳවීම් සහ ජනනය කළ පොදු
සබැඳි සඳහා සම්මත පොදු මූලාරම්භය ලෙස OmniRoute විසින් `NEXT_PUBLIC_BASE_URL` භාවිත කරයි;
සත්යාපිත උපකරණ පුවරු ලිවීම් එකම මූලාරම්භයේ ඉල්ලීම් සහ සැසියට බැඳුණු CSRF
ආරක්ෂාව භාවිත කරයි. පැහැදිලි වින්යාසය වෙනුවට විශ්වාසදායක යොමු කළ ශීර්ෂකවලින් පොදු මූලාරම්භය
ව්යුත්පන්න කිරීමට OmniRoute හිතාමතාම යොදාගන්නා උසස් යෙදවීම් සඳහා පමණක් `OMNIROUTE_TRUST_PROXY`
සක්රීය කරන්න.

## Cloudflare Quick Tunnel

Docker යෙදවීම් සඳහා වන උපකරණ පුවරු සහායෙහි `Dashboard → Endpoints` තුළ එක් ක්ලික් කිරීමකින් සක්රීය කළ හැකි **Cloudflare Quick Tunnel** එකක් ඇතුළත් වේ. පළමු වරට සක්රීය කිරීමේදී අවශ්ය වූ විට පමණක් `cloudflared` බාගත කර, ඔබගේ වත්මන් `/v1` අන්ත ලක්ෂ්යය වෙත තාවකාලික උමඟක් ආරම්භ කර, ජනනය කළ `https://*.trycloudflare.com/v1` URL එක ඔබගේ සාමාන්ය පොදු URL එකට සෘජුවම පහළින් පෙන්වයි.

සක්රීය උමං තත්ත්වය වෙනස් නොකර, අන්ත ලක්ෂ්ය උමං පැනල (Cloudflare, Tailscale, ngrok) `Settings → Appearance` වෙතින් පෙන්වීමට හෝ සැඟවීමට හැක.

### උමං සටහන්

- Quick Tunnel URL තාවකාලික වන අතර සෑම නැවත ආරම්භ කිරීමකටම පසුව වෙනස් වේ.
- OmniRoute හෝ බහාලුම නැවත ආරම්භ කිරීමෙන් පසුව Quick Tunnels ස්වයංක්රීයව ප්රතිසාධනය නොවේ. අවශ්ය විට උපකරණ පුවරුවෙන් ඒවා නැවත සක්රීය කරන්න.
- කළමනාකරණය කළ ස්ථාපනය දැනට `x64` / `arm64` මත Linux, macOS සහ Windows සඳහා සහය දක්වයි.
- සීමා සහිත බහාලුම් පරිසරවල ශබ්දකාරී QUIC UDP බෆර් අනතුරු ඇඟවීම් වළක්වා ගැනීම සඳහා, කළමනාකරණය කළ Quick Tunnels පෙරනිමියෙන් HTTP/2 ප්රවාහනය භාවිත කරයි. ඔබට වෙනත් ප්රවාහනයක් අවශ්ය නම් `CLOUDFLARED_PROTOCOL=quic` හෝ `auto` සකසන්න.
- Docker අනුරූ පද්ධති CA මූලයන් සමඟ පැමිණ ඒවා කළමනාකරණය කළ `cloudflared` වෙත ලබා දෙයි; එමඟින් උමඟ බහාලුම තුළ ආරම්භ වන විට TLS විශ්වාස අසාර්ථකවීම් වළක්වයි.
- OmniRoute විසින් එකක් බාගත කිරීම වෙනුවට පවතින ද්විමය ගොනුවක් භාවිත කිරීමට ඔබට අවශ්ය නම් `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` සකසන්න.

## අනුරූ ටැග

| අනුරුව                   | ටැගය     | ප්රමාණය | විස්තරය                                           |
| ------------------------ | -------- | ------- | ------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | ඉහළම **ප්රකාශිත** ස්ථායී SemVer (git `main` නොවේ) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | GitOps සඳහා මෙම ටැග පන්තිය ස්ථිර කරන්න            |

බහු-වේදිකා manifest එක: ස්වදේශීය `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker විසින් ගැළපෙන ගෘහනිර්මාණය ස්වයංක්රීයව තෝරයි; ARM ධාරක මත AMD64 අනුකරණය බලයෙන් යෙදීමට අවශ්ය නම් `--platform linux/amd64` ලබා දෙන්න.

### නිකුතු නාලිකා

OmniRoute ස්ථායී නිකුතු, සක්රීය නිකුතු-ශාඛා පරීක්ෂණ සහ සංවර්ධන ගොඩනැගීම් සඳහා වෙන වෙනම Docker නාලිකා ප්රකාශයට පත් කරයි.

| නාලිකාව                         | මූලාශ්රය                          | වෙනස් කළ හැකි බව                 | නිර්දේශිත භාවිතය                                                                                                              |
| ------------------------------- | --------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | අත්සන් කළ/අනුවාදගත නිකුතුව        | වෙනස් කළ නොහැක                   | නිශ්චිත නිකුතුවකට ස්ථිර කළ නිෂ්පාදන යෙදවීම්                                                                                   |
| `:latest` / `:latest-web`       | ඉහළම **ප්රකාශිත** ස්ථායී SemVer   | වෙනස් කළ හැකි ස්ථායී යොමුව       | SemVer ප්රකාශන කාර්යයකින් **පසුව** ස්ථායී නිකුතු අනුගමනය කරයි — `main` හෝ නිකුත් නොකළ `release/v*` commits අනුගමනය **නොකරයි** |
| `:next` / `:next-web`           | වත්මන් පෙරනිමි `release/v*` ශාඛාව | වෙනස් කළ හැකි පූර්ව-නිකුතු යොමුව | සක්රීය නිකුතු ශාඛාවට එක් කර ඇති නමුත් තවමත් ස්ථායී නිකුතුවක නොමැති නිවැරදි කිරීම් පරීක්ෂා කිරීම                               |
| `:main` / `:main-web`           | `main` ශාඛාව                      | වෙනස් කළ හැකි සංවර්ධන යොමුව      | සංවර්ධන සහ ඒකාබද්ධ කිරීමේ පරීක්ෂණ සඳහා පමණි                                                                                   |

#### වෙබ්-සැසි සපයන්නන්: `-web` අනුරූ

ඉහත සෑම නාලිකාවක්ම `runner-web` අදියරෙන් ගොඩනැගූ `-web` ටැගයක් (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) ලෙසද පවතී — එය එම අනුරුවටම Playwright සහ Chromium බ්රවුසරයක් එක් කළ අනුරුවකි. සාමාන්ය අනුරුව Chromium **නොමැතිව** ලබාදේ; `gemini-web`, `claude-web` සහ `claude-turnstile` සඳහා එය අවශ්ය වේ.

අසාර්ථක වීම ආරම්භයේදී නොව පසුව සිදු වේ: එම සපයන්නන් තම ආකෘති ලැයිස්තුගත කර උපකරණ පුවරුවේ සම්බන්ධ වී ඇති ලෙස පෙන්වන අතර, පළමු ඉල්ලීම පමණක් පහත දෝෂය සමඟ අසාර්ථක වේ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ඔබ එම සපයන්නන් භාවිත කරන්නේ නම්, ඔබ දැනට භාවිත කරන නාලිකාවේ `-web` ටැගය pull කරන්න — වෙනත් කිසිවක් වෙනස් නොවේ. npm/CLI ස්ථාපනයකදී (Docker අනුරුවක් නොමැතිව), ඊට සමානව අස්ථානගත වී ඇත්තේ බ්රවුසර ද්විමය ගොනුවයි: ධාරකය මත `npx playwright install chromium` ධාවනය කරන්න.

#### පූර්ව-නිකුතු නාලිකාව භාවිත කිරීම

`next` නාලිකාව වත්මන් පෙරනිමි `release/v*` ශාඛාවට සිදු කරන සෑම push කිරීමකදීම නැවත ගොඩනඟන අතර AMD64 සහ ARM64 යන දෙක සඳහාම ප්රකාශයට පත් කෙරේ. පැරණි නඩත්තු ශාඛාවලට එය උඩින් ලිවිය නොහැක. ඊළඟ ස්ථාවර ටැගය නිර්මාණය කිරීමට පෙර සක්රිය නිකුතු ශාඛාවට ඒකාබද්ධ කර ඇති නිවැරදි කිරීම් සඳහා මෙම නාලිකාව pull කළ හැකි image එකක් සපයයි.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose සඳහා, තෝරාගත් profile එක භාවිත කරන image ටැගය අතික්රමණය කර, ඉන්පසු service එක pull කර නැවත නිර්මාණය කරන්න:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ආරක්ෂාව සහ පෙර තත්ත්වයට ප්රතිවර්තනය

`next` යනු වෙනස් වෙමින් පවතින පූර්ව-නිකුතු නාලිකාවකි. සක්රිය නිකුතු ශාඛාවට සිදු කරන ඕනෑම push කිරීමකදී එය වෙනස් විය හැකි අතර, එය **නිෂ්පාදන භාවිතය සඳහා සහාය නොදක්වයි**. නිශ්චිත build එකක් ඇගයීමේදී image digest එක pin කරන්න:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

පරීක්ෂා කිරීමට පෙර, OmniRoute data volume එක හෝ bind-mounted data directory එක උපස්ථ කරන්න. පෙර තත්ත්වයට ප්රතිවර්තනය කිරීමට, කලින් භාවිත කළ ස්ථාවර version එක හෝ digest එක ප්රතිස්ථාපනය කර container එක නැවත නිර්මාණය කරන්න:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

නිකුතු-ශාඛා build එකකට කිසිවිටෙක `latest` ගෙන යා නොහැක; ස්ථාවර යොමුව ප්රවර්ධනය කළ හැක්කේ සුදුසුකම් ලත් ස්ථාවර semantic version එකකට පමණි. `next` images විසින් නිකුතු image පරීක්ෂාව සහ අවහිර කරන CRITICAL-අවදානම් දොරටුව තවදුරටත් රඳවා ගනී.

**`latest` යනු git සඳහා යාවත්කාලීනභාවය පිළිබඳ සහතිකයක් නොවේ.** `main` හෝ සක්රිය `release/v*` ශාඛාවට ඒකාබද්ධ කළ නිවැරදි කිරීම්, ස්ථාවර SemVer image එකක් ප්රකාශයට පත් කර publish job එක විසින් `:latest` ප්රවර්ධනය කරන තුරු **`:latest` තුළ නොමැත** (එම SemVer එකට සමාන digest එකකි). GitHub දැනටමත් නිවැරදි කිරීම පෙන්වන නමුත් `latest` වෙනස් නොවී ඇති බව පෙනේ නම්, නිකුතු ශාඛාව පරීක්ෂා කිරීමට `:next` pull කරන්න, නැතහොත් SemVer ටැගය ලැබෙන තෙක් රැඳී සිටින්න.

| ඔබට අවශ්ය දේ                                                                      | භාවිත කරන්න                             |
| --------------------------------------------------------------------------------- | --------------------------------------- |
| වෙනස් නොවිය යුතු GitOps / නිෂ්පාදන පරිසරය                                         | `:X.Y.Z` (හෝ image digest එක) pin කරන්න |
| ප්රකාශිත ස්ථාවර නිකුතු අනුගමනය කර එක් එක් නිකුතුවේදී නැවත නිර්මාණය කිරීම පිළිගන්න | `:latest`                               |
| නිකුත් නොකළ `release/v*` commits පරීක්ෂා කරන්න                                    | `:next` (නිෂ්පාදනය සඳහා නොවේ)           |
| `main` පරීක්ෂා කරන්න                                                              | `:main` (නිෂ්පාදනය සඳහා නොවේ)           |

## Docker තුළ Dashboard යාවත්කාලීන කිරීම්

ප්රකාශිත image එකකින් සෑදූ container එකකට තමන්වම ප්රතිස්ථාපනය කළ නොහැක. OmniRoute තමන් container එකක් තුළ ධාවනය වන බව හඳුනාගත් විට (`.git` checkout එකක් නොමැති සහ npm ස්ථාපනයක් නොවන විට), මුල් dashboard එකේ යාවත්කාලීන banner එක npm/git උපදෙස් වෙනුවට ධාවනය කළ යුතු host command එක copy button එකක් සමඟ පෙන්වයි:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

සේවා නාමය `AUTO_UPDATE_SERVICE` වෙතින් ලැබේ (පෙරනිමිය `omniroute` වන අතර, එය `docker-compose.selfhost.yml` හි සේවාවයි). `pull` මඟින් ගෙන යන්නේ floating tag එකක් (`latest`, `next`) පමණි; pin කළ `:X.Y.Z` tag එකක් සමඟ නම්, පළමුව tag එක සංස්කරණය කරන්න.

### Host trigger file එකක් භාවිතයෙන් එක්-click යාවත්කාලීන කිරීම්

Container එකට host එකේ root ප්රවේශය ලබා දෙන `/var/run/docker.sock` mount නොකර **Update Now** ක්රියාත්මකව තබා ගැනීමට (ඉහත `cli` profile අනතුරු ඇඟවීම බලන්න), OmniRoute සේවාව මත `DOCKER_UPDATE_TRIGGER_FILE` සකසා host එක මත watcher එකක් ධාවනය කරන්න:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Path එක `DATA_DIR` තුළ තිබිය යුතුය (සාපේක්ෂ අගයන් එයට සාපේක්ෂව resolve වේ); වෙනත් ඕනෑම දෙයක් ප්රතික්ෂේප කෙරේ. එවිට **Update Now** මඟින් `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` එම file එකට ලියා, `202` පිළිතුරු දී, නව version එක සජීවී වන තෙක් dashboard එක `/api/system/version` poll කර නැවත load කරයි. මෙම mode එකේදී OmniRoute කිසිවිටෙක shell හෝ Docker command එකක් ධාවනය නොකරයි. සෑම යාවත්කාලීන ක්රියාවක් මෙන්ම, ඉල්ලීම පිළිගන්නේ loopback/LAN client වෙතින් පමණි.

Bind-mount කළ data directory එකක් host එකට නිරීක්ෂණය කිරීමට ස්ථාවර path එකක් ලබා දෙයි. නියැදි `systemd` unit (`/srv/omniroute` ඔබගේ compose file එක සහ `data/` අඩංගු directory එකට ගැළපෙන ලෙස සකසන්න):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute dashboard යාවත්කාලීන ඉල්ලීම් නිරීක්ෂණය කරන්න

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute container එක pull කර නැවත සාදන්න

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

අසාර්ථක ධාවනයක් loop වීම වැළැක්වීමට සේවාව pull කිරීමට පෙර ඉල්ලීම ඉවත් කරයි. `DOCKER_UPDATE_TRIGGER_FILE` නොමැතිව dashboard එක manual command ප්රවාහය දිගටම භාවිත කරයි.

## ලබා ගත හැකි බව: පෙරනිමි SQLite යනු තනි අනුරුවකි

කොටස් Docker / Kubernetes OmniRoute වේ** එක් නෝඩ් ක්‍රියාවලියක් + එක් SQLite ලේඛකයෙක්** . ඉහළ ලබා ගත හැකි වේ** සහාය නොදක්වයි** එම ස්ථල විද්‍යාව මත.

| සීමා කිරීම                                               | ප්රතිවිපාකය                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| තනි ලේඛකයෙක්                                             | කරන්න** නැත** එකම SQLite ගොනුවට එරෙහිව අනුපිටපත් කිහිපයක් ධාවනය කරන්න. එය DB දූෂිත කරයි.                                                                                                                                                                                                                                 |
| නැවත සාදන්න / නැවත ආරම්භ කරන්න / HEALTHCHECK ඝාතනය කරන්න | **සම්පූර්ණ ඇනහිටීම** පියාසර තුළ SSE, උපකරණ පුවරු සැසි, සහ මතක තත්ත්වය. සම්බන්ධිත සෑම සේවාදායකයා පහත වැටේ. හිස් අන්ත ලක්ෂ්‍ය කවුළුව තුළ නව ඉල්ලීම් ප්‍රතිලෝම ප්‍රොක්සියක් ලබා ගනී**`502 Bad Gateway: Unknown error`** , OmniRoute JSON නොවේ — සේවාලාභීන්ට මෙය සැපයුම්කරුගේ අසාර්ථකත්වයකින් වෙන්කර හඳුනාගත නොහැක (#11015). |
| `/healthz` හා සමාන සිදුවීම් ලූපය                         | කාර්යබහුල නාමාවලියක් හෝ සම්පීඩන ටික් එකක් පරීක්ෂණ ප්‍රමාද කළ හැකිය; කෙටි කාල සීමාවක් පසුව නැවත ආරම්භ වේ** පමණි** අනුරුව.                                                                                                                                                                                                 |

**පරීක්ෂණ matrix** ( [කුබර්නෙට්ස් විමර්ශන නිර්දේශ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ද බලන්න):

| විමර්ශනය කරන්න    | ඉලක්කය                                                   | භාවිතා නොකරන්න                                            |
| ----------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| සජීවී බව          | TCP මත `PORT` (පෙරනිමි `20128`), හෝ soft HTTP `/healthz` | `/api/monitoring/health`                                  |
| සූදානම            | HTTP `GET /healthz`                                      | කාර්යබහුල වූ Event-loop මිය ගිය ලෙස සලකන දැඩි කාල සීමාවන් |
| ගැඹුරු / මිනිසුන් | `/api/monitoring/health`                                 | ස්වයංක්‍රීය kubelet සජීවී බව                              |

**වැඩිදියුණු කිරීම්:** සෑම සැසියක්ම පහත වැටෙනු ඇතැයි අපේක්ෂා කරන්න. ඔබට හැකි නම් ගනුදෙනුකරුවන් ඉවත් කරන්න; පෙරනිමි SQLite හි පෙරළීමේ යාවත්කාලීනයක් නොමැත. `restart: unless-stopped` plus Docker `HEALTHCHECK` රචනා කිරීම කන්ටේනරය සෞඛ්‍යයට අහිතකර වන එකම ක්‍රියාවලිය ප්‍රතිස්ථාපනය කරයි - එකම පිපිරුම් අරය.

සූදානම් කළ මැනිෆෙස්ටස් සහ හෙල්ම් ප්‍රස්ථාරයක් `deploy/kubernetes/` සහ `deploy/helm/omniroute/` හි සජීවී වේ - [Kubernetes යෙදවීමේ මාර්ගෝපදේශය](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) බලන්න.

A සඳහා Kubernetes snippet** තනි අනුරුව** (ප්‍රතිනිර්මාණය කිරීම අවශ්‍යයි; එක් SQLite ගොනුවකට එරෙහිව `replicas` ඉහළ නොයන්න):

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

`preStop` නින්ද SIGTERM පෙර සේවා අන්ත ලක්ෂ්‍ය අතහැරීමට kube හට ඉඩ දෙයි** අලුත්** ගමනාගමනය මිය යන ක්‍රියාවලියට බාධා කරයි. ගුවන් යානය තුළ `/v1/responses` SSE හෙවිවේට් ඇතුළත් කිරීමේ ලීසිං (#11015) හරහා `SHUTDOWN_TIMEOUT_MS` (පෙරනිමි 30s) දක්වා ජලය බැස යයි. තවමත් ක්‍රියාවලියට ළඟා වන නව ඉල්ලීම් `503` + `Retry-After: 5` ලබා ගනී. ප්‍රතිස්ථාපනය සූදානම් වන තෙක් හිස් අන්ත ලක්ෂ්‍ය පරතරය ප්‍රතිනිර්මාණය කිරීම දැඩි ඇනහිටීමක් ලෙස පවතී - එය SQLite ස්ථලකය මිස විමර්ශන වැරදි වින්‍යාසයක් නොවේ.

බාහිර Postgres / බහු ලේඛක HA වේ** නැත** ලේඛනගත කොටස් මාර්ගයක්. ඔබට HA අවශ්‍ය නම්, තනි අනුරුවක් තබා ගන්න හෝ ව්‍යාපෘතිය විසින් වෙන වෙනම පරීක්ෂා කර ලේඛනගත කර ඇති ස්ථලකයක් ක්‍රියාත්මක කරන්න. Postgres/MySQL කාර්යය [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) හි ජීවත් වේ. එය නැව්ගත වන තුරු, ගුණ කිරීමට ඇති එකම සහය දක්වන මාර්ගය** විශාල** `/v1/responses` ධාරිතාව N ස්වාධීන ක්‍රියාවලි (ඊළඟ කොටස), එක් පරිමාවක් මත `replicas > 1` නොවේ.

## පරිමාණය: N ස්වාධීන ක්රියාවලි

### Codex ටෝකන් භ්‍රමණ හිමිකම

එක් Codex ගිණුමක පිටපත් ස්වාධීනව එහි තනි භාවිත නැවුම් ටෝකනය පරිභෝජනය නොකළ යුතුය. සමමුහුර්ත අක්තපත්‍ර පමණක් පරිභෝජනය කරන අවස්ථා වලදී, `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (අන්වර්ථ `cx`) සකසන්න. එය තනි භ්‍රමණ හිමිකරු මත නොසකසා තබන්න. සෑම ක්‍රියාවලියකටම තවමත් තමන්ගේම `DATA_DIR` අවශ්‍ය වේ; මෙම විකල්පය SQLite බෙදා නොගනී හෝ ටෝකන් සමමුහුර්තකරණය හෝ බෙදා හරින ලද අගුලක් සපයන්නේ නැත.

උදාසීන අවස්ථාව නැවුම් කිරීමක් අවශ්‍ය වූ විට සම්බන්ධතාවය නැවත කියවන අතර වෙනස්, කල් ඉකුත් නොවූ ප්‍රවේශ ටෝකනයක් පමණක් භාවිතා කරයි. එසේ නොමැති නම්, සම්බන්ධතාවය කල් ඉකුත්වීම හෝ අක්‍රිය කිරීම හෝ නැවුම්-බ්‍රේකර් අසාර්ථක වීමක් ගණනය කිරීමකින් තොරව නැවුම් කිරීම අක්‍රිය වේ. සැබෑ upstream සත්‍යාපනය අසාර්ථක වීම තවමත් සාමාන්‍ය අසාර්ථක ගිණුම්කරණය, ඝාතීය සිසිල්වීම සහ සාමාන්‍ය සේවාදායක දෝෂය භාවිතා කරයි; ගිණුම අක්රිය කිරීම ස්ථිරව පවතී. ප්‍රවේශ ටෝකන කල් ඉකුත් වීමට පෙර හිමිකරුගේ කරකවන ලද ටෝකන සමමුහුර්ත කරන්න (පෙරනිමි ප්‍රතික්‍රියාශීලී නැවුම් ඊයම් මිනිත්තු පහකි), නැතහොත් Codex auth ගොනුව නැවත ආයාත කරන්න. නිෂ්ක්‍රීය ආයාත මගින් සපයන ලද ටෝකන ටෝකන් අන්ත ලක්ෂ්‍යයේ වලංගු නොකර ගබඩා කරයි. අතින් dashboard/API refresh returns `409 refresh_disabled`; නව OAuth පිවිසුම් වෙනස් නොවේ. [පරිසරය යොමුව](../reference/ENVIRONMENT.md#passive-codex-token-refresh) බලන්න.

එක් නෝඩ් ක්‍රියාවලියකි** එක් V8 ගොඩ** . අතිච්ඡාදනය වන ~ 3 MiB / ~ 750k-ටෝකන කේතීකරණ නියෝජිත `POST /v1/responses` (RTK + Caveman) දෙකක් ~ 12 Gi (`FATAL ERROR: Reached heap limit`) දී එම ගොඩ ඉවත් කරන අතර 16 Gi cgroup OOM කළ හැක. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) බලන්න. එම මිනුම a** මතක අයවැය** අනතුරු ඇඟවීම, සමගාමී දිගු `/v1/responses` දෙකක දෘඪ-උපරිම නිෂ්පාදනයක් නොවේ. හෙවිවේට් චැට් ප්‍රවේශය ස්වයංක්‍රීයව ව්‍යුත්පන්න වූ ඉන්ජෙස්ට් බයිට් බජට් (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ප්‍රමාණයෙන් එම V8/cgroup සිවිලිමේ — ප්‍රමාණයෙන් එය අභිබවා යමින් (හෝ ලෙගසි `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ඉල්ලීම්-ගණන සීමාව සැකසීම) දැනටමත් ප්‍රමාණයේ ක්‍රියාවලියක් මත ගබ්සාව නැවත හඳුන්වා දෙයි. කුඩා කතාබස්, `/healthz`, `/v1/models`, සහ MCP වේ** නැත** එම තොප්පිය තුළ.

### එක් ක්‍රියාවලියක්: දිගු `/v1/responses` දෙකකට වඩා

ඒ** සෞඛ්ය සම්පන්න** ක්‍රියාවලිය ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ට පහළ ගොඩ , පෙරනිමි `0.75`)** විය හැක** ක්‍රියාවලිය-පුළුල් ගුවන් ගමන්-බයිට් අයවැය (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) තවමත් ඉඩ ඇති විට සමගාමී දිගු `POST /v1/responses` දෙකකට වඩා ධාවනය කරන්න. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` හෝ ඊට වැඩි ශරීර (පෙරනිමි 256 KiB) ව්‍යුහය අධික ඉල්ලීම්වලට සමාන හෙවිවේට් බදු ගෙන එම [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ගැලවීම (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) භාවිතා කරයි. සමගාමී දිගු SSE සේවාලාභීන් දස (ක්‍රියාකරුවන්ට බොහෝ විට 40-50 අවශ්‍ය වේ) a** මතක අයවැය** ප්රශ්නය — ප්රමාණය ගොඩ + primary/headroom තව් + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — දෘඪ "උපරිම 2" නිෂ්පාදන සීමාවක් නොවේ. නැවත උත්සාහ කළ හැකි `503` සමඟ පීඩන ගොඩක් තවමත් වැගිරෙන නිසා #7849 නැවත පැමිණෙන්නේ නැත.

වෙත** ගොඩවල් ගුණ කරන්න** (ස්වාධීන V8 පැරණි-අවකාශ)** අද** :

| කරන්න                                                                                                                                                    | නෑ                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| දුවන්න** N containers/pods** , එක් එක් එහි සමග** තමන්ගේ** `DATA_DIR` / පරිමාව                                                                            | එක් SQLite ගොනුවකට එරෙහිව `replicas > 1` සකසන්න                         |
| ප්‍රමාණයෙන් ගුවන් යානය තුළ බර + සෞඛ්‍ය සම්පන්න හිස් කාමරය ගොඩ / ගුවන් ගමන්-බයිට් අයවැයෙන්; 1-2 යනු කොන්සර්වේටිව් #7849 පෙරනිමිය, දෘඪ නිෂ්පාදන උපරිම නොවේ | එක් ක්‍රියාවලියකට 8 × RAM සහ සීමා නොකළ ගණන් කිරීමේ සීමාවක් දෙන්න        |
| විකල්ප: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` සඳහා** හවුල් කෝටා කවුන්ටර**                                                                 | Redis බෙදාගත් SQLite — ලෙස සලකන්න, එය එසේ නොවේ                          |
| එක් එක් අවස්ථාවට අනුපිටපත් සපයන්නාගේ රහස් (හෝ කොටස් කළ උපකරණ පුවරු පිළිගන්න)                                                                             | අවස්ථා හරහා එක් උපකරණ පුවරුවක් / එක් ඇමතුමක්-ලොග් එකක් බලාපොරොත්තු වන්න |
| ඕනෑම load balancer එකක් සමඟ ඉදිරිපස; API යතුර හෝ සැසිය මගින් ඇලවීම ප්රමාණවත්ය                                                                            | වෙළෙන්දා-විශේෂිත ප්‍රමාණය-දැනුවත් මැද මෘදුකාංගයක් අවශ්‍ය වේ             |

සැසිවාරයෙන් ගිණුමට සම්බන්ධය Redis හරහා ද බෙදා ගත හැක : එක් එක් ක්‍රියාවලිය මත `OMNIROUTE_SESSION_AFFINITY_STORE=redis` සහ `REDIS_URL` සකසන්න, එකම `REDIS_KEY_PREFIX` සහ ධනාත්මක `sessionAffinityTtlMs` සැකසුමකින්. Pins විසින් එක් එක් ක්‍රියාවලියේ යෝග්‍ය දේශීය සම්බන්ධතාවයට හැෂ් භාවිත-ගිණුම් අනන්‍යතා නිරාකරණය කරයි, එබැවින් ගැළපෙන අනන්‍යතා පාර-දත්ත සහිත OAuth ගිණුම් වලට ගැළපෙන සම්බන්ධතාව IDs අවශ්‍ය නොවේ. දන්නා ගිණුම් හැඳුනුම්පත් ප්‍රතිවිරෝධතා ප්‍රාදේශීය IDs ට වඩා ප්‍රමුඛත්වය ගනී pin විභේදනය සහ ආරක්ෂා කරන ලද නෙරපා හැරීම; අනන්‍යතාවයක් නොමැති වාර්තා (හෝ අනන්‍යතාවයක් නොමැති නෙරපා හැරීම් අමතන්නන්) උරුම ID ආරක්ෂකය රඳවා ගනී. ස්ථාවර භාවිත අනන්‍යතාවයක් නොමැති ගිණුම් සඳහා තවමත් ගැලපීම අවශ්‍ය වේ IDs. Redis දෝෂ හෝ 100 ms ඉක්මවන ඇමතුම් දේශීය SQLite වෙත ආපසු වැටේ. සෑම Redis affinity store එකක්ම කැපී පෙනෙන මෙහෙයුම් 8 ට සීමා කරයි, පිරී ඇති විට Redis වහා මඟ හරියි, සහ ඇමතුම්කරුගේ නියමිත දිනට නොව යටින් පවතින කාර්යය සමථයකට පත් වූ විට පමණක් තව් නිකුත් කරයි. Redis ඇනහිටීමකදී හවුල් සත්‍යයක් නොමැත: සෑම අවස්ථාවක්ම එහිම ප්‍රාදේශීය බැඳීම වෙත ආපසු පැමිණේ, සැසි වාරයකට වරක් නැවත සම්බන්ධ කළ හැකි අතර, අවස්ථා අපසරනය විය හැක. ඇලෙන සුළු බව යථා තත්ත්වයට පත් වූ විට Redis හරහා නැවත අභිසාරී වේ. පසුබැසීමෙන් පසු ගොඩබෑමට ඉඩ ඇති එවූ EVAL නොව, කල් ඉකුත්වීම බලා සිටීම සීමා වේ. රවුටින් ලිවීම්, නැවුම් විකෘති-කාල කියවීමක් නොව, මාර්ගගත තීරණය මගින් නිරීක්ෂණය කරන ලද නියම අගය සංසන්දනය කරයි; නිරීක්ෂිත මග හැරීමක් හෝ SQLite පසුබැසීම නිරීක්‍ෂණයක් නොපවතින Redis යතුරක් ලෙස සංසන්දනය කරයි. යල් පැන ගිය පින් එක CAS එකකින් ප්‍රතිස්ථාපනය වේ, එබැවින් ප්‍රමාද විධානයකට නව, වෙනස් පින් එකක් ප්‍රතිස්ථාපනය කිරීමට හෝ මැකීමට නොහැක. Redis අගය පරමාණුකව කියවන අතර ඉතිරි සේවාදායකය TTL; ධනාත්මක PTTL (හෝ කල් ඉකුත් නොවේ) සජීවී බව තීරණය කරයි, ලේඛකයාගේ JSON වේලා මුද්‍රාව හෝ පාඨකයාගේ ඔරලෝසුව නොවේ. දේශීය ස්නැප්ෂොට් සිතියම්ගත TTL දේශීය කාල සීමාවක් දක්වා ඉතිරිව ඇත; පවතින JSON යතුරු කියවිය හැකි අතර ඒවායේ අමු බයිට් CAS සඳහා රඳවා තබා ගනී. පිළිතුරු දෙන අතරතුර සත්‍යයේ එකම මූලාශ්‍රය Redis වේ. තහවුරු කරන ලද බෙදාගත් උඩු යටිකුරු කිරීම්, ස්පර්ශ කිරීම් සහ මකා දැමීම් දේශීය ප්‍රවේශය ඉවත් කරයි, කිසි විටෙකත් එය ස්ථාපනය හෝ නැවුම් නොකරන්න. Redis මාර්ගයේ SQLite සතුව Redis දෝෂ, කල් ඉකුත්වීම් හෝ ඇතුළත් කිරීමේ සන්තෘප්තිය, පෙර පරිදිම TTL-සීමාවෙන් මෙම අවස්ථාවෙහිම පසුබැසීමේ තීරණ පමණක් පවතී. පසුකාලීන ඇනහිටීමකදී නැතිවූ දේශීය pin එකක් සඳහා එක් නැවුම් තේරීමක් (එක් ක්ෂණික-හැඹිලි මිස්), වැරදි හෝ ඉවත් කළ ගිණුමක් නොවේ. ප්‍රතික්ෂේප කරන ලද උඩුකුරු බෙදාගත් ජයග්‍රාහකයා සහ එහි ඉතිරි TTL පරමාණුකව ආපසු ලබා දෙයි: සාමාන්‍ය තේරීම සිතියම්ගත කළ දේශීය කාලසීමාව නැවත පරීක්ෂා කර තවමත් සජීවී සුදුසුකම් ලත් ජයග්‍රාහකයෙකු භාවිතා කරයි, භාවිතය ස්පර්ශ කිරීම සහ වෙනත් හවුල් ලිවීමකින් තොරව එම ගිණුම සඳහා ලොග් වීම. එය නොමැති නම්, තේරීම දේශීය අපේක්ෂකයා තබා, බෙදාගත් පින් එක නොවෙනස්ව තබා එක් නිදොස් පණිවිඩයක් නිකුත් කරයි. ප්‍රතික්ෂේප කළ CAS SQLite ලියන්නේ නැත; Redis දෝෂ, කල් ඉකුත්වීම් හෝ ඇතුළත් කිරීමේ සංතෘප්තිය වෙනුවට පවතින දේශීය මෙහෙයුම අදාළ වේ. යවන ලද විකෘතියේ පිළිතුරක් කල් ඉකුත්වීමෙන් පසුව (පිළිගත්, ප්‍රතික්ෂේප වූ හෝ දෝෂයක්) පැමිණේ නම්, සමමුහුර්ත නියම අනුක්‍රමික අගය සංසන්දනය කිරීම සහ මකා දැමීම ඉවත් කරනු ලබන්නේ බයිට්-සමාන කාල සීමාව පසුබැසීමේ පේළිය පමණි. එම සැසඳීම සහ මකා දැමීම අතර බලා සිටීමක් නැත; නව අක්‍රිය ලිවීමක් සංරක්ෂණය කර ඇත. ආරක්‍ෂිත ඉවත් කිරීම Redis පහළට තිබියදී පවා අසාර්ථක ගිණුමේ දේශීය පින් එක ඉවත් කරයි, සහ හවුල් ඉවත් කිරීම තහවුරු කිරීමෙන් පසුව එය නැවත පිරිසිදු කරයි. බෙදාගත් ජයග්‍රහණ කිසිවිටක SQLite නොලියන නිසා කලින් බෙදාගත් පිළිතුරු පොරොත්තුවෙන් ඉවත් කළ ස්ථානීය පින් එකක් ප්‍රතිසාධනය කළ නොහැක. පසුකාලීන ඇනහිටීම් පසුබෑමකට ගිණුමක් නැවත සකස් කළ හැක; පසුව පිළිගත් හවුල් ලිවීමක් පවතින්නේ Redis හි පමණි. Redis මඟහැරීම් දේශීය පසුබැසීමේ තත්ත්වය විමසන්නේ නැත. රියදුරු ක්‍රියා විරහිත වීමත් සමඟ, අලුතින් තෝරාගත් අල්ෙපෙනති, ක්ෂේත්‍ර හතරක SQLite JSON හැඩය රඳවා ගනී; Redis මාර්ගගත කිරීම පමණක් හැෂ් ගිණුම් අනන්‍යතාවය එක් කරයි. කලින් ලබාගත් කටු ඒවායේ කල් ඉකුත් වීමේ සීමාවේදී නැවත පරීක්ෂා කරනු ලැබේ. Redis කල්බදු නොවන තේරීම ගබඩාව නැවත කියවයි, නමුත් සමමුහුර්ත කල්බදු සැලසුම් කිරීම තවමත් පෙර ලබා ගැනීම සහ සැලසුම් කිරීම අතර ඉවත් කරන ලද පින් එකක් භාවිතා කළ හැකිය (පිළිගත් හොඳම උත්සාහ කවුළුවකි). කල් පවත්නා හිමිකම් පෑමකින් පසු කල්බදු බැඳීමකට ගිණුම් මාරු කළ නොහැක: ප්‍රතික්ෂේප වූ උඩු යටිකුරු මත එය ඉල්ලුම් කළ අපේක්ෂකයා එම ඉල්ලීම සඳහා පමණක් තබා ගන්නා අතර හවුල් ජයග්‍රාහකයාට අත නොතබයි, එබැවින් අවස්ථා හරහා එකඟතාව එම මාර්ගයට බැඳී ඇත. ඉතිරි වගුව තවමත් අදාළ වේ: මෙය සංයුක්ත සැසි ඇලෙන සුළු බව, ස්වදේශික Codex හැරවුම් කටු, ගිණුම් semaphores, lockouts, වියදම් සීමාවන්, වින්‍යාස කිරීම හෝ ඇමතුම් ලඝු-සටහන් බෙදා නොගනී.

දෘඪාංග: එක් අවස්ථාවක සමගාමී දිගු `/v1/responses` යනු a** මතක අයවැය** ප්රශ්නය (heap + inflight-byte / #10110). `N` ස්වාධීන `DATA_DIR` s තවමත් ගොඩවල් ගුණ කරයි: සත්කාරක RAM ආවරණය කළ යුත්තේ `N × cgroup`, “N = 8 සමඟ එක් 16 Gi පොඩ් එකක්” නොවේ. එක් SQLite ගොනුවක් මත කිසිවිටෙක `replicas > 1` නොකරන්න.

සටහන රචනා කරන්න (ගොඩවල් දෙකක්, වෙළුම් දෙකක් — නොව `deploy.replicas: 2`):

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

ක්‍රියාවලියේ ඝනත්වය ( HTTP හුදකලාවේ සම්පීඩනය) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) වේ. බෙදාගත් කල් පවතින තත්වයේ එක් තාර්කික පොකුරක් [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) වේ.

## Docker තුළ Gemini කලාපීය දෝෂ

Google AI Studio / Gemini API මඟින් FAILED_PRECONDITION සමඟ HTTP 400 සහ
`User location is not supported for the API use.` යන පණිවිඩය ආපසු ලබා දිය හැක. ධාරකය මත ඉල්ලීමක් සාර්ථක වීමෙන්
කන්ටේනරය එම පිටතට යන මාර්ගයම භාවිත කරන බව තහවුරු නොවේ. DNS අනුපිළිවෙළ,
IPv4/IPv6 සම්බන්ධතාව, VPN මාර්ගගත කිරීම සහ වින්යාස කළ ප්රොක්සි වෙනස් විය හැක. සැබෑ සම්බන්ධතා මාර්ගයට අමතරව
[Google සහාය දක්වන කලාප](https://ai.google.dev/gemini-api/docs/available-regions)
ද පරීක්ෂා කරන්න; මෙම දෝෂය පමණක් වැරදි API යතුරක් හඳුනා නොගනී.

### සම්බන්ධතාවට විශේෂිත ප්රොක්සියක් වඩාත් සුදුසුය

බලපෑමට ලක් වූ Gemini සම්බන්ධතාව සඳහා OmniRoute හි
[සම්බන්ධතාවකට විශේෂිත ප්රොක්සි වින්යාසය](../ops/PROXY_GUIDE.md#4-level-proxy-system)
භාවිත කර, ඉන්පසු එම ආකෘතියම සමඟ **සම්බන්ධතාව පරීක්ෂා කරන්න** සහ කුඩා ඉල්ලීමක් නැවත සිදු කරන්න.
මෙය මාර්ගගත කිරීමේ වෙනස එම සම්බන්ධතාවට පමණක් සීමා කරයි. කන්ටේනරයෙන් ප්රොක්සියට ළඟා විය හැකි බවත්,
සම්බන්ධතාව සැබවින්ම එය තෝරා ගන්නා බවත් තහවුරු කරන්න. මාර්ගය වෙනස් කිරීමෙන් උඩුගං සේවාවේ
කලාපීය සුදුසුකම සහතික නොවේ.

### ධාරකයේ සහ කන්ටේනරයේ ජාලකරණය සසඳන්න

සත්යාපිත ප්රතිඵල සසඳන විට යතුර, ආකෘතිය සහ ඉල්ලීම එකම ලෙස තබා ගන්න; අක්තපත්ර,
ප්රොක්සි මුරපද හෝ සම්පූර්ණ බලය පැවරීමේ ශීර්ෂක කිසිවිටෙක ගැටලුවකට අලවන්න එපා.
පළමුව ධාරකයේ සහ කන්ටේනරය තුළ එකම විධානය භාවිත කරමින්, OS නාම විභේදකය ලබා දෙන
ලිපින පවුල් පරීක්ෂා කරන්න:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` වෙනුවට ඔබ ධාවනය කරන සේවාව යොදන්න (උදාහරණයක් ලෙස, `omniroute-web`). මෙම
විධාන අක්තපත්ර හෝ IP ලිපින නොමැතිව ලිපින පවුල් මුද්රණය කරයි. ආපසු ලැබෙන `6`
මඟින් පෙන්වන්නේ IPv6 DNS ප්රතිඵලයක් පමණි: එය භාවිත කළ හැකි IPv6 මාර්ගයක් හෝ API ප්රවේශයක්
තහවුරු **නොකරයි**. `curl` ස්ථාපනය කර ඇති තැන්වල, පරිසර දෙකෙහිම
`curl -4 -I https://generativelanguage.googleapis.com` සහ
`curl -6 -I https://generativelanguage.googleapis.com` සසඳන්න.
එය සත්යාපනය නොකළ දෝෂයක් වුවද, HTTP ප්රතිචාරයක් මඟින් එම පරීක්ෂණය සඳහා සම්බන්ධතාව තහවුරු වේ;
Gemini සුදුසුකම පරීක්ෂා කරන්නේ සත්යාපිත ආකෘති ඉල්ලීම පමණි.

### ධාරක මට්ටමේ විකල්පය: ක්රියාකාරී IPv6 සහ විභේදක ප්රතිපත්තිය

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) වාර්තා කළ පුද්ගලයා
තම පරිසරයේ කන්ටේනර් IPv6 සක්රීය කිරීමෙන් සහ glibc ලිපින තේරීම වෙනස් කිරීමෙන් ප්රවේශය යථා තත්ත්වයට පත් කළේය.
මෙය පරිසරයට විශේෂිත විකල්පයක් ලෙස සලකන්න. විභේදක අභිරුචි සකස් කිරීමට පෙර ක්රියාකාරී ධාරක
IPv6, කන්ටේනර් පිටතට යන සම්බන්ධතාව/මාර්ගගත කිරීම සහ ගිනි පවුරු නීති තහවුරු කරන්න.
පෞද්ගලික ULA ලිපිනයක් පමණක් තිබීමෙන් පොදු IPv6 සම්බන්ධතාව තහවුරු නොවේ.

Compose හි පෙරනිමි ජාලයට දැනටමත් අමුණා ඇති සේවා සඳහා, මෙම කොටස එම ජාලයේ
IPv6 සක්රීය කරයි; ඔබේ සේවාවේ ඉතිරි කොටස්, පෝට්, වෙළුම් සහ වින්යාසය එලෙසම තබා ගන්න:

```yaml
networks:
  default:
    enable_ipv6: true
```

නම් කළ ජාලයක් සඳහා, සේවාව සැබවින්ම සම්බන්ධ වන ජාලය මත එය සක්රීය කරන්න. Docker හට
ULA උපජාලයක් වෙන් කළ හැක; ඔබේ ජාලයට එය අවශ්ය වූ විට පමණක් පැහැදිලිව දක්වා ඇති,
එකිනෙක නොවැසෙන උපජාලයක් තෝරන්න. [Docker IPv6 ජාලකරණය](https://docs.docker.com/engine/daemon/ipv6/)
සහ [Compose ජාල විකල්ප](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) බලන්න.

**glibc මත පදනම් වූ image එකක**, `/etc/gai.conf` මඟින් ලිපින තේරීම වෙනස් කළ හැක.
වත්මන් repository Dockerfile එක Debian භාවිත කරයි; අභිරුචි musl මත පදනම් වූ images මෙම යාන්ත්රණය
භාවිත නොකරයි. වාර්තා කළ සැකසුම ULA ලේබලය `label fc00::/7 6` සිට
`label fc00::/7 1` දක්වා වෙනස් කරයි. image එකේ සම්පූර්ණ ප්රතිපත්ති වගුවෙන් ආරම්භ කර එහි අනෙකුත්
ඇතුළත් කිරීම් රඳවා ගන්න: `label` හෝ `precedence` ඇතුළත් කිරීමක් එකතු කිරීමෙන් එම පෙරනිමි වගුව
ප්රතිස්ථාපනය වන බැවින්, වෙනස් කළ පේළිය පමණක් අඩංගු ගොනුවක් ප්රමාණවත් නොවේ.
[glibc වින්යාස යොමුව](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
එම ක්රියාකාරීත්වය ලේඛනගත කරයි. සමාලෝචනය කළ ගොනුව `/etc/gai.conf` වෙත කියවීමට පමණක් හැකි ලෙස
bind-mount කර, එය යෙදීම සඳහා සේවාව නැවත සාදන්න.

මෙය **එම කන්ටේනරයෙන් පිටතට යන සියලුම ගමනාගමනය** සඳහා OS ලිපින තේරීම වෙනස් කරයි.
එය සෑම යෙදුමක්ම IPv6 තෝරා ගැනීමට බල නොකරයි: Node හි DNS අනුපිළිවෙළ සහ සම්බන්ධතා
තේරීම ද වැදගත් වේ. විශේෂයෙන්, `--dns-result-order=ipv4first` IPv4 සඳහා ප්රමුඛතාව ලබා දෙන අතර
IPv4-පමණක් භාවිත කිරීමෙන් ඇති වන අසාර්ථකත්වයකට පිළියමක් නොවේ. [Node DNS අනුපිළිවෙළ](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) බලන්න.

ඕනෑම ධාරක මට්ටමේ වෙනසකින් පසු Gemini සහ ඔබේ අනෙකුත් සැපයුම්කරුවන් නැවත පරීක්ෂා කරන්න.
ආපසු හැරවීම සඳහා, අභිරුචි `gai.conf` mount එක ඉවත් කර, පෙර ජාල වින්යාසය ප්රතිස්ථාපනය කර,
නඩත්තු කාල සීමාවකදී බලපෑමට ලක් වූ සේවාව/ජාලය නැවත සාදන්න. ජාලයක් නැවත සෑදීමෙන් එයට අමුණා ඇති
අනෙකුත් කන්ටේනර්වලට බාධා විය හැක; ස්ථිර දත්ත volume එක මකා නොදමන්න.

## වැදගත් සටහන්

- **SQLite WAL ප්රකාරය:** OmniRoute හට නවතම වෙනස්කම් `storage.sqlite` වෙත checkpoint කිරීමට හැකි වන පරිදි `docker stop` අවසන් වීමට ඉඩ දිය යුතුය. ඇතුළත් කර ඇති Compose ගොනු දැනටමත් තත්පර 40ක නැවැත්වීමේ සහන කාලයක් සකසා ඇත. ඔබ image එක සෘජුව ධාවනය කරන්නේ නම්, `--stop-timeout 40` එලෙසම තබා ගන්න.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** සාමාන්ය/ලිවීමට-පෙර backups බාහිරව කළමනාකරණය කරන්නේ නම් මෙය `true` ලෙස සකසන්න. පවතින-database migrations සඳහා තවමත් ඒවාටම වෙන් වූ කල්පවත්නා ආරක්ෂිත snapshot එකක් සහ සමූහ-migration ආරක්ෂණයක් අවශ්ය වේ.
- **දත්ත ස්ථායීතාව:** container නැවත ආරම්භ කිරීම් හරහා ඔබේ database, keys සහ configurations ස්ථිරව තබා ගැනීමට සෑම විටම `/app/data` වෙත volume එකක් mount කරන්න.
- **Port වින්යාසය:** පෙරනිමි `20128` port එක වෙනස් කිරීමට `PORT` environment variable එක override කරන්න.

## මෙයද බලන්න

- [VM යෙදවීමේ මාර්ගෝපදේශය](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare සැකසුම
- [Fly.io යෙදවීමේ මාර්ගෝපදේශය](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io වෙත යොදවන්න
- [Environment වින්යාසය](../reference/ENVIRONMENT.md) — සම්පූර්ණ `.env` යොමුව
