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

## ઝડપી ચલાવટ

> **એક જ કમાન્ડથી સ્વ-હોસ્ટ કરવું છે?**
> [સ્વ-હોસ્ટ માર્ગદર્શિકા](../getting-started/SELF_HOST_GUIDE.md) જુઓ —
> `docker compose -f docker-compose.selfhost.yml up -d` (પ્રકાશિત ઇમેજ +
> Redis, માત્ર લૂપબૅક, પ્રોફાઇલની પસંદગી નહીં). નીચે આપેલી ઝડપી ચલાવટ એવા વપરાશકર્તાઓ માટેનો
> સિંગલ-કન્ટેનર માર્ગ છે, જેઓ Redis પહેલેથી જ અન્યત્ર ચલાવે છે.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## પર્યાવરણ ફાઇલ સાથે

```bash
# પહેલાં .env કૉપિ અને સંપાદિત કરો
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

## Dockerfile સ્ટેજ

રિપોઝિટરી સાથે મલ્ટિ-સ્ટેજ Dockerfile (`Dockerfile`) મળે છે. ચાર સ્ટેજ ઉપલબ્ધ છે; તમારા ઉપયોગ માટે યોગ્ય `target` પસંદ કરો.

| સ્ટેજ         | બેઝ ઇમેજ              | હેતુ                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | ડિપેન્ડન્સીઓ ઇન્સ્ટોલ કરે છે (`npm ci --legacy-peer-deps`) અને `npm run build` ચલાવે છે (ડિફૉલ્ટ રૂપે Turbopack — નીચે બિલ્ડ-સમયનાં સંસાધનો જુઓ)                                                                                                                                       |
| `runner-base` | `node:26-trixie-slim` | Next.jsના સ્ટૅન્ડઅલોન આઉટપુટ સાથેનો પ્રોડક્શન રનટાઇમ. **કોઈ પ્રોવાઇડર CLI સમાવિષ્ટ નથી.**                                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` અને ગ્લોબલ CLI ઉમેરે છે: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **એજન્ટિક વર્કફ્લો માટે આ પસંદ કરો.**                                                                                                                 |
| `runner-web`  | `runner-base`         | વેબ-સેશન પ્રોવાઇડર માટે Playwright + Chromium બ્રાઉઝર (`--with-deps`) ઉમેરે છે: `gemini-web`, `claude-web`, `claude-turnstile`. **જ્યારે તમે આ પ્રોવાઇડરનો ઉપયોગ કરો ત્યારે આ પસંદ કરો** — તેના વિના સાદી ઇમેજ રિક્વેસ્ટ સમયે નિષ્ફળ જાય છે (Release Channels હેઠળની `-web` નોંધ જુઓ). |

ચોક્કસ ટાર્ગેટ મેન્યુઅલી બિલ્ડ કરો:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### બિલ્ડ-સમયનાં સંસાધનો

ત્રણ બિલ્ડ આર્ગ્યુમેન્ટ `builder` સ્ટેજના સંસાધન ખર્ચને નિયંત્રિત કરે છે. તેઓ માત્ર બિલ્ડ-સમય માટે છે —
`OMNIROUTE_MEMORY_MB` (નીચે) એક અલગ રનટાઇમ નિયંત્રણ છે.

