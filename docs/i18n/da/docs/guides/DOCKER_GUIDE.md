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

## Hurtig kørsel

> **Vil du hoste selv med én kommando?** Se
> [vejledningen til selvhosting](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publiceret image +
> Redis, kun loopback, intet profilvalg). Den hurtige kørsel nedenfor er
> løsningen med én container til brugere, som allerede kører Redis et andet sted.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Med miljøfil

```bash
# Kopiér og rediger først .env
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

Repositoryet leveres med en flertrins-Dockerfile (`Dockerfile`). Fire stadier er tilgængelige; vælg det rette `target` til dit anvendelsestilfælde.

| Stadie        | Basis-image           | Formål                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installerer afhængigheder (`npm ci --legacy-peer-deps`) og kører `npm run build` (Turbopack som standard — se Ressourcer under build nedenfor)                                                                                                                                                        |
| `runner-base` | `node:26-trixie-slim` | Produktionsmiljø med det selvstændige Next.js-output. **Ingen udbyder-CLI'er inkluderet.**                                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | Tilføjer `git`, `docker.io`, `docker-compose` og globale CLI'er: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Vælg dette til agentbaserede arbejdsgange.**                                                                                                                    |
| `runner-web`  | `runner-base`         | Tilføjer Playwright + en Chromium-browser (`--with-deps`) til websessionsudbydere: `gemini-web`, `claude-web`, `claude-turnstile`. **Vælg dette, når du bruger disse udbydere** — det almindelige image fejler på anmodningstidspunktet uden det (se bemærkningen om `-web` under Udgivelseskanaler). |

Byg et bestemt target manuelt:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ressourcer under build

Tre build-argumenter styrer, hvor ressourcekrævende `builder`-stadiet er. De gælder kun under build —
`OMNIROUTE_MEMORY_MB` (nedenfor) er en separat indstilling til runtime.

| Build-argument              | Standardværdi | Effekt                                                                                                 |
| --------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_USE_TURBOPACK`   | `0`           | `0` bygger med webpack: lavere maksimalt hukommelsesforbrug, men langsommere. `1` aktiverer Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`        | V8-heapgrænse (`--max-old-space-size`) for den startede `next build`.                                  |
| `OMNIROUTE_BUILD_WORKERS`   | `2`           | Leverer `CIRCLE_NODE_TOTAL`; Next udleder `workers = N - 1` til indsamling af sidedata.                |

`OMNIROUTE_BUILD_WORKERS` er den indstilling, der skal øges på en stor build-maskine, og den,
der bør mistænkes, når et ressourcebegrænset build fejler **efter** `✓ Compiled successfully`.
Hver sidedata-worker er sin egen proces, og det samme gælder den overordnede `next build`;
en reproduktion på en aktiv VPS (problem #7518) målte hver proces' maksimale RSS til
~4,5 GB uafhængigt af heap-flaget `NODE_OPTIONS` (Turbopack kompilerer i
native/Rust-hukommelse uden for V8-heapen). Standardværdien `2` (→ 1 worker, i alt 2
processer) er dimensioneret til de GitHub-hostede runners med 16 GB / 4 vCPU'er, som
udgivelsespipelinen bruger. Ved `8` (→ 7 workers) løb denne runner tør for hukommelse, og
buildkit fejlede trinnet med `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) passede stadig ikke, da RSS pr. proces blev målt
direkte i stedet for udledt. `tests/unit/docker-build-memory-budget.test.ts`
udfører beregningen ud fra det målte tal og fejler, hvis en af indstillingerne
bliver for stor til runneren.

