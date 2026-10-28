# 🐳 Docker Guide — OmniRoute (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker-ի տեղակայման ամբողջական տեղեկատու։ Արագ մեկնարկի համար տե՛ս [README-ի Docker բաժինը](../README.md#-docker)։

## Բովանդակություն

- [Արագ գործարկում](#quick-run)
- [Միջավայրի ֆայլով](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Հասանելի պրոֆիլներ](#available-profiles)
- [Հոսթի CLI գործիքների կազմաձևումը, երբ OmniRoute-ն աշխատում է Docker-ում](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis կողմնակի կոնտեյներ](#redis-sidecar)
- [Արտադրական Compose](#production-compose)
- [Dockerfile-ի փուլեր](#dockerfile-stages)
- [Կարևոր միջավայրի փոփոխականներ](#critical-environment-variables)
- [Docker Compose՝ Caddy-ով (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare արագ թունել](#cloudflare-quick-tunnel)
- [Պատկերների թեգեր](#image-tags)
- [Վահանակի թարմացումները Docker-ում](#dashboard-updates-in-docker)
- [Հասանելիություն․ լռելյայն SQLite-ը նախատեսված է մեկ կրկնօրինակի համար](#availability-default-sqlite-is-single-replica)
- [Gemini-ի տարածաշրջանային սխալները Docker-ի ներսում](#gemini-regional-errors-inside-docker)
- [Կարևոր նշումներ](#important-notes)

---

## Արագ գործարկում

> **Ինքնուրույն հոսթինգ՝ մեկ հրամանո՞վ։** Տե՛ս
> [Ինքնուրույն հոսթինգի ուղեցույցը](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (հրապարակված պատկեր +
> Redis, միայն loopback, առանց պրոֆիլի ընտրության)։ Ստորև ներկայացված արագ գործարկումը
> մեկ կոնտեյներով տարբերակն է այն օգտատերերի համար, որոնք Redis-ն արդեն գործարկում են այլ վայրում։

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Միջավայրի ֆայլով

```bash
# Նախ պատճենեք և խմբագրեք .env-ը
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
# Հիմնական պրոֆիլ (առանց CLI գործիքների)
docker compose --profile base up -d

# CLI պրոֆիլ (ներկառուցված Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Հոսթի պրոֆիլ (նախատեսված է հիմնականում Linux-ի համար․ հոսթի CLI երկուական ֆայլերը միակցվում են միայն կարդալու ռեժիմով)
docker compose --profile host up -d

# Վեբ պրոֆիլ (Chromium/Playwright՝ վեբ աշխատաշրջան օգտագործող մատակարարների համար)
docker compose --profile web up -d

# Համատեղեք CLI-ն և CLIProxyAPI կողմնակի կոնտեյները
docker compose --profile cli --profile cliproxyapi up -d
```

## Հասանելի պրոֆիլներ

OmniRoute-ը տրամադրվում է տեղակայման հիմնական տարբերակների համար նախատեսված Compose պրոֆիլներով։ Ընտրեք ձեր միջավայրին համապատասխանող տարբերակը։

| Պրոֆիլ            | Ծառայություն     | Երբ օգտագործել                                                                                                                                                                                 | Հրաման                                       |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (լռելյայն) | `omniroute-base` | Առանց գրաֆիկական միջերեսի սերվեր / նվազագույն կատարման միջավայր՝ առանց ներառված մատակարարների CLI-ների                                                                                         | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Գործակալային աշխատանքային հոսքեր, որոնք կանչում են `omniroute providers/setup/doctor`-ը և ներառված CLI-ները (Codex, Claude Code, Droid, OpenClaw)                                              | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux հոսթեր, որոնք ցանկանում են `network_mode`-ի նման հասանելիություն ստանալ հոսթի CLI-ներին՝ `~/.local/bin`, `~/.codex`, `~/.claude` և այլ ուղիները միայն կարդալու ռեժիմով միակցելու միջոցով | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Գործարկեք [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) կողմնակի կոնտեյները `8317` պորտում՝ վերին մակարդակի CLI պրոքսավորման համար                                               | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Դիտարկիչ պահանջող վեբ աշխատաշրջանի մատակարարներ՝ `gemini-web`, `claude-web`, `claude-turnstile` (կառուցում է `runner-web`-ը, Chromium-ը ներառված է)                                            | `docker compose --profile web up -d`         |

> Կարելի է համատեղել մի քանի պրոֆիլ՝ `docker compose --profile cli --profile cliproxyapi up -d`։

## Հոսթի CLI գործիքների կարգավորումը, երբ OmniRoute-ն աշխատում է Docker-ում

`omniroute setup-codex`, `setup-claude`, `config set <tool>` հրամանները և կառավարման վահանակի
**Պահպանել կարգավորումը** կոճակը գրում են `~/.codex/*.config.toml`-ի նման ֆայլեր։ Այդ ուղիներն
իմաստ ունեն միայն այն մեքենայի վրա, որտեղ իրականում աշխատում է CLI-ը։ Եթե դրանք գործարկեք
կոնտեյների ներսում, ֆայլը կգրվի կոնտեյների սեփական տնային պանակում (`/home/node` —
պատկերն աշխատում է `USER node`-ով), որտեղ հոսթի ոչ մի CLI երբեք չի կարդա այն, և որտեղից այն
կջնջվի կոնտեյների վերաստեղծման պահին։

OmniRoute-ը հայտնաբերում է սա և օգտագործման համար անպիտան հաջողության մասին հաղորդելու
փոխարեն հրաժարվում է գրառումից՝ տրամադրելով հրահանգներ․ CLI-ն ավարտվում է `2` կոդով, իսկ API-ն
պատասխանում է `422` կոդով և `containerEphemeralTarget: true` արժեքով։

### Խորհուրդ է տրվում․ գործարկել CLI-ը հոսթի վրա, իսկ OmniRoute-ը՝ Docker-ում

Կոնտեյները սպասարկում է API-ն, իսկ CLI-ը կարգավորում է ձեր հոսթի գործիքները։

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # ուղղել CLI-ը դեպի կոնտեյները
omniroute setup-codex                      # գրում է ձեր հոսթի իրական ~/.codex պանակում
```

Սա ճիշտ ընտրություն է, երբ Codex-ը, Claude Code-ը, Cursor-ը կամ նմանատիպ գործիքներն աշխատում են ձեր
նոութբուքում, ինչը սովորական կարգավորումն է։

### Այլընտրանք․ bind-mount անել հոսթի կարգավորումների պանակները (`host` պրոֆիլ)

Եթե ցանկանում եք, որ հենց կոնտեյները գրի ձեր հոսթի կարգավորումները, մոնտաժեք
պանակները դրա մեջ և `CLI_CONFIG_HOME`-ը ուղղեք դեպի մոնտաժման արմատը։ `host` պրոֆիլն
արդեն կատարում է սա․

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount-ն է ուղին դարձնում վստահելի․ OmniRoute-ը կարդում է
`/proc/self/mountinfo`-ն և թույլատրում է գրառումներ մոնտաժված ուղիներում (ինչպես նաև այն պանակներում,
որոնց ենթապանակները մոնտաժված են, ինչը ճշգրտորեն համապատասխանում է վերը նշված `/host-home`
կառուցվածքին)՝ միաժամանակ շարունակելով մերժել չմոնտաժված ուղիները։

### Շրջանցման տարբերակ․ կարգավորել կոնտեյների սեփական CLI-ները (օգտագործեք խնայողաբար)

Երբ CLI-ներն իսկապես գտնվում են կոնտեյների ներսում (`cli` պրոֆիլ), գրառումը
կանխամտածված է։ Ցանկացած `setup-*` հրամանի փոխանցեք `--allow-container-write`, կամ սերվերի համար
սահմանեք `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`։ Գրառումը կատարվում է
նախազգուշացմամբ, որ այն չի պահպանվի կոնտեյների գոյությունից հետո։

> **Անվտանգության նախազգուշացում — `cli` պրոֆիլ + `docker.sock` մոնտաժ։**
> `cli` պրոֆիլը bind-mount է անում `/var/run/docker.sock`-ը, որպեսզի կոնտեյների ներսում աշխատող
> ավտոմատ թարմացնողը կարողանա հոսթի դեյմոնի միջոցով վերաստեղծել ստեկը
> (`src/lib/system/autoUpdate.ts`-ը ստուգում է այդ սոկետի առկայությունը և դրա
> բացակայության դեպքում բաց է թողնում Docker-ի ուղին)։ Այդ սոկետը **հոսթի root մակարդակի
> վստահության սահման է**․ դրան հասանելիություն ունեցող ցանկացած բան կառավարում է հոսթի Docker դեյմոնը՝
> որպես root․ այն կարող է ստեղծել, զննել, կանգնեցնել և հեռացնել հոսթի ցանկացած կոնտեյներ։
> Հետևանքները․
>
> 1. **Երբեք մի բացեք `cli` պրոֆիլի պորտը ցանցի համար։** Հրապարակեք
>    այն `127.0.0.1` հասցեում (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN-ից հասանելի `cli` պրոֆիլը կառավարման վահանակի մակարդակի ցանկացած RCE վերածում է
>    հոսթի ամբողջական զավթման։
> 2. **Ոչ մի լրացուցիչ հոսթի պանակ bind մի արեք `cli` պրոֆիլի մեջ։**
>    Docker սոկետը որևէ լրացուցիչ մոնտաժի հետ միասին կոնտեյներին տալիս է ձեր ֆայլային համակարգի
>    և հոսթի կարգավորումների ամբողջական կարդալու/գրելու հասանելիություն։ Եթե անհրաժեշտ է, որ գործիքը
>    տեսնի որևէ նախագիծ, գործարկեք այն տեղային միջավայրում CLI բինար ֆայլով․ այն մի մոնտաժեք
>    `cli` կոնտեյների մեջ։
>
> Եթե կոնտեյների ներսում ավտոմատ թարմացման կարիք չունեք, մի միացրեք `cli` պրոֆիլը
> (`COMPOSE_PROFILES=core,redis` կամ ավելի կարճ տարբերակ)։ Մյուս պրոֆիլները չեն
> մոնտաժում Docker սոկետը։
>
> MITM-ի հետ կապված սպառնալիքների մոդելի համար տե՛ս `docs/security/MITM-TPROXY-DECRYPT.md`-ը (git-ում է՝ `/docs`-ի մեջ չի կազմարկվում),
> իսկ `codex`/`claude-code`/`droid`/`openclaw` բինար ֆայլերի ծագման շղթայի համար՝
> `docs/security/SUPPLY_CHAIN.md`-ը։

## Redis կողմնակի կոնտեյներ

OmniRoute-ն օգտագործում է Redis-ը՝ բաշխված հարցումների հաճախականության սահմանափակիչի և ընդհանուր քեշի աշխատանքն ապահովելու համար։ `redis` ծառայությունը **միշտ սահմանված է** `docker-compose.yml`-ում (այն պրոֆիլային սահմանափակում չունի) և գործարկվում է ցանկացած այլ պրոֆիլի հետ միասին։

| Մանրամաս                  | Արժեք                                     |
| ------------------------- | ----------------------------------------- |
| Պատկեր                    | `redis:7-alpine`                          |
| Կոնտեյների անուն          | `omniroute-redis`                         |
| Ներքին պորտ               | `6379`                                    |
| Հոսթի պորտ (վերագրում)    | `REDIS_PORT` (լռելյայն՝ `6379`)           |
| Հոսթի կապում (վերագրում)  | `REDIS_BIND_HOST` (լռելյայն՝ `127.0.0.1`) |
| Հատոր                     | `omniroute-redis-data` → `/data`          |
| Աշխատունակության ստուգում | `redis-cli ping` (10վ միջակայքով)         |

Առնչվող միջավայրի փոփոխականներ՝

- `REDIS_URL` — հավելված ներմուծվող միացման տողը (լռելյայն՝ `redis://redis:6379`)։
- `REDIS_PORT` — Redis կոնտեյների՝ հոսթի կողմի պորտի համապատասխանեցումը։
- `REDIS_BIND_HOST` — հոսթի ցանցային միջերեսը, որի վրա հրապարակվում է պորտը։ Լռելյայն՝ `127.0.0.1`։

> **Ինչու է լռելյայն օգտագործվում loopback-ը․** կողմնակի կոնտեյներն աշխատում է առանց `requirepass`-ի, իսկ հավելվածի
> կոնտեյներները դրան հասանելիություն են ստանում compose ցանցով (`redis:6379`)․ հրապարակված պորտը
> նախատեսված է միայն հոսթի կողմի գործիքների համար (`redis-cli`, տեղային `npm run dev`)։ `0.0.0.0`-ի վրա
> հրապարակումը նույն LAN-ի յուրաքանչյուր հոսթի համար հասանելի կդարձներ առանց նույնականացման Redis-ը։ Եթե սահմանեք
> `REDIS_BIND_HOST=0.0.0.0`, ծառայության `command:`-ին նույնպես ավելացրեք `--requirepass`։

**Redis-ի անջատումը** խորհուրդ չի տրվում (հարցումների հաճախականության սահմանափակիչը կանցնի հիշողության մեջ աշխատող պահուստային տարբերակին)։ Եթե դա պարտադիր է, հեռացրեք կամ մեկնաբանության վերածեք `docker-compose.yml`-ի `redis:` ծառայության բլոկը կամ մասշտաբավորեք այն մինչև զրո՝

```bash
docker compose up -d --scale redis=0
```

## Արտադրական Compose

Մշակման միջավայրին զուգահեռ աշխատող մեկուսացված արտադրական պատճենի համար օգտագործեք `docker-compose.prod.yml`։

| Մանրամաս                          | Արժեք                                                                                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Ֆայլ                              | `docker-compose.prod.yml`                                                                                 |
| Կառավարման վահանակի լռելյայն պորտ | `PROD_DASHBOARD_PORT=20130` (համապատասխանեցված է ներքին `${DASHBOARD_PORT:-20128}`-ին)                    |
| API-ի լռելյայն պորտ               | `PROD_API_PORT=20131`                                                                                     |
| Պատկեր                            | `omniroute:prod` (կառուցված է `runner-cli` թիրախից)                                                       |
| Redis կոնտեյներ                   | `omniroute-redis-prod` (`redis:8.6.2`, առանձնացված `redis-prod-data` հատոր)                               |
| Տվյալների հատոր                   | `omniroute-prod-data` (անվանակոչված, պահպանվում է վերակառուցումների միջև)                                 |
| Աշխատունակության ստուգումներ      | `node healthcheck.mjs` + `redis-cli ping`, որտեղ `depends_on`-ը պայմանավորված է Redis-ի աշխատունակությամբ |

Օգտագործման եղանակը՝

```bash
# Կառուցել և գործարկել արտադրական ստեկը
docker compose -f docker-compose.prod.yml up -d --build

# Հեռարձակել մատյանները
docker compose -f docker-compose.prod.yml logs -f

# Դադարեցնել և հեռացնել (պահպանել հատորները)
docker compose -f docker-compose.prod.yml down
```

Արտադրական ստեկն աշխատում է մշակման compose-ի հետ զուգահեռ (կոնտեյներների անունները, պորտերը և հատորները տարբեր են), ուստի կարող եք շարունակել տեղային մշակումը, մինչ արտադրական միջավայրը շարունակում է աշխատել։

## Dockerfile-ի փուլերը

Պահոցը ներառում է բազմափուլ Dockerfile (`Dockerfile`)։ Հասանելի է չորս փուլ․ ձեր կիրառման դեպքի համար ընտրեք ճիշտ `target`-ը։

| Փուլ          | Հիմքային պատկեր       | Նպատակ                                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Տեղադրում է կախվածությունները (`npm ci --legacy-peer-deps`) և գործարկում `npm run build`-ը (լռելյայն՝ Turbopack․ տե՛ս ստորև՝ Կառուցման ժամանակի ռեսուրսները)                                                                                                                                                    |
| `runner-base` | `node:26-trixie-slim` | Արտադրական գործարկման միջավայր՝ Next.js-ի ինքնաբավ ելքով։ **Մատակարարների CLI-ներ ներառված չեն։**                                                                                                                                                                                                               |
| `runner-cli`  | `runner-base`         | Ավելացնում է `git`, `docker.io`, `docker-compose` և գլոբալ CLI-ներ՝ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`։ **Ընտրեք սա գործակալային աշխատանքային հոսքերի համար։**                                                                                                                   |
| `runner-web`  | `runner-base`         | Ավելացնում է Playwright և Chromium դիտարկիչ (`--with-deps`)՝ վեբ-նստաշրջանների մատակարարների համար՝ `gemini-web`, `claude-web`, `claude-turnstile`։ **Ընտրեք սա, երբ օգտագործում եք այդ մատակարարները**․ սովորական պատկերն առանց դրա ձախողվում է հարցման պահին (տե՛ս `-web` նշումը Թողարկման ալիքների բաժնում)։ |

Որոշակի թիրախ ձեռքով կառուցելու համար՝

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Կառուցման ժամանակի ռեսուրսները

Երեք կառուցման արգումենտ վերահսկում են `builder` փուլի ռեսուրսային ծախսը։ Դրանք գործում են միայն կառուցման ժամանակ —
`OMNIROUTE_MEMORY_MB`-ը (ստորև) առանձին՝ գործարկման ժամանակի կարգավորիչ է։

| Կառուցման արգումենտ         | Լռելյայն | Ազդեցություն                                                                                                       |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`      | `0`-ն կառուցում է webpack-ով՝ պիկային հիշողությունն ավելի քիչ է, արագությունը՝ ցածր։ `1`-ը միացնում է Turbopack-ը։ |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | V8-ի heap-ի վերին սահմանը (`--max-old-space-size`) գործարկված `next build`-ի համար։                                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Փոխանցվում է `CIRCLE_NODE_TOTAL`-ին․ Next-ը էջերի տվյալների հավաքման համար սահմանում է `workers = N - 1`։          |

Մեծ կառուցման սերվերի վրա պետք է բարձրացնել հենց `OMNIROUTE_BUILD_WORKERS`-ը, իսկ սահմանափակ ռեսուրսներով կառուցումը **`✓ Compiled successfully`-ից հետո** ընդհատվելու դեպքում առաջին հերթին պետք է կասկածել հենց դրան։ Էջերի տվյալների յուրաքանչյուր worker առանձին գործընթաց է, ինչպես նաև ծնող `next build`-ը․ գործող VPS-ի վրա կատարված վերարտադրությունը (issue #7518) ցույց տվեց, որ յուրաքանչյուր գործընթացի պիկային RSS-ը կազմում է մոտավորապես ~4.5 GB՝ անկախ `NODE_OPTIONS` heap-ի դրոշից (Turbopack-ը կոմպիլացվում է V8 heap-ից դուրս՝ native/Rust հիշողության մեջ)։ Լռելյայն `2` արժեքը (→ 1 worker, ընդհանուր՝ 2 գործընթաց) նախատեսված է 16 GB / 4 vCPU ունեցող՝ GitHub-ի կողմից տրամադրվող runner-ների համար, որոնք օգտագործվում են հրապարակման pipeline-ում։ `8` արժեքի դեպքում (→ 7 worker) այդ runner-ի հիշողությունը սպառվեց, և buildkit-ը ձախողեց քայլը՝ `ResourceExhausted: ... cannot allocate memory` հաղորդագրությամբ։ `3`-ը (→ 2 worker) նույնպես չտեղավորվեց, երբ յուրաքանչյուր գործընթացի RSS-ը չափվեց ուղղակիորեն, այլ ոչ թե գնահատվեց անուղղակիորեն։ `tests/unit/docker-build-memory-budget.test.ts`-ը հաշվարկներ է կատարում չափված արժեքի հիման վրա և ձախողվում է, եթե կարգավորիչներից որևէ մեկը գերազանցում է runner-ի հնարավորությունները։

Turbopack-ը կոմպիլացվում է native Rust հիշողության մեջ, որը գտնվում է **V8 heap-ից դուրս**, ուստի `OMNIROUTE_BUILD_MEMORY_MB`-ը չի սահմանափակում այն։ Հիշողության սահմանաչափ ունեցող հոսթի վրա OOM killer-ն այդ դեպքում SIGKILL է ուղարկում կառուցման գործընթացին՝ առանց որևէ սխալի տեքստի․ այն պարզապես կանգ է առնում `Creating an optimized production build`-ի ընթացքում, ինչը հիշողության սպառման փոխարեն նման է կախված վիճակի։ Ահա թե ինչու `Dockerfile`-ը, ի տարբերություն `npm run dev` / `npm run build` հրամանների, որտեղ կոդի լռելյայն տարբերակը Turbopack-ն է, լռելյայն օգտագործում է webpack (`OMNIROUTE_USE_TURBOPACK=0`)․ առանց կառուցման արգումենտների պարզ `docker build .` հրամանը (որը գործարկում են Railway-ը և մեկ սեղմումով տեղակայում առաջարկող այլ հոսթեր) չպետք է աննկատ ձախողվի հիշողության սահմանաչափ ունեցող կառուցման սերվերի վրա։ Հրապարակված պատկերներն արդեն իսկ `docker-publish.yml`-ում բացահայտորեն փոխանցում են `OMNIROUTE_USE_TURBOPACK=0`։ Բավարար RAM ունեցող կառուցման սերվերի վրա ավելի արագ կառուցման համար միացրեք Turbopack-ը՝

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker`-ը միացված է, ուստի `next build`-ը գործարկում է ծնող **և** worker գործընթաց, և դրանցից յուրաքանչյուրը `OMNIROUTE_BUILD_MEMORY_MB`-ը կիրառում է առանձին։ Կոնտեյների սահմանաչափը սահմանեք այդ արժեքից մոտավորապես երկու անգամ բարձր, ոչ թե մեկ անգամ։

Այս ծառի վրա կատարված չափումները (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`)՝

| Փաթեթավորիչ | Կոնտեյների սահմանաչափ | Արդյունք                                                         |
| ----------- | --------------------- | ---------------------------------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB        | Երկու դեպքում էլ OOM-ի պատճառով ընդհատվեց՝ առանց հաղորդագրության |
| webpack     | 8 GiB                 | build worker-ը SIGKILL ստացավ                                    |
| webpack     | 12 GiB                | Հաջողվեց, պիկը կազմեց 11.1 GiB                                   |

### Գործարկման ժամանակի լռելյայն արժեքները

`runner-base`-ի արտահանած լռելյայն արժեքները՝ `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`։

Հիշողության վարքագիծը Docker-ում․

- Պատկերը սահմանում է `OMNIROUTE_MEMORY_MB=1024` և դրանից ստանում `NODE_OPTIONS=--max-old-space-size=1024`։
- Սերվերի իրական գործընթացը մեկնարկում է ինքնուրույն գործարկիչը, որը կարդում է `OMNIROUTE_MEMORY_MB`-ը և ավելացնում `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`։
- Node-ն օգտագործում է վերջին կրկնվող `--max-old-space-size` արժեքը, ուստի `OMNIROUTE_MEMORY_MB`-ի սահմանումը վերահսկում է Docker-ի heap-ի արդյունավետ սահմանաչափը։
- Քանի որ պատկերը միշտ սահմանում է այն, գործարկիչի՝ RAM-ի հիման վրա հաշվարկվող պահուստային արժեքը Docker-ում երբեք չի կիրառվում։ Աշխատանքային ծանրաբեռնվածության համար բացահայտ բարձրացրեք այն (ստորև բերված աղյուսակ)։ `2048`-ը դեռևս չափազանց փոքր է կոդավորման գործակալների `/v1/responses` հարցումների համար։

### Կոդավորման գործակալների կատարման միջավայրի RAM-ը

Docker-ի լռելյայն 1 GiB-ը կառավարման վահանակի/թեթև զրույցի նվազագույն շեմն է, այլ ոչ թե արտադրական չափ։ Երկար `POST /v1/responses` հարցումների մարմինները (հարյուրավոր հաղորդագրություններ, տասնյակ գործիքներ) սեղմման ընթացքում հիշողության մեջ պահում են մի քանի գրաֆ։ Միմյանց համընկնող՝ մոտավորապես 3 MiB / 750k թոքեն ծավալով երկու հարցում հանգեցրել է V8-ի ընդհատմանը **12 GiB** old-space-ի դեպքում (`FATAL ERROR: Reached heap limit`), ինչպես նաև առաջացրել է 16 GiB cgroup OOM։ Տե՛ս [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)։

Սահմանեք **cgroup `--memory`-ն heap-ից բարձր**․ բնիկ բուֆերները, SQLite-ը և սեղմման միջանկյալ տվյալները գտնվում են V8-ից դուրս։

| Աշխատանքային ծանրաբեռնվածություն                 | `OMNIROUTE_MEMORY_MB`          | Կոնտեյներ / cgroup          | Նշումներ                                                                                                                 |
| ------------------------------------------------ | ------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Կառավարման վահանակ, մեկ թեթև զրույց              | `1024` (պատկերի լռելյայնը)     | ≥2 GiB                      |                                                                                                                          |
| Մեկ կոդավորման գործակալ (Claude/Codex/Grok)      | `8192`                         | ≥10 GiB                     | Սովորական մեկ նստաշրջանի `/v1/responses`                                                                                 |
| Երկու միաժամանակյա երկար `/v1/responses` հարցում | `10240`–`12288`                | ≥12–16 GiB                  | Դիտարկվել է V8-ի ընդհատում մոտավորապես 12 GiB heap-ի դեպքում                                                             |
| Երեք կամ ավելի միաժամանակյա երկար համատեքստ      | մի՛ գործարկեք մեկ գործընթացում | հերթագրեք / ավելացրեք RAM-ը | Ծանր հարցումների լռելյայն թույլատրումը միաժամանակ 1-ն է․ առանց RAM-ի ավելացման այն բարձրացնելը կրկին ընդհատում կառաջացնի |

Առանձին համակարգում `omniroute serve`-ը հաշվարկում է RAM-ի մոտավորապես 35%-ը (`[512, 4096]` միջակայքով սահմանափակված), երբ `OMNIROUTE_MEMORY_MB`-ը **սահմանված չէ**։ Docker-ը միշտ սահմանում է `1024`, ուստի պաշտոնական պատկերում այդ հաշվարկը երբեք չի կատարվում։

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Կրիտիկական միջավայրի փոփոխականներ

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-ում փաստաթղթավորված լռելյայն արժեքներից բացի, Docker-ի ներքո գործարկելիս առավել կարևոր են հետևյալ փոփոխականները.

| Փոփոխական                     | Նպատակ                                                                                                                                                                                                                                                                                                                                           | Լռելյայն արժեք                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket կամրջի ընդհանուր գաղտնիքը։ **Պարտադիր է արտադրական միջավայրում** — սահմանեք որպես ուժեղ պատահական տող։                                                                                                                                                                                                                                 | սահմանված չէ (պետք է տրամադրվի) |
| `REDIS_URL`                   | Արագության սահմանափակիչի / քեշի հետնամասի միացման տողը                                                                                                                                                                                                                                                                                           | `redis://redis:6379`            |
| `REDIS_PORT`                  | Ներառված Redis կոնտեյների հոսթային պորտը                                                                                                                                                                                                                                                                                                         | `6379`                          |
| `REDIS_BIND_HOST`             | Հոսթի ինտերֆեյսը, որի վրա հրապարակվում է ներառված Redis-ի պորտը (հետադարձ կապի ինտերֆեյս, եթե AUTH չեք ավելացնում)                                                                                                                                                                                                                               | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Հոսթի ուղին, որը ինքնաթարմացման աշխատանքային հոսքերի համար միակցվում է `cli` պրոֆիլում՝ `/workspace/omniroute` հասցեում                                                                                                                                                                                                                          | `.` (ընթացիկ գրացուցակ)         |
| `OMNIROUTE_MEMORY_MB`         | Docker-ի ինքնուրույն սերվերի համար Node-ի կույտային հիշողության կատարման ժամանակի վերին սահմանը. վերասահմանում է պատկերի վերը նշված լռելյայն արժեքը։ Կոդավորման գործակալների համար՝ `8192`+ (տե՛ս [կատարման ժամանակի RAM](#runtime-ram-for-coding-agents))։                                                                                      | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Վերասահմանում է կառավարման վահանակի (20128) և API-ի (20129) հրապարակված պորտերը                                                                                                                                                                                                                                                                  | `20128` / `20129`               |
| `APP_BIND_HOST`               | Հոսթի ինտերֆեյսը, որի վրա docker-compose-ը հրապարակում է կառավարման վահանակի/API-ի/իրական ժամանակի WS-ի պորտերը։ `REQUIRE_API_KEY=false`-ի դեպքում (լռելյայն) `0.0.0.0`-ը անանուն `/v1` պրոքսին հասանելի է դարձնում տեղային ցանցում. ընդլայնեք հասանելիությունը միայն `REQUIRE_API_KEY=true`-ի կամ առջևում հակադարձ պրոքսիի առկայության դեպքում։ | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Հոսթի ինտերֆեյսը, որի վրա docker-compose-ը հրապարակում է `cliproxyapi` կից կոնտեյները. դրա տվյալների հատորը պահում է մատակարարի հավատարմագրերը։                                                                                                                                                                                                  | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Գրացուցակը, որը կատարման միջավայրի փլագինների սկանավորիչը կարդում է, և որտեղ տեղադրում է փլագինները։ Սահմանեք այն, երբ փլագինները միակցված են bind mount-ով. լռելյայն արժեքը հետևում է `HOME`-ին, որը պատկերը պարտադիր չէ արտահանի։                                                                                                              | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | URL-ի ենթուղին, երբ հավելվածը հրապարակվում է հակադարձ պրոքսիի հետևում (օրինակ՝ `/omniroute`)                                                                                                                                                                                                                                                     | _(դատարկ = արմատ)_              |
| `NEXT_PUBLIC_BASE_URL`        | Բրաուզերի հանրային սկզբնաղբյուրը՝ ներառյալ ենթուղին (օրինակ՝ `https://host/omniroute`)                                                                                                                                                                                                                                                           | սահմանված չէ                    |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`-ի կառավարման վահանակի հոսթային պորտը                                                                                                                                                                                                                                                                                   | `20130`                         |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` կից կոնտեյների հոսթային պորտը                                                                                                                                                                                                                                                                                                      | `8317`                          |

## Հակադարձ պրոքսի՝ ենթուղու վրա (Traefik / nginx)

Next.js-ի `basePath`-ը կոմպիլացվում է ինքնուրույն փաթեթի մեջ։ OmniRoute-ը հավելվածի արմատում գտնվող վերահսկիչ ֆայլում գրանցում է ներկառուցված արժեքը (գրվում է `npm run build`-ի ընթացքում, կարդացվում՝ `scripts/docker/ensure-docker-base-path.mjs`-ի կողմից) և կոնտեյների մեկնարկի ժամանակ այն համեմատում է `OMNIROUTE_BASE_PATH`-ի հետ։ Երբ դրանք տարբերվում են, իսկ պատկերը կառուցվել է դոմենի արմատի համար, մուտքի կետը վերագրում է ինքնուրույն մանիֆեստները, ներդրված `basePath`/`assetPrefix` լիտերալները (Next 16-ը SSR ռեսուրսների URL-ները գեներացնում է միայն `assetPrefix`-ից, ուստի շտկիչը ենթուղին արտացոլում է նաև դրա մեջ), ներկառուցված `/_next/static` ռեսուրսների URL-ները (հաճախորդի հղումների մանիֆեստներ, մեդիա ներմուծումներ, նախապես գեներացված սխալի էջեր) և հաճախորդի `process.env` միջադիրը՝ նախքան `node dev/run-standalone.mjs`-ի գործարկումը։

### Կառուցում Compose-ով (խորհուրդ է տրվում)

Սահմանեք երկու փոփոխականներն էլ `.env`-ում, այնուհետև վերակառուցեք, որպեսզի պատկերի և կատարման միջավայրի կարգավորումները համապատասխանեն.

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`-ը `OMNIROUTE_BASE_PATH`-ը փոխանցում է որպես Docker-ի կառուցման արգումենտ և որպես կատարման միջավայրի փոփոխական։

### Նախապես կառուցված արմատային պատկեր + կատարման ժամանակի ենթուղի

Հրապարակված `diegosouzapw/omniroute:*` պատկերները կառուցված են դոմենի արմատի համար։ Այնուամենայնիվ, կարող եք կատարման ժամանակ սահմանել `OMNIROUTE_BASE_PATH`-ը. կոնտեյները մեկնարկի ժամանակ մեկ անգամ կշտկի փաթեթը։ Այն համադրեք համապատասխան հանրային սկզբնաղբյուրի հետ.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Կարգավորեք հակադարձ պրոքսին այնպես, որ այն փոխանցի արտաքին **ամբողջական** ուղին (մի հեռացրեք նախածանցը)։ Traefik-ը պետք է `PathPrefix(`/omniroute`)`-ը երթուղավորի դեպի կոնտեյներ՝ առանց `StripPrefix`-ի, որպեսզի Next.js-ը ստանա `/omniroute/...` և ռեսուրսները սպասարկի `/omniroute/_next/...` հասցեից։

Docker-ի առողջության ստուգումը հարցում է կատարում թեթև `/healthz` կենսացիկլի վերջնակետին՝ ակտիվ `OMNIROUTE_BASE_PATH` նախածանցով։ `/api/monitoring/health`-ը շարունակում է հասանելի լինել մարդկանց կամ վահանակների կողմից ախտորոշման համար։ Կոնտեյների HEALTHCHECK-ը կրկին դրան ուղղելու համար (օրինակ՝ առողջության խորքային ստուգում պարտադրելու նպատակով) սահմանեք `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`։ Այդ ուղին **խորքային** ստուգում է (ՏԲ + մոնիթորինգի ամփոփագիր). այն հարմար է Docker-ի հազվադեպ կատարվող `HEALTHCHECK`-ի համար, եթե կրկին միացնեք այն, բայց **ոչ** Kubernetes-ի `livenessProbe` միջակայքերի համար։

Օրկեստրատորների համար (Kubernetes, Nomad և այլն).

| Ստուգում            | Նախընտրելի                                                                | Խուսափեք                                                                                                 |
| ------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Կենսունակություն    | HTTP `GET /livez` կամ TCP՝ հիմնական պորտի վրա (`PORT`, լռելյայն՝ `20128`) | `/api/monitoring/health`-ից՝ որպես կենսունակության ստուգում                                              |
| Պատրաստականություն  | HTTP `GET /healthz`                                                       | Խիստ ժամանակային սահմանափակումներից, որոնք իրադարձությունների ցիկլի զբաղվածությունը համարում են խափանում |
| Խորքային / blackbox | `/api/monitoring/health`                                                  | —                                                                                                        |

`/healthz`-ը հաղորդում է պրոցեսի կենսացիկլի վիճակը (`ok` / `starting` / `stopping`)։ `/livez`-ը ստուգում է միայն պրոցեսի աշխատանքը (վերադարձնում է 200, երբ մշակիչը կարող է գործարկվել. այն չի սպասում պատրաստականությանը)։ Երկուսն էլ շարունակում են աշխատել հարցումների մշակման հետ նույն Node իրադարձությունների ցիկլում, ուստի պրոցեսորային ռեսուրսներ պահանջող կատալոգավորման կամ սեղմման աշխատանքը կարող է ուշացնել դրանց պատասխանը. զբաղված ≠ խափանված։ Եթե HTTP ստուգումների սպասման ժամանակը սպառվում է, կենսունակության ստուգման համար նախընտրեք TCP-ն։ Ստուգումների ամբողջական ուղեցույցը՝
[Մոնիթորինգի ուղեցույց — Kubernetes-ի ստուգումների վերաբերյալ առաջարկություններ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)։

## Docker Compose՝ Caddy-ով (HTTPS Auto-TLS)

OmniRoute-ը կարելի է անվտանգ հրապարակել՝ օգտագործելով Caddy-ի SSL-ի ավտոմատ տրամադրումը։ Համոզվեք, որ ձեր տիրույթի DNS A գրառումը մատնանշում է ձեր սերվերի IP հասցեն։

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
      # Դիտարկիչին հասանելի սկզբնաղբյուր՝ OAuth հետկանչերի, կառավարման վահանակի հղումների և գեներացված հանրային URL-ների համար։
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Ներքին սերվեր-սերվեր URL՝ պլանավորված առաջադրանքների / ինքնահարցումների համար։
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

Caddy-ն վերին հոսքի կոնտեյների համար սահմանում է փոխանցման ստանդարտ վերնագրերը։ OmniRoute-ն օգտագործում է
`NEXT_PUBLIC_BASE_URL`-ը՝ որպես OAuth հետկանչերի և գեներացված հանրային
հղումների կանոնական հանրային սկզբնաղբյուր։ Վավերացված կառավարման վահանակի գրառման հարցումներն օգտագործում են նույն սկզբնաղբյուրով հարցումներ և աշխատաշրջանին կապված CSRF
պաշտպանություն։ Միացրեք `OMNIROUTE_TRUST_PROXY`-ն միայն առաջադեմ տեղակայումների դեպքում, երբ միտումնավոր
ցանկանում եք, որ OmniRoute-ը հանրային սկզբնաղբյուրը որոշի վստահելի փոխանցված վերնագրերից՝ բացահայտ
կարգավորման փոխարեն։

## Cloudflare Quick Tunnel

Docker տեղակայումների համար կառավարման վահանակի աջակցությունը ներառում է մեկ սեղմումով **Cloudflare Quick Tunnel**՝ `Dashboard → Endpoints` բաժնում։ Առաջին միացման ժամանակ `cloudflared`-ը ներբեռնվում է միայն անհրաժեշտության դեպքում, գործարկվում է ժամանակավոր թունել դեպի ձեր ընթացիկ `/v1` վերջնակետը, իսկ գեներացված `https://*.trycloudflare.com/v1` URL-ը ցուցադրվում է անմիջապես ձեր սովորական հանրային URL-ի ներքևում։

Վերջնակետերի թունելների վահանակները (Cloudflare, Tailscale, ngrok) կարող են ցուցադրվել կամ թաքցվել `Settings → Appearance` բաժնից՝ առանց ակտիվ թունելի վիճակը փոխելու։

### Թունելի վերաբերյալ նշումներ

- Quick Tunnel-ի URL-ները ժամանակավոր են և փոխվում են յուրաքանչյուր վերագործարկումից հետո։
- Quick Tunnel-ներն ավտոմատ չեն վերականգնվում OmniRoute-ի կամ կոնտեյների վերագործարկումից հետո։ Անհրաժեշտության դեպքում կրկին միացրեք դրանք կառավարման վահանակից։
- Կառավարվող տեղադրումը ներկայում աջակցում է Linux, macOS և Windows համակարգերին՝ `x64` / `arm64` ճարտարապետություններով։
- Կառավարվող Quick Tunnel-ները լռելյայն օգտագործում են HTTP/2 փոխադրամիջոց՝ սահմանափակ կոնտեյներային միջավայրերում QUIC UDP բուֆերի աղմկոտ նախազգուշացումներից խուսափելու համար։ Սահմանեք `CLOUDFLARED_PROTOCOL=quic` կամ `auto`, եթե ցանկանում եք այլ փոխադրամիջոց։
- Docker պատկերները ներառում են համակարգային CA արմատային վկայագրերը և դրանք փոխանցում են կառավարվող `cloudflared`-ին, ինչը կանխում է TLS վստահության սխալները, երբ թունելը սկզբնաբեռնվում է կոնտեյների ներսում։
- Սահմանեք `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, եթե ցանկանում եք, որ OmniRoute-ն ներբեռնելու փոխարեն օգտագործի առկա գործարկելի ֆայլը։

## Պատկերների պիտակներ

| Պատկեր                   | Պիտակ    | Չափ    | Նկարագրություն                                                  |
| ------------------------ | -------- | ------ | --------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Ամենաբարձր **հրապարակված** կայուն SemVer-ը (ոչ թե git `main`-ը) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-ի համար ամրագրեք այս դասի պիտակը                         |

Բազմահարթակ մանիֆեստ՝ `linux/amd64` + `linux/arm64` բնիկ աջակցությամբ (Apple Silicon, AWS Graviton, Raspberry Pi)։ Docker-ն ավտոմատ ընտրում է համապատասխան ճարտարապետությունը։ Փոխանցեք `--platform linux/amd64`, եթե ARM հոսթերի վրա անհրաժեշտ է հարկադրաբար օգտագործել AMD64 էմուլյացիա։

### Թողարկման ալիքներ

OmniRoute-ը հրապարակում է Docker-ի առանձին ալիքներ՝ կայուն թողարկումների, թողարկման ակտիվ ճյուղի փորձարկումների և մշակման հավաքակազմերի համար։

| Ալիք                            | Աղբյուր                                  | Փոփոխելիություն               | Առաջարկվող օգտագործում                                                                                                                    |
| ------------------------------- | ---------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Ստորագրված/տարբերակավորված թողարկում     | Անփոփոխ                       | Արտադրական տեղակայումներ, որոնք ամրագրում են ճշգրիտ թողարկումը                                                                            |
| `:latest` / `:latest-web`       | Ամենաբարձր **հրապարակված** կայուն SemVer | Փոփոխելի կայուն ցուցիչ        | Հետևում է կայուն թողարկումներին SemVer հրապարակման առաջադրանքից **հետո**․ **չի** հետևում `main`-ին կամ չթողարկված `release/v*` կոմիթներին |
| `:next` / `:next-web`           | Ընթացիկ լռելյայն `release/v*` ճյուղ      | Փոփոխելի նախաթողարկման ցուցիչ | Փորձարկում է ուղղումները, որոնք ներառվել են թողարկման ակտիվ ճյուղում, բայց դեռ ներառված չեն կայուն թողարկման մեջ                          |
| `:main` / `:main-web`           | `main` ճյուղ                             | Փոփոխելի մշակման ցուցիչ       | Միայն մշակման և ինտեգրման փորձարկումների համար                                                                                            |

#### Վեբ աշխատաշրջանի մատակարարներ՝ `-web` պատկերները

Վերևի յուրաքանչյուր ալիք ունի նաև `-web` պիտակ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), որը կառուցված է `runner-web` փուլից՝ նույն պատկերը՝ Playwright-ի և Chromium դիտարկիչի հավելմամբ։ Սովորական պատկերը մատակարարվում է **առանց** Chromium-ի․ `gemini-web`-ին, `claude-web`-ին և `claude-turnstile`-ին այն անհրաժեշտ է։

Խափանումը տեղի է ունենում ոչ թե գործարկման պահին, այլ հետաձգված կերպով․ այդ մատակարարները ցուցակագրում են իրենց մոդելները և կառավարման վահանակում ցուցադրվում են որպես միացված, իսկ միայն առաջին հարցումն է ձախողվում հետևյալ հաղորդագրությամբ․

```
[500]: Չհաջողվեց բեռնել արտաքին playwright մոդուլը. Սխալ. Չհաջողվեց գտնել մոդուլը
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Եթե օգտագործում եք այդ մատակարարները, ներբեռնեք այն ալիքի `-web` պիտակը, որն արդեն օգտագործում եք․ այլ փոփոխություն անհրաժեշտ չէ։ npm/CLI տեղադրման դեպքում (առանց Docker պատկերի) համարժեք բացակայող բաղադրիչը դիտարկիչի գործարկելի ֆայլն է․ հոսթի վրա գործարկեք `npx playwright install chromium`։

#### Նախաթողարկման ալիքի օգտագործումը

`next` ալիքը վերակառուցվում է ընթացիկ լռելյայն `release/v*` ճյուղում յուրաքանչյուր push-ի ժամանակ և հրապարակվում է ինչպես AMD64-ի, այնպես էլ ARM64-ի համար։ Սպասարկման ավելի հին ճյուղերը չեն կարող վերագրել այն։ Ալիքը տրամադրում է ներբեռնման համար հասանելի image՝ այն շտկումների համար, որոնք միավորվել են ակտիվ թողարկման ճյուղում՝ մինչև հաջորդ կայուն tag-ի ստեղծումը։

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-ի դեպքում վերագրեք ընտրված profile-ի կողմից օգտագործվող image tag-ը, ապա ներբեռնեք և վերստեղծեք service-ը.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Անվտանգություն և հետադարձ վերականգնում

`next`-ը փոփոխական նախաթողարկման ալիք է։ Այն կարող է փոխվել ակտիվ թողարկման ճյուղում ցանկացած push-ի ժամանակ և **չի աջակցվում production-ում օգտագործման համար**։ Կոնկրետ build-ը գնահատելիս ամրագրեք image digest-ը.

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Թեստավորումից առաջ պահուստավորեք OmniRoute-ի data volume-ը կամ bind-mounted տվյալների պանակը։ Հետադարձ վերականգնման համար վերականգնեք նախկինում օգտագործված կայուն տարբերակը կամ digest-ը և վերստեղծեք container-ը.

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Թողարկման ճյուղի build-ը երբեք չի կարող տեղափոխել `latest`-ը. միայն պահանջներին համապատասխանող կայուն իմաստաբանական տարբերակը կարող է առաջ մղել կայուն ցուցիչը։ `next` image-ները պահպանում են թողարկման image-ի ստուգումը և արգելափակող CRITICAL խոցելիությունների վերահսկիչը։

**`latest`-ը չի երաշխավորում git-ի արդիականությունը։** `main`-ում կամ ակտիվ `release/v*` ճյուղում միավորված շտկումները **չեն** հայտնվում `:latest`-ում, մինչև կայուն SemVer image չհրապարակվի, և հրապարակման job-ը չառաջ մղի `:latest`-ը (նույն digest-ով, ինչ այդ SemVer-ը)։ Եթե `latest`-ը սառեցված է թվում, մինչդեռ GitHub-ում շտկումն արդեն ցուցադրվում է, ներբեռնեք `:next`-ը՝ թողարկման ճյուղը փորձարկելու համար, կամ սպասեք SemVer tag-ին։

| Ձեր նպատակը                                                                                     | Օգտագործեք                               |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| GitOps / production, որը չպետք է շեղվի                                                          | Ամրագրեք `:X.Y.Z`-ը (կամ image digest-ը) |
| Հետևել հրապարակված կայուն տարբերակներին և ընդունել յուրաքանչյուր թողարկման ժամանակ վերստեղծումը | `:latest`                                |
| Փորձարկել չթողարկված `release/v*` commit-ները                                                   | `:next` (ոչ production-ի համար)          |
| Փորձարկել `main`-ը                                                                              | `:main` (ոչ production-ի համար)          |

## Վահանակի թարմացումները Docker-ում

Հրապարակված պատկերից աշխատող կոնտեյները չի կարող ինքն իրեն փոխարինել։ Երբ OmniRoute-ը հայտնաբերում է, որ աշխատում է
կոնտեյների ներսում (`.git` checkout չկա, և դա npm տեղադրում չէ), գլխավոր վահանակի թարմացման ցուցապաստառը npm/git հրահանգների փոխարեն ցույց է տալիս
հոսթում գործարկվող հրամանը՝ պատճենման կոճակով․

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Ծառայության անունը վերցվում է `AUTO_UPDATE_SERVICE`-ից (լռելյայն՝ `omniroute`, այսինքն՝
`docker-compose.selfhost.yml`-ի ծառայությունը)։ `pull`-ը տեղափոխում է միայն փոփոխվող պիտակը (`latest`, `next`)․ ամրագրված
`:X.Y.Z` պիտակի դեպքում նախ խմբագրեք պիտակը։

### Մեկ սեղմումով թարմացումներ՝ հոսթի ազդանշանային ֆայլի միջոցով

Որպեսզի **Թարմացնել հիմա** գործառույթը շարունակի աշխատել առանց `/var/run/docker.sock`-ը մոնտաժելու (ինչը կոնտեյներին
հոսթում root հասանելիություն է տալիս. տե՛ս վերևում `cli` պրոֆիլի նախազգուշացումը), OmniRoute ծառայության համար սահմանեք `DOCKER_UPDATE_TRIGGER_FILE` և
հոսթում գործարկեք դիտարկիչ․

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Ուղին պետք է գտնվի `DATA_DIR`-ի ներսում (հարաբերական արժեքները հաշվարկվում են դրա նկատմամբ)․ մնացած ամեն ինչ
մերժվում է։ Այնուհետև **Թարմացնել հիմա** գործառույթն այդ ֆայլում գրում է `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`,
պատասխանում է `202`, իսկ վահանակը պարբերաբար հարցում է կատարում `/api/system/version` հասցեին, մինչև նոր տարբերակը գործարկվի,
և վերաբեռնվում է։ Այս ռեժիմում OmniRoute-ը երբեք չի գործարկում shell կամ Docker հրաման։ Ինչպես թարմացման յուրաքանչյուր
գործողության դեպքում, հարցումն ընդունվում է միայն loopback/LAN հաճախորդներից։

Bind-մոնտաժված տվյալների գրացուցակը հոսթին տալիս է դիտարկման կայուն ուղի։ `systemd` միավորների օրինակներ
(`/srv/omniroute`-ը փոխարինեք ձեր compose ֆայլը և `data/`-ն պարունակող գրացուցակով)․

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Հետևել OmniRoute վահանակից ստացվող թարմացման հարցումներին

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Ներբեռնել և վերաստեղծել OmniRoute կոնտեյները

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

Ծառայությունը հեռացնում է հարցումը նախքան պատկերը ներբեռնելը, որպեսզի անհաջող գործարկումը կրկնվող ցիկլ չառաջացնի։ Առանց
`DOCKER_UPDATE_TRIGGER_FILE`-ի վահանակը պահպանում է ձեռքով հրամանի հոսքը։

## Հասանելիություն. լռելյայն SQLite մեկ կրկնօրինակ է

Stock Docker / Kubernetes OmniRoute է** մեկ հանգույց գործընթաց + մեկ SQLite գրող** . Բարձր հասանելիություն է** չի աջակցվում** այդ տոպոլոգիայի վրա։

| Սահմանափակում                                      | Հետևանք                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Միայնակ գրող                                       | Արեք** ոչ** գործարկել մի քանի կրկնօրինակներ նույն SQLite ֆայլի դեմ: Դա ապականում է DB:                                                                                                                                                                                                                                                                |
| Վերստեղծել / վերագործարկել / HEALTHCHECK սպանել    | **Ամբողջական անջատում** թռիչքի ընթացքում SSE, վահանակի նիստերի և հիշողության վիճակի մասին: Յուրաքանչյուր միացված հաճախորդ ընկնում է: Դատարկ վերջնակետի պատուհանի ընթացքում նոր հարցումները ստանում են հակադարձ պրոքսի**`502 Bad Gateway: Unknown error`** , ոչ թե OmniRoute JSON — հաճախորդները չեն կարող դա տարբերել մատակարարի ձախողումից (#11015): |
| Նույն իրադարձությունների հանգույցը, ինչ `/healthz` | Զբաղված կատալոգը կամ սեղմման տիզը կարող է հետաձգել զոնդերը. կարճ ժամանակամիջոց, այնուհետև վերագործարկվում է** միայն** կրկնօրինակը:                                                                                                                                                                                                                    |

**Զոնդի մատրիցա** (տես նաև [Kubernetes հետազոտության առաջարկությունները](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Զոնդ               | Թիրախ                                                           | Մի օգտագործեք                                                                        |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Կենսունակություն   | TCP վրա `PORT` (կանխադրված `20128`), կամ փափուկ HTTP `/healthz` | `/api/monitoring/health`                                                             |
| Պատրաստակամություն | HTTP `GET /healthz`                                             | Խիստ ժամկետներ, որոնք իրադարձությունների հանգույցը զբաղված են համարում որպես մահացած |
| Խորը / մարդիկ      | `/api/monitoring/health`                                        | Ավտոմատացված կուբելետի աշխուժություն                                                 |

**Բարելավումներ:** ակնկալեք, որ յուրաքանչյուր նիստը կթուլանա: Հեռացրեք հաճախորդներին, եթե կարող եք; լռելյայն SQLite ում շարժական թարմացում չկա: Կազմել `restart: unless-stopped` գումարած Docker `HEALTHCHECK` նաև կփոխարինի միակ գործընթացին, երբ բեռնարկղը անառողջ է՝ նույն պայթյունի շառավիղը:

Պատրաստի մանիֆեստները և Helm աղյուսակը ապրում են `deploy/kubernetes/` և `deploy/helm/omniroute/`. տե՛ս [Kubernetes-ի տեղակայման ուղեցույցը](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md) :

Kubernetes հատված ա** մեկ կրկնօրինակ** (Պահանջվում է վերստեղծել. մի բարձրացրեք `replicas` մեկ SQLite ֆայլի դեմ):

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

`preStop` sleep-ը թույլ է տալիս kube-ին թողնել ծառայության վերջնակետերը SIGTERM ից առաջ** նոր** երթեւեկությունը դադարում է հարվածել մեռնող գործընթացին: Թռիչքի ընթացքում `/v1/responses` SSE ջրահեռացվում է մինչև `SHUTDOWN_TIMEOUT_MS` (կանխադրված 30-ականներ) ծանր քաշային ընդունելության վարձակալության միջոցով (#11015): Նոր հարցումները, որոնք դեռ հասնում են գործընթացին, ստանում են `503` + `Retry-After: 5`: Վերստեղծել դատարկ վերջնակետի բացը, մինչև փոխարինումը պատրաստ լինի, մնում է ծանր խափանում. դա SQLite տոպոլոգիան է, այլ ոչ թե զոնդի սխալ կազմաձևումը:

Արտաքին Postgres / բազմագիր HA է** ոչ** փաստաթղթավորված ֆոնդային ուղի: Եթե Ձեզ անհրաժեշտ է HA, պահեք մեկ կրկնօրինակ կամ գործարկեք այն տոպոլոգիան, որը նախագիծը փորձարկել և փաստաթղթավորել է առանձին: Postgres/MySQL աշխատությունը ապրում է [#8075-](https://github.com/diegosouzapw/OmniRoute/issues/8075) ում։ Մինչև այդ նավերը, բազմապատկելու միակ աջակցվող միջոցը** մեծ** `/v1/responses` հզորությունը N անկախ գործընթացներ է (հաջորդ բաժինը), ոչ թե `replicas > 1` մեկ հատորի վրա:

## Հորիզոնական մասշտաբավորում․ N անկախ պրոցես

Մեկ Node պրոցեսը **մեկ V8 heap** է։ Երկու համընկնող՝ ~3 MiB / ~750k-token ծավալով coding-agent-ի `POST /v1/responses` հարցումներ (RTK + Caveman) ընդհատում են այդ heap-ը մոտ ~12 Gi-ի դեպքում (`FATAL ERROR: Reached heap limit`) և կարող են առաջացնել OOM 16 Gi cgroup-ում։ Տե՛ս [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)։ Այդ չափումը **հիշողության բյուջեի** մասին նախազգուշացում է, այլ ոչ թե միաժամանակյա երկարատև `/v1/responses` հարցումների՝ արտադրանքի կողմից սահմանված առավելագույնը՝ երկու։ Ծանր chat հարցումների ընդունումը սահմանափակվում է ավտոմատ հաշվարկվող մուտքային բայթերի բյուջեով (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), որի չափը որոշվում է նույն V8/cgroup սահմանաչափից․ արդեն համապատասխան չափով կարգավորված պրոցեսում այն դեպի վեր վերասահմանելը (կամ հին `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`՝ հարցումների քանակի սահմանաչափը սահմանելը) կրկին հանգեցնում է ընդհատման։ Փոքր chat հարցումները, `/healthz`, `/v1/models` և MCP-ն այդ սահմանաչափի մեջ **չեն** մտնում։

### Մեկ պրոցես․ երկուսից ավելի երկարատև `/v1/responses`

**Առողջ** պրոցեսը (heap-ը ցածր է `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-ից, լռելյայն՝ `0.75`) **կարող է** միաժամանակ մշակել երկուսից ավելի երկարատև `POST /v1/responses` հարցումներ, երբ պրոցեսի մակարդակով ընթացքի մեջ գտնվող բայթերի բյուջեում (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) դեռ տեղ կա։ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`-ին հավասար կամ դրանից մեծ մարմինները (լռելյայն՝ 256 KiB) ստանում են նույն ծանրաբեռնվածության lease-ը, ինչ կառուցվածքային առումով ծանր հարցումները, և օգտագործում են նույն [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` շրջանցման մեխանիզմը (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`)։ Տասնյակ միաժամանակյա երկարատև SSE հաճախորդների սպասարկումը (օպերատորներին հաճախ անհրաժեշտ է 40–50) **հիշողության բյուջեի** հարց է՝ համապատասխան չափեր սահմանեք heap-ի, հիմնական/headroom slot-երի և `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`-ի համար, այլ ոչ թե արտադրանքի կոշտ «առավելագույնը 2» սահմանափակում։ Ծանրաբեռնված heap-ը շարունակում է մերժել հարցումները՝ վերադարձնելով կրկին փորձարկելի `503`, որպեսզի #7849-ը չկրկնվի։

Այսօր **heap-երի քանակը բազմապատկելու** համար (անկախ V8 old-space-եր)՝

| Արեք                                                                                                                                                                   | Մի արեք                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Գործարկեք **N container/pod**, յուրաքանչյուրն իր **սեփական** `DATA_DIR`-ով / volume-ով                                                                                 | Միևնույն SQLite file-ի համար մի սահմանեք `replicas > 1`            |
| Ծանր ընթացիկ հարցումների + առողջ headroom-ի չափը որոշեք heap-ի / ընթացիկ բայթերի բյուջեից․ 1–2-ը #7849-ի պահպանողական լռելյայնն է, ոչ թե արտադրանքի կոշտ առավելագույնը | Մեկ պրոցեսին մի տրամադրեք 8× RAM և քանակի անսահմանափակ սահմանաչափ  |
| Ըստ ցանկության՝ `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL`՝ **ընդհանուր quota հաշվիչների** համար                                                             | Redis-ը մի դիտարկեք որպես ընդհանուր SQLite․ այն այդպիսին չէ        |
| Պատճենեք մատակարարների գաղտնիքները յուրաքանչյուր instance-ում (կամ ընդունեք տարանջատված dashboard-երը)                                                                 | Մի ակնկալեք մեկ dashboard / մեկ call-log բոլոր instance-ների համար |
| Առջևում տեղադրեք ցանկացած load balancer․ API key-ի կամ session-ի հիման վրա sticky բաշխումը բավարար է                                                                   | Մի պահանջեք որևէ մատակարարին հատուկ՝ չափը հաշվի առնող middleware   |

Սարքավորում․ յուրաքանչյուր instance-ի միաժամանակյա երկարատև `/v1/responses` հարցումների քանակը **հիշողության բյուջեի** հարց է (heap + ընթացիկ բայթեր / #10110)։ Անկախ `DATA_DIR`-ներով `N` instance-ները միևնույն է բազմապատկում են heap-երը․ host-ի RAM-ը պետք է բավարարի `N × cgroup`-ի համար, ոչ թե «մեկ 16 Gi pod՝ N=8-ով»։ Երբեք մի օգտագործեք `replicas > 1` միևնույն SQLite file-ի համար։

Compose-ի ուրվագիր (երկու heap, երկու volume՝ ոչ թե `deploy.replicas: 2`)․

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

Ներպրոցեսային խտությունը (սեղմումը HTTP isolate-ից դուրս բերելը) նկարագրված է [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)-ում։ Ընդհանուր կայուն վիճակի վրա հիմնված մեկ տրամաբանական cluster-ը նկարագրված է [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ում։

## Gemini-ի տարածաշրջանային սխալները Docker-ի ներսում

Google AI Studio / Gemini API-ն կարող է վերադարձնել HTTP 400՝ FAILED_PRECONDITION կարգավիճակով և
`User location is not supported for the API use.` հաղորդագրությամբ։ Հոսթում հաջողված հարցումը
չի ապացուցում, որ կոնտեյներն օգտագործում է նույն ելքային երթուղին։ DNS-ի հերթականությունը,
IPv4/IPv6 կապակցելիությունը, VPN-ի երթուղավորումը և կազմաձևված պրոքսիները կարող են տարբերվել։ Ստուգեք
[Google-ի աջակցվող տարածաշրջանները](https://ai.google.dev/gemini-api/docs/available-regions),
ինչպես նաև կապի փաստացի երթուղին․ միայն այս սխալը չի նշանակում, որ API բանալին անվավեր է։

### Նախընտրեք տվյալ կապի համար նախատեսված պրոքսի

Ազդակիր Gemini կապի համար օգտագործեք OmniRoute-ի
[յուրաքանչյուր կապի համար պրոքսիի կազմաձևումը](../ops/PROXY_GUIDE.md#4-level-proxy-system),
այնուհետև կրկնեք **Test Connection**-ը և նույն մոդելով փոքր հարցում ուղարկեք։
Այսպես երթուղավորման փոփոխությունը սահմանափակվում է տվյալ կապով։ Համոզվեք, որ պրոքսին
հասանելի է կոնտեյներից, և որ կապն իսկապես ընտրում է այն։ Երթուղու փոփոխությունը չի
երաշխավորում վերին հոսքի տարածաշրջանային թույլատրելիությունը։

### Համեմատեք հոսթի և կոնտեյների ցանցային կարգավորումները

Նույնականացված արդյունքները համեմատելիս բանալին, մոդելը և հարցումը պահեք նույնը․ երբեք
խնդրի նկարագրության մեջ մի տեղադրեք հավատարմագրերը, պրոքսիի գաղտնաբառերը կամ լիարժեք նույնականացման վերնագրերը։
Նախ ստուգեք, թե օպերացիոն համակարգի լուծիչը հասցեների որ ընտանիքներն է առաջարկում՝ նույն հրամանը
գործարկելով հոսթում և կոնտեյների ներսում․

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute`-ը փոխարինեք ձեր գործարկած ծառայությամբ (օրինակ՝ `omniroute-web`)։ Այս
հրամաններն արտածում են հասցեների ընտանիքները՝ առանց հավատարմագրերի կամ IP հասցեների։ Վերադարձված `6`-ը
միայն ցույց է տալիս IPv6 DNS արդյունք․ այն **չի** ապացուցում կիրառելի IPv6 երթուղու կամ API հասանելիության առկայությունը։
Այն միջավայրերում, որտեղ տեղադրված է `curl`, համեմատեք
`curl -4 -I https://generativelanguage.googleapis.com`-ը
`curl -6 -I https://generativelanguage.googleapis.com`-ի հետ երկու միջավայրերում։
HTTP պատասխանը հաստատում է տվյալ ստուգման կապակցելիությունը, նույնիսկ եթե դա առանց նույնականացման
սխալ է․ Gemini-ի թույլատրելիությունը ստուգում է միայն նույնականացված մոդելի հարցումը։

### Հոսթի մակարդակի այլընտրանք․ աշխատող IPv6 և լուծիչի քաղաքականություն

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)-ի հեղինակը վերականգնել է
հասանելիությունն իր միջավայրում՝ միացնելով կոնտեյների IPv6-ը և փոխելով glibc-ի հասցեների
ընտրությունը։ Դիտարկեք սա որպես տվյալ միջավայրին հատուկ այլընտրանք։ Նախքան լուծիչի նախապատվությունները
փոխելը՝ համոզվեք, որ հոսթի IPv6-ը, կոնտեյների ելքային կապը/երթուղավորումը և firewall-ի կանոններն աշխատում են։
Մասնավոր ULA հասցեն ինքնին չի հաստատում հանրային IPv6 կապակցելիության առկայությունը։

Compose-ի լռելյայն ցանցին արդեն միացված ծառայությունների համար այս հատվածը միացնում է
IPv6-ը տվյալ ցանցում․ պահպանեք ձեր ծառայության, պորտերի, հատորների և կազմաձևման մնացած մասը․

```yaml
networks:
  default:
    enable_ipv6: true
```

Անվանակոչված ցանցի դեպքում այն միացրեք այն ցանցում, որին ծառայությունն իրականում միանում է։ Docker-ը կարող է
հատկացնել ULA ենթացանց․ բացահայտ, չհամընկնող ենթացանց ընտրեք միայն այն դեպքում, երբ դա պահանջում է ձեր ցանցը։
Տե՛ս [Docker-ի IPv6 ցանցային հնարավորությունները](https://docs.docker.com/engine/daemon/ipv6/)
և [Compose-ի ցանցային ընտրանքները](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)։

**glibc-ի վրա հիմնված պատկերի** դեպքում `/etc/gai.conf`-ը կարող է փոխել հասցեների ընտրությունը։ Ընթացիկ
ռեպոզիտորիայի Dockerfile-ն օգտագործում է Debian․ musl-ի վրա հիմնված անհատական պատկերները չեն օգտագործում այս մեխանիզմը։
Ներկայացված փոփոխությունը ULA պիտակը `label fc00::/7 6`-ից դարձնում է
`label fc00::/7 1`։ Սկսեք պատկերի քաղաքականությունների ամբողջական աղյուսակից և պահպանեք դրա մյուս
գրառումները․ `label` կամ `precedence` գրառում ավելացնելը փոխարինում է այդ լռելյայն աղյուսակը, ուստի միայն
փոփոխված տողը պարունակող ֆայլը բավարար չէ։
[glibc-ի կազմաձևման տեղեկատուն](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
փաստաթղթավորում է այդ վարքագիծը։ Ստուգված ֆայլը bind-mount եղանակով կցեք `/etc/gai.conf` ուղուն՝ միայն ընթերցման
ռեժիմով, և վերստեղծեք ծառայությունը՝ այն կիրառելու համար։

Սա փոխում է օպերացիոն համակարգի հասցեների ընտրությունը **տվյալ կոնտեյների ամբողջ ելքային տրաֆիկի համար**։
Այն չի ստիպում յուրաքանչյուր հավելվածի ընտրել IPv6․ Node-ի DNS հերթականությունը և կապի
ընտրությունը նույնպես նշանակություն ունեն։ Մասնավորապես, `--dns-result-order=ipv4first`-ը նախապատվություն է տալիս IPv4-ին և
IPv4-ին հատուկ խափանման լուծում չէ։ Տե՛ս [Node-ի DNS հերթականությունը](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)։

Հոսթի մակարդակի ցանկացած փոփոխությունից հետո կրկին ստուգեք Gemini-ն և ձեր մյուս մատակարարներին։ Հետ վերադարձնելու համար
հեռացրեք անհատական `gai.conf` կցումը, վերականգնեք նախորդ ցանցային կազմաձևումը և
տեխնիկական սպասարկման ժամանակահատվածում վերստեղծեք ազդակիր ծառայությունը/ցանցը։ Ցանցի վերստեղծումը
կարող է ընդհատել դրան միացված այլ կոնտեյներների աշխատանքը․ մի ջնջեք մշտական տվյալների հատորը։

## Կարևոր նշումներ

- **SQLite WAL ռեժիմ․** Պետք է թույլ տալ, որ `docker stop`-ն ավարտվի, որպեսզի OmniRoute-ը կարողանա վերջին փոփոխությունները checkpoint-ի միջոցով վերադարձնել `storage.sqlite`։ Ներառված Compose ֆայլերում արդեն սահմանված է դադարեցման համար 40 վրկ արտոնյալ ժամանակահատված։ Եթե image-ն ուղղակիորեն եք գործարկում, պահպանեք `--stop-timeout 40`։
- **`DISABLE_SQLITE_AUTO_BACKUP`․** Սահմանեք `true`, եթե պարբերական/գրումից առաջ կատարվող պահուստավորումները կառավարվում են արտաքին համակարգով։ Գոյություն ունեցող տվյալների բազայի միգրացիաների համար, այնուամենայնիվ, անհրաժեշտ է առանձին հուսալի անվտանգության snapshot և զանգվածային միգրացիաների պաշտպանիչ մեխանիզմ։
- **Տվյալների պահպանում․** Միշտ volume միացրեք `/app/data`-ին՝ container-ի վերագործարկումների միջև ձեր տվյալների բազան, բանալիները և կազմաձևումները պահպանելու համար։
- **Պորտի կազմաձևում․** Լռելյայն `20128` պորտը փոխելու համար վերագրեք `PORT` միջավայրի փոփոխականը։

## Տես նաև

- [VM-ում տեղակայման ուղեցույց](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare կարգավորում
- [Fly.io-ում տեղակայման ուղեցույց](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Տեղակայում Fly.io-ում
- [Միջավայրի կազմաձևում](../reference/ENVIRONMENT.md) — `.env`-ի ամբողջական տեղեկատու
