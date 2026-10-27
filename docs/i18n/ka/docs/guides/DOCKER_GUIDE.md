# 🐳 Docker Guide — OmniRoute (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker-ის განთავსების სრული ცნობარი. სწრაფად დასაწყებად იხილეთ [README-ის Docker-ის განყოფილება](../README.md#-docker).

## სარჩევი

- [სწრაფი გაშვება](#quick-run)
- [გარემოს ფაილით](#with-environment-file)
- [Docker Compose](#docker-compose)
- [ხელმისაწვდომი პროფილები](#available-profiles)
- [ჰოსტის CLI ინსტრუმენტების კონფიგურაცია, როდესაც OmniRoute Docker-ში მუშაობს](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-ის გვერდითი კონტეინერი](#redis-sidecar)
- [საწარმოო Compose](#production-compose)
- [Dockerfile-ის ეტაპები](#dockerfile-stages)
- [კრიტიკული გარემოს ცვლადები](#critical-environment-variables)
- [Docker Compose Caddy-სთან ერთად (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare-ის სწრაფი გვირაბი](#cloudflare-quick-tunnel)
- [იმიჯის ტეგები](#image-tags)
- [Dashboard-ის განახლებები Docker-ში](#dashboard-updates-in-docker)
- [ხელმისაწვდომობა: ნაგულისხმევი SQLite ერთ რეპლიკას იყენებს](#availability-default-sqlite-is-single-replica)
- [Gemini-ის რეგიონული შეცდომები Docker-ში](#gemini-regional-errors-inside-docker)
- [მნიშვნელოვანი შენიშვნები](#important-notes)

---

## სწრაფი გაშვება

> **თვითჰოსტინგი ერთი ბრძანებით?** იხილეთ
> [თვითჰოსტინგის სახელმძღვანელო](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (გამოქვეყნებული იმიჯი +
> Redis, მხოლოდ loopback-ზე, პროფილის არჩევის გარეშე). ქვემოთ მოცემული სწრაფი გაშვება
> ერთკონტეინერიანი ვარიანტია იმ მომხმარებლებისთვის, რომლებსაც Redis უკვე სხვაგან აქვთ გაშვებული.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## გარემოს ფაილით

```bash
# ჯერ დააკოპირეთ და დაარედაქტირეთ .env
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
# საბაზისო პროფილი (CLI ინსტრუმენტების გარეშე)
docker compose --profile base up -d

# CLI პროფილი (ჩაშენებული Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# ჰოსტის პროფილი (უპირველესად Linux-ისთვის; ჰოსტის CLI-ის ბინარულ ფაილებს მხოლოდ წაკითხვის რეჟიმში ამონტაჟებს)
docker compose --profile host up -d

# ვებ-პროფილი (Chromium/Playwright ვებსესიის პროვაიდერებისთვის)
docker compose --profile web up -d

# CLI-ისა და CLIProxyAPI-ის გვერდითი კონტეინერის კომბინირება
docker compose --profile cli --profile cliproxyapi up -d
```

## ხელმისაწვდომი პროფილები

OmniRoute-ს მოჰყვება Compose-ის პროფილები განთავსების ძირითადი ვარიანტებისთვის. აირჩიეთ ის, რომელიც თქვენს გარემოს შეესაბამება.

| პროფილი               | სერვისი          | როდის უნდა გამოიყენოთ                                                                                                                                                  | ბრძანება                                     |
| --------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (ნაგულისხმევი) | `omniroute-base` | უგრაფიკო სერვერი / მინიმალური შესრულების გარემო, პროვაიდერების CLI-ების გარეშე                                                                                         | `docker compose --profile base up -d`        |
| `cli`                 | `omniroute-cli`  | აგენტური სამუშაო პროცესები, რომლებიც იძახებენ `omniroute providers/setup/doctor`-ს და თანდართულ CLI-ებს (Codex, Claude Code, Droid, OpenClaw)                          | `docker compose --profile cli up -d`         |
| `host`                | `omniroute-host` | Linux ჰოსტები, რომლებსაც ჰოსტის CLI-ებზე `network_mode`-ის მსგავსი წვდომა სურთ `~/.local/bin`, `~/.codex`, `~/.claude` და სხვათა მხოლოდ წაკითხვის რეჟიმში დამონტაჟებით | `docker compose --profile host up -d`        |
| `cliproxyapi`         | `cliproxyapi`    | გაუშვით [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-ის გვერდითი კონტეინერი `8317` პორტზე ზედა დონის CLI-ის პროქსირებისთვის                             | `docker compose --profile cliproxyapi up -d` |
| `web`                 | `omniroute-web`  | ვებსესიის პროვაიდერები, რომლებსაც ბრაუზერი სჭირდებათ: `gemini-web`, `claude-web`, `claude-turnstile` (აგებს `runner-web`-ს, Chromium ჩართულია)                         | `docker compose --profile web up -d`         |

> შესაძლებელია რამდენიმე პროფილის კომბინირება: `docker compose --profile cli --profile cliproxyapi up -d`.

## ჰოსტის CLI ხელსაწყოების კონფიგურაცია, როდესაც OmniRoute Docker-ში მუშაობს

`omniroute setup-codex`, `setup-claude`, `config set <tool>` და მართვის პანელის
**კონფიგურაციის შენახვა** ღილაკი წერენ ფაილებს, როგორიცაა `~/.codex/*.config.toml`. ამ ბილიკებს
მნიშვნელობა მხოლოდ იმ კომპიუტერზე აქვს, სადაც CLI რეალურად მუშაობს. თუ მათ კონტეინერის შიგნით
გაუშვებთ, ჩანაწერი კონტეინერის საკუთარ home დირექტორიაში (`/home/node` —
image მუშაობს `USER node`-ით) მოხვდება, საიდანაც მას ჰოსტის არცერთი CLI არასოდეს წაიკითხავს და
რომელიც კონტეინერის ხელახლა შექმნისთანავე წაიშლება.

OmniRoute ამას ამოიცნობს და გამოუსადეგარი წარმატების შეტყობინების ნაცვლად,
ინსტრუქციებთან ერთად უარს ამბობს ჩაწერაზე: CLI სრულდება `2` კოდით, ხოლო API პასუხობს `422`
კოდითა და `containerEphemeralTarget: true`-ით.

### რეკომენდებული: გაუშვით CLI ჰოსტზე, ხოლო OmniRoute — Docker-ში

კონტეინერი API-ს ემსახურება; CLI კი თქვენი ჰოსტის ხელსაწყოებს აკონფიგურირებს.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # მიუთითეთ CLI-ს კონტეინერი
omniroute setup-codex                      # წერს რეალურ ~/.codex-ში თქვენს ჰოსტზე
```

ეს სწორი არჩევანია, როდესაც Codex, Claude Code, Cursor ან მსგავსი ხელსაწყოები თქვენს
ლეპტოპზე მუშაობს — რაც ჩვეულებრივი კონფიგურაციაა.

### ალტერნატივა: ჰოსტის კონფიგურაციის დირექტორიების bind-mount (`host` პროფილი)

თუ გსურთ, რომ თავად კონტეინერმა ჩაწეროს თქვენი ჰოსტის კონფიგურაცია, დაამონტაჟეთ
დირექტორიები და `CLI_CONFIG_HOME`-ს mount-ის root დირექტორია მიუთითეთ. `host` პროფილი
ამას უკვე აკეთებს:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

ბილიკს სანდოს სწორედ bind mount ხდის: OmniRoute კითხულობს
`/proc/self/mountinfo`-ს და ჩაწერას უშვებს დამონტაჟებულ ბილიკებში (ასევე იმ დირექტორიებში,
რომელთა შვილობილი დირექტორიებიც mount-ებია, რაც ზუსტად შეესაბამება ზემოთ მოცემულ
`/host-home` სტრუქტურას), ხოლო დაუმონტაჟებელ ბილიკებში ჩაწერაზე კვლავ უარს ამბობს.

### ავარიული გამოსავალი: კონტეინერის საკუთარი CLI-ების კონფიგურაცია (გამოიყენეთ ზომიერად)

როდესაც CLI-ები ნამდვილად კონტეინერის შიგნითაა (`cli` პროფილი), ჩაწერა
განზრახულია. ნებისმიერ `setup-*` ბრძანებას გადაეცით `--allow-container-write`, ან სერვერისთვის
დააყენეთ `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. ჩაწერა გაგრძელდება
გაფრთხილებით, რომ მონაცემები კონტეინერს ვერ გადაურჩება.

> **უსაფრთხოების გაფრთხილება — `cli` პროფილი + `docker.sock` mount.**
> `cli` პროფილი bind-mount-ით ამონტაჟებს `/var/run/docker.sock`-ს, რათა კონტეინერში
> არსებულმა ავტომატურმა განმაახლებელმა ჰოსტის daemon-ის მეშვეობით ხელახლა შექმნას stack
> (`src/lib/system/autoUpdate.ts` ამოწმებს ამ socket-ის არსებობას და მისი
> არარსებობის შემთხვევაში Docker-ის გზას გამოტოვებს). ეს socket არის **ჰოსტის root წვდომის
> ნდობის საზღვარი**: ყველაფერი, რასაც მასთან წვდომა აქვს, ჰოსტის Docker daemon-ს
> root-ის უფლებებით მართავს — მას შეუძლია ჰოსტზე ნებისმიერი კონტეინერის შექმნა, შემოწმება,
> გაჩერება და წაშლა.
> შედეგები:
>
> 1. **არასოდეს გახადოთ `cli` პროფილის პორტი ქსელისთვის ხელმისაწვდომი.** გამოაქვეყნეთ
>    ის `127.0.0.1`-ზე (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — LAN-იდან ხელმისაწვდომი `cli` პროფილი მართვის პანელის დონის ნებისმიერ RCE-ს
>    ჰოსტის სრულ კომპრომეტირებად აქცევს.
> 2. **არ დაამონტაჟოთ ჰოსტის დამატებითი დირექტორიები `cli` პროფილში.**
>    Docker socket დამატებით mount-თან ერთად კონტეინერს თქვენს ფაილურ სისტემასა და
>    ჰოსტის კონფიგურაციაზე სრულ წაკითხვის/ჩაწერის წვდომას აძლევს. თუ ხელსაწყოს
>    პროექტის ნახვა სჭირდება, გაუშვით ის ლოკალურად CLI binary-ით — ნუ დაამონტაჟებთ
>    პროექტს `cli` კონტეინერში.
>
> თუ კონტეინერში ავტომატური განახლება არ გჭირდებათ, დატოვეთ `cli` პროფილი გამორთული
> (`COMPOSE_PROFILES=core,redis` ან უფრო მოკლე ვარიანტი). სხვა პროფილები
> Docker socket-ს არ ამონტაჟებს.
>
> MITM-თან დაკავშირებული საფრთხეების მოდელისთვის იხილეთ `docs/security/MITM-TPROXY-DECRYPT.md` (git-შია; `/docs`-ში არ კომპილირდება),
> ხოლო `codex`/`claude-code`/`droid`/`openclaw` binary-ების წარმოშობის ჯაჭვისთვის —
> `docs/security/SUPPLY_CHAIN.md`.

## Redis Sidecar

OmniRoute იყენებს Redis-ს განაწილებული მოთხოვნების სიხშირის შემზღუდველისა და საზიარო კეშის მხარდასაჭერად. `redis` სერვისი **ყოველთვის განსაზღვრულია** `docker-compose.yml`-ში (მას პროფილით შეზღუდვა არ აქვს) და ნებისმიერ სხვა პროფილთან ერთად იშვება.

| დეტალი                   | მნიშვნელობა                                   |
| ------------------------ | --------------------------------------------- |
| იმიჯი                    | `redis:7-alpine`                              |
| კონტეინერის სახელი       | `omniroute-redis`                             |
| შიდა პორტი               | `6379`                                        |
| ჰოსტის პორტი (გადაფარვა) | `REDIS_PORT` (ნაგულისხმევად `6379`)           |
| ჰოსტზე მიბმა (გადაფარვა) | `REDIS_BIND_HOST` (ნაგულისხმევად `127.0.0.1`) |
| ტომი                     | `omniroute-redis-data` → `/data`              |
| მდგომარეობის შემოწმება   | `redis-cli ping` (10-წამიანი ინტერვალი)       |

დაკავშირებული გარემოს ცვლადები:

- `REDIS_URL` — აპლიკაციაში შეყვანილი კავშირის სტრიქონი (ნაგულისხმევად `redis://redis:6379`).
- `REDIS_PORT` — Redis-ის კონტეინერისთვის ჰოსტის მხარეს პორტის მიბმა.
- `REDIS_BIND_HOST` — ჰოსტის ინტერფეისი, რომელზეც პორტი ქვეყნდება. ნაგულისხმევი მნიშვნელობაა `127.0.0.1`.

> **რატომ გამოიყენება ნაგულისხმევად loopback:** sidecar მუშაობს `requirepass`-ის გარეშე, ხოლო აპლიკაციის
> კონტეინერები მას compose ქსელის მეშვეობით (`redis:6379`) უკავშირდებიან — გამოქვეყნებული პორტი
> მხოლოდ ჰოსტის მხარეს არსებული ხელსაწყოებისთვისაა (`redis-cli`, ლოკალური `npm run dev`). მისი
> `0.0.0.0`-ზე გამოქვეყნება არაავთენტიფიცირებულ Redis-ს თქვენს LAN-ში არსებულ ყველა ჰოსტს გაუხსნის. თუ დააყენებთ
> `REDIS_BIND_HOST=0.0.0.0`-ს, სერვისის `command:`-ს ასევე დაამატეთ `--requirepass`.

**Redis-ის გამორთვა** რეკომენდებული არ არის (მოთხოვნების სიხშირის შემზღუდველი გადავა მეხსიერებაში არსებულ სარეზერვო მექანიზმზე, რომელსაც შეზღუდული შესაძლებლობები აქვს). აუცილებლობის შემთხვევაში ან წაშალეთ/დააკომენტარეთ `redis:` სერვისის ბლოკი `docker-compose.yml`-ში, ან მისი მასშტაბი ნულამდე შეამცირეთ:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

დეველოპმენტ-გარემოს პარალელურად იზოლირებული საწარმოო სნეპშოტის გასაშვებად გამოიყენეთ `docker-compose.prod.yml`.

| დეტალი                    | მნიშვნელობა                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ფაილი                     | `docker-compose.prod.yml`                                                                                   |
| დაფის ნაგულისხმევი პორტი  | `PROD_DASHBOARD_PORT=20130` (მიბმულია შიდა `${DASHBOARD_PORT:-20128}`-ზე)                                   |
| API-ის ნაგულისხმევი პორტი | `PROD_API_PORT=20131`                                                                                       |
| იმიჯი                     | `omniroute:prod` (აგებულია `runner-cli` სამიზნიდან)                                                         |
| Redis-ის კონტეინერი       | `omniroute-redis-prod` (`redis:8.6.2`, გამოყოფილი `redis-prod-data` ტომი)                                   |
| მონაცემთა ტომი            | `omniroute-prod-data` (სახელდებული, ინარჩუნებს მონაცემებს ხელახალი აგებებისას)                              |
| მდგომარეობის შემოწმებები  | `node healthcheck.mjs` + `redis-cli ping`, სადაც `depends_on` დამოკიდებულია Redis-ის გამართულ მდგომარეობაზე |

გამოყენება:

```bash
# საწარმოო სტეკის აგება და გაშვება
docker compose -f docker-compose.prod.yml up -d --build

# ჟურნალების ნაკადის ნახვა
docker compose -f docker-compose.prod.yml logs -f

# გამორთვა (ტომების შენარჩუნებით)
docker compose -f docker-compose.prod.yml down
```

საწარმოო სტეკი დეველოპმენტის compose-ის პარალელურად მუშაობს (განსხვავებული კონტეინერების სახელებით, პორტებითა და ტომებით), ამიტომ შეგიძლიათ ლოკალურად განაგრძოთ მუშაობა, სანამ საწარმოო გარემო გაშვებულია.

## Dockerfile-ის ეტაპები

რეპოზიტორიას მოჰყვება მრავალეტაპიანი Dockerfile (`Dockerfile`). ხელმისაწვდომია ოთხი ეტაპი; თქვენი გამოყენების შემთხვევისთვის აირჩიეთ შესაბამისი `target`.

| ეტაპი         | საბაზისო იმიჯი        | დანიშნულება                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | აყენებს დამოკიდებულებებს (`npm ci --legacy-peer-deps`) და უშვებს `npm run build`-ს (ნაგულისხმევად Turbopack — იხილეთ ქვემოთ, აწყობის დროის რესურსები)                                                                                                                                                         |
| `runner-base` | `node:26-trixie-slim` | საწარმოო გაშვების გარემო Next.js-ის standalone შედეგით. **პროვაიდერების CLI-ები არ მოჰყვება.**                                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | ამატებს `git`, `docker.io`, `docker-compose` და გლობალურ CLI-ებს: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **აირჩიეთ ეს აგენტური სამუშაო პროცესებისთვის.**                                                                                                                          |
| `runner-web`  | `runner-base`         | ამატებს Playwright-სა და Chromium ბრაუზერს (`--with-deps`) ვებსესიის პროვაიდერებისთვის: `gemini-web`, `claude-web`, `claude-turnstile`. **აირჩიეთ ეს, როდესაც ამ პროვაიდერებს იყენებთ** — ჩვეულებრივი იმიჯი მის გარეშე მოთხოვნის დროს მარცხდება (იხილეთ `-web`-ის შენიშვნა გამოშვების არხების განყოფილებაში). |

კონკრეტული სამიზნის ხელით აწყობა:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### აწყობის დროის რესურსები

სამი აწყობის არგუმენტი აკონტროლებს `builder` ეტაპის რესურსების მოხმარებას. ისინი მხოლოდ აწყობის დროს გამოიყენება —
`OMNIROUTE_MEMORY_MB` (ქვემოთ) ცალკე, გაშვების დროის პარამეტრია.

| აწყობის არგუმენტი           | ნაგულისხმევი | ეფექტი                                                                                                             |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` აწყობს webpack-ით: მეხსიერების ნაკლები პიკური მოხმარება, მაგრამ უფრო ნელა. `1` რთავს Turbopack-ს.              |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | V8 heap-ის ზედა ზღვარი (`--max-old-space-size`) გაშვებული `next build`-ისთვის.                                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | აწვდის მნიშვნელობას `CIRCLE_NODE_TOTAL`-ს; Next გვერდის მონაცემების შეგროვებისთვის გამოითვლის `workers = N - 1`-ს. |

`OMNIROUTE_BUILD_WORKERS` არის ის პარამეტრი, რომელიც მძლავრ ამწყობზე უნდა გაზარდოთ და რომლის მიმართაც
ეჭვი უნდა მიიტანოთ, როდესაც შეზღუდული რესურსების მქონე აწყობა **`✓ Compiled successfully`-ის შემდეგ** წყდება. გვერდის
მონაცემების თითოეული worker ცალკე პროცესია, ისევე როგორც თავად მშობელი `next build`;
რეალურ VPS-ზე ჩატარებულმა რეპროდუქციამ (issue #7518) თითოეული პროცესის პიკური RSS
~4.5 GB-ის დონეზე გაზომა, `NODE_OPTIONS` heap-ის ალმისგან დამოუკიდებლად (Turbopack კომპილაციას
V8 heap-ის გარეთ, ნატიურ/Rust მეხსიერებაში ასრულებს). ნაგულისხმევი მნიშვნელობა `2` (→ 1 worker, სულ 2
პროცესი) გათვლილია 16 GB / 4 vCPU-იან GitHub-ის ჰოსტირებულ runner-ებზე, რომლებსაც
გამოქვეყნების pipeline იყენებს. `8`-ის შემთხვევაში (→ 7 worker) ამ runner-ს მეხსიერება ამოეწურა და
buildkit-მა ეტაპი დაასრულა შეცდომით `ResourceExhausted: ... cannot allocate memory`;
`3`-იც (→ 2 worker) ვერ დაეტია მას შემდეგ, რაც თითოეული პროცესის RSS პირდაპირ
გაზომეს და არა ირიბად შეაფასეს. `tests/unit/docker-build-memory-budget.test.ts`
ანგარიშს გაზომილი მაჩვენებლის მიხედვით ასრულებს და მარცხდება, თუ რომელიმე პარამეტრი
runner-ის შესაძლებლობებს გადააჭარბებს.

Turbopack კომპილაციას ნატიურ Rust მეხსიერებაში ასრულებს, რომელიც V8 heap-ის **გარეთაა**, ამიტომ
`OMNIROUTE_BUILD_MEMORY_MB` მას არ ზღუდავს. მეხსიერების ზღვრის მქონე ჰოსტზე აწყობას
OOM killer ყოველგვარი შეცდომის ტექსტის გარეშე SIGKILL-ით წყვეტს — ის უბრალოდ
`Creating an optimized production build`-ის შუაში ჩერდება, რაც მეხსიერების ამოწურვის ნაცვლად
გაჭედვას ჰგავს. სწორედ ამიტომ იყენებს `Dockerfile` ნაგულისხმევად webpack-ს
(`OMNIROUTE_USE_TURBOPACK=0`), განსხვავებით `npm run dev` / `npm run build`-ისგან, სადაც
კოდის ნაგულისხმევი არჩევანი Turbopack-ია: შიშველი `docker build .`, აწყობის არგუმენტების გარეშე (რასაც
Railway და სხვა ერთი დაწკაპუნებით გასაშვები ჰოსტები ასრულებენ), მეხსიერებით შეზღუდულ
ამწყობზე ჩუმად არ უნდა შეწყდეს. გამოქვეყნებული იმიჯები უკვე აშკარად გადასცემენ
`OMNIROUTE_USE_TURBOPACK=0`-ს `docker-publish.yml`-ში. საკმარისი RAM-ის მქონე ამწყობზე
უფრო სწრაფი აწყობისთვის ჩართეთ Turbopack:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ჩართულია, ამიტომ `next build` უშვებს როგორც მშობელ, **ასევე** worker
პროცესს და თითოეული მათგანი ცალ-ცალკე ითვალისწინებს `OMNIROUTE_BUILD_MEMORY_MB`-ს. კონტეინერის
ზღვარი ამ მნიშვნელობაზე დაახლოებით ორჯერ მეტი უნდა იყოს და არა ერთხელ.

გაზომილია ამ ხეზე (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| ბანდლერი  | კონტეინერის ზღვარი | შედეგი                                 |
| --------- | ------------------ | -------------------------------------- |
| Turbopack | 8 GiB / 16 GiB     | ორივე შემთხვევაში OOM-ით შეწყდა, ჩუმად |
| webpack   | 8 GiB              | build worker SIGKILL-ით შეწყდა         |
| webpack   | 12 GiB             | წარმატებით დასრულდა, პიკი 11.1 GiB იყო |

### გაშვების დროის ნაგულისხმევი პარამეტრები

`runner-base`-ის მიერ ექსპორტირებული ნაგულისხმევი მნიშვნელობები: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

მეხსიერების ქცევა Docker-ში:

- იმიჯი ადგენს `OMNIROUTE_MEMORY_MB=1024`-ს და მისგან განსაზღვრავს `NODE_OPTIONS=--max-old-space-size=1024`-ს.
- სერვერის ფაქტობრივ პროცესს უშვებს დამოუკიდებელი გამშვები, რომელიც კითხულობს `OMNIROUTE_MEMORY_MB`-ს და ამატებს `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`-ს.
- Node იყენებს ბოლო განმეორებულ `--max-old-space-size` მნიშვნელობას, ამიტომ `OMNIROUTE_MEMORY_MB`-ის დაყენება აკონტროლებს Docker-ის გროვის მეხსიერების ეფექტურ ლიმიტს.
- რადგან იმიჯი მას ყოველთვის ადგენს, Docker-ში გამშვების საკუთარი, RAM-ის მიხედვით დაკალიბრებული სარეზერვო მნიშვნელობა არასოდეს გამოიყენება. სამუშაო დატვირთვისთვის მნიშვნელობა ცალსახად გაზარდეთ (იხილეთ ქვემოთ მოცემული ცხრილი). `2048` მაინც ძალიან მცირეა კოდის აგენტების `/v1/responses` მოთხოვნებისთვის.

### გაშვებისას საჭირო RAM კოდის აგენტებისთვის

Docker-ის ნაგულისხმევი 1 GiB არის მინიმალური ზღვარი მართვის პანელისა და მსუბუქი ჩატისთვის და არა საწარმოო გარემოსთვის განკუთვნილი მოცულობა. გრძელი `POST /v1/responses` მოთხოვნების სხეულები (ასობით შეტყობინება, ათობით ინსტრუმენტი) შეკუმშვისას მეხსიერებაში რამდენიმე გრაფს ერთდროულად ინარჩუნებს. ორმა გადაფარულმა ~3 MiB / ~750k-ტოკენიანმა მოთხოვნამ V8-ის მუშაობა შეწყვიტა **12 GiB** old-space-ზე (`FATAL ERROR: Reached heap limit`) და ასევე გამოიწვია 16 GiB cgroup OOM. იხილეთ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

cgroup-ის `--memory` მნიშვნელობა **გროვის მეხსიერებაზე მეტი უნდა იყოს** — ნატიური ბუფერები, SQLite და შეკუმშვის შუალედური მონაცემები V8-ის გარეთ თავსდება.

| სამუშაო დატვირთვა                       | `OMNIROUTE_MEMORY_MB`                    | კონტეინერი / cgroup     | შენიშვნები                                                                                                                                    |
| --------------------------------------- | ---------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| მართვის პანელი, ერთი მსუბუქი ჩატი       | `1024` (იმიჯის ნაგულისხმევი მნიშვნელობა) | ≥2 GiB                  |                                                                                                                                               |
| ერთი კოდის აგენტი (Claude/Codex/Grok)   | `8192`                                   | ≥10 GiB                 | ტიპური ერთსესიანი `/v1/responses`                                                                                                             |
| ორი ერთდროული გრძელი `/v1/responses`    | `10240`–`12288`                          | ≥12–16 GiB              | გაზომვისას V8-ის მუშაობა შეწყდა ~12 GiB გროვის მეხსიერებაზე                                                                                   |
| სამი ან მეტი ერთდროული გრძელი კონტექსტი | არ გაუშვათ ერთ პროცესში                  | სერიალიზაცია / მეტი RAM | მძიმე მოთხოვნების ნაგულისხმევი დაშვების ლიმიტია 1 მიმდინარე მოთხოვნა; საკმარისი RAM-ის გარეშე მისი გაზრდა კვლავ გამოიწვევს მუშაობის შეწყვეტას |

`omniroute serve` ფიზიკურ სისტემაზე აკალიბრებს RAM-ის დაახლოებით 35%-ს (`[512, 4096]` დიაპაზონში), როდესაც `OMNIROUTE_MEMORY_MB` **არ არის დაყენებული**. Docker ყოველთვის ადგენს `1024`-ს, ამიტომ ოფიციალურ იმიჯში ეს კალიბრაცია არასოდეს სრულდება.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## კრიტიკული გარემოს ცვლადები

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)-ში დოკუმენტირებული ნაგულისხმევი პარამეტრების გარდა, Docker-ის ქვეშ გაშვებისას ყველაზე მნიშვნელოვანია შემდეგი ცვლადები:

| ცვლადი                        | დანიშნულება                                                                                                                                                                                                                                                                                           | ნაგულისხმევი მნიშვნელობა          |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket-ხიდის საერთო საიდუმლო გასაღები. **აუცილებელია საწარმოო გარემოში** — მიუთითეთ ძლიერი შემთხვევითი სტრიქონი.                                                                                                                                                                                   | არ არის მითითებული (სავალდებულოა) |
| `REDIS_URL`                   | სიჩქარის შემზღუდველის / კეშის ბეკენდთან დასაკავშირებელი სტრიქონი                                                                                                                                                                                                                                      | `redis://redis:6379`              |
| `REDIS_PORT`                  | ჰოსტის მხარის პორტი თანდართული Redis-კონტეინერისთვის                                                                                                                                                                                                                                                  | `6379`                            |
| `REDIS_BIND_HOST`             | ჰოსტის ინტერფეისი, რომელზეც თანდართული Redis-ის პორტი ქვეყნდება (loopback, თუ AUTH-ს არ დაამატებთ)                                                                                                                                                                                                    | `127.0.0.1`                       |
| `AUTO_UPDATE_HOST_REPO_DIR`   | ჰოსტის ბილიკი, რომელიც თვითგანახლების სამუშაო პროცესებისთვის `cli` პროფილში `/workspace/omniroute`-ზე მონტაჟდება                                                                                                                                                                                      | `.` (მიმდინარე დირექტორია)        |
| `OMNIROUTE_MEMORY_MB`         | Docker-ის ავტონომიური სერვერისთვის Node-ის heap-ის ზედა ზღვარი გაშვებისას; ანაცვლებს ზემოთ მოცემულ image-ის ნაგულისხმევ მნიშვნელობას. კოდის წერის აგენტებისთვის: `8192`+ (იხილეთ [გაშვების RAM](#runtime-ram-for-coding-agents)).                                                                     | `1024`                            |
| `DASHBOARD_PORT` / `API_PORT` | dashboard-ისა (20128) და API-ის (20129) გამოქვეყნებული პორტების გადაფარვა                                                                                                                                                                                                                             | `20128` / `20129`                 |
| `APP_BIND_HOST`               | ჰოსტის ინტერფეისი, რომელზეც docker-compose dashboard/API/live-WS პორტებს აქვეყნებს. როდესაც `REQUIRE_API_KEY=false` (ნაგულისხმევი), `0.0.0.0` ანონიმურ `/v1` პროქსის LAN-ისთვის ხელმისაწვდომს ხდის — წვდომა გააფართოეთ მხოლოდ `REQUIRE_API_KEY=true`-ის ან წინ მდგომი reverse proxy-ის გამოყენებისას. | `127.0.0.1`                       |
| `CLIPROXY_BIND_HOST`          | ჰოსტის ინტერფეისი, რომელზეც docker-compose `cliproxyapi` sidecar-ს აქვეყნებს — მისი მონაცემთა ტომი პროვაიდერის ავტორიზაციის მონაცემებს ინახავს.                                                                                                                                                       | `127.0.0.1`                       |
| `OMNIROUTE_PLUGINS_DIR`       | დირექტორია, რომელსაც გაშვებისას plugin-ების სკანერი კითხულობს და რომელშიც აყენებს მათ. მიუთითეთ, როდესაც plugin-ები bind-mount-ითაა მონტაჟებული: ნაგულისხმევი მნიშვნელობა `HOME`-ს მიჰყვება, რომლის ექსპორტირებაც image-მა შეიძლება არ მოახდინოს.                                                     | `~/.omniroute/plugins`            |
| `OMNIROUTE_BASE_PATH`         | URL-ის ქვებილიკი, როდესაც აპი reverse proxy-ის უკან ქვეყნდება (მაგ., `/omniroute`)                                                                                                                                                                                                                    | _(ცარიელი = root)_                |
| `NEXT_PUBLIC_BASE_URL`        | ბრაუზერის საჯარო origin ქვებილიკის ჩათვლით (მაგ., `https://host/omniroute`)                                                                                                                                                                                                                           | არ არის მითითებული                |
| `PROD_DASHBOARD_PORT`         | ჰოსტის მხარის dashboard-ის პორტი `docker-compose.prod.yml`-ისთვის                                                                                                                                                                                                                                     | `20130`                           |
| `CLIPROXYAPI_PORT`            | ჰოსტის მხარის პორტი `cliproxyapi` sidecar-ისთვის                                                                                                                                                                                                                                                      | `8317`                            |

## უკუპროქსი ქვეკატალოგზე (Traefik / nginx)

Next.js-ის `basePath` კომპილირდება standalone-პაკეტში. OmniRoute ჩაშენებულ
მნიშვნელობას აპლიკაციის root-ში არსებულ sentinel-ფაილში ინახავს (იწერება `npm run build`-ის დროს;
იკითხება `scripts/docker/ensure-docker-base-path.mjs`-ის მიერ) და კონტეინერის გაშვებისას
ადარებს მას `OMNIROUTE_BASE_PATH`-ს. როდესაც ისინი განსხვავდება და image
დომენის root-ისთვისაა აგებული, entrypoint გადააკეთებს standalone manifest-ებს,
ჩაშენებულ `basePath`/`assetPrefix` ლიტერალებს (Next 16 SSR asset-ის URL-ებს მხოლოდ
`assetPrefix`-იდან ქმნის — patcher მასში ქვეკატალოგსაც ასახავს), ჩაშენებულ
`/_next/static` asset-ის URL-ებს (client-reference manifest-ებს, მედიის import-ებს,
წინასწარ დარენდერებულ შეცდომის გვერდებს) და კლიენტის `process.env` shim-ს,
სანამ `node dev/run-standalone.mjs` გაეშვება.

### Compose-ით აგება (რეკომენდებული)

ორივე ცვლადი მიუთითეთ `.env`-ში, შემდეგ კი ხელახლა ააგეთ, რათა image-ისა და runtime-ის
პარამეტრები ერთმანეთს ემთხვეოდეს:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` გადასცემს `OMNIROUTE_BASE_PATH`-ს როგორც Docker-ის build-arg-ს და
როგორც runtime-ის გარემოს ცვლადს.

### წინასწარ აგებული root-image + runtime-ის ქვეკატალოგი

გამოქვეყნებული `diegosouzapw/omniroute:*` image-ები დომენის root-ისთვისაა აგებული. ამის მიუხედავად,
შეგიძლიათ runtime-ის დროს მიუთითოთ `OMNIROUTE_BASE_PATH`; გაშვებისას კონტეინერი პაკეტს
ერთხელ დააპატჩავს. გამოიყენეთ ის შესაბამის საჯარო origin-თან ერთად:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

დააკონფიგურირეთ უკუპროქსი ისე, რომ მან **სრული** გარე path გადაამისამართოს (პრეფიქსი არ
მოაშოროთ). Traefik-მა `PathPrefix(`/omniroute`)` კონტეინერისკენ უნდა მიმართოს
`StripPrefix`-ის გარეშე, რათა Next.js-მა მიიღოს `/omniroute/...` და asset-ები
`/omniroute/_next/...`-დან მოემსახუროს.

Docker-ის healthcheck ამოწმებს მსუბუქ `/healthz` lifecycle endpoint-ს, რომელსაც წინ
ერთვის აქტიური `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` კვლავ ხელმისაწვდომია
ადამიანის მიერ ან dashboard-იდან დიაგნოსტიკისთვის; იმისათვის, რომ კონტეინერის HEALTHCHECK
კვლავ მისკენ მიმართოთ (მაგალითად, ჯანმრთელობის სიღრმისეული შემოწმების სავალდებულოდ
გასახდელად), მიუთითეთ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
ეს path არის **სიღრმისეული** შემოწმება (DB + მონიტორინგის შეჯამება) — შესაფერისია Docker-ის
იშვიათი `HEALTHCHECK`-ისთვის, თუ მის გამოყენებას კვლავ გადაწყვეტთ, თუმცა **არა**
Kubernetes-ის `livenessProbe` ინტერვალებისთვის.

ორკესტრატორებისთვის (Kubernetes, Nomad და სხვ.):

| შემოწმება              | სასურველია                                                              | მოერიდეთ                                                                  |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| სიცოცხლისუნარიანობა    | HTTP `GET /livez`, ან TCP მთავარ პორტზე (`PORT`, ნაგულისხმევად `20128`) | `/api/monitoring/health` სიცოცხლისუნარიანობისთვის                         |
| მზადყოფნა              | HTTP `GET /healthz`                                                     | მოკლე timeout-ებს, რომლებიც event loop-ის დატვირთულობას გათიშვად მიიჩნევს |
| სიღრმისეული / blackbox | `/api/monitoring/health`                                                | —                                                                         |

`/healthz` იუწყება პროცესის lifecycle-ის მდგომარეობას (`ok` / `starting` / `stopping`).
`/livez` მხოლოდ პროცესის მუშაობას ამოწმებს (200, როცა handler-ს შესრულება შეუძლია;
ის მზადყოფნას არ ელოდება). ორივე მაინც იმავე Node event loop-ზე მუშაობს, რომელზეც
მოთხოვნები მუშავდება, ამიტომ CPU-ზე დამოკიდებულმა კატალოგის ან შეკუმშვის ოპერაციებმა
შეიძლება ისინი შეაფერხოს — დატვირთული ≠ გათიშული. თუ HTTP-შემოწმებებს timeout ეწურება,
უპირატესობა მიანიჭეთ TCP სიცოცხლისუნარიანობის შემოწმებას. შემოწმებების სრული სახელმძღვანელო:
[მონიტორინგის სახელმძღვანელო — Kubernetes-ის შემოწმებების რეკომენდაციები](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose Caddy-სთან ერთად (HTTPS Auto-TLS)

OmniRoute-ის უსაფრთხოდ გამოქვეყნება შესაძლებელია Caddy-ის მიერ SSL-ის ავტომატური უზრუნველყოფის გამოყენებით. დარწმუნდით, რომ თქვენი დომენის DNS A ჩანაწერი თქვენი სერვერის IP მისამართზე მიუთითებს.

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
      # ბრაუზერისთვის განკუთვნილი წყარო OAuth-ის უკუგამოძახებებისთვის, მართვის პანელის ბმულებისა და გენერირებული საჯარო URL-ებისთვის.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # შიდა სერვერიდან სერვერზე URL დაგეგმილი ამოცანებისთვის / საკუთარ თავთან მოთხოვნებისთვის.
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

Caddy ზედა დონის კონტეინერისთვის გადამისამართების სტანდარტულ სათაურებს ადგენს. OmniRoute
`NEXT_PUBLIC_BASE_URL`-ს იყენებს კანონიკურ საჯარო წყაროდ OAuth-ის უკუგამოძახებებისა და გენერირებული საჯარო
ბმულებისთვის; მართვის პანელში ავთენტიფიცირებული ჩაწერის ოპერაციები იყენებს იმავე წყაროს მოთხოვნებსა და სესიასთან მიბმულ CSRF
დაცვას. `OMNIROUTE_TRUST_PROXY` ჩართეთ მხოლოდ გაფართოებულ განთავსებებში, სადაც განზრახ
გსურთ, რომ OmniRoute-მა საჯარო წყარო ცხადი
კონფიგურაციის ნაცვლად სანდო გადამისამართების სათაურებიდან განსაზღვროს.

## Cloudflare Quick Tunnel

Docker-ის განთავსებებისთვის მართვის პანელის მხარდაჭერა მოიცავს ერთი დაწკაპუნებით ჩასართავ **Cloudflare Quick Tunnel**-ს გვერდზე `Dashboard → Endpoints`. პირველი ჩართვისას `cloudflared` მხოლოდ საჭიროების შემთხვევაში ჩამოიტვირთება, გაეშვება დროებითი გვირაბი თქვენი მიმდინარე `/v1` საბოლოო წერტილისკენ და გენერირებული `https://*.trycloudflare.com/v1` URL პირდაპირ თქვენი ჩვეულებრივი საჯარო URL-ის ქვემოთ გამოჩნდება.

საბოლოო წერტილების გვირაბების პანელების (Cloudflare, Tailscale, ngrok) ჩვენება ან დამალვა შესაძლებელია `Settings → Appearance`-დან, აქტიური გვირაბის მდგომარეობის შეცვლის გარეშე.

### შენიშვნები გვირაბის შესახებ

- Quick Tunnel-ის URL-ები დროებითია და ყოველი გადატვირთვის შემდეგ იცვლება.
- Quick Tunnel-ები OmniRoute-ის ან კონტეინერის გადატვირთვის შემდეგ ავტომატურად არ აღდგება. საჭიროების შემთხვევაში ისინი კვლავ ჩართეთ მართვის პანელიდან.
- მართული ინსტალაცია ამჟამად მხარს უჭერს Linux-ს, macOS-სა და Windows-ს `x64` / `arm64` არქიტექტურებზე.
- მართული Quick Tunnel-ები ნაგულისხმევად იყენებს HTTP/2 ტრანსპორტს, რათა რესურსებით შეზღუდულ კონტეინერულ გარემოებში თავიდან იქნეს აცილებული ხმაურიანი QUIC UDP ბუფერის გაფრთხილებები. თუ განსხვავებული ტრანსპორტის გამოყენება გსურთ, დააყენეთ `CLOUDFLARED_PROTOCOL=quic` ან `auto`.
- Docker-ის გამოსახულებები შეიცავს სისტემურ CA ფესვებს და გადასცემს მათ მართულ `cloudflared`-ს, რაც თავიდან გვაცილებს TLS-ის ნდობასთან დაკავშირებულ შეცდომებს კონტეინერის შიგნით გვირაბის საწყისი გაშვებისას.
- თუ გსურთ, რომ OmniRoute-მა ჩამოტვირთვის ნაცვლად არსებული ბინარული ფაილი გამოიყენოს, დააყენეთ `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## გამოსახულების ტეგები

| გამოსახულება             | ტეგი     | ზომა   | აღწერა                                                        |
| ------------------------ | -------- | ------ | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | უმაღლესი **გამოქვეყნებული** სტაბილური SemVer (არა git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps-ისთვის მიამაგრეთ ამ კლასის ტეგი                        |

მრავალპლატფორმიანი მანიფესტი: ნატიური `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker შესაბამის არქიტექტურას ავტომატურად ირჩევს; თუ ARM ჰოსტებზე AMD64-ის ემულაციის იძულებით გამოყენება გჭირდებათ, მიუთითეთ `--platform linux/amd64`.

### გამოშვების არხები

OmniRoute აქვეყნებს Docker-ის ცალკეულ არხებს სტაბილური გამოშვებებისთვის, აქტიური გამოშვების განშტოების ტესტირებისა და დეველოპერული აგებებისთვის.

| არხი                            | წყარო                                         | ცვალებადობა                                | რეკომენდებული გამოყენება                                                                                                                     |
| ------------------------------- | --------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | ხელმოწერილი/ვერსიონირებული გამოშვება          | უცვლელი                                    | საწარმოო განთავსებები, რომლებიც ზუსტ გამოშვებაზეა მიბმული                                                                                    |
| `:latest` / `:latest-web`       | უმაღლესი **გამოქვეყნებული** სტაბილური SemVer  | ცვალებადი სტაბილური მაჩვენებელი            | მიჰყვება სტაბილურ გამოშვებებს SemVer-ის გამოქვეყნების ამოცანის **შემდეგ** — **არ** მიჰყვება `main`-ს ან გამოუქვეყნებელ `release/v*` კომიტებს |
| `:next` / `:next-web`           | მიმდინარე ნაგულისხმევი `release/v*` განშტოება | ცვალებადი წინასწარი გამოშვების მაჩვენებელი | იმ შესწორებების ტესტირება, რომლებიც აქტიურ გამოშვების განშტოებაში მოხვდა, მაგრამ ჯერ სტაბილურ გამოშვებაში არ შესულა                          |
| `:main` / `:main-web`           | `main` განშტოება                              | ცვალებადი დეველოპერული მაჩვენებელი         | მხოლოდ შემუშავებისა და ინტეგრაციის ტესტირებისთვის                                                                                            |

#### ვებ-სესიის მომწოდებლები: `-web` გამოსახულებები

ზემოთ მოცემული ყველა არხი ასევე ხელმისაწვდომია `-web` ტეგის სახით (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`) და აგებულია `runner-web` ეტაპიდან — იგივე გამოსახულება Playwright-ისა და Chromium ბრაუზერის დამატებით. ჩვეულებრივი გამოსახულება Chromium-ის **გარეშე** ვრცელდება; ის საჭიროა `gemini-web`, `claude-web` და `claude-turnstile`-ისთვის.

შეცდომა გაშვებისას კი არა, მოგვიანებით ვლინდება: ეს მომწოდებლები თავიანთ მოდელებს ჩამოთვლიან და მართვის პანელში დაკავშირებულად გამოჩნდებიან, ხოლო შეცდომით მხოლოდ პირველი მოთხოვნა დასრულდება:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

თუ ამ მომწოდებლებს იყენებთ, ჩამოტვირთეთ იმ არხის `-web` ტეგი, რომელზეც უკვე იმყოფებით — სხვა არაფერი იცვლება. npm/CLI ინსტალაციისას (Docker-ის გამოსახულების გარეშე) შესაბამისი ნაკლული კომპონენტი ბრაუზერის ბინარული ფაილია: ჰოსტზე გაუშვით `npx playwright install chromium`.

#### წინასწარი გამოშვების არხის გამოყენება

`next` არხი ხელახლა აგებულია მიმდინარე ნაგულისხმევ `release/v*` ბრენჩში ყოველი push-ისას და ქვეყნდება როგორც AMD64-ისთვის, ისე ARM64-ისთვის. ძველი ტექნიკური მხარდაჭერის ბრენჩები მას ვერ გადაწერს. არხი გთავაზობთ ჩამოსატვირთ image-ს იმ შესწორებებით, რომლებიც აქტიურ release ბრენჩში გაერთიანდა მომდევნო სტაბილური tag-ის შექმნამდე.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-ისთვის გადააწერეთ არჩეული პროფილის მიერ გამოყენებული image-ის tag, შემდეგ ჩამოტვირთეთ და ხელახლა შექმენით სერვისი:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### უსაფრთხოება და წინა ვერსიაზე დაბრუნება

`next` არის ცვალებადი წინასწარი გამოშვების არხი. ის შეიძლება შეიცვალოს აქტიურ release ბრენჩში ნებისმიერი push-ისას და **არ არის მხარდაჭერილი საწარმოო გარემოში გამოსაყენებლად**. კონკრეტული build-ის შეფასებისას დააფიქსირეთ image-ის digest:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ტესტირებამდე შექმენით OmniRoute-ის მონაცემთა volume-ის ან bind-mounted მონაცემთა დირექტორიის სარეზერვო ასლი. წინა ვერსიაზე დასაბრუნებლად აღადგინეთ ადრე გამოყენებული სტაბილური ვერსია ან digest და ხელახლა შექმენით კონტეინერი:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

release ბრენჩის build ვერასოდეს შეცვლის `latest`-ს; სტაბილური მაჩვენებლის განახლება მხოლოდ შესაბამის სტაბილურ სემანტიკურ ვერსიას შეუძლია. `next` image-ებზე კვლავ მოქმედებს release image-ის შემოწმება და CRITICAL დონის მოწყვლადობების დამბლოკავი შემოწმება.

**`latest` არ იძლევა git-ში აქტუალურობის გარანტიას.** `main`-ში ან აქტიურ `release/v*` ბრენჩში გაერთიანებული შესწორებები **არ** მოხვდება `:latest`-ში, სანამ სტაბილური SemVer image არ გამოქვეყნდება და გამოქვეყნების job არ განაახლებს `:latest`-ს (იგივე digest-ით, რაც ამ SemVer-ს აქვს). თუ `latest` გაყინული ჩანს, ხოლო GitHub-ზე შესწორება უკვე ნაჩვენებია, release ბრენჩის შესამოწმებლად ჩამოტვირთეთ `:next` ან დაელოდეთ SemVer tag-ს.

| თქვენი მიზანი                                                                          | გამოიყენეთ                                |
| -------------------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / საწარმოო გარემო, რომელშიც გადახრა დაუშვებელია                                 | დააფიქსირეთ `:X.Y.Z` (ან image-ის digest) |
| მიჰყვეთ გამოქვეყნებულ სტაბილურ ვერსიებს და დაეთანხმოთ ყოველ release-ზე ხელახლა შექმნას | `:latest`                                 |
| გამოუშვებელი `release/v*` commit-ების ტესტირება                                        | `:next` (არა საწარმოო გარემოსთვის)        |
| `main`-ის ტესტირება                                                                    | `:main` (არა საწარმოო გარემოსთვის)        |

## Dashboard-ის განახლებები Docker-ში

გამოქვეყნებული image-ის container საკუთარ თავს ვერ ჩაანაცვლებს. როდესაც OmniRoute აღმოაჩენს, რომ
container-ის შიგნით მუშაობს (`.git` checkout-ის გარეშე და არა npm-ის ინსტალაციიდან), მთავარი Dashboard-ის განახლების ბანერი npm/git-ის ინსტრუქციების ნაცვლად აჩვენებს
host-ზე გასაშვებ ბრძანებას და კოპირების ღილაკს:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

სერვისის სახელი აიღება `AUTO_UPDATE_SERVICE`-დან (ნაგულისხმევია `omniroute`, სერვისი
`docker-compose.selfhost.yml`-ში). `pull` მხოლოდ მცურავ tag-ს (`latest`, `next`) ანახლებს; ფიქსირებული
`:X.Y.Z` tag-ის შემთხვევაში ჯერ tag შეცვალეთ.

### ერთი დაწკაპუნებით განახლება host-ის trigger ფაილით

იმისთვის, რომ **Update Now**-მ მუშაობა გააგრძელოს `/var/run/docker.sock`-ის mount-ის გარეშე (რაც container-ს
host-ზე root წვდომას აძლევს — იხილეთ ზემოთ `cli` პროფილის გაფრთხილება), OmniRoute-ის სერვისზე დააყენეთ `DOCKER_UPDATE_TRIGGER_FILE` და host-ზე გაუშვით დამკვირვებელი:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

ბილიკი `DATA_DIR`-ის შიგნით უნდა იყოს (ფარდობითი მნიშვნელობები მის მიმართ განისაზღვრება); ნებისმიერი სხვა მდებარეობა
უარყოფილი იქნება. ამის შემდეგ **Update Now** ამ ფაილში წერს `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`-ს,
პასუხობს `202`-ით, ხოლო Dashboard პერიოდულად ამოწმებს `/api/system/version`-ს, სანამ ახალი ვერსია
ამოქმედდება, რის შემდეგაც გვერდს თავიდან ჩატვირთავს. ამ რეჟიმში OmniRoute არასოდეს უშვებს shell-ის ან Docker-ის ბრძანებას. როგორც ყველა განახლების
მოქმედების შემთხვევაში, მოთხოვნა მიიღება მხოლოდ loopback/LAN კლიენტებისგან.

bind-mounted მონაცემთა დირექტორია host-ს დასაკვირვებლად სტაბილურ ბილიკს აძლევს. `systemd`-ის ერთეულების მაგალითები
(`/srv/omniroute` შეცვალეთ იმ დირექტორიით, სადაც თქვენი compose ფაილი და `data/` მდებარეობს):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=OmniRoute-ის Dashboard-იდან განახლების მოთხოვნების მონიტორინგი

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=OmniRoute-ის container-ის ჩამოტვირთვა და ხელახლა შექმნა

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

სერვისი მოთხოვნის ფაილს ჩამოტვირთვამდე შლის, რათა წარუმატებელი გაშვება ციკლურად არ გამეორდეს.
`DOCKER_UPDATE_TRIGGER_FILE`-ის გარეშე Dashboard ინარჩუნებს ხელით გასაშვები ბრძანების პროცესს.

## ხელმისაწვდომობა: ნაგულისხმევი SQLite მხოლოდ ერთ replica-ს უჭერს მხარს

სტანდარტული Docker / Kubernetes OmniRoute წარმოადგენს **ერთ Node პროცესს + ერთ SQLite writer-ს**. ამ ტოპოლოგიაზე მაღალი ხელმისაწვდომობა **მხარდაჭერილი არ არის**.

| შეზღუდვა                                                    | შედეგი                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ერთი writer                                                 | **არ** გაუშვათ რამდენიმე replica ერთი და იმავე SQLite ფაილის გამოყენებით. ეს DB-ს დააზიანებს.                                                                                                                                                                                                                                                                                         |
| ხელახლა შექმნა / გადატვირთვა / HEALTHCHECK-ის მიერ შეწყვეტა | პროცესში მყოფი SSE კავშირების, Dashboard-ის სესიებისა და მეხსიერებაში არსებული მდგომარეობის **სრული გათიშვა**. ყველა დაკავშირებული კლიენტის კავშირი წყდება. ცარიელი endpoint-ის დროის მონაკვეთში ახალი მოთხოვნები reverse-proxy-სგან იღებს **`502 Bad Gateway: Unknown error`**-ს და არა OmniRoute-ის JSON-ს — კლიენტები ამას provider-ის გაუმართაობისგან ვერ განასხვავებენ (#11015). |
| `/healthz`-ის იგივე event loop                              | დატვირთულმა catalog-მა ან compression tick-მა შეიძლება probe-ები შეაყოვნოს; მოკლე timeout შემდეგ **ერთადერთ** replica-ს გადატვირთავს.                                                                                                                                                                                                                                                 |

**Probe-ების მატრიცა** (ასევე იხილეთ [Kubernetes-ის probe-ების რეკომენდაციები](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                            | სამიზნე                                                        | არ გამოიყენოთ                                                         |
| -------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------- |
| Liveness                         | TCP `PORT`-ზე (ნაგულისხმევი `20128`), ან რბილი HTTP `/healthz` | `/api/monitoring/health`                                              |
| Readiness                        | HTTP `GET /healthz`                                            | მოკლე timeout-ები, რომლებიც დატვირთულ event loop-ს გათიშულად მიიჩნევს |
| ღრმა შემოწმება / ადამიანებისთვის | `/api/monitoring/health`                                       | ავტომატიზებული kubelet liveness                                       |

**განახლებები:** ყველა სესიის გათიშვას მოელოდეთ. თუ შეგიძლიათ, კლიენტების ტრაფიკი წინასწარ შეწყვიტეთ; ნაგულისხმევ SQLite-ზე rolling update არ არსებობს. Compose-ის `restart: unless-stopped` და Docker-ის `HEALTHCHECK` ასევე ჩაანაცვლებს ერთადერთ პროცესს, როდესაც container Unhealthy მდგომარეობაში გადავა — ზემოქმედების არეალი იგივეა.

Kubernetes-ის ფრაგმენტი **ერთი replica-სთვის** (Recreate აუცილებელია; ერთი SQLite ფაილის გამოყენებისას `replicas` არ გაზარდოთ):

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

`preStop`-ის დაყოვნება kube-ს საშუალებას აძლევს, SIGTERM-მდე Service-ის endpoint-ები ამოიღოს, რათა **ახალი** ტრაფიკი მომაკვდავ პროცესში აღარ მოხვდეს. მიმდინარე `/v1/responses` SSE კავშირების დასრულებას `SHUTDOWN_TIMEOUT_MS`-ით განსაზღვრული დროის განმავლობაში (ნაგულისხმევად 30 წმ) ელოდება heavyweight admission lease-ების მეშვეობით (#11015). ახალი მოთხოვნები, რომლებიც მაინც აღწევს პროცესამდე, იღებს `503` + `Retry-After: 5` პასუხს. Recreate-ის დროს, სანამ შემცვლელი Ready გახდება, endpoint-ების არქონით გამოწვეული შუალედი სრულ გათიშვად რჩება — ეს SQLite-ის ტოპოლოგიის თვისებაა და არა probe-ის არასწორი კონფიგურაცია.

გარე Postgres / multi-writer HA **არ არის** დოკუმენტირებული სტანდარტული გზა. თუ HA გჭირდებათ, დატოვეთ ერთი რეპლიკა ან გამოიყენეთ ტოპოლოგია, რომელიც პროექტმა ცალკე გამოსცადა და დაადოკუმენტირა. Postgres/MySQL-ზე მუშაობა მიმდინარეობს [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ში. მის გამოშვებამდე **დიდი** `/v1/responses` მოთხოვნების გამტარუნარიანობის გაზრდის ერთადერთი მხარდაჭერილი გზაა N დამოუკიდებელი პროცესი (შემდეგი სექცია) და არა `replicas > 1` ერთ volume-ზე.

## ჰორიზონტალური მასშტაბირება: N დამოუკიდებელი პროცესი

ერთი Node პროცესი არის **ერთი V8 heap**. ორი გადაფარული ~3 MiB / ~750k-ტოკენიანი coding-agent-ის `POST /v1/responses` მოთხოვნა (RTK + Caveman) ამ heap-ს ~12 Gi-ზე ავარიულად წყვეტს (`FATAL ERROR: Reached heap limit`) და შეუძლია 16 Gi cgroup-ში OOM გამოიწვიოს. იხილეთ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). ეს გაზომვა არის გაფრთხილება **მეხსიერების ბიუჯეტის** შესახებ და არა პროდუქტში ჩაშენებული მაქსიმალური ზღვარი ორი ერთდროული ხანგრძლივი `/v1/responses` მოთხოვნისთვის. მძიმე ჩატის მიღება იზღუდება ავტომატურად გამოთვლილი შემომავალი ბაიტების ბიუჯეტით (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), რომლის ზომაც იმავე V8/cgroup ზღვრის მიხედვით განისაზღვრება — უკვე სათანადოდ გაზომილ პროცესში მისი ზემოთ გადაწერა (ან ძველი `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` მოთხოვნების რაოდენობის ლიმიტის დაყენება) კვლავ იწვევს ავარიულ შეწყვეტას. მცირე ჩატები, `/healthz`, `/v1/models` და MCP ამ ლიმიტში **არ** შედის.

### ერთი პროცესი: ორზე მეტი ხანგრძლივი `/v1/responses`

**ჯანსაღ** პროცესს (heap არის `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-ზე დაბლა, ნაგულისხმევად `0.75`) **შეუძლია** ორზე მეტი ერთდროული ხანგრძლივი `POST /v1/responses` მოთხოვნის შესრულება, როდესაც პროცესის მასშტაბით მოქმედ შემუშავების პროცესში მყოფი ბაიტების ბიუჯეტში (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ჯერ კიდევ არის ადგილი. `OMNIROUTE_CHAT_LARGE_BODY_BYTES`-ის ტოლი ან მასზე დიდი body-ები (ნაგულისხმევად 256 KiB) იყენებს იმავე მძიმე სამუშაოს ლიზინგს, რასაც სტრუქტურულად მძიმე მოთხოვნები, და იმავე [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` გამონაკლისს (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). ათეულობით ერთდროული ხანგრძლივი SSE კლიენტი (ოპერატორებს ხშირად 40–50 სჭირდებათ) **მეხსიერების ბიუჯეტის** საკითხია — განსაზღვრეთ heap-ის + ძირითადი/სარეზერვო სლოტების + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`-ის ზომები — და არა პროდუქტში ჩაშენებული მკაცრი „მაქს. 2“ ლიმიტი. ზეწოლის ქვეშ მყოფი heap კვლავ უარყოფს დატვირთვას განმეორებადი `503` პასუხით, რათა #7849 არ განმეორდეს.

**რამდენიმე heap-ის** (დამოუკიდებელი V8 old-space-ების) მისაღებად **დღესვე**:

| გააკეთეთ                                                                                                                                                                                                                                                | არ გააკეთოთ                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| გაუშვით **N კონტეინერი/pod**, თითოეული თავისი **საკუთარი** `DATA_DIR`-ით / volume-ით                                                                                                                                                                    | არ დააყენოთ `replicas > 1` ერთი SQLite ფაილისთვის                                    |
| მძიმე შემუშავების პროცესში მყოფი მოთხოვნებისა და ჯანსაღი სარეზერვო რესურსის ზომები განსაზღვრეთ heap-ის / შემუშავების პროცესში მყოფი ბაიტების ბიუჯეტის მიხედვით; 1–2 არის კონსერვატიული #7849 ნაგულისხმევი მნიშვნელობა და არა პროდუქტის მკაცრი მაქსიმუმი | არ მისცეთ ერთ პროცესს 8× RAM და შეუზღუდავი რაოდენობის ლიმიტი                         |
| სურვილისამებრ: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **გაზიარებული კვოტის მრიცხველებისთვის**                                                                                                                                             | არ მიიჩნიოთ Redis გაზიარებულ SQLite-ად — ის ასეთი არ არის                            |
| დააკოპირეთ პროვაიდერის საიდუმლო მონაცემები თითოეულ ინსტანციაში (ან შეეგუეთ დაყოფილ საინფორმაციო პანელებს)                                                                                                                                               | არ მოელოდეთ ერთ საინფორმაციო პანელს / ერთ ზარების ჟურნალს ყველა ინსტანციისთვის       |
| წინ განათავსეთ ნებისმიერი დატვირთვის დამაბალანსებელი; API გასაღების ან სესიის მიხედვით sticky მარშრუტიზაცია საკმარისია                                                                                                                                  | არ მოითხოვოთ კონკრეტულ მომწოდებელზე დამოკიდებული, ზომის გამთვალისწინებელი middleware |

აპარატურა: თითოეული ინსტანციის ერთდროული ხანგრძლივი `/v1/responses` მოთხოვნების რაოდენობა **მეხსიერების ბიუჯეტის** საკითხია (heap + შემუშავების პროცესში მყოფი ბაიტები / #10110). N დამოუკიდებელი `DATA_DIR` მაინც ამრავლებს heap-ებს: ჰოსტის RAM უნდა ფარავდეს `N × cgroup`-ს და არა „ერთ 16 Gi pod-ს N=8-ით“. არასოდეს გამოიყენოთ `replicas > 1` ერთი SQLite ფაილისთვის.

Compose-ის მონახაზი (ორი heap, ორი volume — არა `deploy.replicas: 2`):

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

პროცესის შიგნით სიმჭიდროვე (კომპრესიის HTTP isolate-ის გარეთ გატანა) აღწერილია [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)-ში. გაზიარებულ მდგრად მდგომარეობაზე დაფუძნებული ერთი ლოგიკური კლასტერი აღწერილია [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)-ში.

## Gemini-ის რეგიონული შეცდომები Docker-ის შიგნით

Google AI Studio / Gemini API-მ შეიძლება დააბრუნოს HTTP 400, FAILED_PRECONDITION სტატუსით და შეტყობინებით
`User location is not supported for the API use.` ჰოსტზე წარმატებული მოთხოვნა
არ ადასტურებს, რომ კონტეინერი იმავე გამავალ მარშრუტს იყენებს. DNS-ის თანმიმდევრობა,
IPv4/IPv6 კავშირი, VPN-ის მარშრუტიზაცია და კონფიგურირებული პროქსი შეიძლება განსხვავდებოდეს. შეამოწმეთ
[Google-ის მხარდაჭერილი რეგიონები](https://ai.google.dev/gemini-api/docs/available-regions),
ასევე კავშირის რეალური მარშრუტი; მხოლოდ ეს შეცდომა არ მიუთითებს, რომ API გასაღები არასწორია.

### უპირატესობა მიანიჭეთ კონკრეტული კავშირისთვის განკუთვნილ პროქსის

დაზარალებული Gemini კავშირისთვის გამოიყენეთ OmniRoute-ის
[თითოეული კავშირისთვის განკუთვნილი პროქსის კონფიგურაცია](../ops/PROXY_GUIDE.md#4-level-proxy-system),
შემდეგ კი იმავე მოდელით გაიმეორეთ **Test Connection** და მცირე მოთხოვნა.
ამგვარად, მარშრუტის ცვლილება მხოლოდ ამ კავშირით შემოიფარგლება. დარწმუნდით,
რომ პროქსი ხელმისაწვდომია კონტეინერიდან და კავშირი ნამდვილად მას ირჩევს.
მარშრუტის შეცვლა არ იძლევა ზედა დონის სერვისის რეგიონული ხელმისაწვდომობის გარანტიას.

### შეადარეთ ჰოსტისა და კონტეინერის ქსელური პარამეტრები

ავთენტიფიცირებული შედეგების შედარებისას გასაღები, მოდელი და მოთხოვნა უცვლელი დატოვეთ; პრობლემის აღწერაში
არასოდეს ჩასვათ ავტორიზაციის მონაცემები, პროქსის პაროლები ან ავტორიზაციის სრული სათაურები.
თავდაპირველად შეამოწმეთ, მისამართების რომელ ოჯახებს გთავაზობთ OS-ის რეზოლვერი, ჰოსტზე და
კონტეინერის შიგნით ერთი და იმავე ბრძანების გამოყენებით:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` ჩაანაცვლეთ იმ სერვისით, რომელსაც იყენებთ (მაგალითად, `omniroute-web`).
ეს ბრძანებები მისამართების ოჯახებს ავტორიზაციის მონაცემებისა და IP მისამართების გარეშე გამოიტანს.
დაბრუნებული `6` მხოლოდ IPv6 DNS შედეგზე მიუთითებს: ის **არ** ადასტურებს გამოსადეგი IPv6 მარშრუტის ან API-ზე წვდომის არსებობას.
იქ, სადაც `curl` დაყენებულია, ორივე გარემოში შეადარეთ
`curl -4 -I https://generativelanguage.googleapis.com` და
`curl -6 -I https://generativelanguage.googleapis.com`.
HTTP პასუხი ამ შემოწმებისთვის კავშირის არსებობას ადასტურებს, თუნდაც ის არაავთენტიფიცირებული
შეცდომა იყოს; Gemini-ის ხელმისაწვდომობას მხოლოდ მოდელისთვის გაგზავნილი ავთენტიფიცირებული მოთხოვნა ამოწმებს.

### ჰოსტის დონის ალტერნატივა: გამართული IPv6 და რეზოლვერის პოლიტიკა

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762)-ის მომხსენებელმა
თავის გარემოში წვდომა კონტეინერისთვის IPv6-ის ჩართვითა და glibc-ის მისამართების
შერჩევის წესის შეცვლით აღადგინა. ეს განიხილეთ, როგორც კონკრეტულ გარემოზე დამოკიდებული ალტერნატივა.
რეზოლვერის პრიორიტეტების შეცვლამდე დარწმუნდით, რომ ჰოსტის IPv6, კონტეინერის გამავალი
კავშირი/მარშრუტიზაცია და ფაიერვოლის წესები გამართულად მუშაობს.
მხოლოდ პირადი ULA მისამართი საჯარო IPv6 კავშირის არსებობას არ ადასტურებს.

Compose-ის ნაგულისხმევ ქსელთან უკვე მიერთებული სერვისებისთვის ეს ფრაგმენტი
ამ ქსელში IPv6-ს ჩართავს; შეინარჩუნეთ თქვენი სერვისის დანარჩენი პარამეტრები, პორტები, ტომები და კონფიგურაცია:

```yaml
networks:
  default:
    enable_ipv6: true
```

სახელდებული ქსელის შემთხვევაში, IPv6 ჩართეთ იმ ქსელში, რომელსაც სერვისი რეალურად უერთდება.
Docker-ს შეუძლია ULA ქვექსელის გამოყოფა; ცხადად განსაზღვრული, სხვა ქსელებთან არაგადამფარავი
ქვექსელი მხოლოდ მაშინ აირჩიეთ, როდესაც თქვენი ქსელი ამას მოითხოვს. იხილეთ
[Docker-ის IPv6 ქსელი](https://docs.docker.com/engine/daemon/ipv6/) და
[Compose-ის ქსელის პარამეტრები](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc-ზე დაფუძნებულ იმიჯში** `/etc/gai.conf`-ს შეუძლია მისამართების შერჩევის შეცვლა.
რეპოზიტორიის მიმდინარე Dockerfile Debian-ს იყენებს; musl-ზე დაფუძნებული მორგებული იმიჯები ამ მექანიზმს არ იზიარებს.
მოხსენებული ცვლილება ULA-ის ჭდეს `label fc00::/7 6`-დან
`label fc00::/7 1`-ზე ცვლის. დაიწყეთ იმიჯის სრული პოლიტიკის ცხრილით და შეინარჩუნეთ მისი სხვა
ჩანაწერები: `label` ან `precedence` ჩანაწერის დამატება ნაგულისხმევ ცხრილს ანაცვლებს, ამიტომ ფაილი,
რომელიც მხოლოდ შეცვლილ ხაზს შეიცავს, არასაკმარისია.
[glibc-ის კონფიგურაციის ცნობარი](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ამ სემანტიკას აღწერს. შემოწმებული ფაილი `/etc/gai.conf`-ზე მხოლოდ წაკითხვის რეჟიმში
bind-mount-ით მიამაგრეთ და ცვლილების გამოსაყენებლად სერვისი ხელახლა შექმენით.

ეს იმ კონტეინერში **მთელი გამავალი ტრაფიკისთვის** ცვლის OS-ის მიერ მისამართების შერჩევას.
ის ყველა აპლიკაციას IPv6-ის არჩევას არ აიძულებს: Node-ის DNS-ის თანმიმდევრობასა და
კავშირის შერჩევასაც აქვს მნიშვნელობა. კერძოდ, `--dns-result-order=ipv4first` უპირატესობას IPv4-ს ანიჭებს
და მხოლოდ IPv4-სთან დაკავშირებული წარუმატებლობის გამოსავალი არ არის. იხილეთ
[Node-ის DNS-ის თანმიმდევრობა](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

ჰოსტის დონის ნებისმიერი ცვლილების შემდეგ ხელახლა შეამოწმეთ Gemini და თქვენი სხვა პროვაიდერები.
ცვლილების გასაუქმებლად წაშალეთ მორგებული `gai.conf`-ის mount, აღადგინეთ ქსელის წინა
კონფიგურაცია და ტექნიკური მომსახურების პერიოდში დაზარალებული სერვისი/ქსელი ხელახლა შექმენით.
ქსელის ხელახლა შექმნამ შეიძლება მასზე მიერთებული სხვა კონტეინერების მუშაობა შეაფერხოს;
არ წაშალოთ მუდმივი მონაცემების ტომი.

## მნიშვნელოვანი შენიშვნები

- **SQLite WAL რეჟიმი:** `docker stop`-ს უნდა მიეცეს დასრულების საშუალება, რათა OmniRoute-მა უახლესი ცვლილებების საკონტროლო წერტილი კვლავ `storage.sqlite`-ში ჩაწეროს. თანდართულ Compose ფაილებში გაჩერების საშეღავათო პერიოდად უკვე მითითებულია 40 წამი. თუ image-ს პირდაპირ უშვებთ, შეინარჩუნეთ `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** დააყენეთ `true`, თუ რეგულარული/ჩაწერამდე სარეზერვო ასლების შექმნა გარედან იმართება. არსებული მონაცემთა ბაზის მიგრაციებისთვის კვლავ საჭიროა საკუთარი, საიმედოდ შენახული უსაფრთხოების snapshot-ი და მასობრივი მიგრაციის დამცავი მექანიზმი.
- **მონაცემების მუდმივი შენახვა:** კონტეინერის ხელახლა გაშვებებს შორის მონაცემთა ბაზის, გასაღებებისა და კონფიგურაციების შესანარჩუნებლად ყოველთვის დაამაუნტეთ volume მისამართზე `/app/data`.
- **პორტის კონფიგურაცია:** ნაგულისხმევი `20128` პორტის შესაცვლელად გადააწერეთ `PORT` გარემოს ცვლადს.

## აგრეთვე იხილეთ

- [VM-ზე განთავსების სახელმძღვანელო](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare-ის გამართვა
- [Fly.io-ზე განთავსების სახელმძღვანელო](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io-ზე განთავსება
- [გარემოს კონფიგურაცია](../reference/ENVIRONMENT.md) — `.env`-ის სრული ცნობარი