| બિલ્ડ આર્ગ્યુમેન્ટ          | ડિફૉલ્ટ | અસર                                                                                           |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`     | `0` webpack વડે બિલ્ડ કરે છે: ઓછી પીક મેમરી, ધીમું. `1` Turbopack પસંદ કરે છે.                |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | શરૂ કરાયેલા `next build` માટે V8 હીપ મર્યાદા (`--max-old-space-size`).                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | `CIRCLE_NODE_TOTAL`ને મૂલ્ય આપે છે; Next પેજ-ડેટા સંગ્રહ માટે `workers = N - 1` નક્કી કરે છે. |

મોટા બિલ્ડર પર `OMNIROUTE_BUILD_WORKERS`નું મૂલ્ય વધારવું જોઈએ અને મર્યાદિત સંસાધનોવાળું બિલ્ડ **`✓ Compiled successfully` પછી** બંધ થઈ જાય ત્યારે સૌપ્રથમ તેની શંકા કરવી જોઈએ. દરેક
પેજ-ડેટા વર્કર તેની પોતાની પ્રોસેસ છે, અને પેરન્ટ `next build` પણ અલગ પ્રોસેસ છે;
લાઇવ VPS પુનરુત્પાદન (issue #7518)માં દરેક પ્રોસેસનો પીક RSS
~4.5 GB માપવામાં આવ્યો હતો, જે `NODE_OPTIONS` હીપ ફ્લૅગથી સ્વતંત્ર હતો (Turbopack,
V8 હીપની બહારની નેટિવ/Rust મેમરીમાં કમ્પાઇલ કરે છે). `2`નું ડિફૉલ્ટ મૂલ્ય (→ 1 વર્કર, કુલ 2
પ્રોસેસ) પબ્લિશ પાઇપલાઇન દ્વારા ઉપયોગમાં લેવાતા 16 GB / 4 vCPU GitHub-હોસ્ટેડ રનર
માટે નિર્ધારિત છે. `8` પર (→ 7 વર્કર) તે રનરની મેમરી સમાપ્ત થઈ ગઈ અને
buildkitએ `ResourceExhausted: ... cannot allocate memory` સાથે સ્ટેપ નિષ્ફળ કર્યો;
દરેક પ્રોસેસનો RSS અનુમાનિત કરવાને બદલે સીધો માપવામાં આવ્યો ત્યારે `3` (→ 2 વર્કર) પણ પૂરતું નહોતું.
`tests/unit/docker-build-memory-budget.test.ts`
માપવામાં આવેલા આંકડા સામે ગણતરી કરે છે અને કોઈપણ નિયંત્રણ રનરની ક્ષમતાથી વધી જાય તો નિષ્ફળ થાય છે.

Turbopack એવી નેટિવ Rust મેમરીમાં કમ્પાઇલ કરે છે જે V8 હીપની **બહાર** રહે છે, તેથી
`OMNIROUTE_BUILD_MEMORY_MB` તેને મર્યાદિત કરતું નથી. મેમરી મર્યાદાવાળા હોસ્ટ પર
બિલ્ડને OOM કિલર દ્વારા કોઈપણ ભૂલના લખાણ વિના SIGKILL કરવામાં આવે છે — તે ફક્ત
`Creating an optimized production build`ની વચ્ચે અટકી જાય છે, જે મેમરી સમાપ્ત થવાને બદલે
અટકી ગયું હોય એવું લાગે છે. તેથી જ `Dockerfile`માં ડિફૉલ્ટ રૂપે webpack
(`OMNIROUTE_USE_TURBOPACK=0`) છે, જ્યારે `npm run dev` / `npm run build`માં
કોડનું ડિફૉલ્ટ Turbopack છે: કોઈપણ બિલ્ડ આર્ગ્યુમેન્ટ વિનાનું સાદું `docker build .` (જે
Railway અને અન્ય વન-ક્લિક હોસ્ટ ચલાવે છે) મેમરી-મર્યાદિત બિલ્ડર પર કોઈ સંદેશ વિના
બંધ ન થવું જોઈએ. પ્રકાશિત ઇમેજ પહેલેથી જ `docker-publish.yml`માં
`OMNIROUTE_USE_TURBOPACK=0` સ્પષ્ટ રીતે પાસ કરે છે. પૂરતી RAM ધરાવતા બિલ્ડર પર,
વધુ ઝડપી બિલ્ડ માટે Turbopack પસંદ કરો:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` સક્ષમ છે, તેથી `next build` એક પેરન્ટ **અને** એક વર્કર
પ્રોસેસ ચલાવે છે અને દરેક અલગથી `OMNIROUTE_BUILD_MEMORY_MB`નું પાલન કરે છે. કન્ટેનરની
મર્યાદા આ મૂલ્યના આશરે એક ગણાને બદલે બે ગણાથી વધુ રાખો.