Turbopack kompilerer i native Rust-hukommelse, der befinder sig **uden for** V8-heapen, så
`OMNIROUTE_BUILD_MEMORY_MB` begrænser den ikke. På en vært med en hukommelsesgrænse bliver
buildet derefter SIGKILL'et af OOM-killeren helt uden fejltekst — det stopper ganske enkelt
midt i `Creating an optimized production build`, hvilket ligner, at processen hænger, snarere
end at hukommelsen er opbrugt. Derfor bruger `Dockerfile` som standard webpack
(`OMNIROUTE_USE_TURBOPACK=0`), i modsætning til `npm run dev` / `npm run build`, hvor
Turbopack er standarden i koden: et rent `docker build .` uden build-argumenter (som
Railway og andre værter med installation med ét klik kører) må ikke fejle lydløst på en
build-maskine med begrænset hukommelse. De udgivne images angiver allerede
`OMNIROUTE_USE_TURBOPACK=0` eksplicit i `docker-publish.yml`. På en build-maskine med
rigeligt RAM kan du aktivere Turbopack for at få et hurtigere build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` er aktiveret, så `next build` kører både en overordnet proces **og** en
workerproces, og de respekterer hver især `OMNIROUTE_BUILD_MEMORY_MB` separat. Sæt containerens
grænse til omtrent det dobbelte af denne værdi eller mere, ikke kun én gang værdien.

Målt på dette træ (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Containergrænse | Resultat                                 |
| --------- | --------------- | ---------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | OOM-dræbt ved begge, uden fejlmeddelelse |
| webpack   | 8 GiB           | build-worker SIGKILL'et                  |
| webpack   | 12 GiB          | gennemført, toppede ved 11,1 GiB         |

### Standardværdier ved runtime

Standardværdier eksporteret af `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Hukommelsesadfærd i Docker:

- Imaget angiver `OMNIROUTE_MEMORY_MB=1024` og udleder `NODE_OPTIONS=--max-old-space-size=1024` fra den.
- Den faktiske serverproces startes af den selvstændige launcher, som læser `OMNIROUTE_MEMORY_MB` og tilføjer `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node bruger den sidste gentagne værdi for `--max-old-space-size`, så indstilling af `OMNIROUTE_MEMORY_MB` styrer den effektive Docker-heapgrænse.
- Da imaget altid angiver den, anvendes launcherens eget RAM-kalibrerede fallback aldrig under Docker. Forøg den eksplicit til arbejdsbelastningen (se tabellen nedenfor). `2048` er stadig for lidt til coding-agent-forespørgsler mod `/v1/responses`.

### RAM-forbrug under kørsel for coding-agenter

Docker-standarden på 1 GiB er et minimum til dashboard og let chat, ikke en størrelse til produktion. Lange `POST /v1/responses`-payloads (hundredvis af beskeder og snesevis af værktøjer) bevarer flere grafer i hukommelsen under komprimering. To overlappende forespørgsler på ca. 3 MiB / 750.000 tokens har fået V8 til at afbryde ved en **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) og har også udløst cgroup-OOM ved 16 GiB. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionér **cgroup `--memory` til mere end heapstørrelsen** — native buffers, SQLite og midlertidige komprimeringsdata ligger uden for V8.

| Arbejdsbelastning                          | `OMNIROUTE_MEMORY_MB`     | Container / cgroup    | Bemærkninger                                                                                               |
| ------------------------------------------ | ------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Dashboard, én let chat                     | `1024` (imagets standard) | ≥2 GiB                |                                                                                                            |
| Én coding-agent (Claude/Codex/Grok)        | `8192`                    | ≥10 GiB               | Typisk enkelt session med `/v1/responses`                                                                  |
| To samtidige lange `/v1/responses`         | `10240`–`12288`           | ≥12–16 GiB            | Målt V8-afbrydelse ved ca. 12 GiB heap                                                                     |
| Tre eller flere samtidige lange kontekster | gør det ikke i én proces  | serialisér / mere RAM | Standardgrænsen for tunge forespørgsler er 1 igangværende; øges den uden mere RAM, opstår afbrydelsen igen |

`omniroute serve` på bare metal kalibrerer til ca. 35 % af RAM (begrænset til `[512, 4096]`), når `OMNIROUTE_MEMORY_MB` **ikke er angivet**. Docker angiver altid `1024`, så denne kalibrering kører aldrig i det officielle image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
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

## Reverse proxy på en understi (Traefik / nginx)

Next.js `basePath` kompileres ind i den selvstændige bundle. OmniRoute registrerer den indbyggede
værdi i en sentinel-fil i appens rodmappe (skrevet under `npm run build`; læst af
`scripts/docker/ensure-docker-base-path.mjs`) og sammenligner den med
`OMNIROUTE_BASE_PATH`, når containeren starter. Når de er forskellige, og imaget blev
bygget til domænets rod, omskriver entrypointet de selvstændige manifester, de
indlejrede `basePath`/`assetPrefix`-literaler (Next 16 genererer SSR-aktiv-URL'er alene ud fra
`assetPrefix` — patcheren afspejler understien i den), de indbyggede
`/_next/static`-aktiv-URL'er (klientreferencemanifester, medieimporter, præ-renderede
fejlsider) og klientens `process.env`-shim, før `node dev/run-standalone.mjs`
kører.

### Compose-build (anbefalet)

Angiv begge variabler i `.env`, og genopbyg derefter, så imaget og runtime-miljøet stemmer overens:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` videresender `OMNIROUTE_BASE_PATH` som et Docker-build-argument og som en
miljøvariabel ved runtime.

