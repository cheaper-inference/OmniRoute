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

## Kukimbia Haraka

> **Mwenyeji mwenyewe katika amri moja?** Tazama [Mwongozo wa Mwenyeji Mwenyewe](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (picha iliyochapishwa + Redis, loopback-pekee, hakuna chaguo la wasifu). Quick Run hapa chini ni njia ya kontena moja kwa watumiaji ambao tayari wanaendesha Redis mahali pengine.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Na Faili ya Mazingira

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

Hifadhi husafirisha Dockerfile ya hatua nyingi (`Dockerfile`). Hatua nne zimewekwa wazi; chagua `target` sahihi kwa kesi yako ya utumiaji.

| Jukwaa        | Picha ya msingi       | Kusudi                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Usakinishaji hupungua (`npm ci --legacy-peer-deps`) na huendesha `npm run build` (Turbopack kwa chaguo-msingi — angalia nyenzo za Muda wa Muundo hapa chini)                                                                                                                                       |
| `runner-base` | `node:26-trixie-slim` | Muda wa utekelezaji wa uzalishaji na pato la pekee Next.js.** Hakuna CLIs ya mtoa huduma iliyounganishwa.**                                                                                                                                                                                        |
| `runner-cli`  | `runner-base`         | Inaongeza `git`, `docker.io`, `docker-compose` na CLIs kimataifa : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Chagua hii kwa mtiririko wa kazi wa mawakala.**                                                                                                            |
| `runner-web`  | `runner-base`         | Huongeza Playwright + kivinjari cha Chromium (`--with-deps`) kwa watoa huduma wa kikao cha wavuti: `gemini-web`, `claude-web`, `claude-turnstile`.** Chagua hii unapotumia watoa huduma hao** — picha wazi inashindwa kwa wakati wa ombi bila hiyo (tazama noti `-web` chini ya Njia za Kutolewa). |

Jenga lengo mahususi wewe mwenyewe:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Rasilimali za wakati wa kujenga

Tatu kujenga args kudhibiti kile hatua `builder` gharama. Ni wakati wa kujenga tu — `OMNIROUTE_MEMORY_MB` (chini) ni kisu tofauti cha wakati wa kukimbia.

| Kujenga arg                 | Chaguomsingi | Athari                                                                                                |
| --------------------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` huunda na pakiti ya wavuti: kumbukumbu ya kilele cha chini, polepole. `1` imeingia Turbopack.     |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | V8 lundo dari (`--max-old-space-size`) kwa `next build` iliyozaa.                                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Inalisha `CIRCLE_NODE_TOTAL`; Inayofuata inaleta `workers = N - 1` kwa mkusanyiko wa data ya ukurasa. |

`OMNIROUTE_BUILD_WORKERS` ni ile ya kuinua juu ya mjenzi mkubwa na mtu wa kushuku wakati jengo gumu linapokufa** baada ya** `✓ Compiled successfully`. Kila mfanyakazi wa data ya ukurasa ni mchakato wake mwenyewe, na vile vile mzazi `next build` yenyewe; uenezi wa VPS hai (toleo #7518) ulipima kilele cha kila mchakato RSS kwa ~ 4.5 GB bila ya bendera ya lundo la `NODE_OPTIONS` (Turbopack hukusanywa katika kumbukumbu native/Rust nje ya lundo la V8). Chaguomsingi ya `2` (→ 1 mfanyakazi, 2 jumla ya michakato) ni ukubwa kwa ajili ya 16 GB / 4 vCPU wakimbiaji GitHub-mwenyeji bomba uchapishaji matumizi. Katika `8` (wafanyakazi → 7) mkimbiaji huyo aliishiwa na kumbukumbu na vifaa vya ujenzi vilishindwa hatua na `ResourceExhausted: ... cannot allocate memory`; `3` (wafanyakazi → 2) bado hazikutoshea mara tu RSS ya kila mchakato ilipopimwa moja kwa moja badala ya kukisiwa. `tests/unit/docker-build-memory-budget.test.ts` hufanya hesabu dhidi ya takwimu iliyopimwa na inashindikana ikiwa kifundo kimoja kitamshinda mkimbiaji.

Turbopack inajumuisha katika kumbukumbu ya asili ya Rust inayoishi** nje** lundo la V8, kwa hivyo `OMNIROUTE_BUILD_MEMORY_MB` haifungi. Kwenye mwenyeji aliye na dari ya kumbukumbu muundo basi huwa SIGKILLed na muuaji wa OOM bila maandishi ya makosa hata kidogo — husimama tu mid-`Creating an optimized production build`, ambayo inasomeka kama hang badala ya kumbukumbu isiyo na kumbukumbu. Ndio maana `Dockerfile` hubadilisha chaguo-msingi kwa webpack (`OMNIROUTE_USE_TURBOPACK=0`), tofauti na `npm run dev` / `npm run build`, ambapo Turbopack ndio chaguo-msingi la msimbo: `docker build .` tupu bila kujenga args (kile Railway na majeshi mengine ya mbofyo mmoja huendesha) haipaswi kufa kimya kwenye kijenzi kilicho na kumbukumbu. Picha zilizochapishwa tayari zinapita `OMNIROUTE_USE_TURBOPACK=0` kwa uwazi katika `docker-publish.yml`. Kwenye mjenzi aliye na RAM nyingi, chagua Turbopack kwa ujenzi wa haraka:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` imewezeshwa, kwa hivyo `next build` inaendesha mzazi** na** mchakato wa mfanyakazi na kila heshima `OMNIROUTE_BUILD_MEMORY_MB` tofauti. Saizi ya dari ya kontena juu ya takriban mara mbili ya thamani hiyo, sio mara moja.

Imepimwa kwenye mti huu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler              | Dari ya chombo | Matokeo                                |
| -------------------- | -------------- | -------------------------------------- |
| Turbopack            | 8 GiB / 16 GiB | OOM aliuawa kwa wote wawili, kimya     |
| kifurushi cha wavuti | 8 GiB          | jenga mfanyakazi SIGKILLed             |
| kifurushi cha wavuti | 12 GiB         | ilifaulu, ilifikia kilele cha GiB 11.1 |

### Chaguo-msingi za wakati wa kukimbia

Chaguomsingi zinazosafirishwa na `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Tabia ya kumbukumbu katika Docker:

- Picha huweka `OMNIROUTE_MEMORY_MB=1024` na hupata `NODE_OPTIONS=--max-old-space-size=1024` kutoka kwayo.
- Mchakato halisi wa seva huanzishwa na kizindua kinachojitegemea, ambacho husoma `OMNIROUTE_MEMORY_MB` na kuambatanisha `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Nodi hutumia thamani ya `--max-old-space-size` iliyorudiwa mara ya mwisho, kwa hivyo kuweka `OMNIROUTE_MEMORY_MB` hudhibiti kikomo cha lundo Docker.
- Kwa sababu taswira huiweka kila wakati, urejeshaji nyuma wa kizindua uliosawazishwa na RAM hautumiki kamwe chini ya Docker. Inua kwa uwazi kwa mzigo wa kazi (jedwali hapa chini). `2048` bado ni ndogo sana kwa wakala wa usimbaji `/v1/responses`.

### Runtime RAM kwa mawakala wa usimbaji

Chaguo-msingi la Docker GiB ni sakafu dashboard/light-chat, si saizi ya uzalishaji. Miili mirefu `POST /v1/responses` (mamia ya ujumbe, makumi ya zana) huhifadhi grafu nyingi za kumbukumbu wakati wa mbano. Maombi mawili yanayopishana ya ~ 3 MiB / ~ 750k-tokeni yamebatilisha V8 kwenye** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) na pia kugonga kikundi cha GiB 16 OOM. Angalia [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Ukubwa** cgroup `--memory` juu ya lundo** — bafa asili, SQLite, na vipatanishi vya mbano hukaa nje ya V8.

| Mzigo wa kazi                                | `OMNIROUTE_MEMORY_MB`           | Chombo / kikundi   | Vidokezo                                                                                         |
| -------------------------------------------- | ------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| Dashibodi, gumzo moja nyepesi                | `1024` (chaguo-msingi ya picha) | ≥2 GiB             |                                                                                                  |
| Wakala mmoja wa usimbaji (Claude/Codex/Grok) | `8192`                          | ≥10 GiB            | `/v1/responses` ya kawaida ya kikao kimoja                                                       |
| `/v1/responses` mbili ndefu zinazofanana     | `10240`–`12288`                 | ≥12–16 GiB         | Kipimo cha V8 kiliacha kwenye ~ 12 GiB                                                           |
| + tatu muktadha mrefu unaofanana             | usifanye kwa mchakato mmoja     | serial / zaidi RAM | Kiingilio chaguomsingi cha uzito wa juu ni 1 ndani ya ndege; kuikuza bila RAM inaleta tena mimba |

`omniroute serve` kwenye metali tupu husawazisha ~ 35% ya RAM (zilizobanwa `[512, 4096]`) wakati `OMNIROUTE_MEMORY_MB` iko** haijawekwa** . Docker huweka kila wakati `1024`, ili urekebishaji uwahi kamwe katika picha rasmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## Rejesha Wakala kwenye Njia ndogo (Traefik / nginx)

Next.js `basePath` imekusanywa katika kifurushi cha pekee. OmniRoute hurekodi thamani iliyooka katika faili ya sentinel kwenye mzizi wa programu (iliyoandikwa wakati wa `npm run build`; iliyosomwa na `scripts/docker/ensure-docker-base-path.mjs`) na kuilinganisha na `OMNIROUTE_BASE_PATH` wakati chombo kinapoanza. Zinapotofautiana na taswira iliundwa kwa mzizi wa kikoa, kiingilio huandika upya maonyesho ya pekee, maandishi ya `basePath`/`assetPrefix` yaliyopachikwa (Inayofuata 16 inatoa SSR asset URLs kutoka `assetPrefix` peke yake — kiweka alama huakisi njia ndogo ndani yake), `/_next/static` iliyookwa (dhahiri ya asset, mediarender URLs, msajili wa makosa, mpokeaji wa makosa ya kuingizwa. kurasa) na mteja `process.env` shim kabla ya `node dev/run-standalone.mjs` kuanza.

### Tunga muundo (inapendekezwa)

Weka anuwai zote mbili `.env`, kisha ujenge tena ili picha na wakati wa kukimbia kukubaliana:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` inasonga mbele `OMNIROUTE_BASE_PATH` kama Docker build-arg na kama kibadilisho cha wakati wa utekelezaji.

### Picha ya mzizi iliyojengwa awali + njia ndogo ya wakati wa utekelezaji

Picha `cheaperinference/omniroute:*` zilizochapishwa zimeundwa kwa mzizi wa kikoa. Bado unaweza kuweka `OMNIROUTE_BASE_PATH` wakati wa kukimbia; chombo huweka viraka mara moja wakati wa kuanza. Oanisha na asili ya umma inayolingana:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Sanidi seva mbadala ya nyuma ili kusambaza faili** kamili** njia ya nje (usivue kiambishi awali). Traefik inapaswa kuelekeza `PathPrefix(`/omniroute `)` hadi kwenye kontena bila `StripPrefix`, kwa hivyo Next.js inapokea `/omniroute/...` na kutoa mali kutoka `/omniroute/_next/...`.

Ukaguzi wa afya Docker huchunguza sehemu ya mwisho ya mzunguko wa maisha `/healthz` uzani mwepesi iliyowekwa na `OMNIROUTE_BASE_PATH` amilifu. `/api/monitoring/health` bado inapatikana kwa uchunguzi wa human/dashboard ; kuelekeza kontena HEALTHCHECK nyuma yake (kwa mfano kwa utekelezaji wa kina wa afya), weka `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Njia hiyo ni a** kina** angalia ( muhtasari wa ufuatiliaji wa DB + ) — inafaa kwa `HEALTHCHECK` isiyo ya kawaida ya Docker ikiwa utachagua kuingia tena, lakini** sivyo** kwa vipindi vya Kubernetes `livenessProbe`.

Kwa waimbaji (Kubernetes, Nomad, nk.):

| Chunguza              | Pendelea                                                                     | Epuka                                                                       |
| --------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Uhai                  | HTTP `GET /livez`, au TCP kwenye bandari kuu (`PORT`, chaguo-msingi `20128`) | `/api/monitoring/health` kama uchangamfu                                    |
| Utayari               | HTTP `GET /healthz`                                                          | Muda mgumu ambao hushughulikia shughuli ya kitanzi cha tukio kama iliyokufa |
| Kina / sanduku nyeusi | `/api/monitoring/health`                                                     | —                                                                           |

`/healthz` inaripoti mchakato wa maisha (`ok` / `starting` / `stopping`). `/livez` ni mchakato-hai tu (200 wakati wowote kidhibiti kinaweza kukimbia; haingojei utayari). Zote mbili bado zinaendesha kitanzi sawa cha tukio la Node kama kushughulikia ombi, kwa hivyo katalogi iliyofungamana na CPU au kazi ya kubana inaweza kuwachelewesha — busy ≠ kufa. Pendelea uhai TCP ikiwa HTTP itachunguza muda umekwisha. Mwongozo kamili wa uchunguzi: [Mwongozo wa ufuatiliaji — Kubernetes uchunguzi wa mapendekezo](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Tunga na Caddy (HTTPS Auto-TLS)

OmniRoute inaweza kufichuliwa kwa usalama kwa kutumia utoaji otomatiki wa SSL wa Caddy. Hakikisha kikoa chako kinaweka rekodi DNS A kwa IP ya seva yako.

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

Caddy huweka vichwa vya kawaida vya usambazaji kwa chombo cha juu cha mkondo. OmniRoute hutumia `NEXT_PUBLIC_BASE_URL` kama asili ya kisheria ya umma kwa simu za nyuma OAuth na kuunda viungo vya umma; dashibodi iliyothibitishwa huandika tumia maombi ya asili moja pamoja na ulinzi CSRF wa kikao. Washa `OMNIROUTE_TRUST_PROXY` kwa matumizi ya hali ya juu pekee ambapo unataka OmniRoute kimakusudi kupata asili ya umma kutoka kwa vichwa vinavyoaminika vilivyotumwa badala ya usanidi wazi.

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

## Lebo za Picha

| Picha                        | Lebo     | Ukubwa  | Maelezo                                                      |
| ---------------------------- | -------- | ------- | ------------------------------------------------------------ |
| `cheaperinference/omniroute` | `latest` | ~ 250MB | Juu zaidi** iliyochapishwa** SemVer thabiti (sio git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250MB | Bandika darasa hili la lebo kwa GitOps                       |

Picha zile zile huchapishwa kwenye hazina tatu, zenye michanganyiko sawa ya kila usanifu: `cheaperinference/omniroute` (Docker Hub, shirika la Maelekezo ya bei nafuu, kuanzia 3.8.53 kuendelea), `ghcr.io/cheaper-inference/omniroute` na legacy `diegosouzapw/omniroute`, ambayo huhifadhi historia yake ya kuvuta na bado inapokea kila toleo. Utekelezaji wa `diegosouzapw/omniroute` uliopo unaendelea kusasishwa; kubadilisha jina la picha ni hiari. Kituo cha awali `:next` / `:next-web` hapa chini kimechapishwa kwa `diegosouzapw/omniroute` na GHCR pekee.

Faili ya maelezo ya majukwaa mengi: `linux/amd64` + `linux/arm64` asili (Apple Silicon, AWS Graviton, Raspberry Pi). Docker huchagua usanifu unaofanana moja kwa moja; pitisha `--platform linux/amd64` ikiwa unahitaji kulazimisha uigaji wa AMD64 kwenye majeshi ARM.

### Chaneli za Toa

OmniRoute huchapisha chaneli tofauti Docker kwa matoleo dhabiti, majaribio amilifu ya tawi la toleo, na miundo ya usanidi.

| Kituo                           | Chanzo                                    | Kubadilika                                           | Matumizi yaliyopendekezwa                                                                                                                       |
| ------------------------------- | ----------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned kutolewa                 | Isiyobadilika                                        | Usambazaji wa uzalishaji ambao hubandika toleo kamili                                                                                           |
| `:latest` / `:latest-web`       | Juu zaidi** iliyochapishwa** SemVer imara | pointer inayoweza kubadilika                         | Inafuata matoleo thabiti** baada ya** a SemVer kuchapisha kazi — hufanya** sivyo** fuatilia `main` au ahadi za `release/v*` ambazo hazijatolewa |
| `:next` / `:next-web`           | Tawi la `release/v*` la sasa              | Kielekezi kinachoweza kubadilishwa kabla ya kutolewa | Marekebisho ya majaribio ambayo yametua kwenye tawi la toleo linalotumika lakini bado hayajatolewa                                              |
| `:main` / `:main-web`           | tawi la `main`                            | Kiashiria cha maendeleo kinachoweza kubadilika       | Upimaji wa maendeleo na ujumuishaji pekee                                                                                                       |

#### Watoa huduma za kikao cha wavuti: picha `-web`

Kila kituo hapo juu huongezeka maradufu kama `-web` tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), iliyojengwa kutoka hatua ya `runner-web` — picha sawa pamoja na Playwright na kivinjari cha Chromium. Picha ya wazi inasafirishwa** bila** Chromium; `gemini-web`, `claude-web` na `claude-turnstile` wanaihitaji.

Kushindwa kumeahirishwa, sio wakati wa kuanza: watoa huduma hao huorodhesha miundo yao na kuonyesha kama imeunganishwa kwenye dashibodi, na ni ombi la kwanza pekee ambalo hushindwa na

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ukitumia watoa huduma hao, vuta tagi `-web` ya kituo ambacho tayari uko kwenye — hakuna kitu kingine kinachobadilika. Kwenye usakinishaji wa npm/CLI (hakuna picha Docker ), kipande sawa kinachokosekana ni binary ya kivinjari: endesha `npx playwright install chromium` kwenye seva pangishi.

#### Kwa kutumia chaneli iliyotolewa mapema

Chaneli `next` inajengwa upya kwa kila kisukuma hadi tawi chaguo-msingi `release/v*` na huchapishwa kwa AMD64 na ARM64. Matawi ya matengenezo ya zamani hayawezi kuifuta. Kituo hutoa picha inayoweza kuvuta kwa marekebisho ambayo yameunganishwa kwenye tawi la toleo linalotumika kabla ya lebo iliyofuata kukatwa.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Kwa Docker Tunga, futa tagi ya picha inayotumiwa na wasifu uliochaguliwa, kisha uvute na uunda upya huduma:

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

`next` ni chaneli inayoelea ya kutolewa kabla. Inaweza kubadilika kwa msukumo wowote hadi kwa tawi linalotumika la kutolewa na iko** haitumiki kwa matumizi ya uzalishaji** . Bandika muhtasari wa picha wakati wa kutathmini muundo maalum:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Kabla ya kujaribu, weka nakala ya kiasi cha data OmniRoute au saraka ya data iliyowekwa kwenye mtandao. Ili kurudisha nyuma, rejesha toleo thabiti lililotumika hapo awali au uchanganye na uunda upya chombo:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Muundo wa tawi la kutolewa hauwezi kamwe kusonga `latest`; ni toleo la kisemantiki linalostahiki pekee linaloweza kukuza kielekezi thabiti. Picha za `next` huhifadhi ukaguzi wa picha ya toleo na kuzuia lango la uwezekano wa CRITICAL.

**`latest` sio dhamana ya sarafu kwa git.** Marekebisho yaliyounganishwa kwenye `main` au kwenye tawi linalotumika `release/v*` ni** sivyo** katika `:latest` hadi taswira thabiti SemVer ichapishwe na kazi ya kuchapisha inakuza `:latest` (muhtasari sawa na ule SemVer). Ikiwa `latest` inaonekana imeganda ilhali GitHub tayari inaonyesha urekebishaji, vuta `:next` ili kujaribu tawi la kutolewa au subiri lebo ya SemVer.

| Unataka                                                           | Tumia                                |
| ----------------------------------------------------------------- | ------------------------------------ |
| GitOps / uzalishaji ambao haupaswi kuteleza                       | Pin `:X.Y.Z` (au muhtasari wa picha) |
| Fuata imara zilizochapishwa na ukubali kuunda upya kwa kila toleo | `:latest`                            |
| Jaribu ahadi `release/v*` ambazo hazijatolewa                     | `:next` (sio uzalishaji)             |
| Mtihani `main`                                                    | `:main` (sio uzalishaji)             |

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

## Scale-out: N michakato huru

### umiliki wa mzunguko wa Codex

Nakala za akaunti moja Codex lazima zisitumie tokeni yake ya kuonyesha upya ya matumizi moja pekee. Katika matukio ambayo hutumia tu vitambulisho vilivyosawazishwa, weka `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (pak `cx`). Iache ikiwa haijawekwa kwa mmiliki mmoja wa mzunguko. Kila mchakato bado unahitaji `DATA_DIR` yake; chaguo hili halishiriki SQLite wala kutoa ulandanishi wa tokeni au kufuli iliyosambazwa.

Tukio la tuli husoma tena muunganisho wakati uonyeshaji upya unahitajika na huchukua tokeni tofauti ya ufikiaji ambayo haijaisha muda wake. Vinginevyo kuonyesha upya kunazimwa bila kuisha muda au kulemaza muunganisho au kuhesabu kutofaulu kwa kivunja onyesha. Hitilafu halisi za uthibitishaji wa mkondo wa juu bado zinatumia uhasibu wa kawaida wa kutofaulu, upunguzaji wa hali ya juu na hitilafu ya kawaida ya mteja; uzima wa akaunti unasalia kuwa wa kudumu. Sawazisha tokeni zilizozungushwa za mmiliki kabla ya tokeni za ufikiaji kuisha (kiongozi chaguo-msingi cha kuonyesha upya upya ni dakika tano), au leta tena faili ya Codex auth. Uagizaji wa kupita kiasi huhifadhi tokeni zilizotolewa bila kuzithibitisha kwenye sehemu ya mwisho ya tokeni. Uboreshaji wa dashboard/API kwa mwongozo unarudisha `409 refresh_disabled`; logi mpya OAuth hazijabadilishwa. Tazama [kumbukumbu ya mazingira](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

Mchakato wa Node moja ni** lundo moja la V8** . ~ 3 MiB / ~ 750k-tokeni ya wakala wa kuweka msimbo `POST /v1/responses` (RTK + Caveman) zinazopishana huondoa rundo hilo kwa ~ 12 Gi (`FATAL ERROR: Reached heap limit`) na inaweza OOM a 16 Gi cgroup. Tazama [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Kipimo hicho ni a** kumbukumbu - bajeti** onyo, si bidhaa ngumu-max ya `/v1/responses` mbili zinazofanana. Uandikishaji wa gumzo la uzani mzito huchangiwa na bajeti ya baiti inayotokana na otomatiki (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) yenye ukubwa kutoka V8/cgroup hiyo hiyo dari — ikiipandisha juu (au kuweka kikomo cha hesabu ya ombi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ) kwenye mchakato wa ukubwa ambao tayari huleta uondoaji mimba. Soga ndogo, `/healthz`, `/v1/models`, na MCP ni** sivyo** katika kofia hiyo.

### Mchakato mmoja: zaidi ya `/v1/responses` mbili ndefu

A **healthy** process (heap below `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default `0.75`) **may** run more than two concurrent long `POST /v1/responses` when the process-wide inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) still has room. Bodies at or above `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default 256 KiB) take the same heavyweight lease as structure-heavy requests and use the same [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tens of concurrent long SSE clients (operators often need 40–50) is a **memory-budget** question — size heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — not a hard “max 2” product limit. A pressured heap still sheds with retryable `503` so #7849 does not return.

Kwa** kuzidisha chungu** (nafasi huru za V8)** leo** :

| Fanya                                                                                                                                                                | Usifanye                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Kimbia** N containers/pods** , kila moja na yake** kumiliki** `DATA_DIR` / kiasi                                                                                     | Weka `replicas > 1` dhidi ya faili moja SQLite                      |
| Ukubwa mzito ndani ya ndege + afya-headroom kutoka lundo / inflight-byte bajeti; 1–2 ndiyo chaguomsingi ya kihafidhina ya #7849, si kiwango cha juu cha bidhaa ngumu | Toa mchakato mmoja 8 × RAM na kikomo cha kuhesabu kisicho na kikomo |
| Hiari: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` kwa** vihesabio vya mgawo ulioshirikiwa**                                                                | Ichukulie Redis kama — SQLite iliyoshirikiwa sivyo                  |
| Rudufu siri za mtoa huduma katika kila mfano (au ukubali dashibodi zilizogawanywa)                                                                                   | Tarajia dashibodi moja / logi moja ya simu katika matukio yote      |
| Mbele na mizani yoyote ya mzigo; kunata kwa ufunguo wa API au kikao kinatosha                                                                                        | Inahitaji kifaa cha kati kinachofahamu ukubwa mahususi kwa muuzaji  |

