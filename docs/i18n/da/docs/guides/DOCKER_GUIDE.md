# 🐳 Docker Guide — OmniRoute (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Komplet reference til Docker-implementering. Se [README-afsnittet om Docker](../README.md#-docker) for at komme hurtigt i gang.

## Indholdsfortegnelse

- [Hurtig kørsel](#quick-run)
- [Med miljøfil](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Tilgængelige profiler](#available-profiles)
- [Konfiguration af CLI-værktøjer på værten, når OmniRoute kører i Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Compose til produktion](#production-compose)
- [Dockerfile-faser](#dockerfile-stages)
- [Kritiske miljøvariabler](#critical-environment-variables)
- [Docker Compose med Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Hurtig Cloudflare-tunnel](#cloudflare-quick-tunnel)
- [Image-tags](#image-tags)
- [Dashboard-opdateringer i Docker](#dashboard-updates-in-docker)
- [Tilgængelighed: SQLite-standarden understøtter kun én replika](#availability-default-sqlite-is-single-replica)
- [Regionale Gemini-fejl i Docker](#gemini-regional-errors-inside-docker)
- [Vigtige bemærkninger](#important-notes)

---

## Hurtigt løb

> **Selvvært i én kommando?** Se [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (offentliggjort billede + Redis, loopback-kun, intet profilvalg). Hurtigkørslen nedenfor er stien til en enkelt container for brugere, der allerede kører Redis andre steder.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  cheaperinference/omniroute:latest
```

## Med miljøfil

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
# Basisprofil (ingen CLI-værktøjer)
docker compose --profile base up -d

# CLI-profil (Claude Code, Codex og OpenClaw indbygget)
docker compose --profile cli up -d

# Værtsprofil (primært til Linux; monterer værtens CLI-binære filer skrivebeskyttet)
docker compose --profile host up -d

# Webprofil (Chromium/Playwright til websessionsudbydere)
docker compose --profile web up -d

# Kombiner CLI + CLIProxyAPI-sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Tilgængelige profiler

OmniRoute leveres med Compose-profiler til de vigtigste implementeringsformer. Vælg den, der passer til dit miljø.

| Profil            | Tjeneste         | Hvornår den skal bruges                                                                                                                                | Kommando                                     |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (standard) | `omniroute-base` | Headless server/minimal kørsel uden medfølgende CLI'er til udbydere                                                                                    | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentbaserede arbejdsgange, der kalder `omniroute providers/setup/doctor`, samt medfølgende CLI'er (Codex, Claude Code, Droid, OpenClaw)               | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-værter, der ønsker `network_mode`-lignende adgang til værtens CLI'er ved at montere `~/.local/bin`, `~/.codex`, `~/.claude` osv. skrivebeskyttet | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Kør [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) som sidecar på port `8317` til proxying af upstream-CLI'er                             | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Websessionsudbydere, der kræver en browser: `gemini-web`, `claude-web`, `claude-turnstile` (bygger `runner-web`, Chromium inkluderet)                  | `docker compose --profile web up -d`         |

> Flere profiler kan kombineres: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfiguration af værtsbaserede CLI-værktøjer, når OmniRoute kører i Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` og dashboardets
**Gem konfiguration**-knap skriver alle filer som `~/.codex/*.config.toml`. Disse stier
giver kun mening på den maskine, hvor CLI'en faktisk kører. Kør dem inde i
containeren, og skrivningen ender i containerens egen hjemmemappe (`/home/node` —
imaget kører med `USER node`), hvor ingen CLI på værten nogensinde vil læse den, og hvor den
forsvinder i det øjeblik, containeren genoprettes.

OmniRoute registrerer dette og afviser skrivningen med instruktioner i stedet for
at rapportere en succes, du ikke kan bruge: CLI'en afsluttes med `2`, og API'et svarer med `422`
og `containerEphemeralTarget: true`.

### Anbefalet: Kør CLI'en på værten og OmniRoute i Docker

Containeren leverer API'et; CLI'en konfigurerer dine værtsbaserede værktøjer.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # peg CLI'en mod containeren
omniroute setup-codex                      # skriver den faktiske ~/.codex på din vært
```

Dette er det rette valg, når Codex, Claude Code, Cursor eller lignende kører på din
bærbare computer — hvilket er den normale opsætning.

### Alternativ: Bind-mount værtens konfigurationsmapper (`host`-profil)

Hvis containeren selv skal skrive din værtskonfiguration, skal du mounte
mapperne og pege `CLI_CONFIG_HOME` på mount-roden. `host`-profilen
gør allerede dette:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Et bind-mount er det, der gør stien pålidelig: OmniRoute læser
`/proc/self/mountinfo` og tillader skrivninger til mountede stier (og til mapper,
hvis undermapper er mounts, hvilket præcis svarer til `/host-home`-strukturen ovenfor), mens
ikke-mountede stier stadig afvises.

### Nødudvej: Konfigurer containerens egne CLI'er (brug med omtanke)

Når CLI'erne reelt befinder sig inde i containeren (`cli`-profilen), er skrivningen
tilsigtet. Angiv `--allow-container-write` til enhver `setup-*`-kommando, eller indstil
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` for serveren. Skrivningen gennemføres
med en advarsel om, at den ikke overlever containeren.

> **Sikkerhedsadvarsel — `cli`-profil + `docker.sock`-mount.**
> `cli`-profilen bind-mounter `/var/run/docker.sock`, så den automatiske opdatering
> inde i containeren kan genoprette stacken via værtsdaemonen
> (`src/lib/system/autoUpdate.ts` undersøger, om denne socket findes, og springer
> Docker-stien over, når den ikke gør). Denne socket er **en tillidsgrænse med
> root-adgang til værten**: Alt, der kan tilgå den, styrer værtens Docker-daemon som
> root — det kan oprette, inspicere, stoppe og fjerne enhver container på værten.
> Konsekvenser:
>
> 1. **Eksponér aldrig `cli`-profilens port til netværket.** Udgiv
>    den på `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — en `cli`-profil, der kan nås fra LAN'et, forvandler enhver RCE på dashboardniveau til
>    fuld kompromittering af værten.
> 2. **Bind ikke yderligere værtsmapper ind i `cli`-profilen.**
>    Docker-socketen kombineret med et hvilket som helst yderligere mount giver containeren fuld
>    læse-/skriveadgang til dit filsystem og din værtskonfiguration. Hvis et værktøj skal
>    kunne se et projekt, skal du køre det lokalt med CLI-binærfilen — mount det ikke
>    ind i `cli`-containeren.
>
> Hvis du ikke har brug for automatisk opdatering inde i containeren, skal du lade `cli`-profilen være deaktiveret
> (`COMPOSE_PROFILES=core,redis` eller kortere). De andre profiler
> mounter ikke Docker-socketen.
>
> Se `docs/security/MITM-TPROXY-DECRYPT.md` (git; ikke kompileret ind i `/docs`) for den relaterede trusselsmodel
> omkring MITM og `docs/security/SUPPLY_CHAIN.md` for
> oprindelseskæden for de binære filer `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-sidecar

OmniRoute er afhængig af Redis som backend for den distribuerede hastighedsbegrænser og den delte cache. Tjenesten `redis` er **altid defineret** i `docker-compose.yml` (den har ingen profilstyring) og starter sammen med enhver anden profil.

| Detalje                        | Værdi                                       |
| ------------------------------ | ------------------------------------------- |
| Image                          | `redis:7-alpine`                            |
| Containernavn                  | `omniroute-redis`                           |
| Intern port                    | `6379`                                      |
| Værtsport (tilsidesættelse)    | `REDIS_PORT` (standard er `6379`)           |
| Værtsbinding (tilsidesættelse) | `REDIS_BIND_HOST` (standard er `127.0.0.1`) |
| Diskenhed                      | `omniroute-redis-data` → `/data`            |
| Tilstandskontrol               | `redis-cli ping` (interval på 10 sekunder)  |

Relaterede miljøvariabler:

- `REDIS_URL` — forbindelsesstreng, der injiceres i applikationen (`redis://redis:6379` som standard).
- `REDIS_PORT` — porttilknytning på værtssiden for Redis-containeren.
- `REDIS_BIND_HOST` — værtsgrænsefladen, som porten publiceres på. Standard er `127.0.0.1`.

> **Hvorfor loopback bruges som standard:** Sidecar-containeren kører uden `requirepass`, og applikationscontainerne
> kommunikerer med den via Compose-netværket (`redis:6379`) — den publicerede port er
> kun beregnet til værktøjer på værtssiden (`redis-cli`, en lokal `npm run dev`). Publicering på
> `0.0.0.0` ville eksponere en Redis-instans uden godkendelse for alle værter på dit LAN. Hvis du angiver
> `REDIS_BIND_HOST=0.0.0.0`, skal du også føje `--requirepass` til tjenestens `command:`.

Det anbefales ikke at **deaktivere Redis** (hastighedsbegrænseren vil gå over til en reduceret fallback i hukommelsen). Hvis det er nødvendigt, kan du enten fjerne/udkommentere tjenesteblokken `redis:` i `docker-compose.yml` eller skalere den til nul:

```bash
docker compose up -d --scale redis=0
```

## Compose til produktion

Brug `docker-compose.prod.yml` til et isoleret produktionsøjebliksbillede, der kører parallelt med udviklingsmiljøet.

| Detalje                       | Værdi                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| Fil                           | `docker-compose.prod.yml`                                                                   |
| Standardport til kontrolpanel | `PROD_DASHBOARD_PORT=20130` (tilknyttet intern `${DASHBOARD_PORT:-20128}`)                  |
| Standard-API-port             | `PROD_API_PORT=20131`                                                                       |
| Image                         | `omniroute:prod` (bygget fra målet `runner-cli`)                                            |
| Redis-container               | `omniroute-redis-prod` (`redis:8.6.2`, dedikeret diskenhed `redis-prod-data`)               |
| Datadiskenhed                 | `omniroute-prod-data` (navngivet og bevaret på tværs af genopbygninger)                     |
| Tilstandskontroller           | `node healthcheck.mjs` + `redis-cli ping`, hvor `depends_on` er betinget af Redis' tilstand |

Sådan bruges det:

```bash
# Byg og start produktionsstakken
docker compose -f docker-compose.prod.yml up -d --build

# Følg logfiler
docker compose -f docker-compose.prod.yml logs -f

# Luk ned (behold diskenheder)
docker compose -f docker-compose.prod.yml down
```

Produktionsstakken kører parallelt med Compose-miljøet til udvikling (med forskellige containernavne, porte og diskenheder), så du kan fortsætte med at udvikle lokalt, mens produktionen forbliver i drift.

## Dockerfile-stadier

Depotet sender en flertrins Dockerfile (`Dockerfile`). Fire stadier er blotlagt; vælg den rigtige `target` til din brug.

| Scene         | Grundbillede          | Formål                                                                                                                                                                                                                                                                                           |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Installerer deps (`npm ci --legacy-peer-deps`) og kører `npm run build` (Turbopack som standard — se Build-time ressourcer nedenfor)                                                                                                                                                             |
| `runner-base` | `node:26-trixie-slim` | Produktionskørsel med Next.js standalone-output.** Ingen udbyder CLIs bundtet.**                                                                                                                                                                                                                 |
| `runner-cli`  | `runner-base`         | Tilføjer `git`, `docker.io`, `docker-compose` og global CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Vælg dette for agentiske arbejdsgange.**                                                                                                                      |
| `runner-web`  | `runner-base`         | Tilføjer Playwright + en Chromium-browser (`--with-deps`) til web-sessionsudbydere: `gemini-web`, `claude-web`, `claude-turnstile`.** Vælg dette, når du bruger disse udbydere** — det almindelige billede fejler på anmodningstidspunktet uden det (se `-web` notatet under Udgivelseskanaler). |

Byg et specifikt mål manuelt:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Byggetidsressourcer

Tre build-argumenter styrer, hvad `builder` stadiet koster. De er kun byggetid. — `OMNIROUTE_MEMORY_MB` (nedenfor) er en separat, runtime-knap.

| Byg arg                     | Misligholdelse | Effekt                                                                                    |
| --------------------------- | -------------- | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`            | `0` bygger med webpack: lavere peak-hukommelse, langsommere. `1` tilmelder sig Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`         | V8 heap loft (`--max-old-space-size`) for den affødte `next build`.                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`            | Foder `CIRCLE_NODE_TOTAL`; Next udleder `workers = N - 1` til sidedataindsamling.         |

`OMNIROUTE_BUILD_WORKERS` er den, der rejser på en stor bygmester og den, der mistænker, når en begrænset bygning dør** efter** `✓ Compiled successfully`. Hver side-data-arbejder er sin egen proces, og det samme er den overordnede `next build` selv; en live VPS reproduktion (issue #7518) målte hver process peak RSS ved ~ 4,5 GB uafhængigt af `NODE_OPTIONS` heap-flaget (Turbopack kompilerer i native/Rust -hukommelse uden for V8-heapen). Standarden for `2` (→ 1 arbejder, 2 processer i alt) er størrelsen til de 16 GB / 4 vCPU GitHub-hostede løbere, som publiceringspipelinen bruger. Ved `8` (→ 7 arbejdere) løb den løber tør for hukommelse og buildkit mislykkedes i trinnet med `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 arbejdere) passede stadig ikke, når først RSS pr. proces blev målt direkte i stedet for udledt. `tests/unit/docker-build-memory-budget.test.ts` regner med det målte tal og mislykkes, hvis en af knopperne vokser ud af løberen.

Turbopack kompilerer i indfødt Rust-hukommelse, der lever** uden for** V8-bunken, så `OMNIROUTE_BUILD_MEMORY_MB` binder den ikke. På en vært med et hukommelsesloft er bygningen så SIGKILLed af OOM killer uden nogen fejltekst overhovedet. — den stopper simpelthen midt i `Creating an optimized production build`, hvilket lyder som et hængende snarere end en ude af hukommelse. Det er grunden til, at `Dockerfile` som standard er webpack (`OMNIROUTE_USE_TURBOPACK=0`), i modsætning til `npm run dev` / `npm run build`, hvor Turbopack er kodestandarden: en blottet `docker build .` uden build args (hvad Railway og andre et-klik-værter kører) må ikke dø stille på en hukommelsesbegrænset builder. De offentliggjorte billeder passerer allerede `OMNIROUTE_USE_TURBOPACK=0` eksplicit i `docker-publish.yml`. På en builder med masser af RAM, tilvælg Turbopack for en hurtigere build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` er aktiveret, så `next build` kører en forælder** og** en arbejdsproces og hver ærer `OMNIROUTE_BUILD_MEMORY_MB` separat. Større beholderens loft over omtrent det dobbelte af værdien, ikke én gang.

Målt på dette træ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container loft | Resultat                       |
| --------- | -------------- | ------------------------------ |
| Turbopack | 8 GiB / 16 GiB | OOM-dræbt på begge, lydløst    |
| webpack   | 8 GiB          | bygge arbejder SIGKILLed       |
| webpack   | 12 GiB         | lykkedes, toppede med 11,1 GiB |

### Runtime standarder

Standarder eksporteret af `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Hukommelsesadfærd i Docker:

- Billedet sætter `OMNIROUTE_MEMORY_MB=1024` og udleder `NODE_OPTIONS=--max-old-space-size=1024` fra det.
- Selve serverprocessen startes af den selvstændige launcher, som læser `OMNIROUTE_MEMORY_MB` og tilføjer `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node bruger den sidste gentagne `--max-old-space-size` værdi, så indstilling af `OMNIROUTE_MEMORY_MB` styrer den effektive Docker heap-grænse.
- Fordi billedet altid indstiller det, gælder launcherens egen RAM-kalibrerede fallback aldrig under Docker. Hæv det eksplicit for arbejdsbyrden (tabel nedenfor). `2048` er stadig for lille til coding-agent `/v1/responses`.

### Runtime RAM for kodningsagenter

Standarden på 1 GiB Docker er et dashboard/light-chat gulv, ikke en produktionsstørrelse. Lange `POST /v1/responses` kroppe (hundredevis af beskeder, snesevis af værktøjer) bevarer flere hukommelsesgrafer under komprimering. To overlappende ~ 3 MiB / ~ 750k-token-anmodninger har afbrudt V8 på en** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) og ramte også en 16 GiB cgroup OOM. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Størrelse** cgroup `--memory` over bunken** — native buffere, SQLite og kompressionsmellemprodukter sidder uden for V8.

| Arbejdsbyrde                         | `OMNIROUTE_MEMORY_MB`    | Container / cgroup   | Noter                                                                                  |
| ------------------------------------ | ------------------------ | -------------------- | -------------------------------------------------------------------------------------- |
| Dashboard, en let chat               | `1024` (standardbillede) | ≥2 GiB               |                                                                                        |
| Én kodningsagent (Claude/Codex/Grok) | `8192`                   | ≥10 GiB              | Typisk single-session `/v1/responses`                                                  |
| To samtidige lange `/v1/responses`   | `10240`–`12288`          | ≥12–16 GiB           | Målt V8 abort ved ~ 12 GiB heap                                                        |
| Tre + samtidige lange sammenhænge    | ikke på én proces        | serialize / mere RAM | Standard sværvægtsadgang er 1 under flyvning; at hæve den uden RAM genindfører aborten |

`omniroute serve` på bart metal kalibrerer ~ 35 % af RAM (fastspændt `[512, 4096]`), når `OMNIROUTE_MEMORY_MB` er** deaktiveret** . Docker indstiller altid `1024`, så kalibrering aldrig kører i det officielle billede.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Kritiske miljøvariabler

Ud over standardværdierne, der er dokumenteret i [ENVIRONMENT.md](../reference/ENVIRONMENT.md), er følgende variabler de vigtigste ved kørsel under Docker:

| Variabel                      | Formål                                                                                                                                                                                                                                                    | Standardværdi               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Delt hemmelighed til WebSocket-broen. **Påkrævet i produktion** — angiv en stærk, tilfældig streng.                                                                                                                                                       | ikke angivet (skal angives) |
| `REDIS_URL`                   | Forbindelsesstreng til backend for hastighedsbegrænser/cache                                                                                                                                                                                              | `redis://redis:6379`        |
| `REDIS_PORT`                  | Port på værtssiden til den medfølgende Redis-container                                                                                                                                                                                                    | `6379`                      |
| `REDIS_BIND_HOST`             | Værtsgrænseflade, som den medfølgende Redis-port publiceres på (loopback, medmindre du tilføjer AUTH)                                                                                                                                                     | `127.0.0.1`                 |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Værtssti, der monteres i `cli`-profilen ved `/workspace/omniroute` til arbejdsgange for selvopdatering                                                                                                                                                    | `.` (aktuel mappe)          |
| `OMNIROUTE_MEMORY_MB`         | Øvre grænse for Nodes heap under kørsel for den selvstændige Docker-server; tilsidesætter image-standardværdien ovenfor. Kodningsagenter: `8192`+ (se [RAM under kørsel](#runtime-ram-for-coding-agents)).                                                | `1024`                      |
| `DASHBOARD_PORT` / `API_PORT` | Tilsidesæt eksponerede porte til dashboard (20128) og API (20129)                                                                                                                                                                                         | `20128` / `20129`           |
| `APP_BIND_HOST`               | Værtsgrænseflade, som docker-compose publicerer dashboard-/API-/live-WS-portene på. Med `REQUIRE_API_KEY=false` (standarden) eksponerer `0.0.0.0` den anonyme `/v1`-proxy til LAN'et — udvid kun med `REQUIRE_API_KEY=true` eller en reverse proxy foran. | `127.0.0.1`                 |
| `CLIPROXY_BIND_HOST`          | Værtsgrænseflade, som docker-compose publicerer `cliproxyapi`-sidecar'en på — dens datavolumen indeholder udbyderlegitimationsoplysninger.                                                                                                                | `127.0.0.1`                 |
| `OMNIROUTE_PLUGINS_DIR`       | Mappe, som runtime-plugin-scanneren læser fra og installerer i. Angiv den, når plugins bind-monteres: Standarden følger `HOME`, som et image ikke nødvendigvis eksporterer.                                                                               | `~/.omniroute/plugins`      |
| `OMNIROUTE_BASE_PATH`         | URL-understi, når appen publiceres bag en reverse proxy (f.eks. `/omniroute`)                                                                                                                                                                             | _(tom = rod)_               |
| `NEXT_PUBLIC_BASE_URL`        | Offentlig browser-origin inklusive understien (f.eks. `https://host/omniroute`)                                                                                                                                                                           | ikke angivet                |
| `PROD_DASHBOARD_PORT`         | Dashboardport på værtssiden til `docker-compose.prod.yml`                                                                                                                                                                                                 | `20130`                     |
| `CLIPROXYAPI_PORT`            | Port på værtssiden til `cliproxyapi`-sidecar'en                                                                                                                                                                                                           | `8317`                      |

## Omvendt proxy på en understi (Traefik / nginx)

Next.js `basePath` er kompileret i det selvstændige bundt. OmniRoute registrerer den bagte værdi i en sentinel-fil ved app-roden (skrevet under `npm run build`; læst af `scripts/docker/ensure-docker-base-path.mjs`) og sammenligner den med `OMNIROUTE_BASE_PATH` når containeren starter. Når de adskiller sig, og billedet blev bygget til domæneroden, omskriver indgangspunktet de selvstændige manifester, de indlejrede `basePath`/`assetPrefix` -literaler (Næste 16 gengiver SSR asset URLs fra `assetPrefix` alene — patcheren spejler understien ind i den), det bagte `/_next/static` asset-aktiv- URLs -manifester, præference og gengiver medie-import-siden (cl, render) klient `process.env` shim før `node dev/run-standalone.mjs` kører.

### Skriv build (anbefales)

Indstil begge variabler i `.env`, og genopbyg derefter, så billedet og kørselstiden stemmer overens:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` videresender `OMNIROUTE_BASE_PATH` som en Docker build-arg og som en runtime miljøvariabel.

### Forudbygget rodbillede + runtime understi

Publicerede `cheaperinference/omniroute:*` -billeder er bygget til domæneroden. Du kan stadig indstille `OMNIROUTE_BASE_PATH` under runtime; beholderen lapper bundtet én gang ved opstart. Par det med den matchende offentlige oprindelse:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurer den omvendte proxy til at videresende** fuld** ekstern sti (fjern ikke præfikset). Traefik bør dirigere `PathPrefix(`/omniroute `)` til containeren uden `StripPrefix`, så Next.js modtager `/omniroute/...` og betjener aktiver fra `/omniroute/_next/...`.

Docker -sundhedstjekket undersøger letvægts- `/healthz` -livscyklusslutpunktet med den aktive `OMNIROUTE_BASE_PATH` som præfiks. `/api/monitoring/health` forbliver tilgængelig til human/dashboard -diagnostik; for at pege containeren HEALTHCHECK tilbage mod den (f.eks. til dyb sundhedshåndhævelse), skal du indstille `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Den vej er en** dyb** tjek (DB + overvågningsoversigt) — passende for Docker's sjældne `HEALTHCHECK` hvis du tilmelder dig igen, men** ikke** for Kubernetes `livenessProbe` intervaller.

For orkestratorer (Kubernetes, Nomad osv.):

| sonde           | Foretrække                                                            | Undgå                                                   |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------------- |
| Livlighed       | HTTP `GET /livez` eller TCP på hovedporten (`PORT`, standard `20128`) | `/api/monitoring/health` som livlighed                  |
| Beredskab       | HTTP `GET /healthz`                                                   | Snævre timeouts, der behandler event-loop travl som død |
| Deep / blackbox | `/api/monitoring/health`                                              | —                                                       |

`/healthz` rapporterer proceslivscyklus (`ok` / `starting` / `stopping`). `/livez` er kun proces-levende (200 når handleren kan køre; den venter ikke på parathed). Begge kører stadig på den samme Node-hændelsesløkke som anmodningshåndtering, så CPU-bundet katalog eller komprimeringsarbejde kan forsinke dem — busy ≠ dead. Foretrækker TCP liveness, hvis HTTP prober timeout. Fuld sondevejledning: [Overvågningsvejledning — Kubernetes sondeanbefalinger](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute kan eksponeres sikkert ved hjælp af Caddies automatiske SSL klargøring. Sørg for, at dit domænes DNS A-record peger på din servers IP.

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

Caddy indstiller standardvideresendelseshovederne for opstrømscontaineren. OmniRoute bruger `NEXT_PUBLIC_BASE_URL` som den kanoniske offentlige oprindelse for OAuth tilbagekald og genererede offentlige links; autentificerede dashboard-skrivninger bruger anmodninger med samme oprindelse plus sessionsbundet CSRF beskyttelse. Aktiver kun `OMNIROUTE_TRUST_PROXY` for avancerede implementeringer, hvor du med vilje ønsker, at OmniRoute skal udlede den offentlige oprindelse fra betroede videresendte overskrifter i stedet for eksplicit konfiguration.

## Cloudflare Quick Tunnel

Dashboardunderstøttelse til Docker-installationer omfatter en **Cloudflare Quick Tunnel** med ét klik under `Dashboard → Endpoints`. Ved første aktivering downloades `cloudflared` kun efter behov, der startes en midlertidig tunnel til dit aktuelle `/v1`-slutpunkt, og den genererede `https://*.trycloudflare.com/v1`-URL vises direkte under din normale offentlige URL.

Tunnelpaneler for slutpunkter (Cloudflare, Tailscale, ngrok) kan vises eller skjules under `Settings → Appearance` uden at ændre den aktive tunneltilstand.

### Bemærkninger om tunneler

- Quick Tunnel-URL'er er midlertidige og ændres efter hver genstart.
- Quick Tunnels gendannes ikke automatisk efter genstart af OmniRoute eller containeren. Genaktivér dem fra dashboardet efter behov.
- Administreret installation understøtter i øjeblikket Linux, macOS og Windows på `x64` / `arm64`.
- Administrerede Quick Tunnels bruger som standard HTTP/2-transport for at undgå støjende advarsler om QUIC UDP-bufferen i begrænsede containermiljøer. Indstil `CLOUDFLARED_PROTOCOL=quic` eller `auto`, hvis du ønsker en anden transport.
- Docker-images indeholder systemets CA-rodcertifikater og videregiver dem til administrerede `cloudflared`, hvilket undgår TLS-tillidsfejl, når tunnelen startes op inde i containeren.
- Indstil `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, hvis OmniRoute skal bruge en eksisterende binær fil i stedet for at downloade en.

## Billed-tags

| Billede                      | Tag      | Størrelse | Beskrivelse                                               |
| ---------------------------- | -------- | --------- | --------------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB  | Højest** offentliggjort** stabil SemVer (ikke git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB  | Fastgør denne tagklasse til GitOps                        |

De samme billeder udgives til tre arkiver med de samme data for hver arkitektur: `cheaperinference/omniroute` (Docker Hub, the Cheaper Inference organisation, fra 3.8.53 og frem), `ghcr.io/cheaper-inference/omniroute` og den gamle `diegosouzapw/omniroute`, som beholder sin pull-historie og stadig modtager hver udgivelse. Eksisterende `diegosouzapw/omniroute` installationer bliver ved med at opdatere; det er valgfrit at skifte billednavn. `:next` / `:next-web` pre-release-kanalen nedenfor udgives kun til `diegosouzapw/omniroute` og GHCR.

Multi-platform manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker vælger automatisk den matchende arkitektur; pass `--platform linux/amd64` hvis du har brug for at tvinge AMD64 -emulering på ARM værter.

### Udgiv kanaler

OmniRoute udgiver separate Docker kanaler til stabile udgivelser, aktiv test af udgivelsesgrene og udviklingsbuilds.

| Kanal                           | Kilde                                   | Foranderlighed                | Anbefalet brug                                                                                                                   |
| ------------------------------- | --------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned frigivelse             | Uforanderlig                  | Produktionsimplementeringer, der fastgør en nøjagtig udgivelse                                                                   |
| `:latest` / `:latest-web`       | Højest** offentliggjort** stabil SemVer | Foranderlig stabil pointer    | Følger stabile udgivelser** efter** et SemVer publiceringsjob udfører —** ikke** spor `main` eller uudgivne `release/v*` commits |
| `:next` / `:next-web`           | Nuværende standard `release/v*` gren    | Mulig pre-release pointer     | Test af rettelser, der er landet på den aktive udgivelsesgren, men som endnu ikke er i en stabil udgivelse                       |
| `:main` / `:main-web`           | `main` gren                             | Foranderlig udviklingspointer | Kun udviklings- og integrationstest                                                                                              |

#### Web-session-udbydere: `-web` billederne

Hver kanal ovenfor fungerer som et `-web` tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), bygget fra `runner-web` stadiet — det samme billede plus Playwright og en Chromium-browser. Det almindelige billede sendes** uden** krom; `gemini-web`, `claude-web` og `claude-turnstile` har brug for det.

Fejlen er udskudt, ikke opstartstid: disse udbydere viser deres modeller og vises som tilsluttet i dashboardet, og kun den første anmodning mislykkes med

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Hvis du bruger disse udbydere, skal du trække `-web` tagget for den kanal, du allerede er på — intet andet ændrer sig. På en npm/CLI installation (ingen Docker billede) er den tilsvarende manglende brik browserens binære: kør `npx playwright install chromium` på værten.

#### Brug af pre-release-kanalen

`next` kanalen genopbygges ved hvert tryk til den nuværende standard `release/v*` gren og udgives for både AMD64 og ARM64. Ældre vedligeholdelsesgrene kan ikke overskrive det. Kanalen giver et trækbart billede for rettelser, der er flettet ind i den aktive udgivelsesgren, før den næste stabile tag skæres.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

For Docker Compose skal du tilsidesætte billedmærket, der bruges af den valgte profil, og derefter trække og genskabe tjenesten:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sikkerhed og tilbagerulning

`next` er en flydende pre-release-kanal. Det kan ændre sig ved ethvert tryk til den aktive frigivelsesgren og er det** ikke understøttet til produktionsbrug** . Fastgør billedsammendraget, mens du evaluerer en specifik build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Før du tester, skal du sikkerhedskopiere OmniRoute datavolumen eller bind-monteret databibliotek. For at rulle tilbage skal du gendanne den tidligere brugte stabile version eller fordøje og genskabe beholderen:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

En udgivelsesgren kan aldrig flytte `latest`; kun en kvalificeret stabil semantisk version kan fremme den stabile pointer. `next` billederne beholder inspektionen af udgivelsesbilledet og blokerer CRITICAL-sårbarhedsporten.

**`latest` er ikke en valutagaranti for git.** Sammenlagte rettelser på `main` eller på den aktive `release/v*` -gren er** ikke** i `:latest` indtil et stabilt SemVer billede er offentliggjort, og publiceringsjobbet fremmer `:latest` (samme digest som SemVer). Hvis `latest` ser frosset ud, mens GitHub allerede viser rettelsen, skal du trække i `:next` for at teste udgivelsesgrenen eller vente på SemVer mærket.

| Du vil have                                                              | Bruge                                   |
| ------------------------------------------------------------------------ | --------------------------------------- |
| GitOps / produktion, der ikke må drive                                   | Pin `:X.Y.Z` (eller billedsammendraget) |
| Følg offentliggjorte stalde og accepter en genskabelse på hver udgivelse | `:latest`                               |
| Test uudgivne `release/v*` -forpligtelser                                | `:next` (ikke produktion)               |
| Test `main`                                                              | `:main` (ikke produktion)               |

## Dashboardopdateringer i Docker

En container fra et udgivet image kan ikke erstatte sig selv. Når OmniRoute registrerer, at den kører i en
container (ingen `.git`-checkout, ikke en npm-installation), viser opdateringsbanneret på startdashboardet
den værtskommando, der skal køres, i stedet for npm/git-vejledningen samt en kopieringsknap:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Tjenestenavnet kommer fra `AUTO_UPDATE_SERVICE` (standardværdien er `omniroute`, som er tjenesten i
`docker-compose.selfhost.yml`). `pull` flytter kun et flydende tag (`latest`, `next`); med et fastlåst
`:X.Y.Z`-tag skal du først redigere tagget.

### Opdateringer med ét klik via en udløserfil på værten

For at bevare funktionen **Opdater nu** uden at montere `/var/run/docker.sock` (hvilket giver containeren
root-adgang på værten — se advarslen om `cli`-profilen ovenfor) skal du angive `DOCKER_UPDATE_TRIGGER_FILE` for
OmniRoute-tjenesten og køre en overvågningsproces på værten:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Stien skal være inde i `DATA_DIR` (relative værdier fortolkes i forhold til den); alt andet
afvises. **Opdater nu** skriver derefter `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` til denne
fil, svarer med `202`, og dashboardet forespørger løbende `/api/system/version`, indtil den nye version er aktiv,
og genindlæser derefter. OmniRoute kører aldrig en shell- eller Docker-kommando i denne tilstand. Som ved alle
opdateringshandlinger accepteres anmodningen kun fra loopback-/LAN-klienter.

En bind-monteret datamappe giver værten en stabil sti at overvåge. Eksempler på `systemd`-enheder
(tilpas `/srv/omniroute` til den mappe, der indeholder din compose-fil og `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Overvåg OmniRoute-dashboardets opdateringsanmodninger

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Hent og genopret OmniRoute-containeren

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

Tjenesten fjerner anmodningen før hentningen, så en mislykket kørsel ikke gentages i en løkke. Uden
`DOCKER_UPDATE_TRIGGER_FILE` bevarer dashboardet det manuelle kommandoforløb.

## Tilgængelighed: standard SQLite er enkelt replika

Stock Docker / Kubernetes OmniRoute er** én Node-proces + én SQLite skriver** . Høj tilgængelighed er** ikke understøttet** på den topologi.

| Begrænsning                            | Følge                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Single forfatter                       | Gør** ikke** køre flere replikaer mod den samme SQLite fil. Det ødelægger DB.                                                                                                                                                                                                                                            |
| Genopret / genstart / HEALTHCHECK kill | **Fuld afbrydelse** af SSE under flyvningen, dashboard-sessioner og tilstand i hukommelsen. Hver tilsluttet klient falder. Nye anmodninger under det tomme slutpunktsvindue får en omvendt proxy**`502 Bad Gateway: Unknown error`** , ikke OmniRoute JSON — klienter kan ikke skelne dette fra en udbyderfejl (#11015). |
| Samme begivenhedsløkke som `/healthz`  | Et travlt katalog eller kompressionsflueben kan forsinke sonder; en kort timeout genstarter derefter** kun** replika.                                                                                                                                                                                                    |

**Probe matrix** (se også [Kubernetes sondeanbefalinger](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| sonde            | Mål                                                          | Må ikke bruges                                          |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| Livlighed        | TCP på `PORT` (standard `20128`), eller blød HTTP `/healthz` | `/api/monitoring/health`                                |
| Beredskab        | HTTP `GET /healthz`                                          | Snævre timeouts, der behandler event-loop travl som død |
| Dybt / mennesker | `/api/monitoring/health`                                     | Automatiseret kubelet liveness                          |

**Opgraderinger:** forventer, at hver session falder. Dræn klienter, hvis du kan; der er ingen rullende opdatering på standard SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` vil også erstatte den eneste proces, når beholderen er usund — samme sprængningsradius.

Færdiglavede manifester og et Helm-diagram live i `deploy/kubernetes/` og `deploy/helm/omniroute/` — se [Kubernetes-implementeringsvejledningen](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes-uddrag til en** enkelt replika** (Genopret er påkrævet; rejs ikke `replicas` mod én SQLite -fil):

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

`preStop` sleep lader kube droppe Service-endepunkter før SIGTERM så** ny** trafikken holder op med at ramme den døende proces. In-flight `/v1/responses` SSE drænes op til `SHUTDOWN_TIMEOUT_MS` (standard 30s) via tungvægtsadgangsleasingkontrakter (#11015). Nye anmodninger, der stadig når processen, får `503` + `Retry-After: 5`. Genopret tomt slutpunktsgab, indtil udskiftningen er klar, forbliver en hård afbrydelse - det er SQLite topologien, ikke en fejlkonfiguration af sonden.

Ekstern Postgres / multi-writer HA er** ikke** en dokumenteret lagersti. Hvis du har brug for HA, behold en enkelt replika eller kør en topologi, som projektet har testet og dokumenteret separat. Postgres/MySQL værket bor i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Indtil det afsendes, den eneste understøttede måde at formere sig på** stor** `/v1/responses` kapaciteten er N uafhængige processer (næste afsnit), ikke `replicas > 1` på én volumen.

## Udskalering: N uafhængige processer

### Codex token rotation ejerskab

Kopier af én Codex konto må ikke uafhængigt forbruge dens engangsopdateringstoken. På forekomster, der kun bruger synkroniserede legitimationsoplysninger, skal du indstille `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). Lad den være uaktiveret på ejeren af den enkelte rotation. Hver proces har stadig brug for sin egen `DATA_DIR`; denne mulighed deler hverken SQLite eller leverer token-synkronisering eller en distribueret lås.

Den passive forekomst genlæser forbindelsen, når en opdatering er nødvendig, og vedtager kun et andet, uudløbet adgangstoken. Ellers deaktiveres opdatering uden at udløbe eller deaktivere forbindelsen eller tælle en opdaterings-breaker-fejl. Reelle upstream-godkendelsesfejl bruger stadig normal fejlregnskab, eksponentiel nedkøling og den normale klientfejl; kontodeaktivering forbliver permanent. Synkroniser ejerens roterede tokens, før adgangstokens udløber (standard proaktive opdateringsled er fem minutter), eller genimporter Codex godkendelsesfilen. Passiv import lagrer de leverede tokens uden at validere dem ved token-slutpunktet. Manuel dashboard/API refresh returnerer `409 refresh_disabled`; nye OAuth logins er uændrede. Se [miljøhenvisning](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

En Node-proces er** en V8-bunke** . To overlappende ~ 3 MiB / ~ 750k-token kodningsagent `POST /v1/responses` (RTK + Caveman) afbryder den bunke ved ~ 12 Gi (`FATAL ERROR: Reached heap limit`) og kan OOM en 16 Gi cgruppe. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Den måling er en** hukommelsesbudget** advarsel, ikke et produkt hard-max på to samtidige lange `/v1/responses`. Tungvægts-chatadgang er lukket af et auto-afledt indtag-byte-budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) med størrelse fra det samme V8/cgroup loft — der tilsidesætter det opad (eller indstiller det gamle `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) på en proces af allerede størrelse, genindfører afbrydelsen. Små chats, `/healthz`, `/v1/models` og MCP er** ikke** i den kasket.

### En-proces: mere end to lange `/v1/responses`

EN** sund** proces (heap under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standard `0.75`)** maj** køre mere end to samtidige lange `POST /v1/responses` når det proces-dækkende inflight-byte-budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stadig har plads. Organer på eller over `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standard 256 KiB) tager den samme sværvægtslejekontrakt som strukturtunge anmodninger og bruger den samme [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Titusvis af samtidige lange SSE klienter (operatører har ofte brug for 40-50) er en** hukommelsesbudget** spørgsmål — størrelse heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ikke en hård "max 2" produktgrænse. En presset bunke falder stadig med `503`, der kan prøves igen, så #7849 vender ikke tilbage.

Til** formere dynger** (uafhængige V8 old-spaces)** i dag** :

| Gør                                                                                                                                              | Gør ikke                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Løbe** N containers/pods** , hver med sit** egen** `DATA_DIR` / volumen                                                                          | Indstil `replicas > 1` én SQLite -fil                        |
| Størrelse tung under-flyvning + sund-headroom fra heap / inflight-byte budget; 1–2 er den konservative #7849 standard, ikke et hårdt produkt max | Giv én proces 8 × RAM og et ubegrænset tælleloft             |
| Valgfrit: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for** delte kvotetællere**                                                        | Behandl Redis som delt SQLite — er det ikke                  |
| Dupliker udbyderhemmeligheder i hver instans (eller accepter opdelte dashboards)                                                                 | Forvent ét dashboard / én opkaldslog på tværs af forekomster |
| Foran med enhver belastningsbalancer; sticky af API -tasten eller session er nok                                                                 | Kræv en leverandørspecifik størrelsesbevidst middleware      |

Session-til-konto affinitet kan også deles gennem Redis: sæt `OMNIROUTE_SESSION_AFFINITY_STORE=redis` og `REDIS_URL` på hver proces med den samme `REDIS_KEY_PREFIX` og en positiv `sessionAffinityTtlMs` indstilling. Pins løser hash-brugskontoidentiteter til hver process kvalificerede lokale forbindelse, så OAuth -konti med matchende identitetsmetadata behøver ikke at have matchende forbindelse IDs. Kendte kontoidentiteter har forrang over modstridende lokale IDs i pin-opløsning og bevogtet udsættelse; poster uden identitet (eller udsættelseskaldere uden identitet) bevarer den gamle ID vagt. Konti uden en stabil brugsidentitet kræver stadig matchende IDs. Redis fejl eller opkald, der overstiger 100 ms, falder tilbage til lokale SQLite. Hver Redis affinitetsbutik begrænser udestående operationer til 8, omgår Redis med det samme, når den er fuld, og frigiver kun slots, når det underliggende arbejde afvikles, ikke ved deadline for opkald. Under en Redis afbrydelse er der ingen delt sandhed: hver instans falder tilbage til sin egen lokale affinitet, sessioner kan fastgøres igen én gang pr. instans, og instanser kan divergere. Klæbrighed konvergerer igen gennem Redis, når den kommer sig. Timeout-grænserne venter, ikke en sendt EVAL, som kan lande efter fallback. Routingskrivninger sammenligner den nøjagtige værdi observeret af routingbeslutningen, ikke en ny mutationstidslæsning; en observeret miss eller en SQLite faldback-observation sammenlignes med en fraværende Redis nøgle. Forældede ben udskiftes i én CAS, så en sen kommando kan ikke erstatte eller slette en nyere, anden pin. Redis læser atomisk returnerer værdien og den resterende server TTL; positiv PTTL (eller ingen udløb) bestemmer livlighed, ikke forfatterens JSON tidsstempel eller læserens ur. Lokale snapshots kortlægger den resterende TTL til en lokal deadline; eksisterende JSON nøgler forbliver læsbare, og deres rå bytes bibeholdes for CAS. Redis er den eneste kilde til sandhed, mens den svarer. Bekræftede delte upserts, berøringer og sletninger fjerner den lokale post, installer eller opdater den aldrig. SQLite på Redis stien indeholder kun denne instanss egne fallback-beslutninger fra Redis fejl, timeouts eller adgangsmætning, TTL-grænset som før. En manglende lokal pin ved et senere udfald koster et nyt valg (én prompt-cache-miss), ikke en forkert eller smidt konto. Afviste upserts returnerer den delte vinder og dens resterende TTL atomært: ordinært valg kontrollerer igen den kortlagte lokale deadline og bruger en stadig levende kvalificeret vinder, berører brug og logning for den konto uden en anden delt skrivning. Hvis den ikke er tilgængelig, beholder valget den lokale kandidat, forlader den delte pin uændret og udsender én fejlretningsmeddelelse. Afvist CAS skriver ikke SQLite; Redis fejl, timeouts eller adgangsmætning anvender i stedet den eksisterende lokale operation. Hvis en sendt mutations svar ankommer efter timeout (accepteret, afvist eller fejl), fjerner en synkron, nøjagtig serialiseret-værdi sammenligne-og-slet kun den byte-identiske timeout fallback række. Der er ingen ventetid mellem denne sammenligning og sletning; en nyere fejlskrivning er bevaret. Bevogtet udsættelse fjerner den mislykkede kontos egen lokale pin, selv med Redis nede, og renser den igen efter bekræftet delt udsættelse. Afventende tidligere delte svar kan ikke gendanne en smidt lokal pin, fordi delte succeser aldrig skriver SQLite. Et senere udfald kan genindlæse en konto; en senere accepteret delt skrivning findes kun i Redis. Redis misses konsulterer ikke lokal reservetilstand. Med driveren slukket bevarer nyvalgte stifter den gamle firefelts SQLite JSON form; kun Redis routing tilføjer den hashed kontoidentitet. Forudhentede stifter kontrolleres igen ved deres udløbsgrænse. Redis non-lease selection genlæser butikken, men synkron leasing planlægning kan stadig bruge en pin smidt ud mellem prefetch og planlægning (et accepteret bedste-indsats vindue). En leasingforpligtelse kan ikke skifte konto efter et varigt krav: ved afvist upsert beholder den den påståede kandidat kun for denne anmodning og lader den delte vinder være urørt, så enighed på tværs af instanser er afgrænset på den vej. Resten af tabellen gælder stadig: dette deler ikke combo session stickiness, native Codex turn pins, konto semaforer, lockouts, forbrugsgrænser, konfiguration eller opkaldslogs.

Hardware: per instans samtidig lang `/v1/responses` er en** hukommelsesbudget** spørgsmål (heap + inflight-byte / #10110). `N` uafhængige `DATA_DIR` formerer stadig dynger: vært RAM skal dække `N × cgroup`, ikke "én 16 Gi pod med N = 8." Aldrig `replicas > 1` på én SQLite fil.

Komponer skitse (to dynger, to bind — ikke `deploy.replicas: 2`):

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

Densitet i processen (komprimering af HTTP isolatet) er [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). En logisk klynge på delt holdbar tilstand er [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionale Gemini-fejl i Docker

Google AI Studio / Gemini API kan returnere HTTP 400 med FAILED_PRECONDITION og
`User location is not supported for the API use.` En vellykket anmodning på værten
beviser ikke, at containeren bruger den samme udgående rute. DNS-rækkefølge,
IPv4/IPv6-forbindelse, VPN-routing og konfigurerede proxyer kan være forskellige. Kontrollér
[Googles understøttede regioner](https://ai.google.dev/gemini-api/docs/available-regions)
samt den faktiske forbindelsesrute; denne fejl alene indikerer ikke en ugyldig API-nøgle.

### Foretræk en forbindelsesspecifik proxy

Brug OmniRoutes [proxykonfiguration pr. forbindelse](../ops/PROXY_GUIDE.md#4-level-proxy-system)
til den berørte Gemini-forbindelse, og gentag derefter **Test forbindelse** og en lille anmodning
med den samme model. Dette begrænser routingændringen til den pågældende forbindelse. Kontrollér,
at proxyen kan nås fra containeren, og at forbindelsen rent faktisk vælger
den. En ændring af ruten garanterer ikke regional adgang hos upstream-tjenesten.

### Sammenlign netværket på værten og i containeren

Bevar samme nøgle, model og anmodning, når du sammenligner godkendte resultater; indsæt aldrig
legitimationsoplysninger, proxyadgangskoder eller komplette autorisationsheadere i en issue.
Undersøg først, hvilke adressefamilier operativsystemets resolver tilbyder, ved at bruge den samme kommando
på værten og inde i containeren:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Erstat `omniroute` med den tjeneste, du kører (for eksempel `omniroute-web`). Disse
kommandoer udskriver adressefamilier uden legitimationsoplysninger eller IP-adresser. En returneret `6`
viser kun et IPv6-DNS-resultat: Det beviser **ikke**, at der er en brugbar IPv6-rute eller API-adgang.
Hvor `curl` er installeret, skal du sammenligne `curl -4 -I https://generativelanguage.googleapis.com`
med `curl -6 -I https://generativelanguage.googleapis.com` i begge miljøer.
Et HTTP-svar beviser forbindelsen for denne test, selv hvis det er en ikke-godkendt
fejl; kun den godkendte modelanmodning tester adgangen til Gemini.

### Alternativ på værtsniveau: fungerende IPv6 og resolverpolitik

Indberetteren af [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) gendannede
adgangen i sit miljø ved at aktivere IPv6 for containere og ændre glibc's adressevalg.
Betragt dette som et miljøspecifikt alternativ. Bekræft, at værtens IPv6,
containerens udgående forbindelse/routing og firewallregler fungerer, før resolverens præferencer justeres.
En privat ULA-adresse er ikke i sig selv bevis på offentlig IPv6-forbindelse.

For tjenester, der allerede er tilknyttet Composes standardnetværk, aktiverer dette fragment
IPv6 på dette netværk; behold resten af din tjeneste-, port-, diskenheds- og konfiguration:

```yaml
networks:
  default:
    enable_ipv6: true
```

For et navngivet netværk skal det aktiveres på det netværk, som tjenesten rent faktisk tilslutter sig. Docker kan
tildele et ULA-undernet; vælg kun et eksplicit, ikke-overlappende undernet, når dit netværk
kræver det. Se [Docker IPv6-netværk](https://docs.docker.com/engine/daemon/ipv6/)
og [Compose-netværksindstillinger](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

På et **glibc-baseret image** kan `/etc/gai.conf` ændre adressevalget. Det nuværende
repositorys Dockerfile bruger Debian; brugerdefinerede musl-baserede images anvender ikke denne mekanisme.
Den rapporterede justering ændrer ULA-labelen fra `label fc00::/7 6` til
`label fc00::/7 1`. Tag udgangspunkt i imagets komplette politiktabel, og bevar dets øvrige
poster: Tilføjelse af en `label`- eller `precedence`-post erstatter denne standardtabel, så en fil,
der kun indeholder den ændrede linje, er utilstrækkelig.
[glibc-konfigurationsreferencen](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumenterer denne funktionsmåde. Bind-mount den gennemgåede fil skrivebeskyttet på `/etc/gai.conf`,
og genopret tjenesten for at anvende den.

Dette ændrer operativsystemets adressevalg for **al udgående trafik i den pågældende container**.
Det tvinger ikke alle applikationer til at vælge IPv6: Nodes DNS-rækkefølge og forbindelsesvalg
har også betydning. Især foretrækker `--dns-result-order=ipv4first` IPv4 og
er ikke en løsning på en fejl, der kun opstår med IPv4. Se [Node DNS-rækkefølge](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Test Gemini og dine øvrige udbydere igen efter enhver ændring på værtsniveau. For at rulle tilbage
skal du fjerne det brugerdefinerede `gai.conf`-mount, gendanne den tidligere netværkskonfiguration og
genoprette den berørte tjeneste/det berørte netværk i et vedligeholdelsesvindue. Genoprettelse af et netværk
kan afbryde andre containere, der er tilknyttet det; slet ikke den persistente datadiskenhed.

## Vigtige bemærkninger

- **SQLite WAL-tilstand:** `docker stop` bør have lov til at køre færdig, så OmniRoute kan skrive de seneste ændringer tilbage til `storage.sqlite` via et checkpoint. De medfølgende Compose-filer angiver allerede en henstandsperiode på 40 sekunder for stop. Hvis du kører imaget direkte, skal du beholde `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Indstil til `true`, hvis rutinemæssige sikkerhedskopier/sikkerhedskopier før skrivning administreres eksternt. Migreringer af eksisterende databaser kræver stadig deres eget holdbare sikkerhedssnapshot og en beskyttelse mod massemigrering.
- **Datapersistens:** Montér altid en diskenhed på `/app/data` for at bevare din database, dine nøgler og konfigurationer på tværs af genstarter af containeren.
- **Portkonfiguration:** Tilsidesæt miljøvariablen `PORT` for at ændre standardporten `20128`.

## Se også

- [Guide til VM-implementering](../ops/VM_DEPLOYMENT_GUIDE.md) — Opsætning af VM + nginx + Cloudflare
- [Guide til implementering på Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementér på Fly.io
- [Miljøkonfiguration](../reference/ENVIRONMENT.md) — Komplet reference til `.env`
