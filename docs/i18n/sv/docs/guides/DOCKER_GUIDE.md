# 🐳 Docker Guide — OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Fullständig referens för Docker-distribution. För en snabbstart, se [Docker-avsnittet i README](../README.md#-docker).

## Innehållsförteckning

- [Snabbkörning](#quick-run)
- [Med miljöfil](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Tillgängliga profiler](#available-profiles)
- [Konfigurera CLI-verktyg på värden när OmniRoute körs i Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sidecar](#redis-sidecar)
- [Compose för produktion](#production-compose)
- [Dockerfile-steg](#dockerfile-stages)
- [Kritiska miljövariabler](#critical-environment-variables)
- [Docker Compose med Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Snabb Cloudflare-tunnel](#cloudflare-quick-tunnel)
- [Avbildningstaggar](#image-tags)
- [Dashboard-uppdateringar i Docker](#dashboard-updates-in-docker)
- [Tillgänglighet: SQLite är som standard begränsat till en replik](#availability-default-sqlite-is-single-replica)
- [Regionala Gemini-fel i Docker](#gemini-regional-errors-inside-docker)
- [Viktiga anmärkningar](#important-notes)

---

## Snabbkörning

> **Självhosta med ett enda kommando?** Se
> [guiden för självhosting](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publicerad avbildning +
> Redis, endast loopback, inget profilval). Snabbkörningen nedan är alternativet
> med en enda container för användare som redan kör Redis någon annanstans.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Med miljöfil

```bash
# Kopiera och redigera .env först
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
# Basprofil (inga CLI-verktyg)
docker compose --profile base up -d

# CLI-profil (Claude Code, Codex och OpenClaw inbyggda)
docker compose --profile cli up -d

# Värdprofil (främst för Linux; monterar värdens CLI-binärfiler skrivskyddat)
docker compose --profile host up -d

# Webbprofil (Chromium/Playwright för leverantörer med webbsessioner)
docker compose --profile web up -d

# Kombinera CLI + CLIProxyAPI-sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Tillgängliga profiler

OmniRoute tillhandahåller Compose-profiler för de huvudsakliga distributionsvarianterna. Välj den som passar din miljö.

| Profil            | Tjänst           | När den ska användas                                                                                                                                          | Kommando                                     |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (standard) | `omniroute-base` | Headless-server/minimal körmiljö, inga CLI-verktyg för leverantörer medföljer                                                                                 | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentbaserade arbetsflöden som anropar `omniroute providers/setup/doctor` och medföljande CLI-verktyg (Codex, Claude Code, Droid, OpenClaw)                   | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Linux-värdar som vill ha `network_mode`-liknande åtkomst till värdens CLI-verktyg genom att montera `~/.local/bin`, `~/.codex`, `~/.claude` osv. skrivskyddat | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Kör [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) som sidecar på port `8317` för proxyhantering till uppströms CLI-verktyg                      | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Leverantörer med webbsessioner som behöver en webbläsare: `gemini-web`, `claude-web`, `claude-turnstile` (bygger `runner-web`, Chromium ingår)                | `docker compose --profile web up -d`         |

> Flera profiler kan kombineras: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurera värdens CLI-verktyg när OmniRoute körs i Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` och knappen
**Spara konfiguration** på kontrollpanelen skriver alla filer som `~/.codex/*.config.toml`. Dessa sökvägar
har endast betydelse på den dator där CLI:t faktiskt körs. Om du kör dem inuti
containern hamnar skrivningen i containerns egen hemkatalog (`/home/node` —
avbildningen kör `USER node`), där inget CLI på värden någonsin kommer att läsa den och där den
försvinner så fort containern återskapas.

OmniRoute upptäcker detta och nekar skrivningen med instruktioner i stället för att
rapportera en lyckad åtgärd som du inte kan använda: CLI:t avslutas med `2` och API:t svarar `422`
med `containerEphemeralTarget: true`.

### Rekommenderat: kör CLI:t på värden och OmniRoute i Docker

Containern tillhandahåller API:t, medan CLI:t konfigurerar dina verktyg på värden.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # rikta CLI:t mot containern
omniroute setup-codex                      # skriver till den faktiska ~/.codex på din värd
```

Det här är rätt val när Codex, Claude Code, Cursor eller liknande körs på din
bärbara dator — vilket är den vanligaste konfigurationen.

### Alternativ: bind-montera värdens konfigurationskataloger (`host`-profilen)

Om du vill att containern själv ska skriva värdens konfiguration monterar du
katalogerna och ställer in `CLI_CONFIG_HOME` på monteringens rotkatalog. `host`-profilen
gör redan detta:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Det är bind-monteringen som gör sökvägen tillförlitlig: OmniRoute läser
`/proc/self/mountinfo` och tillåter skrivningar till monterade sökvägar (och till kataloger
vars underkataloger är monteringar, vilket är exakt strukturen för `/host-home` ovan), samtidigt som
skrivningar till omonterade sökvägar fortfarande nekas.

### Nödlösning: konfigurera containerns egna CLI:er (använd sparsamt)

När CLI:erna faktiskt finns inuti containern (`cli`-profilen) är skrivningen
avsiktlig. Ange `--allow-container-write` för valfritt `setup-*`-kommando eller ställ in
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` för servern. Skrivningen genomförs
med en varning om att den inte kommer att finnas kvar efter att containern har återskapats.

> **Säkerhetsvarning — `cli`-profilen + montering av `docker.sock`.**
> `cli`-profilen bind-monterar `/var/run/docker.sock` så att den automatiska
> uppdateraren i containern kan återskapa stacken via värdens demon
> (`src/lib/system/autoUpdate.ts` söker efter denna socket och hoppar över
> Docker-sökvägen när den saknas). Denna socket är **en förtroendegräns med
> root-behörighet på värden**: allt som kan nå den styr värdens Docker-demon som
> root — det kan skapa, inspektera, stoppa och ta bort valfri container på värden.
> Konsekvenser:
>
> 1. **Exponera aldrig `cli`-profilens port mot nätverket.** Publicera
>    den på `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — en `cli`-profil som kan nås via LAN förvandlar all RCE på kontrollpanelsnivå till
>    fullständig kompromettering av värden.
> 2. **Bind-montera inga ytterligare kataloger från värden i `cli`-profilen.**
>    Docker-socketen tillsammans med ytterligare en montering ger containern fullständig
>    läs- och skrivåtkomst till ditt filsystem och värdens konfiguration. Om ett verktyg behöver
>    komma åt ett projekt ska du köra det lokalt med CLI-binärfilen — montera inte in det
>    i `cli`-containern.
>
> Om du inte behöver automatisk uppdatering inifrån containern ska du låta `cli`-profilen vara avstängd
> (`COMPOSE_PROFILES=core,redis` eller kortare). De andra profilerna monterar inte
> Docker-socketen.
>
> Se `docs/security/MITM-TPROXY-DECRYPT.md` (git; kompileras inte till `/docs`) för den relaterade hotmodellen
> kring MITM och `docs/security/SUPPLY_CHAIN.md` för
> ursprungskedjan för binärfilerna `codex`/`claude-code`/`droid`/`openclaw`.

## Redis-sidecar

OmniRoute förlitar sig på Redis för den distribuerade hastighetsbegränsaren och den delade cachen. Tjänsten `redis` är **alltid definierad** i `docker-compose.yml` (den är inte begränsad till någon profil) och startar tillsammans med alla andra profiler.

| Detalj                       | Värde                                         |
| ---------------------------- | --------------------------------------------- |
| Avbildning                   | `redis:7-alpine`                              |
| Behållarnamn                 | `omniroute-redis`                             |
| Intern port                  | `6379`                                        |
| Värdport (åsidosättning)     | `REDIS_PORT` (standardvärde `6379`)           |
| Värdbindning (åsidosättning) | `REDIS_BIND_HOST` (standardvärde `127.0.0.1`) |
| Volym                        | `omniroute-redis-data` → `/data`              |
| Hälsokontroll                | `redis-cli ping` (10 s intervall)             |

Relaterade miljövariabler:

- `REDIS_URL` — anslutningssträng som injiceras i appen (`redis://redis:6379` som standard).
- `REDIS_PORT` — portmappning på värdsidan för Redis-behållaren.
- `REDIS_BIND_HOST` — värdgränssnittet som porten publiceras på. Standardvärdet är `127.0.0.1`.

> **Varför loopback används som standard:** sidecar-behållaren körs utan `requirepass`, och appens
> behållare når den via Compose-nätverket (`redis:6379`) — den publicerade porten finns
> endast för verktyg på värdsidan (`redis-cli`, ett lokalt `npm run dev`). Publicering på
> `0.0.0.0` skulle exponera en Redis-instans utan autentisering för alla värdar i ditt lokala nätverk. Om du anger
> `REDIS_BIND_HOST=0.0.0.0` ska du även lägga till `--requirepass` i tjänstens `command:`.

**Att inaktivera Redis** rekommenderas inte (hastighetsbegränsaren degraderas till en reservlösning i minnet). Om du måste göra det kan du antingen ta bort eller kommentera tjänstblocket `redis:` i `docker-compose.yml` eller skala ned det till noll:

```bash
docker compose up -d --scale redis=0
```

## Compose för produktion

För en isolerad produktionsögonblicksbild som körs parallellt med utvecklingsmiljön använder du `docker-compose.prod.yml`.

| Detalj                     | Värde                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------- |
| Fil                        | `docker-compose.prod.yml`                                                              |
| Standardport för dashboard | `PROD_DASHBOARD_PORT=20130` (mappad till interna `${DASHBOARD_PORT:-20128}`)           |
| Standardport för API       | `PROD_API_PORT=20131`                                                                  |
| Avbildning                 | `omniroute:prod` (byggd från målet `runner-cli`)                                       |
| Redis-behållare            | `omniroute-redis-prod` (`redis:8.6.2`, dedikerad volym `redis-prod-data`)              |
| Datavolym                  | `omniroute-prod-data` (namngiven, bevaras mellan ombyggnader)                          |
| Hälsokontroller            | `node healthcheck.mjs` + `redis-cli ping`, där `depends_on` styrs av Redis hälsostatus |

Så här använder du den:

```bash
# Bygg och starta produktionsstacken
docker compose -f docker-compose.prod.yml up -d --build

# Strömma loggar
docker compose -f docker-compose.prod.yml logs -f

# Stäng ned (behåll volymer)
docker compose -f docker-compose.prod.yml down
```

Produktionsstacken körs parallellt med utvecklingsmiljöns Compose-stack (med andra behållarnamn, portar och volymer), så att du kan fortsätta iterera lokalt medan produktionsmiljön är igång.

## Dockerfile-steg

Repositoriet levereras med en Dockerfile i flera steg (`Dockerfile`). Fyra steg exponeras; välj rätt `target` för ditt användningsfall.

| Steg          | Basavbildning         | Syfte                                                                                                                                                                                                                                                                                                             |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installerar beroenden (`npm ci --legacy-peer-deps`) och kör `npm run build` (Turbopack som standard — se Byggresurser nedan)                                                                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Produktionskörmiljö med fristående utdata från Next.js. **Inga leverantörs-CLI:er medföljer.**                                                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | Lägger till `git`, `docker.io`, `docker-compose` och globala CLI:er: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Välj detta för agentbaserade arbetsflöden.**                                                                                                                            |
| `runner-web`  | `runner-base`         | Lägger till Playwright och en Chromium-webbläsare (`--with-deps`) för webbsessionsleverantörer: `gemini-web`, `claude-web`, `claude-turnstile`. **Välj detta när du använder dessa leverantörer** — den vanliga avbildningen misslyckas vid begäran utan det (se anmärkningen om `-web` under Utgivningskanaler). |

Bygg ett specifikt mål manuellt:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Byggresurser

Tre byggargument styr resursförbrukningen för steget `builder`. De gäller endast vid byggtid —
`OMNIROUTE_MEMORY_MB` (nedan) är en separat inställning för körning.

| Byggargument                | Standardvärde | Effekt                                                                                     |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`           | `0` bygger med webpack: lägre minnestopp, långsammare. `1` aktiverar Turbopack.            |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | Övre gräns för V8-heapen (`--max-old-space-size`) för den startade `next build`-processen. |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Anger `CIRCLE_NODE_TOTAL`; Next härleder `workers = N - 1` för insamling av siddata.       |

`OMNIROUTE_BUILD_WORKERS` är den inställning som ska höjas på en kraftfull byggserver och den som
bör misstänkas när en resursbegränsad byggprocess dör **efter** `✓ Compiled successfully`. Varje
siddata-worker är en egen process, liksom den överordnade `next build`-processen;
en reproduktion på en aktiv VPS (ärende #7518) uppmätte varje process maximala RSS till
~4,5 GB oberoende av heap-flaggan i `NODE_OPTIONS` (Turbopack kompilerar i
inbyggt/Rust-minne utanför V8-heapen). Standardvärdet `2` (→ 1 worker, totalt 2
processer) är dimensionerat för de GitHub-hanterade körarna med 16 GB/4 vCPU som
publiceringspipelinen använder. Med `8` (→ 7 workers) fick köraren slut på minne och
buildkit misslyckades med steget med `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) fick fortfarande inte plats när RSS per process mättes
direkt i stället för att uppskattas. `tests/unit/docker-build-memory-budget.test.ts`
utför beräkningen utifrån det uppmätta värdet och misslyckas om någon av inställningarna
överskrider körarens kapacitet.

Turbopack kompilerar i inbyggt Rust-minne som ligger **utanför** V8-heapen, så
`OMNIROUTE_BUILD_MEMORY_MB` begränsar det inte. På en värd med ett minnestak
SIGKILL-avslutas bygget då av OOM-avslutaren helt utan feltext — det stannar helt enkelt
mitt under `Creating an optimized production build`, vilket ser ut som att processen har hängt sig
snarare än att minnet har tagit slut. Därför använder `Dockerfile` webpack som standard
(`OMNIROUTE_USE_TURBOPACK=0`), till skillnad från `npm run dev` / `npm run build`, där
Turbopack är kodens standardval: en ren `docker build .` utan byggargument (vilket
Railway och andra värdtjänster med ettklicksinstallation kör) får inte dö tyst på en
minnesbegränsad byggserver. De publicerade avbildningarna skickar redan uttryckligen
`OMNIROUTE_USE_TURBOPACK=0` i `docker-publish.yml`. På en byggserver med gott om RAM kan du
aktivera Turbopack för ett snabbare bygge:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` är aktiverat, så `next build` kör en överordnad process **och** en worker-
process, och båda följer `OMNIROUTE_BUILD_MEMORY_MB` separat. Sätt containerns
minnestak till ungefär det dubbla värdet eller mer, inte samma värde.

Uppmätt i detta träd (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketerare | Containerns minnestak | Resultat                                  |
| ---------- | --------------------- | ----------------------------------------- |
| Turbopack  | 8 GiB / 16 GiB        | OOM-avslutad vid båda, utan felmeddelande |
| webpack    | 8 GiB                 | bygg-workern SIGKILL-avslutades           |
| webpack    | 12 GiB                | lyckades, nådde en topp på 11,1 GiB       |

### Standardvärden vid körning

Standardvärden som exporteras av `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Minnesbeteende i Docker:

- Avbildningen ställer in `OMNIROUTE_MEMORY_MB=1024` och härleder `NODE_OPTIONS=--max-old-space-size=1024` från den.
- Den faktiska serverprocessen startas av den fristående startaren, som läser `OMNIROUTE_MEMORY_MB` och lägger till `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node använder det sista upprepade värdet för `--max-old-space-size`, så genom att ställa in `OMNIROUTE_MEMORY_MB` styr du den effektiva heapgränsen i Docker.
- Eftersom avbildningen alltid ställer in variabeln används aldrig startarens egen RAM-kalibrerade reservlösning under Docker. Höj den uttryckligen för arbetsbelastningen (se tabellen nedan). `2048` är fortfarande för lite för kodningsagenters `/v1/responses`.

### RAM vid körning för kodningsagenter

Dockers standardvärde på 1 GiB är en miniminivå för instrumentpanel och enkel chatt, inte en storlek för produktionsbruk. Långa `POST /v1/responses`-kroppar (hundratals meddelanden, tiotals verktyg) behåller flera grafer i minnet under komprimering. Två överlappande begäranden på ~3 MiB/~750k token har fått V8 att avbryta vid ett old space på **12 GiB** (`FATAL ERROR: Reached heap limit`) och har även orsakat cgroup-OOM vid 16 GiB. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionera **cgroup `--memory` högre än heapen** — interna buffertar, SQLite och mellanliggande komprimeringsdata ligger utanför V8.

| Arbetsbelastning                         | `OMNIROUTE_MEMORY_MB`                | Behållare/cgroup    | Anmärkningar                                                                                               |
| ---------------------------------------- | ------------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Instrumentpanel, en enkel chatt          | `1024` (avbildningens standardvärde) | ≥2 GiB              |                                                                                                            |
| En kodningsagent (Claude/Codex/Grok)     | `8192`                               | ≥10 GiB             | Typisk `/v1/responses` för en enskild session                                                              |
| Två samtidiga långa `/v1/responses`      | `10240`–`12288`                      | ≥12–16 GiB          | Uppmätt V8-avbrott vid ~12 GiB heap                                                                        |
| Tre eller fler samtidiga långa kontexter | kör inte i en enda process           | serialisera/mer RAM | Standardgränsen för resurskrävande begäranden är 1 pågående; att höja den utan mer RAM återinför avbrottet |

`omniroute serve` på fysisk maskin kalibrerar till ~35 % av RAM-minnet (begränsat till `[512, 4096]`) när `OMNIROUTE_MEMORY_MB` **inte är inställd**. Docker ställer alltid in den på `1024`, så den kalibreringen körs aldrig i den officiella avbildningen.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritiska miljövariabler

Utöver standardvärdena som dokumenteras i [ENVIRONMENT.md](../reference/ENVIRONMENT.md) är följande variabler viktigast vid körning under Docker:

| Variabel                      | Syfte                                                                                                                                                                                                                                                                              | Standardvärde            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Delad hemlighet för WebSocket-bryggan. **Krävs i produktion** — ange en stark slumpmässig sträng.                                                                                                                                                                                  | ej angivet (måste anges) |
| `REDIS_URL`                   | Anslutningssträng för backend-tjänsten för hastighetsbegränsning/cache                                                                                                                                                                                                             | `redis://redis:6379`     |
| `REDIS_PORT`                  | Port på värddatorn för den medföljande Redis-containern                                                                                                                                                                                                                            | `6379`                   |
| `REDIS_BIND_HOST`             | Värdgränssnittet som den medföljande Redis-porten publiceras på (loopback om du inte lägger till AUTH)                                                                                                                                                                             | `127.0.0.1`              |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Sökväg på värddatorn som monteras i profilen `cli` vid `/workspace/omniroute` för arbetsflöden för självuppdatering                                                                                                                                                                | `.` (aktuell katalog)    |
| `OMNIROUTE_MEMORY_MB`         | Övre gräns för Nodes heap-minne vid körning av den fristående Docker-servern; åsidosätter avbildningens standardvärde ovan. Kodningsagenter: `8192`+ (se [RAM vid körning](#runtime-ram-for-coding-agents)).                                                                       | `1024`                   |
| `DASHBOARD_PORT` / `API_PORT` | Åsidosätter exponerade portar för kontrollpanelen (20128) och API:t (20129)                                                                                                                                                                                                        | `20128` / `20129`        |
| `APP_BIND_HOST`               | Värdgränssnittet som docker-compose publicerar portarna för kontrollpanelen/API:t/live-WS på. Med `REQUIRE_API_KEY=false` (standardvärdet) exponerar `0.0.0.0` den anonyma `/v1`-proxyn för LAN-nätverket — utöka endast med `REQUIRE_API_KEY=true` eller en omvänd proxy framför. | `127.0.0.1`              |
| `CLIPROXY_BIND_HOST`          | Värdgränssnittet som docker-compose publicerar sidovagnen `cliproxyapi` på — dess datavolym innehåller leverantörsinloggningsuppgifter.                                                                                                                                            | `127.0.0.1`              |
| `OMNIROUTE_PLUGINS_DIR`       | Katalogen som insticksskannerfunktionen läser från och installerar i vid körning. Ange den när insticksmoduler bind-monteras: standardvärdet följer `HOME`, som en avbildning inte nödvändigtvis exporterar.                                                                       | `~/.omniroute/plugins`   |
| `OMNIROUTE_BASE_PATH`         | URL-undersökväg när appen publiceras bakom en omvänd proxy (t.ex. `/omniroute`)                                                                                                                                                                                                    | _(tomt = rot)_           |
| `NEXT_PUBLIC_BASE_URL`        | Publikt webbläsarursprung inklusive undersökvägen (t.ex. `https://host/omniroute`)                                                                                                                                                                                                 | ej angivet               |
| `PROD_DASHBOARD_PORT`         | Port på värddatorn för kontrollpanelen i `docker-compose.prod.yml`                                                                                                                                                                                                                 | `20130`                  |
| `CLIPROXYAPI_PORT`            | Port på värddatorn för sidovagnen `cliproxyapi`                                                                                                                                                                                                                                    | `8317`                   |

## Omvänd proxy på en undersökväg (Traefik / nginx)

Next.js `basePath` kompileras in i det fristående paketet. OmniRoute registrerar det
inbakade värdet i en markörfil i appens rot (skrivs under `npm run build`; läses av
`scripts/docker/ensure-docker-base-path.mjs`) och jämför det med
`OMNIROUTE_BASE_PATH` när containern startar. När de skiljer sig åt och avbildningen
byggdes för domänroten skriver startpunkten om de fristående manifesten, de
inbäddade literalerna för `basePath`/`assetPrefix` (Next 16 renderar SSR-resurs-URL:er
enbart från `assetPrefix` — patchverktyget speglar undersökvägen till det), de inbakade
resurs-URL:erna för `/_next/static` (klientreferensmanifest, medieimporter, förrenderade
felsidor) och klientens `process.env`-shim innan `node dev/run-standalone.mjs`
körs.

### Bygg med Compose (rekommenderas)

Ange båda variablerna i `.env` och bygg sedan om så att avbildningen och körmiljön
överensstämmer:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` vidarebefordrar `OMNIROUTE_BASE_PATH` som ett Docker-byggargument
och som en miljövariabel vid körning.

### Förbyggd rotavbildning + undersökväg vid körning

Publicerade `diegosouzapw/omniroute:*`-avbildningar är byggda för domänroten. Du kan
fortfarande ange `OMNIROUTE_BASE_PATH` vid körning; containern patchar paketet en gång
vid start. Kombinera det med matchande publik origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurera den omvända proxyn så att den vidarebefordrar den **fullständiga** externa
sökvägen (ta inte bort prefixet). Traefik ska dirigera `PathPrefix(`/omniroute`)` till
containern utan `StripPrefix`, så att Next.js tar emot `/omniroute/...` och levererar
resurser från `/omniroute/_next/...`.

Dockers hälsokontroll sonderar den resurssnåla livscykelslutpunkten `/healthz` med
prefixet från den aktiva `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` är fortsatt
tillgänglig för diagnostik avsedd för människor och instrumentpaneler; för att låta
containerns HEALTHCHECK använda den igen (exempelvis för djup hälsokontroll), ange
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Den sökvägen är en **djup**
kontroll (databas + övervakningssammanfattning) — lämplig för Dockers sällan körda
`HEALTHCHECK` om du väljer att återaktivera den, men **inte** för intervallen i
Kubernetes `livenessProbe`.

För orkestrerare (Kubernetes, Nomad osv.):

| Sond            | Föredra                                                               | Undvik                                                        |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| Livstecken      | HTTP `GET /livez` eller TCP på huvudporten (`PORT`, standard `20128`) | `/api/monitoring/health` som livsteckenskontroll              |
| Redo            | HTTP `GET /healthz`                                                   | Korta tidsgränser som tolkar en upptagen händelseloop som död |
| Djup / blackbox | `/api/monitoring/health`                                              | —                                                             |

`/healthz` rapporterar processens livscykel (`ok` / `starting` / `stopping`). `/livez`
kontrollerar endast att processen lever (200 när hanteraren kan köras; den väntar inte
på att processen ska bli redo). Båda körs fortfarande i samma Node-händelseloop som
begäranhanteringen, så CPU-bundet katalog- eller komprimeringsarbete kan fördröja dem
— upptagen ≠ död. Föredra TCP-baserad livsteckenskontroll om HTTP-sonder når sin
tidsgräns. Fullständig vägledning för sonder:
[Övervakningsguide — rekommendationer för Kubernetes-sonder](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose med Caddy (automatisk TLS för HTTPS)

OmniRoute kan exponeras säkert med Caddys automatiska SSL-etablering. Se till att domänens DNS A-post pekar på serverns IP-adress.

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
      # Ursprung som webbläsaren använder för OAuth-återanrop, instrumentpanelslänkar och genererade offentliga URL:er.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Intern URL från server till server för schemalagda jobb/egna anrop.
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

Caddy anger standardrubrikerna för vidarebefordran till uppströmsbehållaren. OmniRoute använder
`NEXT_PUBLIC_BASE_URL` som det kanoniska offentliga ursprunget för OAuth-återanrop och genererade offentliga
länkar. Autentiserade skrivningar från instrumentpanelen använder förfrågningar med samma ursprung samt sessionsbunden CSRF-
skydd. Aktivera endast `OMNIROUTE_TRUST_PROXY` för avancerade distributioner där du avsiktligt
vill att OmniRoute ska härleda det offentliga ursprunget från betrodda vidarebefordringsrubriker i stället för explicit
konfiguration.

## Cloudflare Quick Tunnel

Stöd för Docker-distributioner i instrumentpanelen omfattar en **Cloudflare Quick Tunnel** med ett klick under `Dashboard → Endpoints`. Vid den första aktiveringen hämtas `cloudflared` endast när det behövs, en tillfällig tunnel till din aktuella `/v1`-slutpunkt startas och den genererade URL:en `https://*.trycloudflare.com/v1` visas direkt under din vanliga offentliga URL.

Tunnelpaneler för slutpunkter (Cloudflare, Tailscale, ngrok) kan visas eller döljas under `Settings → Appearance` utan att det aktiva tunneltillståndet ändras.

### Information om tunnlar

- URL:er för Quick Tunnel är tillfälliga och ändras efter varje omstart.
- Quick Tunnels återställs inte automatiskt efter en omstart av OmniRoute eller behållaren. Aktivera dem igen från instrumentpanelen när det behövs.
- Hanterad installation stöder för närvarande Linux, macOS och Windows på `x64` / `arm64`.
- Hanterade Quick Tunnels använder som standard HTTP/2-transport för att undvika störande varningar om QUIC UDP-buffertar i begränsade behållarmiljöer. Ange `CLOUDFLARED_PROTOCOL=quic` eller `auto` om du vill använda en annan transport.
- Docker-avbildningar inkluderar systemets CA-rotcertifikat och skickar dem till hanterade `cloudflared`, vilket förhindrar TLS-förtroendefel när tunneln initieras inuti behållaren.
- Ange `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` om du vill att OmniRoute ska använda en befintlig binärfil i stället för att hämta en.

## Avbildningstaggar

| Avbildning               | Tagg     | Storlek | Beskrivning                                             |
| ------------------------ | -------- | ------- | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Högsta **publicerade** stabila SemVer (inte git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Fäst den här taggtypen för GitOps                       |

Manifest för flera plattformar: inbyggt stöd för `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker väljer automatiskt den matchande arkitekturen. Ange `--platform linux/amd64` om du behöver tvinga AMD64-emulering på ARM-värdar.

### Utgivningskanaler

OmniRoute publicerar separata Docker-kanaler för stabila utgåvor, aktiv testning av utgivningsgrenar och utvecklingsversioner.

| Kanal                           | Källa                                 | Föränderlighet                       | Rekommenderad användning                                                                                                          |
| ------------------------------- | ------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signerad/versionsnumrerad utgåva      | Oföränderlig                         | Produktionsdistributioner som är fästa vid en exakt utgåva                                                                        |
| `:latest` / `:latest-web`       | Högsta **publicerade** stabila SemVer | Föränderlig stabil pekare            | Följer stabila utgåvor **efter** ett SemVer-publiceringsjobb – följer **inte** `main` eller outgivna incheckningar i `release/v*` |
| `:next` / `:next-web`           | Aktuell standardgren `release/v*`     | Föränderlig förhandsutgivningspekare | Testning av korrigeringar som har lagts till i den aktiva utgivningsgrenen men ännu inte ingår i en stabil utgåva                 |
| `:main` / `:main-web`           | Grenen `main`                         | Föränderlig utvecklingspekare        | Endast utvecklings- och integrationstestning                                                                                      |

#### Leverantörer med webbsessioner: `-web`-avbildningarna

Varje kanal ovan finns även som en `-web`-tagg (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), byggd från steget `runner-web` – samma avbildning plus Playwright och webbläsaren Chromium. Den vanliga avbildningen levereras **utan** Chromium. `gemini-web`, `claude-web` och `claude-turnstile` behöver den.

Felet skjuts upp och inträffar inte vid uppstart: dessa leverantörer listar sina modeller och visas som anslutna i instrumentpanelen, och det är först den första förfrågan som misslyckas med

```
[500]: Det gick inte att läsa in den externa modulen playwright: Fel: Modulen kan inte hittas
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Om du använder dessa leverantörer hämtar du `-web`-taggen för den kanal som du redan använder – inget annat ändras. För en npm/CLI-installation (ingen Docker-avbildning) är motsvarande del som saknas webbläsarens binärfil: kör `npx playwright install chromium` på värden.

#### Använda förhandsutgivningskanalen

Kanalen `next` byggs om vid varje push till den aktuella standardgrenen `release/v*` och publiceras för både AMD64 och ARM64. Äldre underhållsgrenar kan inte skriva över den. Kanalen tillhandahåller en hämtningsbar avbildning med korrigeringar som har slagits samman med den aktiva versionsgrenen innan nästa stabila tagg skapas.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

För Docker Compose åsidosätter du avbildningstaggen som används av den valda profilen och hämtar och återskapar sedan tjänsten:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Säkerhet och återställning

`next` är en flytande förhandsversionskanal. Den kan ändras vid varje push till den aktiva versionsgrenen och **stöds inte för produktionsbruk**. Fäst avbildningens digest medan du utvärderar ett specifikt bygge:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Säkerhetskopiera OmniRoutes datavolym eller bind-monterade datakatalog innan du testar. För att återställa går du tillbaka till den tidigare använda stabila versionen eller digesten och återskapar containern:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ett bygge från en versionsgren kan aldrig flytta `latest`; endast en kvalificerad stabil semantisk version får uppdatera den stabila pekaren. `next`-avbildningarna behåller granskningen av versionsavbildningen och den blockerande kontrollen för CRITICAL-sårbarheter.

**`latest` garanterar inte aktualitet i förhållande till git.** Sammanslagna korrigeringar i `main` eller i den aktiva grenen `release/v*` finns **inte** i `:latest` förrän en stabil SemVer-avbildning har publicerats och publiceringsjobbet uppdaterar `:latest` (samma digest som denna SemVer). Om `latest` verkar ha fastnat medan GitHub redan visar korrigeringen kan du hämta `:next` för att testa versionsgrenen eller vänta på SemVer-taggen.

| Du vill                                                                             | Använd                                     |
| ----------------------------------------------------------------------------------- | ------------------------------------------ |
| GitOps/produktion som inte får avvika                                               | Fäst `:X.Y.Z` (eller avbildningens digest) |
| Följa publicerade stabila versioner och acceptera ett återskapande vid varje utgåva | `:latest`                                  |
| Testa opublicerade commits i `release/v*`                                           | `:next` (inte för produktion)              |
| Testa `main`                                                                        | `:main` (inte för produktion)              |

## Uppdateringar från instrumentpanelen i Docker

En container från en publicerad avbildning kan inte ersätta sig själv. När OmniRoute upptäcker att det körs inuti en
container (ingen `.git`-utcheckning, inte en npm-installation) visar uppdateringsbannern på startsidans instrumentpanel
värdkommandot som ska köras i stället för npm/git-instruktionerna, tillsammans med en kopieringsknapp:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Tjänstnamnet kommer från `AUTO_UPDATE_SERVICE` (standardvärdet är `omniroute`, tjänsten i
`docker-compose.selfhost.yml`). `pull` flyttar endast en flytande tagg (`latest`, `next`); med en fixerad
`:X.Y.Z`-tagg måste du först ändra taggen.

### Uppdateringar med ett klick via en utlösningsfil på värden

För att **Uppdatera nu** ska fortsätta fungera utan att `/var/run/docker.sock` monteras (vilket ger containern
root-åtkomst på värden — se varningen för `cli`-profilen ovan), anger du `DOCKER_UPDATE_TRIGGER_FILE` för
OmniRoute-tjänsten och kör en bevakare på värden:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Sökvägen måste finnas inuti `DATA_DIR` (relativa värden matchas mot den); allt annat
avvisas. **Uppdatera nu** skriver sedan `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }` till den
filen, svarar med `202` och instrumentpanelen anropar regelbundet `/api/system/version` tills den nya versionen är aktiv
och läser sedan in sidan igen. OmniRoute kör aldrig ett skal- eller Docker-kommando i det här läget. Precis som för alla
uppdateringsåtgärder godtas begäran endast från loopback-/LAN-klienter.

En bind-monterad datakatalog ger värden en stabil sökväg att bevaka. Exempel på `systemd`-enheter
(anpassa `/srv/omniroute` till katalogen som innehåller din compose-fil och `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Bevaka uppdateringsbegäranden från OmniRoutes instrumentpanel

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Hämta och återskapa OmniRoute-containern

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

Tjänsten tar bort begäran före hämtningen så att en misslyckad körning inte skapar en loop. Utan
`DOCKER_UPDATE_TRIGGER_FILE` behåller instrumentpanelen det manuella kommandoflödet.

## Tillgänglighet: standard SQLite är en kopia

Lager Docker / Kubernetes OmniRoute är** en nodprocess + en SQLite skrivare** . Hög tillgänglighet är** stöds inte** på den topologin.

| Tvång                                    | Följd                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ensam författare                         | Do** inte** kör flera repliker mot samma SQLite fil. Det korrumperar DB.                                                                                                                                                                                                                                             |
| Återskapa / starta om / HEALTHCHECK kill | **Fullt avbrott** av SSE under flygning, dashboardsessioner och minnestillstånd. Varje ansluten klient tappar. Nya förfrågningar under det tomma slutpunktsfönstret får en omvänd proxy**`502 Bad Gateway: Unknown error`** , inte OmniRoute JSON — klienter kan inte skilja detta från ett leverantörsfel (#11015). |
| Samma händelseloop som `/healthz`        | En upptagen katalog eller kompressionsbock kan fördröja sonder; en kort timeout startar sedan om** endast** kopia.                                                                                                                                                                                                   |

**Sondmatris** (se även [Kubernetes sondrekommendationer](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations) ):

| Sond             | Mål                                                          | Använd inte                                                  |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Livlighet        | TCP på `PORT` (standard `20128`), eller mjuk HTTP `/healthz` | `/api/monitoring/health`                                     |
| Beredskap        | HTTP `GET /healthz`                                          | Snäva timeouts som behandlar händelseslinga upptagen som död |
| Djup / människor | `/api/monitoring/health`                                     | Automatiserad kubelet livlighet                              |

**Uppgraderingar:** förvänta dig att varje session minskar. Dränera kunder om du kan; det finns ingen rullande uppdatering på standard SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` kommer också att ersätta den enda processen när behållaren är ohälsosam – samma sprängradie.

Färdiga manifest och ett Helm-diagram live i `deploy/kubernetes/` och `deploy/helm/omniroute/` — se [Kubernetes-distributionsguiden](../ops/KUBERNETES_DEPLOYMENT_GUIDE.md).

Kubernetes-utdrag för en** enstaka replika** (Återskapa krävs; höj inte `replicas` mot en SQLite -fil):

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

`preStop` sleep låter kube släppa tjänstens slutpunkter före SIGTERM så** ny** trafiken slutar drabba den döende processen. In-flight `/v1/responses` SSE dräneras upp till `SHUTDOWN_TIMEOUT_MS` (standard 30s) via tungviktsleasingavtal (#11015). Nya förfrågningar som fortfarande når processen får `503` + `Retry-After: 5`. Återskapa tomt slutpunktsgap tills ersättningen är klar förblir ett hårt avbrott – det vill säga SQLite topologin, inte en felkonfiguration av sond.

Extern Postgres / multi-writer HA är** inte** en dokumenterad lagerbana. Om du behöver HA, behåll en enstaka replik eller kör en topologi som projektet har testat och dokumenterat separat. Postgres/MySQL verket bor i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Tills det skickas, det enda stödda sättet att föröka sig** stor** `/v1/responses` kapaciteten är N oberoende processer (nästa avsnitt), inte `replicas > 1` på en volym.

## Utskalning: N oberoende processer

En Node-process är **en V8-heap**. Två överlappande kodningsagentanrop på ~3 MiB/~750k token till `POST /v1/responses` (RTK + Caveman) avbryter den heapen vid ~12 Gi (`FATAL ERROR: Reached heap limit`) och kan orsaka OOM i en cgroup på 16 Gi. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Den mätningen är en varning om **minnesbudgeten**, inte en fast produktgräns på två samtidiga långa `/v1/responses`. Insläpp av resurskrävande chattar styrs av en automatiskt härledd bytebudget för inkommande data (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) som dimensioneras utifrån samma V8-/cgroup-gräns — att åsidosätta den med ett högre värde (eller ställa in den äldre begärandegränsen `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) i en redan dimensionerad process återinför avbrottet. Små chattar, `/healthz`, `/v1/models` och MCP omfattas **inte** av den gränsen.

### En process: fler än två långa `/v1/responses`

En **välmående** process (heap under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standardvärde `0.75`) **kan** köra fler än två samtidiga långa `POST /v1/responses` när den processomfattande bytebudgeten för pågående anrop (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`/#10110) fortfarande har utrymme. Anropskroppar på eller över `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standardvärde 256 KiB) tar samma resurskrävande lease som strukturtunga begäranden och använder samma `tryAcquireHealthyHeadroom`-undantag från [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tiotals samtidiga långvariga SSE-klienter (driftansvariga behöver ofta 40–50) är en fråga om **minnesbudget** — dimensionera heap + primära/headroom-platser + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — inte en fast produktgräns på ”max 2”. En belastad heap avvisar fortfarande anrop med ett återupprepningsbart `503` så att #7849 inte återkommer.

Så här **multiplicerar du heapar** (oberoende V8 old spaces) **i dag**:

| Gör                                                                                                                                                                                          | Gör inte                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Kör **N containrar/poddar**, var och en med sin **egen** `DATA_DIR`/volym                                                                                                                    | Ställ in `replicas > 1` mot en enda SQLite-fil                     |
| Dimensionera resurskrävande pågående anrop + healthy headroom utifrån heap-/bytebudgeten för pågående anrop; 1–2 är det konservativa standardvärdet från #7849, inte ett fast produktmaximum | Ge en process 8× RAM och en obegränsad antalsgräns                 |
| Valfritt: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` för **delade kvoträknare**                                                                                                    | Behandla Redis som delad SQLite — det är det inte                  |
| Duplicera leverantörshemligheter till varje instans (eller acceptera partitionerade instrumentpaneler)                                                                                       | Förvänta dig en enda instrumentpanel/anropslogg för alla instanser |
| Placera valfri lastbalanserare framför; sessionsaffinitet via API-nyckel eller session räcker                                                                                                | Kräv leverantörsspecifik storleksmedveten middleware               |

Maskinvara: antalet samtidiga långa `/v1/responses` per instans är en fråga om **minnesbudget** (heap + bytebudget för pågående anrop/#10110). `N` oberoende `DATA_DIR` multiplicerar fortfarande heaparna: värddatorns RAM måste räcka till `N × cgroup`, inte ”en podd på 16 Gi med N=8”. Använd aldrig `replicas > 1` för en enda SQLite-fil.

Compose-skiss (två heapar, två volymer — inte `deploy.replicas: 2`):

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

Processtäthet (komprimering utanför HTTP-isolatet) behandlas i [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ett logiskt kluster med delat beständigt tillstånd behandlas i [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionala Gemini-fel i Docker

Google AI Studio/Gemini API kan returnera HTTP 400 med FAILED_PRECONDITION och
`User location is not supported for the API use.` En lyckad begäran på värden
bevisar inte att containern använder samma utgående rutt. DNS-ordning,
IPv4/IPv6-anslutning, VPN-routning och konfigurerade proxyservrar kan skilja sig åt. Kontrollera
[Googles regioner som stöds](https://ai.google.dev/gemini-api/docs/available-regions)
samt den faktiska anslutningsrutten. Enbart detta fel visar inte att API-nyckeln är felaktig.

### Föredra en anslutningsspecifik proxy

Använd OmniRoutes [prox konfiguration per anslutning](../ops/PROXY_GUIDE.md#4-level-proxy-system)
för den berörda Gemini-anslutningen och upprepa sedan **Test Connection** och en liten begäran
med samma modell. På så sätt begränsas routningsändringen till den anslutningen. Kontrollera
att proxyn kan nås från containern och att anslutningen verkligen väljer
den. Att ändra rutten garanterar inte regional behörighet hos uppströmsleverantören.

### Jämför nätverket på värden och i containern

Använd samma nyckel, modell och begäran när du jämför autentiserade resultat. Klistra aldrig in
inloggningsuppgifter, proxylösenord eller fullständiga auktoriseringshuvuden i ett ärende.
Kontrollera först vilka adressfamiljer operativsystemets resolver erbjuder genom att använda samma kommando
på värden och inuti containern:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Ersätt `omniroute` med tjänsten som du kör (till exempel `omniroute-web`). Dessa
kommandon skriver ut adressfamiljer utan inloggningsuppgifter eller IP-adresser. Ett returnerat `6`
visar bara ett IPv6-DNS-resultat: det bevisar **inte** att det finns en fungerande IPv6-rutt eller API-åtkomst.
Där `curl` är installerat jämför du `curl -4 -I https://generativelanguage.googleapis.com`
med `curl -6 -I https://generativelanguage.googleapis.com` i båda miljöerna.
Ett HTTP-svar bevisar anslutning för just den kontrollen, även om det är ett oautentiserat
fel. Endast den autentiserade modellbegäran testar behörigheten för Gemini.

### Alternativ på värdnivå: fungerande IPv6 och resolverpolicy

Anmälaren av [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) återställde
åtkomsten i sin miljö genom att aktivera IPv6 för containrar och ändra glibc:s
adressval. Behandla detta som ett miljöspecifikt alternativ. Bekräfta att värdens
IPv6, containerns utgående anslutning/routning och brandväggsregler fungerar innan du justerar resolverinställningarna.
En privat ULA-adress i sig upprättar inte offentlig IPv6-anslutning.

För tjänster som redan är anslutna till Compose standardnätverk aktiverar detta fragment
IPv6 i det nätverket. Behåll resten av tjänstens portar, volymer och konfiguration:

```yaml
networks:
  default:
    enable_ipv6: true
```

För ett namngivet nätverk aktiverar du det i nätverket som tjänsten faktiskt ansluter till. Docker kan
tilldela ett ULA-undernät. Välj endast ett uttryckligt undernät som inte överlappar när ditt nätverk
kräver det. Se [Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
och [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

I en **glibc-baserad avbildning** kan `/etc/gai.conf` ändra adressvalet. Det aktuella
Dockerfile i repositoriet använder Debian. Anpassade musl-baserade avbildningar använder inte samma mekanism.
Den rapporterade justeringen ändrar ULA-etiketten från `label fc00::/7 6` till
`label fc00::/7 1`. Utgå från avbildningens fullständiga policytabell och bevara dess övriga
poster: om du lägger till en `label`- eller `precedence`-post ersätts standardtabellen, så en fil
som endast innehåller den ändrade raden är otillräcklig.
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumenterar denna semantik. Bind-montera den granskade filen skrivskyddad på `/etc/gai.conf`
och återskapa tjänsten för att tillämpa den.

Detta ändrar operativsystemets adressval för **all utgående trafik i den containern**.
Det tvingar inte alla program att välja IPv6: Nodes DNS-ordning och anslutningsval
spelar också roll. I synnerhet prioriterar `--dns-result-order=ipv4first` IPv4 och
är inte en lösning på ett fel som endast gäller IPv4. Se [Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Testa Gemini och dina andra leverantörer igen efter varje ändring på värdnivå. För att återställa
tar du bort den anpassade `gai.conf`-monteringen, återställer den tidigare nätverkskonfigurationen och
återskapar den berörda tjänsten/det berörda nätverket under ett underhållsfönster. Att återskapa ett nätverk
kan avbryta andra containrar som är anslutna till det. Ta inte bort den beständiga datavolymen.

## Viktiga anmärkningar

- **SQLite WAL-läge:** `docker stop` bör tillåtas slutföras så att OmniRoute kan skriva tillbaka de senaste ändringarna till `storage.sqlite` via en kontrollpunkt. De medföljande Compose-filerna anger redan en stopptidsfrist på 40 sekunder. Om du kör avbildningen direkt ska du behålla `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Ange `true` om rutinmässiga säkerhetskopior och säkerhetskopior före skrivning hanteras externt. Migreringar av befintliga databaser kräver fortfarande en egen beständig säkerhetsögonblicksbild och ett skydd för massmigrering.
- **Databeständighet:** Montera alltid en volym till `/app/data` för att bevara databasen, nycklarna och konfigurationerna mellan omstarter av containern.
- **Portkonfiguration:** Åsidosätt miljövariabeln `PORT` för att ändra standardporten `20128`.

## Se även

- [Guide för VM-distribution](../ops/VM_DEPLOYMENT_GUIDE.md) — Konfiguration av VM + nginx + Cloudflare
- [Distributionsguide för Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Distribuera till Fly.io
- [Miljökonfiguration](../reference/ENVIRONMENT.md) — Fullständig referens för `.env`
