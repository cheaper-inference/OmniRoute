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

## Ātrā palaišana

> **Pašmitināšana ar vienu komandu?** Skatiet
> [pašmitināšanas rokasgrāmatu](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publicēts attēls +
> Redis, pieejams tikai lokāli, bez profila izvēles). Tālāk aprakstītā ātrā palaišana ir
> viena konteinera risinājums lietotājiem, kuri jau izmanto Redis citur.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Ar vides failu

```bash
# Vispirms nokopējiet un rediģējiet .env
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

Repozitorijā ir iekļauts vairākposmu Dockerfile (`Dockerfile`). Ir pieejami četri posmi; izvēlieties savam lietošanas gadījumam atbilstošo `target`.

| Posms         | Bāzes attēls          | Mērķis                                                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instalē atkarības (`npm ci --legacy-peer-deps`) un izpilda `npm run build` (pēc noklusējuma izmanto Turbopack — skatiet tālāk sadaļu par būvēšanas laika resursiem)                                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Produkcijas izpildlaika vide ar Next.js savrupo izvadi. **Pakalpojumu sniedzēju CLI nav iekļauti.**                                                                                                                                                                                                                             |
| `runner-cli`  | `runner-base`         | Pievieno `git`, `docker.io`, `docker-compose` un globālos CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Izvēlieties šo aģentu darbplūsmām.**                                                                                                                                                        |
| `runner-web`  | `runner-base`         | Pievieno Playwright un Chromium pārlūku (`--with-deps`) tīmekļa sesiju pakalpojumu sniedzējiem: `gemini-web`, `claude-web`, `claude-turnstile`. **Izvēlieties šo, ja izmantojat šos pakalpojumu sniedzējus** — bez tā parastais attēls pieprasījuma laikā nedarbojas (skatiet piezīmi par `-web` sadaļā par laidienu kanāliem). |

Konkrētu mērķi var manuāli būvēt šādi:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Būvēšanas laika resursi

Trīs būvēšanas argumenti nosaka `builder` posma resursu patēriņu. Tie attiecas tikai uz būvēšanas laiku —
`OMNIROUTE_MEMORY_MB` (tālāk) ir atsevišķs izpildlaika iestatījums.

| Būvēšanas arguments         | Noklusējums | Ietekme                                                                                     |
| --------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` būvē ar webpack: mazāks maksimālais atmiņas patēriņš, bet lēnāk. `1` iespējo Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | V8 kaudzes ierobežojums (`--max-old-space-size`) palaistajam `next build`.                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Nodod vērtību `CIRCLE_NODE_TOTAL`; Next lapu datu apkopošanai atvasina `workers = N - 1`.   |

