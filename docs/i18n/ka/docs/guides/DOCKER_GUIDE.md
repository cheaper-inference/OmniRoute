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

> **თვითმასპინძლობა ერთ ბრძანებაში?** იხილეთ [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (გამოქვეყნებული სურათი + Redis, მხოლოდ loopback-ზე, პროფილის არჩევანის გარეშე). სწრაფი გაშვება ქვემოთ არის ერთი კონტეინერის გზა მომხმარებლებისთვის, რომლებიც უკვე აწარმოებენ Redis სხვაგან.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## გარემოს ფაილით

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

## Dockerfile ეტაპები

საცავი აგზავნის მრავალსაფეხურიან Dockerfile-ს (`Dockerfile`). გამოვლენილია ოთხი ეტაპი; აირჩიეთ სწორი `target` თქვენი გამოყენების შემთხვევისთვის.

| სცენა         | ბაზის გამოსახულება    | მიზანი                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | აინსტალირებს deps (`npm ci --legacy-peer-deps`) და აწარმოებს `npm run build` (Turbopack ნაგულისხმევად — იხილეთ Build-time რესურსები ქვემოთ)                                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | წარმოების ხანგრძლივობა Next.js დამოუკიდებელი გამომავალით.** CLIs პროვაიდერი არ არის შეფუთული.**                                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | ამატებს `git`, `docker.io`, `docker-compose` და გლობალური CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** აირჩიე ეს აგენტური სამუშაო პროცესებისთვის.**                                                                                                            |
| `runner-web`  | `runner-base`         | ამატებს Playwright + Chromium ბრაუზერს (`--with-deps`) ვებ სესიების პროვაიდერებისთვის: `gemini-web`, `claude-web`, `claude-turnstile`.** აირჩიეთ ეს, როდესაც იყენებთ ამ პროვაიდერებს** — უბრალო სურათი მარცხდება მოთხოვნის დროს მის გარეშე (იხილეთ `-web` შენიშვნა გამოშვების არხების ქვეშ). |

შექმენით კონკრეტული მიზანი ხელით:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### მშენებლობის დროის რესურსები

სამი build args აკონტროლებს რა ღირს `builder` ეტაპი. ისინი აწყობენ მხოლოდ — `OMNIROUTE_MEMORY_MB` (ქვემოთ) არის ცალკე, გაშვების ღილაკი.

| აშენება არგ                 | ნაგულისხმევი | ეფექტი                                                                                              |
| --------------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` აშენებს ვებპაკეტს: მეხსიერების დაბალი პიკი, ნელი. `1` ირჩევს Turbopack.                         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | V8 გროვის ჭერი (`--max-old-space-size`) ქვირითის მქონე `next build` სთვის.                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | იკვებება `CIRCLE_NODE_TOTAL`; შემდეგი გამოდის `workers = N - 1` გვერდის მონაცემების შეგროვებისთვის. |

`OMNIROUTE_BUILD_WORKERS` არის ის, ვინც უნდა აღზარდოს დიდ მშენებელზე და ის, ვინც ეჭვობს, როდესაც შეზღუდული აშენება კვდება** შემდეგ** `✓ Compiled successfully`. თითოეული გვერდი-მონაცემების მუშაკი თავისი პროცესია, ისევე როგორც თავად მშობელი `next build` ; ცოცხალი VPS რეპროდუქცია (გამოცემა #7518) გაზომავდა თითოეული პროცესის პიკს RSS ~ 4,5 GB ზე, `NODE_OPTIONS` გროვის დროშისგან დამოუკიდებლად (Turbopack იკრიბება native/Rust მეხსიერებაში V8 გროვის გარეთ). `2` ის ნაგულისხმევი (→ 1 მუშაკი, სულ 2 პროცესი) არის ზომა 16 GB / 4 vCPU GitHub-ის მასპინძლებისთვის, რომელსაც იყენებს გამოქვეყნების მილსადენი. `8` ზე (→ 7 მუშა) ამ მორბენალს მეხსიერება და buildkit ამოიწურა `ResourceExhausted: ... cannot allocate memory` ის ნაბიჯი; `3` (→ 2 მუშა) ჯერ კიდევ არ ჯდებოდა, როგორც კი თითო პროცესის RSS პირდაპირ გაზომილი იყო დასკვნის ნაცვლად. `tests/unit/docker-build-memory-budget.test.ts` აკეთებს არითმეტიკას გაზომილი ფიგურის წინააღმდეგ და მარცხდება, თუ რომელიმე ღილაკი აჭარბებს მორბენალს.

Turbopack აგროვებს მშობლიურ Rust მეხსიერებაში, რომელიც ცხოვრობს** გარეთ** V8 გროვა, ამიტომ `OMNIROUTE_BUILD_MEMORY_MB` არ აკავშირებს მას. მეხსიერების ჭერის მქონე ჰოსტზე, build SIGKILLed OOM killer-ის მიერ შეცდომის ტექსტის გარეშე — უბრალოდ ჩერდება mid-`Creating an optimized production build`, რომელიც იკითხება როგორც გათიშული და არა მეხსიერების ამოწურვა. სწორედ ამიტომ `Dockerfile` ნაგულისხმევად არის webpack (`OMNIROUTE_USE_TURBOPACK=0`), განსხვავებით `npm run dev` / `npm run build`, სადაც Turbopack არის ნაგულისხმევი კოდი: შიშველი `docker build .` build args-ის გარეშე (რასაც Railway და სხვა ერთი დაწკაპუნებით აწარმოებენ) არ უნდა მოკვდეს ჩუმად მეხსიერებით დახურულ მშენებელზე. გამოქვეყნებული სურათები უკვე გადის `OMNIROUTE_USE_TURBOPACK=0` ცალსახად `docker-publish.yml` ში. მშენებელზე, რომელსაც ბევრი RAM აქვს, აირჩიე Turbopack უფრო სწრაფი აშენებისთვის:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ჩართულია, ამიტომ `next build` მართავს მშობელს** და** სამუშაო პროცესი და თითოეული პატივს სცემს `OMNIROUTE_BUILD_MEMORY_MB` ცალკე. გაზომეთ კონტეინერის ჭერი ამ მნიშვნელობის დაახლოებით ორჯერ ზემოთ და არა ერთხელ.

გაზომილი ამ ხეზე (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| ბუნდლერი  | კონტეინერის ჭერი | შედეგი                                       |
| --------- | ---------------- | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | OOM-მოკლული ორივე, ჩუმად                     |
| ვებპაკეტი | 8 GiB            | ააშენე მუშა SIGKILLed                        |
| ვებპაკეტი | 12 GiB           | წარმატებას მიაღწია, პიკს მიაღწია 11.1 GiB ზე |

### გაშვების ნაგულისხმევი დრო

ნაგულისხმევი ექსპორტირებული `runner-base` მიერ: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

მეხსიერების ქცევა Docker ში:

- გამოსახულება ადგენს `OMNIROUTE_MEMORY_MB=1024` და მისგან იღებს `NODE_OPTIONS=--max-old-space-size=1024`.
- სერვერის ფაქტობრივი პროცესი იწყება დამოუკიდებელი გამშვების მიერ, რომელიც კითხულობს `OMNIROUTE_MEMORY_MB` და ანიჭებს `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node იყენებს ბოლო განმეორებით `--max-old-space-size` მნიშვნელობას, ამიტომ `OMNIROUTE_MEMORY_MB` დაყენება აკონტროლებს Docker გროვის ეფექტურ ლიმიტს.
- იმის გამო, რომ გამოსახულება ყოველთვის ადგენს მას, გამშვების RAM-ით დაკალიბრებული სარეზერვო საშუალება არასოდეს გამოიყენება Docker ში. ცალსახად გაზარდეთ სამუშაო დატვირთვისთვის (ცხრილი ქვემოთ). `2048` ჯერ კიდევ ძალიან მცირეა კოდირების აგენტისთვის `/v1/responses`.

### Runtime RAM კოდირების აგენტებისთვის

1 GiB Docker ნაგულისხმევი არის dashboard/light-chat სართული და არა წარმოების ზომა. გრძელი `POST /v1/responses` სხეულები (ასობით შეტყობინება, ათობით ხელსაწყო) შეკუმშვის დროს ინარჩუნებს მეხსიერების მრავალ გრაფიკს. ორი გადაფარვითი ~ 3 MiB / ~ 750k-token მოთხოვნა შეწყდა V8-ზე** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) და ასევე მოხვდა 16 GiB cgroup OOM. იხილეთ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