### Forudbygget rodimage + understi ved runtime

Udgivne `diegosouzapw/omniroute:*`-images er bygget til domænets rod. Du kan stadig
angive `OMNIROUTE_BASE_PATH` ved runtime; containeren patcher bundlen én gang ved opstart.
Kombiner den med den tilsvarende offentlige origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurer reverse proxyen til at videresende den **fulde** eksterne sti (fjern ikke
præfikset). Traefik skal route `PathPrefix(`/omniroute`)` til containeren uden
`StripPrefix`, så Next.js modtager `/omniroute/...` og leverer aktiver fra
`/omniroute/_next/...`.

Dockers healthcheck sonderer det lette `/healthz`-livscyklusendepunkt med den aktive
`OMNIROUTE_BASE_PATH` som præfiks. `/api/monitoring/health` forbliver tilgængeligt til
diagnostik for mennesker og dashboards; hvis containerens HEALTHCHECK igen skal pege på det (for eksempel
for håndhævelse af et dybt sundhedstjek), skal du angive `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Denne sti er et **dybt** tjek (database + overvågningsoversigt) — velegnet til Dockers
sjældne `HEALTHCHECK`, hvis du aktivt vælger det igen, men **ikke** til Kubernetes-`livenessProbe`-
intervaller.

For orkestratorer (Kubernetes, Nomad osv.):

| Sonde          | Foretræk                                                              | Undgå                                                     |
| -------------- | --------------------------------------------------------------------- | --------------------------------------------------------- |
| Livstegn       | HTTP `GET /livez` eller TCP på hovedporten (`PORT`, standard `20128`) | `/api/monitoring/health` som livstegn                     |
| Parathed       | HTTP `GET /healthz`                                                   | Korte timeouts, der fortolker en travl event-loop som død |
| Dyb / blackbox | `/api/monitoring/health`                                              | —                                                         |

`/healthz` rapporterer processens livscyklus (`ok` / `starting` / `stopping`). `/livez` angiver
kun, om processen er i live (200, når handleren kan køre; den venter ikke på
parathed). Begge kører stadig på den samme Node-event-loop som forespørgselshåndteringen, så
CPU-bundet katalog- eller komprimeringsarbejde kan forsinke dem — travl ≠ død. Foretræk TCP-
livstegn, hvis HTTP-sonder får timeout. Komplet vejledning om sonder:
[Overvågningsvejledning — anbefalinger til Kubernetes-sonder](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose med Caddy (automatisk HTTPS/TLS)

OmniRoute kan eksponeres sikkert ved hjælp af Caddys automatiske SSL-klargøring. Sørg for, at dit domænes DNS A-record peger på din servers IP-adresse.

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
      # Oprindelse, der er synlig for browseren, til OAuth-callbacks, dashboardlinks og genererede offentlige URL'er.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Intern server-til-server-URL til planlagte job / forespørgsler til sig selv.
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

Caddy indstiller standardvideresendelsesheaderne for upstream-containeren. OmniRoute bruger
`NEXT_PUBLIC_BASE_URL` som den kanoniske offentlige oprindelse til OAuth-callbacks og genererede offentlige
links; godkendte skrivehandlinger i dashboardet bruger forespørgsler med samme oprindelse samt sessionsbundet CSRF-
beskyttelse. Aktivér kun `OMNIROUTE_TRUST_PROXY` for avancerede installationer, hvor du bevidst
ønsker, at OmniRoute skal udlede den offentlige oprindelse fra pålidelige videresendelsesheadere i stedet for eksplicit
konfiguration.

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

## Image-tags

| Image                    | Tag      | Størrelse | Beskrivelse                                          |
| ------------------------ | -------- | --------- | ---------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB    | Højeste **udgivne** stabile SemVer (ikke git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB    | Fastlås denne type tag til GitOps                    |

Multiplatformsmanifest: integreret `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker vælger automatisk den matchende arkitektur; angiv `--platform linux/amd64`, hvis du har brug for at gennemtvinge AMD64-emulering på ARM-værter.

