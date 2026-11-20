# 🐳 Docker Guide — OmniRoute (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker ડિપ્લોયમેન્ટનો સંપૂર્ણ સંદર્ભ. ઝડપથી શરૂ કરવા માટે, [README Docker વિભાગ](../README.md#-docker) જુઓ.

## વિષયસૂચિ

- [ઝડપી ચલાવટ](#quick-run)
- [પર્યાવરણ ફાઇલ સાથે](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ઉપલબ્ધ પ્રોફાઇલ્સ](#available-profiles)
- [OmniRoute Dockerમાં ચાલતું હોય ત્યારે હોસ્ટ CLI સાધનોનું રૂપરેખાંકન](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis સાઇડકાર](#redis-sidecar)
- [પ્રોડક્શન Compose](#production-compose)
- [Dockerfile સ્ટેજ](#dockerfile-stages)
- [મહત્ત્વપૂર્ણ પર્યાવરણ વેરિએબલ્સ](#critical-environment-variables)
- [Caddy (HTTPS) સાથે Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ઝડપી ટનલ](#cloudflare-quick-tunnel)
- [ઇમેજ ટૅગ્સ](#image-tags)
- [Dockerમાં ડૅશબોર્ડ અપડેટ્સ](#dashboard-updates-in-docker)
- [ઉપલબ્ધતા: ડિફૉલ્ટ SQLite માત્ર એક રેપ્લિકા માટે છે](#availability-default-sqlite-is-single-replica)
- [Dockerની અંદર Gemini પ્રાદેશિક ભૂલો](#gemini-regional-errors-inside-docker)
- [મહત્ત્વપૂર્ણ નોંધો](#important-notes)

---

## ઝડપી રન

> **એક આદેશમાં સ્વ-યજમાન?** [સ્વ-યજમાન માર્ગદર્શિકા](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (પ્રકાશિત છબી + Redis, ફક્ત-લૂપબેક, કોઈ પ્રોફાઇલ પસંદગી નથી) જુઓ. નીચે આપેલ ક્વિક રન એ વપરાશકર્તાઓ માટે સિંગલ-કન્ટેનર પાથ છે જેઓ પહેલેથી જ અન્યત્ર Redis ચલાવે છે.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## પર્યાવરણ ફાઇલ સાથે

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
# બેઝ પ્રોફાઇલ (કોઈ CLI સાધનો નહીં)
docker compose --profile base up -d

# CLI પ્રોફાઇલ (Claude Code, Codex, OpenClaw બિલ્ટ-ઇન)
docker compose --profile cli up -d

# હોસ્ટ પ્રોફાઇલ (પ્રાથમિક રીતે Linux માટે; હોસ્ટ CLI બાઇનરીઝને ફક્ત-વાંચન તરીકે માઉન્ટ કરે છે)
docker compose --profile host up -d

# વેબ પ્રોફાઇલ (વેબ-સેશન પ્રદાતાઓ માટે Chromium/Playwright)
docker compose --profile web up -d

# CLI + CLIProxyAPI સાઇડકારને જોડો
docker compose --profile cli --profile cliproxyapi up -d
```

## ઉપલબ્ધ પ્રોફાઇલ્સ

OmniRoute મુખ્ય ડિપ્લોયમેન્ટ સ્વરૂપો માટે Compose પ્રોફાઇલ્સ સાથે આવે છે. તમારા પર્યાવરણને અનુરૂપ પ્રોફાઇલ પસંદ કરો.

| પ્રોફાઇલ         | સેવા             | ક્યારે ઉપયોગ કરવો                                                                                                                                      | કમાન્ડ                                       |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (ડિફૉલ્ટ) | `omniroute-base` | હેડલેસ સર્વર / ન્યૂનતમ રનટાઇમ, કોઈ પ્રદાતા CLI બંડલ કરેલા નથી                                                                                          | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | `omniroute providers/setup/doctor` અને બંડલ કરેલા CLI (Codex, Claude Code, Droid, OpenClaw)ને કૉલ કરતા એજન્ટિક વર્કફ્લો                                | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | એવા Linux હોસ્ટ્સ કે જેઓ `~/.local/bin`, `~/.codex`, `~/.claude` વગેરેને ફક્ત-વાંચન તરીકે માઉન્ટ કરીને હોસ્ટ CLIની `network_mode` જેવી ઍક્સેસ ઇચ્છે છે | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | અપસ્ટ્રીમ CLI પ્રૉક્સી માટે પોર્ટ `8317` પર [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) સાઇડકાર ચલાવો                                  | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | બ્રાઉઝરની જરૂર હોય એવા વેબ-સેશન પ્રદાતાઓ: `gemini-web`, `claude-web`, `claude-turnstile` (`runner-web` બનાવે છે, Chromium સમાવિષ્ટ છે)                 | `docker compose --profile web up -d`         |

> અનેક પ્રોફાઇલ્સને જોડી શકાય છે: `docker compose --profile cli --profile cliproxyapi up -d`.

## જ્યારે OmniRoute Docker માં ચાલે ત્યારે હોસ્ટ CLI ટૂલ્સને કૉન્ફિગર કરવું

`omniroute setup-codex`, `setup-claude`, `config set <tool>` અને ડૅશબોર્ડનું
**કૉન્ફિગ સાચવો** બટન, બધાં `~/.codex/*.config.toml` જેવી ફાઇલો લખે છે. આ પાથનો
અર્થ ફક્ત એ જ મશીન પર હોય છે જ્યાં CLI ખરેખર ચાલે છે. તેમને કન્ટેનરની અંદર
ચલાવવાથી ફાઇલ કન્ટેનરના પોતાના હોમ (`/home/node` —
ઇમેજ `USER node` તરીકે ચાલે છે)માં લખાય છે, જ્યાં કોઈ હોસ્ટ CLI તેને ક્યારેય
વાંચશે નહીં અને કન્ટેનર ફરી બનાવવામાં આવે તે ક્ષણે તે કાઢી નાખવામાં આવશે.

OmniRoute આ પરિસ્થિતિ શોધી કાઢે છે અને તમે ઉપયોગ ન કરી શકો તેવી સફળતા
દર્શાવવાને બદલે સૂચનાઓ સાથે લખવાનો ઇનકાર કરે છે: CLI `2` સાથે બહાર નીકળે છે
અને API `containerEphemeralTarget: true` સાથે `422` જવાબ આપે છે.

### ભલામણ કરેલ: CLI ને હોસ્ટ પર અને OmniRoute ને Docker માં ચલાવો

કન્ટેનર API પ્રદાન કરે છે; CLI તમારા હોસ્ટ ટૂલ્સને કૉન્ફિગર કરે છે.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI ને કન્ટેનર તરફ નિર્દેશિત કરો
omniroute setup-codex                      # તમારા હોસ્ટ પરના વાસ્તવિક ~/.codex માં લખે છે
```

જ્યારે Codex, Claude Code, Cursor અથવા સમાન ટૂલ્સ તમારા લેપટોપ પર ચાલે ત્યારે
આ યોગ્ય પસંદગી છે — જે સામાન્ય સેટઅપ છે.

### વૈકલ્પિક: હોસ્ટ કૉન્ફિગ ડિરેક્ટરીઓને બાઇન્ડ-માઉન્ટ કરો (`host` પ્રોફાઇલ)

જો તમે કન્ટેનર પોતે જ તમારા હોસ્ટ કૉન્ફિગમાં લખે એવું ઇચ્છતા હો, તો
ડિરેક્ટરીઓને અંદર માઉન્ટ કરો અને `CLI_CONFIG_HOME` ને માઉન્ટ રૂટ તરફ નિર્દેશિત
કરો. `host` પ્રોફાઇલ આ પહેલેથી જ કરે છે:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

બાઇન્ડ માઉન્ટ જ પાથને વિશ્વસનીય બનાવે છે: OmniRoute
`/proc/self/mountinfo` વાંચે છે અને માઉન્ટ કરેલા પાથમાં (તેમજ એવી
ડિરેક્ટરીઓમાં કે જેમનાં ચાઇલ્ડ પાથ માઉન્ટ થયેલા હોય, જે ઉપરના
`/host-home` ના બંધારણને બરાબર અનુરૂપ છે) લખવાની મંજૂરી આપે છે, જ્યારે
માઉન્ટ ન કરેલા પાથમાં લખવાનો ઇનકાર કરવાનું ચાલુ રાખે છે.

### વૈકલ્પિક માર્ગ: કન્ટેનરના પોતાના CLI ને કૉન્ફિગર કરો (સંયમપૂર્વક ઉપયોગ કરો)

જ્યારે CLI ખરેખર કન્ટેનરની અંદર જ હોય (`cli` પ્રોફાઇલ), ત્યારે લખવાની ક્રિયા
ઇરાદાપૂર્વકની હોય છે. કોઈપણ `setup-*` કમાન્ડને `--allow-container-write`
આપો અથવા સર્વર માટે `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` સેટ કરો.
લખવાની ક્રિયા આગળ વધશે, પણ સાથે ચેતવણી મળશે કે તે કન્ટેનર કરતાં વધુ સમય
ટકશે નહીં.

> **સુરક્ષા ચેતવણી — `cli` પ્રોફાઇલ + `docker.sock` માઉન્ટ.**
> કન્ટેનરની અંદરનું ઑટો-અપડેટર હોસ્ટ ડિમન દ્વારા સ્ટૅક ફરી બનાવી શકે તે માટે
> `cli` પ્રોફાઇલ `/var/run/docker.sock` ને બાઇન્ડ-માઉન્ટ કરે છે
> (`src/lib/system/autoUpdate.ts` તે સૉકેટ માટે તપાસ કરે છે અને તે ગેરહાજર હોય
> ત્યારે Docker પાથને છોડી દે છે). તે સૉકેટ **હોસ્ટ-રૂટ વિશ્વાસની
> સીમા** છે: જે કંઈપણ ત્યાં પહોંચી શકે છે તે હોસ્ટ Docker ડિમનને
> રૂટ તરીકે નિયંત્રિત કરી શકે છે — તે હોસ્ટ પરના કોઈપણ કન્ટેનરને બનાવી,
> નિરીક્ષણ કરી, અટકાવી અને દૂર કરી શકે છે.
> પરિણામો:
>
> 1. **`cli` પ્રોફાઇલનો પોર્ટ ક્યારેય નેટવર્ક પર ખુલ્લો મૂકશો નહીં.** તેને
>    `127.0.0.1` પર પ્રકાશિત કરો
>    (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`) —
>    LAN પરથી પહોંચી શકાય તેવી `cli` પ્રોફાઇલ ડૅશબોર્ડ-સ્તરના કોઈપણ RCE ને
>    સંપૂર્ણ હોસ્ટ કબજામાં ફેરવી દે છે.
> 2. **`cli` પ્રોફાઇલમાં કોઈ વધારાની હોસ્ટ ડિરેક્ટરી બાઇન્ડ કરશો નહીં.**
>    Docker સૉકેટ સાથેનો કોઈપણ વધારાનો માઉન્ટ કન્ટેનરને તમારી ફાઇલસિસ્ટમ અને
>    હોસ્ટ કૉન્ફિગ પર સંપૂર્ણ વાંચવા/લખવાની ઍક્સેસ આપે છે. જો કોઈ ટૂલને
>    પ્રોજેક્ટ જોવાની જરૂર હોય, તો તેને CLI બાઇનરી સાથે સ્થાનિક રીતે ચલાવો —
>    તેને `cli` કન્ટેનરમાં માઉન્ટ કરશો નહીં.
>
> જો તમને કન્ટેનરની અંદર ઑટો-અપડેટની જરૂર ન હોય, તો `cli` પ્રોફાઇલને બંધ રાખો
> (`COMPOSE_PROFILES=core,redis` અથવા તેનાથી ટૂંકું). અન્ય પ્રોફાઇલ્સ
> Docker સૉકેટ માઉન્ટ કરતી નથી.
>
> MITM સંબંધિત થ્રેટ મોડેલ માટે `docs/security/MITM-TPROXY-DECRYPT.md`
> (git; `/docs` માં કમ્પાઇલ કરેલ નથી) અને
> `codex`/`claude-code`/`droid`/`openclaw` બાઇનરીની ઉત્પત્તિ શૃંખલા માટે
> `docs/security/SUPPLY_CHAIN.md` જુઓ.

## Redis સાઇડકાર

OmniRoute વિતરિત રેટ લિમિટર અને શેર કરેલી કૅશ માટે Redis પર આધાર રાખે છે. `redis` સેવા `docker-compose.yml` માં **હંમેશાં નિર્ધારિત** હોય છે (તેમાં કોઈ પ્રોફાઇલ ગેટ નથી) અને અન્ય કોઈપણ પ્રોફાઇલની સાથે શરૂ થાય છે.

| વિગત                   | મૂલ્ય                                   |
| ---------------------- | --------------------------------------- |
| ઇમેજ                   | `redis:7-alpine`                        |
| કન્ટેનરનું નામ         | `omniroute-redis`                       |
| આંતરિક પોર્ટ           | `6379`                                  |
| હોસ્ટ પોર્ટ (ઓવરરાઇડ)  | `REDIS_PORT` (ડિફૉલ્ટ `6379`)           |
| હોસ્ટ બાઇન્ડ (ઓવરરાઇડ) | `REDIS_BIND_HOST` (ડિફૉલ્ટ `127.0.0.1`) |
| વૉલ્યુમ                | `omniroute-redis-data` → `/data`        |
| હેલ્થચેક               | `redis-cli ping` (10 સેકન્ડનું અંતરાલ)  |

સંબંધિત એન્વાયરમેન્ટ વેરિએબલ્સ:

- `REDIS_URL` — ઍપમાં ઇન્જેક્ટ કરાતી કનેક્શન સ્ટ્રિંગ (ડિફૉલ્ટ રૂપે `redis://redis:6379`).
- `REDIS_PORT` — Redis કન્ટેનર માટે હોસ્ટ-સાઇડ પોર્ટ મૅપિંગ.
- `REDIS_BIND_HOST` — જે હોસ્ટ ઇન્ટરફેસ પર પોર્ટ પ્રકાશિત થાય છે. ડિફૉલ્ટ `127.0.0.1` છે.

> **ડિફૉલ્ટ રૂપે લૂપબૅક શા માટે:** સાઇડકાર `requirepass` વિના ચાલે છે અને ઍપ
> કન્ટેનર્સ compose નેટવર્ક (`redis:6379`) મારફતે તેના સુધી પહોંચે છે — પ્રકાશિત પોર્ટ
> ફક્ત હોસ્ટ-સાઇડ ટૂલિંગ (`redis-cli`, સ્થાનિક `npm run dev`) માટે જ છે. તેને
> `0.0.0.0` પર પ્રકાશિત કરવાથી તમારા LAN પરના દરેક હોસ્ટ માટે પ્રમાણીકરણ વિનાનું Redis ખુલ્લું થઈ જશે. જો તમે
> `REDIS_BIND_HOST=0.0.0.0` સેટ કરો, તો સેવા `command:` માં `--requirepass` પણ ઉમેરો.

**Redis અક્ષમ કરવાની** ભલામણ કરવામાં આવતી નથી (રેટ લિમિટર ઇન-મેમરી ફૉલબૅક પર અવક્રમિત થશે). જો તમારે તેમ કરવું જ હોય, તો `docker-compose.yml` માંનો `redis:` સર્વિસ બ્લૉક દૂર કરો/કમેન્ટ કરો અથવા તેને શૂન્ય સુધી સ્કેલ કરો:

```bash
docker compose up -d --scale redis=0
```

## પ્રોડક્શન Compose

ડેવની સાથે ચાલતા અલગ પ્રોડક્શન સ્નૅપશૉટ માટે `docker-compose.prod.yml` નો ઉપયોગ કરો.

| વિગત                   | મૂલ્ય                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| ફાઇલ                   | `docker-compose.prod.yml`                                                                     |
| ડિફૉલ્ટ ડૅશબોર્ડ પોર્ટ | `PROD_DASHBOARD_PORT=20130` (આંતરિક `${DASHBOARD_PORT:-20128}` સાથે મૅપ કરેલો)                |
| ડિફૉલ્ટ API પોર્ટ      | `PROD_API_PORT=20131`                                                                         |
| ઇમેજ                   | `omniroute:prod` (`runner-cli` ટાર્ગેટમાંથી બિલ્ડ કરેલી)                                      |
| Redis કન્ટેનર          | `omniroute-redis-prod` (`redis:8.6.2`, સમર્પિત `redis-prod-data` વૉલ્યુમ)                     |
| ડેટા વૉલ્યુમ           | `omniroute-prod-data` (નામિત, રિબિલ્ડ દરમિયાન જળવાયેલું)                                      |
| હેલ્થચેક               | `node healthcheck.mjs` + `redis-cli ping`, જેમાં `depends_on` Redis ની તંદુરસ્તી પર આધારિત છે |

ઉપયોગ કરવાની રીત:

```bash
# પ્રોડક્શન સ્ટૅક બિલ્ડ કરીને શરૂ કરો
docker compose -f docker-compose.prod.yml up -d --build

# લૉગ્સનું લાઇવ સ્ટ્રીમિંગ કરો
docker compose -f docker-compose.prod.yml logs -f

# બંધ કરો (વૉલ્યુમ્સ રાખો)
docker compose -f docker-compose.prod.yml down
```

પ્રોડ સ્ટૅક ડેવ compose ની સમાંતર ચાલે છે (કન્ટેનરનાં નામ, પોર્ટ અને વૉલ્યુમ અલગ છે), તેથી પ્રોડક્શન ચાલુ રહે ત્યારે તમે સ્થાનિક રીતે પુનરાવર્તિત વિકાસ ચાલુ રાખી શકો છો.

## ડોકરફાઇલ તબક્કાઓ

રિપોઝીટરી મલ્ટી-સ્ટેજ ડોકરફાઇલ (`Dockerfile`) મોકલે છે. ચાર તબક્કા ખુલ્લા છે; તમારા ઉપયોગના કેસ માટે યોગ્ય `target` પસંદ કરો.

| સ્ટેજ         | આધાર છબી              | હેતુ                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | deps (`npm ci --legacy-peer-deps`) ઇન્સ્ટોલ કરે છે અને `npm run build` ચલાવે છે (Turbopack બાય ડિફૉલ્ટ — નીચે બિલ્ડ-ટાઇમ સંસાધનો જુઓ)                                                                                                                                            |
| `runner-base` | `node:26-trixie-slim` | Next.js સ્ટેન્ડઅલોન આઉટપુટ સાથે ઉત્પાદન રનટાઇમ.** કોઈ પ્રદાતા CLIs બંડલ નથી.**                                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` અને વૈશ્વિક CLIs ઉમેરે છે : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** એજન્ટિક વર્કફ્લો માટે આને પસંદ કરો.**                                                                                                      |
| `runner-web`  | `runner-base`         | વેબ-સત્ર પ્રદાતાઓ માટે Playwright + એ Chromium બ્રાઉઝર (`--with-deps`) ઉમેરે છે: `gemini-web`, `claude-web`, `claude-turnstile`.** જ્યારે તમે તે પ્રદાતાઓનો ઉપયોગ કરો ત્યારે આને પસંદ કરો** — સાદી છબી તેના વિના વિનંતી સમયે નિષ્ફળ જાય છે (પ્રકાશન ચેનલો હેઠળ `-web` નોંધ જુઓ). |

ચોક્કસ લક્ષ્ય જાતે બનાવો:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### બિલ્ડ-ટાઇમ સંસાધનો

ત્રણ બિલ્ડ આર્ગ્સ `builder` સ્ટેજની કિંમતને નિયંત્રિત કરે છે. તેઓ બિલ્ડ-ટાઇમ માત્ર — `OMNIROUTE_MEMORY_MB` (નીચે) એક અલગ, રનટાઇમ નોબ છે.

| arg બનાવો                   | ડિફૉલ્ટ | અસર                                                                               |
| --------------------------- | ------- | --------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` વેબપેક સાથે બનાવે છે: લોઅર પીક મેમરી, ધીમી. `1` Turbopack માં પસંદ કરે છે.    |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | જન્મેલા `next build` માટે V8 હીપ સીલિંગ (`--max-old-space-size`) .                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | ફીડ્સ `CIRCLE_NODE_TOTAL`; આગળ પૃષ્ઠ-ડેટા સંગ્રહ માટે `workers = N - 1` મેળવે છે. |

`OMNIROUTE_BUILD_WORKERS` એ મોટા બિલ્ડર પર ઉછેર કરનાર છે અને જ્યારે અવરોધિત બિલ્ડ મૃત્યુ પામે છે ત્યારે શંકા કરે છે** પછી** `✓ Compiled successfully` દરેક પેજ-ડેટા વર્કર તેની પોતાની પ્રક્રિયા છે, અને પેરન્ટ `next build` પોતે પણ છે; જીવંત VPS પ્રજનન (ઇસ્યુ #7518) એ દરેક પ્રક્રિયાના પીક RSS ~ 4.5 GB પર `NODE_OPTIONS` હીપ ફ્લેગથી સ્વતંત્ર માપ્યું (Turbopack V8 હીપની બહાર native/Rust મેમરીમાં કમ્પાઇલ કરે છે). `2` નું ડિફોલ્ટ (→ 1 કાર્યકર, 2 પ્રક્રિયાઓ કુલ) 16 GB / 4 vCPU GitHub-હોસ્ટેડ દોડવીરો માટે છે જે પબ્લિશ પાઇપલાઇનનો ઉપયોગ કરે છે. `8` (→ 7 કામદારો) પર તે દોડવીરની મેમરી સમાપ્ત થઈ ગઈ અને બિલ્ડકિટ `ResourceExhausted: ... cannot allocate memory` સાથેનું પગલું નિષ્ફળ ગયું; `3` (→ 2 કામદારો) હજુ પણ ફિટ થયા ન હતા એકવાર પ્રતિ-પ્રક્રિયા RSS અનુમાનિત કરવાને બદલે સીધું માપવામાં આવ્યું હતું. `tests/unit/docker-build-memory-budget.test.ts` માપેલ આકૃતિ સામે અંકગણિત કરે છે અને જો કોઈ નોબ દોડવીરને પાછળ છોડી દે તો નિષ્ફળ જાય છે.

Turbopack મૂળ રસ્ટ મેમરીમાં કમ્પાઇલ કરે છે જે રહે છે** બહાર** V8 ઢગલો, તેથી `OMNIROUTE_BUILD_MEMORY_MB` તેને બાંધતું નથી. મેમરી સીલિંગ ધરાવતા હોસ્ટ પર બિલ્ડને પછી OOM કિલર દ્વારા SIGKILLed આવે છે જેમાં કોઈ પણ ભૂલ લખાણ વિના — તે ફક્ત મધ્ય `Creating an optimized production build` અટકી જાય છે, જે મેમરીની બહાર રહેવાને બદલે હેંગની જેમ વાંચે છે. તેથી જ `Dockerfile` /`OMNIROUTE_USE_TURBOPACK=0` થી વિપરીત, `npm run dev` / `npm run build` થી વિપરીત, જ્યાં Turbopack કોડ ડિફોલ્ટ છે: કોઈ બિલ્ડ આર્ગ્સ વિનાનું એકદમ `docker build .` (રેલ્વે અને અન્ય વન-ક્લિક હોસ્ટ્સ શું ચલાવે છે) મેમરી-કેપ્ડ બિલ્ડર પર શાંતિથી મૃત્યુ પામવું જોઈએ નહીં. પ્રકાશિત છબીઓ પહેલેથી જ `docker-publish.yml` માં સ્પષ્ટપણે `OMNIROUTE_USE_TURBOPACK=0` પસાર કરે છે. પુષ્કળ RAM ધરાવતા બિલ્ડર પર, ઝડપી બિલ્ડ માટે Turbopack પસંદ કરો:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` સક્ષમ છે, તેથી `next build` માતાપિતા ચલાવે છે** અને** એક કાર્યકર પ્રક્રિયા અને દરેક `OMNIROUTE_BUILD_MEMORY_MB` અલગથી સન્માન કરે છે. કન્ટેનરની ટોચમર્યાદાનું કદ તેના મૂલ્ય કરતાં લગભગ બમણું કરો, એકવાર નહીં.

આ વૃક્ષ પર માપવામાં આવે છે (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| બંડલર     | કન્ટેનરની ટોચમર્યાદા | પરિણામ                   |
| --------- | -------------------- | ------------------------ |
| Turbopack | 8 GiB / 16 GiB       | OOM-બંનેની હત્યા, ચુપચાપ |
| વેબપેક    | 8 GiB                | કામદાર SIGKILLed બનાવો   |
| વેબપેક    | 12 GiB               | સફળ, 11.1 GiB પર ટોચ પર  |

### રનટાઇમ ડિફોલ્ટ

`runner-base` દ્વારા નિકાસ કરાયેલ ડિફોલ્ટ્સ : `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Docker માં મેમરી વર્તન:

- છબી `OMNIROUTE_MEMORY_MB=1024` સેટ કરે છે અને તેમાંથી `NODE_OPTIONS=--max-old-space-size=1024` મેળવે છે.
- વાસ્તવિક સર્વર પ્રક્રિયા સ્ટેન્ડઅલોન લોન્ચર દ્વારા શરૂ કરવામાં આવે છે, જે `OMNIROUTE_MEMORY_MB` વાંચે છે અને `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` જોડે છે.
- નોડ છેલ્લા પુનરાવર્તિત `--max-old-space-size` મૂલ્યનો ઉપયોગ કરે છે, તેથી `OMNIROUTE_MEMORY_MB` સેટ કરવું અસરકારક Docker હીપ મર્યાદાને નિયંત્રિત કરે છે.
- કારણ કે ઇમેજ હંમેશા તેને સેટ કરે છે, લોન્ચરનું પોતાનું RAM-કેલિબ્રેટેડ ફોલબેક Docker હેઠળ ક્યારેય લાગુ પડતું નથી. વર્કલોડ માટે તેને સ્પષ્ટપણે વધારો (નીચેનું કોષ્ટક). કોડિંગ-એજન્ટ `/v1/responses` માટે `2048` હજુ પણ ખૂબ નાનું છે.

### કોડિંગ એજન્ટો માટે રનટાઇમ RAM

1 GiB Docker ડિફોલ્ટ એ dashboard/light-chat ફ્લોર છે, ઉત્પાદન કદ નથી. લાંબી `POST /v1/responses` બોડી (સેંકડો સંદેશાઓ, દસેક સાધનો) કમ્પ્રેશન દરમિયાન બહુવિધ ઇન-મેમરી ગ્રાફ જાળવી રાખે છે. બે ઓવરલેપિંગ ~ 3 MiB / ~ 750k-ટોકન વિનંતીઓએ V8 ને બંધ કરી દીધું છે.** 12 GiB** ઓલ્ડ-સ્પેસ (`FATAL ERROR: Reached heap limit`) અને 16 GiB cgroup OOM પણ હિટ કરો. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ.

કદ** ઢગલા ઉપર cgroup `--memory`** — નેટિવ બફર્સ, SQLite અને કમ્પ્રેશન ઇન્ટરમીડિયેટ V8 ની બહાર બેસે છે.

| વર્કલોડ                             | `OMNIROUTE_MEMORY_MB` | કન્ટેનર / cgroup     | નોંધો                                                                                     |
| ----------------------------------- | --------------------- | -------------------- | ----------------------------------------------------------------------------------------- |
| ડેશબોર્ડ, એક હળવી ચેટ               | `1024` (ઇમેજ ડિફૉલ્ટ) | ≥2 GiB               |                                                                                           |
| એક કોડિંગ એજન્ટ (Claude/Codex/Grok) | `8192`                | ≥10 GiB              | લાક્ષણિક સિંગલ-સત્ર `/v1/responses`                                                       |
| બે સમવર્તી લાંબા `/v1/responses`    | `10240`–`12288`       | ≥12–16 GiB           | ~ 12 GiB ઢગલા પર V8 એબોર્ટ માપ્યું                                                        |
| ત્રણ + સમવર્તી લાંબા સંદર્ભો        | એક પ્રક્રિયા પર ન કરો | શ્રેણીબદ્ધ / વધુ RAM | ડિફોલ્ટ હેવીવેઇટ પ્રવેશ 1 ઇન-ફ્લાઇટ છે; તેને RAM વગર ઉછેરવાથી ગર્ભપાતનો પુનઃ પરિચય થાય છે |

જ્યારે `OMNIROUTE_MEMORY_MB` હોય ત્યારે બેર મેટલ પર `omniroute serve` ~ ના 35% RAM (ક્લેમ્પ્ડ `[512, 4096]`) ને માપાંકિત કરે છે** અનસેટ** . Docker હંમેશા `1024` સેટ કરે છે, જેથી કેલિબ્રેશન ક્યારેય સત્તાવાર ઈમેજમાં ન ચાલે.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## મહત્વપૂર્ણ એન્વાયરમેન્ટ વેરિએબલ્સ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) માં દસ્તાવેજીકૃત ડિફૉલ્ટ્સ ઉપરાંત, Docker હેઠળ ચલાવતી વખતે નીચેના વેરિએબલ્સ સૌથી વધુ મહત્વ ધરાવે છે:

| વેરિએબલ                       | હેતુ                                                                                                                                                                                                                                                                          | ડિફૉલ્ટ                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket બ્રિજ માટેનું સહિયારું સિક્રેટ. **પ્રોડક્શનમાં આવશ્યક** — તેને મજબૂત રેન્ડમ સ્ટ્રિંગ પર સેટ કરો.                                                                                                                                                                    | સેટ કરેલું નથી (આપવું આવશ્યક છે) |
| `REDIS_URL`                   | રેટ લિમિટર / કૅશ બૅકએન્ડ માટેની કનેક્શન સ્ટ્રિંગ                                                                                                                                                                                                                              | `redis://redis:6379`             |
| `REDIS_PORT`                  | બંડલ કરેલા Redis કન્ટેનર માટેનો હોસ્ટ-સાઇડ પોર્ટ                                                                                                                                                                                                                              | `6379`                           |
| `REDIS_BIND_HOST`             | હોસ્ટ ઇન્ટરફેસ કે જેના પર બંડલ કરેલો Redis પોર્ટ પ્રકાશિત થાય છે (તમે AUTH ઉમેરો નહીં ત્યાં સુધી લૂપબૅક)                                                                                                                                                                      | `127.0.0.1`                      |
| `AUTO_UPDATE_HOST_REPO_DIR`   | સ્વયં-અપડેટ વર્કફ્લો માટે `cli` પ્રોફાઇલમાં `/workspace/omniroute` પર માઉન્ટ કરેલો હોસ્ટ પાથ                                                                                                                                                                                  | `.` (વર્તમાન ડિરેક્ટરી)          |
| `OMNIROUTE_MEMORY_MB`         | Docker સ્ટૅન્ડઅલોન સર્વર માટે રનટાઇમ Node હીપની મહત્તમ મર્યાદા; ઉપર આપેલા ઇમેજ ડિફૉલ્ટને ઓવરરાઇડ કરે છે. કોડિંગ એજન્ટ્સ: `8192`+ ([રનટાઇમ RAM](#runtime-ram-for-coding-agents) જુઓ).                                                                                          | `1024`                           |
| `DASHBOARD_PORT` / `API_PORT` | ડૅશબોર્ડ (20128) અને API (20129) માટે એક્સપોઝ કરેલા પોર્ટ્સને ઓવરરાઇડ કરો                                                                                                                                                                                                     | `20128` / `20129`                |
| `APP_BIND_HOST`               | હોસ્ટ ઇન્ટરફેસ કે જેના પર docker-compose ડૅશબોર્ડ/API/live-WS પોર્ટ્સ પ્રકાશિત કરે છે. `REQUIRE_API_KEY=false` (ડિફૉલ્ટ) સાથે, `0.0.0.0` અનામી `/v1` પ્રૉક્સીને LAN સમક્ષ એક્સપોઝ કરે છે — ફક્ત `REQUIRE_API_KEY=true` હોય અથવા આગળ રિવર્સ પ્રૉક્સી હોય ત્યારે જ વ્યાપ વધારો. | `127.0.0.1`                      |
| `CLIPROXY_BIND_HOST`          | હોસ્ટ ઇન્ટરફેસ કે જેના પર docker-compose `cliproxyapi` સાઇડકાર પ્રકાશિત કરે છે — તેના ડેટા વૉલ્યુમમાં પ્રોવાઇડર ક્રેડેન્શિયલ્સ સંગ્રહિત હોય છે.                                                                                                                               | `127.0.0.1`                      |
| `OMNIROUTE_PLUGINS_DIR`       | ડિરેક્ટરી જેમાંથી રનટાઇમ પ્લગઇન સ્કૅનર વાંચે છે અને જેમાં ઇન્સ્ટૉલ કરે છે. પ્લગઇન્સ bind-mount કરેલા હોય ત્યારે તેને સેટ કરો: ડિફૉલ્ટ `HOME`ને અનુસરે છે, જેને ઇમેજે export કર્યું હોય તે જરૂરી નથી.                                                                          | `~/.omniroute/plugins`           |
| `OMNIROUTE_BASE_PATH`         | ઍપને રિવર્સ પ્રૉક્સીની પાછળ પ્રકાશિત કરવામાં આવે ત્યારે URL સબપાથ (દા.ત. `/omniroute`)                                                                                                                                                                                        | _(ખાલી = રૂટ)_                   |
| `NEXT_PUBLIC_BASE_URL`        | સબપાથ સહિત સાર્વજનિક બ્રાઉઝર ઑરિજિન (દા.ત. `https://host/omniroute`)                                                                                                                                                                                                          | સેટ કરેલું નથી                   |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` માટેનો હોસ્ટ-સાઇડ ડૅશબોર્ડ પોર્ટ                                                                                                                                                                                                                    | `20130`                          |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` સાઇડકાર માટેનો હોસ્ટ-સાઇડ પોર્ટ                                                                                                                                                                                                                                 | `8317`                           |

## સબપાથ પર રિવર્સ પ્રોક્સી (Traefik/nginx)

Next.js `basePath` સ્ટેન્ડઅલોન બંડલમાં કમ્પાઇલ થયેલ છે. OmniRoute એપ રુટ પર સેન્ટિનલ ફાઇલમાં બેક કરેલ મૂલ્યને રેકોર્ડ કરે છે ( `npm run build` દરમિયાન લખાયેલ; `scripts/docker/ensure-docker-base-path.mjs` દ્વારા વાંચવામાં આવે છે) અને જ્યારે કન્ટેનર શરૂ થાય ત્યારે `OMNIROUTE_BASE_PATH` સાથે તેની સરખામણી કરે છે. જ્યારે તેઓ અલગ પડે છે અને ઇમેજ ડોમેન રૂટ માટે બનાવવામાં આવી હતી, ત્યારે એન્ટ્રીપોઇન્ટ સ્ટેન્ડઅલોન મેનિફેસ્ટને ફરીથી લખે છે, એમ્બેડેડ `basePath`/`assetPrefix` લિટરલ્સ (આગલું 16 SSR એસેટ URLs `assetPrefix` એકલા — માંથી રેન્ડર કરે છે, પેચર તેમાં સબપાથને મિરર કરે છે URLs, `/_next/static` તરીકે મેનિફેસ્ટ, મીડિયા આયાત, પ્રીરેન્ડર કરેલ એરર પેજીસ) અને `node dev/run-standalone.mjs` રન થાય તે પહેલા ક્લાયન્ટ `process.env` shim.

### કંપોઝ બિલ્ડ (ભલામણ કરેલ)

બંને ચલોને `.env` માં સેટ કરો, પછી ફરીથી બનાવો જેથી છબી અને રનટાઇમ સંમત થાય:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` `OMNIROUTE_BASE_PATH` Docker બિલ્ડ-આર્ગ તરીકે અને રનટાઇમ એન્વાયર્નમેન્ટ વેરીએબલ તરીકે આગળ ધપાવે છે.

### પૂર્વ-બિલ્ટ રૂટ ઇમેજ + રનટાઇમ સબપાથ

પ્રકાશિત `cheaperinference/omniroute:*` છબીઓ ડોમેન રૂટ માટે બનાવવામાં આવી છે. તમે હજુ પણ રનટાઇમ પર `OMNIROUTE_BASE_PATH` સેટ કરી શકો છો; સ્ટાર્ટઅપ પર એકવાર કન્ટેનર બંડલને પેચ કરે છે. તેને મેળ ખાતા સાર્વજનિક મૂળ સાથે જોડો:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

ફોરવર્ડ કરવા માટે રિવર્સ પ્રોક્સીને ગોઠવો** સંપૂર્ણ** બાહ્ય માર્ગ (ઉપસર્ગને છીનવો નહીં). ટ્રેફિકે `PathPrefix(`/omniroute `)` `StripPrefix` વિના કન્ટેનરમાં રૂટ કરવું જોઈએ, તેથી Next.js `/omniroute/...` મેળવે છે અને `/omniroute/_next/...` પાસેથી અસ્કયામતો આપે છે.

Docker હેલ્થચેક સક્રિય `OMNIROUTE_BASE_PATH` સાથે ઉપસર્ગ ધરાવતા હળવા વજનના `/healthz` જીવનચક્રના અંતિમ બિંદુની તપાસ કરે છે. human/dashboard ડાયગ્નોસ્ટિક્સ માટે `/api/monitoring/health` ઉપલબ્ધ રહે છે; કન્ટેનર HEALTHCHECK તેની તરફ પાછું નિર્દેશ કરવા માટે (ઉદાહરણ તરીકે ડીપ હેલ્થ એન્ફોર્સમેન્ટ માટે), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` સેટ કરો. તે માર્ગ એ છે** ઊંડા** તપાસો (DB + મોનીટરીંગ સારાંશ) — Docker ના અવારનવાર `HEALTHCHECK` માટે યોગ્ય છે જો તમે પાછા પસંદ કરો છો, પરંતુ** નથી** Kubernetes `livenessProbe` અંતરાલો માટે.

ઓર્કેસ્ટ્રેટર્સ માટે (કુબરનેટ્સ, નોમાડ, વગેરે):

| તપાસ             | પસંદ કરો                                                             | ટાળો                                                   |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------ |
| જીવંતતા          | મુખ્ય પોર્ટ પર HTTP `GET /livez`, અથવા TCP (`PORT`, ડિફોલ્ટ `20128`) | જીવંતતા તરીકે`/api/monitoring/health`                  |
| તત્પરતા          | HTTP `GET /healthz`                                                  | ચુસ્ત સમયસમાપ્તિ કે જે ઇવેન્ટ-લૂપ વ્યસ્તને મૃત માને છે |
| ડીપ / બ્લેકબોક્સ | `/api/monitoring/health`                                             | —                                                      |

`/healthz` અહેવાલ પ્રક્રિયા જીવનચક્ર (`ok` / `starting` / `stopping`). `/livez` માત્ર પ્રક્રિયા-જીવંત છે (200 જ્યારે પણ હેન્ડલર ચલાવી શકે છે; તે તૈયારીની રાહ જોતો નથી). બંને હજુ પણ વિનંતી હેન્ડલિંગ તરીકે સમાન નોડ ઇવેન્ટ લૂપ પર ચાલે છે, તેથી CPU-બાઉન્ડ કેટલોગ અથવા કમ્પ્રેશન વર્ક તેમને — વ્યસ્ત ≠ ડેડમાં વિલંબ કરી શકે છે. જો HTTP સમય સમાપ્ત થાય તો TCP જીવંતતાને પ્રાધાન્ય આપો. સંપૂર્ણ તપાસ માર્ગદર્શન: [મોનિટરિંગ માર્ગદર્શિકા — Kubernetes ચકાસણી ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## કેડી સાથેDocker કંપોઝ કરો (HTTPS ઓટો-TLS)

Caddy ની ઓટોમેટિક SSL જોગવાઈનો ઉપયોગ કરીનેOmniRoute સુરક્ષિત રીતે એક્સપોઝ કરી શકાય છે. ખાતરી કરો કે તમારા ડોમેનનું DNS એ રેકોર્ડ તમારા સર્વરના IP પર નિર્દેશ કરે છે.

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

Caddy અપસ્ટ્રીમ કન્ટેનર માટે માનક ફોરવર્ડિંગ હેડરો સેટ કરે છે. OmniRoute OAuth કૉલબૅક્સ અને જનરેટેડ પબ્લિક લિંક્સ માટે કેનોનિકલ પબ્લિક ઓરિજિન તરીકે `NEXT_PUBLIC_BASE_URL` ઉપયોગ કરે છે; અધિકૃત ડેશબોર્ડ લખે છે તે જ-મૂળની વિનંતીઓ વત્તા સત્ર-બાઉન્ડ CSRF સુરક્ષાનો ઉપયોગ કરે છે. ફક્ત અદ્યતન જમાવટ માટે જ `OMNIROUTE_TRUST_PROXY` સક્ષમ કરો જ્યાં તમે ઇરાદાપૂર્વક OmniRoute સ્પષ્ટ ગોઠવણીને બદલે વિશ્વસનીય ફોરવર્ડ હેડરોમાંથી સાર્વજનિક મૂળ મેળવવા માંગતા હોવ.

## Cloudflare Quick Tunnel

Docker ડિપ્લોયમેન્ટ્સ માટેના ડૅશબોર્ડ સપોર્ટમાં `Dashboard → Endpoints` પર એક-ક્લિક **Cloudflare Quick Tunnel** સામેલ છે. પ્રથમ વખત સક્ષમ કરવાથી માત્ર જરૂર પડે ત્યારે જ `cloudflared` ડાઉનલોડ થાય છે, તમારા વર્તમાન `/v1` એન્ડપોઇન્ટ માટે અસ્થાયી ટનલ શરૂ થાય છે અને જનરેટ થયેલ `https://*.trycloudflare.com/v1` URL તમારા સામાન્ય સાર્વજનિક URLની સીધી નીચે દેખાય છે.

સક્રિય ટનલની સ્થિતિ બદલ્યા વિના એન્ડપોઇન્ટ ટનલ પૅનલ્સ (Cloudflare, Tailscale, ngrok)ને `Settings → Appearance`માંથી બતાવી અથવા છુપાવી શકાય છે.

### ટનલ નોંધો

- Quick Tunnel URLs અસ્થાયી હોય છે અને દરેક રીસ્ટાર્ટ પછી બદલાય છે.
- OmniRoute અથવા કન્ટેનર રીસ્ટાર્ટ થયા પછી Quick Tunnels આપમેળે પુનઃસ્થાપિત થતા નથી. જરૂર પડે ત્યારે તેમને ડૅશબોર્ડમાંથી ફરી સક્ષમ કરો.
- મેનેજ્ડ ઇન્સ્ટોલ હાલમાં `x64` / `arm64` પર Linux, macOS અને Windowsને સપોર્ટ કરે છે.
- મર્યાદિત કન્ટેનર પર્યાવરણોમાં વધુ પડતી QUIC UDP બફર ચેતવણીઓ ટાળવા માટે મેનેજ્ડ Quick Tunnels ડિફૉલ્ટ રૂપે HTTP/2 ટ્રાન્સપોર્ટનો ઉપયોગ કરે છે. જો તમે અલગ ટ્રાન્સપોર્ટ ઇચ્છતા હો, તો `CLOUDFLARED_PROTOCOL=quic` અથવા `auto` સેટ કરો.
- Docker ઇમેજિસ સિસ્ટમ CA રૂટ્સને સામેલ કરે છે અને તેમને મેનેજ્ડ `cloudflared`ને મોકલે છે, જે કન્ટેનરની અંદર ટનલ બુટસ્ટ્રૅપ થાય ત્યારે TLS ટ્રસ્ટ નિષ્ફળતાઓ ટાળે છે.
- જો તમે ઇચ્છતા હો કે OmniRoute નવું બાઇનરી ડાઉનલોડ કરવાને બદલે હાલના બાઇનરીનો ઉપયોગ કરે, તો `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` સેટ કરો.

## છબી ટૅગ્સ

| છબી                          | ટેગ      | કદ      | વર્ણન                                                  |
| ---------------------------- | -------- | ------- | ------------------------------------------------------ |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | સર્વોચ્ચ** પ્રકાશિત** સ્થિર SemVer ( git `main` નહીં ) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | GitOps માટે આ વર્ગના ટેગને પિન કરો                     |

સમાન છબીઓ ત્રણ રીપોઝીટરીઝમાં પ્રકાશિત કરવામાં આવી છે, જેમાં સમાન પ્રતિ-આર્કિટેક્ચર ડાયજેસ્ટ છે: `cheaperinference/omniroute` (Docker હબ, સસ્તી અનુમાન સંસ્થા, 3.8.53 થી), `ghcr.io/cheaper-inference/omniroute` અને લેગસી `diegosouzapw/omniroute`, જે તેના પુલ ઇતિહાસને જાળવી રાખે છે અને હજુ પણ દરેક રિલીઝ મેળવે છે. હાલની `diegosouzapw/omniroute` જમાવટ અપડેટ થતી રહે છે; ઇમેજનું નામ બદલવું વૈકલ્પિક છે. નીચેની `:next` / `:next-web` પ્રી-રીલીઝ ચેનલ ફક્ત `diegosouzapw/omniroute` અને GHCR માટે જ પ્રકાશિત કરવામાં આવી છે.

મલ્ટી-પ્લેટફોર્મ મેનિફેસ્ટ: `linux/amd64` + `linux/arm64` મૂળ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker મેળ ખાતા આર્કિટેક્ચરને આપમેળે પસંદ કરે છે; જો તમારે ARM હોસ્ટ પર AMD64 ઇમ્યુલેશન દબાણ કરવાની જરૂર હોય તો `--platform linux/amd64` પાસ કરો.

### ચેનલો રિલીઝ કરો

OmniRoute સ્થિર પ્રકાશનો, સક્રિય પ્રકાશન-શાખા પરીક્ષણ અને વિકાસ નિર્માણ માટે અલગ Docker ચેનલો પ્રકાશિત કરે છે.

| ચેનલ                            | સ્ત્રોત                            | પરિવર્તનશીલતા                 | ભલામણ કરેલ ઉપયોગ                                                                                                            |
| ------------------------------- | ---------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned રિલીઝ             | અપરિવર્તનશીલ                  | પ્રોડક્શન ડિપ્લોયમેન્ટ કે જે ચોક્કસ રિલીઝ પિન કરે છે                                                                        |
| `:latest` / `:latest-web`       | સર્વોચ્ચ** પ્રકાશિત** સ્થિર SemVer | પરિવર્તનશીલ સ્થિર પોઇન્ટર     | સ્થિર પ્રકાશનોને અનુસરે છે** પછી** SemVer પબ્લિશ જોબ — કરે છે** નથી** `main` અથવા અપ્રકાશિત `release/v*` કમિટ્સને ટ્રૅક કરો |
| `:next` / `:next-web`           | વર્તમાન ડિફોલ્ટ `release/v*` શાખા  | પરિવર્તનીય પ્રી-રીલીઝ પોઇન્ટર | પરીક્ષણ સુધારાઓ કે જે સક્રિય પ્રકાશન શાખા પર ઉતર્યા છે પરંતુ હજુ સુધી સ્થિર પ્રકાશનમાં નથી                                  |
| `:main` / `:main-web`           | `main` શાખા                        | પરિવર્તનશીલ વિકાસ નિર્દેશક    | માત્ર વિકાસ અને એકીકરણ પરીક્ષણ                                                                                              |

#### વેબ-સત્ર પ્રદાતાઓ: `-web` છબીઓ

ઉપરની દરેક ચેનલ `-web` ટેગ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) તરીકે બમણી થાય છે, જે `runner-web` સ્ટેજ — સમાન ઇમેજ વત્તા Playwright અને ક્રોમિયમ બ્રાઉઝરથી બનેલ છે. સાદી છબી જહાજો** વગર** ક્રોમિયમ; `gemini-web`, `claude-web` અને `claude-turnstile` તેની જરૂર છે.

નિષ્ફળતા વિલંબિત છે, સ્ટાર્ટઅપ-ટાઇમ નહીં: તે પ્રદાતાઓ તેમના મોડલની સૂચિ બનાવે છે અને ડેશબોર્ડમાં કનેક્ટેડ તરીકે બતાવે છે, અને માત્ર પ્રથમ વિનંતી સાથે નિષ્ફળ થાય છે

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

જો તમે તે પ્રદાતાઓનો ઉપયોગ કરો છો, તો તમે જે ચેનલ પર પહેલાથી જ — પર છો તેના `-web` ટેગને ખેંચો, બીજું કંઈ બદલાતું નથી. npm/CLI ઇન્સ્ટોલ પર (કોઈ Docker છબી નથી), સમકક્ષ ખૂટે છે તે બ્રાઉઝર બાઈનરી છે: હોસ્ટ પર `npx playwright install chromium` ચલાવો.

#### પ્રી-રીલીઝ ચેનલનો ઉપયોગ કરીને

`next` ચેનલ વર્તમાન ડિફોલ્ટ `release/v*` શાખાના દરેક પુશ પર પુનઃબીલ્ડ થાય છે અને AMD64 અને ARM64 બંને માટે પ્રકાશિત થાય છે. જૂની જાળવણી શાખાઓ તેને ફરીથી લખી શકતી નથી. ચેનલ સુધારાઓ માટે ખેંચી શકાય તેવી ઈમેજ પૂરી પાડે છે કે જે આગામી સ્થિર ટેગ કાપવામાં આવે તે પહેલા સક્રિય પ્રકાશન શાખામાં મર્જ થઈ ગયા છે.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker કંપોઝ માટે, પસંદ કરેલ પ્રોફાઇલ દ્વારા ઉપયોગમાં લેવાતા ઇમેજ ટેગને ઓવરરાઇડ કરો, પછી સેવાને ખેંચો અને ફરીથી બનાવો:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### સલામતી અને રોલબેક

`next` એ ફ્લોટિંગ પૂર્વ-પ્રકાશન ચેનલ છે. તે સક્રિય પ્રકાશન શાખા પર કોઈપણ દબાણ પર બદલાઈ શકે છે અને છે** ઉત્પાદન ઉપયોગ માટે સમર્થિત નથી** . ચોક્કસ બિલ્ડનું મૂલ્યાંકન કરતી વખતે ઇમેજ ડાયજેસ્ટને પિન કરો:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

પરીક્ષણ કરતા પહેલા, OmniRoute ડેટા વોલ્યુમ અથવા બાઇન્ડ-માઉન્ટેડ ડેટા ડિરેક્ટરીનો બેકઅપ લો. રોલ બેક કરવા માટે, અગાઉ વપરાયેલ સ્થિર સંસ્કરણ અથવા ડાયજેસ્ટને પુનઃસ્થાપિત કરો અને કન્ટેનરને ફરીથી બનાવો:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

રિલીઝ-બ્રાંચ બિલ્ડ ક્યારેય `latest` ખસેડી શકતું નથી; માત્ર એક યોગ્ય સ્થિર સિમેન્ટીક સંસ્કરણ જ સ્થિર પોઇન્ટરને પ્રોત્સાહન આપી શકે છે. `next` ઈમેજીસ રીલીઝ ઈમેજ ઈન્સ્પેક્શનને જાળવી રાખે છે અને CRITICAL-Vulnerability ગેટને બ્લોક કરે છે.

**`latest` એ ગિટ માટે ચલણ ગેરંટી નથી.** `main` પર અથવા સક્રિય `release/v*` શાખા પર મર્જ કરેલ સુધારાઓ છે** નથી** `:latest` માં જ્યાં સુધી સ્થિર SemVer ઇમેજ પ્રકાશિત ન થાય અને પબ્લિશ જોબ `:latest` (તે SemVer જેવી જ ડાયજેસ્ટ) ને પ્રોત્સાહન આપે. જો `latest` સ્થિર દેખાય છે જ્યારે GitHub પહેલેથી જ ફિક્સ બતાવે છે, તો પ્રકાશન શાખાને ચકાસવા માટે `:next` ખેંચો અથવા SemVer ટેગની રાહ જુઓ.

| તમે ઈચ્છો છો                                                   | ઉપયોગ કરો                        |
| -------------------------------------------------------------- | -------------------------------- |
| GitOps / ઉત્પાદન કે જે વહી જવું જોઈએ નહીં                      | પિન `:X.Y.Z` (અથવા છબી ડાયજેસ્ટ) |
| પ્રકાશિત સ્ટેબલ્સને અનુસરો અને દરેક રિલીઝ પર રિક્રિએટ સ્વીકારો | `:latest`                        |
| અપ્રકાશિત `release/v*` કમિટનું પરીક્ષણ કરો                     | `:next` (ઉત્પાદન નહીં)           |
| ટેસ્ટ `main`                                                   | `:main` (ઉત્પાદન નહીં)           |

## Dockerમાં ડેશબોર્ડ અપડેટ્સ

પ્રકાશિત ઇમેજવાળું કન્ટેનર પોતાને બદલી શકતું નથી. જ્યારે OmniRoute શોધે છે કે તે કન્ટેનરની અંદર ચાલી રહ્યું છે (`.git` checkout નથી અને npm ઇન્સ્ટોલ પણ નથી), ત્યારે હોમ ડેશબોર્ડનું અપડેટ બેનર npm/git સૂચનાઓને બદલે ચલાવવા માટેનો હોસ્ટ કમાન્ડ કૉપી બટન સાથે બતાવે છે:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

સેવાનું નામ `AUTO_UPDATE_SERVICE`માંથી આવે છે (ડિફૉલ્ટ `omniroute`, જે `docker-compose.selfhost.yml`માંની સેવા છે). `pull` ફક્ત ફ્લોટિંગ ટૅગ (`latest`, `next`)ને આગળ વધારે છે; પિન કરેલા `:X.Y.Z` ટૅગ માટે પહેલાં ટૅગમાં ફેરફાર કરો.

### હોસ્ટ ટ્રિગર ફાઇલ વડે એક-ક્લિક અપડેટ્સ

`/var/run/docker.sock` માઉન્ટ કર્યા વિના **હમણાં અપડેટ કરો** કાર્યરત રાખવા માટે (જે કન્ટેનરને હોસ્ટ પર root ઍક્સેસ આપે છે — ઉપર આપેલી `cli` પ્રોફાઇલ ચેતવણી જુઓ), OmniRoute સેવા પર `DOCKER_UPDATE_TRIGGER_FILE` સેટ કરો અને હોસ્ટ પર વૉચર ચલાવો:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

પાથ `DATA_DIR`ની અંદર હોવો આવશ્યક છે (સાપેક્ષ મૂલ્યો તેની સામે રિઝોલ્વ થાય છે); અન્ય કંઈપણ નકારવામાં આવે છે. ત્યારબાદ **હમણાં અપડેટ કરો** તે ફાઇલમાં `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` લખે છે, `202` જવાબ આપે છે અને નવું વર્ઝન લાઇવ થાય ત્યાં સુધી ડેશબોર્ડ `/api/system/version`નું પોલિંગ કરીને પછી ફરી લોડ થાય છે. આ મોડમાં OmniRoute ક્યારેય શેલ કે Docker કમાન્ડ ચલાવતું નથી. દરેક અપડેટ ક્રિયાની જેમ, વિનંતી ફક્ત લૂપબૅક/LAN ક્લાયન્ટ્સ પાસેથી જ સ્વીકારવામાં આવે છે.

બાઇન્ડ-માઉન્ટ કરેલી ડેટા ડિરેક્ટરી હોસ્ટને નિરીક્ષણ માટે સ્થિર પાથ આપે છે. `systemd` યુનિટ્સના નમૂના (`/srv/omniroute`ને તમારી compose ફાઇલ અને `data/` ધરાવતી ડિરેક્ટરી અનુસાર સમાયોજિત કરો):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute ડેશબોર્ડ અપડેટ વિનંતીઓનું નિરીક્ષણ કરો

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute કન્ટેનર pull કરીને ફરી બનાવો

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

સેવા pull કરતાં પહેલાં વિનંતી દૂર કરે છે, જેથી નિષ્ફળ રન વારંવાર લૂપ ન થાય. `DOCKER_UPDATE_TRIGGER_FILE` વિના ડેશબોર્ડ મેન્યુઅલ કમાન્ડ પ્રવાહ જાળવી રાખે છે.

## ઉપલબ્ધતા: ડિફૉલ્ટ SQLite સિંગલ-રિપ્લિકા છે

સ્ટોક Docker / Kubernetes OmniRoute છે** એક નોડ પ્રક્રિયા + એક SQLite લેખક** . ઉચ્ચ ઉપલબ્ધતા છે** આધારભૂત નથી** તે ટોપોલોજી પર.

| અવરોધ                                                 | પરિણામ                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| એકલ લેખક                                              | કરો** નથી** સમાન SQLite ફાઇલ સામે બહુવિધ પ્રતિકૃતિઓ ચલાવો. તે DB ને ભ્રષ્ટ કરે છે.                                                                                                                                                                                                                  |
| ફરીથી બનાવો / પુનઃપ્રારંભ કરો / HEALTHCHECK મારી નાખો | **સંપૂર્ણ આઉટેજ** ઇન-ફ્લાઇટ SSE, ડેશબોર્ડ સત્રો અને ઇન-મેમરી સ્ટેટ. દરેક કનેક્ટેડ ક્લાયંટ ડ્રોપ કરે છે. ખાલી-એન્ડપોઇન્ટ વિન્ડો દરમિયાન નવી વિનંતીઓને રિવર્સ-પ્રોક્સી મળે છે**`502 Bad Gateway: Unknown error`** , OmniRoute JSON નહિ — ક્લાયંટ આને પ્રદાતાની નિષ્ફળતા (#11015) થી અલગ કરી શકતા નથી. |
| `/healthz` તરીકે સમાન ઇવેન્ટ લૂપ                      | વ્યસ્ત કેટલોગ અથવા કમ્પ્રેશન ટિક ચકાસણીઓમાં વિલંબ કરી શકે છે; ટૂંકા સમયસમાપ્તિ પછી પુનઃપ્રારંભ થાય છે** માત્ર** પ્રતિકૃતિ                                                                                                                                                                           |

**ચકાસણી મેટ્રિક્સ** ( [કુબરનેટ્સ પ્રોબ ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) પણ જુઓ):

| તપાસ           | લક્ષ્ય                                                      | ઉપયોગ કરશો નહીં                                        |
| -------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| જીવંતતા        | TCP ઓન `PORT` (ડિફોલ્ટ `20128`), અથવા સોફ્ટ HTTP `/healthz` | `/api/monitoring/health`                               |
| તત્પરતા        | HTTP `GET /healthz`                                         | ચુસ્ત સમયસમાપ્તિ કે જે ઇવેન્ટ-લૂપ વ્યસ્તને મૃત માને છે |
| ઊંડા / મનુષ્યો | `/api/monitoring/health`                                    | સ્વચાલિત કુબેલેટ જીવંતતા                               |

**અપગ્રેડ:** દરેક સત્રમાં ઘટાડો થવાની અપેક્ષા રાખો. જો તમે કરી શકો તો ગ્રાહકોને ડ્રેઇન કરો; ડિફોલ્ટ SQLite પર કોઈ રોલિંગ અપડેટ નથી. કંપોઝ `restart: unless-stopped` plus Docker `HEALTHCHECK` પણ એકમાત્ર પ્રક્રિયાને બદલશે જ્યારે કન્ટેનર બિનઆરોગ્યપ્રદ હોય — સમાન બ્લાસ્ટ ત્રિજ્યા.

તૈયાર મેનિફેસ્ટ અને હેલ્મ ચાર્ટ `deploy/kubernetes/` અને `deploy/helm/omniroute/` માં રહે છે — [કુબરનેટ્સ ડિપ્લોયમેન્ટ માર્ગદર્શિકા](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) જુઓ.

એ માટે કુબરનેટ્સ સ્નિપેટ** એક પ્રતિકૃતિ** (ફરીથી બનાવવું જરૂરી છે; એક SQLite ફાઇલ સામે `replicas` વધારશો નહીં):

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

`preStop` સ્લીપ કુબેને SIGTERM પહેલા સર્વિસ એન્ડપોઇન્ટ્સ છોડવા દે છે** નવું** ટ્રાફિક મૃત્યુ પ્રક્રિયાને અથડાતા અટકે છે. ઇન-ફ્લાઇટ `/v1/responses` SSE હેવીવેઇટ એડમિશન લીઝ (#11015) દ્વારા `SHUTDOWN_TIMEOUT_MS` (ડિફોલ્ટ 30s) સુધી ડ્રેઇન કરવામાં આવે છે. નવી વિનંતીઓ જે હજુ પણ પ્રક્રિયા સુધી પહોંચે છે તેને `503` + `Retry-After: 5` મળે છે. રિક્રિએટ ખાલી-એન્ડપોઇન્ટ ગેપ જ્યાં સુધી રિપ્લેસમેન્ટ તૈયાર ન થાય ત્યાં સુધી હાર્ડ આઉટેજ રહે છે — તે SQLite ટોપોલોજી છે, ચકાસણી ખોટી ગોઠવણી નથી.

બાહ્ય Postgres / બહુ-લેખક HA છે** નથી** દસ્તાવેજીકૃત સ્ટોક પાથ. જો તમને HA જરૂર હોય, તો એક જ પ્રતિકૃતિ રાખો અથવા પ્રોજેક્ટે અલગથી પરીક્ષણ અને દસ્તાવેજીકરણ કરેલ ટોપોલોજી ચલાવો. Postgres/MySQL કાર્ય [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) માં રહે છે. તે જહાજો સુધી, ગુણાકાર કરવાનો એકમાત્ર સમર્થિત માર્ગ** વિશાળ** `/v1/responses` ક્ષમતા N સ્વતંત્ર પ્રક્રિયાઓ છે (આગલો વિભાગ), એક વોલ્યુમ પર `replicas > 1` નથી.

## સ્કેલ-આઉટ: એન સ્વતંત્ર પ્રક્રિયાઓ

### Codex ટોકન રોટેશન માલિકી

એક Codex એકાઉન્ટની નકલો સ્વતંત્ર રીતે તેના સિંગલ-યુઝ રિફ્રેશ ટોકનનો ઉપયોગ ન કરે. ફક્ત સિંક્રનાઇઝ્ડ ઓળખપત્રોનો ઉપયોગ કરતા ઉદાહરણો પર, `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (ઉર્ફે `cx`) સેટ કરો. તેને સિંગલ રોટેશન માલિક પર સેટ કર્યા વિના છોડો. દરેક પ્રક્રિયાને હજુ પણ તેની પોતાની `DATA_DIR` જરૂર છે; આ વિકલ્પ ન તો SQLite શેર કરે છે કે ન તો ટોકન સિંક્રોનાઇઝેશન અથવા વિતરિત લોક સપ્લાય કરે છે.

જ્યારે રિફ્રેશની જરૂર હોય ત્યારે નિષ્ક્રિય ઉદાહરણ કનેક્શનને ફરીથી વાંચે છે અને માત્ર એક અલગ, અનએક્સપાયર્ડ એક્સેસ ટોકન અપનાવે છે. અન્યથા કનેક્શનની સમયસીમા સમાપ્ત અથવા નિષ્ક્રિય કર્યા વિના અથવા રિફ્રેશ-બ્રેકર નિષ્ફળતાની ગણતરી કર્યા વિના રીફ્રેશ અક્ષમ છે. વાસ્તવિક અપસ્ટ્રીમ પ્રમાણીકરણ નિષ્ફળતાઓ હજુ પણ સામાન્ય નિષ્ફળતા એકાઉન્ટિંગ, ઘાતાંકીય કૂલડાઉન અને સામાન્ય ક્લાયન્ટ ભૂલનો ઉપયોગ કરે છે; એકાઉન્ટ નિષ્ક્રિયકરણ કાયમી રહે છે. એક્સેસ ટોકન્સની સમયસીમા સમાપ્ત થાય તે પહેલાં માલિકના ફેરવેલા ટોકન્સને સિંક્રનાઇઝ કરો (ડિફૉલ્ટ પ્રોએક્ટિવ રિફ્રેશ લીડ પાંચ મિનિટ છે), અથવા Codex auth ફાઇલને ફરીથી આયાત કરો. નિષ્ક્રિય આયાત પૂરા પાડવામાં આવેલ ટોકન્સને ટોકન એન્ડપોઇન્ટ પર માન્ય કર્યા વિના સંગ્રહિત કરે છે. મેન્યુઅલ dashboard/API રિફ્રેશ `409 refresh_disabled` પરત કરે છે; નવા OAuth લોગીન્સ અપરિવર્તિત છે. [પર્યાવરણ સંદર્ભ](../reference/ENVIRONMENT.md#passive-codex-token-refresh) જુઓ.

એક નોડ પ્રક્રિયા છે** એક V8 ઢગલો** . બે ઓવરલેપિંગ ~ 3 MiB / ~ 750k-ટોકન કોડિંગ-એજન્ટ `POST /v1/responses` (RTK + કેવમેન) તે ઢગલાને ~ 12 Gi (`FATAL ERROR: Reached heap limit`) પર બંધ કરે છે અને 16 Gi cgroupને OOM કરી શકે છે. જુઓ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) તે માપ એ છે** મેમરી-બજેટ** ચેતવણી, બે સમવર્તી લાંબા `/v1/responses` નું ઉત્પાદન હાર્ડ-મેક્સ નહીં. હેવીવેઇટ ચેટ એડમિશન ઓટો-ડેરીવ્ડ ઇન્જેસ્ટ બાઇટ બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) દ્વારા ગેટ કરવામાં આવે છે જે તે જ V8/cgroup સીલિંગ — થી ઉપરની તરફ ઓવરરાઇડ કરે છે (અથવા લેગસી `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` રિક્વેસ્ટ-કાઉન્ટ કેપ સેટ કરે છે) પહેલાથી જ-કદની પ્રક્રિયા પર ગર્ભપાતને ફરીથી રજૂ કરે છે. નાની ચેટ્સ, `/healthz`, `/v1/models`, અને MCP છે** નથી** તે ટોપીમાં.

### એક-પ્રક્રિયા: બે કરતાં વધુ લાંબી `/v1/responses`

એ** સ્વસ્થ** પ્રક્રિયા ( `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` નીચે ઢગલો, ડિફોલ્ટ `0.75`)** શકે છે** જ્યારે પ્રોસેસ-વાઇડ ઇનફ્લાઇટ-બાઇટ બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) પાસે હજુ જગ્યા હોય ત્યારે બે કરતાં વધુ સહવર્તી લાંબા `POST /v1/responses` ચલાવો. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (ડિફૉલ્ટ 256 KiB) પર અથવા તેનાથી ઉપરની સંસ્થાઓ સ્ટ્રક્ચર-હેવી વિનંતીઓ તરીકે સમાન હેવીવેઇટ લીઝ લે છે અને તે જ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` એસ્કેપ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) નો ઉપયોગ કરે છે. દસ સહવર્તી લાંબા SSE ક્લાયન્ટ્સ (ઓપરેટરોને વારંવાર 40-50 ની જરૂર પડે છે) એ છે** મેમરી-બજેટ** પ્રશ્ન — કદનો ઢગલો + primary/headroom સ્લોટ્સ + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — સખત “મહત્તમ 2” ઉત્પાદન મર્યાદા નથી. દબાણયુક્ત ઢગલો હજી પણ ફરીથી પ્રયાસ કરી શકાય તેવા `503` સાથે શેડ થાય છે જેથી #7849 પરત ન આવે.

થી** ઢગલાનો ગુણાકાર કરો** (સ્વતંત્ર V8 જૂની જગ્યાઓ)** આજે** :

| કરો                                                                                                                        | ના કરો                                                   |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| ચલાવો** એન containers/pods** , દરેક તેની સાથે** પોતાના** `DATA_DIR` / વોલ્યુમ                                              | એક SQLite ફાઇલ સામે `replicas > 1` સેટ કરો               |
| સાઈઝ હેવી ઇન-ફ્લાઇટ + હેલ્ધી-હેડરૂમ ઢગલા/ઇનફ્લાઇટ-બાઇટ બજેટમાંથી; 1–2 એ રૂઢિચુસ્ત #7849 ડિફોલ્ટ છે, સખત ઉત્પાદન મહત્તમ નથી | એક પ્રક્રિયાને 8 × RAM અને અનબાઉન્ડેડ કાઉન્ટ કેપ આપો     |
| વૈકલ્પિક: માટે `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`** વહેંચાયેલ ક્વોટા કાઉન્ટર્સ**                         | Redis વહેંચાયેલ SQLite — તરીકે માનો તે નથી               |
| દરેક ઉદાહરણમાં ડુપ્લિકેટ પ્રદાતા રહસ્યો (અથવા પાર્ટીશન કરેલા ડેશબોર્ડ્સ સ્વીકારો)                                          | સમગ્ર ઉદાહરણોમાં એક ડેશબોર્ડ / એક કૉલ-લોગની અપેક્ષા રાખો |
| કોઈપણ લોડ બેલેન્સર સાથે આગળ; API કી અથવા સત્ર દ્વારા સ્ટીકી પર્યાપ્ત છે                                                    | વિક્રેતા-વિશિષ્ટ કદ-જાગૃત મિડલવેરની જરૂર છે              |

સત્ર-થી-એકાઉન્ટ એફિનિટી Redis દ્વારા પણ શેર કરી શકાય છે : દરેક પ્રક્રિયા પર સમાન `REDIS_KEY_PREFIX` અને હકારાત્મક `sessionAffinityTtlMs` સેટિંગ સાથે `OMNIROUTE_SESSION_AFFINITY_STORE=redis` અને `REDIS_URL` સેટ કરો. પિન દરેક પ્રક્રિયાના પાત્ર સ્થાનિક કનેક્શન માટે હેશ કરેલ વપરાશ-એકાઉન્ટ ઓળખને ઉકેલે છે, તેથી મેળ ખાતા ઓળખ મેટાડેટા સાથેના OAuth એકાઉન્ટ્સમાં મેળ ખાતું કનેક્શન IDs હોવું જરૂરી નથી. પિન રિઝોલ્યુશન અને રક્ષિત ઇવિક્શનમાં વિરોધાભાસી સ્થાનિક IDs પર જાણીતી એકાઉન્ટ ઓળખ અગ્રતા ધરાવે છે; ઓળખ વિનાના રેકોર્ડ્સ (અથવા ઓળખ વગરના કાઢી મૂકનારાઓ) વારસો ID ગાર્ડને જાળવી રાખે છે. સ્થિર ઉપયોગ ઓળખ વિનાના એકાઉન્ટ્સને હજુ પણ મેચિંગ IDs ની જરૂર છે. Redis ભૂલો અથવા 100 ms કરતાં વધુ કૉલ સ્થાનિક SQLite પર પાછા આવે છે. દરેક Redis એફિનિટી સ્ટોર બાકી કામગીરીને 8 પર કેપ કરે છે, જ્યારે પૂર્ણ થાય ત્યારે તરત જ Redis બાયપાસ કરે છે, અને જ્યારે અંતર્ગત કામ પતાવટ થાય ત્યારે જ સ્લોટ્સ રિલીઝ કરે છે, કોલરની સમયમર્યાદા પર નહીં. Redis આઉટેજ દરમિયાન ત્યાં કોઈ વહેંચાયેલ સત્ય નથી: દરેક ઉદાહરણ તેના પોતાના સ્થાનિક જોડાણમાં પાછું આવે છે, ઉદાહરણ દીઠ સત્રો એકવાર ફરીથી પિન થઈ શકે છે, અને ઉદાહરણો અલગ થઈ શકે છે. જ્યારે તે પુનઃપ્રાપ્ત થાય છે ત્યારે Redis દ્વારા સ્ટીકીનેસ ફરીથી કન્વર્જ થાય છે. સમયસમાપ્તિ પ્રતીક્ષા કરે છે, મોકલેલ EVAL નહીં, જે ફોલબેક પછી ઉતરી શકે છે. રાઉટીંગ રાઈટ્સ રૂટીંગ નિર્ણય દ્વારા અવલોકન કરાયેલ ચોક્કસ મૂલ્યની તુલના કરે છે, નવા પરિવર્તન-સમય વાંચવા માટે નહીં; અવલોકન કરેલ ચૂક અથવા SQLite ફોલબેક અવલોકન ગેરહાજર Redis કી તરીકે સરખાવે છે. અપ્રચલિત પિન એક CAS માં બદલવામાં આવે છે, તેથી મોડું આદેશ નવી, અલગ પિન બદલી અથવા કાઢી શકતું નથી. Redis રીડ પરમાણુ મૂલ્ય અને બાકીનું સર્વર TTL પરત કરે છે; હકારાત્મક PTTL (અથવા કોઈ સમાપ્તિ) જીવંતતા નક્કી કરે છે, લેખકની JSON ટાઇમસ્ટેમ્પ અથવા રીડરની ઘડિયાળ નહીં. સ્થાનિક સ્નેપશોટ નકશો જે સ્થાનિક સમયમર્યાદા સુધી TTL બાકી રહે છે; હાલની JSON કીઓ વાંચી શકાય તેવી રહે છે અને તેમની કાચી બાઈટ CAS માટે જાળવી રાખવામાં આવે છે. Redis એ સત્યનો એકમાત્ર સ્ત્રોત છે જ્યારે તે જવાબ આપે છે. પુષ્ટિ થયેલ શેર કરેલ અપસર્ટ, ટચ અને ડિલીટ સ્થાનિક એન્ટ્રીને દૂર કરે છે, તેને ક્યારેય ઇન્સ્ટોલ અથવા રિફ્રેશ કરશો નહીં. Redis પાથ પર SQLite, Redis ભૂલો, સમયસમાપ્તિ અથવા પ્રવેશ સંતૃપ્તિ, પહેલાની જેમ TTL-બાઉન્ડેડમાંથી ફક્ત આ ઉદાહરણના પોતાના ફોલબેક નિર્ણયો ધરાવે છે. પાછળથી આઉટેજ પર ગુમ થયેલ સ્થાનિક પિન માટે એક તાજી પિક (એક પ્રોમ્પ્ટ-કેશ મિસ) ખર્ચ થાય છે, ખોટું અથવા બહાર કાઢેલું એકાઉન્ટ નહીં. નકારવામાં આવેલ અપસર્ટ શેર કરેલ વિજેતા અને તેના બાકીના TTL અણુરૂપે પરત કરે છે: સામાન્ય પસંદગી મેપ કરેલ સ્થાનિક સમયમર્યાદાને ફરીથી તપાસે છે અને હજુ પણ જીવંત પાત્ર વિજેતાનો ઉપયોગ કરે છે, વપરાશને સ્પર્શ કરે છે અને બીજા શેર કરેલ લખાણ વિના તે એકાઉન્ટ માટે લોગીંગ કરે છે. જો તે અનુપલબ્ધ હોય, તો પસંદગી સ્થાનિક ઉમેદવારને રાખે છે, શેર કરેલ પિનને યથાવત રાખે છે અને એક ડીબગ સંદેશ બહાર કાઢે છે. નકારેલ CAS SQLite લખતું નથી; Redis ભૂલો, સમયસમાપ્તિ અથવા પ્રવેશ સંતૃપ્તિ તેના બદલે હાલની સ્થાનિક કામગીરીને લાગુ કરે છે. જો મોકલેલ મ્યુટેશનનો જવાબ સમયસમાપ્તિ (સ્વીકૃત, અસ્વીકાર અથવા ભૂલ) પછી આવે છે, તો સિંક્રનસ ચોક્કસ સીરીયલાઇઝ્ડ-વેલ્યુ સરખામણી-અને-કાઢી નાખો માત્ર બાઇટ-સમાન સમયસમાપ્તિ ફોલબેક પંક્તિને દૂર કરે છે. તે સરખામણી અને કાઢી નાખવાની વચ્ચે કોઈ રાહ નથી; નવું આઉટેજ લખાણ સાચવેલ છે. ગાર્ડેડ ઇવિક્શન Redis ડાઉન હોવા છતાં પણ નિષ્ફળ એકાઉન્ટની પોતાની સ્થાનિક પિનને દૂર કરે છે અને કન્ફર્મ શેર કરેલ ઇવિક્શન પછી તેને ફરીથી સાફ કરે છે. અગાઉના શેર કરેલા જવાબો બાકી છે તે બહાર કાઢેલ સ્થાનિક પિનને પુનઃસ્થાપિત કરી શકતો નથી કારણ કે શેર કરેલી સફળતાઓ ક્યારેય SQLite લખતી નથી. પાછળથી આઉટેજ ફોલબેક એકાઉન્ટ રિપીન કરી શકે છે; પાછળથી સ્વીકૃત શેર કરેલ લખાણ ફક્ત Redis માં અસ્તિત્વમાં છે. Redis misses સ્થાનિક ફોલબેક રાજ્યની સલાહ લેતા નથી. ડ્રાઇવર બંધ હોવા પર, નવી પસંદ કરેલી પિન વારસાના ચાર-ફીલ્ડ SQLite JSON આકારને જાળવી રાખે છે; માત્ર Redis રૂટીંગ હેશ કરેલ એકાઉન્ટ ઓળખ ઉમેરે છે. પ્રીફેચ્ડ પિન તેમની સમાપ્તિ સીમા પર ફરીથી તપાસવામાં આવે છે. Redis નોન-લીઝ પસંદગી સ્ટોરને ફરીથી વાંચે છે, પરંતુ સિંક્રનસ લીઝ પ્લાનિંગ હજુ પણ પ્રીફેચ અને પ્લાનિંગ (એક સ્વીકૃત શ્રેષ્ઠ-પ્રયાસ વિન્ડો) વચ્ચે ખાલી કરાયેલ પિનનો ઉપયોગ કરી શકે છે. લીઝ કમિટ ટકાઉ દાવા પછી એકાઉન્ટ્સ સ્વિચ કરી શકતી નથી: અસ્વીકાર અપસર્ટ પર તે દાવો કરેલ ઉમેદવારને તે વિનંતી માટે જ રાખે છે અને વહેંચાયેલ વિજેતાને અસ્પૃશ્ય રાખે છે, તેથી સમગ્ર ઉદાહરણોમાં કરાર તે માર્ગ પર બંધાયેલ છે. બાકીનું ટેબલ હજુ પણ લાગુ પડે છે: આ કોમ્બો સેશન સ્ટીકીનેસ, નેટીવ Codex ટર્ન પિન, એકાઉન્ટ સેમાફોર્સ, લોકઆઉટ, ખર્ચ મર્યાદા, ગોઠવણી અથવા કૉલ લોગ શેર કરતું નથી.

હાર્ડવેર: પ્રતિ-ઇન્સ્ટન્સ સમવર્તી લાંબા `/v1/responses` એ છે** મેમરી-બજેટ** પ્રશ્ન (heap + inflight-byte / #10110). `N` સ્વતંત્ર `DATA_DIR` s હજુ પણ મલ્ટીપ્લાય હીપ્સ: યજમાન RAM `N × cgroup` આવરી લેવું જોઈએ, "N = 8 સાથે એક 16 Gi પોડ નહીં." એક SQLite ફાઇલ પર ક્યારેય `replicas > 1` ન કરો.

સ્કેચ કંપોઝ કરો (બે ઢગલા, બે વોલ્યુમ — `deploy.replicas: 2` નહીં):

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

પ્રક્રિયામાં ઘનતા ( HTTP આઇસોલેટથી સંકોચન) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) છે. શેર કરેલ ટકાઉ સ્થિતિ પર એક તાર્કિક ક્લસ્ટર [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) છે.

## Dockerની અંદર Geminiની પ્રાદેશિક ભૂલો

Google AI Studio / Gemini API, FAILED_PRECONDITION સાથે HTTP 400 અને
`User location is not supported for the API use.` પરત કરી શકે છે. હોસ્ટ પર સફળ થયેલી વિનંતી
એ સાબિત કરતી નથી કે કન્ટેનર એ જ આઉટબાઉન્ડ રૂટનો ઉપયોગ કરે છે. DNS ક્રમ,
IPv4/IPv6 કનેક્ટિવિટી, VPN રૂટિંગ અને ગોઠવેલા પ્રોક્સી અલગ હોઈ શકે છે.
[Googleના સમર્થિત પ્રદેશો](https://ai.google.dev/gemini-api/docs/available-regions)
તેમજ વાસ્તવિક કનેક્શન રૂટ તપાસો; ફક્ત આ ભૂલ ખરાબ API કીને ઓળખી બતાવતી નથી.

### કનેક્શન-વિશિષ્ટ પ્રોક્સીને પ્રાધાન્ય આપો

અસરગ્રસ્ત Gemini કનેક્શન માટે OmniRouteના [કનેક્શન-દીઠ પ્રોક્સી રૂપરેખાંકન](../ops/PROXY_GUIDE.md#4-level-proxy-system)
નો ઉપયોગ કરો, ત્યારબાદ એ જ મોડેલ સાથે **કનેક્શનનું પરીક્ષણ કરો** અને એક નાની વિનંતી
ફરીથી કરો. આ રૂટિંગ ફેરફારને તે કનેક્શન પૂરતો મર્યાદિત રાખે છે. ચકાસો કે
કન્ટેનરમાંથી પ્રોક્સી સુધી પહોંચી શકાય છે અને કનેક્શન ખરેખર તેને પસંદ કરે છે.
રૂટ બદલવાથી અપસ્ટ્રીમ પ્રાદેશિક પાત્રતાની ખાતરી થતી નથી.

### હોસ્ટ અને કન્ટેનર નેટવર્કિંગની સરખામણી કરો

પ્રમાણિત પરિણામોની સરખામણી કરતી વખતે કી, મોડેલ અને વિનંતી એકસરખાં રાખો; ક્યારેય
ઓળખપત્રો, પ્રોક્સી પાસવર્ડો અથવા સંપૂર્ણ અધિકૃતતા હેડરોને કોઈ ઇશ્યૂમાં પેસ્ટ કરશો નહીં.
પહેલાં તપાસો કે OS રિઝોલ્વર કયા એડ્રેસ ફેમિલી આપે છે; હોસ્ટ અને કન્ટેનરની અંદર
એ જ કમાન્ડનો ઉપયોગ કરો:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute`ને તમે ચલાવતા હો તે સેવા વડે બદલો (ઉદાહરણ તરીકે, `omniroute-web`). આ
કમાન્ડો ઓળખપત્રો અથવા IP એડ્રેસ વિના એડ્રેસ ફેમિલી પ્રિન્ટ કરે છે. પરત મળેલું `6`
ફક્ત IPv6 DNS પરિણામ દર્શાવે છે: તે ઉપયોગ કરી શકાય તેવા IPv6 રૂટ અથવા API ઍક્સેસને
સાબિત કરતું **નથી**. જ્યાં `curl` ઇન્સ્ટૉલ કરેલું હોય ત્યાં બંને પર્યાવરણોમાં
`curl -4 -I https://generativelanguage.googleapis.com`ની સરખામણી
`curl -6 -I https://generativelanguage.googleapis.com` સાથે કરો.
HTTP પ્રતિસાદ તે પ્રોબ માટે કનેક્ટિવિટી સાબિત કરે છે, ભલે તે અપ્રમાણિત
ભૂલ હોય; માત્ર પ્રમાણિત મોડેલ વિનંતી જ Gemini માટેની પાત્રતાનું પરીક્ષણ કરે છે.

### હોસ્ટ-સ્તરનો વિકલ્પ: કાર્યરત IPv6 અને રિઝોલ્વર નીતિ

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)ના રિપોર્ટરે
કન્ટેનર IPv6 સક્ષમ કરીને અને glibc એડ્રેસ પસંદગી બદલીને તેમના પર્યાવરણમાં ઍક્સેસ
પુનઃસ્થાપિત કરી હતી. આને પર્યાવરણ-વિશિષ્ટ વિકલ્પ માનો. રિઝોલ્વર પસંદગીઓ સમાયોજિત
કરતાં પહેલાં કાર્યરત હોસ્ટ IPv6, કન્ટેનર ઇગ્રેસ/રૂટિંગ અને ફાયરવૉલના નિયમોની પુષ્ટિ કરો.
ફક્ત ખાનગી ULA એડ્રેસ જાહેર IPv6 કનેક્ટિવિટી સ્થાપિત કરતું નથી.

Composeના ડિફૉલ્ટ નેટવર્ક સાથે પહેલેથી જોડાયેલી સેવાઓ માટે, આ ફ્રેગમેન્ટ
તે નેટવર્ક પર IPv6 સક્ષમ કરે છે; તમારી સેવાના બાકીના ભાગો, પોર્ટ્સ, વોલ્યુમ્સ અને રૂપરેખાંકન જાળવી રાખો:

```yaml
networks:
  default:
    enable_ipv6: true
```

નામવાળા નેટવર્ક માટે, સેવા ખરેખર જે નેટવર્ક સાથે જોડાય છે તેના પર તેને સક્ષમ કરો. Docker
ULA સબનેટ ફાળવી શકે છે; જ્યારે તમારા નેટવર્કને તેની જરૂર હોય ત્યારે જ સ્પષ્ટ,
ઓવરલૅપ ન થતું સબનેટ પસંદ કરો. [Docker IPv6 નેટવર્કિંગ](https://docs.docker.com/engine/daemon/ipv6/)
અને [Compose નેટવર્ક વિકલ્પો](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) જુઓ.

**glibc-આધારિત ઇમેજ** પર, `/etc/gai.conf` એડ્રેસ પસંદગી બદલી શકે છે. હાલની
રિપોઝિટરી Dockerfile, Debianનો ઉપયોગ કરે છે; કસ્ટમ musl-આધારિત ઇમેજો આ મિકેનિઝમનો ઉપયોગ કરતી નથી.
રિપોર્ટ કરેલો સમાયોજન ULA લેબલને `label fc00::/7 6`માંથી
`label fc00::/7 1`માં બદલે છે. ઇમેજના સંપૂર્ણ નીતિ કોષ્ટકથી શરૂઆત કરો અને તેની અન્ય
એન્ટ્રીઓ જાળવી રાખો: `label` અથવા `precedence` એન્ટ્રી ઉમેરવાથી તે ડિફૉલ્ટ કોષ્ટક બદલાઈ જાય છે,
તેથી માત્ર બદલાયેલી લાઇન ધરાવતી ફાઇલ પૂરતી નથી.
[glibc રૂપરેખાંકન સંદર્ભ](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
આ સિમેન્ટિક્સનું દસ્તાવેજીકરણ કરે છે. સમીક્ષા કરેલી ફાઇલને `/etc/gai.conf` પર માત્ર-વાંચન
મોડમાં bind-mount કરો અને તેને લાગુ કરવા માટે સેવા ફરીથી બનાવો.

આ તે કન્ટેનરમાંના **તમામ આઉટબાઉન્ડ ટ્રાફિક** માટે OS એડ્રેસ પસંદગી બદલે છે.
તે દરેક ઍપ્લિકેશનને IPv6 પસંદ કરવા માટે ફરજ પાડતું નથી: Nodeનો DNS ક્રમ અને કનેક્શન
પસંદગી પણ મહત્વ ધરાવે છે. ખાસ કરીને, `--dns-result-order=ipv4first` IPv4ને પ્રાધાન્ય આપે છે અને
માત્ર IPv4 સંબંધિત નિષ્ફળતા માટે ઉપાય નથી. [Node DNS ક્રમ](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) જુઓ.

હોસ્ટ-સ્તરના કોઈપણ ફેરફાર પછી Gemini અને તમારા અન્ય પ્રદાતાઓનું ફરીથી પરીક્ષણ કરો. પાછા ફરવા માટે,
કસ્ટમ `gai.conf` માઉન્ટ દૂર કરો, અગાઉનું નેટવર્ક રૂપરેખાંકન પુનઃસ્થાપિત કરો અને
જાળવણી સમયગાળા દરમિયાન અસરગ્રસ્ત સેવા/નેટવર્ક ફરીથી બનાવો. નેટવર્ક ફરીથી બનાવવાથી
તેની સાથે જોડાયેલા અન્ય કન્ટેનરોમાં વિક્ષેપ પડી શકે છે; સ્થાયી ડેટા વોલ્યુમ કાઢી નાખશો નહીં.

## મહત્વપૂર્ણ નોંધો

- **SQLite WAL મોડ:** `docker stop` ને પૂર્ણ થવા દેવું જોઈએ, જેથી OmniRoute નવીનતમ ફેરફારોને પાછા `storage.sqlite` માં ચેકપૉઇન્ટ કરી શકે. સાથે આપેલી Compose ફાઇલોમાં પહેલેથી જ 40s નો સ્ટોપ ગ્રેસ પિરિયડ સેટ કરેલો છે. જો તમે ઇમેજને સીધી ચલાવો છો, તો `--stop-timeout 40` જાળવી રાખો.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** જો નિયમિત/લખાણ-પૂર્વ બૅકઅપ બાહ્ય રીતે સંચાલિત થતા હોય, તો તેને `true` પર સેટ કરો. હાલના ડેટાબેઝના માઇગ્રેશન માટે હજુ પણ તેમનો પોતાનો ટકાઉ સુરક્ષા સ્નૅપશૉટ અને સામૂહિક માઇગ્રેશન ગાર્ડ જરૂરી છે.
- **ડેટા સ્થાયિત્વ:** કન્ટેનર રીસ્ટાર્ટ દરમિયાન તમારા ડેટાબેઝ, કી અને કન્ફિગરેશનને જાળવી રાખવા માટે હંમેશાં `/app/data` પર વૉલ્યુમ માઉન્ટ કરો.
- **પોર્ટ કન્ફિગરેશન:** ડિફૉલ્ટ `20128` પોર્ટ બદલવા માટે `PORT` એન્વાયર્નમેન્ટ વેરિએબલને ઓવરરાઇડ કરો.

## આ પણ જુઓ

- [VM ડિપ્લોયમેન્ટ માર્ગદર્શિકા](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare સેટઅપ
- [Fly.io ડિપ્લોયમેન્ટ માર્ગદર્શિકા](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io પર ડિપ્લોય કરો
- [એન્વાયર્નમેન્ટ કન્ફિગ](../reference/ENVIRONMENT.md) — સંપૂર્ણ `.env` સંદર્ભ
