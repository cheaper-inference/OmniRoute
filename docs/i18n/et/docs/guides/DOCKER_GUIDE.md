# 🐳 Docker Guide — OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Täielik Dockeriga juurutamise teatmik. Kiireks alustamiseks vaadake [README Dockerit käsitlevat jaotist](../README.md#-docker).

## Sisukord

- [Kiirkäivitus](#quick-run)
- [Keskkonnafailiga](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Saadaolevad profiilid](#available-profiles)
- [Hosti CLI-tööriistade seadistamine, kui OmniRoute töötab Dockeris](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redise külgkonteiner](#redis-sidecar)
- [Tootmiskeskkonna Compose](#production-compose)
- [Dockerfile'i etapid](#dockerfile-stages)
- [Kriitilised keskkonnamuutujad](#critical-environment-variables)
- [Docker Compose koos Caddyga (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare'i kiirtunnel](#cloudflare-quick-tunnel)
- [Tõmmisesildid](#image-tags)
- [Töölaua uuendamine Dockeris](#dashboard-updates-in-docker)
- [Kättesaadavus: vaikimisi SQLite toetab ühte replikat](#availability-default-sqlite-is-single-replica)
- [Gemini piirkondlikud vead Dockeris](#gemini-regional-errors-inside-docker)
- [Olulised märkused](#important-notes)

---

## Kiirkäivitus

> **Isehostimine ühe käsuga?** Vaadake
> [isehostimise juhendit](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (avaldatud tõmmis +
> Redis, ainult loopback-liides, profiili pole vaja valida). Allolev kiirkäivitus on
> ühe konteineri lahendus kasutajatele, kes juba käitavad Redist mujal.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Keskkonnafailiga

```bash
# Esmalt kopeerige ja muutke faili .env
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
# Põhiprofiil (ilma CLI-tööriistadeta)
docker compose --profile base up -d

# CLI-profiil (sisseehitatud Claude Code, Codex ja OpenClaw)
docker compose --profile cli up -d

# Hosti profiil (eelkõige Linuxile; ühendab hosti CLI-binaarfailid kirjutuskaitstult)
docker compose --profile host up -d

# Veebiprofiil (Chromium/Playwright veebiseansi pakkujate jaoks)
docker compose --profile web up -d

# CLI ja CLIProxyAPI külgkonteineri kombineerimine
docker compose --profile cli --profile cliproxyapi up -d
```

## Saadaolevad profiilid

OmniRoute sisaldab peamiste juurutusviiside jaoks Compose'i profiile. Valige oma keskkonnale sobiv profiil.

| Profiil            | Teenus           | Millal kasutada                                                                                                                                        | Käsk                                         |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (vaikimisi) | `omniroute-base` | Kasutajaliideseta server / minimaalne käituskeskkond, pakkujate CLI-sid pole kaasas                                                                    | `docker compose --profile base up -d`        |
| `cli`              | `omniroute-cli`  | Agenttöövood, mis kutsuvad välja `omniroute providers/setup/doctor`, ja kaasasolevad CLI-d (Codex, Claude Code, Droid, OpenClaw)                       | `docker compose --profile cli up -d`         |
| `host`             | `omniroute-host` | Linuxi hostid, mis soovivad hosti CLI-dele `network_mode`-laadset juurdepääsu, ühendades `~/.local/bin`, `~/.codex`, `~/.claude` jne kirjutuskaitstult | `docker compose --profile host up -d`        |
| `cliproxyapi`      | `cliproxyapi`    | [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) külgkonteineri käitamine pordil `8317` ülesvoolu CLI-puhverserveri jaoks                   | `docker compose --profile cliproxyapi up -d` |
| `web`              | `omniroute-web`  | Brauserit vajavad veebiseansi pakkujad: `gemini-web`, `claude-web`, `claude-turnstile` (ehitab `runner-web`; Chromium on kaasas)                       | `docker compose --profile web up -d`         |

> Mitut profiili saab kombineerida: `docker compose --profile cli --profile cliproxyapi up -d`.

## Hosti CLI-tööriistade seadistamine, kui OmniRoute töötab Dockeris

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ja juhtpaneeli nupp
**Salvesta konfiguratsioon** kirjutavad kõik faile, nagu `~/.codex/*.config.toml`. Neil teedel
on tähendus ainult masinas, kus CLI tegelikult töötab. Kui käivitate need
konteineris, kirjutatakse fail konteineri enda kodukataloogi (`/home/node` —
tõmmis töötab kasutajana `USER node`), kust ükski hosti CLI seda kunagi ei loe ja kus see
konteineri taasloomisel kohe kustutatakse.

OmniRoute tuvastab selle ja keeldub kirjutamisest, kuvades juhised, selle asemel et
teatada edust, mida te kasutada ei saa: CLI lõpetab töö koodiga `2` ja API vastab koodiga `422`
ning väärtusega `containerEphemeralTarget: true`.

### Soovitus: käivitage CLI hostis ja OmniRoute Dockeris

Konteiner teenindab API-t; CLI seadistab teie hosti tööriistu.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # suuna CLI konteinerile
omniroute setup-codex                      # kirjutab hostis tegelikku kataloogi ~/.codex
```

See on õige valik, kui Codex, Claude Code, Cursor või mõni sarnane tööriist töötab teie
sülearvutis — see on tavapärane seadistus.

### Alternatiiv: ühendage hosti konfiguratsioonikataloogid siduvate haakimistega (`host`-profiil)

Kui soovite, et konteiner ise kirjutaks teie hosti konfiguratsiooni, haakige
kataloogid konteinerisse ja määrake `CLI_CONFIG_HOME` haakimise juurkataloogile. `host`-profiil
teeb seda juba:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Siduv haakimine muudab tee usaldusväärseks: OmniRoute loeb faili
`/proc/self/mountinfo` ja lubab kirjutada haagitud teedele (ning kataloogidesse,
mille alamkataloogid on haagitud — täpselt nagu ülaltoodud `/host-home`), keeldudes
samal ajal kirjutamast haakimata teedele.

### Varuväljapääs: seadistage konteineri enda CLI-d (kasutage säästlikult)

Kui CLI-d asuvad tõepoolest konteineris (`cli`-profiil), on kirjutamine
tahtlik. Edastage mis tahes `setup-*`-käsule `--allow-container-write` või määrake
serveri jaoks `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Kirjutamine jätkub
hoiatusega, et andmed ei säili pärast konteineri eemaldamist.

> **Turvahoiatus — `cli`-profiil + `docker.sock`-haakimine.**
> `cli`-profiil haagib faili `/var/run/docker.sock`, et konteinerisisene
> automaatvärskendaja saaks hosti deemoni kaudu pinumiku uuesti luua
> (`src/lib/system/autoUpdate.ts` kontrollib selle sokli olemasolu ja jätab
> Dockeri tee vahele, kui see puudub). See sokkel on **hosti juurkasutaja taseme
> usalduspiir**: kõik, mis sellele ligi pääseb, juhib hosti Dockeri deemonit
> juurkasutajana — see saab luua, kontrollida, peatada ja eemaldada hostis mis tahes konteineri.
> Tagajärjed:
>
> 1. **Ärge kunagi avage `cli`-profiili porti võrgule.** Avaldage
>    see aadressil `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — kohtvõrgust ligipääsetav `cli`-profiil muudab mis tahes juhtpaneeli taseme RCE
>    hosti täielikuks kompromiteerimiseks.
> 2. **Ärge siduge `cli`-profiiliga täiendavaid hosti katalooge.**
>    Dockeri sokkel koos mis tahes täiendava haakimisega annab konteinerile täieliku
>    lugemis- ja kirjutusõiguse teie failisüsteemile ning hosti konfiguratsioonile. Kui tööriist peab
>    projektile ligi pääsema, käivitage see CLI-binaarfailiga lokaalselt — ärge haakige projekti
>    `cli`-konteinerisse.
>
> Kui te ei vaja konteinerisisest automaatvärskendust, jätke `cli`-profiil välja
> (`COMPOSE_PROFILES=core,redis` või lühem variant). Teised profiilid ei
> haagi Dockeri soklit.
>
> Seotud MITM-i ohumudelit kirjeldab `docs/security/MITM-TPROXY-DECRYPT.md` (gitis; seda ei kompileerita kataloogi `/docs`)
> ning `docs/security/SUPPLY_CHAIN.md` kirjeldab
> `codex`/`claude-code`/`droid`/`openclaw`-binaarfailide päritoluahelat.

## Redis-külgkonteiner

OmniRoute kasutab Redist hajutatud päringusageduse piiraja ja jagatud vahemälu toetamiseks. Teenus `redis` on failis `docker-compose.yml` **alati määratletud** (sellel puudub profiilipiirang) ning see käivitub koos mis tahes muu profiiliga.

| Üksikasjad                  | Väärtus                                   |
| --------------------------- | ----------------------------------------- |
| Tõmmis                      | `redis:7-alpine`                          |
| Konteineri nimi             | `omniroute-redis`                         |
| Sisemine port               | `6379`                                    |
| Hostport (ülekirjutatav)    | `REDIS_PORT` (vaikimisi `6379`)           |
| Hostiliides (ülekirjutatav) | `REDIS_BIND_HOST` (vaikimisi `127.0.0.1`) |
| Andmeköide                  | `omniroute-redis-data` → `/data`          |
| Tervisekontroll             | `redis-cli ping` (10 s intervall)         |

Seotud keskkonnamuutujad:

- `REDIS_URL` — rakendusse sisestatav ühendusstring (vaikimisi `redis://redis:6379`).
- `REDIS_PORT` — Redis-konteineri hostipoolse pordivastenduse port.
- `REDIS_BIND_HOST` — hostiliides, millel port avaldatakse. Vaikimisi `127.0.0.1`.

> **Miks kasutatakse vaikimisi loopback-liidest:** külgkonteiner töötab ilma suvandita `requirepass` ja rakenduse
> konteinerid pääsevad sellele ligi compose'i võrgu kaudu (`redis:6379`) — avaldatud port on
> mõeldud ainult hostipoolsetele tööriistadele (`redis-cli`, kohalik `npm run dev`). Pordi avaldamine aadressil
> `0.0.0.0` muudaks autentimata Redise kättesaadavaks kõigile teie kohtvõrgu hostidele. Kui määrate
> `REDIS_BIND_HOST=0.0.0.0`, lisage teenuse väljale `command:` ka `--requirepass`.

**Redise keelamine** pole soovitatav (päringusageduse piiraja lülitub piiratud funktsionaalsusega mälupõhisele varulahendusele). Kui see on siiski vajalik, eemaldage või kommenteerige teenuseplokk `redis:` failis `docker-compose.yml` või vähendage selle eksemplaride arv nullini:

```bash
docker compose up -d --scale redis=0
```

## Tootmiskeskkonna Compose

Arenduskeskkonnaga paralleelselt töötava isoleeritud tootmiskeskkonna hetktõmmise jaoks kasutage faili `docker-compose.prod.yml`.

| Üksikasjad            | Väärtus                                                                             |
| --------------------- | ----------------------------------------------------------------------------------- |
| Fail                  | `docker-compose.prod.yml`                                                           |
| Juhtpaneeli vaikeport | `PROD_DASHBOARD_PORT=20130` (vastendatud sisemisele `${DASHBOARD_PORT:-20128}`)     |
| API vaikeport         | `PROD_API_PORT=20131`                                                               |
| Tõmmis                | `omniroute:prod` (koostatud sihtmärgist `runner-cli`)                               |
| Redis-konteiner       | `omniroute-redis-prod` (`redis:8.6.2`, eraldiseisev andmeköide `redis-prod-data`)   |
| Andmeköide            | `omniroute-prod-data` (nimega, säilib pärast uuesti koostamist)                     |
| Tervisekontrollid     | `node healthcheck.mjs` + `redis-cli ping`, kus `depends_on` sõltub Redise tervisest |

Kasutamine:

```bash
# Koosta ja käivita tootmiskeskkonna pinu
docker compose -f docker-compose.prod.yml up -d --build

# Voogedasta logisid
docker compose -f docker-compose.prod.yml logs -f

# Peata ja eemalda pinu (säilita andmeköited)
docker compose -f docker-compose.prod.yml down
```

Tootmiskeskkonna pinu töötab arenduskeskkonna compose'i pinuga paralleelselt (konteinerite nimed, pordid ja andmeköited on erinevad), seega saate jätkata kohalikku arendamist, samal ajal kui tootmiskeskkond jääb tööle.

## Dockerfile'i etapid

Hoidla sisaldab mitmeetapilist Dockerfile'i (`Dockerfile`). Saadaval on neli etappi; vali oma kasutusjuhu jaoks õige `target`.

| Etapp         | Baastõmmis            | Otstarve                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installib sõltuvused (`npm ci --legacy-peer-deps`) ja käivitab `npm run build` (vaikimisi Turbopack — vaata allpool jaotist „Ehitusaegsed ressursid”)                                                                                                                               |
| `runner-base` | `node:26-trixie-slim` | Tootmiskäituskeskkond Next.js-i autonoomse väljundiga. **Teenusepakkujate CLI-sid ei kaasata.**                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Lisab `git`, `docker.io`, `docker-compose` ja globaalsed CLI-d: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Vali see agentpõhiste töövoogude jaoks.**                                                                                                      |
| `runner-web`  | `runner-base`         | Lisab Playwrighti ja Chromiumi brauseri (`--with-deps`) veebiseansi pakkujate jaoks: `gemini-web`, `claude-web`, `claude-turnstile`. **Vali see nende pakkujate kasutamisel** — tavaline tõmmis nurjub ilma selleta päringu ajal (vaata väljalaskekanalite jaotise märkust `-web`). |

Konkreetse sihtmärgi käsitsi ehitamine:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ehitusaegsed ressursid

Kolm ehitusargumenti määravad etapi `builder` ressursikulu. Need kehtivad ainult ehitamise ajal —
`OMNIROUTE_MEMORY_MB` (allpool) on eraldiseisev käitusaegne seadistus.

| Ehitusargument              | Vaikeväärtus | Mõju                                                                                  |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` ehitab webpackiga: väiksem mälu tippkasutus, kuid aeglasem. `1` lubab Turbopacki. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | V8 kuhjamälu ülempiir (`--max-old-space-size`) käivitatud protsessile `next build`.   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Määrab `CIRCLE_NODE_TOTAL`; Next tuletab leheandmete kogumiseks `workers = N - 1`.    |

`OMNIROUTE_BUILD_WORKERS` on parameeter, mida võimsas ehituskeskkonnas suurendada ja mida
kahtlustada, kui piiratud ressurssidega ehitus nurjub **pärast** teadet `✓ Compiled successfully`. Iga
leheandmete tööprotsess on eraldi protsess, nagu ka emaprotsess `next build`;
reaalses VPS-i reproduktsioonis (probleem #7518) mõõdeti iga protsessi RSS-i
tippväärtuseks ~4,5 GB olenemata kuhjamälu lipust `NODE_OPTIONS` (Turbopack kompileerib
V8 kuhjamälust väljaspool asuvas natiivses/Rusti mälus). Vaikeväärtus `2` (→ 1 tööprotsess, kokku 2
protsessi) on kohandatud 16 GB / 4 vCPU-ga GitHubi hostitud käitajatele, mida
avaldamiskonveier kasutab. Väärtusega `8` (→ 7 tööprotsessi) sai selle käitaja mälu otsa ja
buildkit nurjas etapi veaga `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 tööprotsessi) ei mahtunud samuti, kui protsessipõhist RSS-i mõõdeti
tuletamise asemel otse. `tests/unit/docker-build-memory-budget.test.ts`
teeb mõõdetud väärtuse põhjal arvutused ja nurjub, kui kumbki seadistus
ületab käitaja ressursid.

Turbopack kompileerib natiivses Rusti mälus, mis asub **väljaspool** V8 kuhjamälu, mistõttu
`OMNIROUTE_BUILD_MEMORY_MB` seda ei piira. Mälu ülempiiriga hostis
lõpetab OOM-i tõrjuja ehituse SIGKILLiga ilma ühegi veatekstita — see lihtsalt
peatub poole tegevuse `Creating an optimized production build` pealt, mis näib pigem
hangumise kui mälu lõppemisena. Seetõttu kasutab `Dockerfile` vaikimisi webpacki
(`OMNIROUTE_USE_TURBOPACK=0`), erinevalt käskudest `npm run dev` / `npm run build`, kus
Turbopack on koodi vaikevalik: ilma ehitusargumentideta käsk `docker build .` (mida
käitavad Railway ja teised ühe klõpsuga hostid) ei tohi piiratud mäluga
ehituskeskkonnas vaikselt nurjuda. Avaldatud tõmmised edastavad juba parameetri `OMNIROUTE_USE_TURBOPACK=0`
failis `docker-publish.yml` selgesõnaliselt. Rohke muutmäluga ehituskeskkonnas luba
kiiremaks ehitamiseks Turbopack:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` on lubatud, seega käivitab `next build` nii ema- **kui ka** tööprotsessi
ning kumbki järgib `OMNIROUTE_BUILD_MEMORY_MB` väärtust eraldi. Määra konteineri
ülempiir sellest väärtusest ligikaudu kaks korda suuremaks, mitte sellega võrdseks.

Selles lähtekoodipuus mõõdetud (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pakendaja | Konteineri ülempiir | Tulemus                            |
| --------- | ------------------- | ---------------------------------- |
| Turbopack | 8 GiB / 16 GiB      | OOM lõpetas mõlemad vaikselt       |
| webpack   | 8 GiB               | tööprotsess lõpetati SIGKILLiga    |
| webpack   | 12 GiB              | õnnestus, tippkasutus oli 11,1 GiB |

### Käitusaja vaikeväärtused

Etapi `runner-base` eksporditavad vaikeväärtused: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Mälukäitumine Dockeris:

- Tõmmis määrab `OMNIROUTE_MEMORY_MB=1024` ja tuletab sellest `NODE_OPTIONS=--max-old-space-size=1024`.
- Tegeliku serveriprotsessi käivitab eraldiseisev käivitaja, mis loeb muutujat `OMNIROUTE_MEMORY_MB` ja lisab `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node kasutab viimast korduvat `--max-old-space-size` väärtust, seega juhib `OMNIROUTE_MEMORY_MB` Dockeris tegelikult kehtivat kuhjamälu piirangut.
- Kuna tõmmis määrab selle alati, ei rakendu käivitaja enda RAM-i järgi kalibreeritud varuväärtus Dockeris kunagi. Suurendage seda töökoormuse jaoks sõnaselgelt (vt allolevat tabelit). `2048` on kodeerimisagendi `/v1/responses` jaoks endiselt liiga väike.

### Kodeerimisagentide käitusaegne RAM

Dockeri 1 GiB vaikeväärtus on juhtpaneeli ja kerge vestluse miinimum, mitte tootmiskeskkonnale sobiv maht. Pikad `POST /v1/responses` päringukehad (sajad sõnumid, kümned tööriistad) hoiavad tihendamise ajal mälus mitut graafi. Kaks kattuvat ~3 MiB / ~750k-tokenilist päringut on põhjustanud V8 töö katkemise **12 GiB** old-space'i juures (`FATAL ERROR: Reached heap limit`) ning tabanud ka 16 GiB cgroup'i OOM-i. Vt [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Määrake **cgroup'i `--memory` kuhjamälust suuremaks** — omapuhvrid, SQLite ja tihendamise vahetulemused asuvad väljaspool V8-t.

| Töökoormus                                     | `OMNIROUTE_MEMORY_MB`         | Konteiner / cgroup       | Märkused                                                                                                                                     |
| ---------------------------------------------- | ----------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Juhtpaneel, üks kerge vestlus                  | `1024` (tõmmise vaikeväärtus) | ≥2 GiB                   |                                                                                                                                              |
| Üks kodeerimisagent (Claude/Codex/Grok)        | `8192`                        | ≥10 GiB                  | Tüüpiline ühe seansi `/v1/responses`                                                                                                         |
| Kaks samaaegset pikka `/v1/responses` päringut | `10240`–`12288`               | ≥12–16 GiB               | Mõõdetud V8 katkestus ~12 GiB kuhjamälu juures                                                                                               |
| Kolm või enam samaaegset pikka konteksti       | mitte ühes protsessis         | jadastage / rohkem RAM-i | Vaikimisi lubatakse korraga 1 ressursimahukas pooleliolev päring; selle arvu suurendamine ilma täiendava RAM-ita põhjustab katkestuse uuesti |

Paljasmetallis töötav `omniroute serve` kalibreerib umbes 35% RAM-ist (piiratuna vahemikku `[512, 4096]`), kui `OMNIROUTE_MEMORY_MB` on **määramata**. Docker määrab alati väärtuse `1024`, mistõttu seda kalibreerimist ametlikus tõmmises kunagi ei käivitata.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kriitilised keskkonnamuutujad

Lisaks failis [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumenteeritud vaikeväärtustele on Dockeris käitamisel kõige olulisemad järgmised muutujad:

| Muutuja                       | Otstarve                                                                                                                                                                                                                                                                                                      | Vaikeväärtus              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocketi silla jagatud saladus. **Tootmiskeskkonnas nõutav** — määrake tugev juhuslik string.                                                                                                                                                                                                               | määramata (tuleb määrata) |
| `REDIS_URL`                   | Kiirusepiiraja / vahemälu taustteenuse ühendusstring                                                                                                                                                                                                                                                          | `redis://redis:6379`      |
| `REDIS_PORT`                  | Komplekti kuuluva Redise konteineri hostipoolne port                                                                                                                                                                                                                                                          | `6379`                    |
| `REDIS_BIND_HOST`             | Hostiliides, millel komplekti kuuluva Redise port avaldatakse (tagasisideaadress, kui te ei lisa autentimist)                                                                                                                                                                                                 | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Hosti tee, mis ühendatakse isevärskenduse töövoogude jaoks `cli` profiilis asukohta `/workspace/omniroute`                                                                                                                                                                                                    | `.` (praegune kataloog)   |
| `OMNIROUTE_MEMORY_MB`         | Dockeris töötava autonoomse serveri Node'i kuhjamälu ülempiir käitusajal; alistab ülaltoodud tõmmise vaikeväärtuse. Programmeerimisagendid: `8192`+ (vt [käitusaegne muutmälu](#runtime-ram-for-coding-agents)).                                                                                              | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | Alistab juhtpaneeli (20128) ja API (20129) avaldatud pordid                                                                                                                                                                                                                                                   | `20128` / `20129`         |
| `APP_BIND_HOST`               | Hostiliides, millel docker-compose avaldab juhtpaneeli/API/live-WS-i pordid. Väärtusega `REQUIRE_API_KEY=false` (vaikeväärtus) teeb `0.0.0.0` anonüümse `/v1` puhverserveri kohtvõrgule kättesaadavaks — laiendage juurdepääsu ainult väärtusega `REQUIRE_API_KEY=true` või eespaikneva pöördpuhverserveriga. | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | Hostiliides, millel docker-compose avaldab `cliproxyapi` kaaskonteineri — selle andmeköide sisaldab teenusepakkuja identimisteavet.                                                                                                                                                                           | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | Kataloog, mida käitusaegne pistikprogrammide skanner loeb ja kuhu see pistikprogramme installib. Määrake see, kui pistikprogrammid ühendatakse sidumishaakena: vaikeväärtus järgib muutujat `HOME`, mida tõmmis ei pruugi eksportida.                                                                         | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | URL-i alamtee, kui rakendus avaldatakse pöördpuhverserveri taga (nt `/omniroute`)                                                                                                                                                                                                                             | _(tühi = juur)_           |
| `NEXT_PUBLIC_BASE_URL`        | Avalik brauseri lähtekoht koos alamteega (nt `https://host/omniroute`)                                                                                                                                                                                                                                        | määramata                 |
| `PROD_DASHBOARD_PORT`         | Faili `docker-compose.prod.yml` hostipoolne juhtpaneeli port                                                                                                                                                                                                                                                  | `20130`                   |
| `CLIPROXYAPI_PORT`            | Kaaskonteineri `cliproxyapi` hostipoolne port                                                                                                                                                                                                                                                                 | `8317`                    |

## Pöördproksi alamteel (Traefik / nginx)

Next.js-i `basePath` kompileeritakse autonoomsesse paketti. OmniRoute salvestab paketti
lisatud väärtuse rakenduse juurkaustas asuvasse kontrollfaili (kirjutatakse käsu
`npm run build` ajal; loetakse skriptiga `scripts/docker/ensure-docker-base-path.mjs`)
ning võrdleb seda konteineri käivitumisel muutujaga `OMNIROUTE_BASE_PATH`. Kui väärtused
erinevad ja tõmmis loodi domeeni juurtee jaoks, kirjutab sisenemispunkt enne
`node dev/run-standalone.mjs` käivitamist ümber autonoomse paketi manifestid, manustatud
`basePath`/`assetPrefix` literaalid (Next 16 renderdab SSR-i varade URL-id ainult
`assetPrefix` põhjal — parandaja peegeldab alamtee ka sinna), paketti lisatud
`/_next/static` varade URL-id (kliendiviidete manifestid, meediaimpordid, eelrenderdatud
vealehed) ja kliendi `process.env` vahekihi.

### Compose'i järguga loomine (soovitatav)

Määrake mõlemad muutujad failis `.env` ja looge tõmmis seejärel uuesti, et tõmmise ning
käituskeskkonna seadistus ühtiks:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` edastab muutuja `OMNIROUTE_BASE_PATH` nii Dockeri järguargumendi
kui ka käituskeskkonna muutujana.

### Eelvalmistatud juurtee tõmmis + käitusaegne alamtee

Avaldatud `diegosouzapw/omniroute:*` tõmmised on loodud domeeni juurtee jaoks.
`OMNIROUTE_BASE_PATH` saab siiski määrata käitusajal; konteiner parandab paketti
käivitumisel ühe korra. Kasutage koos sellega vastavat avalikku lähteaadressi:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Seadistage pöördproksi edastama **täielikku** välist teed (ärge eemaldage prefiksit).
Traefik peab suunama `PathPrefix(`/omniroute`)` konteinerisse ilma `StripPrefix`-ita,
et Next.js saaks päringud kujul `/omniroute/...` ja serveeriks varasid asukohast
`/omniroute/_next/...`.

Dockeri tervisekontroll kontrollib kerget elutsükli lõpp-punkti `/healthz`, millele
lisatakse aktiivne `OMNIROUTE_BASE_PATH` prefiks. `/api/monitoring/health` jääb
inimestele ja juhtpaneelidele diagnostikaks kättesaadavaks; konteineri HEALTHCHECK-i
sellele tagasi suunamiseks (näiteks põhjaliku tervisekontrolli jõustamiseks) määrake
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. See tee teeb **põhjaliku**
kontrolli (andmebaas + seirekokkuvõte) — see sobib Dockeri harva käivitatava
`HEALTHCHECK`-i jaoks, kui otsustate selle uuesti kasutusele võtta, kuid **mitte**
Kubernetese `livenessProbe` intervallidega kasutamiseks.

Orkestreerimisplatvormide (Kubernetes, Nomad jne) korral:

| Kontroll                 | Eelistage                                                        | Vältige                                                        |
| ------------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| Elusolek                 | HTTP `GET /livez` või TCP põhipordil (`PORT`, vaikimisi `20128`) | `/api/monitoring/health` elusoleku kontrollina                 |
| Valmisolek               | HTTP `GET /healthz`                                              | Lühikesi ajalõppe, mis peavad hõivatud sündmusetsüklit surnuks |
| Põhjalik / väliskontroll | `/api/monitoring/health`                                         | —                                                              |

`/healthz` annab teada protsessi elutsükli olekust (`ok` / `starting` / `stopping`).
`/livez` kontrollib ainult protsessi elusolekut (tagastab 200 alati, kui töötleja saab
käivituda; see ei oota valmisolekut). Mõlemad töötavad siiski päringute töötlemisega
samas Node'i sündmusetsüklis, mistõttu protsessorimahukas kataloogi- või pakkimistöö
võib neid viivitada — hõivatud ≠ surnud. Kui HTTP-kontrollid aeguvad, eelistage TCP
elusolekukontrolli. Täielikud kontrollijuhised:
[Seirejuhend — Kubernetese kontrollide soovitused](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose koos Caddyga (HTTPS-i automaatne TLS)

OmniRoute'i saab turvaliselt avalikustada Caddy automaatse SSL-i seadistamise abil. Veenduge, et teie domeeni DNS-i A-kirje osutaks teie serveri IP-aadressile.

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
      # Brauserile nähtav lähtekoht OAuth-i tagasikutsete, töölaua linkide ja genereeritud avalike URL-ide jaoks.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Serveritevaheline sisemine URL ajastatud tööde ja isepäringute jaoks.
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

Caddy määrab ülesvoolu konteineri jaoks standardsed edastuspäised. OmniRoute kasutab
`NEXT_PUBLIC_BASE_URL`-i OAuth-i tagasikutsete ja genereeritud avalike linkide kanoonilise avaliku
lähtekohana; autenditud töölaua kirjutuspäringud kasutavad sama lähtekoha päringuid koos seansiga seotud CSRF-i
kaitsega. Lubage `OMNIROUTE_TRUST_PROXY` ainult täiustatud juurutuste puhul, kus soovite tahtlikult,
et OmniRoute tuletaks avaliku lähtekoha selgesõnalise konfiguratsiooni asemel usaldusväärsetest edastuspäistest.

## Cloudflare Quick Tunnel

Dockeri juurutuste töölauatugi sisaldab ühe klõpsuga **Cloudflare Quick Tunnelit** lehel `Dashboard → Endpoints`. Esmakordsel lubamisel laaditakse `cloudflared` alla ainult vajaduse korral, käivitatakse ajutine tunnel teie praeguse `/v1` lõpp-punktini ning genereeritud `https://*.trycloudflare.com/v1` URL kuvatakse otse teie tavapärase avaliku URL-i all.

Lõpp-punktide tunnelipaneele (Cloudflare, Tailscale, ngrok) saab lehel `Settings → Appearance` kuvada või peita ilma aktiivse tunneli olekut muutmata.

### Märkused tunneli kohta

- Quick Tunneli URL-id on ajutised ja muutuvad pärast iga taaskäivitust.
- Quick Tunneleid ei taastata pärast OmniRoute'i või konteineri taaskäivitamist automaatselt. Vajaduse korral lubage need töölaualt uuesti.
- Hallatud installimine toetab praegu Linuxit, macOS-i ja Windowsi arhitektuuridel `x64` / `arm64`.
- Hallatud Quick Tunnelid kasutavad vaikimisi HTTP/2 transporti, et vältida piiratud konteinerikeskkondades QUIC UDP puhvri häirivaid hoiatusi. Kui soovite muud transporti, määrake `CLOUDFLARED_PROTOCOL=quic` või `auto`.
- Dockeri tõmmised sisaldavad süsteemi CA-juursertifikaate ja edastavad need hallatud `cloudflared`-ile, mis väldib TLS-i usaldusvigu tunneli konteineris käivitamisel.
- Kui soovite, et OmniRoute kasutaks allalaadimise asemel olemasolevat binaarfaili, määrake `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Tõmmise sildid

| Tõmmis                   | Silt     | Suurus | Kirjeldus                                                 |
| ------------------------ | -------- | ------ | --------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Kõrgeim **avaldatud** stabiilne SemVer (mitte git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Kinnitage seda tüüpi silt GitOpsi jaoks                   |

Mitme platvormi manifest: omapärased `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker valib sobiva arhitektuuri automaatselt; kui peate ARM-hostidel AMD64 emulatsiooni sundima, edastage `--platform linux/amd64`.

### Väljalaskekanalid

OmniRoute avaldab eraldi Dockeri kanalid stabiilsete väljalasete, aktiivse väljalaskeharu testimise ja arenduskoostude jaoks.

| Kanal                           | Allikas                                | Muudetavus                 | Soovitatav kasutus                                                                                                                          |
| ------------------------------- | -------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Allkirjastatud/versioonitud väljalase  | Muutumatu                  | Tootmisjuurutused, mis on kinnitatud täpsele väljalaskele                                                                                   |
| `:latest` / `:latest-web`       | Kõrgeim **avaldatud** stabiilne SemVer | Muudetav stabiilne viit    | Järgib stabiilseid väljalaskeid **pärast** SemVeri avaldamistööd — ei järgi **ei** haru `main` **ega** avaldamata `release/v*` sissekandeid |
| `:next` / `:next-web`           | Praegune vaikimisi `release/v*` haru   | Muudetav eelväljalaskeviit | Paranduste testimine, mis on jõudnud aktiivsesse väljalaskeharusse, kuid pole veel stabiilses väljalaskes                                   |
| `:main` / `:main-web`           | `main` haru                            | Muudetav arendusviit       | Ainult arendus- ja integratsioonitestimiseks                                                                                                |

#### Veebiseansi pakkujad: `-web` tõmmised

Kõik ülaltoodud kanalid on saadaval ka `-web` sildina (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), mis koostatakse etapist `runner-web` — sama tõmmis koos Playwrighti ja Chromiumi brauseriga. Tavaline tõmmis tarnitakse **ilma** Chromiumita; `gemini-web`, `claude-web` ja `claude-turnstile` vajavad seda.

Tõrge ilmneb hiljem, mitte käivitamisel: need pakkujad loetlevad oma mudelid ja kuvatakse töölaual ühendatuna ning alles esimene päring nurjub teatega

```
[500]: Välise mooduli playwright laadimine nurjus: Viga: moodulit ei leitud
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Kui kasutate neid pakkujaid, tõmmake kasutatava kanali `-web` silt — midagi muud ei muutu. npm-i/CLI installi korral (ilma Dockeri tõmmiseta) on samaväärne puuduv komponent brauseri binaarfail: käivitage hostis `npx playwright install chromium`.

#### Eelväljalaskekanali kasutamine

Kanal `next` ehitatakse uuesti iga tõuke korral praegusesse vaikimisi `release/v*` harusse ning avaldatakse nii AMD64 kui ka ARM64 jaoks. Vanemad hooldusharud ei saa seda üle kirjutada. Kanal pakub allalaaditavat tõmmist parandustega, mis on enne järgmise stabiilse sildi loomist aktiivsesse väljalaskeharusse mestitud.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose'i puhul kirjuta valitud profiili kasutatav tõmmise silt üle, seejärel laadi tõmmis alla ja loo teenus uuesti:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Ohutus ja tagasipööramine

`next` on ujuv eelväljalaskekanal. See võib aktiivsesse väljalaskeharusse tehtud iga tõuke korral muutuda ja **seda ei toetata tootmiskeskkonnas kasutamiseks**. Konkreetse järgu hindamise ajaks kinnista tõmmise räsi:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Enne testimist varunda OmniRoute'i andmeköide või bind-mount'iga ühendatud andmekataloog. Tagasipööramiseks taasta varem kasutatud stabiilne versioon või räsi ja loo konteiner uuesti:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Väljalaskeharu järk ei saa kunagi muuta silti `latest`; stabiilse viida saab edasi viia ainult sobiv stabiilne semantiline versioon. `next`-tõmmiste puhul säilivad väljalasketõmmise kontroll ja blokeeriv CRITICAL-taseme haavatavuste kontrollvärav.

**`latest` ei taga giti suhtes ajakohasust.** Harusse `main` või aktiivsesse `release/v*` harusse mestitud parandused **ei sisaldu** sildiga `:latest` tõmmises enne, kui avaldatakse stabiilne SemVer-tõmmis ja avaldamistöö viib sildi `:latest` edasi (sama räsi nagu sellel SemVer-il). Kui `latest` näib tardunud, kuigi GitHub juba kuvab parandust, laadi väljalaskeharu testimiseks alla `:next` või oota SemVer-silti.

| Soov                                                                                           | Kasuta                               |
| ---------------------------------------------------------------------------------------------- | ------------------------------------ |
| GitOps/tootmiskeskkond, mis ei tohi triivida                                                   | Kinnista `:X.Y.Z` (või tõmmise räsi) |
| Järgi avaldatud stabiilseid versioone ja aktsepteeri teenuse taasloomist iga väljalaske korral | `:latest`                            |
| Testi avaldamata `release/v*` sissekandeid                                                     | `:next` (mitte tootmiskeskkonnas)    |
| Testi haru `main`                                                                              | `:main` (mitte tootmiskeskkonnas)    |

## Juhtpaneeli uuendused Dockeris

Avaldatud tõmmisest loodud konteiner ei saa iseennast asendada. Kui OmniRoute tuvastab, et see töötab
konteineris (puudub `.git`-väljavõte ja tegemist pole npm-i installiga), kuvab avalehe juhtpaneeli uuendusriba
npm-i/git-i juhiste asemel käivitatavat hostikäsku koos kopeerimisnupuga:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Teenuse nimi pärineb muutujast `AUTO_UPDATE_SERVICE` (vaikeväärtus on `omniroute`, faili
`docker-compose.selfhost.yml` teenus). `pull` uuendab ainult liikuvat silti (`latest`, `next`); fikseeritud
`:X.Y.Z` sildi korral muutke esmalt silti.

### Ühe klõpsuga uuendused hosti päästikufaili abil

Et **Uuenda kohe** töötaks ilma `/var/run/docker.sock`-i haakimata (mis annab konteinerile
hostis juurkasutaja õigused — vt eespool olevat `cli` profiili hoiatust), määrake OmniRoute’i teenuses
`DOCKER_UPDATE_TRIGGER_FILE` ja käivitage hostis jälgija:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Tee peab asuma kataloogis `DATA_DIR` (suhtelised väärtused lahendatakse selle suhtes); kõik muu
lükatakse tagasi. Seejärel kirjutab **Uuenda kohe** sellesse faili
`{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`, vastab koodiga `202` ning juhtpaneel küsitleb
aadressi `/api/system/version`, kuni uus versioon töötab, ja laadib lehe uuesti. Selles režiimis ei
käivita OmniRoute kunagi kesta- ega Dockeri käsku. Nagu kõigi uuendamistoimingute puhul, võetakse
taotlus vastu ainult tagasisideahela-/LAN-klientidelt.

Sidushaagitud andmekataloog annab hostile jälgimiseks püsiva tee. `systemd` näidisüksused
(kohandage `/srv/omniroute` kataloogiks, mis sisaldab teie compose-faili ja kataloogi `data/`):

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

Teenus eemaldab taotluse enne tõmbamist, et nurjunud käivitus ei jääks korduma. Ilma
`DOCKER_UPDATE_TRIGGER_FILE`-ita säilitab juhtpaneel käsitsi käskude töövoo.

## Käideldavus: vaikimisi SQLite toetab üht replikaati

Dockeris/Kubernetesis kasutatav standardne OmniRoute on **üks Node’i protsess + üks SQLite’i kirjutaja**. Kõrge käideldavus ei ole selle topoloogia korral **toetatud**.

| Piirang                                                  | Tagajärg                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Üks kirjutaja                                            | **Ärge** käivitage sama SQLite’i faili suhtes mitut replikaati. See rikub andmebaasi.                                                                                                                                                                                                                                                               |
| Taasloomine / taaskäivitamine / HEALTHCHECK-i lõpetamine | Töös olevad SSE-ühendused, juhtpaneeli seansid ja mälusisene olek katkevad **täielikult**. Kõigi ühendatud klientide ühendus katkeb. Tühja lõpp-punkti akna ajal saavad uued taotlused pöördpuhverserverilt vastuse **`502 Bad Gateway: Unknown error`**, mitte OmniRoute’i JSON-i — kliendid ei saa seda teenusepakkuja tõrkest eristada (#11015). |
| Sama sündmusetsükkel mis `/healthz`-il                   | Hõivatud kataloogi- või tihendustsükkel võib kontrolle viivitada; lühike ajalõpp taaskäivitab seejärel **ainsa** replikaadi.                                                                                                                                                                                                                        |

**Kontrollide maatriks** (vt ka [Kubernetesi kontrollide soovitusi](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Kontroll                  | Sihtmärk                                                        | Ärge kasutage                                                      |
| ------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| Elujõulisus               | TCP pordil `PORT` (vaikimisi `20128`) või leebe HTTP `/healthz` | `/api/monitoring/health`                                           |
| Valmisolek                | HTTP `GET /healthz`                                             | Lühikesi ajalõppe, mis käsitlevad hõivatud sündmusetsüklit surnuna |
| Süvakontroll / inimestele | `/api/monitoring/health`                                        | Automatiseeritud kubeleti elujõulisuskontrolli                     |

**Uuendused:** arvestage, et kõik seansid katkevad. Võimaluse korral suunake kliendid eelnevalt kõrvale; vaikimisi SQLite’i puhul pole jooksvat uuendamist. Compose’i `restart: unless-stopped` koos Dockeri `HEALTHCHECK`-iga asendab ka ainsa protsessi, kui konteineri olek on Unhealthy — mõju ulatus on sama.

Kubernetesi näide **ühe replikaadi** jaoks (Recreate on nõutav; ärge suurendage ühe SQLite’i faili puhul väärtust `replicas`):

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

`preStop`-ooteaeg võimaldab kube'il eemaldada Service'i lõpp-punktid enne SIGTERM-i, et **uus** liiklus ei jõuaks enam sulguva protsessini. Pooleliolevat `/v1/responses` SSE-d tühjendatakse kuni `SHUTDOWN_TIMEOUT_MS`-is määratud aja jooksul (vaikimisi 30 s), kasutades heavyweight admission lease'e (#11015). Uued päringud, mis siiski protsessini jõuavad, saavad vastuseks `503` + `Retry-After: 5`. Recreate'i tühi lõpp-punktide vahemik kuni asendusprotsessi Ready-olekuni põhjustab jätkuvalt täieliku katkestuse — see tuleneb SQLite'i topoloogiast, mitte proovi valest konfiguratsioonist.

Väline Postgres / mitme kirjutajaga HA **ei ole** dokumenteeritud standardlahendus. Kui vajate HA-d, kasutage üht replikat või topoloogiat, mida projekt on eraldi testinud ja dokumenteerinud. Postgres/MySQL-i arendus toimub teemas [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Kuni see pole välja antud, on ainus toetatud viis **suurte** `/v1/responses`-päringute läbilaskevõime suurendamiseks kasutada N sõltumatut protsessi (järgmine jaotis), mitte määrata ühel andmeköitel `replicas > 1`.

## Horisontaalne skaleerimine: N sõltumatut protsessi

Üks Node’i protsess tähendab **ühte V8 kuhja**. Kaks kattuvat ~3 MiB / ~750k-tokeniga kodeerimisagendi päringut `POST /v1/responses` (RTK + Caveman) katkestavad selle kuhja töö ~12 Gi juures (`FATAL ERROR: Reached heap limit`) ja võivad põhjustada 16 Gi cgroup’is OOM-i. Vaadake [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). See mõõtmine on **mälueelarve** hoiatus, mitte toote jäik maksimum, mis lubaks ainult kaht samaaegset pikka `/v1/responses` päringut. Ressursimahukate vestluste vastuvõttu piirab automaatselt tuletatud sisendi baitide eelarve (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), mille suurus põhineb samal V8/cgroup’i ülempiiril — selle suurendamine (või päringute arvul põhineva pärandpiirangu `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` määramine) juba dimensioneeritud protsessis põhjustab taas katkestuse. Väikesed vestlused, `/healthz`, `/v1/models` ja MCP **ei kuulu** selle piirangu alla.

### Üks protsess: rohkem kui kaks pikka `/v1/responses` päringut

**Terve** protsess (kuhi alla `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, vaikimisi `0.75`) **võib** käitada rohkem kui kaht samaaegset pikka `POST /v1/responses` päringut, kui protsessiüleses pooleliolevate baitide eelarves (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) on veel ruumi. Päringukehad, mille suurus on vähemalt `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (vaikimisi 256 KiB), võtavad sama ressursimahuka päringu loa nagu keeruka struktuuriga päringud ja kasutavad sama [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` erandit (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Kümned samaaegsed pikaajalised SSE-kliendid (operaatorid vajavad sageli 40–50) on **mälueelarve** küsimus — dimensioneerige kuhi + põhi-/varuruumi kohad + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` —, mitte toote jäik „max 2“ piirang. Surve all olev kuhi jätab päringuid endiselt kõrvale kordamist võimaldava vastusega `503`, et #7849 ei korduks.

**Kuhjade mitmekordistamiseks** (sõltumatud V8 old-space’id) **praegu**:

| Tehke                                                                                                                                                                                                   | Ärge tehke                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Käitage **N konteinerit/podi**, igaühel **oma** `DATA_DIR` / köide                                                                                                                                      | Määrake `replicas > 1` ühe SQLite-faili jaoks                                 |
| Dimensioneerige ressursimahukate pooleliolevate päringute ja terve protsessi varuruum kuhja / pooleliolevate baitide eelarve järgi; 1–2 on konservatiivne #7849 vaikeväärtus, mitte toote jäik maksimum | Ärge andke ühele protsessile 8× RAM-i ega piiramatut päringute arvu ülempiiri |
| Valikuline: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **jagatud kvoodiloendurite** jaoks                                                                                                     | Ärge käsitlege Redist jagatud SQLite’ina — see ei ole seda                    |
| Kopeerige teenusepakkuja saladused igasse instantsi (või leppige eraldatud töölaudadega)                                                                                                                | Ärge eeldage instantsideülest ühtset töölauda / kõnelogi                      |
| Paigutage ette mis tahes koormusjaotur; API-võtme või seansi põhine püsiv suunamine on piisav                                                                                                           | Ärge nõudke teenusepakkuja spetsiifilist suurust arvestavat vahevara          |

Riistvara: ühe instantsi samaaegsete pikkade `/v1/responses` päringute arv on **mälueelarve** küsimus (kuhi + pooleliolevate baitide eelarve / #10110). `N` sõltumatut `DATA_DIR`-i mitmekordistavad ikkagi kuhjade arvu: hosti RAM peab mahutama `N × cgroup`, mitte „üks 16 Gi pod, kus N=8“. Ärge kunagi kasutage ühe SQLite-faili korral `replicas > 1`.

Compose’i näidis (kaks kuhja, kaks köidet — mitte `deploy.replicas: 2`):

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

Protsessisisene tihedus (tihendamine väljaspool HTTP-isolaati) on [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Üks loogiline klaster jagatud püsioleku peal on [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Gemini piirkondlikud vead Dockeris

Google AI Studio / Gemini API võib tagastada HTTP 400 veakoodiga FAILED_PRECONDITION ja teatega
`User location is not supported for the API use.` Edukas päring hostis
ei tõesta, et konteiner kasutab sama väljaminevat marsruuti. DNS-i järjestus,
IPv4/IPv6 ühenduvus, VPN-i marsruutimine ja seadistatud puhverserverid võivad erineda. Kontrollige
[Google'i toetatud piirkondi](https://ai.google.dev/gemini-api/docs/available-regions)
ning tegelikku ühenduse marsruuti; ainuüksi see viga ei viita vigasele API-võtmele.

### Eelistage ühendusepõhist puhverserverit

Kasutage mõjutatud Gemini ühenduse jaoks OmniRoute'i [ühendusepõhist puhverserveri seadistust](../ops/PROXY_GUIDE.md#4-level-proxy-system)
ning seejärel korrake toimingut **Test Connection** ja väikest päringut
sama mudeliga. Nii piirdub marsruudimuudatus selle ühendusega. Veenduge,
et puhverserver oleks konteinerist ligipääsetav ja et ühendus selle ka tegelikult valiks.
Marsruudi muutmine ei taga, et ülesvooluteenus peab piirkonda sobivaks.

### Võrrelge hosti ja konteineri võrguühendust

Autenditud tulemuste võrdlemisel hoidke võti, mudel ja päring samana; ärge kunagi
lisage probleemikirjeldusse mandaate, puhverserveri paroole ega täielikke autoriseerimispäiseid.
Kõigepealt kontrollige, milliseid aadressiperekondi operatsioonisüsteemi nimelahendaja pakub, kasutades sama käsku
hostis ja konteineris:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Asendage `omniroute` kasutatava teenusega (näiteks `omniroute-web`). Need
käsud väljastavad aadressiperekonnad ilma mandaatide või IP-aadressideta. Tagastatud `6`
näitab ainult IPv6 DNS-i tulemust: see **ei** tõesta toimiva IPv6-marsruudi ega API-juurdepääsu olemasolu.
Kui `curl` on installitud, võrrelge käsku `curl -4 -I https://generativelanguage.googleapis.com`
käsuga `curl -6 -I https://generativelanguage.googleapis.com` mõlemas keskkonnas.
HTTP-vastus tõendab selle kontrollpäringu ühenduvust isegi siis, kui vastuseks on autentimata
päringu viga; Gemini kasutusõigust kontrollib ainult autenditud mudelipäring.

### Hostitaseme alternatiiv: toimiv IPv6 ja nimelahendaja poliitika

Probleemi [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) raporteerija taastas
oma keskkonnas juurdepääsu, lubades konteineri IPv6 ja muutes glibc aadressivalikut.
Käsitlege seda keskkonnaspetsiifilise alternatiivina. Enne nimelahendaja eelistuste muutmist
veenduge, et hosti IPv6, konteineri väljaminev ühendus/marsruutimine ja tulemüürireeglid töötaksid.
Privaatne ULA-aadress üksi ei tõenda avaliku IPv6-ühenduse olemasolu.

Teenuste puhul, mis on juba ühendatud Compose'i vaikevõrguga, lubab järgmine fragment
selles võrgus IPv6; säilitage ülejäänud teenuse, portide, andmeköidete ja seadistuse osa:

```yaml
networks:
  default:
    enable_ipv6: true
```

Nimega võrgu puhul lubage see võrgus, millega teenus tegelikult liitub. Docker võib
eraldada ULA-alamvõrgu; valige selgesõnaline, mittekattuv alamvõrk ainult siis, kui teie võrk
seda nõuab. Vaadake [Dockeri IPv6-võrgundust](https://docs.docker.com/engine/daemon/ipv6/)
ja [Compose'i võrgusuvandeid](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc-põhises tõmmises** saab `/etc/gai.conf` muuta aadressivalikut. Hoidla praegune
Dockerfile kasutab Debiani; kohandatud musl-põhised tõmmised seda mehhanismi ei kasuta.
Raporteeritud muudatus asendab ULA sildi `label fc00::/7 6` sildiga
`label fc00::/7 1`. Alustage tõmmise täielikust poliitikatabelist ja säilitage selle muud
kirjed: kirje `label` või `precedence` lisamine asendab selle vaiketabeli, mistõttu ainult
muudetud rida sisaldav fail ei ole piisav.
[glibc seadistuse viitedokumentatsioon](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
kirjeldab neid semantikaid. Ühendage ülevaadatud fail kirjutuskaitstult asukohta `/etc/gai.conf`
ja looge teenus muudatuse rakendamiseks uuesti.

See muudab operatsioonisüsteemi aadressivalikut **kogu sellest konteinerist väljuva liikluse jaoks**.
See ei sunni iga rakendust IPv6 valima: olulised on ka Node'i DNS-i järjestus ja ühenduse
valik. Eelkõige eelistab `--dns-result-order=ipv4first` IPv4 ja
see ei lahenda ainult IPv4 kasutamisel tekkivat tõrget. Vaadake [Node'i DNS-i järjestust](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Pärast iga hostitaseme muudatust testige uuesti Geminit ja teisi teenusepakkujaid. Tagasipööramiseks
eemaldage kohandatud `gai.conf`-i ühendus, taastage varasem võrguseadistus ning
looge mõjutatud teenus/võrk hooldusakna ajal uuesti. Võrgu uuesti loomine
võib katkestada teiste sellega ühendatud konteinerite töö; ärge kustutage püsivate andmete andmeköidet.

## Olulised märkused

- **SQLite'i WAL-režiim:** Käsul `docker stop` tuleks lasta lõpuni töötada, et OmniRoute saaks viimased muudatused kontrollpunktina tagasi faili `storage.sqlite` kirjutada. Kaasasolevates Compose'i failides on juba määratud 40-sekundiline peatamise ajapikendus. Kui käitate tõmmist otse, säilitage `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Määrake väärtuseks `true`, kui korrapäraseid/kirjutamiseelseid varukoopiaid hallatakse väliselt. Olemasoleva andmebaasi migreerimine nõuab endiselt eraldi püsivat turvatõmmist ja massmigreerimise kaitset.
- **Andmete säilitamine:** Andmebaasi, võtmete ja konfiguratsioonide säilitamiseks konteineri taaskäivituste vahel ühendage alati köide asukohta `/app/data`.
- **Pordi konfiguratsioon:** Vaikimisi kasutatava pordi `20128` muutmiseks kirjutage keskkonnamuutuja `PORT` üle.

## Vaata ka

- [VM-i juurutamisjuhend](../ops/VM_DEPLOYMENT_GUIDE.md) — VM-i + nginxi + Cloudflare'i seadistamine
- [Fly.io juurutamisjuhend](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Juurutamine Fly.io-sse
- [Keskkonna konfiguratsioon](../reference/ENVIRONMENT.md) — Täielik `.env`-faili viide
