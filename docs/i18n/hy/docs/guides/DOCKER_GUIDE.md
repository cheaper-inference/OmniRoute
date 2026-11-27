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

## Արագ վազում

> **Ինքնահոսթ մեկ հրամանով?** Տե՛ս [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (հրապարակված պատկեր + Redis, միայն շրջադարձով, պրոֆիլի ընտրություն չկա): Ստորև բերված Quick Run-ը մեկ կոնտեյներով ուղի է այն օգտվողների համար, ովքեր արդեն աշխատում են Redis այլուր:

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Շրջակա միջավայրի ֆայլով

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

## Dockerfile փուլերը

Պահեստը առաքում է բազմաստիճան Dockerfile (`Dockerfile`): Բացահայտվում են չորս փուլեր. ընտրեք ճիշտ `target` ձեր օգտագործման դեպքում:

| Բեմ           | Հիմնական պատկեր       | Նպատակը                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Տեղադրում է deps (`npm ci --legacy-peer-deps`) և գործարկում `npm run build` (Turbopack լռելյայն — տե՛ս Build-time ռեսուրսները ստորև)                                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Արտադրության գործարկման ժամանակը Next.js ինքնուրույն ելքով:** Ոչ մի մատակարար CLIs փաթեթավորված չէ:**                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | Ավելացնում է `git`, `docker.io`, `docker-compose` և գլոբալ CLIs՝ `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`:** Ընտրեք սա գործակալական աշխատանքային հոսքերի համար:**                                                                                                       |
| `runner-web`  | `runner-base`         | Ավելացնում է Playwright + Chromium զննարկիչը (`--with-deps`) վեբ նիստերի մատակարարների համար՝ `gemini-web`, `claude-web`, `claude-turnstile`:** Ընտրեք սա, երբ օգտագործում եք այդ մատակարարները** — պարզ պատկերը ձախողվում է հարցման ժամանակ առանց դրա (տես `-web` նշումը Release Channels-ում): |

Ձեռքով կառուցեք կոնկրետ թիրախ.

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ստեղծման ժամանակի ռեսուրսներ

Երեք կառուցման արկեր վերահսկում են `builder` փուլի արժեքը: Դրանք կառուցման ժամանակ են միայն — `OMNIROUTE_MEMORY_MB` (ներքևում) առանձին, գործարկման ժամանակի գլխիկ է:

| Կառուցել արգ                | Կանխադրված | Էֆեկտ                                                                                                        |
| --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` կառուցվում է վեբ փաթեթով. ավելի ցածր գագաթնակետային հիշողություն, ավելի դանդաղ: `1` ընտրում է Turbopack: |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | V8 կույտային առաստաղ (`--max-old-space-size`) ձվադրված `next build` համար:                                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | Սնուցում է `CIRCLE_NODE_TOTAL`; Հաջորդը բխում է `workers = N - 1` էջ-տվյալների հավաքագրման համար:            |

`OMNIROUTE_BUILD_WORKERS` այն մեկն է, ով պետք է բարձրաձայնի մեծ շինարարի վրա, և նա, ով կասկածում է, երբ կաշկանդված կառույցը մահանում է** հետո** `✓ Compiled successfully`. Էջերի տվյալների յուրաքանչյուր աշխատող իր սեփական գործընթացն է, ինչպես նաև մայր `next build` ն: կենդանի VPS վերարտադրումը (թողարկում #7518) չափեց յուրաքանչյուր գործընթացի գագաթնակետը RSS ~ 4,5 GB անկախ `NODE_OPTIONS` կույտային դրոշակից (Turbopack հավաքվում է native/Rust հիշողության մեջ V8 կույտից դուրս): `2` ի լռելյայն (→ 1 աշխատող, ընդհանուր 2 պրոցես) չափված է 16 GB / 4 vCPU GitHub հոսթինգով աշխատող վազորդների համար, որոնք օգտագործում է հրապարակման խողովակաշարը: `8` ում (→ 7 աշխատողներ) այդ վազորդի հիշողությունը սպառվեց և buildkit-ը ձախողեց քայլը `ResourceExhausted: ... cannot allocate memory` ով; `3` (→ 2 աշխատող) դեռևս չէր տեղավորվում, երբ յուրաքանչյուր գործընթացի համար RSS ուղղակիորեն չափվեց՝ եզրակացության փոխարեն: `tests/unit/docker-build-memory-budget.test.ts` կատարում է թվաբանությունը չափված թվի համեմատ և ձախողվում է, եթե որևէ կոճակը գերազանցում է վազողին:

Turbopack կազմում է հայրենի Rust հիշողության մեջ, որը ապրում է** դրսում** V8 կույտը, ուստի `OMNIROUTE_BUILD_MEMORY_MB` այն չի կապում: Հիշողության առաստաղ ունեցող հոսթի վրա կառուցումն այնուհետև SIGKILLed է OOM սպանիչի կողմից, առանց սխալի տեքստի, — այն պարզապես կանգ է առնում mid-`Creating an optimized production build` մեջ, որը կարդում է որպես կախել, այլ ոչ թե հիշողությունից դուրս: Ահա թե ինչու `Dockerfile` լռելյայն դնում է webpack-ի (`OMNIROUTE_USE_TURBOPACK=0`), ի տարբերություն `npm run dev` / `npm run build`, որտեղ Turbopack լռելյայն ծածկագիրն է. մերկ `docker build .` առանց build args (այն, ինչ Railway-ը և այլ մեկ սեղմումով հոսթեր են աշխատում) չպետք է լուռ մեռնի հիշողությամբ ծածկված շինարարի վրա: Հրապարակված պատկերներն արդեն `OMNIROUTE_USE_TURBOPACK=0` ում հստակ անցնում են `docker-publish.yml` ում: Շատ RAM ունեցող շինարարի դեպքում ընտրեք Turbopack ՝ ավելի արագ կառուցելու համար.

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` միացված է, ուստի `next build` գործարկում է ծնողը** և** աշխատանքային գործընթաց և յուրաքանչյուրը հարգում է `OMNIROUTE_BUILD_MEMORY_MB` առանձին: Կոնտեյների առաստաղը չափեք այդ արժեքից մոտավորապես երկու անգամ, ոչ թե մեկ անգամ:

Չափված այս ծառի վրա (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Բունդլեր  | Բեռնարկղային առաստաղ | Արդյունք                                  |
| --------- | -------------------- | ----------------------------------------- |
| Turbopack | 8 GiB / 16 GiB       | OOM-ը երկուսում էլ լուռ սպանվեց           |
| վեբ փաթեթ | 8 GiB                | կառուցել բանվոր SIGKILLed                 |
| վեբ փաթեթ | 12 GiB               | հաջողվել է, հասել է 11,1 GiB գագաթնակետին |

### Runtime կանխադրվածները

Լռելյայն արտահանված `runner-base` ի կողմից՝ `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`:

Հիշողության վարքագիծը Docker ում.

- Պատկերը սահմանում է `OMNIROUTE_MEMORY_MB=1024` և դրանից բխում է `NODE_OPTIONS=--max-old-space-size=1024` :
- Սերվերի իրական գործընթացը սկսվում է ինքնուրույն գործարկիչով, որը կարդում է `OMNIROUTE_MEMORY_MB` և ավելացնում `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`:
- Node-ն օգտագործում է `--max-old-space-size` վերջին կրկնվող արժեքը, ուստի `OMNIROUTE_MEMORY_MB` կարգավորումը վերահսկում է Docker կույտի արդյունավետ սահմանը:
- Քանի որ պատկերը միշտ սահմանում է այն, գործարկիչի սեփական RAM-ով չափորոշված հետադարձ կապը երբեք չի կիրառվում Docker ներքո: Հստակորեն բարձրացրեք այն ծանրաբեռնվածության համար (ստորև բերված աղյուսակը): `2048` դեռ շատ փոքր է կոդավորման գործակալ `/v1/responses` համար:

### Runtime RAM կոդավորման գործակալների համար

1 GiB Docker կանխադրվածը dashboard/light-chat հատակն է, ոչ թե արտադրության չափը: Երկար `POST /v1/responses` մարմինները (հարյուրավոր հաղորդագրություններ, տասնյակ գործիքներ) սեղմման ընթացքում պահպանում են բազմաթիվ հիշողության գրաֆիկներ: Երկու համընկնվող ~ 3 MiB / ~ 750k-token հարցումները ընդհատվել են V8-ում** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) և նաև հարվածել է 16 GiB cgroup OOM: Տես [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Չափը** cgroup `--memory` կույտից վեր** — բնիկ բուֆերները, SQLite և սեղմման միջանկյալները գտնվում են V8-ից դուրս:

| Աշխատանքային ծանրաբեռնվածություն            | `OMNIROUTE_MEMORY_MB`     | Կոնտեյներ / cgroup            | Նշումներ                                                                                                             |
| ------------------------------------------- | ------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Վահանակ, մեկ թեթև զրույց                    | `1024` (պատկերի լռելյայն) | ≥2 GiB                        |                                                                                                                      |
| Մեկ կոդավորման գործակալ (Claude/Codex/Grok) | `8192`                    | ≥10 GiB                       | Տիպիկ մեկ նստաշրջանի `/v1/responses`                                                                                 |
| Երկու միաժամանակյա երկար `/v1/responses`    | `10240`–`12288`           | ≥12–16 GiB                    | Չափված V8 ընդհատում ~ 12 GiB կույտում                                                                                |
| Երեք + միաժամանակյա երկար համատեքստեր       | մի գործընթացի վրա         | սերիականացնել / ավելի շատ RAM | Ծանր քաշի կանխադրված ընդունելությունը 1 թռիչքի ընթացքում է; բարձրացնելով այն առանց RAM նորից ներմուծում է ընդհատումը |

`omniroute serve` մերկ մետաղի վրա չափորոշում է ~ 35%-ը RAM (սեղմված `[512, 4096]`) երբ `OMNIROUTE_MEMORY_MB` է** չկարգավորված** . Docker միշտ սահմանում է `1024`, որպեսզի չափաբերումը երբեք չաշխատի պաշտոնական պատկերով:

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## Հակադարձ վստահված անձ ենթուղու վրա (Traefik / nginx)

Next.js `basePath` կազմված է առանձին փաթեթի մեջ: OmniRoute գրանցում է թխված արժեքը պահակային ֆայլում հավելվածի արմատում (գրված է `npm run build` ժամանակ, կարդացվում է `scripts/docker/ensure-docker-base-path.mjs` կողմից) և այն համեմատում է `OMNIROUTE_BASE_PATH` հետ, երբ բեռնարկղը մեկնարկում է: Երբ դրանք տարբերվում են, և պատկերը ստեղծվել է տիրույթի արմատի համար, մուտքի կետը վերագրում է ինքնուրույն մանիֆեստները, ներկառուցված `basePath`/`assetPrefix` բառացիները (Հաջորդ 16-ը ներկայացնում է SSR ակտիվը URLs ից `assetPrefix` ից միայն — patcher-ը արտացոլում է ենթաուղին դրա մեջ), թխված `/_next/static` ակտիվը URLs (հաճախորդը, ներմուծված մեդիա, ներմուծված մեդիա) հաճախորդ `process.env` shim `node dev/run-standalone.mjs` գործարկումից առաջ:

### Կազմել կառուցվածքը (խորհուրդ է տրվում)

Սահմանեք երկու փոփոխականները `.env` ում, այնուհետև վերակառուցեք, որպեսզի պատկերն ու գործարկման ժամանակը համաձայնեն.

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` ներկայացնում է `OMNIROUTE_BASE_PATH` որպես Docker build-arg և որպես գործարկման միջավայրի փոփոխական:

### Նախապես կառուցված արմատային պատկեր + գործարկման ժամանակի ենթուղի

Հրապարակված `cheaperinference/omniroute:*` պատկերները կառուցված են տիրույթի արմատի համար: Դուք դեռ կարող եք `OMNIROUTE_BASE_PATH` սահմանել գործարկման ժամանակ; բեռնարկղը կարկատում է փաթեթը մեկ անգամ գործարկման ժամանակ: Զուգակցել այն համապատասխան հանրային ծագման հետ.

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Կազմաձևեք հակադարձ պրոքսիը՝ փոխանցելու համար** լիքը** արտաքին ուղի (մի հանեք նախածանցը): Traefik-ը պետք է `PathPrefix(`/omniroute `)` ուղղի դեպի կոնտեյներ առանց `StripPrefix`, այնպես որ Next.js ստանում է `/omniroute/...` և սպասարկում է ակտիվները `/omniroute/_next/...` ից:

Docker առողջության ստուգումը ուսումնասիրում է թեթև `/healthz` կյանքի ցիկլի վերջնակետը, որը նախածանցով ակտիվ `OMNIROUTE_BASE_PATH` է: `/api/monitoring/health` մնում է հասանելի human/dashboard ախտորոշման համար. բեռնարկղը HEALTHCHECK ետ ուղղելու համար (օրինակ՝ խորը առողջության պահպանման համար), սահմանեք `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`: Այդ ճանապարհը ա** խոր** ստուգեք (DB + մոնիտորինգի ամփոփում) — հարմար է Docker ի հազվադեպ `HEALTHCHECK` համար, եթե նորից միացնեք, բայց** ոչ** Kubernetes `livenessProbe` ընդմիջումների համար:

Նվագավորների համար (Kubernetes, Nomad և այլն):

| Զոնդ               | Նախընտրել                                                                   | Խուսափեք                                                                             |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Կենսունակություն   | HTTP `GET /livez` կամ TCP հիմնական նավահանգստում (`PORT`, լռելյայն `20128`) | `/api/monitoring/health` որպես կենդանիություն                                        |
| Պատրաստակամություն | HTTP `GET /healthz`                                                         | Խիստ ժամկետներ, որոնք իրադարձությունների հանգույցը զբաղված են համարում որպես մահացած |
| Խորը / սև արկղ     | `/api/monitoring/health`                                                    | —                                                                                    |

`/healthz` հաղորդում է գործընթացի կյանքի ցիկլը (`ok` / `starting` / `stopping`): `/livez` ն միայն գործընթաց է (200, երբ կառավարիչը կարող է աշխատել, այն չի սպասում պատրաստության): Երկուսն էլ դեռ աշխատում են նույն հանգույցի իրադարձությունների հանգույցով, որպես հարցումների մշակում, այնպես որ CPU-ով կապված կատալոգը կամ սեղմման աշխատանքը կարող է հետաձգել դրանք — զբաղված ≠ մեռած: Նախընտրեք TCP աշխուժությունը, եթե HTTP զոնդերի ժամանակն ավարտվի: Զննման ամբողջական ուղեցույց. [Մոնիտորինգի ուղեցույց — Kubernetes զոնդի առաջարկություններ](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) :

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute կարող է ապահով կերպով բացահայտվել՝ օգտագործելով Caddy-ի ավտոմատ SSL ապահովումը: Համոզվեք, որ ձեր տիրույթի DNS A գրառումը ցույց է տալիս ձեր սերվերի IP:

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

Caddy-ն սահմանում է ստանդարտ վերահասցեավորման վերնագրերը վերին հոսքի կոնտեյների համար: OmniRoute օգտագործում է `NEXT_PUBLIC_BASE_URL` որպես կանոնական հանրային սկզբնաղբյուր OAuth հետադարձ զանգերի և գեներացված հանրային հղումների համար. վավերացված վահանակի գրությունները՝ օգտագործեք նույն ծագման հարցումները, գումարած նիստի հետ կապված CSRF պաշտպանությունը: Միացրեք `OMNIROUTE_TRUST_PROXY` միայն առաջադեմ տեղակայումների համար, որտեղ դուք միտումնավոր ցանկանում եք, որ OmniRoute ստանա հանրային ծագումը վստահելի փոխանցված վերնագրերից՝ հստակ կազմաձևման փոխարեն:

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

## Պատկերի պիտակներ

| Պատկեր                       | Նշել     | Չափը     | Նկարագրություն                                           |
| ---------------------------- | -------- | -------- | -------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 ՄԲ | Ամենաբարձր** հրապարակված** կայուն SemVer (ոչ git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 ՄԲ | Ամրացրեք այս դասի պիտակը GitOps համար                    |

Նույն պատկերները հրապարակվում Docker `ghcr.io/cheaper-inference/omniroute` պահոցներում `cheaperinference/omniroute` ըստ ճարտարապետության նույն `diegosouzapw/omniroute`. Գոյություն ունեցող `diegosouzapw/omniroute` տեղակայումները շարունակում են թարմացվել; պատկերի անվան փոխարկումը պարտադիր չէ: Ներքևում գտնվող `:next` / `:next-web` նախնական թողարկման ալիքը հրապարակված է միայն `diegosouzapw/omniroute` և GHCR համար:

Բազմպլատֆորմային մանիֆեստ՝ `linux/amd64` + `linux/arm64` բնիկ (Apple Silicon, AWS Graviton, Raspberry Pi): Docker ավտոմատ կերպով ընտրում է համապատասխան ճարտարապետությունը. անցեք `--platform linux/amd64` եթե Ձեզ անհրաժեշտ է AMD64 էմուլյացիա ստիպել ARM հոսթինգներին:

### Թողարկման ալիքներ

OmniRoute հրապարակում է առանձին Docker ալիքներ կայուն թողարկումների, թողարկման ճյուղերի ակտիվ թեստավորման և զարգացման կառուցումների համար:

| Ալիք                            | Աղբյուր                                    | Փոփոխականություն                    | Առաջարկվող օգտագործումը                                                                                                              |
| ------------------------------- | ------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Signed/versioned թողարկում                 | Անփոփոխելի                          | Արտադրական տեղակայումներ, որոնք ամրացնում են ճշգրիտ թողարկումը                                                                       |
| `:latest` / `:latest-web`       | Ամենաբարձր** հրապարակված** կայուն SemVer   | Փոփոխական կայուն ցուցիչ             | Հետևում է կայուն թողարկումներին** հետո** a SemVer հրատարակել աշխատանք — անում** ոչ** հետեւել `main` կամ չհրապարակված `release/v*` ին |
| `:next` / `:next-web`           | Ներկայիս լռելյայն `release/v*` մասնաճյուղը | Փոփոխական նախնական թողարկման ցուցիչ | Փորձարկման ուղղումներ, որոնք հայտնվել են ակտիվ թողարկման ճյուղում, բայց դեռ կայուն թողարկման մեջ չեն                                 |
| `:main` / `:main-web`           | `main` մասնաճյուղ                          | Փոփոխական զարգացման ցուցիչ          | Միայն զարգացման և ինտեգրման թեստավորում                                                                                              |

#### Վեբ նիստերի մատակարարներ. `-web` պատկերներ

Վերևում գտնվող յուրաքանչյուր ալիք կրկնապատկվում է որպես `-web` թեգ (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), որը կառուցված է `runner-web` փուլից — նույն պատկերը գումարած Playwright և Chromium դիտարկիչը: Պարզ պատկերը առաքվում է** առանց** Chromium; `gemini-web`, `claude-web` և `claude-turnstile` դրա կարիքն ունեն։

Խափանումը հետաձգվում է, ոչ թե գործարկման ժամանակ. այդ մատակարարները թվարկում են իրենց մոդելները և ցուցադրում որպես միացված վահանակում, և միայն առաջին հարցումն է ձախողվում:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Եթե դուք օգտագործում եք այդ պրովայդերները, քաշեք `-web` թեգը այն ալիքի, որը դուք արդեն — ում եք, այլ բան չի փոխվում: npm/CLI տեղադրման ժամանակ (առանց Docker պատկերի), պակասող համարժեք հատվածը բրաուզերի երկուական տարբերակն է՝ գործարկել `npx playwright install chromium` հոսթի վրա:

#### Օգտագործելով նախնական թողարկումը

`next` ալիքը վերակառուցվում է ընթացիկ լռելյայն `release/v*` ճյուղի յուրաքանչյուր սեղմումով և հրապարակվում է ինչպես AMD64 այնպես էլ ARM64 համար: Ավելի հին սպասարկման մասնաճյուղերը չեն կարող վերագրանցել այն: Ալիքը տրամադրում է ձգվող պատկեր այն ուղղումների համար, որոնք միաձուլվել են ակտիվ թողարկման ճյուղի մեջ՝ նախքան հաջորդ կայուն պիտակը կտրելը:

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-ի համար անտեսեք ընտրված պրոֆիլի օգտագործած պատկերի պիտակը, այնուհետև քաշեք և վերստեղծեք ծառայությունը.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Անվտանգություն և վերադարձ

`next` լողացող նախնական թողարկում ալիք է: Այն կարող է փոխվել ցանկացած սեղմումով դեպի ակտիվ թողարկման ճյուղ և կա** չի ապահովվում արտադրական օգտագործման համար** . Ամրացրեք պատկերի ամփոփումը կոնկրետ կառուցվածքը գնահատելիս.

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Փորձարկումից առաջ կրկնօրինակեք OmniRoute տվյալների ծավալը կամ կապի վրա տեղադրված տվյալների գրացուցակը: Հետ գլորելու համար վերականգնեք նախկինում օգտագործված կայուն տարբերակը կամ մարսեք և վերստեղծեք կոնտեյները.

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Ազատման ճյուղի կառուցվածքը երբեք չի կարող շարժել `latest`; միայն համապատասխան կայուն իմաստային տարբերակը կարող է խթանել կայուն ցուցիչը: `next` պատկերները պահպանում են թողարկման պատկերի ստուգումը և արգելափակում են ԿՐԻՏԻԿԱԿԱՆ խոցելիության դարպասը:

**`latest` արժութային երաշխիք չէ git-ի համար:** `main` կամ ակտիվ `release/v*` ճյուղի վրա միաձուլված ամրացումներն են** ոչ** `:latest` ում, մինչև չհրապարակվի կայուն SemVer պատկերը, և հրապարակման աշխատանքը խթանի `:latest` (նույնը, ինչ որ SemVer): Եթե `latest` սառեցված տեսք ունի, մինչդեռ GitHub արդեն ցույց է տալիս ուղղումը, քաշեք `:next` ՝ փորձարկելու թողարկման ճյուղը կամ սպասեք SemVer պիտակին:

| Դուք ցանկանում եք                                                                 | Օգտագործեք                          |
| --------------------------------------------------------------------------------- | ----------------------------------- |
| GitOps / արտադրություն, որը չպետք է շեղվի                                         | Pin `:X.Y.Z` (կամ պատկերի ամփոփում) |
| Հետևեք հրապարակված ախոռներին և ընդունեք վերստեղծում յուրաքանչյուր թողարկման համար | `:latest`                           |
| Չհրապարակված `release/v*` ի փորձարկումները                                        | `:next` (ոչ արտադրություն)          |
| Փորձարկել `main`                                                                  | `:main` (ոչ արտադրություն)          |

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

## Scale out: N անկախ գործընթացներ

### Codex նշան ռոտացիայի սեփականություն

Մեկ Codex հաշվի պատճենները չպետք է ինքնուրույն օգտագործեն դրա մեկանգամյա օգտագործման թարմացման նշանը: Այն դեպքերում, որոնք սպառում են միայն համաժամեցված հավատարմագրերը, սահմանեք `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (անունը `cx`): Թողեք այն չկարգավորված մեկ ռոտացիայի սեփականատիրոջ վրա: Յուրաքանչյուր գործընթաց դեռ կարիք ունի իր սեփական `DATA_DIR`. այս տարբերակը ոչ կիսում է SQLite, ոչ էլ տրամադրում է նշանների համաժամացման կամ բաշխված կողպեք:

Պասիվ օրինակը վերընթերցում է կապը, երբ թարմացում է անհրաժեշտ և ընդունում է միայն այլ, չսպառված մուտքի նշան: Հակառակ դեպքում թարմացումն անջատված է առանց կապի ժամկետը լրանալու կամ անջատելու կամ թարմացման անջատիչի ձախողումը հաշվելու: Նույնականացման իրական ձախողումները դեռ օգտագործում են նորմալ ձախողումների հաշվառում, էքսպոնենցիալ սառեցում և հաճախորդի սովորական սխալ; հաշվի ապաակտիվացումը մնում է մշտական: Սինքրոնացրեք սեփականատիրոջ պտտվող թոքենները նախքան մուտքի նշանների ժամկետի ավարտը (կանխադրված ակտիվ թարմացման առաջատարը հինգ րոպե է), կամ նորից ներմուծեք Codex auth ֆայլը: Պասիվ ներմուծումները պահում են մատակարարված նշանները՝ առանց դրանք վավերացնելու նշանի վերջնակետում: Ձեռնարկ dashboard/API թարմացումը վերադարձնում է `409 refresh_disabled`; նոր OAuth մուտքերն անփոփոխ են: Տես [շրջակա միջավայրի հղումը](../reference/ENVIRONMENT.md#passive-codex-token-refresh) :

Մեկ հանգույցի գործընթացն է** մեկ V8 կույտ** . Երկու համընկնող ~ 3 MiB / ~ 750k-token կոդավորման գործակալ `POST /v1/responses` (RTK + Caveman) դադարեցնում են այդ կույտը ~ 12 Gi (`FATAL ERROR: Reached heap limit`) և կարող են OOM a 16 Gi cgroup-ը: Տես [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) : Այդ չափումը ա** հիշողություն-բյուջե** նախազգուշացում, ոչ թե երկու միաժամանակյա երկար `/v1/responses` ի արտադրանք: Ծանր քաշային զրույցի ընդունումը սահմանափակվում է ավտոմատ կերպով ստացված ներծծվող բայթ բյուջեով (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`)՝ չափված նույն V8/cgroup առաստաղից — որը վեր է վերևում (կամ սահմանելով ժառանգված `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` հարցումների քանակի սահմանաչափը) արդեն մեծ չափի գործընթացի վրա նորից ներմուծում է ընդհատումը: Փոքր չաթեր, `/healthz`, `/v1/models`, MCP են** ոչ** այդ գլխարկով:

### Մեկ գործընթաց. ավելի քան երկու երկար `/v1/responses`

Ա** առողջ** գործընթաց (կույտ `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ից ցածր, լռելյայն `0.75`)** մայիս** գործարկել ավելի քան երկու միաժամանակ երկար `POST /v1/responses` երբ ամբողջ գործընթացի վրա թռիչքային բայթ բյուջեն (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) դեռ տեղ ունի: `OMNIROUTE_CHAT_LARGE_BODY_BYTES` կամ ավելի բարձր մարմինները (կանխադրված 256 KiB) վերցնում են նույն ծանր քաշային վարձակալությունը, ինչպես կառուցվածքի ծանր պահանջները և օգտագործում են նույն [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`): Մի քանի տասնյակ միաժամանակ երկար SSE հաճախորդներ (օպերատորներին հաճախ անհրաժեշտ է 40–50) ա** հիշողություն-բյուջե** Հարց — չափի կույտ + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ոչ կոշտ «առավելագույնը 2» արտադրանքի սահմանաչափ: Ճնշված կույտը դեռ թափվում է նորից փորձարկվող `503` ով, որպեսզի #7849-ը չվերադառնա:

Դեպի** բազմապատկել կույտերը** (անկախ V8 հին տարածքներ)** այսօր** :

| Արեք                                                                                                                                                       | Մի՛                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Վազիր** Ն containers/pods** , յուրաքանչյուրն իր հետ** սեփական** `DATA_DIR` / ծավալ                                                                         | Սահմանեք `replicas > 1` մեկ SQLite ֆայլի դեմ                    |
| Չափը ծանր թռիչքի ընթացքում + առողջ-գլխի տարածք կույտից / թռիչքային բայթ բյուջեից; 1–2-ը պահպանողական #7849 լռելյայն է, ոչ թե կոշտ արտադրանքի առավելագույնը | Մեկ գործընթացին տվեք 8 × RAM և անսահմանափակ քանակի գլխարկ       |
| Լրացուցիչ՝ `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` համար** ընդհանուր քվոտա հաշվիչներ**                                                        | Redis վերաբերվեք այնպես, ինչպես ընդհանուր SQLite — դա այդպես չէ |
| Կրկնօրինակեք մատակարարի գաղտնիքները յուրաքանչյուր օրինակում (կամ ընդունեք բաժանված վահանակները)                                                            | Ակնկալեք մեկ վահանակ / մեկ զանգի գրանցամատյան տարբեր դեպքերում  |
| Առջևի ցանկացած բեռի հավասարակշռողով; կպչուն API ստեղնով կամ նիստին բավական է                                                                               | Պահանջվում է վաճառողին հատուկ չափի տեղյակ միջին ծրագիր          |

Աշխատաշրջան-հաշվի հարաբերակցությունը կարող է նաև կիսվել Redis միջոցով. սահմանել `OMNIROUTE_SESSION_AFFINITY_STORE=redis` և `REDIS_URL` յուրաքանչյուր գործընթացի վրա՝ նույն `REDIS_KEY_PREFIX` և դրական `sessionAffinityTtlMs` պարամետրով: PIN-ները լուծում են հաշված օգտագործման հաշվի նույնականացումները յուրաքանչյուր գործընթացի իրավասու տեղական կապի համար, այնպես որ OAuth հաշիվները համապատասխան նույնականացման մետատվյալներով չպետք է ունենան համապատասխան կապ IDs: Հաշիվների հայտնի նույնականացումները գերակայություն ունեն հակասական տեղական IDs նկատմամբ փին-լուծման և հսկվող վտարման մեջ. առանց ինքնության գրառումները (կամ վտարման զանգահարողներն առանց ինքնության) պահպանում են ժառանգական ID պահակը: Առանց օգտագործման կայուն նույնականացման հաշիվները դեռ պահանջում են համապատասխան IDs: Redis սխալները կամ 100 ms-ից ավելի զանգերը վերադառնում են տեղական SQLite ին: Յուրաքանչյուր Redis affinity խանութ սահմանում է չմարված գործառնությունները 8-ով, շրջանցում է Redis անմիջապես, երբ լցված է, և բացում է սլոտները միայն այն ժամանակ, երբ հիմքում ընկած աշխատանքը ավարտվում է, այլ ոչ թե զանգահարողի վերջնաժամկետը: Redis խափանումների ժամանակ չկա ընդհանուր ճշմարտություն. յուրաքանչյուր օրինակ վերադառնում է իր տեղական հարաբերակցությանը, նիստերը կարող են նորից ամրացնել յուրաքանչյուր օրինակում մեկ անգամ, և օրինակները կարող են տարբերվել: Կպչունությունը կրկին համախմբվում է Redis միջոցով, երբ այն վերականգնվում է: Ժամկետը սահմանում է սպասելը, այլ ոչ թե ուղարկված EVAL, որը կարող է վայրէջք կատարել հետադարձից հետո: Routing-ի գրությունները համեմատում են երթուղային որոշմամբ դիտարկվող ճշգրիտ արժեքը, այլ ոչ թե թարմ մուտացիայի ժամանակի ընթերցումը. Դիտարկված բացթողումը կամ SQLite հետադարձ դիտարկումը համեմատվում է որպես բացակայող Redis բանալի: Հնացած փիները փոխարինվում են մեկ CAS ով, ուստի ուշ հրամանը չի կարող փոխարինել կամ ջնջել ավելի նոր, տարբեր փին: Redis կարդում է ատոմային կերպով վերադարձնել արժեքը և մնացած սերվերը TTL; դրական PTTL (կամ ժամկետի բացակայությունը) որոշում է աշխուժությունը, ոչ թե գրողի JSON ժամացույցը կամ ընթերցողի ժամացույցը: Տեղական պատկերները քարտեզագրում են, որ մնում է տեղական TTL. գոյություն ունեցող JSON ստեղները մնում են ընթեռնելի, և դրանց չմշակված բայթերը պահվում են CAS համար: Redis ճշմարտության միակ աղբյուրն է, մինչդեռ այն պատասխանում է: Հաստատված համօգտագործվող վերնագրերը, հպումները և ջնջումները հեռացնում են տեղական մուտքը, երբեք մի տեղադրեք կամ թարմացրեք այն: SQLite Redis ուղու վրա պահում է միայն այս օրինակի սեփական հետադարձ որոշումները Redis սխալներից, ժամանակի դադարեցումից կամ ընդունելության հագեցվածությունից, TTL-ով սահմանափակված, ինչպես նախկինում: Ավելի ուշ անջատման դեպքում բացակայող տեղային կապը արժե մեկ թարմ ընտրություն (մեկ հուշում-քեշի բաց թողնված), այլ ոչ թե սխալ կամ վտարված հաշիվ: Մերժված վերնագրերը ատոմային կերպով վերադարձնում են ընդհանուր հաղթողին և նրա մնացած TTL. սովորական ընտրությունը վերստուգում է քարտեզագրված տեղական վերջնաժամկետը և օգտագործում է դեռևս կենդանի իրավասու հաղթող՝ շոշափելով այդ հաշվի օգտագործումը և գրանցումը առանց այլ ընդհանուր գրելու: Եթե այն անհասանելի է, ընտրությունը պահում է տեղական թեկնածուին, թողնում է ընդհանուր փին անփոփոխ և թողարկում է վրիպազերծման մեկ հաղորդագրություն: Մերժված CAS չի գրում SQLite; Redis սխալները, ժամանակի ընդմիջումները կամ ընդունելության հագեցվածությունը փոխարենը կիրառում են առկա տեղական գործողությունը: Եթե ուղարկված մուտացիայի պատասխանը հասնում է ժամանակի ավարտից հետո (ընդունված, մերժված կամ սխալ), ապա համաժամանակյա ճշգրիտ սերիական արժեքի համեմատում-ջնջումը վերացնում է միայն բայթին նույնական ժամանակի վերջնաժամկետի հետադարձ շարքը: Այդ համեմատության և ջնջման միջև սպասելիք չկա. պահպանվել է ավելի նոր անջատման գրություն։ Պաշտպանված վտարումը հեռացնում է ձախողված հաշվի սեփական լոկալ փին նույնիսկ Redis ներքևումով և նորից մաքրում է այն հաստատված ընդհանուր վտարումից հետո: Սպասող ավելի վաղ համօգտագործված պատասխանները չեն կարող վերականգնել վտարված տեղական փին, քանի որ համատեղ հաջողությունները երբեք չեն գրում SQLite: Հետագայում անջատման հետադարձ կապը կարող է վերամիավորել հաշիվը. ավելի ուշ ընդունված համօգտագործվող գրությունը գոյություն ունի միայն Redis ում: Redis սխալները չեն խորհրդակցում տեղական հետադարձ վիճակի հետ: Երբ վարորդն անջատված է, նոր ընտրված քորոցները պահպանում են ժառանգական չորս դաշտային SQLite JSON ձևը; միայն Redis երթուղիչն ավելացնում է հաշված հաշվի ինքնությունը: Նախապես ստացված քորոցները կրկին ստուգվում են դրանց ժամկետի ավարտի սահմաններում: Redis ոչ վարձակալության ընտրությունը վերընթերցում է խանութը, սակայն վարձակալության համաժամանակյա պլանավորումը դեռևս կարող է օգտագործել փին, որը հանվել է նախնական առբերման և պլանավորման միջև (ընդունված լավագույն ջանքերի պատուհան): Վարձակալության պարտավորությունը չի կարող փոխել հաշիվները երկարաժամկետ հայցից հետո. մերժված հայտի դեպքում այն պահում է հայցվող թեկնածուին միայն այդ խնդրանքի համար և թողնում է ընդհանուր հաղթողին անձեռնմխելի, ուստի օրինակների միջև համաձայնությունը սահմանափակվում է այդ ճանապարհով: Աղյուսակի մնացած մասը դեռևս կիրառվում է. սա չի կիսում համակցված նստաշրջանի կպչունությունը, բնիկ Codex շրջադարձային քորոցները, հաշվի սեմաֆորները, կողպեքները, ծախսերի սահմանափակումները, կազմաձևումը կամ զանգերի մատյանները:

Սարքավորում. մեկ օրինակի համար միաժամանակյա երկար `/v1/responses` ն ա** հիշողություն-բյուջե** հարց (heap + inflight-byte / #10110): `N` անկախ `DATA_DIR` ները դեռ բազմապատկում են կույտերը. host RAM պետք է ծածկի `N × cgroup`, ոչ թե «մեկ 16 Gi pod N = 8-ով»: Երբեք մի `replicas > 1` մի SQLite ֆայլի վրա:

Կազմել էսքիզ (երկու կույտ, երկու հատոր — not `deploy.replicas: 2`):

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

Ընթացիկ խտությունը (սեղմումը HTTP մեկուսացումից) [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) է: Համօգտագործվող կայուն վիճակի տրամաբանական կլաստերը [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) է:

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
