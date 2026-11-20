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

> **එක් විධානයකින් ස්වයං-සත්කාරක ද?** [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` බලන්න (ප්‍රකාශිත රූපය + Redis, loopback-only, profile තේරීමක් නැත). පහත ඉක්මන් ධාවනය යනු දැනටමත් වෙනත් තැනක Redis ධාවනය කරන පරිශීලකයින් සඳහා තනි බහාලුම් මාර්ගයයි.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## පරිසර ගොනුව සමඟ

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

## ඩොකර්ෆයිල් අදියර

ගබඩාව බහු-අදියර Dockerfile (`Dockerfile`) නැව්ගත කරයි. අදියර හතරක් නිරාවරණය වේ; ඔබගේ භාවිත අවස්ථාව සඳහා නිවැරදි `target` තෝරන්න.

| වේදිකාව       | මූලික රූපය            | අරමුණ                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | deps (`npm ci --legacy-peer-deps`) ස්ථාපනය කර `npm run build` ධාවනය කරයි (Turbopack පෙරනිමියෙන් — පහතින් Build-time සම්පත් බලන්න)                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Next.js ස්වාධීන ප්‍රතිදානය සමඟ නිෂ්පාදන ධාවන කාලය.** සපයන්නා CLIs බණ්ඩල් කර නැත.**                                                                                                                                                                                             |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` සහ ගෝලීය CLIs එකතු කරයි : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** නියෝජිත කාර්ය ප්‍රවාහ සඳහා මෙය තෝරන්න.**                                                                                                   |
| `runner-web`  | `runner-base`         | වෙබ් සැසි සපයන්නන් සඳහා Playwright + Chromium බ්‍රවුසරයක් (`--with-deps`) එක් කරයි: `gemini-web`, `claude-web`, `claude-turnstile`.** ඔබ එම සපයන්නන් භාවිතා කරන විට මෙය තෝරන්න** — සරල රූපය එය නොමැතිව ඉල්ලීම් වේලාවේදී අසාර්ථක වේ (නිකුතු නාලිකා යටතේ ඇති `-web` සටහන බලන්න). |

නිශ්චිත ඉලක්කයක් අතින් ගොඩනඟන්න:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ගොඩනැගීමේ කාල සම්පත්

`builder` වේදිකාවේ මිල කුමක්ද යන්න ත්‍රී ගොඩනැගීමේ args පාලනය කරයි. ඒවා ගොඩ නැගීමේ කාලය පමණක් — `OMNIROUTE_MEMORY_MB` (පහළින්) යනු වෙනම, ධාවන කාල බොත්තමකි.

| arg ගොඩනඟන්න                | පෙරනිමිය | බලපෑම                                                                                     |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0` webpack සමඟ ගොඩනඟයි: අඩු උපරිම මතකය, මන්දගාමී. `1` Turbopack වෙත තෝරා ගනී.            |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | පැටවූ `next build` සඳහා V8 ගොඩ සිවිලිම (`--max-old-space-size`).                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | `CIRCLE_NODE_TOTAL` පෝෂණය කරයි; ඊළඟට පිටු-දත්ත එකතු කිරීම සඳහා `workers = N - 1` ලබා ගනී. |

`OMNIROUTE_BUILD_WORKERS` යනු විශාල ගොඩනගන්නෙකු මත ඇති කරන එක වන අතර සීමා සහිත ගොඩනැගීමක් මිය ගිය විට සැක කළ යුතු තැනැත්තා වේ** පසු** `✓ Compiled successfully` සෑම පිටු-දත්ත සේවකයෙක්ම තමන්ගේම ක්‍රියාවලියක් වන අතර, මාපිය `next build` ද එසේමය; සජීවී VPS ප්‍රතිනිෂ්පාදනයක් (නිකුතුව #7518) `NODE_OPTIONS` heap ධජයෙන් ස්වාධීනව ~ 4.5 GB හි එක් එක් ක්‍රියාවලියේ උපරිම RSS මනිනු ලැබේ (Turbopack V8 ගොඩට පිටතින් native/Rust මතකයේ සම්පාදනය කරයි). `2` හි පෙරනිමිය (→ 1 සේවකයා, සම්පූර්ණ ක්‍රියාවලි 2) ප්‍රකාශන නල මාර්ගය භාවිතා කරන 16 GB / 4 vCPU GitHub-සත්කාරක ධාවකයන් සඳහා ප්‍රමාණ වේ. `8` හි (→ 7 කම්කරුවන්) එම ධාවකයාගේ මතකය අවසන් වූ අතර ගොඩනැගීම් කට්ටලය `ResourceExhausted: ... cannot allocate memory` සමඟ පියවර අසාර්ථක විය; `3` (→ 2 කම්කරුවන්) තවමත් එක් ක්‍රියාවලියකට RSS අනුමාන කිරීම වෙනුවට සෘජුව මනිනු ලැබූ පසු නොගැලපේ. `tests/unit/docker-build-memory-budget.test.ts` මනින ලද රූපයට එරෙහිව අංක ගණිතය සිදු කරන අතර බොත්තම් එකක් හෝ ධාවකයා අභිබවා ගියහොත් අසාර්ථක වේ.

Turbopack සම්පාදනය කරන්නේ ස්වදේශික රස්ට් මතකයේ ජීවත් වන බවයි** පිටත** V8 ගොඩ, එබැවින් `OMNIROUTE_BUILD_MEMORY_MB` එය බැඳෙන්නේ නැත. මතක සිවිලිමක් සහිත ධාරකයක ගොඩනැංවීම OOM ඝාතකයා විසින් SIGKILLed බවට පත් කර කිසිදු දෝෂයක් නොමැතිව — එය හුදෙක් මැද-`Creating an optimized production build` නතර කරයි, එය මතකයෙන් බැහැර වීමක් වෙනුවට එල්ලීමක් මෙන් කියවේ. `Dockerfile` පෙරනිමියෙන් webpack කිරීමට (`OMNIROUTE_USE_TURBOPACK=0`), `npm run dev` / `npm run build` මෙන් නොව, Turbopack කේතය පෙරනිමිය වන්නේ එබැවිනි: ගොඩනැගීමේ args නොමැති හිස් `docker build .` (දුම්රිය සහ අනෙකුත් එක්-ක්ලික් ධාරක ධාවනය කරන) මතකය ආවරණය කරන ලද සාදන්නෙකු මත නිහඬව මිය නොයා යුතුය. ප්‍රකාශිත පින්තූර දැනටමත් `docker-publish.yml` තුළ පැහැදිලිවම `OMNIROUTE_USE_TURBOPACK=0` පසුකර ඇත. RAM ඕනෑ තරම් ඇති තනන්නා මත, වේගවත් ගොඩනැගීමක් සඳහා Turbopack වෙත තෝරා ගන්න:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` සබල කර ඇත, එබැවින් `next build` මාපියෙකු ධාවනය කරයි** සහ** සේවක ක්‍රියාවලියක් සහ එක් එක් ගෞරවය `OMNIROUTE_BUILD_MEMORY_MB` වෙන වෙනම. කන්ටේනර් සිවිලිම එක් වරක් නොව දළ වශයෙන් මෙන් දෙගුණයකට වඩා වැඩි කරන්න.

මෙම ගස මත මනිනු ලැබේ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| බණ්ඩලර්   | බහාලුම් සිවිලිම | ප්රතිඵලය                                     |
| --------- | --------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | OOM-දෙදෙනාම ඝාතනය කළා, නිහඬව                 |
| webpack   | 8 GiB           | කම්කරු SIGKILLed ගොඩනැගීම                    |
| webpack   | 12 GiB          | සාර්ථක වූ අතර, 11.1 GiB හි උපරිමයට පැමිණියේය |

### ධාවන කාල පෙරනිමි

`runner-base` විසින් අපනයනය කරන ලද පෙරනිමි: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker හි මතක හැසිරීම:

- රූපය `OMNIROUTE_MEMORY_MB=1024` සකසා එයින් `NODE_OPTIONS=--max-old-space-size=1024` ලබා ගනී.
- සත්‍ය සේවාදායක ක්‍රියාවලිය ආරම්භ කරනු ලබන්නේ `OMNIROUTE_MEMORY_MB` කියවන සහ `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` එකතු කරන ස්වාධීන දියත් කිරීම මගිනි.
- Node අවසාන පුනරාවර්තන `--max-old-space-size` අගය භාවිතා කරයි, එබැවින් `OMNIROUTE_MEMORY_MB` සැකසීම ඵලදායී Docker ගොඩ සීමාව පාලනය කරයි.
- රූපය සැමවිටම එය සකසන බැවින්, දියත් කරන්නාගේම RAM-ක්‍රමාංකනය කළ පසුබැසීම කිසිවිටෙක Docker යටතේ අදාළ නොවේ. වැඩ බර සඳහා එය පැහැදිලිවම ඔසවන්න (පහත වගුව). කේතීකරණ නියෝජිත `/v1/responses` සඳහා `2048` තවමත් කුඩා වැඩිය.

### කේතීකරණ නියෝජිතයන් සඳහා ධාවන කාලය RAM

1 GiB Docker පෙරනිමිය dashboard/light-chat තට්ටුවක් මිස නිෂ්පාදන ප්‍රමාණය නොවේ. දිගු `POST /v1/responses` සිරුරු (පණිවිඩ සිය ගණනක්, මෙවලම් දස ගණනක්) සම්පීඩනය අතරතුර බහු-මතක ප්‍රස්ථාර රඳවා ගනී. අතිච්ඡාදනය වන ~ 3 MiB / ~ 750k-ටෝකන් ඉල්ලීම් දෙකක් V8 ගබ්සා කර ඇත** 12 GiB** පැරණි අවකාශය (`FATAL ERROR: Reached heap limit`) සහ 16 GiB cgroup OOM. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) බලන්න.