ზომა** cgroup `--memory` გროვის ზემოთ** — მშობლიური ბუფერები, SQLite და შეკუმშვის შუალედური საშუალებები დევს V8-ის გარეთ.

| დატვირთვა                                 | `OMNIROUTE_MEMORY_MB`         | კონტეინერი / cgroup     | შენიშვნები                                                                                   |
| ----------------------------------------- | ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| დაფა, ერთი მსუბუქი ჩატი                   | `1024` (სურათის ნაგულისხმევი) | ≥2 GiB                  |                                                                                              |
| ერთი კოდირების აგენტი (Claude/Codex/Grok) | `8192`                        | ≥10 GiB                 | ტიპიური ერთჯერადი `/v1/responses`                                                            |
| ორი ერთდროული გრძელი `/v1/responses`      | `10240`–`12288`               | ≥12–16 GiB              | გაზომილი V8 შეწყვეტა ~ 12 GiB გროვაზე                                                        |
| სამი + თანმხლები გრძელი კონტექსტი         | ნუ ერთ პროცესზე               | სერიალიზაცია / მეტი RAM | ნაგულისხმევი მძიმე წონა არის 1 ფრენის დროს; RAM გარეშე მისი ამაღლება ხელახლა შემოაქვს აბორტს |

`omniroute serve` შიშველ ლითონზე კალიბრებს ~ 35% RAM (დაჭერილი `[512, 4096]`) როცა `OMNIROUTE_MEMORY_MB` არის** დაუყენებელი** . Docker ყოველთვის აყენებს `1024`, ისე, რომ კალიბრაცია არასოდეს აწარმოებს ოფიციალურ გამოსახულებას.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
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

## საპირისპირო პროქსი ქვეგზაზე (Traefik / nginx)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked value in a sentinel file at the app root (written during `npm run build`; read by `scripts/docker/ensure-docker-base-path.mjs`) and compares it with `OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was built for the domain root, the entrypoint rewrites the standalone manifests, the embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from `assetPrefix` alone — the patcher mirrors the subpath into it), the baked `/_next/static` asset URLs (client-reference manifests, media imports, prerendered error pages) and the client `process.env` shim before `node dev/run-standalone.mjs` runs.

### კონსტრუქციის შედგენა (რეკომენდირებულია)

