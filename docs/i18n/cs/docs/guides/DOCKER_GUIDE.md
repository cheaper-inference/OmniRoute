# 🐳 Docker Guide — OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kompletní referenční příručka k nasazení pomocí Dockeru. Pro rychlý začátek viz [sekce Docker v README](../README.md#-docker).

## Obsah

- [Rychlé spuštění](#quick-run)
- [Se souborem prostředí](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostupné profily](#available-profiles)
- [Konfigurace hostitelských nástrojů CLI při běhu OmniRoute v Dockeru](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis jako sidecar](#redis-sidecar)
- [Produkční konfigurace Compose](#production-compose)
- [Fáze Dockerfile](#dockerfile-stages)
- [Kritické proměnné prostředí](#critical-environment-variables)
- [Docker Compose s Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Rychlý tunel Cloudflare](#cloudflare-quick-tunnel)
- [Značky obrazů](#image-tags)
- [Aktualizace ovládacího panelu v Dockeru](#dashboard-updates-in-docker)
- [Dostupnost: výchozí SQLite podporuje jedinou repliku](#availability-default-sqlite-is-single-replica)
- [Regionální chyby Gemini v Dockeru](#gemini-regional-errors-inside-docker)
- [Důležité poznámky](#important-notes)

---

## Rychlé spuštění

> **Vlastní hosting jediným příkazem?** Viz
> [Průvodce vlastním hostingem](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (publikovaný obraz +
> Redis, pouze přes rozhraní loopback, bez volby profilu). Níže uvedené rychlé spuštění
> představuje variantu s jedním kontejnerem pro uživatele, kteří již Redis provozují jinde.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Se souborem prostředí

```bash
# Nejprve zkopírujte a upravte .env
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
# Základní profil (bez nástrojů CLI)
docker compose --profile base up -d

# Profil CLI (integrované Claude Code, Codex a OpenClaw)
docker compose --profile cli up -d

# Hostitelský profil (primárně pro Linux; připojuje binární soubory CLI hostitele pouze pro čtení)
docker compose --profile host up -d

# Webový profil (Chromium/Playwright pro poskytovatele využívající webové relace)
docker compose --profile web up -d

# Kombinace CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostupné profily

OmniRoute poskytuje profily Compose pro hlavní způsoby nasazení. Vyberte ten, který odpovídá vašemu prostředí.

| Profil           | Služba           | Kdy použít                                                                                                                                               | Příkaz                                       |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (výchozí) | `omniroute-base` | Headless server / minimální běhové prostředí bez přibalených CLI poskytovatelů                                                                           | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Agentní pracovní postupy, které volají `omniroute providers/setup/doctor`, a přibalená CLI (Codex, Claude Code, Droid, OpenClaw)                         | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Hostitelé s Linuxem, kteří chtějí přístup k CLI hostitele podobný `network_mode` připojením `~/.local/bin`, `~/.codex`, `~/.claude` atd. pouze pro čtení | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Spuštění sidecaru [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na portu `8317` pro proxy přístup k nadřazeným CLI                         | `docker compose --profile cliproxyapi up -d` |
| `web`            | `omniroute-web`  | Poskytovatelé webových relací vyžadující prohlížeč: `gemini-web`, `claude-web`, `claude-turnstile` (sestaví `runner-web`, Chromium je zahrnut)           | `docker compose --profile web up -d`         |

> Lze kombinovat více profilů: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurace nástrojů CLI na hostiteli, když OmniRoute běží v Dockeru

`omniroute setup-codex`, `setup-claude`, `config set <tool>` a tlačítko
**Uložit konfiguraci** na ovládacím panelu zapisují soubory jako `~/.codex/*.config.toml`. Tyto cesty
mají význam pouze na počítači, na kterém CLI skutečně běží. Pokud je spustíte uvnitř
kontejneru, zápis skončí ve vlastním domovském adresáři kontejneru (`/home/node` —
image běží s nastavením `USER node`), odkud jej žádné CLI na hostiteli nikdy nepřečte a kde bude
zahozen v okamžiku, kdy bude kontejner znovu vytvořen.

OmniRoute tuto situaci rozpozná a namísto ohlášení úspěchu, které nemůžete využít,
zápis odmítne a zobrazí pokyny: CLI skončí s kódem `2` a API odpoví stavem `422`
s `containerEphemeralTarget: true`.

### Doporučeno: spusťte CLI na hostiteli a OmniRoute v Dockeru

Kontejner poskytuje API; CLI konfiguruje vaše nástroje na hostiteli.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # nasměrujte CLI na kontejner
omniroute setup-codex                      # zapíše skutečný adresář ~/.codex na vašem hostiteli
```

Toto je správná volba, pokud Codex, Claude Code, Cursor nebo podobné nástroje běží na vašem
notebooku — což je obvyklé uspořádání.

### Alternativa: připojte konfigurační adresáře hostitele pomocí bind mountů (profil `host`)

Pokud chcete, aby samotný kontejner zapisoval konfiguraci na hostiteli, připojte do něj
příslušné adresáře a nastavte `CLI_CONFIG_HOME` na kořen připojení. Profil `host`
to již dělá:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Důvěryhodnost cesty zajišťuje právě bind mount: OmniRoute čte
`/proc/self/mountinfo` a povoluje zápisy do připojených cest (a do adresářů,
jejichž podadresáře jsou přípojnými body, což přesně odpovídá výše uvedené struktuře `/host-home`),
zatímco zápisy do nepřipojených cest nadále odmítá.

### Nouzová možnost: konfigurace vlastních CLI uvnitř kontejneru (používejte střídmě)

Pokud CLI skutečně existují uvnitř kontejneru (profil `cli`), je zápis
záměrný. Předejte parametr `--allow-container-write` libovolnému příkazu `setup-*` nebo nastavte
pro server `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Zápis proběhne
s upozorněním, že nepřežije odstranění kontejneru.

> **Bezpečnostní upozornění — profil `cli` + připojení `docker.sock`.**
> Profil `cli` připojuje `/var/run/docker.sock` pomocí bind mountu, aby automatická aktualizace
> uvnitř kontejneru mohla znovu vytvořit stack prostřednictvím démona hostitele
> (`src/lib/system/autoUpdate.ts` kontroluje přítomnost tohoto socketu a při jeho
> absenci cestu pro Docker přeskočí). Tento socket představuje **hranici důvěry s oprávněními root
> na hostiteli**: cokoli, co k němu má přístup, ovládá démona Dockeru na hostiteli jako
> root — může vytvářet, kontrolovat, zastavovat a odstraňovat libovolné kontejnery na hostiteli.
> Důsledky:
>
> 1. **Nikdy nevystavujte port profilu `cli` do sítě.** Publikujte
>    jej na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostupný ze sítě LAN promění jakékoli RCE na úrovni ovládacího panelu
>    v úplné napadení hostitele.
> 2. **Do profilu `cli` nepřipojujte žádné další adresáře hostitele.**
>    Socket Dockeru v kombinaci s jakýmkoli dalším připojením poskytne kontejneru úplný
>    přístup pro čtení a zápis k vašemu souborovému systému a konfiguraci hostitele. Pokud potřebujete, aby nástroj
>    viděl projekt, spusťte jej lokálně pomocí binárního souboru CLI — nepřipojujte jej
>    do kontejneru `cli`.
>
> Pokud automatickou aktualizaci uvnitř kontejneru nepotřebujete, profil `cli` nezapínejte
> (`COMPOSE_PROFILES=core,redis` nebo kratší varianta). Ostatní profily
> socket Dockeru nepřipojují.
>
> Související model hrozeb týkající se MITM naleznete v souboru `docs/security/MITM-TPROXY-DECRYPT.md` (v gitu; není zahrnut do zkompilované dokumentace `/docs`)
> a řetězec původu binárních souborů
> `codex`/`claude-code`/`droid`/`openclaw` v souboru `docs/security/SUPPLY_CHAIN.md`.

## Doprovodný kontejner Redis

OmniRoute využívá Redis jako úložiště pro distribuované omezování frekvence požadavků a sdílenou mezipaměť. Služba `redis` je v souboru `docker-compose.yml` definována **vždy** (není omezena žádným profilem) a spouští se společně s libovolným jiným profilem.

| Podrobnost                    | Hodnota                                 |
| ----------------------------- | --------------------------------------- |
| Image                         | `redis:7-alpine`                        |
| Název kontejneru              | `omniroute-redis`                       |
| Interní port                  | `6379`                                  |
| Port hostitele (přepsatelný)  | `REDIS_PORT` (výchozí hodnota `6379`)   |
| Vazba hostitele (přepsatelná) | `REDIS_BIND_HOST` (výchozí `127.0.0.1`) |
| Svazek                        | `omniroute-redis-data` → `/data`        |
| Kontrola stavu                | `redis-cli ping` (interval 10 s)        |

Související proměnné prostředí:

- `REDIS_URL` — připojovací řetězec předávaný aplikaci (ve výchozím nastavení `redis://redis:6379`).
- `REDIS_PORT` — mapování portu kontejneru Redis na straně hostitele.
- `REDIS_BIND_HOST` — síťové rozhraní hostitele, na kterém je port zveřejněn. Výchozí hodnota je `127.0.0.1`.

> **Proč je ve výchozím nastavení použito rozhraní loopback:** doprovodný kontejner běží bez `requirepass`
> a aplikační kontejnery k němu přistupují přes síť compose (`redis:6379`) — zveřejněný port
> slouží pouze pro nástroje běžící na hostiteli (`redis-cli`, lokální `npm run dev`). Zveřejnění na
> `0.0.0.0` by zpřístupnilo Redis bez ověřování všem hostitelům ve vaší síti LAN. Pokud nastavíte
> `REDIS_BIND_HOST=0.0.0.0`, přidejte ke službě do položky `command:` také `--requirepass`.

**Vypnutí Redis** se nedoporučuje (omezování frekvence požadavků přejde na méně robustní záložní implementaci v paměti). Pokud je to nutné, buď odstraňte/zakomentujte blok služby `redis:` v souboru `docker-compose.yml`, nebo nastavte počet jejích instancí na nulu:

```bash
docker compose up -d --scale redis=0
```

## Produkční Compose

Pro izolovaný produkční snapshot běžící souběžně s vývojovým prostředím použijte `docker-compose.prod.yml`.

| Podrobnost                   | Hodnota                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| Soubor                       | `docker-compose.prod.yml`                                                                 |
| Výchozí port řídicího panelu | `PROD_DASHBOARD_PORT=20130` (mapováno na interní `${DASHBOARD_PORT:-20128}`)              |
| Výchozí port API             | `PROD_API_PORT=20131`                                                                     |
| Image                        | `omniroute:prod` (sestavený z cíle `runner-cli`)                                          |
| Kontejner Redis              | `omniroute-redis-prod` (`redis:8.6.2`, vyhrazený svazek `redis-prod-data`)                |
| Datový svazek                | `omniroute-prod-data` (pojmenovaný, zachovaný i po opětovném sestavení)                   |
| Kontroly stavu               | `node healthcheck.mjs` + `redis-cli ping`, přičemž `depends_on` je podmíněno stavem Redis |

Použití:

```bash
# Sestavení a spuštění produkčního stacku
docker compose -f docker-compose.prod.yml up -d --build

# Průběžné zobrazení protokolů
docker compose -f docker-compose.prod.yml logs -f

# Ukončení stacku (svazky budou zachovány)
docker compose -f docker-compose.prod.yml down
```

Produkční stack běží souběžně s vývojovým prostředím compose (používá jiné názvy kontejnerů, porty a svazky), takže můžete pokračovat v lokálním vývoji, zatímco produkční prostředí zůstane spuštěné.

## Fáze Dockerfile

Repozitář obsahuje vícefázový Dockerfile (`Dockerfile`). K dispozici jsou čtyři fáze; vyberte správný `target` pro svůj případ použití.

| Fáze          | Základní image        | Účel                                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Nainstaluje závislosti (`npm ci --legacy-peer-deps`) a spustí `npm run build` (ve výchozím nastavení Turbopack — viz níže Prostředky při sestavení)                                                                                                                                                     |
| `runner-base` | `node:26-trixie-slim` | Produkční běhové prostředí se samostatným výstupem Next.js. **Neobsahuje žádné CLI poskytovatelů.**                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Přidává `git`, `docker.io`, `docker-compose` a globální CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Tuto fázi zvolte pro agentní pracovní postupy.**                                                                                                                      |
| `runner-web`  | `runner-base`         | Přidává Playwright + prohlížeč Chromium (`--with-deps`) pro poskytovatele webových relací: `gemini-web`, `claude-web`, `claude-turnstile`. **Tuto fázi zvolte, pokud tyto poskytovatele používáte** — prostý image bez ní selže při zpracování požadavku (viz poznámka k `-web` v části Kanály vydání). |

Ruční sestavení konkrétního cíle:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Prostředky při sestavení

Nároky fáze `builder` řídí tři argumenty sestavení. Platí pouze při sestavení —
`OMNIROUTE_MEMORY_MB` (níže) je samostatné nastavení běhového prostředí.

| Argument sestavení          | Výchozí hodnota | Účinek                                                                                            |
| --------------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`             | `0` sestavuje pomocí webpacku: nižší špičková spotřeba paměti, ale pomaleji. `1` zapne Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`          | Limit haldy V8 (`--max-old-space-size`) pro spuštěný proces `next build`.                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`             | Nastavuje `CIRCLE_NODE_TOTAL`; Next odvodí `workers = N - 1` pro sběr dat stránek.                |

`OMNIROUTE_BUILD_WORKERS` je parametr, který je vhodné zvýšit na výkonném sestavovacím stroji, a zároveň parametr,
který je třeba podezírat, když sestavení s omezenými prostředky selže **po** hlášení `✓ Compiled successfully`. Každý
pracovní proces pro data stránek je samostatný proces, stejně jako samotný nadřazený proces `next build`;
živá reprodukce na VPS (issue #7518) naměřila špičkovou hodnotu RSS každého procesu
na ~4.5 GB bez ohledu na příznak haldy `NODE_OPTIONS` (Turbopack kompiluje v
nativní paměti Rustu mimo haldu V8). Výchozí hodnota `2` (→ 1 pracovní proces, celkem 2
procesy) je nastavena pro runnery hostované na GitHubu s 16 GB / 4 vCPU, které
používá publikační pipeline. Při hodnotě `8` (→ 7 pracovních procesů) tomuto runneru došla paměť a
buildkit ukončil krok chybou `ResourceExhausted: ... cannot allocate memory`;
ani hodnota `3` (→ 2 pracovní procesy) se nevešla poté, co byla hodnota RSS jednotlivých procesů změřena
přímo namísto odvození. `tests/unit/docker-build-memory-budget.test.ts`
provádí výpočet na základě naměřené hodnoty a selže, pokud kterýkoli z těchto parametrů
překročí možnosti runneru.

Turbopack kompiluje v nativní paměti Rustu, která se nachází **mimo** haldu V8, takže
`OMNIROUTE_BUILD_MEMORY_MB` ji neomezuje. Na hostiteli s paměťovým limitem je pak
sestavení ukončeno signálem SIGKILL od OOM killeru zcela bez chybové zprávy — jednoduše
se zastaví uprostřed kroku `Creating an optimized production build`, což vypadá spíše jako zamrznutí
než jako nedostatek paměti. Proto `Dockerfile` ve výchozím nastavení používá webpack
(`OMNIROUTE_USE_TURBOPACK=0`), na rozdíl od `npm run dev` / `npm run build`, kde
je v kódu výchozí Turbopack: prosté `docker build .` bez argumentů sestavení (což
spouští Railway a další platformy s nasazením na jedno kliknutí) nesmí na sestavovacím stroji s omezenou pamětí
selhat bez jakéhokoli hlášení. Publikované image již v souboru `docker-publish.yml` explicitně předávají
`OMNIROUTE_USE_TURBOPACK=0`. Na sestavovacím stroji s dostatkem RAM zapněte
Turbopack pro rychlejší sestavení:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` je zapnutý, takže `next build` spouští nadřazený **i** pracovní
proces a každý z nich samostatně respektuje `OMNIROUTE_BUILD_MEMORY_MB`. Nastavte limit
kontejneru přibližně nad dvojnásobek této hodnoty, nikoli pouze nad její jednonásobek.

Naměřeno v tomto stromu (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limit kontejneru | Výsledek                                           |
| --------- | ---------------- | -------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB   | v obou případech ukončeno OOM, bez hlášení         |
| webpack   | 8 GiB            | pracovní proces sestavení ukončen signálem SIGKILL |
| webpack   | 12 GiB           | úspěšné, špička 11.1 GiB                           |

### Výchozí nastavení běhového prostředí

Výchozí hodnoty exportované fází `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Chování paměti v Dockeru:

- Image nastavuje `OMNIROUTE_MEMORY_MB=1024` a odvozuje z něj `NODE_OPTIONS=--max-old-space-size=1024`.
- Skutečný serverový proces spouští samostatný spouštěč, který načte `OMNIROUTE_MEMORY_MB` a připojí `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node použije poslední opakovanou hodnotu `--max-old-space-size`, takže nastavení `OMNIROUTE_MEMORY_MB` určuje efektivní limit haldy v Dockeru.
- Protože jej image vždy nastavuje, vlastní záložní hodnota spouštěče kalibrovaná podle RAM se v Dockeru nikdy nepoužije. Pro danou zátěž ji explicitně zvyšte (viz tabulka níže). `2048` je pro požadavky coding agentů na `/v1/responses` stále příliš málo.

### Operační paměť pro coding agenty

Výchozí hodnota 1 GiB v Dockeru představuje minimum pro dashboard a nenáročný chat, nikoli velikost vhodnou pro produkční nasazení. Dlouhá těla požadavků `POST /v1/responses` (stovky zpráv, desítky nástrojů) během komprese uchovávají v paměti několik grafů. Dva překrývající se požadavky o velikosti přibližně 3 MiB / 750 tisíc tokenů způsobily ukončení V8 při **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) a také OOM v cgroup s limitem 16 GiB. Viz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Nastavte **cgroup `--memory` na hodnotu vyšší, než je velikost haldy** — nativní buffery, SQLite a mezivýsledky komprese se nacházejí mimo V8.

| Zátěž                                   | `OMNIROUTE_MEMORY_MB`       | Kontejner / cgroup      | Poznámky                                                                                                        |
| --------------------------------------- | --------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| Dashboard, jeden nenáročný chat         | `1024` (výchozí pro image)  | ≥2 GiB                  |                                                                                                                 |
| Jeden coding agent (Claude/Codex/Grok)  | `8192`                      | ≥10 GiB                 | Typická jedna relace `/v1/responses`                                                                            |
| Dva souběžné dlouhé `/v1/responses`     | `10240`–`12288`             | ≥12–16 GiB              | Naměřené ukončení V8 při haldě o velikosti přibližně 12 GiB                                                     |
| Tři a více souběžných dlouhých kontextů | nepoužívat v jednom procesu | serializovat / více RAM | Výchozí limit náročných požadavků je 1 zpracovávaný požadavek; jeho zvýšení bez další RAM opět způsobí ukončení |

`omniroute serve` na fyzickém systému kalibruje přibližně 35 % RAM (omezeno na rozsah `[512, 4096]`), pokud `OMNIROUTE_MEMORY_MB` **není nastaveno**. Docker vždy nastavuje `1024`, takže se tato kalibrace v oficiálním image nikdy nespustí.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kritické proměnné prostředí

Kromě výchozích hodnot zdokumentovaných v [ENVIRONMENT.md](../reference/ENVIRONMENT.md) jsou při provozu v Dockeru nejdůležitější následující proměnné:

| Proměnná                      | Účel                                                                                                                                                                                                                                                                         | Výchozí hodnota              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Sdílený tajný klíč pro WebSocket bridge. **Vyžadováno v produkčním prostředí** — nastavte jej na silný náhodný řetězec.                                                                                                                                                      | nenastaveno (nutno zadat)    |
| `REDIS_URL`                   | Připojovací řetězec pro backend omezování frekvence požadavků / mezipaměti                                                                                                                                                                                                   | `redis://redis:6379`         |
| `REDIS_PORT`                  | Port na hostiteli pro přibalený kontejner Redis                                                                                                                                                                                                                              | `6379`                       |
| `REDIS_BIND_HOST`             | Síťové rozhraní hostitele, na kterém je publikován port přibaleného Redis (loopback, pokud nepřidáte AUTH)                                                                                                                                                                   | `127.0.0.1`                  |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Cesta na hostiteli připojená do profilu `cli` jako `/workspace/omniroute` pro pracovní postupy samočinné aktualizace                                                                                                                                                         | `.` (aktuální adresář)       |
| `OMNIROUTE_MEMORY_MB`         | Limit haldy Node za běhu pro samostatný server v Dockeru; přepisuje výše uvedenou výchozí hodnotu image. Agenti pro programování: `8192`+ (viz [RAM za běhu](#runtime-ram-for-coding-agents)).                                                                               | `1024`                       |
| `DASHBOARD_PORT` / `API_PORT` | Přepíše zpřístupněné porty pro řídicí panel (20128) a API (20129)                                                                                                                                                                                                            | `20128` / `20129`            |
| `APP_BIND_HOST`               | Síťové rozhraní hostitele, na kterém docker-compose publikuje porty řídicího panelu/API/live-WS. Při `REQUIRE_API_KEY=false` (výchozí hodnota) zpřístupní `0.0.0.0` anonymní proxy `/v1` v síti LAN — rozšiřujte přístup pouze s `REQUIRE_API_KEY=true` nebo reverzní proxy. | `127.0.0.1`                  |
| `CLIPROXY_BIND_HOST`          | Síťové rozhraní hostitele, na kterém docker-compose publikuje sidecar `cliproxyapi` — jeho datový svazek obsahuje přihlašovací údaje poskytovatele.                                                                                                                          | `127.0.0.1`                  |
| `OMNIROUTE_PLUGINS_DIR`       | Adresář, ze kterého skener modulů runtime čte a do kterého je instaluje. Nastavte jej, pokud jsou moduly připojeny pomocí bind mountu: výchozí hodnota se řídí proměnnou `HOME`, kterou image nemusí exportovat.                                                             | `~/.omniroute/plugins`       |
| `OMNIROUTE_BASE_PATH`         | Dílčí cesta URL, když je aplikace publikována za reverzní proxy (např. `/omniroute`)                                                                                                                                                                                         | _(prázdné = kořenová cesta)_ |
| `NEXT_PUBLIC_BASE_URL`        | Veřejný origin prohlížeče včetně dílčí cesty (např. `https://host/omniroute`)                                                                                                                                                                                                | nenastaveno                  |
| `PROD_DASHBOARD_PORT`         | Port řídicího panelu na hostiteli pro `docker-compose.prod.yml`                                                                                                                                                                                                              | `20130`                      |
| `CLIPROXYAPI_PORT`            | Port na hostiteli pro sidecar `cliproxyapi`                                                                                                                                                                                                                                  | `8317`                       |

## Reverzní proxy na podcestě (Traefik / nginx)

Hodnota `basePath` systému Next.js je zkompilována do samostatného balíčku. OmniRoute ukládá vloženou
hodnotu do kontrolního souboru v kořenovém adresáři aplikace (zapsaného během `npm run build`; načítaného
skriptem `scripts/docker/ensure-docker-base-path.mjs`) a při spuštění kontejneru ji porovnává
s proměnnou `OMNIROUTE_BASE_PATH`. Pokud se hodnoty liší a obraz byl sestaven
pro kořen domény, vstupní bod přepíše manifesty samostatného balíčku,
vložené literály `basePath`/`assetPrefix` (Next 16 generuje adresy URL prostředků SSR pouze
z `assetPrefix` — opravný skript do něj zkopíruje podcestu), vložené
adresy URL prostředků `/_next/static` (manifesty klientských referencí, importy médií, předgenerované
chybové stránky) a klientskou náhradu `process.env` před spuštěním `node dev/run-standalone.mjs`.

### Sestavení pomocí Compose (doporučeno)

Nastavte obě proměnné v `.env` a poté obraz znovu sestavte, aby se nastavení obrazu a běhového prostředí shodovalo:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Soubor `docker-compose.yml` předává `OMNIROUTE_BASE_PATH` jako argument sestavení Dockeru i jako
proměnnou běhového prostředí.

### Předem sestavený kořenový obraz + podcesta za běhu

Publikované obrazy `diegosouzapw/omniroute:*` jsou sestaveny pro kořen domény. Proměnnou
`OMNIROUTE_BASE_PATH` můžete přesto nastavit za běhu; kontejner při spuštění balíček jednorázově upraví.
Použijte ji společně s odpovídajícím veřejným počátkem adresy URL:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Nakonfigurujte reverzní proxy tak, aby předávala **celou** externí cestu (neodstraňujte
prefix). Traefik by měl směrovat `PathPrefix(`/omniroute`)` do kontejneru bez
`StripPrefix`, aby Next.js přijímal `/omniroute/...` a poskytoval prostředky z
`/omniroute/_next/...`.

Kontrola stavu Dockeru testuje odlehčený koncový bod životního cyklu `/healthz` opatřený prefixem
aktivní hodnoty `OMNIROUTE_BASE_PATH`. Koncový bod `/api/monitoring/health` zůstává dostupný pro
diagnostiku prováděnou uživateli či dashboardy; chcete-li na něj znovu nasměrovat kontrolu HEALTHCHECK kontejneru (například
za účelem důkladné kontroly stavu), nastavte `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Tato cesta provádí **důkladnou** kontrolu (databáze + souhrn monitorování) — je vhodná pro málo častý
`HEALTHCHECK` Dockeru, pokud se ji rozhodnete znovu použít, ale **není** vhodná pro intervaly
`livenessProbe` v Kubernetes.

Pro orchestrátory (Kubernetes, Nomad atd.):

| Sonda               | Preferujte                                                            | Vyhněte se                                                                       |
| ------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Životnost           | HTTP `GET /livez` nebo TCP na hlavním portu (`PORT`, výchozí `20128`) | `/api/monitoring/health` jako kontrolu životnosti                                |
| Připravenost        | HTTP `GET /healthz`                                                   | Krátkým časovým limitům, které považují zaneprázdněnou smyčku událostí za mrtvou |
| Důkladná / blackbox | `/api/monitoring/health`                                              | —                                                                                |

`/healthz` hlásí stav životního cyklu procesu (`ok` / `starting` / `stopping`). `/livez` pouze
ověřuje, zda proces běží (vrací 200 vždy, když lze obslužnou rutinu spustit; nečeká na
připravenost). Oba koncové body stále běží ve stejné smyčce událostí Node jako obsluha požadavků, takže
výpočetně náročné zpracování katalogu nebo komprese je mohou zpozdit — zaneprázdněný ≠ mrtvý. Pokud vyprší
časový limit sond HTTP, upřednostněte kontrolu životnosti přes TCP. Úplné pokyny pro sondy:
[Průvodce monitorováním — doporučení pro sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose s Caddy (automatické TLS pro HTTPS)

OmniRoute lze bezpečně zpřístupnit pomocí automatického zajišťování certifikátů SSL v Caddy. Ujistěte se, že DNS záznam typu A vaší domény odkazuje na IP adresu vašeho serveru.

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
      # Veřejný origin pro zpětná volání OAuth, odkazy řídicího panelu a generované veřejné adresy URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Interní adresa URL mezi servery pro naplánované úlohy / požadavky na sebe sama.
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

Caddy nastavuje standardní hlavičky pro předávání požadavků upstream kontejneru. OmniRoute používá
`NEXT_PUBLIC_BASE_URL` jako kanonický veřejný origin pro zpětná volání OAuth a generované veřejné
odkazy; ověřené zápisy z řídicího panelu používají požadavky se stejným originem spolu s ochranou CSRF
vázanou na relaci. `OMNIROUTE_TRUST_PROXY` povolte pouze pro pokročilá nasazení, ve kterých záměrně
chcete, aby OmniRoute odvozoval veřejný origin z důvěryhodných předávaných hlaviček namísto explicitní
konfigurace.

## Rychlý tunel Cloudflare

Podpora řídicího panelu pro nasazení v Dockeru zahrnuje **rychlý tunel Cloudflare** na jedno kliknutí v části `Dashboard → Endpoints`. Při prvním povolení se `cloudflared` stáhne pouze v případě potřeby, spustí se dočasný tunel k vašemu aktuálnímu endpointu `/v1` a vygenerovaná adresa URL `https://*.trycloudflare.com/v1` se zobrazí přímo pod vaší běžnou veřejnou adresou URL.

Panely tunelů endpointů (Cloudflare, Tailscale, ngrok) lze zobrazit nebo skrýt v části `Settings → Appearance`, aniž by se změnil stav aktivního tunelu.

### Poznámky k tunelům

- Adresy URL rychlých tunelů jsou dočasné a po každém restartu se změní.
- Rychlé tunely se po restartování OmniRoute nebo kontejneru automaticky neobnovují. V případě potřeby je znovu povolte z řídicího panelu.
- Spravovaná instalace aktuálně podporuje Linux, macOS a Windows na `x64` / `arm64`.
- Spravované rychlé tunely ve výchozím nastavení používají přenos HTTP/2, aby se předešlo rušivým varováním o vyrovnávací paměti QUIC UDP v omezených kontejnerových prostředích. Pokud chcete použít jiný přenos, nastavte `CLOUDFLARED_PROTOCOL=quic` nebo `auto`.
- Obrazy Dockeru obsahují systémové kořenové certifikáty CA a předávají je spravovanému nástroji `cloudflared`, čímž se předejde selháním důvěryhodnosti TLS při inicializaci tunelu uvnitř kontejneru.
- Pokud chcete, aby OmniRoute namísto stažení použil existující binární soubor, nastavte `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`.

## Značky obrazů

| Obraz                    | Značka   | Velikost | Popis                                                              |
| ------------------------ | -------- | -------- | ------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB   | Nejvyšší **publikovaná** stabilní verze SemVer (nikoli git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB   | Pro GitOps připněte tuto třídu značky                              |

Multiplatformní manifest: nativní `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automaticky vybere odpovídající architekturu; pokud potřebujete na hostitelích ARM vynutit emulaci AMD64, předejte `--platform linux/amd64`.

### Kanály vydání

OmniRoute publikuje samostatné kanály Dockeru pro stabilní vydání, testování aktivní větve vydání a vývojová sestavení.

| Kanál                           | Zdroj                                          | Proměnlivost                  | Doporučené použití                                                                                               |
| ------------------------------- | ---------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Podepsané/verzované vydání                     | Neměnný                       | Produkční nasazení připínající přesné vydání                                                                     |
| `:latest` / `:latest-web`       | Nejvyšší **publikovaná** stabilní verze SemVer | Proměnlivý stabilní ukazatel  | Sleduje stabilní vydání **po** úloze publikování SemVer — **nesleduje** `main` ani nevydané commity `release/v*` |
| `:next` / `:next-web`           | Aktuální výchozí větev `release/v*`            | Proměnlivý předběžný ukazatel | Testování oprav, které byly začleněny do aktivní větve vydání, ale dosud nejsou součástí stabilního vydání       |
| `:main` / `:main-web`           | Větev `main`                                   | Proměnlivý vývojový ukazatel  | Pouze pro vývojové a integrační testování                                                                        |

#### Poskytovatelé webových relací: obrazy `-web`

Každý výše uvedený kanál má také odpovídající značku `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), sestavenou z fáze `runner-web` — jde o stejný obraz doplněný o Playwright a prohlížeč Chromium. Běžný obraz se dodává **bez** Chromia; `gemini-web`, `claude-web` a `claude-turnstile` jej vyžadují.

K selhání nedojde při spuštění, ale až později: tito poskytovatelé uvádějí své modely a v řídicím panelu se zobrazují jako připojení, přičemž až první požadavek selže s chybou

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Pokud tyto poskytovatele používáte, stáhněte značku `-web` kanálu, který již používáte — nic dalšího se nemění. Při instalaci pomocí npm/CLI (bez obrazu Dockeru) je ekvivalentní chybějící součástí binární soubor prohlížeče: na hostiteli spusťte `npx playwright install chromium`.

#### Použití kanálu předběžných vydání

Kanál `next` se znovu sestavuje při každém pushi do aktuální výchozí větve `release/v*` a publikuje se pro AMD64 i ARM64. Starší větve údržby jej nemohou přepsat. Kanál poskytuje image, který lze stáhnout a který obsahuje opravy sloučené do aktivní větve vydání ještě před vytvořením dalšího stabilního tagu.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pro Docker Compose přepište tag image používaný vybraným profilem a poté službu stáhněte a znovu vytvořte:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpečnost a návrat k předchozí verzi

`next` je průběžně aktualizovaný kanál předběžných vydání. Může se změnit při každém pushi do aktivní větve vydání a **není podporován pro produkční použití**. Při vyhodnocování konkrétního sestavení připněte digest image:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Před testováním zálohujte datový svazek OmniRoute nebo připojený datový adresář. Chcete-li se vrátit k předchozí verzi, obnovte dříve používanou stabilní verzi nebo digest a znovu vytvořte kontejner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Sestavení z větve vydání nikdy nemůže změnit `latest`; stabilní ukazatel může aktualizovat pouze způsobilá stabilní sémantická verze. Image `next` nadále podléhají kontrole image vydání a blokující kontrole zranitelností se závažností CRITICAL.

**`latest` není zárukou aktuálnosti vůči gitu.** Sloučené opravy ve větvi `main` nebo v aktivní větvi `release/v*` **nejsou** součástí `:latest`, dokud není publikován image se stabilní verzí SemVer a publikační úloha nepovýší `:latest` (se stejným digestem jako daná verze SemVer). Pokud se zdá, že `latest` zůstává beze změny, přestože GitHub již opravu zobrazuje, stáhněte `:next` a otestujte větev vydání, nebo počkejte na tag SemVer.

| Požadavek                                                                         | Použijte                              |
| --------------------------------------------------------------------------------- | ------------------------------------- |
| GitOps / produkční prostředí, které se nesmí samovolně měnit                      | Připněte `:X.Y.Z` (nebo digest image) |
| Sledování publikovaných stabilních verzí s opětovným vytvořením při každém vydání | `:latest`                             |
| Testování dosud nevydaných commitů `release/v*`                                   | `:next` (ne pro produkci)             |
| Testování větve `main`                                                            | `:main` (ne pro produkci)             |

## Aktualizace řídicího panelu v Dockeru

Kontejner z publikovaného image nemůže nahradit sám sebe. Když OmniRoute zjistí, že běží uvnitř
kontejneru (bez checkoutu `.git` a nejde o instalaci přes npm), banner s aktualizací na domovském řídicím panelu zobrazí
místo pokynů pro npm/git příkaz, který je třeba spustit na hostiteli, včetně tlačítka pro zkopírování:

```bash
docker compose pull omniroute && docker compose up -d --force-recreate omniroute
```

Název služby pochází z `AUTO_UPDATE_SERVICE` (výchozí je `omniroute`, tedy služba v
`docker-compose.selfhost.yml`). `pull` posune pouze plovoucí tag (`latest`, `next`); u pevně nastaveného
tagu `:X.Y.Z` nejprve upravte tag.

### Aktualizace jedním kliknutím pomocí spouštěcího souboru na hostiteli

Chcete-li zachovat funkčnost tlačítka **Aktualizovat nyní** bez připojení `/var/run/docker.sock` (které kontejneru
poskytuje root přístup k hostiteli — viz výše uvedené varování k profilu `cli`), nastavte pro službu
OmniRoute proměnnou `DOCKER_UPDATE_TRIGGER_FILE` a na hostiteli spusťte sledovací proces:

```yaml
services:
  omniroute:
    environment:
      DOCKER_UPDATE_TRIGGER_FILE: /app/data/update/docker-update.request
    volumes:
      - ./data:/app/data
```

Cesta musí být uvnitř `DATA_DIR` (relativní hodnoty se vyhodnocují vůči tomuto adresáři); vše ostatní je
odmítnuto. Tlačítko **Aktualizovat nyní** poté zapíše do tohoto souboru `{ "requestedAt": "...", "targetVersion": "X.Y.Z" }`,
vrátí odpověď `202` a řídicí panel se dotazuje `/api/system/version`, dokud není nová verze aktivní,
a poté se znovu načte. OmniRoute v tomto režimu nikdy nespouští shell ani příkaz Dockeru. Stejně jako u každé
aktualizační akce je požadavek přijat pouze od klientů na loopbacku nebo v síti LAN.

Datový adresář připojený pomocí bind mountu poskytuje hostiteli stabilní cestu ke sledování. Vzorové jednotky `systemd`
(upravte `/srv/omniroute` na adresář obsahující váš soubor compose a adresář `data/`):

```ini
# /etc/systemd/system/omniroute-update.path
[Unit]
Description=Sledování požadavků na aktualizaci z řídicího panelu OmniRoute

[Path]
PathExists=/srv/omniroute/data/update/docker-update.request

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/omniroute-update.service
[Unit]
Description=Stažení a opětovné vytvoření kontejneru OmniRoute

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

Služba před stažením odstraní soubor požadavku, aby se neúspěšné spuštění neopakovalo ve smyčce. Bez
`DOCKER_UPDATE_TRIGGER_FILE` řídicí panel nadále používá postup s ručním příkazem.

## Dostupnost: výchozí SQLite podporuje jedinou repliku

Standardní nasazení OmniRoute v Dockeru / Kubernetes tvoří **jeden proces Node + jeden zapisující proces SQLite**. Vysoká dostupnost v této topologii **není podporována**.

| Omezení                                                    | Důsledek                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jediný zapisující proces                                   | **Nespouštějte** více replik nad stejným souborem SQLite. Došlo by k poškození databáze.                                                                                                                                                                                                                                                    |
| Opětovné vytvoření / restart / ukončení pomocí HEALTHCHECK | **Úplný výpadek** probíhajících SSE, relací řídicího panelu a stavu v paměti. Připojení všech klientů se přeruší. Nové požadavky během intervalu bez dostupného koncového bodu obdrží od reverzní proxy chybu **`502 Bad Gateway: Unknown error`**, nikoli JSON z OmniRoute — klienti ji nemohou odlišit od selhání poskytovatele (#11015). |
| Stejná smyčka událostí jako `/healthz`                     | Vytížená aktualizace katalogu nebo komprese může zpozdit sondy; krátký časový limit pak restartuje **jedinou** repliku.                                                                                                                                                                                                                     |

**Matice sond** (viz také [doporučení pro sondy Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda                | Cíl                                                              | Nepoužívejte                                                             |
| -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Živost               | TCP na `PORT` (výchozí `20128`) nebo měkká HTTP sonda `/healthz` | `/api/monitoring/health`                                                 |
| Připravenost         | HTTP `GET /healthz`                                              | Krátké časové limity, které vytížení smyčky událostí považují za selhání |
| Hloubková / pro lidi | `/api/monitoring/health`                                         | Automatizovanou kontrolu živosti kubeletu                                |

**Aktualizace:** počítejte s ukončením každé relace. Pokud můžete, předem odpojte klienty; s výchozím SQLite není postupná aktualizace možná. Nastavení Compose `restart: unless-stopped` spolu s Docker `HEALTHCHECK` také nahradí jediný proces, když kontejner přejde do stavu Unhealthy — se stejně rozsáhlými dopady.

Ukázka konfigurace Kubernetes pro **jedinou repliku** (strategie Recreate je povinná; nezvyšujte `replicas` nad jedním souborem SQLite):

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

Prodleva `preStop` umožní Kubernetes odebrat koncové body služby před signálem SIGTERM, takže **nový** provoz přestane být směrován na ukončovaný proces. Probíhající spojení SSE pro `/v1/responses` se nechají doběhnout po dobu až `SHUTDOWN_TIMEOUT_MS` (ve výchozím nastavení 30 s) prostřednictvím kapacitně náročných vstupních pronájmů (#11015). Nové požadavky, které se přesto dostanou k procesu, obdrží `503` + `Retry-After: 5`. Prodleva s prázdnými koncovými body při strategii Recreate, která trvá, dokud není náhrada ve stavu Ready, zůstává úplným výpadkem — jde o vlastnost topologie SQLite, nikoli o nesprávnou konfiguraci sondy.

Externí Postgres / HA s více zapisujícími instancemi **není** zdokumentovanou standardní cestou. Pokud potřebujete HA, ponechte jedinou repliku nebo použijte topologii, kterou projekt otestoval a samostatně zdokumentoval. Práce na podpoře Postgres/MySQL probíhá v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dokud nebude tato podpora vydána, jediným podporovaným způsobem, jak znásobit kapacitu pro **velké** požadavky `/v1/responses`, je N nezávislých procesů (další část), nikoli `replicas > 1` nad jedním svazkem.

## Horizontální škálování: N nezávislých procesů

Jeden proces Node představuje **jednu haldu V8**. Dva překrývající se požadavky kódovacích agentů `POST /v1/responses` o velikosti ~3 MiB / ~750k tokenů (RTK + Caveman) ukončí tuto haldu při ~12 Gi (`FATAL ERROR: Reached heap limit`) a mohou způsobit OOM v cgroup o velikosti 16 Gi. Viz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Toto měření je varováním ohledně **paměťového rozpočtu**, nikoli pevně daným produktovým maximem dvou souběžných dlouhých požadavků `/v1/responses`. Přijímání náročných chatových požadavků je řízeno automaticky odvozeným rozpočtem bajtů na vstupu (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), jehož velikost vychází ze stejného limitu V8/cgroup — jeho zvýšení přepsáním konfigurace (nebo nastavení staršího limitu počtu požadavků `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) u již dimenzovaného procesu znovu způsobí ukončení. Malé chaty, `/healthz`, `/v1/models` a MCP do tohoto limitu **nespadají**.

### Jeden proces: více než dva dlouhé požadavky `/v1/responses`

**Zdravý** proces (využití haldy pod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, výchozí hodnota `0.75`) **může** zpracovávat více než dva souběžné dlouhé požadavky `POST /v1/responses`, pokud v celoprocesovém rozpočtu bajtů zpracovávaných požadavků (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) stále zbývá kapacita. Těla o velikosti alespoň `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (výchozí hodnota 256 KiB) získávají stejný pronájem prostředků jako požadavky s náročnou strukturou a používají stejnou únikovou cestu `tryAcquireHealthyHeadroom` z [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Desítky souběžných dlouhých klientů SSE (provozovatelé jich často potřebují 40–50) jsou otázkou **paměťového rozpočtu** — dimenzujte haldu, primární/doplňkové sloty a `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nikoli pevného produktového limitu „max. 2“. Přetížená halda stále odmítá požadavky pomocí opakovatelné chyby `503`, aby se problém #7849 nevrátil.

Chcete-li **znásobit počet hald** (nezávislých old-space oblastí V8) **již dnes**:

| Co dělat                                                                                                                                                                                             | Co nedělat                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Spusťte **N kontejnerů/podů**, každý s **vlastním** `DATA_DIR` / svazkem                                                                                                                             | Nenastavujte `replicas > 1` nad jedním souborem SQLite                    |
| Dimenzujte náročné zpracovávané požadavky + zdravou rezervu podle haldy / rozpočtu bajtů zpracovávaných požadavků; 1–2 je konzervativní výchozí hodnota podle #7849, nikoli pevné produktové maximum | Nepřidělujte jednomu procesu 8× více RAM a neomezený početní limit        |
| Volitelně: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pro **sdílená počítadla kvót**                                                                                                       | Nepovažujte Redis za sdílené SQLite — není jím                            |
| Zduplikujte tajné údaje poskytovatelů do každé instance (nebo akceptujte oddělené řídicí panely)                                                                                                     | Neočekávejte jeden řídicí panel / jeden protokol volání napříč instancemi |
| Předřaďte libovolný nástroj pro vyvažování zátěže; stačí přilnavost podle klíče API nebo relace                                                                                                      | Nevyžadujte middleware konkrétního dodavatele zohledňující velikost       |

Hardware: počet souběžných dlouhých požadavků `/v1/responses` na instanci je otázkou **paměťového rozpočtu** (halda + bajty zpracovávaných požadavků / #10110). `N` nezávislých adresářů `DATA_DIR` stále násobí počet hald: RAM hostitele musí pokrýt `N × cgroup`, nikoli „jeden pod o velikosti 16 Gi s N=8“. Nikdy nepoužívejte `replicas > 1` nad jedním souborem SQLite.

Náčrt konfigurace Compose (dvě haldy, dva svazky — nikoli `deploy.replicas: 2`):

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

Hustota v rámci procesu (komprese mimo izolát HTTP) je řešena v [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logický cluster nad sdíleným trvalým stavem je řešen v [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Regionální chyby Gemini uvnitř Dockeru

Google AI Studio / Gemini API může vrátit HTTP 400 s chybou FAILED_PRECONDITION a
`User location is not supported for the API use.` Úspěšný požadavek na hostiteli
nedokazuje, že kontejner používá stejnou odchozí trasu. Pořadí DNS,
připojení IPv4/IPv6, směrování VPN a nakonfigurované proxy se mohou lišit. Zkontrolujte
[regiony podporované společností Google](https://ai.google.dev/gemini-api/docs/available-regions)
i skutečnou trasu připojení; tato chyba sama o sobě neznamená, že je klíč API neplatný.

### Upřednostněte proxy specifickou pro připojení

Pro dotčené připojení Gemini použijte [konfiguraci proxy pro jednotlivá připojení](../ops/PROXY_GUIDE.md#4-level-proxy-system)
v OmniRoute a poté zopakujte **Test Connection** a malý požadavek
se stejným modelem. Tím zůstane změna směrování omezená na dané připojení. Ověřte,
že je proxy z kontejneru dostupná a že ji připojení skutečně vybere.
Změna trasy nezaručuje regionální způsobilost u poskytovatele.

### Porovnání síťového připojení hostitele a kontejneru

Při porovnávání ověřených výsledků zachovejte stejný klíč, model i požadavek; nikdy
do hlášení problému nevkládejte přihlašovací údaje, hesla k proxy ani úplné autorizační hlavičky.
Nejprve zjistěte, které rodiny adres překladač operačního systému nabízí, a to pomocí stejného příkazu
na hostiteli i uvnitř kontejneru:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Nahraďte `omniroute` službou, kterou používáte (například `omniroute-web`). Tyto
příkazy vypíší rodiny adres bez přihlašovacích údajů nebo IP adres. Vrácená hodnota `6`
pouze označuje výsledek DNS pro IPv6: **nedokazuje** funkční trasu IPv6 ani přístup k API.
Pokud je nainstalován `curl`, porovnejte `curl -4 -I https://generativelanguage.googleapis.com`
s `curl -6 -I https://generativelanguage.googleapis.com` v obou prostředích.
Odpověď HTTP dokazuje konektivitu pro daný test, i když jde o chybu
bez ověření; způsobilost pro Gemini ověří pouze autentizovaný požadavek na model.

### Alternativa na úrovni hostitele: funkční IPv6 a zásady překladače

Autor hlášení [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) obnovil
přístup ve svém prostředí povolením IPv6 pro kontejnery a změnou výběru adres v glibc.
Považujte toto řešení za alternativu specifickou pro dané prostředí. Před úpravou předvoleb překladače
ověřte funkční IPv6 hostitele, odchozí připojení a směrování kontejneru i pravidla firewallu.
Samotná privátní adresa ULA nezajišťuje veřejné připojení IPv6.

U služeb, které jsou již připojené k výchozí síti Compose, povolí tento fragment
IPv6 v dané síti; zachovejte zbytek konfigurace služby, portů, svazků a dalších nastavení:

```yaml
networks:
  default:
    enable_ipv6: true
```

U pojmenované sítě povolte IPv6 v síti, ke které se služba skutečně připojuje. Docker může
přidělit podsíť ULA; explicitní nepřekrývající se podsíť vyberte pouze tehdy, když to vaše síť
vyžaduje. Viz [sítě IPv6 v Dockeru](https://docs.docker.com/engine/daemon/ipv6/)
a [možnosti sítí Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

V **obrazu založeném na glibc** může `/etc/gai.conf` změnit výběr adres. Aktuální
Dockerfile repozitáře používá Debian; vlastní obrazy založené na musl tento mechanismus nemají.
Nahlášená úprava mění štítek ULA z `label fc00::/7 6` na
`label fc00::/7 1`. Začněte s úplnou tabulkou zásad z obrazu a zachovejte její ostatní
položky: přidání položky `label` nebo `precedence` nahradí danou výchozí tabulku, takže soubor
obsahující pouze změněný řádek nestačí. Tyto principy popisuje
[referenční dokumentace konfigurace glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf).
Připojte zkontrolovaný soubor pouze pro čtení do `/etc/gai.conf`
a službu znovu vytvořte, aby se změna použila.

Tím se změní výběr adres operačního systému pro **veškerý odchozí provoz v daném kontejneru**.
Neznamená to, že každá aplikace bude nucena zvolit IPv6: záleží také na pořadí DNS a výběru
připojení v Node. Konkrétně `--dns-result-order=ipv4first` upřednostňuje IPv4
a není řešením selhání, ke kterému dochází pouze přes IPv4. Viz [řazení DNS v Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po každé změně na úrovni hostitele znovu otestujte Gemini i ostatní poskytovatele. Chcete-li změny vrátit,
odeberte vlastní připojení souboru `gai.conf`, obnovte předchozí konfiguraci sítě a
během údržby znovu vytvořte dotčenou službu nebo síť. Opětovné vytvoření sítě
může přerušit provoz ostatních kontejnerů, které jsou k ní připojené; trvalý datový svazek neodstraňujte.

## Důležité poznámky

- **Režim WAL databáze SQLite:** Příkazu `docker stop` by mělo být umožněno dokončení, aby OmniRoute mohl zapsat nejnovější změny zpět do souboru `storage.sqlite` prostřednictvím kontrolního bodu. Přibalené soubory Compose již nastavují 40sekundovou odkladnou lhůtu pro zastavení. Pokud spouštíte image přímo, zachovejte `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Nastavte na `true`, pokud jsou pravidelné zálohy a zálohy před zápisem spravovány externě. Migrace existující databáze stále vyžadují vlastní trvalý bezpečnostní snímek a ochranu před hromadnou migrací.
- **Trvalé uložení dat:** Vždy připojte svazek k `/app/data`, aby vaše databáze, klíče a konfigurace zůstaly zachovány i po restartování kontejneru.
- **Konfigurace portu:** Chcete-li změnit výchozí port `20128`, přepište proměnnou prostředí `PORT`.

## Viz také

- [Průvodce nasazením na virtuálním počítači](../ops/VM_DEPLOYMENT_GUIDE.md) — Nastavení virtuálního počítače, nginx a Cloudflare
- [Průvodce nasazením na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Nasazení na Fly.io
- [Konfigurace prostředí](../reference/ENVIRONMENT.md) — Kompletní referenční dokumentace k `.env`