ප්රමාණය** cgroup `--memory` ගොඩට ඉහළින්** — ස්වදේශීය බෆර, SQLite, සහ සම්පීඩන අතරමැදි V8 ට පිටතින් පිහිටා ඇත.

| වැඩ බර                                      | `OMNIROUTE_MEMORY_MB`       | බහාලුම් / cgroup      | සටහන්                                                                                          |
| ------------------------------------------- | --------------------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| උපකරණ පුවරුව, එක් සැහැල්ලු කතාබස්           | `1024` (රූපය පෙරනිමිය)      | ≥2 GiB                |                                                                                                |
| එක් කේතීකරණ නියෝජිතයෙක් (Claude/Codex/Grok) | `8192`                      | ≥10 GiB               | සාමාන්‍ය තනි සැසි `/v1/responses`                                                              |
| සමගාමී දිගු `/v1/responses` දෙකක්           | `10240`–`12288`             | ≥12–16 GiB            | ~ 12 GiB ගොඩකින් V8 මනින ලදී                                                                   |
| + සමගාමී දිගු සන්දර්භ තුනක්                 | එක් ක්රියාවලියක් මත නොකරන්න | අනුක්‍රමික / වැඩි RAM | පෙරනිමි හෙවිවේට් ප්‍රවේශය 1 ගුවන් යානය තුළ; RAM නොමැතිව එය ඉහළ නැංවීම ගබ්සාව නැවත හඳුන්වා දෙයි |