`OMNIROUTE_BUILD_WORKERS` ir parametrs, ko palielināt jaudīgā būvēšanas vidē un ko
pārbaudīt, ja ierobežotu resursu vidē būvēšana pārtrūkst **pēc** `✓ Compiled successfully`. Katrs
lapu datu darbinieks ir atsevišķs process, tāpat kā pats vecākprocess `next build`;
reālā VPS reprodukcijā (problēma #7518) katra procesa maksimālais RSS tika izmērīts
~4,5 GB apjomā neatkarīgi no `NODE_OPTIONS` kaudzes karoga (Turbopack kompilē,
izmantojot vietējo/Rust atmiņu ārpus V8 kaudzes). Noklusējuma vērtība `2` (→ 1 darbinieks, kopā 2
procesi) ir paredzēta 16 GB / 4 vCPU GitHub mitinātajiem izpildītājiem, kurus
izmanto publicēšanas konveijers. Ar `8` (→ 7 darbinieki) šim izpildītājam beidzās atmiņa, un
buildkit pārtrauca darbību ar `ResourceExhausted: ... cannot allocate memory`;
arī `3` (→ 2 darbinieki) neietilpa atmiņā, kad katra procesa RSS tika mērīts
tieši, nevis aplēsts. `tests/unit/docker-build-memory-budget.test.ts`
veic aprēķinus, izmantojot izmērīto vērtību, un izraisa kļūmi, ja kāds no parametriem
pārsniedz izpildītāja iespējas.

Turbopack kompilē, izmantojot vietējo Rust atmiņu, kas atrodas **ārpus** V8 kaudzes, tāpēc
`OMNIROUTE_BUILD_MEMORY_MB` to neierobežo. Resursdatorā ar atmiņas ierobežojumu OOM
iznīcinātājs pārtrauc būvēšanu ar SIGKILL bez jebkāda kļūdas teksta — tā vienkārši
apstājas `Creating an optimized production build` procesa vidū, kas drīzāk izskatās pēc
iestrēgšanas, nevis atmiņas izsīkuma. Tāpēc `Dockerfile` pēc noklusējuma izmanto webpack
(`OMNIROUTE_USE_TURBOPACK=0`), atšķirībā no `npm run dev` / `npm run build`, kur
Turbopack ir noklusējuma izvēle kodā: vienkārša komanda `docker build .` bez būvēšanas argumentiem (ko
izpilda Railway un citi viena klikšķa mitināšanas pakalpojumi) nedrīkst klusi pārtrūkt
būvēšanas vidē ar ierobežotu atmiņu. Publicētajos attēlos parametrs `OMNIROUTE_USE_TURBOPACK=0`
jau tiek tieši nodots failā `docker-publish.yml`. Būvēšanas vidē ar pietiekamu RAM apjomu iespējojiet
Turbopack, lai būvēšana būtu ātrāka:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` ir iespējots, tāpēc `next build` palaiž vecākprocesu **un** darbinieka
procesu, un katrs no tiem atsevišķi ievēro `OMNIROUTE_BUILD_MEMORY_MB`. Iestatiet konteinera
ierobežojumu aptuveni virs divkāršas šīs vērtības, nevis vienas.

Mērījumi šajā koka versijā (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Komplektētājs | Konteinera ierobežojums | Rezultāts                                  |
| ------------- | ----------------------- | ------------------------------------------ |
| Turbopack     | 8 GiB / 16 GiB          | Abos gadījumos klusi pārtraukts OOM dēļ    |
| webpack       | 8 GiB                   | Būvēšanas darbinieks pārtraukts ar SIGKILL |
| webpack       | 12 GiB                  | Izdevās, maksimums sasniedza 11,1 GiB      |

### Izpildlaika noklusējumi

`runner-base` eksportētie noklusējumi: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Atmiņas darbība Docker vidē:

- Attēls iestata `OMNIROUTE_MEMORY_MB=1024` un no tā atvasina `NODE_OPTIONS=--max-old-space-size=1024`.
- Faktisko servera procesu palaiž savrupais palaidējs, kas nolasa `OMNIROUTE_MEMORY_MB` un pievieno `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node izmanto pēdējo atkārtoto `--max-old-space-size` vērtību, tāpēc `OMNIROUTE_MEMORY_MB` iestatīšana nosaka faktisko Docker kaudzes ierobežojumu.
- Tā kā attēls to vienmēr iestata, palaidēja paša RAM kalibrētā atkāpšanās vērtība Docker vidē nekad netiek izmantota. Palieliniet to tieši atbilstoši darba slodzei (skatiet tabulu tālāk). `2048` joprojām ir par maz programmēšanas aģentu `/v1/responses` pieprasījumiem.

### Izpildlaika RAM programmēšanas aģentiem

Docker noklusējuma 1 GiB ir minimums informācijas panelim un vienkāršai tērzēšanai, nevis produkcijas vides apjoms. Gari `POST /v1/responses` pieprasījumu ķermeņi (simtiem ziņojumu, desmitiem rīku) saspiešanas laikā atmiņā saglabā vairākus grafus. Divi vienlaicīgi ~3 MiB / ~750k marķieru pieprasījumi ir izraisījuši V8 avāriju ar **12 GiB** vecās paaudzes telpu (`FATAL ERROR: Reached heap limit`), kā arī sasnieguši 16 GiB cgroup OOM ierobežojumu. Skatiet [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Iestatiet **cgroup `--memory` lielāku par kaudzes apjomu** — vietējie buferi, SQLite un saspiešanas starprezultāti atrodas ārpus V8.

| Darba slodze                                       | `OMNIROUTE_MEMORY_MB`       | Konteiners / cgroup           | Piezīmes                                                                                                           |
| -------------------------------------------------- | --------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Informācijas panelis, viena vienkārša tērzēšana    | `1024` (attēla noklusējums) | ≥2 GiB                        |                                                                                                                    |
| Viens programmēšanas aģents (Claude/Codex/Grok)    | `8192`                      | ≥10 GiB                       | Tipiska vienas sesijas `/v1/responses` slodze                                                                      |
| Divi vienlaicīgi gari `/v1/responses` pieprasījumi | `10240`–`12288`             | ≥12–16 GiB                    | Novērota V8 avārija ar ~12 GiB kaudzi                                                                              |
| Trīs vai vairāk vienlaicīgi gari konteksti         | nedarbiniet vienā procesā   | izpildiet secīgi / vairāk RAM | Pēc noklusējuma atļauts 1 smags aktīvs pieprasījums; šī skaita palielināšana bez papildu RAM atkal izraisa avāriju |

`omniroute serve` uz fiziskas sistēmas kalibrē aptuveni 35% RAM (ierobežojot diapazonā `[512, 4096]`), ja `OMNIROUTE_MEMORY_MB` **nav iestatīts**. Docker vienmēr iestata `1024`, tāpēc oficiālajā attēlā šī kalibrēšana nekad netiek veikta.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Reversais starpniekserveris apakšceļā (Traefik / nginx)

Next.js `basePath` tiek kompilēts savrupajā pakotnē. OmniRoute saglabā iekļauto
vērtību kontrolfailā lietotnes saknē (tas tiek ierakstīts `npm run build` laikā un nolasīts,
izmantojot `scripts/docker/ensure-docker-base-path.mjs`) un konteinera palaišanas laikā
salīdzina to ar `OMNIROUTE_BASE_PATH`. Ja šīs vērtības atšķiras un attēls ir
būvēts domēna saknei, ieejas punkts pārraksta savrupos manifestus,
iegultās `basePath`/`assetPrefix` literāļu vērtības (Next 16 renderē SSR resursu URL,
izmantojot tikai `assetPrefix`, tāpēc labošanas rīks tajā atspoguļo apakšceļu), iekļautos
`/_next/static` resursu URL (klienta atsauču manifestus, multivides importus, iepriekš renderētās
kļūdu lapas) un klienta `process.env` aizstājēju, pirms tiek palaists
`node dev/run-standalone.mjs`.

### Compose būvējums (ieteicams)

Iestatiet abus mainīgos failā `.env`, pēc tam veiciet atkārtotu būvēšanu, lai attēla un izpildlaika
konfigurācijas sakristu:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` pārsūta `OMNIROUTE_BASE_PATH` gan kā Docker būvēšanas argumentu, gan kā
izpildlaika vides mainīgo.

### Iepriekš būvēts saknes attēls + izpildlaika apakšceļš

Publicētie `diegosouzapw/omniroute:*` attēli ir būvēti domēna saknei. Joprojām varat
izpildlaikā iestatīt `OMNIROUTE_BASE_PATH`; konteiners palaišanas laikā vienreiz izlabo pakotni.
Savienojiet to pārī ar atbilstošo publisko izcelsmes adresi:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurējiet reverso starpniekserveri tā, lai tas pārsūtītu **pilnu** ārējo ceļu (nenoņemiet
prefiksu). Traefik ir jāmaršrutē `PathPrefix(`/omniroute`)` uz konteineru bez
`StripPrefix`, lai Next.js saņemtu `/omniroute/...` un nodrošinātu resursus no
`/omniroute/_next/...`.

Docker veselības pārbaude pārbauda vienkāršoto `/healthz` dzīves cikla galapunktu, kam pievienots
aktīvais `OMNIROUTE_BASE_PATH` prefikss. `/api/monitoring/health` joprojām ir pieejams
diagnostikai, ko veic cilvēki vai informācijas paneļi; lai konteinera HEALTHCHECK atkal novirzītu uz to
(piemēram, padziļinātai veselības stāvokļa kontrolei), iestatiet `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Šis ceļš veic **padziļinātu** pārbaudi (DB + uzraudzības kopsavilkums) — tas ir piemērots Docker
retajām `HEALTHCHECK` pārbaudēm, ja izvēlaties to atkal iespējot, bet **nav** piemērots Kubernetes `livenessProbe`
intervāliem.

Orķestratoriem (Kubernetes, Nomad u.c.):

| Pārbaude                    | Ieteicams                                                                   | Nav ieteicams                                                             |
| --------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Dzīvīgums                   | HTTP `GET /livez` vai TCP galvenajā portā (`PORT`, pēc noklusējuma `20128`) | `/api/monitoring/health` kā dzīvīguma pārbaude                            |
| Gatavība                    | HTTP `GET /healthz`                                                         | Īsi taimauti, kas aizņemtu notikumu cilpu uzskata par nereaģējošu procesu |
| Padziļināta / melnās kastes | `/api/monitoring/health`                                                    | —                                                                         |

`/healthz` ziņo par procesa dzīves ciklu (`ok` / `starting` / `stopping`). `/livez` pārbauda
tikai to, vai process darbojas (200 ikreiz, kad apdarinātāju var izpildīt; tas negaida
gatavību). Abi joprojām darbojas tajā pašā Node notikumu cilpā, kurā tiek apstrādāti pieprasījumi, tāpēc
CPU intensīva kataloga vai saspiešanas apstrāde var tos aizkavēt — aizņemts ≠ nereaģējošs. Ja HTTP
pārbaudēm iestājas taimauts, dodiet priekšroku TCP dzīvīguma pārbaudei. Pilnīgi norādījumi par pārbaudēm:
[Uzraudzības ceļvedis — ieteikumi Kubernetes pārbaudēm](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose ar Caddy (HTTPS Auto-TLS)

OmniRoute var droši padarīt pieejamu, izmantojot Caddy automātisko SSL nodrošināšanu. Pārliecinieties, ka jūsu domēna DNS A ieraksts norāda uz jūsu servera IP adresi.

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
      # Pārlūkprogrammai paredzētais avots OAuth atzvaniem, informācijas paneļa saitēm un ģenerētajiem publiskajiem URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Iekšējais serveru savstarpējās saziņas URL ieplānotajiem uzdevumiem / pašpieprasījumiem.
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

Caddy iestata standarta pārsūtīšanas galvenes augšupstraumes konteineram. OmniRoute izmanto
`NEXT_PUBLIC_BASE_URL` kā kanonisko publisko avotu OAuth atzvaniem un ģenerētajām publiskajām
saitēm; autentificēta rakstīšana informācijas panelī izmanto viena avota pieprasījumus kopā ar sesijai piesaistītu CSRF
aizsardzību. Iespējojiet `OMNIROUTE_TRUST_PROXY` tikai sarežģītākos izvietojumos, kuros apzināti
vēlaties, lai OmniRoute noteiktu publisko avotu no uzticamām pārsūtītajām galvenēm, nevis no tiešas
konfigurācijas.

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

## Attēlu tagi

| Attēls                   | Tags     | Izmērs | Apraksts                                                         |
| ------------------------ | -------- | ------ | ---------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Augstākā **publicētā** stabilā SemVer versija (nevis git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Fiksējiet šīs klases tagu GitOps vajadzībām                      |

Vairāku platformu manifests: vietējie `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automātiski atlasa atbilstošo arhitektūru; norādiet `--platform linux/amd64`, ja ARM resursdatoros nepieciešams piespiedu kārtā izmantot AMD64 emulāciju.

### Laidienu kanāli

OmniRoute publicē atsevišķus Docker kanālus stabilajiem laidieniem, aktīvā laidiena zara testēšanai un izstrādes būvējumiem.

| Kanāls                          | Avots                                         | Mainīgums                    | Ieteicamais lietojums                                                                                                        |
| ------------------------------- | --------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Parakstīts/versijots laidiens                 | Nemainīgs                    | Produkcijas izvietojumi, kuros tiek fiksēts konkrēts laidiens                                                                |
| `:latest` / `:latest-web`       | Augstākā **publicētā** stabilā SemVer versija | Mainīga stabilā norāde       | Seko stabilajiem laidieniem **pēc** SemVer publicēšanas uzdevuma — **neseko** `main` vai nepublicētiem `release/v*` komitiem |
| `:next` / `:next-web`           | Pašreizējais noklusējuma `release/v*` zars    | Mainīga pirmslaidiena norāde | Tādu labojumu testēšana, kas ir iekļauti aktīvajā laidiena zarā, bet vēl nav iekļauti stabilā laidienā                       |
| `:main` / `:main-web`           | `main` zars                                   | Mainīga izstrādes norāde     | Tikai izstrādei un integrācijas testēšanai                                                                                   |

#### Tīmekļa sesiju nodrošinātāji: `-web` attēli

Katram iepriekš norādītajam kanālam ir arī `-web` tags (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), kas veidots no `runner-web` posma — tas ir tas pats attēls, papildināts ar Playwright un Chromium pārlūkprogrammu. Parastais attēls tiek piegādāts **bez** Chromium; `gemini-web`, `claude-web` un `claude-turnstile` tas ir nepieciešams.

Kļūme tiek atlikta un nenotiek palaišanas laikā: šie nodrošinātāji uzskaita savus modeļus un informācijas panelī tiek rādīti kā savienoti, bet tikai pirmais pieprasījums beidzas ar kļūmi

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Ja izmantojat šos nodrošinātājus, lejupielādējiet tā kanāla `-web` tagu, kuru jau izmantojat — nekas cits nemainās. npm/CLI instalācijā (bez Docker attēla) trūkstošais komponents ir pārlūkprogrammas binārais fails: resursdatorā izpildiet `npx playwright install chromium`.

#### Pirmslaidiena kanāla izmantošana

Kanāls `next` tiek atkārtoti būvēts pēc katras izmaiņu nosūtīšanas uz pašreizējo noklusējuma `release/v*` zaru un tiek publicēts gan AMD64, gan ARM64 arhitektūrai. Vecāki uzturēšanas zari to nevar pārrakstīt. Šis kanāls nodrošina izgūstamu attēlu ar labojumiem, kas ir sapludināti aktīvajā laidiena zarā, pirms tiek izveidots nākamais stabilais tags.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Izmantojot Docker Compose, pārrakstiet atlasītajā profilā izmantoto attēla tagu, pēc tam izgūstiet attēlu un izveidojiet pakalpojumu no jauna:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Drošība un atgriešanās pie iepriekšējās versijas

`next` ir mainīgs pirmsizlaides kanāls. Tas var mainīties pēc jebkuras izmaiņu nosūtīšanas uz aktīvo laidiena zaru un **nav paredzēts lietošanai produkcijas vidē**. Konkrētas būvējuma versijas novērtēšanas laikā fiksējiet attēla jaucējkopsavilkumu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Pirms testēšanas izveidojiet OmniRoute datu sējuma vai piesaistītā datu direktorija dublējumu. Lai atgrieztos pie iepriekšējās versijas, atjaunojiet iepriekš izmantoto stabilo versiju vai jaucējkopsavilkumu un izveidojiet konteineru no jauna:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Laidiena zara būvējums nekad nevar pārvietot `latest`; stabilo norādi drīkst atjaunināt tikai atbilstoša stabila semantiskā versija. `next` attēliem tiek saglabāta laidiena attēlu pārbaude un bloķējošā KRITISKO ievainojamību pārbaude.

**`latest` negarantē Git repozitorija aktuālāko stāvokli.** Labojumi, kas sapludināti zarā `main` vai aktīvajā `release/v*` zarā, **nav** iekļauti `:latest`, kamēr nav publicēts stabils SemVer attēls un publicēšanas uzdevums nav atjauninājis `:latest` (tas pats jaucējkopsavilkums kā attiecīgajai SemVer versijai). Ja šķiet, ka `latest` ir iesaldēts, lai gan GitHub jau ir redzams labojums, izgūstiet `:next`, lai testētu laidiena zaru, vai gaidiet SemVer tagu.

| Jūsu mērķis                                                                                | Izmantojiet                                        |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| GitOps / produkcijas vide, kurā nedrīkst būt neparedzētu izmaiņu                           | Fiksējiet `:X.Y.Z` (vai attēla jaucējkopsavilkumu) |
| Sekot publicētajiem stabilajiem laidieniem un pieņemt atkārtotu izveidi pēc katra laidiena | `:latest`                                          |
| Testēt neizlaistas `release/v*` izmaiņas                                                   | `:next` (ne produkcijas videi)                     |
| Testēt `main`                                                                              | `:main` (ne produkcijas videi)                     |

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

## Pieejamība: noklusējuma SQLite ir paredzēts vienai replikai

Standarta Docker/Kubernetes OmniRoute konfigurācija ir **viens Node process + viens SQLite rakstītājs**. Šajā topoloģijā augsta pieejamība **netiek atbalstīta**.

| Ierobežojums                                          | Sekas                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Viens rakstītājs                                      | **Nedarbiniet** vairākas replikas ar vienu un to pašu SQLite failu. Tas sabojā datubāzi.                                                                                                                                                                                                                                                                                                           |
| Atkārtota izveide/restartēšana/HEALTHCHECK apturēšana | **Pilnīgs darbības pārtraukums**, kas skar notiekošos SSE savienojumus, informācijas paneļa sesijas un atmiņā glabāto stāvokli. Katrs pievienotais klients tiek atvienots. Jauni pieprasījumi laikā, kad nav neviena galapunkta, no reversā starpniekservera saņem **`502 Bad Gateway: Unknown error`**, nevis OmniRoute JSON — klienti to nevar atšķirt no pakalpojuma sniedzēja kļūmes (#11015). |
| Tā pati notikumu cilpa kā `/healthz`                  | Noslogota kataloga vai saspiešanas cikla darbība var aizkavēt pārbaudes; īss taimauts tad restartē **vienīgo** repliku.                                                                                                                                                                                                                                                                            |

**Pārbaužu matrica** (skatiet arī [Kubernetes pārbaužu ieteikumus](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Pārbaude              | Mērķis                                                                       | Neizmantojiet                                                         |
| --------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Dzīvīgums             | TCP portā `PORT` (noklusējums `20128`) vai saudzīga HTTP pārbaude `/healthz` | `/api/monitoring/health`                                              |
| Gatavība              | HTTP `GET /healthz`                                                          | Īsus taimautus, kas noslogotu notikumu cilpu uzskata par nedarbojošos |
| Padziļināta/cilvēkiem | `/api/monitoring/health`                                                     | Automatizētu kubelet dzīvīguma pārbaudi                               |

**Jaunināšana:** sagaidiet, ka katra sesija tiks pārtraukta. Ja iespējams, pakāpeniski atvienojiet klientus; ar noklusējuma SQLite nav pieejama nepārtraukta atjaunināšana. Compose `restart: unless-stopped` kopā ar Docker `HEALTHCHECK` aizstās arī vienīgo procesu, kad konteinera statuss būs Unhealthy — ar tikpat plašām sekām.

Kubernetes fragments **vienai replikai** (nepieciešama Recreate stratēģija; nepalieliniet `replicas`, ja tiek izmantots viens SQLite fails):

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

`preStop` aizture ļauj kube noņemt Service galapunktus pirms SIGTERM, lai **jauna** datplūsma vairs nenonāktu procesā, kas tiek apturēts. Aktīvie `/v1/responses` SSE savienojumi tiek pabeigti ne ilgāk kā `SHUTDOWN_TIMEOUT_MS` laikā (pēc noklusējuma 30 s), izmantojot smagsvara uzņemšanas nomas (#11015). Jauni pieprasījumi, kas tomēr sasniedz procesu, saņem `503` + `Retry-After: 5`. Recreate radītais periods bez galapunktiem, līdz aizstājējinstance ir gatava, joprojām izraisa pilnīgu pakalpojuma pārtraukumu — tā ir SQLite topoloģijas, nevis nepareizas zondes konfigurācijas sekas.

Ārējs Postgres / vairāku rakstītāju HA **nav** dokumentēts standarta risinājums. Ja jums nepieciešams HA, izmantojiet vienu repliku vai topoloģiju, ko projekts ir pārbaudījis un atsevišķi dokumentējis. Darbs pie Postgres/MySQL ir aprakstīts [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Līdz tā izlaišanai vienīgais atbalstītais veids, kā palielināt **lielu** `/v1/responses` pieprasījumu apstrādes jaudu, ir N neatkarīgi procesi (nākamā sadaļa), nevis `replicas > 1` vienā sējumā.

## Horizontālā mērogošana: N neatkarīgi procesi

Viens Node process ir **viena V8 kaudze**. Divi pārklājošies ~3 MiB / ~750k tokenu kodēšanas aģenta `POST /v1/responses` pieprasījumi (RTK + Caveman) pārtrauc šīs kaudzes darbību pie ~12 Gi (`FATAL ERROR: Reached heap limit`) un var izraisīt atmiņas izsmelšanu 16 Gi cgroup. Skatiet [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Šis mērījums ir **atmiņas budžeta** brīdinājums, nevis produkta stingrais maksimums — divi vienlaicīgi ilgi `/v1/responses` pieprasījumi. Resursietilpīgas tērzēšanas uzņemšanu ierobežo automātiski atvasināts ienākošo datu baitu budžets (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), kura lielumu nosaka tas pats V8/cgroup ierobežojums — tā palielināšana (vai mantotā pieprasījumu skaita ierobežojuma `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` iestatīšana) jau atbilstoši konfigurētā procesā atkal izraisa procesa pārtraukšanu. Mazas tērzēšanas, `/healthz`, `/v1/models` un MCP **nav** iekļauti šajā ierobežojumā.

### Viens process: vairāk nekā divi ilgi `/v1/responses`

**Veselīgs** process (kaudze zem `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, pēc noklusējuma `0.75`) **var** izpildīt vairāk nekā divus vienlaicīgus ilgus `POST /v1/responses` pieprasījumus, ja visa procesa neizpildīto datu baitu budžetā (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) joprojām ir vieta. Pieprasījumu ķermeņi, kuru lielums sasniedz vai pārsniedz `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (pēc noklusējuma 256 KiB), izmanto to pašu resursietilpīgo nomu kā strukturāli sarežģīti pieprasījumi un to pašu [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` atkāpi (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desmitiem vienlaicīgu ilgstošu SSE klientu (operatoriem bieži nepieciešami 40–50) ir **atmiņas budžeta** jautājums — konfigurējiet kaudzes lielumu, primārās/papildu rezerves vietas un `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` —, nevis stingrs produkta ierobežojums “maksimums 2”. Noslogota kaudze joprojām noraida pieprasījumus ar atkārtojamu `503`, lai #7849 neatkārtotos.

Lai **pavairotu kaudzes** (neatkarīgas V8 vecās paaudzes atmiņas zonas) **jau šodien**:

| Dariet                                                                                                                                                                                                          | Nedariet                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Darbiniet **N konteinerus/podus**, katru ar savu `DATA_DIR` / sējumu                                                                                                                                            | Neiestatiet `replicas > 1` vienam SQLite failam                                    |
| Nosakiet resursietilpīgo neizpildīto pieprasījumu un veselīgās papildu rezerves lielumu pēc kaudzes / neizpildīto datu baitu budžeta; 1–2 ir konservatīvais #7849 noklusējums, nevis stingrs produkta maksimums | Nepiešķiriet vienam procesam 8× RAM un neierobežotu skaita limitu                  |
| Neobligāti: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **koplietotiem kvotu skaitītājiem**                                                                                                            | Neuzskatiet Redis par koplietotu SQLite — tas tāds nav                             |
| Dublējiet nodrošinātāju noslēpumus katrā instancē (vai pieņemiet sadalītus informācijas paneļus)                                                                                                                | Negaidiet vienu informācijas paneli / vienu zvanu žurnālu visām instancēm          |
| Priekšā izmantojiet jebkuru slodzes līdzsvarotāju; pietiek ar piesaisti API atslēgai vai sesijai                                                                                                                | Neprasiet konkrētam piegādātājam raksturīgu, izmēru ņemošu vērā starpprogrammatūru |

Aparatūra: vienas instances vienlaicīgo ilgo `/v1/responses` pieprasījumu skaits ir **atmiņas budžeta** jautājums (kaudze + neizpildīto datu baitu budžets / #10110). `N` neatkarīgi `DATA_DIR` joprojām pavairo kaudzes: resursdatora RAM jāspēj nodrošināt `N × cgroup`, nevis “viens 16 Gi pods ar N=8”. Nekad neizmantojiet `replicas > 1` vienam SQLite failam.

Compose skice (divas kaudzes, divi sējumi — nevis `deploy.replicas: 2`):

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

Procesa iekšējais blīvums (kompresija ārpus HTTP izolāta) ir [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Viens loģisks klasteris ar koplietotu pastāvīgo stāvokli ir [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