Uhusiano wa kipindi hadi akaunti pia unaweza kushirikiwa kupitia Redis: weka `OMNIROUTE_SESSION_AFFINITY_STORE=redis` na `REDIS_URL` kwa kila mchakato, kwa `REDIS_KEY_PREFIX` sawa na mpangilio mzuri `sessionAffinityTtlMs`. Pini hutatua utambulisho wa haraka wa akaunti ya utumiaji kwa muunganisho wa ndani wa kila mchakato unaostahiki, kwa hivyo akaunti za OAuth zilizo na metadata ya utambulisho inayolingana hazihitaji kuwa na muunganisho unaolingana IDs. Utambulisho wa akaunti unaojulikana huchukua nafasi ya kwanza juu ya IDs kinzani ya ndani katika azimio la pini na kufukuzwa kwa ulinzi; rekodi bila utambulisho (au wapigaji wa kufukuza bila utambulisho) huhifadhi walinzi ID. Akaunti zisizo na utambulisho thabiti wa matumizi bado zinahitaji kulinganisha IDs. Redis hitilafu au simu zinazozidi 100 ms hurudi kwenye SQLite ya ndani . Kila duka la ushirika la Redis huhifadhi utendakazi bora saa 8, hupita Redis mara moja likijaa, na hutoa nafasi wakati tu kazi ya msingi imetatuliwa, si kwa tarehe ya mwisho ya mpigaji simu. Wakati wa kukatika kwa Redis hakuna ukweli ulioshirikiwa: kila mfano unarudi kwenye uhusiano wake wa ndani, vipindi vinaweza kubanwa tena mara moja kwa kila tukio, na matukio yanaweza kutofautiana. Kunata huungana tena kupitia Redis inapopona. Mipaka ya muda wa kuisha inangoja, sio EVAL iliyotumwa, ambayo inaweza kutua baada ya kurudi nyuma. Maandishi ya uelekezaji yanalinganisha thamani halisi iliyozingatiwa na uamuzi wa uelekezaji, sio usomaji mpya wa wakati wa mabadiliko; kosa lililozingatiwa au uchunguzi wa kurudi nyuma SQLite unalinganishwa na ufunguo Redis ambao haupo. Pini zilizopitwa na wakati hubadilishwa katika CAS moja, kwa hivyo amri iliyochelewa haiwezi kuchukua nafasi au kufuta pini mpya zaidi, tofauti. Redis inasoma kurudisha thamani na seva iliyobaki TTL; PTTL chanya (au kutoisha muda wake) huamua uhai, si muhuri wa saa wa JSON wa mwandishi au saa ya msomaji. Ramani ya vijipicha vya karibu ambayo imesalia TTL hadi tarehe ya mwisho ya ndani; vitufe JSON vilivyopo vinasalia kusomeka na baiti zao mbichi huhifadhiwa kwa CAS. Redis ndio chanzo pekee cha ukweli huku ikijibu. Kero zilizoshirikiwa, kuguswa na kufuta zilizothibitishwa, ondoa ingizo la ndani, usiwahi kusakinisha au kuonyeshwa upya. SQLite kwenye njia Redis inashikilia tu maamuzi mbadala ya mfano huu kutoka kwa hitilafu Redis, kuisha kwa muda au kueneza kwa uandikishaji, iliyo na mipaka ya TTL kama hapo awali. Pini ya ndani inayokosekana baada ya kukatika kwa baadaye hugharimu chaguo moja mpya (kukosa akiba moja ya papo hapo), sio akaunti mbaya au iliyofukuzwa. Kero zilizokataliwa hurejesha mshindi aliyeshirikiwa na TTL yake iliyosalia kiatomi: uteuzi wa kawaida hukagua tena tarehe ya mwisho iliyoonyeshwa kwenye ramani na hutumia mshindi ambaye bado yuko hai, matumizi yanayogusa na kuingia kwa akaunti hiyo bila maandishi mengine yaliyoshirikiwa. Ikiwa haipatikani, uteuzi huweka mgombeaji wa ndani, huacha pini iliyoshirikiwa bila kubadilishwa na kutoa ujumbe mmoja wa utatuzi. CAS iliyokataliwa haiandiki SQLite; hitilafu za Redis, muda wa kuisha au ujazo wa uandikishaji hutumika badala yake utendakazi uliopo wa ndani. Iwapo jibu la mabadiliko lililotumwa litafika baada ya muda kuisha (kukubaliwa, kukataliwa au hitilafu), ulinganishaji-na-kufuta wa thamani uliosawazishwa sawasawa huondoa tu safu mlalo mbadala ya kuisha kwa muda unaofanana. Hakuna kusubiri kati ya ulinganisho huo na ufutaji; uandishi mpya wa kukatika huhifadhiwa. Uhamishaji uliolindwa huondoa pin ya ndani ya akaunti iliyoshindwa hata ikiwa Redis chini, na kuitakasa tena baada ya kufukuzwa kwa pamoja kuthibitishwa. Majibu yaliyoshirikiwa yanayosubiri mapema hayawezi kurejesha pini ya ndani iliyoondolewa kwa sababu mafanikio yaliyoshirikiwa hayaandiki kamwe SQLite. Njia mbadala ya kukatika kwa baadaye inaweza kubana akaunti tena; uandishi ulioshirikiwa uliokubaliwa baadaye unapatikana Redis pekee. Redis misses haishauriani na hali ya eneo la nyuma. Kiendeshaji kikiwa kimezimwa, pini mpya zilizochaguliwa huhifadhi urithi wa uga wa nne wa umbo la SQLite JSON ; uelekezaji wa Redis pekee ndio unaoongeza utambulisho wa akaunti ya haraka. Pini zilizoletwa awali huangaliwa upya katika mpaka wake wa kuisha muda wake. Redis uteuzi usio wa kukodisha husoma tena duka, lakini upangaji wa upangaji sanjari bado unaweza kutumia pini iliyoondolewa kati ya kuleta mapema na kupanga (dirisha la juhudi bora linalokubalika). Ahadi ya ukodishaji haiwezi kubadili akaunti baada ya dai la kudumu: kwa kupinga kukataliwa huweka mgombea anayedaiwa kwa ombi hilo pekee na kumwacha mshindi aliyeshirikiwa bila kuguswa, kwa hivyo makubaliano katika matukio yote yanadhibitiwa kwenye njia hiyo. Jedwali lingine bado linatumika: hii haishiriki unata wa kipindi cha mseto, pini za kugeuza asili Codex, taswira za akaunti, kufunga nje, vikomo vya matumizi, usanidi au kumbukumbu za simu.

Maunzi: kwa mfano `/v1/responses` ndefu ni a** kumbukumbu - bajeti** swali (lundo + inflight-byte / #10110). `N` independent `DATA_DIR` s bado inazidisha lundo: mwenyeji RAM lazima afunike `N × cgroup`, si "pod moja ya 16 Gi yenye N = 8." Usiwahi `replicas > 1` kwenye faili moja SQLite.

Tunga mchoro (rundo mbili, juzuu mbili — si `deploy.replicas: 2`):

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

Msongamano wa mchakato (mgandamizo kutoka kwa HTTP pekee) ni [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Kundi moja la kimantiki kwenye hali ya kudumu ya pamoja ni [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