හිස් ලෝහ මත `omniroute serve` ක්‍රමාංකනය කරයි ~RAM හි 35% (clamped `[512, 4096]`) `OMNIROUTE_MEMORY_MB` වූ විට** සකස් නොකළ** . Docker සෑම විටම `1024` සකසයි, එවිට ක්‍රමාංකනය කිසි විටෙකත් නිල රූපයේ ක්‍රියාත්මක නොවේ.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## උප මාර්ගයක ප්‍රතිලෝම ප්‍රොක්සි (Traefik / nginx)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### ගොඩනඟන්න (නිර්දේශිත)

`.env` හි විචල්‍ය දෙකම සකසන්න, ඉන්පසු රූපය සහ ධාවන කාලය එකඟ වන පරිදි නැවත ගොඩනඟන්න:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Docker build-arg ලෙස සහ ධාවන කාල පරිසර විචල්‍යයක් ලෙස ඉදිරියට යයි.

### පෙර-සාදන ලද මූල රූපය + ධාවන කාල උපපථය

ප්‍රකාශිත `cheaperinference/omniroute:*` පින්තූර වසම් මූල සඳහා ගොඩනගා ඇත. ඔබට තවමත් ධාවන වේලාවේදී `OMNIROUTE_BASE_PATH` සැකසිය හැක; කන්ටේනරය ආරම්භයේදී වරක් බණ්ඩලය පැච් කරයි. ගැළපෙන පොදු සම්භවය සමඟ එය යුගල කරන්න:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ඉදිරියට යාමට ප්‍රතිලෝම ප්‍රොක්සිය වින්‍යාස කරන්න** පූර්ණ** බාහිර මාර්ගය (උපසර්ගය ඉවත් නොකරන්න). Traefik විසින් `PathPrefix(`/ omniroute `)` `StripPrefix` නොමැතිව කන්ටේනරය වෙත යොමු කළ යුතුය, එබැවින් Next.js හට `/omniroute/...` ලැබෙන අතර `/omniroute/_next/...` වෙතින් වත්කම් සේවය කරයි.