આ ટ્રી પર માપેલું (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| બંડલર     | કન્ટેનર મર્યાદા | પરિણામ                              |
| --------- | --------------- | ----------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | બંને પર કોઈ સંદેશ વિના OOM-killed   |
| webpack   | 8 GiB           | બિલ્ડ વર્કરને SIGKILL કરવામાં આવ્યો |
| webpack   | 12 GiB          | સફળ, પીક 11.1 GiB સુધી પહોંચ્યો     |

### રનટાઇમ ડિફૉલ્ટ

`runner-base` દ્વારા એક્સપોર્ટ થતા ડિફૉલ્ટ: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Dockerમાં મેમરીનું વર્તન:

- ઇમેજ `OMNIROUTE_MEMORY_MB=1024` સેટ કરે છે અને તેના પરથી `NODE_OPTIONS=--max-old-space-size=1024` બનાવે છે.
- વાસ્તવિક સર્વર પ્રોસેસ standalone launcher દ્વારા શરૂ થાય છે, જે `OMNIROUTE_MEMORY_MB` વાંચે છે અને `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` ઉમેરે છે.
- Node વારંવાર આપેલા `--max-old-space-size`નું છેલ્લું મૂલ્ય વાપરે છે, તેથી `OMNIROUTE_MEMORY_MB` સેટ કરવાથી અસરકારક Docker heap મર્યાદા નિયંત્રિત થાય છે.
- ઇમેજ હંમેશાં તેને સેટ કરતી હોવાથી, Docker હેઠળ launcher's પોતાની RAM-calibrated fallback ક્યારેય લાગુ પડતી નથી. workload માટે તેને સ્પષ્ટપણે વધારો (નીચેનું કોષ્ટક જુઓ). coding-agent `/v1/responses` માટે `2048` હજી પણ બહુ ઓછું છે.

### coding agents માટે Runtime RAM

1 GiBની Docker ડિફૉલ્ટ મર્યાદા dashboard/light-chat માટેની લઘુતમ મર્યાદા છે, production માટે યોગ્ય કદ નથી. લાંબી `POST /v1/responses` bodies (સેંકડો messages, દસીઓ tools) compression દરમિયાન અનેક in-memory graphs જાળવી રાખે છે. એકસાથે ચાલતી ~3 MiB / ~750k-tokenની બે requestsએ **12 GiB** old-space પર V8ને બંધ કરાવી દીધું છે (`FATAL ERROR: Reached heap limit`) અને 16 GiB cgroup OOM મર્યાદા પણ વટાવી છે. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ.

**cgroup `--memory`નું કદ heap કરતાં વધારે રાખો** — native buffers, SQLite અને compression intermediates V8ની બહાર રહે છે.

| Workload                            | `OMNIROUTE_MEMORY_MB` | Container / cgroup  | નોંધો                                                                                            |
| ----------------------------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| Dashboard, એક હળવી chat             | `1024` (ઇમેજ ડિફૉલ્ટ) | ≥2 GiB              |                                                                                                  |
| એક coding agent (Claude/Codex/Grok) | `8192`                | ≥10 GiB             | સામાન્ય single-session `/v1/responses`                                                           |
| એકસાથે બે લાંબી `/v1/responses`     | `10240`–`12288`       | ≥12–16 GiB          | ~12 GiB heap પર માપવામાં આવેલ V8 abort                                                           |
| એકસાથે ત્રણથી વધુ લાંબા contexts    | એક process પર ન ચલાવો | serialize / વધુ RAM | ડિફૉલ્ટ heavyweight admissionમાં 1 in-flight છે; RAM વધાર્યા વિના તેને વધારવાથી abort ફરી થાય છે |

bare metal પર `omniroute serve`, `OMNIROUTE_MEMORY_MB` **સેટ ન હોય** ત્યારે RAMના ~35% પ્રમાણે calibrate કરે છે (`[512, 4096]` સુધી મર્યાદિત). Docker હંમેશાં `1024` સેટ કરે છે, તેથી official imageમાં આ calibration ક્યારેય ચાલતું નથી.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## સબપાથ પર રિવર્સ પ્રોક્સી (Traefik / nginx)

Next.js `basePath` સ્ટૅન્ડઅલોન બંડલમાં કમ્પાઇલ થાય છે. OmniRoute એપ્લિકેશન રૂટ પરની sentinel ફાઇલમાં બિલ્ડ સમયે સમાવાયેલ મૂલ્ય રેકોર્ડ કરે છે (`npm run build` દરમિયાન લખાય છે; `scripts/docker/ensure-docker-base-path.mjs` દ્વારા વાંચવામાં આવે છે) અને કન્ટેનર શરૂ થાય ત્યારે તેની તુલના `OMNIROUTE_BASE_PATH` સાથે કરે છે. જ્યારે બંને અલગ હોય અને ઇમેજ ડોમેન રૂટ માટે બિલ્ડ કરવામાં આવી હોય, ત્યારે `node dev/run-standalone.mjs` ચાલે તે પહેલાં એન્ટ્રીપોઇન્ટ સ્ટૅન્ડઅલોન મેનિફેસ્ટ, એમ્બેડ કરેલા `basePath`/`assetPrefix` લિટરલ્સ (Next 16 માત્ર `assetPrefix` પરથી SSR એસેટ URL રેન્ડર કરે છે — પેચર તેમાં પણ સબપાથને પ્રતિબિંબિત કરે છે), બિલ્ડમાં સમાવાયેલા `/_next/static` એસેટ URL (ક્લાયન્ટ-રેફરન્સ મેનિફેસ્ટ, મીડિયા ઇમ્પોર્ટ્સ, પ્રીરેન્ડર કરેલા એરર પેજ) અને ક્લાયન્ટ `process.env` shim ફરીથી લખે છે.

### Compose બિલ્ડ (ભલામણ કરેલ)

બંને વેરિએબલ્સ `.env`માં સેટ કરો, પછી ઇમેજ અને રનટાઇમ સુસંગત રહે તે માટે ફરીથી બિલ્ડ કરો:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`, `OMNIROUTE_BASE_PATH`ને Docker build-arg તરીકે અને રનટાઇમ એન્વાયર્નમેન્ટ વેરિએબલ તરીકે ફોરવર્ડ કરે છે.

### પૂર્વ-બિલ્ડ કરેલી રૂટ ઇમેજ + રનટાઇમ સબપાથ

પ્રકાશિત `diegosouzapw/omniroute:*` ઇમેજો ડોમેન રૂટ માટે બિલ્ડ કરવામાં આવે છે. તેમ છતાં તમે રનટાઇમ પર `OMNIROUTE_BASE_PATH` સેટ કરી શકો છો; કન્ટેનર સ્ટાર્ટઅપ વખતે બંડલને એક વાર પેચ કરે છે. તેને મેળ ખાતા જાહેર ઓરિજિન સાથે જોડો:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

રિવર્સ પ્રોક્સીને **સંપૂર્ણ** બાહ્ય પાથ ફોરવર્ડ કરવા માટે કૉન્ફિગર કરો (પ્રિફિક્સ દૂર કરશો નહીં). Traefikએ `StripPrefix` વિના `PathPrefix(`/omniroute`)`ને કન્ટેનર તરફ રૂટ કરવું જોઈએ, જેથી Next.jsને `/omniroute/...` મળે અને તે `/omniroute/_next/...` પરથી એસેટ્સ સર્વ કરે.

Docker healthcheck, સક્રિય `OMNIROUTE_BASE_PATH`થી પ્રિફિક્સ કરેલા હળવા `/healthz` લાઇફસાઇકલ એન્ડપોઇન્ટને પ્રોબ કરે છે. માનવ/ડૅશબોર્ડ ડાયગ્નોસ્ટિક્સ માટે `/api/monitoring/health` ઉપલબ્ધ રહે છે; કન્ટેનર HEALTHCHECKને ફરી તેના તરફ નિર્દેશિત કરવા માટે (ઉદાહરણ તરીકે, ડીપ હેલ્થ એન્ફોર્સમેન્ટ માટે), `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` સેટ કરો. આ પાથ એક **ડીપ** ચેક (DB + મોનિટરિંગ સારાંશ) છે — જો તમે તેને ફરી પસંદ કરો તો Dockerના ઓછી આવર્તનવાળા `HEALTHCHECK` માટે યોગ્ય છે, પરંતુ Kubernetesના `livenessProbe` અંતરાલો માટે **નથી**.

ઓર્કેસ્ટ્રેટર્સ (Kubernetes, Nomad વગેરે) માટે:

| પ્રોબ            | પ્રાધાન્ય આપો                                                        | ટાળો                                               |
| ---------------- | -------------------------------------------------------------------- | -------------------------------------------------- |
| લાઇવનેસ          | HTTP `GET /livez`, અથવા મુખ્ય પોર્ટ પર TCP (`PORT`, ડિફૉલ્ટ `20128`) | લાઇવનેસ તરીકે `/api/monitoring/health`             |
| રેડીનેસ          | HTTP `GET /healthz`                                                  | ટૂંકા ટાઇમઆઉટ્સ, જે વ્યસ્ત event-loopને મૃત ગણે છે |
| ડીપ / બ્લૅકબૉક્સ | `/api/monitoring/health`                                             | —                                                  |

`/healthz` પ્રોસેસ લાઇફસાઇકલ (`ok` / `starting` / `stopping`) રિપોર્ટ કરે છે. `/livez` માત્ર પ્રોસેસ જીવંત છે કે નહીં તે દર્શાવે છે (હૅન્ડલર ચાલી શકે ત્યારે હંમેશાં 200; તે રેડીનેસની રાહ જોતું નથી). બંને હજી પણ રિક્વેસ્ટ હૅન્ડલિંગના સમાન Node event loop પર ચાલે છે, તેથી CPU-બાઉન્ડ કૅટલૉગ અથવા કમ્પ્રેશનનું કાર્ય તેમને વિલંબિત કરી શકે છે — વ્યસ્ત ≠ મૃત. જો HTTP પ્રોબ્સ ટાઇમઆઉટ થાય તો TCP લાઇવનેસને પ્રાધાન્ય આપો. પ્રોબ અંગે સંપૂર્ણ માર્ગદર્શન:
[મોનિટરિંગ માર્ગદર્શિકા — Kubernetes પ્રોબ માટેની ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy સાથે Docker Compose (HTTPS Auto-TLS)

Caddyની સ્વચાલિત SSL જોગવાઈનો ઉપયોગ કરીને OmniRouteને સુરક્ષિત રીતે જાહેર કરી શકાય છે. ખાતરી કરો કે તમારા ડોમેનનો DNS A રેકોર્ડ તમારા સર્વરના IP તરફ નિર્દેશ કરે છે.

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
      # OAuth કૉલબૅક્સ, ડૅશબોર્ડ લિંક્સ અને જનરેટ થયેલા સાર્વજનિક URLs માટે બ્રાઉઝર-ફેસિંગ ઑરિજિન.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # શેડ્યૂલ કરેલ જૉબ્સ / સેલ્ફ-ફેચ માટે આંતરિક સર્વર-ટુ-સર્વર URL.
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

Caddy અપસ્ટ્રીમ કન્ટેનર માટે પ્રમાણભૂત ફૉર્વર્ડિંગ હેડર્સ સેટ કરે છે. OmniRoute OAuth કૉલબૅક્સ અને જનરેટ થયેલી સાર્વજનિક
લિંક્સ માટે `NEXT_PUBLIC_BASE_URL`નો પ્રમાણભૂત સાર્વજનિક ઑરિજિન તરીકે ઉપયોગ કરે છે; પ્રમાણિત ડૅશબોર્ડ રાઇટ્સ સમાન-ઑરિજિન રિક્વેસ્ટ્સની સાથે સેશન-બાઉન્ડ CSRF
સુરક્ષાનો ઉપયોગ કરે છે. `OMNIROUTE_TRUST_PROXY`ને માત્ર એવા અદ્યતન ડિપ્લોયમેન્ટ્સ માટે સક્ષમ કરો જ્યાં તમે સ્પષ્ટ
કન્ફિગરેશનને બદલે વિશ્વસનીય ફૉર્વર્ડેડ હેડર્સમાંથી સાર્વજનિક ઑરિજિન નિર્ધારિત કરવા માટે ઇરાદાપૂર્વક OmniRouteનો ઉપયોગ કરવા માંગતા હો.

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

## ઇમેજ ટૅગ્સ

| ઇમેજ                     | ટૅગ      | કદ     | વર્ણન                                                |
| ------------------------ | -------- | ------ | ---------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | સર્વોચ્ચ **પ્રકાશિત** સ્થિર SemVer (git `main` નહીં) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps માટે આ પ્રકારના ટૅગને પિન કરો                 |

મલ્ટિ-પ્લેટફોર્મ મેનિફેસ્ટ: `linux/amd64` + `linux/arm64` નેટિવ (Apple Silicon, AWS Graviton, Raspberry Pi). Docker આપમેળે મેળ ખાતું આર્કિટેક્ચર પસંદ કરે છે; જો તમારે ARM હોસ્ટ્સ પર AMD64 ઇમ્યુલેશન ફરજિયાત કરવું હોય, તો `--platform linux/amd64` આપો.

### રિલીઝ ચૅનલ્સ

OmniRoute સ્થિર રિલીઝિસ, સક્રિય રિલીઝ-બ્રાન્ચ પરીક્ષણ અને ડેવલપમેન્ટ બિલ્ડ્સ માટે અલગ Docker ચૅનલ્સ પ્રકાશિત કરે છે.

| ચૅનલ                            | સ્રોત                                | પરિવર્તનક્ષમતા                  | ભલામણ કરેલ ઉપયોગ                                                                                                       |
| ------------------------------- | ------------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | સહી કરેલ/વર્ઝન કરેલ રિલીઝ            | અપરિવર્તનીય                     | ચોક્કસ રિલીઝને પિન કરતાં પ્રોડક્શન ડિપ્લોયમેન્ટ્સ                                                                      |
| `:latest` / `:latest-web`       | સર્વોચ્ચ **પ્રકાશિત** સ્થિર SemVer   | પરિવર્તનક્ષમ સ્થિર પોઇન્ટર      | SemVer પ્રકાશન જૉબ **પછી** સ્થિર રિલીઝિસને અનુસરે છે — `main` અથવા અપ્રકાશિત `release/v*` કમિટ્સને ટ્રૅક **કરતું નથી** |
| `:next` / `:next-web`           | વર્તમાન ડિફૉલ્ટ `release/v*` બ્રાન્ચ | પરિવર્તનક્ષમ પ્રી-રિલીઝ પોઇન્ટર | સક્રિય રિલીઝ બ્રાન્ચમાં સામેલ થયેલા પરંતુ હજુ સ્થિર રિલીઝમાં ન આવેલા સુધારાઓનું પરીક્ષણ                                |
| `:main` / `:main-web`           | `main` બ્રાન્ચ                       | પરિવર્તનક્ષમ ડેવલપમેન્ટ પોઇન્ટર | માત્ર ડેવલપમેન્ટ અને ઇન્ટિગ્રેશન પરીક્ષણ માટે                                                                          |

#### વેબ-સેશન પ્રોવાઇડર્સ: `-web` ઇમેજિસ

ઉપરની દરેક ચૅનલ `-web` ટૅગ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) તરીકે પણ ઉપલબ્ધ છે, જે `runner-web` સ્ટેજમાંથી બિલ્ડ કરવામાં આવે છે — સમાન ઇમેજ ઉપરાંત Playwright અને Chromium બ્રાઉઝર. સાદી ઇમેજ Chromium **વિના** આવે છે; `gemini-web`, `claude-web` અને `claude-turnstile`ને તેની જરૂર પડે છે.

નિષ્ફળતા સ્ટાર્ટઅપ સમયે નહીં, પરંતુ પાછળથી થાય છે: તે પ્રોવાઇડર્સ તેમના મૉડલ્સની યાદી આપે છે અને ડૅશબોર્ડમાં કનેક્ટ થયેલા દેખાય છે, પરંતુ માત્ર પ્રથમ રિક્વેસ્ટ નીચેની ભૂલ સાથે નિષ્ફળ જાય છે

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

જો તમે તે પ્રોવાઇડર્સનો ઉપયોગ કરો છો, તો તમે હાલમાં જે ચૅનલ પર છો તેનો `-web` ટૅગ પુલ કરો — બીજું કંઈ બદલાતું નથી. npm/CLI ઇન્સ્ટોલમાં (Docker ઇમેજ વિના), સમકક્ષ ખૂટતો ભાગ બ્રાઉઝર બાઇનરી છે: હોસ્ટ પર `npx playwright install chromium` ચલાવો.

#### પ્રી-રિલીઝ ચૅનલનો ઉપયોગ

`next` ચેનલ વર્તમાન ડિફૉલ્ટ `release/v*` બ્રાન્ચ પરના દરેક push વખતે ફરીથી બનાવવામાં આવે છે અને AMD64 તથા ARM64 બંને માટે પ્રકાશિત થાય છે. જૂની maintenance બ્રાન્ચો તેને overwrite કરી શકતી નથી. આગામી stable tag બનાવવામાં આવે તે પહેલાં સક્રિય release બ્રાન્ચમાં merge થયેલા સુધારાઓ માટે આ ચેનલ pull કરી શકાય તેવી image પૂરી પાડે છે.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose માટે, પસંદ કરેલી profile દ્વારા ઉપયોગમાં લેવાતી image tag ને override કરો, પછી service ને pull કરીને ફરીથી બનાવો:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### સુરક્ષા અને rollback

`next` એક બદલાતી રહેતી pre-release ચેનલ છે. સક્રિય release બ્રાન્ચ પરના કોઈપણ push વખતે તે બદલાઈ શકે છે અને production ઉપયોગ માટે **સમર્થિત નથી**. કોઈ ચોક્કસ build નું મૂલ્યાંકન કરતી વખતે image digest ને pin કરો:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

પરીક્ષણ પહેલાં, OmniRoute data volume અથવા bind-mounted data directory નો backup લો. rollback કરવા માટે, અગાઉ ઉપયોગમાં લેવાયેલ stable version અથવા digest ને restore કરો અને container ને ફરીથી બનાવો:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release-branch build ક્યારેય `latest` ને ખસેડી શકતું નથી; માત્ર પાત્ર stable semantic version જ stable pointer ને promote કરી શકે છે. `next` images માં release image inspection અને CRITICAL નબળાઈઓને અવરોધતો gate જાળવી રાખવામાં આવે છે.

**`latest`, git માટે તાજગીની ખાતરી નથી.** `main` અથવા સક્રિય `release/v*` બ્રાન્ચ પર merge થયેલા સુધારાઓ, stable SemVer image પ્રકાશિત થાય અને publish job `:latest` ને promote કરે (તે SemVer જેવો જ digest) ત્યાં સુધી `:latest` માં હોતા **નથી**. GitHub પર સુધારો પહેલેથી દેખાતો હોવા છતાં જો `latest` સ્થિર જણાય, તો release બ્રાન્ચનું પરીક્ષણ કરવા માટે `:next` pull કરો અથવા SemVer tag ની રાહ જુઓ.

| તમારી જરૂરિયાત                                                        | ઉપયોગ                                   |
| --------------------------------------------------------------------- | --------------------------------------- |
| એવું GitOps / production જેમાં ફેરફાર ન થવો જોઈએ                      | `:X.Y.Z` (અથવા image digest) ને pin કરો |
| પ્રકાશિત stable versions અનુસરો અને દરેક release પર recreate સ્વીકારો | `:latest`                               |
| અપ્રકાશિત `release/v*` commits નું પરીક્ષણ કરો                        | `:next` (production માટે નહીં)          |
| `main` નું પરીક્ષણ કરો                                                | `:main` (production માટે નહીં)          |

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

## ઉપલબ્ધતા: ડિફૉલ્ટ SQLite સિંગલ-રેપ્લિકા છે

સ્ટૉક Docker / Kubernetes OmniRoute એ **એક Node પ્રોસેસ + એક SQLite રાઇટર** છે. આ ટોપોલોજી પર ઉચ્ચ ઉપલબ્ધતા **સમર્થિત નથી**.

| મર્યાદા                                    | પરિણામ                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| એકમાત્ર રાઇટર                              | એક જ SQLite ફાઇલ સામે એકથી વધુ રેપ્લિકા **ચલાવશો નહીં**. તે DBને દૂષિત કરે છે.                                                                                                                                                                                                                                                         |
| ફરી બનાવવું / રિસ્ટાર્ટ / HEALTHCHECK kill | પ્રક્રિયામાં રહેલા SSE, ડેશબોર્ડ સેશન્સ અને ઇન-મેમરી સ્ટેટનો **સંપૂર્ણ આઉટેજ**. દરેક જોડાયેલ ક્લાયન્ટનું કનેક્શન તૂટી જાય છે. ખાલી-એન્ડપોઇન્ટ વિન્ડો દરમિયાન નવી વિનંતીઓને OmniRoute JSON નહીં, પરંતુ રિવર્સ-પ્રૉક્સી **`502 Bad Gateway: Unknown error`** મળે છે — ક્લાયન્ટ્સ તેને પ્રોવાઇડરની નિષ્ફળતાથી અલગ ઓળખી શકતા નથી (#11015). |
| `/healthz` જેવો જ ઇવેન્ટ લૂપ               | વ્યસ્ત કૅટલૉગ અથવા કમ્પ્રેશન ટિક પ્રોબ્સને વિલંબિત કરી શકે છે; ત્યારબાદ ટૂંકો ટાઇમઆઉટ **એકમાત્ર** રેપ્લિકાને રિસ્ટાર્ટ કરે છે.                                                                                                                                                                                                         |

**પ્રોબ મેટ્રિક્સ** ([Kubernetes પ્રોબ ભલામણો](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) પણ જુઓ):

| પ્રોબ                      | લક્ષ્ય                                                      | ઉપયોગ કરશો નહીં                                           |
| -------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| લાઇવનેસ                    | `PORT` પર TCP (ડિફૉલ્ટ `20128`), અથવા સોફ્ટ HTTP `/healthz` | `/api/monitoring/health`                                  |
| રેડીનેસ                    | HTTP `GET /healthz`                                         | ઇવેન્ટ લૂપ વ્યસ્ત હોવાને બંધ પડેલું ગણે એવા ટૂંકા ટાઇમઆઉટ |
| ઊંડાણપૂર્વક / મનુષ્યો માટે | `/api/monitoring/health`                                    | સ્વચાલિત kubelet લાઇવનેસ                                  |

**અપગ્રેડ્સ:** દરેક સેશનનું કનેક્શન તૂટશે તેવી અપેક્ષા રાખો. શક્ય હોય તો ક્લાયન્ટ્સને ડ્રેઇન કરો; ડિફૉલ્ટ SQLite પર કોઈ રોલિંગ અપડેટ નથી. Compose `restart: unless-stopped` તથા Docker `HEALTHCHECK` પણ કન્ટેનર Unhealthy થાય ત્યારે એકમાત્ર પ્રોસેસને બદલી દેશે — તેની અસરનો વ્યાપ પણ સમાન રહેશે.

**એક રેપ્લિકા** માટે Kubernetes સ્નિપેટ (Recreate આવશ્યક છે; એક SQLite ફાઇલ સામે `replicas` વધારશો નહીં):

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

`preStop` sleep, SIGTERM પહેલાં kube ને Service endpoints દૂર કરવા દે છે, જેથી **નવો** ટ્રાફિક બંધ થઈ રહેલી process સુધી પહોંચવાનું બંધ કરે. ચાલુ `/v1/responses` SSE ને heavyweight admission leases (#11015) દ્વારા `SHUTDOWN_TIMEOUT_MS` (ડિફૉલ્ટ 30s) સુધી drain કરવામાં આવે છે. તેમ છતાં process સુધી પહોંચતી નવી requests ને `503` + `Retry-After: 5` મળે છે. replacement Ready થાય ત્યાં સુધીનો Recreate empty-endpoint gap એક સંપૂર્ણ outage જ રહે છે — આ SQLite topology છે, probe નું misconfiguration નથી.

External Postgres / multi-writer HA એ દસ્તાવેજીકૃત stock path **નથી**. જો તમને HAની જરૂર હોય, તો એક જ replica રાખો અથવા project દ્વારા અલગથી પરીક્ષણ અને દસ્તાવેજીકરણ કરાયેલી topology ચલાવો. Postgres/MySQL સંબંધિત કામ [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)માં છે. તે ઉપલબ્ધ ન થાય ત્યાં સુધી, **મોટી** `/v1/responses` capacity વધારવાની એકમાત્ર સમર્થિત રીત N સ્વતંત્ર processes (આગલો વિભાગ) છે, એક volume પર `replicas > 1` નહીં.

## સ્કેલ-આઉટ: N સ્વતંત્ર પ્રોસેસ

એક Node પ્રોસેસ એટલે **એક V8 heap**. એકબીજા સાથે ઓવરલેપ થતી ~3 MiB / ~750k-token કોડિંગ-એજન્ટ `POST /v1/responses` વિનંતીઓ (RTK + Caveman) ~12 Gi પર તે heap ને અબોર્ટ કરાવે છે (`FATAL ERROR: Reached heap limit`) અને 16 Gi cgroup માં OOM સર્જી શકે છે. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) જુઓ. આ માપન એક **મેમરી-બજેટ** ચેતવણી છે, એકસાથે ચાલતી બે લાંબી `/v1/responses` માટેની ઉત્પાદનની કઠોર મહત્તમ મર્યાદા નથી. હેવીવેઇટ ચેટની સ્વીકૃતિ આપમેળે મેળવાયેલા ઇન્જેસ્ટ બાઇટ બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) દ્વારા નિયંત્રિત થાય છે, જે એ જ V8/cgroup મર્યાદાના આધારે માપબદ્ધ કરાયેલું છે — પહેલેથી માપબદ્ધ કરાયેલી પ્રોસેસ પર તેને વધારીને ઓવરરાઇડ કરવાથી (અથવા જૂની `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` વિનંતી-સંખ્યા મર્યાદા સેટ કરવાથી) અબોર્ટ ફરી સર્જાય છે. નાની ચેટ્સ, `/healthz`, `/v1/models`, અને MCP આ મર્યાદામાં **નથી**.

### એક પ્રોસેસ: બે કરતાં વધુ લાંબી `/v1/responses`

એક **સ્વસ્થ** પ્રોસેસ (heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` કરતાં નીચે, ડિફૉલ્ટ `0.75`) એકસાથે બે કરતાં વધુ લાંબી `POST /v1/responses` વિનંતીઓ ચલાવી **શકે છે**, જો પ્રોસેસ-વ્યાપી ઇનફ્લાઇટ-બાઇટ બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) માં હજુ જગ્યા હોય. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` જેટલી અથવા તેનાથી મોટી બોડીઝ (ડિફૉલ્ટ 256 KiB) સ્ટ્રક્ચર-હેવી વિનંતીઓ જેવી જ હેવીવેઇટ લીઝ લે છે અને એ જ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` એસ્કેપ (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`) નો ઉપયોગ કરે છે. એકસાથે દસેક લાંબા SSE ક્લાયન્ટ્સ (ઓપરેટરોને ઘણીવાર 40–50ની જરૂર પડે છે) ચલાવવા એ **મેમરી-બજેટ**નો પ્રશ્ન છે — heap + પ્રાથમિક/headroom સ્લોટ્સ + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`નું માપ નક્કી કરો — તે ઉત્પાદનની કઠોર “મહત્તમ 2” મર્યાદા નથી. દબાણ હેઠળનું heap હજી પણ ફરી પ્રયાસ કરી શકાય તેવા `503` સાથે લોડ ઘટાડે છે, જેથી #7849 ફરી ન સર્જાય.

**એકથી વધુ heaps** (સ્વતંત્ર V8 old-spaces) બનાવવા માટે **આજે**:

| કરો                                                                                                                                                | ન કરો                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **N containers/pods** ચલાવો, દરેકનું **પોતાનું** `DATA_DIR` / volume હોય                                                                           | એક જ SQLite ફાઇલ સામે `replicas > 1` સેટ ન કરો         |
| heap / inflight-byte બજેટના આધારે ભારે in-flight + healthy-headroom માપબદ્ધ કરો; 1–2 રૂઢિચુસ્ત #7849 ડિફૉલ્ટ છે, ઉત્પાદનની કઠોર મહત્તમ મર્યાદા નથી | એક પ્રોસેસને 8× RAM અને અમર્યાદિત ગણતરી મર્યાદા ન આપો  |
| વૈકલ્પિક: **વહેંચાયેલા ક્વોટા કાઉન્ટર્સ** માટે `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`                                                | Redis ને વહેંચાયેલ SQLite ન માનો — તે એવું નથી         |
| દરેક ઇન્સ્ટન્સમાં પ્રોવાઇડર સિક્રેટ્સની નકલ કરો (અથવા વિભાજિત ડૅશબોર્ડ્સ સ્વીકારો)                                                                 | ઇન્સ્ટન્સમાં એક ડૅશબોર્ડ / એક કૉલ-લૉગની અપેક્ષા ન રાખો |
| આગળ કોઈપણ લોડ બેલેન્સર મૂકો; API કી અથવા સેશન પ્રમાણે સ્ટિકી રાખવું પૂરતું છે                                                                      | વેન્ડર-વિશિષ્ટ સાઇઝ-અવેર મિડલવેરની આવશ્યકતા ન રાખો     |

હાર્ડવેર: દરેક ઇન્સ્ટન્સમાં એકસાથે ચાલતી લાંબી `/v1/responses`ની સંખ્યા એ **મેમરી-બજેટ**નો પ્રશ્ન છે (heap + inflight-byte / #10110). સ્વતંત્ર `DATA_DIR` ધરાવતા `N` ઇન્સ્ટન્સ હજી પણ heaps ને ગુણાકારે વધારે છે: હોસ્ટ RAM એ `N × cgroup`ને સમાવી શકે એટલી હોવી જોઈએ, “N=8 ધરાવતો એક 16 Gi pod” નહીં. એક SQLite ફાઇલ પર ક્યારેય `replicas > 1` ન રાખો.

Compose રૂપરેખા (બે heaps, બે volumes — `deploy.replicas: 2` નહીં):

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

ઇન-પ્રોસેસ ડેન્સિટી (HTTP isolateની બહાર compression) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) છે. વહેંચાયેલી ટકાઉ સ્ટેટ પર એક તાર્કિક ક્લસ્ટર [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) છે.

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
