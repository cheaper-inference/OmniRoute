# 🐳 Docker Guide — OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Volledige referentie voor Docker-implementatie. Zie voor een snelle start de [Docker-sectie van de README](../README.md#-docker).

## Inhoudsopgave

- [Snel uitvoeren](#quick-run)
- [Met omgevingsbestand](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Beschikbare profielen](#available-profiles)
- [CLI-tools op de host configureren wanneer OmniRoute in Docker draait](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Compose voor productie](#production-compose)
- [Dockerfile-fasen](#dockerfile-stages)
- [Kritieke omgevingsvariabelen](#critical-environment-variables)
- [Docker Compose met Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Imagetags](#image-tags)
- [Dashboardupdates in Docker](#dashboard-updates-in-docker)
- [Beschikbaarheid: standaard-SQLite ondersteunt één replica](#availability-default-sqlite-is-single-replica)
- [Regionale Gemini-fouten binnen Docker](#gemini-regional-errors-inside-docker)
- [Belangrijke opmerkingen](#important-notes)

---

## Snel uitvoeren

> **Zelf hosten met één opdracht?** Zie de
> [handleiding voor zelf hosten](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (gepubliceerde image +
> Redis, alleen loopback, geen profielkeuze). De onderstaande snelle uitvoering is het
> pad met één container voor gebruikers die Redis al elders uitvoeren.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Met omgevingsbestand

```bash
# Kopieer en bewerk eerst .env
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
# Basisprofiel (geen CLI-tools)
docker compose --profile base up -d

# CLI-profiel (Claude Code, Codex en OpenClaw ingebouwd)
docker compose --profile cli up -d

# Hostprofiel (primair voor Linux; koppelt CLI-binaire bestanden van de host als alleen-lezen)
docker compose --profile host up -d

# Webprofiel (Chromium/Playwright voor websessieproviders)
docker compose --profile web up -d

# Combineer CLI + CLIProxyAPI-sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Beschikbare profielen

OmniRoute levert Compose-profielen voor de belangrijkste implementatievormen. Kies het profiel dat bij uw omgeving past.

| Profiel            | Service          | Wanneer te gebruiken                                                                                                                                 | Opdracht                                     |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standaard) | `omniroute-base` | Headless server/minimale runtime, zonder meegeleverde provider-CLI's                                                                                 | `docker compose --profile base up -d`        |
| `cli`              | `omniroute-cli`  | Agentische workflows die `omniroute providers/setup/doctor` en meegeleverde CLI's (Codex, Claude Code, Droid, OpenClaw) aanroepen                    | `docker compose --profile cli up -d`         |
| `host`             | `omniroute-host` | Linux-hosts die `network_mode`-achtige toegang tot host-CLI's willen door `~/.local/bin`, `~/.codex`, `~/.claude`, enz. als alleen-lezen te koppelen | `docker compose --profile host up -d`        |
| `cliproxyapi`      | `cliproxyapi`    | Voer de [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-sidecar uit op poort `8317` voor upstream CLI-proxying                           | `docker compose --profile cliproxyapi up -d` |
| `web`              | `omniroute-web`  | Websessieproviders die een browser nodig hebben: `gemini-web`, `claude-web`, `claude-turnstile` (bouwt `runner-web`, inclusief Chromium)             | `docker compose --profile web up -d`         |

> Meerdere profielen kunnen worden gecombineerd: `docker compose --profile cli --profile cliproxyapi up -d`.

## Host-CLI-tools configureren wanneer OmniRoute in Docker draait

`omniroute setup-codex`, `setup-claude`, `config set <tool>` en de knop
**Configuratie opslaan** op het dashboard schrijven allemaal bestanden zoals `~/.codex/*.config.toml`. Die paden
hebben alleen betekenis op de machine waarop de CLI daadwerkelijk draait. Voer je deze opdrachten in
de container uit, dan worden de bestanden naar de eigen thuismap van de container geschreven (`/home/node` —
de image draait als `USER node`). Geen enkele CLI op de host zal ze daar ooit lezen en ze worden
verwijderd zodra de container opnieuw wordt aangemaakt.

OmniRoute detecteert dit en weigert de schrijfactie met instructies, in plaats van
een succes te melden waar je niets aan hebt: de CLI wordt afgesloten met code `2` en de API antwoordt met `422`
en `containerEphemeralTarget: true`.

### Aanbevolen: voer de CLI uit op de host en OmniRoute in Docker

De container biedt de API aan; de CLI configureert je tools op de host.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # laat de CLI naar de container verwijzen
omniroute setup-codex                      # schrijft naar de echte ~/.codex op je host
```

Dit is de juiste keuze wanneer Codex, Claude Code, Cursor of vergelijkbare tools op je
laptop draaien — wat doorgaans het geval is.

### Alternatief: koppel de configuratiemappen van de host als bind-mount (`host`-profiel)

Als je wilt dat de container zelf naar je hostconfiguratie schrijft, koppel je de
mappen als mount en laat je `CLI_CONFIG_HOME` naar de hoofdmap van de mount verwijzen. Het `host`-profiel
doet dit al:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Een bind-mount maakt het pad betrouwbaar: OmniRoute leest
`/proc/self/mountinfo` en staat schrijfacties toe naar gekoppelde paden (en naar mappen
waarvan de submappen mounts zijn, wat exact overeenkomt met de bovenstaande structuur van `/host-home`), terwijl
schrijfacties naar niet-gekoppelde paden nog steeds worden geweigerd.

### Uitwijkmogelijkheid: configureer de eigen CLI's van de container (gebruik spaarzaam)

Wanneer de CLI's daadwerkelijk in de container staan (het `cli`-profiel), is de schrijfactie
opzettelijk. Geef `--allow-container-write` door aan een willekeurige `setup-*`-opdracht, of stel
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` in voor de server. De schrijfactie wordt uitgevoerd
met een waarschuwing dat de gegevens niet behouden blijven nadat de container is verwijderd.

> **Beveiligingswaarschuwing — `cli`-profiel + `docker.sock`-mount.**
> Het `cli`-profiel koppelt `/var/run/docker.sock` als bind-mount, zodat de automatische updater
> in de container de stack opnieuw kan aanmaken via de daemon van de host
> (`src/lib/system/autoUpdate.ts` controleert op die socket en slaat het
> Docker-pad over wanneer deze ontbreekt). Die socket vormt **een vertrouwensgrens met root-toegang
> tot de host**: alles wat de socket kan bereiken, stuurt de Docker-daemon van de host aan als
> root — en kan elke container op de host aanmaken, inspecteren, stoppen en verwijderen.
> Gevolgen:
>
> 1. **Stel de poort van het `cli`-profiel nooit bloot aan het netwerk.** Publiceer
>    deze op `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — een via het LAN bereikbaar `cli`-profiel maakt van elke RCE op dashboardniveau
>    een volledige compromittering van de host.
> 2. **Koppel geen aanvullende hostmappen aan het `cli`-profiel.**
>    De Docker-socket in combinatie met een verdere mount geeft de container volledige
>    lees- en schrijftoegang tot je bestandssysteem en hostconfiguratie. Als een tool toegang tot
>    een project nodig heeft, voer je deze lokaal uit met de CLI-binary — koppel het project niet
>    aan de `cli`-container.
>
> Als je automatische updates in de container niet nodig hebt, schakel je het `cli`-profiel niet in
> (`COMPOSE_PROFILES=core,redis` of korter). De andere profielen koppelen
> de Docker-socket niet.
>
> Zie `docs/security/MITM-TPROXY-DECRYPT.md` (git; niet gecompileerd naar `/docs`) voor het gerelateerde dreigingsmodel
> rond MITM, en `docs/security/SUPPLY_CHAIN.md` voor de herkomstketen van de
> `codex`/`claude-code`/`droid`/`openclaw`-binaries.

## Redis-sidecar

OmniRoute gebruikt Redis als basis voor de gedistribueerde snelheidsbegrenzer en gedeelde cache. De `redis`-service is **altijd gedefinieerd** in `docker-compose.yml` (deze heeft geen profielbeperking) en wordt samen met elk ander profiel gestart.

| Detail                       | Waarde                                    |
| ---------------------------- | ----------------------------------------- |
| Image                        | `redis:7-alpine`                          |
| Containernaam                | `omniroute-redis`                         |
| Interne poort                | `6379`                                    |
| Hostpoort (overschrijving)   | `REDIS_PORT` (standaard `6379`)           |
| Hostbinding (overschrijving) | `REDIS_BIND_HOST` (standaard `127.0.0.1`) |
| Volume                       | `omniroute-redis-data` → `/data`          |
| Statuscontrole               | `redis-cli ping` (interval van 10 s)      |

Gerelateerde omgevingsvariabelen:

- `REDIS_URL` — verbindingsreeks die in de app wordt geïnjecteerd (standaard `redis://redis:6379`).
- `REDIS_PORT` — poorttoewijzing aan de hostzijde voor de Redis-container.
- `REDIS_BIND_HOST` — hostinterface waarop de poort wordt gepubliceerd. Standaard `127.0.0.1`.

> **Waarom standaard loopback:** de sidecar wordt zonder `requirepass` uitgevoerd en de
> app-containers bereiken deze via het Compose-netwerk (`redis:6379`) — de gepubliceerde poort is
> uitsluitend bedoeld voor hulpprogramma's aan de hostzijde (`redis-cli`, een lokale `npm run dev`). Publicatie op
> `0.0.0.0` zou een niet-geverifieerde Redis beschikbaar maken voor elke host in je LAN. Als je
> `REDIS_BIND_HOST=0.0.0.0` instelt, voeg dan ook `--requirepass` toe aan de `command:` van de service.

**Redis uitschakelen** wordt niet aanbevolen (de snelheidsbegrenzer schakelt dan terug naar een minder robuuste fallback in het geheugen). Als het toch nodig is, verwijder dan het `redis:`-serviceblok in `docker-compose.yml` of zet het in commentaar, of schaal het naar nul:

```bash
docker compose up -d --scale redis=0
```

## Productie-Compose

Gebruik `docker-compose.prod.yml` voor een geïsoleerde productiesnapshot die naast de ontwikkelomgeving wordt uitgevoerd.

| Detail                  | Waarde                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| Bestand                 | `docker-compose.prod.yml`                                                                   |
| Standaarddashboardpoort | `PROD_DASHBOARD_PORT=20130` (toegewezen aan intern `${DASHBOARD_PORT:-20128}`)              |
| Standaard-API-poort     | `PROD_API_PORT=20131`                                                                       |
| Image                   | `omniroute:prod` (gebouwd vanuit het doel `runner-cli`)                                     |
| Redis-container         | `omniroute-redis-prod` (`redis:8.6.2`, speciaal `redis-prod-data`-volume)                   |
| Gegevensvolume          | `omniroute-prod-data` (benoemd, blijft behouden bij nieuwe builds)                          |
| Statuscontroles         | `node healthcheck.mjs` + `redis-cli ping`, waarbij `depends_on` afhangt van de Redis-status |

Gebruik:

```bash
# Bouw en start de productiestack
docker compose -f docker-compose.prod.yml up -d --build

# Stream logboeken
docker compose -f docker-compose.prod.yml logs -f

# Stop en verwijder de stack (behoud volumes)
docker compose -f docker-compose.prod.yml down
```

De productiestack wordt parallel met de ontwikkel-Compose uitgevoerd (met andere containernamen, poorten en volumes), zodat je lokaal kunt blijven itereren terwijl productie actief blijft.

## Dockerfile-fasen

De repository bevat een meerfasig Dockerfile (`Dockerfile`). Er zijn vier fasen beschikbaar; kies de juiste `target` voor jouw gebruikssituatie.

| Fase          | Basisimage            | Doel                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installeert afhankelijkheden (`npm ci --legacy-peer-deps`) en voert `npm run build` uit (standaard met Turbopack — zie Buildresources hieronder)                                                                                                                                                    |
| `runner-base` | `node:26-trixie-slim` | Productieruntime met de zelfstandige Next.js-uitvoer. **Er worden geen provider-CLI's meegeleverd.**                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | Voegt `git`, `docker.io`, `docker-compose` en globale CLI's toe: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Kies dit voor agentische workflows.**                                                                                                                         |
| `runner-web`  | `runner-base`         | Voegt Playwright en een Chromium-browser (`--with-deps`) toe voor websessieproviders: `gemini-web`, `claude-web`, `claude-turnstile`. **Kies dit wanneer je die providers gebruikt** — zonder dit mislukt de gewone image tijdens een aanvraag (zie de opmerking over `-web` onder Releasekanalen). |

Bouw handmatig een specifiek doel:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Buildresources

Drie buildargumenten bepalen hoeveel resources de `builder`-fase verbruikt. Ze gelden alleen tijdens de build —
`OMNIROUTE_MEMORY_MB` (hieronder) is een afzonderlijke runtime-instelling.

| Buildargument               | Standaard | Effect                                                                                                      |
| --------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`       | `0` bouwt met webpack: lager piekgeheugenverbruik, maar langzamer. `1` schakelt Turbopack in.               |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | Bovengrens voor de V8-heap (`--max-old-space-size`) van het gestarte `next build`-proces.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | Levert `CIRCLE_NODE_TOTAL`; Next leidt hieruit `workers = N - 1` af voor het verzamelen van paginagegevens. |

`OMNIROUTE_BUILD_WORKERS` is de instelling die je op een krachtige builder kunt verhogen en die je
moet verdenken wanneer een build met beperkte resources **na** `✓ Compiled successfully` vastloopt. Elke
worker voor paginagegevens is een afzonderlijk proces, net als het bovenliggende `next build`-proces zelf;
bij een reproductie op een actieve VPS (issue #7518) werd de piek-RSS van elk proces gemeten op
~4,5 GB, onafhankelijk van de heapvlag in `NODE_OPTIONS` (Turbopack compileert in
native/Rust-geheugen buiten de V8-heap). De standaardwaarde `2` (→ 1 worker, in totaal 2
processen) is afgestemd op de door GitHub gehoste runners met 16 GB / 4 vCPU die de
publicatiepipeline gebruikt. Bij `8` (→ 7 workers) raakte die runner door zijn geheugen heen en
mislukte de stap in buildkit met `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) paste nog steeds niet nadat de RSS per proces rechtstreeks was gemeten
in plaats van afgeleid. `tests/unit/docker-build-memory-budget.test.ts`
voert de berekening uit op basis van de gemeten waarde en mislukt als een van beide instellingen
de capaciteit van de runner overschrijdt.

Turbopack compileert in native Rust-geheugen dat zich **buiten** de V8-heap bevindt, waardoor
`OMNIROUTE_BUILD_MEMORY_MB` dit niet begrenst. Op een host met een geheugenlimiet wordt de
build vervolgens met SIGKILL beëindigd door de OOM-killer, zonder enige fouttekst — de build
stopt simpelweg halverwege `Creating an optimized production build`, wat eerder op vastlopen
dan op een geheugentekort lijkt. Daarom gebruikt het `Dockerfile` standaard webpack
(`OMNIROUTE_USE_TURBOPACK=0`), in tegenstelling tot `npm run dev` / `npm run build`, waar
Turbopack standaard in de code is ingesteld: een kale `docker build .` zonder buildargumenten (zoals
Railway en andere one-click-hosts die uitvoeren) mag niet stilletjes mislukken op een builder met
een geheugenlimiet. De gepubliceerde images geven `OMNIROUTE_USE_TURBOPACK=0` al
expliciet door in `docker-publish.yml`. Schakel op een builder met ruim voldoende RAM
Turbopack in voor een snellere build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` is ingeschakeld, waardoor `next build` een bovenliggend proces **en** een
workerproces uitvoert en elk afzonderlijk `OMNIROUTE_BUILD_MEMORY_MB` respecteert. Stel de
containerlimiet in op ruim meer dan ongeveer twee keer die waarde, niet één keer.

Gemeten in deze broncodeboom (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Containerlimiet | Resultaat                               |
| --------- | --------------- | --------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | bij beide stilletjes door OOM beëindigd |
| webpack   | 8 GiB           | buildworker met SIGKILL beëindigd       |
| webpack   | 12 GiB          | geslaagd, met een piek van 11,1 GiB     |

### Runtimestandaardwaarden

Standaardwaarden die door `runner-base` worden geëxporteerd: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Geheugengedrag in Docker:

- De image stelt `OMNIROUTE_MEMORY_MB=1024` in en leidt daaruit `NODE_OPTIONS=--max-old-space-size=1024` af.
- Het daadwerkelijke serverproces wordt gestart door de standalone-launcher, die `OMNIROUTE_MEMORY_MB` leest en `--max-old-space-size=<OMNIROUTE_MEMORY_MB>` toevoegt.
- Node gebruikt de laatste herhaalde waarde van `--max-old-space-size`, dus met `OMNIROUTE_MEMORY_MB` wordt de effectieve Docker-heaplimiet bepaald.
- Omdat de image deze variabele altijd instelt, wordt de eigen, op RAM afgestemde fallback van de launcher onder Docker nooit toegepast. Verhoog de waarde expliciet voor de workload (zie onderstaande tabel). `2048` is nog steeds te klein voor `/v1/responses` van coding agents.

### Runtime-RAM voor coding agents

De Docker-standaardwaarde van 1 GiB is een ondergrens voor het dashboard en lichte chats, geen capaciteit voor productiegebruik. Lange bodies van `POST /v1/responses` (honderden berichten, tientallen tools) houden tijdens compressie meerdere grafen in het geheugen vast. Twee overlappende requests van ~3 MiB / ~750k tokens hebben V8 afgebroken bij een old-space van **12 GiB** (`FATAL ERROR: Reached heap limit`) en veroorzaakten ook een cgroup-OOM bij 16 GiB. Zie [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Stel **cgroup `--memory` hoger in dan de heap** — native buffers, SQLite en tijdelijke compressiedata bevinden zich buiten V8.

| Workload                                   | `OMNIROUTE_MEMORY_MB`           | Container / cgroup      | Opmerkingen                                                                                          |
| ------------------------------------------ | ------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| Dashboard, één lichte chat                 | `1024` (standaard van de image) | ≥2 GiB                  |                                                                                                      |
| Eén coding agent (Claude/Codex/Grok)       | `8192`                          | ≥10 GiB                 | Typische `/v1/responses` met één sessie                                                              |
| Twee gelijktijdige lange `/v1/responses`   | `10240`–`12288`                 | ≥12–16 GiB              | Gemeten V8-abort bij een heap van ~12 GiB                                                            |
| Drie of meer gelijktijdige lange contexten | niet in één proces              | serialiseren / meer RAM | Standaard is maximaal 1 zware request actief; verhogen zonder extra RAM veroorzaakt opnieuw de abort |

`omniroute serve` op bare metal stemt de waarde af op ~35% van het RAM (begrensd op `[512, 4096]`) wanneer `OMNIROUTE_MEMORY_MB` **niet is ingesteld**. Docker stelt altijd `1024` in, waardoor die afstemming in de officiële image nooit wordt uitgevoerd.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritieke omgevingsvariabelen

Naast de standaardwaarden die zijn gedocumenteerd in [ENVIRONMENT.md](../reference/ENVIRONMENT.md), zijn de volgende variabelen het belangrijkst bij uitvoering onder Docker:

| Variabele                     | Doel                                                                                                                                                                                                                                                                           | Standaardwaarde                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Gedeeld geheim voor de WebSocket-bridge. **Vereist in productie** — stel dit in op een sterke willekeurige tekenreeks.                                                                                                                                                         | niet ingesteld (moet worden opgegeven) |
| `REDIS_URL`                   | Verbindingsreeks voor de backend van de rate limiter/cache                                                                                                                                                                                                                     | `redis://redis:6379`                   |
| `REDIS_PORT`                  | Hostpoort voor de meegeleverde Redis-container                                                                                                                                                                                                                                 | `6379`                                 |
| `REDIS_BIND_HOST`             | Hostinterface waarop de meegeleverde Redis-poort wordt gepubliceerd (loopback, tenzij u AUTH toevoegt)                                                                                                                                                                         | `127.0.0.1`                            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hostpad dat in het `cli`-profiel wordt gekoppeld aan `/workspace/omniroute` voor zelfupdateworkflows                                                                                                                                                                           | `.` (huidige map)                      |
| `OMNIROUTE_MEMORY_MB`         | Maximale Node-heapgrootte tijdens runtime voor de zelfstandige Docker-server; overschrijft de bovenstaande standaardwaarde van de image. Programmeeragents: `8192`+ (zie [runtime-RAM](#runtime-ram-for-coding-agents)).                                                       | `1024`                                 |
| `DASHBOARD_PORT` / `API_PORT` | Overschrijft de blootgestelde poorten voor het dashboard (20128) en de API (20129)                                                                                                                                                                                             | `20128` / `20129`                      |
| `APP_BIND_HOST`               | Hostinterface waarop docker-compose de dashboard-/API-/live-WS-poorten publiceert. Met `REQUIRE_API_KEY=false` (de standaardinstelling) stelt `0.0.0.0` de anonieme `/v1`-proxy bloot aan het LAN — verruim dit alleen met `REQUIRE_API_KEY=true` of een reverse proxy ervoor. | `127.0.0.1`                            |
| `CLIPROXY_BIND_HOST`          | Hostinterface waarop docker-compose de `cliproxyapi`-sidecar publiceert — het datavolume ervan bevat de inloggegevens van providers.                                                                                                                                           | `127.0.0.1`                            |
| `OMNIROUTE_PLUGINS_DIR`       | Map die door de runtime-plug-inscanner wordt gelezen en waarin deze installeert. Stel deze in wanneer plug-ins via bind mounts worden gekoppeld: de standaardwaarde volgt `HOME`, die niet noodzakelijk door een image wordt geëxporteerd.                                     | `~/.omniroute/plugins`                 |
| `OMNIROUTE_BASE_PATH`         | URL-subpad wanneer de app achter een reverse proxy wordt gepubliceerd (bijv. `/omniroute`)                                                                                                                                                                                     | _(leeg = hoofdpad)_                    |
| `NEXT_PUBLIC_BASE_URL`        | Openbare browser-origin inclusief het subpad (bijv. `https://host/omniroute`)                                                                                                                                                                                                  | niet ingesteld                         |
| `PROD_DASHBOARD_PORT`         | Dashboardpoort aan de hostzijde voor `docker-compose.prod.yml`                                                                                                                                                                                                                 | `20130`                                |
| `CLIPROXYAPI_PORT`            | Hostpoort voor de `cliproxyapi`-sidecar                                                                                                                                                                                                                                        | `8317`                                 |

## Reverse proxy op een subpad (Traefik / nginx)

De `basePath` van Next.js wordt in de zelfstandige bundel gecompileerd. OmniRoute legt de ingebakken
waarde vast in een markerbestand in de hoofdmap van de app (geschreven tijdens `npm run build`; gelezen door
`scripts/docker/ensure-docker-base-path.mjs`) en vergelijkt deze met
`OMNIROUTE_BASE_PATH` wanneer de container wordt gestart. Wanneer deze waarden verschillen en de image
voor de hoofdmap van het domein is gebouwd, herschrijft het entrypoint de zelfstandige manifests, de
ingebedde `basePath`/`assetPrefix`-literalen (Next 16 rendert SSR-asset-URL's uitsluitend vanuit
`assetPrefix` — de patcher neemt het subpad daarin over), de ingebakken
`/_next/static`-asset-URL's (client-reference-manifests, media-imports, vooraf gerenderde
foutpagina's) en de client-side `process.env`-shim voordat `node dev/run-standalone.mjs`
wordt uitgevoerd.

### Build met Compose (aanbevolen)

Stel beide variabelen in `.env` in en bouw vervolgens opnieuw, zodat de image en runtime overeenkomen:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` geeft `OMNIROUTE_BASE_PATH` door als Docker-buildargument en als
runtime-omgevingsvariabele.

### Vooraf gebouwde root-image + runtime-subpad

Gepubliceerde `diegosouzapw/omniroute:*`-images zijn gebouwd voor de hoofdmap van het domein. U kunt
`OMNIROUTE_BASE_PATH` nog steeds tijdens runtime instellen; de container patcht de bundel eenmaal bij het opstarten.
Combineer dit met de overeenkomende openbare origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configureer de reverse proxy om het **volledige** externe pad door te sturen (verwijder het
prefix niet). Traefik moet `PathPrefix(`/omniroute`)` naar de container routeren zonder
`StripPrefix`, zodat Next.js `/omniroute/...` ontvangt en assets vanuit
`/omniroute/_next/...` aanbiedt.

De Docker-healthcheck controleert het lichtgewicht lifecycle-endpoint `/healthz`, voorafgegaan
door het actieve `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` blijft beschikbaar voor
diagnostiek door mensen en dashboards; stel `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` in
om de HEALTHCHECK van de container er weer naar te laten verwijzen (bijvoorbeeld
voor grondige statusbewaking).
Dat pad is een **grondige** controle (database + monitoringssamenvatting) — geschikt voor Dockers
weinig frequente `HEALTHCHECK` als u dit opnieuw inschakelt, maar **niet** voor intervallen van
Kubernetes-`livenessProbe`.

Voor orchestrators (Kubernetes, Nomad enz.):

| Probe              | Bij voorkeur                                                           | Vermijd                                                        |
| ------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| Liveness           | HTTP `GET /livez`, of TCP op de hoofdpoort (`PORT`, standaard `20128`) | `/api/monitoring/health` als liveness                          |
| Readiness          | HTTP `GET /healthz`                                                    | Krappe time-outs die een drukke event-loop als dood beschouwen |
| Grondig / blackbox | `/api/monitoring/health`                                               | —                                                              |

`/healthz` rapporteert de lifecycle van het proces (`ok` / `starting` / `stopping`). `/livez` controleert
alleen of het proces actief is (200 wanneer de handler kan worden uitgevoerd; het wacht niet op
readiness). Beide worden nog steeds uitgevoerd op dezelfde Node-event-loop als de afhandeling van verzoeken, waardoor
CPU-intensieve catalogus- of compressiewerkzaamheden ze kunnen vertragen — druk ≠ dood. Geef de voorkeur aan TCP-
liveness als HTTP-probes een time-out krijgen. Volledige richtlijnen voor probes:
[Monitoringhandleiding — aanbevelingen voor Kubernetes-probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose met Caddy (HTTPS Auto-TLS)

OmniRoute kan veilig toegankelijk worden gemaakt met Caddy's automatische SSL-configuratie. Zorg ervoor dat het DNS A-record van je domein naar het IP-adres van je server verwijst.

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
      # Publiek bereikbare oorsprong voor OAuth-callbacks, dashboardlinks en gegenereerde openbare URL's.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interne server-naar-server-URL voor geplande taken / verzoeken aan de eigen service.
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

Caddy stelt de standaard forwarding-headers voor de upstreamcontainer in. OmniRoute gebruikt
`NEXT_PUBLIC_BASE_URL` als de canonieke openbare oorsprong voor OAuth-callbacks en gegenereerde openbare
links; geauthenticeerde schrijfbewerkingen vanuit het dashboard gebruiken same-origin-verzoeken plus sessiegebonden CSRF-
beveiliging. Schakel `OMNIROUTE_TRUST_PROXY` alleen in voor geavanceerde implementaties waarbij je bewust
wilt dat OmniRoute de openbare oorsprong afleidt uit vertrouwde doorgestuurde headers in plaats van uit expliciete
configuratie.

## Cloudflare Quick Tunnel

Dashboardondersteuning voor Docker-implementaties omvat een met één klik te activeren **Cloudflare Quick Tunnel** op `Dashboard → Endpoints`. Bij de eerste activering wordt `cloudflared` alleen gedownload wanneer dat nodig is, wordt een tijdelijke tunnel naar je huidige `/v1`-endpoint gestart en wordt de gegenereerde `https://*.trycloudflare.com/v1`-URL direct onder je normale openbare URL weergegeven.

Tunnelpanelen voor endpoints (Cloudflare, Tailscale, ngrok) kunnen via `Settings → Appearance` worden weergegeven of verborgen zonder de status van actieve tunnels te wijzigen.

### Opmerkingen over tunnels

- Quick Tunnel-URL's zijn tijdelijk en veranderen na elke herstart.
- Quick Tunnels worden niet automatisch hersteld na een herstart van OmniRoute of de container. Schakel ze indien nodig opnieuw in via het dashboard.
- Beheerde installatie ondersteunt momenteel Linux, macOS en Windows op `x64` / `arm64`.
- Beheerde Quick Tunnels gebruiken standaard HTTP/2-transport om luidruchtige waarschuwingen over QUIC UDP-buffers in beperkte containeromgevingen te voorkomen. Stel `CLOUDFLARED_PROTOCOL=quic` of `auto` in als je een ander transport wilt.
- Docker-images bevatten systeem-CA-rootcertificaten en geven deze door aan de beheerde `cloudflared`, waardoor TLS-vertrouwensfouten worden voorkomen wanneer de tunnel binnen de container wordt geïnitialiseerd.
- Stel `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` in als je wilt dat OmniRoute een bestaand binair bestand gebruikt in plaats van er een te downloaden.

## Imagetags

| Image                    | Tag      | Grootte | Beschrijving                                                |
| ------------------------ | -------- | ------- | ----------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Hoogste **gepubliceerde** stabiele SemVer (niet git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Zet dit type tag vast voor GitOps                           |

Multiplatformmanifest: native `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selecteert automatisch de overeenkomende architectuur; geef `--platform linux/amd64` door als je AMD64-emulatie op ARM-hosts wilt afdwingen.

### Releasekanalen

OmniRoute publiceert afzonderlijke Docker-kanalen voor stabiele releases, het testen van de actieve releasetakken en ontwikkelbuilds.

| Kanaal                          | Bron                                      | Wijzigbaarheid                  | Aanbevolen gebruik                                                                                                                          |
| ------------------------------- | ----------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Ondertekende/geversioneerde release       | Onveranderlijk                  | Productie-implementaties die een exacte release vastzetten                                                                                  |
| `:latest` / `:latest-web`       | Hoogste **gepubliceerde** stabiele SemVer | Wijzigbare stabiele verwijzing  | Volgt stabiele releases **nadat** een SemVer-publicatietaak is uitgevoerd — volgt **niet** `main` of niet-uitgebrachte `release/v*`-commits |
| `:next` / `:next-web`           | Huidige standaardtak `release/v*`         | Wijzigbare prereleaseverwijzing | Testen van fixes die in de actieve releasetak zijn opgenomen, maar nog niet in een stabiele release zitten                                  |
| `:main` / `:main-web`           | `main`-tak                                | Wijzigbare ontwikkelverwijzing  | Alleen voor ontwikkel- en integratietests                                                                                                   |

#### Websessieproviders: de `-web`-images

Elk bovenstaand kanaal is ook beschikbaar als een `-web`-tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), gebouwd vanuit de `runner-web`-fase — dezelfde image plus Playwright en een Chromium-browser. De gewone image wordt **zonder** Chromium geleverd; `gemini-web`, `claude-web` en `claude-turnstile` hebben dit nodig.

De fout treedt pas later op, niet tijdens het opstarten: deze providers vermelden hun modellen en worden als verbonden weergegeven in het dashboard, en pas het eerste verzoek mislukt met

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Als je deze providers gebruikt, haal dan de `-web`-tag op van het kanaal dat je al gebruikt — verder verandert er niets. Bij een npm/CLI-installatie (geen Docker-image) ontbreekt het browserbestand dat hiermee overeenkomt: voer `npx playwright install chromium` uit op de host.

#### Het prereleasekanaal gebruiken

Het `next`-kanaal wordt bij elke push naar de huidige standaardbranch `release/v*` opnieuw gebouwd en wordt voor zowel AMD64 als ARM64 gepubliceerd. Oudere onderhoudsbranches kunnen het kanaal niet overschrijven. Het kanaal biedt een downloadbare image voor fixes die in de actieve releasebranch zijn samengevoegd voordat de volgende stabiele tag wordt aangemaakt.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Overschrijf voor Docker Compose de imagetag die door het geselecteerde profiel wordt gebruikt en download en herschep vervolgens de service:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Veiligheid en terugdraaien

`next` is een dynamisch pre-releasekanaal. Het kan bij elke push naar de actieve releasebranch veranderen en wordt **niet ondersteund voor productiegebruik**. Zet de image-digest vast tijdens het evalueren van een specifieke build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Maak vóór het testen een back-up van het OmniRoute-datavolume of de via een bind-mount gekoppelde datadirectory. Als u wilt terugdraaien, herstelt u de eerder gebruikte stabiele versie of digest en maakt u de container opnieuw aan:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Een build van een releasebranch kan `latest` nooit verplaatsen; alleen een geschikte stabiele semantische versie kan de stabiele verwijzing promoveren. De `next`-images behouden de inspectie van de release-image en de blokkerende controle op CRITICAL-kwetsbaarheden.

**`latest` is geen garantie dat de image actueel is ten opzichte van git.** Samengevoegde fixes op `main` of op de actieve branch `release/v*` zijn **niet** opgenomen in `:latest` totdat een stabiele SemVer-image is gepubliceerd en de publicatietaak `:latest` promoveert (dezelfde digest als die SemVer). Als `latest` bevroren lijkt terwijl GitHub de fix al toont, download dan `:next` om de releasebranch te testen of wacht op de SemVer-tag.

| U wilt                                                                           | Gebruik                                |
| -------------------------------------------------------------------------------- | -------------------------------------- |
| GitOps/productie zonder ongewenste wijzigingen                                   | Zet `:X.Y.Z` (of de image-digest) vast |
| Gepubliceerde stabiele versies volgen en bij elke release herscheppen accepteren | `:latest`                              |
| Niet-uitgebrachte commits van `release/v*` testen                                | `:next` (niet voor productie)          |
| `main` testen                                                                    | `:main` (niet voor productie)          |

## Dashboardupdates in Docker

Een container op basis van een gepubliceerde image kan zichzelf niet vervangen. Wanneer OmniRoute detecteert dat het in een container wordt uitgevoerd (geen `.git`-checkout en geen npm-installatie), toont de updatebanner op het startdashboard de hostopdracht die moet worden uitgevoerd in plaats van de npm/git-instructies, met een kopieerknop:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

De servicenaam is afkomstig uit `AUTO_UPDATE_SERVICE` (standaard `omniroute`, de service in
`docker-compose.selfhost.yml`). `pull` verplaatst alleen een zwevende tag (`latest`, `next`); bij een vastgezette
`:X.Y.Z`-tag moet u eerst de tag aanpassen.

### Updates met één klik via een triggerbestand op de host

Om **Nu bijwerken** te laten werken zonder `/var/run/docker.sock` te mounten (wat de container
roottoegang tot de host geeft — zie de waarschuwing bij het `cli`-profiel hierboven), stelt u `DOCKER_UPDATE_TRIGGER_FILE` in voor de
OmniRoute-service en voert u een watcher uit op de host:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Het pad moet zich binnen `DATA_DIR` bevinden (relatieve waarden worden ten opzichte daarvan omgezet); alle andere paden worden
geweigerd. **Nu bijwerken** schrijft vervolgens `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` naar dat
bestand, antwoordt met `202` en het dashboard vraagt `/api/system/version` herhaaldelijk op totdat de nieuwe versie actief is,
waarna het opnieuw wordt geladen. OmniRoute voert in deze modus nooit een shell- of Docker-opdracht uit. Net als bij elke
updateactie wordt het verzoek alleen geaccepteerd van loopback-/LAN-clients.

Een via bind-mount gekoppelde gegevensmap biedt de host een stabiel pad om te bewaken. Voorbeeldunits voor `systemd`
(pas `/srv/omniroute` aan naar de map met uw compose-bestand en `data/`):

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

De service verwijdert het verzoek vóór het ophalen, zodat een mislukte uitvoering niet in een lus terechtkomt. Zonder
`DOCKER_UPDATE_TRIGGER_FILE` behoudt het dashboard de handmatige opdrachtprocedure.

## Beschikbaarheid: standaard SQLite is een enkele replica

Voorraad Docker / Kubernetes OmniRoute is** één knooppuntproces + één SQLite -schrijver** . Hoge beschikbaarheid wel** niet ondersteund** op die topologie.

| Beperking                                             | Gevolg                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enkele schrijver                                      | Doen** niet** voer meerdere replica's uit tegen hetzelfde SQLite bestand. Dat corrumpeert de DB.                                                                                                                                                                                                                                             |
| Opnieuw maken / opnieuw opstarten / HEALTHCHECK doden | **Volledige storing** van SSE tijdens de vlucht, dashboardsessies en status in het geheugen. Elke verbonden client valt weg. Nieuwe aanvragen tijdens het lege eindpuntvenster krijgen een omgekeerde proxy**`502 Bad Gateway: Unknown error`** , niet OmniRoute JSON — clients kunnen dit niet onderscheiden van een providerfout (#11015). |
| Dezelfde gebeurtenislus als `/healthz`                | Een drukke catalogus of compressietik kan sondes vertragen; een korte time-out start vervolgens het programma opnieuw** alleen** replica.                                                                                                                                                                                                    |

**Sondematrix** (zie ook [Kubernetes-sondeaanbevelingen](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Doorvragen    | Doel                                                         | Niet gebruiken                                            |
| ------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| Levendigheid  | TCP op `PORT` (standaard `20128`), of zachte HTTP `/healthz` | `/api/monitoring/health`                                  |
| Bereidheid    | HTTP `GET /healthz`                                          | Strakke time-outs die event-loop busy als dood beschouwen |
| Diep / mensen | `/api/monitoring/health`                                     | Geautomatiseerde kubelet-levendigheid                     |

**Upgrades:** verwacht dat elke sessie afneemt. Laat klanten leeglopen als je kunt; er is geen rollende update voor standaard SQLite. Samenstellen van `restart: unless-stopped` plus Docker `HEALTHCHECK` vervangt ook het enige proces wanneer de container ongezond is: dezelfde ontploffingsradius.

Kant-en-klare manifesten en een Helm-diagram live in `deploy/kubernetes/` en `deploy/helm/omniroute/` : zie de [Kubernetes-implementatiehandleiding](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes-fragment voor a** enkele replica** (Opnieuw maken is vereist; verhoog `replicas` niet tegen één SQLite bestand):

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

`preStop` sleep kan Kube service-eindpunten laten vallen vóór SIGTERM so** nieuw** het verkeer stopt met het stervensproces. `/v1/responses` SSE tijdens de vlucht wordt leeggemaakt tot `SHUTDOWN_TIMEOUT_MS` (standaard 30s) via zwaargewicht toegangsleases (#11015). Nieuwe verzoeken die het proces nog steeds bereiken, krijgen `503` + `Retry-After: 5`. Het gat tussen het lege eindpunt opnieuw maken totdat de vervanging gereed is, blijft een harde storing: dat is de SQLite topologie, en niet een foutieve configuratie van de probe.

Externe Postgres / multi-writer HA is** niet** een gedocumenteerd voorraadpad. Als je HA nodig hebt, bewaar dan een enkele replica of voer een topologie uit die het project afzonderlijk heeft getest en gedocumenteerd. Het Postgres/MySQL werk staat in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Totdat dit wordt verzonden, is dit de enige ondersteunde manier om te vermenigvuldigen** groot** `/v1/responses` capaciteit is N onafhankelijke processen (volgende sectie), niet `replicas > 1` op één volume.

## Horizontaal schalen: N onafhankelijke processen

Eén Node-proces is **één V8-heap**. Twee overlappende codeeragentverzoeken van ~3 MiB / ~750k tokens naar `POST /v1/responses` (RTK + Caveman) laten die heap bij ~12 Gi vastlopen (`FATAL ERROR: Reached heap limit`) en kunnen in een cgroup van 16 Gi een OOM veroorzaken. Zie [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Die meting is een waarschuwing over het **geheugenbudget**, geen harde productlimiet van twee gelijktijdige langdurige `/v1/responses`. De toelating van zware chatverzoeken wordt begrensd door een automatisch afgeleid bytebudget voor binnenkomende gegevens (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dat wordt bepaald op basis van dezelfde V8-/cgroup-limiet — als u dit naar boven bijstelt (of de verouderde verzoeklimiet `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` instelt) voor een proces dat al op maat is geconfigureerd, treedt de crash opnieuw op. Kleine chats, `/healthz`, `/v1/models` en MCP vallen **niet** onder die limiet.

### Eén proces: meer dan twee langdurige `/v1/responses`

Een **gezond** proces (heap onder `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standaard `0.75`) **kan** meer dan twee gelijktijdige langdurige verzoeken naar `POST /v1/responses` uitvoeren wanneer het procesbrede budget voor actieve bytes (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) nog ruimte heeft. Bodies van ten minste `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standaard 256 KiB) gebruiken dezelfde lease voor zware verzoeken als structuurintensieve verzoeken en gebruiken dezelfde [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)-ontsnappingsroute `tryAcquireHealthyHeadroom` (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tientallen gelijktijdige langdurige SSE-clients (operators hebben er vaak 40–50 nodig) zijn een kwestie van het **geheugenbudget** — stem de heap + primaire/headroom-slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` daarop af — en geen harde productlimiet van “maximaal 2”. Een heap die onder druk staat, wijst nog steeds verzoeken af met een opnieuw te proberen `503`, zodat #7849 niet terugkeert.

Om **heaps te vermenigvuldigen** (onafhankelijke oude V8-ruimtes), doet u **vandaag** het volgende:

| Wel doen                                                                                                                                                                 | Niet doen                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Voer **N containers/pods** uit, elk met een **eigen** `DATA_DIR` / volume                                                                                                | `replicas > 1` instellen voor één SQLite-bestand                  |
| Stem zware actieve verzoeken + gezonde headroom af op het heap-/bytebudget voor actieve verzoeken; 1–2 is de conservatieve standaard van #7849, geen harde productlimiet | Eén proces 8× RAM en een onbeperkte aantalslimiet geven           |
| Optioneel: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` voor **gedeelde quotatellers**                                                                           | Redis als gedeelde SQLite behandelen — dat is het niet            |
| Dupliceer providergeheimen naar elke instantie (of accepteer afzonderlijke dashboards)                                                                                   | Eén dashboard / één oproeplogboek voor alle instanties verwachten |
| Plaats er een willekeurige loadbalancer voor; sticky sessions op basis van API-sleutel of sessie volstaan                                                                | Leverancierspecifieke, groottebewuste middleware vereisen         |

Hardware: het aantal gelijktijdige langdurige `/v1/responses` per instantie is een kwestie van het **geheugenbudget** (heap + actieve bytes / #10110). `N` onafhankelijke `DATA_DIR`'s vermenigvuldigen nog steeds de heaps: het host-RAM moet `N × cgroup` kunnen bevatten, niet “één pod van 16 Gi met N=8”. Gebruik nooit `replicas > 1` voor één SQLite-bestand.

Compose-voorbeeld (twee heaps, twee volumes — niet `deploy.replicas: 2`):

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

Dichtheid binnen één proces (compressie buiten de HTTP-isolate) wordt behandeld in [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Eén logisch cluster op gedeelde duurzame status wordt behandeld in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionale Gemini-fouten in Docker

Google AI Studio / Gemini API kan HTTP 400 retourneren met FAILED_PRECONDITION en
`User location is not supported for the API use.` Een geslaagd verzoek op de host
bewijst niet dat de container dezelfde uitgaande route gebruikt. DNS-volgorde,
IPv4/IPv6-connectiviteit, VPN-routering en geconfigureerde proxy's kunnen verschillen. Controleer
[de door Google ondersteunde regio's](https://ai.google.dev/gemini-api/docs/available-regions)
en de daadwerkelijk gebruikte verbindingsroute; deze fout alleen wijst niet op een ongeldige API-sleutel.

### Geef de voorkeur aan een verbindingsspecifieke proxy

Gebruik OmniRoute's [proxyconfiguratie per verbinding](../ops/PROXY_GUIDE.md#4-level-proxy-system)
voor de getroffen Gemini-verbinding en herhaal vervolgens **Verbinding testen** en een klein verzoek
met hetzelfde model. Zo blijft de routeringswijziging beperkt tot die verbinding. Controleer
of de proxy bereikbaar is vanuit de container en of de verbinding deze daadwerkelijk selecteert.
Een wijziging van de route garandeert niet dat de upstreamdienst de regio accepteert.

### Netwerken van host en container vergelijken

Houd de sleutel, het model en het verzoek identiek wanneer u geauthenticeerde resultaten vergelijkt; plaats nooit
inloggegevens, proxywachtwoorden of volledige autorisatieheaders in een issue.
Controleer eerst welke adresfamilies door de resolver van het besturingssysteem worden aangeboden, met dezelfde opdracht
op de host en in de container:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Vervang `omniroute` door de service die u uitvoert (bijvoorbeeld `omniroute-web`). Deze
opdrachten tonen adresfamilies zonder inloggegevens of IP-adressen. Een geretourneerde `6`
toont alleen een IPv6-DNS-resultaat: dit bewijst **niet** dat er een bruikbare IPv6-route of API-toegang is.
Waar `curl` is geïnstalleerd, vergelijkt u `curl -4 -I https://generativelanguage.googleapis.com`
met `curl -6 -I https://generativelanguage.googleapis.com` in beide omgevingen.
Een HTTP-respons bewijst connectiviteit voor die controle, zelfs als het een niet-geauthenticeerde
fout is; alleen het geauthenticeerde modelverzoek test of Gemini beschikbaar is.

### Alternatief op hostniveau: werkend IPv6 en resolverbeleid

De melder van [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) herstelde
de toegang in diens omgeving door IPv6 voor containers in te schakelen en de adresselectie
van glibc te wijzigen. Beschouw dit als een omgevingsspecifiek alternatief. Controleer of IPv6
op de host werkt en verifieer de uitgaande connectiviteit/routering en firewallregels van de container voordat u
resolvervoorkeuren aanpast. Een privé-ULA-adres op zichzelf bewijst geen publieke IPv6-connectiviteit.

Voor services die al zijn gekoppeld aan het standaardnetwerk van Compose, schakelt dit fragment
IPv6 op dat netwerk in; behoud de rest van uw service, poorten, volumes en configuratie:

```yaml
networks:
  default:
    enable_ipv6: true
```

Voor een benoemd netwerk schakelt u dit in op het netwerk waarmee de service daadwerkelijk is verbonden. Docker kan
een ULA-subnet toewijzen; selecteer alleen een expliciet, niet-overlappend subnet wanneer uw netwerk
dit vereist. Zie [IPv6-netwerken in Docker](https://docs.docker.com/engine/daemon/ipv6/)
en [Compose-netwerkopties](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Op een **op glibc gebaseerde image** kan `/etc/gai.conf` de adresselectie wijzigen. De huidige
Dockerfile van de repository gebruikt Debian; aangepaste op musl gebaseerde images gebruiken dit mechanisme niet.
De gemelde aanpassing verandert het ULA-label van `label fc00::/7 6` in
`label fc00::/7 1`. Begin met de volledige beleidstabel van de image en behoud de overige
vermeldingen: het toevoegen van een `label`- of `precedence`-vermelding vervangt die standaardtabel, dus een bestand
dat alleen de gewijzigde regel bevat, is niet voldoende. De
[glibc-configuratiereferentie](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documenteert die semantiek. Koppel het gecontroleerde bestand als alleen-lezen-bindmount aan `/etc/gai.conf`
en maak de service opnieuw aan om de wijziging toe te passen.

Dit wijzigt de adresselectie van het besturingssysteem voor **al het uitgaande verkeer in die container**.
Het dwingt niet elke applicatie om IPv6 te kiezen: de DNS-volgorde en verbindingsselectie
van Node zijn ook van belang. Met name `--dns-result-order=ipv4first` geeft de voorkeur aan IPv4 en
is geen oplossing voor een probleem dat alleen bij IPv4 optreedt. Zie [DNS-volgorde in Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Test Gemini en uw andere providers opnieuw na elke wijziging op hostniveau. Om de wijziging terug te draaien,
verwijdert u de aangepaste `gai.conf`-mount, herstelt u de vorige netwerkconfiguratie en
maakt u de getroffen service/het getroffen netwerk opnieuw aan tijdens een onderhoudsvenster. Het opnieuw aanmaken van een netwerk
kan andere daaraan gekoppelde containers onderbreken; verwijder het persistente datavolume niet.

## Belangrijke opmerkingen

- **SQLite WAL-modus:** `docker stop` moet de tijd krijgen om te voltooien, zodat OmniRoute de laatste wijzigingen vanuit het WAL-bestand kan checkpointen naar `storage.sqlite`. In de meegeleverde Compose-bestanden is al een respijtperiode van 40 seconden voor het stoppen ingesteld. Als je de image rechtstreeks uitvoert, behoud dan `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Stel dit in op `true` als reguliere backups en backups vóór schrijfbewerkingen extern worden beheerd. Migraties van bestaande databases vereisen nog steeds een eigen duurzame veiligheidsmomentopname en beveiliging tegen massamigratie.
- **Gegevenspersistentie:** Koppel altijd een volume aan `/app/data` om je database, sleutels en configuraties te behouden wanneer containers opnieuw worden gestart.
- **Poortconfiguratie:** Overschrijf de omgevingsvariabele `PORT` om de standaardpoort `20128` te wijzigen.

## Zie ook

- [Handleiding voor VM-implementatie](../ops/VM_DEPLOYMENT_GUIDE.md) — Installatie met VM + nginx + Cloudflare
- [Handleiding voor implementatie op Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementeren op Fly.io
- [Omgevingsconfiguratie](../reference/ENVIRONMENT.md) — Volledig `.env`-overzicht
