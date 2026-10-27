# 🐳 Docker Guide — OmniRoute (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> முழுமையான Docker வரிசைப்படுத்தல் குறிப்பேடு. விரைவாகத் தொடங்க, [README-இன் Docker பகுதியைப்](../README.md#-docker) பார்க்கவும்.

## உள்ளடக்க அட்டவணை

- [விரைவாக இயக்குதல்](#quick-run)
- [சூழல் கோப்புடன்](#with-environment-file)
- [Docker Compose](#docker-compose)
- [கிடைக்கக்கூடிய சுயவிவரங்கள்](#available-profiles)
- [OmniRoute Docker-இல் இயங்கும்போது ஹோஸ்ட் CLI கருவிகளை உள்ளமைத்தல்](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [உற்பத்திச் சூழலுக்கான Compose](#production-compose)
- [Dockerfile நிலைகள்](#dockerfile-stages)
- [முக்கியமான சூழல் மாறிகள்](#critical-environment-variables)
- [Caddy (HTTPS) உடன் Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare விரைவு Tunnel](#cloudflare-quick-tunnel)
- [Image குறிச்சொற்கள்](#image-tags)
- [Docker-இல் Dashboard புதுப்பிப்புகள்](#dashboard-updates-in-docker)
- [கிடைப்புத்தன்மை: இயல்புநிலை SQLite ஒற்றைப் பிரதியை மட்டுமே ஆதரிக்கிறது](#availability-default-sqlite-is-single-replica)
- [Docker-க்குள் Gemini பிராந்தியப் பிழைகள்](#gemini-regional-errors-inside-docker)
- [முக்கியக் குறிப்புகள்](#important-notes)

---

## விரைவாக இயக்குதல்

> **ஒரே கட்டளையில் சுயமாக ஹோஸ்ட் செய்ய வேண்டுமா?**
> [சுய-ஹோஸ்ட் வழிகாட்டியைப்](../getting-started/SELF_HOST_GUIDE.md) பார்க்கவும் —
> `docker compose -f docker-compose.selfhost.yml up -d` (வெளியிடப்பட்ட image +
> Redis, loopback மட்டும், சுயவிவரத் தேர்வு இல்லை). கீழேயுள்ள விரைவு இயக்க முறை,
> ஏற்கெனவே வேறொரு இடத்தில் Redis-ஐ இயக்கும் பயனர்களுக்கான ஒற்றை-container வழியாகும்.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## சூழல் கோப்புடன்

```bash
# முதலில் .env கோப்பை நகலெடுத்து திருத்தவும்
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
# அடிப்படைச் சுயவிவரம் (CLI கருவிகள் இல்லை)
docker compose --profile base up -d

# CLI சுயவிவரம் (Claude Code, Codex, OpenClaw உள்ளமைக்கப்பட்டுள்ளன)
docker compose --profile cli up -d

# ஹோஸ்ட் சுயவிவரம் (முதன்மையாக Linux-க்கானது; ஹோஸ்ட் CLI binary-களை வாசிக்க மட்டும் ஏற்றுகிறது)
docker compose --profile host up -d

# வலைச் சுயவிவரம் (வலை அமர்வு வழங்குநர்களுக்கான Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI sidecar-ஐ இணைக்கவும்
docker compose --profile cli --profile cliproxyapi up -d
```

## கிடைக்கக்கூடிய சுயவிவரங்கள்

முக்கியமான வரிசைப்படுத்தல் அமைப்புகளுக்கான Compose சுயவிவரங்களுடன் OmniRoute வழங்கப்படுகிறது. உங்கள் சூழலுக்குப் பொருத்தமான ஒன்றைத் தேர்ந்தெடுக்கவும்.

| சுயவிவரம்           | சேவை             | எப்போது பயன்படுத்த வேண்டும்                                                                                                                                   | கட்டளை                                       |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (இயல்புநிலை) | `omniroute-base` | Headless சேவையகம் / குறைந்தபட்ச runtime; வழங்குநர் CLI-கள் எதுவும் சேர்க்கப்படவில்லை                                                                          | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | `omniroute providers/setup/doctor` மற்றும் உள்ளமைக்கப்பட்ட CLI-களை (Codex, Claude Code, Droid, OpenClaw) அழைக்கும் agentic பணிப்பாய்வுகள்                     | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` போன்றவற்றை வாசிக்க மட்டும் ஏற்றுவதன் மூலம் ஹோஸ்ட் CLI-களுக்கான `network_mode` போன்ற அணுகலை விரும்பும் Linux ஹோஸ்ட்கள் | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | upstream CLI proxying-க்காக [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar-ஐ `8317` port-இல் இயக்கவும்                                   | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | உலாவி தேவைப்படும் வலை அமர்வு வழங்குநர்கள்: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web`-ஐ உருவாக்குகிறது; Chromium சேர்க்கப்பட்டுள்ளது)       | `docker compose --profile web up -d`         |

> பல சுயவிவரங்களை இணைக்கலாம்: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute Docker-இல் இயங்கும்போது ஹோஸ்ட் CLI கருவிகளை உள்ளமைத்தல்

`omniroute setup-codex`, `setup-claude`, `config set <tool>` மற்றும் டாஷ்போர்டின்
**உள்ளமைவைச் சேமி** பொத்தான் ஆகிய அனைத்தும் `~/.codex/*.config.toml` போன்ற கோப்புகளை எழுதுகின்றன. அந்தப் பாதைகள்
CLI உண்மையில் இயங்கும் கணினியில் மட்டுமே பொருள் கொண்டவை. அவற்றைக் கண்டெய்னருக்குள்
இயக்கினால், எழுதப்படும் கோப்பு கண்டெய்னரின் சொந்த முகப்புக் கோப்பகத்தில் (`/home/node` —
இமேஜ் `USER node` ஆக இயங்குகிறது) சேமிக்கப்படும்; எந்த ஹோஸ்ட் CLI-யும் அதை ஒருபோதும் படிக்காது, மேலும் கண்டெய்னர்
மீண்டும் உருவாக்கப்படும் தருணத்தில் அது நீக்கப்படும்.

OmniRoute இதைக் கண்டறிந்து, நீங்கள் பயன்படுத்த முடியாத வெற்றியைத் தெரிவிப்பதற்குப் பதிலாக
வழிமுறைகளுடன் எழுதுதலை மறுக்கிறது: CLI `2` என்ற வெளியேற்றக் குறியீட்டுடன் முடிவடைகிறது, மேலும் API `422` உடன்
`containerEphemeralTarget: true` எனப் பதிலளிக்கிறது.

### பரிந்துரைக்கப்படுவது: CLI-ஐ ஹோஸ்டில் இயக்கி, OmniRoute-ஐ Docker-இல் இயக்கவும்

கண்டெய்னர் API-ஐ வழங்குகிறது; CLI உங்கள் ஹோஸ்ட் கருவிகளை உள்ளமைக்கிறது.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI-ஐ கண்டெய்னருடன் இணைக்கவும்
omniroute setup-codex                      # உங்கள் ஹோஸ்டில் உள்ள உண்மையான ~/.codex-இல் எழுதுகிறது
```

Codex, Claude Code, Cursor அல்லது இதுபோன்றவை உங்கள்
மடிக்கணினியில் இயங்கும்போது இதுவே சரியான தேர்வு — இதுவே வழக்கமான அமைப்பு.

### மாற்று வழி: ஹோஸ்ட் உள்ளமைவுக் கோப்பகங்களை bind-mount செய்யவும் (`host` சுயவிவரம்)

கண்டெய்னரே உங்கள் ஹோஸ்ட் உள்ளமைவை எழுத வேண்டுமெனில்,
கோப்பகங்களை mount செய்து, `CLI_CONFIG_HOME`-ஐ mount மூலக் கோப்பகத்தை நோக்குமாறு அமைக்கவும். `host` சுயவிவரம்
ஏற்கனவே இதைச் செய்கிறது:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

bind mount-தான் பாதையை நம்பகமானதாக ஆக்குகிறது: OmniRoute
`/proc/self/mountinfo`-ஐப் படித்து, mount செய்யப்பட்ட பாதைகளில் எழுத அனுமதிக்கிறது (மேலும் அவற்றின்
குழந்தைக் கோப்பகங்கள் mount செய்யப்பட்டிருக்கும் கோப்பகங்களிலும் அனுமதிக்கிறது; மேலே உள்ள `/host-home` அமைப்பு இதற்கு
மிகச்சரியான எடுத்துக்காட்டு), அதே நேரத்தில் mount செய்யப்படாத பாதைகளைத் தொடர்ந்து மறுக்கிறது.

### அவசர மாற்றுவழி: கண்டெய்னரின் சொந்த CLI-களை உள்ளமைக்கவும் (சிக்கனமாகப் பயன்படுத்தவும்)

CLI-கள் உண்மையிலேயே கண்டெய்னருக்குள் இருக்கும் போது (`cli` சுயவிவரம்), அந்த எழுதுதல்
வேண்டுமென்றே செய்யப்படுவது. எந்த `setup-*` கட்டளைக்கும் `--allow-container-write`-ஐ வழங்கவும் அல்லது
சர்வருக்காக `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`-ஐ அமைக்கவும். அந்த எழுதுதல் கண்டெய்னருக்கு அப்பால்
நிலைத்திருக்காது என்ற எச்சரிக்கையுடன் தொடரும்.

> **பாதுகாப்பு எச்சரிக்கை — `cli` சுயவிவரம் + `docker.sock` mount.**
> கண்டெய்னருக்குள் உள்ள தானியங்கிப் புதுப்பிப்பான் ஹோஸ்ட் daemon-இலிருந்து stack-ஐ
> மீண்டும் உருவாக்குவதற்காக `cli` சுயவிவரம் `/var/run/docker.sock`-ஐ bind-mount செய்கிறது
> (`src/lib/system/autoUpdate.ts` அந்த socket உள்ளதா எனச் சோதித்து, அது
> இல்லாதபோது Docker பாதையைத் தவிர்க்கிறது). அந்த socket **ஹோஸ்ட் root நம்பிக்கை
> எல்லை** ஆகும்: அதை அணுகக்கூடிய எதுவும் ஹோஸ்ட் Docker daemon-ஐ
> root ஆகக் கட்டுப்படுத்தும் — ஹோஸ்டில் உள்ள எந்தக் கண்டெய்னரையும் உருவாக்கலாம், ஆய்வு செய்யலாம், நிறுத்தலாம் மற்றும் அகற்றலாம்.
> விளைவுகள்:
>
> 1. **`cli` சுயவிவரத்தின் port-ஐ ஒருபோதும் பிணையத்திற்கு வெளிப்படுத்த வேண்டாம்.** அதை
>    `127.0.0.1`-இல் வெளியிடவும் (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN வழியாக அணுகக்கூடிய `cli` சுயவிவரம், டாஷ்போர்டு மட்டத்திலான எந்த RCE-யையும்
>    ஹோஸ்டை முழுமையாகக் கைப்பற்றுவதற்கு வழிவகுக்கும்.
> 2. **`cli` சுயவிவரத்திற்குள் கூடுதல் ஹோஸ்ட் கோப்பகங்கள் எதையும் bind செய்ய வேண்டாம்.**
>    Docker socket உடன் சேர்க்கப்படும் எந்தக் கூடுதல் mount-உம், உங்கள் கோப்பு முறைமை மற்றும் ஹோஸ்ட்
>    உள்ளமைவை முழுமையாகப் படிக்கவும் எழுதவும் கண்டெய்னருக்கு அனுமதிக்கும். ஒரு கருவி
>    ஒரு project-ஐப் பார்க்க வேண்டுமெனில், அதை CLI binary மூலம் உள்ளூரில் இயக்கவும் — அதை
>    `cli` கண்டெய்னருக்குள் mount செய்ய வேண்டாம்.
>
> கண்டெய்னருக்குள் தானியங்கிப் புதுப்பித்தல் தேவையில்லை என்றால், `cli` சுயவிவரத்தை முடக்கியே
> வைக்கவும் (`COMPOSE_PROFILES=core,redis` அல்லது இன்னும் சுருக்கமாக). மற்ற சுயவிவரங்கள்
> Docker socket-ஐ mount செய்வதில்லை.
>
> MITM தொடர்பான அச்சுறுத்தல் மாதிரிக்கு `docs/security/MITM-TPROXY-DECRYPT.md`-ஐப் பார்க்கவும் (git-இல் உள்ளது; `/docs`-இல் தொகுக்கப்படவில்லை);
> மேலும் `codex`/`claude-code`/`droid`/`openclaw` binary-களின் மூலாதாரச் சங்கிலிக்கு
> `docs/security/SUPPLY_CHAIN.md`-ஐப் பார்க்கவும்.

## Redis சைட்கார்

விநியோகிக்கப்பட்ட வீதக் கட்டுப்படுத்தி மற்றும் பகிரப்பட்ட தற்காலிகச் சேமிப்பகத்தை ஆதரிக்க OmniRoute, Redis-ஐச் சார்ந்துள்ளது. `redis` சேவை `docker-compose.yml`-இல் **எப்போதும் வரையறுக்கப்பட்டிருக்கும்** (இதற்கு சுயவிவரத் தடுப்பு இல்லை); மேலும், இது மற்ற எந்தச் சுயவிவரத்துடனும் சேர்ந்து தொடங்கும்.

| விவரம்                      | மதிப்பு                                    |
| --------------------------- | ------------------------------------------ |
| இமேஜ்                       | `redis:7-alpine`                           |
| கண்டெய்னர் பெயர்            | `omniroute-redis`                          |
| உள் போர்ட்                  | `6379`                                     |
| ஹோஸ்ட் போர்ட் (மேலெழுதல்)   | `REDIS_PORT` (இயல்புநிலை `6379`)           |
| ஹோஸ்ட் பிணைப்பு (மேலெழுதல்) | `REDIS_BIND_HOST` (இயல்புநிலை `127.0.0.1`) |
| வால்யூம்                    | `omniroute-redis-data` → `/data`           |
| நிலைச் சோதனை                | `redis-cli ping` (10 வினாடி இடைவெளி)       |

தொடர்புடைய சூழல் மாறிகள்:

- `REDIS_URL` — செயலியில் செலுத்தப்படும் இணைப்புச் சரம் (இயல்புநிலையாக `redis://redis:6379`).
- `REDIS_PORT` — Redis கண்டெய்னருக்கான ஹோஸ்ட்-பக்க போர்ட் ஒதுக்கீடு.
- `REDIS_BIND_HOST` — போர்ட் வெளியிடப்படும் ஹோஸ்ட் இடைமுகம். இயல்புநிலை `127.0.0.1`.

> **இயல்பாக லூப்பேக் ஏன்:** சைட்கார் `requirepass` இல்லாமல் இயங்குகிறது; செயலி
> கண்டெய்னர்கள் compose நெட்வொர்க் (`redis:6379`) வழியாக அதை அணுகுகின்றன — வெளியிடப்பட்ட போர்ட்
> ஹோஸ்ட்-பக்கக் கருவிகளுக்காக (`redis-cli`, உள்ளூர் `npm run dev`) மட்டுமே உள்ளது. `0.0.0.0`-இல்
> வெளியிடுவது, அங்கீகரிக்கப்படாத Redis-ஐ உங்கள் LAN-இல் உள்ள ஒவ்வொரு ஹோஸ்டிற்கும் வெளிப்படுத்தும். நீங்கள்
> `REDIS_BIND_HOST=0.0.0.0` என அமைத்தால், சேவையின் `command:`-இல் `--requirepass`-ஐயும் சேர்க்கவும்.

**Redis-ஐ முடக்குவது** பரிந்துரைக்கப்படவில்லை (வீதக் கட்டுப்படுத்தி நினைவகத்திலுள்ள மாற்றுவழிக்குத் தரமிறங்கும்). அவசியமெனில், `docker-compose.yml`-இல் உள்ள `redis:` சேவைத் தொகுதியை அகற்றவும்/கருத்துரையாக்கவும் அல்லது அதை பூஜ்ஜியமாக அளவிடவும்:

```bash
docker compose up -d --scale redis=0
```

## உற்பத்தி Compose

மேம்பாட்டுச் சூழலுடன் இணையாக இயங்கும் தனிமைப்படுத்தப்பட்ட உற்பத்தி ஸ்னாப்ஷாட்டிற்கு, `docker-compose.prod.yml`-ஐப் பயன்படுத்தவும்.

| விவரம்                       | மதிப்பு                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| கோப்பு                       | `docker-compose.prod.yml`                                                                                           |
| இயல்புநிலை டாஷ்போர்டு போர்ட் | `PROD_DASHBOARD_PORT=20130` (உள் `${DASHBOARD_PORT:-20128}`-க்கு ஒதுக்கப்பட்டது)                                    |
| இயல்புநிலை API போர்ட்        | `PROD_API_PORT=20131`                                                                                               |
| இமேஜ்                        | `omniroute:prod` (`runner-cli` இலக்கிலிருந்து உருவாக்கப்பட்டது)                                                     |
| Redis கண்டெய்னர்             | `omniroute-redis-prod` (`redis:8.6.2`, பிரத்யேக `redis-prod-data` வால்யூம்)                                         |
| தரவு வால்யூம்                | `omniroute-prod-data` (பெயரிடப்பட்டது, மறுஉருவாக்கங்களிலும் நிலைத்திருக்கும்)                                       |
| நிலைச் சோதனைகள்              | `node healthcheck.mjs` + `redis-cli ping`, Redis ஆரோக்கியத்தின் அடிப்படையில் கட்டுப்படுத்தப்படும் `depends_on` உடன் |

பயன்படுத்தும் முறை:

```bash
# உற்பத்தி ஸ்டாக்கை உருவாக்கித் தொடங்கவும்
docker compose -f docker-compose.prod.yml up -d --build

# பதிவுகளைத் தொடர்ச்சியாகக் காண்பிக்கவும்
docker compose -f docker-compose.prod.yml logs -f

# நிறுத்தி அகற்றவும் (வால்யூம்களை வைத்திருக்கவும்)
docker compose -f docker-compose.prod.yml down
```

உற்பத்தி ஸ்டாக், மேம்பாட்டு compose உடன் இணையாக இயங்குகிறது (வேறுபட்ட கண்டெய்னர் பெயர்கள், போர்ட்கள் மற்றும் வால்யூம்கள்); எனவே உற்பத்திச் சூழல் தொடர்ந்து இயங்கிக்கொண்டிருக்கும்போது, நீங்கள் உள்ளூரில் தொடர்ந்து மாற்றங்களைச் செய்யலாம்.

## Dockerfile நிலைகள்

இந்த repository பல-நிலை Dockerfile (`Dockerfile`) ஒன்றுடன் வழங்கப்படுகிறது. நான்கு நிலைகள் வெளிப்படுத்தப்பட்டுள்ளன; உங்கள் பயன்பாட்டிற்கு ஏற்ற `target`-ஐத் தேர்ந்தெடுக்கவும்.

| நிலை          | அடிப்படை image        | நோக்கம்                                                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | dependencies-ஐ நிறுவி (`npm ci --legacy-peer-deps`), `npm run build`-ஐ இயக்குகிறது (இயல்பாக Turbopack — கீழே உள்ள உருவாக்க-நேர வளங்களைப் பார்க்கவும்)                                                                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone வெளியீட்டைக் கொண்ட production runtime. **எந்த provider CLI-களும் சேர்க்கப்படவில்லை.**                                                                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` மற்றும் global CLI-களான `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw` ஆகியவற்றைச் சேர்க்கிறது. **Agentic பணிப்பாய்வுகளுக்கு இதைத் தேர்ந்தெடுக்கவும்.**                                                                                                                                     |
| `runner-web`  | `runner-base`         | Web-session provider-களான `gemini-web`, `claude-web`, `claude-turnstile` ஆகியவற்றிற்காக Playwright + Chromium browser (`--with-deps`) சேர்க்கிறது. **அந்த provider-களைப் பயன்படுத்தும்போது இதைத் தேர்ந்தெடுக்கவும்** — இது இல்லாத சாதாரண image, கோரிக்கை நேரத்தில் தோல்வியடையும் (Release Channels பிரிவின் கீழுள்ள `-web` குறிப்பைப் பார்க்கவும்). |

ஒரு குறிப்பிட்ட target-ஐ கைமுறையாக உருவாக்க:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### உருவாக்க-நேர வளங்கள்

`builder` நிலையின் வளச் செலவை மூன்று build arg-கள் கட்டுப்படுத்துகின்றன. அவை உருவாக்க நேரத்திற்கு மட்டுமே பொருந்தும் —
`OMNIROUTE_MEMORY_MB` (கீழே) என்பது தனியான runtime கட்டுப்பாடாகும்.

| Build arg                   | இயல்புநிலை | விளைவு                                                                                                         |
| --------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0`, webpack மூலம் உருவாக்குகிறது: குறைவான உச்ச memory, ஆனால் மெதுவானது. `1`, Turbopack-ஐத் தேர்வுசெய்கிறது.   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | தொடங்கப்படும் `next build`-க்கான V8 heap உச்சவரம்பு (`--max-old-space-size`).                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL`-க்கு மதிப்பளிக்கிறது; page-data சேகரிப்பிற்காக Next, `workers = N - 1` எனக் கணக்கிடுகிறது. |

பெரிய builder ஒன்றில் உயர்த்த வேண்டியதும், வரையறுக்கப்பட்ட வளங்களைக் கொண்ட build ஒன்று `✓ Compiled successfully` என்பதற்குப் **பிறகு** செயலிழக்கும்போது சந்தேகிக்க வேண்டியதும் `OMNIROUTE_BUILD_WORKERS` ஆகும். ஒவ்வொரு page-data worker-உம் தனி process ஆகும்; மூல `next build`-உம் தனி process ஆகும். நேரடி VPS மறுஉருவாக்கத்தில் (issue #7518), `NODE_OPTIONS` heap flag-ஐச் சாராமல் ஒவ்வொரு process-இன் உச்ச RSS-உம் ~4.5 GB ஆக அளவிடப்பட்டது (Turbopack, V8 heap-க்கு வெளியே native/Rust memory-இல் compile செய்கிறது). இயல்புநிலையான `2` (→ 1 worker, மொத்தம் 2 processes), publish pipeline பயன்படுத்தும் 16 GB / 4 vCPU GitHub-hosted runner-களுக்காக அளவிடப்பட்டுள்ளது. `8` (→ 7 workers) என்ற நிலையில் அந்த runner-இன் memory தீர்ந்துவிட்டது; buildkit, `ResourceExhausted: ... cannot allocate memory` என்பதுடன் அந்தப் படியைத் தோல்வியடையச் செய்தது; ஒவ்வொரு process-இன் RSS-ஐ அனுமானிப்பதற்குப் பதிலாக நேரடியாக அளவிட்டபோது, `3` (→ 2 workers) என்பதுகூட பொருந்தவில்லை. `tests/unit/docker-build-memory-budget.test.ts`, அளவிடப்பட்ட மதிப்பைக் கொண்டு கணக்கீடு செய்து, ஏதேனும் ஒரு கட்டுப்பாடு runner-இன் கொள்ளளவை மீறினால் தோல்வியடைகிறது.

Turbopack, V8 heap-க்கு **வெளியே** இருக்கும் native Rust memory-இல் compile செய்கிறது; எனவே `OMNIROUTE_BUILD_MEMORY_MB` அதைக் கட்டுப்படுத்தாது. Memory உச்சவரம்புள்ள host ஒன்றில், எந்தப் பிழை உரையும் இல்லாமல் OOM killer மூலம் build SIGKILL செய்யப்படும் — அது `Creating an optimized production build` என்பதன் நடுவே வெறுமனே நின்றுவிடும்; இதனால் memory தீர்ந்ததாகத் தெரிவதற்குப் பதிலாக செயலிழந்து நின்றதுபோல் தோன்றும். அதனால்தான் `npm run dev` / `npm run build` போலல்லாமல், `Dockerfile` இயல்பாக webpack-ஐப் பயன்படுத்துகிறது (`OMNIROUTE_USE_TURBOPACK=0`); அவற்றில் Turbopack-தான் code இயல்புநிலை: build arg-கள் இல்லாத வெறும் `docker build .` கட்டளை (Railway மற்றும் பிற one-click host-கள் இயக்குவது) memory வரம்புள்ள builder ஒன்றில் எந்தத் தகவலும் இல்லாமல் செயலிழக்கக்கூடாது. வெளியிடப்பட்ட image-கள் ஏற்கனவே `docker-publish.yml`-இல் `OMNIROUTE_USE_TURBOPACK=0` என்பதை வெளிப்படையாக வழங்குகின்றன. போதுமான RAM கொண்ட builder ஒன்றில் வேகமான build-க்காக Turbopack-ஐத் தேர்வுசெய்யவும்:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` இயக்கப்பட்டுள்ளது; எனவே `next build`, ஒரு மூல process-ஐயும் ஒரு worker process-ஐயும் இயக்குகிறது, மேலும் ஒவ்வொன்றும் `OMNIROUTE_BUILD_MEMORY_MB`-ஐத் தனித்தனியாக மதிக்கின்றன. Container உச்சவரம்பை அந்த மதிப்பின் ஒரு மடங்கிற்கு மேல் அல்லாமல், தோராயமாக இரு மடங்கிற்கு மேல் அமைக்கவும்.

இந்த tree-இல் அளவிடப்பட்டது (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container உச்சவரம்பு | முடிவு                                   |
| --------- | -------------------- | ---------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | இரண்டிலும் எந்தத் தகவலுமின்றி OOM-killed |
| webpack   | 8 GiB                | build worker SIGKILLed                   |
| webpack   | 12 GiB               | வெற்றியடைந்தது; உச்ச அளவு 11.1 GiB       |

### Runtime இயல்புநிலைகள்

`runner-base` மூலம் export செய்யப்படும் இயல்புநிலைகள்: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker-இல் memory செயல்பாடு:

- இந்த image `OMNIROUTE_MEMORY_MB=1024` என்பதை அமைத்து, அதிலிருந்து `NODE_OPTIONS=--max-old-space-size=1024` என்பதைப் பெறுகிறது.
- உண்மையான server process, standalone launcher மூலம் தொடங்கப்படுகிறது; அது `OMNIROUTE_MEMORY_MB` மதிப்பைப் படித்து, `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` என்பதைச் சேர்க்கிறது.
- மீண்டும் மீண்டும் வழங்கப்படும் `--max-old-space-size` மதிப்புகளில் கடைசி மதிப்பை Node பயன்படுத்துகிறது; எனவே `OMNIROUTE_MEMORY_MB`-ஐ அமைப்பது நடைமுறையில் பயன்படுத்தப்படும் Docker heap வரம்பைக் கட்டுப்படுத்துகிறது.
- image எப்போதும் இதை அமைப்பதால், launcher-ன் RAM அடிப்படையில் அளவீடு செய்யப்பட்ட fallback Docker-இல் ஒருபோதும் பயன்படுத்தப்படாது. workload-க்கு ஏற்றவாறு இதை வெளிப்படையாக அதிகரிக்கவும் (கீழேயுள்ள அட்டவணையைப் பார்க்கவும்). coding-agent `/v1/responses`-க்கு `2048` இன்னும் போதுமானதாக இல்லை.

### coding agent-களுக்கான runtime RAM

1 GiB Docker இயல்புநிலை என்பது dashboard/இலகுவான chat-க்கான குறைந்தபட்ச அளவே தவிர, production அளவு அல்ல. நீளமான `POST /v1/responses` body-கள் (நூற்றுக்கணக்கான messages, பத்துக்கணக்கான tools) compression-இன் போது பல in-memory graph-களைத் தக்கவைத்துக் கொள்கின்றன. ஒரே நேரத்தில் செயல்பட்ட சுமார் 3 MiB / சுமார் 750k-token அளவுள்ள இரண்டு request-கள், **12 GiB** old-space-இல் V8-ஐ நிறுத்தியுள்ளன (`FATAL ERROR: Reached heap limit`); மேலும் 16 GiB cgroup OOM-ஐயும் எட்டியுள்ளன. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)-ஐப் பார்க்கவும்.

**cgroup `--memory` அளவை heap-ஐ விட அதிகமாக அமைக்கவும்** — native buffer-கள், SQLite மற்றும் compression இடைநிலைத் தரவுகள் V8-க்கு வெளியே இருக்கும்.

| Workload                                                       | `OMNIROUTE_MEMORY_MB`          | Container / cgroup              | குறிப்புகள்                                                                                                                                            |
| -------------------------------------------------------------- | ------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dashboard, ஓர் இலகுவான chat                                    | `1024` (image இயல்புநிலை)      | ≥2 GiB                          |                                                                                                                                                        |
| ஒரு coding agent (Claude/Codex/Grok)                           | `8192`                         | ≥10 GiB                         | வழக்கமான single-session `/v1/responses`                                                                                                                |
| ஒரே நேரத்தில் இரண்டு நீளமான `/v1/responses`                    | `10240`–`12288`                | ≥12–16 GiB                      | சுமார் 12 GiB heap-இல் அளவிடப்பட்ட V8 நிறுத்தம்                                                                                                        |
| ஒரே நேரத்தில் மூன்று அல்லது அதற்கு மேற்பட்ட நீளமான context-கள் | ஒரே process-இல் செய்ய வேண்டாம் | வரிசைப்படுத்தவும் / கூடுதல் RAM | இயல்புநிலை heavyweight admission-இல் ஒரே நேரத்தில் 1 request மட்டுமே செயல்படும்; RAM-ஐ அதிகரிக்காமல் இதை உயர்த்துவது மீண்டும் நிறுத்தத்தை ஏற்படுத்தும் |

bare metal-இல், `OMNIROUTE_MEMORY_MB` **அமைக்கப்படாமல்** இருக்கும்போது `omniroute serve`, RAM-இன் சுமார் 35%-க்கு அளவீடு செய்கிறது (`[512, 4096]` வரம்புக்குள் கட்டுப்படுத்தப்படுகிறது). Docker எப்போதும் `1024` என்பதை அமைப்பதால், official image-இல் அந்த அளவீடு ஒருபோதும் இயங்காது.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## முக்கியமான சூழல் மாறிகள்

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-இல் ஆவணப்படுத்தப்பட்டுள்ள இயல்புநிலைகளுக்கு அப்பால், Docker-இன் கீழ் இயக்கும்போது பின்வரும் மாறிகள் மிகவும் முக்கியமானவை:

| மாறி                          | நோக்கம்                                                                                                                                                                                                                                                                                | இயல்புநிலை                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket bridge-க்கான பகிரப்பட்ட ரகசியம். **உற்பத்திச் சூழலில் கட்டாயம்** — வலுவான சீரற்ற சரமாக அமைக்கவும்.                                                                                                                                                                           | அமைக்கப்படவில்லை (வழங்கப்பட வேண்டும்) |
| `REDIS_URL`                   | rate limiter / cache பின்தளத்திற்கான இணைப்புச் சரம்                                                                                                                                                                                                                                    | `redis://redis:6379`                  |
| `REDIS_PORT`                  | தொகுப்பில் சேர்க்கப்பட்ட Redis container-க்கான host-பக்க port                                                                                                                                                                                                                          | `6379`                                |
| `REDIS_BIND_HOST`             | தொகுப்பில் சேர்க்கப்பட்ட Redis port வெளியிடப்படும் host interface (நீங்கள் AUTH-ஐச் சேர்க்காதவரை loopback)                                                                                                                                                                             | `127.0.0.1`                           |
| `AUTO_UPDATE_HOST_REPO_DIR`   | தானாகப் புதுப்பிக்கும் பணிப்பாய்வுகளுக்காக `cli` profile-இல் `/workspace/omniroute` ஆக mount செய்யப்படும் host path                                                                                                                                                                    | `.` (தற்போதைய directory)              |
| `OMNIROUTE_MEMORY_MB`         | Docker standalone server-க்கான இயக்கநேர Node heap உச்சவரம்பு; மேலே உள்ள image இயல்புநிலையை இது மீறியமைக்கும். Coding agents: `8192`+ ([இயக்கநேர RAM](#runtime-ram-for-coding-agents)-ஐப் பார்க்கவும்).                                                                                 | `1024`                                |
| `DASHBOARD_PORT` / `API_PORT` | dashboard (20128) மற்றும் API (20129) ஆகியவற்றிற்கு வெளிப்படுத்தப்படும் ports-ஐ மாற்றியமைக்கிறது                                                                                                                                                                                       | `20128` / `20129`                     |
| `APP_BIND_HOST`               | dashboard/API/live-WS ports-ஐ docker-compose வெளியிடும் host interface. `REQUIRE_API_KEY=false` (இயல்புநிலை) என இருக்கும்போது, `0.0.0.0` அநாமதேய `/v1` proxy-ஐ LAN-க்கு வெளிப்படுத்தும் — `REQUIRE_API_KEY=true` அல்லது முன்னால் reverse proxy இருந்தால் மட்டுமே அணுகலை விரிவாக்கவும். | `127.0.0.1`                           |
| `CLIPROXY_BIND_HOST`          | `cliproxyapi` sidecar-ஐ docker-compose வெளியிடும் host interface — அதன் data volume provider நற்சான்றுகளை வைத்திருக்கும்.                                                                                                                                                              | `127.0.0.1`                           |
| `OMNIROUTE_PLUGINS_DIR`       | இயக்கநேர plugin scanner படித்துப் plugins-ஐ நிறுவும் directory. plugins bind-mount செய்யப்பட்டிருந்தால் இதை அமைக்கவும்: இயல்புநிலை `HOME`-ஐப் பின்பற்றும்; ஆனால் ஓர் image அதை export செய்ய வேண்டிய அவசியமில்லை.                                                                       | `~/.omniroute/plugins`                |
| `OMNIROUTE_BASE_PATH`         | app ஒரு reverse proxy-க்குப் பின்னால் வெளியிடப்படும்போது பயன்படுத்தப்படும் URL துணைப் பாதை (எ.கா. `/omniroute`)                                                                                                                                                                        | _(காலி = root)_                       |
| `NEXT_PUBLIC_BASE_URL`        | துணைப் பாதையை உள்ளடக்கிய பொதுவான browser origin (எ.கா. `https://host/omniroute`)                                                                                                                                                                                                       | அமைக்கப்படவில்லை                      |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`-க்கான host-பக்க dashboard port                                                                                                                                                                                                                               | `20130`                               |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` sidecar-க்கான host-பக்க port                                                                                                                                                                                                                                             | `8317`                                |

## துணைப்பாதையில் ரிவர்ஸ் ப்ராக்ஸி (Traefik / nginx)

Next.js `basePath` தனித்தியங்கும் தொகுப்பில் தொகுக்கப்படுகிறது. OmniRoute, செயலியின் மூலக் கோப்பகத்தில் உள்ள ஒரு சென்டினல் கோப்பில் உட்பொதிக்கப்பட்ட மதிப்பைப் பதிவுசெய்து (`npm run build`-இன் போது எழுதப்படுகிறது; `scripts/docker/ensure-docker-base-path.mjs` மூலம் படிக்கப்படுகிறது), கண்டெய்னர் தொடங்கும்போது அதை `OMNIROUTE_BASE_PATH` உடன் ஒப்பிடுகிறது. அவை வேறுபட்டு, இமேஜ் டொமைன் மூலத்திற்காக உருவாக்கப்பட்டிருந்தால், `node dev/run-standalone.mjs` இயங்குவதற்கு முன் entrypoint தனித்தியங்கும் manifests, உட்பொதிக்கப்பட்ட `basePath`/`assetPrefix` literals (Next 16, SSR asset URL-களை `assetPrefix`-இலிருந்து மட்டுமே உருவாக்குகிறது — patcher துணைப்பாதையை அதிலும் பிரதிபலிக்கிறது), உட்பொதிக்கப்பட்ட `/_next/static` asset URL-கள் (client-reference manifests, media imports, முன்-ரெண்டர் செய்யப்பட்ட பிழைப் பக்கங்கள்) மற்றும் client `process.env` shim ஆகியவற்றை மீண்டும் எழுதுகிறது.

### Compose உருவாக்கம் (பரிந்துரைக்கப்படுகிறது)

இரண்டு மாறிகளையும் `.env`-இல் அமைத்து, பின்னர் இமேஜும் இயக்கநேரமும் ஒத்திருக்குமாறு மீண்டும் உருவாக்கவும்:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`-ஐ Docker build-arg ஆகவும் இயக்கநேரச் சூழல் மாறியாகவும் அனுப்புகிறது.

### முன்கூட்டியே உருவாக்கப்பட்ட root இமேஜ் + இயக்கநேரத் துணைப்பாதை

வெளியிடப்பட்ட `diegosouzapw/omniroute:*` இமேஜ்கள் டொமைன் மூலத்திற்காக உருவாக்கப்பட்டவை. இருப்பினும் இயக்கநேரத்தில் `OMNIROUTE_BASE_PATH`-ஐ அமைக்கலாம்; தொடக்கத்தின்போது கண்டெய்னர் தொகுப்பை ஒருமுறை திருத்தும். அதனுடன் பொருந்தும் பொது origin-ஐ அமைக்கவும்:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ரிவர்ஸ் ப்ராக்ஸி **முழு** வெளிப்புறப் பாதையையும் அனுப்புமாறு உள்ளமைக்கவும் (முன்னொட்டை நீக்க வேண்டாம்). Traefik, `StripPrefix` இல்லாமல் `PathPrefix(`/omniroute`)`-ஐ கண்டெய்னருக்கு வழிமாற்ற வேண்டும்; இதனால் Next.js `/omniroute/...`-ஐப் பெற்று, `/omniroute/_next/...`-இலிருந்து assets-ஐ வழங்கும்.

Docker healthcheck, செயலில் உள்ள `OMNIROUTE_BASE_PATH` முன்னொட்டுடன் கூடிய இலகுரக `/healthz` lifecycle endpoint-ஐச் சோதிக்கிறது. மனிதர்/dashboard கண்டறிதல்களுக்காக `/api/monitoring/health` தொடர்ந்து கிடைக்கும்; கண்டெய்னர் HEALTHCHECK-ஐ மீண்டும் அதற்குச் சுட்டிக்காட்ட (எடுத்துக்காட்டாக, ஆழமான ஆரோக்கியச் சரிபார்ப்பை அமல்படுத்த), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` என அமைக்கவும். அந்தப் பாதை ஒரு **ஆழமான** சரிபார்ப்பு (DB + கண்காணிப்புச் சுருக்கம்) — நீங்கள் மீண்டும் அதைத் தேர்ந்தெடுத்தால், Docker-இன் அரிதாக இயங்கும் `HEALTHCHECK`-க்கு ஏற்றது; ஆனால் Kubernetes `livenessProbe` இடைவெளிகளுக்கு **ஏற்றதல்ல**.

ஆர்கெஸ்ட்ரேட்டர்களுக்கு (Kubernetes, Nomad போன்றவை):

| சோதனை            | விரும்பத்தக்கது                                                             | தவிர்க்க வேண்டியது                                                       |
| ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| உயிர்ப்புநிலை    | HTTP `GET /livez`, அல்லது முதன்மை port-இல் TCP (`PORT`, இயல்புநிலை `20128`) | உயிர்ப்புநிலைச் சோதனையாக `/api/monitoring/health`                        |
| தயார்நிலை        | HTTP `GET /healthz`                                                         | event loop பரபரப்பாக இருப்பதை செயலிழப்பாகக் கருதும் குறுகிய காலவரம்புகள் |
| ஆழமான / blackbox | `/api/monitoring/health`                                                    | —                                                                        |

`/healthz`, செயல்முறை lifecycle-ஐ (`ok` / `starting` / `stopping`) தெரிவிக்கிறது. `/livez` என்பது செயல்முறை இயங்குகிறதா என்பதை மட்டும் காட்டும் (handler இயங்கக்கூடிய போதெல்லாம் 200; இது தயார்நிலைக்காகக் காத்திருக்காது). இரண்டுமே கோரிக்கைகளைக் கையாளும் அதே Node event loop-இல்தான் இயங்குகின்றன; எனவே CPU-ஐ அதிகம் பயன்படுத்தும் catalog அல்லது compression பணிகள் அவற்றைத் தாமதப்படுத்தலாம் — பரபரப்பு ≠ செயலிழப்பு. HTTP சோதனைகள் காலாவதியானால் TCP உயிர்ப்புநிலைச் சோதனையை விரும்பவும். முழுமையான சோதனை வழிகாட்டுதல்:
[கண்காணிப்பு வழிகாட்டி — Kubernetes சோதனைப் பரிந்துரைகள்](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy உடனான Docker Compose (HTTPS Auto-TLS)

Caddy-யின் தானியங்கி SSL வழங்கலைப் பயன்படுத்தி OmniRoute-ஐப் பாதுகாப்பாக வெளிப்படுத்தலாம். உங்கள் டொமைனின் DNS A பதிவு, உங்கள் சேவையகத்தின் IP-ஐச் சுட்டிக்காட்டுவதை உறுதிசெய்யவும்.

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
      # OAuth callback-கள், dashboard இணைப்புகள் மற்றும் உருவாக்கப்படும் பொது URL-களுக்கான உலாவி எதிர்கொள்ளும் origin.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # திட்டமிடப்பட்ட job-கள் / self-fetch-களுக்கான உள் server-to-server URL.
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

Upstream container-க்கான நிலையான forwarding header-களை Caddy அமைக்கிறது. OAuth callback-கள் மற்றும் உருவாக்கப்படும் பொது இணைப்புகளுக்கான அதிகாரப்பூர்வ பொது origin-ஆக
`NEXT_PUBLIC_BASE_URL`-ஐ OmniRoute பயன்படுத்துகிறது; அங்கீகரிக்கப்பட்ட dashboard write செயல்பாடுகள் same-origin கோரிக்கைகளுடன் session-bound CSRF
பாதுகாப்பைப் பயன்படுத்துகின்றன. வெளிப்படையான configuration-க்குப் பதிலாக நம்பகமான forwarded header-களிலிருந்து OmniRoute பொது origin-ஐப் பெற வேண்டுமென்று நீங்கள் திட்டமிட்டு விரும்பும் மேம்பட்ட deployment-களுக்கு மட்டுமே
`OMNIROUTE_TRUST_PROXY`-ஐ இயக்கவும்.

## Cloudflare Quick Tunnel

Docker deployment-களுக்கான dashboard ஆதரவில், `Dashboard → Endpoints` என்பதில் ஒரே கிளிக்கில் இயக்கக்கூடிய **Cloudflare Quick Tunnel** அடங்கும். முதன்முறையாக இயக்கும்போது, தேவைப்பட்டால் மட்டுமே `cloudflared` பதிவிறக்கப்பட்டு, உங்கள் தற்போதைய `/v1` endpoint-க்கு ஒரு தற்காலிக tunnel தொடங்கப்பட்டு, உருவாக்கப்பட்ட `https://*.trycloudflare.com/v1` URL உங்கள் வழக்கமான பொது URL-க்கு நேரடியாகக் கீழே காட்டப்படும்.

Endpoint tunnel panel-களை (Cloudflare, Tailscale, ngrok), செயலில் உள்ள tunnel நிலையை மாற்றாமல் `Settings → Appearance` என்பதிலிருந்து காட்டவோ மறைக்கவோ முடியும்.

### Tunnel குறிப்புகள்

- Quick Tunnel URL-கள் தற்காலிகமானவை; ஒவ்வொரு மறுதொடக்கத்திற்குப் பிறகும் அவை மாறும்.
- OmniRoute அல்லது container மறுதொடக்கத்திற்குப் பிறகு Quick Tunnel-கள் தானாக மீட்டமைக்கப்படாது. தேவைப்படும்போது dashboard-இலிருந்து அவற்றை மீண்டும் இயக்கவும்.
- நிர்வகிக்கப்பட்ட installation தற்போது Linux, macOS மற்றும் Windows ஆகியவற்றில் `x64` / `arm64`-ஐ ஆதரிக்கிறது.
- கட்டுப்பாடுகள் உள்ள container சூழல்களில் அதிகப்படியான QUIC UDP buffer எச்சரிக்கைகளைத் தவிர்ப்பதற்காக, நிர்வகிக்கப்பட்ட Quick Tunnel-கள் இயல்பாக HTTP/2 transport-ஐப் பயன்படுத்துகின்றன. வேறொரு transport தேவைப்பட்டால் `CLOUDFLARED_PROTOCOL=quic` அல்லது `auto` என அமைக்கவும்.
- Docker image-கள் system CA root-களை உள்ளடக்கி, அவற்றை நிர்வகிக்கப்பட்ட `cloudflared`-க்கு அனுப்புகின்றன; tunnel container-க்குள் bootstrap ஆகும்போது ஏற்படும் TLS trust தோல்விகளை இது தவிர்க்கிறது.
- புதிய binary-ஐப் பதிவிறக்குவதற்குப் பதிலாக ஏற்கனவே உள்ள binary-ஐ OmniRoute பயன்படுத்த வேண்டுமெனில், `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` என அமைக்கவும்.

## Image Tag-கள்

| Image                    | Tag      | அளவு   | விளக்கம்                                                       |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | மிக உயர்ந்த **வெளியிடப்பட்ட** நிலையான SemVer (git `main` அல்ல) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-க்காக இந்த வகை tag-ஐ நிலைநிறுத்தவும்                    |

பல-platform manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). பொருந்தக்கூடிய architecture-ஐ Docker தானாகத் தேர்ந்தெடுக்கும்; ARM host-களில் AMD64 emulation-ஐக் கட்டாயப்படுத்த வேண்டுமெனில் `--platform linux/amd64` என்பதை வழங்கவும்.

### Release Channel-கள்

நிலையான release-கள், செயலில் உள்ள release branch சோதனை மற்றும் development build-களுக்காக OmniRoute தனித்தனி Docker channel-களை வெளியிடுகிறது.

| Channel                         | மூலம்                                        | மாற்றத்தன்மை                     | பரிந்துரைக்கப்படும் பயன்பாடு                                                                                                              |
| ------------------------------- | -------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | கையொப்பமிடப்பட்ட/version செய்யப்பட்ட release | மாற்ற முடியாதது                  | துல்லியமான release-ஐ நிலைநிறுத்தும் production deployment-கள்                                                                             |
| `:latest` / `:latest-web`       | மிக உயர்ந்த **வெளியிடப்பட்ட** நிலையான SemVer | மாற்றக்கூடிய நிலையான pointer     | SemVer publish job-க்குப் **பிறகு** நிலையான release-களைப் பின்பற்றும் — `main` அல்லது வெளியிடப்படாத `release/v*` commit-களைப் பின்தொடராது |
| `:next` / `:next-web`           | தற்போதைய இயல்புநிலை `release/v*` branch      | மாற்றக்கூடிய pre-release pointer | செயலில் உள்ள release branch-இல் சேர்க்கப்பட்டிருந்தாலும் இன்னும் நிலையான release-இல் இடம்பெறாத திருத்தங்களைச் சோதித்தல்                   |
| `:main` / `:main-web`           | `main` branch                                | மாற்றக்கூடிய development pointer | Development மற்றும் integration சோதனைக்கு மட்டும்                                                                                         |

#### Web-session provider-கள்: `-web` image-கள்

மேலே உள்ள ஒவ்வொரு channel-க்கும் அதற்கான `-web` tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) உள்ளது; இது `runner-web` stage-இலிருந்து build செய்யப்படுகிறது — அதே image-உடன் Playwright மற்றும் Chromium browser-ம் சேர்க்கப்பட்டிருக்கும். சாதாரண image Chromium **இல்லாமல்** வழங்கப்படுகிறது; `gemini-web`, `claude-web` மற்றும் `claude-turnstile` ஆகியவற்றுக்கு அது தேவை.

தோல்வி startup நேரத்தில் ஏற்படாமல் பின்னுக்குத் தள்ளப்படுகிறது: அந்த provider-கள் தங்கள் model-களைப் பட்டியலிட்டு dashboard-இல் இணைக்கப்பட்டதாகக் காட்டப்படும்; முதல் கோரிக்கை வரும்போது மட்டுமே பின்வரும் பிழையுடன் தோல்வியடையும்:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

அந்த provider-களைப் பயன்படுத்தினால், நீங்கள் ஏற்கனவே பயன்படுத்தும் channel-இன் `-web` tag-ஐ pull செய்யவும் — வேறு எதுவும் மாறாது. npm/CLI installation-இல் (Docker image இல்லாமல்), இதற்கு இணையான விடுபட்ட பகுதி browser binary ஆகும்: host-இல் `npx playwright install chromium` என்பதை இயக்கவும்.

#### Pre-release channel-ஐப் பயன்படுத்துதல்

தற்போதைய இயல்புநிலை `release/v*` கிளைக்கு ஒவ்வொரு push நிகழும்போதும் `next` சேனல் மீண்டும் உருவாக்கப்பட்டு, AMD64 மற்றும் ARM64 ஆகிய இரண்டிற்கும் வெளியிடப்படுகிறது. பழைய பராமரிப்புக் கிளைகளால் அதை மேலெழுத முடியாது. அடுத்த நிலையான tag உருவாக்கப்படுவதற்கு முன், செயலில் உள்ள release கிளையில் merge செய்யப்பட்ட திருத்தங்களைக் கொண்ட pull செய்யக்கூடிய image-ஐ இந்தச் சேனல் வழங்குகிறது.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-க்கு, தேர்ந்தெடுக்கப்பட்ட profile பயன்படுத்தும் image tag-ஐ override செய்து, பின்னர் service-ஐ pull செய்து மீண்டும் உருவாக்கவும்:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### பாதுகாப்பு மற்றும் rollback

`next` என்பது நிலையாக இல்லாமல் மாறிக்கொண்டிருக்கும் ஒரு pre-release சேனல். செயலில் உள்ள release கிளைக்கு push செய்யப்படும் ஒவ்வொரு முறையும் இது மாறக்கூடும்; மேலும் இது **production பயன்பாட்டிற்காக ஆதரிக்கப்படுவதில்லை**. ஒரு குறிப்பிட்ட build-ஐ மதிப்பீடு செய்யும்போது image digest-ஐ pin செய்யவும்:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

சோதிப்பதற்கு முன், OmniRoute data volume அல்லது bind-mounted data directory-ஐ backup எடுக்கவும். rollback செய்ய, முன்பு பயன்படுத்தப்பட்ட நிலையான version அல்லது digest-ஐ மீட்டமைத்து container-ஐ மீண்டும் உருவாக்கவும்:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

ஒரு release-branch build ஒருபோதும் `latest`-ஐ நகர்த்த முடியாது; தகுதியான ஒரு நிலையான semantic version மட்டுமே stable pointer-ஐ முன்னேற்ற முடியும். `next` images, release image inspection மற்றும் CRITICAL பாதிப்புகளுக்கான தடுப்பு gate ஆகியவற்றைத் தொடர்ந்து வைத்திருக்கும்.

**git-ஐப் பொறுத்தவரை `latest` என்பது புதுப்பித்த நிலையைக் குறித்த உத்தரவாதம் அல்ல.** `main` அல்லது செயலில் உள்ள `release/v*` கிளையில் merge செய்யப்பட்ட திருத்தங்கள், ஒரு நிலையான SemVer image வெளியிடப்பட்டு publish job `:latest`-ஐ முன்னேற்றும் வரை **`:latest`-இல் இடம்பெறாது** (அந்த SemVer-இன் அதே digest). GitHub ஏற்கனவே திருத்தத்தைக் காட்டினாலும் `latest` புதுப்பிக்கப்படாமல் இருப்பதாகத் தோன்றினால், release கிளையைச் சோதிக்க `:next`-ஐ pull செய்யவும் அல்லது SemVer tag-க்காகக் காத்திருக்கவும்.

| நீங்கள் விரும்புவது                                                                                        | பயன்படுத்த வேண்டியது                             |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| மாறக்கூடாத GitOps / production                                                                             | `:X.Y.Z`-ஐ (அல்லது image digest-ஐ) pin செய்யவும் |
| வெளியிடப்பட்ட நிலையான பதிப்புகளைப் பின்தொடர்ந்து, ஒவ்வொரு release-இலும் மீண்டும் உருவாக்கப்படுவதை ஏற்கவும் | `:latest`                                        |
| வெளியிடப்படாத `release/v*` commit-களைச் சோதிக்கவும்                                                        | `:next` (production-க்கு அல்ல)                   |
| `main`-ஐச் சோதிக்கவும்                                                                                     | `:main` (production-க்கு அல்ல)                   |

## Docker-இல் Dashboard புதுப்பிப்புகள்

வெளியிடப்பட்ட image-ஐப் பயன்படுத்தும் container தன்னையே மாற்றிக்கொள்ள முடியாது. OmniRoute தான் ஒரு
container-க்குள் இயங்குவதைக் கண்டறியும்போது (`.git` checkout இல்லை, npm நிறுவல் இல்லை), முகப்பு dashboard-இன் புதுப்பிப்பு banner, npm/git வழிமுறைகளுக்குப் பதிலாக இயக்க வேண்டிய host command-ஐ நகலெடுக்கும் பொத்தானுடன் காட்டும்:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

சேவைப் பெயர் `AUTO_UPDATE_SERVICE`-இலிருந்து பெறப்படுகிறது (இயல்புநிலை `omniroute`, இது
`docker-compose.selfhost.yml`-இல் உள்ள சேவை). `pull` ஆனது மாறக்கூடிய tag-ஐ (`latest`, `next`) மட்டுமே நகர்த்தும்; நிலையாகப் பொருத்தப்பட்ட
`:X.Y.Z` tag பயன்படுத்தப்பட்டால், முதலில் அந்த tag-ஐத் திருத்தவும்.

### Host trigger file மூலம் ஒரே கிளிக்கில் புதுப்பித்தல்

`/var/run/docker.sock`-ஐ mount செய்யாமல் **Update Now** தொடர்ந்து செயல்படுவதற்கு (அது container-க்கு
host-இல் root அணுகலை வழங்கும் — மேலே உள்ள `cli` profile எச்சரிக்கையைப் பார்க்கவும்), OmniRoute சேவையில் `DOCKER_UPDATE_TRIGGER_FILE`-ஐ அமைத்து, host-இல் ஒரு watcher-ஐ இயக்கவும்:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

பாதை `DATA_DIR`-க்குள் இருக்க வேண்டும் (சார்புப் பாதை மதிப்புகள் அதனுடன் ஒப்பிட்டு தீர்மானிக்கப்படும்); வேறு எதுவும்
நிராகரிக்கப்படும். அதன் பின்னர் **Update Now**, `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` என்பதை அந்தக்
கோப்பில் எழுதி, `202` எனப் பதிலளிக்கும்; புதிய பதிப்பு செயல்பாட்டுக்கு வந்து மீண்டும் ஏற்றப்படும் வரை dashboard `/api/system/version`-ஐத் தொடர்ந்து வினவும். இந்த முறையில் OmniRoute ஒருபோதும் shell அல்லது Docker command-ஐ இயக்காது. மற்ற ஒவ்வொரு புதுப்பிப்பு
செயலையும் போலவே, loopback/LAN client-களிடமிருந்து வரும் கோரிக்கைகள் மட்டுமே ஏற்கப்படும்.

Bind-mount செய்யப்பட்ட data directory, host கண்காணிப்பதற்கு நிலையான பாதையை வழங்குகிறது. மாதிரி `systemd` unit-கள்
(`/srv/omniroute`-ஐ உங்கள் compose file மற்றும் `data/` உள்ள directory-க்கு ஏற்றவாறு மாற்றவும்):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute dashboard புதுப்பிப்புக் கோரிக்கைகளைக் கண்காணி

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute container-ஐ pull செய்து மறுபடியும் உருவாக்கு

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

தோல்வியடைந்த இயக்கம் மீண்டும் மீண்டும் நிகழாமல் இருக்க, pull செய்வதற்கு முன் சேவை கோரிக்கையை அகற்றும்.
`DOCKER_UPDATE_TRIGGER_FILE` இல்லையெனில், dashboard கைமுறை command செயல்முறையையே தொடரும்.

## கிடைக்கும் தன்மை: இயல்புநிலை SQLite ஒற்றைப் பிரதியைக் கொண்டது

வழக்கமான Docker / Kubernetes OmniRoute என்பது **ஒரு Node process + ஒரு SQLite writer** ஆகும். இந்தக் கட்டமைப்பில் உயர் கிடைக்கும் தன்மை **ஆதரிக்கப்படவில்லை**.

| கட்டுப்பாடு                                    | விளைவு                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ஒற்றை writer                                   | ஒரே SQLite file-ஐ எதிர்த்து பல replica-களை **இயக்க வேண்டாம்**. அது DB-ஐச் சிதைக்கும்.                                                                                                                                                                                                                                                                                                   |
| மறுஉருவாக்கம் / மறுதொடக்கம் / HEALTHCHECK kill | செயலிலுள்ள SSE, dashboard session-கள் மற்றும் memory-இல் உள்ள state ஆகியவற்றின் **முழுமையான செயலிழப்பு**. இணைக்கப்பட்ட ஒவ்வொரு client-உம் துண்டிக்கப்படும். endpoint இல்லாத இடைவேளையில் வரும் புதிய கோரிக்கைகள், OmniRoute JSON-க்குப் பதிலாக reverse-proxy **`502 Bad Gateway: Unknown error`**-ஐப் பெறும் — client-களால் இதனை provider தோல்வியிலிருந்து வேறுபடுத்த முடியாது (#11015). |
| `/healthz` பயன்படுத்தும் அதே event loop        | அதிகப் பணிச்சுமையுள்ள catalog அல்லது compression tick probe-களைத் தாமதப்படுத்தலாம்; குறுகிய timeout பின்னர் **ஒரே** replica-வை மறுதொடக்கம் செய்யும்.                                                                                                                                                                                                                                    |

**Probe அணி** ([Kubernetes probe பரிந்துரைகள்](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)-ஐயும் பார்க்கவும்):

| Probe                   | இலக்கு                                                           | பயன்படுத்த வேண்டாம்                                                       |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Liveness                | `PORT`-இல் TCP (இயல்புநிலை `20128`), அல்லது soft HTTP `/healthz` | `/api/monitoring/health`                                                  |
| Readiness               | HTTP `GET /healthz`                                              | event loop பரபரப்பாக இருப்பதைச் செயலிழப்பாகக் கருதும் குறுகிய timeout-கள் |
| ஆழமான சோதனை / மனிதர்கள் | `/api/monitoring/health`                                         | தானியக்க kubelet liveness                                                 |

**மேம்படுத்தல்கள்:** ஒவ்வொரு session-உம் துண்டிக்கப்படும் என எதிர்பார்க்கவும். முடிந்தால் client-களை drain செய்யவும்; இயல்புநிலை SQLite-இல் rolling update இல்லை. Compose `restart: unless-stopped` மற்றும் Docker `HEALTHCHECK` ஆகியவையும் container Unhealthy ஆகும்போது ஒரே process-ஐ மாற்றிவிடும் — அதே பாதிப்பு வீச்சுடன்.

**ஒற்றை replica**-வுக்கான Kubernetes துணுக்கு (Recreate அவசியம்; ஒரே SQLite file-க்கு எதிராக `replicas` எண்ணிக்கையை அதிகரிக்க வேண்டாம்):

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

`preStop`-இன் sleep, SIGTERM-க்கு முன் kube-ஐ Service endpoint-களை அகற்ற அனுமதிப்பதால், செயலிழந்து கொண்டிருக்கும் process-ஐ **புதிய** traffic சென்றடைவது நிறுத்தப்படுகிறது. செயல்பாட்டிலுள்ள `/v1/responses` SSE, heavyweight admission lease-கள் (#11015) மூலம் `SHUTDOWN_TIMEOUT_MS` வரை (இயல்புநிலை 30s) முழுமையாக முடிக்க அனுமதிக்கப்படுகிறது. இன்னமும் process-ஐ சென்றடையும் புதிய request-களுக்கு `503` + `Retry-After: 5` கிடைக்கும். மாற்று instance Ready ஆகும் வரை நீடிக்கும் Recreate empty-endpoint இடைவெளி முழுமையான சேவைத் தடையாகவே இருக்கும் — இது SQLite topology-யின் இயல்பு; probe misconfiguration அல்ல.

வெளிப்புற Postgres / multi-writer HA என்பது ஆவணப்படுத்தப்பட்ட இயல்புநிலை வழிமுறை **அல்ல**. உங்களுக்கு HA தேவைப்பட்டால், ஒரே replica-வைப் பயன்படுத்துங்கள் அல்லது project தனியாகச் சோதித்து ஆவணப்படுத்திய topology-யை இயக்குங்கள். Postgres/MySQL தொடர்பான பணி [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-இல் உள்ளது. அது வெளியிடப்படும் வரை, **பெரிய** `/v1/responses` capacity-ஐப் பெருக்குவதற்கான ஒரே ஆதரிக்கப்படும் வழி N தனித்தனி process-கள் (அடுத்த பகுதி) மட்டுமே; ஒரே volume-இல் `replicas > 1` அல்ல.

## Scale-out: N சுயாதீனச் செயல்முறைகள்

ஒரு Node செயல்முறை என்பது **ஒரு V8 heap** ஆகும். ஒன்றுடன் ஒன்று மேற்பொருந்தும் ~3 MiB / ~750k-token கொண்ட இரண்டு coding-agent `POST /v1/responses` கோரிக்கைகள் (RTK + Caveman), ~12 Gi அளவில் அந்த heap-ஐ நிறுத்திவிடுகின்றன (`FATAL ERROR: Reached heap limit`), மேலும் 16 Gi cgroup-இல் OOM ஏற்படுத்தக்கூடும். [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)-ஐப் பார்க்கவும். அந்த அளவீடு ஒரு **நினைவக-ஒதுக்கீட்டு** எச்சரிக்கையே தவிர, ஒரே நேரத்தில் இயங்கும் நீண்ட `/v1/responses` கோரிக்கைகளுக்கான தயாரிப்பின் கட்டாய அதிகபட்ச வரம்பு இரண்டு என்பதல்ல. கனரக chat அனுமதியானது, அதே V8/cgroup உச்சவரம்பிலிருந்து அளவிடப்பட்டு தானாகக் கணிக்கப்படும் ingest byte ஒதுக்கீட்டால் (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) கட்டுப்படுத்தப்படுகிறது — ஏற்கெனவே அளவிடப்பட்ட ஒரு செயல்முறையில் இதை உயர்த்தி override செய்வது (அல்லது பழைய `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` கோரிக்கை-எண்ணிக்கை வரம்பை அமைப்பது) மீண்டும் செயல்முறை நிறுத்தத்தை ஏற்படுத்தும். சிறிய chats, `/healthz`, `/v1/models`, மற்றும் MCP ஆகியவை அந்த வரம்பிற்குள் **இல்லை**.

### ஒரு செயல்முறை: இரண்டுக்கும் அதிகமான நீண்ட `/v1/responses`

ஒரு **ஆரோக்கியமான** செயல்முறை (heap, `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-க்குக் கீழே; இயல்புநிலை `0.75`) செயல்முறை முழுவதற்குமான inflight-byte ஒதுக்கீட்டில் (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) இன்னும் இடமிருந்தால், ஒரே நேரத்தில் இரண்டுக்கும் அதிகமான நீண்ட `POST /v1/responses` கோரிக்கைகளை இயக்க **முடியும்**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` அளவில் அல்லது அதற்கு மேல் உள்ள bodies (இயல்புநிலை 256 KiB), கட்டமைப்பு-கனமான கோரிக்கைகளைப் போலவே அதே கனரக lease-ஐப் பெறுவதோடு, அதே [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` தப்புவழியையும் (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) பயன்படுத்துகின்றன. ஒரே நேரத்தில் பத்துக்கணக்கான நீண்ட SSE clients-ஐ இயக்குவது (இயக்குநர்களுக்கு அடிக்கடி 40–50 தேவைப்படும்) ஒரு **நினைவக-ஒதுக்கீட்டு** கேள்வியாகும் — heap + முதன்மை/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ஆகியவற்றைத் தகுந்தவாறு அளவிட வேண்டும் — இது தயாரிப்பின் கட்டாய “அதிகபட்சம் 2” வரம்பல்ல. அழுத்தத்திற்குள்ளான heap, மீண்டும் முயற்சிக்கக்கூடிய `503` பதில்களுடன் கோரிக்கைகளைத் தொடர்ந்து கைவிடும்; இதனால் #7849 மீண்டும் ஏற்படாது.

heap-களைப் **பெருக்க** (சுயாதீனமான V8 old-spaces) **தற்போது**:

| செய்யவும்                                                                                                                                                                                  | செய்யக்கூடாது                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| **N containers/pods**-ஐ இயக்கவும்; ஒவ்வொன்றுக்கும் அதன் **சொந்த** `DATA_DIR` / volume இருக்க வேண்டும்                                                                                      | ஒரே SQLite file-க்கு எதிராக `replicas > 1` அமைக்க வேண்டாம்                           |
| heap / inflight-byte ஒதுக்கீட்டிலிருந்து கனரக in-flight + ஆரோக்கியமான-headroom அளவுகளை நிர்ணயிக்கவும்; 1–2 என்பது பழமைவாதமான #7849 இயல்புநிலையே தவிர, தயாரிப்பின் கட்டாய அதிகபட்ச வரம்பல்ல | ஒரு செயல்முறைக்கு 8× RAM மற்றும் வரம்பற்ற எண்ணிக்கை வரம்பை வழங்க வேண்டாம்            |
| **பகிரப்பட்ட quota counters**-க்கு விருப்பத்தேர்வாக: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                                                  | Redis-ஐப் பகிரப்பட்ட SQLite ஆகக் கருத வேண்டாம் — அது அவ்வாறானதல்ல                    |
| provider secrets-ஐ ஒவ்வொரு instance-லும் நகலெடுக்கவும் (அல்லது பிரிக்கப்பட்ட dashboards-ஐ ஏற்கவும்)                                                                                        | instances முழுவதும் ஒரே dashboard / ஒரே call-log கிடைக்கும் என எதிர்பார்க்க வேண்டாம் |
| ஏதேனும் load balancer-ஐ முன்னிலையில் பயன்படுத்தவும்; API key அல்லது session அடிப்படையிலான sticky routing போதுமானது                                                                         | vendor-க்கே உரிய size-aware middleware அவசியம் எனக் கருத வேண்டாம்                    |

வன்பொருள்: ஒவ்வொரு instance-லும் ஒரே நேரத்தில் இயங்கக்கூடிய நீண்ட `/v1/responses` எண்ணிக்கை ஒரு **நினைவக-ஒதுக்கீட்டு** கேள்வியாகும் (heap + inflight-byte / #10110). `N` சுயாதீனமான `DATA_DIR`-கள் இன்னும் heap-களைப் பெருக்குகின்றன: host RAM ஆனது “N=8 கொண்ட ஒரே 16 Gi pod”-ஐ அல்லாமல், `N × cgroup`-ஐத் தாங்க வேண்டும். ஒரே SQLite file-இல் ஒருபோதும் `replicas > 1` பயன்படுத்த வேண்டாம்.

Compose மாதிரி (இரண்டு heaps, இரண்டு volumes — `deploy.replicas: 2` அல்ல):

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

செயல்முறைக்குள் அடர்த்தி (HTTP isolate-இலிருந்து compression-ஐ அகற்றுதல்) என்பது [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). பகிரப்பட்ட நீடித்த state-இல் ஒரே தருக்கரீதியான cluster என்பது [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Docker-க்குள் Gemini பிராந்தியப் பிழைகள்

Google AI Studio / Gemini API, FAILED_PRECONDITION உடன் HTTP 400 மற்றும்
`User location is not supported for the API use.` என்ற செய்தியை வழங்கக்கூடும். ஹோஸ்டில் கோரிக்கை
வெற்றிகரமாக இருப்பது, கண்டெய்னரும் அதே வெளிச்செல்லும் வழியைப் பயன்படுத்துகிறது என்பதை நிரூபிக்காது. DNS வரிசைப்படுத்தல்,
IPv4/IPv6 இணைப்பு, VPN வழித்தடம் மற்றும் கட்டமைக்கப்பட்ட ப்ராக்ஸிகள் வேறுபடலாம்.
[Google ஆதரிக்கும் பிராந்தியங்கள்](https://ai.google.dev/gemini-api/docs/available-regions)
மற்றும் உண்மையான இணைப்பு வழி ஆகிய இரண்டையும் சரிபார்க்கவும்; இந்தப் பிழை மட்டும் தவறான API விசையைச் சுட்டிக்காட்டாது.

### இணைப்புக்கே உரிய ப்ராக்ஸிக்கு முன்னுரிமை அளிக்கவும்

பாதிக்கப்பட்ட Gemini இணைப்பிற்கு OmniRoute-இன் [ஒவ்வொரு இணைப்புக்குமான ப்ராக்ஸி கட்டமைப்பைப்](../ops/PROXY_GUIDE.md#4-level-proxy-system)
பயன்படுத்தி, பின்னர் அதே மாடலுடன் **இணைப்பைச் சோதிக்கவும்** என்பதையும் ஒரு சிறிய கோரிக்கையையும்
மீண்டும் இயக்கவும். இதனால் வழித்தட மாற்றம் அந்த இணைப்பிற்கு மட்டும் கட்டுப்படுத்தப்படுகிறது. கண்டெய்னரிலிருந்து
ப்ராக்ஸியை அணுக முடிகிறதா என்பதையும், இணைப்பு உண்மையிலேயே அதையே தேர்ந்தெடுக்கிறதா என்பதையும்
சரிபார்க்கவும். வழித்தடத்தை மாற்றுவது, மேல்நிலைச் சேவையின் பிராந்தியத் தகுதிக்கு உத்தரவாதம் அளிக்காது.

### ஹோஸ்ட் மற்றும் கண்டெய்னர் வலையமைப்பை ஒப்பிடவும்

அங்கீகரிக்கப்பட்ட முடிவுகளை ஒப்பிடும்போது விசை, மாடல் மற்றும் கோரிக்கையை ஒரே மாதிரியாக வைத்திருக்கவும்; சான்றுகள்,
ப்ராக்ஸி கடவுச்சொற்கள் அல்லது முழுமையான அங்கீகாரத் தலைப்புகளை ஒரு சிக்கல் அறிக்கையில் ஒருபோதும்
ஒட்ட வேண்டாம். முதலில் OS தீர்வி எந்த முகவரிக் குடும்பங்களை வழங்குகிறது என்பதை, ஹோஸ்டிலும்
கண்டெய்னருக்குள்ளும் அதே கட்டளையைப் பயன்படுத்தி ஆய்வு செய்யவும்:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` என்பதை நீங்கள் இயக்கும் சேவையின் பெயரால் மாற்றவும் (எடுத்துக்காட்டாக, `omniroute-web`). இந்தக்
கட்டளைகள் சான்றுகள் அல்லது IP முகவரிகள் இல்லாமல் முகவரிக் குடும்பங்களை அச்சிடும். திரும்பப் பெறப்படும் `6`
என்பது IPv6 DNS முடிவை மட்டுமே காட்டுகிறது: பயன்படுத்தக்கூடிய IPv6 வழித்தடம் அல்லது API அணுகல் உள்ளது என்பதை அது
நிரூபிக்காது. `curl` நிறுவப்பட்டுள்ள இடங்களில், இரு சூழல்களிலும் `curl -4 -I https://generativelanguage.googleapis.com`
மற்றும் `curl -6 -I https://generativelanguage.googleapis.com` ஆகியவற்றை ஒப்பிடவும்.
அது அங்கீகரிக்கப்படாத பிழையாக இருந்தாலும், HTTP பதில் அந்தச் சோதனைக்கான இணைப்பை நிரூபிக்கிறது;
அங்கீகரிக்கப்பட்ட மாடல் கோரிக்கை மட்டுமே Gemini தகுதியைச் சோதிக்கிறது.

### ஹோஸ்ட்-நிலை மாற்று வழி: செயல்படும் IPv6 மற்றும் தீர்விக் கொள்கை

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)-ஐப் புகாரளித்தவர், கண்டெய்னர் IPv6-ஐச் செயல்படுத்தி
glibc முகவரித் தேர்வை மாற்றியதன் மூலம் தமது சூழலில் அணுகலை மீட்டெடுத்தார்.
இதைச் சூழலுக்கே உரிய மாற்று வழியாகக் கருதவும். தீர்வி முன்னுரிமைகளைச் சரிசெய்வதற்கு முன் செயல்படும் ஹோஸ்ட்
IPv6, கண்டெய்னர் வெளிச்செல்லும் இணைப்பு/வழித்தடம் மற்றும் ஃபயர்வால் விதிகளை உறுதிப்படுத்தவும்.
ஒரு தனிப்பட்ட ULA முகவரி மட்டும் பொது IPv6 இணைப்பை உறுதிப்படுத்தாது.

Compose-இன் இயல்புநிலை வலையமைப்புடன் ஏற்கனவே இணைக்கப்பட்டுள்ள சேவைகளுக்கு, இந்தத் துணுக்கானது
அந்த வலையமைப்பில் IPv6-ஐச் செயல்படுத்துகிறது; உங்கள் சேவை, போர்ட்கள், வால்யூம்கள் மற்றும் கட்டமைப்பின் மீதமுள்ள பகுதிகளை அப்படியே வைத்திருக்கவும்:

```yaml
networks:
  default:
    enable_ipv6: true
```

பெயரிடப்பட்ட வலையமைப்பிற்கு, சேவை உண்மையில் இணையும் வலையமைப்பில் இதைச் செயல்படுத்தவும். Docker ஒரு
ULA துணைவலையை ஒதுக்க முடியும்; உங்கள் வலையமைப்பிற்கு அது தேவைப்படும்போது மட்டுமே வெளிப்படையான,
ஒன்றுடன் ஒன்று மேற்படாத துணைவலையைத் தேர்ந்தெடுக்கவும். [Docker IPv6 வலையமைப்பு](https://docs.docker.com/engine/daemon/ipv6/)
மற்றும் [Compose வலையமைப்பு விருப்பங்கள்](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) ஆகியவற்றைப் பார்க்கவும்.

**glibc-அடிப்படையிலான இமேஜில்**, `/etc/gai.conf` முகவரித் தேர்வை மாற்றக்கூடும். தற்போதைய
களஞ்சிய Dockerfile, Debian-ஐப் பயன்படுத்துகிறது; தனிப்பயன் musl-அடிப்படையிலான இமேஜ்கள் இந்தச் செயல்முறையைப் பகிர்வதில்லை.
புகாரளிக்கப்பட்ட சரிசெய்தல் ULA லேபிளை `label fc00::/7 6` என்பதிலிருந்து
`label fc00::/7 1` என்பதாக மாற்றுகிறது. இமேஜின் முழுமையான கொள்கை அட்டவணையிலிருந்து தொடங்கி, அதன் பிற
உள்ளீடுகளைப் பாதுகாக்கவும்: ஒரு `label` அல்லது `precedence` உள்ளீட்டைச் சேர்ப்பது அந்த இயல்புநிலை அட்டவணையை மாற்றிவிடும், எனவே
மாற்றப்பட்ட வரியை மட்டும் கொண்ட கோப்பு போதாது.
[glibc கட்டமைப்பு மேற்கோள்](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
அந்தச் செயல்முறைகளை ஆவணப்படுத்துகிறது. மதிப்பாய்வு செய்யப்பட்ட கோப்பை `/etc/gai.conf`-இல் படிக்க மட்டும் அனுமதிக்கப்பட்டவாறு bind-mount செய்து,
அதைப் பயன்படுத்துவதற்காகச் சேவையை மீண்டும் உருவாக்கவும்.

இது **அந்தக் கண்டெய்னரிலிருந்து வெளிச்செல்லும் அனைத்து போக்குவரத்திற்குமான** OS முகவரித் தேர்வை மாற்றுகிறது.
ஒவ்வொரு பயன்பாடும் IPv6-ஐத் தேர்ந்தெடுக்க வேண்டும் என்று இது கட்டாயப்படுத்தாது: Node-இன் DNS வரிசையும் இணைப்புத்
தேர்வும் முக்கியமானவை. குறிப்பாக, `--dns-result-order=ipv4first` IPv4-க்கு முன்னுரிமை அளிக்கிறது; மேலும்
IPv4-க்கு மட்டுமே ஏற்படும் தோல்விக்கான தீர்வாக இது இருக்காது. [Node DNS வரிசைப்படுத்தல்](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) என்பதைப் பார்க்கவும்.

எந்தவொரு ஹோஸ்ட்-நிலை மாற்றத்திற்குப் பிறகும் Gemini மற்றும் உங்கள் பிற வழங்குநர்களை மீண்டும் சோதிக்கவும். மீளமைக்க,
தனிப்பயன் `gai.conf` mount-ஐ அகற்றி, முந்தைய வலையமைப்புக் கட்டமைப்பை மீட்டமைத்து,
பராமரிப்பு நேரச் சாளரத்தில் பாதிக்கப்பட்ட சேவை/வலையமைப்பை மீண்டும் உருவாக்கவும். ஒரு வலையமைப்பை மீண்டும் உருவாக்குவது,
அதனுடன் இணைக்கப்பட்டுள்ள பிற கண்டெய்னர்களில் தடங்கலை ஏற்படுத்தலாம்; நிலைத்த தரவு வால்யூமை நீக்க வேண்டாம்.

## முக்கியக் குறிப்புகள்

- **SQLite WAL முறை:** சமீபத்திய மாற்றங்களை OmniRoute மீண்டும் `storage.sqlite`-க்குள் checkpoint செய்யும் வகையில், `docker stop` முழுமையாக நிறைவடைய அனுமதிக்க வேண்டும். இணைக்கப்பட்டுள்ள Compose கோப்புகள் ஏற்கனவே 40 வினாடிகள் நிறுத்தக் கால அவகாசத்தை அமைத்துள்ளன. image-ஐ நேரடியாக இயக்கினால், `--stop-timeout 40` என்பதைத் தொடர்ந்து பயன்படுத்தவும்.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** வழக்கமான/எழுதுவதற்கு முந்தைய காப்புப்பிரதிகள் வெளிப்புறமாக நிர்வகிக்கப்பட்டால், இதை `true` என அமைக்கவும். ஏற்கனவே உள்ள database migration-களுக்கு, அவற்றுக்கென நீடித்த பாதுகாப்பு snapshot மற்றும் மொத்த migration பாதுகாப்புக் கட்டுப்பாடு இன்னும் தேவைப்படும்.
- **தரவு நிலைத்தன்மை:** container மறுதொடக்கங்களுக்குப் பிறகும் உங்கள் database, விசைகள் மற்றும் உள்ளமைவுகளைத் தக்கவைக்க, எப்போதும் `/app/data`-க்கு ஒரு volume-ஐ mount செய்யவும்.
- **Port உள்ளமைவு:** இயல்புநிலை `20128` port-ஐ மாற்ற, `PORT` environment variable-ஐ override செய்யவும்.

## மேலும் காண்க

- [VM Deployment வழிகாட்டி](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare அமைப்பு
- [Fly.io Deployment வழிகாட்டி](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-க்கு deploy செய்யவும்
- [Environment உள்ளமைவு](../reference/ENVIRONMENT.md) — முழுமையான `.env` குறிப்பு