Docker සෞඛ්‍ය පරීක්‍ෂණය සක්‍රිය `OMNIROUTE_BASE_PATH` සමඟ උපසර්ග කර ඇති සැහැල්ලු `/healthz` ජීවන චක්‍ර අන්ත ලක්ෂ්‍යය පරීක්‍ෂා කරයි. human/dashboard රෝග විනිශ්චය සඳහා `/api/monitoring/health` ඉතිරිව ඇත; කන්ටේනරය HEALTHCHECK ආපසු ඒ දෙසට යොමු කිරීමට (උදාහරණයක් ලෙස ගැඹුරු සෞඛ්‍ය බලාත්මක කිරීම සඳහා), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` සකසන්න. එම මාර්ගය ඒ** ගැඹුරු** පරීක්ෂා කරන්න (DB + අධීක්ෂණ සාරාංශය) ඔබ ආපසු ඇතුළු වන්නේ නම්, Docker හි කලාතුරකින් සිදුවන `HEALTHCHECK` සඳහා සුදුසු —, නමුත්** නැත** Kubernetes `livenessProbe` අන්තරයන් සඳහා.

වාද්‍ය වෘන්දකයන් සඳහා (කුබර්නෙට්ස්, නෝමාඩ්, ආදිය):

| විමර්ශනය කරන්න       | කැමති                                                             | වළකින්න                                                   |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| සජීවී බව             | HTTP `GET /livez`, හෝ ප්‍රධාන වරායේ TCP (`PORT`, default `20128`) | `/api/monitoring/health` සජීවී ලෙස                        |
| සූදානම               | HTTP `GET /healthz`                                               | කාර්යබහුල වූ Event-loop මිය ගිය ලෙස සලකන දැඩි කාල සීමාවන් |
| ගැඹුරු / කළු පෙට්ටිය | `/api/monitoring/health`                                          | —                                                         |

`/healthz` ක්‍රියාවලි ජීවන චක්‍රය වාර්තා කරයි (`ok` / `starting` / `stopping`). `/livez` යනු ක්‍රියාවලි-සජීවී පමණි (හැසිරුම්කරුට ක්‍රියාත්මක විය හැකි සෑම විටම 200; එය සූදානම සඳහා බලා සිටින්නේ නැත). දෙකම තවමත් ඉල්ලීම් හැසිරවීම ලෙස එකම Node සිද්ධි පුඩුවක් මත ධාවනය වේ, එබැවින් CPU-බැඳි නාමාවලිය හෝ සම්පීඩන කාර්යය — කාර්යබහුල ≠ මියයාම ප්‍රමාද කළ හැක. HTTP පරීක්ෂණ කාලය අවසන් නම් TCP සජීවීතාවයට කැමති වන්න. සම්පූර්ණ පරීක්ෂණ මාර්ගෝපදේශය: [අධීක්ෂණ මාර්ගෝපදේශය — Kubernetes පරීක්ෂණ නිර්දේශ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Caddy සමඟ රචනා කරන්න (HTTPS Auto-TLS)

Caddy හි ස්වයංක්‍රීය SSL ප්‍රතිපාදන භාවිතයෙන්OmniRoute ආරක්ෂිතව නිරාවරණය කළ හැක. ඔබගේ වසමේ DNS A වාර්තාව ඔබගේ සේවාදායකයේ IP වෙත යොමු වන බව සහතික කර ගන්න.

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

Caddy උඩු ප්‍රවාහ කන්ටේනරය සඳහා සම්මත යොමු කිරීමේ ශීර්ෂ සකසයි. OmniRoute OAuth ඇමතුම් සහ ජනනය කරන ලද පොදු සබැඳි සඳහා කැනොනිකල් පොදු සම්භවය ලෙස `NEXT_PUBLIC_BASE_URL` භාවිතා කරයි; සත්‍යාපිත උපකරණ පුවරුව ලිවීම් එකම සම්භවයක් ඇති ඉල්ලීම් සහ සැසි-බන්ධිත CSRF ආරක්ෂාව භාවිතා කරයි. පැහැදිලි වින්‍යාස කිරීම වෙනුවට විශ්වාසදායක යොමු කළ ශීර්ෂයන්ගෙන් පොදු සම්භවය ලබා ගැනීමට ඔබට හිතාමතාම OmniRoute අවශ්‍ය නම් උසස් යෙදවුම් සඳහා පමණක් `OMNIROUTE_TRUST_PROXY` සබල කරන්න.

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

## රූප ටැග්

| රූපය                         | ටැග් කරන්න | ප්රමාණය | විස්තරය                                                       |
| ---------------------------- | ---------- | ------- | ------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest`   | ~ 250MB | ඉහළම** ප්රකාශයට පත් කරන ලදී** ස්ථාවර SemVer (git `main` නොවේ) |
| `cheaperinference/omniroute` | `3.8.54`   | ~ 250MB | GitOps සඳහා මෙම ටැග් පන්තිය අමුණන්න                           |

