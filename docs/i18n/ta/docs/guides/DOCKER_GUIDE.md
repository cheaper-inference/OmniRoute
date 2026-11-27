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

## விரைவான ரன்

> **ஒரு கட்டளையில் சுய-ஹோஸ்ட்?** [சுய-ஹோஸ்ட் வழிகாட்டி](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` ஐப் பார்க்கவும் (வெளியிடப்பட்ட படம் + Redis, லூப்பேக்-மட்டும், சுயவிவரத் தேர்வு இல்லை). கீழே உள்ள விரைவு ரன் என்பது ஏற்கனவே வேறு இடங்களில் Redis இயக்கும் பயனர்களுக்கான ஒற்றை-கொள்கலன் பாதையாகும்.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## சுற்றுச்சூழல் கோப்புடன்

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

களஞ்சியம் பல-நிலை டாக்கர்ஃபைலை (`Dockerfile`) அனுப்புகிறது. நான்கு நிலைகள் வெளிப்படும்; உங்கள் பயன்பாட்டுக்கு சரியான `target` தேர்ந்தெடுக்கவும்.

| மேடை          | அடிப்படை படம்         | நோக்கம்                                                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | deps (`npm ci --legacy-peer-deps`) ஐ நிறுவுகிறது மற்றும் `npm run build` இயக்குகிறது (இயல்புநிலையாக Turbopack — பில்ட் டைம் ஆதாரங்களை கீழே பார்க்கவும்)                                                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Next.js தனித்த வெளியீட்டுடன் உற்பத்தி இயக்க நேரம்.** வழங்குநர் CLIs தொகுக்கப்படவில்லை.**                                                                                                                                                                                                                                           |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` மற்றும் உலகளாவிய CLIs ஐச் சேர்க்கிறது: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** ஏஜென்டிக் பணிப்பாய்வுகளுக்கு இதைத் தேர்ந்தெடுக்கவும்.**                                                                                                                           |
| `runner-web`  | `runner-base`         | இணைய அமர்வு வழங்குநர்களுக்கு Playwright + ஒரு Chromium உலாவி (`--with-deps`) சேர்க்கிறது: `gemini-web`, `claude-web`, `claude-turnstile`.** அந்த வழங்குநர்களைப் பயன்படுத்தும்போது இதைத் தேர்ந்தெடுக்கவும்** — எளிய படம் அது இல்லாமல் கோரிக்கை நேரத்தில் தோல்வியடைகிறது (வெளியீட்டு சேனல்களின் கீழ் `-web` குறிப்பைப் பார்க்கவும்). |

ஒரு குறிப்பிட்ட இலக்கை கைமுறையாக உருவாக்கவும்:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### உருவாக்க நேர வளங்கள்

`builder` நிலையின் விலை என்ன என்பதை மூன்று உருவாக்க args கட்டுப்படுத்துகின்றன. அவை பில்ட்-டைம் மட்டும் — `OMNIROUTE_MEMORY_MB` (கீழே) ஒரு தனி, இயக்க நேர குமிழ்.

| பில்ட் ஆர்க்                | இயல்புநிலை | விளைவு                                                                                              |
| --------------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | வெப்பேக் மூலம்`0` உருவாக்குகிறது: குறைந்த உச்ச நினைவகம், மெதுவாக. `1` Turbopack ஐ தேர்வு செய்கிறது. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | முட்டையிடப்பட்ட `next build` க்கு V8 குவியல் உச்சவரம்பு (`--max-old-space-size`).                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | ஊட்டங்கள் `CIRCLE_NODE_TOTAL`; அடுத்தது பக்க தரவு சேகரிப்புக்கான `workers = N - 1` பெறுகிறது.       |

`OMNIROUTE_BUILD_WORKERS` என்பது ஒரு பெரிய பில்டரின் மீது வளர்க்கப்படுபவர் மற்றும் ஒரு கட்டுப்பாடான கட்டிடம் இறக்கும் போது சந்தேகிக்கப்படுபவர்** பிறகு** `✓ Compiled successfully` ஒவ்வொரு பக்க-தரவு பணியாளரும் அதன் சொந்த செயல்முறையாகும், மேலும் பெற்றோர் `next build` தானே; ஒரு நேரடி VPS மறுஉருவாக்கம் (வெளியீடு #7518) `NODE_OPTIONS` குவியல் கொடியிலிருந்து ~ 4.5 GB இல் ஒவ்வொரு செயல்முறையின் உச்ச RSS அளவிடுகிறது (Turbopack V8 குவியலுக்கு வெளியே native/Rust நினைவகத்தில் தொகுக்கிறது). `2` இன் இயல்புநிலை (→ 1 தொழிலாளி, மொத்தம் 2 செயல்முறைகள்) வெளியீட்டு பைப்லைன் பயன்படுத்தும் 16 GB / 4 vCPU GitHub-hosted ரன்னர்களுக்கான அளவு. `8` இல் (→ 7 தொழிலாளர்கள்) அந்த ஓட்டப்பந்தய வீரரின் நினைவகம் தீர்ந்துவிட்டது மற்றும் பில்ட்கிட் `ResourceExhausted: ... cannot allocate memory` உடன் படியில் தோல்வியடைந்தது; `3` (→ 2 பணியாளர்கள்) ஒரு செயல்முறைக்கு RSS அனுமானிப்பதற்குப் பதிலாக நேரடியாக அளவிடப்பட்டவுடன் இன்னும் பொருந்தவில்லை. `tests/unit/docker-build-memory-budget.test.ts` அளவிடப்பட்ட உருவத்திற்கு எதிராக எண்கணிதத்தை செய்கிறது மற்றும் ரன்னரை விட குமிழ் அதிகமாக இருந்தால் தோல்வியடையும்.

Turbopack வாழும் ரஸ்ட் நினைவகத்தில் தொகுக்கிறது** வெளியே** V8 குவியல், எனவே `OMNIROUTE_BUILD_MEMORY_MB` அதை பிணைக்கவில்லை. நினைவக உச்சவரம்பைக் கொண்ட ஹோஸ்டில், OOM கொலையாளியால் உருவாக்கம் SIGKILLed ஆனது, — எந்தப் பிழை உரையும் இல்லாமல், அது வெறுமனே நடு-`Creating an optimized production build` நிறுத்துகிறது, இது நினைவாற்றல் இல்லாததை விட ஒரு செயலிழப்பைப் போன்றது. அதனால்தான் `Dockerfile` இயல்புநிலையாக webpack (`OMNIROUTE_USE_TURBOPACK=0`) ஆனது, `npm run dev` / `npm run build` போலல்லாமல், Turbopack என்பது குறியீடு இயல்புநிலை: பில்ட் ஆர்க்ஸ் இல்லாத ஒரு வெற்று `docker build .` (ரயில்வே மற்றும் பிற ஒரு கிளிக் ஹோஸ்ட்கள் இயங்கும்) நினைவக மூடிய பில்டரில் அமைதியாக இறக்கக்கூடாது. வெளியிடப்பட்ட படங்கள் ஏற்கனவே `OMNIROUTE_USE_TURBOPACK=0` வெளிப்படையாக `docker-publish.yml` இல் கடந்து செல்கின்றன. நிறைய RAM உள்ள பில்டரில், வேகமான உருவாக்கத்திற்கு Turbopack தேர்வு செய்யவும்:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` இயக்கப்பட்டது, எனவே `next build` ஒரு பெற்றோரை இயக்குகிறது** மற்றும்** ஒரு தொழிலாளி செயல்முறை மற்றும் ஒவ்வொன்றும் தனித்தனியாக `OMNIROUTE_BUILD_MEMORY_MB`. கன்டெய்னர் உச்சவரம்பை ஒரு முறை அல்ல, தோராயமாக இரண்டு மடங்கு அதிகமாக அளவிடவும்.

இந்த மரத்தில் அளவிடப்படுகிறது (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| மூட்டைக்காரர் | கொள்கலன் உச்சவரம்பு | முடிவு                                  |
| ------------- | ------------------- | --------------------------------------- |
| Turbopack     | 8 GiB / 16 GiB      | OOM-இரண்டிலும் கொல்லப்பட்டார், அமைதியாக |
| வெப்பேக்      | 8 GiB               | கட்ட தொழிலாளி SIGKILLed                 |
| வெப்பேக்      | 12 GiB              | வெற்றியடைந்தது, 11.1 GiB ஆக உயர்ந்தது   |

### இயக்க நேர இயல்புநிலைகள்

`runner-base` ஆல் ஏற்றுமதி செய்யப்படும் இயல்புநிலைகள்: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker இல் நினைவக நடத்தை:

- படம் `OMNIROUTE_MEMORY_MB=1024` அமைத்து அதிலிருந்து `NODE_OPTIONS=--max-old-space-size=1024` ஐப் பெறுகிறது.
- உண்மையான சேவையக செயல்முறையானது தனித்த துவக்கி மூலம் தொடங்கப்படுகிறது, இது `OMNIROUTE_MEMORY_MB` ஐப் படித்து `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` இணைக்கிறது.
- Node கடைசியாக மீண்டும் மீண்டும் `--max-old-space-size` மதிப்பைப் பயன்படுத்துகிறது, எனவே `OMNIROUTE_MEMORY_MB` அமைப்பது பயனுள்ள Docker குவியல் வரம்பைக் கட்டுப்படுத்துகிறது.
- படம் எப்பொழுதும் அதை அமைப்பதால், துவக்கியின் சொந்த ரேம் அளவீடு செய்யப்பட்ட ஃபால்பேக் ஒருபோதும் Docker இன் கீழ் பொருந்தாது. பணிச்சுமைக்காக அதை வெளிப்படையாக உயர்த்தவும் (கீழே உள்ள அட்டவணை). குறியீட்டு முகவர் `/v1/responses` க்கு `2048` இன்னும் சிறியதாக உள்ளது.

### குறியீட்டு முகவர்களுக்கான இயக்க நேரம் RAM

1 GiB Docker இயல்புநிலை ஒரு dashboard/light-chat தளம், உற்பத்தி அளவு அல்ல. நீண்ட `POST /v1/responses` உடல்கள் (நூற்றுக்கணக்கான செய்திகள், பல்லாயிரக்கணக்கான கருவிகள்) சுருக்கத்தின் போது பல நினைவக வரைபடங்களைத் தக்கவைத்துக்கொள்கின்றன. இரண்டு ஒன்றுடன் ஒன்று ~ 3 MiB / ~ 750k-டோக்கன் கோரிக்கைகள் V8 ஐ நிறுத்தியது** 12 GiB** ஓல்ட்-ஸ்பேஸ் (`FATAL ERROR: Reached heap limit`) மற்றும் 16 GiB cgroup OOM ஐ அடிக்கவும். [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) பார்க்கவும்.

அளவு** குவியல் மேலே cgroup `--memory`** — நேட்டிவ் பஃபர்கள், SQLite, மற்றும் சுருக்க இடைநிலைகள் V8க்கு வெளியே அமர்ந்திருக்கும்.

| பணிச்சுமை                                  | `OMNIROUTE_MEMORY_MB`      | கொள்கலன் / cgroup  | குறிப்புகள்                                                                                                           |
| ------------------------------------------ | -------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| டாஷ்போர்டு, ஒரு ஒளி அரட்டை                 | `1024` (படம் இயல்புநிலை)   | ≥2 GiB             |                                                                                                                       |
| ஒரு குறியீட்டு முகவர் (Claude/Codex/Grok)  | `8192`                     | ≥10 GiB            | வழக்கமான ஒற்றை அமர்வு `/v1/responses`                                                                                 |
| இரண்டு ஒரே நேரத்தில் நீண்ட `/v1/responses` | `10240`–`12288`            | ≥12–16 GiB         | ~ 12 GiB குவியலில் V8 அபார்ட் அளவிடப்பட்டது                                                                           |
| மூன்று+ ஒரே நேரத்தில் நீண்ட சூழல்கள்       | ஒரு செயல்பாட்டில் வேண்டாம் | தொடர் / மேலும் RAM | இயல்புநிலை ஹெவிவெயிட் சேர்க்கை 1 விமானத்தில்; RAM இல்லாமல் அதை உயர்த்துவது கருக்கலைப்பை மீண்டும் அறிமுகப்படுத்துகிறது |

வெற்று உலோகத்தில்`omniroute serve`, `OMNIROUTE_MEMORY_MB` இருக்கும் போது ~ 35% RAM (clamped `[512, 4096]`) அளவீடு செய்கிறது** அமைக்கப்படவில்லை** . Docker எப்போதும் `1024` அமைக்கிறது, இதனால் அளவுத்திருத்தம் ஒருபோதும் அதிகாரப்பூர்வ படத்தில் இயங்காது.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

Next.js `basePath` தனித்த தொகுப்பாக தொகுக்கப்பட்டுள்ளது. OmniRoute பயன்பாட்டு ரூட்டில் ஒரு செண்டினல் கோப்பில் பேக் செய்யப்பட்ட மதிப்பை பதிவு செய்கிறது ( `npm run build` ல் எழுதப்பட்டது; `scripts/docker/ensure-docker-base-path.mjs` ஆல் படிக்கப்பட்டது) மற்றும் கொள்கலன் தொடங்கும் போது அதை `OMNIROUTE_BASE_PATH` உடன் ஒப்பிடுகிறது. அவை வேறுபட்டு, டொமைன் ரூட்டிற்காக உருவம் கட்டமைக்கப்படும் போது, நுழைவுப் புள்ளி தனித்தனி வெளிப்பாடுகளை, உட்பொதிக்கப்பட்ட `basePath`/`assetPrefix` எழுத்துக்களை மீண்டும் எழுதுகிறது (அடுத்த 16, `assetPrefix` இலிருந்து SSR சொத்து URLs வழங்குகிறது இறக்குமதிகள் — முன் ரெண்டர் செய்யப்பட்ட பிழை பக்கங்கள்) மற்றும் கிளையன்ட் `/_next/static` `process.env` URLs `node dev/run-standalone.mjs` முன்.

### உருவாக்கத்தை எழுதுங்கள் (பரிந்துரைக்கப்படுகிறது)

இரண்டு மாறிகளையும் `.env` இல் அமைக்கவும், பின்னர் படத்தையும் இயக்க நேரமும் ஒத்துக்கொள்ளும் வகையில் மீண்டும் உருவாக்கவும்:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` ஒரு Docker build-arg ஆகவும் இயக்க நேர சூழல் மாறியாகவும் முன்னோக்கி அனுப்புகிறது.

### முன் கட்டமைக்கப்பட்ட ரூட் படம் + இயக்க நேர துணைப்பாதை

வெளியிடப்பட்ட `cheaperinference/omniroute:*` படங்கள் டொமைன் ரூட்டிற்காக உருவாக்கப்பட்டவை. இயக்க நேரத்தில் நீங்கள் இன்னும் `OMNIROUTE_BASE_PATH` அமைக்கலாம்; தொடக்கத்தில் கொள்கலன் மூட்டையை ஒருமுறை இணைக்கிறது. பொருந்தும் பொது தோற்றத்துடன் இணைக்கவும்:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

முன்னனுப்புவதற்கு தலைகீழ் ப்ராக்ஸியை உள்ளமைக்கவும்** முழு** வெளிப்புற பாதை (முன்னொட்டை அகற்ற வேண்டாம்). Traefik `PathPrefix(`/ omniroute `)` `StripPrefix` இல்லாமல் கொள்கலனுக்கு அனுப்ப வேண்டும், எனவே Next.js `/omniroute/...` பெறுகிறது மற்றும் `/omniroute/_next/...` இலிருந்து சொத்துக்களை வழங்குகிறது.

Docker ஹெல்த்செக், செயலில் உள்ள `OMNIROUTE_BASE_PATH` உடன் முன்னொட்டப்பட்ட இலகுரக `/healthz` வாழ்க்கைச் சுழற்சி இறுதிப் புள்ளியை ஆய்வு செய்கிறது. human/dashboard கண்டறியும் `/api/monitoring/health` உள்ளது; கொள்கலன் HEALTHCHECK மீண்டும் அதன் மீது சுட்டிக்காட்ட (உதாரணமாக ஆழ்ந்த சுகாதார அமலாக்கத்திற்கு), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` அமைக்கவும். அந்தப் பாதை ஏ** ஆழமான** சரிபார்க்கவும் (DB + கண்காணிப்பு சுருக்கம்) — Docker இன் அரிதாக இருக்கும் `HEALTHCHECK` க்கு பொருத்தமானது, நீங்கள் மீண்டும் தேர்வு செய்தால், ஆனால்** இல்லை** Kubernetes `livenessProbe` இடைவெளிகளுக்கு.

ஆர்கெஸ்ட்ரேட்டர்களுக்கு (குபர்னெட்ஸ், நாடோடி, முதலியன):

| ஆய்வு                  | முன்னுரிமை                                                                   | தவிர்க்கவும்                                                  |
| ---------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| உயிரோட்டம்             | HTTP `GET /livez`, அல்லது TCP பிரதான போர்ட்டில் (`PORT`, இயல்புநிலை `20128`) | உயிரோட்டமாக `/api/monitoring/health`                          |
| தயார்நிலை              | HTTP `GET /healthz`                                                          | பிஸியான நிகழ்வு-லூப்பை இறந்ததாகக் கருதும் இறுக்கமான காலக்கெடு |
| ஆழமான / கருப்பு பெட்டி | `/api/monitoring/health`                                                     | —                                                             |

`/healthz` செயல்முறை வாழ்க்கை சுழற்சி (`ok` / `starting` / `stopping`) அறிக்கைகள். `/livez` செயல்முறை-உயிருடன் மட்டுமே உள்ளது (200 கையாளுபவர் இயக்க முடியும்; அது தயார்நிலைக்காக காத்திருக்காது). இரண்டும் இன்னும் ஒரே நோட் ஈவென்ட் லூப்பில் கோரிக்கை கையாளுதலில் இயங்குகின்றன, எனவே CPU-பிணைப்பு பட்டியல் அல்லது சுருக்க வேலை — பிஸியாக ≠ இறந்துவிடும். HTTP ஆய்வுகள் நேரம் முடிந்தால் TCP லைவ்னஸை விரும்பு. முழு ஆய்வு வழிகாட்டுதல்: [கண்காணிப்பு வழிகாட்டி — குபெர்னெட்ஸ் ஆய்வு பரிந்துரைகள்](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## கேடியுடன்Docker கம்போஸ் (HTTPS Auto-TLS)

கேடியின் தானியங்கி SSL வழங்குதலைப் பயன்படுத்திOmniRoute பாதுகாப்பாக வெளிப்படுத்தலாம். உங்கள் டொமைனின் DNS A பதிவு உங்கள் சேவையகத்தின் IP க்கு சுட்டிக்காட்டுகிறது என்பதை உறுதிப்படுத்தவும்.

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

கேடி அப்ஸ்ட்ரீம் கொள்கலனுக்கான நிலையான பகிர்தல் தலைப்புகளை அமைக்கிறது. OmniRoute `NEXT_PUBLIC_BASE_URL` OAuth கால்பேக்குகள் மற்றும் உருவாக்கப்பட்ட பொது இணைப்புகளுக்கு நியமன பொது தோற்றமாக பயன்படுத்துகிறது; அங்கீகரிக்கப்பட்ட டாஷ்போர்டு எழுதும் அதே தோற்றம் கோரிக்கைகள் மற்றும் அமர்வுக்கு உட்பட்ட CSRF பாதுகாப்பைப் பயன்படுத்துகிறது. வெளிப்படையான உள்ளமைவுக்குப் பதிலாக நம்பகமான முன்னனுப்பப்பட்ட தலைப்புகளில் இருந்து பொது மூலத்தை OmniRoute பெற வேண்டுமென நீங்கள் வேண்டுமென்றே விரும்பும் மேம்பட்ட வரிசைப்படுத்தல்களுக்கு மட்டும் `OMNIROUTE_TRUST_PROXY` இயக்கவும்.

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

## பட குறிச்சொற்கள்

| படம்                         | குறிச்சொல் | அளவு    | விளக்கம்                                                            |
| ---------------------------- | ---------- | ------- | ------------------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest`   | ~ 250MB | மிக உயர்ந்தது** வெளியிடப்பட்டது** நிலையான SemVer (ஜிட் `main` அல்ல) |
| `cheaperinference/omniroute` | `3.8.54`   | ~ 250MB | GitOps க்கான இந்த வகை குறிச்சொல்லைப் பின் செய்யவும்                 |

ஒரே மாதிரியான ஆர்கிடெக்சர் டைஜெஸ்ட்களுடன் ஒரே படங்கள் மூன்று களஞ்சியங்களில் வெளியிடப்படுகின்றன: `cheaperinference/omniroute` (Docker Hub, The Cheaper Inference Organisation, from 3.8.53 on), `ghcr.io/cheaper-inference/omniroute` மற்றும் the legacy `diegosouzapw/omniroute`, இது அதன் இழுப்பு வரலாற்றை வைத்து இன்னும் ஒவ்வொரு வெளியீட்டையும் பெறுகிறது. தற்போதுள்ள `diegosouzapw/omniroute` வரிசைப்படுத்தல்கள் தொடர்ந்து புதுப்பிக்கப்படுகின்றன; படத்தின் பெயரை மாற்றுவது விருப்பமானது. கீழே உள்ள `:next` / `:next-web` ப்ரீ-ரிலீஸ் சேனல் `diegosouzapw/omniroute` மற்றும் GHCR க்கு மட்டும் வெளியிடப்பட்டது.

மல்டி-பிளாட்ஃபார்ம் மேனிஃபெஸ்ட்: `linux/amd64` + `linux/arm64` நேட்டிவ் (ஆப்பிள் சிலிக்கான், AWS Graviton, Raspberry Pi). Docker தானாகவே பொருந்தக்கூடிய கட்டமைப்பைத் தேர்ந்தெடுக்கிறது; ARM ஹோஸ்ட்களில் AMD64 எமுலேஷனை கட்டாயப்படுத்த வேண்டும் என்றால் `--platform linux/amd64` அனுப்பவும்.

### சேனல்களை வெளியிடுங்கள்

OmniRoute நிலையான வெளியீடுகள், செயலில் வெளியீடு-கிளை சோதனை மற்றும் வளர்ச்சி உருவாக்கங்கள் ஆகியவற்றிற்காக தனி Docker சேனல்களை வெளியிடுகிறது.

| சேனல்                           | ஆதாரம்                                           | மாறுதல்                           | பரிந்துரைக்கப்பட்ட பயன்பாடு                                                                                                                              |
| ------------------------------- | ------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned வெளியீடு                        | மாறாதது                           | சரியான வெளியீட்டை பொருத்தும் உற்பத்தி வரிசைப்படுத்தல்கள்                                                                                                 |
| `:latest` / `:latest-web`       | மிக உயர்ந்தது** வெளியிடப்பட்டது** நிலையான SemVer | மாறக்கூடிய நிலையான சுட்டி         | நிலையான வெளியீடுகளைப் பின்பற்றுகிறது** பிறகு** ஒரு SemVer வெளியிடும் வேலை — செய்கிறது** இல்லை** டிராக் `main` அல்லது வெளியிடப்படாத `release/v*` கமிட்கள் |
| `:next` / `:next-web`           | தற்போதைய இயல்புநிலை `release/v*` கிளை            | மாறக்கூடிய முன்-வெளியீட்டு சுட்டி | செயலில் உள்ள வெளியீட்டு கிளையில் இறங்கியுள்ள சோதனை திருத்தங்கள் இன்னும் நிலையான வெளியீட்டில் இல்லை                                                       |
| `:main` / `:main-web`           | `main` கிளை                                      | மாறக்கூடிய வளர்ச்சி சுட்டி        | வளர்ச்சி மற்றும் ஒருங்கிணைப்பு சோதனை மட்டுமே                                                                                                             |

#### இணைய அமர்வு வழங்குநர்கள்: `-web` படங்கள்

மேலே உள்ள ஒவ்வொரு சேனலும் `-web` குறிச்சொல்லாக (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) இரட்டிப்பாகிறது, `runner-web` நிலை — அதே படத்தையும் Playwright மற்றும் Chromium உலாவியில் இருந்து கட்டப்பட்டது. வெற்று படம் கப்பல்கள்** இல்லாமல்** குரோமியம்; `gemini-web`, `claude-web` மற்றும் `claude-turnstile` இது தேவை.

தோல்வி ஒத்திவைக்கப்பட்டது, தொடக்க நேரம் அல்ல: அந்த வழங்குநர்கள் தங்கள் மாடல்களைப் பட்டியலிட்டு, டாஷ்போர்டில் இணைக்கப்பட்டதாகக் காட்டுகிறார்கள், மேலும் முதல் கோரிக்கை மட்டும் தோல்வியுற்றது

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

நீங்கள் அந்த வழங்குநர்களைப் பயன்படுத்தினால், நீங்கள் ஏற்கனவே — இல் உள்ள சேனலின் `-web` குறிச்சொல்லை இழுக்கவும், வேறு எதுவும் மாறாது. ஒரு npm/CLI நிறுவலில் ( Docker படம் இல்லை), சமமான விடுபட்ட துண்டு உலாவி பைனரி: ஹோஸ்டில் `npx playwright install chromium` இயக்கவும்.

#### வெளியீட்டிற்கு முந்தைய சேனலைப் பயன்படுத்துதல்

`next` சேனல் தற்போதைய இயல்புநிலை `release/v*` கிளைக்கான ஒவ்வொரு அழுத்தத்திலும் மீண்டும் கட்டமைக்கப்படுகிறது மற்றும் AMD64 மற்றும் ARM64 இரண்டிற்கும் வெளியிடப்படுகிறது. பழைய பராமரிப்பு கிளைகள் அதை மேலெழுத முடியாது. அடுத்த நிலையான குறிச்சொல் வெட்டப்படுவதற்கு முன்பு செயலில் உள்ள வெளியீட்டு கிளையில் இணைக்கப்பட்ட திருத்தங்களுக்கு இழுக்கக்கூடிய படத்தை சேனல் வழங்குகிறது.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Composeக்கு, தேர்ந்தெடுக்கப்பட்ட சுயவிவரம் பயன்படுத்தும் படக் குறிச்சொல்லை மேலெழுதவும், பின்னர் சேவையை இழுத்து மீண்டும் உருவாக்கவும்:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### பாதுகாப்பு மற்றும் திரும்பப் பெறுதல்

`next` ஒரு மிதக்கும் முன் வெளியீட்டு சேனல். செயலில் உள்ள வெளியீட்டு கிளைக்கு எந்த அழுத்தத்திலும் இது மாறலாம்** உற்பத்தி பயன்பாட்டிற்கு ஆதரிக்கப்படவில்லை** . ஒரு குறிப்பிட்ட கட்டமைப்பை மதிப்பிடும் போது படத்தின் டைஜெஸ்ட்டைப் பின் செய்யவும்:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

சோதனைக்கு முன், OmniRoute தரவு தொகுதி அல்லது பிணைக்கப்பட்ட தரவு கோப்பகத்தை காப்புப் பிரதி எடுக்கவும். பின்வாங்க, முன்பு பயன்படுத்திய நிலையான பதிப்பை மீட்டெடுக்கவும் அல்லது கொள்கலனை ஜீரணித்து மீண்டும் உருவாக்கவும்:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

ஒரு வெளியீடு-கிளை உருவாக்கம் ஒருபோதும் `latest` நகர்த்த முடியாது; தகுதியான நிலையான சொற்பொருள் பதிப்பு மட்டுமே நிலையான சுட்டியை ஊக்குவிக்கும். `next` படங்கள் வெளியீட்டுப் பட ஆய்வைத் தக்கவைத்து, கிரிடிகல்-பாதிப்பு வாயிலைத் தடுக்கின்றன.

**`latest` என்பது gitக்கான நாணய உத்தரவாதம் அல்ல.** `main` அல்லது செயலில் உள்ள `release/v*` கிளையில் இணைக்கப்பட்ட திருத்தங்கள்** இல்லை** `:latest` இல் ஒரு நிலையான SemVer படம் வெளியிடப்படும் வரை மற்றும் வெளியீட்டு வேலை `:latest` ஊக்குவிக்கும் (அந்த SemVer போலவே டைஜெஸ்ட் ). GitHub ஏற்கனவே பிழைத்திருத்தத்தைக் காட்டும் போது `latest` உறைந்ததாகத் தோன்றினால், வெளியீட்டு கிளையைச் சோதிக்க `:next` இழுக்கவும் அல்லது SemVer குறிச்சொல்லுக்காக காத்திருக்கவும்.

| நீங்கள் வேண்டும்                                                                                | பயன்படுத்தவும்                           |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / உற்பத்தி, அது சறுக்கக்கூடாது                                                           | பின் `:X.Y.Z` (அல்லது படத்தின் டைஜெஸ்ட்) |
| வெளியிடப்பட்ட தொழுவங்களைப் பின்தொடர்ந்து, ஒவ்வொரு வெளியீட்டிலும் மீண்டும் உருவாக்குவதை ஏற்கவும் | `:latest`                                |
| வெளியிடப்படாத `release/v*` கமிட்களை சோதிக்கவும்                                                 | `:next` (உற்பத்தி அல்ல)                  |
| சோதனை `main`                                                                                    | `:main` (உற்பத்தி அல்ல)                  |

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

## கிடைக்கும் தன்மை: இயல்புநிலை SQLite ஒற்றை-பிரதி

பங்கு Docker / Kubernetes OmniRoute ஆகும்** ஒரு முனை செயல்முறை + ஒரு SQLite எழுத்தாளர்** . அதிக அளவில் கிடைக்கும்** ஆதரிக்கவில்லை** அந்த இடவியல் மீது.

| கட்டுப்பாடு                                         | விளைவு                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ஒற்றை எழுத்தாளர்                                    | செய்** இல்லை** ஒரே SQLite கோப்புக்கு எதிராக பல பிரதிகளை இயக்கவும். இது DB ஐ சிதைக்கிறது.                                                                                                                                                                                                                                                                                  |
| மீண்டும் உருவாக்கு / மறுதொடக்கம் / HEALTHCHECK கொலை | **முழு செயலிழப்பு** இன்-ஃப்ளைட் SSE, டாஷ்போர்டு அமர்வுகள் மற்றும் இன்-மெமரி நிலை. இணைக்கப்பட்ட ஒவ்வொரு கிளையண்ட் குறைகிறது. காலி-எண்ட்பாயிண்ட் சாளரத்தின் போது புதிய கோரிக்கைகள் தலைகீழ்-ப்ராக்ஸியைப் பெறுகின்றன**`502 Bad Gateway: Unknown error`** , OmniRoute JSON அல்ல — வாடிக்கையாளர்களால் இதை வழங்குநரின் தோல்வியிலிருந்து வேறுபடுத்திப் பார்க்க முடியாது (#11015). |
| `/healthz` போன்ற அதே நிகழ்வு வளையம்                 | பிஸியான பட்டியல் அல்லது சுருக்க டிக் ஆய்வுகளை தாமதப்படுத்தலாம்; ஒரு குறுகிய காலக்கெடு பின்னர் மீண்டும் தொடங்குகிறது** மட்டுமே** பிரதி.                                                                                                                                                                                                                                    |

**ஆய்வு அணி** ( [குபெர்னெட்ஸ் ஆய்வு பரிந்துரைகளையும்](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) பார்க்கவும்):

| ஆய்வு             | இலக்கு                                                                | பயன்படுத்த வேண்டாம்                                           |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| உயிரோட்டம்        | TCP இல் `PORT` (இயல்புநிலை `20128`), அல்லது மென்மையான HTTP `/healthz` | `/api/monitoring/health`                                      |
| தயார்நிலை         | HTTP `GET /healthz`                                                   | பிஸியான நிகழ்வு-லூப்பை இறந்ததாகக் கருதும் இறுக்கமான காலக்கெடு |
| ஆழமான / மனிதர்கள் | `/api/monitoring/health`                                              | தானியங்கு குபெலெட் லைவ்னெஸ்                                   |

**மேம்படுத்தல்கள்:** ஒவ்வொரு அமர்வும் குறையும் என்று எதிர்பார்க்கலாம். உங்களால் முடிந்தால் வாடிக்கையாளர்களை வடிகட்டவும்; இயல்புநிலை SQLite இல் ரோலிங் புதுப்பிப்பு எதுவும் இல்லை. `restart: unless-stopped` மற்றும் Docker `HEALTHCHECK` ஐ எழுதுவது, கொள்கலன் ஆரோக்கியமற்றதாக இருக்கும்போது ஒரே செயல்முறையை மாற்றும் - அதே வெடிப்பு ஆரம்.

ஆயத்த மேனிஃபெஸ்டுகள் மற்றும் ஹெல்ம் விளக்கப்படம் `deploy/kubernetes/` மற்றும் `deploy/helm/omniroute/` இல் லைவ் - [குபெர்னெட்ஸ் வரிசைப்படுத்தல் வழிகாட்டியைப்](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) பார்க்கவும்.

குபெர்னெட்ஸ் துணுக்கு ஒரு** ஒற்றை பிரதி** (மீண்டும் உருவாக்க வேண்டும்; ஒரு SQLite கோப்பிற்கு எதிராக `replicas` உயர்த்த வேண்டாம்):

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

`preStop` ஸ்லீப், SIGTERM க்கு முன் சர்வீஸ் எண்ட் பாயிண்ட்களை க்யூப் டிராப் செய்கிறது** புதிய** போக்குவரத்து இறக்கும் செயல்முறையை நிறுத்துகிறது. விமானத்தில் உள்ள `/v1/responses` SSE ஹெவிவெயிட் அட்மிஷன் குத்தகைகள் (#11015) வழியாக `SHUTDOWN_TIMEOUT_MS` (இயல்புநிலை 30கள்) வரை வெளியேற்றப்படுகிறது. இன்னும் செயல்முறை அடையும் புதிய கோரிக்கைகள் `503` + `Retry-After: 5`. மாற்றீடு தயாராகும் வரை காலி-எண்ட்பாயிண்ட் இடைவெளியை மீண்டும் உருவாக்குவது கடினமான செயலிழப்பாகவே உள்ளது - இது SQLite இடவியல், ஒரு ஆய்வு தவறான கட்டமைப்பு அல்ல.

வெளிப்புற Postgres / பல எழுத்தாளர் HA ஆகும்** இல்லை** ஒரு ஆவணப்படுத்தப்பட்ட பங்கு பாதை. உங்களுக்கு HA தேவைப்பட்டால், ஒரே ஒரு பிரதியை வைத்துக்கொள்ளவும் அல்லது திட்டம் தனித்தனியாக சோதனை செய்து ஆவணப்படுத்தப்பட்ட இடவியலை இயக்கவும். Postgres/MySQL வேலை [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) இல் வாழ்கிறது. அது கப்பல்கள் வரை, பெருக்க மட்டுமே ஆதரவு வழி** பெரிய** `/v1/responses` திறன் N சுயாதீன செயல்முறைகள் (அடுத்த பகுதி), ஒரு தொகுதியில் `replicas > 1` அல்ல.

## அளவிடுதல்: N சுயாதீன செயல்முறைகள்

### Codex டோக்கன் சுழற்சி உரிமை

ஒரு Codex கணக்கின் நகல்கள் அதன் ஒற்றைப் பயன்பாட்டு புதுப்பிப்பு டோக்கனை சுயாதீனமாக பயன்படுத்தக்கூடாது. ஒத்திசைக்கப்பட்ட நற்சான்றிதழ்களை மட்டுமே பயன்படுத்தும் நிகழ்வுகளில், `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (அலியாஸ் `cx`) அமைக்கவும். ஒற்றை சுழற்சி உரிமையாளரில் அதை அமைக்காமல் விடவும். ஒவ்வொரு செயல்முறைக்கும் இன்னும் அதன் சொந்த `DATA_DIR` தேவை; இந்த விருப்பம் SQLite ஐப் பகிராது அல்லது டோக்கன் ஒத்திசைவு அல்லது விநியோகிக்கப்பட்ட பூட்டை வழங்காது.

செயலற்ற நிகழ்வு புதுப்பித்தல் தேவைப்படும்போது இணைப்பை மீண்டும் படிக்கிறது மற்றும் வேறுபட்ட, காலாவதியாகாத அணுகல் டோக்கனை மட்டுமே ஏற்றுக்கொள்கிறது. இல்லையெனில், இணைப்பு காலாவதியாகாமல் அல்லது செயலிழக்காமல் அல்லது புதுப்பித்தல்-பிரேக்கர் தோல்வியைக் கணக்கிடாமல் புதுப்பித்தல் முடக்கப்படும். உண்மையான அப்ஸ்ட்ரீம் அங்கீகார தோல்விகள் இன்னும் சாதாரண தோல்வி கணக்கியல், அதிவேக கூல்டவுன் மற்றும் சாதாரண கிளையன்ட் பிழையைப் பயன்படுத்துகின்றன; கணக்கு செயலிழப்பு நிரந்தரமாக இருக்கும். அணுகல் டோக்கன்கள் காலாவதியாகும் முன் உரிமையாளரின் சுழற்றப்பட்ட டோக்கன்களை ஒத்திசைக்கவும் (இயல்பு செயலில் புதுப்பித்தல் முன்னணி ஐந்து நிமிடங்கள் ஆகும்), அல்லது Codex அங்கீகார கோப்பை மீண்டும் இறக்குமதி செய்யவும். செயலற்ற இறக்குமதிகள் வழங்கப்பட்ட டோக்கன்களை டோக்கன் இறுதிப் புள்ளியில் சரிபார்க்காமல் சேமிக்கும். கையேடு dashboard/API புதுப்பிப்பு `409 refresh_disabled`; புதிய OAuth உள்நுழைவுகள் மாறாமல் உள்ளன. [சுற்றுச்சூழல் குறிப்பைப்](../reference/ENVIRONMENT.md#passive-codex-token-refresh) பார்க்கவும்.

ஒரு முனை செயல்முறை ஆகும்** ஒரு V8 குவியல்** . இரண்டு ஒன்றுடன் ஒன்று ~ 3 MiB / ~ 750k-டோக்கன் கோடிங்-ஏஜென்ட் `POST /v1/responses` (RTK + கேவ்மேன்) ~ 12 Gi (`FATAL ERROR: Reached heap limit`) இல் அந்த குவியலை நிறுத்துகிறது மற்றும் 16 Gi cgroup ஐ OOM செய்ய முடியும். [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) பார்க்கவும். அந்த அளவீடு ஏ** நினைவகம்-பட்ஜெட்** எச்சரிக்கை, இரண்டு ஒரே நேரத்தில் நீண்ட `/v1/responses` இன் கடினமான தயாரிப்பு அல்ல. ஹெவிவெயிட் அரட்டை சேர்க்கையானது, அதே V8/cgroup உச்சவரம்பு — இலிருந்து தானாக பெறப்பட்ட உட்செலுத்தப்பட்ட பைட் பட்ஜெட் (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) மூலம் கேட் செய்யப்படுகிறது, அதை மேல்நோக்கி (அல்லது மரபு `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` கோரிக்கை-கவுண்ட் தொப்பியை அமைப்பது) ஏற்கனவே-அளவிலான செயல்முறையை மீண்டும் அறிமுகப்படுத்துகிறது. சிறிய அரட்டைகள், `/healthz`, `/v1/models`, மற்றும் MCP** இல்லை** அந்த தொப்பியில்.

### ஒரு செயல்முறை: இரண்டுக்கும் மேற்பட்ட நீண்ட `/v1/responses`

ஏ** ஆரோக்கியமான** செயல்முறை ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` கீழே குவியல் , இயல்புநிலை `0.75`)** கூடும்** செயல்முறை-அளவிலான இன்ஃப்லைட்-பைட் பட்ஜெட்டில் (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) இன்னும் இடம் இருக்கும்போது, இரண்டுக்கும் மேற்பட்ட ஒரே நேரத்தில் நீண்ட `POST /v1/responses` இயக்கவும். `OMNIROUTE_CHAT_LARGE_BODY_BYTES` அல்லது அதற்கு மேல் உள்ள உடல்கள் (இயல்புநிலை 256 KiB) அதே ஹெவிவெயிட் குத்தகையை கட்டமைப்பு-கடுமையான கோரிக்கைகள் மற்றும் அதே [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` தப்பிக்கும் (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) பயன்படுத்தவும். பல்லாயிரக்கணக்கான ஒரே நேரத்தில் நீண்ட SSE கிளையண்டுகள் (ஆபரேட்டர்களுக்கு பெரும்பாலும் 40–50 தேவை) a** நினைவகம்-பட்ஜெட்** கேள்வி — அளவு குவியல் + primary/headroom இடங்கள் + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — கடினமான "அதிகபட்சம் 2" தயாரிப்பு வரம்பு அல்ல. மீண்டும் முயற்சிக்கக்கூடிய `503` உடன் அழுத்தப்பட்ட குவியல் இன்னும் கொட்டுகிறது, அதனால் #7849 திரும்பவில்லை.

செய்ய** குவியல்களை பெருக்கவும்** (சுதந்திர V8 பழைய-இடங்கள்)** இன்று** :

| செய்                                                                                                                                                        | வேண்டாம்                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ஓடவும்** N containers/pods** , ஒவ்வொன்றும் அதன்** சொந்தம்** `DATA_DIR` / தொகுதி                                                                             | ஒரு SQLite கோப்பிற்கு எதிராக `replicas > 1` அமைக்கவும்                    |
| ஹெவி / இன்ஃப்லைட்-பைட் பட்ஜெட்டில் இருந்து விமானத்தில் கனமான + ஹெல்தி-ஹெட்ரூம்; 1–2 என்பது கன்சர்வேடிவ் #7849 இயல்புநிலை, கடினமான தயாரிப்பு அதிகபட்சம் அல்ல | ஒரு செயல்முறைக்கு 8 × RAM மற்றும் வரம்பற்ற எண்ணிக்கை தொப்பியைக் கொடுங்கள் |
| விருப்பத்தேர்வு: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`** பகிர்ந்த கோட்டா கவுண்டர்கள்**                                                       | Redis பகிரப்பட்ட SQLite — ஆகக் கருதுங்கள்                                 |
| ஒவ்வொரு நிகழ்விலும் நகல் வழங்குநர் ரகசியங்கள் (அல்லது பிரிக்கப்பட்ட டாஷ்போர்டுகளை ஏற்கவும்)                                                                 | நிகழ்வுகள் முழுவதும் ஒரு டாஷ்போர்டு / ஒரு அழைப்பு பதிவை எதிர்பார்க்கலாம்  |
| எந்த சுமை சமநிலையுடனும் முன்; API விசை அல்லது அமர்வு மூலம் ஒட்டினால் போதும்                                                                                 | ஒரு விற்பனையாளர்-குறிப்பிட்ட அளவு-விழிப்புணர்வு மிடில்வேர் தேவை           |

Redis மூலமாகவும் அமர்வு-க்கு-கணக்கின் தொடர்பைப் பகிர்ந்து கொள்ளலாம்: ஒவ்வொரு செயல்முறையிலும் `OMNIROUTE_SESSION_AFFINITY_STORE=redis` மற்றும் `REDIS_URL` அமைக்கவும், அதே `REDIS_KEY_PREFIX` மற்றும் நேர்மறை `sessionAffinityTtlMs` அமைப்புடன். ஒவ்வொரு செயல்முறையின் தகுதியான உள்ளூர் இணைப்பிற்கும் பின்கள் ஹாஷ் செய்யப்பட்ட பயன்பாட்டு-கணக்கு அடையாளங்களைத் தீர்க்கும், எனவே பொருந்தக்கூடிய அடையாள மெட்டாடேட்டாவுடன் OAuth கணக்குகள் பொருந்தக்கூடிய இணைப்பு IDs கொண்டிருக்க வேண்டியதில்லை. முள் தீர்மானம் மற்றும் பாதுகாக்கப்பட்ட வெளியேற்றம் ஆகியவற்றில் முரண்பாடான உள்ளூர் IDs விட அறியப்பட்ட கணக்கு அடையாளங்கள் முன்னுரிமை பெறுகின்றன; அடையாளம் இல்லாத பதிவுகள் (அல்லது அடையாளம் இல்லாமல் வெளியேற்றும் அழைப்பாளர்கள்) மரபு ID காவலரைத் தக்கவைத்துக்கொள்ளும். நிலையான பயன்பாட்டு அடையாளம் இல்லாத கணக்குகளுக்கு இன்னும் IDs பொருத்த வேண்டும். Redis பிழைகள் அல்லது 100 msக்கு அதிகமான அழைப்புகள் உள்ளூர் SQLite க்கு திரும்பும். ஒவ்வொரு Redis அஃபினிட்டி ஸ்டோரும் சிறந்த செயல்பாடுகளை 8 இல் வரையறுக்கிறது, Redis நிரம்பிய உடனேயே புறக்கணிக்கிறது, மேலும் அடிப்படை வேலை முடிவடையும் போது மட்டுமே ஸ்லாட்டுகளை வெளியிடுகிறது, அழைப்பாளர் காலக்கெடுவில் அல்ல. Redis செயலிழப்பின் போது பகிரப்பட்ட உண்மை இல்லை: ஒவ்வொரு நிகழ்வும் அதன் சொந்த உள்ளூர் உறவிற்குத் திரும்பும், அமர்வுகள் ஒரு நிகழ்விற்கு ஒரு முறை மீண்டும் பின் செய்யப்படலாம் மற்றும் நிகழ்வுகள் வேறுபடலாம். பிசுபிசுப்பு குணமடையும்போது Redis மூலம் மீண்டும் ஒன்றிணைகிறது. காலாவதி வரம்புகள் காத்திருக்கின்றன, அனுப்பப்பட்ட EVAL அல்ல, இது வீழ்ச்சிக்குப் பிறகு தரையிறங்கலாம். ரூட்டிங் எழுதுதல்கள், ரூட்டிங் முடிவால் கவனிக்கப்பட்ட சரியான மதிப்பை ஒப்பிடுகின்றன, புதிய பிறழ்வு நேர வாசிப்பு அல்ல; கவனிக்கப்பட்ட தவறுதல் அல்லது SQLite வீழ்ச்சியை கவனிப்பது இல்லாத Redis விசையுடன் ஒப்பிடப்படுகிறது. காலாவதியான பின்கள் ஒரு CAS இல் மாற்றப்படுகின்றன, எனவே தாமதமான கட்டளை புதிய, வேறுபட்ட பின்னை மாற்றவோ அல்லது நீக்கவோ முடியாது. Redis மதிப்பு மற்றும் மீதமுள்ள சர்வர் TTL அணுவாகப் படிக்கிறது; நேர்மறை PTTL (அல்லது காலாவதி இல்லை) உயிரோட்டத்தை தீர்மானிக்கிறது, எழுத்தாளரின் JSON நேர முத்திரை அல்லது வாசகரின் கடிகாரம் அல்ல. உள்ளூர் காலக்கெடுவிற்கு TTL மீதமுள்ள உள்ளூர் ஸ்னாப்ஷாட்கள் வரைபடம்; தற்போதுள்ள JSON விசைகள் படிக்கக்கூடியதாக இருக்கும் மற்றும் அவற்றின் மூல பைட்டுகள் CAS க்கு தக்கவைக்கப்படுகின்றன. Redis என்பது உண்மையின் ஒரே ஆதாரம், அது பதிலளிக்கும் போது. உறுதிப்படுத்தப்பட்ட பகிரப்பட்ட அப்சர்ட்டுகள், தொடுதல்கள் மற்றும் நீக்குதல்கள் உள்ளூர் உள்ளீட்டை அகற்றும், அதை ஒருபோதும் நிறுவவோ புதுப்பிக்கவோ வேண்டாம். Redis பாதையில் SQLite Redis பிழைகள், காலக்கெடு அல்லது சேர்க்கை செறிவூட்டல் ஆகியவற்றிலிருந்து இந்த நிகழ்வின் சொந்த ஃபால்பேக் முடிவுகளை மட்டுமே கொண்டுள்ளது, முன்பு போலவே TTL-வரையறுத்துள்ளது. பிந்தைய செயலிழப்பில் காணாமல் போன உள்ளூர் பின்னுக்கு ஒரு புதிய தேர்வு (ஒரு ப்ராம்ட்-கேச் மிஸ்) செலவாகும், தவறான அல்லது வெளியேற்றப்பட்ட கணக்கு அல்ல. நிராகரிக்கப்பட்ட அப்செர்ட்டுகள் பகிரப்பட்ட வெற்றியாளரையும் அதன் மீதமுள்ள TTL அணுமுறையில் திருப்பித் தரும்: சாதாரணத் தேர்வு மேப் செய்யப்பட்ட உள்ளூர் காலக்கெடுவை மறுபரிசீலனை செய்து, இன்னும் நேரலையில் தகுதியான வெற்றியாளரைப் பயன்படுத்துகிறது, உபயோகத்தைத் தொடுகிறது மற்றும் மற்றொரு பகிரப்பட்ட எழுத்து இல்லாமல் அந்தக் கணக்கிற்கு உள்நுழைகிறது. அது கிடைக்கவில்லை என்றால், தேர்வு உள்ளூர் வேட்பாளரை வைத்து, பகிரப்பட்ட பின்னை மாற்றாமல் விட்டுவிட்டு ஒரு பிழைத்திருத்த செய்தியை வெளியிடுகிறது. நிராகரிக்கப்பட்ட CAS SQLite எழுதுவதில்லை; Redis பிழைகள், காலக்கெடு அல்லது சேர்க்கை செறிவு ஆகியவை ஏற்கனவே உள்ள உள்ளூர் செயல்பாட்டைப் பயன்படுத்துகின்றன. அனுப்பப்பட்ட பிறழ்வின் பதில் காலாவதிக்குப் பிறகு (ஏற்றுக்கொள்ளப்பட்டது, நிராகரிக்கப்பட்டது அல்லது பிழை) வந்தால், ஒரு ஒத்திசைவான துல்லியமான தொடர் மதிப்பு ஒப்பிட்டு நீக்குவது பைட்-ஒரே மாதிரியான காலக்கெடு ஃபால்பேக் வரிசையை மட்டும் நீக்குகிறது. அந்த ஒப்பீடுக்கும் நீக்குதலுக்கும் இடையில் காத்திருப்பு இல்லை; ஒரு புதிய செயலிழப்பு எழுத்து பாதுகாக்கப்படுகிறது. பாதுகாக்கப்பட்ட வெளியேற்றமானது, Redis கீழே இருந்தாலும், தோல்வியுற்ற கணக்கின் சொந்த உள்ளூர் பின்னை அகற்றி, பகிரப்பட்ட வெளியேற்றத்தை உறுதிப்படுத்திய பிறகு அதை மீண்டும் சுத்தம் செய்கிறது. முந்தைய பகிரப்பட்ட பதில்கள் நிலுவையில் இருப்பதால் வெளியேற்றப்பட்ட உள்ளூர் பின்னை மீட்டெடுக்க முடியாது, ஏனெனில் பகிரப்பட்ட வெற்றிகள் ஒருபோதும் SQLite எழுதாது. பிற்பகுதியில் ஏற்பட்ட செயலிழப்பு ஒரு கணக்கை மறுபதிப்பு செய்யலாம்; பின்னர் ஏற்றுக்கொள்ளப்பட்ட பகிரப்பட்ட எழுத்து Redis இல் மட்டுமே உள்ளது. Redis தவறினால் உள்ளூர் வீழ்ச்சி நிலையைக் கலந்தாலோசிக்க வேண்டாம். இயக்கி முடக்கப்பட்ட நிலையில், புதிதாக தேர்ந்தெடுக்கப்பட்ட பின்கள் மரபு நான்கு-புலம் SQLite JSON வடிவத்தைத் தக்கவைத்துக் கொள்ளும்; Redis ரூட்டிங் மட்டுமே ஹாஷ் கணக்கு அடையாளத்தைச் சேர்க்கிறது. முன்னரே பெறப்பட்ட பின்கள் அவற்றின் காலாவதி எல்லையில் மீண்டும் சரிபார்க்கப்படுகின்றன. Redis குத்தகை அல்லாத தேர்வு கடையை மீண்டும் படிக்கிறது, ஆனால் ஒத்திசைவான குத்தகைத் திட்டமிடல், ப்ரீஃபெட்ச் மற்றும் பிளானிங் இடையே வெளியேற்றப்பட்ட பின்னை (ஏற்றுக்கொள்ளப்பட்ட சிறந்த முயற்சி சாளரம்) பயன்படுத்தலாம். ஒரு குத்தகை ஒப்பந்தம் நீடித்த உரிமைகோரலுக்குப் பிறகு கணக்குகளை மாற்ற முடியாது: நிராகரிக்கப்பட்ட அப்செர்ட்டில் அது கோரிக்கைக்காக உரிமைகோரப்பட்ட வேட்பாளரை மட்டுமே வைத்திருக்கும் மற்றும் பகிரப்பட்ட வெற்றியாளரைத் தொடாமல் விட்டுவிடும், எனவே நிகழ்வுகள் முழுவதும் ஒப்பந்தம் அந்த பாதையில் கட்டுப்படுத்தப்படுகிறது. மீதமுள்ள அட்டவணை இன்னும் பொருந்தும்: இது சேர்க்கை அமர்வு ஒட்டும் தன்மை, நேட்டிவ் Codex டர்ன் பின்கள், கணக்கு செமாஃபோர்கள், லாக்அவுட்கள், செலவு வரம்புகள், உள்ளமைவு அல்லது அழைப்பு பதிவுகள் ஆகியவற்றைப் பகிராது.

வன்பொருள்: ஒரு நிகழ்வுக்கு ஒரே நேரத்தில் நீண்ட `/v1/responses` என்பது a** நினைவகம்-பட்ஜெட்** கேள்வி (heap + inflight-byte / #10110). `N` இன்டிபென்டெண்ட் `DATA_DIR` s இன்னும் குவியல்களை பெருக்குகிறது: ஹோஸ்ட் RAM `N × cgroup` மறைக்க வேண்டும், "N = 8 உடன் ஒரு 16 Gi பாட்" அல்ல. ஒரு SQLite கோப்பில் `replicas > 1` வேண்டாம்.

ஸ்கெட்ச் எழுதவும் (இரண்டு குவியல்கள், இரண்டு தொகுதிகள் — அல்ல `deploy.replicas: 2`):

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

செயல்பாட்டில் உள்ள அடர்த்தி ( HTTP தனிமைப்படுத்தலின் சுருக்கம்) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). பகிரப்பட்ட நீடித்த நிலையில் உள்ள ஒரு தருக்கக் கிளஸ்டர் [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) ஆகும்.

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