### Udgivelseskanaler

OmniRoute udgiver separate Docker-kanaler til stabile udgivelser, aktiv test af udgivelsesgrene og udviklingsbuilds.

| Kanal                           | Kilde                              | Foranderlighed                | Anbefalet anvendelse                                                                                                         |
| ------------------------------- | ---------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signeret/versioneret udgivelse     | Uforanderlig                  | Produktionsinstallationer, der fastlåser en præcis udgivelse                                                                 |
| `:latest` / `:latest-web`       | Højeste **udgivne** stabile SemVer | Foranderlig stabil markør     | Følger stabile udgivelser **efter** et SemVer-udgivelsesjob — følger **ikke** `main` eller ikke-udgivne `release/v*`-commits |
| `:next` / `:next-web`           | Aktuel standardgren `release/v*`   | Foranderlig prerelease-markør | Test af rettelser, der er landet på den aktive udgivelsesgren, men endnu ikke indgår i en stabil udgivelse                   |
| `:main` / `:main-web`           | `main`-grenen                      | Foranderlig udviklingsmarkør  | Kun til udviklings- og integrationstest                                                                                      |

#### Websessionsudbydere: `-web`-images

Hver kanal ovenfor findes også som et `-web`-tag (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), bygget fra `runner-web`-fasen — det samme image plus Playwright og en Chromium-browser. Det almindelige image leveres **uden** Chromium; `gemini-web`, `claude-web` og `claude-turnstile` kræver det.

Fejlen udskydes og opstår ikke ved opstart: Disse udbydere viser deres modeller og fremstår som forbundet i dashboardet, og først den første forespørgsel mislykkes med

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Hvis du bruger disse udbydere, skal du hente `-web`-tagget for den kanal, du allerede bruger — intet andet ændres. Ved en npm/CLI-installation (uden Docker-image) er den tilsvarende manglende komponent den binære browserfil: Kør `npx playwright install chromium` på værten.

#### Brug af prerelease-kanalen

`next`-kanalen genopbygges ved hvert push til den aktuelle standardgren `release/v*` og udgives til både AMD64 og ARM64. Ældre vedligeholdelsesgrene kan ikke overskrive den. Kanalen leverer et image, der kan hentes, med rettelser, som er blevet flettet ind i den aktive release-gren, før det næste stabile tag oprettes.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

For Docker Compose skal du tilsidesætte det image-tag, der bruges af den valgte profil, og derefter hente og genoprette tjenesten:

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

`next` er en flydende kanal til forhåndsudgivelser. Den kan ændres ved ethvert push til den aktive release-gren og er **ikke understøttet til produktionsbrug**. Fastlås image-digesten, mens du evaluerer et bestemt build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Før du tester, skal du sikkerhedskopiere OmniRoute-datavolumenet eller den bind-monterede datamappe. For at rulle tilbage skal du gendanne den tidligere anvendte stabile version eller digest og genoprette containeren:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Et build fra en release-gren kan aldrig flytte `latest`; kun en kvalificeret stabil semantisk version kan promovere den stabile markør. `next`-imagene bevarer inspektionen af release-imaget og den blokerende kontrol for CRITICAL-sårbarheder.

**`latest` er ikke en garanti for, at indholdet er ajour med git.** Rettelser, der er flettet ind i `main` eller den aktive `release/v*`-gren, findes **ikke** i `:latest`, før et stabilt SemVer-image er udgivet, og udgivelsesjobbet promoverer `:latest` (samme digest som den pågældende SemVer). Hvis `latest` ser fastfrosset ud, mens GitHub allerede viser rettelsen, skal du hente `:next` for at teste release-grenen eller vente på SemVer-tagget.

