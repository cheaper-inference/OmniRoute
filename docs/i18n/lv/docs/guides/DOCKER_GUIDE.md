# 🐳 Docker Guide — OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Pilnīga Docker izvietošanas uzziņa. Lai ātri sāktu darbu, skatiet [README Docker sadaļu](../README.md#-docker).

## Satura rādītājs

- [Ātrā palaišana](#quick-run)
- [Ar vides failu](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Pieejamie profili](#available-profiles)
- [Resursdatora CLI rīku konfigurēšana, kad OmniRoute darbojas Docker vidē](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis blakuskonteiners](#redis-sidecar)
- [Produkcijas Compose konfigurācija](#production-compose)
- [Dockerfile posmi](#dockerfile-stages)
- [Kritiskie vides mainīgie](#critical-environment-variables)
- [Docker Compose ar Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare ātrais tunelis](#cloudflare-quick-tunnel)
- [Attēlu tagi](#image-tags)
- [Informācijas paneļa atjauninājumi Docker vidē](#dashboard-updates-in-docker)
- [Pieejamība: noklusējuma SQLite atbalsta vienu repliku](#availability-default-sqlite-is-single-replica)
- [Gemini reģionālās kļūdas Docker vidē](#gemini-regional-errors-inside-docker)
- [Svarīgas piezīmes](#important-notes)

---

## Ātrais skrējiens

> **Pašapkalpošanās vienā komandā?** Skatiet [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (publicēts attēls + Redis, tikai cilpa, nav profila izvēles). Tālāk sniegtā Quick Run ir viena konteinera ceļš lietotājiem, kuri jau izmanto Redis citur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Ar vides failu

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
# Pamata profils (bez CLI rīkiem)
docker compose --profile base up -d

# CLI profils (iebūvēti Claude Code, Codex un OpenClaw)
docker compose --profile cli up -d

# Resursdatora profils (galvenokārt Linux videi; montē resursdatora CLI bināros failus tikai lasīšanas režīmā)
docker compose --profile host up -d

# Tīmekļa profils (Chromium/Playwright tīmekļa sesiju nodrošinātājiem)
docker compose --profile web up -d

# Apvienojiet CLI un CLIProxyAPI blakuskonteineru
docker compose --profile cli --profile cliproxyapi up -d
```

## Pieejamie profili

OmniRoute ietver Compose profilus galvenajiem izvietošanas variantiem. Izvēlieties savai videi atbilstošo.

| Profils              | Pakalpojums      | Kad izmantot                                                                                                                                                   | Komanda                                      |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (noklusējuma) | `omniroute-base` | Bezgalvas serveris / minimāla izpildvide bez komplektācijā iekļautiem nodrošinātāju CLI                                                                        | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Aģentu darbplūsmas, kas izsauc `omniroute providers/setup/doctor`, un komplektācijā iekļautie CLI (Codex, Claude Code, Droid, OpenClaw)                        | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Linux resursdatori, kuri vēlas `network_mode` līdzīgu piekļuvi resursdatora CLI, montējot `~/.local/bin`, `~/.codex`, `~/.claude` u.c. tikai lasīšanas režīmā  | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Palaidiet [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) blakuskonteineru portā `8317` augšupstraumes CLI starpniekservera nodrošināšanai         | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Tīmekļa sesiju nodrošinātāji, kuriem nepieciešama pārlūkprogramma: `gemini-web`, `claude-web`, `claude-turnstile` (izveido `runner-web`; Chromium ir iekļauts) | `docker compose --profile web up -d`         |

> Var apvienot vairākus profilus: `docker compose --profile cli --profile cliproxyapi up -d`.

## Resursdatora CLI rīku konfigurēšana, kad OmniRoute darbojas Docker vidē

`omniroute setup-codex`, `setup-claude`, `config set <tool>` un informācijas paneļa
poga **Saglabāt konfigurāciju** raksta failus, piemēram, `~/.codex/*.config.toml`. Šiem ceļiem
ir nozīme tikai datorā, kurā faktiski darbojas CLI. Ja šīs komandas izpilda
konteinerā, rakstīšana notiek paša konteinera mājas direktorijā (`/home/node` —
attēls darbojas ar `USER node`), kuru neviens resursdatora CLI nekad nelasīs un kuras saturs tiek
atmests brīdī, kad konteiners tiek izveidots no jauna.

OmniRoute to nosaka un atsakās veikt rakstīšanu, tā vietā sniedzot norādījumus,
nevis ziņojot par panākumiem, kurus nevar izmantot: CLI beidz darbu ar kodu `2`, un API atbild ar `422`
un `containerEphemeralTarget: true`.

### Ieteicams: palaidiet CLI resursdatorā, bet OmniRoute — Docker vidē

Konteiners nodrošina API; CLI konfigurē jūsu resursdatora rīkus.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # norādiet CLI izmantot konteineru
omniroute setup-codex                      # raksta īstajā ~/.codex direktorijā jūsu resursdatorā
```

Šī ir pareizā izvēle, ja Codex, Claude Code, Cursor vai līdzīgi rīki darbojas jūsu
klēpjdatorā — un tas ir ierastais uzstādījums.

### Alternatīva: piesaistiet resursdatora konfigurācijas direktorijus (`host` profils)

Ja vēlaties, lai pats konteiners rakstītu jūsu resursdatora konfigurācijā, piemontējiet
direktorijus un norādiet `CLI_CONFIG_HOME` uz montējuma saknes direktoriju. `host` profilā
tas jau ir izdarīts:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Piesaistes montējums padara ceļu uzticamu: OmniRoute nolasa
`/proc/self/mountinfo` un atļauj rakstīšanu montētos ceļos (kā arī direktorijos,
kuru apakšdirektoriji ir montējumi, kas precīzi atbilst iepriekš redzamajai `/host-home` struktūrai), vienlaikus
joprojām atsakot rakstīšanu nemontētos ceļos.

### Avārijas risinājums: konfigurējiet paša konteinera CLI (izmantojiet apdomīgi)

Ja CLI patiešām atrodas konteinerā (`cli` profilā), rakstīšana
ir apzināta. Nododiet `--allow-container-write` jebkurai `setup-*` komandai vai iestatiet
serverim `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Rakstīšana tiek veikta
ar brīdinājumu, ka izmaiņas pēc konteinera darbības beigām netiks saglabātas.

> **Drošības brīdinājums — `cli` profils + `docker.sock` montējums.**
> `cli` profils piesaistes veidā montē `/var/run/docker.sock`, lai konteinerā esošais
> automātiskais atjauninātājs varētu no jauna izveidot steku, izmantojot resursdatora dēmonu
> (`src/lib/system/autoUpdate.ts` pārbauda šīs ligzdas esamību un izlaiž
> Docker ceļu, ja tās nav). Šī ligzda ir **resursdatora root līmeņa uzticamības
> robeža**: jebkas, kas tai var piekļūt, vada resursdatora Docker dēmonu kā
> root — tas var izveidot, pārbaudīt, apturēt un noņemt jebkuru konteineru resursdatorā.
> Sekas:
>
> 1. **Nekad nepadariet `cli` profila portu pieejamu tīklā.** Publicējiet
>    to adresē `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — lokālajā tīklā sasniedzams `cli` profils jebkuru informācijas paneļa līmeņa RCE pārvērš
>    par pilnīgu resursdatora kompromitēšanu.
> 2. **Nepiesaistiet `cli` profilam nekādus papildu resursdatora direktorijus.**
>    Docker ligzda kopā ar jebkuru papildu montējumu piešķir konteineram pilnas
>    lasīšanas/rakstīšanas tiesības jūsu failu sistēmā un resursdatora konfigurācijā. Ja rīkam nepieciešams
>    redzēt projektu, palaidiet to lokāli ar CLI bināro failu — nemontējiet projektu
>    `cli` konteinerā.
>
> Ja konteinerā esoša automātiskā atjaunināšana nav nepieciešama, neieslēdziet `cli` profilu
> (`COMPOSE_PROFILES=core,redis` vai īsāku variantu). Pārējie profili
> nemontē Docker ligzdu.
>
> Saistīto MITM apdraudējumu modeli skatiet failā `docs/security/MITM-TPROXY-DECRYPT.md` (git; nav kompilēts direktorijā `/docs`),
> savukārt `codex`/`claude-code`/`droid`/`openclaw` bināro failu izcelsmes ķēdi skatiet
> failā `docs/security/SUPPLY_CHAIN.md`.

## Redis blakusprocesa konteiners

OmniRoute izmanto Redis kā izkliedētā pieprasījumu biežuma ierobežotāja un koplietotās kešatmiņas pamatu. Pakalpojums `redis` ir **vienmēr definēts** failā `docker-compose.yml` (tam nav profila ierobežojuma), un tas tiek palaists kopā ar jebkuru citu profilu.

| Informācija                          | Vērtība                                         |
| ------------------------------------ | ----------------------------------------------- |
| Attēls                               | `redis:7-alpine`                                |
| Konteinera nosaukums                 | `omniroute-redis`                               |
| Iekšējais ports                      | `6379`                                          |
| Resursdatora ports (pārrakstāms)     | `REDIS_PORT` (pēc noklusējuma `6379`)           |
| Resursdatora piesaiste (pārrakstāma) | `REDIS_BIND_HOST` (pēc noklusējuma `127.0.0.1`) |
| Sējums                               | `omniroute-redis-data` → `/data`                |
| Veselības pārbaude                   | `redis-cli ping` (10 s intervāls)               |

Saistītie vides mainīgie:

- `REDIS_URL` — lietotnē ievadītā savienojuma virkne (pēc noklusējuma `redis://redis:6379`).
- `REDIS_PORT` — Redis konteinera resursdatora puses porta kartējums.
- `REDIS_BIND_HOST` — resursdatora saskarne, kurā ports tiek publicēts. Pēc noklusējuma `127.0.0.1`.

> **Kāpēc pēc noklusējuma tiek izmantota atgriezeniskās cilpas saskarne:** blakusprocesa konteiners darbojas bez `requirepass`, un lietotnes
> konteineri tam piekļūst, izmantojot compose tīklu (`redis:6379`) — publicētais ports ir
> paredzēts tikai resursdatora puses rīkiem (`redis-cli`, lokālai `npm run dev` izpildei). Publicēšana
> adresē `0.0.0.0` padarītu Redis bez autentifikācijas pieejamu visiem jūsu LAN resursdatoriem. Ja iestatāt
> `REDIS_BIND_HOST=0.0.0.0`, pakalpojuma laukam `command:` pievienojiet arī `--requirepass`.

**Redis atspējošana** nav ieteicama (pieprasījumu biežuma ierobežotājs pāries uz mazāk efektīvu rezerves režīmu atmiņā). Ja tas tomēr nepieciešams, noņemiet vai aizkomentējiet pakalpojuma `redis:` bloku failā `docker-compose.yml` vai mērogojiet to līdz nullei:

```bash
docker compose up -d --scale redis=0
```

## Produkcijas Compose

Lai paralēli izstrādes videi palaistu izolētu produkcijas momentuzņēmumu, izmantojiet `docker-compose.prod.yml`.

| Informācija                           | Vērtība                                                                                   |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| Fails                                 | `docker-compose.prod.yml`                                                                 |
| Noklusējuma informācijas paneļa ports | `PROD_DASHBOARD_PORT=20130` (kartēts uz iekšējo `${DASHBOARD_PORT:-20128}`)               |
| Noklusējuma API ports                 | `PROD_API_PORT=20131`                                                                     |
| Attēls                                | `omniroute:prod` (būvēts no `runner-cli` mērķa)                                           |
| Redis konteiners                      | `omniroute-redis-prod` (`redis:8.6.2`, atsevišķs `redis-prod-data` sējums)                |
| Datu sējums                           | `omniroute-prod-data` (nosaukts, saglabājas pēc atkārtotas būvēšanas)                     |
| Veselības pārbaudes                   | `node healthcheck.mjs` + `redis-cli ping`, un `depends_on` ir atkarīgs no Redis veselības |

Lietošana:

```bash
# Uzbūvēt un palaist produkcijas steku
docker compose -f docker-compose.prod.yml up -d --build

# Straumēt žurnālus
docker compose -f docker-compose.prod.yml logs -f

# Apturēt un noņemt steku (saglabājot sējumus)
docker compose -f docker-compose.prod.yml down
```

Produkcijas steks darbojas paralēli izstrādes compose videi (atšķiras konteineru nosaukumi, porti un sējumi), tādēļ varat turpināt lokālo izstrādi, kamēr produkcijas vide darbojas.

## Dockerfile posmi

Repozitorijs nosūta daudzpakāpju Dockerfile (`Dockerfile`). Ir pakļauti četri posmi; izvēlieties savam lietošanas gadījumam pareizo `target`.

| Skatuves      | Pamata attēls         | Mērķis                                                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalē deps (`npm ci --legacy-peer-deps`) un palaiž `npm run build` (Turbopack pēc noklusējuma — skatiet tālāk sadaļu Būvlaika resursi)                                                                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Ražošanas laiks ar Next.js atsevišķu izvadi.** Neviens pakalpojumu sniedzējs CLIs nav komplektēts.**                                                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | Pievieno `git`, `docker.io`, `docker-compose` un globālo CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Izvēlieties šo aģentu darbplūsmām.**                                                                                                                                               |
| `runner-web`  | `runner-base`         | Pievieno Playwright + Chromium pārlūkprogrammu (`--with-deps`) tīmekļa sesiju nodrošinātājiem: `gemini-web`, `claude-web`, `claude-turnstile`.** Izvēlieties šo, kad izmantojat šos pakalpojumu sniedzējus** — vienkāršais attēls pēc pieprasījuma neizdodas bez tā (skatiet `-web` piezīmi sadaļā Izlaišanas kanāli). |

Manuāli izveidojiet konkrētu mērķi:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Veidošanas laika resursi

Trīs būves args kontrolē `builder` skatuves izmaksas. Tie ir tikai izveides laikā, — `OMNIROUTE_MEMORY_MB` (zemāk) ir atsevišķa izpildlaika poga.

| Veidot arg                  | Noklusējums | Efekts                                                                                |
| --------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` veido ar tīmekļa pakotni: mazāka maksimālā atmiņa, lēnāka. `1` izvēlas Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | V8 kaudzes griesti (`--max-old-space-size`) radītajam `next build`.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Baro `CIRCLE_NODE_TOTAL`; Tālāk tiek iegūts `workers = N - 1` lapas datu apkopošanai. |

`OMNIROUTE_BUILD_WORKERS` ir tas, kurš jāaudzina par lielu celtnieku, un tas, kuram ir aizdomas, kad ierobežota konstrukcija nomirst** pēc** `✓ Compiled successfully`. Katrs lapas datu darbinieks ir savs process, tāpat arī pats vecākais `next build` ; dzīvā VPS reprodukcija (izdevums #7518) mērīja katra procesa maksimumu RSS pie ~ 4,5 GB neatkarīgi no `NODE_OPTIONS` kaudzes karoga (Turbopack apkopo native/Rust atmiņā ārpus V8 kaudzes). Noklusējuma `2` (→ 1 darbinieks, kopā 2 procesi) izmērs ir paredzēts 16 GB /4 vCPU GitHub mitinātajiem skrējējiem, ko izmanto publicēšanas konveijers. Pie `8` (→ 7 darbinieki) šim skrējējam pietrūka atmiņas, un buildkit neizdevās soli ar `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 darbinieki) joprojām neatbilst, kad katra procesa RSS tika mērīts tieši, nevis secināts. `tests/unit/docker-build-memory-budget.test.ts` veic aritmētiku pret izmērīto skaitli un neizdodas, ja kāda no pogām pārspēj skrējēju.

Turbopack apkopo dzimtajā Rust atmiņā, kas dzīvo** ārpusē** V8 kaudze, tāpēc `OMNIROUTE_BUILD_MEMORY_MB` to nesaista. Uz resursdatora ar atmiņas griestiem OOM slepkava pēc tam SIGKILLed bez kļūdas teksta. — tas vienkārši apstājas `Creating an optimized production build` vidū, kas drīzāk skan kā pakārts, nevis atmiņas trūkums. Tāpēc `Dockerfile` noklusējuma iestatījums ir tīmekļa pakotne (`OMNIROUTE_USE_TURBOPACK=0`), atšķirībā no `npm run dev` / `npm run build`, kur Turbopack ir noklusētais kods: tukšs `docker build .` bez build arg (ko palaiž Railway un citi viena klikšķa saimnieki) nedrīkst klusi nomirt veidotājā ar ierobežotu atmiņu. Publicētie attēli jau skaidri iziet `OMNIROUTE_USE_TURBOPACK=0` `docker-publish.yml`. Būvējam ar daudz RAM izvēlieties Turbopack, lai ātrāk veidotu:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ir iespējots, tāpēc `next build` vada vecāku** un** strādnieku process un katrs godina `OMNIROUTE_BUILD_MEMORY_MB` atsevišķi. Konteinera griestu izmērs ir aptuveni divas reizes lielāks par šo vērtību, nevis vienu reizi.

Mērīts uz šī koka (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler         | Konteineru griesti | Rezultāts                             |
| --------------- | ------------------ | ------------------------------------- |
| Turbopack       | 8 GiB / 16 GiB     | OOM-nogalināja abos, klusi            |
| tīmekļa pakotne | 8 GiB              | celt strādnieks SIGKILLed             |
| tīmekļa pakotne | 12 GiB             | izdevās, sasniedza maksimumu 11,1 GiB |

### Izpildlaika noklusējuma iestatījumi

`runner-base` eksportētie noklusējuma iestatījumi: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Atmiņas uzvedība Docker:

- Attēls nosaka `OMNIROUTE_MEMORY_MB=1024` un no tā iegūst `NODE_OPTIONS=--max-old-space-size=1024`.
- Faktisko servera procesu sāk atsevišķs palaidējs, kas nolasa `OMNIROUTE_MEMORY_MB` un pievieno `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Mezgls izmanto pēdējo atkārtoto `--max-old-space-size` vērtību, tāpēc `OMNIROUTE_MEMORY_MB` iestatīšana kontrolē efektīvo Docker kaudzes ierobežojumu.
- Tā kā attēls vienmēr to nosaka, paša palaišanas programmas RAM kalibrētais atkāpšanās punkts nekad netiek lietots zem Docker. Palieliniet to tieši darba slodzei (tabula zemāk). `2048` joprojām ir pārāk mazs kodēšanas aģentam `/v1/responses`.

### Izpildlaika RAM kodēšanas aģentiem

1 GiB Docker noklusējuma vērtība ir dashboard/light-chat grīda, nevis ražošanas apjoms. Garie `POST /v1/responses` korpusi (simtiem ziņojumu, desmitiem rīku) saspiešanas laikā saglabā vairākus atmiņā esošos grafikus. Divi pārklājoši ~ 3 MiB / ~ 750k marķiera pieprasījumi ir pārtraucuši V8** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) un arī trāpīja 16 GiB cgroup OOM. Skatiet [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Izmērs** cgroup `--memory` virs kaudzes** — vietējie buferi, SQLite un saspiešanas starpprodukti atrodas ārpus V8.

| Darba slodze                                 | `OMNIROUTE_MEMORY_MB`       | Konteiners/cgrupa       | Piezīmes                                                                                                |
| -------------------------------------------- | --------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------- |
| Informācijas panelis, viena viegla tērzēšana | `1024` (attēla noklusējums) | ≥2 GiB                  |                                                                                                         |
| Viens kodēšanas aģents (Claude/Codex/Grok)   | `8192`                      | ≥10 GiB                 | Tipisks vienas sesijas `/v1/responses`                                                                  |
| Divas vienlaikus garas `/v1/responses`       | `10240`–`12288`             | ≥12–16 GiB              | Izmērītais V8 pārtraukums pie ~ 12 GiB kaudzes                                                          |
| Trīs + vienlaicīgi garie konteksti           | nedariet vienu procesu      | serializēt / vairāk RAM | Noklusējuma smagsvara uzņemšana ir 1 lidojuma laikā; paaugstinot to bez RAM, atkal tiek ieviests aborts |

`omniroute serve` uz tukša metāla kalibrē ~ 35% no RAM (saspiests `[512, 4096]`), kad `OMNIROUTE_MEMORY_MB` ir** atiestatīts** . Docker vienmēr iestata `1024`, lai kalibrēšana nekad netiktu veikta oficiālajā attēlā.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Kritiskie vides mainīgie

Papildus noklusējuma iestatījumiem, kas dokumentēti failā [ENVIRONMENT.md](../reference/ENVIRONMENT.md), darbībā ar Docker vissvarīgākie ir tālāk norādītie mainīgie:

| Mainīgais                     | Nolūks                                                                                                                                                                                                                                                                                                       | Noklusējums                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket tilta koplietojamais noslēpums. **Obligāts produkcijas vidē** — iestatiet to kā drošu nejaušu virkni.                                                                                                                                                                                              | nav iestatīts (jānorāda obligāti) |
| `REDIS_URL`                   | Savienojuma virkne ātruma ierobežotāja/kešatmiņas aizmugursistēmai                                                                                                                                                                                                                                           | `redis://redis:6379`              |
| `REDIS_PORT`                  | Resursdatora puses ports komplektā iekļautajam Redis konteineram                                                                                                                                                                                                                                             | `6379`                            |
| `REDIS_BIND_HOST`             | Resursdatora saskarne, kurā tiek publicēts komplektā iekļautais Redis ports (atgriezeniskās cilpas saskarne, ja vien nepievienojat AUTH)                                                                                                                                                                     | `127.0.0.1`                       |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Resursdatora ceļš, kas pašatjaunināšanas darbplūsmām profilā `cli` tiek montēts kā `/workspace/omniroute`                                                                                                                                                                                                    | `.` (pašreizējais direktorijs)    |
| `OMNIROUTE_MEMORY_MB`         | Node izpildlaika kaudzes ierobežojums Docker savrupajam serverim; pārraksta iepriekš norādīto attēla noklusējumu. Programmēšanas aģentiem: `8192`+ (skatiet [izpildlaika RAM](#runtime-ram-for-coding-agents)).                                                                                              | `1024`                            |
| `DASHBOARD_PORT` / `API_PORT` | Pārraksta informācijas paneļa (20128) un API (20129) eksponētos portus                                                                                                                                                                                                                                       | `20128` / `20129`                 |
| `APP_BIND_HOST`               | Resursdatora saskarne, kurā docker-compose publicē informācijas paneļa/API/tiešsaistes WS portus. Ar `REQUIRE_API_KEY=false` (noklusējums) `0.0.0.0` eksponē anonīmo `/v1` starpniekserveri LAN tīklā — paplašiniet piekļuvi tikai ar `REQUIRE_API_KEY=true` vai priekšā novietotu reverso starpniekserveri. | `127.0.0.1`                       |
| `CLIPROXY_BIND_HOST`          | Resursdatora saskarne, kurā docker-compose publicē `cliproxyapi` blakuskonteineru — tā datu sējumā tiek glabāti pakalpojumu sniedzēju akreditācijas dati.                                                                                                                                                    | `127.0.0.1`                       |
| `OMNIROUTE_PLUGINS_DIR`       | Direktorijs, kuru izpildlaika spraudņu skeneris nolasa un kurā instalē spraudņus. Iestatiet to, ja spraudņi ir montēti ar saistījuma montējumu: noklusējums seko `HOME`, kuru attēls var arī neeksportēt.                                                                                                    | `~/.omniroute/plugins`            |
| `OMNIROUTE_BASE_PATH`         | URL apakšceļš, ja lietotne ir publicēta aiz reversā starpniekservera (piemēram, `/omniroute`)                                                                                                                                                                                                                | _(tukšs = sakne)_                 |
| `NEXT_PUBLIC_BASE_URL`        | Publiskā pārlūkprogrammas izcelsme, ieskaitot apakšceļu (piemēram, `https://host/omniroute`)                                                                                                                                                                                                                 | nav iestatīts                     |
| `PROD_DASHBOARD_PORT`         | Resursdatora puses informācijas paneļa ports failam `docker-compose.prod.yml`                                                                                                                                                                                                                                | `20130`                           |
| `CLIPROXYAPI_PORT`            | Resursdatora puses ports `cliproxyapi` blakuskonteineram                                                                                                                                                                                                                                                     | `8317`                            |

## Reversais starpniekserveris apakšceļā (Traefik/nginx)

Next.js `basePath` ir apkopots atsevišķā komplektā. OmniRoute ieraksta izcepto vērtību sargdatnē lietotnes saknē (rakstīta `npm run build` laikā; lasa `scripts/docker/ensure-docker-base-path.mjs`) un salīdzina to ar `OMNIROUTE_BASE_PATH` kad konteiners sākas. Ja tie atšķiras un attēls ir izveidots domēna saknei, ievades punkts pārraksta savrupos manifestus, iegultos `basePath`/`assetPrefix` literāļus (nākamie 16 atveido SSR īpašumu URLs no `assetPrefix` tikai — ielāps atspoguļo apakšceļu tajā), iestrādāto `/_next/static` URLs, preferences, imports, renderered lapas) un klients `process.env` shim pirms `node dev/run-standalone.mjs` palaišanas.

### Rakstīt būvējumu (ieteicams)

Iestatiet abus mainīgos `.env` un pēc tam izveidojiet no jauna, lai attēls un izpildlaiks sakristu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` pārsūta `OMNIROUTE_BASE_PATH` kā Docker build-arg un kā izpildlaika vides mainīgo.

### Iepriekš izveidots saknes attēla + izpildlaika apakšceļš

Publicētie `cheaperinference/omniroute:*` attēli ir izveidoti domēna saknei. Jūs joprojām varat iestatīt `OMNIROUTE_BASE_PATH` izpildlaikā; konteiners vienreiz ielāpi komplektu palaišanas laikā. Savienojiet to ar atbilstošu publisko izcelsmi:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurējiet apgriezto starpniekserveri, lai pārsūtītu** pilns** ārējais ceļš (nenoņemiet prefiksu). Traefik ir jānovirza `PathPrefix(`/omniroute `)` uz konteineru bez `StripPrefix`, lai Next.js saņemtu `/omniroute/...` un apkalpotu līdzekļus no `/omniroute/_next/...`.

Docker veselības pārbaude pārbauda vieglā `/healthz` dzīves cikla beigu punktu, kura prefikss ir aktīvs `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` paliek pieejams human/dashboard diagnostikai; lai novirzītu konteineru HEALTHCHECK atpakaļ uz to (piemēram, lai nodrošinātu dziļu veselības aizsardzību), iestatiet `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Šis ceļš ir a** dziļi** pārbaudiet (DB + monitoringa kopsavilkums) — piemērots Docker retajam `HEALTHCHECK`, ja atkal izvēlaties, bet** nē** par Kubernetes `livenessProbe` intervāliem.

Orķestratoriem (Kubernetes, Nomad u.c.):

| Zonde               | Dod priekšroku                                                          | Izvairieties                                                   |
| ------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| Dzīvīgums           | HTTP `GET /livez` vai TCP galvenajā portā (`PORT`, noklusējuma `20128`) | `/api/monitoring/health` kā dzīvīgums                          |
| Gatavība            | HTTP `GET /healthz`                                                     | Īsi noildzes, kas uzskata, ka notikumu cikls aizņemts kā miris |
| Dziļa / melnā kaste | `/api/monitoring/health`                                                | —                                                              |

`/healthz` ziņo par procesa dzīves ciklu (`ok` / `starting` / `stopping`). `/livez` ir process-alive tikai (200 vienmēr, kad apstrādātājs var palaist; tas negaida gatavību). Abi joprojām darbojas tajā pašā Node notikumu cilpā kā pieprasījumu apstrāde, tāpēc ar CPU saistīts katalogs vai saspiešanas darbs var aizkavēt tos — aizņemts ≠ dead. Ja HTTP zondes taimauts, dodiet priekšroku TCP dzīvīgumam. Pilnas zondes norādes: [uzraudzības rokasgrāmata — Kubernetes zondes ieteikumi](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute var droši eksponēt, izmantojot Caddy automātisko SSL nodrošināšanu. Pārliecinieties, vai jūsu domēna DNS A ieraksts norāda uz jūsu servera IP.

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

Caddy iestata standarta pārsūtīšanas galvenes augšpus konteineram. OmniRoute izmanto `NEXT_PUBLIC_BASE_URL` kā kanonisko publisko izcelsmi OAuth atzvanīšanai un ģenerētajām publiskajām saitēm; autentificēta informācijas paneļa rakstīšana izmanto vienas izcelsmes pieprasījumus, kā arī sesijas CSRF aizsardzību. Iespējojiet `OMNIROUTE_TRUST_PROXY` tikai uzlabotajām izvietošanām, kurās apzināti vēlaties, lai OmniRoute publisko izcelsmi iegūtu no uzticamām pārsūtītajām galvenēm, nevis precīzas konfigurācijas.

## Cloudflare Quick Tunnel

Docker izvietojumu informācijas paneļa atbalsts ietver ar vienu klikšķi aktivizējamu **Cloudflare Quick Tunnel** sadaļā `Dashboard → Endpoints`. Pirmās iespējošanas laikā `cloudflared` tiek lejupielādēts tikai tad, kad tas ir nepieciešams, tiek palaists pagaidu tunelis uz jūsu pašreizējo `/v1` galapunktu, un ģenerētais `https://*.trycloudflare.com/v1` URL tiek parādīts tieši zem jūsu parastā publiskā URL.

Galapunktu tuneļu paneļus (Cloudflare, Tailscale, ngrok) var parādīt vai paslēpt sadaļā `Settings → Appearance`, nemainot aktīvā tuneļa stāvokli.

### Piezīmes par tuneļiem

- Quick Tunnel URL ir pagaidu adreses un mainās pēc katras restartēšanas.
- Quick Tunnel netiek automātiski atjaunoti pēc OmniRoute vai konteinera restartēšanas. Kad nepieciešams, atkārtoti iespējojiet tos informācijas panelī.
- Pārvaldītā instalēšana pašlaik atbalsta Linux, macOS un Windows platformās `x64` / `arm64`.
- Pārvaldītie Quick Tunnel pēc noklusējuma izmanto HTTP/2 transportu, lai ierobežotās konteineru vidēs izvairītos no traucējošiem QUIC UDP bufera brīdinājumiem. Iestatiet `CLOUDFLARED_PROTOCOL=quic` vai `auto`, ja vēlaties izmantot citu transportu.
- Docker attēli ietver sistēmas CA saknes un nodod tās pārvaldītajam `cloudflared`, tādējādi novēršot TLS uzticamības kļūmes, kad tunelis tiek inicializēts konteinerā.
- Iestatiet `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, ja vēlaties, lai OmniRoute izmantotu esošu bināro failu, nevis to lejupielādētu.

## Attēlu atzīmes

| Attēls                       | Tag      | Izmērs   | Apraksts                                                   |
| ---------------------------- | -------- | -------- | ---------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB | Augstākais** publicēts** stabils SemVer (nevis git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB | Piespraudiet šīs klases tagu GitOps                        |

Vieni un tie paši attēli tiek publicēti trīs krātuvēs ar vienādiem arhitektūras īssavilkumiem: `cheaperinference/omniroute` (Docker Hub, Cheaper Inference organizācija, sākot no 3.8.53), `ghcr.io/cheaper-inference/omniroute` un mantotajā `diegosouzapw/omniroute`, kas saglabā savu piesaistes vēsturi un joprojām saņem katru izlaidumu. Esošie `diegosouzapw/omniroute` izvietojumi tiek pastāvīgi atjaunināti; attēla nosaukuma maiņa nav obligāta. Tālāk norādītais `:next` / `:next-web` pirmsizlaides kanāls ir publicēts tikai `diegosouzapw/omniroute` un GHCR.

Vairāku platformu manifests: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automātiski atlasa atbilstošo arhitektūru; nododiet `--platform linux/amd64`, ja nepieciešams piespiest AMD64 emulāciju ARM saimniekiem.

### Izlaiduma kanāli

OmniRoute publicē atsevišķus Docker kanālus stabiliem laidieniem, aktīvai izlaišanas filiāles testēšanai un izstrādes būvējumiem.

| Kanāls                          | Avots                                       | Mainīgums                      | Ieteicamā lietošana                                                                                                          |
| ------------------------------- | ------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned izlaidums                  | Nemainīgs                      | Ražošanas izvietošana, kas piestiprina precīzu laidienu                                                                      |
| `:latest` / `:latest-web`       | Augstākais** publicēts** stabils SemVer     | Mainīgs stabils rādītājs       | Seko stabiliem izlaidumiem** pēc** SemVer publicēt darbu — dara** nē** izsekot `main` vai neizlaisto `release/v*` apņemšanos |
| `:next` / `:next-web`           | Pašreizējā noklusējuma `release/v*` filiāle | Maināms pirmsizlaides rādītājs | Tiek pārbaudīti labojumi, kas ir nonākuši aktīvā laidiena zarā, bet vēl nav stabilā laidienā                                 |
| `:main` / `:main-web`           | `main` filiāle                              | Mainīgs attīstības rādītājs    | Tikai izstrādes un integrācijas testēšana                                                                                    |

#### Tīmekļa sesiju nodrošinātāji: `-web` attēli

Katrs iepriekš minētais kanāls darbojas kā `-web` tags (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), kas izveidots no `runner-web` stadijas — vienāda attēla plus Playwright un Chromium pārlūkprogrammas. Vienkāršais attēls tiek nosūtīts** bez** hroms; `gemini-web`, `claude-web` un `claude-turnstile` tas ir vajadzīgs.

Kļūme tiek atlikta, nevis palaišanas laiks: šie pakalpojumu sniedzēji uzskaita savus modeļus un parāda kā savienotus informācijas panelī, un tikai pirmais pieprasījums neizdodas

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ja izmantojat šos pakalpojumu sniedzējus, izvelciet tā kanāla `-web` tagu, kuru jau izmantojat — nekas cits nemainās. npm/CLI instalācijā (nav Docker attēla) līdzvērtīgs trūkstošais elements ir pārlūkprogrammas binārais fails: palaidiet `npx playwright install chromium` resursdatorā.

#### Pirmsizlaides kanāla izmantošana

`next` kanāls tiek pārbūvēts katrā nospiešanas reizē uz pašreizējo noklusējuma `release/v*` atzaru un tiek publicēts gan AMD64 gan ARM64. Vecākas apkopes filiāles to nevar pārrakstīt. Kanāls nodrošina izvelkamu attēlu labojumiem, kas ir sapludināti aktīvajā izlaišanas zarā, pirms tiek izgriezts nākamais stabilais tags.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Izmantojot Docker Compose, ignorējiet attēla tagu, ko izmanto atlasītais profils, pēc tam izvelciet un izveidojiet pakalpojumu no jauna:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Drošība un atgriešana

`next` ir peldošs pirmsizlaides kanāls. Tas var mainīties jebkurā nospiežot uz aktīvās atbrīvošanas filiāli un ir** netiek atbalstīts izmantošanai ražošanā** . Piespraudiet attēla īssavilkumu, izvērtējot konkrētu būvējumu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pirms testēšanas dublējiet OmniRoute datu apjomu vai saistītu datu direktoriju. Lai atgrieztu atpakaļ, atjaunojiet iepriekš izmantoto stabilo versiju vai iznīciniet un izveidojiet konteineru no jauna:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

Atbrīvošanas atzara konstrukcija nekad nevar pārvietot `latest`; tikai piemērota stabila semantiskā versija var veicināt stabilu rādītāju. `next` attēli saglabā atbrīvošanas attēla pārbaudi un bloķē KRITISKĀS ievainojamības vārtus.

**`latest` nav valūtas garantija git.** Apvienotie labojumi `main` vai aktīvajā `release/v*` atzarā ir** nē** `:latest` līdz tiek publicēts stabils SemVer attēls un publicēšanas uzdevums reklamē `:latest` (tāds pats īssavilkums kā šim SemVer). Ja `latest` izskatās iesaldēts, bet GitHub jau parāda labojumu, velciet `:next`, lai pārbaudītu izlaišanas atzaru, vai gaidiet SemVer tagu.

| Jūs vēlaties                                                                  | Izmantot                                     |
| ----------------------------------------------------------------------------- | -------------------------------------------- |
| GitOps / ražošana, kas nedrīkst dreifēt                                       | Piespraust `:X.Y.Z` (vai attēla īssavilkumu) |
| Sekojiet publicētajiem staļļiem un pieņemiet atkārtotu izveidi katrā laidienā | `:latest`                                    |
| Izmēģināt neizlaistās `release/v*` saistības                                  | `:next` (nav ražošana)                       |
| Pārbaudi `main`                                                               | `:main` (nav ražošana)                       |

## Informācijas paneļa atjauninājumi Docker vidē

No publicēta attēla palaists konteiners nevar pats sevi aizstāt. Kad OmniRoute nosaka, ka tas darbojas
konteinerā (nav `.git` darba kopijas un tā nav npm instalācija), sākuma informācijas paneļa atjauninājumu reklāmkarogs npm/git norādījumu vietā parāda
resursdatorā izpildāmo komandu kopā ar kopēšanas pogu:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Pakalpojuma nosaukums tiek iegūts no `AUTO_UPDATE_SERVICE` (noklusējums ir `omniroute` — pakalpojums failā
`docker-compose.selfhost.yml`). `pull` pārvieto tikai mainīgu tagu (`latest`, `next`); ja izmantojat fiksētu
`:X.Y.Z` tagu, vispirms rediģējiet tagu.

### Atjaunināšana ar vienu klikšķi, izmantojot resursdatora trigera failu

Lai saglabātu **Atjaunināt tūlīt** darbību, nemontējot `/var/run/docker.sock` (kas konteineram piešķir
root piekļuvi resursdatoram — skatiet iepriekš minēto `cli` profila brīdinājumu), OmniRoute pakalpojumam iestatiet `DOCKER_UPDATE_TRIGGER_FILE`
un resursdatorā palaidiet pārraugu:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Ceļam jāatrodas mapē `DATA_DIR` (relatīvās vērtības tiek atrisinātas attiecībā pret to); visi pārējie ceļi tiek
noraidīti. Pēc tam **Atjaunināt tūlīt** šajā failā ieraksta `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`,
atbild ar `202`, un informācijas panelis periodiski pārbauda `/api/system/version`, līdz jaunā versija sāk darboties,
un pārlādējas. Šajā režīmā OmniRoute nekad nepalaiž čaulas vai Docker komandu. Tāpat kā ikviena atjaunināšanas
darbība, pieprasījums tiek pieņemts tikai no atgriezeniskās cilpas/LAN klientiem.

Ar bind montēts datu direktorijs nodrošina resursdatoram stabilu pārraugāmo ceļu. `systemd` vienību piemēri
(pielāgojiet `/srv/omniroute`, norādot direktoriju, kurā atrodas jūsu compose fails un `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Pārraudzīt OmniRoute informācijas paneļa atjaunināšanas pieprasījumus

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Lejupielādēt un atkārtoti izveidot OmniRoute konteineru

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

Pakalpojums pirms attēla lejupielādes dzēš pieprasījumu, lai neveiksmīga izpilde neradītu ciklu. Ja
`DOCKER_UPDATE_TRIGGER_FILE` nav iestatīts, informācijas panelī tiek saglabāta manuālo komandu darbplūsma.

## Pieejamība: noklusējuma SQLite ir viena kopija

Stock Docker / Kubernetes OmniRoute ir** viens mezgls process + viens SQLite rakstītājs** . Augsta pieejamība ir** nav atbalstīts** par šo topoloģiju.

| Ierobežojums                                      | Sekas                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vientuļš rakstnieks                               | Dariet** nē** palaist vairākas kopijas pret vienu un to pašu SQLite failu. Tas sabojā DB.                                                                                                                                                                                                                                               |
| Atkārtoti izveidot / restartēt / HEALTHCHECK kill | **Pilns pārtraukums** SSE lidojuma laikā, informācijas paneļa sesijām un atmiņas stāvokli. Katrs savienotais klients pazūd. Jauni pieprasījumi tukšā beigu punkta logā saņem apgriezto starpniekserveri**`502 Bad Gateway: Unknown error`** , nevis OmniRoute JSON — klienti to nevar atšķirt no pakalpojumu sniedzēja kļūmes (#11015). |
| Tāda pati notikumu cilpa kā `/healthz`            | Aizņemts katalogs vai saspiešanas ķeksītis var aizkavēt zondes; īss taimauts, pēc tam restartējas** tikai** replika.                                                                                                                                                                                                                    |

**Zondes matrica** (skatiet arī [Kubernetes zondes ieteikumus](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Zonde           | Mērķis                                                           | Nelietot                                                       |
| --------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| Dzīvīgums       | TCP uz `PORT` (noklusējuma `20128`) vai mīkstais HTTP `/healthz` | `/api/monitoring/health`                                       |
| Gatavība        | HTTP `GET /healthz`                                              | Īsi noildzes, kas uzskata, ka notikumu cikls aizņemts kā miris |
| Dziļi / cilvēki | `/api/monitoring/health`                                         | Automatizēts kubelet dzīvīgums                                 |

**Jauninājumi:** sagaidiet, ka katra sesija samazināsies. Ja iespējams, iztukšojiet klientus; noklusējuma SQLite nav mainīga atjauninājuma. Rakstīšana `restart: unless-stopped` plus Docker `HEALTHCHECK` aizstās arī vienīgo procesu, ja konteiners ir neveselīgs — tāds pats sprādziena rādiuss.

Gatavi manifesti un Helm diagramma ir pieejami `deploy/kubernetes/` un `deploy/helm/omniroute/` — skatiet [Kubernetes izvietošanas rokasgrāmatu](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes fragments a** viena kopija** (Nepieciešama atkārtota izveide; nepalieliniet `replicas` pret vienu SQLite failu):

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

`preStop` sleep ļauj kube nomest pakalpojuma galapunktus pirms SIGTERM so** jauns** satiksme pārstāj ietekmēt mirstošo procesu. Lidojuma laikā `/v1/responses` SSE tiek iztukšots līdz `SHUTDOWN_TIMEOUT_MS` (noklusējums 30 s), izmantojot smagsvara ieejas nomas līgumus (#11015). Jauni pieprasījumi, kas joprojām sasniedz procesu, saņem `503` + `Retry-After: 5`. Atkārtoti izveidot tukšā galapunkta atstarpi, līdz nomaiņa ir gatava, joprojām ir smags pārtraukums — tā ir SQLite topoloģija, nevis zondes nepareiza konfigurācija.

Ārējais Postgres / vairāku rakstītāju HA ir** nē** dokumentēts akciju ceļš. Ja jums ir nepieciešams HA, saglabājiet vienu kopiju vai palaidiet topoloģiju, ko projekts ir pārbaudījis un dokumentējis atsevišķi. Postgres/MySQL darbs atrodas [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Līdz brīdim, kad tas tiek piegādāts, vienīgais atbalstītais veids, kā pavairot** liels** `/v1/responses` jauda ir N neatkarīgi procesi (nākamā sadaļa), nevis `replicas > 1` vienā sējumā.

## Mērogošana: N neatkarīgi procesi

### Codex marķiera rotācijas īpašumtiesības

Viena Codex konta kopijas nedrīkst neatkarīgi patērēt tā vienreizējās lietošanas atsvaidzināšanas pilnvaru. Gadījumos, kas patērē tikai sinhronizētus akreditācijas datus, iestatiet `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Atstājiet to neiestatītu viena rotācijas īpašniekam. Katram procesam joprojām ir nepieciešams savs `DATA_DIR`; šī opcija nedz koplieto SQLite, nedz nodrošina marķiera sinhronizāciju vai izplatītu bloķēšanu.

Pasīvā instance atkārtoti nolasa savienojumu, kad ir nepieciešama atsvaidzināšana, un pieņem tikai citu, beztermiņa piekļuves pilnvaru. Pretējā gadījumā atsvaidzināšana tiek atspējota, nepabeidzot vai deaktivizējot savienojumu vai neskaitot atsvaidzināšanas pārtraukuma kļūmi. Reālas augšupējas autentifikācijas kļūmes joprojām izmanto parasto kļūdu uzskaiti, eksponenciālu dzesēšanu un parasto klienta kļūdu; konta deaktivizēšana paliek neatgriezeniska. Sinhronizējiet īpašnieka pagrieztos marķierus, pirms beidzas piekļuves pilnvaras (noklusējuma proaktīvās atsvaidzināšanas iespēja ir piecas minūtes) vai atkārtoti importējiet Codex auth failu. Pasīvais imports saglabā piegādātos marķierus, nepārbaudot tos marķiera galapunktā. Manuālā dashboard/API atsvaidzināšana atgriež `409 refresh_disabled`; jaunie OAuth logins ir nemainīgi. Skatīt [vides atsauci](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

One Node process ir** viena V8 kaudze** . Divi pārklājoši ~ 3 MiB / ~ 750k marķiera kodēšanas aģents `POST /v1/responses` (RTK + Caveman ) pārtrauc šo kaudzi pie ~ 12 Gi (`FATAL ERROR: Reached heap limit`) un var OOM 16 Gi cgrupu. Skatiet [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Šis mērījums ir a** atmiņa-budžets** brīdinājums, nevis produkts hard-max no diviem vienlaikus gariem `/v1/responses`. Liela apjoma tērzēšanas atļauju ierobežo automātiski atvasināts saņemšanas baitu budžets (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), kura lielums ir no tā paša V8/cgroup griestiem — ignorējot to uz augšu (vai iestatot mantoto `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` pieprasījumu skaita ierobežojumu) jau liela izmēra procesā, atkārtoti ievieš pārtraukšanu. Mazie tērzēšana, `/healthz`, `/v1/models` un MCP ir** nē** tajā vāciņā.

### Viens process: vairāk nekā divas garas `/v1/responses`

A** vesels** process (kaudze zem `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, noklusējuma `0.75`)** var** palaist vairāk nekā divas vienlaikus garas `POST /v1/responses` ja procesa mēroga lidojuma baitu budžetā (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) vēl ir vietas. Ķermeņi, kuru vērtība ir `OMNIROUTE_CHAT_LARGE_BODY_BYTES` vai augstāka (noklusējuma 256 KiB), tiek izmantota tāda pati smagsvara noma kā struktūras smagajiem pieprasījumiem un izmanto to pašu [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desmitiem vienlaicīgu garo SSE klientu (operatoriem bieži ir nepieciešami 40–50) ir a** atmiņa-budžets** jautājums — izmēra kaudze + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nav stingrs “maksimālais 2” produktu ierobežojums. Spiediena kaudze joprojām izplūst ar atkārtoti izmēģināmu `503`, tāpēc #7849 neatgriežas.

Uz** reizināt kaudzes** (neatkarīgas V8 vecās telpas)** šodien** :

| Dariet                                                                                                                                                   | Nedrīkst                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Skrien** N containers/pods** , katrs ar savu** pašu** `DATA_DIR` / apjoms                                                                                | Iestatiet `replicas > 1` pret vienu SQLite failu                        |
| Liels lielums lidojuma laikā + veselīgs augstums no kaudzes / lidojuma baitu budžeta; 1–2 ir konservatīvais #7849 noklusējums, nevis cietā produkta maks | Vienam procesam piešķiriet 8 × RAM un neierobežotu skaita ierobežojumu  |
| Pēc izvēles: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for** koplietojamo kvotu skaitītāji**                                                  | Uztveriet Redis kā kopīgu SQLite — tas tā nav                           |
| Dublēt nodrošinātāja noslēpumus katrā instancē (vai pieņemt sadalītus informācijas paneļus)                                                              | Sagaidiet vienu informācijas paneli/vienu zvanu žurnālu visos gadījumos |
| Priekšpuse ar jebkuru slodzes balansētāju; Pietiek ar sticky by API taustiņu vai sesiju                                                                  | Nepieciešama pārdevējam noteikta izmēra starpprogrammatūra              |

Sesijas un konta radniecību var arī kopīgot, izmantojot Redis: katram procesam iestatiet `OMNIROUTE_SESSION_AFFINITY_STORE=redis` un `REDIS_URL` ar vienādu `REDIS_KEY_PREFIX` un pozitīvu `sessionAffinityTtlMs` iestatījumu. Piespraudes atrisina jauktās lietošanas konta identitātes katra procesa piemērotajam lokālajam savienojumam, tāpēc OAuth kontiem ar atbilstošiem identitātes metadatiem nav jābūt atbilstošam savienojumam IDs. Zināmās konta identitātes ir svarīgākas par pretrunīgo vietējo IDs tapas izšķirtspējā un apsargātā izlikšanā; ieraksti bez identitātes (vai izlikšanas zvanītāji bez identitātes) saglabā mantoto ID aizsargu. Kontiem bez stabilas lietošanas identitātes joprojām ir nepieciešama atbilstība IDs. Redis kļūdas vai zvani, kas pārsniedz 100 ms, tiek atgriezti vietējā SQLite. Katrs Redis affinity veikals nodrošina izcilu darbību maksimālo apjomu 8, Redis apiet uzreiz, kad tas ir pilns, un atbrīvo laika nišas tikai tad, kad tiek atrisināts pamatā esošais darbs, nevis zvanītāja termiņā. Redis darbības pārtraukuma laikā nav kopīgas patiesības: katrs gadījums atgriežas pie savas vietējās radniecības, sesijas var atkārtoti piespraust katrā gadījumā un gadījumi var atšķirties. Lipīgums atkal saplūst caur Redis kad tas atjaunojas. Noildze gaida, nevis nosūtīts EVAL, kas var nokrist pēc atkāpšanās. Maršrutēšanas raksti salīdzina precīzu vērtību, kas novērota maršrutēšanas lēmumā, nevis jaunu mutācijas laika nolasījumu; novērots garām vai SQLite atkāpšanās novērojums tiek salīdzināts ar neesošu Redis taustiņu. Novecojušas tapas tiek aizstātas ar vienu CAS, tāpēc novēlota komanda nevar aizstāt vai izdzēst jaunāku, atšķirīgu tapu. Redis nolasa atomiski atgriež vērtību un atlikušo serveri TTL; pozitīvs PTTL (vai bez derīguma termiņa beigām) nosaka dzīvīgumu, nevis rakstītāja JSON laika zīmogs vai lasītāja pulkstenis. Vietējie momentuzņēmumi kartē atlikušo TTL līdz vietējam termiņam; esošās JSON atslēgas paliek lasāmas, un to neapstrādātie baiti tiek saglabāti CAS. Redis ir vienīgais patiesības avots, kamēr tas sniedz atbildes. Apstiprinātie kopīgotie pārkāpumi, pieskārieni un dzēšana noņem vietējo ierakstu, nekad to neinstalējiet un neatsvaidziniet. SQLite Redis ceļā satur tikai šīs instances atkāpšanās lēmumus no Redis kļūdām, taimautiem vai piesātinājuma ar TTL, kā iepriekš. Trūkst vietējās piespraudes vēlākā pārtraukumā maksā vienu jaunu izvēli (vienu tūlītēju kešatmiņas izlaišanu), nevis nepareizu vai izliktu kontu. Noraidītās izmaiņas atgriež koplietoto uzvarētāju un tā atlikušo TTL atomāri: parastā atlase atkārtoti pārbauda kartēto lokālo termiņu un izmanto joprojām pastāvošu piemērotu uzvarētāju, pieskaroties šī konta lietojumam un reģistrēšanai bez citas koplietotas rakstīšanas. Ja tas nav pieejams, atlase saglabā vietējo kandidātu, koplietojamo spraudni atstāj nemainīgu un izstaro vienu atkļūdošanas ziņojumu. Noraidīts CAS neraksta SQLite; Redis kļūdas, taimauta vai piekļuves piesātinājums tā vietā izmanto esošo vietējo darbību. Ja atbilde uz nosūtīto mutāciju tiek saņemta pēc taimauta (pieņemta, noraidīta vai kļūda), sinhronā precīzā serializētās vērtības salīdzināšanas un dzēšanas funkcija noņem tikai baitam identisku taimauta atkāpšanās rindu. Starp šo salīdzināšanu un dzēšanu nav jāgaida; tiek saglabāts jaunāks pārtraukuma raksts. Apsargāta izlikšana noņem neveiksmīgā konta lokālo spraudni pat tad, ja Redis ir nolaists, un pēc apstiprinātas koplietošanas izlikšanas tas tiek notīrīts vēlreiz. Gaidot iepriekš sniegtās koplietotās atbildes, nevar atjaunot izlikto lokālo spraudni, jo kopīgos panākumos nekad netiek ierakstīts SQLite. Vēlāka pārtraukuma atkāpšanās var atkārtoti izveidot kontu; vēlāk pieņemts koplietots raksts pastāv tikai Redis. Redis miss nav konsultēties ar vietējo atkāpšanās stāvokli. Ja draiveris ir izslēgts, tikko atlasītās tapas saglabā mantoto četru lauku SQLite JSON formu; tikai Redis maršrutēšana pievieno jauktā konta identitāti. Iepriekš iegūtās tapas tiek atkārtoti pārbaudītas to derīguma termiņa beigās. Redis atlase, kas nav saistīta ar nomu, atkārtoti nolasa veikalu, taču sinhronā nomas plānošanā joprojām var izmantot tapu, kas tiek izlikta starp sākotnējo ielādi un plānošanu (pieņemts labākās piepūles logs). Nomas saistības nevar pārslēgt kontus pēc ilgstošas prasības: noraidīšanas gadījumā tā patur tikai pieprasīto kandidātu šim pieprasījumam un neskar koplietoto uzvarētāju, tāpēc vienošanās starp gadījumiem ir ierobežota. Pārējā tabula joprojām ir spēkā: tajā netiek kopīgota kombinētās sesijas stabilitāte, vietējās Codex pagrieziena tapas, konta semafori, bloķēšanas gadījumi, tēriņu ierobežojumi, konfigurācijas vai zvanu žurnāli.

Aparatūra: vienā instancē vienlaicīga garā `/v1/responses` ir a** atmiņa-budžets** jautājums (heap + inflight-byte / #10110). `N` neatkarīgie `DATA_DIR` s joprojām vairo kaudzes: resursdatoram RAM ir jāaptver `N × cgroup`, nevis "vienam 16 Gi pod ar N = 8". Nekad `replicas > 1` vienā SQLite failā.

Izveidojiet skici (divas kaudzes, divi sējumi — nevis `deploy.replicas: 2`):

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

Procesa blīvums (saspiešana no HTTP izolāta) ir [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Viena loģiskā kopa koplietojamā ilgstošā stāvoklī ir [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini reģionālās kļūdas Docker vidē

Google AI Studio / Gemini API var atgriezt HTTP 400 kļūdu ar FAILED_PRECONDITION un
`User location is not supported for the API use.` Veiksmīgs pieprasījums resursdatorā
neapliecina, ka konteiners izmanto to pašu izejošo maršrutu. DNS secība,
IPv4/IPv6 savienojamība, VPN maršrutēšana un konfigurētie starpniekserveri var atšķirties. Pārbaudiet
[Google atbalstītos reģionus](https://ai.google.dev/gemini-api/docs/available-regions),
kā arī faktisko savienojuma maršrutu; šī kļūda pati par sevi nenorāda uz nederīgu API atslēgu.

### Dodiet priekšroku konkrētam savienojumam paredzētam starpniekserverim

Ietekmētajam Gemini savienojumam izmantojiet OmniRoute
[katra savienojuma starpniekservera konfigurāciju](../ops/PROXY_GUIDE.md#4-level-proxy-system),
pēc tam atkārtojiet **Pārbaudīt savienojumu** un nelielu pieprasījumu
ar to pašu modeli. Tādējādi maršrutēšanas izmaiņas attiecas tikai uz konkrēto savienojumu. Pārbaudiet,
vai starpniekserveris ir sasniedzams no konteinera un vai savienojums to patiešām atlasa.
Maršruta maiņa negarantē, ka augšupējais pakalpojums būs pieejams konkrētajā reģionā.

### Salīdziniet resursdatora un konteinera tīkla savienojumus

Salīdzinot autentificētos rezultātus, saglabājiet identisku atslēgu, modeli un pieprasījumu; nekad
neievietojiet problēmas pieteikumā akreditācijas datus, starpniekservera paroles vai pilnas autorizācijas galvenes.
Vispirms pārbaudiet, kuras adrešu saimes piedāvā operētājsistēmas atrisinātājs, izmantojot vienu un to pašu komandu
resursdatorā un konteinerā:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Aizstājiet `omniroute` ar izmantoto pakalpojumu (piemēram, `omniroute-web`). Šīs
komandas izvada adrešu saimes bez akreditācijas datiem vai IP adresēm. Atgriezta vērtība `6`
norāda tikai uz IPv6 DNS rezultātu: tā **neapliecina**, ka ir pieejams izmantojams IPv6 maršruts vai piekļuve API.
Ja ir instalēts `curl`, abās vidēs salīdziniet
`curl -4 -I https://generativelanguage.googleapis.com` ar
`curl -6 -I https://generativelanguage.googleapis.com`.
HTTP atbilde apliecina savienojamību konkrētajai pārbaudei, pat ja tā ir neautentificēta
kļūda; Gemini pieejamību pārbauda tikai autentificēts modeļa pieprasījums.

### Resursdatora līmeņa alternatīva: funkcionējošs IPv6 un atrisinātāja politika

Ziņojuma [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) autors atjaunoja
piekļuvi savā vidē, iespējojot konteineru IPv6 un mainot glibc adrešu
atlases politiku. Uzskatiet to par konkrētai videi paredzētu alternatīvu. Pirms atrisinātāja preferenču pielāgošanas
pārliecinieties, ka resursdatora IPv6 darbojas, konteinera izejošā piekļuve un maršrutēšana ir funkcionāla un ugunsmūra kārtulas ir pareizas.
Privāta ULA adrese pati par sevi neapliecina publisku IPv6 savienojamību.

Pakalpojumiem, kas jau ir pievienoti Compose noklusējuma tīklam, šis fragments iespējo
IPv6 attiecīgajā tīklā; saglabājiet pārējo pakalpojuma, portu, sējumu un konfigurācijas saturu:

```yaml
networks:
  default:
    enable_ipv6: true
```

Nosauktam tīklam iespējojiet to tīklā, kuram pakalpojums faktiski pievienojas. Docker var
piešķirt ULA apakštīklu; skaidri norādītu apakštīklu, kas nepārklājas ar citiem, izvēlieties tikai tad, ja tas ir nepieciešams jūsu tīklam.
Skatiet [Docker IPv6 tīkla dokumentāciju](https://docs.docker.com/engine/daemon/ipv6/)
un [Compose tīkla opcijas](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**Uz glibc balstītā attēlā** `/etc/gai.conf` var mainīt adrešu atlasi. Pašreizējā
repositorija Dockerfile izmanto Debian; pielāgotiem attēliem, kuru pamatā ir musl, šis mehānisms nav pieejams.
Ziņojumā aprakstītā korekcija maina ULA etiķeti no `label fc00::/7 6` uz
`label fc00::/7 1`. Sāciet ar attēla pilno politikas tabulu un saglabājiet pārējos
tās ierakstus: pievienojot `label` vai `precedence` ierakstu, tiek aizstāta šī noklusējuma tabula, tāpēc fails,
kurā ir tikai mainītā rinda, nav pietiekams.
[glibc konfigurācijas atsaucē](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
ir dokumentēta šī darbība. Piemontējiet pārskatīto failu kā tikai lasāmu pie `/etc/gai.conf`
un izveidojiet pakalpojumu no jauna, lai piemērotu izmaiņas.

Tas maina operētājsistēmas adrešu atlasi **visai izejošajai datplūsmai šajā konteinerā**.
Tas nepiespiež katru lietojumprogrammu izvēlēties IPv6: nozīme ir arī Node DNS secībai un savienojuma
atlasei. Konkrēti, `--dns-result-order=ipv4first` dod priekšroku IPv4 un
nav risinājums kļūmei, kas rodas, izmantojot tikai IPv4. Skatiet [Node DNS secības dokumentāciju](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Pēc jebkādām resursdatora līmeņa izmaiņām vēlreiz pārbaudiet Gemini un citus pakalpojumu sniedzējus. Lai izmaiņas atsauktu,
noņemiet pielāgoto `gai.conf` montējumu, atjaunojiet iepriekšējo tīkla konfigurāciju un
apkopes loga laikā no jauna izveidojiet ietekmēto pakalpojumu/tīklu. Tīkla izveidošana no jauna
var pārtraukt citu tam pievienoto konteineru darbību; neizdzēsiet pastāvīgo datu sējumu.

## Svarīgas piezīmes

- **SQLite WAL režīms:** Komandai `docker stop` jāļauj pabeigt darbību, lai OmniRoute varētu kontrolpunktā ierakstīt jaunākās izmaiņas atpakaļ failā `storage.sqlite`. Komplektācijā iekļautajos Compose failos jau ir iestatīts 40 s apturēšanas labvēlības periods. Ja palaižat attēlu tieši, saglabājiet `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Iestatiet uz `true`, ja regulārās/pirmsieraksta dublējumkopijas tiek pārvaldītas ārēji. Esošas datubāzes migrācijām joprojām ir nepieciešams atsevišķs ilglaicīgi glabājams drošības momentuzņēmums un masveida migrācijas aizsardzība.
- **Datu pastāvīga glabāšana:** Vienmēr montējiet sējumu uz `/app/data`, lai saglabātu datubāzi, atslēgas un konfigurācijas arī pēc konteineru restartēšanas.
- **Porta konfigurācija:** Pārrakstiet vides mainīgo `PORT`, lai mainītu noklusējuma portu `20128`.

## Skatiet arī

- [VM izvietošanas ceļvedis](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare iestatīšana
- [Fly.io izvietošanas ceļvedis](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Izvietošana platformā Fly.io
- [Vides konfigurācija](../reference/ENVIRONMENT.md) — Pilna `.env` uzziņa
