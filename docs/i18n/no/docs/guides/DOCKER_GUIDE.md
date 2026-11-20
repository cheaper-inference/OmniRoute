# 🐳 Docker Guide — OmniRoute (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Komplett referanse for Docker-distribusjon. For en rask start, se [Docker-delen i README](../README.md#-docker).

## Innholdsfortegnelse

- [Hurtigkjøring](#quick-run)
- [Med miljøfil](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Tilgjengelige profiler](#available-profiles)
- [Konfigurere CLI-verktøy på verten når OmniRoute kjører i Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Compose for produksjon](#production-compose)
- [Dockerfile-stadier](#dockerfile-stages)
- [Kritiske miljøvariabler](#critical-environment-variables)
- [Docker Compose med Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image-tagger](#image-tags)
- [Dashboard-oppdateringer i Docker](#dashboard-updates-in-docker)
- [Tilgjengelighet: Standardoppsettet med SQLite støtter bare én replika](#availability-default-sqlite-is-single-replica)
- [Regionale Gemini-feil i Docker](#gemini-regional-errors-inside-docker)
- [Viktige merknader](#important-notes)

---

## Rask løp

> **Selvvert i én kommando?** Se [Self-Host Guide](../getting-started/SELF_HOST_GUIDE.md) — `docker compose -f docker-compose.selfhost.yml up -d` (publisert bilde + Redis, loopback-bare, ingen profilvalg). Hurtigkjøringen nedenfor er enkeltbeholderbanen for brukere som allerede kjører Redis andre steder.

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
# Grunnprofil (ingen CLI-verktøy)
docker compose --profile base up -d

# CLI-profil (Claude Code, Codex og OpenClaw innebygd)
docker compose --profile cli up -d

# Vertsprofil (primært for Linux; monterer vertens CLI-binærfiler skrivebeskyttet)
docker compose --profile host up -d

# Webprofil (Chromium/Playwright for leverandører med nettøkter)
docker compose --profile web up -d

# Kombiner CLI + CLIProxyAPI-sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Tilgjengelige profiler

OmniRoute leveres med Compose-profiler for de vanligste distribusjonsoppsettene. Velg den som passer miljøet ditt.

| Profil            | Tjeneste         | Når den skal brukes                                                                                                                                   | Kommando                                     |
| ----------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standard) | `omniroute-base` | Hodeløs server / minimalt kjøremiljø, uten medfølgende CLI-er for leverandører                                                                        | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentbaserte arbeidsflyter som kaller `omniroute providers/setup/doctor` og medfølgende CLI-er (Codex, Claude Code, Droid, OpenClaw)                  | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-verter som ønsker `network_mode`-lignende tilgang til vertens CLI-er ved å montere `~/.local/bin`, `~/.codex`, `~/.claude` osv. skrivebeskyttet | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Kjør [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) som sidecar på port `8317` for oppstrøms CLI-proxying                                | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Leverandører med nettøkter som trenger en nettleser: `gemini-web`, `claude-web`, `claude-turnstile` (bygger `runner-web`, Chromium inkludert)         | `docker compose --profile web up -d`         |

> Flere profiler kan kombineres: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurere CLI-verktøy på verten når OmniRoute kjører i Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` og knappen
**Lagre konfigurasjon** i kontrollpanelet skriver alle filer som `~/.codex/*.config.toml`. Disse banene
har bare betydning på maskinen der CLI-verktøyet faktisk kjører. Hvis du kjører dem inne
i containeren, skrives filene til containerens egen hjemmekatalog (`/home/node` —
avbildningen kjører med `USER node`), der ingen CLI-verktøy på verten noen gang vil lese dem, og der de
forkastes i det øyeblikket containeren opprettes på nytt.

OmniRoute oppdager dette og avviser skrivingen med instruksjoner i stedet for å
rapportere en suksess du ikke kan dra nytte av: CLI-verktøyet avsluttes med `2`, og API-et svarer `422`
med `containerEphemeralTarget: true`.

### Anbefalt: Kjør CLI-verktøyet på verten og OmniRoute i Docker

Containeren leverer API-et, mens CLI-verktøyet konfigurerer verktøyene på verten.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # pek CLI-verktøyet mot containeren
omniroute setup-codex                      # skriver til den faktiske ~/.codex på verten
```

Dette er riktig valg når Codex, Claude Code, Cursor eller lignende kjører på
den bærbare datamaskinen din — som er det vanlige oppsettet.

### Alternativ: Bind-monter vertens konfigurasjonskataloger (`host`-profilen)

Hvis du vil at selve containeren skal skrive vertskonfigurasjonen, monterer du
katalogene og peker `CLI_CONFIG_HOME` mot monteringsroten. `host`-profilen
gjør allerede dette:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

En bind-montering er det som gjør banen pålitelig: OmniRoute leser
`/proc/self/mountinfo` og tillater skriving til monterte baner (og til kataloger
der underkatalogene er monteringer, som er nøyaktig strukturen til `/host-home` ovenfor), samtidig som
skriving til umonterte baner fortsatt avvises.

### Nødløsning: Konfigurer containerens egne CLI-verktøy (brukes med forsiktighet)

Når CLI-verktøyene faktisk befinner seg inne i containeren (`cli`-profilen), er skrivingen
tilsiktet. Send `--allow-container-write` til en hvilken som helst `setup-*`-kommando, eller angi
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` for serveren. Skrivingen fortsetter
med en advarsel om at den ikke vil overleve containeren.

> **Sikkerhetsadvarsel — `cli`-profil + montering av `docker.sock`.**
> `cli`-profilen bind-monterer `/var/run/docker.sock`, slik at den automatiske
> oppdateringsmekanismen i containeren kan opprette stakken på nytt via vertens daemon
> (`src/lib/system/autoUpdate.ts` ser etter denne socketen og hopper over
> Docker-banen når den ikke finnes). Denne socketen er **en tillitsgrense mot
> root på verten**: Alt som kan nå den, styrer vertens Docker-daemon som
> root — det kan opprette, inspisere, stoppe og fjerne enhver container på verten.
> Konsekvenser:
>
> 1. **Eksponer aldri porten til `cli`-profilen mot nettverket.** Publiser
>    den på `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — en `cli`-profil som er tilgjengelig fra lokalnettet, gjør enhver RCE på kontrollpanelnivå til
>    full kompromittering av verten.
> 2. **Ikke bind-monter flere kataloger fra verten i `cli`-profilen.**
>    Docker-socketen kombinert med en hvilken som helst ytterligere montering gir containeren full
>    lese- og skrivetilgang til filsystemet og vertskonfigurasjonen din. Hvis et verktøy må
>    ha tilgang til et prosjekt, kjører du det lokalt med CLI-binærfilen — ikke monter prosjektet
>    i `cli`-containeren.
>
> Hvis du ikke trenger automatisk oppdatering i containeren, lar du `cli`-profilen være deaktivert
> (`COMPOSE_PROFILES=core,redis` eller kortere). De andre profilene
> monterer ikke Docker-socketen.
>
> Se `docs/security/MITM-TPROXY-DECRYPT.md` (git; ikke kompilert inn i `/docs`) for den relaterte trusselmodellen
> rundt MITM, og `docs/security/SUPPLY_CHAIN.md` for
> provenienskjeden til binærfilene `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-sidecar

OmniRoute bruker Redis som grunnlag for den distribuerte hastighetsbegrenseren og den delte hurtigbufferen. Tjenesten `redis` er **alltid definert** i `docker-compose.yml` (den har ingen profilbegrensning) og starter sammen med alle andre profiler.

| Detalj                     | Verdi                                         |
| -------------------------- | --------------------------------------------- |
| Avbildning                 | `redis:7-alpine`                              |
| Beholdernavn               | `omniroute-redis`                             |
| Intern port                | `6379`                                        |
| Vertsport (overstyring)    | `REDIS_PORT` (standardverdi `6379`)           |
| Vertsbinding (overstyring) | `REDIS_BIND_HOST` (standardverdi `127.0.0.1`) |
| Volum                      | `omniroute-redis-data` → `/data`              |
| Helsesjekk                 | `redis-cli ping` (10 s intervall)             |

Relaterte miljøvariabler:

- `REDIS_URL` — tilkoblingsstreng som injiseres i appen (`redis://redis:6379` som standard).
- `REDIS_PORT` — porttilordning på vertssiden for Redis-beholderen.
- `REDIS_BIND_HOST` — vertsgrensesnittet som porten publiseres på. Standardverdien er `127.0.0.1`.

> **Hvorfor loopback brukes som standard:** Sidecar-beholderen kjører uten `requirepass`, og appbeholderne
> når den via Compose-nettverket (`redis:6379`) — den publiserte porten er
> bare tilgjengelig for verktøy på vertssiden (`redis-cli`, en lokal `npm run dev`). Publisering på
> `0.0.0.0` vil eksponere en uautentisert Redis-tjeneste for alle verter på lokalnettverket ditt. Hvis du angir
> `REDIS_BIND_HOST=0.0.0.0`, må du også legge til `--requirepass` i tjenestens `command:`.

Det anbefales ikke å **deaktivere Redis** (hastighetsbegrenseren vil gå over til en minnebasert reserveløsning). Hvis du må gjøre det, kan du enten fjerne/kommentere ut tjenesteblokken `redis:` i `docker-compose.yml` eller skalere den ned til null:

```bash
docker compose up -d --scale redis=0
```

## Compose for produksjon

Bruk `docker-compose.prod.yml` for et isolert produksjonsøyeblikksbilde som kjører parallelt med utviklingsmiljøet.

| Detalj                    | Verdi                                                                             |
| ------------------------- | --------------------------------------------------------------------------------- |
| Fil                       | `docker-compose.prod.yml`                                                         |
| Standardport for dashbord | `PROD_DASHBOARD_PORT=20130` (tilordnet intern `${DASHBOARD_PORT:-20128}`)         |
| Standardport for API      | `PROD_API_PORT=20131`                                                             |
| Avbildning                | `omniroute:prod` (bygget fra målet `runner-cli`)                                  |
| Redis-beholder            | `omniroute-redis-prod` (`redis:8.6.2`, dedikert `redis-prod-data`-volum)          |
| Datavolum                 | `omniroute-prod-data` (navngitt, beholdes på tvers av gjenoppbygginger)           |
| Helsesjekker              | `node healthcheck.mjs` + `redis-cli ping`, med `depends_on` styrt av Redis-helsen |

Slik bruker du det:

```bash
# Bygg og start produksjonsstakken
docker compose -f docker-compose.prod.yml up -d --build

# Strøm logger
docker compose -f docker-compose.prod.yml logs -f

# Stopp stakken (behold volumer)
docker compose -f docker-compose.prod.yml down
```

Produksjonsstakken kjører parallelt med Compose-miljøet for utvikling (med ulike beholdernavn, porter og volumer), slik at du kan fortsette den lokale utviklingen mens produksjonsmiljøet kjører.

## Dockerfile-stadier

Depotet sender en flertrinns Dockerfile (`Dockerfile`). Fire stadier er eksponert; velg riktig `target` for ditt bruksområde.

| Scene         | Grunnbilde            | Hensikt                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installerer deps (`npm ci --legacy-peer-deps`) og kjører `npm run build` (Turbopack som standard — se Byggetidsressurser nedenfor)                                                                                                                                                                       |
| `runner-base` | `node:26-trixie-slim` | Produksjonstid med Next.js frittstående utgang.** Ingen leverandør CLIs medfølger.**                                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Legger til `git`, `docker.io`, `docker-compose` og global CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`.** Velg dette for agentiske arbeidsflyter.**                                                                                                                           |
| `runner-web`  | `runner-base`         | Legger til Playwright + en Chromium-nettleser (`--with-deps`) for nettøktleverandører: `gemini-web`, `claude-web`, `claude-turnstile`.** Velg dette når du bruker disse leverandørene** — det vanlige bildet mislykkes på forespørselstidspunktet uten det (se `-web` -notatet under Utgivelseskanaler). |

Bygg et spesifikt mål manuelt:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Byggetidsressurser

Tre byggearg styrer hva `builder` scenen koster. De er kun i byggetid — `OMNIROUTE_MEMORY_MB` (nedenfor) er en separat kjøretidsknapp.

| Bygg arg                    | Misligholde | Effekt                                                                            |
| --------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`         | `0` bygger med webpack: lavere toppminne, tregere. `1` velger Turbopack.          |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`      | V8 heap-tak (`--max-old-space-size`) for den avlede `next build`.                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`         | Mater `CIRCLE_NODE_TOTAL`; Next utleder `workers = N - 1` for sidedatainnsamling. |

`OMNIROUTE_BUILD_WORKERS` er den som hever på en stor byggmester og den som mistenker når en begrenset bygning dør** etter** `✓ Compiled successfully`. Hver sidedataarbeider er sin egen prosess, og det samme er den overordnede `next build` selv; en live VPS -reproduksjon (issue #7518) målte hver prosess topp RSS ved ~ 4,5 GB uavhengig av `NODE_OPTIONS` heap-flagget (Turbopack kompilerer i native/Rust -minne utenfor V8-heapen). Standarden for `2` (→ 1 arbeider, 2 prosesser totalt) er dimensjonert for de 16 GB / 4 vCPU GitHub-vertsløperne som publiseringspipelinen bruker. Ved `8` (→ 7 arbeidere) gikk den løperen tom for minne og buildkit mislyktes i trinnet med `ResourceExhausted: ... cannot allocate memory`; `3` (→ 2 arbeidere) passet fortsatt ikke når RSS per prosess ble målt direkte i stedet for utledet. `tests/unit/docker-build-memory-budget.test.ts` regner med den målte figuren og mislykkes hvis en av knappene vokser ut av løperen.

Turbopack kompilerer i innfødt Rust-minne som lever** utenfor** V8-haugen, så `OMNIROUTE_BUILD_MEMORY_MB` binder den ikke. På en vert med et minnetak blir bygningen da SIGKILLed av OOM killer uten noen feiltekst i det hele tatt — den stopper rett og slett midt i `Creating an optimized production build`, som leses som en henging i stedet for et tomt minne. Det er grunnen til at `Dockerfile` er standard til webpack (`OMNIROUTE_USE_TURBOPACK=0`), i motsetning til `npm run dev` / `npm run build`, der Turbopack er kodestandarden: en bare `docker build .` uten build-arg (det Railway og andre ett-klikks-verter kjører) må ikke dø stille på en minnebegrenset bygger. De publiserte bildene passerer allerede `OMNIROUTE_USE_TURBOPACK=0` eksplisitt i `docker-publish.yml`. På en byggherre med mye RAM, velg Turbopack for en raskere build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` er aktivert, så `next build` kjører en forelder** og** en arbeidsprosess og hver hedrer `OMNIROUTE_BUILD_MEMORY_MB` separat. Større beholderens tak over omtrent det dobbelte av verdien, ikke en gang.

Målt på dette treet (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container tak  | Resultat                          |
| --------- | -------------- | --------------------------------- |
| Turbopack | 8 GiB / 16 GiB | OOM-drept på begge, stille        |
| nettpakke | 8 GiB          | bygge arbeider SIGKILLed          |
| nettpakke | 12 GiB         | lyktes, nådde en topp på 11,1 GiB |

### Kjøretidsstandarder

Standarder eksportert av `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Minneadferd i Docker:

- Bildet setter `OMNIROUTE_MEMORY_MB=1024` og henter `NODE_OPTIONS=--max-old-space-size=1024` fra det.
- Selve serverprosessen startes av den frittstående lanseringen, som leser `OMNIROUTE_MEMORY_MB` og legger til `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node bruker den siste gjentatte `--max-old-space-size` verdien, så innstillingen av `OMNIROUTE_MEMORY_MB` kontrollerer den effektive Docker heap-grensen.
- Fordi bildet alltid setter det, gjelder aldri launcherens egen RAM-kalibrerte fallback under Docker. Øk den eksplisitt for arbeidsbelastningen (tabell nedenfor). `2048` er fortsatt for liten for kodingsagent `/v1/responses`.

### Runtime RAM for kodingsagenter

Standarden på 1 GiB Docker er et dashboard/light-chat gulv, ikke en produksjonsstørrelse. Lange `POST /v1/responses` kropper (hundrevis av meldinger, titalls verktøy) beholder flere grafer i minnet under komprimering. To overlappende ~ 3 MiB / ~ 750k-token-forespørsler har avbrutt V8 på en** 12 GiB** old-space (`FATAL ERROR: Reached heap limit`) og traff også en 16 GiB cgroup OOM. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Størrelse** cgroup `--memory` over haugen** — native buffere, SQLite og kompresjonsmellomprodukter sitter utenfor V8.

| Arbeidsmengde                      | `OMNIROUTE_MEMORY_MB`  | Beholder / cgruppe    | Notater                                                                            |
| ---------------------------------- | ---------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| Dashboard, en lett chat            | `1024` (bildestandard) | ≥2 GiB                |                                                                                    |
| Én kodeagent (Claude/Codex/Grok)   | `8192`                 | ≥10 GiB               | Typisk enkelt-økt `/v1/responses`                                                  |
| To samtidige lange `/v1/responses` | `10240`–`12288`        | ≥12–16 GiB            | Målt V8 avbryter ved ~ 12 GiB haug                                                 |
| Tre + samtidige lange sammenhenger | ikke på én prosess     | serialisere / mer RAM | Standard tungvektopptak er 1 under flyging; heve den uten RAM gjeninnfører aborten |

`omniroute serve` på bart metall kalibrerer ~ 35 % av RAM (klemt `[512, 4096]`) når `OMNIROUTE_MEMORY_MB` er** deaktivert** . Docker setter alltid `1024`, slik at kalibrering aldri kjører i det offisielle bildet.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data cheaperinference/omniroute:latest
```

## Kritiske miljøvariabler

I tillegg til standardverdiene som er dokumentert i [ENVIRONMENT.md](../reference/ENVIRONMENT.md), er følgende variabler viktigst ved kjøring under Docker:

| Variabel                      | Formål                                                                                                                                                                                                                                                                             | Standardverdi           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Delt hemmelighet for WebSocket-broen. **Påkrevd i produksjon** — angi en sterk, tilfeldig streng.                                                                                                                                                                                  | ikke angitt (må oppgis) |
| `REDIS_URL`                   | Tilkoblingsstreng for hastighetsbegrenseren / hurtigbufferens bakserver                                                                                                                                                                                                            | `redis://redis:6379`    |
| `REDIS_PORT`                  | Port på vertsmaskinen for den medfølgende Redis-containeren                                                                                                                                                                                                                        | `6379`                  |
| `REDIS_BIND_HOST`             | Vertsgrensesnittet som porten til den medfølgende Redis-containeren publiseres på (tilbakekoblingsgrensesnittet med mindre du legger til AUTH)                                                                                                                                     | `127.0.0.1`             |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Vertsbane som monteres i `cli`-profilen på `/workspace/omniroute` for arbeidsflyter med selvoppdatering                                                                                                                                                                            | `.` (gjeldende mappe)   |
| `OMNIROUTE_MEMORY_MB`         | Øvre grense for Node-heapen under kjøring for den frittstående Docker-serveren; overstyrer standardverdien for avbildningen ovenfor. Kodeagenter: `8192`+ (se [RAM under kjøring](#runtime-ram-for-coding-agents)).                                                                | `1024`                  |
| `DASHBOARD_PORT` / `API_PORT` | Overstyr eksponerte porter for kontrollpanelet (20128) og API-et (20129)                                                                                                                                                                                                           | `20128` / `20129`       |
| `APP_BIND_HOST`               | Vertsgrensesnittet som docker-compose publiserer portene for kontrollpanelet/API-et/live-WS på. Med `REQUIRE_API_KEY=false` (standardverdien) eksponerer `0.0.0.0` den anonyme `/v1`-proxyen til lokalnettet — utvid bare med `REQUIRE_API_KEY=true` eller en omvendt proxy foran. | `127.0.0.1`             |
| `CLIPROXY_BIND_HOST`          | Vertsgrensesnittet som docker-compose publiserer `cliproxyapi`-sidevognen på — datavolumet inneholder leverandørlegitimasjon.                                                                                                                                                      | `127.0.0.1`             |
| `OMNIROUTE_PLUGINS_DIR`       | Mappen som programtilleggsskanneren leser fra og installerer i under kjøring. Angi den når programtillegg bind-monteres: Standardverdien følger `HOME`, som en avbildning ikke nødvendigvis eksporterer.                                                                           | `~/.omniroute/plugins`  |
| `OMNIROUTE_BASE_PATH`         | URL-underbane når appen publiseres bak en omvendt proxy (f.eks. `/omniroute`)                                                                                                                                                                                                      | _(tom = rot)_           |
| `NEXT_PUBLIC_BASE_URL`        | Offentlig nettleseropprinnelse inkludert underbanen (f.eks. `https://host/omniroute`)                                                                                                                                                                                              | ikke angitt             |
| `PROD_DASHBOARD_PORT`         | Kontrollpanelport på vertsmaskinen for `docker-compose.prod.yml`                                                                                                                                                                                                                   | `20130`                 |
| `CLIPROXYAPI_PORT`            | Port på vertsmaskinen for `cliproxyapi`-sidevognen                                                                                                                                                                                                                                 | `8317`                  |

## Omvendt proxy på en underbane (Traefik / nginx)

Next.js `basePath` er kompilert i den frittstående pakken. OmniRoute registrerer den bakte verdien i en sentinel-fil ved approten (skrevet under `npm run build`; lest av `scripts/docker/ensure-docker-base-path.mjs`) og sammenligner den med `OMNIROUTE_BASE_PATH` når beholderen starter. Når de er forskjellige og bildet ble bygget for domeneroten, omskriver inngangspunktet de frittstående manifestene, de innebygde `basePath`/`assetPrefix` -literalene (Next 16 gjengir SSR asset URLs fra `assetPrefix` alene — patcheren speiler underbanen inn i den), den bakde `/_next/static` aktivaen-en URLs -manifester, preference, media-import-siden, preference og gjengir feilen. klient `process.env` shim før `node dev/run-standalone.mjs` kjører.

### Skriv bygg (anbefalt)

Sett begge variablene i `.env`, og bygg deretter opp igjen slik at bildet og kjøretiden stemmer overens:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` videresender `OMNIROUTE_BASE_PATH` som en Docker build-arg og som en kjøretidsmiljøvariabel.

### Forhåndsbygd rotbilde + runtime underbane

Publiserte `cheaperinference/omniroute:*` -bilder er bygget for domeneroten. Du kan fortsatt stille inn `OMNIROUTE_BASE_PATH` under kjøretid; beholderen lapper pakken én gang ved oppstart. Par den med den samsvarende offentlige opprinnelsen:

```yaml
services:
  omniroute:
    image: cheaperinference/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurer omvendt proxy for å videresende** full** ekstern bane (ikke fjern prefikset). Traefik bør rute `PathPrefix(`/omniroute `)` til containeren uten `StripPrefix`, så Next.js mottar `/omniroute/...` og betjener eiendeler fra `/omniroute/_next/...`.

Docker -helsesjekken sonderer det lette `/healthz` livssyklusendepunktet med prefiks med den aktive `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` forblir tilgjengelig for human/dashboard -diagnostikk; for å peke beholderen HEALTHCHECK tilbake mot den (for eksempel for dyp helsehåndhevelse), sett `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Den veien er en** dyp** sjekk (DB + overvåkingssammendrag) — passende for Docker sjeldne `HEALTHCHECK` hvis du melder deg på igjen, men** ikke** for Kubernetes `livenessProbe` intervaller.

For orkestratorer (Kubernetes, Nomad, etc.):

| Probe           | Foretrekker                                                            | Unngå                                                    |
| --------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| Livlighet       | HTTP `GET /livez`, eller TCP på hovedporten (`PORT`, standard `20128`) | `/api/monitoring/health` som livlighet                   |
| Beredskap       | HTTP `GET /healthz`                                                    | Trange timeouts som behandler event-loop opptatt som død |
| Deep / blackbox | `/api/monitoring/health`                                               | —                                                        |

`/healthz` rapporterer prosesslivssyklus (`ok` / `starting` / `stopping`). `/livez` er kun prosesslevende (200 når behandleren kan kjøre; den venter ikke på beredskap). Begge kjører fortsatt på samme Node-hendelsesløkke som forespørselshåndtering, så CPU-bundet katalog eller komprimeringsarbeid kan forsinke dem — opptatt ≠ døde. Foretrekk TCP liveness hvis HTTP sonderne tar timeout. Full sondeveiledning: [Overvåkingsveiledning — Kubernetes sondeanbefalinger](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute kan eksponeres sikkert ved hjelp av Caddys automatiske SSL klargjøring. Sørg for at domenets DNS A-post peker til serverens IP.

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

Caddy angir standard videresendingshoder for oppstrøms container. OmniRoute bruker `NEXT_PUBLIC_BASE_URL` som den kanoniske offentlige opprinnelsen for OAuth tilbakeringing og genererte offentlige lenker; autentiserte dashbordskriver bruker forespørsler med samme opprinnelse pluss øktbundet CSRF beskyttelse. Aktiver bare `OMNIROUTE_TRUST_PROXY` for avanserte distribusjoner der du med vilje vil at OmniRoute skal utlede den offentlige opprinnelsen fra klarerte videresendte overskrifter i stedet for eksplisitt konfigurasjon.

## Cloudflare Quick Tunnel

Kontrollpanelstøtte for Docker-distribusjoner inkluderer en **Cloudflare Quick Tunnel** med ett klikk under `Dashboard → Endpoints`. Første aktivering laster bare ned `cloudflared` ved behov, starter en midlertidig tunnel til ditt gjeldende `/v1`-endepunkt og viser den genererte `https://*.trycloudflare.com/v1`-URL-en rett under den vanlige offentlige URL-en.

Tunnelpaneler for endepunkter (Cloudflare, Tailscale, ngrok) kan vises eller skjules fra `Settings → Appearance` uten å endre den aktive tunneltilstanden.

### Merknader om tunneler

- Quick Tunnel-URL-er er midlertidige og endres etter hver omstart.
- Quick Tunnels gjenopprettes ikke automatisk etter omstart av OmniRoute eller beholderen. Aktiver dem på nytt fra kontrollpanelet ved behov.
- Administrert installasjon støtter for øyeblikket Linux, macOS og Windows på `x64` / `arm64`.
- Administrerte Quick Tunnels bruker som standard HTTP/2-transport for å unngå støyende advarsler om QUIC UDP-buffere i begrensede beholdermiljøer. Angi `CLOUDFLARED_PROTOCOL=quic` eller `auto` hvis du ønsker en annen transport.
- Docker-avbildninger inkluderer systemets CA-røtter og sender dem videre til administrerte `cloudflared`, noe som forhindrer TLS-klareringsfeil når tunnelen startes opp i beholderen.
- Angi `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` hvis du vil at OmniRoute skal bruke en eksisterende binærfil i stedet for å laste ned en.

## Bilde-tagger

| Bilde                        | Tag      | Størrelse | Beskrivelse                                          |
| ---------------------------- | -------- | --------- | ---------------------------------------------------- |
| `cheaperinference/omniroute` | `latest` | ~ 250 MB  | Høyest** publisert** stabil SemVer (ikke git `main`) |
| `cheaperinference/omniroute` | `3.8.54` | ~ 250 MB  | Fest denne klassen med tag for GitOps                |

De samme bildene er publisert til tre depoter, med samme per-arkitektur-sammendrag: `cheaperinference/omniroute` (Docker Hub, Cheaper Inference-organisasjonen, fra 3.8.53), `ghcr.io/cheaper-inference/omniroute` og den eldre `diegosouzapw/omniroute`, som beholder sin pull-historie og fortsatt mottar hver utgivelse. Eksisterende `diegosouzapw/omniroute` distribusjoner fortsett å oppdateres; bytte bildenavn er valgfritt. `:next` / `:next-web` forhåndsutgivelseskanalen nedenfor publiseres kun til `diegosouzapw/omniroute` og GHCR.

Multi-plattform manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker velger den matchende arkitekturen automatisk; pass `--platform linux/amd64` hvis du trenger å tvinge AMD64 emulering på ARM verter.

### Slipp kanaler

OmniRoute publiserer separate Docker kanaler for stabile utgivelser, aktiv utgivelsesgrentesting og utviklingsbygg.

| Kanal                           | Kilde                                | Foranderlighet          | Anbefalt bruk                                                                                                                  |
| ------------------------------- | ------------------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Signed/versioned utgivelse           | Uforanderlig            | Produksjonsdistribusjoner som fester en nøyaktig utgivelse                                                                     |
| `:latest` / `:latest-web`       | Høyest** publisert** stabil SemVer   | Mulig stabil peker      | Følger stabile utgivelser** etter** en SemVer publiseringsjobb gjør —** ikke** spor `main` eller uutgitte `release/v*` commits |
| `:next` / `:next-web`           | Gjeldende standard `release/v*` gren | Mulig pre-release-peker | Tester rettelser som har landet på den aktive utgivelsesgrenen, men som ennå ikke er i en stabil utgivelse                     |
| `:main` / `:main-web`           | `main` gren                          | Mulig utviklingspeker   | Kun utviklings- og integrasjonstesting                                                                                         |

#### Leverandører av nettøkter: `-web` bildene

Hver kanal ovenfor fungerer som en `-web` tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), bygget fra `runner-web` stadiet — det samme bildet pluss Playwright og en Chromium-nettleser. Det enkle bildet sendes** uten** krom; `gemini-web`, `claude-web` og `claude-turnstile` trenger det.

Feilen er utsatt, ikke oppstartstid: disse leverandørene viser modellene sine og vises som tilkoblet i dashbordet, og bare den første forespørselen mislykkes med

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Hvis du bruker disse leverandørene, trekk `-web` taggen til kanalen du allerede er på — ingenting annet endres. På en npm/CLI installasjon (ingen Docker bilde), er den tilsvarende manglende delen nettleserens binære: kjør `npx playwright install chromium` på verten.

#### Bruker forhåndsutgivelseskanalen

`next` kanalen bygges om ved hvert trykk til gjeldende standard `release/v*` gren og publiseres for både AMD64 og ARM64. Eldre vedlikeholdsgrener kan ikke overskrive den. Kanalen gir et trekkbart bilde for rettelser som har slått seg sammen i den aktive utgivelsesgrenen før neste stabile tag kuttes.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

For Docker Compose, overstyr bildekoden som brukes av den valgte profilen, trekk og gjenopprett tjenesten:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sikkerhet og tilbakerulling

`next` er en flytende pre-release-kanal. Den kan endres ved ethvert trykk til den aktive utgivelsesgrenen og er** støttes ikke for produksjonsbruk** . Fest bildesammendraget mens du evaluerer et spesifikt bygg:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Før du tester, sikkerhetskopierer du OmniRoute datavolumet eller bindingsmontert datakatalog. For å rulle tilbake, gjenopprett den tidligere brukte stabile versjonen eller fordøy og gjenskap beholderen:

```bash
docker pull cheaperinference/omniroute:<stable-version>
docker compose up -d
```

En utgivelsesgren kan aldri flytte `latest`; bare en kvalifisert stabil semantisk versjon kan fremme den stabile pekeren. The `next` images retain the release image inspection and blocking CRITICAL-vulnerability gate.

**`latest` is not a currency guarantee for git.** Sammenslåtte rettelser på `main` eller på den aktive `release/v*` -grenen er** ikke** i `:latest` til et stabilt SemVer bilde er publisert og publiseringsjobben fremmer `:latest` (samme sammendrag som den SemVer). Hvis `latest` ser frosset ut mens GitHub allerede viser rettelsen, trekk `:next` for å teste utgivelsesgrenen eller vent på SemVer taggen.

| Du vil                                                            | Bruk                                   |
| ----------------------------------------------------------------- | -------------------------------------- |
| GitOps / produksjon som ikke må drive                             | Pin `:X.Y.Z` (eller bildesammendraget) |
| Følg publiserte staller og godta en gjenskaping på hver utgivelse | `:latest`                              |
| Test uutgitte `release/v*` -forpliktelser                         | `:next` (ikke produksjon)              |
| Test `main`                                                       | `:main` (ikke produksjon)              |

## Dashboardoppdateringer i Docker

En container fra et publisert image kan ikke erstatte seg selv. Når OmniRoute oppdager at den kjører i en
container (ingen `.git`-utsjekking, ikke en npm-installasjon), viser oppdateringsbanneret på hoveddashboardet
vertskommandoen som skal kjøres i stedet for npm/git-instruksjonene, med en kopieringsknapp:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Tjenestenavnet kommer fra `AUTO_UPDATE_SERVICE` (standardverdien er `omniroute`, tjenesten i
`docker-compose.selfhost.yml`). `pull` flytter bare en flytende tagg (`latest`, `next`); med en fastlåst
`:X.Y.Z`-tagg må du redigere taggen først.

### Oppdateringer med ett klikk ved hjelp av en utløserfil på verten

For å beholde funksjonaliteten til **Oppdater nå** uten å montere `/var/run/docker.sock` (som gir containeren
root-tilgang på verten – se advarselen for `cli`-profilen ovenfor), angir du `DOCKER_UPDATE_TRIGGER_FILE` for
OmniRoute-tjenesten og kjører en overvåker på verten:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Banen må være innenfor `DATA_DIR` (relative verdier løses i forhold til den); alt annet
avvises. **Oppdater nå** skriver deretter `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` til denne
filen, svarer med `202`, og dashboardet spør `/api/system/version` regelmessig frem til den nye versjonen er aktiv,
og laster deretter inn på nytt. OmniRoute kjører aldri en shell- eller Docker-kommando i denne modusen. Som for alle
oppdateringshandlinger godtas forespørselen bare fra loopback-/LAN-klienter.

En bind-montert datakatalog gir verten en stabil bane å overvåke. Eksempler på `systemd`-enheter
(tilpass `/srv/omniroute` til katalogen som inneholder compose-filen og `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Overvåk oppdateringsforespørsler fra OmniRoute-dashboardet

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Hent og opprett OmniRoute-containeren på nytt

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

Tjenesten fjerner forespørselen før hentingen, slik at en mislykket kjøring ikke havner i en løkke. Uten
`DOCKER_UPDATE_TRIGGER_FILE` beholder dashboardet den manuelle kommandoflyten.

## Tilgjengelighet: standard SQLite er enkeltreplika

Aksje Docker / Kubernetes OmniRoute er** én nodeprosess + én SQLite skriver** . Høy tilgjengelighet er** støttes ikke** på den topologien.

| Begrensning                              | Konsekvens                                                                                                                                                                                                                                                                                         |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enslig forfatter                         | Gjøre** ikke** kjør flere replikaer mot samme SQLite fil. Det ødelegger DB.                                                                                                                                                                                                                        |
| Gjenopprett / restart / HEALTHCHECK kill | **Full avbrudd** av SSE under fly, dashbordøkter og minnetilstand. Hver tilkoblet klient faller. Nye forespørsler under det tomme endepunktvinduet får en omvendt proxy**`502 Bad Gateway: Unknown error`** , ikke OmniRoute JSON — klienter kan ikke skille dette fra en leverandørfeil (#11015). |
| Samme hendelsesløkke som `/healthz`      | En opptatt katalog eller komprimeringshake kan forsinke sonder; en kort timeout starter deretter på nytt** bare** replika.                                                                                                                                                                         |

**Probe matrise** (se også [Kubernetes sondeanbefalinger](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Probe           | Mål                                                         | Ikke bruk                                                |
| --------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| Livlighet       | TCP på `PORT` (standard `20128`), eller myk HTTP `/healthz` | `/api/monitoring/health`                                 |
| Beredskap       | HTTP `GET /healthz`                                         | Trange timeouts som behandler event-loop opptatt som død |
| Dyp / mennesker | `/api/monitoring/health`                                    | Automatisert kubelet-livlighet                           |

**Oppgraderinger:** forvent at hver økt faller. Drener klienter hvis du kan; det er ingen rullende oppdatering på standard SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` vil også erstatte den eneste prosessen når beholderen er Usunn — samme eksplosjonsradius.

Ferdige manifester og et Helm-diagram live i `deploy/kubernetes/` og `deploy/helm/omniroute/` – se [Kubernetes-implementeringsveiledningen](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes-snutt for en** enkelt replika** (Gjenoppretting er nødvendig; ikke hev `replicas` mot én SQLite -fil):

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

`preStop` sleep lar kube slippe tjenesteendepunkter før SIGTERM so** ny** trafikken slutter å ramme den døende prosessen. In-flight `/v1/responses` SSE tappes opp til `SHUTDOWN_TIMEOUT_MS` (standard 30s) via tungvekts adgangsleieavtaler (#11015). Nye forespørsler som fortsatt når prosessen får `503` + `Retry-After: 5`. Gjenopprett tom-endepunktgapet til erstatningen er klar forblir et hardt avbrudd – det vil si SQLite topologien, ikke en feilkonfigurasjon av sonden.

Ekstern Postgres / multi-writer HA er** ikke** en dokumentert lagerbane. Hvis du trenger HA, behold en enkelt replika eller kjør en topologi prosjektet har testet og dokumentert separat. Postgres/MySQL -verket bor i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Inntil det sendes, den eneste støttede måten å formere seg på** stor** `/v1/responses` kapasiteten er N uavhengige prosesser (neste seksjon), ikke `replicas > 1` på ett volum.

## Utskalering: N uavhengige prosesser

### Codex token rotasjon eierskap

Kopier av én Codex -konto må ikke uavhengig konsumere dens engangsoppdateringstoken. På forekomster som bare bruker synkronisert legitimasjon, sett `OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS=codex` (alias `cx`). La den være uaktivert på eieren av enkeltrotasjonen. Hver prosess trenger fortsatt sin egen `DATA_DIR`; dette alternativet deler verken SQLite eller leverer token-synkronisering eller en distribuert lås.

Den passive forekomsten leser tilkoblingen på nytt når en oppdatering er nødvendig og bruker bare et annet, uutløpt tilgangstoken. Ellers deaktiveres oppdateringen uten å utløpe eller deaktivere tilkoblingen eller telle en oppdateringsbryterfeil. Ekte oppstrøms autentiseringsfeil bruker fortsatt normal feilregnskap, eksponentiell nedkjøling og den normale klientfeilen; kontodeaktivering forblir permanent. Synkroniser eierens roterte tokens før tilgangstokener utløper (standard proaktiv oppdateringsledd er fem minutter), eller importer Codex auth-filen på nytt. Passiv import lagrer de leverte tokenene uten å validere dem ved token-endepunktet. Manuell dashboard/API -oppdatering returnerer `409 refresh_disabled`; nye OAuth pålogginger er uendret. Se [miljøreferanse](../reference/ENVIRONMENT.md#passive-codex-token-refresh).

En nodeprosess er** én V8-haug** . To overlappende ~ 3 MiB / ~ 750k-token coding-agent `POST /v1/responses` (RTK + Caveman) avbryter den haugen ved ~ 12 Gi (`FATAL ERROR: Reached heap limit`) og kan OOM en 16 Gi cgruppe. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Den målingen er en** minne-budsjett** advarsel, ikke et produkt hard-max på to samtidige lange `/v1/responses`. Heavyweight chat-adgang er lukket av et auto-derivert ingest byte-budsjett (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) størrelse fra det samme V8/cgroup -taket — overstyrer det oppover (eller setter den eldre `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) på en prosess av allerede størrelse, gjeninnfører avbruddet. Små chatter, `/healthz`, `/v1/models` og MCP er** ikke** i den hatten.

### En-prosess: mer enn to lange `/v1/responses`

EN** sunn** prosess (heap under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standard `0.75`)** mai** kjøre mer enn to samtidige lange `POST /v1/responses` når det prosessomfattende bytebudsjettet (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) fortsatt har plass. Organer på eller over `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standard 256 KiB) tar den samme tungvektsleieavtalen som strukturtunge forespørsler og bruker den samme [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Titalls samtidige lange SSE klienter (operatører trenger ofte 40–50) er en** minne-budsjett** spørsmål — størrelse haug + primary/headroom spor + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ikke en hard "maks 2" produktgrense. En presset haug faller fortsatt med `503` som kan prøves på nytt, så #7849 kommer ikke tilbake.

Til** multiplisere hauger** (uavhengige V8 old-spaces)** i dag** :

| Gjøre                                                                                                                                     | Ikke gjør det                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Løp** N containers/pods** , hver med sin** egen** `DATA_DIR` / volum                                                                      | Sett `replicas > 1` mot én SQLite -fil                        |
| Størrelse på tung + sunn-headroom fra haug / inflight-byte-budsjett; 1–2 er den konservative #7849-standarden, ikke et hardt produkt maks | Gi en prosess 8 × RAM og en ubegrenset tellegrense            |
| Valgfritt: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for** delte kvotetellere**                                                | Behandle Redis som delt SQLite — er det ikke                  |
| Dupliser leverandørhemmeligheter i hver forekomst (eller godta partisjonerte dashboards)                                                  | Forvent ett dashbord / en samtalelogg på tvers av forekomster |
| Foran med hvilken som helst lastbalanser; sticky av API -tasten eller økten er nok                                                        | Krev en leverandørspesifikk størrelsesbevisst mellomvare      |

Økt-til-konto-tilknytning kan også deles gjennom Redis: sett `OMNIROUTE_SESSION_AFFINITY_STORE=redis` og `REDIS_URL` på hver prosess, med samme `REDIS_KEY_PREFIX` og en positiv `sessionAffinityTtlMs` innstilling. Pins løser hashet av brukskontoidentiteter til hver prosess kvalifiserte lokale tilkobling, så OAuth kontoer med samsvarende identitetsmetadata trenger ikke ha samsvarende tilkobling IDs. Kjente kontoidentiteter har forrang over motstridende lokale IDs i pin-oppløsning og bevoktet utkastelse; poster uten identitet (eller utkastelse som ringer uten identitet) beholder den gamle ID vakten. Kontoer uten en stabil bruksidentitet krever fortsatt samsvarende IDs. Redis feil eller anrop som overstiger 100 ms faller tilbake til lokale SQLite. Hver Redis -affinitetsbutikk begrenser utestående operasjoner til 8, omgår Redis umiddelbart når den er full, og frigjør spor kun når det underliggende arbeidet ordner seg, ikke ved anropers frist. Under et Redis -brudd er det ingen delt sannhet: hver forekomst faller tilbake til sin egen lokale tilhørighet, økter kan feste på nytt én gang per forekomst, og forekomster kan avvike. Stickiness re-konvergerer gjennom Redis når den kommer seg. Tidsavbruddsgrensene venter, ikke en sendt EVAL, som kan lande etter fallback. Rutingskrivinger sammenligner den eksakte verdien observert av rutingbeslutningen, ikke en ny mutasjonstidsavlesning; en observert glipp eller en SQLite reserveobservasjon sammenlignes med en fraværende Redis nøkkel. Utdaterte pinner erstattes i en CAS, så en sen kommando kan ikke erstatte eller slette en nyere, annen pin. Redis leser atomisk returnerer verdien og gjenværende server TTL; positiv PTTL (eller ingen utløp) bestemmer livlighet, ikke forfatterens JSON tidsstempel eller leserens klokke. Lokale øyeblikksbilder kartlegger gjenværende TTL til en lokal tidsfrist; eksisterende JSON nøkler forblir lesbare og deres råbyte beholdes for CAS. Redis er den eneste kilden til sannhet mens den svarer. Bekreftede delte opphevinger, berøringer og slettinger fjerner den lokale oppføringen, installer eller oppdater den aldri. SQLite på Redis banen inneholder kun denne instansens egne fallback-avgjørelser fra Redis feil, tidsavbrudd eller opptaksmetning, TTL-begrenset som før. En manglende lokal pin ved et senere strømbrudd koster ett nytt valg (en prompt-cache-miss), ikke en feil eller kastet konto. Avviste upserts returnerer den delte vinneren og dens gjenværende TTL atomisk: ordinært utvalg kontrollerer den kartlagte lokale fristen på nytt og bruker en fortsatt levende kvalifisert vinner, berører bruk og logging for den kontoen uten en annen delt skriving. Hvis den ikke er tilgjengelig, beholder valget den lokale kandidaten, lar den delte pinnen være uendret og sender ut én feilsøkingsmelding. Avvist CAS skriver ikke SQLite; Redis feil, tidsavbrudd eller opptaksmetning bruker den eksisterende lokale operasjonen i stedet. Hvis svaret til en sendt mutasjon kommer etter tidsavbrudd (akseptert, avvist eller feil), fjerner en synkron eksakt serialisert verdi sammenligne-og-slett bare den byte-identiske timeout-reserveraden. Det er ingen ventetid mellom den sammenligningen og slettingen; en nyere utfallsskriv er bevart. Bevoktet utkastelse fjerner den mislykkede kontoens egen lokale pin selv med Redis nede, og renser den igjen etter bekreftet delt utkastelse. Ventende tidligere delte svar kan ikke gjenopprette en utkastet lokal pin fordi delte suksesser aldri skriver SQLite. Et senere fallback-avbrudd kan gjenopprette en konto; en senere akseptert delt skriving finnes bare i Redis. Redis misser konsulterer ikke lokal reservestat. Med driveren av, beholder nyvalgte pinner den eldre firefelts SQLite JSON formen; bare Redis -ruting legger til hashed kontoidentitet. Forhåndshentede pinner kontrolleres på nytt ved utløpsgrensen. Redis non-lease utvalg leser butikken på nytt, men synkron leieplanlegging kan fortsatt bruke en pinne som blir kastet ut mellom forhåndshenting og planlegging (et akseptert beste-innsatsvindu). En leieavtale kan ikke bytte konto etter et varig krav: ved avvist oppsving beholder den den påståtte kandidaten kun for den forespørselen og lar den delte vinneren være urørt, så enighet på tvers av forekomster er begrenset på den banen. Resten av tabellen gjelder fortsatt: dette deler ikke combo-økt-klistrethet, native Codex turn-pins, kontosemaforer, lockouts, forbruksgrenser, konfigurasjon eller anropslogger.

Maskinvare: per instans samtidig lang `/v1/responses` er en** minne-budsjett** spørsmål (heap + inflight-byte / #10110). `N` uavhengige `DATA_DIR` er multipliserer fortsatt hauger: vert RAM må dekke `N × cgroup`, ikke "én 16 Gi pod med N = 8." Aldri `replicas > 1` på én SQLite fil.

Komponer skisse (to hauger, to bind — ikke `deploy.replicas: 2`):

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

Prosesstetthet (komprimering av HTTP isolatet) er [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). En logisk klynge i delt holdbar tilstand er [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionale Gemini-feil i Docker

Google AI Studio / Gemini API kan returnere HTTP 400 med FAILED_PRECONDITION og
`User location is not supported for the API use.` En vellykket forespørsel på verten
beviser ikke at containeren bruker samme utgående rute. DNS-rekkefølge,
IPv4/IPv6-tilkobling, VPN-ruting og konfigurerte proxyer kan variere. Sjekk
[Googles støttede regioner](https://ai.google.dev/gemini-api/docs/available-regions)
samt den faktiske tilkoblingsruten. Denne feilen alene betyr ikke at API-nøkkelen er ugyldig.

### Foretrekk en tilkoblingsspesifikk proxy

Bruk OmniRoutes [proxykonfigurasjon per tilkobling](../ops/PROXY_GUIDE.md#4-level-proxy-system)
for den berørte Gemini-tilkoblingen, og gjenta deretter **Test tilkobling** og en liten forespørsel
med samme modell. Dette begrenser rutingsendringen til den aktuelle tilkoblingen. Kontroller
at proxyen kan nås fra containeren, og at tilkoblingen faktisk velger
den. En endring av ruten garanterer ikke regional godkjenning hos oppstrømstjenesten.

### Sammenlign nettverket på verten og i containeren

Bruk identisk nøkkel, modell og forespørsel når du sammenligner autentiserte resultater. Lim aldri
inn påloggingsopplysninger, proxypassord eller fullstendige autorisasjonshoder i en sak.
Undersøk først hvilke adressefamilier operativsystemets resolver tilbyr, ved å bruke samme kommando
på verten og inne i containeren:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Erstatt `omniroute` med tjenesten du kjører (for eksempel `omniroute-web`). Disse
kommandoene skriver ut adressefamilier uten påloggingsopplysninger eller IP-adresser. En returnert `6`
viser bare et IPv6-DNS-resultat: Det beviser **ikke** at en fungerende IPv6-rute eller API-tilgang finnes.
Der `curl` er installert, sammenligner du `curl -4 -I https://generativelanguage.googleapis.com`
med `curl -6 -I https://generativelanguage.googleapis.com` i begge miljøene.
Et HTTP-svar beviser tilkobling for denne testen, selv om det er en uautentisert
feil. Bare den autentiserte modellforespørselen tester om Gemini kan brukes.

### Alternativ på vertsnivå: fungerende IPv6 og resolverpolicy

Rapportøren av [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) gjenopprettet
tilgangen i sitt miljø ved å aktivere IPv6 for containere og endre adressevalget i glibc.
Behandle dette som et miljøspesifikt alternativ. Bekreft at IPv6 fungerer på verten,
at utgående trafikk og ruting fungerer for containeren, og at brannmurreglene er riktige før du justerer resolverinnstillingene.
En privat ULA-adresse alene etablerer ikke offentlig IPv6-tilkobling.

For tjenester som allerede er koblet til standardnettverket i Compose, aktiverer dette fragmentet
IPv6 på det nettverket. Behold resten av tjeneste-, port-, volum- og konfigurasjonsoppsettet:

```yaml
networks:
  default:
    enable_ipv6: true
```

For et navngitt nettverk aktiverer du det på nettverket som tjenesten faktisk bruker. Docker kan
tildele et ULA-delnett. Velg bare et eksplisitt, ikke-overlappende delnett når nettverket
krever det. Se [IPv6-nettverk i Docker](https://docs.docker.com/engine/daemon/ipv6/)
og [nettverksalternativer i Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

På et **glibc-basert image** kan `/etc/gai.conf` endre adressevalget. Gjeldende
Dockerfile i repositoriet bruker Debian. Egendefinerte musl-baserte images bruker ikke denne mekanismen.
Den rapporterte justeringen endrer ULA-etiketten fra `label fc00::/7 6` til
`label fc00::/7 1`. Ta utgangspunkt i den fullstendige policytabellen i imaget, og behold de øvrige
oppføringene. Hvis du legger til en `label`- eller `precedence`-oppføring, erstattes standardtabellen, så en fil
som bare inneholder den endrede linjen, er utilstrekkelig.
[glibc-konfigurasjonsreferansen](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumenterer denne virkemåten. Bind-monter den gjennomgåtte filen skrivebeskyttet på `/etc/gai.conf`,
og opprett tjenesten på nytt for å ta endringen i bruk.

Dette endrer operativsystemets adressevalg for **all utgående trafikk i den aktuelle containeren**.
Det tvinger ikke alle programmer til å velge IPv6. Nodes DNS-rekkefølge og valg av
tilkobling spiller også en rolle. Spesielt vil `--dns-result-order=ipv4first` foretrekke IPv4 og
er ikke en løsning på en feil som bare gjelder IPv4. Se [DNS-rekkefølge i Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Test Gemini og de andre leverandørene dine på nytt etter enhver endring på vertsnivå. For å rulle tilbake
fjerner du den egendefinerte `gai.conf`-monteringen, gjenoppretter den forrige nettverkskonfigurasjonen og
oppretter den berørte tjenesten eller det berørte nettverket på nytt i et vedlikeholdsvindu. Å opprette et nettverk
på nytt kan avbryte andre containere som er koblet til det. Ikke slett volumet med vedvarende data.

## Viktige merknader

- **SQLite WAL-modus:** `docker stop` må få fullføre, slik at OmniRoute kan skrive de nyeste endringene tilbake til `storage.sqlite` via et kontrollpunkt. De medfølgende Compose-filene angir allerede en stoppfrist på 40 sekunder. Hvis du kjører avbildningen direkte, må du beholde `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Sett til `true` hvis rutinemessige sikkerhetskopier og sikkerhetskopier før skriving administreres eksternt. Migreringer av eksisterende databaser krever fortsatt et eget varig sikkerhetsøyeblikksbilde og en beskyttelsesmekanisme for massemigrering.
- **Datapersistens:** Monter alltid et volum på `/app/data` for å bevare databasen, nøklene og konfigurasjonene på tvers av omstarter av containeren.
- **Portkonfigurasjon:** Overstyr miljøvariabelen `PORT` for å endre standardporten `20128`.

## Se også

- [Veiledning for VM-distribusjon](../ops/VM_DEPLOYMENT_GUIDE.md) — Oppsett med VM + nginx + Cloudflare
- [Veiledning for distribusjon til Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Distribuer til Fly.io
- [Miljøkonfigurasjon](../reference/ENVIRONMENT.md) — Fullstendig referanse for `.env`