එකම රූප නිධි තුනකට ප්‍රකාශනය කරනු ලැබේ, එක් ගෘහ නිර්මාණ ශිල්පයට සමාන සංග්‍රහයන් ඇත: `cheaperinference/omniroute` (Docker Hub, ලාභ අනුමාන සංවිධානය, 3.8.53 සිට), `ghcr.io/cheaper-inference/omniroute` සහ ලෙගසි `diegosouzapw/omniroute`, එහි ඇදීමේ ඉතිහාසය තබා ගන්නා අතර තවමත් සෑම නිකුතුවක්ම ලබා ගනී. පවතින `diegosouzapw/omniroute` යෙදවීම් යාවත්කාලීන වෙමින් පවතී; රූපයේ නම මාරු කිරීම විකල්ප වේ. පහත `:next` / `:next-web` පූර්ව නිකුතු නාලිකාව `diegosouzapw/omniroute` සහ GHCR වෙත පමණක් ප්‍රකාශනය කෙරේ.

බහු-වේදිකා මැනිෆෙස්ටය: `linux/amd64` + `linux/arm64` ස්වදේශික (Apple Silicon, AWS Graviton, Raspberry Pi). Docker ගැලපෙන ගෘහ නිර්මාණ ශිල්පය ස්වයංක්‍රීයව තෝරා ගනී; ඔබට ARM ධාරක මත AMD64 අනුකරණය බල කිරීමට අවශ්‍ය නම් `--platform linux/amd64` සමත් වන්න.