დააყენეთ ორივე ცვლადი `.env` ში, შემდეგ აღადგინეთ ისე, რომ სურათი და გაშვების დრო შეთანხმდნენ:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` აგზავნის `OMNIROUTE_BASE_PATH`, როგორც Docker build-arg და როგორც გაშვების გარემოს ცვლადი.

### წინასწარ ჩაშენებული root გამოსახულება + გაშვების ქვებილიზა

გამოქვეყნებული `cheaperinference/omniroute:*` სურათები აგებულია დომენის root-ისთვის. თქვენ კვლავ შეგიძლიათ დააყენოთ `OMNIROUTE_BASE_PATH` გაშვების დროს; კონტეინერი აყენებს პაკეტს ერთხელ გაშვებისას. დააწყვილეთ იგი შესაბამის საჯარო წარმოშობასთან:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

კონფიგურაციის საპირისპირო პროქსი გადამისამართება** სავსე** გარე გზა (არ ჩამოართვათ პრეფიქსი). Traefik-მა უნდა გაატაროს `PathPrefix(`/omniroute `)` კონტეინერში `StripPrefix` გარეშე, ასე რომ Next.js იღებს `/omniroute/...` და ემსახურება აქტივებს `/omniroute/_next/...` დან.

Docker ჯანმრთელობის შემოწმება იკვლევს მსუბუქი `/healthz` სასიცოცხლო ციკლის საბოლოო წერტილს, რომელსაც პრეფიქსი აქვს აქტიური `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` რჩება ხელმისაწვდომი human/dashboard დიაგნოსტიკისთვის; კონტეინერის HEALTHCHECK უკან მისკენ მიმართვისთვის (მაგალითად ღრმა ჯანმრთელობის დაცვისთვის), დააყენეთ `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. ეს გზა არის ა** ღრმა** შეამოწმეთ (DB + მონიტორინგის შეჯამება) — შესაბამისი Docker ის იშვიათი `HEALTHCHECK` სთვის, თუ ისევ დაეთანხმებით, მაგრამ** არა** Kubernetes `livenessProbe` ინტერვალებისთვის.

ორკესტრებისთვის (კუბერნეტები, მომთაბარე და სხვ.):

| ზონდი               | ურჩევნია                                                               | მოერიდეთ                                                                                |
| ------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| სიცოცხლისუნარიანობა | HTTP `GET /livez`, ან TCP მთავარ პორტზე (`PORT`, ნაგულისხმევი `20128`) | `/api/monitoring/health` როგორც ცოცხალი                                                 |
| მზადყოფნა           | HTTP `GET /healthz`                                                    | მჭიდრო ქრონომეტრაჟები, რომლებიც განიხილება მოვლენის მარყუჟის დაკავებული, როგორც მკვდარი |
| ღრმა / შავი ყუთი    | `/api/monitoring/health`                                               | —                                                                                       |

