# 🐳 Docker Guide — OmniRoute (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Marejeleo kamili ya upelekaji kwa Docker. Kwa kuanza haraka, angalia [sehemu ya Docker katika README](../README.md#-docker).

## Yaliyomo

- [Uendeshaji wa Haraka](#quick-run)
- [Kwa Kutumia Faili ya Mazingira](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Wasifu Unaopatikana](#available-profiles)
- [Kusanidi zana za CLI za mfumo mwenyeji wakati OmniRoute inaendeshwa katika Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose ya Mazingira ya Uzalishaji](#production-compose)
- [Hatua za Dockerfile](#dockerfile-stages)
- [Vigezo Muhimu vya Mazingira](#critical-environment-variables)
- [Docker Compose pamoja na Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Handaki la Haraka la Cloudflare](#cloudflare-quick-tunnel)
- [Lebo za Image](#image-tags)
- [Masasisho ya Dashibodi katika Docker](#dashboard-updates-in-docker)
- [Upatikanaji: SQLite chaguomsingi ni nakala moja](#availability-default-sqlite-is-single-replica)
- [Hitilafu za kikanda za Gemini ndani ya Docker](#gemini-regional-errors-inside-docker)
- [Maelezo Muhimu](#important-notes)

---

## Uendeshaji wa Haraka

> **Unataka kujihosti kwa amri moja?** Angalia
> [Mwongozo wa Kujihosti](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image iliyochapishwa +
> Redis, loopback pekee, hakuna uchaguzi wa wasifu). Uendeshaji wa Haraka hapa chini ni
> njia ya kontena moja kwa watumiaji ambao tayari wanaendesha Redis mahali pengine.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Kwa Kutumia Faili ya Mazingira

```bash
# Nakili na uhariri .env kwanza
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
# Wasifu wa msingi (bila zana za CLI)
docker compose --profile base up -d

# Wasifu wa CLI (Claude Code, Codex, OpenClaw zimejumuishwa)
docker compose --profile cli up -d

# Wasifu wa mfumo mwenyeji (unatanguliza Linux; huunganisha programu za CLI za mfumo mwenyeji kwa hali ya kusoma pekee)
docker compose --profile host up -d

# Wasifu wa wavuti (Chromium/Playwright kwa watoa huduma wa vipindi vya wavuti)
docker compose --profile web up -d

# Unganisha CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Wasifu Unaopatikana

OmniRoute huja na wasifu wa Compose kwa miundo mikuu ya upelekaji. Chagua unaolingana na mazingira yako.

| Wasifu                | Huduma           | Wakati wa kutumia                                                                                                                                                                         | Amri                                         |
| --------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (chaguomsingi) | `omniroute-base` | Seva isiyo na kiolesura cha picha / mazingira ya utekelezaji ya kiwango cha chini, bila CLI za watoa huduma zilizojumuishwa                                                               | `docker compose --profile base up -d`        |
| `cli`                 | `omniroute-cli`  | Mitiririko ya kazi ya mawakala inayotumia `omniroute providers/setup/doctor` na CLI zilizojumuishwa (Codex, Claude Code, Droid, OpenClaw)                                                 | `docker compose --profile cli up -d`         |
| `host`                | `omniroute-host` | Mifumo mwenyeji ya Linux inayotaka ufikiaji unaofanana na `network_mode` kwa CLI za mfumo mwenyeji kwa kuunganisha `~/.local/bin`, `~/.codex`, `~/.claude`, n.k. kwa hali ya kusoma pekee | `docker compose --profile host up -d`        |
| `cliproxyapi`         | `cliproxyapi`    | Endesha [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar kwenye porti `8317` kwa ajili ya kuelekeza maombi kupitia proksi ya CLI ya upande wa juu                      | `docker compose --profile cliproxyapi up -d` |
| `web`                 | `omniroute-web`  | Watoa huduma wa vipindi vya wavuti wanaohitaji kivinjari: `gemini-web`, `claude-web`, `claude-turnstile` (hujenga `runner-web`, Chromium imejumuishwa)                                    | `docker compose --profile web up -d`         |

> Wasifu kadhaa unaweza kuunganishwa: `docker compose --profile cli --profile cliproxyapi up -d`.

## Kusanidi zana za CLI za hosti wakati OmniRoute inaendeshwa kwenye Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` na kitufe cha
**Hifadhi usanidi** cha dashibodi zote huandika faili kama `~/.codex/*.config.toml`. Njia hizo
zina maana tu kwenye mashine ambako CLI inaendeshwa. Ukiziendesha ndani ya
kontena, uandishi huo unaishia kwenye saraka ya nyumbani ya kontena lenyewe (`/home/node` —
taswira inaendesha `USER node`), ambako hakuna CLI ya hosti itakayowahi kuusoma na ambako
unafutwa mara tu kontena linapoundwa upya.

OmniRoute hutambua hili na kukataa uandishi huo huku ikitoa maelekezo badala ya
kuripoti mafanikio ambayo huwezi kutumia: CLI hutoka kwa msimbo `2`, na API hujibu `422`
ikiwa na `containerEphemeralTarget: true`.

### Inapendekezwa: endesha CLI kwenye hosti, OmniRoute kwenye Docker

Kontena huhudumia API; CLI husanidi zana zako za hosti.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # elekeza CLI kwenye kontena
omniroute setup-codex                      # huandika ~/.codex halisi kwenye hosti yako
```

Hili ndilo chaguo sahihi wakati Codex, Claude Code, Cursor au zana zinazofanana zinaendeshwa kwenye
laptopu yako — ambao ndio usanidi wa kawaida.

### Mbadala: unganisha saraka za usanidi za hosti kwa bind mount (wasifu wa `host`)

Ikiwa unataka kontena lenyewe liandike usanidi wa hosti yako, unganisha
saraka hizo ndani na uelekeze `CLI_CONFIG_HOME` kwenye mzizi wa sehemu iliyounganishwa. Wasifu wa `host`
tayari hufanya hivi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount ndiyo inayofanya njia hiyo iaminike: OmniRoute husoma
`/proc/self/mountinfo` na kuruhusu uandishi kwenye njia zilizounganishwa (na kwenye saraka
ambazo saraka zake za ndani ni sehemu zilizounganishwa, ambalo ndilo hasa umbo la `/host-home` hapo juu), huku
bado ikikataa zile ambazo hazijaunganishwa.

### Njia ya dharura: sanidi CLI za kontena lenyewe (tumia kwa tahadhari)

Wakati CLI kwa kweli zipo ndani ya kontena (wasifu wa `cli`), uandishi huo
unakusudiwa. Pitisha `--allow-container-write` kwa amri yoyote ya `setup-*`, au weka
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` kwa seva. Uandishi unaendelea
ukiwa na onyo kwamba hautadumu baada ya kontena kuondolewa.

> **Onyo la usalama — wasifu wa `cli` + sehemu iliyounganishwa ya `docker.sock`.**
> Wasifu wa `cli` huunganisha `/var/run/docker.sock` kwa bind mount ili kisasishaji-kiotomatiki
> cha ndani ya kontena kiweze kuunda upya mkusanyiko kutoka kwa daemoni ya hosti
> (`src/lib/system/autoUpdate.ts` hukagua soketi hiyo na kuruka
> njia ya Docker ikiwa haipo). Soketi hiyo ni **mpaka wa uaminifu wenye mamlaka ya root ya
> hosti**: chochote kinachoweza kuifikia hudhibiti daemoni ya Docker ya hosti kama
> root — kinaweza kuunda, kukagua, kusimamisha na kuondoa kontena lolote kwenye hosti.
> Athari zake:
>
> 1. **Kamwe usifichue porti ya wasifu wa `cli` kwenye mtandao.** Ichapishe
>    kwenye `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — wasifu wa `cli` unaofikiwa kupitia LAN hugeuza RCE yoyote ya kiwango cha dashibodi kuwa
>    uvamizi kamili wa hosti.
> 2. **Usiunganishe saraka nyingine zozote za hosti ndani ya wasifu wa `cli`.**
>    Soketi ya Docker pamoja na sehemu nyingine yoyote iliyounganishwa hulipa kontena uwezo kamili wa
>    kusoma/kuandika mfumo wako wa faili na usanidi wa hosti. Ikiwa unahitaji zana
>    ifikie mradi, iendeshe ndani ya mfumo wako kwa kutumia faili tekelezi ya CLI — usiiunganishe
>    ndani ya kontena la `cli`.
>
> Ikiwa huhitaji usasishaji-kiotomatiki wa ndani ya kontena, usiwashe wasifu wa `cli`
> (`COMPOSE_PROFILES=core,redis` au kifupi zaidi). Wasifu mwingine
> hauunganishi soketi ya Docker.
>
> Tazama `docs/security/MITM-TPROXY-DECRYPT.md` (git; haijajumuishwa ndani ya `/docs`) kwa modeli husika ya vitisho
> kuhusu MITM, na `docs/security/SUPPLY_CHAIN.md` kwa
> mnyororo wa asili ya faili tekelezi za `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute hutegemea Redis kuendesha kikomo cha kasi kilichosambazwa na akiba iliyoshirikiwa. Huduma ya `redis` **hufafanuliwa kila wakati** katika `docker-compose.yml` (haina kizuizi cha wasifu) na huanza pamoja na wasifu mwingine wowote.

| Maelezo                          | Thamani                                          |
| -------------------------------- | ------------------------------------------------ |
| Taswira                          | `redis:7-alpine`                                 |
| Jina la kontena                  | `omniroute-redis`                                |
| Mlango wa ndani                  | `6379`                                           |
| Mlango wa seva (ubatilisho)      | `REDIS_PORT` (chaguo-msingi ni `6379`)           |
| Kufungamanisha seva (ubatilisho) | `REDIS_BIND_HOST` (chaguo-msingi ni `127.0.0.1`) |
| Juzuu                            | `omniroute-redis-data` → `/data`                 |
| Ukaguzi wa afya                  | `redis-cli ping` (kipindi cha sekunde 10)        |

Vigezo vinavyohusiana vya mazingira:

- `REDIS_URL` — mfuatano wa muunganisho unaowekwa kwenye programu (`redis://redis:6379` kwa chaguo-msingi).
- `REDIS_PORT` — ulinganishaji wa mlango wa upande wa seva kwa kontena la Redis.
- `REDIS_BIND_HOST` — kiolesura cha seva ambacho mlango unachapishwa kwacho. Chaguo-msingi ni `127.0.0.1`.

> **Kwa nini loopback hutumika kwa chaguo-msingi:** sidecar huendeshwa bila `requirepass`, na makontena
> ya programu huifikia kupitia mtandao wa compose (`redis:6379`) — mlango uliochapishwa
> upo tu kwa ajili ya zana za upande wa seva (`redis-cli`, `npm run dev` ya ndani). Kuchapisha kwenye
> `0.0.0.0` kungefichua Redis isiyo na uthibitishaji kwa kila seva kwenye LAN yako. Ukiweka
> `REDIS_BIND_HOST=0.0.0.0`, ongeza pia `--requirepass` kwenye `command:` ya huduma.

**Kuzima Redis** hakupendekezwi (kikomo cha kasi kitashuka hadi kutumia mbadala wa kumbukumbu ya ndani). Iwapo ni lazima, ama ondoa/toa maoni kwenye kizuizi cha huduma cha `redis:` katika `docker-compose.yml` au kipunguze hadi sufuri:

```bash
docker compose up -d --scale redis=0
```

## Compose ya Uzalishaji

Kwa picha-tuli ya uzalishaji iliyotengwa inayoendeshwa sambamba na mazingira ya usanidi, tumia `docker-compose.prod.yml`.

| Maelezo                           | Thamani                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| Faili                             | `docker-compose.prod.yml`                                                             |
| Mlango chaguo-msingi wa dashibodi | `PROD_DASHBOARD_PORT=20130` (umelinganishwa na `${DASHBOARD_PORT:-20128}` ya ndani)   |
| Mlango chaguo-msingi wa API       | `PROD_API_PORT=20131`                                                                 |
| Taswira                           | `omniroute:prod` (imejengwa kutoka lengo la `runner-cli`)                             |
| Kontena la Redis                  | `omniroute-redis-prod` (`redis:8.6.2`, juzuu maalum ya `redis-prod-data`)             |
| Juzuu ya data                     | `omniroute-prod-data` (imepewa jina, huhifadhiwa katika ujenzi upya)                  |
| Ukaguzi wa afya                   | `node healthcheck.mjs` + `redis-cli ping`, huku `depends_on` ikitegemea afya ya Redis |

Jinsi ya kutumia:

```bash
# Jenga na uanzishe mfumo wa uzalishaji
docker compose -f docker-compose.prod.yml up -d --build

# Tiririsha kumbukumbu
docker compose -f docker-compose.prod.yml logs -f

# Zima mfumo (hifadhi juzuu)
docker compose -f docker-compose.prod.yml down
```

Mfumo wa uzalishaji huendeshwa sambamba na compose ya usanidi (majina ya makontena, milango na juzuu ni tofauti), kwa hivyo unaweza kuendelea kufanya maboresho ndani ya mazingira yako huku uzalishaji ukiendelea kufanya kazi.

## Hatua za Dockerfile

Hazina huja na Dockerfile ya hatua nyingi (`Dockerfile`). Hatua nne zinapatikana; chagua `target` inayofaa kwa matumizi yako.

| Hatua         | Picha msingi          | Madhumuni                                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Husakinisha vitegemezi (`npm ci --legacy-peer-deps`) na kutekeleza `npm run build` (Turbopack kwa chaguo-msingi — tazama Rasilimali za wakati wa uundaji hapa chini)                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Mazingira ya utekelezaji wa uzalishaji yenye matokeo huru ya Next.js. **Hakuna CLI za watoa huduma zilizojumuishwa.**                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Huongeza `git`, `docker.io`, `docker-compose` na CLI za kimataifa: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Chagua hii kwa mitiririko ya kazi ya kiwakala.**                                                                                                                  |
| `runner-web`  | `runner-base`         | Huongeza Playwright + kivinjari cha Chromium (`--with-deps`) kwa watoa huduma wa vipindi vya wavuti: `gemini-web`, `claude-web`, `claude-turnstile`. **Chagua hii unapotumia watoa huduma hao** — picha ya kawaida hushindwa wakati wa ombi bila hiyo (tazama dokezo la `-web` chini ya Vituo vya Toleo). |

Unda lengo mahususi wewe mwenyewe:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Rasilimali za wakati wa uundaji

Hoja tatu za uundaji hudhibiti gharama ya hatua ya `builder`. Zinatumika wakati wa uundaji pekee —
`OMNIROUTE_MEMORY_MB` (hapa chini) ni kidhibiti tofauti cha wakati wa utekelezaji.

| Hoja ya uundaji             | Chaguo-msingi | Athari                                                                                               |
| --------------------------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`           | `0` huunda kwa webpack: kumbukumbu ya kilele ya chini, lakini polepole zaidi. `1` huwasha Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | Kikomo cha heap ya V8 (`--max-old-space-size`) kwa `next build` iliyoanzishwa.                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Huweka `CIRCLE_NODE_TOTAL`; Next hukokotoa `workers = N - 1` kwa ukusanyaji wa data ya kurasa.       |

`OMNIROUTE_BUILD_WORKERS` ndiyo inayopaswa kuongezwa kwenye builder kubwa na ndiyo
inayopaswa kushukiwa wakati uundaji wenye rasilimali chache unapokufa **baada ya** `✓ Compiled successfully`. Kila
worker wa data ya kurasa ni mchakato wake wenyewe, na vivyo hivyo kwa `next build` mzazi;
ujaribio wa moja kwa moja kwenye VPS (suala #7518) ulipima kilele cha RSS cha kila mchakato kuwa
~4.5 GB bila kutegemea alama ya heap ya `NODE_OPTIONS` (Turbopack hukusanya katika
kumbukumbu asilia/Rust iliyo nje ya heap ya V8). Chaguo-msingi la `2` (→ worker 1, jumla ya
michakato 2) limekadiriwa kwa runners zinazopangishwa na GitHub zenye 16 GB / vCPU 4 ambazo
mchakato wa uchapishaji hutumia. Kwa `8` (→ workers 7), runner hiyo iliishiwa na kumbukumbu na
buildkit ikashindwa kutekeleza hatua kwa `ResourceExhausted: ... cannot allocate memory`;
`3` (→ workers 2) bado haikutoshea baada ya RSS ya kila mchakato kupimwa
moja kwa moja badala ya kukisiwa. `tests/unit/docker-build-memory-budget.test.ts`
hufanya hesabu dhidi ya thamani iliyopimwa na hushindwa ikiwa mojawapo ya vidhibiti
inazidi uwezo wa runner.

Turbopack hukusanya katika kumbukumbu asilia ya Rust ambayo ipo **nje** ya heap ya V8, kwa hivyo
`OMNIROUTE_BUILD_MEMORY_MB` haiwekei kikomo. Kwenye host yenye kikomo cha kumbukumbu,
uundaji huuawa kwa SIGKILL na OOM killer bila maandishi yoyote ya hitilafu — unasimama tu
katikati ya `Creating an optimized production build`, jambo linaloonekana kama kukwama badala
ya kuishiwa na kumbukumbu. Ndiyo maana `Dockerfile` hutumia webpack kwa chaguo-msingi
(`OMNIROUTE_USE_TURBOPACK=0`), tofauti na `npm run dev` / `npm run build`, ambapo
Turbopack ndiyo chaguo-msingi katika msimbo: `docker build .` ya kawaida isiyo na hoja za uundaji (ambayo
Railway na host nyingine za mbofyo mmoja hutekeleza) haipaswi kufa kimya kwenye
builder yenye kikomo cha kumbukumbu. Picha zilizochapishwa tayari hupitisha `OMNIROUTE_USE_TURBOPACK=0`
waziwazi katika `docker-publish.yml`. Kwenye builder yenye RAM ya kutosha, washa
Turbopack ili kupata uundaji wa haraka zaidi:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` imewashwa, kwa hivyo `next build` huendesha mchakato mzazi **na** mchakato wa worker
na kila mmoja hutii `OMNIROUTE_BUILD_MEMORY_MB` kivyake. Weka kikomo cha container
juu ya takribani mara mbili ya thamani hiyo, si mara moja.

Vipimo kwenye mti huu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Kikomo cha container | Matokeo                                |
| --------- | -------------------- | -------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | Iliuawa na OOM kwa vyote viwili, kimya |
| webpack   | 8 GiB                | worker wa uundaji aliuawa kwa SIGKILL  |
| webpack   | 12 GiB               | ilifanikiwa, kilele kilikuwa 11.1 GiB  |

### Chaguo-msingi za wakati wa utekelezaji

Chaguo-msingi zinazosafirishwa na `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Tabia ya kumbukumbu katika Docker:

- Picha huweka `OMNIROUTE_MEMORY_MB=1024` na kutengeneza `NODE_OPTIONS=--max-old-space-size=1024` kutokana nayo.
- Mchakato halisi wa seva huanzishwa na kizinduzi huru, ambacho husoma `OMNIROUTE_MEMORY_MB` na kuambatisha `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node hutumia thamani ya mwisho ya `--max-old-space-size` iliyorudiwa, kwa hivyo kuweka `OMNIROUTE_MEMORY_MB` hudhibiti kikomo halisi cha heap ya Docker.
- Kwa sababu picha huiweka kila wakati, thamani mbadala ya kizinduzi iliyosawazishwa kulingana na RAM haitumiki kamwe chini ya Docker. Iongeze waziwazi kulingana na mzigo wa kazi (jedwali lililo hapa chini). `2048` bado ni ndogo mno kwa `/v1/responses` ya wakala wa uandishi wa msimbo.

### RAM ya wakati wa utekelezaji kwa mawakala wa uandishi wa msimbo

Chaguo-msingi la Docker la GiB 1 ni kiwango cha chini kwa dashibodi/mazungumzo mepesi, si ukubwa wa uzalishaji. Miili mirefu ya `POST /v1/responses` (mamia ya ujumbe, makumi ya zana) huhifadhi grafu nyingi kwenye kumbukumbu wakati wa ubanaji. Maombi mawili yanayopishana ya takriban MiB 3 / tokeni 750k kila moja yamesababisha V8 kusitishwa kwenye old-space ya **GiB 12** (`FATAL ERROR: Reached heap limit`) na pia yamesababisha OOM ya cgroup ya GiB 16. Tazama [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Weka ukubwa wa **cgroup `--memory` juu ya heap** — bafa asilia, SQLite, na data za kati za ubanaji hukaa nje ya V8.

| Mzigo wa kazi                                          | `OMNIROUTE_MEMORY_MB`               | Kontena / cgroup               | Maelezo                                                                                                               |
| ------------------------------------------------------ | ----------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Dashibodi, mazungumzo mepesi moja                      | `1024` (chaguo-msingi la picha)     | ≥2 GiB                         |                                                                                                                       |
| Wakala mmoja wa uandishi wa msimbo (Claude/Codex/Grok) | `8192`                              | ≥10 GiB                        | Kipindi kimoja cha kawaida cha `/v1/responses`                                                                        |
| `/v1/responses` mbili ndefu kwa wakati mmoja           | `10240`–`12288`                     | ≥12–16 GiB                     | Kusitishwa kwa V8 kulikopimwa kwenye heap ya takriban GiB 12                                                          |
| Miktadha mirefu mitatu au zaidi kwa wakati mmoja       | usifanye hivi kwenye mchakato mmoja | panga kwa mfuatano / RAM zaidi | Chaguo-msingi la uingizaji wa mzigo mzito ni ombi 1 linaloendelea; kuliongeza bila RAM hurejesha tatizo la kusitishwa |

`omniroute serve` kwenye bare metal husawazisha takriban 35% ya RAM (ikiwa imewekewa mipaka ya `[512, 4096]`) wakati `OMNIROUTE_MEMORY_MB` **haijawekwa**. Docker huweka `1024` kila wakati, kwa hivyo usawazishaji huo hautekelezwi kamwe kwenye picha rasmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Vigezo Muhimu vya Mazingira

Zaidi ya chaguo-msingi yaliyoandikwa katika [ENVIRONMENT.md](../reference/ENVIRONMENT.md), vigezo vifuatavyo ni muhimu zaidi wakati wa kuendesha chini ya Docker:

| Kigezo                        | Madhumuni                                                                                                                                                                                                                                                                                                    | Chaguo-msingi               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Siri inayoshirikiwa kwa daraja la WebSocket. **Inahitajika katika mazingira ya uzalishaji** — iweke kuwa mfuatano thabiti wa nasibu.                                                                                                                                                                         | haijawekwa (lazima itolewe) |
| `REDIS_URL`                   | Mfuatano wa muunganisho kwa kidhibiti cha kiwango / sehemu ya nyuma ya akiba                                                                                                                                                                                                                                 | `redis://redis:6379`        |
| `REDIS_PORT`                  | Mlango wa upande wa mwenyeji kwa kontena la Redis lililojumuishwa                                                                                                                                                                                                                                            | `6379`                      |
| `REDIS_BIND_HOST`             | Kiolesura cha mwenyeji ambacho mlango wa Redis uliojumuishwa unachapishwa kwacho (loopback isipokuwa uongeze AUTH)                                                                                                                                                                                           | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Njia ya mwenyeji iliyopachikwa kwenye wasifu wa `cli` katika `/workspace/omniroute` kwa mtiririko wa kazi wa kujisasisha                                                                                                                                                                                     | `.` (saraka ya sasa)        |
| `OMNIROUTE_MEMORY_MB`         | Kikomo cha heap ya Node wakati wa utekelezaji kwa seva inayojitegemea ya Docker; hubatilisha chaguo-msingi la picha lililo hapo juu. Mawakala wa uandishi wa msimbo: `8192`+ (angalia [RAM ya wakati wa utekelezaji](#runtime-ram-for-coding-agents)).                                                       | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Hubatilisha milango iliyofichuliwa ya dashibodi (20128) na API (20129)                                                                                                                                                                                                                                       | `20128` / `20129`           |
| `APP_BIND_HOST`               | Kiolesura cha mwenyeji ambacho docker-compose huchapisha milango ya dashibodi/API/live-WS kwacho. Kwa `REQUIRE_API_KEY=false` (chaguo-msingi), `0.0.0.0` hufichua proksi isiyohitaji utambulisho ya `/v1` kwa LAN — panua ufikiaji tu kwa `REQUIRE_API_KEY=true` au kwa kuweka proksi ya kinyume mbele yake. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Kiolesura cha mwenyeji ambacho docker-compose huchapisha sidecar ya `cliproxyapi` kwacho — ujazo wake wa data huhifadhi vitambulisho vya watoa huduma.                                                                                                                                                       | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Saraka ambayo kichanganuzi cha programu-jalizi cha wakati wa utekelezaji husoma na kusakinisha ndani yake. Iweke wakati programu-jalizi zimepachikwa kwa bind mount: chaguo-msingi hufuata `HOME`, ambayo si lazima picha i-export.                                                                          | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | Njia ndogo ya URL wakati programu imechapishwa nyuma ya proksi ya kinyume (mfano `/omniroute`)                                                                                                                                                                                                               | _(tupu = mzizi)_            |
| `NEXT_PUBLIC_BASE_URL`        | Chanzo cha umma cha kivinjari kinachojumuisha njia ndogo (mfano `https://host/omniroute`)                                                                                                                                                                                                                    | haijawekwa                  |
| `PROD_DASHBOARD_PORT`         | Mlango wa dashibodi wa upande wa mwenyeji kwa `docker-compose.prod.yml`                                                                                                                                                                                                                                      | `20130`                     |
| `CLIPROXYAPI_PORT`            | Mlango wa upande wa mwenyeji kwa sidecar ya `cliproxyapi`                                                                                                                                                                                                                                                    | `8317`                      |

## Proksi ya Kinyume kwenye Njia Ndogo (Traefik / nginx)

`basePath` ya Next.js hujumuishwa ndani ya kifurushi cha standalone wakati wa uundaji. OmniRoute huhifadhi thamani
iliyopachikwa katika faili maalum kwenye mzizi wa programu (inayoandikwa wakati wa `npm run build`; inayosomwa na
`scripts/docker/ensure-docker-base-path.mjs`) na kuilinganisha na
`OMNIROUTE_BASE_PATH` wakati kontena linapoanza. Zinapotofautiana na image ilikuwa
imeundwa kwa ajili ya mzizi wa kikoa, entrypoint huandika upya manifesti za standalone,
thamani za `basePath`/`assetPrefix` zilizopachikwa (Next 16 huunda URL za asset za SSR kutoka
`assetPrefix` pekee — kirekebishaji hunakili njia ndogo ndani yake), URL za asset za
`/_next/static` zilizopachikwa (manifesti za marejeleo ya mteja, uingizaji wa media, kurasa za
hitilafu zilizoundwa mapema) na shim ya `process.env` ya mteja kabla ya `node dev/run-standalone.mjs`
kuendeshwa.

### Uundaji kwa Compose (unapendekezwa)

Weka vigezo vyote viwili katika `.env`, kisha unda upya ili image na mazingira ya utekelezaji yalingane:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` hupitisha `OMNIROUTE_BASE_PATH` kama hoja ya uundaji ya Docker na kama
kigezo cha mazingira cha wakati wa utekelezaji.

### Image ya mzizi iliyoundwa mapema + njia ndogo wakati wa utekelezaji

Image za `diegosouzapw/omniroute:*` zilizochapishwa zimeundwa kwa ajili ya mzizi wa kikoa. Bado unaweza
kuweka `OMNIROUTE_BASE_PATH` wakati wa utekelezaji; kontena hurekebisha kifurushi mara moja linapoanza.
Ihusishe na asili ya umma inayolingana:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Sanidi proksi ya kinyume ili ipitishe njia **kamili** ya nje (usiondoe
kiambishi awali). Traefik inapaswa kuelekeza `PathPrefix(`/omniroute`)` kwenye kontena bila
`StripPrefix`, ili Next.js ipokee `/omniroute/...` na itoe asset kutoka
`/omniroute/_next/...`.

Ukaguzi wa afya wa Docker huchunguza endpoint nyepesi ya mzunguko wa maisha ya `/healthz` iliyopewa
kiambishi awali cha `OMNIROUTE_BASE_PATH` kinachotumika. `/api/monitoring/health` huendelea kupatikana kwa
uchunguzi wa binadamu/dashibodi; ili kuelekeza HEALTHCHECK ya kontena irudi kwake (kwa mfano
kwa utekelezaji wa ukaguzi wa kina wa afya), weka `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Njia hiyo ni ukaguzi **wa kina** (DB + muhtasari wa ufuatiliaji) — unafaa kwa
`HEALTHCHECK` ya Docker isiyofanywa mara kwa mara ikiwa utaamua kuitumia tena, lakini **si** kwa vipindi vya
`livenessProbe` vya Kubernetes.

Kwa waratibu (Kubernetes, Nomad, n.k.):

| Uchunguzi       | Pendekezo kuu                                                             | Epuka                                                                                           |
| --------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Uhai            | HTTP `GET /livez`, au TCP kwenye port kuu (`PORT`, chaguo-msingi `20128`) | `/api/monitoring/health` kama ukaguzi wa uhai                                                   |
| Utayari         | HTTP `GET /healthz`                                                       | Vikomo vifupi vya muda vinavyotafsiri shughuli nyingi za event-loop kama hali ya kutofanya kazi |
| Kina / blackbox | `/api/monitoring/health`                                                  | —                                                                                               |

`/healthz` huripoti mzunguko wa maisha wa mchakato (`ok` / `starting` / `stopping`). `/livez` ni
ya kuthibitisha tu kuwa mchakato uko hai (200 wakati wowote handler inapoweza kuendeshwa; haisubiri
utayari). Zote mbili bado huendeshwa kwenye event loop ileile ya Node inayoshughulikia maombi, hivyo
kazi za katalogi au ubanaji zinazotumia CPU sana zinaweza kuzichelewesha — kuwa na shughuli nyingi ≠ kutofanya kazi. Pendelea ukaguzi wa uhai wa
TCP ikiwa muda wa ukaguzi wa HTTP unaisha. Mwongozo kamili wa ukaguzi:
[Mwongozo wa ufuatiliaji — mapendekezo ya uchunguzi wa Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose na Caddy (HTTPS Auto-TLS)

OmniRoute inaweza kuwekwa wazi kwa usalama kwa kutumia utoaji wa SSL wa kiotomatiki wa Caddy. Hakikisha rekodi ya DNS A ya kikoa chako inaelekeza kwenye anwani ya IP ya seva yako.

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
      # Asili inayoonekana na kivinjari kwa ajili ya miito ya kurudi ya OAuth, viungo vya dashibodi, na URL za umma zinazozalishwa.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL ya ndani ya mawasiliano kati ya seva kwa ajili ya kazi zilizoratibiwa / maombi ya ndani.
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

Caddy huweka vichwa vya kawaida vya uelekezaji kwa kontena la upstream. OmniRoute hutumia
`NEXT_PUBLIC_BASE_URL` kama asili rasmi ya umma kwa miito ya kurudi ya OAuth na viungo vya umma
vinavyozalishwa; uandikaji ulioidhinishwa wa dashibodi hutumia maombi ya asili ileile pamoja na ulinzi wa CSRF
unaofungamanishwa na kipindi. Washa `OMNIROUTE_TRUST_PROXY` pekee kwa usanidi wa hali ya juu ambapo kwa makusudi
unataka OmniRoute itambue asili ya umma kutoka kwenye vichwa vya uelekezaji vinavyoaminika badala ya usanidi
ulioainishwa moja kwa moja.

## Cloudflare Quick Tunnel

Usaidizi wa dashibodi kwa usanidi wa Docker unajumuisha **Cloudflare Quick Tunnel** ya kubofya mara moja kwenye `Dashboard → Endpoints`. Uwashaji wa kwanza hupakua `cloudflared` inapohitajika tu, huanzisha tunnel ya muda kwenda kwenye endpoint yako ya sasa ya `/v1`, na huonyesha URL inayozalishwa ya `https://*.trycloudflare.com/v1` moja kwa moja chini ya URL yako ya kawaida ya umma.

Paneli za tunnel za endpoint (Cloudflare, Tailscale, ngrok) zinaweza kuonyeshwa au kufichwa kupitia `Settings → Appearance` bila kubadilisha hali ya tunnel inayotumika.

### Maelezo ya Tunnel

- URL za Quick Tunnel ni za muda na hubadilika baada ya kila uanzishaji upya.
- Quick Tunnels hazirejeshwi kiotomatiki baada ya OmniRoute au kontena kuanzishwa upya. Ziwashe tena kupitia dashibodi inapohitajika.
- Usakinishaji unaodhibitiwa kwa sasa unaauni Linux, macOS, na Windows kwenye `x64` / `arm64`.
- Managed Quick Tunnels hutumia usafirishaji wa HTTP/2 kwa chaguo-msingi ili kuepuka maonyo mengi ya bafa ya QUIC UDP katika mazingira ya kontena yenye rasilimali chache. Weka `CLOUDFLARED_PROTOCOL=quic` au `auto` ikiwa unataka usafirishaji tofauti.
- Image za Docker zinajumuisha mizizi ya CA ya mfumo na kuipitisha kwa `cloudflared` inayodhibitiwa, jambo linalozuia hitilafu za uaminifu wa TLS wakati tunnel inaanzishwa ndani ya kontena.
- Weka `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` ikiwa unataka OmniRoute itumie binary iliyopo badala ya kuipakua.

## Tagi za Image

| Image                    | Tagi     | Ukubwa | Maelezo                                                        |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer thabiti **iliyochapishwa** ya juu zaidi (si git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Bandika aina hii ya tagi kwa GitOps                            |

Manifest ya majukwaa mengi: `linux/amd64` + `linux/arm64` asilia (Apple Silicon, AWS Graviton, Raspberry Pi). Docker huchagua usanifu unaolingana kiotomatiki; pitisha `--platform linux/amd64` ikiwa unahitaji kulazimisha uigaji wa AMD64 kwenye host za ARM.

### Chaneli za Toleo

OmniRoute huchapisha chaneli tofauti za Docker kwa matoleo thabiti, majaribio ya tawi la toleo linalotumika, na build za usanidi.

| Chaneli                         | Chanzo                                         | Uwezo wa kubadilika                          | Matumizi yanayopendekezwa                                                                                                                   |
| ------------------------------- | ---------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Toleo lililotiwa saini/lenye toleo             | Haibadiliki                                  | Usanidi wa uzalishaji unaobandika toleo kamili                                                                                              |
| `:latest` / `:latest-web`       | SemVer thabiti **iliyochapishwa** ya juu zaidi | Kielekezi thabiti kinachobadilika            | Hufuata matoleo thabiti **baada** ya kazi ya uchapishaji wa SemVer — **haifuatilii** `main` wala commit ambazo hazijatolewa za `release/v*` |
| `:next` / `:next-web`           | Tawi chaguo-msingi la sasa la `release/v*`     | Kielekezi kinachobadilika cha kabla ya toleo | Kujaribu marekebisho yaliyowasili kwenye tawi la toleo linalotumika lakini bado hayajawa sehemu ya toleo thabiti                            |
| `:main` / `:main-web`           | Tawi la `main`                                 | Kielekezi kinachobadilika cha usanidi        | Kwa usanidi na majaribio ya ujumuishaji pekee                                                                                               |

#### Watoa huduma wa vipindi vya wavuti: image za `-web`

Kila chaneli iliyo hapo juu pia ina tagi ya `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), iliyoundwa kutoka hatua ya `runner-web` — image ileile pamoja na Playwright na kivinjari cha Chromium. Image ya kawaida hutolewa **bila** Chromium; `gemini-web`, `claude-web` na `claude-turnstile` zinaihitaji.

Hitilafu huahirishwa, haitokei wakati wa kuanza: watoa huduma hao huorodhesha modeli zao na kuonekana kama wameunganishwa kwenye dashibodi, na ni ombi la kwanza pekee linaloshindwa kwa ujumbe huu

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ikiwa unatumia watoa huduma hao, pakua tagi ya `-web` ya chaneli unayotumia tayari — hakuna kitu kingine kinachobadilika. Kwenye usakinishaji wa npm/CLI (bila image ya Docker), sehemu inayolingana inayokosekana ni binary ya kivinjari: endesha `npx playwright install chromium` kwenye host.

#### Kutumia chaneli ya kabla ya toleo

Chaneli ya `next` huundwa upya kila msukumo unapofanywa kwenye tawi la sasa chaguo-msingi la `release/v*`, na huchapishwa kwa AMD64 na ARM64. Matawi ya zamani ya matengenezo hayawezi kuiandika juu. Chaneli hii hutoa taswira inayoweza kuvutwa yenye marekebisho ambayo yameunganishwa kwenye tawi amilifu la toleo kabla ya lebo thabiti inayofuata kuundwa.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Kwa Docker Compose, badilisha lebo ya taswira inayotumiwa na wasifu uliochaguliwa, kisha uvute na uunde upya huduma:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Usalama na urejeshaji

`next` ni chaneli inayoelea ya kabla ya toleo. Inaweza kubadilika kwa kila msukumo kwenye tawi amilifu la toleo na **haitumiki rasmi kwa matumizi ya uzalishaji**. Funga muhtasari wa taswira unapokagua toleo mahususi:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kabla ya kujaribu, hifadhi nakala rudufu ya ujazo wa data wa OmniRoute au saraka ya data iliyounganishwa kwa bind mount. Ili kurejesha toleo la awali, rejesha toleo thabiti au muhtasari uliotumiwa hapo awali, kisha uunde upya kontena:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Muundo wa tawi la toleo hauwezi kamwe kuhamisha `latest`; ni toleo thabiti linalostahiki la kisemantiki pekee linaloweza kusogeza kiashiria thabiti. Taswira za `next` huhifadhi ukaguzi wa taswira ya toleo na lango la kuzuia udhaifu wa kiwango cha CRITICAL.

**`latest` si hakikisho la kuwa git ni ya kisasa.** Marekebisho yaliyounganishwa kwenye `main` au kwenye tawi amilifu la `release/v*` **hayapatikani** katika `:latest` hadi taswira thabiti ya SemVer ichapishwe na kazi ya uchapishaji isogeze `:latest` (ikiwa na muhtasari sawa na SemVer hiyo). Ikiwa `latest` inaonekana kutobadilika huku GitHub tayari ikionyesha marekebisho, vuta `:next` ili kujaribu tawi la toleo au usubiri lebo ya SemVer.

| Unachotaka                                                                      | Tumia                                    |
| ------------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / uzalishaji ambao haupaswi kubadilika bila kukusudiwa                   | Funga `:X.Y.Z` (au muhtasari wa taswira) |
| Kufuata matoleo thabiti yaliyochapishwa na kukubali kuundwa upya kwa kila toleo | `:latest`                                |
| Kujaribu commit za `release/v*` ambazo hazijatolewa                             | `:next` (si kwa uzalishaji)              |
| Kujaribu `main`                                                                 | `:main` (si kwa uzalishaji)              |

## Masasisho ya dashibodi katika Docker

Kontena la image iliyochapishwa haliwezi kujibadilisha lenyewe. OmniRoute inapogundua kuwa inaendeshwa ndani ya
kontena (hakuna checkout ya `.git`, wala usakinishaji wa npm), bango la sasisho la dashibodi ya mwanzo huonyesha
amri ya host inayopaswa kutekelezwa badala ya maelekezo ya npm/git, pamoja na kitufe cha kunakili:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Jina la huduma hutoka kwenye `AUTO_UPDATE_SERVICE` (chaguo-msingi ni `omniroute`, huduma iliyo katika
`docker-compose.selfhost.yml`). `pull` husogeza tu tag inayobadilika (`latest`, `next`); ukiwa na tag
iliyobandikwa ya `:X.Y.Z`, hariri tag hiyo kwanza.

### Masasisho ya mbofyo mmoja kwa kutumia faili ya kichochezi kwenye host

Ili **Sasisha Sasa** iendelee kufanya kazi bila kumount `/var/run/docker.sock` (jambo linalolipa kontena
ufikiaji wa root kwenye host — angalia onyo la wasifu wa `cli` hapo juu), weka `DOCKER_UPDATE_TRIGGER_FILE` kwenye
huduma ya OmniRoute na uendeshe kifuatiliaji kwenye host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Njia lazima iwe ndani ya `DATA_DIR` (thamani linganishi hutatuliwa dhidi yake); kitu kingine chochote
hukataliwa. Kisha **Sasisha Sasa** huandika `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` kwenye
faili hiyo, hujibu `202`, na dashibodi huuliza `/api/system/version` mara kwa mara hadi toleo jipya liwe linafanya kazi
na kujipakia upya. OmniRoute kamwe haiendeshi shell au amri ya Docker katika modi hii. Kama ilivyo kwa kila kitendo cha
kusasisha, ombi hukubaliwa tu kutoka kwa wateja wa loopback/LAN.

Saraka ya data iliyomountiwa kwa bind huipa host njia thabiti ya kufuatilia. Sampuli za unit za `systemd`
(rekebisha `/srv/omniroute` iwe saraka iliyo na faili yako ya compose na `data/`):

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

Huduma huondoa ombi kabla ya kufanya pull ili utekelezaji ulioshindwa usijirudie mfululizo. Bila
`DOCKER_UPDATE_TRIGGER_FILE`, dashibodi huendelea kutumia mtiririko wa amri wa kutekelezwa mwenyewe.

## Upatikanaji: SQLite chaguo-msingi ni nakala moja

Hisa Docker / Kubernetes OmniRoute ni** Mchakato wa Node moja + SQLite mwandishi mmoja** . Upatikanaji wa juu ni** haijaungwa mkono** juu ya topolojia hiyo.

| Kizuizi                                       | Matokeo                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mwandishi mmoja                               | Fanya** sivyo** endesha nakala nyingi dhidi ya faili moja SQLite. Hiyo inaharibu DB.                                                                                                                                                                                                                                                            |
| Tengeneza upya / anza upya / HEALTHCHECK kill | **Kukatika kabisa** ya ndani ya ndege SSE, vipindi vya dashibodi, na hali ya kumbukumbu. Kila mteja aliyeunganishwa huanguka. Maombi mapya wakati wa kidirisha cha mwisho-tupu hupata wakala wa kurudi nyuma**`502 Bad Gateway: Unknown error`** , si OmniRoute JSON — wateja hawawezi kutofautisha hili na kutofaulu kwa mtoa huduma (#11015). |
| Kitanzi cha tukio sawa na `/healthz`          | Katalogi yenye shughuli nyingi au tiki ya kukandamiza inaweza kuchelewesha uchunguzi; muda mfupi wa kuisha kisha inaanza upya** pekee** nakala.                                                                                                                                                                                                 |

**Matrix ya uchunguzi** (tazama pia [mapendekezo ya uchunguzi wa Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Chunguza        | Lengo                                                               | Usitumie                                                                    |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Uhai            | TCP kwenye `PORT` (chaguo-msingi `20128`), au laini HTTP `/healthz` | `/api/monitoring/health`                                                    |
| Utayari         | HTTP `GET /healthz`                                                 | Muda mgumu ambao hushughulikia shughuli ya kitanzi cha tukio kama iliyokufa |
| Kina / wanadamu | `/api/monitoring/health`                                            | Utendaji wa kubelet otomatiki                                               |

**Maboresho:** tarajia kila kikao kitashuka. Futa wateja ikiwa unaweza; hakuna sasisho linaloendelea kwenye chaguo-msingi SQLite. Tunga `restart: unless-stopped` pamoja na Docker `HEALTHCHECK` pia itachukua nafasi ya mchakato pekee wakati chombo hakina Afya - radius sawa ya mlipuko.

Maonyesho yaliyo tayari na chati ya Helm inaishi katika `deploy/kubernetes/` na `deploy/helm/omniroute/` - angalia [mwongozo wa uwekaji wa Kubernetes](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kijisehemu cha Kubernetes cha a** replica moja** (Uundaji upya unahitajika; usipandishe `replicas` dhidi ya faili moja SQLite ):

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

`preStop` kulala huruhusu kube kuacha Vituo vya huduma kabla ya SIGTERM hivyo** mpya** trafiki huacha kupiga mchakato wa kufa. `/v1/responses` SSE ndani ya ndege hutolewa hadi `SHUTDOWN_TIMEOUT_MS` (chaguo-msingi ya 30s) kupitia ukodishaji wa uandikishaji wa uzani mzito (#11015). Maombi mapya ambayo bado yanafikia mchakato huo pata `503` + `Retry-After: 5`. Tengeneza upya pengo la sehemu tupu hadi kibadilisho kiwe Tayari kinasalia kuwa tatizo kubwa - hiyo ni topolojia SQLite, si usanidi usiofaa wa uchunguzi.

Postgres ya nje / waandishi wengi HA ni** sivyo** njia ya hisa iliyoandikwa. Ikiwa unahitaji HA, weka nakala moja au endesha topolojia ambayo mradi umejaribu na kurekodi tofauti. Kazi ya Postgres/MySQL inaishi [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hadi meli hizo, njia pekee inayotumika ya kuzidisha** kubwa** uwezo wa `/v1/responses` ni michakato inayojitegemea ya N (sehemu inayofuata), sio `replicas > 1` kwenye juzuu moja.

## Upanuzi mlalo: michakato N huru

Mchakato mmoja wa Node ni **heap moja ya V8**. Maombi mawili yanayopishana ya wakala wa uandishi wa msimbo, yenye takribani MiB 3 / tokeni 750k, ya `POST /v1/responses` (RTK + Caveman) husababisha heap hiyo kusitishwa inapofikia takribani GiB 12 (`FATAL ERROR: Reached heap limit`) na yanaweza kusababisha OOM katika cgroup ya GiB 16. Tazama [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Kipimo hicho ni onyo la **bajeti ya kumbukumbu**, si kiwango cha juu kisichobadilika cha bidhaa cha maombi mawili marefu ya `/v1/responses` yanayoendeshwa kwa wakati mmoja. Ukubali wa maombi mazito ya gumzo unadhibitiwa na bajeti ya baiti za ingizo inayokokotolewa kiotomatiki (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), iliyowekwa kulingana na kikomo hicho hicho cha V8/cgroup — kuibadilisha kwenda juu (au kuweka kikomo cha zamani cha idadi ya maombi cha `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) kwenye mchakato ambao tayari umepangiwa ukubwa hurudisha tatizo la kusitishwa. Gumzo ndogo, `/healthz`, `/v1/models`, na MCP **hazijumuishwi** katika kikomo hicho.

### Mchakato mmoja: zaidi ya maombi mawili marefu ya `/v1/responses`

Mchakato **wenye afya** (heap ikiwa chini ya `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, chaguo-msingi `0.75`) **unaweza** kuendesha zaidi ya maombi mawili marefu ya `POST /v1/responses` kwa wakati mmoja ikiwa bajeti ya baiti zinazoendelea katika mchakato mzima (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) bado ina nafasi. Miili yenye ukubwa unaolingana na au unaozidi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (chaguo-msingi KiB 256) hupata ukodishaji uleule wa kazi nzito kama maombi yenye miundo mizito na hutumia njia ileile ya kuepuka ya [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Makumi ya wateja wa muda mrefu wa SSE wanaoendesha kwa wakati mmoja (waendeshaji mara nyingi huhitaji 40–50) ni suala la **bajeti ya kumbukumbu** — panga ukubwa wa heap + nafasi za msingi/nafasi ya ziada + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — si kikomo kisichobadilika cha bidhaa cha “kiwango cha juu 2”. Heap yenye shinikizo bado hupunguza mzigo kwa `503` inayoweza kujaribiwa tena ili #7849 lisijirudie.

Ili **kuzidisha heap** (old-space huru za V8) **leo**:

| Fanya                                                                                                                                                                                                                   | Usifanye                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Endesha **kontena/pod N**, kila moja ikiwa na `DATA_DIR` / volume yake **yenyewe**                                                                                                                                      | Weka `replicas > 1` dhidi ya faili moja ya SQLite                     |
| Panga ukubwa wa maombi mazito yanayoendelea + nafasi ya ziada yenye afya kulingana na heap / bajeti ya baiti zinazoendelea; 1–2 ni chaguo-msingi la kihafidhina la #7849, si kiwango cha juu kisichobadilika cha bidhaa | Upe mchakato mmoja RAM mara 8 na kikomo cha idadi kisicho na mpaka    |
| Hiari: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` kwa **vihesabu vya mgao vinavyoshirikiwa**                                                                                                                  | Ichukulie Redis kama SQLite inayoshirikiwa — si hivyo                 |
| Nakili siri za watoa huduma katika kila instance (au ukubali dashibodi zilizogawanywa)                                                                                                                                  | Tarajia dashibodi moja / kumbukumbu moja ya simu katika instance zote |
| Weka mbele kisawazisha mzigo chochote; ushikamano kwa API key au session unatosha                                                                                                                                       | Kuhitaji middleware maalumu ya muuzaji inayozingatia ukubwa           |

Maunzi: idadi ya maombi marefu ya `/v1/responses` yanayoendeshwa kwa wakati mmoja katika kila instance ni suala la **bajeti ya kumbukumbu** (heap + baiti zinazoendelea / #10110). `DATA_DIR` N huru bado huzidisha heap: RAM ya host lazima itoshe `N × cgroup`, si “pod moja ya GiB 16 yenye N=8.” Kamwe usitumie `replicas > 1` kwenye faili moja ya SQLite.

Mfano wa Compose (heap mbili, volume mbili — si `deploy.replicas: 2`):

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

Msongamano ndani ya mchakato (compression ikiwa nje ya isolate ya HTTP) ni [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Cluster moja ya kimantiki kwenye hali endelevu inayoshirikiwa ni [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Hitilafu za kikanda za Gemini ndani ya Docker

Google AI Studio / Gemini API inaweza kurudisha HTTP 400 yenye FAILED_PRECONDITION na
`User location is not supported for the API use.` Ombi lililofaulu kwenye host
halithibitishi kuwa container inatumia njia ileile ya kutoka. Mpangilio wa DNS,
muunganisho wa IPv4/IPv6, uelekezaji wa VPN na proxy zilizosanidiwa zinaweza kutofautiana. Angalia
[maeneo yanayotumika ya Google](https://ai.google.dev/gemini-api/docs/available-regions)
pamoja na njia halisi ya muunganisho; hitilafu hii pekee haimaanishi kuwa API key ni mbaya.

### Pendelea proxy mahususi kwa muunganisho

Tumia [usanidi wa proxy kwa kila muunganisho](../ops/PROXY_GUIDE.md#4-level-proxy-system) wa OmniRoute
kwa muunganisho wa Gemini ulioathiriwa, kisha urudie **Jaribu Muunganisho** na ombi dogo
kwa kutumia model ileile. Hii huweka mabadiliko ya uelekezaji ndani ya upeo wa muunganisho huo. Thibitisha
kuwa proxy inaweza kufikiwa kutoka kwenye container, na kwamba muunganisho unaichagua
kweli. Kubadilisha njia hakuhakikishi kuwa masharti ya kikanda ya huduma ya upstream yatatimizwa.

### Linganisha mtandao wa host na wa container

Dumisha key, model na ombi sawa unapolinganisha matokeo yaliyothibitishwa; usiwahi
kubandika taarifa za kuingia, manenosiri ya proxy au authorization headers kamili kwenye issue.
Kwanza kagua familia za anwani ambazo OS resolver inatoa, ukitumia command ileile
kwenye host na ndani ya container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Badilisha `omniroute` na service unayotumia (kwa mfano, `omniroute-web`). Commands hizi
huchapisha familia za anwani bila taarifa za kuingia au IP addresses. Thamani `6`
iliyorudishwa inaonyesha tu matokeo ya IPv6 DNS: **haithibitishi** kuwepo kwa njia inayoweza kutumika ya IPv6 au ufikiaji wa API.
Pale ambapo `curl` imesakinishwa, linganisha `curl -4 -I https://generativelanguage.googleapis.com`
na `curl -6 -I https://generativelanguage.googleapis.com` katika mazingira yote mawili.
Jibu la HTTP linathibitisha muunganisho kwa ukaguzi huo, hata kama ni hitilafu
isiyothibitishwa; ni ombi la model lililothibitishwa pekee linalojaribu ustahiki wa Gemini.

### Njia mbadala ya kiwango cha host: IPv6 inayofanya kazi na sera ya resolver

Mtoa taarifa wa [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) alirejesha
ufikiaji katika mazingira yake kwa kuwezesha IPv6 ya container na kubadilisha uteuzi wa anwani
wa glibc. Ichukulie hii kama njia mbadala mahususi kwa mazingira. Thibitisha kuwa IPv6 ya host
inafanya kazi, pamoja na egress/uelekezaji wa container na kanuni za firewall kabla ya kurekebisha mapendeleo ya resolver.
Anwani binafsi ya ULA pekee haithibitishi muunganisho wa umma wa IPv6.

Kwa services ambazo tayari zimeunganishwa kwenye network chaguomsingi ya Compose, kipande hiki huwezesha
IPv6 kwenye network hiyo; hifadhi sehemu nyingine za service, ports, volumes na configuration yako:

```yaml
networks:
  default:
    enable_ipv6: true
```

Kwa network yenye jina, iwezeshe kwenye network ambayo service inajiunga nayo. Docker inaweza
kutenga subnet ya ULA; chagua subnet bayana, isiyopishana na nyingine pale tu ambapo network yako
inaihitaji. Angalia [utumiaji wa mtandao wa IPv6 kwenye Docker](https://docs.docker.com/engine/daemon/ipv6/)
na [chaguo za network za Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Kwenye **image inayotegemea glibc**, `/etc/gai.conf` inaweza kubadilisha uteuzi wa anwani. Dockerfile ya sasa
ya repository inatumia Debian; images maalum zinazotegemea musl hazitumii utaratibu huu.
Marekebisho yaliyoripotiwa hubadilisha label ya ULA kutoka `label fc00::/7 6` hadi
`label fc00::/7 1`. Anza na jedwali kamili la sera la image na uhifadhi entries zake nyingine:
kuongeza entry ya `label` au `precedence` hubadilisha jedwali hilo chaguomsingi, kwa hivyo file
iliyo na mstari uliobadilishwa pekee haitoshi.
[Rejea ya usanidi wa glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
inafafanua semantiki hizo. Fanya bind-mount ya file iliyokaguliwa katika hali ya kusoma pekee kwenye `/etc/gai.conf`
na uunde upya service ili kuitumia.

Hii hubadilisha uteuzi wa anwani wa OS kwa **trafiki yote inayotoka kwenye container hiyo**.
Hailazimishi kila application kuchagua IPv6: mpangilio wa DNS wa Node na uteuzi wa muunganisho
pia ni muhimu. Hasa, `--dns-result-order=ipv4first` hupendelea IPv4 na
si suluhisho kwa hitilafu ya IPv4 pekee. Angalia [mpangilio wa DNS wa Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Jaribu tena Gemini na providers wako wengine baada ya mabadiliko yoyote ya kiwango cha host. Ili kurudisha hali ya awali,
ondoa mount maalum ya `gai.conf`, rejesha configuration ya awali ya network na
uunde upya service/network iliyoathiriwa wakati wa kipindi cha matengenezo. Kuunda upya network
kunaweza kukatiza containers nyingine zilizounganishwa nayo; usifute persistent data volume.

## Vidokezo Muhimu

- **Hali ya SQLite WAL:** `docker stop` inapaswa kuruhusiwa ikamilike ili OmniRoute iweze kuhifadhi mabadiliko ya hivi karibuni kwenye `storage.sqlite`. Faili za Compose zilizojumuishwa tayari zimeweka kipindi cha kusubiri kusimamisha cha sekunde 40. Ukiendesha image moja kwa moja, tumia `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Weka kuwa `true` ikiwa nakala rudufu za kawaida/kabla ya kuandika zinasimamiwa nje. Uhamishaji wa hifadhidata iliyopo bado unahitaji snapshot yake ya usalama inayodumu na kinga dhidi ya uhamishaji kwa wingi.
- **Uhifadhi wa Data:** Kila wakati ambatisha volume kwenye `/app/data` ili kuhifadhi hifadhidata, funguo na usanidi wako wakati kontena zinapoanzishwa upya.
- **Usanidi wa Port:** Badilisha thamani chaguo-msingi ya kigezo cha mazingira `PORT` ili kubadilisha port chaguo-msingi ya `20128`.

## Tazama Pia

- [Mwongozo wa Usambazaji kwenye VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Usanidi wa VM + nginx + Cloudflare
- [Mwongozo wa Usambazaji kwenye Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Sambaza kwenye Fly.io
- [Usanidi wa Mazingira](../reference/ENVIRONMENT.md) — Marejeleo kamili ya `.env`