### නාලිකා නිකුත් කරන්න

OmniRoute ස්ථාවර නිකුතු සඳහා වෙනම Docker නාලිකා ප්‍රකාශයට පත් කරයි, සක්‍රීය නිකුතු-ශාඛා පරීක්ෂණ සහ සංවර්ධන ගොඩනැගීම්.

| නාලිකාව                         | මූලාශ්රය                                    | විකෘතිතාව                               | නිර්දේශිත භාවිතය                                                                                                                    |
| ------------------------------- | ------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned නිකුතුව                    | වෙනස් කළ නොහැකි                         | නිශ්චිත නිකුතුවක් නියම කරන නිෂ්පාදන යෙදවීම්                                                                                         |
| `:latest` / `:latest-web`       | ඉහළම** ප්රකාශයට පත් කරන ලදී** ස්ථාවර SemVer | වෙනස් කළ හැකි ස්ථායී දර්ශකය             | ස්ථාවර නිකුතු අනුගමනය කරයි** පසු** SemVer ප්‍රකාශන කාර්යය — කරයි** නැත** `main` හෝ නිකුත් නොකළ `release/v*` කැපවීම් නිරීක්ෂණය කරන්න |
| `:next` / `:next-web`           | වත්මන් පෙරනිමි `release/v*` ශාඛාව           | විකෘති කළ හැකි පූර්ව මුදා හැරීමේ දර්ශකය | සක්‍රිය මුදා හැරීමේ ශාඛාව මත පතිත වී ඇති නමුත් තවමත් ස්ථාවර නිකුතුවක නොමැති පරීක්ෂණ නිවැරදි කිරීම්                                  |
| `:main` / `:main-web`           | `main` ශාඛාව                                | වෙනස් කළ හැකි සංවර්ධන දර්ශකය            | සංවර්ධනය සහ ඒකාබද්ධතා පරීක්ෂණ පමණි                                                                                                  |

#### වෙබ් සැසි සපයන්නන්: `-web` රූප

ඉහත සෑම නාලිකාවක්ම `-web` ටැගයක් ලෙස දෙගුණ කරයි (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), `runner-web` අදියරේ — එකම රූපය සහ Playwright සහ Chromium බ්‍රවුසරයකින් ගොඩනගා ඇත. සරල රූප නැව්** තොරව** ක්රෝමියම්; `gemini-web`, `claude-web` සහ `claude-turnstile` එය අවශ්‍යයි.

අසාර්ථක වීම කල් දමා ඇත, ආරම්භක වේලාව නොවේ: එම සපයන්නන් ඔවුන්ගේ ආකෘති ලැයිස්තුගත කර උපකරණ පුවරුවේ සම්බන්ධ වී ඇති පරිදි පෙන්වයි, සහ පළමු ඉල්ලීම පමණක් අසාර්ථක වේ

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

ඔබ එම සපයන්නන් භාවිතා කරන්නේ නම්, ඔබ දැනටමත් — හි සිටින නාලිකාවේ `-web` ටැගය අදින්න, වෙන කිසිවක් වෙනස් නොවේ. npm/CLI ස්ථාපනයකදී ( Docker රූපයක් නැත), සමාන අතුරුදහන් කොටස බ්‍රවුසර ද්විමය වේ: ධාරකය මත `npx playwright install chromium` ධාවනය කරන්න.

#### පූර්ව මුදා හැරීමේ නාලිකාව භාවිතා කිරීම