`/healthz` აცნობებს პროცესის სასიცოცხლო ციკლს (`ok` / `starting` / `stopping`). `/livez` არის მხოლოდ პროცესი-ცოცხალი (200 როდესაც დამმუშავებელს შეუძლია გაშვება; ის არ ელოდება მზადყოფნას). ორივე კვლავ მუშაობს იმავე Node-ის მოვლენის მარყუჟზე, როგორც მოთხოვნის დამუშავება, ამიტომ CPU-ზე დაკავშირებულ კატალოგს ან შეკუმშვის მუშაობას შეუძლია მათი გადადება — დაკავებული ≠ dead. უპირატესობა მიანიჭეთ TCP liveness-ს, თუ HTTP გამოძიების დრო ამოიწურა. სრული კვლევითი სახელმძღვანელო: [მონიტორინგის სახელმძღვანელო — Kubernetes-ის გამოძიების რეკომენდაციები](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker შედგენა Caddy-ით (HTTPS Auto-TLS)

OmniRoute შეიძლება უსაფრთხოდ გამოაშკარავდეს Caddy-ის ავტომატური SSL უზრუნველყოფის გამოყენებით. დარწმუნდით, რომ თქვენი დომენის DNS ჩანაწერი მიუთითებს თქვენი სერვერის IP ზე.

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

Caddy ადგენს სტანდარტული გადამისამართების სათაურებს ზედა დინების კონტეინერისთვის. OmniRoute იყენებს `NEXT_PUBLIC_BASE_URL` როგორც კანონიკურ საჯარო საწყისს OAuth გამოხმაურებისა და გენერირებული საჯარო ბმულებისთვის; ავთენტიფიცირებული დაფაზე წერს გამოიყენეთ იგივე წარმოშობის მოთხოვნები, პლუს სესიაზე მიბმული CSRF დაცვა. ჩართეთ `OMNIROUTE_TRUST_PROXY` მხოლოდ გაფართოებული განლაგებისთვის, სადაც განზრახ გსურთ, რომ OmniRoute საჯარო წარმოშობა სანდო გადაგზავნილი სათაურებიდან გამოიტანოს აშკარა კონფიგურაციის ნაცვლად.

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

## სურათის ტეგები

| გამოსახულება                 | მონიშნეთ | ზომა     | აღწერა                                                     |
| ---------------------------- | -------- | -------- | ---------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB | უმაღლესი** გამოქვეყნდა** სტაბილური SemVer (არა git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB | ჩამაგრება ამ კლასის ტეგი GitOps სთვის                      |

იგივე სურათები გამოქვეყნებულია სამ საცავში, ერთნაირი არქიტექტურული შეჯამებით: `cheaperinference/omniroute` (Docker Hub, უფრო იაფი დასკვნის ორგანიზაცია, 3.8.53-დან), `ghcr.io/cheaper-inference/omniroute` და მემკვიდრეობითი `diegosouzapw/omniroute`, რომელიც ინარჩუნებს თავის მოზიდვის ისტორიას და კვლავ იღებს ყოველ გამოშვებას. არსებული `diegosouzapw/omniroute` განლაგება განახლდება; სურათის სახელის შეცვლა არჩევითია. `:next` / `:next-web` წინასწარი გამოშვების არხი ქვემოთ გამოქვეყნებულია მხოლოდ `diegosouzapw/omniroute` და GHCR ზე.

მრავალპლატფორმიანი მანიფესტი: `linux/amd64` + `linux/arm64` მშობლიური (Apple Silicon, AWS Graviton, Raspberry Pi). Docker ავტომატურად ირჩევს შესაბამის არქიტექტურას; გაიარეთ `--platform linux/amd64` თუ გჭირდებათ AMD64 ემულაციის იძულება ARM ჰოსტებზე.

### არხების გამოშვება

OmniRoute აქვეყნებს ცალკეულ Docker არხებს სტაბილური გამოშვებებისთვის, აქტიური გამოშვების ფილიალების ტესტირებისთვის და განვითარების კონსტრუქციებისთვის.

| არხი                            | წყარო                                       | ცვალებადობა                               | რეკომენდებული გამოყენება                                                                                                                        |
| ------------------------------- | ------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned გათავისუფლება              | შეუცვლელი                                 | წარმოების განლაგება, რომელიც ამაგრებს ზუსტ გამოშვებას                                                                                           |
| `:latest` / `:latest-web`       | უმაღლესი** გამოქვეყნდა** სტაბილური SemVer   | ცვალებადი სტაბილური მაჩვენებელი           | მიჰყვება სტაბილურ გამოშვებებს** შემდეგ** SemVer აქვეყნებს სამუშაოს — აკეთებს** არა** აკონტროლეთ `main` ან გამოუქვეყნებელი `release/v*` ჩადენები |
| `:next` / `:next-web`           | მიმდინარე ნაგულისხმევი `release/v*` ფილიალი | ცვალებადი წინასწარ გამოშვების მაჩვენებელი | ტესტირების შესწორებები, რომლებიც მოხვდა აქტიური გამოშვების ფილიალში, მაგრამ ჯერ არ არის სტაბილური გამოშვება                                     |
| `:main` / `:main-web`           | `main` ფილიალი                              | ცვალებადი განვითარების მაჩვენებელი        | მხოლოდ განვითარებისა და ინტეგრაციის ტესტირება                                                                                                   |

#### ვებ სესიის პროვაიდერები: `-web` სურათები

ზემოთ მოყვანილი ყველა არხი მოქმედებს როგორც `-web` ტეგი (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), აგებულია `runner-web` ეტაპიდან — იგივე სურათი პლუს Playwright და Chromium ბრაუზერი. უბრალო გამოსახულება გემები** გარეშე** ქრომი; `gemini-web`, `claude-web` და `claude-turnstile` სჭირდება.

წარუმატებლობა გადაიდო და არა გაშვების დრო: ეს პროვაიდერები ჩამოთვლიან თავიანთ მოდელებს და აჩვენებენ, როგორც დაკავშირებულებს დაფაზე, და მხოლოდ პირველი მოთხოვნა ვერ ხერხდება

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

თუ თქვენ იყენებთ ამ პროვაიდერებს, გაიყვანეთ `-web` ტეგი იმ არხის, რომელზეც უკვე ხართ — სხვა არაფერი იცვლება. npm/CLI ინსტალაციისას ( Docker გამოსახულების გარეშე), ექვივალენტი დაკარგული ნაწილია ბრაუზერის ორობითი: გაუშვით `npx playwright install chromium` ჰოსტზე.

#### წინასწარი გამოშვების არხის გამოყენება

`next` არხი ხელახლა აშენდება მიმდინარე ნაგულისხმევი `release/v*` ფილიალში ყოველი დაჭერისას და გამოქვეყნებულია როგორც AMD64 ასევე ARM64 სთვის. ძველი ტექნიკური ფილიალებს არ შეუძლიათ მისი გადაწერა. არხი უზრუნველყოფს ამოსაღებ სურათს შესწორებებისთვის, რომლებიც გაერთიანდა აქტიურ გამოშვების ფილიალში შემდეგი სტაბილური ტეგის ამოჭრამდე.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose-ისთვის, გადააფარეთ არჩეული პროფილის მიერ გამოყენებული სურათის ტეგი, შემდეგ გაიყვანეთ და ხელახლა შექმენით სერვისი:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### უსაფრთხოება და უკან დაბრუნება

`next` არის მცურავი წინასწარი გამოშვების არხი. ის შეიძლება შეიცვალოს აქტიური გამოშვების ფილიალზე ნებისმიერი ბიძგისას და არის** არ არის მხარდაჭერილი საწარმოო გამოყენებისთვის** . სურათის დაიჯესტის ჩამაგრება კონკრეტული კონსტრუქციის შეფასებისას:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

ტესტირებამდე შექმენით OmniRoute მონაცემთა მოცულობის სარეზერვო ასლი ან Bind-ზე დამონტაჟებული მონაცემთა დირექტორია. უკან დასაბრუნებლად, აღადგინეთ ადრე გამოყენებული სტაბილური ვერსია ან დაიჯესტი და ხელახლა შექმენით კონტეინერი:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

გამოშვების განშტოება ვერასოდეს მოძრაობს `latest`; მხოლოდ დასაშვები სტაბილური სემანტიკური ვერსია შეიძლება ხელი შეუწყოს სტაბილური მაჩვენებელი. `next` გამოსახულებები ინარჩუნებს გამოსახულების ინსპექტირებას და ბლოკავს კრიტიკული დაუცველობის კარიბჭეს.

**`latest` არ არის ვალუტის გარანტია git-ისთვის.** გაერთიანებული შესწორებები `main` ზე ან აქტიურ `release/v*` ფილიალზე არის** არა** `:latest` ში, სანამ არ გამოქვეყნდება სტაბილური SemVer სურათი და გამოქვეყნების სამუშაო ხელს შეუწყობს `:latest` (იგივე დაიჯესტი, რაც SemVer). თუ `latest` გამოიყურება გაყინული, ხოლო GitHub უკვე აჩვენებს გამოსწორებას, გაიყვანეთ `:next` გამოშვების ტოტის შესამოწმებლად ან დაელოდეთ SemVer ტეგს.

| გინდა                                                                       | გამოყენება                         |
| --------------------------------------------------------------------------- | ---------------------------------- |
| GitOps / წარმოება, რომელიც არ უნდა დრიფტიდეს                                | Pin `:X.Y.Z` (ან სურათის დაიჯესტი) |
| მიჰყევით გამოქვეყნებულ თავლებს და მიიღეთ ხელახლა შექმნა თითოეულ გამოშვებაზე | `:latest`                          |
| გამოუქვეყნებელი `release/v*` ს ტესტირება                                    | `:next` (არა წარმოება)             |
| ტესტი `main`                                                                | `:main` (არა წარმოება)             |

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

## ხელმისაწვდომობა: ნაგულისხმევი SQLite არის ერთჯერადი რეპლიკა

საფონდო Docker / Kubernetes OmniRoute არის** ერთი Node პროცესი + ერთი SQLite დამწერი** . მაღალი ხელმისაწვდომობაა** არ არის მხარდაჭერილი** იმ ტოპოლოგიაზე.

| შეზღუდვა                                        | შედეგი                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| მარტოხელა მწერალი                               | გააკეთე** არა** გაუშვით მრავალი ასლი ერთი და იგივე SQLite ფაილის წინააღმდეგ. ეს აფუჭებს DB.                                                                                                                                                                                                                                      |
| ხელახლა შექმნა / გადატვირთვა / HEALTHCHECK kill | **სრული გათიშვა** ფრენის დროს SSE, დაფის სესიები და მეხსიერების მდგომარეობა. ყველა დაკავშირებული კლიენტი იკლებს. ცარიელი ბოლო წერტილის ფანჯრის დროს ახალი მოთხოვნები იღებენ საპირისპირო პროქსის**`502 Bad Gateway: Unknown error`** , არა OmniRoute JSON — კლიენტები ამას ვერ განასხვავებენ პროვაიდერის უკმარისობისგან (#11015). |
| იგივე მოვლენის ციკლი, როგორც `/healthz`         | დატვირთულ კატალოგს ან შეკუმშვის ტკიპს შეუძლია ზონდების გადადება; მოკლე ტაიმაუტი, შემდეგ ხელახლა იწყება** მხოლოდ** რეპლიკა.                                                                                                                                                                                                       |

**ზონდის მატრიცა** (იხილეთ აგრეთვე [Kubernetes-ის გამოძიების რეკომენდაციები](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| ზონდი               | სამიზნე                                                        | არ გამოიყენოთ                                                                           |
| ------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| სიცოცხლისუნარიანობა | TCP `PORT` ზე (ნაგულისხმევი `20128`), ან რბილი HTTP `/healthz` | `/api/monitoring/health`                                                                |
| მზადყოფნა           | HTTP `GET /healthz`                                            | მჭიდრო ქრონომეტრაჟები, რომლებიც განიხილება მოვლენის მარყუჟის დაკავებული, როგორც მკვდარი |
| ღრმა / ადამიანები   | `/api/monitoring/health`                                       | ავტომატური კუბელეტის სიცოცხლე                                                           |

**განახლებები:** ველით, რომ ყოველი სესია შემცირდება. კლიენტების გადინება თუ შეგიძლიათ; არ არის მოძრავი განახლება ნაგულისხმევ SQLite ზე. შედგენა `restart: unless-stopped` პლუს Docker `HEALTHCHECK` ასევე ჩაანაცვლებს ერთადერთ პროცესს, როდესაც კონტეინერი არის არაჯანსაღი - იგივე აფეთქების რადიუსი.

მზა მანიფესტები და Helm დიაგრამა ცოცხალი `deploy/kubernetes/` და `deploy/helm/omniroute/` - იხილეთ [Kubernetes-ის განლაგების სახელმძღვანელო](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

კუბერნეტის ფრაგმენტი ა** ერთჯერადი რეპლიკა** (აუცილებელია ხელახლა შექმნა; არ დააყენოთ `replicas` ერთ SQLite ფაილზე):

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

`preStop` ძილის საშუალებას აძლევს Kube-ს ჩამოაგდოს სერვისის ბოლო წერტილები SIGTERM მდე** ახალი** მოძრაობა წყვეტს მომაკვდავის პროცესს. ფრენის დროს `/v1/responses` SSE იშლება `SHUTDOWN_TIMEOUT_MS` მდე (ნაგულისხმევი 30 წლები) მძიმე წონის დაშვების იჯარით (#11015). ახალი მოთხოვნები, რომლებიც კვლავ აღწევს პროცესს, მიიღება `503` + `Retry-After: 5`. ცარიელი ბოლო წერტილის უფსკრული ხელახლა შექმნა, სანამ ჩანაცვლება მზად არ იქნება, რჩება რთულ გათიშვა - ეს არის SQLite ტოპოლოგია და არა ზონდის არასწორი კონფიგურაცია.

გარე Postgres / მრავალ დამწერი HA არის** არა** დოკუმენტირებული მარაგის გზა. თუ გჭირდებათ HA, შეინახეთ ერთი ასლი ან გაუშვით ტოპოლოგია, რომელიც პროექტმა გამოსცადა და დოკუმენტურად ცალკე. Postgres/MySQL ნამუშევარი ცხოვრობს [#8075-](https://github.com/diegosouzapw/OmniRoute/issues/8075) ში. მანამ, სანამ გემები, გამრავლების ერთადერთი მხარდაჭერილი გზა** დიდი** `/v1/responses` სიმძლავრე არის N დამოუკიდებელი პროცესი (შემდეგი სექცია) და არა `replicas > 1` ერთ ტომზე.

## მასშტაბირება: N დამოუკიდებელი პროცესი

### Codex ნიშნის როტაციის საკუთრება

ერთი Codex ანგარიშის ასლებმა დამოუკიდებლად არ უნდა მოიხმარონ მისი ერთჯერადი განახლების ნიშანი. იმ შემთხვევებზე, რომლებიც მოიხმარენ მხოლოდ სინქრონიზებულ რწმუნებათა სიგელებს, დააყენეთ `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (ასევე `cx`). დატოვე ის დაუყენებელი ერთი ბრუნვის მფლობელზე. თითოეულ პროცესს ჯერ კიდევ სჭირდება საკუთარი `DATA_DIR`; ეს ვარიანტი არც SQLite იზიარებს და არც აწვდის ტოკენის სინქრონიზაციას ან განაწილებულ საკეტს.

პასიური ინსტანცია ხელახლა კითხულობს კავშირს, როდესაც საჭიროა განახლება და იღებს მხოლოდ განსხვავებულ, ვადაგადაცილებულ წვდომის ჟეტონს. წინააღმდეგ შემთხვევაში განახლება გამორთულია კავშირის ვადის ამოწურვის ან გამორთვის ან განახლების ამომრთველის წარუმატებლობის დათვლის გარეშე. ავთენტიფიკაციის რეალური წარუმატებლობები კვლავ იყენებენ ნორმალური წარუმატებლობის აღრიცხვას, ექსპონენციალურ გაგრილებას და კლიენტის ნორმალურ შეცდომას; ანგარიშის დეაქტივაცია მუდმივი რჩება. წვდომის ტოკენების ვადის ამოწურვამდე მოახდინე მფლობელის შემობრუნებული ჟეტონების სინქრონიზაცია (ნაგულისხმევი პროაქტიული განახლების ლოდინი არის ხუთი წუთი), ან ხელახლა შემოიტანეთ Codex auth ფაილი. პასიური იმპორტი ინახავს მოწოდებულ ტოკენებს ტოკენის ბოლო წერტილში მათი ვალიდაციის გარეშე. მექანიკური dashboard/API განახლება აბრუნებს `409 refresh_disabled`; ახალი OAuth შესვლა უცვლელია. იხილეთ [გარემოს მითითება](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

ერთი კვანძის პროცესია** ერთი V8 გროვა** . ორი გადახურული ~ 3 MiB / ~ 750k-token კოდირების აგენტი `POST /v1/responses` (RTK + Caveman) შეწყვეტს ამ გროვას ~ 12 Gi (`FATAL ERROR: Reached heap limit`) და შეუძლია OOM a 16 Gi cgroup. იხილეთ [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). ეს გაზომვა არის ა** მეხსიერება-ბიუჯეტი** გაფრთხილება, არ არის პროდუქტის მყარი მაქსიმუმი ორი ერთდროული ხანგრძლივი `/v1/responses`. მძიმე წონის ჩეთის დაშვება შემოიფარგლება ავტომატური შეყვანის ბაიტის ბიუჯეტით (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) ზომით იმავე V8/cgroup ჭერიდან — რომელიც აჭარბებს მას ზევით (ან მოძველებული `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` მოთხოვნის დათვლის ლიმიტის დაყენება) უკვე ზომის პროცესზე ხელახლა შემოაქვს შეწყვეტა. მცირე ჩეთები, `/healthz`, `/v1/models` და MCP არის** არა** იმ ქუდში.

### ერთი პროცესი: ორზე მეტი გრძელი `/v1/responses`

ა** ჯანსაღი** პროცესი (გროვა `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ქვემოთ, ნაგულისხმევი `0.75`)** მაისი** გაუშვით ორზე მეტი ერთდროული გრძელი `POST /v1/responses` როდესაც პროცესის მასშტაბით ბიუჯეტში (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ჯერ კიდევ არის ადგილი. სხეულები `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ზე ან ზემოთ (ნაგულისხმევი 256 KiB) იღებენ იგივე მძიმე წონას, როგორც სტრუქტურისთვის მძიმე მოთხოვნები და იყენებენ იგივე [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). ათობით ერთდროულად ხანგრძლივი SSE კლიენტი (ოპერატორებს ხშირად სჭირდებათ 40–50) არის a** მეხსიერება-ბიუჯეტი** შეკითხვა — ზომის გროვა + primary/headroom სლოტები + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — არ არის მკაცრი „მაქს 2“ პროდუქტის ლიმიტი. ზეწოლის ქვეშ გროვა კვლავ იშლება ხელახლა საცდელ `503` ით, ასე რომ #7849 არ დაბრუნდება.

რომ** გროვის გამრავლება** (დამოუკიდებელი V8 ძველი სივრცეები)** დღეს** :

| გააკეთე                                                                                                                                              | ნუ                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| გაიქეცი** ნ containers/pods** , თითოეულს თავისი** საკუთარი** `DATA_DIR` / მოცულობა                                                                   | დააყენეთ `replicas > 1` ერთი SQLite ფაილის წინააღმდეგ                    |
| ზომა მძიმე ფრენის დროს + ჯანსაღი თავსახურიდან გროვა / ფრენის ბაიტი ბიუჯეტიდან; 1–2 არის კონსერვატიული #7849 ნაგულისხმევი და არა მყარი პროდუქტის მაქს | მიეცით ერთ პროცესს 8 × RAM და შეუზღუდავი რაოდენობის ქუდი                 |
| სურვილისამებრ: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for** საერთო კვოტების მრიცხველები**                                              | მოექეცით Redis როგორც გაზიარებულ SQLite — ეს ასე არ არის                 |
| პროვაიდერის საიდუმლოების დუბლიკატი თითოეულ ინსტანციაში (ან მიიღეთ დანაწევრებული საინფორმაციო დაფები)                                                 | ველით ერთ საინფორმაციო დაფას / ერთ ზარის ჟურნალს სხვადასხვა ინსტანციებში |
| წინა ნებისმიერი დატვირთვის ბალანსერით; საკმარისია API კლავიშის ან სესიის დამაგრება                                                                   | მოითხოვეთ გამყიდველის სპეციფიკური ზომის საშუალო პროგრამა                 |

სესიის ანგარიშთან კავშირი ასევე შეიძლება გაზიაროთ Redis მეშვეობით: დააყენეთ `OMNIROUTE_SESSION_AFFINITY_STORE=redis` და `REDIS_URL` თითოეულ პროცესზე, იგივე `REDIS_KEY_PREFIX` და დადებითი `sessionAffinityTtlMs` პარამეტრით. ქინძისთავები წყვეტს ჰეშირებული გამოყენების ანგარიშის იდენტიფიკაციებს თითოეული პროცესის დასაშვებ ლოკალურ კავშირთან, ამიტომ OAuth ანგარიშებს შესაბამისი პირადობის მეტამონაცემებით არ უნდა ჰქონდეს შესაბამისი კავშირი IDs. ანგარიშის ცნობილი ვინაობა უპირატესობას ანიჭებს წინააღმდეგობრივ ადგილობრივ IDs პინის გარჩევადობასა და დაცულ გამოსახლებაში; ჩანაწერები პირადობის გარეშე (ან გამოსახლების მომწოდებლები პირადობის გარეშე) ინარჩუნებენ მემკვიდრეობით ID მცველს. სტაბილური გამოყენების იდენტიფიკაციის გარეშე ანგარიშები კვლავ მოითხოვს IDs შესატყვისს. Redis შეცდომები ან ზარები 100 ms-ზე მეტი უბრუნდება ადგილობრივ SQLite. თითოეული Redis affinity store ზღუდავს გამორჩეულ ოპერაციებს 8-ზე, გვერდს უვლის Redis მაშინვე, როცა სავსეა და ათავისუფლებს სლოტებს მხოლოდ მაშინ, როდესაც ძირითადი სამუშაო წყდება და არა აბონენტის ბოლო ვადაში. Redis გათიშვის დროს არ არსებობს საერთო სიმართლე: ყოველი ინსტანცია უბრუნდება საკუთარ ლოკალურ კავშირს, სესიები შეიძლება ხელახლა ჩამაგრდეს თითო შემთხვევაზე ერთხელ და ინსტანციები შეიძლება განსხვავდებოდეს. წებოვნება ხელახლა კონვერგირდება Redis მეშვეობით, როდესაც ის აღდგება. ვადის ამოწურვა საზღვრავს ლოდინს და არა გაგზავნილ EVAL, რომელიც შეიძლება დაეშვას უკან დაბრუნების შემდეგ. მარშრუტიზაციის წერები შეადარეთ ზუსტი მნიშვნელობა, რომელიც შეინიშნება მარშრუტიზაციის გადაწყვეტილებით და არა მუტაციის დროის ახალი წაკითხვით; დაკვირვებული გამოტოვება ან SQLite სარეზერვო დაკვირვება შედარებულია როგორც Redis გასაღების არარსებობა. მოძველებული ქინძისთავები იცვლება ერთ CAS ში, ამიტომ გვიან ბრძანებას არ შეუძლია შეცვალოს ან წაშალოს უფრო ახალი, განსხვავებული პინი. Redis კითხულობს ატომურად დაბრუნებას და სერვერის დარჩენილ TTL მნიშვნელობას; დადებითი PTTL (ან ვადის გასვლის გარეშე) განსაზღვრავს სიცოცხლისუნარიანობას და არა მწერლის JSON დროის ნიშანს ან მკითხველის საათს. ლოკალური სნეპშოტები ასახავს, რომ დარჩენილი TTL ლოკალურ ვადამდე; არსებული JSON კლავიშები რჩება იკითხებადი და მათი დაუმუშავებელი ბაიტები ინახება CAS სთვის. Redis არის ჭეშმარიტების ერთადერთი წყარო, როდესაც ის პასუხობს. დადასტურებული გაზიარებული ასლები, შეხება და წაშლა წაშლის ლოკალურ ჩანაწერს, არასოდეს დააინსტალიროთ ან განაახლოთ იგი. SQLite Redis გზაზე ინახავს მხოლოდ ამ ინსტანციის საკუთარ სარეზერვო გადაწყვეტილებებს Redis შეცდომების, დროის ამოწურვის ან დაშვების გაჯერების შესახებ, TTL-ით შემოსაზღვრული როგორც ადრე. მოგვიანებით გათიშვისას დაკარგული ლოკალური პინი ღირს ერთი ახალი არჩევანი (ერთი სწრაფი ქეშის გამოტოვება) და არა არასწორი ან გამოდევნილი ანგარიში. უარყოფილი ზეერტები აბრუნებს გაზიარებულ გამარჯვებულს და მის დარჩენილ TTL ატომურად: ჩვეულებრივი შერჩევა ხელახლა ამოწმებს შედგენილ ლოკალურ ვადას და იყენებს ჯერ კიდევ ცოცხალ ნებადართულ გამარჯვებულს, ეხება ამ ანგარიშის გამოყენებას და შესვლას სხვა გაზიარებული ჩაწერის გარეშე. თუ ის მიუწვდომელია, შერჩევა ინარჩუნებს ადგილობრივ კანდიდატს, ტოვებს გაზიარებულ პინს უცვლელად და გამოსცემს ერთ გამართვის შეტყობინებას. უარყოფილი CAS არ წერს SQLite; Redis შეცდომები, ვადები ან დაშვების გაჯერება ვრცელდება არსებულ ლოკალურ ოპერაციაზე. თუ გაგზავნილი მუტაციის პასუხი მოვიდა დროის ამოწურვის შემდეგ (მიღებული, უარყოფილი ან შეცდომა), სინქრონული ზუსტი სერიული მნიშვნელობის შედარება-წაშლა ამოიღებს მხოლოდ ბაიტის იდენტური ვადის ამოწურვის რიგს. ამ შედარებასა და წაშლას შორის მოლოდინი არ არის; შენახულია ახალი გათიშვის ჩანაწერი. დაცული გამოსახლება აშორებს წარუმატებელი ანგარიშის საკუთარ ლოკალურ პინს, თუნდაც Redis ქვემოთ, და კვლავ ასუფთავებს მას დადასტურებული გაზიარებული გამოსახლების შემდეგ. ადრე გაზიარებული პასუხების მომლოდინე ვერ აღადგენს გამოძევებულ ლოკალურ პინს, რადგან გაზიარებულ წარმატებებში არასოდეს იწერება SQLite. მოგვიანებით გათიშვას შეუძლია ანგარიშის ხელახლა ჩაწერა; მოგვიანებით მიღებული საერთო ჩაწერა არსებობს მხოლოდ Redis ში. Redis გამოტოვებულები არ ამოწმებენ ადგილობრივ სარეზერვო მდგომარეობას. როდესაც მძღოლი გამორთულია, ახლად შერჩეული ქინძისთავები ინარჩუნებენ მემკვიდრეობით ოთხ ველს SQLite JSON ფორმას; მხოლოდ Redis მარშრუტიზაცია ამატებს ჰეშირებული ანგარიშის იდენტურობას. წინასწარ მოპოვებული ქინძისთავები ხელახლა შემოწმდება მათი ვადის გასვლის საზღვრებზე. Redis არასაიჯარო შერჩევა ხელახლა კითხულობს მაღაზიას, მაგრამ იჯარის სინქრონულ დაგეგმვას მაინც შეუძლია გამოიყენოს ქინძისთავის გამოძევება წინასწარ ამოღებასა და დაგეგმვას შორის (მიღებული საუკეთესო ძალისხმევის ფანჯარა). იჯარის ვალდებულება არ შეუძლია ანგარიშების შეცვლა გრძელვადიანი საჩივრის შემდეგ: უარყოფილ განცხადებაზე ის ინარჩუნებს მოთხოვნილ კანდიდატს მხოლოდ ამ მოთხოვნისთვის და ტოვებს გაზიარებულ გამარჯვებულს ხელუხლებლად, ასე რომ, შეთანხმება ინსტანციებში შემოიფარგლება ამ გზაზე. ცხრილის დანარჩენი ნაწილი კვლავ მოქმედებს: ეს არ იზიარებს კომბინირებული სესიის წებოვნებას, მშობლიურ Codex შემობრუნების პინებს, ანგარიშის სემაფორებს, ჩაკეტვას, ხარჯვის ლიმიტებს, კონფიგურაციას ან ზარის ჟურნალებს.

აპარატურა: თითო მაგალითის პარალელურად ხანგრძლივი `/v1/responses` არის a** მეხსიერება-ბიუჯეტი** შეკითხვა (heap + inflight-byte / #10110). `N` დამოუკიდებელი `DATA_DIR` s კვლავ ამრავლებს გროვებს: მასპინძელმა RAM უნდა ფარავდეს `N × cgroup` და არა „ერთი 16 Gi pod N = 8-ით“. არასოდეს `replicas > 1` ერთ SQLite ფაილზე.

შეადგინეთ ესკიზი (ორი გროვა, ორი ტომი — და არა `deploy.replicas: 2`):

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

პროცესის სიმკვრივე (შეკუმშვა HTTP იზოლაციიდან) არის [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). ერთი ლოგიკური კლასტერი გაზიარებულ მდგრად მდგომარეობაზე არის [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