| Du ønsker                                                                     | Brug                                    |
| ----------------------------------------------------------------------------- | --------------------------------------- |
| GitOps/produktion, som ikke må ændre sig utilsigtet                           | Fastlås `:X.Y.Z` (eller image-digesten) |
| Følge udgivne stabile versioner og acceptere genoprettelse ved hver udgivelse | `:latest`                               |
| Teste ikke-udgivne commits på `release/v*`                                    | `:next` (ikke til produktion)           |
| Teste `main`                                                                  | `:main` (ikke til produktion)           |

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

Én Node-proces er **én V8-heap**. To overlappende coding-agent-`POST /v1/responses` (RTK + Caveman) på ~3 MiB / ~750k tokens afbryder den pågældende heap ved ~12 Gi (`FATAL ERROR: Reached heap limit`) og kan medføre OOM i en cgroup på 16 Gi. Se [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Denne måling er en advarsel om **hukommelsesbudgettet**, ikke en fast produktgrænse på to samtidige lange `/v1/responses`. Adgang for tunge chatanmodninger styres af et automatisk afledt bytebudget for indlæsning (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), der dimensioneres ud fra den samme V8-/cgroup-grænse — hvis det tilsidesættes med en højere værdi (eller hvis det ældre loft for antal anmodninger, `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`, indstilles) i en proces, der allerede er dimensioneret, genindføres afbrydelsen. Små chats, `/healthz`, `/v1/models` og MCP er **ikke** omfattet af dette loft.

### Én proces: mere end to lange `/v1/responses`

En **sund** proces (heap under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, standardværdi `0.75`) **kan** køre mere end to samtidige lange `POST /v1/responses`, når det procesomfattende budget for igangværende bytes (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stadig har plads. Bodies på eller over `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (standardværdi 256 KiB) optager den samme tungvægtslease som strukturtunge anmodninger og bruger den samme [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom`-undtagelse (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Snesevis af samtidige lange SSE-klienter (operatører har ofte brug for 40–50) er et spørgsmål om **hukommelsesbudgettet** — dimensionér heap + primære/headroom-pladser + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ikke en fast produktgrænse på ”maks. 2”. En belastet heap afviser fortsat med en `503`, der kan forsøges igen, så #7849 ikke vender tilbage.

Sådan **mangedobles heaps** (uafhængige V8-old-spaces) **i dag**:

| Gør                                                                                                                                                                                      | Gør ikke                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Kør **N containere/pods**, hver med sin **egen** `DATA_DIR` / diskenhed                                                                                                                  | Indstil `replicas > 1` mod én SQLite-fil                          |
| Dimensionér tunge igangværende anmodninger + sund headroom ud fra heap-/bytebudgettet for igangværende data; 1–2 er den konservative standardværdi fra #7849, ikke en fast produktgrænse | Giv én proces 8× RAM og et ubegrænset loft for antal              |
| Valgfrit: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` til **delte kvotetællere**                                                                                                | Betragt Redis som delt SQLite — det er det ikke                   |
| Dupliker udbyderhemmeligheder i hver instans (eller acceptér opdelte dashboards)                                                                                                         | Forvent ét dashboard / én samlet opkaldslog på tværs af instanser |
| Placér en vilkårlig load balancer foran; sticky routing efter API-nøgle eller session er tilstrækkeligt                                                                                  | Kræv en leverandørspecifik, størrelsesbevidst middleware          |

Hardware: samtidige lange `/v1/responses` pr. instans er et spørgsmål om **hukommelsesbudgettet** (heap + igangværende bytes / #10110). `N` uafhængige `DATA_DIR`'er mangedobler stadig heaps: værtens RAM skal kunne rumme `N × cgroup`, ikke ”én pod på 16 Gi med N=8”. Brug aldrig `replicas > 1` på én SQLite-fil.

Compose-skitse (to heaps, to diskenheder — ikke `deploy.replicas: 2`):

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

Densitet i processen (komprimering flyttet væk fra HTTP-isolatet) er [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Én logisk klynge med delt persistent tilstand er [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

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