`next` නාලිකාව වත්මන් පෙරනිමි `release/v*` ශාඛාව වෙත සෑම තල්ලුවකින්ම නැවත ගොඩනඟා ඇති අතර AMD64 සහ ARM64 යන දෙකටම ප්‍රකාශනය කෙරේ. පැරණි නඩත්තු ශාඛාවලට එය නැවත ලිවිය නොහැක. මීළඟ ස්ථායී ටැගය කපා හැරීමට පෙර සක්‍රිය මුදා හැරීමේ ශාඛාවට ඒකාබද්ධ වී ඇති නිවැරදි කිරීම් සඳහා නාලිකාව අදින්න හැකි රූපයක් සපයයි.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose සඳහා, තෝරාගත් පැතිකඩ විසින් භාවිතා කරන ලද රූප ටැගය අභිබවා යන්න, ඉන්පසු සේවාව අදින්න සහ ප්‍රතිනිර්මාණය කරන්න:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### ආරක්ෂාව සහ ආපසු හැරීම

`next` යනු පාවෙන පූර්ව මුදා හැරීමේ නාලිකාවකි. සක්‍රීය මුදා හැරීමේ ශාඛාව වෙත ඕනෑම තල්ලුවක් මත එය වෙනස් විය හැක** නිෂ්පාදන භාවිතය සඳහා සහාය නොදක්වයි** . නිශ්චිත ගොඩනැගීමක් තක්සේරු කරන අතරතුර රූප ජීර්ණය අමුණන්න:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

පරීක්ෂා කිරීමට පෙර, OmniRoute දත්ත පරිමාව හෝ බැඳුණු දත්ත නාමාවලිය උපස්ථ කරන්න. ආපසු පෙරළීමට, කලින් භාවිත කළ ස්ථායී අනුවාදය ප්‍රතිසාධනය කරන්න හෝ බහාලුම දිරවා ප්‍රතිනිර්මාණය කරන්න:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

නිකුතු-ශාඛා ගොඩනැගීමකට කිසිදා `latest` චලනය කළ නොහැක; ස්ථායී දර්ශකය ප්‍රවර්ධනය කළ හැක්කේ සුදුසුකම් ලත් ස්ථාවර අර්ථකථන අනුවාදයක් පමණි. `next` පින්තූර මුදා හැරීමේ රූප පරීක්ෂාව රඳවා තබා ගන්නා අතර විවේචනාත්මක අවදානම් දොරටුව අවහිර කරයි.

**`latest` යනු git සඳහා මුදල් ඇපයක් නොවේ.** `main` හෝ සක්‍රිය `release/v*` ශාඛාව මත ඒකාබද්ධ කළ නිවැරදි කිරීම් වේ** නැත** ස්ථාවර SemVer රූපයක් ප්‍රකාශනය වන තෙක් සහ ප්‍රකාශන කාර්යය `:latest` ප්‍රවර්ධනය කරන තෙක් `:latest` SemVerGitHub දැනටමත් නිවැරදි කිරීම පෙන්වන අතර `latest` ශීත කළ බවක් පෙනේ නම්, මුදා හැරීමේ ශාඛාව පරීක්ෂා කිරීමට හෝ SemVer ටැගය සඳහා රැඳී සිටීමට `:next` අදින්න.

| ඔබට අවශ්යයි                                                             | භාවිතා කරන්න                 |
| ----------------------------------------------------------------------- | ---------------------------- |
| ප්ලාවිත නොවිය යුතුGitOps / නිෂ්පාදනය                                    | Pin `:X.Y.Z` (හෝ රූප ජීර්ණය) |
| ප්‍රකාශිත ස්ථාවරයන් අනුගමනය කර එක් එක් නිකුතුවේ ප්‍රතිනිර්මාණය පිළිගන්න | `:latest`                    |
| නිකුත් නොකළ `release/v*` කැපවීම් පරීක්ෂා කරන්න                          | `:next` (නිෂ්පාදනය නොවේ)     |
| `main` පරීක්ෂා කරන්න                                                    | `:main` (නිෂ්පාදනය නොවේ)     |

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
